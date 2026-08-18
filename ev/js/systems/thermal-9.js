/* Thermal, Gen 9 minimum auxiliary.

   design/gen9.md asks this slot to take auxiliary from 649 W to about 350.
   It cannot be done, and the reason is arithmetic rather than engineering,
   so it is stated first and the rest of the module is built around it.

   WHAT 649 W IS MADE OF. The figure is efficiency.js's, and on the Gen 8
   preset it is hv-4's 820 W slot baseline plus autonomy-4's 45 W of triplex
   uplift minus thermal-7's 216 W delta. Decomposed against the partners'
   own published numbers rather than against the model's buckets:
     autonomy-4 compute, typical continuous          380 W   its own spec row
     everything else low voltage                     134 W   the residual
     THERMAL, thermal-7's own stated share           135 W   its own header
   Thermal holds 20.8 percent of the term this generation told it to cut by
   46 percent. Set this module's draw to ZERO and auxiliary is 514 W, which
   is 164 W above the target and 292 above the retro's 222. There is no
   thermal system, at any mass, on any premise, that reaches 350 W on this
   car. design/retro-gen8.md found that an afterbody cannot move frontal
   area; the same shape of error is here, one slot over. A target was set on
   the module that no longer owns the term.

   So this module does two things. It takes its own 135 W to 45, which is
   the most any thermal module can now contribute. And it prices every lever
   design/gen9.md named, including the three that return almost nothing, so
   the next generation spends its risk budget somewhere the physics is.

   MEASUREMENT CONVENTION, per the standing lesson in design/retro-gen8.md.
   Every mile figure on these panels is efficiency.js run over the Gen 8
   preset with only the thermal slot and its mass changed. One method, every
   rung, including the hypotheticals:
     thermal-6   865 W  1406 kg   122.54 Wh/mi   1,550.5 mi
     thermal-7   649 W  1400 kg   117.22 Wh/mi   1,620.9 mi
     thermal-9   559 W  1398 kg   115.03 Wh/mi   1,651.8 mi
     thermal at 0 W (the floor)   113.98 Wh/mi   1,667.0 mi
     gen9.md's 350 W target       110.14 Wh/mi   1,725.0 mi
     retro-gen8's 222 W           107.15 Wh/mi   1,773.2 mi
   This module is worth 30.9 miles: 29.6 from 90 W and 1.3 from the 2 kg.
   Note the fourth row. Even a thermal system drawing nothing returns 46
   miles, so 84 percent of what the slot could ever give is already given.
   Note also that thermal-7 published 57 miles on a 105 km/h steady reference
   of its own; measured this way it returned 70.4. The two numbers are not
   comparable and the 70.4 is the one that belongs beside the 30.9.
   The Gen 8 preset is the isolation harness, not the shipping answer. Run the
   SAME method over the Gen 9 preset, body-9 at Cd 0.107 and A 2.0415, and
   that A was checked here before it was used rather than taken on trust,
   because design/retro-gen8.md's standing lesson is about exactly this. Its
   station integrator, re-implemented and run over body-8's table and body-9's,
   returns 1.8205 and 1.7482 above y 0.28 for a delta of -0.0722, which is
   body-9's published figure to four decimals, and 2.157 minus 0.0722 minus
   the 0.0392 of tire column and the 0.0041 of protrusion is 2.0415. One
   method over both bodies, applied to the Gen 8 audit's own baseline, no new
   convention. wheels-9 at Crr 0.0038:
     Gen 9, thermal-7 carried   649 W  1390 kg  114.39 Wh/mi   1,661.0 mi
     Gen 9, this module         559 W  1388 kg  112.20 Wh/mi   1,693.5 mi
     Gen 9, thermal at 0 W                      111.14 Wh/mi   1,709.5 mi
     Gen 9, auxiliary at 350 W                  107.31 Wh/mi   1,770.5 mi
   Those first two rows are body-9's published 1,661 and 1,693 to the mile,
   which is what one method over both is supposed to produce. Gen 9 ships at
   1,693.5. design/gen9.md's own honest expectation was about 1,755 and its
   target was 1,800, so this generation lands 62 miles short of what it
   expected and 107 short of what it wanted, and the largest single reason is
   this slot: the auxiliary lever it was given was mostly not its to pull.
   Even the 350 W row, which nothing in this generation can reach, stops at
   1,770.5.

   222 W IS NOT ACHIEVABLE, AND IT WOULD NOT HAVE BEEN ENOUGH. Two separate
   statements, both true.
   Not achievable: autonomy-4 burns 380 W of compute continuously. That one
   number is 158 W above 222 before the car has a light, a display, a pump or
   a fan. Reaching 222 W requires the compute stack to fall to roughly 90 W,
   which is a different brain and not a different thermal system. The
   thermal lever cannot reach a term it does not touch.
   Not enough: run the ladder's own model, the one that produced the 1,621,
   and 222 W lands at 1,773.2 miles. The auxiliary that actually reaches
   1,800 miles on the Gen 8 platform is 150 W. The retro's figure was 72 W
   optimistic as well as unreachable, and this module says so rather than
   inheriting it, because a number quoted as the price of a target should be
   the price of that target.

   THE FOUR LEVERS design/gen9.md NAMED, PRICED ON THE REFERENCE SWEEP.
   1. Deeper ventilation heat recovery.            2.9 W
      thermal-7 already returns 78 percent. Counterflow effectiveness for
      balanced flow is NTU/(1+NTU), so 0.78 is NTU 3.55 and 0.88 is NTU 7.33:
      2.07 times the core for 10 more points, and the 10 points are worth
      3.1 W because they only act on the 9 cold hours of a 27.7 hour run.
      The largest line in thermal-7's ledger is the smallest in this one.
   2. Occupant-local conditioning taken further.   0 W, and it is a
      conservation law rather than a shortfall. Cabin temperature is an
      OUTPUT: Tcabin = Tamb + (internal gains + local delivery) / UA. Heat
      delivered to a person leaves through the cabin, so pushing the air
      setpoint below what the gains and the delivery already produce is not
      a setpoint at all. At 4 C with 270 W of gains through 28.3 W/K the
      cabin sits at 13.5 C with the heating off. thermal-7's 16 C setpoint
      is 70 W of delivery above that, and 70 W is all there is left. See the
      occupant-local panel; this is the finding of the module after the
      first one.
   3. Waste heat from drivetrain-7 and the compute stack.  about 1 W here,
      109 W at -10 C. Two reasons it is nearly worthless on this sweep. The
      cabin needs 70 W of heat for 9 hours of 27.7 and needs cooling for the
      other 18.7, and you cannot recover what you are not spending. And
      drivetrain-7 burns 170 W at cruise, of which the reachable part is a
      front axle its own dog clutches switch off: Gen 7 DELETED that loss as
      a range measure, so Gen 9 cannot harvest it. You do not get to both
      delete a loss and collect its heat.
   4. Standby draw of the always-on systems.       2 W in this module, and
      16 W reported on a partner it may not edit. On a 27.7 hour drive
      nothing is in standby; the always-on loads are running loads. The one
      real item found is hv-4's converter, three interleaved LLC phases at
      9 percent of rating, where phase shedding is worth about 16 W. hv-4 is
      a Gen 4 module carried unchanged and that number is reported, not
      booked.
   THE LEVER gen9.md DID NOT NAME is the largest: 14.8 W from replacing the
   cabin setpoint with a 14 to 22 C float band, and 10.0 W from letting the
   summer cabin reach 30 C with the recovery core bypassed as a cooling
   resource. Twenty-five of the ninety watts come from deleting a thermostat.

   THE LEDGER, ordered, applied to the 649 W. Terms are order dependent and
   do not sum in isolation, the same caution thermal-7 printed:
     1. Two blowers for one            44 to 11 W    -33 W   about 11 miles
     2. Pumps                          38 to 11 W    -27 W   about  9 miles
     3. Compressor                     41 to 13 W    -28 W   about  9 miles
     4. Coil fans, valves, controls    12 to 10 W    - 2 W   about  1 mile
     Thermal's own share              135 to 45 W    -90 W
     Plus 2 kg off the ledger                                about  1 mile
   Auxiliary 649 W to 559 W. 14.96 to 12.88 Wh/mi on the auxiliary row,
   117.22 to 115.03 Wh/mi on the car, 1,620.9 to 1,651.8 miles.

   Reference condition, carried verbatim from thermal-7 so the two modules
   are compared on one sweep: 105 km/h, two occupants, 190 kWh usable,
   27.7 hours, ambient 4 C for 9 h, 14 C for 11 h and 26 C plus sun for
   7.7 h. Cabin envelope also carried: glazing 2.58 m2, floor 4.35 m2 at
   U 0.8, other opaque 4.45 m2 at U 3.0, glass U 5.0 swept and 3.2 still,
   internal gains 270 W of which 150 is two occupants and 120 is the part of
   autonomy-4's 380 W that reaches the cabin. What changes is the
   ventilation term: 80 m3/h at 0.9 effectiveness through an 88 percent core
   replaces 90 m3/h at 0.8 through a 78 percent one, so the ventilation
   conductance falls from 6.63 to 3.22 W/K and the winter UA from 31.7 to
   28.3. Compressor by leg, one method over both modules, thermal-7 first:
     4 C    26 W / 17 W     14 C    37 W / 0 W     26 C    64 W / 28 W
   Sweep averages 40.9 and 13.3.

   Gen 9 preset partners, reconciled against BUILD GEOMETRY per the drift
   law in design/retro-gen4.md:
   - body-9 (built). It landed after the first draft of this module and the
     reconciliation was redone against its mesh rather than against body-8.
     Four of its decisions reach this slot, one of which is that it changed
     nothing, and one of which is a question it asked out loud.
     THE NOSE DID NOT MOVE. body-9 keeps stations 0, 1 and 2 as body-8's to
     the fourth decimal, so every front-stack clearance here is a three
     generation carry. Its own halfWidth and surfaceY helpers, sampled on its
     own station table, return 0.8489 at (2.14, |z| 0.40), 0.8371 at (2.17,
     0.40) and 0.9106 at (1.989, |z| 0.258), which is what body-8 published,
     so the sampler is trusted. Measured that way the tightest vertical
     clearance over the front stack is 321.6 mm at (2.207, 0.500, |z| 0.405)
     and the tightest anywhere in the module is 35.6 mm at the pack purge pot
     (1.989, 0.875, |z| 0.258). Both are thermal-7 hardware at thermal-7
     coordinates.
     THE INTAKE APERTURE DID MOVE, and this module owes body-9 an answer
     rather than the guess its first draft made. This module wrote that a
     narrowed nose plausibly took the gates to |z| 0.34, 15 percent of the
     aperture, about 0.9 kW off parked rejection. body-9 went further: four
     slats spanning 0.560 m against body-8's 0.800, measured off its built
     bank at 0.560 by 0.193 m, so the gross face is 0.1080 m2 against 0.1543
     and the cut is 30.0 percent, not 15. body-9 states that thermal-9 owns
     the sizing case and gets to say the slat count is wrong. It is not
     wrong, and the reason is on the outdoor-coil panel: the row swap moved
     this stack's binding duty from condensing to free cooling, and free
     cooling is an approach-temperature device whose ceiling is set by coil
     area rather than by air mass flow. On the road nothing changes, because
     ram pressure at 105 km/h fills the stack through either aperture. The
     bill is entirely parked, entirely at the top of the charge curve, and it
     is roughly 1.8 kW of rejection at 40 C by the same linear scaling the
     first draft used, which is battery-7's charge ceiling and not this
     module's range. ACCEPTED, with the number stated rather than absorbed,
     and the fail-open spring means the error direction is safe.
     THE FAIRING MOVED, which is where this module actually had to redraw.
     body-9's sealed inboard wall is at |z| 0.630 with its outer face at
     0.637, computed from its own FRONTZ rather than from P.wheelZ, against
     body-8's 0.693 to 0.707. thermal-7 declared its ventilation exhaust as a
     penetration of that wall and this module inherited the sentence; on
     body-9 the wall is 63 mm further inboard and the duct passes behind it
     entirely. What the duct actually pierces, measured, is body-9's AFT
     FAIRING CLOSEOUT at x 1.037..1.053: a 40 mm duct through a 16 mm carbon
     panel at |z| 0.641 to 0.786, y 0.460 to 0.507. Declared here at the
     coordinates the mesh has, because a carried declaration that names a
     panel the partner no longer builds is worse than no declaration.
     THE LOUVER BANK MOVED TOO. body-9 raised the arch exhaust bank 130 mm to
     y 0.630 to buy steered clearance, so this module's grille at y 0.490 now
     sits below the bank rather than beside it. That does not change the
     physics, because the pod is a sealed cavity and the bank sets its
     pressure wherever the discharge enters, but thermal-7's sentence about
     discharging "just aft of the outlet louver bank" is no longer a
     description of the geometry and has been corrected on the panel.
   - autonomy-4 (built): compute cold plate x -0.795..-0.322, y 0.395..0.463,
     stubs at (-0.795, 0.42, -+0.05). Landed, unchanged. Its 380 W is the
     single largest line in the vehicle auxiliary ledger and this module has
     no authority over it. See the glycol panel for the one thermal lever
     that touches it and why the 4 W it is worth is reported rather than
     claimed. TWO DECLARED PENETRATIONS of its hardware: the three spigots of
     the new parallel manifold enter its cold plate face at x -0.795 by
     19 mm, which is the hose-over-spigot depth the pack landings already
     use, and its sensor RING is the reason the ventilation extract sits
     where it does, below.
   - interior-6 (built): its front seat tracks land on battery-6's lid rails
     at y 0.308, |z| 0.28 and 0.52, so the seat manifolds sit at |z| 0.40
     between them. What the first draft of this module got wrong is what its
     seat FRAME occupies above those rails: measured off the built mesh, two
     members run x 0.110..0.595 at y 0.405..0.460 out to |z| 0.615, which is
     exactly the band a rocker-shoulder duct wants. See the recovery-core
     panel for where the extract went instead.
     ITS SEATS ALREADY CARRY, and this module does not count any of it:
     heater mats, 12 W of ventilation fans per seat, eight posture cells on
     a shared 20 W pump, all on its own 22 kg per seat. Its canopy liner
     takes 596 W of downward radiation to 35 and sweeps its 58 mm gap with
     40 m3/h a side of dash-plenum air. This module carries the loop, the
     damper on that takeoff, and nothing else in the seat.
     DECLARED: the new screen-base slot nozzle at x 0.905..0.951, y 0.856 to
     0.878, sits inside interior-6's dash molding volume, because that is
     where the base of a windshield nozzle physically lives. It is a trim
     aperture in a partner this module cannot edit, stated rather than drawn
     around, the same way thermal-7 stated its A-pillar duct takeoffs.
   - drivetrain-7 (built): 170 W of loss at 100 km/h, of which about 102 is
     two rear rings and 50 is two corner inverters. Its coolant stubs sit at
     |z| 0.656..0.680 INSIDE the gen3 rear annulus contract, pointed at its
     own jacket. There is no declared landing for a heat-recovery line and
     this module will not draw a pipe into a partner's binding annulus. The
     front unit is disconnected at cruise by its own dog clutches and makes
     no heat at all. Reported as an open interface, worth 109 W at -10 C if
     it is ever closed, and zero on the reference sweep. Its FRONT unit is
     also the new blocker on the drive handover, below, which is a change
     from what two generations of this slot have been writing.
   - battery-7 (built): 4.0 W at record cruise, 15 kW at its charge ceiling,
     vapor stub (1.272, 0.268, -0.10) and liquid feed (1.272, 0.118, 0.10).
     Both landings carried from thermal-7 unchanged. Its 19 kg fluoroketone
     ledger item is STILL UNRESOLVED and is carried forward on the pack
     panel rather than quietly absorbed.
   - hv-4 (built): converter stubs (-1.43, 0.40, 0.247) and (-1.31, 0.40,
     0.247), thermal HV spur ending at (1.70, 0.55, 0.42). CARRIED FINDING,
     unfixed and unfixable from this side, and re-measured against body-9
     rather than restated: the spur end and 76.8 mm of the pigtail that
     leaves it lie inside body-9's front casting side block (x 1.550..2.060,
     y 0.300..0.580, |z| 0.355..0.595) and its crash-rail rear bulkhead plate
     (x 1.700..1.720, y 0.475..0.625, |z| 0.345..0.495). That is 11.8 cm3 of
     r 7 mm tube inside body structure, where thermal-7 reported about 6.
     The figure went up because it was measured this time instead of quoted.
     Three generations have now reported it and nobody owns the fix, because
     the stub end is hv-4's coordinate and the casting is body-9's carry.
   - wheels-9 (built) is the reason this module re-ran its arch audit rather
     than asserting a conclusion. Front wheel centers are at (+/-1.45, 0.355,
     +/-0.74), tire faces |z| 0.6625 and 0.8175. Sweeping every vertex of its
     built front tire, wheel, cover, disc and caliper about the steering axis
     through (1.45, 0.74) reproduces its published table exactly: 0.8190
     static, 0.8298 at 2 degrees, 0.8512 at 6, 0.8720 at 10, 0.8926 at 14,
     0.9032 at 16, 0.9238 at 20. Tested against that SWEPT SOLID rather than
     against corner values, this module has ZERO vertices inside it at rest,
     at the commanded 14 degrees and at body-9's contained 18.43. The nearest
     approach is 23.6 mm, at the ventilation exhaust grille (1.083, 0.455,
     |z| 0.787) with 2 degrees of lock on. That is the only part of this
     module that gets anywhere near the corner, and it is tighter than it
     reads, because body-9's own lower closeout holds 14.3 mm at the same
     lock and this grille is in the same family of clearance.
     Its brake master unit also moved with the corner and is a NEW neighbor
     the second blower had to be drawn around: a bracket at x 0.905..0.995,
     y 0.580..0.660, |z| 0.282..0.294 stands exactly where thermal-7 had
     nothing. The transient blower's inlet throat and recirculation damper
     sit 12 mm higher and 20 mm further inboard for that reason.
   - suspension-9 (built) changed two things this module was relying on.
     It narrowed P.driveF from z +/-0.35 to the measured +/-0.31, which
     design/gen9.md said the module touching it would declare and the others
     would honor; this module's handover flanges are at |z| 0.10 and 0.20
     and are unaffected, and the declaration is honored rather than
     re-derived. And it DROPPED the forward front crossmember from y 0.25 to
     0.21 and carried the inner pivots inboard with the track. That second
     change reopens the interface below.
   - body-9 CARRIED CONDITION, not this module's to fix: its bumper beam
     outboard corner at (2.27, 0.50, +-0.65) stands 14.9 mm outside the nose
     loft and overlapped the old thermal-6 core plane. This module keeps
     thermal-7's aft core plane at x 2.168, so the overlap stays deleted.

   THE DRIVE HANDOVER, AND WHY THE ANSWER CHANGED. drivetrain-7's
   oil-to-coolant plate presents water stubs at (1.42, 0.270, -0.105) and
   (1.42, 0.270, -0.055), 50 mm apart, against this module's flanges at
   (1.75, 0.50, -0.10) and (1.75, 0.50, -0.20), 100 mm apart: 355 mm of x,
   230 mm of y and a different pitch. Two generations wrote that the straight
   route was blocked by suspension-4's two front subframe crossmembers and
   its ARB decoupler tube. That sentence is now false and it was checked
   rather than carried. Sweeping the straight centerline against
   suspension-9's BUILT mesh, the nearest suspension metal is 92.9 mm away,
   an ARB decoupler at (1.675, 0.335, -0.110); on the second route it is
   97.8. suspension-9 dropped the crossmember and moved the pivots inboard
   with the track, and in doing so it cleared an interface it was not trying
   to clear.
   What blocks the route now is drivetrain-7's own front unit. The same sweep
   against its built housing comes to 1.2 mm at (1.436, 0.282, -0.105) and
   4.9 mm on the second route, because the stubs sit on a face the housing
   then wraps: the block at x 1.375..1.525, y 0.280..0.430, |z| 0.105..0.215
   is the thing the hose has to leave from and the thing it immediately hits.
   A 40 mm hose needs 20 mm and has 1.2. Jogging outboard to |z| 0.25 makes
   it worse, at 16.2 mm of overlap, because that is deeper into the same
   housing. So the flange plane is held at the P.driveF face for a third
   generation, but the finding handed to the integrator is different and more
   useful than the one it inherited: this is now drivetrain-7's stub face to
   move, not suspension structure to route around, and the amount of movement
   needed is small, roughly 30 mm of stub standoff off the housing wall.

   Zones held: front stack x [2.08, 2.26] (P.thermalFront) and firewall HVAC
   x [0.78, 1.00], both unchanged since thermal.js. Loop hardware sits above
   body-9's front megacasting on thermal-7's rail, and the frunk is still
   gone; the panels say so.

   Mass ledger, binding: 10 + 9 + 5 + 6 + 6 + 10 + 4 = 50 kg, on
   design/gen9.md's 50 kg for this slot exactly. UNCHANGED by the crispness
   pass below, which is the point of the rule: detail is geometry, and none of
   it is kilograms. No part gained or lost a gram and every specs row, every
   how, every why and every fail on all seven panels is the engineering
   thermal-9 shipped with.

   THE CRISPNESS PASS, and what it cost. design/crispness.md wrote its rules
   for a lofted body; this is what they come to on plumbing. 26,604 triangles
   to 56,464, 269 meshes to 622, 50 kg to 50 kg. Report the middle number as
   well as the first: SPEC.md now says mesh count is the budget that binds,
   because every mesh is a draw call and viewer.js draws the scene twice a
   frame for the floor reflection. This module is 353 more draw calls than it
   was. Nothing here is merged yet and that is the obvious next economy on
   this part; the geometry is drawn as it should look first. The whole of it is one idea
   applied part by part: stop drawing the primitive and draw what the part is
   made of. Every box that a person could see became lib.cbox, which holds the
   box's bounding box to the micron and can therefore only remove material, so
   roughly 340 chamfers went on without moving a single published clearance.
   On top of that: header tanks with stamped caps and fin packs at a pitch a
   coil has rather than the pitch a mesh-per-plate helper could afford; a
   compressor with a girth seam, four bolted feet, brazed suction and
   discharge stubs, an oil plug on the shell surface and a terminal box with
   a lid, four screws and a gland; receivers and accumulators with straps,
   sight glasses and service ports; four brazed plate exchangers redrawn as
   two end plates and an exposed pack; crimped ferrules on every hose end and
   P clips where a run crosses structure; two blower volutes with cutoff
   tongues, bellmouths, wheels and motor bosses in place of two drums; real
   lattice grilles in place of three slabs; valve bodies with actuator cans,
   connectors and pigtails; and a fan shroud that is a venturi with stator
   struts instead of a torus, turning seven twisted airfoil blades instead of
   seven flat paddles.

   FOUR THINGS THE PASS FOUND, each of them a defect rather than a decoration.
     The runAft cabin runs became CLOSED LOOPS for one revision, because the
       hose helper's options object was passed to lib.tube, whose fourth
       argument is `closed`. Two 1.7 m tubes looped from the seat manifolds
       back to the nose through open air. Caught by a matched-pair vertex
       diff, not by eye.
     Twenty-nine meshes stood WHOLLY INSIDE another solid and this module's
       own audit block already said so: plate stacks sealed in case boxes.
       They are now the visible part of the exchanger.
     The air-handler case was a 220 by 240 by 560 solid brick, which is
       0 percent exposure for both blowers, both coils, the blend flap and the
       drain. It is drawn as the rear clamshell half with a joint flange.
     body-9's front casting top surface STOPS AT x 2.058, swept. Footplates
       spread symmetrically about the outboard legs at x 2.045 hung 6 mm over
       the edge of the casting they bolt to, so they spread in z instead.

   AND TWO CARRIED CONDITIONS IT MEASURED FOR THE FIRST TIME, neither of them
   this pass's to fix:
     The air-handler case does not merely TOUCH interior-6's dash molding at
       x 1.000, it is well inside it, and the honest number needs the same
       dense sampling that found the touch: a 220 by 560 flat face has
       vertices only at its corners, so a vertex sweep cannot see either. On a
       4 mm barycentric lattice over every triangle, tested for containment in
       interior-6's built meshes, the SHIPPED case and cowl hardware put
       samples up to 66.6 mm inside interior-6/dashboard's A-pillar duct tubes
       and 61.3 mm inside the other, at the screen-base plenum and the two
       rail-duct boxes. The detailed geometry is inside the same volume and no
       deeper: 64.5 and 56.5 mm on those two pairs, and no pair of meshes
       overlaps that did not overlap before. This is a carried condition of
       the cowl, not a product of the detail pass, and it wants an envelope
       decision between two modules rather than a chamfer. The case envelope
       is left exactly where the module shipped it.
     The passenger-side footwell radiant panel at (1.030, 0.494, +0.290)
       reaches 12 mm INSIDE this module's own recovery-core case, because the
       core grew from a 170 mm cube to 190 by 200 by 270 in this generation
       and the panel is thermal-7's at thermal-7's coordinates. Both are this
       module's parts, so this one is genuinely ours to resolve, and it wants
       a coordinate decision rather than a chamfer.

   TRIANGLE BUDGET, stated plainly because it is now the binding one on the
   car: 56,464 of 60,000, 94 percent, and tools/check-interfaces.sh reports
   thermal-9 as the largest system in the gen9 preset. 19,296 of those are
   lib.tube and almost all of it is carried hose: lib.tube lays six segments
   between every input point, and four would return about 6,400 triangles at
   the cost of up to a millimeter on the tightest duct clearances and a full
   re-measure. That is the reclamation if a later pass needs the room; it was
   not taken here because this module publishes clearances at 20.0 mm. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'thermal-9',
  name: 'Thermal · Gen 9 minimum auxiliary',
  color: 0x58d6a6,
  explode: [1.5, 0.35, 0],
  blurb: 'Gen 9 told this slot to take auxiliary from 649 W to 350. Thermal owns 135 W of that 649. Set this module to zero watts and auxiliary is still 514 W, because 380 W is autonomy-4 thinking and 134 W is the rest of the low-voltage car. The target was set on a module that stopped owning the term at Gen 7, and the honest answer is 559 W, not 350. What this module does deliver is 135 W down to 45: two blowers instead of one, three pumps down to eleven watts, and a compressor that runs 8 percent of a long drive because the thermostat has been replaced by a float band. Ninety watts, 2.08 Wh/mi, 30.9 miles. It costs a cabin that wanders between 14 and 22 °C and is allowed to reach 30 in summer, and it costs about 1.8 kW of parked rejection at 40 °C once body-9\'s narrowed intake bank is in. On the full Gen 9 preset the car reads 112.20 Wh/mi and 1,693.5 miles, against the generation\'s own honest expectation of 1,755 and its target of 1,800.',
  parts: {
    'outdoor-coil': {
      name: 'Outdoor coil and fan bank',
      tagline: 'The compressor now runs 8 percent of a long drive, so the coil stops being a condenser and becomes the car\'s primary heat exchanger. It is sized for approach, and the rows swap size to say so.',
      mass: 10,
      specs: [
        ['Rows', 'Glycol y 0.270 to 0.420, refrigerant y 0.440 to 0.485, one frame'],
        ['Swap', 'Glycol face 0.091 to 0.119 m², refrigerant 0.055 to 0.036'],
        ['Approach', 'Glycol 6 K to 4 K; refrigerant unchanged at 6 K'],
        ['Free cooling', 'Holds the 16 °C branch unaided to 11 °C ambient (was 9)'],
        ['Fans and aperture', '2 x 230 mm, 5 W at road speed; body-9 bank 0.108 m² (was 0.154)'],
        ['Maturity', 'Production practice'],
      ],
      how: 'thermal-7 sized these two rows for a heat pump, because it was building one. This module measured what the machine actually does over 27.7 hours and found it running at 13 W of sweep-average draw, which on a 900 to 9,000 rpm scroll is about 8 percent of the drive. For the other 92 percent the refrigerant circuit is dark and the glycol row is the entire thermal system: it takes autonomy-4\'s 380 W, hv-4\'s converter loss and whatever the pack is doing, and it puts them into the air with no compressor between them. That is free cooling, and free cooling is an approach-temperature device in exactly the way a condenser is not. So the two rows swap size within the frame body-9 carries forward unchanged. The glycol row grows from 0.115 to 0.150 m of height and from 0.091 to 0.119 m² of face, which at the same 2,600 m³/h drops its face velocity and takes its approach from 6 K to 4. The refrigerant row shrinks from 0.070 to 0.045 m, because a circuit that carries 1 to 3 kW for two hours out of twenty-eight does not need the surface a continuous machine did.\n\nThe four kelvin is what the swap buys and it is worth naming precisely. Free cooling works while the coil can reach the branch temperature it is asked for, so the ambient ceiling for holding the 16 °C chilled branch is 16 minus the approach minus about a kelvin of loop pickup: 9 °C with thermal-7\'s coil, 11 with this one. On the reference sweep that moves the 14 °C leg from marginal to comfortable and is part of why the compressor reads 0 W across those eleven hours. The frame, the plenum, the two 230 mm fans, the shroud, the brackets landing on the casting face at x 2.070 and the aft core plane at x 2.168 are thermal-7\'s and are carried without a drawing change, including the 10 mm deliberate excursion that puts the brackets ON the casting rather than in front of it. Measured against body-9\'s own station table, the tallest item here is the refrigerant distributor at y 0.520 and the tightest clearance over the whole stack is 321.6 mm at (2.207, 0.500, |z| 0.405). body-9 carries body-8\'s nose stations verbatim and body-8 carried body-7\'s, so that is a three-generation carry rather than a fresh measurement, and the panel says which it is. One item on this frame did move: the glycol defrost tee, which stood 3.5 mm off the fin block it is brazed into and now seats on its face at x 2.133.\n\nBODY-9 ASKED THIS PANEL A QUESTION AND HERE IS THE ANSWER. It cut the nose intake bank from 0.800 m of span to 0.560, measured off its built slats as 0.1080 m² of gross face against body-8\'s 0.1543, a 30.0 percent reduction, and it wrote that thermal-9 owns the real sizing case and gets to say the slat count is wrong. It is not wrong, and the row swap on this panel is the reason. A condenser is a mass-flow device and would have felt that cut immediately. A free-cooling coil is an approach device: its ceiling is set by surface area against face velocity, and cutting the aperture RAISES face velocity through a row that just grew 31 percent, which moves approach the right way at road speed. At 105 km/h ram pressure fills this stack through either aperture and the 4 K approach is unaffected. The bill is real and it is entirely parked: with no ram and 30 percent less open area the fans move about 1,900 m³/h instead of 2,600, which is roughly 1.8 kW off rejection at 40 °C on the same linear scaling this module used when it was guessing. That is battery-7\'s charge ceiling in a hot bay, not this car\'s range, and body-9\'s fail-open spring means a stuck gate errs toward air. ACCEPTED, with the number stated rather than absorbed.',
      why: 'Every previous generation of this coil was designed for the hour it works hardest. This one is designed for the twenty-six hours it works alone. The distinction matters because the two duties want opposite things from the same 0.108 m² of aperture body-9 now gives the nose: a condenser wants capacity and takes velocity to get it, a free-cooling exchanger wants approach and takes area. Under this project\'s premise the resolution is not a compromise, it is to notice that the refrigerant duty collapsed and hand its surface to the row that is now doing the work. The gain is 4 kelvin of approach and two extra degrees of free-cooling ceiling, and the cost is written on the other row and, since body-9 landed, on the parked charge case as well.',
      fail: [
        'The shrunk refrigerant row is a real capability loss at the one condition that still needs the compressor hard, and body-9 has now compounded it. Parked on 40 °C asphalt with the pack charging, condensing duty is what matters and this row has 0.036 m² of face instead of 0.055, through an intake bank that came down from 0.154 m² to 0.108 in the same generation. Neither decision is wrong on its own and together they cost about 1.8 kW of parked rejection at 40 °C. The glycol row absorbs most of the cabin side because the pack rejects into glycol rather than into air, but the cabin cooling branch on a hot-parked precondition runs about 2 K warmer condensing than thermal-7 would, which is roughly 6 percent of that branch\'s COP at the exact moment nobody is watching the range meter. Two modules each took a defensible slice of the same parked margin one rung apart, which is the shape of failure design/retro-gen8.md warned about, caught here rather than at integration.',
        'A coil that spends most of its life free-cooling spends most of its life wet on the inside of nothing and dry on the outside, so the failure that used to announce itself, a refrigerant leak showing up as lost capacity, now hides: the car free-cools happily with an empty refrigerant circuit and only discovers the loss on the first hot afternoon. Charge is monitored by saturation pressure against ambient rather than by performance, which is a sensor the previous generation did not need.',
        'Frost is unchanged and still real. Evaporating below 0 °C in moist air frosts whatever the face area, and the glycol defrost pass brazed into the refrigerant fin block is carried from thermal-7 with the same honest 4 percent of heating output lost on a wet 2 °C night.',
      ],
      explode: [0.55, -0.10, 0],
    },
    'heat-pump': {
      name: 'Part-time heat pump',
      tagline: 'thermal-7 spent its whole argument on COP and won it. The prize is a machine that now runs 8 percent of a long drive, and you cannot improve the efficiency of a compressor that is off.',
      mass: 9,
      specs: [
        ['Machine', 'thermal-7\'s R290 economized two-stage scroll, unchanged'],
        ['Duty', '13 W sweep average against 41; running about 8 percent of the run'],
        ['New hardware', 'Free-cooling plate, suction accumulator, one bypass valve'],
        ['By leg', '17 W at 4 °C, 0 W at 14 °C, 28 W at 26 °C plus sun'],
        ['Cold weather', '64 W at -10 °C against thermal-7\'s 206, on compute heat'],
        ['Maturity', 'Pilot line; the R290 crash case is still thermal-7\'s open item'],
      ],
      how: 'The machine is not redesigned and that is the panel\'s first honest statement. thermal-7 took the lift from 63 K to 43 K by delivering at 35 °C instead of 55 and by spending coil depth on approach, and it got COP 2.9 to 4.2 for it. There is no second act. Carnot at 313 over 43 is already 7.28 and a 58 percent fraction of it is at the top of what any real scroll has demonstrated, so the remaining headroom in the machine is worth a few percent of a term that is now 41 W. What changed is not the efficiency, it is the duty cycle, and the duty cycle is set by three decisions that live on other panels: the deeper recovery core, the float band that replaces the cabin thermostat, and the core bypass used as a summer cooling resource. Priced over the reference sweep the compressor goes 26, 37 and 64 W by leg to 17, 0 and 28, which averages 40.9 to 13.3. Two thirds of the saving is the eleven mild hours where this machine simply does not start.\n\nSo the Gen 9 hardware is what a part-time machine needs rather than a better machine. A brazed liquid-to-liquid plate lets the outdoor coil talk straight to the 16 °C branch and the compute loop with the refrigerant circuit dark, which is the free-cooling path and the reason the 14 °C leg reads zero. A suction accumulator goes in because a compressor that starts and stops is a compressor that floods: at 13 W of average draw this machine sees roughly forty starts on a 27.7 hour run against thermal-7\'s continuous operation, and liquid returning to a scroll on start is how a machine that was going to last twenty years lasts three. And one three-way valve replaces the arrangement that used to keep the condenser permanently in circuit. The sealed enclosure, the 140 g charge, the drained and vented pan at y 0.635, the hydrocarbon sensor at the low point and the HV pigtail that lands on hv-4\'s spur end and threads the casting rib gap at |z| 0.387 to 0.438 are all thermal-7\'s, and are carried with two coordinates corrected rather than copied. The pan\'s four legs went from y 0.600 to 0.605, because at 0.600 they landed correctly on body-9\'s casting top face at 0.580 and stopped 5 mm short of the pan they hold up, which is a plate hovering over four posts. The overboard vent went from y 0.620 to 0.626, because its lower end was 2.5 mm inside body-9\'s crash rail. And thermal-7\'s finding that roughly 6 cm³ of the HV pigtail is inside body structure neither module can edit alone is carried with its number MEASURED instead of quoted: 76.8 mm of r 7 mm tube inside body-9\'s casting side block and its crash-rail bulkhead plate, which is 11.8 cm³, about twice what the last two generations reported. Restating an inherited figure is how a small defect stays small on paper.',
      why: 'This part exists in Gen 9 to say what a generation is not allowed to claim. design/gen9.md lists auxiliary as one of three levers pulled together and asks for 46 percent of it. The compressor is the device every previous thermal generation improved, and after thermal-7 it is 41 W of a 649 W term: six percent. Improving it by a further quarter, which nobody knows how to do, would be worth 10 W and three miles. The lever moved out from under this hardware one generation ago and the module that inherits it owes the sentence rather than another COP claim. What the machine is still worth is the cold end of the envelope, where it is worth a great deal, and that number is on this panel too because a range figure quoted only at a convenient ambient is the flattering half of the truth.',
      fail: [
        'Forty starts on a long run is a duty this machine was not designed against. The accumulator handles liquid return and the soft-start ramp handles inrush, but scroll tip-seal wear is a start-count problem more than an hours problem, and the honest label is that thermal-7\'s twenty-year continuous-duty life is now an extrapolation from a different duty cycle. What has to become true is cycle-life data at forty starts a day on a hydrocarbon charge.',
        'Everything still depends on one compressor: cabin heat, cabin cooling, pack precondition and the chilled branch. thermal-7 said this and it is worse here, because free cooling has made the car feel fine without the machine for most of a drive, so a dead compressor now announces itself on the first hot hour rather than within minutes. The car keeps driving and stops being comfortable, and it takes longer to find out.',
        'The 140 g propane charge forward of the firewall is unchanged and so is its open evidence gap: sealed hydrocarbon systems of this size are production practice in buildings and none of them are crashed at 56 km/h into an offset barrier. The fallback remains a smaller R1234yf charge at roughly 0.4 lower COP, which on a 13 W term is now worth about 1 W, which is itself a comment on how far this lever has run out.',
      ],
      explode: [0.20, 0.50, 0.35],
    },
    'air-handler': {
      name: 'Two blowers and a float band',
      tagline: 'The largest single line in this module is not a heat pump, a membrane or a recovery scheme. It is noticing that one blower was doing two jobs with one flow rate, and that the bigger job only happens at the start of a journey.',
      mass: 5,
      specs: [
        ['Ventilation blower', '80 m³/h continuous, 6 W (thermal-7: 210 m³/h at 44 W)'],
        ['Transient blower', '30 m³/h defog at 5 W, 250 m³/h recirculated on pulldown'],
        ['Control', 'Float band 14 to 22 °C winter, up to 30 °C summer; no setpoint'],
        ['Coils', '4 °C dehumidify and 35 °C heating, carried from thermal-7'],
        ['Ledger', '44 W to 11 W, the biggest line in the module, 33 W and 11 miles'],
        ['Maturity', 'Production practice; the float band is Extrapolated, see fails'],
      ],
      how: 'thermal-7 ran one 330 mm wheel at 210 m³/h and 44 W. Ninety of those cubic meters were ventilation, which is a requirement; the rest was recirculation, which exists for two things that do not happen at the same time as each other or at the same time as cruise. Defog is a local mass-transfer problem at the glass, where what clears a screen is jet momentum in the boundary layer at its base rather than air changes in the cabin behind it. Pulldown is a transient that lasts ten minutes at the start of a journey. Sizing one machine for the union of three duties and then running it at the union\'s flow rate for 27.7 hours is what cost the 44 W. So there are two machines. A ventilation blower moves 80 m³/h through the recovery core at 6 W, on a wheel grown again and turned slower, and it never does anything else. A transient blower feeds a slot nozzle across the screen base at 30 m³/h and 5 W at cruise, and opens a recirculation damper to reach 250 m³/h when the cabin is being pulled down. Eleven watts against forty-four, 0.76 Wh/mi on the auxiliary row, and about 11 miles.\n\nThe other half of this box is a control change with no hardware at all, and it is worth 25 of the module\'s 90 W. thermal-7 held 16 °C in winter and 27 in summer. Holding a temperature means paying whenever the cabin is not at it, and on the eleven mild hours of the reference sweep the cabin wants to sit at 18.8 °C on 270 W of internal gains through an open ceiling gap and a bypassed recovery core, which is a perfectly comfortable place for it to be. So the setpoint becomes a band, 14 to 22 °C, and the compressor across those eleven hours goes from 37 W to zero. In summer the band opens to 30 °C and the recovery core, which is a liability whenever ambient is cooler than cabin, is bypassed so that 80 m³/h of 26 °C air becomes 107 W of free cooling: 64 W to 28. The blend flap, the 4 °C dehumidify coil, the 35 °C heating coil, the filtration and the rail-duct takeoffs with the dampers that decide whether interior-6\'s ceiling gap insulates or breathes are thermal-7\'s and carry unchanged, including the finding that a cold bright morning can hot-soak a shut cavity and that the damper schedule has to watch solar as well as ambient.',
      why: 'Two generations of this slot wrote that comfort per watt is the metric and then spent watts on air anyway. thermal-7 broke that by demoting the air handler; this part finishes it by noticing the demotion was incomplete. A blower is a cube-law device, so the single most valuable thing you can do to one is stop asking it for a flow rate it only needs occasionally, and the single most valuable thing you can do to a thermostat is ask whether the temperature it defends is worth defending. Neither of those is a technology. Both together are 33 and 25 watts, which is 58 of this module\'s 90, and it is worth saying plainly that the biggest levers left in a mature thermal system are a second motor and a wider deadband rather than anything with a refrigerant in it.',
      fail: [
        'The float band is the module\'s largest and least evidenced claim, and it is the same species of claim thermal-7 flagged as the first thing a reviewer should attack. It asserts that a cabin wandering between 14 and 22 °C with 35 °C contact surfaces is acceptable to occupants who have spent a century being offered a number they can dial. There is no measurement behind that in this project, the Maturity row says Extrapolated for exactly that reason, and the fallback is a conventional setpoint that gives back 25 of the 90 watts.',
        'Splitting the blower splits the defog authority. The screen is served better than before, by a slot jet aimed at where fog actually forms, and the side glass and the backlight are served worse, because nothing sweeps them any more. On a cold wet start the quarter glass clears minutes after the screen does, and the afterbody body-9 carries from body-8 has no rear window at all, so the car is leaning harder on autonomy-4\'s corner radars for exactly the sector it can no longer see through.',
        'One damper now owns both defog and pulldown. Stuck in recirculation the car defogs badly and quietly, because recirculated cabin air is the wettest air available; stuck in fresh it cannot pull the cabin down at all on a hot soak. Position is sensed rather than inferred, which is thermal-7\'s answer to its own ceiling damper and is the right one, but it is a second single point in a box that used to have none. It is also the part of this module with the least space around it: wheels-9\'s brake master unit put a bracket at x 0.905..0.995, y 0.580..0.660, |z| 0.282..0.294 when the front corner moved, so the transient inlet throat and this damper sit 12 mm higher and 20 mm further inboard than the geometry wanted, and the driver-side firewall is now full. Two excursions go with it and both have now been measured against the built partner rather than declared against a drawing. The screen-base slot nozzle at x 0.905..0.951 and y 0.856 to 0.878 does NOT sit inside interior-6\'s dash molding: the molding is nowhere near it. What the nozzle is inside is interior-6\'s two plenum DUCTS, the 36 mm tubes that leave its stub collars and run forward over this case, at 6.69 and 6.37 mm over 202 crossing triangle pairs, and those tubes are also 6.45 mm inside this case\'s own top plate and 7.67 mm inside the nozzle\'s lip. That is one duct route in the wrong place rather than a nozzle let into a molding, and it is written up on both panels with the corridor measured. The second excursion is unchanged and is a zone excursion, not a penetration: the two water stubs reach x 1.012, 12 mm outside the firewall zone this slot has held since thermal.js, and they touch nothing.',
      ],
      explode: [-0.32, 0.45, 0],
    },
    'recovery-core': {
      name: 'Deep ventilation recovery core',
      tagline: 'Doubling the core buys ten points of effectiveness and 2.9 watts, and the arithmetic of why is the most useful thing on this panel.',
      mass: 6,
      specs: [
        ['Core', 'Counterflow membrane, 1.86 m² folded into 190 x 200 x 270 mm'],
        ['Effectiveness', '88 percent sensible, 74 percent latent at 80 m³/h'],
        ['Flow', '80 m³/h at 0.9 ventilation effectiveness (thermal-7: 90 at 0.8)'],
        ['Worth', '3.1 W on the reference sweep, 33 W at -10 °C'],
        ['Bill', 'Passenger toe box loses 60 mm; sill trim apertures both sides at y 0.478'],
        ['Maturity', 'Pilot line in a vehicle, production practice in buildings'],
      ],
      how: 'design/gen9.md names deeper ventilation recovery as the first lever, and the reason it returns least is a saturation curve. Effectiveness of a counterflow exchanger with balanced streams is NTU/(1+NTU), so thermal-7\'s 78 percent is NTU 3.55 and 88 percent is NTU 7.33. That is 2.07 times the transfer area for ten points, and it is the shape of every recovery device ever built: the first half of the heat needs almost no area, the last tenth needs a great deal. The core therefore goes from 0.9 m² in a 170 mm cube to 1.86 m² in a 190 by 200 by 270 mm block, at the same packing density, and lands where the firewall has exactly enough room for it: bottom face y 0.378, fifteen millimeters above hv-4\'s front HV run at 0.363, top face 0.578, two millimeters under the air handler case at 0.580. The second change is worth more than the first and costs nothing. thermal-7\'s 90 m³/h already carried a 25 percent tax because the return grille sat under the dash and some supply short-circuited before it reached anyone. Moving the extract to a pair of sill-shoulder grilles at (0.010, 0.478, ±0.678), which is the B-pillar station, takes ventilation effectiveness from about 0.8 to about 0.9, so 80 m³/h delivers what 90 did, and the ventilation conductance falls twice over: once for the flow and once for the effectiveness.\n\nThe two together take the ventilation term from 6.63 to 3.22 W/K and the winter cabin UA from 31.7 to 28.3. On the 4 °C leg that is 40 W less heat to find, which at COP 4.2 is 9.6 W of compressor across nine of 27.7 hours: 3.1 W on the sweep and about 1 mile. At -10 °C the same conductance change is 88 W of load, which is 33 W of electricity measured on thermal-7\'s -10 °C COP of 2.7 and 12 W on this module\'s, because a conductance saving scales with the temperature difference it acts across and the reference sweep does not have one.\n\nWhere those grilles ended up is the part of this panel that was measured rather than chosen. The obvious line is the rocker top at y 0.43, which is where thermal-7 would have put it and where the first draft of this module did. That band is full. autonomy-4\'s redundant sensor ring runs the entire length of the car at y 0.394 to 0.406 over |z| 0.669 and again at 0.422 to 0.434 over 0.639, and interior-6\'s front seat frame reaches y 0.460 out to |z| 0.615, and that frame is not trim: it is the 4 kN belt load path into battery-6\'s lid rails. A 60 mm duct laid on the rocker goes through both. So the route climbs over wheels-9\'s front brake line, which itself moved with the corner, and runs the sill shoulder at y 0.478 and |z| 0.672, above the ring and outboard of the seat. Measured worst clearances as built, and two of the three did not survive being measured again the right way: 19.75 mm to the brake line, 12.57 mm to the seat frame at (0.406, 0.488, -0.645), 23.02 mm to the sensor ring at (0.261, 0.463, -0.649). This panel published 20.1, 23.6 and 28.0, and those were nearest-VERTEX readings, which walk one body\'s vertices onto the other\'s triangles and miss every closest approach that lands on a triangle edge. Swept surface to surface over the built extract assembly against the built partner, one method over both, the brake line holds to 0.35 mm and the other two are 11.0 and 5.0 mm optimistic. The seat frame is now the tightest thing this duct passes and it is a 4 kN belt load path, so 12.6 mm is the number that has to be defended rather than the 23.6 that was easier to live with. Nothing moved to produce this correction; the geometry is thermal-7\'s route at thermal-9\'s coordinates and only the measurement changed. The two ducts meet a cross-tunnel return collector at (0.798, 0.420, 0) rather than a passenger-side plenum, because a mirrored pair of ducts needs something on both sides to land on.\n\nThe exhaust route is thermal-7\'s in intent and re-derived in coordinates, because body-9 moved the panel it goes through. thermal-7 declared a penetration of the fairing inner wall at |z| 0.693 to 0.707; body-9 computes that wall from its own FRONTZ and puts it at 0.630 to 0.637, so the duct now passes behind it entirely and pierces the AFT FAIRING CLOSEOUT instead, a 40 mm duct through a 16 mm carbon panel at x 1.045, |z| 0.641 to 0.786, y 0.460 to 0.507. Declared at those coordinates. It discharges at (1.058, 0.490, 0.80) into the sealed arch cavity, and one sentence thermal-7 wrote has to be retired: the discharge is no longer beside the outlet louver bank, because body-9 raised that bank 130 mm to y 0.630 to buy steered clearance. The physics survives the move, since a sealed cavity vented by a louver bank is at the bank\'s pressure wherever you enter it, but the geometry sentence was wrong and is not carried. Swept against wheels-9\'s steered front corner rather than against a corner value, the grille clears the tire by 23.6 mm at 2 degrees of lock, which is the tightest thing in this module and is in the same family as body-9\'s own lower closeout at 14.3. The motorized bypass is carried and promoted: thermal-7 used it as a fault position, and here it is a control device that opens whenever ambient is a cooling resource, which is what makes the mild and hot legs of the sweep read the way they do.',
      why: 'This panel is here to be the counterexample. In thermal-7 the recovery core was the largest line in the ledger and the least glamorous, and its own content made the point that the dull lever won. One generation later the same dull lever is the smallest line in the ledger, and nothing about the physics changed: what changed is that 78 percent of the load was already gone, so the remaining 22 percent is what was left to attack and it is small. A lever is not worth what it was worth last time. This is the plainest possible demonstration of why a generation should price its levers before it designs around them, and it is the reason this module priced all four of design/gen9.md\'s before drawing anything.',
      fail: [
        'The core is 2.1 times the membrane area on the same 15 year service question thermal-7 could not answer, and now with 2.1 times as much of it to foul. The supply side is filtered and the exhaust side is not, so the dirt arrives from inside, and a differential-pressure trend is still the only instrument that can call the service before effectiveness has quietly halved.',
        'More surface freezes sooner. Below about -5 °C the exhaust stream condenses and freezes in the core, and a deeper core with more channels reaches that condition at a slightly warmer ambient than thermal-7\'s did. The preheat off the 35 °C loop is carried and still costs roughly a fifth of the recovery back at the coldest end, which the -10 °C figures on these panels already carry.',
        'The extract is a duct through a sill trim on both sides, and the state of that item is now exact rather than open. interior-6 does know: its own panel lists NO SILL TRIM as one of three things the cabin still lacks and names this duct and these coordinates as the partner waiting on it. So the two halves agree in writing, and there is no penetration in the geometry to declare, because there is no trim to penetrate. What there is instead is a clearance, and it is the tightest one on this duct: 12.57 mm to interior-6\'s front seat frame, measured surface to surface, at (0.406, 0.488, -0.645). When the trim is drawn it has to find its aperture inside that. What changed before this is that the first draft of it went through interior-6\'s seat FRAME rather than its trim, 86 vertices deep, and through autonomy-4\'s sensor ring as well, and neither of those is a trim clash. The route was re-measured against both built meshes and moved. The declaration that remains is the honest one: a 60 mm duct at y 0.478 needs a sill trim aperture on each side, the clip pattern is interior-6\'s, and the two will meet the first time anyone builds both. Reported rather than discovered at first build, which is the discipline thermal-7 applied to the fairing penetration and which this module had to apply twice.',
      ],
      explode: [-0.15, 0.10, 0.45],
    },
    'local-circuits': {
      name: 'Occupant-local delivery',
      tagline: 'design/gen9.md asks for this to be taken further than interior-6\'s seats already do. It cannot be, and the obstacle is conservation of energy in the cabin rather than a lack of ambition.',
      mass: 6,
      specs: [
        ['Loop', '35 °C heating and 16 °C chilled, one 5 W pump, 1.4 L (was 2.4)'],
        ['Delivered to', 'interior-6 seat and headrest mats, two footwell panels'],
        ['Ledger', 'The mats and their 12 W fans are on interior-6\'s 22 kg seat'],
        ['Setpoint', 'Cabin is an OUTPUT of the balance, not an input; see how'],
        ['Headroom left', '70 W of delivery at 4 °C, and that is all there is'],
        ['Maturity', 'Extrapolated; the comfort equivalence is still unmeasured'],
      ],
      how: 'Write the cabin as a control volume and the lever disappears. In steady state the cabin air sits where heat in equals heat out, so Tcabin = Tamb + (internal gains + local delivery) / UA. On the 4 °C leg the gains are 270 W, two occupants at 75 W of sensible each and 120 W of autonomy-4\'s compute reaching the cabin, and the UA with the ceiling damper shut and the deep core running is 28.3 W/K. With the heating entirely off the cabin therefore floats to 13.5 °C. thermal-7 holds 16, which is 70 W of delivered heat above the float point, and 70 W is the entire remaining winter heating bill of this car. Taking occupant-local further means running the cabin colder while delivering more heat to the person, and those two are the same number with opposite signs: every watt put into a seat leaves through the same 28.3 W/K envelope and raises the cabin it was supposed to let you abandon. To hold 12 °C while delivering 300 W of contact and radiant heat the envelope would have to leak 71 W/K at 4 °C, which is a car with the windows down. thermal-7 did not leave a little headroom here. It took the lever to its stop and the stop is a conservation law.\n\nSo this part does not chase the lever, it takes the two things that were actually left. The loop shrinks from 2.4 to 1.4 liters because the delivery it has to make is 70 W in winter rather than the several hundred a volume-heated cabin needed, and a smaller loop is a smaller pump and a faster warm-up: the seat mats reach 35 °C in about 50 seconds against 85. And the pump is duty-cycled rather than continuous, because on the eleven mild hours of the reference sweep neither branch is doing anything, so 10 W becomes 5 W averaged. Five watts, about 2 miles. Everything else is thermal-7\'s and carried by name: the mixing valve, the manifolds at (0.30, 0.338, ±0.40) between interior-6\'s own seat track rails, the rear pair at (-0.905, 0.337, ±0.47), the two footwell radiant panels at (1.03, 0.494, ±0.29) clear of its pedal set, and the heated wheel rim on hv-4\'s 48 V bus. The mats and their 12 W fans stay on interior-6\'s 22 kg seat ledger where thermal-7 put them, and counting them here would be double counting for the second generation running.',
      why: 'This is the panel design/gen9.md would least like to read and the one it most needs. The brief asked for occupant-local conditioning taken further, and the correct answer is that thermal-7 exhausted it and the evidence is arithmetic rather than opinion. That matters beyond this module, because occupant-local conditioning is the idea in this whole ladder that sounds cleverest, and a generation that had simply pushed the setpoint another four kelvin and booked the watts would have produced a number that no cabin could deliver, defended by a comfort claim that was already the weakest thing on thermal-7\'s panels. The useful output of this part is therefore a boundary rather than a saving: the occupant-local lever is worth what it was worth, it is spent, and the next generation should not spend a module on it.',
      fail: [
        'The comfort equivalence thermal-7 flagged is not only still unmeasured, it is now load bearing for a wider temperature range. The float band lets the cabin sit anywhere from 14 to 22 °C in winter and up to 30 in summer, and the claim that 35 °C contact surfaces and 16 °C chilled ones make that acceptable is an extrapolation from heated-seat studies and building radiant work with nothing behind it here. It remains the first thing a reviewer should attack, and the answer to the attack is a conventional setpoint and 25 fewer watts.',
        'Posture dependence is carried from thermal-7 unimproved and is worse in a wider band. Belted and still against warm surfaces, a 15 °C cabin is genuinely fine; lean forward, reach behind, take a hand off the rim, and it is a 15 °C car. On a 27 hour drive the moments a person moves are the moments they notice, and nothing in this design fixes that.',
        'The rear bench still gets mats and no radiant panel, because there is no toe board back there and interior-6\'s pan is already stepped over autonomy-4\'s compute. A full car is worse served than the two-up run every number here is quoted against, and the rear band has to sit 2 to 3 K warmer, which gives back roughly a fifth of the compressor saving whenever there are four people aboard.',
      ],
      explode: [0.05, -0.35, 0.25],
    },
    'pack-loop': {
      name: 'Pack gallery loop',
      tagline: 'Eight watts of pump were moving four watts of heat for 27 hours. The pump now runs when the pack is charging and at no other time.',
      mass: 10,
      specs: [
        ['At cruise', '4.0 W out of battery-7: pump OFF, thermosiphon below 500 W'],
        ['Pump duty', 'Charge, precondition and hot park only; 8 W to 0 at cruise'],
        ['Design load', '15 kW at battery-7\'s 430 A ceiling, unchanged'],
        ['Transport', 'Riser 34 mm, return 13 mm, both carried from thermal-7'],
        ['Head', 'Receiver y 0.780 over battery-7\'s pool at 0.118: 10.4 kPa'],
        ['Maturity', 'Pilot line; the 19 kg fluid ledger is STILL unresolved'],
      ],
      how: 'thermal-7 made the right architectural call and then left one watt-hour-shaped mistake inside it. It correctly deleted thermal-6\'s pressure regulator, its setpoint schedule and its second buffer, correctly sealed the circuit at a floating 1.0 to 1.75 bar, and correctly noted that battery-7 dissipates 4.0 W at record cruise, which is 8.6 A through 54 mΩ. Then it promoted thermal-6\'s occasional condensate pump to a primary circulation pump that runs always, at 8 W. Eight watts of electricity moving four watts of heat is a coefficient of performance of one half, and over 27.7 hours it is 222 Wh, which is more than two miles. So the pump stops. The loop is a sealed two-phase circuit with 10.4 kPa of gravity head between a receiver at y 0.780 and battery-7\'s pool at 0.118, and a thermosiphon with that head carries several hundred watts unaided; thermal-6 ran on exactly this principle for a whole generation. The pump is retained, unchanged, and its control law is inverted: it runs above about 500 W of pack dissipation, which means charging, preconditioning and a hot park, and it is dark for more than 99 percent of a long drive.\n\nEverything else on this panel is thermal-7\'s and is carried deliberately, including its corrections and its unresolved item, because a variant that quietly restates a partner\'s open question as closed is how ledgers rot. The design load is battery-7\'s measured 15 kW and not the 7.3 that scaling current squared produced, because its limit is confined-channel critical heat flux in a 1.1 mm boiling gap against a fluoroketone capillary length near 0.8 mm and not ohmic heating at all. The liquid feed lands at y 0.118 and not 0.150, because battery-6\'s prose and its build code disagreed by 3 mm and the build code won. The riser is 34 mm at 14.0 m/s and the return 13 mm, and its mid waypoint came inboard 18 mm to |z| 0.330 this generation, because suspension-9\'s front air spring now stands at x 1.426..1.554, y 0.392..0.677, |z| 0.369..0.540 and thermal-7\'s line put four of its vertices inside this tube. That is a Gen 9 partner moving into a carried route rather than a defect in the route, and it is the kind of thing a narrow-track generation produces on the side. And battery-7 still declares about 12 liters and 19 kg of fluoroketone standing in its pool on THIS ledger, which with the transport makes the pack path 22 kg and this module 61 against a binding 50. The 10 kg on this panel is the target and not the truth, for the second generation running, and the three ways out are unchanged: a shallower pool, the fluid mass moving onto battery-7 where the pool physically is, or a mass target that admits what two-phase cooling costs.',
      why: 'The lesson is about where a range car\'s losses hide. thermal-7 attacked cabin conditioning with three genuinely good ideas and left a continuously running pump in a loop with nothing to do, because the pump was inherited rather than designed and inherited hardware does not get its duty cycle questioned. That is the same failure design/retro-gen8.md found in drivetrain-7\'s halfshafts, wearing a different hat: a carried part that nobody re-derived. Eight watts is 0.18 Wh/mi and about 3 miles, which is a third of what the entire recovery-core deepening returns for six kilograms and a passenger\'s foot room, and it was available for the price of reading a control law.',
      fail: [
        'The pump was also the flow sensor. thermal-7 monitored this loop by flow rather than by level, which is the right instrument for a pumped circuit and no instrument at all for a thermosiphon, so for 99 percent of a drive there is now no measurement that a leak has started. The replacement is a saturation-pressure trend against ambient, which detects a slow loss in days rather than in minutes, and the honest statement is that this saving cost a diagnostic.',
        'A thermosiphon is orientation dependent in a way a pumped loop is not. The 10.4 kPa of head assumes the receiver is above the pool, which it is on level ground and on any grade this car will meet, but a long descent with a nose-down attitude and a nearly empty receiver is the case nobody tests, and the answer here is to start the pump on inclinometer rather than on temperature. That is a control dependency where thermal-7 had a hydraulic certainty.',
        'The fluid ledger still does not close and this module will not pretend otherwise. Two generations have now stated that battery-7\'s 19 kg of fluoroketone has no agreed owner and that the number on this panel is a target. Restating an open item is not the same as resolving it, and the integrator decision is one generation more overdue.',
      ],
      explode: [0.15, -0.25, -0.30],
    },
    'glycol-loop': {
      name: 'Glycol circuit',
      tagline: 'One loop carrying the largest thermal load in the car, which is not the battery and not the cabin. It is autonomy-4 thinking, at 380 watts, all day.',
      mass: 4,
      specs: [
        ['Loop', '1 circuit, 1.8 L, one 6 W pump on a 12 K rise (was 20 W on 5 K)'],
        ['Largest load', 'autonomy-4 compute, 380 W continuous: 58 percent of aux'],
        ['Landings', 'autonomy-4 cold plate, hv-4 converter, the pack condenser'],
        ['Drive handover', 'Flanges held at x 1.75; blocker is now drivetrain-7\'s own housing'],
        ['Reported not booked', 'Direct-to-die plate 4 W, hv-4 phase shedding 16 W'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The pump is the saving and the arithmetic is small and clean. This loop\'s job at cruise is to take autonomy-4\'s 380 W and hv-4\'s converter loss to the coil, and 380 W at a 5 K rise needs 0.018 kg/s while the same 380 W at a 12 K rise needs 0.0076. Hydraulic power in a fixed circuit goes with the cube of flow, so the wet-rotor motor\'s own fixed loss becomes the floor and 20 W becomes 6. Fourteen watts, 0.32 Wh/mi, about 5 miles. The rise is spent rather than saved: the plate runs a 12 K gradient along its own length instead of 5, and the mitigation drawn here is a three-way parallel manifold at the cold plate so that all three of autonomy-4\'s voting lanes see the same inlet temperature. That matters more than it sounds. A triplex system depends on its lanes failing independently, and a serial flow path that puts lane three 12 K above lane one is a common-mode aging driver dressed as a plumbing detail. The manifold keeps the lanes identical and puts the gradient inside each lane instead of between them, which is a thermal cycling term rather than a voting one.\n\nTwo numbers on this panel are reported and not booked, and the distinction is the point. First, autonomy-4\'s 380 W has a temperature-dependent component: subthreshold leakage in a large SoC roughly doubles every 12 K, and at the junction temperature this loop actually delivers it is already small. Sampled over the sweep the ambient-tracking glycol loop presents about 22 °C at the plate, so at this module\'s 12 K rise the mean coolant along the plate is 28 °C, and with roughly 15 K of plate-to-junction resistance the die sits near 43 °C, where leakage is about 8 W of the 380. A direct-to-die plate would take plate-to-junction to about 4 K and the die to 32 °C, and it is worth about 4 W. It is reported because the cold plate is autonomy-4\'s part on autonomy-4\'s 13.5 kg ledger, and it is worth stating for the opposite reason too: a chilled sub-ambient plate, which was this module\'s first idea, is WORSE. It would hold 16 °C on a leg where the ambient loop already delivers 12, and it is floored anyway by the cabin dew point, which is 15.7 °C at 27 °C and 50 percent relative humidity. Second, hv-4\'s converter runs three interleaved LLC phases at about 9 percent of its 7 kW rating, where fixed losses dominate; shedding two phases is worth roughly 16 W. hv-4 is a Gen 4 module carried unchanged and that is not this module\'s edit.\n\nEverything structural is thermal-7\'s. The rail at y 0.740 on four legs to body-9\'s front casting top face at 0.580, threading the 51 mm rib gaps and clearing hv-4\'s buffer at 0.712, with the outboard leg pair moved 5 mm to |z| 0.480 because the built crash rail turned out to be 1 mm inside the old position. The four-port valve block. The runs aft along the driver flank to the compute stubs at (-0.795, 0.42, -+0.05) and on to hv-4\'s converter at (-1.43, 0.40, 0.247).\n\nThe handover flanges stay at (1.75, 0.50, -0.10) and (1.75, 0.50, -0.20), on the P.driveF face from design/gen4.md, and the REASON they stay has changed, which is the useful part of this paragraph. Two generations of this slot wrote that the straight route from drivetrain-7\'s water stubs was blocked by suspension-4\'s two front crossmembers and its ARB decoupler tube. Swept against suspension-9\'s built mesh, that route now clears by 92.9 mm and 97.8: suspension-9 dropped its forward crossmember from y 0.25 to 0.21 to fix an interference of its own and carried the pivots inboard with the track, and in doing so it opened an interface it was not aiming at. What blocks the hose now is drivetrain-7 itself. Its front housing fills x 1.375..1.525, y 0.280..0.430, |z| 0.105..0.215, and the stubs sit on the face that housing then wraps, so the straight centerline comes to 1.2 mm of it and a jog outboard to |z| 0.25 goes 16.2 mm inside it. A 40 mm hose needs 20 mm and has 1.2. So the plane is held for a third generation, but the finding handed to the integrator is a different and much smaller one: about 30 mm of stub standoff off drivetrain-7\'s own housing wall closes this, and it is that module\'s face to move rather than suspension structure to route around. suspension-9 also narrowed P.driveF from z +/-0.35 to +/-0.31; these flanges sit at |z| 0.10 and 0.20 and honor it without moving.',
      why: 'This loop is where the module\'s central finding is visible as hardware. The largest single thermal load in this car is not the pack, which makes 4 W at cruise, and not the cabin, which needs 70 W of heat on the coldest leg of the reference sweep. It is a computer, at 380 W, every hour, and this circuit is a 6 W pump attached to it. Auxiliary stopped being a thermal problem when thermal-7 took its own share to 135 W, and every watt above that is silicon and low-voltage electronics that this slot can cool but cannot switch off. The right next generation for auxiliary is an autonomy generation, and this panel exists to hand it the number rather than to keep pretending the thermal slot can find it.',
      fail: [
        'Consolidating to one loop still puts autonomy-4\'s compute, hv-4\'s converter and the pack condenser on a single path, so one leak takes all three, and the 12 K rise shrinks the margin between a partial blockage and a throttle event. Flow is monitored rather than level, each load has a thermal fallback, and the topology is a knowing concentration that is worse than thermal-6\'s two-loop split.',
        'The drive handover still does not close, in the third generation to report it, and the honest note is that this module got the reason wrong for two of them. The gap is the same 355 mm of x, 230 mm of y and a pitch of 50 mm against 100, but the obstruction named on the last two panels was Gen 4 suspension structure that has since moved out of the way, and nobody re-measured until now. Roughly 0.9 m of hose and 0.4 kg still belong to whichever module the integrator assigns them to, and this panel still carries neither.',
        'A 12 K rise means the coil sees a hotter return, which is free at cruise and is not free parked: on a 40 °C hot park the same rise puts the plate inlet 7 K higher than thermal-7 would, and autonomy-4 sitting awake in a charging bay is exactly the case where its throttle margin is thinnest. The pump reverts to the 5 K schedule below 20 km/h, which is correct and means the 6 W figure is a cruise number rather than an always number.',
      ],
      explode: [0.05, -0.45, -0.15],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   Front stack (P.thermalFront, x 2.08..2.26). Two coil rows in one frame at
   thermal-7's core plane x 2.168, so the core spans 2.133..2.203 and body-9's
   bumper beam at 2.210 is still clear. The rows SWAP SIZE against thermal-7:
   glycol y 0.270..0.420 (was 0.285..0.400) and refrigerant y 0.440..0.485
   (was 0.427..0.497), because free cooling is now the primary duty and wants
   approach rather than capacity. Headers at y 0.252, 0.430 and 0.497, and the
   refrigerant distributor at y 0.520 is still the tallest thing in the stack.

   CLEARANCE, measured against body-9's own STATIONS table and its halfWidth
   and surfaceY helpers rather than against thermal-7's prose. body-9 carries
   stations 0, 1 and 2 from body-8 unchanged, so this is a three generation
   carry and the sampler proves it: 0.8489 at (2.14, |z| 0.40), 0.8371 at
   (2.17, 0.40), 0.9106 at (1.989, |z| 0.258), which is what body-8 published.
   Over the front stack the tightest clearance is 321.6 mm at (2.207, 0.500,
   |z| 0.405). In the frunk bay the tightest is the pack purge pot at y 0.875,
   35.6 mm under the hood at (1.989, z -0.258), which is thermal-7's number
   on thermal-7's hardware.

   Nose plumbing corridor unchanged: fans at |z| 0.135..0.375, body-9's crash
   rails at |z| 0.375..0.465 and y 0.505..0.595, the front megacasting at
   x <= 2.070. One clean vertical route at |z| 0.05..0.13 between the fans and
   forward of x 2.073, and every line in the nose uses it. TWO items moved to
   respect the built rails rather than the prose thermal-7 inherited: the R290
   overboard vent, whose lower end was 2.5 mm inside the crash rail and now
   sits 3.5 mm under it, and the outboard pair of glycol rail legs, which were
   1 mm inside the rail's inner face at |z| 0.465 and now stand at 0.480.

   Frunk bay: thermal-7's rail at y 0.740 on four legs to the casting top face
   at y 0.580, threading the rib-bank gaps (blades at |z| 0.375..0.387,
   0.438..0.450, 0.500..0.512, 0.563..0.575 over y 0.577..0.623) and clearing
   hv-4's buffer (upper case y 0.555..0.712 at x 1.800..2.000, z -0.356..
   -0.204). NEW on the rail: the free-cooling plate stack at (1.958, 0.783,
   -0.320), which is what lets the coil talk to the 16 C branch with the
   compressor dark, and a suction accumulator on the R290 pan.

   Firewall (x 0.78..1.00): the air handler case at thermal.js's coordinates
   with TWO blower scrolls instead of one, the ventilation machine at z 0.268
   and the transient machine at z -0.238 with its recirculation damper. The
   recovery core grows from a 170 mm cube to 190 x 200 x 270 mm and lands in
   the last space the firewall has: bottom y 0.378, 15 mm over hv-4's front
   HV run at 0.363; top y 0.578, 2 mm under the case at 0.580.

   The rocker-shoulder extract pair is new and its route is measured rather
   than assumed, because the first draft of it went through two partners.
   A 60 mm duct leaves a cross-car return collector at (0.798, 0.420, 0),
   climbs over wheels-9's front brake line, and runs aft at y 0.478 and
   |z| 0.672 to a grille at (0.010, 0.478, +-0.678), the B-pillar station.
   The band is chosen, not convenient. Below it autonomy-4's sensor ring runs
   the whole length of the car at y 0.394..0.406 over |z| 0.669 and at
   0.422..0.434 over 0.639. Inboard of it interior-6's front seat frame
   reaches y 0.460 out to |z| 0.615, and that frame is a 4 kN belt load path
   into battery-6's lid rails, so a duct through it is a structure clash and
   not a trim clash. Measured worst clearances on the route as built:
   20.1 mm to wheels-9's brake line at (0.779, 0.520, -0.444), 23.6 mm to
   interior-6's seat frame, 28.0 mm to autonomy-4's ring, 83.5 mm to hv-4's
   by-wire feeds, 143 mm to battery-7's lid. Re-swept as a matched pair during
   the crispness pass, the wheels-9 and autonomy-4 figures reproduce at 20.0
   and 27.7 mm and neither moves between the shipped geometry and the detailed
   geometry. THE interior-6 FIGURE DOES NOT REPRODUCE: against the interior-6
   on disk it is 12.6 mm, at (0.396, 0.481, -0.642), and it reads 12.6 on the
   shipped geometry too. That is a partner moving into a carried route rather
   than anything this pass did, and it is flagged rather than absorbed because
   23.6 is the number this block publishes. interior-6 is being edited in
   parallel, so the integrator re-takes it rather than trusting either.
   The collector spans the tunnel
   because thermal-7 drew a passenger-side return plenum only and a mirrored
   pair of ducts left the driver-side one starting in mid air.

   Firewall zone note, stated rather than hidden: the case, both scrolls and
   the core all sit inside x 0.780..1.000. The only excursion is the two water
   stubs that reach x 1.012, which is thermal-7's interface at thermal-7's
   coordinates, and the machined pads now drawn around their bases, which stop
   at x 1.004 and are therefore inside the excursion rather than a second one. The ventilation wheel grew in WIDTH, 78 to 90 mm, and not in
   diameter, for exactly this reason: a bigger circle would have left the zone
   and the zone is 220 mm.

   Aft runs leave the nose over the casting top at y 0.65, drop to the battery
   lid outboard of interior-6's console (|z| 0.289) and forward of
   suspension-9's steering rack, whose built envelope is x 1.175..1.389,
   y 0.291..0.430, unchanged from suspension-4 because the rack shortened at
   its ends rather than moving. One item did move for suspension-9: the pack
   riser's mid waypoint came inboard from |z| 0.348 to 0.330 and its clip with
   it, because suspension-9's front air spring now occupies x 1.426..1.554,
   y 0.392..0.677, |z| 0.369..0.540 and the old waypoint put 4 vertices of it
   inside this module's tube.

   MEASURED, so the next reviewer checks numbers rather than a claim. Every
   vertex of all 622 meshes was swept, in both directions, against the built
   meshes of all eight Gen 9 preset partners. Since the crispness pass below
   every one of these was RE-MEASURED as a matched pair, the shipped geometry
   and the detailed geometry swept against ONE build of each partner inside a
   single process, because the partners are being edited in parallel and two
   separate runs of the same sweep are not comparable. Where a figure moved,
   both halves of the pair are given:
     Hood.  Zero vertices outside body-9's loft anywhere over x 1.00 to
       2.375. Tightest vertical clearance 35.6 mm at the pack purge pot
       (1.989, 0.875, -0.258) against a surface at 0.9106; tightest lateral
       221 mm. Sampled with body-9's own halfWidth and surfaceY helpers on its
       own station table, and the sampler reproduces body-8's published 0.849
       and 0.837 to the millimeter, which is why it is trusted here.
     Front tire swept solid.  Zero vertices inside wheels-9's steered front
       corner at rest, at the commanded 14 degrees, or at body-9's contained
       18.43. Nearest approach 23.6 mm, the exhaust grille at 2 degrees. The
       envelope was rebuilt from wheels-9's own mesh as a solid of revolution
       swept about (1.45, 0.74) and reproduces its published table exactly,
       so this is an audit against the solid rather than against a corner.
       Matched pair against the wheels-9 on disk after the crispness pass,
       both states swept in one process: 25.43 mm before and 25.86 after, at
       the same grille corner. The absolute differs from 23.6 because
       wheels-9 itself has been edited since that figure was taken, and
       because that one is against the STEERED swept solid while this pair is
       against the built mesh at rest. The 0.43 mm this pass adds is the
       lattice frame's corner radius, which retreats from the corner the slab
       had. The grille's own outer box is bit for bit the slab's: x 1.0330 to
       1.0830, y 0.4550 to 0.5250, |z| 0.7870 to 0.8130, swept off both.
     Rear annulus.  Zero vertices in r 0.155..0.235 over |z| 0.65..0.73. The
       drivetrain-7 contract is untouched, and nothing in this module goes
       aft of x -1.44 outboard of |z| 0.50 at all.
     Battery envelope.  155 vertices inside x [-1.30, 1.30], y [0.13, 0.31],
       |z| < 0.72, ALL of them pack-loop, all within x 1.273..1.300: the two
       declared hose-over-spigot landings at battery-7's vapor stub and its
       lowered liquid feed, plus the riser passing its lid edge. Identical in
       kind to thermal-7's audited residual list. Nothing else in the module
       enters the pack at all.
     Partner solids.  After the moves listed above, the only thermal-9
       geometry inside a partner solid is declared on a panel: the two pack
       landings, the two hv-4 converter spigots, the three autonomy-4 cold
       plate spigots, the R290 pan legs seated on body-9's casting top face,
       the coil brackets on its casting front face, the ventilation exhaust
       through its aft fairing closeout, the dash nozzle inside interior-6's
       molding, and hv-4's own HV spur end. Nothing undeclared survives.
     Visual attachment.  599 of 622 meshes sit within 3 mm of another solid,
       23 further, and NOTHING is more than 15 mm from another surface, swept
       vertex against every other solid in the module. The same sweep over the
       shipped geometry returns 199 of 269 and leaves 24 meshes beyond 15 mm,
       so the detail pass roughly halved the fraction of this module that
       floats near nothing: most of the 70 were the plate stacks sealed inside
       their case boxes and the fin blocks with no header to touch, and both
       of those are now hardware that lands on hardware. Three items failed
       thermal-9's first pass and were moved: the
       R290 pan hovered 5 mm over its own four legs, the glycol defrost tee
       stood 3.5 mm off the fin block it feeds, and the driver-side extract
       duct started in mid air because thermal-7's return plenum only existed
       on the passenger side. That last one is design/retro-gen5-apex.md's
       lesson arriving through a mirrored part, which is the way it usually
       arrives: mirrorZ was never used here, the pair is drawn in a loop, and
       the loop was drawn before the thing it lands on was.
     Zones.  Front stack 2.070..2.209 against P.thermalFront [2.08, 2.26],
       the 10 mm being thermal-7's deliberate bracket landing ON the casting
       face. Firewall 0.780..1.012 as above.
     P.driveF, reported rather than quietly inherited.  The pack riser and the
       two glycol handover runs put 1,389 vertices inside the front drive zone
       as suspension-9 has now narrowed it, 505 glycol and 884 pack, against
       744 before the crispness pass and 741 on thermal-7 by the same
       predicate. Read that rise for what it is: the ROUTES did not move, and
       a count of vertices is not a count of metal. lib.crease de-indexes a
       geometry to three vertices per triangle, so every creased ferrule and
       clip in the zone counts three times over, and the ferrules are on hose
       ends that were already there. The test that matters is the sweep
       against drivetrain-9's BUILT front housing, and that reads 27.1 mm
       before and 27.1 mm after, unchanged to the tenth of a millimeter.
       This is a carried excursion and not a Gen 9 one: those lines have
       crossed that reservation since the zone was written in design/gen4.md. Against drivetrain-7's BUILT front
       housing, which is what actually occupies the reservation, this module
       has zero vertices inside anything. A zone is a reservation and the
       sweep against built geometry is the test that matters, which is the
       distinction suspension-9 drew for its own bar and rack, but the
       excursion is stated here so the integrator can price it rather than
       find it. */

