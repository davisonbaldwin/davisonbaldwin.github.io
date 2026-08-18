/* Gen 8 body: the tail.

   Gen 7 narrowed the rear track to |z| 0.74 specifically so the boat tail
   could close, then carried body-7 unchanged and took no credit for aero it
   had not drawn. This module draws it. It is a deliberately narrow
   generation: one region of one part changes, everything forward of the
   B-pillar is body-7 verbatim, and each carried part says so by name.

   WHAT THE GEN 6 AUDIT LEFT ON THE TABLE. The independent aero audit
   rejected body-7's Cd 0.105 for 0.118 because the plan view does not begin
   to close until x -1.83: the haunch is pinned at 0.950 half-width, so all
   0.400 m of closure falls in the last 845 mm at plan half-angles of 21.5,
   21.8 and 33.1 degrees, and as equivalent cones 19.3, 23.3 and 27.5. Flow
   leaves a taper like that near x -1.95, so the base the wake acts on is
   about 1.21 m2 rather than the 0.291 m2 of carbon at the truncation. The
   audit also found the LENGTH adequate and the DISTRIBUTION wrong.

   THE PARTNER NUMBER, DERIVED RATHER THAN QUOTED. design/gen8.md puts
   wheels-7's rear tire face at |z| 0.8325 and asks for it to be verified.
   It is wrong, in this module's favor. 0.8325 is 0.74 plus half of a 185
   section, and wheels-7 does not fit a 185. It fits a 155/65 R20, so the
   static outer face is at 0.8175 and the cover lip at 0.8190. Swept: every
   vertex of wheels-7's built rear tire, wheel and cover rotated about the
   vertical axis through (-1.45, 0.74) through suspension-4's plus and minus
   3 degrees of rear steer reaches a maximum of |z| 0.8352, at hub height,
   307 mm fore and aft of the axle. Add body-7's own two rear-arch terms,
   8.1 mm at the liner face and 7.4 mm of liner and skin behind it, and the
   body needs 0.8507 at the tightest station. The haunch requirement falls
   from 0.950 to 0.851, 99 mm per side. suspension-4's own steered metal,
   swept the same way, reaches only 0.7608 and is not the constraint.

   THE TAIL. Closure begins at x -1.100 instead of -1.83. The haunch is
   0.880 at the rear axle and 0.866 at x -1.780, which holds 18.9 mm at the
   liner face against the swept tire where body-7 held 8.1. Overall length
   goes 5.05 to 5.15 m, all of it aft of the rear beam. Measured off the
   loft, the per-station equivalent-cone half-angles are 8.1, 10.8, 14.9,
   14.8 and 14.7 degrees against body-7's 19.3, 23.3 and 27.5. No station is
   above 15. The first two sit below the 12 degree target and that is the
   tire: a shallow station is not a separation risk, and the pin is what
   makes it shallow.

   WHAT DID NOT WORK OUT, STATED HERE RATHER THAN BURIED. Two of the brief's
   binding numbers are not delivered and both misses are geometric.

   Frontal area. The brief asks for 2.02 m2. Integrated body-7's way, the
   maximum half-width over all stations at each height, this body returns
   1.8221 m2 of silhouette above y 0.28 where the identical code returns
   1.8226 for body-7. The afterbody owns 0.00007 m2 of that integral: cap
   every station aft of x -1.100 at the maximum-section line and the answer
   moves by less than one square centimeter, because the front wheel
   fairings hold 1.000 to 1.008 half-width from y 0.28 to 0.78 and own the
   whole lower projection while the max-section ring owns everything above
   y 0.92. No tail can change that. Then the term below y 0.28 grows: on a
   1.62 m front track and a 1.48 m rear the front and rear tire bands no
   longer coincide, so their union is 225 mm per side against wheels-6's
   185, and the tire columns go 0.1036 to 0.1260 m2. A lands at 2.121,
   which is HIGHER than body-7's published 2.099. Nothing on this body got
   fatter. Put wheels-7 under body-7 and it measures 2.1216, so this tail
   is 5 square centimeters better than the body it replaces and 0.0219 m2
   worse than the number the ladder has been quoting. Almost all of that
   0.0219 is the 0.0224 of extra tire column, a Gen 7 consequence that
   arrived with wheels-7 and was never booked, and this module books it
   rather than inheriting a figure that stopped being true a generation
   ago.

   Cd. The brief asks for 0.100 and this tail delivers 0.105, which is the
   number body-7's brief asked for and its audit rejected, one generation
   late. The ledger against the audited 0.118 is on the tail-cone part and
   every line of it is named, including the two that cost counts.

   So CdA is 0.105 x 2.121 = 0.2227 against Gen 7's 0.118 x 2.094 = 0.2471,
   a 9.9 percent reduction rather than the brief's 18. On the ladder's own
   efficiency model that is 119.7 to 115.5 Wh/mi and 1,587 to 1,645 miles.
   The target was 1,800, which needs 105.6 Wh/mi on a 190 kWh pack, so the
   gap is 9.9 Wh/mi. THIS TAIL DOES NOT FINISH THE JOB and the skin part
   carries the arithmetic of what would.

   Gen 8 preset partners, every cited number derived from their GEOMETRY and
   not their prose, per design/retro-gen4.md's drift law: wheels-7 (155/65
   R20, rear centers |z| 0.74, faces 0.6625/0.8175 rear and 0.7325/0.8875
   front, cover lip 0.8190), suspension-4 (plus and minus 3 degrees of rear
   steer, rear metal swept to |z| 0.7608), drivetrain-7 (rear annulus filled
   rotor at r 0.188 to 0.233 and stator in to 0.127, both over |z| 0.636 to
   0.728, inside the gen3 contract band of r 0.155 to 0.235 at the outside
   where the body could ever reach it, corner inverters out to 0.661,
   nothing aft of x -1.730), battery-7 (floor lid y 0.31, pack rails to
   |z| 0.78, nothing aft of x -1.290), thermal-7 (nothing aft of x -1.432),
   interior-6 (rear bench, restraints and NVH), hv-4 and autonomy-4 through
   the interfaces body-7 already holds.

   Mass ledger, binding plus or minus 2 kg: 203 kg structure + 159 kg shell
   = 362 kg, against body-7's 204 + 162 = 366. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';
import { mirrorZ } from './body.js';

export const SYSTEM = {
  id: 'body-8',
  name: 'Body · Gen 8 closed tail',
  color: 0xd2ecf8,
  explode: [0, 1.7, 0],
  blurb: 'One region of one body, redrawn. Gen 7 moved the rear wheels 70 mm inboard so the tail could close and then did not close it; this is the tail. The haunch drops from 0.950 to 0.880 half-width, plan closure begins at x -1.100 instead of -1.83, and the per-station equivalent-cone half-angles fall from 19.3 / 23.3 / 27.5 to 8.1 / 10.8 / 14.9 / 14.8 / 14.7, so the flow reaches the truncation instead of leaving at x -1.95. Cd 0.118 to 0.105, and 58 miles. It misses both of its binding targets: frontal area goes UP, to 2.121, because the split track widens the tire shadow and no tail can touch the front fairings, and 1,645 miles is not 1,800. 362 kg.',
  /* THE CLOSURES, and this block records a hypothesis that did not survive
     its own sweep.

     The expectation was that this rung could still hinge the ordinary way,
     because the front fairings stand 83 mm proud of the flank here, holding
     1.008 half-width against a door band at 0.923, where body-9 flattens the
     same station to 0.925. A step ahead of the shutline ought to be somewhere
     for a leading edge to disappear into.

     It is not. Swept with a butt hinge 63 mm inside the paint at |z| 0.860,
     tools/closures.sh puts this door 36.5 mm INTO body-8/front-fairings at
     full open. The step does not swallow the edge, it stands in front of it:
     a fairing that is proud of the flank is proud of the door too, so it is
     an obstacle rather than a pocket. body-9's own numbers for the same
     inboard axis, 31.3 mm at 30 degrees and 57.8 at 67, are the same effect
     on a body that has no fairing at all, which is what makes the comparison
     honest: the fairing was never what made a conventional hinge work.

     So both doors hinge on the surface, at each leaf's own widest point, and
     the four-bar body-9 needs is needed one rung earlier than the aero
     argument suggested. What Gen 9 actually changes is the price, not the
     principle.

     THE TWO LIDS ARE THE SAME LESSON IN THE OTHER AXIS. A door is charged in
     curbside width; a hood and a decklid are charged in height, and both of
     these are charged in something else again, which is the camber of their
     own cut. The hood cambers 173.0 mm across its rear line and the decklid
     220.9 mm across its front line, and on a cut that cambered, an axis laid
     on the outboard corners where a hinge box wants to sit drives the crown
     through the fixed panel next to it: into the windshield root at 20
     degrees for the hood, over the canopy at 16 for the lid. Both axes are
     therefore carried up to the crown, which pins the hinged edge and hands
     the swing to the corners instead. That is one rule, derived twice, and
     body-9 states it once at the tail because it never cut a hood.

     Neither lid was drawn. Both shutlines have been grooved into the master
     grid since this generation cut them and the panels simply ran over the
     top, so both are a re-slice of an existing surface on lines that already
     existed, and the closed car is identical to the vertex. */
  closures: {
    'door-front': {
      name: 'Front door',
      kind: 'door',
      part: 'doors',
      mass: 8.5,
      seconds: 1.2,
      seat: 'Hinge pillar at the x 0.8487 cut, axis ON the skin at |z| 0.9230, the leaf\'s own widest point',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [0.8487, 0.700, 0.9230], deg: 67 },
      ],
      why: 'The axis sits on the paint rather than inside it, and that was a correction rather than a choice. A butt hinge 63 mm in is where every mass-produced door has put one since the war, and the fairing standing 83 mm proud ahead of the shutline looked like exactly the pocket such a hinge needs. Swept, it is not a pocket: the door goes 36.5 mm into the fairing at full open, because a surface that is proud of the flank is proud of the door as well. Moving the axis out to the leaf\'s own widest point, |z| 0.9230, turns the leading edge\'s advance into a withdrawal, and it is the same four-bar body-9 needs for a body with no fairing at all.',
      cost: [
        'The fairing that was supposed to make an ordinary hinge possible is the thing this door hits, so the hardware bill body-9 books for its flat flank is owed here too. Gen 9 changes the price of the hinge, not the principle.',
        'Sixty-seven degrees needs most of a meter of clear ground beside the car, which a 2.50 m parking stall does not have: the door reaches the line at 25 degrees.',
      ],
    },
    'door-rear': {
      name: 'Rear door',
      kind: 'door',
      part: 'doors',
      mass: 9.5,
      seconds: 1.2,
      seat: 'B-pillar hinge at the x 0.0589 cut, axis ON the skin at |z| 0.9250',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [0.0589, 0.700, 0.9250], deg: 67 },
      ],
      why: 'Front-hinged off the B-pillar, which is the ordinary arrangement and is available here because the front door\'s trailing edge covers the pillar and gives this one something to hinge from. On the inboard axis it grazed its own rocker by 0.5 mm at 42 degrees, which is the same fault as the front door two orders of magnitude smaller and is fixed by the same move outboard. The rear cut sits 110.5 mm ahead of the rear arch, so the leaf swings clear of the wheel at every angle rather than over it.',
      cost: [
        'A pillar between the two apertures is the single largest obstruction to getting into the back, and it is the thing body-9 removes by hinging this door the other way round.',
      ],
    },
    hood: {
      name: 'Hood',
      kind: 'hood',
      part: 'skin',
      mass: 9,
      seconds: 1.3,
      seat: 'Rear cut at x 1.1286, axis carried up to the crown at y 1.0560 rather than left on the outer ends at 0.8844',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [1.1282, 1.0560, 0], deg: 65 },
      ],
      why: 'A lid over a crowned deck cannot hinge on one fixed axis, and where the axis goes is decided by the camber across the cut rather than by the drawing. Measured across its own rear line this panel cambers 173.0 mm, from y 0.8844 and 0.8830 at the outboard ends up to 1.0560 at the crown. Leave the axis on the outer ends, which is where a hinge box physically wants to be, and the crown stands 173 mm above it and sweeps rearward as the nose rises: it reaches the windshield root at x 1.070 at 20 degrees and is 109 mm past it at 75. Carry the axis up to the crown, as this one does, and the trailing edge is pinned instead, and swept to 75 degrees the panel\'s rearmost point never comes forward of x 1.1261, which is 2 mm of its own shutline. That is the same correction body-9 makes at the other end of the car, and these two cuts are the two worst cambers on the ladder.\n\nTHE TRADE IS PAID AT THE OTHER END OF THE SAME CAMBER, and it is what sets the travel. With the axis on the crown the outboard corners now hang 173 mm below it and swing on that radius, so they come DOWN toward the cowl band as the nose goes up. Swept against the built car, the panel first touches body-8/skin, which is its own cowl, at 69 degrees. It opens 65. The four degrees in hand are for hardware this model does not draw: an axis on the centerline 173 mm above the panel\'s own corners is not a place a butt hinge can sit, so a real car reaches it with a pair of goosenecks carrying a virtual pivot, and the linkage needs clearance the surface does not show.\n\nREAR-HINGED RATHER THAN A CLAMSHELL, and the frunk decides it rather than taste. P.frunk is declared at x 1.78 to 2.12, the nose end of this bay, and a hinge at the rear cut opens the panel widest exactly there. A clamshell hinged at the front cut opens widest at the cowl instead, over interior-6\'s dashboard, which tops out at y 0.8408 and holds nothing; swept, it also reaches x 2.5157 at 90 degrees, 141 mm ahead of the nose face at 2.375, so it spends the ground a person has to stand on to use it. A rear hinge spends height over a parked car, and height over a parked car is free.\n\nWhat it uncovers is the skateboard dividend this module already banked and had no way to show. Rastered column by column over the panel\'s own footprint, there are 789 liters of clear space between the highest hardware and the loft above a floor at y 0.370, which is the top of the crossmember this generation cut the solid front casting block back to. P.frunk claims 92 of them. The tallest things under the hood are thermal-7\'s pack loop at y 0.8750 and its heat pump at 0.8700, and body-8\'s own front casting stops at 0.7400. There is no engine, no transmission and no accessory drive under this panel, and opening it is the only way the model can say so.',
      cost: [
        'Nine kilograms is argued rather than prorated, because the prorate is wrong by a factor of two. The skin carries 47 kg over 3.8193 m2, 12.31 kg/m2, which would book this panel at 21.4 kg; that is a body-in-white density for a part that includes bonded structure, not a panel density. The hood is 1.7399 m2 of the same 1.1 mm thin-ply, about 3.0 kg of laminate, and the other six kilograms are the inner frame that keeps a 1.09 m span flat under its own latch load, two goosenecks, two gas struts and the seal.',
        'At 65 degrees the raised nose stands 1.957 m off the ground against a parked height of 1.429. That clears a 2.03 m garage door by 73 mm, which is a number to check before this car is serviced indoors rather than after.',
        'The clearance under the closed panel is tighter than the 789 liters suggests, and the liters are the wrong number to design a latch against. Measured at the two tallest items, the loft sits 40.8 mm above thermal-7\'s pack loop and 51.3 mm above its heat pump. A hood that deflects 40 mm at the center under load, which is nothing for a 1.09 m unsupported carbon span, is a hood resting on a coolant line.',
        'The leading edge still runs at 43 degrees because thermal-7 inherits thermal-6\'s condenser inlet header at y 0.770, so the pedestrian head-impact map behind this surface is still body-7\'s extrapolation rather than a certified result. Cutting a 1.74 m2 opening into the nose deck does not change the angle, but it does mean the surface a head strikes is now a hinged panel on a latch instead of continuous bonded laminate, and that is a different crush stack than the one the extrapolation was made on.',
      ],
    },
    decklid: {
      name: 'Decklid',
      kind: 'decklid',
      part: 'tail-cone',
      mass: 6,
      seconds: 1.4,
      seat: 'Front cut at x -1.1604, axis carried up to the crown at y 1.2898; travel limited by interior-6\'s belt tower, not by the lid',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [-1.1600, 1.2898, 0], deg: -26 },
      ],
      why: 'The same rule as the hood, on the worst cut on the car. Measured across its own front line this lid cambers 220.9 mm, from y 1.0702 and 1.0689 at the outboard ends to 1.2898 at the crown. Put the axis on the outer ends and the crown, 221 mm above it, swings forward over the canopy: it crosses the glass band\'s rear edge at x -1.100 at 16 degrees and keeps going. Carry the axis up to the crown and the leading edge is pinned, and the panel\'s foremost point holds x -1.1600 to 45 degrees. body-9 reaches this same pivot to four decimals on its own grid, which is the check that matters here: Gen 9 redraws stations 3, 4 and 5 and carries this afterbody station for station, so a lid solved on either rung has to land on the same coordinates on the other, and it does.\n\nTWENTY SIX DEGREES IS NOT THIS LID\'S LIMIT, IT IS interior-6\'s, and on this body the reason is measurable rather than inferred. Swept against the built car the panel is clean to 28 degrees and strikes interior-6/restraints at 29. What it strikes was already through the surface before anything moved: at (x -1.2372, |z| 0.6454), just inboard of the lid\'s own outboard front corner, the restraints reach y 1.1723 where this deck is 1.0682, so the belt tower and its curtain rail stand 104.1 mm OUTSIDE the panel with the car shut. That is the same disagreement the canopy panel books at 98 mm from the other side, and it is the reason the checker\'s growth rule matters: a lid that starts 104 mm inside a part has almost no travel to spend before the overlap deepens. The missing thirty degrees belong to interior-6, not to this module, and no hinge drawn here recovers them.\n\nA tailgate hinged at the rear cut is geometrically available on this body and was swept rather than dismissed: it clears the kamm-flap through 90 degrees, so the 455 mm of fixed tail is not what rules it out. Height is. Rotating the whole 1.16 m panel about its far end stands it 1.822 m off the ground at 30 degrees where the front-hinged lid is at 1.579 m at 26, and it puts that panel over the head of the person loading rather than ahead of them.\n\nWhat it opens is a well this module has already called poor and can now show. Rastered over the panel footprint above a floor at y 0.426, the tail holds 932 liters of clear space, and the tallest things in it are interior-6\'s own furniture: the belt tower at 1.1723, the rear bench headrest at 1.1467 and the NVH pack at 1.1000. Below those the rear casting bond pad stops at 0.7500. With the hood\'s 789 liters that is 1,721 liters of usable volume in a car with no engine bay and no transmission tunnel, which is the argument for the skateboard stated in liters instead of in prose.',
      cost: [
        'Twenty six degrees is a shallow lid. Anything tall goes in past a panel that is still most of the way over the opening, and the fix is not in this module: the curtain rail and the belt tower have to come inboard and down before this lid can have the rest of its travel.',
        'Six kilograms is the same figure body-9 declares for the same panel, and a flat prorate would not get there: tail-cone carries 12 kg over 4.8282 m2, 2.49 kg/m2, which books this lid at 3.9 kg of laminate. The other two kilograms are the inner frame, the hinges and the struts, and stating it this way keeps the two rungs quoting one number for one part instead of two numbers for the same carbon.',
        'The lid carries no glass and this tail carries no backlight, so autonomy-4\'s rear camera is the only rearward vision whether the lid is up or down. It sits at x -2.2365 on the fixed band 73.0 mm under the deck, inside the lid\'s footprint but not on it, so it stays put and keeps looking backward while the lid is open.',
        'It opens onto a well body-8 already booked as worse than the one body-7 apologized for: 1.498 m across at x -2.15 with the floor at y 0.426. A bigger lid does not make a bigger trunk, and this one is honest about which of those two it is.',
      ],
    },
  },
  parts: {
    /* ── structure: body-7's, one member changed ─────────────────────────── */
    'front-casting': {
      name: 'Front megacasting',
      tagline: 'Carried from body-7 by drawing number, which carried it from body.js: eight generations, one part.',
      mass: 48,
      specs: [
        ['Counterpart', 'body-7 front-casting, 48 kg: identical in every coordinate'],
        ['Process', 'High-pressure die cast, vacuum assist, 6,100 t lock'],
        ['Alloy', 'AlSi10MnMg, natural aging, no quench'],
        ['Envelope', 'Spars at x 1.55 to 2.06, y 0.30 to 0.72, |z| 0.355 to 0.595'],
        ['Cooling bay', 'Open above y 0.370; Gen 8 moves nothing aft of x 2.070'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'Molten AlSi10MnMg injected at 700 degrees C under partial vacuum, filling a 1.5 m part in under 100 milliseconds and reaching strength by natural aging, because a casting this large would warp in the water quench a T6 treatment needs. It gathers the crash rails, the upper apron loads and the rocker fronts, and it stays elastic while the bolted rails ahead of it fold. Every front suspension and drive mount is machined in one fixture, so the front axle geometry hangs off a single datum.\n\nThe reason this part appears in a Gen 8 panel at all is to make the scope of the generation explicit. Gen 6 changed the cage because the cage set the roofline. Gen 7 changed the wheels because the track set the taper. Gen 8 changes the afterbody and nothing else, and the honest way to show that is to list the parts that did not move and say why they did not need to. This casting lives entirely below y 0.72 and forward of x 1.55. It is 2.65 m ahead of the first station this generation redraws.\n\nThe cross portion between the spars is the one thing that changed, ladder-wide. It was a solid block filling x 1.760 to 2.070 over the full 280 mm section height, standing in the volume every thermal variant uses for its heat pump and its lines, and it is now a lower crossmember at x 2.000 to 2.070, y 0.300 to 0.370, with the bay above it open. Every hardpoint is where it was.',
      why: 'A ladder earns its credibility by knowing which inherited part is a constraint and which is merely inherited. Renumbering a casting to make a generation look busier spends 48 kg of proven hardware and every front suspension pickup to buy nothing, and an unlimited-resources program is more prone to that error than a cost-constrained one, not less, because nothing external says no. The discipline has to be internal, and the form it takes is a spec row that says the change this generation is none.',
      fail: [
        'Gas porosity remains the process risk: trapped air becomes subsurface voids, controlled by vacuum level and caught by X-ray sampling.',
        'A crash hard enough to yield the casting writes off the shell, and the front fairings are bonded to the casting nose, so a fairing strike books a bond-line inspection as well as a panel.',
        'Every steel bolt into aluminum is a galvanic couple; the cage is hot-stamped steel and lands here through the same adhesive-and-rivet isolation the Gen 1 cage used.',
      ],
      explode: [0.85, -0.35, 0],
    },
    'rear-casting': {
      name: 'Rear megacasting',
      tagline: 'Same casting, same bond pad, and 70 mm more tail cone hanging off the back of it than body-7 asked for.',
      mass: 50,
      specs: [
        ['Counterpart', 'body-7 rear-casting, 50 kg: identical coordinates, new load case'],
        ['Envelope', 'x -1.60 to -2.05 plus rails to -2.25, y 0.30 to 0.72'],
        ['Bond pad', 'Machined face at x -2.28, y 0.45 to 0.75, |z| up to 0.45'],
        ['Cantilever aft of the rails', '525 mm (body-7: 425 mm, body-6: 95 mm)'],
        ['Blade moment', '~451 Nm at full airbrake (body-7: ~378 Nm), up 19 percent'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'The casting is the Gen 1 part: one shot replacing 79 stamped pieces, thick spring-seat bosses fed by conformal die cooling so solidification stays even and hot tears stay out of the rib junctions, short bolted rails and a beam behind it that take the low-speed hits and unbolt for repair. It carries the rear drive cradle on three bushings and reacts the rear belt and seat anchor loads. Not one coordinate moves in Gen 8.\n\nWhat changed is the lever arm, and the arithmetic goes the wrong way, which is why it is here rather than assumed. body-7 ended at x -2.675 and hung 425 mm of bonded carbon off the bolted rails at -2.25. Gen 8 ends at -2.775, so the cantilever is 525 mm. The load case that matters on a bonded arm is not force but a moving aerodynamic device, and the couple is measured to the casting rear face at x -2.05. body-7 put a 1.12 m blade at x -2.470, roughly 900 N of full-airbrake download 0.42 m out, a 378 Nm couple. Gen 8 puts a 1.02 m blade at -2.600: the span comes in because the deck under it narrowed, so the download falls to about 820 N, but it now acts 0.55 m out and the couple rises to 451 Nm. Nineteen percent more moment on the same bolt pattern, from a smaller blade. That is the honest cost of length on a cantilever and it is worth stating plainly, because the intuitive reading is that a shorter blade unloads the structure and the intuitive reading is wrong. The bolt pattern and the pad are unchanged; the preload spec and the bond-line fatigue schedule are not.',
      why: 'Length is the cheapest aerodynamic commodity on a car and the honest place to buy it is behind the crash structure, where nothing has to survive an impact. Keeping the casting where it has always been and treating everything aft of the rails as pure aerodynamic bodywork means the rear crash performance is literally the Gen 1 result, on the Gen 1 hardware, certified on the Gen 1 pulse. What body-7 could not say is what that length was worth, because its taper separated before the air ever reached the end of it. This generation can: the same casting, the same pad, 100 mm more overhang, 19 percent more moment on the bond line, and a tail that is finally attached when the air gets there.',
      fail: [
        'Hot tearing at thick-to-thin transitions is still the casting defect that matters; CT scans on a sampling plan police it.',
        'A 525 mm bonded cantilever driven by a moving aerodynamic device is exactly the joint that finds out about cure-schedule drift five years later, and it is 100 mm longer and 73 Nm harder loaded than the joint body-7 already flagged.',
        'Yield the casting and the shell is done, unchanged from Gen 1, now with a 5.15 m body to re-index afterward.',
      ],
      explode: [-0.85, -0.35, 0],
    },
    'crash-rails': {
      name: 'Crash rails and bumper beam',
      tagline: 'Carried from body-7 without a coordinate moving, and listed here so the scope of this generation is checkable.',
      mass: 14,
      specs: [
        ['Counterpart', 'body-7 crash-rails, 14 kg: identical, rails on |z| 0.550'],
        ['Section', '90 x 90 mm octagonal, 3.0 mm wall, 6082-T6'],
        ['Mean crush force', '~120 kN per rail over 230 mm'],
        ['Beam', 'x 2.21 to 2.27, 1.30 m span, carried coordinates'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'An octagonal extrusion with stamped trigger beads folds at near-constant force, and constant force is the design goal because energy is force times stroke: two rails at 120 kN over 0.23 m absorb about 55 kJ. The beam is curved in plan to cover 85 percent of vehicle width so partial-overlap hits load both rails. Everything is bolted against shear sleeves, so a moderate hit is a hand-tool repair with no jig.\n\nThe Gen 8 note is a non-event and it is worth one sentence. Lengthening a car by 100 mm at the back changes the front crash case not at all: the rails are sized by a 56 km/h offset barrier and the beam by the regulated 445 to 555 mm bumper band, and neither has any opinion about what happens 5 m behind it. What does change, and only on paper, is the rear overhang: the body now reaches 1.325 m behind the rear axle where body-7 reached 1.225, which moves the rear moment of inertia in yaw by about 2 percent. suspension-4 owns that consequence and it is inside its existing tolerance for load state.\n\nOne coordinate did move, ladder-wide, and it is not this generation\'s decision: the rails sit on |z| 0.550 rather than 0.420. A 90 mm section on 0.420 spans |z| 0.375 to 0.465 and every cooling core on the ladder reaches |z| 0.445, so the rail was drawn through 70 mm of tube bank on each side on every rung from Gen 1 to Gen 9. On 0.550 the section spans 0.505 to 0.595, clears the core by 60 mm and puts its outer wall in the same plane as the casting spar\'s outer wall. The beam is untouched at x 2.21 to 2.27.',
      why: 'Crash structure is a fuse hierarchy, and the member that yields first must be the one ahead of the megacasting, because yielding the casting ends the shell. That ordering has not changed in eight generations and no amount of aerodynamic ambition is allowed to reorder it. The one thing worth recording is the negative result: a generation that adds 100 mm of tail should check whether the front crash package noticed, and this one did check, and it did not.',
      fail: [
        'A small-overlap impact outboard of the rails bypasses them entirely, and a wheel fairing sits exactly there: it is frangible and is designed to be gone before it can lever the wheel.',
        'Chloride sitting inside the closed section corrodes unseen; drain holes and internal wax are the countermeasure.',
        'Bent rails are replaced, never straightened: work-hardened folds have already spent their ductility.',
      ],
      explode: [0.95, -0.05, 0],
    },
    rockers: {
      name: 'Rocker beams',
      tagline: 'Unchanged, and the reason the taper can start where it does: the extrusion ends 90 mm before the closure begins.',
      mass: 22,
      specs: [
        ['Counterpart', 'body-7 rockers, 22 kg: identical, and now fully clear of the taper'],
        ['Section', '100 x 70 mm, 8 chambers, outer face at |z| 0.915'],
        ['Span', 'x -1.01 to +1.01; closure begins at x -1.100'],
        ['Design case', 'Side pole, 32 km/h, 254 mm diameter'],
        ['Skin cover', '6.0 mm minimum at x 0.30, 10.0 mm at the rear end'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'The side pole test sizes any EV sill: a rigid 254 mm pole at 32 km/h puts all of its energy into a hand-width of rocker. Eight extruded chambers crush in sequence from outboard in, each web adding a step to the force curve, absorbing the hit in about 70 mm of controlled collapse; whatever remains crosses battery-7\'s crossmembers to the far rocker so both sides resist a one-sided strike. The 40 mm intrusion budget is a contract with the pack, not a body target.\n\nThe Gen 8 note is a clearance that came out right by arithmetic rather than by intent, and it is worth stating because it could easily have come out wrong. The extrusion is 2.02 m long, centered at x 0, so its rear end is at x -1.010. The plan closure begins at x -1.100. Ninety millimeters of margin, which means the whole tapering section of this body is behind the sill and no part of the taper eats into the 6 mm skin cover body-7 fought for. Had the brief asked for closure to begin at the maximum section, x -0.450, the flank would have been narrowing across the last 560 mm of a structural member whose outer face is fixed at |z| 0.915, and the cover would have gone negative at about x -0.75. The right answer would then have been to shorten the rocker, which is a pack contract, not a body decision. Closure beginning at -1.100 is not a styling station. It is the first station where the body is free.',
      why: 'The rocker is not really a body part, it is the seatbelt of the pack, and its section was sized outward from the cell map. That is why it does not move when the tail does. Recording the 90 mm is the useful work: a body generation that narrows a flank has to know exactly where the structure under that flank stops, and the failure mode is not a collision in the model, it is a 3 mm skin cover discovered at the first tooling trial.',
      fail: [
        'Intrusion past 40 mm compromises the outer cell rows and totals the pack; the body repair is the smaller half of that event.',
        'The 6 mm skin cover is a build risk carried from body-7: a rocker set 3 mm proud prints through the flank as a highlight kink running the length of the car, and there is no shim path once the skin is bonded.',
        'A curb strike can crush inner chambers invisibly; sill impacts warrant inspection even when the paint survives.',
      ],
      explode: [0, -0.5, 0.3],
    },
    cage: {
      name: 'Low safety cage',
      tagline: 'body-7\'s cage with one member changed, because the C-pillar used to end on a haunch that no longer exists.',
      mass: 69,
      specs: [
        ['Counterpart', 'body-7 cage, 70 kg: A-pillars, rails, B-pillars and bows identical'],
        ['Material', '22MnB5 hot stamped, 1,500 MPa after die quench'],
        ['Roof rails', 'y 1.296 to 1.300 at |z| 0.510, carried'],
        ['C-pillar change', 'Rear node (-1.78, 0.80, 0.740) to (-1.70, 0.66, 0.535)'],
        ['Node lands on', 'Rear casting upper boss, x -1.70, y 0.66, |z| 0.535'],
        ['Maturity', 'Production practice; the geometry is body-7\'s, one node moved'],
      ],
      how: 'Everything that made Gen 6 possible is carried without a drawing change: rails at y 1.296 to 1.300 and |z| 0.510 in a 56 mm tailored-blank section, A-pillars raked 58.9 degrees from vertical, B-pillars 110 mm shorter than the Gen 1 part, a third transverse bow at x -0.10 restoring the roof plate action that 105 mm of inboard rail movement took away, and the FMVSS 201 head pad whose inner face sits at |z| 0.467 with seven millimeters of air to the 95th percentile head shadow. Roof crush is the certified Gen 6 result and Gen 8 does nothing to the load path that produced it.\n\nOne member moves and the reason is a defect rather than an improvement opportunity. body-7 ran its C-pillar from the roof rail at (-0.48, 1.300, 0.510) through (-1.30, 1.00, 0.620) to a rear node at (-1.78, 0.80, 0.740). That node is 205 mm outboard of the nearest thing on the rear casting, which is the upper boss at (-1.70, 0.66, 0.535), so the pillar ended in bonded skin: a structural member terminating on a panel. It was invisible on body-7 because the haunch was 0.948 wide there and the pillar was comfortably inside it. On this body the loft at (-1.78, 0.80) is 0.822, so a 28 mm tube centered at 0.740 clears the skin by 54 mm and would have looked fine too. The tail did not create the problem, it exposed it. The pillar now runs through (-1.26, 1.010, 0.600) and (-1.55, 0.850, 0.596) and lands on the casting boss, so the backlight surround loads reach the casting through steel instead of through adhesive, and the member is 80 mm shorter. One kilogram out, and it is the only kilogram in this generation that comes from structure.',
      why: 'The standing rule about visual attachment is really a structural rule wearing a graphics costume: a part that touches nothing reads as floating because it IS floating, and a load path that ends in a bonded panel is a load path that ends in a creep test. Finding it took sweeping the cage nodes against the loft rather than looking at the render, which is the same method that found body-7\'s front fairing was sized against the wrong corner of the tire. The correct response to finding a partner-facing defect in a carried part is to fix it and name it, not to carry it forward one more generation because it was not this generation\'s job.',
      fail: [
        'Martensite does not tolerate straightening: damaged members are cut out and section-replaced, and the rails are tailored blanks, so a section repair must land on the correct thickness zone or the roof-crush result is not the certified one.',
        'The new C-pillar path is 80 mm shorter and lands on aluminum rather than into a bonded panel, so it is a fresh galvanic couple at a new place; it takes the same adhesive-and-rivet isolation the rest of the cage uses, and it is a new inspection point rather than a solved problem.',
        'Hydrogen picked up in the furnace can embrittle boron steel, and a thin, highly loaded rail is less forgiving of it than the Gen 1 section was; dew point control in the line is the quiet safeguard.',
      ],
      explode: [0, 0.36, 0],
    },

    /* ── shell ──────────────────────────────────────────────────────────── */
    skin: {
      name: 'Gen 8 skin',
      tagline: 'Identical to body-7 forward of x -1.100, and the part that has to say out loud that the frontal area went the wrong way.',
      mass: 47,
      specs: [
        ['Counterpart', 'body-7 skin, 52 kg: same surface forward of x -1.100'],
        ['Construction', 'Thin-ply CFRP 1.1 mm, AFP laid, bonded to the carried cage'],
        ['Stations', '15 rings, x +2.375 to -2.775 (5.15 m), 15 points per ring'],
        ['Silhouette above y 0.28', '1.8221 m2 (body-7: 1.8226); afterbody owns 0.00007'],
        ['Frontal area', '2.121 m2 (body-7 on the same wheels: 2.1216), Cd 0.105 (0.118)'],
        ['Maturity', 'Skin pilot line; Cd 0.105 is an extrapolation, see tail cone'],
      ],
      how: 'Stations 0 to 8, from the nose face at x 2.375 to the maximum section at x -0.450, are body-7\'s numbers to the fourth decimal. The roof crown is 1.360, the beltline half-width 0.925, the tumblehome reaches 0.640 at y 1.12 and 0.550 at y 1.34, the nose still clears thermal-7\'s condenser inlet header by 43 mm and still offers autonomy-4 a 0.490 half-width at y 0.615 for its light band and lidar windows. Five kilograms come out for one reason: the flank between x -1.100 and -1.830 now belongs to the tail cone, which is about 2.2 kg of laminate, and the haunch blister and its local reinforcement are deleted, which is the rest. The flank runs straight from the maximum section into the taper with no bulge to recover from.\n\nThe frontal-area arithmetic is this part\'s unpleasant job, so it is done in full and on the same code for both bodies. Integrate the way body-7 integrates, taking the maximum half-width over all stations at each height and integrating in y above 0.28: body-7 returns 1.8226, which is the 1.822 it published, and this body returns 1.8221. The front wheel fairings hold 1.000 to 1.008 from y 0.28 to 0.78 and own 0.990 m2 of that, which is 54 percent of the silhouette from a part this generation was told not to touch; cap them at the 0.925 beltline and the integral drops 0.0650. The maximum-section ring owns 0.583 m2 above y 0.919, every square centimeter of it. The entire afterbody, every station from x -1.100 aft, owns 0.00007 m2: cap all of it at the maximum-section line and the answer moves by seven tenths of a square centimeter. That is not a failure of this tail, it is a statement about what a tail is, and wheels-7 published the same finding from the other side when it measured that capping the haunch at 0.852 moved the integral by 0.0018 m2. Then the term below y 0.28 goes the wrong way. body-7 counted two tire columns of 185 mm per side because wheels-6 put both axles on the same 1.62 m track and the shadows coincided. wheels-7 puts the front tire face at |z| 0.8875 and the rear at 0.8175, so the union is 0.6625 to 0.8875, 225 mm per side, and the columns go 0.1036 to 0.1260 m2. A is therefore 1.8221 + 0.1730 + 0.1260 = 2.121. Run the same sum on body-7 with wheels-7 under it and the answer is 2.1216, so this tail is 5 square centimeters better than the body it replaces and 0.022 m2 worse than the 2.099 the ladder has been quoting. efficiency.js carries 2.094 for a Gen 7 whose true shadow is 2.1216, and the correction belongs in the generation that measured it rather than in the one that caused it.',
      why: 'The lesson of Gen 6 was that CdA is a product and the ladder had only ever been allowed to touch one term. The lesson of Gen 8 is the corollary nobody wants: the two terms belong to different parts of the car, and an afterbody generation can only reach one of them. Everything this module does is in the coefficient. If the target is 1,800 miles it needs 105.6 Wh/mi on a 190 kWh pack, this car does 115.5, and the 9.9 Wh/mi gap has four named sources, none of them a tail. Bring the front centers to |z| 0.74 to match the rear and two things happen, and this panel originally ran them together and got both sizes wrong. Corrected against Gen 9\'s built geometry: the tire columns stand in one shadow instead of two, worth 0.0392 m2 and not the 0.0224 written here at first, because 0.0224 is the price of the SPLIT and standing two 155 mm sections in one shadow also collects the narrower tire Gen 7 paid for. That alone takes A to 2.1178 and is worth 12 miles. Redrawing the front so the fairing collapses onto the flank is worth a further 0.0763, not the 0.049 estimated here, taking A to 2.0415 and the pair to 38 miles. So the front is worth 38 of the 155 miles still missing, and the 37 this panel first quoted was the right size attached to the wrong half of the lever. Mass is worth more and costs more: rolling and stop-go together are 63.1 Wh/mi at 1,400 kg and both are linear in it, so 1,800 miles on aero alone would need 218 kg out of a car whose pack is 385. Auxiliary draw is 649 W and 14.96 Wh/mi, and 1,800 miles wants it at 222 W. Or 22 kWh more pack, 212 kWh, which is 44 kg and feeds straight back into the other two rows. That is the honest shape of the remaining problem: the tail was the last cheap lever, and everything after it is a chassis, a chemistry or a cabin argument.',
      fail: [
        'Thin-ply carbon takes barely visible impact damage: hail or a parking-garage knock can delaminate plies under paint that looks perfect, so ultrasound spot checks stay on the service schedule, carried from body-7.',
        'The hood leading edge still runs at 43 degrees because thermal-7 inherits thermal-6\'s condenser inlet header at y 0.770, so the pedestrian head-impact map is body-7\'s and is still an extrapolated rather than a certified result.',
        'A 5.15 m single highlight line with four shutlines in it is a repair problem that gets worse with length: a bonded scarf repair anywhere on the flank is judged against a reflection that runs the whole car, and this car is 100 mm longer than the one that already had the problem.',
      ],
      explode: [0, 0.62, 0],
    },
    'front-fairings': {
      name: 'Front wheel fairings',
      tagline: 'Body-7\'s surface everywhere except two louver pockets, holding a width wheels-7 already released, and that is a decision rather than an oversight.',
      mass: 11,
      specs: [
        ['Counterpart', 'body-7 front-fairings, 11 kg: same surface plus two louver recesses'],
        ['Max half-width', '1.008 at y 0.42; shoulder holds 0.942 to y 0.78'],
        ['Louver pockets', '30 mm deep at y 0.43 to 0.57, x 1.115 to 1.407 and 1.520 to 1.750'],
        ['Contained lock', '14.0 deg as drawn, a 21.4 m curb circle; the 155 section allows 17.2 and ~16.9'],
        ['Frontal area held', '0.991 m2, 54 percent of the silhouette above y 0.28, unmoved'],
        ['Maturity', 'Pilot line: enclosed steered wheels exist, not at this track'],
      ],
      how: 'The pod is body-7\'s: a flank band across three stations, a sealed inboard wall 17.5 mm inboard of the tire\'s inner face, fore and aft closeouts set from the surface at their own top edges, and a shoulder held out to y 0.76 to 0.80 because a 185-section tire carries full width to within 30 mm of its crown and the corner that touches an enclosed arch under bump is the upper outer one, not the hub-height one in plan.\n\nOne thing on it IS redrawn, and the panel that used to say "nothing here is redrawn" was carrying a defect for it. Two pockets are now cut into the flank for the arch louvers, which were drawn 1.8 mm inside this surface and invisible from every exterior camera. They are 30 mm deep and 140 mm tall at y 0.500, and the frontal-area consequence is nil rather than small: A is the widest half-width at each HEIGHT, the widest at y 0.500 is the station 4 ring at |z| 1.0015, and both pockets sit in the bays either side of station 4 with 43 and 70 mm to spare. Probed off the built mesh the surface at (1.450, 0.500) has not moved by a micron and the built silhouette of the whole body moves 0.30 cm2, all of it eight fastener heads leaving the flank. The 0.991 m2 this pod owns above y 0.28 is unchanged. The pockets do move a clearance-audited surface 30 mm inboard over two patches, and the audit that matters is on the arch-louvers panel: the innermost point the bank owns went 0.9569 to 0.9658, so it moved OUTBOARD, and the pod\'s own innermost surface over the swept band is unchanged at 0.9005. The 17.25 degree lock figure was still derived from the old surface and is now a number without a drawing.\n\nCarrying it verbatim costs something specific and the number belongs on this panel rather than in a footnote. wheels-7 fits a 155 section, so the swept corner expression becomes 0.0775 cos(d) plus 0.355 sin(d), and swept as a solid against body-7\'s built loft the pod skin clears at 17.6 degrees of lock with the arch louvers at |z| 0.9569 binding at 17.25. wheels-7 published that as released and not delivered, because the rack travel and the inner arch were both cut around 14 degrees. What it did not publish, because it was measuring lock rather than area, is the other half: hold 14 degrees and the pod could come in to 0.9711 half-width instead of 1.008, which is 0.0241 m2 of frontal area, 0.0025 of CdA, and about 22 miles. Gen 8 does not take it. The pod is forward of the B-pillar, the brief scopes this generation to the afterbody, and redrawing a fairing means re-running the swept-solid audit, the bump and camber cases, the frangibility case and the louver bank positions on a part that is currently correct. Twenty-two miles is a real number and so is the discipline of a one-region generation, and the resolution is to write the twenty-two down where the next body generation will find it rather than to spend it here badly.\n\nThe pod\'s inboard wall now starts at y 0.545, and the 210 mm of it that used to hang below that is the aperture this panel has been asking for. The wall was a flat 800 by 400 mm sheet from y 0.335 to 0.735 at 14 mm off the tire\'s inner face, and everything that lives in a front corner passes through exactly that band: the brake disc tops out at y 0.5375 and the caliper at 0.5365, the front drive unit at 0.5420, and hv-4 runs its ring bus and its 48 V zonal trunk along the floor perimeter at y 0.302 to 0.433. Swept against every part of every other module on all ten presets, the sheet was fouling thirteen of them and the ring bus read 96.80 mm. Starting the wall above the moving hardware leaves three, and the deepest of those is suspension\'s front structure at 14.93 mm where the upper arm and the damper cross, which is a tower aperture this drawing still does not have. The pod\'s outer surface is untouched and the built silhouette is unchanged to the sixth decimal: the wall was never in the shadow.\n\nThe pod end closeouts lost 25 mm off their lower edge for the same reason, and it is the same 25 mm on all three bodies that carry this pod: they now start at y 0.370 rather than 0.345, which is 7.4 mm clear of the top of hv-4\'s 6 mm ring bus at y 0.3626.',
      why: 'The front wheels are still the largest single drag item on a body this clean, and closing the arch is still worth more than any remaining surface refinement. What changed under this part is that the tire inside it got 30 mm narrower and nobody moved the pod, so it now contains more lock than its rack can command and more air than its shape needs. That is the ordinary consequence of a ladder: modules advance at different rungs and the interfaces go slack before anyone tightens them. The useful thing a body module can do about it is measure the slack precisely and refuse to pretend it is not there.',
      fail: [
        'The wall is a flat sheet with a straight lower edge, and a real wheelhouse inner needs a shaped aperture for the upright and the damper rather than a horizontal cut: suspension\'s front structure still crosses it at 14.93 mm, and that is the part of this drawing the correction did not reach.',
        'Snow chains are geometrically impossible inside a closed fairing and there is no quick-release panel; the answer is winter tires and the manual has to say so.',
        'A punctured front tire cannot be inspected without removing the fairing lower closeout, so the roadside case is a pressure sensor and a tow rather than a visual check.',
        'The pod is now oversized for the tire it encloses by 37 mm per side, so it carries frontal area it does not need and will keep carrying it until a body generation is scoped forward of the B-pillar.',
      ],
      explode: [0.35, -0.05, 0.95],
    },
    'tail-cone': {
      name: 'Closed boat tail',
      tagline: 'The generation, in one part: 1.675 m of closure where body-7 had 845 mm, and every station inside the attached limit.',
      mass: 12,
      specs: [
        ['Counterpart', 'body-7 tail-cone, 8 kg: same idea, twice the length, new numbers'],
        ['Closure begins', 'x -1.100 (body-7: -1.830), max section at -0.450'],
        ['Equivalent-cone half-angles', '8.1 / 10.8 / 14.9 / 14.8 / 14.7 deg (body-7: 19.3 / 23.3 / 27.5)'],
        ['Plan half-angles', '7.5 / 2.4 / 17.6 / 17.5 / 17.7 deg (body-7: 21.5 / 21.8 / 33.1)'],
        ['Base', '0.550 half-width, y 0.545 to 0.975, 0.3941 m2 (body-7: 0.2912)'],
        ['Maturity', 'Production practice: boat tails and Kamm truncation are old'],
      ],
      how: 'The pin is released and the measurement says by how much. wheels-7\'s rear tire is a 155/65 R20 on centers at |z| 0.74, so the static outer face is 0.8175 and the cover lip 0.8190. Sweep every vertex of its built rear corner about the vertical axis at the wheel center through suspension-4\'s plus and minus 3 degrees and the envelope peaks at |z| 0.8352, at hub height, 307 mm fore and aft of the axle rather than at the axle itself. Add body-7\'s own two arch terms, 8.1 mm at the liner face and 7.4 mm of liner and skin, and the body needs 0.8507. This tail carries 0.880 at the rear axle and 0.866 at x -1.780, and the tightest station on the whole arch, x -1.800, holds 18.9 mm at the liner face where body-7 held 8.1, and the flank is on the beltline\'s own 0.925 at x -1.100 with no haunch blister at all. Then the closure: 0.925 at -1.100, 0.880, 0.866, 0.758, 0.654, 0.550 at -2.775, with the crown falling 1.310, 1.219, 1.128, 1.072, 1.030, 0.975 and the lower edge rising 0.28, 0.28, 0.34, 0.42, 0.49, 0.545. Overall length 5.05 to 5.15 m, all of it aft of the rear beam. Ring by ring the equivalent-cone half-angles are 8.1, 10.8, 14.9, 14.8 and 14.7 degrees. Nothing is above 15. The chord from x -1.100 to the base is 12.65 degrees and, unlike body-7\'s 12.4, it now describes the stations it averages instead of hiding a 1 degree run and a 33 degree one inside itself.\n\nThree things about that tail are not what the brief expected and all three are geometry rather than judgment. First, the base does not shrink. Hold every station at or below 15 degrees of equivalent cone and the base area is not a free variable: it is 0.3941 m2, up from body-7\'s 0.2912, because a taper that stops closing when it reaches the attached limit truncates where it truncates. The base half-width is 0.550, the brief\'s number and body-7\'s number; what grew is the height, y 0.545 to 0.975 against 0.54 to 0.85. Second, the two stations over the arch run at 8.1 and 10.8 degrees rather than the 12 to 14 the brief asked for, because the swept tire holds the plan almost flat there and the only remaining closure is the deck, which is already at its own 15 degree limit. A shallow station wastes length; it does not separate. Third, and this is the residual worth stating rather than rounding, the FLANK alone runs 17.6 degrees on the last three stations. The equivalent cone stays in band because the deck and the underbody are closing at the same time, and the equivalent cone is the measure the Gen 6 audit used, but a two-dimensional plan cut at y 0.55 is steeper than the attached limit and this module does not claim otherwise. Bringing the flank to 15 degrees needs a base half-width of 0.599, which is outside the brief, or another 400 mm of car. The Cd ledger against the audited 0.118: minus 13.0 counts for an attached afterbody, which is the audit\'s own figure for the case it said body-7 failed to reach; plus 1.5 for the larger base, priced at the base coefficient the audit implies, 0.030; minus 1.5 for the rear arch closeout, which releases the cover gain wheels-7 had to cancel against an open cavity; minus 0.5 for deleting the haunch blister; plus 0.4 for 100 mm more wetted length. The diffuser is booked at zero, and that is a correction rather than an omission: the exit SPAN narrows with the tail, so the first pass debited half a count for a smaller nozzle, but measured on body-7\'s own definition of exit area, exit span times ramp rise, the longer ramp adds more rise than the taper takes span and the nozzle comes out larger, 0.217 m2 against 0.203. There is no debit to book. That is 0.1049, carried as 0.105. It is the number body-7\'s brief asked for and its audit refused, arriving one generation late, and it is five counts short of what Gen 8 was asked for. One partner does not fit the result and this module owes the statement rather than the repair: hv-4\'s charge port is drawn against the Gen 1 flank, hardware out to |z| 0.996 at x -1.98 to -1.55, and the taper takes 45 mm of half-width out from under it, so it stands 384 mm outside this loft where it stood 357 outside body-7\'s. A port on a closing flank has to move forward of x -1.100 or become a flush door in the taper, and both of those are hv-4 geometry.',
      why: 'This is the part the last two generations were built to make possible and it is worth being precise about what it proves. wheels-7 spent grip, braking and load transfer to move the rear track and then explicitly booked no aero, because the body that would collect it did not exist. It exists now, and the collection is 58 miles: 1,587 to 1,645 on the ladder\'s own efficiency model. wheels-7 predicted 69 for its own sketch and that number is arithmetically wrong rather than optimistic. Its Cd 0.107 on its A 2.097 saves 3.87 Wh/mi from 119.72, and 190 kWh divided by 115.85 Wh/mi is 1,640 miles, which is 53. This tail beats its sketch by five miles because Cd 0.105 beats 0.107 and the body is 4 kg lighter, and loses some of that back to the frontal area wheels-7 did not book. The wider lesson is about where a lever stops working. Gen 6 found that the cage owned the frontal area. Gen 7 found that the track owned the taper. Gen 8 finds that the taper owns about 10 percent of CdA and nothing else, and that after it is spent the remaining miles are in mass, in auxiliary draw and in the front axle, none of which is a body problem. A ladder is only useful if a rung is allowed to report that its lever is finished.',
      fail: [
        'A 525 mm bonded cantilever carrying an active blade is a fatigue structure and the load case is buffet, not steady flow: the acceptance test is a tunnel shake, not a static pull, and the couple it delivers to the casting is 451 Nm against body-7\'s 378.',
        'The claim that this tail stays attached rests on the equivalent cone rather than on the flank, and the flank is at 17.6 degrees. If a moving-ground tunnel finds the flank separating near x -2.3, the fix is a wider base and not more length, because the length is already past the point of diminishing return at 1.147 afterbody lengths over equivalent diameter.',
        'Trunk volume is the visible bill and it goes the wrong way in both directions at once: at x -2.15, where a load floor would want to end, this tail is 1.498 m wide against body-7\'s 1.622 and its lower edge sits at y 0.426 against 0.380, so the well loses 124 mm of width and 46 mm of depth at the same station. This is a frunk and a shallow rear well, not a wagon, and it is a smaller well than the one body-7 already apologized for.',
      ],
      explode: [-1.45, 0.30, 0],
    },
    'rear-arch-closeouts': {
      name: 'Rear wheelhouse closeouts',
      tagline: 'New part, and it exists because wheels-7 filed a defect against the body and named the generation that owed the fix.',
      mass: 4,
      count: 2,
      specs: [
        ['Counterpart', 'None. body-7 had no rear liner; the arch was an open recess'],
        ['Defect closed', 'Recess behind the aperture 113 mm (wheels-7 report) to 53.3'],
        ['Liner', 'CFRP hoop at r 0.400 about the axle, |z| 0.715 to the flank'],
        ['Lower lip', 'Turns inboard from the flank edge to 14 mm off the swept tire'],
        ['Worth', '~1.5 counts: it releases the cover gain wheels-7 had to cancel'],
        ['Maturity', 'Production practice: wheelhouse liners are universal'],
      ],
      how: 'wheels-7 booked zero aero miles for Gen 7 and showed its working. Its full wheel covers are worth about 0.0015 Cd, and against that it set a defect it had created and could not fix: pulling the rear tire face from |z| 0.9025 to 0.8175 without moving body-7\'s aperture turned a 28 mm recess into a 113 mm one, and a cavity that deep beside a rotating wheel is worth one to two counts the wrong way. It wrote that the arch closeout belongs to the body and arrives with the generation that spends the tail. This is that part. Two things do the work. The aperture itself moves: this body carries 0.880 half-width at the rear axle against body-7\'s 0.938 to 0.950, so the liner face sits at 0.8708 and the recess is 53.3 mm before anything is added. Then a liner closes what is left. It is a hoop of CFRP swept at radius 0.400 about the axle, 41.7 mm outside the tire\'s outer diameter, running from just ahead of the tire over the crown to just behind it, spanning from |z| 0.715 outboard to 6 mm inside the flank surface. Below the axle line it stops, because a wheelhouse that is closed underneath is a bucket. A lower lip runs along the flank\'s bottom edge from x -1.06 to -1.82 and turns inboard to sit 14 mm off the swept tire, which is the piece that actually stops the flank\'s lower edge feeding the cavity.\n\nThe clearances are audited against swept solids rather than single corners, which is the discipline body-7\'s front fairing had to learn the hard way. Radially the liner clears the tire by 41.7 mm at every steer angle, because rotating a wheel about a vertical axis through its own center changes a point\'s radius from the axle by less than a millimeter at 3 degrees. That 41.7 is measured against wheels-7\'s BUILT tire, whose outer diameter is 0.7166 rather than the 0.71 the packaging constant still carries; taking the constant would have reported 45 and overstated the gap by three millimeters. Over the crown the liner sits at y 0.755 and the tire tops out at 0.7133, which is the same 41.7 mm seen from above. Inboard the liner stops at |z| 0.715, which clears interior-6\'s NVH blanket at 0.7049 by 10.1 mm and stays outboard of drivetrain-7\'s corner inverters at 0.661 and its service loops at 0.644 by more than 50. Its fore end stops at 3 degrees below the axle line rather than at the horizontal, because battery-7\'s rear pack rail tops out at y 0.308 and reaches |z| 0.780, outboard of the hoop\'s inner edge, so a full half turn would have put a body panel through a pack rail by 5 mm. The lower lip is the tight one: it is set 14 mm outboard of the swept envelope in z, which measures 16.6 mm as a true three-dimensional minimum against wheels-7\'s built mesh at (-1.757, 0.320), and that number is deliberately smaller than the liner\'s because a lip is stiff in the direction that matters and a wheelhouse hoop is not.',
      why: 'The reason this is its own part rather than a detail of the skin is that it is a contract being settled. wheels-7 did the honest thing when it declined to book a gain it had canceled and instead wrote down which module owed the repair. A ladder where modules can file defects against each other and have them closed by name is worth more than a ladder where every module reports a win, and the way to make that visible in the product is to give the repair a part number, a mass and a panel. Four kilograms of liner buys back one and a half counts that were already paid for once.',
      fail: [
        'A sealed-topped wheelhouse over a wheel that pumps air needs the pumping to go somewhere, and unlike the front pods there is no louver bank here: the path is the open bottom, which means a deep-water crossing loads the liner rather than passing through it.',
        'Stone impact from the tire is continuous and directly normal to the surface: this is the one CFRP part on the car that sees gravel at 100 km/h from 45 mm away, and it takes an elastomeric sacrificial coat rather than paint.',
        'The 14 mm lower-lip clearance is against a swept envelope that assumes suspension-4 holds plus and minus 3 degrees; a rear-steer overtravel fault puts a moving tire into a bonded lip, so the actuator end stop is now a body-protecting component and belongs on the shared FMEA.',
      ],
      explode: [-0.45, -0.05, 1.15],
    },
    canopy: {
      name: 'Glass canopy band',
      tagline: 'Seven kilograms lighter because the backlight is gone: the tapering deck starts where the glass used to.',
      mass: 21,
      specs: [
        ['Counterpart', 'body-7 canopy, 28 kg: same stack, 25 percent less span'],
        ['Glazing', 'Chemically strengthened aluminosilicate, 1.1 + PVB + 0.7 mm'],
        ['Span', 'Cowl x 1.07 to x -1.100 (body-7: to -1.830)'],
        ['Roof band', 'Flat from |z| 0 to 0.55 at y 1.340 to 1.360, carried'],
        ['Rear vision', 'Backlight deleted; autonomy-4 camera and radar only'],
        ['Maturity', 'Production practice for the glass; the mirrorless case is legal in most markets, not all'],
      ],
      how: 'The band is cut from the same loft stations as the skin and carries body-7\'s stack unchanged: a 1.1 mm ion-exchanged outer ply that resists the same stone strike as 2.1 mm of annealed soda-lime, a 0.7 mm inner, an electrochromic interlayer that thermal-7 schedules between 20 and 1 percent transmittance. It also carries body-3\'s codified lesson, the near-flat roof band from the centerline out to |z| 0.55 at y 1.340 to 1.360, so the glass wraps the cage rails rather than dipping under them: rail top at 1.324 to 1.328 under a loft roof band at 1.336 to 1.339, eleven millimeters, unchanged.\n\nThe change is where it stops. body-7 ran glass to x -1.830 and called the aft section a backlight. This tail begins closing at -1.100 and the deck falls at 15 degrees from there, so what used to be a backlight is now the front of the taper, and glazing it would mean a doubly curved panel on a surface that is contracting in plan and in height at once. It is carbon instead, which is the right answer for a different reason: a rear window on a tail this shape looks at the inside of its own taper. body-7 already noted that three-quarter vision through a tapering backlight is worse than through a parallel one at exactly the angle a lane change uses, and covered it with autonomy-4\'s corner radars. Gen 8 stops hedging and deletes the window. Seven kilograms come out, the rear head-impact zones lose a glass boundary, and the car is now unambiguously dependent on its sensor suite for everything behind the B-pillar. That is a real capability change and it is not a styling decision; it is what a 14.7 degree closing cone does to a piece of glass.',
      why: 'A 92 mm lower roof has to be paid for by the occupant or it is not a real car, and body-7 showed the bill: the front seatback has to rake to 34.6 degrees against the 14.9 interior-6 draws, the rear to about 37.4 against 17.2. Gen 8 does not improve that and does not pretend to. What it changes is the rear boundary. Deleting the backlight is worth stating as an engineering choice rather than a saving, because the alternative was a glazed panel on a contracting surface, which is a tolerance problem and a distortion problem before it is a mass problem. The car that results is a two-camera car at the rear, and the honest reading is that this tail assumes the sensor suite rather than benefiting from it.',
      fail: [
        'One deep chip still condemns the band and the replacement must re-index to the loft within half a millimeter, carried from body-7 unimproved.',
        'A camera-only rear view fails differently from a mirror: a blinded lens is a blank screen and a dirty mirror is a dirty mirror, so the washer circuit for the rear camera is a safety item and its failure caps speed, which is a worse driver experience than a smeared window and a better one than a confident wrong image.',
        'This body and interior-6 still disagree by about 20 degrees of seatback at both rows, and the rear belt towers interior-6 draws stand outside this loft by 98 mm at (x -1.15, y 1.212) where they stood 107 mm outside body-7\'s; the tail improves an existing disagreement by nine millimeters, which is another way of saying it neither caused it nor fixes it, and an interior generation owes both.',
      ],
      explode: [0, 1.05, 0],
    },
    doors: {
      name: 'Flush doors and camera pods',
      tagline: 'Carried from body-7 without a millimeter moving, because every shutline on this car is forward of the closure.',
      mass: 34,
      count: 4,
      specs: [
        ['Counterpart', 'body-7 doors, 34 kg: identical, including the camera pods'],
        ['Skins', 'Thin-ply CFRP cut from the master loft, flushness +-0.25 mm'],
        ['Shutlines', 'x 0.85 / 0.06 / -0.94, cut 4.00 mm deep and 5.00 mm wide (5.04 at the front joint)'],
        ['Skin extent', 'y 0.420 to 1.020: the cut\'s own ends, sill and shoulder both'],
        ['Aperture', '844 mm height, 948 mm diagonal at the B-pillar'],
        ['Handles', 'None; capacitive strip and e-latch on hv-4\'s 48 V zonal bus'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Each skin is literally the master loft surface between two shutlines rather than a panel lying near it, and the joints are cut rather than drawn: 5 mm wide, 4 mm deep, two walls at about 71 degrees to the panel so the near lip takes a highlight and the floor goes dark. The front joint moved from the 1.06 this panel used to quote to the fairing blend-out station at 0.850, because 1.06 is on the enclosed front pod and a door leading edge cannot wrap over a wheel enclosure and still swing. The 210 mm between where the pod stops bulging at x 1.070 and the cut at 0.850 is the fairing blend-out, the band where the flank comes back from 1.006 half-width to 0.922, and it is where the hinge boxes go. Note that band belongs to the front-fairings part, not to the skin: the pod owns its own blend-out and the door\'s leading edge is that part\'s trailing edge, so there is no separately drawn strip between them and the panel gap is the only joint. The cut runs from the rocker top at y 0.42 to the beltline seam at y 1.02, and the skin is cut to exactly that: below the rocker top the flank is the outer face of a 2.02 m extrusion the pack specified, so the sill you sit on is structure rather than door skin, and it is tagged as structure. Measured off the built vertices the channel is 4.00 mm deep everywhere and 5.00 mm lip to lip at the middle and rear joints, with a 2.20 mm floor and two walls at 71 degrees. The front joint comes out at 5.04 mm, which is inside anyone\'s gap tolerance, but its section is not symmetric: the floor is 3.28 mm and the walls stand at 75 and 65 degrees rather than a matched pair. That is the price of cutting on a station line. The groove is sized in parametric half-widths from one averaged meters-per-index scale, and at station 6 the ring spacing steps from 220 mm ahead to 550 mm behind, so one number cannot describe both sides. It is worth knowing before someone cuts a 2 mm gap on a station where the step is larger. Hinges adjusted against the casting datum until a swept light line crosses all four doors without a kink, camera pods on 90 mm stalks feeding autonomy-4\'s surround model, e-latches on hv-4\'s corner zonal controllers as fused telemetered channels. The ingress bill is body-7\'s and is unchanged: the sill is where it was, the header inner edge at the B-pillar is at y 1.264 and |z| 0.484, the aperture lost 94 mm of height to the Gen 6 cage, and you sit onto the sill and swing your legs in rather than stepping into the car.\n\nThe reason this part is genuinely untouched rather than nominally untouched is worth one number. The rearmost shutline is at x -0.940 and the plan closure begins at -1.100. One hundred and sixty millimeters. Had the closure begun at the maximum section, as a uniform taper from -0.450 would want, the rear door skin would be a panel on a surface narrowing in plan through its last 490 mm, and a flush door on a contracting flank is a different tolerance problem: the shutline gap opens as a wedge under the same 0.25 mm of flushness error, because the two surfaces are no longer parallel across the joint. Closure beginning at -1.100 keeps every one of the four joints on parallel-sided bodywork, which is why the doors could be carried and why the flushness spec did not have to be reopened.',
      why: 'Doors are where a monoform admits that people exist, and the Gen 3 settlement holds: spend the tolerance budget on flushness, let the gap be what the seals need, hold the only four joints on the body side to a quarter millimeter. The Gen 8 addition is that the taper start station is now a door constraint as well as an aerodynamic one, and the two agreed. When they do not agree, on some later body, the correct order is that the joint wins, because a wedge-shaped shutline is visible from ten meters and three counts of Cd are visible on a dynamometer.',
      fail: [
        'E-latches keep their legally required mechanical release, exercised at every service because nobody touches it until the day it matters.',
        'A 948 mm aperture diagonal makes child-seat installation genuinely harder: the ISOFIX bars are unmoved but the arm reach is worse, and that is a real family-car limitation this body does not solve.',
        'Seal compression set still returns as a whistle at exactly the speed you drive daily; EPDM chemistry has ignored five design briefs in a row.',
      ],
      explode: [0.08, 0, 0.85],
    },
    lightbands: {
      name: 'Light bands',
      tagline: 'Front band carried to the millimeter because autonomy-4 builds against it; the rear band is the same 1.00 m on a taller face.',
      mass: 4,
      count: 2,
      specs: [
        ['Counterpart', 'body-7 lightbands, 4 kg: same optics, rear band restationed'],
        ['Front', '2 x 84-pixel matrix + autonomy-4 lidar windows at z +-0.30'],
        ['Held coordinates', 'Front band face x 2.371, y 0.615, half-width 0.43'],
        ['Rear', 'PMMA guide across the Kamm face at x -2.771, 1.00 m, unchanged'],
        ['Kamm face', '1.10 m wide by 430 mm tall (body-7: 1.10 by 310 mm)'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The front band is carried without a change to a single coordinate, and that is a contract rather than a convenience. autonomy-4 mounts its flash lidar pucks at (2.33, 0.615, plus or minus 0.30) and its thermal camera at (2.345, 0.53, 0), written against a band face at x 2.371, y 0.615, half-width 0.43. Gen 8 does not touch the nose, so all three still land. The rule retro-gen4 wrote after the first drift bug is to move geometry around an interface rather than moving the interface, and the cheapest way to obey it is to not go near the interface at all.\n\nThe rear band keeps its 1.00 m length, and the reason is arithmetic rather than inertia: the base half-width is 0.550 on this tail exactly as it was on body-7, so the face is still 1.10 m wide, it measures 0.548 half-width at the band\'s own height of y 0.700, and a 1.00 m guide still sits on it with 48 mm each side. What changed is the face height, 310 mm to 430 mm, because holding every station inside the attached limit truncates the tail where it truncates and the base grew upward. The band moves from y 0.700 on a face spanning 0.54 to 0.85, to y 0.700 on a face spanning 0.545 to 0.975, so it is now low on its own panel rather than central. Photometry is unaffected, since the regulated angles of visibility are measured from the lit surface and a taller face shadows nothing, and the Kamm blade above still clears the regulated angles at every deployed position, certified with the blade swept as it was on body-7.',
      why: 'A monoform still leaves nowhere else for light to live and nowhere better for a lidar: the front face is the one flat, forward, washable, heated surface on the car, sitting in the stagnation region where a window costs no drag. The rear band earns its place differently now. With the backlight deleted, the rear of this car is a carbon panel with one lit line on it, and that line is the only thing another driver can read. It is the same part it has always been and it is doing more work than it used to.',
      fail: [
        'One part per face: a parking tap costs the whole band, and at the front possibly a lidar recalibration with it.',
        'Base suction still films the rear band with road dirt and a taller base makes it slightly worse by giving the wake more panel to work on; the wash cycle stays a safety schedule.',
        'A stone star in the shared front window sits in the lidar aperture long before it bothers the human eye; the perception stack detects the scatter signature and books the glass.',
      ],
      explode: [1.15, 0.1, 0],
    },
    'kamm-flap': {
      name: 'Deployable Kamm spoiler',
      tagline: 'Carried mechanism on a narrower blade, and the answer to the obvious question is that it gained authority rather than losing it.',
      mass: 6,
      specs: [
        ['Counterpart', 'body-7 kamm-flap, 6 kg: same drives and logic, 1.02 m blade'],
        ['Blade', 'Carbon, 1.02 m span (body-7: 1.12), 200 mm chord, drawn deployed'],
        ['Travel', 'Flush to 78 mm proud, continuous; full-up airbrake'],
        ['Airbrake download', '~365 N at 130 km/h (body-7: ~400 N), a 9 percent loss'],
        ['Worth', '~2.5 counts on an attached base (body-7: <2 on a separated one)'],
        ['Maturity', 'Production practice: multi-position wings have shipped for decades'],
      ],
      how: 'Mechanism, actuation, control logic and fail position are body-7\'s, carried without a drawing change: two 48 V spindle drives on ordinary fused channels from hv-4\'s rear corner zonal controllers, continuous travel from flush to 78 mm proud, a spring return to flush because a spoiler that fails should cost counts and never control, stow below 80 km/h to restore the certified pedestrian geometry, and full-up in half a second on a hard brake-by-wire demand so the blade works as an airbrake exactly when the friction brakes want the download. The station moves from x -2.470 to -2.600 and the span comes in from 1.12 to 1.02 m, both simply following the tail.\n\nThe brief asked whether a smaller base reduces this device\'s authority, and the honest answer has two halves that point in opposite directions. The base is not smaller. Holding every station inside the attached limit put the base at 0.3941 m2 against body-7\'s 0.2912, at the same 0.550 half-width and 120 mm more height, so the area this blade works on grew by 35 percent and its drag credit goes up rather than down: about 2.5 counts against the under-2 body-7 could honestly claim, because body-7\'s blade sat inside a separated region rather than at its edge. What did shrink is the blade. The deck at x -2.600 is narrower than the base behind it, so a 1.12 m blade would overhang the bodywork it stands on by 90 mm per side, which is exactly the self-inflicted wound this generation exists to delete elsewhere. At 1.02 m the planform falls from 0.224 to 0.204 m2 and the full-up download at 130 km/h falls from roughly 400 to 365 N. That is a 9 percent loss of airbrake authority and it is a real number: the blade is the reason a threshold stop on this car stays stable, and 35 N is 35 N. Drag credit up, control authority down, and the two are not the same account.',
      why: 'A fixed truncation pays average-case drag every hour; a blade with travel buys the best case at speed, the legal case in town, and free download in the one maneuver where drag is an asset. On body-7 the aero credit had already become the smaller half of the argument. On this tail it comes back, because the device and the surface are no longer competing for the same separated air. The honest framing is that this part got better for a reason that has nothing to do with this part: it is the first generation where the flow reaching it is the flow it was designed for.',
      fail: [
        'Ice can lock the blade flush; the cold-start sweep detects the torque spike, leaves it stowed, and the range estimate explains the missing counts.',
        'Stuck deployed is the bad direction: an uncertified geometry below 80 km/h, so a second independent spring release drops the blade, and if both fail the car caps speed and says why.',
        'The blade sits on a 525 mm bonded cantilever rather than a cast deck, so strut pivot wear and cone bond fatigue share one inspection, and a narrower blade on a longer arm still hands the casting 19 percent more moment than body-7 did.',
      ],
      explode: [-0.9, 0.55, 0],
    },
    'diffuser-flap': {
      name: 'Deployable diffuser flap',
      tagline: 'Eighty millimeters more ramp and eighty millimeters less exit span, and the arithmetic of which of those wins is not the one this module first wrote down.',
      mass: 5,
      specs: [
        ['Counterpart', 'body-7 diffuser-flap, 5 kg: same hinge logic, longer and narrower'],
        ['Ramp', '0.78 m hinged at x -2.000 (body-7: 0.70 m at -1.950)'],
        ['Span', '1.16 m at the hinge to 0.90 m at the exit (body-7: 1.20 to 0.98)'],
        ['Exit area', '0.217 m2 (body-7: 0.203): exit span x rise, the ladder\'s measure'],
        ['Worth', '~6 counts net, the same as body-7; booked at zero delta'],
        ['Maturity', 'Production practice: active diffuser flaps ship in limited series'],
      ],
      how: 'The control law is body-7\'s and unchanged: pressure taps along the ramp plus suspension-4\'s ride-height signal trim the angle back the moment the expansion approaches separation, in yaw, in crosswind or over a crest, and a spring holds 13 degrees whenever power or control is in doubt, because at 13 a diffuser cannot stall, it merely earns less. Two 48 V drives on hv-4\'s rear zonal channels. The hinge moves 50 mm aft to x -2.000, still clear of P.driveR which ends at -1.80 and of drivetrain-7, whose rearmost vertex is at -1.730, and the ramp grows from 0.70 to 0.78 m. As drawn it sits at 18.0 degrees against body-7\'s 17.2, so the rise goes 207 to 241 mm over more chord, which is what keeps a steep ramp attached.\n\nThe span is where the tail sends a bill back, and this part is where the review caught the module getting the sign of that bill wrong. body-7 ran 1.20 m at the hinge to 0.98 at the exit under a tail that was 1.10 m wide at the cut. This tail is 1.588 m wide at the hinge station at floor height and has come in to 0.996 m by the ramp exit at x -2.744, so the ramp tapers 1.16 to 0.90 m: 80 mm of exit span gone. The first pass read that as a smaller nozzle and debited half a count. It is not a smaller nozzle. The measure body-6 and body-7 both used for exit area is exit span times ramp rise, and the rise grew by 34 mm while the span lost 80, so the area goes 0.203 to 0.217 m2, seven percent UP. Expansion ratio tells the same story: throat 1.16 m by the 110 mm ground gap against an exit 0.90 m by 351 mm is 2.48, where body-7 ran 2.35. So the half count comes back off the ledger and this part nets about 6 counts, the same as body-7 rather than worse than it, which also deletes the claim that the diffuser was the one device this generation made worse. What the taper genuinely takes is plan span, and that is a tunnel problem rather than a nozzle one: the twin tunnels neck 80 mm harder over the same length, so more of the underbody flow spills outboard before it reaches the ramp instead of being processed by it. That effect is real, it is not an area term, and this module does not have the resolution to price it, which is the honest reason it is booked at zero rather than at a number. Both spans stay clear of wheels-7\'s rear tire inner face at |z| 0.6625 and never approach drivetrain-7\'s rear machine, whose rotor ring runs r 0.188 to 0.233 and whose stator reaches in to 0.127, both of them between |z| 0.636 and 0.728.',
      why: 'The underbody exhaust is the last big account on the drag ledger and its optimum angle moves with speed, height and yaw, so fixing the ramp means buying the safest angle forever. Lengthening it does something the actuator cannot: it lowers the pressure gradient the flow has to climb at every angle, so the whole control range moves further from the stall line rather than just being managed better against it. Paying for that with exit area is the correct trade at this Cd, because a stalled diffuser costs its entire credit and a slightly small one costs a fraction of it, but the arithmetic is close enough that the next body generation should re-derive it rather than assume this answer carries.',
      fail: [
        'An iced or mud-blinded pressure tap forfeits the steep regime: control falls back to 13 degrees and the range estimate quietly loses the difference.',
        'The departure angle is 15.9 degrees measured from the rear contact patch, against body-7\'s 16.0, so 100 mm of extra car cost a tenth of a degree because the longer ramp also rises further; the real parking bill is the 5.15 m length and a rear overhang of 1.325 m, which is a curb-strike geometry on angled bays rather than a clearance number.',
        'Deep snow packs the expansion and the diffuser becomes a plow; rated for the load, parked at 13 by the controller, and still beyond the drag model\'s vocabulary, carried from body-7 with the same apology.',
      ],
      explode: [-1.0, -0.4, 0],
    },
    'arch-louvers': {
      name: 'Active arch louvers',
      tagline: 'The only ventilation on a car with a sealed pod at the front and a closed liner at the back, and until this pass it was drawn entirely inside the bodywork.',
      mass: 3,
      count: 2,
      specs: [
        ['Counterpart', 'body-7 arch-louvers, 3 kg: same blades and actuator, now in a recess'],
        ['Blades', '4 outlet + 3 inlet per side, one 48 V rotary actuator each bank'],
        ['Recess', '30 mm deep, 140 mm lip to lip at y 0.50; x 1.115 to 1.407 and 1.520 to 1.750'],
        ['Bank envelope', '|z| 0.9658 to 0.9991, against a body 1.0054 wide at that height'],
        ['Fail position', 'Spring open, venting the fairing'],
        ['Maturity', 'Pilot line at the fairing; the shutter mechanism is production'],
      ],
      how: 'The blades, the pivots, the single 48 V rotary actuator per bank, the eFuse current signature used as a position sensor and the cold-start sweep are body-7\'s hardware carried without a drawing change: three blades forward admit, four aft exhaust, 50 by 100 by 10 mm on a 0.3 rad set angle at 62 mm pitch, 14 mm off the pod surface on its near-vertical band at y 0.45 to 0.55. The brake-temperature model opens them and cruise closes them. The front fairing is a sealed pod around a wheel that pumps air and these two banks remain its only inlet and outlet.\n\nWHAT WAS WRONG, and it was wrong for two generations. A slat 50 mm long and 10 mm thick turned 0.3 rad about the vertical has a rotated half-depth of 12.2 mm, so a blade centered 14 mm inboard of the skin puts its outer face at halfWidth minus 1.8 mm at mid-height: behind an unbroken painted flank. Not quite all of it, and the exception is a second defect rather than a reprieve. The flank narrows 4.1 mm over the 100 mm a blade stands tall, so every blade also pushed one top corner 1.0 to 1.5 mm THROUGH the paint. Swept from 144 exterior cameras on a 6 m sphere, 0.00 of the bank\'s 829 cm2 of blade surface had open air outboard of it, and only 158 of 44,352 blade-facet camera pairs returned the bank rather than the pod skin as the first thing a ray meets. So 1,432 triangles, 7 percent of the system, rendered as a hairline scratch along one edge, and the panel could be opened only from the few angles that caught the breach. The intake gates had the same defect at the nose one pass ago, and it has the same answer: a duct behind a solid panel is a decal.\n\nWHAT IT COST TO FIX, measured rather than asserted. Two pockets are cut into the pod flank with the same groove machinery as the shutlines, so they belong to the master grid and cannot open a seam against it: measured perpendicular to the ungrooved master surface, 30.000 mm deep, 140.0 mm lip to lip and 106.0 mm across the floor, from y 0.4446 to 0.5502. The recess reads 0.0 mm at station 3, station 4 and both ring lines, so it is entirely inside its bay. What thirty millimeters is NOT is three point nine millimeters of margin on the blades, which is what a first pass claimed by comparing a depth cut along the surface normal with an offset measured in z. The flank narrows 8.6 mm over the pocket\'s height, so the floor falls from |z| 0.974 to 0.965 across it while a blade holds one |z| down its whole length: swept vertex by vertex over the built mesh the blade\'s lower inboard corner clears the floor by 0.68 mm and its upper one by 8 mm. That is a clearance and not an interference, but the number that sets it is the floor\'s slope rather than its depth, and real margin needs a deeper pocket rather than an argument from mid-height. The side frames have the same problem and it is fixed rather than stated: a box on a constant |z| buried its lower inner corner 4.1 mm in the floor and floated 4.4 mm off it at the top, so each frame is tilted onto the floor\'s own line and now touches along its whole height, 0.10 mm at the nearest vertex and nothing crossing. The same 144 cameras that found 158 blade-facet pairs before now return the bank first on 17,090 of 44,352, every one of the 308 blade facets is reachable from at least one of them, and all 829 cm2 of blade surface has open air outboard of it. The pairs that do not are cameras on the far side of the car, and they land on skin, canopy or the opposite fairing, as they should. Frontal area does not move, and the reason is geometric rather than lucky: A is the widest point at each HEIGHT, the widest point at y 0.50 is the station 4 ring at |z| 1.0015, and station 4 sits between the two recesses. The built silhouette moves 0.30 cm2, all of it the eight fastener heads coming off the flank and onto the frame faces, and the station integral is bit-identical at 1.8204886. Each bank is centered in its bay, which moves the aft one 68 mm forward and the forward one 87 mm aft of body-7\'s stations. That is not tidying: station 3 is the pod\'s leading shoulder, where the flow accelerates hardest around the widest approach on the car, and a vent mouth cut into a shoulder ingests instead of exhausting.\n\nONE PARTNER NUMBER NOW NEEDS RE-DERIVING and this part owes the statement rather than the repair. wheels-7 measured that these louvers, not the pod skin, bind the contained lock, at 17.25 degrees against the skin\'s 17.6. That audit was run against an unrecessed surface. Swept the same way over both builds, the innermost point this bank owns anywhere in the pod was |z| 0.9569 and is 0.9658, 8.9 mm further OUTBOARD, because the blocks that owned 0.9569 are gone and the frames that replace them lie on the floor. The pod\'s own innermost surface over the band a 155 section can sweep is unchanged at |z| 0.9005, which is the fairing\'s lower rail at y 0.296 and not the bank at all. So the lock cannot have got worse, but 17.25 was derived from geometry that no longer exists and the number belongs to whoever re-runs the swept solid.',
      why: 'A part that cannot be seen is not a part, it is a triangle budget with a story attached, and the discipline that catches it is the same one that caught the front splitter floating and the intake lattice buried behind its own valance: sweep the built mesh from real camera positions and count, rather than looking at a render and being satisfied. The reason this one survived two generations is that every check it was subjected to was a clearance check, and it passed all of them. Nothing was intersecting anything. It was simply inside the car. Visibility is a different predicate from clearance and it has to be run separately.\n\nThe recess is also the honest shape. A louver bank bolted flat to the outside of a body panel is a roof rack; a louver bank in a pocket with its blades flush to the flank is what every enclosed-wheel car that ever vented an arch actually built, because a proud bank in the accelerating flow over a pod is a drag item that would eat the counts the vent is there to protect. Cutting the pocket is what makes the part and its aerodynamic claim agree.',
      fail: [
        'Grit and ice in the pivots is the chronic case; the cold-start sweep catches a stiff bank and leaves it open, costing counts, never cooling.',
        'A 30 mm pocket at hub height on the widest part of the car is a stone trap and a wash-brush trap, and the blades now sit at the bottom of it: the pocket needs the same drain path as the pod and it collects what the pod used to shed.',
        'Sealing a pod around a wheel means water goes in and has to come out: a blocked drain turns the fairing into a bucket carrying 8 kg of water at the worst possible radius.',
        'The rear wheelhouse liner has no equivalent bank and no position telemetry, so a packed rear arch is invisible to the car in a way a packed front pod is not.',
      ],
      explode: [0.4, -0.05, 1.3],
    },
    'venturi-floor': {
      name: 'Sealed venturi underbody',
      tagline: 'One kilogram heavier again, for the same reason as last time: the diffuser hinge moved and the closeout had to reach it.',
      mass: 9,
      specs: [
        ['Counterpart', 'body-7 venturi-floor, 8 kg: same panels, 80 mm longer closeout'],
        ['Panels', 'Carbon closeouts, lip to pack and pack to the hinge at x -2.000'],
        ['Valance', 'Aperture 772 x 161 mm, shroud back to x 2.215 at the coil face'],
        ['Rear closeout', '0.70 m (body-7: 0.62 m, body-6: 0.45 m)'],
        ['Ground gap', '110 mm at the lip; suspension-4 holds it +-3 mm at speed'],
        ['Splitter', '1.02 m wide, carried; still 0.173 m2 of the frontal area'],
        ['Maturity', 'Production practice: sealed floors universal, tunnels in series'],
      ],
      how: 'Carried from body-7 with one panel corrected: a carbon lip at a 110 mm gap, a valance behind it so the splitter bolts to something rather than floating and now with the nose aperture actually cut in it, a front closeout bridging to battery-7\'s pack leading edge, the pack underside running to x -1.30 in the envelope battery-3 established, a rear closeout bridging to the diffuser hinge, and strakes dividing the rear run into twin tunnels so a yawed crosswind stalls one side while the other keeps pulling. suspension-4\'s air springs hold the speed-scheduled ride height to a few millimeters and cross-check its height sensors against the flap\'s pressure taps.\n\nOne number changes. The rear closeout grows from 0.62 to 0.70 m because the hinge moved from x -1.950 to -2.000, and that is the kilogram. Everything forward is untouched, including the splitter at 1.02 m, which still contributes 0.173 m2 to the frontal-area integral between y 0.11 and 0.28 and is still 8 percent of the shadow of a car whose body starts at y 0.28. What is worth recording is a term that did NOT change and should have been checked rather than assumed: the tire columns below y 0.28. Those are not this part, they belong to the wheels, but they are measured in the same integral, and on wheels-7\'s split track they went from 0.1036 to 0.1260 m2 while this floor stayed exactly where it was. The splitter cannot shadow them, because it is 1.02 m wide and they start at |z| 0.6625. Widening it to reach them would put a carbon plate outboard of the front tire in the stagnation region, which is a worse idea than the problem.\n\nThe one panel that did change is the valance, and it is a correction rather than a design move. intake-gates has said since body-7 that its bank meters "the only air admitted through the body", and this floor drew the valance as a continuous sheet, so there was no hole for the bank to meter and the lattice drawn behind it was buried 20 to 72 mm inside solid laminate. The aperture is now cut: 772 mm across by 161 mm up the valance slope, every edge inside the slat bank so the gates still cover it, with the rim carried back as a shroud to a mouth at x 2.215, 6 mm ahead of thermal-7\'s coil face, and its floor rising to y 0.256 because that is where the coil starts. Mass is unchanged at 9 kg and that is arithmetic rather than rounding: the hole removes 0.124 m2 of laminate and the shroud adds 0.205 m2 of thinner wall, about 120 grams net. Frontal area is unchanged to six decimal places, 1.840851 m2 of built silhouette above y 0.28 before and after, because the slats, the shroud and the lattice all project over the hole they open.',
      why: 'The underbody is the largest surface on the car and the only one the pack already paid to flatten, so sealing it and shaping it into tunnels remains the highest-value aero purchase at this Cd. Carrying it verbatim is the correct move for a tail generation: nothing this generation does is under the car forward of the hinge. The one thing worth saying is about the shape of the argument rather than the panel. This floor has now grown its rear closeout in three consecutive generations because the diffuser hinge keeps moving aft, and each time it has cost a kilogram and been worth it. That is a pattern rather than a coincidence, and the next generation should ask whether the hinge wants to be a station on the floor at all, or whether the floor should simply end at the pack and let the ramp be structure.',
      fail: [
        'Curbs and ramps still rake the lip first; the shear-away fasteners cost a bracket, carried through five generations because parking lots have not changed.',
        'A narrow splitter feeds a narrow stagnation region into the tunnels, so the front tunnel inlets are sensitive to yaw and the crosswind case is the one the tunnel program should re-run first, unchanged and still outstanding from body-7.',
        'Deep snow packs the tunnels and the floor becomes a plow; structurally rated, aerodynamically dead, still beyond the range model\'s vocabulary.',
      ],
      explode: [0, -0.55, 0],
    },
    'intake-gates': {
      name: 'Intake gates',
      tagline: 'Carried from body-7 unchanged, feeding a thermal system that now rejects far less heat than the nose was sized for.',
      mass: 3,
      specs: [
        ['Counterpart', 'body-7 intake-gates, 3 kg: identical bank, identical stations'],
        ['Bank', '4 slats, one 48 V actuator on hv-4\'s front zonal channels'],
        ['Aperture', '772 x 161 mm in the valance, ducted 118 mm to the coil face'],
        ['Feeds', 'thermal-7\'s stack in the untouched front zone x 2.08 to 2.26'],
        ['Cd swing', '~0.008 open to shut; shut > 90 percent of driving time'],
        ['Fail position', 'Spring open: cooling beats drag, the Gen 2 law'],
        ['Maturity', 'Production practice since the 2010s'],
      ],
      how: 'Carried without a change: a four-slat bank below the nose face metering the only air admitted through the body, ducted to thermal-7\'s radiator stack in the front zone this ladder has never moved. The thermal controller owns the position request, the aero controller is granted closure only when every thermal margin is green, and the spring fails the bank open because a stuck-shut gate on a mountain climb cooks hardware while a stuck-open one costs a count.\n\nThe Gen 8 observation is that the sizing case has drifted out from under this part and the drift is now large. The bank was sized stationary, on battery-6 rejecting a 480 kW fast-charge peak through the stack with no ram air and the fans pulling. Gen 7 replaced that pack with battery-7, which accepts a much lower C rate by design, and replaced drivetrain-6\'s 480 kW with drivetrain-7\'s 260. thermal-7 followed both down. The aperture this bank meters is therefore oversized for the worst hour it is now asked to cover, which does not cost anything while the bank is shut, and the bank is shut more than 90 percent of the time. It is the same shape of slack as the front fairing: a Gen 6 part correctly sized for a Gen 5 load, still in place two rungs later. It is written here rather than acted on, because narrowing the nose aperture is a nose change and this generation ends at x -1.100.',
      why: 'A fixed intake is sized for the worst hour and paid for every other hour, and the worst hour moved off the road when charging power passed driving power. Metering the opening per minute is what keeps the sealed-nose fiction honest. Carrying the part verbatim into a generation that redrew the whole back of the car is deliberate: the gates are correct, and the useful work here was checking whether the load behind them still justifies their aperture. It does not, by a wide margin, and that is the single cheapest frontal-area item nobody has picked up yet.',
      fail: [
        'Road grit and ice jam slat pivots; the cold-start sweep reports a stiff bank before the highway or the charger does.',
        'Stuck shut is the dangerous direction: thermal-7 sheds load, tapers power, and the car explains why.',
        'The slats live in the stone-strike zone; glass-filled polymer takes the gravel, and a cracked slat costs a cartridge swap, not a nose.',
      ],
      explode: [1.3, -0.08, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   15 loft stations, x +2.375 to -2.775 (5.15 m), 7 half-profile pairs plus a
   crown per ring, so 15 points per ring. Stations 0 to 8 are body-7's to the
   fourth decimal. Stations 9 to 14 are this generation.

   Governing numbers, all measured against the partners' BUILT geometry:

   - SWEPT REAR CORNER. wheels-7's rear tire, wheel and cover vertices,
     rotated about the vertical axis through (-1.45, 0.74) by suspension-4's
     +-3 degrees, peak at |z| 0.8352 at hub height, at x -1.143 and -1.750.
     Static face 0.8175, cover lip 0.8190. Body requirement = swept + 8.1 mm
     liner clearance + 7.4 mm liner and skin = 0.8507. suspension-4's own
     steered metal swept the same way reaches only 0.7608.
     Worst clearance on this loft: 18.9 mm at the liner face at x -1.800,
     read off the SWEEP table below as a continuum rather than at the tire
     mesh's own vertices, which report a looser 22.5 mm because they land
     either side of the tight station
     (body-7 held 8.1 mm against a 185 tire on a 1.62 m track).
     DO NOT take design/gen8.md's 0.8325 on trust: it assumes a 185 section
     and wheels-7 fits a 155/65 R20.

   - AFTERBODY. Closure begins at x -1.100. Ring areas 1.6741, 1.4583,
     1.1946, 0.8701, 0.6060, 0.3941 m2, equivalent radii 0.7300, 0.6813,
     0.6166, 0.5263, 0.4392, 0.3542, so per-station equivalent-cone
     half-angles of 8.1, 10.8, 14.9, 14.8, 14.7 degrees. None above 15.
     Chord from x -1.100 to the base 12.65 degrees, from the maximum section
     9.54. body-7: 19.3 / 23.3 / 27.5 on a 12.4 chord that described nothing.
     (body-7's own text rounds its first station to 19.1; re-measured off its
     stations the ring areas give 19.29, and geometry wins over prose.)
     Plan half-angles 7.5, 2.4, 17.6, 17.5, 17.7 (body-7: 21.5, 21.8, 33.1);
     deck angles 15.0, 15.0, 9.4, 7.3, 9.6. The flank at 17.6 is the honest
     residual: the equivalent cone is in band because the deck and underbody
     close with it, and reaching 15 in plan needs a 0.599 base half-width,
     outside the brief, or another 400 mm of car.

   - BASE. 0.550 half-width, y 0.545 to 0.975, 0.3941 m2 against body-7's
     0.2912. The base is NOT a free variable once every station is capped at
     15 degrees; it is where the taper stops being allowed to close.

   - FRONTAL AREA, integrated exactly as body-7 integrates it and on the
     same code: silhouette above y 0.28 = 1.8221, where body-7 returns
     1.8226 and publishes 1.822. The two bodies share stations 0 to 8, so
     the difference is integrable in closed form over the one band where an
     aft station is the widest, y 0.852 to 0.931, and it comes to 0.00050
     m2. Lower nose band 0.173 carried. Tire columns 0.1260 on wheels-7's
     split track, against the 0.1036 body-7 counted on wheels-6's
     coincident one. A = 2.121; body-7 on the same wheels measures 2.1216.
     Band ownership: the front fairing stations own y 0.28 to 0.844 and
     0.990 m2 of the silhouette from y 0.28 to 0.78, and capping them at
     the beltline would return 0.0650; the maximum-section ring owns
     everything above y 0.919, 0.583 m2 of it; the whole afterbody owns
     0.00007. An afterbody cannot move A.

   - Cd 0.105 from the audited 0.118: -13.0 counts attached afterbody,
     +1.5 larger base at the audit's implied base coefficient 0.030,
     -1.5 rear arch closeout, -0.5 haunch blister deleted, +0.4 wetted
     length, 0.0 diffuser (its exit area RISES 0.203 to 0.217 m2 despite
     the narrower span, so the half count the first pass debited is not
     real). 0.1049, carried as 0.105. CdA 0.2227 against Gen 7's 0.2471.

   - PARTNER CLEARANCES aft of x -1.000, from built meshes: drivetrain-7
     rotor rings to |z| 0.7280, hub bearings 0.7376, corner inverters 0.6610,
     service loops 0.6440, nothing aft of x -1.730. suspension-4
     rear-structure 0.7580, rear-steer 0.7177, dampers 0.6598. battery-7
     rocker rails 0.7800, nothing aft of -1.290. interior-6 NVH 0.7049,
     restraints 0.6940. thermal-7 nothing aft of -1.4315. The wheelhouse
     liner stops inboard at |z| 0.715, which is 10.1 mm outboard of the
     NVH blanket and more than 50 mm outboard of everything else.

   - CARRIED INTERFACES held exactly: autonomy-4's front band face at
     x 2.371, y 0.615, half-width 0.43 with lidar windows at z +-0.30;
     rockers at outer face |z| 0.915 spanning x -1.01 to +1.01, which is
     90 mm forward of where the closure begins; the cage rail tops at
     y 1.324 to 1.328 under a loft roof band at 1.336 to 1.339.

   - CARRIED CONDITIONS, present since body.js and not fixed here: the
     bumper beam's outboard corner at (2.27, 0.50, +-0.65) stands 15 mm
     outside the nose loft and overlaps thermal-7's condenser core by
     7.5 mm. interior-6's rear belt towers reach |z| 0.659 at (x -1.15,
     y 1.212) where this loft is 0.5608, so 98 mm outside the skin; the
     same towers stand 107 mm outside body-7's. Neither body fits them and
     an interior generation owes both.
     WORSENED HERE and stated rather than fixed: hv-4's charge port, a
     design/gen4.md hard point at (-1.92, 0.80, 0.88) with built hardware
     out to |z| 0.996 over x -1.982 to -1.550. The loft there falls 0.8199
     to 0.7749 as the taper passes under it, so the hard point goes from
     60 mm outside body-7's flank to 105 mm outside this one, and the port
     body itself from 357 mm to 384 mm. No tail that closes can hold 0.88
     half-width at x -1.92; the port has to move forward of x -1.100 or
     become a flush door in the taper, and both are hv-4 geometry. */

function ring(x, half, crownY) {
  const pts = [];
  for (let i = 0; i < half.length; i++) pts.push([x, half[i][0], -half[i][1]]);
  pts.push([x, crownY, 0]);
  for (let i = half.length - 1; i >= 0; i--) pts.push([x, half[i][0], half[i][1]]);
  return pts;
}

/* [x, [[y, half-width] x7], crownY] */
const STATIONS = [
  /* 0  nose face                                     body-7, unchanged */
  [2.375, [[0.42, 0.440], [0.48, 0.500], [0.55, 0.520], [0.61, 0.490], [0.65, 0.420], [0.680, 0.300], [0.695, 0.150]], 0.705],
  /* 1  over thermal-7's stack front edge             body-7, unchanged */
  [2.220, [[0.32, 0.620], [0.44, 0.685], [0.58, 0.712], [0.70, 0.672], [0.79, 0.545], [0.825, 0.360], [0.840, 0.170]], 0.850],
  /* 2  hood, frunk zone                            body-7, unchanged */
  [2.030, [[0.28, 0.710], [0.44, 0.778], [0.60, 0.800], [0.75, 0.752], [0.85, 0.628], [0.892, 0.400], [0.908, 0.185]], 0.920],
  /* 3  front fairing, forward sweep peak             body-7, unchanged */
  [1.820, [[0.28, 1.000], [0.42, 1.006], [0.58, 0.992], [0.76, 0.936], [0.88, 0.722], [0.930, 0.440], [0.948, 0.200]], 0.960],
  /* 4  front axle, fairing maximum                   body-7, unchanged */
  [1.450, [[0.28, 1.002], [0.42, 1.008], [0.58, 0.995], [0.78, 0.942], [0.90, 0.748], [0.965, 0.460], [0.988, 0.210]], 1.005],
  /* 5  fairing trailing sweep peak and cowl  (COWL)  body-7, unchanged */
  [1.070, [[0.28, 1.000], [0.42, 1.006], [0.58, 0.992], [0.80, 0.936], [0.93, 0.778], [1.015, 0.500], [1.045, 0.230]], 1.070],
  /* 6  fairing blend-out                             body-7, unchanged */
  [0.850, [[0.28, 0.924], [0.55, 0.922], [0.82, 0.893], [0.95, 0.836], [1.06, 0.700], [1.150, 0.480], [1.164, 0.250]], 1.172],
  /* 7  windshield header station                     body-7, unchanged */
  [0.300, [[0.28, 0.922], [0.55, 0.920], [0.90, 0.868], [1.02, 0.772], [1.12, 0.628], [1.334, 0.542], [1.346, 0.325]], 1.354],
  /* 8  maximum section, roof crown                   body-7, unchanged */
  [-0.450, [[0.28, 0.925], [0.55, 0.925], [0.90, 0.872], [1.02, 0.780], [1.12, 0.640], [1.340, 0.550], [1.352, 0.330]], 1.360],
  /* 9  CLOSURE BEGINS (DECK). Still on the beltline's own 0.925: body-7
        bulged to 0.936/0.948 here for a haunch the narrow track deletes.
        90 mm behind the rocker's rear end at x -1.010. */
  [-1.100, [[0.28, 0.925], [0.55, 0.925], [0.90, 0.874], [1.01, 0.778], [1.11, 0.632], [1.290, 0.532], [1.302, 0.318]], 1.310],
  /* 10 rear axle. Haunch 0.880, against a swept requirement of 0.8345 here
        and 0.8507 at the tightest station. body-7 carried 0.950. */
  [-1.440, [[0.28, 0.878], [0.54, 0.880], [0.84, 0.840], [0.97, 0.736], [1.07, 0.592], [1.199, 0.462], [1.212, 0.276]], 1.219],
  /* 11 arch trailing edge. 0.866 against a 0.8507 requirement; the tightest
        station is just aft at x -1.800, 18.9 mm at the liner face, where
        body-7 held 8.1. Lower edge starts to rise. */
  [-1.780, [[0.34, 0.864], [0.56, 0.866], [0.80, 0.822], [0.92, 0.716], [1.01, 0.570], [1.109, 0.426], [1.121, 0.254]], 1.128],
  /* 12 free at last: 17.6 deg in plan, 9.4 on the deck, 14.9 as a cone */
  [-2.120, [[0.42, 0.756], [0.60, 0.758], [0.78, 0.724], [0.90, 0.638], [0.98, 0.512], [1.055, 0.384], [1.066, 0.230]], 1.072],
  /* 13 */
  [-2.450, [[0.49, 0.650], [0.61, 0.654], [0.75, 0.630], [0.85, 0.558], [0.92, 0.454], [1.012, 0.340], [1.022, 0.202]], 1.030],
  /* 14 Kamm face: 0.550 half-width, y 0.545 to 0.975, 0.3941 m2 */
  [-2.775, [[0.545, 0.482], [0.628, 0.536], [0.712, 0.550], [0.796, 0.518], [0.860, 0.452], [0.925, 0.318], [0.952, 0.160]], 0.975],
];

const RINGS = STATIONS.map(([x, half, crownY]) => ring(x, half, crownY));

/* Half-width of the loft at an arbitrary (x, y): linear between the two
   bracketing stations, linear between profile points inside each. body-7's
   helper, carried verbatim, because every panel that is meant to lie on the
   surface is derived from the surface rather than placed by eye. */
function halfWidth(x, y) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  const pts = [];
  for (let k = 0; k < A[1].length; k++) {
    pts.push([(1 - t) * A[1][k][0] + t * B[1][k][0], (1 - t) * A[1][k][1] + t * B[1][k][1]]);
  }
  pts.push([(1 - t) * A[2] + t * B[2], 0]);
  if (y <= pts[0][0]) return pts[0][1];
  for (let k = 0; k < pts.length - 1; k++) {
    if (y <= pts[k + 1][0]) {
      const [y0, w0] = pts[k], [y1, w1] = pts[k + 1];
      return y1 === y0 ? w1 : w0 + (y - y0) / (y1 - y0) * (w1 - w0);
    }
  }
  return 0;
}

/* Lower edge of the loft at an arbitrary x: the flank's bottom line. */
function bottomY(x) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  return (1 - t) * A[1][0][0] + t * B[1][0][0];
}

/* Inverse of halfWidth on the upper branch: the height at which the surface
   is hz wide. Struts, mounts and closeouts are placed through this so they
   land ON the deck instead of hovering above it, which is the failure the
   body-4 splitter taught and the one a tapering tail invites again. */
function surfaceY(x, hz) {
  let lo = bottomY(x), hi = halfWidth(x, 0) > 0 ? 1.45 : 1.45;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    if (halfWidth(x, mid) > hz) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/* Swept |z| of wheels-7's rear corner under suspension-4's +-3 degrees,
   measured off both modules' BUILT meshes and tabulated on distance from
   the rear axle. Peak 0.8352 at 307 mm fore and aft, not at the axle. */
const SWEEP = [[0.00, 0.8190], [0.05, 0.8214], [0.10, 0.8239], [0.15, 0.8263],
               [0.20, 0.8304], [0.25, 0.8334], [0.30, 0.8352], [0.35, 0.8314],
               [0.37, 0.8100]];
function sweptZ(x) {
  const r = Math.abs(x - P.axleR);
  if (r >= SWEEP[SWEEP.length - 1][0]) return 0;
  for (let i = 0; i < SWEEP.length - 1; i++) {
    if (r <= SWEEP[i + 1][0]) {
      const [r0, z0] = SWEEP[i], [r1, z1] = SWEEP[i + 1];
      return z0 + (r - r0) / (r1 - r0) * (z1 - z0);
    }
  }
  return 0;
}

/* Flat end cap built from a ring's own outline, so the nose and Kamm faces
   fill their apertures exactly instead of being rectangles that stand proud
   of a curved edge. dx pushes the center of the cap behind the outline.

   closeLoop is not optional, and the reason is worth a line. A ring here is
   an OPEN polyline from the flank's bottom edge on one side, over the
   crown, to the bottom edge on the other. Fanning it to a shrunken copy
   without joining the last point back to the first leaves the sector across
   the bottom unfilled, and that sector is not small: 880 mm wide by 135 mm
   at the nose and 964 by 204 at the tail, 0.059 and 0.098 m2 of open face.
   Swept with axial rays, 20.2 percent of the nose face was the front
   megacasting and the crash rails seen through the bodywork, and 24.2
   percent of the Kamm face was the rear megacasting. Carried since
   body.js, on every body that uses this helper. A sealed nose has to be
   sealed. */
function endCap(ringPts, dx, mat) {
  const ys = ringPts.map((p) => p[1]);
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const inner = ringPts.map(([x, y, z]) => [x + dx, cy + (y - cy) * 0.05, z * 0.05]);
  return lib.loft([ringPts, inner], mat, true);
}

/* Angled box with chamfered edges. abox's signature with the chamfer after
   the depth. A chamfer is what turns one flat highlight into two, which is
   the difference between a part and a block. */
function acbox(w, h, d, c, mat, x, y, z, rz = 0, rx = 0, ry = 0) {
  const m = lib.cbox(w, h, d, c, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz, 'ZXY');
  return m;
}

const COWL = 5;      /* ring index where the glass band starts */
const DECK = 9;      /* ring index where the glass ends and the tail begins */
const LAST = STATIONS.length - 1;
const FAIR0 = 2, FAIR1 = 6;   /* fairing flank spans these ring indices */

const glassBand = RINGS.slice(COWL, DECK + 1).map((r) =>
  r.slice(3, 12).map((p) => [p[0], p[1] + 0.008, p[2] * 1.012])
);

/* ── The crisp shell: one master grid ──────────────────────────────────

   Every painted panel on this body is now a slice of ONE resampled loft
   rather than six independent ones. That matters for three reasons.

   First, panels that share an edge share the exact same vertices, so the
   beltline seam at ring point 3 cannot open a hairline.

   Second, a shutline can be cut once, at a fractional station, and the two
   panels either side of it pick up their own half of the channel. The door
   is the master surface between two cuts, which is what its own panel has
   claimed since body-7 and what the geometry now actually does. The panel
   gap is 5 mm wide and 4 mm deep with two real walls, so it catches light
   on the near lip and goes dark in the floor instead of being nothing.

   Third, resolution. The station table is 15 rings of 15 points, about 14
   by 3 quads on a whole flank, which is not enough grid to cut anything
   into. Subdividing two-for-one in both directions gives the grooves and
   the crease pass something to work with.

   INTERPOLATION IS DELIBERATELY LINEAR, and this is the one place the
   crispness vocabulary is held back on purpose. There are two reasons and
   the first one is not the one it looks like.

   lib.loft's Catmull-Rom mode is envelope-clamped, and the envelope really
   is held: max half-width stays at 1.00800, crown at 1.36000 and the lower
   edge at 0.28000 in every clamped mode, against 1.02494 / 1.37207 /
   0.27556 unclamped. It does not follow that frontal area is held, and it
   is not. Area is the widest point at each HEIGHT, so a surface that moves
   between profile points moves the integral without touching any extreme.
   Swept over this shell by one integrator: linear 1.4107 m2, clamped
   Catmull-Rom 1.4197, clamped with the kinks held at 36 degrees 1.4087,
   unclamped 1.4503. Clamping takes the error from 2.8 percent to 0.6, and
   0.6 percent of A is about 0.7 Wh/mi. Only linear takes it to zero.

   Second, the surface between stations moves by up to 29 mm with the
   station kinks held at this body's own 36 degrees, and 44 mm fully
   smoothed. This module's clearances are quoted to the millimeter off built
   geometry: 18.9 mm at the liner face over the swept rear tire, 43 mm at
   the nose to thermal-7's inlet header, 6 mm from the arch hoop to the
   flank. A surface that moves three centimeters between stations
   invalidates all of them, and every one would need re-auditing before the
   smoothing could ship. Linear keeps the aerodynamic surface bit for bit,
   verified at all 225 station-and-profile-point intersections, and buys the
   resolution, which is the part this pass actually needs. The smoothing is
   available to a body that is designed against it from the start.

   THE CREASE IS DECLARED, NOT DISCOVERED, and the previous version of this
   comment was wrong about what a global angle was doing. It said 36 degrees
   was the gap in the body's kink spectrum, breaking the three fairing edges
   at 53.8, 49.6 and 41.1 and leaving the nose a dome. Those three figures
   are polyline turns read over every column including the crown. Swept as
   FACE dihedrals over the flank columns the panels are actually cut from,
   station 5 turns 21.0 degrees and station 6 turns 19.5, so neither ever
   broke, and exactly one station line on the whole nose crossed 36: station
   3 at x 1.820, 52.8 degrees over 24 of 24 flank edges. That single line is
   what read as a facet in three-quarter views.

   It is not an edge. Station 2 to station 3 flares the half-width 0.710 to
   1.000 in 210 mm and station 4 then holds 1.002, so station 3 is the
   shoulder of an enclosed wheel pod sampled at one station: curvature all
   of one sign, concentrated where the table happens to have a point.
   interp: 'linear' makes every span between stations exactly flat, so ALL
   of this body's curvature lives on the station lines, and an angle test
   cannot tell a designed crease from a coarse sample. Hardening a
   52.8 degree convex shoulder at the widest approach to the front pod is
   also not defensible aerodynamically: that is a separation line on the one
   surface a Cd 0.105 claim cannot afford to trip.

   So hardness is DECLARED per line, in HARDR and HARDC below, and the angle
   is consulted only after a line has been named. Every panel gap the module
   cuts is hard, along its channel lines and its run-out ends. The roof
   shoulder at ring 5 and ring 9 is hard, because it turns 65 degrees on
   every station from the windshield header aft and a feature that persists
   over seven stations is a feature. The beltline at ring 3, the rocker
   split at ring 0.5185, the Kamm edge and the nose face are hard because
   they are panel boundaries and separate meshes already break there. No
   station line is declared, so the nose is a dome and stays one.

   What that leaves is stated rather than hidden: the flank between the nose
   face and the cowl still turns 26.6, 24.7, 52.8 and 21.0 degrees at four
   discrete lines with exactly flat surface between them. Smooth normals
   shade that as a curve and a hard-edged softbox reflection still finds the
   flats. The only fix is a station between 2 and 3, which moves the
   aerodynamic surface, so it belongs to a body generation. ── */

function rowOf(x) {
  for (let i = 0; i < STATIONS.length - 1; i++) {
    if (x <= STATIONS[i][0] && x >= STATIONS[i + 1][0]) {
      return i + (STATIONS[i][0] - x) / (STATIONS[i][0] - STATIONS[i + 1][0]);
    }
  }
  return x > STATIONS[0][0] ? 0 : STATIONS.length - 1;
}

const GAP = { width: 0.005, depth: 0.004 };
const CREASE = 36;

/* ── The lower valance and the nose aperture ───────────────────────────
   The valance is body-7's, three sections at (2.240, 0.128, hz 0.510),
   (2.325, 0.280, 0.502) and (2.373, 0.420, 0.446). Written as its two
   interpolants rather than as a table, because the panel and the hole cut
   in it have to be the same surface to the last decimal.

   THE HOLE. intake-gates has claimed an aperture since body-7: it meters
   "the only air admitted through the body", and the module argues at length
   about whether that aperture is now oversized for thermal-7's load. There
   was no aperture. The valance was a continuous panel and the slat bank
   stood 14 mm proud of it, so the bank metered a wall, and the bar lattice
   this pass put behind it was buried 19.8 to 71.6 mm deep, with 0 of 220
   facets reaching a clear line to any of five front cameras. A duct behind
   a solid panel is a decal with a triangle budget.

   Every edge of the hole sits inside the slat bank, which spans y 0.191 to
   0.383 and |z| 0.400 as built, so the gates still cover it from straight
   ahead and the lattice is what shows in the 18 percent of the bank the
   slats do not fill. The edge returns 14 mm inboard on the valance's own
   normal, so the cut has a thickness and a lit lip instead of being a hole
   in paper. */
const vx = (y) => (y < 0.280 ? 2.240 + (y - 0.128) / 0.152 * 0.085
                             : 2.325 + (y - 0.280) / 0.140 * 0.048);
const vhz = (y) => (y < 0.280 ? 0.510 + (y - 0.128) / 0.152 * -0.008
                              : 0.502 + (y - 0.280) / 0.140 * -0.056);
const RAKE = Math.atan2(0.133, 0.292);        /* valance lean, 24.5 degrees */
const AP = { y0: 0.214, y1: 0.360, z: 0.386, lip: 0.014 };

/* Door shutlines. x 0.060 and -0.940 are the module's published pair. The
   front one is the fairing blend-out station itself: the enclosed front pod
   owns the flank ahead of x 0.850, a door leading edge cannot wrap over a
   wheel enclosure and still swing, and the published 1.06 was body-7 prose
   that this body's own built panels never matched. The cut runs from the
   rocker top at y 0.42, ring fraction 0.5185, up to the beltline seam,
   because the sill is structure you sit on rather than door skin.

   BOTH ENDS OF THE SPAN ARE PANEL EDGES, and that is why they are ring 3
   and ring 0.5185 exactly rather than a comfortable value past them. The
   flank band is ring 0 to 3; the deck band above it is glass between the
   cowl and the closure, so no painted panel exists above ring 3 anywhere
   along a door. A span that ends at 3.6 puts its run-out on a surface that
   is never built, and the channel then reaches the panel's own top edge at
   full depth: measured, the cut was still 3.952 mm deep on the last row of
   the door skin. Ending the span ON the seam runs the fade out inside the
   panel, which is what the run-out exists for. */
const SHUT = [rowOf(0.850), rowOf(0.060), rowOf(-0.940)];
const SILL = 0.5185;
const SEAM = 3;
const DOORL = [SILL, SEAM], DOORR = [14 - SEAM, 14 - SILL];

/* Hood, x 2.220 to 1.130: forward of the cowl at station 5 where the
   glass root starts, aft of the nose fascia band that carries the light
   bar and the intake gates, and covering P.frunk's x 1.78 to 2.12 with
   margin. Decklid, x -1.160 to -2.320, which leaves 455 mm of fixed tail
   under the spoiler mounts and the Kamm face. Side gaps sit at ring
   fraction 3.7 and 10.3, on the shoulder, clear of the beltline seam. */
const HOOD = [rowOf(2.220), rowOf(1.130)];
const LID = [rowOf(-1.160), rowOf(-2.320)];
const DECKSPAN = [3.55, 10.45];
const FADE = 0.05;

const GROOVES = [];
for (const r of SHUT) {
  GROOVES.push({ row: r, ...GAP, span: DOORL, runout: FADE });
  GROOVES.push({ row: r, ...GAP, span: DOORR, runout: FADE });
}
for (const r of [...HOOD, ...LID]) {
  GROOVES.push({ row: r, ...GAP, span: DECKSPAN, runout: FADE });
}
for (const c of [3.7, 10.3]) {
  GROOVES.push({ col: c, ...GAP, span: [HOOD[0] - FADE, HOOD[1] + FADE], runout: FADE });
  GROOVES.push({ col: c, ...GAP, span: [LID[0] - FADE, LID[1] + FADE], runout: FADE });
}

/* ── The louver recesses ────────────────────────────────────────────────
   THE DEFECT. arch-louvers has been entirely inside the car since body-7.
   Its blades sit at halfWidth - 0.014 and a 50 x 100 x 10 mm slat turned
   0.3 rad about Y has a rotated half-depth of 12.2 mm, so the outer face
   lands at halfWidth - 0.0018: 1.8 mm behind an unbroken painted flank.
   Swept from 96 exterior cameras, 0 of 21 sample points on the bank reach
   any of them, the raycast picks the pod skin first so the panel can never
   be opened, and the bank is 1,432 triangles rendering as nothing. The
   intake gates had exactly this defect at the nose one pass ago and it was
   fixed the same way: a duct behind a solid panel is a decal.

   THE FIX is the recess the bank always implied. Two pockets 30 mm deep and
   140 mm lip to lip on the flank at y 0.500, cut with the same groove
   machinery as the shutlines, so they are part of the master grid and cannot
   open a seam against it. Measured perpendicular to the ungrooved master
   surface the cut is 30.000 mm everywhere on its floor.

   WHAT THIRTY MILLIMETERS BUYS, and the arithmetic that says otherwise is
   wrong. A groove sinks its depth along the surface NORMAL, so the floor is
   not 30 mm inboard in z and it is not a plane of constant |z|: the flank
   narrows 8.6 mm over the pocket's 106 mm of floor, so the floor runs from
   |z| 0.974 at the bottom to 0.965 at the top while a blade holds one |z|
   down its whole length. Comparing halfWidth - 0.0262 with halfWidth - 0.030
   says 3.8 mm of margin. Swept vertex by vertex over the built mesh the real
   figure is 0.68 mm at the blade's lower inboard corner and 8 mm at its
   upper one. It clears, but the slope sets it and not the depth, and a pass
   that wants margin has to cut deeper rather than argue from mid-height.

   EACH BANK IS CENTERED IN ITS BAY, which moves the aft bank 68 mm forward
   and the forward bank 87 mm aft of body-7's stations. Both recesses now
   clear the stations bounding them by 43 and 70 mm. The forward one has to:
   station 3 is the pod's leading shoulder, where the flow is accelerating
   hardest around the widest approach on the car, and a vent mouth cut into
   a shoulder ingests instead of exhausting. A recess in the middle of a
   bay is on the parallel flank behind the shoulder, which is where the
   static pressure is low and an arch outlet works. */
const LOUV = { width: 0.140, depth: 0.030, wall: 0.017 };
const LOUVSPAN = [[rowOf(1.4074), rowOf(1.1146)], [rowOf(1.7504), rowOf(1.5196)]];
const LOUVRUN = 0.037;

/* |z| of the pocket floor, for the hardware that has to sit on it. A groove
   sinks its depth along the surface NORMAL, and this flank leans in both
   axes, so the floor is NOT LOUV.depth inboard in z and it is not a plane of
   constant |z| either. Derived from halfWidth like every other placement in
   this module, so it moves with the surface instead of with a remembered
   number. Agrees with the built mesh to 0.3 mm. */
function floorZ(x, y) {
  const e = 0.004;
  const fy = (halfWidth(x, y + e) - halfWidth(x, y - e)) / (2 * e);
  const fx = (halfWidth(x + e, y) - halfWidth(x - e, y)) / (2 * e);
  return halfWidth(x, y) - LOUV.depth / Math.sqrt(1 + fx * fx + fy * fy);
}
for (const c of [1.5, 12.5]) {
  for (const s of LOUVSPAN) GROOVES.push({ col: c, ...LOUV, span: s, runout: LOUVRUN });
}

const SHELL = lib.loftGrid(RINGS, {
  rowSub: 2, colSub: 2, interp: 'linear', grooves: GROOVES,
});

const RI = (i) => SHELL.rowIndex(i);
const CI = (j) => SHELL.colIndex(j);
/* the two flank column bands and the deck band, in resolved indices */
const FL = [0, CI(3)], FR = [CI(11), CI(14)], UP = [CI(3), CI(11)];
/* A door skin is the flank band between the two ends of its own cut, not
   the whole flank band. The cut stops at the rocker top because the sill is
   structure, so the 140 mm of flank below it is structure too: it is the
   outer face over a 2.02 m extrusion whose section the pack specified, and
   it neither opens nor moves. Slicing the door at ring 0.5185 keeps the
   run-out inside the door and hands the sill back to the skin, which is
   what this part's own text has said since body-7. */
const DOORBAND = [CI(11), CI(14 - SILL)];
const SILLR = [CI(14 - SILL), CI(14)], SILLL = [CI(0), CI(SILL)];
/* each shutline pushed a left and a right groove; both resolve to the same
   split row, which is the far floor edge of the channel */
const CUT = [SHELL.grooves[0].split, SHELL.grooves[2].split, SHELL.grooves[4].split];
/* The hood's and the decklid's own four cut lines, read off the grid's
   records rather than re-derived. Rows come from the two HOOD and the two
   LID grooves, columns from the side gaps pushed over each span.

   READ THE SPLIT, DO NOT RECOMPUTE IT. Both side gaps are declared at ring
   fraction 3.7 and 10.3, but each is pushed TWICE, once over the hood span
   and once over the lid span, and lib.loftGrid sizes a groove from the
   meters-per-index scale it probes along that groove's OWN span. The two
   therefore land on different lines: 25 and 52 for the hood, 26 and 53 for
   the lid. CI(3.7) answers 24 and is wrong for both, and RI is wrong the
   same way, answering 6 and 28 where the hood grooves split at 7 and 29.
   Cutting on the naive index puts the panel edge one to three lines inside
   the channel wall instead of on the floor edge the neighbors already
   share. Resolved, the hood is [7, 29] by [25, 52] and the lid [63, 78] by
   [26, 53]. */
const HOODROW = [SHELL.grooves[6].split, SHELL.grooves[7].split];
const HOODCOL = [SHELL.grooves[10].split, SHELL.grooves[12].split];
const LIDROW = [SHELL.grooves[8].split, SHELL.grooves[9].split];
const LIDCOL = [SHELL.grooves[11].split, SHELL.grooves[13].split];

/* ── The declared hard lines ────────────────────────────────────────────
   Resolved row and column indices on the master grid that are ALLOWED to
   break. Everything else stays smooth whatever angle it turns through, so a
   coarsely sampled shoulder cannot masquerade as a designed edge.

   Grooves contribute their own four channel lines, the two lips and the two
   floor edges, plus the four lines their span pushes into the other axis,
   which are the ramps a run-out builds at each end of a gap. The roof
   shoulder at ring 5 and ring 9 is the one feature line that is neither a
   gap nor a panel boundary: it turns 65 degrees at every station from the
   windshield header to the Kamm face, and forward of the cowl it turns
   10 degrees, so declaring the line and testing the angle gives a shoulder
   that hardens where it exists and fades where it does not.

   A LINE IS DECLARED WITH ITS EXTENT, and the first version of this was
   wrong without it. The hood side gaps run from ring fraction 3.7 and
   their span begins at row 0.95 with a 0.05 run-out, so the run-out line
   lands on row 1.00, which IS station 1. Declared as a bare index it made
   the whole of station 1 hard, flank included, and put a 26.6 degree facet
   round the nose at x 2.220: the exact defect this pass exists to remove,
   reintroduced 400 mm further forward. A run-out line is only a feature
   across the width of the channel it terminates, so it carries the
   groove's own [i0, i1] as its extent, and a channel line carries its
   groove's span. */
const SHOULDER = 5;
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
  /* A run-out is an INTERVAL, not two lines. Declaring only the two ends
     works while nothing else lands inside, and something does: the louver
     pocket's aft fade runs from row 4.8456 to 4.8826 and the hood rear
     gap's outer lip sits at 4.8486, inside it. That foreign line carries the
     ramp's whole break, 49 degrees, and undeclared it rendered smooth while
     the other three pocket ends broke cleanly. Every resolved line in the
     fade is declared, across the channel width only, and LINE decides which
     of them is actually the ramp. */
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
for (const r of [SHOULDER, 14 - SHOULDER]) declare(HARDC, CI(r), 0, SHELL.rows - 1);

/* Degrees. Consulted only ON a declared line, which is why it can sit far
   below the 36 a global test needs: a channel wall stands at 65 to 75 and a
   run-out ramp falls away to nothing along its own fade, so the threshold
   is deciding where along a named line the feature actually is, not whether
   the feature is a feature. */
const LINE = 20;

/* Split normals along the declared lines only.
   lib.crease cannot do this: it is a pure angle test, and the whole defect
   is that an angle test hardened a sampling kink. This walks the grid the
   panel was cut from instead, so it knows which grid line every edge lies
   on. Faces meet in a six-triangle fan around each interior vertex, cut by
   at most two lines, so the components are found with a six-element union
   over that fan rather than by welding a de-indexed soup.

   Triangle cost zero, exactly as lib.crease: the geometry de-indexes to
   three vertices per triangle and not one position moves. */
function creaseLines(mesh, rows, cols) {
  const r0 = rows[0], c0 = cols[0];
  const R = Math.min(SHELL.rows - 1, rows[1]) - r0 + 1;
  const C = Math.min(SHELL.cols - 1, cols[1]) - c0 + 1;
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

  /* one normal per (vertex, fan slot). Slots run round the fan:
     0 quad(i-1,j-1) tri1, 1 quad(i,j-1) tri0, 2 quad(i,j-1) tri1,
     3 quad(i,j) tri0, 4 quad(i-1,j) tri1, 5 quad(i-1,j) tri0.
     Slots 0-1 and 3-4 meet on row line i, 2-3 and 5-0 on column line j,
     and 1-2 and 4-5 are quad diagonals, which are never hard. */
  const vn = new Float64Array(R * C * 18);
  const slot = new Int32Array(6);
  const par = new Int32Array(6);
  const find = (x) => { while (par[x] !== x) x = par[x] = par[par[x]]; return x; };
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const q = (a, b, t) => (a >= 0 && a < QR && b >= 0 && b < QC ? (a * QC + b) * 6 + t * 3 : -1);
      slot[0] = q(i - 1, j - 1, 1); slot[1] = q(i, j - 1, 0); slot[2] = q(i, j - 1, 1);
      slot[3] = q(i, j, 0); slot[4] = q(i - 1, j, 1); slot[5] = q(i - 1, j, 0);
      const hr = onLine(HARDR, r0 + i, c0 + j), hc = onLine(HARDC, c0 + j, r0 + i);
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

const panel = (rows, cols) =>
  lib.shell(creaseLines(lib.loftMesh(SHELL, M.paint, { rows, cols }), rows, cols));

/* End cap taken off the master grid's own edge ring, so the nose and Kamm
   faces close against the subdivided panels exactly. */
function capOf(rowIdx, dx, mat) {
  const ring = [];
  for (let b = 0; b < SHELL.cols; b++) {
    const k = (rowIdx * SHELL.cols + b) * 3;
    ring.push([SHELL.pts[k], SHELL.pts[k + 1], SHELL.pts[k + 2]]);
  }
  return lib.crease(endCap(ring, dx, mat), CREASE);
}

/* The marque: a chevron, extruded 2.4 mm with a beveled rim. A decal has
   no edge for a softbox to find; a badge does, which is the whole reason
   this is geometry and not a texture. */
const CHEVRON = [
  [-0.045, 0.000], [-0.017, -0.019], [0.000, -0.007], [0.017, -0.019],
  [0.045, 0.000], [0.017, 0.019], [0.000, 0.007], [-0.017, 0.019],
];

export function build() {
  const sys = new THREE.Group();
  buildStructure(sys);
  buildShell(sys);
  return sys;
}

/* ── structure: body-7's, one C-pillar node moved onto the casting ── */
function buildStructure(sys) {
  /* front megacasting, coordinates identical to body.js and body-7 */
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

  /* rear megacasting plus its bolt-on rails, beam and the tail-cone bond
     pad. Coordinates carried; only the cantilever behind the pad grew. */
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
  rc.add(acbox(0.03, 0.30, 0.90, 0.006, M.alu, -2.28, 0.60, 0));
  sys.add(rc);

  /* front crash rails and bumper beam, coordinates carried */
  const rails = lib.part('crash-rails', [0.95, -0.05, 0]);
  for (const s of [-1, 1]) {
    rails.add(acbox(0.54, 0.09, 0.09, 0.008, M.alu, 1.97, 0.55, s * 0.55));
    rails.add(acbox(0.02, 0.15, 0.12, 0.005, M.alu, 1.71, 0.55, s * 0.535));
  }
  rails.add(acbox(0.06, 0.10, 1.30, 0.008, M.alu, 2.24, 0.55, 0));
  sys.add(rails);

  /* rockers, carried: outer face |z| 0.915, rear end at x -1.010, which is
     90 mm forward of the first station that narrows */
  const rockL = lib.part('rockers', [0, -0.5, 0.3]);
  rockL.add(acbox(2.02, 0.10, 0.07, 0.008, M.paintDark, 0, 0.37, 0.88));
  sys.add(rockL);
  sys.add(mirrorZ(rockL));

  /* ── the cage: body-7's, with the C-pillar rerouted. Its rear node was
     at (-1.78, 0.80, 0.740), 205 mm outboard of the rear casting's upper
     boss and therefore terminating in bonded skin. It now runs through
     (-1.26, 1.010, 0.600) and (-1.55, 0.850, 0.596) and lands on the boss
     at (-1.70, 0.66, 0.535). Every other member is unchanged. ── */
  const cageSide = lib.part('cage', [0, 0.36, 0]);
  const members = [
    [0.028, [[0.99, 0.880, 0.660], [0.72, 1.030, 0.612], [0.48, 1.190, 0.542],
             [0.30, 1.296, 0.510]]],
    [0.028, [[0.30, 1.296, 0.510], [-0.48, 1.300, 0.510]]],              /* roof rail */
    [0.026, [[0.02, 0.44, 0.876], [0.02, 0.72, 0.856], [0.02, 0.94, 0.800],
             [0.02, 1.10, 0.612], [0.02, 1.29, 0.510]]],                /* B-pillar */
    [0.028, [[-0.48, 1.300, 0.510], [-0.92, 1.170, 0.548], [-1.26, 1.010, 0.600],
             [-1.55, 0.850, 0.596], [-1.70, 0.660, 0.535]]],            /* C-pillar */
  ];
  for (const [r, m] of members) cageSide.add(lib.tube(m, r, M.darkSteel));
  /* FMVSS 201 head-impact pad: inner face |z| 0.467, 7 mm off the head */
  cageSide.add(acbox(0.78, 0.016, 0.015, 0.003, M.plastic, -0.09, 1.278, 0.4745));
  sys.add(cageSide);
  sys.add(mirrorZ(cageSide));

  const cageMid = lib.part('cage', [0, 0.36, 0]);
  cageMid.add(lib.tube([[0.30, 1.296, -0.510], [0.30, 1.296, 0.510]], 0.026, M.darkSteel));
  cageMid.add(lib.tube([[-0.10, 1.298, -0.510], [-0.10, 1.298, 0.510]], 0.024, M.darkSteel));
  cageMid.add(lib.tube([[-0.48, 1.300, -0.510], [-0.48, 1.300, 0.510]], 0.026, M.darkSteel));
  cageMid.add(lib.tube([[0.99, 0.870, -0.660], [0.99, 0.870, 0.660]], 0.028, M.darkSteel));
  sys.add(cageMid);
}

/* ── the Gen 8 shell ── */
function buildShell(sys) {
  /* ── skin: nose flank, the fixed panels either side of the door aperture,
     the hood band and the nose face. Everything here is body-7's surface,
     resampled and grooved but not moved. The forward fixed strip between
     the fairing blend-out and the front shutline is where the hinge boxes
     and the belt anchor live, which is why the door starts behind it. ── */
  const skin = lib.part('skin', [0, 0.62, 0]);
  skin.add(panel([RI(0), RI(FAIR0)], FL));
  skin.add(panel([RI(0), RI(FAIR0)], FR));
  skin.add(panel([CUT[2], RI(DECK)], FL));            /* rear quarter */
  skin.add(panel([CUT[2], RI(DECK)], FR));
  skin.add(panel([CUT[0], CUT[2]], SILLL));           /* sill band under the cuts */
  skin.add(panel([CUT[0], CUT[2]], SILLR));
  /* THE HOOD COMES OUT OF THE NOSE DECK, and it is a re-slice rather than a
     redraw: all four of its cut lines were already grooved into the master
     grid, and this panel simply ran straight over the top of them. What the
     skin keeps is the fascia band ahead of the hood, the two strips either
     side of it and the cowl band behind it; what opens is the middle. */
  skin.add(panel([RI(0), HOODROW[0]], UP));           /* nose fascia band */
  skin.add(panel(HOODROW, [UP[0], HOODCOL[0]]));      /* left strip */
  skin.add(panel(HOODROW, [HOODCOL[1], UP[1]]));      /* right strip */
  skin.add(panel([HOODROW[1], RI(COWL)], UP));        /* cowl band */
  skin.add(lib.shell(capOf(RI(0), -0.012, M.paint))); /* nose face */
  sys.add(skin);

  /* the hood, on the same part id so the skin stays one clickable thing */
  const hood = lib.hinge(lib.part('skin', [0, 0.62, 0]), 'hood');
  hood.add(panel(HOODROW, HOODCOL));
  sys.add(hood);

  /* ── front fairings, carried from body-7 without a coordinate change.
     The pod now owns the near lip and the floor of the door's front
     shutline, because that joint lands on its own blend-out station. ── */
  const fair = lib.part('front-fairings', [0.35, -0.05, 0.95]);
  fair.add(panel([RI(FAIR0), CUT[0]], FL));
  fair.add(panel([RI(FAIR0), CUT[0]], FR));
  for (const s of [-1, 1]) {
    const WALL = P.wheelZ - 0.110;
    fair.add(acbox(0.80, 0.190, 0.014, 0.004, M.carbon, P.axleF, 0.640, s * WALL));
    for (const cx of [P.axleF + 0.405, P.axleF - 0.405]) {
      const zo = halfWidth(cx, 0.700) - 0.012;
      fair.add(acbox(0.016, 0.330, zo - WALL, 0.005, M.carbon, cx, 0.5350, s * (WALL + zo) / 2));
    }
    fair.add(acbox(0.72, 0.02, 0.10, 0.006, M.carbon, P.axleF, 0.292,
                   s * (halfWidth(P.axleF, 0.292) - 0.058)));
  }
  sys.add(fair);

  /* ── tail cone: the whole afterbody from the closure station aft. Flank
     and deck bands plus the Kamm face. 0.925 half-width at x -1.100 down to
     0.550 at -2.775, with the crown falling 1.310 to 0.975.

     The joint at x -1.100 where the tail bonds to the cabin gets NO
     shutline, and that is a decision rather than an omission: the tail cone
     is bonded laminate, so the joint is filled and painted and there is
     nothing there to catch light. Only the decklid opens. ── */
  const tail = lib.part('tail-cone', [-1.45, 0.30, 0]);
  tail.add(panel([RI(DECK), RI(LAST)], FL));
  tail.add(panel([RI(DECK), RI(LAST)], FR));
  /* THE DECKLID COMES OUT OF THE DECK BAND, on the same terms as the hood:
     four grooved lines that were already there, and a panel that used to run
     over them. The flanks are untouched, because the lid's side gaps sit on
     the deck shoulder at ring 3.7 and 10.3 and never reach the flank bands. */
  tail.add(panel([RI(DECK), LIDROW[0]], UP));         /* ahead of the lid */
  tail.add(panel(LIDROW, [UP[0], LIDCOL[0]]));        /* left quarter */
  tail.add(panel(LIDROW, [LIDCOL[1], UP[1]]));        /* right quarter */
  tail.add(panel([LIDROW[1], RI(LAST)], UP));         /* the fixed tail band */
  tail.add(lib.shell(capOf(RI(LAST), 0.012, M.paint)));                    /* Kamm face */
  /* The marque, and the only one on the car: a sealed nose carrying a
     full-width light band has nowhere honest to put a second.

     The depth is set by the panel, not by taste. The Kamm face is a cone
     from the ring outline to a near-point, not a plane, so swept across the
     badge's 90 by 38 mm footprint the cap runs x -2.76745 to -2.76473: a
     2.7 mm fall, and reading only the z variation at one height reports
     0.4 and gets it seven times too small. A 2.4 mm badge on that surface
     stands 2.7 mm proud at the bottom corner and 0.05 mm BEHIND the panel
     at the top one, which is a marque half sunk into its own tailgate and
     a z-fight where it crosses. 4.4 mm of extrusion with the back face at
     x -2.7642 clears it: the rim stands 1.1 to 3.9 mm proud everywhere and
     the back face is 0.5 to 3.3 mm inside the cap everywhere. */
  const mark = lib.badge(CHEVRON, 0.0044, M.alu);
  mark.rotation.y = -Math.PI / 2;
  mark.position.set(-2.7642, 0.820, 0);
  tail.add(mark);
  sys.add(tail);

  /* the decklid, the same part id so the tail stays one clickable thing.
     The badge stays with the fixed Kamm face rather than riding the lid,
     because the face it is set into does not open. */
  const lid = lib.hinge(lib.part('tail-cone', [-1.45, 0.30, 0]), 'decklid');
  lid.add(panel(LIDROW, LIDCOL));
  sys.add(lid);

  /* ── rear wheelhouse closeouts: the part wheels-7 filed a defect for.
     A hoop swept at r 0.400 about the axle from just ahead of the tire,
     over the crown, to just behind it, running from |z| 0.715 inboard out
     to 6 mm inside the flank surface, plus a lower lip that turns the
     flank's bottom edge in to 14 mm off the swept tire. Nothing below the
     axle line, because a wheelhouse closed underneath is a bucket. ── */
  const arch = lib.part('rear-arch-closeouts', [-0.45, -0.05, 1.15]);
  const RW = 0.400, NSEC = 15;
  const hoop = [];
  for (let i = 0; i <= NSEC; i++) {
    /* -3 to 183 degrees rather than a full half turn: the fore end has to
       stay above battery-7's rear pack rail, which tops out at y 0.308 at
       x -1.060 and reaches |z| 0.780, outboard of this hoop's inner edge */
    const a = (-3 + (186 * i) / NSEC) * Math.PI / 180;
    const x = P.axleR + RW * Math.cos(a), y = P.wheelY + RW * Math.sin(a);
    hoop.push([[x, y, 0.715], [x, y, Math.max(0.735, halfWidth(x, y) - 0.006)]]);
  }
  arch.add(lib.loft(hoop, M.carbon));
  const lip = [];
  for (let i = 0; i <= 12; i++) {
    const x = -1.060 - (0.760 * i) / 12;
    const yb = bottomY(x);
    const outer = halfWidth(x, yb + 0.004) - 0.002;
    const inner = Math.max(sweptZ(x) + 0.014, outer - 0.060);
    lip.push([[x, yb + 0.004, outer], [x, yb - 0.016, Math.min(inner, outer - 0.008)]]);
  }
  arch.add(lib.loft(lip, M.carbon));
  sys.add(arch);
  sys.add(mirrorZ(arch));

  /* ── glass canopy band, lofted 8 mm proud of the same stations. It now
     stops at the closure station: the backlight is deleted. ── */
  const canopy = lib.part('canopy', [0, 1.05, 0]);
  canopy.add(lib.shell(lib.loft(glassBand, M.glass)));
  sys.add(canopy);

  /* ── light bands. Front face held at x 2.371, y 0.615, half-width 0.43 so
     autonomy-4's pucks at (2.33, 0.615, +-0.30) still land. ── */
  const lbF = lib.part('lightbands', [1.15, 0.1, 0]);
  lbF.add(acbox(0.014, 0.045, 0.86, 0.004, M.lamp, 2.371, 0.615, 0));
  for (const s of [-1, 1]) {
    lbF.add(acbox(0.012, 0.03, 0.06, 0.003, M.sensor, 2.376, 0.615, s * 0.30));
  }
  sys.add(lbF);
  const lbR = lib.part('lightbands', [-1.15, 0.1, 0]);
  lbR.add(acbox(0.014, 0.05, 1.00, 0.004, M.lampRed, -2.771, 0.700, 0));
  sys.add(lbR);

  /* ── Kamm spoiler, drawn deployed. Span 1.02 m following the narrower
     deck; the struts are placed at the height where the deck is actually
     0.34 wide, so they stand on the surface rather than near it. ── */
  const spoiler = lib.part('kamm-flap', [-0.9, 0.55, 0]);
  const BX = -2.600, BY = 1.045;
  spoiler.add(acbox(0.20, 0.012, 1.02, 0.003, M.carbon, BX, BY, 0, 0.16));
  for (const s of [-1, 1]) {
    const sx = BX + 0.02, sz = s * 0.34;
    const deck = surfaceY(sx, Math.abs(sz));
    spoiler.add(acbox(0.016, BY - deck + 0.03, 0.05, 0.004, M.darkSteel, sx, (BY + deck - 0.03) / 2 + 0.005, sz));
    spoiler.add(acbox(0.05, 0.035, 0.06, 0.006, M.plasticLt, BX + 0.10, deck + 0.02, s * 0.24));
  }
  sys.add(spoiler);

  /* ── diffuser flap, drawn deployed at 18.0 degrees: a 0.7815 m ramp hinged
     at (-2.000, 0.135), clear of P.driveR which ends at x -1.80 and of
     drivetrain-7, whose rearmost vertex is at -1.730. Tapered in plan with
     the tail, 1.16 m at the hinge to 0.90 m at the exit, so no part of it
     hangs outside the bodywork. Exit area on the ladder's measure, exit span
     times rise, is 0.90 x 0.2415 = 0.217 m2 against body-7's 0.98 x 0.2068 =
     0.203: the nozzle grows even though the span narrows. The strakes take
     their rotation from the ramp's own vector rather than from a nominal
     angle, so they lie on the panel they stand on. ── */
  const RZF = Math.atan2(0.3696 - 0.1281, -2.7439 + 2.0007);
  const flap = lib.part('diffuser-flap', [-1.0, -0.4, 0]);
  const rampSection = (x, y, hz) => {
    const pts = [];
    for (let i = 0; i <= 6; i++) pts.push([x, y, -hz + (2 * hz * i) / 6]);
    for (let i = 6; i >= 0; i--) pts.push([x, y + 0.012, -hz + (2 * hz * i) / 6]);
    return pts;
  };
  flap.add(lib.loft([rampSection(-2.0007, 0.1281, 0.580),
                     rampSection(-2.7439, 0.3696, 0.450)], M.carbon, true));
  for (const z of [-0.40, -0.16, 0.16, 0.40]) {
    flap.add(acbox(0.72, 0.09, 0.010, 0.003, M.carbon, -2.372, 0.2489, z, RZF));
  }
  const hinge = lib.cyl(0.012, 1.16, M.darkSteel, 12);
  hinge.rotation.x = Math.PI / 2;
  hinge.position.set(-2.000, 0.135, 0);
  flap.add(hinge);
  for (const s of [-1, 1]) {
    flap.add(acbox(0.05, 0.04, 0.06, 0.006, M.plasticLt, -2.08, 0.205, s * 0.30));
  }
  /* Strake fixings, two per strake, taking the ramp's own rotation so the
     heads sit flat on the panel they bolt through rather than near it. Two
     coordinates matter and a first pass had both wrong. The strake's center
     line already lies on the ramp's lower face, so the seat needs no y
     offset at all: the 6 mm one it carried put the head inside the 12 mm
     laminate. And the head has to stand clear of the fin it retains, so it
     sits 11 mm outboard of the strake's own plane, which leaves 1.4 mm
     between the 9.3 mm flange and the fin's 10 mm thickness. */
  for (const z of [-0.40, -0.16, 0.16, 0.40]) {
    for (const dx of [-0.24, 0.24]) {
      const f = lib.fastener(0.0038, M.steel, 'hex');
      f.rotation.set(0, 0, RZF, 'ZXY');
      f.position.set(-2.372 + dx * Math.cos(RZF), 0.2489 + dx * Math.sin(RZF),
                     z + Math.sign(z) * 0.011);
      flap.add(f);
    }
  }
  sys.add(flap);

  /* ── arch louvers, in the recess cut for them above. The blades keep
     body-7's section, spacing, thickness and 0.3 rad set angle and keep
     their offset of 14 mm off the flank surface, so the outer faces sit
     1.8 mm below the flank line at mid-height and 1.4 mm proud of it at the
     top corner, where the flank has narrowed 4.1 mm underneath them. That
     corner used to be the one place the bank showed, by piercing the paint.
     It is now the outermost thing in an open pocket, 6.3 mm inside the
     widest the body is at its height. Each bank is centered in its own bay
     between two stations, which is where the recess can clear the pod's
     leading shoulder. ── */
  const louv = lib.part('arch-louvers', [0.4, -0.05, 1.3]);
  const BANK = [[1.168, 4, 0.3, 1.1356, 1.3864], [1.573, 3, -0.3, 1.5406, 1.7294]];
  for (const [x0, n, ry] of BANK) {
    for (let i = 0; i < n; i++) {
      const x = x0 + i * 0.062;
      louv.add(acbox(0.05, 0.10, 0.010, 0.003, M.plastic, x, 0.500, halfWidth(x, 0.500) - 0.014, 0, 0, ry));
    }
  }
  /* Cassette side frames, one at each end of each bank, lying on the recess
     floor. These replace two 50 x 26 x 20 mm blocks that sat at y 0.600,
     outside the band the blades occupy and 10 mm inside the skin, which made
     them invisible for the same reason the blades were. A louver bank has to
     pivot in something, the something is a frame, and a frame down the height
     of the recess is both the honest part and the one a camera can see.

     THE FLOOR IS NOT A CONSTANT |z| PLANE, and a frame placed as though it
     were does not sit on it. The flank narrows 8.6 mm over the 106 mm the
     pocket spans, so a box seated on halfWidth(x, 0.500) - 0.030 buries its
     lower inner corner 4.1 mm in the floor and floats 4.4 mm off it at the
     top: measured off the built mesh, 186 triangles of the eight frames
     crossed the skin. The frame is tilted onto the floor's own line and
     seated from floorZ, so its inner face lies on the floor along its whole
     height. It is 100 mm rather than the floor's 106 so it keeps 3 mm to
     each wall, 24 mm deep so its face sits 6 mm below the flank line, and
     the blades stand 4 mm proud of that face. */
  const FRY = 0.4974, FRH = 0.100;         /* the floor runs y 0.4446 to 0.5502 */
  const frame = (x) => {
    const t = Math.atan2(floorZ(x, FRY + FRH / 2) - floorZ(x, FRY - FRH / 2), FRH);
    return { t, zc: floorZ(x, FRY) + 0.012 * Math.cos(t) };
  };
  for (const [, , , xa, xb] of BANK) {
    for (const x of [xa, xb]) {
      const f = frame(x);
      louv.add(acbox(0.014, FRH, 0.024, 0.004, M.plasticLt, x, FRY, f.zc, 0, f.t));
    }
  }
  /* Bank fixings, one through each frame. A louver bank is a serviceable
     item bolted to the liner, so it shows heads where a bonded panel would
     not, and this is the one place on the outer surface where that is true.
     Axis along +z, seating face on the FRAME rather than on the flank: a
     first pass set the seat 13 mm inboard of the loft and put every head
     9.5 mm inside the skin, and the pass after that moved the seat onto the
     unrecessed flank, where the heads stood 3.2 mm proud and reached
     |z| 1.0040 against a body whose widest point at this height is 1.0015,
     adding 0.33 cm2 of silhouette. Seated on the frame face the same head
     reaches halfWidth - 0.0028 and the 0.33 cm2 comes back off, which is the
     only frontal-area consequence this recess has and it is in the right
     direction. The seat is taken from the frame's own face center and the
     axis from the frame's own normal, so the head lies flat on the tilted
     face instead of standing on a plane 0.07 mm behind it. */
  for (const [, , , xa, xb] of BANK) {
    for (const x of [xa, xb]) {
      const fr = frame(x);
      const f = lib.fastener(0.0042, M.steel, 'hex');
      f.rotation.x = Math.PI / 2 + fr.t;
      f.position.set(x, FRY - 0.012 * Math.sin(fr.t), fr.zc + 0.012 * Math.cos(fr.t));
      louv.add(f);
    }
  }
  sys.add(louv);
  sys.add(mirrorZ(louv));

  /* ── sealed venturi underbody: carried, with the rear closeout reaching
     the moved hinge line at x -2.000 ── */
  const floor = lib.part('venturi-floor', [0, -0.55, 0]);
  const splitter = lib.plate(0.26, 1.02, 0.016, 0.06, M.carbon);
  splitter.position.set(2.228, 0.112, 0);
  floor.add(lib.shell(splitter));
  /* the valance, in four panels around the nose aperture. vx and vhz are
     body-7's own interpolants, so the surface outside the hole is the same
     surface it always was, station kink at y 0.280 included. */
  const vrow = (y) => {
    const h = vhz(y);
    return [-h, -AP.z, -AP.z / 2, 0, AP.z / 2, AP.z, h].map((z) => [vx(y), y, z]);
  };
  floor.add(lib.shell(lib.loft([vrow(0.128), vrow(AP.y0)], M.carbon)));
  floor.add(lib.shell(lib.loft([vrow(AP.y1), vrow(0.420)], M.carbon)));
  for (const s of [-1, 1]) {
    floor.add(lib.shell(lib.loft([AP.y0, 0.280, AP.y1].map((y) =>
      [[vx(y), y, s * AP.z], [vx(y), y, s * (AP.z + vhz(y)) / 2], [vx(y), y, s * vhz(y)]]), M.carbon)));
  }
  /* The duct. An aperture with a 14 mm return still let 1.9 percent of the
     slat bank read as daylight straight through the car, which is worse
     than the flat panel it replaced, so the rim is carried all the way back
     to a mouth 6 mm ahead of thermal-7's forwardmost vertex at x 2.2090.
     The floor rises to y 0.256 on the way, because that is where thermal-7's
     coil face starts and a duct whose exit sits below its heat exchanger is
     just a longer hole. One closed-loop loft, so all four walls and their
     four corners arrive together and the crease breaks every one. */
  const rim = (at) => {
    const p = [], b = at(AP.y0), k = at(0.280), t = at(AP.y1);
    for (const z of [-AP.z, -AP.z / 2, 0, AP.z / 2, AP.z]) p.push([b[0], b[1], z]);
    p.push([k[0], k[1], AP.z]);
    for (const z of [AP.z, AP.z / 2, 0, -AP.z / 2, -AP.z]) p.push([t[0], t[1], z]);
    p.push([k[0], k[1], -AP.z]);
    return p;
  };
  const MOUTH = { x: 2.215, y0: 0.256 };
  floor.add(lib.shell(lib.crease(lib.loft([
    rim((y) => [vx(y), y]),
    rim((y) => [MOUTH.x, MOUTH.y0 + (y - AP.y0) / (AP.y1 - AP.y0) * (AP.y1 - MOUTH.y0)]),
  ], M.carbon, true), CREASE)));
  for (const s of [-1, 1]) {
    floor.add(acbox(0.28, 0.05, 0.012, 0.004, M.carbon, 2.16, 0.19, s * 0.44));
  }
  /* Splitter fixings on the plate's top face, inboard of the side dams. A
     carbon lip working at a 110 mm gap is a strike item: it bolts on, and
     the heads are the honest evidence that it can be replaced. lib.plate
     puts its lower face at the given y plus half its thickness, so this
     16 mm plate at y 0.112 runs 0.120 to 0.136 and the seating face is
     0.136, not the 0.128 mid-plane a first pass used, which buried all four
     heads inside the laminate. */
  for (const z of [-0.40, -0.18, 0.18, 0.40]) {
    const f = lib.fastener(0.0040, M.steel, 'hex');
    f.position.set(2.170, 0.136, z);
    floor.add(f);
  }
  const closeF = lib.plate(0.78, 1.24, 0.012, 0.04, M.carbon);
  closeF.position.set(1.71, 0.10, 0);
  floor.add(lib.shell(closeF));
  const closeR = lib.plate(0.70, 1.24, 0.012, 0.04, M.carbon);
  closeR.position.set(-1.650, 0.10, 0);
  floor.add(lib.shell(closeR));
  for (const z of [-0.50, -0.21, 0.21, 0.50]) {
    floor.add(acbox(0.66, 0.055, 0.010, 0.003, M.carbon, -1.66, 0.13, z));
  }
  sys.add(floor);

  /* ── intake gates: carried, four-slat bank on the raked lower valance,
     now standing over a hole rather than over a panel. The bank is drawn
     shut and shut is where it lives, so it fills 85 percent of its own
     window from straight ahead; the other 15 percent used to be flat
     valance carbon and is now the throat, the lattice and thermal-7's coil
     face 118 mm behind it. Rastered over the bank window at 120 by 160
     rays: dead ahead 0.9 percent lattice, 1.2 percent coil, 0.6 percent
     casting; at 45 degrees 4.2 percent lattice. Before the aperture every
     one of those was 0.0.

     The lattice is 0.800 by 0.186, sized to overlap the hole by about
     12 mm on every edge so no oblique ray finds its way round the bars,
     and it sets 18 mm behind the valance skin. Its depth is 38.5 mm
     measured along the valance normal off the built mesh, not the 22 mm
     of the bar family alone: the cross bank sits 16.5 mm further back,
     which is what gives a grille its depth and is the number that has to
     clear the stack. Rearmost point x 2.2378 against thermal-7's
     forwardmost vertex at 2.2090, so 28.8 mm. ── */
  const gates = lib.part('intake-gates', [1.3, -0.08, 0]);
  /* The lattice is sized to the aperture rather than to itself: 0.800 by
     0.186 against a hole 0.772 wide and 0.161 measured up the valance's own
     slope, so it overlaps every edge by about 12 mm and no oblique view
     finds its way past the bars into the cavity. It sets 18 mm behind the
     valance skin, which is 4 mm behind the throat's inner lip. */
  const SET = 0.018;
  const mesh = lib.grille(0.800, 0.186, 0.022, M.darkSteel, {
    bars: 30, cross: 5, barW: 0.0045, chamfer: 0.0009,
  });
  mesh.rotation.y = Math.PI / 2;                /* bars across z, depth along +x */
  const back = new THREE.Group();
  back.add(mesh);
  back.rotation.z = -RAKE;
  /* front face SET behind the valance along its own normal, then back off
     half the lattice depth to get the group center */
  back.position.set(vx(0.287) - (SET + 0.011) * Math.cos(RAKE),
                    0.2870 + (SET + 0.011) * Math.sin(RAKE), 0);
  gates.add(back);
  for (let i = 0; i < 4; i++) {
    const y = 0.215 + i * 0.048;
    gates.add(acbox(0.012, 0.05, 0.80, 0.0035, M.plastic, vx(y) + 0.014, y, 0, 0.55));
  }
  for (const s of [-1, 1]) {
    gates.add(acbox(0.02, 0.20, 0.05, 0.006, M.plastic, vx(0.295) + 0.014, 0.295, s * 0.425));
  }
  gates.add(acbox(0.05, 0.03, 0.03, 0.006, M.plasticLt, vx(0.330) + 0.016, 0.330, 0.45));
  sys.add(gates);

  /* ── flush doors. The skins ARE the master surface between two shutlines
     now, not panels floating 3 mm above it, which is what this part's own
     text has claimed since body-7. Each door carries the far wall and lip
     of the cut in front of it and the near lip, wall and floor of the cut
     behind it, so the channel between two panels is closed and you see two
     lit walls and a dark floor rather than a painted line. Shutlines at
     x 0.850 / 0.060 / -0.940; the rear one is still 160 mm forward of the
     closure station, so all four joints stay on parallel bodywork. ── */
  /* ONE GROUP PER LEAF, plus a third that does not move: same meshes, same
     coordinates, different owner. The camera stalk and pod at x 0.980 are
     forward of the front door's leading cut, so they are on the A-pillar and
     carry no hinge. See SPEC.md's closures section. */
  const leaf = (id, rows, hx) => {
    const g = lib.hinge(lib.part('doors', [0.08, 0, 0.85]), id);
    g.add(panel(rows, DOORBAND));
    g.add(acbox(0.14, 0.024, 0.012, 0.004, M.alu, hx, 0.845, halfWidth(hx, 0.845) + 0.008));
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
  const zr = halfWidth(0.98, 0.870);
  fixed.add(acbox(0.014, 0.012, 0.09, 0.004, M.plastic, 0.98, 0.870, zr + 0.045));
  fixed.add(acbox(0.05, 0.028, 0.028, 0.004, M.sensor, 0.98, 0.870, zr + 0.098));
  for (const g of [leaf('door-front', [CUT[0], CUT[1]], 0.16),
                   leaf('door-rear', [CUT[1], CUT[2]], -0.84),
                   fixed]) {
    sys.add(g);
    sys.add(mirrorZ(g));
  }
}
