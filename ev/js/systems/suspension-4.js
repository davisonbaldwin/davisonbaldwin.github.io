/* Suspension, generation 4: the active chassis. First variant of a slot
   that shipped in Gen 1 and slept through two generations. The structure
   is carried (subframes, wishbones, knuckles, links, the lib.mirrorZ
   corner pattern, all of it), and everything that pushes on it is new:
   air springs and their supply, continuously variable dampers with 48 V
   valve heads, anti-roll bars that disconnect on the straight, a dual-lane
   steer-by-wire rack with the Gen 1 column stub deleted, a rear-steer
   actuator, and the chassis ECU that conducts them. 172 kg against
   Gen 1's 164; the content owns the increase.

   BINDING interface contract with hv-4 (design/gen4.md): hv-4 owns the
   dual 48 V by-wire runs along each rocker top (y 0.36, |z| 0.70) and
   terminates them at four stubs at (1.30, 0.36, +/-0.70) and
   (-1.30, 0.36, +/-0.70). This module places a matching connector boss,
   box 0.03 x 0.02 x 0.02, centered at EXACTLY each stub point, and runs
   its own short leads from the bosses to its actuators. Neither module
   duplicates the other's side. Both sides give these parts explode
   [0, -0.25, 0] so the mated connection separates as a pair.

   Geometry notes: Gen 1 suspension.js carried a local mirrorZ because
   lib.mirrorZ crashed on cloned userData at the time. common.js has been
   fixed since (it rebuilds the explode Vector3 with z negated), so this
   module uses lib.mirrorZ directly, per the shared pattern. The rear-steer
   actuator is slung below y 0.22 so it never enters the P.driveR zone;
   the ARB clutch drums sit on the subframe crossmembers at x +/-1.70 on
   the carried Gen 1 bar line (which has crossed the drive-zone footprint
   since Gen 1); drivetrain-3's front unit is verified to end at x 1.648
   at its widest (disc rim, y 0.40) and x 1.628 at drum height, 16 mm
   clear of the drum face at x 1.664. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'suspension-4',
  name: 'Suspension · Gen 4 active',
  color: 0xc0a2ec,
  explode: [0, -0.62, 0],
  blurb: 'The slot that slept through two generations wakes up: air under every corner, a valve in every damper, bars that let go on the straight, and both axles steering. 172 kg against Gen 1\'s 164, and the 8 kg is the honest price of reflexes.',
  parts: {
    'front-structure': {
      name: 'Front subframe and wishbones',
      tagline: 'Gen 1\'s front structure carried bolt for bolt, because geometry this right had nothing left to give.',
      mass: 55,
      specs: [
        ['Carried from', 'Gen 1 front-subframe, wishbones, knuckles'],
        ['Geometry', 'Unequal double wishbone, 9.5 deg kingpin'],
        ['Camber gain', '-1.3 deg per 60 mm bump, unchanged'],
        ['Additions', 'Air-strut bracket, wheel-travel sensor'],
        ['Mass', '55 kg, the Gen 1 number to the kilogram'],
      ],
      how: 'Everything structural here is Gen 1 by drawing number: the 24 kg extruded 6082-T6 subframe with its post-weld pivot bores at plus or minus 0.15 mm, the 15 kg of forged unequal wishbones giving 1.3 degrees of negative camber per 60 mm of bump, the 16 kg of hollow A356 knuckles holding seven machined interfaces in one reference frame. The 11 kN cornering loads, the shear-off crash bolts, the tuned bush rates: none of it moved. Two small things were added, a forged bracket on each lower arm that seats the air strut where the coilover used to sit, and a travel sensor whose thin link the chassis ECU reads a thousand times a second.\n\nThis slot skipped Gen 2 and Gen 3 deliberately. Gen 2 optimized parts in place and Gen 3 merged structures, and both times the question was asked and answered: passive springs and dampers tuned this carefully were not the bottleneck, range and structure were, so the metal stayed. What changed for Gen 4 is upstream of the metal. hv-4 delivers kilowatts of clean 48 V to each corner and autonomy-4 reads the road half a second ahead, and a passive chassis can spend neither. The forces have not changed: an air spring at 8.4 bar delivers the same 5.1 kN the coil did, through the same seat, down the same load path. Structure that cannot tell the difference does not get redesigned.',
      why: 'The temptation in an active generation is to touch everything, and the discipline is the opposite: every kilogram of the plus 8 budget goes to parts that do something, and none to re-drawing parts that were already right. Carrying 55 kg unchanged across a two-generation gap is not neglect, it is the wheels-3 front wheel argument applied to a whole subassembly: the same part with more fleet history is a better part.',
      fail: [
        'The Gen 1 field failures carry over unchanged: torn ball joint boots grind joints loose in months, and bush aging shows as inner-shoulder tire wear before any driver feels it.',
        'The travel sensor is new and load-bearing for control: if it lies, skyhook control corrupts. Each corner is plausibility-checked against the other three, and a failed check drops that corner to the passive curve.',
        'The air-strut bracket sees the same peak loads the spring seat always did, but its fatigue spectrum is new; it is the one welded detail here without ten years of history.',
        'An open defect, measured and not fixed. The upper arm\'s rear inner pivot is inside the front casting. body/front-casting draws its rail as a solid from x 1.550 to 2.060 over y 0.300 to 0.580 and |z| 0.355 to 0.595, and the pivot sits at (1.650, 0.550, 0.380), which is 100 mm past that rail\'s rear face with its whole bush inside; the arm leaves through the face at (1.550, 0.5575, 0.540) and the checker reports 93.53 mm of straddle depth over 48 crossings on Gen 1 to Gen 3 and 92.68 mm over 152 from Gen 4. Nothing in this module reaches y 0.550, so the pivot has nowhere else to land: it is bolted to the casting and the casting is drawn as a brick. Moving it inboard of |z| 0.355 lengthens the upper arm by 25 mm, which is the camber gain and the roll center this panel argues from, so the repair is a wheel-well cavity in the casting rather than a shorter arm. Carried from Gen 1 with the arm.',
      ],
      explode: [0.15, -0.45, 0],
    },
    'rear-structure': {
      name: 'Rear subframe and links',
      tagline: 'Ten links become eight plus two tie rods: the five-link geometry carried, one rod per side handed to the steering.',
      mass: 54,
      specs: [
        ['Carried from', 'Gen 1 rear-subframe and rear-links'],
        ['Construction', 'Extruded rails, cast towers, hydraulic mounts'],
        ['Links', 'Four rods per side carried; toe links repointed'],
        ['Toe authority', 'Was 0.15 deg elastic, now 3 deg commanded'],
        ['Anti-squat', '~60% under power, unchanged'],
        ['Mass', '54 kg, unchanged since Gen 1'],
      ],
      how: 'The 28 kg subframe and the link set carry straight over: ten inner pivots each rated for 9 kN, cast towers holding better than 8 kN/mm of local stiffness, glycol-filled hydraulic mounts still killing the one-pedal driveline shuffle exactly as Gen 1 described. The constraint logic is untouched, each rod removes one degree of freedom, and the camber and spring links still tune independently, which is the property the whole five-link investment bought.\n\nOne change, and it is small in metal and large in capability. Gen 1\'s toe link ran from a subframe bush to the knuckle at a fixed length, steering the wheel elastically by 0.15 degrees under braking load. Gen 4 unbolts its inner end and lands it on the rear-steer rack that hangs below. The link, its length, its outer ball joint, and the knuckle toe arm are all unchanged; the elastokinematic toe-in under regen still happens, now on top of whatever angle the actuator commands, so the bushing tuning and the actuator add rather than fight. The other four rods per side never notice.',
      why: 'Gen 1 paid for five links with ten rods and twenty joints because it decoupled every parameter into its own tunable rod. Gen 4 collects on that investment: when toe already has a dedicated rod, making toe commandable is a bracket change, not an axle redesign. A twist-beam car wanting rear steer would start over.',
      fail: [
        'The toe link inner bush is gone, replaced by a ball joint on the rack; the stiffer path passes slightly more road noise, an honest small regression the hydraulic subframe mounts mostly absorb.',
        'Rear toe is now a software zero plus a mechanical check; an alignment shop that sets it purely mechanically, ignoring the actuator\'s stored center, will chase its own tail.',
        'Weld fatigue at the tower roots remains the durability watch item it was in Gen 1; the strain gauges on the test fleet stayed.',
      ],
      explode: [-0.15, -0.45, 0],
    },
    'air-springs': {
      name: 'Air springs',
      tagline: 'Four columns of compressed air that hold the same ride frequency whether the car is empty or full.',
      mass: 12,
      count: 4,
      specs: [
        ['Type', 'Rolling-lobe, single chamber'],
        ['Design pressure', '8.4 bar at the 520 kg front corner'],
        ['Ride frequency', '1.45 Hz front, 1.55 rear, at any load'],
        ['Leveling range', '-20 to +25 mm from nominal'],
        ['Piston area', '61 cm2 front'],
        ['Limp mode', 'Internal bumpstop, 80 km/h flat'],
      ],
      how: 'A rubber sleeve rolls on an aluminum piston; pressure times piston area carries the corner, and the stiffness of the trapped air column sets the rate. Both load and rate scale with pressure, so their ratio, the ride frequency, stays fixed: the property no steel coil has. The fronts are struts, the bellows wrapped around the damper on the Gen 1 coilover line into the same tower mount. The rears stand on the Gen 1 spring-link perch at the same 0.64 motion ratio, keeping the 60 mm of trunk floor the divorced layout bought.\n\nGen 1\'s own spec sheet wrote the case for this part. Its rear springs admitted a 25 mm squat under 350 kg of payload, and its flat-ride trick, the 0.1 Hz front-to-rear offset, was tuned true at one design load only. Air holds height to plus or minus 3 mm and holds the offset at every load, so the flat-ride phasing works for one occupant or five. Height then becomes a control variable rather than a consequence: the body drops 20 mm above 110 km/h for roughly 2 percent less consumption, rises 25 mm for a rutted driveway, and kneels at the curb for loading.',
      why: 'A steel coil is one point on a load-deflection line, chosen the day the prototype was weighed, and the real corner weight then swings 25 percent in service. Air re-chooses the point continuously. The ledger is owned honestly: Gen 1 spent 31 kg on coils and dampers, Gen 4 spends 35 on air, valves, and the supply unit that serves them, and the 4 kg buys leveling, constant frequency, and ride height as a free variable.',
      fail: [
        'Grit between sleeve and piston abrades the lobe; the boots matter, and a torn one turns a 10-year part into a 2-year part.',
        'A slow leak announces itself weeks early as a rising compressor duty trend, an unusual courtesy for a rubber part. Ignoring the trend ends at the bumpstop.',
        'Total pressure loss drops the corner onto its internal bumpstop: a hard but drivable 80 km/h limp, deliberately not a tow.',
      ],
      explode: [0, 0.62, 0.18],
    },
    'air-supply': {
      name: 'Compressor and valve block',
      tagline: 'A 3-liter reservoir does the fast work so a 300 W compressor can do the slow work.',
      mass: 7,
      specs: [
        ['Compressor', 'Twin piston, 300 W at 48 V'],
        ['Reservoir', '3.0 L at 15 bar'],
        ['Dryer', 'Desiccant bed, vent-regenerated'],
        ['Lift speed', '40 mm, all corners, in 6 s'],
        ['Feed', 'hv-4 front passenger zone'],
      ],
      how: 'The architecture is a reservoir with a compressor behind it. Height changes move air from the 15 bar tank through the valve block into the springs, 40 mm of lift on all four corners in about 6 seconds; the compressor then refills the tank at its leisure. Without the tank the compressor would need better than a kilowatt to feel responsive; with it, 300 W suffices, and 300 W at 48 V is 6.5 A through unremarkable wire where a 12 V design would pull 26.\n\nCompressed air carries water, and ice in a valve block is a dead corner in January, so every liter passes a desiccant bed on the way in and the bed dries itself in the exhaust stream on every vent. The unit lives ahead of the front subframe on the passenger side, low and on rubber isolators, because it runs while the car is parked and leveling, and a compressor heard through a quiet shell at midnight sounds like a fault even when it is doing its job.',
      why: 'One central supply beats four corner pumps because plumbing costs grams per meter while motors cost kilograms each, and beats a bigger compressor because the reservoir converts peak demand into average demand. Sizing for the average is the whole 7 kg staying 7 kg.',
      fail: [
        'A saturated dryer cascades: wet air, then wet valves, then ice. The bed is a service item with a humidity sensor watching it, and the sensor is there because nobody changes desiccant on schedule.',
        'The compressor is the wear item, piston rings good for roughly eight years of duty; the duty-cycle counter doubles as the system\'s leak detector.',
        'A reservoir puncture is fail-freeze, not fail-drop: each spring\'s check valve holds its last pressure, the car keeps its height and loses only the ability to change it.',
      ],
      explode: [0.55, 0.3, 0.35],
    },
    'active-dampers': {
      name: 'Active dampers',
      tagline: 'Gen 1 ground its tune into steel shims; this valve chooses a new tune every millisecond.',
      mass: 16,
      count: 4,
      specs: [
        ['Base', '46 mm monotube, Gen 1 bore carried'],
        ['Valve', 'Proportional solenoid, 48 V head'],
        ['Force span', '0.4 to 3.2 kN at 0.5 m/s'],
        ['Valve full stroke', '4 ms'],
        ['Update rate', '1 kHz from the chassis ECU'],
        ['Fail state', 'Passive mid, the Gen 1 curve'],
      ],
      how: 'The monotube is Gen 1\'s, same bore, same gas backing, same thermal argument: this car pumps 40 percent more heat through its dampers than a 1,600 kg car, and the single wall still sheds it to the airstream. What changed is the valve. The shim stack was the tune, one digressive curve ground into spring steel; the proportional solenoid is any curve, selected per millisecond across an eight-to-one force span. The control law is skyhook: measure body velocity from the accelerometers and wheel velocity from the travel sensors, firm the valve when damping fights body motion, soften it when damping would only copy the road into the cabin. The 48 V head is what makes the law honest: the solenoid reaches full stroke in 4 ms, where the same coil at 12 V needed four times the current and took three times as long. At 80 km/h, 12 ms is 27 centimeters of road, the difference between reacting at the bump and after it.\n\nThe second input is preview. The forward wedge of autonomy-4\'s camera set maps road height to a few millimeters out to 15 m, and the chassis ECU converts that map into each wheel\'s next half second. A pothole edge arrives with the valve already soft; a crest arrives with it already firm. On the coarse-road benchmark, measured body acceleration drops about 30 percent against Gen 1\'s fixed tune. Heat gets the same treatment: an oil temperature model derates the valve toward firm before the fade Gen 1 could only warn about in its fail list.',
      why: 'Gen 1\'s damper spec was a frozen compromise, taut enough for the highway, soft enough for town, wrong for each by the margin the other demanded. The valve deletes the compromise, and the fail state is the compromise: de-energized, a spring centers the spool on a fixed orifice cut to Gen 1\'s digressive curve. The worst day of this damper is Gen 1\'s every day, which is the whole fail-safe ladder in one sentence.',
      fail: [
        'Proportional valves live or die on oil cleanliness; the 5-micron spec is why the damper oil is filtered at fill and why a field top-up with generic fluid is a slow valve death.',
        'Sensor loss walks down the ladder in order: preview drops first, then skyhook, then the corner rests at passive mid. The car never rides worse than Gen 1.',
        'The derate is honest but real: a mountain descent on a bad road ends with firm, conservative damping, protection the driver will feel and may report as a fault.',
        'An open defect, measured and not fixed, and inherited rather than introduced. The front damper column stands on the front halfshaft. The damper axis passes 26.5 mm from the front axle line at axle height, exactly where suspension.js put it at Gen 1, and this strut has no coil around it, so the interference is the damper body alone: sliced in cylindrical coordinates about (x 1.45, y 0.355), this part\'s innermost surface at z 0.575 is 5.5 mm from that line, against a 22 mm shaft tube, so the radial overlap is 16.5 mm. The checker reports 100.19 mm over 110 crossing triangle pairs, and that is the plane-straddle convention over-reading on a long lathe strip rather than an intrusion. Rank by it, size the fix from the 16.5.\n\nThe corridor arithmetic this entry carried was wrong and it was copied from suspension.js with A coil spring in it. It quoted "the 45 mm coil around it by 48.6 mm" and this module has no coil: the 48.6 belongs to Gen 1\'s coilover, and the honest figure here is 16.5. It also said the shaft occupies x 1.408 to 1.492 "including its boots" and derived a corridor of x 1.355 or less or x 1.545 or more. That span is the halfshaft part\'s bounding BOX, set by the r 42 mm CV boots, and the boots are at z 0.400 and z 0.640, not here: at this damper\'s own station the shaft is the plain 22 mm tube over x 1.428 to 1.472.\n\nWhat survives is the verdict. One sweep over 273 candidate placements of the Gen 1 column, translations and rakes both, found nothing that fits, and this strut sits on the same axis with the same neighbors: body/front-casting bars any axis past x 1.497 going forward, and the upper structure, the subframe and the rack close it going aft. The repair is a wheel-well cavity in the front casting, which is a body and frozen, so it crosses two slots and is reported rather than taken. suspension-9 carries the same 26.5 mm axis and the same strut, but not the same overlap: drivetrain-9 necks its bar to r 18.6 mm between the rolled fillets, so the Gen 9 and Gen 10 figure is 13.1 mm, not this one. Two rungs, one drawing, two numbers, because the partner changed.',
      ],
      explode: [0.1, 0.55, 0.3],
    },
    'arb-decouplers': {
      name: 'Anti-roll decouplers',
      tagline: 'Gen 1 called head-toss the price of roll control by coupling. These clutches stop paying it on the straight.',
      mass: 10,
      count: 2,
      specs: [
        ['Bars', '26.5 mm front, 21 mm rear, Gen 1 sizes'],
        ['Clutch', 'Face-dog collar, bistable, sprung to lock'],
        ['Lock torque', '1400 Nm front, 900 rear'],
        ['Engage time', 'Under 20 ms at torque zero'],
        ['Straight-line state', 'Open, wheels decoupled'],
        ['Fail state', 'Locked: the Gen 1 car'],
      ],
      how: 'Gen 1\'s front bar closed its fail list with an honest confession: a one-wheel bump is partly copied to the other side, and roll control by coupling is paid for in head-toss on patched roads. This part deletes the coupling whenever it is not earning. Each bar is cut at its center and rejoined through a face-dog collar in a drum on the crossmember. On the straight the collar is open and each wheel is private; the bar contributes nothing, and the car rides like a car with no bars. At a steering input or 0.1 g of lateral acceleration the collar shifts in under 20 ms, an order faster than the 250 ms the body takes to reach steady roll, and the car corners on Gen 1\'s exact 58/42 stiffness split, the balance those five rear bar iterations bought.\n\nThe clutch is bistable, sprung toward locked and held open by a 6 W latch, so neither state burns meaningful power and any electrical fault drops the collar home: the failure mode is the Gen 1 car. Shifting is windowed to near-zero bar torque, which the straight-ahead condition guarantees by definition. The 48 V feed earns its place in the transient: the shift solenoid wants 400 W for 15 ms, an 8 A pulse at 48 V where a 12 V corner harness would have to swallow 33.',
      why: 'A full active bar, a motor in the middle injecting roll torque, does this job and more at about 15 kg and hundreds of watts. The clutch is one added kilogram per bar over Gen 1\'s 9, and it captures the share of the benefit passengers actually feel: single-wheel decoupling is a ride quality event on every patched road, while roll torque injection mostly moves skidpad numbers.',
      fail: [
        'The dog teeth depend on shift discipline; a software regression that closes the collar under load machines the teeth away, so torque-window enforcement lives in the actuator, below the level any calibration update can reach.',
        'A failed latch means locked bars and a warranty visit, not a tow; the car simply rides like Gen 1 until seen.',
        'An open collar believed locked would soften one axle\'s share and shift limit balance, so lock state is verified every corner entry by comparing measured roll gradient against the model.',
      ],
      explode: [0.45, -0.25, 0],
    },
    steering: {
      name: 'Steer-by-wire rack',
      tagline: 'Two complete motor lanes on one rack, and the last mechanical pretense of a column deleted.',
      mass: 11,
      specs: [
        ['Actuator', 'Two belt ball-nut lanes, one rack'],
        ['Peak rack force', '12 kN from either lane alone'],
        ['Supply', 'Two hv-4 zones, one per lane'],
        ['Failover', 'Under 2 ms, carried from Gen 1'],
        ['Column', 'None; the Gen 1 sensor stub is gone'],
        ['Mass', '11 kg against Gen 1\'s 15'],
      ],
      how: 'Gen 1 was already by-wire and already redundant, but its two lanes shared one stator: dual windings in the same slots, each good for 60 percent of full assist. Gen 4 separates them physically. A second belt and ball-nut drive sits at the passenger end of the housing, 76 cm from the first, with its own motor, its own inverter, and its own hv-4 zone. Either lane alone delivers the full 12 kN, so a flooded connector, a cooked winding, or a dead zonal feed takes one lane and the driver feels nothing. The cross-check logic and the sub-2 ms failover carry over from Gen 1 unchanged; what improved is what remains after the failover: 100 percent authority instead of 60.\n\nGen 1 also kept a short column down to a sensor box under the cowl, a mechanical stub whose only job was measuring the hand wheel. It is deleted, and this module now contains nothing above the subframe: the hand wheel, its triple angle sensor, and its feel motor are interior parts speaking on both zonal rings. The mass ledger reads honestly: 1.6 kg of stub and bracket gone, 1.4 kg of feedback unit moved to the interior\'s ledger rather than vanished, and the rest is 48 V arithmetic, supply leads at a quarter of the current and windings sized to match.',
      why: 'Two windings in one slot share a tooth, a thermal path, and a flooded connector shell; two lanes at opposite ends of a housing share almost nothing but the rack itself, which is a forged steel bar with no failure mode short of a crash. Gen 1 wanted this architecture and could not afford the copper: at 12 V a full-authority lane peaks above 90 A and two of them need cable like jumper cables. At 48 V each lane peaks near 23 A, and hv-4 priced the architecture into reach.',
      fail: [
        'Total electrical loss still means no steering, so both zones plus the capacitor bank must together finish a lane change; the bank is sized and tested against exactly that maneuver.',
        'Feel is synthesized, so feel remains a calibration liability, carried word for word from Gen 1: a bad release can make good hardware drive badly.',
        'The independence claim is only as true as hv-4\'s zone separation; every hardware revision re-verifies that the two feeds share no fuse, no run, and no connector shell.',
        'An open defect, measured and not fixed, carried from Gen 1 with the rack. The tie rod crosses the front brake disc: 31.17 mm of straddle depth over 218 crossings into wheels-3\'s disc on Gen 4. The outer ball joint at (1.375, 0.305, 0.705) is r 0.090 from the axle, inside the radial shadow of a 380 mm friction ring at r 0.190, so the rod is at r 0.154 where it meets the disc plane. Gen 1\'s steering panel carries the full measurement and the four surfaces that close every alternative end position, including the attempt that was tried and reverted for driving 54 crossings 67.2 mm into battery/tray. It is a decision across suspension and wheels, not an edit to either.',
      ],
      explode: [0.55, 0.12, 0],
    },
    'rear-steer': {
      name: 'Rear-steer actuator',
      tagline: 'Five kilograms slung under the subframe that let a 2.90 m wheelbase choose its length.',
      mass: 5,
      specs: [
        ['Authority', '3.0 deg each way at the wheels'],
        ['Actuator', '48 V brushless, planetary, leadscrew'],
        ['Thrust', '8 kN across both toe links'],
        ['Low speed', 'Opposite phase below 50 km/h'],
        ['High speed', 'Same phase above 80 km/h'],
        ['Fail', 'Sprung and pinned to center'],
      ],
      how: 'A transverse housing hangs below the rear subframe, under the y 0.22 floor of the drive zone, where a central leadscrew pushes both carried toe links through ball joints. Below 50 km/h the rear wheels steer opposite the fronts, and the geometry is virtual wheelbase arithmetic: turn radius follows wheelbase divided by the sum of the axle angles, so 3 degrees of rear against full front lock makes 2.90 m steer like roughly 2.2, and the curb-to-curb circle drops from 11.4 m to 10.4. The parking lots like something a size smaller, which is the feature owners actually use daily.\n\nAbove 80 km/h the phase flips. Both axles steer together, the body translates with less yaw, and the rear axle\'s slip angle is commanded up front rather than developed half a beat late through sideslip: the lane-change tail-step of every long car is simply deleted, and in yaw damping terms the wheelbase stretches toward 3.4 m. Front rack and rear actuator are one yaw command on the chassis ECU\'s 1 kHz loop, split by a speed schedule, which is why this part ships in the generation that built the nervous system: the hardware is trivial, the coordination is the product.',
      why: 'The wheelbase was the one chassis parameter Gen 1 froze forever, trading parking against stability once, at the drawing board. Five kilograms re-makes that trade every second. It is the cheapest capability per kilogram on the car precisely because the five-link was carried: toe already had its own rod, and this actuator just moves the rod\'s inner end. Any other axle architecture would rebuild the rear suspension to get this.',
      fail: [
        'Stuck off-center is worse than dead, a permanent rear pull, so the screw is deliberately not back-drivable and any fault fires a sprung pin into the center detent; more than 0.5 degrees of stuck offset invokes a speed limp.',
        'The unit lives in wheel spray and winter salt; the boots and the screw are service items, and the first seized actuator will belong to a car that never saw a hoist.',
        'The 3.0 degree stop is machined; software asks for at most 2.5, and that margin between command and metal is the certification argument in one number.',
      ],
      explode: [-0.45, -0.3, 0],
    },
    'chassis-ecu': {
      name: 'Chassis ECU',
      tagline: 'One kilogram of computer that conducts the chassis, and is deliberately allowed to die.',
      mass: 1,
      specs: [
        ['Loop', '1 kHz, four corners plus both steer axes'],
        ['Inputs', '4 travel sensors, 3 body accels, preview'],
        ['Networks', 'Both hv-4 zonal rings'],
        ['Role', 'Comfort coordinator, never a safety path'],
        ['Fail', 'Every actuator to its local default'],
      ],
      how: 'This box turns state into commands: skyhook forces per corner, clutch lock scheduling, height targets, and the yaw split between front rack and rear-steer, recomputed a thousand times a second. It is also the sole consumer of preview, converting the height map from autonomy-4\'s forward camera wedge into valve pre-positioning per wheel. It is one computer rather than four corner controllers because the state is one: a crest is a single event to a central observer and four uncorrelated surprises to four local loops, and flat-ride, roll scheduling, and the yaw split are cross-corner by definition.\n\nThe deliberate design decision is its demotion. This ECU commands comfort and coordination, never safety. The steering lanes close their own loops and would not notice its death; dampers hold local spool defaults, the clutch springs lock the bars, the air valves close on their check seats, the rear-steer pins to center. Pull its connector at speed and the car becomes a well-tuned Gen 1 mid-corner, a case run in fault injection, not argued on paper. That demotion is why this is a 1 kg single-lane box and not a triplex brick: the fail ladder provides the redundancy, so the silicon does not have to.',
      why: 'The ladder is the architecture: dampers fall to passive mid, air falls to held pressure and then bumpstop limp, roll falls to locked bars, steering falls to its second lane without this box\'s involvement, rear-steer falls to center. Every rung is the Gen 1 car or better, which means the active generation risks nothing the passive generation had.',
      fail: [
        'It is a single point for ride quality: a hung ECU is an instant, car-wide comfort outage, obvious within one pothole and safe by design.',
        'Preview degrades silently in fog, snow, or a dirty windshield as the camera map thins; skyhook continues on sensors, pre-positioning quietly stops, and the status line says so rather than letting the driver hunt a phantom fault.',
        'Like steering feel, its calibration is a software liability: one bad release changes how every road in the world feels, which is why chassis tunes ship on the slow ring with a rollback.',
      ],
      explode: [0, -0.4, -0.45],
    },
    '48v-feeds': {
      name: '48 V by-wire feeds',
      tagline: 'Four keyed bosses where hv-4\'s redundant rocker runs hand power to the chassis, and the warranty changes hands.',
      mass: 1,
      count: 4,
      specs: [
        ['Stub points', '(+/-1.30, 0.36, +/-0.70), per gen4.md'],
        ['Boss', '30 x 20 x 20 mm, keyed, one per corner'],
        ['Topology', 'Two independent zones per axle'],
        ['Sizing', '62 A peak per feed at 48 V'],
        ['Explode', 'Pairs with hv-4 at [0, -0.25, 0]'],
      ],
      how: 'The interface contract is geometric and exact: hv-4 owns the dual 48 V runs along each rocker top at y 0.36 and terminates them at four stubs, at x plus and minus 1.30, z plus and minus 0.70. This module bolts a keyed connector boss at each stub point and owns everything downstream, short leads to the rack lanes, the damper valve heads, the compressor, the rear-steer actuator, and the chassis ECU. Neither module models the other\'s side of the joint; the connector face is where the drawing, and the warranty, changes hands.\n\nThe topology is the redundancy: each axle is served by two stubs fed from different zonal controllers, and the assignments are arranged so no single zone loss removes both lanes of anything. Rack lane A draws from the front driver zone, lane B from the front passenger; the rear dampers split across the rear pair the same way. In the exploded view each boss departs with its hv-4 stub as a mated pair on the shared [0, -0.25, 0] vector, so the model shows the joint the way the contract wrote it.',
      why: 'Connectors are where by-wire architectures live or die. A corroded pin at 12 V was a dim bulb; at 48 V on a steering feed it is a lane loss, so the boss spec is marine-grade: gold-flashed, double-sealed, keyed per lane, sized for 62 A peaks with margin. Spending a kilogram of the budget on four connectors is what taking the contract seriously looks like.',
      fail: [
        'The rocker is the salt-spray zone of the whole car; seal service life, not conductor size, sets the inspection interval.',
        'A 48 V arc does not self-extinguish the way 12 V does, so live disconnection is procedurally forbidden: the interlock pin opens first and drops the zone before the power pins part.',
        'Keying prevents lane crossover, and the first field repair that files the key off will demonstrate exactly why it existed.',
      ],
      explode: [0, -0.25, 0],
    },
  },
};

/* ── Geometry ── */

