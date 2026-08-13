/* Drive units: a permanent-magnet rear drive unit shown as a z-axis teardown
   (clamshell housing, stator, rotor, single-speed gearset, differential) plus
   a sealed induction front unit. Halfshafts reach the wheel centres on both
   axles. Built to the packaging spec in SPEC.md. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'drivetrain',
  name: 'Drive units',
  color: 0xe8a24c,
  explode: [0, -0.5, 0],
  blurb: 'Two drive units, one philosophy: a permanent-magnet rear that does the daily work, an induction front that costs nothing when idle. 194 kg, 370 kW combined.',
  parts: {
    housing: {
      name: 'Rear drive unit housing',
      tagline: 'One aluminium casting that is motor frame, gearbox, oil tank and heat exchanger at once.',
      mass: 23,
      specs: [
        ['Material', 'A380 high-pressure die cast'],
        ['Construction', 'Clamshell, split at motor face'],
        ['Wall thickness', '3.5 mm nominal, ribbed'],
        ['Oil charge', '1.4 L ATF, shared motor and gears'],
        ['Oil pump', 'Electric, 10 W cruise, 400 W peak'],
        ['Heat exchanger', 'Oil-to-coolant plate, 11 kW'],
      ],
      how: 'The housing is two castings bolted at the motor face: a motor drum and a gear case. Casting them separately lets each be machined on one datum, which is what holds the three gear axes parallel within 20 microns over 100 mm. That tolerance is not pedantry: 10 microns of axis misalignment measurably raises gear noise, and there is no engine to hide it behind.\n\nThe same casting is the thermal system. A sump at the bottom holds 1.4 litres of transmission fluid; an electric pump draws from it, pushes it through the plate heat exchanger into the water loop, then up to a gallery that sprays the stator end windings and drips through the gear mesh. One fluid lubricates the gears and cools the copper, so the housing needs no second circuit and no shaft seals between wet zones.',
      why: 'Integrating motor, gearbox and inverter mounting into one structure deletes couplings, flanges and one whole layer of tolerance stack. The unit is rigid because it must be: it reacts 2,750 Nm of wheel torque through three mounts, and any compliance in the case shows up as gear mesh movement, which is noise.',
      fail: [
        'Bearing currents from fast inverter edges pit the races by micro-arcing; an insulated rear bearing and a shaft grounding ring give the current a harmless path.',
        'Casting porosity is the classic die-cast leak mode; every housing is pressure-checked with helium before assembly.',
        'The ATF sees copper, insulation and gear steel at once, so its additive package is a compromise; oil analysis at service catches accelerated ageing.',
      ],
      explode: [0, -0.2, 0],
    },
    stator: {
      name: 'Stator',
      tagline: 'The ring of iron and copper that makes the rotating field. It never moves; everything else follows it.',
      mass: 24,
      specs: [
        ['Laminations', '0.25 mm silicon steel stack'],
        ['Winding', 'Hairpin, rectangular copper, 48 slots'],
        ['Slot fill', '73% (round wire manages ~45%)'],
        ['Phase current', '280 A continuous, 620 A peak'],
        ['Fundamental frequency', 'Up to 1.1 kHz at top speed'],
        ['Cooling', 'Direct oil spray on end windings'],
      ],
      how: 'Three-phase currents in the winding create a magnetic field that rotates at up to 1.1 kHz electrical. The core is a stack of 0.25 mm insulated steel laminations, thin because the field reverses in the iron a thousand times a second and eddy-current loss scales with the square of lamination thickness. The winding is hairpin construction: rectangular copper bars pushed into the slots and laser-welded at the ends, which packs 73% of each slot with conductor where wound round wire achieves about 45%. More copper in the same iron means less resistance, and less resistance is torque you do not pay heat for.\n\nThe thermal limit of the whole machine is the end winding, the exposed copper loops at each face where the bars cross between slots. Oil jets from a gallery in the housing spray it directly: oil is a dielectric, so it can touch live copper, and moving the coolant to the actual hot spot instead of a jacket around the iron roughly doubles sustainable current density. Above about 7,000 rpm the control also runs field weakening: it spends some stator current opposing the rotor magnets so their voltage does not outrun the battery, trading copper loss for another 9,000 rpm of usable speed.',
      why: 'Torque density is decided here. The magnets set the flux, but heat in this copper is what caps continuous power, so every gain in slot fill and end-winding cooling is torque the rest of the car gets for free. Hairpin plus oil spray is the current answer, and it is why a 24 kg stator can sustain 220 kW.',
      fail: [
        'SiC switching edges of 10 kV/us stress the first turns of insulation with partial discharge; slot liners and enamel are rated for it, and it is the life-limiting wear-out mechanism.',
        'One cracked hairpin weld among hundreds raises one phase resistance milliohms; end-of-line impedance matching catches it, fleet telemetry catches the slow ones.',
        'The winding thermistor sits between bars, so the true hot spot is inferred by model, not measured; the model carries a 15 °C margin and that margin is range you never see.',
      ],
      explode: [0, 0, 0.35],
    },
    rotor: {
      name: 'Rotor',
      tagline: 'Buried NdFeB magnets at 16,500 rpm: part magnet machine, part reluctance machine.',
      mass: 15,
      specs: [
        ['Magnets', 'NdFeB, 8 poles, V-shaped pockets'],
        ['Max speed', '16,500 rpm, 112 m/s tip speed'],
        ['Retention', 'Lamination bridges, 1.5 mm'],
        ['Peak torque', '340 Nm, ~35% reluctance share'],
        ['Peak efficiency', '97% (motor alone)'],
      ],
      how: 'The magnets sit inside the rotor iron in V-shaped pockets rather than on the surface. That buries them against roughly 15,000 g of centripetal load at full speed, retained by thin lamination bridges left in the steel, and it makes the rotor magnetically lopsided on purpose: flux crosses the pocket axis less easily than the iron between poles. The controller exploits that asymmetry by advancing the current angle, adding reluctance torque, torque from iron alignment alone, worth about a third of the total and costing no magnet material.\n\nAt speed the magnets become the problem they solve. Their flux induces voltage in the stator proportional to rpm, and past about 7,000 rpm that back-EMF would exceed the battery; the field-weakening current described on the stator holds it in check. This is the shape behind the efficiency map: a broad island above 90% covering most of real driving, peaking at 97% at mid speed and mid torque, sagging at low speed (copper loss dominates) and at top speed (field weakening and iron loss dominate).',
      why: 'A permanent-magnet rotor is the most efficient way we know to make torque, which is why it drives the axle that works every trip. The magnets are the most expensive material in the unit and they never switch off, and that exact liability is why the other axle gets an induction machine instead.',
      fail: [
        'Above about 160 °C combined with fault-level stator current, NdFeB demagnetises irreversibly; the inverter torque limit at high temperature exists to protect the magnets, not the copper.',
        'The retention bridges are sized within 40% of yield at overspeed; a burst rotor is contained by the stator and housing, verified by deliberate overspeed-to-failure tests.',
        'Dysprosium in the magnet alloy is the supply-chain pinch point; the grade here uses grain-boundary diffusion to cut heavy rare earth content by half.',
      ],
      explode: [0, 0, 0.6],
    },
    gearset: {
      name: 'Single-speed gearset',
      tagline: 'One ratio, chosen once: 8.1:1 through helical gears that must be quieter than tyre roar.',
      mass: 10,
      specs: [
        ['Ratio', '8.1:1 in two stages'],
        ['Stage 1', '23:56 helical, input pinion'],
        ['Stage 2', '26:86 helical, to ring gear'],
        ['Max input', '340 Nm at up to 16,500 rpm'],
        ['Wheel torque', '2,750 Nm at the hubs'],
        ['Finish', 'Ground flanks, crowned microgeometry'],
      ],
      how: 'A motor that makes full torque from 0 rpm and survives 16,500 rpm needs no gearbox in the automotive sense, just one fixed reduction. Two stages take 8.1:1: the shaft pinion drives an intermediate gear, whose smaller partner drives the large ring gear carrying the differential. At the top of the motor speed range the wheels turn about 2,000 rpm, which is 270 km/h on this tyre; at the bottom, 8.1:1 multiplies 340 Nm into 2,750 Nm at the hubs. One ratio spans the whole envelope because the motor, unlike an engine, is happy across all of it.\n\nThe engineering effort goes into silence. Gear mesh frequencies land at 1 to 2 kHz, exactly where hearing is most sensitive, with no engine to mask them. So the gears are helical with an overlap ratio above 2, meaning at least two tooth pairs always share load and engagement is gradual rather than percussive, and the flanks are ground with deliberate crowning so that under load, as shafts deflect microns, the contact patch stays centred instead of running to an edge.',
      why: 'A two-speed box would gain roughly 2 to 3% consumption at motorway speed. It costs 15 kg, a shift interruption or a slipping element, and a new failure population. The same money buys battery capacity that pays out everywhere, not just above 120 km/h. Every serious EV maker has run this trade and landed in the same place.',
      fail: [
        'Regenerative braking reverses torque through the mesh, so the coast flanks are working surfaces too and every pedal lift crosses gear lash; torque is ramped through zero in software to keep that crossing inaudible.',
        'Micro-pitting on the flanks after high-load thermal cycles slowly raises whine; it is a wear-out mode watched by cabin-microphone order analysis in fleet data.',
        'A hard launch from rest applies peak torque at near-zero sliding speed, the worst lubrication regime; the oil film survives on additive chemistry, not hydrodynamics.',
      ],
      explode: [0, 0, -0.45],
    },
    differential: {
      name: 'Differential',
      tagline: 'An open diff and a fast inverter: traction control by electronics instead of friction plates.',
      mass: 8,
      specs: [
        ['Type', 'Open bevel, four pinions'],
        ['Mounting', 'Bolted into the stage-2 ring gear'],
        ['Case torque', '2,750 Nm maximum'],
        ['Slip handling', 'Inverter torque cut, < 10 ms'],
      ],
      how: 'The differential lets the outer wheel overrun the inner in a corner while the case delivers torque to both. Four bevel pinions inside the case do the arithmetic mechanically: wheel speeds may differ, torque splits equally. It bolts straight into the bore of the stage-2 ring gear, so the ring gear is also the differential case flange, saving a part and 30 mm of width.\n\nAn open differential has one vice: it can only send both wheels the torque the more slippery one can take. The classical fixes are friction plates or an electronically actuated clutch. Here the fix is upstream: the inverter can cut or restore motor torque in under 10 milliseconds, an order of magnitude faster than any mechanical lock can bite, and the brake controller can lightly drag a spinning wheel to send torque across. The same path carries regeneration: on lift-off the wheels back-drive the case, the ring gear, and the motor, which is now a generator.',
      why: 'Carrying friction hardware to solve wheelspin would add mass and drag to solve a problem the inverter already solves faster. An open diff is the lightest, most efficient answer as long as something quick is watching the wheel speeds, and something very quick is.',
      fail: [
        'Sustained one-wheel spin, one wheel on a kerb ramp for example, scuffs the bevel pinion thrust faces; the traction controller caps spin duration to protect them.',
        'The equal-split rule means true split-grip launches are brake-assisted; the drag torque applied is energy deliberately wasted for mobility.',
      ],
      explode: [0, 0, -0.65],
    },
    halfshafts: {
      name: 'Halfshafts',
      tagline: 'Four steel shafts that carry full torque through 25 degrees of suspension travel.',
      mass: 16,
      count: 4,
      specs: [
        ['Shaft', 'Induction-hardened steel, 40 mm hollow'],
        ['Outer joint', 'Rzeppa six-ball, to 47 degrees'],
        ['Inner joint', 'Tripod, 23 mm axial plunge'],
        ['Rating', '3,400 Nm ultimate per shaft'],
        ['Compliance', '~8 degrees twist at peak torque'],
      ],
      how: 'Each shaft ends in two different joints because it has two different problems. The outer joint at the wheel is a Rzeppa: six balls in curved grooves that hold the driven and driving axes at exactly equal angles, so rotation passes through at constant velocity even at full steering lock or full bump. The inner joint at the drive unit is a tripod: three rollers in straight tracks, which transmits torque while the whole shaft plunges axially as the suspension arcs. Grease-packed rubber boots seal both; the boot is the true life-limiting component.\n\nThe shaft itself is deliberately the softest torsional element in the drive path, winding up about 8 degrees at peak torque. That compliance stores energy, and with 2,750 Nm applied in tens of milliseconds it would oscillate the whole car fore-aft at around 9 Hz. The motor controller closes a damping loop on measured speed ripple and cancels the oscillation electronically, which is why a violent launch feels like one clean shove rather than a shudder.',
      why: 'Hollow shafts carry torque in their outer fibres where the material actually works, saving roughly a third of the mass of solid bar. Equal-length shafts left and right, arranged by centring each drive unit, keep joint angles symmetric so full torque does not tug the steering.',
      fail: [
        'A torn boot is the dominant field failure: grease leaves, grit enters, and the joint announces itself by clicking on full-lock turns months later.',
        'Every drive-to-regen transition crosses joint and spline lash; torque is ramped through zero in about 50 ms, because letting it snap through is audible as driveline clunk.',
        'Kerb-strike overload is protected by the traction controller cutting torque faster than the shaft can reach its ultimate rating.',
      ],
      explode: [0, 0, 0.75],
    },
    inverter: {
      name: 'Rear inverter',
      tagline: 'Three phases from one battery: 620 amps choreographed ten thousand times a second.',
      mass: 10,
      specs: [
        ['DC input', '250 to 450 V, 355 V nominal'],
        ['Peak phase current', '620 A'],
        ['Switching', '10 kHz, space-vector PWM'],
        ['DC link', '480 uF film capacitor'],
        ['Peak efficiency', '99.3%'],
        ['Torque accuracy', 'within 2% of demand'],
      ],
      how: 'The battery supplies DC; the motor needs three sinusoidal currents whose frequency and phase track the rotor exactly. Six switches, two per phase, connect each motor terminal to either battery rail 10,000 times a second, and space-vector modulation of the pulse widths makes the average of that chopping a clean sine. A film capacitor across the DC input absorbs the ampere-scale ripple this creates, so the battery and its cabling see smooth current. A control loop reads two phase currents and the rotor angle every switching cycle and lands delivered torque within 2% of demand, which is the number that makes traction control by inverter possible.\n\nThe same hardware runs backwards without modification. Lift off or brake, and the controller retards the current angle: the machine generates, the switches rectify, and up to 150 kW flows into the pack. Around 70% of all braking energy in normal driving returns through this box, which is worth more range than most aerodynamic measures.',
      why: 'This platform stays at 400 V-class where the industry argument increasingly says 900 V. The case for 900 V is real: half the current for the same power, half the conductor copper, and 350 kW charging without extreme cable cooling. It is weakest exactly here, in a rear unit sitting 300 mm from the pack terminals with almost no cable to save, and SiC conduction losses at 620 A are affordable. The 900 V argument is won or lost in the charging spec and the wiring harness, not in this housing; when the pack architecture moves, this inverter changes dies and nothing else.',
      fail: [
        'Film capacitor capacitance fades with heat and ripple over years; it is sized with 20% margin and its health is inferred from ripple voltage telemetry.',
        'A current sensor drifting reads as torque error at the wheels; two sensors cross-check and the third phase is reconstructed as an arbiter.',
        'Resolver loss drops the drive into a sensorless observer mode: full torque below base speed is not guaranteed, but the car limps home.',
      ],
      explode: [0, 0.5, 0],
    },
    'power-modules': {
      name: 'SiC power modules',
      tagline: 'Three silicon carbide half-bridges: the transistors that made 99% inverters normal.',
      mass: 3,
      count: 3,
      specs: [
        ['Die', 'SiC MOSFET, 750 V class'],
        ['Parallelism', '8 dies per switch position'],
        ['On resistance', '1.1 mOhm per switch, 25 °C'],
        ['Switching edge', 'up to 10 kV/us'],
        ['Cooling', 'Double-sided direct liquid'],
      ],
      how: 'Each module is one phase: a high switch and a low switch, eight silicon carbide MOSFET dies in parallel per switch sharing the 620 A. The IGBT this technology replaced is a bipolar device: it drops a fixed ~0.9 V knee at any current and drags a tail of stored charge through every turn-off. A SiC MOSFET is a plain resistive channel, 1.1 mOhm here, with no knee and no tail. At the 50 to 100 A of ordinary driving, conduction loss falls by two-thirds and switching loss by around five times, and partial load is where a car spends nearly its whole life.\n\nParalleling eight dies works because a MOSFET channel has a positive temperature coefficient: a die running hot gains resistance and sheds current to its neighbours, so the set self-balances. The dies are sintered between two ceramic substrates with coolant on both faces, roughly halving thermal resistance versus single-sided mounting. The 10 kV/us switching edges that make the loss numbers possible are also a liability, stressing motor insulation and radiating interference, so gate resistors are tuned to the slowest edge that still meets the efficiency target.',
      why: 'SiC costs two to three times silicon per amp and repays it in the energy budget: 2 to 4% more of the pack reaches the wheels across the real usage profile, which is several kilograms of battery bought back, plus a smaller cooling loop because the loss it does make is halved.',
      fail: [
        'Cosmic-ray neutrons can trigger single-event burnout in high-voltage dies; the fleet-level fix is operating at roughly 60% of rated voltage, which is why 750 V-class dies serve a 450 V bus.',
        'Thermal cycling fatigues the sinter and substrate interfaces over tens of thousands of cycles; on-state voltage is trended in service as the wear indicator.',
        'Gate oxide threshold drift is the SiC-specific ageing mode, managed by conservative gate drive voltage at some cost in on-resistance.',
      ],
      explode: [0, 0.85, 0],
    },
    'front-unit': {
      name: 'Front drive unit',
      tagline: 'An induction machine that can vanish: no magnets, so nothing to drag when it is switched off.',
      mass: 76,
      specs: [
        ['Machine', 'Induction, cast copper rotor cage'],
        ['Peak output', '150 kW / 250 Nm'],
        ['Reduction', '7.6:1 single speed'],
        ['Drag when off', 'Near zero, field collapses'],
        ['Service', 'Sealed for life, no drain plug'],
      ],
      how: 'An induction machine has no magnets. Its rotor is a cage of cast copper bars; the stator field must run slightly faster than the rotor, and that slip induces currents in the cage which create the rotor field from nothing. The cost is that magnetising current, roughly 30% of the total, does no work, so a running induction machine trails a permanent-magnet machine by about 3 points of efficiency. The benefit is the off state: cut the stator current and the rotor field simply ceases to exist. The unit freewheels with bearing drag only, while a spinning PM motor would generate voltage and churn iron loss every metre of every trip.\n\nThat asymmetry is the whole two-motor strategy: one of each type per car. The rear PMSM, efficient but never able to switch off, drives the axle that always works. The front induction unit is inert on the motorway and summoned in tens of milliseconds for launch, low grip, or hard braking, when forward weight transfer loads the front tyres and front regeneration can harvest what the rear alone cannot. Mechanically it mirrors the rear, its own 7.6:1 gearset and open differential in one casting, but it is sealed for life: no spray gallery, no serviceable oil, because its duty cycle is a fraction of the rear unit’s.',
      why: 'Two PM motors would cost 4 to 6% of motorway consumption in magnet drag or demand disconnect clutches to avoid it. Two induction motors would give up efficiency on every urban trip. One of each takes the best operating region of both, and lets the front axle be built cheaper because it works a fraction of the time.',
      fail: [
        'Slip is heat by definition, made in a rotor with no direct cooling; sustained duty, a long alpine climb, derates the front unit first and the rear carries on alone.',
        'Thermal cycling can crack a cage bar where it meets the end ring; the signature is a torque ripple at slip frequency, detectable in phase current before it is perceptible.',
        'Sealed-for-life lubrication is a bet that the low duty cycle keeps the oil young; the unit is not serviceable without replacement.',
      ],
      explode: [0.4, -0.05, 0],
    },
    'front-inverter': {
      name: 'Front inverter',
      tagline: 'Mostly asleep by design: the switch that decides whether the front axle exists.',
      mass: 9,
      specs: [
        ['Peak output', '150 kW'],
        ['Modules', 'Same SiC half-bridges as rear'],
        ['Idle state', 'Gates off, zero switching loss'],
        ['Wake to full torque', '< 20 ms'],
        ['Rotor sensing', 'Sensorless flux observer'],
      ],
      how: 'Controlling an induction machine is an estimation problem. There are no magnets whose angle a resolver can report; the quantity that matters is the rotor flux, which exists only while current makes it exist. The controller runs a flux observer, a real-time model fed by phase currents and shaft speed, and steers torque through the estimated field. It is mature theory, but it degrades near zero speed where the model loses signal, so the controller injects brief test pulses when creeping, felt by nobody and essential to the estimate.\n\nThe defining state of this box is off. At cruise the gates are simply held off, the channels open-circuit: no switching, no magnetising current, no loss at all on the front axle, while the torque arbiter runs everything through the rear. On a slip event, a launch request, or hard braking it goes from silent to 150 kW in under 20 milliseconds, about one wheel revolution at motorway speed. Under braking it takes the larger regeneration share, because weight transfer means the front tyres can react braking force the rears cannot.',
      why: 'It shares its SiC power modules with the rear inverter, one part number, one qualification, one supply line, and differs only in count of parallel dies and in software. Sizing it at 150 kW covers every traction and braking case; a larger front inverter would spend its life asleep at a higher price.',
      fail: [
        'The flux observer inherits every sensor error; a miscalibrated current sensor shows up as torque ripple at low speed, caught by end-of-line self-test.',
        'Wake latency is a hard budget: 20 ms is fine for grip control, but it means the front axle cannot be the first responder to a fault on the rear.',
        'Its cold plate is sized for its duty cycle, not its peak; repeated back-to-back launches thermally derate the front axle before the rear.',
      ],
      explode: [0.35, 0.45, 0],
    },
  },
};

/* ── Geometry ── */

