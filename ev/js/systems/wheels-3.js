/* Wheels and brakes, generation 3: co-designed corners.
   Delta against wheels-2.js: the rear rim becomes the motor rotor carrier
   (spider deleted, forged flange and sleeve wrapping the drivetrain-3
   motor annulus), the rear cover grows heat-extraction vanes and becomes
   the motor's cooling fan, the rear drum shrinks to a park-and-rescue
   device living inside the motor ring bore, and the front corner carries
   Gen 2 unchanged: tyres, carbon-hybrid front wheels, discs, calipers,
   and the dry brake-by-wire unit.

   BINDING interface contract with drivetrain-3 (design/gen3.md):
   at each rear corner the motor annulus, radius 0.155 to 0.235 spanning
   world |z| 0.72 to 0.80, is left void by this module. The rear rim
   provides a flange face at |z| = 0.72 (rotor ring bolts there) and its
   carrier sleeve passes the annulus radially outside it at r 0.250.
   Rear-corner part groups explode z-outward at magnitude 0.85,
   matching drivetrain-3, so the exploded rear corner separates from the
   car as one readable teardown while the motor ring (at 0.97 on the
   drivetrain side) opens the flange joint by 0.12. One deliberate
   exception: the rear cover rides at 0.97 with the ring, because the
   ring's extra 0.12 of travel would otherwise carry it through the
   cover face; at 0.97 the pair keeps its static clearance at every
   slider position.

   Spin rules as ever: corner groups spin about z in drive mode; calipers,
   drum backplates, and the master unit deliberately do not. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'wheels-3',
  name: 'Wheels and brakes · Gen 3',
  color: 0xd0d6db,
  explode: [0, 0, 0],
  blurb: 'Gen 1 built honest corners. Gen 2 cut their losses. Gen 3 dissolves them: the rear rim carries the motor rotor, the spinning cover is the motor’s cooling fan, and rear friction shrinks to a drum inside the ring. 90 kg against Gen 2’s 96, and a rear wheel that is now a drivetrain component.',
  parts: {
    tires: {
      name: 'Tyres',
      tagline: 'Gen 2’s casing carried unchanged, with a new job title: the motor’s first suspension.',
      mass: 33,
      count: 4,
      specs: [
        ['Size', '185/50 R21, XL load index 98, carried from Gen 2'],
        ['Rolling resistance', '5.2 kg/t installed'],
        ['Cold pressure', '3.4 bar'],
        ['Rear unsprung adder', '28 kg hardware per corner, ~11 kg net of deletions'],
        ['Lateral limit', '~0.85 g, ESC-managed, unchanged'],
        ['Supply', 'Second source qualified in year two'],
      ],
      how: 'The casing is Gen 2’s, untouched: 185/50 R21 at 3.4 bar, the contact patch spent long and narrow so braking keeps its length while rolling loss and frontal area give up their width. Nothing upstream of the tyre changed in Gen 3, so the tyre does not change either; installed Crr stays at 5.2 kg/t and the lateral limit stays near 0.85 g with stability control covering the margin. What did change is the economics of the size. Gen 2 shipped a one-supplier special and called it the i3 lesson. Two generations of volume later there is a second source, and the spare-availability failure mode Gen 2 disclosed is half retired.\n\nWhat changed underneath is the load case. Each rear corner now hangs about 28 kg of motor hardware on the unsprung side of its springs, a net gain of roughly 11 kg over Gen 2 once the deleted drum, spider, and halfshaft are counted, and the tyre is the first spring in that unsprung stack. A casing this stiff at 3.4 bar passes sharp inputs almost straight through, which Gen 2 paid for in ride and Gen 3 pays for twice, because on the far side of the rear wheel now sits a rotor holding a 1.0 mm air gap against its stator. The sidewall is, literally, the motor’s first suspension: its vertical rate sets how much of every pothole reaches the magnet ring, and the drivetrain-3 damper tune is built around that number. The 92 mm sidewall was chosen by Gen 2 for rolling loss; Gen 3 inherits it as an air-gap protection spec.',
      why: 'Carrying a part is a decision, not an omission. The Gen 2 tyre was designed against the duty cycle this car actually lives, and the in-wheel rear axle raises the value of everything the casing already was: stiff, predictable, and consistent unit to unit, because a tyre that varies is now a motor mount that varies.',
      fail: [
        'The ride bill compounds: Gen 2’s stiff casing plus Gen 3’s unsprung mass means expansion joints report with even more honesty, and the damper hydraulics answer only some of it.',
        'A rear deflation is a drivetrain event: the corner detects pressure loss and ramps torque out within a wheel revolution, because a flat lets the rim strike road through the casing, and the rim carries the rotor.',
        'Per-wheel torque vectoring works the rear shoulders harder than any Gen 2 duty; tyre rotation moves from suggestion to schedule.',
      ],
      explode: [0, 0, 0.85],
    },
    'front-rims': {
      name: 'Front wheels',
      tagline: 'Gen 2’s carbon-hybrid wheel carried unchanged, so the rear wheel can afford to be radical.',
      mass: 16,
      count: 2,
      specs: [
        ['Size', '21 x 6J, offset ET40'],
        ['Construction', 'CFRP barrel, forged 6061 spider, carried from Gen 2'],
        ['Joint', 'Structural adhesive plus ten titanium bolts'],
        ['Mass per wheel', '7.8 kg'],
        ['Field history', 'One full generation of bond-line fleet data'],
      ],
      how: 'The construction is Gen 2’s argument executed and left alone: carbon does hoop tension and bending in the barrel, forged aluminium takes bolt clamp, bearing loads, and kerb strikes at the spider, and a glass ply keeps the carbon and the aluminium from becoming a battery in winter salt. The front corner above it kept the Gen 2 axial-flux drive unit, the second consecutive carry-over on that axle, and drivetrain-3 says why. So the wheel has no new job, no new loads, and no reason to be new.\n\nThe carry-over is also the risk ledger balancing itself. Gen 2 shipped this wheel with an open fatigue question on the bond line at 300,000 km, answered by belt-and-braces design and inspection intervals. A generation of fleet data has since walked that curve without a new failure mode surfacing, which is worth more than any redesign: the same part with more history is a better part. Meanwhile the tooling amortizes across a second generation, which is how a wheel that cost triple the forging premium in Gen 2 quietly becomes ordinary money in Gen 3.',
      why: 'Gen 3 spends its entire risk budget at the rear axle, where the wheel became a motor part. An integration generation that also churned its proven parts would be a generation that learns nothing; the front wheel is carried precisely so the rear wheel can be radical.',
      fail: [
        'The bond line’s 300,000 km question is better bounded, not closed; adhesive fatigue data only ever accumulates, it never concludes.',
        'Barrel damage is still scrap, still invisible from outside, still a tap test and ultrasound at service.',
        'Front and rear wheels are now different constructions with different service rules, and the pair that looks alike through a cover is not interchangeable, a mistake a hurried shop will eventually make.',
      ],
      explode: [0, 0, 1.15],
    },
    'rear-rims': {
      name: 'Structural rear rims',
      tagline: 'The barrel is the rotor carrier: one bolted flange where Gen 2 kept a whole spider, and the wheel becomes a motor part.',
      mass: 14,
      count: 2,
      specs: [
        ['Construction', 'CFRP barrel on a forged 6061 flange and sleeve'],
        ['Interface', 'Flange face at |z| 0.72 m; drivetrain-3 rotor ring bolts here'],
        ['Motor annulus', 'r 0.155 to 0.235 m left void for the wheel motor'],
        ['Mass per wheel', '7.0 kg, lighter than the front despite being structural'],
        ['Runout at flange', '0.15 mm total, a bearing tolerance on a wheel'],
        ['Kerb strike', 'SAE J175 13 degree; the sleeve yields before the air gap closes'],
      ],
      how: 'Gen 2’s rear wheel was a barrel, a spider, and a hub joint. This wheel deletes the spider. The barrel extends inboard as a forged sleeve that wraps the motor annulus with 15 mm of radial clearance and ends in a machined flange face 0.72 m from centreline, where drivetrain-3’s rotor ring bolts on with twelve titanium fasteners. That flange is the wheel’s only connection to the car: torque runs rotor ring to flange to barrel to bead, and the Gen 2 chain of shaft, spline, hub face, and spider is gone. Deleting the spider is why the structural wheel is the lighter wheel, 7.0 kg against the front’s 7.8, while carrying loads the front never sees.\n\nThe bill is tolerance. A wheel used to be balanced to a few grams and trued to half a millimetre; this one carries a rotor running an air gap of well under a millimetre from its stator, so flange runout is held to 0.15 mm, the barrel is measured and serialized like a bearing race, and wheel balance becomes a motor smoothness spec, because an imbalance here is a rotating magnetic load the vectoring controller must fight at wheel frequency. The forged sleeve also manages the materials problem: CFRP and the steel-backed magnet ring grow differently with temperature, and the aluminium between them is sized to keep the bolted joint loaded across the whole thermal range.',
      why: 'Gen 2’s rear corner held two structures doing one job: the wheel’s spider carried the rim to the hub, and the motor housing carried the rotor to the same hub, bolted centimetres apart. Merging them deletes about 0.8 kg per corner, shortens the torque path to almost nothing, and is a large part of why in-wheel drive finally pays. The cost is written on every service procedure: this wheel is a drivetrain component that happens to hold a tyre. The insurance file says it plainer: a kerbed Gen 2 rim was a wheel claim, priced like a wheel; the same kerb here writes off a serialized rotor carrier and books an air-gap inspection, and the premium carries the difference.',
      fail: [
        'A kerb strike is now a drivetrain event: a bent flange closes an air gap, so any impact triggers runout measurement and ultrasound before the corner drives again, and scrap is the common verdict. Carbon still does not bend and confess.',
        'The flange bolts live under torque-vectoring reversals that a Gen 2 wheel bolt never saw; they are the fatigue item of the corner, torque-checked at every tyre change.',
        'Tyre shops need the interlock: the rim comes off over a magnet ring that pulls on every steel tool near it, corner de-energized and drum applied. The procedure is printed, and the first shop to skip it will demonstrate why.',
      ],
      explode: [0, 0, 0.85],
    },
    covers: {
      name: 'Heat-extraction covers',
      tagline: 'Gen 2 sealed the wheel and banked the drag. Gen 3 spends a sliver of it back to make the cover the motor’s fan.',
      mass: 4,
      count: 4,
      specs: [
        ['Rear', 'CFRP skin, twelve bonded aluminium vanes, 1.3 kg each'],
        ['Front', 'Gen 2 flush cover carried, 0.7 kg each'],
        ['Rear airflow', 'Hub inlet to rim exit, ~110 m3/h at motorway speed'],
        ['Cooling duty', '~450 W continuous per motor ring'],
        ['Drag', 'Cd -0.010 against an open wheel; Gen 2 flush was -0.012'],
      ],
      how: 'Gen 1 identified the open wheel as a centrifugal pump and spent two generations sealing it. Gen 3 needs a pump again, because a motor now lives in the wheel, so it reopens exactly as much pumping as the motor needs and not a litre more. The rear cover takes air in at a hub inlet, flings it outward through twelve backward-swept aluminium vanes bonded to the inner skin, sweeps it across the drum and the motor sleeve, and exhausts it through the slot between cover rim and barrel edge. There is no fan motor, no bearing, no controller: the cover already spins at wheel speed, and wheel speed is when the motor makes heat.\n\nThe honest ledger: pumping air is drag by definition, the exact drag Gen 1 eliminated. The vaned face gives back 0.002 of the Gen 2 cover’s 0.012 Cd credit, roughly 80 W at 110 km/h, under 1 Wh/km, purchased so about 450 W of continuous heat per corner can leave a sealed corner. The stator’s liquid loop, which drivetrain-3 owns, does the heavy lifting; the cover handles the rotor and drum share the liquid cannot reach. The front covers are Gen 2’s flush discs carried unchanged, because there is no front motor and therefore no reason to spend the drag.',
      why: 'A dedicated cooling fan would be a part, a mass, a bearing, and a failure mode. The cover was already there, already spinning, already at the right speed at the right time. Making the part that sealed the wheel also cool the motor is the most Gen 3 sentence in this system: one part, two functions, the bill itemized in Cd.',
      fail: [
        'A removed or kerb-cracked rear cover is no longer a 2% range story, it is a powertrain derate: the thermal model assumes the fan exists, notices when it does not, and caps the motor accordingly.',
        'Vanes foul with brake dust and winter grime, and pumping capacity decays invisibly until a mountain climb finds it. The service answer is a wash interval, and the honest prediction is that nobody follows it.',
        'Fan speed equals wheel speed, so the low-speed hill crawl that heats the motor most gets the least air; that regime leans entirely on the stator liquid loop, which drivetrain-3 discloses in its own ledger.',
      ],
      explode: [0, 0, 0.97],
    },
    discs: {
      name: 'Front brake discs',
      tagline: 'Carried from Gen 2: the iron is sized by the stop software cannot refuse, and that stop has not changed.',
      mass: 11,
      count: 2,
      specs: [
        ['Size', '355 x 28 mm, internally vented, carried from Gen 2'],
        ['Construction', 'Iron ring floating on a forged alloy hat'],
        ['Duty share', '<6% of braking energy, and falling'],
        ['Single-stop energy', '~1.8 MJ from 160 km/h, front pair'],
        ['Sizing case', 'Alpine descent, full pack, regen saturated'],
      ],
      how: 'Second consecutive carry-over, and the reasoning has not moved: brakes are sized by the stop the software cannot refuse, an alpine descent on a full pack where regen has nowhere to send the energy and iron takes all of it. The car is a shade lighter than Gen 2, load transfer still puts about three quarters of a panic stop on this axle, and 1.8 MJ from 160 km/h still lands inside the pads’ friction window. The route-preconditioning logic Gen 2 introduced carries over too, pulling state of charge down before long grades so regen keeps its authority.\n\nWhat changed is what stands behind them. Gen 2 kept rear drums that could still contribute to a service stop; Gen 3’s rear friction is a park-and-rescue drum with no fade capacity worth the name. In the dead-HV fallback, the case where every motor is offline, the front iron is now very nearly the entire car’s stopping capability, and that case, not the average duty cycle that fell again with per-wheel regen, is what froze the disc at 355 x 28 when the accountants asked for 340.',
      why: 'The duty share keeps falling and the disc keeps not shrinking, which looks like conservatism and is actually arithmetic: the worst case is set by law and physics, not by how rarely it happens. Gen 1 wrote that sentence, Gen 2 tested it, Gen 3 carries it.',
      fail: [
        'Corrosion still writes the schedule: rings used a twentieth of the time rust, and the wipe-apply habit enters its third generation.',
        'The first friction stop after weeks of regen carries a deeper low-mu dip than ever, because friction stops keep getting rarer; the compensating pre-fill pressure grows a little each generation.',
        'Fade margin is partly software: refuse route data and start a pass on a full pack, and the honest number is thinner than Gen 1’s iron ever was.',
      ],
      explode: [0, 0, 0.45],
    },
    calipers: {
      name: 'Front calipers',
      tagline: 'The same monobloc discipline, now the only hydraulic device left on the car.',
      mass: 6,
      count: 2,
      specs: [
        ['Type', 'Fixed monobloc, 4 x 38 mm pistons, carried from Gen 2'],
        ['Clamp force', '36 kN at 160 bar'],
        ['Pads', 'Low-copper NAO, friction ~0.38'],
        ['Residual drag', '<0.5 Nm, and only two corners exist to drag'],
        ['Scope', 'The last hydraulic actuator remaining on the vehicle'],
      ],
      how: 'The hardware is Gen 2’s: one forging machined into a fixed monobloc so hard-stop fluid volume becomes clamp force instead of bridge flex, rollback seals pulling the pads 0.1 mm clear on release, the body mounted at 9 o’clock behind the axle, out of the steering arc. Nothing in the Gen 3 front corner asked it to change, so it did not.\n\nIts context changed around it. The entire hydraulic system of the car now exists to serve these eight pistons: one pressure block, two lines, two calipers, and not a millilitre of fluid anywhere else. That concentration cuts both ways. Bleeding, seal service, and fluid life now touch exactly one subsystem at two corners, the cheapest hydraulic maintenance bill this platform has ever carried; and every certification argument about the dead-vehicle stop runs through this single component pair, which is why its design margin stayed Gen 2 sized while everything aft of it shrank.',
      why: 'The last friction actuator that must deliver 36 kN after months of silence earns premium execution for the reason Gen 2 gave: it is the actuator for the only stop that matters. Being the last of its kind on the car only sharpens the argument.',
      fail: [
        'Pads age by time and glazing rather than wear; the service interval is set by chemistry, not kilometres.',
        'Fixed calipers still tolerate little runout, and a neglected juddering ring knocks pads back with no rear hydraulic reserve behind the mistake, same as Gen 2, with even less behind it.',
        'Two calipers means two single points: the case leans on the dual-circuit block and honest inspection, and inspection is the part owners skip.',
      ],
      explode: [-0.3, 0, 0.2],
    },
    drums: {
      name: 'Park-and-rescue drums',
      tagline: 'The legal floor of friction braking, living inside the motor: park, hold, and the last metre of a dead car.',
      mass: 3,
      count: 2,
      specs: [
        ['Type', '250 x 30 mm simplex, inside the motor ring bore'],
        ['Actuation', 'Dry gearmotor and spindle, no fluid, Gen 2 thinking carried'],
        ['Duty', 'Park on a 30% grade, rescue below 20 km/h, dead-HV stop'],
        ['Mass', '1.5 kg per corner; Gen 2’s sealed drum was 4.5'],
        ['Housing', 'None of its own: shares the motor ring’s sealed volume'],
      ],
      how: 'Gen 2’s drum was a service brake that also parked: it covered the low-speed blend handover where its motors got ragged near zero. The in-wheel rears delete that duty, because a direct-drive wheel motor holds clean torque to a standstill, no lash, no handover. What remains for rear friction is statute and worst case: hold the car on a grade, catch the last metre if commanded, and stop a car whose high-voltage system is entirely dead. That duty is measured in single-digit kilojoules, and 250 x 30 mm of drum answers it with margin.\n\nIntegration is where the other three kilograms went. The Gen 2 drum carried its own sealed aluminium housing; this one borrows its enclosure from the motor. The drum surface hangs on a drive ring off the rim flange, the shoes and gearmotor mount to the upright behind the stator, and the same seal that keeps road spray out of the windings keeps it out of the shoes. There is no separate drum housing anywhere in the corner: the friction brake lives in the motor’s bore like a tenant, and pays its rent in shoe dust that a trap liner has to collect.',
      why: 'The temptation was zero. Regen plus per-wheel motors can cover every braking scenario that involves a live vehicle, and deleting the drum would save three kilograms and a supplier. It stays because the law requires a car with every electron gone to hold and to stop, and the law is right. Gen 2 said the rear friction brake had become a parking device; Gen 3 finishes the sentence and sizes it as one. But it must not vanish.',
      fail: [
        'It is a rescue actuator, not a brake: two full applies from 20 km/h and it needs minutes to cool. Above walking pace it fades fast, by design and by disclosure.',
        'It is the least inspectable friction device this platform has fitted: inside the motor, inside the wheel. Shoe condition is inferred from gearmotor current signatures, and the self-adjusting spindle that could jam in Gen 2 can still jam here, now behind more hardware.',
        'Sharing the motor’s sealed volume means sharing its cleanliness spec: a worn shoe sheds into a space that also contains an air gap, and the dust trap liner is a service item with a real interval.',
      ],
      explode: [0, 0, 0.85],
    },
    'master-unit': {
      name: 'Brake-by-wire unit',
      tagline: 'The Gen 2 box carried, with a bigger job: one pedal, seven actuators, and a proof that two controllers cannot fail together.',
      mass: 3,
      specs: [
        ['Architecture', 'One-box dry unit, front hydraulics only, carried from Gen 2'],
        ['Pressure build', '0 to 180 bar in 120 ms'],
        ['Actuators arbitrated', 'Two calipers, front axle regen, two wheel motors, two drums'],
        ['Rear ABS', 'Motor field control, kilohertz class, no valves'],
        ['Fallback', 'No push-through: motors plus drums, ~0.4 g'],
      ],
      how: 'The hardware is carried: dry pedal unit, simulator, dual ECUs on separate supplies, the plunger block feeding two front calipers, and no push-through rod, exactly as Gen 2 certified it. The software scope is what grew. The pedal now stands in front of seven actuators in four kinds: hydraulic clamp, front axle regen, two independently commanded wheel motors, and two drum gearmotors. Braking at the rear axle stopped being a pressure problem entirely: a wheel motor modulates torque at kilohertz rates, so rear ABS is field control, finer and faster than any valve, and the yaw authority that vectoring buys in drive is the same mathematics this unit uses in a braked corner.\n\nThe new hard problem is arbitration. Drivetrain-3’s vectoring controller and this unit both command the same two rear motors, so there is a priority line between them: a braking demand overrides a vectoring demand within two milliseconds, always, provably. That interface is the Gen 3 addition to the certification file Gen 2 started. The statistical independence case that replaced the push-through rod now spans this unit, the vectoring controller, and the rim-side inverters: three codebases, two suppliers, one argument that they cannot fail together, and every release of any of them reopens the file.',
      why: 'Gen 1 decoupled the pedal and let software claim the braking energy. Gen 2 resized the hydraulics to the job and swapped a steel rod for a proof. Gen 3 keeps the box and inherits the proof, then extends it across the drivetrain, because when the motors are the brakes, the brake controller and the drive controller are one safety system wearing two part numbers.',
      fail: [
        'The arbitration line is the new single point: a disagreement between braking and vectoring is settled by a two-millisecond priority rule that has to be right every time, and it is tested more than any other line of code on the car.',
        'The independence case now includes another supplier’s inverter firmware; the longest lead-time item in Gen 2 got longer.',
        'The 0.4 g fallback leans on motors that live at the wheels, in the crash zone; the drums underwrite the last metres, at walking pace, and the certification file says so in exactly those words.',
      ],
      explode: [0.5, 0.35, 0],
    },
  },
};

/* ── Geometry ──
   Corner-local frame matches both predecessors: origin at the wheel centre,
   z along the axle, s = sign(world z) so +s is outboard. Front corners keep
   the Gen 2 staggered explode ladder; rear-corner part groups explode at
   [0, 0, s * 0.85] per the drivetrain-3 contract, so the rear corner
   leaves the car as one assembly and the motor ring opens the flange
   joint. The one exception is the rear cover at s * 0.97: it matches the
   motor ring's vector so the ring (76 mm deep, gaining 0.12 of travel)
   never crosses the cover face during the sweep. World |z| maps to local
   z as s * (|z| - 0.81). */

