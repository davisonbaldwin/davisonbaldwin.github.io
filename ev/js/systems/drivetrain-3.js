/* Drive units, generation 3: in-wheel motors, attempted honestly. The rear
   axle carries two rim-integrated motor rings (stator ring + rotor ring per
   corner) with rim-side GaN inverters, hub bearing units that double as
   motor structure, and service-loop cabling that inherits the CV boot's job
   of surviving motion. The Gen 2 axial-flux unit, evicted from the rear by
   the wheel motors, moves to the front axle and becomes the daily-drive
   machine; the Gen 1 induction unit leaves the car.

   Interface contract with wheels-3 (binding, see design/gen3.md): the rear
   motor rings own the annulus r 0.155..0.235, |z| 0.72..0.80 at the rear
   wheel centres. Rear-corner part groups explode z-outward at magnitude
   0.85; the motor rings get 0.12 extra outboard (0.97) so they clear the
   rim in the exploded state. The system-level explode is zero, matching
   wheels-3, so the shared rear corner stays level through the whole
   explode range and tears down as one assembly. Nothing here enters the
   rim/tire volume. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'drivetrain-3',
  name: 'Drive units · Gen 3',
  color: 0xe8a24c,
  explode: [0, 0, 0],
  blurb: 'Gen 3 builds the oldest sketch in EV design: motors in the wheels. Two rim-integrated rings drive the rear corners, the Gen 2 axial-flux unit moves to the front axle, and the system lands at 138 kg against Gen 2\'s 150, still 420 kW. The bill is unsprung mass, sealing, and flexing copper, and every part below itemizes its share.',
  parts: {
    'stator-rings': {
      name: 'Wheel motor stator rings',
      tagline: 'The gearbox is gone, so every newton-metre is made at full price: 15 kg of ring per corner, working at the rim.',
      mass: 30,
      count: 2,
      specs: [
        ['Topology', 'Outer rotor, 18 coils, 20 poles'],
        ['Working radius', '158 to 192 mm (Gen 2 disc: 100 to 145)'],
        ['Peak output per corner', '75 kW / 900 Nm, direct drive'],
        ['Continuous', '40 kW / 450 Nm per corner'],
        ['Fundamental frequency', '297 Hz at 225 km/h (Gen 2: 1.7 kHz)'],
        ['Cooling', 'Water jacket in the carrier bore, 6 kW per ring'],
      ],
      how: 'This is the Gen 2 axial-flux argument driven to its terminus. Gen 2 said torque is force times radius and moved the airgap out to 145 mm; Gen 3 puts it inside the wheel at 192, the largest radius the car owns. Each stator is a ring of 18 concentrated coils on pressed soft magnetic composite teeth, facing outward at a rotor ring that surrounds it. What the layout deletes is everything between motor and road: no 5.95:1 gearset multiplying every newton-metre, no differential, no halfshafts. What it forfeits is the multiplication itself. A machine that must make 900 Nm at its own airgap, instead of 450 Nm ahead of the gears, needs airgap shear area in proportion, and 900 Nm from a 76 mm wide gap at 195 mm radius works out to roughly 50 kPa of magnetic shear stress, the ragged upper edge of what liquid-cooled permanent-magnet machines achieve. That is why the pair weighs 30 kg to produce two thirds of the wheel torque the Gen 2 rear made through its gearbox.\n\nThe machine is slow where its ancestors were fast, and the physics reshuffles accordingly. Top wheel speed is 1,780 rpm, so the electrical fundamental peaks at 297 Hz where Gen 2 ran 1.7 kHz: iron loss stops mattering and the lamination-versus-composite argument goes quiet. The new worst case is heat with no motion. A hill hold or a trailer creep parks full current in one phase indefinitely, and with the rotor stopped there is no rotation to share the heating across coils: one coil takes triple duty, and the thermal observer that Gen 1 ran for its winding hot spot returns here with a zero-speed term added. Heat leaves through the carrier bore water jacket, and the wheels-3 cover pulls air across the outboard face with its extraction vanes, a cooling path that crosses a module boundary and is co-designed on both sides of it.',
      why: 'The pair plus its corner electronics weighs 79 kg where the Gen 2 rear hardware it deletes weighed 57: housing, stator discs, rotor disc, gearset, differential, integrated inverter, power modules and both rear halfshafts, all gone, and the axle still came out 22 kg heavier. Worse, about 28 kg per corner of the new total is unsprung: rear wheel hop drops from roughly 13 to 10.5 Hz, contact patch load variation on a broken surface rises about 15%, and the semi-active dampers claw back perhaps half of that at the top of their bandwidth. The 138 kg system target is rescued entirely by the front-axle swap. This is the ledger in-wheel drive has faced for a century; Gen 3 ships it for what the corners can now do, not for what they weigh.',
      fail: [
        'The motor lives where brakes live: road spray, winter salt, pressure-washer lances at 80 bar. Its first line of defence is the hub bearing seal, and a failed lip seal now floods a stator instead of wetting a drum.',
        'Zero-speed full torque is the thermal worst case, and it happens on driveways: the derate that protects one overworked coil arrives exactly when a driver is holding the car against a kerb ramp with a trailer on.',
        'Torque ripple lands directly on the unsprung mass with no gear mesh or halfshaft compliance to filter it; the 18-slot 20-pole combination is chosen for low cogging, and what remains is cancelled by injection, per corner, forever.',
      ],
      explode: [0, 0, 0.97],
    },
    'rotor-rings': {
      name: 'Wheel motor rotor rings',
      tagline: 'A Halbach magnet ring bolted to the rim barrel: after three generations, the wheel itself is the rotor.',
      mass: 16,
      count: 2,
      specs: [
        ['Magnets', 'NdFeB, 20 poles, Halbach array'],
        ['Back iron', 'None. The array self-closes its flux'],
        ['Mounting', 'Twelve titanium bolts to the wheels-3 rim flange'],
        ['Speed range', '0 to 1,780 rpm (Gen 2 disc: 10,000)'],
        ['Airgap', '1.0 mm radial, bearing-controlled'],
        ['Drag, gates off', '~60 W per corner at 110 km/h'],
      ],
      how: 'Each ring is twenty NdFeB poles arranged as a Halbach array: between every radially magnetised pole sits a segment magnetised tangentially, steering flux so the array is strong on its inner face, toward the stator, and nearly silent on its outer face. That trick deletes the rotor back iron the way Gen 2\'s through-magnetised disc did, but for a different reason: not because flux passes straight through, but because the magnets themselves close the return path. The ring has no rim of its own. The wheels-3 rear rim barrel is the structural carrier, per the interface contract: the barrel leaves the motor annulus void, provides a machined flange at the 720 mm plane, and twelve titanium bolts carry the entire drive torque from ring to barrel to tire. The torque path from airgap to contact patch is two parts and one bolted joint, where Gen 1 ran a rotor, a shaft, two gear stages, a differential, a halfshaft and two CV joints.\n\nSpeed, the terror of every previous rotor, is not a problem here, and honesty requires saying what replaced it. At 1,780 rpm the magnet tip speed is 39 m/s; Gen 2\'s carbon hoop held 153. Retention is sized by torque reversal fatigue at the bolts, not centrifugal load, and the bridges and hoops of Gen 1 and Gen 2 have no successor. The new liability is that the ring turns whenever the car moves, because a wheel cannot freewheel from its own rim. Back-EMF is always present, and with the gates off the magnets still sweep the stator teeth and pay about 60 W per corner in iron loss at motorway speed. Gen 1 built its entire front axle around an induction machine so that number could be zero. Gen 3 knowingly gives that up, and the system-level accounting for it lives in the front unit entry.',
      why: 'A direct-bolted magnet ring is the entire mechanical transmission of this axle. It is also the first rotor in three generations whose retention analysis is boring, and that is the trade in miniature: in-wheel drive swaps the hard problems the company had learned to solve, containment, gear noise, boot life, for new ones, corrosion, heat soak, and fretting, that its fleet data says nothing about.',
      fail: [
        'The wheels-3 park-and-rescue drum lives inside this ring, and a dragged rescue stop is a heat source millimetres from magnets; the corner controller trades braking to the front friction discs when magnet temperature models approach the demagnetisation knee.',
        'NdFeB corrodes enthusiastically, and this ring lives in wheel wash; a stone chip through the epoxy coat lets a pole swell and delaminate, so the rings get a visual inspection at every tire change, a service line item no previous generation had.',
        'Every drive-to-regen transition reverses torque through the twelve flange bolts. The lash crossings Gen 1 and Gen 2 softened in gear teeth now live in a friction-critical bolted joint, and fretting at that flange is the wear mode the torque-stretch spec exists to prevent.',
      ],
      explode: [0, 0, 0.97],
    },
    'hub-bearings': {
      name: 'Hub bearing units',
      tagline: 'In Gen 2 a worn wheel bearing hummed. Here it closes an airgap: the bearing is motor structure now.',
      mass: 18,
      count: 2,
      specs: [
        ['Type', 'Double-row angular contact, preloaded'],
        ['Bore', '120 mm (a Gen 2 rear corner: 85)'],
        ['Airgap budget', '0.35 of the 1.0 mm gap is bearing tilt'],
        ['Magnetic side pull', '~4 kN per mm of eccentricity'],
        ['Grounding', 'Shaft ring, inverter common-mode return'],
        ['Mass', '9 kg per corner, carrier web included'],
      ],
      how: 'Every force between the car and the rear contact patch passes through this bearing, which was always true of wheel bearings; what is new is that the motor\'s geometry passes through it too. The rotor ring is centred by nothing except this bearing, across a 1.0 mm radial airgap, and a permanent-magnet ring is a negative spring: displace it 0.1 mm off centre and the magnetic pull on the near side grows by about 400 N, rewarding the displacement. The bearing must out-stiffen that inverted spring with margin, under a 0.9 g cornering load, on a corner that also absorbs potholes. Hence the growth: a 120 mm bore double-row unit, preloaded, where a Gen 2 rear corner carried 85 mm, and a five-spoke carrier web cast around the housing that carries the stator ring bore and the inverter. The web is the drive unit housing of this generation, shrunk to a wheel\'s width.\n\nTwo old enemies follow the architecture here. Gen 1 named bearing currents in its rear unit: fast inverter edges micro-arcing through the races. This corner puts the inverter on the same casting as the bearing, so the common-mode path is shorter and hungrier, and a copper grounding ring on the hub shaft gives the current its harmless way home, same fix, higher stakes. And the bearing seal doubles as the motor\'s environmental seal: the labyrinth that keeps spray out of the races now also keeps it off the windings behind them. The seal drag that every bearing engineer fights for grams of is spent deliberately here, because the alternative is a wet stator.',
      why: 'Four of the 22 kg the rear axle gained are in these bearings, and they are the least optional mass in the system. Gap collapse is not a wear item to be caught at service: it is a magnet ring meeting a coil ring at wheel speed. The bearing is sized for the negative spring plus the worst pothole of its life, and the sizing argument closes with a test, not an analysis.',
      fail: [
        'A hard pothole strike can brinell the races: dents measured in microns that turn into a once-per-revolution gap variation, which is a force ripple at the wheel rate; drivers report it as a hum that was not there yesterday, and the fix is a corner, not a bearing.',
        'The grounding ring is a wear part in a place nobody looks; when its fibres wear or its track dries, inverter common-mode current returns to the path of least resistance, which is the race the ring existed to protect.',
        'Preload relaxes over life and every micron of new tilt spends airgap budget; the service test is back-EMF ripple measured per corner at a slow roll, a diagnostic invented for this car because no previous bearing failure mode needed it.',
      ],
      explode: [0, 0, 0.85],
    },
    'gan-inverters': {
      name: 'Rim-side GaN inverters',
      tagline: 'A 75 kW inverter that rides the wheel and shrugs off 40 g, built around the capacitor that could not come along.',
      mass: 7,
      count: 2,
      specs: [
        ['Topology', 'Three-level flying capacitor, 650 V GaN'],
        ['Bus', '508 V nominal; each switch sees half'],
        ['Switching', '100 kHz per device, 200 kHz ripple'],
        ['DC link', 'Ceramic stack, 12 uF (Gen 2: 190 uF film)'],
        ['Vibration rating', '40 g on the carrier (body boxes: 3)'],
        ['Peak phase current', '260 A'],
      ],
      how: 'Gen 2 integrated its inverter into the housing face and called the deleted cable a win. Gen 3 has no housing, so the inverter bolts to the carrier web behind the stator and inherits the corner\'s ride: 40 g of vibration where a body-mounted box sees 3. The component that cannot take that ride is the film capacitor. Gen 2\'s 190 uF DC link was a fist-sized wound film block, microphonic and mounted on lugs, and no amount of potting qualifies it for a wheel. The topology is chosen to delete it: a three-level flying-capacitor bridge halves the voltage each switch sees, so 650 V gallium nitride dies serve battery-3\'s 508 V bus at 39% of their rating, where a two-level bridge on the same bus would have to reach for the 900 V silicon carbide Gen 2 used, and it doubles the effective ripple frequency. At 200 kHz effective, 12 uF of stacked ceramic does the smoothing work 190 uF of film did at 24 kHz, and ceramic is a rock: no windings, no resonance, no vibration derating.\n\nGaN pays its way in a second, quieter place. This machine\'s fundamental peaks at 297 Hz, so switching speed is not needed for waveform fidelity the way Gen 2\'s 1.7 kHz motor demanded; it is needed for torque quality. A wheel motor has no gear lash and no halfshaft windup, so there is no mechanical compliance between a current error and the road. The 100 kHz loop holds torque smooth to a fraction of a percent, which is what lets the ripple content on the stator entry stay honest. And it closes a three-generation software story: Gen 1 ramped torque through zero in 50 ms to hide driveline lash, Gen 2 kept the ramp, and this corner deletes the code, because there is no lash left to cross.',
      why: 'One inverter per motor was never optional. The alternative is three chopped phases at 260 A flexing through the service loop, radiating 200 kHz harmonics from a moving antenna. Putting the bridge on the corner means the loop carries quiet DC on two conductors, and the last metre of the car\'s power electronics is solid busbar, exactly the argument Gen 2 made for integration, relocated to the worst mounting environment on the vehicle.',
      fail: [
        'Automotive GaN at wheel-level vibration has a fleet history measured in years, not decades; the solder and sinter joints are the reason this part number, alone in the system, carries a five-year preventive replacement interval while the data accumulates.',
        'A flying-capacitor bridge must keep its levels balanced or one die sees more than half the bus; balancing is active and monitored every cycle, and a drifting sense divider forces a corner derate on suspicion, because the failure it prevents is a fired die at speed.',
        'The cold plate shares the stator jacket, so a mountain descent that heats the motor also heats the silicon; the corner derates as one unit, and the front axle, per its Gen 1 heritage, carries on alone.',
      ],
      explode: [0, 0, 0.85],
    },
    'service-loops': {
      name: 'Service-loop cabling',
      tagline: 'Gen 1 and Gen 2 flexed steel through rubber boots. Gen 3 flexes copper, and copper keeps score.',
      mass: 6,
      count: 2,
      specs: [
        ['Conductors', '2 x 25 mm² DC, class 6 fine strand'],
        ['Flex cycles at design life', '~2 x 10^8'],
        ['Bend radius', '90 mm minimum, jacket-enforced plane'],
        ['Slack', '110 mm of wheel travel plus 25 reserve'],
        ['Health monitor', 'Loop resistance trended every drive'],
      ],
      how: 'The halfshaft is gone from this axle, but its hardest job, surviving relative motion for 240,000 km, did not disappear; it moved into this cable, and the cable is engineered like the joint it replaced. The conductors are class 6 fine-strand copper, hundreds of hair-fine strands per core, because bending strain lives at the strand surface and thin strands keep it near 0.1%. The EPDM jacket carries a moulded flat rib that makes the loop stiff in one plane and soft in the other, so 110 mm of suspension travel becomes pure bending at a controlled 90 mm radius, never torsion, and both end fittings clamp the jacket against rotation so the geometry cannot wander. Copper has no true fatigue limit; the design lives on keeping strain low and on statistics, and the statistics are thin, which is why the loop is built to be watched.\n\nGen 1 named the CV boot its dominant field failure: grease out, grit in, a click on full lock months later. The loop is that villain\'s heir, and it fails more quietly: strands break one at a time, invisibly, resistance climbs by micro-ohms, and heat concentrates at the break, in a cable that is moving, at 508 V. So the car refuses to wait for symptoms. The corner controller knows its DC current and measures voltage drop across the loop every drive; the resistance trend is telemetry, a rising slope books a service visit, and the loop itself is a two-connector, fifteen-minute replacement priced like the wear part it is. The boot taught the lesson that moving parts announce failure too late; the loop is the first moving part in the driveline designed from day one to be told on.',
      why: 'In-wheel drive lives or dies at this cable. Every analysis that kills the concept on paper cites unsprung mass first and this cable second, because a motor in the wheel is exactly as reliable as the copper that crosses the suspension gap to feed it. Treating the loop as a designed, monitored, scheduled-replacement component, rather than as wiring, is the difference between an engineered answer and the concept-car versions that preceded it.',
      fail: [
        'A mis-clipped guide lets the jacket chafe on the carrier web edge; the insulation monitor sees the first leakage to chassis and isolates the corner, which is why the guide clips are captive and the routing is single-possibility by design.',
        'Connector fretting at the corner end mimics strand fatigue in the telemetry, micro-motion at the pins raising resistance the same slow way; the trend cannot distinguish them, so a flagged loop is replaced with both its connectors, no diagnosis attempted.',
        'EPDM stiffens toward -30 °C and the effective bend radius tightens; the first kilometres of a cold morning are the highest-strain cycles of the loop\'s life, and the fatigue model books them at triple weight.',
      ],
      explode: [0, 0, 0.85],
    },
    'tv-controller': {
      name: 'Torque-vectoring controller',
      tagline: 'The one thing only in-wheel does better, in one box: yaw by arithmetic instead of friction.',
      mass: 2,
      specs: [
        ['Loop rate', '1 kHz per-corner torque, 100 Hz yaw'],
        ['Yaw authority', '±2,200 Nm continuous, no steering input'],
        ['Split', 'Any rear pair, including one wheel in regen'],
        ['Safety', 'Dual channel, dissimilar code, 5 ms cross-check'],
        ['Fallback', 'Both rings to zero; front unit drives on'],
      ],
      how: 'Gen 1 stated the open differential\'s vice plainly: it can only send both wheels what the more slippery one can take, and its fix was an inverter cutting total torque in under 10 ms plus a brake dragging the spinning wheel to shove torque across, energy deliberately wasted for mobility. Gen 2 resized that diff and admitted it could not out-think it. Gen 3 deletes the constraint instead: two rear motors share no mechanical path, so the split is any pair of numbers the tires can use. On a split-grip launch the icy wheel takes its own cut while the gripping wheel keeps everything; the equal-split rule is repealed after two generations, and the brake stays cold. With opposite signs, one ring driving 450 Nm while the other regenerates 450, the rear axle applies about 2,200 Nm of yaw moment with the steering straight, energy flowing from one wheel into the pack and back out to its neighbour.\n\nDaily, the authority is spent in small change: a few tens of newton-metres of asymmetry tightens a motorway curve without a steering correction, phase-leading the yaw response in a lane change faster than the front tires can build force, and shrinking the parking turn circle by dragging the inside wheel backward. The controller runs each corner\'s torque loop at 1 kHz above a 100 Hz yaw layer, and its safety case mirrors the Gen 2 brake unit\'s: an actuator this authoritative fails dangerous, not safe. A stuck-high wheel motor is a yaw fault, so two channels running dissimilar code compare demanded against measured torque per corner and gate both rings to zero within 5 ms of disagreement, leaving the front unit to drive the car home.',
      why: 'Three generations funded this box\'s authority, and the honest verdict the design brief demanded belongs here. The mass ledger of in-wheel barely pays: 12 kg saved, all of it from the front swap, with 22 kg added unsprung where mass hurts most. The sealing, fatigue and vibration bills are real and itemized on every neighbouring part, and the bill reaches the premium ledger too: the pothole strike that was a bearing claim in Gen 2 is a corner assembly claim here, and insurers price the rear axle as the drive unit it now is. Per-wheel torque authority is the single return no central machine, however good, can ever match, and it is the entire reason Gen 3 exists. Whether it is reason enough is a question the fleet will answer, not this panel.',
      fail: [
        'A software fault is now a yaw fault by definition; the dissimilar dual-channel architecture is borrowed from the Gen 2 brake-by-wire unit, along with its certification burden, and every release pays the doubled validation bill.',
        'Vectoring steers against an estimated tire grip, and a wrong estimate on patchy ice produces an intervention the slower stability-control layer above must catch; the hierarchy is tested by injecting lies into the estimator, which is as uncomfortable as it sounds.',
      ],
      explode: [0, 0.5, 0],
    },
    'front-unit': {
      name: 'Front drive unit (Gen 2 axial flux)',
      tagline: 'The Gen 2 rear machine, evicted by the wheel motors, takes over the front axle: displaced hardware, proven twice.',
      mass: 59,
      specs: [
        ['Machine', 'Yokeless axial flux, 270 kW / 450 Nm'],
        ['Reduction', '5.95:1 and open diff, carried with it'],
        ['Mass detail', '49 kg unit + 8 kg halfshafts + 2 kg mounts'],
        ['New duty', 'Primary axle: cruise, most regen'],
        ['Displaced', 'Gen 1 induction front unit leaves the car'],
        ['NVH', '1.7 kHz fundamental, now ahead of the bulkhead'],
      ],
      how: 'Gen 2 built its best machine for the rear axle; Gen 3\'s wheel rings evicted it. Rather than shelve the densest power-per-kilogram hardware the programme owns, the whole unit moves to the front: the two shallow dishes, the 24-coil segmented stators, the carbon-hooped 20-pole rotor disc, the 5.95:1 gearset, the open differential, and the 900 V class SiC inverter in its cast pocket, bolt for bolt. The bus underneath it rose, 462 V on the Gen 2 pack to 508 on this one, which the inverter absorbs without a part number changing because Gen 2 qualified its input window to 570 V and its dies to 900. Three things changed: the mounts, the halfshaft lengths, and one oil baffle, because a 1 g regenerative stop on the front axle slings the sump forward away from the pickup in a way the rear installation never saw. The induction unit it replaces was carried into Gen 2 on the argument that its off state, field collapsed, near-zero drag, could not be improved. That argument is now dead, killed by this generation\'s own rear axle: wheel motors cannot disconnect from their wheels, the car is permanently magnetic at both ends regardless, so the freewheeling-axle doctrine of Gen 1 and Gen 2 no longer buys anything, and the less efficient machine loses its only defence.\n\nThe duty cycle inverts with the move. For two generations the rear axle worked every trip while the front waited to be summoned; now the front is the daily machine, pushing cruise torque through its gears at 96 to 97% while the rear rings coast gates-off, paying their 120 W of magnet drag, waking for launch, grip and vectoring. Regeneration moves forward too, onto the axle that load transfer favours under braking, the same physics Gen 1 cited when it sized the front for harvest. The carry-over is the second in a row for this axle slot, and the content of that fact is worth stating: the front axle has not had a clean-sheet machine since Gen 1, because twice running, the optimization budget was spent where the physics had more to give.',
      why: 'A displaced part is the strongest kind of carry-over: hardware with a fleet behind it, doing an easier job than the one it was designed for. A machine that held 270 kW on the working axle loafs at 20 kW of cruise load on this one, deep in its efficiency island. Gen 3\'s risk ledger is concentrated entirely at the rear corners, and this axle is where the programme stored its certainty.',
      fail: [
        'Full torque now passes through steered Rzeppa joints at angles the rear installation never saw; Gen 1\'s boot statistics, the best-known numbers in the company, do not transfer to the new joint angles, and boot life restarts as an open question.',
        'The relocated sump baffle is the one internal change, which makes it the one unproven component inside a twice-proven unit; oil starvation under combined braking and cornering is the case the rig week was bought for.',
        'The 20-pole whine at 1.7 kHz, managed in Gen 2 by distance and harmonic injection, now lives a bulkhead away from the driver\'s feet; the injection carries over but its margin is thinner, and the fleet microphones will say whether it holds.',
      ],
      explode: [0.4, -0.05, 0],
    },
  },
};

/* ── Geometry ── */

