import * as THREE from '../vendor/three.module.js';
import {
  J2000, DEG, AU_KM, PC_LY, jdFromDate, dateFromJd, planetHelio, geoRaDec,
  moonGeo, moonEcl, moonPhase, orbitalElements, posFromElements, PLANET_INFO, bvToRgb, galToEq, gmst,
} from './astro.js?v=2';
import { PHENOMENA, PHENOM_CATS } from './phenomena.js?v=1';

const R_SKY = 1000;
const AUU = 20;                       // world units per AU in solar mode
const host = document.getElementById('canvas-host');
const loadFill = document.getElementById('load-fill');
const setLoad = (f) => { loadFill.style.width = (f * 100).toFixed(0) + '%'; };

// ---------------------------------------------------------------- utilities
function dirVec(raDeg, decDeg) {
  const r = raDeg * DEG, d = decDeg * DEG;
  return new THREE.Vector3(Math.cos(d) * Math.cos(r), Math.sin(d), -Math.cos(d) * Math.sin(r));
}
const eqToThree = (v) => new THREE.Vector3(v.x, v.z, -v.y);   // equatorial xyz -> scene
const eclToThree = (v) => new THREE.Vector3(v.x, v.z, -v.y);  // ecliptic xyz -> scene

function makeTextSprite(text, { size = 13, color = '#9db8d9', weight = '500', alpha = 0.9 } = {}) {
  const pr = 2, pad = 5;
  const meas = document.createElement('canvas').getContext('2d');
  meas.font = `${weight} ${size}px system-ui, -apple-system, sans-serif`;
  const w = Math.ceil(meas.measureText(text).width) + pad * 2;
  const h = size + pad * 2;
  const c = document.createElement('canvas');
  c.width = w * pr; c.height = h * pr;
  const ctx = c.getContext('2d');
  ctx.scale(pr, pr);
  ctx.font = `${weight} ${size}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, pad, h / 2 + 0.5);
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({
    map: tex, transparent: true, depthTest: false, depthWrite: false, sizeAttenuation: false,
  }));
  sp.userData.pxW = w; sp.userData.pxH = h;
  return sp;
}

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

function makeRingTexture(color) {
  const s = 64, c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d');
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2 - 4, 0, Math.PI * 2);
  ctx.stroke();
  const t = new THREE.CanvasTexture(c);
  t.minFilter = THREE.LinearFilter;
  return t;
}

// ---------------------------------------------------------------- renderer
// If WebGL is unavailable (disabled, old device, blocked driver), say so plainly
// instead of leaving the visitor on the loading screen forever.
function webglUnavailable(err) {
  const t = document.querySelector('#loader .t');
  const bar = document.querySelector('#loader .bar');
  if (t) t.textContent = 'THIS MODEL NEEDS WEBGL';
  if (bar) bar.outerHTML =
    '<div style="max-width:300px;text-align:center;font-size:12.5px;color:#8aa0c0;line-height:1.65">' +
    'Your browser has WebGL turned off or unavailable, so the universe can\'t render here. ' +
    'Try a current version of Chrome, Edge, Firefox, or Safari with hardware acceleration enabled.</div>';
  throw err;
}
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
} catch (err) {
  webglUnavailable(err);
}
// phones render fewer pixels: high-dpi panels don't need the full 2x GPU load
const MAX_PIXEL_RATIO = matchMedia('(pointer: coarse)').matches ? 1.75 : 2;
// touch devices have no keyboard or hover — flight & HUD adapt around this
// (?touch previews the touch UI on a desktop browser)
const TOUCH_UI = matchMedia('(hover: none) and (pointer: coarse)').matches
  || new URLSearchParams(location.search).has('touch');
renderer.setPixelRatio(Math.min(devicePixelRatio, MAX_PIXEL_RATIO));
renderer.setSize(innerWidth, innerHeight);
host.appendChild(renderer.domElement);

// ---------------------------------------------------------------- post-processing
// Self-contained additive BLOOM. The active scene is rendered to an sRGB target
// (pixel-identical to drawing straight to screen), a luminance bright-pass is
// blurred at half-res, and the glow is added back over the untouched base image.
// So with strength 0 nothing changes; bright things (sun, plumes, accretion disk,
// stars, atmospheres) gain a real radiant halo. Works for every mode via present().
const POST = (() => {
  const _v2 = new THREE.Vector2();
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const mkRT = (w, h, o = {}) => new THREE.WebGLRenderTarget(
    Math.max(1, Math.floor(w)), Math.max(1, Math.floor(h)),
    { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, type: THREE.UnsignedByteType, depthBuffer: false, ...o });

  const rtScene = mkRT(size.x, size.y, { samples: 4, depthBuffer: true });  // MSAA-resolved, keeps AA
  rtScene.texture.colorSpace = THREE.SRGBColorSpace;
  const rtA = mkRT(size.x / 2, size.y / 2);
  const rtB = mkRT(size.x / 2, size.y / 2);

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
        gl_FragColor = vec4(base + bloom * uStrength, 1.0);   // additive glow over untouched base
      }`,
  });

  const drawQuad = (mat) => { quad.material = mat; renderer.render(quadScene, quadCam); };

  function resize() {
    const s = renderer.getDrawingBufferSize(_v2);
    rtScene.setSize(s.x, s.y);
    rtA.setSize(Math.max(1, Math.floor(s.x / 2)), Math.max(1, Math.floor(s.y / 2)));
    rtB.setSize(Math.max(1, Math.floor(s.x / 2)), Math.max(1, Math.floor(s.y / 2)));
  }

  let enabled = true;
  function present(scene, cam) {
    if (!enabled) { renderer.setRenderTarget(null); renderer.render(scene, cam); return; }
    const s = renderer.getDrawingBufferSize(_v2);
    renderer.setRenderTarget(rtScene); renderer.render(scene, cam);          // 1. scene → sRGB target
    brightMat.uniforms.tScene.value = rtScene.texture;                       // 2. bright-pass → half-res
    renderer.setRenderTarget(rtA); drawQuad(brightMat);
    const hx = 2.0 / s.x, hy = 2.0 / s.y;                                    // 3. separable gaussian ×2
    for (let i = 0; i < 2; i++) {
      const sp = i + 1;
      blurMat.uniforms.tInput.value = rtA.texture; blurMat.uniforms.uDir.value.set(hx * sp, 0);
      renderer.setRenderTarget(rtB); drawQuad(blurMat);
      blurMat.uniforms.tInput.value = rtB.texture; blurMat.uniforms.uDir.value.set(0, hy * sp);
      renderer.setRenderTarget(rtA); drawQuad(blurMat);
    }
    compMat.uniforms.tScene.value = rtScene.texture;                         // 4. composite → screen
    compMat.uniforms.tBloom.value = rtA.texture;
    renderer.setRenderTarget(null); drawQuad(compMat);
  }
  return { present, resize, brightMat, blurMat, compMat,
           get enabled() { return enabled; }, set enabled(v) { enabled = v; } };
})();

const skyScene = new THREE.Scene();
const solScene = new THREE.Scene();
const neiScene = new THREE.Scene();
const galScene = new THREE.Scene();
const cosScene = new THREE.Scene();
// deepScene — the one continuous "fly forever" space (floating-origin, parsec units).
// The camera stays at the render origin; every object is positioned at (abs − camAbs)
// each frame so coordinates never blow past float32 precision (no walls).
const deepScene = new THREE.Scene();
skyScene.background = new THREE.Color(0x04060c);
solScene.background = new THREE.Color(0x04060c);
neiScene.background = new THREE.Color(0x04060c);
galScene.background = new THREE.Color(0x04060c);
cosScene.background = new THREE.Color(0x020308);
deepScene.background = new THREE.Color(0x02030a);

const skyCam = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 5000);
const solCam = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.05, 40000);
const neiCam = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.01, 8000);
const galCam = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.05, 20000);
const cosCam = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 8000);
const deepCam = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.02, 2e7);

let mode = 'sky';
const labelGroups = { sky: [], solar: [], neighborhood: [], galaxy: [], cosmic: [], deep: [] };
const CAMS = { sky: skyCam, solar: solCam, neighborhood: neiCam, galaxy: galCam, cosmic: cosCam, deep: deepCam };
const SCENES = { sky: skyScene, solar: solScene, neighborhood: neiScene, galaxy: galScene, cosmic: cosScene, deep: deepScene };

// Deep-space ("fly forever") state. `deep.pos` is the camera's ABSOLUTE position in
// parsecs (heliocentric; Sun at origin). The camera renders at the origin and the
// world is shifted by −deep.pos each frame (floating origin), so there is no wall.
let deepCatalog = null;                       // real HYG catalog stars (shared geom)
let deepStarMat = null;                       // shared star Points material (assigned at build)
const deepFillLight = new THREE.PointLight(0xd8eaff, 2.2, 0);  // lights the ship in deep space (new hull is self-lit)
deepFillLight.visible = false; deepScene.add(deepFillLight);
const _deepLook = new THREE.Vector3();
let deepSun = null, deepSunHalo = null;   // "home" beacon star at the Sun, so you can always fly back
let deepGC = null;
const deep = { pos: new THREE.Vector3(0, 0, 6), yaw: 0, pitch: 0 };   // camera ABS position (pc) + heading
const DEEP_PCPERSEC = 4;                      // base cruise speed (pc per second of thrust)
const SUN_DIVE_PC = 0.05;                     // within this radius of the Sun, dive into the planetary system
const SUN_APPROACH_PC = 1.6;                  // within this, you're "arriving": orbit-ring halo fades in
const SUN_CONE_DOT = 0.94;                    // if aimed this well at the Sun, capture from the whole approach zone
// Procedural galaxy chunk streaming (deterministic, density-driven) — see streamChunks().
const CHUNK_L = 400, CHUNK_RAD = 2, CHUNK_CAP = 6000, CHUNK_BASE = 2400, CHUNK_BUDGET = 48;
const GC_PC = new THREE.Vector3(8200, -20, 0); // galactic centre in Sun-centred pc (= −SUN_GAL·1000)
const R_SUN_GAL = 8200, R_DISK = 2500, H_DISK = 300;
const chunkMap = new Map();                   // "ix,iy,iz" → THREE.Points | null(empty)
const _chunkPending = new Set();
let _chunkGenQueue = [];

function camFor(m) { return CAMS[m]; }
function sceneFor(m) { return SCENES[m]; }

// all sky content lives in this group so the horizon view can rotate the
// whole celestial sphere into the observer's alt-az frame
const skyGroup = new THREE.Group();
skyScene.add(skyGroup);

function rescaleLabels(m) {
  const cam = camFor(m);
  const f = 2 * Math.tan(cam.fov * DEG / 2) / innerHeight;
  for (const sp of labelGroups[m]) {
    const k = f * (sp.userData.pxScale || 1);
    sp.scale.set(sp.userData.pxW * k, sp.userData.pxH * k, 1);
  }
}

// ---------------------------------------------------------------- data
setLoad(0.05);
const [STARS, CONS, EXO] = await Promise.all([
  fetch('data/stars.json').then((r) => r.json()),
  fetch('data/constellations.json').then((r) => r.json()),
  fetch('data/exoplanets.json').then((r) => r.json()).catch(() => []),   // NASA Exoplanet Archive (confirmed)
]);
setLoad(0.35);

const N = STARS.ra.length;
const N_INFO = STARS.nInfo;
const conFull = {};
for (const c of CONS) conFull[c.abbr] = c.name;

// unit direction per star (flat array, shared by sky + neighborhood + picking)
const dirs = new Float32Array(N * 3);
for (let i = 0; i < N; i++) {
  const r = STARS.ra[i] * DEG, d = STARS.dec[i] * DEG;
  dirs[i * 3] = Math.cos(d) * Math.cos(r);
  dirs[i * 3 + 1] = Math.sin(d);
  dirs[i * 3 + 2] = -Math.cos(d) * Math.sin(r);
}
setLoad(0.45);

// ---------------------------------------------------------------- star shaders
const starUniforms = {
  uMagLimit: { value: 14 },     // full catalog by default — dim it down if you want naked-eye realism
  uSizeScale: { value: 3 },
  uTime: { value: 0 },
  uTwinkle: { value: 1 },
  uPR: { value: Math.min(devicePixelRatio, MAX_PIXEL_RATIO) },
  uSpectrum: { value: 0 },   // 0=visible 1=X-ray 2=infrared 3=radio
};

const starVert = `
  uniform float uMagLimit, uSizeScale, uTime, uTwinkle, uPR, uSpectrum;
  attribute float aMag, aTw;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vBright;   // 0..1 — controls diffraction spike intensity
  void main() {
    if (aMag > uMagLimit) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; vAlpha = 0.0; vBright = 0.0; return; }
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;

    // Steeper magnitude–size mapping: Sirius (-1.5) → ~12px, mag 6 → ~2px
    float bright = max(0.0, 5.5 - aMag);
    float size = uSizeScale * (1.8 + bright * 1.05);

    // Alpha: faint stars are visible but dim; bright stars fully opaque
    float alpha = clamp(0.22 + 0.78 * pow(bright / 5.5, 0.55), 0.10, 1.0);
    if (uTwinkle > 0.5 && aMag < 4.5) alpha *= 0.82 + 0.18 * sin(uTime * (2.0 + aTw * 6.0) + aTw * 80.0);
    gl_PointSize = max(size * uPR, 1.2);

    // Diffraction spikes only for the bright end (mag < 2)
    vBright = clamp((2.5 - aMag) / 3.5, 0.0, 1.0);

    // EM spectrum colour shifts
    vec3 col = aColor;
    float alphaScale = 1.0;
    if (uSpectrum > 0.5 && uSpectrum < 1.5) {
      float hotness = clamp(col.b * 1.6 - col.r * 0.8, 0.0, 1.0);
      col = mix(vec3(0.2, 0.4, 1.0), vec3(0.85, 0.95, 1.0), hotness);
      alphaScale = max(0.04, hotness * 2.2);
    } else if (uSpectrum > 1.5 && uSpectrum < 2.5) {
      float coolness = clamp(col.r * 1.4 - col.b * 0.6 + 0.1, 0.0, 1.0);
      col = mix(vec3(0.6, 0.15, 0.05), vec3(1.0, 0.55, 0.15), coolness);
      alphaScale = max(0.06, coolness * 1.8 + 0.1);
    } else if (uSpectrum > 2.5) {
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      col = vec3(0.85, 0.72, 0.38) * (0.5 + lum * 0.5);
      alphaScale = 0.65;
    }
    vColor = col;
    vAlpha = alpha * alphaScale;
  }`;

const starFrag = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vBright;
  void main() {
    if (vAlpha <= 0.0) discard;
    vec2 uv = gl_PointCoord - 0.5;   // -0.5..0.5 on each axis
    float r = length(uv) * 2.0;       // 0 at center, 1 at edge
    if (r > 1.0) discard;

    // Realistic stellar PSF: tight Gaussian core + broader Airy-like halo
    float core = exp(-r * r * 26.0);
    float halo = exp(-r * r *  4.8);

    // 4-point diffraction spikes (horizontal + vertical cross)
    // — only rendered for stars bright enough (vBright > 0)
    float spike_h = exp(-uv.y * uv.y * 1600.0) * max(0.0, 1.0 - abs(uv.x) * 2.2);
    float spike_v = exp(-uv.x * uv.x * 1600.0) * max(0.0, 1.0 - abs(uv.y) * 2.2);
    float spike = max(spike_h, spike_v) * vBright * 0.65;

    float f = core * 1.3 + halo * 0.55 + spike;

    // Core whitens toward center — hot plasma effect
    vec3 col = mix(vColor, vec3(1.0, 0.98, 0.95), core * 0.55);

    gl_FragColor = vec4(col, vAlpha * min(f, 1.0));
  }`;

function buildStarAttributes(geo) {
  const mags = new Float32Array(N);
  const cols = new Float32Array(N * 3);
  const tw = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    mags[i] = STARS.mag[i];
    const [r, g, b] = bvToRgb(STARS.ci[i]);
    cols[i * 3] = r; cols[i * 3 + 1] = g; cols[i * 3 + 2] = b;
    tw[i] = Math.random();
  }
  geo.setAttribute('aMag', new THREE.BufferAttribute(mags, 1));
  geo.setAttribute('aColor', new THREE.BufferAttribute(cols, 3));
  geo.setAttribute('aTw', new THREE.BufferAttribute(tw, 1));
}

const starMat = new THREE.ShaderMaterial({
  uniforms: starUniforms, vertexShader: starVert, fragmentShader: starFrag,
  transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
});

// sky starfield (celestial sphere)
const skyStarGeo = new THREE.BufferGeometry();
{
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i++) pos[i] = dirs[i] * R_SKY;
  skyStarGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  buildStarAttributes(skyStarGeo);
}
const skyStars = new THREE.Points(skyStarGeo, starMat);
skyStars.renderOrder = 4;
skyStars.frustumCulled = false;
skyGroup.add(skyStars);
setLoad(0.55);

// ---------------------------------------------------------------- milky way
function buildMilkyWay() {
  const group = new THREE.Group();
  const M = 26000;
  const pos = new Float32Array(M * 3);
  const alp = new Float32Array(M);
  let k = 0;
  while (k < M) {
    // smooth density in longitude — rejection-sample a gaussian bump toward the
    // galactic centre over a uniform floor. (The old two-population sampler cut the
    // centre-weighted component off hard at l=±120°, drawing a visible straight
    // seam across the sky where the density stepped down.)
    const l = Math.random() * 360;
    const dctr = Math.min(l, 360 - l);                     // angular distance from the centre
    if (Math.random() > 0.32 + 0.68 * Math.exp(-(dctr * dctr) / (2 * 62 * 62))) continue;
    const sigma = 5.5 + 9 * Math.exp(-(dctr * dctr) / (2 * 45 * 45));
    const b = (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2 * sigma * 2.2;
    if (Math.abs(b) > 35) continue;
    const v = eqToThree(galToEq(l, b)).multiplyScalar(R_SKY * 1.03);
    pos[k * 3] = v.x; pos[k * 3 + 1] = v.y; pos[k * 3 + 2] = v.z;
    alp[k] = 0.03 + Math.random() * 0.10 * Math.exp(-(dctr * dctr) / (2 * 90 * 90));
    k++;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aA', new THREE.BufferAttribute(alp, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
    uniforms: { uPR: starUniforms.uPR },
    vertexShader: `
      uniform float uPR; attribute float aA; varying float vA;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 1.8 * uPR; vA = aA;
      }`,
    fragmentShader: `
      varying float vA;
      void main() { gl_FragColor = vec4(0.78, 0.83, 0.95, vA); }`,
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  pts.renderOrder = 1;
  group.add(pts);
  // soft glow toward the galactic centre (Sagittarius)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(255,230,200,0.13)', 'rgba(190,170,210,0.05)', 0.45),
    transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  glow.position.copy(eqToThree(galToEq(0, 0)).multiplyScalar(R_SKY * 1.02));
  glow.scale.set(700, 480, 1);
  glow.renderOrder = 0;
  group.add(glow);
  return group;
}
const milkyWay = buildMilkyWay();
skyGroup.add(milkyWay);
setLoad(0.62);

// ---------------------------------------------------------------- constellations
const conGroup = new THREE.Group();
{
  const segs = [];
  for (const c of CONS) {
    for (const line of c.lines) {
      for (let i = 0; i < line.length - 1; i++) {
        const a = line[i] * 3, b = line[i + 1] * 3;
        segs.push(dirs[a] * R_SKY * 0.995, dirs[a + 1] * R_SKY * 0.995, dirs[a + 2] * R_SKY * 0.995);
        segs.push(dirs[b] * R_SKY * 0.995, dirs[b + 1] * R_SKY * 0.995, dirs[b + 2] * R_SKY * 0.995);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(segs), 3));
  const mat = new THREE.LineBasicMaterial({
    color: 0x4d7ba8, transparent: true, opacity: 0.45, depthTest: false, depthWrite: false,
  });
  const lines = new THREE.LineSegments(geo, mat);
  lines.frustumCulled = false;
  lines.renderOrder = 3;
  conGroup.add(lines);
}
skyGroup.add(conGroup);

// constellation artwork: each painting is pinned to the sphere by 3 anchor stars.
// Solve the affine map pixels->3D from the anchors, then tessellate a curved quad.
const artGroup = new THREE.Group();
skyGroup.add(artGroup);
let artBuilt = false;
function buildArt() {
  if (artBuilt) return;
  artBuilt = true;
  const loader = new THREE.TextureLoader();
  const RA = R_SKY * 0.992;
  for (const c of CONS) {
    if (!c.art) continue;
    const { file, size, anchors } = c.art;
    const P = anchors.map((a) => new THREE.Vector3(
      dirs[a.idx * 3], dirs[a.idx * 3 + 1], dirs[a.idx * 3 + 2]).multiplyScalar(RA));
    const [a1, a2, a3] = anchors;
    const du2 = a2.pos[0] - a1.pos[0], dv2 = a2.pos[1] - a1.pos[1];
    const du3 = a3.pos[0] - a1.pos[0], dv3 = a3.pos[1] - a1.pos[1];
    const det = du2 * dv3 - dv2 * du3;
    if (Math.abs(det) < 1e-9) continue;
    const D2 = P[1].clone().sub(P[0]), D3 = P[2].clone().sub(P[0]);
    const Uv = D2.clone().multiplyScalar(dv3 / det).add(D3.clone().multiplyScalar(-dv2 / det));
    const Vv = D3.clone().multiplyScalar(du2 / det).add(D2.clone().multiplyScalar(-du3 / det));
    const A = P[0].clone()
      .sub(Uv.clone().multiplyScalar(a1.pos[0]))
      .sub(Vv.clone().multiplyScalar(a1.pos[1]));
    const geo = new THREE.PlaneGeometry(1, 1, 6, 6);
    const pos = geo.attributes.position, uv = geo.attributes.uv;
    for (let k = 0; k < pos.count; k++) {
      const fu = uv.getX(k), fv = 1 - uv.getY(k);
      const p = A.clone()
        .add(Uv.clone().multiplyScalar(fu * size[0]))
        .add(Vv.clone().multiplyScalar(fv * size[1]));
      p.normalize().multiplyScalar(RA);
      pos.setXYZ(k, p.x, p.y, p.z);
    }
    pos.needsUpdate = true;
    geo.computeBoundingSphere();
    const tex = loader.load('data/illustrations/' + file);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      map: tex, transparent: true, opacity: 0.32, depthTest: false, depthWrite: false,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    }));
    mesh.renderOrder = 2;
    mesh.frustumCulled = false;
    artGroup.add(mesh);
  }
}

const conLabelGroup = new THREE.Group();
for (const c of CONS) {
  const sp = makeTextSprite(c.name, { size: 13, color: '#6f93bd', alpha: 0.85 });
  sp.position.copy(dirVec(c.label[0], c.label[1]).multiplyScalar(R_SKY * 0.98));
  sp.renderOrder = 7;
  conLabelGroup.add(sp);
  labelGroups.sky.push(sp);
}
skyGroup.add(conLabelGroup);

// bright-star name labels
const starNameGroup = new THREE.Group();
for (const [idxStr, name] of Object.entries(STARS.names)) {
  const i = +idxStr;
  if (STARS.mag[i] > 2.1) continue;
  const sp = makeTextSprite(name, { size: 11, color: '#b9cce6', alpha: 0.95 });
  sp.center.set(0.5, 1.5);
  sp.position.set(dirs[i * 3] * R_SKY * 0.99, dirs[i * 3 + 1] * R_SKY * 0.99, dirs[i * 3 + 2] * R_SKY * 0.99);
  sp.renderOrder = 7;
  starNameGroup.add(sp);
  labelGroups.sky.push(sp);
}
skyGroup.add(starNameGroup);
setLoad(0.7);

// ---------------------------------------------------------------- equatorial grid
const gridGroup = new THREE.Group();
{
  const mat = new THREE.LineBasicMaterial({
    color: 0x5d7da8, transparent: true, opacity: 0.14, depthTest: false, depthWrite: false,
  });
  for (let h = 0; h < 24; h += 2) {
    const pts = [];
    for (let dd = -88; dd <= 88; dd += 4) pts.push(dirVec(h * 15, dd).multiplyScalar(R_SKY * 0.99));
    gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  }
  for (let dd = -60; dd <= 60; dd += 30) {
    const pts = [];
    for (let ra = 0; ra <= 360; ra += 5) pts.push(dirVec(ra, dd).multiplyScalar(R_SKY * 0.99));
    gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  }
  gridGroup.children.forEach((l) => { l.frustumCulled = false; l.renderOrder = 2; });
}
gridGroup.visible = false;
skyGroup.add(gridGroup);

// ---------------------------------------------------------------- deep sky objects
const DSOS = [
  ['M31', 'Andromeda Galaxy', 10.685, 41.27, 'galaxy', '2.5 Mly'],
  ['M33', 'Triangulum Galaxy', 23.46, 30.66, 'galaxy', '2.73 Mly'],
  ['M51', 'Whirlpool Galaxy', 202.47, 47.20, 'galaxy', '23 Mly'],
  ['M81', "Bode's Galaxy", 148.89, 69.07, 'galaxy', '12 Mly'],
  ['M82', 'Cigar Galaxy', 148.97, 69.68, 'galaxy', '12 Mly'],
  ['M101', 'Pinwheel Galaxy', 210.80, 54.35, 'galaxy', '21 Mly'],
  ['M104', 'Sombrero Galaxy', 189.99, -11.62, 'galaxy', '29 Mly'],
  ['M87', 'Virgo A', 187.70, 12.39, 'galaxy', '53 Mly'],
  ['M64', 'Black Eye Galaxy', 194.18, 21.68, 'galaxy', '17 Mly'],
  ['NGC 5128', 'Centaurus A', 201.36, -43.02, 'galaxy', '12 Mly'],
  ['LMC', 'Large Magellanic Cloud', 80.89, -69.76, 'galaxy', '158 kly'],
  ['SMC', 'Small Magellanic Cloud', 13.19, -72.83, 'galaxy', '200 kly'],
  ['M42', 'Orion Nebula', 83.82, -5.39, 'nebula', '1,344 ly'],
  ['M8', 'Lagoon Nebula', 270.92, -24.38, 'nebula', '4,100 ly'],
  ['M20', 'Trifid Nebula', 270.62, -23.03, 'nebula', '4,100 ly'],
  ['M16', 'Eagle Nebula', 274.70, -13.78, 'nebula', '7,000 ly'],
  ['M17', 'Omega Nebula', 275.20, -16.18, 'nebula', '5,500 ly'],
  ['M57', 'Ring Nebula', 283.40, 33.03, 'nebula', '2,300 ly'],
  ['M27', 'Dumbbell Nebula', 299.90, 22.72, 'nebula', '1,360 ly'],
  ['NGC 3372', 'Carina Nebula', 161.27, -59.87, 'nebula', '7,500 ly'],
  ['M45', 'Pleiades', 56.85, 24.12, 'cluster', '444 ly'],
  ['M44', 'Beehive Cluster', 130.10, 19.67, 'cluster', '577 ly'],
  ['M13', 'Hercules Cluster', 250.42, 36.46, 'cluster', '22,200 ly'],
  ['M22', 'Sagittarius Cluster', 279.10, -23.90, 'cluster', '10,600 ly'],
  ['NGC 869/884', 'Double Cluster', 35.00, 57.13, 'cluster', '7,500 ly'],
  ['NGC 5139', 'Omega Centauri', 201.70, -47.48, 'cluster', '15,800 ly'],
  ['NGC 104', '47 Tucanae', 6.02, -72.08, 'cluster', '13,000 ly'],
];
const dsoColors = { galaxy: '#e0b78f', nebula: '#d98fc4', cluster: '#8fb7e0' };
const dsoGroup = new THREE.Group();
const dsoDirs = [];
{
  const ringTex = {};
  for (const t of Object.keys(dsoColors)) ringTex[t] = makeRingTexture(dsoColors[t]);
  for (const [id, name, ra, dec, type] of DSOS) {
    const dir = dirVec(ra, dec);
    dsoDirs.push(dir);
    const mark = new THREE.Sprite(new THREE.SpriteMaterial({
      map: ringTex[type], transparent: true, opacity: 0.75, depthTest: false, depthWrite: false,
      sizeAttenuation: false,
    }));
    mark.position.copy(dir.clone().multiplyScalar(R_SKY * 0.985));
    mark.userData.pxW = 14; mark.userData.pxH = 14;
    mark.renderOrder = 5;
    dsoGroup.add(mark);
    labelGroups.sky.push(mark);
    const lab = makeTextSprite(name, { size: 10, color: dsoColors[type], alpha: 0.8 });
    lab.center.set(0.5, 2.0);
    lab.position.copy(mark.position);
    lab.renderOrder = 7;
    dsoGroup.add(lab);
    labelGroups.sky.push(lab);
  }
}
skyGroup.add(dsoGroup);

// ---------------------------------------------------------------- phenomena layer
// real exotic objects (pulsars, magnetars, black holes, quasars, SNRs, …) plotted
// on the sky and clickable for a documentation card. See js/phenomena.js.
const phenomGroup = new THREE.Group();
const phenomDirs = [];                 // { dir, idx } for click picking
const phenomByCat = {};                // cat -> [sprites] for per-category toggles
function makeMarkerTexture(color) {
  const s = 64, c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d');
  ctx.translate(s / 2, s / 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.95;
  ctx.beginPath();                     // diamond
  ctx.moveTo(0, -13); ctx.lineTo(13, 0); ctx.lineTo(0, 13); ctx.lineTo(-13, 0); ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 0.35;
  ctx.beginPath(); ctx.arc(0, 0, 24, 0, Math.PI * 2); ctx.lineWidth = 2;
  ctx.strokeStyle = color; ctx.stroke();
  const t = new THREE.CanvasTexture(c);
  t.minFilter = THREE.LinearFilter;
  return t;
}
{
  const markerTex = {};
  for (const cat of Object.keys(PHENOM_CATS)) markerTex[cat] = makeMarkerTexture(PHENOM_CATS[cat].color);
  for (const cat of Object.keys(PHENOM_CATS)) phenomByCat[cat] = [];
  PHENOMENA.forEach((ph, idx) => {
    const dir = dirVec(ph.ra, ph.dec);
    phenomDirs.push({ dir, idx });
    const col = PHENOM_CATS[ph.cat].color;
    const mark = new THREE.Sprite(new THREE.SpriteMaterial({
      map: markerTex[ph.cat], transparent: true, opacity: 0.85, depthTest: false,
      depthWrite: false, sizeAttenuation: false,
    }));
    mark.position.copy(dir.clone().multiplyScalar(R_SKY * 0.98));
    mark.userData.pxW = 13; mark.userData.pxH = 13;
    mark.renderOrder = 6;
    phenomGroup.add(mark);
    labelGroups.sky.push(mark);
    const lab = makeTextSprite(ph.name, { size: 9.5, color: col, alpha: 0.78 });
    lab.center.set(0.5, 1.9);
    lab.position.copy(mark.position);
    lab.renderOrder = 8;
    phenomGroup.add(lab);
    labelGroups.sky.push(lab);
    phenomByCat[ph.cat].push(mark, lab);
  });
}
skyGroup.add(phenomGroup);

function phenomInfo(idx) {
  const ph = PHENOMENA[idx];
  const rows = [['Category', PHENOM_CATS[ph.cat].label.replace(/s$/, '')], ['Distance', ph.dist],
    ['RA / Dec', `${(ph.ra / 15).toFixed(2)}h / ${ph.dec.toFixed(1)}°`], ...(ph.facts || [])];
  showInfo(ph.name, ph.id, rows, ph.doc);
}

// ---------------------------------------------------------------- historical supernovae
// The great naked-eye supernovae as sky TRANSIENTS: scrub the clock to 1054 and a
// new star blazes beside ζ Tauri, outshining Venus, then fades over months on a
// simplified light curve (linear-in-magnitude rise and decline). Positions are the
// real remnant coordinates; the ephemeris upgrade (year 1000–3000) exists for this.
// Fields: name, RA°, Dec°, peakJD, peak mag, days to fade 8 mag, watch label, sub, rows, doc.
const SUPERNOVAE = [
  ['SN 1006', 225.7, -41.95, 2088580.5, -7.5, 520, 'spring 1006',
    'The brightest star event in recorded history', [['Peak brightness', 'mag −7.5 — a quarter Moon'], ['Visible', '~18 months to the naked eye'], ['Recorded in', 'China, Egypt, Iraq, Japan, Switzerland'], ['Type', 'Ia — white dwarf detonation']],
    'The brightest stellar event humans have ever recorded — bright enough to read by at night, seen low in the southern sky by chroniclers across three continents. A monk in Switzerland wrote that it "dazzled the eyes." Its shattered remains still glow in Lupus.'],
  ['SN 1054 · Crab Supernova', 83.63, 22.01, 2106216.5, -6.0, 650, 'July 1054',
    'The guest star that built the Crab Nebula', [['Peak brightness', 'mag −6 — brighter than Venus'], ['Daylight visibility', '23 days'], ['Naked-eye', '~650 nights'], ['Remnant', 'Crab Nebula + pulsar (M1)']],
    'Chinese astronomers logged a "guest star" beside ζ Tauri, visible in broad daylight for 23 days. Nine centuries later we watch its debris still expanding — the Crab Nebula — with a city-sized pulsar spinning 30 times a second at its heart.'],
  ['SN 1572 · Tycho\'s Supernova', 6.34, 64.13, 2295528.5, -4.0, 480, 'November 1572',
    'The star that broke the immutable heavens', [['Peak brightness', 'mag −4 — like Venus'], ['Observed by', 'Tycho Brahe'], ['Consequence', 'proved the heavens change'], ['Type', 'Ia']],
    'When a new star appeared in Cassiopeia, Tycho Brahe measured it obsessively and proved it lay far beyond the Moon — shattering two thousand years of doctrine that the heavens never change, and helping clear the way for the scientific revolution.'],
  ['SN 1604 · Kepler\'s Supernova', 262.66, -21.48, 2307232.5, -2.5, 400, 'October 1604',
    'The Milky Way\'s last naked-eye supernova', [['Peak brightness', 'mag −2.5 — like Jupiter'], ['Observed by', 'Johannes Kepler, for a year'], ['Note', 'none seen in our galaxy since'], ['Type', 'Ia']],
    'Kepler tracked it for a full year from Prague. No one has seen a supernova inside the Milky Way with the naked eye since — we are four centuries overdue, and somewhere in the galaxy the next one is already on its way.'],
  ['SN 1987A', 83.87, -69.27, 2446846.5, 2.9, 300, 'February 1987',
    'The supernova that opened neutrino astronomy', [['Peak brightness', 'mag +2.9 — naked-eye from the south'], ['Host', 'Large Magellanic Cloud'], ['First light', 'Feb 23, 1987'], ['Neutrinos', 'detected 3 hours before the light']],
    'The nearest supernova in four centuries, in the Large Magellanic Cloud. Underground detectors caught a burst of neutrinos hours before telescopes saw anything — the moment neutrino astronomy was born, and proof of how a star\'s core collapses.'],
];
// starburst texture: brilliant core + four diffraction rays
function makeSupernovaTexture() {
  const s = 256, cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const ctx = cv.getContext('2d'), c = s / 2;
  const core = ctx.createRadialGradient(c, c, 0, c, c, c * 0.5);
  core.addColorStop(0, 'rgba(255,255,255,1)');
  core.addColorStop(0.25, 'rgba(235,240,255,0.8)');
  core.addColorStop(1, 'rgba(180,200,255,0)');
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, s, s);
  for (const ang of [0, Math.PI / 2]) {                    // two crossed rays
    ctx.save();
    ctx.translate(c, c); ctx.rotate(ang);
    const ray = ctx.createLinearGradient(-c, 0, c, 0);
    ray.addColorStop(0, 'rgba(220,230,255,0)');
    ray.addColorStop(0.5, 'rgba(255,255,255,0.9)');
    ray.addColorStop(1, 'rgba(220,230,255,0)');
    ctx.fillStyle = ray;
    ctx.fillRect(-c, -s * 0.012, s, s * 0.024);
    ctx.restore();
  }
  return new THREE.CanvasTexture(cv);
}
const SUPERNOVAE_RT = [];
{
  const snTex = makeSupernovaTexture();
  const haloTex = makeDiscTexture('rgba(235,240,255,0.55)', 'rgba(170,190,240,0.12)', 0.4);
  for (const [name, ra, dec, peakJd, peakMag, fadeDays, watchLabel, sub, rows, doc] of SUPERNOVAE) {
    const dir = dirVec(ra, dec);
    const pos = dir.clone().multiplyScalar(R_SKY * 0.96);
    const core = new THREE.Sprite(new THREE.SpriteMaterial({
      map: snTex, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: haloTex, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    core.position.copy(pos); halo.position.copy(pos);
    core.visible = halo.visible = false;
    skyGroup.add(halo, core);
    SUPERNOVAE_RT.push({ name, ra, dec, dir, peakJd, peakMag, fadeDays, watchLabel, sub, rows, doc, core, halo, mag: 99 });
  }
}
// current apparent magnitude on the simplified light curve (99 = invisible)
function snMagAt(S, jd) {
  const t = jd - S.peakJd;
  if (t < -18 || t > S.fadeDays) return 99;
  return t < 0 ? S.peakMag + (-t / 18) * 8 : S.peakMag + (t / S.fadeDays) * 8;
}
let snWatch = null;   // active "watch it explode" session: { S, seen }
function updateSupernovae(jd) {
  for (const S of SUPERNOVAE_RT) {
    const m = S.mag = snMagAt(S, jd);
    const on = m < 6.2;
    S.core.visible = S.halo.visible = on;
    if (!on) continue;
    const scale = 15 * Math.pow(10, -0.09 * m);            // mag −7.5 → ~70 units, +3 → ~8
    const a = Math.min(1, (6.2 - m) / 3);
    S.core.scale.set(scale, scale, 1);
    S.core.material.opacity = a;
    S.halo.scale.set(scale * 2.4, scale * 2.4, 1);
    S.halo.material.opacity = a * 0.3;
  }
  // the "watch it explode" show borrows the clock at 7 d/s; hand it back at real
  // time once the star has flared AND faded — never leave the universe racing
  if (snWatch) {
    const m = snWatch.S.mag;
    if (!snWatch.seen && m < 6) snWatch.seen = true;
    else if (snWatch.seen && m > 6.2) {
      if (time.speedIdx === 9) { time.speedIdx = 5; refreshTimeUI(); }   // unless the user took over
      snWatch = null;
    }
  }
}
// card with a time-travel action: rewind to just before first light and let it blaze
function showSupernovaInfo(S) {
  showInfo(S.name, S.sub, S.rows, S.doc, null, {
    label: `⏱  Watch it explode (${S.watchLabel})`,
    fn: () => {
      time.jd = clampJD(S.peakJd - 22);
      time.speedIdx = 9;                                   // 7 days/second: rise in ~3s, months of fade
      time.running = true;
      snWatch = { S, seen: false };                        // clock returns to real time after the fade
      refreshTimeUI();
      frameSkyDir(S.dir);
    },
  });
}

// ---------------------------------------------------------------- exoplanets
// Every confirmed exoplanet system (NASA Exoplanet Archive), one soft glow per host star at
// its real sky position. A single Points cloud keeps ~4,700 systems cheap; click-picking +
// a rich card list each system's worlds (discovery method is shown in the card).
const exoGroup = new THREE.Group();
const exoDirs = [];                    // Vector3 per system, for click picking
{
  const n = EXO.length;
  const positions = new Float32Array(n * 3);
  EXO.forEach((s, i) => {
    const dir = dirVec(s.ra, s.de);
    exoDirs.push(dir);
    const p = dir.clone().multiplyScalar(R_SKY * 0.965);
    positions[i * 3] = p.x; positions[i * 3 + 1] = p.y; positions[i * 3 + 2] = p.z;
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  // soft round glow (not hard squares) in one gentle warm-gold tone, so they read as
  // "host stars with planets" highlighted over the starfield rather than a UI overlay.
  const exoDot = makeDiscTexture('rgba(255,238,210,1.0)', 'rgba(255,206,150,0.45)', 0.45);
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({
    map: exoDot, color: 0xffe0b0, size: 7.0, sizeAttenuation: false,
    transparent: true, opacity: 0.92, depthTest: false, depthWrite: false,
    blending: THREE.AdditiveBlending }));
  pts.renderOrder = 5;
  exoGroup.add(pts);
}
exoGroup.visible = false;              // off by default (toggle in the Sky panel)
skyGroup.add(exoGroup);

function exoInfo(idx) {
  const s = EXO[idx];
  const ly = s.d * 3.26156;
  const rows = [['Distance', ly < 1000 ? Math.round(ly) + ' ly' : (ly / 1000).toFixed(2) + ' kly'],
    ['Star type', s.sp || 'unknown'], ['Confirmed planets', String(s.p.length)]];
  for (const pl of s.p.slice(0, 9)) {
    const bits = [];
    if (pl.r != null) bits.push(pl.r + ' R⊕');
    if (pl.pr != null) bits.push(pl.pr + ' d');
    if (pl.t != null) bits.push(pl.t + ' K');
    rows.push([pl.n.replace(s.h, '').trim() || pl.n, bits.join(' · ') || '—']);
  }
  const methods = [...new Set(s.p.map((p) => p.m))].join(', ');
  const yrs = s.p.map((p) => +p.y).filter(Boolean);
  const hab = s.p.filter((pl) => pl.t != null && pl.t >= 180 && pl.t <= 320 && (pl.r == null || pl.r <= 1.8));
  let doc = `The ${s.h} system hosts ${s.p.length} confirmed exoplanet${s.p.length > 1 ? 's' : ''}` +
    (yrs.length ? `, found ${Math.min(...yrs)}${Math.max(...yrs) !== Math.min(...yrs) ? '–' + Math.max(...yrs) : ''} by ${methods}.` : '.');
  if (hab.length) doc += ` ${hab.map((p) => p.n).join(', ')} ${hab.length > 1 ? 'lie' : 'lies'} in the temperate "habitable zone" range where liquid water could exist.`;
  showInfo(s.h, `Exoplanet system · ${s.p.length} planet${s.p.length > 1 ? 's' : ''}`, rows, doc);
}
setLoad(0.78);

// ---------------------------------------------------------------- sky planets / sun / moon
const PLANET_COLOR = {
  Sun: '#fff3c8', Moon: '#e6e6ea', Mercury: '#b5a79b', Venus: '#f0d9a6', Mars: '#e0734f',
  Jupiter: '#e8c9a0', Saturn: '#f0e0b0', Uranus: '#9fd8de', Neptune: '#5a7de0',
  Pluto: '#cbb9aa', Earth: '#5e8fe0',
};
const SKY_BODIES = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
const SKY_BODY_PX = { Sun: 34, Moon: 30, Mercury: 8, Venus: 12, Mars: 9, Jupiter: 12, Saturn: 11, Uranus: 8, Neptune: 8, Pluto: 6 };
const skyPlanetGroup = new THREE.Group();
const skyBodies = {};
for (const name of SKY_BODIES) {
  const col = PLANET_COLOR[name];
  const disc = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeDiscTexture(col, col, 0.62), transparent: true, depthTest: false, depthWrite: false,
    sizeAttenuation: false,
  }));
  disc.userData.pxW = SKY_BODY_PX[name]; disc.userData.pxH = SKY_BODY_PX[name];
  disc.renderOrder = 6;
  const lab = makeTextSprite(name, { size: 11, color: col, alpha: 0.95 });
  lab.center.set(0.5, 1.6);
  lab.renderOrder = 7;
  skyPlanetGroup.add(disc, lab);
  labelGroups.sky.push(disc, lab);
  skyBodies[name] = { disc, lab, dir: new THREE.Vector3(1, 0, 0), raDec: { ra: 0, dec: 0, r: 1 } };
}
skyGroup.add(skyPlanetGroup);

function updateSkyBodies(jd) {
  for (const name of SKY_BODIES) {
    const b = skyBodies[name];
    let rd;
    if (name === 'Moon') { const m = moonGeo(jd); rd = { ra: m.ra, dec: m.dec, r: m.distKm / AU_KM }; }
    else rd = geoRaDec(name, jd);
    b.raDec = rd;
    b.dir.copy(dirVec(rd.ra, rd.dec));
    b.disc.position.copy(b.dir).multiplyScalar(R_SKY * 0.97);
    b.lab.position.copy(b.disc.position);
  }
}

// selection marker
const selMark = new THREE.Sprite(new THREE.SpriteMaterial({
  map: makeRingTexture('#9fd0ff'), transparent: true, opacity: 0.95, depthTest: false, depthWrite: false,
  sizeAttenuation: false,
}));
selMark.userData.pxW = 26; selMark.userData.pxH = 26;
selMark.renderOrder = 8;
selMark.visible = false;
skyGroup.add(selMark);
labelGroups.sky.push(selMark);
// matching selection ring for the 3D Stellar-Neighbourhood view (fixed-size ring around the
// picked star — so clicking just highlights it instead of recentring/jumping the camera)
const neiSelMark = new THREE.Sprite(new THREE.SpriteMaterial({
  map: makeRingTexture('#9fd0ff'), transparent: true, opacity: 0.95, depthTest: false, depthWrite: false,
  sizeAttenuation: false,
}));
neiSelMark.userData.pxW = 26; neiSelMark.userData.pxH = 26;
neiSelMark.renderOrder = 8;
neiSelMark.visible = false;
neiScene.add(neiSelMark);
labelGroups.neighborhood.push(neiSelMark);

// ---------------------------------------------------------------- horizon (alt-az) view
const horizon = { on: false, lat: 37.77, lon: -122.42 };
try {
  const saved = JSON.parse(localStorage.getItem('universe-location'));
  if (saved && isFinite(saved.lat) && isFinite(saved.lon)) Object.assign(horizon, saved);
} catch { /* fresh start */ }

const groundGroup = new THREE.Group();
groundGroup.visible = false;
skyScene.add(groundGroup);
{
  // opaque-ish dome below the horizon
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(R_SKY * 1.06, 48, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0x080c12, transparent: true, opacity: 0.96, side: THREE.BackSide }),
  );
  dome.renderOrder = 9;
  groundGroup.add(dome);
  const ringPts = [];
  for (let a = 0; a <= 360; a += 2) {
    ringPts.push(new THREE.Vector3(Math.cos(a * DEG) * R_SKY * 0.99, 0, Math.sin(a * DEG) * R_SKY * 0.99));
  }
  const ring = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(ringPts),
    new THREE.LineBasicMaterial({ color: 0x88a8cc, transparent: true, opacity: 0.5, depthTest: false }),
  );
  ring.renderOrder = 10;
  ring.frustumCulled = false;
  groundGroup.add(ring);
  const cardinals = [['N', 0, 0, -1], ['E', 1, 0, 0], ['S', 0, 0, 1], ['W', -1, 0, 0]];
  for (const [t, x, , z] of cardinals) {
    const sp = makeTextSprite(t, { size: 15, color: '#d8b46a', weight: '700', alpha: 0.95 });
    sp.position.set(x * R_SKY * 0.97, R_SKY * 0.012, z * R_SKY * 0.97);
    sp.renderOrder = 10;
    groundGroup.add(sp);
    labelGroups.sky.push(sp);
  }
}

const NIGHT_BG = new THREE.Color(0x04060c);
const DAY_BG = new THREE.Color(0x2a4f7d);
const _up = new THREE.Vector3(), _north = new THREE.Vector3(), _east = new THREE.Vector3();
const _m = new THREE.Matrix4(), _pole = new THREE.Vector3(0, 1, 0), _sunW = new THREE.Vector3();

function updateHorizonFrame(jd) {
  if (!horizon.on) {
    skyGroup.quaternion.identity();
    skyScene.background.copy(NIGHT_BG);
    return;
  }
  const lst = gmst(jd) + horizon.lon;
  _up.copy(dirVec(lst, horizon.lat));
  _north.copy(_pole).addScaledVector(_up, -_pole.dot(_up)).normalize();
  _east.crossVectors(_north, _up).normalize();
  // rows of the eq->world rotation are the world basis vectors in eq coords;
  // z = east x up = -north, so the camera faces north when looking down -z
  _m.makeBasis(_east, _up, _east.clone().cross(_up).normalize()).transpose();
  skyGroup.quaternion.setFromRotationMatrix(_m);
  // daylight tint when the Sun is above the horizon
  _sunW.copy(skyBodies.Sun.dir).applyQuaternion(skyGroup.quaternion);
  const alt = Math.asin(Math.max(-1, Math.min(1, _sunW.y))) / DEG;
  const t = Math.max(0, Math.min(1, (alt + 6) / 24));      // twilight ramp from -6 deg
  skyScene.background.lerpColors(NIGHT_BG, DAY_BG, t);
}

// ---------------------------------------------------------------- solar system scene
solScene.add(new THREE.AmbientLight(0x6a7890, 1.9));
// Ship fill light — moves with the ship so it's always illuminated
// regardless of sun angle (real cameras use a fill light too)
const shipFillLight = new THREE.PointLight(0xd8eaff, 26.0, 0);
shipFillLight.visible = false;
solScene.add(shipFillLight);
const sunLight = new THREE.PointLight(0xfff2dd, 3.2, 0, 0);
solScene.add(sunLight);

const SOL_PLANETS = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
const solBodies = {};
const solGroup = new THREE.Group();
solScene.add(solGroup);

function displayRadius(name) {
  const r = PLANET_INFO[name].radius;
  return 0.55 + 1.45 * Math.log10(r / 2400);
}

// NASA-imagery texture maps (Solar System Scope, CC BY 4.0); Pluto stays flat-colored
const PLANET_TEX = {
  Mercury: '8k_mercury.jpg', Venus: '4k_venus_atmosphere.jpg', Earth: '8k_earth_daymap.jpg',
  Mars: '8k_mars.jpg', Jupiter: '8k_jupiter.jpg', Saturn: '8k_saturn.jpg',
  Uranus: '2k_uranus.jpg', Neptune: '2k_neptune.jpg',
};
const TILT_DEG = {
  Mercury: 0.03, Venus: 177.4, Earth: 23.44, Mars: 25.19, Jupiter: 3.13,
  Saturn: 26.73, Uranus: 97.77, Neptune: 28.32, Pluto: 122.5,
};
const ROT_DAYS = {
  Mercury: 58.65, Venus: -243.02, Earth: 0.9973, Mars: 1.0260, Jupiter: 0.4135,
  Saturn: 0.4440, Uranus: -0.7183, Neptune: 0.6713, Pluto: -6.387,
};
const texLoader = new THREE.TextureLoader();
const texPromises = [];                       // every planet texture's load — awaited before the loader hides
// Progressive loading: the loading screen only waits for these 2K stand-ins (~6 MB total);
// the full-res maps (~60 MB) stream in behind the live scene and swap in seamlessly.
const TEX_SMALL = {
  '8k_mercury.jpg': '2k_mercury.jpg',
  '4k_venus_atmosphere.jpg': '2k_venus_atmosphere.jpg',
  '8k_earth_daymap.jpg': '2k_earth_daymap.jpg',
  '8k_earth_nightmap.jpg': '2k_earth_nightmap.jpg',
  '8k_earth_clouds.jpg': '2k_earth_clouds.jpg',
  '8k_mars.jpg': '2k_mars.jpg',
  '8k_jupiter.jpg': '2k_jupiter.jpg',
  '8k_saturn.jpg': '2k_saturn.jpg',
  '8k_saturn_ring_alpha.png': '2k_saturn_ring_alpha.png',
  '8k_moon.jpg': '2k_moon.jpg',
};
// upgrade fetches run one at a time so they never contend with each other, and only
// begin once the loading screen has cleared (the catalogs get the bandwidth first)
let releaseUpgrades;
let upgradeChain = new Promise((r) => { releaseUpgrades = r; });
function queueUpgrade(t, file) {
  upgradeChain = upgradeChain.then(() => new Promise((next) => {
    texLoader.load('textures/' + file,
      (hi) => { t.image = hi.image; t.needsUpdate = true; next(); },
      undefined, () => next());
  }));
}
function planetTex(file) {
  let done;
  texPromises.push(new Promise((r) => { done = r; }));
  const small = TEX_SMALL[file];
  // resolve on success OR error so one missing file can never hang the loading screen forever
  const t = texLoader.load('textures/' + (small || file),
    () => { done(); if (small) queueUpgrade(t, file); },
    undefined, () => done());
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;            // allow the animated band offset to wrap seamlessly
  return t;
}
// Per-body atmospheres — a back-side Fresnel rim shell that glows on the sun-lit
// limb and fades across the terminator (so the night limb stays dark). Bloom turns
// these into soft radiant halos. Mercury & Pluto have negligible atmospheres.
const ATMO = {
  Venus:   { color: 0xe7cf95, thick: 1.055, power: 2.3, intensity: 1.7 },
  Earth:   { color: 0x6bb4ff, thick: 1.030, power: 3.0, intensity: 1.5 },
  Mars:    { color: 0xe09666, thick: 1.022, power: 3.6, intensity: 0.55 },
  Jupiter: { color: 0xe6cda6, thick: 1.018, power: 3.2, intensity: 0.55 },
  Saturn:  { color: 0xeaddb6, thick: 1.018, power: 3.2, intensity: 0.45 },
  Uranus:  { color: 0xa6edf0, thick: 1.028, power: 3.0, intensity: 0.85 },
  Neptune: { color: 0x6a86f2, thick: 1.030, power: 3.0, intensity: 0.95 },
};
function makeAtmosphere(rd, cfg) {
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide,
    uniforms: { uColor: { value: new THREE.Color(cfg.color) }, uPower: { value: cfg.power }, uInt: { value: cfg.intensity } },
    vertexShader: `varying vec3 vWN; varying vec3 vWP;
      void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vWP = wp.xyz;
        vWN = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * wp; }`,
    fragmentShader: `precision highp float; varying vec3 vWN; varying vec3 vWP;
      uniform vec3 uColor; uniform float uPower, uInt;
      void main(){
        vec3 V = normalize(cameraPosition - vWP);
        float fres = pow(1.0 - abs(dot(V, vWN)), uPower);      // limb glow
        float day  = smoothstep(-0.30, 0.35, dot(normalize(-vWP), vWN)); // lit hemisphere (sun at origin)
        gl_FragColor = vec4(uColor * fres * uInt * day, 1.0);  // additive
      }`,
  });
  return new THREE.Mesh(new THREE.SphereGeometry(rd * cfg.thick, 48, 32), mat);
}
// Hero-Earth maps (8K, Solar System Scope CC BY 4.0). Night map drives city lights.
const earthNightTex = planetTex('8k_earth_nightmap.jpg');
const earthCloudTex = planetTex('8k_earth_clouds.jpg');
// Inject night-side emission into Earth's standard material: where the surface faces
// away from the Sun, add the city-lights map as emission (bloom then makes it glow).
function setupEarthMaterial(mat) {
  const uSunDir = { value: new THREE.Vector3(1, 0, 0) };
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uNight = { value: earthNightTex };
    sh.uniforms.uSunDir = uSunDir;
    sh.uniforms.uNightInt = { value: 2.8 };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWorldNrm;')
      .replace('#include <beginnormal_vertex>',
        '#include <beginnormal_vertex>\n  vWorldNrm = normalize(mat3(modelMatrix) * objectNormal);');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>',
        '#include <common>\nuniform sampler2D uNight; uniform vec3 uSunDir; uniform float uNightInt; varying vec3 vWorldNrm;')
      .replace('#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
         float _ndl = dot(normalize(vWorldNrm), uSunDir);
         float _night = smoothstep(0.10, -0.12, _ndl);            // 1 on the dark hemisphere
         totalEmissiveRadiance += texture2D(uNight, vMapUv).rgb * _night * uNightInt;`);
  };
  mat.needsUpdate = true;
  earthFx = { uSunDir, clouds: null };
}
// Surface relief from albedo: the cratered rocky worlds use their colour map as a
// bump map (no extra asset — brightness drives height), so craters cast real shadows
// near the terminator under the Sun's light. bumpScale is tuned per body.
const RELIEF = { Mercury: 0.030, Mars: 0.022 };   // Moon handled with its own material
const GAS_GIANTS = new Set(['Jupiter', 'Saturn', 'Uranus', 'Neptune']);
const gasBandUniform = { value: 0 };         // drives differential cloud-band drift
const sunUniform = { value: 0 };             // drives the Sun's surface shimmer
let sunFx = null;                            // { corona, glow, proms } for the dynamic Sun
let earthFx = null;                          // { uSunDir, clouds } for the hero Earth

{
  // sun — a living surface: granulation shimmer, a pulsing corona and erupting prominences
  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(2.0, 48, 32),
    new THREE.MeshBasicMaterial({ map: planetTex('2k_sun.jpg') }),
  );
  sunMesh.material.onBeforeCompile = (sh) => {
    sh.uniforms.uSunTime = sunUniform;
    // uSunTime is performance-seconds mod 1000 — stays in a safe float range regardless
    // of simulation speed, so the shimmer never breaks at high time acceleration.
    // Rotation is handled by spinning the mesh via JD (like planets), not UV scroll.
    sh.fragmentShader = 'uniform float uSunTime;\n' + sh.fragmentShader.replace(
      '#include <map_fragment>',
      `{
         vec4 sampledDiffuseColor = texture2D( map, vMapUv );
         float fl = 0.88 + 0.16 * sin(uSunTime * 2.1 + vMapUv.x * 46.0)
                               * sin(uSunTime * 1.4 + vMapUv.y * 32.0);
         diffuseColor *= sampledDiffuseColor * vec4(vec3(fl * 1.18), 1.0);
       }`);
  };
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(255,238,190,0.95)', 'rgba(255,170,80,0.25)', 0.3),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  glow.scale.set(16, 16, 1);
  // pulsing corona
  const corona = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(255,224,150,0.55)', 'rgba(255,130,55,0.0)', 0.22),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  corona.scale.set(9, 9, 1);
  solGroup.add(sunMesh, glow, corona);
  // erupting prominences anchored on the photosphere
  const promTex = makeDiscTexture('rgba(255,206,120,0.95)', 'rgba(255,80,25,0.0)', 0.18);
  const sunProms = [];
  for (let i = 0; i < 7; i++) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: promTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
    sp.userData.dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    sp.userData.phase = Math.random() * 6.283;
    // 0.007–0.016 rad/real-sec → one full cycle every 6–15 minutes of wall time.
    // With the ^8 exponent the visible spike lasts only ~5–10 real seconds per cycle.
    sp.userData.rate = 0.007 + Math.random() * 0.009;
    sunMesh.add(sp);
    sunProms.push(sp);
  }
  sunFx = { corona, glow, proms: sunProms };
  const lab = makeTextSprite('Sun', { size: 11, color: PLANET_COLOR.Sun });
  lab.center.set(0.5, 2.2);
  lab.renderOrder = 9;
  solGroup.add(lab);
  labelGroups.solar.push(lab);
  solBodies.Sun = { node: sunMesh, mesh: sunMesh, lab, pos: new THREE.Vector3() };

  for (const name of SOL_PLANETS) {
    const rd = displayRadius(name);
    const mat = PLANET_TEX[name]
      ? new THREE.MeshStandardMaterial({ map: planetTex(PLANET_TEX[name]), roughness: 0.95, metalness: 0 })
      : new THREE.MeshStandardMaterial({ color: PLANET_COLOR[name], roughness: 0.95, metalness: 0 });
    if (name === 'Earth') setupEarthMaterial(mat);    // night-side city lights
    if (RELIEF[name]) { mat.bumpMap = mat.map; mat.bumpScale = RELIEF[name]; }   // crater relief
    // gas giants: shear the cloud bands by latitude (differential rotation) so storms
    // visibly drift — fast when the clock is sped up. Keeps standard lighting intact.
    if (GAS_GIANTS.has(name)) {
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uBandTime = gasBandUniform;
        shader.fragmentShader = 'uniform float uBandTime;\n' + shader.fragmentShader.replace(
          '#include <map_fragment>',
          `{
             // gentle bounded shear: bands ripple horizontally at latitude-dependent
             // phase, so storms appear to flow without smearing the map.
             float lat = vMapUv.y;
             float wave = 0.010 * sin(lat * 12.0 + uBandTime * 1.6)
                        + 0.005 * sin(lat * 22.0 - uBandTime * 1.05);
             vec2 _uv = vMapUv + vec2(wave, 0.0);
             vec4 sampledDiffuseColor = texture2D( map, _uv );
             diffuseColor *= sampledDiffuseColor;
           }`);
      };
    }
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(rd, 48, 32), mat);
    const node = new THREE.Group();          // carries axial tilt; mesh spins inside it
    node.rotation.z = -TILT_DEG[name] * DEG;
    node.add(mesh);
    if (ATMO[name]) node.add(makeAtmosphere(rd, ATMO[name]));   // atmospheric limb halo
    if (name === 'Earth' && earthFx) {                          // drifting cloud layer
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(rd * 1.012, 64, 32),
        new THREE.MeshStandardMaterial({
          color: 0xffffff, alphaMap: earthCloudTex, transparent: true,
          depthWrite: false, roughness: 1.0, metalness: 0 }),
      );
      clouds.renderOrder = 1;
      node.add(clouds);
      earthFx.clouds = clouds;
    }
    const addRing = (innerMul, outerMul, tex) => {
      const inner = rd * innerMul, outer = rd * outerMul;
      const ringGeo = new THREE.RingGeometry(inner, outer, 96);
      const rp = ringGeo.attributes.position, ruv = ringGeo.attributes.uv;
      for (let k = 0; k < rp.count; k++) {
        const rr = Math.hypot(rp.getX(k), rp.getY(k));
        ruv.setXY(k, (rr - inner) / (outer - inner), 0.5);
      }
      ruv.needsUpdate = true;
      const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
        map: tex, side: THREE.DoubleSide, transparent: true, depthWrite: false,
      }));
      ring.rotation.x = Math.PI / 2;
      node.add(ring);
    };
    if (name === 'Saturn') addRing(1.24, 2.27, planetTex('8k_saturn_ring_alpha.png'));
    // the ice giants have real ring systems too — narrow, dark, and (at Uranus)
    // nearly pole-on thanks to the 98° axial tilt. Bands at true radii, kept faint.
    if (name === 'Uranus' || name === 'Neptune') {
      const bands = name === 'Uranus'
        // t across 1.60–2.06 R: the nine narrow rings, ε by far the brightest
        ? { span: [1.60, 2.06], rows: [[1.637, 0.005, 0.14], [1.652, 0.005, 0.12], [1.666, 0.005, 0.12],
            [1.750, 0.006, 0.16], [1.786, 0.006, 0.14], [1.834, 0.006, 0.18], [1.863, 0.006, 0.16],
            [1.900, 0.007, 0.18], [2.006, 0.014, 0.5]], tint: [214, 220, 228] }
        // Galle (broad, whisper-faint), Le Verrier, Lassell sheet, Adams
        : { span: [1.65, 2.60], rows: [[1.69, 0.09, 0.05], [2.15, 0.007, 0.15], [2.30, 0.28, 0.035],
            [2.54, 0.008, 0.19]], tint: [206, 214, 224] };
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 4;
      const ctx = cv.getContext('2d');
      const [s0, s1] = bands.span, [tr, tg, tb] = bands.tint;
      for (const [radR, widR, a] of bands.rows) {
        const x = ((radR - s0) / (s1 - s0)) * 512, w = Math.max(1.5, (widR / (s1 - s0)) * 512);
        const g = ctx.createLinearGradient(x - w, 0, x + w, 0);
        g.addColorStop(0, `rgba(${tr},${tg},${tb},0)`);
        g.addColorStop(0.5, `rgba(${tr},${tg},${tb},${a})`);
        g.addColorStop(1, `rgba(${tr},${tg},${tb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(x - w, 0, w * 2, 4);
      }
      addRing(bands.span[0], bands.span[1], new THREE.CanvasTexture(cv));
    }
    const lab = makeTextSprite(name, { size: 11, color: PLANET_COLOR[name] });
    lab.center.set(0.5, 2.0);
    lab.renderOrder = 9;
    solGroup.add(node, lab);
    labelGroups.solar.push(lab);
    solBodies[name] = { node, mesh, lab, pos: new THREE.Vector3() };
  }

  // Moon — a real body orbiting Earth. Real direction from lunar theory; orbital
  // distance exaggerated (like the planet radii) so it reads clearly at this scale.
  const moonRd = displayRadius('Moon');
  const moonTex = planetTex('8k_moon.jpg');       // 8K — you fly close to it
  const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(moonRd, 128, 96),    // higher tessellation for close-up + bump relief
    new THREE.MeshStandardMaterial({ map: moonTex, bumpMap: moonTex, bumpScale: 0.045, roughness: 1.0, metalness: 0 }),
  );
  const moonNode = new THREE.Group();
  moonNode.rotation.z = -6.68 * DEG;             // lunar axial tilt
  moonNode.add(moonMesh);
  const moonLab = makeTextSprite('Moon', { size: 10, color: PLANET_COLOR.Moon });
  moonLab.center.set(0.5, 2.0);
  moonLab.renderOrder = 9;
  // faint orbit ring around Earth, rebuilt each frame for the current separation
  const moonOrbit = new THREE.Line(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: new THREE.Color(PLANET_COLOR.Moon), transparent: true, opacity: 0.22 }),
  );
  moonOrbit.frustumCulled = false;
  solGroup.add(moonNode, moonLab, moonOrbit);
  labelGroups.solar.push(moonLab);
  solBodies.Moon = { node: moonNode, mesh: moonMesh, lab: moonLab, orbit: moonOrbit, pos: new THREE.Vector3() };
}
const MOON_DISP = 2.4;                            // exaggerated Earth–Moon display separation (world units)

// ---------------------------------------------------------------- planetary moons
// Major natural satellites on real circular orbits (true semi-major axis ratio and
// orbital period), placed in each planet's tilted equatorial plane. Distances are
// log-compressed so even far moons stay framed with their planet.
// [parent, name, a_km, period_days, radius_km, colorHex, retrograde]
const MOONS = [
  ['Mars', 'Phobos', 9376, 0.319, 11, '#9c8b7a', 0],
  ['Mars', 'Deimos', 23463, 1.263, 6, '#a89684', 0],
  ['Jupiter', 'Io', 421700, 1.769, 1822, '#e8d96b', 0],
  ['Jupiter', 'Europa', 671034, 3.551, 1561, '#d8cdb0', 0],
  ['Jupiter', 'Ganymede', 1070412, 7.155, 2634, '#b8a890', 0],
  ['Jupiter', 'Callisto', 1882709, 16.689, 2410, '#7a7068', 0],
  ['Saturn', 'Mimas', 185539, 0.942, 198, '#b8b4ac', 0],
  ['Saturn', 'Enceladus', 237948, 1.370, 252, '#f0f0f0', 0],
  ['Saturn', 'Tethys', 294619, 1.888, 531, '#cfcabf', 0],
  ['Saturn', 'Dione', 377396, 2.737, 561, '#c4bdb0', 0],
  ['Saturn', 'Rhea', 527108, 4.518, 764, '#bcb4a6', 0],
  ['Saturn', 'Titan', 1221870, 15.945, 2575, '#e0a85c', 0],
  ['Saturn', 'Iapetus', 3560820, 79.32, 734, '#8a7d68', 0],
  ['Uranus', 'Miranda', 129390, 1.413, 236, '#9fb0b8', 0],
  ['Uranus', 'Ariel', 190900, 2.520, 579, '#b3c2c8', 0],
  ['Uranus', 'Umbriel', 266000, 4.144, 585, '#8b999f', 0],
  ['Uranus', 'Titania', 435910, 8.706, 789, '#aeb9bf', 0],
  ['Uranus', 'Oberon', 583520, 13.463, 761, '#9aa6ab', 0],
  ['Neptune', 'Triton', 354759, 5.877, 1353, '#cdd6dc', 1],   // retrograde
  ['Neptune', 'Proteus', 117647, 1.122, 210, '#7e8a90', 0],
  ['Pluto', 'Charon', 19591, 6.387, 606, '#b6a99a', 0],
];
const moonDispRadius = (rKm) => Math.max(0.045, Math.min(0.55, 0.045 + 0.16 * Math.log10(rKm / 150)));
// moons ship without real photo maps, so synthesise a plausible surface: base colour
// + mottling + craters, with style hints (icy = bright & smooth, volcanic = blotchy Io).
const MOON_STYLE = { Io: 'volcanic', Europa: 'icy', Enceladus: 'icy', Titan: 'hazy',
  Triton: 'icy', Mimas: 'icy', Tethys: 'icy', Dione: 'icy' };
function makeMoonTexture(hex, style) {
  const w = 384, h = 192, c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const base = new THREE.Color(hex);
  const rgb = (col, a = 1) => `rgba(${col.r * 255 | 0},${col.g * 255 | 0},${col.b * 255 | 0},${a})`;
  ctx.fillStyle = rgb(base); ctx.fillRect(0, 0, w, h);
  const blobs = style === 'icy' ? 55 : 130;
  for (let i = 0; i < blobs; i++) {
    const x = Math.random() * w, y = Math.random() * h, r = 4 + Math.random() * 24;
    const dl = (Math.random() - 0.5) * (style === 'volcanic' ? 0.55 : 0.22);
    const dh = style === 'volcanic' ? (Math.random() - 0.5) * 0.08 : 0;
    const col = base.clone().offsetHSL(dh, style === 'icy' ? -0.05 : 0, dl);
    ctx.fillStyle = rgb(col, 0.5);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  }
  if (style === 'hazy') {                          // Titan: smooth orange haze, few features
    ctx.fillStyle = rgb(base.clone().offsetHSL(0, 0, 0.06), 0.25);
    ctx.fillRect(0, 0, w, h);
  } else {
    const craters = style === 'icy' ? 10 : 30;
    for (let i = 0; i < craters; i++) {
      const x = Math.random() * w, y = Math.random() * h, r = 2 + Math.random() * 9;
      ctx.fillStyle = 'rgba(0,0,0,0.20)'; ctx.beginPath(); ctx.arc(x + 1, y + 1, r, 0, 6.2832); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.10)'; ctx.beginPath(); ctx.arc(x - 0.6, y - 0.6, r * 0.8, 0, 6.2832); ctx.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const MOONS_RT = [];                             // runtime list { mesh, world, dispR, ... } for update/pick/collide
const moonObjs = [];                             // all moon meshes/orbits/labels for the visibility toggle
{
  for (const [parent, name, aKm, period, rKm, col, retro] of MOONS) {
    const pInfo = solBodies[parent];
    const pDisp = displayRadius(parent);
    const rel = aKm / PLANET_INFO[parent].radius;
    const orbitR = pDisp * (1.8 + 2.2 * Math.log10(1 + rel));
    const dispR = moonDispRadius(rKm);
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(dispR, 20, 14),
      new THREE.MeshStandardMaterial({ map: makeMoonTexture(col, MOON_STYLE[name] || 'rocky'), roughness: 1.0, metalness: 0 }),
    );
    pInfo.node.add(mesh);                         // inherits planet position + axial tilt
    // orbit ring in the planet's equatorial plane
    const pts = [];
    for (let i = 0; i <= 80; i++) { const a = (i / 80) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * orbitR, 0, Math.sin(a) * orbitR)); }
    const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: new THREE.Color(col), transparent: true, opacity: 0.18 }));
    ring.frustumCulled = false;
    pInfo.node.add(ring);
    const lab = makeTextSprite(name, { size: 8.5, color: col, alpha: 0.8 });
    lab.center.set(0.5, 1.8);
    lab.renderOrder = 9;
    solGroup.add(lab);
    labelGroups.solar.push(lab);
    const rt = { parent, name, mesh, ring, lab, orbitR, period, retro: retro ? -1 : 1,
      dispR, world: new THREE.Vector3() };
    MOONS_RT.push(rt);
    moonObjs.push(mesh, ring, lab);
  }
}
let moonsVisible = true;
function updatePlanetMoons(jd) {
  for (const mo of MOONS_RT) {
    const ang = mo.retro * (jd - J2000) / mo.period * Math.PI * 2;
    mo.mesh.position.set(Math.cos(ang) * mo.orbitR, 0, Math.sin(ang) * mo.orbitR);
    mo.mesh.getWorldPosition(mo.world);
    mo.lab.position.copy(mo.world);
  }
}

// ---------------------------------------------------------------- Earth satellites & lunar sites
// Representative real spacecraft on exaggerated display orbits (true orbital shells
// would sit on Earth's surface at this scale). A swarm conveys the thousands of others.
// [name, shell, inclDeg, color, doc]   shell: leo|meo|geo|deep
// [name, shell, inclination°, color, doc, periodSeconds, altKm]
// Periods are real values: ISS = 92.68 min, GPS = 11.97 hr, GEO = 23.934 hr sidereal, etc.
const SATELLITES = [
  ['ISS',                  'leo',  51.64,  '#9fe8ff', 'The International Space Station — a continuously crewed laboratory orbiting at ~420 km. It completes ~15.5 orbits per day.',                                           5561,   420],
  ['Hubble Space Telescope','leo', 28.47,  '#cfe0ff', 'Launched 1990; orbits at ~535 km (~95 min period) and has transformed astronomy with deep-field images of the early universe.',                                      5712,   535],
  ['Tiangong',             'leo',  41.58,  '#ffd9a0', "China's modular space station, crewed since 2021, at ~390 km (~92 min period).",                                                                                    5508,   390],
  ['Landsat 9',            'leo',  98.20,  '#bfe8c0', 'A near-polar sun-synchronous Earth-imaging satellite at ~705 km (~99 min period), continuing a 50-year global land-cover record.',                                   5943,   705],
  ['GPS',                  'meo',  55.0,   '#ffe98f', 'The Global Positioning System — 31 active satellites in medium Earth orbit at ~20,200 km with an exact 11 h 58 min period (half a sidereal day).',                  43082, 20200],
  ['GOES Weather',         'geo',   0.0,   '#a0d8ff', 'A geostationary weather satellite at ~35,786 km. Its 23 h 56 min sidereal period exactly matches Earth\'s rotation, so it hovers over one spot.',                   86164, 35786],
  ['Intelsat',             'geo',   0.1,   '#d0c0ff', 'A geostationary communications satellite in the crowded Clarke belt at ~35,786 km. The 0.1° inclination is typical of station-keeping drift.',                      86164, 35786],
  ['JWST',                 'deep',  5.0,   '#ffd0b0', 'The James Webb Space Telescope orbits Sun–Earth L2 ~1.5 million km out on a 6-month halo orbit. Shown here with its actual ~180-day period.',                     15552000, 1500000],
];
const SAT_SHELL = { leo: 1.45, meo: 2.5, geo: 3.7, deep: 9 };
const SATS_RT = [];
const satObjs = [];
let satsVisible = true;
let satClockJd = null;                            // tracks sim time so satellites obey pause/speed
let simSecClock = 0;                              // accumulated sim-seconds for sun/cloud animation
{
  const eNode = solBodies.Earth.node, eDisp = displayRadius('Earth');
  const satTex = makeDiscTexture('rgba(220,240,255,0.95)', 'rgba(150,190,255,0.2)', 0.4);
  for (const [name, shell, inc, col, doc, periodSec, altKm] of SATELLITES) {
    const R = eDisp * SAT_SHELL[shell];
    // orbit basis: incline the plane and give it a random ascending node
    const Om = Math.random() * Math.PI * 2, ci = Math.cos(inc * DEG), si = Math.sin(inc * DEG);
    const u = new THREE.Vector3(Math.cos(Om), 0, Math.sin(Om));
    const v = new THREE.Vector3(-Math.sin(Om) * ci, si, Math.cos(Om) * ci);
    const mark = new THREE.Sprite(new THREE.SpriteMaterial({
      map: satTex, transparent: true, depthTest: true, depthWrite: false, sizeAttenuation: false,
    }));
    mark.scale.set(0.012, 0.012, 1);
    mark.userData.noLabelScale = true;
    eNode.add(mark);
    const lab = makeTextSprite(name, { size: 8, color: col, alpha: 0.85 });
    lab.center.set(0.5, 1.8); lab.renderOrder = 9;
    solGroup.add(lab);
    labelGroups.solar.push(lab);
    // Real angular velocity: 2π / real orbital period (rad per sim-second)
    const speed = (2 * Math.PI) / periodSec;
    SATS_RT.push({ name, R, u, v, phase: Math.random() * 6.283, speed, mark, lab, doc, altKm,
      world: new THREE.Vector3(), shell });
    satObjs.push(mark, lab);
  }
  // GEO ring guide
  const geoR = eDisp * SAT_SHELL.geo, gp = [];
  for (let i = 0; i <= 96; i++) { const a = i / 96 * 6.283; gp.push(new THREE.Vector3(Math.cos(a) * geoR, 0, Math.sin(a) * geoR)); }
  const geoRing = new THREE.Line(new THREE.BufferGeometry().setFromPoints(gp),
    new THREE.LineBasicMaterial({ color: 0x6f8fc0, transparent: true, opacity: 0.16 }));
  geoRing.frustumCulled = false; eNode.add(geoRing); satObjs.push(geoRing);
  // swarm: hundreds of nameless satellites to convey real orbital density
  const SW = 600, sp = new Float32Array(SW * 3), sBasis = [];
  for (let i = 0; i < SW; i++) {
    const shell = Math.random() < 0.8 ? 'leo' : (Math.random() < 0.6 ? 'meo' : 'geo');
    const R = eDisp * SAT_SHELL[shell] * (0.9 + Math.random() * 0.2);
    const inc = (shell === 'geo' ? Math.random() * 3 : Math.random() * 100) * DEG;
    const Om = Math.random() * 6.283, ci = Math.cos(inc), si = Math.sin(inc);
    sBasis.push({ R, u: new THREE.Vector3(Math.cos(Om), 0, Math.sin(Om)),
      v: new THREE.Vector3(-Math.sin(Om) * ci, si, Math.cos(Om) * ci),
      // Kepler: T ∝ a^1.5; anchor to real ISS period (5561 s at 420 km → eDisp*1.45)
      // speed = 2π / T = 2π / (5561 × (R / (eDisp*1.45))^1.5)
      phase: Math.random() * 6.283, speed: (2 * Math.PI) / (5561 * Math.pow(R / (eDisp * 1.45), 1.5)) });
  }
  const swarmGeo = new THREE.BufferGeometry();
  swarmGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const swarm = new THREE.Points(swarmGeo, new THREE.PointsMaterial({
    color: 0xaecaf0, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.7, depthWrite: false }));
  swarm.frustumCulled = false; eNode.add(swarm); satObjs.push(swarm);
  SATS_RT._swarm = { geo: swarmGeo, basis: sBasis, pos: sp };
}
// dSim = simulation-seconds elapsed since last frame, so satellites obey the time
// controls (freeze when paused, race when sped up) like everything else.
function updateSatellites(dSim) {
  for (const s of SATS_RT) {
    s.phase = (s.phase + dSim * s.speed) % 6.2831853;
    const a = s.phase;
    s.mark.position.copy(s.u).multiplyScalar(Math.cos(a) * s.R).addScaledVector(s.v, Math.sin(a) * s.R);
    s.mark.getWorldPosition(s.world);
    s.lab.position.copy(s.world);
  }
  const sw = SATS_RT._swarm;
  if (sw) {
    for (let i = 0; i < sw.basis.length; i++) {
      const b = sw.basis[i];
      b.phase = (b.phase + dSim * b.speed) % 6.2831853;
      const a = b.phase;
      const x = b.u.x * Math.cos(a) * b.R + b.v.x * Math.sin(a) * b.R;
      const y = b.u.y * Math.cos(a) * b.R + b.v.y * Math.sin(a) * b.R;
      const z = b.u.z * Math.cos(a) * b.R + b.v.z * Math.sin(a) * b.R;
      sw.pos[i * 3] = x; sw.pos[i * 3 + 1] = y; sw.pos[i * 3 + 2] = z;
    }
    sw.geo.attributes.position.needsUpdate = true;
  }
}

// lunar surface markers: human landing sites & rovers, placed on the Moon by lat/lon
const LUNAR_SITES = [
  ['Apollo 11', 0.67, 23.47, 'First crewed Moon landing, July 1969 — Armstrong & Aldrin, Sea of Tranquility.'],
  ['Apollo 12', -3.01, -23.42, 'Second landing, Nov 1969; touched down beside the Surveyor 3 probe.'],
  ['Apollo 14', -3.65, -17.47, 'Feb 1971 — Shepard & Mitchell explored Fra Mauro.'],
  ['Apollo 15', 26.13, 3.63, 'July 1971 — first to carry the Lunar Roving Vehicle, at Hadley Rille.'],
  ['Apollo 16', -8.97, 15.50, 'April 1972 — Descartes Highlands, with the rover.'],
  ['Apollo 17', 20.19, 30.77, 'Last crewed landing, Dec 1972 — Taurus–Littrow, longest stay & rover drive.'],
  ['Luna 17 · Lunokhod 1', 38.28, -35.0, "The Soviet Union's first robotic Moon rover, 1970."],
  ['Chang’e 3 · Yutu', 44.12, -19.51, 'China’s first lunar rover, 2013, in Mare Imbrium.'],
  ['Chang’e 4 · Yutu-2', -45.5, 177.6, 'First-ever landing on the Moon’s far side, 2019.'],
  ['Luna 2', 29.1, 0.0, 'First human-made object to reach the Moon (impact), 1959.'],
];
const LUNAR_RT = [];
const lunarObjs = [];
{
  const moonNode = solBodies.Moon.node, moonRd = displayRadius('Moon');
  const siteTex = makeMarkerTexture('#ffd27f');
  for (const [name, lat, lon, doc] of LUNAR_SITES) {
    const la = lat * DEG, lo = lon * DEG;
    const p = new THREE.Vector3(Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo))
      .multiplyScalar(moonRd * 1.02);
    const mark = new THREE.Sprite(new THREE.SpriteMaterial({
      map: siteTex, transparent: true, depthTest: false, depthWrite: false, sizeAttenuation: false }));
    mark.position.copy(p); mark.scale.set(0.011, 0.011, 1); mark.renderOrder = 10;
    moonNode.add(mark);
    const lab = makeTextSprite(name, { size: 8, color: '#ffd27f', alpha: 0.9 });
    lab.center.set(0.5, 1.7); lab.renderOrder = 11;
    solGroup.add(lab);
    labelGroups.solar.push(lab);
    LUNAR_RT.push({ name, doc, mark, lab, lat, lon, world: new THREE.Vector3() });
    lunarObjs.push(mark, lab);
  }
}
function updateLunarSites() {
  for (const s of LUNAR_RT) { s.mark.getWorldPosition(s.world); s.lab.position.copy(s.world); }
}


// ---------------------------------------------------------------- megastructures
// Six speculative/hypothetical structures shown in the Solar System view.
// Toggled individually via the Controls panel; clickable for info cards.
const megaGroup = new THREE.Group();
solScene.add(megaGroup);

const MEGA_MAT = (color, o = {}) => new THREE.MeshStandardMaterial({
  color, metalness: o.m ?? 0.6, roughness: o.r ?? 0.45,
  emissive: new THREE.Color(color).multiplyScalar(o.ei ?? 0),
  transparent: o.t ?? false, opacity: o.op ?? 1,
  side: o.side ?? THREE.FrontSide,
});
const MEGA_WIRE = (color, op = 0.35) => new THREE.MeshBasicMaterial({
  color, wireframe: true, transparent: true, opacity: op,
});

// ---- 1. Dyson Sphere around the Sun ----
const dysonGroup = new THREE.Group();
{
  const r = 6.5; // between Sun visual radius (~4 WU) and Earth orbit (20 WU)
  // outer wireframe shell
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(r, 32, 20),
    MEGA_WIRE(0xffcc44, 0.18),
  );
  // inner glowing surface (sunward side lit)
  const inner = new THREE.Mesh(
    new THREE.SphereGeometry(r * 0.995, 32, 20),
    MEGA_MAT(0xffa020, { m: 0, r: 1, ei: 0.25, t: true, op: 0.12, side: THREE.BackSide }),
  );
  // equatorial collector ring
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(r, 0.08, 8, 80),
    MEGA_MAT(0xffdd80, { m: 0.85, r: 0.2, ei: 0.4 }),
  );
  ring.rotation.x = Math.PI / 2;
  // polar emitter rings
  for (const ang of [0.55, -0.55]) {
    const pr = new THREE.Mesh(
      new THREE.TorusGeometry(r * Math.cos(ang), 0.05, 8, 60),
      MEGA_MAT(0xffcc66, { m: 0.8, r: 0.3, ei: 0.35 }),
    );
    pr.rotation.x = Math.PI / 2;
    pr.position.y = r * Math.sin(ang);
    dysonGroup.add(pr);
  }
  dysonGroup.add(shell, inner, ring);
  dysonGroup.userData.info = {
    name: 'Dyson Sphere',
    sub: 'Speculative megastructure',
    rows: [['Radius', '0.33 AU'], ['Output', '3.8 × 10²⁶ W (total Solar)'], ['Type', 'Stellar energy collector'], ['Concept', 'Freeman Dyson, 1960']],
    doc: 'A hypothetical shell enclosing a star to capture its entire energy output. Freeman Dyson proposed this in 1960 as a marker of a K-II civilization on the Kardashev scale. In practice, a rigid shell is mechanically unstable — most proposals use a swarm of independent orbiting collectors.',
  };
}
megaGroup.add(dysonGroup);

// ---- 2. Solar Sail (follows Earth, sunward offset) ----
const solarSailGroup = new THREE.Group();
{
  const S = 1.1;  // half-size of the sail
  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xd4e8ff, metalness: 0.95, roughness: 0.05,
    emissive: new THREE.Color(0x88bbff), emissiveIntensity: 0.12,
    side: THREE.DoubleSide, transparent: true, opacity: 0.82,
  });
  const sail = new THREE.Mesh(new THREE.PlaneGeometry(S * 2, S * 2, 6, 6), sailMat);
  sail.rotation.y = Math.PI / 2;
  // boom/rigging lines
  const lineMat = new THREE.LineBasicMaterial({ color: 0x8899bb, transparent: true, opacity: 0.7 });
  const addLine = (pts) => solarSailGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
  addLine([new THREE.Vector3(0, 0, 0.12), new THREE.Vector3(0, S, 0)]);
  addLine([new THREE.Vector3(0, 0, 0.12), new THREE.Vector3(0, -S, 0)]);
  addLine([new THREE.Vector3(0, 0, 0.12), new THREE.Vector3(0, 0, S)]);
  addLine([new THREE.Vector3(0, 0, 0.12), new THREE.Vector3(0, 0, -S)]);
  // small payload bus
  const bus = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.06, 0.18),
    MEGA_MAT(0x99aacc, { m: 0.75, r: 0.3, ei: 0.2 }),
  );
  bus.position.set(0, 0, 0.12);
  solarSailGroup.add(sail, bus);
  solarSailGroup.userData.info = {
    name: 'Solar Sail',
    sub: 'Light-propelled spacecraft',
    rows: [['Sail area', '~1.2 km²'], ['Acceleration', '~0.1 mm/s² at 1 AU'], ['Propellant', 'None — photon pressure'], ['Example', 'IKAROS (JAXA, 2010)']],
    doc: 'A solar sail uses radiation pressure from sunlight to accelerate without propellant. The sail is shown here near Earth—Sun L1, where continuous sunward sunlight provides maximum thrust. The thin reflective membrane must be only micrometres thick — thinner than a human hair.',
  };
}
megaGroup.add(solarSailGroup);

// ---- 3. O'Neill Cylinder (at Earth L4, 60° ahead) ----
const oneillGroup = new THREE.Group();
{
  const R = 0.22, L = 0.95;
  // paired cylinders (Island Three design: two counter-rotating)
  const cylMat = MEGA_MAT(0x8899bb, { m: 0.7, r: 0.35, ei: 0.15, t: true, op: 0.88 });
  const windowMat = new THREE.MeshBasicMaterial({ color: 0x66aaff, transparent: true, opacity: 0.5 });
  for (const side of [-1, 1]) {
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(R, R, L, 36, 1, true), cylMat);
    const cap1 = new THREE.Mesh(new THREE.CircleGeometry(R, 36), MEGA_MAT(0x6677aa, { m: 0.6, r: 0.4, ei: 0.2 }));
    const cap2 = cap1.clone();
    cap1.position.y = L / 2; cap1.rotation.x = Math.PI / 2;
    cap2.position.y = -L / 2; cap2.rotation.x = -Math.PI / 2;
    // stripe windows along the body
    for (let i = 0; i < 6; i++) {
      const strip = new THREE.Mesh(
        new THREE.CylinderGeometry(R + 0.003, R + 0.003, 0.04, 36, 1, true),
        windowMat,
      );
      strip.position.y = (i - 2.5) * (L / 6.5);
      cyl.add(strip);
    }
    const sub = new THREE.Group();
    sub.add(cyl, cap1, cap2);
    sub.position.x = side * (R + 0.12);
    oneillGroup.add(sub);
  }
  // connecting struts
  for (let i = 0; i < 3; i++) {
    const ang = (i / 3) * Math.PI * 2;
    const strut = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, (R + 0.12) * 2, 8),
      MEGA_MAT(0x778899, { m: 0.7, r: 0.4 }),
    );
    strut.rotation.z = Math.PI / 2;
    strut.position.y = (i - 1) * (L * 0.35);
    oneillGroup.add(strut);
  }
  oneillGroup.userData.info = {
    name: "O'Neill Cylinder",
    sub: 'Rotating space habitat',
    rows: [['Length', '32 km (1:32 scale shown)'], ['Diameter', '8 km'], ['Population', 'Up to ~10,000'], ['Concept', "Gerard K. O'Neill, 1976"]],
    doc: "Proposed by physicist Gerard K. O'Neill in The High Frontier (1976), an O'Neill cylinder is a pair of counter-rotating cylinders providing artificial gravity through centripetal acceleration. The habitats sit at Earth's L4 or L5 Lagrange points, stable gravitational parking spots. Interior sunlight is reflected in through long windows running the length of the cylinder.",
  };
}
megaGroup.add(oneillGroup);

// ---- 4. Space Elevator (tethered to Earth, updates each frame) ----
const elevatorGroup = new THREE.Group();
{
  const cableMat = new THREE.LineBasicMaterial({ color: 0x88ccff, transparent: true, opacity: 0.75 });
  const cable = new THREE.Line(new THREE.BufferGeometry(), cableMat);
  cable.userData.isCable = true;
  // counterweight
  const cwt = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.07),
    MEGA_MAT(0x99bbdd, { m: 0.8, r: 0.3, ei: 0.3 }),
  );
  // transfer station (midpoint)
  const station = new THREE.Mesh(
    new THREE.TorusGeometry(0.09, 0.025, 8, 24),
    MEGA_MAT(0x8899cc, { m: 0.75, r: 0.3, ei: 0.25 }),
  );
  station.rotation.x = Math.PI / 2;
  // climber car
  const climber = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.04, 0.08),
    MEGA_MAT(0xeebb44, { m: 0.8, r: 0.25, ei: 0.4 }),
  );
  elevatorGroup.add(cable, cwt, station, climber);
  elevatorGroup.userData.cable = cable;
  elevatorGroup.userData.cwt = cwt;
  elevatorGroup.userData.station = station;
  elevatorGroup.userData.climber = climber;
  elevatorGroup.userData.info = {
    name: 'Space Elevator',
    sub: 'Carbon-nanotube tether',
    rows: [['Cable length', '~100,000 km'], ['Anchor', 'Earth equator'], ['Counterweight', 'GEO+'], ['Material', 'Carbon nanotubes (theoretical)']],
    doc: "A space elevator is a cable anchored at the equator and extending to a counterweight beyond geostationary orbit. Climbers ascend and descend the cable, delivering payloads to orbit at a fraction of rocket costs. The concept requires a cable material with specific strength far exceeding any currently known material — carbon nanotubes are the leading candidate.",
  };
}
megaGroup.add(elevatorGroup);

// ---- 5. Alcubierre Warp Drive (near Mars) ----
const warpGroup = new THREE.Group();
{
  // warp bubble ring
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x6633ff, metalness: 0.3, roughness: 0.2,
    emissive: new THREE.Color(0x3311aa), emissiveIntensity: 0.9,
    transparent: true, opacity: 0.85,
  });
  const outer = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.045, 18, 64), ringMat);
  const inner = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.028, 14, 64),
    new THREE.MeshStandardMaterial({ color: 0x9955ff, emissive: new THREE.Color(0x5522cc), emissiveIntensity: 0.8, transparent: true, opacity: 0.7 }));
  // bubble distortion sphere
  const bubble = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 32, 20),
    new THREE.MeshBasicMaterial({ color: 0x2200aa, transparent: true, opacity: 0.08, side: THREE.DoubleSide }),
  );
  // ship inside
  const shipInside = new THREE.Mesh(
    new THREE.ConeGeometry(0.035, 0.18, 10),
    MEGA_MAT(0xccddff, { m: 0.8, r: 0.2, ei: 0.5 }),
  );
  shipInside.rotation.x = Math.PI / 2;
  // space-time grid lines around the bubble
  const gridMat = new THREE.LineBasicMaterial({ color: 0x4422cc, transparent: true, opacity: 0.3 });
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2;
    const pts = [];
    for (let j = 0; j <= 40; j++) {
      const t = (j / 40 - 0.5) * 1.4;
      const warp = 0.12 * Math.exp(-t * t * 3.5) * Math.cos(i * 0.4);
      pts.push(new THREE.Vector3(t * 0.9, Math.cos(ang) * 0.38 + warp * Math.cos(ang), Math.sin(ang) * 0.38 + warp * Math.sin(ang)));
    }
    warpGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
  }
  warpGroup.add(outer, inner, bubble, shipInside);
  warpGroup.userData.info = {
    name: 'Alcubierre Warp Drive',
    sub: 'Exotic-matter spacetime warp',
    rows: [['Concept', 'Miguel Alcubierre, 1994'], ['Speed', 'FTL (in principle)'], ['Energy', '~10⁶⁴ J (exotic matter)'], ['Status', 'Theoretical only']],
    doc: "Physicist Miguel Alcubierre showed in 1994 that Einstein's equations permit a solution where a 'warp bubble' compresses space ahead of a ship and expands it behind — moving the ship faster than light without locally violating relativity. The catch: it requires negative-energy 'exotic matter' in quantities far beyond anything known, and causality problems remain unsolved.",
  };
  warpGroup.userData.rings = [outer, inner];
}
megaGroup.add(warpGroup);

// ---- 6. Generation Ship (heading outward from the inner system) ----
const genShipGroup = new THREE.Group();
{
  const hull = MEGA_MAT(0x7788aa, { m: 0.65, r: 0.4, ei: 0.18 });
  const dark = MEGA_MAT(0x445566, { m: 0.55, r: 0.5, ei: 0.1 });
  const glow = MEGA_MAT(0x44aaff, { m: 0, r: 1, ei: 1.0 });
  const solar = MEGA_MAT(0x334466, { m: 0.4, r: 0.5, ei: 0.08 });
  const cyl = (rt, rb, h, s = 18) => new THREE.CylinderGeometry(rt, rb, h, s);
  const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  const add = (geo, mat, x, y, z, rx, ry, rz) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x || 0, y || 0, z || 0);
    if (rx) m.rotation.x = rx; if (ry) m.rotation.y = ry; if (rz) m.rotation.z = rz;
    genShipGroup.add(m); return m;
  };
  // main spine (horizontal, nose +x)
  add(cyl(0.06, 0.08, 2.2, 20), hull, 0, 0, 0, 0, 0, Math.PI / 2);  // spine tube
  // habitat rings (rotating tori around the spine)
  for (const x of [-0.3, 0.2, 0.7]) {
    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.07, 10, 40), hull);
    torus.rotation.y = Math.PI / 2;
    torus.position.x = x;
    torus.userData.spinRing = true;
    genShipGroup.add(torus);
    // spoke connectors
    for (let i = 0; i < 4; i++) {
      const ang = (i / 4) * Math.PI * 2;
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.31, 6), dark);
      spoke.position.set(x, Math.sin(ang) * 0.19, Math.cos(ang) * 0.19);
      spoke.rotation.z = ang + Math.PI / 2;
      genShipGroup.add(spoke);
    }
  }
  // nose section — crew command
  add(new THREE.SphereGeometry(0.12, 18, 12), hull, 1.15, 0, 0);
  add(cyl(0.08, 0.12, 0.25, 18), hull, 0.97, 0, 0, 0, 0, Math.PI / 2);
  // solar panel arrays
  for (const side of [-1, 1]) {
    for (const xp of [0.1, 0.65]) {
      add(box(0.04, 0.6, 0.26), solar, xp, side * 0.52, 0);
    }
  }
  // engine section — cluster of nozzles at the back
  add(cyl(0.22, 0.15, 0.22, 20), dark, -1.1, 0, 0, 0, 0, Math.PI / 2);
  for (let i = 0; i < 7; i++) {
    const ang = i === 0 ? 0 : ((i - 1) / 6) * Math.PI * 2;
    const nr = i === 0 ? 0 : 0.11;
    const nozzle = new THREE.Mesh(cyl(0.04, 0.06, 0.14, 12), dark);
    nozzle.position.set(-1.22, Math.sin(ang) * nr, Math.cos(ang) * nr);
    nozzle.rotation.z = Math.PI / 2;
    genShipGroup.add(nozzle);
    // engine glow
    const glowSp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeDiscTexture('rgba(100,200,255,0.9)', 'rgba(40,80,200,0.0)', 0.3),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    glowSp.scale.set(0.12, 0.12, 1);
    glowSp.position.set(-1.3, Math.sin(ang) * nr, Math.cos(ang) * nr);
    genShipGroup.add(glowSp);
  }
  // position in the solar system: heading away from Sun, 1.6 AU out
  genShipGroup.position.set(-AUU * 1.6, AUU * 0.25, 0);
  genShipGroup.rotation.y = Math.PI;   // nose points outward (+x away from Sun)
  genShipGroup.scale.setScalar(1.0);
  genShipGroup.userData.info = {
    name: 'Generation Ship',
    sub: 'Interstellar ark',
    rows: [['Length', '~10 km (shown ×1:1000)'], ['Journey time', '10,000–100,000 yr'], ['Destination', 'Nearest star system'], ['Population', '10,000–100,000']],
    doc: 'A generation ship travels to another star so slowly that the original crew will die before arrival — the descendants of the first crew complete the journey. Rotating habitat rings provide artificial gravity. The ship must be a self-contained biosphere, carrying ecosystems, genetic diversity, and all knowledge of human civilization.',
  };
}
megaGroup.add(genShipGroup);

// clickable picking for megastructures
const MEGA_OBJECTS = [
  { group: dysonGroup,    pickR: 7.0 },
  { group: solarSailGroup, pickR: 1.5 },
  { group: oneillGroup,   pickR: 1.2 },
  { group: elevatorGroup, pickR: 0.5 },
  { group: warpGroup,     pickR: 0.5 },
  { group: genShipGroup,  pickR: 1.5 },
];

function updateMegastructures(jd, perfT) {
  if (!megaGroup.visible) return;
  const ePos = solBodies.Earth ? solBodies.Earth.pos : null;
  const mPos = solBodies.Mars ? solBodies.Mars.pos : null;
  if (!ePos) return;

  // solar sail: sunward from Earth (toward origin) offset
  if (solarSailGroup.visible) {
    const sunDir = ePos.clone().negate().normalize();
    solarSailGroup.position.copy(ePos).addScaledVector(sunDir, 3.2);
    solarSailGroup.lookAt(new THREE.Vector3(0, 0, 0));
  }

  // O'Neill cylinder: Earth L4 (60° ahead in orbit)
  if (oneillGroup.visible) {
    const angle = Math.atan2(ePos.z, ePos.x) + Math.PI / 3;
    const r = ePos.length();
    oneillGroup.position.set(Math.cos(angle) * r, ePos.y * 0.9, Math.sin(angle) * r);
    oneillGroup.rotation.x = perfT * 0.15;  // slow spin
  }

  // space elevator: attach to Earth surface, extend to GEO
  if (elevatorGroup.visible && ePos) {
    const eDisp = 1.165;  // approx displayRadius Earth
    const geoR = eDisp * 6.6;
    const up = ePos.clone().normalize();
    const surfPt = ePos.clone().addScaledVector(up, eDisp);
    const geoPt = ePos.clone().addScaledVector(up, geoR);
    const cwtPt = ePos.clone().addScaledVector(up, geoR * 1.35);
    // rebuild cable geometry
    const cable = elevatorGroup.userData.cable;
    cable.geometry.setFromPoints([surfPt, cwtPt]);
    elevatorGroup.userData.cwt.position.copy(cwtPt);
    elevatorGroup.userData.station.position.copy(geoPt);
    // climber animates up and down the cable
    const t = (Math.sin(perfT * 0.12) * 0.5 + 0.5);
    elevatorGroup.userData.climber.position.lerpVectors(surfPt, cwtPt, t);
    elevatorGroup.userData.climber.lookAt(cwtPt);
    // orient the torus ring perpendicular to cable
    elevatorGroup.userData.station.lookAt(cwtPt);
  }

  // Alcubierre: near Mars (or fixed if Mars not yet built)
  if (warpGroup.visible && mPos) {
    warpGroup.position.copy(mPos).addScaledVector(mPos.clone().normalize(), 2.5);
    // pulse the rings
    const pulse = 0.78 + 0.22 * Math.sin(perfT * 2.4);
    for (const r of warpGroup.userData.rings) r.material.emissiveIntensity = pulse;
    warpGroup.rotation.y = perfT * 0.08;
  }

  // Dyson sphere: rotate slowly
  dysonGroup.rotation.y = perfT * 0.018;

  // generation ship rings: spin independently
  for (const child of genShipGroup.children) {
    if (child.userData.spinRing) child.rotation.x += 0.003;
  }
}

megaGroup.visible = false;  // off by default

// ---------------------------------------------------------------- physics visualizers
// (C) Invisible-physics overlays — toggled from the Controls panel.

// ---- 1. Spacetime curvature grid (Solar System) ----
// A flat grid in the ecliptic plane with vertices displaced downward proportional
// to the local Newtonian gravitational potential Σ GM_i/r_i, updating each frame.
const GRAV_MASS = {   // gravitational "weight" in display units (solar = 1)
  Sun: 1.0, Jupiter: 9.548e-4, Saturn: 2.858e-4, Uranus: 4.366e-5, Neptune: 5.151e-5,
  Earth: 3.003e-6, Venus: 2.447e-6, Mars: 3.213e-7, Mercury: 1.651e-7,
};
const GRAV_SCALE = 42;        // visual amplitude of the well (world units)
const GRAV_SOFT  = 1.8;       // softening length to avoid singularity at body centre
const GRID_N     = 80;        // grid lines per axis
const GRID_HALF  = 680;       // half-size in world units (≈34 AU — covers all planets)

const gravPts = new Float32Array(GRID_N * GRID_N * 3);
const gravGeo = new THREE.BufferGeometry();
gravGeo.setAttribute('position', new THREE.BufferAttribute(gravPts, 3));

// Build line segments: connect horizontals then verticals
{
  const idxs = [];
  for (let row = 0; row < GRID_N; row++) {
    for (let col = 0; col < GRID_N - 1; col++) {
      idxs.push(row * GRID_N + col, row * GRID_N + col + 1);
    }
  }
  for (let col = 0; col < GRID_N; col++) {
    for (let row = 0; row < GRID_N - 1; row++) {
      idxs.push(row * GRID_N + col, (row + 1) * GRID_N + col);
    }
  }
  gravGeo.setIndex(idxs);
}
const gravCols = new Float32Array(GRID_N * GRID_N * 3);
gravGeo.setAttribute('color', new THREE.BufferAttribute(gravCols, 3));
const gravMat = new THREE.LineBasicMaterial({
  vertexColors: true, transparent: true, opacity: 0.45, depthWrite: false,
});
const gravGrid = new THREE.LineSegments(gravGeo, gravMat);
gravGrid.frustumCulled = false;
gravGrid.visible = false;
solScene.add(gravGrid);

function updateGravGrid() {
  if (!gravGrid.visible) return;
  const bodies = [];
  for (const [name, mass] of Object.entries(GRAV_MASS)) {
    const pos = name === 'Sun' ? new THREE.Vector3(0, 0, 0) : solBodies[name]?.pos;
    if (pos) bodies.push({ x: pos.x, z: pos.z, mass });
  }

  // First pass: compute raw potentials to find max (for normalisation)
  let phiMax = 0;
  const rawPhi = new Float32Array(GRID_N * GRID_N);
  for (let row = 0; row < GRID_N; row++) {
    const gz = -GRID_HALF + row * (GRID_HALF * 2 / (GRID_N - 1));
    for (let col = 0; col < GRID_N; col++) {
      const gx = -GRID_HALF + col * (GRID_HALF * 2 / (GRID_N - 1));
      let phi = 0;
      for (const b of bodies) {
        const dx = gx - b.x, dz = gz - b.z;
        const r = Math.sqrt(dx * dx + dz * dz + GRAV_SOFT * GRAV_SOFT);
        // Power-law compression: each body's well scaled by mass^0.38 so
        // smaller planets produce visible depressions (not physically linear,
        // but matches how GR spacetime diagrams are conventionally drawn).
        phi += Math.pow(b.mass, 0.38) / r;
      }
      rawPhi[row * GRID_N + col] = phi;
      if (phi > phiMax) phiMax = phi;
    }
  }

  // Second pass: displace vertices + colour by depth
  for (let row = 0; row < GRID_N; row++) {
    for (let col = 0; col < GRID_N; col++) {
      const vi = (row * GRID_N + col) * 3;
      const gx = -GRID_HALF + col * (GRID_HALF * 2 / (GRID_N - 1));
      const gz = -GRID_HALF + row * (GRID_HALF * 2 / (GRID_N - 1));
      const phi = rawPhi[row * GRID_N + col];
      const depth = phi / phiMax;   // 0..1 (1 = deepest, at the Sun)

      gravPts[vi]     = gx;
      gravPts[vi + 1] = -GRAV_SCALE * depth * depth * 0.85 * phiMax / (phi + 1e-12) * phi / phiMax;
      gravPts[vi + 2] = gz;
      // Rewrite: just use the normalised depth for Y
      gravPts[vi + 1] = -GRAV_SCALE * Math.pow(depth, 0.55);

      // Colour: flat blue at grid level → bright cyan at deepest wells
      const t = Math.pow(depth, 0.4);   // brightens the colour curve
      gravCols[vi]     = t * 0.15 + 0.05;         // R (slight purple tint)
      gravCols[vi + 1] = t * 0.55 + 0.20;         // G
      gravCols[vi + 2] = t * 0.45 + 0.55;         // B (always blueish)
    }
  }
  gravGeo.attributes.position.needsUpdate = true;
  gravGeo.attributes.color.needsUpdate = true;
}

// ---- 2. Dark matter halo (Galaxy mode) ----
// Dark-matter halo — a soft, roughly spherical glow enveloping the disc. The galaxy scene
// is in kpc and the visible disc is ~15 kpc; the true virial halo (~200 kpc) would be far
// off-screen at the normal galaxy zoom, so it's shown compact (~2× the disc) and visible.
// A fresnel rim-glow makes it read as a translucent sphere around the galaxy.
const dmHalo = (() => {
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec3 vN; varying vec3 vV;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      varying vec3 vN; varying vec3 vV;
      void main(){
        float f = 1.0 - abs(dot(normalize(vN), normalize(vV)));   // 0 face-on … 1 at the limb
        float rim = pow(f, 2.2);
        float a = rim * 0.55 + 0.05;                              // bright glowing rim, faint fill
        vec3 col = mix(vec3(0.30, 0.34, 0.66), vec3(0.62, 0.45, 0.95), rim);
        gl_FragColor = vec4(col, a);
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(32, 48, 32), mat);
  mesh.scale.y = 0.88;                  // dark-matter halos are roughly spherical, slightly oblate
  mesh.visible = false;
  galScene.add(mesh);
  return mesh;
})();

// ---- 3. EM spectrum mode — driven by starUniforms.uSpectrum ----
// Controlled from the Sky panel; reset to 0 on mode change (handled in setMode).
let spectrumMode = 0;
function setSpectrum(n) {
  spectrumMode = n;
  starUniforms.uSpectrum.value = n;
  // Update sky background tint to reinforce the wavelength
  const tints = [0x04060c, 0x010318, 0x1a0500, 0x090701];
  skyScene.background = new THREE.Color(tints[n] ?? 0x04060c);
  document.querySelectorAll('.spec-btn').forEach((b, i) => b.classList.toggle('active', i === n));
}

// orbit paths
const orbitGroup = new THREE.Group();
let orbitsEpochYear = -99999;
function rebuildOrbits(jd) {
  for (const line of orbitGroup.children) { line.geometry.dispose(); line.material.dispose(); }   // free GPU buffers, no leak
  orbitGroup.clear();
  for (const name of SOL_PLANETS) {
    const el = orbitalElements(name, jd);
    const pts = [];
    for (let i = 0; i <= 256; i++) {
      const M = (i / 256) * 360;
      pts.push(eclToThree(posFromElements(el, M)).multiplyScalar(AUU));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(PLANET_COLOR[name]), transparent: true, opacity: 0.30,
    });
    const line = new THREE.Line(geo, mat);
    line.frustumCulled = false;
    orbitGroup.add(line);
  }
}
solScene.add(orbitGroup);

// asteroid + kuiper belts (animated in-shader)
const beltGroup = new THREE.Group();
function buildBelt(count, aMin, aMax, incSigma, color, gaps) {
  const aArr = new Float32Array(count), ph = new Float32Array(count);
  const zAmp = new Float32Array(count), node = new Float32Array(count);
  let i = 0;
  while (i < count) {
    const a = aMin + Math.random() * (aMax - aMin);
    if (gaps && gaps.some((g) => Math.abs(a - g) < 0.04)) continue;
    aArr[i] = a;
    ph[i] = Math.random() * Math.PI * 2;
    zAmp[i] = a * Math.sin((Math.random() * incSigma * 2) * DEG) * (Math.random() < 0.5 ? -1 : 1);
    node[i] = Math.random() * Math.PI * 2;
    i++;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geo.setAttribute('aA', new THREE.BufferAttribute(aArr, 1));
  geo.setAttribute('aPh', new THREE.BufferAttribute(ph, 1));
  geo.setAttribute('aZ', new THREE.BufferAttribute(zAmp, 1));
  geo.setAttribute('aN', new THREE.BufferAttribute(node, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uYears: { value: 0 }, uAUU: { value: AUU }, uColor: { value: new THREE.Color(color) }, uPR: starUniforms.uPR },
    vertexShader: `
      uniform float uYears, uAUU, uPR;
      attribute float aA, aPh, aZ, aN;
      varying float vV;
      void main() {
        float ang = aPh + uYears / pow(aA, 1.5) * 6.28318;
        vec3 p = vec3(aA * cos(ang), aZ * sin(ang + aN), -aA * sin(ang)) * uAUU;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        vV = fract(aPh * 13.71);                       // stable per-particle variation
        gl_PointSize = (1.0 + vV * 1.9) * uPR;
      }`,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vV;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float dd = length(uv) * 2.0;
        if (dd > 1.0) discard;
        float f = smoothstep(1.0, 0.25, dd);
        gl_FragColor = vec4(uColor * (0.85 + vV * 0.3), (0.30 + vV * 0.45) * f);
      }`,
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  return pts;
}
const astBelt = buildBelt(5200, 2.15, 3.30, 9, '#b0a18d', [2.50, 2.82, 2.95]);
const kuiBelt = buildBelt(4200, 32, 49, 6, '#7e95b3', null);
beltGroup.add(astBelt, kuiBelt);
solScene.add(beltGroup);

// ---------------------------------------------------------------- named asteroids
// Real bodies on their real (osculating, ~J2000) heliocentric orbits — not procedural
// dots. Each is positioned every frame from Keplerian elements via posFromElements, so
// they move on accurate orbits as you scrub time; M0 (mean anomaly at J2000) places them
// realistically along it. Fields: name, a(AU), e, inc°, node Ω°, argPeri ω°, M0°,
// diameter km, colour, and a fact card (sub line, stat rows, doc paragraph).
const REAL_ASTEROIDS = [
  ['1 Ceres',     2.7660, 0.0785, 10.59,  80.31,  73.60,  95.99, 939, '#d8cdbe',
    'Dwarf planet · largest belt object', [['Diameter', '939 km'], ['Type', 'C-type (carbonaceous)'], ['Discovered', '1801, Piazzi'], ['Visited by', 'Dawn (2015–18)']],
    'The largest object in the asteroid belt and the only dwarf planet in the inner solar system — it holds about a third of the belt\'s total mass. NASA\'s Dawn spacecraft found bright carbonate/salt deposits in Occator crater, likely from a briny subsurface reservoir.'],
  ['2 Pallas',    2.7730, 0.2302, 34.84, 173.02, 310.87,  40.60, 512, '#b9bcc4',
    'Third-largest asteroid', [['Diameter', '~512 km'], ['Type', 'B-type'], ['Discovered', '1802, Olbers'], ['Inclination', '34.8° (extreme)']],
    'The third-most-massive asteroid, on a steeply tilted, eccentric orbit that makes it costly to reach — no spacecraft has visited. Its 34.8° inclination is among the largest of any large belt body.'],
  ['3 Juno',      2.6690, 0.2563, 12.99, 169.85, 248.41,  33.00, 247, '#cdb9a6',
    'Large S-type asteroid', [['Diameter', '~247 km'], ['Type', 'S-type (stony)'], ['Discovered', '1804, Harding']],
    'One of the first asteroids discovered and among the largest stony (S-type) bodies. For a few decades after discovery it was counted as a planet, before the belt\'s true nature was understood.'],
  ['4 Vesta',     2.3617, 0.0887,  7.14, 103.81, 151.20,  20.86, 525, '#e6dcc4',
    'Brightest asteroid · differentiated', [['Diameter', '525 km'], ['Type', 'V-type'], ['Discovered', '1807, Olbers'], ['Visited by', 'Dawn (2011–12)']],
    'The brightest asteroid as seen from Earth and the only one occasionally visible to the naked eye. It is differentiated like a small planet, with an iron core; a giant south-pole impact (Rheasilvia) flung out the "vestoid" family and the HED meteorites we find on Earth.'],
  ['10 Hygiea',   3.1390, 0.1125,  3.83, 283.20, 312.32, 152.18, 434, '#9fb0b6',
    'Fourth-largest · near-spherical', [['Diameter', '~434 km'], ['Type', 'C-type'], ['Discovered', '1849, de Gasparis']],
    'The fourth-largest asteroid and a candidate dwarf planet — 2019 imaging showed it is nearly spherical, suggesting it may have relaxed into hydrostatic equilibrium after a major impact.'],
  ['16 Psyche',   2.9230, 0.1340,  3.10, 150.19, 229.25,  10.00, 222, '#caa98a',
    'Metallic world · mission target', [['Diameter', '~222 km'], ['Type', 'M-type (metallic)'], ['Mission', 'Psyche (arrives 2029)']],
    'An unusually metal-rich body, possibly the exposed iron–nickel core of a shattered protoplanet. NASA\'s Psyche spacecraft, launched 2023, will orbit it from 2029 to study what a planetary core looks like up close.'],
  ['243 Ida',     2.8610, 0.0451,  1.13, 324.49, 110.92, 200.00, 31.4, '#bca78f',
    'First asteroid found to have a moon', [['Diameter', '~31 km'], ['Moon', 'Dactyl (~1.4 km)'], ['Flyby', 'Galileo (1993)']],
    'During its cruise to Jupiter, Galileo flew past Ida and discovered Dactyl orbiting it — the first confirmed asteroid moon, proving small bodies can hold satellites.'],
  ['253 Mathilde',2.6460, 0.2660,  6.74, 179.58, 157.39, 170.00, 52.8, '#7e756a',
    'Dark, porous C-type', [['Diameter', '~53 km'], ['Type', 'C-type (very dark)'], ['Flyby', 'NEAR Shoemaker (1997)']],
    'A pitch-black carbonaceous asteroid imaged by NEAR Shoemaker on its way to Eros. Its very low density implies a rubble-pile interior that is up to half empty space.'],
  ['433 Eros',    1.4580, 0.2227, 10.83, 304.32, 178.82, 320.22, 16.8, '#d7b48c',
    'First orbited & landed NEO', [['Diameter', '~17 km'], ['Type', 'S-type, Amor NEO'], ['Mission', 'NEAR Shoemaker (2000–01)']],
    'A near-Earth asteroid and the first to be orbited and then gently landed on, by NEAR Shoemaker in 2001. Its elongated, saddle-shaped form became the archetype of a small stony asteroid.'],
  ['951 Gaspra',  2.2100, 0.1730,  4.10, 253.20, 129.51,  60.00, 12.2, '#c7b08c',
    'First asteroid ever imaged close-up', [['Diameter', '~12 km'], ['Type', 'S-type'], ['Flyby', 'Galileo (1991)']],
    'The first asteroid ever seen up close, when Galileo flew past in 1991 en route to Jupiter — revealing a cratered, irregular world and confirming asteroids as distinct small bodies.'],
  ['25143 Itokawa',1.3240,0.2800,  1.62,  69.08, 162.82, 100.00, 0.33, '#c9a37e',
    'Rubble-pile · first sample return', [['Length', '~535 m'], ['Type', 'S-type, rubble pile'], ['Mission', 'Hayabusa (2005, returned 2010)']],
    'A peanut-shaped rubble pile from which Japan\'s Hayabusa returned the first-ever asteroid surface samples in 2010, confirming the link between S-type asteroids and ordinary chondrite meteorites.'],
  ['101955 Bennu',1.1264, 0.2037,  6.03,   2.06,  66.22, 101.70, 0.49, '#8c7d72',
    'Sampled carbonaceous NEO', [['Diameter', '~490 m'], ['Type', 'B-type, Apollo NEO'], ['Mission', 'OSIRIS-REx (sample returned 2023)']],
    'A carbon-rich near-Earth asteroid sampled by OSIRIS-REx, whose 2023 capsule returned 120 g of pristine material containing organics and hydrated minerals. Bennu is also among the better-known impact-risk objects for the late 2100s.'],
  ['162173 Ryugu',1.1896, 0.1902,  5.88, 251.62, 211.43, 160.00, 0.90, '#6f6a66',
    'Spinning-top carbonaceous NEO', [['Diameter', '~900 m'], ['Type', 'Cb-type, Apollo NEO'], ['Mission', 'Hayabusa2 (sample returned 2020)']],
    'A spinning-top-shaped carbonaceous asteroid sampled by Hayabusa2, which fired a copper impactor to expose subsurface material. Its returned grains contain amino acids and predate the solar system.'],
  ['99942 Apophis',0.9224,0.1914,  3.34, 204.43, 126.39, 180.00, 0.34, '#d9b388',
    'Famous close-approach NEO', [['Diameter', '~340 m'], ['Type', 'S-type, Aten NEO'], ['Close pass', '31,000 km on 13 Apr 2029']],
    'Once feared as an impact threat, Apophis is now ruled out for at least a century. On 13 April 2029 it will pass just 31,000 km from Earth — closer than geostationary satellites — visible to the naked eye, and ESA\'s Ramses mission aims to study it during the flyby.'],
];
const ASTEROIDS_RT = [];
let asteroidsVisible = false;          // named asteroids off by default (toggle in Solar panel)
let asteroidNamesOn = false;           // separate toggle for the name labels
const astNamedGroup = new THREE.Group();
solScene.add(astNamedGroup);
{
  // soft rocky glow — bright enough to spot, but a warm diffuse point (no hard edge) so it
  // sits naturally in the starfield instead of reading as a flat orange dot.
  const astTex = makeDiscTexture('rgba(245,235,214,1.0)', 'rgba(206,186,154,0.5)', 0.5);
  for (const [name, a, e, inc, node, argp, M0, diaKm, col, sub, rows, doc] of REAL_ASTEROIDS) {
    const el = { a, ecc: e, inc, Omega: node, varpi: node + argp };   // posFromElements uses varpi & a Moverride
    // gently desaturate the per-asteroid colour toward grey-tan so it stays naturalistic
    const c = new THREE.Color(col).lerp(new THREE.Color(0xc2b496), 0.3);
    const mark = new THREE.Sprite(new THREE.SpriteMaterial({
      map: astTex, color: c, transparent: true, opacity: 0.95,
      depthTest: true, depthWrite: false, sizeAttenuation: false, blending: THREE.AdditiveBlending }));
    // apparent size scales gently with real diameter (log), clamped so tiny NEOs stay visible
    const sz = Math.max(0.014, Math.min(0.028, 0.014 + Math.log10(diaKm + 1) * 0.0042));
    mark.scale.set(sz, sz, 1);
    mark.userData.noLabelScale = true;
    astNamedGroup.add(mark);
    const lab = makeTextSprite(name, { size: 8, color: '#e8cda0', alpha: 0.85 });
    lab.center.set(0.5, 1.8); lab.renderOrder = 9;
    astNamedGroup.add(lab);
    labelGroups.solar.push(lab);                    // so rescaleLabels sizes/orients it each frame
    // n (deg/day) for live orbital motion: Gauss — 0.9856076686 / a^1.5
    const n = 0.9856076686 / Math.pow(a, 1.5);
    ASTEROIDS_RT.push({ name, el, M0, n, diaKm, col, sub, rows, doc, mark, lab, world: new THREE.Vector3() });
  }
}
// place each named asteroid from its elements at the given Julian date
function updateNamedAsteroids(jd) {
  // always recompute positions (so search/fly-to works even when the layer is hidden);
  // visibility of the group itself is handled by the ck-asteroids toggle.
  const showLab = asteroidsVisible && asteroidNamesOn && orbits.solar.r < 90;   // labels only near the belt, else clutter
  for (const A of ASTEROIDS_RT) {
    const M = A.M0 + A.n * (jd - 2451545.0);        // mean anomaly now (deg)
    A.world.copy(eclToThree(posFromElements(A.el, M))).multiplyScalar(AUU);
    A.mark.position.copy(A.world);
    A.lab.position.copy(A.world);
    A.lab.visible = showLab;
  }
}

// ---- comets — real periodic comets on their true orbits, with tails that grow near
// the Sun. Elements are osculating (J2000 ecliptic); Tp = perihelion Julian date, so
// scrubbing time to Tp shows each comet at its brightest (Halley 1986, Hale-Bopp 1997…).
// Tail physics, simplified honestly: the blue ion tail points straight anti-sunward;
// the warm dust tail lags toward the orbit's trailing side; both scale with 1/r².
// Fields: name, a(AU), e, inc°, Ω°, ω°, Tp(JD), sub, rows, doc, perihelion label.
const COMETS = [
  ['1P/Halley', 17.834, 0.9671, 162.26, 58.42, 111.33, 2446470.5,
    'The most famous comet · returns 2061', [['Period', '75.3 years'], ['Last perihelion', 'Feb 1986'], ['Next return', 'Jul 2061'], ['Nucleus', '15 × 8 km']],
    'The comet that proved comets return: Edmond Halley predicted its 1758 reappearance from Newton\'s laws. Recorded at every pass since 240 BC — it is the Bayeux Tapestry\'s star and Giotto\'s 1986 flyby target. Its debris stream feeds the Orionid meteor shower every October.', 'Feb 1986'],
  ['2P/Encke', 2.2152, 0.8482, 11.78, 334.57, 186.55, 2460239.5,
    'Shortest period of any bright comet', [['Period', '3.30 years'], ['Last perihelion', 'Oct 2023'], ['Nucleus', '~4.8 km']],
    'No comet returns more often — Encke swings past the Sun every 3.3 years, so it has been watched on more than 60 passes. Its debris produces the Taurid meteor showers, and one Taurid fragment is a leading suspect for the 1908 Tunguska blast.', 'Oct 2023'],
  ['C/1995 O1 Hale–Bopp', 186.0, 0.9951, 89.43, 282.47, 130.59, 2450539.5,
    'The great comet of 1997', [['Period', '~2,500 years'], ['Perihelion', 'Apr 1997'], ['Nucleus', '~60 km (giant)'], ['Naked-eye run', '18 months — a record']],
    'Visible to the naked eye for a record 18 months through 1996–97, with its blue ion tail and cream dust tail split wide apart. Its nucleus is huge for a comet — around 60 km. It is now receding beyond Neptune and will not return for roughly 2,500 years.', 'Apr 1997'],
  ['C/2020 F3 NEOWISE', 358, 0.9992, 128.93, 61.01, 37.28, 2459033.5,
    'Brightest northern comet since Hale–Bopp', [['Period', '~6,800 years'], ['Perihelion', 'Jul 2020'], ['Nucleus', '~5 km']],
    'The surprise of the pandemic summer: discovered by the NEOWISE space telescope in March 2020, it survived perihelion and hung in northern twilight through July with a long golden dust tail — photographed above nearly every landscape on Earth.', 'Jul 2020'],
  ['67P/Churyumov–Gerasimenko', 3.4630, 0.6410, 7.04, 50.14, 12.78, 2457247.5,
    'Rosetta\'s comet', [['Period', '6.44 years'], ['Last perihelion', 'Aug 2015'], ['Nucleus', '4.3 × 4.1 km, two-lobed'], ['Missions', 'Rosetta + Philae (2014–16)']],
    'The first comet ever orbited — ESA\'s Rosetta escorted its duck-shaped nucleus for two years and set the Philae lander on its surface. Rosetta watched jets of gas and dust switch on as the comet warmed toward perihelion, then ended its mission by touching down itself.', 'Aug 2015'],
  ['109P/Swift–Tuttle', 26.092, 0.9632, 113.45, 139.38, 152.98, 2448967.5,
    'Parent of the Perseid meteor shower', [['Period', '133 years'], ['Last perihelion', 'Dec 1992'], ['Nucleus', '~26 km'], ['Next return', '2126']],
    'Every August the Earth crosses this comet\'s debris stream and the Perseids fill the sky — the year\'s most-watched meteor shower. Its 26 km nucleus is the largest object that makes repeated close approaches to Earth, though its orbit is stable for millennia.', 'Dec 1992'],
  ['55P/Tempel–Tuttle', 10.335, 0.9056, 162.49, 235.27, 172.50, 2450872.5,
    'Parent of the Leonid meteor storms', [['Period', '33.2 years'], ['Last perihelion', 'Feb 1998'], ['Nucleus', '~3.6 km']],
    'A modest comet with a spectacular calling card: fresh debris trails near its 33-year returns turn the November Leonids into meteor storms — 1833\'s "night the stars fell" and 1966\'s ~100,000 meteors per hour, the strongest ever witnessed.', 'Feb 1998'],
];
// tail texture: bright narrow head fading to a wide faint tip (drawn per-pixel once)
function makeTailTexture() {
  const w = 96, h = 192, cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d'), img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const t = 1 - y / (h - 1);              // t=0 at canvas bottom = tail head (flipY puts v=0 there)
    for (let x = 0; x < w; x++) {
      const nx = (x / (w - 1)) * 2 - 1;                     // -1..1 across the quad
      const dx = nx * 0.5 / (0.13 + 0.36 * t);              // cone widens toward the tip
      // edge mask forces alpha to exactly 0 at the quad borders — without it the
      // gaussian is still ~35% at the tip corners and the plane edge cuts a hard
      // diagonal across the sky when the camera is inside the tail
      const edge = Math.pow(Math.max(0, 1 - nx * nx), 2);
      const a = Math.pow(Math.max(0, 1 - t), 1.6) * Math.exp(-dx * dx) * edge * 200;
      const i = (y * w + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
      img.data[i + 3] = a;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(cv);
  return tex;
}
const COMETS_RT = [];
let cometsVisible = true;                  // headline layer — on by default (toggle in Solar panel)
const cometGroup = new THREE.Group();
solScene.add(cometGroup);
{
  const tailTex = makeTailTexture();
  const comaTex = makeDiscTexture('rgba(235,248,255,1.0)', 'rgba(160,205,240,0.4)', 0.4);
  const markTex = makeDiscTexture('rgba(225,242,255,1.0)', 'rgba(170,210,240,0.5)', 0.5);
  const tailPlane = () => {
    const g = new THREE.PlaneGeometry(1, 1);
    g.translate(0, 0.5, 0);                // pivot at the head; tail extends +Y
    return g;
  };
  for (const [name, a, e, inc, node, argp, Tp, sub, rows, doc, periLabel] of COMETS) {
    const el = { a, ecc: e, inc, Omega: node, varpi: node + argp };
    const mark = new THREE.Sprite(new THREE.SpriteMaterial({
      map: markTex, color: 0xd8ecff, transparent: true, opacity: 0.95,
      depthTest: true, depthWrite: false, sizeAttenuation: false, blending: THREE.AdditiveBlending }));
    mark.scale.set(0.013, 0.013, 1);
    mark.userData.noLabelScale = true;
    cometGroup.add(mark);
    const coma = new THREE.Sprite(new THREE.SpriteMaterial({
      map: comaTex, color: 0xdff2ff, transparent: true, opacity: 0,
      depthWrite: false, blending: THREE.AdditiveBlending }));
    cometGroup.add(coma);
    const mkTail = (color) => {
      const m = new THREE.Mesh(tailPlane(), new THREE.MeshBasicMaterial({
        map: tailTex, color, transparent: true, opacity: 0, side: THREE.DoubleSide,
        depthWrite: false, blending: THREE.AdditiveBlending }));
      m.renderOrder = 3;
      m.visible = false;
      cometGroup.add(m);
      return m;
    };
    const ion = mkTail(0x8fc8ff);          // straight, blue — solar-wind-driven plasma
    const dust = mkTail(0xffe2b8);         // curved, warm — heavier grains lag the orbit
    const lab = makeTextSprite(name, { size: 8, color: '#bfe0f5', alpha: 0.85 });
    lab.center.set(0.5, 1.8); lab.renderOrder = 9;
    cometGroup.add(lab);
    labelGroups.solar.push(lab);
    const n = 0.9856076686 / Math.pow(a, 1.5);
    COMETS_RT.push({ name, el, Tp, n, sub, rows, doc, periLabel, mark, coma, ion, dust, lab,
      world: new THREE.Vector3(), trail: new THREE.Vector3() });
    // faint orbit line — long-period orbits are clipped to the inner ~80 AU so
    // Hale-Bopp's 370 AU ellipse doesn't drag a line across the whole scene
    const rClip = 80, pts = [];
    const closed = a * (1 + e) <= rClip;
    const Emax = closed ? 180 : Math.acos((1 - rClip / a) / e) * 180 / Math.PI;
    const N = 96;
    for (let k = 0; k <= N; k++) {
      const E = -Emax + (2 * Emax * k) / N;
      const M = E - (e * 180 / Math.PI) * Math.sin(E * DEG);   // Kepler forward: M from E
      pts.push(eclToThree(posFromElements(el, M)).multiplyScalar(AUU));
    }
    const og = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new (closed ? THREE.LineLoop : THREE.Line)(og,
      new THREE.LineBasicMaterial({ color: 0x8fc8e8, transparent: true, opacity: 0.13 }));
    cometGroup.add(line);
  }
}
// place comets + grow/aim their tails for the given date (camera-aware: the tail
// planes are axial billboards — long axis fixed in space, face turned to the camera)
const _cV = new THREE.Vector3(), _cX = new THREE.Vector3(), _cZ = new THREE.Vector3();
const _cM = new THREE.Matrix4();
function updateComets(jd) {
  const cam = camFor('solar');
  const showLab = cometsVisible && orbits.solar.r < 160;
  for (const C of COMETS_RT) {
    const M = C.n * (jd - C.Tp);
    C.world.copy(eclToThree(posFromElements(C.el, M))).multiplyScalar(AUU);
    // trailing direction (backwards along the orbit) for the dust tail's lag
    C.trail.copy(eclToThree(posFromElements(C.el, M - 1.5))).multiplyScalar(AUU).sub(C.world).normalize();
    C.mark.position.copy(C.world);
    C.lab.position.copy(C.world);
    C.lab.visible = showLab;
    const rAU = C.world.length() / AUU;
    const act = Math.min(1, Math.max(0, 1.8 / (rAU * rAU) - 0.08));   // activity: 1/r², dead past ~4.7 AU
    C.coma.position.copy(C.world);
    C.coma.material.opacity = act * 0.85;
    C.coma.scale.setScalar(AUU * (0.015 + 0.05 * act));
    const on = act > 0.01;
    C.ion.visible = C.dust.visible = on;
    if (!on) continue;
    const tailL = AUU * Math.min(1.25, 0.75 / (rAU * rAU));
    const antiSun = _cV.copy(C.world).normalize();
    const aim = (mesh, dir, L, wid, op) => {
      mesh.position.copy(C.world);
      _cX.crossVectors(dir, _cZ.copy(cam.position).sub(C.world)).normalize();
      _cZ.crossVectors(_cX, dir);
      _cM.makeBasis(_cX, dir, _cZ);
      mesh.quaternion.setFromRotationMatrix(_cM);
      mesh.scale.set(wid, L, 1);
      mesh.material.opacity = op;
    };
    aim(C.ion, antiSun, tailL, tailL * 0.14, act * 0.6);
    // dust tail: shorter, wider, lagging toward the trailing side of the orbit
    const dustDir = _cV.copy(antiSun).addScaledVector(C.trail, 0.5).normalize();
    aim(C.dust, dustDir, tailL * 0.62, tailL * 0.3, act * 0.42);
  }
}

// ---- trans-Neptunian dwarf planets — the icy worlds beyond Neptune, on their real
// orbits (same machinery as the named asteroids). Sedna's 11,400-year ellipse is the
// point of drawing the orbit lines: it barely dips into the planetary region.
// Fields: name, a(AU), e, inc°, Ω°, ω°, M0°(J2000), diameter km, colour, sub, rows, doc.
const TNOS = [
  ['Eris', 67.86, 0.4407, 44.04, 35.95, 151.64, 194.5, 2326, '#e8e4dc',
    'Most massive dwarf planet', [['Diameter', '2,326 km'], ['Distance now', '~96 AU — near aphelion'], ['Moon', 'Dysnomia'], ['Discovered', '2005, Brown/Trujillo/Rabinowitz']],
    'The discovery that ended Pluto\'s planethood: Eris is slightly smaller than Pluto but more massive, and finding it in 2005 forced the "dwarf planet" definition a year later. It rides a steeply tilted 559-year orbit and is currently near its far point, almost 100 AU out.'],
  ['Makemake', 45.43, 0.161, 28.98, 79.62, 294.83, 141.0, 1430, '#d8b49a',
    'Bright icy world of the Kuiper belt', [['Diameter', '~1,430 km'], ['Moon', 'MK2'], ['Discovered', '2005, Palomar'], ['Surface', 'methane ice, reddish']],
    'One of the brightest Kuiper-belt objects, coated in frozen methane that reddens under cosmic rays. Named for the creator god of Rapa Nui (Easter Island), it was discovered shortly after Easter 2005.'],
  ['Haumea', 43.12, 0.195, 28.21, 122.16, 239.18, 191.0, 1632, '#e9e2e6',
    'Spinning egg with a ring', [['Dimensions', '~2,100 × 1,000 km'], ['Day length', '3.9 hours'], ['Moons', 'Hiʻiaka & Namaka'], ['Ring', 'discovered 2017']],
    'A dwarf planet spinning so fast — one rotation every four hours — that it has stretched into an egg shape. It has two moons and, uniquely among dwarf planets, a ring, likely debris from an ancient collision that also spawned a whole family of icy fragments.'],
  ['Sedna', 506, 0.855, 11.93, 144.25, 311.36, 357.6, 995, '#d47a5c',
    'The loneliest known world', [['Diameter', '~1,000 km'], ['Orbit', '76 → 936 AU'], ['Period', '~11,400 years'], ['Perihelion', '2076 — first since the last ice age']],
    'Sedna never comes closer than 76 AU — far beyond Neptune — and swings out to nearly 1,000. It last rounded the Sun when humans were crossing into the Americas, and reaches perihelion again in 2076. Its detached orbit is a standing argument for an unseen distant planet.'],
  ['Quaoar', 43.7, 0.040, 7.99, 188.8, 147.5, 266.5, 1090, '#b08a74',
    'Icy world with an impossible ring', [['Diameter', '~1,090 km'], ['Moon', 'Weywot'], ['Ring', 'far outside the Roche limit'], ['Discovered', '2002, Palomar']],
    'Named for the creation force of the Tongva people of Los Angeles. In 2023 astronomers found a ring orbiting far beyond where rings should be able to survive — material there ought to have clumped into a moon, and no one yet knows why it hasn\'t.'],
  ['Gonggong', 67.5, 0.503, 30.6, 336.8, 207.7, 92.9, 1230, '#c26a52',
    'Red, slow-spinning, and far away', [['Diameter', '~1,230 km'], ['Distance now', '~88 AU'], ['Moon', 'Xiangliu'], ['Named for', 'a Chinese water god (public vote, 2019)']],
    'One of the reddest large objects known, its surface stained by irradiated methane. It spins once every 22 hours — unusually slowly for its size, likely braked by its moon Xiangliu. The public chose its name in an online vote.'],
];
const TNOS_RT = [];
let tnosVisible = true;
const tnoGroup = new THREE.Group();
solScene.add(tnoGroup);
{
  const tnoTex = makeDiscTexture('rgba(240,240,248,1.0)', 'rgba(190,200,225,0.5)', 0.5);
  for (const [name, a, e, inc, node, argp, M0, diaKm, col, sub, rows, doc] of TNOS) {
    const el = { a, ecc: e, inc, Omega: node, varpi: node + argp };
    const mark = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tnoTex, color: new THREE.Color(col), transparent: true, opacity: 0.95,
      depthTest: true, depthWrite: false, sizeAttenuation: false, blending: THREE.AdditiveBlending }));
    const sz = 0.014 + Math.log10(diaKm) * 0.0032;
    mark.scale.set(sz, sz, 1);
    mark.userData.noLabelScale = true;
    tnoGroup.add(mark);
    const lab = makeTextSprite(name, { size: 8.5, color: '#d9d2ea', alpha: 0.85 });
    lab.center.set(0.5, 1.8); lab.renderOrder = 9;
    tnoGroup.add(lab);
    labelGroups.solar.push(lab);
    const n = 0.9856076686 / Math.pow(a, 1.5);
    TNOS_RT.push({ name, el, M0, n, diaKm, sub, rows, doc, mark, lab, world: new THREE.Vector3() });
    // orbit line, clipped to 150 AU — Sedna's arc into the planetary region is the story
    const rClip = 150, pts = [];
    const closed = a * (1 + e) <= rClip;
    const Emax = closed ? 180 : Math.acos((1 - rClip / a) / e) * 180 / Math.PI;
    const N = 96;
    for (let k = 0; k <= N; k++) {
      const E = -Emax + (2 * Emax * k) / N;
      const M = E - (e * 180 / Math.PI) * Math.sin(E * DEG);
      pts.push(eclToThree(posFromElements(el, M)).multiplyScalar(AUU));
    }
    const og = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new (closed ? THREE.LineLoop : THREE.Line)(og,
      new THREE.LineBasicMaterial({ color: 0xa89cc8, transparent: true, opacity: 0.1 }));
    tnoGroup.add(line);
  }
}
function updateTNOs(jd) {
  // labels only when the camera is out at Kuiper scale — at inner-system zoom these
  // would be six full-size names stacked on the horizon
  const showLab = tnosVisible && orbits.solar.r > 220;
  for (const T of TNOS_RT) {
    const M = T.M0 + T.n * (jd - 2451545.0);
    T.world.copy(eclToThree(posFromElements(T.el, M))).multiplyScalar(AUU);
    T.mark.position.copy(T.world);
    T.lab.position.copy(T.world);
    T.lab.visible = showLab;
  }
}

// ---- deep-space probes — the five spacecraft leaving the solar system, at their
// real distances along their real outbound directions. Distances follow the sim
// clock (linear cruise from a 2026-07-10 anchor), so rewinding to 1990 puts
// Voyager 1 near 40 AU — where it took the Pale Blue Dot photograph. Each card's
// "View from here" looks back at the Sun from the probe: a star among stars.
// Fields: name, RA°, Dec° (J2000 outbound dir), r(AU @ 2026-07-10), speed AU/yr,
// launch JD, sub, rows, doc.
const PROBES = [
  ['Voyager 1', 262.0, 12.4, 167.3, 3.57, 2443391.5,
    'The most distant human-made object', [['Launched', 'Sep 5, 1977'], ['Speed', '3.57 AU/year'], ['Heliopause crossed', 'Aug 2012'], ['Carries', 'the Golden Record']],
    'Farther from home than anything humanity has ever built, and still calling back daily on a 23-watt radio. It photographed the Pale Blue Dot from 40 AU in 1990, crossed into interstellar space in 2012, and carries a gold-plated record of Earth\'s sounds — greetings in 55 languages, whale song, Chuck Berry.'],
  ['Voyager 2', 302.1, -58.9, 139.8, 3.16, 2443375.5,
    'The only visitor to Uranus & Neptune', [['Launched', 'Aug 20, 1977'], ['Speed', '3.16 AU/year'], ['Heliopause crossed', 'Nov 2018'], ['Grand Tour', 'Jupiter · Saturn · Uranus · Neptune']],
    'The only spacecraft ever to visit all four giant planets, riding a planetary alignment that occurs once every 176 years. Everything we know of Uranus and Neptune up close, Voyager 2 saw. It followed its twin into interstellar space in 2018, headed south out of the solar system.'],
  ['Pioneer 10', 78.2, 26.1, 137.3, 2.52, 2441379.5,
    'First through the asteroid belt', [['Launched', 'Mar 2, 1972'], ['First flyby of', 'Jupiter (1973)'], ['Last contact', 'Jan 2003'], ['Headed toward', 'Aldebaran (~2 million years)']],
    'The trailblazer: first spacecraft through the asteroid belt and first past Jupiter, proving the outer solar system could be reached at all. Its signal faded to silence in 2003. It coasts on, silent, toward the star Aldebaran — arriving in roughly two million years, carrying its famous plaque.'],
  ['Pioneer 11', 282.5, -8.9, 117.0, 2.37, 2441778.5,
    'First spacecraft past Saturn', [['Launched', 'Apr 6, 1973'], ['First flyby of', 'Saturn (1979)'], ['Last contact', 'Nov 1995'], ['Carries', 'the Pioneer plaque']],
    'It threaded Saturn\'s rings in 1979 — the first spacecraft ever to see the ringed planet up close — scouting the path the Voyagers would follow. Silent since 1995, it drifts outward toward the constellation Aquila.'],
  ['New Horizons', 293.7, -20.5, 61.8, 2.94, 2453754.5,
    'Pluto\'s first and only visitor', [['Launched', 'Jan 19, 2006'], ['Pluto flyby', 'Jul 14, 2015'], ['Arrokoth flyby', 'Jan 1, 2019'], ['Status', 'active in the Kuiper belt']],
    'The fastest launch in history — past the Moon in nine hours. In 2015 it turned Pluto from a fuzzy dot into a world with a heart-shaped glacier, then flew past Arrokoth, the most distant object ever explored. Still awake, still exploring the Kuiper belt.'],
];
const PROBES_RT = [];
let probesVisible = true;
const probeGroup = new THREE.Group();
solScene.add(probeGroup);
{
  // equatorial (RA/Dec) → ecliptic unit direction, in the scene's ecliptic frame
  const eps = 23.4393 * DEG, ce = Math.cos(eps), se = Math.sin(eps);
  const eqToEclDir = (raDeg, decDeg) => {
    const ra = raDeg * DEG, de = decDeg * DEG;
    const x = Math.cos(de) * Math.cos(ra), y = Math.cos(de) * Math.sin(ra), z = Math.sin(de);
    return eclToThree({ x, y: y * ce + z * se, z: -y * se + z * ce }).normalize();
  };
  const probeTex = makeDiscTexture('rgba(255,250,240,1.0)', 'rgba(205,212,230,0.4)', 0.45);
  for (const [name, ra, dec, r0, v, launchJd, sub, rows, doc] of PROBES) {
    const dir = eqToEclDir(ra, dec);
    const mark = new THREE.Sprite(new THREE.SpriteMaterial({
      map: probeTex, color: 0xf4eeda, transparent: true, opacity: 0.95,
      depthTest: true, depthWrite: false, sizeAttenuation: false, blending: THREE.AdditiveBlending }));
    mark.scale.set(0.012, 0.012, 1);
    mark.userData.noLabelScale = true;
    probeGroup.add(mark);
    const lab = makeTextSprite(name, { size: 8.5, color: '#e8e2cf', alpha: 0.85 });
    lab.center.set(0.5, 1.8); lab.renderOrder = 9;
    probeGroup.add(lab);
    labelGroups.solar.push(lab);
    // outbound trail — the interstellar-cruise leg behind the probe
    const tg = new THREE.BufferGeometry().setFromPoints([
      dir.clone().multiplyScalar(7 * AUU), dir.clone().multiplyScalar(r0 * AUU)]);
    const trail = new THREE.Line(tg, new THREE.LineBasicMaterial({
      color: 0xcfc6a6, transparent: true, opacity: 0.1 }));
    probeGroup.add(trail);
    PROBES_RT.push({ name, dir, r0, v, launchJd, sub, rows, doc, mark, lab, trail,
      world: new THREE.Vector3(), rAU: r0 });
  }
}
function updateProbes(jd) {
  const showLab = probesVisible && orbits.solar.r > 260;
  for (const P of PROBES_RT) {
    P.rAU = P.r0 + P.v * (jd - 2461231.5) / 365.25;
    // hide during the early planetary-flyby years — the straight cruise model only
    // holds once the probe is well past the giant planets
    const on = jd > P.launchJd + 900 && P.rAU > 7;
    P.mark.visible = on; P.trail.visible = on;
    P.lab.visible = on && showLab;
    if (!on) continue;
    P.world.copy(P.dir).multiplyScalar(P.rAU * AUU);
    P.mark.position.copy(P.world);
    P.lab.position.copy(P.world);
    const pos = P.trail.geometry.attributes.position;
    pos.setXYZ(1, P.world.x, P.world.y, P.world.z);
    pos.needsUpdate = true;
  }
}
// probe card with live distance + signal time, and a look back at the Sun
function showProbeInfo(P) {
  const au = P.rAU;
  const lightMin = au * 8.3168;
  const lightStr = lightMin >= 90 ? `${(lightMin / 60).toFixed(1)} hours` : `${Math.round(lightMin)} minutes`;
  const rows = [['Distance from the Sun', `${au.toFixed(1)} AU`], ['One-way signal time', lightStr], ...P.rows];
  showInfo(P.name, P.sub, rows, P.doc, { obj: P });
}

// ---- heliosphere — the boundary where the Sun's wind gives way to interstellar
// space, at its real ~123 AU. Fades in only at outer-system zoom so it never
// pollutes the planetary view; both Voyagers sit outside it, which is the story.
const helioMesh = (() => {
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { uFade: { value: 0 } },
    vertexShader: `
      varying vec3 vN; varying vec3 vV;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      varying vec3 vN; varying vec3 vV; uniform float uFade;
      void main(){
        float f = 1.0 - abs(dot(normalize(vN), normalize(vV)));
        float rim = pow(f, 2.6);
        float a = (rim * 0.42 + 0.015) * uFade;
        vec3 col = mix(vec3(0.16, 0.30, 0.44), vec3(0.42, 0.72, 0.92), rim);
        gl_FragColor = vec4(col, a);
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(123 * AUU, 96, 64), mat);
  mesh.scale.set(1.0, 0.94, 1.0);          // gently flattened — the wind bubble isn't a perfect sphere
  solScene.add(mesh);
  const lab = makeTextSprite('Heliopause — edge of the solar wind', { size: 10, color: '#9fc8e0', alpha: 0.8 });
  lab.position.set(0, 123 * AUU * 0.32, -123 * AUU * 0.92);
  lab.renderOrder = 9;
  solScene.add(lab);
  labelGroups.solar.push(lab);
  mesh.userData.lab = lab;
  return mesh;
})();
let helioVisible = true;
function updateHeliosphere() {
  const r = orbits.solar.r;
  const fade = helioVisible ? THREE.MathUtils.smoothstep(r, 500, 1500) : 0;
  helioMesh.material.uniforms.uFade.value = fade;
  helioMesh.visible = fade > 0.005;
  helioMesh.userData.lab.visible = helioVisible && fade > 0.35;
}

// info card for a comet, with a time-travel action to its best show — the card
// teaches the time controls the same way the Sgr A* card teaches deep flight
function showCometInfo(C) {
  showInfo(C.name, C.sub, C.rows, C.doc, { obj: C }, {
    label: `⏱  See it at perihelion (${C.periLabel})`,
    fn: () => {
      time.jd = C.Tp;
      time.speedIdx = 5;                   // hold at real time so the moment keeps still
      refreshTimeUI();
      updateComets(time.jd);
      jumpToPoint(C.world.clone(), 3.2);
    },
  });
}

// star backdrop behind the solar system (rotated into the ecliptic frame).
// own material so planets/moons occlude it (depthTest on) instead of stars bleeding
// through; shares the live star uniforms so twinkle/brightness still apply.
const backdrop = new THREE.Group();
backdrop.rotation.x = -23.4393 * DEG;
const solStarsMat = starMat.clone();
solStarsMat.depthTest = true;
solStarsMat.uniforms = starMat.uniforms;
const solStars = new THREE.Points(skyStarGeo, solStarsMat);
solStars.frustumCulled = false;
solStars.renderOrder = -1;                       // draw the backdrop before the planets
const solStarsScale = 18;                       // push sphere outside Pluto orbit
solStars.scale.setScalar(solStarsScale);
backdrop.add(solStars);
// the Milky Way band belongs in this sky too — it's most of what makes the real
// night sky feel deep, and the solar backdrop looked flat without it
const solMilkyWay = buildMilkyWay();
solMilkyWay.scale.setScalar(solStarsScale);
solMilkyWay.renderOrder = -1;
// the sky-dome build skips depth testing (nothing occludes it there), but in the
// solar scene the ship and planets must block the band — else its stars shine
// straight through hulls and night sides (each build gets fresh materials, so this
// doesn't touch the sky copy)
solMilkyWay.traverse((o) => { if (o.material) o.material.depthTest = true; });
backdrop.add(solMilkyWay);
solScene.add(backdrop);

function updateSun(perfT) {
  // perfT = performance.now()/1000 mod 1000 — always a small, safe float for the shader
  sunUniform.value = perfT % 1000;
  if (!sunFx) return;
  // corona and glow pulse gently on wall-clock time (looks natural at any sim speed)
  const c = 9 + Math.sin(perfT * 0.08) * 0.7;
  sunFx.corona.scale.set(c, c, 1);
  sunFx.corona.material.opacity = 0.5 + Math.sin(perfT * 0.13) * 0.12;
  sunFx.glow.material.opacity = 0.9 + Math.sin(perfT * 0.06) * 0.1;
  // prominences: rate ≈ one visible eruption per 40–90 real seconds per sprite.
  // pow(max(0,sin),8) gives a very narrow spike — long quiet then a sharp brief flare.
  for (const sp of sunFx.proms) {
    const ph = perfT * sp.userData.rate + sp.userData.phase;
    const flare = Math.pow(Math.max(0, Math.sin(ph)), 8.0);
    sp.position.copy(sp.userData.dir).multiplyScalar(2.05 + flare * 0.7);
    const s = 0.4 + flare * 2.4;
    sp.scale.set(s, s, 1);
    sp.material.opacity = flare * 0.92;
  }
}
function updateSolarBodies(jd) {
  for (const name of SOL_PLANETS) {
    const b = solBodies[name];
    b.pos.copy(eclToThree(planetHelio(name, jd))).multiplyScalar(AUU);
    b.node.position.copy(b.pos);
    b.lab.position.copy(b.pos);
    b.mesh.rotation.y = ((jd - J2000) / ROT_DAYS[name]) * Math.PI * 2 % (Math.PI * 2);
    if (name === 'Earth' && earthFx) {
      earthFx.uSunDir.value.copy(b.pos).multiplyScalar(-1).normalize();   // Sun sits at the origin
      if (earthFx.clouds) earthFx.clouds.rotation.y = ((jd - J2000) / 0.92) * Math.PI * 2 % (Math.PI * 2);
    }
  }
  // Sun rotates once every 25.38 days (sidereal, equatorial) — driven by JD like planets
  solBodies.Sun.mesh.rotation.y = ((jd - J2000) % 25.38) / 25.38 * Math.PI * 2;
  solBodies.Sun.lab.position.set(0, 0, 0);
  // Moon: real ecliptic direction from Earth, exaggerated separation for visibility
  {
    const m = solBodies.Moon, e = solBodies.Earth;
    const off = eclToThree(moonEcl(jd));
    off.normalize().multiplyScalar(MOON_DISP);
    m.pos.copy(e.pos).add(off);
    m.node.position.copy(m.pos);
    m.lab.position.copy(m.pos);
    m.mesh.rotation.y = ((jd - J2000) / 27.3217) * Math.PI * 2 % (Math.PI * 2);  // tidally locked
    m.orbit.position.copy(e.pos);
    const pts = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * MOON_DISP, 0, Math.sin(a) * MOON_DISP));
    }
    m.orbit.geometry.setFromPoints(pts);
  }
  // everything dynamic advances on the SIMULATION clock so it freezes when paused and
  // races when sped up — one shared sim-seconds delta for sun, clouds and satellites.
  if (satClockJd === null) satClockJd = jd;
  let dSim = (jd - satClockJd) * 86400;             // sim-seconds since last frame
  satClockJd = jd;
  dSim = Math.max(-1e7, Math.min(1e7, dSim));        // cap so a date-jump can't fling things
  simSecClock += dSim;
  gasBandUniform.value = simSecClock * 0.06;         // cloud-band ripple (paused → still)
  updateSun(performance.now() / 1000);              // visual shimmer/flares on wall-clock, never overflows
  updatePlanetMoons(jd);
  // moon labels only when zoomed in close, to avoid clutter at full-system scale
  const showMoonLabels = moonsVisible && orbits.solar.r < 22;
  for (const mo of MOONS_RT) mo.lab.visible = showMoonLabels;
  updateSatellites(dSim);
  updateNamedAsteroids(jd);
  updateComets(jd);
  updateTNOs(jd);
  updateProbes(jd);
  updateHeliosphere();
  updateLunarSites();
  const nearEarth = orbits.solar.follow === 'Earth' && orbits.solar.r < 6;
  const nearMoon = orbits.solar.follow === 'Moon' && orbits.solar.r < 6;
  for (const s of SATS_RT) s.lab.visible = satsVisible && nearEarth && s.shell !== 'deep';
  for (const s of LUNAR_RT) s.lab.visible = satsVisible && nearMoon;
  const yr = new Date(dateFromJd(jd)).getUTCFullYear();
  if (Math.abs(yr - orbitsEpochYear) >= 5) { rebuildOrbits(jd); orbitsEpochYear = yr; }
  astBelt.material.uniforms.uYears.value = (jd - J2000) / 365.25;
  kuiBelt.material.uniforms.uYears.value = (jd - J2000) / 365.25;
}
setLoad(0.86);

// ---------------------------------------------------------------- neighborhood scene
const neiUniforms = { uScale: { value: 1.0 }, uPR: starUniforms.uPR };
{
  const MAXD = 1500;
  const idxs = [];
  for (let i = 0; i < N; i++) if (STARS.dist[i] > 0 && STARS.dist[i] < MAXD) idxs.push(i);
  const M = idxs.length;
  const pos = new Float32Array(M * 3);
  const lum = new Float32Array(M);
  const col = new Float32Array(M * 3);
  for (let k = 0; k < M; k++) {
    const i = idxs[k];
    const dd = STARS.dist[i];
    pos[k * 3] = dirs[i * 3] * dd;
    pos[k * 3 + 1] = dirs[i * 3 + 1] * dd;
    pos[k * 3 + 2] = dirs[i * 3 + 2] * dd;
    const absMag = STARS.mag[i] - 5 * (Math.log10(dd) - 1);
    lum[k] = Math.min(9, Math.pow(10, -0.2 * (absMag - 4.85)) + 0.12);
    const [r, g, b] = bvToRgb(STARS.ci[i]);
    col[k * 3] = r; col[k * 3 + 1] = g; col[k * 3 + 2] = b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aL', new THREE.BufferAttribute(lum, 1));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.ShaderMaterial({
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
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  neiScene.add(pts);
  neiScene.userData.starIdxs = idxs;

  // the brightest stars get a soft halo so the neighbourhood glows like the sky view
  {
    const ranked = [];
    for (let k = 0; k < M; k++) if (STARS.dist[idxs[k]] < 600) ranked.push([lum[k], k]);
    ranked.sort((a, b) => b[0] - a[0]);
    const H = Math.min(170, ranked.length);
    const hpos = new Float32Array(H * 3), hlum = new Float32Array(H), hcol = new Float32Array(H * 3);
    for (let j = 0; j < H; j++) {
      const k = ranked[j][1];
      hpos[j * 3] = pos[k * 3]; hpos[j * 3 + 1] = pos[k * 3 + 1]; hpos[j * 3 + 2] = pos[k * 3 + 2];
      hlum[j] = lum[k];
      hcol[j * 3] = col[k * 3]; hcol[j * 3 + 1] = col[k * 3 + 1]; hcol[j * 3 + 2] = col[k * 3 + 2];
    }
    const hgeo = new THREE.BufferGeometry();
    hgeo.setAttribute('position', new THREE.BufferAttribute(hpos, 3));
    hgeo.setAttribute('aL', new THREE.BufferAttribute(hlum, 1));
    hgeo.setAttribute('aColor', new THREE.BufferAttribute(hcol, 3));
    const hmat = new THREE.ShaderMaterial({
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
          float s = uScale * aL * 165.0 / max(1.0, -mv.z);
          gl_PointSize = clamp(s, 0.0, 64.0) * uPR;
          vC = aColor;
          vA = clamp(s * 0.02, 0.0, 0.16);
        }`,
      fragmentShader: `
        varying vec3 vC; varying float vA;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float dd = length(uv) * 2.0;
          if (dd > 1.0) discard;
          float f = smoothstep(1.0, 0.0, dd);
          gl_FragColor = vec4(vC, vA * f * f * f);
        }`,
    });
    const halos = new THREE.Points(hgeo, hmat);
    halos.frustumCulled = false;
    neiScene.add(halos);
  }

  // a faint Milky Way band along the galactic plane, for orientation and depth
  {
    const bandTex = makeDiscTexture('rgba(190,205,235,0.5)', 'rgba(130,150,200,0.14)', 0.45);
    for (let a = 0; a < 360; a += 6) {
      const p = eqToThree(galToEq(a, 0)).multiplyScalar(1350);
      const b = new THREE.Sprite(new THREE.SpriteMaterial({
        map: bandTex, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, opacity: 0.055 }));
      b.position.copy(p);
      b.scale.set(560, 260, 1);
      neiScene.add(b);
    }
  }
  // Share the same geometry+material into the continuous deepScene (positions are
  // heliocentric pc; the object is shifted by −camAbs each frame for floating origin).
  deepCatalog = new THREE.Points(geo, mat);
  deepCatalog.frustumCulled = false;
  deepScene.add(deepCatalog);
  deepStarMat = mat;                          // reuse this exact star shader for procedural chunks
  // "home" beacon — a bright golden marker at the Sun so deep space always shows the way back
  deepSun = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeDiscTexture('#fff6cf', '#ffd27a', 0.5), transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending }));
  deepScene.add(deepSun);
  // (the gold "☉ Solar System" text label was removed at the user's request; the beacon
  // star itself stays so you can still see where home is and fly back.)
  // Approach halo — as you near the beacon, concentric orbit rings fade/grow in so you
  // see "the solar system" forming around the Sun (not just a lone star) before the dive.
  deepSunHalo = new THREE.Group();
  const ringTex = makeRingTexture('#bcd2f0');
  deepSunHalo.userData.rings = [];
  for (let k = 0; k < 4; k++) {
    const r = new THREE.Sprite(new THREE.SpriteMaterial({
      map: ringTex, transparent: true, depthWrite: false, depthTest: false,
      blending: THREE.AdditiveBlending, opacity: 0 }));
    r.userData.k = 0.45 + k * 0.6;                 // relative orbit radius
    deepSunHalo.userData.rings.push(r);
    deepSunHalo.add(r);
  }
  deepSunHalo.visible = false;
  deepScene.add(deepSunHalo);
  // Sgr A* rendered in the deep continuum: approaching the galactic centre shows a
  // real destination — shadow sphere, photon ring, warm glow — not just dense stars.
  deepGC = new THREE.Group();
  {
    const shadow = new THREE.Mesh(new THREE.SphereGeometry(18, 96, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000 }));
    deepGC.add(shadow);
    const ring = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeRingTexture('#ffe6b8'), transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: 0.9 }));
    ring.scale.set(46, 46, 1);
    deepGC.add(ring);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeDiscTexture('rgba(255,214,150,0.5)', 'rgba(255,150,60,0.10)', 0.3),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.5 }));
    glow.scale.set(150, 110, 1);
    deepGC.add(glow);
  }
  deepGC.visible = false;
  deepScene.add(deepGC);
}

// sun marker + rings in galactic plane
const neiStarLabels = [];
{
  const sun = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeDiscTexture('#fff6cf', '#ffce7a', 0.55), transparent: true, depthTest: false, depthWrite: false,
    sizeAttenuation: false,
  }));
  sun.userData.pxW = 16; sun.userData.pxH = 16;
  neiScene.add(sun);
  labelGroups.neighborhood.push(sun);
  const sunLab = makeTextSprite('Sun', { size: 11, color: '#ffe9a8' });
  sunLab.center.set(0.5, 1.8);
  neiScene.add(sunLab);
  labelGroups.neighborhood.push(sunLab);

  const ringMat = new THREE.LineBasicMaterial({
    color: 0x5d7da8, transparent: true, opacity: 0.28, depthWrite: false,
  });
  for (const ly of [25, 50, 100, 250, 500]) {
    const rr = ly / 3.2616;                      // scene units are parsecs
    const pts = [];
    for (let l = 0; l <= 360; l += 4) pts.push(eqToThree(galToEq(l, 0)).multiplyScalar(rr));
    const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat);
    ring.frustumCulled = false;
    neiScene.add(ring);
    const rl = makeTextSprite(ly + ' ly', { size: 9, color: '#7d95b8', alpha: 0.8 });
    rl.position.copy(eqToThree(galToEq(40, 0)).multiplyScalar(rr));
    neiScene.add(rl);
    labelGroups.neighborhood.push(rl);
  }

  // ---- Oort cloud — at its TRUE scale this is a neighborhood-scene object, not a
  // solar-system one: 2,000–100,000 AU is 0.01–0.5 parsecs, a quarter of the way to
  // Alpha Centauri. A faint icy haze around the Sun, visible only when zoomed close
  // (any farther out and 3,000 additive points would pile into a false bright dot).
  {
    const N = 3200, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 0.01 + 0.47 * Math.pow(Math.random(), 1.7);   // denser toward the inner cloud
      const th = Math.random() * 2 * Math.PI, z = Math.random() * 2 - 1;
      const s = Math.sqrt(1 - z * z);
      pos[i * 3] = r * s * Math.cos(th); pos[i * 3 + 1] = r * z; pos[i * 3 + 2] = r * s * Math.sin(th);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const oort = new THREE.Points(g, new THREE.PointsMaterial({
      color: 0xcfe2f0, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.3,
      depthWrite: false, blending: THREE.AdditiveBlending }));
    oort.frustumCulled = false;
    const oortLab = makeTextSprite('Oort Cloud', { size: 9.5, color: '#a9c4d8', alpha: 0.85 });
    oortLab.position.set(0, 0.4, 0);
    oortLab.renderOrder = 9;
    const grp = new THREE.Group();
    grp.add(oort, oortLab);
    grp.visible = false;                                   // gated by zoom in animate
    neiScene.add(grp);
    neiScene.userData.oort = grp;
    labelGroups.neighborhood.push(oortLab);
  }
  const gcLab = makeTextSprite('→ galactic centre', { size: 11, color: '#c8a87f', alpha: 0.85 });
  gcLab.position.copy(eqToThree(galToEq(0, 0)).multiplyScalar(120));
  neiScene.add(gcLab);
  labelGroups.neighborhood.push(gcLab);

  // labels for nearby stars, in two tiers: the brightest dozen (the names a
  // visitor knows) show at the default framing; the faint catalog names only
  // appear once you zoom in close — otherwise they pile into an unreadable knot
  const labelCandidates = [];
  for (const [idxStr, name] of Object.entries(STARS.names)) {
    const i = +idxStr;
    const dd = STARS.dist[i];
    if (!(dd > 0 && dd < 26)) continue;
    labelCandidates.push([STARS.mag[i], i, name, dd]);
  }
  labelCandidates.sort((a, b) => a[0] - b[0]);       // apparent magnitude: low = bright
  labelCandidates.forEach(([mag, i, name, dd], rank) => {
    const tier1 = rank < 12;
    const lab = makeTextSprite(name, {
      size: tier1 ? 11 : 10, color: tier1 ? '#cfe0f5' : '#a8c4e6', alpha: tier1 ? 0.95 : 0.8 });
    lab.center.set(0.5, 1.6);
    lab.position.set(dirs[i * 3] * dd, dirs[i * 3 + 1] * dd, dirs[i * 3 + 2] * dd);
    lab.userData.tier = tier1 ? 1 : 2;
    neiScene.add(lab);
    labelGroups.neighborhood.push(lab);
    neiStarLabels.push(lab);
  });
  // stagger labels of near-co-located stars (e.g. the Alpha Centauri system — Rigil
  // Kentaurus, Toliman, Proxima — sit ~0.2 ly apart) so they don't print on top of each other
  const STAGGER = [1.6, -0.7, 2.8, -1.9];     // sprite-anchor y: alternates above / below the star
  const clustered = new Set();
  for (let a = 0; a < neiStarLabels.length; a++) {
    if (clustered.has(a)) continue;
    const group = [a];
    for (let b = a + 1; b < neiStarLabels.length; b++) {
      if (!clustered.has(b) && neiStarLabels[a].position.distanceTo(neiStarLabels[b].position) < 0.4) { group.push(b); clustered.add(b); }
    }
    if (group.length > 1) { clustered.add(a); group.forEach((g, k) => neiStarLabels[g].center.set(0.5, STAGGER[k % STAGGER.length])); }
  }
}
setLoad(0.93);

// ---------------------------------------------------------------- galaxy scene
// procedural Milky Way: 4 logarithmic spiral arms (pitch ~12.5 deg), bar/bulge,
// exponential disc, halo + globulars, Magellanic Clouds, Local Group context. Units: kpc.
const galBH = new THREE.Group();          // Sgr A* black hole, lives at the galactic centre
const SUN_GAL = new THREE.Vector3(-8.2, 0.02, 0);   // the Sun's place in the galaxy (kpc)
const galCenterGlows = [];   // centre glow layers fade out on close approach to Sgr A*
{
  // a soft luminous disc + bulge UNDER the particle arms, so the galaxy reads as one
  // glowing object rather than dots arranged in a spiral
  const discTex = makeDiscTexture('rgba(214,222,242,0.5)', 'rgba(130,150,205,0.10)', 0.42);
  const disc = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshBasicMaterial({ map: discTex, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: 0.34, side: THREE.DoubleSide }));
  disc.rotation.x = -Math.PI / 2;
  disc.renderOrder = -2;
  galScene.add(disc);
  galCenterGlows.push({ mat: disc.material, base: 0.34 });
  const glowTex = makeDiscTexture('rgba(255,236,200,0.9)', 'rgba(230,190,140,0.16)', 0.38);
  const bulge = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, opacity: 0.55 }));
  bulge.scale.set(7.5, 5.6, 1);
  bulge.renderOrder = -1;
  galScene.add(bulge);
  galCenterGlows.push({ mat: bulge.material, base: 0.55 });
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(190,200,235,0.35)', 'rgba(140,155,205,0.08)', 0.5),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.22 }));
  halo.scale.set(30, 22, 1);
  halo.renderOrder = -2;
  galScene.add(halo);
  galCenterGlows.push({ mat: halo.material, base: 0.22 });
}
{
  const gauss = () => (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
  const pts = [];
  const push = (x, y, z, r, g, b, s) => pts.push(x, y, z, r, g, b, s);

  const PITCH = Math.tan(12.5 * DEG);
  const ARMS = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
  const ARM_R_MIN = 3.3, ARM_R_MAX = 15.5;
  const hiiiPositions = [];  // for HII sprite placement
  for (const th0 of ARMS) {
    for (let i = 0; i < 20000; i++) {
      const u = Math.random();
      const r = ARM_R_MIN * Math.exp(u * Math.log(ARM_R_MAX / ARM_R_MIN));
      // tighter scatter for crisper arm definition
      const armW = 0.055 + 0.018 * r;
      const th = th0 + u * (Math.log(ARM_R_MAX / ARM_R_MIN) / PITCH) + gauss() * armW;
      const ro = r + gauss() * (0.28 + 0.04 * r);
      const x = ro * Math.cos(th), z = -ro * Math.sin(th), y = gauss() * 0.13;
      const pick = Math.random();
      if (pick < 0.10) {
        push(x, y, z, 1.0, 0.55, 0.78, 0.12);   // HII pink nebula regions
        if (Math.random() < 0.08) hiiiPositions.push([x, y, z, th0]);
      } else if (pick < 0.42) {
        push(x, y, z, 0.65, 0.78, 1.0, 0.05);   // young blue OB stars
      } else if (pick < 0.62) {
        push(x, y, z, 1.0, 0.96, 0.88, 0.042);  // white main-sequence
      } else if (pick < 0.80) {
        push(x, y, z, 1.0, 0.88, 0.72, 0.038);  // yellow-white
      } else if (pick < 0.92) {
        push(x, y, z, 1.0, 0.75, 0.50, 0.036);  // orange giants
      } else {
        push(x, y, z, 0.95, 0.38, 0.20, 0.10);  // rare red supergiants (large)
      }
    }
  }
  for (let i = 0; i < 30000; i++) {                                  // inter-arm disc
    const r = -3.2 * Math.log(1 - Math.random() * 0.985);
    if (r > 17) continue;
    const th = Math.random() * Math.PI * 2;
    push(r * Math.cos(th), gauss() * Math.max(0.07, 0.22 - r * 0.007), -r * Math.sin(th),
      1.0, 0.90, 0.75, 0.026);   // slightly dimmer than arm stars
  }
  for (let i = 0; i < 16000; i++) {                                  // bar + bulge
    const along = gauss() * 2.8, across = gauss() * 0.85, h = gauss() * 0.65;
    const ang = 25 * DEG;
    const bx = along * Math.cos(ang) - across * Math.sin(ang);
    const bz = along * Math.sin(ang) + across * Math.cos(ang);
    const pick = Math.random();
    // mix of old evolved stars (orange/yellow) in the bulge
    if (pick < 0.55) push(bx, h, bz, 1.0, 0.83, 0.58, 0.052);      // orange bulge stars
    else if (pick < 0.80) push(bx, h, bz, 1.0, 0.92, 0.72, 0.046); // yellow
    else push(bx, h, bz, 0.85, 0.64, 0.38, 0.048);                  // reddened
  }
  for (let i = 0; i < 3200; i++) {                                   // stellar halo
    const v = new THREE.Vector3(gauss(), gauss(), gauss()).normalize()
      .multiplyScalar(4 + Math.abs(gauss()) * 14);
    push(v.x, v.y * 0.5, v.z, 0.82, 0.73, 0.64, 0.026);
  }
  for (let i = 0; i < 65; i++) {                                     // globular clusters
    const dist = 3 + Math.abs(gauss()) * 12;
    const v = new THREE.Vector3(gauss(), gauss() * 0.7, gauss()).normalize().multiplyScalar(dist);
    const age = Math.random();  // 0=young blue, 1=old yellow
    const cr = 0.88 + age * 0.12, cg = 0.83 + age * 0.09, cb = age < 0.5 ? 0.98 : 0.72;
    push(v.x, v.y, v.z, cr, cg, cb, 0.14 + Math.random() * 0.06);
  }
  const galDir = (l, b) => new THREE.Vector3(
    Math.cos(b * DEG) * Math.cos(l * DEG), Math.sin(b * DEG), -Math.cos(b * DEG) * Math.sin(l * DEG));
  const clump = (l, b, d, spread, n, base) => {
    const cpos = SUN_GAL.clone().addScaledVector(galDir(l, b), d);
    for (let i = 0; i < n; i++) {
      push(cpos.x + gauss() * spread, cpos.y + gauss() * spread * 0.6, cpos.z + gauss() * spread,
        base[0], base[1], base[2], 0.05);
    }
    return cpos;
  };
  const lmcPos = clump(280.5, -32.9, 50, 1.6, 900, [0.80, 0.85, 1.0]);
  const smcPos = clump(302.8, -44.3, 62, 1.1, 450, [0.82, 0.82, 1.0]);

  // ---- the Orion Spur — the short arm segment the Sun actually lives in, arcing
  // through (−8.2, 0, 0) between the Sagittarius and Perseus arms
  for (let i = 0; i < 2600; i++) {
    const t = Math.random();
    const r = 7.6 + 2.2 * t;
    const th = Math.PI - 0.10 + 0.34 * t + gauss() * 0.045;
    const ro = r + gauss() * 0.16;
    const x = ro * Math.cos(th), z = -ro * Math.sin(th), y = gauss() * 0.10;
    const pick = Math.random();
    if (pick < 0.07) push(x, y, z, 1.0, 0.58, 0.78, 0.10);        // star-forming knots
    else if (pick < 0.5) push(x, y, z, 0.70, 0.80, 1.0, 0.045);   // young blue stars
    else push(x, y, z, 1.0, 0.94, 0.84, 0.038);
  }
  // flocculent feathers — the short spurs that branch off every real spiral's arms
  for (let f = 0; f < 10; f++) {
    const th0 = ARMS[f % 4];
    const u0 = 0.25 + Math.random() * 0.55;
    const rb = ARM_R_MIN * Math.exp(u0 * Math.log(ARM_R_MAX / ARM_R_MIN));
    const thb = th0 + u0 * (Math.log(ARM_R_MAX / ARM_R_MIN) / PITCH);
    const fdir = Math.random() < 0.5 ? 1 : -1;
    for (let i = 0; i < 550; i++) {
      const t = Math.random();
      const r = rb + t * (1.0 + Math.random() * 0.8);
      const th = thb + fdir * t * 0.22 + gauss() * 0.03;
      push(r * Math.cos(th), gauss() * 0.09, -r * Math.sin(th), 0.75, 0.83, 1.0, 0.036);
    }
  }

  const M = pts.length / 7;
  const pos = new Float32Array(M * 3), col = new Float32Array(M * 3), siz = new Float32Array(M);
  for (let i = 0; i < M; i++) {
    pos[i * 3] = pts[i * 7]; pos[i * 3 + 1] = pts[i * 7 + 1]; pos[i * 3 + 2] = pts[i * 7 + 2];
    col[i * 3] = pts[i * 7 + 3]; col[i * 3 + 1] = pts[i * 7 + 4]; col[i * 3 + 2] = pts[i * 7 + 5];
    siz[i] = pts[i * 7 + 6];
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aS', new THREE.BufferAttribute(siz, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uPR: starUniforms.uPR },
    vertexShader: `
      uniform float uPR;
      attribute float aS;
      attribute vec3 aColor;
      varying vec3 vC; varying float vA;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float s = aS * 1400.0 / max(0.5, -mv.z);
        gl_PointSize = clamp(s, 0.7, 13.0) * uPR;
        vC = aColor;
        vA = clamp(aS * 8.0, 0.18, 0.5);
      }`,
    fragmentShader: `
      varying vec3 vC; varying float vA;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float dd = length(uv) * 2.0;
        if (dd > 1.0) discard;
        float outer = smoothstep(1.0, 0.0, dd);
        float core  = smoothstep(0.4, 0.0, dd);   // brighter inner peak
        float f = outer * outer + core * 0.45;
        gl_FragColor = vec4(vC, vA * f);
      }`,
  });
  const cloud = new THREE.Points(geo, mat);
  cloud.frustumCulled = false;
  galScene.add(cloud);

  // ---- dust lanes — dark absorption clouds hugging each arm's INNER edge and
  // threading the bar. Drawn with NORMAL blending after the stars, so they truly
  // darken the light behind them — the detail every face-on spiral photo lives on.
  {
    const dpts = [];
    for (const th0 of ARMS) {
      for (let i = 0; i < 9000; i++) {
        const u = Math.random();
        const r = ARM_R_MIN * Math.exp(u * Math.log(ARM_R_MAX / ARM_R_MIN));
        const th = th0 + u * (Math.log(ARM_R_MAX / ARM_R_MIN) / PITCH) + gauss() * 0.04;
        const ro = r - 0.30 - Math.abs(gauss()) * 0.22;      // inner (concave) edge
        dpts.push(ro * Math.cos(th), gauss() * 0.05, -ro * Math.sin(th),
          0.16 + Math.random() * 0.14, 0.05 + Math.random() * 0.04);
      }
    }
    // (no dust across the bar — face-on, the bulge reads as a clean glowing mass;
    // flank dust carved an hourglass out of it and looked broken)
    const DN = dpts.length / 5;
    const dpos = new Float32Array(DN * 3), dop = new Float32Array(DN), dsz = new Float32Array(DN);
    for (let i = 0; i < DN; i++) {
      dpos[i * 3] = dpts[i * 5]; dpos[i * 3 + 1] = dpts[i * 5 + 1]; dpos[i * 3 + 2] = dpts[i * 5 + 2];
      dop[i] = dpts[i * 5 + 3]; dsz[i] = dpts[i * 5 + 4];
    }
    const dgeo = new THREE.BufferGeometry();
    dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
    dgeo.setAttribute('aO', new THREE.BufferAttribute(dop, 1));
    dgeo.setAttribute('aS', new THREE.BufferAttribute(dsz, 1));
    const dmat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.NormalBlending,
      uniforms: { uPR: starUniforms.uPR },
      vertexShader: `
        uniform float uPR; attribute float aS; attribute float aO; varying float vA;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(aS * 1400.0 / max(0.5, -mv.z), 1.0, 12.0) * uPR;
          vA = aO;
        }`,
      fragmentShader: `
        varying float vA;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float dd = length(uv) * 2.0;
          if (dd > 1.0) discard;
          float f = smoothstep(1.0, 0.15, dd);
          gl_FragColor = vec4(0.045, 0.032, 0.028, vA * f);
        }`,
    });
    const dust = new THREE.Points(dgeo, dmat);
    dust.frustumCulled = false;
    dust.renderOrder = 1;                                    // after the stars it shades
    galScene.add(dust);
  }
  // ---- HII blooms — soft rose glows at the star-forming knots collected above
  {
    const bloomTex = makeDiscTexture('rgba(255,150,180,0.55)', 'rgba(255,90,120,0.10)', 0.4);
    const step = Math.max(1, Math.ceil(hiiiPositions.length / 70));
    for (let i = 0; i < hiiiPositions.length; i += step) {
      const [x, y, z] = hiiiPositions[i];
      const s = new THREE.Sprite(new THREE.SpriteMaterial({
        map: bloomTex, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, opacity: 0.18 + Math.random() * 0.12 }));
      s.position.set(x, y, z);
      const sc = 0.3 + Math.random() * 0.3;
      s.scale.set(sc, sc, 1);
      galScene.add(s);
    }
  }

  // ------- large HII region glow sprites along the spiral arms -------
  // These give the galaxy the pink/magenta HII nebula glow seen in real galaxy photos.
  const hiiMat = new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(255,120,190,0.55)', 'rgba(200,60,130,0.0)', 0.28),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const obMat = new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(120,165,255,0.40)', 'rgba(60,90,200,0.0)', 0.25),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  // Place ~60 large HII glows along the arm spiral at representative radii
  const rng = (a, b) => a + Math.random() * (b - a);
  for (let arm = 0; arm < 4; arm++) {
    const th0 = ARMS[arm];
    for (let k = 0; k < 14; k++) {
      const u = rng(0.05, 0.95);
      const r = ARM_R_MIN * Math.exp(u * Math.log(ARM_R_MAX / ARM_R_MIN));
      const th = th0 + u * (Math.log(ARM_R_MAX / ARM_R_MIN) / PITCH) + (Math.random() - 0.5) * 0.12;
      const sp = new THREE.Sprite(Math.random() < 0.65 ? hiiMat : obMat);
      const sc = rng(0.8, 2.4);
      sp.scale.set(sc, sc * rng(0.7, 1.0), 1);
      sp.position.set(r * Math.cos(th), (Math.random() - 0.5) * 0.15, -r * Math.sin(th));
      galScene.add(sp);
    }
  }
  // Central bulge glow — big orange-yellow additive sprite
  const bulgeMat = new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(255,220,140,0.70)', 'rgba(220,140,60,0.0)', 0.35),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const bulgeGlow = new THREE.Sprite(bulgeMat);
  bulgeGlow.scale.set(9, 5, 1);
  galScene.add(bulgeGlow);
  galCenterGlows.push({ mat: bulgeMat, base: 1.0 });
  // Inner nuclear bar glow
  const barMat = new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(255,200,100,0.45)', 'rgba(180,100,40,0.0)', 0.18),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  galCenterGlows.push({ mat: barMat, base: 1.0 });
  for (let s = -1; s <= 1; s += 2) {
    const barSp = new THREE.Sprite(barMat);
    barSp.scale.set(4, 2.2, 1);
    barSp.position.set(s * 2.2 * Math.cos(25 * DEG), 0, s * 2.2 * Math.sin(25 * DEG));
    galScene.add(barSp);
  }

  // Sgr A* — the supermassive black hole as a real object you fly to at the galactic
  // centre (no separate screen): event-horizon shadow, doppler accretion disk, photon ring.
  {
    const RS = 0.5;
    // the shadow must actually occlude: the galaxy's additive star points ignore the
    // depth buffer, so a plain black sphere lets them shine through. Drawing the
    // shadow AFTER the particles (depthTest off, depth still written) paints true
    // black over everything behind it, while the disk/arcs draw later on top.
    // (transparent:true is load-bearing — it puts the shadow in the TRANSPARENT render
    // queue, which draws after the additive particles; an opaque mesh always draws
    // first and the stars paint right over the black)
    const shadow = new THREE.Mesh(new THREE.SphereGeometry(RS, 96, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 1,
        depthTest: false, depthWrite: true }));
    shadow.renderOrder = 4;
    galBH.add(shadow);
    // accretion disk v2 — static (per the design call: no motion), but detailed:
    // an ISCO gap off the shadow, a white-hot inner rim, a temperature gradient
    // falling to ember red, frozen filamentary turbulence sheared along the flow,
    // and strong one-sided relativistic beaming. uTime stays as a fixed phase seed.
    const diskMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      uniforms: { uTime: { value: 0 } },
      vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `
        uniform float uTime; varying vec3 vP;
        void main(){
          float r = length(vP.xy);
          float ang = atan(vP.y, vP.x);
          float inR = ${(RS * 1.45).toFixed(3)};
          float t = clamp((r - inR) / ${(RS * 3.1).toFixed(3)}, 0.0, 1.0);
          // frozen turbulence: three shear-stretched harmonics + fine grain, phase-seeded
          float f = 0.62
            + 0.20 * sin(ang * 7.0  + r * 26.0 - uTime)
            + 0.13 * sin(ang * 13.0 - r * 46.0 + uTime * 1.7)
            + 0.09 * sin(ang * 23.0 + r * 74.0 + uTime * 0.6);
          float grain = 0.92 + 0.08 * sin(r * 210.0 + ang * 41.0);
          // relativistic beaming — approaching side blazes, receding side fades
          float dopp = 0.30 + 0.85 * pow(0.5 + 0.5 * cos(ang - 1.5708), 1.6);
          // temperature ramp: white-hot inner → amber → ember red at the fringe
          vec3 hot = mix(mix(vec3(1.0, 0.98, 0.94), vec3(1.0, 0.70, 0.30), smoothstep(0.0, 0.45, t)),
                         vec3(0.82, 0.26, 0.07), smoothstep(0.45, 1.0, t));
          // blazing inner rim at the ISCO edge
          float rim = smoothstep(0.10, 0.0, (r - inR) / ${RS.toFixed(3)}) * 0.9;
          float a = ((1.0 - t) * f * grain * dopp + rim * dopp) * 0.85;
          vec3 col = hot * (0.40 + dopp * 0.95) + vec3(1.0, 0.97, 0.9) * rim * 0.8;
          gl_FragColor = vec4(col, a);
        }`,
    });
    const disk = new THREE.Mesh(new THREE.RingGeometry(RS * 1.45, RS * 4.6, 160, 24), diskMat);
    disk.rotation.x = Math.PI / 2 - 0.4;
    disk.renderOrder = 5;
    galBH.add(disk);
    galBH.userData.disk = diskMat;
    // the lensed ring — light from the disk behind the hole, bent over and under the
    // shadow (the EHT / Interstellar signature). Static geometry tilted with the disk.
    const lensMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      vertexShader: `
        varying vec3 vP; varying vec3 vQ; varying vec3 vC;
        void main(){
          vP = position;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vQ = mv.xyz;                                   // fragment, view space
          vC = (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;   // hole centre, view space
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vP; varying vec3 vQ; varying vec3 vC;
        void main(){
          float r = length(vP.xy);
          float ang = atan(vP.y, vP.x);
          float band = smoothstep(${(RS * 1.03).toFixed(3)}, ${(RS * 1.08).toFixed(3)}, r)
                     * (1.0 - smoothstep(${(RS * 1.13).toFixed(3)}, ${(RS * 1.24).toFixed(3)}, r));
          // keep only the over/under arcs — the ring's side segments would cross the
          // shadow's face as a grey band when seen from near the disk plane
          float arc = pow(abs(vP.y) / max(r, 0.001), 1.6);
          // lensed images exist only OUTSIDE the silhouette: cut any fragment whose
          // sight line passes closer to the hole than the shadow's edge
          float edge = asin(min(1.0, ${RS.toFixed(3)} / length(vC)));
          float off = acos(clamp(dot(normalize(vQ), normalize(vC)), -1.0, 1.0));
          float outside = smoothstep(0.98, 1.12, off / max(edge, 0.0001));
          // upper image of the far side is the brighter one; a touch of beaming left–right
          float updown = 0.55 + 0.45 * sin(ang);
          float dopp = 0.55 + 0.45 * cos(ang - 1.5708);
          vec3 col = mix(vec3(1.0, 0.86, 0.58), vec3(1.0, 0.96, 0.88), updown);
          gl_FragColor = vec4(col * (0.55 + 0.65 * dopp), band * arc * updown * dopp * outside * 0.85);
        }`,
    });
    const lens = new THREE.Mesh(new THREE.RingGeometry(RS * 1.0, RS * 1.28, 128, 1), lensMat);
    lens.rotation.x = -0.4;                 // stands perpendicular to the disk, sharing its tilt
    lens.renderOrder = 6;
    galBH.add(lens);
    const photon = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeRingTexture('#ffe6b8'), transparent: true, depthWrite: false,
      depthTest: false, blending: THREE.AdditiveBlending }));
    photon.scale.set(RS * 2.3, RS * 2.3, 1);
    photon.renderOrder = 7;
    galBH.add(photon);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeDiscTexture('rgba(255,205,150,0.4)', 'rgba(255,110,40,0.0)', 0.22),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.scale.set(RS * 7, RS * 7, 1);
    halo.renderOrder = 3;                   // ambient glow behind the shadow, not over it
    galBH.add(halo);
    galScene.add(galBH);
  }

  // distant Local Group members
  const m31 = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(255,240,220,0.9)', 'rgba(160,170,220,0.25)', 0.35),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, rotation: 0.5,
  }));
  m31.position.copy(SUN_GAL).addScaledVector(galDir(121.2, -21.6), 778);
  m31.scale.set(64, 22, 1);
  galScene.add(m31);
  const m33 = new THREE.Sprite(m31.material.clone());
  m33.material.rotation = -0.3;
  m33.position.copy(SUN_GAL).addScaledVector(galDir(133.6, -31.3), 870);
  m33.scale.set(26, 16, 1);
  galScene.add(m33);

  const galLabel = (text, posV, color = '#9db8d9', size = 11, near = true) => {
    const sp = makeTextSprite(text, { size, color, alpha: 0.92 });
    sp.position.copy(posV);
    sp.renderOrder = 9;
    sp.userData.near = near;
    galScene.add(sp);
    labelGroups.galaxy.push(sp);
    return sp;
  };
  const armPoint = (th0, r) => {
    const th = th0 + Math.log(r / 3.3) / PITCH;
    return new THREE.Vector3(r * Math.cos(th), 0.6, -r * Math.sin(th));
  };
  // hidden on close approach — the black hole fills the frame and the info card names it
  galLabel('Sgr A* · galactic centre', new THREE.Vector3(0, 1.2, 0), '#ffce8a', 12).userData.hideBelow = 7;
  galLabel('Sun · you are here', SUN_GAL.clone().setY(1.6), '#ffe9a8', 12);
  // arm labels only while the disc fills the view — zoomed to satellite scale they
  // all collapse onto a thumbnail-sized disc and pile into an unreadable knot
  galLabel('Scutum–Centaurus Arm', armPoint(0, 10.5), '#8fb0e0').userData.hideBeyond = 140;
  galLabel('Sagittarius Arm', armPoint(Math.PI / 2, 9), '#8fb0e0').userData.hideBeyond = 140;
  galLabel('Perseus Arm', armPoint(Math.PI, 11), '#8fb0e0').userData.hideBeyond = 140;
  galLabel('Norma–Outer Arm', armPoint(Math.PI * 1.5, 12.5), '#8fb0e0').userData.hideBeyond = 140;
  galLabel('Orion Spur', new THREE.Vector3(-9.3, 0.7, -1.6), '#9fc0e8', 10).userData.hideBeyond = 140;
  galLabel('Large Magellanic Cloud', lmcPos.clone().add(new THREE.Vector3(0, 2.2, 0)), '#a8c4e6');
  galLabel('Small Magellanic Cloud', smcPos.clone().add(new THREE.Vector3(0, 1.8, 0)), '#a8c4e6');
  galLabel('Andromeda Galaxy · 2.5 Mly', m31.position.clone().add(new THREE.Vector3(0, 26, 0)), '#e6cfa8', 12, false);
  galLabel('Triangulum Galaxy · 2.7 Mly', m33.position.clone().add(new THREE.Vector3(0, 14, 0)), '#cdbb9d', 11, false);
  galLabel('Milky Way', new THREE.Vector3(0, 6, 0), '#e6cfa8', 12, false);
  labelGroups.galaxy[labelGroups.galaxy.length - 1].userData.far = true;

  // when zoomed to Local Group scale the particle disc attenuates away; this
  // sprite takes over as the galaxy's far representation
  const mwFar = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(255,240,195,0.92)', 'rgba(180,200,240,0.18)', 0.38),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, rotation: 0.2,
  }));
  mwFar.scale.set(36, 14, 1);
  galScene.add(mwFar);
  galScene.userData.mwFar = mwFar;

  const sunRing = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeRingTexture('#ffe9a8'), transparent: true, depthTest: false, depthWrite: false,
    sizeAttenuation: false,
  }));
  sunRing.userData.pxW = 18; sunRing.userData.pxH = 18;
  sunRing.userData.near = true;
  sunRing.position.copy(SUN_GAL);
  galScene.add(sunRing);
  labelGroups.galaxy.push(sunRing);
}

// ---- the real galactic neighborhood — every named glow in the galaxy view is a
// real galaxy at its true position (galactic l/b + distance). Fills the empty black
// between the Milky Way and the cosmic web with the actual Local Group: the dwarf
// satellites being pulled apart by our gravity, Andromeda's companions, and the
// nearest neighbor groups. All clickable; most searchable (a few names are owned
// by the sky-mode DSO catalog and stay search-exclusive there).
// Fields: name, l°, b°, d(kpc), kind(sph|irr|spiral|len), [w,h,rot] sprite, search?,
//         sub, rows, doc. kind 'none' = existing visual (M31 etc.), card only.
const GALAXY_CAT = [
  ['Sagittarius Dwarf', 5.6, -14.2, 26, 'sph', [5, 3.5, 0.3], true,
    'Satellite being devoured by the Milky Way', [['Type', 'Dwarf spheroidal'], ['Distance', '85,000 ly'], ['Status', 'tidally disrupting']],
    'The closest galaxy of all — so close the Milky Way is tearing it apart. Its stars are being pulled into a stream that loops around our entire galaxy, and its debris is scattered through the halo. Discovered only in 1994, hiding behind the galactic centre.'],
  ['Sculptor Dwarf', 287.5, -83.2, 86, 'sph', [6, 5, 0], true,
    'First dwarf galaxy ever found', [['Type', 'Dwarf spheroidal'], ['Distance', '280,000 ly'], ['Discovered', '1938, Shapley']],
    'The first of the Milky Way\'s dwarf companions to be discovered — a diffuse ball of ancient stars with almost no gas, orbiting high above the galactic plane.'],
  ['Draco Dwarf', 86.4, 34.7, 76, 'sph', [5, 4, 0.2], true,
    'One of the darkest galaxies known', [['Type', 'Dwarf spheroidal'], ['Distance', '250,000 ly'], ['Dark matter', '~99% of its mass']],
    'A wisp of a galaxy whose stars move far too fast for the matter you can see — one of the most dark-matter-dominated objects known, and a favorite laboratory for testing what dark matter is.'],
  ['Fornax Dwarf', 237.1, -65.7, 147, 'sph', [8, 6, 0.4], true,
    'A dwarf with its own star clusters', [['Type', 'Dwarf spheroidal'], ['Distance', '480,000 ly'], ['Globular clusters', '6 of its own']],
    'Large for a dwarf — big enough to hold six globular clusters of its own. Why those clusters haven\'t spiraled into its centre is a long-standing puzzle about how dark matter is spread inside it.'],
  ['Leo I', 226.0, 49.1, 254, 'sph', [6, 5, 0], true,
    'The Milky Way\'s farthest satellite', [['Type', 'Dwarf spheroidal'], ['Distance', '830,000 ly'], ['Note', 'near the Milky Way\'s gravitational edge']],
    'Right at the edge of the Milky Way\'s gravitational reach, and moving so fast it may not even be bound to us — a satellite on the verge of independence.'],
  ['NGC 6822 · Barnard\'s Galaxy', 25.3, -18.4, 500, 'irr', [10, 8, 0.5], true,
    'A lonely island of star formation', [['Type', 'Dwarf irregular'], ['Distance', '1.6 million ly'], ['Discovered', '1884, E.E. Barnard']],
    'A free-floating member of the Local Group belonging to no one — not ours, not Andromeda\'s — quietly forming stars on its own. Hubble used it in 1925 as one of the first proofs that other galaxies lie beyond the Milky Way.'],
  ['IC 10', 119.0, -3.3, 750, 'irr', [9, 7, 0.2], true,
    'The Local Group\'s only starburst', [['Type', 'Dwarf irregular, starburst'], ['Distance', '2.4 million ly'], ['Note', 'hidden behind the Milky Way\'s dust']],
    'The only galaxy in the Local Group caught in a violent burst of star formation — packed with young clusters and more Wolf-Rayet stars per square parsec than anywhere nearby. We see it dimly, through the dust of our own disc.'],
  ['NGC 185', 120.8, -14.5, 620, 'sph', [7, 6, 0.3], false,
    'Companion of Andromeda', [['Type', 'Dwarf elliptical'], ['Distance', '2.0 million ly'], ['Satellite of', 'Andromeda']],
    'One of Andromeda\'s court of satellite galaxies, with a surprisingly active history of star formation for a small elliptical.'],
  ['M32', 121.2, -22.0, 785, 'len', [5, 4, 0], true,
    'Andromeda\'s compact companion', [['Type', 'Compact elliptical'], ['Distance', '2.6 million ly'], ['Note', 'possibly a stripped spiral core']],
    'A strange, dense little galaxy hugging Andromeda — possibly the surviving core of a much larger spiral that Andromeda stripped bare in an ancient collision.'],
  ['M110', 120.7, -21.1, 820, 'sph', [8, 5, 0.6], true,
    'Andromeda\'s other bright companion', [['Type', 'Dwarf elliptical'], ['Distance', '2.7 million ly'], ['Satellite of', 'Andromeda']],
    'The larger and more diffuse of Andromeda\'s two bright companions, visible in the same binocular field as M31 itself.'],
  // — the nearest neighbor groups, beyond the Local Group —
  ['Maffei 1', 135.9, -0.6, 2850, 'len', [16, 12, 0.1], true,
    'The hidden giant next door', [['Type', 'Giant elliptical'], ['Distance', '9.3 million ly'], ['Discovered', '1967 — behind the Milky Way']],
    'A giant elliptical galaxy that would be one of the brightest in our sky — if it weren\'t sitting almost exactly behind the Milky Way\'s disc. It hid behind our own dust until 1967.'],
  ['NGC 300', 299.2, -79.4, 1900, 'spiral', [20, 15, 0.4], true,
    'A quiet spiral toward Sculptor', [['Type', 'Spiral'], ['Distance', '6.2 million ly'], ['Group', 'Sculptor group outskirts']],
    'A textbook quiet spiral, one of the nearest beyond the Local Group — close enough that its brightest individual stars can be studied one by one.'],
  ['NGC 55', 332.7, -75.7, 2000, 'spiral', [18, 7, 0.9], true,
    'An edge-on neighbor', [['Type', 'Magellanic spiral, edge-on'], ['Distance', '6.5 million ly'], ['Group', 'Sculptor group']],
    'A galaxy much like the Large Magellanic Cloud, but seen almost perfectly edge-on — a bright sliver on the border of the Sculptor group.'],
  ['NGC 253 · Sculptor Galaxy', 97.4, -88.0, 3500, 'spiral', [26, 9, 0.7], true,
    'The Silver Coin', [['Type', 'Starburst spiral'], ['Distance', '11.4 million ly'], ['Group', 'Sculptor group']],
    'The dusty "Silver Coin" — the brightest member of the Sculptor group and one of the great starburst galaxies, furiously converting gas into stars at its crowded centre.'],
  ['M81 · Bode\'s Galaxy', 142.1, 40.9, 3630, 'spiral', [26, 16, 0.3], true,
    'Grand-design spiral of the M81 group', [['Type', 'Grand-design spiral'], ['Distance', '11.8 million ly'], ['Companion', 'M82, locked in interaction']],
    'A perfect grand-design spiral and anchor of the nearest big galaxy group. It is gravitationally tangled with the Cigar Galaxy beside it — their last close pass set M82 ablaze with star formation.'],
  ['M82 · Cigar Galaxy', 141.4, 40.6, 3530, 'spiral', [16, 6, 1.0], false,
    'Exploding with new stars', [['Type', 'Starburst, edge-on'], ['Distance', '11.5 million ly'], ['Cause', 'a close pass by M81']],
    'Wrecked and glorious: its encounter with M81 ignited a starburst ten times our galaxy\'s rate, blowing towers of glowing gas out of its disc.'],
  ['Centaurus A', 309.5, 19.4, 3800, 'len', [24, 18, 0.2], false,
    'The nearest active galaxy', [['Type', 'Elliptical w/ dust lane'], ['Distance', '12.4 million ly'], ['Core', 'feeding supermassive black hole']],
    'The nearest galaxy with an actively feeding central black hole, wearing a dramatic dust lane — the remains of a spiral galaxy it swallowed whole.'],
  // existing visuals — cards for the members already drawn in the scene
  ['Andromeda Galaxy', 121.2, -21.6, 778, 'none', null, false,
    'The Local Group\'s other giant', [['Type', 'Spiral'], ['Distance', '2.5 million ly'], ['Future', 'merges with the Milky Way in ~4.5 billion yr']],
    'Our twin and our destiny: the Local Group\'s largest galaxy, closing on the Milky Way at 110 km/s. In roughly 4.5 billion years the two will merge into a single giant elliptical.'],
  ['Triangulum Galaxy', 133.6, -31.3, 870, 'none', null, false,
    'The Local Group\'s third spiral', [['Type', 'Spiral'], ['Distance', '2.7 million ly'], ['Note', 'likely a distant companion of Andromeda']],
    'The smallest of the Local Group\'s three spirals, rich in gas and busy forming stars — probably a far-flung companion of Andromeda.'],
  ['Large Magellanic Cloud', 280.5, -32.9, 50, 'none', null, false,
    'Our brightest satellite', [['Type', 'Magellanic irregular'], ['Distance', '163,000 ly'], ['Hosts', 'the Tarantula Nebula']],
    'The Milky Way\'s brightest companion, home to the Tarantula Nebula — the most violent star-forming region in the Local Group — and site of Supernova 1987A.'],
  ['Small Magellanic Cloud', 302.8, -44.3, 62, 'none', null, false,
    'The LMC\'s little sibling', [['Type', 'Dwarf irregular'], ['Distance', '200,000 ly'], ['Note', 'trails the Magellanic Stream']],
    'Together with the LMC it trails the Magellanic Stream, a river of hydrogen stripped out by the Milky Way\'s tides, wrapping half the sky.'],
];
const GALCAT_RT = [];
{
  const galDirC = (l, b) => new THREE.Vector3(
    Math.cos(b * DEG) * Math.cos(l * DEG), Math.sin(b * DEG), -Math.cos(b * DEG) * Math.sin(l * DEG));
  const sphTex = makeDiscTexture('rgba(238,236,248,0.8)', 'rgba(180,185,225,0.22)', 0.5);
  const irrTex = makeDiscTexture('rgba(210,230,255,0.85)', 'rgba(150,180,235,0.25)', 0.42);
  const spiTex = makeDiscTexture('rgba(255,242,222,0.9)', 'rgba(165,175,225,0.24)', 0.36);
  const TEX = { sph: sphTex, irr: irrTex, spiral: spiTex, len: spiTex };
  for (const [name, l, b, d, kind, spr, searchable, sub, rows, doc] of GALAXY_CAT) {
    const pos = SUN_GAL.clone().addScaledVector(galDirC(l, b), d);
    let sprite = null;
    if (kind !== 'none') {
      sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: TEX[kind], transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, rotation: spr[2] }));
      sprite.position.copy(pos);
      // distant members read ~1.5× their true extent (a physically honest dwarf is a
      // couple of pixels at Local Group zoom); the Milky Way's own satellites are
      // seen close-up and stay true-size, or they dwarf the disc itself
      const boost = d < 300 ? 1.0 : 1.5;
      sprite.scale.set(spr[0] * boost, spr[1] * boost, 1);
      galScene.add(sprite);
      const lab = makeTextSprite(name, { size: 9, color: '#b9c9e2', alpha: 0.8 });
      lab.position.copy(pos).add(new THREE.Vector3(0, spr[1] * 1.1 + 1.5, 0));
      lab.renderOrder = 9;
      if (d < 300) lab.userData.near = true;    // dwarf labels only at Local-Group zoom
      // Andromeda's court sits within ~30 kpc of M31 — their labels only untangle
      // when you're zoomed into that corner of the Local Group
      if (['IC 10', 'NGC 185', 'M32', 'M110'].includes(name)) lab.userData.hideBeyond = 700;
      galScene.add(lab);
      labelGroups.galaxy.push(lab);
    }
    GALCAT_RT.push({ name, pos, d, searchable, sub, rows, doc, sprite });
  }
}
setLoad(0.95);

// ---------------------------------------------------------------- cosmic web scene
// Large-scale structure: galaxy-cluster nodes linked by filaments around voids,
// reddening with distance (cosmological redshift), wrapped by the CMB shell at the
// edge of the observable universe. Procedurally generated — units are compressed
// comoving distance (origin = Local Group, shell ≈ 46 Gly observable radius).
const cosGroup = new THREE.Group();
cosScene.add(cosGroup);
const COS_WEB_R = 64;          // cosmic web extent
const COS_CMB_R = 92;          // observable-universe / CMB shell radius
{
  const gauss = () => (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
  const verts = [];            // x,y,z, r,g,b, s
  // redshift tint: nearby structure cool-white, distant structure amber→red
  const redshift = (d) => {
    const t = Math.min(1, d / COS_WEB_R);
    return [0.70 + 0.30 * t, 0.74 - 0.10 * t, 0.95 - 0.55 * t];
  };
  const pushGal = (x, y, z, s) => {
    const d = Math.hypot(x, y, z);
    const c = redshift(d);
    const j = 0.85 + Math.random() * 0.3;
    verts.push(x, y, z, c[0] * j, c[1] * j, c[2] * j, s);
  };

  // 1) cluster nodes — denser toward center, thinning into the void-rich outskirts
  const nodes = [];
  const NODES = 150;
  let guard = 0;
  while (nodes.length < NODES && guard++ < NODES * 40) {
    const dir = new THREE.Vector3(gauss(), gauss(), gauss());
    if (dir.lengthSq() < 1e-4) continue;
    dir.normalize();
    const d = Math.pow(Math.random(), 0.62) * COS_WEB_R;     // radial bias inward
    nodes.push(dir.multiplyScalar(d));
  }
  // 2) filaments: connect each node to its 2 nearest neighbours → a web around voids
  const links = new Set();
  for (let i = 0; i < nodes.length; i++) {
    const near = nodes.map((n, j) => ({ j, d: nodes[i].distanceTo(n) }))
      .filter((o) => o.j !== i).sort((a, b) => a.d - b.d).slice(0, 2);
    for (const o of near) {
      if (o.d > 30) continue;                                // no impossibly long struts
      const key = i < o.j ? `${i}_${o.j}` : `${o.j}_${i}`;
      links.add(key);
    }
  }
  // 3) galaxies clustered at nodes
  for (const n of nodes) {
    const dens = 90 + Math.floor(Math.random() * 220);
    const spread = 1.1 + Math.random() * 2.2;
    for (let k = 0; k < dens; k++) {
      pushGal(n.x + gauss() * spread, n.y + gauss() * spread, n.z + gauss() * spread,
        0.05 + Math.random() * 0.06);
    }
  }
  // 4) galaxies strung along filaments, tapering toward the middle
  for (const key of links) {
    const [a, b] = key.split('_').map(Number);
    const A = nodes[a], B = nodes[b];
    const len = A.distanceTo(B);
    const count = Math.floor(len * 9);
    for (let k = 0; k < count; k++) {
      const t = Math.random();
      const taper = 0.35 + 1.2 * Math.sin(t * Math.PI);     // thin in the middle
      const x = A.x + (B.x - A.x) * t + gauss() * taper;
      const y = A.y + (B.y - A.y) * t + gauss() * taper;
      const z = A.z + (B.z - A.z) * t + gauss() * taper;
      pushGal(x, y, z, 0.035 + Math.random() * 0.03);
    }
  }
  // 5) sparse field galaxies sprinkled through the voids (very faint)
  for (let i = 0; i < 4000; i++) {
    const dir = new THREE.Vector3(gauss(), gauss(), gauss()).normalize();
    pushGal(...dir.multiplyScalar(Math.random() * COS_WEB_R).toArray(), 0.02 + Math.random() * 0.02);
  }

  const M = verts.length / 7;
  const pos = new Float32Array(M * 3), col = new Float32Array(M * 3), siz = new Float32Array(M);
  for (let i = 0; i < M; i++) {
    pos[i * 3] = verts[i * 7]; pos[i * 3 + 1] = verts[i * 7 + 1]; pos[i * 3 + 2] = verts[i * 7 + 2];
    col[i * 3] = verts[i * 7 + 3]; col[i * 3 + 1] = verts[i * 7 + 4]; col[i * 3 + 2] = verts[i * 7 + 5];
    siz[i] = verts[i * 7 + 6];
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aS', new THREE.BufferAttribute(siz, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uPR: starUniforms.uPR },
    vertexShader: `
      uniform float uPR;
      attribute float aS;
      attribute vec3 aColor;
      varying vec3 vC; varying float vA;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float s = aS * 2200.0 / max(0.5, -mv.z);
        gl_PointSize = clamp(s, 0.7, 9.0) * uPR;
        vC = aColor;
        vA = clamp(aS * 9.0, 0.22, 0.62);
      }`,
    fragmentShader: `
      varying vec3 vC; varying float vA;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float dd = length(uv) * 2.0;
        if (dd > 1.0) discard;
        float outer = smoothstep(1.0, 0.0, dd);
        float core  = smoothstep(0.35, 0.0, dd);
        float f = outer * outer + core * 0.50;
        gl_FragColor = vec4(vC, vA * f);
      }`,
  });
  const web = new THREE.Points(geo, mat);
  web.frustumCulled = false;
  cosGroup.add(web);

  // Filament lines — draw the actual web skeleton as glowing lines
  {
    const lineVerts = [];
    for (const key of links) {
      const [a, b] = key.split('_').map(Number);
      const A = nodes[a], B = nodes[b];
      lineVerts.push(A.x, A.y, A.z, B.x, B.y, B.z);
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6080c0, transparent: true, opacity: 0.18, depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const webLines = new THREE.LineSegments(lineGeo, lineMat);
    webLines.frustumCulled = false;
    cosGroup.add(webLines);
  }
  // Galaxy-cluster node glow sprites
  {
    const clusterMat = new THREE.SpriteMaterial({
      map: makeDiscTexture('rgba(210,200,255,0.28)', 'rgba(100,130,220,0.0)', 0.30),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    for (const n of nodes) {
      const sp = new THREE.Sprite(clusterMat);
      const sc = 0.8 + Math.random() * 1.6;
      sp.scale.set(sc, sc, 1);
      sp.position.copy(n);
      cosGroup.add(sp);
    }
  }

  // CMB shell — procedural mottled microwave-background sphere at the edge of view
  const cmbCanvas = document.createElement('canvas');
  cmbCanvas.width = 1024; cmbCanvas.height = 512;
  const cx = cmbCanvas.getContext('2d');
  cx.fillStyle = '#1a1326'; cx.fillRect(0, 0, 1024, 512);
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * 1024, y = Math.random() * 512;
    const rad = 6 + Math.random() * 42;
    const warm = Math.random();
    const g = cx.createRadialGradient(x, y, 0, x, y, rad);
    // tiny temperature anisotropies: warm reds vs cool blues
    const col = warm > 0.5 ? `rgba(${200 + Math.random() * 55 | 0},90,70,` : `rgba(70,90,${190 + Math.random() * 55 | 0},`;
    g.addColorStop(0, col + '0.5)');
    g.addColorStop(1, col + '0)');
    cx.fillStyle = g;
    cx.beginPath(); cx.arc(x, y, rad, 0, Math.PI * 2); cx.fill();
  }
  const cmbTex = new THREE.CanvasTexture(cmbCanvas);
  const cmb = new THREE.Mesh(
    new THREE.SphereGeometry(COS_CMB_R, 48, 32),
    new THREE.MeshBasicMaterial({ map: cmbTex, side: THREE.BackSide, transparent: true, opacity: 0.55 }),
  );
  cosGroup.add(cmb);
  cosScene.userData.cmb = cmb;

  // Local Group glow at the centre (our home)
  const home = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeDiscTexture('rgba(255,245,220,0.95)', 'rgba(150,180,255,0.3)', 0.3),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  home.scale.set(5, 5, 1);
  cosGroup.add(home);

  // labelled real structures (representative directions; compressed distances)
  const cosLabel = (text, x, y, z, color = '#b8c6e0', size = 11) => {
    const sp = makeTextSprite(text, { size, color, alpha: 0.92 });
    sp.position.set(x, y, z);
    sp.renderOrder = 9;
    cosGroup.add(sp);
    labelGroups.cosmic.push(sp);
  };
  cosLabel('Local Group · you are here', 0, 3.2, 0, '#ffe9a8', 12);
  cosLabel('Virgo Cluster', 7, 4, 5, '#cdd8ee');
  cosLabel('Laniakea Supercluster', -14, -6, 10, '#e6cfa8', 12);
  cosLabel('Great Attractor', -22, -9, 14, '#e0b890');
  cosLabel('Coma Cluster', 16, 20, -8, '#cdd8ee');
  cosLabel('Perseus–Pisces Supercluster', -10, 8, -30, '#cdb8a0');
  cosLabel('Shapley Supercluster', -34, -14, 22, '#d8a888');
  cosLabel('Sloan Great Wall', 30, -10, -34, '#c8b298');
  cosLabel('Boötes Void', 24, 14, 20, '#5a6680', 10);
  cosLabel('Cosmic Microwave Background · 13.8 Gyr', 0, COS_CMB_R * 0.74, 0, '#b89cc0', 12);
}
setLoad(0.97);


// ---------------------------------------------------------------- camera controls
const skyView = { lon: 60, lat: 20, vLon: 0, vLat: 0 };
const orbits = {
  solar: { theta: 0.6, phi: 1.15, r: 75, target: new THREE.Vector3(), follow: null, vT: 0, vP: 0 },
  neighborhood: { theta: 0.8, phi: 1.2, r: 55, target: new THREE.Vector3(), follow: null, vT: 0, vP: 0 },
  galaxy: { theta: 2.1, phi: 1.05, r: 40, target: new THREE.Vector3(), follow: null, vT: 0, vP: 0 },
  cosmic: { theta: 0.9, phi: 1.1, r: 70, target: new THREE.Vector3(), follow: null, vT: 0, vP: 0 },
};

function applySkyCam() {
  skyView.lat = Math.max(-89.5, Math.min(89.5, skyView.lat));
  skyCam.position.set(0, 0, 0);
  skyCam.lookAt(dirVec(skyView.lon, skyView.lat));
}
function applyOrbitCam(m) {
  const o = orbits[m], cam = camFor(m);
  o.phi = Math.max(0.05, Math.min(Math.PI - 0.05, o.phi));
  if (m === 'solar' && o.follow && solBodies[o.follow]) o.target.copy(solBodies[o.follow].pos);
  cam.position.set(
    o.target.x + o.r * Math.sin(o.phi) * Math.cos(o.theta),
    o.target.y + o.r * Math.cos(o.phi),
    o.target.z + o.r * Math.sin(o.phi) * Math.sin(o.theta),
  );
  cam.lookAt(o.target);
}

// ---------------------------------------------------------------- free-flight ("spaceship") camera
// A 6-DOF fly camera for the 3D modes: drag to steer heading, thrust forward/strafe/
// vertical with keys or scroll, speed scaled to how far you are from the focus so it
// feels right from a planet's surface to the cosmic web. Scale hand-offs are preserved
// so you can fly out of the solar system straight into the galaxy and beyond.
const FLY_MODES = new Set(['solar', 'neighborhood', 'galaxy', 'cosmic']);
let flyMode = false;
let flyThrottle = false;            // true while the mouse button is held → engines on
let flyArmed = false;              // steering stays neutral until you centre the cursor ("take the stick")
const mouseNDC = { x: 0, y: 0 };    // cursor position (−1..1) used as a flight stick
const fly = {
  pos: new THREE.Vector3(), yaw: 0, pitch: 0,
  goto: null,                       // {pos, until} easing destination from double-click
  attach: null,                     // {get,offset} → ride along with a moving body (POV)
};
let flyCruise = false;              // spacebar auto-forward toggle (hands-free thrust)
let flySpeed = 1;                   // throttle multiplier (scroll wheel), 0.15–12×
const _fwd = new THREE.Vector3(), _right = new THREE.Vector3(), _wup = new THREE.Vector3(0, 1, 0);
const _toSun = new THREE.Vector3();
function flyForward() {
  return _fwd.set(
    Math.sin(fly.yaw) * Math.cos(fly.pitch),
    Math.sin(fly.pitch),
    Math.cos(fly.yaw) * Math.cos(fly.pitch),
  );
}

// ---- deep-space ("fly forever") camera: floating origin + cursor-stick flight ----
const _deepFwd = new THREE.Vector3();
function deepForward() {
  return _deepFwd.set(
    Math.sin(deep.yaw) * Math.cos(deep.pitch),
    Math.sin(deep.pitch),
    Math.cos(deep.yaw) * Math.cos(deep.pitch),
  );
}
function applyDeepCam(dt) {
  window._deepRan = (window._deepRan || 0) + 1;
  // STEER — cursor is a flight stick; arms once you bring it to centre (same as fly)
  const dzz = 0.16;
  if (!flyArmed && Math.abs(mouseNDC.x) < dzz && Math.abs(mouseNDC.y) < dzz) { flyArmed = true; flyArmPrompt.classList.remove('show'); }
  if (flyArmed) {
    const stick = (v) => { const a = Math.abs(v); return a < dzz ? 0 : Math.sign(v) * (a - dzz) / (1 - dzz); };
    deep.yaw -= stick(mouseNDC.x) * 1.5 * dt;
    deep.pitch = Math.max(-1.45, Math.min(1.45, deep.pitch + stick(mouseNDC.y) * 1.3 * dt));
  }
  const fwd = deepForward();
  _right.crossVectors(fwd, _wup).normalize();
  // THRUST — space cruises, hold mouse to thrust, WASD optional; scroll = throttle.
  const boost = (heldKeys.has('shift') ? 7 : 1) * flySpeed;
  const F = (heldKeys.has('arrowup') || heldKeys.has('w') ? 1 : 0) - (heldKeys.has('arrowdown') || heldKeys.has('s') ? 1 : 0);
  const S = (heldKeys.has('arrowright') || heldKeys.has('d') ? 1 : 0) - (heldKeys.has('arrowleft') || heldKeys.has('a') ? 1 : 0);
  const auto = (flyThrottle || flyCruise) ? 1 : 0;
  const v = DEEP_PCPERSEC * boost * dt;
  if (auto || F) deep.pos.addScaledVector(fwd, (auto * 0.7 + F) * v);
  if (S) deep.pos.addScaledVector(_right, S * v);
  const dSun = deep.pos.length();
  // Capture: a small hard radius, OR — once you're inside the approach zone and aimed
  // roughly at the Sun — a wide cone, so flying "at" the beacon dives you in without
  // having to thread a pixel. toSun points from camera toward the Sun (origin).
  _toSun.copy(deep.pos).multiplyScalar(-1).normalize();
  const aimDot = deepForward().dot(_toSun);
  if (dSun < SUN_DIVE_PC || (dSun < SUN_APPROACH_PC && aimDot > SUN_CONE_DOT)) {
    diveIntoSystem(); return;                                               // arrive at the Sun → planets
  }
  // FLOATING ORIGIN — the ship/camera sit at the render origin; the world shifts by
  // −camAbs so absolute parsec coordinates never reach float32's danger zone (no wall).
  if (deepCatalog) deepCatalog.position.copy(deep.pos).multiplyScalar(-1);   // Sun at origin → −camAbs
  if (deepSun) {                                                             // home beacon at the Sun
    const dS = dSun;
    deepSun.position.copy(deep.pos).multiplyScalar(-1);
    const ws = Math.max(dS * 0.05, 0.01);                                    // ~constant apparent size, grows when near
    deepSun.scale.set(ws, ws, 1);
    // Approach halo — fades/grows in over the last SUN_APPROACH_PC so the system reveals
    // itself as concentric orbit rings around the Sun while you fly the final stretch in.
    if (deepSunHalo) {
      const near = 1 - Math.min(1, (dS - SUN_DIVE_PC) / (SUN_APPROACH_PC - SUN_DIVE_PC));
      deepSunHalo.visible = near > 0.001;
      if (deepSunHalo.visible) {
        deepSunHalo.position.copy(deepSun.position);
        const base = Math.max(dS * 0.16, 0.02);
        for (const r of deepSunHalo.userData.rings) {
          const s = base * r.userData.k;
          r.scale.set(s, s, 1);
          r.material.opacity = near * 0.6;
        }
      }
    }
  }
  if (deepGC) {
    deepGC.position.set(GC_PC.x - deep.pos.x, GC_PC.y - deep.pos.y, GC_PC.z - deep.pos.z);
    deepGC.visible = deepGC.position.length() < 5000;   // only meaningful near the centre
  }
  deepCam.up.set(0, 1, 0);
  if (thirdPerson) {
    if (shipModel.parent !== deepScene) deepScene.add(shipModel);            // bring the ship along
    shipModel.visible = true;
    const sc = 0.05, camDist = sc * 7.5;
    shipModel.scale.setScalar(sc);
    shipModel.position.set(0, 0, 0);
    shipModel.quaternion.copy(_shipQ.setFromUnitVectors(SHIP_FWD, fwd));
    deepCam.position.set(0, 0, 0).addScaledVector(fwd, -camDist).addScaledVector(_wup, camDist * 0.32);
    deepCam.lookAt(_deepLook.copy(fwd).multiplyScalar(camDist * 0.18));
    deepFillLight.position.set(0, 0, 0).addScaledVector(fwd, -camDist * 0.4).addScaledVector(_wup, camDist * 0.6);
    deepFillLight.visible = true;
    const throttleOn = flyThrottle || flyCruise;
    const nowS = performance.now() / 1000;
    const eo = (throttleOn ? 0.78 : 0.12) + Math.sin(performance.now() / 80) * 0.06;
    for (const gl of shipModel.userData.glows) {
      if (gl.material.uniforms?.uThrottle !== undefined) { gl.material.uniforms.uThrottle.value = eo; if (gl.material.uniforms.uTime) gl.material.uniforms.uTime.value = nowS; }
      else if (gl.material.opacity !== undefined) gl.material.opacity = eo;
    }
    for (const s of shipModel.userData.spin) s.rotation.z = nowS * 0.4;
  } else {
    shipModel.visible = false;
    deepFillLight.visible = false;
    deepCam.position.set(0, 0, 0);
    deepCam.lookAt(fwd.x, fwd.y, fwd.z);
  }
  try { streamChunks(); } catch (e) { if (!window._scErr) { window._scErr = String(e && e.stack || e); console.error('streamChunks', e); } }
}

// The one scale transition: arriving at the Sun swaps the continuous deep starfield
// for the detailed planetary system (solScene), and flying back out returns to deep.
const _diveDir = new THREE.Vector3();
function diveIntoSystem() {
  crossDissolve();
  setMode('solar', true);
  orbits.solar.follow = null;
  orbits.solar.target.set(0, 0, 0);
  orbits.solar.r = 200; orbits.solar.phi = 1.08; orbits.solar.theta = 0.6;   // ~10 AU: frames the inner system
  setFlyMode(true);
  thirdPerson = true; flyArmed = false; flyThrottle = false; flyCruise = false;
  flyShowToggle();
}
function diveOutToDeep() {
  crossDissolve();
  setMode('deep', true);
  _diveDir.copy(fly.pos).normalize();                 // continue outward in the direction you left
  if (_diveDir.lengthSq() < 0.5) _diveDir.set(0, 0, 1);
  deep.pos.copy(_diveDir).multiplyScalar(SUN_DIVE_PC * 1.4);
  deep.yaw = Math.atan2(_diveDir.x, _diveDir.z);
  deep.pitch = Math.asin(Math.max(-1, Math.min(1, _diveDir.y)));
  flyArmed = false; thirdPerson = true;
  flyShowToggle();
}
// "Exit flight" from deep space: return to the solar system and stop flying (orbit it).
function returnHomeFromDeep() {
  crossDissolve();
  setMode('solar', true);
  orbits.solar.follow = null;
  orbits.solar.target.set(0, 0, 0);
  orbits.solar.r = 200; orbits.solar.phi = 1.08; orbits.solar.theta = 0.6;
  setFlyMode(false);                 // drag-to-look orbit of the system
  flyShowToggle();
}
// F in deep space means what it means everywhere else: stop flying, RIGHT HERE —
// not a surprise teleport back to the solar system (that's Escape / the Sun beacon).
// Deep coords are Sun-centred parsecs on galactic axes (x → galactic centre), which is
// the galaxy scene's frame; the neighborhood scene uses equatorial axes, so rotate.
const DEEP_TO_NEI = new THREE.Matrix4().makeBasis(
  eqToThree(galToEq(0, 0)), eqToThree(galToEq(0, 90)), eqToThree(galToEq(270, 0)));
function exitDeepInPlace() {
  crossDissolve();
  const d = deep.pos.length();
  if (d < 1200) {                    // within the real star catalog's reach → stars view
    // stars view, orbiting the Sun from your true distance & direction
    const p = deep.pos.clone().applyMatrix4(DEEP_TO_NEI);
    setMode('neighborhood', true);
    const o = orbits.neighborhood;
    o.follow = null;
    o.target.set(0, 0, 0);
    o.r = Math.max(2, d);
    const dir = d > 1 ? p.normalize() : new THREE.Vector3(0.3, 0.3, 1).normalize();
    o.phi = Math.acos(Math.max(-1, Math.min(1, dir.y)));
    o.theta = Math.atan2(dir.z, dir.x);
  } else {
    // too far out for the stars view — drop into the galaxy map at your position
    setMode('galaxy', true);
    const o = orbits.galaxy;
    o.follow = null;
    o.target.copy(SUN_GAL).addScaledVector(deep.pos, 0.001);   // pc → kpc, same axes
    o.r = 25;
    o.phi = 1.05;
  }
  setFlyMode(false);
  flyShowToggle();
}

// Deterministic per-chunk RNG so flying back regenerates the same stars (free persistence).
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function chunkHash(ix, iy, iz) { return ((ix * 73856093) ^ (iy * 19349663) ^ (iz * 83492791)) >>> 0; }

// Milky Way stellar density at a Sun-centred pc point → relative star count (1 ≈ Sun).
// Exponential disc × scale-height × a mild 2-arm spiral × a central bulge.
function chunkDensity(x, y, z) {
  const rx = x - GC_PC.x, ry = y - GC_PC.y, rz = z - GC_PC.z;
  const R = Math.hypot(rx, rz), zh = Math.abs(ry);
  let df = Math.exp(-(R - R_SUN_GAL) / R_DISK) * Math.exp(-zh / H_DISK);
  if (R < 3500) df += 1.8 * Math.exp(-(R * R) / (2 * 1500 * 1500)) * Math.exp(-zh / 520);   // bulge
  const th = Math.atan2(-rz, rx);
  const arm = Math.cos(2 * (th - Math.log(Math.max(R, 500) / 3300) / Math.tan(12.5 * DEG)));
  return df * (1 + 0.6 * Math.max(0, arm));
}

function buildChunk(ix, iy, iz) {
  const key = ix + ',' + iy + ',' + iz;
  const ox = ix * CHUNK_L, oy = iy * CHUNK_L, oz = iz * CHUNK_L;          // chunk min corner (abs pc)
  const ccx = ox + CHUNK_L / 2, ccy = oy + CHUNK_L / 2, ccz = oz + CHUNK_L / 2;
  let df = chunkDensity(ccx, ccy, ccz);
  const dSun = Math.hypot(ccx, ccy, ccz);
  df *= Math.min(1, Math.max(0, (dSun - 300) / 600));                     // fade in beyond the real catalog
  const n = Math.min(CHUNK_CAP, Math.round(CHUNK_BASE * df));
  if (n <= 0) { chunkMap.set(key, null); return; }                       // genuinely empty (halo/void)
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
  pts.frustumCulled = false;
  pts.userData.originAbs = [ox, oy, oz];
  deepScene.add(pts);
  chunkMap.set(key, pts);
}

// Keep chunks within CHUNK_RAD of the camera loaded (budgeted), unload the rest, and
// reposition every loaded chunk to (originAbs − camAbs) for the floating origin.
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

// procedural spaceship for third-person view (self-lit so it shows in any scene)
let thirdPerson = false;
const SHIP_FWD = new THREE.Vector3(0, 0, 1);
const shipModel = (() => {
  // WRAITH-class strike fighter — hard-edged, faceted stealth aesthetic.
  // The hull is a single lofted body with an angular chined cross-section
  // (flat-shaded so every facet catches light), dense panel/greeble texture,
  // razor swept wings + root extensions, canted twin tails, faceted thrust-
  // vectoring nozzles and spinning intake fans. Nose = +Z.
  const g = new THREE.Group();

  // ── Material library — flat-shaded by default for crisp facets ────────────
  const M = (hex,o={}) => new THREE.MeshStandardMaterial({
    color:hex, metalness:o.m??0.76, roughness:o.r??0.40,
    emissive:new THREE.Color(o.e??0x000000), emissiveIntensity:o.ei??0,
    side:o.side??THREE.FrontSide, flatShading:o.flat??true,
  });
  // Livery: GUNMETAL hull · PLATINUM facet edges · ION-BLUE glow (matches the UI accent).
  // Every hull material carries a self-lit emissive floor so the silhouette always
  // reads against black space — an unlit black ship just looks broken.
  const SKIN   = M(0x3a445a,{m:0.68,r:0.44,e:0x2a3450,ei:0.62});  // gunmetal plating
  const SKIN2  = M(0x48546e,{m:0.70,r:0.50,e:0x303c58,ei:0.56});  // 2nd tone panels
  const TITAN  = M(0xe3e9f2,{m:0.92,r:0.20,e:0x3a4666,ei:0.55});  // platinum facet edges
  const STEEL  = M(0x56637e,{m:0.78,r:0.36,e:0x323e5c,ei:0.5});  // structure
  const FACET  = M(0x38425a,{m:0.36,r:0.68,e:0x28324a,ei:0.5});  // matte fin blades
  const DARK   = M(0x242c40,{m:0.58,r:0.62,e:0x161e30,ei:0.42});  // recesses / vents
  const CARBON = M(0x1e2432,{m:0.38,r:0.76,e:0x121724,ei:0.36});  // RAM coating
  const GOLD   = M(0xc79a48,{m:0.90,r:0.26,e:0x2e2008,ei:0.30});  // cockpit gold film
  const ACCENT = M(0x0e2440,{m:0.30,r:0.40,e:0x4f9fff,ei:3.20});  // ion-blue light strips
  const GLOW_C = M(0x0a1c30,{m:0.00,r:0.50,e:0x86c2ff,ei:5.20,flat:false});  // ion edge glow
  const GLOW_W = M(0x141a28,{m:0.00,r:1.00,e:0xdcecff,ei:5.40,flat:false});  // nozzle throat
  const GLOW_O = M(0x180800,{m:0.00,r:0.80,e:0xff5a14,ei:3.20,flat:false});  // heat halo (orange)
  const GLASS  = M(0x0a1220,{m:0.22,r:0.12,e:0x3a86e0,ei:0.60,flat:false});  // canopy (blue-tinted)
  const RED_L  = new THREE.MeshBasicMaterial({color:0xff2828});
  const GRN_L  = new THREE.MeshBasicMaterial({color:0x28ff66});
  const RUN_L  = new THREE.MeshBasicMaterial({color:0x9fd0ff});

  const cyl  = (rt,rb,h,s=8,hs=1,op=false) => new THREE.CylinderGeometry(rt,rb,h,s,hs,op); // low-seg = faceted
  const box  = (w,h,d) => new THREE.BoxGeometry(w,h,d);
  const cone = (r,h,s=6) => new THREE.ConeGeometry(r,h,s);
  const sph  = (r,ws=10,hs=8) => new THREE.SphereGeometry(r,ws,hs);
  const PI2  = Math.PI/2;
  const add  = (geo,mat,x=0,y=0,z=0,rx=0,ry=0,rz=0) => {
    const m = new THREE.Mesh(geo,mat);
    m.position.set(x,y,z); m.rotation.set(rx,ry,rz);
    g.add(m); return m;
  };

  // Loft an angular cross-section polygon along z-stations → one faceted hull.
  // cs: unit polygon [[x,y]...]; stations: [{z,sx,sy,oy?}]
  const loft = (cs, stations, mat) => {
    const n=cs.length, V=[], I=[];
    for(const st of stations){
      const oy=st.oy||0;
      for(let i=0;i<n;i++) V.push(cs[i][0]*st.sx, cs[i][1]*st.sy+oy, st.z);
    }
    for(let r=0;r<stations.length-1;r++)
      for(let i=0;i<n;i++){
        const a=r*n+i, b=r*n+(i+1)%n, c=(r+1)*n+i, d=(r+1)*n+(i+1)%n;
        I.push(a,c,b, b,c,d);
      }
    // end caps
    const cap=(s,flip)=>{
      const base=V.length/3, off=s*n; let cx=0,cy=0;
      const oy=stations[s].oy||0;
      for(let i=0;i<n;i++){cx+=cs[i][0]*stations[s].sx; cy+=cs[i][1]*stations[s].sy+oy;}
      V.push(cx/n,cy/n,stations[s].z);
      for(let i=0;i<n;i++){ const a=off+i,b=off+(i+1)%n; if(flip) I.push(base,b,a); else I.push(base,a,b); }
    };
    cap(0,true); cap(stations.length-1,false);
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.Float32BufferAttribute(V,3));
    geo.setIndex(I); geo.computeVertexNormals();
    const m=new THREE.Mesh(geo,mat); g.add(m); return m;
  };

  // thin angular planform plate: local +X span, +Y length(nose) → world XZ flat
  const planform = (pts,t,bev=0.01) => {
    const sh=new THREE.Shape(); sh.moveTo(pts[0][0],pts[0][1]);
    for(let i=1;i<pts.length;i++) sh.lineTo(pts[i][0],pts[i][1]);
    sh.closePath();
    const geo=new THREE.ExtrudeGeometry(sh,{depth:t,bevelEnabled:bev>0,
      bevelThickness:bev,bevelSize:bev,bevelSegments:1,steps:1});
    geo.translate(0,0,-t/2); geo.rotateX(Math.PI/2);
    return geo;
  };

  const glows=[], cores=[], spin=[];

  // ── 1. FUSELAGE — faceted chined cross-section lofted nose→tail ───────────
  // Hexagonal "diamond" section: flat top, sharp horizontal chines, V keel.
  const CS = [
    [ 0.00, 0.60],   // flat dorsal
    [ 0.70, 0.40],   // upper-right facet
    [ 1.14,-0.04],   // knife chine (extended, near centreline → razor edge)
    [ 0.50,-0.68],   // lower-right facet
    [ 0.00,-1.02],   // deep V keel
    [-0.50,-0.68],   // lower-left facet
    [-1.14,-0.04],   // left chine
    [-0.70, 0.40],   // upper-left facet
  ];
  const ST = [
    {z: 3.50, sx:0.015, sy:0.015},
    {z: 3.05, sx:0.12,  sy:0.10,  oy:0.02},
    {z: 2.55, sx:0.20,  sy:0.15,  oy:0.02},
    {z: 2.05, sx:0.26,  sy:0.19,  oy:0.01},   // cockpit
    {z: 1.35, sx:0.31,  sy:0.22},
    {z: 0.55, sx:0.345, sy:0.235},            // widest
    {z:-0.35, sx:0.335, sy:0.235},
    {z:-1.15, sx:0.31,  sy:0.225},
    {z:-1.75, sx:0.285, sy:0.215},
    {z:-2.35, sx:0.245, sy:0.205},            // tail
  ];
  loft(CS, ST, SKIN);

  // hard dorsal spine ridge (angular wedge) for a sharp top centreline
  add(planform([[0.05,3.0],[0.05,-2.2],[-0.05,-2.2],[-0.05,3.0]],0.16,0), STEEL, 0,0.12,0);
  // long razor needle nose + probe
  add(cone(0.075,1.05,5), TITAN, 0,0.0,3.62, PI2);
  add(cone(0.022,0.42,4), STEEL, 0,0.0,4.30, PI2);   // sharp tip spike
  add(cyl(0.010,0.010,0.34,4), STEEL, 0,0.0,4.62, PI2);
  add(sph(0.016,8,6), GLOW_C, 0,0.0,4.80);

  // ── 2. WING — razor swept delta with hard notched trailing edge ───────────
  const WING = [
    [ 0.28, 0.95],   // root leading
    [ 0.92,-0.30],   // mid leading
    [ 1.98,-1.78],   // tip leading (sharper, deeper sweep)
    [ 2.02,-2.06],   // razor tip
    [ 1.34,-1.80],   // sawtooth notch out
    [ 1.18,-1.48],   // notch in (deep)
    [ 0.56,-1.74],   // trailing inboard
    [ 0.40,-2.12],   // root trailing
    [-0.40,-2.12],   // ── mirror ──
    [-0.56,-1.74],
    [-1.18,-1.48],
    [-1.34,-1.80],
    [-2.02,-2.06],
    [-1.98,-1.78],
    [-0.92,-0.30],
    [-0.28, 0.95],
  ];
  add(planform(WING,0.07,0.012), SKIN2, 0,-0.02,0);
  // leading-edge extensions (LERX) — sharp triangles cockpit→wing root
  for(const side of[-1,1]){
    add(planform([[0.10,2.30],[0.46,0.40],[0.30,0.85],[0.16,1.60]],0.05,0),
        SKIN2, side<0?0:0, -0.01, 0, 0, side<0?Math.PI:0, 0);
    // bright leading sliver on the LERX edge only (catches light without a big flat patch)
    add(box(0.02,0.05,1.70), TITAN, side*0.30, 0.0, 1.20, 0, side*0.22, 0);
    // dark angular accent panels break up the inner-wing sheen
    add(planform([[0.18,1.95],[0.40,0.55],[0.30,0.55],[0.20,1.55]],0.052,0),
        CARBON, 0,0.0,0, 0, side<0?Math.PI:0, 0);
    add(box(0.012,0.055,1.35), DARK, side*0.27, 0.0, 1.10, 0, side*0.20, 0);  // groove
    // raised avionics strip + intake-spine greeble on the inner wing
    for(let i=0;i<4;i++) add(box(0.07,0.03,0.06), i%2?STEEL:DARK, side*0.40, 0.03, 0.95-i*0.22);
  }

  // wing surface texture: recessed panel GRID + raised fairings + elevon lines
  for(const side of[-1,1]){
    // chordwise grooves (run fore-aft, fanned out along the wing)
    for(let i=0;i<5;i++){
      const t=i/4, px=0.45+t*1.20, pz=-0.30-t*0.30;
      add(box(0.010,0.006,1.05-t*0.35), DARK, side*px, 0.022, pz, 0, side*0.42, 0);
    }
    // spanwise grooves (run left-right across the wing)
    for(const gz of [-0.30,-0.75,-1.20]){
      add(box(1.30,0.006,0.012), DARK, side*0.95, 0.022, gz, 0, side*0.10, 0);
    }
    // raised access panels / fairings (break up the surface with relief)
    for(const [px,pz,pw,pd] of [[0.62,-0.45,0.20,0.40],[1.05,-0.80,0.16,0.34]]){
      add(box(pw,0.022,pd), SKIN, side*px, 0.03, pz, 0, side*0.5, 0);
      add(box(pw*0.7,0.026,pd*0.6), STEEL, side*px, 0.04, pz, 0, side*0.5, 0);
    }
    add(box(0.05,0.06,0.55), STEEL, side*0.95,-0.02,-0.85, 0, side*0.5, 0); // wing spar fairing
    // hex sensor blister on the wing
    add(cyl(0.05,0.04,0.04,6), STEEL, side*0.80, 0.05, 0.05, PI2);
    // glowing elevon line on the trailing edge
    add(box(0.55,0.01,0.012), ACCENT, side*1.00, 0.0, -1.42, 0, side*0.16, 0);
    // leading-edge glow line
    const x0=0.28,z0=0.95,x1=2.00,z1=-1.92, dX=x1-x0,dZ=z1-z0,L=Math.hypot(dX,dZ);
    add(box(0.018,0.05,L), GLOW_C, side*(x0+x1)/2, 0.0, (z0+z1)/2, 0, Math.atan2(side*dX,dZ),0);
  }
  // wingtip launch rails + nav lights
  add(box(0.05,0.06,0.60), STEEL, -1.98,0,-1.78); add(sph(0.024,8,6),RED_L,-2.02,0,-1.50);
  add(box(0.05,0.06,0.60), STEEL,  1.98,0,-1.78); add(sph(0.024,8,6),GRN_L, 2.02,0,-1.50);
  add(cyl(0.03,0.02,0.46,6), DARK, -1.72,-0.06,-0.40, PI2); // underwing pod
  add(cyl(0.03,0.02,0.46,6), DARK,  1.72,-0.06,-0.40, PI2);

  // ── 3. COCKPIT — faceted canopy (angular, low-profile, clearly glass) ─────
  add(planform([[0.0,2.45],[0.17,2.05],[0.15,1.55],[0.0,1.40],[-0.15,1.55],[-0.17,2.05]],0.26,0),
      STEEL, 0,0.15,0);                              // canopy frame base (faired in)
  // angular glass — two raked facets, kept low so it doesn't read as a box
  add(box(0.205,0.085,0.40), GLASS, 0,0.245,2.05, -0.30);  // forward windscreen
  add(box(0.185,0.075,0.30), GLASS, 0,0.225,1.74,  0.12);  // aft canopy
  add(box(0.215,0.018,0.46), STEEL, 0,0.205,2.02, -0.30);  // windscreen frame
  add(box(0.011,0.055,0.62), STEEL, 0,0.27, 1.92);         // canopy centre rib
  add(box(0.013,0.012,0.50), GLOW_C, 0,0.30, 1.92);        // thin dorsal light line

  // ── 4. TWIN CANTED TAIL FINS — compact raked stabilisers ──────────────────
  const FIN=[[0.34,0.00],[0.20,0.80],[-0.12,0.74],[-0.30,0.00]];   // smaller, neat raked blade
  const finGeo=planform(FIN,0.030,0.008);
  for(const side of[-1,1]){
    const fin=new THREE.Mesh(finGeo,FACET);         // matte dark blade (even shading)
    fin.rotation.x=-PI2; fin.rotation.y=side<0?Math.PI:0;
    const fg=new THREE.Group(); fg.add(fin);
    // platinum leading-edge cap + violet glow line so the fin reads against space
    const cap=new THREE.Mesh(box(0.020,0.020,0.80),TITAN); cap.position.set(0,0.38,0.15); cap.rotation.x=0.42; fin.add(cap);
    const le=new THREE.Mesh(box(0.013,0.013,0.74),GLOW_C); le.position.set(0,0.39,0.16); le.rotation.x=0.42; fin.add(le);
    // structural ribs + insignia on the fin face so it never reads as a blank sail
    const spar=new THREE.Mesh(box(0.042,0.46,0.018),STEEL); spar.position.set(0,0.30,0.04); fin.add(spar);
    for(const ry of [0.16,0.30,0.44]){
      const rib=new THREE.Mesh(box(0.040,0.010,0.20),DARK); rib.position.set(0,ry,0.03); fin.add(rib);
    }
    const fp=new THREE.Mesh(box(0.046,0.20,0.13),STEEL); fp.position.set(0,0.22,-0.03); fin.add(fp);
    const fpl=new THREE.Mesh(box(0.048,0.07,0.04),ACCENT); fpl.position.set(0,0.22,-0.03); fin.add(fpl); // glowing unit badge
    // fin root fairing
    add(box(0.07,0.16,0.50), STEEL, side*0.42,0.08,-1.55, 0,0,side*0.26);
    fg.position.set(side*0.42,0.12,-1.55); fg.rotation.z=-side*0.28;
    g.add(fg);
  }
  // larger ventral fins
  for(const side of[-1,1])
    add(planform([[0.42,0.0],[0.05,0.50],[-0.36,0.0]],0.028,0), STEEL,
        side*0.30,-0.24,-1.98, -PI2, side<0?Math.PI:0, side*0.4);

  // ── 5. AIR INTAKES + spinning faceted compressor fans (animated) ──────────
  for(const side of[-1,1]){
    const x=side*0.30;
    // angular caret intake (boxy, chined) instead of a round tube
    add(box(0.20,0.20,0.60), DARK, x,-0.04,0.55, 0, side*0.12, 0.0);
    add(box(0.22,0.05,0.62), STEEL, x,0.07,0.55, 0, side*0.12, 0);     // upper lip
    add(box(0.016,0.20,0.62), ACCENT, x+side*0.10,-0.04,0.55, 0,side*0.12,0); // splitter glow
    const fan=new THREE.Group();
    fan.add(new THREE.Mesh(cyl(0.04,0.04,0.04,6),STEEL));
    for(let i=0;i<9;i++){ const a=(i/9)*Math.PI*2;
      const b=new THREE.Mesh(box(0.016,0.10,0.006),STEEL);
      b.position.set(Math.cos(a)*0.07,Math.sin(a)*0.07,0); b.rotation.z=a+0.5; fan.add(b);
    }
    fan.position.set(x,-0.04,0.84); g.add(fan); spin.push(fan);
  }

  // ── 6. GREEBLE / SURFACE TEXTURE — dense intentional detail ───────────────
  for(const side of[-1,1]){
    // staggered hull panel plates (two-tone) running along the chine
    for(let i=0;i<7;i++){
      const z=1.6-i*0.52;
      add(box(0.10,0.012,0.40), i%2?SKIN2:CARBON, side*0.26, 0.06, z, 0, side*0.16, 0);
    }
    // raised avionics boxes / hatches
    for(const [bx,by,bz,bw,bh,bd] of [
      [0.16,0.22,0.95,0.14,0.05,0.22],[0.20,0.10,0.20,0.10,0.05,0.30],
      [0.22,0.0,-0.70,0.10,0.06,0.24],[0.12,0.26,-0.30,0.18,0.04,0.16]]){
      add(box(bw,bh,bd), STEEL, side*bx,by,bz);
      add(box(bw*0.6,bh*0.4,bd*0.7), DARK, side*bx,by+bh*0.5,bz); // recessed top
    }
    // louvered side vents (texture)
    for(let i=0;i<4;i++) add(box(0.012,0.05,0.20), DARK, side*0.34,0.04,-0.9-i*0.12, 0,0,0.3);
    // small antennae
    add(box(0.01,0.18,0.02), STEEL, side*0.10,0.30,-0.10);
    add(cyl(0.006,0.006,0.20,4), STEEL, side*0.18,-0.18,0.70);
  }
  // dorsal greeble spine: alternating raised blocks + light strip
  for(let i=0;i<8;i++) add(box(0.08,0.04,0.10), i%2?STEEL:DARK, 0,0.27,1.6-i*0.46);
  add(box(0.02,0.02,3.0), ACCENT, 0,0.30,0.2);            // dorsal light channel
  // belly sensor turret + panels
  add(cyl(0.07,0.05,0.06,6), STEEL, 0,-0.26,2.2, PI2);
  add(sph(0.045,8,6), DARK, 0,-0.30,2.2); add(sph(0.030,8,6), GLOW_C, 0,-0.33,2.22);
  for(let i=0;i<5;i++) add(box(0.012,0.012,0.30), ACCENT, 0,-0.20,1.4-i*0.7); // belly centreline

  // ── 7. TWIN VECTORING NOZZLES — faceted, with animated plume ──────────────
  const plumeMat = new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
    uniforms:{uThrottle:{value:0},uTime:{value:0}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`
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
  glows.push({material:plumeMat, _isMat:true});

  const mkBell = (bx,by,R,plumeLen) => {
    const nzZ=-2.42;
    add(cyl(R*1.20,R*0.72,0.44,8,1,true), DARK,  bx,by,nzZ, PI2);     // faceted skirt
    add(cyl(R*1.14,R*1.14,0.06,8), STEEL,  bx,by,nzZ+0.20, PI2);      // nozzle ring
    for(let k=0;k<8;k++){ const a=(k/8)*Math.PI*2;                    // vectoring petals
      add(box(R*0.34,0.014,0.22), STEEL, bx+Math.cos(a)*R*0.92, by+Math.sin(a)*R*0.92, nzZ+0.05, 0,0,a);
    }
    add(cyl(R*0.66,R*0.34,0.24,8,1,true), GLOW_W, bx,by,nzZ+0.08, PI2);
    add(cyl(R*1.22,R*1.40,0.012,8), GLOW_O, bx,by,nzZ-0.006);
    const cr=new THREE.Mesh(sph(R*0.24,8,6), new THREE.MeshBasicMaterial({color:0xe6f6ff}));
    cr.position.set(bx,by,nzZ-0.06); g.add(cr); cores.push(cr);
    const pl=new THREE.Mesh(new THREE.CylinderGeometry(R*0.66,0.002,plumeLen,16,5,true), plumeMat);
    pl.position.set(bx,by,nzZ-plumeLen*0.54); pl.rotation.x=PI2;
    pl.userData.plume=true; g.add(pl); glows.push(pl);
  };
  for(const side of[-1,1]){
    add(box(0.34,0.30,0.80), STEEL, side*0.22,0,-1.85);   // angular engine nacelle
    add(box(0.30,0.04,0.80), DARK,  side*0.22,0.17,-1.85); // nacelle top panel
    mkBell(side*0.22, 0, 0.17, 1.70);
  }

  g.userData.glows=glows;
  g.userData.cores=cores;
  g.userData.spin=spin;
  g.visible=false;
  g.renderOrder=5;
  return g;
})();
const _shipQ = new THREE.Quaternion();
// initialise the fly state from the current orbit parameters so toggling is seamless
// (derived from orbit coords, not the camera, so it works before the next render)
function syncFlyFromOrbit(m) {
  const o = orbits[m];
  const phi = Math.max(0.05, Math.min(Math.PI - 0.05, o.phi));
  fly.pos.set(
    o.target.x + o.r * Math.sin(phi) * Math.cos(o.theta),
    o.target.y + o.r * Math.cos(phi),
    o.target.z + o.r * Math.sin(phi) * Math.sin(o.theta),
  );
  const dir = o.target.clone().sub(fly.pos).normalize();
  fly.yaw = Math.atan2(dir.x, dir.z);
  fly.pitch = Math.asin(Math.max(-1, Math.min(1, dir.y)));
  fly.goto = null;
}
// write the fly state back into orbit coords so orbiting resumes from here
function syncOrbitFromFly(m) {
  const o = orbits[m];
  const rel = fly.pos.clone().sub(o.target);
  o.r = Math.max(0.001, rel.length());
  const dir = rel.clone().normalize();
  o.phi = Math.acos(Math.max(-1, Math.min(1, dir.y)));
  o.theta = Math.atan2(dir.z, dir.x);
  o.follow = null;
}
// distance-based scale hand-offs while flying — mirror of applyZoom's chain
// Hard outer walls per scale, kept well inside float32's precision-loss zone (~1e6+),
// so you can never fly the camera out to where the ship's vertices scatter / coords go NaN.
const FLY_WALL = { neighborhood: 6000, galaxy: 2500, cosmic: 160 };
function flyHandoff(m) {
  // NaN/Infinity guard: extreme speed × distance could overflow float32 and would otherwise
  // scatter the ship and freeze the whole render loop. Snap back to a safe vantage instead.
  if (!Number.isFinite(fly.pos.x) || !Number.isFinite(fly.pos.y) || !Number.isFinite(fly.pos.z)) {
    fly.pos.set(0, 0, (FLY_WALL[m] || 100) * 0.5);
    flyThrottle = false; flyCruise = false; flySpeed = 1;
    return;
  }
  // The shell chain is retired: the only transition is solar → the deep continuum
  // when you fly past the planetary system's edge. Everything beyond is deepScene.
  if (m === 'solar') { if (fly.pos.length() > 3800) diveOutToDeep(); return; }
  // Every other scale stops at a hard wall at the edge of its scene rather than letting you
  // fly off into the precision-death zone (which broke the ship apart and hung the game).
  const wall = FLY_WALL[m];
  if (wall && fly.pos.length() > wall) {
    fly.pos.setLength(wall);
    flyThrottle = false; flyCruise = false;
  }
  if (m === 'galaxy' && fly.pos.length() < 1.15) {   // Sgr A*: hold at the photon ring —
    fly.pos.setLength(1.15);                          // inside the shadow is just black
    flyThrottle = false; flyCruise = false;
  }
}
function applyFlyCam(m, dt) {
  const cam = camFor(m);
  if (m === 'solar' && orbits.solar.follow && solBodies[orbits.solar.follow]) {
    orbits.solar.target.copy(solBodies[orbits.solar.follow].pos);
  }
  // ride along with an attached body (a "view from here" vantage), so you orbit/move
  // with it — e.g. circling Earth aboard the ISS. Any manual thrust detaches you.
  if (fly.attach) fly.pos.copy(fly.attach.get()).add(fly.attach.offset);
  const ref = Math.max(0.4, fly.pos.distanceTo(orbits[m].target));
  // STEERING — the cursor is a flight stick (centre = straight, edges = turn). It stays
  // neutral until you first bring the cursor to the centre.
  {
    const dz = 0.16;                                    // central dead-zone
    if (!flyArmed && Math.abs(mouseNDC.x) < dz && Math.abs(mouseNDC.y) < dz) {
      flyArmed = true; flyArmPrompt.classList.remove('show');
    }
    if (flyArmed) {
      const stick = (v) => { const a = Math.abs(v); return a < dz ? 0 : Math.sign(v) * (a - dz) / (1 - dz); };
      const sx = stick(mouseNDC.x), sy = stick(mouseNDC.y);
      fly.yaw -= sx * 1.6 * dt;                         // cursor-right turns the nose right
      fly.pitch = Math.max(-1.45, Math.min(1.45, fly.pitch + sy * 1.4 * dt));
      if (sx || sy) fly.goto = null;
    }
  }
  const fwd = flyForward();
  _right.crossVectors(fwd, _wup).normalize();
  // THRUST — Space cruises hands-free, hold mouse to thrust, WASD optional. Any of these
  // detaches a ride-along vantage so you can fly off freely.
  const boost = (heldKeys.has('shift') ? 4.0 : 1) * flySpeed;   // Shift boost × scroll throttle
  const F = (heldKeys.has('arrowup') || heldKeys.has('w') ? 1 : 0) - (heldKeys.has('arrowdown') || heldKeys.has('s') ? 1 : 0);
  const S = (heldKeys.has('arrowright') || heldKeys.has('d') ? 1 : 0) - (heldKeys.has('arrowleft') || heldKeys.has('a') ? 1 : 0);
  const auto = (flyThrottle || flyCruise) ? 1 : 0;
  if (auto || F || S) {
    fly.goto = null; fly.attach = null;
    const speed = 0.9 * ref * boost * dt;
    if (auto || F) fly.pos.addScaledVector(fwd, (auto * 0.6 + F) * speed);
    if (S) fly.pos.addScaledVector(_right, S * speed);
  } else if (fly.goto) {
    fly.pos.lerp(fly.goto, Math.min(1, dt * 2.4));       // double-click glide-to
    if (fly.pos.distanceTo(fly.goto) < ref * 0.02) fly.goto = null;
  }
  if (!fly.attach) flyCollide(m);                        // don't let the ship pass into a body
  flyHandoff(m);
  orbits[m].r = fly.pos.distanceTo(orbits[m].target);   // keep scalebar/label logic in sync
  const f2 = flyForward();
  if (thirdPerson) {
    if (shipModel.parent !== sceneFor(m)) sceneFor(m).add(shipModel);
    shipModel.visible = true;
    // Ship scale proportional to scene but capped; camera always the same number of
    // ship-lengths behind so the ship occupies a consistent portion of the frame.
    // Multiplier 7.5 matches the deep "solar neighbourhood" view (applyDeepCam) so the ship
    // is the same apparent size and framing in the solar system as out among the stars.
    const sc = Math.min(ref * 0.018 + 0.010, 0.60);
    const camDist = sc * 7.5;
    shipModel.scale.setScalar(sc);
    cam.position.copy(fly.pos).addScaledVector(f2, -camDist).addScaledVector(_wup, camDist * 0.32);
    cam.lookAt(fly.pos.clone().addScaledVector(f2, camDist * 0.18));
    shipModel.position.copy(fly.pos);
    shipModel.quaternion.copy(_shipQ.setFromUnitVectors(SHIP_FWD, f2));
    // Fill light: close to camera so it always illuminates the ship face we can see
    shipFillLight.position.copy(fly.pos).addScaledVector(f2, -camDist * 0.4).addScaledVector(_wup, camDist * 0.6);
    shipFillLight.visible = true;
    const throttleOn = flyThrottle || flyCruise;
    const nowS = performance.now() / 1000;
    const eo = (throttleOn ? 0.78 : 0.12) + Math.sin(performance.now() / 80) * 0.06;
    for (const gl of shipModel.userData.glows) {
      if (gl.material.uniforms?.uThrottle !== undefined) {
        gl.material.uniforms.uThrottle.value = eo;
        if (gl.material.uniforms.uTime) gl.material.uniforms.uTime.value = nowS;
      } else if (gl.material.opacity !== undefined) gl.material.opacity = eo;
    }
    for (const s of shipModel.userData.spin) s.rotation.z = nowS * 0.4;
  } else {
    shipModel.visible = false;
    shipFillLight.visible = false;
    cam.position.copy(fly.pos);
    cam.lookAt(fly.pos.clone().add(f2));
  }
}
// solid-body collision: keep the camera a little outside any body it approaches
function flyCollide(m) {
  if (m !== 'solar') return;
  const push = (p, rad) => {
    const minD = rad * 1.35 + 0.12;
    const d = fly.pos.distanceTo(p);
    if (d < minD) {
      const out = d > 1e-4 ? fly.pos.clone().sub(p).normalize() : flyForward().negate();
      fly.pos.copy(p).addScaledVector(out, minD);
    }
  };
  push(_zeroV, 2.3);                                     // Sun
  for (const n of SOL_PLANETS) push(solBodies[n].pos, displayRadius(n));
  push(solBodies.Moon.pos, displayRadius('Moon'));
  for (const mo of MOONS_RT) push(mo.world, mo.dispR);  // planetary moons (world pos cached per frame)
}
const _zeroV = new THREE.Vector3();
// double-click an object to fly to and frame it
const flyHud = document.getElementById('fly-hud');
const flyBtn = document.getElementById('fly-btn');
const crosshair = document.getElementById('crosshair');
const flyArmPrompt = document.getElementById('fly-arm');
const fadeEl = document.getElementById('fade');
let flyHudHidden = true;                       // spaceship-controls panel off by default — only the menu shows it (not F)
function flyShowToggle() {
  const active = (flyMode && FLY_MODES.has(mode)) || mode === 'deep';   // flying is via F / double-click / the touch 🚀 button
  // on touch the HUD is the only set of flight controls — always show it while flying
  flyHud.classList.toggle('show', active && (!flyHudHidden || TOUCH_UI));
  crosshair.classList.toggle('show', active);
  flyArmPrompt.classList.toggle('show', active && !flyArmed);
  const cr = document.getElementById('fh-cruise');
  if (cr) { cr.textContent = flyCruise ? 'CRUISING — Space to stop' : 'cruise (hands-free)'; cr.style.color = flyCruise ? 'var(--accent)' : ''; }
  const vw = document.getElementById('fh-view');
  if (vw) { vw.textContent = thirdPerson ? 'THIRD person — V for cockpit' : '1st / 3rd person'; vw.style.color = thirdPerson ? 'var(--accent)' : ''; }
  const sp = document.getElementById('fh-speed');
  if (sp) sp.textContent = flySpeed.toFixed(flySpeed < 1 ? 2 : 1) + '×';
  // touch controls mirror the key-bound state
  const cb = document.getElementById('fh-cruise-btn');
  if (cb) { cb.classList.toggle('active', flyCruise); cb.textContent = flyCruise ? '⏸ Cruising' : '⏵ Cruise'; }
  const vb = document.getElementById('fh-view-btn');
  if (vb) vb.textContent = thirdPerson ? '👁 3rd person' : '👁 1st person';
  // the 🚀 door into flight: touch only, flyable scales only, gone while flying
  flyBtn.style.display = TOUCH_UI && !active && FLY_MODES.has(mode) ? 'block' : 'none';
}
function setFlyMode(on) {
  if (!FLY_MODES.has(mode)) on = false;
  if (on) exitRideAlong();   // rideAlong and fly are mutually exclusive
  if (on && !flyMode) {
    syncFlyFromOrbit(mode); flyThrottle = false; thirdPerson = true;
    // touch: no persistent cursor to bring to the centre — arm immediately with the
    // stick neutral, so nothing turns until a finger is actually down
    flyArmed = TOUCH_UI;
    if (TOUCH_UI) { mouseNDC.x = 0; mouseNDC.y = 0; }
  }
  else if (!on && flyMode) syncOrbitFromFly(mode);
  flyMode = on;
  if (!on) { flyCruise = false; fly.attach = null; shipModel.visible = false; }
  flyShowToggle();
}
// true whenever a free-flight camera is active (shell fly modes OR the deep continuum)
const flyish = () => (flyMode && FLY_MODES.has(mode)) || mode === 'deep';
function setFlySpeed(mult) { flySpeed = Math.max(0.15, Math.min(12, mult)); flyShowToggle(); }
document.getElementById('fh-slower').onclick = () => setFlySpeed(flySpeed / 1.4);
document.getElementById('fh-faster').onclick = () => setFlySpeed(flySpeed * 1.4);
// touch flight: 🚀 enters with cruise on (hands-free motion, nothing to hold),
// and the HUD's buttons stand in for Space / V / F
flyBtn.onclick = () => { setFlyMode(true); flyCruise = true; flyShowToggle(); };
document.getElementById('fh-cruise-btn').onclick = () => {
  flyCruise = !flyCruise;
  if (flyCruise) fly.goto = null;
  flyShowToggle();
};
document.getElementById('fh-view-btn').onclick = () => { thirdPerson = !thirdPerson; flyShowToggle(); };
document.getElementById('fh-exit').onclick = () => {
  if (mode === 'deep') exitDeepInPlace();   // same meaning as F: stop flying, stay here
  else setFlyMode(false);
};

// double-click destination: aim a fly-to at whatever is under the cursor
const _fndc = new THREE.Vector2(), _fray = new THREE.Raycaster();
function flyToObject(cx, cy) {
  if (!FLY_MODES.has(mode)) return;
  if (!flyMode) setFlyMode(true);
  _fndc.set((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
  _fray.setFromCamera(_fndc, camFor(mode));
  const dir = _fray.ray.direction;
  if (mode === 'solar') {
    // snap to the nearest solar body along the ray and frame it
    let best = null;
    const v = new THREE.Vector3();
    for (const name of ['Sun', ...SOL_PLANETS, 'Moon']) {
      v.copy(name === 'Sun' ? new THREE.Vector3() : solBodies[name].pos).project(solCam);
      if (v.z > 1) continue;
      const px = Math.hypot((v.x - _fndc.x) * innerWidth / 2, (v.y - _fndc.y) * innerHeight / 2);
      if (px < 80 && (!best || px < best.px)) best = { name, px };
    }
    if (best) {
      const bp = best.name === 'Sun' ? new THREE.Vector3() : solBodies[best.name].pos.clone();
      const rad = best.name === 'Sun' ? 2.0 : displayRadius(best.name === 'Moon' ? 'Moon' : best.name);
      const standoff = Math.max(1.4, rad * 5);
      const back = fly.pos.clone().sub(bp).normalize();
      fly.goto = bp.clone().addScaledVector(back, standoff);
      orbits.solar.follow = best.name === 'Sun' ? null : best.name;
      orbits.solar.target.copy(bp);
      return;
    }
  }
  // generic: glide forward toward where you clicked
  fly.goto = fly.pos.clone().addScaledVector(dir, fly.pos.distanceTo(orbits[mode].target) * 0.6);
}

const setMouseNDC = (e) => {
  mouseNDC.x = (e.clientX / innerWidth) * 2 - 1;
  mouseNDC.y = -((e.clientY / innerHeight) * 2 - 1);
};
let dragging = false, downX = 0, downY = 0, lastX = 0, lastY = 0, downT = 0;
// touch: track live pointers so two fingers become pinch-zoom + two-finger pan
const livePointers = new Map();
let pinching = false, pinchDist = 0, pinchMidX = 0, pinchMidY = 0, wasPinch = false;
const pinchGeom = () => {
  const [a, b] = [...livePointers.values()];
  return { d: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
};
renderer.domElement.addEventListener('pointerdown', (e) => {
  livePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (livePointers.size === 2) {                 // second finger → pinch takes over
    dragging = false;
    pinching = true; wasPinch = true;
    ({ d: pinchDist, mx: pinchMidX, my: pinchMidY } = pinchGeom());
    flyThrottle = false;
    renderer.domElement.setPointerCapture(e.pointerId);
    return;
  }
  dragging = true; wasPinch = false;
  downX = lastX = e.clientX; downY = lastY = e.clientY; downT = performance.now();
  skyView.vLon = skyView.vLat = 0;
  setMouseNDC(e);
  if (flyish()) flyThrottle = true;   // hold mouse → thrust
  renderer.domElement.setPointerCapture(e.pointerId);
});
renderer.domElement.addEventListener('pointermove', (e) => {
  if (livePointers.has(e.pointerId)) livePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pinching && livePointers.size >= 2) {
    const { d, mx, my } = pinchGeom();
    if (pinchDist > 0 && d > 0) {
      if (flyish()) {
        flySpeed = Math.max(0.15, Math.min(12, flySpeed * (d / pinchDist)));
        flyShowToggle();
      } else {
        applyZoom(pinchDist / d);                // fingers apart → zoom in
      }
    }
    const dx = mx - pinchMidX, dy = my - pinchMidY;   // two-finger drag pans/orbits
    if (mode === 'sky') {
      const k = skyCam.fov / innerHeight;
      skyView.lon += dx * k; skyView.lat += dy * k;
    } else if (!flyish()) {
      const o = orbits[mode];
      o.theta += dx * 0.0025; o.phi -= dy * 0.0025;
    }
    pinchDist = d; pinchMidX = mx; pinchMidY = my;
    return;
  }
  setMouseNDC(e);                                            // cursor is the flight stick
  if (!dragging) return;
  const dx = e.clientX - lastX, dy = e.clientY - lastY;
  lastX = e.clientX; lastY = e.clientY;
  if (mode === 'sky') {
    const k = skyCam.fov / innerHeight;
    skyView.lon += dx * k;
    skyView.lat += dy * k;
    skyView.vLon = dx * k; skyView.vLat = dy * k;
  } else if (flyish()) {
    // mouse-flight steers via cursor position (handled in applyFlyCam/applyDeepCam); nothing here
  } else {
    const o = orbits[mode];
    o.theta += dx * 0.005;
    o.phi -= dy * 0.005;
    o.vT = dx * 0.005; o.vP = -dy * 0.005;
  }
});
const dropPointer = (e) => {
  livePointers.delete(e.pointerId);
  if (pinching && livePointers.size < 2) {
    pinching = false;
    if (livePointers.size === 1) {               // one finger left → clean drag resume
      const p = [...livePointers.values()][0];
      dragging = true;
      downX = lastX = p.x; downY = lastY = p.y; downT = 0;   // downT 0 → can't count as a tap
    }
  }
};
addEventListener('pointercancel', dropPointer);
let lastTapT = 0, lastTapX = 0, lastTapY = 0;
addEventListener('pointerup', (e) => {
  dropPointer(e);
  flyThrottle = false;
  // touch: the finger IS the flight stick — lifting it recentres, so the ship flies
  // straight instead of turning forever toward wherever the screen was last touched
  if (e.pointerType === 'touch' && livePointers.size === 0) releaseFlightStick();
  if (!dragging || wasPinch) return;
  if (livePointers.size === 0) dragging = false;
  const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
  if (dist < 5 && performance.now() - downT < 450) {
    const now = performance.now();
    if (now - lastTapT < 350 && Math.hypot(e.clientX - lastTapX, e.clientY - lastTapY) < 30) {
      flyToObject(e.clientX, e.clientY);           // double-tap = double-click: fly there
      lastTapT = 0;
    } else {
      handleClick(e.clientX, e.clientY);
      lastTapT = now; lastTapX = e.clientX; lastTapY = e.clientY;
    }
  }
});
// when the cursor leaves the window/canvas, recentre the flight stick so the ship stops
// turning on its own (and cut the engines if the window loses focus)
const releaseFlightStick = () => { mouseNDC.x = 0; mouseNDC.y = 0; };
addEventListener('blur', () => { flyThrottle = false; releaseFlightStick(); });
renderer.domElement.addEventListener('pointerleave', releaseFlightStick);
addEventListener('mouseout', (e) => { if (!e.relatedTarget) releaseFlightStick(); });
// double-click to fly to and frame whatever is under the cursor
renderer.domElement.addEventListener('dblclick', (e) => { flyToObject(e.clientX, e.clientY); });
// zoom with continuous hand-offs: solar <-> neighborhood <-> galaxy form one
// "powers of ten" zoom chain; sky (FOV) and black hole stay self-contained
function applyZoom(f) {
  if (mode === 'sky') {
    skyCam.fov = Math.max(0.8, Math.min(95, skyCam.fov * f));
    skyCam.updateProjectionMatrix();
    rescaleLabels('sky');
    return;
  }
  const o = orbits[mode];
  o.r *= f;
  const toNeighborhood = (r) => {
    setMode('neighborhood');
    orbits.neighborhood.follow = null; orbits.neighborhood.target.set(0, 0, 0); orbits.neighborhood.r = r;
  };
  if (mode === 'solar') {
    if (o.r > 3600) { toNeighborhood(1.8); return; }   // zoom out past the planets → stellar neighbourhood
    o.r = Math.max(4, o.r);
  } else if (mode === 'neighborhood') {
    if (o.r > 2900) { setMode('galaxy'); orbits.galaxy.follow = null; orbits.galaxy.target.set(0, 0, 0); orbits.galaxy.r = 3.2; return; }
    if (o.r < 1.6) {
      setMode('solar');
      orbits.solar.follow = null;
      orbits.solar.target.set(0, 0, 0);
      orbits.solar.r = 3500;
      return;
    }
  } else if (mode === 'galaxy') {
    // zoom in → drop to the stellar neighbourhood (so you can always continue inward to the
    // solar system instead of getting pinned at Sgr A* in the galactic centre)
    if (o.r < 2.0) { toNeighborhood(2700); return; }
    if (o.r > 1700) { setMode('cosmic'); orbits.cosmic.r = 7; return; }   // zoom out → cosmic web
    o.r = Math.min(1700, o.r);
  } else if (mode === 'cosmic') {
    if (o.r < 3.2) { setMode('galaxy'); orbits.galaxy.r = 1500; return; } // zoom back into the Local Group
    o.r = Math.min(86, o.r);                                              // stop just inside the CMB shell
  }
}

renderer.domElement.addEventListener('wheel', (e) => {
  e.preventDefault();
  const pinch = e.ctrlKey || e.metaKey;                  // trackpad pinch gesture
  const pan = !pinch && Math.abs(e.deltaX) > 0.5;        // two-finger trackpad pan
  if (flyish() && !pan) {
    // scroll is a throttle: sets the cruise/thrust speed multiplier (shown in the HUD)
    flySpeed = Math.max(0.15, Math.min(12, flySpeed * Math.exp(-e.deltaY * 0.0012)));
    flyShowToggle();
    return;
  }
  if (pan) {
    if (mode === 'sky') {
      const k = skyCam.fov / innerHeight;
      skyView.lon += e.deltaX * k;
      skyView.lat += e.deltaY * k;
    } else {
      const o = orbits[mode];
      o.theta += e.deltaX * 0.0025;
      o.phi += e.deltaY * 0.0025;
    }
  } else {
    applyZoom(Math.exp(e.deltaY * (pinch ? 0.01 : 0.0011)));
  }
}, { passive: false });

// keyboard navigation: arrows / WASD move, + and - zoom (held keys are smooth)
const heldKeys = new Set();
addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', '_',
    'a', 'd', 'w', 's', 'A', 'D', 'W', 'S', 'Shift'].includes(e.key)) {
    e.preventDefault();
    heldKeys.add(e.key.toLowerCase());
  }
});
addEventListener('keyup', (e) => heldKeys.delete(e.key.toLowerCase()));
addEventListener('blur', () => heldKeys.clear());

function applyHeldKeys(dt) {
  if (!heldKeys.size) return;
  if (mode === 'deep') return;                           // deep flight handles its own keys
  if (flyish()) return;                                 // fly camera consumes the keys itself
  const L = heldKeys.has('arrowleft') || heldKeys.has('a');
  const R = heldKeys.has('arrowright') || heldKeys.has('d');
  const Up = heldKeys.has('arrowup') || heldKeys.has('w');
  const Dn = heldKeys.has('arrowdown') || heldKeys.has('s');
  const zi = heldKeys.has('+') || heldKeys.has('=');
  const zo = heldKeys.has('-') || heldKeys.has('_');
  if (mode === 'sky') {
    const rate = 55 * (skyCam.fov / 60) * dt;
    skyView.lon += (R - L) * rate;
    skyView.lat += (Up - Dn) * rate;
  } else {
    const o = orbits[mode];
    o.theta += (R - L) * 1.5 * dt;
    o.phi -= (Up - Dn) * 1.1 * dt;
  }
  if (zi) applyZoom(Math.exp(-1.5 * dt));
  if (zo) applyZoom(Math.exp(1.5 * dt));
}

// ---------------------------------------------------------------- time engine
const SPEEDS = [
  [-31557600, '−1 yr/s'], [-2592000, '−30 d/s'], [-604800, '−7 d/s'], [-86400, '−1 day/s'],
  [-3600, '−1 hr/s'], [1, 'real time'], [60, '1 min/s'], [3600, '1 hr/s'], [86400, '1 day/s'],
  [604800, '7 d/s'], [2592000, '30 d/s'], [31557600, '1 yr/s'], [315576000, '10 yr/s'],
];
const time = { jd: jdFromDate(new Date()), speedIdx: 5, running: true };
// the ephemeris (JPL long-term Keplerian elements) is valid 3000 BC – 3000 AD; the
// clock stops at year 1000 / 3000 so every planet position on screen stays honest
const JD_MIN = 2086307.5, JD_MAX = 2816787.5;   // 1000-01-01 … 3000-01-01
const clampJD = (jd) => Math.min(JD_MAX, Math.max(JD_MIN, jd));
const speedLabel = document.getElementById('speed-label');
const dateLabel = document.getElementById('date-label');
const dateInput = document.getElementById('date-input');
const btPlay = document.getElementById('bt-play');

function fmtDate(jd) {
  const dt = dateFromJd(jd);
  if (isNaN(dt)) return '—';
  const p = (n) => String(n).padStart(2, '0');
  return `${dt.getUTCFullYear()}-${p(dt.getUTCMonth() + 1)}-${p(dt.getUTCDate())} ` +
    `${p(dt.getUTCHours())}:${p(dt.getUTCMinutes())} UTC`;
}
function refreshTimeUI() {
  speedLabel.textContent = SPEEDS[time.speedIdx][1];
  dateLabel.textContent = fmtDate(time.jd);
  btPlay.textContent = time.running ? '❚❚' : '▶';
}
document.getElementById('bt-now').onclick = () => { time.jd = jdFromDate(new Date()); time.speedIdx = 5; refreshTimeUI(); };
document.getElementById('bt-faster').onclick = () => { time.speedIdx = Math.min(SPEEDS.length - 1, time.speedIdx + 1); refreshTimeUI(); };
document.getElementById('bt-slower').onclick = () => { time.speedIdx = Math.max(0, time.speedIdx - 1); refreshTimeUI(); };
btPlay.onclick = () => { time.running = !time.running; refreshTimeUI(); };
dateLabel.onclick = () => {
  const dt = dateFromJd(time.jd);
  const p = (n) => String(n).padStart(2, '0');
  dateInput.value = `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())}T${p(dt.getHours())}:${p(dt.getMinutes())}`;
  dateInput.showPicker ? dateInput.showPicker() : dateInput.click();
};
dateInput.onchange = () => {
  const dt = new Date(dateInput.value);
  if (!isNaN(dt)) { time.jd = clampJD(jdFromDate(dt)); refreshTimeUI(); }
};

// ---------------------------------------------------------------- info panel
const infocard = document.getElementById('infocard');
const infoName = document.getElementById('info-name');
const infoSub = document.getElementById('info-sub');
const infoRows = document.getElementById('info-rows');
document.getElementById('info-close').onclick = () => { infocard.classList.remove('open'); selMark.visible = false; neiSelMark.visible = false; };

function showInfo(title, sub, rows, doc, pov, action) {
  infoName.textContent = title;
  infoSub.textContent = sub;
  infoRows.innerHTML = (doc ? `<div class="info-doc">${doc}</div>` : '') + rows
    .map(([k, v]) => `<div class="info-row"><span class="k">${k}</span><span>${v}</span></div>`)
    .join('') + (pov ? '<button id="info-pov" class="minibtn" style="margin-top:11px">👁  View from here</button>' : '')
    + (action && action.label ? `<button id="info-action" class="minibtn" style="margin-top:11px">${action.label}</button>` : '')
  ;
  infocard.classList.add('open');
  if (pov) document.getElementById('info-pov').onclick = () => viewFromObject(pov);
  if (action && action.label) document.getElementById('info-action').onclick = action.fn;
}
// place the fly camera at an object so you see the universe from its vantage point
function showSatInfo(s) {
  const periodMin = ((2 * Math.PI) / s.speed / 60).toFixed(1);
  const orbitsPerDay = (1440 / +periodMin).toFixed(2);
  showInfo(s.name, 'Earth satellite / spacecraft',
    [['Altitude', s.altKm >= 1000 ? (s.altKm / 1000).toFixed(3) + ' million km' : s.altKm + ' km'],
     ['Orbital period', `${periodMin} min (${orbitsPerDay} orbits/day)`]],
    s.doc, { obj: s, lookEarth: true });
}

// rideAlong: lock solCam to a moving object's POV without enabling fly mode.
// The camera sits at the object's world position looking toward its reference body.
let rideAlong = null;   // null | { getPos, getLook, label }
function applyRideAlong() {
  if (!rideAlong) return;
  const pos = rideAlong.getPos();
  const look = rideAlong.getLook();
  solCam.position.copy(pos);
  if (rideAlong.up) solCam.up.copy(rideAlong.up()); else solCam.up.set(0, 1, 0);
  solCam.lookAt(look);
}
function exitRideAlong() {
  if (!rideAlong) return;
  // Return to orbit cam centred on Earth so the user isn't lost
  orbits.solar.follow = 'Earth';
  orbits.solar.r = Math.max(3, orbits.solar.r);
  rideAlong = null;
  document.body.classList.remove('riding');
  document.getElementById('ride-exit')?.remove();
}

const _povN = new THREE.Vector3(), _povE = new THREE.Vector3(), _povT = new THREE.Vector3();
function viewFromObject(pov) {
  setMode('solar');
  const obj = pov.obj;
  const surfBody = pov.surfaceBody && solBodies[pov.surfaceBody];
  let getPos, getLook, upGet = null;
  if (surfBody) {
    // Standing ON a surface (e.g. a lunar landing site): lift the eye just above the
    // ground so the body's limb doesn't clip into a black sliver, keep the horizon level
    // (up = surface normal), and look out over the horizon toward Earth — an Earthrise view.
    const liftR = displayRadius(pov.surfaceBody) * 0.04;       // ~eye height above the surface
    const eyePos = () => { _povN.copy(obj.world).sub(surfBody.pos).normalize();
      return obj.world.clone().addScaledVector(_povN, liftR); };
    getPos = eyePos;
    upGet = () => obj.world.clone().sub(surfBody.pos).normalize();
    getLook = () => {
      const cp = eyePos();
      _povN.copy(obj.world).sub(surfBody.pos).normalize();
      _povE.copy(solBodies.Earth.pos).sub(cp).normalize();      // direction to Earth
      _povT.copy(_povE).addScaledVector(_povN, -_povE.dot(_povN));   // its horizontal (tangent) part
      if (_povT.lengthSq() < 1e-4) { _povT.set(_povN.z, 0, -_povN.x); }  // Earth at zenith → any tangent
      _povT.normalize();
      // aim along the horizon toward Earth's azimuth, pitched up ~20° so Earth sits in frame
      _povT.multiplyScalar(Math.cos(0.35)).addScaledVector(_povN, Math.sin(0.35));
      return cp.add(_povT);
    };
  } else {
    getLook = () => {
      if (pov.lookEarth) return solBodies.Earth.pos.clone();
      if (obj.parent && solBodies[obj.parent]) return solBodies[obj.parent].pos.clone();
      return new THREE.Vector3();   // Sun
    };
    getPos = () => (obj.world ? obj.world.clone() : (obj.pos ? obj.pos.clone() : new THREE.Vector3()));
  }
  // Exit any existing fly mode — POV is a separate locked-camera state
  if (flyMode) setFlyMode(false);
  rideAlong = { getPos, getLook, up: upGet, label: obj.name || 'object' };
  orbits.solar.follow = null;
  infocard.classList.remove('open');
  document.body.classList.add('riding');   // the scale readout describes the orbit view — hide it here
  // Show a small exit banner so the user knows how to get back
  let banner = document.getElementById('ride-exit');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'ride-exit';                       // positioned & styled in index.html CSS
    document.body.appendChild(banner);
  }
  banner.innerHTML = `👁 Viewing from <b style="color:#d6e2f5">${rideAlong.label}</b> &nbsp;·&nbsp; <span style="cursor:pointer;color:#7fb4ff" onclick="window.U&&window.U.exitRideAlong()">✕ Exit</span>`;
}

// ---- star ↔ exoplanet-archive cross-reference, so clicking Proxima Centauri or
// tau Ceti in ANY view shows its real planets. The archive names hosts with
// abbreviations ("Proxima Cen", "eps Eri", "HD 209458"), so match on normalized
// forms of the star's proper name, Bayer designation, and catalog ids.
let exoByStar = null;
const GREEK_ABBR = { alf: 'alpha', bet: 'beta', gam: 'gamma', del: 'delta', eps: 'epsilon',
  zet: 'zeta', tet: 'theta', the: 'theta', iot: 'iota', kap: 'kappa', lam: 'lambda',
  ksi: 'xi', omi: 'omicron', sig: 'sigma', ups: 'upsilon', ome: 'omega' };
const GREEK_SYM = { 'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'δ': 'delta', 'ε': 'epsilon',
  'ζ': 'zeta', 'η': 'eta', 'θ': 'theta', 'ι': 'iota', 'κ': 'kappa', 'λ': 'lambda', 'μ': 'mu',
  'ν': 'nu', 'ξ': 'xi', 'ο': 'omicron', 'π': 'pi', 'ρ': 'rho', 'σ': 'sigma', 'τ': 'tau',
  'υ': 'upsilon', 'φ': 'phi', 'χ': 'chi', 'ψ': 'psi', 'ω': 'omega' };
function normStarName(s) {
  return s.toLowerCase()
    .replace(/[αβγδεζηθικλμνξοπρστυφχψω]/g, (ch) => GREEK_SYM[ch])
    .replace(/[^a-z0-9 ]/g, '')
    .split(/\s+/).map((w) => GREEK_ABBR[w] || w).join('');
}
function exoForStar(names) {
  if (!exoByStar) {
    exoByStar = new Map();
    EXO.forEach((s, idx) => exoByStar.set(normStarName(s.h), idx));
  }
  const cands = names.filter(Boolean).map(normStarName).filter((c) => c.length >= 3);
  for (const c of cands) if (exoByStar.has(c)) return exoByStar.get(c);
  // archive hosts are often truncations of the proper name ("Proxima Cen")
  for (const c of cands) {
    for (const [h, idx] of exoByStar) {
      if (h.length >= 5 && (c.startsWith(h) || h.startsWith(c))) return idx;
    }
  }
  return -1;
}

function starInfo(i) {
  const catIds = [];                       // HD / HIP catalog designations, if any
  if (STARS.hd && STARS.hd[i]) catIds.push('HD ' + STARS.hd[i]);
  if (STARS.hip && STARS.hip[i]) catIds.push('HIP ' + STARS.hip[i]);
  const name = STARS.names[i] || STARS.desig[i] || catIds[0] || `Star #${i}`;
  const desig = STARS.names[i] ? (STARS.desig[i] || '') : '';
  const conAbbr = i < N_INFO ? STARS.conCodes[STARS.con[i] - 1] : null;
  const rows = [];
  rows.push(['Apparent mag', STARS.mag[i].toFixed(2)]);
  if (catIds.length) rows.push(['Catalog', catIds.join(' · ')]);
  const dd = STARS.dist[i];
  if (dd > 0 && dd < 90000) {
    const ly = dd * PC_LY;
    rows.push(['Distance', `${ly.toFixed(1)} ly (${dd.toFixed(1)} pc)`]);
    rows.push(['Absolute mag', (STARS.mag[i] - 5 * (Math.log10(dd) - 1)).toFixed(2)]);
    // finite light speed: the star is seen as it was when this light departed
    const yr = dateFromJd(time.jd).getUTCFullYear() - ly;
    rows.push(['Light departed', yr >= 0 ? `${Math.round(yr)} CE` : `${Math.round(-yr)} BCE`]);
  } else rows.push(['Distance', 'unknown']);
  if (STARS.spect[i]) rows.push(['Spectral type', STARS.spect[i]]);
  rows.push(['Color index B−V', STARS.ci[i].toFixed(2)]);
  rows.push(['RA / Dec', `${(STARS.ra[i] / 15).toFixed(2)}h / ${STARS.dec[i].toFixed(1)}°`]);
  if (conAbbr && conFull[conAbbr]) rows.push(['Constellation', conFull[conAbbr]]);
  // real planetary system, if the NASA archive knows one for this star
  const exoIdx = exoForStar([STARS.names[i], STARS.desig[i], ...catIds]);
  let action = null;
  if (exoIdx >= 0) {
    const sys = EXO[exoIdx];
    rows.push(['Known planets', String(sys.p.length)]);
    for (const pl of sys.p.slice(0, 3)) {
      const bits = [];
      if (pl.r != null) bits.push(pl.r + ' R⊕');
      if (pl.pr != null) bits.push(pl.pr + ' d');
      rows.push(['· ' + (pl.n.replace(sys.h, '').trim() || pl.n), bits.join(' · ') || 'confirmed']);
    }
    action = { label: '🪐  View the planetary system', fn: () => exoInfo(exoIdx) };
  }
  showInfo(name, desig || (conAbbr ? `Star in ${conFull[conAbbr] || conAbbr}` : 'Star'), rows,
    null, null, action);
}

function bodyInfo(name, jd) {
  const info = PLANET_INFO[name];
  const rows = [];
  if (name === 'Moon') {
    const m = moonGeo(jd);
    rows.push(['Distance', `${Math.round(m.distKm).toLocaleString()} km`]);
    rows.push(['Illuminated', `${Math.round(moonPhase(jd) * 100)}%`]);
  } else if (name !== 'Sun' && name !== 'Earth') {
    const rd = skyBodies[name] ? skyBodies[name].raDec : geoRaDec(name, jd);
    rows.push(['Distance from Earth', `${rd.r.toFixed(2)} AU`]);
  } else if (name === 'Sun') {
    const rd = geoRaDec('Sun', jd);
    rows.push(['Distance', `${rd.r.toFixed(3)} AU`]);
  }
  rows.push(['Radius', `${info.radius.toLocaleString()} km`]);
  if (info.period) rows.push(['Orbital period', info.period]);
  if (info.moons !== undefined) rows.push(['Moons', String(info.moons)]);
  if (info.extra) rows.push(...info.extra);
  // offer a vantage-point view from any solar body (looks back toward the Sun)
  const pov = solBodies[name] ? { obj: solBodies[name] } : null;
  showInfo(name, info.type, rows, null, pov);
}

// ---------------------------------------------------------------- picking
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();

function handleClick(cx, cy) {
  ndc.set((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
  if (mode === 'sky') {
    raycaster.setFromCamera(ndc, skyCam);
    // picking math lives in the equatorial frame; undo the horizon rotation
    const rd = raycaster.ray.direction.clone()
      .applyQuaternion(skyGroup.quaternion.clone().invert());
    const thr = Math.cos(Math.max(0.45, skyCam.fov * 0.018) * DEG);
    // planets first
    let best = null;
    for (const name of SKY_BODIES) {
      const dot = skyBodies[name].dir.dot(rd);
      if (dot > Math.cos(Math.max(1.0, skyCam.fov * 0.02) * DEG) && (!best || dot > best.dot)) best = { name, dot };
    }
    if (best && skyPlanetGroup.visible) {
      selectSkyDir(skyBodies[best.name].dir);
      bodyInfo(best.name, time.jd);
      return;
    }
    // DSOs
    for (let i = 0; i < dsoDirs.length; i++) {
      if (dsoDirs[i].dot(rd) > Math.cos(1.1 * DEG) && dsoGroup.visible) {
        const [id, name, , , type, distStr] = DSOS[i];
        selectSkyDir(dsoDirs[i]);
        showInfo(name, `${id} · ${type}`, [['Distance', distStr], ['Type', type]]);
        return;
      }
    }
    // an erupting historical supernova is the brightest thing in the sky — pick it first
    {
      let bs = null;
      for (const S of SUPERNOVAE_RT) {
        if (S.mag > 6) continue;                          // only while actually shining
        const dot = S.dir.dot(rd);
        if (dot > Math.cos(1.2 * DEG) && (!bs || dot > bs.dot)) bs = { S, dot };
      }
      if (bs) { selectSkyDir(bs.S.dir); showSupernovaInfo(bs.S); return; }
    }
    // phenomena (pulsars, black holes, quasars, …) — pick the closest within threshold
    if (phenomGroup.visible) {
      let bp = null;
      for (const { dir, idx } of phenomDirs) {
        if (!phenomGroup.children.length) break;
        const dot = dir.dot(rd);
        if (dot > Math.cos(1.0 * DEG) && (!bp || dot > bp.dot)) {
          // skip categories the user has hidden
          if (phenomByCat[PHENOMENA[idx].cat][0].visible) bp = { dir, idx, dot };
        }
      }
      if (bp) { selectSkyDir(bp.dir); phenomInfo(bp.idx); return; }
    }
    // exoplanet systems — nearest host star within a generous threshold (scales with zoom so
    // they stay easy to click when zoomed in on the Kepler field)
    if (exoGroup.visible) {
      const exoThr = Math.cos(Math.max(1.3, skyCam.fov * 0.05) * DEG);
      let be = null;
      for (let i = 0; i < exoDirs.length; i++) {
        const dot = exoDirs[i].dot(rd);
        if (dot > exoThr && (!be || dot > be.dot)) be = { i, dot };
      }
      if (be) { selectSkyDir(exoDirs[be.i]); exoInfo(be.i); return; }
    }
    // stars (brightest within threshold wins) — all 119k rendered stars are pickable,
    // not just the named subset; faint ones get a generic data card from the full arrays
    let bi = -1, bm = 99;
    const lim = starUniforms.uMagLimit.value;
    for (let i = 0; i < N; i++) {
      if (STARS.mag[i] > lim) continue;
      const dot = dirs[i * 3] * rd.x + dirs[i * 3 + 1] * rd.y + dirs[i * 3 + 2] * rd.z;
      if (dot > thr && STARS.mag[i] < bm) { bm = STARS.mag[i]; bi = i; }
    }
    if (bi >= 0) {
      selectSkyDir(new THREE.Vector3(dirs[bi * 3], dirs[bi * 3 + 1], dirs[bi * 3 + 2]));
      starInfo(bi);
    }
  } else if (mode === 'galaxy') {
    // every real galaxy in the scene is clickable
    let best = null;
    const v = new THREE.Vector3();
    for (const G of GALCAT_RT) {
      v.copy(G.pos).project(galCam);
      if (v.z > 1) continue;
      const px = Math.hypot((v.x - ndc.x) * innerWidth / 2, (v.y - ndc.y) * innerHeight / 2);
      if (px < 20 && (!best || px < best.px)) best = { px, G };
    }
    if (best) showInfo(best.G.name, best.G.sub, best.G.rows, best.G.doc);
  } else if (mode === 'solar') {
    let best = null;
    const v = new THREE.Vector3();
    for (const name of ['Sun', ...SOL_PLANETS, 'Moon']) {
      v.copy(name === 'Sun' ? new THREE.Vector3() : solBodies[name].pos).project(solCam);
      if (v.z > 1) continue;
      const px = Math.hypot((v.x - ndc.x) * innerWidth / 2, (v.y - ndc.y) * innerHeight / 2);
      const hit = name === 'Moon' ? 18 : 26;
      if (px < hit && (!best || px < best.px)) best = { name, px };
    }
    // planetary moons (only when their layer is shown)
    if (moonsVisible) {
      for (const mo of MOONS_RT) {
        if (!mo.mesh.visible) continue;
        v.copy(mo.world).project(solCam);
        if (v.z > 1) continue;
        const px = Math.hypot((v.x - ndc.x) * innerWidth / 2, (v.y - ndc.y) * innerHeight / 2);
        if (px < 14 && (!best || px < best.px)) best = { name: mo.name, px, moon: mo };
      }
    }
    // satellites & lunar landing sites — clickable when zoomed in (so they don't hijack
    // a click on Earth/Moon from far away), with a generous hit area
    if (satsVisible && orbits.solar.r < 60) {
      for (const s of SATS_RT) {
        v.copy(s.world).project(solCam);
        if (v.z > 1) continue;
        const px = Math.hypot((v.x - ndc.x) * innerWidth / 2, (v.y - ndc.y) * innerHeight / 2);
        if (px < 24 && (!best || px < best.px)) best = { px, sat: s };
      }
      for (const s of LUNAR_RT) {
        v.copy(s.world).project(solCam);
        if (v.z > 1) continue;
        const px = Math.hypot((v.x - ndc.x) * innerWidth / 2, (v.y - ndc.y) * innerHeight / 2);
        if (px < 16 && (!best || px < best.px)) best = { px, site: s };
      }
    }
    // megastructures — project group origin to screen, check proximity
    if (megaGroup.visible) {
      const wp = new THREE.Vector3();
      for (const mo of MEGA_OBJECTS) {
        if (!mo.group.visible) continue;
        mo.group.getWorldPosition(wp);
        const sv = wp.clone().project(solCam);
        if (sv.z > 1) continue;
        const px = Math.hypot((sv.x - ndc.x) * innerWidth / 2, (sv.y - ndc.y) * innerHeight / 2);
        // scale pick radius by projected size of the object
        const screenR = Math.max(22, mo.pickR / orbits.solar.r * 600);
        if (px < screenR && (!best || px < best.px)) best = { px, mega: mo };
      }
    }
    // named asteroids — clickable whenever their layer is on, generous hit area
    if (asteroidsVisible) {
      for (const A of ASTEROIDS_RT) {
        v.copy(A.world).project(solCam);
        if (v.z > 1) continue;
        const px = Math.hypot((v.x - ndc.x) * innerWidth / 2, (v.y - ndc.y) * innerHeight / 2);
        if (px < 14 && (!best || px < best.px)) best = { px, asteroid: A };
      }
    }
    if (cometsVisible) {
      for (const C of COMETS_RT) {
        v.copy(C.world).project(solCam);
        if (v.z > 1) continue;
        const px = Math.hypot((v.x - ndc.x) * innerWidth / 2, (v.y - ndc.y) * innerHeight / 2);
        if (px < 16 && (!best || px < best.px)) best = { px, comet: C };
      }
    }
    if (tnosVisible) {
      for (const T of TNOS_RT) {
        v.copy(T.world).project(solCam);
        if (v.z > 1) continue;
        const px = Math.hypot((v.x - ndc.x) * innerWidth / 2, (v.y - ndc.y) * innerHeight / 2);
        if (px < 16 && (!best || px < best.px)) best = { px, tno: T };
      }
    }
    if (probesVisible) {
      for (const P of PROBES_RT) {
        if (!P.mark.visible) continue;
        v.copy(P.world).project(solCam);
        if (v.z > 1) continue;
        const px = Math.hypot((v.x - ndc.x) * innerWidth / 2, (v.y - ndc.y) * innerHeight / 2);
        if (px < 16 && (!best || px < best.px)) best = { px, probe: P };
      }
    }
    if (best && best.probe) {
      showProbeInfo(best.probe);
    } else if (best && best.comet) {
      showCometInfo(best.comet);
    } else if (best && best.tno) {
      const T = best.tno;
      showInfo(T.name, T.sub, T.rows, T.doc, { obj: T });
    } else if (best && best.asteroid) {
      const A = best.asteroid;
      showInfo(A.name, A.sub, A.rows, A.doc, { obj: A });
    } else if (best && best.mega) {
      const info = best.mega.group.userData.info;
      showInfo(info.name, info.sub, info.rows, info.doc);
    } else if (best && best.sat) {
      showSatInfo(best.sat);
    } else if (best && best.site) {
      showInfo(best.site.name, 'Lunar surface — landing site', [], best.site.doc, { obj: best.site, surfaceBody: 'Moon' });
    } else if (best && best.moon) {
      const mo = best.moon;
      showInfo(mo.name, `Moon of ${mo.parent}`, [
        ['Orbital period', `${mo.period < 1 ? (mo.period * 24).toFixed(1) + ' hours' : mo.period.toFixed(2) + ' days'}`],
        ['Parent planet', mo.parent], ['Orbit', mo.retro < 0 ? 'Retrograde' : 'Prograde'],
      ], null, { obj: mo });
      orbits.solar.follow = mo.parent;
    } else if (best) {
      bodyInfo(best.name, time.jd);
      orbits.solar.follow = best.name === 'Sun' ? null : best.name;
      if (best.name === 'Sun') orbits.solar.target.set(0, 0, 0);
    } else {
      // clicking inside Earth's satellite swarm must not fall through to a background
      // star — the swarm dots look clickable, so snap to the nearest named satellite
      if (satsVisible && orbits.solar.r < 60 && solBodies.Earth) {
        const ep = new THREE.Vector3().copy(solBodies.Earth.pos).project(solCam);
        if (ep.z <= 1) {
          const epx = Math.hypot((ep.x - ndc.x) * innerWidth / 2, (ep.y - ndc.y) * innerHeight / 2);
          let shellPx = 0, nearSat = null, nsPx = 70;
          const sv = new THREE.Vector3();
          for (const s of SATS_RT) {
            if (s.shell === 'deep') continue;              // JWST orbits far outside the swarm
            sv.copy(s.world).project(solCam);
            if (sv.z > 1) continue;
            shellPx = Math.max(shellPx, Math.hypot((sv.x - ep.x) * innerWidth / 2, (sv.y - ep.y) * innerHeight / 2));
            const cpx = Math.hypot((sv.x - ndc.x) * innerWidth / 2, (sv.y - ndc.y) * innerHeight / 2);
            if (cpx < nsPx) { nsPx = cpx; nearSat = s; }
          }
          if (epx < shellPx * 1.15) {
            if (nearSat) showSatInfo(nearSat);
            return;                                        // inside the cloud: never a star card
          }
        }
      }
      // empty space → pick the brightest catalog star along the ray against the
      // backdrop starfield (replaces the old ground "Sky" view's star picking)
      const bi = pickBackdropStar(solCam);
      if (bi >= 0) starInfo(bi);
    }
  } else if (mode === 'neighborhood') {
    // nearest projected star within 14 px
    const idxs = neiScene.userData.starIdxs;
    const v = new THREE.Vector3();
    let bi = -1, bp = 14;
    for (let k = 0; k < idxs.length; k++) {
      const i = idxs[k];
      if (STARS.mag[i] > 7 && !STARS.names[i]) continue;
      const dd = STARS.dist[i];
      v.set(dirs[i * 3] * dd, dirs[i * 3 + 1] * dd, dirs[i * 3 + 2] * dd).project(neiCam);
      if (v.z > 1) continue;
      const px = Math.hypot((v.x - ndc.x) * innerWidth / 2, (v.y - ndc.y) * innerHeight / 2);
      if (px < bp) { bp = px; bi = i; }
    }
    if (bi >= 0) {
      starInfo(bi);
      const dd = STARS.dist[bi];
      neiSelMark.position.set(dirs[bi * 3] * dd, dirs[bi * 3 + 1] * dd, dirs[bi * 3 + 2] * dd);
      neiSelMark.visible = true;     // just ring the star — don't recentre/jump the camera
    }
  }
}

function selectSkyDir(dir) {
  selMark.position.copy(dir).multiplyScalar(R_SKY * 0.96);
  selMark.visible = true;
}

// Pick the brightest catalog star along the click ray against the backdrop
// starfield (the same direction-based math the old Sky view used, but driven by
// the active space camera). Star directions in `dirs` are celestial-sphere unit
// vectors, scale-invariant for distant stars — correct from the solar view outward.
function pickBackdropStar(cam) {
  raycaster.setFromCamera(ndc, cam);
  const rd = raycaster.ray.direction;
  const thr = Math.cos(Math.max(0.4, cam.fov * 0.02) * DEG);
  const lim = starUniforms.uMagLimit.value;
  let bi = -1, bm = 99;
  for (let i = 0; i < N; i++) {
    if (STARS.mag[i] > lim) continue;
    const dot = dirs[i * 3] * rd.x + dirs[i * 3 + 1] * rd.y + dirs[i * 3 + 2] * rd.z;
    if (dot > thr && STARS.mag[i] < bm) { bm = STARS.mag[i]; bi = i; }
  }
  return bi;
}

// Aim the free-flight camera at a celestial direction from within the solar view
// (replaces setMode('sky')+flyToSky). Distant stars / DSOs / phenomena sit on the
// backdrop starfield, so re-orienting the camera frames them in the one window.
function frameSkyDir(d) {
  // Search targets (stars, constellations, DSOs, phenomena, exoplanets) all live in the SKY
  // view, so land there and slew to the object — otherwise the sky-only markers/lines aren't
  // rendered (the old version dropped into solar mode where you couldn't see what you searched).
  if (mode !== 'sky') setMode('sky', true);
  const ra = (Math.atan2(-d.z, d.x) / DEG + 360) % 360;   // invert dirVec → RA / Dec
  const dec = Math.asin(Math.max(-1, Math.min(1, d.y))) / DEG;
  flyTo(ra, dec);
  selectSkyDir(d);
}

// Teleport the free-flight camera to frame a world-space point (a body, moon,
// satellite, megastructure…) from a few frame-radii away, looking at it. The
// single travel primitive for "jump to a place" now that there are no modes.
const _jp = new THREE.Vector3();
function jumpToPoint(pos, frameR, follow = null, scale = 'solar') {
  if (mode !== scale) setMode(scale, true);
  if (!flyMode) setFlyMode(true);
  thirdPerson = true;                       // arrive in your ship beside the object
  fly.attach = null; fly.goto = null; flyArmed = false;
  const off = new THREE.Vector3(frameR * 3.0, frameR * 1.1, frameR * 3.0);
  fly.pos.copy(pos).add(off);
  _jp.copy(pos).sub(fly.pos).normalize();
  fly.yaw = Math.atan2(_jp.x, _jp.z);
  fly.pitch = Math.asin(Math.max(-1, Math.min(1, _jp.y)));
  if (scale === 'solar') orbits.solar.follow = follow;
}

// ---------------------------------------------------------------- search
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');
const searchIndex = [];
{
  // Named stars (proper names like Sirius, Betelgeuse, etc.)
  for (const [idxStr, name] of Object.entries(STARS.names)) {
    searchIndex.push({ label: name, type: 'star', i: +idxStr });
  }
  // Star designations: Bayer (α Ori), Flamsteed (58 Ori), HIP IDs for all with parallax
  // Only add desig when it differs from the proper name to avoid duplicates
  for (const [idxStr, desig] of Object.entries(STARS.desig || {})) {
    const i = +idxStr;
    if (desig && desig !== STARS.names[i]) searchIndex.push({ label: desig, type: 'star', i });
  }
  for (const c of CONS) searchIndex.push({ label: c.name, type: 'constellation', c });
  // Solar system bodies
  for (const name of SKY_BODIES) searchIndex.push({ label: name, type: 'body', name });
  for (const name of SOL_PLANETS) {
    if (!SKY_BODIES.includes(name)) searchIndex.push({ label: name, type: 'body', name });  // includes Earth
  }
  searchIndex.push({ label: 'Sagittarius A*', type: 'black hole', bhMode: true });
  DSOS.forEach((dso, i) => {
    searchIndex.push({ label: dso[1], type: dso[4], dsoIdx: i });
    searchIndex.push({ label: dso[0], type: dso[4], dsoIdx: i });
  });
  for (const s of SATS_RT) searchIndex.push({ label: s.name, type: 'sat', sat: s });
  // craft indexed under short labels should also match their everyday names
  for (const [alias, of] of [['James Webb Space Telescope', 'JWST'],
                             ['International Space Station', 'ISS']]) {
    const t = SATS_RT.find(s => s.name === of);
    if (t) searchIndex.push({ label: alias, type: 'sat', sat: t });
  }
  for (const s of LUNAR_RT) searchIndex.push({ label: s.name, type: 'lunarsite', site: s });
  for (const mo of MOONS_RT) searchIndex.push({ label: mo.name, type: 'moon', moon: mo });
  PHENOMENA.forEach((ph, i) => {
    if (/Sagittarius A\*/.test(ph.name)) return;   // the curated black-hole entry owns this search
    searchIndex.push({ label: ph.name, type: 'phenom', phIdx: i });
    if (ph.id !== ph.name) searchIndex.push({ label: ph.id, type: 'phenom', phIdx: i });
  });
  // every confirmed exoplanet system (host name) — search "Kepler-11", "TRAPPIST-1", …
  EXO.forEach((s, i) => searchIndex.push({ label: s.h, type: 'exo', exoIdx: i }));
  // Megastructures
  for (const mo of MEGA_OBJECTS) {
    const info = mo.group.userData.info;
    if (info) searchIndex.push({ label: info.name, type: 'megastructure', mega: mo });
  }
  // Named asteroids — real bodies, fly to the actual position and show its card
  for (const A of ASTEROIDS_RT) searchIndex.push({ label: A.name, type: 'asteroid', asteroid: A });
  for (const C of COMETS_RT) {
    searchIndex.push({ label: C.name, type: 'comet', comet: C });
    // common names ("Halley", "Hale-Bopp") should match without the catalog prefix
    const short = C.name.replace(/^\S+\//, '').replace('–', '-');
    if (short !== C.name) searchIndex.push({ label: short, type: 'comet', comet: C });
  }
  for (const T of TNOS_RT) searchIndex.push({ label: T.name, type: 'tno', tno: T });
  for (const P of PROBES_RT) searchIndex.push({ label: P.name, type: 'probe', probe: P });
  for (const G of GALCAT_RT) {
    if (!G.searchable) continue;                     // DSO catalog owns some of these names
    searchIndex.push({ label: G.name, type: 'galaxy', galaxy: G });
    const short = G.name.split(' · ')[1];            // "NGC 6822 · Barnard's Galaxy" → both halves match
    if (short) searchIndex.push({ label: short, type: 'galaxy', galaxy: G });
  }
  for (const S of SUPERNOVAE_RT) {
    searchIndex.push({ label: S.name, type: 'sn', sn: S });
    const short = S.name.split(' · ')[1];
    if (short) searchIndex.push({ label: short, type: 'sn', sn: S });
  }
  searchIndex.push({ label: 'Oort Cloud', type: 'oort' });
}

function gotoTarget(t) {
  infocard.classList.remove('open');
  if (t.bhMode) {
    gotoSgrA();
    return;
  }
  if (t.type === 'star') {
    // frame the star against the backdrop in the one window, then show its card
    const i = t.i;
    frameSkyDir(new THREE.Vector3(dirs[i * 3], dirs[i * 3 + 1], dirs[i * 3 + 2]));
    starInfo(i);
  } else if (t.type === 'constellation') {
    frameSkyDir(dirVec(t.c.label[0], t.c.label[1]));
    showInfo(t.c.name, 'Constellation', []);
  } else if (t.type === 'body') {
    const pos = t.name === 'Sun' ? new THREE.Vector3() : solBodies[t.name].pos.clone();
    const rd = t.name === 'Sun' ? 2.2 : displayRadius(t.name);
    jumpToPoint(pos, rd, t.name === 'Sun' ? null : t.name);
    bodyInfo(t.name, time.jd);
  } else if (t.type === 'sat') {
    jumpToPoint(t.sat.world.clone(), 0.25, 'Earth');
    showSatInfo(t.sat);
  } else if (t.type === 'lunarsite') {
    jumpToPoint(solBodies.Moon.pos.clone(), displayRadius('Moon'), 'Earth');
    showInfo(t.site.name, 'Lunar surface — landing site', [], t.site.doc, { obj: t.site, surfaceBody: 'Moon' });
  } else if (t.type === 'moon') {
    jumpToPoint(t.moon.world.clone(), 0.18, t.moon.parent);
    showInfo(t.moon.name, `Moon of ${t.moon.parent}`, [
      ['Orbital period', t.moon.period < 1 ? (t.moon.period * 24).toFixed(1) + ' hours' : t.moon.period.toFixed(2) + ' days'],
      ['Parent planet', t.moon.parent]], null, { obj: t.moon });
  } else if (t.type === 'phenom') {
    const ph = PHENOMENA[t.phIdx];
    frameSkyDir(dirVec(ph.ra, ph.dec));
    phenomInfo(t.phIdx);
  } else if (t.type === 'exo') {
    if (!exoGroup.visible) { exoGroup.visible = true; const ck = document.getElementById('ck-exo'); if (ck) ck.checked = true; }
    frameSkyDir(exoDirs[t.exoIdx]);
    exoInfo(t.exoIdx);
  } else if (t.type === 'megastructure') {
    megaGroup.visible = true;
    document.getElementById('ck-mega').checked = true;
    t.mega.group.visible = true;
    const wp = new THREE.Vector3();
    t.mega.group.getWorldPosition(wp);
    jumpToPoint(wp, t.mega.pickR);
    const info = t.mega.group.userData.info;
    showInfo(info.name, info.sub, info.rows, info.doc);
  } else if (t.type === 'asteroid') {
    const A = t.asteroid;
    updateNamedAsteroids(time.jd);                 // make sure A.world is current before we fly to it
    jumpToPoint(A.world.clone(), 4);               // fly right up to the actual body
    showInfo(A.name, A.sub, A.rows, A.doc, { obj: A });
  } else if (t.type === 'comet') {
    const C = t.comet;
    updateComets(time.jd);
    jumpToPoint(C.world.clone(), 4);
    showCometInfo(C);
  } else if (t.type === 'tno') {
    const T = t.tno;
    updateTNOs(time.jd);
    jumpToPoint(T.world.clone(), 5);
    showInfo(T.name, T.sub, T.rows, T.doc, { obj: T });
  } else if (t.type === 'probe') {
    const P = t.probe;
    updateProbes(time.jd);
    jumpToPoint(P.world.clone(), 3);
    showProbeInfo(P);
  } else if (t.type === 'galaxy') {
    const G = t.galaxy;
    setFlyMode(false);
    setMode('galaxy');
    orbits.galaxy.target.copy(G.pos);
    orbits.galaxy.r = Math.min(1500, Math.max(25, G.d * 0.45));
    showInfo(G.name, G.sub, G.rows, G.doc);
  } else if (t.type === 'sn') {
    frameSkyDir(t.sn.dir);
    showSupernovaInfo(t.sn);
  } else if (t.type === 'oort') {
    setFlyMode(false);
    setMode('neighborhood');
    orbits.neighborhood.target.set(0, 0, 0);
    orbits.neighborhood.r = 2.2;
    showInfo('Oort Cloud', 'The Sun\'s comet reservoir · 0.01–0.5 parsecs',
      [['True extent', '2,000 – 100,000 AU'], ['Contents', 'trillions of icy bodies'],
       ['Sends us', 'the long-period comets'], ['Directly observed', 'never — inferred from comets']],
      'The Sun\'s deep-freeze: a spherical cloud of icy debris left over from planet formation, reaching a quarter of the way to Alpha Centauri. Every long-period comet — Hale-Bopp, NEOWISE — is an Oort cloud body nudged sunward by a passing star or the galaxy\'s tide. No telescope has ever seen it directly; we know it only by the comets it sends.');
  } else {
    const dso = DSOS[t.dsoIdx];
    frameSkyDir(dsoDirs[t.dsoIdx]);
    showInfo(dso[1], `${dso[0]} · ${dso[4]}`, [['Distance', dso[5]], ['Type', dso[4]]]);
  }
}

let flyAnim = null;
function flyTo(ra, dec) {
  const dLon = ((ra - skyView.lon) % 360 + 540) % 360 - 180;
  flyAnim = { t: 0, lon0: skyView.lon, lat0: skyView.lat, dLon, dLat: dec - skyView.lat };
}
function jumpTo(ra, dec) {
  flyAnim = null;
  skyView.lon = ra; skyView.lat = dec;
  skyView.vLon = skyView.vLat = 0;
  applySkyCam();
}

// fly toward an RA/Dec target; in horizon mode convert to the world (alt-az) frame

const TYPE_LABEL = { sat: 'satellite', lunarsite: 'landing site', moon: 'moon', phenom: 'phenomenon',
  body: 'planet', star: 'star', constellation: 'constellation', 'black hole': 'black hole',
  megastructure: 'megastructure', asteroid: 'asteroid', comet: 'comet', tno: 'dwarf planet',
  probe: 'spacecraft', galaxy: 'galaxy', sn: 'supernova', oort: 'comet reservoir',
  exo: 'exoplanet system' };
// the Sun and Moon share the generic 'body' search type with the planets — name them properly
const BODY_TYPE_OVERRIDE = { Sun: 'star', Moon: 'moon', Earth: 'planet' };
function renderSearch(items) {
  searchResults.innerHTML = items
    .map((t, i) => `<div class="sr-item${i === 0 ? ' sel' : ''}" data-i="${i}">` +
      `<span>${t.label}</span><span class="sr-type">${(t.type === 'body' && BODY_TYPE_OVERRIDE[t.label]) || TYPE_LABEL[t.type] || t.type}</span></div>`)
    .join('');
  searchResults.classList.toggle('open', items.length > 0);
  [...searchResults.children].forEach((el, i) => {
    el.onclick = () => { gotoTarget(items[i]); searchResults.classList.remove('open'); searchInput.blur(); };
  });
}
// fast HIP/HD → star-index lookup so EVERY star is findable by its catalog number, without
// adding ~200k entries to the linear search index (which would lag every keystroke).
const hipToIdx = new Map(), hdToIdx = new Map();
{
  const hp = STARS.hip || [], hd = STARS.hd || [];
  for (let i = 0; i < hp.length; i++) { const h = hp[i]; if (h && !hipToIdx.has(h)) hipToIdx.set(h, i); }   // brightest first (sorted)
  for (let i = 0; i < hd.length; i++) { const h = hd[i]; if (h && !hdToIdx.has(h)) hdToIdx.set(h, i); }
}
let searchItems = [];
let searchSel = 0;
searchInput.addEventListener('input', () => {
  searchSel = 0;
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.classList.remove('open'); return; }
  // catalog-number lookup: "HD 209458", "HIP 11767", or a bare number (tries HIP then HD)
  const cat = [];
  const m = q.match(/^(hd|hip)\s*0*(\d+)$/) || (/^\d+$/.test(q) ? [null, null, q] : null);
  if (m) {
    const n = +m[2];
    if (m[1] !== 'hd' && hipToIdx.has(n)) cat.push({ label: 'HIP ' + n, type: 'star', i: hipToIdx.get(n) });
    if (m[1] !== 'hip' && hdToIdx.has(n)) cat.push({ label: 'HD ' + n, type: 'star', i: hdToIdx.get(n) });
  }
  // exact label matches outrank prefix matches regardless of index order, so
  // "mars" finds the planet Mars ahead of the star Marsic (stars fill the index first)
  const exact = [], starts = [], contains = [];
  for (const t of searchIndex) {
    const l = t.label.toLowerCase();
    if (l === q) exact.push(t);
    else if (l.startsWith(q)) { if (starts.length < 8) starts.push(t); }
    else if (contains.length < 8 && l.includes(q)) contains.push(t);
  }
  searchItems = [...cat, ...exact, ...starts, ...contains].slice(0, 8);
  if (!searchItems.length) {
    searchResults.innerHTML =
      '<div class="sr-empty">No matches — try a star, planet, constellation, or an HD/HIP number</div>';
    searchResults.classList.add('open');
  } else renderSearch(searchItems);
});
searchInput.addEventListener('keydown', (e) => {
  if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && searchItems.length) {
    e.preventDefault();
    searchSel = e.key === 'ArrowDown'
      ? Math.min(searchSel + 1, searchItems.length - 1)
      : Math.max(searchSel - 1, 0);
    [...searchResults.children].forEach((el, i) => el.classList.toggle('sel', i === searchSel));
    searchResults.children[searchSel]?.scrollIntoView({ block: 'nearest' });
    return;
  }
  if (e.key === 'Enter' && searchItems.length) {
    gotoTarget(searchItems[searchSel] || searchItems[0]);
    searchResults.classList.remove('open');
    searchInput.blur();
  }
  if (e.key === 'Escape') { searchResults.classList.remove('open'); searchInput.blur(); }
});
// clicking anywhere outside the search box dismisses the results dropdown
// (and the minimap's More menu behaves the same way)
addEventListener('pointerdown', (e) => {
  if (!e.target.closest('#searchbox')) searchResults.classList.remove('open');
  if (!e.target.closest('#loc-ladder') && !e.target.closest('#loc-more-menu')) {
    document.getElementById('loc-more-menu')?.classList.remove('open');
  }
});
// refocusing the input with a stale query brings its results back
searchInput.addEventListener('focus', () => {
  if (searchInput.value.trim() && searchItems.length) searchResults.classList.add('open');
});

// ---------------------------------------------------------------- scale readout
const scalebar = document.getElementById('scalebar');
function fmtLightTime(years) {
  if (years >= 1e6) return (years / 1e6).toFixed(1) + ' million years';
  if (years >= 1) return years >= 100 ? Math.round(years).toLocaleString() + ' years' : years.toFixed(1) + ' years';
  const days = years * 365.25;
  if (days >= 1) return days.toFixed(1) + ' days';
  const hours = days * 24;
  if (hours >= 1) return hours.toFixed(1) + ' hours';
  return (hours * 60).toFixed(1) + ' minutes';
}
let _lastScale = '';
function setScale(h) { if (h !== _lastScale) { _lastScale = h; scalebar.innerHTML = h; } }   // skip DOM write when unchanged
function updateScalebar() {
  if (mode === 'deep') {
    const ly = deep.pos.length() * PC_LY;
    let d;                                              // ly → kly → Mly → Gly as you fly farther out
    if (ly < 1000) d = Math.round(ly).toLocaleString() + ' ly';
    else if (ly < 1e6) d = (ly / 1e3).toFixed(1) + ' kly';
    else if (ly < 1e9) d = (ly / 1e6).toFixed(1) + ' Mly';
    else d = (ly / 1e9).toFixed(2) + ' Gly';
    setScale(`<b>${d}</b> from the Sun · deep space`);
    return;
  }
  if (mode === 'sky') {
    setScale(`field of view <b>${skyCam.fov.toFixed(1)}°</b>` +
      (horizon.on ? ' · alt-azimuth frame' : ' · equatorial frame'));
  } else if (mode === 'solar') {
    const au = 2 * orbits.solar.r / AUU;
    setScale(`view ≈ <b>${au < 10 ? au.toFixed(1) : Math.round(au)} AU</b> across · ` +
      `light crosses it in <b>${fmtLightTime(au * 499 / 31557600)}</b>`);
  } else if (mode === 'neighborhood') {
    const ly = 2 * orbits.neighborhood.r * PC_LY;
    setScale(`view ≈ <b>${ly < 100 ? ly.toFixed(1) : Math.round(ly).toLocaleString()} ly</b> across · ` +
      `light crosses it in <b>${fmtLightTime(ly)}</b> · space is mostly empty`);
  } else if (mode === 'galaxy') {
    const ly = 2 * orbits.galaxy.r * 1000 * PC_LY;
    setScale(`view ≈ <b>${ly >= 1e6 ? (ly / 1e6).toFixed(1) + ' Mly' : Math.round(ly / 1000).toLocaleString() + ' kly'}</b> across · ` +
      `light crosses it in <b>${fmtLightTime(ly)}</b>`);
  } else if (mode === 'cosmic') {
    const glyPerUnit = 46.5 / COS_CMB_R;                  // shell ≈ observable-universe radius
    const gly = 2 * orbits.cosmic.r * glyPerUnit;
    const atShell = orbits.cosmic.r > 78;
    // look-back time: quote a number only in the near regime where light-travel time ≈
    // distance (within a few %); farther out cosmic expansion breaks that equality
    const lookback = gly / 2 < 2
      ? ` · seeing <b>${gly / 2 < 1 ? Math.round(gly * 500) + ' million' : (gly / 2).toFixed(1) + ' billion'} years</b> into the past`
      : '';
    setScale(`view ≈ <b>${gly < 10 ? gly.toFixed(1) : Math.round(gly)} billion ly</b> across · ` +
      (atShell ? 'at the <b>edge of the observable universe</b>' : 'cosmic web of galaxy clusters &amp; voids') + lookback);
  }
}

// ---------------------------------------------------------------- UI wiring
let urlScaleSync = false;   // armed once first-load deep links have been read
function setMode(m, fromHandoff = false) {
  const changed = m !== mode;
  if (changed && rideAlong) exitRideAlong();
  if (changed && m !== 'sky' && spectrumMode !== 0) setSpectrum(0);  // reset EM view on leaving sky
  mode = m;
  infocard.classList.remove('open');
  selMark.visible = false;
  neiSelMark.visible = false;
  rescaleLabels(m);
  onResize();
  if (!FLY_MODES.has(m)) flyMode = false;                // sky / black hole are orbit-only
  else if (flyMode && !fromHandoff) syncFlyFromOrbit(m); // tab switch while flying: re-seat in new scale
  flyShowToggle();
  if (changed && !fromHandoff) crossDissolve();
  // the URL follows the scale you're in, so any view can be shared (?scale=…)
  if (urlScaleSync) {
    try { history.replaceState(null, '', m === 'solar' ? location.pathname : '?scale=' + m); } catch (e) {}
  }
}
// fly to Sgr A* — the black hole is now a real object at the galaxy centre, not a separate screen
function gotoSgrA() {
  // frame the galactic centre in the galaxy scene — close enough that the centre
  // glows have faded and the black hole reads clearly
  setFlyMode(false);
  setMode('galaxy');
  orbits.galaxy.follow = null;
  orbits.galaxy.target.set(0, 0, 0);
  orbits.galaxy.r = 3.0;
  orbits.galaxy.phi = 1.15;
  showInfo('Sagittarius A*', 'Supermassive black hole · Milky Way centre', [
    ['Mass', '4.3 million M☉'],
    ['Schwarzschild radius', '~12.4 million km'],
    ['Event Horizon Telescope', 'imaged 2022'],
    ['Distance from Earth', '26,700 ly'],
  ], 'The 4-million-solar-mass black hole anchoring our galaxy. Its accretion disk glows brighter on the side rotating toward us (relativistic beaming).',
  null,
  { label: '🚀  Fly the deep approach', fn: () => flyToDeep(GC_PC.x - 300, GC_PC.y, GC_PC.z, GC_PC.clone()) });
}
// freeze the outgoing view and CSS-dissolve it into the new scene (robust, frame-independent)
function crossDissolve() {
  try {
    fadeEl.style.backgroundImage = `url(${renderer.domElement.toDataURL('image/jpeg', 0.6)})`;
    fadeEl.style.backgroundSize = 'cover';
  } catch (e) { fadeEl.style.backgroundImage = 'none'; }
  fadeEl.style.transition = 'none';
  fadeEl.style.opacity = '1';
  void fadeEl.offsetWidth;                 // force reflow so the snap-to-1 takes effect
  fadeEl.style.transition = 'opacity 0.32s ease-out';
  fadeEl.style.opacity = '0';
}

// Fly the free-flight camera to a default vantage within a scale shell (used by
// the Travel menu for the non-body destinations). Reuses syncFlyFromOrbit to seat
// the camera, then the normal handoffs take over as you keep flying.
// Travel destinations now drop you into the deep continuum at the right spot.
function flyToDeep(x, y, z, lookOut) {
  if (mode !== 'deep') { crossDissolve(); setMode('deep', true); }
  deep.pos.set(x, y, z);
  flyArmed = false; thirdPerson = true; flyThrottle = false; flyCruise = false;
  const d = lookOut
    ? lookOut.clone().sub(deep.pos).normalize()          // face the destination itself
    : new THREE.Vector3(x, y, z).clone().normalize();
  deep.yaw = Math.atan2(d.x, d.z); deep.pitch = Math.asin(Math.max(-1, Math.min(1, d.y)));
  for (let i = 0; i < 8; i++) streamChunks();            // arrive with the field built, not popping in
  flyShowToggle();
}
// Ambient name for "where am I" — derived from the current scale shell + zoom. Used by the
// minimap locator (locName). Navigation is via the minimap scale ladder, flying, and search.
function currentScaleName() {
  if (mode === 'deep') { const d = deep.pos.length(); return d < 80 ? 'Solar Neighbourhood' : d < 4000 ? 'Interstellar Space' : 'Milky Way'; }
  if (mode === 'solar') {
    // name by wherever is "bigger": the view radius, or the camera's actual
    // heliocentric distance — so following Voyager 1 at 167 AU reads Outer System
    // even though the orbit radius around it is small
    const effAU = Math.max(orbits.solar.r / AUU, camFor('solar').position.length() / AUU);
    return effAU < 1.5 ? 'Inner System' : effAU < 30 ? 'Solar System' : 'Outer System';
  }
  if (mode === 'neighborhood') return 'Interstellar Space';
  if (mode === 'galaxy') return 'Milky Way';
  if (mode === 'cosmic') return 'Cosmic Web';
  if (mode === 'sky') return 'Night Sky';
  return 'Space';
}

// ---------------------------------------------------------------- locator minimap
// A top-down "you are here" map that adapts to the current scale shell, so you can
// always tell where in the universe you've flown to.
const locCanvas = document.getElementById('loc-canvas');
const locCtx = locCanvas.getContext('2d');
const locName = document.getElementById('loc-name');
const locDist = document.getElementById('loc-dist');
const locSteps = [...document.querySelectorAll('.loc-step')];
// The minimap scale ladder doubles as the mode switcher (replaces the removed Explore
// dropdown). Clicking a step jumps to that discrete scene in orbit/drag view, where the
// scene-specific toggles apply — Sky → constellations/star names, Galaxy → dark-matter halo.
const SCALE_R = { solar: 75, neighborhood: 55, galaxy: 40, cosmic: 70 };
function goToScale(scale) {
  if (flyMode) setFlyMode(false);              // ladder = orbit/drag (or sky) view, not free-flight
  if (scale !== 'sky') {
    const o = orbits[scale];
    o.follow = null; o.target.set(0, 0, 0); o.r = SCALE_R[scale];
  }
  setMode(scale);
}
// Galaxy / Cosmos live in a "More ▾" dropdown so the ladder stays focused on the common
// nearby scales. The "more" step toggles the menu; every other step jumps to its scale.
const locMoreMenu = document.getElementById('loc-more-menu');
for (const st of locSteps) {
  if (st.dataset.scale === 'more') st.onclick = (e) => { e.stopPropagation(); locMoreMenu.classList.toggle('open'); };
  else st.onclick = () => goToScale(st.dataset.scale);
}
for (const it of document.querySelectorAll('.loc-more-item')) {
  it.onclick = (e) => { e.stopPropagation(); goToScale(it.dataset.scale); locMoreMenu.classList.remove('open'); };
}
addEventListener('click', () => locMoreMenu.classList.remove('open'));
// highlight the active ladder step; "More" lights up while you're in the Galaxy/Cosmos scales
function setLadderActive(eff) {
  for (const st of locSteps) {
    const s = st.dataset.scale;
    st.classList.toggle('active', s === eff || (s === 'more' && (eff === 'galaxy' || eff === 'cosmic')));
  }
}
const LOCS = 372;                       // internal canvas resolution (≈2× CSS px for crispness)
const _loff = new THREE.Vector3();
function locSpiral(c, cx, cy, R) {       // schematic two-arm spiral for the galaxy view
  c.strokeStyle = 'rgba(150,170,235,0.20)'; c.lineWidth = 2;
  for (let a = 0; a < 2; a++) {
    c.beginPath();
    for (let t = 0; t <= 1.001; t += 0.02) {
      const ang = t * 3.4 * Math.PI + a * Math.PI;
      const rr = Math.min(R, R * 0.10 * Math.exp(2.3 * t));
      const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr;
      t === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
    }
    c.stroke();
  }
}
function locWeb(c, cx, cy, R) {           // schematic cosmic-web node field (stable)
  let s = 9241; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  c.fillStyle = 'rgba(175,150,235,0.55)';
  for (let i = 0; i < 70; i++) {
    const a = rnd() * 7, rr = Math.sqrt(rnd()) * R;
    c.beginPath(); c.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 1.3, 0, 7); c.fill();
  }
}
function drawLocator() {
  if (locatorEl.style.display === 'none') return;        // minimap hidden → skip the per-frame canvas redraw
  const c = locCtx, S = LOCS, cx = S / 2, cy = S / 2, R = S * 0.44;
  c.clearRect(0, 0, S, S);
  locName.textContent = currentScaleName();

  if (mode === 'deep') {
    // Galaxy map: galactic centre at the middle, the Sun and "you" marked.
    setLadderActive(deep.pos.length() < 4000 ? 'neighborhood' : 'galaxy');
    const gx = deep.pos.x - GC_PC.x, gz = deep.pos.z - GC_PC.z;     // your galactocentric x,z (pc)
    const youR = Math.hypot(gx, gz);
    const extent = Math.max(17000, youR * 1.2);
    const sc = R / extent, M = (wx, wz) => [cx + wx * sc, cy + wz * sc];
    locSpiral(c, cx, cy, Math.min(R, 15000 * sc));
    c.beginPath(); c.arc(cx, cy, 4, 0, 7); c.fillStyle = '#ffd9a0'; c.fill();             // galactic centre
    const [sx, sy] = M(-GC_PC.x, -GC_PC.z); c.beginPath(); c.arc(sx, sy, 2.6, 0, 7); c.fillStyle = '#ffe9a8'; c.fill();  // Sun
    const [yx, yy] = M(gx, gz);
    const f = deepForward();
    c.save(); c.translate(yx, yy); c.rotate(Math.atan2(f.z, f.x));
    c.beginPath(); c.moveTo(8, 0); c.lineTo(-5, 4.5); c.lineTo(-5, -4.5); c.closePath(); c.fillStyle = '#46e0ff'; c.fill(); c.restore();
    c.beginPath(); c.arc(yx, yy, 6.5, 0, 7); c.strokeStyle = 'rgba(70,224,255,0.5)'; c.lineWidth = 1.4; c.stroke();
    c.beginPath(); c.arc(yx, yy, 3, 0, 7); c.fillStyle = '#bdf2ff'; c.fill();
    const ly = deep.pos.length() * PC_LY;
    locDist.textContent = ly < 1000 ? Math.round(ly) + ' ly' : (deep.pos.length() / 1000).toFixed(2) + ' kpc';
    return;
  }
  setLadderActive(mode);

  if (mode === 'sky') {
    // looking up from Earth — a position map is meaningless here, so draw a view-direction
    // compass instead: Earth at the centre, a cone sweeping the current RA / field of view.
    locDist.textContent = 'from Earth';
    c.beginPath(); c.arc(cx, cy, R, 0, 7); c.strokeStyle = 'rgba(127,160,220,0.18)'; c.lineWidth = 1.5; c.stroke();
    c.fillStyle = 'rgba(138,160,192,0.85)'; c.font = '600 13px system-ui';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    for (const [t, a] of [['0h', 0], ['6h', 90], ['12h', 180], ['18h', 270]]) {
      const r = a * Math.PI / 180;
      c.fillText(t, cx + Math.sin(r) * (R - 13), cy - Math.cos(r) * (R - 13));
    }
    const az = -Math.PI / 2 + skyView.lon * Math.PI / 180;
    const half = Math.max(0.06, skyCam.fov * Math.PI / 360);
    c.beginPath(); c.moveTo(cx, cy);
    c.arc(cx, cy, R - 26, az - half, az + half);
    c.closePath(); c.fillStyle = 'rgba(127,180,255,0.16)'; c.fill();
    c.beginPath(); c.moveTo(cx, cy);
    c.lineTo(cx + Math.cos(az) * (R - 26), cy + Math.sin(az) * (R - 26));
    c.strokeStyle = 'rgba(127,180,255,0.55)'; c.lineWidth = 1.4; c.stroke();
    c.beginPath(); c.arc(cx, cy, 5, 0, 7); c.fillStyle = '#7fb4ff'; c.fill();
    return;
  }

  // viewer position: the fly camera when flying, otherwise the orbit camera
  // (fly.pos sits at the origin until the first flight, which put "you" on the Sun)
  const vcam = camFor(mode);
  const vp = flyMode ? fly.pos : vcam.position;
  const px = vp.x, pz = vp.z;
  const d3 = vp.length(), dxz = Math.hypot(px, pz);
  let extent;
  if (mode === 'solar') {
    let mp = 30; for (const n of SOL_PLANETS) { const p = solBodies[n].pos; mp = Math.max(mp, Math.hypot(p.x, p.z)); }
    extent = Math.max(mp * 1.08, dxz * 1.15);
    const au = d3 / AUU; locDist.textContent = (au < 10 ? au.toFixed(2) : Math.round(au)) + ' AU';
  } else if (mode === 'neighborhood') {
    extent = Math.max(dxz * 1.2, 400);
    locDist.textContent = Math.round(d3 * PC_LY).toLocaleString() + ' ly';
  } else if (mode === 'galaxy') {
    extent = Math.max(dxz * 1.2, 16);
    locDist.textContent = d3.toFixed(1) + ' kpc';
  } else {
    extent = Math.max(dxz * 1.2, 40);
    locDist.textContent = (d3 * 46.5 / COS_CMB_R).toFixed(2) + ' Bly';
  }
  const sc = R / extent, M = (wx, wz) => [cx + wx * sc, cy + wz * sc];

  if (mode === 'solar') {
    for (const n of SOL_PLANETS) {
      const p = solBodies[n].pos, rr = Math.hypot(p.x, p.z) * sc;
      c.beginPath(); c.arc(cx, cy, rr, 0, 7); c.strokeStyle = 'rgba(127,160,220,0.15)'; c.lineWidth = 1; c.stroke();
      const [mx, my] = M(p.x, p.z); c.beginPath(); c.arc(mx, my, 2.2, 0, 7); c.fillStyle = '#bcd0ee'; c.fill();
    }
    c.beginPath(); c.arc(cx, cy, 4.2, 0, 7); c.fillStyle = '#ffd34d'; c.fill();
  } else if (mode === 'neighborhood') {
    for (const f of [0.33, 0.66, 1.0]) { c.beginPath(); c.arc(cx, cy, R * f, 0, 7); c.strokeStyle = 'rgba(127,160,220,0.13)'; c.lineWidth = 1; c.stroke(); }
    c.beginPath(); c.arc(cx, cy, 3.6, 0, 7); c.fillStyle = '#ffd34d'; c.fill();
  } else if (mode === 'galaxy') {
    locSpiral(c, cx, cy, Math.min(R, 15 * sc));   // disc ≈ 15 kpc radius, drawn to true scale
    c.beginPath(); c.arc(cx, cy, 4.4, 0, 7); c.fillStyle = '#ffd9a0'; c.fill();              // galactic centre
    const [sx, sy] = M(SUN_GAL.x, SUN_GAL.z); c.beginPath(); c.arc(sx, sy, 2.8, 0, 7); c.fillStyle = '#ffe9a8'; c.fill();  // Sun
  } else {
    locWeb(c, cx, cy, R);
    c.beginPath(); c.arc(cx, cy, 3.2, 0, 7); c.fillStyle = '#9ab0ff'; c.fill();              // Local Group ≈ centre
  }

  // "you are here" — glow dot + heading triangle
  const [yx, yy] = M(px, pz);
  if (flyMode) _loff.copy(flyForward()); else vcam.getWorldDirection(_loff);
  const hl = Math.hypot(_loff.x, _loff.z) || 1;
  c.save(); c.translate(yx, yy); c.rotate(Math.atan2(_loff.z / hl, _loff.x / hl));
  c.beginPath(); c.moveTo(8, 0); c.lineTo(-5, 4.5); c.lineTo(-5, -4.5); c.closePath();
  c.fillStyle = '#46e0ff'; c.fill(); c.restore();
  c.beginPath(); c.arc(yx, yy, 6.5, 0, 7); c.strokeStyle = 'rgba(70,224,255,0.5)'; c.lineWidth = 1.4; c.stroke();
  c.beginPath(); c.arc(yx, yy, 3, 0, 7); c.fillStyle = '#bdf2ff'; c.fill();
}

// restore persisted panel settings before the binds below apply them to the scene
try {
  const savedPanel = JSON.parse(localStorage.getItem('universe-panel') || '{}');
  // one-time migration: the star sliders' defaults moved to full (mag 14 / brightness 3)
  // so every star is visible and clickable out of the box. Stored values that exactly
  // match the OLD defaults were almost certainly inherited, not chosen — upgrade them.
  if (+savedPanel['rg-mag'] === 6.8) delete savedPanel['rg-mag'];
  if (+savedPanel['rg-size'] === 1.7) delete savedPanel['rg-size'];
  for (const [id, v] of Object.entries(savedPanel)) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.type === 'checkbox') el.checked = !!v; else el.value = v;
  }
} catch (e) { /* corrupted storage — fall back to defaults */ }
const bind = (id, fn) => { const el = document.getElementById(id); el.onchange = () => fn(el); fn(el); };
bind('ck-lines', (el) => { conGroup.visible = el.checked; });
bind('ck-labels', (el) => { conLabelGroup.visible = el.checked; });
bind('ck-names', (el) => { starNameGroup.visible = el.checked; });
bind('ck-planets', (el) => { skyPlanetGroup.visible = el.checked; });
bind('ck-dso', (el) => { dsoGroup.visible = el.checked; });
bind('ck-exo', (el) => { exoGroup.visible = el.checked; });
bind('ck-mw', (el) => { milkyWay.visible = el.checked; });
bind('ck-grid', (el) => { gridGroup.visible = el.checked; });
bind('ck-twinkle', (el) => { starUniforms.uTwinkle.value = el.checked ? 1 : 0; });
bind('ck-phenom', (el) => { phenomGroup.visible = el.checked; });
{
  // per-category phenomena filters, generated from the catalogue
  const host = document.getElementById('phenom-cats');
  for (const cat of Object.keys(PHENOM_CATS)) {
    const row = document.createElement('div');
    row.className = 'row';
    const id = 'ck-ph-' + cat;
    row.innerHTML = `<label for="${id}" style="color:${PHENOM_CATS[cat].color}">${PHENOM_CATS[cat].label}</label>` +
      `<input type="checkbox" id="${id}" checked>`;
    host.appendChild(row);
    const cb = row.querySelector('input');
    cb.onchange = () => { for (const sp of phenomByCat[cat]) sp.visible = cb.checked; };
  }
}
// megastructure master toggle + per-item toggles
{
  const megaItems = document.getElementById('mega-items');
  document.getElementById('ck-mega').onchange = function () {
    megaGroup.visible = this.checked;
    megaItems.style.display = this.checked ? '' : 'none';
  };
  const pairs = [
    ['ck-mega-dyson',  dysonGroup],
    ['ck-mega-sail',   solarSailGroup],
    ['ck-mega-oneill', oneillGroup],
    ['ck-mega-elev',   elevatorGroup],
    ['ck-mega-warp',   warpGroup],
    ['ck-mega-gen',    genShipGroup],
  ];
  for (const [id, grp] of pairs) {
    document.getElementById(id).onchange = function () { grp.visible = this.checked; };
    document.getElementById(id).onchange();          // apply restored / persisted state
  }
  document.getElementById('ck-mega').onchange();
}
bind('ck-grav', (el) => { gravGrid.visible = el.checked; });
bind('ck-dm',   (el) => { dmHalo.visible = el.checked; });
bind('ck-orbits', (el) => { orbitGroup.visible = el.checked; });
bind('ck-belts', (el) => { beltGroup.visible = el.checked; });
bind('ck-moons', (el) => {
  moonsVisible = el.checked;
  for (const o of moonObjs) o.visible = el.checked;
});
bind('ck-sats', (el) => {
  satsVisible = el.checked;
  for (const o of satObjs) o.visible = el.checked;
  for (const o of lunarObjs) o.visible = el.checked;
});
bind('ck-asteroids', (el) => {
  asteroidsVisible = el.checked;
  astNamedGroup.visible = el.checked;
});
bind('ck-asteroid-names', (el) => { asteroidNamesOn = el.checked; });
bind('ck-comets', (el) => {
  cometsVisible = el.checked;
  cometGroup.visible = el.checked;
});
bind('ck-tnos', (el) => {
  tnosVisible = el.checked;
  tnoGroup.visible = el.checked;
});
bind('ck-probes', (el) => {
  probesVisible = el.checked;
  probeGroup.visible = el.checked;
});
bind('ck-helio', (el) => { helioVisible = el.checked; });
// hideable UI panels: minimap (#locator) + spaceship controls (#fly-hud)
const locatorEl = document.getElementById('locator');
const timebarEl = document.getElementById('timebar');
bind('ck-minimap', (el) => { locatorEl.style.display = el.checked ? '' : 'none'; });
bind('ck-flyhud', (el) => { flyHudHidden = !el.checked; flyShowToggle(); });
bind('ck-timebar', (el) => { timebarEl.style.display = el.checked ? '' : 'none'; });
// quick-dismiss ✕ on each panel just unchecks the matching toggle (re-show from Controls ▸ Interface)
const dismissPanel = (ckId) => { const c = document.getElementById(ckId); c.checked = false; c.onchange(); };
document.getElementById('loc-x').onclick = (e) => { e.stopPropagation(); dismissPanel('ck-minimap'); };
document.getElementById('fh-x').onclick = (e) => { e.stopPropagation(); dismissPanel('ck-flyhud'); };
document.getElementById('tb-x').onclick = (e) => { e.stopPropagation(); dismissPanel('ck-timebar'); };
bind('ck-plabels', (el) => { for (const n of Object.keys(solBodies)) solBodies[n].lab.visible = el.checked; });
// homing pointer to Earth — an on-screen arrow + distance so you can fly back to it
const earthPtrEl = document.getElementById('earth-ptr');
const epArrow = document.getElementById('ep-arrow');
const epDist = document.getElementById('ep-dist');
let earthPointerOn = false;
const _epLocal = new THREE.Vector3(), _epNdc = new THREE.Vector3();
bind('ck-earthptr', (el) => { earthPointerOn = el.checked; if (!el.checked) earthPtrEl.style.display = 'none'; });
function updateEarthPointer() {
  if (!earthPointerOn || mode !== 'solar' || !solBodies.Earth) { earthPtrEl.style.display = 'none'; return; }
  const earth = solBodies.Earth.pos;
  solCam.updateMatrixWorld();
  const distAU = earth.distanceTo(solCam.position) / AUU;
  _epLocal.copy(earth); solCam.worldToLocal(_epLocal);     // camera space: +X right, +Y up, −Z forward
  const inFront = _epLocal.z < 0;
  _epNdc.copy(earth).project(solCam);
  let sx = (_epNdc.x * 0.5 + 0.5) * innerWidth, sy = (-_epNdc.y * 0.5 + 0.5) * innerHeight;
  const m = 60;
  const onScreen = inFront && sx >= m && sx <= innerWidth - m && sy >= m && sy <= innerHeight - m;
  let rot;                                                  // triangle points up at 0°
  if (onScreen) {
    rot = 180; sy -= 26;                                    // sit just above Earth, pointing down at it
  } else {
    let dx = _epLocal.x, dy = -_epLocal.y;                  // screen-space dir (y flipped); valid even when behind
    const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
    const cx = innerWidth / 2, cy = innerHeight / 2, hw = cx - m, hh = cy - m;
    const s = Math.min(hw / Math.max(1e-4, Math.abs(dx)), hh / Math.max(1e-4, Math.abs(dy)));
    sx = cx + dx * s; sy = cy + dy * s;
    rot = Math.atan2(dy, dx) * 180 / Math.PI + 90;
  }
  earthPtrEl.style.display = 'block';
  earthPtrEl.style.left = sx + 'px';
  earthPtrEl.style.top = sy + 'px';
  epArrow.style.transform = `rotate(${rot}deg)`;
  epDist.textContent = 'Earth · ' + (distAU < 0.02
    ? Math.round(distAU * AU_KM).toLocaleString() + ' km'
    : distAU.toFixed(distAU < 10 ? 2 : distAU < 100 ? 1 : 0) + ' AU');
}
bind('rg-mag', (el) => { starUniforms.uMagLimit.value = +el.value; });
bind('rg-size', (el) => { starUniforms.uSizeScale.value = +el.value; });

// ------------------------------------------- controls panel: sections, presets, persistence
const panelEl = document.getElementById('panel');
// collapsible sections (open/closed remembered per visitor)
{
  let sectState = {};
  try { sectState = JSON.parse(localStorage.getItem('universe-panel-sections') || '{}'); } catch (e) {}
  for (const sect of panelEl.querySelectorAll('.sect')) {
    const key = sect.dataset.sect;
    sect.classList.toggle('closed', sectState[key] !== undefined ? !sectState[key] : key !== 'sky');
    sect.querySelector('.sect-head').onclick = () => {
      sect.classList.toggle('closed');
      sectState[key] = !sect.classList.contains('closed');
      localStorage.setItem('universe-panel-sections', JSON.stringify(sectState));
    };
  }
}
// presets set only the content layers; Interface prefs (minimap etc.) are left alone.
// Omitted ids fall back to the "essentials" value so every preset is fully specified.
const PRESET_BASE = {
  'ck-lines': true, 'ck-art': false, 'ck-labels': true, 'ck-names': true, 'ck-planets': true,
  'ck-dso': true, 'ck-exo': false, 'ck-mw': true, 'ck-grid': false,
  'ck-twinkle': !matchMedia('(prefers-reduced-motion: reduce)').matches,  // a11y: calm sky by default
  'ck-phenom': true, 'ck-mega': false, 'ck-grav': false, 'ck-dm': false,
  'ck-orbits': true, 'ck-belts': true, 'ck-asteroids': false, 'ck-asteroid-names': false,
  'ck-comets': true, 'ck-tnos': true, 'ck-probes': true, 'ck-helio': true,
  'ck-moons': true, 'ck-sats': true, 'ck-plabels': true,
};
const PRESETS = {
  essentials: {},
  clean: { 'ck-lines': false, 'ck-labels': false, 'ck-names': false, 'ck-dso': false,
    'ck-phenom': false, 'ck-sats': false, 'ck-orbits': false, 'ck-belts': true,
    'ck-probes': false, 'ck-helio': false },
  everything: { 'ck-art': true, 'ck-exo': true, 'ck-grid': true, 'ck-mega': true,
    'ck-grav': true, 'ck-dm': true, 'ck-asteroids': true, 'ck-asteroid-names': true },
};
const presetBtns = [...document.querySelectorAll('.preset-btn')];
function applyPreset(name) {
  const p = { ...PRESET_BASE, ...PRESETS[name] };
  for (const [id, on] of Object.entries(p)) {
    const el = document.getElementById(id);
    if (!el || el.checked === on) continue;
    el.checked = on;
    if (el.onchange) el.onchange();
  }
  for (const b of presetBtns) b.classList.toggle('active', b.dataset.preset === name);
  savePanelState();
}
for (const b of presetBtns) b.onclick = () => applyPreset(b.dataset.preset);
// persist every static toggle + slider (dynamic per-category rows are governed by their masters)
function savePanelState() {
  const state = {};
  for (const el of panelEl.querySelectorAll('input[id]')) {
    if (el.id.startsWith('ck-ph-')) continue;
    state[el.id] = el.type === 'checkbox' ? el.checked : el.value;
  }
  localStorage.setItem('universe-panel', JSON.stringify(state));
}
panelEl.addEventListener('change', (e) => {
  if (!e.target.id || e.target.id.startsWith('ck-ph-')) return;
  for (const b of presetBtns) b.classList.remove('active');   // manual tweak → custom mix
  savePanelState();
});
bind('ck-art', (el) => {
  if (el.checked) buildArt();
  artGroup.visible = el.checked;
});

// controls panel — opens as a dropdown from the UNIVERSE title (closed by default)
const panel = document.getElementById('panel');
const titleEl = document.getElementById('title');
titleEl.onclick = () => { panel.classList.toggle('open'); titleEl.classList.toggle('open'); };

addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  // (mode keys 1–6 removed — it's one continuous window now; use Travel / search / flying)
  if (e.key === 'f' || e.key === 'F') {
    if (mode === 'deep') { e.preventDefault(); exitDeepInPlace(); }      // stop flying, stay here
    else if (FLY_MODES.has(mode)) { e.preventDefault(); setFlyMode(!flyMode); }
  }
  if (e.key === 'Escape') {                              // always-available bail-out
    if (rideAlong) { e.preventDefault(); exitRideAlong(); }
    else if (mode === 'deep') { e.preventDefault(); returnHomeFromDeep(); }
    else if (flyMode) { e.preventDefault(); setFlyMode(false); }
  }
  if (e.key === 'v' || e.key === 'V') {                 // toggle first / third person
    if (flyish()) { e.preventDefault(); thirdPerson = !thirdPerson; flyShowToggle(); }
  }
  if ((e.key === '+' || e.key === '=') && flyish()) { e.preventDefault(); setFlySpeed(flySpeed * 1.4); }
  if ((e.key === '-' || e.key === '_') && flyish()) { e.preventDefault(); setFlySpeed(flySpeed / 1.4); }
  if (e.key === ' ') {
    e.preventDefault();
    if (flyish()) { flyCruise = !flyCruise; flyShowToggle(); }  // hands-free cruise
    else { time.running = !time.running; refreshTimeUI(); }                            // otherwise pause/play
  }
  if (e.key === '/') { e.preventDefault(); searchInput.focus(); }
});

function onResize() {
  renderer.setSize(innerWidth, innerHeight);
  POST.resize();
  for (const cam of [skyCam, solCam, neiCam, galCam, cosCam, deepCam]) {
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
  }
  rescaleLabels(mode);
}
addEventListener('resize', onResize);

// ---------------------------------------------------------------- main loop
updateSkyBodies(time.jd);
updateSolarBodies(time.jd);
applySkyCam();
refreshTimeUI();
rescaleLabels('sky'); rescaleLabels('solar'); rescaleLabels('neighborhood'); rescaleLabels('galaxy');
setLoad(1);

let lastT = performance.now();
let _lastDate = '';                          // cache for the per-frame date readout (skip unchanged DOM writes)
function animate(now) {
  requestAnimationFrame(animate);
  window._animFrames = (window._animFrames || 0) + 1;
  try {
  const dt = Math.min(0.1, (now - lastT) / 1000);
  lastT = now;

  if (time.running) {
    time.jd = clampJD(time.jd + SPEEDS[time.speedIdx][0] * dt / 86400);
  }
  starUniforms.uTime.value = now / 1000;
  applyHeldKeys(dt);

  if (mode === 'deep') {
    applyDeepCam(dt);
    POST.present(deepScene, deepCam);
  } else if (mode === 'sky') {
    if (!dragging) {
      skyView.lon += skyView.vLon * 14 * dt * 4;
      skyView.lat += skyView.vLat * 14 * dt * 4;
      skyView.vLon *= Math.pow(0.05, dt);
      skyView.vLat *= Math.pow(0.05, dt);
    }
    if (flyAnim) {
      flyAnim.t = Math.min(1, flyAnim.t + dt / 0.8);
      const s = flyAnim.t * flyAnim.t * (3 - 2 * flyAnim.t);
      skyView.lon = flyAnim.lon0 + flyAnim.dLon * s;
      skyView.lat = flyAnim.lat0 + flyAnim.dLat * s;
      if (flyAnim.t >= 1) flyAnim = null;
    }
    updateSkyBodies(time.jd);
    updateHorizonFrame(time.jd);
    applySkyCam();
    POST.present(skyScene, skyCam);
  } else if (mode === 'solar') {
    if (!dragging) {
      const o = orbits.solar;
      o.theta += o.vT * 14 * dt * 4; o.phi += o.vP * 14 * dt * 4;
      o.vT *= Math.pow(0.05, dt); o.vP *= Math.pow(0.05, dt);
    }
    updateSolarBodies(time.jd);
    updateMegastructures(time.jd, now / 1000);
    updateGravGrid();
    if (rideAlong) applyRideAlong();
    else if (flyMode) applyFlyCam('solar', dt); else applyOrbitCam('solar');
    POST.present(solScene, solCam);
  } else {
    if (!dragging) {
      const o = orbits[mode];
      o.theta += o.vT * 14 * dt * 4; o.phi += o.vP * 14 * dt * 4;
      o.vT *= Math.pow(0.05, dt); o.vP *= Math.pow(0.05, dt);
    }
    if (mode === 'neighborhood') {
      const r = orbits.neighborhood.r;
      const state = (r < 130 ? 1 : 0) + (r < 34 ? 1 : 0);   // 0 none · 1 famous · 2 all
      if (neiScene.userData.labelState !== state) {
        neiScene.userData.labelState = state;
        for (const l of neiStarLabels) {
          l.visible = l.userData.tier === 1 ? state >= 1 : state === 2;
        }
      }
      // Oort cloud only at close zoom — farther out its points stack into a false dot
      neiScene.userData.oort.visible = r < 12;
    }
    if (mode === 'galaxy') {
      const gr = orbits.galaxy.r;
      const showNear = gr < 350;
      for (const sp of labelGroups.galaxy) {
        if (sp.userData.near) {
          sp.visible = showNear && !(sp.userData.hideBelow && gr < sp.userData.hideBelow)
            && !(sp.userData.hideBeyond && gr >= sp.userData.hideBeyond);
        } else if (sp.userData.far) sp.visible = !showNear;
        else if (sp.userData.hideBeyond) sp.visible = gr < sp.userData.hideBeyond;
      }
      galScene.userData.mwFar.material.opacity = THREE.MathUtils.smoothstep(gr, 150, 600) * 0.9;
      // the accretion disk holds a fixed frame — the swirl animation read as
      // distracting motion at the galaxy's centre (uTime frozen at a good-looking phase)
      galBH.userData.disk.uniforms.uTime.value = 40.0;
      galBH.visible = gr < 60;                                   // only meaningful near the centre
      // centre glows dim as you close in, so Sgr A* is viewable instead of blinding
      const glowK = Math.min(1, Math.max(0, (gr - 1.6) / 7));
      for (const gg of galCenterGlows) gg.mat.opacity = gg.base * glowK;
    }
    if (flyMode && FLY_MODES.has(mode)) applyFlyCam(mode, dt); else applyOrbitCam(mode);
    POST.present(sceneFor(mode), camFor(mode));
  }

  updateScalebar();
  updateSupernovae(time.jd);  // historical transients follow the sim clock
  updateEarthPointer();       // homing arrow to Earth (when enabled)
  drawLocator();              // refresh the "you are here" minimap
  const ds = fmtDate(time.jd);                          // only touch the DOM when the text changes
  if (ds !== _lastDate) { _lastDate = ds; dateLabel.textContent = ds; }
  } catch (e) { if (!window._animErr) { window._animErr = String(e && e.stack || e); console.error('animate', e); } }
}
requestAnimationFrame(animate);
// Hold the loading screen until every planet/moon/Sun texture has decoded, so the scene
// is revealed fully textured instead of as black spheres that pop in. The 12 s race is a
// safety net so a stalled download can never trap the user on the loader.
await Promise.race([
  Promise.all(texPromises),
  new Promise((r) => setTimeout(r, 12000)),
]);
document.getElementById('loader').classList.add('done');
releaseUpgrades();                            // scene is live — start streaming the 8K maps
// Open as ONE continuous space view: floating in the solar system, stationary,
// free-flight (not orbiting anything). The six scenes are now just internal scale
// shells the camera hands off between as you fly/zoom outward.
setMode('solar');
orbits.solar.follow = null;
orbits.solar.target.set(0, 0, 0);
orbits.solar.r = 60; orbits.solar.phi = 1.05; orbits.solar.theta = 0.6;
setFlyMode(false);         // open in orbit mode (drag to look, scroll to zoom); press F to fly
flyArmed = false; flyThrottle = false; flyCruise = false;
flyShowToggle();

// debug / scripting handle
window.U = {
  THREE, renderer, skyScene, solScene, neiScene, galScene, cosScene,
  skyCam, solCam, neiCam, galCam, cosCam,
  labelGroups, starUniforms, skyView, orbits, time, setMode, flyTo, jumpTo, rescaleLabels,
  skyGroup, horizon, buildArt, solBodies, applyZoom,
  STARS, handleClick, starInfo, fly, setFlyMode, flyToObject, EXO, exoDirs, skyCam, get flyMode() { return flyMode; },
  applyFlyCam, heldKeys, mouseNDC, MOONS_RT, SATS_RT, LUNAR_RT, ASTEROIDS_RT, COMETS_RT, updateComets,
  TNOS_RT, updateTNOs, PROBES_RT, updateProbes, helioMesh, showProbeInfo, viewFromObject, GALCAT_RT,
  SUPERNOVAE_RT, updateSupernovae, showSupernovaInfo,
  deep, deepScene, deepCam, get mode() { return mode; },
  get thirdPerson() { return thirdPerson; },
  exitRideAlong, get rideAlong() { return rideAlong; },
  setSpectrum, get spectrumMode() { return spectrumMode; },
  gravGrid, dmHalo,
};

// ---------------------------------------------------------------- first-run onboarding + guided tour
// A welcome card on the first visit offers a scripted "powers of ten" tour that rides the
// real scale ladder outward — Solar System → stars → galaxy → cosmic web → tonight's sky.
{
  const WELCOME_KEY = 'universe-welcomed';
  const welcomeEl = document.getElementById('welcome');
  const tourEl = document.getElementById('tour');
  const tTitle = document.getElementById('t-title');
  const tText = document.getElementById('t-text');
  const tDots = document.getElementById('t-dots');
  const tNext = document.getElementById('t-next');
  const hintsEl = document.getElementById('hints');

  // Each step can also demonstrate a feature: `timeIdx` speeds the sim clock up for the
  // step, `hud` shows the spaceship-controls card, `hi` highlights a piece of the UI.
  const TOUR = [
    { mode: 'solar', r0: 45, r1: 220, phi: 1.05,
      title: 'The Solar System',
      text: 'Eight planets moving at their real positions for today’s date, computed from NASA orbital elements. Drag to look around; scroll to zoom.' },
    { mode: 'solar', r0: 60, r1: 90, phi: 1.05, timeIdx: 9, hi: '#timebar',
      title: 'You are watching the future',
      text: 'The clock is running at a week per second — press ▶▶ for faster futures, ◀◀ to rewind into the past, ❚❚ to freeze a moment. Click the date to jump anywhere from the year 1000 to 3000 — try 1054, when a supernova outshone Venus. Every planet follows its real orbit the whole way.' },
    { mode: 'solar', follow: 'Earth', r0: 2.2, r1: 5.5, phi: 1.2,
      title: 'Ride along with a satellite',
      text: 'Home, up close — the ISS, Hubble, JWST, GPS, and more, all in motion around Earth. Click any satellite and choose “View from here” to ride in its seat. The Moon carries the Apollo landing sites, clickable too.' },
    { mode: 'solar', r0: 70, r1: 130, phi: 1.0, hud: true, hi: '#fly-hud',
      title: 'You have a spaceship',
      text: 'Press F any time to fly: hold the mouse to thrust, steer with the cursor, Shift to boost, V for third person. Double-click any planet, moon, or star to fly straight to it. F or Esc brings you home.' },
    { mode: 'neighborhood', r0: 18, r1: 70, phi: 1.15,
      title: 'The Stellar Neighborhood',
      text: 'Zoom out and the Sun becomes one star among 119,625 — every one plotted at its true measured 3D position. Keep flying outward and the scales hand off on their own.' },
    { mode: 'galaxy', r0: 22, r1: 65, phi: 1.0,
      title: 'The Milky Way',
      text: 'Our galaxy from above. The Sun orbits 26,000 light-years from the centre — one lap every 230 million years. Search “Sagittarius A*” later to visit the black hole at the middle.' },
    { mode: 'cosmic', r0: 28, r1: 95, phi: 1.1,
      title: 'The Cosmic Web',
      text: 'Galaxies gather into filaments around immense voids — the largest structure there is, out to 46 billion light-years.' },
    { mode: 'sky', title: 'And this is home',
      text: 'The sky above Earth tonight. Every star here is clickable — click anything for its story, or press / and search any of thousands of stars, planets, constellations, and nebulae.' },
    { mode: 'sky', hi: '#title',
      title: 'Make it yours',
      text: 'The UNIVERSE menu holds every layer — constellation art, exoplanets, pulsars and quasars, megastructures, dark matter, even the sky in X-ray or radio — with one-tap presets: Essentials, Clean view, Everything. The minimap’s ladder jumps scales. All of it is remembered. Your universe now.' },
  ];
  // Touch devices: no keyboard or scroll wheel — adapt the language, and teach
  // the touch flight controls (🚀 button) instead of the key bindings.
  const IS_TOUCH = TOUCH_UI;
  if (IS_TOUCH) {
    const hudStop = TOUR.find((t) => t.hud);
    if (hudStop) {
      delete hudStop.hud;                    // don't force the HUD open — it sits where 🚀 lives
      hudStop.hi = '#fly-btn';               // point at the real thing to tap
      hudStop.text = 'Tap 🚀 Fly any time to take the controls. You cruise hands-free — ' +
        'drag to steer, pinch for speed, ⏵ Cruise to stop and go. Double-tap any planet, ' +
        'moon, or star to fly straight to it. ✕ Exit lands you back in orbit.';
    }
    for (const t of TOUR) {
      t.text = t.text
        .replace(/scroll to zoom/g, 'pinch to zoom')
        .replace(/Click/g, 'Tap').replace(/click/g, 'tap')
        .replace(/, or press \/ and search/, ', or search');
      t.title = t.title.replace(/Click/g, 'Tap');
    }
    document.querySelector('.w-hint').textContent = 'drag to orbit · pinch to zoom · tap anything';
    const chips = document.querySelectorAll('#hints .hint-chip');
    if (chips[0]) chips[0].textContent = '👆 drag to orbit · pinch to zoom';
    if (chips[1]) chips[1].textContent = '✦ tap any star or planet';
    if (chips[2]) chips[2].textContent = '⌕ search anything, top right';
  }
  const wTourHint = document.querySelector('#w-tour span');
  if (wTourHint) wTourHint.textContent = `${TOUR.length} stops · skip any time`;

  let tourStep = -1, tourZoom = null;
  let tourFx = null;                                     // active step effects, for cleanup

  function clearTourFx() {
    if (!tourFx) return;
    if (tourFx.time) {
      time.speedIdx = tourFx.time.speedIdx;
      time.running = tourFx.time.running;
      refreshTimeUI();
    }
    if (tourFx.hud) flyShowToggle();                     // recompute the HUD's real state
    if (tourFx.hi) tourFx.hi.classList.remove('tour-hi');
    tourFx = null;
  }
  function applyTourFx(s) {
    tourFx = {};
    if (s.timeIdx !== undefined) {
      tourFx.time = { speedIdx: time.speedIdx, running: time.running };
      time.speedIdx = s.timeIdx; time.running = true;
      refreshTimeUI();
    }
    if (s.hud) { document.getElementById('fly-hud').classList.add('show'); tourFx.hud = true; }
    if (s.hi) {
      const el = document.querySelector(s.hi);
      if (el) { el.classList.add('tour-hi'); tourFx.hi = el; }
    }
  }

  function showTourStep(i) {
    clearTourFx();
    tourStep = i;
    const s = TOUR[i];
    goToScale(s.mode);                                   // reuses the ladder's jump (orbit view)
    if (s.mode !== 'sky') {
      const o = orbits[s.mode];
      o.r = s.r0; if (s.phi !== undefined) o.phi = s.phi;
      if (s.follow) o.follow = s.follow;                 // e.g. hold Earth for the satellite stop
      tourZoom = { o, r0: s.r0, r1: s.r1, t: 0, dur: 9 };  // slow drift outward while reading
    } else tourZoom = null;
    applyTourFx(s);
    tTitle.textContent = s.title;
    tText.textContent = s.text;
    tDots.innerHTML = TOUR.map((_, k) => `<span class="t-dot${k <= i ? ' on' : ''}"></span>`).join('');
    tNext.textContent = i === TOUR.length - 1 ? 'Start exploring' : 'Next →';
    tourEl.classList.add('show');
    document.body.classList.add('touring');
  }
  function tourTick() {
    if (tourStep < 0) return;                            // tour over — stop ticking
    if (tourZoom) {
      const z = tourZoom;
      z.t = Math.min(1, z.t + 1 / (60 * z.dur));
      const e = 1 - Math.pow(1 - z.t, 2);                // ease-out
      z.o.r = z.r0 + (z.r1 - z.r0) * e;
      if (z.t >= 1) tourZoom = null;
    }
    requestAnimationFrame(tourTick);
  }
  function startTour() {
    localStorage.setItem(WELCOME_KEY, '1');
    welcomeEl.classList.remove('show');
    hintsEl.classList.remove('show', 'fade');
    showTourStep(0);
    requestAnimationFrame(tourTick);
  }
  function showHints() {
    hintsEl.classList.add('show');
    setTimeout(() => hintsEl.classList.add('fade'), 14000);
    setTimeout(() => hintsEl.classList.remove('show', 'fade'), 15000);
  }
  function endTour(early) {
    clearTourFx();
    const wasEarly = early && tourStep < TOUR.length - 1;
    tourStep = -1; tourZoom = null;
    tourEl.classList.remove('show');
    document.body.classList.remove('touring');
    if (wasEarly) showHints();                           // bailed out — leave gentle nudges
  }
  tNext.onclick = () => (tourStep < TOUR.length - 1 ? showTourStep(tourStep + 1) : endTour(false));
  document.getElementById('t-end').onclick = () => endTour(true);
  document.getElementById('tour-btn').onclick = startTour;
  document.getElementById('w-tour').onclick = startTour;
  document.getElementById('w-skip').onclick = () => {
    localStorage.setItem(WELCOME_KEY, '1');
    welcomeEl.classList.remove('show');
    showHints();
  };
  // Deep links: ?scale=sky|solar|neighborhood|galaxy|cosmic opens at that scale;
  // ?welcomed skips the first-visit card (a shared link shouldn't open on onboarding).
  const params = new URLSearchParams(location.search);
  if (params.has('welcomed')) localStorage.setItem(WELCOME_KEY, '1');
  const jump = params.get('scale');
  if (jump && (jump === 'sky' || orbits[jump])) goToScale(jump);
  urlScaleSync = true;

  // First visit: the welcome card offers two paths — the tour, or exploring alone.
  // Return visits go straight into the model; the ✦ Tour button replays it any time.
  if (!localStorage.getItem(WELCOME_KEY)) {
    setTimeout(() => welcomeEl.classList.add('show'), 900);
  }
}
