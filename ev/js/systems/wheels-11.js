/* Wheels and brakes, Gen 11: the corner does not move, the harness does.

   Ancestry: wheels.js (Gen 1, 133 kg, 235/50 R19, Crr 7.2 kg/t), wheels-2.js
   (Gen 2, 96 kg, the brake-by-wire box that is still here), wheels-3.js (Gen
   3, the rear rim becomes the motor rotor carrier and the annulus contract is
   written), wheels-6.js (Gen 5 apex, 84 kg, one-piece carbon wheels),
   wheels-7.js (Gen 7, 78 kg, 155/65 R20 at Crr 3.8), wheels-9.js (Gen 9, 74
   kg, the front track comes in to |z| 0.74), and wheels-10.js (Gen 10, 74 kg,
   135/75 R20 at 5.6 bar with CRR_BASIS and no booked count), which is the
   direct parent and which this module carries in every rotating coordinate.

   WHY THIS RUNG EXISTS AT ALL, AND IT IS NOT A WHEEL REASON. design/gen11.md
   narrows the cabin to 1.20 m BUILT and leaves the platform underneath it
   alone: the pack keeps its width, the track is held at 1.48, and battery-11
   and body-11 merge the pack rail and the body rocker into one structural
   sill. That sill occupies |z| 0.6600 to 0.7800 over y 0.1035 to 0.4200, and
   body-11's wide floor pan sits on top of it from y 0.4200 to 0.5600. Both of
   those volumes used to be the 65 mm of air that design/gen11.md section 7
   measured between two members doing one job.

   wheels-10 runs a cable through that air. Measured on the built mesh rather
   than argued: inside the cabin band x -1.12 to 1.03, wheels-10/master-unit
   puts 1,491 vertices at |z| 0.6045 to 0.7678 and y 0.3327 to 0.3930, every
   one of them above battery-10's lid top of 0.3080 and none of them at pack
   height where the shoulder would cover it. Swept against battery-11 with
   tools/interfaces.js's own predicate at its own tolerance, wheels-10 puts
   570 crossing triangle pairs 23.52 mm into battery-11/sill, deepest at
   (0.2568, 0.3457, 0.6707). That is the whole of this module's brief: it is
   design/gen11.md section 6's seventh module, which the review found by
   measuring the thing an earlier draft had written "verify this later"
   against, and it is the Gen 9 halfshaft shape once more, a coordinate in one
   module that was secretly a function of another module's envelope.

   AND THE FIVE-MODULE SWEEP THE BRIEF ASKED FOR WAS NOT ENOUGH, WHICH IS
   WORTH SAYING BEFORE ANY RESULT IS QUOTED. The gate for this module was
   written against body-11, battery-11, wheels-10, suspension-9 and
   drivetrain-9. The first reroute passed it with zero new pairs and put 173
   crossing triangle pairs 37.3 mm into thermal-9/local-circuits, because the
   toeboard it crossed at is where thermal-9 keeps its HVAC stack and
   thermal-9 was not on the list. SPEC.md's third fault is exactly this: a
   predicate that cannot represent the fault reports silence. So every sweep
   in this module's report is run TWICE, once over the five modules named and
   once over every module a gen11 preset actually builds, and the second one
   is the one that governs. It changed the route.

   AND THAT SECOND SWEEP IS NINE MODULES NOW, NOT EIGHT, WHICH IS WHY THE
   PRESET IS ENUMERATED RATHER THAN LISTED. The gate at the foot of this file
   reads the slots out of js/registry.js and probes the disk for a -11 module
   in each, so interior-11, hv-11 and thermal-11 joined the sweep the day they
   landed without a line changing here. They mattered: the first published
   version of this module quoted four clearances against hv-4 and thermal-9,
   which a gen11 preset does not build, and one of them was 10 mm optimistic
   and another was ten times optimistic. Every number in this file is now
   measured against what the preset builds or is labeled as history.

   WHAT MOVED, EXACTLY, AND NOTHING ELSE DID. The two aft harnesses on the
   brake-by-wire unit are rerouted out of the sill and into the rocker corner
   inboard of it, and the +z run's crossover moves from the middle of the
   cabin floor to the toeboard plane forward of body-11's pan. No tire, wheel,
   cover, disc, caliper, park brake or hub coordinate changed by a micron, and
   that is asserted per part in the report rather than claimed here: the seven
   other parts are IDENTICAL to wheels-10 both as bounding boxes and vertex
   for vertex in build order, 129,868 vertices compared at a max absolute
   delta of exactly zero. The tire column
   still measures |z| 0.6725 to 0.8075, the hub face is still 0.6925 and both
   declared interfaces are carried at the planes drivetrain-9 and battery-11
   declare, 0.6925 and 0.6625.

   NO COUNT IS BOOKED, AND A REROUTE COULD NOT EARN ONE. wheels-10 shipped
   CRR_BASIS and booked nothing, because a rolling-resistance coefficient
   comes off an ISO 28580 drum or a coastdown and there is neither here. This
   module builds no tire and moves no tread, so it has even less to say: Crr
   stays 0.0038, the CRR_BASIS counts table carries a wheels-11 row saying so,
   and js/efficiency.js should read 'wheels-11': { crr: 0.0038 }. Mass stays
   74.0 kg for a reason given on the master-unit panel with the number behind
   it, and no frontal area figure moves, because nothing this module touched
   is a first hit from any direction: the whole harness lives under the car's
   own floor line behind the sill.

   BUDGETS, measured on the built mesh. 55,324 triangles against wheels-10's
   54,588, so 736 up and 92.2 percent of the 60,000 budget, and every one of
   the 736 is on master-unit: eight more tube samples on the +z run and eight
   more routing clips. 487 raw meshes against 471. AND 74 MERGED MESHES
   AGAINST 74, unchanged, which is the number that costs draw calls: every
   mesh this module added is M.plastic inside a part that already had M.plastic
   meshes, so js/merge.js welds all of them into the one buffer it was already
   making. That is the merge doing exactly what SPEC.md says it does, and it
   is why the clip count could be raised at all. 74.0 kg, held.

   P.wheelZ in js/common.js stays 0.81 and P.wheelY and P.tireR stay 0.355.
   FRONTZ and REARZ below are both 0.74 and are still written twice on
   purpose. Not one P constant is read differently than wheels-10 reads it.

   Spin rules as ever: corner groups spin about z in drive mode; calipers,
   park-brake backplates and the master unit do not. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

/* ── CRR_BASIS ──────────────────────────────────────────────────────────
   design/gen10.md section 4b makes this a shipping requirement, in the shape
   js/efficiency.js's CD_BASIS already uses: the base, the named anchors, the
   offset to the real world, and the statement that a rolling-resistance
   coefficient comes off a drum or a coastdown and there is neither here.

   IT IS EXPORTED AS DATA RATHER THAN WRITTEN INTO A PANEL because that is
   what CD_BASIS did and because the point of both is to be argued against by
   the next pass. Nothing imports it yet.

   THE ONE THING THIS IS WEAKER AT THAN CD_BASIS, said first so a reader does
   not have to find it. CD_BASIS's tunnelExpectation came from an INDEPENDENT
   audit of body-9. `drumExpectation` below did not: it is this module's own
   estimate off the anchor list, so it carries exactly the warrant of the
   anchors and no more. It is a narrower claim than CD_BASIS's and it is
   labeled as one.

   CONFIDENCE ON THE ANCHORS THEMSELVES. The two EU label limits are
   regulatory and exact. The EQXX figure is a manufacturer publication for a
   purpose-built demonstrator. The production, solar-challenge and
   eco-marathon figures are class figures rather than one measured tire, and
   they are quoted to a hundredth of a kg/t only so the arithmetic is
   reproducible. The finding does not turn on any single one of them: move
   any anchor by 0.5 kg/t and the ladder is still under the lowest number on
   the list from Gen 5 onward. */
export const CRR_BASIS = {
  base: 0.0072,                 // wheels.js, Gen 1
  baseId: 'wheels',
  topOfLadder: 0.0038,          // wheels-7, carried by wheels-9 and by this module
  /* This module's own estimate for what a drum would show for the tire it
     BUILDS: 135/75 R20 at 5.6 bar carrying 508 kg per front corner, with
     every mechanism in `ledger` below. Not an independent audit. */
  drumExpectation: [0.0045, 0.0055],
  anchors: {
    'EU C1 label class A limit': 0.0065,
    'best measured C1 production tire': 0.0055,
    'Mercedes VISION EQXX, Bridgestone ENLITEN': 0.0047,
    'EU C3 heavy-truck label class A limit': 0.0040,
    'solar-challenge tire, 4 to 6 bar, about 65 kg per tire': 0.0025,
    'steel wheel on steel rail': 0.0015,
    'Shell Eco-marathon prototype tire, about 25 kg per tire': 0.0008,
  },
  /* every count this ladder has booked, and what it was booked against */
  counts: [
    ['wheels', 0.0072, 'base, a class-typical premium sedan tire. EU C1 label class B'],
    ['wheels-2', 0.0052, '235/50 R19 to 185/50 R21, low-loss compound. Crosses the EU C1 class A limit'],
    ['wheels-3', 0.0052, 'carried'],
    ['wheels-6', 0.0046, 'one-piece carbon wheel, low-loss construction, full covers. GOES UNDER THE LOWEST FIGURE EVER PUBLISHED FOR A FULL-SCALE CAR, and no rung says so'],
    ['wheels-7', 0.0038, '155/65 R20 at 4.4 bar, narrow section and full covers. Inside the heavy-truck class A band, on a tire a third of a truck tire\'s diameter'],
    ['wheels-9', 0.0038, 'carried. Narrowing the front track moves area and roll stiffness, not Crr'],
    ['wheels-10', 0.0038, 'CARRIED, and the geometry is not. See `ledger` and `verdict`'],
    ['wheels-11', 0.0038, 'CARRIED AGAIN, and this rung has less claim on the number than any before it: it builds no tire. Rolling drag is Crr times weight, a harness route is neither, and design/gen11.md section 8 declines a Crr credit for three wheels on the same argument'],
  ],
  /* what wheels-10 BUILDS, priced, and deliberately not booked */
  ledger: [
    ['inflation 4.4 to 5.6 bar', 0.908, 'Crr proportional to p^-0.4, the exponent standard practice uses across the C1 range. The pressure is a stated operating figure and the exponent is published; this is the best evidenced line here'],
    ['tread 5.5 to 4.5 mm, void 24.0 to 18.6 percent, center groove deleted', 0.920, 'tread band hysteresis is the largest single share of a passenger tire\'s Crr. The depth and the void fraction are measured off the built lathe profile with one function over both tires; the SHARE is literature'],
    ['single-ply carbon-cord casing, steel-free two-ply belt', 0.920, 'fewer sheared rubber interfaces in the belt package. ASSERTED. No measurement behind it'],
    ['section 155 to 135 mm', 1.000, 'MEASURED AS ZERO, and it is the line most likely to be booked by mistake. Contact patch area is load divided by inflation pressure and does not know the section width, so a narrower casing at the same pressure buys no Crr on its own. What it buys is the pressure, the frontal area and the pack corner'],
    ['lower loss tangent compound', 1.000, 'DECLINED. That is a chemistry claim, and battery-7 refused to make one in a range generation for the reason this module also declines it: a range generation is the easiest place on a ladder to smuggle one in'],
  ],
  product: 0.7686,              // the four multipliers above
  wouldReach: 0.00292,          // 0.0038 x product
  verdict: 'NOT BOOKED. The product of the named mechanisms takes 3.80 kg/t to 2.92, which is inside the solar-challenge band at about eight times the load per tire and past the 3.40 the brief asked for. Run the identical product on a real 5.50 kg/t class A tire and it gives 4.23, which is a defensible best-in-world figure, and on the EQXX\'s 4.70 it gives 3.61. The multipliers are the same; only the base differs, and only one of the two answers is a tire anybody has built. That is the signature of a base that has drifted, which is exactly what design/area-rezero.md concluded about Cd, so this module does what that document did: it publishes the basis and freezes the coefficient.',
  offset: 'The ladder carries 0.0038 and this module expects a drum to show 0.0045 to 0.0055 for the tire it builds, so the top of the ladder is optimistic by roughly 0.0007 to 0.0017 in Crr, which is 16 to 31 percent. For scale, CD_BASIS records the Cd half at 30 to 48 percent. The rung-to-rung deltas are a sound internal currency; the exchange rate to reality is unknown and this constant is where that is written down.',
  method: 'A rolling-resistance coefficient is measured on a drum to ISO 28580 or backed out of a coastdown. There is no drum here and no coastdown, exactly as there is no wind tunnel for Cd. Everything above is arithmetic over published anchors and over geometry this module builds.',
};