const RX = P.axleR;             // -1.45, rear axle x
const WY = P.wheelY;            // 0.355
const RING_Z = 0.76;            // motor annulus centre plane, |z|

/* Front unit axes, mirrored in x from drivetrain-2's rear installation. */
const A3 = [1.48, 0.40];        // motor disc axis
const B3 = [1.505, 0.458];      // intermediate axis
const C3 = [1.45, P.wheelY];    // ring gear / halfshaft axis
const GZ3 = -0.16;              // gear case centre plane, z

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

/* One halfshaft, centred on its own origin so lib.spin works.
   Local +z points outboard. Same forgings as Gen 1 and Gen 2. */
function halfshaft() {
  const g = new THREE.Group();
  const shaft = zc(lib.cyl(0.022, 0.40, M.steel, 16));
  g.add(shaft);
  for (const s of [-1, 1]) {
    const joint = zc(lib.cyl(0.036, 0.055, M.darkSteel, 18));
    joint.position.z = s * 0.215;
    g.add(joint);
    const boot = lib.cone(0.042, 0.07, M.rubber, 20);
    boot.rotation.x = s * Math.PI / 2;
    boot.position.z = s * 0.155;
    g.add(boot);
  }
  return g;
}

/* Rotor ring: Halbach magnet ring on a steel carrier, bolted to the rim
   flange at the |z| = 0.72 plane. Lives entirely inside the contract
   annulus (r 0.155..0.235, |z| 0.72..0.80). Spins with the wheel. */
