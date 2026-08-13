/* Wheels and brakes, Gen 10: the tyre, and the count it does not book.

   Ancestry, cited by name and number throughout:
   wheels.js (Gen 1, 133 kg, 235/50 R19, Crr 7.2 kg/t), wheels-2.js (Gen 2,
   96 kg, 185/50 R21 and rear drums, Crr 5.2), wheels-3.js (Gen 3, 90 kg,
   the rear rim becomes the motor rotor carrier and the first annulus
   contract is written), wheels-6.js (Gen 5 apex, 84 kg, one-piece carbon
   wheels, C/SiC front discs, Crr 4.6), wheels-7.js (Gen 7, 78 kg, 155/65 R20
   at Crr 3.8, full covers, rear track to |z| 0.74), and wheels-9.js (Gen 9,
   74 kg, the direct parent: the FRONT track comes in to 0.74 as well, the two
   tyre shadows stack into one, and the Crr does not move). This slot skipped
   Gen 4, Gen 6 and Gen 8.

   THE TERM THIS SLOT OWNS. design/gen10.md section 2b measures it: Crr is
   100 percent the wheels slot's, Rolling is 21.27 percent of the budget, and
   this slot has not advanced the coefficient since wheels-7, two rungs ago.
   Gen 10 exists so that every module sits on a term its slot actually owns,
   and this is the only slot on the car that owns one outright.

   THE MOVE. 155/65 R20 on a 5.0J rim at 4.4 bar becomes 135/75 R20 on a 4.5J
   rim at 5.6 bar, with the tread 5.5 mm deep and 24.0 percent void becoming
   4.5 mm and 18.6 percent, the centre groove deleted for a continuous centre
   rib, a 5 degree bead seat taper that four generations of this slot drew as
   a cylinder, safety humps on the rear rim which never had any, and a
   clamp-in metal valve because a snap-in rubber one is not rated past about
   4.5 bar. The diameter does not move by so much as a micron: the built tyre
   spans y 0.0000 to 0.7100 on both rungs, the crown is P.tireR and the hub is
   P.wheelY and both are 0.355.

   AND THE COUNT IS NOT BOOKED. design/gen10.md asked for 0.0038 to 0.0034,
   worth 43.1 miles, and made the order of work binding: write the anchors
   FIRST, and if the anchor table comes out the way the Cd anchor table came
   out, book nothing. It comes out that way. The anchors, the ledger, the
   compounding test that decides it and the offset to the real world are all
   on the tyres panel and exported as CRR_BASIS below. The short version:

     the lowest rolling-resistance coefficient published for a full-scale
     four-seat road car is about 4.7 kg/t. This ladder went under it between
     Gen 5 and Gen 7 and nobody wrote that down. wheels-7's 3.8 is already
     about 19 percent below it, and the three mechanisms this module can name
     multiply out to 2.92 kg/t, which is inside the solar-challenge band at
     roughly eight times the load. Run the identical multipliers on a real
     5.5 kg/t class A tyre and they give 4.23, which is a defensible
     best-in-world number. One set of multipliers, two bases, and only one of
     the two answers is a tyre anybody has built.

   So js/efficiency.js should carry `'wheels-10': { crr: 0.0038 }`. The
   geometry that would earn the count is here and the number is not, and the
   consequence is that Gen 10 lands at about 1,761.7 miles rather than
   1,804.8, which is 38.3 short of the target. design/gen10.md section 7
   carries that outcome as its "Crr frozen, compute target met" row precisely
   so it does not have to be argued for after the fact. That row holds
   frontal area at 2.0978 and this module measures it down to 2.0906, which
   is worth 2.08 miles at Gen 10's own operating point, so the honest figure
   is nearer 1,763.8 and 36.2 short. The tyres panel carries the correction
   and the covers panel carries the measurement.

   WHAT THE GEOMETRY DOES BUY, all of it measured off built mesh:
   - THE FRONT CORNER. The tyre's inner sidewall moves from |z| 0.6625 to
     0.6725 and the rim's inboard flange from 0.6700 to 0.67635. Against
     battery-7 that takes the fouling from 804 crossing triangle pairs to 676
     and the one surviving clearance from 4.38 mm to 5.85. battery-10 has
     since landed and the STATIC corner is closed outright, zero pairs, with
     10.00 mm from the disc ring to the lid. The STEERED corner is not, and
     that is this module's finding rather than the pack's: the corner is
     contained to 3.0 degrees of lock against a rack that commands 14, where
     wheels-9 was contained to 1.0. See the discs panel.
   - THE WHOLE-CAR SWEEP. Against the other eight Gen 9 modules, the wheels
     slot goes from 32 penetrating part pairs over 9,668 crossing triangle
     pairs to 30 over 9,135. Two pairs close outright. THREE DEEPEN, and a
     FOURTH gets shallower while gaining crossings, which design/gen10.md
     hard point 7 counts the same way. All four are named on the panels that
     own them rather than left for a reviewer.
   - AREA. The module's own built shadow falls 0.307129 to 0.289800 m2, both
     from tools/silhouette.js frontalArea at the 0.1 mm scanline pitch
     design/area-rezero.md publishes the table on, and the pitch is not a free
     parameter: at 1 mm the pair reads 0.307100 and 0.289742 and at 0.05 mm it
     reads 0.307133 and 0.289805. The
     tyre column on wheels-9's own convention falls 0.0868 to 0.0756. The AREA
     table is the integrator's to regenerate once, after battery-10 lands, and
     nothing in this module touches it.

   TWO DEFECTS FOUND ON THIS MODULE'S OWN CORNER AND FIXED HERE.
   wheels-9 routed the pad wear sensor lead THROUGH the front brake disc, 64
   triangle pairs a side and 5.64 mm into the outboard friction plate, because
   nothing on this project sweeps a module against itself. And the rear wheel
   has never had a valve, on a car that fits one cover part with one service
   door to all four corners. Both are named on the parts that own them.

   BUDGETS. 54,588 triangles against a 58,000 budget and against wheels-9's
   55,068, so this rung comes in 480 BELOW its parent. 74 merged meshes
   against a budget of 78 and wheels-9's 72. 74.0 kg, held.

   P.wheelZ in js/common.js stays 0.81 and P.wheelY and P.tireR stay 0.355.
   The front and rear centres live in FRONTZ and REARZ below and nowhere else,
   exactly as wheels-9 left them.

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
   labelled as one.

   CONFIDENCE ON THE ANCHORS THEMSELVES. The two EU label limits are
   regulatory and exact. The EQXX figure is a manufacturer publication for a
   purpose-built demonstrator. The production, solar-challenge and
   eco-marathon figures are class figures rather than one measured tyre, and
   they are quoted to a hundredth of a kg/t only so the arithmetic is
   reproducible. The finding does not turn on any single one of them: move
   any anchor by 0.5 kg/t and the ladder is still under the lowest number on
   the list from Gen 5 onward. */
export const CRR_BASIS = {
  base: 0.0072,                 // wheels.js, Gen 1
  baseId: 'wheels',
  topOfLadder: 0.0038,          // wheels-7, carried by wheels-9 and by this module
  /* This module's own estimate for what a drum would show for the tyre it
     BUILDS: 135/75 R20 at 5.6 bar carrying 508 kg per front corner, with
     every mechanism in `ledger` below. Not an independent audit. */
  drumExpectation: [0.0045, 0.0055],
  anchors: {
    'EU C1 label class A limit': 0.0065,
    'best measured C1 production tyre': 0.0055,
    'Mercedes VISION EQXX, Bridgestone ENLITEN': 0.0047,
    'EU C3 heavy-truck label class A limit': 0.0040,
    'solar-challenge tyre, 4 to 6 bar, about 65 kg per tyre': 0.0025,
    'steel wheel on steel rail': 0.0015,
    'Shell Eco-marathon prototype tyre, about 25 kg per tyre': 0.0008,
  },
  /* every count this ladder has booked, and what it was booked against */
  counts: [
    ['wheels', 0.0072, 'base, a class-typical premium saloon tyre. EU C1 label class B'],
    ['wheels-2', 0.0052, '235/50 R19 to 185/50 R21, low-loss compound. Crosses the EU C1 class A limit'],
    ['wheels-3', 0.0052, 'carried'],
    ['wheels-6', 0.0046, 'one-piece carbon wheel, low-loss construction, full covers. GOES UNDER THE LOWEST FIGURE EVER PUBLISHED FOR A FULL-SCALE CAR, and no rung says so'],
    ['wheels-7', 0.0038, '155/65 R20 at 4.4 bar, narrow section and full covers. Inside the heavy-truck class A band, on a tyre a third of a truck tyre\'s diameter'],
    ['wheels-9', 0.0038, 'carried. Narrowing the front track moves area and roll stiffness, not Crr'],
    ['wheels-10', 0.0038, 'CARRIED, and the geometry is not. See `ledger` and `verdict`'],
  ],
  /* what wheels-10 BUILDS, priced, and deliberately not booked */
  ledger: [
    ['inflation 4.4 to 5.6 bar', 0.908, 'Crr proportional to p^-0.4, the exponent standard practice uses across the C1 range. The pressure is a stated operating figure and the exponent is published; this is the best evidenced line here'],
    ['tread 5.5 to 4.5 mm, void 24.0 to 18.6 percent, centre groove deleted', 0.920, 'tread band hysteresis is the largest single share of a passenger tyre\'s Crr. The depth and the void fraction are measured off the built lathe profile with one function over both tyres; the SHARE is literature'],
    ['single-ply carbon-cord casing, steel-free two-ply belt', 0.920, 'fewer sheared rubber interfaces in the belt package. ASSERTED. No measurement behind it'],
    ['section 155 to 135 mm', 1.000, 'MEASURED AS ZERO, and it is the line most likely to be booked by mistake. Contact patch area is load divided by inflation pressure and does not know the section width, so a narrower casing at the same pressure buys no Crr on its own. What it buys is the pressure, the frontal area and the pack corner'],
    ['lower loss tangent compound', 1.000, 'DECLINED. That is a chemistry claim, and battery-7 refused to make one in a range generation for the reason this module also declines it: a range generation is the easiest place on a ladder to smuggle one in'],
  ],
  product: 0.7686,              // the four multipliers above
  wouldReach: 0.00292,          // 0.0038 x product
  verdict: 'NOT BOOKED. The product of the named mechanisms takes 3.80 kg/t to 2.92, which is inside the solar-challenge band at about eight times the load per tyre and past the 3.40 the brief asked for. Run the identical product on a real 5.50 kg/t class A tyre and it gives 4.23, which is a defensible best-in-world figure, and on the EQXX\'s 4.70 it gives 3.61. The multipliers are the same; only the base differs, and only one of the two answers is a tyre anybody has built. That is the signature of a base that has drifted, which is exactly what design/area-rezero.md concluded about Cd, so this module does what that document did: it publishes the basis and freezes the coefficient.',
  offset: 'The ladder carries 0.0038 and this module expects a drum to show 0.0045 to 0.0055 for the tyre it builds, so the top of the ladder is optimistic by roughly 0.0007 to 0.0017 in Crr, which is 16 to 31 percent. For scale, CD_BASIS records the Cd half at 30 to 48 percent. The rung-to-rung deltas are a sound internal currency; the exchange rate to reality is unknown and this constant is where that is written down.',
  method: 'A rolling-resistance coefficient is measured on a drum to ISO 28580 or backed out of a coastdown. There is no drum here and no coastdown, exactly as there is no wind tunnel for Cd. Everything above is arithmetic over published anchors and over geometry this module builds.',
};

