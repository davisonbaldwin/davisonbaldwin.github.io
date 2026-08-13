/* Interior · Gen 4 control cabin. The generation that rebuilt the car's
   nervous system finally lets it into the cabin: a hand wheel with no
   column behind it, seats on the 48 V zonal bus, a screen that discloses
   which third of the brain is offline, and sensing pointed inward.
   Nothing in here is shell: the cabin stays visible in x-ray. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'interior-4',
  name: 'Interior · Gen 4 control cabin',
  color: 0xd9c08a,
  explode: [0, 1.05, 0],
  blurb: 'interior.js sat unchanged through Gen 2 and Gen 3 because nothing in the cabin was ever the bottleneck: those generations spent their risk on cells, structure and aero. Gen 4 makes the cabin a bottleneck by deleting the steering column, giving the car a brain that votes, and putting every seat motor and latch on hv-4’s 48 V ring. 176 kg against interior.js’s 184, itemized part by part. It is not the apex cabin: design/backfill-1.md sends interior-6 to 150 kg with a re-engineered seat structure and canopy-aware climate, and this rung deliberately stops short of both.',
  parts: {
    dashboard: {
      name: 'Dashboard and control beam',
      tagline: 'The magnesium beam stops being trim support and becomes the reaction structure for steering feel.',
      mass: 39,
      specs: [
        ['Ancestor', 'interior.js dashboard, 48 kg'],
        ['Crossbeam', 'Cast magnesium, A-pillar bases plus body-4 cowl'],
        ['New duty', 'Reacts 14 Nm of feel-motor torque'],
        ['First bending mode', '44 Hz (interior.js: 38 Hz)'],
        ['Actuators', 'Vent and blend heads on hv-4 48 V drops'],
        ['Maturity', 'Production practice'],
      ],
      how: 'interior.js was already honest that the visible slab is trim and the cast magnesium beam behind it is the part that matters. Gen 4 changes what the beam is for. Deleting the column removes a clamp casting whose real job was crash: a column must not spear the driver, so its mounting was a structural item with local reinforcement. In its place the beam picks up a harder customer, the hand wheel’s feel motor, which reacts up to 14 Nm into whatever holds it. A soft mount there is not a rattle, it is phase lag inside a force loop the driver’s hands close, so the beam gains a boss and two gussets at z -0.38 and the whole section is re-tuned rather than merely re-trimmed. The tie is the reason it gets lighter anyway: interior.js bolted the beam to the two A-pillar bases only, while this one also lands two struts on body-4’s cowl beam at (0.85, 0.93, ±0.72), and a second load path lets the section thin while the first bending mode rises from 38 Hz to 44.\n\nThe rest of the delta is voltage and integration. The vent vanes and blend heads that steer interior.js’s full-width 8 mm Coanda slot were 12 V motors: an 18 W vane head drew 1.5 A and its drop was sized for that, where the same head on hv-4’s ring draws 0.38 A and loses a gauge and a half of copper. The passenger airbag housing is cast into the beam instead of bolted to it, which is the same trick as the knee bolster reaction, now taken through the casting rather than through a separate steel insert. The ledger, against interior.js’s 48 kg: column clamp casting and its crash bracket -2.4, knee bolster reaction taken into the casting -1.8, airbag housing cast in -1.5, vent and blend actuators plus drops at 48 V -1.2, section thinned by the cowl tie -2.0, display cantilever brackets deleted and their replacement counted on the HMI ledger -1.5, feel-unit boss and gussets +1.4. Net -9.0, so 39 kg.',
      why: 'The beam is the only genuinely structural thing in a cabin, and a by-wire car quietly makes it a control component. Once steering feel is a motor rather than a shaft, the stiffness between that motor and the car is inside the loop with it: compliance shows up as a soft, late, slightly rubbery response that no calibration removes, because you cannot tune away a spring in series with your actuator. Spending 1.4 kg on a boss to buy 6 Hz of beam is the best bandwidth-per-kilogram trade anywhere in the cabin.',
      fail: [
        'The 44 Hz number depends on body-4’s cowl tie. Fit this cabin to an earlier body whose cowl offers no second landing and the beam falls back to roughly 39 Hz, which forces the feel loop’s gain down: a cross-generation dependency that is invisible until someone mixes rungs.',
        'The knee bolster is now split around a wheel aperture at z -0.29 to -0.47, and every new cutline is a new squeak path across the -30 to +85 °C soak, exactly the warranty item interior.js named first.',
        'Casting the airbag housing into the beam means an airbag revision is a beam revision. The deployment path, the tear seam and the beam’s own bending mode stop being separable problems, so the smallest change in the cabin now drags a full structural and deployment re-validation behind it.',
      ],
      explode: [0.55, 0.35, 0],
    },
    displays: {
      name: 'HMI and health band',
      tagline: 'A screen that says which third of the brain is offline, in the same place every time.',
      mass: 11,
      specs: [
        ['Ancestor', 'interior.js displays, 8 kg'],
        ['Centre panel', '15 in on its own pedestal, bonded, 1000 cd/m2'],
        ['Health band', '1.30 m strip on the ASIL-D island'],
        ['Drivers', 'Two cores, one per hv-4 control ring direction'],
        ['Handover', 'Counts down autonomy-4’s 10 s budget'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The hardware delta is redundancy. interior.js rendered both panels from one SoC and protected only the tell-tales with an isolated ASIL-B core, which was right for a supervised car. Gen 4 gives each panel its own display core, and the two cores sit on opposite directions of hv-4’s counter-rotating 1 Gbit control ring pair, fed from different zonal controllers. A ring cut, a zone loss or a dead core now costs one panel instead of the dashboard, and the surviving core still composites speed and warnings through the hardware overlay with the 500 ms watchdog repaint carried from interior.js unchanged. The panel moves off its cantilever bracket onto a pedestal standing on the dash top pad, which is why 1.5 kg walked over from the dashboard ledger; the rest is +1.2 for the second core and its supply, +0.6 for the health band and its driver, and -0.3 as the Gen 1 cluster bezel casting folds into the pedestal.\n\nThe band is the new idea and it exists because autonomy-4 changed what "working" means. Three compute lanes vote 2 of 3 and emit a health word every 50 ms; after one lane is voted out the car keeps driving, but it is now a duplex system, and a duplex system can detect a second disagreement without localising it, so its only honest response is the minimal-risk stop. That is a completely different car to plan a journey in, and interior.js had no way to say so: one screen, one green tick, no vocabulary for degraded but driving. The band runs the full 1.30 m of the dash top in the driver’s peripheral field and shows lane count, sensor coverage and the reason for any restriction, then during a handover it counts down the 10 s budget while the seat bolsters pulse through the console manifold, because a request the driver has to read is a request that arrives late.',
      why: 'Fail-operational hardware that reports itself as either fine or broken is fail-silent from the driver’s seat, and the person who has to decide whether to start a mountain descent is the one part of the loop with no telemetry. Two independent display cores cost 1.2 kg and remove the single-screen blackout that interior.js accepted as survivable when a human and a steering column were the real fallbacks.',
      fail: [
        'A panel on a pedestal sits higher in the forward field than the recessed Gen 1 screen did. It is placed below the horizon and behind the wiper sweep line, but it is a real obstruction added for a real gain, and no layout makes that trade disappear.',
        'Continuous health disclosure teaches its own complacency: a driver who has seen two lanes for a month stops reading the band, which is why any restriction that changes stopping behaviour also changes the drive mode, not just a colour.',
        'Low sun behind the driver still washes the matte etch, and menu depth still creeps with every release, both carried unimproved from interior.js.',
      ],
      explode: [0.62, 0.68, 0],
    },
    wheel: {
      name: 'Hand wheel and feel unit',
      tagline: 'The rim interior.js hung on a column stub now hangs on a motor, and nothing else.',
      mass: 11,
      specs: [
        ['Ancestor', 'interior.js yoke, 9 kg'],
        ['Feel motor', '14 Nm direct drive (Gen 1: 8 Nm, belt)'],
        ['Feel bandwidth', '60 Hz (Gen 1 belt drive: about 25 Hz)'],
        ['Sensing', 'Triple angle and torque, three supplies'],
        ['Column', 'None, per suspension-4'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'This part starts by settling an argument. interior.js drew a 200 mm column stub ending in a duplex sensor pack with a belt-driven 8 Nm feel motor, and suspension.js drew the same feedback unit at the bottom of the same stub inside its own 15 kg steering item, so Gen 1 counted the hardware twice and owned it nowhere. suspension-4 closes it: 1.6 kg of stub and bracket deleted, 1.4 kg of feedback hardware handed to this ledger, and the statement that the hand wheel, its sensing and its feel motor are interior parts speaking on both zonal rings. So the assembly here is the whole thing, with one owner. The ledger reads -1.5 for the stub and its duplex sensor box, +1.4 for the transferred feedback unit, +1.5 for the direct-drive uprate (2.1 kg of motor and bearing, less 0.6 kg of belt, pulleys and tensioner), and +0.6 for triple angle and torque sensing on three independent supplies. Net +2.0, so 11 kg.\n\nDeleting the belt is the point of the uprate. A toothed belt is a spring with backlash, and both live inside the loop that renders road feel, so Gen 1’s useful bandwidth stopped around 25 Hz: fine for weight and self-aligning torque, useless for the textures that actually tell a driver what the tyres are doing, tread squirm, ABS ripple, the first flutter of a wet surface. Direct drive puts the rotor on the rim axis and takes that to about 60 Hz, and 14 Nm of authority means programmed end stops feel like ends rather than suggestions. The rim itself is carried from interior.js exactly, round on top and flat at the bottom, for the reason Gen 1 gave: a hand thrown at it in a slide always finds rim. What moved is where it sits. With no column the fore-aft position is set by reach instead of by column geometry, so the rim comes 110 mm closer to the driver than Gen 1 could put it, and the feel unit hangs off the dashboard beam through a single bracket at z -0.38. Power is 500 W peak, which at 48 V is 10.4 A, ORed at the unit from two hv-4 zones the way every by-wire load on this car is fed.',
      why: 'suspension-4 spent its steering budget on making the rack fail-operational: two complete lanes, 76 cm apart, either one good for the full 12 kN, failover under 2 ms. The rim end deserved the same seriousness, and it did not have it, because Gen 1 left it half-owned by two modules. Feel is now the only channel from the road to the driver that is not a picture or a chime, so it gets the shortest, stiffest, least-shared path the packaging allows.',
      fail: [
        'A direct-drive motor has no gearbox to hide behind: its cogging torque lands straight in the palm, so the machine is wound for smoothness rather than density and the honest cost is a heavier motor than the torque alone would need.',
        'There is still no mechanical path to the rack, so the sensing carries the whole burden. Three angle and torque channels on three supplies vote, and a two-way disagreement drops the car to a fixed ratio with reduced assist, which the driver feels instantly.',
        'Feel remains a calibration liability, carried word for word from interior.js and repeated by suspension-4: a bad release can make good hardware drive badly, and now it can do it with 60 Hz of authority instead of 25.',
      ],
      explode: [0.45, 0.15, 0],
    },
    'front-seats': {
      name: 'Active front seats',
      tagline: 'Bolsters that lean on you a beat before the corner does, on the same 1 kHz loop as the dampers.',
      mass: 61,
      count: 2,
      specs: [
        ['Ancestor', 'interior.js front-seats, 64 kg'],
        ['Bolsters', '2 bladders per seat, 0.8 bar, 250 ms fill'],
        ['Command', 'suspension-4 chassis ECU, 1 kHz loop'],
        ['Supply', 'hv-4 corner controller, 0.4 m drop, eFuse per circuit'],
        ['Heating', '90 W mats at 48 V, 1.9 A (Gen 1: 7.5 A)'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The crash case is carried from interior.js without a gram of change, and that is deliberate: a 30 g frontal pulse still feeds about 4 kN of pretensioned belt load into the frame, the recliner still must not back-drive under torso load, and the seats still bolt straight onto the battery pack crossmembers so the load path runs occupant, frame, track, pack structure. On this preset that path has coordinates rather than adjectives: battery-3 deleted the tray and bonded four seat rails onto the floor-lid at z plus and minus 0.28 and 0.52, top faces at y 0.310, while the cabin floor line sits 50 mm higher at 0.36. Each seat stands on two tracks spanning exactly that gap, so there is no carpet, no pan and no bracket stack between the belt anchor and the cell stack. Every gauge that case sets is untouched. What changed is everything electrical around it. The per-seat 12 V junction and its fusing are gone, because each seat load is now its own eFuse channel on the corner zonal controller 0.4 m away, tripping in under 10 microseconds and streaming its current at 1 kHz, which is how the fleet learns the signature of a heater mat about to open at the cushion flex line, the failure interior.js listed and could not see coming. The three 25 W adjustment motors per seat are rewound for 48 V and their drops shrink with them.\n\nThe bolsters are the capability purchase. suspension-4’s chassis ECU already computes lateral demand at 1 kHz and already reads autonomy-4’s forward camera wedge as preview, so the command that pre-positions a damper valve for a crest can inflate an outboard bladder for a corner at the same instant, from the console reservoir, in 250 ms. The same manifold is the handover haptic: a pulse in the seat reaches a distracted driver faster than a symbol on a band. The honest limit is pressure. At 0.8 bar a bladder supports, it does not hold; a fixed shell tuned to one body still beats it for that body and loses badly for every other, which is the trade taken. Ledger against interior.js: motors and drops at 48 V -1.5, per-seat junction and fusing deleted -1.0, manual lumbar mechanism and hand pump deleted because the bladders do that work -2.1, bolster bladders, seat manifold and lines +1.2, occupant classification mat and belt-tension sensing +0.4. Net -3.0, so 61 kg for the pair, 30.5 each.',
      why: 'interior.js was right that seats resist diets because their mass scales with occupants and crash loads rather than with vehicle mass, and the 3 kg here comes entirely out of electrical hardware, never out of structure. The reason to make them active at this rung specifically is that the intelligence already exists: the chassis ECU, the preview map and the 48 V bus are all paid for by other Gen 4 parts, so a 1.2 kg bladder set inherits a 1 kHz predictive controller for free. design/backfill-1.md sends the apex cabin further, to a re-engineered seat structure with active posture and long-journey support at interior-6; this rung stops at bolsters and says so.',
      fail: [
        'The compressor is the wear item and the only moving part in the cabin with a duty cycle: a leaking bladder is a slow comfort outage that reads as a soft seat long before anyone calls it a fault.',
        'A bolster that squeezes on a wrong prediction is worse than a passive seat, so the command is rate-limited and preview-only inputs are capped at half authority; the failure is annoyance, not danger, but it is the one the driver will report.',
        'Cushion foam still loses about 15 percent height by 100,000 entry cycles, quietly lowering the H-point and the belt geometry with it, carried from interior.js and unimproved.',
      ],
      explode: [0, 0.4, -0.28],
    },
    'rear-bench': {
      name: 'Rear bench',
      tagline: 'Same three seats, with the cables that folded them replaced by two fused motors.',
      mass: 34,
      specs: [
        ['Ancestor', 'interior.js rear-bench, 36 kg'],
        ['Latches', '2 x 48 V electric, eFuse telemetered'],
        ['Fold', '60/40 split, flat load floor, carried'],
        ['Sensing', 'Occupancy mats and buckle state to the zonal bus'],
        ['Maturity', 'Production practice'],
      ],
      how: 'This is the part of the cabin the control generation barely reaches, and pretending otherwise would be the dishonest move. Everything that makes the bench good is a battery decision made two rungs ago and carried whole: no tunnel, no exhaust path, a flat footwell and the same 480 mm cushion depth for the middle passenger as for the outboard seats, plus the tax interior.js stated plainly, a floor about 130 mm higher than a saloon which leaves tall adults slightly knees-up at a fixed roofline. Belts stay anchored to the body so a folded backrest never carries restraint load, and the ISOFIX positions and top tethers are untouched. The construction is interior.js’s exactly, two moulded foam elements on a steel pan, and the pan stands on 60 mm legs onto battery-3’s four bonded rear seat pads at x -0.80, top face y 0.310, the same bonded-lid interface the front tracks use.\n\nOne thing about the cushion is not carried, and it is the only place this bench argues with a partner. autonomy-4’s triplex cold plate is 77 mm tall and sits at x -0.795 to -0.322, y 0.3895 to 0.4661, on standoffs 19.5 mm above this pan, so a solid foam block over that station put the car’s brain inside the seat: 472 crossing triangle pairs at a straddle depth of 106.65 mm, measured off both built meshes and the deepest thing this bench does to anything. The foam is relieved around it, open at the front face, 8.0 mm of nominal gap at the sides and aft wall and 7.9 mm over the top, which is how an under-seat module is actually packaged. The cost is 36 mm of foam over the plate against 130 mm elsewhere. The better fix is one this module cannot make alone: there is 81.45 mm of clear air between the plate and battery-3’s floor lid, so the plate could seat on the lid and leave the cushion entirely, at the price of an aperture in this pan. interior-6 solved the same conflict two rungs later by stepping its pan over the plate and raising the seat 76 mm, which this bench has no headroom to spend.\n\nThe delta is two motors and some sensing. The 60/40 latches become 48 V electric units on eFuse channels, which deletes two Bowden cables, two parcel-shelf handles and their brackets, and turns latch actuation current into the position signal, the same trick body-4 uses to delete a microswitch per door latch. Occupancy mats and buckle state join the zonal bus so the cabin radar in the sensing suite has something to disagree with. Ledger against interior.js: cable runs, handles and brackets -1.4, heater mats and their drops at 48 V -0.5, striker and hinge bracketry simplified once the cables are gone -0.5, occupancy and buckle sensing +0.4. Net -2.0, so 34 kg.',
      why: 'The retro device from Gen 4 was to say out loud when a slot skips a generation and why. The same discipline applies inside a module: this bench had no bottleneck to solve, so it gets the two changes that follow from the architecture and nothing invented on top of them. Redesigning it to look busy would have added mass at the far end of the wheelbase for a story.',
      fail: [
        'An electric latch on a dead zone is a bench stuck in whatever state it was in, so the mechanical override cable is retained on each side and, like every override, will be exercised for the first time on the day it matters.',
        'ISOFIX bars still invite over-torqued bases and the surrounding foam is still sacrificial by design, carried from interior.js.',
        'The middle belt’s upper anchor geometry stays marginal for small statures, unchanged since Gen 1 because fixing it needs a body change, not a bench change.',
      ],
      explode: [-0.25, 0.45, 0],
    },
    console: {
      name: 'Centre console and comfort supply',
      tagline: 'The furniture lost the harness it was hiding and gained the compressor that feeds the seats.',
      mass: 11,
      specs: [
        ['Ancestor', 'interior.js console, 15 kg'],
        ['Deleted', '12 V spine channel and its shield tray'],
        ['Compressor', '60 W at 48 V, 0.35 L reservoir, 0.8 bar'],
        ['Charging', 'Two 15 W pads, 60 °C derate carried'],
        ['Armrest', 'Sliding pad, 60 mm travel, carried'],
        ['Maturity', 'Production practice'],
      ],
      how: 'interior.js was blunt that this part is furniture, and half its mass was justified by what it hid: the low-voltage harness spine running the length of the cabin. That spine does not exist in a Gen 4 car. hv-4 runs a laminated 48 V ring around the cabin floor perimeter instead, front leg at x 1.11, rear at x -1.13, side legs at |z| 0.665, all at y 0.345 under the floor line, with the data laminae pressed into the same stack. So the console’s cable channel, its shield tray and the rib structure that carried them all leave together, and what remains is a tub standing on four posts off two floor rails that land on battery-3’s floor-lid top-hat stiffeners at y 0.308, threaded between hv-4’s tunnel run at z 0.05 and its diagonal cabin run, with nothing routed through the tub at all.\n\nWhat moves in is the seat comfort supply, because a bladder needs a reservoir more than it needs a pump. A 250 ms fill demands roughly four times the flow a 60 W micro-compressor can make continuously, so a 0.35 litre reservoir sits under the aft end at 0.8 bar and the compressor only tops it up below 0.6, through a valve block that feeds both seat manifolds on 4 mm lines. Charge scheduling is the interesting part: in a cabin this quiet the pump is the loudest thing in it, so the cabin sensing suite’s microphone array tells it when road noise is high enough to mask a top-up, and it stays silent at a standstill unless a bolster command actually needs pressure. Ledger against interior.js: harness channel and shield tray -2.4, tub structure and bracketry simplified onto the flat floor -2.4, compressor, reservoir and valve block +0.8. Net -4.0, so 11 kg.',
      why: 'The walk-through cabin argument from interior.js still holds and the armrest still wins it, because elbow support at the right height scores higher in long-drive clinics than openness scores in anything measurable. What changed is the honesty of the part: Gen 1 justified a 15 kg tub partly by the harness inside it, and when the architecture deleted that harness the tub had to give the mass back rather than keep it out of habit.',
      fail: [
        'The spill drains under the cupholders still clog with years of crumbs, and once blocked the next 250 ml of coffee reaches the inductive electronics the drains were validated to protect, carried unimproved from interior.js.',
        'The compressor is now inside the passenger compartment rather than under the floor, so its structure-borne noise path is short: it is isolated on three mounts, and a hardened mount reads to an owner as a new rattle rather than a worn part.',
        'A leak anywhere in the seat circuit shows up here as a pump that never stops cycling, which the current telemetry catches long before an occupant notices a soft bolster, and which nothing else in the cabin can localise.',
      ],
      explode: [0.15, 0.6, 0],
    },
    pedals: {
      name: 'Scheduled-feel pedals',
      tagline: 'The simulator curve stopped being a spring and became a setpoint.',
      mass: 6,
      specs: [
        ['Ancestor', 'interior.js pedals, 4 kg'],
        ['Travel', '55 mm; 60 to 85 N at 1.0 g, scheduled'],
        ['Force motor', '80 W at 48 V, backdrivable, ±20 N authority'],
        ['Fallback', 'Hydraulic push-through circuit, unchanged'],
        ['Sensing', 'Dual position and force on separate zones'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'interior.js built the right brake pedal for a car that had one opinion about braking: a plunger loading a coil spring then an elastomer stack, 12 N of breakaway, a linear modulation region, then a rising rate putting 1.0 g at about 70 N and 55 mm, tuned in blind clinics because it is the only thing the driver feels. Gen 4 puts a small backdrivable motor in series with that stack, which turns a fixed curve into a setpoint: firmer and shorter at motorway speed where a 5 mm foot tremor should not be 0.1 g, softer in traffic where the same tremor is the whole job, and re-shaped when the car is loaded, because a curve calibrated at kerb mass is wrong with four adults and luggage. It also lets the pedal push back rather than only resist, so the blend point where regeneration hands over to friction gets a detent the foot can find, and autonomy-4’s handover request gets a channel that does not need eyes.\n\nThe motor is deliberately weak. Authority is capped at ±20 N against a spring stack that dominates beyond it, so the failure mode of a hung controller is Gen 1’s exact curve, not a numb or a fighting pedal, and the mechanical stack alone defines the failed state. Everything behind the pedal is carried: the controller still blends up to about 0.3 g of motor regeneration with friction braking, more than nine in ten daily braking events still end without a pad touching a disc, and on total electrical failure the pedal still bottoms through to the direct hydraulic push-through circuit on the front axle at roughly triple effort for a legal-minimum stop. The pedal box itself is now hung from the dashboard beam as well as the toe board, because a scheduled pedal is a force reference and a soft mounting adds its own compliance to the curve. Ledger: force motor and its planetary +1.2, dual position and force sensing on separate zones +0.5, accelerator detent coil +0.3. Net +2.0, so 6 kg.',
      why: 'Once braking is blended electronics anyway, interior.js argued, synthesising the feel is more truthful than coupling the pedal to plumbing whose behaviour changes underneath it. Gen 4 finishes the sentence: if the feel is synthetic, freezing it at one curve is an arbitrary choice, and the pedal is the fastest, highest-bandwidth channel the car has to a driver’s body. Two kilograms buys a channel that works with the eyes closed.',
      fail: [
        'A force motor that fights the driver is the nightmare case, which is why its authority is capped below the spring stack and why the cap is mechanical margin, not a software limit.',
        'The simulator still cannot telegraph fade or a failing circuit through the sole, so that information stays on the display and a chime, an honest demotion carried from interior.js.',
        'Scheduling means the pedal is not identical on every stop any more, which was Gen 1’s proudest property; the schedule is slow and speed-based rather than event-based for exactly that reason, and it is still a real regression in predictability.',
      ],
      explode: [0.35, -0.18, 0],
    },
    'cabin-sensing': {
      name: 'Cabin sensing suite',
      tagline: 'Everything pointed inward except the camera, which belongs to autonomy-4.',
      mass: 3,
      specs: [
        ['Ancestor', 'None in interior.js; the cabin had no inward sensing'],
        ['Radar', '2 x 60 GHz FMCW, occupancy and respiration'],
        ['Audio', 'Six-microphone array, ANC error and voice'],
        ['DMS interface', 'Header boss at (0.40, 1.29, -0.30); autonomy-4 owns the camera'],
        ['Drops', 'Nearest hv-4 zonal controller, states only'],
        ['Maturity', 'Pilot line; the vitals cross-check is extrapolated'],
      ],
      how: 'The division of labour is exact, because two modules pointing sensors at the same face is how duplication gets shipped. autonomy-4 owns the driver monitor: a 940 nm infrared camera on the header rail with its own emitters, gaze good to about 2 degrees, a distraction call in under 2 s, and processing on the camera so only states leave it. This part owns the boss that camera lands on and everything inward that is not a camera. Two 60 GHz FMCW radars in the headliner, one over the front row and one over the rear, read chest-wall displacement of a fraction of a millimetre through clothing and blankets. That is how a sleeping child in a rear seat is found when no belt is buckled and no mat is loaded, and it is the sensor that makes a locked cabin a monitored space rather than an assumed empty one.\n\nThe microphone array does two jobs. It gives active noise control an error signal at the ear instead of at the body structure, which matters on this preset specifically: drivetrain-3 puts its rear motors inside the wheels, so the dominant rear order is load-dependent and arrives through the unsprung mass rather than through a subframe mount, and an ANC loop tuned at the floor chases a transfer function that changes with every ride-height command suspension-4 makes. It also tells the console compressor when road noise will mask a top-up. Mass is mostly bracketry and honestly so: 0.7 kg of radar modules and housings, 0.4 kg of microphones and their ribbon, 0.3 kg of air-quality and humidity pod on the dash beam, 1.1 kg of headliner brackets and the local reinforcement that stops a 1.25 m span drumming at the rear motor orders, and 0.5 kg of drops to the corner controllers. The extrapolated claim is named: using respiration and heart-rate variability as a drowsiness cross-check for the driver monitor is not a qualified function today. What must become true is a validated correlation across postures, body types and clothing, plus a regulatory path that accepts a non-camera attention input; until both exist it is advisory, it never extends a handover budget, and it cannot mark a driver attentive.',
      why: 'autonomy-4 states the L3 problem honestly: the car drives, so the car must watch the human, and the gap between eyes-on and mind-on is the residual risk no camera closes. The redundancy that actually helps a camera is not a second camera, it is a completely different physics, and radar fails in none of the ways an imager does: it does not care about infrared-opaque sunglasses, direct low sun through body-4’s canopy, or a face turned away. The cabin was the last place on this car with no sensing at all, which was defensible when a human supervised the machine and stopped being defensible the moment the machine started supervising the human.',
      fail: [
        'Occupancy radar cannot classify well: a dog on a rear seat and a small child produce similar returns, so the alert is deliberately conservative and a high false-positive rate is accepted as the only way to never miss the real case.',
        'A cabin full of microphones is a recording device, so processing stays on the node and only states cross the bus, the same rule autonomy-4 applies to the driver monitor; the honest limit is that this is a design promise enforced by architecture, not a physical impossibility.',
        'The vitals cross-check is extrapolated and marked as such: today it is advisory only, and any release that quietly lets it substitute for the camera would be a safety regression dressed as a feature.',
      ],
      explode: [0.05, 0.75, 0],
    },
  },
};

/* ── Geometry ──
   lib.plate spans y [pos.y + t/2, pos.y + 3t/2]; positions below account
   for that. Driver sits at z -0.38. Hard points honoured: battery lid
   y 0.31, cabin floor 0.36, hv-4 ring at y 0.345 with side legs at
   |z| 0.665, P.driveF z ±0.35, body cowl beam (0.85, 0.93, ±0.72),
   A-pillar bases (0.85, 0.95, ±0.72), roof rails at z ±0.615. */