function rotorRingPart(s) {
  const part = lib.part('rotor-rings', [0, 0, s * 0.97]);
  const spinG = new THREE.Group();
  /* magnet carrier starts outboard of the nut circle so the fasteners
     stay visible on the flange face */
  const carrier = ringMesh(0.235, 0.212, 0.062, M.steel, 48);
  carrier.position.z = s * 0.007;
  spinG.add(carrier);
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    const mag = lib.box(0.012, 0.052, 0.058, M.cell);
    mag.position.set(Math.cos(a) * 0.205, Math.sin(a) * 0.205, s * 0.003);
    mag.rotation.z = a;
    spinG.add(mag);
  }
  const flange = ringMesh(0.235, 0.188, 0.008, M.steel, 48);
  flange.position.z = -s * 0.034;
  spinG.add(flange);
  /* twelve nuts on the same r 0.225 circle as the wheels-3 rim flange
     bolt heads, so the joint reads as one fastener set from both sides */
  const bolts = lib.bolts(12, 0.225, 0.0045, M.steel);
  bolts.rotation.x = Math.PI / 2;
  bolts.position.z = -s * 0.027;
  spinG.add(bolts);
  spinG.position.set(RX, WY, s * RING_Z);
  lib.spin(spinG, 'z', 30);
  part.add(spinG);
  return part;
}