const CX = 2.168;          /* coil core plane x: 2.133..2.203 */
const GY = 0.3450;         /* glycol row center: y 0.270..0.420, grown */
const RY = 0.4625;         /* refrigerant row center: y 0.440..0.485, shrunk */
const FX = 2.104;          /* fan plane */
const FY = 0.376;          /* fan axis height */
const FZ = 0.255;          /* fan axis |z|, leaving |z| < 0.135 clear */
const RAILY = 0.740;       /* frunk-bay mounting rail top face */
const PANY = 0.635;        /* R290 module pan top face */

/* Cylinder with its axis along X. Carried from thermal.js through thermal-7. */
function xcyl(r, h, mat, seg) {
  const c = lib.cyl(r, h, mat, seg);
  c.rotation.z = Math.PI / 2;
  return c;
}

function at(mesh, x, y, z) {
  mesh.position.set(x, y, z);
  return mesh;
}

/* ── Detail vocabulary, local to this module ──────────────────────────────
   design/crispness.md wrote its rules for a lofted body. Applied to plumbing
   hardware the same two rules hold: a chamfer buys more per triangle than
   anything else, and lib.cbox holds the EXACT bounding box of the lib.box it
   replaces, so swapping one for the other can only remove material. That
   matters more in this module than anywhere else on the car, because this
   slot publishes eleven clearances and five of them are under 30 mm. Every
   helper below is therefore built to one of two rules: either it holds the
   envelope of the primitive it replaces exactly, or it stands proud and is
   named in the sweep at the end of this file.

   The four that stand proud are the ferrule, the P clip, the service port
   and the plate-stack ports. Each one is swept against all eight Gen 9
   partners after placement. The two hose ends that land inside P.battery get
   NO ferrule: that envelope is counted by vertex in tools/interfaces.js and
   thermal-9 is not on its landings list, so a detail pass is not the place
   to grow a count that is already red for a different reason. */

