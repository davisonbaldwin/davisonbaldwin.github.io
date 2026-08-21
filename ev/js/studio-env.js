import * as THREE from '../vendor/three.module.js';

/* THE STUDIO THE CAR IS LIT IN, and it is its own module because two apps
   need it now: this viewer, and the portfolio homepage, where pressing V
   turns the ship into this car and the car has to arrive in the finish it
   wears here. It was lifted out of viewer.js unchanged rather than copied,
   so there is one studio and not two that drift.

   Car paint only looks like car paint when it has STRUCTURE to reflect.
   A vertical gradient gives a uniform sheen and reads as plastic; what
   sells an automotive render is long rectangular softboxes with hard
   edges, because their reflections rake along the bodyside and reveal
   the surface curvature. This paints an equirectangular studio: a dark
   surround, an overhead strip light running the length of the car, two
   large side softboxes at shoulder height, and cooler fill behind. */
export function makeEnv(renderer) {
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
