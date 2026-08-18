/* Gen 9 body: the front.

   Gen 8 proved with arithmetic that an afterbody cannot move frontal area:
   the front fairings held 1.000 to 1.008 half-width from y 0.28 to 0.78 and
   owned 54 percent of the silhouette, while the maximum-section ring owned
   everything above. Only the front and the package buy A. This module goes
   there. THE AFTERBODY CARRIES OVER UNCHANGED, station for station and
   coordinate for coordinate, from x -1.100 to the Kamm face at -2.775, and
   every carried part says so on its own panel.

   WHAT WHEELS-9 HANDED OVER, DERIVED FROM ITS BUILT MESH RATHER THAN ITS
   PROSE. Front wheel centers move |z| 0.81 to 0.74. Sweeping every vertex of
   its built front tire, wheel, cover and disc about the vertical axis
   through (1.45, 0.74) reproduces its published table exactly: 0.8190 static
   at the cover lip, 0.8926 at 14 degrees, 0.9032 at 16, 0.9097 at 17.25. The
   peak sits at hub height y 0.355, 306 mm fore and aft of the axle, and it
   is 70.0 mm inboard of the same measurement on wheels-7 at every angle,
   because the corner translated rigidly. So this body needed a subtraction,
   not a new clearance study.

   WHAT THIS BODY DID WITH IT. The pod does not shrink by 70 mm. It stops
   being a pod. Stations 3, 4 and 5 come from 1.000 / 1.008 / 1.000 to a flat
   0.925 from y 0.28 to 0.58, which is the beltline the cabin has carried
   since body-3, and the fender shoulder above it comes from 0.936 / 0.942 /
   0.936 to 0.898 / 0.902 / 0.900. The front fairing is therefore no longer a
   blister on a flank. It IS the flank. The widest point of the car moves off
   the front axle and onto the beltline for the first time in the ladder, and
   the bodywork measures 1.850 m wide against body-8's 2.016, inside the
   1.88 m the packaging spec has claimed for nine generations and never held.
   The car itself is 1.954 m over the camera pods, which stood 11.5 mm inside
   body-8's fairing and are now the widest thing on it.

   FRONTAL AREA, MEASURED AND SHORT OF TARGET. design/gen9.md asks for
   2.02 m2 on the convention the Gen 8 audit used, which put body-7 at 2.163
   and body-8 at 2.157. That convention is four terms, and every one of them
   is measured here by one integrator run over BOTH bodies:

     term                              body-8     body-9      delta
     loft silhouette above y 0.28      1.8205     1.7482    -0.0722
     sub-loft projection below y 0.28  0.1919     0.1919     0.0000
     tire columns                      0.1260     0.0868    -0.0392
     protrusions past the silhouette   0.0362     0.0322    -0.0041
     ----------------------------------------------------------------
                                                            -0.1155
     audit convention                  2.1570  -> 2.0415

   Three of those terms land on the audit's own arithmetic: the silhouette
   integrator returns body-8's published 1.8221 to within 1.6 square
   centimeters, the tire columns are the published 0.1260 and 0.0868 to four
   decimals, and the sub-loft term of 0.1919 is precisely the audit's 0.173
   of splitter and valance plus the 0.0189 of floor plates, strakes and
   deployed diffuser it lists separately. The fourth does not: the audit's
   implied protrusion residual is 0.0186 where this integrator counts 0.0362,
   because it also picks up the 8 mm and 3 mm offsets the glass band and the
   door skins are lofted at. Those are modeling offsets on carried parts,
   identical on both bodies, so the disagreement does not propagate. What is
   used is the delta, and the delta is one method over both. A is therefore
   the audit's own 2.157 moved by -0.1155: 2.0415 m2.

   That is 0.022 short of the brief and the module reports the measured
   figure, as design/retro-gen8.md requires. It is also 0.015 BETTER than
   wheels-9 predicted, and the difference is the fender shoulder: wheels-9
   priced a rigid 70 mm translation of the pod, which would have left the
   y 0.58 to 0.80 band at 0.925 falling to 0.872, and a redrawn pod takes
   that band to 0.924 falling to 0.900, where the cabin already sits under
   it. On js/efficiency.js's own model this body is worth 30 miles on top of
   the 10 wheels-9 collects alone: 1,621 to 1,631 to 1,661 with thermal-7
   carried, and 1,693 once thermal-9's 559 W is in, against a Gen 9
   expectation of 1,755 and a target of 1,800.

   WHY THE LAST 0.022 IS NOT AVAILABLE TO A BODY GENERATION. Above y 0.28 the
   silhouette is now owned by two things and neither is a front part. From
   y 0.28 to 0.55 it is the 0.925 beltline, which is set by the rockers at
   |z| 0.915 and by interior-6's hip room. From y 0.86 up it is the maximum
   section ring at x -0.450. Cap the whole front, every station from x 2.375
   to 1.070, at the beltline and the integral moves by 0.0000 m2, because it
   is already there. Gen 8 found that a tail cannot move A; Gen 9 finds that
   once the fairing is on the flank the front cannot either, and what is left
   is cabin width and the sub-loft package.

   THE NOSE DID NOT NARROW, AND THAT IS A MEASURED RESULT RATHER THAN AN
   OMISSION. The brief asks for a narrower nose. Three numbers say no.
   Stations 0 to 2 own no height band of the silhouette at all, so their
   width returns exactly zero. Narrowing them steepens the one plan angle
   this generation improved: the fairing leading flare falls from 48.4 to
   36.5 degrees on the pod change alone, and every millimeter off station 2
   puts it back. And the bumper beam's outboard corner already stands 14.9 mm
   outside the nose loft at (2.27, 0.50, +-0.65), carried since body.js, so
   pulling the nose in deepens an existing foul instead of fixing it. What
   does change at the nose is the intake aperture, which body-8 named as owed
   and this module takes.

   Cd. This module claims ONE count and names the mechanism. body-8's fairing
   closed from 1.006 half-width at x 1.070 to the cabin's 0.923 at x 0.850,
   a 20.7 degree compression in plan on a body whose audit penalized the tail
   flank for running 16.5 to 18.3. That shoulder is gone: the same measurement
   on this body is 0.5 degrees. Priced at the audit's own implied base
   coefficient of 0.030 applied to the blister's trailing cross-section of
   0.083 m2, that is 1.15 counts, carried as 1. Cd 0.108 audited to 0.107,
   provisional until this body is audited in its own right. The leading flare
   improvement and the smaller wetted area are booked at zero, because a wake
   is a tunnel measurement and this module cannot make it.

   A DEFECT FOUND IN A CARRIED PART. body-8's front fairing lower closeout is
   a 100 mm flange at y 0.282 to 0.302 running from |z| 0.8945 to 0.9945, and
   its own steered front tire reaches it at 3.1 degrees of lock and is 48.6 mm
   through it at the commanded 14. It was invisible because nobody swept the
   front pod's own hardware against the wheel it encloses; body-8 swept the
   REAR lip that way and got it right. This body redraws the front lip on the
   same principle, with its inboard edge following a measured sweep table.
   The same sweep run over THIS pod's own hardware clears the lip, the skin
   and the louver bank and does NOT clear the sealed inboard wall, which is
   still an offset from the wheel center and is still crossed by the steered
   brake disc from about 6 degrees, exactly as body-8's is. That is carried
   rather than created and it is on the fairings panel rather than left out,
   because a module that files a sweep defect against its predecessor has to
   run the same sweep over every one of its own parts or the finding is luck.

   Gen 9 preset partners, all cited from BUILT geometry per the drift law:
   wheels-9 (155/65 R20 on all four corners, front centers |z| 0.74, faces
   0.6625 and 0.8175, cover lip 0.8190, swept peak 0.8926 at 14 degrees),
   suspension-9 (front tower plate at (1.50, 0.735, +-0.41), damper topping
   out at y 0.729, subframe mounts held at +-0.50, front metal reaching
   |z| 0.7100 at the by-wire boss it has already scheduled to move),
   drivetrain-7, battery-7, thermal-9, hv-4, autonomy-4, interior-6.

   DRIFT TRAP, named because it is live. P.wheelZ stays 0.81 in js/common.js
   and this module does not touch it. body-8 wrote its fairing inboard wall
   as P.wheelZ - 0.110; eight modules read that constant, and editing it to
   0.74 would move every earlier generation's wheels and make the body-8 foul
   vanish by accident rather than by drawing. This module declares its own
   FRONTZ and uses it in the one place the wall is built.

   Mass ledger, binding plus or minus 2 kg: 200 kg structure + 152 kg shell
   = 352 kg, against body-8's 203 + 159 = 362.

   GEOMETRIC CRISPNESS PASS. This body shipped as 6,508 triangles of
   completely smooth loft with no shutline, no crease, no panel gap and no
   badge in it, which is a clay model rather than a car. It is now 20,584
   against a 60,000 budget, on the vocabulary in design/crispness.md: one
   master grid subdivided two for one in both directions with
   interp: 'linear', ten grooves cut into it, and creases declared line by
   line rather than picked off by a global angle. What the pass did NOT do
   is move the aerodynamic surface. The STATIONS table, ring, halfWidth,
   bottomY, surfaceY, SWEEP and SWEEPF are byte-identical to the surface
   this body shipped with, so the station integral is 1.748248 m2 to six
   decimals and the 2.0415 above and the 2.043 in js/efficiency.js stand.

   The built union moved and the module says by how much and why, because a
   number that moves without an explanation is how a ladder rots. It was
   1.764850 m2 above y 0.28 and it is 1.765336, plus 4.86 square
   centimeters or 0.028 percent. That is two effects with opposite signs.
   Sealing the two end caps is +8.81 cm2 on its own, measured by applying
   only that fix to the old mesh: the nose and Kamm faces were OPEN, and an
   integrator that unions z intervals was seeing through the holes. Every
   other change in the pass is -3.96 cm2, which is chamfered hardware
   corners, the door skins coming down onto the master surface from 3 mm
   proud, and the louver blades stopping where the skin stops. body-8's
   equivalent pass moved its union by -2.24 cm2, and it had already sealed
   its caps.

   Four defects were found by measuring rather than by reading, and all
   four are on the parts that own them: the end caps were open and showed
   the megacastings and the crash rails through 24.0 and 21.2 percent of
   each face; the louver bank was drawn inside the bodywork and returned
   under 2 percent of its own window to a ray; the intake gates metered a solid valance with
   nothing behind them at all; and the louver blades, being flat plates on
   a flank that tumbles inboard, stood 3.4 mm THROUGH the skin at their top
   edge. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';
import { mirrorZ } from './body.js';

/* The Gen 9 front corner, declared locally. P.wheelZ is NOT touched. */
const FRONTZ = 0.74;

