/* Interior, Gen 5 apex. NAMING: the module id carries the -6 suffix because
   the -5 ids belong to the demoted value study; every user-facing label says
   Gen 5 (design/gen5-apex.md, design/backfill-1.md).

   This slot has never advanced since Gen 1. design/gen5-apex.md said nothing
   should pretend otherwise, and design/backfill-1.md makes this module the
   promise being kept: the cabin the apex platform actually earns. Magnesium
   seat structure with active posture, a ventilated low-emissivity liner under
   body-6's electrochromic canopy, a hand wheel with no column behind it in
   either module's drawing, an HMI built around autonomy-4's handover problem,
   restraints re-tuned for a car with no engine bay ahead of the toe board,
   and an NVH package aimed at the tone drivetrain-6's rear corners actually
   make. 150 kg against interior.js at 184, itemized part by part.

   Gen 5 preset partners, reconciled from their GEOMETRY per the drift law in
   design/retro-gen4.md and design/retro-gen5-apex.md:
   - body-6: canopy glass band lofted 8 mm proud of the loft stations from
     the cowl ring at x 1.06 to the deck ring at x -1.87; roof crown y 1.453
     at x 0.45 and 1.460 at x -0.35, glass edge at |z| 0.668 there. The liner
     hangs under that crown between the cage roof rails, whose axes run
     (0.35, 1.40, ±0.615) to (-0.55, 1.42, ±0.615) at r 0.042, so their inner
     surface is |z| 0.573 and their underside runs y 1.358 to 1.378. body-6
     also closes the cavity fore and aft with full-width roof bows, x 0.310..
     0.390 underside y 1.360 and x -0.590..-0.510 underside y 1.380, which is
     what forbids a duct inside the cavity at all. Nothing in this module
     passes THROUGH any of that: the liner clips land in the rails and stop,
     the liner's own front edge lands in the forward bow, and the rail ducts
     run inboard and under.
   - thermal-6: HVAC case x 0.78..1.00, y 0.58..0.82, z -0.25..0.31, with two
     duct stubs whose top faces sit at y 0.86, centered (0.89, 0.84, -0.10) and
     (0.89, 0.84, 0.12). This module's dash plenum lands ON those two top faces
     through a clamped collar rather than sleeving down the stub sides, because
     thermal-6's own cabin filter (x 0.79..0.93, y 0.82..0.85, z -0.16..0.06)
     already occupies the flank of the driver-side stub. Aft of x 1.00 the
     plenum stays above y 0.824. The same case is why the hand wheel sits at
     x 0.695: interior.js parked its rim at 0.84, whose 370 mm inboard arc
     sweeps through that case corner, and a car with no column has no reason
     to be there.
   - suspension-4: steer-by-wire rack at y 0.36, and lane A is wider than its
     own panel says: rack x 1.20..1.24, housing to 1.25, ball nut x 1.174..
     1.266 over z -0.425..-0.335, motor x 1.263..1.337 over z -0.51..-0.37,
     lane ECU to y 0.43. Its front upper wishbone inner pivot bush also sits
     at (1.33, 0.55, ±0.38). Both drove pedal geometry, below. Its steering
     panel states the column stub is deleted and the hand wheel, its sensing
     and its feel motor are interior parts; that hardware is on this ledger,
     it is 1.4 kg by its own ledger line, and nothing in this module descends
     past the feel unit.
   - autonomy-4: triplex cold plate x -0.76..-0.34, y 0.395..0.463 with fins
     to |z| 0.20, sitting exactly where a rear cushion pan wants to be. The
     bench pan is stepped over it. Driver monitor at (0.40, 1.285, -0.30) and
     the camera wedge at (0.42, 1.31, 0), both cleared by the liner.
   - hv-4: 48 V ring at y 0.345 with zonal controllers at (±1.16/-1.19, 0.386,
     ±0.615), the tunnel HV run at (·, 0.34, 0.05) and its thermal spur near
     z 0.10 to 0.19. Every motor, bladder pump, latch and heater in this cabin
     is a telemetered eFuse channel on the nearest of those four boxes.
   - battery-6: floor-lid skin measured off its build code, not its comment,
     which says 0.296 and is 6 mm out because lib.plate spans y+t/2 to y+3t/2:
     the skin is y 0.290..0.302. Top-hat stiffeners run to y 0.303 at x -0.5,
     0.1 and 0.7; mounting rails (x -0.055..0.695) and rear pads (x -0.85..
     -0.75) reach y 0.308 on z ±0.28 and ±0.52. Every seat pedestal, the four
     rear bench feet and all four console legs land on those rails and pads;
     the two forward bench legs land on the x -0.5 stiffener line, because
     nothing of battery-6's sits under x -0.52 at z ±0.42. The damping tiles
     bond onto the skin at y 0.302 inside the bays, flush with the rail tops.
     The only entries into the battery envelope (y ceiling 0.31) anywhere in
     this module are those landings, y 0.302 to 0.308, on the pack's own
     hardware.

   Nothing in this module is lib.shell(). The cabin must stay visible in
   x-ray, which is the entire point of x-ray. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'interior-6',
  name: 'Interior · Gen 5 apex',
  color: 0xd9c08a,
  explode: [0, 1.05, 0],
  blurb: 'interior.js shipped in Gen 1 and never moved again: four generations spent their risk on cells, structure, aero and control, and the cabin rode along unchanged. The apex platform makes that indefensible. 150 kg against 184, and the difference is not a diet: seven ancestor parts fall 59 kg on magnesium structure and foam-core substrates, then 25 kg goes back into three things Gen 1 never had, a ventilated low-emissivity liner under body-6\'s electrochromic canopy, restraints re-tuned for a nose with no engine in it, and an NVH package aimed at the 2.2 kHz tone drivetrain-6\'s in-wheel corners actually radiate.',
  parts: {
    dashboard: {
      name: 'Dash and cross-car beam',
      tagline: 'The same one calm surface, with two thirds of its mass removed and the airbags handed to the part that owns them.',
      mass: 27,
      specs: [
        ['Ancestor', 'interior.js dashboard, 48 kg'],
        ['Crossbeam', 'Thin-wall Mg casting + bonded carbon shear web, 3.8 kg'],
        ['First bending mode', '52 Hz (interior.js: 38 Hz)'],
        ['Substrate', 'Carbon-skinned pet foam core, 4.2 mm sandwich'],
        ['Plenum', 'Lands on thermal-6 duct stubs at (0.89, 0.84, ∓)'],
        ['Maturity', 'Production practice; the bonded Mg-to-carbon beam is pilot line'],
      ],
      how: 'The ledger first, because this is the largest single reduction in the cabin. interior.js spent 48 kg here: a 6.4 kg cast magnesium crossbeam, a long-glass polypropylene substrate with a TPO skin over 9 mm of foam, the HVAC distribution box, and a 90 liter passenger airbag plus a knee bag. Seven kilograms of that was restraint hardware and it moves to the restraints panel, where it can be argued about alongside the belts instead of hiding inside a trim item. The beam falls to 3.8 kg by going thin-wall and taking its shear from a bonded carbon web rather than from magnesium section, which also raises first bending from 38 to 52 Hz, so the displays stop shimmering on coarse chip seal instead of merely being held above the excitation. The substrate falls from roughly 12 kg of molded PP to 6 kg of carbon-skinned pet foam core at 4.2 mm total sandwich thickness, stiffer per kilogram than the molding it replaces by about a factor of four in bending. The distribution ducting halves, from 5 kg to 2.5, because the roof load left: the canopy liner now handles the glass, so the dash no longer has to blow a curtain up a windshield it cannot reach. That leaves the remainder honest: the glovebox, vent bodies, brackets, harness and fixings that made up the other 17.6 kg of Gen 1 fall to 14.7, because a bonded sandwich needs a fraction of the clip and bracket count a molding needs to stop sagging. Add it up, 3.8 plus 6 plus 2.5 plus 14.7, and the part is 27 kg.\n\nThe plenum is where this part stops being trim and starts being an interface. thermal-6 ends its HVAC case at x 1.00 with two duct stubs whose top faces sit at y 0.86, centered at z -0.10 and +0.12, and this module lands two ducts on exactly those faces and owns everything downstream: the full-width 8 mm slot under the aft edge at x 0.958, the motorized vanes that steer the Coanda sheet, and the two risers that climb the A-pillars to the liner. Neither module draws the other side of that joint. The sheet-flow argument carries from interior.js unchanged and is worth restating with the apex numbers: a wide slow sheet at 0.8 m/s across the glass root beats four cold jets at 3 m/s for the same enthalpy, because comfort is a skin-temperature problem and a jet solves it at one square decimeter of one occupant.',
      why: 'A dashboard is the only part in the car whose mass sits high, forward, and outboard of nothing, which means every kilogram here is paid twice, once in the mass ledger and once in the yaw inertia that suspension-4 spends actuator authority fighting. interior.js was honest that the visible slab was trim; the apex version acts on it, deleting a molding whose only structural job was to not sag between clips and replacing it with a sandwich that is stiff because of its geometry. The restraint hardware leaving is not bookkeeping either: it was 15 percent of this part and it never belonged to a trim engineer.',
      fail: [
        'Squeak and rattle from clip stack-up across the -30 to +85 °C soak is still the top interior warranty item industry-wide, carried from interior.js; a foam-core sandwich moves less than a PP molding across that range but bonds to magnesium with a coefficient mismatch of its own, and the bond line is now the watch item the clips used to be.',
        'The bonded Mg-to-carbon beam is the pilot line claim: magnesium next to carbon is a galvanic couple that eats the magnesium, so the interface carries a glass-fiber isolation ply and a sealed edge, and what has to become true is a decade of humidity and salt cycling on that joint without a stiffness knee.',
        'A failed vane actuator still freezes the air sheet in one direction and still means pulling the top pad to reach it; the eFuse current signature on hv-4\'s front zone now books the job before the driver notices, which is early warning, not a fix.',
      ],
      explode: [0.55, 0.35, 0],
    },
    displays: {
      name: 'HMI and handover band',
      tagline: 'The screen stops being the safety story: a light band across the whole dash tells the driver which third of the brain is alive and how long they have.',
      mass: 9,
      specs: [
        ['Ancestor', 'interior.js displays, 8 kg'],
        ['Center display', '15 in, 3200 x 1360, optically bonded, 1400 cd/m²'],
        ['Cluster strip', '12 in ultrawide, fixed layout, carried from Gen 1'],
        ['Handover band', '1.44 m edge-lit strip, ASIL-B core, 8 ms to full output'],
        ['Safety path', 'Isolated core repaints speed and state within 300 ms'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Two things carry from interior.js because they were right: optical bonding, which is most of the difference between readable and washed out in sunlight, and the split between a fixed cluster strip for glanceable state, a center panel for decisions, and stalks for reflexes. The panel grows to 15 inches and 1400 cd/m², in a 2.36:1 letterbox rather than the 1.6:1 it was first drawn as, because the only place it fits is the 199 mm between body-7\'s cowl tube at y 0.894 and the windshield at 1.111 and the safety island tightens from 500 to 300 ms, but neither is the apex change. The apex change is a strip of light 1.44 m long running the full width of the dash aft edge, driven by the same isolated ASIL-B core that composites the tell-tales, and it exists because autonomy-4 changed what the cabin has to communicate. A supervised car needs to show speed. A fail-operational car needs to show which of three compute lanes is voting, whether it is currently driving, and how much of the 10 second handover budget is left.\n\nThat budget is the honest part. autonomy-4\'s driver monitor sits on the header rail at (0.40, 1.285, -0.30) and can confirm within 2 seconds that eyes came back to the road; its own panel states plainly that it cannot confirm the model of the road came back with them, and that takeover research puts real situational awareness seconds to tens of seconds behind gaze. So this HMI never draws a countdown as a promise. The band goes amber across its full width at the request, which is a peripheral event no forward-facing driver can miss, then walks a bright segment inward from both ends as the budget spends, and the center panel simultaneously shows the scene the car is worried about rather than the word disengage. If the band reaches center, the car executes autonomy-4\'s own minimal-risk stop, which was armed throughout and never depended on the human arriving. A lane going offline is drawn the same way and with the same restraint: three ticks on the band, one grays, the car keeps driving, and nothing beeps, because a fault the architecture already survived does not get to interrupt anyone.',
      why: 'interior.js argued the one-screen case on cost and cadence, which under this project\'s premise is not an argument at all. What survives the premise is the physical one: a switch bank is frozen geometry, and the function set of a fail-operational car changes over its life in ways no 2026 layout can anticipate. What the premise adds is that peripheral vision is a channel nobody was using. Foveal attention is the scarce resource in a handover and the center panel competes for it; a 1.44 m band is read without looking, which is the only bandwidth left when the eyes are busy re-acquiring a road.',
      fail: [
        'Low sun directly behind the driver still washes out the matte etch, carried from interior.js unimproved, because there is no software fix for geometry; the band is edge-lit and sits under the top pad lip where it survives the same sun the panel loses to.',
        'A color-blind driver reads amber against green poorly, so band state is carried by segment position and motion as well as hue, and the fallback is the cluster strip in words.',
        'Menu depth still creeps with every software release, and each relocated function is a small safety regression that never shows up in a crash test; the band cannot fix that, and pretending otherwise would be the failure mode.',
      ],
      explode: [0.62, 0.6, 0],
    },
    wheel: {
      name: 'Hand wheel and feel unit',
      tagline: 'Nothing continues below this bracket, in this module or in suspension-4: the column is deleted in both drawings, which is the only way a deletion is real.',
      mass: 10,
      specs: [
        ['Ancestor', 'interior.js yoke, 9 kg, on a 200 mm column stub'],
        ['Column', 'None. suspension-4 draws none either; both sides checked'],
        ['Feel motor', '16 Nm direct drive, 90 Hz useful bandwidth'],
        ['Sensing', 'Triple angle and torque, three supplies, three ring segments'],
        ['Mounting', 'Single bracket to the dash beam at z -0.38'],
        ['Maturity', 'Pilot line; direct-drive feel at automotive NVH is not shipped'],
      ],
      how: 'Gen 1 counted this hardware twice and owned it nowhere. interior.js drew a 200 mm column stub ending in a duplex sensor pack with a belt-driven 8 Nm feel motor, and suspension.js drew the same feedback unit at the bottom of the same stub inside its own 15 kg steering item. suspension-4 settles it in the direction of deletion: its steering panel reads "the Gen 1 sensor stub is gone" and its build code has a comment where the stub used to be and no geometry, and it hands 1.4 kg of feedback hardware to this ledger. So this part is the entire steering interface with one owner, and the physical check is simple: trace forward from the rim and the last object is a feel unit on a single bracket bolted into the dash beam at (1.06, 0.806, -0.38), inside the beam\'s own 84 mm section. Nothing crosses the firewall. The ledger closes item by item: minus 1.5 kg for the stub and its duplex sensor box, minus 1.4 for the belt, pulleys, tensioner and the 8 Nm motor that drove them, plus 1.4 for the feedback hardware suspension-4 hands over, its inverter, mount and cooling, plus 2.0 for the 16 Nm direct-drive machine, plus 0.5 for triple angle and torque sensing on three independent supplies where there were two. Nine kilograms becomes ten.\n\nThe uprate is about what the belt was doing to the signal. A toothed belt is a spring with backlash and both sit inside the loop that renders road feel, so interior.js stopped being useful above roughly 25 Hz: enough for weight and self-aligning torque, useless for the textures that tell a driver what the tires are doing. Direct drive puts the rotor on the rim axis and reaches about 90 Hz, and 16 Nm of authority makes programmed end stops feel like ends. That bandwidth matters more on this car than on its ancestors because drivetrain-6 vectors yaw with four inputs now, three torques and suspension-4\'s ±3 degree rear steer, and a driver who cannot feel the rear axle working is being steered by a machine whose reasoning is invisible. The rim geometry is carried from interior.js unchanged, round on top and flat only at the bottom, for the reason Gen 1 gave and no better one has appeared: a hand thrown at the rim in a slide always finds rim. Power is 600 W peak, 12.5 A at 48 V, ideal-diode ORed at the unit from two hv-4 zones exactly as every by-wire load on this car is fed.',
      why: 'suspension-4 made the rack fail-operational: two complete lanes 76 cm apart, either good for the full 12 kN, failover under 2 ms. The rim end had none of that seriousness because two modules each assumed the other owned it, and an interface with two owners has none. Consolidating it here also buys packaging that a column forbids: with no shaft the fore-aft position is set by the driver\'s reach rather than by a steering-box location, so the rim sits 145 mm closer than interior.js could put it, at x 0.695 rather than 0.84, and the knee path under it is empty, which the restraints panel spends.',
      fail: [
        'A direct-drive motor has no gearbox to hide behind, so its cogging torque lands straight in the palm; the machine is wound for smoothness rather than density and the honest cost is a heavier motor than the torque figure alone would justify.',
        'There is no mechanical path to the rack and there is now no stub either, so the sensing carries the whole burden: three angle and torque channels on three supplies and three ring segments vote, and a two-way disagreement drops the car to a fixed ratio with reduced assist, which the driver feels within one corner.',
        'Feel is a calibration liability, carried word for word from interior.js and repeated by suspension-4: a bad release makes good hardware drive badly, and it can now do it with 90 Hz of authority instead of 25.',
      ],
      explode: [0.45, 0.15, 0],
    },
    'front-seats': {
      name: 'Magnesium posture seats',
      tagline: 'Ten kilograms per seat removed from a part whose mass is set by crash loads, by changing what the frame is made of rather than what it has to survive.',
      mass: 44,
      count: 2,
      specs: [
        ['Ancestor', 'interior.js front seats, 64 kg, 32 kg per seat'],
        ['Structure', 'WE43 magnesium frame and cushion pan, 6.5 kg'],
        ['Mass', '22 kg per seat; side airbag moved to the restraints ledger'],
        ['Posture', '8 pneumatic cells, 40 mbar resolution, 20 min cycle'],
        ['Comfort', 'Ventilated cushion and backrest, 12 W of fans'],
        ['Maturity', 'Production practice; the one-piece Mg frame is pilot line'],
      ],
      how: 'The load case is unchanged and it is why this is still the heaviest system in the cabin. In a 30 g frontal pulse the seat holds its occupant while the pretensioned belt feeds about 4 kN into the frame, the recliner gear must not back-drive under torso load, and the tracks must not release. That sets the gauge of every member, and it is why these seats still bolt straight onto the pack: each track lands on one of battery-6\'s four lid seat rails at y 0.308 on z ±0.28 and ±0.52, and that lid passes the load through potted inserts in its honeycomb core into the brick tops beneath, exactly as its own panel describes. The crash path runs occupant, frame, track, rail, cell stack, with no soft floor in between. What changed is the material. WE43 magnesium, a rare-earth alloy with real elongation rather than the brittle die-cast magnesium the industry got burned by, replaces stamped steel across the backrest frame, the cushion pan and the recliner housings. Density is 1.84 against 7.85, and after redesigning sections for the lower modulus the frame lands at 6.5 kg where interior.js spent 12 on steel frame and recliners. The 22 kg audit reads: 6.5 kg frame and recliners, 6 kg foam and trim, 4.5 kg tracks and three motors, 2 kg pan and mounts, 3 kg of posture cells, pump, ventilation fans, heater mats and electronics. The 0.8 kg side airbag per seat is on the restraints ledger now, which is why 32 minus 10 does not equal the number of parts that left.\n\nThe posture system is the long-journey answer and it is a control problem, not a foam problem. Eight pneumatic cells sit under the cushion and up the lumbar and thoracic line, each held to 40 mbar by a shared 20 W pump on hv-4\'s front zonal bus, and their setpoints walk on a 20 minute cycle so the pressure map under the occupant is never static. Sitting still is what hurts: seat-interface pressure concentrated in the same 40 cm² of ischial tuberosity for four hours is the mechanism behind long-drive fatigue, and moving the peak by 15 mm every few minutes defers it far more effectively than any amount of foam tuning. The cells also do something Gen 1 could not: suspension-4 reads autonomy-4\'s forward camera preview to pre-position damper valves, and the same preview arrives here, so the outboard bolsters firm 200 ms before a commanded lane change rather than during it. Ventilation is 12 W of fans pulling through a perforated cover, which is worth more comfort per watt than cabin cooling by a factor of roughly twenty, the same argument thermal-6 makes for seat heating in the other direction.',
      why: 'interior.js said seats resisted the diet the rest of the car went on because their mass scales with occupants and crash loads rather than with vehicle mass, and considered a 24 kg thin-shell seat that gave back adjustment range and long-haul comfort, correctly rejecting it. That trade is only forced if the frame has to be steel. Under this project\'s premise it does not: magnesium buys the ten kilograms without giving back a millimeter of travel or a newton of restraint capability, and the saving is taken at the seat rather than at the occupant. It is still the heaviest system in here, and still correctly so.',
      fail: [
        'Magnesium in a seat frame is a corrosion and creep question, not a strength one: it needs a full conversion coating and isolation from every steel fastener, and a coating breach at a track bolt is how a 6.5 kg frame becomes a warranty case. The pilot line label is for the one-piece frame casting, and what has to become true is 15 years of salt and humidity on a coated WE43 structure carrying restraint loads.',
        'Cushion foam still loses around 15 percent height by 100,000 entry cycles, quietly lowering the H-point and the belt geometry with it, carried from interior.js; the posture cells can re-level the surface and cannot re-level the anchor points, so the belt geometry ages exactly as before.',
        'Eight pneumatic cells and a pump add a class of failure a foam seat does not have: a slow leak reads as a seat that is subtly wrong rather than obviously broken, so each cell is pressure-monitored and a leak books itself against the eFuse duty signature of the pump rather than waiting for a complaint.',
      ],
      explode: [0, 0.4, -0.28],
    },
    'rear-bench': {
      name: 'Rear bench',
      tagline: 'Three real seats on a pan that has to step over the car\'s brain, and the step is drawn rather than assumed.',
      mass: 24,
      specs: [
        ['Ancestor', 'interior.js rear bench, 36 kg'],
        ['Pan', 'Magnesium, stepped: underside y 0.494 forward, 0.440 aft'],
        ['Clearance', '31 mm over autonomy-4\'s cold plate (top y 0.463)'],
        ['Fold', '40/20/40, flat load floor; ISOFIX x2 plus top tethers'],
        ['Middle seat', 'Flat footwell, full three-point belt, 480 mm cushion'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The structural story is the pan, and it is a partner reconciliation rather than a comfort decision. autonomy-4 puts its triplex cold plate under the rear seat at x -0.76 to -0.34, y 0.395 to 0.463 including the voter bar and the lane boards, with heatsink banks reaching |z| 0.20. interior.js drew a flat steel pan through that volume, which was fine when the car\'s brain was a single box the Gen 1 module put somewhere vaguer. It is not fine now, so the pan is stepped: magnesium, 14 mm sections, running at y 0.440 to 0.454 aft of x -0.765 and lifting over a short riser to an underside of y 0.494 forward of it, which clears the tallest thing on that plate, the voter bar at y 0.463, by 31 mm and leaves a service gap that does not require unbolting the bench to reach a lane board. The step is also free comfort: a rear cushion wants its front lip higher than its rear for thigh support, and the geometry the compute forced is the geometry the ergonomics wanted. Belts anchor to the body rather than the seat, so a folded backrest never carries restraint loads, carried from interior.js unchanged.\n\nThe fold splits three ways instead of two. interior.js used 60/40, which means the middle seat belongs to whichever side is folded and a family carrying skis loses a passenger. A 40/20/40 split makes the center section its own element, so the long-load case and the third-passenger case stop competing, and the cost is one more latch pair and about 0.6 kg. The bench also stands on named hardware rather than on a floor: the four aft feet land in battery-6\'s rear mounting pads at y 0.308, and the two forward legs land on its x -0.5 top-hat stiffener, because at z ±0.42 that stiffener line is the only pack structure under this station. The rest of the ledger is material: the steel pan and its brackets fall from roughly 14 kg to 6 in magnesium, the backrest frame from 9 to 5, foam and trim hold at 9, latches and ISOFIX reinforcement hold at 4. Thirty-six becomes twenty-four. The flat-floor dividend and its honest tax both carry from interior.js word for word: no tunnel means the middle passenger gets a real footwell and the same 480 mm cushion depth as the outboard seats, and the pack still raises the floor about 130 mm over a sedan, so at a fixed roofline tall adults still ride slightly knees-up. The skateboard moved the compromise, it did not delete it, and four generations have not changed that sentence.',
      why: 'Every earlier module on this ladder that touched the rear floor treated what lives under it as somebody else\'s drawing. The retro is explicit that partner reconciliation beats ancestor reconciliation and that the check is geometry rather than prose, so this pan is dimensioned against coordinates read out of autonomy-4\'s build code rather than against its description of itself. That is the entire reason the step exists, and drawing it into the part is what stops it being discovered by a bench that will not bolt down at the first prototype build.',
      fail: [
        'The stepped pan puts a 40 mm riser directly under the occupant\'s thigh line; the foam bridges it, and a heavy occupant on a long journey can still feel the transition, which is the honest cost of routing structure around a computer.',
        'The middle belt\'s upper anchor geometry is marginal for small statures, carried from interior.js unfixed: a booster cushion corrects it and almost nobody fits one there.',
        'Fold latches wear into rattle sources at exactly the frequency coarse chip roads excite, and 40/20/40 adds a pair of them; the NVH package damps the panel they rattle against rather than pretending the latch will not wear.',
      ],
      explode: [-0.25, 0.45, 0],
    },
    console: {
      name: 'Center console',
      tagline: 'Still furniture, and now honest about it: nine kilograms of molding deleted from a part with no structural job.',
      mass: 6,
      specs: [
        ['Ancestor', 'interior.js console, 15 kg'],
        ['Tub', 'Carbon-skinned foam core, 2.6 kg'],
        ['Storage', '13 L bin; two damped 70 mm cupholders'],
        ['Charging', 'Two 15 W inductive pads, coil temperature capped at 60 °C'],
        ['Armrest', 'Sliding pad, 60 mm travel, the highest-cycle part in here'],
        ['Maturity', 'Production practice'],
      ],
      how: 'There is still no mechanical reason for this part to exist. With no gearbox and no driveshaft the floor between the seats is empty, so the console is pure furniture: a tub bolted to the flat floor, hiding the low-voltage drops to hv-4\'s front zonal boxes and the duct that feeds the rear footwells, carrying a 13 liter bin, two damped cupholders and two inductive pads. What changed is the honesty of its mass. interior.js spent 15 kg on it, of which roughly 8 was injection-molded polypropylene doing nothing but not sagging between clips, and under a premise where cost is never an argument there is no defense for that: the tub becomes a carbon-skinned foam sandwich at 2.6 kg, the armrest slide mechanism goes from 2 kg to 1.2 on a magnesium rail, and the pads and their electronics hold at 1.8 because they are what the part is actually for. Nine kilograms leave a component with no load case.\n\nThe pads are still thermally limited rather than electrically, and the number carries: 15 W into a phone in a sun-soaked cabin will cook it, so a coil temperature cap derates charging above 60 °C, which is why summer wireless charging feels slow. The canopy liner changes that arithmetic more than any coil redesign could, because the reason a parked cabin reached the cap was 596 W of downward radiation from a hot inner glass surface, and the liner cuts that to about 35 W. The armrest still slides 60 mm to put the elbow behind the wrist on the screen, an ergonomic detail used hundreds of times a day and the single most-cycled moving part in the cabin.',
      why: 'A walk-through cabin was on the table again and lost again, for the reason interior.js gave: elbow support at the right height scores higher in long-drive comfort clinics than openness scores in anything measurable, and this car is built for the 1,672 km range its pack advertises. What the apex premise changes is not the decision but the bill. Choosing the console is choosing what the flat floor is spent on, and spending it on posture is defensible; spending nine kilograms of that on a molding tolerance is not.',
      fail: [
        'The spill drains under the cupholders still clog with years of crumbs and sugar, and once blocked the next 250 ml of coffee reaches the inductive electronics the drains were validated to protect, carried from interior.js unimproved.',
        'A foam-core tub takes a dropped-object dent that a PP molding would shrug off; the visible surfaces carry a sacrificial skin and the repair quantum is the panel rather than a polish.',
        'Steel phone cases and stray coins still trip foreign-object detection and charging still stops silently, which is a UI failure the eFuse telemetry can now see and the driver still cannot.',
      ],
      explode: [0.15, 0.6, 0],
    },
    pedals: {
      name: 'Pedal set',
      tagline: 'Two simulator elements and three position channels, because everything the driver feels through the sole is synthesized, and a synthesizer is allowed to fail exactly once.',
      mass: 5,
      specs: [
        ['Ancestor', 'interior.js pedals, 4 kg'],
        ['Brake', 'By-wire, decoupled; dual-element simulator, either alone legal'],
        ['Travel', '55 mm, about 70 N at 1.0 g, curve carried from Gen 1'],
        ['Sensing', 'Triple redundant position, three supplies, two zonal rings'],
        ['Fallback', 'Owned by the braking module, not by this part'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The brake pedal does not push fluid; it pushes a simulator, and the two-stage curve is carried from interior.js because it was tuned in blind clinics and nothing about the apex car changes what a foot wants: 12 N of breakaway so a resting foot does not brake, a linear modulation region, then a sharply rising rate so 1.0 g arrives at about 70 N and 55 mm. Decoupling is what makes that curve identical on the first stop of a winter morning and the tenth stop down an alpine descent, and it is what lets the controller blend regeneration with friction braking invisibly. On this preset the blend is deeper than any ancestor: drivetrain-6 puts four independently controlled machines on the car and the vectoring coordinator arbitrates against a braking demand within 2 milliseconds, so the great majority of daily braking events end with no pad touching a disc at all.\n\nWhat the apex generation adds is redundancy inside the feel itself, and one kilogram buys it. interior.js used a single coil spring and elastomer stack: a broken spring or a set elastomer changes the pedal law silently, and because the pedal is decoupled there is no hydraulic pressure rising under the foot to contradict it. This part carries two simulator elements in parallel, each sized so that either alone still meets the legal effort limits and delivers a recognizable if firmer curve, and the difference between them is monitored, so a degrading element is a detected fault rather than a slow recalibration of the driver. Position sensing goes from dual-track to three channels on three supplies split across both of hv-4\'s zonal rings, which matches what suspension-4 did at the rack and what this module did at the hand wheel: in a car with no mechanical path anywhere, every driver input is a vote. The hydraulic fallback is deliberately not described here. It belongs to the braking hardware in the wheels module, and interior.js claiming a push-through circuit inside a trim part was exactly the kind of unowned interface the wheel and column argument had to be untangled from.\n\nOne packaging note, because it changed the drawing rather than just the words. Both pedals hang from a single box on the dash beam, including the accelerator, which reads as an organ pedal and is not floor-mounted. There is no floor under it to mount to: suspension-4\'s rack, its ball nut and its lane A motor fill x 1.174 to 1.337 at this z, so a pedestal down to the pack lid would land on the steering. The accelerator hinge therefore hangs on a stay off the pedal box, and the pad itself was cut from 130 to 110 mm and re-pitched so its upper corner stays out of the front upper wishbone\'s inner pivot bush at (1.33, 0.55, -0.38), which the taller pad entered by 18 mm. Every element of this part now sits at y 0.4125 or above and at |z| 0.3575 or more, which keeps it out of P.driveF as well.',
      why: 'A hydraulic pedal\'s feel drifts with pad temperature, fluid age and regeneration state; a simulator\'s feel is a specification. Once braking is blended electronics anyway, synthesizing the feel is more truthful to the driver than coupling the pedal to plumbing whose behavior changes underneath it. The apex correction is to treat that synthesis as a safety function with a redundancy budget rather than as a comfort feature, which is what the second element and the third sensing channel are.',
      fail: [
        'The simulator always feels the same, so it still cannot telegraph fade or a failing circuit through the sole; that information moves to the handover band and a chime, an honest demotion carried from interior.js.',
        'Two elements in parallel mean the pedal survives one failure and changes character doing it: the driver gets a firmer, shorter pedal with no warning at the moment of failure, and the car says why afterward rather than during.',
        'Disagreement between the accelerator\'s three position channels zeroes the torque request immediately; the car coasts and braking is unaffected, which is the correct behavior and still alarming at highway speed.',
      ],
      explode: [0.35, -0.18, 0],
    },
    'canopy-liner': {
      name: 'Canopy liner and rail ducts',
      tagline: 'body-6 darkens the glass and the heat lands on the inside of it: 596 W of downward radiation onto the occupants\' heads, cut to 35 by a low-emissivity ceiling that breathes.',
      mass: 8,
      specs: [
        ['Problem', 'Darkened EC glass absorbs, then radiates inward at 55 °C'],
        ['Untreated load', '596 W over 3.4 m² of glazing onto the cabin'],
        ['Liner', 'Vacuum-metallized low-e upper face, ε 0.05; treated load 35 W'],
        ['Ventilation', '48 mm rail ducts, 40 m³/h a side into the roof cavity'],
        ['Span', 'Shell x 0.35 to -0.55, |z| 0.44; blind on to -1.05'],
        ['Maturity', 'Production practice; the ducted low-e ceiling is pilot line'],
      ],
      how: 'body-6 replaced the fixed infrared stack in its canopy with an electrochromic interlayer running 20 percent transmittance down to 1, zoned, in seconds, and handed the setpoint to thermal-6 so the roof darkens during a hot-soak precondition. That is the right decision and it creates this part\'s entire reason to exist, because an electrochromic layer does not reject energy, it absorbs it. Shortwave solar that used to pass through and land on the seats now stops inside the laminate, and the inner glass ply climbs to roughly 55 °C on a summer afternoon. Glass has an emissivity near 0.84, so the arithmetic on 3.4 m² of canopy over a 25 °C cabin is 0.84 x 5.67e-8 x (328⁴ - 298⁴) = 175 W/m², about 596 W radiating straight down onto the heads of the people underneath. Air conditioning fights that badly: it cools air, and the occupant is being heated by a surface, so the thermostat reads comfortable while the driver\'s scalp does not. This is the load interior.js never had, because a passive IR-reflective coating threw the energy away outside the glass rather than storing it in the ply.\n\nThe answer is two surfaces and a draft. The liner is a formed foam-core shell spanning x 0.35 to -0.55 and |z| 0.44, hung on six clips that reach outboard to sit under the cage roof rails, so the load path is into the cage rather than into trim. Its upper face is vacuum-metallized to an emissivity of about 0.05, and for two parallel surfaces the effective emissivity is 1/(1/0.84 + 1/0.05 - 1) = 0.0495, which is 5.9 percent of the bare-glass exchange: 596 W becomes 35. The lower face is perforated acoustic fabric at emissivity 0.9, so the liner radiates to the cabin at whatever temperature it actually is rather than storing heat, and the cavity between it and the glass crown is swept rather than left as an oven. That cavity is not one depth, and the panel says so because the shell serves five rungs with two different roofs: measured crown to shell it is 198 mm under body-6 and 86 to 107 mm under body-7, body-8 and body-9, whose canopy sits 88 mm lower and whose cage hangs full-width bows to y 1.270 under it. Two 48 mm ducts climb the A-pillars from the dash plenum and run aft to a C-pillar extract, moving about 40 m³/h a side at 6.1 m/s, enough to hold the cavity within 6 K of cabin air on the Gen 6 roof and within 9 K on the deeper Gen 5 one.\n\nWhere those ducts run is a cage decision, not a styling one, and it is the thing in this part that had to be redrawn twice, because it was first drawn against body-6 alone and body-7 puts the same structure somewhere else. Both cages block the obvious route inside the cavity along the rails: body-6\'s are 84 mm tubes on |z| 0.575 to 0.650 and body-7\'s are 64 mm tubes on |z| 0.468 to 0.532, so a 48 mm duct laid on either is inside it, and both close the cavity with full-width bows, body-6\'s at y 1.360 and 1.380 and body-7\'s at 1.270, 1.274 and 1.286. The third blocker is the one that was missed: both carry a cowl cross member across the dash end of the route, body-7\'s at y 0.846 to 0.894 over |z| 0.46 to 0.66 and body-6\'s at y 0.906 to 0.954, and the duct used to start at y 0.848 inside body-7\'s. It now leaves the dash inboard of both at |z| 0.400, tracks the A-pillars on their inboard side at |z| 0.44 to 0.52, rides under the liner in the rail shoulder at y 1.158 to 1.206, and feeds the cavity through three risers a side that pierce the liner itself. The liner is this module\'s part and the cage is not, which is the whole reason the hole goes there. The liner stops at x 0.35 and at |z| 0.44 for a reason that is checked rather than assumed: autonomy-4\'s camera wedge sits at (0.42, 1.31, 0) and its driver monitor at (0.40, 1.285, -0.30), both forward of the liner edge and both needing an unobstructed view aft and down. A roll-blind cassette bracketed to the aft roof rail at x -0.60 covers the backlight run behind the liner, where the glass falls away from the rails and no rigid ceiling can follow it.',
      why: 'This is the part that keeps a partner\'s good decision from becoming an occupant\'s bad afternoon. Electrochromic glazing is a genuine advance and it moves the heat rather than deleting it, so somebody has to own the inner surface, and the only module in the car that sits under it is this one. The gain is 561 W of radiant load removed from a cabin whose heat pump would otherwise have to find it, which at thermal-6\'s stated COP of about 3 in mild conditions is roughly 190 W off the compressor, or about 1 percent of the highway consumption budget, for eight kilograms that also carry the ceiling absorption the NVH package needs.',
      fail: [
        'A low-emissivity coating is a mirror in the infrared and a fingerprint magnet in the visible, and it faces a surface nobody will ever clean; dust settling on the upper face raises its emissivity over years, so the 35 W figure is an as-new number and the honest service note says the ceiling gap is inspected, not ignored.',
        'The rail ducts are the pilot line claim: nobody ships a ventilated ceiling cavity, and what has to become true is that 40 m³/h through a 58 mm gap stays silent across the full blower range and does not become a whistle at exactly the fan speed people use.',
        'Between the liner edge at |z| 0.44 and the glass edge there is a strip of canopy with nothing under it, above the door aperture, and it is wider than it was: the shell had to come inboard of body-7\'s rail at |z| 0.468 rather than body-6\'s at 0.575. Occupants sitting outboard still get a warm shoulder on a hot day, and the honest answer is that the cage rail lives there and a liner cannot.',
      ],
      explode: [0, 0.55, 0],
    },
    nvh: {
      name: 'NVH package',
      tagline: 'Four motors bolted inside the wheels put a 2.2 kHz tone into the structure, and no loudspeaker on earth can cancel it: this part absorbs where canceling is physically impossible.',
      mass: 8,
      specs: [
        ['Target tone', '2,241 Hz at 100 km/h, from 18 coils against 20 poles'],
        ['Scaling', 'Linear with speed: 1,120 Hz at 50, 2,690 at 120'],
        ['ANC band', '30 to 300 Hz only, and the panel says why'],
        ['Floor treatment', 'Butyl tiles bonded on battery-6\'s lid skin at y 0.302'],
        ['Floor debt', 'battery-6\'s carbon lid is 5 dB lighter-and-louder than Gen 3\'s'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The number this part is built around is derived from drivetrain-6\'s geometry rather than borrowed from its prose. Each rear corner is an outer-rotor machine with 18 coils and 20 poles, so the dominant radial force ripple repeats at the least common multiple of those two numbers, 180 times per wheel revolution. The wheel is 0.71 m in diameter, so it rolls 2.231 m per turn, and at 100 km/h it turns 12.45 times a second: 2,241 Hz, scaling linearly with road speed from 1,120 Hz in town to 2,690 on an unrestricted highway. There is also a 20th-order component at 249 Hz at the same speed. What makes this a cabin problem rather than a drivetrain one is the load path. In a conventional car the motor sits on a subframe on rubber, then the subframe sits on the body on more rubber, two isolation stages in series. drivetrain-6 bolts its machines to the wheels, so the force enters at the knuckle and reaches the body through the suspension links and their bushes, one stage, and there is no engine bay ahead of the cabin to absorb what leaks. suspension-4\'s hydraulic subframe mounts do good work below 100 Hz and are transparent at 2 kHz, which is the frequency that matters here.\n\nSo this package splits its budget by physics, not by taste. Active noise control gets the low band and only the low band. A cancellation zone holds about 10 dB out to roughly a tenth of a wavelength from the error microphone, and at 300 Hz a tenth of a wavelength is 114 mm, which a headrest microphone can cover for a moving head. At 2,241 Hz it is 15 mm, smaller than the distance between a driver\'s ear and their own shoulder, so an ANC system aimed there would cancel at a point in space nobody\'s ear occupies and amplify a few centimeters away. The 30 to 300 Hz band therefore gets four accelerometers on the rocker ends where suspension load enters the body, eight microphones, and transducers in the four headrests, which is where road roar and the 249 Hz order live. Everything above that is a materials problem, and the audit reads: 1.6 kg of butyl constrained-layer tile across 0.33 m² of floor, 3.6 kg of barrier and decoupler in the two rear wheelhouses, 1.2 kg in the headliner and pillars, most of it the perforated lower face of the canopy liner working a second job, 0.9 kg of ANC hardware and 0.7 kg of headrest transducers. The floor line in that audit is a debt this generation inherited rather than a treatment it chose. battery-6 replaced Gen 3\'s 21 kg aluminum floor-lid with 12 kg of carbon skins over aramid honeycomb, correctly, because bending stiffness is what a lid owes the torsion box and a sandwich buys it per kilogram. Airborne transmission loss is not bought that way: below the coincidence frequency a panel obeys the mass law, so halving surface density from 5.7 to 3.2 kg per square meter across 3.7 m² costs about 5 dB straight through the floor, and the pack under it is now a boiling vessel running at 49 to 68 °C rather than a quiet block. The tiles do not buy that 5 dB back, because damping addresses radiation from panel resonance rather than mass-law transmission; what they buy is the resonant ring, and they go where they physically can: bonded onto the lid skin at y 0.302 in the four bays battery-6\'s own hardware leaves between its top-hat stiffeners and its seat rails, sitting flush with the rail tops at 0.308 so nothing a seat bolts to is packed out, and raising the sandwich\'s loss factor from about 0.015 to 0.08. Naming the 5 dB rather than burying it is the point. The absorber is likewise placed by where the tone arrives rather than by where there is room, which is why the largest block sits inboard of the rear arch, strapped to the C-pillar and the rear casting, instead of in the trunk where it would be convenient.',
      why: 'Every desktop analysis that kills in-wheel drive cites unsprung mass first and cable fatigue second, and drivetrain-6 answers both by name on its own panels. The third objection, which those analyses rarely reach, is that the machine ends up inside the passenger compartment\'s acoustic near field with one isolation stage instead of two, and that objection cannot be answered by the drivetrain at all: 900 Nm from an annulus at 50 kPa of shear is the ragged edge of what the physics allows, so the ripple is not going to get smaller. It has to be answered here or not at all. Eight kilograms is what an honest answer costs, and the interior slot skipping four generations is precisely why nobody had budgeted it.',
      fail: [
        'ANC is a feedback system with a stability margin, so a failed microphone or a delaminated accelerometer mount is muted rather than trusted: the honest symptom is a car that gets 4 dB louder at 100 Hz with no warning light, because a noisy cabin is not a fault worth alarming about.',
        'Absorption is a volume game and the trunk and wheelhouses are the only volumes available, so a fully loaded car with luggage packed against the rear wheelhouse liners loses part of the treatment exactly on the long journeys it was bought for.',
        'The 2,241 Hz figure is a design-point tone from a single-speed calculation; in reality the four corners run at slightly different speeds through every corner and every torque-vectoring event, so the pure tone becomes a beating cluster a few tens of hertz wide, which is more annoying per decibel than a steady tone and is not something absorption alone flatters.',
      ],
      explode: [0, -0.35, 0],
    },
    restraints: {
      name: 'Belts and airbags',
      tagline: 'A nose with no engine in it has less stroke to give, so the restraints have to start earlier and know who is sitting there.',
      mass: 9,
      specs: [
        ['Ancestor', 'Split out of interior.js dashboard (7 kg) and seats (1.6 kg)'],
        ['Crush stroke', 'Foot x 1.39 to beam 2.27; only 0.23 m of it folds'],
        ['Load limiter', 'Adaptive, 2.0 to 4.5 kN, switching in 8 ms'],
        ['Far-side', 'Center bag on the driver seat inboard bolster'],
        ['Bags', 'Passenger 90 L, 2 knee, 2 thorax, 1 center, 2 curtain'],
        ['Maturity', 'Production practice; adaptive limiter switching is pilot line'],
      ],
      how: 'The geometry sets the problem, and it is the preset partner\'s geometry rather than Gen 1\'s. body-6 puts the bumper beam face at x 2.27, runs its bolted crash rails back to a flange at x 1.71, and fills x 1.55 to 2.07 with the front megacasting. This module\'s pedal box reaches x 1.387. So there is 0.88 m between the driver\'s foot and the bumper, and the rails\' own panel books only 230 mm of that as usable fold, at about 120 kN a rail, roughly 55 kJ for the pair. Everything else in the 0.88 m is a casting designed not to yield, a frunk and air. A car with a longitudinal engine spends part of its stroke crushing an engine and part of it stopping, and the engine is also a 200 kg mass whose deceleration shapes the pulse; this car has a frunk, a thermal stack and air. That reads like an advantage and mostly is, because there is no rigid block to punch through the toe board, but it has a consequence the restraint system pays: with less structure to tune and no large mass to decelerate, the pulse is shorter and squarer, which means more of the occupant\'s kinetic energy has to be taken by the belt and the bags instead of by the car. Restraint timing moves earlier, the knee bags fire to start the ride-down before the pelvis has moved, and the belt load limiter matters more than it ever did on a car with a meter of hood.\n\nThat limiter is the one genuinely new mechanism in this part. A fixed limiter is a compromise between a 50 kg occupant, whose ribs fail near 3 kN, and a 100 kg occupant who needs more than 4 kN to avoid reaching the bag with speed left over. This one switches: the seat pressure mat classifies occupant mass, the buckle pretensioner fires at 2.0 kN, and a pyrotechnic element raises the level to as much as 4.5 kN within 8 ms of the crash sensors resolving severity. The second addition is lateral. interior.js\'s cabin has a completely flat floor and no transmission tunnel, which is the skateboard dividend the rear bench panel celebrates, and the same flat floor means a far-side impact gives the front occupants an unobstructed path toward each other. That is exactly what the far-side test protocol punishes, so a center bag deploys from the driver seat\'s inboard bolster and fills the space the missing tunnel left. Scope is stated so nothing is double counted: this ledger carries the bags, their inflators and housings, the webbing, the buckle pretensioners and the adaptive limiters, 9 kg in total; the retractor reels and the B-pillar and floor anchorages are body structure and are on the body ledger, and the seat frames that react 4 kN of belt load through their tracks into battery-6\'s lid rails are counted in the seats.',
      why: 'interior.js buried a 90 liter airbag and a knee bag inside a part called Dashboard, which meant the heaviest safety hardware in the cabin was reviewed as trim and its mass was defended by a trim argument. Separating it is not bookkeeping: it is what lets this generation state the crush-stroke problem in the open and answer it with hardware rather than hoping the structure absorbs it. The premise helps here in a way it rarely does. Adaptive limiters and far-side bags are the hardware that disappears first whenever the argument is allowed to be about anything other than the occupant, and here it is not: the only admissible questions are how much stroke the structure gives, what shape the pulse comes in, and where the body goes when there is no tunnel to stop it.',
      fail: [
        'The pressure mat classifies mass, not anatomy, so an occupant sitting far forward or leaning against the door gets a limiter level chosen for a nominal posture; out-of-position occupants remain the residual risk that no restraint system has closed in forty years.',
        'The adaptive limiter is the pilot line item: switching a mechanical load level inside 8 ms with a pyrotechnic element means a one-shot device whose function cannot be verified in service, only inferred from a self-test on the firing circuit, and what has to become true is a field return rate on that element good enough to justify trusting an untestable mechanism.',
        'A center bag between the front seats is a bag that fires into the space where a passenger might be reaching across; the deployment is suppressed on any classification the mat cannot resolve, which means the far-side protection is the first thing lost to a dirty sensor.',
      ],
      explode: [0.15, 0.9, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   Packaging carried from interior.js: driver at z -0.38, dash between
   x 0.95 and 1.28, front seats at x 0.35, rear bench at x -0.75.

   Partner clearances that actually moved geometry in this module, all read
   from the partners' build code rather than their prose:
   - thermal-6 HVAC case ends at x 1.00 with duct stub top faces at y 0.86,
     z -0.10 and +0.12. The dash aft face is held at x >= 1.006 (6 mm clear)
     and the two plenum ducts land ON those top faces through clamped collars
     at y 0.852..0.876, which clears thermal-6's cabin filter (top y 0.85).
   - suspension-4 lane A is wider than its own panel implies: rack x 1.20..
     1.24, housing to x 1.25, ball nut x 1.174..1.266 over z -0.425..-0.335,
     motor x 1.263..1.337 over z -0.51..-0.37, cover to y 0.3875 and lane ECU
     to y 0.43. There is therefore no clear vertical path from the pedal box
     down to the floor at z -0.385, which is why the accelerator hinge hangs
     off the pedal box on a stay instead of standing on a floor pedestal.
     Every pedal element sits at y >= 0.4125 and |z| >= 0.3575 (P.driveF).
     The accelerator pad was also cut from 130 to 110 mm and re-pitched so
     its top corner stays clear of the front upper wishbone's inner pivot
     bush at (1.33, 0.55, -0.38), which the taller pad entered by 18 mm.
   - autonomy-4 triplex plate tops out at y 0.463 over x -0.76..-0.34; the
     bench pan steps to y 0.494 forward of x -0.76, clearing it by 31 mm.
   - hv-4 ring laminate occupies y 0.338..0.352 with longitudinal laminae at
     x 1.11 and -1.13; its tunnel HV run holds y 0.326..0.354 at z 0.05 under
     the cabin, and the thermal spur runs y 0.337..0.358 at z 0.10..0.18. The
     damping tiles sit outboard and below all of it at y 0.302..0.308, inside
     the lid bays at |z| 0.315..0.490 and clear of the three stiffener lines.
   - body-6 roof crown (glass, 8 mm proud of the loft) is y 1.453 at x 0.45
     and 1.460 at x -0.35; the liner hangs 58 mm under it between the cage
     roof rails at |z| 0.615, and stops at |z| 0.56 so the rails stay clear.
     The rail ducts run inboard of both the A-pillar tubes and the roof rails
     with at least 14 mm of surface clearance; routing them ON the rail axes,
     as the first cut did, buried a 52 mm duct inside a 84 mm cage tube.

   Nothing here is lib.shell(). */

