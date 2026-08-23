/* Gen 4 body: the active monoform. Gen 3 made the body one surface; Gen 4
   is the control generation, so the surface learns to move. The body-3 loft
   is carried VERBATIM, station for station, including the flat roof band
   that wraps the safety-cage rails at ~1.44-1.45 out to z +-0.66 (codified
   in design/retro-gen3.md, not re-learned here). The delta is four actuated
   elements, every one of them fed from hv-4's 48 V zonal bus by name: a
   continuously scheduled Kamm flap (drawn mid-map), steering-coordinated
   front arch louvers (drawn partly open), a fast shutter array in the
   returning lower intake, and ride-height-coordinated underbody strakes
   partnered to suspension-4's air springs.

   Preset partners named and reconciled: hv-4 (four corner zonal
   controllers, 96 eFuse channels each, 1 kHz per-circuit telemetry; the
   aero drives ride ordinary fused channels, deliberately NOT the by-wire
   feed pair), suspension-4 (air springs, -20 to +25 mm leveling held to
   +/-3 mm, 40 mm on all corners in ~6 s, 20 mm drop above 110 km/h),
   autonomy-4 (flash lidar behind the front light band, camera pods on the
   doors, the forward camera wedge that is also suspension-4's preview).

   Cd ledger: 0.145 static (Gen 3, as measured) to 0.140 as a speed-weighted
   average, itemized per device in the skin part. Gen 5's apex shell reaches
   0.130 with a carbon skin, a raised Kamm blade on struts, a deployable
   diffuser and a sealed twin-tunnel floor; this body deliberately has none
   of those and actuates what Gen 3 already had.

   Mass ledger, binding +-2 kg: 196 kg structure (STRUCT_META, carried) +
   160 kg shell = 356 kg. Gen 3 monoform: 358. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';
import { STRUCT_META, mirrorZ } from './body.js';

/* Standing honesty rule: every part carries a Maturity row. The five carried
   structure parts take theirs here, derived from STRUCT_META rather than
   redrawn, so the structural metadata still comes from body.js. Gen 1 parts
   with six rows drop the sixth so the row count stays inside 4 to 6. */
const STRUCT_G4 = Object.fromEntries(
  Object.entries(STRUCT_META).map(([id, p]) => [id, {
    ...p,
    specs: [...p.specs.slice(0, 5), ['Maturity', 'Production practice, carried from Gen 1 unchanged']],
  }])
);

