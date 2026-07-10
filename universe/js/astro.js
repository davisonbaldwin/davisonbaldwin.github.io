// Ephemeris math: JPL approximate Keplerian elements (Standish, valid 1800-2050 AD),
// Kepler equation solver, low-precision lunar theory (Astronomical Almanac),
// coordinate transforms between ecliptic / equatorial / galactic frames.

export const J2000 = 2451545.0;
export const DEG = Math.PI / 180;
export const AU_KM = 149597870.7;
export const PC_LY = 3.26156;

const d = Math.PI / 180;
const sin = (x) => Math.sin(x * d);
const cos = (x) => Math.cos(x * d);

export function jdFromDate(date) {
  return date.getTime() / 86400000 + 2440587.5;
}
export function dateFromJd(jd) {
  return new Date((jd - 2440587.5) * 86400000);
}

// [a au, a'/cy, e, e'/cy, I deg, I'/cy, L deg, L'/cy, varpi deg, varpi'/cy, Omega deg, Omega'/cy]
const ELEMENTS = {
  Mercury: [0.38709927, 0.00000037, 0.20563593, 0.00001906, 7.00497902, -0.00594749,
            252.25032350, 149472.67411175, 77.45779628, 0.16047689, 48.33076593, -0.12534081],
  Venus:   [0.72333566, 0.00000390, 0.00677672, -0.00004107, 3.39467605, -0.00078890,
            181.97909950, 58517.81538729, 131.60246718, 0.00268329, 76.67984255, -0.27769418],
  Earth:   [1.00000261, 0.00000562, 0.01671123, -0.00004392, -0.00001531, -0.01294668,
            100.46457166, 35999.37244981, 102.93768193, 0.32327364, 0.0, 0.0],
  Mars:    [1.52371034, 0.00001847, 0.09339410, 0.00007882, 1.84969142, -0.00813131,
            -4.55343205, 19140.30268499, -23.94362959, 0.44441088, 49.55953891, -0.29257343],
  Jupiter: [5.20288700, -0.00011607, 0.04838624, -0.00013253, 1.30439695, -0.00183714,
            34.39644051, 3034.74612775, 14.72847983, 0.21252668, 100.47390909, 0.20469106],
  Saturn:  [9.53667594, -0.00125060, 0.05386179, -0.00050991, 2.48599187, 0.00193609,
            49.95424423, 1222.49362201, 92.59887831, -0.41897216, 113.66242448, -0.28867794],
  Uranus:  [19.18916464, -0.00196176, 0.04725744, -0.00004397, 0.77263783, -0.00242939,
            313.23810451, 428.48202785, 170.95427630, 0.40805281, 74.01692503, 0.04240589],
  Neptune: [30.06992276, 0.00026291, 0.00859048, 0.00005105, 1.77004347, 0.00035372,
            -55.12002969, 218.45945325, 44.96476227, -0.32241464, 131.78422574, -0.00508664],
  Pluto:   [39.48211675, -0.00031596, 0.24882730, 0.00005170, 17.14001206, 0.00004818,
            238.92903833, 145.20780515, 224.06891629, -0.04062942, 110.30393684, -0.01183482],
};

export const PLANET_NAMES = Object.keys(ELEMENTS);

export function orbitalElements(name, jd) {
  const T = (jd - J2000) / 36525;
  const e = ELEMENTS[name];
  return {
    a: e[0] + e[1] * T,
    ecc: e[2] + e[3] * T,
    inc: e[4] + e[5] * T,
    L: e[6] + e[7] * T,
    varpi: e[8] + e[9] * T,
    Omega: e[10] + e[11] * T,
  };
}

function solveKepler(Mdeg, ecc) {
  const M = ((Mdeg % 360) + 360) % 360;
  let E = M + (ecc * 180 / Math.PI) * sin(M);
  // iterate to convergence — planets settle in a few steps, but near-parabolic
  // comets (e ≳ 0.97) need many more near perihelion, so cap generously
  for (let i = 0; i < 60; i++) {
    const dM = M - (E - (ecc * 180 / Math.PI) * sin(E));
    const dE = dM / (1 - ecc * cos(E));
    E += Math.max(-30, Math.min(30, dE));   // damp the step: raw Newton overshoots wildly at high e
    if (Math.abs(dE) < 1e-8) break;
  }
  return E;
}

// heliocentric ecliptic (J2000) position in AU
export function planetHelio(name, jd) {
  const el = orbitalElements(name, jd);
  return posFromElements(el);
}

