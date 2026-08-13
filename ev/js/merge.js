/* Static-mesh merge pass: same triangles, far fewer draw calls.

   WHY THIS EXISTS. The crispness pass roughly tripled the mesh count, and a
   mesh is a draw call. Gen 9 built 5,064 of them for 378k triangles, and
   viewer.js draws the scene twice per frame for the planar floor
   reflection, so the flagship rung was spending something like ten thousand
   draw calls a frame on a triangle load a phone could chew through. The
   triangles were never the problem. The submission overhead was.

   The fix is not to delete detail. It is to hand the GPU the same triangles
   in one buffer instead of forty. This pass walks a built system, finds
   every set of meshes that share a material AND can legally become one
   object, bakes their transforms into a single BufferGeometry, and drops
   one mesh in their place.

   WHAT DEFINES "CAN LEGALLY BECOME ONE OBJECT". Four things in viewer.js
   read the scene graph, and each one sets a boundary the merge must not
   cross:

   1. PICKING. viewer.js raycasts the whole root and walks up parents
      looking for userData.part, so two meshes that become one object also
      become one pickable thing. Merging INSIDE a lib.part group is
      therefore safe and merging ACROSS parts is not. This pass never
      crosses a part boundary, and there are no nested part groups in the
      tree to complicate that.

   2. THE SHELL FLAG. lib.shell(mesh) marks outer skin, and viewer.js
      collects the material of every shell mesh so x-ray can fade it. Shell
      and non-shell never share a bucket, so a merged mesh is wholly shell
      or wholly not, and it carries the flag its inputs carried.

   3. SPIN GROUPS. lib.spin(group, axis, speed) marks a group whose
      TRANSFORM viewer.js animates in drive mode. Baking a spinning group's
      children into a static parent would weld the wheels to the car. A
      spin group is therefore a hard cut: it is excluded from its parent's
      merge and gets a merge of its own, so its rotation still applies to
      everything under it. Both topologies in this tree are handled, the
      drivetrain's spin-inside-part and the wheels' parts-inside-spin.

   4. EXPLODE. Part-level explode moves the lib.part group and
      system-level moves the system group. Merging strictly below a part
      group leaves both transforms untouched.

   Three more boundaries come from outside the viewer. MATERIAL IDENTITY:
   registry-built geometry is cloned per part by viewer.js AFTER this runs,
   keyed on the source material object, so bucketing by that same object
   means every merged mesh lands on the correct per-part clone.
   INSTANCEDMESH: already one draw call, and its per-instance matrices have
   no equivalent in a plain merge, so it is skipped and left exactly where
   it stands.

   TRANSPARENCY, which is the one boundary that is not about the scene graph
   at all. Three sorts the transparent render list back to front PER OBJECT
   and does not sort triangles inside an object, so two transparent meshes
   are composited in the right order today only because they are two
   objects. Weld them and the order becomes the index order, fixed for every
   camera angle, and M.glass writes depth: the nearer surface lands first
   over half the orbit and the one behind it is then rejected by the depth
   test outright rather than blended under it. That is not a subtler blend,
   it is a missing pane. Measured on this tree, seven parts hold two or more
   M.glass meshes that stack along a view ray, body-aero/canopy up to 2.07 m
   apart, so it is not hypothetical. Transparent materials are therefore
   left unmerged. It costs 3 to 6 draw calls a preset out of several
   hundred, which is the cheapest correctness this pass buys anywhere.

   THE MERGE ITSELF. Three r160 is vendored without BufferGeometryUtils, so
   there is no mergeGeometries to import. This one is deliberately strict:
   geometries only share a bucket when their attribute sets match name for
   name, item size for item size and array type for array type, so a merge
   can never silently drop a uv or slide one attribute against another.
   Every body panel in this car now depends on the arc-length uv that
   _arcUV writes, and a merge that dropped it would unpaint the car.

   Non-indexed geometry gets a synthesised index, indices are offset by the
   running vertex base, and the index array widens to Uint32 past 65,535
   vertices. Positions go through the full matrix, normals through its
   inverse transpose, and a matrix with a negative determinant, which is
   what lib.mirrorZ leaves behind on 565 of this tree's meshes, gets its
   triangle winding reversed as well. That last one matters even though
   every material here is DoubleSide: the renderer flips the front face for
   a mirrored object automatically, and baking the mirror away removes that
   flip, so the winding has to absorb it instead. */

