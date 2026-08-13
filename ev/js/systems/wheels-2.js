/* Wheels and brakes, generation 2: narrow high-pressure low-loss corners.
   Delta against wheels.js: 185/50 R21 tyres on carbon-hybrid 21s, fully
   flush bolted covers, discs on the front axle only, sealed dry drums at
   the rear, and a brake-by-wire unit with no mechanical push-through.
   Same packaging and spin rules as the reference: corner groups spin
   about z in drive mode; calipers, drum backplates, and the master unit
   deliberately do not. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'wheels-2',
  name: 'Wheels and brakes · Gen 2',
  color: 0xd0d6db,
  explode: [0, 0, 0],
  blurb: 'Gen 1 gave regen the everyday stops. Gen 2 attacks what was left: rolling loss, pumping drag, residual friction, and rust. Narrow high-pressure tyres, sealed carbon-hybrid corners, rear drums: 96 kg against 133, about 15 Wh/km returned.',
  parts: {
    tires: {
      name: 'Tyres',
      tagline: 'Same length of contact patch, a fifth less width: it brakes like Gen 1 and rolls like a lighter car.',
      mass: 33,
      count: 4,
      specs: [
        ['Size', '185/50 R21, XL load index 98'],
        ['Static load per corner', '~530 kg'],
        ['Rolling resistance', '5.2 kg/t installed (Gen 1: 7.2)'],
        ['Contact patch', 'Same length as Gen 1, 21% narrower'],
        ['Cold pressure', '3.4 bar (Gen 1: 2.9)'],
        ['Cavity noise', 'Foam liner carried over, smaller cavity'],
      ],
      how: 'A tyre’s contact patch area is roughly load over pressure; what the designer actually controls is its shape. The Gen 1 235/50 R19 spent that area wide and short. This casing spends it long and narrow: 185 mm of section against 235, on a 21 inch rim, rolling radius held within a percent of Gen 1 so gearing, speedometer, and ride height carry over. Patch length is what straight-line braking and aquaplaning care about, because both depend on how long each tread element stays in contact; width is what rolling loss and aero care about. Keeping the length while surrendering the width is the entire trick. The supporting moves: cold pressure rises from 2.9 to 3.4 bar to cut carcass deflection, the tread band a fifth narrower puts a fifth less rubber through the flex cycle every revolution, and the sidewall drops from 117 to 92 mm, because at 3.4 bar a short sidewall barely bulges under load, and rubber that does not deform does not lose energy. Installed Crr lands at 5.2 kg/t against the Gen 1 tyre’s 7.2 as mounted; its drum label said 6.5, and coarse tarmac has always added the difference.\n\nThe budget math is why this tyre exists. At 2.1 tonnes, each 0.001 of Crr is about 20 N of drag, 5.7 Wh per km at the wheels, roughly 6 Wh/km out of the pack. Going from 0.0072 to 0.0052 returns about 12 Wh/km, close to 8% of motorway consumption, before counting the 50 mm of exposed frontal width removed at each front wheel, worth another 1.5 Wh/km or so. The payment is lateral: cornering stiffness tracks section width, and the steady-state limit drops from about 0.92 g to about 0.85 g. Braking distance barely moves, because it runs on patch length and vertical load, and both are unchanged.',
      why: 'The Gen 1 tyre bought a sports-saloon lateral limit and paid for it on every metre it ever rolled. Priced honestly, the last 0.07 g of cornering cost about 12 Wh/km and was collected by almost nobody. Gen 2 moves the spend to where the car actually lives, rolling straight at motorway speed, and lets stability control manage the smaller margin.',
      fail: [
        'The lateral limit is genuinely lower, about 0.85 g against 0.92, and it shows in an emergency lane change; ESC thresholds are retuned earlier to cover it.',
        '3.4 bar on a 92 mm sidewall transmits sharp-edge impacts the Gen 1 casing swallowed; retuned damper hydraulics absorb some of it, and expansion joints report the rest honestly.',
        'The size is a one-supplier special, the i3 lesson: niche casings mean costly replacements and patchy availability far from a city.',
      ],
      explode: [0, 0, 0.85],
    },
    rims: {
      name: 'Carbon-hybrid wheels',
      tagline: 'Carbon where the radius is, aluminium where the abuse is.',
      mass: 31,
      count: 4,
      specs: [
        ['Size', '21 x 6J, offset ET40'],
        ['Construction', 'CFRP barrel, forged 6061 spider'],
        ['Joint', 'Structural adhesive plus ten titanium bolts'],
        ['Mass per wheel', '7.8 kg (Gen 1 forged: 9.8)'],
        ['Spin-up inertia', '-18% despite two inches more diameter'],
        ['Kerb impact', 'SAE J175 13 degree, spider takes the strike'],
      ],
      how: 'Gen 1 forged the whole wheel from 6061 and called it the cheapest kilograms on the car. It was right, and it made the next two kilograms much more expensive. This wheel splits the job by load path. The barrel is filament-wound CFRP, about 3 kg where forged aluminium needed 5, doing hoop tension and bending, work carbon is ideal for. The spider stays forged 6061, because the hub face carries bolt clamp, bearing loads, and kerb strikes: point loads and local plasticity, exactly what carbon tolerates worst. A bonded lap joint plus ten titanium bolts carries the interface, with a glass ply in the bond line because carbon against bare aluminium is a galvanic battery in winter salt.\n\nThe two kilograms saved per wheel sit at the largest radius on the car, which is where they count most. Rotational inertia drops 18% even though the diameter grew two inches, because the missing metal is barrel wall at 0.26 m. Accounting spin-up the way Gen 1 did, the 8 kg removed across the car reads like about 12 off the body, and every gram of it is unsprung, so the dampers hold the narrower contact patch to a broken surface with less force and less patch-load variation. Holding Gen 1’s rolling radius above a 92 mm sidewall is what forces the 21 inch barrel; the hybrid construction is what keeps that extra diameter from costing anything.',
      why: 'Gen 1 stated the rule: a kilogram removed here lands in four budgets at once. Gen 2 keeps the rule and accepts the corollary, which is that past forging the price per kilogram roughly triples. The hybrid layout is the honest compromise: buy carbon’s stiffness-to-mass only for the barrel, where a wheel actually spends its material, and keep metal where wheels meet kerbs and torque wrenches.',
      fail: [
        'Barrel damage is scrap, not repair: carbon does not bend and get straightened, and a delamination from a pothole is invisible from outside. Inspection is tap test and ultrasound at service.',
        'The bond line is the life-limiting feature; adhesive plus bolts is belt and braces precisely because either alone carries an open fatigue question at 300,000 km.',
        'Cost is several times the forging premium Gen 1 already paid. This is the rung where the optimization ladder starts charging properly.',
      ],
      explode: [0, 0, 1.15],
    },
    covers: {
      name: 'Flush covers',
      tagline: 'Gen 1 sealed most of the wheel face and apologized for the gaps. This one has no gaps.',
      mass: 3,
      count: 4,
      specs: [
        ['Material', 'CFRP skin on foam core, 0.7 kg each'],
        ['Drag', 'Cd -0.012 vs open wheel (Gen 1 cover: -0.008)'],
        ['Range effect', '~3% at motorway speed (Gen 1: ~2%)'],
        ['Attachment', 'Five bolts to the spider, torqued at service'],
        ['Vents', 'None. Disc cooling feeds from inboard'],
      ],
      how: 'Gen 1 explained the physics: an open wheel is a centrifugal pump, and closing its outboard face is the cheapest CdA on the car. Its cover stopped at -0.008 of Cd because the clip windows and trim gaps leaked, and because the discs behind needed some through-flow. Both excuses are gone. The rear corners now carry sealed drums that want no airflow at all, and the front discs are fed from the inboard side by a deflector on the splash shield, so the outboard face can close completely. The cover is a foam-core carbon skin bolted flat to the spider, stiff enough not to oil-can at motorway wheel speeds, and it reads to the air as a solid disc.\n\nFully flush is worth about -0.012 of Cd against an open wheel, 0.004 better than Gen 1: roughly 160 W at 110 km/h, another 1.5 Wh/km. The bolted attachment is the other quiet fix. Gen 1 clips fatigued with removal and occasionally released a cover at speed; bolts do not leave. The price is that tyre shops must pull five fasteners per corner and torque them back, and a cover refitted without its gasket whistles at speed, the sort of niggle that fills owner forums.',
      why: 'Same argument as Gen 1, extended one step: range bought with cells costs mass and money in every car forever, range bought with a static disc costs almost nothing. The only reason Gen 1 could not go fully flush was brake cooling, so Gen 2 re-plumbed the cooling instead of reopening the face.',
      fail: [
        'The flush face hides the wheel entirely; owners who removed Gen 1 covers for looks will remove these too, and the quoted consumption still assumes they are fitted.',
        'Inboard-fed disc cooling is sized for the road duty cycle, not for track use; two hot laps will find the limit.',
        'A kerbed or delaminated cover cannot be clipped back on at the roadside; it is a bolted, sealed part with a lead time.',
      ],
      explode: [0, 0, 1.45],
    },
    discs: {
      name: 'Front brake discs',
      tagline: 'Two discs where Gen 1 carried four. The iron that remains is for the stop regen cannot take, same as ever.',
      mass: 11,
      count: 2,
      specs: [
        ['Size', '355 x 28 mm, internally vented'],
        ['Gen 1 reference', '380 x 30 front plus 330 x 28 rear'],
        ['Friction ring', 'High-carbon grey iron on forged alloy hat'],
        ['Duty share', '<8% of braking energy'],
        ['Single-stop energy', '~1.8 MJ from 160 km/h, front pair'],
      ],
      how: 'The sizing case has not changed: a full pack on an alpine descent, regen with nowhere to send the energy, iron taking everything. What changed is how much iron the case needs. The rear axle’s share moved into sealed drums, and the front ring shrank from 380 x 30 to 355 x 28, which the numbers permit: the Gen 2 car is lighter, load transfer puts about three quarters of a hard stop on the front axle regardless, and a 355 pair still swallows a 160 km/h panic stop, about 1.8 MJ, without the pads leaving their friction window. Construction carries over unchanged because it was right: iron ring floating on drive pins over a forged aluminium hat, so heat grows the ring radially instead of coning it.\n\nThe honest accounting is fade margin. Gen 1 held its whole descent reserve in thermal mass; Gen 2 holds part of it in software. The car reads the route ahead and preconditions the pack, pulling state of charge down before a long grade so regen keeps its full 0.25 g authority where Gen 1 might have saturated. When that works, the smaller discs never notice. When it cannot work, a full pack at the top of a pass with no route guidance, the front iron fades roughly two repeated hard stops earlier than Gen 1 would have, and the drums behind contribute little in that regime by design, since load transfer has already emptied the rear axle.',
      why: 'Brakes are sized by the worst case, but the worst case is partly a state the software can refuse to enter. Spending pack telemetry and navigation data to delete four kilograms of rotating, unsprung, rust-prone iron per axle set is the most Gen 2 trade in the system: the mass leaves the car, and the margin moves into code that now has to be right.',
      fail: [
        'Corrosion still writes the maintenance schedule: two rings get wipe applies instead of four, halving what the habit costs, but the front iron rusts exactly as Gen 1’s did.',
        'The descent logic needs navigation data and driver consent to precondition; refuse both and start a pass with a full pack, and the fade margin is honestly thinner than Gen 1.',
        'A 355 ring behind a flush cover runs hotter per stop than a ducted 380; pad life shortens and the first-stop friction dip after regen-only weeks is slightly deeper.',
      ],
      explode: [0, 0, 0.45],
    },
    drums: {
      name: 'Rear drum brakes',
      tagline: 'The oldest brake on the newest axle, because the Gen 1 rear disc’s real enemy was never heat. It was rust.',
      mass: 9,
      count: 2,
      specs: [
        ['Type', '280 x 45 mm simplex, sealed housing'],
        ['Shell', 'Aluminium, cast-in iron liner'],
        ['Actuation', 'Dry: gearmotor and spindle, no rear fluid'],
        ['Residual drag', 'Zero, shoes retract fully clear'],
        ['Park brake', 'Integrated, self-energizing shoes'],
        ['Shoe life', 'Vehicle design life, 240,000 km'],
      ],
      how: 'Gen 1 told the truth about EV rear discs: used less than a tenth of the time, they die of corrosion, not wear, and the software burned range on wipe applies just to keep them clean. The drum treats the disease instead of the symptom. Its friction surfaces live inside a sealed housing where salt spray never lands, so there is nothing to wipe. Its shoes retract fully clear of the drum, so residual drag is zero by geometry, where the Gen 1 rear calipers fought for tenths of a newton-metre with rollback seals. And the park brake stops being a bolt-on gearmotor fighting a caliper piston: the shoes are the park brake, wedged by the same spindle, self-energizing, so a small motor holds the car on a 30% grade.\n\nThe duty math is what makes this engineering rather than nostalgia. Regen does the service braking; when friction is needed at all, load transfer sends about three quarters of it forward. The rear friction brake in this car is a parking device, a hill hold, and a rescue actuator for the last metres of a blended stop, a duty measured in single-digit kilojoules. A drum sheds heat poorly, which is exactly why it left front axles decades ago, and exactly why it does not matter here. Actuation is dry: a gearmotor and spindle inside each backing plate, commanded over redundant wiring. There are no rear brake lines, no rear fluid, and one less bleed point in the car. The shell is aluminium with a cast-in iron liner, which is how two sealed corners, actuators included, come to 9 kg where Gen 1’s rear discs and calipers totalled about 18.',
      why: 'The reference carried rear discs because that is what a premium car carries, then spent software, range, and service money apologizing for them. The drum is the honest answer to this axle’s actual duty cycle: sealed against the corrosion that was the real killer, zero drag without trying, park brake integrated for free. The fade limit that exiled drums from front axles is real, and irrelevant on a rear axle that never sees sustained heat.',
      fail: [
        'Fade is real above roughly 350 degrees C of shoe temperature; if the front hydraulics fail outright on a long descent, the drums are a get-home brake, not a substitute.',
        'Deep water can be drawn past the seal as a hot drum cools; the first apply afterwards is weak until the shoes dry, the classic drum vice reduced but not deleted.',
        'Nothing is inspectable without pulling the drum: shoe condition is inferred from motor current signatures, and the self-adjusting spindle is the one mechanism in the corner that can jam.',
      ],
      explode: [0, 0, 0.5],
    },
    calipers: {
      name: 'Front calipers',
      tagline: 'Half the calipers, the same discipline: months of nothing, then full clamp in a tenth of a second.',
      mass: 6,
      count: 2,
      specs: [
        ['Type', 'Fixed monobloc, 4 x 38 mm pistons'],
        ['Corners', 'Front only, rear calipers deleted'],
        ['Clamp force', '36 kN at 160 bar'],
        ['Pads', 'Low-copper NAO, friction ~0.38'],
        ['Residual drag', '<0.5 Nm, and only two corners can drag'],
      ],
      how: 'Everything Gen 1 learned about EV calipers survives, applied to two corners instead of four. The body is still a fixed monobloc machined from one forging, so hard-stop fluid volume becomes clamp force instead of bridge flex. Rollback seals still pull the pads 0.1 mm clear on release, and the pressure pre-fill still masks the resulting dead travel. Pistons shrink from 40 to 38 mm to match the smaller disc, dropping peak clamp from 40 to 36 kN, which the lighter car and the 355 ring turn back into the same deceleration. The mounting stays at 9 o’clock behind the axle, clear of the steering arc.\n\nWhat vanished is the entire rear caliper: body, slide pins, piston, park-brake gearmotor, and the lines that fed it. Gen 1’s own service data made the argument. The classic rear failure was slide pins seizing from disuse, a moving part rusting in place because regen never let it move; the Gen 2 rear axle has no caliper to seize. Residual drag, the spec Gen 1 organized itself around, improves by construction: two corners that can drag at half a newton-metre each instead of four.',
      why: 'A fixed monobloc on the front axle is the one place friction hardware still earns premium execution, because it is the actuator for the only stop that matters, the one regen cannot take. Everywhere else the caliper had become a liability being managed, and Gen 2 stopped managing it by deleting it.',
      fail: [
        'Front pads outlast even Gen 1’s, which sounds like a virtue until glazing and pad-face corrosion set the service interval instead of wear.',
        'The first friction stop after regen-only weeks still carries the low-mu wipe of a lightly rusted ring, and with only two rings in the system the compensating pre-pressure matters more, not less.',
        'Fixed calipers tolerate less disc runout than floating ones; a neglected, juddering ring knocks pads back and lengthens the pedal, and there is no rear hydraulic reserve behind the mistake.',
      ],
      explode: [-0.3, 0, 0.2],
    },
    'master-unit': {
      name: 'Brake-by-wire unit',
      tagline: 'Gen 1 kept a mechanical pedal path as a museum piece. Gen 2 closes the museum.',
      mass: 3,
      specs: [
        ['Architecture', 'One-box, dry pedal unit, front hydraulics only'],
        ['Pressure source', 'BLDC motor + ball-screw plunger'],
        ['Pressure build', '0 to 180 bar in 120 ms'],
        ['Rear axle', 'Electric commands only, no fluid'],
        ['Fallback', 'No push-through: regen + drums, ~0.4 g'],
        ['Fluid volume', 'Under half of Gen 1'],
      ],
      how: 'The pedal is still a sensor reporting into a simulator, and the blending logic is Gen 1’s: regen first, up to what the pack accepts, hydraulics for the remainder, one consistent pedal curve hiding the seam. The hydraulic side shrank around it. The unit itself is dry, pedal simulator and electronics in one housing, with the front-axle pressure block hung on its side as the only wet component left in the system: two short lines to two calipers, less than half Gen 1’s fluid, and no plumbing aft of the bulkhead, because each rear drum takes its orders as electrons over a redundant power and data bus. The plunger carries over shrunk, feeding two calipers instead of four, and pressure build improves to 120 ms mostly because there is less fluid to move.\n\nThe deletion that matters is the push-through rod. Gen 1 kept a mechanical path from pedal to master cylinder, 0.4 g if all electronics died, and priced it honestly as a last resort. Gen 2 replaces that steel with redundancy: dual ECUs on separate supplies, dual pedal sensors, dual windings in the plunger motor, and a second deceleration path through the drivetrain and the drum motors worth about 0.4 g with the hydraulics entirely dead. The rod was the last constraint the vacuum-booster era still imposed, pinning the hydraulic unit to the pedal axis. Deleting it is what takes the unit from 5 kg to 3 and frees the pedal box to be a sensor bracket.',
      why: 'Once regen took over 90% of braking energy, the hydraulic system’s job description shrank to one axle and the worst case, and Gen 2 resizes the hardware to the job. What the driver gains is a pedal that feels identical in every failure mode it can still brake through. What the program pays is proof: the certification argument moves from a steel rod anyone can see to a statistical independence case regulators must be persuaded to hold.',
      fail: [
        'With no push-through, safety is argued, not shown: dual supplies and dual ECUs must be proven independent to a failure rate, and that paper is the longest lead-time item in Gen 2.',
        'The 0.4 g electric fallback assumes the drivetrain is alive; a crash that severs high voltage and low voltage together leaves only the front pressure block on its backup supply, the one branch sized for exactly that reason.',
        'A software fault is now a braking fault by definition; the two ECUs run dissimilar code from separate teams so they cannot share a bug, which doubles the validation bill of every release.',
      ],
      explode: [0.5, 0.35, 0],
    },
  },
};

/* ── Geometry ──
   Corner-local frame matches the reference: origin at the wheel centre,
   z along the axle, s = sign(world z) so +s is outboard. Tyre, rim, cover,
   and disc or drum shell live in the spun group; calipers, drum backing
   plates, and the master unit sit in static groups. */

