/* Shared packaging spec, materials, and geometry helpers.
   Every system module builds against these so the vehicle assembles cleanly. */

import * as THREE from '../vendor/three.module.js';
import { TEX } from './textures.js';

/* ── Packaging spec ──────────────────────────────────────────────────────
   Units are meters. +X is forward, +Y is up, +Z is the passenger side.
   The driver sits at negative Z. Ground plane is y = 0.
   Every system must stay inside its zone at explode = 0. */

export const P = {
  length: 4.75, width: 1.88, height: 1.44,
  wheelbase: 2.90, track: 1.62,
  axleF: 1.45, axleR: -1.45,          // x of front and rear axle centerlines
  wheelY: 0.355,                      // wheel center height
  wheelZ: 0.81,                       // wheel center |z|
  tireR: 0.355, tireW: 0.235, rimR: 0.24,
  ground: 0,
  floor: 0.36,                        // cabin floor top
  belt: 0.92,                         // beltline
  roof: 1.42,
  /* THE PACK, and why it now takes two entries instead of one.

     One constant was doing two incompatible jobs and both of them were
     wrong. It was written as a reserved keep-out zone, and it is also the
     DRAWING DATUM five packs cut their floor and lid from: battery.js,
     battery-2, battery-3, battery-5 and battery-6 all open with
     `const B = P.battery` and take W = B.x[1] - B.x[0] = 2.60 as the tray
     length and D = B.z[1] - B.z[0] = 1.44 as its width, and battery.js
     lands its coolant stub on B.x[1] + 0.02. Widening x or z here to
     describe what the newer packs build would silently move five older
     packs, which is the P.wheelZ trap wheels-9.js names in its own file.
     So `battery.x` and `battery.z` are frozen at the datum, and the note
     below says so rather than leaving the next reader to find out.

     `battery.y` is read by no module at all, only by the checker, and
     [0.13, 0.31] stopped describing anything generations ago. Swept off
     the built mesh of all five registered variants it is 0.1025 at
     battery-7's strike shield and 0.3600 at battery's contactor box, so
     it is corrected here to the band the packs occupy, rounded OUTWARD
     to the centimeter like batteryZone below. 0.10 is therefore 2.5 mm
     under the lowest thing any pack builds, and 0.36 is exact.

     `batteryZone` is the MEASURED outer envelope, the union of the built
     bounding boxes of battery, battery-2, battery-3, battery-6 and
     battery-7, rounded outward to the centimeter: x reaches 1.3700 on
     battery's coolplate stub, z reaches 0.7800 on the rocker rails of
     battery-3, -6 and -7. tools/interfaces.js asserts the packs stay
     inside it, so growing a pack past this line flags the constant as
     stale instead of quietly falsifying it. It is NOT a keep-out test:
     what that tool fails on is penetration into the pack's built surface,
     measured off the geometry, not presence in any box. */
  battery: { x: [-1.30, 1.30], y: [0.10, 0.36], z: [-0.72, 0.72] },
  /* y ceiling 0.36 to 0.43 on 2026-08-12, for battery-11's structural sill.
     This is the constant behaving as designed rather than an exemption. The
     comment above says growing a pack past the zone should flag the CONSTANT
     as stale, and that is what happened: battery-11 merges the pack's rocker
     rail with body-9's rocker beam into one member that reaches y 0.4200,
     closing the 65.0 mm air gap the two used to leave between them, so the
     measured outer envelope of the registered packs genuinely moved.
     Rounded outward to the centimeter like every other bound here, giving
     0.43 against a built 0.4200. x and z are untouched and still describe
     battery's coolplate stub at 1.3700 and the rocker rails at 0.7800.
     NOTHING READS THIS BUT tools/interfaces.js: grep says the only other
     mentions in the tree are battery-11's own note proposing the change.
     So it cannot move geometry, and tools/geohash.sh proves it did not. */
  batteryZone: { x: [-1.30, 1.37], y: [0.10, 0.43], z: [-0.78, 0.78] },
  driveF:  { x: [1.15, 1.75],  y: [0.22, 0.58], z: [-0.35, 0.35] },
  driveR:  { x: [-1.80, -1.15], y: [0.22, 0.58], z: [-0.35, 0.35] },
  frunk:   { x: [1.78, 2.12],  y: [0.55, 0.85], z: [-0.45, 0.45] },
  thermalFront: { x: [2.08, 2.26], y: [0.25, 0.78], z: [-0.45, 0.45] },
  penthouse: { x: [-1.58, -1.16], y: [0.33, 0.56], z: [-0.45, 0.45] },
  chargePort: [-1.92, 0.80, 0.88],    // rear passenger-side quarter
  lidar: [0.35, 1.455, 0],
};

/* ── Materials ───────────────────────────────────────────────────────────
   Shared singletons. The registry clones materials per part at build time,
   so highlighting one part never bleeds into another. DoubleSide is the
   default because several systems mirror geometry across z. */

function std(o) {
  return new THREE.MeshStandardMaterial(Object.assign({ side: THREE.DoubleSide }, o));
}
function phys(o) {
  return new THREE.MeshPhysicalMaterial(Object.assign({ side: THREE.DoubleSide }, o));
}

/* AUTOMOTIVE PAINT is two coats and has to be modeled as two coats.

   Underneath is a color basecoat loaded with aluminum platelets a few
   microns across, each a tiny mirror at its own angle. That is a metal, so
   metalness runs high, and the platelets scatter the reflection into
   discrete moving points. Roughness cannot stand in for that: roughness
   blurs a reflection evenly, flake breaks it up. It needs a normal map.

   On top is clear lacquer, which is a dielectric and very nearly a mirror.
   Its imperfection is ORANGE PEEL, a gentle swell about a millimeter across
   left by surface tension before the coat cured. That belongs in
   clearcoatNormalMap, NOT in clearcoatRoughness: roughness would haze the
   softbox reflections into a smear, whereas peel keeps them sharp and makes
   them undulate as they rake down the bodyside. Undulating hard-edged
   reflections are the whole reason viewer.js paints a studio with real
   softboxes instead of a gradient.

   This previously ran metalness 0.72 with clearcoatRoughness 0.16 and no
   normal map of any kind, which is why it read as dark polished metal. The
   maps it did carry never reached the car at all: lofted panels had no uv
   attribute until _arcUV, so the body was untextured on every rung. */