/* Stator ring: SMC yoke, 18 outward-facing coils, water jacket in the
   bore, phase leads exiting inboard. Static; also inside the annulus. */
function statorRingPart(s) {
  const part = lib.part('stator-rings', [0, 0, s * 0.97]);
  const g = new THREE.Group();
  g.position.set(RX, WY, s * RING_Z);
  const yoke = ringMesh(0.178, 0.158, 0.072, M.steel, 48);
  g.add(yoke);
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const x = Math.cos(a), y = Math.sin(a);
    const tooth = lib.box(0.014, 0.036, 0.066, M.steel);
    tooth.position.set(x * 0.185, y * 0.185, 0);
    tooth.rotation.z = a;
    g.add(tooth);
    const coil = lib.box(0.018, 0.054, 0.048, M.copper);
    coil.position.set(x * 0.182, y * 0.182, 0);
    coil.rotation.z = a;
    g.add(coil);
  }
  const jacket = lib.torus(0.163, 0.007, M.coolant, 48, 10);
  g.add(jacket);
  /* water stubs stay inside the annulus, outboard of the wheels-3 rim
     flange face at |z| 0.72; the run to the body is behind the upright */
  for (const da of [-0.35, 0.35]) {
    const a = Math.PI * 1.5 + da;
    const stub = zc(lib.cyl(0.007, 0.030, da < 0 ? M.coolant : M.coolantHot, 10));
    stub.position.set(Math.cos(a) * 0.163, Math.sin(a) * 0.163, -s * 0.020);
    g.add(stub);
  }
  /* phase leads sit inboard of the flange plane, meeting the inverter
     busbars; the crossing behind the spinning flange is implied */
  for (const adeg of [80, 90, 100]) {
    const a = (adeg / 180) * Math.PI;
    const lead = zc(lib.cyl(0.006, 0.05, M.copper, 10));
    lead.position.set(Math.cos(a) * 0.170, Math.sin(a) * 0.170, -s * 0.070);
    g.add(lead);
  }
  part.add(g);
  return part;
}