const DZ = -0.38;                 // driver centreline
const BEAM_X = 1.18, BEAM_Y = 0.665, BEAM_R = 0.032;

function xcyl(r, h, mat, seg = 14) {   // cylinder with its axis along X
  const c = lib.cyl(r, h, mat, seg);
  c.rotation.z = Math.PI / 2;
  return c;
}
function zcyl(r, h, mat, seg = 14) {   // cylinder with its axis along Z
  const c = lib.cyl(r, h, mat, seg);
  c.rotation.x = Math.PI / 2;
  return c;
}

export function build() {
  const sys = new THREE.Group();

  /* ── dashboard: trim, the magnesium beam, its cowl struts, and the
     feel-unit reaction bracket that the hand wheel lands on ── */
  const dash = lib.part('dashboard', [0.55, 0.35, 0]);
  const dashMain = lib.plate(0.30, 1.40, 0.12, 0.06, M.plastic);
  dashMain.position.set(1.12, 0.64, 0);              /* y 0.70..0.82 */
  dash.add(dashMain);
  /* knee roll split around the wheel aperture at z -0.29 to -0.47 */
  const kneeA = lib.plate(0.16, 0.20, 0.06, 0.03, M.tan);
  kneeA.position.set(1.03, 0.61, -0.57);             /* z -0.67..-0.47 */
  dash.add(kneeA);
  const kneeB = lib.plate(0.16, 0.96, 0.06, 0.03, M.tan);
  kneeB.position.set(1.03, 0.61, 0.19);              /* z -0.29..0.67 */
  dash.add(kneeB);
  const topPad = lib.plate(0.24, 1.36, 0.04, 0.05, M.plastic);
  topPad.position.set(1.14, 0.80, 0);                /* y 0.82..0.86 */
  dash.add(topPad);
  const ventSlot = lib.box(0.02, 0.014, 1.26, M.sensor);
  ventSlot.position.set(0.965, 0.815, 0);
  dash.add(ventSlot);
  for (const [bz, bd] of [[-0.57, 0.20], [0.19, 0.96]]) {
    const blade = lib.box(0.015, 0.03, bd, M.tan);
    blade.position.set(0.965, 0.71, bz);
    dash.add(blade);
  }
  const beam = zcyl(BEAM_R, 1.48, M.castAlu, 16);
  beam.position.set(BEAM_X, BEAM_Y, 0);              /* z ±0.74 */
  dash.add(beam);
  for (const s of [-1, 1]) {
    dash.add(lib.tube([
      [1.175, BEAM_Y, s * 0.735],
      [1.090, 0.745, s * 0.735],
      [0.970, 0.845, s * 0.730],
      [0.885, 0.912, s * 0.723],                     /* lands on the cowl beam */
    ], 0.013, M.castAlu));
    const foot = lib.box(0.05, 0.03, 0.05, M.castAlu);
    foot.position.set(0.884, 0.916, s * 0.722);
    dash.add(foot);
  }
  /* feel-unit reaction bracket: beam surface out to the housing face, which
     the wheel's rake puts at x 0.962, y 0.694. Held at y >= 0.68 so it runs
     over the top of wheels-3's brake master unit (x 0.895..1.115, top face
     y 0.683) rather than through it. */
  const feelBracket = lib.box(0.210, 0.05, 0.07, M.castAlu);
  feelBracket.position.set(1.055, 0.705, DZ);        /* x 0.950..1.160 */
  dash.add(feelBracket);
  for (const gz of [-0.045, 0.045]) {
    const gusset = lib.box(0.09, 0.05, 0.008, M.castAlu);
    gusset.position.set(1.09, 0.700, DZ + gz);
    dash.add(gusset);
  }
  const airbagCan = lib.box(0.09, 0.07, 0.28, M.castAlu);
  airbagCan.position.set(1.18, 0.60, 0.50);          /* cast into the beam */
  dash.add(airbagCan);
  sys.add(dash);

  /* ── HMI: pedestal panel above the pad, cluster strip, health band ── */
  /* explode y clears the dashboard top pad's exploded height (0.86 + 0.35)
     so the display cores do not clip it at full separation */
  const displays = lib.part('displays', [0.62, 0.68, 0]);
  /* pedestal and panel held aft of x 1.06: body-4's nose band starts there
     and rises to y 1.065, so a panel any further forward crosses the cowl
     surface instead of standing behind it */
  const pedestal = lib.box(0.055, 0.07, 0.24, M.plastic);
  pedestal.position.set(1.045, 0.885, 0);            /* stands on the top pad */
  displays.add(pedestal);
  const centre = new THREE.Group();
  const centreBezel = lib.box(0.022, 0.175, 0.35, M.plastic);
  const centreFace = lib.box(0.006, 0.165, 0.34, M.sensor);
  centreFace.position.x = -0.013;
  centre.add(centreBezel, centreFace);
  centre.position.set(1.020, 0.968, 0);
  centre.rotation.set(0, -0.10, -0.14);
  displays.add(centre);
  const cluster = new THREE.Group();
  const clusterBezel = lib.box(0.018, 0.06, 0.30, M.plastic);
  const clusterFace = lib.box(0.006, 0.05, 0.29, M.sensor);
  clusterFace.position.x = -0.011;
  cluster.add(clusterBezel, clusterFace);
  cluster.position.set(1.10, 0.888, DZ);
  cluster.rotation.z = -0.3;
  displays.add(cluster);
  const healthBand = lib.box(0.028, 0.014, 1.30, M.sensor);
  healthBand.position.set(1.045, 0.866, 0);          /* lies on the pad */
  displays.add(healthBand);
  for (const cz of [-0.18, 0.18]) {                  /* two cores on the beam */
    const core = lib.box(0.05, 0.05, 0.07, M.pcb);
    core.position.set(1.18, 0.610, cz);
    displays.add(core);
  }
  sys.add(displays);

  /* ── hand wheel: carried rim, 90 mm boss, direct-drive feel unit, and
     the two ORed 48 V leads back along the dashboard bracket ── */
  const wheelP = lib.part('wheel', [0.45, 0.15, 0]);
  const tilt = new THREE.Group();
  const wheel = new THREE.Group();
  const rimTop = lib.mesh(new THREE.TorusGeometry(0.185, 0.017, 10, 40, 4.189), M.rubber);
  rimTop.geometry.rotateZ(-0.524);
  wheel.add(rimTop);
  const rimBottom = lib.mesh(new THREE.TorusGeometry(0.42, 0.017, 10, 24, 0.781), M.rubber);
  rimBottom.geometry.rotateZ(-1.962);
  rimBottom.geometry.translate(0, 0.296, 0);
  wheel.add(rimBottom);
  const hub = zcyl(0.055, 0.05, M.plastic, 20);
  wheel.add(hub);
  const crossSpoke = lib.box(0.34, 0.045, 0.026, M.plastic);
  wheel.add(crossSpoke);
  const lowerSpoke = lib.box(0.04, 0.12, 0.024, M.plastic);
  lowerSpoke.position.y = -0.075;
  wheel.add(lowerSpoke);
  const boss = zcyl(0.032, 0.09, M.darkSteel, 14);
  boss.position.z = -0.055;
  wheel.add(boss);
  const feelBody = zcyl(0.062, 0.115, M.castAlu, 20);
  feelBody.position.z = -0.16;
  wheel.add(feelBody);
  for (const fz of [-0.125, -0.16, -0.195]) {
    const rib = lib.mesh(new THREE.TorusGeometry(0.064, 0.005, 8, 20), M.alu);
    wheel.add(rib);
    rib.position.z = fz;
  }
  const sensorRing = zcyl(0.045, 0.022, M.sensor, 18);
  sensorRing.position.z = -0.228;
  wheel.add(sensorRing);
  wheel.rotation.y = -Math.PI / 2;
  tilt.add(wheel);
  /* rake and reach, not column geometry. The rim's forward-most point is its
     top, at (0.780, 0.946); body.js's cowl beam is a tube of r 0.04 on the
     axis (0.85, 0.93), so the rim passes 30 mm aft of it instead of through
     it. Gen 1's yoke sat at x 0.84 and cleared the same beam in front. */
  tilt.rotation.z = -0.25;
  tilt.position.set(0.73, 0.75, DZ);
  wheelP.add(tilt);
  for (const lz of [-0.04, 0.04]) {                  /* two zones, ORed at the unit */
    wheelP.add(lib.tube([
      [1.158, 0.640, DZ + 0.02 + lz],
      [1.040, 0.660, DZ + 0.01 + lz],
      [0.958, 0.690, DZ + lz],
    ], 0.006, M.copper));
  }
  sys.add(wheelP);

  /* ── front seats: carried crash structure, bolster bladders, seat
     manifold, air line from the console, 48 V drop to hv-4's ring leg.
     Built per side (mirrorZ loses the Vector3 on userData.explode). ── */
  for (const s of [-1, 1]) {
    const zc = 0.38 * s;
    const seat = lib.part('front-seats', [0, 0.4, 0.28 * s]);
    const seatBase = lib.box(0.46, 0.07, 0.44, M.darkSteel);
    seatBase.position.set(0.35, P.floor + 0.035, zc);
    seat.add(seatBase);
    /* tracks standing on battery-3's bonded seat rails (top face y 0.310,
       z ±0.28 and ±0.52), closing the 50 mm between lid and floor line.
       Nothing here drops below y 0.31: that is the battery's envelope. */
    for (const zr of [0.28 * s, 0.52 * s]) {
      const track = lib.box(0.44, 0.050, 0.042, M.steel);
      track.position.set(0.35, 0.336, zr);            /* y 0.311..0.361 */
      seat.add(track);
      const anchor = lib.box(0.06, 0.052, 0.055, M.darkSteel);
      anchor.position.set(0.53, 0.337, zr);           /* y 0.311..0.363 */
      seat.add(anchor);
    }
    const adjuster = lib.box(0.07, 0.045, 0.25, M.plasticLt);
    adjuster.position.set(0.17, 0.338, zc);           /* y 0.3155..0.3605 */
    seat.add(adjuster);
    const cushion = lib.box(0.50, 0.13, 0.50, M.fabric);
    cushion.position.set(0.35, 0.50, zc);
    seat.add(cushion);
    const cushionPipe = lib.box(0.52, 0.03, 0.52, M.tan);
    cushionPipe.position.set(0.35, 0.545, zc);
    seat.add(cushionPipe);
    for (const zo of [-1, 1]) {                      /* cushion bolsters */
      const cb = lib.box(0.44, 0.055, 0.06, M.fabric);
      cb.position.set(0.35, 0.545, zc + zo * 0.245);
      seat.add(cb);
    }
    const backrest = lib.box(0.13, 0.62, 0.48, M.fabric);
    backrest.rotation.z = 0.26;
    backrest.position.set(0.052, 0.81, zc);
    seat.add(backrest);
    for (const zo of [-1, 1]) {                      /* backrest bolster wings */
      const wing = lib.box(0.11, 0.40, 0.06, M.fabric);
      wing.rotation.z = 0.26;
      wing.position.set(0.075, 0.80, zc + zo * 0.255);
      seat.add(wing);
    }
    const backPipe = lib.box(0.135, 0.05, 0.49, M.tan);
    backPipe.rotation.z = 0.26;
    backPipe.position.set(0.005, 0.984, zc);
    seat.add(backPipe);
    const headrest = lib.box(0.10, 0.13, 0.24, M.fabric);
    headrest.rotation.z = 0.26;
    headrest.position.set(-0.062, 1.2, zc);
    seat.add(headrest);
    for (const zo of [-0.06, 0.06]) {
      const post = lib.cyl(0.008, 0.1, M.steel, 8);
      post.rotation.z = 0.26;
      post.position.set(-0.043, 1.125, zc + zo);
      seat.add(post);
    }
    const manifold = lib.box(0.09, 0.05, 0.10, M.plasticLt);
    manifold.position.set(0.36, 0.405, zc - s * 0.10);
    seat.add(manifold);
    seat.add(lib.tube([                              /* console valve block to manifold */
      [0.545, 0.442, s * 0.06],
      [0.500, 0.428, s * 0.16],
      [0.430, 0.412, s * 0.24],
      [0.385, 0.406, s * 0.28],
    ], 0.006, M.plasticLt));
    seat.add(lib.tube([                              /* manifold up to the inboard wing */
      [0.360, 0.430, zc - s * 0.10],
      [0.300, 0.480, zc - s * 0.16],
      [0.180, 0.600, zc - s * 0.22],
      [0.090, 0.720, zc - s * 0.245],
    ], 0.005, M.plasticLt));
    seat.add(lib.tube([                              /* 48 V drop to the ring side leg */
      [0.360, 0.400, s * 0.58],
      [0.335, 0.383, s * 0.63],
      [0.310, 0.356, s * 0.664],   /* lands on hv-4's ring side leg */
    ], 0.006, M.copper));
    sys.add(seat);
  }

  /* ── rear bench: carried geometry, two electric latches, occupancy mats ── */
  const bench = lib.part('rear-bench', [-0.25, 0.45, 0]);
  /* the steel pan interior.js described but never drew, on four legs down
     to battery-3's bonded rear seat pads at x -0.80, y 0.303..0.310 */
  /* Pan held inboard of hv-4's by-wire feeds, which run the rocker tops at
     y 0.36, |z| 0.70 under the contract in gen4.md. It is |z| 0.61 and this
     line used to say 0.68: the pan lost 140 mm of span with the cushion
     when the bench came in off the greenhouse, and the comment kept the old
     number. 0.61 clears the same feeds by 90 mm rather than 20. */
  const benchPan = lib.plate(0.55, 1.22, 0.010, 0.03, M.darkSteel);
  benchPan.position.set(-0.72, 0.365, 0);              /* y 0.370..0.380 */
  bench.add(benchPan);
  for (const zz of [-0.52, -0.28, 0.28, 0.52]) {
    /* 90 mm foot inboard of the pad's outer edge: the pad spans x -0.85 to
       -0.75, and suspension-4's chassis ECU puts connector nubs out to
       x -0.847, so the leg starts at -0.84 and still lands fully on the pad */
    const leg = lib.box(0.09, 0.060, 0.05, M.darkSteel);
    leg.position.set(-0.795, 0.341, zz);               /* y 0.311..0.371 */
    bench.add(leg);
  }
  /* THE BENCH IS 180 MM NARROWER AND ITS HEADRESTS 78 MM LOWER THAN THEY
     WERE, and both numbers come from the roof rather than from a package
     drawing. Ray-swept over this station, the ceiling is body/roof-glass at
     y 1.1609 and body-aero/canopy at 1.1594, both flat across |z| 0.6, while
     body-3 and body-4's canopy runs 1.2476 at z 0 and 1.2134 at |z| 0.5. The
     headrest cores topped out at 1.2106, so they were 50 mm through the Gen 1
     and Gen 2 glass and clipped the Gen 3 and Gen 4 canopy as well: 64.04 mm
     over 36 crossing triangle pairs on Gen 1, 68.82 over 48 on Gen 2 and
     154.94 over 41 on Gen 4, which is the deepest single pair on the ladder.
     The 154.94 is a straddle depth on a 90 mm box and the real intrusion is
     the 46 mm the core stood above the glass; the fix is sized from the
     glass. The cushion loses 180 mm of span for a second reason, which is the
     side glass rather than the roof: body-4's canopy descends to y 1.013 at
     |z| 0.70 over this station, so a 1.52 m bench put its backrest corners
     outside the greenhouse, and body-3's skin closes to |z| 0.76 by x -1.10. */
  /* THE CUSHION IS MOULDED AROUND THE COMPUTE INSTEAD OF THROUGH IT.
     autonomy-4's triplex cold plate is built at x -0.795 to -0.322, y 0.3895
     to 0.4661, |z| 0.200, and one solid 130 mm foam block over that station
     put the plate INSIDE the seat: 472 crossing triangle pairs at a straddle
     depth of 106.65 mm, the deepest cabin pair on Gen 4 and the deepest thing
     this bench does to anyone.

     The plate is not the side that can move and its own panel says so. The
     gap between its underside and battery-3's floor lid is 81.45 mm measured
     surface to surface, so the plate would fit on the lid, but the pan drawn
     below runs y 0.360 to 0.370 across the whole station and the plate is
     77 mm tall: seating it on the lid means an aperture in this pan, which is
     a change in this module paired with a change in autonomy-4, and only one
     of those two is available here. That is written up rather than half done.

     So the foam is relieved and nothing else moves. The pocket is open at the
     cushion's front face, walls 8.0 mm off the plate at both sides and 8.0 mm
     off its aft end, roof 7.9 mm over its tallest point, and every face of it
     is cut INSIDE the old block, so nothing this bench presents to any other
     module changes by a micron. interior-6 reached the same conclusion two
     rungs later against the same plate and stepped its pan over it instead,
     which is the better answer and costs 76 mm of seat height this bench
     cannot spend. The bill here is stated rather than absorbed: 36 mm of foam
     over the plate where the rest of the cushion carries 130. */
  const CUSH = { x0: -0.995, x1: -0.445, y0: 0.380, y1: 0.510, z: 0.670 };
  const POCK = { x0: -0.803, y1: 0.474, z: 0.208 };   /* open at CUSH.x1 */
  const cushionPiece = (x0, x1, y0, y1, z0, z1) => {
    const b = lib.box(x1 - x0, y1 - y0, z1 - z0, M.fabric);
    b.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    bench.add(b);
  };
  /* Two outboard bolsters at the OLD full section, then the centre band split
     into the aft block and the lid over the pocket. Cutting the band rather
     than the whole cushion is deliberate: autonomy-4's sensor ring runs this
     cushion's outboard edge at y 0.394 to 0.434 and |z| 0.639 to 0.669, and a
     split that moved a face near that tube changed a pair it has nothing to
     do with, from 7.01 mm over 310 crossings to 10.16 over 448. Every face
     the ring meets is where it was. */
  cushionPiece(CUSH.x0, CUSH.x1, CUSH.y0, CUSH.y1, -CUSH.z, -POCK.z);
  cushionPiece(CUSH.x0, CUSH.x1, CUSH.y0, CUSH.y1, POCK.z, CUSH.z);
  cushionPiece(CUSH.x0, POCK.x0, CUSH.y0, CUSH.y1, -POCK.z, POCK.z);
  cushionPiece(POCK.x0, CUSH.x1, POCK.y1, CUSH.y1, -POCK.z, POCK.z);
  const benchPipe = lib.box(0.57, 0.03, 1.36, M.tan);
  benchPipe.position.set(-0.72, 0.49, 0);
  bench.add(benchPipe);
  const benchBack = lib.box(0.13, 0.64, 1.34, M.fabric);
  benchBack.rotation.z = 0.3;
  benchBack.position.set(-1.082, 0.766, 0);
  bench.add(benchBack);
  const benchBand = lib.box(0.135, 0.05, 1.35, M.tan);
  benchBand.rotation.z = 0.3;
  benchBand.position.set(-1.127, 0.914, 0);
  bench.add(benchBand);
  for (const zo of [-0.4, 0.4]) {
    const hr = lib.box(0.09, 0.12, 0.26, M.fabric);
    hr.rotation.z = 0.3;
    hr.position.set(-1.2, 1.062, zo);
    bench.add(hr);
  }
  for (const zo of [-0.50, 0.50]) {                  /* 48 V fold latches */
    const latch = lib.box(0.055, 0.045, 0.05, M.plasticLt);
    latch.position.set(-1.19, 1.00, zo);
    bench.add(latch);
    bench.add(lib.tube([
      [-1.185, 0.985, zo],
      [-1.120, 0.760, zo * 0.98],
      [-1.010, 0.520, zo * 0.95],
    ], 0.005, M.copper));
  }
  for (const zo of [-0.52, 0, 0.52]) {               /* occupancy mats */
    const mat = lib.box(0.40, 0.006, 0.42, M.pcb);
    mat.position.set(-0.72, 0.512, zo);
    bench.add(mat);
  }
  sys.add(bench);

  /* ── console: tub, armrest, pads, and the comfort supply under it ── */
  const consoleP = lib.part('console', [0.15, 0.6, 0]);
  /* two floor rails on battery-3's floor-lid top-hat stiffeners (top y 0.308),
     four posts up to the tub: the tub is furniture, this is its footing.
     Held at y >= 0.31 so nothing enters the battery's binding envelope, and
     held to |z| 0.060..0.102 so the rails and posts pass between hv-4's
     tunnel run (z 0.036..0.064) and its diagonal cabin run (z 0.099 here). */
  for (const rz of [-0.081, 0.081]) {
    const rail = lib.plate(0.60, 0.042, 0.008, 0.012, M.darkSteel);
    rail.position.set(0.61, 0.3065, rz);             /* y 0.3105..0.3185 */
    consoleP.add(rail);
  }
  for (const px of [0.34, 0.88]) {
    for (const pz of [-0.081, 0.081]) {
      const post = lib.box(0.030, 0.133, 0.022, M.darkSteel);
      post.position.set(px, 0.377, pz);              /* y 0.3105..0.4435 */
      consoleP.add(post);
    }
  }
  const consoleBody = lib.box(0.62, 0.18, 0.24, M.plastic);
  consoleBody.position.set(0.61, 0.53, 0);           /* x 0.30..0.92 */
  consoleP.add(consoleBody);
  const armrest = lib.box(0.28, 0.05, 0.22, M.tan);
  armrest.position.set(0.46, 0.645, 0);
  consoleP.add(armrest);
  for (const zo of [-0.058, 0.058]) {
    const cup = lib.cyl(0.042, 0.03, M.plasticLt, 18);
    cup.position.set(0.66, 0.63, zo);   /* aft of thermal's HVAC case at x 0.71 */
    consoleP.add(cup);
  }
  const compressor = zcyl(0.045, 0.13, M.darkSteel, 18);
  compressor.position.set(0.40, 0.425, 0);
  consoleP.add(compressor);
  /* 0.35 L at r 0.042: pi r^2 L = 0.349 L, the figure the spec row quotes.
     Kept aft of x 0.62 so it clears wheels-3's rear brake harness, which
     crosses the tunnel diagonally through (0.70, 0.45, 0). */
  const reservoir = xcyl(0.042, 0.063, M.alu, 18);
  reservoir.position.set(0.585, 0.42, 0);
  consoleP.add(reservoir);
  const valveBlock = lib.box(0.08, 0.05, 0.10, M.plasticLt);
  valveBlock.position.set(0.52, 0.42, 0);
  consoleP.add(valveBlock);
  consoleP.add(lib.tube([
    [0.440, 0.440, 0.02],
    [0.520, 0.446, 0.03],
    [0.575, 0.435, 0.02],
  ], 0.005, M.plasticLt));
  sys.add(consoleP);

  /* ── pedals: pedal box hung off the beam, scheduled-feel simulator ── */
  const pedals = lib.part('pedals', [0.35, -0.18, 0]);
  /* z depth held to 0.12 so the box passes inboard of suspension-4's upper
     A-arm, whose driver-side leg runs (1.33, 0.55, -0.38) to (1.45, 0.565,
     -0.70) and sits at z -0.55..-0.50 across this box's x band */
  const pedalBox = lib.box(0.03, 0.26, 0.12, M.darkSteel);
  pedalBox.position.set(1.40, 0.55, -0.43);          /* z -0.49..-0.37 */
  pedals.add(pedalBox);
  pedals.add(lib.tube([                              /* tie up to the dash beam */
    [1.400, 0.670, -0.440],
    [1.300, 0.665, -0.420],
    [1.212, 0.662, -0.400],
  ], 0.010, M.steel));
  const brakePlate = lib.box(0.016, 0.09, 0.09, M.rubber);
  brakePlate.rotation.z = -0.4;
  brakePlate.position.set(1.27, 0.45, -0.46);
  pedals.add(brakePlate);
  const brakeArm = lib.cyl(0.009, 0.19, M.steel, 10);
  brakeArm.rotation.z = -0.54;
  brakeArm.position.set(1.325, 0.555, -0.46);
  pedals.add(brakeArm);
  const simulator = lib.box(0.06, 0.05, 0.045, M.plastic);
  simulator.position.set(1.355, 0.60, -0.46);
  pedals.add(simulator);
  const forceMotor = xcyl(0.032, 0.075, M.darkSteel, 16);
  forceMotor.position.set(1.30, 0.60, -0.46);
  pedals.add(forceMotor);
  const accelPlate = lib.box(0.016, 0.13, 0.055, M.rubber);
  accelPlate.rotation.z = -0.5;
  accelPlate.position.set(1.29, 0.43, -0.39);
  pedals.add(accelPlate);
  const accelHinge = lib.box(0.04, 0.025, 0.065, M.plastic);
  accelHinge.position.set(1.26, 0.372, -0.39);
  pedals.add(accelHinge);
  /* detent coil on the accelerator arm above its pivot. It sits at y 0.44
     because suspension-4's lane-A rack hardware owns everything below
     y 0.406 here (nut, cover, boot, rack tube); the coil lands on the
     pedal plate's inboard edge instead of inside the rack. */
  const detent = zcyl(0.018, 0.03, M.copper, 14);
  detent.position.set(1.245, 0.44, -0.39);
  pedals.add(detent);
  sys.add(pedals);

  /* ── cabin sensing: headliner brackets on the roof rails, two radars,
     six mics, the boss autonomy-4's driver monitor lands on, an air
     quality pod on the dash beam, and drops down both A-pillars ── */
  /* THE CROSS-CAR BRACKETS HANG UNDER THE ROOF, THEY DO NOT SIT IN IT.
     "Touches both rails" was written from a rail position that body-4's
     built pillars do not have: the brackets at y 1.372 and 1.386 were
     60.00 mm inside body-4/pillars over 209 crossing triangle pairs, the
     deepest cabin-to-shell pair on Gen 4. They come down 100 mm, to y 1.272
     and 1.286, and the A-pillar harness comes inboard with them by 95 mm at
     the header and 54 mm at the pillar base. This note used to say 62 mm
     and 55 mm; the first was wrong against its own coordinates and the
     second was the smaller end of a taper quoted as the whole of it. */
  const sense = lib.part('cabin-sensing', [0.05, 0.75, 0]);
  const frontBracket = lib.box(0.08, 0.012, 1.10, M.plasticLt);
  frontBracket.position.set(0.15, 1.272, 0);
  sense.add(frontBracket);
  const frontRadar = lib.box(0.07, 0.032, 0.09, M.sensor);
  frontRadar.position.set(0.15, 1.252, 0);
  sense.add(frontRadar);
  const rearBracket = lib.box(0.08, 0.012, 1.10, M.plasticLt);
  rearBracket.position.set(-0.45, 1.286, 0);
  sense.add(rearBracket);
  const rearRadar = lib.box(0.07, 0.032, 0.09, M.sensor);
  rearRadar.position.set(-0.45, 1.266, 0);
  sense.add(rearRadar);
  for (const [mx, my, mz] of [
    [0.15, 1.267, -0.46], [0.15, 1.267, -0.22], [0.15, 1.267, 0.22], [0.15, 1.267, 0.46],
    [-0.45, 1.281, -0.46], [-0.45, 1.281, 0.46],
  ]) {
    const mic = lib.cyl(0.009, 0.006, M.sensor, 12);
    mic.position.set(mx, my, mz);
    sense.add(mic);
  }
  sense.add(lib.tube([                               /* arm out to the DMS boss */
    [0.190, 1.268, -0.30],
    [0.280, 1.278, -0.30],
    [0.350, 1.288, -0.30],
    [0.382, 1.293, -0.30],
  ], 0.009, M.plasticLt));
  const dmsBoss = lib.box(0.05, 0.02, 0.045, M.plasticLt);
  dmsBoss.position.set(0.405, 1.298, -0.30);         /* autonomy-4 lands here */
  sense.add(dmsBoss);
  const airPod = lib.box(0.05, 0.05, 0.07, M.sensor);
  airPod.position.set(1.18, 0.612, 0.30);            /* under the dash beam */
  sense.add(airPod);
  for (const s of [-1, 1]) {
    sense.add(lib.tube([
      [0.170, 1.270, s * 0.520],
      [0.340, 1.280, s * 0.524],
      [0.520, 1.185, s * 0.560],
      [0.700, 1.080, s * 0.626],
      [0.845, 0.955, s * 0.662],                     /* A-pillar base */
    ], 0.007, M.plastic));
  }
  sys.add(sense);

  return sys;
}
