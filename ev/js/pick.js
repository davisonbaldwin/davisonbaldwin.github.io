/* Picking: which part is under the pointer.

   Lifted out of viewer.js so it can be run and measured WITHOUT a WebGL
   context. Everything here needs a camera, a scene graph and a pointer, and
   nothing here needs a renderer, so tools/pickbench.js and tools/bvhcheck.js
   drive this exact code headlessly under JavaScriptCore rather than a
   reimplementation of it. That matters more than tidiness: the last two
   picking passes were measured against page loads minutes apart on a machine
   whose baseline swings by several times, and one set of numbers had to be
   thrown away for it. One process, both states, alternating.

   Four rules, and the fourth is only affordable because of the first three.

   1. The hover is recomputed when something that could change it moved, not
      once per frame. viewer.js owns that scheduling.
   2. The ray is cast at the visible meshes of the ACTIVE systems. r160's
      Raycaster has no visibility check at all, so passing `root` walked every
      hidden variant of every other generation as well, forever.
   3. One narrowing pass replaces the per-mesh sphere test Three would repeat
      inside all nineteen samples, and sorting its survivors by entry distance
      lets a sample stop as soon as everything left starts behind the hit it
      already has.
   4. A single centre ray demands pixel-perfect aim at anything thin, so the
      pointer carries a disc of fallback samples around it.

   ── WHY THE DISC IS NO LONGER BUDGETED ────────────────────────────────────

   Rule 4 used to be conditional. The hover skipped the disc whenever
   `_nearTris * PICK_RING.length` passed 60,000 triangles, because a sample
   that hits nothing cannot stop early and sweeps every triangle in the cone,
   and eighteen of them did it in a row: 156 ms on Gen 9 against 9.7 ms for
   the single ray. Gen 9 puts about 124,000 triangles in the cone, so the
   hover disc was off almost everywhere on the flagship car. A wire the user
   could click did not light up first, and the highlight is the affordance
   that says a thing is clickable at all.

   js/bvh.js removed the term that budget was defending. A sample no longer
   costs the triangles in the cone; it costs a few box tests per candidate
   mesh plus the triangles in the leaves it actually reaches. The budget is
   therefore gone rather than raised, and `discAffordable` is reported from
   the same expression it always was so the claim can be checked rather than
   believed. See design/pick-bvh.md for the measured before and after. */

import * as THREE from '../vendor/three.module.js';
import { bvhRaycast } from './bvh.js';

/* Radius of the pick disc in CSS pixels. A cable drawn with
   lib.tube(pts, 0.007) covers about three pixels at a full-car distance,
   which is below any sane target size. */
export const PICK_PX = 12;

/* Fallback sample offsets, unit disc, ordered by distance from the centre so
   the nearest part wins: six at just over half radius, then twelve on the
   rim, staggered so the rings do not share angles. */
const PICK_RING = [];
for (const [rad, n, phase] of [[0.55, 6, 0], [1, 12, Math.PI / 12]]) {
  for (let i = 0; i < n; i++) {
    const a = phase + (i / n) * Math.PI * 2;
    PICK_RING.push([Math.cos(a) * rad, Math.sin(a) * rad]);
  }
}

/* What the whole fallback disc was allowed to cost, in triangles tested.
   Retained as the yardstick the old hover was judged against, and reported by
   debug() as `discAffordable`, but no longer consulted: the disc always runs.
   Removing the constant would make the claim in this file uncheckable. */
export const PICK_DISC_TRIS = 60000;

const triCount = (o) => {
  const g = o.geometry;
  if (!g) return 0;
  const n = g.index ? g.index.count : (g.attributes.position ? g.attributes.position.count : 0);
  return o.isMesh ? n / 3 : n;
};

