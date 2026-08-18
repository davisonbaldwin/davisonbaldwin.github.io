/* A bounding volume hierarchy for picking, hand written.

   WHY THIS EXISTS. The forgiving pick disc casts nineteen rays instead of
   one, and at the flagship generation it was budgeted off: viewer.js skipped
   the disc whenever the pick cone held more triangles than one extra sweep
   could pay for, and Gen 9 puts about 124,000 triangles in that cone, so the
   HOVER disc was disabled almost everywhere on the car. The consequence for
   the user is the one that matters: a wire they can successfully click does
   not light up first, and the highlight is the affordance that says it is
   clickable at all.

   The cost being budgeted against is triangle testing inside merged meshes.
   THREE.Mesh.raycast walks EVERY triangle of a mesh whose bounding sphere the
   ray clips, and js/merge.js deliberately concentrated the car into fewer,
   larger meshes: Gen 9 is 669 static meshes averaging 531 triangles each. A
   ray that hits nothing pays for all of them. Three r160 is vendored without
   three-mesh-bvh and there is no network on this machine, so the structure is
   written here.

   WHAT IT GUARANTEES. bvhRaycast is a drop-in for mesh.raycast in the one use
   the viewer has for it: the NEAREST hit on that mesh. It pushes at most one
   intersection, and that intersection is the one the stock raycaster's
   nearest hit would have been, to the bit. That is checked rather than
   asserted: tools/bvhcheck.js sweeps thousands of rays over every generation
   and compares part, point and distance against THREE.Mesh.raycast run over
   the same scene in the same process.

   AND THE BIT CLAIM HAS A MEASURED RESIDUE, written here because an
   unqualified claim is the thing a later reader would rely on. It holds for
   every ray a camera can produce: 216,000 camera rays over all nine presets,
   sixty poses each, agree with THREE.Mesh.raycast to the bit, worst distance
   disagreement exactly 0. It does not hold everywhere. A ray CONSTRUCTED to
   pass exactly through a vertex, or to run exactly along a node box's edge,
   can still be answered wrongly, because the slab test and the triangle test
   solve for the same surface by different expressions and disagree in the
   last ulp. boxT below carries a graze slack that removes most of it; what
   survives is what tools/bvhcheck.sh prints as TEST C, 115 wrong answers in
   126,900 deliberately degenerate rays over the nine presets, against 685
   for THREE.Mesh.raycast itself over the same rays, whose world bounding
   sphere loses hits its own triangle loop finds. The slack is worth 82 wrong
   to 27 on gen9 alone; the full comparison is in boxT's comment.

   tools/bvhcheck.js TEST C fires that degenerate family on every run and
   judges all three against a brute-force triangle sweep, so the residue is a
   number that has to stay put rather than a paragraph nobody can re-derive.
   If a future caller aims rays at vertices on purpose, read that test first.

   Three things make the bitwise claim hold everywhere else:

   1. THE TRIANGLE TEST IS A TRANSCRIPTION. triHit below is
      THREE.Ray.intersectTriangle written out in scalars, in the same
      operation order, with the same sign convention and the same order of
      barycentric rejections. Same doubles, same sequence, same answer.
   2. THE RAY IS BUILT THE SAME WAY. Stock inverts matrixWorld, transforms the
      origin as a point and the direction as a NORMALIZED direction, and then
      measures distance by mapping the local hit point back to world and
      taking origin.distanceTo(point). All of that is reproduced rather than
      approximated with a scale factor.
   3. NEAREST BY LOCAL t IS NEAREST BY WORLD DISTANCE for any invertible
      affine matrix, not only for rigid ones. The local ray keeps the world
      origin's preimage and a unit direction, so a local hit at parameter t
      maps to a world point at distance t * |A d|, where A is the linear part
      and d the unit local direction. That factor does not depend on t, so
      ordering by t and ordering by world distance are the same ordering.
      Without it, pruning the tree by t would be unsound under scale.

   WHAT IT DECLINES TO HANDLE, falling back to the stock raycaster so the
   answer is still right: InstancedMesh (per-instance matrices have no place
   in a per-geometry tree, and the whole car holds about 20,000 instanced
   triangles, which is noise), interleaved or non-float position attributes,
   morph targets, a non-default drawRange, an array material with groups, and
   any geometry below MIN_TRIS, where a linear sweep is cheaper than the
   traversal that would replace it. */