import * as THREE from '../vendor/three.module.js';

/* Attributes whose values live in object space and must be transformed.
   Everything else, uv above all, is a coordinate in its own space and is
   copied through untouched. The list is explicit because the failure mode
   of guessing is silent. */
const POSITION = 'position';
const NORMAL = 'normal';
const TANGENT = 'tangent';

/* A geometry may join a merge only if every one of these holds. Each line
   is a case where merging would change what is drawn rather than how it is
   submitted. */
function mergeable(geo) {
  if (!geo || !geo.isBufferGeometry) return false;
  if (geo.isInstancedBufferGeometry) return false;
  if (geo.morphAttributes && Object.keys(geo.morphAttributes).length) return false;
  if (geo.drawRange && (geo.drawRange.start !== 0 || geo.drawRange.count !== Infinity)) return false;
  const pos = geo.attributes[POSITION];
  if (!pos || pos.itemSize !== 3) return false;
  for (const name of Object.keys(geo.attributes)) {
    const a = geo.attributes[name];
    /* interleaved buffers share one array between attributes, so copying
       them out needs stride arithmetic this pass does not do */
    if (a.isInterleavedBufferAttribute) return false;
    /* a normalised integer attribute would have to be re-quantised on the
       way out; nothing in this tree uses one, so refuse rather than guess */
    if (a.normalized) return false;
    /* attributes are copied vertex for vertex against the position count,
       so a ragged set would misalign rather than fail loudly */
    if (a.count !== pos.count) return false;
  }
  if (geo.index) {
    if (geo.index.count % 3 !== 0) return false;
  } else if (pos.count % 3 !== 0) {
    return false;
  }
  return true;
}

/* The signature two geometries must share to be merged. Names, item sizes
   and array types all take part, so a geometry carrying uv can never be
   merged with one that does not. */
function attrSig(geo) {
  const names = Object.keys(geo.attributes).sort();
  let s = '';
  for (const n of names) {
    const a = geo.attributes[n];
    s += n + ':' + a.itemSize + ':' + a.array.constructor.name + ';';
  }
  return s;
}

/* Merge a list of { geo, matrix } into one BufferGeometry, with every
   matrix baked in. The caller guarantees a shared attribute signature. */
