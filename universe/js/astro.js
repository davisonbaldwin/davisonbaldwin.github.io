// Ephemeris math: JPL approximate Keplerian elements (Standish, valid 3000 BC-3000 AD),
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

// JPL/Standish Keplerian elements valid 3000 BC – 3000 AD (Table 2a), so the time
// bar can reach the historical supernovae (1006, 1054, 1572, 1604) with planet
// positions that stay honest. Outer planets get the Table 2b periodic corrections.
// [a au, a'/cy, e, e'/cy, I deg, I'/cy, L deg, L'/cy, varpi deg, varpi'/cy, Omega deg, Omega'/cy]
const ELEMENTS = {
  Mercury: [0.38709843, 0.00000000, 0.20563661, 0.00002123, 7.00559432, -0.00590158,
            252.25166724, 149472.67486623, 77.45771895, 0.15940013, 48.33961819, -0.12214182],
  Venus:   [0.72332102, -0.00000026, 0.00676399, -0.00005107, 3.39777545, 0.00043494,
            181.97970850, 58517.81560260, 131.76755713, 0.05679648, 76.67261496, -0.27274174],
  Earth:   [1.00000018, -0.00000003, 0.01673163, -0.00003661, -0.00054346, -0.01337178,
            100.46691572, 35999.37306329, 102.93005885, 0.31795260, -5.11260389, -0.24123856],
  Mars:    [1.52371243, 0.00000097, 0.09336511, 0.00009149, 1.85181869, -0.00724757,
            -4.56813164, 19140.29934243, -23.91744784, 0.45223625, 49.71320984, -0.26852431],
  Jupiter: [5.20248019, -0.00002864, 0.04853590, 0.00018026, 1.29861416, -0.00322699,
            34.33479152, 3034.90371757, 14.27495244, 0.18199196, 100.29282654, 0.13024619],
  Saturn:  [9.54149883, -0.00003065, 0.05550825, -0.00032044, 2.49424102, 0.00451969,
            50.07571329, 1222.11494724, 92.86136063, 0.54179478, 113.63998702, -0.25015002],
  Uranus:  [19.18797948, -0.00020455, 0.04685740, -0.00001550, 0.77298127, -0.00180155,
            314.20276625, 428.49512595, 172.43404441, 0.09266985, 73.96250215, 0.05739699],
  Neptune: [30.06952752, 0.00006447, 0.00895439, 0.00000818, 1.77005520, 0.00022400,
            304.22289287, 218.46515314, 46.68158724, 0.01009938, 131.78635853, -0.00606302],
  // Pluto keeps the 1800–2050 fit (the long-term table omits it); its slow 248-year
  // orbit drifts gracefully outside that window
  Pluto:   [39.48211675, -0.00031596, 0.24882730, 0.00005170, 17.14001206, 0.00004818,
            238.92903833, 145.20780515, 224.06891629, -0.04062942, 110.30393684, -0.01183482],
};
// Table 2b: L += b·T² + c·cos(f·T) + s·sin(f·T)  (degrees, T in centuries)
const ELEMENTS_EXTRA = {
  Jupiter: [-0.00012452,  0.06064060, -0.35635438, 38.35125000],
  Saturn:  [ 0.00025899, -0.13434469,  0.87320147, 38.35125000],
  Uranus:  [ 0.00058331, -0.97731848,  0.17689245,  7.67025000],
  Neptune: [-0.00041348,  0.68346318, -0.10162547,  7.67025000],
};

export const PLANET_NAMES = Object.keys(ELEMENTS);

export function orbitalElements(name, jd) {
  const T = (jd - J2000) / 36525;
  const e = ELEMENTS[name];
  let L = e[6] + e[7] * T;
  const x = ELEMENTS_EXTRA[name];
  if (x) L += x[0] * T * T + x[1] * cos(x[3] * T) + x[2] * sin(x[3] * T);
  return {
    a: e[0] + e[1] * T,
    ecc: e[2] + e[3] * T,
    inc: e[4] + e[5] * T,
    L,
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