export const SYSTEM = {
  id: 'wheels-10',
  name: 'Wheels and brakes · Gen 10 the tyre',
  color: 0xd0d6db,
  explode: [0, 0, 0],
  blurb: 'The slot that owns Crr outright finally spends a generation on the tyre. 155/65 R20 on 5.0J at 4.4 bar becomes 135/75 R20 on 4.5J at 5.6, the tread goes 5.5 mm and 24.0 percent void to 4.5 and 18.6 with the centre groove deleted, the bead seat gets the 5 degree taper four generations drew as a cylinder, and the diameter does not move by a micron because seventeen modules read P.wheelY. THE COUNT IS NOT BOOKED, and that is the module. design/gen10.md made the order binding: write the anchors first. The lowest Crr ever published for a full-scale four-seat car is about 4.7 kg/t, this ladder went under it at Gen 5 and nobody wrote it down, and the three mechanisms here multiply 3.80 out to 2.92, which is solar-challenge territory at eight times the load. The same multipliers on a real 5.5 kg/t tyre give 4.23, which is credible. So CRR_BASIS ships and the 43.1 miles do not, and Gen 10 lands near 1,763.8 rather than 1,804.8, which is design/gen10.md\'s 1,761.7 row plus the 2.08 miles of frontal area this module measures and that row holds fixed. What the geometry does buy is measured: the pack fouling falls from 804 crossing pairs to 676 against battery-7 and to zero against the battery-10 that has since landed, the contained steering lock at that corner goes from 1.0 degrees to 3.0 against a rack that commands 14, two whole-car penetration pairs close, 480 triangles come back, and the wear sensor lead stops running through the brake disc.',
  /* Mating features other modules have to land on. Schema in SPEC.md;
     tools/check-interfaces.sh proves these against the built mesh.

     front-halfshaft-outboard is wheels-9's declaration carried forward
     unchanged, and carrying it is load bearing rather than tidy. The hub
     face is at local -0.0475 and the 4.5J narrowing moved no radius and no
     hub coordinate, so the plane really is still 0.6925 and the nearest
     front-wheels vertex to it measures 0.0000 mm. drivetrain-9 declares the
     other half and its front-unit reaches |z| 0.6925 exactly. A key declared
     by only ONE module in a preset merely WARNS, so dropping this line would
     turn the guard off on the one defect it was built for. */
  interfaces: {
    'front-halfshaft-outboard': {
      kind: 'face', axis: 'z', at: 0.6925, tol: 0.002,
      part: 'front-wheels', mirrored: true,
      note: 'hub face inboard plane, ET47 off a rim centreline at FRONTZ 0.74. The titanium insert ring spans |z| 0.6925 to 0.7125.',
    },
    /* THE FRONT CORNER, declared because design/gen10.md hard point 3 asks
       for it and because Gen 9 proved twice that two modules at one corner
       will otherwise measure against each other's prose.

       DERIVATION, from THIS module's built mesh and from nothing else. The
       tyre's section maximum is a real vertex ring at |z| 0.6725, swept off
       the built lathe. The plane is that ring less a 10.0 mm running
       clearance, so |z| 0.6625, and `tol` here IS that clearance plus a
       millimetre of build: this module accepts the plane anywhere inside the
       air it holds, and `extent: 'min'` asserts that no tyre geometry
       anywhere on this module, front or rear, comes inboard of it.
       battery-10 declares the same key with `extent: 'max'` and lands its
       notch face on the plane, which also leaves 12.5 mm over battery-7's
       cell stack at |z| 0.6500.

       TWO DERIVATIONS LAND ON ONE NUMBER AND THAT IS WORTH SAYING RATHER
       THAN LEAVING TO BE FOUND. battery-10 declares this key at the same
       0.6625 and its own note reads that number as wheels-9's 155 mm
       sidewall on the 0.740 centre. It is also that, by coincidence. The
       derivation that governs is the one above, off geometry this module
       builds, per hard point 3. The two agree today and would stop agreeing
       the moment either module changed a section, so the next rung to open
       this corner should reconcile them to the built face at 0.6725.

       AND IT IS NECESSARY RATHER THAN SUFFICIENT, WHICH THIS NOTE SAYS
       BECAUSE A DECLARATION THAT OVERSTATES IS WORSE THAN NONE. It is a
       STATIC plane and the front wheels steer. battery-10 has cut past it to
       |z| 0.6550, which clears the disc ring the plane never reached, and the
       corner is still fouled beyond 3.0 degrees of lock. The discs panel
       carries the sweep. */
    'front-corner-pack-outboard': {
      kind: 'face', axis: 'z', at: 0.6625, tol: 0.011,
      part: 'tires', mirrored: true, extent: 'min',
      note: 'keep-out for the pack outboard front corner: built tyre section maximum |z| 0.6725 less 10.0 mm running clearance. Covers the tyre only; see the discs panel for the disc ring and the steered envelope.',
    },
  },
  parts: {
    tires: {
      name: 'Tyres',
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
      how: 'The whole of this panel is one decision and design/gen10.md wrote the order of work before any of it: write the anchors FIRST, then decide whether a count may be booked. So the anchors come first here too.\n\nWHERE THIS LADDER\'S Crr SITS AGAINST THE WORLD, in kg/t, which is newtons of resistance per kilonewton of load. EU C1 label class A, the regulatory limit for a passenger tyre, is 6.5. The best C1 production tyres measure about 5.5 on the ISO 28580 drum. The lowest figure published for a full-scale, four-seat, road-registered car is the Mercedes VISION EQXX at 4.7, on a Bridgestone ENLITEN casing built for one 1,200 km run. Below that there is exactly one road-legal class: EU C3 heavy-truck label class A at 4.0, reached by long-haul steer tyres a metre in diameter running 8 to 9 bar under three tonnes. Below THAT the list runs out of road cars: solar-challenge tyres at 2.0 to 3.0 carrying about 65 kg each, a steel wheel on a steel rail at 1.0 to 2.0, and a Shell Eco-marathon prototype tyre at about 0.8 under 25 kg.\n\nNow the ladder against that list. Gen 1 is 7.2, which is EU class B and a defensible base for a stamped saloon. Gen 2 is 5.2, under the class A limit. Gen 5 is 4.6, which is UNDER THE EQXX, and no rung on this ladder says so. Gen 7 is 3.8, inside the heavy-truck class A band on a tyre a third of a truck tyre\'s diameter, and that is what wheels-9 carried and what this module carries. The brief asked for 3.4.\n\nTHE TEST THAT DECIDES IT, and it is arithmetic rather than judgement. Three mechanisms are available to a tyre whose diameter is frozen, and every one of them is real. Inflation 4.4 to 5.6 bar, at the standard Crr proportional to p^-0.4, is a factor of 0.908. Tread depth 5.5 to 4.5 mm with the void fraction 24.0 to 18.6 percent, against a tread band that is the largest single share of a passenger tyre\'s loss, is about 0.92. A single-ply carbon-cord casing under a steel-free two-ply belt, which removes sheared rubber interfaces from the belt package, is about another 0.92. Multiply: 0.7686. Apply it to 3.80 and the answer is 2.92 kg/t.\n\n2.92 is not 3.40. It is well past the target, and a module that wanted the count could stop there and book it. Apply the IDENTICAL product to the anchors instead. On a real 5.50 kg/t class A tyre it gives 4.23, which is about the EQXX and is a completely defensible best-in-world figure. On the EQXX\'s own 4.70 it gives 3.61, which is a claim somebody would have to defend and could. On 3.80 it gives 2.92, which is inside the solar-challenge band at roughly eight times the load per tyre: 508 kg on this car\'s front corner against about 65 kg on a solar car. One set of multipliers, three bases, and only the answers from the real bases are tyres anybody has built.\n\nThat is the signature of a base that has drifted, and it is the same signature design/area-rezero.md found in Cd: the deltas are sound and the absolute zero is not. So this module does what that document did. CRR_BASIS is exported with the base, the anchors, the count-by-count history, the mechanism ledger and the offset, and js/efficiency.js should carry \'wheels-10\': { crr: 0.0038 }. THE GEOMETRY IS HERE AND THE NUMBER IS NOT.\n\nWHAT THAT COSTS THE GENERATION, stated rather than buried, because it is the whole margin. design/gen10.md section 7 prices the Crr step at 43.1 miles and its own table carries the outcome: with autonomy-10 at its target and Crr frozen, Gen 10 reads 107.852 Wh/mi and about 1,761.7 miles, a step of +87.7 against Gen 9\'s 1,673.9 and 38.3 miles short of 1,800. That is the third largest step on the ladder and it is short of the target, and both halves of that sentence are this module\'s to say.\n\nONE CORRECTION TO THAT ROW, UPWARD, AND IT IS THIS MODULE\'S TO MAKE BECAUSE NOBODY ELSE MEASURED IT. Section 7 holds frontal area at 2.0978 m2 throughout, which is the Gen 9 cell, and this module moves it: the union of body-9, this module and a pack measures 2.090612 on battery-7 and 2.089740 on battery-10 as it stands, against the 2.097783 the same integrator returns for Gen 9. Run through the shipped computeBudget at Gen 10\'s own operating point, aux 319 W and mass 1,386.58 kg and Crr still 0.0038, that is worth 2.08 miles, so the rung reads about 1,763.8 and is 36.2 short of 1,800 rather than 38.3. The correction is small and it is in the direction that flatters this module, which is exactly why it is written down rather than absorbed. It is also NOT a booking: the AREA table is regenerated once by the integrator after every Gen 10 module lands, per hard point 2, and the cell that ends up in it is the one that counts. See the covers panel for why none of those four figures may be pasted into a cell.\n\nWHAT THE TYRE ACTUALLY IS, since it is built. 135/75 R20 on a 4.5J rim at 5.6 bar cold. The aspect ratio is an OUTPUT: P.tireR 0.355 and the 20 inch bead seat fix the section height at 101.0 mm on every tyre this slot will ever draw, so a 135 mm section reads 75 series for the same reason a 155 read 65. Measured off the built lathe with one function over both profiles, the tread band is 81.8 mm against wheels-9\'s 94.0, the net contact width at full crown radius is 66.6 mm against 71.4, and the void fraction is 18.6 percent against 24.0. Four circumferential grooves 4.5 mm deep replace five at 5.5 and 5.0, and the centre groove is deleted for a continuous 30.4 mm centre rib, which is the pattern decision the whole panel rests on: a groove down the centreline splits the rib carrying the highest contact pressure into two half-ribs that squirm independently, and block squirm is hysteresis.\n\nTHE CONTACT PATCH, one model over both tyres, because every number below and the deflection route to Crr all come out of it. Contact patch area is load divided by inflation pressure. The front static corner carries about 508 kg laden on both rungs, on a 56.9 percent front split, so the patch goes from 113.4 cm2 to 89.0, and on the net contact width the patch LENGTH goes 158.8 mm to 133.7. Solving the chord gives a static deflection of 8.88 mm against 6.29, and the vertical rate, taken as the derivative of pressure times patch area with respect to deflection, goes 280.9 kN/m to 396.1.\n\nAnd that deflection is the second, independent route to the same verdict. Rolling resistance is hysteresis in rubber that is cyclically strained once per revolution, so to first order Crr goes as deflection over free radius. The deflection ratio is 0.7087, which on 3.80 gives 2.69 kg/t. Two different models, one from mechanism multipliers and one from measured geometry, land at 2.92 and 2.69. Neither is 3.40, both are past every anchor, and the agreement between them is not reassurance. It is the same overshoot twice.',
      why: 'Because design/gen10.md wrote the decision rule in advance and this module is not allowed to invert it, and because the rule is right.\n\nThe argument for booking is easy to make and worth stating fairly. The ladder\'s Crr is an internal currency; every count from Gen 1 has been booked against a named mechanism; the mechanisms here are real physics with a published exponent on the strongest of them; and a rung-to-rung comparison on a consistent currency is exactly what this project\'s model is for. All of that is true. It is also, word for word, what CD_BASIS says about the drag coefficient, and design/area-rezero.md still concluded that no Cd count may be booked. It did not conclude that a body may keep booking counts as long as it documents the offset. Requiring CRR_BASIS and then booking 43.1 miles would be the weaker half of that precedent, and 43.1 miles is 33 percent of this generation\'s predicted step and the entire margin over 1,800.\n\nThe structural reason is sharper than the precedent. A count is defensible when the mechanism it names is measured on the object it is applied to. Here the mechanisms are measured on the world\'s tyres and the object is a coefficient that is already outside the world\'s tyres. Applying a real 9 percent to a base that is 19 percent below the lowest number anyone has published does not produce a tyre that is 28 percent better; it produces a number with no referent. Eight bodies reached Cd 0.108 one defensible count at a time, and every one of those counts had a mechanism too.\n\nThere is a version of this rung that is worth more than the count, and it is this one. The tyre that would earn 3.4 kg/t is drawn, measured and priced in wet grip, braking distance, ride rate and load capacity. The anchors that decide whether 3.4 is a tyre or a fiction are written down and exported as data. If a drum ever exists, the count is already derived and the geometry is already built. What Gen 11\'s retro will not have to do is write off 43.1 miles.',
      fail: [
        'THE LOAD INDEX IS FINALLY NOT SHORT, AND PART OF THE REPAIR IS THE TYRE GRIPPING LESS. wheels-9 recorded the defect and declined the fix: at 0.74 g on the 1.48 m matched track with a 58 percent front roll couple, the outer front tyre carries 768 kg laden against load index 95\'s 690, so 78 kg over, and it named load index 100 as the correct answer. One method over both rungs, laden 1,787.58 kg then and 1,786.58 now: the capacity a casing earns scales with inflation pressure times section width at a given deflection, so 690 kg at 4.4 bar and 155 mm becomes 765 kg at 5.6 and 135. The outer front corner reads 758.1 kg, because a 0.714 g tyre transfers less load than a 0.740 g one. So the corner goes from 78 kg over to 6.7 kg under, and the honest decomposition is that 75 kg of that swing is casing and 9 kg is grip the car no longer has. Held at 0.74 g the same casing would still be 2.3 kg over. This is the first rung in the ladder\'s history where the worst-loaded corner is inside its tyre, and it is inside by seven kilograms.',
        'WET GRIP IS THE PRICE AND IT IS A LARGE ONE. One model over both tyres, with the terms named so it can be rejected: peak wet friction taken as dry peak times 0.60 at wheels-9\'s 5.5 mm tread and 4.4 bar, scaled by tread depth to the quarter power for drainage and by pressure to the minus tenth for the smaller patch. Dry peak falls 0.740 to 0.714, because mean contact pressure rises 27 percent and rubber friction falls with contact pressure at roughly the minus 0.15 power. Wet peak falls 0.444 to 0.398, which is 10.4 percent. Braking from 100 km/h goes 53.15 m to 55.10 m dry, so 1.95 m, and 88.58 m to 98.92 m wet, so 10.34 m. Ten metres is two car lengths and it is the real cost of this tyre.\n\nAquaplaning moves the OTHER way and the two must not be added together. Dynamic aquaplaning onset goes as the square root of inflation pressure, so on the classic 9 times root psi in knots the onset rises from 133.2 km/h to 150.2. So the tyre is harder to float and worse once wet, which are two different failure modes with two different answers, and the deleted centre groove is on the wrong side of the second one: the water that does reach the patch has one fewer path out from under the rib that carries the most load.\n\nAnd there is no skid trailer here either. The wet numbers above are a model with named terms, exactly like the Crr numbers this panel refuses to book, and they are published in that spirit rather than as measurements.',
        'THE RIDE RATE RISES 41 PERCENT AND THE SLOT THAT WOULD CATCH IT IS NOT OPEN. The tyre is the top spring in series with everything suspension-4 and suspension-9 built, and its vertical rate goes 280.9 kN/m to 396.1 on the same patch model. Ride frequency is held by construction on this car because the air springs scale rate with load, so the primary ride is unaffected; what moves is the secondary ride and the wheel-hop mode. On a stated 42 kg of unsprung mass per front corner, of which 17.5 kg is this module\'s own tyre, wheel, disc and cover, and a 40 kN/m spring path, hop goes from 13.91 Hz to 16.22 Hz. That assumption is stated because it is an assumption: suspension-9 owns the rest of the unsprung mass and Gen 10 does not open the suspension slot, so nobody re-tunes a damper against this. A 41 percent stiffer tyre on an untouched damper is a real and uncompensated regression in impact harshness.',
        'TREAD LIFE, AND THE THING THIS MODULE WOULD HAVE DONE IF IT WERE ALLOWED. 4.5 mm of pattern leaves 2.9 mm above the 1.6 mm legal floor, against wheels-9\'s 3.9 and wheels-6\'s 5.9. Three generations of this slot have spent tread depth and each has left less. The lever that would give it all back is diameter: a taller casing at the same section carries more tread rubber and a smaller deflection per unit load, and it is the single best answer to everything on this panel. It is NOT AVAILABLE. wheels-9/tires is built to y 0.0000 to 0.7100 exactly, P.wheelY 0.355 puts the hub on the crown radius with the patch on the ground plane and zero slack at either end, and P.wheelY appears in seventeen system modules and, re-measured here with comments stripped, is a live code read in all seventeen rather than design/gen10.md\'s fifteen; the difference is a comment-stripping convention and the conclusion is the same either way. design/gen10.md hard point 5b makes it a frozen constant rather than a design variable, and section 4b says why: drivetrain-9 derives its entire core-loss argument, and therefore the driveEff 0.958 the whole ladder books, from a 0.34 m dynamic rolling radius. Growing the tyre is the halfshaft defect with the axis rotated. It wants a fifth module and a re-sweep of all seventeen readers, and it comes back to design/gen10.md before it is drawn.',
        'THE ROLLING RADIUS MOVED ANYWAY, BY 0.9 MM, AND NOBODY ASKED FOR IT. The FREE radius is frozen and this module holds it to the micron. The DYNAMIC rolling radius is not the free radius: it is the free radius less about a third of the deflection, and the deflection fell 8.88 mm to 6.29 mm when the pressure rose. So the dynamic rolling radius goes 0.3520 m to 0.3529 m, plus 0.9 mm and plus 0.26 percent, which at drivetrain-9\'s 780 wheel rpm is 0.26 percent of speed. It does not move the booked driveEff and the reason is worth more than the number: drivetrain-9 derives that efficiency from a 0.34 m dynamic rolling radius, and NEITHER tyre produces 0.34. The two are 12 mm apart already, so this generation moved a quantity by a fourteenth of a discrepancy nobody has closed. It is reported here rather than left for a reviewer because a frozen constant with an unfrozen derivative is how the halfshaft got wrong at two consecutive rungs.',
        'ONE PLACARD PRESSURE FOR FOUR CORNERS, CARRIED FROM wheels-9 AND NOW MORE BINDING. Both axles run the same geometry, so a pressure change to fix understeer changes rolling resistance at both ends at once, and at 5.6 bar the tuning window is narrower than it was at 4.4 because the casing is closer to its rating and the patch is 21 percent smaller. The compensation is still suspension-9\'s bars rather than the tyre, and suspension-9 is not open this generation.',
      ],
      explode: [0, 0, 0.85],
    },
    'front-wheels': {
      name: 'Front wheels',
      tagline: 'Twenty by four and a half, and a bead seat with the five degrees of taper four generations of this slot drew flat.',
      mass: 11,
      count: 2,
      specs: [
        ['Wheel centre', '(+-1.45, 0.355, +-0.74); front track 1.48 m, carried from wheels-9'],
        ['Size', '20 x 4.5J, ET47, hub face plane still |z| 0.6925 (wheels-9: 5.0J)'],
        ['Rim planes', 'flange lips |z| 0.67635 / 0.80365, seats 0.68285 / 0.79715'],
        ['Bead seat', '5.02 degrees of taper, 2.1 mm of radius across 23.9 mm of seat'],
        ['Swept envelope', '|z| 0.8090 static, 0.8834 at 14 deg, 0.9006 at 17.25'],
        ['Maturity', 'Pilot line; the wheel is wheels-6’s drawing on a narrower barrel'],
      ],
      how: 'WHAT MOVED AND WHAT DID NOT, because on this part it is exactly one axis. Every RADIUS on this wheel is wheels-6\'s to the digit: the flange lip is 0.2665, the bead seat is 0.2540, the drop-well floor is 0.2300 and 24 mm deep, the hub insert is 0.0740 and the spoke web runs to 0.2305. Every AXIAL coordinate on the BARREL moved inboard with the 4.5J width and nothing else did. The hub face is still at local -0.0475, which is world |z| 0.6925, which is the declared front-halfshaft-outboard plane; the nearest vertex to it measures 0.0000 mm and drivetrain-9\'s front-unit reaches exactly 0.6925 on the other side of it. Narrowing a rim does not move an offset, and that is the whole reason this generation could touch the rim at all.\n\nTHE BEAD SEAT IS TAPERED NOW AND IT SHOULD ALWAYS HAVE BEEN. wheels-6, wheels-7 and wheels-9 all drew the seat as a cylinder at constant radius. A passenger rim seat rises at 5 degrees toward the flange, and that taper is not decoration: it is the mechanism by which inflation pressure drives the bead up the ramp into an interference fit against the flange, which is what holds a tubeless tyre on a rim that has just lost its air. On a 4.4 bar tyre drawing it flat was a drawing error. On a 5.6 bar tyre it is the retention argument, so it is built: 2.1 mm of radius across a 23.9 mm seat, measured back off the profile as 5.02 degrees. The safety hump inboard of each seat is wheels-9\'s and is unchanged in radius.\n\nTHE SWEPT ENVELOPE, run the same way wheels-9 ran it so the pair is one method. Every vertex of the built front tyre, wheel, cover and disc rotated about the vertical axis through (1.45, 0.74), maximum |z| recorded:\n\n    deg      wheels-9   wheels-10   delta\n      0      0.8190     0.8090      -10.0 mm\n      2      0.8298     0.8198      -10.0\n      6      0.8512     0.8412       -9.9\n     10      0.8720     0.8621       -9.8\n     14      0.8926     0.8834       -9.2\n     16      0.9032     0.8941       -9.1\n  17.25      0.9097     0.9006       -9.1\n     20      0.9238     0.9148       -8.9\n     22      0.9337     0.9249       -8.8\n\nTen millimetres static, tapering to 8.8 at 22 degrees, and the taper is itself a measurement worth having: a narrowing is not a translation. wheels-9 moved the corner rigidly, so its whole swept surface shifted 70 mm at every angle and body-9 could work from a subtraction. This module shrinks the corner about its own centre, so the gain is largest where the binding feature is the cover disc and smallest once the tyre shoulder takes over. Do not subtract a constant from this table.\n\nWHAT THE TEN MILLIMETRES BUY AT THE PARTNERS, measured surface to surface against the built body-9 rather than against its prose, one method over both wheels:\n\n    cover to front fairing        43.90 mm  ->  50.16 mm\n    tyre to front fairing         25.50     ->  35.50\n    cover to arch louvers         72.40     ->  82.39\n    tyre to rear arch closeout     4.74     ->  10.89\n\nThe last row is the one nobody had. 4.74 mm from the rear tyre to body-9\'s rear arch closeout is the tightest clearance this corner has to the body at either axle, it is not on any wheels-9 panel, and it is not on any body-9 panel either. It is a surface-to-surface reading; a nearest-vertex sweep would have missed it, which is precisely how the pack clearances on the discs panel went wrong. It is now 10.89 mm and it is still the tightest.\n\nWHAT THIS PANEL DOES NOT CLAIM. body-9 is carried unchanged and this module books no area credit against it. Ten millimetres of swept envelope per side is real and it is body-9\'s to spend or not; nobody has redrawn a fairing around it and nothing in js/efficiency.js should move because of it. wheels-9 made exactly this distinction about Cd and it was right: a wheel module that starts crediting itself with a partner\'s integral is how a ladder loses track of who measured what.',
      why: 'A 4.5J rim is not a styling choice, it is the only rim a 135 section can sit on, and getting it wrong in either direction is a real failure. Too wide and the sidewalls are pulled straight, the casing loses the curvature that carries lateral load and the bead is over-stressed at 5.6 bar. Too narrow and the section balloons, which puts the widest point of the tyre back where the narrowing was supposed to take it from and hands the frontal area straight back. 135 mm of section on 114.3 mm of rim is a 1.18 ratio, which is what a passenger tyre of this aspect wants.\n\nThe deeper reason to touch the rim at all is that it is the one part of this corner whose axial coordinates are free. Everything else is pinned: the hub face is an interface, the disc is pinned by a ball joint radius, the caliper is pinned by the disc, and the diameter is pinned by seventeen modules reading P.wheelY. The rim width is the only dimension on the front corner that no other module reads, which is why it is where the section change is allowed to land.',
      fail: [
        'hv-4\'s by-wire feed still runs THROUGH this wheel and the number got worse by the tool\'s own metric while the geometry got better. Measured with tools/check-interfaces.sh\'s own predicate, one method over both rungs: hv-4/bywire-feeds x wheels/front-wheels goes from 182 crossing triangle pairs at 16.23 mm to 142 pairs at 18.57 mm. The feed occupies x 1.1024 to 1.3140, y 0.3480 to 0.3798 and |z| 0.6522 to 0.7128, and the rim barrel it crosses spans |z| 0.67635 to 0.80365 at radii 0.2300 to 0.2665, so pulling the inboard flange 6.35 mm OUTBOARD reduced how much of the cable is inside the barrel from 42.8 mm to 36.4. The crossing count agrees with that and the depth does not, and SPEC.md already says why: the reported depth is the plane-straddle depth, which on a slender part crossing a large panel is not the intrusion. Both figures are published because design/gen10.md hard point 8 says a pair that deepens is this generation\'s, and this one deepens by that metric. It is not fixable from the wheels side without giving the pack corner back.',
        'Two more pairs deepen and both are hv-4 against the tyre rather than the wheel, and they are on this panel because this panel owns the whole-car sweep. hv-4/bywire-feeds x wheels/tires goes 144 pairs at 3.88 mm to 167 at 4.24, and hv-4/zonal x wheels/tires goes 232 pairs at 9.89 mm to 126 at 10.06. Both are the tyre\'s inner sidewall moving 10 mm outboard into cable that was routed around a 155 section. Against them, two pairs CLOSE outright, autonomy-4/ring x wheels/tires at 112 pairs and 6.53 mm and interior-6/nvh x wheels/tires at 96 pairs and 8.56 mm, and five improve. Only TWO of the five get shallower: hv-4/ring x wheels/tires 571 pairs at 19.37 mm to 460 at 16.00, and hv-4/bywire-feeds x wheels/rear-wheels 176 at 18.97 to 182 at 15.84. The other three keep their depth to the hundredth and lose crossings: body-9/front-fairings x wheels/calipers 832 to 815, hv-4/zonal x wheels/rear-wheels 390 to 314, interior-6/nvh x wheels/rear-wheels 52 to 48. An earlier draft of this entry said "four shallow", which is neither the two that are shallower nor the five that improve.\n\nAND READ THE REAR-WHEELS FEED PAIR TWICE, because it is the fourth pair this generation made worse and the first draft of this entry filed it under an improvement. hv-4/bywire-feeds x wheels/rear-wheels is 3.13 mm shallower and it GAINS SIX CROSSINGS, 176 to 182. design/gen10.md hard point 7 counts a pair that appears, deepens OR gains crossings as this generation\'s work, and the calipers panel invokes that same clause against this module\'s own first sensor route, so it has to be invoked here. The cause is the same 6.35 mm of rim: the rear barrel moved outboard into a feed routed around a 5.0J rim, exactly as the front one did, and like the front one it is not fixable from the wheels side. Net over the whole car: 32 penetrating part pairs and 9,668 crossings become 30 and 9,135. The corner is better, three pairs are deeper and a fourth is wider, and a module that published only the first half of that sentence would be doing what the discs panel had to be corrected for.',
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
        ['Wheel centre', '(-1.45, 0.355, +-0.74); rear track 1.48 m, carried'],
        ['Flange face', '|z| 0.65 exactly, out to r 0.2440; the CONTRACT plane, untouched'],
        ['Motor annulus', 'r 0.155 to 0.235 over |z| 0.65 to 0.73, still void'],
        ['Void margin', 'Zero breaching vertices; r 0.2480 at |z| 0.7220, 13.0 mm clear'],
        ['Change this generation', 'Rim 5.0J to 4.5J, safety humps added, and a valve'],
        ['Maturity', 'Pilot line; the co-cured titanium flange stays extrapolated'],
      ],
      how: 'THE CONTRACT SURVIVED A RIM NARROWING AND THAT IS THIS PANEL\'S DELIVERABLE. The rear annulus contract reserves r 0.155 to 0.235 over |z| 0.65 to 0.73 for drivetrain-9\'s in-wheel motor, and pulling both bead seats 6.35 mm outboard moves six profile points INTO the axial span the contract covers, which is the direction that could break it. It does not, and the check was run rather than argued: sweeping every vertex of this module against the rear wheel centre (-1.45, 0.355, 0.74), zero vertices fall inside the band. The smallest radius among the six points the narrowing moved into the band\'s axial span is the bead seat\'s well end at 0.2519, 16.9 mm clear of the 0.235 ceiling, and the tightest approach anywhere in the band is unchanged from wheels-7, wheels-9 and this module alike: r 0.2480 on the drop-well floor at |z| 0.7220, 13.0 mm clear. The flange face is still at local -0.0900, its outer edge is still r 0.2440, and drivetrain-9\'s rotor rings still bolt to it face to face.\n\nTHE VALVE, WHICH THIS WHEEL HAS NEVER HAD, AND WHICH IS A FOUR-GENERATION DEFECT. wheels-3, wheels-6, wheels-7 and wheels-9 all draw a valve through the FRONT well floor and none in the rear wheel, while drawing ONE cover part with ONE service door and fitting it to all four corners. So two of the four covers on this car have carried a service door opening onto solid carbon, and the rear tyres have had no way to be inflated. It is the same class of defect this file has caught three times before, a fastener seated inside the part it bolts to, a lattice behind a solid panel, a backing plate with no window in front of it: geometry and the story about it disagreeing where nobody checks.\n\nIt goes on the OUTBOARD side of the drop well at local +0.0060, not the inboard side the front uses, and the reason is measured. drivetrain-9\'s rotor rings reach |z| 0.7280 and its hub bearings 0.7290. An inboard valve at local -0.0060 puts the stem at |z| 0.7298 to 0.7382, which is 1.8 mm off the rotor rings; the outboard placement puts the BUILT stem at 0.7420 to 0.7500 and stands the whole valve 12.80 mm off those rings measured surface to surface, segment to segment and vertex to triangle over both triangle sets. The convention matters on this number too: 13.8 mm is the axial difference and the closest approach is diagonal, so the axial figure overstates the gap by a millimetre exactly the way a nearest-vertex reading overstated the pack clearances on the discs panel. It is clocked to the same 54 degrees as the front so it lands between two spokes and under the cover\'s door, and the spoke half-width at that radius subtends 3.7 degrees against the 18 it has on either side.\n\nAND IT IS A CLAMP-IN RATHER THAN A SNAP-IN, on both axles, because of the pressure. A snap-in valve is a rubber body retained by its own interference in the rim bore and the industry rating on it stops around 4.5 bar; this tyre runs 5.6. The part that goes in a hole at 5.6 bar is a brass stem through a sealing grommet, pulled down onto the outside of the rim by a hex nut, with a screwed metal cap that is a second seal rather than a dust cover. Three pieces are drawn and the grommet is not, because it is compressed inside the rim bore where no part of it can be a first hit: an orthographic first-hit sweep of 216 upper-hemisphere directions at 1.11 mm per pixel, run over this corner with the module alone and the cover on, returns 4,765 first-hit pixels for the stem, 3,564 for the cap and 1,562 for the nut, and would return zero for a grommet. Read the scene on that sentence: module alone. In the assembled Gen 10 car the fairing takes all three to zero, and the module header says so. wheels-9\'s own pass deleted a caliper backing plate, a banjo bolt and six pistons on exactly that test.\n\nThe rest of the drawing is wheels-7\'s and unchanged in every coordinate. Twelve flange bolts on the r 0.225 circle seating on the inboard face of a 2 mm co-cured titanium ring that runs |z| 0.646 to 0.650, so they bear on metal; the ring owning the whole flange face from r 0.1500 out to 0.2440 on its own; a hub pilot at r 0.0605 to 0.072 over |z| 0.730 to 0.756 with a lead-in chamfer, closed outboard by a clamp web whose five nuts sit at 0.7376 to 0.7471. The drop well is 6 mm deep against the front wheel\'s 24, because a 0.230 floor would put carbon inside the annulus at |z| 0.722, and that remains a shop-equipment consequence of putting a motor inside a wheel.',
      why: 'A contract is worth proving rather than asserting, and the failure mode here is silent. Nothing about the rear corner\'s PURPOSE changed this generation, so a drift would have to arrive through a shared constant or through a partner moving, and both have happened on this ladder. This generation did something more dangerous than either: it moved the rear wheel\'s own geometry, for a reason that has nothing to do with the contract, in the one axis the contract is written in. Six points crossed into the band\'s axial span and every one of them had to be re-swept. That is exactly the case where a module carries forward a sentence it has stopped being entitled to.\n\nThe valve is the other half of the same argument. Nobody noticed for four generations that a cover part fitted to four corners was opening onto two valves, because no tool asks whether a service access reaches the thing it services. What found it was drawing the rim and asking what a 5.6 bar tyre needs at the hole.',
      fail: [
        'The co-cured titanium flange is still the extrapolated claim, unchanged since wheels-6 and unchanged here. What must become true: a titanium-to-CFRP co-cure holding bolt preload through a design life of drive-to-regen torque reversals at hub temperature and salt exposure, with no delamination signature. Rigs show it, fleets close it, and until then the joint is inspected at every tyre change.',
        'The contract is 99.6 percent clean rather than clean, and that has not moved. suspension-9 still puts 13 vertices inside the annulus band, 48 V cable at r 0.1657 and |z| 0.7100, in a volume reserved for a motor. wheels-9 inherited that from wheels-7 and reported it; this module re-swept it and confirms it unchanged. tools/check-interfaces.sh reports the whole band as 302 non-drivetrain vertices on the Gen 9 preset and 302 on the same preset with this module swapped in as the only change, to the vertex and part for part, so nothing about the rim narrowing touched it either way. On the full Gen 10 preset it reads 284, and the 18 that leave are autonomy-4/ring, which autonomy-10 does not have. That is worth separating rather than quoting one number for both: the wheels-only swap is the comparison that tests this module, and the preset figure is the one a reader will see on the rail. It is reported here because this module owns the wheel side of that band and nobody else sweeps it.',
        'A 4.5J rear rim at 5.6 bar changes the duty on a flange nobody re-validated. The 13 mm annulus margin, the 0.5 mm pilot fit and the 12-bolt flange were sized against drivetrain-7 as built and carried through wheels-9, and the load path into them now arrives through a casing that is 41 percent stiffer vertically and 20 mm narrower. The bolts are the same, the ring is the same, and the impact loads reaching them through a stiffer tyre are not. Nothing in this module models that, and nothing in the suspension slot is open this generation to catch it.',
        'THE REAR VALVE IS 104 TRIANGLES AND THREE MESHES A CORNER THAT THE STATIC CAR NEVER SHOWS, and the module header carries the measurement rather than leaving it to a reviewer. Orthographic first-hit, 216 upper-hemisphere directions at 1.11 mm per pixel: with the cover on it wins SEVEN pixels over three directions, which is a sampler catching a sliver and not visibility, and inside the assembled Gen 10 car it wins three. It is 7,957 pixels once the cover leaves, which the staged explode does at 120 mm of relative travel here. So this part is justified by packaging and by the service door that has opened onto solid carbon for four generations, and NOT by the silhouette. An earlier draft of the header claimed 1,405 pixels with the cover on and that figure does not reproduce on the hemisphere the header declares. The honest position is that a tyre at 5.6 bar needs a valve at every corner and this one is paid for out of the explode view.',
        'The valve is drawn and the pressure monitoring is not. A car running 5.6 bar on a casing whose load capacity depends on that pressure needs a direct sensor per corner, and the only pressure telemetry on this vehicle is inferred from hv-4\'s wheel-speed comparison, which resolves a slow leak in tens of kilometres rather than in seconds. wheels-9 could afford that at 4.4 bar with 78 kg of load-index deficit already on the books. At 5.6 bar with 6.7 kg of margin, a corner that drops half a bar is over its rating before the driver is told. That is an hv or an autonomy item and it is named here because this is the module that made it urgent.',
      ],
      explode: [0, 0, 0.78],
    },
    covers: {
      name: 'Full-face covers',
      tagline: 'Two numbers moved and by different amounts: the seat followed the rim in 6.35 mm and the lip followed the tyre in 10.0. The lip is still the outermost surface on the car.',
      mass: 6,
      count: 4,
      specs: [
        ['Type', 'Full-face CFRP disc, flush to the tyre section, no moving parts'],
        ['Extent', 'r 0.048 inlet bore to r 0.312, seated on the rim flange lip'],
        ['Mass', '1.5 kg each, carried from wheels-7 without a change'],
        ['Outer lip', '|z| 0.8090 at all four corners (wheels-9: 0.8190)'],
        ['Flange seat', 'local 0.06365, following the 4.5J rim in 6.35 mm'],
        ['Maturity', 'Production practice'],
      ],
      how: 'This part changed by two numbers and they are not the same number, which is the whole content of the panel. The flange seat follows the RIM, so it comes in 6.35 mm to local 0.06365. The outer lip follows the TYRE, so it comes in 10.0 mm to local 0.0690, which is world |z| 0.8090. The dish between them is therefore 3.7 mm shallower than wheels-9\'s, and every radius on it is wheels-7\'s untouched: the r 0.048 inlet throat, the bell mouth flaring to 0.062, the hub service recess, the riser, the 12 mm bayonet land recessed 1.5 mm, the r 0.2665 flange seat and the r 0.312 outer lip with its 1.1 mm rolled edge.\n\nTHIS PART OWNS THE OUTER EDGE OF THE CAR AT BOTH AXLES AND IT IS WORTH SAYING WHICH SURFACE THAT IS. The cover lip stands 1.5 mm proud of the tyre section maximum, so at |z| 0.8090 it is the outermost surface of the whole corner, front and rear, exactly as it was at 0.8190. Frontal area is decided at the outermost surface, which makes the cover and not the tyre the part the integral actually reads at those heights. The 1.5 mm is measured against the BUILT section maximum rather than taken from the tyre panel\'s prose, because a cover sized off a sentence is how a lip ends up 11.5 mm proud of a tyre that got narrower.\n\nWHAT THE NARROWING IS WORTH IN AREA, and the honest limits on the figure. One integrator, the same frontalArea in tools/silhouette.js that design/area-rezero.md re-zeroed the whole ladder on, run over both modules at 0.1 mm scanlines. This module\'s own built shadow falls from 0.307129 m2 to 0.289800, so 0.017329. An earlier draft of this sentence said 0.289793 and 0.017336 while the module header said 0.289800, so the file disagreed with itself by seven square millimetres; 0.289800 is what the integrator returns and the header was the half that was right. On wheels-9\'s own published tyre-column convention, twice the tyre band times 0.28, the columns fall from 0.0868 to 0.0756, so 0.0112, and that convention reproduces wheels-9\'s published 0.0868 to the digit.\n\nNeither of those is what the car gets, and the difference matters more than the numbers. Frontal area is a UNION over body, wheels and pack, and battery-7\'s rocker rails already stand at |z| 0.7800 in the band this tyre occupies, so most of what the tyre gives back was already in somebody else\'s shadow. Run the union with body-9 and a pack and it goes 2.097783 m2 to 2.090612 on battery-7, and 2.096910 to 2.089740 on battery-10 as that module stood when this was last re-swept. Three things in those four numbers, and only one of them is safe to quote.\n\nThe 2.097783 reproduces the AREA table\'s Gen 9 cell exactly, which is the check that says the integrator here is the shipped one. The DELTA is invariant to the pack, 0.007171 on battery-7 and 0.007170 on battery-10, so what this module buys is 0.00717 m2 whichever pack it is measured behind, and priced through computeBudget at GEN 10\'s own operating point rather than at Gen 9\'s marginal rate it is 2.08 miles and not the 1.87 that rate gives. Quoting the Gen 9 rate for a Gen 10 gain is the convention drift design/gen10.md hard point 1 exists to stop, and an earlier draft of this sentence did it.\n\nThe battery-10 COLUMN is not stable and must not be quoted at all. An earlier build of that module put it at 2.097789 and 2.090618, six square millimetres ABOVE battery-7 rather than 873 below, and this panel concluded from that pair that the pack notch was worth nothing in shadow because everything it removed stood behind a rocker rail. That conclusion was about a pack that no longer exists, and it is exactly design/retro-gen9.md\'s "a module written before its partner lands will measure against the wrong partner" turning up in the area integral rather than in a clearance. The pack has been rewritten under this measurement twice, and each time it was the two cells moved by about 0.00088 m2, which is a hundred and fifty times the number the old draft published. Note also that the sign depends on whether the wheels are in the union: body-9 with battery-10 alone is 0.000348 m2 LARGER than body-9 with battery-7, and only once the tyre columns are added does the pack read smaller. A union does not decompose, which is the second reason these cells belong to one sweep run after every module has landed and not to this panel.\n\nNONE OF THOSE FOUR FIGURES IS THE GEN 10 AREA CELL AND NONE MAY BE PASTED INTO ONE. They are four cells of a 56-cell table measured by one process on one afternoon, and the table is only sound when every cell in it comes out of the same sweep after every module has landed. design/gen10.md hard point 2 and design/area-rezero.md standing rule 2 both say the same thing: AREA is regenerated ONCE, by the integrator, after every module in the generation has landed, because a sweep run between two of them produces a complete, self-consistent, wrong table that the guard passes. Nothing in this module edits a cell and nobody should run the sweep on its account.',
      why: 'The interesting property of this part is that it demonstrates the difference between following the rim and following the tyre, and that a part which changed by two different amounts in two places is the one most likely to be drawn wrong.\n\nIt also does the thing wheels-9 said it did: it is the rim protector. The outboard sidewall of the tyre carries no relief at all, no legend and no rib, because this dish runs 2 to 6 mm off it across every radius and takes 100 percent of the first hits from r 0.048 to 0.312 in an orthographic ray grid. Narrowing the tyre and flattening the dish did not change that relationship, and it was re-measured rather than assumed: the cover\'s underside and the tyre\'s outboard sidewall interpenetrate only where the elastomer seal is designed to squeeze them together, at 2.58 mm on both rungs to the hundredth, which is the same seal squeeze wheels-9 built.',
      fail: [
        'A full cover is a full cover in a kerb strike, unchanged from wheels-7: the dish stands proud of the tyre section at its outer edge, which is the first thing a kerb touches, and a cracked cover is a whole cover. What changed is that the whole corner came in 10 mm, so where wheels-9 put the lip 41.8 mm from body-9\'s fairing this module measures 50.16 mm surface to surface. Ten millimetres of hand and tool access came back at the bayonet ring, against the 50 mm wheels-9 spent. That is a service improvement and it is worth exactly what it sounds like.',
        'The brake air path is scheduled by a louvre this module does not own and nobody has re-derived it across two generations now. body-9 moved the arch louver bank to |z| 0.8750 to 0.9164 across y 0.580 to 0.733 and nobody re-derived the flow. This module then moved the cover\'s exhaust slot 10 mm inboard and 6.4 mm in the dish, into a pressure field that has now moved twice with no measurement behind either move. The 188 m3/h on the discs panel is a pumped figure for the disc, not a measured exhaust. Measured surface to surface, the gap from this cover to those louvers goes 72.40 mm to 82.39, so the exhaust has further to travel into a region nobody has characterised.',
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
      how: 'THE DISC IS CARRIED WHOLE AND THE SIZING CASE WAS RE-DERIVED RATHER THAN COPIED, which is how you find out whether anything moved. One model over both rungs: a 10 percent grade at 60 km/h on the preset laden mass, gravity power less rolling at the booked Crr less aero at Cd 0.108 on the measured area. Gen 9 at 1,787.58 kg gives 29.08 kW of gravity, 1.11 of rolling and 0.63 of aero, leaving 27.34 kW of friction and 13.67 per front disc. Gen 10 at 1,786.58 kg gives 29.07, 1.11, 0.63, 27.33 and 13.66. Ten watts. The ring, the 36 curved vanes in the 18 mm passage, the 3,000 J/K, the 740 to 800 C steady descent and the 3.5 mm to suspension-9\'s upper front ball joint are all wheels-9\'s and all unchanged, and translating nothing cannot change a radius.\n\nNote which way the Crr decision pushed that. Had this module booked 0.0034 the rolling term would fall to 0.99 kW and the disc would take 13.72 instead, because on a descent every watt the tyre stops absorbing is a watt the friction brake absorbs instead. Refusing the count is worth 60 watts to this part, which is nothing and is the right sign, and it is the only place in the module where the two decisions touch.\n\nTHE PACK CORNER, WHICH IS THIS PANEL\'S REAL SUBJECT, AND battery-10 HAS LANDED SO IT IS MEASURED AGAINST THE PARTNER THAT SHIPPED. wheels-9 published three pack clearances here that a reviewer showed do not exist, because the surfaces interpenetrate, and HANDOFF.md records the correction. This panel does not publish a clearance across an intersection. It publishes the penetration, the interface plane, the clearance where there is one, and what none of that covers.\n\nFour sweeps, one predicate, tools/check-interfaces.sh\'s own at its own 0.005 mm tolerance, static:\n\n    wheels-9  x battery-7    5 part pairs   804 crossings   deepest 21.40 mm\n    wheels-10 x battery-7    5 part pairs   676 crossings   deepest 21.40 mm\n    wheels-9  x battery-10   0 part pairs     0 crossings\n    wheels-10 x battery-10   0 part pairs     0 crossings\n\nTHE STATIC CORNER IS CLOSED. battery-10 cut it and the notch is generous enough that it would have cleared wheels-9 too, which is the honest reading of that third row and is worth printing rather than letting this module take credit for the pack\'s work. What the narrowing contributed is the middle row: 128 crossing triangle pairs and 1.38 mm off the deepest gallery crossing against the OLD pack, and 10 mm of inner sidewall handed to the new one before it drew anything.\n\nThe clearances that exist now, measured surface to surface against battery-10 as built, segment to segment and vertex to triangle over both triangle sets rather than nearest vertex. The method is checked before it is used: run over wheels-9 against battery-7 it returns the 4.38 mm rim-to-galleries figure HANDOFF.md publishes, to the hundredth, and 4.38 is itself a correction of a 5.79 mm nearest-vertex reading.\n\n    disc ring to floor lid      10.00 mm   near (1.2904, 0.2974, 0.6040)\n    tyre to floor lid           10.73 mm   near (1.1076, 0.2792, 0.6878)\n    wheel flange to floor lid   21.35 mm   near (1.1907, 0.2999, 0.6767)\n    caliper to floor lid        33.06 mm   near (1.2559, 0.3355, 0.6289)\n\nTWO OF THOSE FOUR ROWS FIRST SHIPPED AS 9.77 AND 33.30 AND THIS IS WHY THEY MOVED. battery-10 was written alongside this module and changed on disk after the first sweep, so those two rows were measured against a pack that no longer exists. That is design/retro-gen9.md\'s "a module written before its partner lands will measure against the wrong partner", live, inside the one generation whose hard point 6 says the pack and the wheels are one decision. The two rows that did not move, 10.73 and 21.35, are the tyre and the wheel flange, and they did not move because the notch face they read is the one the declared interface pins. The rows that moved are the two the interface does not reach. Anyone re-running this table after battery-10 changes again should expect the same two rows to be the ones that move, and the interface is the reason.\n\nThe first row is still the one to read. battery-10 did not stop at the declared plane and go home: it cut past it to |z| 0.6550 across x 1.09 to 1.30 on lid, gallery, strike shield and its own corner closeout, so the DISC ring at 0.6040 to 0.6340, which the declared plane does not reach at all, clears by 10.00 mm, tying against the lid and against the corner closeout at the same vertex. The 26 by 56 by 30 mm bite this panel was going to have to ask for is already gone.\n\nTHE INTERFACE, DECLARED, AND EXACTLY WHAT IT ASSERTS. SYSTEM.interfaces carries front-corner-pack-outboard at |z| 0.6625, mirrored, realised by the tyre with extent min. The derivation is one line off this module\'s built mesh: the tyre\'s section maximum is a real vertex ring at 0.6725, and the plane is that ring less a 10.0 mm running clearance. It also leaves 12.5 mm over the cell stack, which sits at |z| 0.6500 on both packs, so a notch that lands on this plane takes lid, strike shield and cooling gallery and no cells. battery-10 declares the same key at the same 0.6625 with extent max, and it did not land ON the plane: its corner closeout stops at 0.6550, 7.5 mm inside the declared plane and 5.0 mm off its own cells, which measure |z| 0.6500 in the fouled x band 1.09 to 1.30 on both packs, and that is why the disc clears. The checker reports the key MET with two modules agreeing, this module\'s nearest tyre vertex 10.0 mm off inside an 11 mm tolerance and the pack\'s nearest closeout vertex 7.5 mm off inside 8.\n\nAND HERE IS WHAT NONE OF IT COVERS, published on the same panel so nobody has to find it. tools/check-interfaces.sh sweeps STATIC geometry. The front wheels steer.\n\nRe-running the identical predicate with the front corner rotated about the vertical axis through (1.45, 0.74), one method over both wheels and both packs:\n\n    lock      wheels-9 x battery-10        wheels-10 x battery-10\n    0.0 deg    clean                        clean\n    1.0        clean                        clean\n    1.5        2 pairs, 40 crossings        clean\n    3.0        5 pairs, 745                 clean\n    3.5        9 pairs, 1,061               4 pairs, 73 crossings\n    4.0       10 pairs, 1,280               4 pairs, 159\n    8.0       10 pairs, 2,250              10 pairs, 1,961\n   14.0       10 pairs, 2,801              10 pairs, 2,607, deepest 21.40 mm\n\nSO THE CONTAINED LOCK AT THIS CORNER IS 3.0 DEGREES AND THE RACK COMMANDS 14. The narrowing buys exactly two degrees of it, from 1.0 to 3.0, and that is the honest size of what a tyre section can do here. Beyond three degrees the front tyre sweeps through the pack\'s forward outboard corner, and by fourteen it is 21.40 mm into the floor lid over ten part pairs and 2,607 crossing triangle pairs.\n\nThree things about that. It is INHERITED: Gen 9 bought 0.1136 m2 of frontal area by bringing the front track to |z| 0.74, and this is the rest of the invoice, arriving at a corner where the pack runs to x 1.29 and the axle sits at 1.45. It is the same shape of defect design/retro-gen9.md records against body-8, which claimed 17.25 degrees of contained lock and fouled at 3.11 when somebody finally swept it. And NEITHER MODULE CAN FIX IT: the pack cannot cut to |z| 0.5770 without taking cells that sit at 0.6500, and the wheel cannot leave, because no tyre section reaches the plane and the disc ring is pinned outboard by the wheel spokes at |z| 0.706 and inboard by the caliper it straddles. It wants the pack to stop further forward than x 1.29 or the front track to go back out, and both of those are generation-scale.',
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
        ['Torque available', '4.36 kNm per corner against the 1.29 a 0.714 g tyre takes'],
        ['Straddle', 'Halves at |z| 0.5885 and 0.6495, unmoved'],
        ['Mass', '2.5 kg each, carried from wheels-9'],
        ['Maturity', 'Production practice'],
      ],
      how: 'NOT ONE COORDINATE OF THE CALIPER MOVED, and one 2.6 mm tube did. The casting, the six 32 mm pistons in three pairs, the titanium piston crowns, the rollback seals, the three bridges, the pads, the two-lug bracket reaching for suspension-9\'s upright at |z| 0.6475, the crossover boss and its banjo are all wheels-9\'s at wheels-9\'s coordinates. The corner did not translate this generation, so there was nothing for this part to follow.\n\nTHE PAD WEAR SENSOR LEAD WAS ROUTED THROUGH THE BRAKE DISC AND THAT IS A DEFECT THIS MODULE FOUND ON ITS OWN CORNER. Swept mesh by mesh inside the module with tools/check-interfaces.sh\'s own predicate at its own tolerance, wheels-9\'s lead crosses wheels-9/discs in 64 triangle pairs a side: 43 pairs 5.64 mm into the outboard friction plate, 9 pairs 4.32 mm through the ceramic band face, and 12 pairs 0.96 mm through a vane. Its second waypoint sits at radial 0.1545 and |z| 0.618, which is inside the ring\'s r 0.145 to 0.1825 band and inside the 18 mm vane passage between the plates. It is a cable threaded through a part that turns at 747 rpm and runs at 800 C on a descent.\n\nWHY NOTHING CAUGHT IT. SPEC.md is explicit that part pairs inside ONE module are not tested by tools/check-interfaces.sh, on the correct grounds that two modules sharing a volume is a decision neither can make alone while a module overlapping its own boxes is tools/smoke.sh\'s business. But tools/smoke.sh checks metadata against geometry, not geometry against itself. So there is no tool on this project that sweeps a module against its own parts, and this file has now shipped four generations with a wire through a brake rotor. Running the cross-module predicate with both sides pointed at one module is about thirty lines and it is what found this.\n\nTHE NEW ROUTE, PLACED AGAINST MEASURED CONSTRAINTS RATHER THAN DRAWN BY EYE. It goes under the caliper, out past the disc, and then up the caliper\'s own outboard face to a connector beside the bleed nipples, which is also what a wear sensor lead does on a real corner: it is captive to the caliper as far as a bulkhead and it is not a chassis harness. The two caliper halves are solid boxes over y 0.3499 to 0.4799, so the run holds y at or below 0.3400 until it is outboard of them; the ring\'s outboard face is |z| 0.634, so the run reaches 0.6480 before its radius comes inside 0.1825; the outboard half ends at |z| 0.6645, so the climb sits on 0.6690, 4.5 mm proud of the face it clips to; and the disc\'s hat bell stands at r 0.0900 over |z| 0.635 to 0.676, which the climb clears at radial 0.161.\n\nIT TOOK TWO ATTEMPTS AND THE FIRST ONE IS WORTH KEEPING. A route that climbed to the bracket at |z| 0.6470 passed straight through autonomy-4\'s cable ring, which crosses this corner at y 0.3925 to 0.4355 and |z| 0.5968 to 0.6623: autonomy-4/ring x wheels/calipers went from 494 crossing triangle pairs to 578 with the depth unchanged at 42.36 mm. That is design/gen10.md hard point 8\'s rule arriving in real time, a pair that gains crossings being this generation\'s rather than inherited, and it was caught by re-running the whole-car sweep rather than by looking at the corner. The route above puts that pair back at exactly 494, and body-9/front-fairings x wheels/calipers goes 832 to 815.\n\nTHE SIZING CASE GOT EASIER AND THE REASON IS EMBARRASSING. A peak stop on the Gen 9 preset at its 0.740 g tyre is 10.07 kN at the road, about three quarters of it at the front once transfer has finished, 1.341 kNm per front corner. On Gen 10\'s 0.7137 g tyre it is 9.71 kN and 1.292. The caliper delivers 4.36 kNm either way. So the one thing that made this part less oversized this generation is the tyre getting worse, which is not a saving and is not booked as one: the kilogram wheels-7 refused to bank is refused again, for the reason it was refused twice before. Peak torque is not what sizes this caliper. Fade-free clamp after months of disuse, at the end of a descent, with a rear axle contributing under 8 percent, is what sizes it, and every one of those cases is unchanged.',
      why: 'A part that survives five generations of the hardware around it survives because its sizing case never got easier in a way that counts, and this generation is the cleanest demonstration yet: the only input that moved is the tyre\'s peak grip, it moved the wrong way, and it made the caliper MORE oversized rather than less. Booking a kilogram off that would be banking a safety margin against a capability loss, which is the exact trade wheels-7 and wheels-9 both declined.\n\nThe sensor lead is the other half of the panel and it earns more space than the caliper does, because the caliper is right and the lead was wrong for four generations in a place nothing looks. Rerouting it is a fifteen-minute edit. Finding it needed a sweep nobody had written, and the reason nobody had written it is that the contract explicitly assigns intra-module overlap to a tool that does not check for it. That gap is worth more to the next generation than the fix is to this one.',
      fail: [
        'The bracket still does not land on the upright it is drawn against. Swept against suspension-9\'s built front knuckle, this module\'s two lugs and their pad at |z| 0.6475 stand 14.0 mm off the nearest knuckle surface, exactly as wheels-9 measured, because neither part moved. It is not a foul and not a float, since the caliper is captured by the ring it straddles at 1.0 mm; it is a bolted joint with no boss on the other side of it, and suspension-9 owes 14 mm of mounting face at radial 0.145, y 0.498, on the inboard flank of the front upright. Two generations have now published that requirement and no suspension generation has been open to take it.',
        'suspension-9\'s front knuckle is still 10.91 mm inside this caliper over 251 crossing triangle pairs, bit identical to wheels-9. Nothing this module did touched it and nothing this module could do would: the caliper is pinned by the ring and the knuckle is pinned by a suspension slot that is not open. It is one of the nine inherited pairs listed in full on the front wheels panel.',
        'Two calipers is still two single points, unchanged since Gen 2. These two components are the entire hydraulic system of the vehicle, one pressure block, two lines, twelve pistons, and the rear axle offers even less behind a mistake than it did in Gen 5 because the tyre behind it now grips 3.5 percent less again.',
        'C/SiC pad dust is abrasive rather than merely dirty and the disc still runs 100 degrees hotter than wheels-7\'s, which shortens piston seal and dust-boot life. The seal interval was already shorter than the pad interval in Gen 7 and this generation does nothing about it. What it does add is a wear sensor lead that now runs on the OUTSIDE of the caliper rather than through the disc, so it is exposed to that dust where it used to be exposed to 800 C. Both are bad and one of them is not a fire.',
      ],
      explode: [-0.3, 0, 0.2],
    },
    'park-brake': {
      name: 'Park-and-rescue brakes',
      tagline: 'Untouched to the coordinate, re-derived to the newton-metre, and the generation that finally asked whether the tyre can take what the drum can give. Nose down on a thirty percent grade it cannot.',
      mass: 2,
      count: 2,
      specs: [
        ['Type', '180 x 22 mm simplex inside the motor ring bore, carried'],
        ['Hold required', '894 Nm per corner at 30% grade laden (1,786.58 kg)'],
        ['Hold available', '1,080 Nm from a 6 kN dry spindle at r 0.090'],
        ['Statutory case', '551 Nm at the 18% grade type approval asks for'],
        ['Binding limit', 'NOT the drum. The rear TYRE, and nose-down at 30% it fails'],
        ['Maturity', 'Production practice'],
      ],
      how: 'THE DEVICE IS UNTOUCHED IN EVERY COORDINATE AND ITS ARITHMETIC WAS RE-RUN ANYWAY, which is how this panel has earned its place twice before. Holding torque is a function of mass, grade and tyre radius, and this generation moved exactly one of the three by exactly one kilogram. On a 30 percent grade gravity pulls 1,786.58 times 9.81 times sin(arctan 0.30), which is 5,036 N down the slope against Gen 9\'s 5,039, and this axle is the only axle holding it, so each corner resists 2,518 N and at the 0.355 m tyre radius that is 894 Nm. Gen 9 needed 894 Nm. To the newton-metre, nothing moved, and the radius is why: P.tireR is frozen, so the one input that could have changed this number is the one this generation was forbidden to touch.\n\nA simplex drum roughly doubles what its spindle applies, so 894 Nm at the 90 mm band radius asks 4.97 kN and the dry spindle is specified at 6, giving 1,080 Nm and a fifth of margin. Every coordinate is unchanged: the rotating carrier necking from r 0.090 onto the hub pilot at r 0.072 over |z| 0.658 to 0.732, the static boss at 0.6395, the backplate at 0.6315 holding r 0.100, the shoes at 0.682, the gearmotor at 0.616 reaching inboard to 0.596. Every radius is inside 0.155, so the device lives in the annulus BORE and the contract band stays void.\n\nAND THE DRUM WAS NEVER THE BINDING LIMIT, WHICH NO GENERATION OF THIS SLOT HAS SAID. Three generations have compared 894 Nm of demand against 1,080 Nm of drum and called it a fifth of margin. That comparison assumes the tyre can put 894 Nm into the road, and on a rear-axle-only park brake it often cannot. Solved with one model over both rungs, static rear share 43.1 percent, centre of gravity 0.500 m, wheelbase 2.90 m, longitudinal transfer on the slope included:\n\n    case                    rear normal share   mu required   Gen 9   Gen 10\n    30 % grade, nose up          0.4624            0.6215     0.740   0.714   holds\n    30 % grade, nose down        0.3633            0.7910     0.740   0.714   NEITHER HOLDS\n    18 % grade, nose up          0.4547            0.3896     0.740   0.714   holds\n    18 % grade, nose down        0.3936            0.4500     0.740   0.714   holds\n\nParked NOSE DOWN on the 30 percent grade this device is sized for, the rear tyres need a coefficient of 0.791 and have 0.714. The drum can produce 1,080 Nm and the road will not take 894. This is INHERITED and not created: wheels-9\'s 0.740 g tyre needs the same 0.791 and misses by less, so the car has never held that case and three panels have implied it does by quoting a drum against a demand. What Gen 10 did was make the miss worse, from a ratio of 0.936 to 0.902, and it did that by trading grip for rolling resistance on a count it then declined to book.\n\nThe statutory case is the one that is actually certified and it passes comfortably: 18 percent nose down needs 0.450 against 0.714, which is 59 percent of margin, and 551 Nm against 1,080. So the device meets the law and misses the specification this file wrote for itself, and the two have been printed as one number for three generations.',
      why: 'Re-deriving a carried number rather than copying it is how you find the input that moved, and this time the useful finding is that nothing moved and the comparison was wrong anyway. wheels-7 found 20 Nm of extra laden mass. wheels-9 found 8 Nm going the other way. This module found zero, and then found that the quantity everyone has been comparing is not the quantity that decides the case.\n\nThe temptation to delete a device that contributes under 8 percent of a dead-vehicle stop grows every generation and is wrong every generation, because the law requires a car with every electron gone to hold and to stop. What this panel adds is that the law\'s case, 18 percent, is not the case the panel has been quoting, 30 percent, and only one of the two is met.',
      fail: [
        'THE 30 PERCENT NOSE-DOWN HOLD DOES NOT EXIST AND IT IS THE TYRE, NOT THE DRUM. 0.791 required against 0.714 available, a ratio of 0.902, on a car whose park brake acts on one axle. The honest fixes are all outside this module: a park brake on the front axle, which means a second dry actuator and a second failure set on the axle that already carries the entire hydraulic system; a lower centre of gravity, which is nine modules; or a tyre with more grip, which is the trade this generation just made in the other direction. What this module can do is publish the number, which no previous generation of this slot did.',
        'It is still the least inspectable friction device on the vehicle, inside a motor inside a wheel, and no better placed than it was in Gen 7. Shoe condition is inferred from the gearmotor current signature on hv-4\'s telemetry, and the self-adjusting spindle that could jam in Gen 2 can still jam here behind more hardware than ever.',
        'The bore it lives in is still crowded by suspension-9 and the crowding is bit identical to wheels-9: rear structure through this device in 1,416 crossing triangle pairs at 20.00 mm, which is the deepest pair the wheels slot has against ANY module on the car, and rear steer at 2.46 mm over 215 pairs. Note where that deepest one is. It is at the REAR, on the axle Gen 9 deliberately did not touch and Gen 10 did not touch either, which is why a part list drawn around the front corner has missed it twice.',
        'Two full applies from 20 km/h and it needs minutes to cool, unchanged and by disclosure. The fallback deceleration behind it stays at wheels-7\'s 0.33 g, and it stays because it is limited by wheel-motor torque rather than by grip: 0.33 g needs a coefficient of 0.33 and the tyre still has 0.714. That is the one place on this panel where the tyre change costs nothing.',
      ],
      explode: [0, 0, 0.78],
    },
    'master-unit': {
      name: 'Brake-by-wire unit',
      tagline: 'The Gen 2 box on its seventh posting, and the first generation where it did not have to move a single coordinate. Three of its calibrations went stale anyway.',
      mass: 3,
      specs: [
        ['Architecture', 'One-box dry unit, front hydraulics only, carried from wheels-2'],
        ['Pressure build', '0 to 180 bar in 120 ms (carried)'],
        ['Actuators arbitrated', 'Two calipers, two wheel motors, two park brakes'],
        ['Fallback', 'No push-through: motors plus park brakes, about 0.33 g'],
        ['Front lines', 'At the caliper crossover fittings, (1.286, 0.484, +-0.620), unmoved'],
        ['Maturity', 'Production practice'],
      ],
      how: 'SEVEN GENERATIONS AND THIS ONE DID NOT MOVE A POINT. The hardware is carried whole from wheels-2 through wheels-3, wheels-6, wheels-7 and wheels-9: a dry pedal unit with a spring and elastomer simulator, dual ECUs on separate supplies, a ball-screw plunger block feeding two front calipers, and no push-through rod. Both hydraulic runs still terminate at (1.286, 0.484, plus and minus 0.620) and both aft harnesses at (-1.494, 0.287, plus and minus 0.616), because the calipers and the park brakes did not move either. wheels-9 could say an axle moved 140 mm and cost this unit two tube endpoints. Gen 10 changed the tyre on the end of the system and cost it nothing at all, which is the strongest thing this box has ever demonstrated about designing around an interface.\n\nWHAT DID CHANGE IS UNDERNEATH IT, AND THREE CALIBRATIONS ARE NOW STALE. The tyre\'s peak grip goes 0.740 to 0.714, its vertical rate goes 280.9 kN/m to 396.1, and its contact patch goes 113.4 cm2 to 89.0. Every one of those is an input to something this unit schedules.\n\nThe anti-lock threshold is set against a slip curve whose peak has moved down 3.5 percent and, more importantly, whose shape has changed: a 21 percent smaller patch on a stiffer casing reaches peak slip at a lower slip ratio and falls off it faster, so a threshold tuned for wheels-9 releases late. The pad conditioning schedule, a few newtons of pad drag metered at about 0.17 Wh per event when autonomy-4\'s forward model predicts a hard stop, is set against a deceleration this tyre no longer delivers, so it now over-conditions. And the vectoring coordinator arbitrates yaw moment against a front-to-rear brake split whose lateral capacity fell at both ends by the same 3.5 percent, which is the one of the three that does NOT need retuning, because a uniform scaling of both axles leaves the balance where it was.\n\nTHE FALLBACK IS UNCHANGED AND THIS TIME THE REASON IS A MEASUREMENT RATHER THAN AN ASSERTION. About 0.33 g on wheel motors and two park-brake drums with hydraulics gone. wheels-7 published 0.38 and then 0.33 after the tyre gave up 13 percent of its peak, so the obvious worry is that another 3.5 percent takes it lower again. It does not, because 0.33 g is limited by wheel-motor torque and not by grip: the demand is a coefficient of 0.33 and the tyre still has 0.714, so there is more than a factor of two of grip behind the number. That is worth printing rather than assuming, because for two generations this box has been where a regressed safety figure gets printed and this is the first generation where the tyre got worse and the figure genuinely did not.',
      why: 'A control box that outlives seven generations of the hardware it commands is the strongest argument any part on this car makes, and it survives because it was designed around an interface rather than around a vehicle. What this generation adds is the opposite demonstration to Gen 9\'s. Gen 9 moved a whole axle 140 mm and this unit needed two coordinates changed. Gen 10 moved nothing this unit can see and yet invalidated three of its calibrations, because they are tuned against the tyre and not against the geometry.\n\nThat is the more dangerous of the two cases and it is the one nothing checks. tools/check-interfaces.sh sweeps vertices; there is no tool on this project that notices when a partner\'s SPEC ROW moves under a calibration. Writing it down on the panel is the whole of what is available.',
      fail: [
        'The arbitration line is still the single point it was in Gen 3, a disagreement between braking and vectoring settled by a 2 millisecond priority rule that has to be right every time. This generation adds a stale input rather than a new risk: the slip curve the rule arbitrates against belongs to a tyre with 21 percent less contact patch and a 41 percent stiffer casing, and nobody has re-measured it.',
        'The 0.33 g fallback was computed in Gen 7 against a drivetrain that did not exist yet, and drivetrain-9 now does. That number has still not been re-derived from the built machine, and this module did not do it either, because doing so properly means modelling short-duration rim-side inverter derate at low speed rather than reading a spec row. It is carried as an estimate with its inputs named, and at seven generations it is the oldest open item in this file.',
        'The independence case spans this unit, drivetrain-9\'s vectoring coordinator and two rim-side inverters, three codebases on dissimilar hardware arguing they cannot fail together. Nothing about it moved this generation, and that is worth stating explicitly rather than leaving as silence: no harness was rerouted, no supply was shared, and the only cable this module\'s slot touched at all is a 2.6 mm sensor lead on the calipers panel.',
        'This unit interpenetrates two of its own module\'s parts and both are terminations rather than defects, which is stated here so a reader of the intra-module sweep is not misled. The forward hydraulic pair ends INSIDE the caliper crossover boss, 82 crossing triangle pairs at 8.54 mm, which is what a line ending in a bore looks like. The aft harnesses end inside the park-brake gearmotor at (-1.494, 0.287, plus and minus 0.616), 92 pairs at 15.08 mm, and that coordinate is the gearmotor\'s own to the millimetre. Both are drawn as interpenetrations because a connector is one. The third pair the sweep used to report, the wear sensor lead through the disc, was not a termination and is fixed.',
      ],
      explode: [0.5, 0.35, 0],
    },
  },
};