function mergeGeometries(items) {
  const names = Object.keys(items[0].geo.attributes).sort();

  let nVert = 0, nIdx = 0;
  for (const it of items) {
    const c = it.geo.attributes[POSITION].count;
    nVert += c;
    nIdx += it.geo.index ? it.geo.index.count : c;
  }

  const dst = {};
  for (const n of names) {
    const a = items[0].geo.attributes[n];
    dst[n] = {
      itemSize: a.itemSize,
      array: new a.array.constructor(nVert * a.itemSize),
    };
  }
  const idx = nVert > 65535 ? new Uint32Array(nIdx) : new Uint16Array(nIdx);

  const v = new THREE.Vector3();
  const nm = new THREE.Matrix3();
  let vBase = 0, iBase = 0;

  for (const it of items) {
    const geo = it.geo, m = it.matrix;
    const count = geo.attributes[POSITION].count;
    const flip = m.determinant() < 0;
    nm.getNormalMatrix(m);

    for (const n of names) {
      const src = geo.attributes[n];
      const out = dst[n].array;
      const is = dst[n].itemSize;
      if (n === POSITION) {
        for (let k = 0; k < count; k++) {
          v.fromBufferAttribute(src, k).applyMatrix4(m);
          const o = (vBase + k) * 3;
          out[o] = v.x; out[o + 1] = v.y; out[o + 2] = v.z;
        }
      } else if (n === NORMAL) {
        for (let k = 0; k < count; k++) {
          v.fromBufferAttribute(src, k).applyNormalMatrix(nm);
          const o = (vBase + k) * 3;
          out[o] = v.x; out[o + 1] = v.y; out[o + 2] = v.z;
        }
      } else if (n === TANGENT && is === 4) {
        /* a tangent is a direction in the surface, so it rides the matrix
           itself rather than the normal matrix, and w is a handedness sign
           that the winding flip below already accounts for */
        const sa = src.array;
        for (let k = 0; k < count; k++) {
          v.set(sa[k * 4], sa[k * 4 + 1], sa[k * 4 + 2]).transformDirection(m);
          const o = (vBase + k) * 4;
          out[o] = v.x; out[o + 1] = v.y; out[o + 2] = v.z;
          out[o + 3] = flip ? -sa[k * 4 + 3] : sa[k * 4 + 3];
        }
      } else {
        const sa = src.array;
        const o = vBase * is;
        for (let k = 0; k < count * is; k++) out[o + k] = sa[k];
      }
    }

    if (geo.index) {
      const si = geo.index.array;
      const n = geo.index.count;
      for (let k = 0; k < n; k += 3) {
        const a = vBase + si[k], b = vBase + si[k + 1], c = vBase + si[k + 2];
        idx[iBase + k] = a;
        idx[iBase + k + 1] = flip ? c : b;
        idx[iBase + k + 2] = flip ? b : c;
      }
      iBase += n;
    } else {
      for (let k = 0; k < count; k += 3) {
        const a = vBase + k, b = vBase + k + 1, c = vBase + k + 2;
        idx[iBase + k] = a;
        idx[iBase + k + 1] = flip ? c : b;
        idx[iBase + k + 2] = flip ? b : c;
      }
      iBase += count;
    }
    vBase += count;
  }

  const out = new THREE.BufferGeometry();
  for (const n of names) {
    out.setAttribute(n, new THREE.BufferAttribute(dst[n].array, dst[n].itemSize));
  }
  out.setIndex(new THREE.BufferAttribute(idx, 1));
  return out;
}

/* Everything that distinguishes one draw from another. Two meshes may only
   become one when all of it agrees, so the merged mesh can carry it. */
function bucketKey(o) {
  return [
    o.material.id,
    o.userData && o.userData.shell ? 1 : 0,
    o.castShadow ? 1 : 0,
    o.receiveShadow ? 1 : 0,
    o.visible ? 1 : 0,
    o.renderOrder,
    o.frustumCulled ? 1 : 0,
    o.layers.mask,
    attrSig(o.geometry),
  ].join('|');
}

/* Collect the leaf meshes that belong to one merge root, with each one's
   matrix relative to that root. The walk stops at any descendant that is
   itself a merge root, which is what keeps parts and spin groups separate.

   A mesh that has children is descended into but never merged: merging it
   would mean removing it from the graph and orphaning whatever hangs off
   it. There are none in this tree, and this is the reason it stays true. */
function collect(root, node, mat, out, stats) {
  for (const c of node.children) {
    const ud = c.userData;
    if (ud && (ud.part || ud.spin)) continue;
    const m = mat.clone().multiply(c.matrix);
    if (c.isMesh && !c.isInstancedMesh && c.children.length === 0) {
      out.push({ obj: c, matrix: m });
    } else {
      if (c.isInstancedMesh) stats.instanced++;
      collect(root, c, m, out, stats);
    }
  }
}