/* ── Detail pass: what changed and what it is allowed to change ────────────
   design/crispness.md carries the shared vocabulary. Nothing below moves an
   engineering decision, a mass or a published clearance. Two defects were
   found by sweeping the built mesh rather than by reading the file, and both
   are fixed here:

   1. THE SEATS HAD NO SIDES. A lib.loft is a sheet with open boundary
      curves, so a seat drawn as a face skin plus a back shell has nothing at
      all down its flanks. A ray fired inboard through the driver's backrest
      at y 0.62 crossed exactly two surfaces, both of them the shell, and
      came out in the cabin: the posture cells were visible through the
      upholstery and the seat read as two parallel cards. seamStrip() closes
      every open boundary.
   2. FOUR AIR VENTS WERE INSIDE THE DASHBOARD. The vent bodies sat at
      x 1.037..1.087 and the dash aft skin at that height is x 1.009, so
      every one of them was 25 mm inside a solid molding, invisible from all
      six of the driver, passenger, rear and three exterior eye points. They
      are rebuilt as real bezeled grilles standing proud of the skin: bezel
      x 0.9955..1.0155, vanes x 0.9980..1.0140, thumbwheel back to x 0.9940.
      The four are at |z| 0.44 and 0.58 rather than 0.30 and 0.52, which is
      what keeps the bezels out of thermal-9's air handler and out of the
      hand wheel's own mounting tube; the vent block carries every
      measurement. The 37 mm this note used to claim against thermal-7 was
      the OLD vents' clearance carried onto the new ones, which had cut into
      the case: measure the geometry that is there now, not the geometry the
      number was taken from.

   Two rules govern everything added:

   - A SEAM IS A GROOVE, NEVER A BEAD. lib.loft's grooves only ever remove
     material, so no seam can grow a surface. Every closure point is a
     per-axis blend of two points this module already built, so no closure
     can leave the box those points already occupy. That matters because
     body-9's door clears the restraints by 0.27 mm and body-7/8/9's cage
     touches the canopy liner at 0.00.

     One clearance moved anyway, and the reason is worth keeping. "Inside
     the box the two curves occupy" is not the same as "inside geometry
     that already existed": the box between a cushion face and its pan was
     VOID, and closing it puts surface there. Swept at a matched 5 mm
     surface density over both files, front-seats to thermal-9's recovery
     core goes 27.65 mm to 12.57 mm, all of it the outboard cushion closure
     at (0.396, 0.480, -0.629). Still a clearance, still no contact, and
     the earlier 23.6 mm quoted here is superseded. A closure cannot grow
     an envelope and it can absolutely fill a gap, so measure the gaps.
   - INTERPOLATION STAYS LINEAR. Every clearance this module publishes was
     audited off the built surface, which is exactly the case design/
     crispness.md says must not be smoothed: clamped Catmull-Rom holds the
     envelope extremes but moves the surface between stations by centimeters.
     The crispness here is seams, closures, creases and hardware, not a
     rounder skin.

   Three things a cabin has that this one still does not, none of which a
   detail pass can add because each would be a new part carrying mass on a
   ledger that has to stay at 150 kg:

   - NO DOOR CARDS. The armrest, grab handle and speaker grille that would
     go on them have nowhere to attach, and body-6 through body-9 draw the
     door as outer skin only.
   - NO SILL TRIM, which is the one that has a partner waiting on it:
     thermal-9's rocker-shoulder extract at (0.010, 0.478, +/-0.678) declares
     an aperture through a sill trim this module does not draw, and says so
     on its own panel. That declaration is still open and this pass does not
     close it.
   - NO CABIN FLOOR. battery-6 and battery-7's lid IS the floor here by
     design, which is why every seat track, bench foot and console leg lands
     on it, but it means there is no heel pad and no seat-rail cover. */