const UP = new THREE.Vector3(0, 1, 0);

/* Solid cylinder between two world points. Carried from suspension.js. */
function rod(a, b, r, mat, seg = 12) {
  const va = new THREE.Vector3(...a);
  const dir = new THREE.Vector3(...b).sub(va);
  const len = dir.length();
  const m = lib.cyl(r, len, mat, seg);
  m.position.copy(va).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(UP, dir.normalize());
  return m;
}

/* Place a group built along local Y between two world points. */
function span(g, a, b) {
  const va = new THREE.Vector3(...a);
  const dir = new THREE.Vector3(...b).sub(va);
  g.position.copy(va).addScaledVector(dir, 0.5);
  g.quaternion.setFromUnitVectors(UP, dir.clone().normalize());
  return g;
}

function bush(p, r = 0.02, h = 0.05) {
  const b = lib.cyl(r, h, M.rubber, 12);
  b.rotation.z = Math.PI / 2;
  b.position.set(...p);
  return b;
}

function balljoint(p, r = 0.02) {
  const s = lib.sphere(r, M.darkSteel, 14);
  s.position.set(...p);
  return s;
}

/* A-arm: two legs from inner pivots meeting at a ball joint. */
function aArm(i1, i2, bj) {
  const g = new THREE.Group();
  g.add(rod(i1, bj, 0.015, M.alu), rod(i2, bj, 0.015, M.alu));
  g.add(balljoint(bj, 0.024), bush(i1), bush(i2));
  return g;
}