/* ── Geometry ──
   Corner-local frame carried from wheels.js through wheels-9.js: origin at
   the wheel centre, z along the axle, s = sign(world z) so +s is outboard.
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
   the tyre, the two rim barrels and the cover moved inboard, and by three
   different amounts, which is the thing to keep straight: the RIM narrowed
   6.35 mm a side because it is 4.5J instead of 5.0J, the TYRE narrowed 10.0
   mm a side because it is a 135 section instead of a 155, and the COVER's
   seat followed the rim while its lip followed the tyre. Nothing else in the
   file moved at all: the disc, the caliper, the park brake and the master
   unit are wheels-9's geometry at wheels-9's coordinates.

   Key world planes, FRONT corner. An arrow marks a plane that moved:
     0.5640  caliper bridge, inboard face
     0.5735  caliper inboard half, inboard face
     0.6040  disc friction ring, inboard face
     0.6340  disc friction ring, outboard face
     0.6625  DECLARED front-corner-pack-outboard keep-out plane      <-
     0.6725  tyre inner face, the 135 section maximum                <-
     0.67635 rim inboard flange lip, 4.5J                            <-
     0.68285 rim inboard bead seat, flange end                       <-
     0.6925  hub face plane, ET47, the declared halfshaft interface
     0.7400  wheel centre plane
     0.79715 rim outboard bead seat, flange end                      <-
     0.80365 rim outboard flange lip                                 <-
     0.8075  tyre outer face                                         <-
     0.8090  cover outer lip, the outermost surface on the car       <-

   Key world planes, REAR corner. The contract half is untouched:
     0.6315  park-brake backplate, static
     0.6382  flange bolt heads, inboard face
     0.6460  flange bolt heads, seating face on the titanium ring
     0.6500  CONTRACT flange face, drivetrain-9 rotor rings bolt here
     0.67635 rim inboard flange lip, 4.5J                            <-
     0.6725  tyre inner face                                         <-
     0.7300  outboard edge of the CONTRACT annulus
     0.7400  wheel centre plane
     0.7460  valve, which this wheel has never had before            <-
     0.8075  tyre outer face                                         <-
     0.8090  cover outer lip                                         <- */

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
   eye is ever below the ground plane, 1.11 mm per pixel, pixel-centre
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
        front and 120 at the rear while the tyre stays on its rim
     C  the corner inside the assembled Gen 10 preset, all nine modules

   Scene A, front corner, 47,760,958 first-hit pixels, by part:

     tyres        46.66 %      covers        30.68 %      discs   10.26 %
     front-wheels  5.57 %      master-unit    3.69 %      calipers 3.14 %

   Scene A, rear corner, 46,530,359: tyres 46.32, covers 29.45, rear-wheels
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
   claim than the one that was published. A tyre at 5.6 bar needs a valve at
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

   ONE THING MEASURED AND THEN NOT BUILT. Raising the tyre lathe from 48 to
   60 segments takes the chord sag on the crown from 0.760 mm to 0.487 and
   costs 2,688 triangles across four tyres. The tyre is the single largest
   first-hit surface on the car at 46.6 percent, so it is the one place a
   segment count would be defensible, and it is still not worth 0.27 mm of
   sag: it would take this module from 94.1 percent of its budget to 98.7
   with nothing left for the generation after. wheels-9 made the same call
   about barrels at 40 segments and it was right. ── */

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
   135/75 R20 on a 4.5J rim, against wheels-9's 155/65 R20 on 5.0J.

   WHAT IS FROZEN, AND IT IS THE WHOLE RADIAL COLUMN. The rim seat radius is
   BEAD 0.2540, the flange lip is FLANGE 0.2665 and the crown is P.tireR
   0.355, so the section HEIGHT is 101.0 mm on both tyres and the outside
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
       grooves               5           4      the centre groove is deleted

   THE CENTRE GROOVE IS DELETED AND THAT IS THE POINT OF THE PATTERN, not a
   simplification. A groove down the centreline splits the rib carrying the
   highest contact pressure into two half-ribs that can each squirm
   independently, and block squirm is hysteresis in the tread band. One
   continuous centre rib is what a low-loss tread does, and what it costs is
   the one drainage path directly under the standing water a tyre displaces
   first. The wet number is on the panel and it is worse.

   The rim protector and the section asymmetry are wheels-9's and the reason
   survives the narrowing: the outboard sidewall runs 2 to 6 mm off the inside
   of a cover that takes 100 percent of the first hits from r 0.048 to 0.312,
   so nothing may stand proud there and nothing there could be seen if it did.
   The rib stays on the INBOARD sidewall, which faces the arch. */