const TIRE_SEG = 48;

function tirePart(s) {
  const g = lib.part('tires', [0, 0, s * 0.85]);
  const band = lib.mesh(
    new THREE.CylinderGeometry(P.tireR, P.tireR, 0.185, TIRE_SEG, 1, true),
    M.rubber
  );
  band.rotation.x = Math.PI / 2;
  g.add(band);
  for (const e of [-1, 1]) {
    const shoulder = lib.torus(0.318, 0.045, M.rubber, 40, 14);
    shoulder.position.z = e * (0.0925 - 0.045);
    g.add(shoulder);
  }
  return g;
}

function rimPart(s) {
  const g = lib.part('rims', [0, 0, s * 1.15]);
  /* CFRP barrel: 21 inch, longer radius and shorter width than Gen 1. */
  const barrel = lib.cyl(0.263, 0.15, M.carbon, 32);
  barrel.rotation.x = Math.PI / 2;
  g.add(barrel);
  /* Forged aluminium spider: five slim spokes, bonded ring, hub cap. */
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const spoke = lib.box(0.04, 0.19, 0.016, M.alu);
    spoke.position.set(Math.cos(a) * 0.15, Math.sin(a) * 0.15, s * 0.062);
    spoke.rotation.z = a - Math.PI / 2;
    g.add(spoke);
  }
  const bond = lib.torus(0.245, 0.008, M.alu, 40, 10);
  bond.position.z = s * 0.062;
  g.add(bond);
  const cap = lib.cyl(0.04, 0.018, M.castAlu, 16);
  cap.rotation.x = Math.PI / 2;
  cap.position.z = s * 0.068;
  g.add(cap);
  return g;
}

