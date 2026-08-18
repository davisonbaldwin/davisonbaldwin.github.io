/* Wheels and brakes: four corner assemblies plus the brake-by-wire actuator.
   The motors do most of the stopping; the friction hardware is sized for the
   moments they cannot. Corner parts share ids so all four select together;
   each corner group spins about z in drive mode, calipers and the actuator
   deliberately do not. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'wheels',
  name: 'Wheels and brakes',
  color: 0xd0d6db,
  explode: [0, 0, 0],
  blurb: 'Four corner assemblies and a brake-by-wire actuator. Regen takes the everyday stops; cast iron waits for the ones it cannot.',
  parts: {
    tires: {
      name: 'Tires',
      tagline: 'Four contact patches the size of postcards, each carrying 500 kg and every newton the motors make.',
      mass: 42,
      count: 4,
      specs: [
        ['Size', '235/50 R19, XL load index 103'],
        ['Static load per corner', '~540 kg'],
        ['Rolling resistance', '6.5 kg/t, label class A'],
        ['Compound', 'High-silica, low-hysteresis tread'],
        ['Cavity noise', 'PU foam liner, -3 dB at 80 km/h'],
        ['Cold pressure', '2.9 bar'],
      ],
      how: 'An EV asks more of a tire than the car it replaced: roughly 300 kg of extra mass from the pack, and full motor torque available from zero speed, delivered in under 100 ms. The XL casing carries 875 kg per tire at rating. The compound problem is that rolling resistance and grip both come from hysteresis, energy lost as the rubber flexes. High-silica compounds partially decouple the two: the silica-polymer network stays compliant at the kilohertz frequencies of road micro-texture, which is where grip is generated, while staying stiff at the tens-of-hertz frequency of carcass flex, which is where rolling loss lives.\n\nAt 100 km/h a Crr of 6.5 kg/t on a 2.1 t car is about 134 N of drag, roughly a third of total road load; one label class worse would cost about 5% of highway consumption. Noise is the other EV-specific spec: with no engine masking, the 200 Hz air resonance inside the tire cavity becomes the loudest sound in the cabin, so a polyurethane foam ring glued inside the tread damps the air column, worth about 3 dB.',
      why: 'The tire is the only part that sits in both the range budget and the safety budget. The classic trade is rolling resistance, wet grip, wear, noise: pick three. This design picks range and refinement, and buys back wear with software, because motors can shape torque per millisecond in a way no engine ever could.',
      fail: [
        'Instant torque wears an EV tire 20 to 30% faster than the same tire on an ICE car; torque shaping narrows the gap but does not close it.',
        'Low-hysteresis compounds give up some cold and wet grip; the honest winter answer is a second set of tires, not a drive-mode setting.',
        'The foam liner complicates plug repairs and defeats most sealant kits.',
      ],
      explode: [0, 0, 0.85],
    },
    rims: {
      name: 'Forged wheels',
      tagline: 'Forged 6061 at 19 inches: the most cost-effective kilograms on the car to delete.',
      mass: 39,
      count: 4,
      specs: [
        ['Size', '19 x 8.5J, offset ET35'],
        ['Process', 'Forged 6061-T6, flow-formed barrel'],
        ['Mass per wheel', '9.8 kg (cast equivalent ~12.5 kg)'],
        ['Curb impact', '13 degree strike, SAE J175'],
        ['Fatigue', 'Biaxial rig, 300,000 km equivalent'],
      ],
      how: 'Forging presses a billet at around 8,000 tons, aligning the grain along the spokes; yield strength lands near 320 MPa against roughly 180 MPa for cast alloy, so spoke sections can be thinner at equal stiffness. The barrel is then flow-formed: spun against rollers that thin and work-harden the wall to about 3.2 mm. Together the two processes take about 2.7 kg out of each wheel against a cast equivalent.\n\nThat mass is worth more than its face value. Each corner carries about 35 kg the springs do not support: wheel, tire, disc, hub, and a share of the caliper. The less of it there is, the less force it takes the damper to hold the tire against a broken road surface, so contact patch load varies less and both grip and ride improve. Rim mass also counts about 1.5 times on acceleration, because it must be accelerated linearly and spun up at the same time: removing 2.7 kg at the rim reads like removing 4 kg from the body.',
      why: 'A kilogram removed here improves ride, grip, range, and acceleration at once. Almost nowhere else does one kilogram appear in four budgets simultaneously, which is why the forging premium on wheels beats spending the same money on body lightweighting.',
      fail: [
        'A forged rim bends before it cracks under curb strike; cast alloy does the reverse, and the crack is the failure you actually fear.',
        'Galvanic corrosion at the bead seat from winter salt causes slow air loss years before anything is visibly wrong.',
        'A biaxial fatigue life assumes the wheel is never straightened after a pothole; repaired rims restart the clock unknown.',
      ],
      explode: [0, 0, 1.15],
    },
    'aero-covers': {
      name: 'Aero wheel covers',
      tagline: 'A 0.7 kg plastic disc worth about 2% of range, and the first part owners remove.',
      mass: 3,
      count: 4,
      specs: [
        ['Material', 'PC/ABS, 0.7 kg per cover'],
        ['Drag', 'Cd -0.008 with covers installed'],
        ['Range effect', '~2% at highway speed'],
        ['Attachment', 'Five spring clips in the spoke windows'],
        ['Service', 'Tool-free removal at the rim lip'],
      ],
      how: 'Wheels and their wells generate roughly a quarter of the whole car’s drag, and an open spoked wheel is a centrifugal pump: it draws air through itself and churns it into the wheel well. The cover closes the outboard face so flow passes along the body side instead of being pumped. The measured benefit is about 0.008 of Cd, roughly 320 W at 110 km/h across the four wheels, which is close to 2% of consumption.\n\nA clipped plastic disc, rather than a solid-face wheel, keeps the expensive forged part universal and the aero part cheap and sacrificial. The remaining leak paths through the clip windows still pass some cooling air over the discs, which is acceptable only because friction braking is occasional; a car that used its discs every stop could not run a face this closed.',
      why: 'The same 2% of range bought with cells costs about 2 kWh, ten-plus kilograms and a few hundred dollars per car. Bought with plastic it costs 2.8 kg and almost nothing, making the cover the cheapest range on the vehicle, aesthetics permitting.',
      fail: [
        'Owners remove them for looks; the quoted range assumes they are installed, an honest asterisk on the spec sheet.',
        'Clips fatigue with repeated removal, and a cover leaving at highway speed is a projectile.',
        'They throttle brake cooling airflow, a bet on regen staying available that the disc sizing has to underwrite.',
      ],
      explode: [0, 0, 1.45],
    },
    discs: {
      name: 'Brake discs',
      tagline: 'Cast iron sized for the stop the motors cannot take, idle through nearly all the others.',
      mass: 28,
      count: 4,
      specs: [
        ['Front', '380 x 30 mm, internally vented'],
        ['Rear', '330 x 28 mm, internally vented'],
        ['Friction ring', 'High-carbon gray cast iron'],
        ['Hat', 'Forged aluminum, floating pins'],
        ['Duty share', '<10% of braking energy'],
        ['Single-stop energy', '~2 MJ from 160 km/h'],
      ],
      how: 'The motors can return about 0.25 g of deceleration to the pack, roughly 145 kW at highway speed, and in normal driving that covers over 90% of all braking energy; a one-pedal driver may not touch the friction brakes for weeks. Iron takes over whenever demand exceeds what the battery will accept: a hard stop, a cold or full pack, or an ABS event. A single stop from 160 km/h dumps about 2 MJ into the four discs in under five seconds, an average of nearly 500 kW; no battery could swallow it. Internal vanes pump air centrifugally through the ring to shed the heat between applications.\n\nEach disc is two-piece: a cast iron friction ring on a forged aluminum hat, saving about 1.5 kg per corner over monolithic iron. The ring floats on drive pins, so when a hard stop takes it toward 600 °C it grows radially on the pins instead of coning against a rigid center, which keeps the pad face flat and the pedal consistent.',
      why: 'Regen deletes the average duty but not the worst case, and brakes are sized by the worst case: a repeated-fade alpine descent with a full pack, where regen has nowhere to put the energy. Add per-wheel ABS modulation, which axle-level motor torque cannot do, and the legal requirement to stop with the HV system dead, and the iron stays.',
      fail: [
        'Corrosion, not wear, is how EV discs die: a ring used 10% of the time rusts, so the software schedules light wipe applies to clean it.',
        'Uneven corrosion patches become thickness variation, felt as judder long before any safety margin is touched.',
        'The first stop after weeks of one-pedal driving has measurably lower friction until the pads wipe the ring; the actuator compensates with extra pressure.',
      ],
      explode: [0, 0, 0.45],
    },
    calipers: {
      name: 'Calipers',
      tagline: 'Four-piston fronts engineered less for heat than for the discipline of never dragging.',
      mass: 16,
      count: 4,
      specs: [
        ['Front', 'Fixed monobloc, 4 x 40 mm pistons'],
        ['Rear', 'Single-piston floating, EPB motor'],
        ['Clamp force', '40 kN front at 160 bar'],
        ['Pads', 'Low-copper NAO, friction ~0.38'],
        ['Residual drag', '<0.5 Nm per corner'],
      ],
      how: 'Residual drag is the spec that matters in an EV: pads resting on the discs at just 1 Nm per corner burn about 350 W across the car at highway speed, near 2% of consumption. Square-section rollback seals deform as the piston extends and spring it back about 0.1 mm on release, pulling the pads clear. The front monobloc body is machined from one forging for stiffness, so in a hard stop the fluid volume goes into clamp force rather than flexing the bridge, and the pedal stays short.\n\nThe fronts hang at the 9 o’clock position, behind the axle, clearing the steering arc and keeping corner mass low; the rears sit at 3 o’clock, ahead of the axle, packaging around the suspension links. Each rear caliper carries a motor-on-caliper electric park brake: a small gearmotor drives the piston through roughly a 150:1 reduction for parking, hill hold, and a slow-speed emergency fallback if the hydraulic path is lost.',
      why: 'An ICE performance caliper is designed around heat capacity. This one is designed around indifference: months of doing nothing, then full authority 150 ms later. Low-copper NAO pads hold a stable friction coefficient cold, damp, and lightly rusted, which is exactly the state EV pads live in.',
      fail: [
        'Rear slide pins seize from disuse long before pads wear out; the classic EV brake service is lubrication, not replacement.',
        'The piston rollback that saves range also lengthens the first millimeters of apply; the actuator masks it with a pressure pre-fill.',
        'A failed EPB gearmotor is flagged and the corner released mechanically at service; the system never lets it drag.',
      ],
      explode: [-0.3, 0, 0.2],
    },
    'master-unit': {
      name: 'Brake-by-wire actuator',
      tagline: 'The pedal is a sensor. This box does the braking, and decides how much of it is even hydraulic.',
      mass: 5,
      specs: [
        ['Architecture', 'One-box, decoupled pedal'],
        ['Pressure source', 'BLDC motor + ball-screw plunger'],
        ['Pressure build', '0 to 180 bar in 150 ms'],
        ['Pedal simulator', 'Spring and elastomer stack'],
        ['Blend authority', 'Regen to ~0.25 g before iron'],
        ['Fallback', 'Mechanical push-through, ~0.4 g'],
      ],
      how: 'The pedal pushes into a simulator, a spring and elastomer stack that manufactures resistance, while redundant travel and force sensors report what the driver asked for. The controller then apportions the demand: regenerative torque first, up to what the motors and the pack will accept, hydraulics for the remainder. Blending is continuous and silent; as regen fades below about 8 km/h, where motor torque control gets ragged near zero speed, hydraulic pressure ramps in within the same pedal stroke. Because the pedal is decoupled, the driver feels one consistent curve whether the stop was all regen, which most are, or all iron.\n\nPressure comes from a brushless motor driving a plunger through a ball screw: 180 bar in 150 ms, faster than a panic leg at around 300 ms, and available with no engine vacuum because there is no engine. Redundancy is layered: dual ECUs, dual pedal sensors, and two independent circuits, which is why two separate lines run forward to the front calipers. If everything electronic dies, the pedal rod pushes through mechanically to a master cylinder for about 0.4 g unassisted.',
      why: 'Blended braking with a hydraulically connected pedal feels terrible: regen torque varies with speed and state of charge, and every handover telegraphs through the driver’s foot. Decoupling the pedal is what lets software claim over 90% of braking energy, worth roughly 15% of urban range, without the driver ever feeling the seam.',
      fail: [
        'Push-through is a last resort, not a mode: 0.4 g with a long, dead pedal, sized to meet the legal minimum and nothing more.',
        'A simulator fault changes pedal feel but not braking; feel and function are engineered to fail separately.',
        'Blend calibration errors surface as a surge in the last meter of a stop, the hardest regime in braking to tune.',
      ],
      explode: [0.5, 0.35, 0],
    },
  },
};

/* ── Geometry ──
   Corner-local frame: origin at the wheel center, z along the axle,
   s = sign(world z) so +s is outboard. Tire, rim, cover, and disc live in
   a spun group; calipers and the actuator sit in static groups. */