/* Axis-aligned box with an optional z-rotation, placed in world coordinates. */
function abox(w, h, d, mat, x, y, z, rz = 0) {
  const b = lib.box(w, h, d, mat);
  b.position.set(x, y, z);
  if (rz) b.rotation.z = rz;
  return b;
}

/* The same call with all twelve edges chamfered: 44 triangles against 12,
   and it is most of the difference between a molding and a rectangle. */
function cbox(w, h, d, c, mat, x, y, z, rz = 0) {
  const b = lib.cbox(w, h, d, c, mat);
  b.position.set(x, y, z);
  if (rz) b.rotation.z = rz;
  return b;
}

/* Cylinder with its axis along Z. */
function zcyl(r, h, mat, seg = 16) {
  const c = lib.cyl(r, h, mat, seg);
  c.rotation.x = Math.PI / 2;
  return c;
}

/* Column k of every section: the boundary curve a loft leaves open. */
function edge(secs, k) { return secs.map((s) => s[k]); }

/* Close the open boundary between two lofted skins with a rolled seam.
   faceEdge and backEdge are matched polylines, one from each skin. Every
   intermediate point is a per-axis blend of the pair it spans, so the strip
   lies inside the box those two curves already occupy and cannot move an
   envelope.

   Only Z, the width axis of everything this closes, is held out near the
   face curve; X and Y both step across. Holding Y out as well looked right
   on a backrest, where the two skins are separated in x, and collapsed on a
   cushion, where they are separated by 115 mm of y and 5 mm of x: the two
   middle lines came out 2.2 mm apart at identical height and the strip
   folded, 4 pairs per closure at up to 175 degrees. Measured on the built
   mesh, not noticed by eye. */
