/* Wheels and brakes, Gen 9: the front comes in to meet the rear.

   Ancestry, cited by name and number throughout:
   wheels.js (Gen 1, 133 kg, 235/50 R19, Crr 7.2 kg/t), wheels-2.js (Gen 2,
   96 kg, 185/50 R21 and rear drums, Crr 5.2), wheels-3.js (Gen 3, 90 kg,
   the rear rim becomes the motor rotor carrier and the first annulus
   contract is written), wheels-6.js (Gen 5 apex, 84 kg, one-piece carbon
   wheels, C/SiC front discs, Crr 4.6), and wheels-7.js (Gen 7, 78 kg, the
   direct parent: 155/65 R20 at Crr 3.8, full covers, and the rear track
   narrowed to |z| 0.74). This slot skipped Gen 4, Gen 6 and Gen 8.

   THE MOVE. Front wheel centres go from |z| 0.81 to |z| 0.74, so the front
   track falls 1.62 m to 1.48 and the two tracks match again for the first
   time since Gen 5. Nothing else about the corner changes position relative
   to the wheel centre: the whole front assembly translates 70 mm inboard as
   a rigid body, which is the same discipline wheels-7 used at the rear.

   THE REAR ANNULUS CONTRACT IS BINDING AND UNTOUCHED, and this module
   verified it numerically rather than carrying wheels-7's prose. Both sides
   swept vertex by vertex against the rear wheel centre (-1.45, 0.355, 0.74):
   - wheels-9 puts ZERO vertices inside r 0.155 to 0.235 over |z| 0.65 to
     0.73. Inside that axial band its rear profile holds r 0.2480 or greater,
     measured at |z| 0.7220, which is 13 mm clear of the 0.235 ceiling.
   - drivetrain-7 fills it, measured off its built mesh inside the band:
     rotor rings r 0.1880 to 0.2330 over |z| 0.6580 to 0.7280, stator rings
     r 0.1352 to 0.1972 over 0.6500 to 0.7260, hub bearings out to r 0.1680
     over 0.6505 to 0.7290, corner inverters r 0.1288 to 0.1725 over 0.6501
     to 0.6610. Three of those reach BELOW r 0.155, into the bore rather
     than the band, which the contract permits and this module has to know
     about because its park brake lives there: that device holds r 0.100,
     so the tightest gap to drivetrain-7's deepest ring is 28.8 mm.
   - the flange plane is shared exactly: wheels-9 puts 1,392 vertices at
     |z| 0.6500 out to r 0.2440 (696 per side), drivetrain-7 puts 2,136
     rotor-ring vertices on the same plane at r 0.1880 to 0.2330.
   - explode matches: rear corner groups +-0.78, rear covers and
     drivetrain-7's rings +-0.90, SYSTEM.explode zero.
   Every rear part in this file is wheels-7's drawing at wheels-7's
   coordinates. The contract did not move and neither did the geometry.

   WHAT THE FRONT MOVE COSTS AND BUYS, measured, never quoted:

   1. STEERED SWEPT ENVELOPE. Sweeping every vertex of the built front tyre,
      wheel, cover and disc about the vertical axis through (1.45, 0.74):
      static |z| 0.6625 to 0.8190, and at lock the peak runs 0.8190 at 0
      degrees, 0.8926 at 14, 0.9097 at 17.25, 0.9238 at 20. The peak sits at
      hub height, 312 mm ahead of the axle while the cover binds and 334 mm
      once the tyre shoulder takes over. Full table on the front wheels
      panel. Body-8's arch louvers bind wheels-7 at 17.25 degrees
      with 5.5 mm of residual; run the same measurement on this corner and
      that same residual is not reached until 32.0 degrees.

   2. FRONTAL AREA. Front and rear tyre bands now coincide exactly at
      |z| 0.6625 to 0.8175, so the sub-loft tyre columns fall from 0.1260 to
      0.0868 m2, measured with the same 2 x band x 0.28 integration that
      produced body-8's 0.1036 and 0.1260. That is 0.0392 m2, and it is
      collectable with body-8 carried unchanged.

   3. ROLL. Front roll stiffness through the spring path falls as track
      squared, (0.74/0.81)^2 = 0.8346, so 16.5 percent. Solving suspension-9's
      BUILT front pickups rather than assuming a shortened arm, the roll
      centre falls with the track, 0.1037 to 0.0970, so the roll-moment arm
      lengthens and the injection suspension-9 owes to hold Gen 8's roll
      angle is 21.8 percent, MORE than the 19.8 the track term alone
      implies. The roll-couple distribution returns to 58.0/42.0, which is
      Gen 1's split exactly and which wheels-7 had pushed to 62.3/37.7.
      Details on the front wheels panel.

   Gen 9 preset partners, every cross-module number derived from their BUILT
   GEOMETRY per design/retro-gen4.md's drift law and re-derived here rather
   than inherited:
   - drivetrain-7: rear annulus as above; FRONT halfshafts reach |z| 0.7625
     exactly, which lands on wheels-7's hub face and overruns this module's
     relocated hub face by 70.0 mm. Reported on the front wheels panel.
   - body-9: the preset body, swept after it landed. Its front fairing
     inboard wall sits at |z| 0.6230 against the relocated tyre's inner face
     at 0.6625, its arch louvers moved to |z| 0.8750 to 0.9164 and up into
     y 0.580 to 0.733, and the nearest approach anywhere on the corner is
     41.8 mm, cover to fairing. At the 14 degrees suspension-9's rack
     actually commands, the swept solid clears the fairing by 19.5 mm. The
     interference this module reported against body-8 is therefore closed by
     the partner that shipped, and body-8's numbers are kept on the panels
     as the before half of the pair.
   - battery-7: floor lid, galleries, strike shield. NOT three clearances.
     Re-measured as penetration rather than as nearest-surface distance,
     this corner is INSIDE the pack in five places, up to 21.40 mm, over
     804 crossing triangle pairs, and wheels-7's disc was already 17.85 mm
     inside the lid before this generation moved anything. The whole item
     is rewritten on the discs panel and it is an open defect, not a
     clearance table.
   - suspension-9: the preset suspension, swept after it landed. It
     translates the corner as this module assumed, and the six parts that
     came inside 6 mm of suspension-4 go to knuckle 2.5 mm, subframe 4.0,
     air supply 10.0, rack 17.6, bar 46.1, damper 55.2, spring 64.0. At the
     rear it pulls its outer joint plane to |z| 0.60, taking suspension-4's
     364 vertices inside the annulus contract down to 13, and those 13 are
     48 V cable rather than structure. Both are reported on the panels with
     the suspension-4 figures kept as the before half.
   - hv-4: front zonal controllers at (1.16, 0.386, +-0.615) and the 48 V
     ring. Its by-wire feed run comes to 4.4 mm of the front wheel where it
     stood 33.4 mm clear of wheels-7, measured the same way.

   A DRIFT TRAP, named because it is live. P.wheelZ in js/common.js is still
   0.81 and this module does not touch it, exactly as wheels-7 did not touch
   it when it moved the rear. Every earlier generation reads it, and so does
   body-8: its fairing inboard wall is literally P.wheelZ minus 0.110. Edit
   the constant to 0.74 and eight modules move silently and one partner foul
   disappears by accident rather than by drawing. The front centre lives in
   FRONTZ below and nowhere else.

   THE CRISPNESS PASS, and what it was and was not allowed to touch.
   design/crispness.md is the shared vocabulary. Nothing about the
   engineering above moved: mass is 74 kg to the kilogram, the steered swept
   envelope returns 0.8190 / 0.8298 / 0.8512 / 0.8720 / 0.8821 / 0.8926 /
   0.9032 / 0.9097 / 0.9238 / 0.9337 at the same ten angles it did before,
   the rear annulus still holds zero vertices in the band with 13.0 mm of
   margin at r 0.2480, and the front hub face still realises
   front-halfshaft-outboard at |z| 0.6925 with a vertex 0.0 mm off the plane.
   35,016 triangles to 55,244, 92 percent of the 60,000 budget.

   Where those 20,228 went was decided by a ray test rather than by taste,
   because a full aero cover hides most of a wheel. See the block above the
   geometry. The short version: covers and tyres took 42 percent of the
   spend because they take 79 percent of the first hits, the disc took the
   next share because it owns the inboard view, and three features that a
   textbook would have added were measured and then not built.

   Five real defects turned up while measuring and are fixed rather than
   noted: the tread rings stood 3.3 mm proud of the crown and put the tyre
   below the ground plane; the disc's ceramic face band was a torus centred
   ON the friction plane and reached 5.0 mm INSIDE the caliper it is
   supposed to have 0.5 mm of; twelve rear flange bolts seated 1.9 mm inside
   the titanium ring they bear on; the rear shell and that ring drew the same
   annulus on the same plane; and the caliper's pistons landed directly on
   the disc with no pad between them. Each is named on the part that owns it.

   FOUR MORE THE REVIEW OF THAT PASS FOUND, all of them the pass's own new
   detail and all fixed here, with the measurement on the part that owns it:
   the four bayonet lugs per cover reached r 0.2543 because a 12 mm width was
   read as a centreline, putting their outer bottom corner 1.26 mm inside the
   tyre bead cone, 56 crossing triangles per side; the caliper's new pad
   backing plates fell wholly inside the caliper body and returned zero first
   hits over 216 directions at 1.11 mm per pixel; the banjo bolt was narrower
   than the boss it clamps and sat entirely inside it, which is the same
   fastener-in-its-own-host defect this file already fixed twice at the rear;
   and the master unit's new ECU heatsink drove two blades into thermal-9's
   air handler and three more through its own connector shells, a partner
   pair that was clean before the pass. 55,244 triangles to 55,068. Nothing
   else moved: mass 74 kg, the ten swept-envelope angles, the rear annulus,
   the |z| 0.6925 hub face and every published caliper extent are all
   bit-identical to the figures above.

   Spin rules as ever: corner groups spin about z in drive mode; calipers,
   park-brake backplates and the master unit do not. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'wheels-9',
  name: 'Wheels and brakes · Gen 9 matched track',
  color: 0xd0d6db,
  explode: [0, 0, 0],
  blurb: 'The other end of the move wheels-7 started. Front wheel centres come in 70 mm to |z| 0.74, the tracks match at 1.48 m for the first time since Gen 5, and the two tyre shadows stack back into one: 0.0392 m2 of frontal area straight off the integral, collectable with body-8 carried. The steered envelope shrinks 70 mm at every angle, which is the whole of what lets body-9 pull its fairings onto the flank: this module predicted another 0.0607 from a translated pod and body-9 measured 0.0722 from a redrawn one. 74 kg. The honest half: front roll stiffness falls 16.5 percent and the roll centre falls with the track rather than rising, so suspension-9 has to inject about 22 percent, MORE than the 19.8 the track term alone implies. Roll-over margin goes 1.55 to 1.48, and wheels-7 declined this exact narrowing for reasons that were correct at the time.',
  /* Mating features other modules have to land on. Schema in SPEC.md;
     tools/check-interfaces.sh proves these against the built mesh. The
     front hub face moves with the track, which is exactly the number
     drivetrain-7 did not follow: its shafts still end at wheels-7's 0.7625
     and overrun this plane by 70.0 mm. */
  interfaces: {
    'front-halfshaft-outboard': {
      kind: 'face', axis: 'z', at: 0.6925, tol: 0.002,
      part: 'front-wheels', mirrored: true,
      note: 'hub face inboard plane, ET47 off a rim centreline at FRONTZ 0.74. The titanium insert ring spans |z| 0.6925 to 0.7125.',
    },
  },
  parts: {
    tires: {
      name: 'Tyres',
      tagline: 'Unchanged in every dimension and every compound, and worth 0.0392 m2 of frontal area for the first time, because all four of them finally stand in the same two shadows.',
      mass: 28,
      count: 4,
      specs: [
        ['Size', '155/65 R20, load index 95, speed rating H (wheels-7, carried)'],
        ['Rolling resistance', '3.8 kg/t installed, carried construction and compound'],
        ['Cold pressure', '4.4 bar, now one placard figure for all four corners'],
        ['Envelope', 'OD 0.7100 m, faces at |z| 0.6625/0.8175 front AND rear'],
        ['Tyre columns', '0.0868 m2 against wheels-7\'s 0.1260, same integration'],
        ['Maturity', 'Production practice; the 4.4 bar casing rating is pilot line'],
      ],
      how: 'Not one number on the tyre itself moved. The section is 155, the rim is 20 inches, the sidewall is 100.75 mm, the pressure is 4.4 bar, the tread is 5.5 mm of low-void pattern on the same functionalised-polymer silica compound, and the installed Crr is the same deliberately pessimistic 3.8 kg/t wheels-7 carried into js/efficiency.js against a modelled 3.54. Reopening any of that would have been a second variable in a generation whose whole argument is a single translation, and design/retro-gen8.md is explicit that a rung claiming several wins at once should be distrusted. What changed is where the four of them stand.\n\nThe frontal-area arithmetic is this panel\'s work and it is done with ONE method run over BOTH configurations, which is design/retro-gen8.md\'s standing law after the Gen 7 area figure turned out to have been measured a different way from the Gen 8 one. The method is body-8\'s: below y 0.28 the silhouette is the tyre shadow, integrated as twice the union band width times 0.28. Measured off wheels-7\'s built meshes, its front tyre spans |z| 0.7325 to 0.8875 and its rear 0.6625 to 0.8175, so the union is 0.6625 to 0.8875, 225 mm per side, and the columns are 0.1260 m2. Measured off this module\'s built meshes, front and rear both span 0.6625 to 0.8175, the union is 155 mm per side, and the columns are 0.0868. The difference is 0.0392 m2, and no part of it depends on a body generation existing.\n\nThat number is bigger than the ladder has been quoting and the discrepancy is worth naming, because it is exactly the kind of drift design/retro-gen8.md was written about. body-8 measured the split-track penalty correctly at 0.0224 m2, which is the step from wheels-6\'s coincident 185-section shadow of 0.1036 up to wheels-7\'s split 155-section shadow of 0.1260. Then both body-8 and design/retro-gen8.md wrote that matching the tracks makes the columns "fall back to 155 mm per side, worth another 0.0224". Those two halves of the sentence do not agree with each other. Falling back to 155 mm per side is 0.0868, not 0.1036, because Gen 7 also made the tyre 30 mm narrower and the split track hid that gain inside a wider union. Recovering the split costs 0.0224; standing the narrow tyres in one shadow is worth 0.0392. Gen 7 paid for the extra 0.0168 two generations ago and this is the rung that collects it.',
      why: 'design/gen9.md asks this generation to pull three levers and to state plainly what each returns, including the one that returns least. This is the lever that returns most for the least engineering, and the reason is structural rather than clever: frontal area is a projection, projections add shadows that do not overlap, and two axles on different tracks project two shadows where two axles on the same track project one. Nobody had to invent anything. The ladder simply spent a generation with its axles in different places and only measured the bill afterwards.',
      fail: [
        'The load index was inherited without being checked and it does not survive checking. Taking the mass-weighted longitudinal centroid of every built part in the Gen 8 preset, which is the only fully built fleet, gives a 56.9 percent front static split, and at 0.74 g on the matched 1.48 m track with a 58 percent front roll couple the outer front tyre carries about 768 kg fully laden against load index 95\'s 690. This is INHERITED rather than created, and showing that needs one mass convention run over both rungs. Gen 8 laden is 1,800 kg against Gen 9\'s 1,788, and on that pairing the same calculation over wheels-7\'s 1.62 m track at its 62.3 percent couple also gives 768 kg: the narrower track raises the transfer term 9.5 percent, and the recovered roll couple plus twelve kilograms of preset hand back the same amount, so Gen 9 leaves the worst-loaded corner exactly where it found it, 78 kg over. Pricing it against wheels-7\'s own 1,804 kg Gen 7 laden figure instead would have shown Gen 9 adding five kilograms, and that five is a convention artefact, not a load. The correct fix is load index 100, which is about half a kilogram of casing per tyre, and it is named rather than taken because changing the tyre is exactly the second variable this generation refused.',
        'Aquaplaning and wet grip move in opposite directions and the second one is a genuine repair. wheels-7\'s fail list recorded that its 70 mm of rear offset meant the rear tyres no longer ran in the fronts\' cleared track, so on standing water the rear axle met water the front tyre had not moved. Matched tracks delete that defect completely: the rear tyre now follows the front through the same path. What does not improve is the underlying tyre, which still has 3.9 mm of usable tread above the legal floor rather than 5.9, so the car is better in deep water than wheels-7 and no better on a merely wet road.',
        'One placard pressure for four corners sounds like a simplification and is partly a loss. wheels-7 could tune front and rear pressures separately against two different tracks and two different load cases; this configuration has one geometry, so a pressure change to fix understeer changes rolling resistance at both ends at once. The tuning freedom that the split track accidentally provided is gone, and the compensation is suspension-9\'s bars rather than the tyre.',
      ],
      explode: [0, 0, 0.85],
    },
    'front-wheels': {
      name: 'Front wheels',
      tagline: 'Seventy millimetres inboard, and the swept envelope goes with them. This is the panel body-9 needs.',
      mass: 11,
      count: 2,
      specs: [
        ['Wheel centre', '(+-1.45, 0.355, +-0.74); front track 1.48 m (was 1.62)'],
        ['Size', '20 x 5.0J, ET47 off the hub face plane, now at |z| 0.6925'],
        ['Swept envelope', '|z| 0.8190 static, 0.8926 at 14 deg, 0.9097 at 17.25'],
        ['Roll stiffness', 'Spring path x0.8346; roll centre DOWN 6.7 mm to 0.0970'],
        ['Roll couple', '58.0/42.0 front/rear, from Gen 7 and Gen 8\'s 62.3/37.7'],
        ['Maturity', 'Pilot line, wheel carried from wheels-6 without a change'],
      ],
      how: 'THE SWEPT ENVELOPE, which is the deliverable. Every vertex of the built front tyre, wheel, cover and disc was rotated about the vertical axis through (1.45, 0.74) and the maximum |z| recorded, because a single corner of a bounding box is not an envelope and body-7 was caught sizing a fairing against one. Static the corner reaches 0.8190 at the cover lip, 1.5 mm outboard of the tyre face at 0.8175. Under lock: 0.8298 at 2 degrees, 0.8512 at 6, 0.8720 at 10, 0.8926 at 14, 0.9032 at 16, 0.9097 at 17.25, 0.9238 at 20, 0.9337 at 22. The binding feature is the cover disc out to about 12 degrees and the tyre shoulder beyond it, and the peak sits at hub height y 0.355 throughout, 312 mm ahead of the axle while the cover binds and 334 mm once the shoulder does. Fore and aft the solid spans x 1.0932 to 1.8068 at 14 degrees and it tops out at y 0.7100. Those last two figures moved 3.3 mm in the crispness pass and no |z| moved at all, because the two smooth rings that used to stand for a tread stood at r 0.3583, 3.3 mm proud of the crown, and the tread is now cut INTO the crown instead. The old rings also put 3.3 mm of tyre below the ground plane at y -0.0033. The tyre now touches y 0.0000 exactly, which is what a wheel centre at y 0.355 on a 0.355 m radius means. Sliced into 50 mm height bands at 14 degrees, so a pod can be shaped rather than boxed: y 0.00 gives 0.8258, y 0.10 gives 0.8689, y 0.20 gives 0.8839, y 0.30 gives 0.8919, y 0.35 gives 0.8926, y 0.40 gives 0.8919, y 0.50 gives 0.8865, y 0.60 gives 0.8700, y 0.70 gives 0.8362. Every one of those is exactly 70 mm inboard of the same measurement on wheels-7, because the corner translated rigidly, and that is the single most useful property of this generation: body-9 does not need a new clearance study, it needs a subtraction.\n\nWhat the envelope is worth, measured against body-8\'s built loft rather than its prose. body-8\'s pod holds 1.008 half-width at station x 1.450, y 0.42, and its arch louver blades run |z| 0.9569 to 0.9986. Sweeping this corner against those two clouds and against wheels-7\'s corner with the same code: the louver residual that binds wheels-7 at its published 17.25 degrees is 5.5 mm, and on this corner that same residual is not reached until 32.0 degrees. The crossing angle is the honest way to state it, because a rigid 70 mm translation moves the whole swept surface 70 mm in z at every angle and every station, so whatever measure the residual is taken with, the question is only how many more degrees it takes to spend 70 mm at the blade the louvers bind on. So the 70 mm is a single currency and body-9 has to choose. Spend it all on lock and the pod stays at 1.008 and the contained lock roughly doubles. Spend it all on area and the pod comes to 0.938 at its widest, holding today\'s clearances exactly, which measured on body-8\'s own station integrator is 0.0607 m2 off the silhouette above y 0.28. Add this module\'s 0.0392 of tyre column and the front lever is 0.0999 m2 total. On the module convention that puts body-8 at 2.121 the answer is 2.020; on the audit convention that puts body-8 at 2.157 it is 2.057. design/gen9.md asks body-9 for 2.02 on the audit convention, and a translated pod says 2.057, so the target is 0.037 short before body-9 draws a line. That was said here rather than left for the integrator, because Gen 8 missed an area target it was never able to hit and design/retro-gen8.md asked for the warning to arrive earlier next time.\n\nbody-9 has drawn that line and beaten the estimate, which is recorded here rather than left as a stale prediction. It did not translate the pod, it deleted it: stations 3 to 5 go to a flat 0.925 half-width, the fairing becomes the flank, and its four-term integrator run over BOTH bodies measures 2.0415 on the audit convention. The 0.0392 of tyre column on this panel comes through into that total unchanged, to four decimals, which is the check that matters: two modules, two integrators, one number. The warning was still the right warning. The target is missed by 0.022 rather than 0.037, and it is missed for a reason no body can fix, which is that a third of the front lever is tyre shadow below y 0.28.\n\nIn miles, run through js/efficiency.js\'s own model on the Gen 8 configuration so both ends of the comparison use one method: Gen 8 ships at 117.2 Wh/mi and 1,621 miles, this module alone takes it to 116.3 and 1,633, and body-9 pulling the pod in with it takes it to 114.8 and 1,655. Twelve miles collectable with body-8 carried unchanged, 34 for the whole front lever. Those two runs stand at 1,396 and 1,386 kg, which is Gen 8\'s measured 1,400 less the mass each step itself removes, four kilograms of disc here and ten of nose structure there, so the mass term is neither double counted nor borrowed from thermal-9 and suspension-9, whose contributions belong to their own panels. With body-9\'s measured 2.0415 in place of the 2.057 estimate the pair reads 114.5 Wh/mi and 1,659 miles, so 38 miles rather than 34.\n\ndesign/retro-gen8.md priced "front track to 1.48 m" at 37 miles and A 2.047, and measured, that price was attached to the wrong object. The track change ALONE returns 12 miles and A 2.1178. It reaches the retro\'s neighbourhood only once the body the envelope unlocks is redrawn, at 38 miles and A 2.0415. So the retro was 25 miles optimistic about what a wheel module can deliver and one mile pessimistic about what the pair can, which is an estimate landing near the right answer for the wrong reason, and is exactly the failure design/retro-gen8.md made one method over both rungs a standing rule to catch. Note what is NOT in the numbers this panel books: no Cd credit at all. A narrower fairing has a smaller wake, but wake is a body measurement and this module does not book a coefficient it cannot measure. body-9 has since booked one count for one named mechanism, a 20.7 degree fairing shoulder deleted, 0.108 to 0.107 provisional until it is audited in its own right. Carrying that count takes the pair to 114.2 Wh/mi and 1,664 miles, and it belongs on body-9\'s panel rather than this one because a wheel module that starts crediting itself with drag coefficients is how a ladder loses track of who measured what.\n\nROLL, and what suspension-9 owes. Ride frequency is held by construction on this car, because suspension-4\'s air springs scale load and rate together, so the wheel rate is a fixed quantity and the spring path\'s roll stiffness goes as track squared: (0.74/0.81)^2 is 0.8346, a 16.5 percent loss at the front. The roll centre decides whether that is the whole bill, and it depends on HOW the corner narrows, so the answer is taken from suspension-9\'s built pickups rather than assumed. Solving suspension-4\'s built front wishbone lines in the z-y plane, inner pivots (0.45, 0.25) and (0.38, 0.55) against ball joints (0.71, 0.235) and (0.70, 0.565), the Gen 8 instant centre sits at z -2.450 and the front roll centre at 0.1037 m. The tempting reading is that shortening the arms buys something: translate ONLY the outer joints 70 mm inboard, hold the inner pivots, and the instant centre swings to -1.739 while the roll centre RISES to 0.1262. That corner does not exist. suspension-9 translates the inner pivots with the joints, to |z| 0.38 and 0.34 against ball joints 0.64 and 0.63, precisely so that arm lengths, camber gain, caster and bump steer all carry, and solving THAT puts the instant centre at -2.381 and the roll centre at 0.0970. Measured off the partner that shipped, the front roll centre FALLS 6.7 mm. A pure translation would give 0.0947, because rigid translation scales roll centre height by the track ratio exactly; the 2.3 mm back is suspension-9 parking its upper inner pivot at 0.34 rather than 0.31 to clear drivetrain-7\'s front housing.\n\nThat reverses the conclusion, and the reversal is the number body-9 and suspension-9 both have to plan around. Against a 0.500 m centre of gravity the front roll-moment arm LENGTHENS from 0.3963 to 0.4030, 1.7 percent, so the elastic path is asked for more rather than less. suspension-9 has to inject 21.8 percent of front roll stiffness to hold Gen 8\'s roll angle, MORE than the 19.8 percent the track term alone implies, not less. Kinematic congruence is not free: the property that makes suspension-9\'s corner carry every calibration it inherited is the same property that denies it the roll-centre rise a shortened arm would have handed over. The distribution is the part that gets better without anyone paying: Gen 1 tuned 58/42, wheels-7 narrowed only the rear and pushed it to 62.3/37.7, and scaling the front by the identical 0.8346 puts it back at 58.0/42.0 exactly. So suspension-9 must add its 21.8 percent at the front and the matching amount at the rear, or the balance it just recovered moves again. One number the injection cannot be checked against, and this is a live item rather than an inherited one: suspension-4\'s front bar arm measured 0.14 m in its built mesh, from the torsion axis at x 1.70 to the arm end at x 1.56, which is short enough that the 22 mm bar it draws there would behave as a rigid link rather than a spring. suspension-9 has shipped, grew the bar to 27.7 mm, and left the arm at exactly 0.14 m: torsion axis still x 1.70, drop-link pickup at (1.56, 0.33, 0.53). So the partner that owes 21.8 percent of front roll stiffness is claiming it through a lever whose built geometry cannot produce a bar rate at all. The 21.8 is a requirement this module can state and a number nobody can yet verify from geometry, and that is the honest status.',
      why: 'wheels-7 held this track deliberately and wrote the reason down: "this is the axle carrying three quarters of the braking and all of the steering into a generation that has already given away 13 percent of tyre grip, and narrowing both ends is how a range car becomes undriveable one defensible decision at a time." That was correct in Gen 7 and four things have changed since. The price was wrong: wheels-7 valued this at 0.049 m2 and about 17 miles because the tyre-column term had not been discovered yet, and measured now it is 0.0999 m2. The catcher exists: design/gen9.md commissions suspension-9, where Gen 7 had a suspension slot frozen since Gen 4 and no partner able to put roll stiffness back, so wheels-7 was declining a narrowing nobody was going to catch. The spender exists: Gen 7 already had 69 unspendable miles of tail closure on the books and refusing to create a second unspendable credit was discipline, whereas Gen 9 runs the wheel, the suspension and the body in one rung. And the balance argument inverted: narrowing the front does not compound wheels-7\'s handling bill, it repairs the asymmetry that bill was made of, returning the roll couple to the split five generations were tuned around.',
      fail: [
        'suspension-4 as shipped cannot hold this corner and the distances are measured, not estimated. Sweeping every vertex of its built mesh against the relocated front corner, the same sweep run over wheels-7 for a matched pair: its front-structure knuckle comes to 0.9 mm of the wheel against 4.5 mm before, its front damper body to 1.5 mm of the disc against 50.3, its air-supply line to 3.2 mm against 45.0, its steering rack to 4.7 mm against 22.6, its anti-roll bar to 4.8 mm against 44.3, and its front air spring to 5.4 mm against 59.0. Six parts inside 6 mm, five of which were outside 20. None of this is a defect in suspension-4, which was drawn for a 1.62 m track and says so; it is the statement that the front corner does not relocate without suspension-9. suspension-9 has since shipped and the item is NOT closed, though it is much better. Every figure above and the seven that used to follow here for suspension-9, knuckle 2.5 mm to the wheel, subframe 4.0 to the disc, air supply 10.0, rack 17.6, bar 46.1, damper 55.2, spring 64.0, ending "nothing inside 2 mm and nothing that is not a designed clearance", are nearest-VERTEX readings and none of them reproduces. Re-measured surface to surface, one method over both suspensions against this wheel, the corner INTERPENETRATES both. suspension-4 crosses it in 20 part pairs over 6,717 crossing triangle pairs, deepest 47.29 mm where its rear structure passes through the rear wheel. suspension-9 crosses it in 9 part pairs over 3,163, deepest 20.00 mm where its rear structure passes through the park brake, then the steering 14.79 mm into the disc, front structure 14.78 into the disc, front knuckle 13.83 into the disc and 10.91 into the caliper, the 48 V feeds 12.46 into the front wheel, rear steer 9.79 and rear structure 7.27 into the master unit, and rear steer 2.46 into the park brake. Those totals are larger than the 14 over 4,727 and 5 over 1,224 first published on this panel, and the difference is not a change of method. Every figure that was published reproduces: both 47.29 and 14.79 to the digit, and the five suspension-9 pair counts to the pair, 212 + 148 + 572 + 35 + 251 against the 218 + 148 + 572 + 35 + 251 written down, the single six-pair change being edge touches that tools/check-interfaces.sh\'s predicate now refuses on the same tolerance as everything else. What was missing was two parts of THIS module. The earlier sweep walked a corner part list and left out park-brake and master-unit, and drop those two from the new numbers and 20 over 6,717 becomes exactly 14 over 4,720 and 9 over 3,163 becomes exactly 5 over 1,218. The omission mattered for one reason: suspension-9\'s deepest crossing anywhere on this wheel is not at the relocated front corner at all. It is 20.00 mm of rear structure through the park brake over 1,416 pairs, at the REAR, on the axle this generation deliberately did not touch, and a front-corner part list can never see it. So the direction of the story holds and is worth keeping, 47 percent of the crossings and 42 percent of the depth rather than the quarter and the third this panel claimed, but "nothing inside 2 mm" is not what this geometry builds and a clearance cannot be quoted across an intersection. THIS IS A SECOND OPEN DEFECT on this corner, separate from the pack one below, and it is left open for the same reason: it belongs to two slots. The suspension-4 column stays on this panel because it is the before half of a matched pair and because stepping the ladder back to Gen 8 puts it under this wheel again.',
        'drivetrain-7\'s front halfshafts overrun the relocated hub. Measured off its built mesh, the outboard end of each front shaft sits at |z| 0.7625, which lands exactly on wheels-7\'s hub face plane and is the correct joint on that car. This module puts the hub face at 0.6925, so the shaft ends 70.0 mm outboard of the face it drives into, passing through the wheel\'s hub insert, its spoke web and the cover behind it. The fix is one dimension, 70 mm off each front shaft, and it is drivetrain geometry. Worth stating that design/retro-gen8.md recorded this same interface failing in the other direction one generation ago, when a review found those shafts ending 10 mm SHORT of their wheel: the front halfshaft length has now been wrong at two consecutive rungs, in opposite directions, and it should be derived from the wheel rather than carried.',
        'body-8\'s front fairing does not merely become oversized, it becomes interference. Its sealed inboard wall is a 14 mm panel spanning x 1.050 to 1.850, y 0.335 to 0.735 at |z| 0.693 to 0.707, and its position is written in the source as P.wheelZ minus 0.110. The relocated tyre\'s inner face is at |z| 0.6625, so where the wall stood 25.5 mm clear of wheels-7 it is now buried 30.5 mm inside the tyre, and 144 of this module\'s vertices per pair sit inside its box. body-9 has redrawn the pod for this envelope, and the sweep re-run over it closes the item: its fairing inboard wall lands at |z| 0.6230, 39.5 mm inboard of the tyre face, zero vertices of this module fall inside it, and the nearest approach anywhere on the corner is 41.8 mm from the cover to the fairing surface. The point worth carrying is that carrying body-8 unchanged was not merely suboptimal here, it was geometrically impossible, and the drift trap is that editing P.wheelZ would have made the foul vanish without anyone drawing a line.',
        'The roll-over margin is a real loss and it is the third consecutive generation to take one. Static stability factor on a 0.500 m centre of gravity goes 1.620 at Gen 5\'s matched 1.62 m track, 1.550 on Gen 7 and Gen 8\'s 1.55 m mean, and 1.480 here. That is 8.6 percent off the apex car, it is still far above anything with a roof over it, and it is not recoverable by control: a bar can move where load transfers, it cannot move the point at which the inside wheels leave the ground. Lateral load transfer at the front rises by the reciprocal of the track ratio, 9.5 percent, on the axle that steers.',
      ],
      explode: [0, 0, 1.15],
    },
    'rear-wheels': {
      name: 'Structural rear wheels',
      tagline: 'Not one coordinate changed. The panel exists to prove the contract survived a generation that moved the other axle.',
      mass: 12,
      count: 2,
      specs: [
        ['Wheel centre', '(-1.45, 0.355, +-0.74); rear track 1.48 m, carried'],
        ['Flange face', '|z| 0.65 exactly; 1,392 vertices on the plane out to r 0.2440'],
        ['Motor annulus', 'r 0.155 to 0.235 over |z| 0.65 to 0.73, left void'],
        ['Void margin', 'Zero vertices in the band; r 0.2480 at |z| 0.7220, 13 mm clear'],
        ['Change this generation', 'None. Every coordinate is wheels-7\'s'],
        ['Maturity', 'Pilot line; the co-cured titanium flange stays extrapolated'],
      ],
      how: 'This is wheels-7\'s rear wheel at wheels-7\'s coordinates, and the reason it gets a panel rather than a footnote is that a generation which moves one axle is exactly the generation most likely to disturb the other one by accident. So the contract was re-verified from built geometry on both sides rather than read out of either module\'s comments. Inside the contract band this profile holds r 0.2480 or greater, and the tightest point is the drop-well floor at |z| 0.7220, 13 mm clear of the 0.235 ceiling. Zero vertices fall inside the band with a half-millimetre inset. On the flange plane at |z| 0.6500 this module puts 1,392 vertices, 696 per side, running out to r 0.2440, and drivetrain-7 puts 2,136 rotor-ring vertices on the same plane at r 0.1880 to 0.2330, so the joint is face to face. What fills the rest is drivetrain-7\'s and it was measured too, inside the band: stator rings r 0.1352 to 0.1972 over |z| 0.6500 to 0.7260, hub bearings out to r 0.1680 over 0.6505 to 0.7290, corner inverters r 0.1288 to 0.1725 over 0.6501 to 0.6610. Three of those reach below r 0.155, which is the bore rather than the band and is drivetrain-7\'s to spend, but this module has to know the figure because its own park brake is the other tenant down there. That device holds r 0.100, so the tightest gap in the bore is 28.8 mm to the corner inverter, and nothing of this module\'s crosses the flange plane.\n\nThe rest of the drawing is unchanged and is described here so the panel stands alone. Twelve flange bolts sit on the r 0.225 circle with heads spanning |z| 0.6382 to 0.6460, wholly inboard of the contract plane, seating ON the inboard face of a 2 mm co-cured titanium ring that runs 0.646 to 0.650, so they bear on metal. That is a correction rather than a restatement: the bank used to be centred so its seating face landed at 0.6479, which is 1.9 mm INSIDE the ring it is supposed to bear on, and a bolt head grown into a laminate is not a bolted joint. The ring also now owns the whole flange face out to r 0.2440 on its own, where the CFRP shell used to draw the same annulus on the same plane and the two fought for the same pixels. The bore is a pilot at r 0.0605 to 0.072 over |z| 0.730 to 0.756 that seats over drivetrain-7\'s hub spigot with half a millimetre of fit and now carries a lead-in chamfer at its mouth, closed outboard by a clamp web at 0.732 to 0.7376 whose five nuts sit at |z| 0.7376 to 0.7471, so the pilot takes the axial clamp and the twelve flange bolts take the torque. The drop well is 6 mm deep against the front wheel\'s 24, because a 0.230 floor would put carbon inside the annulus at |z| 0.722, and that remains a shop-equipment consequence of putting a motor inside a wheel.\n\nOne thing did change about this wheel and it is not in its geometry. For three generations the rear corner has been the odd one: wheels-3 gave it a motor, wheels-6 gave it a different cover, wheels-7 gave it a different track. Matching the front track removes the last of those asymmetries, so the two axles now differ in exactly one respect, which is that this wheel bolts to a flange and the front one bolts to a hub face. That is the difference that has a reason.',
      why: 'design/gen9.md calls the rear annulus contract binding and unchanged, and the useful thing a module can do with a binding contract is prove it rather than assert it. The proof is worth the panel because the failure mode is silent: nothing in this file touches the rear corner, so a drift would have to arrive through a shared constant or through a partner moving, and both have happened on this ladder before. Measuring both sides of the joint from built meshes is the only check that catches either.',
      fail: [
        'The co-cured titanium flange is still the extrapolated claim, unchanged since wheels-6 and unchanged here. What must become true: a titanium-to-CFRP co-cure holding bolt preload through a design life of drive-to-regen torque reversals at hub temperature and salt exposure, with no delamination signature. Rigs show it, fleets close it, and until then the joint is inspected at every tyre change.',
        'The rear corner inherited wheels-7\'s open report against suspension-4 in full, and matching the front track did nothing for it: suspension-4\'s rear geometry is drawn around a wheel at |z| 0.81 and puts 364 vertices inside the annulus contract band, knuckle plate and both upper ball joints among them, with its 48 V leads across the stator. This module re-measured that and confirmed it, and flagged that if the rear knuckle did not translate too, Gen 9 would ship a Gen 7 defect two rungs old. suspension-9 translated it: rear outer joint plane to |z| 0.60, rear structure now stopping at 0.6395 outside the band, and the 364 breaching vertices down to 13. What is left is not structure. The 13 are 48 V cable at r 0.1657 and |z| 0.7100, inside a band reserved for a motor, and the honest reading is that the contract is 99.6 percent clean rather than clean. Reported here because this module owns the wheel side of that band and nobody else will sweep it.',
        'A rear wheel that did not change is a rear wheel that did not get re-validated. The 13 mm annulus margin, the 0.5 mm pilot fit and the 12-bolt flange were all sized against drivetrain-7 as built, which is right, but the corner now sees a different load spectrum: the rear axle\'s share of lateral load transfer rises from 37.7 to 42.0 percent when the roll couple returns to 58/42, so the outer rear wheel bearing and this flange see about 11 percent more transferred load in a limit corner than they did in Gen 8. The parts are the same and the duty is not.',
      ],
      explode: [0, 0, 0.78],
    },
    covers: {
      name: 'Full-face covers',
      tagline: 'One part number for four corners, second generation running, and now four identical positions to go with it.',
      mass: 6,
      count: 4,
      specs: [
        ['Type', 'Full-face CFRP disc, flush to the tyre section, no moving parts'],
        ['Extent', 'r 0.048 inlet bore to r 0.312, seated on the rim flange lip'],
        ['Mass', '1.5 kg each, carried from wheels-7 without a change'],
        ['Outer lip', '|z| 0.8190 at all four corners (wheels-7: 0.8890 front)'],
        ['Brake air', 'Fixed 6 mm annular exhaust slot, now fed 188 m3/h'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The cover is wheels-7\'s and the construction argument is not reopened: a shallow CFRP dish from a r 0.048 inlet bore out to r 0.312, seated all the way round on the rim flange lip at r 0.2665 and flaring outboard so its edge stands 1.5 mm proud of the tyre section maximum, closing the annular gutter between rim flange and tyre shoulder. wheels-3 made the cover a fan, wheels-6 put the fan on pivots, wheels-7 deleted the mechanism when drivetrain-7 stopped making the heat that justified it. Nothing on that argument changed.\n\nWhat changed is that the four covers are now at the same |z|. wheels-7 had front lips at 0.8890 and rear lips at 0.8190, and that 70 mm is the whole of the frontal-area story the tyres panel tells: the outermost feature of each corner, front and rear, is this lip, and until this generation the front lip and the rear lip cast two shadows. They now cast one. The cover is therefore the part that literally defines the outer edge of the tyre column integral, and it is worth saying that the part which owns the number changed nothing to earn it.\n\nOne number on this panel does move, and it moves the wrong way. The front brake exhaust slot is fed by the disc, and the disc on the next panel goes from a 24 mm vane passage to 18 mm, so the flow through this cover falls from about 250 m3/h to about 188 at 100 km/h. The slot itself stays at 6 mm, 0.0118 m2 of exit area between the cover edge at r 0.312 and the tyre shoulder, because an exit sized for the higher flow is not a penalty at the lower one: it simply runs at a lower exit velocity into the wheel\'s own low-pressure region. Keeping it oversized is deliberate and is the opposite of the decision on the disc, where margin was spent. Exit area is free and thermal mass is not.',
      why: 'The interesting property of this part in Gen 9 is that it demonstrates the difference between a part that changed and a part that mattered. Nothing here was redrawn, and yet the covers are where the 0.0392 m2 physically lives, because frontal area is decided at the outermost surface and this dish is it. A module that only wrote panels for the parts it edited would have left the reader without the part that owns the number, which is the same error as reporting a Cd without a frontal area.',
      fail: [
        'A full cover is a full cover in a kerb strike, unchanged from wheels-7: the dish stands proud of the tyre section at its outer edge, which is the first thing a kerb touches, and a cracked cover is a whole cover. What is new is that the front covers have moved 70 mm into the arch and body-9 has drawn its pod tight to the envelope on this panel: the measured gap from this cover to the fairing surface is 41.8 mm, where body-8\'s oversized pod stood 91.7 mm off the same part. That is 50 mm of hand and tool access gone from the bayonet ring, bought with the frontal area on the tyres panel, and it is a service cost rather than an engineering one only until somebody has to change a cover in a car park.',
        'The rear cover still rides the 0.90 explode vector rather than the corner\'s 0.78, matching drivetrain-7\'s rotor rings, exactly as wheels-3, wheels-6 and wheels-7 all disclosed. The real-world echo is unchanged: the cover cannot come off with the motor ring in place, so a cover service is a corner service. The front covers ride 1.45 and have no such constraint, which is now the only remaining behavioural difference between the two ends.',
        'The front brake air path is scheduled by a louvre this module does not own, and the body generation has now redrawn it. body-8 opened its arch louvers on a brake-temperature model at |z| 0.9569 to 0.9986 across y 0.450 to 0.613, beside the wheel. body-9 has moved the bank to |z| 0.8750 to 0.9164 across y 0.580 to 0.733, which is up out of the steered envelope and above the cover\'s exhaust slot rather than beside it. Nobody has re-derived the flow across that change, and this is the module that has to say so: the 188 m3/h on the specs row is a pumped figure for the disc, not a measured exhaust into a pressure field that moved 150 mm up and 80 mm inboard. The disc behind this cover has 3,000 J/K rather than wheels-7\'s 4,000 to absorb the difference if the schedule is wrong.',
      ],
      explode: [0, 0, 1.45],
    },
    discs: {
      name: 'Front brake discs',
      tagline: 'The one part that got smaller, and the only place this generation found four kilograms. It was bought with temperature, not with a lighter duty.',
      mass: 7,
      count: 2,
      specs: [
        ['Size', '365 x 30 mm vented C/SiC (wheels-7: 365 x 40 vented)'],
        ['Continuous case', '13.68 kW per disc, re-derived; wheels-7 assumed 13.8'],
        ['Thermal mass', 'About 3,000 J/K against wheels-7\'s 4,000'],
        ['Internal vanes', '36 curved vanes in 18 mm, about 188 m3/h at 100 km/h'],
        ['Steady descent', 'About 740 to 800 C ring (wheels-7: 650 to 700)'],
        ['Maturity', 'Production practice'],
      ],
      how: 'First the honest half, because it comes first in the reasoning. The sizing case did NOT get easier. Re-deriving it from the preset rather than from a design document: summing the built modules and taking design/gen9.md\'s briefed masses for the three that are not built yet, the Gen 9 preset comes to 1,388 kg against Gen 8\'s measured 1,400, so 1,788 laden, and a 10 percent grade at 60 km/h delivers 29.09 kW of gravity power, of which rolling takes 1.11 at Crr 0.0038 and aero takes 0.62 at the front-narrowed CdA. That leaves 27.36 kW for the friction brakes and 13.68 kW per front disc, against the 13.8 wheels-7 computed. Nine tenths of one percent. Worse, the aero term moved the wrong way on purpose: a cleaner car is a car whose air does less braking on a descent, so every count this generation buys is a watt the disc has to take instead. Anyone expecting a narrower track to shrink a brake should read that paragraph twice.\n\nSo the eight millimetres came out of temperature margin, and the module says so rather than dressing it as efficiency. C/SiC is comfortable well past 1,200 C and wheels-7 held the ring at 650 to 700 on the descent it was sized for, which is a large unused margin in the material and a deliberate one in a generation that had just made the drivetrain weaker. Gen 9 spends it. The ring becomes two 6 mm friction plates with 36 curved vanes in the 18 mm between them, spanning |z| 0.604 to 0.634 at r 0.145 to 0.1825, so the equivalent solid section falls from 21.0 mm to 15.8 and the thermal mass with it, roughly 4,000 J/K to 3,000. Passage area falls with the gap, so pumped flow goes about 250 m3/h to 188 at 747 rpm. Steady state on the descent is a balance between the 13.68 kW going in and the convection taking it out, and cutting the vane path by a quarter raises the equilibrium ring temperature from 650 to 700 C into the region of 740 to 800. The single-stop case barely notices: 0.52 MJ per disc after transfer on a 3,000 J/K ring is a 173 C rise against 130.\n\nThe diameter was checked again rather than assumed, because it is the constraint that forced wheels-7 into thickness in the first place. suspension-4\'s upper front ball joint sits at radial 0.210 from the wheel centre with a 0.024 sphere, inner edge 0.186, clearing the r 0.1825 ring by 3.5 mm. Translating the corner 70 mm inboard moves that joint in z and not in radius, so the clearance is exactly what it was and a 380 mm ring is exactly as impossible as it was in Gen 7. suspension-9 has since shipped a translated corner and the check re-runs against it rather than against the prediction: its front knuckle reaches radial 0.2335 and stands 6.5 mm off this ring in three dimensions, which is the same 3.5 mm radially with the axial offset added back. The lower joint\'s outer edge is still at radial 0.144 against the 0.145 ring bore, 1.0 mm. Both numbers survive the move because a rigid translation cannot change a radius, which is the same property that let this generation move an axle without redrawing a single part around it.',
      why: 'design/gen9.md asks for the real mass figure rather than the wished-for one, and the real figure at a corner that only moved sideways is zero: a translated wheel weighs what it weighed. Four kilograms had to come from a decision, and the choice was between shaving margin off several parts, which is how a ledger quietly stops meaning anything, or taking it all out of one place where the margin is measurable and the cost lands on one panel. It went here because the excess was largest and best characterised: a ceramic ring held 500 degrees below its material limit by a generation that was being careful about a drivetrain change. The gain names its cost in one sentence: 4 kg of unsprung rotating mass at the front, bought with 100 degrees of ring temperature on the case that sizes it.',
      fail: [
        'The pads become the limiting component and they were not the limiting component before. C/SiC handles 800 C without complaint; the organic and metallic binders in the pad do not, and their friction window closes near the top of that range. wheels-7\'s descent ran the pad comfortably inside its band and this one runs it at the edge, so the fade that C/SiC was chosen to eliminate returns at the far end of a long alpine descent as a pad property rather than a disc property. It is the single weakest claim in this module, exactly as wheels-7 flagged its own 13.8 kW estimate, and the honest statement is that it is closed on a rig and not by a fleet.',
        'A narrower vane passage packs sooner. wheels-7 already warned that a vented ring can fill with brake dust and salt until the passage is a fraction of its area, and that the symptom is a disc running 150 degrees hotter rather than a noise. An 18 mm passage reaches that state on less debris than a 24 mm one, and it starts from a ring already 100 degrees hotter, so the same neglect that cost wheels-7 a hot descent costs this one a pad.',
        'THE PACK CLEARANCES ON THIS CORNER DO NOT EXIST, and this panel published three of them as measurements. Re-swept against battery-7 as built, one method over wheels-7 and wheels-9 both, this corner and the pack INTERPENETRATE in five places: the tyre is 21.40 mm inside the floor lid over 108 crossing triangle pairs, 14.71 mm inside the coolant galleries over 336 and 12.83 mm inside the strike shield over 120; the rim is 17.35 mm inside the floor lid over 72; the disc is 15.32 mm inside the floor lid over 168. Eight hundred and four crossing pairs. A clearance of 2.8 mm to the strike shield is not a tighter version of a 12.83 mm overlap, it is a different fact, and the sentence that stood here reported the second as the first.\n\nThe before column was wrong too, which matters more, because a comparison measured two ways is this project\'s named failure class. Run the same sweep over wheels-7 and its disc does not clear the pack by 2.0 mm: it is 17.85 mm inside the floor lid over 99 crossing pairs. So the worst thermal adjacency on the car was already an interference at Gen 7, and the 19 mm repair this panel claimed was never on the table. What wheels-7 genuinely clears, measured as the true separation of the two surfaces: tyre to strike shield 35.09 mm against the 32.9 published, tyre to galleries 42.50, rim to galleries 50.15 against the 64.3 published, tyre to floor lid 22.50, rim to floor lid 30.00. Of the four figures this panel carried, exactly one survives contact with the geometry and only roughly: the rim clears the galleries by 4.38 mm, not 6.2. It is the only pack clearance this corner has.\n\nThat 4.38 wants its own sentence, because the first correction of this panel got it wrong in the same way the panel did. A clearance is the distance between two SURFACES. Walk the wheel\'s VERTICES to the pack\'s triangles instead and you miss every case where the closest approach lands on a triangle edge, which is exactly what happens here: the flange lip\'s nearest vertex reads 5.79 mm and the surfaces are 4.38 mm apart, the true minimum falling near (1.2025, 0.2600, 0.6704) where no vertex sits. Sampling the wheel surface on a barycentric grid converges on 4.38 from above, 4.457 mm at four subdivisions to 4.397 at thirty two. Two of the wheels-7 figures moved for the same reason, tyre to floor lid from 25.27 to 22.50 and rim to floor lid from 32.06 to 30.00, and both of those are flat plane to flat plane once measured properly: the floor lid\'s outboard edge stands at |z| 0.710 and wheels-7\'s tyre and rim inner faces at 0.7325 and 0.7400. The penetration depths in the paragraph above are unaffected, because a penetration is measured between surfaces already.\n\nThe mechanism is worth more than the correction. battery-7 is 1.56 m across its rocker rails and its floor lid reaches |z| 0.744. Gen 9 brought the front corner 70 mm inboard, so the front tyre now spans |z| 0.6625 to 0.8175 over x 1.095 to 1.805 while the pack runs out to x 1.300. Those two volumes intersect, and nothing can be quoted as a clearance across an intersection. The translation this whole generation rests on did not reshuffle the front package, it drove the wheel into the pack, and the panel said the opposite because it read a nearest-surface distance without asking which side of the surface it was on.\n\nOPEN, and deliberately left open. The geometry is fouled and this module has not moved it, because the fix belongs to two slots at once and is a design decision rather than a content edit: battery-7 gives up its outboard corner ahead of x 1.300, or the front corner comes back out and the area gain goes with it, or the lid is relieved through the arch. tools/check-interfaces.sh fails the Gen 9 preset on this every run, which is the correct state for that tool until somebody draws the answer. Read the five depths here rather than there. That tool reports one row per PART and prints only that part\'s single deepest crossing, so this corner appears as three rows, wheels-9/tires 564 pairs at 21.4 mm, wheels-9/front-wheels 72 at 17.4 and wheels-9/discs 168 at 15.3, and all three of them name the floor lid. The 336 pairs in the galleries and the 120 in the strike shield are folded inside the tyre\'s 564 and the tool never names either one.',
      ],
      explode: [0, 0, 0.45],
    },
    calipers: {
      name: 'Front calipers',
      tagline: 'The Gen 2 monobloc on its fourth posting, one kilogram lighter for the first time, and only because the ring it straddles got thinner.',
      mass: 5,
      count: 2,
      specs: [
        ['Type', 'Fixed monobloc, 6 x 32 mm pistons, carried from wheels-6'],
        ['Clamp force', '38 kN per side at 160 bar, unchanged'],
        ['Torque available', '4.36 kNm per corner against the 1.36 a 0.74 g tyre takes'],
        ['Straddle', 'Rebuilt for a 30 mm ring: halves at |z| 0.5885 and 0.6495'],
        ['Mass', '2.5 kg each against wheels-7\'s 3.0'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The casting, the six 32 mm pistons in three pairs, the titanium piston crowns conducting at 22 W/mK to keep C/SiC backplate heat out of the fluid, and the rollback seals pulling the pads 0.1 mm clear are all Gen 2\'s and are not reopened. Two things changed and one of them is only a coordinate. The whole caliper translates 70 mm inboard with its corner, so the two halves sit at |z| 0.5885 and 0.6495, the bridge crosses outside r 0.1825 at 0.619, and the two-lug bracket reaches for the inboard face of suspension-9\'s front upright at 0.6475 rather than the Gen 5 position of 0.7175, arriving 14.0 mm short of the knuckle as suspension-9 actually drew it, which is on the fail list rather than buried here. The other change is real: the ring lost 10 mm of thickness, so the two halves come 10 mm closer together and the bridge and spacer sections between them shorten by the same amount. That is where the kilogram is, and it is the entire mass story on this panel. The pads, the pistons, the bore diameters and the 160 bar clamp are untouched, so 38 kN per side and 4.36 kNm per corner stand exactly where wheels-6 put them.\n\nThe caliper is therefore still oversized and it is still oversized on purpose, and Gen 9 gives the same answer wheels-7 gave, for the same reason, with one number moved. A 0.74 g stop on the 1,388 kg Gen 9 preset is 10.1 kN at the road, about three quarters of it at the front once transfer has finished, 1.36 kNm per front corner. The caliper delivers a little over three times that. wheels-7 refused to bank the kilogram on the grounds that peak torque is not what sizes this part: fade-free clamp after months of disuse, at the end of a descent, with a rear axle contributing under 8 percent, is what sizes it. Every one of those cases is unchanged or slightly worse, so the refusal stands. The kilogram this panel does book is not the one wheels-7 refused. It is bridge section following a thinner ring, which is geometry rather than a re-argued margin, and the distinction matters because banking the other kilogram would mean overturning a predecessor\'s decision without a changed input, which is precisely the move design/retro-gen8.md warns a later generation not to make.',
      why: 'A part that survives four generations of the hardware around it survives because its sizing case never got easier, and the correct way to take mass out of it is to let the geometry take the mass rather than the argument. The straddle is set by the ring and the ring changed, so the caliper follows for free and the certification case is untouched. Had the mass instead come out of clamp force or pad area, the dead-electron stopping argument would have had to be reopened, and this module would be spending a safety case to buy a kilogram it already had for nothing.',
      fail: [
        'Two calipers is still two single points, unchanged since Gen 2. These two components are the entire hydraulic system of the vehicle, one pressure block, two lines, twelve pistons, and the rear axle offers even less behind a mistake than it did in Gen 5 because the tyre behind it grips less too. The dual-circuit block and honest inspection remain the whole defence.',
        'The bracket does not yet land on the upright it is drawn against, and now that suspension-9 has shipped the gap is measurable rather than merely unknown. wheels-7 carried its bracket clearances unchanged from wheels-6 against an unmoved front upright and flagged that this was the one corner nobody had re-measured. Swept against suspension-9\'s built front knuckle, which spans |z| 0.5510 to 0.6900 at radii out to 0.2335, this module\'s two lugs and their pad at |z| 0.6475 stand 14.0 mm off the nearest knuckle surface. That is not a foul and not a float, since the caliper is captured by the ring it straddles at 1.0 mm; it is a bolted joint with no boss on the other side of it. The lug positions are still an interface requirement rather than a verified clearance, and the amendment now has an address: suspension-9 owes 14 mm of mounting face at radial 0.145, y 0.498, on the inboard flank of the front upright.',
        'C/SiC pad dust is abrasive rather than merely dirty and the disc now runs 100 degrees hotter, which shortens piston seal and dust-boot life again. The seal interval was already comfortably shorter than the pad interval in Gen 7, which is an inversion most workshops get wrong at least once; this generation widens the gap.',
      ],
      explode: [-0.3, 0, 0.2],
    },
    'park-brake': {
      name: 'Park-and-rescue brakes',
      tagline: 'Untouched, re-derived anyway, and the arithmetic found twenty newton-metres going the other way for once.',
      mass: 2,
      count: 2,
      specs: [
        ['Type', '180 x 22 mm simplex inside the motor ring bore, carried'],
        ['Hold required', '894 Nm per corner at 30% grade laden (1,788 kg)'],
        ['Hold available', '1,080 Nm from a 6 kN dry spindle at r 0.090'],
        ['Statutory case', '552 Nm at the 18% grade type approval asks for'],
        ['Position', 'Inside the annulus bore: r to 0.100, |z| 0.596 to 0.732'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The device is wheels-6\'s, relocated once by wheels-7 and not at all by this generation, and the whole point of re-running its arithmetic is that holding torque is a function of mass, grade and tyre radius, and this generation moved none of the three. It moved the mass, slightly, and in the direction this ladder is not used to. The Gen 9 preset sums to 1,388 kg against Gen 8\'s 1,400, so on the same 400 kg payload laden goes 1,800 to 1,788. On a 30 percent grade gravity pulls 1,788 times 9.81 times sin(arctan 0.30), 5,040 N down the slope, and this axle is the only axle holding it, so each corner resists 2,520 N and at the 0.355 m tyre radius that is 894 Nm. A simplex drum roughly doubles what its spindle applies, so 894 Nm at the 90 mm band radius asks 4.97 kN and the dry spindle is specified at 6, giving 1,080 Nm and a fifth of margin. Gen 8 needed 901 Nm on the same convention. Seven newton-metres came back, which is the first time in three generations that this number has fallen, and it is worth exactly what it sounds like it is worth. Worth naming the trap it sits in: wheels-7 published 902 Nm off a Gen 7 preset that summed to 1,404 kg, and quoting that 902 against a Gen 8 baseline would have turned seven newton-metres into eight by changing the baseline rather than the car.\n\nThe packaging is unchanged in every coordinate, because the rear corner did not move. The rotating carrier necks from r 0.090 onto the wheel\'s hub pilot at r 0.072 spanning |z| 0.658 to 0.732; the static half bolts its boss to the hub bearing housing at 0.6395; the backplate centres on 0.6315 at r 0.100, the shoes on 0.682, the gearmotor on 0.616 reaching inboard to 0.596. Every radius is inside 0.155, so the device lives in the annulus BORE and the contract band stays void. Actuation is still dry, a gearmotor and a spindle with no fluid anywhere, which is why the entire hydraulic system of this car sits at the front axle.\n\nWhat the matched track does change is the case behind this device rather than the device. In a dead-high-voltage stop the front tyres do the work and these drums cover the remainder, and the front axle\'s share of that work is now transferred differently: the roll couple returned to 58/42, so in any stop with steering in it the front outer tyre carries a higher share of a smaller total than it did on the split track. That does not change a straight-line hold, which is the case this part is sized for, and it is mentioned only so the panel does not imply the whole vehicle stood still.',
      why: 'The temptation to delete a device that contributes under 8 percent of a dead-vehicle stop grows every generation and is wrong every generation, because the law requires a car with every electron gone to hold and to stop, and the law is right. What this generation adds is a second demonstration of the same discipline wheels-7 demonstrated: re-deriving a carried number rather than copying it is how you find the one input that moved. Last time it found 20 Nm of extra laden mass. This time it found 8 Nm of preset mass going the other way, and the value of both is the same, which is knowing that nothing else moved.',
      fail: [
        'It is still the least inspectable friction device on the vehicle, inside a motor inside a wheel, 70 mm deeper into the car than it was before Gen 7 and no better placed now. Shoe condition is inferred from the gearmotor current signature on hv-4\'s telemetry, and the self-adjusting spindle that could jam in Gen 2 can still jam here behind more hardware than ever.',
        'The bore it lives in was crowded by suspension-4\'s un-relocated rear corner, and this module confirmed wheels-7\'s report rather than clearing it: knuckle plate and hub boss straddling the wheel centre plane, the rear-steer tie rod at radial 0.088 through the shoes, the damper foot at radial 0.1546 over |z| 0.6301 to 0.6598. suspension-9 pulled all of it inboard, and the sweep against the shipped partner now reads 0.5 mm from this backplate to its rear subframe and 1.3 mm from the aft harness to its rear-steer actuator. Those are contact-tight rather than fouled, and they are worse in one specific way that suits nobody: the crowding did not go away, it moved from inside the wheel, where it was at least stationary relative to a spinning part, to the backplate face, where a 0.5 mm gap is a tolerance stack rather than a clearance. Two generations reported the old condition and this one reports the new.',
        'Two full applies from 20 km/h and it needs minutes to cool, unchanged and by disclosure. The fallback deceleration behind it is unchanged from wheels-7\'s 0.33 g, because neither the tyre nor the drivetrain moved this generation, so the one safety number that regressed in Gen 7 simply carries at its regressed value rather than improving.',
      ],
      explode: [0, 0, 0.78],
    },
    'master-unit': {
      name: 'Brake-by-wire unit',
      tagline: 'The Gen 2 box on its sixth posting, and the first generation where the only thing it had to do was follow the corner in.',
      mass: 3,
      specs: [
        ['Architecture', 'One-box dry unit, front hydraulics only, carried from wheels-2'],
        ['Pressure build', '0 to 180 bar in 120 ms (carried)'],
        ['Actuators arbitrated', 'Two calipers, two wheel motors, two park brakes'],
        ['Fallback', 'No push-through: motors plus park brakes, about 0.33 g'],
        ['Front lines', 'Re-landed at the relocated caliper fittings, (1.286, 0.484, +-0.620)'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The hardware is carried whole from wheels-2 through wheels-3, wheels-6 and wheels-7: a dry pedal unit with a spring and elastomer simulator, dual ECUs on separate supplies, a ball-screw plunger block feeding two front calipers, and no push-through rod. Six generations have found nothing to improve in it, which is now the longest unbroken run of any part on this car. This generation changes routing at one end only. The two front hydraulic lines follow the corner inboard and terminate inside the caliper crossover fittings at (1.286, 0.484, plus and minus 0.620) rather than wheels-7\'s 0.691, and the last 200 mm of each run is redrawn to approach from inboard and below. The two aft harnesses are untouched at (-1.494, 0.287, plus and minus 0.616), because the rear corner did not move, which is the exact mirror of wheels-7, where the front pair was untouched and the aft pair moved.\n\nThe fallback number is unchanged and that is worth a sentence, because for two generations running this box has been where a regressed safety figure gets printed. wheels-6 published 0.38 g. wheels-7 published 0.33 after the tyre gave up 13 percent of its peak and drivetrain-7 gave up 46 percent of its peak power. Gen 9 touches neither the tyre nor the drivetrain, so the number does not move: about 0.33 g on wheel motors and two park-brake drums with hydraulics gone. It is printed again at the same value rather than quietly dropped, because a figure that only appears in the generation that made it worse is a figure the reader learns to distrust.\n\nThe pad conditioning duty carries over and gets slightly more important. When autonomy-4\'s forward model predicts a hard stop, a few newtons of pad drag lift the C/SiC face into its friction window beforehand, metered at about 0.17 Wh per event and logged. The disc on this car now has 3,000 J/K of thermal mass rather than 4,000, so it both heats and cools faster: the conditioning event reaches its target with less energy, and the disc falls back out of its window sooner after one. The schedule is a calibration item and this generation moved its inputs.',
      why: 'A control box that outlives six generations of the hardware it commands is the strongest argument any part on this car makes, and the reason it survives is that it was designed around an interface rather than around a vehicle. Gen 9 is the cleanest demonstration of that so far: an axle moved 140 mm and the only consequence for this unit was two tube endpoints. Where the argument would become dishonest is if the module then claimed a mass saving for the shorter tubes, so it does not: 3 kg, unchanged, and the four kilograms this generation books are all on the disc panel.',
      fail: [
        'The arbitration line is still the single point it was in Gen 3, a disagreement between braking and vectoring settled by a 2 millisecond priority rule that has to be right every time. This generation adds a wrinkle rather than a risk: with the tracks matched, the yaw moment a given front-rear brake split produces is no longer the same function it was, so the vectoring coordinator\'s calibration is stale even though its logic is not.',
        'The 0.33 g fallback was computed in Gen 7 against a drivetrain that did not exist yet, and drivetrain-7 now does. That number has still not been re-derived from the built machine, and this module did not do it either, because doing so properly means modelling short-duration rim-side inverter derate at low speed rather than reading a spec row. It is carried as an estimate with its inputs named, and it is the oldest open item in this file.',
        'The independence case spans this unit, drivetrain-7\'s vectoring coordinator and two rim-side inverters, three codebases on dissimilar hardware arguing they cannot fail together. Every generation since Gen 2 has widened the set of common-mode failures it must rule out. This one moves two of the four corners and the front hydraulic runs with them, so the harness routing argument has to be re-walked even though not one line of software changed.',
      ],
      explode: [0.5, 0.35, 0],
    },
  },
};

/* ── Geometry ──
   Corner-local frame carried from wheels.js through wheels-7.js: origin at
   the wheel centre, z along the axle, s = sign(world z) so +s is outboard.
   The ONE change this generation makes is where the FRONT origin sits:
   FRONTZ 0.74 instead of P.wheelZ 0.81. REARZ is wheels-7's 0.74 unchanged,
   so for the first time since Gen 5 the two are the same number, and it is
   still written twice on purpose: they are two independent contracts that
   happen to agree, and collapsing them into one constant is how the next
   generation moves an axle it did not mean to move.

   P.wheelZ stays 0.81 in js/common.js. Do not edit it. Eight modules read
   it, including body-8, whose fairing inboard wall is P.wheelZ - 0.110.

   Key world planes, FRONT corner (all 70 mm inboard of wheels-7):
     0.5640  caliper bridge, inboard face
     0.5735  caliper inboard half, inboard face
     0.6040  disc friction ring, inboard face (30 mm ring, was 40 mm)
     0.6340  disc friction ring, outboard face
     0.6625  tyre inner face          <- identical to the rear
     0.6925  hub face plane, ET47
     0.7400  wheel centre plane       <- identical to the rear
     0.8175  tyre outer face          <- identical to the rear
     0.8190  cover outer lip          <- identical to the rear

   Key world planes, REAR corner (wheels-7, unchanged):
     0.6315  park-brake backplate, static
     0.6382  flange bolt heads, inboard face
     0.6460  flange bolt heads, seating face on the titanium ring
     0.6500  CONTRACT flange face, drivetrain-7 rotor rings bolt here
     0.6625  tyre inner face
     0.7300  outboard edge of the CONTRACT annulus
     0.7400  wheel centre plane
     0.8175  tyre outer face
     0.8190  cover outer lip */

const FRONTZ = 0.74;             // front wheel centre |z|, the Gen 9 move
const REARZ = 0.74;              // rear wheel centre |z|, carried from wheels-7
const TSEG = 48;                 // tyre lathe segments
const RSEG = 48;                 // cover, disc and flange-ring lathe segments
/* Rim barrels stay at 40. Their silhouette is never the corner's outline:
   the cover owns every radius out to 0.312 from outboard and the tyre owns
   everything past it, so the barrel is only ever seen inboard or exploded,
   where 40 segments carry 0.8 mm of chord sag on a 0.53 m circle. Holding
   the covers and discs at 48 and the barrels at 40 is worth 864 triangles
   and no visible difference, which is the whole argument against raising a
   segment count everywhere at once. */
const WSEG = 40;                 // rim barrel and shell segments
const BEAD = 0.2540;             // 20 inch bead seat radius
const FLANGE = 0.2665;           // rim flange lip radius
const EDGE = 30;                 // crease threshold in degrees, design/crispness.md

/* ── What is actually visible, measured before any of the detail below was
   drawn, because a full aero cover hides most of a wheel and detail nobody
   can see is a decal with a triangle budget.

   Orthographic ray grid on the front +z corner, 38,024 samples per side,
   first hit by radius from the wheel centre:

     from OUTBOARD   r 0.000..0.048  front wheel, seen down the inlet bore
                     r 0.048..0.312  COVER, 100 percent, every band
                     r 0.312..0.355  tyre shoulder and tread crown
     from INBOARD    r 0.000..0.075  front wheel hub and disc hat
                     r 0.075..0.185  DISC, 87 to 100 percent
                     r 0.130..0.225  caliper, 3 to 13 percent
                     r 0.225..0.312  rim inboard flange and barrel
                     r 0.260..0.355  tyre inboard sidewall

   Three consequences that decided where this pass spent its triangles.
   The cover owns 87 percent of the corner from the one view a person
   standing beside the car has, so it gets the largest share. A moulded
   size legend on the OUTBOARD sidewall would be invisible at every radius
   it could occupy, so the tyre's relief went to the shoulder band and the
   tread instead. And the disc is the second most visible mechanical part
   on the car, not the last, because the whole of it shows through the
   arch from inboard. ── */

/* Rotate a Y-axis mesh so its axis runs along z. */
function zc(mesh) { mesh.rotation.x = Math.PI / 2; return mesh; }

/* Lathe in the corner-local frame: profile is [radius, axialOffset] pairs
   in increasing axial order, where axialOffset = |z| - (corner centre).
   deg creases the result: a moulded step, a bead seat or a groove wall
   keeps its own normal instead of blurring into the surface beside it, and
   the triangle count does not move. Pass null to leave a surface smooth. */
function zlathe(profile, s, mat, seg, deg = EDGE) {
  const m = lib.lathe(profile.map(([r, a]) => [r, s * a]), mat, seg);
  m.rotation.x = Math.PI / 2;
  return deg == null ? m : lib.crease(m, deg);
}

/* A fastener head seated on a face whose normal runs along the corner axis.
   out is +1 for an outboard face and -1 for an inboard one; lib.fastener
   seats on y = 0 and grows along +y, so this puts the seating face on the
   plane the caller names and the head outside the part rather than in it. */
function zfast(r, mat, type, s, out, o) {
  const g = lib.fastener(r, mat, type, o);
  g.rotation.x = (s * out > 0 ? 1 : -1) * (Math.PI / 2);
  return g;
}

/* Position something at radius r and clock angle ang in the corner-local
   frame, at axial offset a, and turn it to stand along the radius. */
function zat(obj, r, ang, a, s, spin = true) {
  obj.position.set(Math.cos(ang) * r, Math.sin(ang) * r, s * a);
  if (spin) obj.rotation.z = ang;
  return obj;
}

/* A drafted, dished spoke rather than a flat plate on edge.

   sections are [radius, axial, halfWidth, halfThickness] and the closed
   eight-point ring swept through them gives a real section that tapers from
   a wide root at the hub face to a narrow waist and fans again where it
   lets into the well, with draft on every face. Cost is 2 (n-1) 8 triangles,
   64 for the five stations used here, against 12 for the box it replaces. */
const SPOKE_RING = [[1, 0], [0.72, 0.72], [0, 1], [-0.72, 0.72],
                    [-1, 0], [-0.72, -0.72], [0, -1], [0.72, -0.72]];
function spokeMesh(sections, s, mat, ang) {
  const ca = Math.cos(ang), sa = Math.sin(ang);
  const secs = sections.map(([r, a, hw, ht]) => SPOKE_RING.map(([u, v]) => {
    const y = hw * u;
    return [r * ca - y * sa, r * sa + y * ca, s * (a + ht * v)];
  }));
  return lib.crease(lib.loft(secs, mat, true), EDGE);
}

/* ── Tyres ──
   155/65 R20 on wheels-7's section, every dimension the frontal-area
   integral and the steered sweep read off unchanged: bead seats at local
   +-0.0635 (5.0J), section maxima at +-0.0775 (world |z| 0.6625 / 0.8175),
   crown at P.tireR. Both corners now sit at the same |z|, so the front and
   rear casings occupy exactly the same band and the integral sees one tyre
   column per side instead of two.

   WHAT THIS PASS CHANGED, and it is all inside that envelope. The casing was
   a fourteen point torus with two smooth tori laid on the crown for a tread,
   and it read as a torus. It is now a moulded section: the inboard bead
   turns out over the rim flange, and the 5.5 mm low-void pattern is five
   circumferential grooves cut 5.5 and 5.0 mm INTO the crown rather than two
   rings sitting on it, so the void is real void.

   Two things the old ribs got wrong and this fixes. They stood at r 0.3583,
   3.3 mm proud of the crown, so the tyre carried 3.3 mm of itself BELOW the
   ground plane at y -0.0033 and the car was parked in its own floor
   reflection. And a rib is not a tread: a moulded pattern removes rubber, it
   does not add it. Cutting inward puts the outermost surface back on
   P.tireR, which is where a wheel centre at y 0.355 says the road is. The
   two consequences are reported on the front wheels panel: the swept solid's
   fore and aft span and its crown height each come in 3.3 mm, in |z| nothing
   moves at all, and the tyre column integral is untouched because that is a
   z band and no z coordinate on this profile changed.

   THE SECTION IS ASYMMETRIC AND THAT IS A MEASUREMENT, NOT A STYLE. A tyre
   this size would normally carry a rim-protector rib and a moulded legend on
   the sidewall, and the first attempt at this pass put both on. Neither
   survives the geometry. Interpolating wheels-7's own two profiles radius by
   radius, the axial gap between the OUTBOARD sidewall and the inside of the
   full-face cover runs 6.33 mm at the bead seat, 3.25 at the rim flange lip
   and 2.39 at r 0.3115, and the cover is opaque across every one of those
   radii: an orthographic ray grid from outboard gives the cover 100 percent
   of the first hits from r 0.048 to r 0.312. So a rib there would foul a
   part 2.4 mm away and nobody could see it if it did not. The rib and the
   bulge went to the INBOARD sidewall, which has the whole arch in front of
   it and 39.5 mm to body-9's fairing wall, and the outboard half of the
   profile is wheels-7's four stations byte for byte. That is also what a
   real covered wheel does: the cover is the rim protector. */
const TYRE = [
  /* inboard sidewall: the half a viewer can see */
  [BEAD,   -0.0635],   /* bead heel on the rim seat */
  [0.2670, -0.0720],   /* bead bulge, casing turned out over the flange lip */
  [0.2800, -0.0700],   /* waist behind the bulge */
  [0.3040, -0.0755],   /* carried station */
  [0.3180, -0.0775],   /* SECTION MAX, world |z| 0.6625: do not move */
  [0.3340, -0.0740],   /* carried station, binds the 14 degree sweep */
  [0.3470, -0.0660],   /* carried station, shoulder */
  /* crown: five grooves and four ribs across 94 mm, 21 mm of void */
  [0.3535, -0.0570],   /* shoulder radius up to the crown */
  [0.3495, -0.0548],   /* shoulder groove, 5.5 mm deep */
  [0.3495, -0.0512],
  [P.tireR, -0.0470],  /* crown edge */
  [P.tireR, -0.0262],
  [0.3495, -0.0240],   /* intermediate groove, 5.5 mm deep */
  [0.3495, -0.0196],
  [P.tireR, -0.0174],
  [P.tireR, -0.0025],
  [0.3500, -0.0008],   /* centre groove, 5.0 mm deep */
  [0.3500,  0.0008],
  [P.tireR,  0.0025],
  [P.tireR,  0.0174],
  [0.3495,  0.0196],
  [0.3495,  0.0240],
  [P.tireR,  0.0262],
  [P.tireR,  0.0470],
  [0.3495,  0.0512],
  [0.3495,  0.0548],
  [0.3535,  0.0570],
  /* outboard sidewall: wheels-7's four stations, unchanged, because the
     cover runs 2.4 to 6.3 mm off this half all the way out */
  [0.3470,  0.0660],
  [0.3340,  0.0740],
  [0.3180,  0.0775],   /* SECTION MAX, world |z| 0.8175: do not move */
  [0.3040,  0.0755],
  [0.2790,  0.0700],
  [BEAD,    0.0635],
];

function tirePart(s, rear) {
  const g = lib.part('tires', [0, 0, s * (rear ? 0.78 : 0.85)]);
  g.add(zlathe(TYRE, s, M.rubber, TSEG));
  return g;
}

/* ── Front wheel ──
   wheels-7's wheel at wheels-7's local coordinates, on a corner 70 mm
   inboard. One-piece CFRP at 20 x 5.0J: barrel, ten integral spokes, hub
   face with the co-cured titanium insert. The hub face inboard plane is at
   local -0.0375 as it has been since wheels-6, so it lands at world
   |z| 0.6925, which is where drivetrain-7's front halfshaft has to end and
   currently does not. Well floors at r 0.230, 24 mm deep, because no
   annulus stands in front of it. */
function frontWheelPart(s) {
  const g = lib.part('front-wheels', [0, 0, s * 1.15]);

  /* Barrel. The four planes wheels-6 set are all still here to the digit,
     flange lip at +-0.0700, bead seats at +-0.0635 and the 24 mm well floor
     at r 0.2300, and the profile between them is now a rim section rather
     than a straight line: a rolled flange lip with a radius under it, a
     safety hump inboard of each bead seat so a deflated tyre stays on the
     seat, and a radius into the well at each end. */
  /* The inboard flange lip stays exactly on local -0.0700, and the reason is
     a measurement rather than laziness. A first draft gave the flange a
     4.2 mm back face at -0.0742 and hung two balance weights off it, which
     put front-wheel geometry at |z| 0.6578, 12.2 mm further inboard.
     Swept against battery-7 as built, the two surfaces come to 4.38 mm of
     each other, and 12.2 mm of inboard travel does not fit in 4.38 mm of
     air. This is the ONE pack clearance this corner still has.

     The figure is 4.38 and not the 5.79 this comment used to carry, and the
     difference is the convention rather than the geometry. 5.79 is the
     nearest distance from a WHEEL VERTEX, the flange lip crest at
     (1.1965, 0.2726, 0.6700), to a gallery triangle. A clearance is between
     two SURFACES, and the closest approach here is edge to edge, on a
     triangle edge near (1.2025, 0.2600, 0.6704), where no vertex sits.
     Sampling the wheel surface on a barycentric grid converges on it from
     above, 4.457 mm at four subdivisions to 4.397 at thirty two. It is not
     the 4.7 that was written here before either, and not the 6.2 the discs
     panel used to publish; see that panel for what happened to the other
     three. The rolled corner below buys the same highlight break going
     OUTBOARD, where there is nothing to spend. */
  g.add(zlathe([
    [FLANGE, -0.0700],   /* flange lip crest, carried, and the inboard limit */
    [0.2645, -0.0688],   /* rolled corner under the lip */
    [0.2620, -0.0672],
    [BEAD,   -0.0635],
    [BEAD,   -0.0430],
    [0.2570, -0.0390],   /* safety hump */
    [BEAD,   -0.0350],
    [0.2300, -0.0180],   /* drop well, 24 mm */
    [0.2300,  0.0180],
    [BEAD,    0.0350],
    [0.2570,  0.0390],   /* safety hump */
    [BEAD,    0.0430],
    [BEAD,    0.0635],
    [0.2620,  0.0672],
    [0.2645,  0.0688],
    [FLANGE,  0.0700],
  ], s, M.carbon, WSEG));

  /* Hub face, the declared interface. The co-cured titanium insert spans
     |z| 0.6925 to 0.7125 exactly as it has since wheels-6, and what changed
     is that it is a machined face rather than a plain cylinder: a spigot
     recess for drivetrain-9's joint nose sunk 6.5 mm into the inboard face,
     a chamfer off the inboard corner, a through bore, and a nut land 2 mm
     below the outboard face so the five heads sit in a pocket. The two
     points at local -0.0475 ARE the front-halfshaft-outboard plane; moving
     either of them moves the interface, so they carry that comment. */
  g.add(zlathe([
    [0.0140, -0.0410],   /* through bore, inboard end */
    [0.0280, -0.0410],   /* spigot recess floor */
    [0.0300, -0.0475],   /* INTERFACE PLANE |z| 0.6925 */
    [0.0680, -0.0475],   /* INTERFACE PLANE |z| 0.6925 */
    [0.0740, -0.0440],   /* chamfer out to full diameter */
    [0.0740, -0.0310],
    [0.0700, -0.0275],   /* outboard chamfer, |z| 0.7125 */
    [0.0530, -0.0275],
    [0.0530, -0.0295],   /* nut land, pocketed 2 mm */
    [0.0180, -0.0295],
    [0.0140, -0.0330],
    [0.0140, -0.0410],
  ], s, M.steel, 24));

  /* Ten integral spokes, drafted and dished from the hub face out into the
     well. This is where a one-piece wheel reads as moulded or does not. */
  for (let i = 0; i < 10; i++) {
    g.add(spokeMesh([
      [0.0700, -0.0340, 0.0215, 0.0120],
      [0.1050, -0.0300, 0.0150, 0.0105],
      [0.1600, -0.0225, 0.0122, 0.0092],
      [0.2050, -0.0140, 0.0135, 0.0078],
      [0.2305, -0.0090, 0.0180, 0.0066],
    ], s, M.carbon, (i / 10) * Math.PI * 2));
  }

  /* Five wheel nuts on the pocketed land, seen down the cover's inlet bore
     and nowhere else, which is why they are heads rather than cylinders. */
  for (let i = 0; i < 5; i++) {
    g.add(zat(zfast(0.0105, M.steel, 'hex', s, 1), 0.046, (i / 5) * Math.PI * 2, -0.0295, s, false));
  }

  /* Valve. It goes through the well floor and points inboard down the
     radius, which is the only way it can be reached on a covered wheel:
     through the spoke window, through the cover's service door, which is
     drawn on the same radius on the cover panel. */
  const stem = lib.cyl(0.0042, 0.030, M.darkSteel, 10);
  zat(stem, 0.2145, Math.PI * 0.30, -0.0060, s);
  stem.rotation.z += Math.PI / 2;
  g.add(stem);
  const seat = lib.cyl(0.0085, 0.007, M.steel, 10);
  zat(seat, 0.2275, Math.PI * 0.30, -0.0060, s);
  seat.rotation.z += Math.PI / 2;
  g.add(seat);

  /* Balance weights were drawn on the inboard flange and taken off again for
     the clearance reason in the barrel comment above. There is nowhere else
     on this wheel to put one: the outboard flange is under the cover and the
     well is inside the sealed tyre cavity. */

  return g;
}

/* ── Rear wheel ──
   wheels-7's rear wheel, unchanged in every coordinate. The lathe leaves the
   CONTRACT annulus void: over |z| 0.65 to 0.73 (axial -0.090 to -0.010) the
   profile radius is 0.248 or greater everywhere except the flange face
   itself, which lies exactly on the |z| 0.65 boundary plane. */
function rearWheelPart(s) {
  const g = lib.part('rear-wheels', [0, 0, s * 0.78]);

  /* THE CONTRACT IS A VERTEX CONTRACT AND THIS PROFILE IS WHERE IT LIVES.
     Over local -0.090 to -0.010, which is world |z| 0.650 to 0.730, every
     point below must sit at r < 0.155 or r > 0.235. The flange face plane at
     -0.0900 carries exactly two radii, 0.1500 and 0.2440, one either side of
     the band, and the straight edge between them crosses the band with no
     vertex on it, which is the same face drivetrain-9's rotor rings bolt to.
     Everything added by the crispness pass was placed against that rule and
     re-swept: the only new point inside the band's axial span is the radius
     under the flange lip at r 0.2620, which is 27.0 mm clear of the ceiling,
     and the sweep still returns zero breaching vertices with the tightest
     approach unchanged at r 0.2480 on the drop-well floor. */
  g.add(zlathe([
    [0.2440, -0.0900],   /* flange face outer edge, on the CONTRACT plane */
    [0.2540, -0.0855],   /* fillet: from here out the profile clears r 0.235 */
    [0.2620, -0.0790],
    [FLANGE, -0.0700],   /* inboard bead flange lip, carried */
    [0.2620, -0.0672],   /* radius under the lip */
    [BEAD,   -0.0635],   /* inboard bead seat */
    [BEAD,   -0.0300],
    [0.2480, -0.0180],   /* shallow drop well, forced by the annulus */
    [0.2480,  0.0180],
    [BEAD,    0.0300],
    [BEAD,    0.0635],
    [0.2620,  0.0672],
    [FLANGE,  0.0700],
  ], s, M.carbon, WSEG));

  /* Co-cured titanium flange insert, 2 mm, spanning |z| 0.646 to 0.650 so
     the bolt heads bear on metal, chamfered on the inboard corner so the
     ring reads as a machined washer face. It now OWNS the whole flange face
     from r 0.1500 out to 0.2440: the CFRP shell used to draw the same
     annulus on the same plane, two coincident faces fighting for the same
     pixels on the one plane drivetrain-9 bolts to. The shell now starts at
     r 0.2440 and hands the face to the ring, which is also how the joint
     works: the bolts have to see metal all the way to the shell. */
  g.add(zlathe([
    [0.1500, -0.0940],
    [0.2400, -0.0940],
    [0.2440, -0.0922],
    [0.2440, -0.0900],   /* CONTRACT face plane |z| 0.650, out to r 0.2440 */
    [0.1500, -0.0900],
    [0.1500, -0.0940],
  ], s, M.steel, RSEG));

  /* Twelve flange bolts on the r 0.225 circle drivetrain-9's nuts share, all
     inboard of the 0.650 contract plane. They now SEAT on the titanium
     ring's inboard face at local -0.0940 and grow inboard from it. The bank
     as it stood was centred at -0.0960, which put its seating face at
     -0.0921, 1.9 mm INSIDE the 2 mm ring it is supposed to bear on: a bolt
     head grown into the laminate rather than bolted to it. Left as plain
     heads rather than promoted to lib.fastener because these twelve sit on
     the face drivetrain-9's rotor rings bolt to, and the rear tyre and rear
     wheel share an explode vector, so nothing ever uncovers them. */
  const flangeBolts = lib.bolts(12, 0.225, 0.0065, M.steel);
  flangeBolts.rotation.x = Math.PI / 2;
  flangeBolts.position.z = s * -0.0979;
  g.add(flangeBolts);

  /* hub pilot, outboard of the annulus at |z| 0.730 to 0.756, drawn as a
     BORE seating over drivetrain-9's r 0.060 spigot with 0.5 mm of fit, with
     a lead-in chamfer at the mouth so the spigot has something to find */
  g.add(zlathe([
    [0.0605, -0.0100],
    [0.0720, -0.0100],
    [0.0720,  0.0160],
    [0.0605,  0.0160],
    [0.0605, -0.0072],
    [0.0648, -0.0100],   /* lead-in chamfer */
    [0.0605, -0.0100],
  ], s, M.steel, 24));

  /* clamp web closing the bore at |z| 0.732 to 0.7376, r 0.040 to 0.0605,
     which drivetrain-9's five r 0.048 studs pass through */
  g.add(zlathe([
    [0.0400, -0.0080],
    [0.0605, -0.0080],
    [0.0605, -0.0024],
    [0.0400, -0.0024],
    [0.0400, -0.0080],
  ], s, M.steel, 24));

  /* centre web: ten spokes, pilot to drop well, every station outboard of
     local 0.000 so the whole web stands clear of the contract band */
  for (let i = 0; i < 10; i++) {
    g.add(spokeMesh([
      [0.0720,  0.0140, 0.0200, 0.0100],
      [0.1100,  0.0130, 0.0150, 0.0092],
      [0.1600,  0.0110, 0.0122, 0.0085],
      [0.2100,  0.0095, 0.0135, 0.0075],
      [0.2485,  0.0090, 0.0175, 0.0068],
    ], s, M.carbon, (i / 10) * Math.PI * 2));
  }

  /* five nuts seating on the clamp web's outboard face at local -0.0024 */
  for (let i = 0; i < 5; i++) {
    g.add(zat(zfast(0.0126, M.steel, 'hex', s, 1), 0.048, (i / 5) * Math.PI * 2, -0.0024, s, false));
  }

  return g;
}

/* ── Covers ──
   wheels-7's cover, one part for all four corners, unchanged. A shallow CFRP
   dish from a r 0.048 inlet bore out to r 0.312, seated on the rim flange
   lip at r 0.2665 / local 0.0700 and flaring outboard so its edge stands
   1.5 mm proud of the tyre section maximum. With the tracks matched, all
   four lips now sit at world |z| 0.8190 and the corner's outermost surface
   is the same plane at both axles. */
function coverPart(s, rear) {
  const g = lib.part('covers', [0, 0, s * (rear ? 0.90 : 1.45)]);

  /* The dish. Every station wheels-7 published is still here: the inlet bore
     at r 0.048, the flange seat at r 0.2665 / local 0.0700, and the outer lip
     at r 0.3120 / 0.0790, which is the plane the frontal-area integral and
     the static swept envelope are both measured to. What is new is that the
     surface between them is a moulding rather than a cone. Inboard to
     outboard: a bell mouth whose throat is the r 0.048 bore and whose lip
     flares to 0.062, a step down into a service recess over the hub, a 3 mm
     riser onto the main face, a land recessed 1.5 mm where the bayonet lock
     lives, and a rolled outer edge instead of a knife edge. Five steps, five
     highlight breaks, and the creasing is what makes them breaks rather than
     shading. */
  g.add(zlathe([
    [0.0480, 0.0596],   /* inlet throat, the published r 0.048 bore */
    [0.0512, 0.0628],   /* bell radius */
    [0.0620, 0.0652],   /* bell lip */
    [0.0740, 0.0638],   /* step down into the hub service recess */
    [0.1200, 0.0634],   /* recess floor */
    [0.1300, 0.0666],   /* riser onto the main face */
    [0.1800, 0.0688],   /* carried station */
    [0.2420, 0.0697],
    [0.2440, 0.0682],   /* bayonet land, recessed 1.5 mm and 12 mm wide so a
                           lock head sits ON it rather than over its edge */
    [0.2560, 0.0682],
    [FLANGE, 0.0700],   /* seats on the rim flange lip, carried */
    [0.2850, 0.0760],   /* carried */
    [0.3060, 0.0785],   /* carried */
    [0.3120, 0.0790],   /* OUTER LIP, world |z| 0.8190: do not move */
    [0.3110, 0.0786],   /* rolled edge, 1.1 mm of real section on the rim */
  ], s, M.carbon, RSEG));

  /* Peripheral seal, an elastomer bead in the flange seat. Sunk so its
     outboard face is flush with the dish and the whole of it shows on the
     inboard side, which is the side it seals on and the side it is seen
     from. The ring it replaces was half proud of the outer face.

     The outer edge got 1.1 mm of rolled section and no more, and the reason
     is measured rather than stylistic. The gap from the cover's underside to
     the tyre's outboard sidewall, taken as a perpendicular distance to the
     sidewall's own line, is 2.33 mm at the lip. A full return flange down to
     r 0.3050 took it to 1.30. This roll holds 2.08. A cover edge is allowed
     to be thin; it is not allowed to spend a millimetre of somebody else's
     clearance to look thick. */
  const seal = lib.torus(0.2660, 0.0055, M.rubber, RSEG, 5);
  seal.position.z = s * 0.0645;
  g.add(seal);

  /* Inlet spider. The bore feeds the brake duct, so it is open, and an open
     bore r 0.048 across on the most-looked-at surface of the car wants
     something in it: five struts off a centre boss, which is what a moulded
     cover actually carries and what stops the bore reading as a hole. */
  for (let i = 0; i < 5; i++) {
    g.add(zat(lib.cbox(0.036, 0.0055, 0.008, 0.0012, M.plasticLt),
              0.0320, (i / 5) * Math.PI * 2, 0.0600, s));
  }
  const boss = zc(lib.cyl(0.0140, 0.0100, M.plasticLt, 14));
  boss.position.z = s * 0.0600;
  g.add(boss);

  /* Valve service door, on the same radius as the valve the wheel panel
     puts through the well floor. A full cover has to be openable somewhere
     or the tyre cannot be inflated, and this is the somewhere. */
  const door = zc(lib.cyl(0.0245, 0.0032, M.carbon, 18));
  zat(door, 0.2145, Math.PI * 0.30, 0.0678, s, false);
  g.add(door);
  const doorRim = lib.torus(0.0268, 0.0022, M.alu, 16, 4);
  zat(doorRim, 0.2145, Math.PI * 0.30, 0.0694, s, false);
  g.add(doorRim);
  g.add(zat(zfast(0.0042, M.steel, 'hex', s, 1), 0.2145, Math.PI * 0.30, 0.0694, s, false));

  /* Bayonet lock: one torx on the recessed land, and four lugs hanging off
     the cover's inboard face. The lock screw is the only fastener on this
     car a viewer sees without exploding anything, which is why it is a torx
     with a real socket rather than a hex stub, and why its head diameter was
     sized against the land it seats on: at r 0.0068 the flange overhung both
     edges of the 6 mm land the first draft gave it.

     THE LUGS ARE SIZED BY THEIR OUTER EDGE, NOT THEIR CENTRELINE, and the
     first draft of this pass was not. A lug centred on r 0.2480 that is
     12 mm wide radially reaches r 0.2543, and the tyre's bead cone runs from
     r 0.2540 at local 0.0635 out to 0.2790 at 0.0700 while the rim's bead
     seat holds r 0.2540 below it, so the outer bottom corner of every lug
     stood 1.26 mm inside the tyre and 0.3 mm inside the rim seat: 56 lug
     triangles crossed tyre triangles on the +z side alone. They are now
     9 mm wide on r 0.2485, spanning 0.2440 to 0.2530, which puts the whole
     lug on the 12 mm bayonet land and leaves 1.0 mm to both bead surfaces. */
  g.add(zat(zfast(0.0050, M.steel, 'torx', s, 1), 0.2500, Math.PI * 1.30, 0.0682, s, false));
  for (let i = 0; i < 4; i++) {
    g.add(zat(lib.cbox(0.009, 0.026, 0.0060, 0.0012, M.alu),
              0.2485, (i / 4) * Math.PI * 2 + 0.4, 0.0652, s));
  }

  return g;
}

/* ── Front discs ──
   365 x 30 mm internally vented C/SiC, ten millimetres thinner than
   wheels-7's 40. Two 6 mm friction plates at local -0.136..-0.130 and
   -0.112..-0.106, with 36 curved vanes in the 18 mm between them at
   r 0.145 to 0.1825. World: the ring spans |z| 0.604 to 0.634.

   Diameter is still blocked and the check was re-run rather than carried:
   suspension-4's upper front ball joint sits at radial 0.210 with a 0.024
   sphere, inner edge 0.186, clearing r 0.1825 by 3.5 mm, and translating a
   corner in z cannot change a radius. The lower joint's outer edge is still
   at radial 0.144 against the 0.145 ring bore. So the hat stays a deep top
   hat: the web turns in on the ring's inboard face at local -0.136 and the
   bell runs out at r 0.090 to the hub face plane at local -0.0475. */
function discPart(s) {
  const g = lib.part('discs', [0, 0, s * 0.45]);

  /* Two 6 mm friction plates. The four planes are wheels-7's arithmetic and
     do not move: |z| 0.604 and 0.634 are the faces the pads and the piston
     crowns land on, and the caliper straddles them with 0.5 mm a side, so
     nothing here may grow axially and nothing may pass r 0.1825, which
     stands 3.5 mm radially off suspension-9's upper front ball joint. The
     detail is therefore all subtractive: a 1.2 mm chamfer on all four
     corners of the section, which is the whole of what a ring this
     constrained is allowed.

     Each plate is a 5.6 mm carrier plus a 0.4 mm ceramic band standing on the
     face the pad sweeps, so the pair still measures 6.0 mm from |z| 0.604 to
     0.610 and 0.628 to 0.634 and the 18 mm passage between them is untouched.
     The band the torus replaced was worse than decorative: at r 0.164 with a
     5.5 mm tube centred ON the friction plane it reached local -0.1415, which
     is 5.0 mm INSIDE the caliper's inboard half, so the part that publishes a
     1.0 mm straddle was in fact interpenetrating by five. */
  const c = 0.0012;
  for (const [a0, a1, band] of [[-0.1356, -0.1300, -0.1360],
                                [-0.1120, -0.1064, -0.1060]]) {
    g.add(zlathe([
      [0.1450 + c, a0],
      [0.1825 - c, a0],
      [0.1825, a0 + c],
      [0.1825, a1 - c],
      [0.1825 - c, a1],
      [0.1450 + c, a1],
      [0.1450, a1 - c],
      [0.1450, a0 + c],
      [0.1450 + c, a0],
    ], s, M.darkSteel, RSEG));
    const face = zlathe([[0.1470, 0], [0.1815, 0]], s, M.plasticLt, RSEG, null);
    face.position.z = s * band;
    g.add(face);
  }
  /* A scribed wear line was drawn on the outer edge of each plate and then
     taken off again. It is 0.6 mm deep on a 30 mm ring edge that subtends
     about 16 pixels when the disc fills a panel, so the line would be under
     a third of a pixel, and it cost 1,536 triangles across the two discs.
     Measure the feature against the scale it is drawn at before paying for
     it: that budget went to the vanes and the hat, which do read. */

  /* Thirty six curved internal vanes in the 18 mm passage, about 188 m3/h at
     747 rpm against wheels-7's 250 through 24 mm. They were straight boxes
     set on a tangent, which is a vane in name only: a lofted blade through
     three radial stations gives the real curve, and the passage mouths are
     what a viewer sees of them through the 18 mm gap at r 0.1825. */
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const secs = [[0.1455, 0.0000], [0.1640, 0.0062], [0.1825, 0.0170]].map(([r, tan]) => {
      const ang = a + tan / r;
      const cx = Math.cos(ang) * r, cy = Math.sin(ang) * r;
      const tx = -Math.sin(ang), ty = Math.cos(ang);
      return [[0.0030, 0.0090], [-0.0030, 0.0090], [-0.0030, -0.0090], [0.0030, -0.0090]]
        .map(([w, h]) => [cx + tx * w, cy + ty * w, s * (-0.1210 + h)]);
    });
    g.add(lib.crease(lib.loft(secs, M.darkSteel, true), EDGE));
  }

  /* The hat. It was five points and a straight bell; a real one has a radius
     out of the web, a machined bell, and a bolt flange with heads on it. The
     flange face at local -0.0475 is world |z| 0.6925, which is the wheel's
     hub face plane, so the disc and the wheel meet face to face there rather
     than the disc stopping in mid air near it. */
  g.add(zlathe([
    [0.1450, -0.1360],  /* web on the ring's inboard face, |z| 0.604 */
    [0.1150, -0.1360],
    [0.1030, -0.1322],  /* radius out of the web */
    [0.0940, -0.1215],
    [0.0900, -0.1050],  /* bell around the upright hub boss, r 0.054 */
    [0.0900, -0.0640],
    [0.0860, -0.0570],
    [0.0820, -0.0520],
    [0.0780, -0.0475],  /* bolts to the wheel hub face at |z| 0.6925 */
    [0.0620, -0.0475],
    [0.0600, -0.0500],  /* flange rim */
  ], s, M.alu, RSEG));

  /* Five hat bolts. They SEAT on the flange face at local -0.0475, which is
     the |z| 0.6925 plane the wheel's hub face lands on, and grow inboard
     because the wheel is on the other side. Seating them on -0.0500, which
     is the flange's back edge rather than a face, left five heads floating
     2.5 mm off the part they bolt: the seating plane has to be a face that
     exists, and this file has caught that twice today. */
  for (let i = 0; i < 5; i++) {
    g.add(zat(zfast(0.0080, M.steel, 'hex', s, -1), 0.0700, (i / 5) * Math.PI * 2 + 0.3, -0.0475, s, false));
  }

  return g;
}

/* ── Front calipers ──
   Fixed monobloc at 160 degrees, straddling the 30 mm ring with a 0.5 mm
   pad gap each side: halves centred at local -0.1515 and -0.0905, which is
   world |z| 0.5885 and 0.6495, bridge outside r 0.1825 at 0.619, six piston
   crowns landing on the friction faces at 0.604 and 0.634. Bracketed back
   to a pad on the inboard face of the front upright at |z| 0.6475, which is
   suspension-9's part and is an interface requirement rather than a
   verified clearance. Static: never rotates. Lower edge at y 0.346, clear
   of battery-7's lid at 0.31. */
function caliperPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('calipers', [-0.3, 0, s * 0.2]);

  const CA = Math.PI * (160 / 180);
  const cx = x + Math.cos(CA) * 0.175;
  const cy = P.wheelY + Math.sin(CA) * 0.175;
  const tanX = Math.cos(CA + Math.PI / 2), tanY = Math.sin(CA + Math.PI / 2);

  /* Nothing below is allowed to change the caliper's bounding extents. The
     halves stand 0.5 mm off the ring at local -0.1365 and -0.1055, the lower
     edge is at y 0.346 against battery-7's lid at 0.31, and both numbers are
     published. lib.cbox holds a box's face planes exactly and only takes
     material off the twelve edges, so chamfering is free of all of that. */
  for (const az of [-0.1515, -0.0905]) {
    const half = lib.cbox(0.090, 0.130, 0.030, 0.0045, M.caliper);
    half.position.set(cx, cy, s * (FRONTZ + az));
    g.add(half);
    /* two cast stiffening ribs down the outer face of each half */
    for (const t of [-0.042, 0.042]) {
      const rib = lib.cbox(0.062, 0.014, 0.0055, 0.0012, M.caliper);
      rib.position.set(cx + tanX * t, cy + tanY * t, s * (FRONTZ + az + (az < -0.12 ? -0.0177 : 0.0177)));
      g.add(rib);
    }
  }

  /* THREE bridges rather than one slab. A monobloc is bridged where it has
     to be and open where the pads come out, and the two windows the change
     opens are the only way anyone ever sees a pad or a piston on this car.
     The three together span the same 0.100 the slab did, so the extents and
     the r 0.1825 stand-off are unchanged. */
  const brX = x + Math.cos(CA) * 0.203, brY = P.wheelY + Math.sin(CA) * 0.203;
  for (const t of [-0.037, 0, 0.037]) {
    const br = lib.cbox(0.030, 0.026, 0.110, 0.0035, M.caliper);
    br.position.set(brX + tanX * t, brY + tanY * t, s * (FRONTZ - 0.121));
    br.rotation.z = CA;
    g.add(br);
  }

  /* Pads, sitting on the ring faces at local -0.136 and -0.106 where the
     piston crowns used to land directly, with the rollback seals' own 0.1 mm
     between pad and disc.

     WHAT A PAD CAN AND CANNOT BE HERE, measured rather than assumed. The
     halves' inner faces stand 0.5 mm off the ring at local -0.1365 and
     -0.1055, those two planes are published, and the body is a solid block
     across the pad's whole footprint. So a 5.8 mm pad drawn onto the disc
     face has 5.4 mm of itself inside the caliper body: only the 0.4 mm at
     the disc is ever a first hit, which is also exactly what a real caliper
     shows of a pad from outside. The pad earns its 44 triangles on that
     sliver and it stays. Its 4 mm backing plate did not: sitting behind the
     pad it fell wholly between local -0.1055 and -0.0755, entirely inside
     the body, and an orthographic sweep of 216 directions at 1.11 mm per
     pixel returned ZERO first hits for it in the module alone and zero in
     the full Gen 9 car. That is 176 triangles of decal and they are gone.
     Drawing the plate properly needs a pad window cut in the body, which is
     a caliper redesign and not a detail pass. */
  const px = x + Math.cos(CA) * 0.162;
  const py = P.wheelY + Math.sin(CA) * 0.162;
  for (const az of [-0.1390, -0.1030]) {
    const pad = lib.cbox(0.034, 0.104, 0.0058, 0.0010, M.plasticLt);
    pad.position.set(px, py, s * (FRONTZ + az));
    g.add(pad);
  }

  /* Six pistons, three a side, in their bores behind the pads. They are in
     the body the way a piston is in a bore, so none of the six is ever a
     first hit: 0 pixels each over 216 directions. Two of the six already
     measured 0 before the pads went in and the other four measured 130, 112,
     17 and 7, so moving them 6 mm back off the disc cost almost nothing that
     was visible and bought a pad that is. Drawing them properly is the same
     pad window the backing plates would need, and that is a caliper
     redesign. */
  for (const az of [-0.1455, -0.0965]) {
    for (const t of [-0.038, 0, 0.038]) {
      const p = zc(lib.cyl(0.016, 0.012, M.steel, 12));
      p.position.set(px + tanX * t, py + tanY * t, s * (FRONTZ + az));
      g.add(p);
    }
  }

  /* Two pad retaining pins through the bridge windows, which is what holds
     the pads in and what a mechanic pulls first. */
  for (const t of [-0.019, 0.019]) {
    const pin = zc(lib.cyl(0.0035, 0.082, M.steel, 8));
    pin.position.set(brX + tanX * t - Math.cos(CA) * 0.012,
                     brY + tanY * t - Math.sin(CA) * 0.012, s * (FRONTZ - 0.121));
    g.add(pin);
  }

  /* One bleed nipple per half, standing vertically on the top face of each
     body, because a bleed screw has to be the highest point of its gallery
     or it bleeds nothing. The first draft ran them along the caliper's own
     radius at radial 0.113, which is 62 mm the WRONG way: that is toward the
     wheel centre, so both nipples came out of the BOTTOM of the caliper half
     buried to the shoulder. Seating face at cy + 0.065, which is the box's
     top; the pair tops out at y 0.4994 against the bracket's 0.5365, so the
     caliper's published extents do not move. */
  for (const az of [-0.1515, -0.0905]) {
    const nip = lib.cyl(0.0038, 0.014, M.steel, 8);
    nip.position.set(cx - 0.024, cy + 0.0720, s * (FRONTZ + az));
    g.add(nip);
    const cap = lib.cyl(0.0052, 0.0055, M.plastic, 6);
    cap.position.set(cx - 0.024, cy + 0.0817, s * (FRONTZ + az));
    g.add(cap);
  }

  /* Two-lug bracket back to the upright, |z| 0.646 to 0.6485, outboard of
     the ring face at 0.634 and landing on the upright's inboard face at
     0.6475. suspension-9 owns that face; this is the interface it must hold.
     The two runs are drawn with 8 sections rather than the 18 the helper
     defaults to, which is 320 triangles back for a lug nobody sees curve. */
  g.add(lib.tube([
    [cx + 0.008, cy + 0.055, s * 0.6460],
    [1.360, 0.487, s * 0.6465],
    [1.425, 0.528, s * 0.6475],
  ], 0.010, M.castAlu, false, 8));
  g.add(lib.tube([
    [cx + 0.008, cy - 0.050, s * 0.6460],
    [1.360, 0.445, s * 0.6465],
    [1.425, 0.488, s * 0.6475],
  ], 0.010, M.castAlu, false, 8));
  const pad = lib.cbox(0.024, 0.070, 0.014, 0.0025, M.castAlu);
  pad.position.set(1.428, 0.498, s * 0.647);
  g.add(pad);
  /* the two bolts that make it a bolted joint rather than two touching faces */
  for (const dy of [-0.022, 0.022]) {
    const b = lib.fastener(0.0072, M.steel, 'hex');
    b.position.set(1.428, 0.498 + dy, s * 0.640);
    b.rotation.x = s > 0 ? -Math.PI / 2 : Math.PI / 2;
    g.add(b);
  }

  /* Brake line crossover boss spanning |z| 0.5765 to 0.6615 so it seats into
     the top of BOTH halves; the master unit terminates in its bore. The
     banjo eye and its bolt are what a line actually ends in.

     A BANJO BOLT HAS TO BE WIDER THAN THE BORE IT CLAMPS. At r 0.0068 the
     head measured 6.8 mm across the flats against the boss's own 8.0 mm
     radius, so the whole head sat inside the tube it was supposed to be
     holding: zero first hits over 216 directions, with only 0.3 mm of flange
     rim showing. It is now r 0.0110, which puts the flange on 13.42 mm, the
     same rim the banjo eye already carries at 0.0092 plus 0.0042, and the
     nearest caliper surface over the head's own |z| 0.6242 to 0.6325 is
     17.02 mm away on the bracket, so nothing else moves. The boss running
     through it is the fluid path, which is what makes a banjo bolt hollow. */
  const fitting = zc(lib.cyl(0.008, 0.085, M.steel, 10));
  fitting.position.set(cx, cy + 0.070, s * (FRONTZ - 0.121));
  g.add(fitting);
  const banjo = lib.torus(0.0092, 0.0042, M.steel, 12, 5);
  banjo.position.set(cx, cy + 0.070, s * 0.620);
  g.add(banjo);
  const bb = lib.fastener(0.0110, M.steel, 'hex');
  bb.position.set(cx, cy + 0.070, s * 0.6242);
  bb.rotation.x = s > 0 ? Math.PI / 2 : -Math.PI / 2;
  g.add(bb);

  /* Pad wear sensor, and its lead clipped to the bracket rather than left
     hanging in air between two parts that move relative to each other. */
  const sense = lib.cbox(0.014, 0.012, 0.010, 0.002, M.sensor);
  sense.position.set(cx - 0.030, cy - 0.063, s * 0.598);
  g.add(sense);
  g.add(lib.tube([
    [cx - 0.030, cy - 0.063, s * 0.598],
    [cx + 0.010, cy - 0.058, s * 0.618],
    [1.372, 0.442, s * 0.6395],
    [1.424, 0.470, s * 0.6430],
  ], 0.0026, M.plastic, false, 10));
  const cl = lib.cbox(0.009, 0.013, 0.008, 0.0016, M.plastic);
  cl.position.set(1.372, 0.442, s * 0.6395);
  g.add(cl);

  return g;
}

/* ── Park brake, rotating half ── unchanged from wheels-7, rear corner. */
function parkDrumPart(s) {
  const g = lib.part('park-brake', [0, 0, s * 0.78]);

  /* The drum. r 0.100 is a hard ceiling on this whole device: it is the
     figure the panel publishes and it is what leaves 28.8 mm to
     drivetrain-9's deepest corner inverter at r 0.1288. Nothing below
     touches it. What the pass adds is a rolled mouth, a stiffening bead
     around the band, and a real neck onto the hub pilot instead of a cone. */
  g.add(zlathe([
    [0.0900, -0.0820],
    [0.0930, -0.0660],   /* stiffening bead around the friction band */
    [0.0900, -0.0560],
    [0.0900, -0.0340],
    [0.0800, -0.0180],
    [0.0740, -0.0110],
    [0.0720, -0.0080],   /* lands on the wheel's hub pilot wall */
  ], s, M.castAlu, 32));

  const lip = lib.torus(0.090, 0.004, M.castAlu, 32, 5);
  lip.position.z = s * -0.082;
  g.add(lip);

  return g;
}

/* ── Park brake, static half ── unchanged from wheels-7, rear corner.
   Central boss at r 0.066, backplate at r 0.100, shoe web threading r 0.073
   to 0.089, shoes phased to 1.214 and 4.356 radians. World planes: boss
   0.6395, plate 0.6315, shoes 0.682, gearmotor 0.616. */
function parkBackPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('park-brake', [0, 0, s * 0.78]);
  g.position.set(x, P.wheelY, z);

  /* Mounting boss with a real bolt flange, in place of a plain cylinder.
     Spans local -0.1085 to -0.0925 as before, so |z| 0.6315 to 0.6475 and
     the published 0.6395 centre are all untouched. */
  g.add(zlathe([
    [0.0180, -0.1085],
    [0.0660, -0.1085],
    [0.0660, -0.0985],
    [0.0600, -0.0945],
    [0.0480, -0.0925],
    [0.0180, -0.0925],
    [0.0180, -0.1085],
  ], s, M.darkSteel, 20));
  const bosBolts = lib.bolts(4, 0.0520, 0.0055, M.darkSteel);
  bosBolts.rotation.x = Math.PI / 2;
  bosBolts.position.z = s * -0.1118;
  g.add(bosBolts);

  /* Backplate. It was a flat 7 mm disc; it is now a pressed plate with a
     turned rim and an inspection plug, still centred on local -0.1085 and
     still stopping at r 0.100, which is the ceiling that leaves 28.8 mm to
     drivetrain-9's deepest corner inverter. */
  g.add(zlathe([
    [0.0640, -0.1120],
    [0.0740, -0.1098],
    [0.0950, -0.1098],
    [0.1000, -0.1062],
    [0.0760, -0.1050],
    [0.0640, -0.1072],
  ], s, M.darkSteel, 32));
  const plug = zc(lib.cyl(0.0085, 0.0050, M.plastic, 10));
  plug.position.set(0.0500, -0.0620, s * -0.1120);
  g.add(plug);

  for (const a of [1.214, 4.356]) {
    const shoe = lib.mesh(
      new THREE.TorusGeometry(0.081, 0.008, 6, 16, Math.PI * 0.72),
      M.steel
    );
    shoe.rotation.z = a;
    shoe.scale.z = 1.375;          /* 16 mm web drawn to the 22 mm band width */
    shoe.position.z = s * -0.058;
    g.add(shoe);
    /* friction lining on the band face, a separate ring so the shoe reads
       as steel carrying a lining rather than as one homogeneous arc */
    const lin = lib.mesh(
      new THREE.TorusGeometry(0.0872, 0.0022, 4, 16, Math.PI * 0.70),
      M.plasticLt
    );
    lin.rotation.z = a + 0.01;
    lin.scale.z = 4.6;
    lin.position.z = s * -0.058;
    g.add(lin);
    const arm = lib.cbox(0.012, 0.020, 0.046, 0.0025, M.darkSteel);
    arm.position.set(Math.cos(a + 0.36) * 0.078, Math.sin(a + 0.36) * 0.078, s * -0.082);
    arm.rotation.z = a + 0.36;
    g.add(arm);
  }

  /* Gearmotor, with the housing and connector a dry actuator actually has,
     and its lead clipped to the backplate rather than ending in space. */
  const motor = zc(lib.cyl(0.015, 0.040, M.plastic, 14));
  motor.position.set(-0.044, -0.068, s * -0.124);
  g.add(motor);
  const gearbox = lib.cbox(0.028, 0.022, 0.018, 0.0030, M.darkSteel);
  gearbox.position.set(-0.044, -0.068, s * -0.1130);
  g.add(gearbox);
  const spindle = zc(lib.cyl(0.005, 0.050, M.steel, 8));
  spindle.position.set(-0.044, -0.068, s * -0.084);
  g.add(spindle);
  /* Lead to the backplate, clipped. Every waypoint and the clip itself are
     held inside r 0.100, which is this device's published ceiling and what
     leaves 28.8 mm to drivetrain-9's corner inverter: the first routing drawn
     here ran the lead to r 0.1028 and the clip to r 0.1052, which is a cable
     leaving the bore the panel says the whole device stays inside. */
  g.add(lib.tube([
    [-0.044, -0.0860, s * -0.1290],
    [-0.020, -0.0920, s * -0.1215],
    [ 0.024, -0.0860, s * -0.1130],
  ], 0.0026, M.plastic, false, 6));
  const cl = lib.cbox(0.009, 0.012, 0.008, 0.0016, M.plastic);
  cl.position.set(0.024, -0.0860, s * -0.1130);
  g.add(cl);

  return g;
}

/* ── Brake-by-wire unit ──
   Carried placement from wheels-2 through wheels-7. The mirror image of the
   Gen 7 change: there the aft pair moved and the forward pair was untouched,
   here the FORWARD pair follows the corner inboard and terminates inside the
   caliper crossover fittings at (1.286, 0.484, +-0.620), while the two aft
   harnesses stay exactly where wheels-7 re-landed them, at
   (-1.494, 0.287, +-0.616), because the rear corner did not move. */
/* A routing clip on a run: a ferrule around the line with a tab standing off
   it, placed at p with the line's local tangent dir. Every long run on this
   car used to cross the whole floor unsupported, which is the one thing a
   brake line is never allowed to do. */
function lineClip(p, dir, r, mat) {
  const grp = new THREE.Group();
  grp.add(lib.cyl(r + 0.0042, 0.0110, mat, 8));
  const tab = lib.cbox(0.0050, 0.0150, 0.0080, 0.0012, mat);
  tab.position.y = 0.0125;
  grp.add(tab);
  const d = new THREE.Vector3(dir[0], dir[1], dir[2]).normalize();
  grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
  grp.position.set(p[0], p[1], p[2]);
  return grp;
}

/* Clip a polyline at the given fractional indices into its point list. */
function clipRun(g, pts, fracs, r, mat) {
  for (const f of fracs) {
    const i = Math.min(pts.length - 2, Math.floor(f));
    const t = f - i;
    const a = pts[i], b = pts[i + 1];
    g.add(lineClip([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t],
                   [b[0] - a[0], b[1] - a[1], b[2] - a[2]], r, mat));
  }
}

function masterUnitPart() {
  const g = lib.part('master-unit', [0.5, 0.35, 0]);

  /* The pedal unit, the plunger block and the reservoir were four plain
     boxes and a cylinder. Same envelope, same positions, chamfered so the
     softboxes find their edges, plus the hardware a dry unit has to have:
     a filler cap and a level connector on the reservoir, connector shells
     and a heatsink on the ECU, and four studs on the pedal box flange. */
  const body = lib.cbox(0.11, 0.10, 0.11, 0.006, M.plastic);
  body.position.set(0.95, 0.62, -0.35);
  g.add(body);

  const block = lib.cbox(0.07, 0.08, 0.06, 0.005, M.castAlu);
  block.position.set(1.02, 0.60, -0.32);
  g.add(block);

  const motor = lib.cyl(0.032, 0.06, M.steel, 18);
  motor.rotation.z = Math.PI / 2;
  motor.position.set(1.085, 0.60, -0.32);
  g.add(motor);
  const endcap = lib.cyl(0.026, 0.012, M.darkSteel, 14);
  endcap.rotation.z = Math.PI / 2;
  endcap.position.set(1.121, 0.60, -0.32);
  g.add(endcap);

  const reservoir = lib.cbox(0.05, 0.035, 0.05, 0.004, M.plasticLt);
  reservoir.position.set(1.02, 0.655, -0.32);
  g.add(reservoir);
  const filler = lib.cyl(0.0140, 0.0110, M.plastic, 12);
  filler.position.set(1.008, 0.678, -0.32);
  g.add(filler);
  const level = lib.cbox(0.014, 0.010, 0.012, 0.002, M.sensor);
  level.position.set(1.040, 0.648, -0.297);
  g.add(level);

  const ecu = lib.cbox(0.09, 0.08, 0.012, 0.0025, M.pcb);
  ecu.position.set(0.95, 0.62, -0.288);
  g.add(ecu);
  /* Heatsink and connector shells, both on the ECU's outboard face, and both
     sized by what is actually beside them rather than by the board.

     Two things were measured after the first draft put them there. thermal-9's
     air handler occupies this bay: swept over the blades' own footprint its
     nearest surface stands at z -0.2770 and it reaches x 0.9472, so a blade
     bank spread over x 0.913 to 0.987 at z -0.2815 to -0.2715 drove its two
     inboard blades straight through the duct, 32 triangles, on a pair that
     was clean before this pass. And the two connector shells at x 0.947 to
     0.977 crossed three blades of the same heatsink, 122 triangles, because
     both were placed on the middle of the same face.

     So the bank is now 36 mm of spread on x 0.970, blades x 0.9533 to 0.9868,
     entirely outboard of the duct's 0.9472, and 40 mm tall on y 0.620. The
     connectors move to the board's top and bottom margins at y 0.581 to 0.595
     and 0.643 to 0.657, clear of the blades, and out to x 0.953 so they clear
     the duct too. The blades seat 1.5 mm into the board instead of floating
     0.5 mm off it. */
  const hs = lib.fins(0.0100, 0.040, 0.036, 8, 0.0025, M.alu);
  hs.rotation.y = Math.PI / 2;      /* spread the blades along x, not z */
  hs.position.set(0.970, 0.620, -0.2785);
  g.add(hs);
  for (const dy of [-0.032, 0.030]) {
    const cn = lib.cbox(0.030, 0.014, 0.013, 0.002, M.plastic);
    cn.position.set(0.968, 0.62 + dy, -0.276);
    g.add(cn);
  }

  const conduit = lib.cyl(0.006, 0.05, M.plastic, 10);
  conduit.rotation.z = Math.PI / 2;
  conduit.position.set(0.872, 0.595, -0.35);
  g.add(conduit);

  /* Forward hydraulic pair, re-landed 71 mm inboard at the relocated
     crossover fittings; the last 200 mm approaches from inboard and below.
     Endpoints are the published (1.286, 0.484, +-0.620) and are untouched. */
  const fwdL = [
    [1.05, 0.63, -0.34],
    [1.10, 0.60, -0.44],
    [1.18, 0.545, -0.54],
    [1.25, 0.505, -0.60],
    [1.286, 0.484, -0.620],
  ];
  const fwdR = [
    [1.05, 0.63, -0.30],
    [1.10, 0.62, -0.05],
    [1.14, 0.60, 0.28],
    [1.22, 0.545, 0.50],
    [1.27, 0.505, 0.58],
    [1.286, 0.484, 0.620],
  ];
  g.add(lib.tube(fwdL, 0.004, M.steel, false, 24));
  g.add(lib.tube(fwdR, 0.004, M.steel, false, 30));

  /* Aft harnesses: park-brake commands plus the brake-priority arbitration
     line to drivetrain-9's vectoring coordinator. Untouched from wheels-7,
     including the forward duck-in that keeps the run out of the annulus. */
  const aftL = [
    [0.92, 0.57, -0.38],
    [0.70, 0.42, -0.55],
    [0.30, 0.345, -0.74],
    [-0.55, 0.345, -0.74],
    [-0.90, 0.346, -0.715],
    [-1.10, 0.336, -0.638],
    [-1.30, 0.312, -0.626],
    [-1.45, 0.292, -0.620],
    [-1.494, 0.287, -0.616],
  ];
  const aftR = [
    [0.92, 0.57, -0.32],
    [0.70, 0.45, 0.00],
    [0.40, 0.36, 0.55],
    [0.10, 0.345, 0.74],
    [-0.55, 0.345, 0.74],
    [-0.90, 0.346, 0.715],
    [-1.10, 0.336, 0.638],
    [-1.30, 0.312, 0.626],
    [-1.45, 0.292, 0.620],
    [-1.494, 0.287, 0.616],
  ];
  g.add(lib.tube(aftL, 0.0035, M.plastic, false, 36));
  g.add(lib.tube(aftR, 0.0035, M.plastic, false, 36));

  /* CLIPS. Four runs crossed the length of the car with nothing holding
     them, and a floating brake line reads as a floating brake line however
     good the rest of the corner is. Placed away from the rear corner so
     none of them enters the annulus band: the aft clips stop at fractional
     index 5.4, which is x -1.10, and the contract band starts 350 mm
     further aft. Re-swept, and the count of wheels-9 vertices inside the
     band is still zero. */
  clipRun(g, fwdL, [1.5, 3.0], 0.004, M.plastic);
  clipRun(g, fwdR, [1.4, 3.4], 0.004, M.plastic);
  clipRun(g, aftL, [1.5, 3.0, 4.2, 5.4], 0.0035, M.plastic);
  clipRun(g, aftR, [1.5, 3.5, 4.5, 5.4], 0.0035, M.plastic);

  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* THE GEN 9 MOVE, in one table: the front corners come in to FRONTZ and
     the rear corners stay on REARZ, which wheels-7 already put there. The
     two constants are equal and are deliberately not the same constant. */
  const corners = [
    [P.axleF, FRONTZ],
    [P.axleF, -FRONTZ],
    [P.axleR, REARZ],
    [P.axleR, -REARZ],
  ];

  for (const [x, z] of corners) {
    const front = x > 0;
    const s = Math.sign(z);

    /* everything that turns with the wheel, centred on its own origin */
    const spinG = new THREE.Group();
    spinG.position.set(x, P.wheelY, z);
    lib.spin(spinG, 'z', 30);
    spinG.add(tirePart(s, !front), coverPart(s, !front));
    if (front) {
      spinG.add(frontWheelPart(s), discPart(s));
    } else {
      spinG.add(rearWheelPart(s), parkDrumPart(s));
    }
    sys.add(spinG);

    /* static halves: calipers grip at the front, park backplates carry
       shoes at the rear */
    sys.add(front ? caliperPart(x, z) : parkBackPart(x, z));
  }

  sys.add(masterUnitPart());
  return sys;
}