/* Rear unit axes in the x-y plane, motor axis along z.
   A = motor / input pinion axis, B = intermediate (lay) axis, C = ring gear,
   differential and halfshaft axis at wheel-centre height. Centre distances
   match the gear radii below (23:56 then 26:86). */
const A = [-1.48, 0.38];
const B = [-1.495, 0.458];
const C = [-1.45, P.wheelY];      // 0.355
const GZ = -0.25;                 // gear case centre plane, z

/* Cylinder with its axis along z instead of y. */
function zc(mesh) { mesh.rotation.x = Math.PI / 2; return mesh; }

/* Annulus (ring) extruded along z, centred on its own origin. */
function ringMesh(rOut, rIn, depth, mat, seg = 32) {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOut, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, rIn, 0, Math.PI * 2, true);
  s.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: seg });
  geo.translate(0, 0, -depth / 2);
  return lib.mesh(geo, mat);
}

/* One halfshaft, built centred on its own origin so lib.spin works.
   Local +z points outboard. Spans local z -0.2425 .. 0.2425. */
function halfshaft() {
  const g = new THREE.Group();
  const shaft = zc(lib.cyl(0.022, 0.40, M.steel, 16));
  g.add(shaft);
  for (const s of [-1, 1]) {
    const joint = zc(lib.cyl(0.036, 0.055, M.darkSteel, 18));
    joint.position.z = s * 0.215;
    g.add(joint);
    /* CV boot: cone tapering from the joint toward the shaft */
    const boot = lib.cone(0.042, 0.07, M.rubber, 20);
    boot.rotation.x = s * Math.PI / 2;   /* apex toward shaft centre */
    boot.position.z = s * 0.155;
    g.add(boot);
  }
  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* ── housing: clamshell, open on +z so the internals show ── */
  const housing = lib.part('housing', [0, -0.2, 0]);
  const drum = lib.mesh(new THREE.CylinderGeometry(0.134, 0.134, 0.20, 36, 1, true), M.castAlu);
  zc(drum).position.set(A[0], A[1], -0.07);
  housing.add(drum);
  const endWall = zc(lib.cyl(0.134, 0.014, M.castAlu, 36));
  endWall.position.set(A[0], A[1], -0.168);
  housing.add(endWall);
  /* gear case: overlapping short drums around the three gear axes */
  for (const [ax, r] of [[A, 0.075], [B, 0.062], [C, 0.105]]) {
    const caseDrum = zc(lib.cyl(r, 0.10, M.castAlu, 32));
    caseDrum.position.set(ax[0], ax[1], GZ);
    housing.add(caseDrum);
  }
  const caseFill = lib.box(0.09, 0.11, 0.10, M.castAlu);
  caseFill.position.set(-1.470, 0.405, GZ);
  housing.add(caseFill);
  /* bolt rings: front clamshell joint and rear gear cover */
  const rimBolts = lib.bolts(10, 0.127, 0.007, M.steel);
  rimBolts.rotation.x = Math.PI / 2;
  rimBolts.position.set(A[0], A[1], 0.032);
  housing.add(rimBolts);
  const coverBolts = lib.bolts(8, 0.092, 0.006, M.steel);
  coverBolts.rotation.x = Math.PI / 2;
  coverBolts.position.set(C[0], C[1], -0.302);
  housing.add(coverBolts);
  /* cast ribs along the motor drum */
  for (const a of [0.7, 1.57, 2.44, 3.84]) {
    const rib = lib.box(0.022, 0.012, 0.185, M.castAlu);
    rib.position.set(A[0] + Math.cos(a) * 0.139, A[1] + Math.sin(a) * 0.139, -0.07);
    rib.rotation.z = a;
    housing.add(rib);
  }
  /* oil-to-coolant heat exchanger on the sump, with water stubs */
  const oilCooler = lib.box(0.10, 0.032, 0.12, M.castAlu);
  oilCooler.position.set(-1.48, 0.246, -0.02);
  housing.add(oilCooler);
  for (const [zz, mat] of [[-0.055, M.coolant], [0.015, M.coolantHot]]) {
    const stub = lib.cyl(0.009, 0.05, mat, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(-1.42, 0.246, zz);
    housing.add(stub);
  }
  sys.add(housing);

  /* ── stator: lamination ring + copper end windings + phase leads ── */
  const stator = lib.part('stator', [0, 0, 0.35]);
  const lam = ringMesh(0.10, 0.068, 0.16, M.steel, 40);
  lam.position.set(A[0], A[1], 0.045);
  stator.add(lam);
  for (const zz of [-0.055, 0.145]) {
    const winding = lib.torus(0.083, 0.0145, M.copper, 30, 10);
    winding.position.set(A[0], A[1], zz);
    stator.add(winding);
  }
  for (let i = 0; i < 3; i++) {
    const lead = lib.cyl(0.008, 0.05, M.copper, 10);
    lead.position.set(-1.50 + i * 0.02, 0.50, 0.12);
    stator.add(lead);
  }
  sys.add(stator);

  /* ── rotor: spins about its own z in drive mode ── */
  const rotor = lib.part('rotor', [0, 0, 0.6]);
  const rotorSpin = new THREE.Group();
  const body = zc(lib.cyl(0.065, 0.155, M.steel, 28));
  rotorSpin.add(body);
  for (const s of [-1, 1]) {
    const plate = zc(lib.cyl(0.066, 0.006, M.darkSteel, 28));
    plate.position.z = s * 0.08;
    rotorSpin.add(plate);
  }
  const shaft = zc(lib.cyl(0.019, 0.50, M.steel, 16));
  shaft.position.z = -0.05;                       /* world z -0.305 .. 0.195 */
  rotorSpin.add(shaft);
  const resolver = zc(lib.cyl(0.033, 0.012, M.copper, 20));
  resolver.position.z = 0.14;
  rotorSpin.add(resolver);
  rotorSpin.position.set(A[0], A[1], 0.045);
  lib.spin(rotorSpin, 'z', 80);
  rotor.add(rotorSpin);
  sys.add(rotor);

  /* ── gearset: stepped cylinders on the three axes ── */
  const gearset = lib.part('gearset', [0, 0, -0.45]);
  const pinion = zc(lib.cyl(0.023, 0.052, M.steel, 24));
  pinion.position.set(A[0], A[1], GZ);
  gearset.add(pinion);
  const layBig = zc(lib.cyl(0.056, 0.026, M.steel, 36));
  layBig.position.set(B[0], B[1], -0.228);
  gearset.add(layBig);
  const laySmall = zc(lib.cyl(0.026, 0.036, M.steel, 24));
  laySmall.position.set(B[0], B[1], -0.267);
  gearset.add(laySmall);
  const layShaft = zc(lib.cyl(0.012, 0.10, M.darkSteel, 14));
  layShaft.position.set(B[0], B[1], GZ);
  gearset.add(layShaft);
  const ringGear = zc(lib.cyl(0.086, 0.030, M.steel, 44));
  ringGear.position.set(C[0], C[1], -0.272);
  gearset.add(ringGear);
  const ringWeb = zc(lib.cyl(0.055, 0.012, M.darkSteel, 28));
  ringWeb.position.set(C[0], C[1], -0.272);
  gearset.add(ringWeb);
  sys.add(gearset);

  /* ── differential: compact case on the ring gear axis + output stubs ── */
  const diff = lib.part('differential', [0, 0, -0.65]);
  const diffCase = zc(lib.cyl(0.048, 0.085, M.castAlu, 26));
  diffCase.position.set(C[0], C[1], -0.205);
  diff.add(diffCase);
  const diffBolts = lib.bolts(8, 0.036, 0.005, M.steel);
  diffBolts.rotation.x = Math.PI / 2;
  diffBolts.position.set(C[0], C[1], -0.252);
  diff.add(diffBolts);
  const stubOut = zc(lib.cyl(0.024, 0.045, M.steel, 16));
  stubOut.position.set(C[0], C[1], -0.29);
  diff.add(stubOut);
  /* intermediate shaft carrying drive to the far-side inner joint */
  const interShaft = zc(lib.cyl(0.016, 0.42, M.steel, 14));
  interShaft.position.set(C[0], C[1], 0.075);
  diff.add(interShaft);
  sys.add(diff);

  /* ── halfshafts: four, both axles, spinning, exploding outboard ── */
  for (const ax of [P.axleR, P.axleF]) {
    for (const s of [-1, 1]) {
      const hs = lib.part('halfshafts', [0, 0, s * 0.75]);
      const shaftG = halfshaft();
      shaftG.position.set(ax === P.axleR ? C[0] : 1.45, P.wheelY, s * 0.52);
      lib.spin(shaftG, 'z', 40);
      hs.add(shaftG);
      sys.add(hs);
    }
  }

  /* ── rear inverter: finned box on top of the housing ── */
  const inverter = lib.part('inverter', [0, 0.5, 0]);
  const invBody = lib.box(0.28, 0.062, 0.34, M.castAlu);
  invBody.position.set(-1.48, 0.582, 0);
  inverter.add(invBody);
  const invLid = lib.plate(0.26, 0.32, 0.008, 0.02, M.alu);
  invLid.position.set(-1.48, 0.617, 0);
  inverter.add(invLid);
  const invFins = lib.fins(0.13, 0.018, 0.30, 14, 0.005, M.alu);
  invFins.position.set(-1.535, 0.630, 0);
  inverter.add(invFins);
  /* three-phase feed down to the stator terminals */
  const acFeed = lib.tube([
    [-1.46, 0.575, 0.10],
    [-1.45, 0.535, 0.125],
    [-1.475, 0.475, 0.115],
    [-1.48, 0.44, 0.10],
  ], 0.014, M.hv);
  inverter.add(acFeed);
  /* DC input stub toward the pack */
  const dcBox = lib.box(0.05, 0.03, 0.06, M.hv);
  dcBox.position.set(-1.335, 0.575, -0.10);
  inverter.add(dcBox);
  const dcFeed = lib.tube([
    [-1.31, 0.575, -0.10],
    [-1.27, 0.545, -0.10],
    [-1.24, 0.50, -0.10],
  ], 0.012, M.hv);
  inverter.add(dcFeed);
  /* cold plate stubs */
  for (const zz of [-0.06, 0.02]) {
    const stub = lib.cyl(0.008, 0.04, M.coolant, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(-1.638, 0.575, zz);
    inverter.add(stub);
  }
  sys.add(inverter);

  /* ── SiC power modules: three finned blocks on the inverter deck ── */
  const modules = lib.part('power-modules', [0, 0.85, 0]);
  for (let i = 0; i < 3; i++) {
    const zz = (i - 1) * 0.11;
    const block = lib.box(0.075, 0.02, 0.09, M.plasticLt);
    block.position.set(-1.41, 0.631, zz);
    modules.add(block);
    const tab = lib.box(0.03, 0.004, 0.012, M.busbar);
    tab.position.set(-1.39, 0.643, zz);
    modules.add(tab);
    const mFins = lib.fins(0.06, 0.010, 0.08, 6, 0.004, M.alu);
    mFins.position.set(-1.425, 0.646, zz);
    modules.add(mFins);
  }
  sys.add(modules);

  /* ── front drive unit: sealed, simpler silhouette ── */
  const front = lib.part('front-unit', [0.4, -0.05, 0]);
  const fDrum = zc(lib.cyl(0.115, 0.24, M.castAlu, 32));
  fDrum.position.set(1.47, 0.38, 0.06);
  front.add(fDrum);
  const fNose = zc(lib.cyl(0.06, 0.05, M.castAlu, 24));
  fNose.position.set(1.47, 0.38, 0.20);
  front.add(fNose);
  const fCase = zc(lib.cyl(0.12, 0.11, M.castAlu, 32));
  fCase.position.set(1.45, 0.36, -0.13);
  front.add(fCase);
  const fBulge = zc(lib.cyl(0.075, 0.09, M.castAlu, 26));
  fBulge.position.set(1.45, P.wheelY, -0.21);
  front.add(fBulge);
  const fBolts = lib.bolts(8, 0.10, 0.006, M.steel);
  fBolts.rotation.x = Math.PI / 2;
  fBolts.position.set(1.45, 0.36, -0.188);
  front.add(fBolts);
  for (const a of [0.9, 1.57, 2.24]) {
    const rib = lib.box(0.020, 0.010, 0.22, M.castAlu);
    rib.position.set(1.47 + Math.cos(a) * 0.119, 0.38 + Math.sin(a) * 0.119, 0.06);
    rib.rotation.z = a;
    front.add(rib);
  }
  /* output stubs to the front inner joints */
  const fStub = zc(lib.cyl(0.024, 0.05, M.steel, 16));
  fStub.position.set(1.45, P.wheelY, -0.267);
  front.add(fStub);
  const fInter = zc(lib.cyl(0.016, 0.44, M.steel, 14));
  fInter.position.set(1.45, P.wheelY, 0.06);
  front.add(fInter);
  sys.add(front);

  /* ── front inverter: flat box on the front unit ── */
  const fInv = lib.part('front-inverter', [0.35, 0.45, 0]);
  const fInvBody = lib.box(0.24, 0.05, 0.28, M.castAlu);
  fInvBody.position.set(1.46, 0.535, 0);
  fInv.add(fInvBody);
  const fInvFins = lib.fins(0.20, 0.014, 0.24, 10, 0.005, M.alu);
  fInvFins.position.set(1.46, 0.567, 0);
  fInv.add(fInvFins);
  const fFeed = lib.tube([
    [1.40, 0.53, 0.10],
    [1.38, 0.50, 0.115],
    [1.42, 0.47, 0.10],
  ], 0.012, M.hv);
  fInv.add(fFeed);
  sys.add(fInv);

  return sys;
}
