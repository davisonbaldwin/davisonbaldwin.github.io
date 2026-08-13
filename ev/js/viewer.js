/* Scene, camera, picking, staged explode, highlight, x-ray. */

import * as THREE from '../vendor/three.module.js';
import { createPicker } from './pick.js';
import { bvhStats, bvhReset } from './bvh.js';

const BG = new THREE.Color(0x0b0e12);
const EASE = (t) => 1 - Math.pow(1 - t, 3);
const smooth = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export const HOME = [6.4, 2.6, 6.8, 0, 0.55, 0];

export function createViewer(canvas, onPick) {
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  /* The scene is rendered TWICE a frame, once mirrored for the floor
     reflection and once for real, and three rebuilds every shadow map on
     every render() call. That is a second full 2048 by 2048 depth pass over
     every casting mesh in the car for an image that cannot differ: the only
     shadow caster here is a DIRECTIONAL light, whose shadow map depends on
     the scene and not on the camera looking at it. Rendering it once a
     frame and letting both passes sample it is pixel for pixel the same
     picture for a quarter fewer draw calls.
     The last line of this used to read that the map is identical whichever
     pass builds it, because nothing sitting out the mirrored pass casts a
     shadow. That was true when the only things sitting it out were the
     floor, ring, halo and reflection plane, all castShadow false. It is
     false now that the mirrored pass also culls the small parts, so update()
     builds the map in the MAIN render and the mirrored pass is never allowed
     to be the one that builds it. */
  renderer.shadowMap.autoUpdate = false;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0d11, 0.016);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.2, 300);

  /* ── Lighting ── */
  scene.add(new THREE.HemisphereLight(0x8ba2b8, 0x1c1812, 0.8));

  const key = new THREE.DirectionalLight(0xfff2dc, 2.6);
  key.position.set(9, 14, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 2;
  key.shadow.camera.far = 60;
  const s = 11;
  Object.assign(key.shadow.camera, { left: -s, right: s, top: s, bottom: -s });
  key.shadow.camera.updateProjectionMatrix();
  key.shadow.bias = -0.0006;
  key.shadow.normalBias = 0.03;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x6ea8ff, 1.45);
  rim.position.set(-8, 4, -7);
  scene.add(rim);

  const rim2 = new THREE.DirectionalLight(0x53d0e0, 0.55);
  rim2.position.set(2, 3, -9);
  scene.add(rim2);

  const fill = new THREE.DirectionalLight(0xcfdde8, 0.5);
  scene.add(fill);

  scene.environment = makeEnv(renderer);

  /* ── Studio floor ── */
  /* Deliberately matte and near-black. A glossy floor puts a huge specular
     pool under the 2.6-intensity key light and washes the whole lower
     frame; all the gloss comes from the planar reflection below instead. */
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(14, 64),
    new THREE.MeshStandardMaterial({
      color: 0x080b10, roughness: 0.94, metalness: 0.0, envMapIntensity: 0.35,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.005;
  floor.receiveShadow = true;
  floor.userData.env = true;
  scene.add(floor);

  /* glowing stage ring + soft halo pool under the car */
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(4.38, 4.44, 128),
    new THREE.MeshBasicMaterial({
      color: 0x3fa8c4, transparent: true, opacity: 0.85,
      side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.004;
  ring.userData.env = true;
  scene.add(ring);

  /* ── The stage ring doubles as the charge indicator ───────────────────
     It is already the one lit thing on the floor and it already reads as a
     pad the car is standing on, so the energy state rides it rather than
     adding a second object to a scene that is drawn twice a frame.

     The ring's own colour is remembered, not restated, so this cannot drift
     from the value above. Charging pulses it toward the accent amber; the
     pulse is a COLOUR change on one material with no geometry and no extra
     draw call, and it stops entirely when the state does, so a parked car
     costs the frame gate nothing. */
  const RING_IDLE = ring.material.color.clone();
  const RING_CHARGE = new THREE.Color(0xd4a24c);
  let charging = false, chargePhase = 0;
  function setCharging(on) {
    if (charging === on) return;
    charging = on;
    if (!on) { ring.material.color.copy(RING_IDLE); ring.material.opacity = 0.85; }
    needFrame();
  }

  /* ── Planar floor reflection ──────────────────────────────────────────
     Three's core ships no Reflector, so this is the real thing done by
     hand: each frame the scene is re-rendered from a camera mirrored
     through the floor plane, and the result is composited onto a plane
     just above the shadow floor. Because the mirrored render uses the
     same projection, the reflected image already lines up in screen
     space, so the shader samples it by gl_FragCoord. Additive blending
     keeps the key light's shadows intact underneath: dark paint adds
     nothing, bright highlights streak across the floor. */
  const refRT = new THREE.WebGLRenderTarget(1280, 720, { type: THREE.HalfFloatType });
  const refCam = new THREE.PerspectiveCamera();
  const refMat = new THREE.ShaderMaterial({
    uniforms: {
      tRef: { value: refRT.texture },
      uRes: { value: new THREE.Vector2(1, 1) },
      uStrength: { value: 0.30 },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexShader: `
      varying vec3 vW;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      uniform sampler2D tRef;
      uniform vec2 uRes;
      uniform float uStrength;
      varying vec3 vW;
      void main() {
        vec3 refl = texture2D(tRef, gl_FragCoord.xy / uRes).rgb;
        /* fade out with distance so the reflection dissolves into the room
           instead of ending at a hard disc edge */
        float fade = 1.0 - smoothstep(2.5, 10.5, length(vW.xz));
        gl_FragColor = vec4(refl * uStrength * fade, 1.0);
      }`,
  });
  const refPlane = new THREE.Mesh(new THREE.CircleGeometry(11, 64), refMat);
  refPlane.rotation.x = -Math.PI / 2;
  refPlane.position.y = 0.0015;
  refPlane.userData.env = true;
  refPlane.renderOrder = -1;
  scene.add(refPlane);

  /* Hide a list for the mirrored pass, remembering only what this call
     actually turned off so the restore can never light up something that
     was already dark for a reason of its own. A mesh that appears in both
     lists is caught by the same guard, so it is recorded once. */
  const hidBuf = [];
  let hidN = 0;
  function hideForReflection(list) {
    for (let i = 0; i < list.length; i++) {
      const o = list[i];
      if (o.visible) { o.visible = false; hidBuf[hidN++] = o; }
    }
  }

  /* Nothing hidden in here may reach the shadow map, and update() guarantees
     that by never letting this call be the one that builds it. r160 runs
     projectObject() and THEN shadowMap.render(), both off object.visible and
     with no hook in between, so a mesh hidden for the mirrored pass would
     otherwise be missing from the map that BOTH passes sample. */
  function renderReflection() {
    refCam.copy(camera);
    refCam.position.set(camera.position.x, -camera.position.y, camera.position.z);
    refCam.up.set(0, -1, 0);
    refCam.lookAt(target.x, -target.y, target.z);
    refCam.projectionMatrix.copy(camera.projectionMatrix);
    refCam.updateMatrixWorld();

    /* every ground-plane element must sit out the mirrored pass, or it
       reflects itself; the halo especially, since it is additive and
       would wash the whole floor pale */
    refPlane.visible = false;
    floor.visible = false;
    ring.visible = false;
    halo.visible = false;
    /* Meshes too small to read in a floor reflection sit the pass out: at
       Gen 9 that is 728 draws down to 403, measured. This is now
       unconditional, and the first attempt at it was not, which is the part
       worth keeping. Skipping the cull on frames that rebuilt the shadow map
       left the RESTING image depending on whether the last frame drawn
       happened to be a rebuild frame, so the small parts were in the
       reflection or out of it by up to 16,293 pixels according to what the
       user did last. Building the map in the main pass instead removes the
       coupling rather than working around it. */
    hidN = 0;
    if (FX.ghostCull) hideForReflection(ghostMeshes);
    if (FX.smallCull) hideForReflection(smallMeshes);
    renderer.setRenderTarget(refRT);
    renderer.clear();
    renderer.render(scene, refCam);
    renderer.setRenderTarget(null);
    for (let i = 0; i < hidN; i++) hidBuf[i].visible = true;
    hidN = 0;
    refPlane.visible = true;
    floor.visible = true;
    ring.visible = true;
    halo.visible = true;
  }

  const haloCanvas = document.createElement('canvas');
  haloCanvas.width = haloCanvas.height = 256;
  const hctx = haloCanvas.getContext('2d');
  const grad = hctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  grad.addColorStop(0, 'rgba(64, 140, 180, 0.16)');
  grad.addColorStop(0.55, 'rgba(52, 90, 140, 0.05)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  hctx.fillStyle = grad;
  hctx.fillRect(0, 0, 256, 256);
  const halo = new THREE.Mesh(
    new THREE.CircleGeometry(4.35, 64),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(haloCanvas), transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
  );
  halo.rotation.x = -Math.PI / 2;
  halo.position.y = 0.003;
  halo.userData.env = true;
  scene.add(halo);

  /* Frames still owed a hover recompute, declared up here because the very
     first applyCam() asks for one. Two rather than one is margin, not a
     requirement: hitTest refreshes the camera and vehicle matrices itself,
     so the recompute in the same frame as the last movement already reads
     settled positions. The spare frame costs one raycast at the end of a
     gesture instead of one on every frame during it. */
  let hoverPending = 2;
  const needHover = () => { hoverPending = 2; };

  /* ── What is owed a redraw ────────────────────────────────────────────
     The loop used to render unconditionally, so a selected part, which
     switches the idle turntable OFF, pinned the page at two full scene
     renders and a 2048 shadow pass sixty times a second for an image that
     was byte-identical frame to frame. The image is now redrawn only when
     something that changes it moved.

     The shadow map is a second, coarser flag: the one caster here is a
     DIRECTIONAL light that never moves, and a directional shadow map does
     not depend on the camera, so an orbit, the wheel and the turntable all
     leave it identical. Only GEOMETRY moving, appearing or disappearing can
     change it. needShadow implies needFrame; the reverse is not true, and
     that asymmetry is the whole saving.

     Anything that changes the IMAGE must call one of these. The rule that
     catches most of them: every existing needHover() caller that moves
     pixels rather than just the pointer needs needFrame() beside it. */
  let frameDirty = true, shadowDirty = true;
  const needFrame = () => { frameDirty = true; };
  const needShadow = () => { shadowDirty = true; frameDirty = true; };

  /* preserveDrawingBuffer is false, so a frame we decline to draw relies on
     the browser still holding the buffer we drew last time. It does, but a
     tab that has been hidden and reshown is the one case worth insuring
     against, and the insurance is one flag. */
  document.addEventListener('visibilitychange', needFrame);

  /* The A/B switch for the frame-cost fixes, and the reason it exists: this
     machine's baseline swings by several times with load, so the only
     honest comparison of the gated loop against the ungated one alternates
     between them in the same page at the same instant. Turning gate,
     smallCull and shadowGate off restores the previous loop exactly.
     Nothing in the product touches it; tools/framebench.js does.

     ghostCull is OFF, and that is a measured decision rather than an
     oversight. It drops the mirrored pass from 1,418 draws to 96 with a part
     selected and it is worth 8.5 ms of the 27.4, which is the largest single
     win available here. It was specified on the grounds that it "contributes
     zero pixels", and that does not reproduce: at 2880x1800 it moves 132,637
     pixels at the home view and 667,569 at a camera 100 mm off the floor,
     peak channel delta 226 of 255. What it removes is the ghosted car's own
     reflection, and the focused part's reflection brightens underneath it
     because 993 layers of 7 percent geometry stop overdrawing it. That is a
     look decision about the focus state, not a free optimisation, so it is
     implemented, measured and left switched off for Davis to judge with
     viewer.setFrameOpts({ ghostCull: true }) against one page without.

     JUDGED AND SWITCHED ON, 2026-08-11, because Davis reported latency
     clicking through parts and this is most of it. Measured on gen10 at the
     home view, median of 7 forced frames: idle 11.9 ms, a part selected with
     the cull OFF 28.3 ms, the same selection with it ON 18.4 ms. So the
     reading state costs 16.4 ms over idle and this returns 9.9 of it, 60
     percent, for a change two screenshots at the same camera and the same
     selection cannot be told apart on anything except the ghost reflection
     the comment above already describes. It stays a flag: one call to
     setFrameOpts puts it back. */
  const FX = { gate: true, ghostCull: true, smallCull: true, shadowGate: true };
  let renders = 0, shadowBuilds = 0;

  /* canvas size in CSS pixels, refreshed by resize() once a frame so the
     picking path never has to touch the DOM */
  let viewW = 0, viewH = 0;

  /* ── Vehicle wiring, filled by addVehicle ── */
  let root = null;
  let systems = {};       // sysId -> { group, dir, parts: [partGroup...] }
  let partMats = {};      // "sys/part" -> [materials]
  let partGroups = {};    // "sys/part" -> [groups]
  let partMeshes = {};    // "sys/part" -> [meshes]
  let shellMats = [];
  let spinners = [];

  /* ── The paint ────────────────────────────────────────────────────────
     Every body on the ladder is sprayed in the one colour common.js calls
     M.paint, 0x2a5666, a dark teal, and it has been the only colour any of
     these eleven cars has ever worn.

     The set is found by BASE COLOUR rather than by the shell tag, and the
     difference matters in both directions. lib.shell marks what fades under
     x-ray, so it also holds the glass canopy, the carbon floor and the
     splitter, none of which are painted; and hv, hv-4 and hv-11 each build a
     charge-port flap out of M.paint that carries no shell tag at all, which
     is exactly the part that SHOULD follow the body colour, because that is
     what a charge flap does on a real car. Matching on the material's own
     base colour asks the only question that is actually being asked here:
     is this surface sprayed in body colour. Glass, alu, carbon, cast and
     rubber all answer no on their own and need no exception list.

     HELD PER PART, not as one flat list, which is what lets a panel wear a
     colour of its own. Materials are already cloned per part in indexSystem,
     so the key is free; a part with no entry in paintOverride simply takes
     the body colour, and the override is consulted again when a variant
     builds lazily, so a car resprayed an hour ago comes out of the box in
     the colours it is already wearing rather than in teal.

     The paintable set is small and it is the set a real paint shop would
     mask: on Gen 11 it is body-11's skin, shoulder, tail-cone and doors plus
     hv-11's charge flap, five parts. On Gen 1 it is the hood, doors, fenders
     and fascias plus hv's flap. Everything else on the car is glass, carbon,
     alu, cast, steel or rubber and answers no on its own. */
  const PAINT_BASE = 0x2a5666;
  let paintKeys = {};          // "sys/part" -> [materials sprayed in body colour]
  let paintHex = PAINT_BASE;
  const paintOverride = {};    // "sys/part" -> hex, a panel wearing its own colour

  /* ── THE PEARL COAT ───────────────────────────────────────────────────
     A finish is TWO colours, which is what automotive paint actually is: a
     base coat carrying the colour, then a mid coat of mica flake that tints
     what comes back at a glancing angle, then clear over both. So the pearl
     is modelled the way it works rather than as a blend. It does two things
     at once and both are needed for it to read:

       the BASE COLOUR takes a small amount of the pearl, so the panel is
       tinted face-on the way a flake load tints a solid coat;
       the SHEEN takes the pearl at full strength, so at a glancing angle
       across a crease the second colour is what comes back.

     That is why Ember under a Cobalt pearl and Cobalt under an Ember pearl
     are different finishes rather than the same average, and why this is
     worth more than one mixed colour: the car changes as it turns.

     THE PEARL IS A PROPERTY OF THE CAR AND NOT OF A PANEL, deliberately.
     A mid coat is sprayed over the whole body, so a panel wearing its own
     base colour still wears the car's pearl over the top, which is what a
     real two-tone under a pearl clear does.

     SHEEN IS SWITCHED ON ONCE AND NEVER OFF, and this is the trap in here.
     three.js compiles the sheen BRDF in or out on `material.sheen > 0`,
     which is a PROGRAM parameter, not a uniform: toggling it would recompile
     every paint material on the car, which is the same 189 ms first-click
     cost the ghost warm above exists to absorb. So sheen is pinned at 1 for
     the life of the material and the pearl is carried entirely in
     sheenColor, which IS a uniform. Black sheenColor contributes nothing, so
     "no pearl" costs nothing and changes no program. */
  /* ── SOLID PAINT IS NOT A METAL, and one number decides which ─────────
     M.paint runs metalness 0.88, which is very nearly a mirror: at that
     value there is almost no diffuse term and the base colour tints the
     REFLECTION instead of providing brightness. In a dark studio that makes
     a light colour read DARK. Measured on the shipped default, Alpine white
     under a brass pearl: the base colour is #d8d6d4, genuinely near white,
     and the car renders bronze. Drop the same material to 0.25 with nothing
     else touched and it renders white.

     Eleven generations never surfaced this because every one of them wore a
     dark saturated teal, where a tinted mirror is exactly what you expect.

     The fix is per COLOUR and not global, because the distinction is real:
     automotive paint is either a solid, which is a dielectric basecoat under
     clear, or a metallic, which is flake. A solid white is not a metal and a
     silver is. So a paint may declare its own metalness and everything that
     does not keeps whatever common.js gave it, captured per material at
     clone time rather than restated here. Reference teal and every finish
     that shipped before this are untouched to the digit.

     metalness is a UNIFORM, unlike sheen, so changing it recompiles nothing. */
  let paintMetal = null;       // null means "whatever the material shipped with"
  const partMetal = {};        // "sys/part" -> metalness, for a panel override

  let pearlHex = null;         // null is no pearl at all
  let pearlAmt = 0.6;
  const SHEEN_ROUGH = 0.32;    // tight enough to read as flake, not as cloth
  const PEARL_IN_BASE = 0.20;  // how much of the pearl the base coat carries
  const _c = new THREE.Color(), _p = new THREE.Color();

  /* The two sets the mirrored pass sits out. ghostMeshes is rebuilt by
     paint(), which is event driven; smallMeshes is measured once per system
     at index time, because a world bounding radius only changes if
     something rescales, and nothing here does.

     smallMeshes is never PRUNED, so it accumulates every variant ever built:
     101 entries at startup, 411 once Gen 9 is on screen, of which 101 belong
     to the hidden Gen 1 systems, and about 711 after a walk of the whole
     ladder. That is deliberate and it is cheap, which was measured rather
     than assumed before leaving it alone. A mesh inside a hidden group never
     reaches a draw call at all, because r160's projectObject() returns on
     object.visible before it walks children, so the only cost of a dead
     entry is the hide-and-restore loop itself: timed over 2,000 iterations
     of the exact loop, 0.0033 ms at 101 entries and 0.023 ms at 711, against
     a 30 ms frame. Pruning it would buy 0.02 ms and cost a per-system list
     and an invalidation path. */
  let ghostMeshes = [];
  let smallMeshes = [];
  const SMALL_R = 0.10;   // world bounding radius, metres

  /* Index one system: capture homes, tag parts, clone materials. Used for
     the startup set and again for variants built lazily on first switch. */
  function indexSystem(sysId, group, dir) {
    group.userData.home = group.position.clone();
    const parts = [];
    const meshes = [];
    const keys = new Set();
    group.traverse((o) => {
      if (o.userData?.part) {
        o.userData.home = o.position.clone();
        /* groups that went through clone() carry a plain-object explode */
        const e = o.userData.explode || { x: 0, y: 0, z: 0 };
        if (!e.isVector3) o.userData.explode = new THREE.Vector3(e.x, e.y, e.z);
        parts.push(o);
        const key = sysId + '/' + o.userData.part;
        keys.add(key);
        (partGroups[key] = partGroups[key] || []).push(o);
      }
      if (o.userData?.spin) spinners.push(o);
      /* the raycast candidate set is built from these, never from root */
      if (o.isMesh || o.isPoints || o.isLine) meshes.push(o);
    });
    systems[sysId] = { group, dir: new THREE.Vector3(...dir), parts, meshes };
    invalidatePick();

    /* clone materials per part so highlight and dim stay per part */
    for (const key of keys) {
      const map = new Map(); const list = []; const mlist = [];
      for (const g of partGroups[key]) {
        g.traverse((o) => {
          if (!o.isMesh) return;
          mlist.push(o);
          if (!map.has(o.material)) {
            const c = o.material.clone();
            c.userData.base = c.color.clone();
            c.userData.baseEm = c.emissive ? c.emissive.clone() : new THREE.Color(0);
            c.userData.baseEmI = c.emissiveIntensity ?? 1;
            c.userData.baseOp = c.opacity;
            c.userData.baseT = c.transparent;
            /* the comparison is against the CONSTANT, not against paintHex:
               the clone comes straight off M.paint, which nothing mutates,
               so a car already resprayed still recognises its own paint */
            if (c.userData.base.getHex() === PAINT_BASE) {
              (paintKeys[key] = paintKeys[key] || []).push(c);
              /* pinned for the life of the material: see the pearl note */
              if (c.sheenColor) {
                c.sheen = 1;
                c.sheenRoughness = SHEEN_ROUGH;
                c.sheenColor.setHex(0x000000);
              }
              /* captured, not restated: the default follows common.js */
              c.userData.baseMetal = c.metalness;
              c.userData.base.setHex(paintOverride[key] ?? paintHex);
            }
            map.set(o.material, c);
            list.push(c);
          }
          o.material = map.get(o.material);
          if (o.userData.shell) shellMats.push(o.material);
        });
      }
      partMats[key] = list;
      partMeshes[key] = mlist;
    }

    /* Which of this system's meshes are too small to read in a floor
       reflection. The threshold is a WORLD radius, so the geometry radius
       is scaled by the largest column norm of the world matrix, which is
       the right bound for the non-uniform scales lib.part hands out.
       Lines and points are left in: they are cheap and they are the one
       thing a radius test misreads. */
    group.updateMatrixWorld(true);
    for (const o of meshes) {
      if (!o.isMesh) continue;
      if (!o.geometry.boundingSphere) o.geometry.computeBoundingSphere();
      const bs = o.geometry.boundingSphere;
      if (!bs) continue;
      const e = o.matrixWorld.elements;
      const sc = Math.sqrt(Math.max(
        e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
        e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
        e[8] * e[8] + e[9] * e[9] + e[10] * e[10]));
      if (bs.radius * sc < SMALL_R) smallMeshes.push(o);
    }

    /* a system arriving is geometry appearing, which the shadow map cannot
       know about on its own; this covers addVehicle as well as addSystem */
    needShadow();
    scheduleWarm();
  }

  /* ── The first click on any generation used to cost a third of a second ──
     Davis reported latency clicking through parts. select() is not it: it
     measures 0.2 to 1.4 ms. The cost is the FRAME AFTER the first selection,
     and on a warm gen10 it measured 451 ms against an idle frame of 13.4.

     It is shader compilation. paint() ghosts everything outside the focused
     system by setting transparent true and depthWrite false, and in three.js
     those two are program parameters, not uniforms, so the first selection
     asks the driver to build a new program for every material on the car at
     once. Proved rather than assumed: the spike does not recur on the second
     part of the same generation (30 ms), and it COMES BACK on a generation
     whose modules have never been built, gen1 measuring 54.8 ms on its first
     selected part and 11.4 on its next. New materials, new storm.

     So the storm is moved off the click. Every part material is put into the
     ghost state once, renderer.compile() builds the programs, and the
     materials go straight back. Both variants are then in three's program
     cache and paint() only ever swaps between cached ones.

     Debounced, because a generation change adds up to nine systems and this
     should run once per change rather than nine times. The delay also keeps
     it clear of the build itself, which is what the busy class in main.js is
     already covering. */
  /* ?nowarm=1 disables it, because the only honest way to measure what it is
     worth is two identical pages that differ in this one thing. A debounced
     250 ms timer cannot be beaten from a console, so an attempt to race it
     measures the warmed page twice and reports a win of zero. */
  const NO_WARM = typeof location !== 'undefined' &&
                  /[?&]nowarm=1/.test(location.search || '');
  let warmT = null;
  function warmGhosts() {
    if (NO_WARM) return;
    const touched = [];
    for (const list of Object.values(partMats)) {
      for (const m of list) {
        if (m.transparent === true && m.depthWrite === false) continue;
        touched.push([m, m.transparent, m.depthWrite]);
        m.transparent = true;
        m.depthWrite = false;
      }
    }
    if (!touched.length) return;
    renderer.compile(scene, camera);
    for (const [m, t, d] of touched) { m.transparent = t; m.depthWrite = d; }
  }
  function scheduleWarm() {
    if (warmT) clearTimeout(warmT);
    warmT = setTimeout(() => { warmT = null; warmGhosts(); }, 250);
  }

  function addVehicle(vroot, sysDefs) {
    root = vroot;
    scene.add(root);
    for (const [sysId, rec] of Object.entries(sysDefs)) indexSystem(sysId, rec.group, rec.dir);
  }

  /* Register a variant built after startup, matching current view state. */
  function addSystem(sysId, group, dir) {
    if (systems[sysId]) return;
    root.add(group);
    indexSystem(sysId, group, dir);
    applyExplode();
    /* applyPaint and not paint: indexSystem sets a new material's base from
       the override map but knows nothing about the pearl, so a variant built
       after a pearl was chosen would arrive in a solid colour */
    applyPaint();
  }

  /* ── Camera state ── */
  const target = new THREE.Vector3(HOME[3], HOME[4], HOME[5]);
  const sph = new THREE.Spherical();
  sph.setFromVector3(new THREE.Vector3(HOME[0], HOME[1], HOME[2]).sub(target));

  let fly = null;
  const applyCam = () => {
    camera.position.setFromSpherical(sph).add(target);
    camera.lookAt(target);
    needFrame();
    /* the camera moved, so what is under the pointer may have changed:
       this covers dragging, the wheel, camera flights and the turntable */
    needHover();
  };
  applyCam();

  function flyTo(pos, tgt, ms = 1050) {
    const toT = tgt.clone();
    const toS = new THREE.Spherical().setFromVector3(pos.clone().sub(toT));
    while (toS.theta - sph.theta > Math.PI) toS.theta -= Math.PI * 2;
    while (toS.theta - sph.theta < -Math.PI) toS.theta += Math.PI * 2;
    fly = { t0: performance.now(), ms, fromT: target.clone(), toT, fromS: sph.clone(), toS };
  }

  /* Frame a set of groups: keep the current view direction, fit the bbox.
     The view direction is gently lifted so flat, wide assemblies (packs,
     floors) are seen from above rather than edge-on. */
  function frameGroups(groups, pad = 3.1, rMin = 1.4) {
    const box = new THREE.Box3();
    for (const g of groups) box.expandByObject(g);
    if (box.isEmpty()) return;
    const c = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3()).length();
    const r = Math.max(rMin, size * pad * 0.5);
    const dir = camera.position.clone().sub(target).normalize();
    if (dir.y < 0.35) { dir.y = 0.35; dir.normalize(); }
    flyTo(c.clone().addScaledVector(dir, r), c);
  }

  /* ── Controls ── */
  let drag = null;
  const MIN_R = 0.9, MAX_R = 26;
  const pointer = new THREE.Vector2(-9, -9);
  let hasPointer = false;

  let idleT = 0;   // seconds since the user last touched the view

  /* The last pointer position in client pixels, kept because the NDC it
     produces is only valid for the canvas size it was measured against. */
  let ptrCX = 0, ptrCY = 0;

  /* Re-derive the NDC from that client position. Called from the pointer
     handlers, and again from resize(): the cursor does not move when the
     window does, but the canvas under it does, so an NDC that named one
     part now names another. Marking the hover dirty without re-aiming just
     makes the recompute repeat the same stale answer. */
  function aimPointer() {
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    pointer.set(((ptrCX - r.left) / r.width) * 2 - 1, -((ptrCY - r.top) / r.height) * 2 + 1);
    return true;
  }

  /* Where the pointer is, in NDC. A touch tap fires pointerdown with no
     pointermove before it, so the down handler sets it too. */
  function setPointer(e) {
    ptrCX = e.clientX; ptrCY = e.clientY;
    if (!aimPointer()) return;
    hasPointer = true;
    needHover();
  }
  function clearPointer() {
    hasPointer = false;
    pointer.set(-9, -9);
    needHover();
  }

  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    setPointer(e);
    drag = { x: e.clientX, y: e.clientY, pan: e.button === 2 || e.shiftKey, moved: 0 };
    fly = null;
    idleT = 0;
  });

  canvas.addEventListener('pointermove', (e) => {
    setPointer(e);
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    drag.moved += Math.abs(dx) + Math.abs(dy);
    drag.x = e.clientX; drag.y = e.clientY;
    if (drag.pan) {
      const right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0);
      const up = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1);
      const k = sph.radius * 0.0016;
      target.addScaledVector(right, -dx * k).addScaledVector(up, dy * k);
    } else {
      sph.theta -= dx * 0.0052;
      sph.phi = Math.max(0.1, Math.min(Math.PI - 0.35, sph.phi - dy * 0.0052));
    }
    applyCam();
  });

  const endDrag = (e) => {
    if (drag && drag.moved < 6 && e.button !== 2) pick();
    drag = null;
    /* a finger leaves no cursor behind, so the hover must not linger */
    if (e.pointerType && e.pointerType !== 'mouse') clearPointer();
    else needHover();
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', () => { drag = null; needHover(); });
  canvas.addEventListener('pointerleave', clearPointer);
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    fly = null;
    idleT = 0;
    sph.radius = Math.max(MIN_R, Math.min(MAX_R, sph.radius * Math.pow(1.0016, e.deltaY)));
    applyCam();
  }, { passive: false });

  let pinch = null;
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      pinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX,
                         e.touches[0].clientY - e.touches[1].clientY);
      drag = null;
    }
  }, { passive: true });
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && pinch) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX,
                           e.touches[0].clientY - e.touches[1].clientY);
      sph.radius = Math.max(MIN_R, Math.min(MAX_R, sph.radius * (pinch / d)));
      pinch = d;
      applyCam();
    }
  }, { passive: true });
  canvas.addEventListener('touchend', () => { pinch = null; });

  /* ── Picking ──────────────────────────────────────────────────────────
     The pipeline lives in js/pick.js, which needs a camera, a scene graph
     and a pointer and does not need a renderer, so tools/pickbench.js and
     tools/bvhcheck.js can drive the shipped code headlessly instead of a
     copy of it. What stays here is the SCHEDULING: the hover is recomputed
     when something that could change it moved, not once per frame, and
     needHover() is called from the pointer handlers, from applyCam, from
     applyExplode, from drive mode and from anything that changes which
     meshes are pickable. */
  const picker = createPicker(camera, systems);
  const invalidatePick = () => picker.invalidate();
  let hovered = null;   // "sys/part" or null
  let selected = null;
  let pickMs = 0, pickRuns = 0, hoverUpdateMs = 0;   // read by api.pickDebug

  const hitTest = (budgeted) =>
    (hasPointer ? picker.hitTest(budgeted, root, pointer, viewW, viewH) : null);

  function pick() {
    const k = hitTest(false);
    if (k) { select(k); onPick(k); }
    else if (selected) { select(null); onPick(null); }
  }

  let focusSys = null;   // system id whose context is ghosted in

  /* ── A SET of systems to keep lit, for compare mode ─────────────────────
     focusSys answers "show me this one system". focusSet answers "show me
     the seven slots that differ between these two rungs", which is the same
     ghosting machinery asked a wider question. focusSys wins when both are
     set, because a part you clicked is a more specific request than a rung
     you are reading about.

     AN EMPTY SET GHOSTS NOTHING, and that is a decision rather than a
     fallthrough. Two rungs with no slot between them means every slot
     carried, and the honest picture of "everything carried" is not a car
     faded to seven percent that reads as a bug; it is the whole car, with
     the panel saying in words that nothing changed. js/main.js says it. */
  let focusSet = null;
  let focusSetSig = '';

  function select(k) {
    selected = k;
    focusSys = k ? k.split('/')[0] : null;
    if (k && partGroups[k]) frameGroups(partGroups[k]);
    if (!k) flyTo(new THREE.Vector3(HOME[0], HOME[1], HOME[2]),
                  new THREE.Vector3(HOME[3], HOME[4], HOME[5]));
    paint();
  }

  function focusSystem(sysId) {
    selected = null;
    focusSys = sysId;
    const rec = systems[sysId];
    if (rec) frameGroups([rec.group], 2.7, 5.2);
    paint();
  }

  /* Focused work ghosts everything outside the active system so parts
     buried inside the car stay visible from outside the shell. */

  /* THE HIGHLIGHT IS THE SYSTEM'S OWN COLOUR, and this amber is only the
     fallback for a system that never declared one.

     Every module already carries SYSTEM.color and there are nine slot hues
     in the tree: battery cyan 0x4fc4d8, thermal green 0x58d6a6, autonomy
     blue 0x6ea8ff, suspension violet 0xc0a2ec, drivetrain amber 0xe8a24c,
     hv orange 0xff8a3c, interior sand 0xd9c08a, wheels a pale grey and the
     bodies a pale blue that lightens up the ladder. Until now the whole
     palette was spent on a 3 px bar beside a name in the rail while the one
     surface that could actually carry it, the car, highlighted everything in
     the same amber. Clicking a cell and clicking a damper looked identical.

     The two neutral slots stay neutral on purpose and are not boosted. Body
     and wheels are the largest surfaces on the car and the palette makes
     them near-white and near-grey deliberately; pushing them to a hue would
     put the bodies at hue 200 next to battery at 189 and autonomy at 215,
     which is three blues where there are currently three distinguishable
     things. The palette separates on saturation as much as on hue, so it is
     used exactly as declared. */
  const HL = new THREE.Color(0xd4a24c);
  const sysHL = {};    // sysId -> THREE.Color, from SYSTEM.color via main.js
  let ghostSig = '';
  function paint() {
    /* ghosting and x-ray decide which meshes are pickable at all, so the
       candidate list is rebuilt whenever that state changes, and only then:
       a hover highlight touches emissive only and leaves picking alone */
    const sig = (selected || '') + '|' + (focusSys || '') + '|' + (xray ? 1 : 0) +
                '|' + focusSetSig;
    /* a ghost joining or leaving changes the caster set, so the shadow map
       has to be rebuilt; a hover highlight is emissive only and does not */
    if (sig !== ghostSig) { ghostSig = sig; invalidatePick(); needHover(); needShadow(); }
    needFrame();
    ghostMeshes.length = 0;
    for (const [key, mats] of Object.entries(partMats)) {
      const sys = key.split('/')[0];
      const isSel = selected === key;
      const isHov = hovered === key;
      const ghosted = focusSys ? sys !== focusSys
                    : focusSet ? !focusSet.has(sys)
                    : false;
      /* siblings of a selected part fade too, so nothing occludes it */
      const sibling = selected && !isSel && sys === focusSys;
      if (ghosted && partMeshes[key]) {
        for (const o of partMeshes[key]) ghostMeshes.push(o);
      }
      const dim = ghosted ? 0.7 : sibling ? 0.45 : 0;
      for (const m of mats) {
        m.color.copy(m.userData.base).lerp(BG, dim);
        if (ghosted || sibling) {
          m.transparent = true;
          m.opacity = m.userData.baseOp * (ghosted ? 0.07 : 0.3);
          m.depthWrite = false;
        } else {
          m.transparent = m.userData.baseT;
          m.opacity = m.userData.baseOp;
          m.depthWrite = true;
        }
        if (m.emissive) {
          const e = isSel ? 0.4 : isHov ? 0.18 : 0;
          m.emissive.copy(m.userData.baseEm).lerp(sysHL[sys] || HL, e);
          m.emissiveIntensity = ghosted ? m.userData.baseEmI * 0.1
            : isSel || isHov ? Math.max(0.4, m.userData.baseEmI)
            : m.userData.baseEmI;
        }
      }
    }
    /* x-ray keeps priority over the shell no matter the focus state */
    if (xray) {
      for (const m of shellMats) {
        m.transparent = true;
        m.opacity = Math.min(m.opacity, 0.05);
        m.depthWrite = false;
      }
    }
  }

  /* Light this set of systems and ghost the rest. Clearing focusSys is part
     of the job: "show me these seven" replaces "show me that one", and
     leaving the old single focus standing would ghost six of the seven the
     caller just asked for. It is guarded on `selected` because a selected
     part owns the focus and this must never yank it out from under a panel
     the user is reading; js/main.js releases the selection before it calls
     this, so the guard only ever protects against a future caller. */
  function setFocusSystems(ids) {
    if (!selected) focusSys = null;
    focusSet = ids && ids.length ? new Set(ids) : null;
    focusSetSig = focusSet ? [...focusSet].sort().join(',') : '';
    paint();
  }

  /* Teach the viewer the palette the modules already declare. Called once
     from main.js with every SYSTEM_DEFS colour, so a variant built lazily
     three generations later is already keyed: the map is by system id and
     does not care whether the geometry exists yet. */
  function setSystemColors(map) {
    for (const [id, hex] of Object.entries(map)) sysHL[id] = new THREE.Color(hex);
    paint();
  }

  /* Respray. paint() owns m.color and re-derives it from m.userData.base on
     every call, including the ghost and dim lerps, so the ONLY thing to move
     is the base; anything that wrote m.color directly here would be undone
     by the next selection.

     Every painted part is re-resolved on every respray rather than only the
     ones that changed. It is a handful of materials on a handful of parts and
     doing it wholesale means there is ONE rule for what colour a panel is,
     `override ?? body`, evaluated in one place. A partial update would need a
     second rule for what happens to a panel whose override was just removed. */
  function applyPaint() {
    const on = pearlHex != null && pearlAmt > 0;
    if (on) _p.setHex(pearlHex);
    for (const key in paintKeys) {
      _c.setHex(paintOverride[key] ?? paintHex);
      /* the base coat carries a little of the flake, so the panel is tinted
         face-on and not only at the edges */
      if (on) _c.lerp(_p, PEARL_IN_BASE * pearlAmt);
      const met = key in partMetal ? partMetal[key] : paintMetal;
      for (const m of paintKeys[key]) {
        m.userData.base.copy(_c);
        m.metalness = met == null ? m.userData.baseMetal : met;
        /* and the mid coat gets it at full strength, which is what comes
           back off a crease. Black is "no pearl" and costs nothing. */
        if (m.sheenColor) {
          if (on) m.sheenColor.copy(_p).multiplyScalar(pearlAmt);
          else m.sheenColor.setHex(0x000000);
        }
      }
    }
    paint();
  }

  /* metal null keeps whatever common.js gave the material, so a finish that
     declares nothing is byte-for-byte the car that shipped before this */
  function setPaint(hex, metal) {
    paintHex = hex;
    paintMetal = metal == null ? null : metal;
    applyPaint();
  }

  /* hex null clears the pearl entirely, which is a different state from a
     strength of zero: the control has to be able to say "solid colour" */
  function setPearl(hex, amt) {
    pearlHex = hex;
    if (amt != null) pearlAmt = Math.max(0, Math.min(1, amt));
    applyPaint();
  }

  /* One panel in its own colour. null puts it back on the body colour, which
     is a different state from "happens to be painted the same": the panel
     follows the car again the next time the car is resprayed. */
  function setPartPaint(key, hex, metal) {
    if (hex == null) { delete paintOverride[key]; delete partMetal[key]; }
    else {
      paintOverride[key] = hex;
      /* a panel in a solid colour is solid even on a metallic car */
      if (metal == null) delete partMetal[key];
      else partMetal[key] = metal;
    }
    applyPaint();
  }

  /* ── Staged explode ── */
  let explode = 0, explodeTarget = 0;
  /* pull the camera back as the stack grows, keeping the user's own zoom */
  const setExplode = (v) => {
    const k = (1 + v * 0.85) / (1 + explodeTarget * 0.85);
    explodeTarget = v;
    if (!selected) {
      sph.radius = Math.max(MIN_R, Math.min(MAX_R, sph.radius * k));
      target.y = 0.55 + v * 1.35;
      applyCam();
    }
  };

  function applyExplode() {
    needShadow();  // parts moved, so the caster set moved with them
    needHover();   // parts moved under a stationary pointer
    const sysK = smooth(0, 0.5, explode) * 1.0;
    const partK = smooth(0.35, 1, explode) * 1.0;
    /* the whole vehicle rises as it comes apart, so systems that explode
       downward (battery, suspension) never sink through the floor */
    if (root) root.position.y = sysK * 1.45 + partK * 0.55;
    for (const rec of Object.values(systems)) {
      rec.group.position.copy(rec.group.userData.home).addScaledVector(rec.dir, sysK);
      for (const p of rec.parts) {
        p.position.copy(p.userData.home).addScaledVector(p.userData.explode, partK);
      }
    }
  }

  /* ── X-ray ── */
  let xray = false;
  function setXray(on) {
    xray = on;
    paint();   /* paint owns opacity; its x-ray branch fades the shell */
  }

  /* ── Drive mode: spin tagged groups ── */
  let drive = false;
  const setDrive = (on) => { drive = on; };

  /* idle turntable, off-switchable for anyone who wants a still scene */
  let autoRotate = true;
  const setAutoRotate = (on) => { autoRotate = on; };

  /* ── Loop ── */
  let raf = 0, last = performance.now();

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    viewW = w; viewH = h;
    /* Compare against what setSize WRITES, which is Math.floor(w * ratio),
       not against the raw product. This line used to read `canvas.width !==
       w * renderer.getPixelRatio()`, and whenever that product is not a
       whole number the two can never agree: the buffer is the floor of it,
       so the branch is true on EVERY frame forever. A fractional product is
       not exotic, it is what a fractional devicePixelRatio gives, which is
       1.5 on a Windows laptop at 150 percent scaling, 1.25 at 125 percent,
       and 1.8 on a Retina display at 90 percent browser zoom. Measured at
       Gen 9 with the product ending in .6, alternating the two states in
       one page: 40 of 40 still steps re-entered this branch, called
       setSize, and asked for a redraw and a hover recompute, against 0 of
       40 with a whole product. That is 12.0 ms a frame in a scene where
       nothing whatsoever is moving, and it silently cancels BOTH the frame
       gate below and the event-driven hover the BVH pass shipped. */
    const pr = renderer.getPixelRatio();
    if (canvas.width !== Math.floor(w * pr) || canvas.height !== Math.floor(h * pr)) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      /* the cursor stayed put, so re-aim it at the canvas that moved under
         it before asking for the recompute */
      if (hasPointer) aimPointer();
      needFrame();
      needHover();
    }
  }

  const api = {
    addVehicle, select, focusSystem, setExplode, setXray, setDrive, setAutoRotate,
    setSystemColors, setPaint, setPartPaint, setPearl, setFocusSystems, setCharging,
    getPaint: () => paintHex,
    getPearl: () => ({ hex: pearlHex, amt: pearlAmt }),
    /* the UI asks these two before it offers a finish, so a part that is not
       sprayed in body colour never gets a swatch row it cannot honour */
    isPainted: (key) => !!paintKeys[key],
    getPartPaint: (key) => (key in paintOverride ? paintOverride[key] : null),
    partPaintCount: () => Object.keys(paintOverride).length,
    setSystemVisible: (sysId, on) => {
      const rec = systems[sysId];
      if (rec && rec.group.visible !== on) {
        rec.group.visible = on;
        invalidatePick();
        needShadow();   // a whole system appeared or went away
        needHover();
      }
    },
    addSystem,
    hasSystem: (sysId) => !!systems[sysId],
    flyHome: () => select(null),
    getSelected: () => selected,
    hovered: () => hovered,
    debug: () => ({ drive, spinnerCount: spinners.length, explode, focusSys, selected }),
    /* Picking instrumentation, kept because the picking cost is easy to
       regress and hard to see: pickMs is the last hitTest, hoverUpdateMs
       adds the paint that follows a change, pickRuns counts recomputes (it
       should NOT climb once per frame in a still scene), candidates is the
       visible pickable set, core and pickNear are what one hover actually
       tested, pickRays is how many of the nineteen samples were needed,
       discAffordable is whether the hover will spend the disc where the
       pointer is standing and oldBudgetAffordable is what the retired
       triangle budget said about the same pointer.
       benchPick runs hitTest n times for a timing that is not lost in the
       0.1 ms clock quantisation of a single call. */
    pickDebug: () => ({ pickMs, pickRuns, hoverUpdateMs, ...picker.debug(),
                        bvh: bvhStats(), bvhOn: picker.getBVH(),
                        pending: hoverPending }),
    benchPick: (n = 50, budgeted = true) => {
      const t = performance.now();
      for (let i = 0; i < n; i++) hitTest(budgeted);
      return (performance.now() - t) / n;
    },
    /* The A/B switch, and the reason it exists: this machine's baseline
       swings by several times depending on what else is running, so the only
       honest comparison of the tree against the stock raycaster is one that
       alternates between them in the same page at the same instant. Nothing
       in the product touches it; benchmarks and tools/pickbench.js do. */
    setPickBVH: (on) => picker.setBVH(on),
    bvhStats,
    bvhReset,
    /* The same A/B switch for the frame loop, and it exists for the same
       reason. setFrameOpts always dirties both flags, so a toggle is never
       compared against a frame the other arm declined to draw.
       renders and shadowBuilds are the proof that the gates fire: in a
       still scene with a part selected both must stop climbing. */
    setFrameOpts: (o) => { Object.assign(FX, o); needShadow(); },
    /* Ask for one more frame and change NOTHING else, which is the only way
       to test the gate: setFrameOpts() dirties the shadow map, so a frame
       forced THAT way is a rebuild frame whose reflection samples the
       previous map, while a held frame's reflection is already current.
       This comment used to say a dirty shadow map "flips the cull guard in
       renderReflection". There is no such guard: the cull was made
       unconditional in the same change, which is the whole reason the map
       is built in the main pass. */
    forceFrame: () => { needFrame(); },
    frameDebug: () => ({ ...FX, renders, shadowBuilds, frameDirty, shadowDirty,
                         ghosts: ghostMeshes.length, small: smallMeshes.length }),
    /* Probe an arbitrary CSS pixel without disturbing the pointer or
       selecting anything, so pick reach can be swept over a part. */
    probePick: (cx, cy, budgeted = true) => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return null;
      const keepX = pointer.x, keepY = pointer.y, keepHas = hasPointer;
      pointer.set((cx / r.width) * 2 - 1, -(cy / r.height) * 2 + 1);
      hasPointer = true;
      const k = hitTest(budgeted);
      pointer.set(keepX, keepY);
      hasPointer = keepHas;
      return k;
    },
    step: (dt = 0.016) => update(dt),
    view: (pos, tgt, ms = 900) => flyTo(new THREE.Vector3(...pos), new THREE.Vector3(...tgt), ms),
    labelFor: (key) => {
      const groups = partGroups[key];
      if (!groups?.length) return null;
      const box = new THREE.Box3();
      for (const g of groups) box.expandByObject(g);
      const c = box.getCenter(new THREE.Vector3());
      c.project(camera);
      if (c.z > 1) return null;
      const r = canvas.getBoundingClientRect();
      return { x: (c.x * 0.5 + 0.5) * r.width, y: (-c.y * 0.5 + 0.5) * r.height };
    },
    /* The visibilitychange listener is on document, which outlives this
       viewer, so dispose has to take it back off or a second createViewer
       leaves the first one's needFrame wired to the page forever. */
    dispose: () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', needFrame);
      /* a pending warm holds the scene and the renderer, so a disposed viewer
         that left one armed would compile against geometry nobody is showing */
      if (warmT) { clearTimeout(warmT); warmT = null; }
    },
  };

  function tick(now) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
  }

  /* One simulation + render step. Kept callable (api.step) so behaviour can
     be tested deterministically even when the tab is hidden and RAF pauses. */
  function update(dt) {
    const now = performance.now();
    resize();

    if (fly) {
      const k = Math.min(1, (now - fly.t0) / fly.ms);
      const e = EASE(k);
      target.lerpVectors(fly.fromT, fly.toT, e);
      sph.theta = fly.fromS.theta + (fly.toS.theta - fly.fromS.theta) * e;
      sph.phi = fly.fromS.phi + (fly.toS.phi - fly.fromS.phi) * e;
      sph.radius = fly.fromS.radius + (fly.toS.radius - fly.fromS.radius) * e;
      applyCam();
      if (k >= 1) fly = null;
    }

    if (Math.abs(explode - explodeTarget) > 0.0005) {
      explode += (explodeTarget - explode) * Math.min(1, dt * 6);
      applyExplode();
      /* once the motion settles, re-frame whatever is focused: parts have
         moved, so the old framing may no longer contain them */
      if (Math.abs(explode - explodeTarget) <= 0.0005) {
        if (selected && partGroups[selected]) frameGroups(partGroups[selected]);
        else if (focusSys && systems[focusSys]) frameGroups([systems[focusSys].group], 2.7, 5.2);
      }
    }

    /* the pad breathing while the pack fills. One material, no geometry, and
       it asks for frames only while it is actually running */
    if (charging) {
      chargePhase += dt * 2.2;
      const k = 0.5 + 0.5 * Math.sin(chargePhase);
      ring.material.color.copy(RING_IDLE).lerp(RING_CHARGE, 0.30 + 0.55 * k);
      ring.material.opacity = 0.70 + 0.30 * k;
      needFrame();
    }

    if (drive) {
      for (const g of spinners) {
        const sp = g.userData.spin;
        g.rotation[sp.axis] += sp.speed * dt;
      }
      needShadow();   // spinning geometry is moving geometry
      /* wheels and rotors turn under a stationary pointer */
      if (hasPointer && spinners.length) needHover();
    }

    /* gentle turntable once the view has been idle a while */
    idleT += dt;
    if (autoRotate && idleT > 7 && !drag && !fly && !selected && !focusSys) {
      sph.theta += dt * 0.055;
      applyCam();
    }

    /* Hover only when something that could change it has moved. Nothing
       decrements while a drag is in flight, so the recompute a drag earned
       is still owed when the button comes up. */
    if (!drag && hoverPending > 0) {
      hoverPending--;
      const t0 = performance.now();
      const h = hitTest(true);
      const t1 = performance.now();
      let changed = false;
      if (h !== hovered) {
        changed = true;
        hovered = h;
        canvas.style.cursor = h ? 'pointer' : 'grab';
        paint();   /* which calls needFrame() */
      }
      pickMs = t1 - t0;
      if (changed) hoverUpdateMs = performance.now() - t0;
      pickRuns++;
    }

    /* Nothing below this line changes anything; it only draws. If no cause
       has asked for a redraw since the last one, the picture is already on
       the screen and the cheapest correct thing to do is leave it there. */
    if (FX.gate && !frameDirty) return;
    frameDirty = false;
    renders++;

    fill.position.copy(camera.position);
    refMat.uniforms.uRes.value.set(canvas.width, canvas.height);

    /* One shadow pass, and only when the GEOMETRY moved: a directional
       light's shadow map does not depend on the camera, so an orbit, the
       wheel and the turntable all leave it identical. At Gen 9 that is 712
       depth draws a frame that no longer happen.

       It is built in the MAIN render rather than the mirrored one, which is
       the opposite of what this loop used to do and is what lets the
       mirrored pass cull anything at all: r160 builds the map inside
       render() off object.visible, so whichever pass builds it decides what
       casts. Building it here means renderReflection() above just sampled
       the PREVIOUS map, so on a rebuild frame the reflection is one frame
       behind. That has to be paid back rather than waved away: with the
       frame gate on, "one frame behind" becomes "behind until the user does
       something else", and hiding a system left 145,757 stale pixels on the
       screen indefinitely. So a rebuild asks for one more frame, which
       redraws the reflection against the new map and then settles, because
       that frame finds shadowDirty false and asks for nothing. */
    renderer.shadowMap.needsUpdate = false;
    renderReflection();
    const wantShadow = FX.shadowGate ? shadowDirty : true;
    renderer.shadowMap.needsUpdate = wantShadow;
    if (wantShadow) shadowBuilds++;
    /* The payback frame is owed by the map's CONTENT changing, so it hangs
       off shadowDirty and never off wantShadow. Off wantShadow it also fired
       in the ungated arm, where shadowGate false rebuilds an identical map
       every frame, and dirtying the frame every frame silently switched the
       frame gate OFF in any A/B that held gate true and shadowGate false.
       tools/framebench.js's staticProof was exactly that arm: it reported 30
       renders in 30 steps, so the "the gate changes 0 pixels" line beside it
       was two fully drawn frames being compared and proved nothing. With
       shadowGate true, which is what ships, wantShadow IS shadowDirty and
       this changes no pixels; measured below at 0 of 5,184,000. */
    if (shadowDirty) needFrame();
    shadowDirty = false;
    renderer.render(scene, camera);
  }

  resize();
  raf = requestAnimationFrame(tick);
  return api;
}