import * as THREE from '../vendor/three.module.js';

/* Triangles below this stay on the stock path. A 12-triangle box costs about
   a microsecond to sweep whole, which is roughly the traversal overhead it
   would be trading for, and building a tree over it costs more than either.
   At Gen 9 everything below 32 triangles is 0.03 percent of the car. */
const MIN_TRIS = 32;

/* Leaf size. Bigger leaves mean a shallower tree and fewer box tests at the
   cost of more triangle tests per leaf reached. */
const LEAF_TRIS = 8;

/* Depth past which a split is forced to an object median. Midpoint splitting
   has no depth bound of its own, and an unbounded tree would overrun the
   traversal stack. Reaching this is pathological, not routine. */
const FORCE_MEDIAN_DEPTH = 32;

let cacheMap = new WeakMap();   // geometry -> bvh | null
let instSeen = new WeakSet();   // instanced geometries already tallied

const stats = {
  built: 0,        // geometries given a tree
  skipped: 0,      // geometries that reached build() and were refused
  /* Instanced geometries turned away before build() is even reached. They
     are counted separately and NOT folded into `skipped`, because `skipped`
     is the number of geometries the eligibility rules rejected and this is
     the number the entry point rejected. What a reader wants when they ask
     "how much of the car is still on the stock raycaster" is the SUM, and
     until 2026-08-08 only `skipped` was reported: Gen 9 printed "6 skipped"
     while 49 geometries were on the stock path, because 43 instanced ones
     were invisible to the tally. */
  instanced: 0,
  tris: 0,         // triangles indexed
  nodes: 0,
  bytes: 0,        // retained bytes of tree, excluding the geometry itself
  buildMs: 0,
  maxDepth: 0,
};

/* `stock` is the honest answer to "how many geometries did the tree refuse". */
export const bvhStats = () => ({ ...stats, stock: stats.skipped + stats.instanced });

/* For benchmarking only: forget every tree so a build can be timed again. */
export function bvhReset() {
  cacheMap = new WeakMap();
  instSeen = new WeakSet();
  stats.built = stats.skipped = stats.tris = stats.nodes = stats.bytes = 0;
  stats.instanced = 0;
  stats.buildMs = 0;
  stats.maxDepth = 0;
}

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

/* ── Build ─────────────────────────────────────────────────────────────── */

function positionArray(geometry) {
  const pos = geometry.attributes.position;
  if (!pos || pos.isInterleavedBufferAttribute || pos.itemSize !== 3) return null;
  const a = pos.array;
  return (a instanceof Float32Array || a instanceof Float64Array) ? a : null;
}

function indexArray(geometry) {
  const idx = geometry.index;
  if (!idx) return null;
  const a = idx.array;
  return (a instanceof Uint32Array || a instanceof Uint16Array || a instanceof Uint8Array) ? a : null;
}

function eligible(geometry, material) {
  if (Array.isArray(material)) return false;
  if (geometry.morphAttributes && Object.keys(geometry.morphAttributes).length) return false;
  const dr = geometry.drawRange;
  if (dr && (dr.start !== 0 || dr.count !== Infinity)) return false;
  if (geometry.index && !indexArray(geometry)) return false;
  return !!positionArray(geometry);
}

/* Object median on one axis: sort the subrange by centroid and cut in half.
   Reached when the spatial median puts every triangle on one side, and when
   the tree has gone deeper than FORCE_MEDIAN_DEPTH. */
function medianSplit(order, c, start, count) {
  const slice = Array.prototype.slice.call(order.subarray(start, start + count));
  slice.sort((a, b) => c[a] - c[b]);
  order.set(slice, start);
  return start + (count >> 1);
}

/* Node encoding, three Int32 per node:
     meta[3n]     leaf ? first triangle slot in `order` : left child index
     meta[3n + 1] triangle count, 0 marks an internal node
     meta[3n + 2] internal only: right child index
   Bounds are six Float32 per node, min then max. */