export const SYSTEM = {
  id: 'wheels-11',
  name: 'Wheels and brakes · Gen 11 the harness',
  color: 0xd0d6db,
  explode: [0, 0, 0],
  blurb: 'wheels-10 with one cable moved, and the reason it had to move belongs to two other modules. design/gen11.md narrows the cabin to 1.20 m and merges battery-10\'s pack rail with body-9\'s rocker into one structural sill at |z| 0.6600 to 0.7800, y 0.1035 to 0.4200, which is the 65 mm of air the brake-by-wire unit has run its aft harnesses through since Gen 7. Measured rather than assumed: inside the cabin band wheels-10 puts 1,491 vertices at |z| 0.6045 to 0.7678 and y 0.3327 to 0.3930, all of them above the pack lid, and 570 crossing triangle pairs 23.52 mm inside battery-11/sill. So both runs come inboard and DOWN, into the rocker corner at |z| 0.6297 to 0.6477 and y 0.3175 to 0.3446, over the lid step and 75.4 mm under the lowest material hv-11 draws over it, and the +z run stops crossing the cabin under the front occupant and crosses at the toeboard instead. Swept against all NINE modules a gen11 preset builds, enumerated from js/registry.js and from disk rather than from a list, the wheels slot goes from 14 penetrating part pairs and 5,115 crossings to 10 and 4,321: four close outright, including the sill at 23.52 mm and a brake line 37.55 mm inside interior-11\'s front seat, and NOTHING NEW APPEARS. It costs 683.9 mm of harness on the pair, three more bends, a minimum bend radius that falls from 355 mm to 72 measured on the polyline the tube is built from, eight more clips and a service access that is now inside a rocker cavity with no removable outer panel. Two pairs at the rear termination deepen by a few hundredths on a curve that did not move, and the panel says why. THE CORNER DOES NOT MOVE. Every tire, wheel, cover, disc, caliper and park-brake vertex is wheels-10\'s, compared one by one at 1e-6 m and identical; the tire column is still |z| 0.6725 to 0.8075 and the hub face is still 0.6925. No Crr count is booked, because wheels-10 refused one for a tire it actually built and a harness route has no claim on a coefficient at all.',
  /* Mating features other modules have to land on. Schema in SPEC.md;
     tools/check-interfaces.sh proves these against the built mesh.

     BOTH KEYS ARE CARRIED AT THE PLANES THE PARTNERS DECLARE, AND THE
     PARTNERS ARE NOW GEN 11 ON ONE OF THEM. design/gen11.md carries
     drivetrain-9 unchanged, so front-halfshaft-outboard still meets
     drivetrain-9/front-unit at |z| 0.6925 with 2 mm of tolerance.
     front-corner-pack-outboard now meets battery-11/cornerclose, which
     declares the same 0.6625 that battery-10 did, with a 10 mm tolerance
     rather than battery-10's 8. The checker takes the TIGHTEST tolerance any
     declarer states for agreement and each declarer's OWN for realization,
     so this module keeps 11 mm: its nearest tire vertex is 10.0 mm off the
     plane by construction and an 11 mm window is what leaves that legible.
     Neither plane moved and neither could: this module built no new surface
     anywhere near either of them.

     front-halfshaft-outboard is wheels-9's declaration carried forward
     unchanged, and carrying it is load bearing rather than tidy. The hub
     face is at local -0.0475 and no radius, offset or hub coordinate has
     moved since, so the plane really is still 0.6925 and the nearest
     front-wheels vertex to it measures 0.0000 mm. A key declared by only ONE
     module in a preset merely WARNS, so dropping this line would turn the
     guard off on the one defect it was built for. */
  interfaces: {
    'front-halfshaft-outboard': {
      kind: 'face', axis: 'z', at: 0.6925, tol: 0.002,
      part: 'front-wheels', mirrored: true,
      note: 'hub face inboard plane, ET47 off a rim centerline at FRONTZ 0.74. The titanium insert ring spans |z| 0.6925 to 0.7125.',
    },
    /* THE FRONT CORNER, declared because design/gen10.md hard point 3 asks
       for it and because Gen 9 proved twice that two modules at one corner
       will otherwise measure against each other's prose.

       DERIVATION, from THIS module's built mesh and from nothing else. The
       tire's section maximum is a real vertex ring at |z| 0.6725, swept off
       the built lathe. The plane is that ring less a 10.0 mm running
       clearance, so |z| 0.6625, and `tol` here IS that clearance plus a
       millimeter of build: this module accepts the plane anywhere inside the
       air it holds, and `extent: 'min'` asserts that no tire geometry
       anywhere on this module, front or rear, comes inboard of it.
       battery-11 declares the same key with `extent: 'max'` and stops its
       corner closeout at |z| 0.6550, 7.5 mm inside the plane, which also
       leaves 12.5 mm over the cell stack at |z| 0.6500.

       TWO DERIVATIONS LAND ON ONE NUMBER AND THAT IS WORTH SAYING RATHER
       THAN LEAVING TO BE FOUND. battery-10 declares this key at the same
       0.6625 and its own note reads that number as wheels-9's 155 mm
       sidewall on the 0.740 center. It is also that, by coincidence. The
       derivation that governs is the one above, off geometry this module
       builds, per hard point 3. The two agree today and would stop agreeing
       the moment either module changed a section, so the next rung to open
       this corner should reconcile them to the built face at 0.6725.

       AND IT IS NECESSARY RATHER THAN SUFFICIENT, WHICH THIS NOTE SAYS
       BECAUSE A DECLARATION THAT OVERSTATES IS WORSE THAN NONE. It is a
       STATIC plane and the front wheels steer. The pack has cut past it to
       |z| 0.6550, which clears the disc ring the plane never reached, and the
       corner is still fouled beyond 3.0 degrees of lock. design/gen11.md
       section 9 item 6 inherits that foul explicitly and this module does
       nothing about it, because fixing it means moving a tire. The discs
       panel carries the sweep, measured against battery-10 and unchanged by
       anything here. */
    'front-corner-pack-outboard': {
      kind: 'face', axis: 'z', at: 0.6625, tol: 0.011,
      part: 'tires', mirrored: true, extent: 'min',
      note: 'keep-out for the pack outboard front corner: built tire section maximum |z| 0.6725 less 10.0 mm running clearance. Covers the tire only; see the discs panel for the disc ring and the steered envelope.',
    },
  },
  parts: {
    tires: {
      name: 'Tires',
      tagline: 'The module. 135/75 R20 at 5.6 bar with the diameter frozen to the micron, every mechanism priced, and the count deliberately not booked because the anchors say 3.8 kg/t was already outside the world.',
      mass: 28,
      count: 4,
      specs: [
        ['Size', '135/75 R20, load index 100, speed rating H (wheels-9: 155/65 R20, LI 95)'],
        ['Rolling resistance', '3.8 kg/t BOOKED UNCHANGED. Built for about 2.9; see CRR_BASIS'],
        ['Cold pressure', '5.6 bar, one placard figure for all four corners (was 4.4)'],
        ['Tread and patch', '4.5 mm, 4 grooves, 18.6 % void; patch 89.0 cm2 (was 5.5, 5, 24.0 %, 113.4)'],
        ['Envelope', 'OD 0.7100 m, y 0.0000..0.7100 exactly; faces at |z| 0.6725/0.8075'],
        ['Maturity', 'The 5.6 bar C1 casing and the steel-free belt are both extrapolated'],
      ],
      how: 'CARRIED WHOLE FROM wheels-10, VERIFIED AT 1e-6 m RATHER THAN ASSERTED. All 32,256 tire vertices compare identical to wheels-10\'s in build order, so the section, the tread, the pressure and the column at |z| 0.6725 to 0.8075 are Gen 10\'s to the micron. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means GEN 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nThe whole of this panel is one decision and design/gen10.md wrote the order of work before any of it: write the anchors FIRST, then decide whether a count may be booked. So the anchors come first here too.\n\nWHERE THIS LADDER\'S Crr SITS AGAINST THE WORLD, in kg/t, which is newtons of resistance per kilonewton of load. EU C1 label class A, the regulatory limit for a passenger tire, is 6.5. The best C1 production tires measure about 5.5 on the ISO 28580 drum. The lowest figure published for a full-scale, four-seat, road-registered car is the Mercedes VISION EQXX at 4.7, on a Bridgestone ENLITEN casing built for one 1,200 km run. Below that there is exactly one road-legal class: EU C3 heavy-truck label class A at 4.0, reached by long-haul steer tires a meter in diameter running 8 to 9 bar under 3,000 kg. Below THAT the list runs out of road cars: solar-challenge tires at 2.0 to 3.0 carrying about 65 kg each, a steel wheel on a steel rail at 1.0 to 2.0, and a Shell Eco-marathon prototype tire at about 0.8 under 25 kg.\n\nNow the ladder against that list. Gen 1 is 7.2, which is EU class B and a defensible base for a stamped sedan. Gen 2 is 5.2, under the class A limit. Gen 5 is 4.6, which is UNDER THE EQXX, and no rung on this ladder says so. Gen 7 is 3.8, inside the heavy-truck class A band on a tire a third of a truck tire\'s diameter, and that is what wheels-9 carried and what this module carries. The brief asked for 3.4.\n\nTHE TEST THAT DECIDES IT, and it is arithmetic rather than judgment. Three mechanisms are available to a tire whose diameter is frozen, and every one of them is real. Inflation 4.4 to 5.6 bar, at the standard Crr proportional to p^-0.4, is a factor of 0.908. Tread depth 5.5 to 4.5 mm with the void fraction 24.0 to 18.6 percent, against a tread band that is the largest single share of a passenger tire\'s loss, is about 0.92. A single-ply carbon-cord casing under a steel-free two-ply belt, which removes sheared rubber interfaces from the belt package, is about another 0.92. Multiply: 0.7686. Apply it to 3.80 and the answer is 2.92 kg/t.\n\n2.92 is not 3.40. It is well past the target, and a module that wanted the count could stop there and book it. Apply the IDENTICAL product to the anchors instead. On a real 5.50 kg/t class A tire it gives 4.23, which is about the EQXX and is a completely defensible best-in-world figure. On the EQXX\'s own 4.70 it gives 3.61, which is a claim somebody would have to defend and could. On 3.80 it gives 2.92, which is inside the solar-challenge band at roughly eight times the load per tire: 508 kg on this car\'s front corner against about 65 kg on a solar car. One set of multipliers, three bases, and only the answers from the real bases are tires anybody has built.\n\nThat is the signature of a base that has drifted, and it is the same signature design/area-rezero.md found in Cd: the deltas are sound and the absolute zero is not. So this module does what that document did. CRR_BASIS is exported with the base, the anchors, the count-by-count history, the mechanism ledger and the offset, and js/efficiency.js should carry \'wheels-10\': { crr: 0.0038 }. THE GEOMETRY IS HERE AND THE NUMBER IS NOT.\n\nWHAT THAT COSTS THE GENERATION, stated rather than buried, because it is the whole margin. design/gen10.md section 7 prices the Crr step at 43.1 miles and its own table carries the outcome: with autonomy-10 at its target and Crr frozen, Gen 10 reads 107.852 Wh/mi and about 1,761.7 miles, a step of +87.7 against Gen 9\'s 1,673.9 and 38.3 miles short of 1,800. That is the third largest step on the ladder and it is short of the target, and both halves of that sentence are this module\'s to say.\n\nONE CORRECTION TO THAT ROW, UPWARD, AND IT IS THIS MODULE\'S TO MAKE BECAUSE NOBODY ELSE MEASURED IT. Section 7 holds frontal area at 2.0978 m2 throughout, which is the Gen 9 cell, and this module moves it: the union of body-9, this module and a pack measures 2.090612 on battery-7 and 2.089740 on battery-10 as it stands, against the 2.097783 the same integrator returns for Gen 9. Run through the shipped computeBudget at Gen 10\'s own operating point, aux 319 W and mass 1,386.58 kg and Crr still 0.0038, that is worth 2.08 miles, so the rung reads about 1,763.8 and is 36.2 short of 1,800 rather than 38.3. The correction is small and it is in the direction that flatters this module, which is exactly why it is written down rather than absorbed. It is also NOT a booking: the AREA table is regenerated once by the integrator after every Gen 10 module lands, per hard point 2, and the cell that ends up in it is the one that counts. See the covers panel for why none of those four figures may be pasted into a cell.\n\nWHAT THE TIRE ACTUALLY IS, since it is built. 135/75 R20 on a 4.5J rim at 5.6 bar cold. The aspect ratio is an OUTPUT: P.tireR 0.355 and the 20 inch bead seat fix the section height at 101.0 mm on every tire this slot will ever draw, so a 135 mm section reads 75 series for the same reason a 155 read 65. Measured off the built lathe with one function over both profiles, the tread band is 81.8 mm against wheels-9\'s 94.0, the net contact width at full crown radius is 66.6 mm against 71.4, and the void fraction is 18.6 percent against 24.0. Four circumferential grooves 4.5 mm deep replace five at 5.5 and 5.0, and the center groove is deleted for a continuous 30.4 mm center rib, which is the pattern decision the whole panel rests on: a groove down the centerline splits the rib carrying the highest contact pressure into two half-ribs that squirm independently, and block squirm is hysteresis.\n\nTHE CONTACT PATCH, one model over both tires, because every number below and the deflection route to Crr all come out of it. Contact patch area is load divided by inflation pressure. The front static corner carries about 508 kg laden on both rungs, on a 56.9 percent front split, so the patch goes from 113.4 cm2 to 89.0, and on the net contact width the patch LENGTH goes 158.8 mm to 133.7. Solving the chord gives a static deflection of 8.88 mm against 6.29, and the vertical rate, taken as the derivative of pressure times patch area with respect to deflection, goes 280.9 kN/m to 396.1.\n\nAnd that deflection is the second, independent route to the same verdict. Rolling resistance is hysteresis in rubber that is cyclically strained once per revolution, so to first order Crr goes as deflection over free radius. The deflection ratio is 0.7087, which on 3.80 gives 2.69 kg/t. Two different models, one from mechanism multipliers and one from measured geometry, land at 2.92 and 2.69. Neither is 3.40, both are past every anchor, and the agreement between them is not reassurance. It is the same overshoot twice.',
      why: 'Because design/gen10.md wrote the decision rule in advance and this module is not allowed to invert it, and because the rule is right.\n\nThe argument for booking is easy to make and worth stating fairly. The ladder\'s Crr is an internal currency; every count from Gen 1 has been booked against a named mechanism; the mechanisms here are real physics with a published exponent on the strongest of them; and a rung-to-rung comparison on a consistent currency is exactly what this project\'s model is for. All of that is true. It is also, word for word, what CD_BASIS says about the drag coefficient, and design/area-rezero.md still concluded that no Cd count may be booked. It did not conclude that a body may keep booking counts as long as it documents the offset. Requiring CRR_BASIS and then booking 43.1 miles would be the weaker half of that precedent, and 43.1 miles is 33 percent of this generation\'s predicted step and the entire margin over 1,800.\n\nThe structural reason is sharper than the precedent. A count is defensible when the mechanism it names is measured on the object it is applied to. Here the mechanisms are measured on the world\'s tires and the object is a coefficient that is already outside the world\'s tires. Applying a real 9 percent to a base that is 19 percent below the lowest number anyone has published does not produce a tire that is 28 percent better; it produces a number with no referent. Eight bodies reached Cd 0.108 one defensible count at a time, and every one of those counts had a mechanism too.\n\nThere is a version of this rung that is worth more than the count, and it is this one. The tire that would earn 3.4 kg/t is drawn, measured and priced in wet grip, braking distance, ride rate and load capacity. The anchors that decide whether 3.4 is a tire or a fiction are written down and exported as data. If a drum ever exists, the count is already derived and the geometry is already built. What Gen 11\'s retro will not have to do is write off 43.1 miles.',
      fail: [
        'THE LOAD INDEX IS FINALLY NOT SHORT, AND PART OF THE REPAIR IS THE TIRE GRIPPING LESS. wheels-9 recorded the defect and declined the fix: at 0.74 g on the 1.48 m matched track with a 58 percent front roll couple, the outer front tire carries 768 kg laden against load index 95\'s 690, so 78 kg over, and it named load index 100 as the correct answer. One method over both rungs, laden 1,787.58 kg then and 1,786.58 now: the capacity a casing earns scales with inflation pressure times section width at a given deflection, so 690 kg at 4.4 bar and 155 mm becomes 765 kg at 5.6 and 135. The outer front corner reads 758.1 kg, because a 0.714 g tire transfers less load than a 0.740 g one. So the corner goes from 78 kg over to 6.7 kg under, and the honest decomposition is that 75 kg of that swing is casing and 9 kg is grip the car no longer has. Held at 0.74 g the same casing would still be 2.3 kg over. This is the first rung in the ladder\'s history where the worst-loaded corner is inside its tire, and it is inside by seven kilograms.',
        'WET GRIP IS THE PRICE AND IT IS A LARGE ONE. One model over both tires, with the terms named so it can be rejected: peak wet friction taken as dry peak times 0.60 at wheels-9\'s 5.5 mm tread and 4.4 bar, scaled by tread depth to the quarter power for drainage and by pressure to the minus tenth for the smaller patch. Dry peak falls 0.740 to 0.714, because mean contact pressure rises 27 percent and rubber friction falls with contact pressure at roughly the minus 0.15 power. Wet peak falls 0.444 to 0.398, which is 10.4 percent. Braking from 100 km/h goes 53.15 m to 55.10 m dry, so 1.95 m, and 88.58 m to 98.92 m wet, so 10.34 m. Ten meters is two car lengths and it is the real cost of this tire.\n\nHydroplaning moves the OTHER way and the two must not be added together. Dynamic hydroplaning onset goes as the square root of inflation pressure, so on the classic 9 times root psi in knots the onset rises from 133.2 km/h to 150.2. So the tire is harder to float and worse once wet, which are two different failure modes with two different answers, and the deleted center groove is on the wrong side of the second one: the water that does reach the patch has one fewer path out from under the rib that carries the most load.\n\nAnd there is no skid trailer here either. The wet numbers above are a model with named terms, exactly like the Crr numbers this panel refuses to book, and they are published in that spirit rather than as measurements.',
        'THE RIDE RATE RISES 41 PERCENT AND THE SLOT THAT WOULD CATCH IT IS NOT OPEN. The tire is the top spring in series with everything suspension-4 and suspension-9 built, and its vertical rate goes 280.9 kN/m to 396.1 on the same patch model. Ride frequency is held by construction on this car because the air springs scale rate with load, so the primary ride is unaffected; what moves is the secondary ride and the wheel-hop mode. On a stated 42 kg of unsprung mass per front corner, of which 17.5 kg is this module\'s own tire, wheel, disc and cover, and a 40 kN/m spring path, hop goes from 13.91 Hz to 16.22 Hz. That assumption is stated because it is an assumption: suspension-9 owns the rest of the unsprung mass and Gen 10 does not open the suspension slot, so nobody re-tunes a damper against this. A 41 percent stiffer tire on an untouched damper is a real and uncompensated regression in impact harshness.',
        'TREAD LIFE, AND THE THING THIS MODULE WOULD HAVE DONE IF IT WERE ALLOWED. 4.5 mm of pattern leaves 2.9 mm above the 1.6 mm legal floor, against wheels-9\'s 3.9 and wheels-6\'s 5.9. Three generations of this slot have spent tread depth and each has left less. The lever that would give it all back is diameter: a taller casing at the same section carries more tread rubber and a smaller deflection per unit load, and it is the single best answer to everything on this panel. It is NOT AVAILABLE. wheels-9/tires is built to y 0.0000 to 0.7100 exactly, P.wheelY 0.355 puts the hub on the crown radius with the patch on the ground plane and zero slack at either end, and P.wheelY appears in seventeen system modules and, re-measured here with comments stripped, is a live code read in all seventeen rather than design/gen10.md\'s fifteen; the difference is a comment-stripping convention and the conclusion is the same either way. design/gen10.md hard point 5b makes it a frozen constant rather than a design variable, and section 4b says why: drivetrain-9 derives its entire core-loss argument, and therefore the driveEff 0.958 the whole ladder books, from a 0.34 m dynamic rolling radius. Growing the tire is the halfshaft defect with the axis rotated. It wants a fifth module and a re-sweep of all seventeen readers, and it comes back to design/gen10.md before it is drawn.',
        'THE ROLLING RADIUS MOVED ANYWAY, BY 0.9 MM, AND NOBODY ASKED FOR IT. The FREE radius is frozen and this module holds it to the micron. The DYNAMIC rolling radius is not the free radius: it is the free radius less about a third of the deflection, and the deflection fell 8.88 mm to 6.29 mm when the pressure rose. So the dynamic rolling radius goes 0.3520 m to 0.3529 m, plus 0.9 mm and plus 0.26 percent, which at drivetrain-9\'s 780 wheel rpm is 0.26 percent of speed. It does not move the booked driveEff and the reason is worth more than the number: drivetrain-9 derives that efficiency from a 0.34 m dynamic rolling radius, and NEITHER tire produces 0.34. The two are 12 mm apart already, so this generation moved a quantity by a fourteenth of a discrepancy nobody has closed. It is reported here rather than left for a reviewer because a frozen constant with an unfrozen derivative is how the halfshaft got wrong at two consecutive rungs.',
        'ONE PLACARD PRESSURE FOR FOUR CORNERS, CARRIED FROM wheels-9 AND NOW MORE BINDING. Both axles run the same geometry, so a pressure change to fix understeer changes rolling resistance at both ends at once, and at 5.6 bar the tuning window is narrower than it was at 4.4 because the casing is closer to its rating and the patch is 21 percent smaller. The compensation is still suspension-9\'s bars rather than the tire, and suspension-9 is not open this generation.',
      ],
      explode: [0, 0, 0.85],
    },
    'front-wheels': {
      name: 'Front wheels',
      tagline: 'Twenty by four and a half, and a bead seat with the five degrees of taper four generations of this slot drew flat.',
      mass: 11,
      count: 2,
      specs: [
        ['Wheel center', '(+-1.45, 0.355, +-0.74); front track 1.48 m, carried from wheels-9'],
        ['Size', '20 x 4.5J, ET47, hub face plane still |z| 0.6925 (wheels-9: 5.0J)'],
        ['Rim planes', 'flange lips |z| 0.67635 / 0.80365, seats 0.68285 / 0.79715'],
        ['Bead seat', '5.02 degrees of taper, 2.1 mm of radius across 23.9 mm of seat'],
        ['Swept envelope', '|z| 0.8090 static, 0.8834 at 14 deg, 0.9006 at 17.25'],
        ['Maturity', 'Pilot line; the wheel is wheels-6’s drawing on a narrower barrel'],
      ],
      how: 'CARRIED WHOLE FROM wheels-10, VERIFIED AT 1e-6 m RATHER THAN ASSERTED. All 15,824 front-wheel vertices compare identical to wheels-10\'s, so the 4.5J barrel, the tapered bead seat and the hub face at |z| 0.6925 are Gen 10\'s. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means GEN 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nWHAT MOVED AND WHAT DID NOT, because on this part it is exactly one axis. Every RADIUS on this wheel is wheels-6\'s to the digit: the flange lip is 0.2665, the bead seat is 0.2540, the drop-well floor is 0.2300 and 24 mm deep, the hub insert is 0.0740 and the spoke web runs to 0.2305. Every AXIAL coordinate on the BARREL moved inboard with the 4.5J width and nothing else did. The hub face is still at local -0.0475, which is world |z| 0.6925, which is the declared front-halfshaft-outboard plane; the nearest vertex to it measures 0.0000 mm and drivetrain-9\'s front-unit reaches exactly 0.6925 on the other side of it. Narrowing a rim does not move an offset, and that is the whole reason this generation could touch the rim at all.\n\nTHE BEAD SEAT IS TAPERED NOW AND IT SHOULD ALWAYS HAVE BEEN. wheels-6, wheels-7 and wheels-9 all drew the seat as a cylinder at constant radius. A passenger rim seat rises at 5 degrees toward the flange, and that taper is not decoration: it is the mechanism by which inflation pressure drives the bead up the ramp into an interference fit against the flange, which is what holds a tubeless tire on a rim that has just lost its air. On a 4.4 bar tire drawing it flat was a drawing error. On a 5.6 bar tire it is the retention argument, so it is built: 2.1 mm of radius across a 23.9 mm seat, measured back off the profile as 5.02 degrees. The safety hump inboard of each seat is wheels-9\'s and is unchanged in radius.\n\nTHE SWEPT ENVELOPE, run the same way wheels-9 ran it so the pair is one method. Every vertex of the built front tire, wheel, cover and disc rotated about the vertical axis through (1.45, 0.74), maximum |z| recorded:\n\n    deg      wheels-9   wheels-10   delta\n      0      0.8190     0.8090      -10.0 mm\n      2      0.8298     0.8198      -10.0\n      6      0.8512     0.8412       -9.9\n     10      0.8720     0.8621       -9.8\n     14      0.8926     0.8834       -9.2\n     16      0.9032     0.8941       -9.1\n  17.25      0.9097     0.9006       -9.1\n     20      0.9238     0.9148       -8.9\n     22      0.9337     0.9249       -8.8\n\nTen millimeters static, tapering to 8.8 at 22 degrees, and the taper is itself a measurement worth having: a narrowing is not a translation. wheels-9 moved the corner rigidly, so its whole swept surface shifted 70 mm at every angle and body-9 could work from a subtraction. This module shrinks the corner about its own center, so the gain is largest where the binding feature is the cover disc and smallest once the tire shoulder takes over. Do not subtract a constant from this table.\n\nWHAT THE TEN MILLIMETERS BUY AT THE PARTNERS, measured surface to surface against the built body-9 rather than against its prose, one method over both wheels:\n\n    cover to front fairing        43.90 mm  ->  50.16 mm\n    tire to front fairing         25.50     ->  35.50\n    cover to arch louvers         72.40     ->  82.39\n    tire to rear arch closeout     4.74     ->  10.89\n\nThe last row is the one nobody had. 4.74 mm from the rear tire to body-9\'s rear arch closeout is the tightest clearance this corner has to the body at either axle, it is not on any wheels-9 panel, and it is not on any body-9 panel either. It is a surface-to-surface reading; a nearest-vertex sweep would have missed it, which is precisely how the pack clearances on the discs panel went wrong. It is now 10.89 mm and it is still the tightest.\n\nWHAT THIS PANEL DOES NOT CLAIM. body-9 is carried unchanged and this module books no area credit against it. Ten millimeters of swept envelope per side is real and it is body-9\'s to spend or not; nobody has redrawn a fairing around it and nothing in js/efficiency.js should move because of it. wheels-9 made exactly this distinction about Cd and it was right: a wheel module that starts crediting itself with a partner\'s integral is how a ladder loses track of who measured what.',
      why: 'A 4.5J rim is not a styling choice, it is the only rim a 135 section can sit on, and getting it wrong in either direction is a real failure. Too wide and the sidewalls are pulled straight, the casing loses the curvature that carries lateral load and the bead is over-stressed at 5.6 bar. Too narrow and the section balloons, which puts the widest point of the tire back where the narrowing was supposed to take it from and hands the frontal area straight back. 135 mm of section on 114.3 mm of rim is a 1.18 ratio, which is what a passenger tire of this aspect wants.\n\nThe deeper reason to touch the rim at all is that it is the one part of this corner whose axial coordinates are free. Everything else is pinned: the hub face is an interface, the disc is pinned by a ball joint radius, the caliper is pinned by the disc, and the diameter is pinned by seventeen modules reading P.wheelY. The rim width is the only dimension on the front corner that no other module reads, which is why it is where the section change is allowed to land.',
      fail: [
        'hv-4\'s by-wire feed RAN THROUGH this wheel on Gen 10 and it does not on Gen 11, and the tense is the correction rather than the finding. This entry is wheels-10\'s, carried, and it is a gen10-preset measurement: hv-4 is not in a gen11 preset. Swept against the hv-11 that is, this slot has ZERO penetrating pairs with the hv slot, on every part, for wheels-10 as well as for this module. What follows is therefore the history of the pair and not a live foul, and the live sweep is the gate block above build().\n\nThe number got worse by the tool\'s own metric while the geometry got better. Measured with tools/check-interfaces.sh\'s own predicate, one method over both rungs: hv-4/bywire-feeds x wheels/front-wheels goes from 182 crossing triangle pairs at 16.23 mm to 142 pairs at 18.57 mm. The feed occupies x 1.1024 to 1.3140, y 0.3480 to 0.3798 and |z| 0.6522 to 0.7128, and the rim barrel it crosses spans |z| 0.67635 to 0.80365 at radii 0.2300 to 0.2665, so pulling the inboard flange 6.35 mm OUTBOARD reduced how much of the cable is inside the barrel from 42.8 mm to 36.4. The crossing count agrees with that and the depth does not, and SPEC.md already says why: the reported depth is the plane-straddle depth, which on a slender part crossing a large panel is not the intrusion. Both figures are published because design/gen10.md hard point 8 says a pair that deepens is this generation\'s, and this one deepens by that metric. It is not fixable from the wheels side without giving the pack corner back.',
        'Two more pairs deepen and both are hv-4 against the tire rather than the wheel, and they are on this panel because this panel owns the whole-car sweep. hv-4/bywire-feeds x wheels/tires goes 144 pairs at 3.88 mm to 167 at 4.24, and hv-4/zonal x wheels/tires goes 232 pairs at 9.89 mm to 126 at 10.06. Both are the tire\'s inner sidewall moving 10 mm outboard into cable that was routed around a 155 section. Against them, two pairs CLOSE outright, autonomy-4/ring x wheels/tires at 112 pairs and 6.53 mm and interior-6/nvh x wheels/tires at 96 pairs and 8.56 mm, and five improve. Only TWO of the five get shallower: hv-4/ring x wheels/tires 571 pairs at 19.37 mm to 460 at 16.00, and hv-4/bywire-feeds x wheels/rear-wheels 176 at 18.97 to 182 at 15.84. The other three keep their depth to the hundredth and lose crossings: body-9/front-fairings x wheels/calipers 832 to 815, hv-4/zonal x wheels/rear-wheels 390 to 314, interior-6/nvh x wheels/rear-wheels 52 to 48. An earlier draft of this entry said "four shallow", which is neither the two that are shallower nor the five that improve.\n\nAND READ THE REAR-WHEELS FEED PAIR TWICE, because it is the fourth pair this generation made worse and the first draft of this entry filed it under an improvement. hv-4/bywire-feeds x wheels/rear-wheels is 3.13 mm shallower and it GAINS SIX CROSSINGS, 176 to 182. design/gen10.md hard point 7 counts a pair that appears, deepens OR gains crossings as this generation\'s work, and the calipers panel invokes that same clause against this module\'s own first sensor route, so it has to be invoked here. The cause is the same 6.35 mm of rim: the rear barrel moved outboard into a feed routed around a 5.0J rim, exactly as the front one did, and like the front one it is not fixable from the wheels side. Net over the whole car: 32 penetrating part pairs and 9,668 crossings become 30 and 9,135. The corner is better, three pairs are deeper and a fourth is wider, and a module that published only the first half of that sentence would be doing what the discs panel had to be corrected for.\n\nEVERY FIGURE IN THIS ENTRY IS A gen10 PRESET FIGURE AND NONE OF IT IS LIVE. hv-4, interior-6 and autonomy-4 are the partners it names and a gen11 preset builds none of them. On the preset this module ships into, the wheels slot has zero pairs with hv, zero with interior and zero with autonomy, and its whole-car sweep is 10 penetrating part pairs and 4,321 crossings against wheels-10\'s 14 and 5,115. The entry is kept because the decision rule it invokes is the rule this module is judged by and because deleting a cost when the partner that priced it goes away is exactly the move this file exists to argue against.',
        'suspension-9 is the third party at this corner and it is not in this generation. All nine of its pairs against this module were re-swept after the geometry moved, one method over both, and every one of them is BIT IDENTICAL: rear structure through the park brake 1,416 pairs at 20.00 mm, steering into the disc 212 at 14.79, front structure into the disc 148 at 14.78, front knuckle into the disc 572 at 13.83, the 48 V feeds into this wheel 35 at 12.46, front knuckle into the caliper 251 at 10.91, rear steer into the master unit 192 at 9.79, rear structure into the master unit 122 at 7.27, and rear steer into the park brake 215 at 2.46. Not one appeared, deepened or gained a crossing. That is the required result rather than a good one: the corner is fouled, the fix belongs to two slots, and design/gen10.md is explicit that this generation is not that task and only has to avoid making it bigger.',
        'The wheel got 98 grams lighter per rim and the ledger does not book it. 12.7 mm less barrel width on a 0.53 m barrel at 3 mm of CFRP wall is 0.098 kg, so 0.39 kg across four rims. That is a real saving and it is below the resolution this project\'s mass ledger works at, which is the kilogram, so booking it would mean rounding 0.39 up to 1 and taking 0.7 miles the car did not earn. The front wheels stay at 11 kg and the rear at 12, exactly as wheels-9 had them.',
      ],
      explode: [0, 0, 1.15],
    },
    'rear-wheels': {
      name: 'Structural rear wheels',
      tagline: 'Narrowed with the front, re-swept against the contract point by point, and given the valve it has never had in four generations of carrying a service door with nothing behind it.',
      mass: 12,
      count: 2,
      specs: [
        ['Wheel center', '(-1.45, 0.355, +-0.74); rear track 1.48 m, carried'],
        ['Flange face', '|z| 0.65 exactly, out to r 0.2440; the CONTRACT plane, untouched'],
        ['Motor annulus', 'r 0.155 to 0.235 over |z| 0.65 to 0.73, still void'],
        ['Void margin', 'Zero breaching vertices; r 0.2480 at |z| 0.7220, 13.0 mm clear'],
        ['Change this generation', 'NONE. The 4.5J rim and the valve are Gen 10\'s work'],
        ['Maturity', 'Pilot line; the co-cured titanium flange stays extrapolated'],
      ],
      how: 'CARRIED WHOLE FROM wheels-10, VERIFIED AT 1e-6 m RATHER THAN ASSERTED. All 20,336 rear-wheel vertices compare identical to wheels-10\'s, and the rear annulus band was re-swept on the Gen 11 build anyway: zero wheels-11 vertices inside r 0.155 to 0.235 over |z| 0.65 to 0.73. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means GEN 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nTHE CONTRACT SURVIVED A RIM NARROWING AND THAT IS THIS PANEL\'S DELIVERABLE. The rear annulus contract reserves r 0.155 to 0.235 over |z| 0.65 to 0.73 for drivetrain-9\'s in-wheel motor, and pulling both bead seats 6.35 mm outboard moves six profile points INTO the axial span the contract covers, which is the direction that could break it. It does not, and the check was run rather than argued: sweeping every vertex of this module against the rear wheel center (-1.45, 0.355, 0.74), zero vertices fall inside the band. The smallest radius among the six points the narrowing moved into the band\'s axial span is the bead seat\'s well end at 0.2519, 16.9 mm clear of the 0.235 ceiling, and the tightest approach anywhere in the band is unchanged from wheels-7, wheels-9 and this module alike: r 0.2480 on the drop-well floor at |z| 0.7220, 13.0 mm clear. The flange face is still at local -0.0900, its outer edge is still r 0.2440, and drivetrain-9\'s rotor rings still bolt to it face to face.\n\nTHE VALVE, WHICH THIS WHEEL HAS NEVER HAD, AND WHICH IS A FOUR-GENERATION DEFECT. wheels-3, wheels-6, wheels-7 and wheels-9 all draw a valve through the FRONT well floor and none in the rear wheel, while drawing ONE cover part with ONE service door and fitting it to all four corners. So two of the four covers on this car have carried a service door opening onto solid carbon, and the rear tires have had no way to be inflated. It is the same class of defect this file has caught three times before, a fastener seated inside the part it bolts to, a lattice behind a solid panel, a backing plate with no window in front of it: geometry and the story about it disagreeing where nobody checks.\n\nIt goes on the OUTBOARD side of the drop well at local +0.0060, not the inboard side the front uses, and the reason is measured. drivetrain-9\'s rotor rings reach |z| 0.7280 and its hub bearings 0.7290. An inboard valve at local -0.0060 puts the stem at |z| 0.7298 to 0.7382, which is 1.8 mm off the rotor rings; the outboard placement puts the BUILT stem at 0.7420 to 0.7500 and stands the whole valve 12.80 mm off those rings measured surface to surface, segment to segment and vertex to triangle over both triangle sets. The convention matters on this number too: 13.8 mm is the axial difference and the closest approach is diagonal, so the axial figure overstates the gap by a millimeter exactly the way a nearest-vertex reading overstated the pack clearances on the discs panel. It is clocked to the same 54 degrees as the front so it lands between two spokes and under the cover\'s door, and the spoke half-width at that radius subtends 3.7 degrees against the 18 it has on either side.\n\nAND IT IS A CLAMP-IN RATHER THAN A SNAP-IN, on both axles, because of the pressure. A snap-in valve is a rubber body retained by its own interference in the rim bore and the industry rating on it stops around 4.5 bar; this tire runs 5.6. The part that goes in a hole at 5.6 bar is a brass stem through a sealing grommet, pulled down onto the outside of the rim by a hex nut, with a screwed metal cap that is a second seal rather than a dust cover. Three pieces are drawn and the grommet is not, because it is compressed inside the rim bore where no part of it can be a first hit: an orthographic first-hit sweep of 216 upper-hemisphere directions at 1.11 mm per pixel, run over this corner with the module alone and the cover on, returns 4,765 first-hit pixels for the stem, 3,564 for the cap and 1,562 for the nut, and would return zero for a grommet. Read the scene on that sentence: module alone. In the assembled Gen 10 car the fairing takes all three to zero, and the module header says so. wheels-9\'s own pass deleted a caliper backing plate, a banjo bolt and six pistons on exactly that test.\n\nThe rest of the drawing is wheels-7\'s and unchanged in every coordinate. Twelve flange bolts on the r 0.225 circle seating on the inboard face of a 2 mm co-cured titanium ring that runs |z| 0.646 to 0.650, so they bear on metal; the ring owning the whole flange face from r 0.1500 out to 0.2440 on its own; a hub pilot at r 0.0605 to 0.072 over |z| 0.730 to 0.756 with a lead-in chamfer, closed outboard by a clamp web whose five nuts sit at 0.7376 to 0.7471. The drop well is 6 mm deep against the front wheel\'s 24, because a 0.230 floor would put carbon inside the annulus at |z| 0.722, and that remains a shop-equipment consequence of putting a motor inside a wheel.',
      why: 'A contract is worth proving rather than asserting, and the failure mode here is silent. Nothing about the rear corner\'s PURPOSE changed this generation, so a drift would have to arrive through a shared constant or through a partner moving, and both have happened on this ladder. This generation did something more dangerous than either: it moved the rear wheel\'s own geometry, for a reason that has nothing to do with the contract, in the one axis the contract is written in. Six points crossed into the band\'s axial span and every one of them had to be re-swept. That is exactly the case where a module carries forward a sentence it has stopped being entitled to.\n\nThe valve is the other half of the same argument. Nobody noticed for four generations that a cover part fitted to four corners was opening onto two valves, because no tool asks whether a service access reaches the thing it services. What found it was drawing the rim and asking what a 5.6 bar tire needs at the hole.',
      fail: [
        'The co-cured titanium flange is still the extrapolated claim, unchanged since wheels-6 and unchanged here. What must become true: a titanium-to-CFRP co-cure holding bolt preload through a design life of drive-to-regen torque reversals at hub temperature and salt exposure, with no delamination signature. Rigs show it, fleets close it, and until then the joint is inspected at every tire change.',
        'The contract is 99.6 percent clean rather than clean, and that has not moved. suspension-9 still puts 13 vertices inside the annulus band, 48 V cable at r 0.1657 and |z| 0.7100, in a volume reserved for a motor. wheels-9 inherited that from wheels-7 and reported it; this module re-swept it and confirms it unchanged. tools/check-interfaces.sh reports the whole band as 302 non-drivetrain vertices on the Gen 9 preset and 302 on the same preset with this module swapped in as the only change, to the vertex and part for part, so nothing about the rim narrowing touched it either way. On the full Gen 10 preset it reads 284, and the 18 that leave are autonomy-4/ring, which autonomy-10 does not have. That is worth separating rather than quoting one number for both: the wheels-only swap is the comparison that tests this module, and the preset figure is the one a reader will see on the rail. It is reported here because this module owns the wheel side of that band and nobody else sweeps it.',
        'A 4.5J rear rim at 5.6 bar changes the duty on a flange nobody re-validated. The 13 mm annulus margin, the 0.5 mm pilot fit and the 12-bolt flange were sized against drivetrain-7 as built and carried through wheels-9, and the load path into them now arrives through a casing that is 41 percent stiffer vertically and 20 mm narrower. The bolts are the same, the ring is the same, and the impact loads reaching them through a stiffer tire are not. Nothing in this module models that, and nothing in the suspension slot is open this generation to catch it.',
        'THE REAR VALVE IS 104 TRIANGLES AND THREE MESHES A CORNER THAT THE STATIC CAR NEVER SHOWS, and the module header carries the measurement rather than leaving it to a reviewer. Orthographic first-hit, 216 upper-hemisphere directions at 1.11 mm per pixel: with the cover on it wins SEVEN pixels over three directions, which is a sampler catching a sliver and not visibility, and inside the assembled Gen 10 car it wins three. It is 7,957 pixels once the cover leaves, which the staged explode does at 120 mm of relative travel here. So this part is justified by packaging and by the service door that has opened onto solid carbon for four generations, and NOT by the silhouette. An earlier draft of the header claimed 1,405 pixels with the cover on and that figure does not reproduce on the hemisphere the header declares. The honest position is that a tire at 5.6 bar needs a valve at every corner and this one is paid for out of the explode view.',
        'The valve is drawn and the pressure monitoring is not. A car running 5.6 bar on a casing whose load capacity depends on that pressure needs a direct sensor per corner, and the only pressure telemetry on this vehicle is inferred from hv-4\'s wheel-speed comparison, which resolves a slow leak in tens of kilometers rather than in seconds. wheels-9 could afford that at 4.4 bar with 78 kg of load-index deficit already on the books. At 5.6 bar with 6.7 kg of margin, a corner that drops half a bar is over its rating before the driver is told. That is an hv or an autonomy item and it is named here because this is the module that made it urgent.',
      ],
      explode: [0, 0, 0.78],
    },
    covers: {
      name: 'Full-face covers',
      tagline: 'Two numbers moved and by different amounts: the seat followed the rim in 6.35 mm and the lip followed the tire in 10.0. The lip is still the outermost surface on the car.',
      mass: 6,
      count: 4,
      specs: [
        ['Type', 'Full-face CFRP disc, flush to the tire section, no moving parts'],
        ['Extent', 'r 0.048 inlet bore to r 0.312, seated on the rim flange lip'],
        ['Mass', '1.5 kg each, carried from wheels-7 without a change'],
        ['Outer lip', '|z| 0.8090 at all four corners (wheels-9: 0.8190)'],
        ['Flange seat', 'local 0.06365, following the 4.5J rim in 6.35 mm'],
        ['Maturity', 'Production practice'],
      ],
      how: 'CARRIED WHOLE FROM wheels-10, VERIFIED AT 1e-6 m RATHER THAN ASSERTED. All 25,804 cover vertices compare identical to wheels-10\'s, so the lip is still the outermost surface on the car at |z| 0.8090. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means GEN 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nThis part changed by two numbers and they are not the same number, which is the whole content of the panel. The flange seat follows the RIM, so it comes in 6.35 mm to local 0.06365. The outer lip follows the TIRE, so it comes in 10.0 mm to local 0.0690, which is world |z| 0.8090. The dish between them is therefore 3.7 mm shallower than wheels-9\'s, and every radius on it is wheels-7\'s untouched: the r 0.048 inlet throat, the bell mouth flaring to 0.062, the hub service recess, the riser, the 12 mm bayonet land recessed 1.5 mm, the r 0.2665 flange seat and the r 0.312 outer lip with its 1.1 mm rolled edge.\n\nTHIS PART OWNS THE OUTER EDGE OF THE CAR AT BOTH AXLES AND IT IS WORTH SAYING WHICH SURFACE THAT IS. The cover lip stands 1.5 mm proud of the tire section maximum, so at |z| 0.8090 it is the outermost surface of the whole corner, front and rear, exactly as it was at 0.8190. Frontal area is decided at the outermost surface, which makes the cover and not the tire the part the integral actually reads at those heights. The 1.5 mm is measured against the BUILT section maximum rather than taken from the tire panel\'s prose, because a cover sized off a sentence is how a lip ends up 11.5 mm proud of a tire that got narrower.\n\nWHAT THE NARROWING IS WORTH IN AREA, and the honest limits on the figure. One integrator, the same frontalArea in tools/silhouette.js that design/area-rezero.md re-zeroed the whole ladder on, run over both modules at 0.1 mm scanlines. This module\'s own built shadow falls from 0.307129 m2 to 0.289800, so 0.017329. An earlier draft of this sentence said 0.289793 and 0.017336 while the module header said 0.289800, so the file disagreed with itself by seven square millimeters; 0.289800 is what the integrator returns and the header was the half that was right. On wheels-9\'s own published tire-column convention, twice the tire band times 0.28, the columns fall from 0.0868 to 0.0756, so 0.0112, and that convention reproduces wheels-9\'s published 0.0868 to the digit.\n\nNeither of those is what the car gets, and the difference matters more than the numbers. Frontal area is a UNION over body, wheels and pack, and battery-7\'s rocker rails already stand at |z| 0.7800 in the band this tire occupies, so most of what the tire gives back was already in somebody else\'s shadow. Run the union with body-9 and a pack and it goes 2.097783 m2 to 2.090612 on battery-7, and 2.096910 to 2.089740 on battery-10 as that module stood when this was last re-swept. Three things in those four numbers, and only one of them is safe to quote.\n\nThe 2.097783 reproduces the AREA table\'s Gen 9 cell exactly, which is the check that says the integrator here is the shipped one. The DELTA is invariant to the pack, 0.007171 on battery-7 and 0.007170 on battery-10, so what this module buys is 0.00717 m2 whichever pack it is measured behind, and priced through computeBudget at GEN 10\'s own operating point rather than at Gen 9\'s marginal rate it is 2.08 miles and not the 1.87 that rate gives. Quoting the Gen 9 rate for a Gen 10 gain is the convention drift design/gen10.md hard point 1 exists to stop, and an earlier draft of this sentence did it.\n\nThe battery-10 COLUMN is not stable and must not be quoted at all. An earlier build of that module put it at 2.097789 and 2.090618, six square millimeters ABOVE battery-7 rather than 873 below, and this panel concluded from that pair that the pack notch was worth nothing in shadow because everything it removed stood behind a rocker rail. That conclusion was about a pack that no longer exists, and it is exactly design/retro-gen9.md\'s "a module written before its partner lands will measure against the wrong partner" turning up in the area integral rather than in a clearance. The pack has been rewritten under this measurement twice, and each time it was the two cells moved by about 0.00088 m2, which is a hundred and fifty times the number the old draft published. Note also that the sign depends on whether the wheels are in the union: body-9 with battery-10 alone is 0.000348 m2 LARGER than body-9 with battery-7, and only once the tire columns are added does the pack read smaller. A union does not decompose, which is the second reason these cells belong to one sweep run after every module has landed and not to this panel.\n\nNONE OF THOSE FOUR FIGURES IS THE GEN 10 AREA CELL AND NONE MAY BE PASTED INTO ONE. They are four cells of a 56-cell table measured by one process on one afternoon, and the table is only sound when every cell in it comes out of the same sweep after every module has landed. design/gen10.md hard point 2 and design/area-rezero.md standing rule 2 both say the same thing: AREA is regenerated ONCE, by the integrator, after every module in the generation has landed, because a sweep run between two of them produces a complete, self-consistent, wrong table that the guard passes. Nothing in this module edits a cell and nobody should run the sweep on its account.',
      why: 'The interesting property of this part is that it demonstrates the difference between following the rim and following the tire, and that a part which changed by two different amounts in two places is the one most likely to be drawn wrong.\n\nIt also does the thing wheels-9 said it did: it is the rim protector. The outboard sidewall of the tire carries no relief at all, no legend and no rib, because this dish runs 2 to 6 mm off it across every radius and takes 100 percent of the first hits from r 0.048 to 0.312 in an orthographic ray grid. Narrowing the tire and flattening the dish did not change that relationship, and it was re-measured rather than assumed: the cover\'s underside and the tire\'s outboard sidewall interpenetrate only where the elastomer seal is designed to squeeze them together, at 2.58 mm on both rungs to the hundredth, which is the same seal squeeze wheels-9 built.',
      fail: [
        'A full cover is a full cover in a curb strike, unchanged from wheels-7: the dish stands proud of the tire section at its outer edge, which is the first thing a curb touches, and a cracked cover is a whole cover. What changed is that the whole corner came in 10 mm, so where wheels-9 put the lip 41.8 mm from body-9\'s fairing this module measures 50.16 mm surface to surface. Ten millimeters of hand and tool access came back at the bayonet ring, against the 50 mm wheels-9 spent. That is a service improvement and it is worth exactly what it sounds like.',
        'The brake air path is scheduled by a louver this module does not own and nobody has re-derived it across two generations now. body-9 moved the arch louver bank to |z| 0.8750 to 0.9164 across y 0.580 to 0.733 and nobody re-derived the flow. This module then moved the cover\'s exhaust slot 10 mm inboard and 6.4 mm in the dish, into a pressure field that has now moved twice with no measurement behind either move. The 188 m3/h on the discs panel is a pumped figure for the disc, not a measured exhaust. Measured surface to surface, the gap from this cover to those louvers goes 72.40 mm to 82.39, so the exhaust has further to travel into a region nobody has characterized.',
        'The rear cover still rides the 0.90 explode vector rather than the corner\'s 0.78, matching drivetrain-9\'s rotor rings, exactly as wheels-3, wheels-6, wheels-7 and wheels-9 all disclosed. The cover cannot come off with the motor ring in place, so a cover service is a corner service. What is new is that the service behind that cover is no longer hypothetical at the rear: the rear wheel now has a valve, so somebody will actually open the rear door, and it is the door on the corner that needs the whole assembly apart.',
        'One part number for four corners is still the right call and it is now doing slightly more work. Both axles run the same rim, the same section, the same pressure and the same lip plane, so the cover is genuinely identical at all four corners in a way it has not been since Gen 5. The cost is that any change to it changes all four, and the front pair sits in a steered envelope while the rear pair does not.',
      ],
      explode: [0, 0, 1.45],
    },
    discs: {
      name: 'Front brake discs',
      tagline: 'Carried whole, re-derived anyway, and the panel where the front corner declares its plane to the pack and then says what the plane does not cover.',
      mass: 7,
      count: 2,
      specs: [
        ['Size', '365 x 30 mm vented C/SiC, carried whole from wheels-9'],
        ['Continuous case', '13.66 kW per disc re-derived (wheels-9: 13.67 on one method)'],
        ['Thermal mass', 'About 3,000 J/K, carried'],
        ['Ring planes', '|z| 0.604 to 0.634, unmoved, and this is the pack problem'],
        ['Pack corner', 'DECLARED at |z| 0.6625; the ring needs a further local bite'],
        ['Maturity', 'Production practice'],
      ],
      how: 'CARRIED WHOLE FROM wheels-10, VERIFIED AT 1e-6 m RATHER THAN ASSERTED. All 20,104 disc vertices compare identical to wheels-10\'s. The steered-lock table below was measured against battery-10 and is NOT re-measured against battery-11 here; design/gen11.md section 9 item 6 inherits that foul explicitly. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means GEN 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nTHE DISC IS CARRIED WHOLE AND THE SIZING CASE WAS RE-DERIVED RATHER THAN COPIED, which is how you find out whether anything moved. One model over both rungs: a 10 percent grade at 60 km/h on the preset laden mass, gravity power less rolling at the booked Crr less aero at Cd 0.108 on the measured area. Gen 9 at 1,787.58 kg gives 29.08 kW of gravity, 1.11 of rolling and 0.63 of aero, leaving 27.34 kW of friction and 13.67 per front disc. Gen 10 at 1,786.58 kg gives 29.07, 1.11, 0.63, 27.33 and 13.66. Ten watts. The ring, the 36 curved vanes in the 18 mm passage, the 3,000 J/K, the 740 to 800 C steady descent and the 3.5 mm to suspension-9\'s upper front ball joint are all wheels-9\'s and all unchanged, and translating nothing cannot change a radius.\n\nNote which way the Crr decision pushed that. Had this module booked 0.0034 the rolling term would fall to 0.99 kW and the disc would take 13.72 instead, because on a descent every watt the tire stops absorbing is a watt the friction brake absorbs instead. Refusing the count is worth 60 watts to this part, which is nothing and is the right sign, and it is the only place in the module where the two decisions touch.\n\nTHE PACK CORNER, WHICH IS THIS PANEL\'S REAL SUBJECT, AND battery-10 HAS LANDED SO IT IS MEASURED AGAINST THE PARTNER THAT SHIPPED. wheels-9 published three pack clearances here that a reviewer showed do not exist, because the surfaces interpenetrate, and HANDOFF.md records the correction. This panel does not publish a clearance across an intersection. It publishes the penetration, the interface plane, the clearance where there is one, and what none of that covers.\n\nFour sweeps, one predicate, tools/check-interfaces.sh\'s own at its own 0.005 mm tolerance, static:\n\n    wheels-9  x battery-7    5 part pairs   804 crossings   deepest 21.40 mm\n    wheels-10 x battery-7    5 part pairs   676 crossings   deepest 21.40 mm\n    wheels-9  x battery-10   0 part pairs     0 crossings\n    wheels-10 x battery-10   0 part pairs     0 crossings\n\nTHE STATIC CORNER IS CLOSED. battery-10 cut it and the notch is generous enough that it would have cleared wheels-9 too, which is the honest reading of that third row and is worth printing rather than letting this module take credit for the pack\'s work. What the narrowing contributed is the middle row: 128 crossing triangle pairs and 1.38 mm off the deepest gallery crossing against the OLD pack, and 10 mm of inner sidewall handed to the new one before it drew anything.\n\nThe clearances that exist now, measured surface to surface against battery-10 as built, segment to segment and vertex to triangle over both triangle sets rather than nearest vertex. The method is checked before it is used: run over wheels-9 against battery-7 it returns the 4.38 mm rim-to-galleries figure HANDOFF.md publishes, to the hundredth, and 4.38 is itself a correction of a 5.79 mm nearest-vertex reading.\n\n    disc ring to floor lid      10.00 mm   near (1.2904, 0.2974, 0.6040)\n    tire to floor lid           10.73 mm   near (1.1076, 0.2792, 0.6878)\n    wheel flange to floor lid   21.35 mm   near (1.1907, 0.2999, 0.6767)\n    caliper to floor lid        33.06 mm   near (1.2559, 0.3355, 0.6289)\n\nTWO OF THOSE FOUR ROWS FIRST SHIPPED AS 9.77 AND 33.30 AND THIS IS WHY THEY MOVED. battery-10 was written alongside this module and changed on disk after the first sweep, so those two rows were measured against a pack that no longer exists. That is design/retro-gen9.md\'s "a module written before its partner lands will measure against the wrong partner", live, inside the one generation whose hard point 6 says the pack and the wheels are one decision. The two rows that did not move, 10.73 and 21.35, are the tire and the wheel flange, and they did not move because the notch face they read is the one the declared interface pins. The rows that moved are the two the interface does not reach. Anyone re-running this table after battery-10 changes again should expect the same two rows to be the ones that move, and the interface is the reason.\n\nThe first row is still the one to read. battery-10 did not stop at the declared plane and go home: it cut past it to |z| 0.6550 across x 1.09 to 1.30 on lid, gallery, strike shield and its own corner closeout, so the DISC ring at 0.6040 to 0.6340, which the declared plane does not reach at all, clears by 10.00 mm, tying against the lid and against the corner closeout at the same vertex. The 26 by 56 by 30 mm bite this panel was going to have to ask for is already gone.\n\nTHE INTERFACE, DECLARED, AND EXACTLY WHAT IT ASSERTS. SYSTEM.interfaces carries front-corner-pack-outboard at |z| 0.6625, mirrored, realized by the tire with extent min. The derivation is one line off this module\'s built mesh: the tire\'s section maximum is a real vertex ring at 0.6725, and the plane is that ring less a 10.0 mm running clearance. It also leaves 12.5 mm over the cell stack, which sits at |z| 0.6500 on both packs, so a notch that lands on this plane takes lid, strike shield and cooling gallery and no cells. battery-10 declares the same key at the same 0.6625 with extent max, and it did not land ON the plane: its corner closeout stops at 0.6550, 7.5 mm inside the declared plane and 5.0 mm off its own cells, which measure |z| 0.6500 in the fouled x band 1.09 to 1.30 on both packs, and that is why the disc clears. The checker reports the key MET with two modules agreeing, this module\'s nearest tire vertex 10.0 mm off inside an 11 mm tolerance and the pack\'s nearest closeout vertex 7.5 mm off inside 8.\n\nAND HERE IS WHAT NONE OF IT COVERS, published on the same panel so nobody has to find it. tools/check-interfaces.sh sweeps STATIC geometry. The front wheels steer.\n\nRe-running the identical predicate with the front corner rotated about the vertical axis through (1.45, 0.74), one method over both wheels and both packs:\n\n    lock      wheels-9 x battery-10        wheels-10 x battery-10\n    0.0 deg    clean                        clean\n    1.0        clean                        clean\n    1.5        2 pairs, 40 crossings        clean\n    3.0        5 pairs, 745                 clean\n    3.5        9 pairs, 1,061               4 pairs, 73 crossings\n    4.0       10 pairs, 1,280               4 pairs, 159\n    8.0       10 pairs, 2,250              10 pairs, 1,961\n   14.0       10 pairs, 2,801              10 pairs, 2,607, deepest 21.40 mm\n\nSO THE CONTAINED LOCK AT THIS CORNER IS 3.0 DEGREES AND THE RACK COMMANDS 14. The narrowing buys exactly two degrees of it, from 1.0 to 3.0, and that is the honest size of what a tire section can do here. Beyond three degrees the front tire sweeps through the pack\'s forward outboard corner, and by fourteen it is 21.40 mm into the floor lid over ten part pairs and 2,607 crossing triangle pairs.\n\nThree things about that. It is INHERITED: Gen 9 bought 0.1136 m2 of frontal area by bringing the front track to |z| 0.74, and this is the rest of the invoice, arriving at a corner where the pack runs to x 1.29 and the axle sits at 1.45. It is the same shape of defect design/retro-gen9.md records against body-8, which claimed 17.25 degrees of contained lock and fouled at 3.11 when somebody finally swept it. And NEITHER MODULE CAN FIX IT: the pack cannot cut to |z| 0.5770 without taking cells that sit at 0.6500, and the wheel cannot leave, because no tire section reaches the plane and the disc ring is pinned outboard by the wheel spokes at |z| 0.706 and inboard by the caliper it straddles. It wants the pack to stop further forward than x 1.29 or the front track to go back out, and both of those are generation-scale.',
      why: 'A clearance is between two surfaces and a penetration is a different measurement, and this panel is where this project learned the difference the hard way. wheels-9 published 2.8 mm to the strike shield, 6.2 mm to the galleries and a 19 mm repair to the lid, and all three were nearest-vertex readings taken across an intersection. The correction then shipped with the same drift inside it, quoting 5.79 mm for a gap that is 4.38 because the closest approach lands on a triangle edge where no vertex sits.\n\nSo this panel states the convention on every number. Penetrations are plane-straddle depth at 0.005 mm, from tools/check-interfaces.sh\'s own predicate, which reproduces every published wheels-9 figure to the digit before it was used on anything new. Clearances are true surface separation, segment to segment and vertex to triangle over both triangle sets, which reproduces the corrected 4.38 mm to the hundredth. The two conventions are never mixed in one sentence.\n\nThe steered sweep is on this panel rather than in a footnote because a declared interface is a plane and the thing it has to protect is a swept volume. A module that declares the plane and stops has told the truth and left out the part that decides whether the corner is fixable. design/gen10.md hard point 3 asks for the plane. It also says a false declaration is worse than a red check, and a plane published as though it were the whole requirement would be one.',
      fail: [
        'THE STATIC CORNER IS CLOSED AND THE STEERED CORNER IS NOT, AND THE SECOND ONE IS THE BIGGER OF THE TWO. Zero crossings at rest against battery-10, ten part pairs and 2,607 crossings at the 14 degrees suspension-9\'s rack commands, contained to 3.0 degrees. tools/check-interfaces.sh will report the corner as clean on the Gen 10 preset and it is clean by everything that tool measures, which is exactly why this fail entry exists: a static checker going green on a steered corner is a false all-clear, and this file has been corrected once already for publishing a clearance that a different measurement did not support. Nothing about the pack check knows the wheels turn. The predicate that would catch it is the same one, run over a swept corner, and it is about forty lines.',
        'The pads are still the limiting component and the disc now runs hotter for a second reason. C/SiC handles 800 C and the organic and metallic binders in the pad do not; wheels-9 already put the descent at the top of the pad\'s friction window at 740 to 800 C. What is new is that the exhaust path behind this disc has moved twice with nobody re-deriving the flow: body-9 moved the arch louvers 150 mm up and 80 mm inboard, and this module then moved the cover\'s exhaust slot 10 mm in and 6.4 mm through the dish. 188 m3/h remains a pumped figure for the vane passage rather than a measured exhaust into a pressure field, and the 3,000 J/K ring has less margin to absorb a wrong schedule than wheels-7\'s 4,000 had.',
        'A narrower vane passage packs sooner, unchanged from wheels-9. An 18 mm passage reaches the debris-blocked state on less salt and dust than a 24 mm one, the symptom is a disc running 150 degrees hotter rather than a noise, and it starts from a ring already 100 degrees above where wheels-7 ran it.',
        'The wear sensor lead used to run through this disc and the tool that should have caught it does not exist. wheels-9\'s 2.6 mm lead crossed this part in 64 triangle pairs a side, 5.64 mm into the outboard friction plate, 4.32 mm through the ceramic band face and 0.96 mm through a vane, with its middle waypoint at radial 0.1545 and |z| 0.618, inside the ring band and inside the vane passage. SPEC.md leaves part pairs inside one module to tools/smoke.sh, and tools/smoke.sh checks metadata against geometry rather than geometry against itself, so nothing on this project sweeps a module against its own parts. The lead is rerouted on the calipers panel and this module now crosses its own discs in zero pairs, but the gap in the tooling is real and is worth more than the fix: an intra-module version of the cross-module predicate is about thirty lines and would have caught this at Gen 9.',
      ],
      explode: [0, 0, 0.45],
    },
    calipers: {
      name: 'Front calipers',
      tagline: 'Not one coordinate moved, and a 2.6 mm sensor lead that has run through the brake disc since wheels-6 comes out of it.',
      mass: 5,
      count: 2,
      specs: [
        ['Type', 'Fixed monobloc, 6 x 32 mm pistons, carried from wheels-6'],
        ['Clamp force', '38 kN per side at 160 bar, unchanged'],
        ['Torque available', '4.36 kNm per corner against the 1.29 a 0.714 g tire takes'],
        ['Straddle', 'Halves at |z| 0.5885 and 0.6495, unmoved'],
        ['Mass', '2.5 kg each, carried from wheels-9'],
        ['Maturity', 'Production practice'],
      ],
      how: 'CARRIED WHOLE FROM wheels-10, VERIFIED AT 1e-6 m RATHER THAN ASSERTED. All 6,758 caliper vertices compare identical to wheels-10\'s, including the rerouted wear sensor lead. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means GEN 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nNOT ONE COORDINATE OF THE CALIPER MOVED, and one 2.6 mm tube did. The casting, the six 32 mm pistons in three pairs, the titanium piston crowns, the rollback seals, the three bridges, the pads, the two-lug bracket reaching for suspension-9\'s upright at |z| 0.6475, the crossover boss and its banjo are all wheels-9\'s at wheels-9\'s coordinates. The corner did not translate this generation, so there was nothing for this part to follow.\n\nTHE PAD WEAR SENSOR LEAD WAS ROUTED THROUGH THE BRAKE DISC AND THAT IS A DEFECT THIS MODULE FOUND ON ITS OWN CORNER. Swept mesh by mesh inside the module with tools/check-interfaces.sh\'s own predicate at its own tolerance, wheels-9\'s lead crosses wheels-9/discs in 64 triangle pairs a side: 43 pairs 5.64 mm into the outboard friction plate, 9 pairs 4.32 mm through the ceramic band face, and 12 pairs 0.96 mm through a vane. Its second waypoint sits at radial 0.1545 and |z| 0.618, which is inside the ring\'s r 0.145 to 0.1825 band and inside the 18 mm vane passage between the plates. It is a cable threaded through a part that turns at 747 rpm and runs at 800 C on a descent.\n\nWHY NOTHING CAUGHT IT. SPEC.md is explicit that part pairs inside ONE module are not tested by tools/check-interfaces.sh, on the correct grounds that two modules sharing a volume is a decision neither can make alone while a module overlapping its own boxes is tools/smoke.sh\'s business. But tools/smoke.sh checks metadata against geometry, not geometry against itself. So there is no tool on this project that sweeps a module against its own parts, and this file has now shipped four generations with a wire through a brake rotor. Running the cross-module predicate with both sides pointed at one module is about thirty lines and it is what found this.\n\nTHE NEW ROUTE, PLACED AGAINST MEASURED CONSTRAINTS RATHER THAN DRAWN BY EYE. It goes under the caliper, out past the disc, and then up the caliper\'s own outboard face to a connector beside the bleed nipples, which is also what a wear sensor lead does on a real corner: it is captive to the caliper as far as a bulkhead and it is not a chassis harness. The two caliper halves are solid boxes over y 0.3499 to 0.4799, so the run holds y at or below 0.3400 until it is outboard of them; the ring\'s outboard face is |z| 0.634, so the run reaches 0.6480 before its radius comes inside 0.1825; the outboard half ends at |z| 0.6645, so the climb sits on 0.6690, 4.5 mm proud of the face it clips to; and the disc\'s hat bell stands at r 0.0900 over |z| 0.635 to 0.676, which the climb clears at radial 0.161.\n\nIT TOOK TWO ATTEMPTS AND THE FIRST ONE IS WORTH KEEPING. A route that climbed to the bracket at |z| 0.6470 passed straight through autonomy-4\'s cable ring, which crosses this corner at y 0.3925 to 0.4355 and |z| 0.5968 to 0.6623: autonomy-4/ring x wheels/calipers went from 494 crossing triangle pairs to 578 with the depth unchanged at 42.36 mm. That is design/gen10.md hard point 8\'s rule arriving in real time, a pair that gains crossings being this generation\'s rather than inherited, and it was caught by re-running the whole-car sweep rather than by looking at the corner. The route above puts that pair back at exactly 494, and body-9/front-fairings x wheels/calipers goes 832 to 815.\n\nTHE SIZING CASE GOT EASIER AND THE REASON IS EMBARRASSING. A peak stop on the Gen 9 preset at its 0.740 g tire is 10.07 kN at the road, about three quarters of it at the front once transfer has finished, 1.341 kNm per front corner. On Gen 10\'s 0.7137 g tire it is 9.71 kN and 1.292. The caliper delivers 4.36 kNm either way. So the one thing that made this part less oversized this generation is the tire getting worse, which is not a saving and is not booked as one: the kilogram wheels-7 refused to bank is refused again, for the reason it was refused twice before. Peak torque is not what sizes this caliper. Fade-free clamp after months of disuse, at the end of a descent, with a rear axle contributing under 8 percent, is what sizes it, and every one of those cases is unchanged.',
      why: 'A part that survives five generations of the hardware around it survives because its sizing case never got easier in a way that counts, and this generation is the cleanest demonstration yet: the only input that moved is the tire\'s peak grip, it moved the wrong way, and it made the caliper MORE oversized rather than less. Booking a kilogram off that would be banking a safety margin against a capability loss, which is the exact trade wheels-7 and wheels-9 both declined.\n\nThe sensor lead is the other half of the panel and it earns more space than the caliper does, because the caliper is right and the lead was wrong for four generations in a place nothing looks. Rerouting it is a fifteen-minute edit. Finding it needed a sweep nobody had written, and the reason nobody had written it is that the contract explicitly assigns intra-module overlap to a tool that does not check for it. That gap is worth more to the next generation than the fix is to this one.',
      fail: [
        'The bracket still does not land on the upright it is drawn against. Swept against suspension-9\'s built front knuckle, this module\'s two lugs and their pad at |z| 0.6475 stand 14.0 mm off the nearest knuckle surface, exactly as wheels-9 measured, because neither part moved. It is not a foul and not a float, since the caliper is captured by the ring it straddles at 1.0 mm; it is a bolted joint with no boss on the other side of it, and suspension-9 owes 14 mm of mounting face at radial 0.145, y 0.498, on the inboard flank of the front upright. Two generations have now published that requirement and no suspension generation has been open to take it.',
        'suspension-9\'s front knuckle is still 10.91 mm inside this caliper over 251 crossing triangle pairs, bit identical to wheels-9. Nothing this module did touched it and nothing this module could do would: the caliper is pinned by the ring and the knuckle is pinned by a suspension slot that is not open. It is one of the nine inherited pairs listed in full on the front wheels panel.',
        'Two calipers is still two single points, unchanged since Gen 2. These two components are the entire hydraulic system of the vehicle, one pressure block, two lines, twelve pistons, and the rear axle offers even less behind a mistake than it did in Gen 5 because the tire behind it now grips 3.5 percent less again.',
        'C/SiC pad dust is abrasive rather than merely dirty and the disc still runs 100 degrees hotter than wheels-7\'s, which shortens piston seal and dust-boot life. The seal interval was already shorter than the pad interval in Gen 7 and this generation does nothing about it. What it does add is a wear sensor lead that now runs on the OUTSIDE of the caliper rather than through the disc, so it is exposed to that dust where it used to be exposed to 800 C. Both are bad and one of them is not a fire.',
      ],
      explode: [-0.3, 0, 0.2],
    },
    'park-brake': {
      name: 'Park-and-rescue brakes',
      tagline: 'Untouched to the coordinate, re-derived to the newton-meter, and the generation that finally asked whether the tire can take what the drum can give. Nose down on a thirty percent grade it cannot.',
      mass: 2,
      count: 2,
      specs: [
        ['Type', '180 x 22 mm simplex inside the motor ring bore, carried'],
        ['Hold required', '894 Nm per corner at 30% grade laden (1,786.58 kg)'],
        ['Hold available', '1,080 Nm from a 6 kN dry spindle at r 0.090'],
        ['Statutory case', '551 Nm at the 18% grade type approval asks for'],
        ['Binding limit', 'NOT the drum. The rear TIRE, and nose-down at 30% it fails'],
        ['Maturity', 'Production practice'],
      ],
      how: 'CARRIED WHOLE FROM wheels-10, VERIFIED AT 1e-6 m RATHER THAN ASSERTED. All 8,786 park-brake vertices compare identical to wheels-10\'s, and the gearmotor at (-1.494, 0.287, plus and minus 0.616) is why the rerouted aft harnesses had to keep their terminations. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means GEN 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nTHE DEVICE IS UNTOUCHED IN EVERY COORDINATE AND ITS ARITHMETIC WAS RE-RUN ANYWAY, which is how this panel has earned its place twice before. Holding torque is a function of mass, grade and tire radius, and this generation moved exactly one of the three by exactly one kilogram. On a 30 percent grade gravity pulls 1,786.58 times 9.81 times sin(arctan 0.30), which is 5,036 N down the slope against Gen 9\'s 5,039, and this axle is the only axle holding it, so each corner resists 2,518 N and at the 0.355 m tire radius that is 894 Nm. Gen 9 needed 894 Nm. To the newton-meter, nothing moved, and the radius is why: P.tireR is frozen, so the one input that could have changed this number is the one this generation was forbidden to touch.\n\nA simplex drum roughly doubles what its spindle applies, so 894 Nm at the 90 mm band radius asks 4.97 kN and the dry spindle is specified at 6, giving 1,080 Nm and a fifth of margin. Every coordinate is unchanged: the rotating carrier necking from r 0.090 onto the hub pilot at r 0.072 over |z| 0.658 to 0.732, the static boss at 0.6395, the backplate at 0.6315 holding r 0.100, the shoes at 0.682, the gearmotor at 0.616 reaching inboard to 0.596. Every radius is inside 0.155, so the device lives in the annulus BORE and the contract band stays void.\n\nAND THE DRUM WAS NEVER THE BINDING LIMIT, WHICH NO GENERATION OF THIS SLOT HAS SAID. Three generations have compared 894 Nm of demand against 1,080 Nm of drum and called it a fifth of margin. That comparison assumes the tire can put 894 Nm into the road, and on a rear-axle-only park brake it often cannot. Solved with one model over both rungs, static rear share 43.1 percent, center of gravity 0.500 m, wheelbase 2.90 m, longitudinal transfer on the slope included:\n\n    case                    rear normal share   mu required   Gen 9   Gen 10\n    30 % grade, nose up          0.4624            0.6215     0.740   0.714   holds\n    30 % grade, nose down        0.3633            0.7910     0.740   0.714   NEITHER HOLDS\n    18 % grade, nose up          0.4547            0.3896     0.740   0.714   holds\n    18 % grade, nose down        0.3936            0.4500     0.740   0.714   holds\n\nParked NOSE DOWN on the 30 percent grade this device is sized for, the rear tires need a coefficient of 0.791 and have 0.714. The drum can produce 1,080 Nm and the road will not take 894. This is INHERITED and not created: wheels-9\'s 0.740 g tire needs the same 0.791 and misses by less, so the car has never held that case and three panels have implied it does by quoting a drum against a demand. What Gen 10 did was make the miss worse, from a ratio of 0.936 to 0.902, and it did that by trading grip for rolling resistance on a count it then declined to book.\n\nThe statutory case is the one that is actually certified and it passes comfortably: 18 percent nose down needs 0.450 against 0.714, which is 59 percent of margin, and 551 Nm against 1,080. So the device meets the law and misses the specification this file wrote for itself, and the two have been printed as one number for three generations.',
      why: 'Re-deriving a carried number rather than copying it is how you find the input that moved, and this time the useful finding is that nothing moved and the comparison was wrong anyway. wheels-7 found 20 Nm of extra laden mass. wheels-9 found 8 Nm going the other way. This module found zero, and then found that the quantity everyone has been comparing is not the quantity that decides the case.\n\nThe temptation to delete a device that contributes under 8 percent of a dead-vehicle stop grows every generation and is wrong every generation, because the law requires a car with every electron gone to hold and to stop. What this panel adds is that the law\'s case, 18 percent, is not the case the panel has been quoting, 30 percent, and only one of the two is met.',
      fail: [
        'THE 30 PERCENT NOSE-DOWN HOLD DOES NOT EXIST AND IT IS THE TIRE, NOT THE DRUM. 0.791 required against 0.714 available, a ratio of 0.902, on a car whose park brake acts on one axle. The honest fixes are all outside this module: a park brake on the front axle, which means a second dry actuator and a second failure set on the axle that already carries the entire hydraulic system; a lower center of gravity, which is nine modules; or a tire with more grip, which is the trade this generation just made in the other direction. What this module can do is publish the number, which no previous generation of this slot did.',
        'It is still the least inspectable friction device on the vehicle, inside a motor inside a wheel, and no better placed than it was in Gen 7. Shoe condition is inferred from the gearmotor current signature on hv-4\'s telemetry, and the self-adjusting spindle that could jam in Gen 2 can still jam here behind more hardware than ever.',
        'The bore it lives in is still crowded by suspension-9 and the crowding is bit identical to wheels-9: rear structure through this device in 1,416 crossing triangle pairs at 20.00 mm, which is the deepest pair the wheels slot has against ANY module on the car, and rear steer at 2.46 mm over 215 pairs. Note where that deepest one is. It is at the REAR, on the axle Gen 9 deliberately did not touch and Gen 10 did not touch either, which is why a part list drawn around the front corner has missed it twice.',
        'Two full applies from 20 km/h and it needs minutes to cool, unchanged and by disclosure. The fallback deceleration behind it stays at wheels-7\'s 0.33 g, and it stays because it is limited by wheel-motor torque rather than by grip: 0.33 g needs a coefficient of 0.33 and the tire still has 0.714. That is the one place on this panel where the tire change costs nothing.',
      ],
      explode: [0, 0, 0.78],
    },
    'master-unit': {
      name: 'Brake-by-wire unit',
      tagline: 'Seven generations without moving a coordinate, and the eighth moves two cables because a partner filled the air they ran through. The box did not move. The corridor did.',
      mass: 3,
      specs: [
        ['Architecture', 'One-box dry unit, front hydraulics only, 0 to 180 bar in 120 ms'],
        ['Aft corridor', '|z| 0.6297..0.6477, y 0.3175..0.3446 (wheels-10: |z| to 0.7678)'],
        ['Corridor clearance', '12.30 mm to battery-11/sill, 15.49 to the lid, 17.43 to air-supply'],
        ['Tightest on the part', '2.37 mm, the crossover against thermal-11/local-circuits'],
        ['Min bend radius', '72.1 mm on the BUILT polyline, 39.1 on the curve under it'],
        ['Harness pair', '6.2896 m against wheels-10\'s 5.6057, so +683.9 mm, +12.2 %'],
      ],
      how: 'THE HARDWARE DID NOT MOVE AND THE ENVELOPE AROUND IT DID, which is the same shape of defect this ladder found at Gen 9 in a halfshaft and design/gen11.md risk 4 predicted in writing before anyone measured it. The pedal box, the plunger block, the ball-screw motor, the reservoir with its filler and level connector, the ECU with its heatsink and connector shells, the conduit and the forward hydraulic pair are wheels-10\'s geometry at wheels-10\'s coordinates. Both hydraulic runs still terminate at (1.286, 0.484, plus and minus 0.620) and both aft harnesses still land on the park-brake gearmotor at (-1.494, 0.287, plus and minus 0.616). What changed is the middle of the two aft runs, and only because design/gen11.md section 7 merged battery-10\'s pack rail with body-9\'s rocker into one structural sill and put it exactly where the cable was.\n\nTHE MEASUREMENT THAT MADE THIS A MODULE. wheels-7 routed both aft harnesses out to |z| 0.7400 and three generations carried it, because on a 1.9536 m car that is the 65.0 mm of air between a pack rail at 0.7800 and a rocker inner face at 0.8450 with no y overlap at all. design/gen11.md section 7 fills it. Swept against the built battery-11 with tools/interfaces.js\'s own predicate at its own tolerance, wheels-10/master-unit puts 570 crossing triangle pairs 23.52 mm inside battery-11/sill, deepest at (0.2568, 0.3457, 0.6707). Scanned as vertices inside the cabin band x -1.12 to 1.03, it puts 1,491 of them at |z| 0.6045 to 0.7678 and y 0.3327 to 0.3930, and 1,262 inside the sill\'s own box of |z| 0.6600 to 0.7800 over y 0.1035 to 0.4200. Every one is above the lid top of 0.3080, so the pack\'s shoulder does not cover any of it: it is at rocker height, which is the one height the sill now owns outright. The rebuilt part puts ZERO vertices in that box, zero in body-11\'s pan box, and its outermost point anywhere is a clip ferrule at |z| 0.6477.\n\nWHERE IT WENT, AND WHY THERE AND NOWHERE ELSE. Four corridors exist on this section and three are shut. Outboard of the sill is body-11\'s floor pan from y 0.4200 to 0.5600 and the tire column beyond that. Under the pack is the strike shield at y 0.1025 to 0.1440 and then the road, which is not where a park-brake command line goes. On top of the lid is forbidden outright by design/gen11.md section 5, which is the clause the first body-11 broke and lost the whole height budget doing it. What is left is the rocker corner INBOARD of the sill, and when this route was drawn it was not empty: hv-4\'s floor perimeter ring ran the length of the car at |z| 0.6360 to 0.6940 over y 0.3510 to 0.3626, with its bywire feeds just outboard at 0.6920 to 0.7080 over y 0.3531 to 0.3669, and suspension-9/air-supply sits inboard of both, topping out at |z| 0.6174 and y 0.3357. That left two slots, one above the ring and one below it, and both were built and swept before either was chosen.\n\nTHE RING IS GONE NOW AND THE ROUTE IS PUBLISHED AGAINST WHAT THE PRESET BUILDS, NOT AGAINST WHAT IT WAS DRAWN AGAINST. hv-11 landed after this route and redrew the floor: it puts no material below y 0.4200 anywhere over this corridor, its lowest part there is a zonal controller sitting exactly on 0.4200 at |z| 0.5100 to 0.6310, the lowest member spanning the run\'s own |z| band is the spine underside at 0.4350, and swept part by part hv-11 has ZERO penetrating pairs against this module. suspension-9/air-supply is the only partner left in the corner and it holds 17.43 mm at (-0.0455, 0.3256, 0.6323). So the corridor is now empty above the run for 75.4 mm, the nearest hv-11 part measures 80.94 mm surface to surface, and every hv figure in the paragraph above is history rather than clearance. It is kept because a route that survives the deletion of its own justification should say which of the two it is.\n\nBELOW THE RING WON, ON A MEASUREMENT RATHER THAN A PREFERENCE. A corridor at y 0.390 clears the ring in y and still reads 2.00 mm of penetration where the run descends to the rear termination, and it sits 82 mm above a cabin floor at 0.3020 in a car whose whole generation is a height budget. The corridor at y 0.326 sits 18.0 mm above the cabin floor plane at 0.3080 and 24.0 mm above the lid\'s outboard step at 0.3020, under the ring and over that step, which is where a rocker trim goes on a real car, and against the hv of the day it took hv-4/ring from wheels-10\'s 444 crossings at 21.13 mm to 82 at 3.69, and against the hv-11 the preset builds it takes it to zero. Built and measured, the run occupies |z| 0.6297 to 0.6477 and y 0.3175 to 0.3446 from x 0.600 back to x -1.050.\n\nWHAT THE CORRIDOR RUN CLEARS, RE-MEASURED AGAINST THE PRESET AND CORRECTED. Every figure below is triangle to triangle over the nine modules a gen11 preset builds, scoped to the corridor span and to nothing else, and the row that was wrong was wrong by 10 mm in the comfortable direction. The three closest things to the run are battery-11/sill at 12.30 mm, with the nearest point on this module a clip ferrule at (0.0395, 0.3257, -0.6477) facing a wall at -0.6600; battery-11/floorlid at 15.49 mm; and suspension-9/air-supply at 17.43 mm, which the earlier draft did not list at all and which is the third wall of this corridor. After those it opens out: battery-11/sensefilm 34.79, battery-11/galleries 38.65, battery-11/bricks 41.99, thermal-11/local-circuits 64.01, body-11/floor-pan 70.37, hv-11/spine 80.94.\n\nAND THE ROW THAT WAS FALSE, NAMED, BECAUSE THIS PROJECT HAS SHIPPED THREE FALSE CLEARANCES AND EVERY ONE WAS A NUMBER QUOTED FROM THE WRONG MEASUREMENT. An earlier draft of this paragraph published "to hv-4/zonal 23.52". 23.52 mm is not a clearance at all: it is the DEPTH wheels-10/master-unit penetrates battery-11/sill, three sentences up in this same panel, copied into a clearance row. The true figure for the row as written is 13.41 mm, from the whole part to hv-4/zonal at (-1.1373, 0.3372, -0.6362), and the corridor run itself is over 100 mm from it. Both numbers are moot, because hv-4 is not in this preset: hv-11 is, and its zonal controllers are 123.69 mm from the corridor run. The same applies to the "thermal-9/recovery-core 22.44" that sat beside it, which measures 22.12 mm against the thermal-9 it named and 143.48 mm against the thermal-11 the preset builds.\n\nAND THE +z RUN STOPPED CROSSING THE CABIN, which is the change worth more than the sill fix. wheels-10 took it across the car at (0.70, 0.45, 0.00) and (0.40, 0.36, 0.55). On a 1.9536 m four-seat car that is under a center console. On a 1.20 m tandem cabin whose floor IS the pack lid and whose seat pan sits 150 mm above it, it is a cable lying across the cabin floor at seat-pan height, under the front occupant, and the sweep agrees. Re-run against the interior the preset builds rather than against interior-6, which is the four-seat cabin this route was first checked on, wheels-10/master-unit crosses interior-11/front-seats in 118 triangle pairs to 37.55 mm. That is the deepest penetrating pair the wheels slot has anywhere on this car, deeper than the 23.52 mm sill foul this module exists to fix, and it is a brake line inside a seat. It closes, and so do three more that only appear on the built Gen 11 partners: autonomy-11/ring at 76 pairs and 14.94 mm, thermal-11/recovery-core at 26 and 12.32, and the sill itself. It now crosses at x 1.075, which is 38.4 mm forward of body-11\'s floor pan front edge at 1.0366 and 5.0 mm AFT of the sill\'s front face at 1.0800, so the crossover is on the toeboard plane in the front compartment. An earlier draft said it was forward of both, which is a millimeter error in the direction that sounds better and is corrected here because it is the kind that gets repeated.\n\nTHE CROSSOVER TOOK THREE ATTEMPTS AND THE FIRST TWO ARE THE REASON THIS PANEL TRUSTS THE THIRD. A crossover at x 1.050 and y 0.494 passed the five-module gate this module was written against with zero new pairs, and drove 173 crossing triangle pairs 37.3 mm into thermal-9/local-circuits, which is the HVAC stack occupying x 0.95 to 1.11 at |z| under 0.3775 over y 0.33 to 0.66. A second at x 1.050 and y 0.440 cleared that block in y and still caught it on the approach at (1.005, 0.479, -0.328). The route that ships goes OUTBOARD first, to |z| -0.400 at x 1.030, which was past thermal-9\'s stack in z rather than under it in y, then forward and across at x 1.075 and y 0.452, which is a lane measured clear over the whole span from z -0.36 to +0.64.\n\nAND THE CROSSOVER CLEARANCES WERE MEASURED AGAINST thermal-9, WHICH IS NOT THE THERMAL MODULE THIS PRESET BUILDS. An earlier draft published 21.8 mm to local-circuits, 21.8 to the recovery core and 32.3 to the glycol loop, all against thermal-9. Against the BUILT thermal-11 the crossover holds 2.37 mm to thermal-11/local-circuits at (1.0505, 0.4599, -0.3536), which is the tube\'s upper surface, 32.73 mm to the glycol loop and 38.71 mm to the recovery core. 2.37 mm is a clearance and not a crossing, and the gate at the foot of this file confirms zero penetrating pairs against thermal-11 in either direction. It is still the tightest air on this route by a factor of five, and the sentence above it does not survive the measurement either: thermal-11/local-circuits reaches |z| 0.4375 forward of x 0.8675, and the detour turns at 0.400, so the route is INSIDE the block in z rather than past it. What clears it is a local step in the block face, by 2.37 mm, and calling that "past the stack in z" would be describing thermal-9\'s geometry on thermal-11\'s car.\n\nTHE PART AS A WHOLE COMES CLOSER TO THINGS THAN THE CORRIDOR RUN DOES, and an earlier draft of this panel said "the closest it comes to anything is 12.30 mm" without saying which "it" it meant. Scoped to the corridor run that sentence is true. Scoped to master-unit it is not. Below zero, the two rear terminations are INSIDE suspension-9/rear-steer by 9.96 mm and rear-structure by 7.82, which are the connector interpenetrations this panel opens with and which the fail list prices. Above zero the list is: 2.37 mm to thermal-11/local-circuits at the crossover, 4.78 mm to drivetrain-9/hub-bearings, 5.17 mm to hv-11/spine at (1.2372, 0.5238, 0.5241), 8.28 mm to thermal-11/glycol-loop at (1.0606, 0.6304, -0.2354), then 12.30 mm to battery-11/sill. TWO of those five are unchanged wheels-10 geometry meeting a Gen 11 partner: the forward hydraulic pair this module never touched holds 5.17 mm to hv-11 and 8.28 to thermal-11, both at points that measure identically on wheels-10. That is this module\'s opening sentence pointed the other way, and it is the reason the gate is run over the preset rather than over the parts that changed.\n\nWHAT THE REROUTE COSTS, AND A REROUTE THAT COSTS NOTHING IS NOT A REROUTE. The -z run goes 2.5863 m to 2.5972, so 10.9 mm longer. The +z run goes 3.0194 m to 3.6924, so 673.0 mm longer, all of it in the outboard-and-forward detour around the HVAC stack. The pair goes 5.6057 m to 6.2896, plus 683.9 mm and plus 12.2 percent. Bends over 3 degrees of turn go 6 to 6 on the -z run and 7 to 10 on the +z.\n\nTHE MINIMUM BEND RADIUS, RE-MEASURED ON THE ROUTE THIS MODULE ACTUALLY BUILDS, AND IT IS WORSE THAN THE NUMBER THAT WAS PUBLISHED. An earlier draft said the radius falls from 663.8 mm to 102.1 at the outlet turn, where the +z run leaves the unit through 57 degrees, and concluded that it passes. Both figures are circumradii of the CONTROL POLYGON, which is not the route: lib.tube runs a Catmull-Rom through those points and TubeGeometry samples it in arc length, so the built centerline is the sample set and the control points are only its handles. Measured three ways, on both runs, on the same curve the mesh is made from:\n\n     control polygon      wheels-10  663.8 mm   ->  wheels-11  102.1 mm\n     BUILT polyline       wheels-10  354.6 mm   ->  wheels-11   72.1 mm\n     underlying curve     wheels-10  227.4 mm   ->  wheels-11   39.1 mm\n\nThe built figure is 72.1 mm, at sample 2 of 44 on the +z run at (1.0052, 0.4806, -0.4119), and that is the number this module publishes. The control polygon flattered it by 30 mm and misnamed it as well: the tightest corner is not the 57 degree outlet turn but the 74.1 degree corner one control point later, at (1.030, 0.466, -0.400), where the run stops going outboard and turns forward. Two corners 84 mm apart get averaged into one circumradius by a polygon and separated by the curve.\n\nAND THE VERDICT FLIPS ON THE THIRD ROW. On a 7.0 mm outside diameter harness a fixed installation wants about six diameters, so 42 mm. The built polyline at 72.1 mm is 10.3 diameters and passes. The curve that polyline samples is 39.1 mm, which is 5.6 diameters, and it does NOT: it is 2.9 mm inside the rule at the one corner named above, and the only reason the built figure looks better is that an 84 mm sample pitch cannot represent a 39 mm corner. A denser tube would not fix it, it would only stop hiding it. The honest statement is that this route is at or just past its own bend limit at one corner, that the fix is a fourth control point spreading that turn over 150 mm rather than 84, and that it is not made here because it moves geometry after the gate rather than before it. It is filed on the fail list. It is a cable and not a hydraulic tube, so the tighter tube rule does not govern; the forward hydraulic pair, which is 8.0 mm steel and does have that limit, was not touched and its minimum radius did not move.\n\nCLIPS AND SERVICE, BOTH WORSE. Six clips on the -z run and ten on the +z against wheels-10\'s four and four, because the runs are longer and because the old spacing left one 1.05 m span with nothing holding it next to what is now a structural member. Spans are 0.14 to 0.61 m against 0.25 to 1.05. Eight extra clips is eight extra things to release, and the access is the real cost: at |z| 0.7400 in the old flank the run was reachable from under the car once the aero floor was off, and at 0.6400 in the rocker corner it is inside the cavity behind the sill, which on this car has no removable outer panel because the sill IS the structure. Service is from inside the cabin, under whatever trim interior-11 puts over the floor edge, and that is a cabin-in job on a two-seat car with one door line per side.\n\nMASS IS NOT BOOKED AND HERE IS THE NUMBER. 683.9 mm of extra harness at roughly 55 g per meter for a 7 mm conduited multicore is 38 g, and eight extra clips at about 3 g each is 24 g, so 62 g. This project\'s mass ledger works to the kilogram, so booking it means rounding 62 g up to 1 kg and charging the car about 0.7 miles it did not lose. master-unit stays at 3 kg and the module stays at 74.0, exactly as wheels-10 declined to book the 0.39 kg its rim narrowing saved.',
      why: 'Because the alternative was to leave a brake harness inside a structural member, and because of the three things a routing decision has to answer this one only had one honest answer.\n\nA harness in the sill is not a clearance problem that a millimeter fixes. The sill is the crush structure design/gen11.md section 7 bought to protect a tandem occupant who no longer has 380 mm of car beside him, and its whole argument is that a merged rail and rocker carry a side impact where a 0.9 to 1.6 mm door skin cannot. A cable inside that section is a cable in the load path: it is crushed first in the event the member exists for, and in normal service it is a stress raiser in a bonded box beam that nobody inspects. It also cannot be a stressed member, which is the constraint that rules out the tempting fix of clipping the run to the sill\'s inner web and calling the sill its support.\n\nThe corridor it went to is the one every production car uses for exactly this cable, and that is corroboration rather than the argument. The argument is that it is the only volume on this section bounded on three sides by parts that are already agreed, clear over the whole 1.65 m it needs, and inboard of a plane two modules have declared. Taking the LOWER of the two slots rather than the upper is the second half of that: it keeps the harness 18.0 mm off the cabin floor plane instead of 82, and it was chosen after both were built and swept rather than reasoned about. The argument for it at the time was that it tucked under hv-4\'s floor perimeter ring, two floor-level runs stacked in one rocker being normal practice; hv-11 has since deleted that ring and the choice stands on the height alone, which the panel says plainly rather than leaving the old reason in place.\n\nThe forward crossover is the part of this that was not forced. The run could have crossed on the lid at floor level and been 400 mm shorter. design/gen11.md section 5 forbids building on the lid, and even if it did not, a cable across a 1.20 m cabin floor at seat-pan height is a thing an occupant stands on, which is what the 118 pairs 37.55 mm inside interior-11/front-seats were. Spending 673 mm of harness to put the crossover on the toeboard is the trade, and it is stated as a trade because the 673 mm is real and is 22 percent of that run.',
      fail: [
        'THE TWO REAR-CORNER PAIRS BOTH GOT DEEPER BY THE REPORTED METRIC AND THE CURVE BARELY MOVED, and design/gen10.md hard point 7 counts a pair that deepens OR gains crossings as this generation\'s work, so it is claimed here rather than filed under inherited. master-unit against suspension-9/rear-steer goes 192 crossing pairs at 9.79 mm to 184 at 9.96, so eight FEWER crossings and 0.17 mm deeper, and against suspension-9/rear-structure 122 at 7.27 to 126 at 7.82, so four more and 0.55 mm deeper. Sampled at 30,000 points, the new centerlines lie within 0.054 mm of wheels-10\'s everywhere aft of x -1.300, which is the span both suspension parts occupy, and the last four control points are wheels-10\'s to the digit. Between x -1.100 and -1.300 the curve does move, by up to 5.61 mm at x -1.168, because Catmull-Rom shapes a segment from its neighbors and the neighbor at x -0.900 came down 20 mm. Past that the difference is the TESSELLATION: TubeGeometry samples uniformly in arc length, the route ahead got 673 mm longer, so a different triangle is the deepest straddler on the same curve. SPEC.md already warns that plane-straddle depth on a slender part crossing a large panel is not the intrusion, and this is that warning arriving as a 0.55 mm swing on a curve that moved 0.05. The honest statement is that the physical intrusion is unchanged to a twentieth of a millimeter and the published number is not, and both halves belong on the panel.',
        'THE REAR CORNER IS STILL FOULED AND THIS MODULE DID NOT TRY. Getting to a gearmotor at (-1.494, 0.287, plus and minus 0.616) means passing through suspension-9\'s rear subframe, which spans x -1.7551 to -1.3049 over y 0.1487 to 0.5924, and through the rear steer actuator at y 0.137 to 0.323. There is no route that does not: outboard is drivetrain-9\'s rotor and stator rings from |z| 0.6500, below is the same subframe, above is the motor. The fix wants the suspension slot and the wheels slot open in one generation and design/gen11.md opens neither, so the pair is carried with its numbers printed. It is the same conclusion wheels-10 published about the 1,416-pair park-brake foul at 20.00 mm, which is deeper than anything on this panel and is also still here, bit identical.',
        'THE hv FOUL THIS ENTRY USED TO REPORT IS GONE, AND THE ENTRY IS KEPT BECAUSE OF HOW IT WENT. An earlier draft published "hv-4/ring is still penetrated, 82 crossings at 3.69 mm" as this module\'s largest open item. That reproduces exactly against hv-4, and hv-4 is not what a gen11 preset builds. Swept against the built hv-11, part by part, the wheels slot has ZERO penetrating pairs with the hv slot, for wheels-10 as well as for this module, because hv-11 deleted the perimeter ring design/gen11.md section 6 condemned and put nothing below y 0.4200 anywhere over this corridor. This module did not earn that. hv-11 did, and the residue it was going to have to argue with never arrived: the corridor at y 0.3175 to 0.3446 clears the lowest hv-11 material over it by 75.4 mm and its nearest part by 80.94 surface to surface.\n\nWHAT REMAINS IS THE WARNING THE ENTRY WAS REALLY MAKING. A module that publishes a foul against a partner the preset does not build is publishing a number about a car that does not exist, and this file did it in four places before it was caught. Every hv figure in this module is now measured against hv-11 or labeled as history. The corridor is still not declared by anybody, which is the entry below.',
        'THE CORRIDOR IS RESERVED AND NOBODY AGREED TO IT, AND interior-11 HAS SINCE LANDED WITHOUT AGREEING TO IT. An earlier draft of this entry said interior-11 did not exist yet and that the pair would be swept once it did. It has been: interior-11/nvh is the only part of it anywhere near this corner and it holds 163.41 mm, so the corridor is clear and nothing has to move. That is luck rather than agreement. interior-11 owns the cabin floor edge, this run sits at |z| 0.6400 and y 0.3175 to 0.3446 inside the cabin\'s outer footprint above the lid, and no key names it in either module, so the next interior that puts a sill trim or a floor-edge finisher where a finisher belongs takes it without breaking a declared plane. What that module needs is the whole envelope, which is |z| up to 0.6477 and y 0.3175 to 0.3446 over x 0.600 back to -1.050, plus about 20 mm of hand access to release a clip. A sill trim covering it is still the expected answer and it is still not this module\'s to draw.',
        'THE WHOLE CORRIDOR IS 12.30 mm WIDE AND THE PLANE THAT BOUNDS IT IS NOT DECLARED BY ANYBODY. battery-11\'s sill has a continuous inboard wall at |z| 0.6600 from y 0.3020 to 0.4200 over x -1.0600 to 1.0800, and the outermost thing on this part is a clip ferrule at 0.6477. That is the margin, at every station, and it is a clip and not the cable: the tube alone holds 15.72 mm, at (0.0170, 0.3244, -0.6443). An earlier draft said 16.5 mm, which is 0.640 plus a 3.5 mm radius against a 0.6600 wall, arithmetic on the control points rather than a measurement of the tube; the Catmull-Rom overshoots |z| 0.640 by 0.3 mm and the built skin reaches 0.6443. Twelve millimeters is a real production clearance for a clipped harness against a bonded panel and it is not a comfortable one, and NOTHING PROTECTS IT. battery-11 declares sill-outboard at |z| 0.7800 and sill-top at y 0.4200, and says nothing about the inner wall, so a later pack that thickens the section inboard, which is a normal thing to want from a crush member, takes this corridor without breaking a single declared key. The right fix is a sill-inboard key at 0.6600 held jointly by the pack and this module, and it is not written here because a declared key needs both halves in one commit and this module may not edit battery-11. It is filed for the integrator instead.\n\nAND THE FIRST DRAFT OF THIS ENTRY HAD THE NUMBER WRONG IN THE COMFORTABLE DIRECTION, which is why the paragraph above is stated the way it is. Scanning the sill as vertices in x stations reported |z| 0.6600 at x plus and minus 1.05 and 0.7075 everywhere between, so the draft concluded the corridor was 63 mm wide mid-car and only pinched at two bulkheads. A 2.14 m plate has vertices at its ends and nowhere else. Re-measured on triangles it is one wall the whole way. The surface-to-surface number, 12.30 mm, was right in both drafts, because it never asked the question of vertices; the story built around it was wrong for a page.',
        'THE +z RUN IS AT OR PAST ITS OWN BEND LIMIT AT ONE CORNER, AND THE FIRST DRAFT OF THIS MODULE DID NOT KNOW BECAUSE IT MEASURED THE WRONG CURVE. The published radius was 102.1 mm, a circumradius of the CONTROL POLYGON, and it was published with the verdict "it passes at 14.6 diameters". On the polyline the tube is actually built from, 44 arc-length samples of the Catmull-Rom through those points, the minimum is 72.1 mm at (1.0052, 0.4806, -0.4119). On the curve that polyline samples it is 39.1 mm at (1.030, 0.466, -0.400), the 74.1 degree corner where the run stops going outboard and turns forward. On a 7.0 mm outside diameter harness at the usual six diameters the limit is 42 mm, so the curve is 2.9 mm inside it and 5.6 diameters where the panel claimed 14.6. The route is buildable and the mesh is fine; what fails is the cable rule, at one corner, by three millimeters. The fix is a fourth control point spreading that 74 degrees over about 150 mm instead of 84, and it is not made here because it is a geometry change after the gate rather than before it, and this file has already shipped once on numbers that were not re-swept. The next pass on this module owns it.',
        'THE CROSSOVER CLEARS thermal-11 BY 2.37 mm AND THAT IS THE TIGHTEST AIR ON THE WHOLE ROUTE. It is a clearance and not a crossing, the gate reports zero penetrating pairs against thermal-11, and it is still five times tighter than anything else on this run and roughly a tenth of what the earlier draft published against thermal-9. The cause is that thermal-11 widened its forward local-circuits block to |z| 0.4375 after this detour was drawn to |z| 0.400, so the route is inside the block in z and survives on a local step in its face. Nothing declares that face. A thermal pass that fills the step, which is the normal thing to want from an HVAC casing, closes 2.37 mm without breaking a single declared key, and the pair would then be a brake command line inside a coolant block. It is filed for the integrator alongside the sill-inboard key, and the two want the same fix: this corridor and this crossover both need a declared plane and neither has one.',
        'NOTHING WAS RE-DERIVED ON THE CONTROL SIDE AND THREE CALIBRATIONS ARE STILL STALE FROM GEN 10. The anti-lock threshold, the pad conditioning schedule and the 0.33 g fallback all date from before wheels-10 changed the tire under them, and wheels-10 said so. This module changed a cable route, which touches none of them, so it neither fixed nor worsened any of it and it inherits all three. The 0.33 g fallback is now the oldest open item in this file at eight generations, and it is still an estimate from a drivetrain model rather than a number derived from the built machine.',
      ],
      explode: [0.5, 0.35, 0],
    },
  },
};