const TIRE_SEG = 48;

function tirePart(s) {
  const g = lib.part('tires', [0, 0, s * 0.85]);
  const band = lib.mesh(
    new THREE.CylinderGeometry(P.tireR, P.tireR, P.tireW, TIRE_SEG, 1, true),
    M.rubber
  );
  band.rotation.x = Math.PI / 2;
  g.add(band);
  for (const e of [-1, 1]) {
    const shoulder = lib.torus(0.30, 0.06, M.rubber, 36, 14);
    shoulder.position.z = e * (P.tireW / 2 - 0.06);
    g.add(shoulder);
  }
  return g;
}

function rimPart(s) {
  const g = lib.part('rims', [0, 0, s * 1.15]);
  const barrel = lib.cyl(P.rimR, 0.20, M.alu, 28);
  barrel.rotation.x = Math.PI / 2;
  g.add(barrel);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const spoke = lib.box(0.05, 0.155, 0.024, M.alu);
    spoke.position.set(Math.cos(a) * 0.145, Math.sin(a) * 0.145, s * 0.096);
    spoke.rotation.z = a - Math.PI / 2;
    g.add(spoke);
  }
  const cap = lib.cyl(0.042, 0.02, M.castAlu, 16);
  cap.rotation.x = Math.PI / 2;
  cap.position.z = s * 0.102;
  g.add(cap);
  return g;
}