export const M = {
  paint:    phys({ color: 0x2a5666, metalness: 0.88, roughness: 0.38,
                   normalMap: TEX.paintFlakeNormal, normalScale: new THREE.Vector2(0.35, 0.35),
                   clearcoat: 1, clearcoatRoughness: 0.045,
                   clearcoatNormalMap: TEX.paintPeelNormal,
                   clearcoatNormalScale: new THREE.Vector2(0.10, 0.10),
                   roughnessMap: TEX.paintRough }),
  /* the dark trim color is a solid, not a metallic: no flake, and a softer
     clearcoat because trim lacquer is not polished to the same standard */
  paintDark:phys({ color: 0x15191e, metalness: 0.35, roughness: 0.42,
                   clearcoat: 0.75, clearcoatRoughness: 0.10,
                   clearcoatNormalMap: TEX.paintPeelNormal,
                   clearcoatNormalScale: new THREE.Vector2(0.14, 0.14),
                   roughnessMap: TEX.paintRough }),
  glass:    std({ color: 0x8fb6c4, metalness: 0.1, roughness: 0.06, transparent: true, opacity: 0.22 }),
  alu:      std({ color: 0xb8c2c9, metalness: 0.92, roughness: 0.3,
                  roughnessMap: TEX.brushedRough, normalMap: TEX.brushedNormal }),
  castAlu:  std({ color: 0x8f969d, metalness: 0.82, roughness: 0.56,
                  roughnessMap: TEX.castRough, normalMap: TEX.castNormal }),
  steel:    std({ color: 0x6f7880, metalness: 0.9, roughness: 0.42,
                  roughnessMap: TEX.brushedRough, normalMap: TEX.brushedNormal }),
  darkSteel:std({ color: 0x3a4046, metalness: 0.85, roughness: 0.5,
                  roughnessMap: TEX.castRough, normalMap: TEX.castNormal }),
  copper:   std({ color: 0xc97b4a, metalness: 1.0, roughness: 0.35, roughnessMap: TEX.brushedRough }),
  busbar:   std({ color: 0xd8a84e, metalness: 1.0, roughness: 0.3, roughnessMap: TEX.brushedRough }),
  cell:     std({ color: 0x9aa2a8, metalness: 0.85, roughness: 0.35,
                  roughnessMap: TEX.brushedRough, normalMap: TEX.brushedNormal }),
  rubber:   std({ color: 0x1d2023, metalness: 0.0, roughness: 0.95,
                  roughnessMap: TEX.rubberRough, normalMap: TEX.rubberNormal }),
  plastic:  std({ color: 0x2b3138, metalness: 0.05, roughness: 0.8, roughnessMap: TEX.castRough }),
  plasticLt:std({ color: 0x4a525a, metalness: 0.05, roughness: 0.75, roughnessMap: TEX.castRough }),
  pcb:      std({ color: 0x1f5c46, metalness: 0.2, roughness: 0.6, roughnessMap: TEX.castRough }),
  hv:       std({ color: 0xe8641e, metalness: 0.1, roughness: 0.7, roughnessMap: TEX.rubberRough }),
  coolant:  std({ color: 0x2e8fb0, metalness: 0.25, roughness: 0.55 }),
  coolantHot: std({ color: 0xc4563a, metalness: 0.25, roughness: 0.55 }),
  caliper:  std({ color: 0xc23b2e, metalness: 0.35, roughness: 0.42, roughnessMap: TEX.castRough }),
  /* low metalness so a flat upward-facing panel does not mirror the sky
     gradient and read as a glowing slab */
  carbon:   std({ color: 0x191c1f, metalness: 0.05, roughness: 0.72,
                  map: TEX.carbonColor, normalMap: TEX.carbonNormal }),
  fabric:   std({ color: 0x343a41, metalness: 0.0, roughness: 0.95,
                  map: TEX.fabricColor, normalMap: TEX.fabricNormal }),
  tan:      std({ color: 0x6e6252, metalness: 0.0, roughness: 0.88,
                  map: TEX.fabricColor, normalMap: TEX.fabricNormal }),
  white:    std({ color: 0xd6dade, metalness: 0.1, roughness: 0.5 }),
  lamp:     std({ color: 0xe8f2f6, emissive: 0xbfe4f0, emissiveIntensity: 0.9, roughness: 0.3 }),
  lampRed:  std({ color: 0x8a1a14, emissive: 0xd42a1e, emissiveIntensity: 0.7, roughness: 0.35 }),
  sensor:   std({ color: 0x232c36, metalness: 0.5, roughness: 0.28, emissive: 0x0d2c48, emissiveIntensity: 0.55 }),
};

/* ── Crisp-surface machinery (private) ───────────────────────────────────

   A lofted body reads soft for two geometric reasons, and both are fixed
   here rather than in a shader.

   1. computeVertexNormals averages across every shared edge, so a designed
      crease is smoothed into the panel beside it. _creaseGeo splits the
      normals at edges sharper than a threshold and leaves the rest smooth.

   2. The station tables are coarse. _grid resamples a loft through the same
      stations at any density, with an interpolant that is smooth where the
      data is smooth and keeps a corner where the data has one, and it can
      sink a real channel into the surface for a panel gap.

   The interpolant is a cubic Hermite on centripetal knots. Tangents are the
   Catmull-Rom ones, then limited by the Fritsch and Carlson test so no
   component ever leaves the interval spanned by the two stations it sits
   between. That limit bounds the ENVELOPE: textbook Catmull-Rom overshoots
   a local maximum, and on body-8's front fairing the overshoot is 16.9 mm
   of half-width, 1.00800 to 1.02494, which the limiter removes exactly.

   It does NOT bound the projected area, and the difference matters enough
   to state twice. Frontal area is the maximum half-width over x at each
   HEIGHT, so smoothing moves it wherever it moves the surface between
   profile points, whether or not any point passes the global maximum.
   Swept over body-8's shell by one integrator: linear 1.4107 m2, clamped
   Catmull-Rom 1.4197, clamped with kinks held at 36 degrees 1.4087,
   unclamped 1.4503. The clamp takes 2.8 percent down to 0.6 percent; only
   interp: 'linear' takes it to zero. Choose the mode on that number, not on
   the envelope. */