/* Subframe ladder, s = +1 front / -1 rear. Rails start at |x| 1.31 to stay
   clear of the battery end walls. Carried from suspension.js. */
function frame(s, withTowers) {
  const g = new THREE.Group();
  for (const zs of [-1, 1]) {
    const rail = lib.box(0.44, 0.09, 0.09, M.alu);
    rail.position.set(s * 1.53, 0.25, zs * 0.46);
    g.add(rail);
  }
  const cmOuter = lib.box(0.08, 0.07, 1.10, M.alu);
  cmOuter.position.set(s * 1.70, 0.25, 0);
  g.add(cmOuter);
  /* Inner crossmember, dipped through the middle, same repair as Gen 1 and
     the same one Gen 9 makes by dropping the whole beam to y 0.21. Both
     wishbone inner pivots land on the RAILS at |x| 1.36 and 1.70, |z| 0.45,
     so this beam carries no pickup and its shape is free. Measured over its
     own x band of |x| 1.32 to 1.40: drivetrain-3's and drivetrain-6's front
     case bottoms at y 0.252 and their oil pipes at y 0.2384, drivetrain-7's
     case at y 0.256, and the rear housings at y 0.2374. The full-depth beam
     topped out at y 0.285 and was 30.5 mm inside the Gen 4 to Gen 6 front
     unit over 493 crossings and 21.0 mm inside the Gen 7 one over 440. The
     center section now runs y 0.192 to 0.232, held up off battery's
     coolant ports at y 0.186 as well as clear of the case above. */
  for (const zs of [-1, 1]) {
    const cmEnd = lib.box(0.08, 0.07, 0.23, M.alu);
    cmEnd.position.set(s * 1.36, 0.25, zs * 0.435);
    g.add(cmEnd);
  }
  const cmMid = lib.box(0.08, 0.04, 0.66, M.alu);
  cmMid.position.set(s * 1.36, 0.212, 0);
  g.add(cmMid);
  for (const zs of [-1, 1]) {
    for (const xm of [1.34, 1.72]) {
      const mt = lib.cyl(0.028, 0.05, M.rubber, 12);
      mt.position.set(s * xm, 0.30, zs * 0.50);
      g.add(mt);
    }
    /* Rear upper-link tower as a portal rather than a plate, same envelope
       and same pickups as Gen 1's. Gen 4 to Gen 8 drive the rear in the
       wheel so no halfshaft crosses this station, but the torque-vectoring
       controller's harness does: drivetrain-3's runs at y 0.3956 to 0.4185
       and drivetrain-6's at y 0.3072 to 0.3319, and the solid plate spanned
       y 0.30 to 0.50 across the whole 0.26 m. The header starts at y 0.43
       and the legs leave x -1.545 to -1.395 open between them. */
    if (withTowers) {
      const hdr = lib.box(0.26, 0.07, 0.05, M.alu);
      hdr.position.set(s * 1.47, 0.465, zs * 0.48);
      g.add(hdr);
      for (const xl of [1.3675, 1.5725]) {
        const leg = lib.box(0.055, 0.13, 0.05, M.alu);
        leg.position.set(s * xl, 0.365, zs * 0.48);
        g.add(leg);
      }
    }
  }
  return g;
}