/* A vertical gradient environment so metal has something to reflect. */
/* A photographic studio, not a gradient.

   Car paint only looks like car paint when it has STRUCTURE to reflect.
   A vertical gradient gives a uniform sheen and reads as plastic; what
   sells an automotive render is long rectangular softboxes with hard
   edges, because their reflections rake along the bodyside and reveal
   the surface curvature. This paints an equirectangular studio: a dark
   surround, an overhead strip light running the length of the car, two
   large side softboxes at shoulder height, and cooler fill behind. */
function makeEnv(renderer) {
  const W = 1024, H = 512;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');

  /* surround: deep, slightly cool, brighter toward the ceiling */
  const base = ctx.createLinearGradient(0, 0, 0, H);
  base.addColorStop(0.00, '#2b3440');
  base.addColorStop(0.30, '#161c24');
  base.addColorStop(0.50, '#0c1116');
  base.addColorStop(0.72, '#0a0d11');
  base.addColorStop(1.00, '#05070a');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  /* soft-edged rectangle helper: hard core, feathered rim */
  const box = (x, y, w, h, peak, tint) => {
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(0.18, tint(peak * 0.55));
    g.addColorStop(0.5, tint(peak));
    g.addColorStop(0.82, tint(peak * 0.55));
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
    /* feather the vertical ends so the strip does not stop abruptly */
    const e = ctx.createLinearGradient(x, 0, x + w, 0);
    e.addColorStop(0, 'rgba(0,0,0,0.85)');
    e.addColorStop(0.10, 'rgba(0,0,0,0)');
    e.addColorStop(0.90, 'rgba(0,0,0,0)');
    e.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = e;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  };
  const warm = (a) => `rgba(255,246,232,${a})`;
  const cool = (a) => `rgba(206,228,255,${a})`;

  /* overhead key strip, long and narrow: the highlight that runs the roof */
  box(W * 0.10, H * 0.045, W * 0.80, H * 0.10, 1.0, warm);
  /* two shoulder-height softboxes, front-left and front-right of camera */
  box(W * 0.02, H * 0.26, W * 0.30, H * 0.20, 0.85, warm);
  box(W * 0.56, H * 0.26, W * 0.30, H * 0.20, 0.70, cool);
  /* rear rim strip, cool, wraps the tail and separates it from the void */
  box(W * 0.36, H * 0.20, W * 0.20, H * 0.13, 0.55, cool);
  /* low bounce from the floor, wide and dim, lifts the rocker line */
  box(W * 0.05, H * 0.62, W * 0.90, H * 0.14, 0.16, cool);

  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(tex).texture;
  pmrem.dispose();
  tex.dispose();
  return env;
}