/* Hub bearing unit: preloaded double-row bearing, five-spoke carrier web
   inboard of the wheels-3 rim flange plane (|z| 0.72), a static bore
   sleeve carrying the stator inside the annulus, rotating stud flange,
   grounding ring. Spoke phase 0.9 dodges the wheels-3 drum gearmotor. */
function hubBearingPart(s) {
  const part = lib.part('hub-bearings', [0, 0, s * 0.85]);
  const g = new THREE.Group();
  g.position.set(RX, WY, s * 0.755);
  const housing = zc(lib.cyl(0.072, 0.075, M.castAlu, 28));
  g.add(housing);
  /* spoke web plate sits in the 12 mm band between the wheels-3 drum
     backplate (world |z| <= 0.708) and the flange plane at 0.72 */
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.9;
    const spoke = lib.box(0.077, 0.024, 0.009, M.castAlu);
    spoke.position.set(Math.cos(a) * 0.1075, Math.sin(a) * 0.1075, -s * 0.0405);
    spoke.rotation.z = a;
    g.add(spoke);
  }
  /* stator carrier sleeve: threads the gap between the drum hardware
     (r <= 0.148) and the stator yoke bore (0.158), inside the annulus */
  const sleeve = ringMesh(0.156, 0.150, 0.066, M.castAlu, 48);
  sleeve.position.z = s * 0.005;
  g.add(sleeve);
  /* stud flange rides the rotating race: own origin-centred group on the
     axle axis so it spins with the wheel in drive mode */
  const studSpin = new THREE.Group();
  const studFlange = zc(lib.cyl(0.060, 0.014, M.steel, 24));
  studSpin.add(studFlange);
  const studs = lib.bolts(5, 0.048, 0.006, M.steel);
  studs.rotation.x = Math.PI / 2;
  studs.position.z = s * 0.009;
  studSpin.add(studs);
  studSpin.position.z = s * 0.040;
  lib.spin(studSpin, 'z', 30);
  g.add(studSpin);
  const groundRing = zc(lib.cyl(0.030, 0.008, M.copper, 16));
  groundRing.position.z = -s * 0.040;
  g.add(groundRing);
  part.add(g);
  return part;
}