function build(geometry, material) {
  if (!eligible(geometry, material)) return null;
  const pos = positionArray(geometry);
  const index = indexArray(geometry);
  const triN = (((index ? index.length : pos.length / 3) / 3) | 0);
  if (triN < MIN_TRIS) return null;

  const t0 = now();

  /* per-triangle bounds and centroids, discarded when the build ends */
  const tb = new Float32Array(triN * 6);
  const cent = [new Float32Array(triN), new Float32Array(triN), new Float32Array(triN)];
  for (let t = 0; t < triN; t++) {
    const i0 = index ? index[t * 3] * 3 : t * 9;
    const i1 = index ? index[t * 3 + 1] * 3 : t * 9 + 3;
    const i2 = index ? index[t * 3 + 2] * 3 : t * 9 + 6;
    const ax = pos[i0], ay = pos[i0 + 1], az = pos[i0 + 2];
    const bx = pos[i1], by = pos[i1 + 1], bz = pos[i1 + 2];
    const gx = pos[i2], gy = pos[i2 + 1], gz = pos[i2 + 2];
    const lox = Math.min(ax, bx, gx), hix = Math.max(ax, bx, gx);
    const loy = Math.min(ay, by, gy), hiy = Math.max(ay, by, gy);
    const loz = Math.min(az, bz, gz), hiz = Math.max(az, bz, gz);
    const o = t * 6;
    tb[o] = lox; tb[o + 1] = loy; tb[o + 2] = loz;
    tb[o + 3] = hix; tb[o + 4] = hiy; tb[o + 5] = hiz;
    cent[0][t] = (lox + hix) * 0.5;
    cent[1][t] = (loy + hiy) * 0.5;
    cent[2][t] = (loz + hiz) * 0.5;
  }

  const order = new Uint32Array(triN);
  for (let i = 0; i < triN; i++) order[i] = i;

  let cap = Math.max(16, ((triN / LEAF_TRIS) | 0) * 2 + 16);
  let bounds = new Float32Array(cap * 6);
  let meta = new Int32Array(cap * 3);
  let nodeN = 0;
  let maxDepth = 0;

  const newNode = () => {
    if (nodeN === cap) {
      cap *= 2;
      const nb = new Float32Array(cap * 6); nb.set(bounds); bounds = nb;
      const nm = new Int32Array(cap * 3); nm.set(meta); meta = nm;
    }
    return nodeN++;
  };

  /* explicit stack of (node, start, count, depth) */
  const stack = [newNode(), 0, triN, 0];
  while (stack.length) {
    const depth = stack.pop();
    const count = stack.pop();
    const start = stack.pop();
    const node = stack.pop();
    if (depth > maxDepth) maxDepth = depth;

    let lox = Infinity, loy = Infinity, loz = Infinity;
    let hix = -Infinity, hiy = -Infinity, hiz = -Infinity;
    let clox = Infinity, cloy = Infinity, cloz = Infinity;
    let chix = -Infinity, chiy = -Infinity, chiz = -Infinity;
    for (let i = start; i < start + count; i++) {
      const t = order[i], o = t * 6;
      if (tb[o] < lox) lox = tb[o];
      if (tb[o + 1] < loy) loy = tb[o + 1];
      if (tb[o + 2] < loz) loz = tb[o + 2];
      if (tb[o + 3] > hix) hix = tb[o + 3];
      if (tb[o + 4] > hiy) hiy = tb[o + 4];
      if (tb[o + 5] > hiz) hiz = tb[o + 5];
      const px = cent[0][t], py = cent[1][t], pz = cent[2][t];
      if (px < clox) clox = px; if (px > chix) chix = px;
      if (py < cloy) cloy = py; if (py > chiy) chiy = py;
      if (pz < cloz) cloz = pz; if (pz > chiz) chiz = pz;
    }
    const nb = node * 6;
    bounds[nb] = lox; bounds[nb + 1] = loy; bounds[nb + 2] = loz;
    bounds[nb + 3] = hix; bounds[nb + 4] = hiy; bounds[nb + 5] = hiz;

    if (count <= LEAF_TRIS) {
      meta[node * 3] = start;
      meta[node * 3 + 1] = count;
      continue;
    }

    const ex = chix - clox, ey = chiy - cloy, ez = chiz - cloz;
    const axis = ex > ey ? (ex > ez ? 0 : 2) : (ey > ez ? 1 : 2);
    const c = cent[axis];
    const ext = axis === 0 ? ex : axis === 1 ? ey : ez;

    let mid;
    if (ext <= 0) {
      /* every centroid coincides, so no split separates them: halve the range
         arbitrarily rather than build a leaf of unbounded size */
      mid = start + (count >> 1);
    } else if (depth >= FORCE_MEDIAN_DEPTH) {
      mid = medianSplit(order, c, start, count);
    } else {
      /* spatial median: partition about the center of the centroid bounds.
         No sort, one pass, and it separates long runs of geometry the way a
         picking ray meets them. */
      const pivot = (axis === 0 ? clox + chix : axis === 1 ? cloy + chiy : cloz + chiz) * 0.5;
      let i = start, j = start + count - 1;
      while (i <= j) {
        if (c[order[i]] < pivot) i++;
        else { const tmp = order[i]; order[i] = order[j]; order[j] = tmp; j--; }
      }
      mid = i;
      /* a degenerate partition means every centroid landed on one side of its
         own midpoint, which real geometry does whenever one triangle is an
         outlier; fall back to an object median so the leaves stay bounded */
      if (mid === start || mid === start + count) mid = medianSplit(order, c, start, count);
    }

    const left = newNode();
    const right = newNode();
    meta[node * 3] = left;
    meta[node * 3 + 1] = 0;
    meta[node * 3 + 2] = right;
    stack.push(left, start, mid - start, depth + 1);
    stack.push(right, mid, start + count - mid, depth + 1);
  }

  /* trim to the nodes actually used, so a doubled allocation is not retained */
  if (nodeN < cap) {
    bounds = bounds.slice(0, nodeN * 6);
    meta = meta.slice(0, nodeN * 3);
  }

  const bvh = {
    bounds, meta, order, pos, index, nodeN, triN, maxDepth,
    bytes: bounds.byteLength + meta.byteLength + order.byteLength,
  };
  ensureStack(maxDepth);
  stats.built++;
  stats.tris += triN;
  stats.nodes += nodeN;
  stats.bytes += bvh.bytes;
  stats.buildMs += now() - t0;
  if (maxDepth > stats.maxDepth) stats.maxDepth = maxDepth;
  return bvh;
}