/* ── Geometry ──
   Corner-local frame carried from wheels.js through wheels-9.js: origin at
   the wheel center, z along the axle, s = sign(world z) so +s is outboard.
   NEITHER ORIGIN MOVES THIS GENERATION. FRONTZ and REARZ are both 0.74,
   exactly as wheels-9 left them, and they are still written twice on
   purpose: they are two independent contracts that happen to agree, and
   collapsing them into one constant is how the next generation moves an axle
   it did not mean to move.

   P.wheelZ stays 0.81 in js/common.js and P.wheelY and P.tireR stay 0.355.
   Do not edit any of the three. body-8's fairing inboard wall is literally
   P.wheelZ - 0.110, so editing that constant makes a partner foul vanish by
   accident rather than by drawing. P.wheelY appears in seventeen system
   modules and is a live code read in all seventeen of them, and
   drivetrain-9 derives the driveEff the whole ladder books from a rolling
   radius that depends on it. P.wheelZ is mentioned in twelve modules and is
   a live code read in nine. Both counts were re-measured here with block and
   line comments stripped rather than carried: design/gen10.md reports 17 and
   15 for P.wheelY and 12 and 11 for P.wheelZ, so the mention counts agree to
   the module and the live sub-counts do not. The convention is the
   difference and neither reading changes anything.

   THE ONE AXIS THIS GENERATION MOVES IS THE CORNER'S OWN WIDTH. Every radius
   below is wheels-6's or wheels-7's to the digit. Every axial coordinate on
   the tire, the two rim barrels and the cover moved inboard, and by three
   different amounts, which is the thing to keep straight: the RIM narrowed
   6.35 mm a side because it is 4.5J instead of 5.0J, the TIRE narrowed 10.0
   mm a side because it is a 135 section instead of a 155, and the COVER's
   seat followed the rim while its lip followed the tire. Nothing else in the
   file moved at all: the disc, the caliper, the park brake and the master
   unit are wheels-9's geometry at wheels-9's coordinates.

   Key world planes, FRONT corner. An arrow marks a plane that moved:
     0.5640  caliper bridge, inboard face
     0.5735  caliper inboard half, inboard face
     0.6040  disc friction ring, inboard face
     0.6340  disc friction ring, outboard face
     0.6625  DECLARED front-corner-pack-outboard keep-out plane      <-
     0.6725  tire inner face, the 135 section maximum                <-
     0.67635 rim inboard flange lip, 4.5J                            <-
     0.68285 rim inboard bead seat, flange end                       <-
     0.6925  hub face plane, ET47, the declared halfshaft interface
     0.7400  wheel center plane
     0.79715 rim outboard bead seat, flange end                      <-
     0.80365 rim outboard flange lip                                 <-
     0.8075  tire outer face                                         <-
     0.8090  cover outer lip, the outermost surface on the car       <-

   Key world planes, REAR corner. The contract half is untouched:
     0.6315  park-brake backplate, static
     0.6382  flange bolt heads, inboard face
     0.6460  flange bolt heads, seating face on the titanium ring
     0.6500  CONTRACT flange face, drivetrain-9 rotor rings bolt here
     0.67635 rim inboard flange lip, 4.5J                            <-
     0.6725  tire inner face                                         <-
     0.7300  outboard edge of the CONTRACT annulus
     0.7400  wheel center plane
     0.7460  valve, which this wheel has never had before            <-
     0.8075  tire outer face                                         <-
     0.8090  cover outer lip                                         <- */

