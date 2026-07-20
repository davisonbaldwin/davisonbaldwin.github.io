// The landing, made a world: the whole first page is deep space, in the same
// visual language as the universe app's solar neighborhood: brilliant stars
// on true black. The planet of three worlds floats at the center, its surface
// alive and designed per world:
//   01 UNIVERSE   a real night sky: a galactic band, nebulae, constellations,
//                 twinkling stars, the odd meteor
//   02 EVALUATOR  an amber terminal: grid, candles, a dashed index line, the
//                 price thread glowing above it, numbers raining
//   03 MUSIC      A Soul's Journey: pale light descending into dark, a low
//                 sun whose sound rings expand, a choir of harmonic voice
//                 lines around the main waveform, motes rising
// One signal thread runs the whole equator and speaks each world's dialect as
// it crosses. Drag anywhere to spin; click a world to enter its study. The
// SVG planet remains as the fallback for browsers without WebGL.
import * as THREE from './vendor/three.module.js';

const host = document.querySelector('.landing-planet');
const svg = host && host.querySelector('svg');
const caption = document.getElementById('planet-caption');
if (host && svg && caption) init();

function init() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) {
    // no WebGL: lift the boot veil so the SVG planet can take the stage
    document.documentElement.classList.remove('pre3d');
    return;
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrowMq = matchMedia('(max-width: 900px)');
  // the caption system is sized once at load (NARROW0 below); if the
  // viewport later crosses the phone boundary (tablet rotation, window
  // resize), a fresh load re-sizes it to match the new layout
  narrowMq.addEventListener('change', () => location.reload(), { once: true });

  const WORLDS = [
    { name: '01 · UNIVERSE', href: 'studies/universe.html', color: 0x7fb4ff },
    { name: '02 · STOCK EVALUATOR', href: 'studies/stock-evaluator.html', color: 0xffb454 },
    { name: '03 · MUSIC TECHNOLOGY', href: 'studies/music-technology.html', color: 0xd9a96a },
  ];
  // phones read the caption at arm's length: fewer words in larger type on
  // a wider arc (CAPS scales the whole caption system; sized at load)
  const NARROW0 = narrowMq.matches;
  const restCaption = NARROW0
    ? 'THREE WORLDS, ONE PLANET · TAP TO ENTER'
    : 'THREE WORLDS, ONE PLANET · DRAG TO SPIN · CLICK TO ENTER';
  // on phones the planet is the whole show: the caption hugs it on a
  // tighter arc so the larger type still fits the narrow screen
  const CAPS = NARROW0 ? 1.2 : 1;
  const CAPPX = NARROW0 ? 38 : 24;
  const CAPGAP = NARROW0 ? 8 : 6;
  const R_CAP = (NARROW0 ? 1.18 : 1.45) * CAPS;
  caption.textContent = restCaption;           // one voice for both variants

  // ---- the surface: one living equirectangular canvas, one third per world --
  // Painted fresh ~30 times a second. The base is built once offscreen with a
  // seeded random so the composition is designed, not rolled per visit; each
  // frame composites it and draws the moving parts on top.
  const W = 2048, H = 1024, S = W / 3;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const c = cv.getContext('2d');
  const TAU = Math.PI * 2;

  let seed = 20260718;
  const rnd = () => {                          // mulberry32, stable per build
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let z = Math.imul(seed ^ seed >>> 15, 1 | seed);
    z = z + Math.imul(z ^ z >>> 7, 61 | z) ^ z;
    return ((z ^ z >>> 14) >>> 0) / 4294967296;
  };
  const rr = (a, b) => a + rnd() * (b - a);

  // a layer painted by fn, then faded in and out horizontally so worlds blend
  const feathered = (fn, x0, x1, f) => {
    const t = document.createElement('canvas');
    t.width = W; t.height = H;
    const g = t.getContext('2d');
    fn(g);
    g.globalCompositeOperation = 'destination-in';
    const m = g.createLinearGradient(x0 - f, 0, x1 + f, 0);
    const rise = f / (x1 - x0 + 2 * f);
    m.addColorStop(0, 'rgba(0,0,0,0)');
    m.addColorStop(rise, 'rgba(0,0,0,1)');
    m.addColorStop(1 - rise, 'rgba(0,0,0,1)');
    m.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = m;
    g.fillRect(0, 0, W, H);
    return t;
  };

  const base = document.createElement('canvas');
  base.width = W; base.height = H;
  {
    const b = base.getContext('2d');
    // the floor: true black space everywhere, one night under all three worlds
    b.fillStyle = '#04060b';
    b.fillRect(0, 0, W, H);

    // ---------- 01 UNIVERSE: a real sky ----------
    // the galactic band: a soft diagonal river of light, then thousands of
    // faint stars concentrated along it
    const bandAt = (x) => H * 0.62 - (x / S) * H * 0.30;
    for (let i = 0; i < 46; i++) {
      const x = rr(-40, S + 40), spread = rr(40, 110);
      const y = bandAt(x) + rr(-40, 40);
      const g = b.createRadialGradient(x, y, 0, x, y, spread);
      g.addColorStop(0, 'rgba(150,168,205,0.045)');
      g.addColorStop(1, 'rgba(150,168,205,0)');
      b.fillStyle = g; b.beginPath(); b.arc(x, y, spread, 0, TAU); b.fill();
    }
    for (let i = 0; i < 1500; i++) {
      const x = rr(0, S);
      const gauss = (rnd() + rnd() + rnd() - 1.5) * 150;
      const y = bandAt(x) + gauss;
      if (y < 0 || y > H) continue;
      b.globalAlpha = rr(0.05, 0.28);
      b.fillStyle = rnd() < 0.85 ? '#c7d3e8' : '#e8d9be';
      b.fillRect(x, y, 1, 1);
    }
    b.globalAlpha = 1;
    // two nebulae off the band
    for (const [nx, ny, nr, col] of [[S * 0.26, H * 0.24, 240, '48,84,158'], [S * 0.74, H * 0.76, 200, '104,62,114']]) {
      const g = b.createRadialGradient(nx, ny, 0, nx, ny, nr);
      g.addColorStop(0, `rgba(${col},0.30)`); g.addColorStop(1, `rgba(${col},0)`);
      b.fillStyle = g; b.beginPath(); b.arc(nx, ny, nr, 0, TAU); b.fill();
    }
    // the field stars, magnitude-varied, a few with real glow
    for (let i = 0; i < 420; i++) {
      const x = rr(0, S), y = rr(0, H);
      const mag = rnd();
      const cols = ['#d8e2f2', '#9db8d9', '#ffd9a8', '#aac6ee', '#f2e6d0'];
      b.fillStyle = cols[(rnd() * cols.length) | 0];
      b.globalAlpha = 0.3 + mag * 0.7;
      b.beginPath(); b.arc(x, y, 0.4 + mag * 1.6, 0, TAU); b.fill();
    }
    b.globalAlpha = 1;
    for (let i = 0; i < 9; i++) {                      // the brilliant few
      const x = rr(30, S - 30), y = rr(80, H - 80);
      const r = rr(7, 13);
      const g = b.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(230,238,250,1)');
      g.addColorStop(0.25, 'rgba(230,238,250,0.5)');
      g.addColorStop(1, 'rgba(230,238,250,0)');
      b.fillStyle = g; b.beginPath(); b.arc(x, y, r, 0, TAU); b.fill();
      b.fillStyle = '#ffffff';
      b.beginPath(); b.arc(x, y, 1.3, 0, TAU); b.fill();
    }
    // constellation figures: fine lines strung between real dots
    b.strokeStyle = 'rgba(127,180,255,0.32)'; b.lineWidth = 1.2;
    b.fillStyle = '#d8e2f2';
    for (let k = 0; k < 3; k++) {
      let x = rr(90, S - 220), y = rr(170, H - 260);
      b.beginPath(); b.moveTo(x, y);
      const pts = [[x, y]];
      for (let s2 = 0; s2 < 4; s2++) {
        x += rr(-1, 1) * 150; y += rr(-1, 1) * 130;
        b.lineTo(x, y); pts.push([x, y]);
      }
      b.stroke();
      for (const [px2, py2] of pts) { b.beginPath(); b.arc(px2, py2, 1.9, 0, TAU); b.fill(); }
    }
    // one small galaxy, far away
    {
      const gx = S * 0.55, gy = H * 0.18;
      b.save(); b.translate(gx, gy); b.rotate(-0.5); b.scale(1, 0.38);
      const g = b.createRadialGradient(0, 0, 0, 0, 0, 26);
      g.addColorStop(0, 'rgba(238,232,220,0.5)');
      g.addColorStop(0.4, 'rgba(200,204,225,0.18)');
      g.addColorStop(1, 'rgba(200,204,225,0)');
      b.fillStyle = g; b.beginPath(); b.arc(0, 0, 26, 0, TAU); b.fill();
      b.restore();
    }
    // dark dust thinning the band, the way the real one is broken
    b.fillStyle = 'rgba(4,6,11,0.5)';
    for (let i = 0; i < 22; i++) {
      const x = rr(0, S), y = bandAt(x) + rr(-60, 60);
      b.save(); b.translate(x, y); b.rotate(rr(-0.4, 0.4)); b.scale(1, rr(0.12, 0.3));
      b.beginPath(); b.arc(0, 0, rr(40, 110), 0, TAU); b.fill();
      b.restore();
    }
    // a small planetary system in the quiet corner: three tilted orbits
    {
      const px2 = S * 0.80, py2 = H * 0.26, tilt = -0.18;
      const ca = Math.cos(tilt), sa = Math.sin(tilt);
      b.strokeStyle = 'rgba(158,178,214,0.16)'; b.lineWidth = 1;
      for (const [orx, ory] of [[44, 15], [74, 25], [106, 36]]) {
        b.beginPath(); b.ellipse(px2, py2, orx, ory, tilt, 0, TAU); b.stroke();
      }
      b.fillStyle = '#e8d9be';
      b.beginPath(); b.arc(px2, py2, 3.4, 0, TAU); b.fill();
      b.fillStyle = '#aac6ee';
      for (const [orx, ory, ph2] of [[44, 15, 0.8], [74, 25, 2.6], [106, 36, 4.4]]) {
        const ex = orx * Math.cos(ph2), eyy = ory * Math.sin(ph2);
        b.beginPath(); b.arc(px2 + ex * ca - eyy * sa, py2 + ex * sa + eyy * ca, 1.8, 0, TAU); b.fill();
      }
    }

    // ---------- 02 EVALUATOR: the amber terminal ----------
    b.drawImage(feathered((g) => {
      g.fillStyle = '#141008';
      g.fillRect(S - 130, 0, S + 260, H);
      // the grid, both axes, barely there
      g.strokeStyle = 'rgba(255,180,84,0.065)'; g.lineWidth = 1;
      for (let y = 64; y < H; y += 64) { g.beginPath(); g.moveTo(S - 130, y); g.lineTo(2 * S + 130, y); g.stroke(); }
      g.strokeStyle = 'rgba(255,180,84,0.04)';
      for (let x = S; x <= 2 * S; x += 128) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      // the index: a dashed grey line, steady under everything (the baseline
      // every verdict is checked against)
      g.setLineDash([8, 7]);
      g.strokeStyle = 'rgba(143,163,184,0.42)'; g.lineWidth = 1.6;
      g.beginPath();
      for (let x = S - 130; x <= 2 * S + 130; x += 10) {
        const y = H * 0.68 + Math.sin((x / W) * TAU * 5) * 26;
        x === S - 130 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.stroke();
      g.setLineDash([]);
      // a candle band along the floor of the world
      for (let i = 0; i < 44; i++) {
        const x = S + 18 + i * ((S - 36) / 44);
        const up = rnd() < 0.55;
        const h2 = rr(14, 58);
        const y = H - 150 - (up ? h2 : 0);
        g.fillStyle = up ? 'rgba(127,220,127,0.30)' : 'rgba(255,143,127,0.26)';
        g.fillRect(x, y, 6, h2);
        g.fillRect(x + 2.2, y - 8, 1.6, h2 + 16);
      }
      // ghost panels on the back wall: sparklines of other dossiers
      for (let i = 0; i < 5; i++) {
        const bx2 = S + 60 + rnd() * (S - 280), by2 = 110 + rnd() * 250;
        const bw = 120 + rnd() * 70, bh = 64;
        g.strokeStyle = 'rgba(255,180,84,0.10)'; g.lineWidth = 1;
        g.strokeRect(bx2, by2, bw, bh);
        g.beginPath();
        let vy = by2 + bh * (0.3 + 0.4 * rnd());
        g.moveTo(bx2, vy);
        for (let k = 1; k <= 10; k++) {
          vy = Math.max(by2 + 6, Math.min(by2 + bh - 6, vy + (rnd() - 0.48) * 22));
          g.lineTo(bx2 + (bw / 10) * k, vy);
        }
        g.strokeStyle = 'rgba(255,180,84,0.18)'; g.stroke();
      }
    }, S - 60, 2 * S + 40, 110), 0, 0);

    // ---------- 03 MUSIC: A Soul's Journey ----------
    b.drawImage(feathered((g) => {
      // the light of rest descending into the dark, in many shades of the
      // one warm color: cream through honey, bronze, umber, near-black
      const gr = g.createLinearGradient(0, 0, 0, H);
      gr.addColorStop(0, '#e9e2d2'); gr.addColorStop(0.13, '#dcc9a2');
      gr.addColorStop(0.26, '#cdb287'); gr.addColorStop(0.37, '#b3976a');
      gr.addColorStop(0.5, '#8f724d'); gr.addColorStop(0.61, '#6b5236');
      gr.addColorStop(0.74, '#4a3626'); gr.addColorStop(0.86, '#30231a');
      gr.addColorStop(1, '#1a1410');
      g.fillStyle = gr; g.fillRect(2 * S - 150, 0, S + 300, H);
      // fine banding, like slow air
      for (let y = 0; y < H; y += 30) {
        g.fillStyle = 'rgba(26,20,16,' + (0.04 + 0.07 * Math.abs(Math.sin(y * 0.045))) + ')';
        g.fillRect(2 * S - 150, y + Math.sin(y * 0.09) * 8, S + 300, 8);
      }
      // the low sun: a golden disc hanging over the sea, the Dame sol frame
      const sx = 2 * S + S * 0.5, sy = H * 0.50;
      for (const [r2, a2] of [[150, 0.10], [92, 0.16], [46, 0.32]]) {
        const gg = g.createRadialGradient(sx, sy, 0, sx, sy, r2);
        gg.addColorStop(0, `rgba(244,196,96,${a2})`); gg.addColorStop(1, 'rgba(244,196,96,0)');
        g.fillStyle = gg; g.beginPath(); g.arc(sx, sy, r2, 0, TAU); g.fill();
      }
      g.fillStyle = 'rgba(248,206,120,0.9)';
      g.beginPath(); g.arc(sx, sy, 17, 0, TAU); g.fill();
      // three still rings, the sound already in the air
      g.strokeStyle = 'rgba(233,214,178,0.20)'; g.lineWidth = 1.4;
      for (const r2 of [58, 92, 128]) { g.beginPath(); g.arc(sx, sy, r2, 0, TAU); g.stroke(); }
      // grooves cut fine around the sun, like the surface of a record
      g.strokeStyle = 'rgba(233,214,178,0.05)'; g.lineWidth = 1;
      for (let r2 = 42; r2 <= 208; r2 += 11) { g.beginPath(); g.arc(sx, sy, r2, 0, TAU); g.stroke(); }
      // the staff the choir sings from
      g.strokeStyle = 'rgba(233,214,178,0.07)';
      for (let i = -2; i <= 2; i++) {
        const y = H * 0.52 + i * 26;
        g.beginPath(); g.moveTo(2 * S - 150, y); g.lineTo(W + 150, y); g.stroke();
      }
      // light falling from the rest above
      for (let i = 0; i < 4; i++) {
        const lx = 2 * S + 50 + rnd() * (S - 160), lw = 34 + rnd() * 60;
        const lg = g.createLinearGradient(0, 0, 0, H * 0.5);
        lg.addColorStop(0, 'rgba(255,250,238,0.09)'); lg.addColorStop(1, 'rgba(255,250,238,0)');
        g.fillStyle = lg; g.fillRect(lx, 0, lw, H * 0.5);
      }
      // the sky is a manuscript: fine staff pinstripes ruled across it,
      // with measure ticks keeping quiet time
      g.strokeStyle = 'rgba(110,80,44,0.045)'; g.lineWidth = 1;
      for (let y = 44; y < H * 0.42; y += 14) {
        g.beginPath(); g.moveTo(2 * S - 150, y); g.lineTo(W + 150, y); g.stroke();
      }
      g.strokeStyle = 'rgba(110,80,44,0.06)';
      for (let x = 2 * S + 20; x < W; x += 88) {
        const jit = Math.sin(x * 0.6) * 8;
        g.beginPath(); g.moveTo(x + jit, 44); g.lineTo(x + jit, H * 0.42); g.stroke();
      }
      // cream cloud banks drifting through the light, each with a soft
      // sepia shadow beneath
      for (let i = 0; i < 4; i++) {
        const cx3 = 2 * S + 60 + rnd() * (S - 120), cy3 = 60 + rnd() * (H * 0.3);
        const rx3 = rr(70, 150), ry3 = rx3 * rr(0.22, 0.34);
        g.fillStyle = 'rgba(120,90,50,0.05)';
        g.save(); g.translate(cx3, cy3 + ry3); g.scale(1, ry3 / rx3 * 0.5); g.translate(-cx3, -(cy3 + ry3));
        g.beginPath(); g.arc(cx3, cy3 + ry3, rx3 * 0.9, 0, TAU); g.fill();
        g.restore();
        const cg2 = g.createRadialGradient(cx3, cy3, 0, cx3, cy3, rx3);
        cg2.addColorStop(0, 'rgba(255,250,240,0.22)');
        cg2.addColorStop(1, 'rgba(255,250,240,0)');
        g.fillStyle = cg2;
        g.save(); g.translate(cx3, cy3); g.scale(1, ry3 / rx3); g.translate(-cx3, -cy3);
        g.beginPath(); g.arc(cx3, cy3, rx3, 0, TAU); g.fill();
        g.restore();
      }
      // two notes resting far off in the sky
      g.fillStyle = 'rgba(120,88,48,0.14)';
      g.font = '18px "Times New Roman", serif';
      g.fillText('♪', 2 * S + rr(60, 300), rr(80, 200));
      g.fillText('♩', 2 * S + rr(320, 600), rr(100, 240));
      // the open sea from Dame sol: the horizon runs right through the
      // heart of the world, water below it
      const HZ = H * 0.615;
      const sea = g.createLinearGradient(0, HZ, 0, H);
      sea.addColorStop(0, 'rgba(58,42,26,0.55)');
      sea.addColorStop(0.25, 'rgba(30,22,15,0.75)');
      sea.addColorStop(1, 'rgba(12,9,7,0.9)');
      g.fillStyle = sea; g.fillRect(2 * S - 150, HZ, S + 300, H - HZ);
      g.strokeStyle = 'rgba(244,196,96,0.30)'; g.lineWidth = 1.2;
      g.beginPath(); g.moveTo(2 * S - 150, HZ); g.lineTo(W + 150, HZ); g.stroke();
      // still water: faint long swells
      g.strokeStyle = 'rgba(233,214,178,0.06)'; g.lineWidth = 1;
      for (let y = HZ + 14; y < H - 8; y += 18) {
        g.beginPath(); g.moveTo(2 * S - 150, y + Math.sin(y) * 2); g.lineTo(W + 150, y + Math.cos(y) * 2); g.stroke();
      }
      // the fade completes INSIDE the third, settling into the shared night
      // before the sphere wraps back to the universe: no hard seam
    }, 2 * S - 40, W - 150, 130), 0, 0);
  }

  // the moving parts
  const twinkles = [];
  for (let i = 0; i < 70; i++) twinkles.push({
    x: rr(0, S + 60), y: rr(0, H),
    r: rr(0.5, 1.9), ph: rr(0, TAU), sp: rr(0.5, 1.9),
  });
  const fmt = () => {
    const kind = Math.random();
    if (kind < 0.45) return (20 + Math.random() * 800).toFixed(Math.random() < 0.5 ? 1 : 2);
    if (kind < 0.8) return (Math.random() < 0.5 ? '+' : '-') + (Math.random() * 4).toFixed(1) + '%';
    return (1000 + Math.random() * 9000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const streams = [];
  for (let i = 0; i < 12; i++) streams.push({
    x: S + 40 + (i + 0.2 * Math.random()) * ((S - 80) / 12),
    y: Math.random() * H, v: 34 + Math.random() * 60,
    txts: Array.from({ length: 6 }, fmt),
  });
  const motes = [];
  for (let i = 0; i < 10; i++) motes.push({
    x: 2 * S + 60 + Math.random() * (S - 120), y: Math.random() * H,
    v: 16 + Math.random() * 22, ph: Math.random() * TAU,
  });
  const meteor = { on: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, cd: 4 };
  const comet = { on: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 0, cd: 9 };
  const SUNX = 2 * S + S * 0.5, SUNY = H * 0.50;
  // the choir: four voices around the lead, all born at the sun (one voice
  // becomes many as they travel from it)
  const VOICES = [[-64, 13, 0.16], [-30, 17, 0.22], [34, 15, 0.20], [70, 11, 0.14]];
  const vEnv = (x) => Math.min(1, Math.abs(x - SUNX) / 300);
  const notes = [];
  for (let i = 0; i < 12; i++) notes.push({
    x: 2 * S + Math.random() * S, v: (Math.random() * 4) | 0,
    sp: 14 + Math.random() * 22, ph: Math.random() * TAU,
  });
  // and whole notes take flight, drifting up out of the choir
  const GLYPHS = ['♪', '♫', '♩', '♬'];
  const flying = [];
  for (let i = 0; i < 7; i++) flying.push({
    x: 0, y: 0, vx: 0, vy: 0, rot: 0, vr: 0, ph: Math.random() * TAU,
    life: -(i * 1.3 + Math.random()), max: 1, size: 20,
    glyph: GLYPHS[i % 4],
  });

  // how much each world owns column x (feathered, wrap-aware at 0 and W)
  const F = 80;
  const ramp = (x, a, b2) => Math.max(0, Math.min(1, (x - a) / (b2 - a)));
  const wStock = (x) => ramp(x, S - F, S + F) * (1 - ramp(x, 2 * S - F, 2 * S + F));
  const wMusic = (x) => ramp(x, 2 * S - F, 2 * S + F) * (1 - ramp(x, W - 260, W - 60));
  const wUni = (x) => Math.max(0, 1 - wStock(x) - wMusic(x));
  // the shared backbone of the equator thread; built from whole-number wave
  // counts so it joins itself where the sphere wraps
  const yBase = (x, t) => H * 0.52
    + Math.sin((x / W) * TAU * 3 + t * 0.4) * 44
    + Math.sin((x / W) * TAU * 7 - t * 0.23) * 16;
  const hash = (n) => { const s2 = Math.sin(n * 12.9898) * 43758.5453; return s2 - Math.floor(s2); };

  function paint(t) {
    c.clearRect(0, 0, W, H);
    c.drawImage(base, 0, 0);

    // stars breathe
    for (const s2 of twinkles) {
      const a = wUni(s2.x) * (0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * s2.sp + s2.ph)));
      if (a < 0.02) continue;
      c.globalAlpha = a;
      c.fillStyle = '#d8e2f2';
      c.beginPath(); c.arc(s2.x, s2.y, s2.r, 0, TAU); c.fill();
    }
    c.globalAlpha = 1;

    // the odd meteor across the sky
    meteor.cd -= 1 / 30;
    if (!meteor.on && meteor.cd <= 0) {
      meteor.on = true; meteor.life = 0;
      meteor.x = 120 + Math.random() * (S - 240); meteor.y = 60 + Math.random() * 220;
      meteor.vx = -(120 + Math.random() * 90); meteor.vy = 60 + Math.random() * 70;
    }
    if (meteor.on) {
      meteor.life += 1 / 30;
      meteor.x += meteor.vx / 30; meteor.y += meteor.vy / 30;
      const a = Math.max(0, 0.8 - meteor.life * 1.1) * wUni(meteor.x);
      c.strokeStyle = `rgba(234,241,255,${a.toFixed(3)})`;
      c.lineWidth = 1.6; c.lineCap = 'round';
      c.beginPath();
      c.moveTo(meteor.x, meteor.y);
      c.lineTo(meteor.x - meteor.vx * 0.09, meteor.y - meteor.vy * 0.09);
      c.stroke();
      if (meteor.life > 0.85) { meteor.on = false; meteor.cd = 5 + Math.random() * 8; }
    }

    // and, rarely, a comet: slow, with a real tail
    comet.cd -= 1 / 30;
    if (!comet.on && comet.cd <= 0) {
      comet.on = true; comet.life = 0; comet.max = 9 + Math.random() * 4;
      comet.x = S * 0.15 + Math.random() * S * 0.4;
      comet.y = 120 + Math.random() * 300;
      comet.vx = 16 + Math.random() * 10; comet.vy = 7 + Math.random() * 6;
    }
    if (comet.on) {
      comet.life += 1 / 30;
      comet.x += comet.vx / 30; comet.y += comet.vy / 30;
      const fade = Math.min(1, comet.life / 1.5, Math.max(0, (comet.max - comet.life) / 1.5));
      const a = 0.55 * fade * wUni(comet.x);
      if (a > 0.01) {
        const tl = 90;
        const tg = c.createLinearGradient(comet.x, comet.y, comet.x - comet.vx * tl / 22, comet.y - comet.vy * tl / 22);
        tg.addColorStop(0, `rgba(214,230,250,${(a * 0.8).toFixed(3)})`);
        tg.addColorStop(1, 'rgba(214,230,250,0)');
        c.strokeStyle = tg; c.lineWidth = 3; c.lineCap = 'round';
        c.beginPath();
        c.moveTo(comet.x, comet.y);
        c.quadraticCurveTo(
          comet.x - comet.vx * tl / 44, comet.y - comet.vy * tl / 44 - 8,
          comet.x - comet.vx * tl / 22, comet.y - comet.vy * tl / 22 - 20);
        c.stroke();
        c.fillStyle = `rgba(238,246,255,${a.toFixed(3)})`;
        c.beginPath(); c.arc(comet.x, comet.y, 2.6, 0, TAU); c.fill();
      }
      if (comet.life > comet.max) { comet.on = false; comet.cd = 16 + Math.random() * 14; }
    }

    // numbers rain
    c.font = '13px Menlo, monospace';
    for (const st of streams) {
      st.y += st.v / 30;
      if (st.y > H + 40) { st.y = -200; st.txts = st.txts.map(fmt); }
      for (let k = 0; k < st.txts.length; k++) {
        const y = ((st.y - k * 44) % (H + 240) + H + 240) % (H + 240) - 120;
        if (y < -20 || y > H + 20) continue;
        const txt = st.txts[k];
        c.fillStyle = txt.startsWith('+') ? '#7fdc7f' : txt.startsWith('-') ? '#ff8f7f' : '#ffb454';
        c.globalAlpha = wStock(st.x) * (k === 0 ? 0.6 : 0.36 - k * 0.045);
        c.fillText(txt, st.x, y);
      }
    }
    c.globalAlpha = 1;

    // the tape: symbols crossing the terminal, endlessly
    {
      const tape = 'AAPL 231.44 +0.8%   MSFT 512.10 +1.2%   NVDA 171.35 -0.6%   VTI 302.77 +0.3%   AMZN 244.19 +0.9%   GOOG 201.62 -0.2%   META 712.55 +1.6%   ';
      c.font = '15px Menlo, monospace';
      const tw = c.measureText(tape).width;
      c.save();
      c.beginPath(); c.rect(S + 8, 0, S - 16, H); c.clip();
      c.fillStyle = 'rgba(255,180,84,0.30)';
      for (let ox2 = S - ((t * 30) % tw); ox2 < 2 * S + 10; ox2 += tw) c.fillText(tape, ox2, 150);
      c.restore();
    }

    // the cone of futures: Monte Carlo paths fanning out under the price
    {
      const ox2 = S + S * 0.40, ex2 = 2 * S - 70;
      for (let j = 0; j < 11; j++) {
        const spread = (j - 5) / 5;
        c.beginPath();
        for (let x = ox2; x <= ex2; x += 26) {
          const p = (x - ox2) / (ex2 - ox2);
          const y = yBase(x, t) + spread * Math.pow(p, 1.25) * 120
            + Math.sin(x * 0.03 + j * 2.1 + t * 0.5) * 6 * p;
          x === ox2 ? c.moveTo(x, y) : c.lineTo(x, y);
        }
        c.strokeStyle = `rgba(255,180,84,${(0.045 + 0.04 * (1 - Math.abs(spread))).toFixed(3)})`;
        c.lineWidth = 1;
        c.stroke();
      }
    }

    // sound rings expand from the low sun; motes rise through the light
    for (let i = 0; i < 4; i++) {
      const r2 = ((t * 26 + i * 40) % 160);
      const a = Math.max(0, (1 - r2 / 160)) * 0.30;
      if (a < 0.02 || r2 < 20) continue;
      c.strokeStyle = `rgba(240,214,160,${a.toFixed(3)})`;
      c.lineWidth = 1.6;
      c.beginPath(); c.arc(SUNX, SUNY, r2, 0, TAU); c.stroke();
    }
    c.globalAlpha = 0.75 + 0.25 * Math.sin(t * 1.8);
    c.fillStyle = 'rgba(252,216,138,0.9)';
    c.beginPath(); c.arc(SUNX, SUNY, 17 + Math.sin(t * 1.8) * 1.6, 0, TAU); c.fill();
    c.globalAlpha = 1;
    for (const m of motes) {
      m.y -= m.v / 30;
      if (m.y < -10) m.y = H + 10;
      const a = wMusic(m.x) * (0.25 + 0.2 * Math.sin(t * 1.7 + m.ph));
      if (a < 0.02) continue;
      c.globalAlpha = a;
      c.fillStyle = '#f0c27a';
      c.beginPath(); c.arc(m.x + Math.sin(m.y * 0.04 + m.ph) * 6, m.y, 1.6, 0, TAU); c.fill();
    }
    c.globalAlpha = 1;

    // THE THREAD: one signal runs the whole equator and speaks each world's
    // dialect: a constellation line among the stars, the price line above the
    // index, the lead voice of a choir of waveforms. One work, three languages.
    const seg = 8;
    let px = 0, py = 0;
    const stockPts = [];
    for (let x = 0; x <= W; x += seg) {
      const wu = wUni(x), ws = wStock(x), wm = wMusic(x);
      const yb = yBase(x, t);
      const step = Math.floor(x / 26) - Math.floor(t * 2.2);
      const yPrice = yb + (hash(step) - 0.5) * 64;
      const yWave = yb + Math.sin((x / W) * TAU * 29 + t * 1.4) * 22
        + Math.sin((x / W) * TAU * 61 + t * 2.3) * 8;
      const y = yb * wu + yPrice * ws + yWave * wm;
      if (ws > 0.4) stockPts.push([x, y]);
      if (x > 0) {
        c.beginPath(); c.moveTo(px, py); c.lineTo(x, y);
        if (wu > 0.02) { c.strokeStyle = `rgba(127,180,255,${(0.16 * wu).toFixed(3)})`; c.lineWidth = 1.2; c.stroke(); }
        if (ws > 0.02) { c.strokeStyle = `rgba(255,180,84,${(0.6 * ws).toFixed(3)})`; c.lineWidth = 2; c.stroke(); }
        if (wm > 0.02) {
          c.strokeStyle = `rgba(240,224,176,${(0.8 * wm).toFixed(3)})`; c.lineWidth = 2.6;
          c.shadowColor = `rgba(240,224,176,${(0.6 * wm).toFixed(3)})`; c.shadowBlur = 7;
          c.stroke(); c.shadowBlur = 0;
        }
      }
      // in the universe the thread is a constellation: stars strung on it
      if (wu > 0.35 && x % 64 === 0) {
        c.globalAlpha = wu * (0.5 + 0.5 * Math.sin(t * 1.1 + x));
        c.fillStyle = '#d8e2f2';
        c.beginPath(); c.arc(x, yb, 1.8, 0, TAU); c.fill();
        c.globalAlpha = 1;
      }
      px = x; py = y;
    }
    // the price line holds an area against the index, like the app's chart
    if (stockPts.length > 2) {
      c.beginPath();
      c.moveTo(stockPts[0][0], stockPts[0][1]);
      for (const [x, y] of stockPts) c.lineTo(x, y);
      c.lineTo(stockPts[stockPts.length - 1][0], stockPts[stockPts.length - 1][1] + 90);
      c.lineTo(stockPts[0][0], stockPts[0][1] + 90);
      c.closePath();
      c.fillStyle = 'rgba(255,180,84,0.07)';
      c.fill();
    }
    // the choir: four voices born at the sun, one voice becoming many as
    // they travel from it
    const voiceY = (x, off, amp) => {
      const e2 = vEnv(x);
      return yBase(x, t) + off * e2
        + (Math.sin((x / W) * TAU * 23 + t * 1.1 + off) * amp
          + Math.sin((x / W) * TAU * 47 + t * 1.9) * amp * 0.4) * (0.3 + 0.7 * e2);
    };
    for (const [off, amp, alpha] of VOICES) {
      c.beginPath();
      let first = true;
      for (let x = 2 * S - F; x <= W; x += 10) {
        if (wMusic(x) < 0.03) continue;
        const y = voiceY(x, off, amp);
        first ? c.moveTo(x, y) : c.lineTo(x, y);
        first = false;
      }
      c.strokeStyle = `rgba(226,206,164,${alpha})`;
      c.lineWidth = 1.3;
      c.stroke();
    }
    // notes riding the voices, small lights carried along the lines
    for (const n of notes) {
      n.x -= n.sp / 30;
      if (n.x < 2 * S - F * 0.5) { n.x = W - 4; n.v = (Math.random() * 4) | 0; }
      const [off, amp] = VOICES[n.v];
      const a = wMusic(n.x) * (0.30 + 0.28 * Math.sin(t * 2.6 + n.ph));
      if (a < 0.02) continue;
      const y = voiceY(n.x, off, amp);
      c.fillStyle = `rgba(250,224,164,${a.toFixed(3)})`;
      c.beginPath(); c.arc(n.x, y, 2.1, 0, TAU); c.fill();
      c.fillStyle = `rgba(250,224,164,${(a * 0.3).toFixed(3)})`;
      c.beginPath(); c.arc(n.x, y, 4.6, 0, TAU); c.fill();
    }
    // flying notes: they lift off the voice lines, tumble gently, and fade
    for (const fn2 of flying) {
      fn2.life += 1 / 30;
      if (fn2.life < 0) continue;
      if (fn2.life >= fn2.max) {
        const [off, amp] = VOICES[(Math.random() * 4) | 0];
        fn2.x = 2 * S + 60 + Math.random() * (S - 120);
        fn2.y = voiceY(fn2.x, off, amp);
        fn2.vx = 8 + Math.random() * 16;
        fn2.vy = -(14 + Math.random() * 14);
        fn2.rot = (Math.random() - 0.5) * 0.6;
        fn2.vr = (Math.random() - 0.5) * 0.8;
        fn2.size = 17 + Math.random() * 11;
        fn2.glyph = GLYPHS[(Math.random() * 4) | 0];
        fn2.max = 5 + Math.random() * 3;
        fn2.life = 0;
      }
      fn2.x += fn2.vx / 30;
      fn2.y += fn2.vy / 30;
      fn2.rot += fn2.vr / 30;
      const p = fn2.life / fn2.max;
      const a = wMusic(fn2.x) * Math.sin(p * Math.PI) * 0.55;
      if (a < 0.02) continue;
      c.save();
      c.translate(fn2.x + Math.sin(t * 1.1 + fn2.ph) * 7, fn2.y);
      c.rotate(fn2.rot);
      c.font = `${fn2.size.toFixed(0)}px "Times New Roman", serif`;
      c.fillStyle = `rgba(240,210,150,${a.toFixed(3)})`;
      c.shadowColor = `rgba(240,210,150,${(a * 0.6).toFixed(3)})`;
      c.shadowBlur = 6;
      c.fillText(fn2.glyph, 0, 0);
      c.restore();
    }

    // high voices glow across the top of the world, the same light as the
    // lead below, each with its own melody
    for (const [offY, alpha2, wdt, fq, fq2, sp2] of [
      [H * 0.17, 0.55, 2.2, 13, 37, 1.2],
      [H * 0.24, 0.42, 1.9, 9, 29, 0.8],
      [H * 0.31, 0.30, 1.5, 17, 43, 1.6],
    ]) {
      c.beginPath();
      let first = true;
      for (let x = 2 * S - F; x <= W; x += 9) {
        if (wMusic(x) < 0.03) continue;
        const y = offY + Math.sin((x / W) * TAU * fq + t * sp2) * 16
          + Math.sin((x / W) * TAU * fq2 + t * (sp2 + 0.7)) * 6;
        first ? c.moveTo(x, y) : c.lineTo(x, y);
        first = false;
      }
      // a sepia under-stroke keeps the light legible on the pale ground
      c.strokeStyle = `rgba(96,66,30,${(alpha2 * 0.6).toFixed(2)})`;
      c.lineWidth = wdt + 2.6;
      c.stroke();
      c.strokeStyle = `rgba(255,244,214,${alpha2})`;
      c.lineWidth = wdt;
      c.shadowColor = `rgba(232,178,90,${(alpha2 * 0.9).toFixed(2)})`;
      c.shadowBlur = 7;
      c.stroke();
      c.shadowBlur = 0;
    }

    // ---- easter eggs: one small tribute from each work of the music world.
    // A Soul's Journey already owns the sun; the other five hide here.
    // sometimes in the world: a kaleidoscope turning slowly in the air,
    // spoken in the slice's own light: glowing cream over a sepia
    // undertone, groove rings at its heart, and eighth notes riding the
    // petal tips like a carousel
    {
      const kx = 2 * S + 120, ky = 330, a = wMusic(kx) * 0.8;
      if (a > 0.02) {
        c.save(); c.translate(kx, ky); c.rotate(t * 0.12);
        for (let k = 0; k < 8; k++) {              // luminous petals
          c.rotate(TAU / 8);
          c.shadowBlur = 0;
          c.strokeStyle = `rgba(96,66,30,${(a * 0.55).toFixed(3)})`;
          c.lineWidth = 3.8;
          c.beginPath(); c.moveTo(0, 10); c.quadraticCurveTo(18, 28, 0, 60);
          c.quadraticCurveTo(-18, 28, 0, 10); c.stroke();
          c.shadowColor = `rgba(232,178,90,${(a * 0.85).toFixed(3)})`;
          c.shadowBlur = 7;
          c.strokeStyle = `rgba(255,244,214,${a.toFixed(3)})`;
          c.lineWidth = 1.8;
          c.beginPath(); c.moveTo(0, 10); c.quadraticCurveTo(18, 28, 0, 60);
          c.quadraticCurveTo(-18, 28, 0, 10); c.stroke();
          // an eighth note at the petal tip, glowing along for the ride
          c.fillStyle = `rgba(255,244,214,${(a * 0.95).toFixed(3)})`;
          c.font = '14px "Times New Roman", serif';
          c.fillText('♪', -4, 76);
        }
        // groove rings at the heart, like the record the room spins on
        c.shadowBlur = 5;
        c.strokeStyle = `rgba(255,244,214,${(a * 0.6).toFixed(3)})`;
        c.lineWidth = 1.2;
        for (const r2 of [14, 24, 34]) { c.beginPath(); c.arc(0, 0, r2, 0, TAU); c.stroke(); }
        c.lineWidth = 1;
        c.strokeStyle = `rgba(255,244,214,${(a * 0.45).toFixed(3)})`;
        c.beginPath(); c.arc(0, 0, 66, 0, TAU); c.stroke();
        c.fillStyle = `rgba(255,232,168,${a.toFixed(3)})`;
        c.beginPath(); c.arc(0, 0, 3.4, 0, TAU); c.fill();
        c.shadowBlur = 0;
        c.restore();
      }
    }
    // time to fly: a little ship crosses the sky, engine burning bright
    {
      const span = S + 160;
      const p = ((t * span / 26) % span) - 80;
      const fx = 2 * S + p;
      const climb = Math.sin(t * 0.8);
      const fy = 118 + climb * 14 + Math.sin(p * 0.02) * 8;
      const a = wMusic(fx) * 0.85;
      if (a > 0.02) {
        c.save(); c.translate(fx, fy); c.rotate(-climb * 0.12);
        // twin engines first: two flickering flames and their fading puffs
        const fl = 0.7 + 0.3 * Math.sin(t * 11);
        const fl2 = 0.7 + 0.3 * Math.sin(t * 11 + 2.1);
        for (const [ey2, fk] of [[-2.6, fl], [2.6, fl2]]) {
          c.fillStyle = `rgba(255,196,110,${(a * 0.7).toFixed(3)})`;
          c.beginPath();
          c.moveTo(-17, ey2 - 1.7); c.lineTo(-17 - 12 * fk, ey2); c.lineTo(-17, ey2 + 1.7);
          c.closePath(); c.fill();
          c.fillStyle = `rgba(255,244,208,${(a * 0.85).toFixed(3)})`;
          c.beginPath();
          c.moveTo(-17, ey2 - 0.8); c.lineTo(-17 - 6.5 * fk, ey2); c.lineTo(-17, ey2 + 0.8);
          c.closePath(); c.fill();
        }
        for (let k = 1; k <= 4; k++) {
          c.fillStyle = `rgba(255,236,200,${(a * 0.2 / k).toFixed(3)})`;
          c.beginPath();
          c.arc(-24 - k * 12 - fl * 4, Math.sin(t * 3 + k) * 2.6, 2.4 + k * 0.9, 0, TAU);
          c.fill();
        }
        // the hull: nose cone, plated body, twin nozzles, swept fins
        c.fillStyle = `rgba(52,48,56,${a.toFixed(3)})`;
        c.beginPath();
        c.moveTo(23, 0);                             // nose
        c.quadraticCurveTo(14, -5.2, 0, -5.4);
        c.lineTo(-14, -4);
        c.quadraticCurveTo(-17.5, 0, -14, 4);
        c.lineTo(0, 5.4);
        c.quadraticCurveTo(14, 5.2, 23, 0);
        c.closePath(); c.fill();
        c.beginPath();                               // dorsal fin
        c.moveTo(-7, -4.7); c.lineTo(-17, -12.5); c.lineTo(-11.5, -4);
        c.closePath(); c.fill();
        c.beginPath();                               // ventral fin
        c.moveTo(-7, 4.7); c.lineTo(-17, 12.5); c.lineTo(-11.5, 4);
        c.closePath(); c.fill();
        c.fillStyle = `rgba(74,70,80,${a.toFixed(3)})`;   // the nozzles
        c.fillRect(-18.5, -4, 3, 2.8);
        c.fillRect(-18.5, 1.2, 3, 2.8);
        // plating lines along the hull
        c.strokeStyle = `rgba(126,122,134,${(a * 0.55).toFixed(3)})`;
        c.lineWidth = 0.9;
        c.beginPath(); c.moveTo(14, -2.4); c.lineTo(-12, -2); c.stroke();
        c.beginPath(); c.moveTo(14, 2.4); c.lineTo(-12, 2); c.stroke();
        c.beginPath(); c.moveTo(4, -5); c.lineTo(4, 5); c.stroke();
        // sunlight rims the upper hull
        c.strokeStyle = `rgba(255,244,214,${(a * 0.5).toFixed(3)})`;
        c.lineWidth = 1.1;
        c.beginPath();
        c.moveTo(21, -1); c.quadraticCurveTo(13, -5, 0, -5.2);
        c.stroke();
        // the canopy: a teardrop of warm glass
        c.fillStyle = `rgba(255,240,198,${a.toFixed(3)})`;
        c.beginPath();
        c.moveTo(13, -1.4);
        c.quadraticCurveTo(9, -3.6, 4.5, -2.6);
        c.quadraticCurveTo(9, -0.6, 13, -1.4);
        c.closePath(); c.fill();
        // antenna with its little light
        c.strokeStyle = `rgba(126,122,134,${a.toFixed(3)})`;
        c.lineWidth = 0.9;
        c.beginPath(); c.moveTo(-2, -5.2); c.lineTo(-4, -9.5); c.stroke();
        c.fillStyle = `rgba(255,180,84,${(a * (0.5 + 0.5 * Math.sin(t * 4))).toFixed(3)})`;
        c.beginPath(); c.arc(-4, -10.3, 1.1, 0, TAU); c.fill();
        // fin-tip beacons
        c.fillStyle = `rgba(255,244,214,${(a * 0.9).toFixed(3)})`;
        c.beginPath(); c.arc(-16.4, -12, 0.9, 0, TAU); c.fill();
        c.beginPath(); c.arc(-16.4, 12, 0.9, 0, TAU); c.fill();
        c.restore();
      }
    }
    // dust of light adrift in the morning of the world
    for (let i = 0; i < 14; i++) {
      const mx = 2 * S + ((i * 97 + t * (6 + (i % 4) * 2.4)) % S);
      const my = 60 + ((i * 53) % (H * 0.33)) + Math.sin(t * 0.7 + i) * 6;
      const a = wMusic(mx) * (0.12 + 0.12 * Math.sin(t * 1.9 + i * 1.3));
      if (a < 0.02) continue;
      c.fillStyle = `rgba(255,248,230,${a.toFixed(3)})`;
      c.beginPath(); c.arc(mx, my, 1.3, 0, TAU); c.fill();
    }

    // the sun lays a glitter path on the water
    const SEAY = H * 0.615;
    for (let k = 0; k < 24; k++) {
      const y = SEAY + 5 + k * ((H - 34 - SEAY) / 24);
      const jx = (hash(k * 3.7 + Math.floor(t * 1.6)) - 0.5) * (12 + k * 2.6);
      const len = 6 + hash(k * 9.1 + Math.floor(t * 2.2)) * 12;
      const a = wMusic(SUNX) * (0.10 + 0.24 * hash(k + Math.floor(t * 3))) * (1 - k / 30);
      if (a < 0.02) continue;
      c.strokeStyle = `rgba(248,206,120,${a.toFixed(3)})`;
      c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(SUNX + jx - len / 2, y); c.lineTo(SUNX + jx + len / 2, y); c.stroke();
    }
    // ten singers stand on the horizon, the way the film frames them,
    // each voice glowing in its own time
    for (let i = 0; i < 10; i++) {
      const x = SUNX - 207 + i * 46;
      const a = wMusic(x) * (0.40 + 0.30 * Math.sin(t * 1.3 + i * 1.7));
      if (a < 0.02) continue;
      c.strokeStyle = `rgba(244,213,154,${a.toFixed(3)})`;
      c.lineWidth = 1.8;
      c.beginPath(); c.moveTo(x, SEAY - 1); c.lineTo(x, SEAY - 16); c.stroke();
      c.fillStyle = `rgba(250,224,164,${a.toFixed(3)})`;
      c.beginPath(); c.arc(x, SEAY - 20, 2.4, 0, TAU); c.fill();
      c.strokeStyle = `rgba(244,213,154,${(a * 0.35).toFixed(3)})`;
      c.beginPath(); c.moveTo(x, SEAY + 3); c.lineTo(x, SEAY + 13); c.stroke();
    }
    // and beneath everything, the signal itself: a spectrogram in the deep
    for (let ci = 0; ci < 34; ci++) {
      const x = 2 * S + 30 + ci * ((S - 60) / 34);
      if (Math.abs(x - SUNX) < 70) continue;
      const bh = (0.15 + 0.85 * Math.abs(Math.sin(ci * 0.7 + t * 1.1)) * hash(ci * 5.3)) * 40;
      const a = wMusic(x) * 0.14;
      c.fillStyle = `rgba(233,190,120,${a.toFixed(3)})`;
      c.fillRect(x, H - 14 - bh, 8, bh);
    }

    // the seams: a soft lit meridian where one world hands off to the next
    for (const sx of [0, S, 2 * S]) {
      const g = c.createLinearGradient(sx - 20, 0, sx + 20, 0);
      g.addColorStop(0, 'rgba(174,182,198,0)');
      g.addColorStop(0.5, 'rgba(174,182,198,0.12)');
      g.addColorStop(1, 'rgba(174,182,198,0)');
      c.fillStyle = g;
      c.fillRect(sx - 20, 0, 40, H);
      if (sx === 0) c.fillRect(W - 20, 0, 20, H);
    }
  }
  paint(0);

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  // ---- the scene -------------------------------------------------------------
  const Z0 = 3.55;
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  cam.position.set(0, 0, Z0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const key = new THREE.DirectionalLight(0xf5eede, 1.0);
  key.position.set(-2.2, 1.6, 2.6);
  scene.add(key);

  // the planet and everything that belongs to it ride one anchor, which is
  // kept aligned with the layout slot (.landing-planet) every frame
  const anchor = new THREE.Group();
  scene.add(anchor);

  const planet = new THREE.Group();
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(1, 96, 64),
    // the worlds glow from within; the key light only adds the roundness
    new THREE.MeshLambertMaterial({ map: tex,
      emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.55 })
  );
  planet.add(globe);

  // hover highlights: one translucent shell segment per world
  const highlights = WORLDS.map((w, i) => {
    const seg = new THREE.Mesh(
      new THREE.SphereGeometry(1.012, 48, 32, i * TAU / 3, TAU / 3),
      new THREE.MeshBasicMaterial({ color: w.color, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false })
    );
    planet.add(seg);
    return seg;
  });

  // ---- the caption, written into the world: an orbit label curving under
  // the planet. The DOM caption stays for screen readers; this is its body.
  const capCv = document.createElement('canvas');
  capCv.width = 1536; capCv.height = 72;
  const capCtx = capCv.getContext('2d');
  const capTex = new THREE.CanvasTexture(capCv);
  capTex.colorSpace = THREE.SRGBColorSpace;
  const setArcText = (text, color) => {
    capCtx.clearRect(0, 0, 1536, 72);
    capCtx.font = `600 ${CAPPX}px Menlo, monospace`;
    const chars = [...text];
    const gap = CAPGAP;
    let total = 0;
    for (const ch of chars) total += capCtx.measureText(ch).width + gap;
    const x0 = (1536 - total) / 2;
    // a dark halo first, so the words hold against the starfield
    capCtx.shadowColor = 'rgba(4,6,11,0.95)';
    capCtx.shadowBlur = 8;
    capCtx.fillStyle = 'rgba(4,6,11,0.9)';
    let x = x0;
    for (const ch of chars) { capCtx.fillText(ch, x, 46); x += capCtx.measureText(ch).width + gap; }
    // then the light itself
    capCtx.shadowColor = color;
    capCtx.shadowBlur = 9;
    capCtx.fillStyle = color;
    x = x0;
    for (const ch of chars) { capCtx.fillText(ch, x, 46); x += capCtx.measureText(ch).width + gap; }
    capTex.needsUpdate = true;
  };
  const CAP_REST = '#ccd7e8';
  const capColors = ['#7fb4ff', '#ffb454', '#d9a96a'];
  setArcText(restCaption, CAP_REST);
  const ARC = 1.9;
  const capArc = new THREE.Mesh(
    new THREE.CylinderGeometry(R_CAP, R_CAP, 0.13 * CAPS, 64, 1, true, -ARC / 2, ARC),
    new THREE.MeshBasicMaterial({ map: capTex, transparent: true,
      opacity: reduced ? 1 : 0, depthWrite: false })
  );
  // the label arches over the top of the planet, not under it
  capArc.position.y = 0.84;
  capArc.rotation.x = -0.14;
  anchor.add(capArc);
  // ---- the caption, letter by letter: every text the arc speaks often is
  // a set of real letter bodies. Whichever set is showing runs a slow
  // cycle: after a hold its letters leave one at a time and float the
  // whole visible way down toward the planet, drifting like leaves, until
  // a tilted ring catches them; they ride the orbit a long while, then
  // climb home one by one. A set only advances while its text is showing,
  // so leaving a world mid-fall pauses its cascade right where it stands
  // until the pointer returns. Rare texts still use the baked arc.
  const LETTER_SETS = [];
  const setByText = new Map();
  // each text owns its own ring: radius, tilt, and carry, so when several
  // sentences are aloft at once they weave an armillary around the planet
  const ORBITS = [
    { r: 1.7, tilt: [-0.35, 0, -0.22], sp: 0.2 },
    { r: 1.88, tilt: [-0.28, 0, 0.33], sp: -0.15 },
    { r: 1.5, tilt: [0.55, 0, 0.12], sp: 0.3 },
    { r: 1.74, tilt: [0.08, 0, -0.5], sp: -0.24 },
  ];
  // the larger phone planet leaves less sky: tuck the rings in so the
  // orbiting letters stay on screen
  if (NARROW0) ORBITS.forEach((o) => { o.r = Math.max(1.14, o.r * 0.7); });
  const mkLetterSet = (text, color, hold, orbit) => {
    const meas = document.createElement('canvas').getContext('2d');
    meas.font = `600 ${CAPPX}px Menlo, monospace`;
    const chars = [...text];
    const gap = CAPGAP;
    let total = 0;
    for (const ch of chars) total += meas.measureText(ch).width + gap;
    let lx = (1536 - total) / 2;
    const UPX = (R_CAP * ARC) / 1536;            // world units per canvas px
    const LT = 2;                                // letter supersample
    const set = { letters: [], clock: 0, away: 0, faded: true, hold, n: 0,
      orbR: orbit.r, sp: orbit.sp,
      qOrb: new THREE.Quaternion().setFromEuler(new THREE.Euler(...orbit.tilt)) };
    set.qInv = set.qOrb.clone().invert();
    for (const ch of chars) {
      const cw = meas.measureText(ch).width;
      const cx = lx + cw / 2;
      lx += cw + gap;
      if (ch === ' ') continue;
      const pad = 10;
      // the letter is a slab, not a sheet: the glowing face and the crisp
      // unlit body share one atlas (face on top, body below), and all four
      // layers live in ONE mesh, shaded by vertex color: a single draw
      // call per letter, so a sky full of them stays cheap
      const w2 = Math.ceil((cw + pad * 2) * LT), h2 = 72 * LT;
      const lcv = document.createElement('canvas');
      lcv.width = w2; lcv.height = h2 * 2;
      const lg = lcv.getContext('2d');
      lg.font = `600 ${CAPPX * LT}px Menlo, monospace`;
      lg.shadowColor = 'rgba(4,6,11,0.95)'; lg.shadowBlur = 8 * LT;
      lg.fillStyle = 'rgba(4,6,11,0.9)';
      lg.fillText(ch, pad * LT, 46 * LT);
      lg.shadowColor = color; lg.shadowBlur = 7 * LT;
      lg.fillStyle = color;
      lg.fillText(ch, pad * LT, 46 * LT);
      lg.shadowColor = 'rgba(0,0,0,0)'; lg.shadowBlur = 0;
      lg.fillText(ch, pad * LT, 46 * LT + h2);
      const ltex = new THREE.CanvasTexture(lcv);
      ltex.colorSpace = THREE.SRGBColorSpace;
      ltex.anisotropy = 4;
      const gw = (cw + pad * 2) * UPX, gh = 0.13 * CAPS;
      const geo = new THREE.BufferGeometry();
      const P = [], U = [], C = [], I = [];
      // built back to front so the layers blend correctly face-on
      [[-0.009 * CAPS, 0.3], [-0.003 * CAPS, 0.4], [0.003 * CAPS, 0.52], [0.009 * CAPS, 1]].forEach(([z, s], li) => {
        const face = li === 3;
        const v0 = face ? 0.5 : 0, v1 = face ? 1 : 0.5;
        const o = li * 4;
        P.push(-gw / 2, -gh / 2, z, gw / 2, -gh / 2, z, gw / 2, gh / 2, z, -gw / 2, gh / 2, z);
        U.push(0, v0, 1, v0, 1, v1, 0, v1);
        for (let k = 0; k < 4; k++) C.push(s, s, s);
        I.push(o, o + 1, o + 2, o, o + 2, o + 3);
      });
      geo.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(C, 3));
      geo.setIndex(I);
      const mat = new THREE.MeshBasicMaterial({ map: ltex, vertexColors: true,
        transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;                      // faded letters cost nothing
      anchor.add(mesh);
      set.letters.push({ mesh, mat,
        theta: (cx / 1536 - 0.5) * ARC,          // its home angle on the arc
        ph: Math.random() * TAU,                 // its own drift rhythm
        wsp: 0.4 + Math.random() * 0.5,          // its own turn while riding
        axis: new THREE.Vector3(), state: 0, f: 0, vis: 0, age: 0,
        dur: 1, swirl: 0, tumble: 0, dPrev: null,
        j: set.n++ });
    }
    LETTER_SETS.push(set);
    setByText.set(text, set);
    return set;
  };
  let activeSet = null;
  if (!reduced) {
    activeSet = mkLetterSet(restCaption, CAP_REST, 6, ORBITS[0]);
    WORLDS.forEach((w, i) => mkLetterSet(w.name + ' · ENTER', capColors[i], 1.2, ORBITS[i + 1]));
  }
  // one voice for both bodies: the DOM caption (screen readers) and the
  // scene. Texts with a letter set show as letters; the rest bake the arc.
  const announce = (text, color) => {
    caption.textContent = text;
    activeSet = setByText.get(text) || null;
    if (!activeSet) setArcText(text, color);
  };
  // the shape of every cascade, and each flight's own character: no two
  // letters take the same line into the well
  const LSTAG = 0.5, LDUR = 4.5, LORBIT = 16;
  const launch = (L) => {
    L.f = 0;
    L.age = 0;
    L.dur = LDUR * (0.75 + Math.random() * 0.6);
    L.swirl = (Math.random() - 0.5) * 2.6;
    L.tumble = (Math.random() - 0.5) * 7;
    L.dPrev = null;                              // spiral angle, unwrapped in flight
    L.axis.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
    if (L.axis.lengthSq() < 1e-4) L.axis.set(0, 0, 1);   // never a NaN axis
    L.axis.normalize();
  };
  const _eu = new THREE.Euler();
  const _qFrame = new THREE.Quaternion(), _qHome = new THREE.Quaternion(), _qOrb = new THREE.Quaternion(), _qWob = new THREE.Quaternion();
  const _vHome = new THREE.Vector3(), _vh2 = new THREE.Vector3();

  planet.rotation.z = -0.12;                    // a little tilt, like everything real
  anchor.add(planet);

  // ---- the deep sky: the solar neighborhood's brilliance ---------------------
  const sky = new THREE.Group();                // parallaxes gently against the pointer
  scene.add(sky);

  // a soft dot for the faint field
  const glowTex = (draw) => {
    const rc = document.createElement('canvas'); rc.width = rc.height = 128;
    draw(rc.getContext('2d'));
    return new THREE.CanvasTexture(rc);
  };
  // a crisp point: hard core, fast falloff, no haze
  const dotTex = glowTex((g) => {
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(245,249,255,0.9)');
    grad.addColorStop(0.5, 'rgba(228,238,252,0.16)');
    grad.addColorStop(1, 'rgba(228,238,252,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
  });
  // a brilliant star: bright hard core, tight halo, four thin flares
  const brilliantTex = glowTex((g) => {
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.12, 'rgba(248,251,255,0.95)');
    grad.addColorStop(0.24, 'rgba(224,235,252,0.30)');
    grad.addColorStop(0.45, 'rgba(214,228,250,0.06)');
    grad.addColorStop(1, 'rgba(214,228,250,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
    const flare = (wdt, len) => {
      g.save(); g.translate(64, 64);
      const lg = g.createLinearGradient(-len, 0, len, 0);
      lg.addColorStop(0, 'rgba(230,240,255,0)');
      lg.addColorStop(0.5, 'rgba(230,240,255,0.7)');
      lg.addColorStop(1, 'rgba(230,240,255,0)');
      g.fillStyle = lg;
      g.fillRect(-len, -wdt / 2, len * 2, wdt);
      g.restore();
    };
    flare(1.6, 62);
    g.save(); g.translate(64, 64); g.rotate(Math.PI / 2); g.translate(-64, -64);
    flare(1.6, 62);
    g.restore();
  });

  // every star carries its own phase and rate, so the whole sky shimmers
  // star by star instead of breathing as one sheet
  const starMats = [];
  const mkCloud = (n, sizeA, sizeB, opacity, spread, map, rateA, rateB) => {
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
    const asize = new Float32Array(n), aph = new Float32Array(n), arate = new Float32Array(n);
    const tint = new THREE.Color();
    for (let i = 0; i < n; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(spread + Math.random() * 7);
      v.z = -Math.abs(v.z) - 2.5;               // keep the sky behind the planet
      pos.set([v.x, v.y, v.z], i * 3);
      // stellar classes, the way the neighborhood really runs: blue-white
      // giants through white and gold down to orange and red
      const cls = Math.random();
      if (cls < 0.15) tint.set(0xaac6ff);
      else if (cls < 0.45) tint.set(0xe9eefc);
      else if (cls < 0.70) tint.set(0xfff0da);
      else if (cls < 0.85) tint.set(0xffd9a0);
      else if (cls < 0.95) tint.set(0xffb27a);
      else tint.set(0xff8f7a);
      col.set([tint.r, tint.g, tint.b], i * 3);
      asize[i] = sizeA + Math.random() * (sizeB - sizeA);
      aph[i] = Math.random() * TAU;
      arate[i] = rateA + Math.random() * (rateB - rateA);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(asize, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(aph, 1));
    geo.setAttribute('aRate', new THREE.BufferAttribute(arate, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uScale: { value: 1 }, uMap: { value: map }, uOp: { value: opacity } },
      vertexShader: `attribute vec3 aColor; attribute float aSize, aPhase, aRate;
        uniform float uTime, uScale;
        varying vec3 vColor; varying float vTw;
        void main() {
          vColor = aColor;
          vTw = 0.68 + 0.32 * sin(uTime * aRate + aPhase);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uScale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `uniform sampler2D uMap; uniform float uOp;
        varying vec3 vColor; varying float vTw;
        void main() {
          vec4 s = texture2D(uMap, gl_PointCoord);
          gl_FragColor = vec4(vColor * s.rgb, s.a * vTw * uOp);
        }`,
    });
    sky.add(new THREE.Points(geo, mat));
    starMats.push(mat);
  };
  mkCloud(1100, 0.022, 0.05, 1.0, 6, dotTex, 0.5, 1.8);     // the deep field, pin-sharp
  mkCloud(700, 0.045, 0.085, 0.85, 8, dotTex, 0.4, 1.4);
  mkCloud(130, 0.13, 0.30, 1.0, 7, brilliantTex, 0.3, 1.0); // the brilliant neighborhood
  mkCloud(34, 0.30, 0.50, 0.95, 10, brilliantTex, 0.25, 0.7);

  // no clouds, no washes: the backdrop is stars alone, and they shimmer

  // a small pool of shooting stars
  const shots = [];
  for (let i = 0; i < 2; i++) {
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const mat = new THREE.LineBasicMaterial({ color: 0xeaf1ff, transparent: true, opacity: 0 });
    const line = new THREE.Line(geo, mat);
    sky.add(line);
    shots.push({ line, on: false, life: 0, x: 0, y: 0, vx: 0, vy: 0, cd: 3 + Math.random() * 6 });
  }

  // ---- mount: a fixed full-page canvas behind the content --------------------
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const el = renderer.domElement;
  el.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;display:block;touch-action:pan-y;opacity:0;transition:opacity 1.1s ease-out';
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', 'A spinning planet made of three worlds floating in space. Drag to rotate, click a world to enter it. The worlds are also linked in the navigation.');
  el.tabIndex = 0;
  document.body.insertBefore(el, document.body.firstChild);
  document.body.classList.add('world-on');
  document.documentElement.classList.remove('pre3d');   // the world is here
  svg.style.display = 'none';
  svg.setAttribute('aria-hidden', 'true');

  const size = () => {
    // guard against a zero-sized viewport (hidden or backgrounded tab at load)
    const w = Math.max(2, innerWidth), h = Math.max(2, innerHeight);
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    const px = h * renderer.getPixelRatio();
    for (const m of starMats) m.uniforms.uScale.value = px * 0.5 / Math.tan(cam.fov * Math.PI / 360);
  };
  size();
  addEventListener('resize', size);

  // keep the planet aligned with its layout slot, in world units
  const visH = () => 2 * Math.tan(cam.fov * Math.PI / 360) * Z0;
  let slotScale = 1, baseX = 0, baseY = 0;
  const alignToSlot = () => {
    const r = host.getBoundingClientRect();
    const vh = visH(), vw = vh * cam.aspect;
    const cx = (r.left + r.width / 2) / innerWidth - 0.5;
    const cy = 0.5 - (r.top + r.width / 2) / innerHeight;   // the slot is square
    baseX = cx * vw;
    baseY = cy * vh;
    slotScale = Math.max(0.2, (r.width / innerWidth) * vw / 2.45);
    layoutBeacons();
  };

  // the page's accent light, borrowed for the mini planet's hover caption
  const ACC = (getComputedStyle(document.documentElement).getPropertyValue('--acc') || '#a9c2ff').trim();
  // ---- the way in: not a button but a world of its own, in miniature ---------
  // A tiny ringed planet floats where a button would have stood. Click it to
  // enter the worlds. It carries as much life as its size will hold: banded
  // storms with turbulent edges, oval tempests, a grained ring system with a
  // clean gap, three moonlets running tilted orbits.
  // small orbit labels: a light U bend baked flat into a billboard, so
  // they always face the camera dead-on and sit perfectly centered under
  // their bodies. Same light as the caption over the planet.
  const mkCurvedLabel = (text) => {
    const acv = document.createElement('canvas');
    acv.width = 512; acv.height = 128;
    const ag = acv.getContext('2d');
    ag.font = '600 26px Menlo, monospace';
    const chars = [...text];
    const gap = 7;
    const widths = chars.map((ch) => ag.measureText(ch).width);
    const total = widths.reduce((s2, w2) => s2 + w2 + gap, -gap);
    const R = 560;
    const span = total / R;
    const cy2 = 94 - R;                            // circle center far above
    for (const [fill, glow, blur] of [
      ['rgba(4,6,11,0.9)', 'rgba(4,6,11,0.95)', 8],
      [CAP_REST, CAP_REST, 9],
    ]) {
      ag.fillStyle = fill;
      ag.shadowColor = glow;
      ag.shadowBlur = blur;
      let a = -span / 2;
      for (let i2 = 0; i2 < chars.length; i2++) {
        const aMid = a + (widths[i2] / 2) / R;
        const x = 256 + Math.sin(aMid) * R;
        const y = cy2 + Math.cos(aMid) * R;
        ag.save();
        ag.translate(x, y);
        ag.rotate(-aMid);
        ag.fillText(chars[i2], -widths[i2] / 2, 0);
        ag.restore();
        a += (widths[i2] + gap) / R;
      }
    }
    const atex = new THREE.CanvasTexture(acv);
    atex.colorSpace = THREE.SRGBColorSpace;
    atex.anisotropy = 8;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: atex, transparent: true, depthWrite: false }));
    sp.scale.set(5.6, 1.4, 1);
    return sp;
  };

  const miniG = new THREE.Group();
  miniG.position.z = 0.3;
  scene.add(miniG);
  let miniBase = 0.15, miniSpin, miniHit, worldsArc, hoverMini = false, miniFocus = false, miniHoverT = 0;
  const miniMoons = [];
  {
    // the little world IS the big one: it shares the parent planet's living
    // texture outright, so every detail (the rain of numbers, the thread,
    // the singers) plays again in miniature at zero extra upload cost
    miniSpin = new THREE.Mesh(
      new THREE.SphereGeometry(1, 48, 32),
      new THREE.MeshLambertMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.62 })
    );
    miniSpin.rotation.z = 0.18;
    miniG.add(miniSpin);
    // three moonlets on close, tilted orbits
    // moons in the page's own light: starlight, amber, periwinkle
    const moonCols = [0xd8e2f2, 0xffd9a0, 0xa9c2ff];
    for (let i = 0; i < 3; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.085 - i * 0.015, 12, 8),
        new THREE.MeshBasicMaterial({ color: moonCols[i] })
      );
      miniG.add(m);
      miniMoons.push({ m, r: 1.75 + i * 0.45, sp: (0.6 - i * 0.14) * (i % 2 ? -1 : 1), ph: rr(0, TAU), inc: 0.22 + i * 0.17 });
    }
    // a generous, invisible hit target
    miniHit = new THREE.Mesh(new THREE.SphereGeometry(2.6, 12, 8), new THREE.MeshBasicMaterial({ visible: false }));
    miniG.add(miniHit);
    // its name, a light U bend perfectly beneath it
    worldsArc = mkCurvedLabel('THE WORLDS');
    worldsArc.position.y = -2.1;
    miniG.add(worldsArc);
  }
  // the way into the universe hangs here: not an object but a warp in the
  // sky itself. Click it to enter.
  const aboutStar = new THREE.Group();
  aboutStar.position.z = 0.1;
  scene.add(aboutStar);
  let sunHit, sunStreaks, sunRipples, universeArc;
  {
    // there is no object here at all, only a flaw in the sky: background
    // stars smeared into faint arcs, thin ripples of lensing. The warp
    // barely shows until someone finds it, and its name keeps quiet
    // until then too.
    const wcv = document.createElement('canvas');
    wcv.width = wcv.height = 256;
    const wg = wcv.getContext('2d');
    for (let i = 0; i < 14; i++) {
      const wr = 34 + Math.random() * 84;
      const a0 = Math.random() * TAU, len2 = 0.2 + Math.random() * 0.8;
      wg.strokeStyle = `rgba(238,236,230,${(0.10 + Math.random() * 0.22).toFixed(2)})`;
      wg.lineWidth = 0.8 + Math.random() * 0.9;
      wg.beginPath(); wg.arc(128, 128, wr, a0, a0 + len2); wg.stroke();
    }
    sunStreaks = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(wcv), transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false }));
    sunStreaks.scale.setScalar(3.4);
    aboutStar.add(sunStreaks);
    const rcv2 = document.createElement('canvas');
    rcv2.width = rcv2.height = 256;
    const rg2 = rcv2.getContext('2d');
    for (const [rr2, ra] of [[36, 0.10], [58, 0.08], [82, 0.06], [108, 0.045]]) {
      rg2.strokeStyle = `rgba(238,240,246,${ra})`;
      rg2.lineWidth = 1.1;
      rg2.beginPath(); rg2.arc(128, 128, rr2, 0, TAU); rg2.stroke();
    }
    sunRipples = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(rcv2), transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false }));
    sunRipples.scale.setScalar(3.2);
    sunRipples.position.z = 0.01;
    aboutStar.add(sunRipples);
    sunHit = new THREE.Mesh(new THREE.SphereGeometry(1.9, 8, 6), new THREE.MeshBasicMaterial({ visible: false }));
    aboutStar.add(sunHit);
    // its name, a light U bend, held back until the pointer finds the warp
    universeArc = mkCurvedLabel('THE UNIVERSE');
    universeArc.position.y = -2.1;
    universeArc.material.opacity = 0;
    aboutStar.add(universeArc);
  }
  let starBase = 0.062, hoverStar = false, hoverStarT = 0;
  // one quiet star in the bottom right holds the about panel: barely more
  // than its neighbors, nameless until the pointer finds it
  const aboutG = new THREE.Group();
  aboutG.position.z = 0.1;
  scene.add(aboutG);
  let aboutBase = 0.04, aboutHit, aboutMat, aboutLabel2, hoverAbout = false, hoverAboutT = 0;
  {
    aboutMat = new THREE.SpriteMaterial({
      map: brilliantTex, color: 0xf2f5fc, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false });
    const star = new THREE.Sprite(aboutMat);
    star.scale.setScalar(2.7);
    aboutG.add(star);
    aboutHit = new THREE.Mesh(new THREE.SphereGeometry(1.8, 8, 6), new THREE.MeshBasicMaterial({ visible: false }));
    aboutG.add(aboutHit);
    aboutLabel2 = mkCurvedLabel('ABOUT');
    // the group runs smaller than the other beacons, so the name is scaled
    // up to compensate and reads at full size
    aboutLabel2.scale.set(7.6, 1.9, 1);
    aboutLabel2.position.y = -2.75;
    aboutLabel2.material.opacity = 0;
    aboutG.add(aboutLabel2);
  }
  // keyboard focus on the real link lights the little world
  document.querySelectorAll('.landing-text .ctas a').forEach((a) => {
    a.addEventListener('focus', () => { miniFocus = true; });
    a.addEventListener('blur', () => { miniFocus = false; });
  });
  // place the three beacons (mini planet, warp, about star) from the
  // page's own geometry, so they respect the wrap margins at every width
  const heroEl = document.querySelector('.landing');
  const wrapEl = document.querySelector('.wrap');
  const layoutBeacons = () => {
    const hero = heroEl.getBoundingClientRect();
    const wr = wrapEl.getBoundingClientRect();
    const cl = wr.left + 28;
    const placeStar = (fx, fy) => {
      const k = (Z0 - aboutStar.position.z) / Z0;
      aboutStar.position.x = (fx - 0.5) * visH() * cam.aspect * k;
      aboutStar.position.y = (0.5 - fy) * visH() * k;
      starBase = 0.062 * k;
    };
    const placeMini = (cx2, cy2) => {
      const k = (Z0 - miniG.position.z) / Z0;
      miniG.position.x = ((cx2 / innerWidth) - 0.5) * visH() * cam.aspect * k;
      miniG.position.y = (0.5 - (cy2 / innerHeight)) * visH() * k;
      miniBase = 0.085 * k;
    };
    const placeAbout = (fx, fy) => {
      const k = (Z0 - aboutG.position.z) / Z0;
      aboutG.position.x = (fx - 0.5) * visH() * cam.aspect * k;
      aboutG.position.y = (0.5 - fy) * visH() * k;
      aboutBase = 0.04 * k;
    };
    if (!narrowMq.matches) {
      miniG.visible = true;
      placeMini(cl + 92, hero.top + hero.height * 0.82);
      placeStar(0.84, 0.24);
      placeAbout(0.88, 0.84);
    } else {
      // phones give the whole stage to the one planet: no mini world, just
      // the quiet beacons where they fit
      miniG.visible = false;
      placeStar(0.85, 0.16);
      placeAbout(0.86, 0.93);
    }
  };
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', (e) => {
    ptr.tx = e.clientX / innerWidth - 0.5;
    ptr.ty = e.clientY / innerHeight - 0.5;
  }, { passive: true });

  // ---- interaction -----------------------------------------------------------
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let dragging = false, moved = 0, lastX = 0, lastY = 0;
  // touch has no hover, so a world's name never wakes on a phone; there the
  // first tap arms a world (name, letters, highlight) and the second enters.
  // armedAt guards the gap: one physical tap can echo as a second synthetic
  // event on iOS, so an "enter" tap only counts well after the arming one
  let touchy = matchMedia('(hover: none)').matches, armedWorld = -1, armedAt = 0;
  let velY = 0, rotX = 0, hoverIdx = -1, lastInput = 0;

  const pick = (e) => {
    ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    ray.setFromCamera(ndc, cam);
    // the mini world sits out of the cast when hidden (phones): raycasts
    // ignore visibility, and its idle hit sphere would swallow planet taps
    const hit = ray.intersectObjects(miniG.visible
      ? [miniHit, sunHit, aboutHit, globe] : [sunHit, aboutHit, globe])[0];
    if (!hit) return { world: -1, mini: false, star: false, about: false };
    if (hit.object === globe) return { world: Math.min(2, Math.floor(hit.uv.x * 3)), mini: false, star: false, about: false };
    if (hit.object === sunHit) return { world: -1, mini: false, star: true, about: false };
    if (hit.object === aboutHit) return { world: -1, mini: false, star: false, about: true };
    return { world: -1, mini: true, star: false, about: false };
  };

  el.addEventListener('pointerdown', (e) => {
    dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
    el.setPointerCapture(e.pointerId);
    lastInput = performance.now();
  });
  el.addEventListener('pointermove', (e) => {
    lastInput = performance.now();
    if (dragging) {
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      planet.rotation.y += dx * 0.006;
      rotX = Math.max(-0.6, Math.min(0.6, rotX + dy * 0.004));
      planet.rotation.x = rotX;
      velY = dx * 0.006;
      lastX = e.clientX; lastY = e.clientY;
    } else {
      const p2 = pick(e);
      const idx = p2.world;
      hoverMini = p2.mini;
      hoverStar = p2.star;
      hoverAbout = p2.about;
      hoverIdx = idx;
      const want = p2.mini ? ['ENTER THE WORLDS', ACC]
        : p2.star ? ['ENTER THE UNIVERSE', '#7fb4ff']
        : p2.about ? ['ABOUT DAVIS · OPEN', '#ffd9a0']
        : idx >= 0 ? [WORLDS[idx].name + ' · ENTER', capColors[idx]]
        : [restCaption, CAP_REST];
      if (want[0] !== caption.textContent) {
        announce(want[0], want[1]);
        caption.classList.toggle('lit', want[0] !== restCaption);
      }
      el.style.cursor = (p2.mini || p2.star || p2.about) ? 'pointer' : idx >= 0 ? 'grab' : 'default';
    }
  });
  const release = (e) => {
    if (!dragging) return;
    dragging = false;
    if (moved < 7) {
      const p2 = pick(e);
      if (p2.star) goHref('studies/universe.html');
      else if (p2.about) openAbout();
      else if (p2.mini) goHref('rooms.html');
      else if (p2.world >= 0) {
        if (!touchy) enter(p2.world);
        else if (armedWorld === p2.world) {
          // the echo of the arming tap arrives within a blink; only a
          // deliberate second tap enters
          if (performance.now() - armedAt > 400) enter(p2.world);
        } else {
          armedWorld = p2.world;
          armedAt = performance.now();
          hoverIdx = p2.world;
          announce(WORLDS[p2.world].name + ' · ENTER', capColors[p2.world]);
          caption.classList.add('lit');
        }
      } else if (touchy && armedWorld !== -1) {
        // a tap on empty sky stands the armed world down
        armedWorld = -1;
        hoverIdx = -1;
        announce(restCaption, CAP_REST);
        caption.classList.remove('lit');
      }
    }
  };
  el.addEventListener('pointerup', release);
  el.addEventListener('pointercancel', () => { dragging = false; });
  el.addEventListener('pointerleave', () => {
    // on touch a lifted finger "leaves" after every tap: that is not a
    // mouse wandering off, and the armed world keeps its name up
    if (touchy) return;
    if (hoverIdx !== -1) { hoverIdx = -1; announce(restCaption, CAP_REST); caption.classList.remove('lit'); }
  });
  el.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { planet.rotation.y -= 0.35; lastInput = performance.now(); }
    if (e.key === 'ArrowRight') { planet.rotation.y += 0.35; lastInput = performance.now(); }
    if (e.key === 'Enter') {
      // whichever world faces the camera
      const facing = ((-planet.rotation.y / TAU) % 1 + 1) % 1;
      enter(Math.min(2, Math.floor(((facing + 0.5 / 3) % 1) * 3)));
    }
  });

  // the about panel: the star's interior. The DOM section is reused as a
  // dialog floating over the world.
  const aboutEl = document.querySelector('.about');
  let aboutWired = false;
  function openAbout() {
    if (!aboutEl) return;
    if (!aboutWired) {
      aboutWired = true;
      // the wrap is its own stacking context (z-index 1), which would pin
      // the dialog beneath the body-level backdrop no matter its z-index;
      // the panel moves up to the body so it truly floats over the dim
      document.body.appendChild(aboutEl);
      const bd = document.createElement('div');
      bd.className = 'about-backdrop';
      bd.addEventListener('click', closeAbout);
      document.body.appendChild(bd);
      const x = document.createElement('button');
      x.className = 'about-close';
      x.setAttribute('aria-label', 'Close about');
      x.textContent = '✕';
      x.addEventListener('click', closeAbout);
      aboutEl.appendChild(x);
      addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAbout();
      });
    }
    const d = aboutEl.querySelector('details');
    if (d) d.open = true;
    document.body.classList.add('about-open');
    const x = aboutEl.querySelector('.about-close');
    if (x) x.focus();
  }
  function closeAbout() {
    document.body.classList.remove('about-open');
  }

  let leaving = false, fadeEl = null, diveT = 0;
  function goHref(href) {
    if (leaving) return;
    leaving = true;
    fadeEl = document.createElement('div');
    fadeEl.style.cssText = 'position:fixed;inset:0;background:#05070d;opacity:0;transition:opacity 0.4s ease-in;z-index:99;pointer-events:none';
    document.body.appendChild(fadeEl);
    requestAnimationFrame(() => { fadeEl.style.opacity = '1'; });
    setTimeout(() => { location.href = href; }, 420);
  }
  function enter(idx) {
    if (leaving) return;
    leaving = true;
    diveT = 0;
    announce(WORLDS[idx].name + ' · ENTERING', capColors[idx]);
    fadeEl = document.createElement('div');
    fadeEl.style.cssText = 'position:fixed;inset:0;background:#05070d;opacity:0;transition:opacity 0.45s ease-in;z-index:99;pointer-events:none';
    document.body.appendChild(fadeEl);
    requestAnimationFrame(() => { fadeEl.style.opacity = '1'; });
    const t0 = performance.now();
    const dive = (now) => {
      if (!leaving) return;                       // reset by pageshow
      const t = Math.min(1, (now - t0) / 500);
      diveT = t * t;
      if (t < 1) requestAnimationFrame(dive);
      else location.href = WORLDS[idx].href;
    };
    requestAnimationFrame(dive);
  }

  // back/forward cache: coming back from a study restores this page as it was
  // mid-dive, black overlay and all. Put the world back the way it belongs.
  addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    leaving = false; diveT = 0;
    if (fadeEl) { fadeEl.remove(); fadeEl = null; }
    cam.position.set(0, 0, Z0);
    announce(restCaption, CAP_REST);
    caption.classList.remove('lit');
    hoverIdx = -1;
    armedWorld = -1;
    lastInput = performance.now();
  });

  // ---- loop ------------------------------------------------------------------
  const clock = new THREE.Clock();
  let entranceT = reduced ? 1 : 0, t = 0, lastPaint = -1;
  function frame() {
    const dt = Math.min(0.05, clock.getDelta());
    t += dt;
    // self-heal: if the viewport changed without a resize event (background
    // load, bfcache restore), the canvas size disagrees with the window; re-fit
    if (innerWidth > 2 && el.width !== Math.round(innerWidth * renderer.getPixelRatio())) size();
    // re-anchor every frame so the planet and every word ride the scroll as
    // one body, never a frame apart
    alignToSlot();

    // the living surfaces, repainted at thirty frames a second
    if (!reduced && t - lastPaint >= 1 / 30) {
      paint(t);
      tex.needsUpdate = true;
      lastPaint = t;
    }

    // entrance: the planet grows into place
    let s = slotScale;
    if (entranceT < 1) {
      entranceT = Math.min(1, entranceT + dt / 0.9);
      s *= 0.92 + 0.08 * (1 - Math.pow(1 - entranceT, 3));
    }
    anchor.scale.setScalar(s);
    anchor.position.x = baseX;
    anchor.position.y = baseY + (reduced ? 0 : Math.sin(t * 0.5) * 0.035 * slotScale);  // the float

    // the dive on enter
    cam.position.z = Z0 - (Z0 - 1.9) * diveT;
    cam.position.x = anchor.position.x * 0.75 * diveT;
    cam.position.y = anchor.position.y * 0.75 * diveT;

    const idle = performance.now() - lastInput > 2600;
    if (!dragging) {
      if (Math.abs(velY) > 0.0004) { planet.rotation.y += velY; velY *= 0.955; }
      else if (idle && !reduced && !leaving) planet.rotation.y += dt * 0.07;
    }
    if (!reduced) planet.rotation.z = -0.12 + Math.sin(t * 0.13) * 0.02;   // slow precession
    if (!reduced) capArc.rotation.y = Math.sin(t * 0.35) * 0.05;           // the label sways
    // the baked arc lights only for texts without a letter set. A set's
    // cascade is scheduled only while its text is showing, but every letter
    // already off the arc lives its own life: it finishes its fall in full
    // view, keeps riding its ring while other texts speak, and only heads
    // home (last fallen, first back) when its own text is up again. All
    // four sentences can be aloft at once, each on its own ring.
    const arcOn = activeSet ? 0 : 1;
    capArc.material.opacity += (arcOn - capArc.material.opacity) * Math.min(1, dt * 10);
    if (LETTER_SETS.length) {
      _qFrame.setFromEuler(_eu.set(-0.14, capArc.rotation.y, 0));
      for (const S of LETTER_SETS) {
        const on = S === activeSet && !leaving;
        if (on) S.clock += dt;
        if (!on && S.away === 0 && S.faded) continue;
        const tc = S.clock;
        const span = (S.n - 1) * LSTAG + LDUR;
        const retStart = S.hold + span + LORBIT;
        let anyVis = false;
        for (const L of S.letters) {
          // departures and returns are called only while this text speaks
          if (on) {
            if (L.state === 0 && tc >= S.hold + L.j * LSTAG && tc < retStart) {
              L.state = 1; S.away++; launch(L);
            } else if (L.state === 2 && tc >= retStart + (S.n - 1 - L.j) * LSTAG) {
              L.state = 3; launch(L);
            }
          }
          // but a letter in flight always finishes its journey, end to end
          if (L.state === 1 || L.state === 3) {
            L.f += dt / L.dur;
            if (L.f >= 1) {
              L.f = 0;
              if (L.state === 1) L.state = 2;
              else { L.state = 0; S.away--; }
            }
          }
          if (L.state === 2) L.age += dt;
          const vT = (L.state !== 0 || on) ? 1 : 0;
          L.vis += (vT - L.vis) * Math.min(1, dt * (vT ? 6 : 10));
          if (L.vis > 0.004) anyVis = true;
          else if (!vT) { L.mesh.visible = false; continue; }
          L.mesh.visible = true;
          L.mat.opacity = L.vis;
          _vHome.set(Math.sin(L.theta) * R_CAP, 0, Math.cos(L.theta) * R_CAP)
            .applyQuaternion(_qFrame).add(capArc.position);
          _qHome.setFromEuler(_eu.set(0, L.theta, 0)).premultiply(_qFrame);
          if (L.state === 0) {
            L.mesh.position.copy(_vHome);
            L.mesh.quaternion.copy(_qHome);
            continue;
          }
          const slot = L.theta * (R_CAP / S.orbR) - S.sp * t;
          if (L.state === 2) {
            // riding the ring, adrift: each letter keeps turning in its own
            // time (the turn eases in so the catch does not snap)
            L.mesh.position.set(Math.sin(slot) * S.orbR, 0, Math.cos(slot) * S.orbR)
              .applyQuaternion(S.qOrb);
            L.mesh.quaternion.setFromEuler(_eu.set(0, slot, 0)).premultiply(S.qOrb);
            _qWob.setFromAxisAngle(L.axis,
              0.35 * Math.min(1, L.age * 0.5) * Math.sin(t * L.wsp + L.ph));
            L.mesh.quaternion.multiply(_qWob);
            continue;
          }
          // in flight: a capture spiral. In the ring's own frame the
          // letter's height settles monotonically onto the ring plane while
          // its radius eases out to the ring, winding around as it goes: it
          // falls INTO orbit and never dips under and rebounds
          const e = Math.min(1, L.f);
          const es = e * e * (3 - 2 * e);
          const b = L.state === 1 ? Math.pow(es, 1.35) : Math.pow(1 - es, 1.35);
          _vh2.copy(_vHome).applyQuaternion(S.qInv);       // home, ring-local
          const rH = Math.hypot(_vh2.x, _vh2.z);
          const aH = Math.atan2(_vh2.x, _vh2.z);
          // the angular gap to the slot, unwrapped so a moving slot never
          // flips the spiral's winding mid-flight
          let d = aH - slot;
          if (L.dPrev === null) d = Math.atan2(Math.sin(d), Math.cos(d));
          else d += TAU * Math.round((L.dPrev - d) / TAU);
          L.dPrev = d;
          const a = slot + d * (1 - b) + L.swirl * Math.sin(Math.PI * b) * 0.45;
          const rr3 = rH + (S.orbR - rH) * b;
          L.mesh.position.set(Math.sin(a) * rr3, _vh2.y * (1 - b), Math.cos(a) * rr3)
            .applyQuaternion(S.qOrb);
          const EN = Math.sin(Math.PI * e);
          L.mesh.position.x += Math.sin(t * 0.9 + L.ph) * 0.05 * EN;
          _qOrb.setFromEuler(_eu.set(0, a, 0)).premultiply(S.qOrb);
          L.mesh.quaternion.slerpQuaternions(_qHome, _qOrb, b);
          _qWob.setFromAxisAngle(L.axis, L.tumble * EN);
          L.mesh.quaternion.multiply(_qWob);
        }
        S.faded = !anyVis;
        // the sentence is whole again: rest, then let it fall anew
        if (on && S.away === 0 && tc > retStart + span + 3) S.clock = 0;
      }
    }
    // the warp sharpens for whoever finds it; its name only speaks then
    hoverStarT += ((hoverStar ? 1 : 0) - hoverStarT) * Math.min(1, dt * 10);
    aboutStar.scale.setScalar(starBase * (1 + hoverStarT * 0.2));
    universeArc.material.opacity = hoverStarT;
    sunStreaks.material.opacity = 0.55 + hoverStarT * 0.45;
    sunRipples.material.opacity = 0.5 + hoverStarT * 0.5;
    worldsArc.material.opacity = 0.85 + miniHoverT * 0.15;
    if (!reduced) {
      sunStreaks.material.rotation += dt * 0.05;                  // the lensed sky wheels
      sunRipples.material.rotation -= dt * 0.02;                  // the ripples turn against it
    }
    // the quiet star in the corner: it hides among its neighbors, and only
    // approach makes it swell, brighten, and give up its name
    hoverAboutT += ((hoverAbout ? 1 : 0) - hoverAboutT) * Math.min(1, dt * 10);
    aboutG.scale.setScalar(aboutBase * (1 + (reduced ? 0 : 0.05 * Math.sin(t * 1.9)) + hoverAboutT * 0.5));
    aboutMat.opacity = 0.6 + hoverAboutT * 0.4;
    aboutLabel2.material.opacity = hoverAboutT;
    // the little world turns, its moons run their rounds, and it grows into
    // place before swelling toward whoever reaches for it
    miniHoverT += (((hoverMini || miniFocus) ? 1 : 0) - miniHoverT) * Math.min(1, dt * 10);
    if (!reduced) miniSpin.rotation.y += dt * 0.3;
    const mAp = reduced ? 1 : Math.min(1, Math.max(0, (t - 0.7) / 0.8));
    const mEase = 1 - Math.pow(1 - mAp, 3);
    miniG.scale.setScalar(Math.max(0.001, miniBase * mEase * (1 + miniHoverT * 0.16 + (reduced ? 0 : 0.02 * Math.sin(t * 1.1)))));
    if (!reduced) miniG.position.y += Math.sin(t * 0.55 + 2.2) * 0.01 * miniBase * 6;
    for (const mn of miniMoons) {
      if (!reduced) mn.ph += dt * mn.sp;
      mn.m.position.set(
        Math.cos(mn.ph) * mn.r,
        Math.sin(mn.ph) * mn.r * Math.sin(mn.inc),
        Math.sin(mn.ph) * mn.r * Math.cos(mn.inc));
    }
    for (let i = 0; i < 3; i++) {
      const target = i === hoverIdx ? 0.12 : 0;
      highlights[i].material.opacity += (target - highlights[i].material.opacity) * Math.min(1, dt * 10);
    }

    // the sky: slow drift, twinkle, pointer parallax, the odd shooting star
    ptr.x += (ptr.tx - ptr.x) * Math.min(1, dt * 4);
    ptr.y += (ptr.ty - ptr.y) * Math.min(1, dt * 4);
    if (!reduced) {
      sky.rotation.z += dt * 0.004;
      sky.position.x = -ptr.x * 0.5;
      sky.position.y = ptr.y * 0.4;
      for (const m of starMats) m.uniforms.uTime.value = t;
      for (const sh of shots) {
        sh.cd -= dt;
        if (!sh.on && sh.cd <= 0) {
          sh.on = true; sh.life = 0;
          sh.x = 2 + Math.random() * 5; sh.y = 2 + Math.random() * 2.5;
          sh.vx = -(4 + Math.random() * 3); sh.vy = -(1.6 + Math.random() * 1.6);
        }
        if (sh.on) {
          sh.life += dt; sh.x += sh.vx * dt; sh.y += sh.vy * dt;
          const p = sh.line.geometry.attributes.position;
          p.setXYZ(0, sh.x, sh.y, -7);
          p.setXYZ(1, sh.x - sh.vx * 0.09, sh.y - sh.vy * 0.09, -7);
          p.needsUpdate = true;
          sh.line.material.opacity = Math.max(0, 0.8 - sh.life * 1.0);
          if (sh.life > 0.9) { sh.on = false; sh.line.material.opacity = 0; sh.cd = 4 + Math.random() * 8; }
        }
      }
    }

    renderer.render(scene, cam);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  requestAnimationFrame(() => { el.style.opacity = '1'; });
  window.__world = { anchor, cam, planet, sets: LETTER_SETS, renderer,
    get activeSet() { return activeSet; },
    warpCap(v) { if (activeSet) activeSet.clock = v; },
    forceTouch(v) { touchy = v; },              // the pane can't fake (hover: none)
    get tapState() { return { touchy, armedWorld, dragging, moved }; },
    get slotScale() { return slotScale; },
    warp(v) { t = v; } };                       // debug handle
}
