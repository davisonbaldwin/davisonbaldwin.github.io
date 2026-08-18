/* Procedural texture maps drawn on canvas at load. No external assets, no
   downloads. Each generator returns a small tiling CanvasTexture; materials
   in common.js attach them as roughness/normal/color maps so surfaces read
   as brushed metal, woven carbon, cast grain, rubber, and fabric rather
   than flat paint. Deterministic: a seeded PRNG, never Math.random. */

import * as THREE from '../vendor/three.module.js';

let seed = 20260806;
function rnd() {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
}

function canvas(size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return c;
}

function finish(c, repeat = 1) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 4;
  return t;
}

/* Grayscale value noise, used as a roughness map base. */
function noiseCanvas(size, cell, lo, hi) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const n = Math.ceil(size / cell) + 1;
  const grid = [];
  for (let i = 0; i < n * n; i++) grid.push(rnd());
  const img = ctx.createImageData(size, size);
  const at = (x, y) => grid[(y % n) * n + (x % n)];
  const smooth = (t) => t * t * (3 - 2 * t);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const gx = x / cell, gy = y / cell;
      const x0 = Math.floor(gx), y0 = Math.floor(gy);
      const fx = smooth(gx - x0), fy = smooth(gy - y0);
      const v = at(x0, y0) * (1 - fx) * (1 - fy) + at(x0 + 1, y0) * fx * (1 - fy)
              + at(x0, y0 + 1) * (1 - fx) * fy + at(x0 + 1, y0 + 1) * fx * fy;
      const g = Math.round((lo + v * (hi - lo)) * 255);
      const i = (y * size + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = g;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

/* Brushed metal: fine directional streaks. */
function brushedCanvas(size = 256) {
  const c = noiseCanvas(size, 40, 0.55, 0.75);
  const ctx = c.getContext('2d');
  ctx.globalAlpha = 0.5;
  for (let i = 0; i < 900; i++) {
    const y = rnd() * size;
    const w = 20 + rnd() * 180;
    const g = Math.round(120 + rnd() * 110);
    ctx.strokeStyle = `rgb(${g},${g},${g})`;
    ctx.lineWidth = rnd() < 0.8 ? 1 : 2;
    ctx.beginPath();
    ctx.moveTo(rnd() * size, y);
    ctx.lineTo(rnd() * size + w, y + (rnd() - 0.5) * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  return c;
}

/* Carbon twill: 2x2 woven tow pattern. */
function carbonCanvas(size = 256, tow = 16) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#2a2d31';
  ctx.fillRect(0, 0, size, size);
  for (let y = 0; y < size; y += tow) {
    for (let x = 0; x < size; x += tow) {
      const over = ((x / tow | 0) + (y / tow | 0)) % 4 < 2;
      const g = over ? 96 : 58;
      const grad = ctx.createLinearGradient(x, y, over ? x + tow : x, over ? y : y + tow);
      grad.addColorStop(0, `rgb(${g - 22},${g - 20},${g - 16})`);
      grad.addColorStop(0.5, `rgb(${g + 26},${g + 28},${g + 32})`);
      grad.addColorStop(1, `rgb(${g - 22},${g - 20},${g - 16})`);
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, tow, tow);
    }
  }
  return c;
}

/* Cast aluminum: pebbled grain. */
function castCanvas(size = 256) {
  const c = noiseCanvas(size, 8, 0.45, 0.85);
  const ctx = c.getContext('2d');
  for (let i = 0; i < 2600; i++) {
    const r = 0.6 + rnd() * 2.2;
    const g = Math.round(90 + rnd() * 90);
    ctx.fillStyle = `rgba(${g},${g},${g},0.5)`;
    ctx.beginPath();
    ctx.arc(rnd() * size, rnd() * size, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return c;
}

/* Rubber: matte speckle plus faint circumferential banding. */
function rubberCanvas(size = 256) {
  const c = noiseCanvas(size, 6, 0.72, 0.95);
  const ctx = c.getContext('2d');
  ctx.globalAlpha = 0.25;
  for (let y = 0; y < size; y += 9) {
    ctx.fillStyle = y % 18 === 0 ? '#8a8a8a' : '#c8c8c8';
    ctx.fillRect(0, y, size, 4);
  }
  ctx.globalAlpha = 1;
  return c;
}

/* Woven fabric: cross-hatched threads. */
function fabricCanvas(size = 256, pitch = 6) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#8e8e8e';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < size; i += pitch) {
    ctx.fillStyle = 'rgba(255,255,255,0.30)';
    ctx.fillRect(i, 0, pitch / 2, size);
    ctx.fillStyle = 'rgba(0,0,0,0.24)';
    ctx.fillRect(0, i, size, pitch / 2);
  }
  return c;
}

/* METALLIC FLAKE, the basecoat under the clearcoat.

   Real metallic paint is aluminum platelets a few microns across suspended
   in the color coat. Each one is a tiny mirror lying at its own angle, so
   the surface glitters in a way no roughness value can reproduce: roughness
   blurs a reflection evenly, flake scatters it into discrete points that
   move as the eye moves. Modeled here as a dense field of specks perturbing
   the basecoat normal. Kept low-contrast because the clearcoat above damps
   it, and because flake that reads at ten meters is a metal-flake hot rod,
   not a production finish. */
function flakeCanvas(size = 512) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#808080';        // flat: no perturbation
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 14000; i++) {
    const r = 0.5 + rnd() * 1.1;
    /* half the platelets tilt one way, half the other, so the field has no
       net bias and a flat panel stays flat */
    const g = rnd() < 0.5 ? 90 + rnd() * 42 : 124 + rnd() * 44;
    ctx.fillStyle = `rgb(${g},${g},${g})`;
    ctx.beginPath();
    ctx.arc(rnd() * size, rnd() * size, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return c;
}

/* ORANGE PEEL, the clearcoat surface itself.

   Sprayed clearcoat never levels perfectly flat: surface tension pulls it
   into a gentle swell about a millimeter across before it cures. This is
   what tells the eye it is looking at paint and not at chrome. It belongs
   in the clearcoat NORMAL, not in clearcoat roughness. Roughness would blur
   the softbox reflections into a haze; peel keeps them sharp and makes them
   undulate as they rake down the bodyside, which is the whole reason the
   studio environment has hard-edged sources to reflect. */
function peelCanvas(size = 256) {
  const c = noiseCanvas(size, 26, 0.42, 0.58);
  const fine = noiseCanvas(size, 11, 0.40, 0.60);
  /* Blend the second, finer octave numerically rather than with drawImage:
     the headless shim has no drawImage, and summing the samples directly is
     the same operation without depending on canvas compositing rules. */
  const ctx = c.getContext('2d');
  const base = ctx.getImageData(0, 0, size, size);
  const det = fine.getContext('2d').getImageData(0, 0, size, size);
  for (let i = 0; i < base.data.length; i += 4) {
    const v = base.data[i] * 0.65 + det.data[i] * 0.35;
    base.data[i] = base.data[i + 1] = base.data[i + 2] = v;
  }
  ctx.putImageData(base, 0, 0);
  return c;
}

/* Height map -> tangent-space normal map, for weave and grain relief. */
function normalFrom(src, strength = 2.2) {
  const size = src.width;
  const sctx = src.getContext('2d');
  const s = sctx.getImageData(0, 0, size, size).data;
  const out = canvas(size);
  const octx = out.getContext('2d');
  const img = octx.createImageData(size, size);
  const h = (x, y) => s[(((y + size) % size) * size + ((x + size) % size)) * 4] / 255;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (h(x - 1, y) - h(x + 1, y)) * strength;
      const dy = (h(x, y - 1) - h(x, y + 1)) * strength;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      img.data[i] = Math.round((dx / len * 0.5 + 0.5) * 255);
      img.data[i + 1] = Math.round((dy / len * 0.5 + 0.5) * 255);
      img.data[i + 2] = Math.round((1 / len * 0.5 + 0.5) * 255);
      img.data[i + 3] = 255;
    }
  }
  octx.putImageData(img, 0, 0);
  return out;
}