/* Annulus extruded along z, centered on its own origin. */
function ringZ(rOut, rIn, depth, mat, seg = 24) {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOut, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, rIn, 0, Math.PI * 2, true);
  s.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: seg });
  geo.translate(0, 0, -depth / 2);
  return lib.mesh(geo, mat);
}

/* Upright + hub bearing shared by front and rear knuckles. Carried from
   Gen 1, including its bore: the front halfshaft's outer CV joint is a
   36 mm-radius cylinder on the axle line and the old solid web, boss and
   face put it 16.50 mm inside the knuckle over 368 crossings on Gen 4
   through Gen 8. Two struts, a 44 to 54 mm carrier bore and a 38 to 44 mm
   bearing race, 2 mm of radial clearance on the joint. Every new solid is
   inside the old one, so no depth moved; crossing counts on pairs this part
   was already failing rise with the extra triangles, drivetrain-7's hub
   bearings reading 2,286 against 1,234 at the same 35.11 mm. */
function upright(x) {
  const g = new THREE.Group();
  for (const [yc, h] of [[0.490, 0.18], [0.265, 0.09]]) {
    const web = lib.box(0.085, h, 0.032, M.castAlu);
    web.position.set(x, yc, 0.74);
    g.add(web);
  }
  const boss = ringZ(0.054, 0.044, 0.036, M.castAlu, 16);
  boss.position.set(x, P.wheelY, 0.74);
  g.add(boss);
  const race = ringZ(0.044, 0.038, 0.036, M.steel, 12);
  race.position.set(x, P.wheelY, 0.74);
  g.add(race);
  return g;
}