function _curve(pts, o) {
  const n = pts.length;
  if (n === 1) { const p = pts[0]; return { at: () => [p[0], p[1], p[2]] }; }
  const closed = !!o.closed, linear = !!o.linear, doClamp = o.clamp !== false;
  const hard = o.hard || null;
  const segs = closed ? n : n - 1;

  /* centripetal knot spacing: |dp|^0.5, which is what keeps a spline from
     looping when two stations sit close together */
  const h = new Float64Array(segs);
  const d = [];
  for (let i = 0; i < segs; i++) {
    const a = pts[i], b = pts[(i + 1) % n];
    const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    h[i] = Math.max(Math.sqrt(Math.sqrt(dx * dx + dy * dy + dz * dz)), 1e-6);
    d.push([dx / h[i], dy / h[i], dz / h[i]]);
  }

  const mIn = [], mOut = [];
  for (let i = 0; i < n; i++) {
    const pi = closed ? (i - 1 + segs) % segs : i - 1;
    const ni = closed ? i % segs : i;
    const dl = pi >= 0 && pi < segs ? d[pi] : null;
    const dr = ni >= 0 && ni < segs ? d[ni] : null;
    let m = null;
    if (!linear && !(hard && hard.has(i)) && dl && dr) {
      const hl = h[pi], hr = h[ni];
      m = [0, 0, 0];
      for (let k = 0; k < 3; k++) {
        let t = (dl[k] * hl + dr[k] * hr) / (hl + hr);
        if (doClamp) {
          if (dl[k] * dr[k] <= 0) t = 0;
          else {
            const lim = 3 * Math.min(Math.abs(dl[k]), Math.abs(dr[k]));
            if (Math.abs(t) > lim) t = t < 0 ? -lim : lim;
          }
        }
        m[k] = t;
      }
    }
    const one = (s) => (s ? [s[0], s[1], s[2]] : [0, 0, 0]);
    mIn.push(m ? m : one(dl || dr));
    mOut.push(m ? m : one(dr || dl));
  }

  return {
    at(u) {
      let i, t;
      if (closed) {
        const w = ((u % n) + n) % n;
        i = Math.floor(w); t = w - i;
        if (i >= n) { i = n - 1; t = 1; }
      } else {
        i = Math.floor(u);
        if (i < 0) i = 0;
        if (i > segs - 1) i = segs - 1;
        t = u - i;
      }
      const p0 = pts[i], p1 = pts[(i + 1) % n];
      const m0 = mOut[i], m1 = mIn[(i + 1) % n], hh = h[i];
      const t2 = t * t, t3 = t2 * t;
      const a0 = 2 * t3 - 3 * t2 + 1, a1 = t3 - 2 * t2 + t;
      const a2 = -2 * t3 + 3 * t2, a3 = t3 - t2;
      return [
        a0 * p0[0] + a1 * hh * m0[0] + a2 * p1[0] + a3 * hh * m1[0],
        a0 * p0[1] + a1 * hh * m0[1] + a2 * p1[1] + a3 * hh * m1[1],
        a0 * p0[2] + a1 * hh * m0[2] + a2 * p1[2] + a3 * hh * m1[2],
      ];
    },
  };
}

/* Indices along one axis that the interpolant must treat as corners: the
   explicit list, plus every index where the polyline turns by more than
   angleDeg in ANY line of the other axis. A corner here only PERMITS a
   crease; lib.crease still decides whether the angle is worth breaking. */
function _hardSet(n, m, get, explicit, angleDeg, closed) {
  const s = new Set(explicit || []);
  if (angleDeg == null) return s;
  const cosA = Math.cos((angleDeg * Math.PI) / 180);
  const lo = closed ? 0 : 1, hi = closed ? n : n - 1;
  for (let i = lo; i < hi; i++) {
    const im = (i - 1 + n) % n, ip = (i + 1) % n;
    for (let j = 0; j < m; j++) {
      const a = get(im, j), b = get(i, j), c = get(ip, j);
      const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      const vx = c[0] - b[0], vy = c[1] - b[1], vz = c[2] - b[2];
      const lu = Math.sqrt(ux * ux + uy * uy + uz * uz);
      const lv = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (lu < 1e-9 || lv < 1e-9) continue;
      if ((ux * vx + uy * vy + uz * vz) / (lu * lv) < cosA) { s.add(i); break; }
    }
  }
  return s;
}

/* smoothstep window with a run-out of `fade` index units at each end */
function _window(y, a, b, fade) {
  if (!(fade > 0)) return y >= a && y <= b ? 1 : 0;
  const s = (t) => { const u = t < 0 ? 0 : t > 1 ? 1 : t; return u * u * (3 - 2 * u); };
  return s((y - a) / fade) * s((b - y) / fade);
}

/* Resample a loft, optionally sinking grooves into it. Returns a grid the
   caller can slice into several meshes, which is how one continuous surface
   becomes a fixed panel and a door that share an exact shutline. */