function coverPart(s) {
  const g = lib.part('covers', [0, 0, s * 1.45]);
  /* Fully flush carbon face, no vents, no clip windows. */
  const face = lib.cyl(0.262, 0.006, M.carbon, 40);
  face.rotation.x = Math.PI / 2;
  face.position.z = s * 0.082;
  g.add(face);
  const trim = lib.torus(0.24, 0.004, M.plasticLt, 40, 8);
  trim.position.z = s * 0.0855;
  g.add(trim);
  const fasteners = lib.bolts(5, 0.16, 0.006, M.alu);
  fasteners.rotation.x = Math.PI / 2;
  fasteners.position.z = s * 0.09;
  g.add(fasteners);
  return g;
}

/* Front only: 355 x 28 two-piece disc. */
function discPart(s) {
  const g = lib.part('discs', [0, 0, s * 0.45]);
  const ring = lib.cyl(0.1775, 0.028, M.steel, 36);
  ring.rotation.x = Math.PI / 2;
  ring.position.z = -s * 0.115;
  g.add(ring);
  const hat = lib.cyl(0.08, 0.05, M.castAlu, 24);
  hat.rotation.x = Math.PI / 2;
  hat.position.z = -s * 0.095;
  g.add(hat);
  const studs = lib.bolts(5, 0.055, 0.009, M.steel);
  studs.rotation.x = Math.PI / 2;
  studs.position.z = -s * 0.068;
  g.add(studs);
  return g;
}