export function posFromElements(el, Moverride) {
  const { a, ecc, inc, Omega } = el;
  const omega = el.varpi - el.Omega;
  const M = Moverride !== undefined ? Moverride : el.L - el.varpi;
  const E = solveKepler(M, ecc);
  const xp = a * (cos(E) - ecc);
  const yp = a * Math.sqrt(1 - ecc * ecc) * sin(E);
  const co = cos(omega), so = sin(omega);
  const cO = cos(Omega), sO = sin(Omega);
  const ci = cos(inc), si = sin(inc);
  return {
    x: (co * cO - so * sO * ci) * xp + (-so * cO - co * sO * ci) * yp,
    y: (co * sO + so * cO * ci) * xp + (-so * sO + co * cO * ci) * yp,
    z: (so * si) * xp + (co * si) * yp,
  };
}

// Greenwich mean sidereal time in degrees
export function gmst(jd) {
  return ((280.46061837 + 360.98564736629 * (jd - J2000)) % 360 + 360) % 360;
}

export function obliquity(jd) {
  const T = (jd - J2000) / 36525;
  return 23.43928 - 0.01300 * T;
}

export function eclToEq(v, jd) {
  const eps = obliquity(jd);
  const ce = cos(eps), se = sin(eps);
  return { x: v.x, y: v.y * ce - v.z * se, z: v.y * se + v.z * ce };
}

export function vecToRaDec(v) {
  const r = Math.hypot(v.x, v.y, v.z);
  const ra = ((Math.atan2(v.y, v.x) / d) % 360 + 360) % 360;
  const dec = Math.asin(v.z / r) / d;
  return { ra, dec, r };
}

// geocentric RA/Dec of a planet (or the Sun when name === 'Sun')
export function geoRaDec(name, jd) {
  const e = planetHelio('Earth', jd);
  let g;
  if (name === 'Sun') g = { x: -e.x, y: -e.y, z: -e.z };
  else {
    const p = planetHelio(name, jd);
    g = { x: p.x - e.x, y: p.y - e.y, z: p.z - e.z };
  }
  return vecToRaDec(eclToEq(g, jd));
}

// low-precision Moon: geocentric ecliptic lon/lat (deg) and distance (km); good to ~0.3 deg
export function moonGeo(jd) {
  const T = (jd - J2000) / 36525;
  const lam = 218.32 + 481267.881 * T
    + 6.29 * sin(135.0 + 477198.87 * T) - 1.27 * sin(259.3 - 413335.36 * T)
    + 0.66 * sin(235.7 + 890534.22 * T) + 0.21 * sin(269.9 + 954397.74 * T)
    - 0.19 * sin(357.5 + 35999.05 * T) - 0.11 * sin(186.5 + 966404.03 * T);
  const bet = 5.13 * sin(93.3 + 483202.02 * T) + 0.28 * sin(228.2 + 960400.89 * T)
    - 0.28 * sin(318.3 + 6003.15 * T) - 0.17 * sin(217.6 - 407332.21 * T);
  const par = 0.9508
    + 0.0518 * cos(135.0 + 477198.87 * T) + 0.0095 * cos(259.3 - 413335.36 * T)
    + 0.0078 * cos(235.7 + 890534.22 * T) + 0.0028 * cos(269.9 + 954397.74 * T);
  const distKm = 6378.14 / sin(par);
  const v = { x: cos(bet) * cos(lam), y: cos(bet) * sin(lam), z: sin(bet) };
  const eq = eclToEq(v, jd);
  const { ra, dec } = vecToRaDec(eq);
  return { ra, dec, distKm };
}

// geocentric ecliptic (J2000-ish) Moon position in AU — used to place the Moon
// as a real body orbiting Earth in the 3D solar-system view
export function moonEcl(jd) {
  const T = (jd - J2000) / 36525;
  const lam = 218.32 + 481267.881 * T
    + 6.29 * sin(135.0 + 477198.87 * T) - 1.27 * sin(259.3 - 413335.36 * T)
    + 0.66 * sin(235.7 + 890534.22 * T) + 0.21 * sin(269.9 + 954397.74 * T)
    - 0.19 * sin(357.5 + 35999.05 * T) - 0.11 * sin(186.5 + 966404.03 * T);
  const bet = 5.13 * sin(93.3 + 483202.02 * T) + 0.28 * sin(228.2 + 960400.89 * T)
    - 0.28 * sin(318.3 + 6003.15 * T) - 0.17 * sin(217.6 - 407332.21 * T);
  const par = 0.9508
    + 0.0518 * cos(135.0 + 477198.87 * T) + 0.0095 * cos(259.3 - 413335.36 * T)
    + 0.0078 * cos(235.7 + 890534.22 * T) + 0.0028 * cos(269.9 + 954397.74 * T);
  const distAU = (6378.14 / sin(par)) / AU_KM;
  return { x: cos(bet) * cos(lam) * distAU, y: cos(bet) * sin(lam) * distAU, z: sin(bet) * distAU, distAU };
}