function _grid(sections, o) {
  const rows = sections.length, cols = sections[0].length;
  const closed = !!o.closeLoop;
  const rowSub = Math.max(0, o.rowSub | 0), colSub = Math.max(0, o.colSub | 0);
  const linear = o.interp === 'linear';
  const doClamp = o.clamp !== false;

  const hardR = _hardSet(rows, cols, (i, j) => sections[i][j], o.hardRows, o.hardRowAngle, false);
  const hardC = _hardSet(cols, rows, (j, i) => sections[i][j], o.hardCols, o.hardColAngle, closed);

  const rowC = [];
  for (let j = 0; j < cols; j++) {
    const p = [];
    for (let i = 0; i < rows; i++) p.push(sections[i][j]);
    rowC.push(_curve(p, { hard: hardR, linear, clamp: doClamp }));
  }
  const rings = new Map();
  const ringAt = (u) => {
    let c = rings.get(u);
    if (!c) {
      const r = [];
      for (let j = 0; j < cols; j++) r.push(rowC[j].at(u));
      c = _curve(r, { closed, hard: hardC, linear, clamp: doClamp });
      rings.set(u, c);
    }
    return c;
  };
  const evalAt = (u, v) => ringAt(u).at(v);

  const U = [], V = [];
  for (let i = 0; i < rows - 1; i++) {
    U.push(i);
    for (let k = 1; k <= rowSub; k++) U.push(i + k / (rowSub + 1));
  }
  U.push(rows - 1);
  const vEnd = closed ? cols : cols - 1;
  for (let j = 0; j < vEnd; j++) {
    V.push(j);
    for (let k = 1; k <= colSub; k++) V.push(j + k / (colSub + 1));
  }
  if (!closed) V.push(cols - 1);

  /* Snapshot of the base lines, taken BEFORE any groove has pushed lines of
     its own. Every groove's scale is probed against this rather than against
     the live arrays, because the live arrays grow as grooves are declared:
     probing them made a groove's width depend on how many grooves came
     before it, and sent a mirror-symmetric pair to two different widths and
     two different split rows. */
  const U0 = U.slice(), V0 = V.slice();

  /* Grooves. width and depth are meters; the parametric half-width comes
     from the local meters-per-index scale averaged along the groove's run.
     The channel therefore holds its stated width only as well as that one
     average describes the whole run: measured on body-8 a 5 mm cut comes out
     4.8 to 5.2 mm along a flank, where the scale barely changes, and 3.9 to
     6.1 mm along a deck gap that crosses the nose, where it changes by a
     third. Split a long groove into spans if that matters. */
  const G = [];
  for (const spec of o.grooves || []) {
    const axis = spec.row != null ? 'row' : 'col';
    const at = axis === 'row' ? spec.row : spec.col;
    const w = spec.width, dep = spec.depth;
    const wall = spec.wall != null ? spec.wall : w * 0.28;
    /* Probe the scale only along the run the groove actually has, otherwise
       a hood gap gets sized by the ring spacing at the nose and the tail
       as well as its own, and comes out the wrong width everywhere. */
    const all = axis === 'row' ? V0 : U0;
    const probe = spec.span
      ? all.filter((y) => y >= spec.span[0] && y <= spec.span[1])
      : all;
    if (!probe.length) probe.push(spec.span ? (spec.span[0] + spec.span[1]) / 2 : all[0]);
    const step = Math.max(1, Math.floor(probe.length / 8));
    const e = 1e-3;
    let s = 0, ns = 0;
    for (let q = 0; q < probe.length; q += step) {
      const y = probe[q];
      const A = axis === 'row' ? evalAt(at - e, y) : evalAt(y, at - e);
      const B = axis === 'row' ? evalAt(at + e, y) : evalAt(y, at + e);
      const dx = B[0] - A[0], dy = B[1] - A[1], dz = B[2] - A[2];
      s += Math.sqrt(dx * dx + dy * dy + dz * dz) / (2 * e);
      ns++;
    }
    s = ns && s > 0 ? s / ns : 1;
    const g = {
      axis, at, depth: dep,
      half: w / 2 / s,
      flat: Math.max(0, w / 2 - wall) / s,
      span: spec.span || null,
      fade: spec.runout != null ? spec.runout : 0.15,
      width: w, wall,
    };
    G.push(g);
    const dst = axis === 'row' ? U : V;
    dst.push(at - g.half, at - g.flat, at + g.flat, at + g.half);
    /* A span's run-out needs its own lines in the OTHER axis, otherwise the
       fade lands wherever the subdivision happens to be and a shutline that
       should stop in 50 mm ramps out over a whole station. */
    if (g.span) {
      const other = axis === 'row' ? V : U;
      other.push(g.span[0], g.span[0] + g.fade, g.span[1] - g.fade, g.span[1]);
    }
  }

  /* Clip to the valid parameter range before deduping: a groove or a span
     line that lands outside would otherwise extrapolate the curve and push
     the panel past its own edge. */
  const tidy = (arr, hi) => {
    const c = arr.map((x) => (x < 0 ? 0 : x > hi ? hi : x)).sort((a, b) => a - b);
    return c.filter((x, i) => i === 0 || x - c[i - 1] > 1e-9);
  };
  const Us = tidy(U, rows - 1), Vs = tidy(V, closed ? cols - 1e-9 : cols - 1);
  const nU = Us.length, nV = Vs.length;

  const base = new Float64Array(nU * nV * 3);
  for (let a = 0; a < nU; a++) {
    const ring = ringAt(Us[a]);
    for (let b = 0; b < nV; b++) {
      const p = ring.at(Vs[b]);
      const k = (a * nV + b) * 3;
      base[k] = p[0]; base[k + 1] = p[1]; base[k + 2] = p[2];
    }
  }

  const pts = new Float64Array(base);
  if (G.length) {
    const depthAt = (u, v) => {
      let dep = 0;
      for (const g of G) {
        const x = g.axis === 'row' ? u : v, y = g.axis === 'row' ? v : u;
        const a = Math.abs(x - g.at);
        if (a >= g.half) continue;
        let f = a <= g.flat ? 1 : (g.half - a) / (g.half - g.flat || 1);
        if (g.span) f *= _window(y, g.span[0], g.span[1], g.fade);
        const dd = g.depth * f;
        if (dd > dep) dep = dd;
      }
      return dep;
    };
    for (let a = 0; a < nU; a++) {
      for (let b = 0; b < nV; b++) {
        const dep = depthAt(Us[a], Vs[b]);
        if (dep <= 0) continue;
        const a0 = a > 0 ? a - 1 : a, a1 = a < nU - 1 ? a + 1 : a;
        const b0 = closed ? (b - 1 + nV) % nV : b > 0 ? b - 1 : b;
        const b1 = closed ? (b + 1) % nV : b < nV - 1 ? b + 1 : b;
        const ka = (a0 * nV + b) * 3, kb = (a1 * nV + b) * 3;
        const kc = (a * nV + b0) * 3, kd = (a * nV + b1) * 3;
        const ux = base[kb] - base[ka], uy = base[kb + 1] - base[ka + 1], uz = base[kb + 2] - base[ka + 2];
        const vx = base[kd] - base[kc], vy = base[kd + 1] - base[kc + 1], vz = base[kd + 2] - base[kc + 2];
        const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        const L = Math.sqrt(nx * nx + ny * ny + nz * nz);
        if (L < 1e-12) continue;
        const k = (a * nV + b) * 3;
        pts[k] -= (dep * nx) / L;
        pts[k + 1] -= (dep * ny) / L;
        pts[k + 2] -= (dep * nz) / L;
      }
    }
  }

  const near = (arr, val) => {
    let bi = 0, bd = Infinity;
    for (let i = 0; i < arr.length; i++) {
      const dd = Math.abs(arr[i] - val);
      if (dd < bd) { bd = dd; bi = i; }
    }
    return bi;
  };
  for (const g of G) {
    const arr = g.axis === 'row' ? Us : Vs;
    g.i0 = near(arr, g.at - g.half);
    g.f0 = near(arr, g.at - g.flat);
    g.f1 = near(arr, g.at + g.flat);
    g.i1 = near(arr, g.at + g.half);
    /* Slice here to hand the two halves of a channel to two parts: the
       first mesh keeps the near lip, the near wall and the floor, the
       second picks up the far wall, and the channel stays closed. */
    g.split = g.f1;
  }

  return {
    rows: nU, cols: nV, pts, closeLoop: closed, grooves: G, u: Us, v: Vs,
    rowIndex: (u) => near(Us, u), colIndex: (v) => near(Vs, v),
  };
}

