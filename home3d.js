// The approach. The universe model's deep flight lifted whole as this
// portfolio's homepage: the same renderer and bloom pipeline, the same star
// shader and chunked galactic star field with its exact color law, the same
// WRAITH ship, fill light, flight stick and throttle grammar.
// Three doors hang in this sky, on three bearings from the parked ship: the
// PORTAL dead ahead, whose aperture is a window onto another sky, and a RIFT
// off each wingtip, which draw nothing at all and only bend the starlight
// already behind them. Fly through a door, or hold X and cut your way in.
// You spawn 300 parsecs short of the galactic centre, nose on it, at rest.
// Bring the cursor to the centre to arm the stick; hold click to thrust.
// The SVG landing below remains the no-WebGL fallback, and the DOM stays
// accessible.
import * as THREE from './vendor/three.module.js';

const host = document.querySelector('.landing-planet');
const svg = host && host.querySelector('svg');

// Falling back has to be loud and immediate. A throw anywhere in init used
// to leave the veil up for four seconds of black and then reveal the flat
// page with no explanation, and a throw inside the frame loop was worse:
// world-on had already hidden the flat page by CSS, so the visitor kept a
// frozen canvas forever with a working site two nodes away in the DOM.
function fallBack(err) {
  console.error('[home3d] the world failed to run; showing the flat page', err);
  document.body.classList.remove('world-on');
  document.documentElement.classList.remove('pre3d');
  if (svg) { svg.style.display = ''; svg.removeAttribute('aria-hidden'); }
  document.querySelectorAll('.home3d-chrome').forEach((n) => n.remove());
  const c = document.querySelector('canvas');
  if (c && c.parentNode === document.body) c.remove();
}

if (svg) {
  try { init(); } catch (e) { fallBack(e); }
}