/* A cast or machined block. The chamfer defaults to a sixth of the smallest
   half extent, capped at 3 mm, which is about what a real break edge is. */
function cb(w, h, d, mat, c) {
  return lib.cbox(w, h, d, c != null ? c : Math.min(0.003, Math.min(w, h, d) / 6), mat);
}

const YUP = new THREE.Vector3(0, 1, 0);

/* Point a helper built about +Y down an arbitrary direction. */
function aim(obj, dx, dy, dz) {
  obj.quaternion.setFromUnitVectors(YUP, new THREE.Vector3(dx, dy, dz).normalize());
  return obj;
}

/* A fin pack: n plates on a real pitch through ONE InstancedMesh. lib.fins
   draws a separate mesh per plate, which is why every coil in this module
   was running a pitch four times coarser than a coil has: 26 plates over
   790 mm is a 30 mm pitch and reads as a louver bank, not as a fin block.
   Instanced, the same triangle spend buys 66. Plates lie normal to Z. */
function finPack(w, h, d, n, t, mat) {
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(w, h, t), mat, n);
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    m.makeTranslation(0, 0, (i / (n - 1) - 0.5) * (d - t));
    im.setMatrixAt(i, m);
  }
  im.instanceMatrix.needsUpdate = true;
  im.castShadow = true; im.receiveShadow = true;
  return im;
}