function coverPart(s) {
  const g = lib.part('aero-covers', [0, 0, s * 1.45]);
  const face = lib.cyl(0.23, 0.008, M.plastic, 36);
  face.rotation.x = Math.PI / 2;
  face.position.z = s * 0.118;
  g.add(face);
  const trim = lib.torus(0.165, 0.005, M.plasticLt, 40, 8);
  trim.position.z = s * 0.1225;
  g.add(trim);
  const hub = lib.cyl(0.05, 0.004, M.plasticLt, 20);
  hub.rotation.x = Math.PI / 2;
  hub.position.z = s * 0.1235;
  g.add(hub);
  return g;
}

function discPart(s, front) {
  const g = lib.part('discs', [0, 0, s * 0.45]);
  const r = front ? 0.19 : 0.165;
  const ring = lib.cyl(r, 0.03, M.steel, 36);
  ring.rotation.x = Math.PI / 2;
  ring.position.z = -s * 0.135;
  g.add(ring);
  const hat = lib.cyl(0.085, 0.05, M.castAlu, 24);
  hat.rotation.x = Math.PI / 2;
  hat.position.z = -s * 0.112;
  g.add(hat);
  const studs = lib.bolts(5, 0.058, 0.009, M.steel);
  studs.rotation.x = Math.PI / 2;
  studs.position.z = -s * 0.085;
  g.add(studs);
  return g;
}