/* ── Traversal ─────────────────────────────────────────────────────────── */

const _inv = new THREE.Matrix4();
let _stackN = new Int32Array(64);
let _stackT = new Float64Array(64);

/* One traversal pushes at most two entries per level, and the root costs one,
   so depth + 2 slots always suffice. */
function ensureStack(depth) {
  const want = depth + 4;
  if (want <= _stackN.length) return;
  let n = _stackN.length;
  while (n < want) n *= 2;
  _stackN = new Int32Array(n);
  _stackT = new Float64Array(n);
}

/* THREE.Ray.intersectTriangle in scalars: same order, same rejections.
   Returns the ray parameter t, or -1 for a miss. */
function triHit(ox, oy, oz, dx, dy, dz, ax, ay, az, bx, by, bz, cx, cy, cz, cull) {
  const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
  const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;
  const nx = e1y * e2z - e1z * e2y;
  const ny = e1z * e2x - e1x * e2z;
  const nz = e1x * e2y - e1y * e2x;

  let DdN = dx * nx + dy * ny + dz * nz;
  let sign;
  if (DdN > 0) {
    if (cull) return -1;
    sign = 1;
  } else if (DdN < 0) {
    sign = -1;
    DdN = -DdN;
  } else {
    return -1;
  }

  const qx = ox - ax, qy = oy - ay, qz = oz - az;
  const q2x = qy * e2z - qz * e2y;          // cross(diff, e2)
  const q2y = qz * e2x - qx * e2z;
  const q2z = qx * e2y - qy * e2x;
  const DdQxE2 = sign * (dx * q2x + dy * q2y + dz * q2z);
  if (DdQxE2 < 0) return -1;

  const e1qx = e1y * qz - e1z * qy;         // cross(e1, diff)
  const e1qy = e1z * qx - e1x * qz;
  const e1qz = e1x * qy - e1y * qx;
  const DdE1xQ = sign * (dx * e1qx + dy * e1qy + dz * e1qz);
  if (DdE1xQ < 0) return -1;

  if (DdQxE2 + DdE1xQ > DdN) return -1;

  const QdN = -sign * (qx * nx + qy * ny + qz * nz);
  if (QdN < 0) return -1;

  return QdN / DdN;
}