/* Rim-side GaN inverter: flat pack on the carrier web inboard face, upper
   quadrant, with ceramic DC link, busbars to the phase leads, DC landing. */
function ganInverterPart(s) {
  const part = lib.part('gan-inverters', [0, 0, s * 0.85]);
  const body = lib.box(0.12, 0.06, 0.034, M.castAlu);
  body.position.set(RX, 0.50, s * 0.688);
  part.add(body);
  const lid = lib.box(0.11, 0.05, 0.006, M.alu);
  lid.position.set(RX, 0.50, s * 0.668);
  part.add(lid);
  const capStack = lib.box(0.045, 0.020, 0.020, M.plasticLt);
  capStack.position.set(RX - 0.032, 0.540, s * 0.685);
  part.add(capStack);
  for (const adeg of [80, 90, 100]) {
    const a = (adeg / 180) * Math.PI;
    const bar = zc(lib.cyl(0.005, 0.018, M.busbar, 10));
    bar.position.set(RX + Math.cos(a) * 0.170, WY + Math.sin(a) * 0.170, s * 0.700);
    part.add(bar);
  }
  const dcLanding = lib.box(0.030, 0.020, 0.030, M.hv);
  dcLanding.position.set(RX - 0.055, 0.50, s * 0.678);
  part.add(dcLanding);
  return part;
}