const FRONTZ = 0.74;             // front wheel center |z|, the Gen 9 move
const REARZ = 0.74;              // rear wheel center |z|, carried from wheels-7
const TSEG = 48;                 // tire lathe segments
const RSEG = 48;                 // cover, disc and flange-ring lathe segments
/* Rim barrels stay at 40. Their silhouette is never the corner's outline:
   the cover owns every radius out to 0.312 from outboard and the tire owns
   everything past it, so the barrel is only ever seen inboard or exploded,
   where 40 segments carry 0.8 mm of chord sag on a 0.53 m circle. Holding
   the covers and discs at 48 and the barrels at 40 is worth 864 triangles
   and no visible difference, which is the whole argument against raising a
   segment count everywhere at once. */
const WSEG = 40;                 // rim barrel and shell segments

/* THE RIM NARROWS WITH THE SECTION AND NOTHING ELSE ABOUT IT MOVES.
   4.5J instead of wheels-7's and wheels-9's 5.0J, so the bead seats sit at
   local +-0.05715 instead of +-0.0635 and the flange lips 6.5 mm outboard
   of each seat as before. The seat DIAMETER does not change, because the
   rim is still a 20 inch rim: BEAD and FLANGE are radii and they are
   wheels-6's to the digit. Everything derived from a radius therefore
   carries unchanged, which includes the drop-well floors, the cover's
   flange seat radius, the bayonet land and the whole of both hub joints. */