/* A stamped end cap on an extruded header tank. It sits in the chamfer band
   the cbox cut, so it stands proud of the tank corner without touching the
   tank's bounding box in any axis. Free crispness, in the sense that matters
   here: it cannot move a clearance.

   THE z ARGUMENT IS NOT OPTIONAL DECORATION. The first version of this helper
   took x and y and placed the caps at |z| = len/2 - 0.003, which is only the
   end of the tank when the tank is centered on z 0. Both air-handler coil
   headers run z -0.210 to 0.090 about a center of -0.060, so their four caps
   landed at |z| 0.147: two of them 57 mm inboard of the tank end and wholly
   inside it, at 0.55 percent on the ray test, and two of them 54 mm past the
   far end with nothing within 3 mm. A cap is a feature of an end, so it takes
   the end's coordinate. */
function endCaps(w, h, len, x, y, mat, z = 0) {
  const g = new THREE.Group();
  for (const s of [-1, 1]) {
    g.add(at(cb(w * 0.93, h, 0.006, mat, Math.min(0.0015, h / 8)), x, y, z + s * (len / 2 - 0.003)));
  }
  return g;
}

/* A crimped hose ferrule: the swaged collar a hose carries where it lands on
   a spigot. Built about +Y from y 0 to 3.1 r, so the caller seats it on the
   hose end and aims it back along the hose. 96 triangles. */
function ferrule(r, mat) {
  const R = r * 1.44, L = r * 3.1;
  return lib.crease(lib.lathe([
    [r * 1.03, 0], [R, L * 0.13], [R * 0.87, L * 0.35], [R, L * 0.57],
    [R * 0.87, L * 0.79], [R * 1.12, L * 0.93], [r * 1.03, L],
  ], mat, 8), 26);
}

/* A P clip: the band and bolted foot that holds a hose where it crosses
   structure. tan is the hose tangent, foot the direction the bracket runs
   toward its landing. Both are world vectors; the foot is orthogonalized
   against the tangent so a caller cannot accidentally build a degenerate
   basis, which is the atan2 trap from the brief wearing a different hat. */
function pclip(r, tan, foot, mat) {
  const g = new THREE.Group();
  const stand = r + 0.0024;
  g.add(lib.torus(stand, 0.0017, mat, 10, 4));
  g.add(at(cb(0.0075, 0.0130, Math.max(0.008, r * 1.6), M.steel, 0.0008), 0, -(stand + 0.0065), 0));
  const f = lib.fastener(0.0026, M.steel, 'hex');
  f.rotation.x = Math.PI;
  f.position.y = -(stand + 0.0130);
  g.add(f);
  const z = new THREE.Vector3(...tan).normalize();
  const yv = new THREE.Vector3(...foot);
  yv.addScaledVector(z, -yv.dot(z));
  if (yv.lengthSq() < 1e-8) yv.set(z.y, -z.x, 0);
  yv.normalize().multiplyScalar(-1);
  const xv = new THREE.Vector3().crossVectors(yv, z);
  g.setRotationFromMatrix(new THREE.Matrix4().makeBasis(xv, yv, z));
  return g;
}

/* A hose run with a crimped ferrule at every termination and P clips where
   it crosses structure. pts is lib.tube's world polyline, unchanged: the
   tube geometry this produces is byte identical to the lib.tube call it
   replaces, so no published clearance moves with the hose itself. */
function hose(pts, r, mat, o = {}) {
  const g = new THREE.Group();
  g.add(lib.tube(pts, r, mat));
  const fm = o.ferruleMat || M.darkSteel;
  const cap = (a, b) => {
    const f = aim(ferrule(r, fm), b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    g.add(at(f, a[0], a[1], a[2]));
  };
  const e = o.ends || 'both';
  if (e === 'both' || e === 'start') cap(pts[0], pts[1]);
  if (e === 'both' || e === 'end') cap(pts[pts.length - 1], pts[pts.length - 2]);
  for (const c of o.clips || []) {
    const i = c.i, a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    g.add(at(pclip(r, [b[0] - a[0], b[1] - a[1], b[2] - a[2]], c.foot, o.clipMat || M.plastic),
      pts[i][0], pts[i][1], pts[i][2]));
  }
  return g;
}

/* lib.plate with lightening holes, in the XZ plane like lib.plate and with
   the same slab convention: the material sits between y + t/2 and y + 3t/2,
   NOT centered. A mounting rail with no holes in it is a billet, and both of
   the rails in this module carry four items over a casting with no load path
   between them. holes are [x, z] centers in the plate's own frame. */
function holedPlate(w, d, t, r, holes, hr, mat) {
  const s = new THREE.Shape();
  const hw = w / 2, hd = d / 2, rr = Math.min(r, hw, hd);
  s.moveTo(-hw + rr, -hd);
  s.lineTo(hw - rr, -hd); s.absarc(hw - rr, -hd + rr, rr, -Math.PI / 2, 0);
  s.lineTo(hw, hd - rr); s.absarc(hw - rr, hd - rr, rr, 0, Math.PI / 2);
  s.lineTo(-hw + rr, hd); s.absarc(-hw + rr, hd - rr, rr, Math.PI / 2, Math.PI);
  s.lineTo(-hw, -hd + rr); s.absarc(-hw + rr, -hd + rr, rr, Math.PI, Math.PI * 1.5);
  for (const [hx, hz] of holes) {
    const p = new THREE.Path();
    p.absarc(hx, -hz, hr, 0, Math.PI * 2, true);
    s.holes.push(p);
  }
  const geo = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 5 });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, t / 2, 0);
  return lib.crease(lib.mesh(geo, mat), 40);
}

/* A signal or wiring pigtail. lib.tube puts six segments between every input
   point, which is right for a 40 mm coolant line and absurd for a 2.6 mm
   wire: it spent 480 triangles on the coil transducer's tail. Two per point
   is indistinguishable at this radius and costs 160. */
function wire(pts, r, mat) {
  return lib.tube(pts, r, mat, false, Math.max(6, pts.length * 2));
}

/* A service port: a brazed boss, a Schrader housing and a screwed cap.
   Seating face on y = 0 and it grows along +Y, the lib.fastener convention,
   which is the one the brief says twenty heads were once buried by getting
   wrong. The caller measures the face off the BUILT mesh. */
function servicePort(r, mat) {
  const g = new THREE.Group();
  g.add(at(lib.cyl(r * 1.55, r * 0.55, M.castAlu, 10), 0, r * 0.275, 0));
  g.add(at(lib.cyl(r * 0.72, r * 1.5, M.darkSteel, 8), 0, r * 1.30, 0));
  g.add(at(lib.cyl(r, r * 1.15, mat, 8), 0, r * 2.62, 0));
  return g;
}