const TIRE_SEG = 48;

function tirePart(s, rear) {
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
  /* rear signature: tires share one id, one explode, front and rear */
  void rear;
  return g;
}

/* Front wheels: Gen 2 carbon-hybrid construction carried unchanged. */
function frontRimPart(s) {
  const g = lib.part('front-rims', [0, 0, s * 1.15]);
  const barrel = lib.cyl(0.263, 0.15, M.carbon, 32);
  barrel.rotation.x = Math.PI / 2;
  g.add(barrel);
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

/* Structural rear rim: no spider. A forged flange and sleeve (alu) wrap
   the motor annulus radially outside it, ending in the contract flange
   face at world |z| = 0.72 (local -0.090). The CFRP barrel continues
   outboard from world |z| 0.80 so the annulus, r 0.155..0.235 over
   |z| 0.72..0.80, stays void: the sleeve wall sits at r 0.250. */
function rearRimPart(s) {
  const g = lib.part('rear-rims', [0, 0, s * 0.85]);

  const flangeSleeve = lib.lathe(
    [
      [0.150, -0.090],   /* flange inner edge, on the contract face plane */
      [0.246, -0.090],   /* flange face annulus at world |z| 0.72 */
      [0.250, -0.086],
      [0.250, -0.012],   /* sleeve wall, 15 mm outside the motor annulus */
      [0.256, -0.008],
    ].map(([r, a]) => [r, s * a]),
    M.alu,
    40
  );
  flangeSleeve.rotation.x = Math.PI / 2;
  g.add(flangeSleeve);

  const barrel = lib.lathe(
    [
      [0.256, -0.008],
      [0.256, 0.014],
      [0.263, 0.020],
      [0.263, 0.072],   /* main bead barrel out to world |z| 0.882 */
      [0.271, 0.077],   /* outboard bead flare */
    ].map(([r, a]) => [r, s * a]),
    M.carbon,
    40
  );
  barrel.rotation.x = Math.PI / 2;
  g.add(barrel);

  /* Rotor-ring bolt circle: twelve fasteners at r 0.225, coaxial with the
     drivetrain-3 rotor ring's own bolt circle, heads on the inboard side,
     snug against the flange face (z 0.7121..0.7199) so they stay out of
     the contract annulus outboard and off the battery-3 floor-lid corner
     inboard. */
  const boltRing = lib.bolts(12, 0.225, 0.0065, M.steel);
  boltRing.rotation.x = Math.PI / 2;
  boltRing.position.z = s * -0.094;
  g.add(boltRing);

  const stiffener = lib.torus(0.257, 0.006, M.carbon, 40, 8);
  stiffener.position.z = s * 0.070;
  g.add(stiffener);

  return g;
}

/* Front cover: Gen 2 flush disc carried. */
function frontCoverPart(s) {
  const g = lib.part('covers', [0, 0, s * 1.45]);
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

/* Rear cover: the motor's fan. Flush outer skin, hub inlet, and twelve
   backward-swept vanes hanging inboard into the open barrel bore. All
   geometry sits outboard of world |z| 0.86, far clear of the annulus.
   Explodes at s * 0.97, the motor ring's vector, not the corner's 0.85:
   the ring's extra 0.12 of travel would otherwise push its 76 mm deep
   band straight through this face; matched vectors preserve the static
   69 mm ring-to-vane clearance through the whole explode sweep. */
function rearCoverPart(s) {
  const g = lib.part('covers', [0, 0, s * 0.97]);
  const face = lib.cyl(0.262, 0.006, M.carbon, 40);
  face.rotation.x = Math.PI / 2;
  face.position.z = s * 0.082;
  g.add(face);
  const trim = lib.torus(0.24, 0.004, M.plasticLt, 40, 8);
  trim.position.z = s * 0.0855;
  g.add(trim);
  const inlet = lib.cyl(0.052, 0.005, M.darkSteel, 20);
  inlet.rotation.x = Math.PI / 2;
  inlet.position.z = s * 0.0835;
  g.add(inlet);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const vane = lib.box(0.016, 0.13, 0.022, M.alu);
    vane.position.set(Math.cos(a) * 0.145, Math.sin(a) * 0.145, s * 0.068);
    vane.rotation.z = a - Math.PI / 2 + 0.35;   /* backward sweep */
    g.add(vane);
  }
  const fasteners = lib.bolts(5, 0.16, 0.006, M.alu);
  fasteners.rotation.x = Math.PI / 2;
  fasteners.position.z = s * 0.086;
  g.add(fasteners);
  return g;
}

/* Front only: 355 x 28 two-piece disc, carried from Gen 2. */
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

/* Rear, spun half: the drum band and its drive ring hang off the rim
   flange inside the motor bore (r <= 0.148, inside the annulus inner
   radius of 0.155, over world |z| 0.72..0.79). */
function drumShellPart(s) {
  const g = lib.part('drums', [0, 0, s * 0.85]);
  const band = lib.mesh(
    new THREE.CylinderGeometry(0.125, 0.125, 0.062, 32, 1, true),
    M.castAlu
  );
  band.rotation.x = Math.PI / 2;
  band.position.z = s * -0.052;
  g.add(band);
  const driveRing = lib.lathe(
    [[0.078, -0.076], [0.148, -0.076]].map(([r, a]) => [r, s * a]),
    M.castAlu,
    32
  );
  driveRing.rotation.x = Math.PI / 2;
  g.add(driveRing);
  const lip = lib.torus(0.125, 0.004, M.castAlu, 32, 8);
  lip.position.z = s * -0.022;
  g.add(lip);
  return g;
}

/* Rear, static half: backplate, shoes, and the dry gearmotor, mounted to
   the upright inboard of the contract flange plane. Shares the drums id.
   Explodes at the same s * 0.85 as the rest of the rear corner per the
   drivetrain-3 contract, so the corner tears down as one assembly.
   Backplate and gearmotor sit inboard of world |z| 0.704, clear of the
   drivetrain-3 hub carrier spokes (|z| 0.704..0.716, r to 0.147). */
function drumBackPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('drums', [0, 0, s * 0.85]);
  g.position.set(x, P.wheelY, z);
  const plate = lib.cyl(0.122, 0.008, M.darkSteel, 32);
  plate.rotation.x = Math.PI / 2;
  plate.position.z = -s * 0.112;
  g.add(plate);
  for (const a of [Math.PI * 0.125, Math.PI * 1.125]) {
    const shoe = lib.mesh(
      new THREE.TorusGeometry(0.095, 0.013, 8, 16, Math.PI * 0.75),
      M.steel
    );
    shoe.rotation.z = a;
    shoe.position.z = -s * 0.055;
    g.add(shoe);
  }
  const motor = lib.cyl(0.017, 0.045, M.plastic, 14);
  motor.rotation.x = Math.PI / 2;
  motor.position.set(-0.048, -0.075, -s * 0.130);
  g.add(motor);
  return g;
}