const RIMW = 0.05715;            // 4.5J half-width: bead seat, local axial
const BEAD = 0.2540;             // 20 inch bead seat radius, at the flange end
const BEADT = 0.0021;            // 5 degree seat taper across the 23.9 mm seat
const FLANGE = 0.2665;           // rim flange lip radius
const LIP = RIMW + 0.0065;       // flange lip, local axial: 0.06365
const SECT = 0.0675;             // 135 mm section: half-width, local axial
const EDGE = 30;                 // crease threshold in degrees, design/crispness.md

/* ── What is actually visible, re-measured on THIS module rather than
   carried, because a full aero cover hides most of a wheel and geometry
   nobody can see is a decal with a triangle budget.

   THE METHOD, STATED IN FULL BECAUSE THE ANSWER DEPENDS ON THE SCENE AND AN
   EARLIER DRAFT OF THIS BLOCK DID NOT SAY WHICH SCENE IT USED. Orthographic
   first-hit z-buffer, 216 directions on a Fibonacci UPPER hemisphere so no
   eye is ever below the ground plane, 1.11 mm per pixel, pixel-center
   sampling, run separately over the front +z and the rear +z corner. Every
   figure in this block is one run of that function. It is run over THREE
   scenes, because a wheel module measured on its own and a wheel measured
   inside the car do not give the same answer and only one of them was
   published before:

     A  the corner, module alone, aero cover ON, which is the convention
        wheels-9 used and the one the shares below are on
     B  the same corner with the cover OFF, which is the state the staged
        explode reaches: covers travel |z| 1.45 front and 0.90 rear against
        the wheel's own 1.15 and 0.78, so the cover leaves by 300 mm at the
        front and 120 at the rear while the tire stays on its rim
     C  the corner inside the assembled Gen 10 preset, all nine modules

   Scene A, front corner, 47,760,958 first-hit pixels, by part:

     tires        46.66 %      covers        30.68 %      discs   10.26 %
     front-wheels  5.57 %      master-unit    3.69 %      calipers 3.14 %

   Scene A, rear corner, 46,530,359: tires 46.32, covers 29.45, rear-wheels
   17.37, park-brake 4.05, master-unit 2.81.

   Two things this decided, and both went the way the measurement said.

   THE VALVE STAYS AND IT GETS A THIRD PIECE. In scene A the clamp-in valve
   returns 4,765 first-hit pixels for the stem, 3,564 for the cap and 1,562
   for the nut, 9,891 in all against wheels-9's two-piece snap-in at 8,367,
   one method over both. The sealing grommet was drawn and then deleted: it
   is compressed inside the rim bore and can be a first hit from no direction
   at all, which is the same test that took wheels-9's caliper backing plate,
   banjo bolt and six pistons off the corner.

   THE REAR VALVE IS DIFFERENT AND AN EARLIER DRAFT OF THIS BLOCK HAD IT
   WRONG. It said the rear valve returns 1,405 pixels against zero because
   the rear well is deeper under its cover. Re-run on the hemisphere this
   block declares, the rear valve returns SEVEN pixels over three of 216
   directions in scene A, which is not visibility, it is the sampler catching
   a sliver. The rear cover does not leave a way in. What the rear valve does
   return is scene B: 3,501 for the stem, 3,303 for the cap and 1,153 for the
   nut over 38, 50 and 23 of 216 directions. So it is kept on a narrower
   claim than the one that was published. A tire at 5.6 bar needs a valve at
   every corner, the part is 104 triangles and three meshes a corner, and it
   earns them in the exploded and cover-off states rather than in the static
   silhouette. Anything that wanted a stronger claim than that would have to
   cut the service door in the cover as real geometry, which is a cover
   generation and not a detail.

   THE REROUTED SENSOR LEAD IS NOT A DECAL, AND ITS PUBLISHED NUMBER WAS THE
   REJECTED ROUTE'S. An earlier draft said 17,796 pixels on the front corner
   against wheels-9's 2,687. Measured on the route this file actually ships,
   scene A gives 9,198 for the tube, 973 for the sensor body and 160 for the
   clip, 10,331 in all, against wheels-9's 2,451 on the same run. Still four
   times as visible, and the reason the two disagree is instructive: the
   first route climbed at |z| 0.6470 out in the open, and the shipped route
   climbs at 0.6690 tucked against the caliper's outboard face, which is what
   keeps it out of autonomy-4's cable ring. The route that measured better
   here is the route that fouled a partner. Scene B is 21,779, 975 and 2,797.

   AND SCENE C IS THE LIMIT OF ALL OF IT, WHICH NOTHING IN THIS FILE SAID
   BEFORE. Inside the assembled car the front +z corner's 520 million first
   hits belong to body-9 at 58.75 percent, battery-10 at 20.37 and interior-6
   at 11.95, and every feature named above measures zero or near zero: the
   valve 0 pixels from all 216 directions, the lead 45 pixels over 4. The
   corner is behind a fairing. That does NOT make the corner a decal, because
   explode and the wheel-level camera flights are what the corner is drawn
   for and both are scene A or B. It does mean a module-alone visibility
   figure is a claim about the module and not about the car, and this project
   has been bitten twice by a number whose convention was implied rather than
   written down.

   ONE THING MEASURED AND THEN NOT BUILT. Raising the tire lathe from 48 to
   60 segments takes the chord sag on the crown from 0.760 mm to 0.487 and
   costs 2,688 triangles across four tires. The tire is the single largest
   first-hit surface on the car at 46.6 percent, so it is the one place a
   segment count would be defensible, and it is still not worth 0.27 mm of
   sag: it would take this module from 94.1 percent of its budget to 98.7
   with nothing left for the generation after. wheels-9 made the same call
   about barrels at 40 segments and it was right. ── */

