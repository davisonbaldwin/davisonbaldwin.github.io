/* Gen 10 battery: battery-7's pack with its outboard front corner cut away
   from the front wheel. 190 kWh at 385.1 kg, 810 V, the same anode-free
   bipolar chemistry, the same 210 layers, the same five bricks. NOT ONE
   KILOWATT-HOUR MOVES AND THAT IS THE POINT, and the tenth of a kilogram
   is the notch paying for its own closeout.

   design/gen10.md commissions this module to book no range lever at all.
   Pack energy is the highest-slope lever on the car at 8.810 miles per kWh
   and it is owned outright by this slot, and it is not available: 204.3 kWh
   at this pack's mass would be 530.5 Wh/kg against its measured 493.4,
   which is a chemistry claim battery-7 refused to make and this module
   refuses for the same reason. What is available is a geometric defect that
   Gen 9 created and charged to the pack, and this module pays it.

   THE DEFECT, measured off built meshes at the start of this work rather
   than read out of the brief. tools/check-interfaces.sh gen9 reports seven
   parts penetrating battery-7's built surface. Three of them are this
   module's and all three are the same corner:

     wheels-9/tires          564 crossing pairs, 21.4 mm into floorlid
     wheels-9/front-wheels    72 crossing pairs, 17.4 mm into floorlid
     wheels-9/discs          168 crossing pairs, 15.3 mm into floorlid

   The other four are not. interior-6/front-seats at 8.5 mm,
   interior-6/console at 7.7 and interior-6/rear-bench at 1.0 are the seat
   and console pack resting through the lid, which HANDOFF.md records on
   Gen 7, Gen 8 and Gen 9 alike and which is an interior decision. hv-4's
   hv-runs at 3.0 mm is the pack feed pressing into the lid at
   (-1.127, 0.309, 0.371), which is the service hatch at the REAR of the
   pack and 2.4 m from this corner. None of the four is created or made
   worse here: measured on the Gen 10 preset they are identical to gen9 in
   part, crossing count, depth and coordinate, to the digit and the
   millimeter.

   AND NONE OF THE FOUR IS DECLARED, WHICH IS A DECISION RATHER THAN AN
   OMISSION. tools/interfaces.js takes exemptions two ways, BATTERY_LANDINGS
   for the pack and DECLARED_JOINTS for everything else, and both are a
   claim that two modules AGREED to share a volume, with the note required
   to say where the agreement is written in both of them. Three of these
   four have a plausible story: seat loads are described on this pack's own
   floor-lid panel as passing through potted inserts into the brick tops, so
   a seat foot pressing into the lid could be a joint, and hv-4's pack feed
   leaving the service hatch at (-1.13, 0.315, 0.38) is an interface this
   pack has held since battery-6. Neither interior-6 nor hv-4 has written
   that agreement, and this module cannot write it on their behalf. A
   declaration nobody on the other side made is worse than a red check,
   HANDOFF.md says so in as many words, and the honest state of those four
   is an open interference between two slots that Gen 10 does not open. They
   stay red and they stay legible.

   THREE FIGURES IN design/gen10.md SECTION 4c DO NOT SURVIVE RE-MEASUREMENT
   AND THE CORRECTIONS ALL POINT THE SAME WAY. Every number below is one
   method, an exact plane slice of built triangles clipped to a y band, run
   over both modules.

   1. The lid does NOT reach |z| 0.744 at this corner. 0.7440 is the
      floor-lid PART bounding box, and the geometry that reaches it is the
      bonded perimeter land, which runs x -1.04 to 1.04 and stops 55 mm
      before the tire's plan circle begins. Sliced at the stations where the
      tire actually is, the pack's outboard surface is 0.7100 (lid panel)
      from x 1.090 to 1.240, then 0.7089, 0.7058, 0.7000 at x 1.250, 1.260,
      1.270, then 0.6900 (pool retaining wall) at 1.280 and 0.6653 (shield
      skin) at 1.290. A part bounding box is not a clearance.
   2. So the track figure moves with it. Clearing 0.7100 with a 155 mm
      casing needs the front center at |z| 0.7875, not past 0.82. That is
      still 47.5 mm outboard of Gen 9's 0.74 and it still destroys the whole
      of Gen 9's area win, so gen10.md's conclusion holds and only its
      arithmetic changes. wheels-10 cannot fix this corner.
   3. The 43 brick vertices outboard of the tire plane are not cells and
      not a mystery. They are ONE mesh, the brick string take-off cable,
      171 vertices of TubeGeometry ending at (1.245, 0.2845, 0.706), and
      battery-7's own verification notes already list it as a defect: "The
      brick string take-off cable dead-ends in air. The raceway it is
      described as feeding stops at x 1.080." That is why they are on the
      +z side only: there is one cable and the raceway is on the passenger
      rail. gen10.md asks what the other side does without, and the answer
      is that the other side has no take-off to route. The cable is
      rerouted here to reach the raceway it was drawn for, and the honest
      statement of what that did is a before and after rather than a
      deletion. battery-7 has 43 brick vertices outboard of |z| 0.6625, all
      of them at x 1.2371 to 1.2596, which is inside the front tire. This
      module has 54, all of them at x 1.0523 to 1.0752 and |z| up to 0.7078,
      which is inside the rocker rail where the raceway is and 33.71 mm from
      the front tire, surface to surface on the same method every clearance
      in this file uses. The count went UP by eleven and every one of
      them moved out of the wheel and into the structure the cable is
      supposed to land in. A count is the wrong summary of that edit and the
      x band is the right one.

   gen10.md's brick figures do reproduce, with one convention note: 36,731
   vertices, 36,677 of them at or inside |z| 0.6500, which is 99.853
   percent, and 43 beyond the tire plane, which is 0.117 percent, in a
   22.4 by 24.7 by 45.2 mm box at x 1.2371 to 1.2596, y 0.2677 to 0.2923,
   |z| 0.6629 to 0.7081. The "26.4 percent sit exactly on 0.6500" line needs
   a stated tolerance: at 1e-9 m the count is ZERO, because 0.65 in float32
   is 0.6499999761581421 and every one of those vertices is 2.4e-8 m short
   of the plane. At 1e-6 m it is 9,680 vertices, 26.4 percent, which is
   gen10.md's figure once the tolerance is written down. The cell stack's
   outboard face is |z| 0.6500 to 24 nanometers and that is the plane this
   module's notch is built against.

   WHAT THE NOTCH IS. The pack's outboard face at the front corner comes in
   to |z| 0.6550 from x 1.105 to 1.250, then steps to 0.5940 forward of
   x 1.268 to clear the brake disc, and the surface between x 1.080 and
   1.105 is the lead-in chamfer off the full-width 0.7100 lid edge. The
   depth is set by the CELL STACK and not by the tire: the layers are
   1,300 mm wide, their faces are |z| 0.6500, and the notch face is the
   0.7 mm titanium closeout whose inner face lies at |z| 0.6543, standing
   4.3 mm clear of them. There is nowhere further to go without taking
   layer width, and layer width is energy.

   AND THE LEAD-IN CHAMFER IS WHERE THE TIGHTEST CLEARANCE ON THIS CORNER
   IS, WHICH IS NOT WHERE ANYBODY WOULD LOOK. Measured surface to surface,
   segment to segment and vertex to triangle over both triangle sets rather
   than nearest vertex, the closest the whole pack comes to the whole front
   corner of wheels-10 is 10.73 mm, and it is not at the notch face. It is
   on the chamfer at (1.0909, 0.3020, 0.6860) against the tire's inner
   shoulder at (1.1005, 0.3039, 0.6904), where the tire's plan circle first
   reaches lid height. At the notch face proper the tire's sidewall plane is
   17.5 mm outboard, and at the disc step the disc's inner face clears by
   10.00 mm surface to surface. Three numbers, three stations, and only one
   of them is this corner's clearance. A plane figure and a surface figure
   are two different measurements, and this file publishes both with the
   station named, because HANDOFF.md records a shipped clearance on this
   exact corner that was neither.

   WHAT IT DOES NOT BUY, stated here rather than at the foot of the file
   because it is the largest thing this module found. The front wheel
   steers. Swept about the vertical axis through (1.45, 0.740), which is
   the convention wheels-9 and wheels-10 both publish their own envelopes
   on, a point on the tire swings inboard at the rate of its LONGITUDINAL
   offset from that axis, 1.45 less x, and not at the rate of its radius.
   The tire's aft-most vertex is x 1.0950 on both wheels, an offset of
   355 mm and 6.20 mm of inboard travel per degree; first contact with this
   pack lands at x 1.136, where the offset is 314 mm and the rate 5.48. Run
   through the same triangle predicate tools/check-interfaces.sh uses and
   bisected to a thousandth of a degree, all six combinations of the three
   packs and three wheels measure:

     first contact, degrees      wheels-7   wheels-9   wheels-10
     battery-7,  any surface       0.00       0.00       0.00
     battery-7,  cell stack       15.43       2.34       4.23
     battery-10, any surface      13.93       1.38       3.23
     battery-10, cell stack       15.43       2.34       4.23

   READ THE COLUMNS AND NOT THE DIAGONAL, because the diagonal is how an
   earlier draft of this file credited the notch with something the tire
   did. Hold the wheel and change the pack, which is the only comparison
   that isolates this module: the notch takes the corner from CROSSING AT
   REST to 3.23 degrees of contained lock against wheels-10, and to 1.38
   against wheels-9. It moves the cell-stack row by nothing at all, because
   the notch takes no layer width, so the 2.34 to 4.23 degrees of cell-stack
   lock is wheels-10's 135 mm casing and belongs on its panel rather than on
   this one. The pack has been inside the front wheel at rest since Gen 7
   and nobody measured it; Gen 9's matched track spent 13.09 degrees of the
   lock the cell stack used to clear; this notch buys back the static
   interference and 3.23 degrees, and no more. It cannot buy back more:
   every further millimeter is layer width, which is energy. The fix belongs
   to a generation that moves the pack's front wall aft of x 1.10 and pays
   for it in kilowatt-hours, or to a steering slot that contains the lock.

   battLoss 1.014 IS DECLINED AND HERE IS THE MECHANISM THAT DOES NOT EXIST.
   design/gen10.md invites this module to look at it and warns that it
   should probably say no. 1.007 is worth 11.6 miles and it needs the
   string's 54 mOhm halved. There are two routes and both close.

   Thicken the conductor: on a bipolar stack the conductor IS the plate, one
   sheet of steel collecting the cathode in front of it and the anode
   behind, and 54 mOhm over 210 layers is 257 microhm a layer of which the
   plate's own sheet resistance is the small part. The rest is interfacial,
   plate to cathode and separator to anode, and interfacial resistance is a
   chemistry claim. battery-7 refused to make one and so does this module.

   Rearrange the string: 105 series by 2 parallel is a quarter of the
   resistance and it buys nothing, because it also halves the voltage to
   430 V and doubles the current, so I squared R through the string is
   exactly where it started while the disconnect, the busbars and hv-4's
   input all see twice the current. It also spends the one number this pack
   has spent three generations defending, 210 layers at 4.10 V giving 861 V
   against hv-4's 870 V ceiling, which is the reason the string is 210 deep
   in the first place.

   So this module books nothing on battLoss, and it books nothing on kwh,
   cd, area, crr or driveEff either. The only entry in js/efficiency.js that
   moves because of this module is the mass the integrator sums, by 0.1 kg.
   A generation is allowed a module that books nothing. It is not allowed a
   module that books something it cannot derive.

   Everything below this line is battery-7 carried unchanged unless the
   notch touched it.

   design/gen7.md asked this pack to grow into the volume the Gen 6 boat-tail
   and the narrowed rear track free up. Measured against the partners'
   geometry rather than their prose (design/retro-gen4.md drift law), neither
   of those is where the volume is, and the content says so:

   - The narrowed rear track COSTS this pack volume. The gen7 contract puts
     the rear motor annulus at |z| 0.65 to 0.73 with its flange face at 0.65,
     70 mm inboard of the Gen 3 contract, so the rear tire's inner face moves
     inboard with it and the pack's rear corners have to be cut away.
   - The boat-tail volume is real but this pack declines it, for two reasons
     stated in numbers on the bricks part: it lies aft of the rear crash
     structure, and its centroid is 857 mm behind the rear axle.
   - The volume actually taken is under the pack, and body-7's own geometry
     is what exposes it. NOTE ON DATUMS: lib.plate(w, d, t, r, mat) lays its
     slab from y + t/2 to y + 3t/2, so a plate written "at y 0.10" has its
     underside at 0.10 + t/2, not at 0.10. Every height quoted in this file
     is a measured world y, not a plate position argument. Measured that way,
     body-7's venturi closeouts (closeF x 1.32 to 2.10, closeR x -1.935 to
     -1.315, both 12 mm plates written at y 0.10) have their underside at
     y 0.106, and its floor strakes hang lower still, underside y 0.1025.
     battery-6's pan underside is y 0.132. The pack floor has therefore been
     sitting 26 mm up inside a floor that was flat either side of it since
     battery-3. Taking the pack's lowest surface down to y 0.1025, level with
     the strakes and 3.5 mm under the closeout plane, is 29.5 mm of floor,
     and 29 of it arrives as stack height over 3.5 m2 of pack.

   Envelope, superseding design/gen4.md's table for this module only:
   x [-1.29, 1.30], y [0.1025, 0.308], z [-0.71, 0.71], narrowing to
   |z| 0.615 aft of x -1.00 for wheels-7's relocated rear corner AND to
   |z| 0.655 forward of x 1.105, which is the Gen 10 notch. Rocker bond
   rails and the shield edge rails they carry run x [-1.06, 1.08] at
   |z| 0.696 to 0.78, carried from battery-3. All of that is inside
   design/gen4.md's own x [-1.30, 1.30], y [0.13, 0.31] except the floor
   drop, which is the deviation battery-7 existed to make.

   Gen 10 preset partners, every cited number derived from their build
   geometry rather than their prose:
   - wheels-10: built front tire inner sidewall |z| 0.6725, ten millimeters
     OUTBOARD of wheels-9's 0.6625 because the section goes 155 to 135 on
     an unmoved 0.740 center. Its brake disc is unchanged and its inner
     face is |z| 0.6040, reaching floor-lid height from x 1.2754. The notch is
     sized on the cell stack rather than on either tire, so it holds for
     any casing up to 155 mm section and the interface below states the
     section at which it would have to be recut.
   - autonomy-10 and thermal-9: no joint with this pack moves. The vapor
     and liquid stubs are where battery-7 left them.
   - suspension-9, drivetrain-9, body-9, hv-4, interior-6: carried, and the
     four non-corner pack penetrations listed at the top of this file are
     theirs rather than this module's.

   Legacy partner notes from battery-7, kept because the geometry they
   describe did not move:
   - hv-4: converter is ONE cast box (0.32 x 0.13 x 0.44 at x -1.37) with ONE
     HV input boss at (-1.542, 0.45, 0.10), so there is a single conversion
     front end and the pack must land inside its 300 to 870 V input. 210
     series layers charging to 4.10 V give 861 V, unchanged from battery-6.
     Its pack feed starts at (-1.13, 0.315, 0.38): the service hatch stays
     exactly there. Its port geometry carries 630 A that this pack cannot use.
   - body-7: floor strake underside y 0.1025 sets the new floor datum, with
     the venturi closeout underside 3.5 mm above it at y 0.106; its rear
     closeout reaches x -1.315 and its strakes x -1.33, which is what stops
     the pack growing aft along the floor.
   - suspension-4: rear subframe forward crossmember x [-1.40, -1.32] at
     y [0.215, 0.285], rear-steer housing x [-1.424, -1.312] at y [0.137,
     0.218]. Together they close the aft face at x -1.30.
   - drivetrain-7 / wheels-7: neither was built when this pack was drawn, so
     its rear clearances were derived from the gen7 contract flange at
     |z| 0.65. Both have since landed and the waist has been re-verified
     against wheels-7's built tire: see the verification notes at the foot of
     this file. The waist holds with 31 mm to spare.
   - thermal-7: vapor stub UNCHANGED at (1.272, 0.268, -0.10), meeting
     thermal-7's riser flange at x 1.296 to 1.308. The liquid feed stub MOVED
     DOWN 29 mm, from battery-6's built position (1.272, 0.147, 0.10) to
     (1.272, 0.118, 0.10), because the floor dropped. This module reported
     that joint rather than editing a partner, and thermal-7 has since landed
     its condensate return flange at y 0.118: both joints are now closed and
     verified against thermal-7's built meshes. Design heat load falls 25 kW
     to 15 kW. One item stays open between the two modules, the ~19 kg of
     fluoroketone standing in this pack's pool, and it is named on the
     galleries part rather than quietly booked.

   Mass ledger, binding: 325 bricks + 6 bands + 19 rails + 11.9 lid + 5
   galleries + 3 film + 4 disconnect + 10.9 strike shield + 0.3 corner
   closeout = 385.1 kg, against battery-7's 385.0 and gen10.md's ceiling of
   388.

   THAT 0.1 kg IS THE WHOLE OF WHAT THIS MODULE SPENDS AND AN EARLIER DRAFT
   HID IT. That draft wrote the shield down from 11 to 10.7 and called the
   closeout free, on the argument that it is folded from the shield's own
   sheet so no material is invented. Folding a new part out of the same
   alloy does not take mass off the panel it is not cut from, and the
   arithmetic is short enough to check. Plan areas by 1 mm slice integration
   of the built mesh, one method over both modules: the notch takes
   0.02155 m2 off the strike shield, which at 0.7 mm of Ti-6Al-4V and
   4,430 kg/m3 is 3.101 kg/m2 and so 0.067 kg, and 0.02443 m2 off the floor
   lid, which at 12 kg over its measured 3.7558 m2 of plan is 3.195 kg/m2
   and so 0.078 kg. The closeout adds 255.6 mm of plan line by 204.5 mm of
   developed section on each side, 0.1045 m2 of the same titanium, 0.324 kg.
   It also deletes 204 mm of the 35.5 by 8 mm pool retaining wall per side,
   and THAT is the one line in this ledger with no density behind it, which
   a review had to say out loud. The volume is exact, 0.204 by 0.0355 by
   0.008 twice over, 1.159e-4 m3. The polymer is not: nothing in this pack's
   lineage from battery-3 forward states one, and an earlier draft wrote
   0.034 kg there, which back-solves to 293 kg/m3 and is a foam rather than
   a molded wall standing in a boiling fluoroketone bath. At
   polypropylene's 900 kg/m3 it is 0.104 kg and at a glass-filled
   polyamide's 1,400 it is 0.162.

   So the pack's true delta is +0.075 kg on the light polymer and +0.017 on
   the dense one, against +0.145 if the deletion really were 0.034, and the
   DECLARED ledger does not move with any of them: the galleries line is
   5 kg to the kilogram and is not touched, so what is booked is lid 12 to
   11.9, shield 11 to 10.9 and closeout 0 to 0.3, which is +0.1 and 385.1.
   That is the CONSERVATIVE end of the band and it is worth naming which
   direction that is. Declaring the pack heavier than it may be costs range
   rather than granting it, 0.07 miles at 0.6738 miles per kilogram, so the
   rounding here loses miles instead of inventing them. A module that fudges
   a tenth to hold a round number is a module whose other numbers have to be
   checked one at a time, and the fudge that matters is the one pointing the
   other way. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'battery-10',
  name: 'Battery pack · Gen 10 notched corner',
  color: 0x4fc4d8,
  explode: [0, -1.15, 0],
  blurb: 'The pack that books nothing. 190 kWh, 385.1 kg, 810 V, five bricks, 210 layers: every energy number battery-7 published is carried to the digit, because the only lever this slot owns outright is pack energy and the only route left to it is a chemistry claim. What moves is geometry. Gen 9 bought 0.1136 m2 of frontal area by bringing the front track in to |z| 0.74 and sent the invoice here: the front tire, rim and disc were all inside this pack\'s outboard front corner, deepest 21.4 mm into the floor lid over 804 crossing triangle pairs. The corner is cut away to |z| 0.6550, whose 0.7 mm closeout stands 4.3 mm off the cell stack, and that is as far as any notch can go without spending layer width. It costs a strip of pool, a strip of strike shield and the outboard 15.7 mm of the front circulation lane, 0.1 kg of ledger, and no kilowatt-hours at all. The static corner is now clear by 10.73 mm surface to surface. What the notch does not buy is steering lock, and the closeout panel says how little by and whose the rest of it is.',
  interfaces: {
    /* The corner is one decision and two modules make it, so it is declared
       rather than described, per design/gen10.md hard point 3. The plane is
       the tire's inner sidewall and the two halves say opposite things about
       it: this pack must not pass it and the wheel must not come inboard of
       it, which is why the pack half carries extent max.

       THE NUMBER IS THE PARTNER'S AND IT IS 10.0 mm OFF THE PARTNER'S OWN
       GEOMETRY, which is worth writing down rather than smoothing over.
       wheels-10 declares this key at |z| 0.6625 with an 11 mm tolerance,
       and 0.6625 is wheels-9's sidewall, a 155 mm section on the 0.740
       center. wheels-10's BUILT sidewall measures 0.6725, because its
       section is 135. This module states the partner's number so the key
       agrees rather than inventing a third one, and it holds a clearance
       measured against the built face and not against either declaration:
       the closeout is at |z| 0.6550, which is 7.5 mm inside the declared
       plane and 17.5 mm inside the built tire AT THAT STATION. Neither of
       those is this corner's clearance: measured surface to surface over
       the whole corner the pack comes within 10.73 mm of the tire, on the
       lead-in chamfer and not on this face, and the closeout panel carries
       that with its coordinate. If the integrator reconciles the two
       declarations onto the built sidewall, this line moves to 0.6725 and
       the tolerance drops to 0.018 to keep the same realization window.

       THE TOLERANCE IS 10 mm AND IT IS DERIVED RATHER THAN CHOSEN, which is
       the one thing an earlier draft of this block got wrong. tol does three
       jobs in tools/interfaces.js: it is the realization window, the
       agreement window between declarers, and the slack on extent. On a
       CLEARANCE plane the first of those is perverse, because the checker
       asks for a vertex within tol of the plane and a pack that put one
       there would be touching the tire, so tol has to be at least the
       clearance the pack holds before the key can pass at all. That draft
       set it to 8 mm against a 7.5 mm clearance, half a millimeter of
       margin, which would have turned RED the first time a later rung cut
       the notch one millimeter deeper. 10 mm is wheels-10's own running
       clearance, the number its plane is derived with, and using it here
       makes extent max fire at 0.6625 plus 0.010, which is |z| 0.6725, which
       is wheels-10's BUILT inner sidewall to the digit. So the assertion
       reads: no vertex of this part may reach the tire. That is a physical
       threshold rather than an arbitrary one, and it covers the whole
       useful range of the notch face, 0.6525 to 0.6725, which is everything
       between the cell stack and the casing.

       The assertion doing the work is therefore extent max, which fails a
       lid, a shield or a pool wall that creeps back outboard, and the report
       line prints this part's built span so a reader sees the 0.6550 rather
       than having to trust the note.

       cornerclose is the part named because it is the only part in this
       pack whose whole geometry lives inboard of the plane. The lid's
       bonded perimeter land legitimately reaches |z| 0.744 two hundred
       millimeters aft of here and the shield's edge flange 0.720, so
       naming either would assert something false about geometry that is
       nowhere near this corner.

       AND THE PACK DOES CROSS THIS PLANE, 25 mm AFT OF THE CORNER, WHICH A
       VERTEX SWEEP WOULD NOT SHOW YOU. Not one vertex of this pack forward
       of x 1.080 sits outboard of |z| 0.6625. The SURFACE does: the lead-in
       chamfer runs from the full-width lid edge at x 1.080 down to the notch
       face, so it is outboard of the declared plane from x 1.080 to x 1.1016
       and reaches 0.6880 at x 1.090, 25.5 mm past it. Nothing is there. The
       front tire's aft-most vertex within the pack's own height band is
       x 1.1071, so the chamfer clears it by 5.5 mm in x and by 10.73 mm in
       three dimensions, and that 10.73 is the tightest surface separation
       anywhere on this corner. It is written into the declaration's note
       rather than left out of it, because a declaration that is true of the
       named part and false of the module is exactly the kind of half-truth
       tools/interfaces.js exists to stop. */
    'front-corner-pack-outboard': {
      kind: 'face', axis: 'z', at: 0.6625, tol: 0.010,
      part: 'cornerclose', mirrored: true, extent: 'max',
      note: 'front tire inner sidewall less wheels-10\'s 10.0 mm running clearance. This part stops at |z| 0.6550, 7.5 mm inside the plane, 17.5 mm inside the built tire and 4.3 mm off the cell stack. The lid chamfer aft of x 1.1016 is outboard of the plane and clear of the tire: see the note above.',
    },
  },
  parts: {
    bricks: {
      name: 'Bipolar stack bricks',
      tagline: 'Same chemistry, same 210 layers, same 478 Wh per liter of layer: every one of the extra 40 kWh is volume, and the pack refuses to call it anything else.',
      mass: 325,
      count: 5,
      specs: [
        ['Format', 'Brick, 420 x 164 x 1,300 mm; 42 bipolar layers each'],
        ['Chemistry', 'Anode-free Li metal / Li-rich Mn cathode, sulfide separator (unchanged from Gen 5)'],
        ['String', '210s, 810 V nominal, 630 to 861 V window (identical to Gen 5)'],
        ['Capacity', '235 Ah, 907 Wh per layer; 38 kWh per brick, 190 kWh total'],
        ['Energy density', '585 Wh/kg cell, 493.4 Wh/kg pack (Gen 5: 586 / 500)'],
        ['Maturity', 'Anode-free: pilot line. Full-pack bipolar: extrapolated'],
      ],
      how: 'Nothing in the electrochemistry moved. A bipolar plate is still one sheet of steel collecting the cathode in front of it and the anode behind it, the sulfide separator is still 20 µm, the string is still 210 layers deep because hv-4 still has exactly one conversion front end and its input silicon is still qualified for 300 to 870 V. Charge 210 layers to 4.10 V and the string tops out at 861, nine volts under that ceiling, which is the same arithmetic battery-6 ran and the same reason it stops short of the cell\'s own 4.20. What changed is the size of a layer. The face grows from 135 x 1,300 mm to 164 x 1,300, and the layer itself thickens from 8.5 to 8.9 mm inside an unchanged 10.0 mm pitch, so the inter-layer gap closes from 1.5 mm to 1.1. Multiply those out and one layer goes from 1.492 to 1.897 liters. The energy density of that liter is unchanged: 478 Wh, exactly what battery-6 achieved, because the cathode formulation, the loading and the separator are the same parts. 210 layers at 907 Wh is 190 kWh, and 585 Wh/kg at the cell is 586 rounded down. Pack-level density goes the wrong way, 500 Wh/kg down to 493.4, because the strike shield, the larger galleries and now the corner closeout store nothing; volumetric density goes up, 241 Wh/L of structural envelope to 269, measured pan underside to lid top over the lid plan on both packs, which is 3.664 m2 by 0.170 m on battery-6 and 3.609 by 0.1965 here. This module claims no chemistry progress at all, and the reason to be blunt about that is that a range generation is the easiest place on this ladder to smuggle one in.\n\nThe 29 mm of extra height is the whole story and it was found in body-7 rather than invented, by measuring its meshes rather than reading its prose. Its venturi closeouts are 12 mm carbon plates whose underside sits at y 0.106, forward of the pack at x 1.32 to 2.10 and behind it at x -1.935 to -1.315, and its floor strakes hang 3.5 mm lower again with their underside at y 0.1025. battery-6\'s pan underside sits at y 0.132. The pack has therefore been a 26 mm recess in the middle of a flat floor since battery-3 set that envelope, with a rearward-facing step at its leading edge and a forward-facing one at its trailing edge. This pack takes its lowest surface down to y 0.1025, exactly level with body-7\'s strakes, which leaves 3.5 mm of step at each end instead of 26 and gives the stack 29.5 mm of floor. Ground clearance genuinely does not change, because the strakes were already the lowest thing on the underbody and the shield now sits in their plane rather than below it. What changes is that 3.5 m2 of pack floor lives at the strike plane instead of 26 mm above it, which is why the strike shield exists and why it is 11 kg. The gaps supply the rest: taking 0.4 mm out of each of 210 inter-layer channels puts 4.7 percent more layer volume in the same brick length, and it is available only because drivetrain-7 asks for 260 kW where drivetrain-6 asked for 480. That trade is paid for on the cooling side and the number is on the galleries part.\n\nWhat Gen 10 changes here is nothing, and the reason to say so on the panel that holds the energy is that this is the part a reader will suspect. The layer face is still 164 by 1,300 mm, so the stack\'s outboard faces are still |z| 0.6500. Swept per vertex over battery-7 and this part by one script: battery-7 puts 36,677 of 36,731 vertices at or inside that plane and this part 36,875 of 36,947, and both put the same 9,680 of them, 26.4 and 26.2 percent, on the plane to within a micron. The tolerance matters and gen10.md did not state one: at a nanometer the count is zero on both, because 0.65 in float32 is 0.6499999761581421 and every one of those vertices is 24 nanometers short of it. The notch face stops 5.0 mm outboard of the layer face and its closeout\'s inner face 4.3, and it takes no layer width, so the 190 kWh is arithmetically the same 190 kWh. The 43 vertices this part used to put outboard of the front tire, 0.117 percent of the sweep, were never cells: they are one TubeGeometry, the string take-off cable, which battery-7\'s own notes record as dead-ending in air at (1.245, 0.2845, 0.706) because the rail raceway it is described as feeding stops at x 1.080. It now runs inboard of the notch the whole way and lands on the raceway jacket\'s inner face at |z| 0.7075, on the axis at (1.060, 0.2775, 0.7060), which closes a two-generation-old defect and removes the pack\'s last geometry outboard of the tire plane in one edit. Where it lands is set by the rail\'s bond bead rather than by the raceway: the bead ends at x 1.050, so the landing sits on the 30 mm of jacket forward of that and clears the bead by 2.30 mm rather than driving into it. It is on the passenger side only because there is one take-off and one raceway, which is the answer to why the driver side does without.',
      why: 'The energy is not free and here is the whole ledger in miles. At the generation\'s 105 Wh/mi this pack returns 190,000 / 105 = 1,809 miles. Its 85 kg then has to be charged back. Rolling resistance costs Crr x g x 1,609 m per kilogram per mile, which at wheels-7\'s target Crr of 0.0038 is 60.0 J or 0.0167 Wh per kg per mile, so 85 kg adds 1.42 Wh/mi at steady cruise. The same car carrying battery-6 instead, 300 kg and 150 kWh, therefore consumes 103.58 Wh/mi and covers 150,000 / 103.58 = 1,448 miles. The net contribution of this module is 1,809 minus 1,448, which is 361 miles. Had the mass been free it would have been 386, so the feedback ate 25 miles, 6.4 percent of the gross gain. On a stop-start cycle the unrecovered kinetic term adds roughly 0.0153 Wh per kg per mile on top, the feedback doubles to 2.7 Wh/mi, and the net falls to about 343 miles; at Gen 3\'s Crr of 0.0050 rather than wheels-7\'s target it is 355, so the conclusion survives either tire. What that arithmetic does not show is a self-limit, and the brief expected one. A kilogram anywhere on this car costs 0.29 miles and a kilowatt-hour adds 9.5, so any subsystem carrying more than 30 Wh/kg still pays; this pack\'s marginal rate is 40 kWh for 85 kg, which is 470 Wh/kg, fifteen times break-even. Mass would only stop the energy lever at a range near 28,000 miles. The real ceiling is the envelope, and that is why this part spends two paragraphs on 29 mm of floor and why it declined the boat-tail cavity: about 0.3 m3 sits between body-7\'s diffuser hinge at x -1.938 and its Kamm face at x -2.675, enough for another 40 kWh, but body-7\'s rear casting occupies x -1.600 to -2.295, so the forward two thirds of that cavity is inside crash structure certified on the Gen 1 pulse and the rest is behind it. The centroid sits at x -2.31, which is 857 mm aft of the rear axle: 85 kg there takes 85 x 0.857 / 2.90 = 25 kg off the front axle, and at 2.31 m from mid-wheelbase it adds 85 x 2.31 squared, about 450 kg·m2, of yaw inertia to a 5.06 m car. Cells behind a crash structure are not a tradeoff, they are a mistake.',
      fail: [
        'Every anode-free failure mode carries over from Gen 2 and Gen 3 unchanged, and one gets worse: plating goes filamentary at low temperature and high current, and this pack\'s layer is 21 percent taller, so the current map has a longer edge-to-center spreading path across the bipolar plate and the corner cells reach the plating limit before the middle ones do. The fast-charge floor stays at 15 °C and the charge ceiling drops, which is on the specs above rather than hidden here.',
        'Full-pack bipolar remains the extrapolated claim and the bar rose with the face: 20 µm sulfide sheets now have to be pinhole-free across 0.213 m2 rather than 0.176, and coulombic efficiency still has to hold 99.99% for the life of a string with no lithium reserve. Defect probability goes with area, so a larger pinhole-free sheet is a harder physical problem than the same one scaled up, not an identical one repeated.',
        'The replaceable unit grew from a 30 kWh brick to a 38 kWh one, and a single failed layer still opens the only string. Losing one brick is now a fifth of a 190 kWh pack and roughly 360 miles of range, which is the honest size of the no-parallel-paths bet at this scale.',
      ],
      explode: [0, 0.34, 0],
    },
    bands: {
      name: 'Preload band sets',
      tagline: 'A taller brick breathes further and presses harder: 64 kN per brick against battery-6\'s 53, on the same wound carbon hoops.',
      mass: 6,
      count: 15,
      specs: [
        ['Preload', '0.3 MPa on every layer face (unchanged since Gen 3)'],
        ['Tension', '64 kN per brick; ~10.7 kN per band leg (Gen 5: 53 / 8.8)'],
        ['Band', 'Filament-wound CFRP hoop, 26 x 2 mm section (Gen 5: 22 x 2)'],
        ['Compliance', 'Disc-spring corner rockers, force within ±8%'],
        ['Breathing absorbed', '22.5 mm per brick, empty to full (Gen 5: 21)'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'The requirement has not moved since Gen 3 and will not: a solid electrolyte conducts only where it is pressed, lithium strips unevenly on every discharge, and voids concentrate the next charge into fewer contact points, which is how dendrites start. 0.3 MPa on every face, forever. What moves is the load, because pressure times area is force and the area grew. 0.3 MPa across a 0.213 m2 face is 64 kN per brick where battery-6 needed 53, so the hoop section goes from 22 x 2 mm to 26 x 2 and each of the six legs carries 10.7 kN instead of 8.8. That is still under 15 percent of band strength, the region where carbon fiber effectively does not creep, and the corner rockers are the Gen 2 disc-spring idea in its third form.\n\nBreathing scales with capacity, not with height, and it is worth doing the arithmetic rather than assuming. 235 Ah moves 61 grams of lithium per layer instead of 48; spread over a face that grew in proportion, the plated thickness is 0.536 mm against battery-6\'s 0.512, so a 42-layer brick travels 22.5 mm from empty to full instead of 21. The brick is still the mechanical quantum for the same reason: 42 layers is where pressure uniformity and breathing stay controllable, and a monolithic 210-layer stack would now move 113 mm. The bands close the same structural loop they closed in Gen 5, bonded between the rocker rails and the floor-lid so the brick field is the shear web of the floor, and that web only works because its laminations cannot slide.',
      why: 'Six kilograms against battery-6\'s four is 50 percent more band for 27 percent more brick and 21 percent more preload force, so this part got heavier per unit of energy it helps carry, and the direction is worth printing because it is the wrong one. The section had to grow with the force, the hoop had to grow with the brick, and the two compound. The other honest note is what the extra tension does to the failure margin rather than to the mass: at 10.7 kN a leg the hoops sit closer to the stress-rupture knee than battery-6\'s did, so the strain-bridge trend on the sensing film is doing more work than it used to, and the inspection interval it implies is shorter.',
      fail: [
        'Band stress-rupture is the slow failure and this pack loads it harder. Every hoop carries a strain bridge, and a relaxing hoop re-runs the Gen 2 story: voids, rising impedance, an EIS flag weeks ahead of a short.',
        'A shifted corner rocker tilts the pressure field, and a taller brick tilts further for the same shift because the moment arm grew. The low-pressure edge ages fastest, and the film\'s strain grid is the only thing that reads it in service.',
      ],
      explode: [0, 0.18, 0],
    },
    rockerrails: {
      name: 'Rocker bond rails',
      tagline: 'Same 19 kg, 26 mm taller, thinner walls: a deeper section is a stiffer one, and the pack floor dropped so the rail had to follow it down.',
      mass: 19,
      count: 2,
      specs: [
        ['Material', '7003-T6 extrusion, 3 chambers (carried from Gen 3)'],
        ['Section', '196 x 60 mm, walls 2.7 mm (Gen 5: 170 x 60 at 3.2)'],
        ['Bond', 'Toughened epoxy, 3 mm bondline, + 28 flow-drill screws per side'],
        ['Crush budget', '68 mm before the first end plate (Gen 5: 60)'],
        ['Length', 'x -1.06 to 1.08, shortened 20 mm for wheels-7\'s rear corner'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The concept is battery-3\'s, carried for the third time: a three-chamber extrusion bonded to the body rocker on its outer face and to the brick ends on its inner face, so a side pole runs rocker, rail, brick stack, rail, rocker with no tray in between. The rail follows the pack floor down from y 0.130 to 0.1035 and its section grows 170 to 196 mm, and it does that without gaining mass because section modulus goes with the square of depth: the walls thin from 3.2 to 2.7 mm and the rail is stiffer and crushes further than the one it replaces, 68 mm of controlled collapse against 60. The 40 mm intrusion budget body-7\'s rockers quote is a contract with this part, and it now has more room to honor it.\n\nThe rail also got shorter, and that is the rear track sending its first bill. The gen7 contract puts the rear motor annulus flange at |z| 0.65 against Gen 3\'s 0.72, and wheels-7 as built lands its rear tire inner face at |z| 0.6625; sweeping every vertex of that tire through suspension-4\'s ±3 degrees of rear steer takes it 16.5 mm further in, to |z| 0.646, and moves its leading edge to x -1.0908. The rail used to run to x -1.08, 15 mm clear of the old tire. It now stops at -1.06, 31 mm clear of the swept new one, and everything else in the rear of this pack narrows for the same reason. The 810 V raceway laminated into the passenger-side rail carries over unchanged, because the string voltage did not move; the conductor sees less current than it did in Gen 5, 321 A at drivetrain-7\'s peak against 593 at drivetrain-6\'s, and it was not resized, which is a deliberate carry rather than an oversight.',
      why: 'This part is the pack\'s seatbelt and it is sized by a pole test, not by a range target, so a generation optimizing miles is exactly the generation that should be suspicious of touching it. What it did instead was follow the floor down and take the free stiffness that a deeper section hands over, and hold the crash geometry otherwise identical, so the side-impact argument battery-3 made is still the argument and not a new one that needs proving.',
      fail: [
        'An abraded raceway laminate puts 861 V one insulation layer from body ground, carried from Gen 3 and Gen 5 unchanged; the isolation monitor watches this seam first.',
        'Thinner walls buy stiffness and spend dent resistance. A 2.7 mm chamber wall is more easily damaged by a jack pad in the wrong place than a 3.2 mm one, and the jacking points are now a hard instruction rather than a suggestion.',
        'A side pole that bottoms all three chambers puts end plates and layers into the load path, and the repair boundary after such a hit is the body shell rather than the pack, the line battery-3 drew and this module has no reason to move.',
      ],
      explode: [0, 0.06, 0.55],
    },
    floorlid: {
      name: 'Floor-lid',
      tagline: 'Both ends of this panel are now cut by a wheel. wheels-7 took the rear corners at Gen 7; the Gen 10 notch takes the front ones, and it is the deeper cut of the two.',
      mass: 11.9,
      specs: [
        ['Material', 'CFRP skins on 14 mm aramid honeycomb (carried from Gen 5)'],
        ['Plan', '1.42 m wide from x -1.00 to 1.080, notched to 1.310 m forward of x 1.105, 1.188 m forward of x 1.268; 1.23 m aft of x -1.00'],
        ['Attachment', 'Bonded perimeter + brick-top adhesive; structural'],
        ['Thermal duty', 'Insulating ceiling of the vapor space'],
        ['Service access', 'One bolted hatch, cover face y 0.3070 at (-1.13, 0.38), hv-4 interface'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Four jobs, all carried from battery-6: pressure and moisture boundary of the pack, the surface the cabin carpet bonds to, the upper skin of the floor torsion box bonded to the rails and to every brick top, and the insulating ceiling over a 49 to 68 °C vapor space. The honeycomb core is what makes the last one work, because skin-to-skin conductance is two orders below the aluminum panel battery-3 used, and the carpet side stays near cabin temperature at full boil. Seat loads still pass through potted inserts into the brick tops beneath. The panel did not need to change for a taller pack, because a lid is loaded in bending and shear and neither of those cares how deep the box below it is. The bonded perimeter is where the sandwich stops being a sandwich: the core tapers out and the two skins close down onto a solid laminate land that lies on the rocker rail top at y 0.2995 and runs to |z| 0.744, which is the joint the second line of the attachment spec has always described.\n\nWhat changed is the plan view, and it is the clearest place on this pack to see what the aero lever costs. wheels-7 moves the rear wheel centers to |z| 0.74 and the annulus flange to 0.65, and the swept rear tire reaches |z| 0.646 at its innermost. The lid therefore runs full width to x -1.00 and then steps in to 1.23 m for its last 290 mm, losing two corners of about 0.028 m2 each. That waist was cut to |z| 0.615 from the contract flange before wheels-7 existed, and the built tire turned out to be 12.5 mm further out than the contract implied, so the lid now clears the swept tire by 31 mm where 14 would have done. Nothing in that corner stores energy, so the surplus is packaging margin rather than lost range, and it is left in place rather than re-cut because the next tire is the one that will use it. The service hatch is unaffected and unmoved, because hv-4\'s pack feed leaves it at (-1.13, 0.315, 0.38) and that coordinate is an interface, not a preference. The two burst discs stay rear-facing on the rear wall at x -1.29, inside the new waist.\n\nThe front corners go at gen 10 and this panel is where the bill lands. Sliced station by station off the built mesh, this skin was the pack\'s outboard surface at |z| 0.7100 from x 1.090 all the way to x 1.240, and wheels-9\'s front tire put its inner sidewall at 0.6625 over the same band: 47.5 mm of solid overlap, 564 crossing triangle pairs, 21.4 mm on the plane-straddle convention tools/check-interfaces.sh publishes. The rim added 72 pairs at 17.4 mm and the disc 168 at 15.3. The panel is now built from a plan outline rather than a rounded rectangle, and the outline carries the notch: full width to x 1.080, a lead-in chamfer to |z| 0.6550 by x 1.105, that face held to x 1.250, then a second chamfer to |z| 0.5940 by x 1.268 and flat to the front edge at 1.290. The first step clears the tire. The second clears the brake disc, whose inner face is |z| 0.6040 and which reaches this skin\'s own height from x 1.2754 forward, and which is the reason a single plane would not have done it. Both clearances are published two ways because they differ: the notch face and the disc face are 10.0 mm apart as planes and 10.00 mm apart surface to surface, and the ramp between the two steps was moved from x 1.272 to 1.268 when the surface figure came back at 7.04 mm against a plane figure of 10.0. The plan area this costs is 0.02443 m2 of sandwich across the two corners, measured by integrating the exact plane slice of the built skin at 1 mm stations over battery-7 and this module, and at 12 kg over this panel\'s measured 3.7558 m2 of plan that is 3.195 kg/m2 and 0.078 kg, which takes this line from 12 to 11.9. It stores nothing: the fifth brick ends at x 1.249 and the corner it stood over was lid, pool and shield.',
      why: 'A lid that did not need redesigning did not get redesigned, and the interesting content is the shape of what was taken away rather than the panel itself. The narrowed rear track is the precondition for body-7\'s tail closing harder, which is the second-largest lever in this generation, and the pack is one of the parts that pays for it. Naming that cost in square meters of floor panel is more useful than absorbing it quietly, because the next generation will want to know whether narrowing the track further is still nearly free in packaging terms, and this is the part where it stops being free.',
      fail: [
        'Brick-top bond degradation under vapor-space thermal cycling softens the torsion box quietly, carried from Gen 3 and Gen 5; the film strain grid lives on the underside of that joint.',
        'The waisted rear corners put a re-entrant step into a bonded perimeter, and a step is a stress raiser: the corner radius there is 40 mm rather than the 50 the rest of the panel uses, and it is the first place to inspect after any rear impact.',
        'A lid breach is still two faults at once, a moisture path to a sulfide chemistry that makes H2S from water and a vapor leak that drops gallery pressure; the humidity and pressure telltales bracket it from both sides.',
        'The front notch puts two more re-entrant corners into the same bonded perimeter, and the front pair is sharper than the rear one: the lead-in turns 65.6 degrees in plan against the rear waist\'s 47, and it sits at the corner a side pole loads first. The corner radius there is 25 mm rather than the waist\'s 40, because the notch face is only 200 mm long and a 40 mm radius would eat a fifth of it. That is the least comfortable number in this module and it is a stress raiser on the panel that carries the seats.',
      ],
      explode: [0, 0.78, 0],
    },
    galleries: {
      name: 'Two-phase fluid galleries',
      tagline: 'Where the C-rate actually went: the inter-layer gap closed to 1.1 mm, the boiling channel got confined, and 25 kW of heat authority became 15.',
      mass: 5,
      specs: [
        ['Concept', 'Pool-boiling immersion; 14 mm pool, inter-layer gaps as channels'],
        ['Fluid', 'C6 fluoroketone, ~12 L in pack; ~19 kg on thermal-7\'s ledger'],
        ['Channel gap', '1.1 mm over a 164 mm rise (Gen 5: 1.5 mm over 135)'],
        ['Confinement', 'Gap / capillary length 1.4 against 1.9; CHF ~60% of unconfined'],
        ['Design heat load', '15 kW at the 430 A charge ceiling (Gen 5: 25 at 630)'],
        ['Circulation lane', '20.0 mm of open pool outboard of the stack, 4.3 mm over the notch'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'The mechanism is battery-6\'s and it is still the reason this pack can be cooled at all: a wetted surface crossing the fluid\'s saturation point makes vapor, and the latent heat it spends is 88 kJ per kilogram against the 1 or 2 kJ per kilogram-kelvin a single-phase bath moves sensibly. Thermal-7 sets the saturation temperature by owning the gallery pressure, 1.0 bar for 49 °C and 1.8 bar for 68, so a pressure regulator is the thermostat and there are no moving parts inside the envelope. The circuit is the same shape: condensate arrives at the liquid feed, spreads into the pool the bricks stand in, boiling lifts vapor up the inter-brick risers, two headers collect it and hand it back. One coordinate moved and thermal-7 had to follow it. The vapor stub stays exactly at (1.272, 0.268, -0.10), which is where thermal-7 already reaches, its riser flange spanning x 1.296 to 1.308 against this stub\'s 1.297. The liquid feed drops 29 mm, from battery-6\'s built stub at (1.272, 0.147, 0.10) to (1.272, 0.118, 0.10), because the pack floor did. Note that battery-6\'s own text names that stub 0.150 and its geometry puts it at 0.147, which is why this move is 29 mm and not the 32 the prose would have given; interfaces are measured here, not read. This module held the coordinate its pool floor demands and reported the joint rather than editing a partner, and thermal-7 has since dropped its condensate return flange to y 0.118 and gained 10.4 kPa of receiver head doing it. Both joints now close on built geometry.\n\nOne number between these two modules is still open and it belongs on this panel rather than in an integration note. The pool holds about 12 liters, roughly 19 kg, of fluoroketone, and this module books that mass on thermal-7 because thermal-7 owns the fluid. thermal-7 has landed and says that pushes it to 63 kg against a 52 kg target, and offers three ways out: a shallower pool, the fluid moving onto this ledger where the pool physically is, or a mass target that admits what two-phase cooling costs. This pack cannot absorb 19 kg without breaking its own 385, and a shallower pool makes the slosh entry below worse, so the choice is an integration decision and neither module should make it alone. What both can do is refuse to double-count it, and neither does.\n\nThe honest content of this part is the number that got worse. C6 fluoroketone at 49 °C has a capillary length near 0.8 mm, and a boiling channel stops behaving like open pool boiling when its gap approaches that: bubbles bridge the wall spacing instead of departing, vapor slugs form, and the surface periodically dries. Battery-6 ran a 1.5 mm gap over a 135 mm rise, a gap-to-capillary ratio near 1.9 and comfortably unconfined. This pack spent 0.4 mm of that gap on cathode, so the gap is 1.1 mm and the rise is 164, the ratio is 1.4, and there is 21 percent more channel for the vapor to climb. Confined-channel critical heat flux in that regime runs roughly 60 percent of the unconfined value, so the design heat load falls from 25 kW to 15 even though the string resistance improved from 63 to 54 mΩ. Put in the usual units, battery-6 was a 3.2 C pack, 480 kW over 150 kWh, and this is a 1.4 C one, 260 kW over 190, with the charge rate falling from 3.4 C to 1.8. That is what a lower power-to-energy ratio means physically. It is not a marketing decision to rate the pack softer, it is that the geometry which bought the energy took the cooling headroom, and the ceiling it sets is on the disconnect part in amps.\n\nWhat the gen 10 notch costs this part, and it is the second real price of the corner after side-impact. Three things here were outboard of the front tire and all three move. The pool retaining wall ran to |z| 0.686 and to x 1.284, so 204 mm of it was inside the wheel; over the notch it is deleted and the corner closeout does its job, which is why that part is bonded rather than bolted at its foot. The front wall stays and is now three boxes instead of one, because the closeout\'s bottom lap is bonded to the same pan top the wall stands on: a main span to |z| 0.5820 on the pan and two 11.3 mm ends standing 0.7 mm higher on the lap, reaching the closeout\'s inner face at 0.5933. Drawn as one box it went through the lap by 5.09 mm over three triangle pairs, and no tool in this project tests two parts of one module against each other, so it was swept by hand. The pool\'s retaining boundary kept battery-6\'s |z| 0.670 plan and is now the closeout\'s inner face at 0.6543, with the fluid plan standing 1.5 mm off it at 0.6528 the way battery-6 and battery-7 stood theirs 12 mm off a molded wall. So the open circulation lane outboard of the cell stack, the lane the condensate spreads along and the level probe reads, narrows from 20.0 mm to 4.3 mm of geometry and 2.8 mm of drawn fluid, over 163 mm of the fifth brick\'s 420 mm length on each side. The stack\'s own face is still wetted, because 0.6543 is outboard of the layer face at 0.6500, and the inter-layer channels are still fed along their whole 1,300 mm width from the pool under the brick, so no channel loses its feed. What is lost is lateral make-up flow at the one corner where the pool is shallowest under lateral g, and the honest consequence is that the slosh case on the fail list below gets worse at the front outboard corner specifically rather than everywhere. Third, the vapor header ran straight to x 1.190 at |z| 0.665, and battery-7\'s own notes already said every point on it forward of x 1.099 was inside the tire. The straight run now stops at x 1.045, its riser reaching 1.0555, and the crossover duct it hands to spans x 1.002 to 1.078, so the header is inboard of the notch for its whole length and it is also aft of the closeout, whose lap begins at 1.080. The take-off count is unchanged at five per side. Pool volume falls 0.06 percent, which is inside the 12 liter figure\'s own rounding and is not a fluid-mass change on thermal-9\'s ledger.',
      why: 'Five kilograms of dry plumbing rated for 15 kW is worse authority per kilogram than battery-6\'s 3 kg rated for 25, and printing that comparison the right way round matters more here than anywhere else on this pack. Every other line in this module improved. This one paid, and it paid deliberately: at cruise the string dissipates about 4 watts of ohmic loss, so the boiling ceiling is irrelevant for the entire duration of a record run and only appears at the charger. Spending peak cooling to buy energy is the correct trade for a range car and the wrong one for almost any other, which is exactly the sort of statement this generation exists to make out loud.',
      fail: [
        'Dryout is closer than it was. The design point sits near 60 percent of a critical heat flux that is itself 60 percent of battery-6\'s, so the margin fell by roughly a third, and the acoustic channels listening for the boiling-signature shift went from a nice-to-have to the primary protection during fast charge.',
        'A confined channel dries from the top, because vapor quality rises with height and the last millimeters of a 164 mm channel see the most vapor. The RTD sentinels moved to the layer tops accordingly, and any new dry-corner logic has to be validated there rather than at the pool line.',
        'The pool is 14 mm deep and the floor dropped 29 mm without deepening it much, so a long grade or sustained lateral g still shifts it and an uncovered brick base still loses nucleation exactly when regen is loading the string. The floor ribs remain the baffles and the derate ladder still trips on the sentinels.',
        'The notch makes that slosh case worse in one specific place and better nowhere. Sustained lateral g pushes the pool to the loaded side, and at the front outboard corner the lane it has to climb into is now 4.3 mm wide instead of 20.0 over 163 mm of the fifth brick. The corner closeout is a wall the fluid can bear against, which helps the level, and the narrowed lane is a restriction to make-up flow, which does not. Nothing in this module measures which wins, so the honest statement is that the front outboard corner is now the first place to instrument for it, and the top-of-channel RTDs over brick five are what would see it.',
      ],
      explode: [0, -0.35, 0],
    },
    sensefilm: {
      name: 'Cell-edge sensing film',
      tagline: 'The Gen 3 wallpaper again, with its temperature grid moved up the channel to where a confined boiler actually dries out.',
      mass: 3,
      specs: [
        ['Construction', 'Printed polyimide laminate across all five brick tops'],
        ['Voltage taps', '210, one per layer (unchanged from Gen 5)'],
        ['Temperature', '340 printed RTD points, 210 of them at channel top'],
        ['Strain', '30 bridges on band hoops and bond lines'],
        ['Acoustics', '20 piezo channels watching boiling regime (Gen 5: 12)'],
        ['Maturity', 'Pilot line (lineage: Gen 3, Gen 5)'],
      ],
      how: 'The observability problem is battery-3\'s and unchanged: 41 of every 42 layers in a bipolar brick have no external terminal, so each brick laminates tap foils from its internal plates to its top edge and this film lands on all 210 as it rolls across the field. The playbook carries over whole, weekly EIS sweeps at rest, mid-frequency impedance rise as the weeks-early dendrite flag, and electrical and mechanical witnesses cross-checking so a lying sensor is caught by a disagreeing neighbor. What this pack adds is density where its new failure mode lives. Battery-6 spent 260 RTD points on a field cooled by an unconfined pool; this pack has one RTD per layer at the top of its boiling channel, because a confined channel dries from the top down and an average brick temperature is exactly the wrong measurement for that.\n\nThe acoustic set grew from 12 channels to 20 for the same reason and it is now doing primary work rather than secondary. Nucleate boiling has a broadband crackle whose spectrum shifts as vapor generation climbs toward departure, and in a 1.1 mm channel that shift arrives before any temperature does, because the wall is still wetted intermittently while the mean temperature looks fine. The film hears the transition, the top-of-channel RTDs confirm it, and the disconnect derates the charge current. Three witnesses for one failure is the same architecture Gen 3 argued for, aimed at the one thing this generation made worse.',
      why: 'A pack with no parallel paths, no service access and a structural duty gets exactly one protection layer, which is foresight, and the sensing has to be as distributed as the risk. The risk moved this generation: the electrical margins got better, the thermal margin got worse, and a sensor set that had not followed that shift would have been measuring the last generation\'s pack. One kilogram of extra film is the lightest addition in this module and it is buying the thing the module made most fragile.',
      fail: [
        'The film bonds under the floor-lid, so a recycling debond destroys it by design and a mid-life panel cut almost certainly tears it, carried from Gen 3 with a larger nervous system at stake.',
        'Printed RTDs drift as the substrate ages, and 340 of them drift at 340 different rates; the EIS trace remains the independent witness and a thermally plausible but impedance-inconsistent reading flags the sensor rather than the cell.',
        'The acoustic channels are cleanest when the car is still, and confined-channel dryout is a charging failure rather than a driving one, which is convenient rather than designed: the classifier runs wide guard bands on the move and leans on the top-of-channel RTDs there.',
      ],
      explode: [0, 0.55, 0],
    },
    disconnect: {
      name: 'Semiconductor disconnect',
      tagline: 'Carried a third time and deliberately not shrunk: the current fell by half, the voltage class did not, and short-circuit withstand sets the die.',
      mass: 4,
      specs: [
        ['Switch', 'Back-to-back SiC banks, 1,200 V class (lineage: Gen 2, 3, 5)'],
        ['On-resistance', '0.9 mΩ; 93 W at drivetrain-7\'s 321 A peak (Gen 5: 315 W)'],
        ['DC charge ceiling', '430 A, 348 kW at 810 V (Gen 5: 630 A, 510 kW)'],
        ['Turn-off', '< 10 µs'],
        ['Backup', 'Pyro fuse + manual service disconnect, under the hatch'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The device is battery-6\'s, and carrying it unchanged when the duty halved is the decision worth explaining. Drivetrain-7 peaks at 260 kW, which is 321 A at 810 V nominal, against drivetrain-6\'s 480 kW and 593 A, so conduction loss falls from 315 W to 93 and the obvious move is to shrink the silicon. It was not shrunk, for two reasons that have nothing to do with nominal current. The string still charges to 861 V, so the die is still 1,200 V class with inductive margin. And the die area of a disconnect is set by what it survives, not what it carries: a bolted short still has to be cut in under 10 µs before busbar inductance lets the fault climb past roughly 1,500 A, and that number is a property of the pack, not of the motor. A smaller switch would have saved perhaps a kilogram and made the one component whose job is to end every other component\'s bad day into the marginal one.\n\nThe charge ceiling is this part\'s honest number and it is a real loss. hv-4\'s port geometry and its own spec carry 630 A of DC pin capability, and battery-6 used all of it: 510 kW at 810 V. This pack stops at 430 A, because 430 A through a 54 mΩ string is 10 kW of ohmic heat and roughly 15 with polarization, which is precisely the confined-channel ceiling the galleries part derives. 348 kW instead of 510. In practice, 500 miles is 52.5 kWh at this car\'s 105 Wh/mi, so it takes 9 minutes to add rather than 6. A 10 to 80 percent fill is 133 kWh, about 23 minutes at the ceiling and nearer 25 with taper, against about 16 if this pack could still take 510 kW and about 13 for battery-6\'s smaller 105 kWh fill at that rate. A 190 kWh pack fills slowly in absolute terms even before its C-rate drops, and both effects point the same way. The hand-off choreography with hv-4 is unchanged: the 48 V ring boots the computers, the computers check isolation, then this switch ramps the string onto the bus, and its pack feed leaves the hatch at (-1.13, 0.315, 0.38).',
      why: 'Two hundred amps of hv-4\'s charging capability are now stranded, and that is the shape of the whole generation in one line: a car optimized for one number gives up capability that a different car would have used. It is worth saying that the stranded capability is in the fastest-changing part of the system, so a later pack with a better boiling channel could take it back without touching hv-4 or the port. The pack is the limit here, not the infrastructure, and that is the correct place for a limit to sit.',
      fail: [
        'Fails short, not open, carried and unchanged since Gen 2: an unclearable fault escalates to the pyro fuse, which is not resettable, an hour at the hatch to replace.',
        'The cold plate shares the gallery liquid, so a drained gallery takes disconnect cooling with it; die temperature sits ahead of pool level in the trip chain, carried from Gen 3 for exactly this case.',
        'The 430 A ceiling is enforced in firmware against a thermal model, not by a fuse, so a model that is wrong in the optimistic direction is a dryout event rather than a nuisance trip. The acoustic and top-of-channel witnesses are what stop that, and they are the reason the ceiling is stated as a derived number rather than a datasheet one.',
      ],
      explode: [0, 0.5, 0.3],
    },
    strikeshield: {
      name: 'Underfloor strike shield',
      tagline: 'The bill for 29 mm of floor: 3.5 square meters of pack now sits at the strike plane, so it wears titanium.',
      mass: 10.9,
      specs: [
        ['Material', '0.7 mm Ti-6Al-4V sheet, folded edge flanges, 26 flush fasteners'],
        ['Coverage', 'x -1.29 to 1.30, 3.508 m2 after the Gen 10 notch takes 0.02155, underside y 0.1025'],
        ['Rated', '2.5 kJ blunt strike, road debris at 110 km/h with no standoff'],
        ['Aero', 'Two 26 mm underbody steps become 3.5 mm; ~2 counts, not audited'],
        ['Ancestor', 'None: battery-3 through battery-6 had no shield'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Dropping the pack floor from y 0.132 to 0.1025 does not lower the car. Body-7\'s floor strakes were already at 0.1025 and its venturi closeouts at 0.106, so this shield lands in the plane of the lowest underbody surface the car already had, and ground clearance is unchanged to the millimeter. The change is entirely one of exposure: road debris that used to pass 26 mm under a recessed pan now meets a working surface. The shield is what that costs. Titanium rather than aluminum because the failure mode is a point strike rather than a distributed load, and Ti-6Al-4V holds roughly three times the specific yield of a 6000-series sheet in the thickness where a skid plate lives. At 4,430 kg/m3, 0.7 mm is 3.10 kg per square meter, and the shield covers 3.53 m2 once the waisted rear panel is counted, so the sheet is 10.9 kg and the 26 flush fasteners take the part to 11. The edge flanges are folded from the same sheet rather than added to it, which is why they are not a separate line in that sum. They bolt up to the rocker bond rails at |z| 0.72, the only structure along the pack sides stiff enough to take a strike load into the body rather than into the pan, and they overlap the shield skin inboard so the panel hangs off structure at both edges instead of off the pan. The fasteners are countersunk into the 3.5 mm shield stack and sit inside its thickness, because a bolt head standing proud into the boundary layer on a car that just spent a generation on drag would be an unforced error. The skin is not flat either, and it cannot be: 0.7 mm of sheet spanning 1.2 meters between edge flanges drums. Five stiffening beads 45 mm wide and 2 mm deep run the length of the panel and two more form the fastener lands, and every one of them is pressed up into the 3.5 mm stack rather than down into the airstream, so the lowest surface on the car is still an unbroken land at y 0.1025. The 26 heads sit in the two lands with their faces at y 0.10295, which is 0.45 mm above the surrounding skin and 1.55 mm inside the stack: flush in the sense that matters aerodynamically, and visible from underneath, which a head buried inside a plate is not.\n\nWhat the flatter floor gives back is an aero item, and it is deliberately not claimed in this generation\'s efficiency model. Two full-width 26 mm steps, one rearward-facing at x 1.32 and one forward-facing at x -1.315, are the kind of feature a venturi floor is most sensitive to, and cutting them to 3.5 mm should be worth something like 2 counts on body-7\'s audited Cd of 0.118, which is about 1.0 Wh/mi at 65 mph and 18 miles of range. The word should is doing real work in that sentence, and so is the 3.5 mm that stays: the step is reduced, not deleted, because the strake plane and the closeout plane are not the same plane. Body-7\'s 0.118 came from an independent audit that did not model either step, so this module states the estimate, states its basis, and asks the integrator to leave it out of the efficiency-model entries until an audit puts it in. A range generation that adds unaudited counts to its own headline is the exact failure this brief warned about.\n\nGen 10 cuts this panel too, and it is the part of the notch that a reader can see from outside the car. The skin ran to |z| 0.700 from x 0.800 to 1.230 and the tire was through it by 12.83 mm; the station table now carries the notch, 0.700 to x 1.080, 0.6550 by x 1.105, held to 1.250, then 0.5940 by 1.268 and flat to the front edge at 1.300. Coverage falls 3.53 to 3.508 m2: the area removed is 0.02155 m2, measured by integrating the exact plane slice of the built skin at 1 mm stations over both modules, which at 3.101 kg/m2 is 0.067 kg and takes this line from 11 to 10.9. The panel also loses its old front-corner taper from 0.686 to 0.648 because the notch is inboard of both. The five stiffening beads and the two fastener lands are unchanged in width and depth and the lands still follow the outline, so the two forward fastener stations at x 1.010 and 1.205 move inboard with the panel rather than off the edge of it. The reason the shield is cut at all, given the tire only reaches shield height forward of x 1.200, is that the pack\'s outboard face at this corner is now one surface from the skin to the lid: the closeout stands on the pan and lands under the lid, and a shield edge that ran 45 mm outboard of it would be a shelf in the airstream with the wheel above it.',
      why: 'This is the only part on the pack that stores no energy and it exists because the volume grab created a hazard rather than because the pack needed it, which makes it the cleanest statement of what the 40 kWh actually cost. Eleven kilograms is 3.2 miles of range at this car\'s 0.29 miles per kilogram, against the 361 the energy returns. The trade is not close, and the reason to run the arithmetic anyway is that it is the same arithmetic that would have said no to a heavier answer, and it has to be run before the answer is known rather than after.',
      fail: [
        'A shield that takes a hard strike protects the pack and hides the evidence: titanium dents without tearing, so the damage is under an intact-looking panel. Any strike heavy enough to be felt mandates dropping the shield, which is an hour on a lift and 26 fasteners.',
        'Titanium against an aluminum rocker rail is a galvanic couple wherever moisture bridges them, the same problem the carbon lid solved with an isolation ply; the edge flanges carry a glass ply and a sealed fastener, and a damaged one starts slow attack on the rail flange rather than on the shield.',
        'The shield is a thermal blanket over a pack that boils its coolant, worth roughly 2 °C of pool temperature at sustained fast charge. It is inside thermal-7\'s margin, but it is a real term and it did not exist before this part did.',
      ],
      explode: [0, -0.62, 0],
    },
    cornerclose: {
      name: 'Front corner closeout',
      tagline: 'The notch is a hole in a pressure vessel until something closes it. This is that thing, and it is also the first side wall this pack has ever had forward of the rocker rail.',
      mass: 0.3,
      count: 2,
      specs: [
        ['Material', '0.7 mm Ti-6Al-4V, folded C section, bonded top and bottom'],
        ['Face', '|z| 0.6550 from x 1.080 to 1.250, then 0.5940 to the front edge at 1.290'],
        ['Standoff', '4.3 mm in z to the cell stack face at |z| 0.6500; 1.30 mm surface to surface, at the bottom lap under the brick'],
        ['Clearance', 'Pack to wheels-10, surface to surface: tire 10.73 mm, disc 10.00, rim 21.35, caliper 33.06'],
        ['Steered lock', 'Clear at rest, contained to 3.23 degrees; the notch buys the 3.23 and none of the cell stack margin'],
        ['Duty', 'Vapor boundary, pool retaining wall, and the notch face itself'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Cutting the corner is the easy half. The pack is a sealed vessel holding a fluoroketone pool at 1.0 to 1.8 bar with a 49 to 68 °C vapor space over it, and its outboard boundary between the pan and the lid has always been the rocker bond rail. The rail runs x -1.06 to 1.08 and stops there, so from x 1.08 forward this pack has never had a side wall at all: battery-3 drew the boundary, battery-6 and battery-7 carried it, and the front 220 mm of the vessel was closed in the text and open in the mesh. The notch makes that impossible to leave alone, because it also deletes the pool retaining wall over the same 204 mm. So this part is not overhead added to pay for the cut. It is the wall the cut forced somebody to finally draw.\n\nThe section is a C, folded from the strike shield\'s own 0.7 mm titanium: a 12 mm lap on the pan top at y 0.1095, a 180.5 mm web, and a 12 mm land under the floor-lid skin at y 0.2893. Both flanges are bonded rather than bolted, because this is a pressure and moisture boundary on a sulfide chemistry and a fastener through it is 26 more leak paths at the one corner a wheel is closest to. The web is a constant |z| 0.6550 from x 1.080 to 1.250 and then takes the same step the panels take, 0.5940 by x 1.268 and flat to the lid\'s front edge at 1.290. It is deliberately not a copy of the notch outline: the lid, the pan and the strike shield chamfer down onto it between x 1.080 and 1.105, and a wall that followed them there would reach |z| 0.6900 where the pan does and break the extent max this part declares. Over those 25 mm the panels overhang it, which is what a trimmed panel edge does. It retains the pool over its whole length, and the fluid plan stops 2.2 mm inboard of the outer face at |z| 0.6528, the way battery-6 and battery-7 stood their pool 12 mm off their retaining wall with bare pan between. It is the surface the interface block at the top of this file declares, which is why it is a separately named part rather than a flange on the shield: extent max asserts that no vertex of this part passes the plane, and the shield\'s own edge flange legitimately reaches |z| 0.7200 two hundred millimeters aft.\n\nThe mass is 0.3 kg and it is new mass. The plan line is 255.6 mm per side, 170 along the notch face, 63.6 down the step to the disc plane and 22 flat to the front edge, and the developed section is 204.5 mm, so each side is 0.0523 m2 of 0.7 mm titanium and the pair is 0.1045 m2, which at 4,430 kg/m3 is 0.324 kg. It is not free on the grounds that the sheet is the shield\'s own stock, and the pack does not get to stay at a round 385.0 by taking 0.3 kg off the shield line. Folding a new part from the same alloy does not remove material from a panel it is not cut from. The notch genuinely takes 0.067 kg off the shield and 0.078 off the lid, and it also deletes 1.159e-4 m3 of pool retaining wall whose polymer no pack in this lineage has ever named, which is between 0.10 and 0.16 kg. So the pack is somewhere between 0.02 and 0.08 kg heavier and the ledger declares 385.1, the heavy end of that band, because over-declaring mass costs range rather than granting it. The header carries the whole arithmetic including the part of it that cannot be closed.',
      why: 'The depth of this notch is set by the cell stack, not by the tire, and that is the whole argument for the number. The layers are 1,300 mm wide, so their outboard faces are |z| 0.6500 and everything outboard of that plane is packaging. wheels-10 puts its inner sidewall at 0.6725. That leaves a 22.5 mm band to spend, and this part spends 4.3 of it on standoff to the stack and 0.7 on titanium and leaves the remaining 17.5 as air between two planes. Going further inboard would take layer width, which is energy at 8.810 miles per kWh, and design/gen10.md sends this module here precisely because that lever is owned and unavailable. Going less far inboard would leave clearance the pack has no use for: nothing lives in the corner. So the face is at |z| 0.6550 for a reason a reader can check with a ruler. What would move it again is a tire section wider than 170 mm, which is where the sidewall arrives on this face: on the unmoved 0.740 center, 155 mm puts it at 0.6625 and leaves 7.5 mm, 165 puts it at 0.6575 and leaves 2.5, 170 puts it at 0.6550 and leaves nothing, and by about 179 the notch face and the cell stack are the same plane and the next millimeter is energy. That is the number the declared interface exists to make visible, because both modules print their built spans on every run of tools/check-interfaces.sh and a section change shows up as the gap closing rather than as a surprise.\n\nAnd 17.5 mm is not this corner\'s clearance, which is the sentence this panel exists to get right. 17.5 is two planes subtracted at the station where the notch face is, and HANDOFF.md records that this exact corner already shipped a set of clearances that were nearest-vertex readings and did not survive a surface measurement. Measured surface to surface over the whole front corner, every triangle of wheels-10 against every triangle of this pack, the minimum is 10.73 mm and it is 150 mm aft of the notch face, on the lead-in chamfer at (1.0909, 0.3020, 0.6860) against the tire\'s inner shoulder at (1.1005, 0.3039, 0.6904). wheels-10\'s discs panel publishes the same 10.73 from its own sweep, which is the agreement worth having. The disc is 10.00 mm, the rim 21.35 and the caliper 33.06, all on that one method. Both figures are real and only one of them is a clearance, and a panel that printed the 17.5 alone would be repeating the mistake the last correction to this corner was written about.',
      fail: [
        'The steering lock is the residual and it is bigger than the static defect this part fixes. What sets the inboard rate is longitudinal offset from the steering axis at (1.45, 0.740), 1.45 less x, and not radius. The tire\'s aft-most vertex is x 1.0950, an offset of 355 mm and 6.20 mm of inboard travel per degree; the point that actually reaches this pack first is at x 1.136, 314 mm and 5.48 mm per degree. Swept about that axis and tested with the same triangle predicate tools/check-interfaces.sh uses, bisected to a thousandth of a degree, this pack is clear at rest and first crosses wheels-10 at 3.23 degrees. The cell stack is reached at 4.23.\n\nWhose 4.23 is it. Not this part\'s, and saying so is the point of this entry: the notch hands back no cell-stack lock at all, not the 1.9 degrees the arithmetic on the closeout alone suggests. The cell stack did not move: it is |z| 0.6500 on battery-7 and |z| 0.6500 here, so the angle at which a tire reaches it is a property of the tire. Run all six combinations and the rows say it plainly. Against wheels-9 the cell stack is reached at 2.34 degrees on battery-7 and at 2.34 on this pack; against wheels-10 it is 4.23 on battery-7 and 4.23 here. The 1.89 degrees between those columns is wheels-10\'s 135 mm casing and belongs on its panel. What this part changes is the other row, the one that starts at zero: battery-7 crosses some pack surface at 0.00 degrees against every one of the three wheels, because it is already inside all of them at rest, and this pack crosses at 13.93 against wheels-7, 1.38 against wheels-9 and 3.23 against wheels-10. So the notch buys the static interference and 3.23 degrees of lock, and it buys nothing at all beyond the point where the tire reaches the cells.\n\nIt cannot buy more, because everything past |z| 0.6500 is layer width and layer width is energy at 8.810 miles per kWh. Gen 9\'s matched track spent 13.09 of the 15.43 degrees battery-7 and wheels-7 had at this corner, nobody wrote it down, and the rack commands 14. The fix is the pack\'s front wall coming aft of x 1.10, which is a generation and a real kilowatt-hour bill, or a steering slot that contains the lock. It is stated here rather than left for a Gen 11 retrospective to find.',
        'Side impact at this corner is worse than it was and the comparison has to be made honestly. Before the notch there was 60 mm between the pack\'s own outboard face at |z| 0.7100 and the cell stack at 0.6500, made of a 12 mm sandwich edge, an 8 mm plastic pool wall and fluid, and none of it was structure: the rocker bond rail, which is the only side-impact member in this pack, stops at x 1.08 and never reached this station. Now there is 5.0 mm, of which 0.7 is titanium. What has not changed is the load path, because there was not one. A pole or a driven wheel at x 1.2 goes into the cell stack in both packs and the difference is 55 mm of crush that was never rated. The honest reading is that the notch exposes an absent member rather than deleting one, and that the pack wants a forward rail extension it has never had.',
        'A bonded C section is a repair boundary. The top land is bonded to the floor-lid skin and the bottom lap to the pan, so a damaged closeout cannot be unbolted: it is a lid-off job, which on this pack means breaking the brick-top adhesive that makes the floor a torsion box. That is the same repair boundary battery-3 drew for a side pole, moved to a corner that a curb strike can reach.',
      ],
      explode: [0, 0.10, 0.85],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────
   New envelope, superseding design/gen4.md's battery row for this module:
     x [-1.29, 1.30], y [0.1025, 0.308], z [-0.71, 0.71]
     narrowing to |z| 0.615 aft of x -1.00 (wheels-7 rear corner)

   Datum warning: lib.plate(w, d, t, r, mat) puts its slab between y + t/2
   and y + 3t/2, so the constant below is NOT the underside. Every height in
   this table is a MEASURED world y. Vertical stack, bottom to top:
     0.1025  strike shield underside, level with body-7's floor strakes and
             3.5 mm under its venturi closeout plane at 0.106
     0.1045  swage floor. The shield skin is a formed panel: its five
             stiffening beads and its two fastener lands press 2 mm UP into
             the 3.5 mm stack, never down into the airstream, so the lowest
             surface on the car is still an unbroken 0.1025 land
     0.1060  shield top (0.5 mm bonded overlap into the pan)
     0.1055  pan underside
     0.1095  pan top, and the foot of the 35 mm pool retaining wall
     0.1075  pool floor (the fluid wets 2 mm into the pan section)
     0.1115  brick bottom, 2.0 mm over the pan top and carried on the band
             bottom legs, whose inner face is this plane. The slotted pool
             baffles stand in the riser gaps between bricks, not under them,
             and they run to 0.1275, so nothing here rests on a rib
     0.1215  pool surface (14 mm pool, brick 10 mm submerged)
     0.2755  brick top
     0.2775  sensing film top
     0.2900  floor-lid skin underside
     0.2995  rocker rail top, and the plane the floor-lid's bonded perimeter
             land now sits on
     0.3020  floor-lid skin top (identical to battery-6, so hv-4's hatch
             feed at (-1.13, 0.315, 0.38) lands exactly where it did)
     0.3080  seat rail tops, the pack's highest geometry (battery-6: same)

   THE DETAIL PASS. Not one datum in that table moved and not one kilogram
   in the ledger moved. What changed is that every part now carries the
   features a made one would: the rocker rail is a real three-chamber
   extrusion with its section open at both ends instead of a plain box, the
   preload bands are continuous wound hoops instead of four disconnected
   legs, the 210 bipolar layers are chamfered so the stack reads as
   laminations, the pool has a wall, the spigots have flanges and bolts, the
   disconnect has a manual service handle with a lockout, and the strike
   shield is one continuous formed panel with stiffening beads rather than
   two flat plates. Every addition was ray-tested against the rest of the
   pack and against the preset partners: the results are at the foot of the
   file. */

const SHIELD_Y = 0.10075;   // plate datum: underside lands at 0.1025
const PAN_Y = 0.1035;
const POOL_Y = 0.1075;
const POOL_T = 0.014;
const BRICK_Y0 = 0.1115;
const BRICK_H = 0.164;
const BRICK_Y = BRICK_Y0 + BRICK_H / 2;      // 0.1935
const BRICK_L = 0.42, BRICK_W = 1.30;
const LID_Y = 0.284;
const RAIL_TOP = 0.2995;                     // measured rocker rail top

/* five bricks along x on battery-6's pitch; the rear bay behind the last
   brick keeps the disconnect, the film aggregator and the fill hardware */
const BX = [-0.76, -0.312, 0.136, 0.584, 1.032];
const GAPX = [-0.536, -0.088, 0.36, 0.808];
const LAYERS = 42, LPITCH = 0.010, LAYER_T = 0.0089;
const PLATE_T = 0.008;                       // brick end plate thickness
const PLATE_FACE = 0.213 + PLATE_T / 2;      // 0.217, outer face from brick center

/* the waist: aft of WAIST_X nothing static may sit outboard of WAIST_Z.
   Drawn before wheels-7 existed, from the gen7 contract flange face at
   |z| 0.65 minus a 2.5 mm tire-inboard offset, 18.6 mm of assumed rear-steer
   sweep and 14 mm liner clearance. Re-verified against wheels-7 as built:
   its rear tire inner face is |z| 0.6625, the ±3 degree sweep takes it to
   0.646, so this waist clears the swept tire by 31 mm. It holds. */
const WAIST_X = -1.00;
const WAIST_Z = 0.615;
const REAR_X = -1.29;

/* ── THE GEN 10 NOTCH ──────────────────────────────────────────────────
   The pack's outboard half-width at the front corner, as a station table.
   Nothing static may sit outboard of this line forward of NOTCH_X0, and
   every notched part takes min(its own width, cornerHalf(x)) so there is
   one outline and not four that can drift apart.

   Where the four numbers come from, all measured off built meshes with one
   method, an exact plane slice clipped to a y band:

     0.6500  the cell stack. Layer faces, 36,677 of battery-7's 36,731
             vertices at or inside it and 36,875 of this module's 36,947,
             with 9,680 on it to within a micron on both and zero on it to
             within a nanometer, because 0.65 in float32 is 24 nanometers
             short. This is the floor of the whole exercise: past it, a
             notch is energy.
     0.6550  the notch face. 0.6500 plus 4.3 mm of standoff plus the
             closeout's own 0.7 mm sheet.
     0.6725  wheels-10's built front tire inner sidewall, a 135 mm section
             on the 0.740 center. wheels-9's was 0.6625 on a 155 mm
             section, so the notch clears the wider of the two by 7.5 mm
             and the one this preset runs by 17.5.
     0.5940  ten millimeters inboard of wheels-10's brake disc inner face
             at |z| 0.6040, which reaches floor-lid height from x 1.2754.

   And the x stations:
     1.080   the rocker bond rail's forward end, so the cut starts on a
             structural station rather than in the middle of a panel
     1.105   sized so the lead-in chamfer stays clear of the tire shoulder,
             which is the tightest part of the whole notch and is where the
             corner's smallest clearance actually is. Convention, because
             this is the sentence that has to carry one: an exact plane
             slice of the built tire triangles at x 1.100, clipped to this
             pack's own height band y 0.1025 to 0.3080, minimum |z|. The
             shoulder reads 0.6827 on wheels-9 and 0.6902 on wheels-10 and
             the lead-in is at 0.6660, so 16.7 mm and 24.2 mm in plan at
             that station and 10.73 mm in three dimensions over the whole
             chamfer. A lead-in ending at x 1.115 instead would sit at
             0.6786 there and leave 4.1 mm against wheels-9.
     1.250   the cell stack itself is what stops the step going aft. Swept
             per vertex, brick geometry sits at |z| 0.6500 out to x 1.2475,
             which is the fifth brick's forward layer chamfers and end
             plate, so the notch face may not start stepping inboard of the
             stack before this station. Starting the step at 1.240 was tried
             and measured: it cuts 5.5 mm into that end plate over 88
             triangle pairs and leaves 9 mm of cell stack standing outboard
             of the lid.
     1.268   the disc reaches floor-lid height at x 1.2754, taking the
             lid's own skin heights of y 0.290 and 0.302 against a disc of
             radius 0.1825 about (1.45, 0.355), so the step has to be
             finished before that. Finishing it at 1.272 was tried and
             measured: it puts the lid's ramp edge 7.04 mm from the disc's
             rim in three dimensions where the two planes are 10.0 mm
             apart, which is the difference between a plane clearance and a
             surface clearance and the reason both are published below.
             Finishing at 1.268 measures 12.4 mm.                         */
const NOTCH_X0 = 1.080;
const NOTCH_Z = 0.6550;
const DISC_Z = 0.5940;
const CORNER_STA = [
  [1.080, 0.7100], [1.105, NOTCH_Z], [1.250, NOTCH_Z],
  [1.268, DISC_Z], [1.400, DISC_Z],
];
const SHEET_T = 0.0007;                      // closeout sheet, shield stock
/* The fluid stands 1.5 mm off the closeout's inner face, the way battery-6's
   and battery-7's pool stood 12 mm off its retaining wall with bare pan
   between. It is a drawing standoff and not a change to the lane: the lane
   outboard of the cell stack is measured from the stack face at |z| 0.6500
   to the closeout's inner face at 0.6543 and is 4.3 mm either way. */
const POOL_GAP = SHEET_T + 0.0015;

/* Linear through the stations, so the table IS the outline and nothing
   between two stations can bulge past it. Aft of the first station the
   notch does not apply and the caller's own width stands. */
function cornerHalf(x) {
  if (x <= CORNER_STA[0][0]) return Infinity;
  for (let i = 1; i < CORNER_STA.length; i++) {
    if (x <= CORNER_STA[i][0]) {
      const f = (x - CORNER_STA[i - 1][0]) / (CORNER_STA[i][0] - CORNER_STA[i - 1][0]);
      return CORNER_STA[i - 1][1] + f * (CORNER_STA[i][1] - CORNER_STA[i - 1][1]);
    }
  }
  return CORNER_STA[CORNER_STA.length - 1][1];
}

/* A closed plan outline for a slab of thickness t lying in the XZ plane,
   traced as world [x, z] pairs on the +z side and mirrored automatically.
   lib.plate cannot do this: a notched panel is not a rounded rectangle,
   and building it as two plates would put a butt joint through a bonded
   sandwich. The shape is drawn in the extruder's XY plane with shape-y
   carrying world -z, because rotateX(-90) maps (x, y, z) to (x, z, -y). */
function plateOutline(halfPts, t, mat, creaseDeg = 30) {
  const n = halfPts.length;
  const pts = [];
  for (let i = 0; i < n; i++) pts.push([halfPts[i][0], -halfPts[i][1]]);
  /* mirror back, dropping the two endpoints because both sit on z = 0 and
     repeating them makes a zero-area triangle at each end of the seam */
  for (let i = n - 2; i >= 1; i--) pts.push([halfPts[i][0], halfPts[i][1]]);
  const s = new THREE.Shape();
  s.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 2 });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, t / 2, 0);
  const m = lib.mesh(geo, mat);
  return creaseDeg ? lib.crease(m, creaseDeg) : m;
}

/* The plan outline of a full-width pack panel: rear corners rounded the way
   lib.plate rounded them, front corners cut by the notch. Returns the +z
   half of the outline, nose first, as world [x, z]. */
function notchedPlan(xRear, xFront, half, rRear, inset = 0) {
  const p = [[xRear, 0]];
  const seg = 4;
  /* rear rounded corner, lib.plate's radius kept so the aft end of every
     panel is bit-comparable with battery-7's */
  for (let i = 0; i <= seg; i++) {
    const a = Math.PI - (Math.PI / 2) * (i / seg);
    p.push([xRear + rRear + Math.cos(a) * rRear, half - rRear + Math.sin(a) * rRear]);
  }
  /* forward along the outboard edge, picking up every notch station that
     falls inside this panel and clipping each to the panel's own width */
  if (NOTCH_X0 < xFront) p.push([NOTCH_X0, half]);
  for (const [sx, sz] of CORNER_STA) {
    if (sx <= NOTCH_X0 || sx >= xFront) continue;
    p.push([sx, Math.min(half, sz - inset)]);
  }
  p.push([xFront, Math.min(half, cornerHalf(xFront) - inset)]);
  p.push([xFront, 0]);
  return p;
}

/* ── Local detail helpers ─────────────────────────────────────────────
   None of these move a datum. They exist so a fabricated part reads as
   folded sheet, an extrusion reads as an extrusion, and a bolted joint
   reads as bolted. Sections are written in WORLD coordinates: a section
   drawn for extrudeX is a list of [z, y] pairs at the world heights and
   half-widths the part actually occupies, so a reader can check a number
   against the stack table above without doing any arithmetic. */

/* Closed rounded-rectangle outline, centered on the local origin. */
function rrect(w, h, r, seg = 2) {
  const hw = w / 2, hh = h / 2, rr = Math.max(0, Math.min(r, hw, hh));
  if (rr < 1e-6) return [[hw, -hh], [hw, hh], [-hw, hh], [-hw, -hh]];
  const p = [];
  const arc = (cx, cy, a0) => {
    for (let i = 0; i <= seg; i++) {
      const a = a0 + (Math.PI / 2) * (i / seg);
      p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
  };
  arc(hw - rr, -hh + rr, -Math.PI / 2);
  arc(hw - rr, hh - rr, 0);
  arc(-hw + rr, hh - rr, Math.PI / 2);
  arc(-hw + rr, -hh + rr, Math.PI);
  return p;
}

function shapeOf(outline, holes) {
  const trace = (path, pts) => {
    path.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) path.lineTo(pts[i][0], pts[i][1]);
    path.closePath();
  };
  const s = new THREE.Shape();
  trace(s, outline);
  for (const h of holes || []) { const p = new THREE.Path(); trace(p, h); s.holes.push(p); }
  return s;
}

/* Extrude a section drawn in the world XY plane along +Z, from z = 0. */
function extrudeZ(outline, holes, len, mat, creaseDeg = 30) {
  const geo = new THREE.ExtrudeGeometry(shapeOf(outline, holes),
    { depth: len, bevelEnabled: false, curveSegments: 2 });
  const m = lib.mesh(geo, mat);
  return creaseDeg ? lib.crease(m, creaseDeg) : m;
}

/* Extrude a section drawn as world [z, y] pairs along +X, from x = 0.
   rotateY(+90) maps local z to world x and local x to world -z, so the
   section is negated on the way in and the caller's numbers are the world
   ones. Only the x placement is left to the caller. */
function extrudeX(outlineZY, holesZY, len, mat, creaseDeg = 30) {
  const flip = (a) => a.map(([z, y]) => [-z, y]);
  const geo = new THREE.ExtrudeGeometry(shapeOf(flip(outlineZY), (holesZY || []).map(flip)),
    { depth: len, bevelEnabled: false, curveSegments: 2 });
  geo.rotateY(Math.PI / 2);
  const m = lib.mesh(geo, mat);
  return creaseDeg ? lib.crease(m, creaseDeg) : m;
}

/* A hex head with its seating face on y = 0, growing +Y, 24 triangles
   against lib.fastener's 80. Used only where a bank runs to dozens of
   heads and the silhouette is all that reads at that size. */
function hexHead(r, h, mat) {
  const m = lib.mesh(new THREE.CylinderGeometry(r * 0.88, r, h, 6), mat);
  m.position.y = h / 2;
  const g = new THREE.Group();
  g.add(m);
  return g;
}

/* Countersunk flush head: the visible disc is on y = 0 and the shank sinks
   -Y, so the caller seats it on the face it is flush with. */
function cskHead(r, t, mat, socket) {
  const g = new THREE.Group();
  const h = lib.mesh(new THREE.CylinderGeometry(r, r * 0.5, t, 12), mat);
  h.position.y = -t / 2;
  g.add(h);
  const s = lib.mesh(new THREE.CylinderGeometry(r * 0.44, r * 0.44, t * 0.5, 6),
    socket || M.darkSteel);
  s.position.y = -t * 0.24;
  g.add(s);
  return g;
}

/* The strike shield's plan outline: half-width against x, interpolated
   linearly so the panel's own stations ARE its outline and nothing between
   them can bulge past |z| 0.700 or past the waist at 0.610. */
const SHIELD_STA = [
  [-1.290, 0.560], [-1.272, 0.600], [-1.150, 0.610], [-1.000, 0.610],
  [-0.955, 0.632], [-0.890, 0.700], [-0.400, 0.700], [0.200, 0.700],
  [0.800, 0.700], [1.080, 0.700], [1.105, NOTCH_Z], [1.250, NOTCH_Z],
  [1.268, DISC_Z], [1.300, DISC_Z],
];
const SK_LO = 0.1025, SK_HI = 0.1060, SK_ROLL = 0.0009;
const SK_NB = 10;                 // bottom-edge intervals: 11 ring points
const SK_FAST_T = 0.857;          // fastener land, as a fraction of half-width

function shieldHalf(x) {
  const S = SHIELD_STA;
  if (x <= S[0][0]) return S[0][1];
  for (let i = 1; i < S.length; i++) {
    if (x <= S[i][0]) {
      const f = (x - S[i - 1][0]) / (S[i][0] - S[i - 1][0]);
      return S[i - 1][1] + f * (S[i][1] - S[i - 1][1]);
    }
  }
  return S[S.length - 1][1];
}

export function build() {
  const sys = new THREE.Group();

  /* ── bricks: 210 instanced bipolar layers in five stacks, machined
     terminal end plates with tie bosses, laminated flexible links across
     the riser gaps because a brick breathes 22.5 mm and a rigid bar would
     tear, the two string terminals with their insulation boots, and the
     front take-off into the rail raceway ── */
  const bricks = lib.part('bricks', [0, 0.34, 0]);
  /* Chamfered 0.8 mm on every edge. That is the whole difference between a
     block and a stack: a 1.1 mm inter-layer channel plus two 0.8 mm
     chamfers is a 2.7 mm shadow line at every one of the 210 pitches, and
     it costs 44 triangles per layer against a plain box's 12. */
  const layerGeo = lib.cbox(LAYER_T, BRICK_H, BRICK_W, 0.0008, M.cell).geometry;
  const inst = new THREE.InstancedMesh(layerGeo, M.cell, BX.length * LAYERS);
  inst.castShadow = inst.receiveShadow = true;
  const dummy = new THREE.Object3D();
  let k = 0;
  for (const cx of BX) {
    for (let i = 0; i < LAYERS; i++) {
      dummy.position.set(cx + (i - (LAYERS - 1) / 2) * LPITCH, BRICK_Y, 0);
      dummy.updateMatrix();
      inst.setMatrixAt(k++, dummy.matrix);
    }
  }
  inst.instanceMatrix.needsUpdate = true;
  bricks.add(inst);
  /* End plates. 8 mm machined steel, chamfered, outer face at |x - cx|
     0.217 so the band leg lands on it rather than through it. The two
     outermost plates carry the tie bosses and the terminals; the eight
     inner ones sit 14 mm from their neighbor and get the chamfer only. */
  for (const cx of BX) {
    for (const xs of [-1, 1]) {
      const plate = lib.cbox(PLATE_T, BRICK_H, BRICK_W, 0.0015, M.steel);
      plate.position.set(cx + xs * 0.213, BRICK_Y, 0);
      bricks.add(plate);
      const outer = (cx === BX[0] && xs < 0) || (cx === BX[BX.length - 1] && xs > 0);
      if (!outer) continue;
      for (const bz of [-0.56, -0.19, 0.19, 0.56]) {
        const boss = lib.cyl(0.011, 0.007, M.steel, 8);
        boss.rotation.z = Math.PI / 2;
        boss.position.set(cx + xs * (PLATE_FACE + 0.0035), BRICK_Y, bz);
        bricks.add(boss);
        const nut = hexHead(0.007, 0.005, M.darkSteel);
        nut.rotation.z = xs > 0 ? -Math.PI / 2 : Math.PI / 2;
        nut.position.set(cx + xs * (PLATE_FACE + 0.007), BRICK_Y, bz);
        bricks.add(nut);
      }
    }
  }
  /* Series links across the riser gaps. Three 6 mm copper laminations
     between two clamp bars: the stack has to take 22.5 mm of breathing per
     brick across four gaps, so the link is deliberately compliant and is
     drawn that way. The clamp bars are 30 mm across a 90 mm lamination so
     that 30 mm of every foil stands clear of them at each end, which is the
     only reason any of this is visible through a 14 mm slot. */
  for (const gx of GAPX) {
    for (const zz of [-0.35, 0.35]) {
      for (let i = 0; i < 3; i++) {
        const foil = lib.cbox(0.026, 0.006, 0.090, 0.0010, M.busbar);
        foil.position.set(gx, BRICK_Y + (i - 1) * 0.038, zz);
        bricks.add(foil);
      }
      for (const xs of [-1, 1]) {
        const clamp = lib.cbox(0.005, 0.122, 0.030, 0.0010, M.busbar);
        clamp.position.set(gx + xs * 0.0045, BRICK_Y, zz);
        bricks.add(clamp);
      }
      for (const cs of [-1, 1]) {
        const nut = hexHead(0.006, 0.005, M.darkSteel);
        nut.rotation.x = cs > 0 ? Math.PI / 2 : -Math.PI / 2;
        nut.position.set(gx, BRICK_Y, zz + cs * 0.015);
        bricks.add(nut);
      }
    }
  }
  /* The two ends of the 210s string. Molded standoff, bolted copper lug,
     hex nut, orange boot: the only two places in the pack where 810 V
     leaves a brick, so they are the only two that get a boot. */
  for (const [tcx, txs, tz] of [[BX[BX.length - 1], 1, 0.52], [BX[0], -1, -0.52]]) {
    const face = tcx + txs * PLATE_FACE;
    const stand = lib.cyl(0.019, 0.012, M.plasticLt, 12);
    stand.rotation.z = Math.PI / 2;
    stand.position.set(face + txs * 0.006, 0.24, tz);
    bricks.add(stand);
    const lug = lib.cbox(0.006, 0.030, 0.024, 0.0012, M.busbar);
    lug.position.set(face + txs * 0.015, 0.24, tz);
    bricks.add(lug);
    const nut = hexHead(0.007, 0.006, M.darkSteel);
    nut.rotation.z = txs > 0 ? -Math.PI / 2 : Math.PI / 2;
    nut.position.set(face + txs * 0.018, 0.24, tz);
    bricks.add(nut);
    /* the boot goes on the cable end of the joint, not over the whole
       terminal: a sleeve over all four pieces is four pieces nobody sees */
    const boot = lib.cyl(0.011, 0.016, M.hv, 12);
    boot.rotation.z = Math.PI / 2;
    boot.position.set(face + txs * 0.032, 0.24, tz);
    bricks.add(boot);
  }
  /* HV warning, extruded rather than printed: a decal has no rim for a
     softbox to find and this one sits on the face a technician meets first
     when the front closeout comes off. */
  const warnTri = [[-0.030, -0.020], [0.030, -0.020], [0.0, 0.032]];
  const warnBolt = [[-0.004, -0.010], [0.007, 0.006], [0.001, 0.006],
                    [0.006, 0.019], [-0.007, 0.002], [-0.001, 0.002]];
  const warn = lib.badge(warnTri, 0.0018, M.busbar, { holes: [warnBolt] });
  warn.rotation.y = Math.PI / 2;
  warn.position.set(BX[BX.length - 1] + PLATE_FACE, 0.185, 0.10);
  bricks.add(warn);
  /* THE STRING TAKE-OFF, REROUTED. battery-7 ran this cable outboard and
     forward to (1.245, 0.2845, 0.706) and stopped, and its own verification
     notes call that out: it dead-ends in air, because the raceway it is
     described as feeding ends at x 1.080. It was also the only geometry in
     the whole pack that sat outboard of the front tire and was not lid,
     shield or gallery, 43 vertices of 36,731 on the +z side alone. It now
     runs aft inboard of the notch line the whole way, crosses out over the
     rail only once it is behind the tire's plan circle, and lands on the
     raceway jacket's inner face at |z| 0.7075. Clearance against the notch
     itself, swept at 1 mm stations rather than at the waypoints because a
     Catmull-Rom curve does not pass straight between them: forward of
     x 1.080 the tube's worst margin to cornerHalf is 18.90 mm, at x 1.105,
     where the outline reaches the notch face and the tube is on 0.6361.

     AND THE LANDING X IS SET BY THE BOND BEAD, WHICH COST A REVIEW TO FIND.
     cornerHalf is the wrong thing to check a cable against once it is aft
     of x 1.080, because what is there is the rocker rail, and the rail
     carries a structural adhesive bead on its inner face over x -1.030 to
     1.050 at |z| 0.6980 to 0.7195. A first version of this reroute landed
     at x 1.056, and an 8 mm tube ending there puts its end ring across
     x 1.048 to 1.064: 11 triangle pairs, 3.46 mm deep, straight through
     that bead. Nothing in the toolchain tests two parts of one module
     against each other, so it was swept by hand with the checker's own
     predicate, the same way the pool wall was. The landing is now x 1.060,
     whose end ring stops at x 1.0523 and clears the bead's forward end by
     2.30 mm, and the only crossing left is the 0.30 mm the tube makes into
     the raceway jacket itself, which is the landing. Note while reading
     that: the jacket and the bead already share 24.40 mm of volume over
     18 triangle pairs INSIDE the rockerrails part, identically on
     battery-7 and here, so the 30 mm of jacket forward of x 1.050 is the
     only length of raceway a cable can reach without entering the bond
     line. That overlap is battery-3's and is carried, not created. */
  bricks.add(lib.tube(
    [[1.283, 0.240, 0.520], [1.240, 0.250, 0.582], [1.170, 0.257, 0.612],
     [1.110, 0.261, 0.628], [1.076, 0.264, 0.628], [1.066, 0.2740, 0.678],
     [1.060, 0.2775, 0.7060]],
    0.008, M.hv
  ));
  sys.add(bricks);

  /* ── preload bands: three filament-wound carbon hoops per brick. One
     continuous rounded hoop per station rather than four separate legs: the
     corner radius is the whole visual difference between a wound band and a
     welded frame, and the envelope is unchanged to the tenth of a
     millimeter. The bottom leg runs in the pan section: the pan top is
     0.1095 and the brick bottom is 0.1115, so a 5 mm leg passing under the
     brick cannot also sit on the pan, and it is drawn 3.0 mm into the 4 mm
     pan the way a molded channel would take it. The tow overwrap sits on
     the top leg where the winding terminates, offset 100 mm forward of the
     hoop center so it misses the floor-lid stiffener crowns at 0.2830 ── */
  const bands = lib.part('bands', [0, 0.18, 0]);
  const hoopOut = rrect(0.444, 0.176, 0.014, 3);
  /* Inner corner radius 1.5 mm, matching the end plate's own chamfer rather
     than the 9 mm this was first drawn with. A 9 mm inner fillet over a
     square-cornered brick swallows the four end-plate corners by up to
     1.9 mm at every one of the sixty band-to-brick corners. */
  const hoopIn = rrect(0.434, 0.166, 0.0015, 3);
  for (const cx of BX) {
    for (const bz of [-0.45, 0, 0.45]) {
      /* outer 0.444 x 0.176 about (cx, 0.1945): y 0.1065 to 0.2825, the
         same two faces the four boxes closed on before */
      const hoop = extrudeZ(hoopOut.map(([a, b]) => [a + cx, b + BRICK_Y + 0.001]),
        [hoopIn.map(([a, b]) => [a + cx, b + BRICK_Y + 0.001])], 0.026, M.carbon, 35);
      hoop.position.set(0, 0, bz - 0.013);
      bands.add(hoop);
      /* tow overwrap: the winding starts and finishes here and the band is
         locally two plies thicker. 1.2 mm proud, which keeps the hoop under
         the 2.5 mm of clear air between it and the floor-lid stiffeners. */
      const wrap = lib.cbox(0.056, 0.0024, 0.030, 0.0008, M.carbon);
      wrap.position.set(cx - 0.10, 0.2837, bz);
      bands.add(wrap);
    }
  }
  sys.add(bands);

  /* ── rocker bond rails: carried from battery-3, 26 mm deeper because the
     floor dropped, 20 mm shorter at the rear because the track narrowed.
     Drawn for the first time as the extrusion it has always been: a real
     three-chamber 196 x 60 section with 2.7 mm walls, open at both ends so
     the chambers read. Bond bead inboard, flow-drill screws on top, 810 V
     return raceway on the passenger side only ── */
  const RAIL_L = 2.14, RAIL_X0 = -1.06;
  const RW = 0.0027;                       // wall
  const rz = 0.030, ry = 0.098;            // half section
  const chamber = (ry - RW - RW / 2) * 2 / 3;   // three equal chambers
  for (const zs of [-1, 1]) {
    const rr = lib.part('rockerrails', [0, 0.06, zs * 0.55]);
    const zc = zs * 0.75, yc = 0.2015;
    const sec = (dz, dy, r) => rrect(dz, dy, r, 2).map(([a, b]) => [a * zs + zc, b + yc]);
    const holes = [];
    for (const cy of [-(chamber + RW / 2 + RW), 0, chamber + RW / 2 + RW]) {
      holes.push(rrect(2 * (rz - RW), chamber, 0.003, 2)
        .map(([a, b]) => [a * zs + zc, b + cy + yc]));
    }
    const rail = extrudeX(sec(2 * rz, 2 * ry, 0.005), holes, RAIL_L, M.alu, 30);
    rail.position.x = RAIL_X0;
    rr.add(rail);
    /* Structural adhesive bead on the inner face, raised above the strike
       shield's edge flange which now bolts to the lower 40 mm of that face. */
    const bead = extrudeX([
      [zs * 0.7020, 0.1550], [zs * 0.7195, 0.1550], [zs * 0.7195, 0.2850],
      [zs * 0.7020, 0.2850], [zs * 0.6980, 0.2650], [zs * 0.6980, 0.1750],
    ], null, 2.08, M.plastic, 40);
    bead.position.x = -1.03;
    rr.add(bead);
    /* 28 flow-drill screws per side into the body rocker, seated on the
       measured rail top at 0.2995 and pulled outboard to |z| 0.765 so the
       floor-lid's bonded perimeter land does not bury them. */
    for (let i = 0; i < 28; i++) {
      const sx = -1.03 + i * (2.06 / 27);
      const screw = hexHead(0.0055, 0.0042, M.darkSteel);
      screw.position.set(sx, RAIL_TOP, zs * 0.765);
      rr.add(screw);
    }
    if (zs > 0) {
      /* The 810 V return: a copper bar in an orange insulation channel,
         clipped to the rail inner wall every 300 mm. Centered on y 0.2775,
         not 0.284: the floor-lid skin's underside is 0.2900 and its bonded
         perimeter land runs 0.2950 to 0.2995 over this same |z| band, and a
         raceway on 0.284 puts the jacket 2.5 mm and the clips 3.1 mm into
         the panel it hangs under. The clip tops now measure 0.2885. */
      const jacket = lib.cbox(2.14, 0.022, 0.012, 0.0015, M.hv);
      jacket.position.set(0.01, 0.2775, 0.7135);
      rr.add(jacket);
      const conductor = lib.cbox(2.14, 0.012, 0.005, 0.0008, M.busbar);
      conductor.position.set(0.01, 0.2775, 0.7105);
      rr.add(conductor);
      for (let i = 0; i < 8; i++) {
        const clip = lib.cbox(0.014, 0.030, 0.020, 0.0012, M.plasticLt);
        clip.position.set(-1.00 + i * 0.29, 0.2735, 0.7175);
        rr.add(clip);
      }
    }
    sys.add(rr);
  }

  /* ── floor-lid: carbon sandwich, full width to WAIST_X then waisted for
     wheels-7's rear corner, a bonded perimeter land that actually reaches
     the rocker rail tops it is bonded to, real top-hat stiffeners under the
     skin, C-section seat rails with their potted-insert hardware visible
     through the slot, the rear-bay service hatch in a machined landing rim
     at hv-4's feed coordinate, and two flanged burst discs ── */
  const lid = lib.part('floorlid', [0, 0.78, 0]);
  /* One outlined panel rather than lib.plate's rounded rectangle, because
     the front corners are now cut by cornerHalf and a second plate butted
     on at x 1.08 would put a joint through a bonded sandwich. Same x span,
     same |z| 0.71, same 50 mm rear radius, same 0.290 to 0.302 in y. */
  const panel = plateOutline(notchedPlan(-1.00, 1.29, 0.71, 0.05), 0.012, M.carbon);
  panel.position.set(0, LID_Y, 0);
  lib.shell(panel);
  lid.add(panel);
  const panelR = lib.plate(0.29, 2 * WAIST_Z, 0.012, 0.04, M.carbon);
  panelR.position.set(-1.145, LID_Y, 0);
  lib.shell(panelR);
  lid.add(panelR);
  /* The bonded perimeter. Until this pass the lid stopped at |z| 0.710 and
     the rail it is bonded to starts at 0.720, so the joint the content
     describes had a 10 mm air gap in it. The land is the sandwich panel's
     solid laminate edge: the core tapers out and the skins close down onto
     the rail top at 0.2995. It stops at |x| 1.04 because body-7's front
     fairing occupies |z| 0.693 to 0.894 from x 1.05 forward. */
  for (const zs of [-1, 1]) {
    /* The core taper finishes at |z| 0.7180, just inboard of the rail's
       inner face at 0.7200, and the land is FLAT on 0.2995 from there
       outboard. Run the taper all the way to 0.7440 instead and its
       underside is below the rail top everywhere over the rail: the first
       draft cut 1.9 mm into the rail it is meant to sit on. */
    const land = extrudeX([
      [zs * 0.6980, 0.2950], [zs * 0.7180, 0.2995], [zs * 0.7440, 0.2995],
      [zs * 0.7440, 0.3020], [zs * 0.6980, 0.3020],
    ], null, 2.08, M.carbon, 30);
    land.position.x = -1.04;
    lid.add(land);
    /* the bondline, with its squeeze-out bead on the inboard side where a
       technician looking up into the pack would see it */
    const bond = extrudeX([
      [zs * 0.7000, 0.2978], [zs * 0.7195, 0.2985], [zs * 0.7195, 0.2995],
      [zs * 0.7000, 0.2995], [zs * 0.6975, 0.2988],
    ], null, 2.08, M.plastic, 40);
    bond.position.x = -1.04;
    lid.add(bond);
  }
  /* Top-hat stiffeners, bonded to the lid underside where the 12.5 mm
     between the skin at 0.290 and the sensing film at 0.2775 actually is.
     They used to be flat bars buried 6 mm inside the skin they stiffen. */
  for (const hx of [-0.5, 0.1, 0.7]) {
    const hat = extrudeZ([
      [hx - 0.030, 0.2900], [hx - 0.030, 0.2885], [hx - 0.0215, 0.2885],
      [hx - 0.0215, 0.2830], [hx + 0.0215, 0.2830], [hx + 0.0215, 0.2885],
      [hx + 0.030, 0.2885], [hx + 0.030, 0.2900],
    ], null, 1.30, M.carbon, 30);
    hat.position.z = -0.65;
    lid.add(hat);
  }
  /* Seat rails: a C-section with a 16 mm slot, so the potted-insert bolts
     that carry the seat load into the brick tops are visible where a real
     one shows them, and the rail top stays on 0.3080. */
  for (const zz of [-0.52, -0.28, 0.28, 0.52]) {
    const rail = extrudeX([
      [zz - 0.0225, 0.3010], [zz + 0.0225, 0.3010], [zz + 0.0225, 0.3080],
      [zz + 0.0080, 0.3080], [zz + 0.0080, 0.3062], [zz + 0.0165, 0.3062],
      [zz + 0.0165, 0.3028], [zz - 0.0165, 0.3028], [zz - 0.0165, 0.3062],
      [zz - 0.0080, 0.3062], [zz - 0.0080, 0.3080], [zz - 0.0225, 0.3080],
    ], null, 0.75, M.alu, 30);
    rail.position.x = -0.055;
    lid.add(rail);
    for (let i = 0; i < 4; i++) {
      const b = hexHead(0.0062, 0.0028, M.darkSteel);
      b.position.set(0.005 + i * 0.21, 0.3028, zz);
      lid.add(b);
    }
    const pad = lib.cbox(0.10, 0.0044, 0.05, 0.0012, M.alu);
    pad.position.set(-0.80, 0.3032, zz);
    lid.add(pad);
    for (const px of [-0.835, -0.765]) {
      const b = hexHead(0.0055, 0.0026, M.darkSteel);
      b.position.set(px, 0.3054, zz);
      lid.add(b);
    }
  }
  /* Service hatch. A raised machined landing rim, a chamfered cover, eight
     countersunk heads flush in the cover face and an extruded HV warning.
     Everything stays at or under 0.3075: hv-4's pack feed comes down to
     0.3040 at the center of this panel and interior-6's NVH mat lands on
     0.3020 either side of it. */
  const hboss = lib.cbox(0.300, 0.0016, 0.260, 0.0008, M.alu);
  hboss.position.set(-1.13, 0.3028, 0.38);      /* 0.3020 to 0.3036 */
  lid.add(hboss);
  const gasket = lib.cbox(0.286, 0.0012, 0.246, 0.0004, M.rubber);
  gasket.position.set(-1.13, 0.3042, 0.38);     /* 0.3036 to 0.3048 */
  lid.add(gasket);
  const cover = lib.cbox(0.282, 0.0022, 0.242, 0.0010, M.alu);
  cover.position.set(-1.13, 0.3059, 0.38);      /* 0.3048 to 0.3070, which is
                                                   battery-6's hatch face */
  lid.add(cover);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const f = cskHead(0.0056, 0.0022, M.steel);
    f.position.set(-1.13 + Math.cos(a) * 0.118, 0.3070, 0.38 + Math.sin(a) * 0.098);
    lid.add(f);
  }
  const lidWarn = lib.badge(warnTri.map(([a, b]) => [a * 0.58, b * 0.58]), 0.0010, M.busbar,
    { holes: [warnBolt.map(([a, b]) => [a * 0.58, b * 0.58])] });
  lidWarn.rotation.x = -Math.PI / 2;
  lidWarn.position.set(-1.228, 0.3070, 0.38);   /* 0.3070 to 0.3080, the cap */
  lid.add(lidWarn);
  const pull = lib.cbox(0.044, 0.0010, 0.015, 0.0003, M.darkSteel);
  pull.position.set(-1.040, 0.3075, 0.38);
  lid.add(pull);
  /* Burst discs, rear-facing on the rear wall at x -1.29: a machined boss,
     a bolted retaining ring and the domed rupture disc standing proud of it.
     The stack is ordered by what has to be OUTERMOST. The retaining ring is
     r 18.5 mm and the bolt circle is r 15.8 mm, so a ring whose own rear
     face sits on x -1.29 encloses every bolt head and the disc as well: as
     first drawn it buried twelve heads and two discs, 384 triangles, inside
     itself. The ring now stops at x -1.2868 and the disc and the heads are
     the things on x -1.29. */
  for (const zz of [-0.25, 0.25]) {
    const boss = lib.cyl(0.016, 0.009, M.steel, 14);
    boss.rotation.z = Math.PI / 2;
    boss.position.set(-1.2773, 0.284, zz);   /* x -1.2818 to -1.2728 */
    lid.add(boss);
    const ring = lib.cyl(0.0185, 0.005, M.darkSteel, 14);
    ring.rotation.z = Math.PI / 2;
    ring.position.set(-1.2843, 0.284, zz);   /* rear face x -1.2868 */
    lid.add(ring);
    const disc2 = lib.cyl(0.0115, 0.006, M.steel, 12);
    disc2.rotation.z = Math.PI / 2;
    disc2.position.set(-1.2870, 0.284, zz);  /* rear face flush at x -1.29,
                                                3.2 mm proud of the ring */
    lid.add(disc2);
    const rb = lib.bolts(6, 0.0158, 0.0026, M.darkSteel);
    rb.rotation.z = Math.PI / 2;
    rb.position.set(-1.2882, 0.284, zz);     /* heads -1.28976 to -1.28664,
                                                seated on the ring rear face */
    lid.add(rb);
  }
  sys.add(lid);

  /* ── two-phase galleries: pan with the pool retaining wall it always
     needed, 14 mm pool, slotted baffle ribs and brick pedestals, liquid
     feed manifold with its lowered flanged stub, two vapor headers with
     riser take-offs and clips to the rail rather than a floating tube, and
     the keyed fill standpipe ── */
  const gal = lib.part('galleries', [0, -0.35, 0]);
  const pan = plateOutline(notchedPlan(-1.00, 1.29, 0.69, 0.04), 0.004, M.plastic);
  pan.position.set(0, PAN_Y, 0);
  gal.add(pan);
  const panR = lib.plate(0.29, 2 * WAIST_Z, 0.004, 0.035, M.plastic);
  panR.position.set(-1.145, PAN_Y, 0);
  gal.add(panR);
  /* The pool retaining wall. 35.5 mm from the pan top at 0.1095, which is
     21 mm of freeboard over a 14 mm pool: the slosh entry on the fail list
     is about lateral g moving the fluid off a brick base, and until this
     pass there was nothing at the pan edge to move it against. */
  const WALL_T = 0.008, WALL_H = 0.0355, WALL_Y = 0.1095 + WALL_H / 2;
  for (const zs of [-1, 1]) {
    /* The side wall used to run to x 1.284 at |z| 0.686, so 204 mm of it
       stood inside the front tire. It stops at the notch now and the
       corner closeout takes over as the retaining wall from there. */
    const wf = lib.cbox(2.080, WALL_H, WALL_T, 0.0015, M.plastic);
    wf.position.set(0.040, WALL_Y, zs * 0.686);
    gal.add(wf);
    const wr = lib.cbox(0.282, WALL_H, WALL_T, 0.0015, M.plastic);
    wr.position.set(-1.141, WALL_Y, zs * 0.610);
    gal.add(wr);
    const ws = lib.cbox(WALL_T, WALL_H, 0.084, 0.0015, M.plastic);
    ws.position.set(-1.000, WALL_Y, zs * 0.648);
    gal.add(ws);
  }
  /* THE FRONT WALL, IN THREE PIECES BECAUSE THE CLOSEOUT'S LAP IS UNDER IT.
     It used to be 1.372 across. It now stops on the closeout's inner face
     at |z| 0.5933, which is what cornerHalf gives at this station less the
     closeout's own 0.7 mm sheet, and a first draft of this module drew it
     as one 1.1836 box on the pan top at y 0.1095. That put its outboard
     9.8 mm straight through the closeout's bottom lap, which is bonded to
     that same pan top and runs inboard to |z| 0.5820: three crossing
     triangle pairs, 5.09 mm deep, at (1.275, 0.110, 0.582). Nothing in the
     toolchain would have found it. tools/smoke.sh checks a module against
     its own metadata and tools/check-interfaces.sh deliberately does not
     test two parts of the SAME module against each other, so this was
     swept by hand, part against part, with the checker's own predicate.
     A wall standing on a pan that has a lap bonded to it stands on the lap
     where the lap is, so the outboard 11.3 mm of each end is a separate
     piece with its foot 0.7 mm higher and its top on the same plane. */
  const CC_LAP_Z = 0.5940 - 0.0120;              /* lap inboard edge, x > 1.268 */
  const CC_WEB_Z = 0.5940 - 0.0007;              /* web inner face */
  const wfront = lib.cbox(WALL_T, WALL_H, 2 * CC_LAP_Z, 0.0015, M.plastic);
  wfront.position.set(1.272, WALL_Y, 0);   /* 1.268 to 1.276: thermal's
                                              condensate riser reaches 1.2788 */
  gal.add(wfront);
  for (const zs of [-1, 1]) {
    const wl = CC_WEB_Z - CC_LAP_Z;
    const we = lib.cbox(WALL_T, WALL_H - 0.0007, wl, 0.0015, M.plastic);
    we.position.set(1.272, WALL_Y + 0.00035, zs * (CC_LAP_Z + wl / 2));
    gal.add(we);
  }
  const wrear = lib.cbox(WALL_T, WALL_H, 1.190, 0.0015, M.plastic);
  wrear.position.set(-1.282, WALL_Y, 0);
  gal.add(wrear);
  /* The fluid keeps battery-6's plan, |z| 0.670 and 0.595, everywhere the
     notch does not reach it. Over the notch it follows cornerHalf less the
     closeout's 0.7 mm sheet, so it stops ON the closeout's inner face and
     the open lane outboard of the cell stack narrows 20.0 mm to 4.3. The
     stack face at |z| 0.6500 is still inside the fluid, which is the test
     that matters: no inter-layer channel loses its feed. */
  /* The fluid gets its own outline rather than notchedPlan's, because the
     closeout's face is straight at |z| 0.6550 from x 1.080 while the lid,
     pan and shield chamfer down to it over the next 25 mm. The fluid has to
     follow the WALL, not the panels, so it tapers off battery-6's 0.670
     between x 1.060 and 1.080 and then runs on the closeout's inner face. */
  const poolPlan = [[-0.996, 0]];
  for (let i = 0; i <= 4; i++) {
    const a = Math.PI - (Math.PI / 2) * (i / 4);
    poolPlan.push([-0.996 + 0.010 + Math.cos(a) * 0.010, 0.660 + Math.sin(a) * 0.010]);
  }
  poolPlan.push([1.060, 0.670], [1.080, NOTCH_Z - POOL_GAP], [1.250, NOTCH_Z - POOL_GAP],
    [1.268, cornerHalf(1.268) - POOL_GAP], [1.268, 0]);
  const pool = plateOutline(poolPlan, POOL_T, M.coolant);
  pool.position.set(0, POOL_Y - POOL_T / 2, 0);
  gal.add(pool);
  const poolR = lib.box(0.278, POOL_T, 1.190, M.coolant);
  poolR.position.set(-1.139, POOL_Y + POOL_T / 2, 0);
  gal.add(poolR);
  /* Baffle ribs under the riser gaps, in seven segments so the pool can
     equalize between bays while the segments still break a slosh front. */
  for (const gx of GAPX) {
    for (let i = 0; i < 7; i++) {
      const rib = lib.cbox(0.013, 0.020, 0.164, 0.0015, M.plastic);
      rib.position.set(gx, POOL_Y + 0.010, -0.585 + i * 0.195);
      gal.add(rib);
    }
  }
  /* 0.585 rather than 0.600: at x 1.263 the notch line is |z| 0.6190 and a
     22 mm barrel to 0.600 reaches 0.611, which is inside it by 8 mm and was
     outside it before the disc step moved forward to x 1.250. 0.585 keeps
     23 mm and costs nothing: this is a distribution header, not a duct. */
  gal.add(lib.tube([[1.263, 0.1145, -0.570], [1.263, 0.1145, 0.570]], 0.011, M.coolant));
  /* Liquid feed stub. The barrel is where it has always been, x 1.247 to
     1.297 at (1.272, 0.118, 0.10), because thermal-7 and thermal-9 land
     their condensate flange over it from 1.286. What it gains is the male
     spigot hardware a slip joint has: a shoulder, two O-ring lands and a
     lead-in, all inside x 1.286 where the partner's flange begins. */
  const feed = lib.cyl(0.012, 0.05, M.coolant, 12);
  feed.rotation.z = Math.PI / 2;
  feed.position.set(1.272, 0.118, 0.10);
  gal.add(feed);
  /* Bulkhead collar clamping the pool wall the stub passes through. No bolt
     circle: the annulus between a 24 mm barrel and a 34 mm collar is 5 mm
     and any head that fits in it is a head half inside the pipe. */
  const feedCollar = lib.cbox(0.012, 0.034, 0.034, 0.0015, M.alu);
  feedCollar.position.set(1.272, 0.123, 0.10);    /* x 1.266 to 1.278 */
  gal.add(feedCollar);
  for (const zs of [-1, 1]) {
    /* The straight run ends at x 1.045 rather than 1.190. battery-7's own
       notes said every point on it forward of x 1.099 was inside wheels-9's
       front tire, and the notch makes that unarguable: at |z| 0.665 the
       header's outer wall is 0.676 and the notch line at x 1.105 is 0.6550.
       A 22 mm round header has nowhere to go forward of the notch, because
       the lane between the cell stack at |z| 0.6500 and the closeout's
       inner face at 0.6543 is 4.3 mm wide. The front crossover therefore
       stops being a tube: see the duct below. */
    gal.add(lib.tube(
      [[-1.00, 0.272, zs * 0.665], [1.045, 0.272, zs * 0.665]],
      0.011, M.coolantHot
    ));
    /* Riser from the header into the duct. */
    const vr = lib.cyl(0.011, 0.024, M.coolantHot, 10);
    vr.position.set(1.045, 0.2755, zs * 0.665);   /* y 0.2635 to 0.2875 */
    gal.add(vr);
    /* Riser take-offs: the header collects from the inter-brick gaps, so it
       gets a spigot over each one rather than running past them blind. Five
       per side, the four inter-brick gaps and the aft end gap at x -0.984,
       and there is no sixth. A pair was first drawn at x 1.256 over the gap
       ahead of the last brick, which is 58 mm past the end of the header it
       takes off from: it stood in open air on one side and speared the brick
       string take-off on the other. A take-off cannot be forward of its
       header, and at Gen 10 the header's barrel stops at x 1.045 because a
       22 mm round section has nowhere to go once the notch takes the
       corner, so the forward gap vents aft under the lid instead. */
    for (const gx of GAPX.concat([-0.984])) {
      const t = lib.cyl(0.008, 0.016, M.coolantHot, 8);
      t.position.set(gx, 0.264, zs * 0.665);
      gal.add(t);
    }
    /* P-clips to the rail bond bead every 380 mm: the header used to hang
       in air 44 mm off the nearest structure */
    for (let i = 0; i < 6; i++) {
      const cx2 = -0.90 + i * 0.38;
      const clip = lib.cbox(0.014, 0.026, 0.040, 0.0012, M.plasticLt);
      clip.position.set(cx2, 0.272, zs * 0.679);   /* |z| 0.659 to 0.699 */
      gal.add(clip);
    }
  }
  /* THE FRONT CROSSOVER IS NOW A FLATTENED DUCT, and this is the fix
     battery-7 said it could not make. Its verification notes list five
     defects older than its detail pass, and the first is this one: "The
     front vapor crossover runs inside the fifth brick. The tube spans
     x 1.179 to 1.246 at y 0.259 to 0.283 and the brick top is 0.2755, so
     16.5 mm of a 22 mm tube is inside the stack for the whole 1.3 m of z...
     Routing it forward of the end plate at x 1.249 is the answer and that
     corner already holds the string terminal, its boot and the brick
     take-off cable, so it is a re-draw of the pack's front corner." This
     module IS that re-draw, and the answer turns out to be neither routing
     it forward nor leaving it in the stack. It is changing the section.

     A round 22 mm tube needs 22 mm of height and there is none: the brick
     top is 0.2755, the sensing film sheet sits on 0.2759 to 0.2775 and its
     210 tap foils reach 0.2827, and the floor-lid skin's underside is
     0.2900. That leaves 7.3 mm over the taps. A 6 by 76 mm duct is 456 mm2
     against the round header's 380, so the flow area goes UP, and it lands
     at y 0.2832 to 0.2892 with 0.5 mm over the tallest tap and 0.8 mm under
     the lid. Nothing of it is inside the stack. The branch to the vapor
     stub runs the same section forward at z -0.10 to x 1.250, which is the
     first millimeter clear of the fifth brick's end plate, and a short
     transition drops it onto the stub barrel. */
  const vDuct = lib.cbox(0.076, 0.0060, 1.330, 0.0012, M.coolantHot);
  vDuct.position.set(1.040, 0.2862, 0);          /* x 1.002..1.078, aft of
                                                    the closeout at 1.080 */
  gal.add(vDuct);
  const vBranch = lib.cbox(0.172, 0.0060, 0.080, 0.0012, M.coolantHot);
  vBranch.position.set(1.164, 0.2862, -0.10);    /* x 1.078..1.250 */
  gal.add(vBranch);
  const vDrop = lib.cbox(0.016, 0.0212, 0.040, 0.0015, M.coolantHot);
  vDrop.position.set(1.258, 0.2786, -0.10);      /* x 1.250..1.266, y 0.268..0.2892 */
  gal.add(vDrop);
  /* Vapor stub, unmoved at (1.272, 0.268, -0.10) with its face on x 1.297,
     now closing on thermal's riser flange as the bolted pair it is: a
     matched 48 mm flange from 1.284 to 1.296 with four heads on the
     accessible side. thermal-7 and thermal-9 both start theirs at 1.296. */
  const vap = lib.cyl(0.017, 0.05, M.coolantHot, 12);
  vap.rotation.z = Math.PI / 2;
  vap.position.set(1.272, 0.268, -0.10);
  gal.add(vap);
  /* 48 mm across in z to match thermal's, trimmed to 43.5 mm in height: a
     square 48 tops out at y 0.292 and the floor-lid skin's underside is
     0.290, so the corners went into the lid. */
  const vflange = lib.cbox(0.012, 0.0435, 0.048, 0.002, M.alu);
  vflange.position.set(1.290, 0.268, -0.10);
  gal.add(vflange);
  for (const dy of [-0.0155, 0.0155]) {
    for (const dz of [-0.0155, 0.0155]) {
      const b = lib.fastener(0.005, M.darkSteel, 'hex');
      b.rotation.z = Math.PI / 2;
      b.position.set(1.284, 0.268 + dy, -0.10 + dz);
      gal.add(b);
    }
  }
  /* Keyed fill standpipe: threaded collar, hex cap, lockwire tab. */
  const fill = lib.cyl(0.010, 0.16, M.coolant, 12);
  fill.position.set(-1.02, 0.192, 0.30);
  gal.add(fill);
  const collar = lib.cyl(0.014, 0.012, M.alu, 12);
  collar.position.set(-1.02, 0.266, 0.30);
  gal.add(collar);
  const fillCap = lib.mesh(new THREE.CylinderGeometry(0.0115, 0.0135, 0.010, 6), M.plasticLt);
  fillCap.position.set(-1.02, 0.277, 0.30);
  gal.add(fillCap);
  const wireTab = lib.cbox(0.004, 0.006, 0.016, 0.0008, M.darkSteel);
  wireTab.position.set(-1.02, 0.279, 0.316);
  gal.add(wireTab);
  /* Pool level probe. Die temperature sits ahead of pool level in the
     disconnect's trip chain, and this is what reads it. It stands on the pan
     top at 0.1095 rather than starting 5.5 mm above it, and it sits on
     x -1.02 opposite the fill standpipe rather than on -1.05, where the
     disconnect's rear HV lead passes through the rod. */
  const probe = lib.cyl(0.004, 0.1555, M.steel, 8);
  probe.position.set(-1.02, 0.18725, -0.30);   /* y 0.1095 to 0.2650 */
  gal.add(probe);
  const probeHead = lib.cbox(0.028, 0.020, 0.024, 0.0015, M.plasticLt);
  probeHead.position.set(-1.02, 0.275, -0.30);
  gal.add(probeHead);
  const float = lib.cyl(0.011, 0.010, M.plasticLt, 10);
  float.position.set(-1.02, 0.1185, -0.30);
  gal.add(float);
  sys.add(gal);

  /* ── sensing film: one sheet across every brick top with a tap comb at
     each layer, the acoustic channels that listen for the boiling-regime
     shift, the rear-bay aggregator and its two flat tails ── */
  const film = lib.part('sensefilm', [0, 0.55, 0]);
  const sheet = lib.box(2.24, 0.0016, 1.26, M.pcb);
  sheet.position.set(0.13, 0.2767, 0);
  film.add(sheet);
  /* 210 tap foils, one per layer, standing off the brick top edge and
     folding into the sheet: 41 of every 42 layers in a bipolar brick have
     no external terminal and this is the only thing that reaches them. */
  const tapGeo = new THREE.BoxGeometry(0.0055, 0.0072, 0.010);
  const taps = new THREE.InstancedMesh(tapGeo, M.busbar, BX.length * LAYERS);
  taps.castShadow = taps.receiveShadow = true;
  let t2 = 0;
  for (const cx of BX) {
    for (let i = 0; i < LAYERS; i++) {
      dummy.position.set(cx + (i - (LAYERS - 1) / 2) * LPITCH, 0.2791, 0.6385);
      dummy.updateMatrix();
      taps.setMatrixAt(t2++, dummy.matrix);
    }
  }
  taps.instanceMatrix.needsUpdate = true;
  film.add(taps);
  /* 20 piezo channels: this generation made dryout the primary risk and
     these are the witnesses that see it before any temperature does. */
  for (let i = 0; i < 20; i++) {
    const px = -0.90 + (i % 10) * 0.21;
    const pz = i < 10 ? -0.56 : 0.56;
    const pz2 = lib.cyl(0.009, 0.0026, M.steel, 10);
    pz2.position.set(px, 0.2788, pz);
    film.add(pz2);
  }
  const agg = lib.cbox(0.096, 0.016, 0.064, 0.0015, M.pcb);
  agg.position.set(-1.13, 0.1275, 0.31);
  film.add(agg);
  const aggLid = lib.cbox(0.084, 0.0035, 0.054, 0.0010, M.plasticLt);
  aggLid.position.set(-1.13, 0.1372, 0.31);
  film.add(aggLid);
  for (const cz of [-0.024, 0.024]) {
    const conn = lib.cbox(0.020, 0.010, 0.014, 0.0010, M.plasticLt);
    conn.position.set(-1.087, 0.1275, 0.31 + cz);
    film.add(conn);
  }
  for (const ez of [-1, 1]) {
    const ear = lib.cbox(0.016, 0.004, 0.014, 0.0008, M.pcb);
    ear.position.set(-1.13, 0.1215, 0.31 + ez * 0.039);
    film.add(ear);
    const s = hexHead(0.0045, 0.0026, M.darkSteel);
    s.position.set(-1.13, 0.1235, 0.31 + ez * 0.039);
    film.add(s);
  }
  const tailA = [[-0.995, 0.276, 0.20], [-1.06, 0.20, 0.26], [-1.10, 0.135, 0.30]];
  const tailB = [[-0.995, 0.276, 0.44], [-1.07, 0.19, 0.38], [-1.095, 0.135, 0.325]];
  film.add(lib.tube(tailA, 0.0035, M.pcb));
  film.add(lib.tube(tailB, 0.0035, M.pcb));
  for (const [tp, tf] of [[tailA, 0.55], [tailB, 0.55]]) {
    const p0 = tp[1];
    const clip = lib.cbox(0.010, 0.014, 0.010, 0.0008, M.plasticLt);
    clip.position.set(p0[0], p0[1], p0[2]);
    film.add(clip);
  }
  sys.add(film);

  /* ── semiconductor disconnect: rear bay under the hatch, cold plate on
     the gallery liquid loop with the two pipes that feed it, SiC power
     module with its terminals and driver connectors, a real fin stack, the
     pyro backup and the manual service disconnect with its lockout ── */
  const disc = lib.part('disconnect', [0, 0.5, 0.3]);
  const coldplate = lib.cbox(0.16, 0.012, 0.12, 0.0018, M.coolant);
  coldplate.position.set(-1.13, 0.1245, 0.45);
  disc.add(coldplate);
  /* Four feet down to the pan. The plate used to float 9 mm over it. */
  for (const fx of [-0.062, 0.062]) {
    for (const fz of [-0.042, 0.042]) {
      const foot = lib.cbox(0.016, 0.0090, 0.016, 0.0010, M.alu);
      foot.position.set(-1.13 + fx, 0.1140, 0.45 + fz);
      disc.add(foot);
    }
  }
  /* The cold plate shares the gallery liquid, so it is plumbed to it. */
  for (const [pz3, pr] of [[-0.062, 0.0065], [0.062, 0.0065]]) {
    const port = lib.cyl(pr, 0.014, M.coolant, 10);
    port.rotation.x = Math.PI / 2;
    port.position.set(-1.13, 0.1245, 0.45 + pz3 * 1.1);
    disc.add(port);
  }
  disc.add(lib.tube([[-1.13, 0.1245, 0.518], [-1.13, 0.118, 0.560], [-1.13, 0.1145, 0.585]],
    0.0055, M.coolant));
  /* The return runs FORWARD off the plate rather than inboard: the film
     aggregator occupies x -1.178..-1.082 over z 0.264..0.356 with its
     mounting ears, and the first route through that box put 5 mm of pipe
     inside it. */
  disc.add(lib.tube([[-1.13, 0.1245, 0.382], [-1.095, 0.1200, 0.372], [-1.062, 0.1145, 0.360]],
    0.0055, M.coolant));
  /* SiC power module: baseplate, molded housing, two DC terminals with
     bolted lugs, and the gate-driver board with its control connector. */
  const modBase = lib.cbox(0.144, 0.006, 0.104, 0.0012, M.alu);
  modBase.position.set(-1.13, 0.1335, 0.45);
  disc.add(modBase);
  const sicBlock = lib.cbox(0.132, 0.028, 0.094, 0.0025, M.plastic);
  sicBlock.position.set(-1.13, 0.1505, 0.45);
  disc.add(sicBlock);
  for (const ts of [-1, 1]) {
    const term = lib.cbox(0.026, 0.006, 0.028, 0.0010, M.busbar);
    term.position.set(-1.13 + ts * 0.079, 0.1665, 0.45);
    disc.add(term);
    const tn = hexHead(0.0055, 0.0035, M.darkSteel);
    tn.position.set(-1.13 + ts * 0.079, 0.1695, 0.45);
    disc.add(tn);
  }
  const driver = lib.cbox(0.100, 0.0022, 0.060, 0.0006, M.pcb);
  driver.position.set(-1.13, 0.1665, 0.408);
  disc.add(driver);
  const dconn = lib.cbox(0.026, 0.010, 0.012, 0.0010, M.plasticLt);
  dconn.position.set(-1.088, 0.1720, 0.408);
  disc.add(dconn);
  /* Fin stack: 21 blades at 4.5 mm pitch on a 4 mm base, seated on the
     module top at 0.1705, against the seven 4 mm slabs that were there. */
  const finBase = lib.cbox(0.130, 0.004, 0.094, 0.0010, M.alu);
  finBase.position.set(-1.13, 0.1725, 0.45);
  disc.add(finBase);
  const finGeo = new THREE.BoxGeometry(0.124, 0.020, 0.0013);
  const finInst = new THREE.InstancedMesh(finGeo, M.alu, 21);
  finInst.castShadow = finInst.receiveShadow = true;
  for (let i = 0; i < 21; i++) {
    dummy.position.set(-1.13, 0.1845, 0.45 + (i / 20 - 0.5) * 0.090);
    dummy.updateMatrix();
    finInst.setMatrixAt(i, dummy.matrix);
  }
  finInst.instanceMatrix.needsUpdate = true;
  disc.add(finInst);
  /* Pyro fuse: a real cylindrical body with two bolted lugs and an
     initiator connector, bracketed down to the pan. */
  const pyro = lib.cyl(0.019, 0.050, M.hv, 14);
  pyro.rotation.x = Math.PI / 2;
  pyro.position.set(-1.02, 0.140, 0.45);
  disc.add(pyro);
  for (const ps of [-1, 1]) {
    const lug = lib.cbox(0.020, 0.005, 0.012, 0.0010, M.busbar);
    lug.position.set(-1.02, 0.140, 0.45 + ps * 0.030);
    disc.add(lug);
    const ln = hexHead(0.0048, 0.0030, M.darkSteel);
    ln.rotation.x = ps > 0 ? Math.PI / 2 : -Math.PI / 2;
    ln.position.set(-1.02, 0.140, 0.45 + ps * 0.036);
    disc.add(ln);
  }
  const init = lib.cbox(0.014, 0.014, 0.012, 0.0010, M.plasticLt);
  init.position.set(-1.02, 0.164, 0.428);
  disc.add(init);
  const pyroFoot = lib.cbox(0.026, 0.032, 0.010, 0.0010, M.alu);
  pyroFoot.position.set(-1.02, 0.1255, 0.472);
  disc.add(pyroFoot);
  const loop = lib.torus(0.018, 0.004, M.plasticLt, 20, 8);
  loop.position.set(-1.02, 0.176, 0.462);
  disc.add(loop);
  /* Manual service disconnect. Under the hatch, in the one part of the
     rear bay nothing else uses: x -1.273 to -1.203, aft of the cold plate
     and outboard of nothing. Base, plug, bail handle to 0.2865 with 3.5 mm
     of air under the lid skin, padlock hasp, and the interlock connector
     that has to open before the plug will lift. */
  const MSD_X = -1.238, MSD_Z = 0.38;
  const msdBase = lib.cbox(0.070, 0.062, 0.090, 0.0025, M.plasticLt);
  msdBase.position.set(MSD_X, 0.1525, MSD_Z);
  disc.add(msdBase);
  for (const fx of [-0.026, 0.026]) {
    for (const fz of [-0.034, 0.034]) {
      const leg = lib.cbox(0.010, 0.012, 0.010, 0.0008, M.alu);
      leg.position.set(MSD_X + fx, 0.1155, MSD_Z + fz);
      disc.add(leg);
    }
  }
  const msdPlug = lib.cbox(0.052, 0.042, 0.070, 0.0025, M.hv);
  msdPlug.position.set(MSD_X, 0.2045, MSD_Z);
  disc.add(msdPlug);
  for (const hs of [-1, 1]) {
    const arm = lib.cbox(0.012, 0.038, 0.010, 0.0010, M.darkSteel);
    arm.position.set(MSD_X, 0.2445, MSD_Z + hs * 0.030);
    disc.add(arm);
  }
  const grip = lib.cbox(0.014, 0.012, 0.070, 0.0025, M.darkSteel);
  grip.position.set(MSD_X, 0.2695, MSD_Z);
  disc.add(grip);
  const hasp = lib.cbox(0.004, 0.020, 0.014, 0.0008, M.steel);
  hasp.position.set(MSD_X + 0.027, 0.2280, MSD_Z);
  disc.add(hasp);
  const shackle = lib.torus(0.0065, 0.0018, M.steel, 12, 6);
  shackle.rotation.y = Math.PI / 2;
  shackle.position.set(MSD_X + 0.027, 0.2340, MSD_Z);
  disc.add(shackle);
  const ilock = lib.cbox(0.016, 0.014, 0.020, 0.0010, M.plasticLt);
  ilock.position.set(MSD_X - 0.031, 0.1680, MSD_Z);
  disc.add(ilock);
  const msdWarn = lib.badge(warnTri.map(([a, b]) => [a * 0.55, b * 0.55]), 0.0012, M.busbar,
    { holes: [warnBolt.map(([a, b]) => [a * 0.55, b * 0.55])] });
  msdWarn.position.set(MSD_X, 0.1560, MSD_Z + 0.045);
  disc.add(msdWarn);
  /* The two HV leads, now clipped rather than floating. */
  const leadA = [[-1.005, 0.24, -0.52], [-1.10, 0.21, -0.15], [-1.17, 0.175, 0.20],
                 [-1.145, 0.150, 0.38]];
  const leadB = [[-1.050, 0.2845, 0.712], [-1.068, 0.256, 0.650], [-1.098, 0.214, 0.570],
                 [-1.150, 0.174, 0.500]];
  disc.add(lib.tube(leadA, 0.009, M.hv));
  disc.add(lib.tube(leadB, 0.009, M.hv));
  for (const p of [leadA[1], leadA[2], leadB[1], leadB[2]]) {
    const clip = lib.cbox(0.014, 0.016, 0.014, 0.0010, M.plasticLt);
    clip.position.set(p[0], p[1] - 0.010, p[2]);
    disc.add(clip);
  }
  sys.add(disc);

  /* ── underfloor strike shield: ONE continuous formed titanium panel now,
     not two flat plates butted at x -0.96. Its underside is on y 0.1025,
     level with body-7's floor strakes and 3.5 mm under its venturi closeout
     plane at 0.106; its five stiffening beads and two fastener lands press
     2 mm UP into the 3.5 mm stack, so the lowest surface on the car is
     still an unbroken land and ground clearance is unchanged to the
     micron. The 26 flush heads sit in the fastener lands, 0.4 mm above the
     surrounding skin rather than buried inside it where nothing could see
     them. Two folded edge flanges bolt to the rocker bond rails at |z|
     0.720 so the strike load path is skin, flange, rail, body ── */
  const shield = lib.part('strikeshield', [0, -0.62, 0]);
  const sSec = [];
  for (let r = 0; r < SHIELD_STA.length; r++) {
    const [sx, H] = SHIELD_STA[r];
    const end = r === 0 || r === SHIELD_STA.length - 1;
    const yb = end ? SK_LO + SK_ROLL : SK_LO;
    const yt = end ? SK_HI - SK_ROLL : SK_HI;
    const roll = Math.min(SK_ROLL, (yt - yb) / 3);
    const w = H - SK_ROLL;
    const ring = [];
    for (let j = 0; j <= SK_NB; j++) ring.push([sx, yb, (-1 + (2 * j) / SK_NB) * w]);
    ring.push([sx, yb + roll, H], [sx, yt - roll, H]);
    for (let j = SK_NB; j >= 0; j--) ring.push([sx, yt, (-1 + (2 * j) / SK_NB) * w]);
    ring.push([sx, yt - roll, -H], [sx, yb + roll, -H]);
    sSec.push(ring);
  }
  const col = (t) => (t + 1) * (SK_NB / 2);
  const SPAN = [0.9, 10.4], RUNOUT = 0.4;
  const grooves = [];
  for (const t of [-0.60, -0.30, 0, 0.30, 0.60]) {
    grooves.push({ col: col(t), width: 0.045, depth: 0.002, span: SPAN, runout: RUNOUT });
  }
  for (const t of [-SK_FAST_T, SK_FAST_T]) {
    grooves.push({ col: col(t), width: 0.030, depth: 0.002, span: SPAN, runout: RUNOUT });
  }
  const skin = lib.loft(sSec, M.alu, true, {
    interp: 'linear', grooves, crease: 34,
  });
  lib.shell(skin);
  shield.add(skin);
  /* 26 flush heads, seated on the fastener land floor at 0.1045 and
     following the land as it follows the panel outline through the waist.
     Head bottoms measure 0.1029: inside the 3.5 mm stack, 1.6 mm clear of
     the airstream, and visible from below because the land is a 30 mm
     channel rather than a hole nobody cut. */
  const fastX = [];
  /* 195 mm pitch, not 200: at 200 the twelfth station lands on x 1.260 and
     the liquid feed manifold runs x 1.252..1.274 with its underside inside
     the shield stack, so two heads grew into it. */
  for (let i = 0; i < 12; i++) fastX.push(-0.94 + i * 0.195);
  fastX.push(-1.205);
  for (const fx of fastX) {
    for (const zs of [-1, 1]) {
      const f = lib.fastener(0.005, M.steel, 'hex', { height: 0.0010, flange: 0.0064, flangeT: 0.0004 });
      f.rotation.z = Math.PI;
      f.position.set(fx, 0.10435, zs * SK_FAST_T * (shieldHalf(fx) - SK_ROLL));
      shield.add(f);
    }
  }
  /* Folded edge flanges. A 2 mm strip: a lap on the skin top at 0.1060
     outboard of the pan edge, a 45 degree kick up and out, and a vertical
     web against the rail inner face from 0.1250 to 0.1440. */
  for (const zs of [-1, 1]) {
    const fl = extrudeX([
      [zs * 0.6905, 0.1060], [zs * 0.7020, 0.1060], [zs * 0.7200, 0.1240],
      [zs * 0.7200, 0.1440], [zs * 0.7180, 0.1440], [zs * 0.7180, 0.1250],
      [zs * 0.7010, 0.1080], [zs * 0.6905, 0.1080],
    ], null, 2.14, M.alu, 30);
    fl.position.x = -1.06;
    shield.add(fl);
    /* the glass isolation ply that keeps titanium off the aluminum rail */
    const ply = extrudeX([
      [zs * 0.7180, 0.1250], [zs * 0.7175, 0.1250], [zs * 0.7175, 0.1440],
      [zs * 0.7180, 0.1440],
    ], null, 2.14, M.white, 30);
    ply.position.x = -1.06;
    shield.add(ply);
    for (let i = 0; i < 8; i++) {
      const b = lib.fastener(0.005, M.darkSteel, 'hex');
      b.rotation.x = zs > 0 ? -Math.PI / 2 : Math.PI / 2;
      b.position.set(-1.00 + i * 0.29, 0.1345, zs * 0.7175);
      shield.add(b);
    }
  }
  sys.add(shield);

  /* ── front corner closeout: the wall the notch forced somebody to draw.
     A folded 0.7 mm titanium C, 12 mm lap on the pan top at y 0.1095, a
     180.5 mm web, a 12 mm land under the floor-lid skin at y 0.2893, run
     along the notch line from the rocker rail's forward end to the lid's
     front edge. Its outer face is a constant |z| 0.6550 rather than a copy
     of cornerHalf, because the lid, pan and shield chamfer down onto it
     over x 1.080 to 1.105 and a wall that followed them there would reach
     |z| 0.6900 and break the extent max this part declares. Forward of
     x 1.250 it takes the same step to 0.5940 the panels take, which is what
     clears the brake disc.

     THE ENDS ARE NOT CAPPED AND THAT IS DELIBERATE. lib.loft closes the
     section ring and does not cap the run, so this is an open-ended tube
     whose opening is the 0.7 mm C-shaped edge of the sheet itself, 0.7 mm
     wide. Aft it butts the rocker rail at x 1.080 and forward it stops on
     the lid's front edge at 1.290, so both openings are closed by
     adjacency in the assembly. tools/check-interfaces.sh names it among
     the pack meshes that are not closed surfaces, alongside six of
     battery-7's, and covers it by the crossing test rather than by ray
     parity. Capping it would be 32 triangles of geometry behind a 0.7 mm
     slit, which is the definition of a decal with a triangle budget. ── */
  const CC_LAND = 0.0120;
  const CC_STA = [1.080, 1.250, 1.268, 1.290];
  for (const zs of [-1, 1]) {
    const cc = lib.part('cornerclose', [0, 0.10, zs * 0.85]);
    const secs = [];
    for (const sx of CC_STA) {
      const h = Math.min(NOTCH_Z, cornerHalf(sx));
      const ring = [
        [sx, 0.1095, h],
        [sx, 0.2900, h],
        [sx, 0.2900, h - CC_LAND],
        [sx, 0.2893, h - CC_LAND],
        [sx, 0.2893, h - SHEET_T],
        [sx, 0.1102, h - SHEET_T],
        [sx, 0.1102, h - CC_LAND],
        [sx, 0.1095, h - CC_LAND],
      ].map(([a, b, c]) => [a, b, zs * c]);
      /* the -z instance is a mirror, so its ring winds the other way and
         would render inside out against M.alu's front-side default */
      secs.push(zs > 0 ? ring : ring.slice().reverse());
    }
    cc.add(lib.loft(secs, M.alu, true, { interp: 'linear', crease: 30 }));
    sys.add(cc);
  }

  return sys;
}

/* ── Verification notes (measured off partner build geometry, not prose) ──

   Envelope, measured per vertex after the detail pass, and unchanged by it:
   every mesh sits inside x [-1.2900, 1.3000], y [0.1025, 0.3080],
   z [-0.7800, 0.7800]. The x maximum is the shield skin at 1.300 and the
   vapor stub at 1.297, both of which have to reach that far and both of
   which are inside design/gen4.md's x [-1.30, 1.30]. The y minimum is the
   shield's unbroken 0.10250 land and the y maximum is the seat rail tops at
   0.30800, exactly as before. Geometry outboard of |z| 0.71 is the rocker
   bond rails at |z| 0.72 to 0.78, the floor-lid's bonded perimeter land at
   0.698 to 0.744, the shield edge flanges and their bolts at 0.690 to 0.720
   (0.7210 before: the flange web now stops ON the rail inner face instead of
   1 mm past it), the disconnect's raceway lead at 0.716 and the brick
   take-off at 0.708. All of it lies in x [-1.06, 1.08], which is battery-3's
   carried rocker exception. The land at 0.744 is the one item this pass adds
   to that list and the reason is that the lid is specified as bonded to the
   rails and used to stop 10 mm short of them.

   Triangles and MERGED meshes, three states, one sweep of the built mesh
   over all three. The first column is battery-7 before its detail pass, the
   second is battery-7 as shipped, the third is this module. js/merge.js
   welds static same-material meshes inside each part, so the mesh column is
   the draw-call count the viewer actually issues and is the budget that
   binds; SPEC.md and HANDOFF.md both say so.

     part           pre-pass  battery-7  battery-10   merged meshes
     bricks            3,024     12,960      13,344     6      take-off rerouted
     strikeshield      1,552      4,952       5,168     5      notch + closeout line
     galleries         1,728      4,704       4,468     7      pool wall trimmed,
                                                              then split in three
     sensefilm           600      4,308       4,308     5      unchanged
     disconnect        1,208      3,728       3,728    10      unchanged
     floorlid            844      2,920       2,800     8      notch
     bands               720      2,580       2,580     1      unchanged
     rockerrails         444      2,192       2,192     9      unchanged
     cornerclose           0          0          96     2      new
     total            10,120     38,344      38,684    53

   38,684 against gen10.md's 42,000 budget for this module and SPEC.md's
   60,000 per system, and 53 merged meshes against gen10.md's 58 from
   battery-7's 51. The notch is a net PLUS of 340 triangles rather than a
   saving, and the reason is worth stating: cutting a rounded rectangle into
   a station-table outline replaces two-corner geometry with five-station
   geometry on three panels, the closeout is 96 triangles that did not
   exist, and the pool front wall is three boxes instead of one because the
   closeout's lap is under its ends. Raw mesh count goes 528 to 535 and
   merges to 53 either way, because every one of those additions lands in a
   material bucket the part already had.

   Mass is 385.1 kg: 325 + 6 + 19 + 11.9 + 5 + 3 + 4 + 10.9 + 0.3, against
   battery-7's 385.0 and gen10.md's ceiling of 388. The header carries the
   arithmetic. The one line to carry forward is that the notch removes
   0.067 kg of shield and 0.078 kg of lid, measured as plan area by 1 mm
   slice integration of the built skins over both modules, and the closeout
   adds 0.324. It also deletes a pool retaining wall of exactly known volume
   and unknown polymer, 0.10 to 0.16 kg, which is the one figure in this
   ledger that cannot be closed and which sits inside the galleries line's
   whole kilogram either way. The declared +0.1 is the heavy end of the
   resulting band and that direction is deliberate, because a pack declared
   heavier than it is loses range rather than gaining it. No energy number
   in js/efficiency.js moves; the mass the integrator sums does, by a tenth
   of a kilogram and 0.07 miles.

   Strike shield, measured on the built skin. The panel is one closed loft
   through twelve stations with linear interpolation, so its plan outline is
   its station table and nothing between stations can bulge. Swept at
   x 0.200 the underside reads 0.10250 on the lands and 0.10450 on the seven
   channel floors, at |z| 0.0, 0.20, 0.41 and 0.594; the two at 0.594 are the
   fastener lands. All 26 heads measure y 0.10295 at their lowest, 0.45 mm
   above the land plane and 1.55 mm inside the 3.5 mm stack. Ground clearance
   is therefore unchanged to the micron and the fasteners are visible from
   below for the first time, where before they were cylinders coplanar with
   the skin's own underside and could only ever have z-fought with it.

   Waist, measured per vertex. Nothing aft of x -1.095 sits outboard of
   |z| 0.6150. The lid and pan reach exactly 0.6150, the shield 0.6100, the
   disconnect lead 0.5923, the film 0.3400.

   Floor datum, from body-7's build(). lib.plate places its slab from y + t/2
   to y + 3t/2, so plate position arguments are not undersides and every
   number here is measured. closeF is lib.plate(0.78, 1.24, 0.012) at
   (1.71, 0.10, 0) and closeR is lib.plate(0.62, 1.24, 0.012) at
   (-1.625, 0.10, 0): both closeout undersides measure y 0.10600. The floor
   strakes are lib.box(0.60, 0.055, 0.010) at (-1.63, 0.13, ±0.21 / ±0.50)
   and measure y 0.10250 to 0.15750, spanning x -1.93 to -1.33, so the
   strakes and not the closeouts are the car's lowest underbody surface.
   This shield's underside measures 0.10250, level with them, and its
   fasteners sit inside the skin rather than below it, so the pack's lowest
   vertex is 0.10250 and ground clearance is unchanged. battery-6's pan
   underside measures 0.13200 and its rocker rail bottom 0.13000. In x,
   closeF starts at 1.32 and the shield ends at 1.30 (20 mm gap); closeR ends
   at -1.315 and the shield ends at -1.29 (25 mm gap); the strakes end at
   -1.33, 40 mm clear of the pack's rear wall, and they are the reason the
   pack does not grow aft along the floor.

   Aft face, from suspension-4's build(). The rear subframe forward
   crossmember measures x [-1.400, -1.320], y [0.215, 0.285]; the rear-steer
   housing and its motor measure x [-1.424, -1.312], y [0.137, 0.218]. The
   pack rear wall at x -1.290 clears the nearest of those by 22 mm. A sixth
   brick needs 448 mm of pitch. The rear bay from the last brick face at
   x -0.976 to the rear wall is 318 mm and every millimeter of it holds the
   disconnect, the film aggregator and the fill standpipe, and even
   surrendering all of it leaves the brick 130 mm short; growing the wall aft
   buys 22 mm before suspension-4. Named as a Gen 8 lever, not a near miss.

   hv-4 interface, measured. Its 'hv-runs' pack feed reaches down to y 0.3040
   at (-1.13, ~0.315, 0.38); this lid's hatch is now a landing rim, gasket
   and cover stack rather than battery-6's single slab, and it measures
   y 0.3020 at the rim's foot to 0.3070 at the cover face, with that face
   spanning x -1.271 to -0.989 and z 0.259 to 0.501. The face is the plane
   and the height battery-6 handed over, so the feed rises off it exactly as
   it did. Its ring rear leg
   measures x [-1.135, -1.125], |z| [0.595, 0.605], underside y 0.3020; the
   lid skin top is 0.3020 and the tallest thing on it is a seat rail at
   0.3080, and the rails sit at |z| 0.28 and 0.52 between the legs at 0.60,
   which is battery-6's condition carried unchanged. Its converter measures
   one box x [-1.530, -1.210], y [0.360, 0.490], z ±0.220 with one HV input
   boss at x [-1.557, -1.527], y [0.434, 0.466], z [0.084, 0.116]: one
   conversion front end, and its own spec row reads 300 to 870 V input, so
   210 layers at 4.10 V giving 861 land inside it. Its v2g-port spec carries
   630 A of DC pin capability and this pack uses 430, so about 200 A is
   stranded by the pack rather than by the infrastructure.

   thermal-7 interface, measured after thermal-7 was reconciled mid-review.
   Vapor: this stub measures x [1.247, 1.297], y [0.251, 0.285],
   z [-0.117, -0.083] and thermal-7's riser flange measures x [1.296, 1.308],
   y [0.2446, 0.2914], z [-0.124, -0.076], so they meet over 1 mm of x.
   Liquid: this feed stub measures x [1.247, 1.297], y [0.106, 0.130] at
   (1.272, 0.118, 0.10), 29 mm below battery-6's BUILT stub at
   (1.272, 0.147, 0.10) rather than the 32 mm battery-6's prose implies, and
   thermal-7's condensate flange now measures x [1.286, 1.298],
   y [0.104, 0.132], z [0.086, 0.114]. They overlap by 11 mm of x. Both
   joints closed. That flange also crosses the strike shield skin by 2 mm at
   x [1.286, 1.298]: the return penetrates the shield plane at the pack's
   front lower corner, which is a sealed grommet in the real part and is
   recorded here rather than nudged out of sight. Design heat load 15 kW,
   down from 25. Open between the two modules and stated on the galleries
   panel: the ~19 kg of fluoroketone in this pool, which thermal-7 carries
   and cannot fit inside its 52 kg target. Neither module double-counts it.

   wheels-7 and drivetrain-7, both sides, measured after they landed. The
   waist was drawn from the contract before either existed. Re-checked by
   sweeping every wheels-7 rear-corner vertex through suspension-4's ±3
   degrees of rear steer about (-1.45, 0.355, ±0.74) in 0.25 degree steps:
   the rear tire inner face is |z| 0.66250 static and 0.64596 swept, so the
   contract flange was 12.5 mm more conservative than the built tire and the
   waist at 0.615 clears the swept solid by 30.96 mm rather than the 14 mm it
   was drawn to. No recut needed. The swept tire's leading edge is x -1.0908
   and the rocker rail ends at -1.06, so the rail clears it by 30.8 mm in x,
   which is the only clearance holding those two apart: they overlap in both
   y and |z|. The annulus contract itself holds on both sides. wheels-7 puts
   ZERO vertices inside r 0.155 to 0.235 over |z| 0.65 to 0.73 across tires,
   rear wheels, covers and park brake, and puts 328 vertices exactly on the
   |z| 0.650 flange plane out to r 0.2440. drivetrain-7 fills it: rotor rings
   r 0.1880 to 0.2330 over |z| 0.6500 to 0.7280 with 2,136 vertices on the
   flange plane, stator rings up to r 0.1972 over |z| 0.636 to 0.726 with
   1,944. Explode matches: drivetrain-7 rings ±0.90 and corner groups ±0.78,
   wheels-7 rear wheels and park brake ±0.78. Two observations handed on
   rather than acted on. First, drivetrain-7's stator rings run inboard to
   |z| 0.636 and down to r 0.127, outside the contracted band on the inboard
   side; that space is not wheels-7's and it clears this pack (nearest
   approach 41 mm in x), but wheels-7's own note records the stator as
   r 0.1552 over |z| 0.620, which is not what it measures. Second,
   suspension-4's rear geometry was never relocated for the |z| 0.74 corner
   and it fouls it: against wheels-6 the rear-steer to rear-wheel overlap is
   1.7 mm and against wheels-7 it is 58 mm, with new overlaps appearing at
   the rear-steer to tire (46 mm), active damper to rear wheel (10 mm) and
   air spring to rear wheel (8 mm) pairs. None of that touches this pack;
   wheels-7 enumerates the same fouls and suspension-4's owner has the fix.

   Attachment, per mesh, re-swept mesh by mesh rather than part by part,
   because tools/check-interfaces.sh asks whether a PART touches another part
   and will pass a part that carries one detached mesh inside it. Two did.
   The forward vapor riser take-offs stood 9.8 mm clear of anything on the
   driver side and only touched the brick string take-off, which they
   pierced, on the passenger side; they are gone, and the reason is with the
   loop that builds them. The pool level probe hung 5.5 mm above the pan and
   5.0 mm under the lid; its rod now stands on the pan top at 0.1095, and it
   moved to x -1.02 because the disconnect's rear HV lead ran through it at
   -1.05. With those two fixed the worst mesh-to-mesh gap in the module is
   0.5 mm, the rocker rail inner face to the adhesive bead on it, and
   tools/check-interfaces.sh reports [attachment] ok on gen7, gen8 and gen9.
   The pass closed four joints that were drawn but not built: the
   floor-lid's bonded perimeter now reaches the rail top it is bonded to
   instead of stopping 10 mm short, the disconnect's cold plate stands on
   four feet down to the pan instead of floating 9 mm over it and is plumbed
   to the pool it shares fluid with, the vapor headers are clipped to the
   rail bond bead every 380 mm instead of hanging 44 mm off the nearest
   structure, and the pool has a 35 mm retaining wall around the pan it
   stands in.

   Visibility, ray-tested. Every mesh in the module was sampled at up to 14
   face centroids and each sample cast against 96 directions over the sphere,
   with the occluder set restricted to the mesh's OWN part, because parts
   move as units under explode and a feature buried inside its own part can
   never be seen from any camera in any mode. Zero meshes come back fully
   occluded. The floor is 1.2 percent, and it is the twenty-four nuts on the
   series-link clamp bars, which can only be seen straight down the 14 mm
   slot between two bricks; the next band up is 2.1 percent, the clamp bars
   themselves. Nothing else in the module is under 8 percent. An earlier
   draft of this note claimed nothing was under 8 percent and that was two
   errors in one sentence: those nuts were always at 1.2, and twelve burst
   disc bolts and two rupture discs, 384 triangles, were at 0.0 because the
   retaining ring is r 18.5 mm over a bolt circle of 15.8 and its rear face
   was on x -1.29, so it enclosed everything it was holding. The ring now
   stops at x -1.2868 and the heads and the discs are what reach -1.29.
   Three drafts of this pass did not pass
   that test and were changed rather than shipped: the terminal boot swallowed
   its own standoff, lug and nut (the boot moved onto the cable end); the SiC
   module's DC terminal nuts grew into the heatsink base above them, which is
   lesson 2 exactly (the terminals moved 27 mm outboard of the fin footprint);
   and the laminated series links were sealed inside their own clamp bars
   (the bars are now 30 mm across a 90 mm lamination, so 30 mm of every foil
   stands clear at each end and reads through the 14 mm slot between bricks).
   Two further items were deleted rather than fixed: ten pedestal rails,
   440 triangles of geometry 10 mm under an opaque pool surface, and a
   sealed grommet for thermal's condensate penetration, which cannot be
   built at that corner without either passing x 1.300 or standing inside
   the pan. The grommet is the one thing on the brief this module could not
   deliver.

   GEN 10 VISIBILITY, the same question asked a harder way for the one part
   this module adds. The rule this project runs on is that geometry nobody
   can see is a decal with a triangle budget, so cornerclose was ray-tested
   against the WHOLE gen10 preset rather than against its own part: 480
   directions per face over the front hemisphere of each face normal, the
   occluder set being all 378,702 built triangles of body-9, this pack,
   drivetrain-9, wheels-10, hv-4, suspension-9, autonomy-10, thermal-9 and
   interior-6 at explode 0, which is the state a first-time viewer sees.
   By face group, mean fraction of directions that escape:

     outer web, the notch face     11.2 %   best face 26.5 %, none blind
     end caps and folds             2.6 %
     inner web, facing the cells    0.8 %
     bottom lap, bonded to the pan  0.4 %
     top land, bonded under the lid 0.0 %

   Read the first row and then the rest. The face this part exists to build
   is visible from a ninth of the sky with the whole car in the way, which
   for a surface under the floor behind a wheel is a real sightline: it is
   what a viewer sees looking into the notch from outboard and below, and it
   is in the floor reflection js/viewer.js draws every frame. The other four
   groups are occluded and every one of them is a bonded joint or a face
   turned at the cell stack, which is what those surfaces are for. Against
   the module's own part alone, the convention the note above uses, the same
   five groups read 82.9, 80.4, 94.6, 73.2 and 73.4 percent, so nothing here
   is buried inside its own geometry either.

   Clashes with partners, triangle-level, both preset sets. Everything that
   crosses a partner in gen7, gen8 or gen9 is either pre-existing geometry
   this pass did not touch (the lid panel against wheels' front disc and
   thermal's riser, the feed and vapor barrels through thermal's flanges,
   thermal's condensate flange through the shield skin and the pan,
   interior-6 resting on the lid) or is listed here. Counted as mesh pairs
   that actually cross, the pack meets gen7 and gen8 in 17 pairs and gen9 in
   23, and both counts are what the pre-pass file gave plus the one item
   below. New and deliberate: the vapor stub's bolted flange at x 1.284 to
   1.296 is 48 mm across in z to match thermal's own and butts it, and it
   crosses thermal's riser tube in one place, because that tube overshoots
   its own flange back to x 1.2733 and the stub it lands on already crosses
   it. It is 43.5 mm tall rather than 48 because a square 48 puts its top
   corners on y 0.292 and the floor-lid skin's underside is 0.290.

   AND THE ONE battery-7 REPORTED RATHER THAN RESOLVED IS RESOLVED HERE,
   which is the whole of this module. That note read: the pool retaining
   wall at |z| 0.686 over x 1.095 to 1.268 sits inside wheels-9's front
   tire, the strike shield skin has occupied |z| up to 0.700 over the same
   band since the module was written, the vapor headers 0.676, and a front
   tire at 0.6625 and a pack at 0.700 cannot both be right. All four items
   are gone. The wall and the shield skin are cut to the notch, the straight
   run of the vapor header stops at x 1.045 with its riser reaching 1.0555
   and hands over to a flattened duct spanning x 1.002 to 1.078, and the
   corner closeout is the boundary from the pan to the lid.

   Measured on the Gen 10 preset with tools/check-interfaces.sh, diffed
   against gen9 pair by pair as design/gen10.md hard point 7 requires:

     [battery pack]  gen9   7 parts penetrate, deepest 21.4 mm
                     gen10  4 parts penetrate, deepest  8.5 mm

   The three that go are wheels-9/tires at 564 crossing triangle pairs and
   21.4 mm, wheels-9/front-wheels at 72 and 17.4, and wheels-9/discs at 168
   and 15.3. The four that stay are interior-6/front-seats at 280 and 8.5,
   interior-6/console at 100 and 7.7, hv-4/hv-runs at 86 and 3.0 and
   interior-6/rear-bench at 80 and 1.0, every one of them identical to gen9
   in count, depth and coordinate, because none of them is at this corner
   and none of them is this module's. Nothing appears. Nothing deepens. The
   declared thermal-9/pack-loop landing goes 233 crossings to 219 at an
   unchanged 8.6 mm deepest with 24 vertices enclosed, which is the pool
   wall trim and is a shallower exemption rather than a deeper one.
   [cross-module] carries no battery pair by construction, [triangle budget]
   and [attachment] and [interfaces] are green on the Gen 10 preset, and
   [rear annulus] loses autonomy-4's 18 vertices and keeps hv-4's and
   suspension-9's, none of which is at this end of the car.

   CLASHES INSIDE THIS MODULE FROM THE NOTCH, part against part, swept by
   hand with tools/check-interfaces.sh's own predicate at its own 0.005 mm
   tolerance, because NOTHING IN THE TOOLCHAIN TESTS THIS. tools/smoke.sh
   checks a module against its own metadata and the checker deliberately
   leaves pairs inside one module alone, which is defensible and does mean
   the only guard on a new part fouling its own neighbors is somebody
   sweeping it. cornerclose against every other part of this pack, front
   corner, +z side:

     bricks         clear,   1.30 mm at (1.0807, 0.1102, 0.6492), the lap
                    under the fifth brick's outboard edge
     floorlid       0.00 mm, coincident: the top land is bonded to the skin
     strikeshield   clear,   3.50 mm
     sensefilm      clear,   6.60 mm
     rockerrails    clear,  52.43 mm
     bands          clear, 120.10 mm
     galleries      12 crossing pairs, deepest 2.00 mm

   ONE OF THOSE WAS A REAL DEFECT AND IT IS FIXED. The first draft of this
   module drew the pool's front retaining wall as one 1.1836 m box standing
   on the pan top at y 0.1095, and the closeout's bottom lap is bonded to
   that same pan top and runs inboard to |z| 0.5820, so the wall's outboard
   9.8 mm passed through it: 3 pairs, 5.09 mm deep, at (1.275, 0.110, 0.582).
   The wall is now three pieces, a main span to |z| 0.5820 on the pan and
   two 11.3 mm ends standing 0.7 mm higher ON the lap and reaching the
   closeout's inner face at 0.5933, which is the number the comment beside
   it always claimed and the geometry did not reach. That also closes a
   second, quieter error in the same line: the box was 1.1836 across where
   the comment said 1.1866, so the wall stopped 1.5 mm short of the web.

   THE TWELVE THAT REMAIN ARE FLUID OVER A SUBMERGED LAP AND THEY STAY.
   Every one of them is the drawn pool solid, y 0.1075 to 0.1215, crossing
   the closeout's 0.7 mm bottom lap at y 0.1095 to 0.1102, 0.62 to 2.00 mm
   on the plane-straddle convention. The lap is 11.3 mm under the pool
   surface and it is supposed to be wet. Drawing it dry would mean notching
   the fluid solid around a 12 mm bonded flange, which is the same trade
   battery-7 already made and recorded for its band legs through the sensing
   film and its baffle ribs, both under an opaque pool surface. It joins
   that list rather than starting a new one.

   AND THE SAME SWEEP HAS TO BE RUN ON THE OTHER THING THIS MODULE MOVED,
   WHICH THE FIRST DRAFT DID NOT DO. cornerclose is the new part, so it got
   the hand sweep; the rerouted brick take-off is a moved part, and a moved
   part fouls its neighbors the same way. Run over all 36 part pairs of
   this module and of battery-7 by one script, the notch and the reroute
   between them retire one pair, deepen none, and add two:

     bricks x floorlid       battery-7  13 pairs, 2.03 mm  GONE
     bricks x rockerrails    battery-10  5 pairs, 0.30 mm  NEW, the landing
     cornerclose x galleries battery-10 24 pairs, 2.00 mm  NEW, fluid over
                             the bottom lap, both sides, the twelve above

   The first draft of the reroute made that middle row 16 pairs at 3.46 mm,
   because it landed at x 1.056 and the rail's bond bead runs to x 1.050 at
   |z| 0.6980 to 0.7195. Moving the landing to x 1.060 clears the bead by
   2.30 mm and leaves only the 0.30 mm the tube presses into the raceway
   jacket, which is what landing on a jacket looks like. Every other pair in
   this module measures identically to battery-7 in count and depth.

   Clashes INSIDE the module from the detail pass, part against part,
   triangle level, swept over the pre-pass file and battery-7 by the same
   script so the two states are comparable. That pass introduced ten and all
   ten were fixed:

     band hoop inner fillet 9 mm over a square brick, up to 1.9 mm into the
       end plate corners at sixty corners (fillet is 1.5 mm now, which is
       the end plate's own chamfer)
     floor-lid perimeter land tapering all the way to |z| 0.744, up to
       1.9 mm into the rail top it is bonded to (taper ends at 0.7180 and
       the land is flat on 0.2995 outboard of it)
     810 V raceway on y 0.284, jacket 2.5 mm and clips 3.1 mm into the lid
       panel edge and its land (raceway 0.2775, clips top out at 0.2885
       under a 0.2900 skin)
     disconnect cold-plate return 5 mm inside the film aggregator
       (routed forward of it instead of through it)
     forward vapor riser take-offs 58 mm past the end of their header
       (removed: there is nowhere on the header to put them)
     twelve burst disc bolts and two rupture discs inside their own
       retaining ring (ring moved forward 3.2 mm)
     vapor flange corners 2 mm into the lid skin (flange 43.5 mm tall)
     two shield flush heads into the liquid feed manifold at x 1.260
       (fastener pitch 195 mm, so no station lands under the manifold)
     pool level probe pierced by the rear HV lead (probe moved to x -1.02)
     pool level probe hanging 5.5 mm off the pan (rod stands on it)

   Five were older than that pass and battery-7 shipped with all five open.
   THIS module closes TWO of them, because the notch put both in reach, and
   carries the other three. An earlier draft of this note said one and then
   listed the second among the survivors, on a list headed "measured
   identically on battery-7 and here", which is the one thing it was not:

     CLOSED HERE. The brick string take-off cable dead-ended in air at
     (1.245, 0.2845, 0.706) and the raceway it is described as feeding
     stopped at x 1.080. Those were battery-7's 43 brick vertices outboard
     of |z| 0.6625, all of them inside the front tire, and the notch could
     not be cut around them. The cable now runs inboard along the brick top
     and turns outboard aft of the notch to land on the raceway: its 54
     vertices outboard of 0.6625 all sit at x 1.0523 to 1.0752, inside the
     rocker rail, and nothing forward of x 1.080 on this pack is outboard of
     the plane. It lands on the 30 mm of jacket forward of the rail's bond
     bead rather than on the bead, which is a distinction the first draft of
     the reroute did not make and paid 3.46 mm for. gen10.md asked why the
     escapees were on the +z side only and the answer is in the geometry:
     there is one take-off and the raceway is laminated into the passenger
     rail, so the driver side has nothing to route.

     CLOSED HERE AS WELL, AND THE FIRST DRAFT OF THIS NOTE MISSED IT. The
     front vapor crossover ran inside the fifth brick: battery-7's tube
     spans x 1.179 to 1.246 at y 0.259 to 0.283 against a brick top of
     0.2755, so 16.5 mm of a 22 mm tube stood in the stack for the whole
     1.3 m of z and crossed the sensing film on the way. battery-7's note
     said routing it forward of the end plate was the answer and that doing
     so meant redrawing the pack's front corner. This module is that
     redraw, and the answer was the section rather than the route: the
     crossover is now the 6 by 76 mm duct at y 0.2832 to 0.2892, over the
     brick top and over the tallest tap foil at 0.2827. Measured part
     against part by one script over both modules, galleries into bricks
     goes 4,659 crossing pairs at 12.88 mm deepest to 4,090 at 9.20, and
     the 9.20 is now band and pool geometry under the stack rather than
     anything at the brick top; galleries into the sensing film goes 307
     pairs at 35.74 mm to 70 at 3.00, and that 3.00 is the vapor stub
     barrel clipping the film sheet's forward edge at x 1.250, which
     measures 22 pairs at 3.00 mm on battery-7 as well and is untouched.

   The three that remain, measured identically on battery-7 and here:

     The liquid feed manifold has its underside on y 0.1035: 6.0 mm below
     the pan top it should lie on, 2.0 mm below the pan underside and
     2.5 mm inside the strike shield.
     The band bottom legs run 3.0 mm into the 4 mm pan, because the pan top
     is 0.1095, the brick bottom is 0.1115, and a 5 mm leg has to pass
     between them.
     The band legs cross the sensing film sheet by 1.6 mm and the pool
     baffle ribs by 4.5 mm, both under an opaque pool surface.

   Two joints held exactly. The service hatch face still measures y 0.3070,
   the plane battery-6 handed over, and the landing rim under it keeps that
   panel's x -1.28 to -0.98 by z 0.25 to 0.51 footprint, so hv-4's pack feed
   at (-1.13, 0.315, 0.38) lands where it always did; what changed under it
   is a machined
   landing rim, a gasket, eight countersunk heads and an extruded HV warning
   that caps the pack at 0.3080 rather than exceeding it. The vapor stub's
   face is still x 1.297 and the liquid feed's is still (1.272, 0.118, 0.10).

   Not checked by this module and handed on: the extra 85 kg lands on
   suspension-4's air springs and wheels-7's tires and neither was resized
   for it, and no secondary mass compounding is carried in the range
   arithmetic above. */