function init() {
  // A flight is motion by definition, and every way out of this scene runs
  // through moving the ship: thrust, capture and the beam were all gated on
  // !reduced, which left anyone who asked the OS for less motion parked in
  // a sky they could not steer, reading a caption of controls that did
  // nothing. They get the flat landing instead, which reaches all three
  // case studies in one click and never moves on its own.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.remove('pre3d');
    return;
  }
  // ---- renderer (universe-model, verbatim) ---------------------------------
  let renderer;
  try {
    // The default framebuffer only ever receives one untextured full-screen
    // quad from the post chain, so multisampling it and keeping it readable
    // bought nothing and cost a lot of memory. rtScene carries samples: 4,
    // which is where the antialiasing actually happens, and nothing reads
    // pixels back, so the preserved buffer had no reader either.
    renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: false });
  } catch (e) {
    document.documentElement.classList.remove('pre3d');
    return;
  }
  const MAX_PIXEL_RATIO = matchMedia('(pointer: coarse)').matches ? 1.75 : 2;
  // ?touch forces the touch UI on: the audit pane cannot emulate the
  // media query, and without this the touch branch is unverifiable here
  const TOUCH_UI = matchMedia('(hover: none) and (pointer: coarse)').matches
    || new URLSearchParams(location.search).has('touch');
  renderer.setPixelRatio(Math.min(devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.setSize(innerWidth, innerHeight);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DEG = Math.PI / 180;

  function makeDiscTexture(inner, outer, edge = 0.5) {
    const s = 64, c = document.createElement('canvas');
    c.width = c.height = s;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, inner);
    g.addColorStop(edge, outer);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const t = new THREE.CanvasTexture(c);
    t.minFilter = THREE.LinearFilter;
    return t;
  }

  // ---- post-processing: the additive bloom, verbatim -----------------------
  const POST = (() => {
    const _v2 = new THREE.Vector2();
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const mkRT = (w, h, o = {}) => new THREE.WebGLRenderTarget(
      Math.max(1, Math.floor(w)), Math.max(1, Math.floor(h)),
      { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, type: THREE.UnsignedByteType, depthBuffer: false, ...o });

    const rtScene = mkRT(size.x, size.y, { samples: 4, depthBuffer: true });
    rtScene.texture.colorSpace = THREE.SRGBColorSpace;
    const rtA = mkRT(size.x / 2, size.y / 2);
    const rtB = mkRT(size.x / 2, size.y / 2);
    const rtWarp = mkRT(size.x, size.y);             // the sky after the rifts bend it
    rtWarp.texture.colorSpace = THREE.SRGBColorSpace;

    const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quadScene = new THREE.Scene();
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), null);
    quad.frustumCulled = false; quadScene.add(quad);
    const VS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

    const brightMat = new THREE.ShaderMaterial({
      uniforms: { tScene: { value: null }, uThresh: { value: 0.62 }, uKnee: { value: 0.22 } },
      vertexShader: VS, depthTest: false, depthWrite: false,
      fragmentShader: `precision highp float; varying vec2 vUv;
        uniform sampler2D tScene; uniform float uThresh, uKnee;
        void main(){
          vec3 c = texture2D(tScene, vUv).rgb;
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          float w = smoothstep(uThresh - uKnee, uThresh + uKnee, l);
          gl_FragColor = vec4(c * w, 1.0);
        }`,
    });
    const blurMat = new THREE.ShaderMaterial({
      uniforms: { tInput: { value: null }, uDir: { value: new THREE.Vector2() } },
      vertexShader: VS, depthTest: false, depthWrite: false,
      fragmentShader: `precision highp float; varying vec2 vUv;
        uniform sampler2D tInput; uniform vec2 uDir;
        void main(){
          float w0=0.227027, w1=0.1945946, w2=0.1216216, w3=0.054054, w4=0.016216;
          vec3 s = texture2D(tInput, vUv).rgb * w0;
          s += (texture2D(tInput, vUv + uDir*1.0).rgb + texture2D(tInput, vUv - uDir*1.0).rgb) * w1;
          s += (texture2D(tInput, vUv + uDir*2.0).rgb + texture2D(tInput, vUv - uDir*2.0).rgb) * w2;
          s += (texture2D(tInput, vUv + uDir*3.0).rgb + texture2D(tInput, vUv - uDir*3.0).rgb) * w3;
          s += (texture2D(tInput, vUv + uDir*4.0).rgb + texture2D(tInput, vUv - uDir*4.0).rgb) * w4;
          gl_FragColor = vec4(s, 1.0);
        }`,
    });
    const compMat = new THREE.ShaderMaterial({
      uniforms: { tScene: { value: null }, tBloom: { value: null }, uStrength: { value: 0.85 } },
      vertexShader: VS, depthTest: false, depthWrite: false,
      fragmentShader: `precision highp float; varying vec2 vUv;
        uniform sampler2D tScene, tBloom; uniform float uStrength;
        void main(){
          vec3 base  = texture2D(tScene, vUv).rgb;
          vec3 bloom = texture2D(tBloom, vUv).rgb;
          gl_FragColor = vec4(base + bloom * uStrength, 1.0);
        }`,
    });

    // the rifts: a pure deflection of what was already on screen. Each is
    // (x, y, influence radius, einstein radius) in uv, with x measured in
    // aspect corrected units so a rift stays round on any pane. Light that
    // passes near one is pulled inward, so background stars swing out into
    // arcs and the sky closes over a hole that holds nothing
    const riftMat = new THREE.ShaderMaterial({
      uniforms: { tScene: { value: null }, uAspect: { value: 1 },
        uR0: { value: new THREE.Vector4() }, uR1: { value: new THREE.Vector4() },
        uS0: { value: new THREE.Vector4() }, uS1: { value: new THREE.Vector4() } },
      vertexShader: VS, depthTest: false, depthWrite: false,
      fragmentShader: `precision highp float; varying vec2 vUv;
        uniform sampler2D tScene; uniform float uAspect;
        uniform vec4 uR0, uR1;                       // x, y, reach, einstein radius
        uniform vec4 uS0, uS1;                       // cos, sin, squash, spare
        // returns the place to sample from, and how much brighter it comes
        // back. A lens does not only bend light, it concentrates it: that
        // gain is what turns a smear into an arc you can actually see, and
        // it spends no colour of its own, only the sky's
        vec3 bend(vec2 uv, vec4 R, vec4 S) {
          if (R.z <= 0.0) return vec3(uv, 1.0);
          vec2 d = vec2((uv.x - R.x) * uAspect, uv.y - R.y);
          // into the tear's own frame, then squeezed across it: the field is
          // a slit, not a disc, so the sky is drawn to a line and not a ring
          vec2 e = vec2(d.x * S.x + d.y * S.y, -d.x * S.y + d.y * S.x);
          e.x *= S.z;
          float r = length(e);
          if (r > R.z || r < 1e-5) return vec3(uv, 1.0);
          float defl = (R.w * R.w) / max(r, R.w * 0.6);
          float k = smoothstep(R.z, R.z * 0.25, r);
          float rr = max(r * 0.04, r - defl * k);
          vec2 nd = e / r * rr;
          nd.x /= S.z;
          d = vec2(nd.x * S.x - nd.y * S.y, nd.x * S.y + nd.y * S.x);
          // the critical curve, where a lens piles the most light
          float mag = 1.0 + 3.4 * exp(-pow((r - R.w * 1.25) / (R.w * 0.62), 2.0)) * k;
          return vec3(R.x + d.x / uAspect, R.y + d.y, mag);
        }
        void main() {
          vec3 a = bend(vUv, uR0, uS0);
          vec3 b = bend(a.xy, uR1, uS1);
          // a rift near the edge can bend a sample off the texture, where
          // clamp-to-edge would smear the border pixels across a whole band
          vec2 s = clamp(b.xy, vec2(0.0), vec2(1.0));
          gl_FragColor = vec4(texture2D(tScene, s).rgb * (a.z * b.z), 1.0);
        }`,
    });

    const drawQuad = (mat) => { quad.material = mat; renderer.render(quadScene, quadCam); };

    function resize() {
      const s = renderer.getDrawingBufferSize(_v2);
      rtScene.setSize(s.x, s.y);
      rtWarp.setSize(s.x, s.y);
      rtA.setSize(Math.max(1, Math.floor(s.x / 2)), Math.max(1, Math.floor(s.y / 2)));
      rtB.setSize(Math.max(1, Math.floor(s.x / 2)), Math.max(1, Math.floor(s.y / 2)));
    }
    // called each frame with whatever rifts are on screen, or nothing
    function setRifts(a, b, sa, sb) {
      riftMat.uniforms.uR0.value.copy(a);
      riftMat.uniforms.uR1.value.copy(b);
      riftMat.uniforms.uS0.value.copy(sa);
      riftMat.uniforms.uS1.value.copy(sb);
    }
    function present(scene, cam) {
      const s = renderer.getDrawingBufferSize(_v2);
      renderer.setRenderTarget(rtScene); renderer.render(scene, cam);
      // bend the sky before anything else looks at it, so the bloom blooms
      // the arcs and not the straight stars they used to be
      let src = rtScene.texture;
      if (riftMat.uniforms.uR0.value.z > 0 || riftMat.uniforms.uR1.value.z > 0) {
        riftMat.uniforms.tScene.value = rtScene.texture;
        riftMat.uniforms.uAspect.value = s.x / Math.max(1, s.y);
        renderer.setRenderTarget(rtWarp); drawQuad(riftMat);
        src = rtWarp.texture;
      }
      brightMat.uniforms.tScene.value = src;
      renderer.setRenderTarget(rtA); drawQuad(brightMat);
      const hx = 2.0 / s.x, hy = 2.0 / s.y;
      for (let i = 0; i < 2; i++) {
        const sp = i + 1;
        blurMat.uniforms.tInput.value = rtA.texture; blurMat.uniforms.uDir.value.set(hx * sp, 0);
        renderer.setRenderTarget(rtB); drawQuad(blurMat);
        blurMat.uniforms.tInput.value = rtB.texture; blurMat.uniforms.uDir.value.set(0, hy * sp);
        renderer.setRenderTarget(rtA); drawQuad(blurMat);
      }
      compMat.uniforms.tScene.value = src;
      compMat.uniforms.tBloom.value = rtA.texture;
      renderer.setRenderTarget(null); drawQuad(compMat);
    }
    return { present, resize, setRifts };
  })();

  // ---- the deep continuum (verbatim constants and scene) -------------------
  const GC_PC = new THREE.Vector3(8200, -20, 0);     // Sgr A*, heliocentric pc
  const R_SUN_GAL = 8200, R_DISK = 2500, H_DISK = 300;
  const DEEP_PCPERSEC = 10;                          // base thrust, hotter than the app's 4
  const CHUNK_L = 400, CHUNK_RAD = 2, CHUNK_CAP = 6000, CHUNK_BASE = 2400, CHUNK_BUDGET = 48;

  const deepScene = new THREE.Scene();
  deepScene.background = new THREE.Color(0x02030a);
  const deepCam = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.02, 2e7);
  const deepFillLight = new THREE.PointLight(0xd8eaff, 2.2, 0);
  deepScene.add(deepFillLight);
  // a whisper of light from below: the app never let you orbit under the
  // ship, but the observer's seat does, and pure shadow hides the plating
  const underFill = new THREE.PointLight(0xd8eaff, 0.7, 0);
  deepScene.add(underFill);

  // the star shader, verbatim (shared by every chunk)
  const neiUniforms = { uScale: { value: 1.0 }, uPR: { value: Math.min(devicePixelRatio, MAX_PIXEL_RATIO) } };
  const deepStarMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: neiUniforms,
    vertexShader: `
      uniform float uScale, uPR;
      attribute float aL;
      attribute vec3 aColor;
      varying vec3 vC; varying float vA;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float s = uScale * aL * 52.0 / max(1.0, -mv.z);
        gl_PointSize = clamp(s, 1.3, 20.0) * uPR;
        vC = aColor;
        vA = clamp(s * 0.5, 0.1, 0.95);
      }`,
    fragmentShader: `
      varying vec3 vC; varying float vA;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float dd = length(uv) * 2.0;
        if (dd > 1.0) discard;
        float f = smoothstep(1.0, 0.0, dd);
        gl_FragColor = vec4(vC, vA * f * f);
      }`,
  });

  // Sgr A*, gone all in: a depth writing black core, a camera facing quad
  // carrying a gravitationally lensed accretion disk, and the warm glow kept
  // so the approach still reads amber from 300 pc out
  const BH_SHADOW = 12;    // pc per shader unit: the aperture's on screen radius
  const BH_SPAN = 4.0;     // shader units to the quad edge, mirrors SPAN below
  const BH_OFF = 14;       // the quad slides this far toward the camera, clear
                           // of the core and behind the bolts (they die at 20)
  const _bhToCam = new THREE.Vector3();
  let bhQuad, bhMat;
  const deepGC = new THREE.Group();
  {
    // the core still writes depth, so stars behind the hole stay eaten no
    // matter how the transparent pass sorts; held just under the painted
    // shadow so its limb never pokes past the shader edge up close
    const shadow = new THREE.Mesh(new THREE.SphereGeometry(9.5, 48, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000 }));
    deepGC.add(shadow);
    // the lensed disk impostor: an analytic two image bend, not a raymarch.
    // units inside: the shadow radius is 1 (about 2.6 GM/c2), the photon
    // ring lives at b = 1, the disk runs 2.9 to 9. the bottom half sees the
    // near side ride in front of the shadow; strongly bent rays fold the
    // far side into the arcs above and below. uT frozen honours reduced.
    bhMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, premultipliedAlpha: true,
      uniforms: { uT: { value: 0 }, uNear: { value: 0 },
        uHeat: { value: 0 }, uOpen: { value: 0 } },
      vertexShader: `
        varying vec2 vP;
        void main() {
          vP = position.xy;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        precision highp float;
        varying vec2 vP;
        uniform float uT;
        uniform float uNear;                                   // 0 far out, 1 at the lip
        uniform float uHeat;                                   // builds under fire, cools when it stops
        uniform float uOpen;                                   // 0 whole, 1 about to give
        const float SPAN  = 4.0;       // quad edge, in aperture radii
        float h21(vec2 q) { return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453); }
        // what waits on the other side. The aperture is not a hole but a
        // window: the destination's own sky, fisheyed so its whole half
        // dome squeezes into the disc and piles up against the rim, wound
        // slowly around the throat. Cool on purpose, so the warm rim reads
        // as this side of the door and the blue as somewhere else
        vec3 otherSky(vec2 pp, float rr) {
          float th = atan(pp.y, pp.x);
          float k = 1.0 / max(0.10, 1.0 - rr * rr);            // the rim holds infinity
          float wind = uT * (0.045 + 0.20 * uOpen) * k;        // the throat turns, faster as it gives
          vec2 q = vec2(cos(th + wind), sin(th + wind)) * rr * k * 0.75;
          vec3 col = vec3(0.004, 0.006, 0.012);                // night, and nothing else
          // four shells of stars, each finer than the last. No nebula, no
          // cast of colour: through a door you see a sky, and a sky is stars
          // each shell walks its own cell and the eight around it, so a star
          // sitting near a boundary spills into the neighbour instead of
          // being sliced off at it. Sampling only the home cell drew a
          // visible lattice of half stars across the whole aperture
          for (int i = 0; i < 4; i++) {
            vec2 g = q * (22.0 * pow(2.0, float(i)));
            vec2 gi = floor(g), gf = fract(g);
            for (int oy = -1; oy <= 1; oy++) {
              for (int ox = -1; ox <= 1; ox++) {
                vec2 o = vec2(float(ox), float(oy));
                vec2 cell = gi + o;
                float h = h21(cell + float(i) * 37.0);
                if (h > 0.86) {
                  vec2 c = o + vec2(h21(cell + 5.1), h21(cell + 9.7));
                  float d = length(gf - c);
                  vec3 tint = mix(vec3(0.74, 0.84, 1.0), vec3(1.0, 0.93, 0.84), h21(cell + 17.3));
                  col += tint * exp(-d * d * 160.0) * (h - 0.86) * 13.0;
                }
              }
            }
          }
          return col;
        }
        void main() {
          vec2 p = vP * SPAN;
          float b = length(p);
          vec3 rgb = vec3(0.0);
          float a = 0.0;
          if (b <= 1.0) {
            // the aperture: somewhere else, brightening as the ship closes.
            // heat makes the view through it swim, the way air does over a fire
            float shim = 1.0 + 0.035 * uHeat * sin(b * 26.0 + uT * 7.0);
            rgb = otherSky(p, clamp(b * shim, 0.0, 0.999)) * mix(0.5, 1.4, uNear);
            a = 1.0;                                           // and it still eats this sky
          }
          // the rim: one even ring of light around the doorway. Nothing is
          // orbiting here, so nothing beams: the thickness is the same the
          // whole way round, which is what makes it read as built.
          // Under the beam it heats like worked metal, amber to orange to
          // white, swelling as it goes, and cools again when the gun stops
          vec3 rimC = vec3(1.0, 0.87, 0.64);                   // resting amber
          rimC = mix(rimC, vec3(1.0, 0.55, 0.16), clamp(uHeat * 2.0, 0.0, 1.0));
          rimC = mix(rimC, vec3(1.0, 0.98, 0.94), clamp(uHeat * 1.7 - 0.55, 0.0, 1.0));
          // A band with real weight to it. Two knobs decide how thick this
          // reads: the gaussian width (lower divisor = wider) and the
          // brightness, because the bloom pass spreads whatever is bright.
          // 26 read as a hairline and 19 was still thin; 12 with the glow
          // back up is a rim you can see from across the sky.
          float pr = exp(-pow((b - 1.0) * (12.0 - 3.5 * uOpen - 3.0 * uHeat), 2.0));
          float rimG = pr * (1.5 + 0.45 * uNear + 2.4 * uHeat + 1.3 * uOpen);
          rgb += rimC * rimG;
          // this material is premultiplied, so colour must not outrun alpha
          // or the heat ramp clips to flat white before it ever reads orange
          a = max(a, clamp(rimG, 0.0, 1.0));
          // the heat soaks inward past the lip and hazes outward, no edges
          float bleed = smoothstep(0.5, 1.0, b) * step(b, 1.0);
          rgb += rimC * bleed * uHeat * 0.55;
          float haze = exp(-pow((b - 1.0) * 2.6, 2.0)) * step(1.0, b);
          rgb += rimC * haze * uHeat * 0.30;
          a = max(a, haze * uHeat * 0.30);
          // a whisper of dragged starlight just outside the rim
          float halo = exp(-pow((b - 1.0) * 2.4, 2.0)) * step(1.0, b);
          rgb += vec3(0.95, 0.78, 0.55) * halo * 0.10;
          a = max(a, halo * 0.10);
          float fade = 1.0 - smoothstep(SPAN * 0.55, SPAN * 0.85, b);
          gl_FragColor = vec4(rgb * fade, a * fade);
        }`,
    });
    bhQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bhMat);
    bhQuad.frustumCulled = false;
    deepGC.add(bhQuad);
  }
  deepGC.visible = false;
  deepScene.add(deepGC);

  // ---- chunked galactic star field (verbatim) ------------------------------
  const chunkMap = new Map();
  const _chunkPending = new Set();
  const _chunkGenQueue = [];
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function chunkHash(ix, iy, iz) { return ((ix * 73856093) ^ (iy * 19349663) ^ (iz * 83492791)) >>> 0; }
  function chunkDensity(x, y, z) {
    const rx = x - GC_PC.x, ry = y - GC_PC.y, rz = z - GC_PC.z;
    const R = Math.hypot(rx, rz), zh = Math.abs(ry);
    let df = Math.exp(-(R - R_SUN_GAL) / R_DISK) * Math.exp(-zh / H_DISK);
    if (R < 3500) df += 1.8 * Math.exp(-(R * R) / (2 * 1500 * 1500)) * Math.exp(-zh / 520);
    const th = Math.atan2(-rz, rx);
    const arm = Math.cos(2 * (th - Math.log(Math.max(R, 500) / 3300) / Math.tan(12.5 * DEG)));
    return df * (1 + 0.6 * Math.max(0, arm));
  }
  function buildChunk(ix, iy, iz) {
    const key = ix + ',' + iy + ',' + iz;
    const ox = ix * CHUNK_L, oy = iy * CHUNK_L, oz = iz * CHUNK_L;
    const ccx = ox + CHUNK_L / 2, ccy = oy + CHUNK_L / 2, ccz = oz + CHUNK_L / 2;
    let df = chunkDensity(ccx, ccy, ccz);
    const dSun = Math.hypot(ccx, ccy, ccz);
    df *= Math.min(1, Math.max(0, (dSun - 300) / 600));
    const n = Math.min(CHUNK_CAP, Math.round(CHUNK_BASE * df));
    if (n <= 0) { chunkMap.set(key, null); return; }
    const rng = mulberry32(chunkHash(ix, iy, iz));
    const pos = new Float32Array(n * 3), lum = new Float32Array(n), col = new Float32Array(n * 3);
    for (let k = 0; k < n; k++) {
      pos[k * 3] = rng() * CHUNK_L; pos[k * 3 + 1] = rng() * CHUNK_L; pos[k * 3 + 2] = rng() * CHUNK_L;
      const pick = rng(); let r, g, b, s;
      if (pick < 0.06) { r = 1.0; g = 0.55; b = 0.78; s = 0.10; }           // HII pink
      else if (pick < 0.30) { r = 0.65; g = 0.78; b = 1.0; s = 0.06; }      // OB blue
      else if (pick < 0.55) { r = 1.0; g = 0.96; b = 0.88; s = 0.045; }     // white
      else if (pick < 0.78) { r = 1.0; g = 0.88; b = 0.72; s = 0.04; }      // yellow
      else if (pick < 0.93) { r = 1.0; g = 0.75; b = 0.50; s = 0.038; }     // orange
      else { r = 0.95; g = 0.40; b = 0.22; s = 0.09; }                      // red giant
      lum[k] = s * 300; col[k * 3] = r; col[k * 3 + 1] = g; col[k * 3 + 2] = b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aL', new THREE.BufferAttribute(lum, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    const pts = new THREE.Points(geo, deepStarMat);
    // culling stays ON: every chunk is repositioned before the render, so
    // its bounding sphere is honest, and drawing all 125 of them regardless
    // of where the nose points was a few hundred thousand wasted vertices
    // a frame. buildChunk fills the buffer, so compute the sphere once here
    geo.computeBoundingSphere();
    pts.userData.originAbs = [ox, oy, oz];
    deepScene.add(pts);
    chunkMap.set(key, pts);
  }
  function streamChunks() {
    const L = CHUNK_L;
    const cix = Math.floor(deep.pos.x / L), ciy = Math.floor(deep.pos.y / L), ciz = Math.floor(deep.pos.z / L);
    for (let dx = -CHUNK_RAD; dx <= CHUNK_RAD; dx++)
      for (let dy = -CHUNK_RAD; dy <= CHUNK_RAD; dy++)
        for (let dz = -CHUNK_RAD; dz <= CHUNK_RAD; dz++) {
          const key = (cix + dx) + ',' + (ciy + dy) + ',' + (ciz + dz);
          if (!chunkMap.has(key) && !_chunkPending.has(key)) { _chunkPending.add(key); _chunkGenQueue.push([cix + dx, ciy + dy, ciz + dz]); }
        }
    let budget = CHUNK_BUDGET;
    while (budget-- > 0 && _chunkGenQueue.length) {
      const [ix, iy, iz] = _chunkGenQueue.shift();
      _chunkPending.delete(ix + ',' + iy + ',' + iz);
      buildChunk(ix, iy, iz);
    }
    for (const [key, pts] of chunkMap) {
      const p = key.split(',');
      if (Math.abs(+p[0] - cix) > CHUNK_RAD + 1 || Math.abs(+p[1] - ciy) > CHUNK_RAD + 1 || Math.abs(+p[2] - ciz) > CHUNK_RAD + 1) {
        if (pts) { deepScene.remove(pts); pts.geometry.dispose(); }
        chunkMap.delete(key);
      } else if (pts) {
        const o = pts.userData.originAbs;
        pts.position.set(o[0] - deep.pos.x, o[1] - deep.pos.y, o[2] - deep.pos.z);
      }
    }
  }

  // ---- the WRAITH, verbatim ------------------------------------------------
  const SHIP_FWD = new THREE.Vector3(0, 0, 1);
  const shipModel = (() => {
    const g = new THREE.Group();
    const M = (hex, o = {}) => new THREE.MeshStandardMaterial({
      color: hex, metalness: o.m ?? 0.76, roughness: o.r ?? 0.40,
      emissive: new THREE.Color(o.e ?? 0x000000), emissiveIntensity: o.ei ?? 0,
      side: o.side ?? THREE.FrontSide, flatShading: o.flat ?? true,
    });
    const SKIN = M(0x3a445a, { m: 0.68, r: 0.44, e: 0x2a3450, ei: 0.62 });
    const SKIN2 = M(0x48546e, { m: 0.70, r: 0.50, e: 0x303c58, ei: 0.56 });
    const TITAN = M(0xe3e9f2, { m: 0.92, r: 0.20, e: 0x3a4666, ei: 0.55 });
    const STEEL = M(0x56637e, { m: 0.78, r: 0.36, e: 0x323e5c, ei: 0.5 });
    const FACET = M(0x38425a, { m: 0.36, r: 0.68, e: 0x28324a, ei: 0.5 });
    const DARK = M(0x242c40, { m: 0.58, r: 0.62, e: 0x161e30, ei: 0.42 });
    const CARBON = M(0x1e2432, { m: 0.38, r: 0.76, e: 0x121724, ei: 0.36 });
    const GOLD = M(0xc79a48, { m: 0.90, r: 0.26, e: 0x2e2008, ei: 0.30 });
    const ACCENT = M(0x0e2440, { m: 0.30, r: 0.40, e: 0x4f9fff, ei: 3.20 });
    const GLOW_C = M(0x0a1c30, { m: 0.00, r: 0.50, e: 0x86c2ff, ei: 5.20, flat: false });
    const GLOW_W = M(0x141a28, { m: 0.00, r: 1.00, e: 0xdcecff, ei: 5.40, flat: false });
    const GLOW_O = M(0x180800, { m: 0.00, r: 0.80, e: 0xff5a14, ei: 3.20, flat: false });
    const GLASS = M(0x0a1220, { m: 0.22, r: 0.12, e: 0x3a86e0, ei: 0.60, flat: false });
    const RED_L = new THREE.MeshBasicMaterial({ color: 0xff2828 });
    const GRN_L = new THREE.MeshBasicMaterial({ color: 0x28ff66 });

    // plating: a near-white panel map (the material color supplies the hue)
    // with seam lines, per-panel tonal drift, rivets and faint wear, doubling
    // as a bump map so the seams catch the fill light up close
    const mkPlateTex = (repeat) => {
      const s = 512, pcv = document.createElement('canvas');
      pcv.width = pcv.height = s;
      const g = pcv.getContext('2d');
      g.fillStyle = '#c9cdd6'; g.fillRect(0, 0, s, s);
      let y = 0;
      while (y < s) {
        const ph = 26 + Math.random() * 46;
        let x = -Math.random() * 30;
        while (x < s) {
          const pw = 34 + Math.random() * 68;
          const v = (198 + Math.random() * 26) | 0;
          g.fillStyle = `rgb(${v},${v + 2},${v + 7})`;
          g.fillRect(x, y, pw, ph);
          g.strokeStyle = 'rgba(64,72,92,0.55)';
          g.lineWidth = 1.4;
          g.strokeRect(x + 0.5, y + 0.5, pw, ph);
          if (Math.random() < 0.4) {                 // rivets in the corners
            g.fillStyle = 'rgba(64,72,92,0.6)';
            for (const [rx, ry] of [[x + 5, y + 5], [x + pw - 5, y + 5], [x + 5, y + ph - 5], [x + pw - 5, y + ph - 5]]) {
              g.beginPath(); g.arc(rx, ry, 1.4, 0, Math.PI * 2); g.fill();
            }
          }
          if (Math.random() < 0.18) {                // an access hatch
            g.fillStyle = 'rgba(120,128,146,0.5)';
            g.fillRect(x + pw * 0.25, y + ph * 0.25, pw * 0.5, ph * 0.5);
            g.strokeRect(x + pw * 0.25, y + ph * 0.25, pw * 0.5, ph * 0.5);
          }
          x += pw;
        }
        y += ph;
      }
      for (let i = 0; i < 60; i++) {                 // faint streaks of wear
        g.strokeStyle = `rgba(${Math.random() < 0.5 ? '235,238,244' : '96,104,124'},${(0.05 + Math.random() * 0.09).toFixed(2)})`;
        g.lineWidth = 0.8;
        const wx = Math.random() * s, wy = Math.random() * s, wl = 14 + Math.random() * 60;
        g.beginPath(); g.moveTo(wx, wy); g.lineTo(wx + wl, wy + (Math.random() - 0.5) * 6); g.stroke();
      }
      const t = new THREE.CanvasTexture(pcv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(repeat, repeat);
      t.anisotropy = 8;
      return t;
    };
    // One paint, eight materials. A clone shares its source image, so this
    // uploads a single 512 canvas instead of eight (about 7 MB of VRAM and
    // as much retained canvas RAM back, which is real money on a phone)
    // while each material still carries its own repeat.
    const plateBase = mkPlateTex(1);
    for (const [mat, rep, bump] of [[SKIN, 1, 0.012], [SKIN2, 1.6, 0.01], [STEEL, 2.4, 0.008],
      [FACET, 2, 0.008], [DARK, 2.2, 0.006], [CARBON, 2, 0.006], [TITAN, 3, 0.006], [GOLD, 2.5, 0.006]]) {
      const t = rep === 1 ? plateBase : plateBase.clone();
      t.repeat.set(rep, rep);
      t.needsUpdate = true;
      mat.map = t;
      mat.bumpMap = t;
      mat.bumpScale = bump;
      // the plating rides the emissive floor too, so the shadowed belly
      // shows panels instead of one flat self-lit tone
      mat.emissiveMap = t;
      mat.needsUpdate = true;
    }
    // the throats and heat halos burn unevenly, like metal, not poster ink
    const mkHeatTex = () => {
      const s = 256, hc = document.createElement('canvas');
      hc.width = hc.height = s;
      const g = hc.getContext('2d');
      g.fillStyle = '#dcdcdc'; g.fillRect(0, 0, s, s);
      for (let i = 0; i < 1100; i++) {
        const v = (150 + Math.random() * 105) | 0;
        g.fillStyle = `rgba(${v},${v},${v},0.55)`;
        g.fillRect(Math.random() * s, Math.random() * s, 1 + Math.random() * 2.5, 6 + Math.random() * 22);
      }
      const t = new THREE.CanvasTexture(hc);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      return t;
    };
    const heat = mkHeatTex();
    for (const mat of [GLOW_O, GLOW_W, GLOW_C, ACCENT]) {
      mat.map = heat;
      mat.emissiveMap = heat;
      mat.needsUpdate = true;
    }

    const cyl = (rt, rb, h, s = 8, hs = 1, op = false) => new THREE.CylinderGeometry(rt, rb, h, s, hs, op);
    const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
    const cone = (r, h, s = 6) => new THREE.ConeGeometry(r, h, s);
    const sph = (r, ws = 10, hs = 8) => new THREE.SphereGeometry(r, ws, hs);
    const PI2 = Math.PI / 2;
    const add = (geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
      g.add(m); return m;
    };
    const loft = (cs, stations, mat) => {
      // UVs wrap the section (u) and run the length (v), so the hull can
      // wear the plating texture
      const n = cs.length, V = [], I = [], U = [];
      stations.forEach((st, si) => {
        const oy = st.oy || 0;
        for (let i = 0; i < n; i++) {
          V.push(cs[i][0] * st.sx, cs[i][1] * st.sy + oy, st.z);
          U.push((i / n) * 3, (si / (stations.length - 1)) * 2.2);
        }
      });
      for (let r = 0; r < stations.length - 1; r++)
        for (let i = 0; i < n; i++) {
          const a = r * n + i, b = r * n + (i + 1) % n, c = (r + 1) * n + i, d = (r + 1) * n + (i + 1) % n;
          I.push(a, c, b, b, c, d);
        }
      const cap = (s, flip) => {
        const base = V.length / 3, off = s * n; let cx = 0, cy = 0;
        const oy = stations[s].oy || 0;
        for (let i = 0; i < n; i++) { cx += cs[i][0] * stations[s].sx; cy += cs[i][1] * stations[s].sy + oy; }
        V.push(cx / n, cy / n, stations[s].z);
        U.push(0.5, 0.5);
        for (let i = 0; i < n; i++) { const a = off + i, b = off + (i + 1) % n; if (flip) I.push(base, b, a); else I.push(base, a, b); }
      };
      cap(0, true); cap(stations.length - 1, false);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(V, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2));
      geo.setIndex(I); geo.computeVertexNormals();
      const m = new THREE.Mesh(geo, mat); g.add(m); return m;
    };
    const planform = (pts, t, bev = 0.01) => {
      const sh = new THREE.Shape(); sh.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
      sh.closePath();
      const geo = new THREE.ExtrudeGeometry(sh, { depth: t, bevelEnabled: bev > 0,
        bevelThickness: bev, bevelSize: bev, bevelSegments: 1, steps: 1 });
      geo.translate(0, 0, -t / 2); geo.rotateX(Math.PI / 2);
      return geo;
    };

    const glows = [], cores = [], spin = [];

    const CS = [
      [0.00, 0.60], [0.70, 0.40], [1.14, -0.04], [0.50, -0.68],
      [0.00, -1.02], [-0.50, -0.68], [-1.14, -0.04], [-0.70, 0.40],
    ];
    const ST = [
      { z: 3.50, sx: 0.015, sy: 0.015 },
      { z: 3.05, sx: 0.12, sy: 0.10, oy: 0.02 },
      { z: 2.55, sx: 0.20, sy: 0.15, oy: 0.02 },
      { z: 2.05, sx: 0.26, sy: 0.19, oy: 0.01 },
      { z: 1.35, sx: 0.31, sy: 0.22 },
      { z: 0.55, sx: 0.345, sy: 0.235 },
      { z: -0.35, sx: 0.335, sy: 0.235 },
      { z: -1.15, sx: 0.31, sy: 0.225 },
      { z: -1.75, sx: 0.285, sy: 0.215 },
      { z: -2.35, sx: 0.245, sy: 0.205 },
    ];
    loft(CS, ST, SKIN);
    add(planform([[0.05, 3.0], [0.05, -2.2], [-0.05, -2.2], [-0.05, 3.0]], 0.16, 0), STEEL, 0, 0.12, 0);
    add(cone(0.075, 1.05, 5), TITAN, 0, 0.0, 3.62, PI2);
    add(cone(0.022, 0.42, 4), STEEL, 0, 0.0, 4.30, PI2);
    add(cyl(0.010, 0.010, 0.34, 4), STEEL, 0, 0.0, 4.62, PI2);
    add(sph(0.016, 8, 6), GLOW_C, 0, 0.0, 4.80);

    const WING = [
      [0.28, 0.95], [0.92, -0.30], [1.98, -1.78], [2.02, -2.06],
      [1.34, -1.80], [1.18, -1.48], [0.56, -1.74], [0.40, -2.12],
      [-0.40, -2.12], [-0.56, -1.74], [-1.18, -1.48], [-1.34, -1.80],
      [-2.02, -2.06], [-1.98, -1.78], [-0.92, -0.30], [-0.28, 0.95],
    ];
    add(planform(WING, 0.07, 0.012), SKIN2, 0, -0.02, 0);
    for (const side of [-1, 1]) {
      add(planform([[0.10, 2.30], [0.46, 0.40], [0.30, 0.85], [0.16, 1.60]], 0.05, 0),
        SKIN2, side < 0 ? 0 : 0, -0.01, 0, 0, side < 0 ? Math.PI : 0, 0);
      add(box(0.02, 0.05, 1.70), TITAN, side * 0.30, 0.0, 1.20, 0, side * 0.22, 0);
      add(planform([[0.18, 1.95], [0.40, 0.55], [0.30, 0.55], [0.20, 1.55]], 0.052, 0),
        CARBON, 0, 0.0, 0, 0, side < 0 ? Math.PI : 0, 0);
      add(box(0.012, 0.055, 1.35), DARK, side * 0.27, 0.0, 1.10, 0, side * 0.20, 0);
      for (let i = 0; i < 4; i++) add(box(0.07, 0.03, 0.06), i % 2 ? STEEL : DARK, side * 0.40, 0.03, 0.95 - i * 0.22);
    }
    for (const side of [-1, 1]) {
      for (let i = 0; i < 5; i++) {
        const t = i / 4, px = 0.45 + t * 1.20, pz = -0.30 - t * 0.30;
        add(box(0.010, 0.006, 1.05 - t * 0.35), DARK, side * px, 0.022, pz, 0, side * 0.42, 0);
      }
      for (const gz of [-0.30, -0.75, -1.20]) {
        add(box(1.30, 0.006, 0.012), DARK, side * 0.95, 0.022, gz, 0, side * 0.10, 0);
      }
      for (const [px, pz, pw, pd] of [[0.62, -0.45, 0.20, 0.40], [1.05, -0.80, 0.16, 0.34]]) {
        add(box(pw, 0.022, pd), SKIN, side * px, 0.03, pz, 0, side * 0.5, 0);
        add(box(pw * 0.7, 0.026, pd * 0.6), STEEL, side * px, 0.04, pz, 0, side * 0.5, 0);
      }
      add(box(0.05, 0.06, 0.55), STEEL, side * 0.95, -0.02, -0.85, 0, side * 0.5, 0);
      add(cyl(0.05, 0.04, 0.04, 6), STEEL, side * 0.80, 0.05, 0.05, PI2);
      add(box(0.55, 0.01, 0.012), ACCENT, side * 1.00, 0.0, -1.42, 0, side * 0.16, 0);
      const x0 = 0.28, z0 = 0.95, x1 = 2.00, z1 = -1.92, dX = x1 - x0, dZ = z1 - z0, L = Math.hypot(dX, dZ);
      add(box(0.018, 0.05, L), GLOW_C, side * (x0 + x1) / 2, 0.0, (z0 + z1) / 2, 0, Math.atan2(side * dX, dZ), 0);
    }
    add(box(0.05, 0.06, 0.60), STEEL, -1.98, 0, -1.78); add(sph(0.024, 8, 6), RED_L, -2.02, 0, -1.50);
    add(box(0.05, 0.06, 0.60), STEEL, 1.98, 0, -1.78); add(sph(0.024, 8, 6), GRN_L, 2.02, 0, -1.50);
    add(cyl(0.03, 0.02, 0.46, 6), DARK, -1.72, -0.06, -0.40, PI2);
    add(cyl(0.03, 0.02, 0.46, 6), DARK, 1.72, -0.06, -0.40, PI2);

    add(planform([[0.0, 2.45], [0.17, 2.05], [0.15, 1.55], [0.0, 1.40], [-0.15, 1.55], [-0.17, 2.05]], 0.26, 0),
      STEEL, 0, 0.15, 0);
    add(box(0.205, 0.085, 0.40), GLASS, 0, 0.245, 2.05, -0.30);
    add(box(0.185, 0.075, 0.30), GLASS, 0, 0.225, 1.74, 0.12);
    add(box(0.215, 0.018, 0.46), STEEL, 0, 0.205, 2.02, -0.30);
    add(box(0.011, 0.055, 0.62), STEEL, 0, 0.27, 1.92);
    add(box(0.013, 0.012, 0.50), GLOW_C, 0, 0.30, 1.92);

    const FIN = [[0.34, 0.00], [0.20, 0.80], [-0.12, 0.74], [-0.30, 0.00]];
    const finGeo = planform(FIN, 0.030, 0.008);
    for (const side of [-1, 1]) {
      const fin = new THREE.Mesh(finGeo, FACET);
      fin.rotation.x = -PI2; fin.rotation.y = side < 0 ? Math.PI : 0;
      const fg = new THREE.Group(); fg.add(fin);
      const cap = new THREE.Mesh(box(0.020, 0.020, 0.80), TITAN); cap.position.set(0, 0.38, 0.15); cap.rotation.x = 0.42; fin.add(cap);
      const le = new THREE.Mesh(box(0.013, 0.013, 0.74), GLOW_C); le.position.set(0, 0.39, 0.16); le.rotation.x = 0.42; fin.add(le);
      const spar = new THREE.Mesh(box(0.042, 0.46, 0.018), STEEL); spar.position.set(0, 0.30, 0.04); fin.add(spar);
      for (const ry of [0.16, 0.30, 0.44]) {
        const rib = new THREE.Mesh(box(0.040, 0.010, 0.20), DARK); rib.position.set(0, ry, 0.03); fin.add(rib);
      }
      const fp = new THREE.Mesh(box(0.046, 0.20, 0.13), STEEL); fp.position.set(0, 0.22, -0.03); fin.add(fp);
      const fpl = new THREE.Mesh(box(0.048, 0.07, 0.04), ACCENT); fpl.position.set(0, 0.22, -0.03); fin.add(fpl);
      add(box(0.07, 0.16, 0.50), STEEL, side * 0.42, 0.08, -1.55, 0, 0, side * 0.26);
      fg.position.set(side * 0.42, 0.12, -1.55); fg.rotation.z = -side * 0.28;
      g.add(fg);
    }
    for (const side of [-1, 1])
      add(planform([[0.42, 0.0], [0.05, 0.50], [-0.36, 0.0]], 0.028, 0), STEEL,
        side * 0.30, -0.24, -1.98, -PI2, side < 0 ? Math.PI : 0, side * 0.4);

    for (const side of [-1, 1]) {
      const x = side * 0.30;
      add(box(0.20, 0.20, 0.60), DARK, x, -0.04, 0.55, 0, side * 0.12, 0.0);
      add(box(0.22, 0.05, 0.62), STEEL, x, 0.07, 0.55, 0, side * 0.12, 0);
      add(box(0.016, 0.20, 0.62), ACCENT, x + side * 0.10, -0.04, 0.55, 0, side * 0.12, 0);
      const fan = new THREE.Group();
      fan.add(new THREE.Mesh(cyl(0.04, 0.04, 0.04, 6), STEEL));
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2;
        const b = new THREE.Mesh(box(0.016, 0.10, 0.006), STEEL);
        b.position.set(Math.cos(a) * 0.07, Math.sin(a) * 0.07, 0); b.rotation.z = a + 0.5; fan.add(b);
      }
      fan.position.set(x, -0.04, 0.84); g.add(fan); spin.push(fan);
    }
    for (const side of [-1, 1]) {
      for (let i = 0; i < 7; i++) {
        const z = 1.6 - i * 0.52;
        add(box(0.10, 0.012, 0.40), i % 2 ? SKIN2 : CARBON, side * 0.26, 0.06, z, 0, side * 0.16, 0);
      }
      for (const [bx, by, bz, bw, bh, bd] of [
        [0.16, 0.22, 0.95, 0.14, 0.05, 0.22], [0.20, 0.10, 0.20, 0.10, 0.05, 0.30],
        [0.22, 0.0, -0.70, 0.10, 0.06, 0.24], [0.12, 0.26, -0.30, 0.18, 0.04, 0.16]]) {
        add(box(bw, bh, bd), STEEL, side * bx, by, bz);
        add(box(bw * 0.6, bh * 0.4, bd * 0.7), DARK, side * bx, by + bh * 0.5, bz);
      }
      for (let i = 0; i < 4; i++) add(box(0.012, 0.05, 0.20), DARK, side * 0.34, 0.04, -0.9 - i * 0.12, 0, 0, 0.3);
      add(box(0.01, 0.18, 0.02), STEEL, side * 0.10, 0.30, -0.10);
      add(cyl(0.006, 0.006, 0.20, 4), STEEL, side * 0.18, -0.18, 0.70);
    }
    for (let i = 0; i < 8; i++) add(box(0.08, 0.04, 0.10), i % 2 ? STEEL : DARK, 0, 0.27, 1.6 - i * 0.46);
    add(box(0.02, 0.02, 3.0), ACCENT, 0, 0.30, 0.2);
    add(cyl(0.07, 0.05, 0.06, 6), STEEL, 0, -0.26, 2.2, PI2);
    add(sph(0.045, 8, 6), DARK, 0, -0.30, 2.2); add(sph(0.030, 8, 6), GLOW_C, 0, -0.33, 2.22);
    for (let i = 0; i < 5; i++) add(box(0.012, 0.012, 0.30), ACCENT, 0, -0.20, 1.4 - i * 0.7);

    const plumeMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      uniforms: { uThrottle: { value: 0 }, uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `
        uniform float uThrottle,uTime; varying vec2 vUv;
        float hash(float n){return fract(sin(n)*43758.5453);}
        void main(){
          float r=abs(vUv.x-0.5)*2.0; float z=vUv.y;
          float band=0.78+0.22*sin(z*44.0-uTime*9.0);
          float flick=0.90+0.10*hash(floor(z*30.0)+floor(uTime*22.0));
          float core=exp(-r*r*18.0); float shell=exp(-r*r*3.2);
          float axial=pow(max(0.0,1.0-z),1.15);
          float alpha=(core*0.95+shell*0.30)*axial*uThrottle*band*flick;
          vec3 c=mix(vec3(0.46,0.10,1.0),mix(vec3(0.68,0.42,1.0),vec3(0.98,0.95,1.0),core),shell*0.55);
          gl_FragColor=vec4(c,alpha);
        }`,
    });
    glows.push({ material: plumeMat, _isMat: true });

    const mkBell = (bx, by, R, plumeLen) => {
      const nzZ = -2.42;
      add(cyl(R * 1.20, R * 0.72, 0.44, 8, 1, true), DARK, bx, by, nzZ, PI2);
      add(cyl(R * 1.14, R * 1.14, 0.06, 8), STEEL, bx, by, nzZ + 0.20, PI2);
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2;
        add(box(R * 0.34, 0.014, 0.22), STEEL, bx + Math.cos(a) * R * 0.92, by + Math.sin(a) * R * 0.92, nzZ + 0.05, 0, 0, a);
      }
      add(cyl(R * 0.66, R * 0.34, 0.24, 8, 1, true), GLOW_W, bx, by, nzZ + 0.08, PI2);
      add(cyl(R * 1.22, R * 1.40, 0.012, 8), GLOW_O, bx, by, nzZ - 0.006);
      const cr = new THREE.Mesh(sph(R * 0.24, 8, 6), new THREE.MeshBasicMaterial({ color: 0xe6f6ff }));
      cr.position.set(bx, by, nzZ - 0.06); g.add(cr); cores.push(cr);
      const pl = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.66, 0.002, plumeLen, 16, 5, true), plumeMat);
      pl.position.set(bx, by, nzZ - plumeLen * 0.54); pl.rotation.x = PI2;
      pl.userData.plume = true; g.add(pl); glows.push(pl);
    };
    for (const side of [-1, 1]) {
      add(box(0.34, 0.30, 0.80), STEEL, side * 0.22, 0, -1.85);
      add(box(0.30, 0.04, 0.80), DARK, side * 0.22, 0.17, -1.85);
      mkBell(side * 0.22, 0, 0.17, 1.70);
    }

    g.userData.glows = glows;
    g.userData.cores = cores;
    g.userData.spin = spin;
    g.renderOrder = 5;
    return g;
  })();
  deepScene.add(shipModel);
  const _shipQ = new THREE.Quaternion();

  // ---- the beam: hold X and the ship answers with one spinal laser ---------
  // hitscan, so range and travel time stop mattering: the bolts died of old
  // age crossing the dark and their hit sphere was tighter than the ring the
  // pilot actually aims at. The ray is honest now (photon-ring radius) and
  // the damage cadence reuses the hull captions
  const BEAM_TICK = 0.12, BEAM_MAX = 900, GC_HIT_R = 14;   // a shade past the painted ring at 12
  const beam = { on: 0, acc: 0 };
  const _babs = new THREE.Vector3(), _bC = new THREE.Vector3(), _bR = new THREE.Vector3();
  {
    const geo = new THREE.CylinderGeometry(1, 1, 1, 12, 1, true);
    geo.rotateX(Math.PI / 2);                        // length along +z, like the bolts
    geo.translate(0, 0, 0.5);                        // grows from the muzzle, not the middle
    beam.core = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xeaf6ff,
      transparent: true, opacity: 0.92, blending: THREE.AdditiveBlending, depthWrite: false }));
    beam.sheath = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x7fb4ff,
      transparent: true, opacity: 0.26, blending: THREE.AdditiveBlending, depthWrite: false }));
    beam.g = new THREE.Group();
    beam.g.add(beam.core); beam.g.add(beam.sheath);
    beam.g.visible = false;
    deepScene.add(beam.g);
    beam.muzzle = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeDiscTexture('rgba(230,245,255,1)', 'rgba(127,180,255,0.4)', 0.3),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 }));
    beam.muzzle.scale.setScalar(0.14);
    deepScene.add(beam.muzzle);
    beam.flare = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeDiscTexture('rgba(255,240,214,1)', 'rgba(255,180,84,0.45)', 0.3),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 }));
    deepScene.add(beam.flare);
  }
  // ---- the destinations: every world is a door -----------------------------
  const WORLDS = [
    { name: '01 · UNIVERSE', href: 'studies/universe.html', accent: '#7fb4ff', bg: '#05070d' },
    { name: '02 · STOCK EVALUATOR', href: 'studies/stock-evaluator.html', accent: '#ffb454', bg: '#15130d' },
    { name: '03 · MUSIC TECHNOLOGY', href: 'studies/music-technology.html', accent: '#d9a96a', bg: '#141114' },
  ];


  // ---- the rifts: the other two worlds are tears in this one --------------
  // Nothing is drawn here at all. A rift adds no light and no object of its
  // own: it only bends the sky already behind it, in screen space, at the
  // top of the post chain, and concentrates that light along the critical
  // curve. What you see is this world's own stars drawn into arcs around a
  // hole in the middle of nowhere. Fly through one to arrive, or hold the
  // beam on it: each hit raises R.open, which widens the lens until the
  // tear gapes and drops you through.
  // The sky has three doors on three bearings from the parked ship: the
  // portal due north up the nose, and a rift off each wingtip. Turning to
  // find them is the point, so they sit a full quarter turn out.
  // r is how big the tear looks; enter is how close counts as through, and
  // is far larger on purpose: threading a small warp exactly would be a
  // needle at 10 pc/s
  const rifts = [
    { world: 1, abs: new THREE.Vector3(7900, -20, -260), r: 22, enter: 34, tilt: 0.30 },   // west
    { world: 2, abs: new THREE.Vector3(7900, -20, 260), r: 22, enter: 34, tilt: -0.30 },   // east
  ].map((R) => ({ ...R, hp: 10, hpMax: 10, open: 0, dead: false }));
  const _riftV = new THREE.Vector3();
  const _riftUni = [new THREE.Vector4(), new THREE.Vector4()];
  const _riftShape = rifts.map((R) => new THREE.Vector4(Math.cos(R.tilt), Math.sin(R.tilt), 3.1, 0));

  // ---- battle damage: impact flashes, and the breach that opens a world ----
  const impactTex = makeDiscTexture('rgba(255,246,224,1)', 'rgba(255,196,110,0.4)', 0.3);
  const impacts = [];
  for (let i = 0; i < 8; i++) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: impactTex,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 }));
    sp.visible = false;
    deepScene.add(sp);
    impacts.push({ sp, life: 0, abs: new THREE.Vector3() });
  }
  // flashes live at ABSOLUTE positions and ride the floating origin like
  // everything else; a flash pinned in scene space would appear to race
  // backward past a boosting ship
  function flashAt(absPos, size) {
    const im = impacts.find((x) => x.life <= 0) || impacts[0];
    im.life = 0.35;
    im.abs.copy(absPos);
    im.sp.visible = true;
    im.sp.position.copy(absPos).sub(deep.pos);
    im.sp.scale.setScalar(size);
    im.sp.material.opacity = 1;
  }
  const booms = [];
  function explode(T) {
    T.dead = true;
    committed = true;                                // this door has our name on it
    if (T.mat) { T.mat.transparent = true; T.mat.needsUpdate = true; }
    say(WORLDS[T.world].name + ' · BREACHED · ENTERING');
    // the flash
    const flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: impactTex,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 1 }));
    flash.position.copy(T.g ? T.g.position : deepGC.position);
    flash.scale.setScalar(T.r * 1.5);
    deepScene.add(flash);
    // the debris, thrown in the world's own light
    const n = 90;
    const pos = new Float32Array(n * 3);
    const vel = [];
    for (let i = 0; i < n; i++) {
      pos.set([0, 0, 0], i * 3);
      vel.push(new THREE.Vector3().randomDirection().multiplyScalar(T.r * (0.5 + Math.random() * 1.4)));
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dm = new THREE.PointsMaterial({ color: WORLDS[T.world].accent, size: T.r * 0.06,
      transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false });
    const debris = new THREE.Points(dg, dm);
    debris.position.copy(flash.position);
    deepScene.add(debris);
    booms.push({ T, flash, debris, vel, t: 0, abs: T.abs.clone() });
    setTimeout(() => enterStudy(T.world), 1050);
  }
  // a rift does not break, it gives: every hit prises the tear wider until
  // the gap is big enough to fall through
  function hitRift(R, absHitPos) {
    if (R.dead || leaving || committed) return;
    R.hp--;
    R.open = 1 - R.hp / R.hpMax;
    flashAt(absHitPos, R.r * 0.55);
    if (R.hp <= 0) {
      R.dead = true;
      committed = true;                              // this door has our name on it
      say(WORLDS[R.world].name + ' · TORN OPEN');
      setTimeout(() => enterStudy(R.world), 750);
      return;
    }
    sayBriefly(WORLDS[R.world].name + ' · TEARING ' + Math.round(R.open * 100) + '%');
  }
  let gcHeat = 0;                                    // how hot the portal's rim is running
  function hitTarget(T, absHitPos) {
    if (T.dead || leaving || committed) return;
    if (T === gcTarget) gcHeat = Math.min(1, gcHeat + 0.22);
    T.hp--;
    T.shake = 0.3;
    flashAt(absHitPos, T.r * 0.35);
    if (T.hp <= 0) { explode(T); return; }
    sayBriefly(WORLDS[T.world].name + ' · HULL ' + Math.round((T.hp / T.hpMax) * 100) + '%');
  }
  // the black hole takes fire too, though it takes more convincing
  const gcTarget = { world: 0, r: 14, hp: 18, hpMax: 18, dead: false, shake: 0,
    abs: GC_PC, g: null };

  // ---- flight state: seated exactly like flyToDeep at the GC ---------------
  // orientation is a free quaternion, not yaw/pitch: the ship can fly full
  // loops and rolls with no ceiling, no gimbal lock, no getting stuck at
  // the poles. Steering applies body-frame rotations.
  const deep = { pos: new THREE.Vector3(GC_PC.x - 300, GC_PC.y, GC_PC.z), q: new THREE.Quaternion() };
  deep.q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), GC_PC.clone().sub(deep.pos).normalize());
  const mouseNDC = { x: 0, y: 0 };
  let flyArmed = TOUCH_UI;
  let flyThrottle = false, flyCruise = false, flySpeed = 1;
  // the touch pad's held buttons. Separate from flyThrottle on purpose:
  // lifting a steering finger empties the canvas's pointer map and kills
  // flyThrottle, and a button held on another thumb must survive that
  let padThrottle = false, padFire = false;
  // drops every pad hold AND repaints. The touch block replaces the stub
  // with the real reset; every releaseAll caller then stays consistent
  let padRelease = () => { padThrottle = false; padFire = false; };
  // F parks the ship and hands you the universe's orbit camera: drag to
  // look around the world, scroll to zoom, F again to take the stick back.
  // The page OPENS in the observer's seat, circling the parked ship; the
  // first F puts you at the stick.
  let flyMode = false, modeBlend = 0;                // 1 = flying, 0 = observing
  // the establishing shot: the ship from its rear quarter with Sagittarius
  // A* burning ahead of it, the destination worlds in frame. Framed on a
  // portrait pane at r 1.0; wide screens open closer so the ship keeps its
  // presence against the full star field (r only sizes the ship: the camera
  // orientation, and so Sgr A*'s place in frame, doesn't move with it).
  // The shot stays live until the visitor takes the camera, so a resize or
  // a rotated tablet re-frames the opening instead of stranding it.
  const openingR = () => (innerWidth > innerHeight ? 0.7 : 1.0);
  const orbit = { r: openingR(), phi: 1.3, theta: -1.25 };
  let orbitOwned = false;                            // the visitor has moved the camera
  const heldKeys = new Set();
  const _deepFwd = new THREE.Vector3(), _deepUp = new THREE.Vector3(), _right = new THREE.Vector3();
  // where the ship was before this frame's move, and a scratch for the
  // segment test: at full boost the ship crosses ~80 pc in a single frame,
  // far more than a door is wide, so a point sample tunnels straight through
  const _prevPos = new THREE.Vector3(), _segV = new THREE.Vector3(), _segW = new THREE.Vector3();
  let swept = false;
  // distance from a target to the path actually flown this frame
  const sweptDist = (target) => {
    if (!swept) return target.distanceTo(deep.pos);
    _segV.copy(deep.pos).sub(_prevPos);
    const len2 = _segV.lengthSq();
    if (len2 < 1e-9) return target.distanceTo(deep.pos);
    _segW.copy(target).sub(_prevPos);
    const t = Math.max(0, Math.min(1, _segW.dot(_segV) / len2));
    return _segW.sub(_segV.multiplyScalar(t)).length();
  };
  const _wup = new THREE.Vector3(0, 1, 0), _deepLook = new THREE.Vector3();
  const _qSteer = new THREE.Quaternion(), _eSteer = new THREE.Euler();
  const _lvl = new THREE.Vector3(), _lvlX = new THREE.Vector3();
  function deepForward() { return _deepFwd.set(0, 0, 1).applyQuaternion(deep.q); }
  function deepUpV() { return _deepUp.set(0, 1, 0).applyQuaternion(deep.q); }
  // body-frame steering: positive yawIn turns the nose screen-right,
  // positive pitchIn climbs; both keep working upside down and through loops
  let turnIn = 0;
  function steer(yawIn, pitchIn) {
    _qSteer.setFromEuler(_eSteer.set(-pitchIn, -yawIn, 0, 'XYZ'));
    deep.q.multiply(_qSteer);
  }
  for (let i = 0; i < 8; i++) streamChunks();        // arrive with the field built

  // ---- controls (universe-model wiring) ------------------------------------
  addEventListener('pointermove', (e) => {
    mouseNDC.x = (e.clientX / innerWidth) * 2 - 1;
    mouseNDC.y = -((e.clientY / innerHeight) * 2 - 1);
  }, { passive: true });
  const el = renderer.domElement;
  // Every live finger, by id. A single tracked point used to mean a second
  // finger teleported the drag anchor and whipped the camera, then left it
  // half frozen when only one of the two came up. It also gives phones the
  // pinch the caption promises: there is no wheel on a touch screen, so
  // without this "pinch to zoom" was a lie
  const pointers = new Map();
  let orbitDrag = null, pinchD = 0;
  // the touch stick floats: the finger's landing point becomes its center
  // and deflection from there is a HELD turn rate (the desktop cursor
  // stick's grammar), so a long bank is one leaning thumb instead of
  // repeated swipes. The ring and nub only exist on the touch UI.
  const stick = { id: null, dx: 0, dy: 0 };
  const STICK_R = 70;
  let stickRing = null, stickNub = null, stickAX = 0, stickAY = 0;
  const stickHide = () => {
    stick.id = null; stick.dx = stick.dy = 0;
    if (stickRing) { stickRing.style.display = 'none'; stickNub.style.display = 'none'; }
  };
  const pinchSpan = () => {
    const p = [...pointers.values()];
    return p.length < 2 ? 0 : Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
  };
  el.addEventListener('pointerdown', (e) => {
    // hold the pointer so a release outside the canvas still reaches us
    try { el.setPointerCapture(e.pointerId); } catch (err) { /* drag still works */ }
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      pinchD = pinchSpan(); orbitDrag = null;
      // two fingers: zoom, never turn. The held-rate stick must let go
      // too, or a stray palm edge freezes the ship into a permanent bank
      if (stick.id !== null) {
        stick.dx = stick.dy = 0;
        if (stickNub) {
          stickNub.style.left = (stickAX - 17) + 'px';
          stickNub.style.top = (stickAY - 17) + 'px';
        }
      }
      return;
    }
    if (pointers.size > 2) return;
    if (!flyMode) { orbitDrag = { x: e.clientX, y: e.clientY, id: e.pointerId }; return; }
    if (TOUCH_UI) {
      stick.id = e.pointerId; stick.dx = stick.dy = 0;
      stickAX = e.clientX; stickAY = e.clientY;
      if (stickRing) {
        stickRing.style.display = 'block'; stickNub.style.display = 'block';
        stickRing.style.left = (stickAX - STICK_R) + 'px';
        stickRing.style.top = (stickAY - STICK_R) + 'px';
        stickNub.style.left = (stickAX - 17) + 'px';
        stickNub.style.top = (stickAY - 17) + 'px';
      }
    } else flyThrottle = true;
  });
  el.addEventListener('pointermove', (e) => {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size >= 2) {                        // two fingers: zoom, never turn
      const d = pinchSpan();
      if (pinchD > 0 && d > 0 && !flyMode) {
        orbitOwned = true;
        orbit.r = Math.max(0.15, Math.min(3, orbit.r * (pinchD / d)));
      }
      pinchD = d;
      return;
    }
    if (!flyMode) {                                  // observing: drag orbits the ship
      if (!orbitDrag || orbitDrag.id !== e.pointerId) return;
      orbitOwned = true;
      orbit.theta -= (e.clientX - orbitDrag.x) * 0.005;
      orbit.phi = Math.max(0.05, Math.min(Math.PI - 0.05, orbit.phi - (e.clientY - orbitDrag.y) * 0.005));
      orbitDrag = { x: e.clientX, y: e.clientY, id: e.pointerId };
      return;
    }
    if (!TOUCH_UI || stick.id !== e.pointerId) return;  // that finger holds the stick
    stick.dx = e.clientX - stickAX;
    stick.dy = e.clientY - stickAY;
    if (stickNub) {                                  // the nub stays inside the ring
      const m = Math.hypot(stick.dx, stick.dy), k = m > STICK_R ? STICK_R / m : 1;
      stickNub.style.left = (stickAX + stick.dx * k - 17) + 'px';
      stickNub.style.top = (stickAY + stick.dy * k - 17) + 'px';
    }
  });
  // Two different releases. Lifting the mouse only ends the mouse: wiping
  // the keys here would cancel a held Shift boost the moment you stopped
  // click-thrusting. Losing the window ends everything, because a browser
  // sends no keyup for a key that was down when you alt-tabbed, and without
  // that the ship flies on and the beam keeps firing at nobody.
  const releasePointer = () => { flyThrottle = false; stickHide(); orbitDrag = null; pinchD = 0; };
  const releaseAll = () => { releasePointer(); pointers.clear(); heldKeys.clear(); padRelease(); };
  // only the finger that actually lifted is forgotten; the other one keeps
  // its drag instead of the whole gesture dying with it
  const liftOne = (e) => {
    pointers.delete(e.pointerId);
    if (orbitDrag && orbitDrag.id === e.pointerId) orbitDrag = null;
    if (stick.id === e.pointerId) stickHide();
    pinchD = 0;
    if (pointers.size === 0) flyThrottle = false;
    try { el.releasePointerCapture(e.pointerId); } catch (err) { /* never captured */ }
  };
  el.addEventListener('pointerup', liftOne);
  el.addEventListener('pointercancel', liftOne);
  addEventListener('blur', releaseAll);
  document.addEventListener('visibilitychange', () => { if (document.hidden) releaseAll(); });
  el.addEventListener('wheel', (e) => {
    e.preventDefault();
    // Zoom, on the same convention as the throttle below: scrolling UP
    // (positive deltaY under natural scrolling) pulls the ship closer,
    // so one gesture means "more" everywhere on this page
    if (!flyMode) { orbitOwned = true; orbit.r = Math.max(0.15, Math.min(3, orbit.r * Math.exp(-e.deltaY * 0.0012))); }
    // Throttle. The sign is deliberate and has been "corrected" the wrong
    // way before: on a Mac with natural scrolling (the default, and what
    // this site is demoed on) pushing the wheel or swiping UP sends a
    // POSITIVE deltaY, so positive must mean faster. Flipping this to the
    // classic convention makes the gesture feel backwards here. Nothing in
    // JS can read the OS setting, and the control self-corrects in a
    // moment either way, so it is tuned for the machine that matters.
    else flySpeed = Math.max(0.15, Math.min(12, flySpeed * Math.exp(e.deltaY * 0.0012)));
  }, { passive: false });
  addEventListener('keydown', (e) => {
    // auto-repeat must not toggle: holding F used to flip the mode thirty
    // times a second and shred the observer's framing
    if (e.repeat) return;
    // Only the keys a focused control actually consumes are handed over.
    // Blanking every key here instead left a visitor who had Tabbed to any
    // link with no working flight controls and no way back to them.
    const onControl = e.target && e.target.closest
      && e.target.closest('a, button, input, textarea, select, [contenteditable]');
    if (onControl && (e.key === ' ' || e.key === 'Enter')) return;
    // the caption and the pad both state cruise, so both must hear the key
    if (e.key === ' ') {
      e.preventDefault();
      if (flyMode) { flyCruise = !flyCruise; say(restCaption()); syncTouchUI(); }
      return;
    }
    if (e.key === 'f' || e.key === 'F') { toggleObserve(); return; }
    if (e.key === 'h' || e.key === 'H') { capHidden = !capHidden; applyCapVis(); return; }
    heldKeys.add(e.key.toLowerCase());
  });
  addEventListener('keyup', (e) => heldKeys.delete(e.key.toLowerCase()));
  // F in and out of the observer's seat. Entering seeds the orbit from the
  // chase camera's own vantage, so the world never jumps under you.
  function toggleObserve() {
    flyMode = !flyMode;
    orbitOwned = true;                               // the stick has been taken at least once
    if (!flyMode) {
      flyThrottle = false; flyCruise = false;
      padRelease();                                  // a held THRUST must not burn while parked
      stickHide();                                   // nor the ring float over the observed ship
      const p = deepCam.position;
      orbit.r = Math.max(0.15, p.length());
      orbit.phi = Math.acos(Math.max(-1, Math.min(1, p.y / orbit.r)));
      orbit.theta = Math.atan2(p.x, p.z);
      say(CAP_OBSERVE);
    } else {
      say(flyArmed ? CAP_REST : CAP_ARM);
    }
    syncTouchUI();
  }

  // ---- caption: the arming prompt and the controls line. Dismissable (the
  // HIDE chip or H), remembered across visits, restored by the quiet ? mark.
  const capWrap = document.createElement('div');
  capWrap.className = 'home3d-chrome';               // so a fallback can sweep it away
  capWrap.style.cssText = 'position:fixed;left:0;right:0;bottom:26px;z-index:3;padding:0 18px;' +
    'text-align:center;font:600 11px Menlo,monospace;letter-spacing:0.18em;' +
    'color:#ccd7e8;text-shadow:0 0 8px rgba(2,3,10,0.95),0 0 14px rgba(127,180,255,0.25);' +
    'pointer-events:none';
  const capEl = document.createElement('span');
  capWrap.appendChild(capEl);
  // The visible caption is repainted on every damage tick, roughly eight
  // times a second while the trigger is held. Announcing all of that would
  // make the live region unusable, so speech lives in its own node and only
  // states worth hearing are written to it.
  const liveEl = document.createElement('span');
  liveEl.className = 'home3d-chrome';
  liveEl.setAttribute('aria-live', 'polite');
  liveEl.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;'
    + 'clip-path:inset(50%);white-space:nowrap';
  // on body, NOT in capWrap: hiding the caption must dim the paint, never
  // the speech, or HIDE mutes every announcement for a reader
  document.body.appendChild(liveEl);
  const announce = (txt) => { if (liveEl.textContent !== txt) liveEl.textContent = txt; };
  const hideBtn = document.createElement('button');
  hideBtn.textContent = 'HIDE';
  hideBtn.setAttribute('aria-label', 'Hide the controls line (H)');
  hideBtn.style.cssText = 'margin-left:14px;pointer-events:auto;cursor:pointer;' +
    'font:600 9.5px Menlo,monospace;letter-spacing:0.14em;color:#8fa0bd;' +
    'background:none;border:1px solid rgba(204,215,232,0.28);border-radius:3px;padding:3px 8px';
  capWrap.appendChild(hideBtn);
  document.body.appendChild(capWrap);
  const showBtn = document.createElement('button');
  showBtn.className = 'home3d-chrome';
  showBtn.textContent = '?';
  showBtn.title = 'Show the controls (H)';
  showBtn.setAttribute('aria-label', 'Show the controls line (H)');
  showBtn.style.cssText = 'position:fixed;right:16px;bottom:18px;z-index:3;display:none;' +
    'width:26px;height:26px;pointer-events:auto;cursor:pointer;' +
    'font:600 12px Menlo,monospace;color:#8fa0bd;background:rgba(2,3,10,0.5);' +
    'border:1px solid rgba(204,215,232,0.28);border-radius:50%';
  document.body.appendChild(showBtn);
  let capHidden = false;
  try { capHidden = localStorage.getItem('homeCapHidden') === '1'; } catch (e) {}
  const applyCapVis = () => {
    capWrap.style.display = capHidden ? 'none' : '';
    showBtn.style.display = capHidden ? 'block' : 'none';
    try { localStorage.setItem('homeCapHidden', capHidden ? '1' : '0'); } catch (e) {}
  };
  hideBtn.addEventListener('click', () => { capHidden = true; applyCapVis(); });
  showBtn.addEventListener('click', () => { capHidden = false; applyCapVis(); });
  applyCapVis();

  // ---- the touch flight pad: a phone has no F, no W and no X, so the
  // stick comes with buttons. FLY takes the stick (flyArmed is already
  // true on touch: there is no cursor to bring to center), THRUST and
  // FIRE are hold-to-run and only exist while flying. All three carry
  // home3d-chrome so a fallback sweeps them with the rest.
  let syncTouchUI = () => {};
  if (TOUCH_UI && !reduced) {
    const mkPad = (label, css) => {
      const b = document.createElement('button');
      b.className = 'home3d-chrome';
      b.textContent = label;
      b.style.cssText = 'position:fixed;z-index:3;pointer-events:auto;cursor:pointer;' +
        'font:600 10px Menlo,monospace;letter-spacing:0.14em;color:#ccd7e8;' +
        'background:rgba(2,3,10,0.55);border:1px solid rgba(204,215,232,0.35);' +
        'text-shadow:0 0 8px rgba(2,3,10,0.95);-webkit-tap-highlight-color:transparent;' +
        'user-select:none;-webkit-user-select:none;touch-action:none;' + css;
      document.body.appendChild(b);
      return b;
    };
    const flyBtn = mkPad('FLY', 'left:14px;bottom:70px;border-radius:4px;padding:13px 18px');
    flyBtn.setAttribute('aria-label', 'Toggle between flying and observing');
    const fireBtn = mkPad('FIRE', 'right:14px;bottom:70px;width:62px;height:62px;border-radius:50%;display:none');
    fireBtn.setAttribute('aria-label', 'Hold to fire the beam');
    const thrustBtn = mkPad('THRUST', 'right:14px;bottom:146px;width:62px;height:62px;border-radius:50%;display:none');
    thrustBtn.setAttribute('aria-label', 'Hold to thrust forward');
    // one finger owns a button: a second finger brushing it must not
    // rebase the gesture, and only the owner's lift releases the hold.
    // Space/Enter mirror the hold for a paired hardware keyboard.
    const hold = (btn, set) => {
      let ownId = null;
      const on = () => { set(true); btn.style.background = 'rgba(127,180,255,0.3)'; };
      const off = (e) => {
        if (e && e.pointerId !== undefined && e.pointerId !== ownId) return;
        ownId = null; set(false); btn.style.background = 'rgba(2,3,10,0.55)';
      };
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();                          // no long-press menu, no ghost click
        if (ownId !== null) return;
        ownId = e.pointerId;
        try { btn.setPointerCapture(e.pointerId); } catch (err) { /* hold still works */ }
        on();
      });
      btn.addEventListener('pointerup', off);
      btn.addEventListener('pointercancel', off);
      btn.addEventListener('keydown', (e) => {
        if (e.repeat || (e.key !== ' ' && e.key !== 'Enter')) return;
        e.preventDefault(); on();
      });
      btn.addEventListener('keyup', (e) => {
        if (e.key !== ' ' && e.key !== 'Enter') return;
        e.preventDefault();
        if (ownId !== null) return;                  // a key never releases a finger's hold
        off();
      });
      // Focus can leave mid-hold: Tab, or a click anywhere else. The keyup
      // then lands on whatever took focus and this button never hears it,
      // so without a release here the hold latches with no key down and
      // the beam keeps firing at a door until it opens on its own.
      btn.addEventListener('blur', () => { if (ownId === null) off(); });
      return () => off();                            // unconditional release for the reset paths
    };
    const mkStickEl = (size, css) => {
      const d = document.createElement('div');
      d.className = 'home3d-chrome';
      d.style.cssText = 'position:fixed;z-index:3;pointer-events:none;display:none;' +
        'border-radius:50%;width:' + size + 'px;height:' + size + 'px;' + css;
      document.body.appendChild(d);
      return d;
    };
    stickRing = mkStickEl(STICK_R * 2, 'border:1px solid rgba(204,215,232,0.3)');
    stickNub = mkStickEl(34, 'background:rgba(127,180,255,0.35);border:1px solid rgba(204,215,232,0.5)');
    // THRUST is a whole throttle, not a momentary switch: hold to burn,
    // TAP to lock cruise (the lit CRUISE state frees the thumb to steer),
    // SLIDE up or down while holding to change power through the same
    // range the desktop wheel drives
    // the slide's affordance: a faint vertical axis wakes BESIDE the
    // button while it is held (the thumb is covering the button itself),
    // and retires for good once the visitor has actually slid
    let slideLearned = false;
    try { slideLearned = localStorage.getItem('homeSlideLearned') === '1'; } catch (err) {}
    const chev = document.createElement('div');
    chev.className = 'home3d-chrome';
    // U+25B4/U+25BE and ASCII | : Menlo Bold owns all three (the carets
    // and U+2502 it does not, and fell to mismatched fallback fonts)
    chev.textContent = '▴\n|\n▾';
    chev.setAttribute('aria-hidden', 'true');        // decorative; nonsense to a reader
    chev.style.cssText = 'position:fixed;right:84px;bottom:154px;z-index:3;pointer-events:none;' +
      'font:600 10px Menlo,monospace;line-height:1.5;text-align:center;white-space:pre;' +
      'color:#ccd7e8;text-shadow:0 0 8px rgba(2,3,10,0.95);opacity:0;transition:opacity 0.35s';
    document.body.appendChild(chev);
    let chevTimer = 0, powerTimer = 0;
    const slideDone = () => {
      slideLearned = true;
      clearTimeout(chevTimer);
      chev.style.opacity = '0';
      try { localStorage.setItem('homeSlideLearned', '1'); } catch (err) {}
    };
    const thrustPaint = () => {
      clearTimeout(powerTimer);                      // a pending restore must not clobber this paint
      thrustBtn.textContent = flyCruise ? 'CRUISE' : 'THRUST';
      thrustBtn.setAttribute('aria-label', flyCruise
        ? 'Cruise locked: tap to cut, hold to burn'
        : 'Thrust: hold to burn, tap to lock cruise, slide for power');
      thrustBtn.setAttribute('aria-pressed', flyCruise ? 'true' : 'false');
      thrustBtn.style.borderColor = flyCruise ? 'rgba(127,180,255,0.8)' : 'rgba(204,215,232,0.35)';
      thrustBtn.style.background = padThrottle ? 'rgba(127,180,255,0.3)'
        : (flyCruise ? 'rgba(127,180,255,0.16)' : 'rgba(2,3,10,0.55)');
    };
    // POWER lives on the button as well as the caption: a visitor who
    // hid the caption still deserves a readout under their thumb
    const showPower = () => {
      thrustBtn.textContent = '×' + flySpeed.toFixed(1);
      sayBriefly('POWER ×' + flySpeed.toFixed(1));
      // the readout dwells and then the button names itself again, on the
      // caption's own beat. A finger lift repaints immediately; the arrow
      // keys have no lift, so without this the label stuck on a number
      clearTimeout(powerTimer);
      powerTimer = setTimeout(() => {
        if (!padThrottle && thrustId === null) thrustPaint();
      }, 2600);
    };
    let thrustT0 = 0, thrustY0 = 0, thrustSpeed0 = 1, thrustDragged = false, thrustId = null;
    thrustBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (thrustId !== null) return;                 // one finger owns the throttle
      thrustId = e.pointerId;
      try { thrustBtn.setPointerCapture(e.pointerId); } catch (err) { /* hold still works */ }
      padThrottle = true;
      thrustT0 = performance.now(); thrustY0 = e.clientY;
      thrustSpeed0 = flySpeed; thrustDragged = false;
      // armed, not shown: a cruise tap should never flash the affordance
      if (!slideLearned) {
        clearTimeout(chevTimer);
        chevTimer = setTimeout(() => { chev.style.opacity = '1'; }, 250);
      }
      thrustPaint();
    });
    thrustBtn.addEventListener('pointermove', (e) => {
      if (!padThrottle || e.pointerId !== thrustId) return;
      const dy = thrustY0 - e.clientY;                 // up = more power
      // 14px of slop before a press becomes a slide (a wobbly tap is
      // still a tap), 30px of travel before the affordance retires
      if (Math.abs(dy) > 14 && !thrustDragged) thrustDragged = true;
      if (!thrustDragged) return;
      if (!slideLearned && Math.abs(dy) > 30) slideDone();
      flySpeed = Math.max(0.15, Math.min(12, thrustSpeed0 * Math.exp(dy * 0.012)));
      showPower();
    });
    const thrustOff = (e) => {
      if (e && e.pointerId !== undefined && e.pointerId !== thrustId) return;
      // no cruise latch from the observer's seat or mid-door: the toggle
      // only means something while actually flying
      const wasTap = flyMode && !leaving && padThrottle && !thrustDragged
        && e && e.type === 'pointerup' && performance.now() - thrustT0 < 300;
      thrustId = null;
      padThrottle = false;
      clearTimeout(chevTimer);
      chev.style.opacity = '0';
      if (wasTap) {
        flyCruise = !flyCruise;
        sayBriefly(flyCruise ? 'CRUISE LOCKED · TAP AGAIN TO CUT' : 'CRUISE OFF');
      }
      thrustPaint();
    };
    thrustBtn.addEventListener('pointerup', thrustOff);
    thrustBtn.addEventListener('pointercancel', thrustOff);
    // the throttle for a paired keyboard: hold Space/Enter to burn, a
    // quick press taps cruise, arrows step power without steering
    thrustBtn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault(); e.stopPropagation();     // adjust power, do not pitch the ship
        flySpeed = Math.max(0.15, Math.min(12, flySpeed * (e.key === 'ArrowUp' ? 1.25 : 0.8)));
        showPower();
        return;
      }
      if (e.repeat || (e.key !== ' ' && e.key !== 'Enter') || padThrottle) return;
      e.preventDefault();
      padThrottle = true; thrustT0 = performance.now(); thrustDragged = false;
      thrustPaint();
    });
    thrustBtn.addEventListener('keyup', (e) => {
      if (e.key !== ' ' && e.key !== 'Enter') return;
      e.preventDefault();
      if (thrustId !== null) return;                 // a key never releases a finger's hold
      thrustOff({ type: 'pointerup' });              // same tap-or-hold judgement
    });
    // the throttle's half of the same latch. A plain reset, never
    // thrustOff: losing focus inside the 300 ms tap window would
    // otherwise be judged a tap and lock cruise on the way out
    thrustBtn.addEventListener('blur', () => {
      if (thrustId !== null || !padThrottle) return;
      padThrottle = false;
      clearTimeout(chevTimer);
      chev.style.opacity = '0';
      thrustPaint();
    });
    const fireRelease = hold(fireBtn, (v) => { padFire = v; });
    flyBtn.addEventListener('click', () => { if (!leaving) toggleObserve(); });
    // the real reset: blur, visibilitychange, mode exits and door entries
    // all land here through releaseAll/toggleObserve/enterStudy
    padRelease = () => {
      fireRelease();
      thrustId = null; padThrottle = false; padFire = false;
      clearTimeout(chevTimer);
      chev.style.opacity = '0';
      thrustPaint();
    };
    syncTouchUI = () => {
      flyBtn.textContent = flyMode ? 'OBSERVE' : 'FLY';
      flyBtn.setAttribute('aria-label', flyMode ? 'Stop flying and observe the ship' : 'Take the stick and fly');
      flyBtn.setAttribute('aria-pressed', flyMode ? 'true' : 'false');
      thrustBtn.style.display = fireBtn.style.display = flyMode ? 'block' : 'none';
      thrustPaint();                                 // leaving flight drops cruise; unlight it
    };
    thrustPaint();                                   // correct aria state from the first paint
    flyBtn.setAttribute('aria-pressed', 'false');
  }
  // the mouse already teaches itself: pointing steers and clicking thrusts,
  // so naming them only crowds the line. W and the arrows still work, and
  // the canvas label carries them for anyone who cannot use a mouse
  const CAP_REST = TOUCH_UI
    ? 'TILT TO STEER · TAP THRUST TO CRUISE, SLIDE IT FOR POWER'
    : 'HOLD CLICK TO THRUST · SHIFT TO BOOST · SPACE TO CRUISE · X TO FIRE · F TO OBSERVE';
  // once cruise is locked the same tap CUTS it: the line must not keep
  // promising a lock that the next tap would in fact undo
  const CAP_REST_CRUISE = 'TILT TO STEER · TAP CRUISE TO CUT, SLIDE IT FOR POWER';
  const CAP_ARM = 'BRING YOUR CURSOR TO THE CENTER TO TAKE THE STICK';
  // never tell a visitor with no keyboard to press a key, and never name
  // a FLY button that reduced motion left uncreated
  const CAP_OBSERVE = TOUCH_UI
    ? (reduced
      ? 'DRAG TO ORBIT · PINCH TO ZOOM · THE WORLDS ARE IN THE MENU'
      : 'DRAG TO ORBIT · PINCH TO ZOOM · TAP FLY TO TAKE THE STICK')
    : 'OBSERVING · DRAG TO ORBIT · SCROLL TO ZOOM · F TO FLY';
  const say = (txt) => {
    if (capEl.textContent !== txt) capEl.textContent = txt;
    announce(txt);                                   // mode changes are worth hearing
  };
  // Damage readouts are news, not state: without this the line stayed stuck
  // on "HULL 82%" for the rest of the session, so the controls a visitor
  // needs were replaced forever by a number about something they shot once.
  let sayTimer = 0;
  const restCaption = () => (flyMode
    ? (flyArmed ? (TOUCH_UI && flyCruise ? CAP_REST_CRUISE : CAP_REST) : CAP_ARM)
    : CAP_OBSERVE);
  const sayBriefly = (txt) => {
    // painted, not spoken: a running percentage is noise in a live region
    if (capEl.textContent !== txt) capEl.textContent = txt;
    clearTimeout(sayTimer);
    sayTimer = setTimeout(() => { if (!leaving) say(restCaption()); }, 2600);
  };
  say(CAP_OBSERVE);                                  // the page opens observing

  let leaving = false;
  // A door that has been breached navigates on a timer, and during that
  // second the ship is still flying: without this latch another door could
  // win the race and the beam would keep chewing on a target already lost.
  // Kept separate from `leaving`, which is enterStudy's own re-entry guard.
  let committed = false;
  function enterStudy(i) {
    if (leaving) return;
    leaving = true;
    flyThrottle = false; flyCruise = false; padRelease();
    say(WORLDS[i].name + ' · ENTERING');
    const fadeEl = document.createElement('div');
    fadeEl.style.cssText = 'position:fixed;inset:0;background:' + WORLDS[i].bg +
      ';opacity:0;transition:opacity 0.55s ease-in;z-index:99;pointer-events:none';
    document.body.appendChild(fadeEl);
    requestAnimationFrame(() => { fadeEl.style.opacity = '1'; });
    setTimeout(() => { location.href = WORLDS[i].href; }, 650);
  }
  addEventListener('pageshow', (e) => {
    if (e.persisted) location.reload();              // return fresh, at the spawn
  });

  // ---- the deep camera, verbatim -------------------------------------------
  const _orbPos = new THREE.Vector3(), _chasePos = new THREE.Vector3(), _camUp = new THREE.Vector3();
  let bankT = 0;
  function applyDeepCam(dt) {
    const dzz = 0.16;
    if (flyMode && !flyArmed && Math.abs(mouseNDC.x) < dzz && Math.abs(mouseNDC.y) < dzz) { flyArmed = true; say(CAP_REST); }
    turnIn = 0;
    let steerActive = false;
    if (flyMode && flyArmed && !TOUCH_UI && !reduced) {
      const stick = (v) => { const a = Math.abs(v); return a < dzz ? 0 : Math.sign(v) * (a - dzz) / (1 - dzz); };
      const sx = stick(mouseNDC.x), sy = stick(mouseNDC.y);
      steer(sx * 1.5 * dt, sy * 1.3 * dt);
      turnIn += sx;
      if (sx || sy) steerActive = true;
    }
    // the touch stick steers per frame while held, same dead zone and
    // rates as the cursor stick; screen-down on the nub dives, like the
    // old drag did
    if (flyMode && flyArmed && TOUCH_UI && !reduced && stick.id !== null) {
      const s = (v) => { const a = Math.abs(v); return a < dzz ? 0 : Math.sign(v) * (a - dzz) / (1 - dzz); };
      const sx = s(Math.max(-1, Math.min(1, stick.dx / STICK_R)));
      const sy = s(Math.max(-1, Math.min(1, stick.dy / STICK_R)));
      steer(sx * 1.5 * dt, -sy * 1.3 * dt);
      turnIn += sx;
      if (sx || sy) steerActive = true;
    }
    // arrows are the stick too: right arrow banks the nose right, up and
    // down pitch, and a held pitch carries clean through a full loop
    if (flyMode && !reduced) {
      const kx = (heldKeys.has('arrowright') ? 1 : 0) - (heldKeys.has('arrowleft') ? 1 : 0);
      const ky = (heldKeys.has('arrowup') ? 1 : 0) - (heldKeys.has('arrowdown') ? 1 : 0);
      if (kx || ky) { steer(kx * 1.5 * dt, ky * 1.3 * dt); turnIn += kx; steerActive = true; }
      turnIn = Math.max(-1, Math.min(1, turnIn));
    }
    const fwd = deepForward();
    const shipUp = deepUpV();
    // a soft hand trims the wings back toward level, and ONLY trims: it
    // sleeps whenever you are steering (a loop is never interrupted), it
    // sleeps near the poles, and it ignores big rolls entirely, so flying
    // inverted on purpose stays flown
    if (flyMode && !reduced && !steerActive && Math.abs(fwd.y) < 0.85) {
      _lvl.copy(_wup).addScaledVector(fwd, -fwd.y).normalize();
      const err = Math.atan2(_lvlX.copy(_lvl).cross(shipUp).dot(fwd), _lvl.dot(shipUp));
      if (Math.abs(err) < 0.5) {
        _qSteer.setFromAxisAngle(fwd, -err * Math.min(1, dt * 0.9));
        deep.q.premultiply(_qSteer);
      }
    }
    _right.crossVectors(fwd, shipUp).normalize();
    // remember where this frame started before anything moves the ship, so
    // the capture tests below can sweep the whole path actually flown
    _prevPos.copy(deep.pos);
    swept = true;
    if (flyMode) {
      const boost = (heldKeys.has('shift') ? 7 : 1) * flySpeed;
      const F = (heldKeys.has('w') ? 1 : 0) - (heldKeys.has('s') ? 1 : 0);
      const S = (heldKeys.has('d') ? 1 : 0) - (heldKeys.has('a') ? 1 : 0);
      const auto = (flyThrottle || flyCruise || padThrottle) ? 1 : 0;
      const v = DEEP_PCPERSEC * boost * dt;
      if (!reduced) {
        if (auto || F) deep.pos.addScaledVector(fwd, (auto * 0.7 + F) * v);
        if (S) deep.pos.addScaledVector(_right, S * v);
      }
    }
    deepGC.position.set(GC_PC.x - deep.pos.x, GC_PC.y - deep.pos.y, GC_PC.z - deep.pos.z);
    deepGC.visible = deepGC.position.length() < 5000;
    // the portal faces the lens: billboard the impostor, slide it toward the
    // camera clear of the core, shrink to hold its apparent size, and advance
    // the clock (frozen under reduced motion). The slide and the scale must
    // use the SAME offset: clamping one and not the other made the aperture
    // balloon on the last few parsecs and then vanish through the near plane
    if (deepGC.visible) {
      _bhToCam.copy(deepCam.position).sub(deepGC.position);
      const dBH = Math.max(1, _bhToCam.length());
      const off = Math.min(BH_OFF, dBH * 0.5);       // never past the camera
      bhQuad.position.copy(_bhToCam.normalize()).multiplyScalar(off);
      bhQuad.scale.setScalar(BH_SHADOW * BH_SPAN * (dBH - off) / dBH);
      bhQuad.lookAt(deepCam.position);
      if (!reduced) bhMat.uniforms.uT.value = performance.now() * 0.001;
      // the far side resolves on the approach: dark and rumoured at 300 pc,
      // full daylight of another sky by the time the lip swallows you
      bhMat.uniforms.uNear.value = 1 - Math.min(1, Math.max(0, (dBH - 18) / 240));
      // heat pours in per hit and bleeds away steadily; damage never cools
      gcHeat = Math.max(0, gcHeat - dt * 0.6);
      bhMat.uniforms.uHeat.value = gcHeat;
      bhMat.uniforms.uOpen.value = 1 - gcTarget.hp / gcTarget.hpMax;
    }
    // the portal IS the universe: to arrive in its case study you must truly
    // fly in, past the rim, not merely sail near it. No aimed cone shortcut
    // here, so a pilot can park, aim and open fire without being taken
    if (flyMode && !leaving && !committed && !reduced) {
      if (sweptDist(GC_PC) < 13) enterStudy(0);      // through the rim's glare itself
    }
    // the rifts: nothing to draw, only a place on screen where the sky is
    // bent. Each is projected to uv, given an einstein radius from how big
    // it looks from here, and handed to the post chain. Fly into one and
    // you are through: no aiming, no hull, no label, just arrival
    deepCam.updateMatrixWorld();                     // project against this frame, not the last
    for (let i = 0; i < 2; i++) {
      const R = rifts[i], S = _riftUni[i];
      S.set(0, 0, 0, 0);
      _riftV.set(R.abs.x - deep.pos.x, R.abs.y - deep.pos.y, R.abs.z - deep.pos.z);
      const dR = _riftV.length();
      if (dR > 1400) continue;
      if (flyMode && !leaving && !committed && !reduced && sweptDist(R.abs) < R.enter) { enterStudy(R.world); continue; }
      _riftV.applyMatrix4(deepCam.matrixWorldInverse);
      if (_riftV.z > -1) continue;                   // behind the lens, no bend
      _riftV.applyMatrix4(deepCam.projectionMatrix);
      // apparent size, capped: a tear this close is already a doorway, and
      // letting the deflection grow without limit swallowed the whole sky.
      // A tear under fire gapes: the lens strengthens as its hull gives.
      // ndc spans -1..1 and uv spans 0..1, so the shader's radii are HALF
      // the ndc ones. Handing ndc straight over made every rift twice its
      // intended size, wide enough to bend the ship itself
      const grow = 1 + R.open * 1.15;
      const ndcR = Math.min(0.52 * grow, R.r * grow / (dR * Math.tan(deepCam.fov * DEG * 0.5)));
      const uvR = ndcR * 0.5;
      const reach = uvR * 2.8;
      // off the edge of the pane by more than it can reach: no bend to do.
      // x is compared in ndc, where the reach is stretched by the aspect
      const ax = Math.max(0.2, innerWidth / Math.max(1, innerHeight));
      if (Math.abs(_riftV.x) > 1 + reach * 4 / ax || Math.abs(_riftV.y) > 1 + reach * 4) continue;
      S.set(_riftV.x * 0.5 + 0.5, _riftV.y * 0.5 + 0.5, reach, uvR * 0.62);
    }
    POST.setRifts(_riftUni[0], _riftUni[1], _riftShape[0], _riftShape[1]);
    // impact flashes decay, holding their true positions as the ship moves
    for (const im of impacts) {
      if (im.life <= 0) continue;
      im.life -= dt;
      im.sp.position.copy(im.abs).sub(deep.pos);
      im.sp.material.opacity = Math.max(0, im.life / 0.35);
      if (im.life <= 0) im.sp.visible = false;
    }
    for (let bi = booms.length - 1; bi >= 0; bi--) {
      const B = booms[bi];
      B.t += dt;
      B.flash.position.set(B.abs.x - deep.pos.x, B.abs.y - deep.pos.y, B.abs.z - deep.pos.z);
      B.debris.position.copy(B.flash.position);
      B.flash.scale.setScalar(B.T.r * (1.5 + B.t * 6));
      B.flash.material.opacity = Math.max(0, 1 - B.t * 1.4);
      const dp = B.debris.geometry.attributes.position;
      for (let di = 0; di < B.vel.length; di++) {
        dp.setXYZ(di, B.vel[di].x * B.t, B.vel[di].y * B.t, B.vel[di].z * B.t);
      }
      dp.needsUpdate = true;
      B.debris.material.opacity = Math.max(0, 1 - B.t * 0.7);
      if (B.t > 1.8) { deepScene.remove(B.flash); deepScene.remove(B.debris); booms.splice(bi, 1); }
    }
    const sc = 0.05, camDist = sc * 7.5;
    shipModel.visible = true;
    shipModel.scale.setScalar(sc);
    shipModel.position.set(0, 0, 0);
    shipModel.quaternion.copy(deep.q);
    // the hull leans into the turn; the flight path itself never rolls
    bankT += (turnIn * 0.38 - bankT) * Math.min(1, dt * 4);
    shipModel.rotateZ(bankT);
    // two seats, one camera: the rigid chase rig and the observer's orbit,
    // crossfaded so F never snaps the view. In flight the camera borrows
    // the ship's own up, so it follows through loops instead of flipping.
    modeBlend = Math.max(0, Math.min(1, modeBlend + (flyMode ? 1 : -1) * dt * 2.2));
    const k = modeBlend * modeBlend * (3 - 2 * modeBlend);
    _chasePos.set(0, 0, 0).addScaledVector(fwd, -camDist).addScaledVector(shipUp, camDist * 0.32);
    _orbPos.set(
      Math.sin(orbit.phi) * Math.sin(orbit.theta) * orbit.r,
      Math.cos(orbit.phi) * orbit.r,
      Math.sin(orbit.phi) * Math.cos(orbit.theta) * orbit.r);
    deepCam.position.lerpVectors(_orbPos, _chasePos, k);
    deepCam.up.copy(_camUp.copy(_wup).lerp(shipUp, k)).normalize();
    deepCam.lookAt(_deepLook.copy(fwd).multiplyScalar(camDist * 0.18 * k));
    deepFillLight.position.set(0, 0, 0).addScaledVector(fwd, -camDist * 0.4).addScaledVector(shipUp, camDist * 0.6);
    // the light holds its apparent brightness as the observer's orbit closes
    // in, instead of washing the hull to white
    const camD = Math.max(0.05, deepCam.position.length());
    const closeK = Math.min(1, (camD / 0.394) * (camD / 0.394));
    deepFillLight.intensity = 2.2 * closeK;
    underFill.position.set(0, 0, 0).addScaledVector(fwd, -camDist * 0.4).addScaledVector(shipUp, -camDist * 0.6);
    underFill.intensity = 0.7 * closeK;
    const throttleOn = flyThrottle || flyCruise || padThrottle;
    const nowS = performance.now() / 1000;
    const eo = (throttleOn ? 0.78 : 0.12) + Math.sin(performance.now() / 80) * 0.06;
    for (const gl of shipModel.userData.glows) {
      if (gl.material.uniforms?.uThrottle !== undefined) { gl.material.uniforms.uThrottle.value = eo; if (gl.material.uniforms.uTime) gl.material.uniforms.uTime.value = nowS; }
      else if (gl.material.opacity !== undefined) gl.material.opacity = eo;
    }
    for (const s of shipModel.userData.spin) s.rotation.z = nowS * 0.4;
    // the beam: alive while X is held, eased in and out so it ignites and
    // dies rather than toggling. One ray from the nose decides everything
    const wantBeam = flyMode && !reduced && !leaving && !committed && (heldKeys.has('x') || padFire);
    beam.on += ((wantBeam ? 1 : 0) - beam.on) * Math.min(1, dt * 14);
    if (beam.on > 0.02) {
      const rayHit = (center, R) => {                // scene space, origin at the nose
        _bC.copy(center);
        const t = _bC.dot(fwd);
        if (t < 0.3) return -1;
        const d2 = _bC.lengthSq() - t * t;
        if (d2 > R * R) return -1;
        return t - Math.sqrt(R * R - d2);
      };
      let hitT = null, hitD = BEAM_MAX, hitIsRift = false;
      if (!gcTarget.dead) {
        const t = rayHit(deepGC.position, GC_HIT_R);
        if (t > 0 && t < hitD) { hitD = t; hitT = gcTarget; }
      }
      // the tears answer the gun too, with a target box far wider than the
      // warp looks: you are shooting a seam in space, not a hull
      for (const R of rifts) {
        if (R.dead) continue;
        _bR.set(R.abs.x - deep.pos.x, R.abs.y - deep.pos.y, R.abs.z - deep.pos.z);
        const t = rayHit(_bR, R.r * 2.6);
        if (t > 0 && t < hitD) { hitD = t; hitT = R; hitIsRift = true; }
      }
      const pulse = 1 + Math.sin(nowS * 26) * 0.1;
      beam.g.position.set(0, 0, 0).addScaledVector(fwd, 0.16);
      beam.g.quaternion.copy(shipModel.quaternion);
      beam.core.scale.set(0.028 * beam.on, 0.028 * beam.on, hitD);
      beam.sheath.scale.set(0.095 * beam.on * pulse, 0.095 * beam.on * pulse, hitD);
      beam.g.visible = true;
      beam.muzzle.position.set(0, 0, 0).addScaledVector(fwd, 0.18);
      beam.muzzle.scale.setScalar(0.14 * beam.on * pulse);
      beam.muzzle.material.opacity = beam.on;
      if (hitT) {
        beam.flare.position.set(0, 0, 0).addScaledVector(fwd, hitD);
        beam.flare.scale.setScalar(hitT.r * 0.5 * pulse);
        beam.flare.material.opacity = 0.9 * beam.on;
        beam.acc += dt;
        while (beam.acc >= BEAM_TICK) {              // the lance bites on a steady cadence
          beam.acc -= BEAM_TICK;
          const at = _babs.copy(deep.pos).addScaledVector(fwd, hitD);
          if (hitIsRift) hitRift(hitT, at); else hitTarget(hitT, at);
        }
      } else { beam.flare.material.opacity = 0; beam.acc = 0; }
    } else {
      beam.g.visible = false;
      beam.muzzle.material.opacity = 0;
      beam.flare.material.opacity = 0;
      beam.acc = 0;
    }
    streamChunks();
  }

  // ---- mount ---------------------------------------------------------------
  el.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;display:block;touch-action:none;opacity:0;transition:opacity 1.1s ease-out';
  // the scene is decorative to a screen reader, but it must not be a void:
  // name what is out there and how to reach it, the way rooms.html does
  el.setAttribute('role', 'img');
  // the label describes what THIS device can do: keys on a desktop, the
  // touch pad's buttons on a phone (absent under reduced motion, where
  // only the orbit and the menu remain)
  el.setAttribute('aria-label',
    'A starship parked in deep space. A portal hangs ahead of it and a rift off each wing, '
    + 'one for each of the three case studies. '
    + (TOUCH_UI
      ? (reduced
        ? 'Drag to orbit the ship and pinch to zoom. '
        : 'Drag to orbit the ship and pinch to zoom, or use the Fly button to take the stick: '
          + 'hold Thrust to move, tilt a held finger to steer, hold Fire to shoot. ')
      : 'Press F to fly, the arrow keys to steer, W to thrust and X to fire. ')
    + 'The three worlds are also links at the top of this page.');
  document.body.insertBefore(el, document.body.firstChild);
  document.body.classList.add('world-on');
  document.documentElement.classList.remove('pre3d');
  svg.style.display = 'none';
  svg.setAttribute('aria-hidden', 'true');

  const size = () => {
    const w = Math.max(2, innerWidth), h = Math.max(2, innerHeight);
    renderer.setSize(w, h);
    deepCam.aspect = w / h;
    deepCam.updateProjectionMatrix();
    POST.resize();
    if (!flyMode && !orbitOwned) orbit.r = openingR();  // untouched opening re-frames to the new pane
  };
  addEventListener('resize', size);

  let contextLost = false;
  // a lost context used to just park the loop, which left world-on set and
  // the flat page hidden by CSS: a blank shell with no way back but reload
  el.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    contextLost = true;
    fallBack(new Error('WebGL context lost'));
  }, false);
  el.addEventListener('webglcontextrestored', () => { location.reload(); }, false);

  // ---- loop ----------------------------------------------------------------
  let lastT = performance.now();
  function frame(now) {
    if (contextLost) return;
    try {
      const dt = Math.min(0.1, (now - lastT) / 1000);
      lastT = now;
      // three sizes the canvas with floor, so comparing against round left
      // this permanently true at fractional pixel ratios and ran a full
      // resize every frame on the phones with the least headroom
      if (innerWidth > 2 && el.width !== Math.floor(innerWidth * renderer.getPixelRatio())) size();
      applyDeepCam(dt);
      POST.present(deepScene, deepCam);
    } catch (e) {
      // one bad frame is survivable; a broken world is not. Hand the page
      // back to the flat design rather than freeze on the last good pixel
      fallBack(e);
      return;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  requestAnimationFrame(() => { el.style.opacity = '1'; });
  window.__approach = { deep, deepCam, chunkMap, orbit, rifts,   // debug handle
    get armed() { return flyArmed; }, get speed() { return flySpeed; },
    get observing() { return !flyMode; } };
}