/* Rotate a Y-axis mesh so its axis runs along z. */
function zc(mesh) { mesh.rotation.x = Math.PI / 2; return mesh; }

/* Lathe in the corner-local frame: profile is [radius, axialOffset] pairs
   in increasing axial order, where axialOffset = |z| - (corner center).
   deg creases the result: a molded step, a bead seat or a groove wall
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

/* ── Tires ──
   135/75 R20 on a 4.5J rim, against wheels-9's 155/65 R20 on 5.0J.

   WHAT IS FROZEN, AND IT IS THE WHOLE RADIAL COLUMN. The rim seat radius is
   BEAD 0.2540, the flange lip is FLANGE 0.2665 and the crown is P.tireR
   0.355, so the section HEIGHT is 101.0 mm on both tires and the outside
   diameter is 0.7100 m on both. P.wheelY 0.355 puts the hub on the crown
   radius and the contact patch on y 0.0000 with no slack at either end, and
   seventeen modules read P.wheelY as live code. design/gen10.md section 4b
   and hard point 5b make the consequence explicit and this module obeys it: the
   section, the compound, the pressure and the construction are open and the
   DIAMETER IS NOT. Every axial coordinate below moved and not one radial
   coordinate did.

   Aspect ratio is therefore an output rather than an input. 101.0 mm of
   section height on a 135 mm section is 74.8 percent, so the size reads
   135/75 R20 for the same reason wheels-7's read 155/65: it is the only
   aspect that keeps the rolling radius on the constant.

   WHAT MOVED, in one table, local axial half-widths:

                        wheels-9    wheels-10
     bead seat            0.0635      0.05715   4.5J instead of 5.0J
     section maximum      0.0775      0.0675    135 mm instead of 155
     tread band edge      0.0570      0.0496    the shoulder radius station
     full-radius crown    0.0470      0.0409
     groove depth        5.5 / 5.0 mm  4.5 mm
     circumferential
       grooves               5           4      the center groove is deleted

   THE CENTER GROOVE IS DELETED AND THAT IS THE POINT OF THE PATTERN, not a
   simplification. A groove down the centerline splits the rib carrying the
   highest contact pressure into two half-ribs that can each squirm
   independently, and block squirm is hysteresis in the tread band. One
   continuous center rib is what a low-loss tread does, and what it costs is
   the one drainage path directly under the standing water a tire displaces
   first. The wet number is on the panel and it is worse.

   The rim protector and the section asymmetry are wheels-9's and the reason
   survives the narrowing: the outboard sidewall runs 2 to 6 mm off the inside
   of a cover that takes 100 percent of the first hits from r 0.048 to 0.312,
   so nothing may stand proud there and nothing there could be seen if it did.
   The rib stays on the INBOARD sidewall, which faces the arch. */
