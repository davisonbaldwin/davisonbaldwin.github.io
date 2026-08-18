/* Gen 6 body: the generation where the PACKAGE moved.

   Five generations optimized Cd against a frontal area nobody was allowed to
   touch, because every shell variant imported buildStructure() from body.js
   and inherited a safety cage whose roof rails sit at y 1.40 to 1.42. That
   one line fixed the roof near 1.45 and the frontal area near 2.32 m2. Drag
   is proportional to CdA, not Cd, so the ladder had been optimizing the
   smaller half of the product.

   body-7 therefore does NOT call buildStructure(). It carries the front and
   rear castings, the crash rails and the rockers at their existing
   coordinates (they are low and were never the constraint) and replaces the
   cage: roof rails down to y 1.30 and inboard to |z| 0.51, A-pillars raked
   from 48 to 59 degrees, B-pillars 110 mm shorter. The roof crown falls
   1.452 to 1.360, the beltline 0.94 to 0.925 half-width, and the plan view
   finally boat-tails behind the rear arches.

   Measured by the same integration used on body-6 (max half-width over all
   stations, integrated in y, plus the lower nose band and the tire columns):
   A 2.099 m2, Cd 0.118, CdA 0.247 m2 against body-6's 2.318 / 0.130 / 0.301.
   Frontal area down 9.5 percent, CdA down 17.9 percent.

   design/gen6.md asked for A 2.09 and CdA 0.219 at a Cd of 0.105. The area
   half of that product stands. The coefficient does not: an independent
   audit rejected 0.105, and the figure carried through this module is the
   audited 0.118, so CdA misses the brief by 0.028 m2. The cause is the
   afterbody and it is the useful lesson of this generation. The plan view
   does not begin to close until x -1.83, because the 1.62 m rear track plus
   suspension-4's rear-steer sweep pin the haunch at 0.950 half-width out to
   there, so the entire 0.400 m of closure falls in the last 845 mm at plan
   half-angles of 21.5, 21.8 and 33.1 degrees. Flow leaves a taper like
   that, and the base the wake acts on is then the section where it left,
   not the 0.291 m2 where the carbon stops. The tail-cone part carries the
   arithmetic and names the lever that fixes it, which is the rear track.

   The 0.009 m2 the area misses by is owned rather than rounded away. The
   brief sized a
   front fairing against the steering sweep at hub height, where the tire's
   outer corner reaches |z| 0.9856 at 14 degrees of lock. That is not the
   binding corner. A 185-section tire is full width to within 30 mm of its
   crown, so at 40 mm of bump the corner that touches the pod is the UPPER
   outer one at y 0.66, and clearing it means holding the fairing 0.94 wide
   to y 0.78 instead of letting the fender fall away from y 0.58. The rear
   haunches needed the same treatment for suspension-4's rear steer. Those
   two shoulders are 0.049 and 0.017 m2, and the honest reading is that
   enclosing a steered wheel costs more frontal area than sizing it at the
   hub suggests.

   Gen 6 preset partners, every cited number derived from their GEOMETRY and
   not their prose (retro-gen4 / retro-gen5-apex drift law): battery-6
   (pack envelope, floor plane), drivetrain-6 (rear in-wheel annulus r 0.155
   to 0.235 at |z| 0.72 to 0.80, front unit in P.driveF), thermal-6 (front
   stack, and its condenser inlet header at y 0.744 to 0.770 which body-6's
   hood skin passes through), hv-4 (48 V zonal actuation), suspension-4
   (+-3 degree rear steer, ride-height hold), autonomy-4 (lidar pucks at
   (2.33, 0.615, +-0.30), camera pods), wheels-6 (185/50 R21, static tire
   faces at |z| 0.7175 and 0.9025), interior.js and interior-4.js (seat
   cushion top face at y 0.565 front, 0.510 rear; backrests drawn at 0.26
   and 0.30 rad).

   Mass ledger, binding +-2 kg: 204 kg structure + 162 kg shell = 366 kg,
   against body-6's 352. The cage, the longer tail and the front fairings
   all cost mass and each one is named. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';
import { mirrorZ } from './body.js';

export const SYSTEM = {
  id: 'body-7',
  name: 'Body · Gen 6 form',
  color: 0xc3e0f0,
  explode: [0, 1.7, 0],
  blurb: 'The first body on this ladder that was allowed to change its own package. A new cage drops the roof 92 mm and pulls the rails 105 mm inboard, the plan view boat-tails behind the rear arches, and the front wheels disappear into fairings. Frontal area 2.318 to 2.099 m2, Cd 0.130 to 0.118, CdA 0.301 to 0.247: an 18 percent drag reduction, and nearly all of it is the area rather than the coefficient. The brief asked for Cd 0.105 and the tail does not deliver it, because the rear track holds the plan view open until 845 mm before the truncation. 366 kg, and the bills are in ingress, headroom and a 21.4 m turning circle.',
  /* THE CLOSURES. Gen 6 is the first body on this ladder to define its own
     structure rather than inherit a shared cage, and the doors are where that
     shows up as hardware. The axis on both leaves sits ON the paint, at each
     leaf's own widest point, rather than inside it. That is not this rung
     being clever: it is what the sweep says a door on a flank this flat has
     to do, and body-8 records the hypothesis that the front fairing's 83 mm
     step would make an ordinary inboard hinge work, along with the 36.5 mm of
     fairing it went through when that was tested.

     What this rung DOES own is the aperture. body-7 is the generation that
     lowered the roof crown 92 mm and pulled the beltline in 15 mm, so the
     door band it opens is shorter top to bottom than anything below it on the
     ladder, and the curbside figure below is the price of reaching a cabin
     that got smaller rather than of a hinge that got worse.

     THE TWO LIDS ARE THE SAME PROBLEM TWICE AND IT IS NOT THE DOORS'
     PROBLEM. A door swings about a vertical axis over a flank that is
     nearly a cylinder, so the axis can sit on the surface and the panel
     stays out of its neighbors. A lid swings about a transverse axis over a
     deck that is CROWNED, so the line it lifts is a curve and the hinge is
     a straight line, and every millimeter of camber between the two is
     panel driven into the fixed skin behind it. Measured on this body, the
     cowl cut cambers 173.0 mm and the trunk lid's aft cut 113.1, and both
     axes therefore sit at the crown of their own cut rather than at its
     ends. Which END each lid hinges from is a separate question and the
     trunk lid answers it the unusual way, because the airbrake is drawn
     deployed 15.2 mm behind its aft cut. */
  closures: {
    'door-front': {
      name: 'Front door',
      kind: 'door',
      part: 'doors',
      mass: 8.5,
      seconds: 1.2,
      seat: 'Hinge pillar at the x 0.8487 cut, axis on the skin at |z| 0.9230',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [0.8487, 0.700, 0.9230], deg: 67 },
      ],
      why: 'A vertical axis on the surface at the leading cut. The cut itself is placed off built partners rather than drawn: 0.8487 is where the flank hands over to the nose, and the leaf runs from there back to the B-pillar station at 0.0589. Putting the axis on the paint instead of inside it is what keeps the leading edge out of the fixed panel ahead of it, and body-8 and body-9 both measure what the alternative costs on this same surface.',
      cost: [
        'Sixty-seven degrees of swing needs most of a meter of clear ground, so the door reaches the line of a 2.50 m stall about a third of the way open. Every rung from here to Gen 5 is an argument with that.',
        'The hinge hardware stands outboard of the paint while the door is moving, which is a wind noise path and a place for a bollard to find the door face rather than its edge.',
      ],
    },
    'door-rear': {
      name: 'Rear door',
      kind: 'door',
      part: 'doors',
      mass: 9.5,
      seconds: 1.2,
      seat: 'B-pillar hinge at the x 0.0589 cut, axis on the skin at |z| 0.9423',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [0.0589, 0.700, 0.9423], deg: 67 },
      ],
      why: 'Front-hinged off the B-pillar, the ordinary arrangement, available because the front door\'s trailing edge covers the pillar and gives this leaf something to hinge from. The rear cut sits ahead of the rear arch so the panel swings clear of the wheel at every angle rather than over it. body-9 is where this door stops being ordinary: with the same geometry hinged the other way round, the two leaves open one aperture with no door edge in the middle of it.',
      cost: [
        'A pillar between the two apertures is the single largest obstruction to getting into the back seat, and this body keeps it.',
      ],
    },
    hood: {
      name: 'Hood',
      kind: 'hood',
      part: 'skin',
      mass: 9,
      seconds: 1.4,
      seat: 'Cowl cut at x 1.1282, axis carried up to the crown of that same cut at y 1.0560',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [1.1282, 1.0560, 0], deg: 65 },
      ],
      why: 'The channel was already here and the panel was not. All four of this hood\'s cut lines have been 5 mm wide and 4 mm deep in the master grid since this body was drawn, and the deck band ran straight over the top of them, so making the hood open is a re-slice of one loftMesh at four indices the grooves had already resolved to, rows 7 and 29 by columns 33 and 60. 594 quads, 1.7399 m2, and the triangle soup of the closed car is identical to the vertex. What it uncovers is 1089.5 by 1641.1 mm of aperture, x 1.1282 to 2.2178 and |z| out to 0.8209, which covers P.frunk\'s x 1.78 to 2.12 by |z| 0.45 with 370 mm of margin at the sides.\n\nTHE AXIS HAS TO SIT AT THE CROWN, AND THAT IS MEASURED RATHER THAN STYLED. The cowl cut is not a straight line. Across its own length it falls 173.0 mm, from y 1.0560 at the crown to 0.8830 at the outboard end 820.9 mm out, because this body\'s deck shoulder is 92 mm lower than body-6\'s and the section turns harder to get there. A transverse hinge is one straight line and the cut it lifts is a curve, so wherever the axis is not, the cut rotates through the fixed panel behind it. Put the axis at shoulder height, y 0.8830, which is where a side elevation would draw it, and the crown of the leading edge is 0.13 mm into the cowl band at 0.8 degrees of travel, at (1.1287, 1.0516, 0.0503). Move it instead 60 mm forward at crown height, the gooseneck this body\'s own survey recommended after measuring the crown and nothing else, and the OUTBOARD end of the same cut is 0.32 mm into the cowl at 0.6 degrees, at (1.1332, 0.8852, -0.8190). Those are one failure seen from the two ends of one line, and the axis through the crown at the cut itself is the only place on that line that has neither.\n\nSIXTY FIVE DEGREES, AND FOR ONCE THE THING THAT LIMITS IT BELONGS TO THIS MODULE. Swept over a 70 degree travel the first contact anywhere is at 68.5 degrees and it is 0.02 mm at (1.1302, 1.0589, 0.0252), which is the far wall of the hood\'s own channel rolling onto the lip it shuts against. The published travel is three and a half degrees inside that. It costs 527.7 mm of headroom, since the parked car stands 1.4291 m and the open hood tops out at 1.9568, and it costs nothing at all in lateral, fore or aft excursion. This is the closure to think about in a garage; the doors are the ones to think about in a stall.',
      cost: [
        '527.7 mm of headroom on a car that parks at 1.4291 m. Nothing else on this body spends height like that: the decklid at the same 65 degrees spends 23.8 mm, and every door on the ladder spends zero.',
        'The pivot is 173.0 mm above the outboard corners of the panel it carries, so the hardware is not two butt hinges on the cut line, it is two cranked arms that lift the pivot to crown height, and they have to live between this cut and the canopy glass root at x 1.070. Measured nearest vertex to nearest vertex, that gap is 62.2 mm with the hood shut and 59.4 mm at full open, so it never opens up: the hinge tower gets the space it has and no more.',
        'It opens onto hardware rather than onto a tub. Dropping a ray straight down on a 25 mm grid from the panel to the first thing under it, the clear depth over the aperture runs 5 to 883 mm across 1.5275 m2 and totals 668 L, and the surface those rays land on is body-7/venturi-floor 18 percent of the time, body-7/front-casting 15 and interior-6/dashboard 13. No frunk liner is drawn on this car, so that figure is the volume of the bay and not the volume of a suitcase.',
      ],
    },
    decklid: {
      name: 'Decklid',
      kind: 'decklid',
      part: 'tail-cone',
      mass: 3.5,
      seconds: 1.3,
      seat: 'Aft cut at x -2.3196, axis at the crown of that cut at y 1.0021; hinged at the REAR edge because the airbrake owns the other arrangement',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [-2.3196, 1.0021, 0], deg: 65 },
      ],
      why: 'The same re-slice on four indices the grid already had, rows 77 and 86 by columns 34 and 61, 243 quads and 0.5660 m2, and the columns are NOT the hood\'s. The two side gaps at ring fraction 3.7 and 10.3 were pushed twice, once over each lid\'s span, and they resolve to 33 and 60 forward against 34 and 61 aft, because common.js probes the meters-per-index scale over each groove\'s own run and the deck is a different width in the two places. A shared constant would have sliced this lid one grid line off its own channel and opened a hairline down the deck. What opens is 430.0 by 1256.9 mm over the rear well.\n\nTHE AIRBRAKE DECIDES WHICH EDGE HINGES, and that is the finding on this panel. body-7/kamm-flap is drawn at its deployed extreme, 78 mm proud, and the forwardmost surface of that assembly stands at x -2.3350, which is 15.2 mm behind this lid\'s aft cut, with its top at y 1.0156, 13.5 mm above the lid\'s own crown at the same station. Hinge the lid at the front, which is what a trunk lid does, with the axis at the crown of the front cut as the camber demands, and it is clean to 12 degrees and then 6.00 mm into the blade at 14.4, at (-2.3658, 1.0203, -0.5072). Translate that same blade down 78 mm to the flush end of the travel this module publishes for it, change nothing else, and the identical conventional lid is clean through 60 degrees. So the obstruction is the blade\'s POSE and not its existence, and the fix a real car uses is an interlock: retract the spoiler, then release the latch. This model does not get that fix, because the blade is drawn deployed and every frontal-area and silhouette figure this module publishes is measured on that pose. What it gets instead is the hinge on the other edge, which needs no interlock at all. Measured nearest vertex to nearest vertex, the gap from this lid to the blade is 20.0 mm shut and grows through 25.5 at 20 degrees and 30.5 at 40 to 35.3 at 65: hinged at the rear, the lid opens away from its own airbrake instead of over it.\n\nTHE AXIS IS AT THE CROWN FOR THE SAME REASON THE HOOD\'S IS. The aft cut falls 113.1 mm, from y 1.0021 at the crown to 0.8890 at |z| 0.5359, and an axis at shoulder height drives the panel 1.04 mm into the fixed deck at 0.9 degrees of travel, at (-2.3197, 0.9757, 0.3104). At the crown it is clean through 65 degrees and the first contact anywhere is at 68.3, 0.05 mm, its own channel wall against the fixed lip behind it. The overhead cost is the pleasant number: 23.8 mm against the hood\'s 527.7 at the same angle, and it can never exceed 26.5 mm however far the lid is commanded, because the pivot is 427.0 mm below the roof crown and the longest radius from that pivot to any point on the panel is 453.5 mm. A boat tail that has already given up its trunk width gets its garage clearance back for nothing.',
      cost: [
        'It hinges at the wrong end for a person. Standing at the tail, the open panel leans forward over the aperture instead of back out of it. Measured at 65 degrees the panel still reaches 205.7 mm forward of its own hinge in plan, so it covers the rear 48 percent of a 430.0 mm well and everything goes in past it. A conventional lid puts the panel on the far side of the opening, and this body cannot have one while its airbrake is up.',
        'The pivot line and the spoiler mounts want the same deck. The cut is at x -2.3196 and the blade assembly reaches forward to x -2.3350, so there are 15.4 mm between the hinge line and the nearest mount, on a 425 mm bonded cantilever this part\'s own failure list already calls a fatigue structure.',
        'There is no trunk pan. Dropping a ray down on a 25 mm grid from the panel, the first surface beneath it is body-7/rear-casting over 56 percent of the aperture and body-7/diffuser-flap over 42, so on two fifths of the opening the model has the load falling through to an underbody aerodynamic device. Mean clear depth is 605 mm and the deepest ray is 996. The tail cone already says the load floor stops at x -2.15; this is the same sentence with an area attached to it.',
      ],
    },
  },
  parts: {
    /* ── structure: carried coordinates, new cage ───────────────────────── */
    'front-casting': {
      name: 'Front megacasting',
      tagline: 'Untouched from Gen 1 by drawing number, because the constraint was never down here.',
      mass: 48,
      specs: [
        ['Process', 'High-pressure die cast, vacuum assist, 6,100 t lock'],
        ['Alloy', 'AlSi10MnMg, natural aging, no quench'],
        ['Envelope', 'Spars at x 1.55 to 2.06, y 0.30 to 0.72, |z| 0.355 to 0.595'],
        ['Carried', 'Every hardpoint identical to body.js, Gen 1 to Gen 6'],
        ['Cooling bay', 'Open above y 0.370 between the spars'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'The casting is unchanged from the Gen 1 drawing: molten AlSi10MnMg injected at 700 degrees C under partial vacuum, filling a 1.5 m part in under 100 milliseconds, reaching strength by natural aging because a casting this large would warp in the water quench a T6 treatment needs. It gathers the crash rails, the upper apron loads and the rocker fronts, and it stays elastic while the bolted rails ahead of it fold. Every suspension and drive mount is machined in one fixture, so the front axle geometry hangs off a single datum, which is the whole reason suspension-4 can hold plus or minus 0.15 mm on its pivot bores.\n\nWhat this generation asked of it is worth stating precisely, because the answer was nothing. Gen 6 lowers the roof crown 92 mm and pulls the beltline in 15 mm, and the casting lives entirely below y 0.72 and inside |z| 0.60. It is under the hood, under the frunk, inboard of the new front wheel fairings by more than 400 mm. The finding that opened this generation was that a shared cage froze the roofline; nothing about a shared front casting froze anything, and it would have been dishonest to redraw a part just to make the generation look busier.\n\nOne thing did change and it is a correction rather than a redraw: the cross portion that ties the two spars. It was a solid 0.31 by 0.28 by 0.68 m block filling x 1.760 to 2.070 over the casting\'s full section height, 0.0590 cubic meters of drawn aluminum against 48 kg declared for the whole part, and it stood in the volume thermal-6 uses for its heat pump, glycol loop and pressure set. Measured by ray parity, thermal-6/pressure-set was 93.0 percent enclosed by this casting. It is now a lower crossmember at the casting front face, x 2.000 to 2.070 and y 0.300 to 0.370, and the bay above it is open: pressure-set falls from 60.0 to 45.0 mm, thermal-6/radiator from 48.0 to 33.0, thermal-6/heat-pump from 20.0 to 7.3, and thermal-6/glycol-loop clears entirely. Every hardpoint is where it was.',
      why: 'The discipline of a ladder is knowing which inherited part is a constraint and which is merely inherited. The cage was a constraint: it set the roof, and through the roof the frontal area, and through the frontal area 40 percent of highway drag. The front casting sets the front axle datum and nothing above y 0.72. Redrawing it would have moved 48 kg of proven hardware to buy zero counts and would have put every front suspension pickup back on the table, which is the trade an unconstrained program finds it easiest to get wrong: change is not the same thing as improvement, and a generation that renumbers a part it did not improve has spent its credibility rather than its resources.',
      fail: [
        'Gas porosity remains the process risk: trapped air becomes subsurface voids, controlled by vacuum level and caught by X-ray sampling.',
        'The spars are still drawn solid and suspension-4 still arrives inside them: front-structure reaches 92.68 mm into the spar at (1.550, 0.483, +-0.511), which is a pivot bracket the casting does not draw. Thinning the spar to a real section makes the reported straddle depth worse rather than better, so it is measured and left rather than quietly redrawn.',
        'A crash hard enough to yield the casting writes off the shell, and Gen 6 makes that worse in one narrow way: the front fairings are bonded to the casting nose, so a fairing strike now books a bond-line inspection as well as a panel.',
        'Every steel bolt into aluminum is a galvanic couple; the new cage is hot-stamped steel and lands on this casting through the same adhesive-and-rivet isolation the Gen 1 cage used.',
      ],
      explode: [0.85, -0.35, 0],
    },
    'rear-casting': {
      name: 'Rear megacasting',
      tagline: 'Same casting, 300 mm further from the tail than it has ever been.',
      mass: 50,
      specs: [
        ['Process', 'High-pressure die cast, conformal die cooling'],
        ['Envelope', 'x -1.60 to -2.05 plus rails to -2.25, y 0.30 to 0.72'],
        ['Integrates', 'Spring seats, wheelhouses, cradle and rail mounts'],
        ['Carried', 'Coordinates identical to body.js'],
        ['Change this generation', 'Tail structure aft of x -2.25 is now shell, not casting'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'The casting itself is the Gen 1 part: one shot replacing 79 stamped pieces, thick spring-seat bosses fed by conformal die cooling so solidification stays even and hot tears stay out of the rib junctions, short bolted rails and a beam behind it that take the low-speed hits and unbolt for repair. It carries the rear drive cradle on three bushings and reacts the rear belt and seat anchor loads.\n\nWhat changed is what sits behind it. Gen 5 ended the body at x -2.375, 125 mm behind the rear beam. Gen 6 ends at -2.675, so there are now 425 mm of tail cone hanging off the casting rear face, a bonded carbon structure carrying nothing but air loads and the Kamm blade. That is a new load case for this casting: not force, but moment. A 1.16 m span blade at full airbrake puts roughly 900 N of download 0.42 m behind the casting face, a 380 Nm couple the rear rail bolt pattern now sees in fatigue rather than only in crash. The bolt pattern is unchanged; the preload spec is not, and the tail cone bonds to a machined pad on the casting rather than to sheet.',
      why: 'A longer tail is the last large aerodynamic account on this body, and the honest place to put the length is behind the crash structure, where nothing has to survive an impact. Keeping the casting where it has always been and treating the extra 300 mm as pure aerodynamic bodywork means the boat tail weighs 8 kg of carbon instead of a re-cast rear end, and the rear crash performance is literally the Gen 1 result because it is the Gen 1 hardware, certified on the Gen 1 pulse. What that 300 mm actually returned is smaller than the brief assumed, about 3 counts against the 16 an attached closure would have paid, and the reason is on the tail-cone part: the length is right, the distribution of it is not. That is an argument about where the taper sits, not about where the casting sits, so this decision stands.',
      fail: [
        'Hot tearing at thick-to-thin transitions is still the casting defect that matters; CT scans on a sampling plan police it.',
        'The tail cone bond pad is a new fatigue site: a bonded 425 mm cantilever driven by a moving aerodynamic device is exactly the joint that finds out about cure-schedule drift five years later.',
        'Yield the casting and the shell is done, unchanged from Gen 1, and now with a longer tail to re-index afterward.',
      ],
      explode: [-0.85, -0.35, 0],
    },
    'crash-rails': {
      name: 'Crash rails and bumper beam',
      tagline: 'Bolt-on crush cans, unchanged, now with 135 mm of tail cone ahead of them instead of 43.',
      mass: 14,
      specs: [
        ['Section', '90 x 90 mm octagonal, 3.0 mm wall, 6082-T6'],
        ['Mean crush force', '~120 kN per rail over 230 mm'],
        ['Beam', 'x 2.21 to 2.27, 1.30 m span, carried coordinates'],
        ['Rail centerline', '|z| 0.550, was 0.420, flush with the spar wall'],
        ['Nose skin ahead of beam', '105 mm (Gen 5: 98 mm)'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'An octagonal extrusion with stamped trigger beads folds at near-constant force, and constant force is the design goal because energy is force times stroke: two rails at 120 kN over 0.23 m absorb about 55 kJ. The beam is curved in plan to cover 85 percent of vehicle width so partial-overlap hits load both rails. Everything is bolted against shear sleeves, so a moderate hit is a hand-tool repair with no jig.\n\nGen 6 moved no coordinate here and the cross-module sweep has since moved one, so the warning this paragraph was written to carry now has a counter-example attached to it. The warning first. The obvious thing to do with a bluffer nose and a lower roof is to redraw the crash structure to suit the new surface, and the obvious thing is wrong: the rails are sized by a 56 km/h offset barrier and the beam by the regulated 445 to 555 mm bumper band, and neither of those cares what the skin above looks like. What the new nose does change is the space in front: the fascia line runs to x 2.375 as before, but the nose is now bluffer, so the crushable volume forward of the beam grows from 98 to 105 mm of usable stroke before the skin loads the beam. That is not a design intent, it is a consequence, and it is recorded here so the next generation does not mistake it for one.',
      why: 'Crash structure is a fuse hierarchy, and the member that yields first must be the one ahead of the megacasting, because yielding the casting ends the shell. That ordering has not changed in six generations and no amount of aerodynamic ambition is allowed to reorder it. The one thing this generation owes the rails is honesty about the nose: a lower, bluffer front is a better pedestrian nose and a slightly longer crush package, and neither was the reason it is shaped that way. It is shaped that way because thermal-6\'s condenser header sits at y 0.770 and the skin has to pass over it.\n\nThe rails moved outboard and the beam did not, and the difference between those two decisions is the whole of what the cross-module sweep taught this part. The rails moved because a 90 mm section on |z| 0.420 runs 70 mm inside a cooling core that reaches |z| 0.445 on every rung, so the rail was drawn through the tube bank: 145.0 mm here on Gen 6, the deepest single pair on the ladder. On |z| 0.550 the section clears the core by 60 mm and passes outboard of it, which is where a front rail belongs. The beam did not move, and the reason is a plane thermal itself keeps. The beam\'s rear face is x 2.2100. thermal-7 stops its outdoor coil at x 2.2090 and thermal-9 at the same station, 1.0 mm behind that face, twice, deliberately. thermal-6 runs its condenser to x 2.2550 and its radiator to x 2.2574, so 45.0 and 47.4 mm of core stand forward of a plane the two later thermal packs respect to the millimeter. Moving the beam forward to clear them would spend 55 of the 105 mm of pedestrian crush ahead of it to accommodate one generation\'s error, so the residual pair is left failing and the number is written here instead.',
      fail: [
        'The Gen 6 cooling pack still crosses the bumper beam: thermal-6\'s condenser front face at x 2.2550 and its radiator at x 2.2574 stand 45.0 and 47.4 mm forward of the beam\'s rear face at x 2.2100, and that is a thermal-6 coordinate, not a body one.',
        'A small-overlap impact outboard of the rails bypasses them entirely, and Gen 6 puts a wheel fairing exactly there: the fairing is frangible and is designed to be gone before it can lever the wheel.',
        'Chloride sitting inside the closed section corrodes unseen; drain holes and internal wax are the countermeasure.',
        'Bent rails are replaced, never straightened: work-hardened folds have already spent their ductility.',
      ],
      explode: [0.95, -0.05, 0],
    },
    rockers: {
      name: 'Rocker beams',
      tagline: 'Eight chambers between a pole and 150 kWh, and now only 8 mm from the skin instead of 25.',
      mass: 22,
      specs: [
        ['Process', '6082-T6 multi-void extrusion, 8 chambers'],
        ['Section', '100 x 70 mm, outer face at |z| 0.915'],
        ['Design case', 'Side pole, 32 km/h, 254 mm diameter'],
        ['Intrusion budget', '< 40 mm at the battery-6 pack rail'],
        ['Skin cover', '6.0 mm minimum, at x 0.30, over the whole 2.02 m'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'The side pole test sizes any EV sill: a rigid 254 mm pole at 32 km/h puts all of its energy into a hand-width of rocker. Eight extruded chambers crush in sequence from outboard in, each web adding a step to the force curve, absorbing the hit in about 70 mm of controlled collapse; whatever remains crosses the battery-6 crossmembers to the far rocker so both sides of the car resist a one-sided strike. The 40 mm intrusion budget is a contract with the pack, not a body target.\n\nThe Gen 6 note is a clearance, and stating it correctly means correcting a number the ladder has been quoting loosely. The rocker outer face has always sat at |z| 0.915, and Gen 5 is usually credited with 25 mm of cover over it. That 25 mm is a beltline measurement, taken at y 0.55 where body-6 runs 0.940 half-width. Sampled at the sill itself, y 0.32 to 0.42, body-6 gives 19 mm at the rear of the extrusion, 2 mm at x 0.45, and nothing at all forward of about x 0.50, because its open front arch means the loft has no flank down there: the front 500 mm of the Gen 5 rocker is bare metal in the arch throat, painted and dressed but uncovered. Gen 6 closes that arch with a fairing, so the whole 2.02 m of extrusion is under skin for the first time on this ladder, and the minimum cover over the entire length is 6.0 mm of carbon plus adhesive at x 0.30. Six millimeters everywhere is better than twenty in one place and zero in another, but it is a hard tolerance stack rather than a comfortable one: a 6 mm cover cannot absorb a 3 mm build variation the way 19 mm could, and the assembly datum for the skin over the sill moves from the body side to the rocker face itself.',
      why: 'The rocker is not really a body part, it is the seatbelt of the pack, and its section was sized outward from the cell map. That is why it did not move when the roof did. Narrowing the beltline to chase frontal area was allowed to spend the sill\'s remaining cosmetic clearance because a millimeter of skin cover buys nothing and a millimeter of half-width buys 0.002 m2 of frontal area across the full height of the car.',
      fail: [
        'Intrusion past 40 mm compromises the outer cell rows and totals the pack; the body repair is the smaller half of that event.',
        'The 6 mm skin cover is a new build risk: a rocker set 3 mm proud prints through the flank as a highlight kink running the length of the car, and there is no shim path once the skin is bonded.',
        'A curb strike can crush inner chambers invisibly; sill impacts warrant inspection even when the paint survives.',
      ],
      explode: [0, -0.5, 0.3],
    },
    cage: {
      name: 'Low safety cage',
      tagline: 'The part that had to change first: five generations of roofline lived in these four coordinates.',
      mass: 70,
      specs: [
        ['Material', '22MnB5 hot stamped, 1,500 MPa after die quench'],
        ['Roof rails', 'y 1.296 to 1.300 at |z| 0.510 (was 1.40/1.42 at 0.615)'],
        ['A-pillar rake', '58.9 degrees from vertical (was 48.0)'],
        ['B-pillar top', 'y 1.290 (was 1.400), 110 mm shorter'],
        ['Roof crush', '4.4x curb mass before 127 mm, held with a third bow'],
        ['Maturity', 'Production practice; the geometry is new, the process is not'],
      ],
      how: 'The arithmetic that made this generation possible is short. body.js puts its roof rails at y 1.40 to 1.42, |z| 0.615, in a 84 mm round section, so the skin that wraps them cannot sit below about 1.45 and the roof crown is fixed there. Every body from Gen 1 to Gen 5 imported that function. Lower the rails to y 1.30 and the crown follows to 1.36, which is 92 mm of height across the full 1.85 m width of the car, and that is where the 10 percent of frontal area comes from. Pulling the rails inboard from |z| 0.615 to 0.510 does the rest: it lets the tumblehome above the beltline steepen to a half-width of 0.640 at y 1.12 and 0.550 at y 1.34, where body-6 measures 0.757 and 0.687. The rail section shrinks to 56 mm to fit under a 1.36 m crown, its top face landing at y 1.324 to 1.328 against a loft roof band at 1.336 to 1.339, and the A-pillars rake from 48 to 58.9 degrees to reach the new header at (0.30, 1.296).\n\nAll of that costs strength somewhere, and the ledger is +8 kg. Two things get lighter: the B-pillars lose 110 mm of length and the A-pillars lose 104 mm of rise, which is about 3 kg of blank. Three things get heavier. A 56 mm rail carries less section modulus than an 84 mm one, so the rails go to a tailored blank with a 2.4 mm center section against 1.8. Rails 105 mm further inboard leave a longer unsupported roof span under the FMVSS 216 platen, so a third transverse bow goes in at x -0.10 to restore the roof\'s plate action, which the Gen 1 cage did not need. And a 58.9 degree A-pillar is a beam, not a strut: at 48 degrees roof-crush load runs largely down the pillar axis, at 58.9 the axial component drops by 18 percent and the bending component rises correspondingly, so the pillar section grows from 38 x 90 to 44 x 96 mm. Steel that lies down has to be thicker than steel that stands up, and that is most of the eight kilograms.',
      why: 'The critique that produced this generation was that Cd had been a design variable for five generations and frontal area had not, because frontal area lived inside an imported function nobody read as a design decision. This cage is the answer to that, and it is the only part on the car whose entire justification is a number 92 mm high. It is also the honest illustration of what "unlimited resources" actually buys: not a free lunch, but permission to spend 8 kg of hot-stamped steel and a full roof-crush recertification to move a roofline, where a cost-driven program would have kept the shared cage and optimized the skin for a sixth time.',
      fail: [
        'Martensite does not tolerate straightening: damaged members are cut out and section-replaced, and the new rail is a tailored blank, so a section repair must land on the correct thickness zone or the roof-crush result is not the certified one.',
        'The rail inner face sits at |z| 0.482, a 15 mm crushable FMVSS 201 head pad takes it to 0.467, and the 95th percentile head shadow reaches 0.46: seven millimeters of air, which is why that pad is a certified component rather than trim and why its material is on the homologation drawing.',
        'Hydrogen picked up in the furnace can embrittle boron steel, and a thinner, more highly loaded rail is less forgiving of it than the Gen 1 section was; dew point control in the line is the quiet safeguard.',
      ],
      explode: [0, 0.36, 0],
    },

    /* ── shell ──────────────────────────────────────────────────────────── */
    skin: {
      name: 'Gen 6 form skin',
      tagline: 'body-6 carried the Gen 3 loft verbatim because the package was frozen; this is what happens when it is not.',
      mass: 52,
      specs: [
        ['Counterpart', 'body-6 skin, 56 kg: same material, entirely new surface'],
        ['Construction', 'Thin-ply CFRP 1.1 mm, AFP laid, bonded to the new cage'],
        ['Stations', '15 rings, x +2.375 to -2.675, 15 points per ring'],
        ['Roof crown', '1.360 (body-6: 1.452); beltline half-width 0.925 (0.94)'],
        ['Frontal area', '2.099 m2 total (body-6: 2.318), Cd 0.118 (0.130)'],
        ['Maturity', 'Skin pilot line; Cd 0.118 is an audited extrapolation'],
      ],
      how: 'body-6 carried the Gen 3 loft without moving a coordinate and said so plainly: the surface was already pressed against every hard point it owned, so re-lofting would have bought fractions of a count. That was true and it was the wrong conclusion, because one of those hard points was a cage nobody had questioned. This skin is the same material on a surface that was allowed to move. The roof crown drops from 1.452 to 1.360 following the rails to y 1.30. The tumblehome above the beltline steepens hard: half-width 0.640 at y 1.12 where body-6 measures 0.757, and 0.550 at y 1.34 where it measures 0.687, so the greenhouse cross-section falls 24.6 percent and the car loses 234 mm across the shoulders. The beltline itself comes in from 0.94 to 0.925, and that number is not a styling choice: wheels-6\'s 185-section tire puts its static outer face at |z| 0.9025, so 0.925 is 22.5 mm of skin, liner and clearance over the widest thing under the body. The track sets the widest section of a car, not the designer, and this generation is the one that finally says so.\n\nThe integration, run the same way on both bodies so the comparison means something: take the maximum half-width over all stations at each height, integrate in y, double it, then add the lower nose band between y 0.11 and 0.28 and the two tire columns below it. body-6 returns 1.962 + 0.245 + 0.111 = 2.318 m2, which is the 2.32 the design brief measured. body-7 returns 1.822 + 0.173 + 0.104 = 2.099 m2. Cd falls from 0.130 to 0.118 on two effects the surface is entitled to claim: full front wheel fairings, worth about 9 counts, and the plan-view boat tail on the tail-cone part, worth about 3. The smaller greenhouse is deliberately not on that list, and taking it off is a correction rather than a modesty. A 24.6 percent cross-section reduction is an AREA effect, it is already inside the 1.822 above, and A is the other term in CdA, so crediting the same geometry to the coefficient as well counts it twice. That is the error an aero ledger invites, and it was in this part until an audit removed it. The brief\'s 0.105 needed the boat tail to pay about 16 counts, not 3; it pays 3 because it separates, and why it separates is on the tail-cone part. CdA goes 0.301 to 0.247, a 17.9 percent reduction against a target of 0.219, and the saving at 130 km/h is 1.53 kW, which is 11.7 Wh/km against a 90 Wh/km budget. Five generations of Cd work still moved CdA by less than this one package change did, and that lesson survives the tail missing its number. The 2.099 is 0.009 above the brief\'s 2.09, and the reason is written on the front-fairings part rather than smoothed over here: the brief sized the pods against the steering sweep at hub height, and the corner that actually touches an enclosed arch is the tire\'s upper outer one under bump. Holding the fender out to y 0.78 instead of letting it fall from y 0.58, and giving the rear haunch the same treatment, costs 0.011 m2. A body module is allowed to miss a target. It is not allowed to hit one by measuring the wrong corner.',
      why: 'Every panel on this shell is now a slice of one resampled master surface rather than an independently lofted band, and that is worth a sentence because it is the difference between a body that has shutlines and a body that describes them. Panels cut from one grid share exact vertices, so the beltline seam cannot open a hairline; a gap cut once at a fractional station is picked up by the panels on both sides of it, so the channel closes; and the surface itself did not move, because the resampling is linear and every station and profile line survives in the resolved grid. Measured, 7,299 of the grid\'s 8,742 points sit on the STATIONS surface to 5.6e-15 m and the other 1,443 are the insides of grooves. Drag is a product of two numbers and this ladder had only ever been allowed to touch one of them. A VW XL1 makes CdA 0.284 at a Cd of 0.189 because its frontal area is 1.50 m2; body-6 made 0.301 at a Cd of 0.130. A better coefficient on a worse package is a worse car, and no amount of surface refinement fixes that, because the coefficient multiplies an area you did not choose. What this skin actually demonstrates is a process lesson: the generation could not have happened without breaking an inherited import, and the inherited import was invisible precisely because it was shared. The pilot line label is on the skin process, one-shot AFP of a 5.05 m body side; the Cd 0.118 total is a corrected extrapolation and not a measurement, and what has to become true is that a moving-ground tunnel finds the separation line where the afterbody audit puts it, near x -1.95. Further aft and the tail is worth more than 3 counts and this number improves. Forward of it and 0.118 is optimistic. Either way the lever is the rear track rather than the surface, which is stated on the tail cone rather than softened here.',
      fail: [
        'Thin-ply carbon takes barely visible impact damage: hail or a parking-garage knock can delaminate plies under paint that looks perfect, so ultrasound spot checks stay on the service schedule, carried from body-6.',
        'The hood leading edge now runs at 43 degrees where body-6\'s ran at 22, because thermal-6\'s condenser inlet header tops out at y 0.770 at x 2.166 to 2.224 and the skin has to pass above it; that reshapes the pedestrian wrap-around zones and the head-impact map has to be re-run rather than carried.',
        'A 5.05 m single highlight line with only four shutlines in it is a repair problem that gets worse with length: a bonded scarf repair anywhere on the flank is judged against a reflection that runs the whole car.',
      ],
      explode: [0, 0.62, 0],
    },
    'front-fairings': {
      name: 'Front wheel fairings',
      tagline: 'The rear wheels have been enclosed since Gen 3; the fronts steer, and that is why this part costs 11 m of turning circle.',
      mass: 11,
      specs: [
        ['Counterpart', 'body-6 arch louvers on an open crescent; this closes the arch'],
        ['Max half-width', '1.008 at y 0.42; shoulder holds 0.942 to y 0.78'],
        ['Contained lock', '14.0 degrees front (open-arch equivalent: 36)'],
        ['Turning circle', '21.4 m curb to curb (suspension-4 Gen 4: 10.4 m)'],
        ['Frontal area cost', '0.049 m2, 2.3 percent of A'],
        ['Maturity', 'Pilot line: enclosed steered wheels exist, not at this track'],
      ],
      how: 'A steered wheel sweeps a rotating rectangle in plan, 0.71 m long by 0.185 wide, and the outermost corner of that rectangle sits at 0.355 sin(d) + 0.0925 cos(d) from the wheel center. At the static 0 degrees that is 92.5 mm and the tire face lands at |z| 0.9025, which is why the rear arches have been skirtable since Gen 3. At 36 degrees of lock it is 283 mm, putting the tire corner at |z| 1.094, which is 180 mm outboard of any beltline this car could carry: that is the reason no conventional front arch is ever closed, and why at full lock you can watch a normal car\'s front tire stand proud of its own bodywork. Enclosing the front wheels means choosing a fairing width and accepting whatever lock fits inside it, and fourteen degrees is what fits inside this one. The clearance audit that produces that number is worth showing, because the way it can go wrong is the way an enclosed arch invites. Sizing the pod at hub height gives a comfortable answer: the fairing is 1.0052 half-width at y 0.355, the liner face sits 7.4 mm inboard of that at 0.9978, and the 14 degree corner at 0.9856 clears by 12 mm. That measurement is at the wrong station and the wrong height. The corner that reaches 0.9856 is not above the hub, it is 322 mm ahead of it at x 1.772, where the pod has already begun to blend and the liner face is at 0.9961: 10.4 mm, not 12.2. Worse, a 185-section tire carries its full width to within 30 mm of its crown, so under 40 mm of bump the point that touches the pod is the tire\'s UPPER outer corner at y 0.66, and against a fender that fell away from y 0.58 that corner was 4.5 mm INSIDE the liner. The fix is the shoulder: the fairing now holds 0.936 to 0.942 half-width out to y 0.76 to 0.80 before it blends to the hood, which buys 9.1 mm at design height, 5.9 mm at 40 mm of bump, and 0.1 mm at 60. That last number only survives because suspension-4\'s wishbones give 1.3 degrees of negative camber per 60 mm of bump, and 1.3 degrees tucks the crown of a 0.355 m tire 8.1 mm inboard: the wishbone geometry that exists to keep the contact patch flat in roll is the same geometry that keeps the tire out of its own bodywork in full compression. The shoulder is what the 0.049 m2 of frontal area is spent on, and it is why this module lands at 2.099 rather than the brief\'s 2.09.\n\nOne small thing this part has sold and never drawn is now drawn. The roadside case on the failure list is "removing the fairing lower closeout, four fasteners and a bonded seal", and there were no fasteners. There are four per side now, on the closeout\'s LOWER face at y 0.282, because that is the face a kneeling view reaches: a head on the outboard face would sit in the 8 mm slot between the closeout and the flank and never be seen by anything.\n\nFourteen degrees is the number this part exists to state. Curb to curb, at a 2.90 m wheelbase and a 1.62 m track, 14 degrees of front lock alone gives a 25.6 m circle. suspension-4\'s rear-steer actuator claws 4.2 m of that back: 3 degrees of counter-phase rear steer shortens the virtual wheelbase to 2.40 m and the circle to 21.4 m. Against the 10.4 m that same actuator delivers on the Gen 4 car, the fairings cost 11.0 m of turning circle, and they buy roughly 9 counts of Cd for 0.049 m2 of frontal area. There is no clever geometry hiding in this trade: the fairing has to be as wide as the sweep, the sweep is set by the tire length and the lock, and the lock is set by the track. The fairing is the symptom. The track is the disease, and it is named on the tail cone as the next lever.\n\nThe pod\'s inboard wall now starts at y 0.545, and the 210 mm of it that used to hang below that is the aperture this panel has been asking for. The wall was a flat 800 by 400 mm sheet from y 0.335 to 0.735 at 14 mm off the tire\'s inner face, and everything that lives in a front corner passes through exactly that band: the brake disc tops out at y 0.5375 and the caliper at 0.5365, the front drive unit at 0.5420, and hv-4 runs its ring bus and its 48 V zonal trunk along the floor perimeter at y 0.302 to 0.433. Swept against every part of every other module on all ten presets, the sheet was fouling thirteen of them and the ring bus read 96.80 mm. Starting the wall above the moving hardware leaves three, and the deepest of those is suspension\'s front structure at 14.93 mm where the upper arm and the damper cross, which is a tower aperture this drawing still does not have. The pod\'s outer surface is untouched and the built silhouette is unchanged to the sixth decimal: the wall was never in the shadow.\n\nThe pod end closeouts lost 25 mm off their lower edge for the same reason, and it is the same 25 mm on all three bodies that carry this pod: they now start at y 0.370 rather than 0.345, which is 7.4 mm clear of the top of hv-4\'s 6 mm ring bus at y 0.3626.',
      why: 'The front wheels are the largest single drag item left on a body this clean: an open front arch spills pressurized air sideways across the flank, and the wheel face itself is a rotating bluff body in the free stream. Closing the arch is worth more than any remaining surface refinement. Whether it is worth 11 m of turning circle depends entirely on whether the track is negotiable, and on this generation it is not: gen3\'s rear annulus contract and gen4\'s hard-points table pin the wheel centers at plus or minus 0.81. Narrow the front track to 1.42 m and this same 1.008 fairing contains 34 degrees of lock and an 11.0 m circle, which is the Gen 4 car\'s maneuverability with all of this generation\'s aerodynamics. That is the honest verdict: the fairing is not the mistake, the track is, and fixing it costs a wheels, drivetrain and suspension generation rather than a body one.',
      fail: [
        'The wall is a flat sheet with a straight lower edge, and a real wheelhouse inner needs a shaped aperture for the upright and the damper rather than a horizontal cut: suspension\'s front structure still crosses it at 14.93 mm, and that is the part of this drawing the correction did not reach.',
        'Snow chains are geometrically impossible inside a closed fairing, and unlike body-6\'s crescents there is no quick-release panel that restores them; the answer is winter tires and the manual has to say so.',
        'A punctured front tire cannot be inspected without removing the fairing lower closeout, four fasteners and a bonded seal, so the roadside case is a tire-pressure sensor and a tow rather than a visual check.',
        'The fairing is designed frangible outboard of the wheel so that a curb strike tears it free instead of levering it into the tire at lock; that is the correct failure but it means a parking scuff can write off a bonded structural pod rather than scratching a fender.',
      ],
      explode: [0.35, -0.05, 0.95],
    },
    'tail-cone': {
      name: 'Boat-tail cone',
      tagline: 'Every serious aero car tapers its plan view and no EV-01 body ever had; 425 mm of it hangs behind the rear beam.',
      mass: 8,
      specs: [
        ['Counterpart', 'body-6 deck band, part of its 56 kg skin; this is new geometry'],
        ['Plan taper', 'Pinned at 0.950 to x -1.83, then 0.400 m of closure in 845 mm'],
        ['Base area', 'Geometric 0.291 m2 (body-6: 0.561); effective about 1.21'],
        ['Afterbody', 'Station half-angles 21.5, 21.8, 33.1 deg; attached limit 12 to 15'],
        ['Length bought', 'Overall 4.75 to 5.05 m, all of it aft of the rear beam'],
        ['Trunk lid', 'x -1.890 to -2.320; 355 mm of fixed deck under the spoiler mounts'],
        ['Maturity', 'Production practice: boat tails and Kamm truncation are old'],
      ],
      how: 'A Kamm truncation works because the wake behaves as if the phantom tail were present, and its cost is the base area the pressure deficit acts on. Five generations shrank that base by tilting decks and deploying flaps while the plan view stayed parallel-sided to the last millimeter, which is the wasteful way to do it: a parallel body arrives at the cut with its full width still in hand. Gen 6 tapers instead, and the honest way to describe a taper is by where it happens rather than by an average of it. Measured off the loft, the plan half-width is 0.9495 at x -1.55 and still 0.948 at x -1.83, so across the first 1.38 m behind the maximum section this body closes almost nothing: that run sits between 1 and 5 degrees. The whole 0.400 m of closure falls in the last 845 mm. Draw a chord from the maximum section to the base and it reports a 12.4 degree equivalent cone, comfortably inside the attached range, and that number is worthless, because no station on this afterbody is anywhere near 12.4 degrees. Station to station the plan half-angles are 21.5, 21.8 and 33.1 degrees; taken as equivalent cones against the ring areas they are 19.1, 23.3 and 27.5. An average that spans a 1 degree run and a 33 degree one describes neither.\n\nThe reason the first 1.38 m is flat is not styling, it is the rear track. wheels-6\'s rear tire reaches x -1.805 on a 1.62 m track, and suspension-4\'s plus or minus 3 degrees of rear steer swings the tread corner to |z| 0.9210 at hub height at the tire\'s fore and aft extremes, which land at x -1.10 and -1.80. The swept requirement is height dependent, not a single number: at the hub the corner needs 0.921, at y 0.68 the tire is short enough that it only needs 0.910, and over the tire\'s full-width band the haunch has to hold 0.948 to 0.950 half-width from the back of the rear door to past the axle to keep 8 mm of liner clearance. The haunch is pinned, so the closure is pinned behind it. A taper of this kind stays attached to roughly 12 to 15 degrees, so separation is expected near x -1.95 rather than at the truncation, and once the flow has left, the base the pressure deficit acts on is the section it left from: about 1.21 m2, not the 0.291 m2 of carbon at x -2.675. That is the whole of this module\'s Cd miss, 0.118 against a brief that asked for 0.105. What it is not is a length problem. The afterbody runs 1.49 lengths over equivalent diameter against body-6\'s 1.28, and a uniform 12 degree closure from the maximum section needs 2.073 m where 2.225 m already exists. The budget is right and the distribution is wrong: 845 mm is left to close 0.359 m of equivalent radius, and 845 mm at 12 degrees closes 0.180 m. The tail is half the length it needs at the one place it needs it. The venturi floor strakes and the diffuser flap\'s upwash hold the flow further aft than a two-dimensional estimate says they should, and the truncation sits at x -2.675 on that basis, but the remaining base drag on this car lives in that corner and this part states it rather than averaging it away.\n\nTwo things on this surface are now drawn rather than implied. The rear well opens: a 430 mm lid, starting 60 mm behind the backlight root at station 11 and stopping at x -2.320 so the last 355 mm of deck stays fixed under the spoiler mounts and the Kamm face, cut as four real 5 mm channels with the side gaps on the shoulder at ring fraction 3.7 and 10.3. And the marque sits on the Kamm face at y 0.780, extruded 4.4 mm with a beveled rim. It is the only badge on the car, because a sealed nose carrying a full-width light band has nowhere honest to put a second, and it stands 4.40 mm proud everywhere on its 90 by 38 mm footprint because that face is now flat behind its reveal rather than a shallow cone. A badge on a cone is half sunk at one corner and floating at the other.',
      why: 'This is the generation\'s second Cd item after the fairings and its one real disappointment, about 3 counts where an attached closure pays 16, and it is the part that has to name the next lever, because the lever is causal rather than optional. The afterbody cannot close faster than the rear wheels let it. Hold the rear track at 1.62 m and the haunch stays at 0.950 half-width out to x -1.83 whatever the surface does, and every closure scheme drawn on top of that pin is the same 845 mm of steep taper in different clothes. More length does not help, because the length is already there and unused. Only the track helps. Bring the rear wheel centers from plus or minus 0.81 to plus or minus 0.71 and the haunch drops to 0.850 half-width, the pin releases, and the contraction can begin at the maximum section instead of at the arch trailing edge: 2.225 m of afterbody then carries a uniform 12 degree closure with margin, which is the attached case the brief\'s Cd 0.105 assumed all along. The beltline follows the tire face down from 0.925 to 0.825 at the same time, so the whole car loses 200 mm across its widest section. Run the same integration on that and the band between y 0.28 and the beltline gives back 0.129 m2 with the greenhouse above it held unchanged, which is deliberately conservative: A lands near 1.97, and at the Cd this body actually measures that is CdA near 0.232 before any of the recovered closure is counted. The change propagates into wheels, drivetrain and suspension, which is why it is a generation and not a revision. It is also why this module cannot finish its own tail, and saying that plainly is worth more than a rounded coefficient.',
      fail: [
        'A 425 mm bonded cantilever carrying an active blade is a fatigue structure, and the load case is buffet, not steady flow: the acceptance test is a tunnel shake, not a static pull.',
        'Trunk volume is the visible bill: a tapered tail that reaches 0.550 half-width has no usable width behind the rear axle, so the load floor stops at x -2.15 and this is a two-trunk car, frunk and a shallow rear well, not a wagon.',
        'Rear three-quarter vision through a tapering backlight is worse than a parallel one at exactly the angle a lane change uses; autonomy-4\'s corner radars cover it, and the honest reading is that this tail assumes the sensor suite rather than merely benefiting from it.',
      ],
      explode: [-1.25, 0.30, 0],
    },
    canopy: {
      name: 'Glass canopy band',
      tagline: 'Six kilograms lighter because there is less of it, and the head that sits under it reclines 20 degrees further.',
      mass: 28,
      specs: [
        ['Counterpart', 'body-6 canopy, 34 kg: same stack, 24 percent less area'],
        ['Glazing', 'Chemically strengthened aluminosilicate, 1.1 + PVB + 0.7 mm'],
        ['Span', 'Cowl x 1.07 to the deck at -1.83, carried loft stations'],
        ['Roof band', 'Flat from |z| 0 to 0.55 at y 1.340 to 1.360, wrapping the rails'],
        ['Front head clearance', '1.329 m headliner inner face, 0.794 m over the H-point'],
        ['Maturity', 'Production practice; thin glass and EC film both shipped'],
      ],
      how: 'The band is cut from the same 15 loft stations as the skin and carries body-6\'s stack unchanged: a 1.1 mm ion-exchanged outer ply that resists the same stone strike as 2.1 mm of annealed soda-lime, a 0.7 mm inner, an electrochromic interlayer thermal-6 schedules between 20 and 1 percent transmittance. It also carries body-3\'s codified lesson, which is the only reason this generation works at all: the mid-canopy rings hold a near-flat roof band from the centerline out to |z| 0.55 at y 1.340 to 1.360, so the glass wraps the new cage rails instead of dipping under them. The rail top sits at y 1.324 to 1.328 at |z| 0.510 and the loft roof band at 1.336 to 1.339, eleven millimeters of clearance where Gen 5 had the same relationship 92 mm higher up.\n\nThe head clearance arithmetic is the part of this generation that has to be shown rather than asserted, and it is done against interior.js geometry, not its prose. The front cushion is a 0.13 m box centered at y 0.50, so its top face is at 0.565; under a 95th percentile male the dual-density foam takes 30 mm and the seated reference surface lands at 0.535. Over the occupant at (x -0.19, z 0.38) the skin loft is at 1.347, the glass is lofted 8 mm proud at 1.355, and 1.8 mm of glass plus 8 mm of urethane bond plus a 16 mm headliner and head-impact pad puts the inner face at 1.329. That leaves 0.794 m of sitting height where a 95th percentile male needs 0.950 erect plus 15 mm of margin. The torso therefore has to rake back to arccos(0.794 / 0.965), which is 34.6 degrees, against the 14.9 degrees interior.js actually draws (backrest rotation 0.26 rad). The rear is worse: bench cushion top 0.510, compressed 0.480, roof inner face 1.247 at x -1.20, available 0.767, required rake 37.4 degrees against the 17.2 drawn. This body does not fit the interior module it ships with, and the gap is 20 degrees of seatback at both rows.',
      why: 'A 92 mm lower roof has to be paid for by the occupant or it is not a real car, and the reclined H-point is the only currency available once the floor height is fixed by battery-6\'s pack at y 0.31. The bill is specific and it is not small: raking the front backrest from 14.9 to 34.6 degrees swings its top edge 95 mm rearward, so the rear bench has to move 95 mm aft to keep its knee room, which puts the rear head under a roof 26 mm lower again and drives the rear rake to about 40 degrees. That is a genuine four-seat package in the way a Le Mans prototype or a VW XL1 is one: everyone sits down, nobody sits up. A Gen 6 interior module owes that seat, and until it exists this body and interior.js disagree by 20 degrees at both rows, which is written here rather than hidden.',
      fail: [
        'One deep chip still condemns the band and the replacement must re-index to the loft within half a millimeter, carried from body-6 unimproved.',
        'A reclined occupant looks further up through the glass, so the solar load lands on the face rather than the crown and the electrochromic zoning map has to be redrawn; the Gen 5 zone boundaries are wrong for this seat and carrying them would be the exact drift error retro-gen4 named.',
        'Emergency egress through a 1.36 m roof with 27 mm between the rail pad and the occupant\'s head is a rescue-tool problem: the cut points move from the A-pillar to the flat roof band and the placards have to move with them.',
      ],
      explode: [0, 1.05, 0],
    },
    doors: {
      name: 'Flush doors and camera pods',
      tagline: 'Four kilograms lighter because the aperture lost 94 mm of height, which is also the ingress bill in one number.',
      mass: 34,
      count: 4,
      specs: [
        ['Counterpart', 'body-6 doors, 38 kg: same architecture, shorter skins'],
        ['Skins', 'Thin-ply CFRP cut from the master loft, flushness +-0.25 mm'],
        ['Aperture height', '844 mm at the B-pillar (body-6: 938 mm)'],
        ['Aperture diagonal', '948 mm (body-6: 997 mm)'],
        ['Handles', 'None; capacitive strip and e-latch on hv-4\'s 48 V zonal bus'],
        ['Shutlines', 'x 0.850 / 0.060 / -0.940, 5 mm wide by 4 mm deep, rocker top to seam'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The architecture is body-6\'s, kept whole: each skin is the master loft surface between two shutlines, hinges adjusted against the casting datum until a swept light line crosses all four doors without a kink, camera pods on 90 mm stalks feeding autonomy-4\'s surround model, e-latches on hv-4\'s corner zonal controllers as fused telemetered channels. The skins are now literally that surface, sliced out of one master grid between two cut lines rather than lofted 3 mm above it, so the joint is a 5 mm by 4 mm channel with two lit walls and a dark floor instead of a painted line, and the two panels either side of a cut each own their half of it. The front cut moves to x 0.850 and that is a correction rather than a change: this part published 1.06 and the built panels ran 0.860 to 0.075 and 0.045 to -0.900, so the number and the geometry had never agreed. 0.850 is the fairing blend-out station, which is where the cut belongs, because a door leading edge cannot wrap over a wheel enclosure and still swing. All three cuts land at x 0.84851, 0.05890 and -0.94110 on the built mesh, which is where body-8 puts its own three to five decimal places. Four kilograms come out for one reason only: the beltline-to-header distance shrank with the roof, so each skin lost about 100 mm of height and the frameless glass above it lost the same.\n\nThe ingress cost belongs here because the door aperture is where a passenger meets this generation\'s decision. The sill is unchanged, rocker top face at y 0.42, so the step-over height has not moved. What moved is everything above it. The header inner edge at the B-pillar was at (y 1.358, |z| 0.578) with the Gen 1 cage; the new cage puts it at (1.264, 0.484). The aperture loses 94 mm of height and its head-height inner edge moves 94 mm inboard, and the diagonal a body actually passes through falls from 997 to 948 mm. In practice you no longer step into this car, you sit onto the sill and swing your legs in, the way you enter a sports car, and a passenger who does it the other way finds the rail pad with their head. That is the ingress bill for 10 percent of frontal area, stated in millimeters rather than adjectives.\n\nThe pad is the other thing this part owes its own text. A door with no handle has one interface, and it was a 140 by 24 by 12 mm bar standing 14 mm proud of a panel held flat to a quarter of a millimeter. It sits in a 44 mm by 5 mm pocket now, cut with the same machinery as the shutlines and following ring fraction 1.843 rather than a fixed height, which is y 0.845 at the front door and 0.832 at the rear because the flank\'s shoulder falls aft across that span. The pocket is sized from the strip rather than from a round number, and that is the part worth stating, because a groove\'s width is quoted lip to lip and its run-out is a ramp INSIDE the span: a 32 mm pocket run over exactly the strip\'s own 140 mm gives a 14 mm floor under a 20 mm strip and 95 mm of full depth under a 140 mm one, which buried the strip 3.1 mm in the side walls and 5.0 mm in the door skin at each end. Built to the strip instead, the full-depth floor measures 26.2 mm across and 146 mm along, a 3 mm reveal all round, and both run-outs fall outside the part. The strip is turned onto that floor in both axes: swept against the built mesh it touches the floor at 0.00 mm with nothing entering the panel, and stands 2.03 mm proud of the door, against 2.9 mm buried and 5.0 mm proud for the same bar seated on one number.',
      why: 'Doors are where a monoform admits that people exist, and the Gen 3 settlement holds: spend the tolerance budget on flushness, let the gap be what the seals need, hold the only four joints on the body side to a quarter millimeter. What Gen 6 adds is that the aperture is now a designed constraint rather than a leftover. Once the roof is a frontal-area variable, the door opening becomes the thing that stops it going lower, and 948 mm of diagonal is roughly where a 95th percentile adult stops being able to enter without practice. The next 50 mm of roof would have to buy its way past that, and it cannot.',
      fail: [
        'E-latches keep their legally required mechanical release, exercised at every service because nobody touches it until the day it matters, carried word for word from body-6.',
        'A smaller aperture makes child-seat installation genuinely harder: the ISOFIX bars are unmoved but the arm reach over a 948 mm diagonal is worse, and that is a real family-car limitation this body does not solve.',
        'Seal compression set still returns as a whistle at exactly the speed you drive daily; EPDM chemistry has ignored four design briefs in a row.',
      ],
      explode: [0.08, 0, 0.85],
    },
    lightbands: {
      name: 'Light bands',
      tagline: 'Carried from body-6 unchanged, including the two coordinates autonomy-4 builds against.',
      mass: 4,
      count: 2,
      specs: [
        ['Front', '2 x 84-pixel matrix + autonomy-4 lidar windows at z +-0.30'],
        ['Rear', 'PMMA guide across the Kamm face, 1.00 m (body-6: 1.06 m)'],
        ['Brake rise', '< 10 ms, the Gen 1 number, still standing'],
        ['Held coordinates', 'Front band face x 2.371, y 0.615, half-width 0.43'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Carried from body-6 without a change to the optics, and one of those non-changes is a contract. autonomy-4 mounts its flash lidar pucks at (2.33, 0.615, plus or minus 0.30) and its thermal camera at (2.345, 0.53, 0), and it wrote those numbers against body-6\'s band face at x 2.371, y 0.615, half-width 0.43. Gen 6 lowers the whole nose and makes it bluffer, and it would have been very easy to drag the band down with it and silently break a partner. The nose face ring was drawn instead so that at y 0.615 it still offers a half-width of 0.481, and the band, the lidar windows and the camera aperture all land exactly where the Gen 4 module put them.\n\nThe rear band shortens from 1.06 to 1.00 m because the boat tail took the width, and that is the only change to what the optics do. What changed in the drawing is the section. Both bands used to be one 14 mm slab standing off a fascia that was itself a shallow cone, which is the shape a lamp has before anyone has designed it: no edge, no shadow, one flat highlight the length of the car. Each is now a channel. Two 10 mm lips stand on the fascia plane and the lit surface sits 6 mm behind them, so the band reads as an aperture with a dark line above and below it. The lit face lands on x 2.371, and the honest version of that sentence is that it moved there rather than stayed there. body-6 and this module\'s own previous build both drew the band as a 14 mm slab centered on 2.371, so the lit face was at 2.378 and 2.371 was the slab\'s mid-plane. The channel puts the face itself on the published number, 7 mm further back, and both partner surfaces that number exists for still sit behind it: swept on autonomy-4\'s built mesh rather than read off its prose, the lidar puck reaches x 2.3691 and the thermal camera window face x 2.3670. The lidar aperture in this band still spans x 2.363 to 2.377 at z plus or minus 0.30, so the puck looks through it as it always did. The front matrix carries 42 ribs across 856 mm, standing 3.5 mm off the lens and 2.5 mm behind the lips: 168 emitters across two banks is finer than a mesh can carry, so the ribs are drawn at the pixel-group boundaries, and what they buy is that an 860 mm lamp stops reading as one bar of light. Photometry is unaffected: the regulated angles of visibility are measured from the lit surface, and a 1.00 m guide on a 1.10 m wide Kamm face satisfies them with more margin than a 1.06 m guide on a 1.28 m face did, because the tapering quarters no longer shadow the outboard ends. The Kamm blade above still clears the regulated angles at every deployed position, certified with the blade swept, as it was on body-6.',
      why: 'A monoform still leaves nowhere else for light to live and nowhere better for a lidar: the front face is the one flat, forward, washable, heated surface on the car, sitting in the stagnation region where a window costs no drag. The reason to carry it verbatim is the reason retro-gen4 gave: a generation that changes a partner\'s mounting coordinates without telling it has just invented a drift bug, and the surest way to avoid one is to move the geometry around the interface rather than the interface around the geometry.',
      fail: [
        'One part per face, carried: a parking tap costs the whole band, and now possibly a lidar recalibration with it.',
        'Base suction still films the rear band with road dirt, and a boat tail makes it marginally worse by pulling more of the wake onto the smaller face; the wash cycle stays a safety schedule.',
        'A stone star in the shared front window sits in the lidar aperture long before it bothers the human eye; the perception stack detects the scatter signature and books the glass.',
      ],
      explode: [1.15, 0.1, 0],
    },
    'kamm-flap': {
      name: 'Deployable Kamm spoiler',
      tagline: 'Carried from body-6 unchanged in mechanism, and worth less than it was, which is the boat tail\'s compliment.',
      mass: 6,
      specs: [
        ['Counterpart', 'body-6 kamm-spoiler, 6 kg: same blade, new station'],
        ['Blade', 'Carbon, 1.12 m span, 200 mm chord, drawn deployed'],
        ['Travel', 'Flush to 78 mm proud, continuous; full-up airbrake'],
        ['Worth', '~2 counts on the geometric base, less if the tail separates (body-6: ~4)'],
        ['Actuation', 'Two 48 V spindle drives on hv-4\'s rear zonal channels'],
        ['Maturity', 'Production practice: multi-position wings have shipped for decades'],
      ],
      how: 'Mechanism, actuation, control logic and fail position are body-6\'s, carried without a change: two 48 V spindle drives on ordinary fused channels from hv-4\'s rear corner zonal controllers, continuous travel from flush to 78 mm proud, a spring return to flush because a spoiler that fails should cost counts and never control, stow below 80 km/h to restore the certified pedestrian geometry, and full-up in half a second on a hard brake-by-wire demand so the blade works as an airbrake exactly when the friction brakes want the download. The span comes in from 1.30 to 1.12 m and the station moves from x -2.13 to -2.47, both simply following the tail.\n\nOne thing that did change is where the blade actually stands. The struts and the spindle-drive pads were drawn at fixed heights, y 0.938 and 0.905, on a deck that falls away as the tail tapers: measured against the built surface the strut feet were 14.3 mm inside the deck and the pads 64.9 mm inside it, which is a spoiler mounted through its own bodywork rather than on it. Both are now placed through an inverse of the loft, seated from the lowest deck point under their own footprint so nothing floats at a corner, and the pad shows a constant 22 mm above the deck at its center line.\n\nWhat changed in what it is worth is separate, and instructive. On body-6 the blade took about 6 percent out of a 0.561 m2 base and was scored at 4 counts. Here the geometric base is 0.291 m2 because the plan view tapers, so the same 6 percent is half as much area and the blade scores about 2 counts. That is not the blade getting worse, it is the boat tail having already taken the area the blade used to work on. Two counts is the optimistic reading of what is left, and it has to be read against the tail cone\'s own finding: the score is against the geometric base, and if the flow separates near x -1.95 as the afterbody audit expects, the blade sits inside the separated region rather than at its edge and returns less than 2. The device stack and the surface are in competition for the same drag, and a generation that changes the surface should expect its devices to report different numbers. Saying so, in the direction that costs counts as readily as the one that pays them, is the difference between an honest ledger and one that double-counts.',
      why: 'A fixed truncation pays average-case drag every hour; a blade with travel buys the best case at speed, the legal case in town, and free download in the one maneuver where drag is an asset. It stays at 6 kg and 2 counts because the airbrake function alone justifies it: 78 mm of blade at 130 km/h is worth roughly 400 N of rear download during a threshold stop, which is stability the friction brakes get for nothing. Aero counts became the smaller half of this part\'s argument the moment the tail started tapering.',
      fail: [
        'Ice can lock the blade flush; the cold-start sweep detects the torque spike, leaves it stowed, and the range estimate explains the missing counts.',
        'Stuck deployed is the bad direction: an uncertified geometry below 80 km/h, so a second independent spring release drops the blade, and if both fail the car caps speed and says why.',
        'The blade now sits on a 425 mm bonded tail cone rather than a cast deck, so strut pivot wear and cone bond fatigue share one inspection rather than two.',
      ],
      explode: [-0.9, 0.55, 0],
    },
    'diffuser-flap': {
      name: 'Deployable diffuser flap',
      tagline: 'The one carried device that got better: 300 mm of extra tail is 300 mm of extra ramp.',
      mass: 5,
      specs: [
        ['Counterpart', 'body-6 diffuser-flap, 5 kg: same hinge logic, 25 percent longer'],
        ['Ramp', '0.70 m hinged at x -1.95; 13 to 17.5 degrees, drawn deployed'],
        ['Span', '1.20 m at the hinge tapering to 0.98 m at the exit'],
        ['Worth', '~6 counts with the sealed floor (body-6: ~5)'],
        ['Fail position', 'Spring to 13 degrees, the passive-safe angle'],
        ['Maturity', 'Production practice: active diffuser flaps ship in limited series'],
      ],
      how: 'The control law is body-6\'s and unchanged: pressure taps along the ramp plus suspension-4\'s ride-height signal trim the angle back the moment the expansion approaches separation, in yaw, in crosswind or over a crest, and a spring holds 13 degrees whenever power or control is in doubt, because at 13 a diffuser cannot stall, it merely earns less. Two 48 V drives on hv-4\'s rear zonal channels, ordinary fused, a few amps against that spring.\n\nWhat the longer body buys is length, and length is the only thing a diffuser genuinely wants. The hinge moves from x -1.78 to -1.95, still clear of P.driveR which ends at -1.80, and the ramp grows from 0.56 to 0.70 m. At the same 17.5 degrees that is 205 mm of rise instead of 170, and the expansion happens over more chord, which is what keeps a steep ramp attached. The span is where the boat tail sends a bill back to the floor, and it is worth stating rather than hiding. body-6 ran a rectangular 1.26 m ramp under a body still 1.36 m wide at the cut, so nothing about its span was ever in question. This tail is 1.16 m wide where the ramp leaves it and 1.10 m at the Kamm face, so a rectangular ramp of the old span hangs its corners 70 mm outside the bodywork in plan, which on a car whose headline is a tapered plan view would be a self-inflicted wound. The ramp therefore tapers with the tail, 1.20 m at the hinge to 0.98 m at the exit, and the exit area lands at roughly 0.20 m2 against body-6\'s 0.21. The extra count does not come from a bigger nozzle, because there is not one. It comes from spreading the same expansion over 25 percent more chord, which lowers the pressure gradient the flow has to climb at every angle in the control range. Both spans clear wheels-6\'s tire inner faces at 0.7175 and never approach drivetrain-6\'s in-wheel annulus at r 0.155 to 0.235, |z| 0.72 to 0.80.',
      why: 'The underbody exhaust is the last big account on the drag ledger and its optimum angle moves with speed, height and yaw, so fixing the ramp means buying the safest angle forever. Actuating it converts margin into recovery on the 90 percent of highway time when conditions are benign. Lengthening it does something the actuator cannot: it lowers the pressure gradient the flow has to climb at every angle, so the whole control range moves further from the stall line rather than just being managed better against it.',
      fail: [
        'An iced or mud-blinded pressure tap forfeits the steep regime: control falls back to 13 degrees and the range estimate quietly loses the difference.',
        'A 0.70 m ramp exiting 425 mm behind the rear beam has the worst departure angle of any generation on this ladder, 16.0 degrees measured from the rear contact patch against body-6\'s 19.0, so steep driveway lips are a scrape risk rather than a clearance.',
        'Deep snow packs the expansion and the diffuser becomes a plow; rated for the load, parked at 13 by the controller, and still beyond the drag model\'s vocabulary, carried from body-6 with the same apology.',
      ],
      explode: [-1.0, -0.4, 0],
    },
    'arch-louvers': {
      name: 'Active arch louvers',
      tagline: 'Carried mechanism, new address: they used to cover an open crescent, now they vent a closed pod.',
      mass: 3,
      count: 2,
      specs: [
        ['Counterpart', 'body-6 arch-louvers, 3 kg: identical actuator, relocated'],
        ['Blades', '4 outlet + 3 inlet per side, one 48 V rotary actuator each bank'],
        ['Duty', 'Brake-temperature model opens, cruise closes'],
        ['Flow', 'The fairing is sealed, so these are its only two apertures'],
        ['Recess', '140 mm lip to lip, 30 mm deep, one per bay in the pod flank'],
        ['Fail position', 'Spring open, venting the fairing'],
        ['Maturity', 'Pilot line at the fairing; the shutter mechanism is production'],
      ],
      how: 'The blades, the pivots, the single 48 V rotary actuator per bank, the eFuse current signature used as a position sensor, the cold-start sweep, all of it is body-6\'s hardware carried without a drawing change. What moved is what they are attached to. body-6 covered the two crescents of an open front arch that lay outside the wheel\'s swept solid and bled the trapped pressure through the blades. Gen 6 closes the arch completely, so there are no crescents and no natural venting at all: the fairing is a sealed pod around a wheel that pumps air, and these two banks are its only inlet and outlet. Three blades forward at x 1.573 to 1.697 admit, four aft at x 1.168 to 1.354 exhaust, and the pod runs at a slight depression at speed so its spill does not disturb the flank.\n\nThose two stations are 87 mm forward and 68 mm aft of where this part was first drawn, and the move is the price of giving the bank a real aperture. Until this pass there was none. The blades sat 14 mm inboard of the flank surface, which on a 50 mm slat set at 0.3 rad puts the outer face 1.8 mm BEHIND unbroken paint: swept from 168 exterior cameras, 27 of the bank\'s 216 outboard vertices reached one, and all 27 of those are the aft bank\'s leading corner piercing the skin by 2.7 mm where the flank draws in behind station 5. A sealed pod whose only two apertures are painted over is not a cooling path, it is a caption. Each bank now sits in a 140 mm by 30 mm recess cut into the master surface, centered in its own bay so the mouth is on the parallel flank behind the pod shoulder rather than on the shoulder itself, where a vent ingests instead of exhausting. Both recesses clear the stations bounding them by 43 and 70 mm, and the same two stations carry into Gen 8 unchanged.\n\nThe fail direction is the same and now matters more. Blades spring open, because a sealed pod that cannot vent traps the pumping pressure the arch used to spill, and trapped arch pressure feeds front lift on the axle that steers. On body-6 a stuck-shut bank cost counts and some brake cooling. Here it also pressurizes a closed volume around a wheel, so the blade bank is on the same cold-start self-test as every other actuated surface and a stiff bank is left open for the day. The brake-temperature model that opens them on an alpine descent is unchanged, and it earns more here: wheels-6\'s 355 mm front discs have less natural airflow inside a fairing than they had in an open arch, so the model is now the primary cooling path rather than a supplement.',
      why: 'An arch is an air pump whose duty varies a hundred to one between a summer cruise and a mountain descent, and enclosing it does not delete the pump, it just removes its accidental relief. Reusing the Gen 5 mechanism rather than inventing a fairing-specific one is the right call for a reason that has nothing to do with cost: it is a device with fleet hours on it, a known failure signature and a proven fail direction, and putting proven hardware in a new place is a much smaller risk than putting new hardware anywhere.',
      fail: [
        'Grit and ice in the pivots is the chronic case; the cold-start sweep catches a stiff bank and leaves it open, costing counts, never cooling.',
        'Sealing a pod around a wheel means water goes in and has to come out: the drain path is now a designed feature and a blocked drain turns the fairing into a bucket that carries 8 kg of water at the worst possible radius.',
        'A blade struck through the aperture is frangible by design, so it tears free rather than levering into the tire, and the current signature logs exactly when it happened.',
      ],
      explode: [0.4, -0.05, 1.3],
    },
    'venturi-floor': {
      name: 'Sealed venturi underbody',
      tagline: 'Carried from body-6, one kilogram heavier, because the diffuser hinge moved 170 mm aft.',
      mass: 8,
      specs: [
        ['Counterpart', 'body-6 venturi-floor, 7 kg: same panels, longer rear closeout'],
        ['Panels', 'Carbon closeouts, lip to pack and pack to the new hinge at -1.95'],
        ['Tunnels', 'Twin, strake-divided, exhausting through the diffuser flap'],
        ['Ground gap', '110 mm at the lip; suspension-4 holds it +-3 mm at speed'],
        ['Splitter', '1.02 m wide (body-6: 1.32 m), following the narrower nose'],
        ['Maturity', 'Production practice: sealed floors universal, tunnels in series'],
      ],
      how: 'Carried whole from body-6: a carbon lip at a 110 mm gap, a valance behind it so the splitter bolts to something rather than floating, a front closeout bridging to battery-6\'s pack leading edge, the pack underside running to x -1.30 in the envelope battery-3 established, a rear closeout bridging to the diffuser hinge, and strakes dividing the rear run into twin tunnels so a yawed crosswind stalls one side while the other keeps pulling. suspension-4\'s air springs hold the speed-scheduled ride height to a few millimeters and cross-check its height sensors against the flap\'s pressure taps, which is the closed loop this floor always needed and only got in Gen 5.\n\nTwo things in this part are now geometry rather than description. The valance carries a real intake aperture, 772 mm wide and 160 mm up its own slope, with a throat behind it running back to a mouth 6.0 mm ahead of thermal-6\'s core face; intake-gates has the arithmetic. And the splitter shows its fixings. A carbon lip working at a 110 mm ground gap is a strike item and this part sells shear-away fasteners that cost a bracket rather than a nose, so four heads sit on the plate\'s top face at x 2.170. That face is at y 0.136, not the 0.128 mid-plane: lib.plate lays its slab between y + t/2 and y + 3t/2, and a first pass on the sister body put every head inside the laminate by taking the mid-plane instead.\n\nTwo numbers change. The rear closeout grows from 0.45 to 0.62 m because the diffuser hinge moved from x -1.78 to -1.95, which is the extra kilogram. The splitter narrows from 1.32 to 1.02 m because the nose narrowed with the rest of the body, and that is worth stating as an area item rather than a styling one: the lower nose band between y 0.11 and 0.28 is a real part of the frontal-area integration, 0.173 m2 here against body-6\'s 0.245, so 0.072 m2 of the generation\'s 0.219 m2 of frontal-area saving is bought by this part rather than by the roof. A splitter is not usually thought of as a frontal-area component. On a car whose body starts at y 0.28, it is 8 percent of the shadow.',
      why: 'The underbody is the largest surface on the car and the only one battery-6 already paid to flatten, so sealing it and shaping it into tunnels remains the highest-value aero purchase at this Cd. Carrying it verbatim is the correct move for a form generation: the floor was already at its packaging limit and none of Gen 6\'s changes are underneath. The narrower splitter is not a refinement of it, it is the floor obeying the same rule as everything else on this body, which is that the plan view is now a variable.',
      fail: [
        'Curbs and ramps still rake the lip first; the shear-away fasteners cost a bracket, carried through four generations because parking lots have not changed.',
        'A narrower splitter feeds a narrower stagnation region into the tunnels, so the front tunnel inlets are more sensitive to yaw than body-6\'s were and the crosswind case is the one the tunnel program should re-run first.',
        'Deep snow packs the tunnels and the floor becomes a plow; structurally rated, aerodynamically dead, still beyond the range model\'s vocabulary.',
      ],
      explode: [0, -0.55, 0],
    },
    'intake-gates': {
      name: 'Intake gates',
      tagline: 'Carried from body-6 unchanged, and pointed at a header this body finally clears.',
      mass: 3,
      specs: [
        ['Counterpart', 'body-6 intake-gates, 3 kg: identical bank, unchanged'],
        ['Bank', '4 slats, one 48 V actuator on hv-4\'s front zonal channels'],
        ['Feeds', 'thermal-6\'s stack in the untouched front zone x 2.08 to 2.26'],
        ['Cd swing', '~0.008 open to shut; shut > 90 percent of driving time'],
        ['Fail position', 'Spring open: cooling beats drag, the Gen 2 law'],
        ['Maturity', 'Production practice since the 2010s'],
      ],
      how: 'Carried without a change: a four-slat bank below the nose face metering the only air admitted through the body, ducted to thermal-6\'s radiator stack in the front zone this ladder has never moved. The thermal controller owns the position request, the aero controller is granted closure only when every thermal margin is green, and the spring fails the bank open because a stuck-shut gate on a mountain climb cooks hardware while a stuck-open one costs a count. The word ducted is new and it is a correction: this part has claimed to meter the only air admitted through the body since it was written, and the valance behind it was a continuous panel. The bank metered a wall. There is now a real hole in the valance, 772 mm wide and 160 mm up the panel\'s own slope, every edge of it inside the slat bank so the gates still cover it from straight ahead, and a throat carried back to a mouth at x 2.2634. That mouth lands 6.0 mm ahead of thermal-6\'s radiator core face and 54 mm ahead of thermal-7\'s coil, which matters because both presets run this body and thermal-6 sits 48 mm further forward: the duct has to end on a heat exchanger in each of them rather than on daylight, and rastered at 41 by 61 rays through the bank window it does, with 0.00 percent of rays passing clean through the car in either case. The sizing case is still stationary: battery-6\'s fast charge rejects its peak through that stack with no ram air and the fans pulling, so the driving requirement is trivial and the nose spends more than 90 percent of road time aerodynamically solid.\n\nThe partner reconciliation this generation owes is above the gates rather than in them, and it is a finding rather than a fix. thermal-6 puts its condenser inlet header at x 2.166 to 2.224, y 0.744 to 0.770, |z| up to 0.40. body-6\'s hood skin passes through y 0.699 at that station, so the header stands 71 mm proud of the Gen 5 body: a real interference that no reviewer caught because both modules checked the P.thermalFront zone box, which allows y to 0.78, rather than each other\'s surfaces. body-7\'s nose was drawn against the header instead of against the zone, and it clears by 43 mm at the tightest station. The price is a hood leading edge at 43 degrees where body-6 ran 22, which is on the skin part\'s failure list as a pedestrian-zone item. The integrator should decide whether body-6 gets the same treatment or a note.',
      why: 'A fixed intake is sized for the worst hour and paid for every other hour, and the worst hour moved off the road when charging power passed driving power. Metering the opening per minute is what keeps the sealed-nose fiction honest. Carrying the part verbatim into a generation that redrew everything around it is deliberate: the gates were correct, and the useful work here was checking that the surface above them still contains the hardware they feed, which is exactly the check that had been skipped for five generations.',
      fail: [
        'Road grit and ice jam slat pivots; the cold-start sweep reports a stiff bank before the highway or the charger does.',
        'Stuck shut is the dangerous direction: thermal-6 sheds load, tapers power, and the car explains why.',
        'The slats live in the stone-strike zone; glass-filled polymer takes the gravel, and a cracked slat costs a cartridge swap, not a nose.',
      ],
      explode: [1.3, -0.08, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   15 loft stations, x +2.375 to -2.675 (5.05 m), 7 half-profile pairs plus a
   crown per ring, so 15 points per ring. Band slicing follows body-6:
   flank = indices 0..3 and 11..14, upper band = indices 3..11.

   Governing numbers, all checked against the partners' build geometry:
   - Frontal area, integrated the same way as body-6: silhouette 1.822 above
     y 0.28, lower nose band 0.173, tire columns 0.104, A 2.099 m2. At the
     audited Cd 0.118 that is CdA 0.247 against body-6's 2.318 / 0.130 /
     0.301. The brief's 0.105 was rejected; see AFTERBODY below.
   - AFTERBODY, the module's known shortfall. The plan half-width is 0.9495
     at x -1.55 and still 0.948 at -1.83, pinned there by the 1.62 m rear
     track and suspension-4's +-3 degree rear steer, so all 0.400 m of
     closure happens in the last 845 mm at plan half-angles of 21.5, 21.8
     and 33.1 degrees (19.1, 23.3 and 27.5 as equivalent cones). Attached
     flow holds to about 12 to 15, so separation is expected near x -1.95
     and the effective base is about 1.21 m2 rather than the geometric
     0.291. Length is not the shortfall: 1.49 length over equivalent
     diameter against body-6's 1.28, and a uniform 12 degree closure needs
     2.073 m where 2.225 m exists. Do NOT requote the 12.4 degree chord
     from the maximum section to the base: it averages a 1 to 5 degree run
     into a 33 degree one and describes neither.
   - Roof crown 1.360 at x -0.45; roof band flat from |z| 0 to 0.55 at
     y 1.340 to 1.360 so the glass wraps the new cage rails. Rail top 1.324
     at x 0.30 under a skin at 1.3358, and 1.328 at x -0.48 under 1.3394:
     11.8 and 11.4 mm. This is the body-3 lesson applied to the new rail line.
   - Beltline half-width 0.925: wheels-6 static tire face 0.9025 plus skin,
     liner and clearance.
   - ARCH CLEARANCE is audited against the swept SOLID of the tire, not
     against a single corner value, because a 185-section tire is full width
     to within 30 mm of its crown and the binding contact is the upper outer
     corner under bump, not the hub-height corner in plan. Liner face is the
     loft minus 1.4 mm of skin and 6 mm of liner. Front pods at 14.0 degrees
     of lock: 9.1 mm at design height, 5.9 mm at 40 mm of bump, 0.1 mm at
     60 mm before suspension-4's -1.3 deg per 60 mm of camber gain tucks the
     crown 8.1 mm inboard. Rear haunches against +-3 degrees of rear steer:
     8.1 / 5.4 / 2.5 mm on the same three cases. Both need a shoulder held
     out to y 0.76 to 0.80. Adding those two shoulders to the first-pass
     loft cost 0.011 m2 and is the whole of the 0.009 m2 miss against the
     brief's 2.09 target.
   - Nose drawn over thermal-6's condenser inlet header (y 0.770 at
     x 2.166..2.224, |z| 0.40): 43.4 mm clear at the tightest station.
   - autonomy-4 interface held exactly: front band face x 2.371, y 0.615,
     half-width 0.43 inside a nose ring offering 0.4813 there; lidar windows
     at z +-0.30.
   - Rockers unmoved at outer face |z| 0.915; the minimum skin cover over the
     full 2.02 m extrusion is 6.0 mm, at x 0.30.
   - The diffuser ramp tapers in plan with the tail, 1.20 m span at the hinge
     to 0.98 m at the exit, so no part of it hangs outside the boat tail.
   - Carried condition, present since body.js: the bumper beam's outboard
     corner at (2.27, 0.50, +-0.65) stands outside the nose loft, and its
     x 2.21..2.27 span overlaps thermal-6's condenser core by 7.5 mm. Both
     are body.js coordinates this module was told to keep. This line used
     to say 15 mm; swept against halfWidth() the pre-pass corner is 14.8 mm
     outside and the built one is 5.1, and that is a side effect rather
     than a repair. The beam is the same box at the same coordinates and
     the 8 mm chamfer took the corner that was outside, which is the only
     part of it that ever was. Face centers do not move under a chamfer, so
     the x 2.21 to 2.27 span and the overlap with the condenser core are
     both unchanged.

   ── The crispness pass, and what it was and was not allowed to touch ──

   THE STATIONS TABLE DID NOT MOVE. Not one coordinate. Every number above
   is still true of the built mesh and the station integral is bit-identical
   at 1.8220775507935185 m2. What changed is that the shell is now ONE
   resampled master grid instead of nine independent lofts, that the panel
   joints are real recessed channels instead of implied ones, and that the
   hardware which was drawn inside the bodywork is now outside it.

   THE BUILT FRONTAL UNION MOVED +6.24 cm2, 0.034 percent, and the sign is
   worth reading rather than excusing. Broken out scanline by scanline it is
   +8.81 from sealing the nose face and -2.57 from chamfered hardware and
   the louver recess. The nose gain is not surface growth: at y 0.42 to 0.45
   the old car had two 15 mm slots between the front casting's center box
   and its side spars that no bodywork covered, so a frontal ray went
   straight through and the union counted the hole as empty. A sealed nose
   fills it. Nothing on the lofted surface moved: 7,299 of the master grid's
   8,742 points sit on the linear STATIONS surface to 5.6e-15 m, and every
   one of the other 1,443 is inside a groove.

   This body is body-8's direct parent and body-8 carries stations 0 to 8
   verbatim, so the treatment is deliberately the same treatment: the same
   subdivision, the same three door cuts at x 0.850 / 0.060 / -0.940, the
   same 5 mm by 4 mm gap section, the same declared-line crease with a 20
   degree threshold, the same two louver pockets in the same two bays. Step
   Gen 7 to Gen 8 in the viewer and the doors do not move.

   INTERPOLATION IS LINEAR and that is not a default, it is the whole reason
   the clearances above survive. lib.loft's Catmull-Rom mode is envelope
   clamped and the envelope really is held, but frontal area is the widest
   point at each HEIGHT rather than the widest point on the body, so a
   surface that moves between profile points moves the integral without
   touching any extreme: measured on body-8's shell, clamped Catmull-Rom
   costs 0.6 percent of A and unclamped 2.8. Worse for this module, the
   surface between stations shifts by up to 29 mm smoothed, and every
   clearance in the list above is quoted to the millimeter off the built
   surface. Linear keeps the aerodynamic surface bit for bit and buys only
   resolution, which is the part a groove needs.

   THE CREASE IS DECLARED, NOT DISCOVERED. Under linear interpolation every
   span between stations is exactly flat, so ALL of this body's curvature
   sits on its station lines and a global angle test cannot tell a designed
   crease from a coarse sample. Hardening station 3 at x 1.820, which turns
   52.8 degrees, would put a knife edge on the widest approach to the front
   pod: the one surface a drag claim cannot afford to trip. So the lines
   that are ALLOWED to break are named in HARDR and HARDC, each with its
   extent in the other axis, and a 20 degree threshold then decides where
   along a named line the feature actually is. No station line is named. */

function ring(x, half, crownY) {
  const pts = [];
  for (let i = 0; i < half.length; i++) pts.push([x, half[i][0], -half[i][1]]);
  pts.push([x, crownY, 0]);
  for (let i = half.length - 1; i >= 0; i--) pts.push([x, half[i][0], half[i][1]]);
  return pts;
}

/* [x, [[y, half-width] x7], crownY] */
const STATIONS = [
  /* 0  nose face */
  [2.375, [[0.42, 0.440], [0.48, 0.500], [0.55, 0.520], [0.61, 0.490], [0.65, 0.420], [0.680, 0.300], [0.695, 0.150]], 0.705],
  /* 1  over thermal-6's stack front edge */
  [2.220, [[0.32, 0.620], [0.44, 0.685], [0.58, 0.712], [0.70, 0.672], [0.79, 0.545], [0.825, 0.360], [0.840, 0.170]], 0.850],
  /* 2  hood, frunk zone */
  [2.030, [[0.28, 0.710], [0.44, 0.778], [0.60, 0.800], [0.75, 0.752], [0.85, 0.628], [0.892, 0.400], [0.908, 0.185]], 0.920],
  /* 3  front fairing, forward sweep peak (x 1.45 + 0.367). The shoulder point
        holds 0.936 to y 0.76 because the swept tire's UPPER outer corner, not
        its hub-height corner, is what sizes an enclosed arch. */
  [1.820, [[0.28, 1.000], [0.42, 1.006], [0.58, 0.992], [0.76, 0.936], [0.88, 0.722], [0.930, 0.440], [0.948, 0.200]], 0.960],
  /* 4  front axle, fairing maximum */
  [1.450, [[0.28, 1.002], [0.42, 1.008], [0.58, 0.995], [0.78, 0.942], [0.90, 0.748], [0.965, 0.460], [0.988, 0.210]], 1.005],
  /* 5  fairing trailing sweep peak and cowl  (COWL) */
  [1.070, [[0.28, 1.000], [0.42, 1.006], [0.58, 0.992], [0.80, 0.936], [0.93, 0.778], [1.015, 0.500], [1.045, 0.230]], 1.070],
  /* 6  fairing blend-out: the flank is back on the 0.925 beltline 220 mm
        behind the pod, so the bulge is a fender and not a swollen door */
  [0.850, [[0.28, 0.924], [0.55, 0.922], [0.82, 0.893], [0.95, 0.836], [1.06, 0.700], [1.150, 0.480], [1.164, 0.250]], 1.172],
  /* 7  windshield header station */
  [0.300, [[0.28, 0.922], [0.55, 0.920], [0.90, 0.868], [1.02, 0.772], [1.12, 0.628], [1.334, 0.542], [1.346, 0.325]], 1.354],
  /* 8  maximum section, roof crown */
  [-0.450, [[0.28, 0.925], [0.55, 0.925], [0.90, 0.872], [1.02, 0.780], [1.12, 0.640], [1.340, 0.550], [1.352, 0.330]], 1.360],
  /* 9  rear haunch begins, forward rear-steer sweep peak */
  [-1.100, [[0.28, 0.936], [0.52, 0.948], [0.88, 0.892], [1.00, 0.782], [1.10, 0.626], [1.280, 0.530], [1.298, 0.315]], 1.310],
  /* 10 rear axle. Haunch shoulder held to y 0.76 for the same reason as the
        fairing: the tire is full section width to within 30 mm of its crown. */
  [-1.450, [[0.28, 0.938], [0.52, 0.950], [0.76, 0.930], [0.92, 0.800], [1.06, 0.610], [1.190, 0.450], [1.215, 0.250]], 1.230],
  /* 11 arch trailing edge, aft sweep peak  (DECK) */
  [-1.830, [[0.30, 0.936], [0.52, 0.948], [0.74, 0.905], [0.90, 0.775], [1.03, 0.585], [1.130, 0.410], [1.155, 0.215]], 1.170],
  /* 12 boat tail */
  [-2.150, [[0.38, 0.800], [0.55, 0.822], [0.72, 0.786], [0.86, 0.686], [0.96, 0.536], [1.035, 0.360], [1.055, 0.180]], 1.070],
  /* 13 boat tail */
  [-2.430, [[0.48, 0.688], [0.60, 0.710], [0.72, 0.684], [0.82, 0.600], [0.89, 0.470], [0.940, 0.310], [0.955, 0.150]], 0.965],
  /* 14 Kamm face, base area 0.291 m2 */
  [-2.675, [[0.54, 0.485], [0.61, 0.542], [0.68, 0.550], [0.75, 0.505], [0.79, 0.430], [0.822, 0.290], [0.838, 0.140]], 0.850],
];

const RINGS = STATIONS.map(([x, half, crownY]) => ring(x, half, crownY));

/* Half-width of the loft at an arbitrary (x, y): linear between the two
   bracketing stations, linear between profile points inside each. Doors,
   louvers, handles and camera pods are placed through this rather than by
   eye, so a panel on a doubly curved flank is flush by construction instead
   of by luck. That is the body-4 floating-splitter lesson generalized: if a
   part is meant to lie on the surface, derive it from the surface. */
function halfWidth(x, y) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  /* interpolate the section point by point, exactly as lib.loft does, then
     read the width at y inside it. Blending widths at a fixed y instead
     collapses to zero wherever the forward station's crown is lower than y,
     which is precisely where an A-pillar lives. */
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

/* y at a fractional half-profile index, so a feature line can follow the
   body's own character line instead of a remembered height. The capacitive
   pad recesses are placed through this: index 1.843 is y 0.845 at the
   windshield header and 0.832 at the rear door, because the flank's own
   shoulder falls aft and a strip that ignores it stops looking drawn. */
function ringY(x, kk) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  const yk = (k) => (1 - t) * A[1][k][0] + t * B[1][k][0];
  const last = A[1].length - 1;
  const k0 = Math.min(last, Math.floor(kk)), f = kk - k0;
  return k0 >= last ? yk(last) : yk(k0) * (1 - f) + yk(k0 + 1) * f;
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
   is hz wide. The spoiler struts and their mount pads are placed through
   this, because a tapering deck is exactly where a part placed at a
   remembered height ends up buried. Measured before this pass, the mount
   pads at (x -2.360, y 0.905) sat 64.9 mm inside a deck at y 0.9699
   where they stand, and the struts 14.3 mm inside theirs. */
function surfaceY(x, hz) {
  let lo = bottomY(x), hi = 1.45;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    if (halfWidth(x, mid) > hz) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/* ── The end caps ────────────────────────────────────────────────────────
   A flat fascia panel set behind a turned reveal, built from the ring's own
   outline so it fills its aperture exactly. dx is how far behind the
   outline the face sits, negative at the nose and positive at the tail
   because both push INTO the car.

   Two things here are fixes and both were carried since body.js.

   THE LOOP HAS TO CLOSE. A ring is an OPEN polyline from the flank's bottom
   edge on one side, over the crown, to the bottom edge on the other.
   Fanning it to a shrunken copy without joining the last point back to the
   first leaves the sector across the bottom unfilled, and on this body that
   sector is 880 by 135 mm at the nose and 970 by 147 mm at the tail. Swept
   with 91 by 91 axial rays, 21.3 percent of the nose aperture was the front
   megacasting, the crash rails and the underbody valance seen straight
   through the bodywork, and 22.0 percent of the Kamm aperture was the rear
   megacasting. Both read 0.0 percent now. A sealed nose has to be sealed.

   AND THE MIDDLE HAS TO CLOSE TOO. The old cap was a two-ring loft to a
   copy shrunk to 5 percent, which leaves the 5 percent ring itself
   unfilled: a 52 by 14 mm hole dead center in the nose whose top edge is at
   y 0.5696, 23 mm below the light band and therefore in plain view, and a
   55 by 16 mm one in the Kamm face. The face is a single fan to a real
   center vertex instead, so there is nothing left to fill.

   The reveal is the reason this is not just a fix. The old cap was a
   12 mm cone, which shades as a soft dome and gives a softbox nothing to
   catch. This turns the same 12 mm in one step at 1.5 percent of the local
   radius, which stands the wall at 56 to 58 degrees at the widest point and
   80 at the crown, and leaves the face itself dead flat: a fascia sitting
   in an aperture with one hard line all the way round it. The face being
   exactly planar is also what lets a badge and a lamp be placed on it by
   one number instead of by a surface solve. */
function endCap(ringPts, dx, mat) {
  const ys = ringPts.map((p) => p[1]);
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const n = ringPts.length;
  const S = 0.985;
  const fx = ringPts[0][0] + dx;
  const pos = [], uv = [], idx = [];
  let zmax = 1e-6, ymax = 1e-6;
  for (const [, y, z] of ringPts) {
    zmax = Math.max(zmax, Math.abs(z));
    ymax = Math.max(ymax, Math.abs(y - cy));
  }
  const put = (x, y, z) => {
    pos.push(x, y, z);
    uv.push(0.5 + z / (2 * zmax), 0.5 + (y - cy) / (2 * ymax));
  };
  for (const [x, y, z] of ringPts) put(x, y, z);
  for (const [, y, z] of ringPts) put(fx, cy + (y - cy) * S, z * S);
  put(fx, cy, 0);
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    idx.push(i, n + i, j, j, n + i, n + j);   /* the reveal wall */
    idx.push(n + i, 2 * n, n + j);            /* the flat face  */
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return lib.mesh(geo, mat);
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
const DECK = 11;     /* ring index where the glass ends and the tail cone begins */
const LAST = STATIONS.length - 1;
const FAIR0 = 2;     /* the fairing flank starts here and ends at the front cut */

const glassBand = RINGS.slice(COWL, DECK + 1).map((r) =>
  r.slice(3, 12).map((p) => [p[0], p[1] + 0.008, p[2] * 1.012])
);

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
   The valance is unmoved: three sections at (2.240, 0.128, hz 0.510),
   (2.325, 0.280, 0.502) and (2.373, 0.420, 0.446), written as its two
   interpolants rather than as a table because the panel and the hole cut
   in it have to be the same surface to the last decimal.

   THE HOLE. intake-gates says it meters "the only air admitted through the
   body" and argues at length about the size of that opening. There was no
   opening. The valance was a continuous panel and the slat bank stood
   14 mm proud of it, so the bank metered a wall.

   Every edge of the hole sits inside the slat bank, which spans y 0.191 to
   0.383 and |z| 0.400 as built, so the gates still cover it from straight
   ahead and what shows is the throat behind the slats. The rim returns all
   the way to a mouth at x 2.2634, which is 6.0 mm ahead of thermal-6's
   radiator core face at 2.2574 and 54 mm ahead of thermal-7's coil at
   2.2090, so the duct ends on a heat exchanger in BOTH presets that run
   this body rather than on daylight. The floor rises to y 0.258 on the way
   because that is where thermal-6's core starts, and a duct whose exit sits
   below its heat exchanger is just a longer hole. */
const vx = (y) => (y < 0.280 ? 2.240 + (y - 0.128) / 0.152 * 0.085
                             : 2.325 + (y - 0.280) / 0.140 * 0.048);
const vhz = (y) => (y < 0.280 ? 0.510 + (y - 0.128) / 0.152 * -0.008
                              : 0.502 + (y - 0.280) / 0.140 * -0.056);
const RAKE = Math.atan2(0.133, 0.292);        /* valance lean, 24.5 degrees */
const AP = { y0: 0.214, y1: 0.360, z: 0.386 };
const MOUTH = { x: 2.2634, y0: 0.258 };

/* ── Where this body opens ─────────────────────────────────────────────
   Three door cuts at x 0.850, 0.060 and -0.940, which are body-8's built
   pair plus the fairing blend-out station itself. The published front
   shutline on this module was 1.06 and no built panel was ever there: the
   skins ran x 0.860 to 0.075 and 0.045 to -0.900, so the number in the
   part text was 200 mm ahead of the geometry. 0.850 is the correct one and
   it is structural rather than cosmetic, because the enclosed front pod
   owns the flank ahead of it and a door leading edge cannot wrap over a
   wheel enclosure and still swing. Stations 6 to 9 are identical on this
   body and body-8, so all three cuts land at the same x on both and
   stepping Gen 7 to Gen 8 does not move a door.

   BOTH ENDS OF EVERY SPAN ARE PANEL EDGES. The cut runs from the rocker
   top at ring fraction 0.5185 up to the beltline seam at ring 3, because
   the sill is structure you sit on rather than door skin, and because the
   band above ring 3 is glass from the cowl to the backlight so there is no
   painted panel up there for a run-out to fade into. A span that ends past
   a panel edge leaves the channel at full depth on the panel's last row. */
const SHUT = [rowOf(0.850), rowOf(0.060), rowOf(-0.940)];
const SILL = 0.5185;
const SEAM = 3;
const DOORL = [SILL, SEAM], DOORR = [14 - SEAM, 14 - SILL];

/* Hood, x 2.220 to 1.130: forward of the cowl at station 5 where the
   glass root starts, aft of the nose fascia band that carries the light
   bar and the intake gates, and covering P.frunk with margin.

   Trunk lid, x -1.890 to -2.320. This body keeps its backlight, so the
   painted deck does not begin until the glass root at station 11, and the
   lid starts 60 mm behind it. The rear edge leaves 355 mm of fixed deck
   under the spoiler mounts at x -2.360 and -2.450 and the Kamm face, which
   is what the part text means by a shallow rear well: the lid is 430 mm of
   deck and the load floor under it stops at x -2.15.

   Side gaps sit at ring fraction 3.7 and 10.3, on the shoulder, clear of
   the beltline seam. All gaps are 5 mm wide and 4 mm deep. */
const HOOD = [rowOf(2.220), rowOf(1.130)];
const LID = [rowOf(-1.890), rowOf(-2.320)];
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
   THE DEFECT, and it is this body's own. arch-louvers sets its blades at
   halfWidth - 0.014, and a 50 x 100 x 10 mm slat turned 0.3 rad about Y has
   a rotated half-depth of 12.2 mm, so the outer face landed at
   halfWidth - 0.0018: 1.8 mm behind an unbroken painted flank. The bank
   was 216 triangles rendering as almost nothing: swept from 168 exterior
   cameras, 27 of its 216 outboard vertices reached one, and those 27 are
   the aft bank's leading corner PIERCING the paint by 2.7 mm where the flank
   draws in behind station 5. So the bank was either invisible or a defect,
   the raycast picked the pod skin first so the panel could not be opened by
   clicking it, and the part text meanwhile describes the two banks as "its
   only inlet and outlet" on a sealed pod. A duct behind a solid panel is a
   decal with a triangle budget. Swept again after the recess, 1,964 of
   1,964 outboard vertices reach a camera.

   THE FIX is the recess the bank always implied: two pockets 30 mm deep
   and 140 mm lip to lip on the flank at y 0.500, cut with the same groove
   machinery as the shutlines so they belong to the master grid and cannot
   open a seam against it.

   EACH BANK IS CENTERED IN ITS BAY, which moves the aft bank 68 mm forward
   and the forward bank 87 mm aft of where this module drew them, onto
   body-8's stations. The forward one has to move: station 3 is the pod's
   leading shoulder, where the flow is accelerating hardest around the
   widest approach on the car, and a vent mouth cut into a shoulder ingests
   instead of exhausting. Both recesses now clear the stations bounding
   them by 43 and 70 mm, and the blade stations match body-8's exactly. */
const LOUV = { width: 0.140, depth: 0.030, wall: 0.017 };
const LOUVSPAN = [[rowOf(1.4074), rowOf(1.1146)], [rowOf(1.7504), rowOf(1.5196)]];
const LOUVRUN = 0.037;
for (const c of [1.5, 12.5]) {
  for (const s of LOUVSPAN) GROOVES.push({ col: c, ...LOUV, span: s, runout: LOUVRUN });
}

/* ── The capacitive pad recesses ────────────────────────────────────────
   The doors carry no handles, so the pad is the whole interface, and it
   was a 140 x 24 x 12 mm bar sitting 14 mm proud of a panel this module
   calls flush to a quarter of a millimeter. Recessing it is a correction
   rather than an addition: a 5 mm pocket 44 mm wide, and the strip in it
   stands 2 mm proud instead of 14.

   THE POCKET IS SIZED FROM THE STRIP, IN BOTH AXES, and a first pass sized
   it from neither. A groove's stated width is lip to lip and its run-out is
   a ramp INSIDE the span, so a 32 mm pocket run over exactly the strip's own
   140 mm leaves a 14 mm floor under a 20 mm strip and 95 mm of full depth
   under a 140 mm one. Measured on the built mesh that put the strip 3.1 mm
   into the two side walls and 5.04 mm through the door skin at its ends,
   which is the same class of error as a box seated on a floor's mid-station:
   the arithmetic was done against the number the groove is called by rather
   than against the surface it actually cuts. So the width is the strip plus
   a 3 mm reveal plus two walls, and the span is the strip plus the same
   reveal plus a run-out at each end, which puts both ramps outside the part.

   The pocket follows ring fraction 1.843 rather than a fixed height,
   which is y 0.845 at the front door and 0.832 at the rear, because the
   flank's own shoulder falls aft over that span and a strip held at one
   height crosses it. */
const PADL = 0.140, PADH = 0.020, PADT = 0.007;   /* the strip itself */
const PADREV = 0.003;                             /* floor visible all round */
const PADWALL = 0.009;                            /* side wall, 29 degrees at 5 mm */
const PADEND = PADWALL;                           /* end ramp, outside the strip */
const PAD = { width: PADH + 2 * PADREV + 2 * PADWALL, depth: 0.005, wall: PADWALL };
const PADX = [0.160, -0.840];
const PADCOL = 1.843;
for (const c of [PADCOL, 14 - PADCOL]) {
  for (const x of PADX) {
    /* both pads sit inside one station interval, so rowOf is linear across
       the span and the run-out converts to row units by simple proportion */
    const e = PADL / 2 + PADREV + PADEND;
    const a = rowOf(x + e), b = rowOf(x - e);
    GROOVES.push({ col: c, ...PAD, span: [a, b], runout: ((b - a) * PADEND) / (2 * e) });
  }
}

/* |z| of a pocket floor, for the hardware that has to sit on it. A groove
   sinks its depth along the surface NORMAL, and this flank leans in both
   axes, so the floor is NOT `depth` inboard in z and it is not a plane of
   constant |z| either. Derived from halfWidth like every other placement in
   this module, so it moves with the surface instead of with a remembered
   number. */
function flankN(x, y) {
  const e = 0.004;
  const fy = (halfWidth(x, y + e) - halfWidth(x, y - e)) / (2 * e);
  const fx = (halfWidth(x + e, y) - halfWidth(x - e, y)) / (2 * e);
  const N = Math.sqrt(1 + fx * fx + fy * fy);
  return [-fx / N, -fy / N, 1 / N];
}
function floorZ(x, y, depth) {
  return halfWidth(x, y) - depth * flankN(x, y)[2];
}

/* Seat a slab of thickness t on a pocket floor cut `depth` into the flank:
   the position of its center and the two rotations that lay it flat. The
   flank leans in both axes at once, so a slab placed on one number and
   turned on none is off by the product of both slopes across its own
   footprint. */
function seatOnFlank(x, y, depth, t) {
  const [nx, ny, nz] = flankN(x, y);
  const ry = Math.asin(nx);
  const rx = Math.asin(-ny / Math.cos(ry));
  const h = depth - t / 2;
  return { p: [x - h * nx, y - h * ny, halfWidth(x, y) - h * nz], rx, ry };
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
   it neither opens nor moves. */
const DOORBAND = [CI(11), CI(14 - SILL)];
const SILLR = [CI(14 - SILL), CI(14)], SILLL = [CI(0), CI(SILL)];
/* each shutline pushed a left and a right groove; both resolve to the same
   split row, which is the far floor edge of the channel */
const CUT = SHUT.map((r) =>
  SHELL.grooves.find((g) => g.axis === 'row' && Math.abs(g.at - r) < 1e-9).split);

/* ── The two lid rectangles, read off the grid rather than re-derived ────
   The hood and the trunk lid have had a 5 by 4 mm channel round all four of
   their sides since this body was drawn; what they did not have was a panel
   inside the channel. Cutting one out is a RE-SLICE: the same loftMesh over
   the same master grid, split at the four indices the grooves already
   resolved to, so the closed car is identical to the vertex.

   A column split is looked up by the SPAN it was cut over and never by a
   shared constant, and that is not fastidiousness. The two side gaps at ring
   fraction 3.7 and 10.3 are pushed TWICE, once over the hood's rows and once
   over the lid's, and measured they resolve to DIFFERENT indices, 33 and 60
   for the hood against 34 and 61 for the lid, because common.js probes the
   meters-per-index scale over each groove's own run and the deck is a
   different width in the two places. Share one constant and the lid slices a
   grid line off its own channel and opens a hairline down the deck. */
const rowCut = (u) =>
  SHELL.grooves.find((g) => g.axis === 'row' && Math.abs(g.at - u) < 1e-9).split;
const colCut = (c, span) => SHELL.grooves.find(
  (g) => g.axis === 'col' && Math.abs(g.at - c) < 1e-9 &&
         Math.abs(g.span[0] - span[0]) < 1e-9 && Math.abs(g.span[1] - span[1]) < 1e-9).split;
const HOODROW = HOOD.map(rowCut);                              /* rows 7 and 29 */
const LIDROW = LID.map(rowCut);                                /* rows 77 and 86 */
const HOODCOL = [3.7, 10.3].map((c) => colCut(c, [HOOD[0] - FADE, HOOD[1] + FADE]));
const LIDCOL = [3.7, 10.3].map((c) => colCut(c, [LID[0] - FADE, LID[1] + FADE]));

/* ── The declared hard lines ────────────────────────────────────────────
   Resolved row and column indices on the master grid that are ALLOWED to
   break. Everything else stays smooth whatever angle it turns through, so a
   coarsely sampled shoulder cannot masquerade as a designed edge.

   Grooves contribute their own four channel lines, the two lips and the two
   floor edges, plus every resolved line inside the ramps their run-outs
   build at each end. The roof shoulder at ring 5 and ring 9 is the one
   feature line that is neither a gap nor a panel boundary: it turns
   65 degrees at every station from the windshield header aft and 10 degrees
   forward of the cowl, so declaring the line and testing the angle gives a
   shoulder that hardens where it exists and fades where it does not.

   A LINE IS DECLARED WITH ITS EXTENT. The hood side gaps run from ring
   fraction 3.7 and their span begins at row 0.95 with a 0.05 run-out, so
   the run-out line lands on row 1.00, which IS station 1. Declared as a
   bare index that hardens the whole of station 1, flank included, and puts
   a 26.6 degree facet round the nose at x 2.220: the exact defect this pass
   exists to remove, 400 mm further forward. And a run-out is an INTERVAL,
   not two lines, because a foreign line can land inside the fade and carry
   the whole break. Every declared line carries the interval it is a feature
   over, and the threshold picks. */
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

/* Split normals along the declared lines only. lib.crease cannot do this:
   it is a pure angle test with no idea which grid line an edge lies on, and
   the whole defect is that an angle test hardens a sampling kink. This
   walks the grid the panel was cut from instead. Faces meet in a
   six-triangle fan around each interior vertex, cut by at most two lines,
   so the components come out of a six-element union over that fan rather
   than by welding a de-indexed soup. Quad diagonals are never hard: that
   is a triangulation artifact showing through the paint.

   Triangle cost zero, exactly as lib.crease: the geometry de-indexes to
   three vertices per triangle and not one position moves. Carried from
   body-8, which is where crispness.md says it lives until a second body
   needs it. This is the second body. */
function creaseLines(mesh, rows, cols) {
  const r0 = rows[0], c0 = cols[0];
  const R = Math.min(SHELL.rows - 1, rows[1]) - r0 + 1;
  const C = Math.min(SHELL.cols - 1, cols[1]) - c0 + 1;
  const pos = mesh.geometry.attributes.position.array;
  const uv = mesh.geometry.attributes.uv.array;
  const QR = R - 1, QC = C - 1;
  const cosL = Math.cos((LINE * Math.PI) / 180);
  const P0 = (i, j) => (i * C + j) * 3;

  /* two face normals per quad, in loftMesh's own emission order:
     tri 0 is (i,j) (i+1,j) (i,j+1) and tri 1 is (i,j+1) (i+1,j) (i+1,j+1) */
  const fn = new Float64Array(QR * QC * 6);
  const face = (o, a, b, c) => {
    const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
    const wx = pos[c] - pos[a], wy = pos[c + 1] - pos[a + 1], wz = pos[c + 2] - pos[a + 2];
    const nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
    const L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    fn[o] = nx / L; fn[o + 1] = ny / L; fn[o + 2] = nz / L;
  };
  for (let i = 0; i < QR; i++) {
    for (let j = 0; j < QC; j++) {
      const o = (i * QC + j) * 6;
      face(o, P0(i, j), P0(i + 1, j), P0(i, j + 1));
      face(o + 3, P0(i, j + 1), P0(i + 1, j), P0(i + 1, j + 1));
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
    const p = P0(i, j), o = ((i * C + j) * 6 + k) * 3, t = (i * C + j) * 2;
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
  const r = [];
  for (let b = 0; b < SHELL.cols; b++) {
    const k = (rowIdx * SHELL.cols + b) * 3;
    r.push([SHELL.pts[k], SHELL.pts[k + 1], SHELL.pts[k + 2]]);
  }
  return lib.crease(endCap(r, dx, mat), CREASE);
}

/* The marque: a chevron, extruded with a beveled rim. A decal has no edge
   for a softbox to find; a badge does, which is the whole reason this is
   geometry and not a texture. Same outline as body-8 carries, because it is
   the same marque. */
const CHEVRON = [
  [-0.045, 0.000], [-0.017, -0.019], [0.000, -0.007], [0.017, -0.019],
  [0.045, 0.000], [0.017, 0.019], [0.000, 0.007], [-0.017, 0.019],
];

/* The two fascia planes, so the lamps are placed against the panel they sit
   on rather than against a remembered number. endCap turns its reveal at
   1.5 percent of the local radius and the face behind it is dead flat, so
   this is one number per face and it is exact everywhere on that face. */
const NOSEX = STATIONS[0][0] - 0.012;         /* 2.3630 */
const KAMMX = STATIONS[LAST][0] + 0.012;      /* -2.6630 */

export function build() {
  const sys = new THREE.Group();
  buildStructure(sys);
  buildShell(sys);
  return sys;
}

/* ── structure: castings, rails and rockers carried at their body.js
   coordinates; the cage is this generation's enabling change. Every box
   here is chamfered, which is 32 extra triangles apiece and most of the
   mechanical crispness on the car. ── */
function buildStructure(sys) {
  /* front megacasting, coordinates identical to body.js */
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
     pad. Coordinates carried. */
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
  /* machined pad the bonded tail cone lands on: the new load path */
  rc.add(acbox(0.03, 0.30, 0.90, 0.006, M.alu, -2.28, 0.60, 0));
  sys.add(rc);

  /* front crash rails and bumper beam, coordinates carried. The rails bolt
     to the casting through shear sleeves and the part text sells that as a
     hand-tool repair, so a bolt bank on the mounting flange is the obvious
     detail to add here and it is deliberately NOT added: swept from 168
     exterior cameras, 0 of 4 heads on the flange at x 1.702 reach any of
     them, because the flange is under a closed hood. Geometry nobody can
     see is a decal with a triangle budget. */
  const rails = lib.part('crash-rails', [0.95, -0.05, 0]);
  for (const s of [-1, 1]) {
    rails.add(acbox(0.54, 0.09, 0.09, 0.008, M.alu, 1.97, 0.55, s * 0.55));
    rails.add(acbox(0.02, 0.15, 0.12, 0.005, M.alu, 1.71, 0.55, s * 0.535));
  }
  rails.add(acbox(0.06, 0.10, 1.30, 0.008, M.alu, 2.24, 0.55, 0));
  sys.add(rails);

  /* rockers, coordinates carried: outer face |z| 0.915 under a 0.9214 flank */
  const rockL = lib.part('rockers', [0, -0.5, 0.3]);
  rockL.add(acbox(2.02, 0.10, 0.07, 0.008, M.paintDark, 0, 0.37, 0.88));
  sys.add(rockL);
  sys.add(mirrorZ(rockL));

  /* ── the new cage. Rails y 1.296 to 1.300 at |z| 0.510 in a 56 mm
     section, top face at 1.324 to 1.328 under a loft roof band at 1.336.
     A-pillar (0.99, 0.880, 0.660) to (0.30, 1.296, 0.510): 58.9 degrees
     from vertical against body.js's 48.0. B-pillar top 1.290, 110 mm
     shorter. Every member is a spline, not a chord, because a straight
     tube between two on-surface nodes cuts outside a convex panel in the
     middle; sampled against halfWidth() the worst node now sits 4 mm
     inside the skin and the highest 29 mm under the crown. ── */
  const cageSide = lib.part('cage', [0, 0.36, 0]);
  const members = [
    /* A-pillar: four points, because a straight member between the cowl and
       a header this far back cuts outside a convex screen in the middle */
    [0.028, [[0.99, 0.880, 0.660], [0.72, 1.030, 0.612], [0.48, 1.190, 0.542],
             [0.30, 1.296, 0.510]]],
    [0.028, [[0.30, 1.296, 0.510], [-0.48, 1.300, 0.510]]],              /* roof rail */
    /* B-pillar: follows the tumblehome rather than chording it */
    [0.026, [[0.02, 0.44, 0.876], [0.02, 0.72, 0.856], [0.02, 0.94, 0.800],
             [0.02, 1.10, 0.612], [0.02, 1.29, 0.510]]],
    /* C-pillar: four points, tracking the backlight edge into the haunch */
    [0.028, [[-0.48, 1.300, 0.510], [-0.92, 1.170, 0.548], [-1.30, 1.00, 0.620],
             [-1.78, 0.80, 0.740]]],
  ];
  for (const [r, m] of members) cageSide.add(lib.tube(m, r, M.darkSteel));
  /* FMVSS 201 head-impact pad: inner face |z| 0.467, 7 mm off the head */
  cageSide.add(acbox(0.78, 0.016, 0.015, 0.003, M.plastic, -0.09, 1.278, 0.4745));
  sys.add(cageSide);
  sys.add(mirrorZ(cageSide));

  const cageMid = lib.part('cage', [0, 0.36, 0]);
  cageMid.add(lib.tube([[0.30, 1.296, -0.510], [0.30, 1.296, 0.510]], 0.026, M.darkSteel));
  /* third bow: the rails moved 105 mm inboard, so the roof panel span grew */
  cageMid.add(lib.tube([[-0.10, 1.298, -0.510], [-0.10, 1.298, 0.510]], 0.024, M.darkSteel));
  cageMid.add(lib.tube([[-0.48, 1.300, -0.510], [-0.48, 1.300, 0.510]], 0.026, M.darkSteel));
  cageMid.add(lib.tube([[0.99, 0.870, -0.660], [0.99, 0.870, 0.660]], 0.028, M.darkSteel));
  sys.add(cageMid);
}

/* ── the Gen 6 shell ── */
function buildShell(sys) {
  /* ── skin: nose flank, the fixed panels either side of the door aperture,
     the hood band and the nose face. Every painted panel is a slice of
     the one master grid, so the beltline seam at ring point 3 cannot open a
     hairline and a shutline cut once is picked up by both panels. ── */
  const skin = lib.part('skin', [0, 0.62, 0]);
  skin.add(panel([RI(0), RI(FAIR0)], FL));
  skin.add(panel([RI(0), RI(FAIR0)], FR));
  skin.add(panel([CUT[2], RI(DECK)], FL));            /* rear quarter */
  skin.add(panel([CUT[2], RI(DECK)], FR));
  skin.add(panel([CUT[0], CUT[2]], SILLL));           /* sill band under the cuts */
  skin.add(panel([CUT[0], CUT[2]], SILLR));
  /* THE HOOD COMES OUT OF THE DECK BAND, and it is a re-slice rather than a
     redraw: the four cut lines were grooved into the master grid when this
     body was drawn and the panel above simply ran over the top of them. What
     the skin keeps is the nose deck ahead of the hood, the two shoulder
     strips either side of it and the cowl band behind it; what opens is the
     middle. The row cuts run the full width of the deck band rather than
     stopping at the groove's own column span, which over-cuts four grid
     nodes at each end where the channel has already faded out. Measured
     there, the surface turns 0.02 degrees, so nothing shows. */
  skin.add(panel([RI(0), HOODROW[0]], UP));           /* nose deck ahead of the hood */
  skin.add(panel(HOODROW, [UP[0], HOODCOL[0]]));      /* left shoulder strip */
  skin.add(panel(HOODROW, [HOODCOL[1], UP[1]]));      /* right shoulder strip */
  skin.add(panel([HOODROW[1], RI(COWL)], UP));        /* cowl band */
  skin.add(lib.shell(capOf(RI(0), -0.012, M.paint))); /* nose face */
  sys.add(skin);

  /* the hood, the same part id so the skin stays one clickable thing */
  const hood = lib.hinge(lib.part('skin', [0, 0.62, 0]), 'hood');
  hood.add(panel(HOODROW, HOODCOL));
  sys.add(hood);

  /* ── front fairings: the flank band across the wheel stations, plus the
     inboard wall and the fore and aft closeouts that make it a pod. The pod
     now owns the near lip and the floor of the door's front shutline,
     because that joint lands on its own blend-out station. ── */
  const fair = lib.part('front-fairings', [0.35, -0.05, 0.95]);
  fair.add(panel([RI(FAIR0), CUT[0]], FL));
  fair.add(panel([RI(FAIR0), CUT[0]], FR));
  /* the pod's inboard wall and end closeouts. Held above y 0.335 so nothing
     enters battery-6's envelope, whose ceiling is y 0.31 out to |z| 0.72 */
  for (const s of [-1, 1]) {
    /* inboard wall: 17.5 mm inboard of wheels-6's tire inner face, which is
       P.wheelZ minus half the 185 mm tread */
    const WALL = P.wheelZ - 0.110;
    fair.add(acbox(0.80, 0.190, 0.014, 0.004, M.carbon, P.axleF, 0.640, s * WALL));
    /* end closeouts, stopped at y 0.70 and set from the surface at their own
       top edge so neither corner reaches through the pod's shoulder */
    for (const cx of [P.axleF + 0.405, P.axleF - 0.405]) {
      const zo = halfWidth(cx, 0.700) - 0.012;
      fair.add(acbox(0.016, 0.330, zo - WALL, 0.005, M.carbon, cx, 0.5350, s * (WALL + zo) / 2));
    }
    /* lower closeout: 0.72 m, not the pod's full 1.18 m, because the loft is
       blending inboard hard at both ends and a straight strip run any longer
       reaches through the surface at its corners */
    const lz = halfWidth(P.axleF, 0.292) - 0.058;
    fair.add(acbox(0.72, 0.02, 0.10, 0.006, M.carbon, P.axleF, 0.292, s * lz));
    /* The four fasteners the part text sells a roadside puncture check on:
       "removing the fairing lower closeout, four fasteners and a bonded
       seal". They were never drawn. The seating face is the closeout's
       LOWER face at y 0.282, because that is the one a jack-height view
       reaches; a head on the outboard face would sit in an 8 mm slot
       between the closeout and the flank and never be seen. */
    for (const dx of [-0.30, -0.10, 0.10, 0.30]) {
      const f = lib.fastener(0.0042, M.steel, 'hex');
      f.rotation.z = Math.PI;
      f.position.set(P.axleF + dx, 0.282, s * lz);
      fair.add(f);
    }
  }
  sys.add(fair);

  /* ── tail cone: flank and deck bands aft of the arch, plus the Kamm face.
     Plan half-width 0.948 at x -1.83 down to 0.550 at -2.675. The trunk lid
     WAS cut into the deck band rather than sliced out of it, on the argument
     that it does not open in this model and one mesh keeps its channel closed
     by construction. It opens now, so the deck band is sliced on the same
     four groove indices the channel was already cut at: the deck ahead of the
     lid, the two quarters either side of it, the 355 mm of fixed deck under
     the spoiler mounts, and the lid. ── */
  const tail = lib.part('tail-cone', [-1.25, 0.30, 0]);
  tail.add(panel([RI(DECK), RI(LAST)], FL));
  tail.add(panel([RI(DECK), RI(LAST)], FR));
  tail.add(panel([RI(DECK), LIDROW[0]], UP));         /* deck ahead of the lid */
  tail.add(panel(LIDROW, [UP[0], LIDCOL[0]]));        /* left quarter */
  tail.add(panel(LIDROW, [LIDCOL[1], UP[1]]));        /* right quarter */
  tail.add(panel([LIDROW[1], RI(LAST)], UP));         /* fixed deck under the spoiler */
  tail.add(lib.shell(capOf(RI(LAST), 0.012, M.paint)));                    /* Kamm face */
  /* The marque, and the only one on the car: a sealed nose carrying a
     full-width light band has nowhere honest to put a second. The Kamm face
     is now flat behind its reveal, so a 4.4 mm badge stands 4.4 mm proud
     everywhere on its 90 by 38 mm footprint instead of being half sunk at
     one corner and floating at the other, which is what a badge on a coned
     cap does. */
  const mark = lib.badge(CHEVRON, 0.0044, M.alu);
  mark.rotation.y = -Math.PI / 2;
  mark.position.set(KAMMX, 0.780, 0);
  tail.add(mark);
  sys.add(tail);

  /* the trunk lid, the same part id so the tail stays one clickable thing */
  const lid = lib.hinge(lib.part('tail-cone', [-1.25, 0.30, 0]), 'decklid');
  lid.add(panel(LIDROW, LIDCOL));
  sys.add(lid);

  /* ── glass canopy band, lofted 8 mm proud of the same stations ── */
  const canopy = lib.part('canopy', [0, 1.05, 0]);
  canopy.add(lib.shell(lib.loft(glassBand, M.glass)));
  sys.add(canopy);

  /* ── light bands. Both were a single slab standing 14 mm off a coned cap,
     which is the shape a lamp has before anyone designs it. Both are now a
     channel: two lips on the fascia plane and the lit surface set 6 mm
     behind them, so the band reads as an aperture with a shadow in it
     rather than as a glowing brick glued to the nose.

     The front band face stays at x 2.371 to the millimeter and the lidar
     windows stay at z +-0.30, because autonomy-4 mounts its pucks at
     (2.33, 0.615, +-0.30) against those numbers and a generation that moves
     a partner's interface has invented a drift bug. ── */
  const lbF = lib.part('lightbands', [1.15, 0.1, 0]);
  for (const y of [0.5975, 0.6325]) {
    lbF.add(acbox(0.014, 0.010, 0.860, 0.0015, M.paintDark, NOSEX + 0.007, y, 0));
  }
  lbF.add(acbox(0.008, 0.025, 0.860, 0.0015, M.lamp, NOSEX + 0.004, 0.615, 0));
  /* the matrix. 168 emitters across two banks is finer than a mesh can
     carry, so the ribs are drawn at the pixel-group boundaries: 42 of them
     over 856 mm, standing 3.5 mm off the lit surface and 2.5 mm behind the
     lips, which is what stops an 860 mm lamp reading as one bar of light. */
  const pix = lib.grille(0.856, 0.023, 0.004, M.plasticLt, { bars: 42, barW: 0.0035 });
  pix.rotation.y = Math.PI / 2;                 /* ribs across z, depth along +x */
  pix.position.set(NOSEX + 0.0095, 0.615, 0);
  lbF.add(pix);
  for (const s of [-1, 1]) {
    lbF.add(acbox(0.014, 0.030, 0.060, 0.002, M.sensor, NOSEX + 0.007, 0.615, s * 0.30));
  }
  sys.add(lbF);
  const lbR = lib.part('lightbands', [-1.15, 0.1, 0]);
  for (const y of [0.680, 0.720]) {
    lbR.add(acbox(0.014, 0.010, 1.010, 0.0015, M.paintDark, KAMMX - 0.007, y, 0));
  }
  lbR.add(acbox(0.008, 0.030, 1.000, 0.0015, M.lampRed, KAMMX - 0.004, 0.700, 0));
  sys.add(lbR);

  /* ── Kamm spoiler, drawn deployed 78 mm proud of the tail deck. The blade
     and its span are unchanged; the struts and the mount pads are now
     placed through surfaceY, so they stand ON the deck. Before this pass
     the pads sat at a fixed y 0.905 where the deck is at 0.970, 65 mm
     inside their own bodywork. ── */
  /* The blade is a SECTION, not a plank. Span, chord, station and deployed
     angle are all unchanged; what changes is that a 200 mm chord working at
     130 km/h is drawn as a cambered plate 12 mm thick at 40 percent chord,
     tapering to 2 mm at the trailing edge, instead of as a constant 12 mm
     slab with the same rectangle at both ends. lib.badge extrudes it along
     the span with a 2 mm beveled rim, which is what gives the tip an edge
     for the rear softbox to find. */
  const spoiler = lib.part('kamm-flap', [-0.9, 0.55, 0]);
  const BX = -2.470, BY = 0.995;
  const BLADE = [
    [0.100, 0.0000], [0.070, 0.0075], [0.030, 0.0090], [-0.020, 0.0075],
    [-0.070, 0.0040], [-0.100, 0.0010], [-0.100, -0.0010], [-0.060, -0.0025],
    [-0.010, -0.0035], [0.040, -0.0030], [0.080, -0.0015],
  ];
  const blade = lib.badge(BLADE, 1.12, M.carbon, { bevel: 0.002, curveSegments: 2 });
  blade.position.set(BX, BY, -0.56);
  blade.rotation.z = 0.16;
  spoiler.add(blade);
  /* A tapering deck is not a plane of constant height across a 50 mm foot,
     and both of these parts used to be placed as if it were. The deck falls
     21.9 mm across the pad's own 50 by 60 mm footprint, so a pad seated on
     the height at its center buries one corner 7 mm and floats the opposite
     one 15 mm. Both are seated from the LOWEST deck point under their own
     footprint, which is the aft outboard corner on a boat tail, so neither
     floats anywhere and the pad shows a constant 22 mm above the deck at
     its center line. */
  const px = BX + 0.11;
  for (const s of [-1, 1]) {
    const sx = BX + 0.02, sz = s * 0.40;
    const deck = surfaceY(sx - 0.008, 0.425);
    spoiler.add(acbox(0.016, BY - deck + 0.03, 0.05, 0.004, M.darkSteel,
                      sx, (BY + deck - 0.03) / 2 + 0.005, sz));
    const lowest = surfaceY(px - 0.025, 0.290) - 0.004;
    const top = surfaceY(px, 0.260) + 0.022;
    spoiler.add(acbox(0.05, top - lowest, 0.06, 0.006, M.plasticLt, px,
                      (top + lowest) / 2, s * 0.26));
  }
  sys.add(spoiler);

  /* ── diffuser flap, drawn deployed at 17.5 degrees: 0.70 m ramp hinged
     at (-1.95, 0.135), clear of P.driveR which ends at x -1.80. The ramp is
     TAPERED in plan, 1.20 m at the hinge to 0.98 m at the exit, because the
     boat tail is only 1.06 m wide where the ramp leaves it: a rectangular
     ramp of constant span hangs its corners outside the tail in plan, which
     is exactly the defect this generation exists to delete. Both spans stay
     clear of wheels-6's tire inner faces at 0.7175 and of drivetrain-6's
     in-wheel annulus at r 0.155 to 0.235, |z| 0.72 to 0.80.

     The strakes take their rotation and their seat from the ramp's own
     vector now. They were drawn at y 0.285 against a ramp whose lower face
     is at 0.2315 where they stand, so all eight stood 53 mm off the panel
     they are fences on. ── */
  const RZF = Math.atan2(0.3349 - 0.1281, -2.6193 + 1.9507);
  const flap = lib.part('diffuser-flap', [-1.0, -0.4, 0]);
  const rampSection = (x, y, hz) => {
    const pts = [];
    for (let i = 0; i <= 6; i++) pts.push([x, y, -hz + (2 * hz * i) / 6]);
    for (let i = 6; i >= 0; i--) pts.push([x, y + 0.012, -hz + (2 * hz * i) / 6]);
    return pts;
  };
  flap.add(lib.crease(lib.loft([rampSection(-1.9507, 0.1281, 0.600),
                                rampSection(-2.6193, 0.3349, 0.490)], M.carbon, true), CREASE));
  const SKX = -2.2850, SKY = 0.2315;
  for (const z of [-0.44, -0.18, 0.18, 0.44]) {
    flap.add(acbox(0.64, 0.09, 0.010, 0.003, M.carbon, SKX, SKY, z, RZF));
    /* two fixings per strake, taking the ramp's own rotation so the heads
       sit flat on the panel they bolt through. The strake center line
       already lies on the ramp's lower face, so the seat needs no y offset;
       the head stands 11 mm outboard of the strake's plane so its 9.3 mm
       flange clears the 10 mm fin it retains by 1.4 mm. */
    for (const dx of [-0.21, 0.21]) {
      const f = lib.fastener(0.0038, M.steel, 'hex');
      f.rotation.set(0, 0, RZF, 'ZXY');
      f.position.set(SKX + dx * Math.cos(RZF), SKY + dx * Math.sin(RZF),
                     z + Math.sign(z) * 0.011);
      flap.add(f);
    }
  }
  const hinge = lib.cyl(0.012, 1.20, M.darkSteel, 12);
  hinge.rotation.x = Math.PI / 2;
  hinge.position.set(-1.95, 0.135, 0);
  flap.add(hinge);
  for (const s of [-1, 1]) {
    flap.add(acbox(0.05, 0.04, 0.06, 0.006, M.plasticLt, -2.03, 0.205, s * 0.30));
  }
  sys.add(flap);

  /* ── arch louvers, in the recess cut for them above. The blades keep
     their section, spacing, thickness and 0.3 rad set angle and keep their
     offset of 14 mm off the flank surface, so the outer faces sit 1.8 mm
     below the flank line at mid-height. That used to make them invisible.
     In an open 30 mm pocket it makes them the outermost thing in the
     pocket, which is what a louver bank looks like. ── */
  const louv = lib.part('arch-louvers', [0.4, -0.05, 1.3]);
  const BANK = [[1.168, 4, 0.3, 1.1356, 1.3864], [1.573, 3, -0.3, 1.5406, 1.7294]];
  for (const [x0, n, ry] of BANK) {
    for (let i = 0; i < n; i++) {
      const x = x0 + i * 0.062;
      louv.add(acbox(0.05, 0.10, 0.010, 0.003, M.plastic, x, 0.500,
                     halfWidth(x, 0.500) - 0.014, 0, 0, ry));
    }
  }
  /* Cassette side frames, one at each end of each bank, lying on the recess
     floor. These replace two 50 x 26 x 20 mm blocks that sat at y 0.600,
     outside the band the blades occupy and 10 mm inside the skin, so they
     were invisible for the same reason the blades were. A louver bank has
     to pivot in something, the something is a frame, and a frame down the
     height of the recess is both the honest part and the one a camera can
     see.

     THE FLOOR IS NOT A CONSTANT |z| PLANE. Measured on the built grid the
     floor runs y 0.4446 to 0.5502 and |z| 0.9741 down to 0.9649, so the
     flank narrows 9.1 mm over the pocket's own 106.0 mm of floor and a box
     seated on halfWidth - 0.030 buries its lower inner corner and floats
     its upper one. The frame is tilted onto the floor's own line and seated
     from floorZ: swept vertex by vertex, the closest any louver hardware
     comes to the floor is 0.11 mm inside it, which is contact. It is 100 mm
     tall against the floor's 106 so it keeps 3 mm to each wall, and 24 mm
     deep. */
  const FRY = 0.4974, FRH = 0.100;         /* the floor runs y 0.4446 to 0.5502 */
  const frame = (x) => {
    const t = Math.atan2(floorZ(x, FRY + FRH / 2, LOUV.depth)
                       - floorZ(x, FRY - FRH / 2, LOUV.depth), FRH);
    return { t, zc: floorZ(x, FRY, LOUV.depth) + 0.012 * Math.cos(t) };
  };
  for (const [, , , xa, xb] of BANK) {
    for (const x of [xa, xb]) {
      const f = frame(x);
      louv.add(acbox(0.014, FRH, 0.024, 0.004, M.plasticLt, x, FRY, f.zc, 0, f.t));
      /* one fixing through each frame. A louver bank is a serviceable item
         bolted to the liner, so it shows heads where a bonded panel would
         not, and this is the one place on the outer surface where that is
         true. The seat is the FRAME's own face center and the axis its own
         normal, so the head lies flat on the tilted face; seated on the
         unrecessed flank instead it would stand proud of the widest thing
         the body has at that height. */
      const b = lib.fastener(0.0042, M.steel, 'hex');
      b.rotation.x = Math.PI / 2 + f.t;
      b.position.set(x, FRY - 0.012 * Math.sin(f.t), f.zc + 0.012 * Math.cos(f.t));
      louv.add(b);
    }
  }
  sys.add(louv);
  sys.add(mirrorZ(louv));

  /* ── sealed venturi underbody: lip, lower nose valance with the intake
     aperture cut in it, front and rear closeouts at y 0.10, twin-tunnel
     strakes. Rear closeout reaches the hinge line at x -1.95 ── */
  const floor = lib.part('venturi-floor', [0, -0.55, 0]);
  const lip = lib.plate(0.26, 1.02, 0.016, 0.06, M.carbon);
  lip.position.set(2.228, 0.112, 0);
  floor.add(lib.shell(lip));
  /* Splitter fixings on the plate's top face, inboard of the side dams. A
     carbon lip working at a 110 mm gap is a strike item: the part text
     sells shear-away fasteners that cost a bracket, and this is where they
     are. lib.plate puts its slab between y + t/2 and y + 3t/2, so this
     16 mm plate at y 0.112 runs 0.120 to 0.136 and the seating face is
     0.136, not the 0.128 mid-plane. */
  for (const z of [-0.40, -0.18, 0.18, 0.40]) {
    const f = lib.fastener(0.0040, M.steel, 'hex');
    f.position.set(2.170, 0.136, z);
    floor.add(f);
  }
  /* the raked lower nose valance, in four panels around the intake
     aperture. vx and vhz are the same interpolants the single panel used,
     so the surface outside the hole is the surface it always was, station
     kink at y 0.280 included. Without this panel the splitter reads as a
     floating plate, which is the body-4 lesson. */
  const vrow = (y) => {
    const h = vhz(y);
    return [-h, -AP.z, -AP.z / 2, 0, AP.z / 2, AP.z, h].map((z) => [vx(y), y, z]);
  };
  floor.add(lib.shell(lib.loft([vrow(0.128), vrow(AP.y0)], M.carbon)));
  floor.add(lib.shell(lib.loft([vrow(AP.y1), vrow(0.420)], M.carbon)));
  for (const s of [-1, 1]) {
    floor.add(lib.shell(lib.loft([AP.y0, 0.280, AP.y1].map((y) =>
      [[vx(y), y, s * AP.z], [vx(y), y, s * (AP.z + vhz(y)) / 2], [vx(y), y, s * vhz(y)]]),
      M.carbon)));
  }
  /* the throat. A hole with a short return still lets daylight through the
     car, which is worse than the flat panel it replaced, so the rim runs
     all the way back to a mouth on thermal-6's core face. One closed-loop
     loft, so all four walls and their four corners arrive together and the
     crease breaks every one. */
  const rim = (at) => {
    const p = [], b = at(AP.y0), k = at(0.280), t = at(AP.y1);
    for (const z of [-AP.z, -AP.z / 2, 0, AP.z / 2, AP.z]) p.push([b[0], b[1], z]);
    p.push([k[0], k[1], AP.z]);
    for (const z of [AP.z, AP.z / 2, 0, -AP.z / 2, -AP.z]) p.push([t[0], t[1], z]);
    p.push([k[0], k[1], -AP.z]);
    return p;
  };
  floor.add(lib.shell(lib.crease(lib.loft([
    rim((y) => [vx(y), y]),
    rim((y) => [MOUTH.x, MOUTH.y0 + (y - AP.y0) / (AP.y1 - AP.y0) * (AP.y1 - MOUTH.y0)]),
  ], M.carbon, true), CREASE)));
  for (const s of [-1, 1]) {
    floor.add(acbox(0.28, 0.05, 0.012, 0.004, M.carbon, 2.16, 0.19, s * 0.44));
  }
  const closeF = lib.plate(0.78, 1.24, 0.012, 0.04, M.carbon);
  closeF.position.set(1.71, 0.10, 0);
  floor.add(lib.shell(closeF));
  const closeR = lib.plate(0.62, 1.24, 0.012, 0.04, M.carbon);
  closeR.position.set(-1.625, 0.10, 0);
  floor.add(lib.shell(closeR));
  for (const z of [-0.50, -0.21, 0.21, 0.50]) {
    floor.add(acbox(0.60, 0.055, 0.010, 0.003, M.carbon, -1.63, 0.13, z));
  }
  sys.add(floor);

  /* ── intake gates: the four-slat bank in the lower nose, now standing
     over a hole rather than over a panel. The bank is drawn shut and shut
     is where it lives, so it fills most of its own window from straight
     ahead; what used to be flat valance carbon behind the other part is now
     the throat, the lattice and a heat exchanger. ── */
  const gates = lib.part('intake-gates', [1.3, -0.08, 0]);
  /* The lattice is sized to the aperture rather than to itself: 0.800 by
     0.186 against a hole 0.772 wide and 0.160 measured up the valance's own
     slope, so it overlaps every edge by about 12 mm and no oblique view
     finds its way past the bars into the cavity. It is a flat panel behind a
     valance that folds at y 0.280, so its setback is a range and not one
     number: measured vertex by vertex forward onto the built valance, the
     bar faces sit 12.0 mm behind the skin at the aperture's own station and
     4.1 mm at the tightest point, which is the lattice's top corner above
     the fold. Nowhere does it reach the panel.

     ITS DEPTH IS SET BY thermal-6 AND NOT BY TASTE. The lattice is a flat
     panel parallel to a valance raked 24.5 degrees, so its lower edge lies
     169 mm further back in x than its upper one, and the cross family sits
     another 12 mm behind the bar family. body-8 could afford 38.5 mm of
     total lattice depth because thermal-7's coil face is at x 2.2090. This
     body also runs with thermal-6, whose radiator core face is 48 mm
     further forward at 2.2574, and at 38.5 mm the lattice crossed it.
     Sixteen millimeter bars with the cross family 12 mm behind them give
     28.0 mm of depth, and the nearest intake vertex above y 0.255, which is
     where the core begins, is then 14.3 mm ahead of it. */
  const SET = 0.012;
  const mesh = lib.grille(0.800, 0.186, 0.016, M.darkSteel, {
    bars: 30, cross: 5, barW: 0.0045, chamfer: 0.0009,
  });
  mesh.rotation.y = Math.PI / 2;                /* bars across z, depth along +x */
  const back = new THREE.Group();
  back.add(mesh);
  back.rotation.z = -RAKE;
  back.position.set(vx(0.287) - (SET + 0.008) * Math.cos(RAKE),
                    0.2870 + (SET + 0.008) * Math.sin(RAKE), 0);
  gates.add(back);
  /* The valance is raked, so each slat sits on its own station of it, and
     the chord is 54.3 mm rather than the 50 it was drawn at BECAUSE of the
     chamfer. A slat 12 by 50 mm turned 0.55 rad projects 48.898 mm of
     height onto the window, which at a 48 mm pitch is 0.90 mm of overlap
     and a shut bank. Chamfering it cuts the corner that was making that
     projection: lib.cbox pulls every edge back by c, so at c 3.5 mm the
     projection falls to 45.240 and the 0.90 mm overlap becomes three
     2.76 mm slits. Rastered 300 by 300 over the bank window, 0.00 percent
     of rays saw past the nose before the chamfer and 1.10 percent after,
     and with thermal-6 present 0.40 percent of them ran the whole length of
     the car and landed on the diffuser flap at x -2.42. No chamfer value
     above zero recovers 48.898 mm, because the loss is linear in c, so the
     chord carries it: 54.3 mm returns the projection to 48.906 mm, the
     overlap to 0.91 and the bank's span to the y 0.191 to 0.383 this
     module publishes. A detail that is subtracted from a silhouette has to
     be paid for in the dimension it was subtracted from. */
  for (let i = 0; i < 4; i++) {
    const y = 0.215 + i * 0.048;
    gates.add(acbox(0.012, 0.0543, 0.80, 0.0035, M.plastic, vx(y) + 0.014, y, 0, 0.55));
  }
  for (const s of [-1, 1]) {
    gates.add(acbox(0.02, 0.20, 0.05, 0.006, M.plastic, vx(0.295) + 0.014, 0.295, s * 0.425));
  }
  gates.add(acbox(0.05, 0.03, 0.03, 0.006, M.plasticLt, vx(0.330) + 0.016, 0.330, 0.45));
  sys.add(gates);

  /* ── flush doors. The skins ARE the master surface between two shutlines
     now, not panels lofted 3 mm above it, which is what this part's own
     text has claimed since it was written. Each door carries the far wall
     and lip of the cut in front of it and the near lip, wall and floor of
     the cut behind it, so the channel between two panels is closed and you
     see two lit walls and a dark floor rather than a painted line. ── */
  /* ONE GROUP PER LEAF, plus a third that does not move. Same meshes at the
     same coordinates; what changed is which group owns them, because a
     closure is a rigid body and cannot be a slice of a larger group. See
     SPEC.md's closures section.

     Each leaf carries its own capacitive strip, in the pocket cut for it. A
     pocket floor is not a plane of constant |z|: the flank draws in 3.7 mm
     over the rear strip's own 140 mm, so a straight bar seated at the
     pocket's mid-station buries one end 2.9 mm and stands the other 5.0 mm
     proud. Each strip is turned onto its own floor's line, seated from
     floorZ, and stands 2 mm proud of the door rather than the 14 mm it stood
     before. The pocket is sized from these three numbers, so the strip lands
     on full-depth floor over its whole footprint and both run-outs fall
     outside it.

     The camera pods on their 90 mm stalks stay behind: they are on the fixed
     strip ahead of the front shutline where the hinge boxes live, not on the
     door skin, so they keep the part id and carry no hinge. */
  const leaf = (id, rows, px) => {
    const g = lib.hinge(lib.part('doors', [0.08, 0, 0.85]), id);
    g.add(panel(rows, DOORBAND));
    const y = ringY(px, PADCOL);
    const s = seatOnFlank(px, y, PAD.depth, PADT);
    g.add(acbox(PADL, PADH, PADT, 0.0025, M.alu, s.p[0], s.p[1], s.p[2], 0, s.rx, s.ry));
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
  fixed.add(acbox(0.014, 0.012, 0.09, 0.003, M.plastic, 0.98, 0.870, zr + 0.045));
  fixed.add(acbox(0.05, 0.028, 0.028, 0.005, M.sensor, 0.98, 0.870, zr + 0.098));
  for (const g of [leaf('door-front', [CUT[0], CUT[1]], PADX[0]),
                   leaf('door-rear', [CUT[1], CUT[2]], PADX[1]),
                   fixed]) {
    sys.add(g);
    sys.add(mirrorZ(g));
  }
}