export const SYSTEM = {
  id: 'body-4',
  name: 'Body · Gen 4 active monoform',
  color: 0xa8cade,
  explode: [0, 1.7, 0],
  blurb: 'Gen 3 drew one surface and froze it. Gen 4 is the generation that builds the nervous system, so the surface gets one too: a Kamm flap on a three-input map, arch louvers that know where the wheels point, a shutter bank that strokes in 90 ms, and floor strakes tied to the ride height suspension-4 actually holds. Cd 0.145 static to 0.140 weighted, 356 kg, every actuator on hv-4\'s 48 V zonal bus.',
  /* THE CLOSURES. Gen 4 is the control generation: 48 V zonal, by-wire
     everything, a body whose shutters and louvers move under software. The
     doors are the one thing on it that still moves the way a door has moved
     since the 1930s, and that is worth stating rather than dressing up. An
     e-latch on a zonal controller changes who commands the door, not what
     the door has to sweep through to open, and the number below is unmoved
     by every actuator on this rung.

     The axis is on the paint at each leaf's own widest point, for the reason
     body-8 measured two rungs up: an axis inside the surface sweeps the
     leading edge forward into the fixed panel ahead of it, and a fender step
     is an obstacle rather than a pocket.

     THE TWO LIDS ARE THE SAME ARGUMENT TURNED NINETY DEGREES. A door is
     charged for the ground beside the car and a lid is charged for the air
     above it, and on both of them the axis is decided by the camber of the
     panel's own cut rather than by where a hinge would be convenient. Both
     cuts on this body are crowned, 75.0 mm across the cowl and 95.0 mm
     across the deck, and both lids therefore hinge at the crown of their own
     line so the leading edge is pinned. Put either axis at the outboard ends
     instead and the crown drives 65 to 82 mm into the canopy glass, which
     starts at x 1.0600 and ends at x -1.8700 and is the panel both of them
     shut against. Neither lid needed a new line in the master grid: their
     outlines are truncations, material handovers and the beltline shoulder,
     which is why the closed car is identical to the vertex. */
  closures: {
    'door-front': {
      name: 'Front door',
      kind: 'door',
      part: 'doors',
      mass: 10.2,
      seconds: 1.2,
      seat: 'Hinge pillar at the x 0.8489 cut, axis on the skin at |z| 0.9520',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [0.8489, 0.420, 0.9520], deg: 67 },
      ],
      why: 'The e-latch is the interesting part of this door and it is not the part that costs anything. Gen 4 puts the latch on a zonal controller as a fused, telemetered channel, so the car knows the door is shut rather than inferring it from a switch, and it can refuse to open into traffic because it has the sensors to know traffic is there. None of that changes the arc. The panel is 830 mm long and swings 67 degrees, so it reaches 727 mm outside the parked car whatever is commanding it, which is the honest limit of what control can do about packaging: software can decide when a door opens and cannot decide where it goes.',
      cost: [
        'Software cannot buy space. The curbside figure here is 33 mm worse than Gen 3\'s and 238 mm better than Gen 1\'s, and the whole 48 V zonal architecture moves it by nothing at all.',
        'An e-latch keeps its legally required mechanical release, exercised at every service because nobody touches it until the day it matters.',
      ],
    },
    'door-rear': {
      name: 'Rear door',
      kind: 'door',
      part: 'doors',
      mass: 12.1,
      seconds: 1.2,
      seat: 'B-pillar hinge at the x 0.0189 cut, axis on the skin at |z| 0.9481',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [0.0189, 0.420, 0.9481], deg: 67 },
      ],
      why: 'Front-hinged off the B-pillar, the ordinary arrangement, and the longer of the two leaves at 1.030 m against the front door\'s 0.830. Arc length is the whole difference in what the two doors need beside the car, which is why the rear door is the one that gets redrawn first on the rungs above.',
      cost: [
        'A pillar between the two apertures is the largest obstruction to getting into the back seat, and no amount of by-wire removes it.',
      ],
    },
    hood: {
      name: 'Nose clamshell',
      kind: 'hood',
      part: 'skin',
      mass: 13.2,
      seconds: 1.6,
      seat: 'Cowl at x 1.0600, axis carried up to the crown at y 1.0650; stopped at 60 degrees by a garage ceiling and not by the car',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [1.0600, 1.0650, 0], deg: 60 },
      ],
      why: 'The lid was already drawn, which is why nothing moved to make it open. The nose deck was one mesh, panel([RI(0), RI(COWL)], up), and its four boundaries are the four hardest lines on the front of this car: the nose truncation at row 0, the cowl at row 12 where the paint hands over to glass, and ring point 3 down each side, which is the beltline shoulder the crease pass already declares. A hood needed no new line here because the outline of a hood is what those four lines already were. Moving that mesh from the skin group into its own is a change of owner and nothing else, and geohash --soup is identical to the digit.\n\nThe axis sits at the crown and that is forced. Measured across its own cowl cut this panel cambers 75.0 mm, from y 1.0650 at the centerline to 0.9900 at ring point 3 on either side, and a cambered cut cannot hinge on one straight axis without something going through something. Put the axis where a drawing would put it, on the outboard ends at y 0.9900, and the crown of the trailing edge swings aft: swept, the panel reaches x 1.0225 at 30 degrees, 1.0070 at 45 and 0.9950 at 60, which is 37.5, 53.0 and 65.0 mm past the cowl into the canopy glass, whose forward edge is at x 1.0600 exactly. Put it at the crown and the leading edge is pinned instead: over the whole travel the panel\'s own minimum x never leaves 1.0600. Same panel, same cut, one number moved 65 mm.\n\nSixty degrees is A ceiling decision, not A clearance one, and the panel says so rather than dressing it up. Swept against the built gen4 preset this lid is clean over 33 parts all the way to 80 degrees; nothing on the car is in its way at any angle. What is in its way is a building. The highest point of the open panel is 1.3718 m at 30 degrees, 1.7085 at 45, 2.0013 at 60 and 2.1622 at 70, against a parked car 1.460 m tall. Sixty degrees clears a 2.03 m domestic garage header with 29 mm in hand and seventy does not clear it at all, so the travel stops where the building does.\n\nAnd the volume is the story. The largest box that fits under this clamshell, measured cell by cell at 20 mm over the whole preset and then confirmed against every triangle of every module, is 500 by 240 by 720 mm at x 1.280 to 1.780, y 0.640 to 0.880, |z| under 0.360: 86.4 liters. That is 1.315 m of lid and 1.580 m of width over eighty-six liters, because everything below y 0.742 in this bay is already taken by suspension-4\'s air springs, hv-4\'s buffer, drivetrain-3\'s front unit and thermal\'s radiator pack, and everything above y 0.93 aft of x 1.27 is interior-4\'s dashboard and displays. The biggest panel on the car opens onto the smallest useful space on it.',
      cost: [
        'It spends the one currency a hood has. 541 mm of overhead above a 1.460 m car at 60 degrees, and there is no kinematic trick that avoids it: a panel hinged at the back has to stand up to get out of the way.',
        'On the way up it goes forward before it goes over. The leading edge reaches x 2.4616 at 20 degrees, 84.1 mm past the parked nose at 2.3775, and is still 1.6 mm outside it at 40 degrees before coming back in by 45. Nothing is there on this car, but a wall is, and the number a garage owner cares about is the transient rather than the endpoint.',
        'There is no shutline channel. The doors get a 5 mm by 4 mm groove cut into the master grid at each cut; this lid gets panel boundaries. That is honest for three of its four edges, which are a truncation and two material handovers, and thin for the fourth. Cutting a real channel is a closed-state change to a surface whose frontal area js/efficiency.js books at 2.3635 m2, so it belongs to a generation that re-cuts the grid rather than to a pass that promised to move no vertex.',
        'Eighty-six liters. A frunk on this rung is a place for cables and a bag, and calling it storage would be the kind of claim this ladder exists not to make.',
      ],
    },
    decklid: {
      name: 'Decklid',
      kind: 'decklid',
      part: 'skin',
      mass: 5.3,
      seconds: 1.4,
      seat: 'Front cut at x -1.8700, axis carried up to the crown at y 1.0600; the Kamm flap and autonomy-4\'s rear camera ride on the lid',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [-1.8700, 1.0600, 0], deg: -65 },
      ],
      carries: [
        { part: 'body-4/kamm-flap', box: [-2.30, 0.90, 0, -2.15, 1.00, 0.10] },
        { part: 'autonomy-4/cameras', box: [-2.30, 0.92, 0, -2.15, 1.00, 0.10] },
      ],
      why: 'Same re-slice as the hood and the same reason it cost nothing: the tail deck was already one mesh, panel([RI(DECK), RI(LAST)], up), bounded by the deck station where the glass ends, the Kamm truncation, and ring point 3 down each side. It changed groups and not coordinates.\n\nThe crown axis, measured. This cut cambers 95.0 mm, y 1.0600 at the centerline to 0.9650 at ring point 3, and it is the worse of the two cuts on this body. On an outboard axis the crown of the leading edge swings forward into the canopy: the panel reaches x -1.8225 at 30 degrees, -1.8028 at 45 and -1.7877 at 60, which is 47.5, 67.2 and 82.3 mm past its own front cut at x -1.8700, and the glass rear edge is at -1.8700 exactly. On the crown axis the panel\'s maximum x is -1.8700 at every sample of the travel. The camber decides the axis and the drawing does not get a vote.\n\nThe lid carries the KAMM flap, and that is geometry rather than preference. The flap sits on this deck: hinge tube at x -2.146, four deck seats, two spindle drives on their own pedestals, two 48 V leads and an absolute encoder, all between x -2.1728 and -2.1151. Cutting a shorter lid in front of them would need a line in the grid to cut on, and there are exactly two inside this panel. The first is the flap\'s own relief channel, split row 52, x -2.1461 at the crown and -2.1481 at the panel edge; measured, the flap\'s hinge tube spans x -2.1550 to -2.1370, so it straddles that line by about 9 mm on each side and a lid cut there would be cut through the tube. The second is the charge-door row groove at split row 45, x -1.9870, which leaves a 117 mm lid. So the deck opens whole and the aero device opens with it.\n\nAnd the checker would have let me get that wrong. Left behind, the flap reports as "carries body-4/kamm-flap 5.9 mm deeper" and the run still passes, because the four deck seats are already inside the deck at rest and tools/closures.js only fails on a pair that was clear at rest, which is the right rule and is blind here. Measured, the deck under the flap\'s hinge travels 309 mm up and 67 mm aft at full open, so what a passing run would have drawn is an active spoiler hanging in the air 309 mm under the panel it is bolted to. autonomy-4\'s rear camera, bbox x -2.2590 to -2.2140, y 0.9475 to 0.9850, standing 18.1 mm proud of the deck at that station, is the same class and was loud instead of quiet: left behind it strikes the lid by 4.7 mm at 3 degrees of travel. One of the two was a failure and the other was a warning, and they are the same mistake. design/closures.md already names it, that a static model cannot tell you what a part is bolted to, and this rung found two more of them.\n\nSixty five degrees is the LARGEST travel that costs the world nothing. Swept, the highest point of the open lid is 1.4416 m at 65 degrees against a parked car 1.4600 m tall, so the panel never rises above the roof it sits behind; at 70 degrees it is 1.4730 and stands 13.0 mm proud. It costs no width at any angle, because it never leaves |z| 0.6400 against a parked half-width of 0.9828.\n\nWhat it opens onto is the honest part. The largest box that fits under the aperture, at 20 mm cells and then confirmed against every triangle on the car, is 500 by 200 by 800 mm at x -2.360 to -1.860, y 0.640 to 0.840: 80.0 liters. The largest box in the tail bay as a whole is 109.1 liters at x -2.200 to -1.580, and 290 mm of that box lies forward of this lid\'s own front cut, under a canopy that does not open. This is a lid over a well, not a hatch over a load bay, and the reason is the same beltline-down argument the doors lose on: Gen 4 carries Gen 3\'s glass verbatim, and a generation that will not cut its canopy cannot have a tailgate.',
      cost: [
        'It protrudes rearward in the middle of the travel and not at the end. The aft edge reaches x -2.4380 at 27 degrees, 61.5 mm past the parked tail at -2.3765, then comes back to 57.4 mm inside it by 65. A fixed axis at the front cut cannot avoid that arc, and it is the fore-and-aft mirror of the curbside bill the doors pay: park nose-in against a wall and the trunk still wants 62 mm it does not have.',
        'Two hv-4 eFuse channels and the encoder signal now cross a hinge. The flap\'s leads were drawn straight into the deck through a grommet, which was correct when the deck was structure; on a lid they need a service loop rated for the lid\'s cycle life, and a chafed 48 V lead in a hinge is the failure this arrangement is known for.',
        'The flap\'s datum moved from the deck to the lid. Its root clearance is safe, because the relief channel travels with it and the 4.6 mm at the centerline is preserved to the vertex, but the blade\'s angle relative to the car is now referenced through two hinges and a latch instead of four bolts into a casting. A 16 degree map on a downforce device is a tighter tolerance than a trunk lid is usually asked to hold.',
        'Eighty liters under the aperture. body-9 called its own tail a shallow well rather than a trunk and this one is shallower, and the fix is not a hinge: it is a canopy that opens, which is a generation this body deliberately is not.',
      ],
    },
  },
  parts: {
    ...STRUCT_G4,
    skin: {
      name: 'Monoform skin',
      tagline: 'Gen 3\'s one lofted surface kept station for station, thinned by a second draw and cut for four mechanisms.',
      mass: 60,
      specs: [
        ['body-3 counterpart', 'skin, 64 kg: same loft, same 10 stations, same die'],
        ['Delta', 'Entering gauge 1.3 to 1.2 mm on a two-stage pre-form; -4 kg'],
        ['Apertures', 'Intake mouth 60 x 800 mm, charge door, plus flap, louver and strake hinge lines'],
        ['Cd ledger', '145.0 counts static (Gen 3) to 140.2 weighted; quoted 0.140'],
        ['Hardpoints', '9 bonded doublers carrying actuator reaction loads'],
        ['Maturity', 'Production practice; the 0.140 weighted average is a pilot line claim'],
      ],
      how: 'The surface is carried, and the carry is the point. Ten cross-sections from x +2.375 to -2.375, thirteen points a ring, the flanks and nose band and deck band sharing edges, and the near-flat roof band held out to z plus or minus 0.66 so the glass wraps the cage rails at 1.44 to 1.45 instead of dipping under them. None of that moved, because in a control generation the shape was never the bottleneck: the shape\'s inability to move was. What did move is the gauge. Superforming thins a blank wherever it stretches most, so Gen 3 entered at 1.3 mm to guarantee its minimum wall in the two deepest draws, the shoulder and the front arch. Gen 4 adds a pre-form stage, blowing the blank into a reverse die and then reversing it into the finish die, which redistributes the strain field and holds the same minimum wall from a 1.2 mm start. The arithmetic is checkable: about 13.5 m2 of outer surface, 0.1 mm thinner, at 2.70 g/cm3 is 3.6 kg; deleting Gen 3\'s deck doubler around the flap surround, now redundant because the new flap carries its own torsion box, is another 1.2 kg; nine bonded doublers and hinge hardpoints put 0.8 kg back. Net 4.0 kg, 64 down to 60.\n\nThe apertures are the honest debit. Four devices now interrupt a body whose entire argument was curvature continuity: the nose face is split around a 60 by 800 mm intake mouth Gen 3 did not draw at all, the deck trailing edge carries a hinge line, each front arch carries two louver frames, and the floor plane carries six strake pivots. The ledger bills all of it. Starting from 145.0 counts, the scheduled Kamm flap returns 1.8 on the weighted average, the steering-coordinated arch louvers 1.5, the ride-height-coordinated floor strakes 2.4; the shutter bank is a net debit of 0.6, being 1.5 counts of mouth and leakage against 0.9 counts earned back by a 90 ms stroke; and the four new hinge lines and the mouth lip cost 0.3 between them. That is 140.2, quoted as 0.140. Every one of those numbers is a time-weighted average over a usage model, not a wind-tunnel state, which is exactly what makes an active body harder to be honest about than a static one.',
      why: 'A static body has a drag coefficient and an active body has a schedule, so 0.140 is only as good as the weighting behind it, and the ledger prints the weighting rather than the headline. The restraint matters as much as the number: Gen 5\'s apex shell reaches 0.130 with a carbon skin, a Kamm blade raised on struts, a deployable diffuser and a sealed twin-tunnel floor, and this body has none of them on purpose. Five counts bought by teaching four surfaces Gen 3 already owned to move is the control generation\'s thesis written in aluminum, and it leaves the apex work to the generation that has the materials for it.',
      fail: [
        'A 1.2 mm gauge is a smaller dent budget. Gen 3 already oil-canned under hail and careless palms, and the pre-form holds minimum wall, not local stiffness, so a marginal panel got slightly more marginal.',
        'Four apertures are four water paths into bonded closed sections. Every frame is a drained, sealed cassette, and the first one whose drain silts up corrodes a doubler no visual inspection reaches.',
        'The repair quantum is Gen 3\'s and is still the whole side: a bonded structural section replacement with a cure cycle the car cannot be driven through, because the bond line is structure rather than sealant.',
      ],
      explode: [0, 0.62, 0],
    },
    canopy: {
      name: 'Glass canopy band',
      tagline: 'Carried from Gen 3 without a millimeter changed, and quietly promoted into the chassis control loop.',
      mass: 38,
      specs: [
        ['body-3 counterpart', 'canopy, 38 kg: carried, delta zero in mass and geometry'],
        ['Glazing', 'Cell-cast laminated, 2.1 mm + acoustic PVB + 1.6 mm'],
        ['Span', 'Cowl at x 1.06 to the deck at -1.87, one band on the skin loft'],
        ['New duty', 'Camera zone feeds autonomy-4, which feeds suspension-4 preview'],
        ['Bond', '11 m structural PU, shear-active, indexes the glass to the loft'],
        ['Maturity', 'Production practice, carried from Gen 3 unchanged'],
      ],
      how: 'Nothing about the glass changed, and the reason it did not have to is the bond. The band\'s mold is cut from the same ten loft stations as the metal, and the outer face of the glass sits on the same mathematical surface as the paint; the skin going 0.1 mm thinner would have shifted a flange-referenced joint, but this joint is referenced to the loft through the thickness of a polyurethane bead set at fitting. A tenth of a millimeter is absorbed in the bead, which is the property the structural bond was chosen for in the first place. The laminate, the sputtered infrared stack near 20 percent total solar transmittance, the acoustic core damping the 3 kHz band, the half-millimeter step and zero curvature change at the material boundary: all carried from Gen 3 verbatim.\n\nWhat is new costs no kilograms and is not visible in the geometry. The optical-grade camera zone above the mirror now serves autonomy-4\'s consolidated camera set, and the forward wedge of that set is the same map suspension-4\'s chassis ECU reads as preview, height to a few millimeters out to 15 m, converted into valve pre-positioning per wheel. A piece of glass that used to be a structural shear panel with a clean window in it is now a load-bearing element of the ride. The consequence is a new failure path rather than a new part: film, fog or a chip in that zone thins the preview map, skyhook control falls back to its own sensors, and the pre-positioning stops. The glass gets no new spec for this; it simply inherits a customer it did not have in Gen 3.',
      why: 'The temptation in an active generation is to touch everything, and the discipline is the opposite: the budget goes to parts that do something new, and a band that already crosses a material boundary the boundary layer cannot detect has nothing left to give. Re-tooling a mold that spans cowl to deck to chase a kilogram would put a fresh waviness spec into the one joint this whole body exists to hide, which is a real aerodynamic risk taken for an imaginary gain.',
      fail: [
        'One stone chip still condemns the band, carried from Gen 3 unimproved, and a replacement must re-index to the skin loft within half a millimeter or it becomes the step the design exists to delete.',
        'Aluminum expands roughly twice as fast as glass, so the 11 m bond absorbs millimeters of relative motion every thermal cycle; a dry spot announces itself as a creak, then a leak.',
        'The preview dependency is silent by nature: a filmed camera zone degrades suspension-4\'s road map without breaking anything, so the status line has to say preview is thin rather than letting a driver hunt a ride fault that is really a dirty windshield.',
      ],
      explode: [0, 1.05, 0],
    },
    doors: {
      name: 'Flush doors and camera pods',
      tagline: 'The four apertures a passenger uses, with their latches on a named bus and their pods answering to the perception stack.',
      mass: 38,
      count: 4,
      specs: [
        ['body-3 counterpart', 'doors, 41 kg: same skins, same loft cut, same pods'],
        ['Delta', '-2 kg of 48 V latch hardware, -1 kg of pod optics onto autonomy-4'],
        ['Supply', 'hv-4 corner zonal controllers, 0.4 m drop, one eFuse channel per latch'],
        ['Flushness', '+/-0.25 mm to the skin; 5 mm gaps cut at x 0.850, 0.020 and -1.010'],
        ['Backup', 'Mechanical cable release retained unchanged'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The architecture is Gen 3\'s, kept whole: each skin is the master loft surface between two shutlines, trimmed from the same mathematics as the body around it, so a closed door restores the surface exactly, and the pass criterion is still an unbroken highlight rather than a measured gap. The delta is electrical. Gen 3\'s e-latch and capacitive strip drew from an unnamed 12 V supply; here every latch is a fused, telemetered channel on the nearest hv-4 corner zonal controller, forty centimeters of 48 V drop. A latch motor that pulled 9 A at 12 V pulls 2.3 A at 48, so the winding, the brush gear and the conductor down the drop all shrink, roughly half a kilogram per door. The 1 kHz per-circuit current telemetry then deletes a part outright: the actuation signature is the position sensor, so Gen 3\'s microswitch per latch is gone and the fleet learns what a healthy pull looks like the same way it learns a window motor.\n\nThe camera pods are carried on their 90 mm stalks, still worth about 0.008 of Cd against glass mirrors, still outboard because the rules and the spray physics both want the lens there. What moved is ownership. autonomy-4 consolidates the camera set and indexes the pod lenses into its surround model, so the imager, its signal processing board and its lens heater land on that module\'s ledger: one kilogram moved rather than vanished, and this part keeps the stalk, the housing and the alignment spec. That makes the stalk a control component. Its first bending mode is placed above the band where body ride motions live, because road vibration entering the pod has to stay inside the perception stack\'s stabilization budget, and a stalk tuned for looks rather than for that would corrupt what the car sees at exactly the frequencies the chassis is busiest at.',
      why: 'Every kilogram taken out of a door leaves at the far end of a hinge, which is the worst place on the car to carry mass: it is the moment arm that drives hinge sag, closing effort and seal compression set, and on a monoform sag does not read as a bad gap, it reads as a broken highlight line running the length of the body. Three kilograms off the door set is worth more than three kilograms off the floor for that reason alone, and none of it came out of the structure that makes a door part of the side impact path.',
      fail: [
        'E-latches keep their legally required mechanical backup, and the hidden cable release is exercised at every service because nobody touches it until the day it matters, carried from Gen 3.',
        'Seal compression set returns as a whistle at exactly the speed you drive daily, carried from both ancestors because EPDM chemistry did not read the design brief.',
        'An eFuse that trips on an iced seal reads to a driver as a broken door rather than a cold one. The channel retries three times and then reports ice, and the honest limit is that current alone cannot tell ice from a bent striker.',
      ],
      explode: [0.08, 0, 0.85],
    },
    lightbands: {
      name: 'Light bands',
      tagline: 'The two flat faces still glow, and the front one has taken in a lodger with a laser.',
      mass: 4,
      count: 2,
      specs: [
        ['body-3 counterpart', 'lightbands, 4 kg: carried, delta zero in mass'],
        ['Front', '2 x 84-pixel matrix behind one conformal window, 50 ms blanking loop'],
        ['New tenant', 'autonomy-4 flash lidar behind the same window, mass on its ledger'],
        ['Rear', 'PMMA guide across the Kamm face; brake rise under 10 ms'],
        ['Aim', 'Referenced to suspension-4\'s commanded height, cross-checked on 4 sensors'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The lineage runs straight and the geometry is Gen 3\'s. The loft is truncated by exactly two flat faces, nose and Kamm, and each is closed by a band: matrix optics and their drivers behind one conformal window at the front, a PMMA light guide across the tail. Both live in aerodynamically dead air by construction, the front in the stagnation region where the flow has already decided to go around, the rear inside the wake where the air has already left, which is what lets them be flush and frameless. Gen 4 cuts an intake mouth into the nose face below the band, and that does not disturb the argument: the mouth sits under the stagnation line, and the band\'s window and its edge treatment are untouched.\n\nTwo things changed, neither of them weighing anything. First, autonomy-4 puts its solid-state flash lidar behind the front band\'s window, so this part now owns an optical spec across two wavebands, visible for the matrix and near-infrared for the lidar, and a thermal design that has to carry the emitter\'s dissipation alongside 84 pixels per side in a housing with almost no air to convect into. Second, aim. Gen 1 referenced lamp aim to ride height and listed a leveling fault as a glare source; suspension-4 holds height to plus or minus 3 mm at whatever setting it commands, so aim now references the commanded height and cross-checks it against the four wheel-travel sensors. If they disagree, aim freezes at the low setting, because low is the glare-safe direction and a lamp that is aiming slightly short is a range problem while a lamp aiming high is everyone else\'s problem.',
      why: 'A monoform leaves nowhere else for light to live, and a control generation leaves nowhere else for a forward lidar to live either. Any housing cut into the lofted surface would be a curvature break in exactly the air the body is shaped to keep attached, whereas the two truncation faces are flat, vertical and already outside the attached flow. Putting the lidar behind the band costs this module zero kilograms and costs the sensor zero drag, which is the definition of an integration that should happen rather than one that merely can.',
      fail: [
        'One part per face: a parking tap costs the whole band, and now it costs a lidar aperture with it, so a low-speed nose contact is a perception event as well as a lighting one.',
        'Slim sealed housings still condense, and membrane vents manage it without abolishing it; carried from Gen 3 and now with an optical customer that cares more than the LEDs did.',
        'Road film on the front face degrades high beam and lidar range together, and the two failures look identical from the driver\'s seat, so the car has to name which one it has measured.',
      ],
      explode: [1.15, 0.1, 0],
    },
    'kamm-flap': {
      name: 'Active Kamm flap',
      tagline: 'Gen 3\'s flap had two positions and a speed threshold; this one has a map, a second drive lane, and four more degrees.',
      mass: 7,
      specs: [
        ['body-3 counterpart', 'kammflap, 6 kg: 0 or 12 degrees on a speed threshold'],
        ['Delta', 'Continuous 0 to 16 degrees on a speed, yaw and height map; +1 kg'],
        ['Actuation', '2 x 48 V spindle drives, 120 W peak, separate hv-4 eFuse channels'],
        ['Rate', '16 degrees in 0.9 s driven; 0.6 s spring return to flush'],
        ['Worth', '-1.8 counts weighted against Gen 3\'s fixed 12 degrees'],
        ['Maturity', 'Production practice: multi-position deck flaps have shipped for decades'],
      ],
      how: 'The physics carries from Gen 3 unchanged: a Kamm truncation pays base drag on the cut face every kilometer, and a flap extends the boat-tail line the quarters started, pulls the separation edge inboard and down, and shrinks the base area the pressure deficit acts on. Gen 3 bought that with one angle and a threshold. The problem with one angle is that the optimum is not one angle: the base deficit depends on speed, on yaw, and on the floor\'s exit condition, which itself depends on ride height. So the angle becomes a variable on a three-input map. Above 110 km/h, where suspension-4 has already dropped the body 20 mm and the underfloor is pulling hardest, the flap runs 16 degrees, four more than Gen 3 could hold, and the extra camber is only tenable because a faster floor exit will not let it separate. Between 60 and 110 km/h it runs intermediate angles Gen 3 had no way to express, which is where most of the 1.8 counts actually come from. In yaw it trims back, because a crosswind moves the separation line and an over-cambered flap in yaw stalls and gives the counts straight back. It is drawn here at 9 degrees, mid-map, because the whole argument of this generation is that no single position is the design position.\n\nThe drive and the failure are the rest of the part. Two 48 V spindle drives sit at the ends of one hinge tube, on separate eFuse channels on hv-4\'s two rear corner zonal controllers, 120 W peak each, 2.5 A. They are deliberately not on hv-4\'s by-wire feed pair: that pair is sized at 150 A per rocker for the 146 A of steering, brake boost, damper heads, rear-steer and compressor, and aero has no business inside a budget whose whole purpose is that a failure there costs control. An aero failure costs counts, and the wiring says so. The ladder runs: one lane dead, the survivor drives the flap flush at half rate; both dead, a return spring pulls it flush in 0.6 s. Flush is the only safe rest position, carried word for word from Gen 3, because a flap stuck at angle in town is an uncertified pedestrian geometry while a flap stuck flush merely costs six counts. Travel bought certification debt with it: the headform and legform series now runs at flush, at 16 degrees, and at the worst intermediate angle, and pinch protection is proven across a continuum rather than at two endpoints. An absolute encoder on the hinge centerline knows the angle to a tenth of a degree, the eFuse current signature is the second opinion, and a disagreement parks the flap flush without asking.',
      why: 'A binary device is tuned at its endpoints and pays everywhere between them. Gen 3\'s flap earned about six counts at 130 km/h and nothing at 100, because 100 was below its threshold and twelve degrees would have been the wrong angle to hold there anyway. A map earns something at every speed the car actually drives, and a weighted average over real speeds is where a road car lives rather than where a tunnel run happens. The kilogram of extra hardware buys a second lane as well as the map, which is why the flap can still reach a legal position with half its drive dead.',
      fail: [
        'Ice in the hinge line is carried from Gen 3 and is worse here, because a continuous device has more positions to freeze in. The cold-start sweep measures breakaway torque on both lanes, and a stiff hinge parks the flap flush for the day with the range estimate quietly explaining the missing counts.',
        'A million actuations was Gen 3\'s fatigue number for a two-position flap; a mapped flap moves on every speed change and the duty count rises by roughly an order. The hinge is a dry polymer bearing sized for that, and trailing-edge lash is the wear signature the self-test is tuned to catch.',
        'Two drives on one torsion tube can fight each other: a lane whose encoder has drifted will wind the tube against its partner. Torque disagreement above 8 Nm de-energizes both lanes and lets the spring win, which is the only arbiter that cannot itself be wrong about the angle.',
      ],
      explode: [-1.05, 0.45, 0],
    },
    'arch-louvers': {
      name: 'Active front arch louvers',
      tagline: 'Gen 3 bolted fixed crescents over the arch the tire cannot reach; Gen 4 hinges them and tells them where the wheels are pointing.',
      mass: 6,
      count: 4,
      specs: [
        ['body-3 counterpart', 'spats, 5 kg: two fixed crescents per side, three static louvers'],
        ['Delta', 'Pivoting blades, 4 leading and 5 trailing per side, 50 deg travel; +1 kg'],
        ['Actuation', '4 x 48 V rotary, 30 W each, hv-4 front zonal eFuse channels'],
        ['Coordination', 'Steer-by-wire angle command, disc temperature model, speed'],
        ['Worth', '-1.5 counts weighted; 5.5 counts shut against Gen 3\'s fixed 4'],
        ['Maturity', 'Production practice: the mechanism is a grille shutter bank relocated'],
      ],
      how: 'The crescent logic is Gen 3\'s and it carries intact. A steered, bumped wheel sweeps a computed solid, and roughly 40 percent of the arch opening lies outside that solid, a crescent at the leading edge and a larger one trailing, coverable by panels that hug the loft where no full front skirt could stand closer than a hand-width. Gen 3 fixed those panels and bled the trapped arch pressure through three static louvers, which is an average-case setting paid at every speed and every steering angle. Gen 4 hinges the blades: four in the leading crescent, five in the trailing, 42 mm chord, one 48 V rotary actuator per crescent, fifty degrees of travel, drawn here at thirty. Shut, the crescents seal to the loft line and the arch stops spilling into the body side, worth about 5.5 counts against an open arch where Gen 3\'s fixed panels and vents were worth 4.\n\nThe coordination is the Gen 4 verb, and it has three inputs. Steering comes first: past roughly 8 degrees of road-wheel angle the tire begins pressurizing the crescent it is turning into, and a sealed crescent under a turning wheel feeds front lift, so the bank on that side opens ahead of the tire. The signal is suspension-4\'s steer-by-wire rack angle command rather than a measured wheel angle, which matters because a command arrives before the tire does and a measurement arrives after. Brake temperature comes second: an alpine descent or a repeated-stop tow wants arch airflow a summer cruise never does, so a disc temperature model opens the blades when the rotors ask, and thermal wins that argument the same way it wins at the nose. Speed comes third: below about 30 km/h the blades open because the drag is not worth having and the arch wants to breathe. Position truth is free. hv-4 streams every channel\'s current at 1 kHz, so the actuation signature is the position sensor and not one blade needs an encoder of its own.',
      why: 'An arch is an air pump whose duty varies by two orders between a summer cruise and a descent on hot discs, and whose pressure field changes every time the wheels turn. Gen 3 priced the average and then paid it everywhere, including at full lock where its fixed panels were actively working against the front axle. Thirty watts and half a kilogram per crescent buys both ends of that range, and the steering input is the part only a control generation could have written, because it needs a rack that knows its own commanded angle rather than a sensor reporting the last one.',
      fail: [
        'Grit and ice in the pivots is the chronic case; the cold-start sweep catches a stiff bank and leaves it open, which costs counts and never costs cooling or lift margin.',
        'The blades lead the wheel into every curb approach, carried from Gen 3\'s spats. They are frangible by design, tearing at the pivot rather than levering a frame into the tire, and the current signature logs the exact moment it happened.',
        'Snow chains and the crescents remain mutually exclusive by geometry. The frames release in a minute per side, and the honest limit is that a driver fitting chains in the dark will learn this from the manual rather than from the car.',
      ],
      explode: [0.45, -0.05, 0.75],
    },
    shutters: {
      name: 'Fast active shutter array',
      tagline: 'The Gen 2 bank returns with a stopwatch: 90 milliseconds end to end, and the hysteresis band it used to hide behind deleted.',
      mass: 2,
      specs: [
        ['body-3 counterpart', 'none: Gen 3 stopped drawing the intake altogether'],
        ['Ancestor', 'Gen 2 aero shutters, 2 kg, 5 slats, 1.5 s full travel'],
        ['Bank', '4 slats in a 60 x 800 mm mouth; 2 direct-drive 48 V heads'],
        ['Stroke', '90 ms across 0 to 90 degrees; 250 W peak, 5.2 A per head'],
        ['Worth', '+0.6 counts net: +1.5 for the mouth, -0.9 for the stroke'],
        ['Maturity', 'Production practice since the 2010s; the 90 ms stroke is what is new'],
      ],
      how: 'The accounting comes first, because this part is the one honest debit on the ledger. Gen 3 chased one unbroken surface and quietly stopped drawing the intake, but the thermal loop\'s air did not stop existing, so 0.145 was quoted for a nose with no modeled opening. Gen 4 draws the mouth: 60 by 800 mm in the nose face below the light band, ducted straight to the radiator stack in the front zone the ladder has never moved, x 2.08 to 2.26. It bills 1.5 counts for the aperture, its lip and the leakage past a shut bank, and then earns most of that back with speed rather than with area. Gen 2\'s bank took 1.5 s to full travel on a geared DC motor, and a controller that cannot trust its actuator to catch a transient must run a wide hysteresis band: open early, close late, and sit open through every margin it might conceivably need. Gen 2 measured itself open more than 15 percent of highway time. This bank full-strokes in 90 ms, so the band collapses toward the sensor noise floor and highway open time falls under 4 percent. That is the 0.9 count credit, and it is bought with milliseconds.\n\nWhat makes 90 ms possible is two direct-drive brushless heads, one per half-bank, with no geartrain to wind up: 250 W peak for the stroke and nothing at rest, which at 48 V is 5.2 A per head on an ordinary fused channel on hv-4\'s front zonal controllers, where the same torque at 12 V would want 21 A through a corner harness. Latency is the other half of the number. The position request rides the zonal bus\'s 1 Gbit control ring rather than waiting for a slot in a legacy frame budget, so thermal request to slat motion is under 5 ms end to end. What the speed does not buy is cooling: the coolant loop responds in seconds and the pack\'s thermal mass in minutes, so a fast bank is never cooler than a slow one at steady state. It simply lets the mouth stay shut right up to the moment the thermal controller genuinely needs it, and shut again the moment it does not. The negotiation itself is Gen 2\'s, carried verbatim: thermal owns the position request, aero is granted closure only when every thermal margin is green, and the spring fails the bank open, because a stuck-shut gate on a mountain climb cooks hardware while a stuck-open one costs a count. Cooling beats drag. Only the clock changed.',
      why: 'A fixed intake is sized for the worst hour of the car\'s life and paid for in every other hour, and Gen 3\'s answer, drawing no intake at all, was that problem left unstated rather than solved. A metered mouth with a 90 ms stroke turns the sealed-nose claim into a position the mechanism actually holds more than nine tenths of the time, and prints the debit for the times it does not. Two kilograms is the same number Gen 2 spent, because the deleted geartrain pays for the second head: the mass did not move, the response time did.',
      fail: [
        'Road grit and ice jam slat pivots, carried from Gen 2 unimproved. The cold-start sweep reports a stiff bank before the highway or the charger does.',
        'Fail-open is safe but a spring is still a mechanism: a broken return leaves the bank wherever the last command put it, which is why the two heads back-drive against each other on every sweep specifically to prove the spring is still there.',
        'The slats sit at the lowest point of the nose, squarely in the stone-strike zone, and a cracked slat unbalances a direct-drive head that has no geartrain to hide the asymmetry; the current signature flags it inside one stroke, which is the only warning this bank gets.',
      ],
      explode: [1.35, -0.1, 0],
    },
    strakes: {
      name: 'Ride-height strakes and venturi lip',
      tagline: 'Gen 3 listed the mistuned floor as a failure with no owner; suspension-4 is the owner, and six fences are how the floor collects.',
      mass: 5,
      count: 6,
      specs: [
        ['body-3 counterpart', 'venturi, 4 kg: carbon lip, 110 mm gap, two fixed strakes'],
        ['Delta', 'Lip carried; 6 raking blades on 2 torque tubes, 0 to 9 degrees; +1 kg'],
        ['Height partner', 'suspension-4 air springs: -20 to +25 mm, held to +/-3 mm'],
        ['Gap schedule', '110 mm nominal, 90 mm at the -20 mm setting above 110 km/h'],
        ['Worth', '-2.4 counts weighted; -3.2 counts at the low setting'],
        ['Maturity', 'Production practice; the height coupling is what is new'],
      ],
      how: 'The lip is Gen 3\'s and is carried unchanged: full-width carbon, 16 mm section, shear-away fasteners, metering the floor entrance to 110 mm at nominal height so the dead-flat plane the battery paid for works as a long shallow venturi with the road. What Gen 3 could not do was tune it. Its own fail list said a ride-height fault mistunes the whole floor rather than just a plate, and it named no owner for the height. The Gen 4 preset supplies one by name: suspension-4\'s rolling-lobe air springs hold height to plus or minus 3 mm at any commanded setting across a -20 to +25 mm range, and drop the body 20 mm above 110 km/h. That converts one design gap into a schedule of gaps, 110 mm nominal and 90 mm on the highway, and a floor whose fences were right at 110 is not right at 90: the same blades that conditioned the flow at the higher gap start shedding off their tips when the entrance accelerates harder.\n\nSo the fences move. Six blades, 24 mm deep, three per side at z plus and minus 0.30, 0.50 and 0.66, hang from the pack floor plane and rake about their own longitudinal axes through 0 to 9 degrees, driven by one 48 V rotary unit per side at 40 W through a torque tube ahead of the pack front wall. The outermost blade stops at 0.66 rather than following the pack to 0.72, because the front tire\'s inner face is at 0.7175 on the built wheel this preset fits, so a blade following the pack to 0.72 would sit 2.5 mm inside the wheel\'s swept solid. They are drawn here at 6 degrees, the highway setting. Flat, they are Gen 3\'s floor exactly. Raked, they turn the accelerated underfloor inboard and keep the rear run two-dimensional, so a yawed crosswind stalls one side\'s share of the plane instead of letting the whole floor let go at once. The scheduling detail is the interesting one: suspension-4\'s supply moves 40 mm on all four corners in about six seconds, so height arrives slowly and predictably, and the strakes take the same speed signal the height schedule takes and lead it rather than chasing a measurement. By the time the body has finished descending, the rake is already correct. The cross-check runs the other way: the drive current signatures and the four wheel-travel sensors must agree on which height the car believes it is at, and a disagreement springs every blade flat, because a fence pointed the wrong way at the wrong gap is worse than no fence.',
      why: 'The underbody is the largest single surface on the car and the only one the battery already paid to flatten, and Gen 3 left its tuning open-loop because nothing on the ladder could close the loop. This is the clearest statement of the control generation\'s thesis anywhere on the body: no new surface, no new material, one kilogram of pivots and drives, and an aerodynamic number that finally depends on something the car commands rather than something it hopes the road allows.',
      fail: [
        'Curbs and ramps rake the lip first, carried unchanged from Gen 3 along with its shear-away fasteners, because the physics of parking lot ramps did not change between generations either.',
        'A blade seized at rake is worse than a blade seized flat: it is a fence pointed the wrong way at the wrong gap, and it shows as a floor that pulls unevenly in yaw. Return springs are sized to overcome a dry pivot and the drives back-drive against them at every cold start to prove they still can.',
        'Deep snow packs the floor and the venturi becomes a plow. The blades are rated for it structurally, the floor is dead aerodynamically, and the range estimate still has no vocabulary for slush, carried from Gen 3 with the same apology.',
      ],
      explode: [0, -0.62, 0],
    },
  },
};


/* ── Geometry ──────────────────────────────────────────────────────────────
   The primary surface is the body-3 loft carried VERBATIM: 10 stations from
   x +2.375 to -2.375, 13 points a ring, held in STATIONS below and not one
   digit moved. The mid-canopy rings keep the near-flat roof band out to
   z +-0.66 so the glass wraps the cage rails (top ~1.46 at z 0.615) instead
   of dipping under them: the codified Gen 3 lesson, not re-learned.

   WHAT THIS PASS CHANGED IS RESOLUTION AND EDGES, NOT SHAPE. Every painted
   panel is now a slice of ONE resampled master grid instead of four
   independent lofts, at rowSub 2 and colSub 2. The station integral is
   unchanged to every digit and so is every clearance quoted below.

   INTERPOLATION IS LINEAR ON PURPOSE. lib.loft's clamped Catmull-Rom holds
   the envelope but not the integral, because frontal area is the widest point
   at each HEIGHT and a surface that moves between profile points moves A
   without touching any extreme. design/crispness.md measures that at +0.64
   percent clamped and +2.80 unclamped. This body's A is booked at 2.18, so
   only linear is admissible.

   THE FIVE THINGS THAT WERE WRONG, ALL MEASURED

   1. NEITHER TRUNCATION FACE WAS CLOSED. The nose face was three rectangles
      1.00 m wide and the Kamm face one rectangle 1.28 m wide, standing over
      ring outlines that are 1.14 and 1.36 m at their widest and 0.40 and
      0.36 at deck height. Rastered with axial rays confined to each ring's
      own outline, 7.567 percent of the nose face was chassis seen straight
      through the bodywork, 4.875 of it the crash rails and 2.692 the front
      megacasting, and 0.339 percent of the Kamm face was the rails seen the
      whole length of the car. Both faces are built from the master grid's own
      edge ring now, the nose as an annulus around the intake mouth and the
      tail with the closeLoop end cap plus the center disc that cap leaves
      out. The sweep is run on ANY first surface rather than on chassis
      alone, because the first version of this fix passed a chassis-only test
      with a 14.32 cm2 hole still in the middle of the Kamm face: what shows
      through a hole in the paint is more paint. Outside the intake aperture,
      every ray on both faces now stops on that face, 0.000 percent through
      on 185,818 nose rays and 561,250 tail rays at 1 mm pitch.

   2. THE DOORS WERE FLAT SLABS FLOATING OFF THE SKIN. Two 13 mm boxes a side
      at |z| 0.9385 and 0.9345 over a flank that measures 0.9389 and 0.9359
      at the same heights: no shutline at all, and a plane laid across a
      curved surface. They are the master surface between three real cuts
      now, so a shut door restores the loft exactly and each joint is a 5 mm
      channel with two lit walls and a dark floor.

   3. THE KAMM FLAP WAS A 1.30 m PLATE OVER A 0.79 m DECK. Its hinge tube ran
      straight at y 0.952 while the deck at that station falls from a crown of
      0.9531 to 0.8668 at |z| 0.587, so the tube stood 73 mm clear of the deck
      at its ends, and the blade's underside grazed the crown at the
      centerline and floated 113 mm above the deck at |z| 0.650. Span is
      0.72 m now: the deck at the hinge station is 0.393 half-wide 30 mm below
      its crown, every fitting is seated through surfaceY at its own |z|, and
      the root runs in a relief channel cut into the deck.

   4. THE ARCH LOUVER BLADES DID NOT FOLLOW THE ARCH. Every blade was the
      same 260 or 300 mm, so the forward ones reached 125 mm above the loft's
      lower edge at x 1.927, where the flank is 0.8192 half-wide at its widest
      and the blade face is at 0.9412: 122 mm outboard of any bodywork, on a
      bank that touched nothing. The bank is a 150 mm band following
      bottomY(x) now, and a closeout panel carries it from the arch lip out
      to the pivot plane.

   5. THE SHUTTER BANK'S END PLATES AND DRIVE HEADS SAT BEHIND THE JAMB, at
      |z| 0.401 to 0.458 outboard of a 0.400 mouth, and the slats were drawn
      at an angle that overlaps by 2 mm. A bank drawn shut cannot show that
      it moves. Everything is inside the throat now and the slats are open
      2.7 mm.

   MEASURED PARTNER GEOMETRY, off the built meshes of the gen4 preset
   (battery-3, drivetrain-3, wheels-3, hv-4, suspension-4, autonomy-4,
   thermal, interior-4):

   - wheels-3 front corner: static tire |z| 0.9036, swept |z| 0.9210 under
     suspension-4's +-3 degrees about the axis through (1.45, 0.81), peak at
     x 1.805 and 1.095. Tire crown y 0.7180. The louver pivot plane's 0.956
     used to be justified against a 0.9275 tire face, which is 24 mm wider
     than the tire this preset actually fits.
   - body.js cage, carried: A-pillar foot node (0.85, 0.95, 0.72) and the
     cowl beam across x 0.85 to |z| 0.72, on 40 to 42 mm tubes; B-pillar on
     x 0.02 at all three nodes; rockers x -1.010 to +1.010, top face y 0.42,
     outer face |z| 0.915.
   - interior-4 rear bench x -1.2607 to -0.4350.
   - hv-4 charge port, re-measured after that module's own detail pass moved
     it: recess plate x -1.9860 to -1.8540, y 0.7340 to 0.8660 at |z| 0.8710;
     port body inside it x -1.9735 to -1.8665, y 0.7465 to 0.8535, outer face
     |z| 0.8985; the whole assembly with its door drawn open reaches 0.9828.
   - thermal radiator face x 2.2050, y 0.2510 to 0.7790, |z| 0.4450, and it
     is the forwardmost thermal vertex.
   - autonomy-4 front radar center puck x 2.2890 to 2.3155, y 0.460 to 0.540,
     |z| 0.070; lidar x 2.2841 to 2.3691, y 0.583 to 0.647, |z| 0.3396.
   - battery-3 pack underside y 0.130 out to |z| 0.780, forwardmost x 1.300.

   CARRIED CONDITIONS, stated rather than fixed because they are another
   module's geometry:
   - autonomy-4's lidar window wants |z| 0.3396 up to y 0.647, where the nose
     face outline is only 0.2086 half-wide. The conformal band holds 0.3397
     out to y 0.6303, and the top 17 mm of the lidar aperture is behind
     paint.
   - hv-4's charge port body stands 16.2 mm outboard of the flank at
     (-1.92, 0.80), where the paint is 0.8823 half-wide, and its open door
     reaches |z| 0.9828, 100.5 mm outside it.
     The body cuts the flush door outline the port has always implied; the
     hardware standing proud of that outline is hv-4's to move.
   - THE BUMPER BEAM STANDS THROUGH THE NOSE, and this module draws the beam
     itself now, so the honest thing is the worst number rather than the
     kindest one. The beam is body.js's coordinates carried below: 1.30 m of
     it, so |z| 0.6500 at its aft corner x 2.2620. The nose there is 0.6362
     half-wide at y 0.553, which is 13.8 mm, but 0.553 is nearly the widest
     the ring gets and the beam does not stop there: at y 0.5920, the top of
     the beam's full section, the nose is 0.6079 and 42.1 mm of aluminum
     stands outside the paint. 264 beam vertices lie outboard of the loft at
     their own height. Left as drawn, because the metadata this module
     inherits from body.js says the beam is curved in plan to 85 percent of
     vehicle width, 1.598 m against a nose 1.269 m wide at that station: no
     beam of the stated length fits, and narrowing the geometry here alone
     would put the drawing further from the text rather than nearer. It is a
     body.js change with a content consequence. body-8 documented the same
     corner and left it; this pass does too, at three times the size.

   Actuator supply geometry: every 48 V lead in this module runs a short way
   inboard and stops. The drop from there to an hv-4 corner zonal controller
   is hv-4's geometry and this module does not draw the other side of it. */

function ring(x, half, crownY) {
  const pts = [];
  for (let i = 0; i < half.length; i++) pts.push([x, half[i][0], -half[i][1]]);
  pts.push([x, crownY, 0]);
  for (let i = half.length - 1; i >= 0; i--) pts.push([x, half[i][0], half[i][1]]);
  return pts;
}

/* [x, [[y, half-width] x6], crownY]. body-3's table, carried. */
const STATIONS = [
  /* 0  nose face */
  [2.375, [[0.42, 0.50], [0.47, 0.55], [0.53, 0.57], [0.58, 0.53], [0.62, 0.44], [0.648, 0.20]], 0.66],
  /* 1 */
  [2.10, [[0.34, 0.68], [0.44, 0.73], [0.56, 0.75], [0.65, 0.69], [0.72, 0.55], [0.755, 0.25]], 0.77],
  /* 2  front arch leading edge */
  [1.82, [[0.574, 0.86], [0.66, 0.875], [0.76, 0.86], [0.83, 0.74], [0.88, 0.57], [0.905, 0.26]], 0.915],
  /* 3  front axle, arch crown at y 0.785 */
  [1.45, [[0.785, 0.90], [0.82, 0.905], [0.86, 0.89], [0.90, 0.78], [0.93, 0.60], [0.947, 0.27]], 0.955],
  /* 4  cowl (COWL): glass root */
  [1.06, [[0.536, 0.90], [0.66, 0.92], [0.90, 0.935], [0.99, 0.79], [1.035, 0.59], [1.056, 0.26]], 1.065],
  /* 5  near-flat roof band out to z +-0.66 over the cage rails */
  [0.45, [[0.30, 0.91], [0.55, 0.935], [0.92, 0.94], [1.12, 0.74], [1.425, 0.66], [1.44, 0.35]], 1.445],
  /* 6  maximum section */
  [-0.35, [[0.30, 0.92], [0.55, 0.94], [0.92, 0.94], [1.16, 0.72], [1.435, 0.67], [1.448, 0.35]], 1.452],
  /* 7  rear axle: the flank holds 0.94 outboard of a 0.9036 tire, so the
        loft is the rear skirt and there is no arch opening to close */
  [-1.45, [[0.30, 0.94], [0.55, 0.94], [0.92, 0.925], [1.02, 0.68], [1.115, 0.46], [1.153, 0.21]], 1.16],
  /* 8  deck station (DECK): glass ends, painted deck begins */
  [-1.87, [[0.34, 0.93], [0.55, 0.925], [0.90, 0.90], [0.965, 0.64], [1.025, 0.43], [1.052, 0.195]], 1.06],
  /* 9  Kamm face */
  [-2.375, [[0.42, 0.66], [0.55, 0.68], [0.72, 0.66], [0.80, 0.55], [0.85, 0.40], [0.874, 0.18]], 0.88],
];

const RINGS = STATIONS.map(([x, half, crownY]) => ring(x, half, crownY));

const COWL = 4;                 /* ring index where the glass band starts */
const DECK = 8;                 /* ring index where the glass ends */
const LAST = STATIONS.length - 1;

/* The interpolated half-profile at an arbitrary x: linear between the two
   bracketing stations. Every placement in this module reads the surface
   through this rather than remembering a number. */
function profileAt(x) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  const p = [];
  for (let k = 0; k < A[1].length; k++) {
    p.push([(1 - t) * A[1][k][0] + t * B[1][k][0], (1 - t) * A[1][k][1] + t * B[1][k][1]]);
  }
  p.push([(1 - t) * A[2] + t * B[2], 0]);
  return p;
}

function halfWidth(x, y) {
  const p = profileAt(x);
  if (y <= p[0][0]) return p[0][1];
  for (let k = 0; k < p.length - 1; k++) {
    if (y <= p[k + 1][0]) {
      const [y0, w0] = p[k], [y1, w1] = p[k + 1];
      return y1 === y0 ? w1 : w0 + ((y - y0) / (y1 - y0)) * (w1 - w0);
    }
  }
  return 0;
}

/* Lower edge of the loft at x: the flank's bottom line, which over the front
   axle is the arch lip and peaks at y 0.7786 at x 1.440. */
function bottomY(x) { return profileAt(x)[0][0]; }
function crownAt(x) { const p = profileAt(x); return p[p.length - 1][0]; }

/* Inverse of halfWidth on the upper branch: the height at which the surface
   is hz wide. Bracketed from the widest profile point upward, because
   halfWidth rises from the bottom edge to the shoulder and falls to zero at
   the crown and a plain bisection would find the wrong branch. */
function surfaceY(x, hz) {
  let lo = bottomY(x), hi = crownAt(x), best = lo, bw = -1;
  for (let k = 0; k <= 40; k++) {
    const y = lo + ((hi - lo) * k) / 40, w = halfWidth(x, y);
    if (w >= bw) { bw = w; best = y; }
  }
  lo = best;
  for (let k = 0; k < 44; k++) {
    const m = (lo + hi) / 2;
    if (halfWidth(x, m) > hz) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}

/* Fractional row index of a station plane, and fractional column index of a
   height or of a half-width on the ring at x. Both are input-grid
   coordinates, which is what lib.loft's grooves take. */
function rowOf(x) {
  for (let i = 0; i < STATIONS.length - 1; i++) {
    if (x <= STATIONS[i][0] && x >= STATIONS[i + 1][0]) {
      return i + (STATIONS[i][0] - x) / (STATIONS[i][0] - STATIONS[i + 1][0]);
    }
  }
  return x > STATIONS[0][0] ? 0 : LAST;
}
function colOf(x, y) {
  const p = profileAt(x);
  for (let k = 0; k < p.length - 1; k++) {
    if (y <= p[k + 1][0]) return k + (y - p[k][0]) / (p[k + 1][0] - p[k][0]);
  }
  return p.length - 1;
}
const colOfZ = (x, hz) => colOf(x, surfaceY(x, hz));

/* Flat end cap built from a ring's own outline, so a truncation face fills
   its aperture exactly instead of being a rectangle standing over a curve.

   closeLoop is not optional. A ring here is an OPEN polyline from the
   flank's bottom edge on one side, over the crown, to the bottom edge on the
   other, and fanning it to a shrunken copy without joining the last point
   back to the first leaves the whole bottom sector unfilled. On this body
   that sector is 1.00 m by 0.135 at the nose and 1.32 m by 0.201 at the
   tail.

   AND THE SHRUNKEN COPY IS ITSELF A HOLE. This is a band between two loops,
   so closing the loop fills the annulus and leaves the five percent copy in
   the middle open. Measured on the built mesh that was 14.32 cm2 of the Kamm
   face, y 0.6385 to 0.6605 and |z| under 0.0335, and an axial ray through it
   found its next surface at x +2.3750: the INSIDE of the nose face, the
   whole length of the car away. A chassis-only sweep cannot see this,
   because what shows through a hole in the paint is more paint. capCenter
   closes it, at one triangle per outline point. */
function endCap(ringPts, dx, mat) {
  const ys = ringPts.map((p) => p[1]);
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const inner = ringPts.map(([x, y, z]) => [x + dx, cy + (y - cy) * 0.05, z * 0.05]);
  return lib.loft([ringPts, inner], mat, true);
}

/* The disc that closes the middle of that cap: the same five percent loop
   endCap stops at, fanned to the face center. Winding is decided from the
   loop's own signed area rather than assumed, so the normal faces out of the
   car at either end of it. */
function capCenter(ringPts, dx, mat) {
  const ys = ringPts.map((p) => p[1]);
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const cx = ringPts[0][0] + dx;
  const loop = ringPts.map(([, y, z]) => [cy + (y - cy) * 0.05, z * 0.05]);
  const n = loop.length;
  const len = [0];
  let twice = 0;
  for (let i = 0; i < n; i++) {
    const a = loop[i], b = loop[(i + 1) % n];
    twice += (a[0] - cy) * b[1] - a[1] * (b[0] - cy);
    len.push(len[i] + Math.hypot(b[0] - a[0], b[1] - a[1]));
  }
  const flip = (twice > 0) === (cx < 0);
  const pos = new Float32Array((n + 1) * 3), uvs = new Float32Array((n + 1) * 2);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = cx; pos[i * 3 + 1] = loop[i][0]; pos[i * 3 + 2] = loop[i][1];
    uvs[i * 2] = len[i];
  }
  pos[n * 3] = cx; pos[n * 3 + 1] = cy;
  uvs[n * 2] = len[n] / 2; uvs[n * 2 + 1] = 0.02;
  const idx = [];
  for (let i = 0; i < n; i++) {
    const b = (i + 1) % n;
    idx.push(flip ? b : i, flip ? i : b, n);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return lib.mesh(geo, mat);
}

/* Angled box with chamfered edges: abox's signature with the chamfer after
   the depth. A chamfer is what turns one flat highlight into two, and it is
   most of the mechanical crispness on this module. */
function acbox(w, h, d, c, mat, x, y, z, rz = 0, rx = 0, ry = 0) {
  const m = lib.cbox(w, h, d, c, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz, 'ZXY');
  return m;
}

const glassBand = RINGS.slice(COWL, DECK + 1).map((r) =>
  r.slice(3, 10).map((p) => [p[0], p[1] + 0.008, p[2] * 1.012])
);

/* ── The cuts ──────────────────────────────────────────────────────────────

   DOOR SHUTLINES, every one on a plane the built cage already occupies.

   x 0.850  the A-pillar foot node is at (0.85, 0.95, 0.72) and body.js's
            cowl beam runs the full width on x 0.85 at r 0.040, so the plane
            is occupied from the centerline out to |z| 0.72. A door leading
            edge cannot sit forward of the pillar it hangs on, and the boxes
            this replaces implied 1.080: 230 mm forward of the pillar and
            20 mm forward of the cowl station where the glass starts.
   x 0.020  all three B-pillar nodes are on x 0.02 at r 0.042, so the center
            cut lands inside the pillar's own 84 mm section. The boxes this
            replaces implied 0.060 and 0.080 and left a 20 mm strip of body
            belonging to neither door.
   x -1.010 the measured rear end of the rocker extrusion, 251 mm forward of
            interior-4's rear bench back at x -1.2607, which is the clearance
            the aperture exists to give, and 77 mm forward of the rear tire's
            leading vertex at x -1.0870.

   Each cut runs from the rocker top to the beltline seam and no further, and
   BOTH ENDS OF THAT SPAN ARE PANEL EDGES rather than comfortable values past
   them. Ring point 3 is where the painted flank hands over to glass between
   the cowl and the deck, so no panel exists above it along a door and a span
   ending past it would run its fade over a surface that is never built and
   reach the panel's top edge at full depth. Ring fraction 0.48 is y 0.420 on
   the cabin stations, which is the rocker's top face: the flank below it is
   the outer face of a 2.02 m extrusion and it neither opens nor moves.

   THE CHARGE DOOR is the other place this body opens, and it is cut against
   hv-4's BUILT port rather than against P.chargePort's nominal point. The
   cut is x -1.854 to -1.986 and y 0.734 to 0.866 on the ring at x -1.920, on
   the +z quarter only, because that is the side hv-4 fits it. That is 8 mm
   all round outside hv-4's port body at x -1.9735 to -1.8665, y 0.7465 to
   0.8535, and it now coincides to 0.0 mm with the recess plate hv-4's own
   detail pass grew to meet it.

   THE FLAP RELIEF CHANNEL is a row groove in the deck on the flap's own
   hinge station, 10 mm wide and 6 mm deep, spanning the flap plus a run-out.
   It is what makes the flap read as hinged rather than laid on: measured off
   the built blade, its root clears the deck by 4.6 mm at the centerline and
   by 30.8 mm at the tips, and that wedge is the gap an articulating surface
   has to show. */

const GAP = { width: 0.005, depth: 0.004 };
const FADE = 0.05;
const SHUT = [rowOf(0.850), rowOf(0.020), rowOf(-1.010)];
const SILL = 0.48;
const SEAM = 3;
const DOORL = [SILL, SEAM], DOORR = [12 - SEAM, 12 - SILL];

const PORT = {
  r0: rowOf(-1.854), r1: rowOf(-1.986),
  c0: 12 - colOf(-1.920, 0.866), c1: 12 - colOf(-1.920, 0.734),
};
const HINGEX = -2.146;
const FLAPZ = 0.360;                        /* flap half span */
const RELIEF = { row: rowOf(HINGEX), width: 0.010, depth: 0.006 };
const RSPAN = colOfZ(HINGEX, FLAPZ + 0.012);

const GROOVES = [];
for (const r of SHUT) {
  GROOVES.push({ row: r, ...GAP, span: DOORL, runout: FADE });
  GROOVES.push({ row: r, ...GAP, span: DOORR, runout: FADE });
}
for (const r of [PORT.r0, PORT.r1]) {
  GROOVES.push({ row: r, ...GAP, span: [PORT.c0 - 0.04, PORT.c1 + 0.04], runout: 0.03 });
}
for (const c of [PORT.c0, PORT.c1]) {
  GROOVES.push({ col: c, ...GAP, span: [PORT.r0 - 0.04, PORT.r1 + 0.04], runout: 0.03 });
}
GROOVES.push({ row: RELIEF.row, width: RELIEF.width, depth: RELIEF.depth,
               span: [RSPAN, 12 - RSPAN], runout: 0.10 });

const SHELL = lib.loftGrid(RINGS, {
  rowSub: 2, colSub: 2, interp: 'linear', grooves: GROOVES,
});

const RI = (i) => SHELL.rowIndex(i);
const CI = (j) => SHELL.colIndex(j);
const FL = [0, CI(3)], FR = [CI(9), CI(12)], UP = [CI(3), CI(9)];
const DOORBAND = [CI(9), CI(12 - SILL)];
const SILLL = [0, CI(SILL)], SILLR = [CI(12 - SILL), CI(12)];
/* each shutline pushed a left and a right groove; both resolve to the same
   split row, which is the far floor edge of the channel */
const CUT = [SHELL.grooves[0].split, SHELL.grooves[2].split, SHELL.grooves[4].split];

/* ── The declared hard lines ───────────────────────────────────────────────
   Which resolved grid lines are ALLOWED to break. Everything else stays
   smooth whatever angle it turns through, because interp: 'linear' puts all
   of this body's curvature ON its station lines and a global angle test
   cannot tell a designed crease from a coarse sample.

   Swept as face dihedrals over the master grid, this body has exactly two
   longitudinal feature lines and no transverse one worth naming:

     ring point 2   the beltline shoulder, the widest line on the flank. It
                    turns a mean 48 degrees over the nose rows, 54 through
                    the cabin and 58 down the tail, and it is interior to the
                    flank panel, so nothing breaks it unless it is declared.
                    This is the single largest crispness gain on the body.
     ring point 4   the roof shoulder where the near-flat roof band starts.
                    Mean 43 degrees through the cabin against 11 at the nose
                    and 10 at the tail, so declaring the line and testing the
                    angle gives a shoulder that hardens where it exists and
                    fades where it does not. Through the cabin that line
                    lives on the glass, which carries its own declaration.

   No station line is declared. The strongest is ring 5 in the upper band at
   32 degrees, which is the windshield header, and hardening it would put a
   knife edge across one continuous piece of glass. Ring point 3 reaches 39
   in one band and is a panel boundary that separate meshes already break.

   Every groove contributes its own four channel lines over its span, plus
   every resolved line inside each run-out across the channel width only. A
   line declared without an extent is a trap: a run-out line that happens to
   land on a station would harden that whole station. */

const BELT = 2, SHOULDER = 4;
const HARDR = new Map(), HARDC = new Map();
const declare = (m, k, lo, hi) => {
  let l = m.get(k);
  if (!l) m.set(k, (l = []));
  l.push([lo, hi]);
};
const onLine = (m, k, o) => {
  const l = m.get(k);
  if (!l) return false;
  for (const [a, b] of l) if (o >= a && o <= b) return true;
  return false;
};
for (const g of SHELL.grooves) {
  const own = g.axis === 'row' ? HARDR : HARDC;
  const map = g.axis === 'row' ? CI : RI;
  const end = (g.axis === 'row' ? SHELL.cols : SHELL.rows) - 1;
  const lo = g.span ? map(g.span[0]) : 0, hi = g.span ? map(g.span[1]) : end;
  for (const k of [g.i0, g.f0, g.f1, g.i1]) declare(own, k, lo, hi);
  if (g.span) {
    const other = g.axis === 'row' ? HARDC : HARDR;
    const axis = g.axis === 'row' ? SHELL.v : SHELL.u;
    for (const [a, b] of [[g.span[0], g.span[0] + g.fade], [g.span[1] - g.fade, g.span[1]]]) {
      for (let k = 0; k < axis.length; k++) {
        if (axis[k] >= a - 1e-9 && axis[k] <= b + 1e-9) declare(other, k, g.i0, g.i1);
      }
    }
  }
}
for (const c of [BELT, 12 - BELT, SHOULDER, 12 - SHOULDER]) {
  declare(HARDC, CI(c), 0, SHELL.rows - 1);
}

/* Degrees. Consulted only ON a declared line, so it sits far below the angle
   a global test would need: a channel wall stands at 65 to 75 and a run-out
   ramp falls away to nothing along its own fade, so the threshold is only
   deciding where along a named line the feature actually is. */
const LINE = 20;

/* Split normals along declared lines only, walking the grid the panel was cut
   from so it knows which line every edge lies on. lib.crease cannot do this:
   it is a pure angle test. Faces meet in a six-triangle fan around each
   interior vertex, cut by at most two lines, so the components come out of a
   six-element union over that fan. Triangle cost zero. */
function creaseLines(mesh, grid, hardR, hardC, rows, cols) {
  const r0 = rows[0], c0 = cols[0];
  const R = Math.min(grid.rows - 1, rows[1]) - r0 + 1;
  const C = Math.min(grid.cols - 1, cols[1]) - c0 + 1;
  const pos = mesh.geometry.attributes.position.array;
  const uv = mesh.geometry.attributes.uv.array;
  const QR = R - 1, QC = C - 1;
  const cosL = Math.cos((LINE * Math.PI) / 180);
  const P = (i, j) => (i * C + j) * 3;

  /* two face normals per quad, in loftMesh's own emission order:
     tri 0 is (i,j) (i+1,j) (i,j+1) and tri 1 is (i,j+1) (i+1,j) (i+1,j+1) */
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

  /* one normal per (vertex, fan slot). Slots 0-1 and 3-4 meet on row line i,
     2-3 and 5-0 on column line j, and 1-2 and 4-5 are quad diagonals, which
     are never hard: a diagonal breaking is a triangulation artifact showing
     through the paint. */
  const vn = new Float64Array(R * C * 18);
  const slot = new Int32Array(6);
  const par = new Int32Array(6);
  const find = (x) => { while (par[x] !== x) x = par[x] = par[par[x]]; return x; };
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const q = (a, b, t) => (a >= 0 && a < QR && b >= 0 && b < QC ? (a * QC + b) * 6 + t * 3 : -1);
      slot[0] = q(i - 1, j - 1, 1); slot[1] = q(i, j - 1, 0); slot[2] = q(i, j - 1, 1);
      slot[3] = q(i, j, 0); slot[4] = q(i - 1, j, 1); slot[5] = q(i - 1, j, 0);
      const hr = onLine(hardR, r0 + i, c0 + j), hc = onLine(hardC, c0 + j, r0 + i);
      for (let k = 0; k < 6; k++) par[k] = k;
      const join = (a, b, hard) => {
        if (slot[a] < 0 || slot[b] < 0) return;
        if (hard && cosOf(slot[a], slot[b]) < cosL) return;
        const ra = find(a), rb = find(b);
        if (ra !== rb) par[ra] = rb;
      };
      join(0, 1, hr); join(1, 2, false); join(2, 3, hc);
      join(3, 4, hr); join(4, 5, false); join(5, 0, hc);
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

  const nt = QR * QC * 2;
  const op = new Float32Array(nt * 9), on = new Float32Array(nt * 9), ou = new Float32Array(nt * 6);
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

const panel = (rows, cols) => lib.shell(creaseLines(
  lib.loftMesh(SHELL, M.paint, { rows, cols }), SHELL, HARDR, HARDC, rows, cols));

/* One resolved ring off the master grid, so anything built against an edge
   shares its vertices exactly. */
function gridRing(rowIdx) {
  const out = [];
  for (let b = 0; b < SHELL.cols; b++) {
    const k = (rowIdx * SHELL.cols + b) * 3;
    out.push([SHELL.pts[k], SHELL.pts[k + 1], SHELL.pts[k + 2]]);
  }
  return out;
}

/* ── The nose face and its mouth ───────────────────────────────────────────
   The intake is 60 by 800 mm, exactly what the shutter part claims, and it is
   a hole in the face now rather than the gap left between three rectangles.
   The face is ONE closed-loop loft from the master grid's own row 0 outline,
   closed along the bottom, to the mouth rectangle: the annulus between them
   is the nose face and the rectangle is the aperture. Correspondence runs by
   arc-length fraction on the outline, so the quads stay even however many
   extra column lines the door grooves have pushed into row 0.

   The mouth then returns 53 mm inboard to a throat at x 2.322. That number is
   autonomy-4's: its center radar puck's front face is at x 2.3155, so the
   throat stops 6.5 mm ahead of it. Behind the throat the cavity opens on
   thermal's radiator core at x 2.2050, which spans y 0.2510 to 0.7790 and
   |z| 0.4450 and therefore covers the whole aperture: there is nothing to
   see through, and the ray sweep says so. */
const FACEX = 2.375;
const MOUTH = { y0: 0.445, y1: 0.505, hz: 0.400 };
const THROAT = { x: 2.322, y0: 0.4505, y1: 0.4995, hz: 0.390 };
const BOTN = 12;

/* walk a mouth rectangle's upper path, bottom-left up the left edge, across
   the top and down the right edge, by fraction of that path's own length */
function mouthAt(f) {
  const h = MOUTH.y1 - MOUTH.y0, w = 2 * MOUTH.hz, tot = 2 * h + w;
  let s = f * tot;
  if (s <= h) return [FACEX, MOUTH.y0 + s, -MOUTH.hz];
  s -= h;
  if (s <= w) return [FACEX, MOUTH.y1, -MOUTH.hz + s];
  s -= w;
  return [FACEX, MOUTH.y1 - Math.min(s, h), MOUTH.hz];
}
/* the same point on the throat rim, scaled about the mouth's own center, so
   the two loops share their corners exactly and the joint cannot open */
const throatOf = ([, y, z]) => [
  THROAT.x,
  0.475 + (y - 0.475) * ((THROAT.y1 - THROAT.y0) / (MOUTH.y1 - MOUTH.y0)),
  z * (THROAT.hz / MOUTH.hz),
];

function noseLoops() {
  const arc = gridRing(RI(0));
  const a0 = arc[0], aN = arc[arc.length - 1];
  const outer = arc.slice();
  const L = [0];
  for (let i = 1; i < arc.length; i++) {
    L.push(L[i - 1] + Math.hypot(arc[i][0] - arc[i - 1][0], arc[i][1] - arc[i - 1][1],
                                 arc[i][2] - arc[i - 1][2]));
  }
  const tot = L[L.length - 1];
  const inner = arc.map((p, i) => mouthAt(L[i] / tot));
  for (let k = 1; k <= BOTN; k++) {
    const t = k / (BOTN + 1);
    outer.push([aN[0] * (1 - t) + a0[0] * t, aN[1] * (1 - t) + a0[1] * t,
                aN[2] * (1 - t) + a0[2] * t]);
    inner.push([FACEX, MOUTH.y0, MOUTH.hz * (1 - 2 * t)]);
  }
  return [outer, inner];
}

/* Conformal window band on a truncation face: the outline follows the ring's
   own half-width at each height, so the band is a shape cut from the face
   rather than a rectangle laid over it, which is what "one conformal window"
   has always meant on this part. Four rows give a back edge buried in the
   face, a lit rim and a proud front. */
function lightBand(xb, xf, prof, y0, y1, inset, mat) {
  const N = 15;
  const edge = (y, ins, x) => {
    const hz = Math.max(0.02, halfWidth(prof, y) - ins);
    const p = [];
    for (let i = 0; i < N; i++) p.push([x, y, -hz + (2 * hz * i) / (N - 1)]);
    return p;
  };
  return lib.crease(lib.loft([
    edge(y0, inset + 0.004, xb), edge(y0, inset, xf),
    edge(y1, inset, xf), edge(y1, inset + 0.004, xb),
  ], mat), 34);
}

/* ── The glass band ────────────────────────────────────────────────────────
   Its own grid, subdivided the same way, with the roof shoulder declared.
   Local columns 1 and 5 are ring points 4 and 8, the line where the near-flat
   roof band starts, and they are the only lines on this surface that carry a
   feature. */
const GLASS = lib.loftGrid(glassBand, { rowSub: 2, colSub: 2, interp: 'linear' });
const GHARDC = new Map();
for (const c of [1, 5]) declare(GHARDC, GLASS.colIndex(c), 0, GLASS.rows - 1);

function glassEdge(colIdx) {
  const out = [];
  for (let a = 0; a < GLASS.rows; a++) {
    const k = (a * GLASS.cols + colIdx) * 3;
    out.push([GLASS.pts[k], GLASS.pts[k + 1], GLASS.pts[k + 2]]);
  }
  return out;
}

/* The marque, and the only one on the car: a sealed nose carrying a
   full-width light band has nowhere honest to put a second. */
const CHEVRON = [
  [-0.045, 0.000], [-0.017, -0.019], [0.000, -0.007], [0.017, -0.019],
  [0.045, 0.000], [0.017, 0.019], [0.000, 0.007], [-0.017, 0.019],
];

/* ── The active hardware ───────────────────────────────────────────────────

   KAMM FLAP. Hinge station x -2.146, where the deck crown is y 0.9616 and
   the deck is 0.360 half-wide 21 mm below it. Chord 0.205 m descending aft at
   0.185 rad, which is the deck's own 0.342 rad slope less 0.157 rad of
   deployment: 9 of 16 degrees, mid-map, because the whole argument of this
   generation is that no single position is the design position. The blade is
   a closed tapered section swept across the span with a real end cap and an
   end fence at each tip, and the tube, the two brackets a side, the two
   drives and the encoder are every one seated through surfaceY at their own
   |z| so they stand ON the deck instead of near it.

   ARCH LOUVERS. Pivot plane |z| 0.956, carried, and the clearance it buys is
   measured: wheels-3's front corner sweeps to |z| 0.9210 under
   suspension-4's +-3 degrees and the blades' inboard faces reach 0.9412, so
   20.2 mm. Each blade stops 8 mm under bottomY(x) so the bank is the crescent
   its own text describes, and the closeout runs from the arch lip at
   halfWidth(x, bottomY(x)) out to the pivot plane and is what the bank hangs
   from.

   SHUTTERS. Drawn at 0.45 rad of a 0 to 90 degree travel, which leaves
   2.7 mm between slats at a 15 mm pitch. End plates at |z| 0.391 are inside
   the 0.400 mouth, the cranks and the link bar are inboard of them at 0.340
   where the aperture shows them, and the two direct-drive heads are coaxial
   with the second slat.

   STRAKES. The crank arms reached x 1.335 and the torque tube sat at 1.355 on
   a 9 mm radius, so they missed each other by 11 mm. Tube and cranks are on
   one axis at (1.335, 0.1385) now, clear of battery-3's forwardmost vertex at
   x 1.300, and every blade carries three pillow blocks on its own pivot line
   sized to stop at the blade's top edge rather than enter the pack floor. */

const LZ = 0.956;                             /* louver pivot plane */
const CO_Z = LZ - 0.002;                      /* closeout outboard edge */
const LSET = 0.52;                            /* blade angle, 30 of 50 deg */
const LDEPTH = 0.150;                         /* crescent band depth */
const BANKS = [[1.762, 4], [1.012, 5]];       /* leading and trailing crescents */
const LPITCH = 0.055;

const FSET = 0.185;                           /* flap deployment angle */
const FCH = 0.205;                            /* flap chord */
const FCX = Math.cos(FSET), FCY = Math.sin(FSET);
const FY = crownAt(HINGEX) + 0.014;           /* chord line at the root */
const FDOWN = [FCY, -FCX];

/* A fitting seated on the deck at its own |z|: the bottom face lies ON
   surfaceY and is tilted onto the deck's own longitudinal slope, which at
   this station is 0.342 rad. A box seated from a plane through the crown
   instead buries its forward corner by 11 mm and floats its aft one, because
   the deck falls 3.6 mm over every 10 mm of length here. */
function deckSeat(w, d, c, mat, hz, s, top) {
  const dy = surfaceY(HINGEX, hz);
  const t = Math.atan2(surfaceY(HINGEX + 0.012, hz) - surfaceY(HINGEX - 0.012, hz), 0.024);
  const h = (top - dy) / Math.cos(t);
  return acbox(w, h, d, c, mat,
               HINGEX - (h / 2) * Math.sin(t), dy + (h / 2) * Math.cos(t), s * hz, t);
}

export function build() {
  const sys = new THREE.Group();
  buildStructure(sys);
  buildShell(sys);
  return sys;
}

/* ── the invariant structure: body.js's coordinates to the digit, with every
   box chamfered. A chamfer moves no face center and costs 32 triangles. ── */
function buildStructure(sys) {
  const fc = lib.part('front-casting', [0.85, -0.35, 0]);
  for (const s of [-1, 1]) {
    fc.add(acbox(0.51, 0.28, 0.24, 0.012, M.castAlu, 1.805, 0.44, s * 0.475));
    fc.add(acbox(0.20, 0.16, 0.15, 0.010, M.castAlu, 1.65, 0.66, s * 0.535));
    const rib = lib.fins(0.45, 0.045, 0.20, 4, 0.012, M.castAlu);
    rib.position.set(1.805, 0.60, s * 0.475);
    fc.add(rib);
  }
  /* The cross portion is a lower crossmember at the casting's front face,
     x 2.000 to 2.070, y 0.300 to 0.370, not a block filling the nose. It
     used to be one 0.31 x 0.28 x 0.68 solid spanning x 1.760 to 2.070 over
     the full 280 mm section height, which is 0.0590 m3 of drawn aluminum,
     159 kg at 2,700 kg/m3, against a part that declares 48 kg for the whole
     casting. The bay it filled is where every thermal variant packages its
     chiller, manifold, pumps and heat pump, so the model was drawing metal
     through the cooling pack and burying it: thermal/chiller measured 95.9
     percent enclosed, thermal/manifold 70.9, thermal/fans 67.5,
     thermal-6/pressure-set 93.0. Opening the bay is the honest drawing and
     it retires thermal/manifold and thermal-6/glycol-loop outright and takes
     thermal-6/pressure-set from 60.0 to 45.0 mm, thermal/fans and
     thermal-6/radiator from 48.0 to 33.0, with no pair anywhere getting
     deeper. */
  fc.add(acbox(0.07, 0.07, 0.68, 0.010, M.castAlu, 2.035, 0.335, 0));
  sys.add(fc);

  const rc = lib.part('rear-casting', [-0.85, -0.35, 0]);
  for (const s of [-1, 1]) {
    rc.add(acbox(0.45, 0.28, 0.24, 0.012, M.castAlu, -1.825, 0.44, s * 0.475));
    rc.add(acbox(0.18, 0.16, 0.15, 0.010, M.castAlu, -1.70, 0.66, s * 0.535));
    const rib = lib.fins(0.40, 0.045, 0.20, 4, 0.012, M.castAlu);
    rib.position.set(-1.825, 0.60, s * 0.475);
    rc.add(rib);
    rc.add(acbox(0.17, 0.09, 0.09, 0.008, M.alu, -2.145, 0.55, s * 0.42));
  }
  rc.add(acbox(0.23, 0.28, 0.68, 0.014, M.castAlu, -1.935, 0.44, 0));
  rc.add(acbox(0.06, 0.10, 1.25, 0.008, M.alu, -2.25, 0.55, 0));
  sys.add(rc);

  const rails = lib.part('crash-rails', [0.95, -0.05, 0]);
  for (const s of [-1, 1]) {
    rails.add(acbox(0.54, 0.09, 0.09, 0.008, M.alu, 1.97, 0.55, s * 0.55));
    rails.add(acbox(0.02, 0.15, 0.12, 0.005, M.alu, 1.71, 0.55, s * 0.535));
  }
  rails.add(acbox(0.06, 0.10, 1.30, 0.008, M.alu, 2.24, 0.55, 0));
  sys.add(rails);

  const rockL = lib.part('rockers', [0, -0.5, 0.3]);
  rockL.add(acbox(2.02, 0.10, 0.07, 0.008, M.paintDark, 0, 0.37, 0.88));
  sys.add(rockL);
  sys.add(mirrorZ(rockL));

  /* ── the cage. body.js's members, rerouted onto THIS loft.

     The Gen 1 cage was drawn for Gen 1's boxier shell and every ladder body
     since has carried it unchanged, so on the monoform it stands outside the
     bodywork in three places, all of them measured off the built surface:

       B-pillar     the foot at (0.02, 0.44, 0.900) reaches |z| 0.942 where
                    the flank measures 0.9279, and the straight run up to
                    (0.02, 1.40, 0.620) reaches 0.8717 at y 1.079 against a
                    painted surface 0.7887 wide: 83 mm outside the door skin,
                    exactly where the center shutline is.
       C-pillar     (-1.45, 1.00, 0.700) reaches 0.742 against 0.7290.
       roof rail    (-0.55, 1.42, 0.615) sits 21 mm above the roof crown at
                    that station, and the C-pillar's forward run carries on
                    over the glass: from above, three black tubes lie on top
                    of the canopy instead of under it.

     Every node is now derived from the surface it has to sit under rather
     than remembered: railY solves for the height at which a tube of radius r
     clears the GLASS at its own |z|, and pillZ for the half-width at which it
     clears the PAINT at its own height. Nothing else about the cage moves:
     same members, same 42 mm section, same feet on the rocker and the rear
     casting boss, same load path. This is the routing fix body-8 made to its
     own C-pillar for the same reason, applied to the two members that need it
     on this shell.

     WHAT IT DOES NOT FIX, measured by one method run over both builds: every
     cage vertex against the ring polygon at its own x, paint below ring 3 and
     glass above it. Before, 468 of 1,503 vertices were outside it and the
     worst was 93.0 mm. After, 52 of 2,631, and the worst is 10.4 mm at
     (-1.011, 1.212, 0.600). The residue is not the nodes, which all sit
     54.0 mm under the glass by construction: it is that lib.tube runs a
     Catmull-Rom through them and the curve bulges between unevenly spaced
     control points. Sampled every 60th of its length the C-pillar centerline
     still clears the glass by 46.6 mm at its worst against a 42 mm tube, so
     closing the last centimeter means more nodes on the run, not a different
     solve.

     The glass band is the loft offset 8 mm in y and 1.2 percent in z, so the
     roof height at a given |z| is surfaceY(x, |z| / 1.012) + 0.008. ── */
  const glassY = (x, hz) => surfaceY(x, hz / 1.012) + 0.008;
  const railY = (x, hz, r) => glassY(x, hz) - r - 0.012;
  const pillZ = (x, y, r) => halfWidth(x, y) - r - 0.020;
  const RZ = 0.615, RR = 0.042;
  const cageSide = lib.part('pillars', [0, 0.32, 0]);
  const members = [
    /* A-pillar: its foot is 120 mm inside the flank already and is carried */
    [[0.85, 0.95, 0.72], [0.60, 1.20, pillZ(0.60, 1.20, RR)],
     [0.35, railY(0.35, RZ, RR), RZ]],
    /* roof rail */
    [[0.35, railY(0.35, RZ, RR), RZ], [-0.10, railY(-0.10, RZ, RR), RZ],
     [-0.55, railY(-0.55, RZ, RR), RZ]],
    /* B-pillar, following the shoulder it used to cut through */
    [[0.02, 0.44, pillZ(0.02, 0.44, RR)], [0.02, 0.92, pillZ(0.02, 0.92, RR)],
     [0.02, 1.00, pillZ(0.02, 1.00, RR)], [0.02, 1.08, pillZ(0.02, 1.08, RR)],
     [0.02, 1.20, pillZ(0.02, 1.20, RR)], [0.02, railY(0.02, RZ, RR), RZ]],
    /* C-pillar, from the roof rail down to the casting boss */
    [[-0.55, railY(-0.55, RZ, RR), RZ], [-0.95, railY(-0.95, 0.570, RR), 0.570],
     [-1.30, Math.min(1.05, railY(-1.30, 0.600, RR)), 0.600],
     [-1.45, 1.00, pillZ(-1.45, 1.00, RR) - 0.030], [-1.60, 0.90, 0.730],
     [-1.72, 0.82, 0.76]],
  ];
  for (const m of members) cageSide.add(lib.tube(m, 0.042, M.darkSteel));
  /* head-impact pad on the roof rail's inner face, 7 mm off the head */
  cageSide.add(acbox(0.80, 0.016, 0.015, 0.003, M.plastic, -0.10, 1.378, 0.5725));
  sys.add(cageSide);
  sys.add(mirrorZ(cageSide));

  /* the two roof headers and the cowl beam. The headers take the roof rail's
     own derived height at their own |z| so they cannot rise out of the glass
     the rails were just tucked under; the cowl beam is 135 mm inside the
     flank already and is carried. */
  const cageMid = lib.part('pillars', [0, 0.32, 0]);
  for (const [hx, hz] of [[0.35, RZ], [-0.55, RZ]]) {
    const hy = railY(hx, hz, 0.040);
    cageMid.add(lib.tube([[hx, hy, -hz], [hx, hy, hz]], 0.04, M.darkSteel));
  }
  cageMid.add(lib.tube([[0.85, 0.93, -0.72], [0.85, 0.93, 0.72]], 0.04, M.darkSteel));
  sys.add(cageMid);
}

function buildShell(sys) {
  /* ── monoform skin: the master surface everywhere a door does not open,
     plus both truncation faces built off its own edge rings ── */
  const skin = lib.part('skin', [0, 0.62, 0]);
  skin.add(panel([RI(0), CUT[0]], FL));               /* forward fixed flank */
  skin.add(panel([RI(0), CUT[0]], FR));
  skin.add(panel([CUT[2], RI(LAST)], FL));            /* rear quarter */
  skin.add(panel([CUT[2], RI(LAST)], FR));            /* and the charge door */
  skin.add(panel([CUT[0], CUT[2]], SILLL));           /* sill band under the cuts */
  skin.add(panel([CUT[0], CUT[2]], SILLR));
  const [nOut, nIn] = noseLoops();
  skin.add(lib.shell(lib.crease(lib.loft([nOut, nIn], M.paint, true), 34)));
  skin.add(lib.shell(lib.crease(lib.loft([nIn, nIn.map(throatOf)], M.paint, true), 34)));
  skin.add(lib.shell(lib.crease(endCap(gridRing(RI(LAST)), 0.004, M.paint), 34)));
  skin.add(lib.shell(capCenter(gridRing(RI(LAST)), 0.004, M.paint)));
  /* The marque on the Kamm face. Depth is set by the panel and not by taste:
     the cap is a shallow cone rather than a plane, so it is swept over the
     badge's own 90 by 38 mm footprint and the back face is set inside the
     deepest point of it. */
  const mark = lib.badge(CHEVRON, 0.0045, M.alu);
  mark.rotation.y = -Math.PI / 2;
  mark.position.set(-2.3705, 0.700, 0);
  skin.add(mark);
  sys.add(skin);

  /* ── THE TWO LIDS. Same part id, so the skin stays one clickable thing and
     the mass ledger does not move; a different group, because a closure is a
     rigid body and the viewer transforms groups. Same panel() call, same
     arguments, same vertices: both decks were ALREADY exactly one mesh cut on
     grid lines, so this is a change of owner and nothing else, which is what
     tools/geohash.sh --soup is there to prove. ── */
  const hood = lib.hinge(lib.part('skin', [0, 0.62, 0]), 'hood');
  hood.add(panel([RI(0), RI(COWL)], UP));             /* nose deck to the cowl */
  sys.add(hood);
  const lid = lib.hinge(lib.part('skin', [0, 0.62, 0]), 'decklid');
  lid.add(panel([RI(DECK), RI(LAST)], UP));           /* tail deck, flap relief */
  sys.add(lid);

  /* ── glass canopy band, lofted 8 mm proud of the same stations, with the
     roof shoulder declared and a dark reveal down each beltline edge. The
     reveal is what gives the glass an edge: a material boundary with no
     geometry on it reads as a decal at any distance. ── */
  const canopy = lib.part('canopy', [0, 1.05, 0]);
  canopy.add(lib.shell(creaseLines(lib.loftMesh(GLASS, M.glass, {}), GLASS,
    new Map(), GHARDC, [0, GLASS.rows - 1], [0, GLASS.cols - 1])));
  for (const c of [0, GLASS.cols - 1]) {
    const e = glassEdge(c);
    canopy.add(lib.shell(lib.crease(lib.loft(
      [e, e.map(([x, y, z]) => [x, y - 0.012, z * 0.984])], M.paintDark), 34)));
  }
  sys.add(canopy);

  /* ── light bands closing both faces, conformal to the ring outline they sit
     in. autonomy-4's flash lidar shares the front window and wants
     |z| 0.3396: the band holds that out to y 0.6303, above which the nose
     face itself is narrower than the lidar aperture. ── */
  const lbF = lib.part('lightbands', [1.15, 0.1, 0]);
  lbF.add(lightBand(2.3735, 2.3775, 2.375, 0.5750, 0.6390, 0.012, M.lamp));
  sys.add(lbF);
  const lbR = lib.part('lightbands', [-1.15, 0.1, 0]);
  lbR.add(lightBand(-2.3725, -2.3765, -2.375, 0.7750, 0.8250, 0.012, M.lampRed));
  sys.add(lbR);

  /* ── flush doors: the master surface between two cuts, so a closed door
     restores the loft exactly and the pass criterion is an unbroken highlight
     rather than a measured gap. Each skin carries the far wall and lip of the
     cut ahead of it and the near lip, wall and floor of the cut behind, so
     the channel between two panels is closed. ── */
  /* ONE GROUP PER LEAF, plus a third that does not move. Same meshes at the
     same coordinates; what changed is which group owns them, because a
     closure is a rigid body and cannot be a slice of a larger group. The
     capacitive strip is a door handle and travels with its door; the camera
     stalk and pod at x 1.020 are ahead of the front shutline on the fixed
     A-pillar strip, so they keep the part id and carry no hinge. */
  const leaf = (id, rows, stripX) => {
    const g = lib.hinge(lib.part('doors', [0.08, 0, 0.85]), id);
    g.add(panel(rows, DOORBAND));
    g.add(acbox(0.14, 0.024, 0.012, 0.0018, M.alu, stripX, 0.800,
                halfWidth(stripX, 0.800) + 0.007));
    /* THE SURROUND CAMERA IS THIS BODY'S, seated on this body's own surface.
       It used to be autonomy-4's, placed at an absolute |z| that could not be
       right on more than one body: measured, the same coordinate stood 11.70
       mm proud of body-4 and body-6's door skin and 71.5 mm proud of body-7,
       -8 and -9's, so on the flat-flank bodies it floated clear of the panel
       it was bolted to. A module builds once and is shared by five bodies, so
       no coordinate it can write is right for all of them. The body is the
       only module that knows where its own flank is, which is why body-11
       already draws its own and why this one does now. Flush, 2 mm inside the
       skin, so it is a camera rather than a thing standing in the airflow. */
    if (id === 'door-front') {
      const camZ = halfWidth(0.100, 1.000);
      g.add(acbox(0.050, 0.028, 0.020, 0.004, M.sensor, 0.100, 1.000, camZ - 0.002));
      g.add(acbox(0.090, 0.020, 0.012, 0.003, M.alu, 0.060, 1.000, camZ - 0.004));
    }
    return g;
  };
  const fixed = lib.part('doors', [0.08, 0, 0.85]);
  const zr = halfWidth(1.020, 0.960);
  fixed.add(acbox(0.014, 0.012, 0.949 - zr, 0.0018, M.plastic, 1.020, 0.960, (zr + 0.949) / 2));
  fixed.add(acbox(0.05, 0.028, 0.030, 0.004, M.sensor, 1.020, 0.960, 0.964));
  for (const g of [leaf('door-front', [CUT[0], CUT[1]], 0.120),
                   leaf('door-rear', [CUT[1], CUT[2]], -0.880),
                   fixed]) {
    sys.add(g);
    sys.add(mirrorZ(g));
  }

  /* ── active Kamm flap, drawn at 9 of 16 degrees ── */
  const flap = lib.part('kamm-flap', [-1.05, 0.45, 0]);
  const chord = (f) => [HINGEX - FCH * f * FCX, FY - FCH * f * FCY];
  const SECT = [[0, 0], [0.5, 0], [1, 0], [1, 0.004], [0.5, 0.007], [0, 0.009]];
  const sect = (z) => SECT.map(([f, t]) => {
    const c = chord(f);
    return [c[0] + t * FDOWN[0], c[1] + t * FDOWN[1], z];
  });
  const ZS = [];
  for (let i = 0; i <= 10; i++) ZS.push(-FLAPZ + (2 * FLAPZ * i) / 10);
  flap.add(lib.shell(lib.crease(lib.loft(ZS.map(sect), M.paint, true), 30)));
  for (const s of [-1, 1]) {
    /* the open section end, capped off its own outline */
    const e = sect(s * FLAPZ);
    const cx = e.reduce((a, p) => a + p[0], 0) / e.length;
    const cy = e.reduce((a, p) => a + p[1], 0) / e.length;
    flap.add(lib.shell(lib.crease(lib.loft(
      [e, e.map((p) => [cx + (p[0] - cx) * 0.06, cy + (p[1] - cy) * 0.06, p[2]])],
      M.paint, true), 30)));
    /* end fence: a real flap has one, and here it also closes the wedge the
       crowned deck opens under a straight root. Sized so its forward lower
       corner clears the deck at its own |z| by 15.6 mm and its aft one by
       more, both read off surfaceY rather than assumed. */
    const mid = chord(0.5);
    const cxx = mid[0] + 0.020 * FDOWN[0] - 0.004 * FCX;
    const cyy = mid[1] + 0.020 * FDOWN[1] - 0.004 * FCY;
    flap.add(acbox(0.205, 0.020, 0.006, 0.001, M.paint, cxx, cyy, s * (FLAPZ + 0.003), FSET));
  }
  const TUBEY = FY - 0.004;
  const tube = lib.cyl(0.009, 0.74, M.darkSteel, 12);
  tube.rotation.x = Math.PI / 2;
  tube.position.set(HINGEX, TUBEY, 0);
  flap.add(tube);
  for (const s of [-1, 1]) {
    for (const bz of [0.130, 0.300]) flap.add(deckSeat(0.026, 0.024, 0.004, M.castAlu, bz, s, FY + 0.004));
    /* spindle drive coaxial with the tube, on a pedestal seated on the deck
       at its own |z|, just outboard of the flap tip at 0.363 */
    const drv = lib.cyl(0.017, 0.058, M.plastic, 14);
    drv.rotation.x = Math.PI / 2;
    drv.position.set(HINGEX, TUBEY, s * 0.398);
    flap.add(drv);
    flap.add(deckSeat(0.034, 0.044, 0.006, M.castAlu, 0.398, s, TUBEY - 0.010));
    /* 48 V lead out of the drive and straight into the deck through a
       grommet, rather than the 148 mm run the old build had at y 0.862 to
       0.941, which was entirely inside the tail: 576 triangles of cable that
       no exterior view could reach. It surfaces at the deck at its own |z|
       and stops, which is this module's convention for every supply. */
    const gz = 0.520, gy = surfaceY(HINGEX + 0.026, gz);
    flap.add(lib.tube([
      [HINGEX + 0.006, TUBEY - 0.020, s * 0.424], [HINGEX + 0.016, TUBEY - 0.044, s * 0.478],
      [HINGEX + 0.026, gy + 0.008, s * gz],
    ], 0.005, M.hv, false, 6));
  }
  /* absolute encoder, on the hinge centerline as the part's own text says and
     outboard of the drive where the deck has room for it */
  flap.add(deckSeat(0.030, 0.024, 0.0035, M.sensor, 0.452, 1,
                    surfaceY(HINGEX, 0.452) + 0.026));
  sys.add(flap);

  /* ── active front arch louvers: the Gen 3 crescents given hinges, and the
     frame that holds them ── */
  const louv = lib.part('arch-louvers', [0.45, -0.05, 0.75]);
  for (const [x0, n] of BANKS) {
    const xa = x0 - 0.030, xb = x0 + (n - 1) * LPITCH + 0.030;
    /* A CRESCENT IS A BAND THAT FOLLOWS THE ARCH, not a row of pickets on a
       common bottom line. The first pass here cut each blade to bottomY(x)
       and stopped them all at a straight y 0.335, which made the bank a
       staircase hanging 90 mm below the tire's widest point with a flat
       bottom in open air. Every blade now runs the same 150 mm from 8 mm
       under the arch lip, so the band is parallel to the opening it covers
       and its lower edge is an arc rather than a line. The arc is floored at
       y 0.360 where the arch lip comes down at the ends of each crescent, so
       the band's lowest built point is y 0.3433 against the old bank's
       0.3400: unfloored it drops to y 0.302 at the leading crescent's forward
       end and adds 33 cm2 of frontal area below y 0.34, where the widest
       thing on the car is otherwise the rocker at |z| 0.915. */
    const top = (x) => bottomY(x) - 0.008;
    const bot = (x) => Math.max(top(x) - LDEPTH, 0.360);
    for (let i = 0; i < n; i++) {
      const x = x0 + i * LPITCH;
      louv.add(acbox(0.042, LDEPTH, 0.010, 0.0015, M.plasticLt,
                     x, (top(x) + bot(x)) / 2, LZ, 0, 0, LSET));
    }
    /* the closeout: the panel that carries the bank from the arch lip out to
       the pivot plane. Its inboard edge lies exactly on the loft's lower
       edge, so the crescent is attached to the car rather than beside it.
       Its outboard edge stops at CO_Z, 2 mm inboard of the pivot plane and
       therefore inside the swept volume of the blades themselves, so the
       panel that fixes the floating bank adds no frontal area of its own. */
    const co = (x, u) => {
      const yb = bottomY(x), hz = halfWidth(x, yb);
      return [x, yb - 0.012 * u, hz + (CO_Z - hz) * u];
    };
    const sec = [], rail = [];
    for (let i = 0; i <= 8; i++) {
      const x = xa + ((xb - xa) * i) / 8, b = bot(x);
      sec.push([co(x, 0), co(x, 0.5), co(x, 1)]);
      /* the band's lower return, following the same arc as its upper edge */
      rail.push([[x, b, LZ + 0.006], [x, b - 0.012, LZ - 0.002], [x, b - 0.016, LZ - 0.020]]);
    }
    louv.add(lib.shell(lib.crease(lib.loft(sec, M.plastic), 30)));
    louv.add(lib.shell(lib.crease(lib.loft(rail, M.darkSteel), 30)));
    for (const x of [xa + 0.010, xb - 0.010]) {
      louv.add(acbox(0.014, top(x) - bot(x) + 0.012, 0.026, 0.002, M.plasticLt,
                     x, (top(x) + bot(x)) / 2, LZ - 0.010));
    }
    /* Link bar behind the blades with one crank per blade: the mechanism that
       makes a bank of blades one device, and the thing a hinged crescent has
       that a bolted spat does not. It follows the band, so it is rotated onto
       the arch's own slope over its run rather than left horizontal across a
       curved opening. Every inboard face here is held outboard of the swept
       tire: the bar and the cranks reach |z| 0.9320 against a corner that
       sweeps to 0.9210. */
    const mid = (x) => bot(x) + (top(x) - bot(x)) * 0.58;
    const bank = Math.atan2(mid(xb) - mid(xa), xb - xa);
    louv.add(acbox((xb - xa - 0.026) / Math.cos(bank), 0.012, 0.008, 0.0015, M.darkSteel,
                   (xa + xb) / 2, (mid(xa) + mid(xb)) / 2, LZ - 0.020, bank));
    for (let i = 0; i < n; i++) {
      const x = x0 + i * LPITCH;
      louv.add(acbox(0.010, 0.010, 0.022, 0.0015, M.darkSteel, x, mid(x), LZ - 0.013));
    }
    /* rotary actuator hung UNDER the closeout at the crescent's outer end,
       and two fixings seated on the closeout's own ruled surface. A frangible
       bank bolted to a liner is exactly where a real car shows a head, and it
       is the only outer surface on this body where that is true: everything
       else is bonded skin. The seat is taken from co() rather than from a
       plane through the arch lip, which is 6.6 mm above the closeout at the
       fixing's own position and would leave both heads floating. The end is chosen away from the wheel:
       at the bank's midpoint the case sat 10 mm inside the tire's swept
       solid. Measured over the whole bank, the innermost vertex lying over
       the tire disc is at |z| 0.9320, 11.0 mm outboard of the swept face. */
    const ax = x0 < P.axleF ? xa + 0.028 : xb - 0.028, ay = mid(ax);
    const act = lib.cyl(0.015, 0.044, M.plastic, 14);
    act.position.set(ax, ay, LZ - 0.034);
    louv.add(act);
    louv.add(acbox(0.034, 0.028, 0.030, 0.005, M.castAlu, ax, ay - 0.040, LZ - 0.034));
    for (const fx of [xa + 0.026, xb - 0.026]) {
      const p = co(fx, 0.55);
      const f = lib.fastener(0.0038, M.steel, 'hex');
      f.position.set(p[0], p[1], p[2]);
      louv.add(f);
    }
    /* 48 V lead up the cassette and over the arch lip, where it stops. It
       has to go UP: routed inboard at blade height it would run at |z| 0.82
       through the middle of wheels-3's front tire, which the old build did
       for 240 mm a side. */
    const lx = ax + (x0 < P.axleF ? -0.018 : 0.018), ly2 = bottomY(lx);
    louv.add(lib.tube([
      [ax, ay + 0.026, LZ - 0.038], [ax, (ay + ly2) / 2, LZ - 0.050],
      [lx, ly2 - 0.004, halfWidth(lx, ly2) - 0.008],
    ], 0.004, M.hv, false, 8));
  }
  sys.add(louv);
  sys.add(mirrorZ(louv));

  /* ── fast shutter array in the intake mouth ── */
  const shut = lib.part('shutters', [1.35, -0.1, 0]);
  const SY = [];
  for (let i = 0; i < 4; i++) SY.push(0.4525 + i * 0.015);
  for (const y of SY) {
    shut.add(acbox(0.020, 0.004, 0.770, 0.0006, M.plasticLt, 2.350, y, 0, 0.45));
  }
  for (const s of [-1, 1]) {
    shut.add(acbox(0.030, 0.062, 0.008, 0.0012, M.plastic, 2.350, 0.475, s * 0.391));
    shut.add(acbox(0.006, 0.070, 0.008, 0.0009, M.darkSteel, 2.334, 0.4755, s * 0.340));
    for (const y of SY) {
      shut.add(acbox(0.016, 0.006, 0.006, 0.0009, M.darkSteel, 2.343, y, s * 0.340));
    }
    const head = lib.cyl(0.013, 0.040, M.darkSteel, 12);
    head.rotation.x = Math.PI / 2;
    head.position.set(2.350, SY[1], s * 0.366);
    shut.add(head);
    shut.add(lib.tube([
      [2.350, SY[1], s * 0.346], [2.330, 0.492, s * 0.40], [2.290, 0.500, s * 0.44],
    ], 0.004, M.hv));
  }
  sys.add(shut);

  /* ── ride-height strakes plus the carried Gen 3 venturi lip. Six blades
     24 mm deep hang from the pack floor plane (battery-3's underside is
     y 0.130 out to |z| 0.780) and rake about X, drawn at 6 of 9 degrees. ── */
  const str = lib.part('strakes', [0, -0.62, 0]);
  const lip = lib.plate(0.26, 1.32, 0.016, 0.08, M.carbon);
  lip.position.set(2.235, 0.112, 0);          /* 110 mm gap, clear of thermalFront at y >= 0.25 */
  str.add(lib.shell(lip));
  /* Shear-away fixings on the lip's own top face. lib.plate seats a 16 mm
     plate given y 0.112 between 0.120 and 0.136, so the seating face is 0.136
     and not the 0.128 mid-plane, which would bury every head in the
     laminate. The content calls these shear-away, and a strike item that
     bolts on is where a real car shows a head. */
  for (const z of [-0.46, -0.20, 0.20, 0.46]) {
    const f = lib.fastener(0.0040, M.steel, 'hex');
    f.position.set(2.176, 0.136, z);
    str.add(f);
  }
  /* lower valance closing lip to fascia: without it the splitter reads as a
     floating plate, and on the real car this raked panel is what the lip
     bolts to. Spans the 164 mm between the lip top and the skin at y 0.30. */
  str.add(lib.shell(acbox(0.016, 0.20, 1.32, 0.002, M.carbon, 2.088, 0.216, 0, 0.22)));
  for (const s of [-1, 1]) {
    str.add(acbox(0.09, 0.19, 0.012, 0.0018, M.carbon, 2.13, 0.215, s * 0.60, 0.22));
  }
  for (const s of [-1, 1]) {
    for (const sz of [0.30, 0.50, 0.66]) {
      str.add(acbox(2.62, 0.024, 0.010, 0.0015, M.carbon, -0.02, 0.1175, s * sz, 0, s * 0.105));
      /* three pillow blocks per blade on its own pivot line, sized to stop at
         the blade's top edge so they do not enter battery-3's floor at 0.130 */
      for (const px of [-1.10, 0.00, 1.10]) {
        str.add(acbox(0.032, 0.014, 0.024, 0.002, M.darkSteel, px, 0.1225, s * sz, 0, s * 0.105));
      }
      /* crank from the blade's leading edge up to the torque tube axis */
      str.add(acbox(0.036, 0.010, 0.008, 0.0012, M.darkSteel, 1.3225, 0.128, s * sz, 0.699));
    }
    const tt = lib.cyl(0.009, 0.48, M.darkSteel, 12);
    tt.rotation.x = Math.PI / 2;
    tt.position.set(1.335, 0.1385, s * 0.46);
    str.add(tt);
    /* drive coaxial with the tube, well inboard of wheels-3's front tire,
       whose inner face measures |z| 0.7175 */
    const drv = lib.cyl(0.017, 0.052, M.plastic, 14);
    drv.rotation.x = Math.PI / 2;
    drv.position.set(1.335, 0.1385, s * 0.190);
    str.add(drv);
    str.add(acbox(0.042, 0.038, 0.034, 0.005, M.castAlu, 1.380, 0.1385, s * 0.190));
    /* 48 V lead outboard at low y, then up outside driveF's |z| 0.35 and
       inboard of the wheel band, stopping at the module boundary */
    str.add(lib.tube([
      [1.335, 0.1385, s * 0.164], [1.360, 0.155, s * 0.42], [1.350, 0.200, s * 0.60],
      [1.320, 0.300, s * 0.66], [1.310, 0.360, s * 0.66],
    ], 0.005, M.hv));
  }
  sys.add(str);
}