/* Slab test. Returns the entry parameter (0 if the origin is inside) or -1
   when the box is missed or lies entirely at or beyond tMax.

   TWO THINGS HERE ARE NOT THE TEXTBOOK FORM, and both are there because the
   textbook form was measured wrong on this geometry.

   1. AN AXIS THE RAY DOES NOT TRAVEL ALONG IS HANDLED, NOT DIVIDED BY. Such
      an axis arrives with a reciprocal of exactly 0, which a real reciprocal
      can never be (1/d overflows to Infinity long before it underflows to
      zero), and it means what it says: the ray is parallel to that pair of
      planes, so the slab either contains the origin and bounds nothing, or
      it does not and the box is missed. Going through Infinity cannot say
      that. A ray lying EXACTLY in one of the planes computes
      0 * Infinity = NaN, every comparison against NaN is false, and the node
      is thrown away with its triangles. On the ROOT node that throws away
      the whole mesh.

   2. THE COMPARISONS CARRY A GRAZE SLACK. tmin and tmax are two roundings
      each off float32 bounds; triHit solves the same surfaces by a
      completely different expression in doubles. On a ray that grazes a box
      along an edge or through a corner the two disagree by an ulp or so, the
      slab test concludes tmin > tmax, and a real hit inside is never tested.
      The slack is four double ulps of tmax plus a picometer floor, so a box
      is at worst one part in 10^15 too generous, which costs a few extra
      triangle tests and never an answer.

   Both were measured, and the measurement is the reason the slack is here
   rather than a paragraph explaining why it is not. This is tools/bvhcheck.sh
   TEST C, which judges every answerer against a brute-force sweep of every
   triangle in local space with no sphere and no box in front of it. On gen9,
   20,774 degenerate rays, axis-parallel rays sliding along mesh box planes
   plus rays starting on and aimed at sampled vertices, with ordinary rays as
   a control:

     THREE.Mesh.raycast   132 wrong, all of them its world sphere test
                          losing a hit its own triangle loop finds
     this test, textbook   82 wrong, 43 lost outright and 39 naming a
                          surface up to 53.4 mm behind the right one
     this test, as below   27 wrong, 21 lost and 6 farther, worst 8.8 mm

   The cost of the difference, both box tests alternating over the same
   4,000 camera rays x 663 Gen 9 meshes in one process, seven rounds, median:
   319.0 ms textbook against 316.1 ms for this one. It is not slower, and
   tools/pickbench.sh over the whole pipeline says the same. The version of
   this comment that argued an epsilon would be "a real cost on every frame"
   was an assertion, and it was wrong by measurement. Set GRAZE and
   GRAZE_FLOOR to 0 and bvhcheck fails gen9 at 82 against 27: the guard is
   live, and that is how these two numbers were checked. */
const GRAZE = 8.9e-16;      // four double ulps
const GRAZE_FLOOR = 1e-12;  // meters, so a box at t near zero still has slack

function boxT(bounds, node, ox, oy, oz, idx, idy, idz, tMax) {
  const b = node * 6;
  let tmin = -Infinity, tmax = Infinity;
  let t1, t2;

  if (idx !== 0) {
    t1 = (bounds[b] - ox) * idx;
    t2 = (bounds[b + 3] - ox) * idx;
    if (t1 > t2) { const s = t1; t1 = t2; t2 = s; }
    tmin = t1; tmax = t2;
  } else if (ox < bounds[b] || ox > bounds[b + 3]) return -1;

  if (idy !== 0) {
    t1 = (bounds[b + 1] - oy) * idy;
    t2 = (bounds[b + 4] - oy) * idy;
    if (t1 > t2) { const s = t1; t1 = t2; t2 = s; }
    if (t1 > tmin) tmin = t1;
    if (t2 < tmax) tmax = t2;
  } else if (oy < bounds[b + 1] || oy > bounds[b + 4]) return -1;

  if (idz !== 0) {
    t1 = (bounds[b + 2] - oz) * idz;
    t2 = (bounds[b + 5] - oz) * idz;
    if (t1 > t2) { const s = t1; t1 = t2; t2 = s; }
    if (t1 > tmin) tmin = t1;
    if (t2 < tmax) tmax = t2;
  } else if (oz < bounds[b + 2] || oz > bounds[b + 5]) return -1;

  const slack = (tmax > 0 ? tmax : -tmax) * GRAZE + GRAZE_FLOOR;
  if (tmax < -slack || tmin > tmax + slack || tmin - slack >= tMax) return -1;
  return tmin > slack ? tmin - slack : 0;
}