/* Rear only, spun half: the sealed drum shell rotates with the wheel. */
function drumPart(s) {
  const g = lib.part('drums', [0, 0, s * 0.5]);
  const shell = lib.cyl(0.148, 0.07, M.castAlu, 32);
  shell.rotation.x = Math.PI / 2;
  shell.position.z = -s * 0.105;
  g.add(shell);
  for (const zr of [0.088, 0.122]) {
    const rib = lib.torus(0.15, 0.005, M.castAlu, 36, 8);
    rib.position.z = -s * zr;
    g.add(rib);
  }
  const studs = lib.bolts(5, 0.055, 0.009, M.steel);
  studs.rotation.x = Math.PI / 2;
  studs.position.z = -s * 0.062;
  g.add(studs);
  return g;
}

/* Rear only, static half: backing plate, shoes, and the dry gearmotor
   actuator. Shares the drums part id; a smaller explode vector than the
   shell so the shoes are revealed as the drum pulls outboard. */
function drumBackPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('drums', [0, 0, s * 0.26]);
  g.position.set(x, P.wheelY, z);
  const plate = lib.cyl(0.152, 0.008, M.darkSteel, 32);
  plate.rotation.x = Math.PI / 2;
  plate.position.z = -s * 0.148;
  g.add(plate);
  for (const a of [Math.PI * 0.125, Math.PI * 1.125]) {
    const shoe = lib.mesh(
      new THREE.TorusGeometry(0.112, 0.014, 8, 16, Math.PI * 0.75),
      M.steel
    );
    shoe.rotation.z = a;
    shoe.position.z = -s * 0.138;
    g.add(shoe);
  }
  const motor = lib.cyl(0.02, 0.05, M.plastic, 14);
  motor.rotation.x = Math.PI / 2;
  motor.position.set(-0.06, -0.09, -s * 0.175);
  g.add(motor);
  return g;
}