function seamStrip(faceEdge, backEdge, mat, w1 = [0.70, 0.70, 0.94], w2 = [0.26, 0.26, 0.94]) {
  const mix = (a, b, w) => [
    a[0] * w[0] + b[0] * (1 - w[0]),
    a[1] * w[1] + b[1] * (1 - w[1]),
    a[2] * w[2] + b[2] * (1 - w[2]),
  ];
  const secs = faceEdge.map((a, i) => [a, mix(a, backEdge[i], w1), mix(a, backEdge[i], w2), backEdge[i]]);
  return lib.crease(lib.loft(secs, mat), 30);
}

/* Crease along GRID LINES ONLY, never across a quad diagonal.

   lib.crease is a pure angle test with no idea which grid line an edge lies
   on, and on an upholstered panel that is not good enough. A seam wall
   stands at about 69 degrees, but the bilinear patch inside the seam channel
   twists by up to 86, so every threshold that breaks the wall also breaks
   the diagonal and prints a bright triangle across the stitch. Measured on
   the backrest face: 24 diagonals break at every threshold from 26 to 55
   degrees, and they are exactly the flecks that showed on the seat.

   design/crispness.md makes this its own rule, "quad diagonals are never
   hard", and body-8 carries a creaseLines() for the same reason. This is the
   same six-slot fan union with the declared-line tables dropped, because on
   a trim panel every grid line is either a station or a seam wall and both
   are features worth breaking, whereas on body-8's aero surface a station
   line is a sampling artifact. Triangle cost: zero, same as lib.crease.

   Slots run round the fan at each vertex: 0 is quad(i-1,j-1) tri1, 1 is
   quad(i,j-1) tri0, 2 is quad(i,j-1) tri1, 3 is quad(i,j) tri0, 4 is
   quad(i-1,j) tri1, 5 is quad(i-1,j) tri0. Slots 0-1 and 3-4 meet on row
   line i, 2-3 and 5-0 on column line j, and 1-2 and 4-5 are the diagonals. */
function creaseGrid(mesh, R, C, deg) {
  const pos = mesh.geometry.attributes.position.array;
  const uv = mesh.geometry.attributes.uv.array;
  const QR = R - 1, QC = C - 1;
  const cosL = Math.cos((deg * Math.PI) / 180);
  const P = (i, j) => (i * C + j) * 3;

  const fn = new Float64Array(QR * QC * 6);
  const face = (o, a, b, c) => {
    const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
    const vx = pos[c] - pos[a], vy = pos[c + 1] - pos[a + 1], vz = pos[c + 2] - pos[a + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    fn[o] = nx / L; fn[o + 1] = ny / L; fn[o + 2] = nz / L;
  };
  for (let i = 0; i < QR; i++) {
    for (let j = 0; j < QC; j++) {
      const o = (i * QC + j) * 6;
      face(o, P(i, j), P(i + 1, j), P(i, j + 1));
      face(o + 3, P(i, j + 1), P(i + 1, j), P(i + 1, j + 1));
    }
  }
  const cosOf = (a, b) => fn[a] * fn[b] + fn[a + 1] * fn[b + 1] + fn[a + 2] * fn[b + 2];

  const vn = new Float64Array(R * C * 18);
  const slot = new Int32Array(6);
  const par = new Int32Array(6);
  const find = (x) => { while (par[x] !== x) x = par[x] = par[par[x]]; return x; };
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const q = (a, b, t) => (a >= 0 && a < QR && b >= 0 && b < QC ? (a * QC + b) * 6 + t * 3 : -1);
      slot[0] = q(i - 1, j - 1, 1); slot[1] = q(i, j - 1, 0); slot[2] = q(i, j - 1, 1);
      slot[3] = q(i, j, 0); slot[4] = q(i - 1, j, 1); slot[5] = q(i - 1, j, 0);
      for (let k = 0; k < 6; k++) par[k] = k;
      const join = (a, b, onLine) => {
        if (slot[a] < 0 || slot[b] < 0) return;
        if (onLine && cosOf(slot[a], slot[b]) < cosL) return;
        const ra = find(a), rb = find(b);
        if (ra !== rb) par[ra] = rb;
      };
      join(0, 1, true); join(1, 2, false); join(2, 3, true);
      join(3, 4, true); join(4, 5, false); join(5, 0, true);
      for (let k = 0; k < 6; k++) {
        if (slot[k] < 0) continue;
        let sx = 0, sy = 0, sz = 0;
        const rk = find(k);
        for (let l = 0; l < 6; l++) {
          if (slot[l] < 0 || find(l) !== rk) continue;
          sx += fn[slot[l]]; sy += fn[slot[l] + 1]; sz += fn[slot[l] + 2];
        }
        const L = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        const o = ((i * C + j) * 6 + k) * 3;
        vn[o] = sx / L; vn[o + 1] = sy / L; vn[o + 2] = sz / L;
      }
    }
  }

  const op = new Float32Array(QR * QC * 18), on = new Float32Array(QR * QC * 18);
  const ou = new Float32Array(QR * QC * 12);
  let w = 0, wu = 0;
  const put = (i, j, k) => {
    const p = P(i, j), o = ((i * C + j) * 6 + k) * 3, t = (i * C + j) * 2;
    op[w] = pos[p]; op[w + 1] = pos[p + 1]; op[w + 2] = pos[p + 2];
    on[w] = vn[o]; on[w + 1] = vn[o + 1]; on[w + 2] = vn[o + 2];
    ou[wu] = uv[t]; ou[wu + 1] = uv[t + 1];
    w += 3; wu += 2;
  };
  for (let i = 0; i < QR; i++) {
    for (let j = 0; j < QC; j++) {
      put(i, j, 3); put(i + 1, j, 5); put(i, j + 1, 1);
      put(i, j + 1, 2); put(i + 1, j, 4); put(i + 1, j + 1, 0);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(op, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(on, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(ou, 2));
  mesh.geometry = geo;
  return mesh;
}

/* An upholstered or molded panel. Seams are the whole point: a stitch line
   is a groove plus a crease, so the surface stops being one continuous skin
   and starts being panels sewn together. No subdivision, because linear
   interpolation makes a subdivided span identical to the span it replaced
   and only the grooves need lines of their own. */
function trim(sections, mat, grooves, deg = 45) {
  const grid = lib.loftGrid(sections, { interp: 'linear', grooves });
  return creaseGrid(lib.loftMesh(grid, mat, {}), grid.rows, grid.cols, deg);
}

/* A dash or door air vent: a bezel frame, four directional vanes standing in
   a real throat, and the thumbwheel that aims them. Built facing aft, which
   is the only direction anyone in this cabin looks at a vent from.

   crossZ IS NOT OPTIONAL HERE, and the reason is measured. lib.grille puts
   its cross family 0.75 of a bar depth BEHIND the front family by default,
   which is what gives an intake its depth when the panel is a hole in a
   solid. This fascia is not a hole: the dash trim is a continuous sheet and
   the bezel is let into it. At the default the four vanes came out at
   x 1.0075..1.0235 against a skin that runs x 1.0060 to 1.0144 across the
   vent's own height, so every vane sat forward of the fascia and a raster
   from the driver's eye returned 73 percent dash skin and 27 percent vane
   inside the aperture: a bezel with the molding showing through it. Setting
   crossZ to -0.0025 seats the family 2.5 mm behind the bezel's own aft face
   at x 0.9955 and puts the vanes at x 0.9980..1.0140. The fascia leans
   forward as it rises, so the open part of the throat grows with it: the
   bottom vane shows 8.0 mm of its 16 before the skin at x 1.0060 takes over
   and the top vane clears the skin at 1.0144 entirely. A vane that runs back
   into its duct is what a vane does; a vane wholly behind the fascia is a
   decal with a triangle budget. */
function vent(x, y, z) {
  const g = new THREE.Group();
  g.add(lib.grille(0.050, 0.024, 0.016, M.plasticLt, {
    bars: 0, cross: 4, barW: 0.0024, chamfer: 0.0006, frame: 0.0045,
    crossZ: -0.0025,
  }));
  const wheel = lib.cyl(0.0055, 0.010, M.darkSteel, 8);
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0.030, -0.017, 0.004);
  g.add(wheel);
  g.rotation.y = -Math.PI / 2;
  g.position.set(x, y, z);
  return g;
}

/* Seat belt webbing. interior.js drew a belt as a 24 mm round cable and this
   module carried it, which is the most obviously wrong object in the cabin:
   webbing is 46 mm wide and about 1.2 mm thick, and the flat face is the
   whole point of it. This sweeps a rectangular section down the same run,
   turning the width so the face lies on the body it restrains, and tapering
   toward each end the way a belt gathers into a tongue or a D-ring. `toward`
   is the axis the flat face turns away from.

   `toward` is read in plan by default, which is right for a run that stands
   up: a shoulder belt and a roof curtain both turn their face onto a body
   beside them. It is wrong for a run that LIES DOWN. With the y term
   dropped the face normal is always horizontal, so the width ends up in the
   vertical plane, and a lap belt drawn that way is a 46 mm fin standing on
   edge rather than a strap lying on a cushion. Pass flat to keep the y
   term, and the face turns onto whatever `toward` is under. */
function webbing(points, width, thick, mat, toward, taper = 0.6, flat = false) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const N = 12;
  const T = new THREE.Vector3(), W = new THREE.Vector3(), Nv = new THREE.Vector3();
  const secs = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const p = curve.getPoint(t);
    T.copy(curve.getTangent(t)).normalize();
    Nv.set(p.x - toward[0], flat ? p.y - toward[1] : 0, p.z - toward[2]);
    if (Nv.lengthSq() < 1e-9) Nv.set(1, 0, 0);
    Nv.normalize();
    W.crossVectors(T, Nv).normalize();
    Nv.crossVectors(W, T).normalize();
    /* a belt is narrowest where it is gathered, widest across the body */
    const g = taper + (1 - taper) * Math.sin(Math.PI * t);
    const hw = (width / 2) * g, ht = thick / 2;
    secs.push([
      [p.x + W.x * hw + Nv.x * ht, p.y + W.y * hw + Nv.y * ht, p.z + W.z * hw + Nv.z * ht],
      [p.x - W.x * hw + Nv.x * ht, p.y - W.y * hw + Nv.y * ht, p.z - W.z * hw + Nv.z * ht],
      [p.x - W.x * hw - Nv.x * ht, p.y - W.y * hw - Nv.y * ht, p.z - W.z * hw - Nv.z * ht],
      [p.x + W.x * hw - Nv.x * ht, p.y + W.y * hw - Nv.y * ht, p.z + W.z * hw - Nv.z * ht],
    ]);
  }
  return lib.crease(lib.loft(secs, mat, true), 40);
}

/* One cross-car section of a lofted trim surface: seven points across z at
   constant x, with the outer points dropped so the panel wraps. */