/* Damper without a spring: monotube body, rod, top mount, eye, and the
   48 V proportional valve head clamped to the body. Built along Y. */
function activeDamper(a, b) {
  const L = new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...b));
  const g = new THREE.Group();
  const body = lib.cyl(0.021, L * 0.58, M.darkSteel, 16);
  body.position.y = -L * 0.2;
  g.add(body);
  const shaft = lib.cyl(0.008, L * 0.55, M.steel, 10);
  shaft.position.y = L * 0.2;
  g.add(shaft);
  const top = lib.cyl(0.034, 0.022, M.rubber, 14);
  top.position.y = L / 2 - 0.011;
  g.add(top);
  const eye = lib.torus(0.015, 0.007, M.darkSteel, 14, 8);
  eye.position.y = -L / 2 + 0.007;
  g.add(eye);
  const valve = lib.box(0.03, 0.045, 0.03, M.sensor);
  valve.position.set(0.033, -L * 0.12, 0);
  g.add(valve);
  const nub = lib.cyl(0.008, 0.02, M.hv, 10);
  nub.rotation.z = Math.PI / 2;
  nub.position.set(0.055, -L * 0.12, 0);
  g.add(nub);
  return span(g, a, b);
}

/* Rolling-lobe air bellows built along Y, centered, plus its top plate. */
function bellows(len, rMax = 0.055) {
  const pts = [[0.030, 0], [0.048, 0.015]];
  const lobes = 5;
  for (let i = 0; i < lobes; i++) {
    const y0 = 0.025 + (i / lobes) * (len - 0.055);
    const y1 = 0.025 + ((i + 0.5) / lobes) * (len - 0.055);
    pts.push([rMax, y0], [rMax - 0.009, y1]);
  }
  pts.push([rMax - 0.005, len - 0.022], [0.033, len]);
  const g = new THREE.Group();
  const sleeve = lib.lathe(pts, M.rubber, 28);
  sleeve.position.y = -len / 2;
  g.add(sleeve);
  const plate = lib.cyl(rMax + 0.003, 0.012, M.alu, 24);
  plate.position.y = len / 2 - 0.004;
  g.add(plate);
  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* ── carried front structure: subframe + wishbones + knuckles ── */
  const fs = lib.part('front-structure', [0.15, -0.45, 0]);
  fs.add(frame(1, false));
  const fCorner = new THREE.Group();
  fCorner.add(aArm([1.36, 0.25, 0.45], [1.70, 0.25, 0.45], [1.45, 0.235, 0.71]));
  fCorner.add(aArm([1.33, 0.55, 0.38], [1.65, 0.55, 0.38], [1.45, 0.565, 0.70]));
  fCorner.add(upright(P.axleF));
  /* Steering arm and tie rod cross the front brake disc, carried from
     Gen 1 and left there: see the steering panel's open-defect note. */
  fCorner.add(rod([1.44, 0.30, 0.735], [1.375, 0.305, 0.705], 0.011, M.castAlu));
  /* wheel-travel sensor: body-side box, thin link down to the lower arm */
  const tsens = lib.box(0.02, 0.02, 0.02, M.sensor);
  tsens.position.set(1.62, 0.315, 0.42);
  fCorner.add(tsens);
  fCorner.add(rod([1.62, 0.305, 0.42], [1.58, 0.256, 0.465], 0.004, M.darkSteel));
  fs.add(fCorner, lib.mirrorZ(fCorner));
  sys.add(fs);

  /* ── carried rear structure: subframe + four links per side + knuckle.
     The toe link's inner end moved to the rear-steer rack below, so the
     toe rods live in that part now. ── */
  const rs = lib.part('rear-structure', [-0.15, -0.45, 0]);
  rs.add(frame(-1, true));
  const rCorner = new THREE.Group();
  rCorner.add(upright(P.axleR));
  const links = [
    [[-1.36, 0.50, 0.47], [-1.41, 0.545, 0.70], 0.012],  /* upper front */
    [[-1.58, 0.50, 0.47], [-1.49, 0.545, 0.70], 0.012],  /* upper rear */
    [[-1.44, 0.235, 0.44], [-1.45, 0.225, 0.70], 0.016], /* spring link */
    [[-1.64, 0.25, 0.44], [-1.53, 0.26, 0.70], 0.012],   /* lower trailing */
  ];
  for (const [inner, outer, r] of links) {
    rCorner.add(rod(inner, outer, r, M.steel));
    rCorner.add(bush(inner, 0.018, 0.04));
    rCorner.add(balljoint(outer, 0.017));
  }
  /* knuckle toe arm: the rear-steer tie rod lands on its outer point */
  rCorner.add(rod([-1.44, 0.30, 0.735], [-1.39, 0.31, 0.705], 0.011, M.castAlu));
  rs.add(rCorner, lib.mirrorZ(rCorner));
  sys.add(rs);

  /* ── air springs: front strut bellows around the damper line, rear
     bellows standing on the Gen 1 spring-link perch ── */
  const air = lib.part('air-springs', [0, 0.62, 0.18]);
  const fBell = bellows(0.27);
  span(fBell, [1.479, 0.40, 0.563], [1.496, 0.66, 0.496]);
  air.add(fBell);
  const fTower = lib.cyl(0.05, 0.014, M.alu, 18);
  fTower.position.set(1.50, 0.735, 0.48);
  air.add(fTower);
  const perch = lib.cyl(0.058, 0.01, M.steel, 16);
  perch.position.set(-1.446, 0.235, 0.60);
  air.add(perch);
  const rBell = bellows(0.23, 0.052);
  rBell.position.set(-1.447, 0.36, 0.60);
  air.add(rBell);
  sys.add(air, lib.mirrorZ(air));

  /* ── air supply: compressor + dryer + valve block + reservoir ahead of
     the front subframe, passenger corner, plus the air lines ── */
  const sup = lib.part('air-supply', [0.55, 0.3, 0.35]);
  const comp = lib.cyl(0.042, 0.16, M.darkSteel, 18);
  comp.rotation.z = Math.PI / 2;
  comp.position.set(1.90, 0.325, 0.30);
  sup.add(comp);
  const head = lib.box(0.04, 0.05, 0.06, M.castAlu);
  head.position.set(1.84, 0.33, 0.30);
  sup.add(head);
  const dryer = lib.cyl(0.024, 0.09, M.alu, 14);
  dryer.position.set(1.86, 0.345, 0.20);
  sup.add(dryer);
  const vblock = lib.box(0.07, 0.05, 0.06, M.castAlu);
  vblock.position.set(1.86, 0.33, 0.40);
  sup.add(vblock);
  const tank = lib.cyl(0.048, 0.24, M.steel, 20);
  tank.rotation.x = Math.PI / 2;
  tank.position.set(1.90, 0.30, 0);
  sup.add(tank);
  for (const zs of [-1, 1]) {
    const cap = lib.sphere(0.048, M.steel, 16);
    cap.position.set(1.90, 0.30, zs * 0.12);
    sup.add(cap);
  }
  /* line to the front passenger spring */
  sup.add(lib.tube([
    [1.86, 0.35, 0.42], [1.72, 0.42, 0.47], [1.58, 0.56, 0.50], [1.50, 0.70, 0.49],
  ], 0.0045, M.plasticLt));
  /* cross-car line ahead of the subframe to the front driver spring */
  sup.add(lib.tube([
    [1.86, 0.33, 0.36], [1.83, 0.33, 0], [1.80, 0.34, -0.36],
    [1.66, 0.40, -0.48], [1.54, 0.58, -0.50], [1.50, 0.70, -0.49],
  ], 0.0045, M.plasticLt));
  /* trunk line rearward in the underfloor gap above the battery lid */
  sup.add(lib.tube([
    [1.88, 0.32, 0.42], [1.62, 0.325, 0.58], [1.20, 0.327, 0.62],
    [0, 0.327, 0.63], [-1.20, 0.327, 0.62], [-1.41, 0.31, 0.61],
    [-1.447, 0.40, 0.60], [-1.447, 0.465, 0.60],
  ], 0.0045, M.plasticLt));
  sys.add(sup);

  /* ── active dampers: Gen 1 lines, valve heads added ── */
  const dampF = lib.part('active-dampers', [0.1, 0.55, 0.3]);
  dampF.add(activeDamper([1.47, 0.255, 0.60], [1.50, 0.72, 0.48]));
  sys.add(dampF, lib.mirrorZ(dampF));
  const dampR = lib.part('active-dampers', [-0.2, 0.55, 0.3]);
  dampR.add(activeDamper([-1.555, 0.26, 0.64], [-1.575, 0.67, 0.56]));
  const rdPlate = lib.cyl(0.042, 0.012, M.alu, 16);
  rdPlate.position.set(-1.575, 0.684, 0.56);
  dampR.add(rdPlate);
  sys.add(dampR, lib.mirrorZ(dampR));

  /* ── anti-roll decouplers: Gen 1 bar paths split at center, rejoined
     through a dog-clutch drum on each crossmember ── */
  const arbF = lib.part('arb-decouplers', [0.45, -0.25, 0]);
  arbF.add(lib.tube([
    [1.56, 0.33, 0.60], [1.63, 0.315, 0.50], [1.70, 0.305, 0.34], [1.70, 0.305, 0.10],
  ], 0.011, M.steel));
  arbF.add(lib.tube([
    [1.70, 0.305, -0.10], [1.70, 0.305, -0.34], [1.63, 0.315, -0.50], [1.56, 0.33, -0.60],
  ], 0.011, M.steel));
  const fDrum = lib.cyl(0.036, 0.22, M.darkSteel, 18);
  fDrum.rotation.x = Math.PI / 2;
  fDrum.position.set(1.70, 0.305, 0);
  arbF.add(fDrum);
  const fCollar = lib.cyl(0.041, 0.05, M.steel, 18);
  fCollar.rotation.x = Math.PI / 2;
  fCollar.position.set(1.70, 0.305, 0.06);
  arbF.add(fCollar);
  const fSol = lib.cyl(0.016, 0.05, M.sensor, 12);
  fSol.position.set(1.70, 0.36, 0);
  arbF.add(fSol);
  for (const zs of [-1, 1]) {
    arbF.add(rod([1.56, 0.33, zs * 0.60], [1.54, 0.245, zs * 0.62], 0.006, M.darkSteel));
    const blk = lib.box(0.035, 0.03, 0.045, M.rubber);
    blk.position.set(1.70, 0.297, zs * 0.28);
    arbF.add(blk);
  }
  sys.add(arbF);
  const arbR = lib.part('arb-decouplers', [-0.45, -0.25, 0]);
  arbR.add(lib.tube([
    [-1.56, 0.33, 0.58], [-1.63, 0.315, 0.48], [-1.70, 0.305, 0.34], [-1.70, 0.305, 0.09],
  ], 0.011, M.steel));
  arbR.add(lib.tube([
    [-1.70, 0.305, -0.09], [-1.70, 0.305, -0.34], [-1.63, 0.315, -0.48], [-1.56, 0.33, -0.58],
  ], 0.011, M.steel));
  const rDrum = lib.cyl(0.032, 0.20, M.darkSteel, 18);
  rDrum.rotation.x = Math.PI / 2;
  rDrum.position.set(-1.70, 0.305, 0);
  arbR.add(rDrum);
  const rCollar = lib.cyl(0.037, 0.045, M.steel, 18);
  rCollar.rotation.x = Math.PI / 2;
  rCollar.position.set(-1.70, 0.305, 0.055);
  arbR.add(rCollar);
  const rSol = lib.cyl(0.015, 0.05, M.sensor, 12);
  rSol.position.set(-1.70, 0.355, 0);
  arbR.add(rSol);
  for (const zs of [-1, 1]) {
    arbR.add(rod([-1.56, 0.33, zs * 0.58], [-1.575, 0.26, zs * 0.60], 0.006, M.darkSteel));
    const blk = lib.box(0.035, 0.03, 0.045, M.rubber);
    blk.position.set(-1.70, 0.297, zs * 0.28);
    arbR.add(blk);
  }
  sys.add(arbR);

  /* ── steering: Gen 1 rack, second full lane added at the passenger end,
     the by-wire column stub deleted (nothing above the subframe) ── */
  const st = lib.part('steering', [0.55, 0.12, 0]);
  const RY = 0.36;
  const rack = lib.cyl(0.02, 1.10, M.steel, 14);
  rack.rotation.x = Math.PI / 2;
  rack.position.set(1.22, RY, 0);
  st.add(rack);
  const housing = lib.cyl(0.03, 0.62, M.castAlu, 16);
  housing.rotation.x = Math.PI / 2;
  housing.position.set(1.22, RY, -0.05);
  st.add(housing);
  /* lane A, driver end: Gen 1 geometry */
  const nutA = lib.cyl(0.046, 0.09, M.castAlu, 18);
  nutA.rotation.x = Math.PI / 2;
  nutA.position.set(1.22, RY, -0.38);
  st.add(nutA);
  const motA = lib.cyl(0.037, 0.14, M.darkSteel, 18);
  motA.rotation.x = Math.PI / 2;
  motA.position.set(1.30, RY, -0.44);
  st.add(motA);
  const covA = lib.box(0.12, 0.055, 0.03, M.plastic);
  covA.position.set(1.26, RY, -0.415);
  st.add(covA);
  const ecuA = lib.box(0.05, 0.03, 0.05, M.sensor);
  ecuA.position.set(1.30, RY + 0.055, -0.44);
  st.add(ecuA);
  /* lane B, passenger end: the Gen 4 addition, lane A's layout mirrored
     across z so the nut centers sit 0.76 m apart (the 76 cm the content
     claims) and the nut stays off the P.driveF footprint like Gen 1's */
  const nutB = lib.cyl(0.046, 0.09, M.castAlu, 18);
  nutB.rotation.x = Math.PI / 2;
  nutB.position.set(1.22, RY, 0.38);
  st.add(nutB);
  const motB = lib.cyl(0.037, 0.14, M.darkSteel, 18);
  motB.rotation.x = Math.PI / 2;
  motB.position.set(1.30, RY, 0.44);
  st.add(motB);
  const covB = lib.box(0.12, 0.055, 0.03, M.plastic);
  covB.position.set(1.26, RY, 0.415);
  st.add(covB);
  const ecuB = lib.box(0.05, 0.03, 0.05, M.sensor);
  ecuB.position.set(1.30, RY + 0.055, 0.44);
  st.add(ecuB);
  for (const zs of [-1, 1]) {
    const boot = lib.cyl(0.026, 0.10, M.rubber, 12);
    boot.rotation.x = Math.PI / 2;
    boot.position.set(1.22, RY, zs * 0.44);
    st.add(boot);
    st.add(rod([1.22, RY, zs * 0.545], [1.375, 0.305, zs * 0.705], 0.010, M.steel));
    st.add(balljoint([1.22, RY, zs * 0.545], 0.015));
    st.add(balljoint([1.375, 0.305, zs * 0.705], 0.014));
  }
  /* Gen 1's sensor box and column stub are deliberately absent. */
  sys.add(st);

  /* ── rear-steer actuator slung below the rear subframe, under the
     P.driveR floor at y 0.22; toe links become its tie rods ── */
  const rst = lib.part('rear-steer', [-0.45, -0.3, 0]);
  const rHouse = lib.cyl(0.028, 0.60, M.castAlu, 16);
  rHouse.rotation.x = Math.PI / 2;
  rHouse.position.set(-1.34, 0.19, 0);
  rst.add(rHouse);
  const rMot = lib.cyl(0.024, 0.10, M.darkSteel, 16);
  rMot.rotation.x = Math.PI / 2;
  rMot.position.set(-1.40, 0.19, 0.06);
  rst.add(rMot);
  const rBelt = lib.box(0.09, 0.04, 0.03, M.plastic);
  rBelt.position.set(-1.37, 0.19, 0.125);
  rst.add(rBelt);
  for (const zs of [-1, 1]) {
    const boot = lib.cyl(0.024, 0.07, M.rubber, 12);
    boot.rotation.x = Math.PI / 2;
    boot.position.set(-1.34, 0.19, zs * 0.33);
    rst.add(boot);
    rst.add(rod([-1.34, 0.19, zs * 0.345], [-1.39, 0.31, zs * 0.705], 0.010, M.steel));
    rst.add(balljoint([-1.34, 0.19, zs * 0.345], 0.014));
    rst.add(balljoint([-1.39, 0.31, zs * 0.705], 0.013));
    const strap = lib.box(0.016, 0.04, 0.03, M.darkSteel);
    strap.position.set(-1.345, 0.196, zs * 0.20);
    rst.add(strap);
  }
  /* centering pin housing, hung below the tube so nothing rises past y 0.22 */
  const pin = lib.cyl(0.009, 0.03, M.steel, 10);
  pin.position.set(-1.34, 0.152, -0.10);
  rst.add(pin);
  sys.add(rst);

  /* ── chassis ECU in the underfloor gap above the battery lid ── */
  const ecu = lib.part('chassis-ecu', [0, -0.4, -0.45]);
  const ecuBox = lib.box(0.18, 0.036, 0.12, M.sensor);
  ecuBox.position.set(-0.95, 0.334, -0.28);
  ecu.add(ecuBox);
  for (const zo of [-0.03, 0.03]) {
    const nub = lib.box(0.016, 0.02, 0.03, M.plastic);
    nub.position.set(-0.855, 0.332, -0.28 + zo);
    ecu.add(nub);
  }
  sys.add(ecu);

  /* ── hv-4 interface: connector bosses at EXACTLY the four contract stub
     points, plus this module's short 48 V leads to its actuators.
     Explode [0, -0.25, 0] pairs with the hv-4 side. ── */
  const feeds = lib.part('48v-feeds', [0, -0.25, 0]);
  for (const xs of [1, -1]) {
    for (const zs of [1, -1]) {
      const boss = lib.box(0.03, 0.02, 0.02, M.hv);
      boss.position.set(xs * 1.30, 0.36, zs * 0.70);
      feeds.add(boss);
    }
  }
  /* front passenger stub: rack lane B, front damper valve, compressor */
  feeds.add(lib.tube([
    [1.30, 0.36, 0.68], [1.29, 0.365, 0.56], [1.30, 0.36, 0.44],
  ], 0.008, M.hv));
  /* Both front passenger leads dive UNDER the front halfshaft. Measured,
     the shaft occupies x 1.408 to 1.492 on the axle line, its tube bottoms
     at y 0.333 and its outboard boot cone at y 0.338 where these leads
     cross; the old routes ran at y 0.34 to 0.35 straight through it, 11.43
     mm over 299 crossings against every front unit from Gen 4 to Gen 8.
     They now pass at y 0.298 to 0.312 across that band, 25 mm clear. */
  feeds.add(lib.tube([
    [1.30, 0.36, 0.70], [1.37, 0.315, 0.672], [1.45, 0.298, 0.640], [1.50, 0.305, 0.612],
  ], 0.008, M.hv));
  feeds.add(lib.tube([
    [1.30, 0.36, 0.70], [1.38, 0.312, 0.676], [1.52, 0.302, 0.640],
    [1.66, 0.330, 0.590], [1.80, 0.335, 0.470], [1.86, 0.33, 0.38],
  ], 0.008, M.hv));
  /* front driver stub: rack lane A, front damper valve */
  feeds.add(lib.tube([
    [1.30, 0.36, -0.68], [1.29, 0.365, -0.56], [1.30, 0.36, -0.50],
  ], 0.008, M.hv));
  feeds.add(lib.tube([
    [1.30, 0.36, -0.70], [1.37, 0.315, -0.672], [1.45, 0.298, -0.640], [1.50, 0.305, -0.612],
  ], 0.008, M.hv));
  /* rear passenger stub: rear damper valve */
  feeds.add(lib.tube([
    [-1.30, 0.36, 0.70], [-1.42, 0.355, 0.66], [-1.53, 0.35, 0.63],
  ], 0.008, M.hv));
  /* rear driver stub: rear damper valve, rear-steer actuator, chassis ECU */
  feeds.add(lib.tube([
    [-1.30, 0.36, -0.70], [-1.42, 0.355, -0.66], [-1.53, 0.35, -0.63],
  ], 0.008, M.hv));
  feeds.add(lib.tube([
    [-1.30, 0.36, -0.70], [-1.32, 0.30, -0.56], [-1.33, 0.22, -0.42], [-1.33, 0.20, -0.34],
  ], 0.008, M.hv));
  feeds.add(lib.tube([
    [-1.30, 0.36, -0.70], [-1.17, 0.35, -0.56], [-1.03, 0.34, -0.40], [-0.97, 0.336, -0.32],
  ], 0.008, M.hv));
  sys.add(feeds);

  return sys;
}