/* Nearest triangle along a LOCAL ray. `hit` receives [t, triIndex], t = -1 on
   a miss. `flip` swaps the winding, which is what BackSide asks for. */
/* `accept` is optional and takes the LOCAL ray parameter of a candidate hit,
   returning false for one that must not be kept. It exists for the section
   plane and it is the difference between "the nearest triangle" and "the
   nearest triangle a reader can actually see", which are not the same question
   once a clipping plane is on. Threaded through the traversal rather than
   applied to its result, because this tree keeps ONE hit per mesh: filtering
   afterward can only discard that hit, never replace it with the next one
   behind it, so the whole mesh dropped out of the pick. See the note on `clip`
   in bvhRaycast. When it is undefined the `!accept` short-circuits ahead of
   every call and this function is byte-for-byte the function it was. */
function traverse(bvh, ox, oy, oz, dx, dy, dz, tMax, cull, flip, hit, accept) {
  const bounds = bvh.bounds, meta = bvh.meta, order = bvh.order;
  const pos = bvh.pos, index = bvh.index;
  /* 0 marks "the ray does not travel along this axis". A real reciprocal can
     never be 0 for a unit direction, so the sentinel cannot collide with one,
     and boxT handles that axis as a containment test instead of a division.
     Infinity here is what produced 0 * Infinity = NaN inside boxT. */
  const idx = dx !== 0 ? 1 / dx : 0;
  const idy = dy !== 0 ? 1 / dy : 0;
  const idz = dz !== 0 ? 1 / dz : 0;

  let best = tMax, bestTri = -1;
  const t0 = boxT(bounds, 0, ox, oy, oz, idx, idy, idz, best);
  if (t0 < 0) { hit[0] = -1; return; }

  let sp = 0;
  _stackN[sp] = 0; _stackT[sp] = t0; sp++;

  while (sp > 0) {
    sp--;
    if (_stackT[sp] >= best) continue;
    const node = _stackN[sp];

    const count = meta[node * 3 + 1];
    if (count > 0) {
      const start = meta[node * 3];
      for (let i = start; i < start + count; i++) {
        const t = order[i];
        let i0 = index ? index[t * 3] * 3 : t * 9;
        const i1 = index ? index[t * 3 + 1] * 3 : t * 9 + 3;
        let i2 = index ? index[t * 3 + 2] * 3 : t * 9 + 6;
        if (flip) { const s = i0; i0 = i2; i2 = s; }
        const d = triHit(ox, oy, oz, dx, dy, dz,
          pos[i0], pos[i0 + 1], pos[i0 + 2],
          pos[i1], pos[i1 + 1], pos[i1 + 2],
          pos[i2], pos[i2 + 1], pos[i2 + 2], cull);
        if (d >= 0 && d < best && (!accept || accept(d))) { best = d; bestTri = t; }
      }
      continue;
    }

    const l = meta[node * 3], r = meta[node * 3 + 2];
    const tl = boxT(bounds, l, ox, oy, oz, idx, idy, idz, best);
    const tr = boxT(bounds, r, ox, oy, oz, idx, idy, idz, best);
    /* push the farther child first, so the nearer one comes off the stack
       next and can tighten `best` before the far one is reached */
    if (tl >= 0 && tr >= 0) {
      if (tl <= tr) {
        _stackN[sp] = r; _stackT[sp] = tr; sp++;
        _stackN[sp] = l; _stackT[sp] = tl; sp++;
      } else {
        _stackN[sp] = l; _stackT[sp] = tl; sp++;
        _stackN[sp] = r; _stackT[sp] = tr; sp++;
      }
    } else if (tl >= 0) {
      _stackN[sp] = l; _stackT[sp] = tl; sp++;
    } else if (tr >= 0) {
      _stackN[sp] = r; _stackT[sp] = tr; sp++;
    }
  }

  hit[0] = bestTri < 0 ? -1 : best;
  hit[1] = bestTri;
}

/* ── Public entry ──────────────────────────────────────────────────────── */