function row(x, y, hw, drop) {
  const f = [-1, -0.75, -0.4, 0, 0.4, 0.75, 1];
  const d = [1, 0.72, 0.28, 0, 0.28, 0.72, 1];
  return f.map((t, i) => [x, y - drop * d[i], t * hw]);
}

/* One row of a sculpted seat surface. wing pulls the outer points forward
   along +x (backrest bolsters), lift raises them along +y (cushion bolsters). */
function seatRow(ax, ay, hw, wing, lift, zc) {
  const f = [-1, -0.74, -0.34, 0, 0.34, 0.74, 1];
  const w = [1, 0.55, 0.08, 0, 0.08, 0.55, 1];
  return f.map((t, i) => [ax + wing * w[i], ay + lift * w[i], zc + t * hw]);
}

const SEAT_BACK = [
  [0.170, 0.545, 0.215, 0.085],
  [0.150, 0.640, 0.230, 0.095],
  [0.118, 0.760, 0.235, 0.090],
  [0.082, 0.880, 0.225, 0.070],
  [0.046, 0.990, 0.200, 0.045],
  [0.018, 1.075, 0.150, 0.020],
];
const SEAT_CUSHION = [
  [0.600, 0.520, 0.215, 0, 0.020],
  [0.540, 0.545, 0.240, 0, 0.045],
  [0.440, 0.552, 0.250, 0, 0.055],
  [0.330, 0.548, 0.250, 0, 0.055],
  [0.220, 0.542, 0.245, 0, 0.050],
  [0.130, 0.535, 0.230, 0, 0.040],
];
/* The top two stations are narrower than the ones below them because the
   greenhouse closes in over them: body-7's cage carries a rear hoop through
   y 0.99 to 1.09 at |z| 0.60, so a shoulder line held at 0.690 and 0.640
   passed through it. Below y 0.90 nothing is out there and the bench keeps
   its full width. */
const BENCH_BACK = [
  [-1.020, 0.560, 0.700, 0.030],
  [-1.048, 0.660, 0.715, 0.035],
  [-1.082, 0.780, 0.720, 0.035],
  [-1.120, 0.900, 0.700, 0.030],
  [-1.155, 1.000, 0.520, 0.020],
  [-1.180, 1.050, 0.480, 0.010],
];

/* ── Seam sets ─────────────────────────────────────────────────────────────
   Indices are fractional positions in each table's own point grid: a row
   index steps along the table, a column index across it. Widths and depths
   are meters, cut along the local surface normal, and a groove can only
   remove material. */

/* EVERY SEAM RUNNING ACROSS A PANEL CARRIES A SPAN, and the reason is
   measured rather than stylistic. A groove sinks along the local surface
   normal, and at the outer column of a cushion that normal is tilted by the
   bolster rising underneath it: the row-2 stitch on the front cushion came
   out 25 degrees off vertical there and pushed the panel's own edge 1.8 mm
   OUTBOARD, which is a seam growing an envelope. Stopping the run 20 mm
   short of the edge is both the fix and what a real lateral seam does,
   because it dies into the bolster rather than crossing it. */
const XSPAN = { span: [0.35, 5.65], runout: 0.30 };

/* Both cushion seams land on the |t| 0.34 column, which is the line the
   bolster already turns on, so the stitch sits where the section has its
   kink rather than across a flat. The panel BETWEEN them is the ventilated
   insert, and drawing its seams is how the insert gets drawn.

   THE PERFORATION ITSELF IS DELIBERATELY NOT GEOMETRY. A ventilated seat
   perforates at roughly a 4 mm hole on a 9 mm pitch, so the two front seats
   alone are about 2,400 holes: 9,600 triangles at the cheapest primitive
   that reads, which is a third of everything this pass spends, on a feature
   that is one pixel across in any exterior view and only resolves with the
   camera inside the cabin. Drawing it at a pitch coarse enough to read from
   outside would be drawing studding rather than perforation. The seams stay
   because a seam reads at every distance and is the thing that tells you
   where the perforated insert stops. */
const CUSHION_SEAMS = [
  { col: 2, width: 0.008, depth: 0.006 },
  { col: 4, width: 0.008, depth: 0.006 },
  { row: 2, width: 0.007, depth: 0.005, ...XSPAN },
];
const BACK_SEAMS = [
  { col: 2, width: 0.008, depth: 0.006 },
  { col: 4, width: 0.008, depth: 0.006 },
  { row: 2, width: 0.007, depth: 0.005, ...XSPAN },
  { row: 4, width: 0.007, depth: 0.005, ...XSPAN },
];

/* THE MAGNESIUM SHELLS GET RIBS, NOT POCKETS, and the reason is measured.
   A casting reads as a casting when narrow ribs stand between wide pockets,
   so the first cut sank 90 to 105 mm pockets into the shell with lib.loft's
   grooves. That surface came out flecked with bright triangles, and a
   dihedral sweep of the built grid found why: the shell's own column table
   is 6 by 7, about 70 mm per index, so a 90 mm groove puts its wall lines
   0.001 of an index from a base station line. The result is a sliver quad
   0.07 mm wide carrying a 5 mm depth step, whose two triangles face 179
   degrees apart. Sixteen of them on the backrest shell alone, and no crease
   threshold can fix a folded triangle. Subdividing does not help either,
   because the coincidence is between the groove line and the station line
   rather than between the groove and the sampling.

   A groove is the right tool when the panel has resolution to spare, which
   is why the seat FACES and the dash keep theirs: their seams are 5 to 8 mm,
   which is a tenth of an index and lands nowhere near a station. For a
   feature a tenth of the panel wide, a rib laid ON the surface is the honest
   answer, it follows the shell exactly because it is built from the shell's
   own grid, and it costs 30 triangles. */