// moon phase fraction illuminated (0 new - 1 full)
export function moonPhase(jd) {
  const sun = geoRaDec('Sun', jd);
  const moon = moonGeo(jd);
  const cosE = sin(sun.dec) * sin(moon.dec) + cos(sun.dec) * cos(moon.dec) * cos(sun.ra - moon.ra);
  const elong = Math.acos(Math.max(-1, Math.min(1, cosE)));
  return (1 - Math.cos(elong)) / 2;
}

// galactic -> equatorial J2000 rotation (transpose of the standard eq->gal matrix)
const GAL = [
  [-0.0548755604, +0.4941094279, -0.8676661490],
  [-0.8734370902, -0.4448296300, -0.1980763734],
  [-0.4838350155, +0.7469822445, +0.4559837762],
];
export function galToEq(l, b) {
  const g = { x: cos(b) * cos(l), y: cos(b) * sin(l), z: sin(b) };
  return {
    x: GAL[0][0] * g.x + GAL[0][1] * g.y + GAL[0][2] * g.z,
    y: GAL[1][0] * g.x + GAL[1][1] * g.y + GAL[1][2] * g.z,
    z: GAL[2][0] * g.x + GAL[2][1] * g.y + GAL[2][2] * g.z,
  };
}

export const PLANET_INFO = {
  Sun:     { radius: 696340, type: 'G2V star', extra: [['Mass', '1 M☉'], ['Surface temp', '5,772 K']] },
  Moon:    { radius: 1737.4, type: 'Natural satellite', extra: [['Orbital period', '27.32 days']] },
  Mercury: { radius: 2439.7, type: 'Terrestrial planet', period: '88.0 days', moons: 0 },
  Venus:   { radius: 6051.8, type: 'Terrestrial planet', period: '224.7 days', moons: 0 },
  Earth:   { radius: 6371.0, type: 'Terrestrial planet', period: '365.25 days', moons: 1 },
  Mars:    { radius: 3389.5, type: 'Terrestrial planet', period: '687.0 days', moons: 2 },
  Jupiter: { radius: 69911,  type: 'Gas giant', period: '11.86 years', moons: 95 },
  Saturn:  { radius: 58232,  type: 'Gas giant', period: '29.46 years', moons: 146 },
  Uranus:  { radius: 25362,  type: 'Ice giant', period: '84.0 years', moons: 28 },
  Neptune: { radius: 24622,  type: 'Ice giant', period: '164.8 years', moons: 16 },
  Pluto:   { radius: 1188.3, type: 'Dwarf planet', period: '247.9 years', moons: 5 },
};

// B-V color index -> approximate RGB (blackbody-ish piecewise fit)
export function bvToRgb(bv) {
  const t = Math.max(-0.4, Math.min(2.0, bv));
  let r, g, b;
  if (t < 0.0)      { r = 0.61 + 0.11 * (t + 0.4) / 0.4 + 0.1; }
  else if (t < 0.4) { r = 0.83 + 0.17 * t / 0.4; }
  else              { r = 1.0; }
  if (t < 0.0)      { g = 0.70 + 0.07 * (t + 0.4) / 0.4 + 0.1; }
  else if (t < 0.4) { g = 0.87 + 0.11 * t / 0.4; }
  else if (t < 1.6) { g = 0.98 - 0.16 * (t - 0.4) / 1.2; }
  else              { g = 0.82 - 0.5 * (t - 1.6) / 0.4; }
  if (t < 0.4)      { b = 1.0; }
  else if (t < 1.5) { b = 1.0 - 0.47 * (t - 0.4) / 1.1; }
  else              { b = 0.63 - 0.6 * (t - 1.5) / 0.5; }
  return [Math.min(1, Math.max(0, r)), Math.min(1, Math.max(0, g)), Math.min(1, Math.max(0, b))];
}