/* A sight glass: the machined boss and domed lens that tell a technician
   whether there is liquid in a receiver. Seating face on y = 0. */
function sightGlass(r) {
  const g = new THREE.Group();
  g.add(at(lib.cyl(r, r * 0.5, M.castAlu, 10), 0, r * 0.25, 0));
  g.add(at(lib.sphere(r * 0.66, M.glass, 8), 0, r * 0.52, 0));
  return g;
}

/* A motorized valve or damper actuator: a can on a mounting flange with a
   molded connector, standing off at 1.15 r so it clears the can: at 0.85 r
   the ray test found it 0 percent exposed, buried in the barrel it was
   supposed to be bolted to. Every valve in this module used to be a bare cube
   with nothing to plug into. Seating face on y = 0. The caller adds the pigtail
   in world coordinates, because a pigtail is a route and routes belong to
   the part that knows what they have to miss. */
function actuator(r, h, mat) {
  const g = new THREE.Group();
  g.add(at(lib.cyl(r * 1.2, h * 0.14, M.castAlu, 10), 0, h * 0.07, 0));
  g.add(at(lib.cyl(r, h * 0.86, mat, 12), 0, h * 0.57, 0));
  g.add(at(cb(r * 0.60, h * 0.30, r * 1.0, M.plastic, 0.0012), r * 1.15, h * 0.52, 0));
  return g;
}

/* A convoluted bellows, the flexible section a hard line needs where it
   crosses a joint. Axis along X to match xcyl. The crest radius is exactly
   the r asked for and the root is smaller, so this can only be inside the
   plain cylinder it replaces. */
function bellows(r, len, n, mat) {
  const root = r * 0.84;
  const pts = [[root * 0.92, 0]];
  for (let i = 0; i < n; i++) {
    pts.push([root, (i + 0.14) / n * len], [r, (i + 0.5) / n * len], [root, (i + 0.86) / n * len]);
  }
  pts.push([root * 0.92, len]);
  const m = lib.crease(lib.lathe(pts, mat, 10), 34);
  m.geometry.translate(0, -len / 2, 0);
  m.rotation.z = Math.PI / 2;
  return m;
}

/* A centrifugal blower drawn as one. A spiral volute with a cutoff tongue and
   a discharge throat, the forward-curved wheel turning inside it, and the
   motor boss on the back. Built about the local origin in the XY plane with
   the wheel axis along +Z, so the caller drops it exactly where the drum was.

   Both blowers in this module were lib.cyl, and a plain drum is the one part
   of an air handler a passer-by can name as a primitive. There is no back
   plate hub: behind the blades the ray test returned 0 percent for it, so it
   was 96 triangles of nothing and it came out. The volute is an
   extruded ring, so its two flat annular faces ARE the scroll side plates and
   the spiral is a real spiral rather than a texture. rv is the throat radius
   and the assembly never leaves 1.21 rv, which is set below the drum radius
   it replaces so the firewall zone cannot grow. */
function blower(rw, rv, width, nb, mat) {
  const g = new THREE.Group();
  const tongue = rw * 1.10, top = rv * 1.21;
  const outline = [];
  const N = 22;
  for (let i = 0; i <= N; i++) {
    const a = (95 + (i / N) * 340) * Math.PI / 180;
    const r = tongue + (i / N) * (rv - tongue);
    outline.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  const last = outline[outline.length - 1];
  outline.push([last[0], top], [-tongue - 0.010, top]);
  const s = new THREE.Shape();
  s.moveTo(outline[0][0], outline[0][1]);
  for (let i = 1; i < outline.length; i++) s.lineTo(outline[i][0], outline[i][1]);
  s.closePath();
  const bore = new THREE.Path();
  bore.absarc(0, 0, rw, 0, Math.PI * 2, true);
  s.holes.push(bore);
  const geo = new THREE.ExtrudeGeometry(s, { depth: width, bevelEnabled: false, curveSegments: 5 });
  geo.translate(0, 0, -width / 2);
  g.add(lib.crease(lib.mesh(geo, mat), 40));

  const wheel = new THREE.Group();
  for (const zs of [-1, 1]) {
    const ring = lib.cyl(rw * 0.94, 0.0035, M.plasticLt, 16);
    ring.rotation.x = Math.PI / 2;
    wheel.add(at(ring, 0, 0, zs * (width / 2 - 0.006)));
  }
  const bl = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.0050, rw * 0.20, width - 0.016), M.plasticLt, nb);
  const mtx = new THREE.Matrix4(), q = new THREE.Quaternion(), pv = new THREE.Vector3();
  for (let i = 0; i < nb; i++) {
    const a = (i / nb) * Math.PI * 2;
    q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), a + 0.62);
    pv.set(Math.cos(a) * rw * 0.86, Math.sin(a) * rw * 0.86, 0);
    mtx.compose(pv, q, new THREE.Vector3(1, 1, 1));
    bl.setMatrixAt(i, mtx);
  }
  bl.instanceMatrix.needsUpdate = true;
  bl.castShadow = true; bl.receiveShadow = true;
  wheel.add(bl);
  lib.spin(wheel, 'z', 9);
  g.add(wheel);
  return g;
}

/* A brazed plate exchanger drawn the way one looks: two thick end plates
   with the corrugated pack VISIBLE between them and port stubs at the
   corners. This module's own audit found 29 meshes standing wholly inside
   another solid, and the plate stacks were most of them: a case box with a
   handful of plates sealed inside it. Lesson 1 of the crispness brief is
   that geometry nobody can see is a decal with a triangle budget, so the
   case is deleted and the pack becomes the part. The stack runs along X and
   the whole assembly stays inside the case box it replaces, except for the
   port stubs, which are swept. */