/* The tree for this mesh, built on first ask and cached. Returns null for a
   mesh that must use the stock path; that answer is cached too, so an
   ineligible geometry is examined once. */
export function bvhFor(mesh) {
  if (mesh.isInstancedMesh) {
    /* tallied once per geometry, the same rule the cache uses, so repeated
       asks about the same instanced geometry do not inflate the count */
    if (!instSeen.has(mesh.geometry)) { instSeen.add(mesh.geometry); stats.instanced++; }
    return null;
  }
  if (!mesh.isMesh) return null;
  const geo = mesh.geometry;
  let bvh = cacheMap.get(geo);
  if (bvh === undefined) {
    bvh = build(geo, mesh.material);
    if (!bvh) stats.skipped++;
    cacheMap.set(geo, bvh);
  }
  return bvh;
}

const _hit = [0, 0];
const _pt = new THREE.Vector3();
/* its own scratch, not _pt: the clip predicate runs DURING the traversal and
   _pt holds the reported hit point after it, so sharing one would have the
   acceptance test overwrite the answer it is helping to find */
const _cpt = new THREE.Vector3();

/* Drop-in for mesh.raycast(raycaster, intersects) when only the NEAREST
   intersection on this mesh matters. Pushes at most one, and pushes what the
   stock nearest hit would have been. `maxDistance` is an optional world-space
   bound: a caller already holding a nearer hit on another mesh can pass it
   and the tree prunes against it. `invMatrix` is an optional precomputed
   inverse of matrixWorld, for a caller that rays the same mesh several times
   between matrix updates. Returns false when this mesh has no tree, in which
   case the caller must fall back to mesh.raycast.

   Everything here mirrors THREE.Mesh.raycast: same inverse-matrix ray, same
   far rejection, same distance measured in world space from the transformed
   hit point. Two deliberate differences, both measured rather than assumed:

   A NONZERO raycaster.near IS DECLINED, returning false so the caller falls
   back to stock. Stock keeps the nearest hit at or beyond near; this tree
   finds the nearest hit outright and can then only drop it, so where stock
   returns the second surface this returned nothing. 274 of 289 gen9 meshes
   diverged before it was declined. The viewer never sets near.

   THE STOCK BOUNDING-SPHERE REJECT IS NOT REPRODUCED, because the tree's root
   box does the same job more tightly, and on this geometry it does it more
   correctly: 40 of the degenerate rays above are ones where stock's world
   sphere test threw away a hit its own triangle loop finds when asked
   directly. Those are counted as divergences by the harness and the tree is
   the side that is right. */
/* `clip` is the section plane, in WORLD space, and it returns true for a point
   the plane has REMOVED. It is the same predicate js/pick.js applies to a hit,
   handed in rather than applied afterward.

   THE REASON IT CANNOT BE APPLIED AFTERWARD is the shape of this tree. It
   returns at most ONE intersection per mesh, the nearest, which is what makes
   it cheap and is stated all over this file. A per-hit filter on top of that
   can only DISCARD the mesh's single hit, never fall through to the surface
   behind it, so a mesh whose nearest triangle the section had removed dropped
   out of the pick entirely and the surface actually drawn on screen was never
   a candidate. THREE.Mesh.raycast pushes every intersection, so the stock
   fallback path never had the hole, which is why hover and click disagreed
   with what the reader could see only while a section was open.

   Costs nothing when no section is on: undefined here means undefined all the
   way down and the traversal short-circuits ahead of every call. */