/* Static caliper at each corner: 9 o'clock (rear of axle) on the fronts to
   clear the steering arc, 3 o'clock (ahead) on the rears. The body rides
   0.04 above the axle centerline so its lower edge clears the battery
   envelope top (y 0.31) where the pack side rail runs out to x = +/-1.30. */
function caliperPart(x, z, front) {
  const s = Math.sign(z);
  const g = lib.part('calipers', [-0.3, 0, s * 0.2]);
  g.position.set(x, P.wheelY, z);
  const dx = front ? -0.17 : 0.15;
  const body = lib.box(0.09, 0.13, 0.07, M.caliper);
  body.position.set(dx, 0.04, -s * 0.135);
  g.add(body);
  const fitting = lib.cyl(0.008, 0.018, M.steel, 10);
  fitting.position.set(dx, 0.115, -s * 0.135);
  g.add(fitting);
  if (!front) {
    /* motor-on-caliper electric park brake gearmotor, inboard face */
    const epb = lib.cyl(0.02, 0.045, M.plastic, 14);
    epb.rotation.x = Math.PI / 2;
    epb.position.set(dx, 0.04, -s * 0.19);
    g.add(epb);
  }
  return g;
}

/* Brake-by-wire one-box on the front bulkhead shelf, with two independent
   lines running to the front calipers. World coordinates throughout. */