/* Front fixed calipers at 9 o'clock, behind the axle, clear of the
   steering arc, riding above the axle centreline so the lower edge clears
   the battery envelope top. Carried from Gen 2. Never rotates. */
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

/* Brake-by-wire unit on the bulkhead shelf, carried from Gen 2: dry pedal
   unit, front pressure block, two hydraulic lines forward. The redundant
   aft harnesses now carry drum gearmotor commands plus the braking
   arbitration line to the rear wheel-motor inverters. */
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

  /* Pedal signal conduit, carried: no push-through rod. */
  const conduit = lib.cyl(0.006, 0.05, M.plastic, 10);
  conduit.rotation.z = Math.PI / 2;
  conduit.position.set(0.87, 0.595, -0.35);
  g.add(conduit);

  /* Two short hydraulic lines to the front calipers, over the drive
     unit envelope like both predecessors. */
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

  /* Redundant harnesses aft to the rear corners, run outboard of the
     battery envelope just above the pack flange, then ducking inboard of
     |z| 0.72 past the last pack rail so they approach the upright clear
     of the drivetrain-3 motor annulus: drum commands and the
     brake-priority arbitration line. */
  const harnL = lib.tube(
    [
      [0.92, 0.57, -0.38],
      [0.70, 0.42, -0.55],
      [0.30, 0.345, -0.74],
      [-0.60, 0.345, -0.74],
      [-1.15, 0.35, -0.70],
      [-1.30, 0.32, -0.68],
      [-1.44, 0.29, -0.65],
      [-1.50, 0.275, -0.63],
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
      [-1.15, 0.35, 0.70],
      [-1.30, 0.32, 0.68],
      [-1.44, 0.29, 0.65],
      [-1.50, 0.275, 0.63],
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
    if (front) {
      spinGroup.add(tirePart(s, false), frontRimPart(s), frontCoverPart(s), discPart(s));
    } else {
      spinGroup.add(tirePart(s, true), rearRimPart(s), rearCoverPart(s), drumShellPart(s));
    }
    sys.add(spinGroup);

    /* Static halves: front calipers grip the discs; rear backplates carry
       shoes and gearmotor. Neither rotates. */
    sys.add(front ? caliperPart(x, z) : drumBackPart(x, z));
  }

  sys.add(masterUnitPart());
  return sys;
}