/* Service loop: HV DC umbilical from a body-rail bracket, drooping through
   its controlled bend, up to the inverter DC landing. Orange, per SPEC. */
function serviceLoopPart(s) {
  const part = lib.part('service-loops', [0, 0, s * 0.85]);
  const bracket = lib.box(0.026, 0.050, 0.026, M.plastic);
  bracket.position.set(-1.36, 0.40, s * 0.63);
  part.add(bracket);
  const loop = lib.tube([
    [-1.36, 0.395, s * 0.63],
    [-1.42, 0.33, s * 0.615],
    [-1.50, 0.295, s * 0.625],
    [-1.555, 0.33, s * 0.65],
    [-1.545, 0.43, s * 0.665],
    [-1.507, 0.487, s * 0.673],
  ], 0.010, M.hv);
  part.add(loop);
  const lvLine = lib.tube([
    [-1.345, 0.385, s * 0.615],
    [-1.41, 0.325, s * 0.60],
    [-1.49, 0.30, s * 0.61],
    [-1.535, 0.335, s * 0.635],
    [-1.525, 0.42, s * 0.652],
    [-1.49, 0.47, s * 0.66],
  ], 0.0035, M.plastic);
  part.add(lvLine);
  const clamp = lib.box(0.020, 0.030, 0.020, M.plastic);
  clamp.position.set(-1.542, 0.445, s * 0.663);
  part.add(clamp);
  return part;
}

/* Torque-vectoring controller: one box in the now-empty rear drive zone,
   with signal runs out to each corner's loop bracket. */
function tvControllerPart() {
  const part = lib.part('tv-controller', [0, 0.5, 0]);
  const body = lib.box(0.15, 0.045, 0.17, M.castAlu);
  body.position.set(-1.56, 0.42, 0);
  part.add(body);
  const pcb = lib.box(0.13, 0.006, 0.15, M.pcb);
  pcb.position.set(-1.56, 0.446, 0);
  part.add(pcb);
  for (const sz of [-1, 1]) {
    const conn = lib.box(0.030, 0.020, 0.040, M.plastic);
    conn.position.set(-1.49, 0.415, sz * 0.055);
    part.add(conn);
    const harness = lib.tube([
      [-1.485, 0.415, sz * 0.07],
      [-1.45, 0.40, sz * 0.35],
      [-1.40, 0.40, sz * 0.55],
      [-1.37, 0.40, sz * 0.61],
    ], 0.0035, M.plastic);
    part.add(harness);
  }
  return part;
}