function mergeUnder(root, stats) {
  const found = [];
  collect(root, root, new THREE.Matrix4(), found, stats);
  /* A root holding one lone mesh has nothing to merge, but that mesh is
     still a draw call that survived this pass, so count it before leaving.
     Counting it only inside the bucket loop below lost 32 objects across
     the tree and left the stats unable to add up to what is on screen. */
  if (found.length < 2) { stats.singletons += found.length; return; }

  const buckets = new Map();
  for (const it of found) {
    const o = it.obj;
    if (Array.isArray(o.material) || !o.material) { stats.skippedMultiMaterial++; continue; }
    /* see TRANSPARENCY in the header: welding these replaces three's
       back-to-front object sort with a fixed index order, and a depth
       writing transparent material then hides whichever surface loses */
    if (o.material.transparent) { stats.transparent++; continue; }
    if (!mergeable(o.geometry)) { stats.skippedGeometry++; continue; }
    const k = bucketKey(o);
    let b = buckets.get(k);
    if (!b) buckets.set(k, (b = []));
    b.push(it);
  }

  for (const b of buckets.values()) {
    if (b.length < 2) { stats.singletons++; continue; }
    const first = b[0].obj;
    const geo = mergeGeometries(b.map((it) => ({ geo: it.obj.geometry, matrix: it.matrix })));
    const merged = new THREE.Mesh(geo, first.material);
    merged.castShadow = first.castShadow;
    merged.receiveShadow = first.receiveShadow;
    merged.visible = first.visible;
    merged.renderOrder = first.renderOrder;
    merged.frustumCulled = first.frustumCulled;
    merged.layers.mask = first.layers.mask;
    if (first.userData && first.userData.shell) merged.userData.shell = true;
    /* the originals are dropped, not disposed: a BufferGeometry can be
       shared with a mesh that stayed behind in another bucket, and this
       pass runs before anything reaches the GPU, so there is nothing to
       free anyway */
    for (const it of b) if (it.obj.parent) it.obj.parent.remove(it.obj);
    root.add(merged);
    stats.merged += b.length;
    stats.saved += b.length - 1;
    stats.groups++;
  }
}

/* Drop container groups the merge emptied. They draw nothing, but every
   one of them is another node the raycaster and the matrix update walk. A
   group is only removed when it is empty AND carries no userData, so no
   part group, spin group or system group can ever be caught by this. */
function pruneEmpty(rootObj) {
  for (;;) {
    const dead = [];
    rootObj.traverse((o) => {
      if (o === rootObj) return;
      if (o.isMesh || o.isInstancedMesh || o.isLight || o.isCamera) return;
      if (o.children.length) return;
      if (o.userData && Object.keys(o.userData).length) return;
      dead.push(o);
    });
    if (!dead.length) return;
    for (const o of dead) if (o.parent) o.parent.remove(o);
  }
}

/* Merge one built system in place and return it. Safe to call twice: a
   second pass finds nothing left to do. */
export function mergeStatic(group) {
  group.updateMatrixWorld(true);

  const stats = {
    merged: 0, saved: 0, groups: 0, singletons: 0, instanced: 0, transparent: 0,
    skippedGeometry: 0, skippedMultiMaterial: 0,
  };

  /* Snapshot the roots before touching anything: merging adds meshes and
     removes others, and mutating the tree during its own traversal is how
     a pass like this quietly skips half the car. */
  const roots = [];
  group.traverse((o) => {
    const ud = o.userData;
    if (ud && (ud.part || ud.spin)) roots.push(o);
  });
  for (const r of roots) mergeUnder(r, stats);

  pruneEmpty(group);
  /* Left on the group for anyone measuring: how many meshes went in, how
     many draw calls came out, and what this pass refused to touch. The
     live number in the browser is renderer.info.render.calls; this one
     says where it came from. It BALANCES, and that is the point of it:

       refused    = skippedGeometry + skippedMultiMaterial
       kept       = singletons + transparent + refused + instanced
       meshes in  = merged + kept
       meshes out = groups + kept
       saved      = merged - groups

     so a decomposition of the residual can be read straight off it rather
     than reconstructed by subtraction, which is how 32 lone meshes once
     got filed as singleton buckets they were never in. */
  group.userData.merge = stats;
  return group;
}