export function createPicker(camera, systems) {
  const ray = new THREE.Raycaster();
  const _pt = new THREE.Vector2();
  const _hits = [];
  const byT = (a, b) => a.t - b.t;

  /* Visible pickable meshes of the active systems, cached until something
     changes visibility, ghosting or the set of built systems. pickTris runs
     alongside it, one triangle count per mesh: after the static merge a
     candidate is no longer a small object, and the disc's old budget was
     drawn against exactly this number. */
  let pickList = null, pickTris = null;

  let _near = [];          // { o, t, core } inside the pick cone, nearest first
  let _coreN = 0;          // how many of them the centre ray can reach
  let _nearTris = 0;       // triangles in the cone, the disc's old cost estimate
  let pickNear = 0, pickRays = 0;
  let discRan = false;     // did the last hitTest actually spend the disc
  let useBVH = true;       // benchmarks flip this; nothing else should

  /* One inverse world matrix per candidate, reused across the nineteen
     samples of one hitTest and across hitTests. The matrices cannot change
     inside a hitTest (it refreshes them once, up front), so inverting them
     nineteen times was pure waste: 4,000 inversions a hover at Gen 9. */
  const _inv = [];
  let _invStamp = new Int32Array(0);
  let _stamp = 0;

  const invalidate = () => { pickList = null; pickTris = null; };

  /* THE GATE, in one place, consulted by the hover and reported by debug().
     With js/bvh.js under it the disc costs a few box tests per candidate mesh
     instead of every triangle in the cone, so there is nothing left to ration
     and the budget is Infinity: the hover disc always runs, and the hover and
     the click now return the same part at every pixel. The knob survives
     because tools/pickbench.js has to reproduce the OLD behaviour to measure
     against it, and because if a future scene ever needs a guard this is the
     one place it goes. */
  let discBudget = Infinity;
  const discAllowed = () => _nearTris * PICK_RING.length <= discBudget;

  function pickables() {
    if (pickList) return pickList;
    pickList = []; pickTris = [];
    for (const rec of Object.values(systems)) {
      if (!rec.group.visible) continue;
      for (const o of rec.meshes) {
        if (!o.visible) continue;
        const m = o.material;
        /* x-ray shell and focus ghosts are unpickable, so do not ray them */
        if (m && m.transparent && m.opacity < 0.08) continue;
        pickList.push(o);
        pickTris.push(triCount(o));
      }
    }
    return pickList;
  }

  /* Every sample ray lies inside one cone: the pick disc swept out from the
     camera. One pass over the candidates keeps the meshes that cone can
     reach, notes which of them the centre ray alone can reach, and records
     how far along the ray each one starts. That pass is worth doing three
     times over. It replaces the world sphere test Three would otherwise
     repeat inside every one of the nineteen samples; it leaves each sample
     running over the hundred or so meshes actually near it rather than
     thousands; and sorting by entry distance lets a sample stop as soon as
     the remaining meshes all start behind the hit it already has.
     Both tests are the sphere test or a widening of it, and the early stop is
     a lower bound, so no sample sees anything it did not see before. */
  function narrow(origin, dir, tanA) {
    _near = [];
    _coreN = 0;
    _nearTris = 0;
    const list = pickables();
    for (let i = 0; i < list.length; i++) {
      const o = list[i];
      /* an InstancedMesh keeps its own sphere covering every instance */
      let bs;
      if (o.isInstancedMesh) {
        if (o.boundingSphere === null) o.computeBoundingSphere();
        bs = o.boundingSphere;
      } else {
        if (o.geometry.boundingSphere === null) o.geometry.computeBoundingSphere();
        bs = o.geometry.boundingSphere;
      }
      if (!bs) continue;
      const c = bs.center, e = o.matrixWorld.elements;
      const vx = e[0] * c.x + e[4] * c.y + e[8] * c.z + e[12] - origin.x;
      const vy = e[1] * c.x + e[5] * c.y + e[9] * c.z + e[13] - origin.y;
      const vz = e[2] * c.x + e[6] * c.y + e[10] * c.z + e[14] - origin.z;
      const s0 = e[0] * e[0] + e[1] * e[1] + e[2] * e[2];
      const s1 = e[4] * e[4] + e[5] * e[5] + e[6] * e[6];
      const s2 = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
      const rad = bs.radius * Math.sqrt(Math.max(s0, s1, s2));
      const along = vx * dir.x + vy * dir.y + vz * dir.z;
      if (along < -rad) continue;                       // wholly behind us
      const perp2 = vx * vx + vy * vy + vz * vz - along * along;
      const allow = rad + tanA * (along > 0 ? along : 0);
      if (perp2 > allow * allow) continue;
      const core = perp2 <= rad * rad;                  // the centre ray's own set
      if (core) _coreN++;
      /* nearest point of the sphere along the ray, widened to the cone so it
         stays a lower bound for the rim samples too */
      const t = along - Math.sqrt(allow * allow - perp2);
      _near.push({ o, t: t > 0 ? t : 0, core });
      _nearTris += pickTris[i];
    }
    _near.sort(byT);
    /* A survivor's index in _near is its slot in the inverse-matrix pool for
       the rest of this hitTest. The stamp says which hitTest a cached inverse
       belongs to; it is kept inside Int32 range because the pool is one. */
    if (_invStamp.length < _near.length) {
      _invStamp = new Int32Array(_near.length + 64);
      while (_inv.length < _invStamp.length) _inv.push(new THREE.Matrix4());
      _stamp = 1;
    } else if (_stamp >= 0x7ffffffe) {
      _invStamp.fill(0);
      _stamp = 1;
    } else {
      _stamp++;
    }
  }

  function keyOf(obj) {
    let p = obj;
    let part = null;
    while (p) {
      if (p.userData?.env || p.visible === false) return null;
      if (!part && p.userData?.part) part = p.userData.part;
      if (p.userData?.sys) return part ? p.userData.sys + '/' + part : p.userData.sys;
      p = p.parent;
    }
    return null;
  }

  /* One sample against the ray as currently aimed: the nearest acceptable
     part, taking the candidates in entry-distance order and stopping once
     everything left starts behind the best hit so far. */
  function scan(coreOnly) {
    pickRays++;
    let best = null, bestD = Infinity;
    for (let i = 0; i < _near.length; i++) {
      const e = _near[i];
      if (e.t > bestD) break;
      if (coreOnly && !e.core) continue;
      if (!e.o.layers.test(ray.layers)) continue;   // what intersectObjects checks
      _hits.length = 0;
      let done = false;
      if (useBVH) {
        /* the inverse world matrix is the same for every sample in this
           hitTest, so it is inverted once and handed to the tree */
        let inv = _inv[i];
        if (_invStamp[i] !== _stamp) {
          inv.copy(e.o.matrixWorld).invert();
          _invStamp[i] = _stamp;
        }
        /* bestD prunes the tree: a hit farther than one already held on a
           nearer mesh is one scan would discard anyway */
        done = bvhRaycast(e.o, ray, _hits, bestD, inv);
      }
      if (!done) e.o.raycast(ray, _hits);
      for (let j = 0; j < _hits.length; j++) {
        const h = _hits[j];
        if (h.distance >= bestD) continue;
        const o = h.object;
        if (!o.visible) continue;
        /* skip meshes whose material is fully ghosted in x-ray */
        if (o.material?.transparent && o.material.opacity < 0.08) continue;
        const k = keyOf(o);
        if (k && k.includes('/')) { best = k; bestD = h.distance; }
      }
    }
    return best;
  }

  function sampleAt(pointer, ndcX, ndcY) {
    _pt.set(pointer.x + ndcX, pointer.y + ndcY);
    ray.setFromCamera(_pt, camera);
    return scan(false);
  }

  /* budgeted = this is the hover, which runs on every frame the scene moves
     and must therefore live inside a frame. A click passes false. The two
     paths are identical today and the flag is kept because the CALLERS still
     mean different things by it, and because a future guard would go here.

     root, viewW and viewH come from the viewer; a headless caller supplies
     the same three. */
  function hitTest(budgeted, root, pointer, viewW, viewH) {
    if (!root || !viewW || !viewH) return null;
    pickRays = 0;
    discRan = false;

    /* Aim at the frame this hover is about to paint into, not at the last one
       that was drawn. Object3D.lookAt() recomposes matrixWorld BEFORE it
       writes the new quaternion, so after applyCam the camera's world matrix
       carries the NEW position with the PREVIOUS orientation: a pose the
       camera never actually held. Measured at Gen 9 that is a median 113 px
       and a peak 368 px of aim error during a camera flight, which put the
       highlight on the wrong part on 10 of 22 flight frames. Refreshing the
       vehicle too costs 0.155 ms over 1,537 nodes and removes the one-frame
       lag the exploding parts had; the camera refresh is 0.0001 ms. */
    camera.updateMatrixWorld();
    root.updateMatrixWorld();

    ray.setFromCamera(pointer, camera);
    /* angular half-width of the disc, a quarter wide so the cone can never
       clip a mesh one of the rim rays would have hit. The viewport size comes
       from resize(), never from getBoundingClientRect: a layout read in the
       hover path costs more than the raycast it feeds. */
    const tanA = Math.tan(camera.fov * Math.PI / 360) * (2 * PICK_PX / viewH) * 1.25;
    narrow(ray.ray.origin, ray.ray.direction, tanA);
    pickNear = _near.length;
    if (!pickNear) return null;

    /* The centre ray decides on its own whenever it hits anything, so a
       generous disc can never steal the part directly under the cursor. It is
       already aimed, from the cone setup above. */
    const centre = _coreN ? scan(true) : null;
    if (centre) return centre;

    /* Nothing under the cursor, so the disc sweeps the cone once per sample
       with no hit to prune against. This is the case the old triangle budget
       refused to pay for on the hover, and the case js/bvh.js made cheap. */
    if (budgeted && !discAllowed()) return null;
    discRan = true;
    const dx = (2 * PICK_PX) / viewW, dy = (2 * PICK_PX) / viewH;
    for (let i = 0; i < PICK_RING.length; i++) {
      const k = sampleAt(pointer, PICK_RING[i][0] * dx, PICK_RING[i][1] * dy);
      if (k) return k;
    }
    return null;
  }

  return {
    hitTest,
    invalidate,
    setBVH: (on) => { useBVH = !!on; },
    getBVH: () => useBVH,
    /* benchmarks only: Infinity is what ships, PICK_DISC_TRIS is what the
       hover used to be held to */
    setDiscBudget: (n) => { discBudget = n; },
    debug: () => ({
      pickNear, pickRays, discRan,
      candidates: pickList ? pickList.length : 0,
      core: _coreN, nearTris: _nearTris,
      /* Whether the hover will spend the disc where the pointer is standing.
         This is the question the user feels, so it is answered by the gate
         the hover actually consults and not by a constant. */
      discAffordable: discAllowed(),
      discBudget,
      /* what the retired triangle budget said about this same pointer, kept
         so the change is auditable from inside the running page */
      oldBudgetAffordable: _nearTris * PICK_RING.length <= PICK_DISC_TRIS,
    }),
  };
}