function masterUnitPart() {
  const g = lib.part('master-unit', [0.5, 0.35, 0]);

  const body = lib.box(0.14, 0.13, 0.14, M.plastic);
  body.position.set(0.95, 0.63, -0.35);
  g.add(body);

  const motor = lib.cyl(0.045, 0.09, M.steel, 20);
  motor.rotation.z = Math.PI / 2;
  motor.position.set(1.05, 0.62, -0.35);
  g.add(motor);

  const reservoir = lib.box(0.08, 0.05, 0.07, M.plasticLt);
  reservoir.position.set(0.93, 0.72, -0.35);
  g.add(reservoir);

  const ecu = lib.box(0.10, 0.09, 0.012, M.pcb);
  ecu.position.set(0.95, 0.63, -0.276);
  g.add(ecu);

  const pushrod = lib.cyl(0.02, 0.07, M.steel, 14);
  pushrod.rotation.z = Math.PI / 2;
  pushrod.position.set(0.865, 0.60, -0.35);
  g.add(pushrod);

  /* Two independent circuits to the front calipers; routed over the drive
     unit envelope, dropping to the caliper fittings outside it. */
  const lineL = lib.tube(
    [
      [1.01, 0.66, -0.38],
      [1.06, 0.64, -0.46],
      [1.14, 0.58, -0.56],
      [1.24, 0.52, -0.64],
      [1.28, 0.47, -0.675],
    ],
    0.004,
    M.steel
  );
  g.add(lineL);
  const lineR = lib.tube(
    [
      [1.01, 0.66, -0.30],
      [1.06, 0.64, -0.05],
      [1.10, 0.62, 0.30],
      [1.20, 0.56, 0.55],
      [1.27, 0.50, 0.65],
      [1.28, 0.47, 0.675],
    ],
    0.004,
    M.steel
  );
  g.add(lineR);

  return g;
}

export function build() {
  const sys = new THREE.Group();

  const corners = [
    [P.axleF, P.wheelZ],
    [P.axleF, -P.wheelZ],
    [P.axleR, P.wheelZ],
    [P.axleR, -P.wheelZ],
  ];

  for (const [x, z] of corners) {
    const front = x > 0;
    const s = Math.sign(z);

    /* Everything that rotates with the wheel, centered on its own origin. */
    const spinGroup = new THREE.Group();
    spinGroup.position.set(x, P.wheelY, z);
    lib.spin(spinGroup, 'z', 30);
    spinGroup.add(tirePart(s), rimPart(s), coverPart(s), discPart(s, front));
    sys.add(spinGroup);

    /* The caliper grips the disc and must not rotate. */
    sys.add(caliperPart(x, z, front));
  }

  sys.add(masterUnitPart());
  return sys;
}