/* Front fixed calipers at 9 o'clock, behind the axle, clear of the
   steering arc. Rides above the axle centreline like the reference so the
   lower edge clears the battery envelope top. Never rotates. */
function caliperPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('calipers', [-0.3, 0, s * 0.2]);
  g.position.set(x, P.wheelY, z);
  const body = lib.box(0.085, 0.12, 0.06, M.caliper);
  body.position.set(-0.165, 0.045, -s * 0.115);
  g.add(body);
  const fitting = lib.cyl(0.008, 0.018, M.steel, 10);
  fitting.position.set(-0.165, 0.115, -s * 0.115);
  g.add(fitting);
  return g;
}

/* Brake-by-wire unit on the bulkhead shelf. Dry pedal unit plus the
   front-axle pressure block, two hydraulic lines forward, and redundant
   low-voltage harnesses aft to the drum actuators. No push-through rod. */
function masterUnitPart() {
  const g = lib.part('master-unit', [0.5, 0.35, 0]);

  const body = lib.box(0.11, 0.10, 0.11, M.plastic);
  body.position.set(0.95, 0.62, -0.35);
  g.add(body);

  const block = lib.box(0.07, 0.08, 0.06, M.castAlu);
  block.position.set(1.02, 0.60, -0.32);
  g.add(block);

  const motor = lib.cyl(0.032, 0.06, M.steel, 18);
  motor.rotation.z = Math.PI / 2;
  motor.position.set(1.085, 0.60, -0.32);
  g.add(motor);

  const reservoir = lib.box(0.05, 0.035, 0.05, M.plasticLt);
  reservoir.position.set(1.02, 0.665, -0.32);
  g.add(reservoir);

  const ecu = lib.box(0.09, 0.08, 0.012, M.pcb);
  ecu.position.set(0.95, 0.62, -0.288);
  g.add(ecu);

  /* Pedal signal conduit where Gen 1 had a push-through rod. */
  const conduit = lib.cyl(0.006, 0.05, M.plastic, 10);
  conduit.rotation.z = Math.PI / 2;
  conduit.position.set(0.87, 0.595, -0.35);
  g.add(conduit);

  /* Two short hydraulic lines to the front calipers, routed over the
     drive unit envelope like the reference. */
  const lineL = lib.tube(
    [
      [1.05, 0.63, -0.34],
      [1.10, 0.60, -0.46],
      [1.18, 0.54, -0.58],
      [1.26, 0.49, -0.66],
      [1.285, 0.475, -0.695],
    ],
    0.004,
    M.steel
  );
  g.add(lineL);
  const lineR = lib.tube(
    [
      [1.05, 0.63, -0.30],
      [1.10, 0.62, -0.05],
      [1.14, 0.60, 0.30],
      [1.22, 0.54, 0.56],
      [1.27, 0.50, 0.66],
      [1.285, 0.475, 0.695],
    ],
    0.004,
    M.steel
  );
  g.add(lineR);

  /* Redundant harnesses to the rear drum gearmotors, run outboard of the
     battery envelope (|z| > 0.72) just above the pack flange. */
  const harnL = lib.tube(
    [
      [0.92, 0.57, -0.38],
      [0.70, 0.42, -0.55],
      [0.30, 0.345, -0.74],
      [-0.60, 0.345, -0.74],
      [-1.20, 0.35, -0.73],
      [-1.44, 0.30, -0.67],
      [-1.50, 0.275, -0.64],
    ],
    0.0035,
    M.plastic
  );
  g.add(harnL);
  const harnR = lib.tube(
    [
      [0.92, 0.57, -0.32],
      [0.70, 0.45, 0.00],
      [0.40, 0.36, 0.55],
      [0.10, 0.345, 0.74],
      [-0.60, 0.345, 0.74],
      [-1.20, 0.35, 0.73],
      [-1.44, 0.30, 0.67],
      [-1.50, 0.275, 0.64],
    ],
    0.0035,
    M.plastic
  );
  g.add(harnR);

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

    /* Everything that rotates with the wheel, centred on its own origin. */
    const spinGroup = new THREE.Group();
    spinGroup.position.set(x, P.wheelY, z);
    lib.spin(spinGroup, 'z', 30);
    spinGroup.add(tirePart(s), rimPart(s), coverPart(s));
    spinGroup.add(front ? discPart(s) : drumPart(s));
    sys.add(spinGroup);

    /* Static halves: front calipers grip the disc, rear backing plates
       carry shoes and actuator. Neither rotates. */
    sys.add(front ? caliperPart(x, z) : drumBackPart(x, z));
  }

  sys.add(masterUnitPart());
  return sys;
}