/* Unit vector helpers for rib construction. */
function sub3(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function norm3(v) { const L = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / L, v[1] / L, v[2] / L]; }
function cross3(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function step3(p, u, a, v, b) {
  return [p[0] + u[0] * a + v[0] * b, p[1] + u[1] * a + v[1] * b, p[2] + u[2] * a + v[2] * b];
}
function transpose(secs) {
  return secs[0].map((_, j) => secs.map((s) => s[j]));
}

/* A cast rib standing proud of a lofted shell, built from the shell's own
   sections so it lies exactly on the surface. It runs along column k, is
   2w wide and stands h off the skin, and `ref` is the direction it must
   stand in so a mirrored panel does not sink its ribs into the foam. */
function rib(secs, k, w, h, ref, mat) {
  const R = secs.length, C = secs[0].length;
  const out = [];
  for (let r = 0; r < R; r++) {
    const p = secs[r][k];
    const lat = norm3(sub3(secs[r][Math.min(C - 1, k + 1)], secs[r][Math.max(0, k - 1)]));
    const tan = norm3(sub3(secs[Math.min(R - 1, r + 1)][k], secs[Math.max(0, r - 1)][k]));
    let n = norm3(cross3(tan, lat));
    if (n[0] * ref[0] + n[1] * ref[1] + n[2] * ref[2] < 0) n = [-n[0], -n[1], -n[2]];
    out.push([
      step3(p, lat, -w, n, 0),
      step3(p, lat, -w * 0.62, n, h),
      step3(p, lat, w * 0.62, n, h),
      step3(p, lat, w, n, 0),
    ]);
  }
  return lib.crease(lib.loft(out, mat), 34);
}

/* The 40/20/40 fold is a real line on a real bench and it was not drawn.
   The center section is 20 percent of a 1.44 m bench, so the splits sit at
   z +/-0.144, which on the BENCH_BACK column table is |t| 0.203 and lands
   between columns 2 and 3 and between 3 and 4. Deeper and wider than a
   stitch, because it is a gap between two separate backrests. */
const BENCH_BACK_SEAMS = [
  { col: 2.40, width: 0.008, depth: 0.010 },
  { col: 3.60, width: 0.008, depth: 0.010 },
  { row: 2, width: 0.007, depth: 0.005, ...XSPAN },
  { row: 4, width: 0.007, depth: 0.005, ...XSPAN },
];
const BENCH_CUSHION_SEAMS = [
  { col: 2.52, width: 0.008, depth: 0.006 },
  { col: 3.48, width: 0.008, depth: 0.006 },
  { row: 2, width: 0.007, depth: 0.005, ...XSPAN },
];

/* Dash parting lines. Two across the car, at the screen base where the
   defrost grille sits and at the bottom of the fascia, and four fore and aft:
   an end cap each side where the molding runs out to the door trim, and the
   pair that frames the center stack. */
const DASH_SEAMS = [
  { row: 2.0, width: 0.005, depth: 0.004, span: [0.30, 5.70], runout: 0.25 },
  { row: 6.2, width: 0.005, depth: 0.004, span: [0.30, 5.70], runout: 0.25 },
  { col: 0.7, width: 0.005, depth: 0.004 },
  { col: 5.3, width: 0.005, depth: 0.004 },
  { col: 2.3, width: 0.005, depth: 0.004 },
  { col: 3.7, width: 0.005, depth: 0.004 },
];

/* A headrest post is a height adjuster, so it carries the ratchet notches
   the latch drops into. [radius, y] pairs revolved about Y. */
const POST = [
  [0.0080, 0.000], [0.0080, 0.020], [0.0056, 0.023], [0.0080, 0.026],
  [0.0080, 0.048], [0.0056, 0.051], [0.0080, 0.054], [0.0080, 0.100],
];

/* Recliner housing: a round case, a proud hub and a real bolt circle. It is
   the one piece of seat hardware the row behind actually looks at, and it
   was a plain 70 mm cylinder. `face` is the z direction it points. */
function recliner(x, y, z, face) {
  const g = new THREE.Group();
  g.add(lib.cyl(0.036, 0.048, M.castAlu, 18));
  g.add(lib.cyl(0.019, 0.058, M.darkSteel, 12));
  const bolts = lib.bolts(5, 0.026, 0.0045, M.steel);
  bolts.position.y = 0.024;
  g.add(bolts);
  g.rotation.x = face > 0 ? Math.PI / 2 : -Math.PI / 2;
  g.position.set(x, y, z);
  return g;
}

/* Headrest: a chamfered core, a separate front pad with a real shadow gap
   between the two, and notched posts. */
function headrest(x, y, z, w, h, d, rz) {
  const g = new THREE.Group();
  g.add(cbox(w, h, d, 0.014, M.fabric, x, y, z, rz));
  g.add(cbox(w * 0.34, h * 0.80, d * 0.86, 0.010, M.fabric,
    x + Math.cos(rz) * w * 0.50, y + Math.sin(rz) * w * 0.50, z, rz));
  return g;
}

/* A cross-car section of the canopy liner, with the return the loft never
   had. A headliner does not stop at a knife line where it meets the glass:
   it turns down and back on itself, and that return is what gives a ceiling
   a lit edge instead of a paper one. Both added points go down and inboard,
   away from the cage rails the liner already touches. */
function linerRow(x, y, hw, drop) {
  const r = row(x, y, hw, drop);
  const a = r[0], b = r[6];
  return [
    [a[0], a[1] - 0.023, a[2] + 0.011], [a[0], a[1] - 0.014, a[2]],
    ...r,
    [b[0], b[1] - 0.014, b[2]], [b[0], b[1] - 0.023, b[2] - 0.011],
  ];
}

export function build() {
  const sys = new THREE.Group();

  /* ── dashboard: magnesium cross-car beam with its bonded carbon shear web,
     two struts landing on the cage cowl beam at (0.85, 0.93, ±0.72), the
     lofted trim surface, the full-width vent slot, and the two plenum ducts
     that land on thermal-6's HVAC stub faces ── */
  const dash = lib.part('dashboard', [0.55, 0.35, 0]);
  const beam = zcyl(0.042, 1.44, M.castAlu, 20);
  beam.position.set(1.08, 0.815, 0);
  dash.add(beam);
  dash.add(cbox(0.055, 0.05, 1.40, 0.008, M.carbon, 1.046, 0.775, 0));
  for (const s of [-1, 1]) {
    dash.add(lib.tube([
      [1.062, 0.815, s * 0.700],
      [0.972, 0.874, s * 0.708],
      [0.888, 0.926, s * 0.713],
    ], 0.016, M.alu));
    /* cast boss where the cowl strut lands on the beam */
    dash.add(cbox(0.05, 0.06, 0.05, 0.007, M.castAlu, 1.068, 0.815, s * 0.685));
  }
  /* THE LOWER HALF OF THIS SECTION IS NARROWER THAN THE TOP PAD, and the
     number that sets it is the front fairing's inner wall rather than a
     styling line. Ray-swept at x 1.15, body-7's fairing carries a wall at
     |z| 0.700 from y 0.335 to 0.735, and body-9's is in the same place. The
     old table ran 0.716 to 0.734 across exactly that y band, so the dash
     ends were 40.87 mm inside the fairing on Gen 6 to Gen 8 and 50.13 mm on
     Gen 9. Above y 0.79 the fairing wall has fallen away and the pad keeps
     its full 0.750. */
  const dashSkin = [
    row(1.278, 0.690, 0.540, 0.012),
    row(1.258, 0.782, 0.600, 0.016),
    row(1.205, 0.840, 0.716, 0.020),
    row(1.125, 0.868, 0.750, 0.022),
    row(1.055, 0.866, 0.750, 0.022),
    row(1.018, 0.845, 0.736, 0.021),
    row(1.006, 0.800, 0.676, 0.019),
    row(1.010, 0.726, 0.616, 0.016),
    row(1.042, 0.688, 0.596, 0.012),
  ];
  dash.add(trim(dashSkin, M.carbon, DASH_SEAMS, 40));
  /* the molding's own end return, so the dash stops with an edge rather
     than a cut sheet where it runs out to the door trim. Down and inboard,
     which is away from body-6's A-pillar at 1.11 mm */
  for (const k of [0, 6]) {
    const e = edge(dashSkin, k), s = k === 0 ? 1 : -1;
    dash.add(lib.crease(lib.loft(e.map((p) => [
      [p[0], p[1], p[2]],
      [p[0] - 0.004, p[1] - 0.010, p[2] + s * 0.002],
      [p[0] - 0.008, p[1] - 0.016, p[2] + s * 0.009],
    ]), M.carbon), 30));
  }
  /* full-width sheet-flow slot under the aft edge, with the lip that turns
     it into a shadow line rather than a painted stripe */
  dash.add(abox(0.012, 0.014, 1.46, M.sensor, 1.023, 0.842, 0));
  dash.add(cbox(0.016, 0.008, 1.46, 0.003, M.plasticLt, 1.028, 0.853, 0));
  /* Vents. They used to sit at x 1.037..1.087, which is 25 mm INSIDE the
     aft skin at x 1.009, so all four were invisible from every eye point in
     the car. Rebuilt as bezeled grilles whose bezel occupies x 0.9955..
     1.0155 and whose vanes occupy x 0.9980..1.0140, at y 0.806, below the
     center display's lower edge at 0.827. The whole assembly including the
     thumbwheel spans x 0.9940..1.0155, and that figure is stated because
     the first cut of this pass published the bezel's extent as the vent's
     and left 704 triangles of vane 8.5 mm forward of it, inside the skin.

     Both pairs sit in the outer third, at |z| 0.44 and 0.58, and every one
     of those numbers is a partner keeping this vent out of somewhere.

     Inboard of |z| 0.39 is gone. interior-6's dash trim starts at x 1.006
     and thermal-6, -7 and -9 all park their case AFT of that, so the middle
     of this fascia has a heat exchanger standing in front of it: thermal-9's
     air handler reaches x 0.9996 at (y 0.806, z 0.30), 9.5 mm aft of the
     skin, and its recovery core runs out to z 0.3779. A vent at |z| 0.30
     crossed the handler in 116 triangle pairs and a raster over the bezel
     footprint from the near seat returned 35 percent vent. At |z| 0.44 the
     bezel spans z 0.4105..0.4695 and clears the recovery core by 32.6 mm
     and the built cases by 43 mm or better on all three generations, with
     zero crossing triangles.

     |z| 0.42 is gone too, and this one is inside the module: the hand
     wheel's mounting tube runs to x 1.0667 at z -0.3960..-0.3640, so a
     bezel reaching z -0.3905 clipped it in 73 pairs. 0.44 clears it by
     14.5 mm.

     The outboard pair moves 0.52 to 0.58 only to keep the two bezels 81 mm
     apart instead of 21. Both stations cross nothing but the dash skin they
     are let into, and that crossing is what "let into" means. */
  for (const vz of [-0.58, -0.44, 0.44, 0.58]) dash.add(vent(1.0035, 0.806, vz));
  for (const [sz, dz] of [[-0.10, -0.20], [0.12, 0.20]]) {
    /* Collar clamped over thermal's stub top face at y 0.860: the joint is
       made above the case, not down its flank, because the cabin filter
       already fills the flank of the driver-side stub to y 0.85. All three
       thermal variants put that stub in the same place, x 0.855 to 0.925,
       y 0.820 to 0.860, |z| 0.04 to 0.16 and 0.06 to 0.18, measured off
       thermal-6, thermal-7 and thermal-9's built meshes and identical to the
       micron on all three, so one collar serves gen5 to gen10.

       IT IS 44 MM LONG AND NOT 56, AND THE 12 MM CAME OFF THE FRONT.
       thermal-9 grew a screen-base slot nozzle across the cowl at x 0.905 to
       0.951, y 0.856 to 0.876, and a 56 mm collar centered at x 0.890 reached
       x 0.918, so its front 13 mm was inside that nozzle: 28 crossing
       triangle pairs at a straddle depth of 13.79 mm, the deepest thing in
       the whole dashboard-to-thermal pair on Gen 9. The free part of the stub
       top is x 0.855 to 0.905, 50 mm of it, and a 44 mm collar centered at
       0.879 lands inside that with 2.0 mm to the stub's aft face and 4.0 mm
       to the nozzle. Clamp engagement over the stub is unchanged at 8 mm. */
    dash.add(cbox(0.044, 0.024, 0.056, 0.005, M.plastic, 0.879, 0.864, sz));
    /* the clamp screw, which is what makes it a joint rather than a lump. A
       band round the outside of a square collar reads as a lens on a pod;
       the screw reads as hardware and costs a quarter as much. */
    const clamp = lib.fastener(0.0062, M.steel, 'hex');
    clamp.rotation.z = Math.PI / 2;
    clamp.position.set(0.862, 0.864, sz);
    dash.add(clamp);
    /* The run dips under body-7's cowl tube, which is a closed 48 mm section
       at x 0.966..1.014, y 0.8461..0.8939, running the full width of the car.
       The old route held y 0.844..0.870 straight through it. A duct goes
       below a cowl beam, so this one is at y 0.818 where it crosses and
       climbs back to the vent line aft of it.

       AND AT 36 MM ROUND IT CANNOT ACTUALLY MAKE THAT CROSSING, WHICH IS AN
       OPEN DEFECT ON BOTH SIDES OF THIS JOINT. The corridor was swept as the
       intersection of the free volume over five thermal-and-body pairings,
       thermal-6 with body-6 and body-7, thermal-7 with body-7 and body-8, and
       thermal-9 with body-9, at both duct stations. It is the same on all
       five and the same on both sides of the car: between the thermal case
       top at y 0.8200 and the cowl beam underside the free height is 30.7 mm
       at x 0.970, 26.1 at 0.980 and 22.0 at 0.990, opening to 66.1 at 1.000
       where the case ends. A 36 mm tube does not pass a 22 mm window, so this
       duct is drawn through whichever of the two it meets first: 6.45 mm into
       thermal-9\'s case top plate over 70 crossing triangle pairs, 5.29 into
       its case rib, 6.69 into its screen-base slot nozzle and 7.67 into that
       nozzle\'s lip, and the equivalent on thermal-6 and thermal-7 at 6.03 and
       5.76 mm. thermal-9\'s panel reports the same numbers from its side.

       The fix is a flattened section through the cowl, 18 mm tall by about
       78 mm wide, which fits the 22 mm pinch with 2.0 mm each side and
       carries MORE area than the 36 mm round does. It is not drawn here
       because it is a redraw of the plenum rather than a waypoint move: the
       duct also has to get down to that height past the stub collar at
       y 0.876 and the nozzle at 0.856 to 0.882, and the only clear vertical
       shaft between them is the 140 mm column at x 0.960. Measured and handed
       over rather than nudged. */
    dash.add(lib.tube([
      [0.890, 0.870, sz],
      [0.940, 0.858, sz + (dz - sz) * 0.35],
      [0.975, 0.820, sz + (dz - sz) * 0.75],
      [1.008, 0.816, dz],
    ], 0.018, M.plasticLt));
  }
  sys.add(dash);

  /* ── displays: 15 in center panel raised so its lower edge clears
     body-7's cowl tube, the carried cluster strip on the top pad ahead of
     the driver, and the 1.44 m handover band on the dash lip ──

     THE PANEL'S HEIGHT IS SET BY THE CAGE, NOT BY THE HVAC CASE. It was
     placed to clear thermal-6's case top at y 0.82 and its lower edge sat at
     0.827, which cleared the case and put 67 mm of screen inside body-7's
     cowl tube: 37.66 mm over 176 crossing triangle pairs on Gen 6 to Gen 9,
     with the mounting stalk in the same tube. The tube is a closed section
     at x 0.966..1.014, y 0.8461..0.8939, full width, and it is frozen
     structure. The panel lifts 75 mm so its lower edge is 0.902 and the
     stalk moves aft to x 1.0205, clear of the tube's rear face. */
  const disp = lib.part('displays', [0.62, 0.6, 0]);
  /* A screen is a bezel with a display plane behind it, and the bezel is
     what a softbox finds: 72 triangles for the whole HMI was the least
     detailed thing in the car and the thing a viewer looks straight at.
     lib.badge extrudes a frame with a real beveled rim in one mesh. */
  const bezel = (w, h, rim, depth, mat) => {
    const ow = w / 2, oh = h / 2, iw = ow - rim, ih = oh - rim;
    const b = lib.badge(
      [[-ow, -oh], [ow, -oh], [ow, oh], [-ow, oh]], depth, mat,
      { holes: [[[-iw, -ih], [iw, -ih], [iw, ih], [-iw, ih]]], bevel: depth * 0.3 });
    b.rotation.y = -Math.PI / 2;   /* local +Z becomes world -X: faces the cabin */
    return b;
  };
  const center = new THREE.Group();
  center.add(lib.cbox(0.020, 0.165, 0.368, 0.004, M.plastic));
  const cFace = lib.box(0.004, 0.148, 0.349, M.sensor);
  cFace.position.x = -0.0110;
  center.add(cFace);
  /* the bezel sits ON the case face and the glass 4 mm behind its rim, which
     is the whole reason a screen has an edge to catch light */
  const cBez = bezel(0.368, 0.165, 0.0095, 0.007, M.plastic);
  cBez.position.x = -0.0100;
  center.add(cBez);
  center.position.set(0.998, 0.990, 0.03);
  center.rotation.set(0, -0.16, -0.10);
  disp.add(center);
  disp.add(cbox(0.075, 0.120, 0.09, 0.008, M.plasticLt, 1.055, 0.930, 0.03));
  const strip = new THREE.Group();
  strip.add(lib.cbox(0.018, 0.062, 0.320, 0.004, M.plastic));
  const sFace = lib.box(0.004, 0.046, 0.300, M.sensor);
  sFace.position.x = -0.0100;
  strip.add(sFace);
  const sBez = bezel(0.320, 0.062, 0.008, 0.006, M.plastic);
  sBez.position.x = -0.0090;
  strip.add(sBez);
  /* the cowl: a cluster this shallow is unreadable in low sun without one,
     and it is the lip the handover band's own argument depends on */
  const cowl = lib.cbox(0.048, 0.007, 0.330, 0.003, M.plastic);
  cowl.position.set(-0.010, 0.040, 0);
  cowl.rotation.z = 0.22;
  strip.add(cowl);
  /* seated ON the top pad: the loft surface is y 0.857 at (1.058, -0.38) and
     the tilted strip's lower corner lands at 0.857 */
  strip.position.set(1.058, 0.889, -0.38);
  strip.rotation.z = -0.28;
  disp.add(strip);
  /* 1.44 m handover band: the lens, and the trim lip it hides under. The lip
     is the reason the band survives the low sun the center panel loses to,
     so it is drawn rather than asserted. */
  disp.add(cbox(0.014, 0.020, 1.440, 0.004, M.lamp, 1.028, 0.856, 0));
  disp.add(cbox(0.018, 0.007, 1.446, 0.003, M.plasticLt, 1.031, 0.869, 0));
  sys.add(disp);

  /* ── wheel: the interior.js rim geometry carried, on a direct-drive feel
     unit and a triple sensor ring. The assembly ends at the sensor ring:
     nothing continues forward, and suspension-4 draws nothing either. The
     single bracket lands inside the dash beam (axis 1.08, 0.815, r 0.042) ── */
  const wheelP = lib.part('wheel', [0.45, 0.15, 0]);
  const tilt = new THREE.Group();
  const rim = new THREE.Group();
  const rimTop = lib.mesh(new THREE.TorusGeometry(0.185, 0.017, 10, 40, 4.189), M.rubber);
  rimTop.geometry.rotateZ(-0.524);
  rim.add(rimTop);
  const rimBot = lib.mesh(new THREE.TorusGeometry(0.42, 0.017, 10, 24, 0.781), M.rubber);
  rimBot.geometry.rotateZ(-1.962);
  rimBot.geometry.translate(0, 0.296, 0);
  rim.add(rimBot);
  /* hub cover: a stepped lathe section with a real emblem on it, rather than
     a plain 104 mm disc. The badge rim is the point, because a decal has no
     edge for a softbox to find. */
  const hub = lib.lathe([[0, 0.020], [0.030, 0.020], [0.036, 0.016],
    [0.050, 0.014], [0.052, 0.008], [0.052, -0.024], [0.046, -0.026]], M.plastic, 20);
  hub.rotation.x = Math.PI / 2;
  rim.add(hub);
  const mark = lib.badge([[-0.020, -0.005], [-0.008, -0.005], [-0.008, 0.005], [-0.020, 0.005]],
    0.0022, M.alu, { bevel: 0.0006 });
  mark.position.z = 0.020;
  rim.add(mark);
  const mark2 = lib.badge([[0.002, -0.005], [0.020, -0.005], [0.020, 0.005], [0.002, 0.005]],
    0.0022, M.alu, { bevel: 0.0006 });
  mark2.position.z = 0.020;
  rim.add(mark2);
  /* spokes: chamfered carbon, with the switch clusters a by-wire car puts
     under the thumbs. Keys have travel and a chamfer, so the cluster reads
     as switchgear rather than as a printed rectangle. */
  rim.add(lib.cbox(0.34, 0.042, 0.024, 0.005, M.carbon));
  for (const sx of [-1, 1]) {
    const pad = lib.cbox(0.070, 0.034, 0.020, 0.004, M.plastic);
    pad.position.set(sx * 0.108, 0.004, 0.014);
    rim.add(pad);
    for (const k of [-1, 0, 1]) {
      const key = lib.cbox(0.017, 0.011, 0.007, 0.0018, M.plasticLt);
      key.position.set(sx * 0.108 + k * 0.021, 0.004, 0.026);
      rim.add(key);
    }
  }
  const lowSpoke = lib.cbox(0.04, 0.115, 0.022, 0.005, M.carbon);
  lowSpoke.position.y = -0.072;
  rim.add(lowSpoke);
  /* direct-drive feel motor on the rim axis, then the triple sensor ring,
     then nothing: no column, no shaft, no firewall penetration */
  const feel = lib.cyl(0.062, 0.098, M.darkSteel, 20);
  feel.rotation.x = Math.PI / 2;
  feel.position.z = -0.075;
  rim.add(feel);
  const feelFin = lib.fins(0.118, 0.008, 0.09, 6, 0.004, M.alu);
  feelFin.rotation.x = Math.PI / 2;
  feelFin.position.z = -0.075;
  rim.add(feelFin);
  /* the machine ends in a bolted flange and a connector, because a motor
     that mounts to nothing reads as a floating cylinder */
  const flange = lib.cyl(0.070, 0.008, M.castAlu, 20);
  flange.rotation.x = Math.PI / 2;
  flange.position.z = -0.028;
  rim.add(flange);
  const fBolts = lib.bolts(6, 0.066, 0.0042, M.steel);
  fBolts.rotation.x = -Math.PI / 2;
  fBolts.position.z = -0.024;
  rim.add(fBolts);
  const plug = lib.cbox(0.026, 0.018, 0.022, 0.003, M.plastic);
  plug.position.set(0, -0.070, -0.062);
  rim.add(plug);
  const sensRing = lib.cyl(0.048, 0.026, M.sensor, 20);
  sensRing.rotation.x = Math.PI / 2;
  sensRing.position.z = -0.137;
  rim.add(sensRing);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const ch = lib.box(0.028, 0.022, 0.016, M.pcb);
    ch.position.set(Math.cos(a) * 0.048, Math.sin(a) * 0.048, -0.152);
    rim.add(ch);
  }
  rim.rotation.y = -Math.PI / 2;
  tilt.add(rim);
  tilt.rotation.z = -0.35;
  tilt.position.set(0.695, 0.775, -0.38);
  wheelP.add(tilt);
  wheelP.add(lib.tube([
    [0.795, 0.745, -0.38],
    [0.910, 0.768, -0.38],
    [1.010, 0.790, -0.38],
    [1.062, 0.806, -0.38],
  ], 0.016, M.castAlu));
  sys.add(wheelP);

  /* ── front seats: magnesium pan and backrest frame, foam on top, posture
     cells up the lumbar line, tracks on visible pedestals down to battery-6's
     lid seat rails (y 0.301..0.308) at z ±0.28 and ±0.52, let 2 mm into them.
     Built once per side; all meshes are z-symmetric ── */
  for (const s of [-1, 1]) {
    const zc = 0.38 * s;
    const seat = lib.part('front-seats', [0, 0.4, 0.28 * s]);
    for (const tz of [0.28 * s, 0.52 * s]) {
      /* the rail is a channel section with a slider carriage riding in it,
         not a bar: two chamfered members inside the same 20 by 30 envelope */
      seat.add(cbox(0.52, 0.012, 0.030, 0.003, M.steel, 0.35, 0.368, tz));
      seat.add(cbox(0.30, 0.011, 0.022, 0.003, M.alu, 0.35, 0.3775, tz));
      for (const ex of [0.10, 0.60]) {
        seat.add(cbox(0.018, 0.018, 0.028, 0.003, M.steel, ex, 0.372, tz));
      }
      for (const lx of [0.14, 0.56]) {
        seat.add(cbox(0.045, 0.056, 0.045, 0.006, M.castAlu, lx, 0.334, tz));
      }
    }
    const pan = lib.plate(0.48, 0.46, 0.020, 0.04, M.castAlu);
    pan.position.set(0.35, 0.430, zc);
    seat.add(pan);

    /* Cushion and backrest, each as a face skin over a magnesium shell.
       Both skins carry their seams and both open boundaries get closed:
       until now a ray fired inboard through this backrest at y 0.62 crossed
       the shell twice and nothing else, and the posture cells showed
       through the gap where a side panel should be. */
    const cushionFace = SEAT_CUSHION.map((r) => seatRow(r[0], r[1], r[2], r[3], r[4], zc));
    const cushionPan = SEAT_CUSHION.map((r) => seatRow(r[0] - 0.005, r[1] - 0.115, r[2] * 0.94, 0, 0, zc));
    const backFace = SEAT_BACK.map((r) => seatRow(r[0], r[1], r[2], r[3], 0, zc));
    const backShell = SEAT_BACK.map((r) => seatRow(r[0] - 0.058, r[1], r[2] * 0.96, r[3] * 0.8, 0, zc));

    seat.add(trim(cushionFace, M.fabric, CUSHION_SEAMS));
    seat.add(lib.loft(cushionPan, M.castAlu));
    seat.add(trim(backFace, M.fabric, BACK_SEAMS));
    /* the shells get no crease call: swept as face dihedrals their sharpest
       grid edge is 17.2 degrees, so any threshold worth using is dormant on
       them, and the edges they need are the ribs */
    seat.add(lib.loft(backShell, M.castAlu));
    /* three vertical ribs and two lateral ones, standing 5 mm off the back
       of the shell where a magnesium backrest actually carries its bending */
    for (const k of [1, 3, 5]) seat.add(rib(backShell, k, 0.014, 0.005, [-1, 0, 0], M.castAlu));
    for (const r of [1, 3]) seat.add(rib(transpose(backShell), r, 0.013, 0.004, [-1, 0, 0], M.castAlu));
    for (const k of [0, 6]) {
      seat.add(seamStrip(edge(cushionFace, k), edge(cushionPan, k), M.fabric));
      seat.add(seamStrip(edge(backFace, k), edge(backShell, k), M.fabric));
    }
    /* and the top of the backrest, which was open straight down into the
       foam under the headrest */
    seat.add(seamStrip(backFace[5], backShell[5], M.fabric));

    const nose = zcyl(0.045, 0.42, M.fabric, 16);
    nose.position.set(0.605, 0.495, zc);
    seat.add(nose);
    for (const ro of [-0.21, 0.21]) seat.add(recliner(0.145, 0.505, zc + ro, ro));
    for (const [cy, cx, cd] of [[0.62, 0.148, 0.24], [0.74, 0.118, 0.28], [0.88, 0.082, 0.28], [1.00, 0.046, 0.22]]) {
      seat.add(abox(0.026, 0.050, cd, M.plasticLt, cx - 0.020, cy, zc));
    }
    seat.add(headrest(-0.020, 1.185, zc, 0.095, 0.125, 0.235, 0.30));
    for (const po of [-0.06, 0.06]) {
      const post = lib.lathe(POST, M.steel, 8);
      post.rotation.z = 0.30;
      post.position.set(0.008 + Math.sin(0.30) * 0.05, 1.108 - Math.cos(0.30) * 0.05, zc + po);
      seat.add(post);
    }
    sys.add(seat);
  }

  /* ── rear bench: the stepped magnesium pan is the whole story. Aft section
     at y 0.440..0.454, riser at x -0.752, front shelf at y 0.480..0.494,
     which clears autonomy-4's triplex plate (top y 0.463) by 31 mm ── */
  const bench = lib.part('rear-bench', [-0.25, 0.45, 0]);
  bench.add(cbox(0.265, 0.014, 1.44, 0.004, M.castAlu, -0.8975, 0.447, 0));
  bench.add(cbox(0.016, 0.054, 1.44, 0.004, M.castAlu, -0.757, 0.481, 0));
  bench.add(cbox(0.270, 0.014, 1.44, 0.004, M.castAlu, -0.610, 0.501, 0));
  /* the pan is a 14 mm magnesium section, so it needs ribs across the riser
     where the step turns the bending moment, and it needs them at the fold
     lines and outboard of the compute it steps over */
  for (const rz2 of [-0.62, -0.30, 0, 0.30, 0.62]) {
    bench.add(cbox(0.170, 0.026, 0.014, 0.003, M.castAlu, -0.752, 0.468, rz2));
  }
  /* four aft feet land in battery-6's rear pads (x -0.85..-0.75, y 0.301
     ..0.308) and are let 3 mm into them; the two forward legs land on its
     x -0.5 top-hat stiffener (x -0.525..-0.475, y 0.296..0.303), the only
     pack hardware under this station */
  for (const fz of [-0.52, -0.28, 0.28, 0.52]) {
    bench.add(cbox(0.045, 0.136, 0.045, 0.006, M.castAlu, -0.800, 0.373, fz));
  }
  for (const lz of [-0.42, 0.42]) {
    bench.add(cbox(0.040, 0.200, 0.040, 0.005, M.castAlu, -0.500, 0.398, lz));
  }
  const benchCushion = [
    row(-1.030, 0.548, 0.735, 0.024),
    row(-0.900, 0.558, 0.745, 0.026),
    row(-0.780, 0.566, 0.748, 0.026),
    row(-0.700, 0.578, 0.748, 0.026),
    row(-0.600, 0.584, 0.745, 0.026),
    row(-0.505, 0.572, 0.735, 0.024),
  ];
  const benchFace = BENCH_BACK.map((r) => seatRow(r[0], r[1], r[2], r[3], 0, 0));
  const benchShell = BENCH_BACK.map((r) => seatRow(r[0] - 0.052, r[1], r[2] * 0.97, r[3] * 0.7, 0, 0));
  bench.add(trim(benchCushion, M.fabric, BENCH_CUSHION_SEAMS));
  bench.add(cbox(0.030, 0.090, 1.46, 0.006, M.tan, -0.492, 0.530, 0));
  bench.add(trim(benchFace, M.fabric, BENCH_BACK_SEAMS));
  bench.add(lib.loft(benchShell, M.castAlu));
  for (const k of [1, 2, 3, 4, 5]) bench.add(rib(benchShell, k, 0.014, 0.005, [-1, 0, 0], M.castAlu));
  for (const r of [1, 3]) bench.add(rib(transpose(benchShell), r, 0.013, 0.004, [-1, 0, 0], M.castAlu));
  for (const k of [0, 6]) bench.add(seamStrip(edge(benchFace, k), edge(benchShell, k), M.fabric));
  bench.add(seamStrip(benchFace[5], benchShell[5], M.fabric));
  bench.add(cbox(0.075, 0.035, 1.00, 0.008, M.tan, -1.176, 1.030, 0, 0.32));
  /* THE REAR POSTS STAY PLAIN, and it is measured rather than lazy. On the
     front seats the notched POST profile is worth its 112 triangles because
     the backrest tops out at y 1.0750 and the headrest starts at 1.1154, so
     40.4 mm of post stands in the open. Back here the top rail and the
     headrest overlap in y and there is no exposed segment at all: a ray from
     every one of twenty eye points is stopped by this part's own trim, and
     the six notched posts were 672 triangles that nothing could ever see.

     THE SHOULDER LINE IS SET BY THE LOWEST ROOF, AND THE CLEARANCE THIS
     COMMENT USED TO PUBLISH WAS BACKWARD. It said the outboard headrest
     pair had 20.0 mm to body-6's canopy glass. Swept surface to surface it
     was 48.31 mm INSIDE it over 50 crossing triangle pairs, and inside
     body-7's canopy by 29.98, body-7's cage by 27.95 and body-9's tail cone
     by 15.77. A vertical sweep from (-1.212, 1.175) cannot find that,
     because the roof falls away outboard faster than it falls aft: at
     x -1.27 body-6's crown is y 1.2025 at |z| 0.30 but 1.1377 at |z| 0.54,
     and the headrest cores reached |z| 0.595 at y 1.1809.

     The three ceilings over this station, ray-swept at x -1.27:

       body-6 canopy    1.2025 (|z| 0.30), 1.1784 (0.48), 1.1377 (0.54)
       body-7 canopy    1.2646 (|z| 0.30), 1.2464 (0.48), 1.1647 (0.54)
       body-9 tail cone 1.2568 (|z| 0.30), 1.2456 (0.48), 1.1861 (0.54)

     body-6 is the binding one on every rung it appears, which is why the
     pair moved rather than the roof. The outboard headrests come inboard
     from |z| 0.48 to 0.40 and down 30 mm, the cores narrow 230 to 210 mm,
     and the top rail loses 160 mm of span so its ends stop inboard of the
     Gen 6 cage's rear hoop, which stands at y 0.99..1.09 over |z| 0.60. */
  for (const hz of [-0.40, 0, 0.40]) {
    bench.add(headrest(-1.212, 1.085, hz, 0.090, 0.110, 0.210, 0.30));
    for (const po of [-0.050, 0.050]) {
      const post = lib.cyl(0.007, 0.09, M.steel, 8);
      post.rotation.z = 0.30;
      post.position.set(-1.187, 1.010, hz + po);
      bench.add(post);
    }
  }
  for (const iz of [-0.34, -0.28, 0.28, 0.34]) {
    const bar = lib.cyl(0.006, 0.05, M.steel, 8);
    bar.rotation.x = Math.PI / 2;
    bar.position.set(-1.020, 0.512, iz);
    bench.add(bar);
    /* ISOFIX bars are restraint anchors, so they carry down to the pan
       rather than sitting loose in the cushion crease */
    bench.add(cbox(0.030, 0.072, 0.020, 0.004, M.steel, -1.020, 0.477, iz));
  }
  /* the molded guide funnel that makes an ISOFIX bar findable without
     looking, one per pair, let into the cushion-to-backrest crease */
  for (const gz of [-0.31, 0.31]) {
    bench.add(cbox(0.044, 0.036, 0.104, 0.010, M.plastic, -1.014, 0.534, gz, -0.28));
  }
  sys.add(bench);

  /* ── console: foam-core tub on two visible feet down to the cabin floor,
     armrest, cupholders, inductive pads ── */
  const cons = lib.part('console', [0.15, 0.6, 0]);
  /* the tub, its parting line, and the plinth it stands on. A sandwich tub
     is two moldings bonded at a flange, and that flange is the one line on
     this part that tells you it is a made object rather than a block.
     The plinth goes UNDER the tub. Drawn at y 0.469 it spanned 0.460..0.478
     against a tub floor at 0.460, so all 44 triangles of it were inside the
     tub and it was the one thing on this part nobody could ever see. At
     y 0.451 it spans 0.442..0.460, which is where a plinth is.

     It stops at x 0.635 rather than running the tub's full 0.315..0.755,
     and that end is a partner's. wheels-6, -7 and -9 all run a master-unit
     line diagonally under this console: swept off the built mesh it crosses
     the tub itself in 32 triangle pairs over x 0.6908..0.7848, y 0.4439..
     0.4942, and it would have taken 32 more off a full-length plinth over
     x 0.6514..0.7399. Ending at 0.635 clears the line by 16.4 mm and adds
     no crossing anywhere. The tub's own overlap with that line is older
     than this pass and is not mine to move. */
  cons.add(cbox(0.470, 0.160, 0.220, 0.012, M.carbon, 0.535, 0.540, 0));
  cons.add(cbox(0.474, 0.010, 0.226, 0.003, M.plasticLt, 0.535, 0.520, 0));
  cons.add(cbox(0.320, 0.018, 0.196, 0.005, M.plastic, 0.475, 0.451, 0));
  for (const s of [-1, 1]) {
    cons.add(lib.tube([
      [0.380, 0.462, s * 0.100],
      [0.390, 0.395, s * 0.190],
      [0.400, 0.312, s * 0.280],
    ], 0.014, M.castAlu));
    cons.add(lib.tube([
      [0.700, 0.462, s * 0.100],
      [0.680, 0.395, s * 0.190],
      [0.660, 0.312, s * 0.280],
    ], 0.014, M.castAlu));
  }
  /* the armrest is the bin lid and the highest-cycle part in the cabin, so
     it gets the section a padded lid has: a chamfered core, a center stitch
     line, and the slide rail it runs on showing under its aft end */
  cons.add(cbox(0.240, 0.045, 0.200, 0.010, M.tan, 0.400, 0.6425, 0));
  cons.add(cbox(0.242, 0.008, 0.014, 0.003, M.plastic, 0.400, 0.6635, 0));
  /* the slide rails. One rail on the centerline at y 0.6145 spanned
     0.6085..0.6205 under a tub whose top face is 0.620, so it was buried in
     the tub with 0.5 mm showing. A lid that slides runs on two rails, and
     the armrest is 200 mm across a 220 mm tub, so the 10 mm of tub top
     either side of it is exactly where they go and where they are seen. */
  for (const rz of [-0.1015, 0.1015]) {
    cons.add(cbox(0.150, 0.014, 0.014, 0.003, M.alu, 0.400, 0.6265, rz));
  }
  for (const cz of [-0.058, 0.058]) {
    /* a real well: a rim, a wall and a floor, in place of a solid puck */
    const cup = lib.lathe([[0.042, 0.030], [0.042, 0.026], [0.037, 0.022],
      [0.037, 0.002], [0.034, 0.000], [0, 0.000]], M.plasticLt, 18);
    cup.position.set(0.705, 0.617, cz);
    cons.add(cup);
  }
  for (const pz of [-0.060, 0.060]) {
    /* the pad recess, framed rather than laid on: a beveled surround with
       the coil plate sunk 4 mm behind it. Both sit ON the tub top face at
       y 0.620. Seated at 0.6135 the surround stood 0.5 mm out of a 7 mm
       extrusion and the coil plate was 1.5 mm under the molding, which
       replaced a pad that had been 6 mm proud and visible before this pass:
       a recess is only a recess if its frame is above the surface. */
    const surround = lib.badge(
      [[-0.052, -0.041], [0.052, -0.041], [0.052, 0.041], [-0.052, 0.041]], 0.007, M.plasticLt,
      { holes: [[[-0.045, -0.035], [0.045, -0.035], [0.045, 0.035], [-0.045, 0.035]]], bevel: 0.002 });
    surround.rotation.x = -Math.PI / 2;   /* local +Z becomes world +Y */
    surround.position.set(0.585, 0.6200, pz);
    cons.add(surround);
    cons.add(abox(0.086, 0.004, 0.066, M.plastic, 0.585, 0.6230, pz));
  }
  sys.add(cons);

  /* ── pedals: brake pad and arm, two parallel simulator elements, organ
     accelerator. Every element sits above suspension-4's steering lane A
     (top y 0.43 at the ECU) and at |z| >= 0.3575 to clear P.driveF ── */
  const ped = lib.part('pedals', [0.35, -0.18, 0]);
  /* A pedal pad is a ribbed rubber face on a metal carrier, and the ribs are
     the only part of this car a driver touches with a shoe. Built as a real
     lattice on a chamfered carrier inside the same 16 mm envelope. */
  const pad = (w, h, x, y, z, rz) => {
    const g = new THREE.Group();
    g.add(lib.cbox(0.008, h, w, 0.002, M.darkSteel));
    const ribs = lib.grille(w, h, 0.008, M.rubber, { bars: 0, cross: 6, barW: 0.009, crossZ: 0 });
    ribs.rotation.y = -Math.PI / 2;
    ribs.position.x = -0.008;
    g.add(ribs);
    g.position.set(x, y, z);
    g.rotation.z = rz;
    return g;
  };
  ped.add(pad(0.090, 0.100, 1.245, 0.500, -0.44, -0.40));
  const bArm = lib.cyl(0.010, 0.16, M.steel, 10);
  bArm.rotation.z = -0.54;
  bArm.position.set(1.305, 0.600, -0.44);
  ped.add(bArm);
  for (const sz of [-0.470, -0.415]) {
    /* each simulator element is a ribbed housing with a rod eye, so the two
       parallel elements read as two devices rather than two blocks */
    ped.add(cbox(0.055, 0.052, 0.040, 0.006, M.plastic, 1.355, 0.661, sz));
    for (const rx of [-0.016, 0, 0.016]) {
      ped.add(cbox(0.006, 0.056, 0.044, 0.0015, M.plasticLt, 1.355 + rx, 0.661, sz));
    }
    const rodEnd = lib.cyl(0.008, 0.035, M.steel, 8);
    rodEnd.rotation.z = Math.PI / 2;
    rodEnd.position.set(1.322, 0.660, sz);
    ped.add(rodEnd);
  }
  /* accelerator: 110 mm pad on a hinge box carried by a stay off the pedal
     box, not by a floor pedestal. suspension-4's rack, ball nut and lane
     motor fill x 1.174..1.337 at this z, so there is no vertical path down
     to the pack lid; the pad is also pitched so its top corner clears the
     front upper wishbone inner pivot bush at (1.33, 0.55, -0.38) */
  ped.add(pad(0.055, 0.110, 1.278, 0.470, -0.385, -0.50));
  ped.add(cbox(0.040, 0.025, 0.050, 0.005, M.plastic, 1.255, 0.425, -0.385));
  ped.add(lib.tube([
    [1.332, 0.688, -0.378],
    [1.290, 0.562, -0.380],
    [1.266, 0.435, -0.382],
  ], 0.010, M.steel));
  for (const nz of [-0.490, -0.440, -0.390]) {
    ped.add(cbox(0.028, 0.028, 0.028, 0.004, M.sensor, 1.330, 0.628, nz));
  }
  ped.add(lib.tube([
    [1.360, 0.690, -0.440],
    [1.240, 0.752, -0.440],
    [1.108, 0.806, -0.440],
  ], 0.014, M.steel));
  /* the pedal box is a casting: chamfered, with the two ribs that carry the
     hinge loads into the beam stay and the fasteners that hold it there */
  ped.add(cbox(0.070, 0.030, 0.140, 0.006, M.steel, 1.352, 0.700, -0.440));
  for (const bz of [-0.490, -0.390]) {
    ped.add(cbox(0.058, 0.030, 0.008, 0.002, M.steel, 1.352, 0.684, bz));
    const f = lib.fastener(0.0055, M.steel, 'hex');
    f.position.set(1.352, 0.715, bz);
    ped.add(f);
  }
  sys.add(ped);

  /* ── canopy liner: low-emissivity shell hung under the roof structure
     between the cage roof rails, three clips per side landing on the rails,
     the two rail ducts climbing the A-pillars from the dash, and the rear
     roll-blind cassette bracketed to the aft roof rail ──

     THIS SHELL IS HUNG OFF THE LOWEST ROOF ON THE LADDER, NOT OFF body-6'S,
     and that is the correction the cross-module sweep forced. It was drawn
     against body-6 alone and the same module runs under body-7, body-8 and
     body-9 as well, whose roof is a different structure in a different
     place. Ray-swept at the liner's own stations:

       body-6 canopy crown   y 1.4467 to 1.4587, rails |z| 0.575..0.650
       body-7/8/9 canopy     y 1.3455 to 1.3676, rails |z| 0.468..0.532
       body-7/8/9 cage bows  undersides y 1.2700 (x 0.30), 1.2740 (x -0.10)
                             and 1.2855 (x -0.50), full width

     So the Gen 6 roof is 88 mm lower than the Gen 5 one, its rails are 85 mm
     further inboard, and three full-width bows hang another 70 to 100 mm
     below its glass. The shell at y 1.396..1.401 was 30 to 36 mm THROUGH the
     Gen 6 glass and 126 mm through the bows, over 676 crossing triangle
     pairs, and it also put 0.072 m2 of headliner outside the roof in
     tools/area.sh's union, which design/area-rezero.md records as a defect
     rather than as frontal area. Everything here now hangs from the bow
     undersides: shell crown y 1.256..1.261, which is 9 to 14 mm under the
     lowest bow and 185 to 198 mm under body-6's crown. The cavity is
     therefore NOT one depth any more, and the panel says both. */
  const lin = lib.part('canopy-liner', [0, 0.55, 0]);
  lin.add(lib.crease(lib.loft([
    linerRow(0.350, 1.256, 0.440, 0.018),
    linerRow(0.100, 1.258, 0.440, 0.018),
    linerRow(-0.200, 1.261, 0.440, 0.018),
    linerRow(-0.400, 1.252, 0.438, 0.018),
    linerRow(-0.550, 1.209, 0.434, 0.016),
  ], M.fabric), 30));
  for (const s of [-1, 1]) {
    /* the clips reach UP to the Gen 6 cage rail, which is the rail that is
       actually over them: |z| 0.468..0.532, underside y 1.271. At |z| 0.598
       they were outboard of it and 112 mm above it. Top face 1.266, so they
       stop 5 mm short of the rail rather than entering it. */
    for (const cx of [0.250, -0.100, -0.450]) {
      lin.add(cbox(0.040, 0.030, 0.090, 0.005, M.alu, cx, 1.251, s * 0.470));
    }
    /* 48 mm rail duct. Three structural facts set this route, and two of
       them are Gen 6's rather than Gen 5's. The cowl cross member is the
       one that used to be missed: body-7's runs y 0.846..0.894 across
       |z| 0.46..0.66 at x 1.00 and body-6's runs y 0.906..0.954 across
       |z| 0.46..0.70 at x 0.88, so the old dash end at (1.050, 0.848) was
       inside body-7's by 13 mm. The duct now leaves the dash INBOARD of
       both, at |z| 0.400, and only swings outboard once it is above them.
       On the climb it tracks the A-pillars from the inboard side: body-7's
       pillar tube runs |z| 0.54 to 0.66 as it falls from y 1.22 to 0.92 and
       body-6's runs |z| 0.62 to 0.74, so a route at |z| 0.47..0.52 is
       inboard of both. It then rides UNDER the liner in the rail shoulder
       at y 1.158..1.206 and feeds the cavity through risers that pierce the
       liner instead. */
    lin.add(lib.tube([
      [1.045, 0.905, s * 0.400],
      [0.980, 0.960, s * 0.430],
      [0.890, 1.010, s * 0.460],
      [0.750, 1.062, s * 0.478],
      [0.600, 1.108, s * 0.492],
      [0.480, 1.158, s * 0.440],
      [0.420, 1.188, s * 0.404],
      [0.350, 1.198, s * 0.390],
      [-0.300, 1.198, s * 0.390],
      [-0.560, 1.176, s * 0.396],
      [-0.600, 1.140, s * 0.410],
    ], 0.024, M.plasticLt));
    for (const rx of [0.220, -0.100, -0.420]) {
      const riser = lib.cyl(0.014, 0.090, M.plasticLt, 12);
      riser.position.set(rx, 1.220, s * 0.390);
      lin.add(riser);
      /* the bezel where the riser pierces the shell: a hole in a molding
         has a lip, and this is the only place the ceiling is cut. It goes on
         the CABIN face at y 1.234, not on top, so the ring hangs below the
         shell rather than standing up into the bow above it. */
      const eye = lib.torus(0.017, 0.003, M.plasticLt, 12, 6);
      eye.rotation.x = Math.PI / 2;
      eye.position.set(rx, 1.234, s * 0.390);
      lin.add(eye);
    }
    for (const oz of [0.150, -0.250]) {
      lin.add(cbox(0.060, 0.016, 0.040, 0.004, M.sensor, oz, 1.236, s * 0.360));
      /* the lamp's surround hangs UNDER the lamp and keeps the lamp's own
         40 mm width. A first cut put it above and 10 mm wider, and body-6's
         A-pillar is already touching the liner at that station. */
      lin.add(cbox(0.070, 0.006, 0.040, 0.002, M.plasticLt, oz, 1.225, s * 0.360));
    }
    lin.add(cbox(0.050, 0.030, 0.060, 0.006, M.alu, -0.600, 1.220, s * 0.470));
  }
  /* the blind cassette gets its end caps and its pull rail: a bare tube is
     a tube, and this one has to read as a cartridge with a blind in it */
  const cassette = zcyl(0.032, 0.88, M.plasticLt, 18);
  cassette.position.set(-0.600, 1.212, 0);
  lin.add(cassette);
  for (const ez of [-0.445, 0.445]) {
    lin.add(cbox(0.076, 0.076, 0.014, 0.008, M.plastic, -0.600, 1.212, ez));
  }
  lin.add(cbox(0.020, 0.012, 0.84, 0.004, M.alu, -0.628, 1.187, 0));
  /* the blind run aft. It sheds less height than the shell does because the
     roof it follows sheds less: body-7's canopy is 1.3411 at x -0.80 and
     1.3218 at x -1.05, so the drop tapers from 140 mm at the cassette to
     60 mm at the backlight rather than staying parallel to the shell. */
  lin.add(lib.crease(lib.loft([
    linerRow(-0.640, 1.193, 0.436, 0.016),
    linerRow(-0.800, 1.183, 0.432, 0.016),
    linerRow(-0.950, 1.171, 0.424, 0.016),
    linerRow(-1.050, 1.164, 0.412, 0.014),
  ], M.plastic), 30));
  sys.add(lin);

  /* ── NVH: constrained-layer tiles on the pack lid inside the window hv-4's
     ring leaves free, rear wheelhouse absorbers strapped to the C-pillar and
     the rear casting boss, rail absorption, and the low-band ANC set ── */
  const nvh = lib.part('nvh', [0, -0.35, 0]);
  /* lib.plate spans pos.y + t/2 to pos.y + 3t/2, so 0.299 puts the tile on
     battery-6's lid skin at 0.302 and flush with its rail tops at 0.308 */
  /* A constrained-layer tile is a viscoelastic sheet under a stiff foil, and
     it is the foil that makes it work: the butyl only dissipates because the
     constraining layer forces it to shear. Drawn as the two layers it is,
     inside the same 6 mm the single slab occupied, so the stack still ends
     flush with battery-6's rail tops at 0.308. */
  for (const [tx, tw] of [[0.405, 0.51], [-0.750, 0.42]]) {
    for (const tz of [-0.4025, 0.4025]) {
      const tile = lib.plate(tw, 0.175, 0.0048, 0.03, M.plastic);
      tile.position.set(tx, 0.2996, tz);
      nvh.add(tile);
      const foil = lib.plate(tw - 0.014, 0.161, 0.0012, 0.024, M.alu);
      foil.position.set(tx, 0.3062, tz);
      nvh.add(foil);
    }
  }
  for (const s of [-1, 1]) {
    /* wheelhouse block held outboard of suspension-4's rear damper body
       (x -1.582..-1.556, z 0.554..0.614) and its top mount (z to 0.602).
       A molded absorber is stepped where the wheelhouse changes section,
       not a slab, and the steps are cut inboard so nothing moves outboard.

       IT IS ALSO HELD INBOARD, WHICH IT WAS NOT. The wheelhouse is a
       three-sided gap and only the damper side of it had ever been swept.
       Ray-swept at this station the rear tire's inner sidewall stands at
       |z| 0.663 on wheels-7 and 0.665 on wheels-9, and body-7's cage carries
       a C-pillar tube through |z| 0.63..0.67 at y 0.917..0.972. The block at
       |z| 0.615..0.665 was 8.60 mm inside the tire over 96 crossing pairs
       and 14.16 mm inside the cage over 164. It now runs |z| 0.616..0.652,
       11 mm off the tire, and its 300 mm height stops at y 0.910, 7 mm
       under the cage tube, so the two no longer share a station at all. */
    nvh.add(cbox(0.300, 0.300, 0.036, 0.010, M.fabric, -1.430, 0.760, s * 0.634));
    for (const [ax2, ah] of [[-1.330, 0.220], [-1.530, 0.170]]) {
      nvh.add(cbox(0.090, ah, 0.030, 0.008, M.fabric, ax2, 0.760, s * 0.628));
    }
    /* the strap over the wheelhouse crown stays inboard of the cage tube
       (inner face |z| 0.630), of body-6's C-pillar (|z| 0.650) and of
       body-8's tail cone, whose panel is at y 1.048 at |z| 0.620 */
    nvh.add(lib.tube([
      [-1.400, 0.900, s * 0.605],
      [-1.420, 0.945, s * 0.608],
      [-1.440, 0.985, s * 0.610],
    ], 0.008, M.alu));
    /* strap to body-6's rear casting boss, taken high enough to clear
       hv-4's V2G enclosure on the passenger side (top y 0.645) */
    nvh.add(lib.tube([
      [-1.500, 0.672, s * 0.645],
      [-1.552, 0.700, s * 0.626],
      [-1.606, 0.716, s * 0.600],
    ], 0.008, M.alu));
    /* rail absorber bonded to the liner shoulder, inboard of the rail duct
       and of both cage rails (body-6's inner surface |z| 0.575, body-7's
       |z| 0.468). It rides with the liner, so it came down 140 mm with it. */
    nvh.add(cbox(0.900, 0.030, 0.055, 0.008, M.fabric, -0.100, 1.232, s * 0.370));
    /* the rocker accelerometers sit on the INNER face of the rocker beam,
       which is at |z| 0.850 on every body on this shard. At |z| 0.845 the
       22 mm cube was 7.00 mm inside the beam on all five rungs. */
    for (const ax of [0.950, -0.950]) {
      nvh.add(cbox(0.022, 0.022, 0.022, 0.004, M.sensor, ax, 0.400, s * 0.825));
    }
    /* eight error microphones, four a side, each let into the liner shell.
       A microphone is a grille over a can, and at 20 mm the grille is what
       distinguishes it from a stud. */
    for (const [mx, my] of [[0.300, 1.240], [0.050, 1.242], [-0.200, 1.244], [-0.450, 1.222]]) {
      nvh.add(cbox(0.020, 0.014, 0.020, 0.003, M.sensor, mx, my, s * 0.355));
      const port = lib.grille(0.016, 0.016, 0.004, M.darkSteel, { bars: 3, barW: 0.0022 });
      port.rotation.x = Math.PI / 2;
      port.position.set(mx, my - 0.008, s * 0.355);
      nvh.add(port);
    }
    /* transducers in all four outboard headrests, front pair and rear pair */
    for (const to of [-0.075, 0.075]) {
      nvh.add(cbox(0.030, 0.030, 0.030, 0.005, M.darkSteel, -0.030, 1.180, s * 0.38 + to));
    }
    for (const to of [-0.055, 0.055]) {
      nvh.add(cbox(0.030, 0.030, 0.030, 0.005, M.darkSteel, -1.212, 1.085, s * 0.40 + to));
    }
  }
  nvh.add(cbox(0.140, 0.030, 0.055, 0.005, M.pcb, 0.350, 0.395, 0.280));
  sys.add(nvh);

  /* ── restraints: passenger and knee bags in the dash, thorax bags on the
     outboard seat frames, the far-side bag on the driver seat's inboard
     bolster, curtains packed along the roof rails and down the C-pillars,
     and the belts running from the B-pillar anchors to the buckles ── */
  const res = lib.part('restraints', [0.15, 0.9, 0]);
  /* An airbag housing is a can with a door on it, and the door is defined by
     its tear seam: the H the molding is scored along so it opens where it
     was designed to and nowhere else. Drawn as two chamfered leaves with the
     seam between them, which is what the seam actually looks like. */
  res.add(cbox(0.160, 0.060, 0.300, 0.008, M.plastic, 1.100, 0.825, 0.420));
  for (const lz of [-1, 1]) {
    res.add(cbox(0.014, 0.056, 0.142, 0.004, M.plasticLt, 1.026, 0.825, 0.420 + lz * 0.076));
  }
  const infl = zcyl(0.022, 0.16, M.steel, 14);
  infl.position.set(1.130, 0.790, 0.420);
  res.add(infl);
  for (const s of [-1, 1]) {
    res.add(cbox(0.100, 0.050, 0.220, 0.008, M.plastic, 1.058, 0.690, s * 0.400));
    res.add(cbox(0.050, 0.300, 0.040, 0.006, M.plastic, 0.075, 0.830, s * 0.595, 0.26));
    /* Curtain, packed. A rolled curtain in a rail channel is a flat bundle,
       not a 48 mm rod, so the section is 48 mm deep and 26 mm across. The
       depth is held at the round tube's own diameter rather than widened,
       because this run already stands outside body-8's roof loft by 98 mm at
       (x -1.15, y 1.212) and the last thing it may do is climb; the 26 mm
       across pulls it 11 mm inboard, which is the only direction available
       to improve a disagreement an interior generation owes. */
    res.add(webbing([
      [0.580, 1.305, s * 0.626],
      [0.200, 1.322, s * 0.620],
      [-0.300, 1.325, s * 0.618],
      [-0.700, 1.278, s * 0.636],
      [-1.100, 1.192, s * 0.658],
      [-1.320, 1.132, s * 0.670],
    ], 0.048, 0.026, M.plastic, [-0.40, 0, 0], 0.9));
    /* the D-ring: a real slotted plate with a hole through it, in place of a
       50 by 70 block. lib.badge extrudes the plate and the slot together. */
    const dring = lib.badge(
      [[-0.024, -0.034], [0.024, -0.034], [0.024, 0.034], [-0.024, 0.034]], 0.010, M.darkSteel,
      { holes: [[[-0.016, -0.007], [0.016, -0.007], [0.016, 0.007], [-0.016, 0.007]]], bevel: 0.0025 });
    dring.position.set(0.020, 1.050, s > 0 ? 0.873 : -0.873);
    if (s > 0) dring.rotation.y = Math.PI;
    res.add(dring);
    res.add(cbox(0.050, 0.090, 0.035, 0.006, M.castAlu, 0.020, 0.960, s * 0.868));
    /* Shoulder webbing. 46 mm wide and 1.2 mm thick, gathered toward the
       D-ring and the tongue, with the flat face turned onto the torso. It
       was a 24 mm round cable, which is the single most obviously wrong
       object in the cabin and the one body-9's door clears by 0.27 mm. */
    res.add(webbing([
      [0.030, 1.035, s * 0.845],
      [0.110, 0.980, s * 0.730],
      [0.220, 0.880, s * 0.600],
      [0.300, 0.700, s * 0.400],
      [0.340, 0.540, s * 0.235],
    ], 0.046, 0.0012, M.plastic, [0.30, 0, s * 0.38], 0.62));
    /* and the lap run, which was missing entirely: out of the tongue and
       away across the cushion to the outboard anchor, where a real one
       goes. It LIES ON the cushion. Drawn at y 0.498..0.522 it ran 50 to
       80 mm under the face skin, which puts 192 triangles inside the foam:
       invisible from all twenty eye points and the wrong shape as well,
       because webbing() with a plan-only reference stands the strap on
       edge. The face here is a measured 6 mm over the cushion section at
       each station, and the reference is under the belt rather than beside
       it, so the flat face is up. */
    res.add(webbing([
      [0.348, 0.578, s * 0.222],
      [0.338, 0.556, s * 0.360],
      [0.330, 0.568, s * 0.500],
      [0.326, 0.590, s * 0.575],
    ], 0.046, 0.0012, M.plastic, [0.33, -1.0, s * 0.38], 0.80, true));
    /* buckle stalk: a chamfered body with the release button on it */
    res.add(cbox(0.050, 0.100, 0.030, 0.006, M.darkSteel, 0.345, 0.515, s * 0.215));
    res.add(cbox(0.024, 0.010, 0.020, 0.003, M.caliper, 0.345, 0.567, s * 0.215));
    const pre = lib.cyl(0.018, 0.070, M.steel, 12);
    pre.position.set(0.362, 0.462, s * 0.215);
    res.add(pre);
    /* the pyrotechnic pretensioner's own initiator plug */
    res.add(cbox(0.018, 0.014, 0.016, 0.003, M.plasticLt, 0.362, 0.432, s * 0.215));
  }
  res.add(cbox(0.050, 0.260, 0.040, 0.006, M.plastic, 0.075, 0.860, -0.175, 0.26));
  for (const bz of [-0.440, 0, 0.440]) {
    res.add(cbox(0.040, 0.090, 0.030, 0.005, M.darkSteel, -0.530, 0.555, bz));
    res.add(cbox(0.020, 0.010, 0.022, 0.003, M.caliper, -0.530, 0.602, bz));
  }
  sys.add(res);

  return sys;
}