export function bvhRaycast(mesh, raycaster, intersects, maxDistance, invMatrix, clip) {
  const material = mesh.material;
  /* An array material means per-group materials, and a group can cull
     differently from its neighbor, which one tree cannot express. The cache
     is keyed on the geometry, so this has to be re-checked per MESH rather
     than trusted from the build: two meshes may share a geometry and not
     share a material. Nothing in this tree does today. */
  if (Array.isArray(material)) return false;

  /* A nonzero near is DECLINED rather than approximated. Stock keeps the
     nearest hit whose distance is at least `near`; this tree finds the
     nearest hit period and can then only drop it, so on a mesh with a
     surface inside `near` and another beyond it stock returns the second
     surface and this returned nothing. Measured on gen9 by aiming at each
     tree-bearing mesh's center and setting near just past the first hit:
     274 of 289 meshes diverged. The viewer never sets near, so declining
     costs nothing today and keeps the drop-in claim true for the callers
     that do. */
  if (raycaster.near > 0) return false;

  const bvh = bvhFor(mesh);
  if (!bvh) return false;
  if (material === undefined) return true;

  const ray = raycaster.ray;
  const mw = mesh.matrixWorld;
  const e = mw.elements;

  /* local ray: origin as a point, direction as a normalized direction, the
     way THREE.Ray.applyMatrix4 builds it */
  const ie = (invMatrix || _inv.copy(mw).invert()).elements;
  const px = ray.origin.x, py = ray.origin.y, pz = ray.origin.z;
  const w = 1 / (ie[3] * px + ie[7] * py + ie[11] * pz + ie[15]);
  const ox = (ie[0] * px + ie[4] * py + ie[8] * pz + ie[12]) * w;
  const oy = (ie[1] * px + ie[5] * py + ie[9] * pz + ie[13]) * w;
  const oz = (ie[2] * px + ie[6] * py + ie[10] * pz + ie[14]) * w;
  const rx = ray.direction.x, ry = ray.direction.y, rz = ray.direction.z;
  let dx = ie[0] * rx + ie[4] * ry + ie[8] * rz;
  let dy = ie[1] * rx + ie[5] * ry + ie[9] * rz;
  let dz = ie[2] * rx + ie[6] * ry + ie[10] * rz;
  const dinv = 1 / (Math.sqrt(dx * dx + dy * dy + dz * dz) || 1);
  dx *= dinv; dy *= dinv; dz *= dinv;

  /* world distance is t times the linear part applied to the unit local
     direction, and that factor is constant along the ray, so a world bound
     converts to a t bound exactly */
  /* ONLY maxDistance prunes the traversal, and `far` deliberately does not.
     The two are not the same kind of bound and were treated as one. `far` is
     INCLUSIVE in stock, which drops a hit only when distance is strictly
     greater, so a hit landing exactly on far is kept; the traversal here is
     exclusive, `d < best`, so feeding far in as best dropped it. Measured on
     gen9, aiming at each tree-bearing mesh's center and setting far to that
     hit's own distance, all 288 meshes that were hit diverged. Nudging the
     bound would only move the boundary, because t and world distance are
     related by a factor this function computes separately from the distance
     it finally reports, so the two can never agree to the bit at the edge.
     Dropping the prune costs nothing and is exactly equivalent: the nearest
     hit is the smallest, so if it is beyond far then every hit is, and the
     distance test below is a copy of stock's and is what enforces far.
     `maxDistance` is a caller's own "I already hold something this near"
     bound, stays exclusive, and is the one that pays for itself. */
  let tMax = Infinity;
  if (maxDistance !== undefined) {
    const wx = e[0] * dx + e[4] * dy + e[8] * dz;
    const wy = e[1] * dx + e[5] * dy + e[9] * dz;
    const wz = e[2] * dx + e[6] * dy + e[10] * dz;
    const k = Math.sqrt(wx * wx + wy * wy + wz * wz) || 1;
    tMax = maxDistance / k;
  }

  const back = material.side === THREE.BackSide;
  /* the candidate's LOCAL point taken to world with the same matrix the final
     hit below uses, so the traversal and the reported hit agree on where the
     point is. Built only when there is a section to test against, and reached
     only by a triangle that would have become the new nearest, which is a
     handful of times per ray rather than once per triangle. */
  const accept = clip
    ? (t) => {
        _cpt.set(ox + dx * t, oy + dy * t, oz + dz * t).applyMatrix4(mw);
        return !clip(_cpt.x, _cpt.y, _cpt.z);
      }
    : undefined;
  traverse(bvh, ox, oy, oz, dx, dy, dz, tMax,
    back || material.side === THREE.FrontSide, back, _hit, accept);
  if (_hit[0] < 0) return true;

  const t = _hit[0];
  _pt.set(ox + dx * t, oy + dy * t, oz + dz * t).applyMatrix4(mw);
  const distance = ray.origin.distanceTo(_pt);
  if (distance < raycaster.near || distance > raycaster.far) return true;

  intersects.push({
    distance,
    point: _pt.clone(),
    object: mesh,
    faceIndex: _hit[1],
  });
  return true;
}