const TYRE = [
  /* inboard sidewall: the half a viewer can see */
  [BEAD,   -RIMW],     /* bead heel on the tapered rim seat, local -0.05715 */
  [0.2670, -LIP - 0.0020],  /* rim protector, turned out over the flange lip */
  [0.2800, -LIP],      /* casing level with the flange lip, as wheels-9 had it */
  [0.3040, -0.0658],   /* carried station, scaled on the section */
  [0.3180, -SECT],     /* SECTION MAX, world |z| 0.6725: do not move */
  [0.3340, -0.0645],   /* carried station, binds the 14 degree sweep */
  [0.3470, -0.0575],   /* carried station, shoulder */
  /* crown: four grooves and three ribs, the centre one continuous */
  [0.3535, -0.0496],   /* shoulder radius up to the crown */
  [0.3505, -0.0477],   /* shoulder groove, 4.5 mm deep */
  [0.3505, -0.0446],
  [P.tireR, -0.0409],  /* crown edge */
  [P.tireR, -0.0228],
  [0.3505, -0.0209],   /* intermediate groove, 4.5 mm deep */
  [0.3505, -0.0171],
  [P.tireR, -0.0152],
  [P.tireR,  0.0152],  /* CONTINUOUS CENTRE RIB, 30.4 mm, no centre groove */
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
  g.add(zlathe(TYRE, s, M.rubber, TSEG));
  return g;
}