const TIRE = [
  /* inboard sidewall: the half a viewer can see */
  [BEAD,   -RIMW],     /* bead heel on the tapered rim seat, local -0.05715 */
  [0.2670, -LIP - 0.0020],  /* rim protector, turned out over the flange lip */
  [0.2800, -LIP],      /* casing level with the flange lip, as wheels-9 had it */
  [0.3040, -0.0658],   /* carried station, scaled on the section */
  [0.3180, -SECT],     /* SECTION MAX, world |z| 0.6725: do not move */
  [0.3340, -0.0645],   /* carried station, binds the 14 degree sweep */
  [0.3470, -0.0575],   /* carried station, shoulder */
  /* crown: four grooves and three ribs, the center one continuous */
  [0.3535, -0.0496],   /* shoulder radius up to the crown */
  [0.3505, -0.0477],   /* shoulder groove, 4.5 mm deep */
  [0.3505, -0.0446],
  [P.tireR, -0.0409],  /* crown edge */
  [P.tireR, -0.0228],
  [0.3505, -0.0209],   /* intermediate groove, 4.5 mm deep */
  [0.3505, -0.0171],
  [P.tireR, -0.0152],
  [P.tireR,  0.0152],  /* CONTINUOUS CENTER RIB, 30.4 mm, no center groove */
  [0.3505,  0.0171],
  [0.3505,  0.0209],
  [P.tireR,  0.0228],
  [P.tireR,  0.0409],
  [0.3505,  0.0446],
  [0.3505,  0.0477],
  [0.3535,  0.0496],
  /* outboard sidewall: the half the cover hides, so it carries no relief */
  [0.3470,  0.0575],
  [0.3340,  0.0645],
  [0.3180,  SECT],     /* SECTION MAX, world |z| 0.8075: do not move */
  [0.3040,  0.0658],
  [0.2790,  LIP],      /* casing level with the flange lip the cover seats on */
  [BEAD,    RIMW],
];

function tirePart(s, rear) {
  const g = lib.part('tires', [0, 0, s * (rear ? 0.78 : 0.85)]);
  g.add(zlathe(TIRE, s, M.rubber, TSEG));
  return g;
}

/* A CLAMP-IN VALVE, AND THE PRESSURE IS WHY IT IS NOT THE SNAP-IN ONE.
   wheels-9 drew a two-piece rubber snap-in valve, a stem and a grommet seat,
   which is the right part for the 4.4 bar it carried and is not rated for
   the 5.6 this tire runs: a snap-in valve is a rubber body retained by its
   own interference in the rim hole and the industry rating on it stops
   around 4.5 bar. The part that goes in a hole at 5.6 bar is a clamp-in: a
   brass stem through a sealing grommet, pulled down onto the OUTSIDE of the
   rim by a hex nut, with a screwed metal cap that is a second seal rather
   than a dust cover.

   THE GROMMET IS NOT DRAWN AND THAT IS DELIBERATE. It is compressed inside
   the rim bore between the stem flange and the well floor, so no part of it
   can be a first hit from any direction, and this file has form for paying
   triangles for exactly that: a caliper backing plate, six pistons and a
   banjo bolt all measured zero first hits in wheels-9 and two of the three
   came off. Three pieces, two materials, and the third material wheels-9
   spent on this valve comes back.

   It sits on the same radius as the cover's service door, because a full
   cover means the only way to a valve is through that door, and it is the
   one place on this wheel where the pressure argument is a part rather than
   a sentence. */
function valve(g, wellR, a, s, ang = Math.PI * 0.30) {
  const stem = lib.cyl(0.0040, 0.032, M.copper, 10);
  zat(stem, wellR - 0.0140, ang, a, s);
  stem.rotation.z += Math.PI / 2;
  g.add(stem);
  const nut = lib.cyl(0.0068, 0.0050, M.steel, 6);
  zat(nut, wellR - 0.0035, ang, a, s);
  nut.rotation.z += Math.PI / 2;
  g.add(nut);
  const cap = lib.cyl(0.0052, 0.0090, M.copper, 10);
  zat(cap, wellR - 0.0295, ang, a, s);
  cap.rotation.z += Math.PI / 2;
  g.add(cap);
}

/* ── Front wheel ──
   wheels-6's wheel narrowed to 4.5J and nothing else. One-piece CFRP:
   barrel, ten integral spokes, hub face with the co-cured titanium insert.
   The hub face inboard plane is at local -0.0475 as it has been since
   wheels-6, so it lands at world |z| 0.6925, which is the declared
   front-halfshaft-outboard interface and which this generation does not
   touch. Well floor at r 0.230, 24 mm deep, because no annulus stands in
   front of it. */