/* Front drive unit: simplified representation of the Gen 2 axial-flux
   machine, mirrored in x into P.driveF. Sealed dishes, gear case, pocket
   inverter, mounts, and both front halfshafts (spinning). */
function frontUnitPart() {
  const part = lib.part('front-unit', [0.4, -0.05, 0]);

  /* disc housing: rim ring closed by two dishes */
  const rim = ringMesh(0.168, 0.157, 0.110, M.castAlu, 48);
  rim.position.set(A3[0], A3[1], 0.040);
  part.add(rim);
  const inDish = zc(lib.cyl(0.168, 0.012, M.castAlu, 48));
  inDish.position.set(A3[0], A3[1], -0.021);
  part.add(inDish);
  const outDish = zc(lib.cyl(0.168, 0.012, M.castAlu, 48));
  outDish.position.set(A3[0], A3[1], 0.101);
  part.add(outDish);
  const hubBoss = zc(lib.cyl(0.045, 0.022, M.castAlu, 24));
  hubBoss.position.set(A3[0], A3[1], 0.116);
  part.add(hubBoss);
  const rimBolts = lib.bolts(16, 0.162, 0.006, M.steel);
  rimBolts.rotation.x = Math.PI / 2;
  rimBolts.position.set(A3[0], A3[1], 0.098);
  part.add(rimBolts);
  for (let i = 0; i < 5; i++) {
    const a = 0.5 + i * 1.1;
    const rib = lib.box(0.085, 0.012, 0.010, M.castAlu);
    rib.position.set(A3[0] + Math.cos(a) * 0.105, A3[1] + Math.sin(a) * 0.105, -0.030);
    rib.rotation.z = a;
    part.add(rib);
  }

  /* neck down to the gear case, then the shallow case on two axes */
  const neck = zc(lib.cyl(0.048, 0.09, M.castAlu, 24));
  neck.position.set(A3[0], A3[1], -0.070);
  part.add(neck);
  for (const [ax, r] of [[B3, 0.055], [C3, 0.085]]) {
    const caseDrum = zc(lib.cyl(r, 0.11, M.castAlu, 32));
    caseDrum.position.set(ax[0], ax[1], GZ3);
    part.add(caseDrum);
  }
  const caseFill = lib.box(0.08, 0.10, 0.11, M.castAlu);
  caseFill.position.set(1.475, 0.405, GZ3);
  part.add(caseFill);
  const coverBolts = lib.bolts(8, 0.074, 0.005, M.steel);
  coverBolts.rotation.x = Math.PI / 2;
  coverBolts.position.set(C3[0], C3[1], -0.217);
  part.add(coverBolts);

  /* pocket inverter on the inboard face, thin 508 V DC feed to the pack */
  const invBody = lib.box(0.24, 0.14, 0.050, M.castAlu);
  invBody.position.set(1.49, 0.46, -0.055);
  part.add(invBody);
  const invLid = lib.box(0.22, 0.12, 0.008, M.alu);
  invLid.position.set(1.49, 0.46, -0.084);
  part.add(invLid);
  const dcFeed = lib.tube([
    [1.40, 0.50, -0.055],
    [1.36, 0.45, -0.02],
    [1.32, 0.405, 0.01],
  ], 0.008, M.hv);
  part.add(dcFeed);

  /* oil-to-coolant plate under the case, with water stubs */
  const oilCooler = lib.box(0.09, 0.028, 0.08, M.castAlu);
  oilCooler.position.set(1.48, 0.246, -0.08);
  part.add(oilCooler);
  for (const [zz, mat] of [[-0.105, M.coolant], [-0.055, M.coolantHot]]) {
    const stub = lib.cyl(0.008, 0.05, mat, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(1.42, 0.246, zz);
    part.add(stub);
  }

  /* diff output stub and intermediate shaft */
  const stubOut = zc(lib.cyl(0.022, 0.050, M.steel, 16));
  stubOut.position.set(C3[0], C3[1], -0.225);
  part.add(stubOut);
  const interShaft = zc(lib.cyl(0.015, 0.46, M.steel, 12));
  interShaft.position.set(C3[0], C3[1], 0.070);
  part.add(interShaft);

  /* mounts: two bushes to the front subframe */
  for (const sz of [-1, 1]) {
    const bush = zc(lib.cyl(0.025, 0.040, M.rubber, 16));
    bush.position.set(1.60, 0.28, sz * 0.28);
    part.add(bush);
  }

  /* both front halfshafts, spinning, included in this part's 59 kg */
  for (const sz of [-1, 1]) {
    const shaftG = halfshaft();
    shaftG.position.set(C3[0], C3[1], sz * 0.52);
    lib.spin(shaftG, 'z', 30);
    part.add(shaftG);
  }

  return part;
}

export function build() {
  const sys = new THREE.Group();

  /* rear corners: motor rings, bearing, inverter, loop, per side */
  for (const s of [-1, 1]) {
    sys.add(rotorRingPart(s));
    sys.add(statorRingPart(s));
    sys.add(hubBearingPart(s));
    sys.add(ganInverterPart(s));
    sys.add(serviceLoopPart(s));
  }

  sys.add(tvControllerPart());
  sys.add(frontUnitPart());

  return sys;
}