export const SYSTEM = {
  id: 'body-9',
  name: 'Body · Gen 9 narrow front',
  color: 0xdcf2fb,
  explode: [0, 1.7, 0],
  blurb: 'Gen 8 proved a tail cannot move frontal area and named the part that could: the front fairings, holding 1.008 half-width around a tire that wheels-9 has now moved 70 mm inboard. This body deletes them as a shape. Stations 3 to 5 come to a flat 0.925, the beltline the cabin has carried since body-3, so the widest point of the car leaves the front axle and the bodywork measures 1.850 m against 2.016. Frontal area 2.157 to 2.0415 m2 on the Gen 8 audit convention, 0.022 short of the 2.02 the brief asked for and 0.015 better than wheels-9 predicted. Cd 0.108 to 0.107 for one named mechanism, a 20.7 degree fairing shoulder deleted. Contained lock is re-derived rather than carried and goes UP, 20.2 degrees against body-8\'s published 17.25 and its real 3.1, because the feature that bound body-8 was a louver in the wrong band rather than a surface. The afterbody is body-8 unchanged. 352 kg, 30 miles, and it found a 48.6 mm interference in the part it replaces.',
  /* THE CLOSURES, and on this rung they are not a style choice. This body
     deleted every panel break on the flank to buy one uninterrupted 5.15 m
     highlight line, and a hinge lives in exactly the step that deletion
     removed: body-8 had 83 mm of fairing step to hide one behind, holding
     1.008 half-width against this body's flat 0.925. So the aerodynamic win
     of Gen 9 is paid for in hinge kinematics, and the bill is measured.

     Put a conventional axis inside the skin at |z| 0.860 and the front
     door's leading edge ADVANCES 31.3 mm at 30 degrees, 44.5 at 45 and 57.8
     at 67, into the fixed fairing panel that owns the other half of its own
     shutline. Put it out at |z| 0.9250, the panel's own widest point, and
     the same edge withdraws instead. That is the whole specification, and it
     costs 8 to 40 mm more curbside to satisfy. Both doors therefore hinge on
     the surface rather than under it, which on a real car is a four-bar
     whose instantaneous center sits at or outboard of the skin through the
     first 20 degrees. */
  closures: {
    'door-front': {
      name: 'Front door',
      kind: 'door',
      part: 'doors',
      mass: 8.5,
      seconds: 1.2,
      seat: 'Hinge pillar at the x 0.8487 cut, axis on the skin at |z| 0.9250 rather than inside it',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [0.8487, 0.700, 0.9250], deg: 67 },
      ],
      why: 'The axis is outside the paint and that is forced rather than chosen. A door hinged inside its own skin sweeps its leading edge forward as it opens, and the only thing that ever made that acceptable is a step in the bodywork for the edge to disappear into. This body deleted the step: the flank is 0.925 flat from the A-pillar to the rear arch with nothing but a 5 mm channel in it. Measured at the axis a drawing would use, |z| 0.860, the edge advances 57.8 mm into the fairing panel at full open. Measured at 0.9250 it withdraws instead. The hinge that does this on a real car is a four-bar with its instantaneous center on or outboard of the surface for the first 20 degrees, which is the same hardware a flush-glazed coupe already uses to get its glass out of the seal before the door swings.',
      cost: [
        'A four-bar is two links, four bushings and a check strap per hinge against a butt hinge\'s one pin, and it is the part of the door that wears where a pin would not.',
        'The center stands outboard of the paint while the door is on the move, so the hardware is in the airflow at the one moment the seal is open. That is a wind noise path a butt hinge does not have.',
        'It buys nothing at all in curbside space, and costs 8 to 40 mm against the axis it replaces. What it buys is a door that can exist on this body at all.',
      ],
    },
    'door-rear': {
      name: 'Rear door',
      kind: 'door',
      part: 'doors',
      mass: 9.5,
      seconds: 1.2,
      seat: 'Coach hinge at the x -0.9411 cut, 110.5 mm ahead of the rear arch, axis on the skin at |z| 0.9250',
      motion: [
        { kind: 'swing', axis: [0, -1, 0], pivot: [-0.9411, 0.700, 0.9250], deg: 67 },
      ],
      why: 'Hinged at the back, which is what the rest of this body has already decided for it. A conventionally hinged rear door pivots on the B-pillar and drives its leading edge into the front door, 57.3 mm at full open on the same measurement that condemned the inboard axis. Hinging it the other way pins that edge: swept at every angle from 0 to 67 degrees the coach door\'s x minimum stays at -0.9411 exactly, because the hinge edge IS the trailing edge and it does not move. What the pair then opens is one 1.79 m aperture with no door edge in the middle of it, which is the ingress a car with a 0.925 flat flank and no fender step can actually offer.',
      cost: [
        'A coach pair has no door edge between the two leaves at the paint, so the side impact load path across that station is the cage tube behind the trim and the sill under it, and both have to be rated for it rather than assumed.',
        'The rear door cannot be opened before the front one and must not be closable after it. That is an interlock, and an interlock is a failure mode: it is the reason this arrangement is rare on cars that are not showing off.',
        'A rear-hinged door caught by a gust opens further rather than shutting, which is the argument that removed coach doors from mass production in the first place. The check strap is a safety part here, not a convenience one.',
      ],
    },
    hood: {
      name: 'Hood',
      kind: 'hood',
      part: 'skin',
      mass: 7,
      seconds: 1.5,
      seat: 'Rear cut at x 1.1282, planar to 0.33 mm; axis carried up to the crown at y 1.0560, so the hinge is a beam across the cowl rather than a box in each fender',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [1.1282, 1.0560, 0], deg: 65 },
      ],
      why: 'A hood is charged in height where a door is charged in width, and this one is charged in nothing else. The axis runs along +z, so no point on the panel changes its z at any angle, and the lateral excursion past the parked car is 0.0 mm at all 48 samples. Everything this lid costs, it costs overhead.\n\nTHE AXIS IS AT THE CROWN, AND THAT IS A MEASUREMENT RATHER THAN A PREFERENCE. Fore and aft it is free: the rear cut is planar in x to 0.33 mm, 1.1282 to 1.1286 across its whole 1.617 m width. What defeats a hinge here is camber, because the axis is a straight line and the cut it sits in is a curve. Measured along its own cut line the rear edge falls 172.7 mm, from y 1.0560 at the crown to 0.8832 at |z| 0.8094. Put the axis at the outboard ends, where every car with a hood puts its hinge boxes, and that crown stands 172.7 mm above the axis and sweeps aft as the panel lifts: swept against built geometry it is 0.567 mm into the fixed cowl deck at ONE degree of opening, 2.414 mm at 5 and 5.299 mm at 20. Note which partner that is. It is not the glass, which is 58.2 mm away and is the obstacle a drawing would worry about; it is the panel on the other side of this lid\'s own shutline, which is at zero distance and gets there nineteen degrees first. Put the axis at the crown instead and the rear edge is pinned: the panel\'s x minimum runs 1.1282 to 1.1267 over the whole travel, so the bonded joint back to the canopy keeps 56.7 of its 58.2 mm wide open.\n\nTHE FRONT EDGE ADVANCES 39 MM AND IT STILL CLEARS, WHICH IS A RATE ARGUMENT. A crown axis buys the pinned rear edge by swinging everything below the axis forward, and the leading edge hangs 296 mm below it. Measured, the panel reaches 4.9 mm past its closed x maximum at 1 degree, peaks 39.0 mm past at 15 and is back inside the closed outline by 30. It is advancing into a shutline 5 mm wide, so in plan that reads like a strike. It is not one, and the reason is the ratio: in the 5.0 mm the leading edge moves forward it also rises 19.1 mm, while the nose panel it is moving over falls away at 0.93 mm of height per millimeter of length. The edge gains about 4.7 mm of daylight for every millimeter it spends, and the sweep finds no contact at any sample.\n\nSIXTY FIVE DEGREES, AND FOR ONCE THE LIMIT IS THIS MODULE\'S OWN. Swept over both presets the panel is clean through 68 degrees against ten parts. At 69 it touches body-9/skin by 0.029 mm at (1.130, 1.059, 0.025), which is this panel\'s own rear lip, sitting a few millimeters off the axis, rotating across the shutline into the fixed cowl deck. That is the bill for a hinge line lying IN the paint rather than above it, and it is the same bill the doors on this body pay at the other end of the car, where the fix was to stand the axis outside the skin. Here it is cheap, because 68 degrees is more travel than a hood needs. It ships at 65 with three degrees in hand.',
      cost: [
        'The overhead is the whole bill and it is a big one. At 65 degrees the panel\'s top edge stands at y 1.9568 against a car measuring 1.429 m over everything, so the frunk needs 527.7 mm of clear air above the roof to open, and 578.8 mm on Gen 10 because wheels-10 sits the car down. A domestic garage door on its track is the constraint this hits first, and nothing about the panel can be traded to soften it: height is the only currency a +z hinge spends.',
        'An axis at the crown is not a pair of hinge boxes tucked into the fenders. It is a beam across the cowl on the centerline, or a pair of goose-necks tall enough to reach 172.7 mm above the fender line, and either one stands in the cowl plenum where a wiper drive, a fresh-air intake and the cross-car beam normally live. This module draws the panel and the axis; it does not draw that hardware, and the volume was never budgeted.',
        'What it opens is 91.8 liters of declared frunk, 340 by 300 by 900 mm, and thermal-9\'s heat pump is a solid 396 by 321 by 392 mm unit sitting in 36.3 of them. Forty percent of the hole this lid exists to reach is already a heat pump. The skateboard is supposed to free the nose; on this rung the thermal package has spent most of what it freed, which is a packaging verdict rather than a body one and belongs to thermal-9 as much as to this file.',
      ],
    },
    decklid: {
      name: 'Decklid',
      kind: 'decklid',
      part: 'tail-cone',
      mass: 6,
      seconds: 1.4,
      seat: 'Front cut at x -1.1600, axis carried up to the crown at y 1.2898; travel limited by interior-6\'s curtain rail, not by the lid',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [-1.1600, 1.2898, 0], deg: -26 },
      ],
      why: 'A lid over a crowned deck cannot hinge on one fixed axis, and this cut is the worst case on the car: measured across its own front line the camber is 220.9 mm, from y 1.0689 at the outboard ends to 1.2898 at the crown. Put the axis at the outboard ends, where a drawing would put it, and the crown of the leading edge swings AFT past the canopy\'s rear edge at x -1.100 by about 15 degrees. Put it at the crown, as this one does, and the leading edge is pinned instead. A real car resolves the rest with a four-bar; the geometry here does not get far enough to need one, for the reason below.\n\nTWENTY SIX DEGREES IS NOT THE LID\'S LIMIT, IT IS interior-6\'s. Swept, this panel strikes interior-6/restraints at about 32 degrees however it is hinged: with the crown axis, with the outboard axis, with 57 mm of compensating translation forward or aft, the answer moves by two degrees and never goes away. The obstruction is the curtain airbag rail, which runs from x -1.100 to -1.320 at y 1.132 to 1.192, directly across the aperture this lid opens. That rail is the same part interior-6\'s own comment admits "already stands outside body-8\'s roof loft by 98 mm" and calls a disagreement an interior generation owes. So the trunk opens 26 degrees with 8 parts swept clean around it, and the thirty-odd degrees missing belong to a module that is not this one.\n\nWhat it opens is the honest part. body-8 measured this tail at 1.498 m wide at x -2.15 with its lower edge at y 0.426, against body-7\'s 1.622 and 0.380, and called it a frunk and a shallow rear well rather than a wagon. Gen 9 does not touch the afterbody, so the well is body-8\'s and so is the verdict: this is the lid over a shallow well, not over a trunk.',
      cost: [
        'Twenty six degrees is a shallow lid. Loading anything tall means clearing a panel that is still most of the way over the opening, and the fix is not in this module: the curtain rail has to come inboard and down before this lid can have the other thirty degrees.',
        'The lid carries no glass and the tail carries no backlight, so a reversing camera and the sensor suite are the only rear vision on this car whether the lid is up or down. autonomy-4\'s rear unit sits on the fixed band behind the cut rather than on the lid, which is why it does not travel with it.',
        'It buys access to a well that body-8 already booked as poor: 1.498 m across at x -2.15 with the floor at y 0.426.',
      ],
    },
  },
  parts: {
    /* ── structure ────────────────────────────────────────────────────── */
    'front-casting': {
      name: 'Front megacasting',
      tagline: 'Eight generations without a drawing change, and then suspension-9 moved the shock tower 125 mm inboard.',
      mass: 45,
      specs: [
        ['Counterpart', 'body-8 front-casting, 48 kg: spars, mounts and open bay identical'],
        ['Process', 'High-pressure die cast, vacuum assist, 6,100 t lock'],
        ['Alloy', 'AlSi10MnMg, natural aging, no quench'],
        ['Tower pad', '(1.545, 0.745, +-0.430), was (1.65, 0.66, +-0.535)'],
        ['Receives', 'suspension-9 tower plate (1.50, 0.735, +-0.41), damper top 0.729'],
        ['Maturity', 'Production practice; new die, carried process and alloy'],
      ],
      how: 'The casting process is the Gen 1 part and is not reopened: AlSi10MnMg injected at 700 degrees C under partial vacuum, filling a 1.5 m part in under 100 milliseconds, reaching strength by natural aging because a casting this large would warp in the water quench a T6 treatment needs. The crash rails, the upper apron loads and the rocker fronts still gather here, it still stays elastic while the bolted rails ahead of it fold, and every suspension and drive mount is still machined in one fixture so the front axle geometry hangs off a single datum. The four subframe bushings stay exactly where suspension-4 put them, at (plus and minus 1.34 and 1.72, 0.30, plus and minus 0.50), because suspension-9 held that interface deliberately so this casting would not have to move a datum.\n\nOne feature moves and it was derived from the partner rather than agreed in prose. suspension-9\'s front strut translated inboard with its corner, so its top mount lands at (1.50, 0.72, plus and minus 0.41) and its air spring tower plate at (1.50, 0.735, plus and minus 0.41), both read off its built mesh. body-8\'s casting carried its tower boss at (1.65, 0.66, plus and minus 0.535), spanning |z| 0.460 to 0.610, which is 75 mm outboard of the plate that now has to land on it: a strut ending in air, which is the same class of defect body-8 found in body-7\'s C-pillar and the same class the standing rule about visual attachment exists to catch. The pad moves to (1.545, 0.745, plus and minus 0.430) and a rib carries it back onto the spar, routed outboard at |z| 0.485 to 0.555 because suspension-9\'s front air supply line passes (1.60, 0.56, plus and minus 0.43) on its way to the tower. Swept against the built partner, the tower plate now sits 17.5 mm inside the pad and the damper body, which tops out at y 0.729 on its own mesh rather than at the 0.720 its panel quotes, 11.5 mm inside it, so both terminate in casting rather than near it, and the only other suspension-9 hardware within 20 mm of the pad is the air supply line at 14.9 mm. That is where three kilograms come from, and the mechanism is worth stating because it is not obvious: a shock tower is a thick boss on a cantilevered apron arm, its section is set by the bending it takes from the strut, and moving it 125 mm inboard shortens the arm by the same 125 mm against an unchanged load. Less arm and less section for the same job. The reduction is real casting, not an accounting choice.\n\nThe cross portion between the spars is the one thing that changed, ladder-wide. It was a solid block filling x 1.760 to 2.070 over the full 280 mm section height, standing in the volume every thermal variant uses for its heat pump and its lines, and it is now a lower crossmember at x 2.000 to 2.070, y 0.300 to 0.370, with the bay above it open. Every hardpoint is where it was.',
      why: 'design/gen4.md lists the front suspension towers at y 0.72 to 0.75 near x 1.45, z plus and minus 0.55 as a binding hard point, and this generation changes it. The right way to change a hard point is to derive the new value from the partner that forced it, publish it once, and let everyone else read it from geometry: the new pad center is (1.545, 0.745, plus and minus 0.430), spanning x 1.445 to 1.645, y 0.7175 to 0.7725 and |z| 0.310 to 0.550, and the mating face it was drawn against is suspension-9\'s tower plate at (1.50, 0.735, plus and minus 0.41). The wrong way, which design/retro-gen4.md was written about, is to leave the hard-point table saying 0.55 and let the next module split the difference.',
      fail: [
        'A new die is a new porosity map: gas porosity is still the process risk, still controlled by vacuum level, still caught by X-ray sampling, and the fleet history of the old tool does not transfer to the new one.',
        'The tower pad is now 125 mm inboard of where the front upper load path has entered this casting since Gen 1, so the apron rib pattern is a fresh topology result rather than a proven one, and it is the item a body-in-white stiffness rig should measure first.',
        'Every steel bolt into aluminum is a galvanic couple; the cage is hot-stamped steel and lands here through the same adhesive-and-rivet isolation the Gen 1 cage used.',
        'The rail and cradle spar is drawn as a solid box and suspension hardware has shared its volume in every generation since Gen 4, most of it the front air supply line running about 260 mm through it between x 1.60 and 1.86. A real casting is a hollow ribbed shell and those are cored passages rather than interferences, but no drawing on either side shows a cored passage, and a measured overlap that everyone assumes is fine is exactly the kind of thing that turns out not to be.',
      ],
      explode: [0.85, -0.35, 0],
    },
    'rear-casting': {
      name: 'Rear megacasting',
      tagline: 'Carried from body-8 without a coordinate moving, including the 525 mm cantilever and the 451 Nm it takes.',
      mass: 50,
      specs: [
        ['Counterpart', 'body-8 rear-casting, 50 kg: identical in every coordinate'],
        ['Envelope', 'x -1.60 to -2.05 plus rails to -2.25, y 0.30 to 0.72'],
        ['Bond pad', 'Machined face at x -2.28, y 0.45 to 0.75, |z| up to 0.45'],
        ['Cantilever aft of the rails', '525 mm, carried; blade moment ~451 Nm'],
        ['Change this generation', 'None. Gen 9 touches nothing aft of x 0.850'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'One shot replacing 79 stamped pieces, thick spring-seat bosses fed by conformal die cooling so solidification stays even and hot tears stay out of the rib junctions, short bolted rails and a beam behind them that take the low-speed hits and unbolt for repair. It carries the rear drive cradle on three bushings and reacts the rear belt and seat anchor loads.\n\nThis panel exists to make the scope of the generation checkable, exactly as body-8 listed its front casting to prove it had not touched the nose. Gen 8 hung 525 mm of bonded carbon off the bolted rails at x -2.25 and handed the casting 451 Nm at full airbrake, up 19 percent on body-7. Gen 9 changes neither number, because it changes nothing behind the cowl. The one thing worth checking rather than assuming was whether a 140 mm narrower front track alters the rear load case, and it does not: yaw inertia, rear overhang and the blade station are all unmoved, and suspension-9 leaves the rear geometry at the |z| 0.74 centers wheels-7 set. The rear of this car is the Gen 8 rear on the Gen 8 hardware with the Gen 8 arithmetic.',
      why: 'A ladder earns credibility by knowing which inherited part is a constraint and which is merely inherited. Renumbering a 50 kg casting to make a generation look busier spends every proven rear pickup to buy nothing. The discipline has to be internal under an unlimited-resources premise, because nothing external says no, and the form it takes is a spec row that says the change this generation is none.',
      fail: [
        'Hot tearing at thick-to-thin transitions is still the casting defect that matters; CT scans on a sampling plan police it.',
        'A 525 mm bonded cantilever driven by a moving aerodynamic device is still the joint that finds out about cure-schedule drift five years later, and it is one generation older with no new data.',
        'Yield the casting and the shell is done, unchanged from Gen 1.',
      ],
      explode: [-0.85, -0.35, 0],
    },
    'crash-rails': {
      name: 'Crash rails and bumper beam',
      tagline: 'Carried, and now the reason the nose is not allowed to narrow: the beam already stands 14.9 mm outside the skin.',
      mass: 14,
      specs: [
        ['Counterpart', 'body-8 crash-rails, 14 kg: identical, rails on |z| 0.550'],
        ['Section', '90 x 90 mm octagonal, 3.0 mm wall, 6082-T6'],
        ['Mean crush force', '~120 kN per rail over 230 mm'],
        ['Beam', 'x 2.21 to 2.27, 1.30 m span, carried coordinates'],
        ['Coverage', '1.30 m of a 1.850 m body: 70 percent (body-8: 64 percent)'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'An octagonal extrusion with stamped trigger beads folds at near-constant force, and constant force is the design goal because energy is force times stroke: two rails at 120 kN over 0.23 m absorb about 55 kJ. The beam is curved in plan so partial-overlap hits load both rails. Everything is bolted against shear sleeves, so a moderate hit is a hand-tool repair with no jig.\n\nThe Gen 9 note is a constraint rather than a change, and it is the reason the nose stations are untouched. The beam\'s outboard corner sits at (2.27, 0.50, plus and minus 0.65). The nose loft at that point measures 0.6351 half-width, so the corner stands 14.9 mm outside the skin, a condition carried unexamined since body.js and re-measured here. Narrowing station 1 or station 2 to make the nose look like it belongs on a 1.850 m car would push that corner further out, and the beam cannot come in without shortening its span, which is a crash decision and not a styling one. So the nose holds and the panel says why. What genuinely improved is coverage: the same 1.30 m beam now spans 70 percent of a 1.850 m body where it spanned 64 percent of a 2.016 m one, and the corners of the car that a beam cannot reach are the fairing shoulders, which no longer exist.\n\nOne coordinate did move, ladder-wide, and it is not this generation\'s decision: the rails sit on |z| 0.550 rather than 0.420. A 90 mm section on 0.420 spans |z| 0.375 to 0.465 and every cooling core on the ladder reaches |z| 0.445, so the rail was drawn through 70 mm of tube bank on each side on every rung from Gen 1 to Gen 9. On 0.550 the section spans 0.505 to 0.595, clears the core by 60 mm and puts its outer wall in the same plane as the casting spar\'s outer wall. The beam is untouched at x 2.21 to 2.27.',
      why: 'Crash structure is a fuse hierarchy and the member that yields first must be the one ahead of the megacasting, because yielding the casting ends the shell. Nine generations have not reordered that and an aerodynamic generation is not allowed to. The useful work here was the negative result: a generation that narrows a car by 166 mm should check whether the crash package noticed, and this one checked, and the answer is that the beam is now the widest hard structure at the front and its relationship to the skin is a debt this body inherits rather than one it created.',
      fail: [
        'A small-overlap impact outboard of the rails bypasses them, and on this body there is no longer a frangible fairing sitting there to be sacrificed first: the flank at that station is now the flank, so a small-overlap strike loads bodywork that is structural rather than bodywork that is designed to disappear.',
        'Chloride sitting inside the closed section corrodes unseen; drain holes and internal wax are the countermeasure.',
        'Bent rails are replaced, never straightened: work-hardened folds have already spent their ductility.',
      ],
      explode: [0.95, -0.05, 0],
    },
    rockers: {
      name: 'Rocker beams',
      tagline: 'Unchanged, and promoted: with the fairing gone, the sill is what sets the widest point of the car.',
      mass: 22,
      specs: [
        ['Counterpart', 'body-8 rockers, 22 kg: identical'],
        ['Section', '100 x 70 mm, 8 chambers, outer face at |z| 0.915'],
        ['Span', 'x -1.01 to +1.01'],
        ['Design case', 'Side pole, 32 km/h, 254 mm diameter'],
        ['Skin cover', '10.0 mm under a 0.925 flank, was 10.0 mm, unchanged'],
        ['Maturity', 'Production practice, carried unchanged since Gen 1'],
      ],
      how: 'The side pole test sizes any EV sill: a rigid 254 mm pole at 32 km/h puts all of its energy into a hand-width of rocker. Eight extruded chambers crush in sequence from outboard in, each web adding a step to the force curve, absorbing the hit in about 70 mm of controlled collapse; whatever remains crosses battery-7\'s crossmembers to the far rocker. The 40 mm intrusion budget is a contract with the pack, not a body target.\n\nThe Gen 9 note is about status rather than section. This extrusion has always had its outer face at |z| 0.915, ten millimeters inside the 0.925 beltline, and for eight generations that was a detail because the front fairings stood 83 to 93 mm further out and owned the widest point of the car. They do not now. From y 0.32 to 0.42, which is exactly the rocker\'s own height band, the widest hard part of this car is this extrusion with 10 mm of skin over it, and the widest surface is the flank it sits behind. That makes the 10 mm cover a whole-car dimension rather than a local one: set a rocker 3 mm proud on this body and the print-through kink runs down the one continuous highlight line that now goes from the nose to the Kamm face without a fender break in it. Nothing about the part changed. What changed is that there is nothing standing in front of it any more.',
      why: 'The rocker is the seatbelt of the pack and its section was sized outward from the cell map, which is why it does not move when a body generation narrows the car around it. Recording the promotion is the useful work: the next generation that wants frontal area will find that the 0.925 beltline is the answer, and the first thing it will hit is this extrusion at 0.915 and interior-6 behind it. That is a cabin-width argument, and this panel is where it starts.',
      fail: [
        'Intrusion past 40 mm compromises the outer cell rows and totals the pack; the body repair is the smaller half of that event.',
        'The skin cover is now the tolerance that decides whether a 5.15 m highlight line is straight, and there is no shim path once the skin is bonded.',
        'A curb strike can crush inner chambers invisibly, and on this body a curb reaches the sill directly rather than meeting a frangible fairing first, so sill inspections after a curb strike move from advisable to scheduled.',
      ],
      explode: [0, -0.5, 0.3],
    },
    cage: {
      name: 'Low safety cage',
      tagline: 'body-7\'s cage with body-8\'s C-pillar repair, carried into Gen 9 without a node moving.',
      mass: 69,
      specs: [
        ['Counterpart', 'body-8 cage, 69 kg: identical, including the moved C-pillar'],
        ['Material', '22MnB5 hot stamped, 1,500 MPa after die quench'],
        ['Roof rails', 'y 1.296 to 1.300 at |z| 0.510, carried'],
        ['A-pillar rake', '58.9 degrees from vertical, carried'],
        ['Change this generation', 'None; the front track change reaches no cage node'],
        ['Maturity', 'Production practice, roof crush is the certified Gen 6 result'],
      ],
      how: 'Rails at y 1.296 to 1.300 and |z| 0.510 in a 56 mm tailored-blank section, A-pillars raked 58.9 degrees, B-pillars 110 mm shorter than the Gen 1 part, a third transverse bow at x -0.10 restoring the roof plate action that 105 mm of inboard rail movement took away, and the FMVSS 201 head pad whose inner face sits at |z| 0.467 with seven millimeters of air to the 95th percentile head shadow. body-8\'s C-pillar repair is carried in full: the rear node lands on the rear casting boss at (-1.70, 0.66, 0.535) instead of terminating in bonded skin.\n\nThe check this generation owed was whether narrowing the front of the car by 166 mm reaches any cage node, and it does not. The most forward cage member is the cowl beam at (0.99, 0.870, plus and minus 0.660), and the A-pillar foot at (0.99, 0.880, 0.660). The narrowest the flank gets anywhere near them is 0.925 at x 1.070 falling to 0.923 at 0.850, so the foot sits 260 mm inboard of the skin at its own height and the beam is unreachable by anything this module drew. Roof crush is the certified Gen 6 result on the Gen 6 load path and Gen 9 does nothing to it.',
      why: 'A cage is the one system on a car where carrying a part unchanged is worth more than improving it, because the certification attaches to the geometry and not to the drawing number. The only reason to touch it would be a load path that ended somewhere it should not, which is what body-8 found and fixed. This generation swept the nodes against the new loft for the same class of defect and found none, and the negative result belongs on the panel because a sweep that was not run is indistinguishable from a sweep that passed.',
      fail: [
        'Martensite does not tolerate straightening: damaged members are cut out and section-replaced, and the rails are tailored blanks, so a section repair must land on the correct thickness zone or the roof-crush result is not the certified one.',
        'The C-pillar node is a steel-to-aluminum couple at a place it did not use to be, one generation old, still an inspection point rather than a solved problem.',
        'Hydrogen picked up in the furnace can embrittle boron steel, and dew point control in the line is the quiet safeguard.',
      ],
      explode: [0, 0.36, 0],
    },

    /* ── shell ────────────────────────────────────────────────────────── */
    skin: {
      name: 'Gen 9 skin',
      tagline: 'The part that has to report the measured frontal area, which is 2.0415 against a brief that asked for 2.02.',
      mass: 46,
      specs: [
        ['Counterpart', 'body-8 skin, 47 kg: identical aft of x 0.850'],
        ['Construction', 'Thin-ply CFRP 1.1 mm, AFP laid, bonded to the carried cage'],
        ['Stations', '15 rings, x +2.375 to -2.775 (5.15 m); 3, 4 and 5 redrawn'],
        ['Panel joints', 'Hood x 2.220 to 1.130, decklid -1.160 to -2.320, 5 by 4 mm'],
        ['Silhouette above y 0.28', '1.7482 m2 (body-8: 1.8205 on the same integrator)'],
        ['Frontal area', '2.0415 m2 audit convention (body-8: 2.157), Cd 0.107 provisional'],
        ['Maturity', 'Skin pilot line; Cd 0.107 is an extrapolation, see fairings'],
      ],
      how: 'Every station from x 0.850 aft is body-8\'s to the fourth decimal: the maximum section at -0.450 still holds 0.925 half-width and a 1.360 crown, closure still begins at -1.100, the per-station equivalent-cone half-angles are still 8.1 / 10.8 / 14.9 / 14.8 / 14.7, and the base is still 0.550 by y 0.545 to 0.975. Stations 0, 1 and 2 are body-8\'s too. Three stations changed, all of them the fairing, and the panel below owns them.\n\nThe frontal-area arithmetic is this part\'s job and it is done with one integrator run over both bodies, which is design/retro-gen8.md\'s standing law after the Gen 7 area figure turned out to have been measured a different way from the Gen 8 one. The integrator is the station method: at each height take the maximum half-width over all fifteen stations, integrate in y above 0.28, double it. On body-8 it returns 1.8205 where body-8 published 1.8221, agreeing to 1.6 square centimeters, and it reproduces body-8\'s own beltline-cap experiment as -0.0649 against its published -0.0650. On this body it returns 1.7482. The other three terms of the audit convention are measured the same way on both: the sub-loft projection below y 0.28, which is the splitter and valance, the floor closeouts, the strakes and the deployed diffuser, is 0.1919 and is carried without a millimeter moving; the tire columns fall 0.1260 to 0.0868 because wheels-9 stands all four 155 sections in one shadow instead of two; and the protrusion term, which is camera pods, door skins and the glass band standing outside the station silhouette, falls 0.0362 to 0.0322 because the camera pods ride on a flank that came in 33 mm at their station. Three of those four land on the audit\'s own arithmetic: 1.8221 reproduced to 1.6 square centimeters, 0.1260 and 0.0868 exactly, and 0.1919 which is the audit\'s 0.173 of splitter and valance plus the 0.0189 of floor plates, strakes and diffuser it lists separately. The fourth does not, and the panel says so rather than tuning it: the audit\'s implied protrusion residual is 0.0186 against this integrator\'s 0.0362, because this one also counts the 8 mm and 3 mm offsets the glass band and the door skins are lofted at. Those are modeling offsets on carried parts and they are identical on both bodies, so only the delta is used, and the delta is -0.0041 measured one way over both. A is the audit\'s own 2.157 moved by -0.1155, which is 2.0415. The brief asked for 2.02 and this body is 0.022 short, and the reason is on the fairings panel: the front ran out of area before it ran out of geometry.\n\nThe geometry pass that put the shutlines and the panel gaps into this skin is a modeling change and it is reported as one. The station table and the four functions derived from it did not move a digit, so the 1.7482 above is unchanged and so is everything built on it. Two things about the BUILT mesh did move and both were defects rather than surface. The nose face was open: the end cap fanned an open ring without closing the sector across the bottom, so 24.0 percent of the nose window and 21.2 percent of the Kamm window looked straight through the bodywork at the megacastings and the crash rails, and closing the loop still left a 46 by 13 mm slot at the center of each face because the fan ended on a shrunken ring rather than on a point. Both faces now return 0.00 percent on the same 40,000-ray raster. And the door skins were lofted 3 mm proud of the surface; they are now cut from it, which is what the doors panel has claimed since body-7. Sealing the caps puts 8.81 square centimeters INTO the built union, because an integrator that unions z intervals had been measuring through the holes; everything else in the pass takes 3.96 out. The door offset is worth 0.41 cm2 of that, it is removed from body-8 by the same pass, and the two bodies carry the same cabin stations, so the frontal-area delta this panel rests on is unaffected.',
      why: 'Gen 8\'s lesson was that CdA is a product and an afterbody can only reach one term of it. Gen 9\'s lesson is the next one along and it is more uncomfortable, because it closes a door: with the fairing on the flank, capping every station forward of the cowl at the beltline now moves the integral by 0.0000 m2. There is no third body lever. From y 0.28 to 0.55 the silhouette is the beltline, which is the rockers at |z| 0.915 and interior-6\'s hip room behind them; from y 0.86 up it is the maximum-section ring, which is the Gen 6 roofline. Both are cabin decisions. The 0.022 m2 the brief still wants is 12 mm off the beltline per side, and 12 mm off the beltline is 24 mm of shoulder room, which is an interior generation\'s call and not a body generation\'s. Writing that down precisely is worth more than shaving the nose to make the number look closer.',
      fail: [
        'Thin-ply carbon takes barely visible impact damage: hail or a parking-garage knock can delaminate plies under paint that looks perfect, so ultrasound spot checks stay on the service schedule, carried from body-7.',
        'The hood leading edge still runs at 43 degrees because the nose is unchanged, so the pedestrian head-impact map is body-7\'s and is still an extrapolated rather than a certified result.',
        'Deleting the fender break makes the flank one uninterrupted 5.15 m highlight line with four shutlines in it, which is the hardest surface on the car to repair well: a bonded scarf repair anywhere on it is now judged against a reflection that runs the whole car with nothing to hide a step behind.',
      ],
      explode: [0, 0.62, 0],
    },
    'front-fairings': {
      name: 'Front wheel fairings',
      tagline: 'The generation, in one part: the pod stops being a pod and becomes the flank, and it takes a 48.6 mm interference out with it.',
      mass: 6,
      specs: [
        ['Counterpart', 'body-8 front-fairings, 11 kg: same function, new surface'],
        ['Max half-width', '0.925 flat, y 0.28 to 0.58 (body-8: 1.008 at y 0.42)'],
        ['Shoulder', '0.898 / 0.902 / 0.900 at y 0.76 / 0.78 / 0.80 (was 0.936 / 0.942 / 0.936)'],
        ['Clearance to the 14 deg swept solid', '32.4 mm (body-8: 38.5, one method over both)'],
        ['Contained lock', '20.2 deg, skin-bound (lip 21.1, louvers 21.2); commanded 14.0'],
        ['Maturity', 'Pilot line: enclosed steered wheels exist, not at this track'],
      ],
      how: 'The move is a subtraction rather than a redesign, because wheels-9 translated its corner rigidly: every value in its swept table is exactly 70.0 mm inboard of the same measurement on wheels-7. Sweeping its built front tire, wheel, cover and disc about the vertical axis through (1.45, 0.74) reproduces that table here: 0.8190 static at the cover lip, 0.8926 at 14 degrees, 0.9032 at 16, 0.9097 at 17.25, with the peak at hub height 306 mm fore and aft of the axle rather than at the axle itself, where the swept solid is only 0.8190 wide. Add suspension travel by sweeping the same solid vertically over the bump case and the requirement at y 0.58 rises from 0.8700 to 0.8865, which is wheels-9\'s own 50 mm band figure at y 0.50 read 80 mm higher, and it is the number the shoulder was drawn against.\n\nThe pod is therefore drawn at 0.925 flat from y 0.28 to 0.58 and 0.898 to 0.902 at the shoulder, and 0.925 is not a clearance number. It is the beltline: stations 8 and 9 have carried 0.925 since body-3 and stations 6 and 7 carry 0.922 to 0.924, so a fairing at 0.925 is not a fairing at all, it is the flank continuing forward. That is worth 0.0722 m2 of silhouette, which is 0.0066 more than body-8\'s own beltline-cap experiment predicted, because the cap held the shoulder at 0.925 and a redrawn shoulder goes under it to 0.900. What it costs is 6.1 mm of arch clearance, and that pair is one method run over both bodies rather than two numbers that happen to sit in the same sentence. The method is the three-dimensional minimum from the built swept solid at 14 degrees to the built pod skin: 32.4 mm here, 38.5 mm on body-8, both of them landing at the tire shoulder at hub height. An earlier pass of this panel reported body-8 at 45.4, which is its widest half-width of 1.008 at y 0.42 measured against a swept peak that occurs at y 0.355. Two heights is two methods, and design/retro-gen8.md was written about exactly that, so the number is corrected here rather than kept because it flattered the generation. That did NOT cost contained lock, and the reason is worth stating because wheels-9 predicted it would. Swept against this loft\'s built hardware the pod contains 20.2 degrees against a commanded 14.0, and the binding feature is the pod skin itself: the swept peak grows 5.2 mm per degree past 14, so it reaches the 0.925 flank 6.2 degrees later. The lower lip follows at 21.1 and the louver bank at 21.2. body-8 published 17.25, louver-bound, and its real contained lock was 3.1 degrees because of the lower-closeout foul below. wheels-9 called the 70 mm one currency, area or lock, because it measured the headroom against body-8\'s surface, and on body-8 the binding feature was a louver blade recessed 14 mm into the skin at y 0.500, which is a placement rather than a surface. Move the bank to the one band the steered envelope does not reach and the currency is not one: this body took the area AND three degrees of lock. What it cannot take is the turning circle, because suspension-9 carried the rack at 14 degrees, so 20.2 is contained headroom exactly as body-8\'s 17.25 was.\n\nThe hardware follows. The sealed inboard wall goes to |z| 0.630, which is FRONTZ minus 0.110 computed from this module\'s own constant and not from P.wheelZ, and its outer face at 0.637 stands 25.5 mm inboard of the tire\'s inner face at 0.6625, which is exactly the clearance body-8 held against wheels-7. The fore and aft closeouts stay at x 1.855 and 1.045, because the swept solid\'s x extent did not move: it spans 1.0917 to 1.8083 static and 1.0915 to 1.8085 at 14 degrees of lock, which is wheels-9\'s own published pair. And the lower closeout is redrawn, because body-8\'s is wrong. Its lip is a 100 mm flange at y 0.282 to 0.302 running from |z| 0.8945 to 0.9945, and sweeping wheels-7\'s own front corner against it shows the tire reaching it at 3.1 degrees of lock and standing 48.6 mm through it at the commanded 14. body-8 got the REAR lip right by setting it off a measured sweep table and got the front one wrong by setting it off the surface, and nobody caught it because the front pod\'s own hardware was never swept against the wheel it encloses. This lip is built the rear way: its inboard edge follows a sweep table measured at its own height band with an 18 mm standoff, so it is 77 mm deep at the axle and at the ends and narrows to 14 mm over the two swing peaks at x 1.15 and 1.75. Two numbers hold it, measured two ways and both stated. Against the sweep table it was drawn from, which takes the corner\'s maximum |z| anywhere in the y 0.24 to 0.34 band, it holds 17.9 mm at the commanded 14 degrees and runs out at 17.3. Against the built solid in three dimensions, at the height the lip actually occupies, it holds 41.8 mm static and 19.9 at 14 and does not bind until 21.1. The first is the drawing rule and the second is the geometry; the pod skin binds before either of them, so the lip is not what sets contained lock on this body, and the conservative table is left in place because a lip drawn off a band maximum cannot be surprised by a height it did not check.\n\nThe crispness pass added one feature to this lip and no dimensions. It was a single flat strip from its outer edge on the flank to its inner edge over the tire, which is a surface with nothing for a highlight to break on, and it is now two strips meeting at a knuckle 30 percent of the way in and 6 mm lower, creased so the fold reads. Both edges are exactly where they were, so the 18 mm standoff, the 77 and 14 mm depths and the 17.9 and 19.9 mm clearances above are all unchanged. It also shows its own screws now, four per side seated on the outer strip at |z| about 0.88: this is the part that has to come off to look at a tire, the module\'s own failure list says so, and a bonded-looking closeout that cannot be removed would contradict it. The heads point down, away from the panel they hold rather than into it, and the bank spans |z| 0.8908 to 0.9201, so the outermost of them is still 4.9 mm inside the 0.925 flank and none of them reaches the silhouette.\n\nThe pod\'s inboard wall now starts at y 0.545, and the 210 mm of it that used to hang below that is the aperture this panel has been asking for. The wall was a flat 800 by 400 mm sheet from y 0.335 to 0.735 at 14 mm off the tire\'s inner face, and everything that lives in a front corner passes through exactly that band: the brake disc tops out at y 0.5375 and the caliper at 0.5365, the front drive unit at 0.5420, and hv-4 runs its ring bus and its 48 V zonal trunk along the floor perimeter at y 0.302 to 0.433. Swept against every part of every other module on all ten presets, the sheet was fouling thirteen of them and the ring bus read 96.80 mm. Starting the wall above the moving hardware leaves three, and the deepest of those is suspension\'s front structure at 14.93 mm where the upper arm and the damper cross, which is a tower aperture this drawing still does not have. The pod\'s outer surface is untouched and the built silhouette is unchanged to the sixth decimal: the wall was never in the shadow.\n\nThe pod end closeouts lost 25 mm off their lower edge for the same reason, and it is the same 25 mm on all three bodies that carry this pod: they now start at y 0.370 rather than 0.345, which is 7.4 mm clear of the top of hv-4\'s 6 mm ring bus at y 0.3626.',
      why: 'body-8 wrote the twenty-two miles down and said the next body generation would find them. It found more, because it was allowed to redraw the shoulder as well as the width, and it found them in a shape that is better than a narrower pod: there is no pod. A blister on a flank pays twice, once in the frontal area it adds and once in the wake behind the shoulder where it closes back down, and body-8\'s shoulder closed at 20.7 degrees in plan on a car whose audit had just penalized the tail for 16.5 to 18.3. Deleting a part is the only aerodynamic change that cannot be partly wrong. What it costs is the option: the pod contains 20.2 degrees and not a degree more without growing back outboard, so the ceiling on this car\'s steering is now a body dimension rather than a tire one, and suspension-9 carried the rack at 14, so the 21.4 m turning circle is fixed for this rung whatever the pod would allow. That was the trade wheels-9 described as one currency, and this module spent it on area because area is what the brief asked for and because the module that could have spent it on lock chose to carry its rack.',
      fail: [
        'The wall is a flat sheet with a straight lower edge, and a real wheelhouse inner needs a shaped aperture for the upright and the damper rather than a horizontal cut: suspension\'s front structure still crosses it at 14.93 mm, and that is the part of this drawing the correction did not reach.',
        'Snow chains are geometrically impossible inside a closed fairing and there is now materially less room than there was: the arch is 70 mm further inboard and 6.1 mm tighter, so the winter-tire answer body-8 gave is now the only answer and the manual has to say so without hedging.',
        'The turning circle is frozen at 21.4 m curb to curb, because suspension-9 carried the rack at 14 degrees and a body cannot steer a car. This pod contains 20.2, so a rack opened to 15 would be free here and would return about 19.9 m on the relation body-8 used; the 16.9 m the tire itself allows still needs the fairing to grow back, and it would get the frontal-area bill in full.',
        'A punctured front tire still cannot be inspected without removing the lower closeout, and that closeout is now a variable-depth part whose inboard edge stands 18 mm off the swept envelope and only 14 mm proud of the flank at two stations, so refitting it wrong is a contact failure rather than a rattle.',
        'The sealed inboard wall is still a flat 14 mm panel at |z| 0.623 to 0.637, set as an offset from the wheel center rather than off a sweep, and it is still the part of this pod drawn least like the real one. The claim this note used to make about it was also wrong and is worth recording: it said the wall threads the 0.9 mm between the brake disc hat at 0.5985 and the friction ring at 0.6925 STATICALLY, and the cross-module sweep reads the static case at 47.50 mm into wheels-9\'s caliper and 9.07 mm into its disc. A z gap between two named features is not a clearance; the surfaces on either side of it were never measured. Raising the wall to start at y 0.545, above the disc at 0.5375, the caliper at 0.5365 and the drive unit at 0.5525, clears the static case at every station. The steered case is unchanged and is still a real defect: from about 6 degrees of lock the disc rotates into the wall footprint, and a flat panel with a horizontal lower edge cannot clear a corner that rotates about its own center.',
      ],
      explode: [0.35, -0.05, 0.95],
    },
    'tail-cone': {
      name: 'Closed boat tail',
      tagline: 'Carried from body-8 station for station, and this generation is what finally lets its CdA claim be spent.',
      mass: 12,
      specs: [
        ['Counterpart', 'body-8 tail-cone, 12 kg: identical in every coordinate'],
        ['Closure begins', 'x -1.100, max section at -0.450, carried'],
        ['Equivalent-cone half-angles', '8.1 / 10.8 / 14.9 / 14.8 / 14.7 deg, carried'],
        ['Base', '0.550 half-width, y 0.545 to 0.975, 0.3941 m2, carried'],
        ['Change this generation', 'None. The front owns this rung'],
        ['Maturity', 'Production practice: boat tails and Kamm truncation are old'],
      ],
      how: 'Nothing here moved. The flank runs 0.925 at x -1.100, then 0.880 at the rear axle, 0.866 at -1.780, 0.758, 0.654 and 0.550 at the Kamm face, with the crown falling 1.310 to 0.975 and the lower edge rising 0.28 to 0.545. The tightest arch station still holds 18.9 mm at the liner face against wheels-7\'s swept rear tire, and wheels-9 leaves the rear corner byte-identical to wheels-7, so that clearance is re-verified rather than re-derived. The flank still runs 17.6 degrees in plan on the last three stations and this module does not claim otherwise any more than body-8 did.\n\nWhat is new is what the tail is worth in a car that now has a front to match it. Gen 8 shipped a 0.105 claim that its audit corrected to 0.108, and most of the gap was the flank angle. The fairing shoulder this generation deleted was running 20.7 degrees in plan, four degrees WORSE than the tail flank the audit penalized, at the front of the car where the boundary layer is thin and the consequences of a separation propagate the whole length of the flank behind it. So the honest way to read this rung is not that the tail got better, because it did not, but that the tail was being asked to carry a body that separated 3.5 m ahead of it. One count is booked for the deletion and it is booked on the fairings panel, not here.\n\nTwo things about the built tail changed without a station moving. The Kamm face was OPEN, and that is worth stating plainly because it had been open on every body that used the helper: the end cap fanned a ring that runs from the flank\'s bottom edge over the crown to the other bottom edge without joining the last point to the first, so the sector across the bottom was never filled and 21.2 percent of the face was the rear megacasting seen through the bodywork. Closing the loop was not enough either, because the fan ended on a ring shrunk to five percent rather than on a point, leaving a 46 by 13 mm slot at dead center under the light band. Both are closed and the face returns 0.00 percent on a 40,000-ray raster that returned 21.2 before. And the marque is carried from body-8 at the same station and the same depth, which is a measurement rather than a style choice: the face is a cone from the ring outline to a near point, not a plane, so swept over the badge\'s 90 by 38 mm footprint on the BUILT cap the surface falls 2.61 mm, from x -2.76739 to -2.76478. A 4.4 mm extrusion with its back face at x -2.7642 puts the rim 1.2 to 3.8 mm proud everywhere and the back face 0.6 to 3.2 mm inside the panel everywhere. A 2.4 mm badge on the same surface would be half sunk into its own tailgate.',
      why: 'Gen 7 narrowed the rear track so the tail could close and took no credit. Gen 8 closed the tail and collected 58 miles. Gen 9 narrows the front and collects area rather than coefficient, and the pattern across the three is worth naming: each rung spent a geometric permission the rung before it created, and none of them could have been reordered. That is what makes it a ladder rather than a list, and the tail cone is the part that shows it, because it is the only major aerodynamic surface on this car that has now gone a full generation without a change and still has an open residual against it.',
      fail: [
        'The claim that this tail stays attached still rests on the equivalent cone rather than on the flank, and the flank is at 17.6 degrees; a moving-ground tunnel is still owed and is now owed on two bodies rather than one.',
        'A 525 mm bonded cantilever carrying an active blade is a fatigue structure whose load case is buffet, and the acceptance test is still a tunnel shake that has not been run.',
        'Trunk volume is unchanged and still poor: 1.498 m wide at x -2.15 with the lower edge at y 0.426. This is a frunk and a shallow rear well, and a narrower car does not make it better.',
      ],
      explode: [-1.45, 0.30, 0],
    },
    'rear-arch-closeouts': {
      name: 'Rear wheelhouse closeouts',
      tagline: 'Carried from body-8, and its 14 mm lower lip is the drawing method this generation had to copy at the front.',
      mass: 4,
      count: 2,
      specs: [
        ['Counterpart', 'body-8 rear-arch-closeouts, 4 kg: identical'],
        ['Liner', 'CFRP hoop at r 0.400 about the axle, |z| 0.715 to the flank'],
        ['Lower lip', '14 mm off the swept rear tire, measured 16.6 mm in 3D'],
        ['Radial clearance', '41.7 mm at every steer angle, carried'],
        ['Change this generation', 'None; wheels-9 leaves the rear corner untouched'],
        ['Maturity', 'Production practice: wheelhouse liners are universal'],
      ],
      how: 'A hoop of CFRP swept at radius 0.400 about the rear axle, 41.7 mm outside the tire\'s built outer diameter of 0.7166, running from just ahead of the tire over the crown to just behind it, spanning |z| 0.715 outboard to 6 mm inside the flank. Below the axle line it stops, because a wheelhouse closed underneath is a bucket. A lower lip runs along the flank\'s bottom edge from x -1.06 to -1.82 and turns inboard to sit 14 mm off the swept tire.\n\nThis panel is carried, and it is here because its method is what caught the front defect. body-8 drew this lip by tabulating the swept |z| of the built rear corner against distance from the axle and setting the lip inboard edge off that table, and it verified the result as a true three-dimensional minimum of 16.6 mm at (-1.757, 0.320). It drew the FRONT pod\'s lower closeout the other way, as a fixed 100 mm flange measured inward from the surface, and that flange sits in the steered tire\'s path from 3.1 degrees of lock. Same body, same generation, same author, one part right and one part wrong, and the difference is entirely which reference the drawing was hung off. The front lip in this module is now built the rear way.',
      why: 'A ladder where modules file defects against each other and have them closed by name is worth more than one where every module reports a win, and the same is true inside a module. The useful thing this panel does in Gen 9 is not to change but to be the counter-example: the correct method was already in the file, one function away from the part that got it wrong.',
      fail: [
        'A sealed-topped wheelhouse over a wheel that pumps air needs the pumping to go somewhere, and unlike the front pods there is still no louver bank here: the path is the open bottom.',
        'Stone impact from the tire is continuous and directly normal to the surface; this takes an elastomeric sacrificial coat rather than paint.',
        'The 14 mm lower-lip clearance assumes suspension-9 holds the rear-steer end stop it inherited, so the actuator end stop is a body-protecting component and belongs on the shared FMEA.',
      ],
      explode: [-0.45, -0.05, 1.15],
    },
    canopy: {
      name: 'Glass canopy band',
      tagline: 'Carried stack, carried span, and one corner that moved because the cowl side came in 36 mm with the fender.',
      mass: 21,
      specs: [
        ['Counterpart', 'body-8 canopy, 21 kg: identical stack and span'],
        ['Glazing', 'Chemically strengthened aluminosilicate, 1.1 + PVB + 0.7 mm'],
        ['Span', 'Cowl x 1.07 to x -1.100; backlight still deleted'],
        ['Roof band', 'Flat from |z| 0 to 0.55 at y 1.340 to 1.360, carried'],
        ['Forward corner', 'Lower edge at the cowl 0.9472 to 0.9108 half-width'],
        ['Maturity', 'Production practice for the glass; mirrorless is legal in most markets, not all'],
      ],
      how: 'The band is cut from the same loft stations as the skin and carries body-7\'s stack unchanged: a 1.1 mm ion-exchanged outer ply that resists the same stone strike as 2.1 mm of annealed soda-lime, a 0.7 mm inner, and an electrochromic interlayer that thermal-9 schedules between 20 and 1 percent transmittance. body-3\'s codified lesson is carried too, the near-flat roof band from the centerline out to |z| 0.55 at y 1.340 to 1.360, so the glass wraps the cage rails rather than dipping under them: rail top at 1.324 to 1.328 under a loft roof band at 1.336 to 1.339, eleven millimeters, unchanged.\n\nOne corner moves and it is a consequence rather than a decision. The band is lofted from ring 5 aft, and ring 5 is the cowl station at x 1.070 whose fender shoulder came from 0.936 to 0.900 half-width. The glass therefore starts 36 mm further inboard at its forward lower corner, 0.9108 against body-8\'s 0.9472, and runs into the unchanged 0.9037 at ring 6 instead of stepping down to it. The windshield base is 72 mm narrower across the car and the A-pillar feet at (0.99, 0.880, plus and minus 0.660) are unmoved, so the change is entirely in the glass, entirely at its lowest corner, and it removes a 36 mm step in the surface the glass was previously bonded across. Nothing in the stack, the span, the electrochromic schedule or the roof band changed, and the mass is identical because the area change is under a percent.',
      why: 'A monoform with a deleted backlight is a car that depends on its sensor suite for everything behind the B-pillar, and that was Gen 8\'s decision, taken because a doubly curved backlight on a surface contracting in plan and in height at once is a tolerance problem before it is a mass problem. Gen 9 does not reopen it. What is worth saying is that the forward corner moving is the only place in this whole generation where a front change reached a part that is not a front part, and it reached it through the loft rather than through an interface, which is why it was found by re-lofting rather than by anyone remembering to check.',
      fail: [
        'One deep chip still condemns the band and the replacement must re-index to the loft within half a millimeter, carried unimproved.',
        'A camera-only rear view fails differently from a mirror: a blinded lens is a blank screen, so the rear camera washer circuit is a safety item whose failure caps speed.',
        'This body and interior-6 still disagree by about 20 degrees of seatback at both rows and the rear belt towers still stand 98 mm outside the loft; a narrower front does nothing for either, and an interior generation owes both.',
      ],
      explode: [0, 1.05, 0],
    },
    doors: {
      name: 'Flush doors and camera pods',
      tagline: 'Carried skins on a flank that no longer has a fender break in it, and the pods came in 33 mm without being touched.',
      mass: 34,
      count: 4,
      specs: [
        ['Counterpart', 'body-8 doors, 34 kg: identical hardware and shutlines'],
        ['Skins', 'Thin-ply CFRP, the master loft itself, flushness +-0.25 mm'],
        ['Shutlines', 'x 0.850 / 0.060 / -0.940, cut 5 mm wide by 4 mm deep'],
        ['Camera pods', 'Outer face 0.9768 (body-8: 0.9966); car over pods 1.954 m'],
        ['Handles', 'None; capacitive strip and e-latch on hv-4\'s 48 V zonal bus'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Each skin is the master loft surface between two shutlines, hinges adjusted against the casting datum until a swept light line crosses all four doors without a kink, camera pods on 90 mm stalks feeding autonomy-4\'s surround model, e-latches on hv-4\'s corner zonal controllers as fused telemetered channels. The ingress bill is body-7\'s and unchanged: the header inner edge at the B-pillar is at y 1.264 and |z| 0.484, the aperture lost 94 mm of height to the Gen 6 cage, and you sit onto the sill and swing your legs in.\n\nThe shutlines are geometry now and the published trio is corrected rather than carried. body-7 wrote x 1.06 / 0.06 / -0.94 and every body since repeated it, and the first of the three was wrong: x 1.06 sits on an enclosed wheel pod, 15 mm behind this module\'s own wheelhouse aft closeout, and a door leading edge cannot wrap over a wheel enclosure and still swing. body-8 caught it and moved the cut to its blend-out station; this body measures the same three joints against its own partners and lands in the same places, which matters because from x 0.850 aft the two bodies are the same surface and two bodies that share a surface must not disagree about where a door opens. Forward cut x 0.850: the fairing-to-cabin panel joint, 187 mm behind the wheelhouse wall at x 1.037, 242 mm behind wheels-9\'s rearmost front-tire vertex at 1.0917, 29.6 mm behind interior-6\'s dashboard outboard end at 0.8796, and 140 mm behind the cage A-pillar foot at 0.99 that carries the hinges. Middle cut x 0.060: 14 mm behind the cage B-pillar\'s aft face, the pillar being a 26 mm tube on x 0.020, and 31 mm behind interior-6\'s front seat backrest at 0.0910. Rear cut x -0.940: 110.5 mm ahead of the rear wheelhouse closeout at -1.0505 and 70 mm ahead of the rocker\'s rear end at -1.010. One number does not clear and it is stated rather than buried: interior-6\'s rear bench cushion reaches x -1.035, so its trailing 95 mm sits behind the aperture. Every cut is a real recessed channel, 5 mm wide and 4 mm deep with two walls at about 71 degrees, measured on the built flank at y 0.700 as 4.03, 4.17 and 4.08 mm, and each runs from the rocker top at y 0.420 up to the beltline seam. The door does not own the sill below its own cut: that is the outer face of a 2.02 m extrusion whose section battery-7 specified, and it stays with the skin.\n\nTwo things moved without anyone drawing them and both are consequences of the loft. The camera pods are placed off the surface at x 0.98, and x 0.98 is interpolated between the cowl station at 1.070 and the blend-out station at 0.850, so when the cowl shoulder came in the pods came with it: their outer face is at |z| 0.9768 against body-8\'s 0.9966, so the car measures 1.954 m over the pods against 2.016 over body-8\'s fairing. That matters twice, and the second time it is awkward. It is 41 square centimeters off the protrusion term in the frontal-area integral, which is real. But on body-8 these pods stood 11.5 mm INSIDE the widest bodywork and on this car they stand 51.8 mm outside it, so the honest width of this car is 1.954 m and not the 1.850 m of its bodywork. A camera monitor system is excluded from width in most markets that allow it at all, which is the same qualifier body-6 attached to deleting the mirrors, and it is quoted again here rather than allowed to make a number look better than it is. The second is the door skins themselves, which were lofted 3 mm proud of the surface rather than cut from it. They are cut from it now, which removes a 3 mm step this part never intended and takes 0.41 square centimeters out of the built silhouette; body-8 corrected the same offset in the same pass, and the two bodies carry identical cabin stations, so nothing in the frontal-area comparison moves.',
      why: 'Doors are where a monoform admits people exist and the Gen 3 settlement holds: spend the tolerance budget on flushness, let the gap be what the seals need. What Gen 9 adds is a harder version of the same problem. body-8 could hide a flushness error at the front shutline behind a fender break, because the fairing stood 83 mm proud and the eye read the step as intentional. This body has no break: one surface runs from the nose to the Kamm face and every one of the four joints is on it. The quarter millimeter was a specification before and it is a requirement now.',
      fail: [
        'E-latches keep their legally required mechanical release, exercised at every service because nobody touches it until the day it matters.',
        'A 948 mm aperture diagonal makes child-seat installation genuinely harder; the ISOFIX bars are unmoved but the arm reach is worse.',
        'Seal compression set still returns as a whistle at exactly the speed you drive daily; EPDM chemistry has ignored six design briefs in a row.',
      ],
      explode: [0.08, 0, 0.85],
    },
    lightbands: {
      name: 'Light bands',
      tagline: 'Both bands carried to the millimeter, and the front one is the reason the nose stations could not move either.',
      mass: 4,
      count: 2,
      specs: [
        ['Counterpart', 'body-8 lightbands, 4 kg: identical'],
        ['Front', '2 x 84-pixel matrix + autonomy-4 lidar windows at z +-0.30'],
        ['Held coordinates', 'Front band face x 2.371, y 0.615, half-width 0.43'],
        ['Rear', 'PMMA guide across the Kamm face at x -2.771, 1.00 m'],
        ['Kamm face', '1.10 m wide by 430 mm tall, carried'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The front band is carried without a change to a single coordinate and that is a contract rather than a convenience. autonomy-4 mounts its flash lidar pucks at (2.33, 0.615, plus and minus 0.30) and its thermal camera at (2.345, 0.53, 0), all written against a band face at x 2.371, y 0.615, half-width 0.43. The loft at that station carries 0.490 half-width at y 0.61, so the band sits inside the surface with 60 mm to spare on each side, and every one of the three sensor points lands.\n\nThis is the third of the three reasons the nose did not narrow, and it is the least negotiable. design/retro-gen4.md\'s rule after the first drift bug was to move geometry around an interface rather than moving the interface, and there are three autonomy-4 mounting points inside a 0.86 m band on a face 0.98 m wide. Taking 40 mm per side off station 0 to make the nose look proportionate on a 1.850 m car would put the outer pixels of the matrix inside 20 mm of a surface edge, and there is no version of that which does not end with autonomy-4 re-siting its lidar in a generation that was supposed to be about the fairings. The rear band is carried unchanged for the simple reason that the rear of this car is unchanged.',
      why: 'A monoform leaves nowhere else for light to live and nowhere better for a lidar: the front face is the one flat, forward, washable, heated surface on the car, sitting in the stagnation region where a window costs no drag. On this body it is also the last piece of the front that is still exactly where body-6 put it, and there is value in a generation being able to point at something and say the interface held.',
      fail: [
        'One part per face: a parking tap costs the whole band, and at the front possibly a lidar recalibration with it.',
        'Base suction still films the rear band with road dirt; the wash cycle stays a safety schedule.',
        'A stone star in the shared front window sits in the lidar aperture long before it bothers the human eye; the perception stack detects the scatter signature and books the glass.',
      ],
      explode: [1.15, 0.1, 0],
    },
    'kamm-flap': {
      name: 'Deployable Kamm spoiler',
      tagline: 'Carried whole, and the one number that moved is the one it works against: a smaller car in front of the same base.',
      mass: 6,
      specs: [
        ['Counterpart', 'body-8 kamm-flap, 6 kg: identical blade, drives and logic'],
        ['Blade', 'Carbon, 1.02 m span, 200 mm chord, drawn deployed'],
        ['Travel', 'Flush to 78 mm proud, continuous; full-up airbrake'],
        ['Airbrake download', '~365 N at 130 km/h, carried'],
        ['Worth', '~2.5 counts on the attached base body-8 built for it'],
        ['Maturity', 'Production practice: multi-position wings have shipped for decades'],
      ],
      how: 'Mechanism, actuation, control logic and fail position are carried without a drawing change: two 48 V spindle drives on fused channels from hv-4\'s rear corner zonal controllers, continuous travel from flush to 78 mm proud, a spring return to flush because a spoiler that fails should cost counts and never control, stow below 80 km/h to restore the certified pedestrian geometry, and full-up in half a second on a hard brake-by-wire demand.\n\nThe Gen 9 check was whether a narrower front changes what this blade does, and the answer is a qualified no with one honest caveat. The base it works on is unchanged at 0.3941 m2, the deck it stands on is unchanged, the span is unchanged, and the download is unchanged at about 365 N. What is different is upstream: the car ahead of this blade is 166 mm narrower and no longer has a separated fender shoulder feeding a thickened boundary layer down the flank. A cleaner flank means a slightly thinner boundary layer arriving at the base, which makes the truncation behave slightly more like the attached case body-8 designed for and slightly less like the one it measured. That is a real effect and it is worth exactly nothing on this panel, because the size of it is a tunnel result and this module does not have one. It is written down so that when the audit runs, the question is already framed.',
      why: 'A fixed truncation pays average-case drag every hour; a blade with travel buys the best case at speed, the legal case in town, and free download in the one maneuver where drag is an asset. Carrying it verbatim into a front generation is correct, and the interesting discipline is refusing to book the upstream improvement. Gen 8 got caught out in the opposite direction on its diffuser, where the first pass debited half a count for an effect that measurement showed went the other way, and the lesson from that is to price what can be measured and name what cannot.',
      fail: [
        'Ice can lock the blade flush; the cold-start sweep detects the torque spike, leaves it stowed, and the range estimate explains the missing counts.',
        'Stuck deployed is the bad direction: an uncertified geometry below 80 km/h, so a second independent spring release drops the blade.',
        'The blade still sits on a 525 mm bonded cantilever rather than a cast deck, and the couple it hands the casting is still 451 Nm.',
      ],
      explode: [-0.9, 0.55, 0],
    },
    'diffuser-flap': {
      name: 'Deployable diffuser flap',
      tagline: 'Carried without a coordinate moving, and it is 0.0132 m2 of the frontal area this generation could not touch.',
      mass: 5,
      specs: [
        ['Counterpart', 'body-8 diffuser-flap, 5 kg: identical'],
        ['Ramp', '0.78 m hinged at x -2.000, drawn at 18.0 degrees'],
        ['Span', '1.16 m at the hinge to 0.90 m at the exit'],
        ['Exit area', '0.217 m2 on the ladder\'s measure, carried'],
        ['Frontal area held', '0.0132 m2 below y 0.28, inside the carried 0.1919'],
        ['Maturity', 'Production practice: active diffuser flaps ship in limited series'],
      ],
      how: 'The control law is carried: pressure taps along the ramp plus suspension-9\'s ride-height signal trim the angle back the moment the expansion approaches separation, in yaw, in crosswind or over a crest, and a spring holds 13 degrees whenever power or control is in doubt, because at 13 a diffuser cannot stall, it merely earns less. Two 48 V drives on hv-4\'s rear zonal channels. The hinge is at x -2.000, clear of P.driveR and of drivetrain-7 whose rearmost vertex is at -1.730.\n\nThis panel appears in a front generation for one reason: it is a frontal-area item and it is one this module could not move. The audit convention counts everything below y 0.28 as real projected blockage rather than silhouette, because the underbody is open between the floor and the tires, and this deployed ramp contributes 0.0132 m2 of the 0.1919 the sub-loft term carries. Shrinking it would mean either standing the ramp shallower, which costs about six counts of the credit it earns, or narrowing the exit span, which body-8 already showed to be the wrong lever because the exit area is span times rise and the rise is what the ramp length bought. So it is measured, reported, and left alone. The same is true of the 0.173 m2 of splitter and valance and the floor plates behind them: the sub-loft term is a floor argument, the floor is carried, and a front generation that reached under the car to find area would be doing a different generation\'s work badly.',
      why: 'The underbody exhaust is the last big account on the drag ledger and its optimum angle moves with speed, height and yaw, so fixing the ramp means buying the safest angle forever. What this generation adds is the accounting: 2.0415 m2 of frontal area is 1.7482 of body above y 0.28, 0.1919 of underbody hardware, 0.0868 of tire and the rest protrusions, and the second of those four is now 9.4 percent of the total and rising as a share, because it is the only one nobody has attacked. That is the next generation\'s sentence, written here.',
      fail: [
        'An iced or mud-blinded pressure tap forfeits the steep regime: control falls back to 13 degrees and the range estimate quietly loses the difference.',
        'The departure angle is 15.9 degrees from the rear contact patch and the rear overhang is 1.325 m, so angled bays are still a curb-strike geometry.',
        'Deep snow packs the expansion and the diffuser becomes a plow; rated for the load, parked at 13 by the controller, still beyond the drag model\'s vocabulary.',
      ],
      explode: [-1.0, -0.4, 0],
    },
    'arch-louvers': {
      name: 'Active arch louvers',
      tagline: 'Same blades, same actuators, moved 130 mm up the fender because body-8 said this bank would be what binds next.',
      mass: 3,
      count: 2,
      specs: [
        ['Counterpart', 'body-8 arch-louvers, 3 kg: identical hardware, new stations'],
        ['Blades', '4 outlet + 3 inlet per side, one 48 V rotary actuator each bank'],
        ['Station', 'y 0.630 (body-8: 0.500); actuator bosses y 0.720 (was 0.600)'],
        ['Bank |z|', '0.8750 to 0.9158, in real apertures with a 14 mm returned rim'],
        ['Binds lock at', '21.2 deg re-derived, not carried: body-8 bank bound at 17.7'],
        ['Fail position', 'Spring open, venting the fairing'],
        ['Maturity', 'Pilot line at the fairing; the shutter mechanism is production'],
      ],
      how: 'The blades, the pivots, the single 48 V rotary actuator per bank, the eFuse current signature used as a position sensor and the cold-start sweep are body-7\'s hardware carried through two generations without a drawing change. Three blades forward admit and four aft exhaust, and the front fairing is still a sealed pod around a wheel that pumps air, so these two banks are still its only inlet and outlet.\n\nWhat moved is the height, and body-8 predicted this in writing: it recorded that the louvers rather than the pod skin were what bound the contained lock, that the bank spans |z| 0.9569 to 0.9986 with the recessed 0.9569 end touching first, and that a later generation narrowing the fairing would have to move this bank and re-derive the number rather than carry it. Sweeping wheels-9\'s corner against a bank left at y 0.500 on the new surface shows why. At that height the swept solid runs to 0.890 at 14 degrees across x 1.12 to 1.24, and a blade recessed body-8\'s 14 mm into a 0.925 flank presents its outer corner at about 0.8955, which is five millimeters of gap at the lock the rack already commands. The bank therefore moves up 130 mm to y 0.630, into the one band of the new pod the steered envelope does not reach: at 14 degrees the solid falls to 0.869 there and at 17.25 to 0.881, against a blade face at 0.891. The actuator bosses follow to y 0.720. Nothing about the hardware changed, the pitch is body-7\'s 62 mm, and the flow path is shorter because the exhaust now sits above the tire crown rather than beside it.\n\nThe bank now has a hole in front of it, which it did not on any body that carried it, and finding that out took a ray and not an argument. Every blade on every generation of this part has been drawn at the flank\'s half-width minus 14 mm with no aperture cut, which is to say inside the bodywork. Rastered at normal incidence over each bank window on the built mesh, over x 1.05 to 1.34 and 1.56 to 1.83 by y 0.55 to 0.72, 98.2 and 98.4 percent of the rays landed on fairing skin and the blades themselves returned 1.8 and 1.6 percent, all of it at the panel edge. A sealed pod whose only inlet and outlet you cannot see is a sealed pod. Each bank now stands in a real hole cut on grid lines the subdivision already had, x 1.070 to 1.323 aft and 1.573 to 1.820 forward, from y 0.580 up to the loft\'s own next ring line at about y 0.647, with a rim returned 14 mm inboard along the surface normal so the cut has a thickness and a lit lip. The same raster, run over both meshes with wheels-9 and thermal-9 in the scene so the two runs are one method, now returns 22.1 and 16.5 percent blade, 72.4 and 75.4 percent rim and skin, and 5.5 and 8.1 percent the tire behind, which is what looking into a wheelhouse vent should give.\n\nCutting the hole found the second defect immediately. A blade is a flat plate at constant |z| and this flank tumbles inboard above y 0.580, so a 100 mm blade centered on y 0.630 leaves the surface it is recessed into: measured on the built mesh, every blade\'s top corner stood about 3.4 mm THROUGH the skin at y 0.680. Solid paint hid it. Each blade is now sized off the surface, its top set where the loft is still wide enough to contain the rotated corner with 1.5 mm to spare, which is about 60 mm of blade in a 67 mm window and leaves the rim\'s top wall showing above it. The bank\'s |z| span is untouched at 0.8750 to 0.9158, so every clearance and every lock figure on this panel still holds.',
      why: 'An arch is an air pump whose duty varies a hundred to one between a summer cruise and a mountain descent, and enclosing it does not delete the pump, it removes its accidental relief. Reusing hardware with fleet hours in a new place beats inventing a fairing-specific mechanism, and it is doubly right here because the reason for moving is geometric rather than functional: the part is correct and its station is not. The wider point is that body-8 wrote the instruction for its successor into the panel of the part that would need it, and that is why this took a sweep and an afternoon rather than a defect report from wheels-9.',
      fail: [
        'Grit and ice in the pivots is the chronic case; the cold-start sweep catches a stiff bank and leaves it open, costing counts, never cooling.',
        'Moving the exhaust above the tire crown puts it closer to the hood shutline, so a bank stuck open at speed now feeds warm arch air along the base of the windshield rather than down the flank, which is a wiper-icing question nobody has asked and this module cannot answer.',
        'Sealing a pod around a wheel means water goes in and has to come out, and the drain path is 70 mm further inboard and 6.1 mm tighter than it was; a blocked drain still turns the fairing into a bucket at the worst possible radius.',
      ],
      explode: [0.4, -0.05, 1.3],
    },
    'venturi-floor': {
      name: 'Sealed venturi underbody',
      tagline: 'Carried panel for panel, and now the largest single frontal-area term nobody has attacked.',
      mass: 9,
      specs: [
        ['Counterpart', 'body-8 venturi-floor, 9 kg: identical'],
        ['Panels', 'Carbon closeouts, lip to pack and pack to the hinge at x -2.000'],
        ['Ground gap', '110 mm at the lip; suspension-9 holds it +-3 mm at speed'],
        ['Splitter', '1.02 m wide, carried'],
        ['Frontal area held', '0.1787 m2 of the 0.1919 sub-loft term'],
        ['Maturity', 'Production practice: sealed floors universal, tunnels in series'],
      ],
      how: 'Carried from body-8 without a panel changing: a carbon lip at a 110 mm gap, a valance behind it so the splitter bolts to something rather than floating, a front closeout bridging to battery-7\'s pack leading edge, the pack underside running to x -1.30, a rear closeout bridging to the diffuser hinge, and strakes dividing the rear run into twin tunnels so a yawed crosswind stalls one side while the other keeps pulling. suspension-9\'s air springs hold the speed-scheduled ride height to a few millimeters and cross-check its height sensors against the flap\'s pressure taps.\n\nThe Gen 9 measurement on this part is its share of the frontal area, and it has quietly become the biggest thing left. Below y 0.28 the audit convention counts real projected blockage, and this floor contributes 0.1787 m2 of it: the valance and splitter across y 0.128 to 0.28 at just over a meter wide, plus the two 1.24 m closeout plates and the strakes standing in their own shadow. Add the diffuser at 0.0132 and the sub-loft term is 0.1919, which is 9.4 percent of a 2.0415 m2 car. For comparison, the tire columns wheels-9 just spent a whole generation halving are 0.0868. What kept this term untouched is that it is genuinely load-bearing aerodynamically: the splitter creates the stagnation region that feeds the tunnels, body-8 already flagged the tunnel inlets as the yaw-sensitive item, and narrowing the valance to buy area would starve the device that earns six counts at the other end of the car. It is reported rather than taken, which is the same answer body-8 gave and a better-supported one now that the number has a share attached to it.',
      why: 'The underbody is the largest surface on the car and the only one the pack already paid to flatten, so sealing it and shaping it into tunnels remains the highest-value aero purchase at this Cd. Carrying it verbatim is correct for a front generation: nothing this module drew is under the car. The pattern worth naming is that three consecutive generations have now looked at this floor and left it alone for three different good reasons, which usually means the fourth one should look harder.\n\nOne panel of it did change and it is a hole rather than a shape. The valance is written as its two interpolants rather than as a table, so the surface outside the cut is the same surface to the last decimal, station kink at y 0.280 included; what is new is the 0.532 by 0.146 m aperture the intake gates have needed since body-7 and the throat behind it. None of it touches the frontal area: the whole valance sits inside a flank shadow more than 400 mm wider than itself at every height it occupies, so the integral cannot see it, which is also why the aperture buys nothing and the gates panel says so. The splitter now shows its four fixings on its top face at y 0.136, which is the plate\'s real seating face rather than the mid plane, and the strakes show two each on the ramp\'s own rotation.',
      fail: [
        'Curbs and ramps still rake the lip first; the shear-away fasteners cost a bracket, carried through six generations.',
        'A narrow splitter feeds a narrow stagnation region into the tunnels, so the crosswind case is still the one the tunnel program should re-run first, unchanged and still outstanding from body-7.',
        'Deep snow packs the tunnels and the floor becomes a plow; structurally rated, aerodynamically dead, still beyond the range model\'s vocabulary.',
      ],
      explode: [0, -0.55, 0],
    },
    'intake-gates': {
      name: 'Intake gates',
      tagline: 'The one nose change: the aperture body-8 measured as oversized and named as owed to a front generation.',
      mass: 2,
      specs: [
        ['Counterpart', 'body-8 intake-gates, 3 kg: same bank, 240 mm less span'],
        ['Bank', '4 slats, 0.56 m span (body-8: 0.80), one 48 V actuator'],
        ['Aperture', '0.532 by 0.146 m cut in the valance, ducted to a mouth at x 2.215'],
        ['Feeds', 'thermal-9\'s stack in the untouched front zone x 2.08 to 2.26'],
        ['Sizing case', 'battery-7 charge peak + drivetrain-7 at 260 kW, not battery-6 at 480'],
        ['Fail position', 'Spring open: cooling beats drag, the Gen 2 law'],
        ['Maturity', 'Production practice since the 2010s'],
      ],
      how: 'A four-slat bank below the nose face metering the only air admitted through the body, ducted to thermal-9\'s radiator stack in the front zone this ladder has never moved. The thermal controller owns the position request, the aero controller is granted closure only when every thermal margin is green, and the spring fails the bank open because a stuck-shut gate on a mountain climb cooks hardware while a stuck-open one costs a count.\n\nThe span comes down 240 mm and the argument is body-8\'s, quoted and then acted on. It wrote that the bank was sized stationary on battery-6 rejecting a 480 kW fast-charge peak through the stack with no ram air, that Gen 7 replaced that pack with battery-7 at a much lower C rate by design and drivetrain-6\'s 480 kW with drivetrain-7\'s 260, that thermal-7 followed both down, and that the aperture is therefore oversized for the worst hour it is now asked to cover by a wide margin. It also wrote the reason it did not act: narrowing the nose aperture is a nose change and Gen 8 ended at x -1.100. This is the generation that owns the nose, so it takes it. Two things are stated plainly rather than glossed. First, this buys no frontal area at all: the bank sits on the valance inside a 1.004 m half-width shadow, so its own width is invisible to the integral, and the return is duct loss, mass and the aperture\'s contribution to nose pressure recovery. Second, thermal-9 is being drawn in this same generation and it owns the real sizing case; a 0.56 m bank is derived from thermal-7\'s rejection and body-8\'s measurement, and if thermal-9\'s heat pump wants more air on a hot-day pulldown then this slat count is wrong and thermal-9 gets to say so. The fail-open spring means the direction of that error is safe.\n\nThere is now something behind the bank, and until this pass there was not. This part has claimed since body-7 that it meters the only air admitted through the body, and the valance behind it was a continuous panel: rastered dead ahead over the bank window at z plus and minus 0.30 by y 0.19 to 0.39, 88.2 percent of the rays hit the slats and every single one of the other 11.8 percent hit valance carbon. Nothing was reachable behind the gates because nothing was there, and a duct behind a solid panel is a decal with a triangle budget. The valance is now built in four pieces around a 0.532 by 0.146 m aperture, sized so a 0.560 m slat bank still covers it from straight ahead with 14 mm of overlap at each edge, with the rim carried back as a closed-loop throat to a mouth at x 2.215, which is 6.0 mm ahead of thermal-9\'s forwardmost vertex measured off its built mesh at x 2.2090 on the outdoor coil. The floor of the throat rises to y 0.256 on the way, because that is where the coil face starts and a duct whose exit sits below its heat exchanger is a longer hole. A 21 by 5 bar lattice sits 18 mm behind the valance skin, sized 0.560 by 0.186 so it overlaps every edge of the hole and no oblique view finds a way round the bars. The same raster over both meshes returns 88.3 percent gates, 9.3 percent valance, 1.1 percent thermal-9\'s coil face seen through the throat, 0.7 percent the front megacasting behind it, and 0.6 percent finding a path between the coil\'s own fins and out of the car. Before the aperture every one of those last three was 0.0. The 0.6 percent is thermal-9\'s core geometry rather than this aperture, and it is left as measured.',
      why: 'A fixed intake is sized for the worst hour and paid for every other hour, and the worst hour moved off the road when charging power passed driving power. Metering the opening per minute is what keeps the sealed-nose fiction honest. The reason to act on this rather than write it down again is that body-8 already wrote it down, and a note that survives two generations without being either taken or refused has stopped being a finding and started being furniture.',
      fail: [
        'Road grit and ice jam slat pivots; the cold-start sweep reports a stiff bank before the highway or the charger does.',
        'Stuck shut is the dangerous direction: thermal-9 sheds load, tapers power, and the car explains why, and with 30 percent less aperture the margin between shedding and not shedding is smaller than it was.',
        'The sizing case is inherited from a partner drawn in the same generation rather than measured against a shipped one, which makes this the least well founded number in this module and the first one an integrator should challenge.',
      ],
      explode: [1.3, -0.08, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   15 loft stations, x +2.375 to -2.775 (5.15 m), 7 half-profile pairs plus a
   crown per ring, so 15 points per ring. STATIONS 3, 4 AND 5 ARE THIS
   GENERATION. Every other station is body-8's to the fourth decimal, and
   body-8's stations 0 to 8 were body-7's, so the nose is five generations
   old and the afterbody is one.

   Governing numbers, all measured against the partners' BUILT geometry:

   - SWEPT FRONT CORNER. wheels-9's front tire, wheel, cover and disc
     vertices rotated about the vertical axis through (1.45, 0.74). Peak |z|
     0.8190 static, 0.8298 at 2 degrees, 0.8512 at 6, 0.8720 at 10, 0.8926 at
     14, 0.9032 at 16, 0.9097 at 17.25, 0.9238 at 20, 0.9337 at 22, always at
     hub height y 0.355 and 306 mm fore and aft of the axle. x extent
     1.0917..1.8083 static and 1.0915..1.8085 at 14 degrees. Every figure is
     70.0 mm inboard of the same measurement on wheels-7.

   - POD. Stations 3, 4 and 5 hold 0.925 flat from y 0.28 to 0.58, which is
     the beltline stations 8 and 9 carry, and 0.898 / 0.902 / 0.900 at the
     shoulder. Clearance to the 14 degree swept solid, taken as the three-
     dimensional minimum from the built solid to the built pod skin and run
     over BOTH bodies by that one method, is 32.4 mm here and 38.5 mm on
     body-8, so the cost is 6.1 mm. An earlier pass reported body-8 at 45.4
     by taking its widest half-width at y 0.42 against a swept peak at
     y 0.355, which is two heights and therefore two methods. At y 0.58 the
     station is 0.923 and the bump-swept requirement is 0.8865, so 36.5 mm.
     Widest point of
     the bodywork 1.008 -> 0.925 half-width, so it is 1.850 m wide against
     2.016 and finally inside P.width, though the camera pods now stand
     outside it at 0.9768 and the car over them is 1.954 m.

   - FRONTAL AREA, one integrator run over both bodies. Station method:
     maximum half-width over all fifteen stations at each height, integrated
     in y above 0.28, doubled. It returns 1.8205 for body-8 where body-8
     publishes 1.8221 (1.6 cm2) and reproduces body-8's own beltline-cap
     experiment as -0.0649 against its published -0.0650. Here it returns
     1.7482. Audit convention:

       term                          body-8    body-9
       loft silhouette above y 0.28  1.8205    1.7482
       sub-loft below y 0.28         0.1919    0.1919   (carried)
       tire columns                  0.1260    0.0868   (wheels-9)
       protrusions past silhouette   0.0362    0.0322
       A                             2.1570    2.0415

     Three terms land on the audit's own arithmetic: 1.8221 reproduced to
     1.6 cm2, the columns exactly, and 0.1919 = the audit's 0.173 of splitter
     and valance plus its 0.0189 of floor plates, strakes and diffuser. The
     protrusion term does not: the audit's implied residual is 0.0186 where
     this integrator counts 0.0362, because it also picks up the 8 mm and
     3 mm offsets the glass band and the door skins are lofted at. Those are
     identical on both bodies, so the DELTA is what is used: -0.1155 in
     total, applied to the audit's own 2.157. Band by band the loft term
     moves -0.0158 / -0.0162 / -0.0149 / -0.0127 / -0.0095 / -0.0031 over
     y 0.28 to 0.88 and 0.0000 above it, and those six sum to the -0.0722.

   - RANGE on js/efficiency.js's own model, one method over every rung:
     Gen 8 as shipped 117.22 Wh/mi and 1,621 mi; wheels-9 alone with body-8
     carried 116.53 and 1,631; this body added 114.39 and 1,661; the full
     Gen 9 preset at 1,388 kg with thermal-9's 559 W, 112.20 and 1,693.
     Without the one Cd count this body is 1,656, so 25 of its 30 miles are
     area and mass and 5 are the coefficient.

   - THE FRONT IS NOW FINISHED AS AN AREA LEVER. Cap every station from
     x 2.375 to 1.070 at the 0.925 beltline and the integral moves 0.0000 m2.
     From y 0.28 to 0.55 the silhouette is the beltline (rockers at |z| 0.915
     plus interior-6); from y 0.86 up it is the maximum-section ring. Both
     are cabin decisions.

   - PLAN ANGLES at y 0.42, measured off the stations. Leading flare from
     station 2 to station 3: 48.4 degrees on body-8, 36.5 here. Trailing
     closure from station 5 to station 6: 20.7 degrees on body-8, 0.5 here.
     The 20.7 is what the one booked count buys, priced at the Gen 8 audit's
     implied base coefficient 0.030 over the blister's 0.083 m2 trailing
     cross-section: 1.15 counts, carried as 1. Cd 0.108 audited -> 0.107.

   - CONTAINED LOCK, swept against the built hardware of both bodies by the
     one method that produces the body-8 defect figures below. body-8
     louvers bind at 17.7 degrees, near its published 17.25, and its real
     lock is the 3.11 its lower closeout allows. On body-9 the POD SKIN
     binds first at 20.2, because the swept peak grows about 0.52 mm per
     degree past 14 and 32.4 mm of clearance is 6.2 degrees of it; the lower
     lip follows at 21.1 and the louver bank at 21.2. The lip's own drawing
     rule, the y 0.24..0.34 band maximum it is offset 18 mm from, is
     deliberately more conservative and runs out at 17.3; it is kept as the
     rule and not quoted as the lock. Commanded lock is 14.0 on both,
     carried by suspension-9's rack, so the turning circle stays 21.4 m curb
     to curb and the 6.2 degrees are headroom.

   - CARRIED AND NOT FIXED, on the part this generation redrew. The sealed
     inboard wall is an offset from the wheel center (FRONTZ - 0.110), the
     same drawing method the lower closeout is criticized for. It threads
     0.9 mm between the disc hat at |z| 0.5985 and the friction ring at
     0.6925 static, and the steered disc is through it from about 6 degrees,
     reaching 0.5630 at 14 inside the wall footprint. body-8 is the same in
     kind at 1.9 mm. A flat wall cannot clear a corner rotating about its
     own center; the part needs an aperture and neither body draws one.

   - DEFECT FOUND IN body-8 AND NOT REPEATED. Its front fairing lower
     closeout is a 100 mm flange at y 0.282..0.302, |z| 0.8945..0.9945.
     Sweeping wheels-7's own front corner against it: 14.5 mm of gap static,
     zero at 3.11 degrees of lock, -48.6 mm at the commanded 14. So body-8's
     real contained lock was 3.11 degrees, not the 17.25 it published, and
     the difference is one part that was drawn off the surface instead of
     off a sweep. The lip here is built off the SWEEPF table below, the way
     body-8 built its rear one, and it is no longer what binds.

   - PARTNER CLEARANCES forward of x 0.850, from built meshes. suspension-9
     front metal reaches |z| 0.7100 at (1.315, 0.37), which is its hv-4
     by-wire boss and is 47.5 mm inside wheels-9's tire inner face at 0.6625;
     suspension-9 has already reported that and scheduled the stub to |z|
     0.58, where it lands inboard of this module's fairing wall at 0.630 and
     is correct. Its front tower plate (1.50, 0.735, +-0.41) and damper top
     (1.50, 0.72, +-0.41) land inside this module's relocated casting boss.
     Its subframe mounts stay at (+-1.34 and +-1.72, 0.30, +-0.50).
     drivetrain-7's front halfshafts still end at |z| 0.7625 and still
     overrun wheels-9's hub face at 0.6925 by 70.0 mm; that is drivetrain
     geometry and wheels-9 filed it.

   - CARRIED INTERFACES held exactly: autonomy-4's front band face at
     x 2.371, y 0.615, half-width 0.43 with lidar windows at z +-0.30 and the
     thermal camera at (2.345, 0.53, 0); rockers at outer face |z| 0.915;
     cage rail tops at y 1.324..1.328 under a loft roof band at 1.336..1.339;
     A-pillar feet and cowl beam at (0.99, 0.870..0.880, +-0.660).

   - CARRIED CONDITIONS, present since body.js and not fixed here: the
     bumper beam's outboard corner at (2.27, 0.50, +-0.65) stands 14.9 mm
     outside the nose loft and overlaps thermal-7's condenser core by 7.5 mm.
     interior-6's rear belt towers stand 98 mm outside the loft at (x -1.15,
     y 1.212). hv-4's charge port hard point at (-1.92, 0.80, 0.88) stands
     105 mm outside the tail flank, worsened by body-8 and unchanged here. */

function ring(x, half, crownY) {
  const pts = [];
  for (let i = 0; i < half.length; i++) pts.push([x, half[i][0], -half[i][1]]);
  pts.push([x, crownY, 0]);
  for (let i = half.length - 1; i >= 0; i--) pts.push([x, half[i][0], half[i][1]]);
  return pts;
}

/* [x, [[y, half-width] x7], crownY] */
const STATIONS = [
  /* 0  nose face                      body-8, unchanged: autonomy-4 band */
  [2.375, [[0.42, 0.440], [0.48, 0.500], [0.55, 0.520], [0.61, 0.490], [0.65, 0.420], [0.680, 0.300], [0.695, 0.150]], 0.705],
  /* 1  over the thermal stack front edge   body-8, unchanged: bumper beam */
  [2.220, [[0.32, 0.620], [0.44, 0.685], [0.58, 0.712], [0.70, 0.672], [0.79, 0.545], [0.825, 0.360], [0.840, 0.170]], 0.850],
  /* 2  hood, frunk zone              body-8, unchanged: the leading flare
        into the pod is now 36.5 deg and narrowing this station puts it back */
  [2.030, [[0.28, 0.710], [0.44, 0.778], [0.60, 0.800], [0.75, 0.752], [0.85, 0.628], [0.892, 0.400], [0.908, 0.185]], 0.920],
  /* 3  THE POD, forward station. 1.000/1.006/0.992/0.936 -> the beltline.
        Swept requirement here is 0.8926 at 14 deg; 0.925 holds 32.4 mm. */
  [1.820, [[0.28, 0.925], [0.42, 0.925], [0.58, 0.923], [0.76, 0.898], [0.88, 0.722], [0.930, 0.440], [0.948, 0.200]], 0.960],
  /* 4  THE POD, front axle. body-8 crowned to 1.008 here, which is where the
        swept solid is NARROWEST (0.8190): a fender drawn from intuition
        rather than from the envelope. Flat 0.925. */
  [1.450, [[0.28, 0.925], [0.42, 0.925], [0.58, 0.924], [0.78, 0.902], [0.90, 0.748], [0.965, 0.460], [0.988, 0.210]], 1.005],
  /* 5  THE POD, trailing station and cowl. body-8 closed 1.006 -> 0.923 into
        station 6 over 220 mm, 20.7 deg in plan. Now 0.5 deg. */
  [1.070, [[0.28, 0.925], [0.42, 0.925], [0.58, 0.923], [0.80, 0.900], [0.93, 0.778], [1.015, 0.500], [1.045, 0.230]], 1.070],
  /* 6  fairing blend-out                                body-8, unchanged */
  [0.850, [[0.28, 0.924], [0.55, 0.922], [0.82, 0.893], [0.95, 0.836], [1.06, 0.700], [1.150, 0.480], [1.164, 0.250]], 1.172],
  /* 7  windshield header station                        body-8, unchanged */
  [0.300, [[0.28, 0.922], [0.55, 0.920], [0.90, 0.868], [1.02, 0.772], [1.12, 0.628], [1.334, 0.542], [1.346, 0.325]], 1.354],
  /* 8  maximum section, roof crown                      body-8, unchanged */
  [-0.450, [[0.28, 0.925], [0.55, 0.925], [0.90, 0.872], [1.02, 0.780], [1.12, 0.640], [1.340, 0.550], [1.352, 0.330]], 1.360],
  /* 9  closure begins                                   body-8, unchanged */
  [-1.100, [[0.28, 0.925], [0.55, 0.925], [0.90, 0.874], [1.01, 0.778], [1.11, 0.632], [1.290, 0.532], [1.302, 0.318]], 1.310],
  /* 10 rear axle                                        body-8, unchanged */
  [-1.440, [[0.28, 0.878], [0.54, 0.880], [0.84, 0.840], [0.97, 0.736], [1.07, 0.592], [1.199, 0.462], [1.212, 0.276]], 1.219],
  /* 11 arch trailing edge                               body-8, unchanged */
  [-1.780, [[0.34, 0.864], [0.56, 0.866], [0.80, 0.822], [0.92, 0.716], [1.01, 0.570], [1.109, 0.426], [1.121, 0.254]], 1.128],
  /* 12                                                  body-8, unchanged */
  [-2.120, [[0.42, 0.756], [0.60, 0.758], [0.78, 0.724], [0.90, 0.638], [0.98, 0.512], [1.055, 0.384], [1.066, 0.230]], 1.072],
  /* 13                                                  body-8, unchanged */
  [-2.450, [[0.49, 0.650], [0.61, 0.654], [0.75, 0.630], [0.85, 0.558], [0.92, 0.454], [1.012, 0.340], [1.022, 0.202]], 1.030],
  /* 14 Kamm face                                        body-8, unchanged */
  [-2.775, [[0.545, 0.482], [0.628, 0.536], [0.712, 0.550], [0.796, 0.518], [0.860, 0.452], [0.925, 0.318], [0.952, 0.160]], 0.975],
];

const RINGS = STATIONS.map(([x, half, crownY]) => ring(x, half, crownY));

/* Half-width of the loft at an arbitrary (x, y): linear between the two
   bracketing stations, linear between profile points inside each. body-7's
   helper, carried verbatim through body-8, because every panel meant to lie
   on the surface is derived from the surface rather than placed by eye. */
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
   is hz wide, so struts and mounts land ON the deck instead of near it. */
function surfaceY(x, hz) {
  let lo = bottomY(x), hi = 1.45;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    if (halfWidth(x, mid) > hz) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/* Swept |z| of wheels-7's rear corner under suspension-4's +-3 degrees,
   carried verbatim from body-8 with the rear arch. Peak 0.8352 at 307 mm. */
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

/* Swept |z| of wheels-9's FRONT corner over the rack's plus and minus 14
   degrees, measured off its built mesh in the y 0.24 to 0.34 band the lower
   closeout occupies, tabulated on distance from the front axle. This is the
   table body-8 should have had and did not: its front lip was set 100 mm in
   from the surface and its own tire reached it at 3.1 degrees. */
const SWEEPF = [[0.00, 0.8162], [0.05, 0.8264], [0.10, 0.8420], [0.15, 0.8498],
                [0.20, 0.8710], [0.25, 0.8893], [0.30, 0.8919], [0.35, 0.8814],
                [0.36, 0.8500]];
function sweptF(x) {
  const r = Math.abs(x - P.axleF);
  if (r >= SWEEPF[SWEEPF.length - 1][0]) return 0;
  for (let i = 0; i < SWEEPF.length - 1; i++) {
    if (r <= SWEEPF[i + 1][0]) {
      const [r0, z0] = SWEEPF[i], [r1, z1] = SWEEPF[i + 1];
      return z0 + (r - r0) / (r1 - r0) * (z1 - z0);
    }
  }
  return 0;
}

/* x of a fractional station index, the inverse of rowOf below. */
function xOf(u) {
  const i = Math.max(0, Math.min(STATIONS.length - 2, Math.floor(u)));
  return STATIONS[i][0] + (u - i) * (STATIONS[i + 1][0] - STATIONS[i][0]);
}

/* Flat end cap built from a ring's own outline, so the nose and Kamm faces
   fill their apertures exactly instead of standing proud of a curved edge.

   closeLoop is not optional and this module is the proof. A ring here is an
   OPEN polyline running from the flank's bottom edge on one side, over the
   crown, to the bottom edge on the other. Fanning it to a shrunken copy
   without joining the last point back to the first leaves the sector across
   the bottom unfilled, and that sector is not small. Rastered on the mesh
   this module built before this pass, at 40,000 axial rays masked to 96
   percent of each ring outline, 24.0 percent of the nose window landed on
   the front megacasting, the crash rails and open sky seen THROUGH the
   bodywork, and 21.2 percent of the Kamm window landed on the rear
   megacasting. The same raster over the mesh this module builds now
   returns 0.00 percent on both faces. body-8
   found and fixed the same defect in the same helper; body-9 inherited the
   unfixed copy. A sealed nose has to be sealed.

   Closing the loop is necessary and it is not sufficient, which the same
   raster showed on the next run. The fan ends on a ring shrunk to five
   percent rather than on a point, and nothing fills the inside of that
   ring: a 46 by 13 mm slot was left at the center of each face, directly
   under each light band, still showing a megacasting through it. The cap
   therefore ends on a real apex, one extra section of coincident points.
   Half of the triangles in that last band are degenerate and the whole
   addition is 348 triangles across the two faces. */
function endCap(ringPts, dx, mat) {
  const ys = ringPts.map((p) => p[1]);
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const x0 = ringPts[0][0] + dx;
  const inner = ringPts.map(([x, y, z]) => [x + dx, cy + (y - cy) * 0.05, z * 0.05]);
  const apex = ringPts.map(() => [x0, cy, 0]);
  return lib.loft([ringPts, inner, apex], mat, true);
}

/* Angled box with chamfered edges: abox's signature with the chamfer after
   the depth. A chamfer is what turns one flat highlight into two, and on a
   car built almost entirely out of boxes it is most of the crispness for
   almost none of the budget: 44 triangles against 12. */
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

   Every painted panel is a slice of ONE resampled loft rather than seven
   independent ones, which is what lets a shutline be cut once and picked up
   in halves by the two parts either side of it. body-8 is the worked
   example and this body follows it, because from x 0.850 aft the two
   surfaces are the same surface: stations 6 to 14 and 0 to 2 are identical
   to the fourth decimal and only stations 3, 4 and 5 are this generation's.
   Two bodies that share a surface must not disagree about where a door
   opens, so the three cuts here are body-8's three cuts, re-derived from
   the partners' built geometry rather than copied.

   INTERPOLATION IS LINEAR AND THAT IS NOT NEGOTIABLE on this body. The
   clamp in lib.loft protects the ENVELOPE, not the frontal area: area is
   the widest point at each HEIGHT, so a surface that moves between two
   profile points moves the integral without touching any extreme. Measured
   over body-8's shell by one integrator, clamped Catmull-Rom costs
   +0.64 percent of A and unclamped +2.80. This module publishes 2.0415 m2
   to four decimals and js/efficiency.js carries 2.043, so only linear is
   available. Linear also keeps every clearance in this file exact: the
   surface between stations moves up to 29 mm under a clamped smooth
   interpolant, and the 32.4 mm pod clearance, the 25.5 mm inboard wall gap
   and the lower lip's 17.9 mm are all quoted to the millimeter off it. ── */

function rowOf(x) {
  for (let i = 0; i < STATIONS.length - 1; i++) {
    if (x <= STATIONS[i][0] && x >= STATIONS[i + 1][0]) {
      return i + (STATIONS[i][0] - x) / (STATIONS[i][0] - STATIONS[i + 1][0]);
    }
  }
  return x > STATIONS[0][0] ? 0 : STATIONS.length - 1;
}

const GAP = { width: 0.005, depth: 0.004 };
const FADE = 0.05;

/* ── DOOR SHUTLINES, placed against BUILT partner geometry ─────────────

   body-8's published trio was x 1.06 / 0.06 / -0.94 and the 1.06 was wrong:
   it sat on an enclosed wheel pod, where a door leading edge cannot swing.
   That error is not inherited. Every one of these three is a measurement.

   x 0.850, the front cut. This is ring 6, the station where the fairing
   flank hands over to the cabin flank, so the cut lands on a panel joint
   that already exists rather than in the middle of a panel. Measured
   forward of it: this module's own wheelhouse aft closeout is a 16 mm wall
   centered at x 1.045, so its rear face is at 1.037 and the cut is 187 mm
   behind it; wheels-9's front tire reaches x 1.0917 at its rearmost, 242 mm
   ahead; interior-6's dashboard ends at x 0.8796 outboard of |z| 0.55, so
   the aperture's forward edge is 29.6 mm behind the dash it would otherwise
   have to swing past; and the cage's A-pillar foot and cowl beam stand at
   x 0.99, 140 mm ahead, which is where the hinges go.

   x 0.060, the B-pillar cut. The cage B-pillar is a 26 mm tube on x 0.020,
   so its aft face is at 0.046 and the cut is 14 mm behind it: the front
   door's trailing edge covers the pillar and the rear door hinges off it.
   interior-6's front seat backrest tops out at x 0.0910, 31 mm ahead of the
   cut, so the aperture ends where the occupant does.

   x -0.940, the rear cut. The rear wheelhouse closeout's forwardmost vertex
   is at x -1.0505 and the rocker's rear end at -1.010, so the cut is
   110.5 mm ahead of the arch and 70 mm ahead of the end of the sill it
   swings over. interior-6's rear bench cushion reaches x -1.035, which is
   the one number that does not clear: the trailing 95 mm of the cushion
   sits behind the aperture. That is the arch's fault rather than the cut's,
   and moving the cut aft to fix it would hang a door over a wheel.

   Both ends of the span are panel edges. The cut runs from the rocker top
   at ring fraction 0.5185, which is y 0.420 at every station a door
   touches, up to the beltline seam at ring point 3. The sill below it is
   the outer face of a 2.02 m extrusion whose section battery-7 specified;
   it neither opens nor moves, so the door does not own it. ── */
const SHUT = [FAIR1, rowOf(0.060), rowOf(-0.940)];   /* FAIR1 is rowOf(0.850) */
const SILL = 0.5185;
const SEAM = 3;
const DOORL = [SILL, SEAM], DOORR = [14 - SEAM, 14 - SILL];

/* Hood x 2.220 to 1.130: forward of the cowl at station 5 where the glass
   root starts, aft of the nose fascia band that carries the light bar, and
   covering P.frunk's x 1.78 to 2.12 with margin. Decklid x -1.160 to
   -2.320, leaving 455 mm of fixed tail under the spoiler mounts and the
   Kamm face. Side gaps at ring fractions 3.7 and 10.3, on the shoulder and
   clear of the beltline seam. The tail-cone joint at x -1.100 deliberately
   gets no shutline: it is a bonded laminate joint, filled and painted, with
   nothing there to catch light. Both of these open; the joint at x -1.100
   does not, which is why it is the one line here with no groove under it. */
const HOOD = [rowOf(2.220), rowOf(1.130)];
const LID = [rowOf(-1.160), rowOf(-2.320)];
const DECKSPAN = [3.55, 10.45];

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

const SHELL = lib.loftGrid(RINGS, {
  rowSub: 2, colSub: 2, interp: 'linear', grooves: GROOVES,
});

const RI = (u) => SHELL.rowIndex(u);
const CI = (v) => SHELL.colIndex(v);
const gp = (a, b) => {
  const k = (a * SHELL.cols + b) * 3;
  return [SHELL.pts[k], SHELL.pts[k + 1], SHELL.pts[k + 2]];
};
/* Outward surface normal at a grid node, by the same central difference
   _grid uses to sink a groove, so an aperture rim returns along the same
   direction a groove floor does. */
function gnormal(a, b) {
  const A = gp(Math.max(0, a - 1), b), B = gp(Math.min(SHELL.rows - 1, a + 1), b);
  const C = gp(a, Math.max(0, b - 1)), D = gp(a, Math.min(SHELL.cols - 1, b + 1));
  const u = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];
  const v = [D[0] - C[0], D[1] - C[1], D[2] - C[2]];
  const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const L = Math.hypot(n[0], n[1], n[2]) || 1;
  return [n[0] / L, n[1] / L, n[2] / L];
}

/* ── DECLARED CREASES, not a global angle threshold ────────────────────

   lib.crease takes one angle and applies it to every edge in a mesh, and on
   a body lofted through fifteen coarse stations that cannot work: a
   threshold cannot tell a designed edge from the kink a coarse table puts
   in the surface. body-8 shipped the global version and its nose went
   polygonal. So the creases here are DECLARED as sets of grid lines, and a
   declared line still has to show a real turn before it breaks. That second
   half matters as much as the first: a groove's lips fade out over its
   run-out, and a line held hard along its whole length would draw a shading
   edge across the panel where the channel has already faded to nothing.

   The declaration was chosen from this body's own kink spectrum, measured
   turn by turn on the station table.

   STATION LINES: none, and that is the measured result rather than
   laziness. The three biggest turns along x are 47.7 degrees at station 5,
   45.7 at station 3 and 39.2 at station 6, against 26.5 at station 1, 22.9
   at station 2 and 19.1 at station 7. There is no gap in that distribution
   for a threshold to sit in, and worse, the big three are not edges at all.
   Station 5's 47.7 is at ring point 2, where the profile table changes the
   HEIGHT it samples from y 0.58 to y 0.82 between stations 5 and 6: the
   turn is in the parametrization, not in the surface. Station 6's 39.2 is
   the same artifact one station along. Station 3's 45.7 is at the flank's
   bottom edge, where the nose flares from 0.710 to the 0.925 beltline over
   210 mm; that is a continuous flare with one station in it, and breaking
   it is exactly how body-8 faceted its nose. Nothing on this body's station
   lines is a designed crease, so nothing is declared.

   RING LINES: ring points 5 and 9, the deck shoulder. That line runs 5.8 to
   10.7 degrees over the nose, where it is nothing, and 26.3 to 64.9 degrees
   from the windshield header aft, where the section stops climbing and
   turns flat across the deck. It is the one genuine crease in the
   cross-section and it is what makes a Kamm tail read as a tail. The gate
   at 24 degrees is what lets one declaration do both jobs.

   The groove lips and floor edges are added below from the grid's own
   records, so every shutline, the hood and the decklid break on all four
   of their lines. Groove walls stand at about 71 degrees, well clear of the
   gate, and their run-outs fall under it and stay smooth. ── */
const GATE = 24;
const HARDROW = new Set();
const HARDCOL = new Set([CI(5), CI(9)]);
for (const g of SHELL.grooves) {
  const S = g.axis === 'row' ? HARDROW : HARDCOL;
  S.add(g.i0); S.add(g.f0); S.add(g.f1); S.add(g.i1);
}

/* Split the normals of a grid panel along the declared lines only. Costs
   zero triangles: the geometry is de-indexed, which triples the vertex
   count and leaves positions, UVs and winding untouched. */
function creaseDeclared(mesh, r0, c0, R, C) {
  const geo = mesh.geometry.toNonIndexed();
  const pos = geo.attributes.position.array;
  const nf = pos.length / 9, CC = C - 1;
  const fn = new Float64Array(nf * 3);
  for (let f = 0; f < nf; f++) {
    const a = f * 9;
    const ux = pos[a + 3] - pos[a], uy = pos[a + 4] - pos[a + 1], uz = pos[a + 5] - pos[a + 2];
    const wx = pos[a + 6] - pos[a], wy = pos[a + 7] - pos[a + 1], wz = pos[a + 8] - pos[a + 2];
    const nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
    const L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    fn[f * 3] = nx / L; fn[f * 3 + 1] = ny / L; fn[f * 3 + 2] = nz / L;
  }
  const qsum = (a, b) => {
    if (a < 0 || a >= R - 1 || b < 0 || b >= CC) return null;
    const q = (a * CC + b) * 6;
    return [fn[q] + fn[q + 3], fn[q + 1] + fn[q + 4], fn[q + 2] + fn[q + 5]];
  };
  const unit = (v) => {
    const L = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / L, v[1] / L, v[2] / L];
  };
  const cosG = Math.cos((GATE * Math.PI) / 180);
  const nrm = new Float32Array(pos.length);
  const find = (p, i) => { while (p[i] !== i) i = p[i]; return i; };
  for (let f = 0; f < nf; f++) {
    const q = f >> 1, a = (q / CC) | 0, b = q % CC;
    const corners = (f & 1) ? [[a, b + 1], [a + 1, b], [a + 1, b + 1]]
                            : [[a, b], [a + 1, b], [a, b + 1]];
    for (let k = 0; k < 3; k++) {
      const va = corners[k][0], vb = corners[k][1];
      const qa = [va - 1, va], qb = [vb - 1, vb];
      const S = [qsum(qa[0], qb[0]), qsum(qa[0], qb[1]), qsum(qa[1], qb[0]), qsum(qa[1], qb[1])];
      const p = [0, 1, 2, 3];
      const join = (i, j) => { const ri = find(p, i), rj = find(p, j); if (ri !== rj) p[ri] = rj; };
      const turns = (i, j) => {
        const u = unit(S[i]), v = unit(S[j]);
        return u[0] * v[0] + u[1] * v[1] + u[2] * v[2] < cosG;
      };
      const hardR = HARDROW.has(r0 + va), hardC = HARDCOL.has(c0 + vb);
      for (const cs of [0, 1]) {
        if (S[cs] && S[2 + cs] && !(hardR && turns(cs, 2 + cs))) join(cs, 2 + cs);
      }
      for (const rs of [0, 1]) {
        if (S[rs * 2] && S[rs * 2 + 1] && !(hardC && turns(rs * 2, rs * 2 + 1))) join(rs * 2, rs * 2 + 1);
      }
      const root = find(p, (a === va - 1 ? 0 : 2) + (b === vb - 1 ? 0 : 1));
      let sx = 0, sy = 0, sz = 0;
      for (let s = 0; s < 4; s++) {
        if (!S[s] || find(p, s) !== root) continue;
        sx += S[s][0]; sy += S[s][1]; sz += S[s][2];
      }
      const L = Math.hypot(sx, sy, sz);
      const o = (f * 3 + k) * 3;
      if (L > 1e-12) { nrm[o] = sx / L; nrm[o + 1] = sy / L; nrm[o + 2] = sz / L; }
      else { nrm[o] = fn[f * 3]; nrm[o + 1] = fn[f * 3 + 1]; nrm[o + 2] = fn[f * 3 + 2]; }
    }
  }
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  mesh.geometry = geo;
  return mesh;
}

const panel = (rows, cols) => {
  const m = lib.loftMesh(SHELL, M.paint, { rows, cols });
  return lib.shell(creaseDeclared(m, rows[0], cols[0],
    rows[1] - rows[0] + 1, cols[1] - cols[0] + 1));
};

/* End cap taken off the master grid's own edge ring, so the nose and Kamm
   faces close against the subdivided panels exactly. */
function capOf(rowIdx, dx, mat) {
  const r = [];
  for (let b = 0; b < SHELL.cols; b++) r.push(gp(rowIdx, b));
  return endCap(r, dx, mat);
}

/* Column bands in resolved indices. FULL is the whole open ring, used
   wherever ONE part owns the flank and the deck at the same station: the
   nose and the tail cone. Slicing those into a flank and a deck would put a
   hard shading break at ring point 3 where the surface turns by 17 degrees,
   which is a seam the car does not have. */
const FL = [0, CI(3)], FR = [CI(11), CI(14)], UP = [CI(3), CI(11)];
const FULL = [0, SHELL.cols - 1];
const DOORBAND = [CI(11), CI(14 - SILL)];
const SILLL = [CI(0), CI(SILL)], SILLR = [CI(14 - SILL), CI(14)];
/* each shutline pushed a left and a right groove; both resolve to the same
   split row, which is the far floor edge of the channel */
const CUT = [SHELL.grooves[0].split, SHELL.grooves[2].split, SHELL.grooves[4].split];
/* the decklid's own four cut lines, read off the grid's records rather than
   re-derived: rows from the two LID grooves, columns from the two side gaps
   that were pushed over the LID span. Resolved, [55, 70] by [22, 49]. */
const LIDROW = [SHELL.grooves[8].split, SHELL.grooves[9].split];
const LIDCOL = [SHELL.grooves[11].split, SHELL.grooves[13].split];
/* and the hood's, the same way. Its side gaps sit at the same ring fraction
   3.7 and 10.3 as the lid's and still resolve one index tighter, [21, 48]
   against [22, 49], because loftGrid probes the meters-per-index scale along
   each groove's own run and the deck is wider at the cowl than at the tail. */
const HOODROW = [SHELL.grooves[6].split, SHELL.grooves[7].split];
const HOODCOL = [SHELL.grooves[10].split, SHELL.grooves[12].split];

/* ── ARCH LOUVER APERTURES ─────────────────────────────────────────────

   The louver bank on this body was drawn at |z| halfWidth - 0.014 with no
   hole in front of it, which means it was drawn inside the bodywork.
   Rastered at normal incidence over each bank window before this pass, 98.4
   and 98.0 percent of the rays landed on the fairing skin and the blades
   themselves returned under 2 percent. A sealed pod that vents through a
   bank you cannot see is a sealed pod, and the module's own text says these
   two banks are its only inlet and outlet.

   The holes are cut on grid lines the subdivision already has, so they add
   no lines to the tensor grid and therefore no triangles anywhere else on
   the car. Rows 3 to 3+2/3 is x 1.820 to 1.5733 and rows 4+1/3 to 5 is
   x 1.3233 to 1.070, both of them over the wheelhouse, which spans x 1.045
   to 1.855 between this part's own closeouts. Columns 2 to 2+1/3 is the
   band from y 0.580 up to y 0.647 at the axle station, which brackets the
   y 0.630 the bank was moved to and which the swept envelope at the
   commanded lock does not reach. The blades keep their 62 mm pitch and the
   y 0.630 their |z| is read off, and they overlap the bottom edge of the
   aperture rather than ending on it: measured on the built mesh they run
   y 0.5720 to 0.6325..0.6332, so 60.5 to 61.2 mm tall on a 67 mm window,
   centered on y 0.602. What sets the top is the surface and not a number,
   and the paragraph on the louver part below is where that is derived. ── */
const VENT = [
  { r: [RI(3), RI(3 + 2 / 3)], x: [xOf(3), xOf(3 + 2 / 3)], n: 3, ry: -0.3 },
  { r: [RI(4 + 1 / 3), RI(5)], x: [xOf(4 + 1 / 3), xOf(5)], n: 4, ry: 0.3 },
];
const VENTC = { L: [CI(2), CI(2 + 1 / 3)], R: [CI(14 - 2 - 1 / 3), CI(12)] };
const RIM = 0.014;

/* The fairing flank in five slices per side, so the two apertures are holes
   in the panel rather than blades behind it. */
function ventedFlank(part, band, win, r0, r1) {
  part.add(panel([r0, r1], [band[0], win[0]]));
  part.add(panel([r0, r1], [win[1], band[1]]));
  let at = r0;
  for (const v of VENT) {
    part.add(panel([at, v.r[0]], win));
    at = v.r[1];
  }
  part.add(panel([at, r1], win));
}

/* A returned rim around one aperture: the window outline on the surface,
   lofted to a copy pushed RIM inboard along the surface normal, so the cut
   has a thickness and a lit lip instead of being a hole in paper. */
function ventRim(r, win) {
  const out = [];
  for (let a = r[0]; a <= r[1]; a++) out.push([a, win[0]]);
  for (let b = win[0] + 1; b <= win[1]; b++) out.push([r[1], b]);
  for (let a = r[1] - 1; a >= r[0]; a--) out.push([a, win[1]]);
  for (let b = win[1] - 1; b > win[0]; b--) out.push([r[0], b]);
  const face = out.map(([a, b]) => gp(a, b));
  const back = out.map(([a, b]) => {
    const p = gp(a, b), n = gnormal(a, b);
    return [p[0] - n[0] * RIM, p[1] - n[1] * RIM, p[2] - n[2] * RIM];
  });
  return lib.crease(lib.loft([face, back], M.carbon, true), 30);
}

/* ── The lower valance and the nose aperture ───────────────────────────
   The valance is body-7's, three sections at (2.240, 0.128, hz 0.510),
   (2.325, 0.280, 0.502) and (2.373, 0.420, 0.446), written as its two
   interpolants rather than as a table because the panel and the hole cut in
   it have to be the same surface to the last decimal.

   THE HOLE. intake-gates has claimed an aperture since body-7 and metered a
   solid panel on every body that carried it. Rastered dead ahead over this
   module's own bank window before this pass, 88.2 percent of the rays hit
   the slats and every single one of the remaining 11.8 percent hit valance
   carbon: nothing behind the gates was reachable, because there was nothing
   behind them. The aperture is 0.532 m wide against a 0.560 m slat bank, so
   the bank still covers it from straight ahead with 14 mm of overlap at
   each edge, and what shows in the fraction the slats do not fill is the
   throat, the lattice and thermal-9's coil face. The edge returns 14 mm
   inboard on the valance's own normal so the cut has a thickness.

   The duct carries the rim back to a mouth 6.0 mm ahead of thermal-9's
   forwardmost vertex, which is measured off its built mesh at x 2.2090 on
   the outdoor coil, the same station thermal-7 held. The floor rises to
   y 0.256 on the way because that is where the coil face starts, and a duct
   whose exit sits below its heat exchanger is a longer hole. ── */
const vx = (y) => (y < 0.280 ? 2.240 + (y - 0.128) / 0.152 * 0.085
                             : 2.325 + (y - 0.280) / 0.140 * 0.048);
const vhz = (y) => (y < 0.280 ? 0.510 + (y - 0.128) / 0.152 * -0.008
                              : 0.502 + (y - 0.280) / 0.140 * -0.056);
const RAKE = Math.atan2(0.133, 0.292);        /* valance lean, 24.5 degrees */
const AP = { y0: 0.214, y1: 0.360, z: 0.266 };

/* The marque: a chevron, extruded with a beveled rim. A decal has no edge
   for a softbox to find; a badge does, which is the whole reason this is
   geometry and not a texture. */
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

/* ── structure: body-8's, with the front shock towers moved inboard onto
   suspension-9's relocated strut and air spring mounts ── */
function buildStructure(sys) {
  const fc = lib.part('front-casting', [0.85, -0.35, 0]);
  for (const s of [-1, 1]) {
    /* rail and cradle spar, carried: the subframe mounts did not move */
    fc.add(acbox(0.51, 0.28, 0.24, 0.012, M.castAlu, 1.805, 0.44, s * 0.475));
    /* shock tower pad: body-8 had a boss at (1.65, 0.66, +-0.535) spanning
       |z| 0.460 to 0.610, which is 75 mm outboard of suspension-9's tower
       plate at (1.50, 0.735, +-0.41) and its damper, which tops out at
       y 0.729. The pad moves inboard to receive both, and a rib carries it
       back to the spar OUTBOARD of suspension-9's air supply line, which
       passes (1.60, 0.56, +-0.43). */
    fc.add(acbox(0.20, 0.055, 0.24, 0.008, M.castAlu, 1.545, 0.745, s * 0.430));
    fc.add(acbox(0.11, 0.20, 0.07, 0.008, M.castAlu, 1.600, 0.650, s * 0.520));
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

  /* rear megacasting plus rails, beam and bond pad: body-8 verbatim */
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

  /* rockers, carried: outer face |z| 0.915, now the widest hard part */
  const rockL = lib.part('rockers', [0, -0.5, 0.3]);
  rockL.add(acbox(2.02, 0.10, 0.07, 0.008, M.paintDark, 0, 0.37, 0.88));
  sys.add(rockL);
  sys.add(mirrorZ(rockL));

  /* the cage: body-8's, including its C-pillar repair. No node moves. */
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


/* ── the Gen 9 shell ── */
function buildShell(sys) {
  /* ── skin: the nose as ONE panel over the whole open ring, the fixed
     panels either side of the door apertures, the hood band and the nose
     face. Every station here is body-8's, resampled and grooved but not
     moved. The nose is one panel rather than a flank plus a deck because
     one part owns both there and the surface between them turns by only
     33 degrees over a 210 mm station gap: slicing it would put a hard
     shading seam down a shoulder the car does not have, and the hood's
     side gap at ring fraction 3.7 is the line that belongs there. ── */
  const skin = lib.part('skin', [0, 0.62, 0]);
  /* THE HOOD COMES OUT OF THE FIRST TWO OF THESE, and like the decklid it is
     a re-slice rather than a redraw: all four of its cut lines were grooved
     into the master grid when they were declared, and the two panels above
     ran straight over the top of them. The lid straddles the fairing
     blend-out row, so it takes a bite out of both: the nose panel keeps
     everything ahead of row 7 and the two strips outboard of the side gaps,
     and the deck panel keeps the two fender tops and the cowl band aft of
     row 23. What opens is the middle. */
  skin.add(panel([RI(0), HOODROW[0]], FULL));                       /* nose ahead of the hood */
  skin.add(panel([HOODROW[0], RI(FAIR0)], [0, HOODCOL[0]]));        /* left of it, down to the sill */
  skin.add(panel([HOODROW[0], RI(FAIR0)], [HOODCOL[1], SHELL.cols - 1]));
  skin.add(panel([RI(FAIR0), HOODROW[1]], [CI(3), HOODCOL[0]]));    /* left fender top */
  skin.add(panel([RI(FAIR0), HOODROW[1]], [HOODCOL[1], CI(11)]));   /* right fender top */
  skin.add(panel([HOODROW[1], RI(COWL)], UP));                      /* cowl deck aft of the cut */
  skin.add(panel([CUT[2], RI(DECK)], FL));            /* rear quarters */
  skin.add(panel([CUT[2], RI(DECK)], FR));
  skin.add(panel([CUT[0], CUT[2]], SILLL));           /* sill band under the cuts */
  skin.add(panel([CUT[0], CUT[2]], SILLR));
  skin.add(lib.shell(capOf(RI(0), -0.012, M.paint))); /* nose face, closed */
  sys.add(skin);

  /* the hood, the same part id so the skin stays one clickable thing */
  const hood = lib.hinge(lib.part('skin', [0, 0.62, 0]), 'hood');
  hood.add(panel(HOODROW, HOODCOL));
  sys.add(hood);

  /* ── front fairings. The flank band is the pod: 0.925 from y 0.28 to 0.58
     across all three stations. It owns the near lip, the near wall and the
     floor of the front door's shutline, because that joint lands on its own
     blend-out station. Inboard wall at FRONTZ - 0.110 = 0.630, its outer
     face 25.5 mm inboard of wheels-9's tire inner face at 0.6625, which is
     exactly the clearance body-8 held against wheels-7. Fore and aft
     closeouts stay at x 1.855 and 1.045 because the swept solid's x extent
     did not move. The lower lip is redrawn off SWEEPF. ── */
  const fair = lib.part('front-fairings', [0.35, -0.05, 0.95]);
  ventedFlank(fair, FL, VENTC.L, RI(FAIR0), CUT[0]);
  ventedFlank(fair, FR, VENTC.R, RI(FAIR0), CUT[0]);
  for (const v of VENT) {
    fair.add(lib.shell(ventRim(v.r, VENTC.L)));
    fair.add(lib.shell(ventRim(v.r, VENTC.R)));
  }
  const WALL = FRONTZ - 0.110;
  for (const s of [-1, 1]) {
    fair.add(acbox(0.80, 0.190, 0.014, 0.004, M.carbon, P.axleF, 0.640, s * WALL));
    for (const cx of [P.axleF + 0.405, P.axleF - 0.405]) {
      const zo = halfWidth(cx, 0.700) - 0.012;
      fair.add(acbox(0.016, 0.330, zo - WALL, 0.005, M.carbon, cx, 0.5350, s * (WALL + zo) / 2));
    }
    /* lower closeout: a flange turning inboard from the flank's bottom edge,
       its inner edge held 18 mm off the swept front tire. 77 mm deep at the
       axle and at the ends, 14 mm over the two swing peaks at x 1.15 and
       1.75. body-8 ran a fixed 100 mm flange here and its own tire was
       48.6 mm through it at the commanded lock.

       The flange is drawn in two strips rather than one so it has a fold to
       break light on. The outer edge and the inner edge are exactly where
       they were, so every clearance this module publishes off this part is
       unchanged; what is new is the knuckle between them, at 30 percent of
       the way in and 6 mm lower, and the crease that makes it read. */
    const lip = [];
    for (let i = 0; i <= 14; i++) {
      const x = 1.045 + (0.810 * i) / 14;
      const yb = bottomY(x);
      const outer = halfWidth(x, yb + 0.004) - 0.002;
      const inner = Math.min(Math.max(sweptF(x) + 0.018, outer - 0.075), outer - 0.006);
      lip.push([[x, yb + 0.020, outer],
                [x, yb + 0.008, outer + (inner - outer) * 0.30],
                [x, yb + 0.001, inner]]);
    }
    const lipMesh = lib.crease(lib.loft(lip, M.carbon), 25);
    if (s < 0) lipMesh.scale.z = -1;
    fair.add(lipMesh);
    /* The closeout is the part that has to come off to look at a tire, so
       it shows its own screws. They seat on its outer strip, which faces
       down and slightly outboard at |z| about 0.88, well inside the
       0.925 flank, so no head reaches the silhouette. */
    for (const fx of [1.13, 1.36, 1.60, 1.79]) {
      const yb = bottomY(fx);
      const outer = halfWidth(fx, yb + 0.004) - 0.002;
      const inner = Math.min(Math.max(sweptF(fx) + 0.018, outer - 0.075), outer - 0.006);
      const f = lib.fastener(0.0036, M.steel, 'hex');
      f.rotation.x = Math.PI;
      f.position.set(fx, yb + 0.0125, s * (outer + (inner - outer) * 0.42));
      fair.add(f);
    }
  }
  sys.add(fair);

  /* ── tail cone: body-8's afterbody, every station carried, as one panel
     over the whole ring. The deck shoulder at ring points 5 and 9 is the
     one declared crease in the cross-section and this is where it earns its
     place: the section turns 57.7 degrees at the closure station, 40.8 at
     the rear axle and 26.3 at x -2.120, so a Kamm tail gets a deck edge
     instead of a gradient. ── */
  const tail = lib.part('tail-cone', [-1.45, 0.30, 0]);
  /* THE DECKLID COMES OUT OF THIS PANEL, and it is a re-slice rather than a
     redraw: the four cut lines were already grooved into the master grid
     when body-8 cut them, and the panel above simply ran straight over the
     top. What the tail keeps is the band ahead of the lid, the two quarters
     either side of it and the band behind it; what opens is the middle. */
  tail.add(panel([RI(DECK), LIDROW[0]], FULL));            /* ahead of the lid */
  tail.add(panel(LIDROW, [0, LIDCOL[0]]));                 /* left quarter */
  tail.add(panel(LIDROW, [LIDCOL[1], SHELL.cols - 1]));    /* right quarter */
  tail.add(panel([LIDROW[1], RI(LAST)], FULL));            /* the fixed tail band */
  tail.add(lib.shell(capOf(RI(LAST), 0.012, M.paint)));                    /* Kamm face */
  /* The marque, and the only one on the car: a sealed nose carrying a
     full-width light band has nowhere honest to put a second.

     The depth is set by the panel rather than by taste, and the trap is
     that the Kamm face is a cone from the ring outline to a near point, not
     a plane. Swept over the badge's 90 by 38 mm footprint on the BUILT cap,
     the surface runs x -2.76739 to -2.76478: a 2.61 mm fall. A 2.4 mm badge
     on that would stand proud at one corner and sink behind the panel at
     the other. At 4.4 mm with the back face at x -2.7642 the rim stands
     1.2 to 3.8 mm proud everywhere and the back face is 0.6 to 3.2 mm
     inside the cap everywhere. */
  const mark = lib.badge(CHEVRON, 0.0044, M.alu);
  mark.rotation.y = -Math.PI / 2;
  mark.position.set(-2.7642, 0.820, 0);
  tail.add(mark);
  sys.add(tail);

  /* the decklid, the same part id so the tail stays one clickable thing */
  const lid = lib.hinge(lib.part('tail-cone', [-1.45, 0.30, 0]), 'decklid');
  lid.add(panel(LIDROW, LIDCOL));
  sys.add(lid);

  /* ── rear wheelhouse closeouts: body-8's, carried whole. Not one
     coordinate moves, because this module's own text holds this part up as
     the drawing method the front had to copy and a carried part that
     quietly changed shape would make that claim worthless. What it gets is
     a crease pass, which costs zero triangles and moves no vertex: the
     hoop's leading and trailing edges and the lip's fold now break light
     instead of blurring into the flank. ── */
  const arch = lib.part('rear-arch-closeouts', [-0.45, -0.05, 1.15]);
  const RW = 0.400, NSEC = 15;
  const hoop = [];
  for (let i = 0; i <= NSEC; i++) {
    const a = (-3 + (186 * i) / NSEC) * Math.PI / 180;
    const x = P.axleR + RW * Math.cos(a), y = P.wheelY + RW * Math.sin(a);
    hoop.push([[x, y, 0.715], [x, y, Math.max(0.735, halfWidth(x, y) - 0.006)]]);
  }
  arch.add(lib.crease(lib.loft(hoop, M.carbon), 25));
  const rlip = [];
  for (let i = 0; i <= 12; i++) {
    const x = -1.060 - (0.760 * i) / 12;
    const yb = bottomY(x);
    const outer = halfWidth(x, yb + 0.004) - 0.002;
    const inner = Math.max(sweptZ(x) + 0.014, outer - 0.060);
    rlip.push([[x, yb + 0.004, outer], [x, yb - 0.016, Math.min(inner, outer - 0.008)]]);
  }
  arch.add(lib.crease(lib.loft(rlip, M.carbon), 25));
  sys.add(arch);
  sys.add(mirrorZ(arch));

  /* ── glass canopy band, 8 mm proud of the same stations. Its forward
     lower corner comes in 36 mm with the cowl shoulder. ── */
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

  /* ── Kamm spoiler, drawn deployed: body-8's blade on body-8's deck ── */
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

  /* ── diffuser flap, carried at 18.0 degrees on the hinge at x -2.000 ── */
  const RZF = Math.atan2(0.3696 - 0.1281, -2.7439 + 2.0007);
  const flap = lib.part('diffuser-flap', [-1.0, -0.4, 0]);
  const rampSection = (x, y, hz) => {
    const pts = [];
    for (let i = 0; i <= 6; i++) pts.push([x, y, -hz + (2 * hz * i) / 6]);
    for (let i = 6; i >= 0; i--) pts.push([x, y + 0.012, -hz + (2 * hz * i) / 6]);
    return pts;
  };
  flap.add(lib.crease(lib.loft([rampSection(-2.0007, 0.1281, 0.580),
                                rampSection(-2.7439, 0.3696, 0.450)], M.carbon, true), 40));
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
     heads sit flat on the panel they bolt through rather than near it.
     Three things are set by geometry rather than by taste. The strake's
     center line already lies on the ramp's lower face, so the seat needs no
     y offset. The head stands 11 mm outboard of the strake's own plane, so
     it clears the 10 mm fin it retains by 1.4 mm. And it has to grow
     DOWNWARD, because the ramp laminate is 12 mm thick above that face and
     a head growing the other way seats correctly and then disappears
     inside the panel it is supposed to be holding.

     The rotation is the whole of that third point and it is easy to get
     backward, so it is written down. RZF is atan2 of the ramp's rise over
     its run and the run is NEGATIVE, so RZF is 162.00 degrees and not 18:
     it already carries the half turn. lib.fastener's +Y axis under
     Euler(0, 0, RZF, 'ZXY') lands on (-0.3090, -0.9510, 0), which is
     exactly the ramp lower face's outward normal, so the head grows out of
     the panel into the flow. Adding a further pi about x cancels that and
     sends the axis to (+0.3090, +0.9510, 0), straight into the laminate.
     Measured with the extra pi in place: all eight heads returned 0 to 2 of
     400 exterior directions, 640 triangles of buried hardware. Measured
     without it, on the same 400-direction raster over the built mesh, all
     eight are reachable. That is the same class of error body-8 found
     twice, it was made a third time here, and this is the correction. */
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

  /* ── arch louvers: body-7's hardware at this body's stations, and now
     standing in a real aperture. At y 0.500 on a 0.925 flank the swept
     solid leaves 5 mm at the commanded lock; at y 0.630 it leaves 22 mm at
     14 degrees and 10 at 17.25, which is why the bank is here. The blades
     keep the 62 mm pitch and are re-spaced to sit centered in their own
     window, which moves the aft bank by 3.7 mm and the forward bank by
     25 mm. Their |z| is untouched, so every clearance and every contained
     lock figure this module publishes off this bank still holds.

     Their HEIGHT is not untouched, and cutting the aperture is what found
     it. A blade is a flat plate at constant |z| and the flank tumbles
     inboard above y 0.580, so a 100 mm blade centered on y 0.630 leaves the
     surface it is recessed into: measured on the built mesh, the top corner
     of every blade stood about 3.4 mm THROUGH the skin at y 0.680. It was
     invisible while the skin was solid and would have been a row of plastic
     tips poking out of the paint the moment the window was cut. Each blade
     is now sized off the surface, its top set where the loft is still wide
     enough to contain the rotated corner with 1.5 mm to spare, which gives
     about 60 mm of blade under a 67 mm window. The strip of window above
     them shows the rim's own top wall, which is what a vent looks like. ── */
  const louv = lib.part('arch-louvers', [0.4, -0.05, 1.3]);
  for (const v of VENT) {
    const mid = (v.x[0] + v.x[1]) / 2;
    for (let i = 0; i < v.n; i++) {
      const x = mid + (i - (v.n - 1) / 2) * 0.062;
      const zc = halfWidth(x, 0.630) - 0.014;
      /* z half-extent of a 50 by 10 mm blade turned ry about its own axis */
      const half = 0.025 * Math.abs(Math.sin(v.ry)) + 0.005 * Math.cos(v.ry);
      const yt = surfaceY(x, zc + half + 0.0015);
      const yb = 0.572;
      louv.add(acbox(0.05, yt - yb, 0.010, 0.002, M.plastic, x, (yt + yb) / 2,
                     zc, 0, 0, v.ry));
    }
  }
  for (const x of [1.19, 1.72]) {
    louv.add(acbox(0.05, 0.026, 0.02, 0.005, M.plasticLt, x, 0.720, halfWidth(x, 0.720) - 0.020));
  }
  sys.add(louv);
  sys.add(mirrorZ(louv));

  /* ── sealed venturi underbody: body-8's, carried panel for panel, with
     the nose aperture cut in the valance ── */
  const floor = lib.part('venturi-floor', [0, -0.55, 0]);
  const splitter = lib.plate(0.26, 1.02, 0.016, 0.06, M.carbon);
  splitter.position.set(2.228, 0.112, 0);
  floor.add(lib.shell(splitter));
  /* the valance, in four panels around the aperture. vx and vhz are
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
  /* The throat. An aperture with a short return still lets daylight read
     straight through the car, so the rim is carried all the way back to a
     mouth 6.0 mm ahead of thermal-9's forwardmost vertex at x 2.2090. One
     closed-loop loft, so all four walls and their four corners arrive
     together and the crease breaks every one. */
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
  ], M.carbon, true), 40)));
  for (const s of [-1, 1]) {
    floor.add(acbox(0.28, 0.05, 0.012, 0.004, M.carbon, 2.16, 0.19, s * 0.44));
  }
  /* Splitter fixings on the plate's TOP face, inboard of the side dams. A
     carbon lip working at a 110 mm gap is a strike item: it bolts on, and
     the heads are the honest evidence that it can be replaced. lib.plate
     puts its lower face at the given y plus half its thickness, so this
     16 mm plate at y 0.112 runs 0.120 to 0.136 and the seating face is
     0.136 rather than the 0.128 mid plane. */
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

  /* ── intake gates: the one nose change, a 0.56 m bank against body-8's
     0.80, now standing over a hole rather than over a panel. The lattice is
     0.560 by 0.186 against an aperture 0.532 wide and 0.161 measured up the
     valance's own slope, so it overlaps every edge by about 13 mm and no
     oblique view finds its way past the bars into the cavity. It sets 18 mm
     behind the valance skin, 4 mm behind the throat's inner lip. ── */
  const gates = lib.part('intake-gates', [1.3, -0.08, 0]);
  const SET = 0.018;
  const mesh = lib.grille(0.560, 0.186, 0.022, M.darkSteel, {
    bars: 21, cross: 5, barW: 0.0045, chamfer: 0.0009,
  });
  mesh.rotation.y = Math.PI / 2;                /* bars across z, depth along +x */
  const back = new THREE.Group();
  back.add(mesh);
  back.rotation.z = -RAKE;
  back.position.set(vx(0.287) - (SET + 0.011) * Math.cos(RAKE),
                    0.2870 + (SET + 0.011) * Math.sin(RAKE), 0);
  gates.add(back);
  for (let i = 0; i < 4; i++) {
    const y = 0.215 + i * 0.048;
    gates.add(acbox(0.012, 0.05, 0.56, 0.0035, M.plastic, vx(y) + 0.014, y, 0, 0.55));
  }
  for (const s of [-1, 1]) {
    gates.add(acbox(0.02, 0.20, 0.05, 0.006, M.plastic, vx(0.295) + 0.014, 0.295, s * 0.305));
  }
  gates.add(acbox(0.05, 0.03, 0.03, 0.006, M.plasticLt, vx(0.330) + 0.016, 0.330, 0.33));
  sys.add(gates);

  /* ── flush doors. The skins ARE the master surface between two shutlines
     now, not panels floating 3 mm above it, which is what this part's own
     text has claimed since body-7 and what body-8 already corrected. Each
     door carries the far wall and lip of the cut in front of it and the
     near lip, wall and floor of the cut behind it, so the channel between
     two panels is closed and shows two lit walls and a dark floor. The
     door stops at the rocker top at ring fraction 0.5185, which is y 0.420:
     the sill below it is the outer face of the rocker extrusion and belongs
     to the skin. ── */
  /* ONE GROUP PER LEAF, plus a third that does not move. Same meshes at the
     same coordinates as before; what changed is which group owns them, which
     is what a closure needs and what SPEC.md's closures section spells out.
     The camera stalk and its pod at x 0.980 are FORWARD of the front door's
     leading cut at 0.8487, so they are on the A-pillar and not on the door:
     they keep the `doors` part id and carry no hinge. */
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