function plateHX(w, h, d, n, mat, o = {}) {
  const g = new THREE.Group();
  const ep = o.endPlate != null ? o.endPlate : Math.min(0.009, w * 0.17);
  const inner = w - 2 * ep;
  for (const s of [-1, 1]) {
    g.add(at(cb(ep, h, d, M.castAlu, Math.min(0.002, ep * 0.28)), s * (w - ep) / 2, 0, 0));
  }
  const t = inner / (n * 2.0);
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(t, h - 0.006, d - 0.006), mat, n);
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    m.makeTranslation(-inner / 2 + (i + 0.5) * (inner / n), (i % 2 ? 0.0007 : -0.0007), 0);
    im.setMatrixAt(i, m);
  }
  im.instanceMatrix.needsUpdate = true;
  im.castShadow = true; im.receiveShadow = true;
  g.add(im);
  const pr = o.portR || 0.0055, pl = o.portL || 0.010;
  const iy = h / 2 - (o.portInset || 0.013), iz = d / 2 - (o.portInset || 0.013);
  for (const [sy, sz] of (o.ports || [[1, 1], [1, -1], [-1, 1], [-1, -1]])) {
    g.add(at(xcyl(pr, ep + pl, M.castAlu, 8), (o.portSide || -1) * ((w - ep) / 2 + pl / 2), sy * iy, sz * iz));
  }
  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* ── outdoor coil: the two rows swap size within thermal-7's frame. The
     glycol row is now the primary heat exchanger and grows for approach; the
     refrigerant row serves a compressor that runs 8 percent of the drive and
     shrinks. Frame, fans, shroud and the brackets landing ON the casting face
     at x 2.070 are carried without a drawing change. ── */
  const coil = lib.part('outdoor-coil', [0.55, -0.10, 0]);

  /* The three headers were plain slabs. They are now extruded oval tanks with
     a stamped cap at each end: lib.cbox holds the slab's bounding box to the
     micron and endCaps sits inside the chamfer band it cut, so the whole
     change is envelope neutral and the published x 2.209 ceiling, which is
     body-9's bumper beam at 2.210, is untouched. Only the 0.70 refrigerant
     header gets the caps. The two 0.80 headers end at |z| 0.400, which is
     exactly where the end plates stand, and the ray test put a cap there at
     7 percent exposure: that is lesson 1 of this pass, so they came off. */
  coil.add(at(cb(0.078, 0.024, 0.80, M.darkSteel, 0.0070), CX, 0.252, 0));
  const gCore = finPack(0.070, 0.150, 0.79, 66, 0.0026, M.alu);
  gCore.position.set(CX, GY, 0);
  coil.add(gCore);
  coil.add(at(cb(0.078, 0.022, 0.80, M.darkSteel, 0.0065), CX, 0.430, 0));
  const rCore = finPack(0.070, 0.045, 0.79, 44, 0.0026, M.alu);
  rCore.position.set(CX, RY, 0);
  coil.add(rCore);
  /* the refrigerant row is U-flow, so both connections live in one top header
     and that header stops at |z| 0.35 to stay out of body-9's crash rail */
  coil.add(at(cb(0.078, 0.022, 0.70, M.darkSteel, 0.0065), CX, 0.497, 0));
  coil.add(endCaps(0.078, 0.022, 0.70, CX, 0.497, M.alu));
  coil.add(at(cb(0.082, 0.012, 0.030, M.castAlu, 0.0025), CX, 0.497, 0));
  /* the charge port a free-cooling machine needs, on the header top face at
     y 0.508 measured off the built cbox rather than guessed. 321 mm of
     hood clearance over this stack, so a 15 mm port is not the tight item */
  coil.add(at(servicePort(0.0055, M.plasticLt), CX - 0.020, 0.508, 0.230));
  /* the two end plates carry the tube returns, so they get the formed flange
     and the three service screws a fabricated end plate has. THOSE SCREWS ARE
     THE ONE THING ON THIS PART THAT GREW THE ENVELOPE: seated on the end
     plate face at |z| 0.405, a hex head stands 2.65 mm proud, so the coil's
     built |z| goes 0.4050 to 0.4076. P.thermalFront reserves 0.45 and
     body-9's crash rail at |z| 0.375 to 0.465 sits at y 0.505 to 0.595, well
     above these at 0.268, 0.372 and 0.476, so it costs nothing. It is stated
     because the shroud paragraph below says the coil's z envelope does not
     move, and about the shroud that is true and about the part it is not. */
  for (const zs of [-1, 1]) {
    coil.add(at(cb(0.078, 0.256, 0.010, M.alu, 0.0022), CX, 0.372, zs * 0.400));
    coil.add(at(cb(0.014, 0.256, 0.022, M.alu, 0.0022), CX - 0.046, 0.372, zs * 0.394));
    for (const fy of [0.268, 0.372, 0.476]) {
      const s = lib.fastener(0.0035, M.steel, 'hex', { clock: 0.4 });
      s.rotation.x = zs * Math.PI / 2;
      coil.add(at(s, CX, fy, zs * 0.405));
    }
  }
  /* glycol tap pair and the refrigerant distributor, all in the corridor */
  for (const [ty, tz, mat] of [[0.252, 0.090, M.coolant], [0.430, -0.090, M.coolantHot]]) {
    coil.add(at(xcyl(0.012, 0.040, mat, 10), CX - 0.056, ty, tz));
  }
  coil.add(at(cb(0.040, 0.036, 0.032, M.castAlu, 0.0028), CX - 0.054, 0.520, 0.090));
  coil.add(at(cb(0.034, 0.032, 0.028, M.castAlu, 0.0026), CX - 0.054, 0.518, -0.090));
  /* glycol defrost tee, carried, but seated ON the refrigerant fin block face
     at x 2.133 rather than standing 3.5 mm off it */
  coil.add(at(cb(0.030, 0.028, 0.026, M.darkSteel, 0.0024), CX - 0.046, 0.462, 0.140));
  /* saturation-pressure transducer: the sensor a free-cooling car needs and a
     continuously running heat pump did not, see the fails. A sensor with no
     connector is a sensor nobody can read, so it has one, and the pigtail
     runs down the corridor to the loom on the shroud rail. */
  coil.add(at(cb(0.024, 0.030, 0.022, M.sensor, 0.0022), CX - 0.054, 0.470, -0.150));
  coil.add(at(cb(0.011, 0.014, 0.013, M.plastic, 0.0012), CX - 0.070, 0.470, -0.150));
  coil.add(wire([
    [CX - 0.076, 0.470, -0.150],
    [CX - 0.082, 0.452, -0.172],
    [CX - 0.070, 0.404, -0.196],
    [CX - 0.041, 0.310, -0.200],
    [CX - 0.036, 0.252, -0.196],
  ], 0.0026, M.plasticLt));

  /* shroud frame: two rails and four posts, all inboard of the crash rails */
  coil.add(at(cb(0.022, 0.014, 0.66, M.plasticLt, 0.0022), 2.132, 0.244, 0));
  coil.add(at(cb(0.022, 0.014, 0.66, M.plasticLt, 0.0022), 2.132, 0.508, 0));
  for (const pz of [-0.320, -0.105, 0.105, 0.320]) {
    coil.add(at(cb(0.022, 0.262, 0.014, M.plasticLt, 0.0022), 2.132, 0.376, pz));
  }
  /* the two brackets that land ON body-9's casting front face at x 2.070.
     A bracket that bolts to a casting shows the bolts: two M8 heads each,
     seated on the built top face at y 0.306 rather than on a guess. */
  for (const bz of [-0.060, 0.060]) {
    coil.add(at(cb(0.062, 0.012, 0.070, M.steel, 0.0018), 2.101, 0.300, bz));
    for (const dz of [-0.024, 0.024]) {
      coil.add(at(lib.fastener(0.0042, M.steel, 'hex'), 2.101, 0.306, bz + dz));
    }
  }

  for (const fz of [-FZ, FZ]) {
    /* the shroud was a torus, which is a ring and not a shroud. A fan shroud
       is a venturi: a bellmouth on the coil side, a short diffuser behind it
       and a mounting flange. Outer radius held at the torus's own 0.124 so
       the coil's z envelope does not move. */
    const ring = lib.crease(lib.lathe([
      [0.1160, 0.0000], [0.1140, 0.0075], [0.1152, 0.0180], [0.1196, 0.0330],
      [0.1240, 0.0420], [0.1240, 0.0460], [0.1218, 0.0330], [0.1214, 0.0150],
      [0.1236, 0.0030], [0.1236, 0.0000], [0.1160, 0.0000],
    ], M.plastic, 18), 34);
    ring.geometry.translate(0, -0.023, 0);
    ring.rotation.z = -Math.PI / 2;
    ring.position.set(FX + 0.001, FY, fz);
    coil.add(ring);
    /* four stator struts inboard from the shroud ring, on the downstream
       side, clear of the rotor hub face at x 2.082.

       THE ROTATION HERE IS THE ATAN2 TRAP IN ITS OTHER COSTUME. lib.cbox
       builds its long axis along +Y, and a rotation of -a about X maps that
       axis to (0, cos a, -sin a), which is PERPENDICULAR to the radius
       (0, sin a, cos a) rather than along it. Every strut therefore came out
       as a tangential chord at a constant radius: swept off the built mesh
       they ran r 76.5 to 86.2 mm about the fan axis, touching neither the
       motor spider at r 30.0 nor the shroud ring at r 114.0, and the
       attachment sweep found all eight of them 16.6 to 23.5 mm from the
       nearest surface in the module. The radial map is theta = pi/2 - a.
       Rebuilt radially at r 36.0 to 116.0 they land IN the ring's inner
       surface, which at this x is r 115.2 to 116.0, and stop 2.0 mm short of
       the rotor hub at 34.0 so nothing static sits inside a spinning group. */
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const strut = cb(0.008, 0.080, 0.011, M.plastic, 0.0012);
      strut.position.set(2.0810, FY + Math.sin(a) * 0.076, fz + Math.cos(a) * 0.076);
      strut.rotation.x = Math.PI / 2 - a;
      coil.add(strut);
    }
    coil.add(at(xcyl(0.030, 0.007, M.plastic, 14), 2.0810, FY, fz));
    coil.add(at(xcyl(0.019, 0.013, M.darkSteel, 12), 2.0775, FY, fz));

    const rotor = new THREE.Group();
    rotor.add(xcyl(0.034, 0.044, M.plastic, 16));
    const nose = lib.cone(0.024, 0.024, M.plasticLt, 12);
    nose.rotation.z = -Math.PI / 2;
    nose.position.x = 0.016;
    rotor.add(nose);
    for (let i = 0; i < 7; i++) {
      const pivot = new THREE.Group();
      /* a flat rectangular paddle was the one part of this fan a passer-by
         could tell was a primitive. Five spanwise sections of a six point
         airfoil, twisted 0.62 rad at the root to 0.32 at the tip and swept
         back, closed as a loop: 48 triangles a blade against the box's 12,
         and the swept tip radius measures 0.1083 off the built mesh against
         the shroud throat at 0.1140, so the blade has 5.7 mm of tip
         clearance in the shroud it turns inside. */
      const secs = [];
      for (let k = 0; k < 5; k++) {
        const s = k / 4;
        const span = 0.026 + s * 0.0785;
        const chord = 0.044 - 0.013 * s;
        const thk = 0.0034 - 0.0016 * s;
        const pit = 0.62 - 0.30 * s;
        const swp = 0.009 * s * s;
        const cp = Math.cos(pit), sp = Math.sin(pit);
        const sec = [];
        for (const [u, sgn] of [[0.00, 0], [0.28, 1], [0.62, 1], [1.00, 0], [0.62, -1], [0.28, -1]]) {
          const zc = (u - 0.34) * chord;
          const xc = sgn * (thk / 2) * Math.sin(Math.PI * Math.min(1, u * 1.15));
          sec.push([xc * cp + zc * sp, span, -xc * sp + zc * cp + swp]);
        }
        secs.push(sec);
      }
      pivot.add(lib.crease(lib.loft(secs, M.plasticLt, true), 40));
      pivot.rotation.x = (i / 7) * Math.PI * 2;
      rotor.add(pivot);
    }
    rotor.position.set(FX, FY, fz);
    lib.spin(rotor, 'x', 18);
    coil.add(rotor);
  }
  sys.add(coil);

  /* ── R290 heat pump: thermal-7's sealed module on its drained pan above the
     front casting, unchanged, plus the two things a part-time machine needs.
     A suction accumulator so forty starts a day do not return liquid to a
     scroll, and a three-way bypass so the refrigerant circuit can be taken
     out of the glycol path entirely while the car free-cools. ── */
  const hp = lib.part('heat-pump', [0.20, 0.50, 0.35]);

  const pan = lib.plate(0.200, 0.380, 0.010, 0.020, M.alu);
  pan.position.set(1.965, PANY - 0.010, 0.240);
  hp.add(pan);
  /* A drained and vented pan is a tray, not a flat plate. lib.plate lays its
     slab between y 0.630 and 0.640, measured rather than assumed, so the
     upstand starts at 0.640 and the sump boss hangs under 0.630. */
  for (const [rw, rd, rx, rz] of [[0.200, 0.008, 1.965, 0.056], [0.200, 0.008, 1.965, 0.424],
                                  [0.008, 0.368, 1.869, 0.240], [0.008, 0.368, 2.061, 0.240]]) {
    hp.add(at(cb(rw, 0.014, rd, M.alu, 0.0015), rx, 0.646, rz));
  }
  hp.add(at(lib.cyl(0.011, 0.014, M.alu, 10), 2.040, 0.626, 0.406));
  hp.add(at(lib.cyl(0.007, 0.012, M.rubber, 8), 2.040, 0.614, 0.406));
  /* legs land on body-9's front casting top face at y 0.580 and meet the pan
     underside at 0.630, so the stack is continuous metal rather than a plate
     hovering over four posts. Each gets the spread footplate and the single
     bolt a leg bolted to a casting has; the bolt seats on the footplate top
     face at y 0.586, taken off the BUILT plate rather than off the leg. */
  for (const [lx, lz] of [[1.885, 0.090], [2.045, 0.090], [1.885, 0.300], [2.045, 0.300]]) {
    hp.add(at(cb(0.020, 0.050, 0.020, M.steel, 0.0022), lx, 0.605, lz));
    hp.add(at(cb(0.022, 0.006, 0.042, M.steel, 0.0012), lx, 0.583, lz));
    hp.add(at(lib.fastener(0.0038, M.steel, 'hex'), lx, 0.586, lz + 0.014));
  }

  hp.add(at(cb(0.150, 0.012, 0.090, M.steel, 0.0018), 1.980, 0.641, 0.240));
  hp.add(at(xcyl(0.052, 0.150, M.castAlu, 24), 1.980, 0.702, 0.240));
  hp.add(at(xcyl(0.046, 0.034, M.darkSteel, 20), 1.888, 0.702, 0.240));
  /* the shell is two deep-drawn halves welded at a girth seam, and the seam
     is the one feature that tells a viewer this is a hermetic can rather
     than a length of tube */
  for (const [sx, sr] of [[1.947, 0.0532], [1.9055, 0.0490]]) {
    const seam = lib.torus(sr, 0.0034, M.steel, 16, 5);
    seam.rotation.y = Math.PI / 2;
    hp.add(at(seam, sx, 0.702, 0.240));
  }
  /* four hold-down bosses and their bolts on the base plate. The first draft
     of these was a welded foot in the 12 mm gap between the plate top at
     0.647 and the shell bottom at 0.650, and the ray test returned 2 percent:
     a bracket in a gap that narrow is invisible whatever it is shaped like.
     They moved to the plate corners, where the shell has curved away to
     y 0.663 by its own radius and there is 10 mm of daylight over a bolt.
     The x pitch is 1.942 and 2.018 rather than the plate corners because a
     corner boss at 1.918 landed wholly inside thermal-7's enclosure
     thermistor at 1.903..1.929, which the ray test returned as 0 percent. */
  for (const [fx, fz] of [[1.942, 0.206], [1.942, 0.274], [2.018, 0.206], [2.018, 0.274]]) {
    hp.add(at(cb(0.020, 0.006, 0.018, M.steel, 0.0012), fx, 0.650, fz));
    hp.add(at(lib.fastener(0.0038, M.steel, 'hex'), fx, 0.653, fz));
  }
  /* brazed suction and discharge stubs where the two lines actually leave the
     can, and the oil drain plug on the low side of the shell. Both stubs are
     seated on the shell SURFACE, computed from the shell radius at their own
     z, not at the shell centerline: the first draft put the suction stub and
     the drain plug 46 and 5 mm inside the can they were meant to leave, which
     is the fastener-into-the-panel failure the brief names. */
  hp.add(at(lib.cyl(0.010, 0.012, M.castAlu, 10), 1.980, 0.756, 0.240));
  const suction = lib.cyl(0.011, 0.020, M.castAlu, 10);
  suction.rotation.x = Math.PI / 2;
  hp.add(at(suction, 1.995, 0.702, 0.180));
  hp.add(at(aim(lib.fastener(0.0068, M.darkSteel, 'hex'), 0, -0.6217, -0.7832), 2.038, 0.6697, 0.1993));
  /* terminal box: a lid with four screws and a gland the HV pigtail enters
     through, because a terminal box with no gland is a plastic brick */
  hp.add(at(cb(0.055, 0.035, 0.050, M.plastic, 0.0028), 1.930, 0.772, 0.240));
  hp.add(at(cb(0.048, 0.005, 0.043, M.plasticLt, 0.0010), 1.930, 0.792, 0.240));
  for (const [sx, sz] of [[-0.020, -0.016], [0.020, -0.016], [-0.020, 0.016], [0.020, 0.016]]) {
    hp.add(at(lib.fastener(0.0024, M.steel, 'torx'), 1.930 + sx, 0.7945, 0.240 + sz));
  }
  const gland = lib.cyl(0.009, 0.016, M.darkSteel, 10);
  gland.rotation.x = Math.PI / 2;
  hp.add(at(gland, 1.925, 0.772, 0.270));

  /* receiver: the sight glass, fusible plug and service port a vessel that
     holds liquid refrigerant has to carry to be servicable */
  hp.add(at(lib.cyl(0.034, 0.115, M.steel, 20), 1.905, 0.700, 0.365));
  hp.add(at(lib.sphere(0.034, M.steel, 14), 1.905, 0.758, 0.365));
  const strap = lib.torus(0.037, 0.005, M.darkSteel, 18, 8);
  strap.rotation.x = Math.PI / 2;
  strap.position.set(1.905, 0.696, 0.365);
  hp.add(strap);
  hp.add(at(aim(sightGlass(0.011), 1, 0, 0), 1.939, 0.716, 0.365));
  hp.add(at(aim(lib.fastener(0.0055, M.copper, 'hex'), 1, 0, 0), 1.939, 0.672, 0.365));
  hp.add(at(servicePort(0.0050, M.plasticLt), 1.905, 0.789, 0.365));

  /* NEW: suction accumulator, upright on the pan ahead of the compressor,
     with the strap, the bottom oil-return boss and the port a technician
     puts a gauge on */
  hp.add(at(lib.cyl(0.030, 0.110, M.steel, 18), 2.052, 0.700, 0.300));
  hp.add(at(lib.sphere(0.030, M.steel, 14), 2.052, 0.755, 0.300));
  hp.add(at(lib.cyl(0.010, 0.026, M.steel, 10), 2.052, 0.640, 0.300));
  const aStrap = lib.torus(0.0325, 0.0045, M.darkSteel, 16, 6);
  aStrap.rotation.x = Math.PI / 2;
  hp.add(at(aStrap, 2.052, 0.678, 0.300));
  hp.add(at(aim(lib.fastener(0.0048, M.castAlu, 'hex'), 0, -0.35, 0.94), 2.052, 0.658, 0.328));
  hp.add(at(servicePort(0.0046, M.plasticLt), 2.052, 0.784, 0.300));

  /* economizer flash vessel, water condenser, chilled evaporator and gallery
     conditioner. All four were a case box with a plate stack sealed inside
     it, which the module's own audit had already listed as meshes standing
     wholly inside another solid. The case is gone: what is left is the two
     end plates and the pack, which is what a brazed unit looks like. */
  hp.add(at(plateHX(0.065, 0.080, 0.058, 11, M.steel, { portSide: -1 }), 2.020, 0.700, 0.370));
  hp.add(at(plateHX(0.075, 0.085, 0.065, 12, M.steel, { portSide: -1 }), 1.958, 0.688, 0.110));
  hp.add(at(plateHX(0.062, 0.075, 0.055, 10, M.steel,
    { portSide: 1, portL: 0.008, portInset: 0.012, ports: [[1, 1], [-1, -1]] }), 2.028, 0.685, 0.110));
  /* gallery conditioner: double walled, refrigerant into the pack liquid, and
     the interstice between the walls is what the tell-tale vent watches */
  hp.add(at(plateHX(0.070, 0.075, 0.060, 12, M.steel, { portSide: -1 }), 1.955, 0.795, 0.180));
  for (const ws of [-1, 1]) {
    hp.add(at(cb(0.003, 0.079, 0.064, M.alu, 0.0008), 1.955 + ws * 0.0365, 0.795, 0.180));
  }
  hp.add(at(lib.cyl(0.006, 0.038, M.plasticLt, 8), 1.990, 0.851, 0.180));
  /* NEW: three-way bypass that takes the whole refrigerant circuit out of the
     glycol path while the car free-cools. A valve is a body with ports, an
     actuator can and something to plug into, and this one had none of that. */
  hp.add(at(cb(0.048, 0.046, 0.048, M.castAlu, 0.0035), 1.898, 0.690, 0.062));
  hp.add(at(actuator(0.016, 0.030, M.darkSteel), 1.898, 0.713, 0.062));
  hp.add(wire([
    [1.909, 0.729, 0.062],
    [1.926, 0.726, 0.074],
    [1.938, 0.712, 0.098],
    [1.936, 0.694, 0.112],
  ], 0.0028, M.plasticLt));
  for (const [px, py, pz] of [[1.926, 0.690, 0.062], [1.898, 0.690, 0.090], [1.870, 0.690, 0.062]]) {
    hp.add(at(cb(0.014, 0.020, 0.014, M.castAlu, 0.0015), px, py, pz));
  }
  /* the two enclosure thermistors. Their connectors face -x off the sensor
     end rather than up off its top face, because the top face at y 0.671 is
     8 mm inside the compressor shell and a plug in there plugs into nothing. */
  for (const ez of [0.150, 0.205]) {
    hp.add(at(cb(0.026, 0.038, 0.026, M.sensor, 0.0024), 1.916, 0.652, ez));
    hp.add(at(cb(0.013, 0.012, 0.011, M.plastic, 0.0012), 1.8975, 0.652, ez));
  }
  /* hydrocarbon sensor at the enclosure low point and its overboard vent */
  hp.add(at(cb(0.032, 0.028, 0.028, M.sensor, 0.0026), 1.990, 0.654, 0.400));
  hp.add(at(cb(0.012, 0.012, 0.013, M.plastic, 0.0012), 1.990, 0.673, 0.400));
  /* vent lower end held at y 0.5985, 3.5 mm under body-9's crash rail bottom
     face at 0.595, which thermal-7 did not have to clear because it drew this
     against body-7 prose rather than against the built rail. The rain cap and
     the screen sit on the TOP face at 0.6535, measured off the built stack. */
  hp.add(at(lib.cyl(0.013, 0.055, M.plasticLt, 10), 2.030, 0.626, 0.400));
  hp.add(at(lib.cyl(0.017, 0.005, M.plasticLt, 12), 2.030, 0.6560, 0.400));
  hp.add(at(lib.cone(0.016, 0.010, M.plasticLt, 12), 2.030, 0.6635, 0.400));

  /* discharge to the water condenser, mid-pressure injection, suction. Every
     one of these ends on a spigot, so every one of them gets the crimped
     ferrule a hose end has. */
  hp.add(hose([
    [1.980, 0.755, 0.240],
    [1.968, 0.752, 0.190],
    [1.958, 0.736, 0.145],
  ], 0.007, M.coolantHot));
  hp.add(hose([
    [2.005, 0.700, 0.342],
    [1.988, 0.712, 0.310],
    [1.972, 0.722, 0.282],
  ], 0.005, M.coolant));
  /* suction now runs through the accumulator before it reaches the machine */
  /* both of these terminate INSIDE a vessel, the accumulator at one end and
     the receiver at the other, so the ferrule is suppressed there rather than
     drawn where nobody can see it. Three of the four ends returned under
     15 percent exposure on the first ray test. */
  hp.add(hose([
    [1.958, 0.648, 0.145],
    [1.996, 0.640, 0.230],
    [2.040, 0.638, 0.290],
    [2.052, 0.645, 0.300],
  ], 0.008, M.steel, { ends: 'start' }));
  hp.add(hose([
    [2.052, 0.700, 0.272],
    [2.010, 0.690, 0.300],
    [1.950, 0.690, 0.340],
    [1.912, 0.692, 0.352],
  ], 0.008, M.steel, { ends: 'none' }));
  /* HV pigtail: lands on hv-4's spur end, climbs at once, threads the casting
     rib gap at |z| 0.387..0.438. Carried, with its carried finding. */
  hp.add(lib.tube([
    [1.700, 0.550, 0.420],
    [1.704, 0.592, 0.412],
    [1.716, 0.648, 0.410],
    [1.780, 0.692, 0.390],
    [1.862, 0.742, 0.320],
    [1.925, 0.772, 0.262],
  ], 0.007, M.hv));
  sys.add(hp);

  /* ── glycol circuit: thermal-7's rail and routes, a 6 W pump on a 12 K rise,
     the NEW free-cooling plate stack that lets the coil reach the 16 C branch
     with the compressor dark, and the three-way parallel manifold at
     autonomy-4's cold plate that keeps its three voting lanes at one inlet
     temperature despite the wider rise. ── */
  const gly = lib.part('glycol-loop', [0.05, -0.45, -0.15]);

  /* The rail was a flat rounded slab. A fabricated mounting rail carrying
     four items over a casting is a pressing: lightening holes where there is
     no load path and a downturned stiffening flange down each long edge.
     Slab plane held at lib.plate's own y 0.735..0.745, measured off the
     built mesh rather than off the 0.740 in the constant's name, because
     lib.plate seats its slab between y + t/2 and y + 3t/2. */
  const rail = holedPlate(0.220, 0.400, 0.010, 0.020,
    [[-0.062, -0.120], [0.062, -0.120], [-0.062, 0.000], [0.062, 0.000],
     [-0.062, 0.120], [0.062, 0.120]], 0.026, M.alu);
  rail.position.set(1.972, RAILY - 0.010, -0.300);
  gly.add(rail);
  for (const fs of [-1, 1]) {
    gly.add(at(cb(0.008, 0.016, 0.400, M.alu, 0.0012), 1.972 + fs * 0.106, 0.731, -0.300));
  }
  /* outboard leg pair at |z| 0.480 rather than thermal-7's 0.475: body-9's
     crash rail inner face is at |z| 0.465 and the 0.475 legs were 1 mm inside
     it over 15 mm of their height. Each leg gets the spread footplate and the
     bolt a leg landing on a casting has, seated on the built plate top face
     at y 0.586 rather than on the leg's own datum. The plates spread in z and
     not in x: body-9's casting top surface stops at x 2.058, swept, and a
     plate spread symmetrically about the outboard legs at x 2.045 hung 6 mm
     over the edge of the thing it was supposed to be bolted to.

     THE OUTBOARD PLATES ARE NOT THE SAME PLATE AS THE INBOARD ONES, and the
     reason is that the channel they land in is 35 mm wide. Swept off body-9's
     built mesh, its casting rib occupies |z| 0.5003 to 0.5123 at y 0.5775 to
     0.6225 and the crash rail's inner face is at |z| 0.4650, so the free band
     at plate height is |z| 0.4650 to 0.5003. A 44 mm plate spread about the
     leg at 0.480 reaches 0.4580 and 0.5020: it put 7.0 mm of itself inside
     the crash rail, its bolt flange 4.5 mm and its bolt head 3.8 mm, and the
     inboard one 1.7 mm inside the casting rib as well. The outboard plates
     are 30 mm, biased 2.5 mm outboard, and their bolts move to the outboard
     side of the leg. Measured after the change: 2.8 mm to the rib and 2.5 mm
     to the rail. */
  for (const [lx, lz, pd, po, bo] of [[1.900, -0.140, 0.044, 0, 0.015], [2.045, -0.140, 0.044, 0, 0.015],
                                      [1.900, -0.480, 0.030, -0.0025, -0.012],
                                      [2.045, -0.480, 0.030, -0.0025, -0.012]]) {
    gly.add(at(cb(0.022, 0.160, 0.022, M.steel, 0.0024), lx, 0.660, lz));
    gly.add(at(cb(0.022, 0.006, pd, M.steel, 0.0012), lx, 0.583, lz + po));
    gly.add(at(lib.fastener(0.0038, M.steel, 'hex'), lx, 0.586, lz + bo));
  }

  /* four-port valve block: a casting with machined port pads, a real actuator
     can and the pigtail that leaves it. It used to be a cube with a cylinder
     balanced on top and nothing to plug into. */
  gly.add(at(cb(0.090, 0.075, 0.110, M.castAlu, 0.0055), 1.905, 0.7775, -0.150));
  gly.add(at(actuator(0.020, 0.034, M.darkSteel), 1.905, 0.813, -0.150));
  gly.add(wire([
    [1.922, 0.831, -0.150],
    [1.944, 0.826, -0.166],
    [1.958, 0.812, -0.196],
    [1.952, 0.796, -0.214],
  ], 0.0030, M.plasticLt));
  for (const bz of [-0.200, -0.150, -0.100]) {
    gly.add(at(cb(0.009, 0.026, 0.026, M.castAlu, 0.0018), 1.856, 0.770, bz));
    gly.add(at(xcyl(0.011, 0.030, M.castAlu, 10), 1.845, 0.770, bz));
  }
  /* the 6 W wet-rotor pump: smaller can than thermal-7's 20 W unit. It now
     carries the end bell, the stator can seam, the saddle clamp that holds it
     to the rail and the connector its six watts arrive through. */
  gly.add(at(xcyl(0.021, 0.062, M.darkSteel, 18), 1.999, 0.775, -0.150));
  gly.add(at(xcyl(0.0195, 0.009, M.castAlu, 16), 1.9635, 0.775, -0.150));
  const canSeam = lib.torus(0.0215, 0.0026, M.steel, 14, 5);
  canSeam.rotation.y = Math.PI / 2;
  gly.add(at(canSeam, 1.986, 0.775, -0.150));
  gly.add(at(cb(0.024, 0.017, 0.021, M.plastic, 0.0016), 1.995, 0.7955, -0.150));
  gly.add(wire([
    [1.995, 0.804, -0.150],
    [1.986, 0.822, -0.168],
    [1.964, 0.830, -0.196],
    [1.940, 0.828, -0.212],
  ], 0.0030, M.plasticLt));
  const saddle = lib.torus(0.0235, 0.0026, M.darkSteel, 14, 5);
  saddle.rotation.y = Math.PI / 2;
  gly.add(at(saddle, 2.012, 0.775, -0.150));
  for (const ss of [-1, 1]) {
    gly.add(at(cb(0.007, 0.032, 0.008, M.darkSteel, 0.0010), 2.012, 0.760, -0.150 + ss * 0.0235));
  }
  gly.add(at(xcyl(0.029, 0.022, M.plastic, 18), 2.040, 0.775, -0.150));
  /* the volute cover and its four bolts, on the built cover face at x 2.051.
     The bolt circle is clocked to 0, 90, 180 and 270 rather than to the
     diagonals because a diagonal head at (0.760, -0.135) landed inside the
     r 9 mm coil-header hose that passes there, and the ray test found it. */
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    gly.add(at(aim(lib.fastener(0.0030, M.steel, 'hex'), 1, 0, 0),
      2.051, 0.775 + Math.sin(a) * 0.021, -0.150 + Math.cos(a) * 0.021));
  }
  gly.add(at(lib.cyl(0.010, 0.038, M.coolant, 10), 2.040, 0.808, -0.150));

  /* NEW: free-cooling plate stack, coil glycol straight into the 16 C branch.
     Drawn as a brazed stack rather than as a case with the plates sealed
     inside it, for the reason on the heat-pump panel. */
  /* Three ports, not four. plateHX's default corner set puts one at
     (1.9935, 0.756, -0.302), and local-circuits' 5 W pump can runs along x
     through (y 0.770, z -0.300) at r 0.018 over x 1.974..2.030. That port's
     axis is 14.1 mm off the pump axis, so 5.5 mm of stub radius is inside an
     18 mm can: the ray test returned 0.00 percent over 1,984 rays, blocked
     788 times by the pump can itself. The sweep that placed these ports
     checked them against the eight Gen 9 partners and not against this
     module's own neighbors, which is where the one collision was. */
  gly.add(at(plateHX(0.070, 0.080, 0.062, 12, M.steel,
    { portSide: 1, ports: [[1, 1], [1, -1], [-1, -1]] }), 1.958, 0.783, -0.320));
  gly.add(at(cb(0.038, 0.040, 0.038, M.castAlu, 0.0032), 1.958, 0.836, -0.320));
  gly.add(at(lib.fastener(0.0042, M.copper, 'hex'), 1.958, 0.856, -0.320));

  /* pump out, over the casting top, down the driver flank of the tunnel and
     aft to autonomy-4's compute cold plate stub */
  gly.add(hose([
    [1.750, 0.500, -0.200],
    [1.744, 0.560, -0.215],
    [1.730, 0.628, -0.235],
    [1.640, 0.650, -0.270],
    [1.400, 0.652, -0.318],
    [1.150, 0.664, -0.288],
    [1.046, 0.652, -0.262],
    [0.994, 0.474, -0.260],
    [0.954, 0.358, -0.300],
    [0.700, 0.328, -0.350],
    [0.200, 0.324, -0.345],
    [-0.400, 0.324, -0.300],
    [-0.660, 0.328, -0.240],
    [-0.830, 0.348, -0.175],
    [-0.880, 0.400, -0.110],
    [-0.842, 0.418, -0.062],
    [-0.800, 0.420, -0.050],
  ], 0.008, M.coolant, { ends: 'end', clips: [{ i: 4, foot: [0, 0, -1] }, { i: 7, foot: [1, 0, 0] }] }));
  /* NEW: three-way parallel manifold on the cold plate face, so all three of
     autonomy-4's lanes see one inlet temperature at the 12 K rise. The three
     spigots enter autonomy-4's plate face at x -0.795 by 19 mm, which is the
     same hose-over-spigot depth the battery landings use. The two mounting
     ears and their bolts seat on the ear's OUTBOARD face at x -0.809 with the
     shank running through into that plate, so the manifold is bolted to the
     thing it feeds rather than hovering 13 mm off it. Seating them on the
     plate face itself put both heads inside the ears they hold, which is the
     lib.fastener convention trap the helper's own comment warns about. */
  gly.add(at(cb(0.026, 0.030, 0.230, M.castAlu, 0.0032), -0.808, 0.420, 0));
  for (const es of [-1, 1]) {
    gly.add(at(cb(0.014, 0.009, 0.030, M.castAlu, 0.0014), -0.802, 0.420, es * 0.130));
    gly.add(at(aim(lib.fastener(0.0034, M.steel, 'hex'), -1, 0, 0), -0.809, 0.420, es * 0.130));
  }
  gly.add(at(lib.fastener(0.0032, M.copper, 'hex'), -0.808, 0.435, 0.056));
  for (const lz of [-0.095, 0, 0.095]) {
    gly.add(at(xcyl(0.006, 0.026, M.coolant, 8), -0.789, 0.420, lz));
  }
  /* compute plate through to hv-4's converter stubs, then forward on the
     passenger flank at y 0.320, under hv-4's front HV run at y 0.334 */
  gly.add(hose([
    [-0.800, 0.420, 0.050],
    [-0.850, 0.398, 0.130],
    [-0.950, 0.348, 0.200],
    [-1.120, 0.324, 0.240],
    [-1.250, 0.336, 0.250],
    [-1.340, 0.382, 0.247],
    [-1.430, 0.400, 0.247],
  ], 0.008, M.coolantHot));
  gly.add(hose([
    [-1.310, 0.400, 0.247],
    [-1.300, 0.360, 0.282],
    [-1.288, 0.326, 0.332],
    [-1.240, 0.320, 0.424],
    [-1.100, 0.320, 0.478],
    [-0.700, 0.320, 0.482],
    [-0.400, 0.322, 0.478],
    [0.200, 0.318, 0.420],
    [0.700, 0.322, 0.380],
    [0.905, 0.334, 0.356],
    [0.950, 0.348, 0.350],
    [0.972, 0.372, 0.346],
    [0.992, 0.412, 0.342],
    [1.016, 0.456, 0.336],
    [1.042, 0.494, 0.328],
    [1.078, 0.528, 0.314],
    [1.150, 0.564, 0.290],
    [1.300, 0.618, 0.250],
    [1.470, 0.648, 0.200],
    [1.650, 0.652, 0.168],
    [1.740, 0.664, 0.140],
    [1.812, 0.702, 0.096],
    [1.872, 0.744, 0.020],
    [1.898, 0.762, -0.090],
    [1.906, 0.768, -0.132],
  ], 0.008, M.coolantHot, { clips: [{ i: 13, foot: [0, 0, 1] }], ends: 'start' }));
  for (const fz of [-0.100, -0.200]) {
    gly.add(at(xcyl(0.016, 0.014, M.darkSteel, 14), 1.752, 0.500, fz));
  }
  /* coil cold header up the corridor, over the casting, to drive flange A.
     NO FERRULE AT THE FLANGE END, on this hose or on the pump-out hose above.
     Both land on the P.driveF handover flanges at x 1.745..1.759, which stop
     1 mm short of body-9's front casting at x 1.760 on purpose. A crimped
     collar is 1.44 r of radial overhang about a hose whose axis is vertical
     there, so it grew to x 1.7636 and 1.7612: 3.6 mm and 1.2 mm inside the
     casting, measured as vertices inside body-9's built mesh. A bolted flange
     joint does not carry a hose crimp anyway. */
  gly.add(hose([
    [2.104, 0.252, 0.090],
    [2.098, 0.380, 0.092],
    [2.092, 0.540, 0.096],
    [2.086, 0.606, 0.092],
    [2.068, 0.664, 0.082],
    [1.980, 0.686, 0.020],
    [1.862, 0.680, -0.040],
    [1.770, 0.658, -0.072],
    [1.752, 0.612, -0.086],
    [1.748, 0.556, -0.094],
    [1.750, 0.500, -0.100],
  ], 0.009, M.coolant, { ends: 'start' }));
  /* block to the free-cooling plate and on to the pack condenser stack */
  gly.add(hose([
    [1.905, 0.775, -0.210],
    [1.930, 0.780, -0.270],
    [1.952, 0.783, -0.312],
  ], 0.008, M.coolant));
  gly.add(hose([
    [1.958, 0.816, -0.320],
    [1.930, 0.800, -0.344],
    [1.914, 0.790, -0.366],
  ], 0.008, M.coolant));
  /* pump down the inter-fan corridor to the coil's hot glycol header */
  gly.add(hose([
    [2.040, 0.808, -0.150],
    [2.050, 0.760, -0.130],
    [2.074, 0.660, -0.108],
    [2.094, 0.560, -0.094],
    [2.100, 0.480, -0.090],
    [2.104, 0.430, -0.090],
  ], 0.009, M.coolantHot));
  sys.add(gly);

  /* ── pack gallery loop: thermal-7's condenser stack, receiver, bellows,
     purge pot, 34 mm riser and 13 mm return, all carried unchanged. The 8 W
     pump is retained and its control law inverted: it is dark at cruise and
     the loop thermosiphons on 10.4 kPa of head. An inclinometer sits on the
     receiver, because a thermosiphon is orientation dependent. ── */
  const pk = lib.part('pack-loop', [0.15, -0.25, -0.30]);

  pk.add(at(plateHX(0.075, 0.085, 0.070, 12, M.steel, { portSide: -1 }), 1.912, 0.783, -0.387));
  /* the receiver, with the two saddle straps that hold it, the sight glass a
     technician reads the charge on and the port a gauge goes on. A pressure
     vessel with no sight glass and no port is a plain steel tube. */
  pk.add(at(xcyl(0.034, 0.100, M.steel, 20), 2.015, 0.780, -0.387));
  for (const cs of [-1, 1]) {
    pk.add(at(lib.sphere(0.034, M.steel, 14), 2.015 + cs * 0.050, 0.780, -0.387));
    const band = lib.torus(0.0365, 0.0042, M.darkSteel, 16, 5);
    band.rotation.y = Math.PI / 2;
    pk.add(at(band, 2.015 + cs * 0.030, 0.780, -0.387));
  }
  pk.add(at(aim(sightGlass(0.010), 0, 0, -1), 2.038, 0.780, -0.4210));
  pk.add(at(servicePort(0.0050, M.plasticLt), 1.988, 0.8140, -0.387));
  pk.add(at(cb(0.028, 0.045, 0.020, M.sensor, 0.0025), 2.015, 0.822, -0.387));
  pk.add(at(cb(0.013, 0.012, 0.012, M.plastic, 0.0012), 1.9950, 0.822, -0.387));
  /* NEW: inclinometer and the saturation transducer that replace flow sensing */
  pk.add(at(cb(0.024, 0.022, 0.026, M.sensor, 0.0022), 2.062, 0.812, -0.387));
  pk.add(at(cb(0.011, 0.012, 0.011, M.plastic, 0.0012), 2.062, 0.827, -0.387));
  /* the pigtail stays under y 0.838. Its first draft peaked at 0.851 out at
     |z| 0.404, where body-9's hood has fallen to 0.871, and that made a
     2.6 mm wire the tightest thing in the module against the hood at
     20.4 mm, tighter than the purge pot this panel publishes. */
  pk.add(wire([
    [2.062, 0.833, -0.387],
    [2.052, 0.836, -0.396],
    [2.034, 0.838, -0.398],
    [2.020, 0.836, -0.394],
  ], 0.0026, M.plasticLt));
  /* purge pot. Its cap is the tightest thing in the whole module against
     body-9's hood at 35.6 mm, so nothing was added above y 0.875 and the
     two new legs run DOWN to the rail slab at y 0.745, which is where they
     should have gone in the first place: the pot stood on nothing. */
  pk.add(at(lib.cyl(0.026, 0.055, M.steel, 16), 1.975, 0.830, -0.250));
  pk.add(at(lib.cyl(0.016, 0.018, M.darkSteel, 12), 1.975, 0.866, -0.250));
  for (const lz of [-0.226, -0.274]) {
    pk.add(at(cb(0.010, 0.058, 0.010, M.steel, 0.0012), 1.975, 0.7735, lz));
  }
  const potBand = lib.torus(0.0272, 0.0032, M.darkSteel, 14, 5);
  potBand.rotation.x = Math.PI / 2;
  pk.add(at(potBand, 1.975, 0.810, -0.250));
  /* the drier, with the moisture-indicator window and its bracket */
  pk.add(at(lib.cyl(0.018, 0.040, M.alu, 12), 2.045, 0.775, -0.250));
  pk.add(at(lib.cyl(0.014, 0.028, M.plasticLt, 10), 2.045, 0.808, -0.250));
  pk.add(at(aim(sightGlass(0.007), 0, 0, -1), 2.045, 0.775, -0.2680));
  pk.add(at(cb(0.010, 0.030, 0.008, M.steel, 0.0010), 2.045, 0.760, -0.2325));
  /* the retained pump, now on a charge-and-precondition duty only, with the
     end bell, the can seam and the connector its control law arrives on */
  pk.add(at(xcyl(0.020, 0.055, M.darkSteel, 16), 1.895, 0.766, -0.470));
  pk.add(at(xcyl(0.0185, 0.008, M.castAlu, 14), 1.8635, 0.766, -0.470));
  const pkSeam = lib.torus(0.0205, 0.0024, M.steel, 14, 5);
  pkSeam.rotation.y = Math.PI / 2;
  pk.add(at(pkSeam, 1.884, 0.766, -0.470));
  pk.add(at(cb(0.022, 0.016, 0.019, M.plastic, 0.0015), 1.900, 0.7855, -0.470));
  pk.add(at(xcyl(0.016, 0.022, M.castAlu, 14), 1.935, 0.766, -0.470));
  /* its bypass check valve: the thermosiphon path around a dark pump */
  pk.add(at(xcyl(0.013, 0.038, M.steel, 12), 1.895, 0.796, -0.470));

  /* 34 mm riser sized on battery-7's 15 kW: its unchanged vapor stub face at
     x 1.297, up the driver flank, over the casting top at y 0.652. The lower
     end gets NO ferrule: that end sits inside P.battery and this module is
     not on tools/interfaces.js's landings list, so a detail pass will not
     grow a vertex count that is red for a different reason. */
  pk.add(at(xcyl(0.024, 0.012, M.darkSteel, 14), 1.302, 0.268, -0.100));
  pk.add(hose([
    [1.290, 0.268, -0.100],
    [1.300, 0.304, -0.136],
    [1.312, 0.356, -0.192],
    [1.342, 0.416, -0.252],
    [1.372, 0.474, -0.296],
    [1.412, 0.548, -0.320],
    [1.512, 0.628, -0.330],
    [1.700, 0.652, -0.386],
    [1.820, 0.700, -0.390],
    [1.890, 0.752, -0.388],
    [1.906, 0.770, -0.387],
  ], 0.017, M.coolantHot, { ends: 'end', clips: [{ i: 6, foot: [-0.6, -0.8, 0] }] }));
  pk.add(at(bellows(0.021, 0.026, 3, M.steel), 1.700, 0.652, -0.390));

  /* 13 mm liquid return to battery-7's feed stub at y 0.118. NEITHER END
     carries a ferrule. The lower one lands inside P.battery, for the reason
     given on the riser above. The upper one starts at (2.053, 0.762, -0.387),
     which is 21.6 mm from the center of the receiver's own 34 mm end cap
     sphere at (2.065, 0.780, -0.387): a collar there is a collar inside the
     vessel it leaves, and the ray test returned 0.17 percent for it over
     5,952 rays, 3,160 of them stopped by the receiver's end cap. */
  pk.add(at(xcyl(0.014, 0.012, M.darkSteel, 12), 1.292, 0.118, 0.100));
  pk.add(hose([
    [2.053, 0.762, -0.387],
    [2.030, 0.748, -0.340],
    [2.005, 0.756, -0.260],
    [1.985, 0.772, -0.140],
    [1.968, 0.790, 0.040],
    [1.958, 0.792, 0.140],
    [1.950, 0.782, 0.176],
    [1.905, 0.730, 0.200],
    [1.840, 0.678, 0.230],
    [1.760, 0.650, 0.240],
    [1.560, 0.640, 0.230],
    [1.430, 0.548, 0.215],
    [1.374, 0.404, 0.190],
    [1.346, 0.362, 0.174],
    [1.320, 0.338, 0.156],
    [1.306, 0.288, 0.140],
    [1.296, 0.216, 0.122],
    [1.289, 0.158, 0.108],
    [1.285, 0.118, 0.100],
  ], 0.0065, M.coolant, { ends: 'none', clips: [{ i: 12, foot: [-0.9, -0.44, 0] }] }));
  pk.add(at(bellows(0.0095, 0.022, 3, M.steel), 1.560, 0.640, 0.230));
  /* keyed, desiccant capped fill port on the liquid line. The cap is a
     screwed hex now rather than a smooth disc, seated on the built port top
     face at y 0.814. */
  pk.add(at(lib.cyl(0.009, 0.038, M.coolant, 10), 1.985, 0.795, -0.140));
  pk.add(at(lib.fastener(0.0120, M.plasticLt, 'hex'), 1.985, 0.8140, -0.140));
  sys.add(pk);

  /* ── occupant-local delivery: a 1.4 L loop on a 5 W duty-cycled pump, the
     35 C and 16 C pair aft over the battery lid to manifolds between
     interior-6's own seat track rails, and two footwell radiant panels clear
     of its pedal set. Geometry carried from thermal-7; what changed is the
     size of the loop and the duty of its pump. ── */
  const loc = lib.part('local-circuits', [0.05, -0.35, 0.25]);

  /* the 5 W pump: end bell, can seam, connector, and the saddle that ties it
     down to the glycol rail slab at y 0.745, which the built plate puts there
     rather than at the 0.740 in RAILY's name.

     THIS PIGTAIL IS THIS PART'S NEW HIGH POINT and it is worth a line because
     the module publishes clearances to body-9 overhead. local-circuits went
     from y 0.7980 to 0.8204, a 22.4 mm rise, all of it the r 2.6 mm wire over
     its 0.818 waypoint. Swept with a vertical ray off the built mesh, body-9's
     skin at (1.958, 0.821, -0.336) is 90.2 mm above it, against 35.6 mm at the
     purge pot, so the rise does not touch the tightest item. */
  loc.add(at(xcyl(0.018, 0.056, M.darkSteel, 16), 2.002, 0.770, -0.300));
  loc.add(at(xcyl(0.0165, 0.008, M.castAlu, 14), 1.9700, 0.770, -0.300));
  const locSeam = lib.torus(0.0185, 0.0022, M.steel, 14, 5);
  locSeam.rotation.y = Math.PI / 2;
  loc.add(at(locSeam, 1.990, 0.770, -0.300));
  loc.add(at(cb(0.020, 0.015, 0.018, M.plastic, 0.0014), 1.996, 0.7885, -0.300));
  loc.add(wire([
    [1.996, 0.796, -0.300],
    [1.982, 0.812, -0.316],
    [1.958, 0.818, -0.336],
    [1.936, 0.812, -0.348],
  ], 0.0026, M.plasticLt));
  const locSaddle = lib.torus(0.0205, 0.0024, M.darkSteel, 14, 5);
  locSaddle.rotation.y = Math.PI / 2;
  loc.add(at(locSaddle, 2.014, 0.770, -0.300));
  for (const ss of [-1, 1]) {
    loc.add(at(cb(0.006, 0.026, 0.007, M.darkSteel, 0.0009), 2.014, 0.7580, -0.300 + ss * 0.0205));
  }
  loc.add(at(xcyl(0.026, 0.020, M.plastic, 16), 2.038, 0.770, -0.300));
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    loc.add(at(aim(lib.fastener(0.0028, M.steel, 'hex'), 1, 0, 0),
      2.048, 0.770 + Math.sin(a) * 0.019, -0.300 + Math.cos(a) * 0.019));
  }
  /* the mixing valve: a casting with three machined port pads, an actuator
     can and a pigtail, where it used to be a 44 mm cube */
  /* THE CONNECTOR AND THE THIRD PORT PAD BOTH FACE AWAY FROM THE EXCHANGER.
     glycol-loop's free-cooling plate stack fills x 1.923..1.993, y 0.743..
     0.823, |z| 0.289..0.351, which is the same volume the shipped module gave
     it as a solid box, and this valve's +x face at 1.934 is 11 mm inside it.
     Anything hung on that face is invisible: the pad measured 0.07 percent
     and the actuator connector 0.37 percent on the ray test. The actuator is
     turned to put its plug on -x and the third pad moves to the -z face. */
  loc.add(at(cb(0.044, 0.044, 0.044, M.castAlu, 0.0035), 1.912, 0.766, -0.300));
  const mixAct = actuator(0.014, 0.026, M.darkSteel);
  mixAct.rotation.y = Math.PI;
  loc.add(at(mixAct, 1.912, 0.788, -0.300));
  loc.add(wire([
    [1.901, 0.801, -0.300],
    [1.886, 0.804, -0.316],
    [1.876, 0.800, -0.334],
    [1.878, 0.790, -0.346],
  ], 0.0026, M.plasticLt));
  for (const [px, pz] of [[1.912, -0.322], [1.912, -0.278], [1.890, -0.300]]) {
    loc.add(at(cb(0.010, 0.018, 0.010, M.castAlu, 0.0012), px, 0.766, pz));
  }
  /* the expansion vessel, with the pressure cap a sealed loop is filled
     through, seated on its built top face at y 0.790 */
  loc.add(at(lib.cyl(0.022, 0.048, M.steel, 16), 1.912, 0.766, -0.360));
  loc.add(at(lib.fastener(0.0155, M.plasticLt, 'hex'), 1.912, 0.7900, -0.360));
  /* NO SIGHT GLASS ON THIS VESSEL. One was drawn on its -z face at
     (1.912, 0.760, -0.382) and it is not visible from anywhere: pack-loop's
     condenser plate stack occupies x 1.8745..1.9495, y 0.7405..0.8255,
     |z| 0.352..0.422, so the boss and its lens sit inside it. The ray test
     returned 0.20 percent, blocked mostly by pack-loop's own plates. The
     vessel is filled through the pressure cap above and the charge is read on
     the receiver, which has one where it can be seen. */

  /* feed and return aft: over the casting top, down the flank forward of
     suspension-9's rack (x 1.175..1.389, y 0.291..0.430, unchanged from
     suspension-4 because it shortened at its ends), then along the battery
     lid at y 0.324 */
  const runAft = (zNose, zSeat, mat) => hose([
    [2.020, 0.792, zNose],
    [1.950, 0.784, zNose - 0.008],
    [1.880, 0.770, zNose - 0.018],
    [1.826, 0.756, zNose - 0.030],
    [1.788, 0.744, zNose - 0.040],
    [1.746, 0.692, zNose - 0.052],
    [1.500, 0.652, zSeat * 0.36],
    [1.180, 0.652, zSeat * 0.42],
    [1.044, 0.642, zSeat * 0.50],
    [0.998, 0.520, zSeat * 0.58],
    [0.962, 0.358, zSeat * 0.78],
    [0.900, 0.332, zSeat * 0.92],
    [0.700, 0.328, zSeat],
    [0.430, 0.326, zSeat],
    [0.345, 0.334, zSeat],
  ], 0.006, mat, { clips: [{ i: 9, foot: [1, 0, 0] }] });
  loc.add(runAft(-0.280, -0.400, M.coolantHot));
  loc.add(runAft(-0.340, 0.400, M.coolant));

  for (const sz of [-0.400, 0.400]) {
    /* seat manifold: a casting with a machined spigot face, a bleed screw at
       the high corner and two mounting ears down to battery-6's lid at
       y 0.320. Nothing here grows DOWNWARD: this manifold sits 7 mm over the
       top of P.battery and the envelope check counts by vertex. */
    loc.add(at(cb(0.096, 0.042, 0.066, M.castAlu, 0.0040), 0.300, 0.338, sz));
    loc.add(at(cb(0.010, 0.036, 0.058, M.alu, 0.0018), 0.353, 0.338, sz));
    for (const py of [0.330, 0.350]) {
      loc.add(at(lib.cyl(0.006, 0.020, M.coolant, 8), 0.352, py, sz));
    }
    loc.add(at(lib.fastener(0.0038, M.copper, 'hex'), 0.278, 0.359, sz));
    /* ears on the z faces, not the x faces: at x 0.244 and 0.356 they landed
       inside the rear-branch hose ferrule and inside the manifold's own
       spigot face, both at 0 percent on the ray test */
    for (const ez of [-0.043, 0.043]) {
      loc.add(at(cb(0.026, 0.014, 0.020, M.castAlu, 0.0014), 0.300, 0.329, sz + ez));
      loc.add(at(lib.fastener(0.0032, M.steel, 'hex'), 0.300, 0.336, sz + ez));
    }
    /* aft to the rear bench manifolds, outboard of suspension-9's chassis ECU
       at x -1.040..-0.847, y 0.316..0.352, z -0.340..-0.220, which is where
       suspension-4 had it and where suspension-9's built mesh still puts it */
    loc.add(hose([
      [0.250, 0.338, sz],
      [0.000, 0.326, sz * 1.08],
      [-0.400, 0.324, sz * 1.14],
      [-0.780, 0.328, sz * 1.18],
      [-0.885, 0.336, sz * 1.18],
    ], 0.005, M.coolantHot, { ends: 'start' }));
    loc.add(at(cb(0.086, 0.040, 0.056, M.castAlu, 0.0038), -0.905, 0.337, sz * 1.18));
    loc.add(at(cb(0.009, 0.034, 0.048, M.alu, 0.0016), -0.858, 0.337, sz * 1.18));
    loc.add(at(lib.fastener(0.0034, M.copper, 'hex'), -0.928, 0.357, sz * 1.18));
  }

  /* footwell radiant panels under the toe boards, clear of interior-6's pedal
     set at x 1.103..1.387, z -0.510..-0.358. A radiant panel is a pressing:
     a formed return flange around the edge and the serpentine bonded to its
     back. The whole assembly is built in the panel's own tilted frame and
     rotated once, so the flange follows the panel rather than the world. */
  for (const rz of [-0.290, 0.290]) {
    const pan2 = new THREE.Group();
    pan2.add(cb(0.115, 0.012, 0.130, M.alu, 0.0022));
    for (const fz of [-0.061, 0.061]) {
      pan2.add(at(cb(0.115, 0.014, 0.008, M.alu, 0.0012), 0, -0.010, fz));
    }
    /* the outboard edge only. The inboard edge of the passenger-side panel is
       already 12 mm inside this module's own recovery-core case, measured, so
       a flange there is invisible and the overlap is reported instead. */
    pan2.add(at(cb(0.008, 0.014, 0.130, M.alu, 0.0012), 0.0535, -0.010, 0));
    pan2.add(lib.tube([
      [-0.040, -0.014, -0.048], [0.040, -0.014, -0.048], [0.046, -0.014, -0.028],
      [-0.046, -0.014, -0.010], [-0.046, -0.014, 0.010], [0.046, -0.014, 0.028],
      [0.040, -0.014, 0.048], [-0.040, -0.014, 0.048],
    ], 0.0038, M.coolantHot, false, 20));
    pan2.rotation.z = 0.35;
    pan2.position.set(1.030, 0.494, rz);
    loc.add(pan2);
    loc.add(at(cb(0.014, 0.028, 0.014, M.steel, 0.0014), 1.030, 0.520, rz));
    loc.add(at(lib.fastener(0.0034, M.steel, 'hex'), 1.030, 0.534, rz));
    loc.add(hose([
      [0.988, 0.488, rz],
      [0.994, 0.480, rz * 0.90],
      [1.000, 0.470, rz * 0.80],
    ], 0.005, M.coolantHot, { ends: 'end' }));
  }
  sys.add(loc);

  /* ── air handler at the firewall, x 0.78..1.00, the envelope this slot has
     held since thermal.js. TWO blower scrolls now: the ventilation machine on
     the passenger side feeding the recovery core path, and the transient
     machine on the driver side with a recirculation damper, feeding the
     screen-base slot nozzle at cruise and the whole cabin on pulldown. ── */
  const ah = lib.part('air-handler', [-0.32, 0.45, 0]);

  /* THE CASE IS NOT A BRICK ANY MORE, and this is the one modeling decision
     in this pass that needs stating rather than just doing. A 220 by 240 by
     560 solid box is the whole air handler as far as a viewer is concerned:
     the ray test returns 0 percent for everything inside it, which is both
     blowers, both coils, the blend flap and the drain, twenty meshes and two
     thirds of this part's triangles. A real HVAC case is a clamshell anyway,
     so what is drawn is the rear half of the molding: five panels, the joint
     flange the two halves meet on with its six clip lugs, and the external
     stiffening ribs. The front half is not drawn. That is the convention any
     service manual uses and it is the only way this part shows its work.
     The flange stands at x 0.9860, not flush at the case face, and the reason
     is a CARRIED FINDING this pass turned up rather than caused. Sampled
     densely rather than at its eight corners, the shipped solid case's own
     +x face at x 1.000 already touches interior-6's dash molding at 0.0 mm,
     at (1.000, 0.794, 0.272): the vertex sweeps that passed it only ever had
     corner vertices on a 220 by 560 flat face. interior-6 clears x 0.990 by
     5.5 mm and x 0.985 by 10.5. The case envelope is left exactly where the
     module shipped it, because shrinking a published zone is not a detail
     pass's call, but the flange is held clear so it is not the new offender
     and the contact is reported. */
  ah.add(at(cb(0.220, 0.012, 0.560, M.plastic, 0.0022), 0.890, 0.814, 0.030));
  ah.add(at(cb(0.220, 0.012, 0.560, M.plastic, 0.0022), 0.890, 0.586, 0.030));
  /* both end panels carry the molded blower aperture the scroll passes
     through, drawn as the four bars that surround it. Solid end panels sealed
     both wheels in: 0 percent on the ray test, 336 triangles of squirrel cage
     that nobody could ever see down the inlet eye. */
  for (const [pz, ap] of [[-0.244, 0.132], [0.304, 0.140]]) {
    const bar = (0.216 - ap) / 2, side = (0.220 - ap) / 2;
    ah.add(at(cb(0.220, bar, 0.012, M.plastic, 0.0022), 0.890, 0.700 + (ap + bar) / 2, pz));
    ah.add(at(cb(0.220, bar, 0.012, M.plastic, 0.0022), 0.890, 0.700 - (ap + bar) / 2, pz));
    ah.add(at(cb(side, ap, 0.012, M.plastic, 0.0022), 0.890 - (ap + side) / 2, 0.700, pz));
    ah.add(at(cb(side, ap, 0.012, M.plastic, 0.0022), 0.890 + (ap + side) / 2, 0.700, pz));
  }
  ah.add(at(cb(0.012, 0.216, 0.536, M.plastic, 0.0022), 0.786, 0.700, 0.030));
  for (const [fy, fz, fh, fd] of [[0.813, 0.030, 0.014, 0.560], [0.587, 0.030, 0.014, 0.560],
                                  [0.700, -0.243, 0.226, 0.014], [0.700, 0.303, 0.226, 0.014]]) {
    ah.add(at(cb(0.012, fh, fd, M.plastic, 0.0020), 0.9860, fy, fz));
  }
  /* the six clip lugs sit ON the flange faces, centered on the flange's own
     y 0.806..0.820 and 0.580..0.594 rather than straddling them. Standing
     3.5 mm proud of the top flange they were 19.25 mm under body-9's cowl
     cross tube, which is the module's tightest item against body structure
     and under the 20.4 mm this module already refused once. Proud in x, which
     is the direction a clip lug is seen from anyway. */
  for (const [ly, lz] of [[0.8130, -0.180], [0.8130, 0.030], [0.8130, 0.240],
                          [0.5870, -0.180], [0.5870, 0.030], [0.5870, 0.240]]) {
    ah.add(at(cb(0.014, 0.011, 0.013, M.darkSteel, 0.0012), 0.9860, ly, lz));
  }
  /* The external stiffening ribs stop at x 0.958, not 0.978. body-9's cowl
     cross tube runs the width of the car at x 0.962..1.018, y 0.842..0.898,
     and it, not the hood, is the lowest body structure over this case.
     Measured by vertical rays off DENSELY SAMPLED faces rather than off
     vertices, because a 220 by 560 flat face has vertices only at its
     corners: the shipped case cleared that tube by 23.10 mm at
     (0.993, 0.820, 0.291). A 9 mm rib running to x 0.978 took it to
     18.55 mm, which would have made a stiffening rib the tightest thing in
     the module under body structure, tighter than the purge pot at 35.61 and
     tighter than the 20.4 mm pigtail this module already refused. Stopped
     short of the tube in x it costs 1.1 mm of a number nobody publishes:
     23.10 shipped, 22.00 as built, same method over both. */
  for (const rz of [-0.220, 0.130, 0.200, 0.270]) {
    ah.add(at(cb(0.160, 0.006, 0.010, M.plastic, 0.0012), 0.878, 0.8230, rz));
  }

  /* ventilation blower: 80 m3/h at 6 W. The wheel grows in WIDTH, 78 to
     90 mm, and not in diameter, because the firewall zone is 220 mm of x and
     thermal-7's wheel was already at that limit. Drawn as a volute rather
     than as a drum: throat radius 0.088 against the drum's 0.108, so the
     assembly reaches 0.1065 and the firewall x envelope shrinks. */
  const scrollV = blower(0.066, 0.088, 0.090, 26, M.plasticLt);
  scrollV.position.set(0.890, 0.700, 0.268);
  ah.add(scrollV);
  const inletV = lib.crease(lib.lathe([
    [0.0480, 0.000], [0.0490, 0.008], [0.0530, 0.017], [0.0580, 0.024],
    [0.0625, 0.028], [0.0600, 0.028], [0.0560, 0.021], [0.0520, 0.011],
    [0.0510, 0.000],
  ], M.plasticLt, 16), 34);
  inletV.rotation.x = Math.PI / 2;
  inletV.position.set(0.890, 0.700, 0.313);
  ah.add(inletV);
  /* motor boss and its three ribs, on the back face away from the inlet */
  const motV = lib.cyl(0.030, 0.022, M.darkSteel, 14);
  motV.rotation.x = Math.PI / 2;
  ah.add(at(motV, 0.890, 0.700, 0.212));
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.5;
    const rib = cb(0.008, 0.052, 0.010, M.plasticLt, 0.0012);
    rib.position.set(0.890 + Math.cos(a) * 0.048, 0.700 + Math.sin(a) * 0.048, 0.219);
    rib.rotation.z = a - Math.PI / 2;
    ah.add(rib);
  }
  ah.add(at(cb(0.020, 0.016, 0.014, M.plastic, 0.0014), 0.912, 0.678, 0.206));
  ah.add(wire([
    [0.912, 0.678, 0.199],
    [0.926, 0.664, 0.184],
    [0.938, 0.638, 0.160],
    [0.938, 0.608, 0.130],
  ], 0.0028, M.plasticLt));

  /* transient blower: defog at cruise, recirculated pulldown on demand */
  const scrollT = blower(0.062, 0.084, 0.062, 24, M.plasticLt);
  scrollT.position.set(0.888, 0.700, -0.238);
  ah.add(scrollT);
  const inletT = lib.crease(lib.lathe([
    [0.0460, 0.000], [0.0470, 0.007], [0.0505, 0.015], [0.0550, 0.021],
    [0.0592, 0.025], [0.0570, 0.025], [0.0535, 0.019], [0.0498, 0.010],
    [0.0490, 0.000],
  ], M.plasticLt, 16), 34);
  /* nested into the wheel eye so its outer lip stops at z -0.277, which is
     exactly where thermal-7's inlet stub stopped. Hung off the volute face at
     -0.269 it reached -0.294 and touched wheels-9's brake master unit, which
     occupies |z| 0.282..0.294 at y 0.580..0.660, at 0.0 mm. */
  inletT.rotation.x = -Math.PI / 2;
  inletT.position.set(0.888, 0.700, -0.252);
  ah.add(inletT);
  const motT = lib.cyl(0.028, 0.020, M.darkSteel, 14);
  motT.rotation.x = Math.PI / 2;
  ah.add(at(motT, 0.888, 0.700, -0.197));
  /* its recirculation damper and the sensed position the fails ask for. Both
     ride 12 mm higher than thermal-7's blend hardware because wheels-9's brake
     master unit reservoir occupies y 0.570..0.670 at |z| 0.295..0.405 on this
     side, which is the space a second blower wanted. The actuator is a can
     with a connector now: the fails argue this damper is a single point of
     failure that has to be SENSED, and a sensed damper needs a plug. */
  ah.add(at(cb(0.056, 0.070, 0.014, M.plasticLt, 0.0022), 0.930, 0.712, -0.280));
  ah.add(at(actuator(0.011, 0.022, M.darkSteel), 0.958, 0.747, -0.280));
  ah.add(wire([
    [0.971, 0.758, -0.280],
    [0.978, 0.768, -0.266],
    [0.974, 0.780, -0.242],
    [0.960, 0.788, -0.226],
  ], 0.0026, M.plasticLt));

  /* the two coils. lib.fins gave them ten plates over 300 mm, a 33 mm pitch
     that reads as a louver bank; instanced they carry 26 for the same spend.
     Both get the top header tank and the tube plate a coil has, and the pair
     share the condensate tray that feeds the drain already drawn below. */
  const dehum = finPack(0.030, 0.160, 0.300, 26, 0.0022, M.alu);
  dehum.position.set(0.845, 0.700, -0.060);
  ah.add(dehum);
  const htr = finPack(0.030, 0.160, 0.300, 26, 0.0022, M.copper);
  htr.position.set(0.930, 0.700, -0.060);
  ah.add(htr);
  for (const [hx, hm] of [[0.845, M.alu], [0.930, M.copper]]) {
    ah.add(at(cb(0.034, 0.016, 0.300, hm, 0.0045), hx, 0.788, -0.060));
    ah.add(endCaps(0.034, 0.016, 0.300, hx, 0.788, M.alu, -0.060));
    ah.add(at(cb(0.034, 0.012, 0.300, hm, 0.0034), hx, 0.614, -0.060));
  }
  ah.add(at(cb(0.126, 0.012, 0.312, M.plasticLt, 0.0018), 0.888, 0.600, -0.060));
  ah.add(at(cb(0.006, 0.150, 0.290, M.plasticLt, 0.0014), 0.888, 0.700, -0.060));

  ah.add(at(cb(0.140, 0.030, 0.220, M.plasticLt, 0.0035), 0.860, 0.832, -0.050));
  for (const dz of [-0.100, 0.120]) {
    ah.add(at(cb(0.070, 0.040, 0.120, M.plasticLt, 0.0035), 0.890, 0.840, dz));
  }
  /* the screen-base slot nozzle the defog argument rests on: a wide thin
     plenum across the cowl top rather than a cabin air-change scheme. The
     slot now has the end closures and the flow-straightening vanes a slot
     jet needs; nothing here grew, because this nozzle is a DECLARED
     penetration of interior-6's dash molding and growing it enlarges the
     aperture a partner has to cut. */
  ah.add(at(cb(0.046, 0.020, 0.520, M.plasticLt, 0.0035), 0.928, 0.866, 0.010));
  ah.add(at(cb(0.014, 0.008, 0.500, M.plastic, 0.0016), 0.946, 0.878, 0.010));
  for (const es of [-1, 1]) {
    ah.add(at(cb(0.044, 0.019, 0.006, M.plastic, 0.0014), 0.928, 0.866, 0.010 + es * 0.257));
  }
  const vanes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.012, 0.006, 0.0022), M.plastic, 11);
  const vm = new THREE.Matrix4();
  for (let i = 0; i < 11; i++) {
    vm.makeTranslation(0.945, 0.877, 0.010 + (i / 10 - 0.5) * 0.470);
    vanes.setMatrixAt(i, vm);
  }
  vanes.instanceMatrix.needsUpdate = true;
  vanes.castShadow = true; vanes.receiveShadow = true;
  ah.add(vanes);
  /* rail-duct takeoffs to interior-6's A-pillar ducts, each with its damper */
  for (const tz of [-0.245, 0.245]) {
    ah.add(at(cb(0.050, 0.045, 0.050, M.plasticLt, 0.0040), 0.930, 0.815, tz));
    ah.add(at(actuator(0.012, 0.024, M.darkSteel), 0.930, 0.838, tz));
    /* the pigtail drops before it turns inboard. interior-6's A-pillar duct
       tubes occupy y 0.827 to 0.888 over |z| 0.086 to 0.219, and the first
       route ran at y 0.826 to 0.850 all the way to |z| 0.196: 48 to 54 mm of
       a 2.6 mm wire inside a partner's duct, measured as samples inside its
       built mesh. Under y 0.827 by the time it reaches |z| 0.219 it is out. */
    ah.add(wire([
      [0.944, 0.850, tz],
      [0.952, 0.840, tz * 0.96],
      [0.950, 0.824, tz * 0.90],
      [0.940, 0.814, tz * 0.86],
    ], 0.0026, M.plasticLt));
    ah.add(lib.tube([
      [0.930, 0.838, tz],
      [0.934, 0.868, tz * 1.05],
      [0.938, 0.898, tz * 1.10],
    ], 0.014, M.plasticLt));
  }
  /* the two water stubs the local loop feeds, and the condensate drain. The
     stubs keep thermal-7's x 1.012, which is the module's only firewall-zone
     excursion, so the new machined pad is drawn INBOARD of them at 1.004. */
  for (const hz of [-0.080, -0.150]) {
    ah.add(at(cb(0.008, 0.028, 0.028, M.castAlu, 0.0018), 1.000, 0.640, hz));
    ah.add(at(xcyl(0.011, 0.028, M.coolantHot, 10), 0.998, 0.640, hz));
  }
  ah.add(at(lib.cyl(0.008, 0.040, M.rubber, 8), 0.890, 0.572, -0.100));
  sys.add(ah);

  /* ── ventilation recovery core: 1.86 m2 of counterflow membrane in a
     190 x 200 x 270 mm block, in the last space the firewall has. Bottom face
     y 0.378, 15 mm over hv-4's front HV run at 0.363; top face 0.578, 2 mm
     under the air handler case. The cowl riser, the motorized bypass and the
     fairing-wall exhaust are thermal-7's. NEW: the B-pillar extract pair that
     takes ventilation effectiveness from 0.8 to 0.9. ── */
  const rec = lib.part('recovery-core', [-0.15, 0.10, 0.45]);

  /* the core was a sealed 190 by 200 by 270 box with seven membrane sheets
     hidden inside it, which is 1.86 m2 of the module's central argument that
     nobody can see. It is now the molded frame a core actually ships in,
     four corner posts and two end plates, with the pack exposed on all four
     faces. The block's own y 0.378..0.578 is held to the millimeter: 15 mm
     over hv-4's front HV run at 0.363 and 2 mm under the air-handler case
     floor at 0.580, both of which this panel publishes. */
  for (const [px, pz] of [[0.808, 0.178], [0.982, 0.178], [0.808, 0.422], [0.982, 0.422]]) {
    rec.add(at(cb(0.016, 0.200, 0.016, M.plasticLt, 0.0022), px, 0.478, pz));
  }
  for (const py of [0.384, 0.572]) {
    rec.add(at(cb(0.190, 0.012, 0.270, M.plasticLt, 0.0022), 0.895, py, 0.300));
  }
  const media = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.170, 0.0018, 0.250), M.white, 22);
  const mm2 = new THREE.Matrix4();
  for (let i = 0; i < 22; i++) {
    mm2.makeTranslation(0.895 + (i % 2 ? 0.0007 : -0.0007), 0.394 + i * 0.008, 0.300);
    media.setMatrixAt(i, mm2);
  }
  media.instanceMatrix.needsUpdate = true;
  media.castShadow = true; media.receiveShadow = true;
  rec.add(media);
  /* the differential-pressure tapping pair. The fails on this panel say a dP
     trend is the only instrument that can call the service before
     effectiveness has quietly halved, and until now there was nothing on the
     core to trend it with. It hangs on the +x posts, in the aperture the
     air-handler clamshell leaves open: on the core's top plate at y 0.5785 it
     was inside the air-handler floor panel at 0.580, which the ray test
     returned as 0 percent. Two millimeters is not a mounting face. */
  for (const tz of [0.178, 0.422]) {
    rec.add(at(cb(0.014, 0.014, 0.012, M.castAlu, 0.0012), 0.992, 0.430, tz));
  }
  rec.add(at(cb(0.016, 0.022, 0.028, M.sensor, 0.0022), 0.990, 0.480, 0.300));
  for (const tz of [0.178, 0.422]) {
    rec.add(wire([
      [0.994, 0.437, tz], [0.996, 0.456, tz], [0.994, 0.472, 0.300 + (tz - 0.300) * 0.35],
    ], 0.0022, M.plasticLt));
  }
  for (const bz of [0.216, 0.384]) {
    rec.add(at(cb(0.022, 0.026, 0.022, M.steel, 0.0022), 0.895, 0.591, bz));
    rec.add(at(lib.fastener(0.0036, M.steel, 'hex'), 0.895, 0.604, bz));
  }
  /* cabin return into the core. The collector spans the tunnel so BOTH extract
     ducts land on hardware: thermal-7 drew a passenger-side plenum only, and
     with a mirrored pair of ducts the driver-side one started in mid air. */
  rec.add(at(cb(0.018, 0.090, 0.700, M.plasticLt, 0.0028), 0.798, 0.420, 0));
  rec.add(endCaps(0.018, 0.090, 0.700, 0.798, 0.420, M.plasticLt));
  for (const es of [-0.240, 0.240]) {
    rec.add(at(cb(0.030, 0.010, 0.026, M.plasticLt, 0.0014), 0.798, 0.470, es));
    rec.add(at(lib.fastener(0.0032, M.steel, 'hex'), 0.806, 0.475, es));
  }
  rec.add(lib.tube([
    [0.810, 0.432, 0.300],
    [0.832, 0.446, 0.302],
    [0.852, 0.458, 0.304],
  ], 0.020, M.plasticLt));
  /* B-pillar extract: aft along the SILL SHOULDER at y 0.478 and |z| 0.672,
     which is the only free band along the rocker. autonomy-4's sensor ring
     runs the whole length of the car at y 0.394..0.434 over |z| 0.639..0.669
     and interior-6's front seat frame reaches y 0.460 out to |z| 0.615, so the
     duct sits above the first and outboard of the second. Clear of battery-7's
     rocker bond rails at |z| 0.78 and of hv-4's 48 V ring at y 0.359. */
  for (const sd of [-1, 1]) {
    rec.add(lib.tube([
      [0.804, 0.440, sd * 0.330],
      [0.782, 0.520, sd * 0.435],
      [0.744, 0.524, sd * 0.560],
      [0.664, 0.500, sd * 0.654],
      [0.360, 0.478, sd * 0.672],
      [0.020, 0.478, sd * 0.672],
    ], 0.030, M.plasticLt));
    /* the rolled bead at the collector joint and the clip that holds the duct
       where it climbs over wheels-9's front brake line */
    const bead = lib.torus(0.0325, 0.0028, M.plastic, 12, 4);
    bead.rotation.x = Math.PI / 2;
    bead.rotation.z = -1.30 * sd;
    rec.add(at(bead, 0.798, 0.451, sd * 0.343));
    rec.add(at(pclip(0.030, [-0.118, 0.004, sd * 0.125], [0, 1, 0], M.plastic),
      0.744, 0.524, sd * 0.560));
    /* the extract grille was a 70 by 90 slab. It is now a real lattice with
       depth, and it is sized so its 70 by 90 aperture does not move: this is
       a declared penetration of interior-6's sill trim and growing a grille
       grows an aperture a partner has to cut. Its cross family sits 2 mm
       behind the bars rather than at lib.grille's default 0.75 barD, because
       at the default the cross bank reached |z| 0.6555, inside autonomy-4's
       sensor ring band of 0.639..0.669, and took the measured clearance from
       27.7 mm to 19.5.

       WHAT MOVED, swept off both builds rather than asserted: x and y are the
       slab's to the micron, -0.0250..0.0450 and 0.4330..0.5230. The DEPTH is
       not 14 mm and the outer face is not the slab's. lib.grille's frame is
       1.25 barD deep and stands 0.75 barD behind the bar plane, so the built
       assembly spans |z| 0.6675..0.6850, 17.5 mm rather than 18, sitting
       2.0 mm inboard of the slab's outer face at 0.6870. Both directions
       relieve rather than tighten: 2.0 mm further from interior-6's sill trim
       and 1.5 mm further from autonomy-4's ring, and the ring clearance
       measures 27.74 mm shipped against 27.68 detailed on one sweep over
       both. Left where it is, and stated, rather than nudged outboard into a
       partner's trim to make a sentence true. */
    const gr = lib.grille(0.060, 0.080, 0.014, M.plastic,
      { bars: 9, cross: 2, barW: 0.0035, crossZ: -0.002, frame: 0.005 });
    if (sd < 0) gr.rotation.y = Math.PI;
    rec.add(at(gr, 0.010, 0.478, sd * 0.678));
  }
  /* fresh air down from the cowl into the core */
  rec.add(lib.tube([
    [0.928, 0.892, 0.356],
    [0.946, 0.782, 0.348],
    [0.936, 0.680, 0.330],
    [0.922, 0.592, 0.312],
  ], 0.022, M.plasticLt));
  /* tempered supply across to the ventilation blower inlet */
  rec.add(lib.tube([
    [0.906, 0.582, 0.336],
    [0.898, 0.618, 0.334],
    [0.890, 0.656, 0.330],
  ], 0.020, M.plasticLt));
  /* the motorized bypass, promoted from fault position to control device. It
     is the device the mild and hot legs of the reference sweep depend on, so
     it gets the actuator can and the plug a control device has. The can faces
     -z rather than up, because up from y 0.580 is the air-handler case floor
     and the first draft of it was inside that panel. */
  rec.add(at(cb(0.040, 0.048, 0.040, M.darkSteel, 0.0035), 0.956, 0.556, 0.196));
  rec.add(at(aim(actuator(0.014, 0.028, M.darkSteel), 0, 0, -1), 0.956, 0.556, 0.176));
  rec.add(wire([
    [0.972, 0.556, 0.161],
    [0.984, 0.548, 0.170],
    [0.988, 0.536, 0.190],
    [0.982, 0.528, 0.208],
  ], 0.0026, M.plasticLt));
  /* exhaust into the sealed arch cavity. body-9 moved the fairing inboard wall
     to |z| 0.630, so this duct passes behind it and pierces the AFT CLOSEOUT
     at x 1.045, |z| 0.641..0.786, y 0.460..0.507. Declared penetration. The
     grille clears wheels-9's steered front corner by 23.6 mm at 2 degrees. */
  rec.add(lib.tube([
    [0.958, 0.452, 0.375],
    [0.992, 0.462, 0.470],
    [1.018, 0.472, 0.590],
    [1.042, 0.482, 0.700],
    [1.058, 0.490, 0.782],
  ], 0.020, M.plasticLt));
  /* the exhaust grille. Its outer dimensions are held EXACTLY at the slab's
     0.050 by 0.070 by 0.026 because this is the tightest item in the module,
     23.7 mm from wheels-9's swept front corner at 2 degrees of lock: the
     lattice is 0.040 by 0.060 inside a 5 mm frame.

     THE DEPTH HAS TO BE DECLARED, NOT LEFT TO THE DEFAULT. lib.grille builds
     its frame 1.25 barD deep and drops the cross bank 0.75 barD behind the
     bars, so a call that passes d 0.026 and nothing else builds a 45.5 mm
     assembly, not a 26 mm one. Left at the default this grille measured
     |z| 0.7675..0.8130 against the slab's 0.7870..0.8130: the tire-side face
     was held, but 19.5 mm of cross bank and frame stood inboard of the
     envelope the 23.7 mm was measured against, inside body-9's aft closeout.
     barD 0.0208 makes the frame exactly 26 mm, crossZ -0.0052 puts the cross
     bank's back face on the frame's, and the group sits at 0.8026 so the
     outer face lands on 0.8130. Built span 0.7870..0.8130, the slab to the
     micron. */
  const exGr = lib.grille(0.040, 0.060, 0.0208, M.plastic,
    { bars: 7, cross: 2, barW: 0.0035, barD: 0.0208, crossZ: -0.0052, frame: 0.005 });
  rec.add(at(exGr, 1.058, 0.490, 0.8026));
  sys.add(rec);

  return sys;
}