/* A CLAMP-IN VALVE, AND THE PRESSURE IS WHY IT IS NOT THE SNAP-IN ONE.
   wheels-9 drew a two-piece rubber snap-in valve, a stem and a grommet seat,
   which is the right part for the 4.4 bar it carried and is not rated for
   the 5.6 this tyre runs: a snap-in valve is a rubber body retained by its
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
     against the flange. On a 4.4 bar tyre a flat seat is a drawing error. On
     a 5.6 bar tyre it is the retention argument, so it is drawn: BEADT
     0.0021 of radius across a 23.9 mm seat, measured back as 5.02 degrees.

     THE HUMPS GET A PARTNER AT THE REAR. wheels-9 put a hump inboard of each
     front bead seat and none at all on the rear wheel, which reads as an H2
     rim at the front and a flat-base rim at the rear on a car whose two
     axles now run the same tyre at the same pressure. Both wheels carry
     humps on both seats here.

     WHAT THE NARROWING BOUGHT AT THE PACK. The inboard flange lip moves from
     world |z| 0.6700 to 0.67635. Measured surface to surface against
     battery-7 as built, one method over both wheels, the wheel's one
     surviving pack clearance goes from 4.38 mm to 5.85 mm, measured surface
     to surface rather than nearest vertex, and it is still the only pack
     clearance this corner has. Six millimetres of flange does not buy six
     millimetres of clearance because the approach is diagonal, which is
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

  /* Valve, through the well floor at r 0.2300, pointing inboard down the
     radius: see the valve helper above for why it is now a clamp-in. */
  valve(g, 0.2300, -0.0060, s);

  /* Balance weights were drawn on the inboard flange and taken off again for
     the clearance reason in the barrel comment above. There is nowhere else
     on this wheel to put one: the outboard flange is under the cover and the
     well is inside the sealed tyre cavity. */

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

  /* A VALVE, WHICH THIS WHEEL HAS NEVER HAD. wheels-3, wheels-6, wheels-7 and
     wheels-9 all draw a valve in the FRONT wheel and none in the rear, while
     drawing one cover part with one service door and fitting it to all four
     corners. Two of the four covers therefore carried a service door over
     nothing, and the rear tyre had no way to be inflated. It goes on the
     OUTBOARD side of the drop well at local +0.0060, not the inboard side the
     front uses, because the inboard side is 5 mm from drivetrain-9's rotor
     rings at |z| 0.7280: measured, the outboard placement stands the stem at
     |z| 0.7420 to 0.7500 and stands 12.80 mm off those rings measured
     surface to surface over both triangle sets. State the convention: 13.8
     mm is the AXIAL difference from 0.7418 to the rings' 0.7280 and this
     file does not publish one of those as a clearance, because the closest
     approach here is diagonal and lands a millimetre short of it. It is
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
   its edge stands 1.5 mm proud of the tyre section maximum. Every RADIUS is
   wheels-7's. The two axial numbers that own this part both moved with the
   narrowing, and they moved by different amounts:

     flange seat   local 0.0700 to 0.06365,  because the rim is 4.5J
     outer lip     local 0.0790 to 0.0690,   because the tyre is 135 wide

   so the dish is 3.7 mm shallower from seat to lip than wheels-9's, and the
   cover's outer lip lands on world |z| 0.8090 instead of 0.8190. That lip is
   the outermost surface of the whole corner at both axles, which makes this
   part, not the tyre, the one that owns the outer edge of the frontal-area
   integral. It also makes it the part that must never be sized by the tyre's
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
     is not allowed to spend a millimetre of somebody else's clearance to look
     thick. The gap from the cover's underside to the tyre's outboard sidewall
     is on the covers panel, measured surface to surface off the built mesh of
     both parts rather than interpolated off two profiles. */
  const seal = lib.torus(0.2660, 0.0055, M.rubber, RSEG, 5);
  seal.position.z = s * 0.05815;
  g.add(seal);

  /* Inlet spider. The bore feeds the brake duct, so it is open, and an open
     bore r 0.048 across on the most-looked-at surface of the car wants
     something in it: five struts off a centre boss, which is what a moulded
     cover actually carries and what stops the bore reading as a hole. */
  for (let i = 0; i < 5; i++) {
    g.add(zat(lib.cbox(0.036, 0.0055, 0.008, 0.0012, M.plasticLt),
              0.0320, (i / 5) * Math.PI * 2, 0.0537, s));
  }
  const boss = zc(lib.cyl(0.0140, 0.0100, M.plasticLt, 14));
  boss.position.z = s * 0.0537;
  g.add(boss);

  /* Valve service door, on the same radius and the same clock angle as the
     valve. A full cover has to be openable somewhere or the tyre cannot be
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

     THE LUGS ARE SIZED BY THEIR OUTER EDGE, NOT THEIR CENTRELINE. wheels-9's
     first draft centred a 12 mm lug on r 0.2480, which reaches r 0.2543 and
     put its outer bottom corner 1.26 mm inside the tyre bead cone over 56
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
     and the tyre bead on its two seats at 1.70 and 0.33. What the sweep no
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
   park-brake panel re-solves the 30 percent grade against the TYRE rather
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
   Carried placement from wheels-2 through wheels-9, and this is the first
   generation in which not one endpoint moved. The forward pair still
   terminates inside the caliper crossover fittings at (1.286, 0.484,
   +-0.620) and the two aft harnesses still land on the park-brake gearmotor
   at (-1.494, 0.287, +-0.616), because neither the caliper nor the park brake
   moved. Both terminations are drawn as interpenetrations because a connector
   is one, and the master-unit panel says so rather than leaving a reader of
   the intra-module sweep to guess. */
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