function _gridMesh(grid, mat, o) {
  const q = o || {};
  const nV = grid.cols;
  const r0 = q.rows ? Math.max(0, q.rows[0]) : 0;
  const r1 = q.rows ? Math.min(grid.rows - 1, q.rows[1]) : grid.rows - 1;
  const c0 = q.cols ? Math.max(0, q.cols[0]) : 0;
  const c1 = q.cols ? Math.min(nV - 1, q.cols[1]) : nV - 1;
  const loop = grid.closeLoop && !q.cols;
  const R = r1 - r0 + 1, C = loop ? nV : c1 - c0 + 1;
  const pos = new Float32Array(R * C * 3);
  for (let a = 0; a < R; a++) {
    for (let b = 0; b < C; b++) {
      const src = ((r0 + a) * nV + ((c0 + b) % nV)) * 3;
      const dst = (a * C + b) * 3;
      pos[dst] = grid.pts[src];
      pos[dst + 1] = grid.pts[src + 1];
      pos[dst + 2] = grid.pts[src + 2];
    }
  }
  const idx = [];
  const CC = loop ? C : C - 1;
  for (let a = 0; a < R - 1; a++) {
    for (let b = 0; b < CC; b++) {
      const b2 = (b + 1) % C;
      const p = a * C + b, s = (a + 1) * C + b;
      const t = a * C + b2, w = (a + 1) * C + b2;
      idx.push(p, s, t, t, s, w);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(_arcUV(pos, R, C), 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const m = lib.mesh(geo, mat);
  return q.crease != null ? lib.crease(m, q.crease) : m;
}

/* UVs for a lofted grid, in METERS of arc length along the surface.

   Not 0..1 per panel. A normalized UV makes the texture scale depend on how
   big the panel happens to be, so metal flake would be coarse on a door and
   fine on a mirror cap, which is exactly backward: flake is a property of
   the paint, not of the panel it is sprayed on. Measuring in meters means a
   map with repeat R tiles every 1/R meters on every surface of every body,
   and a millimeter-scale effect stays millimeter-scale everywhere.

   u runs along each row and v up each column, both accumulated per vertex,
   so a panel that changes width along its length shears slightly rather
   than stretching. Invisible for noise, and these maps are all noise. */
function _arcUV(pos, R, C) {
  const uv = new Float32Array(R * C * 2);
  const d = (i, j) => {
    const a = i * 3, b = j * 3;
    return Math.hypot(pos[a] - pos[b], pos[a + 1] - pos[b + 1], pos[a + 2] - pos[b + 2]);
  };
  for (let a = 0; a < R; a++) {
    let s = 0;
    for (let b = 0; b < C; b++) {
      if (b) s += d(a * C + b, a * C + b - 1);
      uv[(a * C + b) * 2] = s;
    }
  }
  for (let b = 0; b < C; b++) {
    let s = 0;
    for (let a = 0; a < R; a++) {
      if (a) s += d(a * C + b, (a - 1) * C + b);
      uv[(a * C + b) * 2 + 1] = s;
    }
  }
  return uv;
}

/* Split normals at edges sharper than angleDeg, leave the rest smooth. The
   geometry is de-indexed so each triangle owns its three vertices, then each
   corner takes the average of only those adjacent face normals within the
   threshold. Triangles are untouched; the vertex count rises to 3x. */
function _creaseGeo(src, angleDeg) {
  const geo = src.index ? src.toNonIndexed() : src.clone();
  const pos = geo.attributes.position;
  const n = pos.count, tri = n / 3;
  const px = pos.array;
  const cosT = Math.cos((angleDeg * Math.PI) / 180);
  const fn = new Float64Array(tri * 3);
  for (let f = 0; f < tri; f++) {
    const a = f * 9;
    const ux = px[a + 3] - px[a], uy = px[a + 4] - px[a + 1], uz = px[a + 5] - px[a + 2];
    const vx = px[a + 6] - px[a], vy = px[a + 7] - px[a + 1], vz = px[a + 8] - px[a + 2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    fn[f * 3] = nx / L; fn[f * 3 + 1] = ny / L; fn[f * 3 + 2] = nz / L;
  }
  const buckets = new Map();
  const keys = new Array(n);
  for (let i = 0; i < n; i++) {
    const k = Math.round(px[i * 3] * 1e6) + '|' + Math.round(px[i * 3 + 1] * 1e6) +
              '|' + Math.round(px[i * 3 + 2] * 1e6);
    keys[i] = k;
    let b = buckets.get(k);
    if (!b) buckets.set(k, (b = []));
    b.push((i / 3) | 0);
  }
  const nrm = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const f = (i / 3) | 0;
    const fx = fn[f * 3], fy = fn[f * 3 + 1], fz = fn[f * 3 + 2];
    let sx = 0, sy = 0, sz = 0;
    const b = buckets.get(keys[i]);
    for (let q = 0; q < b.length; q++) {
      const g = b[q] * 3;
      const gx = fn[g], gy = fn[g + 1], gz = fn[g + 2];
      if (fx * gx + fy * gy + fz * gz >= cosT) { sx += gx; sy += gy; sz += gz; }
    }
    const L = Math.sqrt(sx * sx + sy * sy + sz * sz);
    if (L > 1e-12) { nrm[i * 3] = sx / L; nrm[i * 3 + 1] = sy / L; nrm[i * 3 + 2] = sz / L; }
    else { nrm[i * 3] = fx; nrm[i * 3 + 1] = fy; nrm[i * 3 + 2] = fz; }
  }
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  return geo;
}

/* Box with every edge chamfered: 6 inset faces, 12 edge strips, 8 corner
   triangles, 44 triangles against a plain box's 12. Normals are creased at
   build time so the chamfers read as highlight breaks rather than a blur. */
function _chamferBoxGeo(w, h, d, c) {
  const hx = w / 2, hy = h / 2, hz = d / 2;
  const cc = Math.max(1e-5, Math.min(c, hx * 0.98, hy * 0.98, hz * 0.98));
  const key = (i, j, k) => ((i + 1) >> 1) * 4 + ((j + 1) >> 1) * 2 + ((k + 1) >> 1);
  const half = [hx, hy, hz];
  const pos = [], uv = [], vi = [];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
    const s = [sx, sy, sz];
    vi[key(sx, sy, sz)] = [pos.length / 3, pos.length / 3 + 1, pos.length / 3 + 2];
    for (let a = 0; a < 3; a++) {
      const p = [s[0] * (hx - cc), s[1] * (hy - cc), s[2] * (hz - cc)];
      p[a] = s[a] * half[a];
      pos.push(p[0], p[1], p[2]);
      const o1 = (a + 1) % 3, o2 = (a + 2) % 3;
      uv.push(p[o1] / (2 * half[o1]) + 0.5, p[o2] / (2 * half[o2]) + 0.5);
    }
  }
  const tri = [];
  const quad = (a, b, c2, d2) => { tri.push(a, b, c2, a, c2, d2); };
  for (let ax = 0; ax < 3; ax++) {
    const o1 = (ax + 1) % 3, o2 = (ax + 2) % 3;
    for (const s of [-1, 1]) {
      const g = [0, 0, 0]; g[ax] = s;
      const pick = (u, v) => { g[o1] = u; g[o2] = v; return vi[key(g[0], g[1], g[2])][ax]; };
      quad(pick(-1, -1), pick(1, -1), pick(1, 1), pick(-1, 1));
    }
    for (const u of [-1, 1]) for (const v of [-1, 1]) {
      const s1 = [0, 0, 0], s2 = [0, 0, 0];
      s1[ax] = -1; s1[o1] = u; s1[o2] = v;
      s2[ax] = 1; s2[o1] = u; s2[o2] = v;
      const k1 = vi[key(s1[0], s1[1], s1[2])], k2 = vi[key(s2[0], s2[1], s2[2])];
      quad(k1[o1], k1[o2], k2[o2], k2[o1]);
    }
  }
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
    const t = vi[key(sx, sy, sz)];
    tri.push(t[0], t[1], t[2]);
  }
  /* The solid is convex and centered on its own origin, so a face whose
     normal points back at the center is wound the wrong way. Fix rather
     than hand-order 44 triangles. */
  for (let i = 0; i < tri.length; i += 3) {
    const a = tri[i] * 3, b = tri[i + 1] * 3, c2 = tri[i + 2] * 3;
    const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
    const vx = pos[c2] - pos[a], vy = pos[c2 + 1] - pos[a + 1], vz = pos[c2 + 2] - pos[a + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const cx = (pos[a] + pos[b] + pos[c2]) / 3, cy = (pos[a + 1] + pos[b + 1] + pos[c2 + 1]) / 3;
    const cz = (pos[a + 2] + pos[b + 2] + pos[c2 + 2]) / 3;
    if (nx * cx + ny * cy + nz * cz < 0) { const t = tri[i + 1]; tri[i + 1] = tri[i + 2]; tri[i + 2] = t; }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(tri);
  return _creaseGeo(geo, 30);
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

/* Scratch for lib.closureAt. Module scope and reused, because it is called
   once per closure per frame while a door is moving and again 49 times per
   closure per preset by tools/closures.sh. */
const _cst = new THREE.Matrix4();
const _cax = new THREE.Vector3();
const _cpv = new THREE.Vector3();
const _crp = new THREE.Vector3();
const _MIRROR = new THREE.Matrix4().makeScale(1, 1, -1);

export const lib = {
  /* A tagged part group. Everything inside is one clickable part.
     id must match a key in SYSTEM.parts. explode is the part-level
     explode direction, applied on top of the system-level explode. */
  part(id, explode = [0, 0, 0]) {
    const g = new THREE.Group();
    g.userData.part = id;
    g.userData.explode = new THREE.Vector3(...explode);
    return g;
  },

  /* Mark a mesh as outer shell: it fades in x-ray mode. */
  shell(mesh) { mesh.userData.shell = true; return mesh; },

  /* Mark a group to rotate in drive mode. axis 'x'|'y'|'z', speed rad/s. */
  spin(group, axis, speed) { group.userData.spin = { axis, speed }; return group; },

  /* Mark a group as the moving half of a CLOSURE: a door, a hood, a decklid,
     a canopy. `id` names an entry in SYSTEM.closures, which owns the
     kinematics, the mass and the prose; this tag only says which geometry
     travels with it.

     Two rules the viewer depends on, and both come out of how a part group
     is already built. The tagged group must be a lib.part group, because
     that is the object the viewer already captures a home position for and
     already moves under explode. And everything inside it must be geometry
     that actually moves: a closure is a rigid body, so a panel that opens
     has to be its OWN part group rather than a slice of a larger one. Two
     groups may carry the same closure id when one panel is drawn in several
     pieces, and several closures may share one part id, which is how four
     doors stay one clickable `doors` part while opening independently.

     `m` is the mirror flag. lib.mirrorZ toggles it, and the viewer conjugates
     the motion across the centerline rather than repeating it, so a module
     authors one hinge on the +z side and gets the correct handedness on the
     other. */
  hinge(group, id, mirrored = false) {
    group.userData.hinge = { id, m: !!mirrored };
    return group;
  },

  /* THE KINEMATICS OF ONE CLOSURE, at travel t in [0, 1], as a world matrix.

     This lives in common.js rather than in the viewer because two things
     have to agree about it exactly: the app, which draws the door, and
     tools/closures.sh, which sweeps the same door through the same travel to
     find out whether it hits the car and how much room it needs beside it. A
     checker that measures a COPY of the motion proves nothing about the
     motion, and this project has already paid for one predicate drifting
     from its own probe (tools/audit/float.js, see HANDOFF.md).

     spec.motion is a list of stages composed in declaration order, each over
     its own [start, end] window of t, so a door can push outboard before it
     rises. A stage is either

       { kind: 'swing', axis: [x,y,z], pivot: [x,y,z], deg, at: [a,b] }
       { kind: 'slide', axis: [x,y,z], dist, at: [a,b] }

     and every stage is authored on the +z side. `mirrored` conjugates the
     whole transform by S = diag(1,1,-1) instead of mirroring the fields,
     which is the only way to get a rotation across a centerline without a
     sign rule per field: a mirrored axis negates in x and y and NOT in z,
     which is exactly the rule people get wrong. */
  closureAt(spec, t, mirrored, out) {
    const M = out || new THREE.Matrix4();
    M.identity();
    for (const st of spec.motion) {
      const a = st.at ? st.at[0] : 0, b = st.at ? st.at[1] : 1;
      const s = b <= a ? (t >= b ? 1 : 0)
                       : Math.max(0, Math.min(1, (t - a) / (b - a)));
      if (s <= 0) continue;
      if (st.kind === 'slide') {
        _cst.makeTranslation(st.axis[0] * st.dist * s,
                             st.axis[1] * st.dist * s,
                             st.axis[2] * st.dist * s);
      } else {
        _cax.set(st.axis[0], st.axis[1], st.axis[2]).normalize();
        _cst.makeRotationAxis(_cax, ((st.deg * Math.PI) / 180) * s);
        /* about the pivot, not the origin: T(p) R T(-p), which on a pure
           rotation is one setPosition of p - Rp */
        _cpv.set(st.pivot[0], st.pivot[1], st.pivot[2]);
        _crp.copy(_cpv).applyMatrix4(_cst);
        _cst.setPosition(_cpv.x - _crp.x, _cpv.y - _crp.y, _cpv.z - _crp.z);
      }
      M.premultiply(_cst);
    }
    if (mirrored) M.premultiply(_MIRROR).multiply(_MIRROR);
    return M;
  },

  mesh(geo, mat) {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  },

  box(w, h, d, mat) {
    return lib.mesh(new THREE.BoxGeometry(w, h, d), mat);
  },

  /* Rounded-corner plate lying in the XZ plane, thickness t along Y. */
  plate(w, d, t, r, mat) {
    const s = new THREE.Shape();
    const hw = w / 2, hd = d / 2, rr = Math.min(r, hw, hd);
    s.moveTo(-hw + rr, -hd);
    s.lineTo(hw - rr, -hd); s.absarc(hw - rr, -hd + rr, rr, -Math.PI / 2, 0);
    s.lineTo(hw, hd - rr);  s.absarc(hw - rr, hd - rr, rr, 0, Math.PI / 2);
    s.lineTo(-hw + rr, hd); s.absarc(-hw + rr, hd - rr, rr, Math.PI / 2, Math.PI);
    s.lineTo(-hw, -hd + rr); s.absarc(-hw + rr, -hd + rr, rr, Math.PI, Math.PI * 1.5);
    const geo = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 6 });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, t / 2, 0);
    /* shape was in XY so after rotation width runs along x, depth along z */
    return lib.mesh(geo, mat);
  },

  cyl(r, h, mat, seg = 24) {
    return lib.mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
  },

  cone(r, h, mat, seg = 24) {
    return lib.mesh(new THREE.ConeGeometry(r, h, seg), mat);
  },

  sphere(r, mat, seg = 20) {
    return lib.mesh(new THREE.SphereGeometry(r, seg, Math.max(8, seg / 2)), mat);
  },

  torus(r, tube, mat, seg = 24, tseg = 12) {
    return lib.mesh(new THREE.TorusGeometry(r, tube, tseg, seg), mat);
  },

  /* Smooth tube through world-space points. Great for cables and coolant lines. */
  tube(points, r, mat, closed = false, seg) {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), closed);
    const geo = new THREE.TubeGeometry(curve, seg || points.length * 6, r, 8, closed);
    return lib.mesh(geo, mat);
  },

  /* Helical spring centered on local origin, axis along Y. */
  spring(r, len, turns, wireR, mat) {
    const pts = [];
    const N = turns * 16;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const a = t * turns * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, (t - 0.5) * len, Math.sin(a) * r));
    }
    const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), N, wireR, 8, false);
    return lib.mesh(geo, mat);
  },

  /* n small bolt heads on a circle of radius r in the XZ plane. */
  bolts(n, r, size, mat) {
    const g = new THREE.Group();
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const b = lib.cyl(size, size * 1.2, mat, 6);
      b.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
      g.add(b);
    }
    return g;
  },

  /* Parallel cooling or heatsink fins along X, n blades. */
  fins(w, h, d, n, t, mat) {
    const g = new THREE.Group();
    for (let i = 0; i < n; i++) {
      const f = lib.box(w, h, t, mat);
      f.position.z = (i / (n - 1) - 0.5) * (d - t);
      g.add(f);
    }
    return g;
  },

  /* Skinned surface through profile sections. Each section is an array of
     [x,y,z] points; all sections must share the same point count. Rows are
     connected with quads, so ordering sections nose-to-tail with points
     top-to-bottom gives a clean body panel. closeLoop joins the last point
     of each section back to its first (for closed tubes).

     Pass opts to get a crisp surface instead of a soft one. Omit it and this
     is the original three-argument helper, unchanged:

       rowSub, colSub    intermediate lines inserted in each interval. A
                         panel of R x C stations costs
                         2 (R-1)(rowSub+1) x (C-1)(colSub+1) triangles.
       interp            'catmullrom' (default) or 'linear'. Linear keeps
                         the faceted original surface exactly and buys only
                         resolution; catmullrom also buys curvature.
       clamp             default true: tangents are limited so the curve
                         never leaves the envelope of the two stations it
                         spans. That holds the extremes, not the projected
                         area: on body-8 clamped catmullrom still moves
                         frontal area 0.6 percent. false gives textbook
                         Catmull-Rom, which moves it 2.8 percent.
       hardRows,         indices held as corners so the interpolant does not
       hardCols          smooth a designed kink away.
       hardRowAngle,     degrees: any index where the polyline turns by more
       hardColAngle      than this is held as a corner automatically. Use
                         the same value for crease.
       grooves           [{ row | col, width, depth, wall, span, runout }].
                         row/col is a fractional index in the INPUT grid;
                         width and depth are meters. A groove sinks four
                         lines into the surface along the local normal: two
                         lips on the surface, two floor edges at depth, with
                         walls of `wall` meters (default 0.28 x width). span
                         is [a, b] in the other axis's index units and
                         runout is the fade at each end of that span.
       crease            degrees, applied to the finished mesh.
       rows, cols        [a, b] inclusive slice in RESOLVED index space. */
  loft(sections, mat, closeLoop = false, opts = null) {
    if (opts) {
      const g = _grid(sections, Object.assign({}, opts, { closeLoop }));
      return _gridMesh(g, mat, opts);
    }
    const rows = sections.length, cols = sections[0].length;
    const pos = [];
    for (const sec of sections) for (const p of sec) pos.push(p[0], p[1], p[2]);
    const idx = [];
    const C = closeLoop ? cols : cols - 1;
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < C; c++) {
        const c2 = (c + 1) % cols;
        const a = r * cols + c, b = r * cols + c2;
        const d = (r + 1) * cols + c, e = (r + 1) * cols + c2;
        idx.push(a, d, b, b, d, e);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    /* Arc-length UVs. Until these existed, lofted panels carried no uv at
       all, so every map on M.paint was silently doing nothing on the one
       surface that most needed it: the painted body. */
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(_arcUV(pos, rows, cols), 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return lib.mesh(geo, mat);
  },

  /* ── Crispness vocabulary ───────────────────────────────────────────────
     Everything below exists so a body can read like a car instead of a clay
     model. design/crispness.md is the working guide; the short version:

       lib.crease(mesh, deg)                  hard edges, zero triangle cost
       lib.loft(sections, mat, loop, opts)    denser surface, real shutlines
       lib.loftGrid / lib.loftMesh            one surface, several parts
       lib.cbox(w, h, d, c, mat)              a box whose edges break light
       lib.grille(w, h, d, mat, opts)         a lattice with actual depth
       lib.fastener(r, mat, type)             a head where a real car has one
       lib.badge(outline, depth, mat, opts)   an extruded emblem
     ── */

  /* Recompute normals so faces meeting at more than angleDeg keep separate
     normals and shallower joins stay smooth. De-indexes the geometry: the
     triangle count is unchanged, the vertex count rises to 3 per triangle.
     This is the cheapest crispness available, so run it on anything with a
     designed edge. 32 degrees suits a mechanical part; a subdivided body
     panel wants the same value its loft used for hardRowAngle, because that
     is the angle at which the station table stops being smooth. */
  crease(mesh, angleDeg = 32) {
    mesh.geometry = _creaseGeo(mesh.geometry, angleDeg);
    return mesh;
  },

  /* Resolve a loft into a resampled point grid without building a mesh, so
     one continuous surface can be cut into several parts that share exact
     shutlines. See lib.loft for the options. grid.grooves[k].split is the
     row (or column) index to slice at so the channel stays closed. */
  loftGrid(sections, opts = {}) {
    return _grid(sections, opts);
  },

  /* Build one mesh from a lib.loftGrid. opts: rows [a,b] and cols [a,b] are
     inclusive slices in RESOLVED index space, crease is degrees. */
  loftMesh(grid, mat, opts = {}) {
    return _gridMesh(grid, mat, opts);
  },

  /* Surface of revolution around the local Y axis. profilePts are [radius, y]
     pairs from bottom to top. */
  lathe(profilePts, mat, seg = 32) {
    const pts = profilePts.map(([r, y]) => new THREE.Vector2(r, y));
    return lib.mesh(new THREE.LatheGeometry(pts, seg), mat);
  },

  /* Box with all twelve edges chamfered by c meters. 44 triangles against
     lib.box's 12, normals already creased, box-projection UVs so mapped
     materials still work. Use it wherever a machined or cast part meets the
     light: a chamfer is what turns one flat highlight into two. */
  cbox(w, h, d, c, mat) {
    return lib.mesh(_chamferBoxGeo(w, h, d, c), mat);
  },

  /* Real grille geometry: a lattice of bars with depth, for intakes and
     vents that would otherwise be a flat dark rectangle. The panel spans w
     along X and h along Y with its bars standing d deep along Z, centered on
     the local origin, so the caller rotates the group to face the flow.

     opts: bars (vertical, spread along X), cross (horizontal, spread along
     Y), barW thickness, barD depth (default d), crossZ how far the cross
     family sits behind the front family (default 0.75 barD, which is what
     gives a grille its depth), chamfer, frame.

     Cost: 12 triangles per bar, or 44 chamfered, through one InstancedMesh
     per family. A 20 bar by 6 cross grille is 312 triangles plain. */
  grille(w, h, d, mat, o = {}) {
    const bars = o.bars != null ? o.bars : 12;
    const cross = o.cross != null ? o.cross : 0;
    const barW = o.barW != null ? o.barW : Math.min(0.008, w / Math.max(1, bars * 2.6));
    const barD = o.barD != null ? o.barD : d;
    const ch = o.chamfer != null ? o.chamfer : 0;
    const g = new THREE.Group();
    const bar = (bw, bh) => (ch > 0 ? _chamferBoxGeo(bw, bh, barD, ch)
                                    : new THREE.BoxGeometry(bw, bh, barD));
    const bank = (geo, n, place) => {
      const im = new THREE.InstancedMesh(geo, mat, n);
      const m = new THREE.Matrix4();
      for (let i = 0; i < n; i++) { place(i, m); im.setMatrixAt(i, m); }
      im.instanceMatrix.needsUpdate = true;
      im.castShadow = true; im.receiveShadow = true;
      g.add(im);
    };
    if (bars > 0) {
      bank(bar(barW, h), bars, (i, m) =>
        m.makeTranslation(bars === 1 ? 0 : (i / (bars - 1) - 0.5) * (w - barW), 0, 0));
    }
    if (cross > 0) {
      const cz = o.crossZ != null ? o.crossZ : -barD * 0.75;
      bank(bar(w, barW), cross, (i, m) =>
        m.makeTranslation(0, cross === 1 ? 0 : (i / (cross - 1) - 0.5) * (h - barW), cz));
    }
    if (o.frame) {
      const t = o.frame === true ? barW * 1.8 : o.frame;
      const fd = barD * 1.25, fc = Math.min(ch || t * 0.25, t * 0.4);
      for (const [fw, fh, x, y] of [[w + 2 * t, t, 0, (h + t) / 2], [w + 2 * t, t, 0, -(h + t) / 2],
                                    [t, h, -(w + t) / 2, 0], [t, h, (w + t) / 2, 0]]) {
        const b = lib.cbox(fw, fh, fd, fc, mat);
        b.position.set(x, y, -fd / 2 + barD / 2);
        g.add(b);
      }
    }
    return g;
  },

  /* A fastener head, axis along +Y with its seating face on y = 0, so the
     caller puts it straight onto a surface. type 'hex' is a tapered hex head
     on a flange, 80 triangles; 'torx' is a round head with a real blind
     six-lobe socket, 224 measured. Put them where a real car shows one: arch
     liner screws, splitter hardware, a bonded panel's mechanical backup.

     The seating face is on y = 0 and the head grows along +Y, so the caller
     owns the one thing that goes wrong here: y must be the VISIBLE face of
     the thing being bolted, not its center or its datum. Three of the first
     four banks placed on this car went inside the part they fixed, because
     lib.plate puts its slab between y + t/2 and y + 3t/2 rather than
     centering it, because a strake straddles the panel it stands on, and
     because a louver bank sits inboard of the skin. Ray-test a new bank
     against the rest of the system before believing in it. */
  fastener(r, mat, type = 'hex', o = {}) {
    const g = new THREE.Group();
    const hh = o.height != null ? o.height : r * 0.62;
    const fr = o.flange != null ? o.flange : r * 1.22;
    const ft = o.flangeT != null ? o.flangeT : hh * 0.22;
    const fl = lib.mesh(new THREE.CylinderGeometry(fr, fr, ft, 14), mat);
    fl.position.y = ft / 2;
    g.add(fl);
    if (type === 'torx') {
      const face = new THREE.Shape();
      face.absarc(0, 0, r, 0, Math.PI * 2, false);
      const star = new THREE.Path();
      const lobes = 6, ro = r * 0.58, ri = r * 0.36;
      for (let i = 0; i <= lobes * 2; i++) {
        const a = (i / (lobes * 2)) * Math.PI * 2;
        const rr = i % 2 ? ri : ro;
        const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
        if (i === 0) star.moveTo(x, y); else star.lineTo(x, y);
      }
      face.holes.push(star);
      const geo = new THREE.ExtrudeGeometry(face, { depth: hh, bevelEnabled: false, curveSegments: 8 });
      geo.rotateX(-Math.PI / 2);
      geo.translate(0, ft, 0);
      g.add(lib.mesh(_creaseGeo(geo, 30), mat));
      const floor = lib.mesh(new THREE.CylinderGeometry(r * 0.60, r * 0.60, hh * 0.32, 12), mat);
      floor.position.y = ft + hh * 0.16;
      g.add(floor);
    } else {
      const head = lib.mesh(new THREE.CylinderGeometry(r * 0.90, r, hh, 6), mat);
      head.position.y = ft + hh / 2;
      head.rotation.y = o.clock || 0;
      g.add(head);
    }
    return g;
  },

  /* Extruded emblem. outline is a closed [x, y] polygon in the local XY
     plane, opts.holes is a list of the same for cut-outs. The badge extrudes
     along +Z with its back face on z = 0 and a beveled rim, and the rim is
     the whole point: a decal has no edge to catch a softbox, a badge does. */
  badge(outline, depth, mat, o = {}) {
    const trace = (path, pts) => {
      path.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) path.lineTo(pts[i][0], pts[i][1]);
      path.closePath();
    };
    const s = new THREE.Shape();
    trace(s, outline);
    for (const h of o.holes || []) { const p = new THREE.Path(); trace(p, h); s.holes.push(p); }
    const bev = Math.min(o.bevel != null ? o.bevel : depth * 0.28, depth * 0.45);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: Math.max(1e-5, depth - 2 * bev),
      bevelEnabled: bev > 0, bevelThickness: bev, bevelSize: bev,
      bevelSegments: o.bevelSegments || 1, curveSegments: o.curveSegments || 6,
    });
    /* ExtrudeGeometry bevels both ends, so shift the whole thing onto
       z = 0 to depth. The back bevel is hidden against the panel. */
    geo.translate(0, 0, bev);
    const m = lib.mesh(geo, mat);
    return o.soft ? m : lib.crease(m, o.crease != null ? o.crease : 30);
  },

  /* Clone a group mirrored across z. Part tags and explode dirs mirror too.
     Object3D.clone() JSON-copies userData, so the explode vector arrives as
     a plain object; rebuild it as a real Vector3 with z negated. */
  mirrorZ(group) {
    const c = group.clone(true);
    const flip = (o) => {
      const e = o.userData?.explode;
      if (e) o.userData.explode = new THREE.Vector3(e.x, e.y, -e.z);
      /* a hinge crosses the centerline the way a rotation does, not the way
         a vector does: the viewer conjugates the whole motion by the mirror,
         so all this flag has to carry is WHICH SIDE the group ended up on.
         Object3D.clone round-trips userData through JSON, so this is a plain
         object by the time it gets here and rebuilding it is not optional. */
      const h = o.userData?.hinge;
      if (h) o.userData.hinge = { id: h.id, m: !h.m };
    };
    /* ONE pass, and the second one that used to be here was a defect.
       Object3D.traverse calls back on the object itself before it recurses,
       so `c.traverse(flip); flip(c);` flipped the ROOT group twice and left
       its own explode vector pointing back the way it came. It was invisible
       on most callers because the group they mirror carries no z explode of
       its own, and visible on seven that do: suspension-4's air springs and
       both active damper groups and suspension-9's front knuckle, air
       springs and both damper groups traveled INBOARD at full explode, on
       every rung from Gen 4 up. SPEC.md's explode section says corner
       symmetric parts explode outward through their own vectors, and those
       seven did the opposite. */
    c.traverse(flip);
    c.scale.z *= -1;
    return c;
  },
};