function frontWheelPart(s) {
  const g = lib.part('front-wheels', [0, 0, s * 1.15]);

  /* Barrel. Every RADIUS wheels-6 set is here to the digit, flange lip
     FLANGE 0.2665, bead seat BEAD 0.2540 and the 24 mm well floor at
     r 0.2300. Every AXIAL coordinate moved inboard with the 4.5J width, so
     the inboard flange lip goes from local -0.0700 to -0.06365 and the
     outboard lip the same distance the other way.

     TWO THINGS ARE NEW AND BOTH ARE THE PRESSURE.

     THE SEAT IS TAPERED NOW, AND IT SHOULD ALWAYS HAVE BEEN. wheels-6
     through wheels-9 drew the bead seat as a cylinder at constant BEAD,
     which is not what a rim is: a passenger rim seat rises at 5 degrees
     toward the flange, and that taper is the whole mechanism by which
     inflation pressure drives the bead up the ramp into an interference fit
     against the flange. On a 4.4 bar tire a flat seat is a drawing error. On
     a 5.6 bar tire it is the retention argument, so it is drawn: BEADT
     0.0021 of radius across a 23.9 mm seat, measured back as 5.02 degrees.

     THE HUMPS GET A PARTNER AT THE REAR. wheels-9 put a hump inboard of each
     front bead seat and none at all on the rear wheel, which reads as an H2
     rim at the front and a flat-base rim at the rear on a car whose two
     axles now run the same tire at the same pressure. Both wheels carry
     humps on both seats here.

     WHAT THE NARROWING BOUGHT AT THE PACK. The inboard flange lip moves from
     world |z| 0.6700 to 0.67635. Measured surface to surface against
     battery-7 as built, one method over both wheels, the wheel's one
     surviving pack clearance goes from 4.38 mm to 5.85 mm, measured surface
     to surface rather than nearest vertex, and it is still the only pack
     clearance this corner has. Six millimeters of flange does not buy six
     millimeters of clearance because the approach is diagonal, which is
     itself the reason to measure it rather than subtract it. Everything else
     about that corner is a penetration and it is on the discs panel. */
  g.add(zlathe([
    [FLANGE,       -LIP],       /* flange lip crest, the inboard limit */
    [0.2645,       -0.0625],    /* rolled corner under the lip */
    [0.2620,       -0.0608],
    [BEAD,         -RIMW],      /* bead seat, flange end */
    [BEAD - BEADT, -0.03325],   /* bead seat, well end: 5 degree taper */
    [0.2570,       -0.0295],    /* safety hump */
    [BEAD - BEADT, -0.0257],
    [0.2300,       -0.0180],    /* drop well, 24 mm */
    [0.2300,        0.0180],
    [BEAD - BEADT,  0.0257],
    [0.2570,        0.0295],    /* safety hump */
    [BEAD - BEADT,  0.03325],
    [BEAD,          RIMW],
    [0.2620,        0.0608],
    [0.2645,        0.0625],
    [FLANGE,        LIP],
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
     well. This is where a one-piece wheel reads as molded or does not. */
  for (let i = 0; i < 10; i++) {
    g.add(spokeMesh([
      [0.0700, -0.0340, 0.0215, 0.0120],
      [0.1050, -0.0300, 0.0150, 0.0105],
      [0.1600, -0.0225, 0.0122, 0.0092],
      [0.2050, -0.0140, 0.0135, 0.0078],
      [0.2305, -0.0090, 0.0180, 0.0066],
    ], s, M.carbon, (i / 10) * Math.PI * 2));
  }

  /* Five lug nuts on the pocketed land, seen down the cover's inlet bore
     and nowhere else, which is why they are heads rather than cylinders. */
  for (let i = 0; i < 5; i++) {
    g.add(zat(zfast(0.0105, M.steel, 'hex', s, 1), 0.046, (i / 5) * Math.PI * 2, -0.0295, s, false));
  }

  /* Valve, through the well floor at r 0.2300, pointing inboard down the
     radius: see the valve helper above for why it is now a clamp-in. */
  valve(g, 0.2300, -0.0060, s);

  /* Balance weights were drawn on the inboard flange and taken off again for
     the clearance reason in the barrel comment above. There is nowhere else
     on this wheel to put one: the outboard flange is under the cover and the
     well is inside the sealed tire cavity. */

  return g;
}

/* ── Rear wheel ──
   wheels-7's rear wheel with the rim narrowed to 4.5J alongside the front,
   and nothing else touched: the CONTRACT flange face is still at local
   -0.0900, its outer edge is still r 0.2440, and the lathe still leaves the
   annulus void. Over |z| 0.65 to 0.73 (axial -0.090 to -0.010) the profile
   radius is 0.248 or greater everywhere except the flange face itself, which
   lies exactly on the |z| 0.65 boundary plane. */
function rearWheelPart(s) {
  const g = lib.part('rear-wheels', [0, 0, s * 0.78]);

  /* THE CONTRACT IS A VERTEX CONTRACT AND THIS PROFILE IS WHERE IT LIVES.
     Over local -0.090 to -0.010, which is world |z| 0.650 to 0.730, every
     point below must sit at r < 0.155 or r > 0.235. The flange face plane at
     -0.0900 carries exactly two radii, 0.1500 and 0.2440, one either side of
     the band, and the straight edge between them crosses the band with no
     vertex on it, which is the same face drivetrain-9's rotor rings bolt to.

     THE NARROWING MOVES SIX POINTS INSIDE THE BAND AND EVERY ONE OF THEM WAS
     RE-SWEPT RATHER THAN ARGUED. Pulling the inboard bead seat from local
     -0.0635 to -0.05715 and the flange lip from -0.0700 to -0.06365 moves the
     whole inboard rim section 6.35 mm outboard, INTO the axial span the
     contract covers, which is the direction that could break it. It does not,
     because every one of those points is a rim radius: the smallest is the
     bead seat at BEAD - BEADT, 0.2519, which is 16.9 mm clear of the 0.235
     ceiling and is the figure the panel publishes. An earlier draft of this
     comment said 0.2517 and 16.7 mm, which is neither the constant nor the
     built vertex: the six rings the narrowing moved into the band sweep at
     r 0.26650, 0.26200, 0.25400, 0.25190, 0.25700 and 0.25190. The
     tightest approach anywhere in the band is unchanged and is still the
     drop-well floor at r 0.2480 and |z| 0.7220, 13.0 mm clear, and the sweep
     still returns zero breaching vertices. */
  g.add(zlathe([
    [0.2440,       -0.0900],   /* flange face outer edge, on the CONTRACT plane */
    [0.2540,       -0.0855],   /* fillet: from here out the profile clears r 0.235 */
    [0.2620,       -0.0790],
    [0.2650,       -0.0700],
    [FLANGE,       -LIP],      /* inboard bead flange lip */
    [0.2620,       -0.0608],   /* radius under the lip */
    [BEAD,         -RIMW],     /* inboard bead seat, flange end */
    [BEAD - BEADT, -0.03325],  /* seat, well end: the same 5 degree taper */
    [0.2570,       -0.0295],   /* safety hump, which this wheel did not have */
    [BEAD - BEADT, -0.0257],
    [0.2480,       -0.0180],   /* shallow drop well, forced by the annulus */
    [0.2480,        0.0180],
    [BEAD - BEADT,  0.0257],
    [0.2570,        0.0295],   /* safety hump */
    [BEAD - BEADT,  0.03325],
    [BEAD,          RIMW],
    [0.2620,        0.0608],
    [FLANGE,        LIP],
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
     as it stood was centered at -0.0960, which put its seating face at
     -0.0921, 1.9 mm INSIDE the 2 mm ring it is supposed to bear on: a bolt
     head grown into the laminate rather than bolted to it. Left as plain
     heads rather than promoted to lib.fastener because these twelve sit on
     the face drivetrain-9's rotor rings bolt to, and the rear tire and rear
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

  /* center web: ten spokes, pilot to drop well, every station outboard of
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

  /* A VALVE, WHICH THIS WHEEL HAS NEVER HAD. wheels-3, wheels-6, wheels-7 and
     wheels-9 all draw a valve in the FRONT wheel and none in the rear, while
     drawing one cover part with one service door and fitting it to all four
     corners. Two of the four covers therefore carried a service door over
     nothing, and the rear tire had no way to be inflated. It goes on the
     OUTBOARD side of the drop well at local +0.0060, not the inboard side the
     front uses, because the inboard side is 5 mm from drivetrain-9's rotor
     rings at |z| 0.7280: measured, the outboard placement stands the stem at
     |z| 0.7420 to 0.7500 and stands 12.80 mm off those rings measured
     surface to surface over both triangle sets. State the convention: 13.8
     mm is the AXIAL difference from 0.7418 to the rings' 0.7280 and this
     file does not publish one of those as a clearance, because the closest
     approach here is diagonal and lands a millimeter short of it. It is
     clocked to
     the same 54 degrees as the front so it lands between two spokes and under
     the cover's door, and the spoke half-width at that radius subtends
     3.7 degrees against the 18 it has either side. */
  valve(g, 0.2480, 0.0060, s);

  return g;
}

/* ── Covers ──
   wheels-7's cover, one part for all four corners, following the rim and the
   section inboard. A shallow CFRP dish from a r 0.048 inlet bore out to
   r 0.312, seated on the rim flange lip at r 0.2665 and flaring outboard so
   its edge stands 1.5 mm proud of the tire section maximum. Every RADIUS is
   wheels-7's. The two axial numbers that own this part both moved with the
   narrowing, and they moved by different amounts:

     flange seat   local 0.0700 to 0.06365,  because the rim is 4.5J
     outer lip     local 0.0790 to 0.0690,   because the tire is 135 wide

   so the dish is 3.7 mm shallower from seat to lip than wheels-9's, and the
   cover's outer lip lands on world |z| 0.8090 instead of 0.8190. That lip is
   the outermost surface of the whole corner at both axles, which makes this
   part, not the tire, the one that owns the outer edge of the frontal-area
   integral. It also makes it the part that must never be sized by the tire's
   prose: 1.5 mm proud of the BUILT section maximum, measured. */
function coverPart(s, rear) {
  const g = lib.part('covers', [0, 0, s * (rear ? 0.90 : 1.45)]);

  /* The dish, station by station on wheels-7's radii. Inboard to outboard: a
     bell mouth whose throat is the r 0.048 bore and whose lip flares to
     0.062, a step down into a service recess over the hub, a riser onto the
     main face, a land recessed 1.5 mm where the bayonet lock lives, and a
     rolled outer edge instead of a knife edge. Five steps, five highlight
     breaks, and the creasing is what makes them breaks rather than shading. */
  g.add(zlathe([
    [0.0480, 0.0533],   /* inlet throat, the published r 0.048 bore */
    [0.0512, 0.0565],   /* bell radius */
    [0.0620, 0.0589],   /* bell lip */
    [0.0740, 0.0575],   /* step down into the hub service recess */
    [0.1200, 0.0571],   /* recess floor */
    [0.1300, 0.0603],   /* riser onto the main face */
    [0.1800, 0.0625],   /* carried station */
    [0.2420, 0.0634],
    [0.2440, 0.0619],   /* bayonet land, recessed 1.5 mm and 12 mm wide so a
                           lock head sits ON it rather than over its edge */
    [0.2560, 0.0619],
    [FLANGE, LIP],      /* seats on the rim flange lip at local 0.06365 */
    [0.2850, 0.0672],
    [0.3060, 0.0686],
    [0.3120, 0.0690],   /* OUTER LIP, world |z| 0.8090: do not move */
    [0.3110, 0.0686],   /* rolled edge, 1.1 mm of real section on the rim */
  ], s, M.carbon, RSEG));

  /* Peripheral seal, an elastomer bead in the flange seat. Sunk so its
     outboard face is flush with the dish and the whole of it shows on the
     inboard side, which is the side it seals on and the side it is seen
     from. The ring it replaces was half proud of the outer face.

     The outer edge keeps wheels-9's 1.1 mm of rolled section and the reason
     is measured rather than stylistic. A cover edge is allowed to be thin; it
     is not allowed to spend a millimeter of somebody else's clearance to look
     thick. The gap from the cover's underside to the tire's outboard sidewall
     is on the covers panel, measured surface to surface off the built mesh of
     both parts rather than interpolated off two profiles. */
  const seal = lib.torus(0.2660, 0.0055, M.rubber, RSEG, 5);
  seal.position.z = s * 0.05815;
  g.add(seal);

  /* Inlet spider. The bore feeds the brake duct, so it is open, and an open
     bore r 0.048 across on the most-looked-at surface of the car wants
     something in it: five struts off a center boss, which is what a molded
     cover actually carries and what stops the bore reading as a hole. */
  for (let i = 0; i < 5; i++) {
    g.add(zat(lib.cbox(0.036, 0.0055, 0.008, 0.0012, M.plasticLt),
              0.0320, (i / 5) * Math.PI * 2, 0.0537, s));
  }
  const boss = zc(lib.cyl(0.0140, 0.0100, M.plasticLt, 14));
  boss.position.z = s * 0.0537;
  g.add(boss);

  /* Valve service door, on the same radius and the same clock angle as the
     valve. A full cover has to be openable somewhere or the tire cannot be
     inflated, and this is the somewhere. It is worth saying that for four
     generations this door opened onto nothing at the rear, because only the
     front wheel carried a valve; the rear wheel has one now. */
  const door = zc(lib.cyl(0.0245, 0.0032, M.carbon, 18));
  zat(door, 0.2145, Math.PI * 0.30, 0.0615, s, false);
  g.add(door);
  const doorRim = lib.torus(0.0268, 0.0022, M.alu, 16, 4);
  zat(doorRim, 0.2145, Math.PI * 0.30, 0.0631, s, false);
  g.add(doorRim);
  g.add(zat(zfast(0.0042, M.steel, 'hex', s, 1), 0.2145, Math.PI * 0.30, 0.0631, s, false));

  /* Bayonet lock: one torx on the recessed land, and four lugs hanging off
     the cover's inboard face. The lock screw is the only fastener on this
     car a viewer sees without exploding anything, which is why it is a torx
     with a real socket rather than a hex stub, and why its head diameter was
     sized against the land it seats on: at r 0.0068 the flange overhung both
     edges of the 6 mm land the first draft gave it.

     THE LUGS ARE SIZED BY THEIR OUTER EDGE, NOT THEIR CENTERLINE. wheels-9's
     first draft centered a 12 mm lug on r 0.2480, which reaches r 0.2543 and
     put its outer bottom corner 1.26 mm inside the tire bead cone over 56
     crossing triangles. The 9 mm lug on r 0.2485 that replaced it is carried
     here unchanged in radius, and the whole bank follows the cover 6.3 mm
     inboard with the land it sits on. The bead cone it has to miss moved
     too, so the intra-module sweep was re-run rather than reasoned about:
     the lug bank crosses nothing, front or rear, in zero triangle pairs.

     THAT IS A CLAIM ABOUT THE LUGS AND NOT ABOUT THE MODULE, and an earlier
     draft of this comment said "zero crossing triangle pairs anywhere inside
     this module", which is false and is contradicted twice in this same
     file. Run mesh by mesh at check-interfaces' own 0.005 mm, wheels-10
     crosses itself in 8 part pairs over 4,798 crossing triangle pairs, and
     every one of the eight is a joint somebody drew on purpose. Deepest
     first: master-unit into park-brake 15.08 mm and into calipers 8.54, the
     two connector terminations that panel discloses; covers into tires 2.58,
     the elastomer seal squeeze this panel publishes; covers into
     front-wheels 2.09 and into rear-wheels 2.03, the same seal sunk in the
     flange seat, with the dish landing on the flange lip behind it at 0.37
     and 0.39; park-brake into rear-wheels 1.84, the shoe inside the drum;
     and the tire bead on its two seats at 1.70 and 0.33. What the sweep no
     longer finds, and what wheels-9 had at 128 pairs and 5.64 mm, is the
     sensor lead through the brake disc. */
  g.add(zat(zfast(0.0050, M.steel, 'torx', s, 1), 0.2500, Math.PI * 1.30, 0.0619, s, false));
  for (let i = 0; i < 4; i++) {
    g.add(zat(lib.cbox(0.009, 0.026, 0.0060, 0.0012, M.alu),
              0.2485, (i / 4) * Math.PI * 2 + 0.4, 0.0589, s));
  }

  return g;
}

/* ── Front discs ──
   365 x 30 mm internally vented C/SiC, wheels-9's disc at wheels-9's
   coordinates and not one point of it moved. Two 6 mm friction plates at local -0.136..-0.130 and
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
     5.5 mm tube centered ON the friction plane it reached local -0.1415, which
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
   pad gap each side: halves centered at local -0.1515 and -0.0905, which is
   world |z| 0.5885 and 0.6495, bridge outside r 0.1825 at 0.619, six piston
   crowns landing on the friction faces at 0.604 and 0.634. Bracketed back
   to a pad on the inboard face of the front upright at |z| 0.6475, which is
   suspension-9's part and is an interface requirement rather than a
   verified clearance. Static: never rotates. The halves bottom out at
   y 0.3499 and the PART now bottoms out 15.3 mm below that, at y 0.3346,
   because the rerouted wear sensor lead dips under them. wheels-9's part
   stopped at 0.3459 and this comment carried its 0.346 forward for a
   generation in which it stopped being true. Both are clear of battery-7's
   lid at y 0.31, and measured surface to surface the part stands 33.06 mm
   off battery-10's floor lid with the lead as the closest point. */
function caliperPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('calipers', [-0.3, 0, s * 0.2]);

  const CA = Math.PI * (160 / 180);
  const cx = x + Math.cos(CA) * 0.175;
  const cy = P.wheelY + Math.sin(CA) * 0.175;
  const tanX = Math.cos(CA + Math.PI / 2), tanY = Math.sin(CA + Math.PI / 2);

  /* Nothing below is allowed to change the CASTING's bounding extents. The
     halves stand 0.5 mm off the ring at local -0.1365 and -0.1055 and their
     lower edge is y 0.3499, which is the plane the panel publishes, against
     battery-7's lid at 0.31. The PART is 15.3 mm lower than the casting at
     y 0.3346 and the lead is what put it there; see the header. lib.cbox
     holds a box's face planes exactly and only takes material off the twelve
     edges, so chamfering is free of all of that. */
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
     wheel center, so both nipples came out of the BOTTOM of the caliper half
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

  /* Pad wear sensor, and its lead.

     THE LEAD USED TO RUN THROUGH THE DISC AND THAT IS THE DEFECT THIS
     MODULE FOUND ON ITS OWN CORNER. Swept mesh by mesh inside this module,
     wheels-9's 2.6 mm sensor lead crosses wheels-9/discs in 64 triangle
     pairs, 5.64 mm into the outboard friction plate, 4.32 mm through the
     ceramic band face and 0.96 mm through a vane, on each side. Its second
     waypoint sat at radial 0.1545 and |z| 0.618, which is inside the ring's
     r 0.145 to 0.1825 band and inside the 18 mm vane passage between the two
     plates: the lead was threaded through a part that turns at 747 rpm and
     runs at 800 C. Nothing catches this. SPEC.md leaves part pairs inside one
     module to tools/smoke.sh, and tools/smoke.sh checks metadata against
     geometry and not geometry against itself, so the whole-module sweep had
     to be written to see it and it is worth writing.

     The route now goes UNDER the caliper, out past the disc, and then up the
     caliper's own outboard face to a connector beside the bleed nipples. It
     never leaves the caliper, which is also what a wear sensor lead does on a
     real corner: it is captive to the caliper as far as a bulkhead and it is
     not a chassis harness. Every waypoint is placed against a measured
     constraint rather than drawn by eye.

       the two caliper halves are solid boxes over y 0.3499 to 0.4799, so the
       run holds y at or below 0.3400 until it is outboard of them in |z|
       the ring's outboard face is at |z| 0.634, so the run reaches 0.6480
       before its radius comes inside 0.1825
       the caliper's outboard half ends at |z| 0.6645, so the climb sits on
       0.6690, 4.5 mm proud of the face it is clipped to
       autonomy-4/ring passes this corner at y 0.3925 to 0.4355 and |z| 0.5968
       to 0.6623, and the climb crosses that y band 6.7 mm outboard of it

     That last line is the one that took two attempts. A first route climbed
     to the bracket at |z| 0.6470 and put the lead straight through the ring:
     autonomy-4/ring x wheels/calipers went from 494 crossing triangle pairs
     to 578 while the depth stayed at 42.36 mm, which is design/gen10.md hard
     point 8's "a pair that gains crossings is this generation's" arriving
     immediately. Re-swept on this route, that pair is back to 494 and this
     module crosses its own discs in ZERO triangle pairs. */
  const sense = lib.cbox(0.014, 0.012, 0.010, 0.002, M.sensor);
  sense.position.set(cx - 0.030, cy - 0.063, s * 0.598);
  g.add(sense);
  g.add(lib.tube([
    [cx - 0.030, cy - 0.063, s * 0.5980],
    [1.2520, 0.3400, s * 0.6080],
    [1.2620, 0.3380, s * 0.6480],
    [1.2900, 0.3400, s * 0.6690],
    [1.2950, 0.4100, s * 0.6690],
    [1.2980, 0.4720, s * 0.6650],
  ], 0.0026, M.plastic, false, 10));
  const cl = lib.cbox(0.009, 0.013, 0.008, 0.0016, M.plastic);
  cl.position.set(1.2950, 0.4100, s * 0.6690);
  g.add(cl);

  return g;
}

/* ── Park brake, rotating half ── unchanged from wheels-7 through wheels-9,
   rear corner, not a coordinate touched. */
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

/* ── Park brake, static half ── unchanged from wheels-7 through wheels-9,
   rear corner. What moved is the case behind it rather than the device: the
   park-brake panel re-solves the 30 percent grade against the TIRE rather
   than against the drum and finds it does not hold nose down.
   Central boss at r 0.066, backplate at r 0.100, shoe web threading r 0.073
   to 0.089, shoes phased to 1.214 and 4.356 radians. World planes: boss
   0.6395, plate 0.6315, shoes 0.682, gearmotor 0.616. */
function parkBackPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('park-brake', [0, 0, s * 0.78]);
  g.position.set(x, P.wheelY, z);

  /* Mounting boss with a real bolt flange, in place of a plain cylinder.
     Spans local -0.1085 to -0.0925 as before, so |z| 0.6315 to 0.6475 and
     the published 0.6395 center are all untouched. */
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
     turned rim and an inspection plug, still centered on local -0.1085 and
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
   THE ONE PART THIS GENERATION TOUCHES, and it touches only the two aft
   harnesses on it. The box itself, the plunger block, the reservoir, the ECU
   with its heatsink and connector shells, the conduit and the forward
   hydraulic pair are wheels-10's at wheels-10's coordinates. Every endpoint
   is wheels-10's too: the forward pair still terminates inside the caliper
   crossover fittings at (1.286, 0.484, +-0.620) and the two aft harnesses
   still land on the park-brake gearmotor at (-1.494, 0.287, +-0.616). Both
   terminations are drawn as interpenetrations because a connector is one.

   WHAT CHANGED IS THE MIDDLE OF THE TWO AFT RUNS AND THE CORRIDOR THEY LIVE
   IN. wheels-7 put them at |z| 0.74 through the flank, which was 65 mm of air
   between battery-10's rail at 0.7800 and body-9's rocker at 0.8450, and
   design/gen11.md section 7 fills that air with one merged structural sill.
   RE-MEASURED, EVERY ROW, ON THE MODULES A gen11 PRESET ACTUALLY BUILDS. An
   earlier draft of this table carried the header "measured on the built Gen 11
   modules" over four rows taken from hv-4, which this preset does not build,
   and one row taken from design/gen11.md's prose rather than from the pan the
   body draws. Both faults are the same fault and it is the one this project
   keeps paying for: a number is only measured against the thing it names.
   Enumerated from js/registry.js plus the -11 modules on disk, the corridor
   section reads

     |z| 0.6174   suspension-9/air-supply, outermost point of its whole run,
                  at (0.0000, 0.3270, 0.6174)
     |z| 0.6400   THE NEW CORRIDOR CENTERLINE, both runs                 <-
     |z| 0.6443   harness outer skin. NOT 0.6435: the centerline is a
                  Catmull-Rom through control points at |z| 0.640 and it
                  overshoots them by 0.3 mm, so 0.640 plus the 3.5 mm radius
                  understates the skin. Measured on the built tube
     |z| 0.6477   routing clip ferrule, the outermost thing on this part <-
     |z| 0.6600   battery-11 SILL INBOARD WALL, and it is continuous: two
                  triangles from x -1.0600 to 1.0800 spanning y 0.3020 to
                  0.4200, so the keep-out is real material at every station
     |z| 0.6600   body-11 FLOOR PAN inboard edge, y 0.4200 to 0.5600. The
                  earlier draft of this table said 0.6560, which is
                  design/gen11.md section 6's figure and not the built pan:
                  body-11 draws it on the same 0.6600 plane as the sill, so
                  the pan is 4.0 mm further outboard than the prose and the
                  two members are flush rather than stepped
     |z| 0.6961   battery-11 sill, the innermost of its rib planes, which run
                  from here out to 0.7439 before the outer face at 0.7800
     |z| 0.7075   battery-11 sill, one of those rib planes, and the one the
                  vertex scan below mistook for the section's inner wall
     |z| 0.7440   battery-11 floor lid, widest point, at x +-1.0400. The
                  earlier draft said x 1.05

   and in y, at the mid-car station where the corridor is tightest:

     y 0.3020   battery-11 floor lid, top of its outboard step under the run.
                The earlier draft said 0.2900, which is 12.0 mm low and is
                the row the 15.49 mm lid clearance is measured from
     y 0.3080   battery-11 floor lid top inboard, which IS the cabin floor
     y 0.3175   harness and clips, LOWEST point in the corridor       <-
     y 0.3446   harness and clips, highest point in the corridor      <-
     y 0.4200   battery-11 sill top and body-11 floor pan underside, and
                also hv-11/zonal's floor, which is the LOWEST hv material
                anywhere over this corridor and sits at |z| 0.5100 to 0.6310
                over x -1.0990 to -0.9898
     y 0.4350   hv-11/spine underside, |z| 0.6140 to 0.6600, which is the
                lowest hv member spanning the run's own |z| band
     y 0.4368   hv-11/hv-runs, |z| 0.5513 to 0.6600
     y 0.4442   hv-11/bywire-feeds, |z| 0.4980 to 0.6600

   THE hv ROWS ARE THE ONES THAT CHANGED THE MOST AND THE STORY UNDER THEM
   CHANGED WITH THEM. This corridor was chosen against hv-4, whose floor
   perimeter ring ran the length of the car at |z| 0.6360 to 0.6940 over
   y 0.3510 to 0.3626 with its by-wire feeds outboard of that, and the whole
   argument for taking y 0.326 rather than y 0.390 was that it tucked UNDER
   that ring. hv-11 then landed and deleted the ring: it carries no member
   below y 0.4200 anywhere over this section, its lowest floor part is the
   zonal floor at 0.4200, and swept part by part hv-11 has ZERO penetrating
   pairs against this module, against wheels-10 as well. So the corridor no
   longer sits under anything. It sits in an empty rocker corner 75.4 mm
   below the lowest hv material over it, and the nearest hv-11 part to the
   corridor run, surface to surface, measures 80.94 mm away.

   THE CHOICE SURVIVES ITS OWN JUSTIFICATION GOING AWAY, and that is worth one
   line rather than a quiet edit. Two heights were built and swept before this
   one was taken: y 0.390 sat 82 mm above a cabin floor at 0.3020 in a car
   whose whole generation is a height budget, and against the hv of the day it
   was still 2.00 mm penetrated. y 0.326 sits 18.0 mm above the cabin floor
   plane at 0.3080 and 24.0 mm above the lid's outboard step at 0.3020, which
   is where a rocker trim goes on a real car. Against hv-4 that choice took
   hv-4/ring from wheels-10's 444 crossings at 21.13 mm to 82 at 3.69, and
   against the hv-11 the preset builds it takes it to zero. It is NOT on the
   lid: design/gen11.md section 5 forbids that, and the closest the part comes
   to the lid is 15.49 mm.

   THAT WALL WAS NEARLY MISSED AND THE WAY IT WAS NEARLY MISSED IS WORTH THE
   THREE LINES. Scanned as VERTICES, the sill puts a vertex on |z| 0.6600 at
   exactly two x stations, -1.0600 and 1.0800, 72 of them and nothing between,
   and the nearest plane a mid-car station reports is 0.7075. A plate 2.140 m
   long has vertices only at its ends. An earlier draft of the panel below
   published that reading and concluded the corridor was 63 mm wide mid-car.
   Re-measured on TRIANGLES it is 12.30 mm wide at every station: the nearest
   point on this module is a clip ferrule at (0.0395, 0.3257, -0.6477) and the
   sill face it faces is at (0.0395, 0.3257, -0.6600). Same class of error as
   SPEC.md's third fault: the question was asked of the wrong primitive and
   the answer was quiet and wrong. */
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
     line to drivetrain-9's vectoring coordinator. THE ONLY GEOMETRY THIS
     GENERATION MOVES.

     The -z run leaves the unit on wheels-7's own outlet at (0.92, 0.57,
     -0.38), descends outboard across the footwell and settles into the
     corridor by x 0.550 instead of running out to |z| 0.74. Its last four
     control points from x -1.100 back to the gearmotor are wheels-10's to
     the digit: this module has no business at the rear corner and the panel
     says what that costs and what it does not fix.

     The +z run is the one that changes character rather than coordinates.
     wheels-10 crossed the car at (0.70, 0.45, 0.00) and (0.40, 0.36, 0.55),
     which on a 1.20 m tandem cabin is a cable across the cabin floor 148 mm
     up, under the front occupant, at the height interior-11's seat pan sits,
     and the sweep agrees: on the gen11 preset wheels-10/master-unit crosses
     interior-11/front-seats in 118 triangle pairs to 37.55 mm, which is the
     deepest pair the wheels slot has on this car and is a brake line inside
     a seat. It closes. It now goes OUTBOARD FIRST, to |z| -0.400 at x 1.030,
     because thermal-9's HVAC stack filled x 0.95 to 1.11 at |z| under 0.3775
     from y 0.33 to 0.66 when this route was drawn. thermal-11 has since
     redrawn it wider, to |z| 0.4375 forward of x 0.8675, so the detour is
     inside that block in z rather than past it and clears on a local step by
     2.37 mm. The panel carries that correction and the two earlier crossovers
     that went under the stack in y and fouled it, one by 37.3 mm. The
     crossing itself is at x 1.075 and y 0.452, 38.4 mm forward of body-11's
     floor pan front edge at 1.0366 and 5.0 mm aft of the sill's front face
     at 1.0800, so it is on the toeboard plane in the front compartment and
     not in the cabin at all.

     SEGMENT COUNTS ARE SET BY SAMPLE PITCH AND NOT CARRIED. TubeGeometry
     samples uniformly in arc length, so holding the count while the route
     grows coarsens the chord. wheels-10 ran 2.5863 m at 36 and 3.0194 m at
     36, so 71.8 mm and 83.9 mm per sample. These are 2.5972 m at 36 and
     3.6924 m at 44, so 72.1 mm and 83.9 mm, and the +z figure matches its
     parent to a tenth of a millimeter. 128 more triangles. */
  const aftL = [
    [0.920, 0.570, -0.380],
    [0.870, 0.500, -0.480],
    [0.800, 0.430, -0.570],
    [0.700, 0.372, -0.618],
    [0.550, 0.334, -0.636],
    [0.300, 0.326, -0.640],
    [-0.550, 0.325, -0.640],
    [-0.900, 0.326, -0.639],
    [-1.100, 0.336, -0.638],
    [-1.300, 0.312, -0.626],
    [-1.450, 0.292, -0.620],
    [-1.494, 0.287, -0.616],
  ];
  const aftR = [
    [0.920, 0.570, -0.320],
    [0.960, 0.512, -0.405],
    [1.030, 0.466, -0.400],
    [1.070, 0.454, -0.220],
    [1.075, 0.452, 0.120],
    [1.060, 0.446, 0.350],
    [1.005, 0.418, 0.510],
    [0.910, 0.364, 0.602],
    [0.780, 0.332, 0.634],
    [0.600, 0.327, 0.640],
    [0.300, 0.326, 0.640],
    [-0.550, 0.325, 0.640],
    [-0.900, 0.326, 0.639],
    [-1.100, 0.336, 0.638],
    [-1.300, 0.312, 0.626],
    [-1.450, 0.292, 0.620],
    [-1.494, 0.287, 0.616],
  ];
  g.add(lib.tube(aftL, 0.0035, M.plastic, false, 36));
  g.add(lib.tube(aftR, 0.0035, M.plastic, false, 44));

  /* CLIPS. The forward pair is wheels-10's, unchanged. The aft pair is
     reclipped because a longer run in a tighter corridor is exactly where an
     unsupported span becomes a rattle against a structural member, and
     because the old spacing left one 1.05 m span with nothing holding it.

     Six clips on the -z run and ten on the +z, at spans of 0.14 to 0.61 m
     against wheels-10's 0.25 to 1.05. Both runs stop clipping at fractional
     index 8.0 and 13.0, which is x -1.100 on both, so nothing this module
     adds goes near the rear annulus band: the band is r 0.155 to 0.235 about
     the rear axle over |z| 0.65 to 0.73, the clips stop 350 mm forward of the
     axle and the whole harness now holds |z| under 0.6477 anyway. The band
     count is re-swept on the built module and is still zero. No clip is
     placed on the two tightest arcs, the recovery-core pass at x 0.96 and
     the sill bulkhead at x -1.05, because a ferrule adds 7.7 mm of radius to
     whatever the tube already holds. */
  clipRun(g, fwdL, [1.5, 3.0], 0.004, M.plastic);
  clipRun(g, fwdR, [1.4, 3.4], 0.004, M.plastic);
  clipRun(g, aftL, [1.5, 3.5, 5.3, 5.7, 7.0, 8.0], 0.0035, M.plastic);
  clipRun(g, aftR, [2.0, 3.5, 5.0, 7.0, 8.0, 9.5, 10.4, 10.8, 12.0, 13.0], 0.0035, M.plastic);

  return g;
}

/* ── THE GATE ─────────────────────────────────────────────────────────────

   ENUMERATED, NEVER LISTED. The preset is read out of js/registry.js's own
   VARIANTS slots, and for each slot the disk is probed for a `<slot>-11.js`;
   the -11 module is taken if it loads and registry's own carried choice
   stands if it does not. autonomy-11 does this and its reason is this
   module's reason: interior-11, hv-11 and thermal-11 landed mid-build, a
   hand-written partner list would have missed all three, and this file
   already paid for that once. Its first published clearances were quoted
   against hv-4 and thermal-9, which the preset does not build, and one of
   them was ten times optimistic.

   The preset that enumerates today is body-11, battery-11, drivetrain-9,
   wheels-11, hv-11, suspension-9, autonomy-11, interior-11, thermal-11.
   NINE modules. Both runs use tools/interfaces.js's own clipTris,
   sweepPrune and triTriDepth at LIMITS.pen, and the BASELINE is the same
   nine with wheels-10 in this slot, so the diff is this module and nothing
   else. Verified: the non-wheels part pairs are identical in both runs.

     wheels-11 IN THE SLOT: 10 penetrating part pairs, 4,321 crossings
        depth  pairs  part pair
        20.00   1416  suspension-9/rear-structure x wheels-11/park-brake
        14.79    212  suspension-9/steering      x wheels-11/discs
        14.78    148  suspension-9/front-structure x wheels-11/discs
        13.83    574  suspension-9/front-knuckle x wheels-11/discs
        12.46     35  suspension-9/48v-feeds     x wheels-11/front-wheels
        10.91    251  suspension-9/front-knuckle x wheels-11/calipers
         9.96    184  suspension-9/rear-steer    x wheels-11/master-unit
         7.82    126  suspension-9/rear-structure x wheels-11/master-unit
         5.08   1160  drivetrain-9/hub-bearings  x wheels-11/rear-wheels
         2.46    215  suspension-9/rear-steer    x wheels-11/park-brake

     BASELINE, wheels-10 in the slot: 14 pairs, 5,115 crossings
        depth  pairs  part pair
        37.55    118  interior-11/front-seats    x wheels-10/master-unit
        23.52    570  battery-11/sill            x wheels-10/master-unit
        20.00   1416  suspension-9/rear-structure x wheels-10/park-brake
        14.94     76  autonomy-11/ring           x wheels-10/master-unit
        14.79    212  suspension-9/steering      x wheels-10/discs
        14.78    148  suspension-9/front-structure x wheels-10/discs
        13.83    574  suspension-9/front-knuckle x wheels-10/discs
        12.46     35  suspension-9/48v-feeds     x wheels-10/front-wheels
        12.32     26  thermal-11/recovery-core   x wheels-10/master-unit
        10.91    251  suspension-9/front-knuckle x wheels-10/calipers
         9.79    192  suspension-9/rear-steer    x wheels-10/master-unit
         7.27    122  suspension-9/rear-structure x wheels-10/master-unit
         5.08   1160  drivetrain-9/hub-bearings  x wheels-10/rear-wheels
         2.46    215  suspension-9/rear-steer    x wheels-10/park-brake

   GATE: ZERO NEW PENETRATING PAIRS. Four close outright, at 37.55, 23.52,
   14.94 and 12.32 mm, and every one of the four is a Gen 11 partner that did
   not exist when this route was drawn. Two deepen, both at the rear
   termination and both on a centerline that did not move; the fail list
   carries the arithmetic. The hv slot appears in neither table, which is not
   an omission: hv-11 has zero penetrating pairs against this slot with
   wheels-10 in it as well. */

export function build() {
  const sys = new THREE.Group();

  /* Both corners sit where wheels-9 left them. FRONTZ and REARZ are equal
     and are deliberately not the same constant: they are two independent
     contracts that happen to agree. */
  const corners = [
    [P.axleF, FRONTZ],
    [P.axleF, -FRONTZ],
    [P.axleR, REARZ],
    [P.axleR, -REARZ],
  ];

  for (const [x, z] of corners) {
    const front = x > 0;
    const s = Math.sign(z);

    /* everything that turns with the wheel, centered on its own origin */
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
