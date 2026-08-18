/* Scene, camera, picking, staged explode, highlight, x-ray. */

import * as THREE from '../vendor/three.module.js';
import { createPicker } from './pick.js';
/* lib.closureAt only. The kinematics of a closure live in common.js so that
   the app and tools/closures.sh sweep the same motion rather than two copies
   of it; see the note there. */
import { lib } from './common.js';
import { bvhStats, bvhReset, bvhRaycast, bvhFor } from './bvh.js';

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

  /* ── SECTION VIEWS ──────────────────────────────────────────────────
     One clipping plane, shared by every part material in the vehicle and by
     nothing else, which is the whole reason it is LOCAL clipping and not the
     renderer-wide kind: a global plane would take the floor, the stage ring
     and the halo with it, and half a floor under a sectioned car reads as a
     rendering fault rather than as a cut.

     THE ARRAY IS ASSIGNED AT MATERIAL-CLONE TIME AND NEVER SWAPPED. In
     three.js the NUMBER of clipping planes on a material is a program
     parameter, not a uniform, so turning the cut on by writing an array onto
     two thousand materials would ask the driver to build two thousand new
     programs at once. That is the same storm the ghost warm-up above exists
     to prevent, and it is avoided the same way: every part material is built
     knowing about this plane from the start, and the cut is turned OFF by
     pushing the plane a kilometer out of the model where it clips nothing.
     Moving a plane is a uniform write and costs a frame, not a compile.

     The cut is a MEASUREMENT, so the plane is kept in the vehicle's own
     coordinates: x runs along the car, y up from the floor, z across it. */
  const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 1e3);
  const clipPlanes = [clipPlane];
  renderer.localClippingEnabled = true;

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

     The ring's own color is remembered, not restated, so this cannot drift
     from the value above. Charging pulses it toward the accent amber; the
     pulse is a COLOR change on one material with no geometry and no extra
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

  /* THE REFLECTION TARGET DECLARES THE CANVAS'S OWN OUTPUT, AND IT HALVES THE
     FRAME. Measured at Gen 9, 1280x800: 11.46 ms a frame down to 6.11.

     r160 derives two program parameters from whatever render target is bound,
     not from the material. Both are in the file as vendored:

       three.module.js:30139  colorSpace = target === null ? outputColorSpace
                                         : LinearSRGBColorSpace
       three.module.js:30151  toneMapping stays NoToneMapping unless target === null

     and both are needsProgramChange tests at 30193 and 30262. The canvas pass
     runs ACESFilmic and sRGB; the mirrored pass ran NoToneMapping and Linear.
     So every material on the car alternated between two parameter sets twice a
     frame, needsProgramChange was TRUE on every draw call in both passes, and
     every one of them re-derived its parameters and went back to the program
     cache. Nothing recompiled, which is why this never looked like a bug, but
     the car is 675 materials and the bookkeeping is half the frame.

     The one hook three.js leaves for "this target IS the output surface" is
     isXRRenderTarget, at 30139 and 30151. Setting it plus an sRGB texture makes
     both parameters agree with the canvas and needsProgramChange goes false.

     WHAT THE FLAG DOES NOT DO, checked rather than assumed. Its only other use
     is textures.js:25725, feeding forceLinearTransfer to getInternalFormat, and
     there it is read at ONE branch: `glType === UNSIGNED_BYTE` picks
     SRGB8_ALPHA8 against RGBA8. This target is HalfFloatType, so it takes the
     RGBA16F line above that branch and the flag changes nothing. The 16-bit
     float precision the reflection is drawn at is intact, and no sRGB texture
     format is involved: the colorSpace here tells the SHADER what to write, and
     the GPU stores the same floats it always did.

     THE COST IS THAT THE TARGET NOW HOLDS ENCODED VALUES, and the shader below
     decodes them. Left alone it made the reflection about six times stronger,
     because sRGB lifts dim values hard and this reflection is dim by design.
     Measured as the reflection's own contribution to floor luminance under the
     car, isolated by setting uStrength to 0 and back: 0.30 before, 1.79 raw,
     0.31 with the decode and uStrength at 0.60. The base scene with the
     reflection off is 39.30 in both, to the hundredth.

     UPGRADE HAZARD, and it is the reason for all of this text: three.js marks
     isXRRenderTarget `// TODO Remove this when possible` at 27078. If the
     vendored copy is ever replaced, check that line first. The failure would be
     silent and it would look like a performance regression, not a bug. */
  refRT.isXRRenderTarget = true;
  refRT.texture.colorSpace = THREE.SRGBColorSpace;
  const refCam = new THREE.PerspectiveCamera();
  const refMat = new THREE.ShaderMaterial({
    uniforms: {
      tRef: { value: refRT.texture },
      uRes: { value: new THREE.Vector2(1, 1) },
      /* 0.60 rather than the 0.30 this carried while the target was linear.
         The decode below returns tone-mapped values, which the ACES toe has
         already pulled down, so the same reflection needs twice the gain to
         land back where it was. Not a taste change: it is the strength at
         which the measured contribution reproduces, 0.31 against 0.30. */
      uStrength: { value: 0.60 },
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
        /* The target holds sRGB-encoded values now, see the note beside refRT,
           so decode before the additive composite. This is a raw ShaderMaterial
           and three.js appends no colorspace chunk to one, so the conversion
           has to be here: sampled raw, the reflection came out about six times
           too strong, because sRGB lifts exactly the dim values this effect is
           made of. 2.2 rather than the piecewise curve on purpose, the toe of
           which is below anything this reflection reaches. */
        vec3 refl = pow(texture2D(tRef, gl_FragCoord.xy / uRes).rgb, vec3(2.2));
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
     look decision about the focus state, not a free optimization, so it is
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
     Every body on the ladder is sprayed in the one color common.js calls
     M.paint, 0x2a5666, a dark teal, and it has been the only color any of
     these eleven cars has ever worn.

     The set is found by BASE COLOR rather than by the shell tag, and the
     difference matters in both directions. lib.shell marks what fades under
     x-ray, so it also holds the glass canopy, the carbon floor and the
     splitter, none of which are painted; and hv, hv-4 and hv-11 each build a
     charge-port flap out of M.paint that carries no shell tag at all, which
     is exactly the part that SHOULD follow the body color, because that is
     what a charge flap does on a real car. Matching on the material's own
     base color asks the only question that is actually being asked here:
     is this surface sprayed in body color. Glass, alu, carbon, cast and
     rubber all answer no on their own and need no exception list.

     HELD PER PART, not as one flat list, which is what lets a panel wear a
     color of its own. Materials are already cloned per part in indexSystem,
     so the key is free; a part with no entry in paintOverride simply takes
     the body color, and the override is consulted again when a variant
     builds lazily, so a car resprayed an hour ago comes out of the box in
     the colors it is already wearing rather than in teal.

     The paintable set is small and it is the set a real paint shop would
     mask: on Gen 11 it is body-11's skin, shoulder, tail-cone and doors plus
     hv-11's charge flap, five parts. On Gen 1 it is the hood, doors, fenders
     and fascias plus hv's flap. Everything else on the car is glass, carbon,
     alu, cast, steel or rubber and answers no on its own. */
  const PAINT_BASE = 0x2a5666;
  let paintKeys = {};          // "sys/part" -> [materials sprayed in body color]
  let paintHex = PAINT_BASE;
  const paintOverride = {};    // "sys/part" -> hex, a panel wearing its own color

  /* ── THE PEARL COAT ───────────────────────────────────────────────────
     A finish is TWO colors, which is what automotive paint actually is: a
     base coat carrying the color, then a mid coat of mica flake that tints
     what comes back at a glancing angle, then clear over both. So the pearl
     is modeled the way it works rather than as a blend. It does two things
     at once and both are needed for it to read:

       the BASE COLOR takes a small amount of the pearl, so the panel is
       tinted face-on the way a flake load tints a solid coat;
       the SHEEN takes the pearl at full strength, so at a glancing angle
       across a crease the second color is what comes back.

     That is why Ember under a Cobalt pearl and Cobalt under an Ember pearl
     are different finishes rather than the same average, and why this is
     worth more than one mixed color: the car changes as it turns.

     THE PEARL IS A PROPERTY OF THE CAR AND NOT OF A PANEL, deliberately.
     A mid coat is sprayed over the whole body, so a panel wearing its own
     base color still wears the car's pearl over the top, which is what a
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
     value there is almost no diffuse term and the base color tints the
     REFLECTION instead of providing brightness. In a dark studio that makes
     a light color read DARK. Measured on the shipped default, Alpine white
     under a brass pearl: the base color is #d8d6d4, genuinely near white,
     and the car renders bronze. Drop the same material to 0.25 with nothing
     else touched and it renders white.

     Eleven generations never surfaced this because every one of them wore a
     dark saturated teal, where a tinted mirror is exactly what you expect.

     The fix is per COLOR and not global, because the distinction is real:
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
  /* one scratch vector for api.project, which runs a few times a frame while
     dimensions are on and has no business allocating in that loop */
  const _prj = new THREE.Vector3();

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
  const SMALL_R = 0.10;   // world bounding radius, meters

  /* Index one system: capture homes, tag parts, clone materials. Used for
     the startup set and again for variants built lazily on first switch. */
  function indexSystem(sysId, group, dir, def) {
    group.userData.home = group.position.clone();
    const parts = [];
    const meshes = [];
    const keys = new Set();
    const hinged = [];
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
        if (o.userData.hinge) hinged.push(o);
      }
      if (o.userData?.spin) spinners.push(o);
      /* the raycast candidate set is built from these, never from root */
      if (o.isMesh || o.isPoints || o.isLine) meshes.push(o);
    });
    systems[sysId] = { group, dir: new THREE.Vector3(...dir), parts, meshes };
    indexClosures(sysId, def, hinged);
    /* unconditionally, and NOT from inside indexClosures: a body is often
       indexed before the module whose camera its door carries, and the
       module that supplies a carried part declares no closures of its own,
       so the only moment both sides are known is after any system lands */
    resolveCarried();
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
            /* every part material knows about the section plane from birth;
               see the note on clipPlane. Environment materials never do. */
            c.clippingPlanes = clipPlanes;
            c.userData.base = c.color.clone();
            /* THE COLOR THIS MATERIAL WAS BORN IN, kept apart from `base`
               because `base` is what everything downstream writes to: the
               body paint moves it on every respray and a part tint moves it
               too, so without a pristine copy "put it back" has nothing to
               put back. Captured here, before either of them has run. */
            c.userData.base0 = c.color.clone();
            c.userData.baseEm = c.emissive ? c.emissive.clone() : new THREE.Color(0);
            c.userData.baseEmI = c.emissiveIntensity ?? 1;
            c.userData.baseOp = c.opacity;
            c.userData.baseT = c.transparent;
            /* the comparison is against the CONSTANT, not against paintHex:
               the clone comes straight off M.paint, which nothing mutates,
               so a car already resprayed still recognizes its own paint */
            if (c.userData.base.getHex() === PAINT_BASE) {
              /* THIS is the moment the key becomes a painted panel, and a
                 color stored for it before that moment is filed in the wrong
                 place. setPartPaint routes on paintKeys, which only exists
                 for a system that has been BUILT, and the app always boots on
                 Gen 1: so every stored override for body-11, wheels-11, hv-11
                 and the rest was replayed into partTint on load and the panel
                 came back in the body color, because two lines below the base
                 is taken from paintOverride, which never received it. Every
                 readout kept claiming the color anyway, since getPartPaint and
                 partPaintCount read partTint too. Migrate it here, before that
                 read, rather than teaching setPartPaint to guess at a system
                 that does not exist yet. Also covers the mid-session path,
                 where setFinishMode replays every stored color through
                 setPartPaint while a rung is still cold. */
              if (!(key in paintOverride) && key in partTint) {
                paintOverride[key] = partTint[key];
                delete partTint[key];
              }
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
      /* a variant built an hour after somebody tinted one of its parts still
         arrives wearing that tint, the same way paintOverride is read back
         two lines above for a panel */
      if (key in partTint) applyTint(key);
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
  /* IT WARMS BY DRAWING, AND renderer.compile() DID NOT WORK.

     Measured on a fresh page, first selected part, one step each:
     213.5 ms with this warm running and 214.4 ms with ?nowarm=1. Identical.
     The mechanism above was inert for the whole time it has been shipped,
     and the comment over it was describing an intent rather than a result.

     Two reasons, and the second is the one a compile() call cannot reach.
     `renderer.compile(scene, camera)` builds programs for the state the
     renderer is in when it is called, which is the MAIN pass drawing to the
     canvas. This viewer draws the scene TWICE, and the second pass renders
     to `refRT` with a mirrored camera, so its programs are keyed differently
     and were never built. Whatever compile() did manage to cover, the
     reflection pass still paid for on the first click.

     Drawing is the only thing guaranteed to compile exactly what a real
     frame needs, because it IS a real frame. Both passes run in the ghost
     state, the materials go straight back, and the true picture is drawn
     again in the same task, so the browser never composites the ghosted
     one and there is no flash to hide. */
  function warmGhosts() {
    if (NO_WARM || !root) return;
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
    renderReflection();
    renderer.render(scene, camera);
    for (const [m, t, d] of touched) { m.transparent = t; m.depthWrite = d; }
    renderReflection();
    renderer.render(scene, camera);
    /* the gate still owns the next real frame; nothing above changed state */
    needFrame();
  }

  /* THE OTHER THING THE FIRST CLICK PAYS FOR, and it is not shaders.

     js/bvh.js builds a tree per geometry on demand and caches it, so the
     first pointer that reaches the car builds every tree in the ray's cone
     at once: measured cold on Gen 1, a single probePick costs 25.6 ms
     against 0.9 ms warm. design/pick-bvh.md records the same shape at 33 ms
     on Gen 9. That is a real part of what a click feels like and it is
     avoidable for the same reason the shader storm is: nothing about it has
     to happen while the user is waiting.

     Only the VISIBLE systems, and that is the whole discipline of it. The
     trees are the memory this viewer is most careful with, 5.72 MB for a Gen
     9 car, and building all 49 modules' worth on a page that shows nine of
     them would spend it on geometry nobody can point at. What this does is
     move a build the user's first hover was going to pay for anyway. */
  function warmTrees() {
    if (NO_WARM) return;
    for (const rec of Object.values(systems)) {
      if (!rec.group.visible) continue;
      for (const o of rec.meshes) bvhFor(o);
    }
  }
  /* Two timers rather than one, because these are two different costs and
     running them in one task makes a generation switch hitch by the sum.
     The draw warm goes first: it is the larger of the two and it is what the
     user is most likely to trigger next by clicking. */
  let warmT2 = null;
  function scheduleWarm() {
    if (warmT) clearTimeout(warmT);
    if (warmT2) clearTimeout(warmT2);
    warmT = setTimeout(() => { warmT = null; warmGhosts(); }, 250);
    warmT2 = setTimeout(() => { warmT2 = null; warmTrees(); }, 420);
  }

  function addVehicle(vroot, sysDefs) {
    root = vroot;
    scene.add(root);
    for (const [sysId, rec] of Object.entries(sysDefs)) indexSystem(sysId, rec.group, rec.dir, rec.def);
  }

  /* Register a variant built after startup, matching current view state. */
  function addSystem(sysId, group, dir, def) {
    if (systems[sysId]) return;
    root.add(group);
    indexSystem(sysId, group, dir, def);
    applyExplode();
    /* applyPaint and not paint: indexSystem sets a new material's base from
       the override map but knows nothing about the pearl, so a variant built
       after a pearl was chosen would arrive in a solid color */
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

  /* REDUCED MOTION REACHES THE SCENE, not only the stylesheet.

     css/style.css has honored prefers-reduced-motion since the beginning, and
     every plate slide and fade obeys it. The 3D never did: a reader who asks
     their system for less movement still got a car that turns by itself after
     seven idle seconds and a camera that swings across the room for a second
     on every selection, every tour stop and every part they open. That is the
     motion the preference is actually about.

     So the turntable does not run and a flight becomes a cut. Read once at
     load and not per frame: this is a system preference, not a control, and
     the one place it could change under a session is a reader flipping it in
     the OS, who can reload. */
  const REDUCED = typeof matchMedia === 'function'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function flyTo(pos, tgt, ms = 1050) {
    const toT = tgt.clone();
    const toS = new THREE.Spherical().setFromVector3(pos.clone().sub(toT));
    while (toS.theta - sph.theta > Math.PI) toS.theta -= Math.PI * 2;
    while (toS.theta - sph.theta < -Math.PI) toS.theta += Math.PI * 2;
    if (REDUCED) {
      /* arrive, rather than travel. The frame still has to be asked for,
         because applyCam is what schedules one. */
      target.copy(toT);
      sph.copy(toS);
      fly = null;
      applyCam();
      return;
    }
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

  /* ── HOLD TO NAME, which is the hover a finger never had ───────────────

     On a desktop the pointer names every part it passes over: the tag reads
     out the part and its system, the part lights, and a click is a decision
     already made. A phone has none of that, so 455 parts are an unlabeled
     surface and every tap is a guess that costs a camera flight and a panel.

     So a touch that stays down for 320 ms stops being a tap and becomes a
     hover: the tag appears above the finger, the part under it lights, and
     sliding walks from part to part exactly as a mouse does. Lifting selects
     whatever is named. Sliding off the car names nothing and lifting there
     selects nothing, which is the cancel.

     THE THRESHOLD IS THE WHOLE DESIGN. Arm it too eagerly and turning the car
     starts labeling parts; arm it too late and the gesture is unreachable.
     250 ms is past a tap and short of a decision, and any movement over
     COARSE_SLOP before it fires means the finger is orbiting and the hold
     never arms. Once armed, orbit stops for that gesture: a finger cannot do
     both, and naming is what it asked for. */
  const COARSE_SLOP = 10;     // px of net travel a finger is allowed while tapping
  const HOLD_MS = 250;
  let holdT = 0;              // the timer that arms the hold
  let naming = false;         // this gesture is naming parts, not orbiting

  const cancelHold = () => { clearTimeout(holdT); holdT = 0; };

  canvas.addEventListener('pointerdown', (e) => {
    /* Capture keeps a drag alive when the pointer leaves the canvas, and it
       is worth having, but it is not worth the gesture: setPointerCapture
       throws NotFoundError whenever the id has no active pointer behind it,
       and an exception on the first line of this handler means `drag` is
       never set, so the whole down-move-up path dies silently and a click
       stops selecting. Found with synthetic events, and the same shape
       applies to any pointer the browser has already released. */
    try { canvas.setPointerCapture(e.pointerId); } catch {}
    setPointer(e);
    drag = { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY,
             pan: e.button === 2 || e.shiftKey, moved: 0,
             coarse: e.pointerType && e.pointerType !== 'mouse' };
    /* A SECOND FINGER ENDS THE NAMING GESTURE, and it has to hand the disc
       back. endDrag and pointercancel both pair `naming = false` with
       setPickPx(0), and this line did not: a finger held long enough to arm
       naming, then a second finger landing to pinch, cleared the flag and left
       the picker at the 20 px fingertip radius for the rest of the session.
       Nothing put it back, because nothing else ever sets it. The reader was
       then picking with a disc three times the cursor's, which names a
       neighboring part on anything dense. Ordered before the reset so the
       widened radius is only ever undone by the gesture that widened it. */
    if (naming) picker.setPickPx(0);
    naming = false;
    cancelHold();
    if (drag.coarse) {
      /* MOTION IS SILENT NOW. A finger that drags to orbit was flashing a
         label at every part it swept past, because the last hover survives a
         drag and main.js positions the tag wherever the pointer is. The
         finger that held still and tapped got nothing. That is backwards, so
         a coarse gesture drops the hover the moment it begins and only a
         held finger earns it back. */
      if (hovered) { hovered = null; canvas.style.cursor = 'grab'; paint(); }
    }
    if (drag.coarse && !drag.pan) {
      holdT = setTimeout(() => {
        holdT = 0;
        if (!drag) return;
        naming = true;
        /* a fingertip is not a cursor: widen the fallback disc for the life
           of this gesture so the part under the pad of the finger is the one
           that gets named */
        picker.setPickPx(20);
        needHover();      // paint the tag and light the part under the finger
      }, HOLD_MS);
    }
    fly = null;
    idleT = 0;
  });

  canvas.addEventListener('pointermove', (e) => {
    setPointer(e);
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    /* NET displacement from where the finger landed, not the accumulated
       path. design/ux-audit.md finding 4: the old test summed |dx| + |dy|
       over every move event, so four one-pixel wobbles back to the starting
       pixel counted as four, and a still finger on a touchscreen that
       reported eight of them failed a threshold of six without having moved
       at all. What a tap means is "it ended where it started". */
    drag.moved = Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0);
    drag.x = e.clientX; drag.y = e.clientY;
    /* a finger that travels before the hold arms is orbiting, not reading */
    if (holdT && drag.moved > COARSE_SLOP) cancelHold();
    /* and once it IS naming, the camera holds still: this gesture is the
       hover, and a hover that also turns the car is unusable */
    if (naming) { needHover(); return; }
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
    cancelHold();
    const coarse = e.pointerType && e.pointerType !== 'mouse';
    /* a hold that named something selects it on lift, wherever the finger
       ended; otherwise the old rule, a tap that ended where it started */
    const slop = coarse ? COARSE_SLOP : 6;
    if (drag && (naming || (drag.moved <= slop && e.button !== 2))) pick();
    if (naming) picker.setPickPx(0);      // back to the cursor's own radius
    naming = false;
    drag = null;
    /* a finger leaves no cursor behind, so the hover must not linger */
    if (coarse) clearPointer();
    else needHover();
  };
  canvas.addEventListener('pointerup', endDrag);
  /* A cancel has to end the same way a lift does. endDrag finishes with
     `if (coarse) clearPointer(); else needHover()`, and the note there is
     that a finger leaves no cursor behind so the hover must not linger.
     This handler called needHover() unconditionally, which re-establishes
     the hover UNDER A FINGER THAT IS NO LONGER TOUCHING THE SCREEN: after a
     cancel, viewer.hovered() stayed on the part indefinitely, where after a
     lift it correctly went null. The browser fires pointercancel whenever it
     takes the gesture over, which on a phone is the notification shade, a
     system edge swipe or a scroll takeover, so this is the common case on
     the one device the gesture exists for. The cancel carries a pointerType
     like any other pointer event, so it can make the same distinction. */
  canvas.addEventListener('pointercancel', (e) => {
    cancelHold();
    if (naming) picker.setPickPx(0);
    naming = false;
    drag = null;
    if (e.pointerType && e.pointerType !== 'mouse') clearPointer();
    else needHover();
  });
  canvas.addEventListener('pointerleave', clearPointer);
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    fly = null;
    idleT = 0;
    sph.radius = Math.max(MIN_R, Math.min(MAX_R, sph.radius * Math.pow(1.0016, e.deltaY)));
    applyCam();
  }, { passive: false });

  /* TWO FINGERS ZOOM AND NOW ALSO PAN. Pan was gated on the right button or
     the shift key, so a phone could orbit and pinch and never move the car
     off the middle of the screen: everything inside it had to be read past
     the same fixed center. The pinch already tracks both touches, so the pan
     is the midpoint of the same two points, and it costs no new gesture. */
  let pinch = null, pinchMid = null;
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      pinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX,
                         e.touches[0].clientY - e.touches[1].clientY);
      pinchMid = { x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                   y: (e.touches[0].clientY + e.touches[1].clientY) / 2 };
      cancelHold();
      if (naming) picker.setPickPx(0);
      naming = false;
      drag = null;
    }
  }, { passive: true });
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && pinch) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX,
                           e.touches[0].clientY - e.touches[1].clientY);
      sph.radius = Math.max(MIN_R, Math.min(MAX_R, sph.radius * (pinch / d)));
      pinch = d;
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      if (pinchMid) {
        /* the same arithmetic the right-drag pan uses, off the midpoint of
           the two fingers rather than off one pointer */
        const right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0);
        const up = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1);
        const k = sph.radius * 0.0016;
        target.addScaledVector(right, -(mx - pinchMid.x) * k)
              .addScaledVector(up, (my - pinchMid.y) * k);
      }
      pinchMid = { x: mx, y: my };
      applyCam();
    }
  }, { passive: true });
  canvas.addEventListener('touchend', () => { pinch = null; pinchMid = null; });

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

  /* coreOnly is the visibility question rather than the hover question; see
     the note on hitTest in js/pick.js. Everything in the product passes it
     undefined and gets exactly the behavior it always had. */
  const hitTest = (budgeted, coreOnly) =>
    (hasPointer ? picker.hitTest(budgeted, root, pointer, viewW, viewH, coreOnly) : null);

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

  /* THE HIGHLIGHT IS THE SYSTEM'S OWN COLOR, and this amber is only the
     fallback for a system that never declared one.

     Every module already carries SYSTEM.color and there are nine slot hues
     in the tree: battery cyan 0x4fc4d8, thermal green 0x58d6a6, autonomy
     blue 0x6ea8ff, suspension violet 0xc0a2ec, drivetrain amber 0xe8a24c,
     hv orange 0xff8a3c, interior sand 0xd9c08a, wheels a pale gray and the
     bodies a pale blue that lightens up the ladder. Until now the whole
     palette was spent on a 3 px bar beside a name in the rail while the one
     surface that could actually carry it, the car, highlighted everything in
     the same amber. Clicking a cell and clicking a damper looked identical.

     The two neutral slots stay neutral on purpose and are not boosted. Body
     and wheels are the largest surfaces on the car and the palette makes
     them near-white and near-gray deliberately; pushing them to a hue would
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
     from main.js with every SYSTEM_DEFS color, so a variant built lazily
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
     doing it wholesale means there is ONE rule for what color a panel is,
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
     strength of zero: the control has to be able to say "solid color" */
  function setPearl(hex, amt) {
    pearlHex = hex;
    if (amt != null) pearlAmt = Math.max(0, Math.min(1, amt));
    applyPaint();
  }

  /* ── ONE PART IN ITS OWN COLOR, and there are two ways to be one ───────

     A BODY PANEL takes the override into the body-paint machinery above:
     `override ?? body`, under the same clearcoat and the same pearl, and
     null puts it back on the car's color so it follows the next respray.
     That is what shipped, and it is why only five parts per rung were ever
     offered the control: the rest of the car is not sprayed in body color.

     ANY OTHER PART is TINTED instead. Its own materials keep everything that
     makes them what they are, roughness, metalness, sheen, and only the base
     color moves, so a tinted tire still reads as rubber and a tinted cover
     still reads as machined. Davis asked for the wheels and the covers and
     that is the honest way to give them: a wheel is not a body panel and
     pretending it is would put a clearcoat on a tire.

     The two cannot collide. A part is tinted only where it has no body-paint
     material at all, so nothing here can take a panel out from under the
     respray. */
  const partTint = {};

  /* THE COLOR MAP HAS TO GO WHILE A TINT IS ON, and this is the whole reason
     white did not look white. three.js multiplies the base color BY the map,
     and wheels-11's cover face carries a 256 by 256 pattern whose mean
     brightness is 0.32, so the brightest color that material can reach is a
     third of the way to white and its own base of 0x191c1f rendered it black.
     Davis picked white for the Gen 11 covers and got the same near-black
     spiral back, which is exactly what the arithmetic says he should have.

     So a tinted material sets its map aside and gets it back when the tint is
     cleared. THE NORMAL MAP STAYS: the pattern is a relief as well as a
     picture, and keeping it means a white cover still shows its spiral in the
     shading rather than turning into a blank disc. Swapping a map in or out
     is a shader recompile, which is why it happens on a click and never on a
     frame. */
  function applyTint(key) {
    const list = partMats[key];
    if (!list) return;
    const hex = partTint[key];
    for (const m of list) {
      if (hex == null) {
        m.userData.base.copy(m.userData.base0);
        if (m.userData.map0 !== undefined) {
          m.map = m.userData.map0;
          delete m.userData.map0;
          m.needsUpdate = true;
        }
      } else {
        m.userData.base.setHex(hex);
        if (m.map && m.userData.map0 === undefined) {
          m.userData.map0 = m.map;
          m.map = null;
          m.needsUpdate = true;
        }
      }
    }
  }

  function setPartPaint(key, hex, metal) {
    if (!paintKeys[key]) {
      /* not a painted panel: tint it, and leave its materials otherwise
         exactly as common.js built them */
      if (hex == null) delete partTint[key];
      else partTint[key] = hex;
      applyTint(key);
      paint();
      return;
    }
    /* partTint too, and not only paintOverride. A key can hold BOTH when it
       was stored while its system was cold, and partPaintCount sums the two,
       so clearing the color left the entry behind: the panel went back to the
       body color, the "panels in their own color" list emptied, and the
       faceplate went on reading "1 panel in its own color" with nothing able
       to reach it. Re-picking a color then counted the same panel twice. */
    if (hex == null) { delete paintOverride[key]; delete partMetal[key]; delete partTint[key]; }
    else {
      paintOverride[key] = hex;
      /* a panel in a solid color is solid even on a metallic car */
      if (metal == null) delete partMetal[key];
      else partMetal[key] = metal;
    }
    applyPaint();
  }

  /* ── CLOSURES: the panels that open ───────────────────────────────────

     A closure is a rigid body on a declared path. The module owns the path
     and the argument for it in SYSTEM.closures, and tags the geometry that
     travels with lib.hinge. Nothing vehicle-specific lives here: this code
     owns the arithmetic, the clock, and the measurement.

     THE COMPOSITION, which is the whole of it. A part group's children are
     authored in world coordinates, so the group's own matrix is the only
     place a closure transform can live, and explode is already living
     there. Both are rigid, so their product is rigid and decomposes into
     the two fields a group has:

       position   = home + explode * partK + translation(M)
       quaternion = rotation(M)

     with M the closure's transform at the current travel. That is why the
     closure term is folded INTO applyExplode rather than written from
     outside it. Measured on the running app before any of this was written:
     setting the group transform directly and then touching the explode
     slider erases the position and keeps the quaternion, which leaves a
     door rotated about the world origin, on the far side of the car, in
     silence. applyExplode writes p.position for every part every time
     anything moves, so it has to be the one place that knows.

     THE MIRROR. lib.mirrorZ builds the far side by negating scale.z, so a
     mirrored group's children arrive already reflected and the closure has
     to be reflected with them. A rotation does not mirror like a vector
     does: the correct transform is the conjugate S M S with S = diag(1,1,-1),
     which carries the pivot and the axis in one operation. Hand-mirroring
     the fields instead means a sign rule per field, and the axis rule is
     the counterintuitive one (x and y negate, z does not), so the module
     authors one hinge on the +z side and never states the other.

     STAGES. spec.motion is a list, because the interesting kinematics are
     not one rotation. A door that pushes 30 mm outboard and then rises on a
     canted axis is two stages over two slices of the same travel, and that
     is the difference between a door that needs most of a meter beside the
     car and one that needs a few centimeters. Stages compose in declaration
     order and each runs over its own [start, end] window of t. */

  const closures = {};       // `${sysId}/${id}` -> record
  let closureMoving = false;
  let closureSig = 0;        // bumped when the set changes, to drop caches

  function indexClosures(sysId, def, hinged) {
    if (!hinged || !hinged.length) return;
    const specs = (def && def.closures) || {};
    for (const g of hinged) {
      const h = g.userData.hinge;
      const spec = specs[h.id];
      /* a tag with no declaration moves nothing, and says so on the console
         rather than failing quietly: this is the one way a module can hand
         the viewer a closure it never described */
      if (!spec) { console.warn('[closures] ' + sysId + ' tags ' + h.id + ' with no SYSTEM.closures entry'); continue; }
      const key = sysId + '/' + h.id;
      const rec = closures[key] || (closures[key] = {
        key, sysId, id: h.id, spec, groups: [], u: 0, at: 0, to: 0, metrics: null,
      });
      rec.groups.push(g);
      g.userData.closure = key;
    }
    closureSig++;
  }

  /* ── WHAT A CLOSURE CARRIES FROM ANOTHER MODULE ────────────────────────

     A door is not only the panel. A camera bolted through the door skin, a
     handle, a mirror: on a real car they travel with the leaf, and in this
     model they live in whatever module owns them. lib.hinge cannot reach
     them, because a module can only tag its own geometry.

     So a closure may DECLARE what it carries, and the declaration lives with
     the body because the body is the module that knows where its own
     aperture is:

       carries: [{ part: 'autonomy-4/cameras', box: [x0,y0,z0, x1,y1,z1] }]

     The box is in +z coordinates and selects by INSTANCE, because a part id
     is several groups and only some of them are on the door: `cameras` is
     five instances on autonomy-4 and exactly one a side rides the front
     door. An instance whose box center falls inside the declared box joins
     the closure, on the side its own z puts it.

     This is the same shape of claim as SYSTEM.interfaces: one module stating
     an agreement about a part it does not own, in terms a checker can
     falsify. tools/closures.sh resolves the same declaration independently
     and fails if it selects nothing, so a stale box is loud rather than
     quiet. */
  const _cbx = new THREE.Box3(), _cctr = new THREE.Vector3();
  function resolveCarried() {
    for (const rec of Object.values(closures)) {
      const list = rec.spec.carries;
      if (!list || !list.length) continue;
      for (const c of list) {
        const groups = partGroups[c.part];
        if (!groups) continue;          // that module is not on the car
        for (const g of groups) {
          if (g.userData.closure) continue;   // already spoken for
          _cbx.setFromObject(g);
          if (_cbx.isEmpty()) continue;
          _cbx.getCenter(_cctr);
          const b = c.box;
          const az = Math.abs(_cctr.z);
          if (_cctr.x < b[0] || _cctr.x > b[3]) continue;
          if (_cctr.y < b[1] || _cctr.y > b[4]) continue;
          if (az < b[2] || az > b[5]) continue;
          g.userData.closure = rec.key;
          /* the side it is already on decides which way the motion mirrors,
             and a carried group is NOT a lib.mirrorZ clone so its own z is
             the only thing that can say */
          g.userData.hinge = { id: rec.id, m: _cctr.z < 0 };
          g.userData.home = g.position.clone();
          rec.groups.push(g);
        }
      }
    }
  }

  const _cm = new THREE.Matrix4();
  const _cq = new THREE.Quaternion(), _cp = new THREE.Vector3(), _csc = new THREE.Vector3();

  /* Fold one closure into a part group whose position applyExplode has just
     written. Called from inside that loop and nowhere else. */
  function applyClosureTo(p) {
    const rec = closures[p.userData.closure];
    if (!rec) return;
    if (rec.at <= 0) { p.quaternion.set(0, 0, 0, 1); return; }
    lib.closureAt(rec.spec, rec.at, !!p.userData.hinge.m, _cm);
    _cm.decompose(_cp, _cq, _csc);
    p.quaternion.copy(_cq);
    p.position.add(_cp);
  }

  /* ── What an open closure costs in space, MEASURED ──────────────────────

     Every number the closures card publishes is swept off the geometry on
     screen, on the same principle the dimension read already works on:
     nothing is declared, so nothing can drift from the car it describes.

     The reference is the PARKED half-width, the widest thing on the whole
     car with everything shut, because a door has to clear whatever is
     actually there and on several rungs that is a tire rather than the
     paint. It is captured while the car is closed and held, because
     measuring it against a car with a door open would compare the door
     against itself. */
  let parked = null, parkedSig = -1;
  function parkedBox() {
    /* recompute only while the car is shut, and hold the last shut answer
       otherwise: measuring a door's excursion against a box that already
       contains the open door would compare the door against itself */
    const shut = Object.values(closures).every((r) => r.at <= 0 && r.to <= 0);
    if (shut && parkedSig !== closureSig) {
      const box = new THREE.Box3();
      for (const rec of Object.values(systems)) {
        if (rec.group.visible) box.expandByObject(rec.group);
      }
      if (!box.isEmpty()) { parked = box; parkedSig = closureSig; }
    }
    return parked;
  }

  /* The mesh's transform relative to the part group, which is the closure's
     own authored frame. Walks up rather than inverting the group's world
     matrix, because that matrix carries the travel we are trying to remove. */
  function localTo(group, mesh, out) {
    out.identity();
    for (let q = mesh; q && q !== group; q = q.parent) out.premultiply(q.matrix);
    return out;
  }

  /* Sweep one closure's own vertices over its whole travel. Returns meters
     of excursion past the PARKED car in each direction a parking space, a
     low ceiling or the car in front actually constrains.

     Measured on the +z authored side only, and that is not a shortcut: a
     mirrored group is a clone of the same authored geometry with the mirror
     in its scale, so both sides give the same |z|, the same height and the
     same reach. */
  const CLOSURE_SAMPLES = 48;
  /* the stall a door has to open in. 2.50 m is the common surface-lot
     width; the card reports how far into its travel this closure gets
     before it crosses the line with the car centered in the stall. */
  const BAY = 2.50;
  function closureMetrics(key) {
    const rec = closures[key];
    if (!rec) return null;
    if (rec.metrics && rec.metrics.sig === closureSig) return rec.metrics;
    const pb = parkedBox();
    if (!pb) return null;
    const halfW = Math.max(Math.abs(pb.max.z), Math.abs(pb.min.z));

    const xs = [], ys = [], zs = [];
    const lm = new THREE.Matrix4(), v = new THREE.Vector3();
    /* one side is enough, and taking both would only duplicate the points */
    const side = rec.groups.filter((g) => !g.userData.hinge.m);
    for (const g of (side.length ? side : rec.groups)) {
      g.traverse((o) => {
        if (!o.isMesh && !o.isInstancedMesh) return;
        localTo(g, o, lm);
        const pos = o.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          v.fromBufferAttribute(pos, i).applyMatrix4(lm);
          xs.push(v.x); ys.push(v.y); zs.push(v.z);
        }
      });
    }
    const n = xs.length;
    if (!n) return null;

    let lateral = 0, overhead = 0, fore = 0, aft = 0, bayAt = null;
    const m = new THREE.Matrix4();
    for (let k = 0; k <= CLOSURE_SAMPLES; k++) {
      const t = k / CLOSURE_SAMPLES;
      const e = lib.closureAt(rec.spec, t, false, m).elements;
      let mz = 0, my = -Infinity, mx = -Infinity, nx = Infinity;
      for (let i = 0; i < n; i++) {
        const x = xs[i], y = ys[i], z = zs[i];
        const X = e[0] * x + e[4] * y + e[8] * z + e[12];
        const Y = e[1] * x + e[5] * y + e[9] * z + e[13];
        const Z = e[2] * x + e[6] * y + e[10] * z + e[14];
        if (Math.abs(Z) > mz) mz = Math.abs(Z);
        if (Y > my) my = Y;
        if (X > mx) mx = X;
        if (X < nx) nx = X;
      }
      if (mz - halfW > lateral) lateral = mz - halfW;
      if (my - pb.max.y > overhead) overhead = my - pb.max.y;
      if (mx - pb.max.x > fore) fore = mx - pb.max.x;
      if (pb.min.x - nx > aft) aft = pb.min.x - nx;
      if (bayAt === null && mz > BAY / 2) bayAt = t;
    }
    rec.metrics = {
      sig: closureSig, points: n,
      lateral: Math.max(0, lateral),
      overhead: Math.max(0, overhead),
      fore: Math.max(0, fore),
      aft: Math.max(0, aft),
      halfWidth: halfW,
      /* null means it never leaves the stall at any point in its travel */
      bayFrac: bayAt,
      bay: BAY,
    };
    return rec.metrics;
  }

  function closureList() {
    return Object.values(closures)
      .filter((r) => systems[r.sysId] && systems[r.sysId].group.visible)
      .map((r) => ({
        key: r.key, id: r.id, sys: r.sysId, spec: r.spec,
        open: r.to > 0, at: r.at,
      }));
  }

  function setClosure(key, open) {
    const rec = closures[key];
    if (!rec) return false;
    const to = open ? 1 : 0;
    if (rec.to === to) return true;
    rec.to = to;
    closureMoving = true;
    return true;
  }

  function setAllClosures(open) {
    let any = false;
    for (const r of closureList()) any = setClosure(r.key, open) || any;
    return any;
  }

  /* Advance every closure that is not where it is going. Linear in time and
     then smoothed, rather than the exponential approach the explode slider
     uses, because a door has a duration and an exponential never lands on
     one: a reader watching a hinge wants it to arrive. */
  function stepClosures(dt) {
    if (!closureMoving) return false;
    let moving = false, moved = false;
    for (const rec of Object.values(closures)) {
      if (rec.u === rec.to) continue;
      const per = dt / (rec.spec.seconds || 1.2);
      rec.u = rec.to > rec.u ? Math.min(rec.to, rec.u + per)
                             : Math.max(rec.to, rec.u - per);
      rec.at = rec.u * rec.u * (3 - 2 * rec.u);
      moved = true;
      if (rec.u !== rec.to) moving = true;
    }
    closureMoving = moving;
    return moved;
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
        if (p.userData.closure) applyClosureTo(p);
      }
    }
  }

  /* ── X-ray ── */
  let xray = false;
  function setXray(on) {
    xray = on;
    paint();   /* paint owns opacity; its x-ray branch fades the shell */
  }

  /* ── The section ─────────────────────────────────────────────────────
     Three axes, and they are the three sections an engineering drawing has
     always had: along the car, across it, and through it in plan.

     `at` is a position in the vehicle's own meters, so the number the UI
     prints beside the slider is a real station on the car and not a
     percentage of a bounding box. `flip` chooses which half survives.

     Deliberately ONE plane. Two would let a reader take a quarter out and
     look into the corner of it, which sounds better than it is: with every
     material DoubleSide the cut faces are already the inside of a shell, and
     two of them turn a section into a chewed edge. */
  const CUT_N = { long: [0, 0, 1], cross: [1, 0, 0], plan: [0, 1, 0] };
  let cut = null;
  /* "has the section removed this world point", or null when nothing is cut.
     Named once and handed to everything that has to agree with what is on
     screen: the picker, and partVisibility below. It used to be written out
     inline at the picker's call and nowhere else, so partVisibility went on
     casting its rays through geometry the shader had already taken away and
     reported a part as buried by the very panel a reader had just cut open.
     One expression, so the two answers cannot drift. */
  const clipTest = () => (cut ? (x, y, z) =>
    clipPlane.normal.x * x + clipPlane.normal.y * y +
    clipPlane.normal.z * z + clipPlane.constant < 0 : null);
  function setCut(spec) {
    cut = spec && CUT_N[spec.axis] ? { ...spec } : null;
    if (!cut) {
      /* parked a kilometer out, where it keeps every point in the model and
         costs one comparison per fragment. See the note on clipPlane. */
      clipPlane.normal.set(0, 0, -1);
      clipPlane.constant = 1e3;
    } else {
      const n = CUT_N[cut.axis];
      /* keep p . axis < at, or the other half when flipped. three.js keeps
         the side where normal . p + constant is positive. */
      const s = cut.flip ? 1 : -1;
      clipPlane.normal.set(n[0] * s, n[1] * s, n[2] * s);
      clipPlane.constant = -s * cut.at;
    }
    /* the picker tests the same plane the shader does, or nothing at all;
       see the note on clipTest in js/pick.js */
    picker.setClip(clipTest());
    /* NOT invalidatePick: the candidate list is a function of what is
       visible and built, and a section changes neither. Rebuilding it on
       every input event of a slider drag would walk every mesh on the car
       for an answer that cannot have changed. */
    needFrame();
    needShadow();   /* the shadow map is built from the same geometry */
    needHover();    /* what is under the pointer changed without it moving */
  }
  const getCut = () => (cut ? { ...cut } : null);

  /* The vehicle's own extents, over the systems that are VISIBLE, which is
     the car in front of you rather than every variant ever built. The slider
     that drives the section needs a real range, and a range taken off the
     whole root would include eight hidden generations of bodywork. */
  function vehicleBox(skipSys) {
    const box = new THREE.Box3();
    for (const [id, rec] of Object.entries(systems)) {
      if (rec.group.visible && id !== skipSys) box.expandByObject(rec.group);
    }
    return box.isEmpty() ? null : box;
  }

  /* One world box PER INSTANCE of a part, which is not the same question as
     labelFor's single box over all of them. A wheel module's `tires` part is
     four objects, and four boxes are a wheelbase and two track widths where
     one box is only an overall width. */
  function partBoxes(key) {
    const groups = partGroups[key];
    if (!groups || !groups.length) return [];
    return groups.map((g) => new THREE.Box3().setFromObject(g)).filter((b) => !b.isEmpty());
  }

  /* ── CAN THIS PART BE SEEN FROM HERE, AND IF NOT, WHAT IS OVER IT ───────

     Asked because a control that changes something invisible looks broken.
     Gen 11 wears full-face covers, and behind them the forged wheels, the
     discs, the calipers and the park brake are not reachable by any ray from
     outside the car: a sweep of 3,225 pixels across the whole canvas at the
     front corner returned `tires` and `covers` and nothing else. So picking a
     color for the wheel did exactly what it was asked and showed nothing,
     which is indistinguishable from a bug.

     Sampled off the part's OWN box rather than guessed: the box center, its
     six face centers and its eight corners, stopping the moment the part
     answers. Two instances at most, because these are symmetric corner parts
     and a third probe buys nothing but milliseconds. The first key that comes
     back from somewhere else is what is standing in front of it, which is
     what the panel gets to name. */
  /* ── IS THIS PART ENCLOSED ON THIS CAR ────────────────────────────────

     Asked because a control that changes something invisible looks broken.
     Davis reported that the Gen 11 wheels do not change color. They do: that
     rung wears full-face covers, and behind them the forged wheels, the discs
     and the calipers cannot be reached by any ray from outside, so the swatch
     worked and the picture never moved.

     WORLD SPACE, NOT SCREEN SPACE, and that is the whole design of this. The
     first version probed pixels through the picker, which made the answer
     depend on two things it must not depend on: where the camera happens to
     be standing, and the fact that selecting a part ghosts everything outside
     its system, which makes almost any selected part "visible" to a pick. The
     statement the panel wants to make is about the CAR: is this part buried
     under something no matter where you stand. So it is eighteen rays cast
     from outside the vehicle toward each instance, against every mesh that is
     built and visible, ghosted or not.

     Cheap because of the sphere filter: each ray keeps only the meshes whose
     world bounding sphere it can actually touch, which is the same narrowing
     js/pick.js does and the reason this costs milliseconds rather than a
     full intersectObjects over seven hundred meshes. */
  const _rc = new THREE.Raycaster();
  const _rcO = new THREE.Vector3(), _rcD = new THREE.Vector3(), _rcC = new THREE.Vector3();
  const _rcHits = [], _rcInv = new THREE.Matrix4();
  /* nine directions, all of them from outside and none from under the floor:
     four square-on, four three-quarter, one from above */
  const LOOKS = [[1, 0.25, 0], [-1, 0.25, 0], [0, 0.25, 1], [0, 0.25, -1],
                 [1, 0.35, 1], [1, 0.35, -1], [-1, 0.35, 1], [-1, 0.35, -1], [0.2, 1, 0.2]];

  function keyOfObject(o) {
    let p = o, part = null;
    while (p) {
      if (p.userData?.env) return null;
      if (!part && p.userData?.part) part = p.userData.part;
      if (p.userData?.sys) return part ? p.userData.sys + '/' + part : null;
      p = p.parent;
    }
    return null;
  }

  function partVisibility(key) {
    /* a part whose module is not on this car has nothing to say: its groups
       still exist, hidden, and their boxes are wherever they were left */
    const rec = systems[key.split('/')[0]];
    if (!rec || !rec.group.visible) return { known: false };
    const boxes = partBoxes(key);
    if (!boxes.length) return { known: false };

    /* every built, visible mesh, INCLUDING the ones a ghost has faded: what
       is in front of this part does not stop being in front of it because
       the reader selected something */
    const meshes = [];
    for (const rec of Object.values(systems)) {
      if (!rec.group.visible) continue;
      for (const o of rec.meshes) if (o.isMesh && o.visible) meshes.push(o);
    }
    if (!meshes.length) return { known: false };

    const blockers = {};
    let known = false;
    for (const box of boxes.slice(0, 2)) {
      box.getCenter(_rcC);
      for (const look of LOOKS) {
        _rcD.set(look[0], look[1], look[2]).normalize();
        _rcO.copy(_rcC).addScaledVector(_rcD, 14);
        _rcD.negate();
        _rc.set(_rcO, _rcD);

        /* sphere narrowing, the same test js/pick.js opens with */
        const near = [];
        for (const o of meshes) {
          const g = o.isInstancedMesh ? o : o.geometry;
          if (o.isInstancedMesh) { if (o.boundingSphere === null) o.computeBoundingSphere(); }
          else if (o.geometry.boundingSphere === null) o.geometry.computeBoundingSphere();
          const bs = o.isInstancedMesh ? o.boundingSphere : o.geometry.boundingSphere;
          if (!bs) continue;
          const e = o.matrixWorld.elements;
          const cx = e[0] * bs.center.x + e[4] * bs.center.y + e[8] * bs.center.z + e[12] - _rcO.x;
          const cy = e[1] * bs.center.x + e[5] * bs.center.y + e[9] * bs.center.z + e[13] - _rcO.y;
          const cz = e[2] * bs.center.x + e[6] * bs.center.y + e[10] * bs.center.z + e[14] - _rcO.z;
          const sc = Math.sqrt(Math.max(
            e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
            e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
            e[8] * e[8] + e[9] * e[9] + e[10] * e[10]));
          const rad = bs.radius * sc;
          const along = cx * _rcD.x + cy * _rcD.y + cz * _rcD.z;
          if (along < -rad) continue;
          const perp2 = cx * cx + cy * cy + cz * cz - along * along;
          if (perp2 > rad * rad) continue;
          near.push(o);
        }
        if (!near.length) continue;
        /* THE TREE, not intersectObjects. Stock raycasting tests every
           triangle of every candidate, and the merged body panels are ten
           thousand triangles each, which took a buried part to 273 ms of
           panel-open time. js/bvh.js is why picking is cheap and it is why
           this is: a few box tests per mesh and the triangles in the leaves
           the ray actually reaches. */
        let bestD = Infinity, bestKey = null;
        /* the section counts here for the same reason it counts in the picker:
           a surface the reader cannot see is not a surface that buries
           anything. Without it, cutting a body panel away to expose a part
           left the panel still reporting that part as buried BY THE THING THE
           READER HAD JUST REMOVED. Into the tree so it can return the nearest
           SURVIVING hit rather than the nearest one, and over the fallback's
           hits below because the stock raycaster pushes all of them. */
        const clip = clipTest();
        for (const o of near) {
          _rcHits.length = 0;
          _rcInv.copy(o.matrixWorld).invert();
          if (!bvhRaycast(o, _rc, _rcHits, bestD, _rcInv, clip)) o.raycast(_rc, _rcHits);
          for (const h of _rcHits) {
            if (h.distance >= bestD) continue;
            if (clip) {
              const org = _rc.ray.origin, dir = _rc.ray.direction;
              if (clip(org.x + dir.x * h.distance,
                       org.y + dir.y * h.distance,
                       org.z + dir.z * h.distance)) continue;
            }
            const k = keyOfObject(h.object);
            if (!k) continue;
            bestD = h.distance; bestKey = k;
          }
        }
        if (bestKey) {
          known = true;
          if (bestKey === key) return { known: true, visible: true, blockedBy: null };
          blockers[bestKey] = (blockers[bestKey] || 0) + 1;
        }
      }
    }
    if (!known) return { known: false };
    const worst = Object.entries(blockers).sort((a, b) => b[1] - a[1])[0];
    return { known: true, visible: false, blockedBy: worst ? worst[0] : null };
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
    setCut, getCut, vehicleBox, partBoxes, partVisibility,
    /* the closures a reader can open on the car in front of them, what they
       cost in space, and the switch. parkedBox is the car with everything
       shut, which is the only honest reference for a swing measurement and
       the figure the dimension read wants too. */
    closureList, setClosure, setAllClosures, closureMetrics, parkedBox,
    closureOpenCount: () => closureList().filter((c) => c.open).length,
    getPaint: () => paintHex,
    getPearl: () => ({ hex: pearlHex, amt: pearlAmt }),
    /* the UI asks these two before it offers a finish, so a part that is not
       sprayed in body color never gets a swatch row it cannot honor */
    isPainted: (key) => !!paintKeys[key],
    /* every part with a material of its own can take a tint, which is every
       part; the UI asks so it can label the control for what it does */
    isTintable: (key) => !!(partMats[key] && partMats[key].length),
    /* the color this part is wearing right now, for a control that has to
       show it: the override if it has one, the body color if it is a painted
       panel, otherwise the color its own largest material was born in */
    partColor: (key) => {
      if (key in paintOverride) return paintOverride[key];
      if (key in partTint) return partTint[key];
      if (paintKeys[key]) return paintHex;
      const list = partMats[key];
      if (!list || !list.length) return null;
      const m = list.reduce((a, b) =>
        ((b.userData.base0 || b.color).getHex() > 0 && !a ? b : a), null) || list[0];
      return (m.userData.base0 || m.color).getHex();
    },
    getPartPaint: (key) => (key in paintOverride ? paintOverride[key]
                            : (key in partTint ? partTint[key] : null)),
    partPaintCount: () => Object.keys(paintOverride).length + Object.keys(partTint).length,
    setSystemVisible: (sysId, on) => {
      const rec = systems[sysId];
      if (rec && rec.group.visible !== on) {
        rec.group.visible = on;
        invalidatePick();
        needShadow();   // a whole system appeared or went away
        needHover();
        /* THE CAR IS A DIFFERENT CAR NOW, so every closure measurement taken
           against it is stale. The parked half-width is the one that matters:
           it runs from 1.917 m on Gen 1 to 1.204 m on Gen 11, and a clearance
           measured against the wrong one would be wrong by the difference.
           A system going away also takes its own closures off the band, and
           shutting them first stops a door coming back open on a body that
           was swapped out from under it. */
        if (!on) {
          /* SHUT ITS CLOSURES, AND THEN PUT THE PARTS BACK, which is the half
             this used to miss and the reason a generation switch could leave
             a door in orbit.

             A closure contributes BOTH a rotation and a translation: the
             quaternion is the hinge and the position carries the pivot
             offset, `home + explode + (pivot - R*pivot)`. Zeroing the state
             and the quaternion here left the position exactly where the open
             door had put it, and nothing rewrote it: stepClosures only runs
             while something is traveling, and this has just made everything
             settled, so it returns immediately and applyExplode never fires.
             Switch away from a rung mid-animation and back, and its panels
             come back translated but not rotated, which is a door sitting a
             quarter of a meter off the car. Measured on Gen 1: door-front
             returns at position (-0.175, 0, 0.257) with an identity
             quaternion.

             applyExplode is the one function that owns where a part sits, so
             the fix is to let it do that rather than to patch a field here. */
          let shut = false;
          for (const r of Object.values(closures)) {
            if (r.sysId !== sysId) continue;
            if (r.to !== 0 || r.u !== 0 || r.at !== 0) shut = true;
            r.to = 0; r.u = 0; r.at = 0;
          }
          if (shut) applyExplode();
        }
        closureSig++;
      }
    },
    addSystem,
    hasSystem: (sysId) => !!systems[sysId],
    flyHome: () => select(null),
    /* where the camera is standing, which is what decides the half a section
       takes out; a copy, so a caller cannot move the camera by writing to it */
    cameraPos: () => ({ x: camera.position.x, y: camera.position.y, z: camera.position.z }),
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
       0.1 ms clock quantization of a single call. */
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
    probePick: (cx, cy, budgeted = true, coreOnly = false) => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return null;
      const keepX = pointer.x, keepY = pointer.y, keepHas = hasPointer;
      pointer.set((cx / r.width) * 2 - 1, -(cy / r.height) * 2 + 1);
      hasPointer = true;
      const k = hitTest(budgeted, coreOnly);
      pointer.set(keepX, keepY);
      hasPointer = keepHas;
      return k;
    },
    step: (dt = 0.016) => update(dt),
    view: (pos, tgt, ms = 900) => flyTo(new THREE.Vector3(...pos), new THREE.Vector3(...tgt), ms),
    /* An arbitrary world point in CSS pixels, for anything that has to draw
       ON the scene without being in it. labelFor below answers the same
       question for a part; this one takes coordinates, which is what a
       dimension line between two points nobody has modeled needs.
       `behind` rather than null: a dimension with one end behind the camera
       still has a visible end, and the caller decides what to do about it. */
    /* viewW and viewH, never getBoundingClientRect: this runs several times
       per frame inside main.js's tag loop, and that loop carries a long note
       about what a layout read costs there. resize() already keeps the CSS
       size of the canvas, which is the same number. */
    project: (x, y, z) => {
      const v = _prj.set(x, y, z).project(camera);
      return { x: (v.x * 0.5 + 0.5) * viewW, y: (-v.y * 0.5 + 0.5) * viewH, behind: v.z > 1 };
    },
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
      if (warmT2) { clearTimeout(warmT2); warmT2 = null; }
    },
  };

  function tick(now) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
  }

  /* One simulation + render step. Kept callable (api.step) so behavior can
     be tested deterministically even when the tab is hidden and RAF pauses. */
  function update(dt) {
    const now = performance.now();
    resize();

    if (fly) {
      /* A duration of zero means ARRIVE, and it has to be said here rather
         than left to the arithmetic. (now - t0) / 0 is Infinity once the
         clock has moved, which lands on 1 and is harmless, but it is 0/0
         when it has NOT moved, and performance.now() is coarsened enough
         that a view() and the update() after it routinely read the same
         value. Math.min(1, NaN) is NaN, lerping by NaN puts NaN in the
         camera, and `k >= 1` is FALSE for NaN, so the fly is never cleared
         and every frame after it recomputes the same NaN from the same
         spec. One call therefore killed the renderer for the life of the
         page: the reflection pass throws on the NaN matrices, and there is
         no way back, because flyHome and a fresh view both interpolate FROM
         the poisoned spherical.

         Nothing in the product passes 0 (the tour uses 1200, home 900, the
         default is 1050), so no reader could reach it. view() is on
         window.__ev precisely so a verification pass can drive the camera,
         and 0 is the obvious way to ask for no animation, so the hazard sat
         on the surface this project tests itself through. */
      const k = fly.ms > 0 ? Math.min(1, (now - fly.t0) / fly.ms) : 1;
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

    /* a closure mid-travel moves geometry, so it goes through applyExplode
       for the same reason the slider does: that is the function that owns
       where a part sits, and it already asks for the shadow and the hover */
    if (stepClosures(dt)) { applyExplode(); needFrame(); }

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
    if (autoRotate && !REDUCED && idleT > 7 && !drag && !fly && !selected && !focusSys) {
      sph.theta += dt * 0.055;
      applyCam();
    }

    /* Hover only when something that could change it has moved. Nothing
       decrements while a drag is in flight, so the recompute a drag earned
       is still owed when the button comes up. */
    /* A NAMING HOLD IS A HOVER, so it recomputes while the finger is down.
       Everything else waits for the drag to end, which is what keeps a spin
       of the car from raycasting on every move event. */
    if ((!drag || naming) && hoverPending > 0) {
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