const brushed = brushedCanvas();
const carbon = carbonCanvas();
const cast = castCanvas();
const rubber = rubberCanvas();
const fabric = fabricCanvas();
const paintGrain = noiseCanvas(256, 9, 0.90, 1.0);
const flake = flakeCanvas();
const peel = peelCanvas();

/* color maps must declare sRGB; roughness and normal maps stay linear */
function srgb(t) { t.colorSpace = THREE.SRGBColorSpace; return t; }

export const TEX = {
  brushedRough: finish(brushed, 3),
  brushedNormal: finish(normalFrom(brushed, 0.7), 3),
  carbonColor: srgb(finish(carbon, 6)),
  carbonNormal: finish(normalFrom(carbon, 1.6), 6),
  castRough: finish(cast, 4),
  castNormal: finish(normalFrom(cast, 1.1), 4),
  rubberRough: finish(rubber, 5),
  rubberNormal: finish(normalFrom(rubber, 1.0), 5),
  fabricColor: srgb(finish(fabric, 8)),
  fabricNormal: finish(normalFrom(fabric, 1.4), 8),
  paintRough: finish(paintGrain, 14),
  /* Lofted panels carry arc-length UVs in METERS (see _arcUV in common.js),
     so repeat R tiles every 1/R meters on every body. Flake at 40 tiles
     every 25 mm, and a 1 px speck on a 512 px canvas is then 0.05 mm, which
     is platelet scale. Peel at 50 tiles every 20 mm, and its 26 px noise
     cell is then about 2 mm, which is orange-peel scale. */
  paintFlakeNormal: finish(normalFrom(flake, 1.5), 40),
  paintPeelNormal: finish(normalFrom(peel, 0.55), 50),
};
