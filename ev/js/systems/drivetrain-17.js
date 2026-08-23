/* drivetrain-17: THE TRACK. drivetrain-9 with the rear in-wheel rings 20 mm
   inboard (REAR_Z 0.74 to 0.72, RING_Z 0.69 to 0.67, FLANGE_Z 0.65 to 0.63),
   everything at the rear corner that stands outboard of |z| 0.625 riding
   with them (the hub bearings, the corner inverters, the coolant stubs, the
   loop connectors), the loop bracket on hv-15's run end holding, and the
   three service tubes between them laid flat at |z| 0.6120, in the 22 mm
   between hv-15's run end (0.6035) and the wheel's web, which came to 0.626, and the front
   halfshafts 20 mm shorter (outboard joint face 0.6925 to 0.6725, half-span
   0.1975, pair center 0.475, bar 0.290 m against 0.330), because wheels-17
   brings both wheel centers to |z| 0.72. design/gen17.md is the brief. The
   machines, the ratios, the inverters and every other coordinate are
   drivetrain-9's; the annulus the rings occupy is declared (SYSTEM.annulus)
   so the checker asserts the band the rings are actually in. The shaft
   articulation at the same travel: about 21 percent more angle than Gen 9
   for 20 mm less bar, by the same four-bar drivetrain-9's panel used. Mass:
   0.3 kg less bar, derived. Every absolute rear |z| in the carried text
   below reads 20 mm inboard here where it is outboard of 0.625.

   ── drivetrain-9's own header follows, unchanged ─────────────────────

/* Drive units, Gen 9: the front. This module is drivetrain-7 with ONE
   dimension changed, and the dimension is the front halfshaft length.
   Everything else, both rear corners, the coordinator, the front machine,
   the gear cases, the disconnect and both inverters, is drivetrain-7 to
   the vertex, because Gen 9 does not ask the drivetrain for anything new.
   It asks it to fit a car whose front track moved.

   WHY IT EXISTS. wheels-9 brings the front wheel centers in from |z| 0.81
   to 0.74 and puts the front hub face inboard plane on |z| 0.6925. Swept
   off its BUILT mesh rather than read out of its comments, that plane is
   the inboard face of a hub face disc of radius 0.074 about the front
   axle line, and the disc surface sits on 0.6925 at every radius inside
   0.074, which is the whole of what a 55 mm joint at r 0.036 lands on.
   Outboard of r 0.074 the corner runs INBOARD of the plane rather than
   up to it: 0.6903 at r 0.075..0.080, 0.6850 at 0.080..0.085 and 0.6040
   from r 0.085 out, where the disc bell and the caliper live. So 0.6925
   is a hub face, not a wall across the corner, and the sweep is quoted
   band by band rather than as one number for the whole radius range.

   drivetrain-7 lands its outboard CV joint face on |z| 0.7625, which is
   where wheels-7 puts the same plane and is correct on that car. Against
   wheels-9 it overruns by 70.0 mm, and the sweep says what that means
   rather than implying it: 192 wheels-9 vertices fall inside drivetrain-7
   solids across 6 mesh pairs, 21.6 mm past the nearest surface at the
   deepest, and 154 drivetrain-7 vertices fall inside wheels-9 solids
   across 4 more, 5.0 mm at the deepest. Every depth in this file is a
   distance to the nearest SURFACE of the solid the vertex is inside, not
   to a bounding wall, and it is stated once here so no two of these
   numbers are read on different measures. The joint, the boot and the
   last 70 mm of bar
   stand inside the hub insert, the disc bell and the spoke web behind it.
   In the 3D view the shafts spear the front wheels.

   drivetrain-7 is carried in the Gen 7 and Gen 8 presets, where the same
   sweep returns ZERO penetration in both directions against wheels-7. It
   is not wrong; it is right about a different car. So it is untouched and
   this file exists instead.

   THE ONE CHANGE, solved from two fixed faces rather than chosen:
     outboard  |z| 0.6925, wheels-9's hub face, measured above.
     inboard   |z| 0.2775, unchanged, because the front disconnect's dog
               collar spans |z| 0.2100 to 0.2800 on the built mesh and the
               inboard joint face seats 2.50 mm inside its outboard end.
               Nothing else in this module may move: the differential, the
               dog collars, both gear cases and every housing are fixed.
   Half-span (0.6925 - 0.2775) / 2 = 0.2075. Pair center (0.6925 + 0.2775)
   / 2 = 0.4850, against drivetrain-7's 0.5200. With a 55 mm joint the
   joint center offset is 0.2075 - 0.0275 = 0.1800, against 0.2150, so each
   joint center comes in 35.0 mm and the bar goes from 0.400 m to 0.330.
   Boot centers follow their joints, 0.155 to 0.120. Every overlap in the
   drawing is preserved: the bar still runs 12.5 mm into each joint bore,
   each boot still laps its joint by 2.5 mm, and the bar's inboard end
   stays at |z| 0.3200 exactly where drivetrain-7 left it.

   Verified on the built mesh: outboard joint face |z| 0.69250 against a
   hub face of 0.69250, a gap of 0.000 mm. Against wheels-7 the same shaft
   now falls 70.000 mm short, which is why drivetrain-7 survives and is
   recorded here so nobody re-derives that the hard way.

   THE PROCESS FINDING, which is the reason this file is worth reading.
   design/retro-gen8.md records that clearing drivetrain-7's review debt
   found these same front halfshafts ending 10 mm SHORT of the wheel they
   drive. One rung later the same interface is 70 mm LONG. It has now been
   wrong at two consecutive rungs in opposite directions, and both times
   for the same reason: the length was CARRIED and then patched, never
   derived from the wheel. The 10 mm miss was created by pulling the pair
   inboard to reach new dog collars; the collars moved instead and the
   number went back to a value that was only ever correct for a 0.81 track.
   Two manual fixes in two generations is a process defect, not a geometry
   one. What this interface needs is an assertion that fails the check when
   the outboard joint face and the partner wheel hub face disagree, so the
   third occurrence is a red run rather than a third review. That assertion
   now exists and this module carries its half. SYSTEM.interfaces below
   declares the key 'front-halfshaft-outboard' on |z| 0.6925 with
   extent 'max', wheels-9 declares the same key on the same plane, and
   tools/check-interfaces.sh proves both halves off the built mesh and
   fails the preset when they disagree or when either half fails to reach
   the plane it named. The predicate it enforces is the exact one this
   interface has now broken twice: outboard CV joint face |z| MUST equal
   the active wheels module's front hub face inboard plane.

   WHAT THE SHORTER SHAFT COSTS, computed rather than asserted. One
   four-bar solver was run over BOTH rungs, per the standing rule in
   design/retro-gen8.md that a figure comparing two rungs comes from one
   method run over both. Pivot and joint coordinates were read off the
   built meshes of suspension-4 and suspension-9, not their prose:
     suspension-4  lower pivot (z 0.450, y 0.250), lower ball joint
                   (0.710, 0.235); upper pivot (0.380, 0.550), upper ball
                   joint (0.700, 0.565); wheel center |z| 0.810
     suspension-9  lower pivot (0.380, 0.250), lower ball joint (0.640,
                   0.235); upper pivot (0.340, 0.550), upper ball joint
                   (0.630, 0.565); wheel center |z| 0.740
   Arm lengths measure 0.2604 m lower on both, 0.3204 upper on
   suspension-4 and 0.2904 on suspension-9, and the knuckle is 0.3302 on
   both, which is suspension-9's congruence claim confirmed from geometry
   with the one exception it declares. Travel is the Gen 1 figure both
   carry, 95 mm bump and 85 mm droop at the wheel, from the coilover row
   in suspension.js. Joint center to joint center the shaft goes 0.4300 m
   to 0.3600, down 16.28 percent, and the inboard joint center does not
   move at all: |z| 0.3050 on both.

   Result, same solver, both rungs:
     full bump   inboard joint angle 12.661 deg -> 15.069, outboard
                 11.484 -> 13.555
     full droop  inboard 11.200 -> 13.426, outboard 9.204 -> 11.545
     at static   0.1302 deg per mm of wheel travel -> 0.1553, up 19.3%
     plunge      the inner joint's required stroke over full travel falls
                 from 6.00 mm to 4.71, down 1.29 mm
   So the shaft articulates about a fifth harder for the same road, and
   the one thing that gets easier is the plunge, because a shorter shaft
   recovers more length from the vertical component than it loses to the
   wheel center's inboard arc. Both are stated on the front-unit panel.

   MASS, and it is small. The only steel deleted is 70.0 mm off each of
   two bars. The DRAWN bar is a 44 mm solid section and deleting it at
   that diameter would book 1.671 kg, which would be an overclaim: the
   full drawn steel volume of the pair, bars plus joints, is 16.58 kg
   against the 8 kg this ledger has carried for the pair since Gen 1, so
   the drawn section is 2.073 times the massed part. The massed bar is the
   structural one. At 240 Nm through a 5.95:1 reduction into an open
   differential each shaft carries 714 Nm, and a 22 mm solid bar holds
   that at 342 MPa of torsional shear, which is 1.194 kg over 400 mm and
   leaves 1.40 kg for each of the four joints with its boot and grease.
   Seventy millimeters off two 22 mm bars is 0.418 kg. Booked at 0.42 kg:
   halfshafts 8 to 7.58, front unit 38 to 37.58, module 118 to 117.58.
   The system chip still reads 118 kg because it rounds, and that is the
   honest summary of the mass case for this generation.

   GEN 9 PRESET PARTNERS, every one re-swept against its BUILT mesh rather
   than repointed by name. The preset is body-9, battery-7, drivetrain-9,
   wheels-9, thermal-9, hv-4, suspension-9, autonomy-4, interior-6.

   wheels-9, rear corner. Its rear wheel is wheels-7's rear wheel at
   wheels-7's coordinates and the sweep confirms it station by station, so
   every rear number drivetrain-7 verified holds unchanged: rim flange
   plate r 0.1500..0.2440 over |z| 0.6460..0.6500, twelve flange bolt
   heads r 0.2185..0.2315 over 0.6401..0.6479, park brake backplate
   r <= 0.1000 over 0.6280..0.6350, shoe carrier r <= 0.0660 over
   0.6315..0.6475 with its outboard face on 0.6475, drum shell
   r 0.0720..0.0900 over 0.6580..0.7320, drum torus r 0.0860..0.0940 over
   0.6540..0.6620, hub pilot r 0.0605..0.0720 over 0.7300..0.7560. The
   annulus is still void on its side: ZERO wheels-9 vertices fall inside
   r 0.1555..0.2345 over |z| 0.6505..0.7295, and this module fills it with
   10,372 distinct positions spanning r 0.15511..0.23300 over
   |z| 0.6504..0.7290. The convention matters and it is stated once: those
   are unique vertex POSITIONS inside the band, not triangle corners, which
   are 58,452. The inboard radius is the number to watch and it has NOT
   moved: drivetrain-7 published 0.1551 and the same sweep over this file
   returns 0.15511, from a stator slot wedge, 0.11 mm inside the r 0.155
   contract floor. Only the inboard |z| moved, 0.6503 to 0.6504, and that
   is the crispness pass talking rather than a car changing: see THE
   CRISPNESS PASS below.

   wheels-9, front corner. Zero penetration in either direction. This is
   the interface the module exists for and it is the one number that has
   to be zero.

   suspension-9 replaces suspension-4 and the rear corner it redrew is the
   largest partner improvement on this panel. ONE test run over both
   pairings, exact point-in-solid rather than bounding boxes, both
   directions, rear corner only:
     suspension-4 with drivetrain-7   171 interfering mesh pairs, deepest
                                      25.5 mm (a 48 V lead through the hub
                                      bearing housing)
     suspension-9 with drivetrain-9    19 mesh pairs, deepest 10.5 mm and
                                      that one is deliberate; the deepest
                                      UNINTENDED overlap is 3.5 mm
   Of those 19, ten are the intended face-to-face contacts at 0.0 mm, one
   is this module's yaw-demand link landing 10.5 mm inside the chassis ECU
   on purpose, four are a 48 V damper lead crossing a hub carrier spoke by
   3.5 mm, and four are this module's corner inverter pack taking 0.5 mm
   of a rear upper-link plate. The two deepest figures above are not the
   same kind of number and the line says so: 25.5 mm is a lead buried in a
   housing and 10.5 mm is a link put where it belongs, which is why the
   unintended depth is quoted beside it. Running suspension-9 against
   drivetrain-7 returns the same pairs and the same depths, which is the
   proof that this file changed nothing at the rear. Two specific
   drivetrain-7 findings CLOSE against suspension-9: its rear-steer
   outboard ball joint no longer sits 23 mm inside the hub bearing
   housing, and the rear air spring is no longer under the corner inverter
   pack. Straight down from every point on that pack the nearest
   suspension-9 surface is now 43.3 mm away, and the nearest suspension-9
   surface anywhere below its floor plane is the relocated spring seat at
   27.6 mm, where drivetrain-7 measured 5 mm to a top plate and 1 mm from
   its busbars. What remains is the 0.5 mm the pack takes out of a rear
   upper-link plate; the ball joint on that link, y 0.5280..0.5620 over
   |z| 0.5834..0.6166, overhangs the pack's inboard flank with 26.5 mm of
   vertical gap, 11.5 mm surface to surface, and does not stand over the
   lid, which runs |z| 0.6215..0.6345. On the corner-inverter panel.

   suspension-9, front corner. THIS ENTRY REPORTED TWO THINGS AND BOTH ARE
   NOW CLOSED, from the suspension side, and what closed them is the thing
   the second one named. It used to read that the front knuckle puts an
   upright BODY 85 mm wide in x spanning |z| 0.5510..0.5830, that the
   shortened shaft pulls the outboard boot in to 0.5700..0.6400 so 13.0 mm
   of it stands inside that body at its full r 0.042, and that an 84 mm
   bore does not go through an 85 mm wide upright. Then, separately and
   filed as NOT a finding, that the bar, the joint and the boot all run
   through the hub carrier 47.0 mm deep, "and neither module draws the bore
   a real upright would have".

   The bore is drawn. suspension-9's body plate now reaches 42.5 mm further
   aft, to a built edge of x 1.3770, which is what makes room for it, keeps
   its forward edge and both z faces exactly where they were, and carries a
   bore of r 0.052 nominal and 0.0487 as built through the body, opening to
   0.0575 at the seal land. The 85 mm width was the
   whole of the old obstacle and it was the suspension's to change, not
   this module's. Crossings between front-unit and front-knuckle: 2,036 to
   ZERO, and 2,036 was the largest crossing count anywhere on the ladder.
   The tightest surface separation left in the joint is 3.28 mm.

   Two things worth keeping from the old entry. The 109.5 mm between the
   upright's outboard face at 0.5830 and the hub face at 0.6925, against
   122.5 needed by a 55 mm joint and a 70 mm boot lapping it by 2.5, was a
   real arithmetic and it is what a bore dissolves: the boot no longer has
   to fit OUTBOARD of the body, it passes through it. And the Gen 7 and
   Gen 8 pairing still puts drivetrain-7's bar 17.5 mm inside suspension-4's
   carrier plate, because suspension-4 has no bore either. That one is open.

   suspension-9, front 48 V damper feed: CLOSED, also from the suspension
   side. It ran along the front axle line at |z| 0.4769..0.5526 and passed
   straight through the halfshaft bar, 8.6 mm deep here against 18.2 mm on
   the plain 22 mm cylinder drivetrain-7 draws, the whole of that difference
   being the forged neck at r 0.0186. This entry ended "it belongs to
   whoever redraws that feed", and the feed is redrawn: the branch climbs
   over the bar to reach a connector that was always above it, 110 crossing
   pairs to zero, and 11.24 mm of surface separation at the closest station.
   The old 20.0 mm figure on this line was a single number quoted for both
   rungs and it was never true of either after the crispness pass.

   hv-4 is carried from Gen 4 into a fifth preset and its rear geometry is
   still drawn around a corner at |z| 0.81. The same exact test gives 28
   mesh pairs against drivetrain-7 and 28 against drivetrain-9, identical
   depths: the rear zonal controller box takes 15.0 mm of the rotor flange
   and 5.0 mm of a stator tooth pack, and a by-wire stub cylinder at
   (-1.286, 0.354, 0.710) reaches 4.0 mm into the stator carrier sleeve.
   drivetrain-7 reported the sleeve intrusion as 13 mm on a different
   measure; this file states 4.0 because that is what the deepest partner
   vertex inside this module's built solid actually is. Its landing points
   are confirmed rather than assumed: the front tunnel run is a tube of
   radius 0.0140 whose centerline ends at (1.30, 0.402, 0.015), and the
   two rear corner runs are tubes of radius 0.0070 whose centerlines end
   at (-1.36, 0.425, +/-0.625). This module lands on all three exactly.

   battery-7 stays clear. ZERO of its points fall inside the 235 mm
   cylinder about the rear axle over |z| 0.65..0.73, and it is worth saying
   what that sentence rests on now: the annulus is swept off the BUILT mesh
   of both modules on every run, so it survives both files being detailed.
   The closest approach at that corner was published at 35.0 mm surface to
   surface and 37.5 mm vertex to vertex, rotor flange to the pack floor lid.
   Re-swept it is 38.8 mm vertex to vertex, rotor flange (-1.274, 0.287,
   -0.650) to battery-7/floorlid, and tools/check-interfaces.sh reports the
   same 38.8 from its own sweep. It moved OUTWARD by 1.3 mm and both halves
   moved: this module's rotor flange gained a machined chamfer on its bore,
   and battery-7 is being detailed in parallel. A clearance that grows is
   still a clearance that has to be re-measured rather than carried, which
   is the whole reason it is quoted from a sweep and not from this comment.

   THE ONE THING THAT IS NO LONGER TRUE OF THIS FILE, said plainly because
   three paragraphs used to rest on it: the rear half is NOT byte-identical
   to drivetrain-7 any more. It was, across 54,461 vertices, and that
   identity was the argument for repeating drivetrain-7's rear numbers
   without re-deriving them. The crispness pass ended it. Every rear
   number in this file is therefore re-swept off this module's own built
   mesh rather than inherited, and where one moved it is stated above.

   body-9 replaces body-7 and body-8, and the aero prize the rear track
   unlocked at Gen 7 is finally being collected by somebody. It is still
   not collected here. This module's contribution to Gen 9 is one
   dimension and 0.42 kg, and the panels say so.

   thermal-9, autonomy-4 and interior-6 touch nothing this module owns.
   The corner coolant stubs still end inside the annulus and the run onward
   is implied, which is the house pattern since Gen 3.

   ── THE CRISPNESS PASS ─────────────────────────────────────────────────

   No engineering in this file changed. No mass changed: the module is
   117.58 kg before and after, to the gram, and every dimension the panels
   argue from is the dimension it was. What changed is that the parts stopped
   looking like the primitives they were built out of. 36,268 triangles to
   56,028 against the 60,000 budget, 93.4 percent of it.

   MESH COUNT, because SPEC.md now says it is the number that binds: 430
   meshes to 860, and a mesh is a draw call in a viewer that renders the
   scene twice per frame. Both figures come from one script run over both
   states. Nothing here is instanced; the four banks that repeat most
   (36 teeth, 36 shoes, 36 coils, 36 crowns per ring) are 288 meshes on
   their own and are the first place to spend an InstancedMesh when
   somebody does that pass.

   The tool that did most of it is zrev(), a surface of revolution about z,
   below. It is not just crisper than the ExtrudeGeometry annulus it
   replaced, it is cheaper: 8*seg triangles for a plain ring against that
   extrude's 16*seg, so a 44 segment ring with all four circular edges
   chamfered costs what the unchamfered extrude cost. Nineteen rings became
   turned parts with chamfers, registers, reliefs and shoulders for no
   triangles at all, and the budget that freed went into the features a real
   one has and this one did not.

   FIVE THINGS THE RAY SWEEP FOUND, all of them geometry nobody could see:
     1. The twenty dog teeth this part is named for were INSIDE the collar,
        r 0.044 in a solid drum of r 0.050. Zero faces exposed.
     2. The shift fork was inside the collar and the actuator together.
        Zero faces exposed. The actuator itself was 12 mm inside the collar.
     3. Fourteen housing bolts were 5.6 mm buried in a 7.2 mm stub, under a
        solid dish. Zero faces exposed. Third bank on this car to land that
        way; common.js warns about it and the warning is right.
     4. Twelve rotor flange bolts floated 4.0 mm off the flange they hold.
     5. First drafts of two NEW features landed the same way and were caught
        the same way: three inverter mounting ears placed inside the casting
        they bolt to, and eight boot clamps whose 10 sided polygon had its
        flats INSIDE the 16 sided boot they clamp. A clamp 0.8 mm proud on
        paper is buried on the built mesh if the two polygons do not nest.

   AND TWO CLASHES the sweep found that nothing else had:
     6. The stator's inboard potting ring ran r 0.1825..0.1925 over
        |z| 0.6540..0.6640 and took 4.5 mm of the rotor flange, which is
        r 0.188..0.233 over 0.650..0.658. A static part inside a rotating
        one, and it was nobody's finding because nothing had ever swept the
        two rings against each other. Moved to clear the flange by 2.5 mm.
     7. The three phase studs ran r 0.166..0.178, which is through the
        carrier sleeve at one end and into the yoke bore at the other. The
        channel open at that station is the gap between them, and see
        finding 13 below for what its width actually is on the built mesh.

   AND THREE THE REVIEW SWEEP FOUND AFTERWARD, because the first sweep
   scored a face on whether ANY ray escaped the whole module and the second
   scored it twice, once against the module and once against the mesh's own
   PART. The second question is the one that matters here: explode separates
   parts, not the meshes inside one, and this module declares no lib.shell,
   so a mesh its own part encloses is invisible in every state the viewer
   has.
     8. All six eddy probes were inside the hub bearing housing. The barrel
        was a plain r 0.072 cylinder over |z| 0.6475..0.7225 and the probe
        bodies sat at r 0.0562..0.0681 over 0.7100..0.7170, wholly within
        it: 264 triangles at zero exposure, and the base file buried the
        same three per side as 72 triangles of plain box. Fixed by stepping
        the barrel, which is the honest drawing anyway: the face at
        r 0.050..0.072 stops at 0.7100 and the probes seat on that shoulder.
        They now sweep 61 to 66 percent, the block 57, the leads 69 to 72.
     9. Two of the three probe pigtails per side ran THROUGH the stud
        flange, up to 6.93 mm inside it, and that flange is the part of this
        housing that turns. Four control points could not hold an arc of up
        to 158 degrees so the spline chorded across the hub face to
        r 0.0260, and the routing always stepped counterclockwise so the
        5.75 rad probe took the 277 degree way round. Short way, nine
        stations, and the tube surface holds r 0.0618..0.0690.
    10. The outboard HV loop shroud took 1.8 mm out of wheels-9's park
        brake backplate, an annulus of r 0.0640..0.1000 over
        |z| 0.6280..0.6350, across the plate's whole thickness. There is no
        axial answer at that station, so it went up in radius instead.
        The same move ended 13 by 9 by 6 mm the two shrouds shared with
        each other.

   AND FIVE THE ADVERSARIAL REVIEW FOUND AFTER THAT, every one of them a
   feature this pass added rather than one it inherited. All five are fixed
   above and re-swept; the pattern in four of them is the same, which is a
   NEW feature sized against a partner's NOMINAL dimension instead of the
   surface the partner actually builds.
    11. The front inverter's heatsink was 16 blades over 88 mm of z on a
        pocket whose lid is 40 mm deep and, being a cbox, presents only
        z -0.063..-0.033 as flat. Four blades stood 11.06 mm inside the
        front unit's disc housing, which starts at z -0.022, and four more
        floated with their nearest neighbor 3.73 mm away and nothing under
        them. Six blades at the same 5.6 mm pitch fit the face that exists.
    12. The corner inverter's new fin bank ran the full 88 mm of its lid and
        went straight through the ceramic DC link that already stood on it,
        y 0.5135..0.5235 against the link's 0.5140..0.5270, five blades by
        9.5 mm. The bank now takes the aft half of the lid, x -1.452..-1.406,
        and the link keeps the forward half.
    13. The relocated phase studs still did not fit. r 0.1710 plus a 2.8 mm
        shoulder is 0.1738 against a 0.1740 yoke bore, 0.2 mm on paper and
        negative on the mesh, because zrev builds that bore as a 26 sided
        polygon whose flats are at 0.17273. Every stud sat 1.07 mm inside
        the yoke and no segment count could have saved it. The channel
        measured wall to built wall is 0.16800 to 0.17273, so the studs are
        now 4.2 mm on a 0.1704 circle and the clamp plates carry a bore
        relief to match. This is the boot clamp lesson from finding 5 a
        second time: nest the polygons, not the nominal radii.
    14. The two forward mounting ears on the vectoring controller stood only
        8 mm proud of a casting they were centered 4 mm inside, so 85 percent
        of each head was buried: 4 percent exposed against 67 for the aft
        pair. They could not move forward, because P.penthouse starts at
        x -1.58 and this box is drawn to clear it, so all four ears moved to
        the z faces where there is 24 mm of open air.
    15. The new oil gallery to the cooler ran 15.86 mm inside the disc
        housing's neck and 11.46 mm inside the right-hand output shaft, a
        static pipe through a turning one, under a comment that said it was
        clear of both. The shaft owns y 0.3285..0.3815 across the whole of
        that corridor, so the feed now leaves the case's outboard face low,
        at y 0.302, and drops to the cooler underneath the shaft.

   And two the review measured and did NOT change, recorded so the next
   sweep does not read them as new. The 32 rotor magnets per side, 768
   triangles, and the 36 stator coils per side, 864, are sealed inside a
   hermetic can and a slot respectively and score zero exposure in every
   state. Both are drivetrain-7 geometry, both are correct as drawings, and
   both are the only zero-exposure meshes left in the module.

   ONE FINDING REPORTED AND NOT EDITED: both CV boots taper the wrong way.
   A fixed outboard Rzeppa clamps its boot's LARGE end on the outer race,
   and these clamp the large end on the bar. Turning them round would take
   the boot's full r 0.042 off |z| 0.570..0.583. That band used to be where
   the front-unit panel's 13.0 mm interference with suspension-9's upright
   was measured; the upright now has a bore and that interference is gone,
   so what the reversal would buy today is the tightest clearance left in
   the joint, 3.28 mm to the knuckle's steering arm. The convolutions went
   on; the taper did not turn round.

   AND ONE MORE, reported at the size it is rather than fixed at a price it
   is not worth: the three corner-inverter busbars graze the lip of
   wheels-9's rim flange bore. Vertex for vertex they are clean, the lowest
   busbar vertex at r >= 0.1500 sitting on |z| 0.65008 against a plate face
   at 0.6500, and the part's whole crossing of the plate band holds
   r <= 0.14706 against a 0.150 bore. What a triangle-triangle sweep finds
   is 24 pairs where the tube's FACET between two clean vertices dips about
   0.3 mm under the lip, which is a tessellation artifact of a 10 mm bar
   turning radially at |z| 0.6560 rather than a part in the wrong place.
   Swept at 10, 14, 18, 24 and 32 tubular segments the lowest vertex moves
   between 0.65008 and 0.65024 and never crosses, so no segment count fixes
   it and none is at fault. The lesson is the measurement one: "r 0.1471 at
   the plane" is a single-plane number and cannot see a facet that leaves
   and re-enters between two stations. Quote the crossing over the plate's
   whole |z| band, which is what the figure above now is. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'drivetrain-17',
  name: 'Drive units · Gen 17 the track',
  color: 0xe8a24c,
  /* GEN 17: the rear annulus this module's rings occupy, declared so that
     tools/check-interfaces.sh asserts THIS band rather than the Gen 7
     contract written for a rear track at |z| 0.74. Same radii, 20 mm in. */
  annulus: { rIn: 0.155, rOut: 0.235, zIn: 0.63, zOut: 0.71 },
  explode: [0, 0, 0],
  blurb: 'drivetrain-9 with the rear rings 20 mm inboard and the front halfshafts 20 mm shorter, for wheels-17\'s 1.44 m track; the annulus the rings occupy is declared for the checker. Nothing else moves.\n\n' + 'drivetrain-9: drivetrain-7 with one dimension changed. The front track came in 70 mm per side, so each front halfshaft loses 70 mm of bar and its outboard joint face lands on wheels-9\'s hub face at |z| 0.6925 instead of overrunning it. That is worth 0.42 kg and it costs 19 percent more articulation angle for the same wheel travel, both computed rather than claimed. The reason it gets a generation number is not the geometry: this interface was found 10 mm short at Gen 8 and 70 mm long at Gen 9, wrong twice running in opposite directions, and the fix it needed was an assertion rather than a third manual correction. This module now declares that plane as an interface and tools/check-interfaces.sh proves it against both halves\' built meshes.',
  /* The assertion this module's why panel asks for, now that there is a
     mechanism to carry it. Schema in SPEC.md; tools/check-interfaces.sh
     proves it against the built mesh of both halves and fails the preset if
     they disagree. This is the male half: extent 'max' means the shaft must
     reach the wheel's hub face and stop there, which catches the 10 mm
     short of Gen 8 and the 70 mm long of Gen 9 in one predicate. */
  interfaces: {
    'front-halfshaft-outboard': {
      kind: 'face', axis: 'z', at: 0.6725, tol: 0.002,
      part: 'front-unit', mirrored: true, extent: 'max',
      note: 'outboard CV joint face. Shaft pair center |z| 0.485, joint center 0.180 out, joint 55 mm long, so the face lands on 0.6925.',
    },
  },
  parts: {
    'stator-rings': {
      name: 'Wheel motor stator rings',
      tagline: 'Shorter, thinner and more finely poled: the ring gives up 190 Nm of peak to burn 24 watts of iron instead of 145.',
      mass: 27,
      count: 2,
      specs: [
        ['Topology', 'Outer rotor, 36 slots, 32 poles (Gen 5: 18 and 20)'],
        ['Active stack', '60 mm long, 7 mm yoke (Gen 5: 76 and 20)'],
        ['Peak per corner', '65 kW / 710 Nm (Gen 5: 105 kW / 900 Nm)'],
        ['Continuous', '38 kW / 400 Nm (Gen 5: 55 kW / 550 Nm)'],
        ['Core loss at 100 km/h', 'About 24 W per ring (Gen 5 ring: about 145)'],
        ['Maturity', 'Machine production practice; 0.10 mm 6.5% Si stack pilot line'],
      ],
      how: 'Start with what did not change. The annulus is still a binding contract, r 0.155 to 0.235 m, and drivetrain-3 already computed that 900 Nm out of a 76 mm gap at 195 mm radius is roughly 50 kPa of magnetic shear stress, the ragged top of what liquid-cooled permanent-magnet machines reach. Shear stress does not care how much money is in the room. So this ring does not try to beat it: it holds 48 kPa and simply gets shorter. Active length falls from 76 to 60 mm and peak torque falls in exact proportion, 900 Nm to 710. That is 21% less iron to magnetize on every revolution the car ever makes, in exchange for torque the car will use for a few seconds a week. Then the pole count goes from 20 to 32 in 36 slots. More poles means a higher electrical frequency at the same road speed, 208 Hz at 100 km/h against drivetrain-6\'s 130 (780 wheel rpm on a 0.34 m dynamic rolling radius, a touch above Gen 3\'s 0.335 because a low-Crr casing at higher inflation deflects less), which sounds like the wrong direction until you follow the flux: flux per pole falls with pole count, so the yoke that carries it thins from 20 mm to 7, and the loss it burns goes as frequency times flux density squared. The frequency term rises by 1.6 and the squared-flux term falls by more than that, and 6 kg of yoke iron leaves the car with it.\n\nThe third change is the material, and it is the largest. Gen 3 chose soft magnetic composite and gave an honest reason: at 297 Hz maximum, "iron loss stops mattering", which was true when the comparison was a geared machine spinning at 1.7 kHz. It stopped being true when the road load did. This car cruises on about 4.7 kW at 100 km/h, so a hundred watts of core loss is not a rounding error, it is 2% of everything the wheels are asked to do. The stack is now 0.10 mm laminations of 6.5% silicon steel, whose specific loss at these frequencies is roughly a quarter of SMC\'s, and the three changes compound: about 24 W per ring at 100 km/h where the drivetrain-6 ring, computed from its own geometry and its own material, burns about 145. Magnetic slot wedges close the slot openings so the rotor sees a smoother field and stops paying eddy loss for the stator\'s teeth. Windings stay vacuum-potted and the corner stays dry-air purged, both carried from drivetrain-6 without change, because both were right.',
      why: 'Every earlier ring on this ladder was designed at its peak, where copper loss dominates and fixed losses are noise. A range car lives at 4% of peak torque, where the opposite is true and the only losses that matter are the ones that do not scale with load. The whole redesign follows from moving the design point: shorter stack, thinner yoke, finer poles, better steel, all of them trades that would look like regressions on a stopwatch. The material change alone is 89 W per ring, close to 3 Wh per mile at cruise. On the mixed cycle the efficiency model uses, this module\'s entire efficiency gain is about 1.2% of range, near 20 miles of the 1,800, and the content states it that small because it is that small: driveline efficiency is the fifth of five levers in design/gen7.md and pretending otherwise would be the easiest lie in this generation.',
      fail: [
        '6.5% silicon steel is brittle, which is exactly why it is not already everywhere. Punching 0.10 mm laminations at 400 mm diameter without cracked teeth or burr-shorted edges is the pilot-line claim, and what has to become true is a stamping yield that holds across a production year rather than across a sample lot.',
        'Torque fell 21% and the car feels it at the worst moment: holding on a steep ramp with a trailer is now closer to the continuous rating than it was, so the zero-speed derate that drivetrain-3 first confessed arrives sooner, not later.',
        'Thirty-two poles at 36 slots pushes the force ripple to a higher order and a higher frequency, which is quieter in the cabin and harder on the bond line between the stator and the carrier sleeve; the fatigue case moved rather than closed.',
      ],
      explode: [0, 0, 0.90],
    },
    'rotor-rings': {
      name: 'Wheel motor rotor rings',
      tagline: 'The ring that moved the car sideways at Gen 7. Two generations later the miles it enabled are finally on the car, and none of them were collected here.',
      mass: 14,
      count: 2,
      specs: [
        ['Magnets', 'NdFeB, 32 poles, Halbach array (Gen 5: 20 poles)'],
        ['Carrier', 'Aluminum hoop: a Halbach needs no back iron'],
        ['Center', '|z| 0.74; Gen 9 brings the front to 0.74 as well'],
        ['Mounting', 'Twelve titanium bolts, flange face |z| 0.65 exactly'],
        ['Coasting drag', 'About 12 W per corner at 100 km/h from magnets and can'],
        ['Maturity', 'Pilot line (hermetic canning at wheel scale, carried)'],
      ],
      how: 'The magnetics are drivetrain-3\'s idea in its third posting: tangentially magnetized segments between the poles steer flux inward at the stator and leave the outer face nearly dead, so there is no back iron anywhere and the carrier can be aluminum instead of steel. Thirty-two poles instead of twenty means each pole carries less flux, so the magnet thins from 12 mm to 8 and the whole array loses weight without losing airgap flux density. The hermetic 0.3 mm stainless can that drivetrain-6 introduced carries over unchanged, because a canned pole is inspected like a pressure part and an uncanned one is inspected like a chemistry experiment. Finer poles would ordinarily cost the rotor more eddy loss, since the slot harmonics that heat the can arrive more often; the stator\'s magnetic slot wedges cancel that and then some, and the pair lands at about 12 W of magnet and can drag per corner at 100 km/h. That figure is stated as magnet and can only, which is what drivetrain-6\'s 55 W row also measured. This generation states the whole coasting number somewhere it can be found: core plus magnets plus bearings and seals is about 51 W per corner, against about 188 for the drivetrain-6 corner computed the same way.\n\nThe geometry was the real news at Gen 7 and the accounting is the real news now. The flange bolt circle sits at |z| 0.74 with the rotor flange\'s inboard face exactly on the contract plane at |z| 0.650, which is a defect drivetrain-6\'s reviewer found and this module does not inherit. Seventy millimeters per side was 140 mm of rear track, and the Gen 6 aero audit had said the whole car was waiting on it: the haunch was pinned at 0.950 half-width by the old rear track, so all 400 mm of plan closure was crammed into the last 845 mm at 21 to 33 degrees, past the 12 to 15 degree limit where flow stays attached, and the tail separated. drivetrain-7 stated plainly that it delivered the precondition and banked nothing, and named about 52 miles on the Wh per mile that configuration actually modeled. Two rungs later the ledger can be closed with js/efficiency.js\'s own audited numbers rather than a promise. body-7 ran Cd 0.118 on area 2.163, CdA 0.2552. body-8 spent the released rear track on the tail and took the coefficient to 0.108 on an essentially unchanged area, CdA 0.2330, down 8.73 percent. body-9 spends the front track and takes the area to 2.043 at the same 0.108, CdA 0.2206, down a further 5.29 and 13.55 percent from body-7 in total. The distinction is the lesson design/retro-gen8.md paid for: an afterbody buys coefficient and only the front and the package buy area, so the rear track this ring moved bought the first half and the front track wheels-9 moved bought the second. Neither half is banked on this panel, because a drivetrain does not get to collect a body\'s drag.\n\nMoving a wheel also breaks things, and this one broke the pack. A ring at |z| 0.74 reaches into the battery envelope design/gen4.md has declared since Gen 4, x -1.300 to -1.222 and y 0.179 to 0.309 per side, and it landed 116 vertices inside battery-6\'s floor-lid corner. The pack was the side that moved and battery-7 shipped with the cut made, re-verified here against its built mesh in the Gen 9 preset: zero of its points fall inside the 235 mm cylinder this ring needs over |z| 0.65 to 0.73, and the closest approach at this corner, re-swept, is 38.8 mm nearest vertex to nearest vertex, this flange at (-1.274, 0.287, -0.650) to the pack floor lid. tools/check-interfaces.sh sweeps it independently and reports the same 38.8 mm. It was published at 35.0 mm surface to surface and 37.5 mm vertex to vertex, and it has moved 1.3 mm the safe way because both halves were detailed: this flange gained a machined chamfer on its bore and battery-7 is being drawn crisper alongside it. The reason the number is re-quoted rather than carried is that the argument for carrying it has gone. Until this pass the rear halves of this file and drivetrain-7 were identical to the vertex, so any figure that differed between them was a convention drifting rather than a car changing. They are not identical any more. Every rear figure on this panel is now swept off this module\'s own built mesh.',
      why: 'The honest version of this panel changed shape between Gen 7 and Gen 9 without a single vertex moving, and that is worth more than the geometry. At Gen 7 the correct sentence was that the ring had bought a precondition and banked nothing, because body-7 was carried by instruction and it would have been very easy to write the drag reduction as though it had already happened. The aero audit is on record about how the last such claim went. At Gen 9 the correct sentence is that the precondition was real: 13.55 percent of CdA has come off across two body generations, half of it unlocked by this ring and half by the front track, and this panel still banks none of it. A part that enables something is not the part that delivers it, and a ladder that lets enablers collect twice stops being a ledger.',
      fail: [
        'The deliberate track asymmetry drivetrain-7 created is gone, and its replacement is a car narrow at both ends. Rear lateral load transfer is still about 9 percent up on the 1.62 m car, and now the front is too, so suspension-9 measures total roll stiffness 10.3 percent below Gen 8 and grows both bars to put the rate and the 58/42 split back. What a bar cannot reach is the roll center, and suspension-9 states the residual as 0.9 percent of roll gradient. This ring is upstream of all of it and none of it is fixable here.',
        'The can is still hermetic until it is not, and a breach is still invisible from outside; the tell is still a slow per-corner back-EMF amplitude drift, watched every drive, and it is still the pilot-line claim on this panel.',
        'Thirty-two poles means thirty-two segment joints per ring instead of twenty, so the adhesive bond population that holds the array against 4 kN per millimeter of magnetic pull grew by 60% while each joint got smaller. More joints is more places to be wrong, and the retention argument restarts its statistics.',
      ],
      explode: [0, 0, 0.90],
    },
    'hub-bearings': {
      name: 'Hub bearing units',
      tagline: 'A kilogram lighter because the torque fell, then a ball row heavier because the track narrowed. The net is one kilogram and the arithmetic is on the panel.',
      mass: 18,
      count: 2,
      specs: [
        ['Type', 'Double-row angular contact, silicon nitride elements'],
        ['Bore', '120 mm (carried from Gen 3)'],
        ['Airgap budget', '0.30 of the 1.0 mm gap is bearing tilt (carried)'],
        ['Gap telemetry', 'Three eddy probes on the housing, once per revolution'],
        ['Cornering load', 'Up about 9% at the outer rear; both tracks 1.48 m now'],
        ['Maturity', 'Hybrid bearings production practice; probes pilot line'],
      ],
      how: 'The unit is drivetrain-6\'s, and the three answers it gave to drivetrain-3\'s three confessions all carry: silicon nitride rolling elements so the inverter\'s common-mode current has no path and the grounding ring stays deleted, ceramic hardness so the brinelling threshold moves even though the mechanism does not, and three eddy-current probes trending the hub flange orbit every revolution so preload relaxation is telemetry rather than archaeology. Two things about it changed for Gen 7 and they pull in opposite directions. Peak corner torque fell from 900 to 710 Nm, which takes about a kilogram of race section and carrier web out of each unit. Then the rear track narrowed by 140 mm, and for a given cornering force the load transferred onto the outer rear wheel rises roughly in inverse proportion to track: about 9% more load on the outer bearing, and since ball-bearing life goes as the cube of the load ratio, about a quarter less L10 life if nothing is done. Something is done: the ball complement grows to put the life back where it was, and the net mass change is a single kilogram out.\n\nThe carrier structure was redrawn rather than inherited, and the reason is that the load path has to thread a hole. drivetrain-6\'s stator carrier sleeve ran r 0.150 to 0.156, dipping five millimeters inside the annulus floor and into volume the wheel owns. Here the sleeve is r 0.1555 to 0.168, wholly inside the contract, and it reaches the upright through a neck at r 0.132 to 0.149, because the rim flange has a 0.150 bore and nothing wider gets past it. wheels-9 carries wheels-7\'s rear wheel unchanged and the sweep confirms it station by station: flange plate r 0.1500 to 0.2440 over |z| 0.6460 to 0.6500, drum shell r 0.0720 to 0.0900 over 0.6580 to 0.7320, park brake backplate r 0.1000 or less over 0.6280 to 0.6350. The step between neck and sleeve sits at |z| 0.6505 to 0.6625, where wheels-9 owns only its drum at r 0.094 and its rim at r 0.254, so the carrier passes through a 160 mm wide gap it did not have to invent. The gap probes moved too, and the reason is worth stating: drivetrain-6 aimed them at the rotor flange, which in this corner is bolted face to face against the rim flange and cannot be seen at all. They now read the hub flange from the housing, which is where bearing tilt is largest anyway, and every one of them sits on the housing instead of floating, because design/retro-gen5-apex.md recorded that a part which touches nothing reads as floating even when it passes every zone check. One partner is no longer reported, and the closing of it is the largest thing that happened to this housing between Gen 7 and Gen 9 without a vertex moving. drivetrain-7 measured itself against suspension-4\'s shipped file, which still drew its rear corner around a wheel at |z| 0.81, and found five suspension parts sharing volume with three of its own. Re-run as an exact point-in-solid test in both directions rather than a bounding-box screen, that pairing gives 171 interfering mesh pairs at the rear corner, deepest 25.5 mm where a 48 V damper lead runs through this housing. suspension-9 redraws the rear corner rather than translating it, moving the pickups 100 mm inboard and the outer joint plane from |z| 0.70 to 0.60, and the same test over the Gen 9 pairing gives 19 pairs, deepest 10.5 mm, and that deepest one is deliberate, so the number to compare against 25.7 is the deepest unintended overlap, which is 3.5 mm. Ten of the nineteen are intended face-to-face contacts at 0.0 mm, one is this module\'s own yaw-demand link landing 10.5 mm inside the chassis ECU on purpose, four are a 48 V damper lead crossing a carrier spoke by 3.5 mm, and four are the corner inverter pack taking 0.5 mm of an upper-link plate. What drivetrain-7 asked for is what it got: it wrote that the rear upright had to become an annular carrier meeting this neck at r 0.149 or less inboard of |z| 0.65, that a translated corner was not a redrawn one, and that a Gen 4 partner was not its to fix. suspension-9 did the redraw. The specific defect this panel named, a rear-steer outboard ball joint sitting 23 mm inside this housing, is gone: suspension-9 lands that joint at |z| 0.6123 to 0.6377 on its built mesh, wholly inboard of this housing\'s inboard face at 0.6475. The 23 mm was drivetrain-7\'s figure on drivetrain-7\'s measure; the exact test used throughout this file, which reports the deepest partner vertex inside this module\'s built solid, scores the same overlap at 9.5 mm. Both describe the same defect and the convention is stated so the two numbers are not read as a disagreement. Running suspension-9 against drivetrain-7 returns the same 19 pairs and the same depths as against this module, which is the check that proves the Gen 9 halfshaft change touched nothing at this corner.',
      why: 'These are still the least optional kilograms in the system, because gap collapse is still a magnet ring meeting a coil ring at road speed, and the magnetic negative spring still pulls about 4 kN per millimeter of eccentricity whatever the track is. What Gen 7 adds is a reminder that moving a wheel is never free: the aero prize came with a bearing bill, the bill was 9% of load and a quarter of life, and it was paid in steel rather than argued away.',
      fail: [
        'Ceramic elements still fail by cracking rather than the slow spalling steel announces for thousands of kilometers. The pairing with gap telemetry is deliberate and unchanged: quieter failure mode, louder instrumentation.',
        'The narrower track raises cornering load every corner of the car\'s life, not occasionally, so the recovered life depends on a ball complement change holding its preload distribution across temperature. That is a rig claim today and a fleet claim later.',
        'The 171 pairs against suspension-4 and the 19 against suspension-9 come from one test run over both, which is the only way that comparison means anything, and the number is still not zero. The 3.5 mm the 48 V damper lead takes out of a carrier spoke is small enough to look like rounding and it is not: a spoke is the load path from the bearing out to the neck, and a lead buried in one is a lead that gets pinched rather than chafed. It is reported and not edited because the lead is suspension-9\'s to route, exactly as the 23 mm rear-steer joint was suspension-4\'s.',
      ],
      explode: [0, 0, 0.78],
    },
    'corner-inverters': {
      name: 'Rim-side GaN inverters',
      tagline: 'Half the current, and a carrier frequency that drops when the car is only cruising: switching loss is a choice, not a constant.',
      mass: 5,
      count: 2,
      specs: [
        ['Topology', 'Three-level flying capacitor, 650 V GaN (carried)'],
        ['Packaging', 'Embedded die, zero bond wires (carried from Gen 5)'],
        ['Peak phase current', '130 A (Gen 5: 260 A) at 810 V nominal'],
        ['Switching', '100 kHz at load, 25 kHz below 15% torque'],
        ['Loss at cruise', 'About 25 W per corner at 2.4 kW output'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'The topology and the packaging are drivetrain-6\'s and neither needed help: a flying-capacitor bridge halves the voltage each die sees so 650 V lateral GaN can serve an 810 V nominal bus, and embedded-die construction laminates the dies into the board with plated copper vias so there are no bond wires to resonate and no solder balls to shear at 40 g. What changes is duty. Corner peak power fell from 105 kW to 65, so peak phase current halves to 130 A and the die area, the DC link and the cold plate all shrink with it. More interesting is what happens at the other end of the map. At a steady 100 km/h each corner delivers about 2.4 kW, which is 4% of peak, and at 4% of peak the conduction loss that sizes an inverter is essentially zero while the switching loss is exactly what it was at full load: a fixed number of joules per transition, times 100,000 transitions a second, whether the transition is carrying 130 A or 3. So the carrier drops. Below 15% torque the modulator falls to 25 kHz and switches to a discontinuous scheme that clamps one phase leg at a time, cutting switching events by a further third, and the corner inverter burns about 25 W instead of about 90.\n\nThe reason it can do that without ruining the car is the machine on the other side. Thirty-two poles at 208 Hz fundamental gives 25 kHz a carrier ratio of 120, still far above the 20 or so where current ripple starts distorting torque, and at 4% torque the ripple that does get through is riding on almost no fundamental, so the acoustic and the ripple-loss consequences are both below the noise floor of a car with no gears. The moment torque demand crosses the threshold the carrier steps back up, and the transition is scheduled rather than instantaneous so it never lands inside a vectoring event. The rest of the panel is carried: active flying-capacitor balancing monitored every cycle with its derate-on-suspicion policy, the shared cold plate with the stator jacket, and the ten-year replacement interval that embedded-die packaging bought by deleting the joints that were failing.',
      why: 'A range car spends almost all of its energy in the part of the efficiency map that no datasheet plots. Peak efficiency at rated power is a number nobody in this car ever experiences; the number that matters is the loss at 4% load, and that one is set by switching frequency and nothing else. Trading carrier frequency for loss when the torque is not there is free in every sense that matters, which makes it exactly the kind of lever this generation was told to look for.',
      fail: [
        'A variable carrier means the acoustic signature of the car changes with load, and a 25 kHz whine is inaudible to most adults and not to all of them, nor to dogs. The threshold hysteresis exists so the car does not hunt across it in traffic, and the fleet microphones are the referee, as they were for the front unit\'s 1.7 kHz whine three generations ago.',
        'Discontinuous modulation raises the ripple current the DC link sees at the same time as it lowers switching loss, and the ceramic stack was sized for the continuous scheme; the margin is real but it is margin, not headroom.',
        'The pack measures x -1.5000 to -1.3760, y 0.4780 to 0.5270, |z| 0.6100 to 0.6610 on the built mesh, and the column it lives in changed shape under it between generations. Against suspension-4 it was a 32 mm box in a 40 mm window, 5 mm over a body-side air-spring top plate with its phase busbars 1 mm off the same plate, and because this pack is unsprung and the plate was body-side, that 1 mm was one millimeter of wheel travel rather than a clearance. suspension-9 moves the rear spring seat to |z| 0.539 and the plate leaves the column. Swept off the built meshes: straight down from every point on this pack the nearest suspension-9 surface is 43.3 mm away, and the nearest suspension-9 surface anywhere below the pack\'s floor plane is that relocated seat at 27.6 mm, against drivetrain-7\'s 5 mm to a plate and 1 mm from its busbars. What replaced the conflict is smaller and it is still real: the pack\'s forward-inboard corner takes 0.5 mm of a rear upper-link plate, and the ball joint on that link, y 0.5280 to 0.5620 over |z| 0.5834 to 0.6166, overhangs the pack\'s inboard flank with 26.5 mm of vertical gap and 11.5 mm surface to surface at the closest. It does not stand over the lid, which runs |z| 0.6215 to 0.6345. Both numbers are unsprung-to-body-side again, so both are travel numbers rather than clearances, and the 0.5 mm is the tightest thing at this corner.',
      ],
      explode: [0, 0, 0.78],
    },
    'service-loops': {
      name: 'Dual service loops',
      tagline: 'The corner moved 70 mm closer and the umbilical got harder, not easier. Then the current halved and gave the bend radius back.',
      mass: 6,
      count: 2,
      specs: [
        ['Conductors', 'Two loops per corner, 10 mm2 DC pair each, class 6'],
        ['Redundancy', 'Either loop carries the full corner alone, diode-ORed'],
        ['Corner current', '80 A peak (Gen 5: 130 A; Gen 3: 148 A)'],
        ['Bend control', '70 mm radius, jacket-enforced plane'],
        ['Body landing', '(-1.36, 0.425, +/-0.625), hv-4\'s build geometry'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Two loops per corner, each rated to carry the whole corner alone, joined at the inverter through ideal-diode ORing stages: that architecture is drivetrain-6\'s and it carries because it turned a wear-out failure from announced into unhurried. The Gen 7 story is what moving the wheel did to it. hv-4 is a Gen 4 module carried unchanged, so its corner runs still terminate where they always did, and this module lands on the coordinates in hv-4\'s build code, (-1.36, 0.425, +/-0.625), rather than the (-1.36, 0.40, +/-0.63) that hv-4\'s own comment claims and that drivetrain-6 copied out of the prose. That is a 25 mm correction and it exists because design/retro-gen5-apex.md made partner geometry, not partner prose, the standard. The corner then moved 70 mm inboard while the body-side bracket stayed put, so the free span between fixed and moving ends shrank by 70 mm with the wheel travel unchanged. A shorter umbilical is not a gentler one: the same suspension stroke folded into a shorter cable is a tighter bend radius and more strand strain per kilometer.\n\nWhat pays for it is the same arithmetic that cut the power. Peak corner current falls from 130 A to 80 because peak corner power fell from 105 kW to 65 on the same bus, so each loop drops from 16 mm2 to 10. Bending strain on a stranded conductor is the strand radius divided by the bend radius, and a 10 mm2 class 6 bundle reaches the same strand strain at a 70 mm radius that the 16 mm2 bundle needed 90 mm for. The loop lost 70 mm of span and gained 20 mm of bend allowance, and the two very nearly cancel; the remainder is taken up as deliberate slack routed forward of the bracket rather than pretended away. The 4 mm dry-air purge line to the stator cavity still rides the same jacketed bundle, so the corner\'s whole umbilical still flexes as one engineered object, and the per-loop resistance trend still runs every drive, because strand fatigue is still the thing this part exists to see coming.',
      why: 'Every serious argument against in-wheel drive names unsprung mass first and this cable second. Gen 3 answered with monitoring, Gen 5 answered with a twin, and Gen 7 had to answer a new question, which is what happens to a fatigue-critical flexing joint when you move one of its ends. The answer here is that it got harder and then the voltage arithmetic paid for it, and the honest version of that sentence includes the first half.',
      fail: [
        'Both loops still share one routing plane and one bracket, so the redundancy is against fatigue and not against geometry: the curb strike that crushes one crushes both, and the corner isolation that follows is the same event Gen 3 owned.',
        'Ten square millimeters is a smaller conductor in a wetter, saltier place, and connector fretting scales with contact count, not with copper area; the flagged-loop policy still replaces the cable with both its connectors and attempts no diagnosis, because the ambiguity did not shrink with the wire.',
        'The 70 mm bend radius is a design minimum on nominal geometry, and the rear corner it hangs off has now been redrawn once. suspension-9 moves the rear pickups 100 mm inboard and the outer joint plane from |z| 0.70 to 0.60, which changes the arc the sprung end of this loop swings through even though both of this part\'s own ends stayed put. The static sweep is clean and a static sweep is not a travel sweep, so if the redrawn links carry more articulation than the drawing implies, this is still the part that finds out first.',
      ],
      explode: [0, 0, 0.78],
    },
    'tv-controller': {
      name: 'Vectoring and connection coordinator',
      tagline: 'A third less yaw authority, and a new job: deciding when the front axle is allowed to be asleep.',
      mass: 2,
      specs: [
        ['Inputs', 'Two rear torques, front torque, rear-steer angle, clutch state'],
        ['Yaw authority', 'About 1,740 Nm from the rear pair (Gen 5: about 2,620)'],
        ['Reconnect latency', 'About 180 ms commanded, about 40 ms predicted'],
        ['Loop rate', '1 kHz corner torque, 100 Hz yaw (carried)'],
        ['Safety', 'Dual channel, dissimilar code, 5 ms cross-check (carried)'],
        ['Maturity', 'Loops production practice; connection arbitration pilot line'],
      ],
      how: 'The yaw arithmetic first, because it is the cost. A pair of opposed rear wheels makes a yaw moment equal to the longitudinal force difference times the track. Continuous torque per corner fell from 550 to 400 Nm and the track fell from 1.62 to 1.48 m, so standing yaw authority from the rear pair falls from about 2,620 Nm to about 1,740, a third of it gone: roughly a quarter from torque and the remaining tenth from the track itself. Nothing recovers that, and the panel says so. What softens it is that suspension-9 carries the same plus or minus 3.0 degrees of rear steer, still the fourth input and still costing nothing to hold, so the split that drivetrain-6 learned stands: torque buys the transient, geometry holds the steady state, and the coordinator spends the smaller torque budget only where an angle cannot arrive fast enough. Ownership is unchanged and exact, because it has to be: suspension-9\'s chassis ECU owns the rear-steer schedule and its fail ladder, its casting measuring 0.217 by 0.036 by 0.150 about (-0.9525, 0.326, -0.280) on the built mesh with its aft wall on x -1.0380, so this module\'s yaw-demand link lands 8.0 mm inside that wall rather than stopping at the center coordinate, the two computers exchange yaw demands at 1 kHz over hv-4\'s zonal bus, and a braking demand from the wheels-9 master unit overrides any vectoring demand within 2 ms, always.\n\nGen 9 hands this box one more subtraction and it is not its own. Narrowing the front track takes 8.6 percent off the yaw moment the front brakes can make, by suspension-9\'s arithmetic on the same lever-arm argument this panel used for the rear pair at Gen 7. So every yaw actuator on the car that works through a lever has now been cut: rear vectoring by a third at Gen 7, front brake-based yaw by 8.6 percent at Gen 9. The one that does not care about track is rear steer, because it works through slip angle rather than a force difference across a width, and the arbitration schedule shifts onto it accordingly, leaning on angle earlier and on brake-based yaw later than Gen 8 did. Nothing in this box\'s hardware changed to accommodate that. Its authority table did.\n\nThe new job is connection. With the front axle mechanically disconnected at cruise the car is rear drive with a third of its old yaw authority, and this box decides when that stops being acceptable. Commanded reconnect takes about 180 ms, of which roughly 140 is spinning the front rotor and both gear stages up to synchronous speed before the dog collars can engage. That is far too slow to be a reaction, so it is not one: the coordinator reconnects on prediction, from steering rate, pedal rate, the friction estimate, and autonomy-4\'s forward camera wedge, the same preview feed suspension-9 uses for its valves. Predicted reconnect lands in about 40 ms of actual clutch travel because the rotor is already turning. The arbitration is deliberately asymmetric and biased toward waking up: any of a dozen cues closes the clutches, only a sustained quiet cruise opens them, and the energy cost of a wrong wake-up is a few watt-hours while the cost of a wrong sleep is a car that understeers into an event with one axle.',
      why: 'Gen 5 argued that authority compounds, and it was right, so Gen 7 has to be honest that it just spent some. What it bought is a drivetrain whose fixed losses at cruise fell by roughly 980 W, and yaw authority is a capability the car uses for seconds while cruise loss is a bill it pays for hours. That is the whole generation in one trade. The part that is genuinely new engineering rather than genuinely new sacrifice is the arbitration: a car that can switch between two drivetrain topologies at speed needs one computer that owns the switch, and putting it here rather than in the chassis ECU keeps the safety demotion clean, because this box has always been allowed to fail into three-motor allocation and now fails into two.',
      fail: [
        'A stuck-open clutch is the failure that matters, and it is silent: the car simply is not all-wheel drive any more, and finds out at the first split-grip launch. The detection is a torque-versus-speed residual on the front machine checked at every reconnect, and the fallback is that the rear pair plus friction braking is a complete, if slower, car.',
        'Prediction that is biased toward waking up will wake up wrongly, and every false reconnect spends the energy this part exists to save. The bias is deliberate and the ledger is real: the model budgets a few false wakes per hundred kilometers, which is watt-hours, against a single late one, which is a handling event.',
        'Two computers negotiating one yaw budget was already a live-disagreement fault class in Gen 5; a third state, whether the front axle even exists right now, multiplies the cases the dissimilar-code validation has to cover, and every release of either controller reopens the file.',
      ],
      explode: [0, 0.5, 0],
    },
    'front-unit': {
      name: 'Front drive unit',
      tagline: 'The whole of Gen 9 in this module is on this panel: 70 mm off each halfshaft, 0.42 kg back, a fifth more articulation angle, and an interface that has now been wrong twice in a row.',
      mass: 37.28,
      specs: [
        ['Machine', 'Yokeless axial flux, 130 kW / 240 Nm (Gen 5: 270 / 450)'],
        ['Reduction', '5.95:1 two-stage, open diff (carried since Gen 2)'],
        ['Sizing case', 'Regen capture: 130 kW is about 0.32 g at 100 km/h'],
        ['Halfshaft', 'Joint faces |z| 0.2775 to 0.6925, bar 330 mm (was 400)'],
        ['Mass detail', '28 kg unit + 7.58 kg halfshafts + 2 kg mounts'],
        ['Maturity', 'Machine production practice; AM housing pilot line'],
      ],
      how: 'The machine is unchanged from drivetrain-7 and so is everything bolted to it: the yokeless axial-flux topology with concentrated coils on two stator discs either side of a carbon-hooped rotor, the 5.95:1 two-stage reduction and open differential drivetrain-2 introduced, the additively built housing whose ribs follow a topology optimizer\'s load paths, 130 kW and 240 Nm sized by the deceleration the axle can catch rather than the acceleration it can deliver. Under braking, load transfer puts roughly 70 percent of the car\'s weight on the front axle, so front regeneration is where the recoverable energy is, and 130 kW at 100 km/h is about 0.32 g captured electrically. None of that moved, because Gen 9 did not ask it to. What moved is the wheel.\n\nwheels-9 brings the front centers in from |z| 0.81 to 0.74 and puts the hub face inboard plane on |z| 0.6925. That plane is not a claim off its comments. Swept off the built mesh, it is the inboard face of a hub face disc of radius 0.074 about the front axle, and the disc surface sits on 0.6925 at every radius inside 0.074, which is the whole of what a 55 mm joint at r 0.036 has to land on. Outboard of r 0.074 the corner runs inboard of the plane rather than up to it, 0.6903 at r 0.075 to 0.080, 0.6850 at 0.080 to 0.085 and 0.6040 from r 0.085 out where the disc bell and the caliper live, so 0.6925 is a hub face and not a wall across the corner. drivetrain-7 ends its outboard CV joint face on 0.7625, which is wheels-7\'s plane and is exactly right there. Against wheels-9 it overruns by 70.0 mm, and the sweep is unambiguous: 192 wheels-9 vertices inside drivetrain-7 solids across 6 mesh pairs at up to 21.6 mm past the nearest surface, and 154 drivetrain-7 vertices inside wheels-9 solids across 4 more at up to 5.0 mm. So the shaft is re-derived from the two faces that actually constrain it. The inboard end does not move, because the disconnect collar spans |z| 0.2100 to 0.2800 and the inboard joint face seats 2.50 mm inside it; move that face and the collar grips nothing. Half-span becomes 0.2075, the pair center 0.4850 against 0.5200, the joint center offset 0.1800 against 0.2150, and the bar 0.330 m against 0.400. On the built mesh the outboard face lands at |z| 0.69250 against a hub face of 0.69250. The gap is 0.000 mm and the sweep against wheels-9 returns zero penetration in either direction.\n\nA shorter shaft at unchanged wheel travel is not free, and the numbers come from one four-bar solver run over both rungs with pivot coordinates read off suspension-4\'s and suspension-9\'s built meshes. Travel is the Gen 1 figure both carry, 95 mm bump and 85 mm droop at the wheel. Joint center to joint center the shaft falls from 0.4300 m to 0.3600, down 16.28 percent, while the inboard joint center stays at |z| 0.3050 on both. At full bump the inboard joint articulates 15.069 degrees where it articulated 12.661, and the outboard joint 13.555 where it did 11.484. At full droop it is 13.426 against 11.200 inboard and 11.545 against 9.204 outboard. About static the rate goes from 0.1302 to 0.1553 degrees per millimeter of wheel travel, 19.3 percent more angle for the same road, every kilometer, for the life of the car. One thing gets easier and it is the plunge: the required inner-joint stroke over full travel falls from 6.00 mm to 4.71, because a shorter shaft recovers more length from the vertical component than it loses to the wheel center\'s 14 mm inboard arc. That is the entire engineering ledger of this generation on this axle, and the mass side of it is on the why.',
      why: 'This panel exists for a process reason more than a geometric one. design/retro-gen8.md records that clearing drivetrain-7\'s review debt found these same front halfshafts ending 10 mm short of the wheel they drive. One rung later, against a wheel that moved, the same interface is 70 mm long. Twice in a row, in opposite directions, and both times because the length was carried from the previous drawing and then patched rather than derived from the wheel it drives. The 10 mm miss came from pulling the pair inboard to reach new dog collars; the collars moved instead and the number went back to one that was only ever right for a 0.81 track. A third manual fix is not the answer. The predicate is one line and it is exact: the outboard CV joint face |z| must equal the active wheels module\'s front hub face inboard plane. It is now enforced rather than written down. This module declares that plane under the interface key front-halfshaft-outboard with extent max, wheels-9 declares the same plane from the wheel side, and tools/check-interfaces.sh sweeps both built meshes and fails the preset if they disagree or if either half does not actually reach the plane it named. Agreement between two comments would have proved nothing here, because every comment in drivetrain-7 said 0.7625 while its shafts ran 70 mm past the wheel; the check is against vertices.\n\nThe mass case is deliberately unflattering. The only steel deleted is 70.0 mm off each of two bars. Booked against the drawn 44 mm section that would be 1.671 kg, and that would be an overclaim, because the full drawn steel volume of the pair is 16.58 kg against the 8 kg this ledger has carried since Gen 1, so the drawn cylinder is 2.073 times the massed part. The massed bar is the structural one: 240 Nm through 5.95:1 into an open differential is 714 Nm per shaft, a 22 mm solid bar holds that at 342 MPa of torsional shear, that bar is 1.194 kg over 400 mm, and it leaves 1.40 kg for each of four joints with boot and grease. Seventy millimeters off two of them is 0.418 kg. Booked at 0.42: halfshafts 8 to 7.58, this part 38 to 37.58, the module 118 to 117.58, which still rounds to the 118 kg the system chip shows. A generation that bought a fifth more articulation angle for four hundred grams should say the four hundred grams out loud rather than round it up.',
      fail: [
        'Nineteen percent more articulation angle is paid at the joint every revolution of the car\'s life. A Rzeppa joint\'s friction and heat both rise with angle rather than with load, and the boot fails on angle and heat rather than on load, so the part of this generation that will show up in fleet data first is boot life on the front axle. The statistics restart, and the panel does not pretend the 0.42 kg was free.',
        'The boot now fits, and what fixed it is the sentence this entry used to end on. It reported that suspension-9\'s upright body, 85 mm wide in x over |z| 0.5510 to 0.5830, left 13.0 mm of the outboard boot standing inside solid metal at its full r 0.042, that an 84 mm bore does not go through an 85 mm upright, and then, filed separately as not a finding, that the bar, the joint and the boot all run 47.0 mm through the hub carrier because "neither module draws the bore a real upright would have". The bore is now drawn. suspension-9\'s plate reaches 42.5 mm further aft, to a built edge of x 1.3770, which is what makes room for it, and carries a bore of r 0.052 nominal and 0.0487 as built through the body, opening to 0.0575 at the seal land, with both z faces exactly where they were. The tightest radial gap through that plate is 4.6 mm, at z 0.575 where this boot\'s big clamp presents r 0.0420. Crossings between this part and front-knuckle went 2,036 to zero, and 2,036 was the largest crossing count anywhere on the ladder. The 109.5 mm between the upright\'s outboard face and the hub face, against 122.5 needed by a 55 mm joint and a 70 mm boot lapping it by 2.5, was correct arithmetic and a bore is what dissolves it: the boot passes through the body instead of having to fit outboard of it. Still open one rung down, because suspension-4 has no bore either: the same sweep puts drivetrain-7\'s bar 17.5 mm inside its carrier plate on the Gen 7 and Gen 8 car.',
        'Both boots still taper the wrong way, and this is now the last drawing error at this corner. A fixed outboard Rzeppa clamps its boot\'s large end on the outer race and its small end on the bar, and both of these do the opposite. Turning them round takes the full r 0.042 off |z| 0.570 to 0.583 and would open the tightest clearance left in the joint, which is 3.28 mm between this boot and the knuckle\'s steering arm. It is not taken here because it is a seventeen point bellows profile and two clamp radii to reverse, the clearance it would improve is already positive, and it belongs with a review that can look at the result rather than with a penetration sweep that cannot.',
        'suspension-9\'s front 48 V damper feed used to run along the front axle line at |z| 0.4769 to 0.5526 and pass straight through the halfshaft bar, 8.6 mm deep in this one and 18.2 mm deep in the plain 22 mm cylinder drivetrain-7 draws, the whole of that difference being the forged neck at r 0.0186 this shaft carries between its rolled fillets. This entry ended "it belongs to whoever redraws that feed", and it is redrawn: the branch climbs over the bar to reach a connector that was always above it. 110 crossing pairs to zero, and 11.24 mm of surface separation at the closest station. Shaft length neither created the clash nor cured it, exactly as this entry said.',
      ],
      explode: [0.4, -0.05, 0],
    },
    'front-disconnect': {
      name: 'Front axle disconnect',
      tagline: 'Two dog clutches so the front machine, both gear stages and the whole oil pan can stop turning: the largest single lever in this module.',
      mass: 5,
      specs: [
        ['Type', 'Two dog collars, one per differential output, 48 V actuated'],
        ['Why two', 'One leaves the carrier churning; two stop everything'],
        ['Saved at cruise', 'About 780 W at 100 km/h that the front axle no longer burns'],
        ['Engagement', 'About 180 ms commanded, about 40 ms with the rotor pre-spun'],
        ['Collar station', '|z| 0.2100 to 0.2800; the shaft face seats 2.50 mm in'],
        ['Maturity', 'Production practice'],
      ],
      how: 'A permanent-magnet machine geared to the road cannot be switched off. With the wheels turning at 100 km/h the front rotor turns at about 4,640 rpm whatever the inverter does, and open-circuit core loss and windage in a machine that size come to roughly 540 W, with another 180 in the two gear stages churning oil and loading their bearings, and about 60 in the inverter keeping the bus honest. That is close to 780 W of pure parasitic draw on a car whose entire road load at that speed is about 4,700, and it is there every hour of every long drive. So the axle gets to stop. Two dog collars, one on each differential output, are pushed by 48 V actuators fed from hv-4\'s dual by-wire feeds, and when they open the halfshafts turn with the wheels while the differential carrier, both gear stages, the rotor and every liter of oil in the oil pan go still. Production cars that do this use one clutch and accept the carrier still turning in its bath, because the second clutch costs money. Cost is not an argument on this project, and the second collar deletes the last of the churning.\n\nThe reconnect is the engineering. There is no synchronizer, so the collars can only engage when the speeds already match, which in a car with an electric motor is easier than in a car with a gearbox: the machine spins its own rotor and both gear stages up to synchronous speed using its resolver against the wheel speed sensors, and it has 240 Nm to do it with against roughly 0.07 kg m2 of inertia reflected to the rotor, so 486 rad/s arrives in about 140 ms. Add collar travel and the commanded reconnect is about 180 ms. That is far too slow to be a reaction, which is why the coordinator on the neighboring panel reconnects on prediction and keeps the rotor pre-spun whenever the situation is even slightly interesting, cutting the actual engagement to about 40 ms. On the mixed cycle the efficiency model uses, the disconnect plus the corner work moves battery-to-wheel efficiency from 0.945 to about 0.958, roughly 1.2% of range or near 20 miles; at a steady 100 km/h, which is what a record attempt actually looks like, the same hardware is worth about 16 Wh per mile. The smaller number is the one this module leads with.\n\nNothing in this part moved for Gen 9 and that is the point of it. When the front track came in 70 mm per side, the halfshaft had to be re-solved between two faces, and this collar is the one that does not get a vote: it spans |z| 0.2100 to 0.2800 on the built mesh, its inboard end overlaps the right-hand output shaft which ends at 0.2200 and the gear case drum which ends at 0.2150, and its outboard end is where the halfshaft\'s inboard joint face seats, 2.50 mm in. Move that face to share the shortening between both ends and the collar has nothing to grip, so the whole 70 mm comes off the outboard end and the bar\'s inboard end stays at |z| 0.3200 exactly where drivetrain-7 left it. A dog clutch is the least forgiving thing on this axle about axial position, which is why it is the datum rather than the variable.',
      why: 'Gen 1 got this right by accident and Gen 3 lost it by inattention. An induction front axle costs nothing when idle, which drivetrain-2 said in one sentence and then the ladder forgot for four generations while permanent magnets took over the front. The disconnect buys the property back without giving up the regeneration efficiency that makes a magnet machine the right choice for the axle that catches most of the braking. It is 5 kg that removes 780 W, against 17 kg of mass taken out elsewhere when this module was drivetrain-7 and a further 0.42 kg of halfshaft bar at Gen 9, which on js/efficiency.js\'s own cycle is 0.48 Wh per km of rolling and stop-go and works out at about 10 miles. The module\'s net against drivetrain-6 is the 12.42 kg between them. The comparison is the lesson: on a car this slippery, fixed losses matter far more than mass, and any range work that starts with a diet is starting in the wrong place.',
      fail: [
        'A dog clutch cannot slip, so it either engages or it does not, and a mis-timed engagement is a shock load into the gear teeth rather than a slur. The speed-match window is tight by design and the failure of the window is a tooth, not a noise.',
        'Two clutches is two failure sites for the same function, and they are not redundant with each other: one stuck closed leaves the axle permanently connected and quietly deletes the entire saving, one stuck open with the other closed puts all front torque through one halfshaft into an open differential, which is a torque steer event on a wet road.',
        'Every open and close is a wear cycle on the collar dog faces, and a car that reconnects on prediction will cycle far more often than a car that reconnects on demand. The dog geometry is sized for the predicted cycle count, and that count is a model output, not a measurement, until a fleet has run.',
      ],
      explode: [-0.1, -0.42, 0],
    },
    'front-inverter': {
      name: 'Front GaN inverter',
      tagline: 'Half the current through a cable sized for three times it: the carried harness is now the heaviest thing on this axle nobody needs.',
      mass: 3,
      specs: [
        ['Topology', 'Three-level flying capacitor, 650 V GaN (carried)'],
        ['Rating', '130 kW; about 200 A phase peak (Gen 5: 333 A)'],
        ['DC link', 'Ceramic stack, 16 uF, in the cast pocket'],
        ['Idle draw', 'Zero: the clutches open before the gates do'],
        ['DC landing', '(1.30, 0.402, 0.015), hv-4\'s tunnel run end exactly'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'One power-electronics family in two homes is a Gen 1 idea in its third silicon generation: the corner and the pocket share dies, gate drivers, balancing logic and one qualification file, and the flying-capacitor bridge that lets 650 V GaN serve an 810 V nominal bus is the same argument in both places. Halving the axle rating halves the current and lets the DC link fall from 30 to 16 uF of stacked ceramic. The genuinely new behavior is that this inverter is allowed to be completely off. In drivetrain-6 the front machine was the daily machine, so its inverter held the bus and modulated on every kilometer; here the disconnect opens first and the gates stop second, so the inverter is not idling into a spinning magnet field, it is dark next to a stationary one. That ordering matters: opening the clutch while the inverter still commands current would leave torque going nowhere, and closing it while the gates are off would let the machine be back-driven into an uncontrolled rectifier.\n\nThe reconciliation paragraph is the uncomfortable one. hv-4 is carried unchanged from Gen 4, and its front run is 3.1 m of 50 mm2 copper sized against Gen 3\'s 531 A at 508 V. At the 810 V nominal string battery-6 set and battery-7 carries unchanged, 210 series layers over a 630 to 861 V window, drivetrain-6\'s 270 kW peaked at 333 A and the run was already generous. At this axle\'s 130 kW the run peaks near 160 A, about 27% of its 600 A thirty-second rating, and roughly 1.7 kg of that copper pair now has no job at all. On a generation whose entire mass ledger is being scrutinized for miles, 1.7 kg of dead conductor is worth about a mile of range, and it stays, because hv-4 is not this generation\'s to edit. The panel names the number rather than pretending a carry-over is free. One thing was fixed at Gen 7 and is re-verified here rather than assumed: this module\'s DC feed terminates at (1.30, 0.402, 0.015), which is where hv-4\'s front tunnel run ends, and drivetrain-6 landed the same feed 21 mm off. The proof of it used to be that hv-4\'s run was a bare tube of radius 0.0140 and its nearest vertex to that point sat at exactly 14.00 mm, the radius, so the point had to be on the centerline end. That proof has expired rather than failed: hv-4 is being detailed in parallel and its run now carries real hardware at the same station, so the nearest hv-4 vertex to this landing is 4.6 mm rather than 14.00. The landing coordinate is unchanged and it is the coordinate that is the contract. What the arithmetic-from-a-radius shows is that a proof which depends on a partner being a primitive stops working the day the partner stops being one.',
      why: 'Retiring the hardest qualification in the family into the easiest seat was drivetrain-6\'s good idea and it carries. What Gen 7 adds is the discipline of naming what the carried architecture costs: a harness sized for a car that no longer exists is 1.7 kg of copper traveling 1,800 miles to do nothing, and a generation that claims miles from a 12 kg drivetrain diet has to be willing to count that in the other direction.',
      fail: [
        '650 V GaN at the 431 V a die sees at an 861 V ceiling is 66% of rating, and GaN\'s neutron burnout dataset is still a decade younger than SiC\'s; the fleet failure model carries wider error bars and says so, unchanged from Gen 5.',
        'An inverter that spends most of its life dark thermal-cycles differently from one that runs warm all day, and the ceramic link now sees deeper, less frequent excursions rather than shallow constant ones. Cracked ceramic is an open rather than a short, so the failure is a ripple alarm and a limp, which is the designed order.',
        'The whole front axle is now a sequenced system, clutches then gates on the way out and gates then clutches on the way in, and a sequencing fault is a new failure class that neither the inverter nor the clutch owns alone. It lives with the coordinator, which is where the fault injection cases were written.',
      ],
      explode: [0.45, 0.4, 0],
    },
  },
};

/* ── Geometry ── */

const RX = P.axleR;             // -1.45, rear axle x
const WY = P.wheelY;            // 0.355, wheel center height
/* Rear wheel center |z|, set at Gen 7 and unchanged. P.wheelZ is still
   0.81 and MUST STAY 0.81: eight modules read it, including body-8's
   fairing wall, and editing it to 0.74 would silently move every earlier
   generation's wheels. wheels-9 narrows the FRONT axle with its own local
   FRONTZ for exactly that reason, so at Gen 9 both tracks are 1.48 m and
   neither of them comes from P.wheelZ. The front geometry in this file
   reads 0.74 through the two measured hub faces below, never through P. */
const REAR_Z = 0.72;            // Gen 17: the rear wheel center, 20 mm inboard (was 0.74 from Gen 7)
const RING_Z = 0.67;            // motor annulus center plane, |z| 0.63..0.71 (Gen 17; was 0.69)
const FLANGE_Z = 0.63;          // contract flange face, |z| (Gen 17; was 0.65)

/* Front unit axes, carried from drivetrain-2's installation through Gen 3
   and Gen 5. The machine shrank; the axes did not move. */
const A7 = [1.48, 0.40];        // motor disc axis
const B7 = [1.505, 0.458];      // intermediate axis
const C7 = [1.45, P.wheelY];    // ring gear / halfshaft axis
const GZ7 = -0.16;              // gear case center plane, z

/* Cylinder with its axis along z instead of y. */
function zc(mesh) { mesh.rotation.x = Math.PI / 2; return mesh; }

/* ── Local crispness vocabulary ──────────────────────────────────────────

   Everything this module draws is coaxial with a z axis. The rear machines
   sit on the rear axle line, and every front housing, joint, collar and
   shaft is drawn through zc(). So the one primitive worth having here is a
   surface of revolution about z, and once it exists most of the module's
   soft primitives collapse into it: an annulus, a chamfered ring, a
   machined shoulder, a fork groove, a lamination stack and a bellows boot
   are all one profile each.

   IT IS ALSO CHEAPER THAN WHAT IT REPLACES. The old ringMesh built an
   annulus with ExtrudeGeometry, which fans both end caps through
   triangulateShape and spends 712 triangles on a 44 segment ring. zrev
   builds the same surface from quad strips: 2*N*seg for an N point profile,
   so a plain rectangle is 8*seg, 352 at seg 44, and every chamfer,
   shoulder or relief costs 2*seg more. A 44 segment ring with all four
   circular edges chamfered is 704, which is what the extrude was already
   spending on four edges that had no chamfer at all. Same triangles, four
   edges that break light instead of four that do not.

   Profiles are closed loops of [radius, z] in the local frame. Winding is
   derived from the loop's own signed area rather than hand-ordered, so a
   profile written in either direction still faces outward and creases
   where it should. */
function zrev(profile, mat, seg = 32, o = {}) {
  const N = profile.length;
  let A2 = 0;
  for (let i = 0; i < N; i++) {
    const a = profile[i], b = profile[(i + 1) % N];
    A2 += a[1] * b[0] - b[1] * a[0];
  }
  const arc = [0];
  for (let i = 1; i < N; i++) {
    arc.push(arc[i - 1] + Math.hypot(profile[i][0] - profile[i - 1][0],
                                     profile[i][1] - profile[i - 1][1]));
  }
  const arcLen = arc[N - 1] + Math.hypot(profile[0][0] - profile[N - 1][0],
                                         profile[0][1] - profile[N - 1][1]);
  const W = seg + 1;
  const pos = new Float32Array(N * W * 3);
  const uv = new Float32Array(N * W * 2);
  for (let i = 0; i < N; i++) {
    const r = profile[i][0], z = profile[i][1];
    for (let j = 0; j < W; j++) {
      const ang = (j / seg) * Math.PI * 2;
      const k = i * W + j;
      pos[k * 3] = Math.cos(ang) * r;
      pos[k * 3 + 1] = Math.sin(ang) * r;
      pos[k * 3 + 2] = z;
      /* NORMALIZED UVs, 0 to 1, not the meter-scale ones _arcUV uses.
         That looks like the wrong call against the note in common.js and it
         is not, because the note is about PAINT: TEX.paintFlakeNormal tiles
         40 times and paintPeelNormal 50, so in meters they land on 25 mm and
         20 mm, which is flake and peel scale. Every material a mechanical
         part in this module wears is cast or brushed grain at repeat 4 to 6,
         which in meters tiles every 170 to 250 mm. Rendered, a housing came
         out covered in 20 mm blisters while the lib.cyl beside it, whose UVs
         are 0 to 1, looked machined. Matching the primitives is what keeps a
         part that used to be a cylinder looking like the same part. */
      uv[k * 2] = j / seg;
      uv[k * 2 + 1] = arcLen > 0 ? arc[i] / arcLen : 0;
    }
  }
  const idx = [];
  const cw = A2 < 0;
  for (let i = 0; i < N; i++) {
    const i2 = (i + 1) % N;
    for (let j = 0; j < seg; j++) {
      const a0 = i * W + j, a1 = a0 + 1, b0 = i2 * W + j, b1 = b0 + 1;
      if (cw) idx.push(a0, b1, b0, a0, a1, b1);
      else idx.push(a0, b0, b1, a0, b1, a1);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return lib.crease(lib.mesh(geo, mat), o.crease != null ? o.crease : 30);
}

/* Chamfered annulus about z, centered on its own origin: the drop-in
   replacement for the old ringMesh. `edges` names which of the four
   circular edges carry the chamfer, in the order outer-plus, outer-minus,
   inner-plus, inner-minus, so a ring buried in a bore only pays for the
   edges anybody can see. A chamfer only ever removes material, which is why
   a ring on a contract radius can carry one. */
function ring(rOut, rIn, depth, mat, seg = 32, c = 0, edges = '1111') {
  const h = depth / 2;
  const cc = Math.min(c, (rOut - rIn) * 0.4, depth * 0.4);
  const p = [];
  if (cc > 0 && edges[1] === '1') { p.push([rOut - cc, -h], [rOut, -h + cc]); }
  else p.push([rOut, -h]);
  if (cc > 0 && edges[0] === '1') { p.push([rOut, h - cc], [rOut - cc, h]); }
  else p.push([rOut, h]);
  if (cc > 0 && edges[2] === '1') { p.push([rIn + cc, h], [rIn, h - cc]); }
  else p.push([rIn, h]);
  if (cc > 0 && edges[3] === '1') { p.push([rIn, -h + cc], [rIn + cc, -h]); }
  else p.push([rIn, -h]);
  return zrev(p, mat, seg, { crease: 24 });
}

/* Seat a lib.fastener on a face. lib.fastener grows along +Y with its
   seating face on y = 0, and the note in common.js is there because three
   of the first four banks on this car were placed inside the part they
   fixed. `dir` is the outward normal of the face being bolted, so the
   caller states the face rather than guessing an offset:
     '+z' / '-z'   an axial face
     a number      radians: a radial face, head pointing out along that
                   bearing in the local xy plane. */
function seat(f, x, y, z, dir) {
  if (dir === '+z') f.rotation.x = Math.PI / 2;
  else if (dir === '-z') f.rotation.x = -Math.PI / 2;
  else if (dir === '+y') { /* already */ }
  else if (dir === '-y') f.rotation.x = Math.PI;
  else f.rotation.z = dir - Math.PI / 2;
  f.position.set(x, y, z);
  return f;
}

/* A bank of n fasteners on a bolt circle of radius r about (cx, cy),
   seated on the axial face at z and growing along `dir`. */
function boltRing(n, r, size, mat, cx, cy, z, dir, phase = 0, type = 'hex') {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + phase;
    g.add(seat(lib.fastener(size, mat, type, { clock: a }),
               cx + Math.cos(a) * r, cy + Math.sin(a) * r, z, dir));
  }
  return g;
}

/* One halfshaft, centered on its own origin so lib.spin works.
   Local +z points outboard. Same joints, same boots, same forgings as
   Gen 1 through Gen 8. THE BAR IS 70 MM SHORTER AND THAT IS THE WHOLE
   GEOMETRIC CHANGE IN THIS MODULE.

   Both numbers below are solved from two fixed world faces rather than
   chosen, and both faces were swept off built meshes:
     outboard  |z| 0.6925, wheels-9's front hub face inboard plane. Its
               built front-wheel meshes reach |z| 0.6925 at every radius
               band from r 0.040 to r 0.150 about the front axle line, and
               its disc bell lands on the same plane at r <= 0.080.
     inboard   |z| 0.2775, unchanged, because the front disconnect's dog
               collar spans |z| 0.2100 to 0.2800 and the joint face seats
               2.5 mm inside its outboard end. Move this face and the
               collar has nothing to grip.
   Half-span is therefore (0.6925 - 0.2775) / 2 = 0.2075, the pair center
   is (0.6925 + 0.2775) / 2 = 0.4850, and with a 55 mm joint the joint
   center offset is 0.2075 - 0.0275 = 0.1800, against drivetrain-7's
   0.2150. Each joint center comes in 35 mm, so the bar loses 70 mm and
   the boot centers come in 35 mm with their joints. Every overlap the
   drawing had is preserved exactly: the bar still runs 12.5 mm into each
   joint bore and each boot lip still laps its joint by 2.5 mm. */
function halfshaft(out) {
  const g = new THREE.Group();

  /* The bar is a forged shaft, not a length of round stock: it necks down
     between two rolled fillet radii and carries a spline shoulder at each
     end where it enters the joint bore. Envelope unchanged, r 0.022 over
     |z| 0.165, because the bar's own radius is the 22 mm structural section
     the mass ledger on the front-unit panel is computed from. */
  g.add(zrev([
    [0.0220, -0.1550], [0.0220, -0.1460], [0.0186, -0.1370],
    [0.0186, 0.1370], [0.0220, 0.1460], [0.0220, 0.1550],
    [0.0000, 0.1550], [0.0000, -0.1550],
  ], M.steel, 14, { crease: 26 }));

  for (const s of [-1, 1]) {
    /* THE JOINT IS A BELL, NOT A DRUM. A constant-velocity outer race is a
       machined bell: a body turned to the ball tracks, a boot land cut into
       a groove behind it, and a face at each end. Both joints keep the
       drawn 55 mm length and the drawn r 0.036 body, because the front-unit
       panel solves the shaft from the two joint FACES: the outboard one at
       local |z| 0.2075, which with the pair centered on |z| 0.4850 lands on
       0.6925, wheels-9's hub face and the plane SYSTEM.interfaces declares
       with extent 'max'; and the inboard one at local -0.2075, which is
       |z| 0.2775 and seats 2.50 mm inside the dog collar. Nothing here
       passes either.

       Outboard is the fixed joint and inboard is the plunging one, so they
       are no longer the same drum drawn twice: the plunge housing is a
       straight-walled tulip with a snap-ring groove and a closed nose, the
       fixed joint is a bell that swells to its ball track. */
    const fixed = s === out;
    const bell = fixed ? zrev([
      [0.0225, s * 0.1425], [0.0320, s * 0.1425], [0.0320, s * 0.1480],
      [0.0292, s * 0.1492], [0.0292, s * 0.1552], [0.0330, s * 0.1600],
      [0.0360, s * 0.1700], [0.0360, s * 0.1830], [0.0344, s * 0.1875],
      [0.0225, s * 0.1875],
    ], M.darkSteel, 16, { crease: 30 }) : zrev([
      [0.0225, s * 0.1425], [0.0320, s * 0.1425], [0.0320, s * 0.1485],
      [0.0292, s * 0.1497], [0.0292, s * 0.1557], [0.0345, s * 0.1605],
      [0.0360, s * 0.1655], [0.0360, s * 0.1785], [0.0338, s * 0.1785],
      [0.0338, s * 0.1835], [0.0360, s * 0.1835], [0.0360, s * 0.1945],
      [0.0340, s * 0.1975], [0.0225, s * 0.1975],
    ], M.darkSteel, 16, { crease: 30 });
    g.add(bell);

    /* THE BOOT IS A BELLOWS. A plain cone has one silhouette and no shadow
       line anywhere on it; a convoluted boot has five, and it is the one
       part of a driveshaft a person can name on sight.

       The envelope is held to the millimeter and that is deliberate. This
       boot runs |z| 0.5700 to 0.6400 and presents its full r 0.042 there,
       which used to be 13.0 mm inside suspension-9's solid upright body.
       suspension-9 now bores that body, r 0.052 opening to 0.0575, so the
       boot passes through the bearing instead of into it and the 13.0 mm
       is gone. The envelope still does not move, because the bore was
       sized against THIS radius: the four crests step 0.0412, 0.0402,
       0.0392 and 0.0378 from the big end, the big end stays where it was,
       and swept on the built mesh the skin holds max r 0.0412 and the two
       clamps 0.0420. Grow any of them and the bore has to grow with them.

       REPORTED, NOT EDITED, and it is a real one: the taper runs the wrong
       way. On a fixed outboard Rzeppa the boot's LARGE end clamps the outer
       race and the small end clamps the bar, and both boots on this shaft
       do the opposite, big end inboard on the bar and small end lapping the
       joint. Turning them round is the correct drawing and it would move
       the full radius off |z| 0.570..0.583. What that buys is no longer the
       13.0 mm, which is closed, but the tightest clearance left at this
       corner, 3.28 mm from this boot to the knuckle's steering arm. It is a
       seventeen point profile and two clamp radii to reverse against an
       already positive clearance, so it is named here and left alone. */
    g.add(zrev([
      [0.0235, s * 0.0850], [0.0412, s * 0.0862], [0.0412, s * 0.0906],
      [0.0338, s * 0.0968], [0.0402, s * 0.1030], [0.0402, s * 0.1074],
      [0.0332, s * 0.1136], [0.0392, s * 0.1198], [0.0392, s * 0.1242],
      [0.0328, s * 0.1304], [0.0378, s * 0.1366], [0.0378, s * 0.1410],
      [0.0352, s * 0.1470], [0.0352, s * 0.1450], [0.0322, s * 0.1450],
      [0.0322, s * 0.1480], [0.0235, s * 0.1462],
    ], M.rubber, 16, { crease: 34 }));

    /* Two banded clamps, and they are not decoration: the small one is what
       makes the sleeve read as lapping the joint's boot land rather than
       ending in mid air, and the large one is what makes a black shape read
       as rubber rather than plastic. */
    for (const [cr, cz, cw] of [[0.0420, 0.0887, 0.0021], [0.0362, 0.1513, 0.0023]]) {
      g.add(zrev([
        [cr - 0.0026, s * (cz - cw)], [cr, s * (cz - cw + 0.0007)],
        [cr, s * (cz + cw - 0.0007)], [cr - 0.0026, s * (cz + cw)],
      ], M.steel, 16, { crease: 26 }));
    }
  }

  /* OUTBOARD BOLTED FLANGE, which is what a halfshaft actually meets a hub
     with, and which this shaft has never had: the drive face was the flat
     end cap of a 72 mm cylinder.

     The holes are REAL HOLES and that is the whole reason this one mesh is
     an extrude rather than another profile of revolution. Heads are not an
     option at this station and it is worth saying why once: on the outboard
     side any head passes |z| 0.6925, which is the plane
     SYSTEM.interfaces declares with extent 'max' and the thing this module
     exists to stop overrunning; on the inboard side any head lands inside
     suspension-9's r 0.054 hub carrier. A flange drilled through, with the
     bolts belonging to the hub it lands on, is both the correct assembly
     and the only one that fits.

     Flange OD 0.052 is inboard of that carrier bore, and the flange's
     outboard face is ON local 0.2075, so the declared plane is now realized
     by a 104 mm face with a 86 mm bolt circle rather than by a shaft end. */
  const fs = new THREE.Shape();
  fs.absarc(0, 0, 0.0520, 0, Math.PI * 2, false);
  for (const [hr, hR, hn, ph] of [[0, 0.0225, 1, 0], [0.0430, 0.0060, 6, Math.PI / 6]]) {
    for (let i = 0; i < hn; i++) {
      const a = (i / hn) * Math.PI * 2 + ph;
      const p = new THREE.Path();
      p.absarc(Math.cos(a) * hr, Math.sin(a) * hr, hR, 0, Math.PI * 2, true);
      fs.holes.push(p);
    }
  }
  const fgeo = new THREE.ExtrudeGeometry(fs, { depth: 0.0100, bevelEnabled: false, curveSegments: 8 });
  fgeo.translate(0, 0, out * 0.1875 - (out > 0 ? 0 : 0.0100));   /* Gen 17: the 10 mm flange's outboard face on local 0.1975, world 0.6725 */
  g.add(lib.crease(lib.mesh(fgeo, M.steel), 28));

  return g;
}

/* Rotor ring: canned 32-pole Halbach array on an aluminum hoop, bolted to
   the wheels-9 rim flange at the |z| 0.65 contract plane. Lives entirely
   inside the annulus (r 0.155..0.235, |z| 0.65..0.73).

   Defect corrected from drivetrain-6: its rotor flange inboard face sat at
   |z| 0.722 against a 0.720 contract plane, a 2 mm standoff. Here the
   flange is 8 mm thick at local z -0.036 from a ring center of 0.69, so its
   inboard face lands on |z| 0.650 exactly. */
function rotorRingPart(s) {
  const part = lib.part('rotor-rings', [0, 0, s * 0.90]);
  const spinG = new THREE.Group();

  /* structural hoop, r 0.2070..0.2160, |z| 0.658..0.728. Aluminum because
     a Halbach array self-closes its flux and needs no back iron, and a
     non-magnetic hoop keeps the outer face field near zero.

     It is now a turned hoop rather than an extruded tube: both outer edges
     carry a 1.2 mm chamfer, and a 2 mm balance relief is machined into the
     OD at mid-stack, which is where a rotor of this diameter gets its trim
     material removed. Envelope unchanged, because a chamfer and a relief
     can only take material away from r 0.2160 and |z| 0.658..0.728. */
  const hoop = zrev([
    [0.2148, -0.0350], [0.2160, -0.0338], [0.2160, -0.0110],
    [0.2140, -0.0080], [0.2140, 0.0080], [0.2160, 0.0110],
    [0.2160, 0.0338], [0.2148, 0.0350],
    [0.2070, 0.0350], [0.2070, -0.0350],
  ], M.alu, 34, { crease: 26 });
  hoop.position.z = s * 0.003;
  spinG.add(hoop);

  /* 32 poles, 8 mm radial (Gen 5: 20 poles, 12 mm), r 0.199..0.207 */
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    const mag = lib.box(0.008, 0.034, 0.060, M.cell);
    mag.position.set(Math.cos(a) * 0.2030, Math.sin(a) * 0.2030, s * 0.003);
    mag.rotation.z = a;
    spinG.add(mag);
  }

  /* hermetic stainless can over the pole faces, riding the airgap side.
     Tooth tips end at r 0.196, slot wedges at 0.1972, can at 0.1982:
     1.0 mm of mechanical clearance, carried from Gen 5. A canned pole is
     inspected like a pressure part, so the can is drawn like one: a 0.8 mm
     cylinder closed at each end by a weld lip turned back onto the hoop
     bore. The lips are what make it a sealed can rather than a sleeve. */
  const can = zrev([
    [0.1982, -0.0324], [0.1982, 0.0324], [0.2070, 0.0324],
    [0.2070, 0.0300], [0.1990, 0.0300], [0.1990, -0.0300],
    [0.2070, -0.0300], [0.2070, -0.0324],
  ], M.alu, 40, { crease: 28 });
  can.position.z = s * 0.003;
  spinG.add(can);

  /* rotor flange: inboard face ON the contract plane at |z| 0.650, and the
     face is machined rather than as-cast, so it gets a spigot step at
     r 0.188..0.196 that pilots the wheels-9 rim flange bore and a chamfer
     on the OD. Neither feature adds material: the flange still measures
     r 0.233 and |z| 0.650..0.658, both inside the annulus contract. */
  const flange = zrev([
    [0.2318, s * -0.0040], [0.2330, s * -0.0028], [0.2330, s * 0.0028],
    [0.2318, s * 0.0040], [0.1980, s * 0.0040], [0.1980, s * 0.0014],
    [0.1880, s * 0.0014], [0.1880, s * -0.0034], [0.1892, s * -0.0040],
  ], M.alu, 34, { crease: 24 });
  flange.position.z = -s * 0.036;
  spinG.add(flange);

  /* TWELVE TITANIUM BOLTS, and they were floating. lib.bolts drew twelve
     6-sided stubs on a circle with no reference to any face, and the caller
     put them at local -0.0253 while the flange's outboard face is at
     -0.0320: the whole bank stood 4.0 mm off the flange it was holding, at
     a radius where the hoop bore is not there to hide it either. Measured
     off the built mesh rather than off the constant, the seating face is
     |z| 0.6580, and lib.fastener puts its own seating face on y = 0 so the
     caller states that plane once and the head grows out of it. */
  spinG.add(boltRing(12, 0.2240, 0.0050, M.steel, 0, 0, s * -0.0320, s > 0 ? '+z' : '-z'));

  spinG.position.set(RX, WY, s * RING_Z);
  lib.spin(spinG, 'z', 30);
  part.add(spinG);
  return part;
}

/* Stator ring: 7 mm laminated yoke, 36 outward-facing potted coils on 36
   teeth, magnetic slot wedges, water jacket between the yoke bore and the
   carrier sleeve, phase terminals on the inboard end face.

   Defect corrected from drivetrain-6: its phase leads sat 30 mm inboard of
   the flange plane, static geometry crossing the joint it is contracted to
   stop at. Everything structural here stops at the terminal land, whose
   inboard face stands on |z| 0.6515, 1.5 mm off the contract plane so that
   a static face is not bearing on a rotating one. The only thing that
   continues inboard is the purge feed, which threads the BORE of the
   wheels-9 rim flange. That flange measures r 0.1500..0.2440 over
   |z| 0.6460..0.6500 on wheels-9's BUILT mesh, unchanged from wheels-7
   because wheels-9 carries the rear wheel whole, so the crossing corridor is
   the 0.150 bore, and this tube's swept surface holds r <= 0.1459 through
   |z| 0.6455..0.6500 and 0.1477 at the plane itself, re-swept after the
   crispness pass resampled it. */
function statorRingPart(s) {
  const part = lib.part('stator-rings', [0, 0, s * 0.90]);
  const g = new THREE.Group();
  g.position.set(RX, WY, s * RING_Z);

  /* THE YOKE IS A STACK, NOT A TUBE. r 0.174..0.181 over |z| 0.655..0.725,
     seven millimeters of it because 32 poles carry a third less flux each
     than Gen 5's 20 did. Every one of those numbers is drivetrain-7's and
     none of them move here. What moves is that the ring stops pretending to
     be one turned part.

     A 0.10 mm lamination stack 64 mm long is 640 sheets, and what you can
     actually see of that on a real machine is three things: two clamp
     plates squeezing the ends, the stack standing 2 mm proud-of-nothing
     between them, and the radial vent ducts that break the stack into
     blocks so coolant can cross it. All three are in this one profile.
     The clamp plates run r 0.1755..0.1830 over the outer 3 mm at each end,
     which puts them axially clear of the teeth (|z| local 0.030) and
     radially clear of the rotor flange (r 0.188), and the two vent reliefs
     cut the OD back 2.5 mm at local |z| 0.0102..0.0126. Nothing added
     leaves |z| 0.655..0.725, so the annulus contract is untouched.

     THE CLAMP BORE IS 0.1755, NOT THE 0.1715 THE FIRST DRAFT CUT, and the
     4 mm is the phase studs' doing rather than the stack's. Drawn at 0.1715
     these plates reach 2.5 mm inside the yoke bore at exactly the station
     the inboard terminal land and its three studs occupy, and on the 26
     sided mesh this profile actually builds that puts their flats at
     0.17025, inside the studs. A clamp plate grips the stack from outside,
     so relieving its bore takes nothing away from what it is for, and
     0.1755 leaves the relocated studs at r <= 0.1725 a clear 1.7 mm. */
  g.add(zrev([
    [0.1755, -0.0350], [0.1830, -0.0350], [0.1830, -0.0320], [0.1810, -0.0320],
    [0.1810, -0.0150], [0.1785, -0.0126], [0.1785, -0.0102], [0.1810, -0.0078],
    [0.1810, 0.0078], [0.1785, 0.0102], [0.1785, 0.0126], [0.1810, 0.0150],
    [0.1810, 0.0320], [0.1830, 0.0320], [0.1830, 0.0350], [0.1755, 0.0350],
    [0.1755, 0.0320], [0.1740, 0.0320], [0.1740, -0.0320], [0.1755, -0.0320],
  ], M.steel, 26, { crease: 24 }));

  /* A TOOTH HAS A SHOE. The old one was a single 15 by 13 mm block, which
     is a tooth with no tip flare, no slot mouth and no reason for the wedge
     band above it to exist. Real teeth flare tangentially at the tip so the
     slot mouth is narrow and the airgap flux is spread: 28 mm of shoe on a
     33.9 mm pole pitch leaves a 5.9 mm slot opening, which is the opening
     the magnetic wedges then close. The coil sits on the 11 mm stem and the
     shoe overhangs it, so the slot reads as a slot. */
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const x = Math.cos(a), y = Math.sin(a);
    const stem = lib.box(0.011, 0.013, 0.060, M.steel);
    stem.position.set(x * 0.1865, y * 0.1865, 0);
    stem.rotation.z = a;
    g.add(stem);
    const shoe = lib.box(0.004, 0.028, 0.060, M.steel);
    shoe.position.set(x * 0.1940, y * 0.1940, 0);
    shoe.rotation.z = a;
    g.add(shoe);
    const coil = lib.box(0.011, 0.026, 0.048, M.copper);
    coil.position.set(x * 0.1865, y * 0.1865, 0);
    coil.rotation.z = a;
    g.add(coil);

    /* END TURNS, and only on the outboard end. A concentrated winding
       bulges past the stack at both ends of a machine that has room at both
       ends, and this one does not: inboard of |z| 0.658 the volume at
       r 0.188 and up belongs to the rotor flange, which turns. So the
       winding is formed flat on the inboard face and crowned on the
       outboard one, which is a real answer to a real packaging asymmetry
       rather than a symmetry drawn for its own sake. The crowns run
       r 0.1835..0.1925 over |z| 0.7150..0.7290, clear of the clamp plate at
       0.1830 and 1.0 mm inside the annulus wall at 0.730. */
    const crown = lib.box(0.009, 0.026, 0.014, M.copper);
    crown.position.set(x * 0.1880, y * 0.1880, s * 0.0320);
    crown.rotation.z = a;
    g.add(crown);
  }

  /* magnetic slot wedges: the band that closes the slot openings so the
     rotor stops paying eddy loss for the stator's teeth. A 1.2 mm band
     needs no chamfer on edges nothing can reach, so it is the cheap form of
     the ring, 320 triangles against the extrude's 712. */
  g.add(ring(0.1972, 0.1960, 0.060, M.plasticLt, 32));

  /* Potting and end turns as two bands. The outboard one ties the 36 crowns
     into one resin-filled end winding at r 0.1835..0.1945 over |z| 0.7180
     to 0.7290. The inboard one is the flat fill, and it MOVED: at the
     shipped local 0.031 it ran r 0.1825..0.1925 over |z| 0.6540..0.6640 and
     took 4.5 mm of the rotor flange, which spans r 0.188..0.233 over
     0.650..0.658. That is a static part inside a rotating one and it was
     nobody's finding because nothing swept the two rings against each
     other. At local 0.0255 the band lands on |z| 0.6597 against a flange
     that reaches 0.6580, so it clears in |z| by 1.7 mm and, because the
     flange steps back to a r 0.188..0.198 spigot inboard of that, by
     4.34 mm surface to surface on the built meshes. */
  g.add((() => { const t = lib.torus(0.1890, 0.0055, M.plasticLt, 30, 5); t.position.z = s * 0.0335; return t; })());
  g.add((() => { const t = lib.torus(0.1875, 0.0050, M.plasticLt, 30, 5); t.position.z = -s * 0.0255; return t; })());

  /* water jacket in the gap between the carrier sleeve OD (0.168) and the
     yoke bore (0.174), so nothing cooling-related dips under r 0.155.
     Pulled in to local 0.014 to leave the outboard half of that gap to the
     resolver ring below. */
  for (const e of [-1, 1]) {
    const jac = lib.torus(0.1712, 0.0032, M.coolant, 20, 4);
    jac.position.z = e * 0.014;
    g.add(jac);
  }

  /* Coolant stubs stay wholly inside the annulus at |z| 0.656..0.680, where
     wheels-9 owns only the drum at r <= 0.094 and the rim at r >= 0.254.
     The run onward to thermal-7 passes behind the upright and is implied,
     the house pattern since Gen 3. Each stub is now a turned port rather
     than a plain pin: a spigot, an O-ring land and a hose barb, which is
     the shape that says which end a pipe goes on. */
  for (const [da, mat] of [[-0.35, M.coolant], [0.35, M.coolantHot]]) {
    const a = Math.PI * 1.5 + da;
    const stub = zrev([
      [0.0000, -s * 0.0120], [0.0080, -s * 0.0120], [0.0080, -s * 0.0020],
      [0.0092, -s * 0.0004], [0.0092, s * 0.0028], [0.0080, s * 0.0044],
      [0.0080, s * 0.0092], [0.0094, s * 0.0100], [0.0070, s * 0.0120],
      [0.0000, s * 0.0120],
    ], mat, 9, { crease: 30 });
    stub.position.set(Math.cos(a) * 0.1712, Math.sin(a) * 0.1712, -s * 0.022);
    g.add(stub);
  }

  /* THE RESOLVER, which a 32-pole machine cannot be commutated without and
     which this stator has never carried at all. Thirty-two poles means the
     controller needs the rotor angle to a fraction of a 11.25 degree
     electrical cycle, and there was no part on this ring that could give it
     one.

     Where it goes is not a free choice, and the sweep is what picked it.
     At |z| 0.657 and outboard the radial band is fully committed: the
     carrier sleeve owns r 0.1555..0.168, the water jacket the 6 mm above
     that, and the yoke 0.174..0.181. Inboard of 0.657 there is one pocket,
     r 0.156..0.163 over |z| 0.6505..0.6570, between the hub carrier step at
     r 0.156 and the phase terminal land at 0.163. So the resolver stator is
     a 5 mm ring in that pocket, bolted face to face against the carrier
     sleeve's inboard end at |z| 0.657, which is a static part landing on a
     static part, and 2.0 mm above the annulus floor at r 0.1555. */
  const rez = ring(0.1625, 0.1575, 0.0050, M.sensor, 20, 0.0008, '1010');
  rez.position.z = -s * 0.0355;
  g.add(rez);

  /* Its lead runs with the phase set rather than on a route of its own,
     which is what a real corner does with a signal pair that has to survive
     the same 40 g and the same wash as the phases. It threads the wheels-9
     rim flange bore, and it ends on a connector at the inverter board rather
     than in mid air. 120 degrees keeps it off the three busbars at 75 to
     105, the purge feed at 55 and the coolant ports at 250 and 290.

     The crossing radius is measured on the SWEPT SURFACE, not on the control
     points, and the first draft failed on exactly that: stations at r 0.1600
     and 0.1440 either side of the bore put the spline's own bulge at
     r 0.1548 in the |z| 0.6455 to 0.6500 band, 4.8 mm outside a 0.150 bore
     it has to pass through. Four stations, the middle two both inside the
     bore, hold the surface at r 0.1421 at the crossing. */
  const rzA = (120 / 180) * Math.PI, rzC = Math.cos(rzA), rzS = Math.sin(rzA);
  part.add(lib.tube([
    [RX + rzC * 0.1600, WY + rzS * 0.1600, s * 0.6360],
    [RX + rzC * 0.1372, WY + rzS * 0.1372, s * 0.6308],
    [RX + rzC * 0.1330, WY + rzS * 0.1330, s * 0.6240],
    [RX + rzC * 0.1395, WY + rzS * 0.1395, s * 0.6140],
  ], 0.0030, M.plastic, false, 14));

  /* phase terminal land on the inboard end face, r 0.163..0.181, spanning
     |z| 0.6515..0.6595. It stands 1.5 mm OFF the contract plane, and the
     1.5 mm is the point. At those radii the thing immediately inboard of
     the plane is wheels-9's rim flange and its co-cured titanium insert,
     r 0.150..0.244 over |z| 0.646..0.650, and that face turns with the
     wheel. A static terminal ring drawn flush on 0.650, which is what the
     first draft did, is a static face bearing on a rotating one at 780 rpm.
     Only the rotor flange is entitled to touch that plane. */
  const term = ring(0.181, 0.163, 0.008, M.plastic, 28, 0.0015, '0101');
  term.position.z = -s * 0.0345;
  g.add(term);

  /* A PHASE TERMINAL IS NOT A PIN. Three bare cylinders standing on a
     plastic ring is the one place on this machine where 810 V is drawn as
     though it were a signal, and the old ones were drawn at r 0.172 with a
     6 mm radius, which is r 0.166..0.178: through the carrier sleeve at one
     end and into the yoke bore at the other.

     The channel is sized off the BUILT walls, not off their nominal radii,
     and that distinction is the whole of the second draft. A 5.6 mm stud on
     a 0.1710 bolt circle reaches r 0.1738 against a yoke bore of 0.1740,
     which is 0.2 mm of paper clearance and none at all on the mesh: zrev
     builds that bore as a 26 sided polygon whose flats sit at 0.17273, so
     every stud stood 1.07 mm inside the yoke. No segment count fixes it,
     because a polygon's flats are always inside its nominal radius. The
     usable annulus is therefore the sleeve's OD VERTICES at 0.16800 to the
     yoke's bore FLATS at 0.17273, 4.73 mm wide about 0.17036, and the stud
     is drawn to live in it: bolt circle 0.1704, shoulder radius 0.0021, so
     r 0.1683..0.1725 with 0.30 mm to the sleeve and 0.23 mm to the yoke.
     The yoke's clamp plates carry a matching relief, 0.1715 to 0.1755,
     because at 0.1715 they closed the same channel 4 mm further inboard.

     The stud is turned rather than cut: a shoulder that lands on the
     terminal land, a shank, and a threaded tip with a landing washer under
     the busbar lug. Nothing about the three angles moves; 75, 90 and 105
     degrees is what the corner inverter's three busbars come down on, and
     they now come down on a washer face instead of onto the side of a pin. */
  for (const adeg of [75, 90, 105]) {
    const a = (adeg / 180) * Math.PI;
    const stud = zrev([
      [0.0000, -s * 0.0040], [0.0021, -s * 0.0040], [0.0021, s * 0.0032],
      [0.0015, s * 0.0040], [0.0015, s * 0.0074], [0.0021, s * 0.0082],
      [0.0021, s * 0.0095], [0.0000, s * 0.0095],
    ], M.copper, 8, { crease: 30 });
    stud.position.set(Math.cos(a) * 0.1704, Math.sin(a) * 0.1704, -s * 0.0345);
    g.add(stud);
  }

  /* dry-air purge feed: stub on the jacket, then down through the rim
     flange bore at r <= 0.1459 to the landing the service-loop bundle
     reaches. Angle 55 degrees puts it on the forward side of the corner,
     where the bundle now falls, and clear of the inverter pack at 71 to
     107 degrees and the coolant stubs at 250 and 290. */
  const pa = (55 / 180) * Math.PI, pc = Math.cos(pa), ps = Math.sin(pa);
  const pStub = zrev([
    [0.0000, -s * 0.0120], [0.0050, -s * 0.0120], [0.0050, s * 0.0058],
    [0.0062, s * 0.0068], [0.0040, s * 0.0086], [0.0040, s * 0.0120],
    [0.0000, s * 0.0120],
  ], M.plasticLt, 8, { crease: 30 });
  pStub.position.set(pc * 0.1712, ps * 0.1712, -s * 0.022);
  g.add(pStub);
  part.add(lib.tube([
    [RX + pc * 0.1712, WY + ps * 0.1712, s * 0.6520],
    [RX + pc * 0.160, WY + ps * 0.160, s * 0.6400],
    [RX + pc * 0.145, WY + ps * 0.145, s * 0.6330],
    [RX + pc * 0.134, WY + ps * 0.134, s * 0.6250],
    [RX + pc * 0.130, WY + ps * 0.130, s * 0.6180],
  ], 0.004, M.plasticLt, false, 24));

  part.add(g);
  return part;
}

/* Hub bearing unit: preloaded double-row hybrid bearing, five-spoke carrier
   web, a neck that threads the wheels-9 rim flange bore, the static stator
   sleeve, and the rotating stud flange. The Gen 3 grounding ring stays
   deleted (ceramic elements do not conduct).

   Defect corrected from drivetrain-6: its stator sleeve ran r 0.150..0.156
   and dipped 5 mm inside the r 0.155 annulus floor. Here the load path is
   explicit and every station is re-checked against wheels-9's BUILT mesh:
     spokes  r 0.068..0.144 over |z| 0.6395..0.6495 (backplate ends 0.635)
     neck    r 0.132..0.149 over |z| 0.634..0.654  (flange bore is 0.150)
     step    r 0.145..0.156 over |z| 0.6505..0.6625 (drum OD 0.094, rim 0.254)
     sleeve  r 0.1555..0.168 over |z| 0.657..0.729  (inside the annulus)
   The housing OD of 0.072 is the drum bore wheels-9 carries, so the two
   modules meet on that number from both sides. */
function hubBearingPart(s) {
  const part = lib.part('hub-bearings', [0, 0, s * 0.78]);
  const g = new THREE.Group();
  g.position.set(RX, WY, s * 0.6650);

  /* THE BARREL IS STEPPED, AND THE STEP IS WHY THE PROBES EXIST AS
     GEOMETRY. A plain r 0.072 cylinder running the full |z| 0.6475..0.7225
     swallows everything mounted on its outboard face: the three gap probes
     sat at r 0.0562..0.0681 over 0.7100..0.7170, wholly inside it, and a
     cone sweep scored all six of them at zero exposure with nothing but
     their own part in the way. Explode cannot open that, because they are
     inside the part they explode with, and this module declares no
     lib.shell so x-ray cannot either. The base file buried the same three
     as 12 triangle boxes; detailing them into 44 triangle chamfered bodies
     turned 72 dead triangles into 264.

     So the face they mount on steps down. Material at r 0.050..0.072 now
     ends at |z| 0.7100 and the probe bodies seat on that shoulder, which is
     also what an instrumented bearing housing has: a seal land turned back
     to leave the sensor cavity, with a pilot boss standing on through it.
     Nothing that was a contract moves. The OD is still 0.072, the drum bore
     wheels-9 carries over |z| 0.6580..0.7320, and it still runs 52 mm of
     seat under that drum. The inboard face is still 0.6475 and the boss
     still reaches 0.7225. A step only ever removes material. */
  const housing = zrev([
    [0.0720, -s * 0.0375], [0.0720, s * 0.0238], [0.0708, s * 0.0250],
    [0.0500, s * 0.0250], [0.0500, s * 0.0363], [0.0488, s * 0.0375],
    [0.0000, s * 0.0375], [0.0000, -s * 0.0375],
  ], M.castAlu, 24, { crease: 24 });
  g.add(housing);

  /* carrier web: five spokes inboard of the rim flange, clear of the park
     brake backplate below them and of the flange bore outboard of them.
     Their outboard face is at |z| 0.6495, 2 mm INTO the housing's inboard
     face at 0.6475, because the web is the load path from the housing out
     to the neck and a web that stops 1.5 mm short of the bearing it
     carries reads as floating. That 1.5 mm was the first draft.
     PHASE IS A PAIR NUMBER. wheels-9 phases its two park-brake shoe arms
     to 1.214 and 4.356 radians and says in its own comment that they are
     placed to miss a five-spoke hub carrier; with the arm offset of 0.36
     they actually land at 1.574 and 4.716, exactly half a spoke pitch
     apart, so no five-spoke phase clears both by more than a quarter
     pitch. At the shipped 0.9 the 4.716 arm and the 4.671 spoke shared
     3 mm of the same volume over |z| 0.636..0.646. Base 1.26 puts both
     arms 0.314 rad off the nearest spoke and the web is 4 mm narrower,
     which turns a 1.8 mm interference into a 2.6 mm gap at the arm's
     inner radius and 4.4 mm at its outer. */
  /* A CAST SPOKE IS NOT A BAR. Each of these is the load path from the
     bearing out to the neck, and a real one is drafted, filleted into both
     ends and ribbed on its trailing face. A chamfered box is the honest
     minimum here: 44 triangles against 12, and it turns one flat highlight
     down the spoke into three. The web's envelope is unchanged, 76 by 20 by
     10 mm at r 0.068..0.144 over |z| 0.6395..0.6495, because the pair
     phasing above was solved against wheels-9's shoe arms and a wider or
     thicker spoke would undo it. */
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 1.26;
    const spoke = lib.cbox(0.076, 0.020, 0.010, 0.0022, M.castAlu);
    spoke.position.set(Math.cos(a) * 0.106, Math.sin(a) * 0.106, -s * 0.0405);
    spoke.rotation.z = a;
    g.add(spoke);
    /* The stiffening rib that makes it a casting rather than a plate, and
       it is on the spoke's OUTBOARD face because the inboard one is a
       contact. suspension-9's rear structure brings a plate up to
       |z| 0.6395 on its built mesh, which is exactly where this web's
       inboard face is, so the two meet face to face at 0.0 mm and anything
       standing proud of that face is inside the partner: drawn at local
       -0.0468 the rib took 3.55 mm out of that plate at all five spokes,
       both sides, ten pairs. Outboard of the web the volume to |z| 0.6540
       belongs to this housing's own neck and nothing else reaches it. */
    const rib = lib.box(0.062, 0.007, 0.0045, M.castAlu);
    rib.position.set(Math.cos(a) * 0.106, Math.sin(a) * 0.106, -s * 0.0342);
    rib.rotation.z = a;
    g.add(rib);
  }

  /* Neck through the rim flange bore, then the step out to the sleeve. Both
     were extruded tubes and both are now turned: the neck carries a lead-in
     chamfer at each end because it has to enter a 0.150 bore with 1.0 mm of
     radial clearance, and the step carries a machined register face on its
     outboard side where the sleeve lands on it. Radii are untouched, neck
     r 0.132..0.149 and step r 0.145..0.156, because both are quoted against
     wheels-9's built mesh on the hub-bearing panel. */
  const neck = zrev([
    [0.1470, s * -0.0100], [0.1490, s * -0.0080], [0.1490, s * 0.0080],
    [0.1470, s * 0.0100], [0.1340, s * 0.0100], [0.1320, s * 0.0080],
    [0.1320, s * -0.0080], [0.1340, s * -0.0100],
  ], M.castAlu, 28, { crease: 24 });
  neck.position.z = -s * 0.041;
  g.add(neck);
  const step = zrev([
    [0.1560, s * -0.0060], [0.1560, s * 0.0044], [0.1524, s * 0.0044],
    [0.1524, s * 0.0060], [0.1462, s * 0.0060], [0.1450, s * 0.0048],
    [0.1450, s * -0.0048], [0.1462, s * -0.0060],
  ], M.castAlu, 28, { crease: 24 });
  step.position.z = -s * 0.0285;
  g.add(step);

  /* dry-air purge landing on the neck, where the service-loop bundle ends.
     55 degrees, the forward side, following the bundle off the air spring */
  const pa = (55 / 180) * Math.PI;
  const pBoss = lib.cbox(0.016, 0.016, 0.014, 0.0025, M.plasticLt);
  pBoss.position.set(Math.cos(pa) * 0.138, Math.sin(pa) * 0.138, -s * 0.0435);
  pBoss.rotation.z = pa;
  g.add(pBoss);

  /* Stator carrier sleeve: r 0.1555..0.168, wholly inside the annulus, and
     the one number on this part that is a contract rather than a choice.
     drivetrain-6 ran the same sleeve r 0.150..0.156 and dipped 5 mm under
     the annulus floor; this one holds 0.1555 and both walls are drawn to it
     rather than near it.

     What it gains here is what a carrier sleeve actually has. A machined
     register at each end where the resolver ring and the stator stack land,
     two 1.0 mm chamfers so an interference fit can start, and a jacket
     relief turned into the OD across the middle third, which is the volume
     the water jacket occupies and which was previously just a gap between
     two parts that happened not to touch. */
  const sleeve = zrev([
    [0.1670, s * -0.0360], [0.1680, s * -0.0350], [0.1680, s * -0.0170],
    [0.1664, s * -0.0150], [0.1664, s * 0.0150], [0.1680, s * 0.0170],
    [0.1680, s * 0.0350], [0.1670, s * 0.0360],
    [0.1565, s * 0.0360], [0.1555, s * 0.0350],
    [0.1555, s * -0.0350], [0.1565, s * -0.0360],
  ], M.castAlu, 32, { crease: 24 });
  sleeve.position.z = s * 0.008;
  g.add(sleeve);

  /* three eddy-current gap probes on the housing's outboard face, reading
     the hub flange orbit once per revolution. drivetrain-6 aimed these at
     the rotor flange, which in the Gen 7 corner is bolted face to face
     against the wheels-9 rim flange and cannot be seen; bearing tilt is
     the quantity wanted anyway, and this is where it is largest. */
  /* THREE EDDY PROBES WITH LEADS AND A CONNECTOR, which is the difference
     between an instrument and a rectangle. Each is a stepped body with a
     sensing face, a molded backshell and a pigtail into a common junction
     block on the housing: the panel's claim is that bearing tilt is trended
     every revolution, and a probe with no way out of the corner cannot
     trend anything. drivetrain-6 aimed these at the rotor flange, which is
     bolted face to face against the rim flange and cannot be seen; they
     read the hub flange from the housing, which is where tilt is largest.
     Their bodies keep the shipped station, r 0.056..0.068 over
     |z| 0.7100..0.7170.

     The whole harness is boxed in and the sweep is what set its envelope:
     wheels-9's drum shell runs r 0.0720..0.0900 over |z| 0.6580..0.7320 and
     this housing's own OD is 0.072, so between them there is nothing, and
     every lead and the junction block hold r <= 0.0700. Three probes
     converge on one block rather than three cables leaving the corner,
     which is also what the panel says: three probes, once per revolution,
     one trend. The block seats on the same shoulder the probes do, at
     |z| 0.7100 to 0.7200, rather than half inside the barrel.

     THE PIGTAIL FOLLOWS THE SHOULDER, and that sentence is a fix rather
     than a description. Four control points cannot hold an arc this long:
     the spline chorded straight across the hub face, and the routing always
     stepped counterclockwise, so the 5.75 rad probe went 277 degrees the wrong
     way round and its tube swept in to r 0.0260. Measured against the built
     mesh that put two of the three leads per side up to 6.93 mm INSIDE the
     stud flange, which is the one part of this housing that turns. Taking
     the short way round and giving the arc nine stations holds the tube
     surface at r 0.0618..0.0690 over |z| 0.7185..0.7275: 1.8 mm clear of
     the flange OD at 0.060, 1.0 mm inside the 0.0700 the drum bore leaves,
     and 2.5 mm short of wheels-9's hub pilot at |z| 0.7300. Re-swept, zero
     lead vertices fall inside the flange. */
  const jbA = 4.30;
  for (const a of [1.55, 3.65, 5.75]) {
    const probe = lib.cbox(0.012, 0.012, 0.007, 0.0016, M.sensor);
    probe.position.set(Math.cos(a) * 0.062, Math.sin(a) * 0.062, s * 0.0285);
    probe.rotation.z = a;
    g.add(probe);
    const back = lib.cbox(0.009, 0.009, 0.008, 0.0014, M.plastic);
    back.position.set(Math.cos(a) * 0.062, Math.sin(a) * 0.062, s * 0.0360);
    back.rotation.z = a;
    g.add(back);
    let d = jbA - a;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    const pts = [[RX + Math.cos(a) * 0.0620, WY + Math.sin(a) * 0.0620, s * 0.7055]];
    for (let q = 0; q <= 8; q++) {
      const t = q / 8, ang = a + d * t, rr = 0.0665 - 0.0025 * t * t;
      pts.push([RX + Math.cos(ang) * rr, WY + Math.sin(ang) * rr, s * (0.7250 - 0.0045 * t * t)]);
    }
    part.add(lib.tube(pts, 0.0020, M.plastic, false, 12));
  }
  const jbox = lib.cbox(0.016, 0.011, 0.010, 0.0018, M.plastic);
  jbox.position.set(Math.cos(jbA) * 0.0615, Math.sin(jbA) * 0.0615, s * 0.0300);
  jbox.rotation.z = jbA;
  g.add(jbox);

  /* Stud flange on the rotating race. 0.685 is this group's plane, so the
     face lands 15 mm inboard of the new REAR_Z wheel center, on the r 0.060
     spigot wheels-9's rear disc bolts to.

     It is now a turned hub face rather than a disc: a pilot spigot standing
     2 mm proud at r 0.030 so the wheel centers on something, a relieved
     face inside the bolt circle so the flange bears only where it should,
     and five real wheel studs with a lead thread instead of five hexagonal
     stubs. The 5 by r 0.048 pattern and the flange's own r 0.060 by 14 mm
     envelope are both unchanged. */
  const studSpin = new THREE.Group();
  studSpin.add(zrev([
    [0.0000, s * -0.0070], [0.0600, s * -0.0070], [0.0600, s * 0.0050],
    [0.0570, s * 0.0070], [0.0360, s * 0.0070], [0.0360, s * 0.0050],
    [0.0300, s * 0.0050], [0.0300, s * 0.0090], [0.0000, s * 0.0090],
  ], M.steel, 18, { crease: 26 }));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const st = zrev([
      [0.0000, s * -0.0020], [0.0075, s * -0.0020], [0.0075, s * 0.0010],
      [0.0055, s * 0.0022], [0.0055, s * 0.0128], [0.0042, s * 0.0148],
      [0.0000, s * 0.0148],
    ], M.steel, 8, { crease: 30 });
    st.position.set(Math.cos(a) * 0.048, Math.sin(a) * 0.048, s * 0.0070);
    studSpin.add(st);
  }
  studSpin.position.z = s * (REAR_Z - 0.015 - 0.685);
  lib.spin(studSpin, 'z', 30);
  g.add(studSpin);

  part.add(g);
  return part;
}

/* Rim-side GaN inverter: embedded-die board pack above the axle and inboard
   of the contract plane, with the ceramic DC link, busbars up to the
   stator's phase terminals, and the ORed DC landing both service loops
   feed. Occupies x -1.500..-1.376, y 0.478..0.527, |z| 0.611..0.661, which
   clears wheels-9's park brake backplate (r <= 0.1000 over |z| 0.6280..0.6350)
   by 6 mm of radius and sits 156 mm above its master-unit brake line. The
   busbars thread the rim flange bore at r <= 0.1482 against its 0.150.

   The pack is 32 mm deep rather than drivetrain-6's 46, and it sits 14 mm
   higher, because at |z| 0.63 the column over the machine was not empty
   when it was drawn. suspension-4 stood its rear air spring at
   (-1.447, 0.60) with a body-side top plate of r 0.055 at y 0.465..0.477
   directly over the machine and two upper links crossing above with their
   lowest surface at y 0.5172, a 40 mm window that this 32 mm box was
   shaped to fit. suspension-9 moves the rear seats to |z| 0.539 and the
   spring leaves the column entirely. Swept against suspension-9's built
   mesh: straight down from every point on this pack the nearest surface
   is 43.3 mm away, and the nearest suspension-9 surface anywhere below
   the pack's floor plane is that relocated seat at 27.6 mm, where
   drivetrain-7 measured 5 mm to a plate and 1 mm from its busbars. One
   0.5 mm penetration remains, this pack's forward-inboard corner into the
   upper-link plate beside it; the ball joint on that link overhangs the
   inboard flank with 26.5 mm of vertical gap and is 11.5 mm off the
   nearest pack surface. The box is NOT redrawn for the new window,
   because a 32 mm pack with that much column over and under it is a part
   with margin rather than a part that is wrong, and redrawing it would be
   change for its own sake. Both numbers are on the panel. */
function cornerInverterPart(s) {
  const part = lib.part('corner-inverters', [0, 0, s * 0.78]);

  /* The pack's envelope is quoted to four places on its own fail panel and
     the panel is kept honest against the sweep: the built part now measures
     x -1.5000..-1.3760, y 0.4780..0.5270, |z| 0.6100..0.6610, against
     0.4780..0.5275 over 0.6110..0.6610 before this pass. Every one of those
     numbers is a clearance against suspension-9, so the chamfers go on and
     the box does not grow: lib.cbox only ever takes material off an edge,
     which is exactly why it is the safe crispness move on a part whose
     extremes are load bearing. */
  const body = lib.cbox(0.100, 0.032, 0.022, 0.0026, M.castAlu);
  body.position.set(RX, 0.498, s * 0.6100);
  part.add(body);

  /* The fins are on the lid, and on the AFT HALF of it, because the forward
     half is where the ceramic link already stands. Drawn across the whole
     88 mm of lid they ran straight through that block: the bank sat
     y 0.5135..0.5235 and the link sits 0.5140..0.5270 over x -1.487..-1.457,
     so five of the eight blades crossed it by 9.5 mm. Half a lid of fins
     and the block beside them is what a real pack does with the same
     volume. Straight down from this pack is 43.3 mm to suspension-9 and
     straight up is the upper-link plate. */
  part.add(lib.fins(0.046, 0.010, 0.018, 8, 0.0018, M.alu)
    .translateX(RX + 0.021).translateY(0.5185).translateZ(s * 0.6100));

  const board = lib.cbox(0.084, 0.024, 0.005, 0.0012, M.pcb);
  board.position.set(RX, 0.498, s * 0.6165);
  part.add(board);

  /* the ceramic link stands proud on the lid, in the 94 mm of x between
     the two upper links rather than under either of them */
  const capStack = lib.cbox(0.030, 0.013, 0.013, 0.0022, M.plasticLt);
  capStack.position.set(RX - 0.022, 0.5205, s * 0.6080);
  part.add(capStack);

  /* Signal connector for the resolver pair and the corner's temperature
     channels, on the same face as the busbars come up. A lead that ends in
     mid air is the thing this pass exists to stop, and the resolver lead
     the stator now carries ends here. */
  const rzC = lib.cbox(0.014, 0.016, 0.011, 0.0020, M.plastic);
  rzC.position.set(RX + 0.0330, 0.4880, s * 0.6215);
  part.add(rzC);

  /* Three busbars from the stator phase studs, down through the wheels-9
     rim flange bore, then back up into the board pack. Their upper end
     moved with the studs, from r 0.172 to the 0.1704 bolt circle that
     actually fits between the carrier sleeve's built OD and the yoke bore's
     built flats. It stays on |z| 0.6560 so the pack's published envelope,
     x -1.5000 to -1.3760, y 0.4780 to 0.5270, |z| 0.6100 to 0.6610, is the
     box it measures: the lug clamps the stud's shank, which is what the
     shoulder turned into that stud at local 0.0032 to 0.0040 is there for. */
  for (const adeg of [75, 90, 105]) {
    const a = (adeg / 180) * Math.PI, c = Math.cos(a), n = Math.sin(a);
    part.add(lib.tube([
      [RX + c * 0.1704, WY + n * 0.1704, s * 0.6360],
      [RX + c * 0.1380, WY + n * 0.1380, s * 0.6325],
      [RX + c * 0.1320, WY + n * 0.1320, s * 0.6240],
      [RX + c * 0.1400, WY + n * 0.1400, s * 0.6140],
    ], 0.005, M.busbar, false, 14));
  }

  /* DC landing with the ideal-diode ORing stage for loops A and B. It is on
     the FORWARD face of the pack, not the rear one drivetrain-6 used: aft of
     the pack the only route to it passes through the air spring, forward of
     it the loops have 120 mm of free column to fall into. */
  const dcLanding = lib.cbox(0.032, 0.020, 0.026, 0.0026, M.hv);
  dcLanding.position.set(RX + 0.058, 0.492, s * 0.604);
  part.add(dcLanding);
  /* two ORed inlets with real backshells, so the two loops arrive at two
     terminations rather than at one orange brick */
  for (const ls of [-1, 1]) {
    const shell = lib.cbox(0.011, 0.014, 0.014, 0.0020, M.hv);
    shell.position.set(RX + 0.0675, 0.4920, s * (0.604 + ls * 0.0070));
    part.add(shell);
  }

  return part;
}

/* Dual service loops: two 10 mm2 HV DC umbilicals from the body-rail
   bracket to the inverter DC landing, plus the 4 mm purge air line riding
   the same bundle up to the stator cavity. The bracket sits on hv-4's
   BUILD-CODE landing at (-1.36, 0.425, +/-0.625), not on the (-1.36, 0.40,
   +/-0.63) its comment claims. Orange per SPEC. */
function serviceLoopPart(s) {
  const part = lib.part('service-loops', [0, 0, s * 0.78]);

  /* the bracket stops at |z| 0.627, inboard of wheels-9's park brake
     backplate, while still enveloping hv-4's run end at |z| 0.625 */
  const bracket = lib.cbox(0.024, 0.044, 0.016, 0.0028, M.plastic);
  bracket.position.set(-1.36, 0.425, s * 0.619);
  part.add(bracket);
  /* Two mounting ears and their bolts, which is what makes a bracket a
     bracket. They stand off the forward and aft faces at x -1.3475 and
     -1.3725, clear of the wheels-9 park brake backplate corner the panel
     already reports at 1.0 mm, because they grow in x rather than in r. */
  for (const bx of [-0.0185, 0.0185]) {
    const ear = lib.cbox(0.013, 0.016, 0.012, 0.0022, M.plastic);
    ear.position.set(-1.36 + bx, 0.4390, s * 0.619);
    part.add(ear);
    part.add(seat(lib.fastener(0.0042, M.steel, 'hex'), -1.36 + bx, 0.4470, s * 0.619, '+y'));
  }
  /* The loop backshell and the interlock shroud above it: an umbilical that
     carries 810 V terminates in a shrouded connector, not in the end of a
     tube. BOTH ARE ON A RADIUS, not on a z clearance, and that is the fix
     rather than the description. The upper one was drawn at y 0.4120 with
     its outboard face on |z| 0.6365, which put its inboard corner at
     r 0.0982 while it straddled wheels-9's park brake backplate, an annulus
     of r 0.0640..0.1000 over |z| 0.6280..0.6350: 1.8 mm of shroud inside a
     brake plate, across the plate's whole 7 mm thickness. There is no
     axial answer at this station, because the bracket's own outboard face
     is 0.6270 and the backplate starts 1.0 mm behind it, so anything that
     stands proud of the bracket at r below 0.100 is inside the plate.
     Raising it to y 0.4335 takes its nearest corner to r 0.1110, 11.0 mm
     outside the plate rim, and also ends the 13 by 9 by 6 mm the two
     shrouds used to share with each other. The lower one is unmoved: at
     y 0.4180 its corner is already at r 0.1015 and it was never in the
     plate. */
  for (const [bz, by] of [[0.6230, 0.4180], [0.6300, 0.4335]]) {
    const shell = lib.cbox(0.013, 0.015, 0.013, 0.0022, M.hv);
    shell.position.set(-1.3600, by, s * bz);
    part.add(shell);
  }

  /* THE BUNDLE FALLS FORWARD, NOT AFT. Aft of the bracket the column is
     the chassis's: suspension-4 stood its rear air spring at (-1.447, 0.60)
     with a bellows of r 0.052 through y 0.245..0.465, a body-side top plate
     of r 0.055 at y 0.465..0.477 directly over the machine, and a rear
     damper valve head of 30 by 45 by 30 mm at x -1.545..-1.498,
     y 0.395..0.440. A loop drooping aft, which is what drivetrain-6 drew
     when the corner was at |z| 0.81, passed through both. suspension-9 has
     since moved that spring seat inboard to |z| 0.539, so the aft column is
     no longer occupied, and the forward route is KEPT anyway: it is clean
     against both partners and re-routing a fatigue-critical umbilical to
     recover space nothing needs is how the 70 mm bend margin gets spent. Forward of the bracket the column
     x -1.30..-1.38 is empty from y 0.36 to 0.54, so the slack goes there and
     the bundle climbs to the inverter's forward face. Every CABLE station
     holds |z| <= 0.6405 and r >= 0.13 about the axle, clear of the park
     brake backplate (r <= 0.100 over |z| 0.628..0.635) and no nearer than
     9 mm to the wheels-9 flange insert at |z| 0.646. The bracket itself is
     the exception and it is measured, not asserted: its inboard forward
     corner sits at r 0.0931, inside the backplate's radius, 1.0 mm clear of
     it statically and NOT clear of it under rear steer. That is the
     wheels-9 finding in this file's header, reported rather than edited.

     loop A: deliberate slack, 70 mm bend radius, 250 mm of cable for 90 mm
     of net span. */
  part.add(lib.tube([
    [-1.360, 0.420, s * 0.6120],
    [-1.336, 0.394, s * 0.6120],
    [-1.320, 0.438, s * 0.6120],
    [-1.336, 0.476, s * 0.6120],
    [-1.362, 0.492, s * 0.6120],
    [-1.380, 0.494, s * 0.6120],
  ], 0.0065, M.hv, false, 20));

  /* loop B: its own bend plane, 8 mm outboard of A, same landing */
  part.add(lib.tube([
    [-1.352, 0.414, s * 0.6120],
    [-1.328, 0.386, s * 0.6120],
    [-1.308, 0.434, s * 0.6120],
    [-1.326, 0.474, s * 0.6120],
    [-1.356, 0.490, s * 0.6120],
    [-1.378, 0.492, s * 0.6120],
  ], 0.0065, M.hv, false, 20));

  /* purge air line, dry side of the bundle, landing on the carrier boss
     rather than crossing the flange face the way the Gen 5 stub implied.
     The boss moved with the bundle, from 125 degrees around the carrier to
     55, so the umbilical still flexes as one object. */
  part.add(lib.tube([
    [-1.352, 0.402, s * 0.6120],
    [-1.330, 0.390, s * 0.6120],
    [-1.318, 0.428, s * 0.6120],
    [-1.334, 0.458, s * 0.6120],
    [-1.356, 0.468, s * 0.6120],
    [-1.371, 0.468, s * 0.6120],
  ], 0.004, M.plasticLt, false, 16));

  /* THE BUNDLE IS CLIPPED, NOT FLOATING. One 26 mm block called a clamp sat
     at the apex of the forward loop and touched neither cable at its own
     size. This is what a routed umbilical has instead: a saddle at the
     apex that all three runs pass through, and two P-clips further round
     that hold loop A and loop B to their own bend planes. The 70 mm bend
     radius on the specs table is a design minimum, and a minimum radius on
     a cable nobody has clipped is a wish. */
  const saddle = lib.cbox(0.030, 0.020, 0.018, 0.0035, M.plastic);   /* Gen 17: 18 mm deep, not 34: it lives in the 22 mm between hv-15's run end and the wheel web */
  saddle.position.set(-1.3160, 0.4340, s * 0.6120);   /* Gen 17: in the 22 mm between hv-15's run and the wheel web */
  part.add(saddle);
  const strap = lib.cbox(0.008, 0.030, 0.020, 0.0016, M.plastic);
  strap.position.set(-1.3040, 0.4340, s * 0.6120);
  part.add(strap);
  for (const [cx, cy, cz, cr] of [[-1.3405, 0.4805, 0.6120, 0.0085],
                                  [-1.3320, 0.3900, 0.6160, 0.0085]]) {
    const clip = zrev([
      [0.0092, -0.0045], [0.0104, -0.0033], [0.0104, 0.0033], [0.0092, 0.0045],
      [cr, 0.0045], [cr, -0.0045],
    ], M.plastic, 12, { crease: 26 });
    clip.rotation.y = Math.PI / 2;
    clip.position.set(cx, cy, s * cz);
    part.add(clip);
    part.add(seat(lib.fastener(0.0038, M.steel, 'hex'), cx, cy + 0.0126, s * cz, '+y'));
  }

  return part;
}

/* Vectoring and connection coordinator: one box in the rear drive zone,
   aft of both the hv-4 converter volume (x -1.53..-1.21, y 0.36..0.49,
   z +/-0.22) and the penthouse hard point (x -1.58..-1.16), which
   drivetrain-6's box overlapped by 10 mm. Connectors moved onto the top
   face for the same reason. Harnesses run in the band between the rear
   subframe top (y 0.30) and the converter floor (y 0.36). */
function tvControllerPart() {
  const part = lib.part('tv-controller', [0, 0.5, 0]);

  const body = lib.cbox(0.14, 0.045, 0.16, 0.0055, M.castAlu);
  body.position.set(-1.66, 0.43, -0.10);
  part.add(body);

  /* A DUAL-CHANNEL SAFETY CONTROLLER IS A SEALED CASTING. This one was a
     slab with a green slab on top of it. What it gets is the set of
     features that make a box read as an ECU: cast cooling ribs across the
     lid, four mounting ears with real bolts, and a lid line all the way
     round. None of them move the 140 by 45 by 160 mm envelope, which is
     drawn where it is because drivetrain-6's box overlapped the penthouse
     hard point at x -1.58 by 10 mm and this one does not. */
  part.add(lib.fins(0.116, 0.009, 0.140, 11, 0.0035, M.castAlu)
    .translateX(-1.66).translateY(0.4570).translateZ(-0.10));
  /* the board is the sealed floor of the casting, so it shows from
     underneath rather than sitting on the lid where nothing real puts it */
  const pcb = lib.cbox(0.12, 0.006, 0.14, 0.0012, M.pcb);
  pcb.position.set(-1.66, 0.4045, -0.10);
  part.add(pcb);
  /* THE EARS LEAVE THROUGH THE z FACES, NOT THE x ONES, and that is a fix
     rather than a preference. The box spans x -1.730..-1.590, and the
     forward pair was drawn at x -1.5940: a 24 mm ear centered 4 mm inside
     the wall stands only 8 mm proud, and the head seated on it then sat
     x -1.5997..-1.5883, so 85 percent of each head was inside the casting
     it bolts to. A cone sweep scored those two at 4 percent exposed against
     67 for the aft pair, which is the fourth bank on this car to land that
     way. Moving them forward is not available: the ear would have to reach
     x -1.578 to stand as proud as the aft pair, and P.penthouse starts at
     -1.58, which is the exact 10 mm overlap this box was redrawn to end.
     The z faces at -0.180 and -0.020 have nothing on them, so all four ears
     go there, 24 mm proud, with every head in open air. The x envelope does
     not move, because -1.712 and -1.608 are both inside the box's own
     -1.730..-1.590. */
  for (const [ex, ez] of [[-1.7000, -0.1920], [-1.6200, -0.1920],
                          [-1.7000, -0.0080], [-1.6200, -0.0080]]) {
    const ear = lib.cbox(0.024, 0.012, 0.024, 0.0026, M.castAlu);
    ear.position.set(ex, 0.4160, ez);
    part.add(ear);
    part.add(seat(lib.fastener(0.0048, M.steel, 'hex'), ex, 0.4220, ez, '+y'));
  }

  /* Two keyed connectors with latch beaks and a shroud each, and this is
     the pair the two corner harnesses actually leave from. A harness that
     starts at a coordinate on top of a box starts nowhere. */
  for (const [cx, cz] of [[-1.62, -0.15], [-1.70, -0.05]]) {
    const conn = lib.cbox(0.026, 0.022, 0.032, 0.0030, M.plastic);
    conn.position.set(cx, 0.464, cz);
    part.add(conn);
    const beak = lib.cbox(0.012, 0.005, 0.014, 0.0012, M.plastic);
    beak.position.set(cx, 0.4780, cz);
    part.add(beak);
    const skirt = lib.cbox(0.030, 0.008, 0.036, 0.0018, M.plastic);
    skirt.position.set(cx, 0.4530, cz);
    part.add(skirt);
  }

  /* corner harnesses to the service-loop brackets at (-1.36, 0.425, ±0.625).
     They cross under the penthouse hard point (x -1.58..-1.16, y 0.33..0.56)
     at y 0.322, which drivetrain-6's runs did not: its 0.330 to 0.335 band
     skimmed the penthouse floor. Below them the rear subframe tops out at
     y 0.30 and above them the hv-4 ring laminate starts at y 0.339.

     They also go OUTBOARD LATE, forward of x -1.31, and that was the Gen 7
     correction. suspension-4 stood a damper tower on each rear rail, a
     260 by 200 by 50 mm plate at (-1.47, 0.40, +/-0.48) filling y 0.30 to
     0.50 over |z| 0.455..0.505, and the only gap under it was the 5 mm
     between the rail top at 0.295 and the tower bottom at 0.300. A harness
     crossing |z| 0.48 anywhere between x -1.60 and -1.34 went through the
     tower, which is what the first draft of this route did, 18 mm deep.
     Crossing that band at x -1.30 instead cleared it by 38 mm. The route is
     KEPT and re-swept rather than assumed: against suspension-9's built
     rear corner, which is redrawn rather than translated, these two
     harnesses and the yaw link return zero penetration except the yaw
     link's intended 10.5 mm landing inside the chassis ECU. A route drawn
     around hardware that has since moved is only still correct if somebody
     measures it again. */
  part.add(lib.tube([
    [-1.700, 0.462, -0.050],
    [-1.702, 0.400, 0.040],
    [-1.694, 0.352, 0.150],
    [-1.660, 0.332, 0.270],
    [-1.540, 0.324, 0.350],
    [-1.420, 0.322, 0.402],
    [-1.330, 0.324, 0.440],
    [-1.314, 0.328, 0.464],
    [-1.302, 0.342, 0.504],
    [-1.306, 0.374, 0.562],
    [-1.334, 0.406, 0.602],
    [-1.356, 0.418, 0.616],
  ], 0.0035, M.plastic, false, 38));
  part.add(lib.tube([
    [-1.620, 0.462, -0.150],
    [-1.664, 0.398, -0.232],
    [-1.678, 0.348, -0.322],
    [-1.630, 0.328, -0.372],
    [-1.520, 0.323, -0.396],
    [-1.410, 0.322, -0.412],
    [-1.330, 0.324, -0.442],
    [-1.312, 0.330, -0.470],
    [-1.302, 0.344, -0.508],
    [-1.308, 0.376, -0.566],
    [-1.336, 0.406, -0.602],
    [-1.356, 0.418, -0.616],
  ], 0.0035, M.plastic, false, 38));

  /* yaw-demand link ONTO suspension-9's chassis ECU, whose box measures
     0.18 by 0.036 by 0.12 spanning x -1.040..-0.860, y 0.308..0.344,
     z -0.340..-0.220 on its BUILT mesh, the same station suspension-4 used,
     so its aft face is at x -1.04 and the run has to reach past it rather
     than stop at the center coordinate. It lands at (-1.030, 0.330,
     -0.282), 10 mm inside that face. This is the only run that crosses the
     penthouse footprint, so it descends aft of x -1.66 and then holds
     y 0.320 through a corridor only 20 mm tall: the battery envelope lid
     at 0.31 below, the penthouse floor at 0.33 above. Every control point
     is placed so the spline has no room to overshoot into either. */
  part.add(lib.tube([
    [-1.675, 0.412, -0.160],
    [-1.694, 0.374, -0.212],
    [-1.692, 0.338, -0.262],
    [-1.664, 0.322, -0.298],
    [-1.600, 0.320, -0.316],
    [-1.400, 0.319, -0.330],
    [-1.150, 0.321, -0.300],
    [-1.030, 0.330, -0.282],
  ], 0.0030, M.plastic, false, 32));

  return part;
}

/* Front drive unit: the axial-flux machine's fourth posting, rescaled to
   130 kW, in the additively built housing. Disc housing, gear case on two
   axes, right-hand output shaft, oil cooler, mounts, and both halfshafts.
   The disconnect collars and the inverter pocket contents belong to their
   own parts. All inside P.driveF except the halfshafts, which have to
   reach the wheels. */
function frontUnitPart() {
  const part = lib.part('front-unit', [0.4, -0.05, 0]);

  /* THE DISC HOUSING IS A CASTING WITH A PARTING LINE. It was a tube and
     two flat discs at r 0.142, and a housing that splits somewhere has to
     show where. This is one turned profile from the inboard dish face at
     z -0.022 to the outboard one at 0.082, and it carries what an axial
     flux case actually carries at its joint: a bolt flange standing proud
     of the barrel at the outboard parting plane z 0.072, a 1.5 mm chamfer
     at each rim edge, and a shallow relief around the barrel between them
     so the flange reads as a flange rather than as a wider tube.

     Envelope is held: r 0.142 maximum, z -0.022 to 0.082, exactly what the
     three primitives spanned. The flange is the only thing that leaves it
     and it leaves radially, to r 0.1525, into open volume inside P.driveF. */
  const outHalf = zrev([
    [0.0000, 0.0720], [0.0380, 0.0720], [0.0400, 0.0700], [0.0400, 0.0520],
    [0.1360, 0.0520], [0.1420, 0.0480], [0.1420, 0.0120],
    [0.1525, 0.0120], [0.1525, 0.0000], [0.0000, 0.0000],
  ], M.castAlu, 40, { crease: 26 });
  const inHalf = zrev([
    [0.0000, -0.0520], [0.1360, -0.0520], [0.1420, -0.0480], [0.1420, -0.0120],
    [0.1525, -0.0120], [0.1525, 0.0000], [0.0000, 0.0000],
  ], M.castAlu, 40, { crease: 26 });
  outHalf.position.set(A7[0], A7[1], 0.0300);
  inHalf.position.set(A7[0], A7[1], 0.0300);
  part.add(inHalf, outHalf);

  /* FOURTEEN BOLTS THAT WERE INSIDE THE PART THEY HELD. lib.bolts drew them
     at r 0.136 on a plane 2 mm under a solid r 0.142 dish, so 5.6 mm of
     each 7.2 mm stub was buried in aluminum and a ray sweep found zero of
     the bank's faces exposed. That is the third bank on this car to land
     that way and the note in common.js says why: the caller has to state
     the VISIBLE face, not a datum. The face here is the outboard side of
     the parting flange, measured off the built profile at z 0.0420, and
     lib.fastener seats itself on it. */
  part.add(boltRing(10, 0.1470, 0.0058, M.steel, A7[0], A7[1], 0.0420, '+z'));

  /* Printed load-path ribs following the optimizer's spider, now chamfered
     and drafted, and tied into a hub collar at the center so they read as
     one printed spider rather than seven loose bars. Nine of them, because
     seven at 0.82 radians left a 0.86 rad gap the eye finds. */
  const spider = zrev([
    [0.0640, -0.0050], [0.0640, 0.0050], [0.0400, 0.0050], [0.0400, -0.0050],
  ], M.castAlu, 18, { crease: 26 });
  spider.position.set(A7[0], A7[1], -0.0270);
  part.add(spider);
  for (let i = 0; i < 9; i++) {
    const a = 0.28 + i * ((Math.PI * 2) / 9);
    const rib = lib.cbox(0.066, 0.010, 0.010, 0.0022, M.castAlu);
    rib.position.set(A7[0] + Math.cos(a) * 0.092, A7[1] + Math.sin(a) * 0.092, -0.026);
    rib.rotation.z = a;
    part.add(rib);
  }

  /* Neck down to the gear case, then the shallow case on two axes. The neck
     now has the fillet a printed transition has at both ends, and each case
     drum has a machined bearing register turned into its outboard face. */
  const neck = zrev([
    [0.0480, -0.0450], [0.0420, -0.0340], [0.0420, 0.0340], [0.0480, 0.0450],
    [0.0000, 0.0450], [0.0000, -0.0450],
  ], M.castAlu, 20, { crease: 26 });
  neck.position.set(A7[0], A7[1], -0.062);
  part.add(neck);
  for (const [ax, r] of [[B7, 0.048], [C7, 0.075]]) {
    part.add((() => {
      const d = zrev([
        [0.0000, -0.0550], [r, -0.0550], [r, 0.0480], [r - 0.0060, 0.0520],
        [r - 0.0060, 0.0550], [0.0000, 0.0550],
      ], M.castAlu, 26, { crease: 26 });
      d.position.set(ax[0], ax[1], GZ7);
      return d;
    })());
  }
  const caseFill = lib.cbox(0.072, 0.096, 0.110, 0.0060, M.castAlu);
  caseFill.position.set(1.477, 0.406, GZ7);
  part.add(caseFill);

  /* GEAR CASE COVER, with a real bolt flange and real heads. The eight
     stubs lib.bolts drew here stood 5 mm proud of the case face at
     z -0.215 and were the only thing on this housing that admitted the case
     opens. The cover is now a turned lid on a raised flange, and the heads
     seat on the lid face at z -0.2185, measured off that profile. */
  const cover = zrev([
    [0.0000, -0.0075], [0.0810, -0.0075], [0.0810, -0.0035], [0.0750, 0.0000],
    [0.0000, 0.0000],
  ], M.castAlu, 26, { crease: 26 });
  cover.position.set(C7[0], C7[1], -0.2150);
  part.add(cover);
  part.add(boltRing(6, 0.0755, 0.0052, M.steel, C7[0], C7[1], -0.2225, '-z'));

  /* OIL. A gear case with an oil pan has a drain and a level plug and two
     galleries feeding the cooler, and none of them were drawn: the cooler
     was a box under the case with two water stubs and no oil side at all.
     Both galleries are external pipes on the case flank, which is what an
     additively built housing does when the passage cannot be printed
     through a bearing boss, and both land on the cooler's own ports. */
  const oilCooler = lib.cbox(0.09, 0.028, 0.08, 0.0035, M.castAlu);
  oilCooler.position.set(1.48, 0.270, -0.08);
  part.add(oilCooler);
  part.add(lib.fins(0.086, 0.010, 0.074, 9, 0.0022, M.alu)
    .translateX(1.48).translateY(0.2515).translateZ(-0.08));
  for (const [zz, mat] of [[-0.105, M.coolant], [-0.055, M.coolantHot]]) {
    const stub = lib.cyl(0.008, 0.05, mat, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(1.42, 0.270, zz);
    part.add(stub);
  }

  /* Both galleries leave the case at its outboard end face on z -0.105 and
     land on the cooler, and the route is measured rather than drawn
     straight down: the cooler sits directly under the case, its top at
     y 0.284 against a drum whose bottom is 0.280, so a pipe run between the
     two would be inside both castings for its whole length.

     THE SECOND ONE WENT THROUGH THE OUTPUT SHAFT, and the comment that used
     to sit here claimed it was clear. Swept against the built mesh the
     feed's first draft, [1.4900, 0.3860, -0.1080] to [1.4600, 0.3480,
     -0.0680], ran 15.9 mm inside the neck at (1.48, 0.40) r 0.042 and
     11.5 mm inside the right-hand output shaft at (1.45, 0.355) r 0.0265,
     which is a static oil pipe through a turning shaft. The shaft is not
     avoidable at that height: it occupies y 0.3285..0.3815 across the whole
     of the corridor between the case end and the disc housing. So this feed
     leaves low instead, off the r 0.069 outboard face of the output drum at
     y 0.302, and drops to the cooler under the shaft rather than across it.

     The forward feed keeps its route. It leaves through the same end face
     at (1.510, 0.390) and exits radially through the neck's own flank, then
     runs down at x 1.503..1.537, clear of the intermediate drum at
     (1.505, 0.458) r 0.048 and outboard of the output shaft entirely. */
  for (const [route, mat] of [
    [[[1.5100, 0.3900, -0.1060], [1.5300, 0.3600, -0.0700],
      [1.5250, 0.3100, -0.0400], [1.5080, 0.2830, -0.0450]], M.coolantHot],
    [[[1.4620, 0.3020, -0.1075], [1.4640, 0.2980, -0.0900],
      [1.4640, 0.2900, -0.0700], [1.4620, 0.2830, -0.0520]], M.coolant]]) {
    part.add(lib.tube(route, 0.0055, mat, false, 14));
  }
  /* Drain plug on the oil pan floor, fill and level plug on the flank. A hex
     head on the lowest face of a gear case is the single most legible
     service feature a drive unit has, and the first placement of this one
     was at (1.477, 0.356), which is 27 mm from the output axis and
     therefore 48 mm inside a drum of radius 0.075. It goes on the bottom of
     that drum, x 1.450 where the surface is level, at z -0.175 so it clears
     the cooler's z -0.120. The fill plug lands on the case flank's own
     x 1.513 face at y 0.390, below the intermediate drum's r 0.048. */
  part.add(seat(lib.fastener(0.0105, M.darkSteel, 'hex'), 1.4500, 0.2800, -0.1750, '-y'));
  part.add(seat(lib.fastener(0.0085, M.darkSteel, 'hex'), 1.5130, 0.3900, -0.1300, 0.0));

  /* Right-hand output shaft from the case out to the disconnect collar,
     turned rather than plain: a bearing journal at the case, a relief, and
     a spline land at the collar end. */
  const outShaft = zrev([
    [0.0000, -0.1850], [0.0265, -0.1850], [0.0265, -0.1700], [0.0240, -0.1620],
    [0.0240, 0.1600], [0.0258, 0.1660], [0.0258, 0.1850], [0.0000, 0.1850],
  ], M.steel, 12, { crease: 28 });
  outShaft.position.set(C7[0], C7[1], 0.035);
  part.add(outShaft);

  /* Mounts: two bushes to the front subframe, each on a cast arm. Gen 5
     hung the bushes at z +/-0.28 with the nearest housing 67 mm away in x,
     so they read as floating; the arms are the fix, and they land the
     bushes inside P.driveF (z +/-0.31 against the zone's 0.35).

     The arm now has a machined pad and two bolts where it meets the case,
     and the bush is a bonded one rather than a rubber cylinder: an outer
     can, a rolled lip at each end and an inner sleeve. That inner sleeve is
     the part a subframe bolt actually passes through, and drawing it is
     what stops the mount reading as a rubber puck. */
  for (const sz of [-1, 1]) {
    const arm = lib.cbox(0.030, 0.024, 0.250, 0.0035, M.castAlu);
    arm.position.set(1.520, 0.295, sz * 0.185);
    part.add(arm);
    /* The pad and its two bolts are OUTBOARD of the case wall, and both
       halves of that had to be measured rather than assumed. The gear case
       skin ends at |z| 0.1020: the first draft put the pad on 0.0900 and
       its bolts on 0.0750 and 0.1050, so the inboard head sat 27 mm inside
       the case with zero faces exposed to its own part, which is the fourth
       bank on this car to land that way. The pad also floated: its underside
       was on y 0.3080 and the arm's top face is 0.3070. Pad now starts on
       the wall at |z| 0.1000 and sits ON the arm, and both heads seat on the
       pad's own 0.3170 face outboard of the skin. */
    const pad = lib.cbox(0.020, 0.010, 0.046, 0.0022, M.castAlu);
    pad.position.set(1.520, 0.3120, sz * 0.1230);
    part.add(pad);
    part.add(seat(lib.fastener(0.0055, M.steel, 'hex'), 1.5200, 0.3170, sz * 0.1080, '+y'));
    part.add(seat(lib.fastener(0.0055, M.steel, 'hex'), 1.5200, 0.3170, sz * 0.1380, '+y'));
    const bush = zrev([
      [0.0230, -0.0200], [0.0250, -0.0170], [0.0250, 0.0170], [0.0230, 0.0200],
      [0.0135, 0.0200], [0.0135, 0.0230], [0.0110, 0.0230], [0.0110, -0.0230],
      [0.0135, -0.0230], [0.0135, -0.0200],
    ], M.rubber, 12, { crease: 26 });
    bush.position.set(1.560, 0.290, sz * 0.290);
    part.add(bush);
    const sleeve = zc(lib.cyl(0.0108, 0.052, M.steel, 12));
    sleeve.position.set(1.560, 0.290, sz * 0.290);
    part.add(sleeve);
  }

  /* both front halfshafts, spinning, in this part's 37.58 kg.
     0.485 is not a free number, and neither was drivetrain-7's 0.520. Each
     is the midpoint of the same two faces solved against a different front
     wheel: the dog collar's outboard end, fixed at |z| 0.2800 in both, and
     the wheel's hub face inboard plane, which wheels-7 puts at 0.7625 and
     wheels-9 at 0.6925. Carrying 0.520 into the Gen 9 preset would drive
     the outboard joint 70.0 mm through the hub face, the disc bell and the
     spoke web behind it. See the front-unit panel for why this interface
     is now on its second consecutive miss in opposite directions. */
  for (const sz of [-1, 1]) {
    const shaftG = halfshaft(sz);
    shaftG.position.set(C7[0], C7[1], sz * 0.475);   /* Gen 17: (0.6725 + 0.2775) / 2 */
    lib.spin(shaftG, 'z', 30);
    part.add(shaftG);
  }

  return part;
}

/* Front axle disconnect: two dog collars on the differential outputs at
   z +/-0.245, each with a 48 V shift actuator fed from hv-4's dual by-wire
   feeds, a fork rod, and an output speed sensor. Two collars rather than
   one because a single clutch leaves the differential carrier turning in
   its oil, and churning is exactly the loss this part exists to delete.

   The station is set from BOTH ends rather than chosen. Each collar is
   70 mm long, so at 0.245 it spans |z| 0.210 to 0.280 and it lands on
   what it has to land on: the halfshaft's inboard joint face at 0.2775
   outboard, and inboard the right-hand output shaft, which ends at 0.220,
   and on the other side the gear case drum, which ends at 0.215. Nothing
   in this part floats and the halfshaft did not have to move to reach it. */
function frontDisconnectPart() {
  const part = lib.part('front-disconnect', [-0.1, -0.42, 0]);

  for (const sz of [-1, 1]) {
    /* THE COLLAR HAS A FORK GROOVE. A dog collar that slides has to be
       gripped by something, and a plain 100 mm drum gives a fork nothing to
       hold: the shift rod was a bare cylinder standing in free space beside
       it. The groove is turned into the OD at mid-length, r 0.0425 across
       11 mm with a 1.5 mm land either side, and the fork now runs in it.
       Envelope unchanged, r 0.050 over |z| 0.210 to 0.280, because that
       span is what the halfshaft's inboard joint face is solved against. */
    const collar = zrev([
      [0.0240, sz * -0.0350], [0.0500, sz * -0.0350], [0.0500, sz * -0.0080],
      [0.0425, sz * -0.0055], [0.0425, sz * 0.0055], [0.0500, sz * 0.0080],
      [0.0500, sz * 0.0322], [0.0472, sz * 0.0350], [0.0240, sz * 0.0350],
    ], M.steel, 20, { crease: 26 });
    collar.position.set(C7[0], C7[1], sz * 0.245);
    part.add(collar);

    /* THE DOG TEETH WERE INSIDE THE COLLAR. Ten blocks sat at r 0.044 over
       |z| 0.268..0.278 inside a solid drum of r 0.050 spanning 0.210..0.280,
       and a ray sweep found not one face of any of them exposed: 240
       triangles of the feature this part is named for, invisible in every
       mode. They now stand ON the engagement face at |z| 0.280 and out to
       |z| 0.2905, which is free volume outboard of the collar face and
       radially outside the halfshaft's inboard joint...

       and interleaving is the point. Twelve teeth stand on the collar's
       engagement face over |z| 0.2800 to 0.2905 at r 0.0375 to 0.0470,
       outboard of the collar and radially clear of the halfshaft's inboard
       joint, which is r 0.036. Twelve more on a ring shrunk onto that
       joint's OD point back at them, half a pitch across, so the two sets
       are drawn in mesh: 22.0 mm of pitch, 9.5 mm of tooth, 1.5 mm of
       clearance on each flank. Every tooth carries a lead chamfer on its
       engaging corner, because a dog tooth without one cannot be engaged
       at speed, and that chamfer is what the 180 ms on the panel buys. */
    for (const [n, ph, ch] of [[12, 0, true], [12, Math.PI / 12, false]]) {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + ph;
        const dog = ch ? lib.cbox(0.0095, 0.0095, 0.0105, 0.0020, M.darkSteel)
                       : lib.box(0.0095, 0.0095, 0.0105, M.darkSteel);
        dog.position.set(C7[0] + Math.cos(a) * 0.04225, C7[1] + Math.sin(a) * 0.04225, sz * 0.28525);
        dog.rotation.z = a;
        part.add(dog);
      }
    }
    const mate = zrev([
      [0.0348, sz * -0.0040], [0.0470, sz * -0.0040], [0.0470, sz * 0.0040],
      [0.0348, sz * 0.0040],
    ], M.darkSteel, 16, { crease: 26 });
    mate.position.set(C7[0], C7[1], sz * 0.2945);
    part.add(mate);

    /* THE ACTUATOR. A 50 mm cube of plastic is not a 48 V shift actuator,
       and at y 0.393 to 0.443 it was also 12 mm inside the collar it was
       supposed to move. It is now a motor can on the end of a body with a
       keyed connector and a bolted foot, clear of the collar's r 0.050 by
       11 mm, and the fork below it is what holds it to anything. */
    const act = lib.cbox(0.046, 0.040, 0.036, 0.0040, M.plasticLt);
    act.position.set(C7[0], 0.4600, sz * 0.245);
    part.add(act);
    const canM = zrev([
      [0.0000, -0.0170], [0.0175, -0.0170], [0.0175, 0.0150], [0.0155, 0.0170],
      [0.0000, 0.0170],
    ], M.alu, 16, { crease: 28 });
    canM.rotation.y = Math.PI / 2;
    canM.position.set(C7[0] + 0.0400, 0.4600, sz * 0.245);
    part.add(canM);
    for (const bz of [-1, 1]) {
      part.add(seat(lib.fastener(0.0044, M.steel, 'hex'),
                    C7[0] + 0.0182, 0.4800, sz * 0.245 + bz * 0.0130, '+y'));
    }
    const conn = lib.cbox(0.015, 0.019, 0.013, 0.0022, M.plastic);
    conn.position.set(C7[0] - 0.0305, 0.4700, sz * 0.245);
    part.add(conn);
    const shroud = lib.cbox(0.008, 0.023, 0.017, 0.0018, M.plastic);
    shroud.position.set(C7[0] - 0.0375, 0.4700, sz * 0.245);
    part.add(shroud);

    /* THE FORK WAS BURIED. A 20 mm cylinder at y 0.385 to 0.415 sat wholly
       inside the collar below it and the actuator above it: zero faces
       exposed on a ray sweep, which is the same defect as the dog teeth one
       part over. A real fork is a yoke, and a yoke straddles: a shift rod
       down from the actuator, a hub above the collar's OD, and two arms
       that reach round it into the groove turned for them. Both pads run at
       r 0.0470, sitting in a groove whose floor is 0.0425, so the fork
       visibly engages the collar instead of passing through it. */
    const rod = lib.cyl(0.0070, 0.0240, M.steel, 10);
    rod.position.set(C7[0], 0.4300, sz * 0.245);
    part.add(rod);
    const hub = lib.cbox(0.032, 0.012, 0.016, 0.0022, M.steel);
    hub.position.set(C7[0], 0.4130, sz * 0.245);
    part.add(hub);
    for (const fs of [-1, 1]) {
      const phi = 0.953;
      const tip = [C7[0] + fs * Math.cos(phi) * 0.0400, C7[1] + Math.sin(phi) * 0.0400];
      const root = [C7[0] + fs * 0.0150, 0.4120];
      const dx = tip[0] - root[0], dy = tip[1] - root[1];
      const arm = lib.cbox(Math.hypot(dx, dy) + 0.008, 0.009, 0.012, 0.0018, M.steel);
      arm.position.set((tip[0] + root[0]) / 2, (tip[1] + root[1]) / 2, sz * 0.245);
      arm.rotation.z = Math.atan2(dy, dx);
      part.add(arm);
      const pad = lib.cbox(0.009, 0.014, 0.010, 0.0016, M.darkSteel);
      pad.position.set(C7[0] + fs * Math.cos(phi) * 0.0470, C7[1] + Math.sin(phi) * 0.0470,
                       sz * 0.245);
      pad.rotation.z = fs > 0 ? phi : Math.PI - phi;
      part.add(pad);
    }

    /* Output speed sensor, reading the dog teeth rather than nothing in
       particular. It used to sit at r 0.051 from the output axis, which is
       1 mm outside a collar that slides and turns, on no bracket at all.
       It now hangs off the actuator on an L bracket and looks radially in
       at the tooth ring at r 0.058, with a lead to its own connector. */
    const sA = 1.05, sC = Math.cos(sA), sS = Math.sin(sA);
    const legY = lib.cbox(0.010, 0.042, 0.014, 0.0018, M.castAlu);
    legY.position.set(C7[0] + sC * 0.0580, 0.4230, sz * 0.2560);
    part.add(legY);
    const legZ = lib.cbox(0.010, 0.012, 0.044, 0.0018, M.castAlu);
    legZ.position.set(C7[0] + sC * 0.0580, C7[1] + sS * 0.0580 + 0.0090, sz * 0.2740);
    part.add(legZ);
    const sense = lib.cbox(0.014, 0.014, 0.012, 0.0022, M.sensor);
    sense.position.set(C7[0] + sC * 0.0580, C7[1] + sS * 0.0580, sz * 0.28525);
    sense.rotation.z = sA;
    part.add(sense);
    const sconn = lib.cbox(0.009, 0.011, 0.008, 0.0014, M.plastic);
    sconn.position.set(C7[0] + sC * 0.0580, C7[1] + sS * 0.0580 + 0.0125, sz * 0.28525);
    part.add(sconn);
    part.add(lib.tube([
      [C7[0] + sC * 0.0580, C7[1] + sS * 0.0580 + 0.0165, sz * 0.2853],
      [C7[0] + sC * 0.0560, 0.4300, sz * 0.2790],
      [C7[0] + sC * 0.0400, 0.4560, sz * 0.2660],
      [C7[0] - 0.0140, 0.4740, sz * 0.2500],
      [C7[0] - 0.0330, 0.4700, sz * 0.2470],
    ], 0.0026, M.plastic, false, 12));
  }

  return part;
}

/* Front GaN inverter: the pocket on the housing inboard face, GaN board
   row, ceramic link, busbars into the housing, coolant stubs, and the DC
   feed whose landing is hv-4's tunnel run END POINT (1.30, 0.402, 0.015)
   exactly, rather than the 21 mm miss drivetrain-6 shipped. */
function frontInverterPart() {
  const part = lib.part('front-inverter', [0.45, 0.4, 0]);

  const body = lib.cbox(0.20, 0.11, 0.040, 0.0050, M.castAlu);
  body.position.set(1.49, 0.450, -0.048);
  part.add(body);

  /* HEATSINK FINS ON THE ONE FACE THAT HAS AIR IN FRONT OF IT. A 130 kW
     inverter losing 400 W at load has to put it somewhere, and this pocket
     is on the housing's inboard flank with the coolant plumbing already on
     its other side. Six fins at 5.6 mm pitch is a real spacing, not a
     texture: a 2 mm blade on a 3.6 mm gap is what casts into aluminum and
     still passes air.

     THE BANK IS AS DEEP AS THE FACE IT STANDS ON, and the first draft was
     not. Sixteen blades over 88 mm of z on a pocket whose lid face spans
     z -0.068 to -0.028 put four blades 11.1 mm inside the front-unit's disc
     housing, which starts at z -0.022, and left four more standing 3.7 mm
     off the nearest surface in the module with nothing under them at all.
     A cbox is chamfered, so the flat part of this lid is z -0.063..-0.033
     and that, not the box's nominal 40 mm, is what a fin can seat on. */
  part.add(lib.fins(0.176, 0.014, 0.030, 6, 0.0020, M.alu)
    .translateX(1.49).translateY(0.5105).translateZ(-0.048));

  /* MOUNTING EARS, and the first placement of them was wrong in exactly the
     way common.js warns about. They were put at x 1.402 and 1.578 on a body
     that spans 1.390 to 1.590, so all three ears and all three heads were
     INSIDE the casting they were bolting: a ray sweep returned 0.0 percent
     exposed on every face of every one. The ear has to leave the body
     footprint before the bolt can seat on anything.

     They now stand off the two ends at x 1.378 and 1.602 and reach back in
     +z to the housing's inboard face at z -0.022, which is the surface this
     pocket is actually bolted to, with the heads on the outboard side where
     a wrench could reach them. Three points, not two, because a 200 mm box
     on two ears rocks about their line. */
  for (const [ex, ey] of [[1.3780, 0.4700], [1.3780, 0.4300], [1.6020, 0.4500]]) {
    const ear = lib.cbox(0.024, 0.022, 0.012, 0.0026, M.castAlu);
    ear.position.set(ex, ey, -0.0260);
    part.add(ear);
    part.add(seat(lib.fastener(0.0050, M.steel, 'hex'), ex, ey, -0.0320, '-z'));
  }

  /* Lid, with the eight captive screws a serviceable power module has and
     an EMC gasket groove turned into its rim. */
  const lid = lib.cbox(0.18, 0.09, 0.006, 0.0020, M.alu);
  lid.position.set(1.49, 0.450, -0.071);
  part.add(lid);
  for (const [lx, ly] of [[-0.082, -0.038], [-0.082, 0.038], [0.082, -0.038], [0.082, 0.038],
                          [-0.028, -0.040], [0.028, -0.040], [-0.028, 0.040], [0.028, 0.040]]) {
    part.add(seat(lib.fastener(0.0038, M.steel, 'torx'), 1.49 + lx, 0.450 + ly, -0.0740, '-z'));
  }

  /* embedded-die GaN packs on the lid face, each a molded module with a
     chamfered lip rather than a slab */
  for (let i = 0; i < 3; i++) {
    const pack = lib.cbox(0.040, 0.040, 0.010, 0.0030, M.plasticLt);
    pack.position.set(1.432 + i * 0.050, 0.464, -0.079);
    part.add(pack);
  }

  /* ceramic DC link block, 16 uF where drivetrain-6 needed 30 */
  const link = lib.cbox(0.042, 0.050, 0.016, 0.0035, M.plasticLt);
  link.position.set(1.562, 0.436, -0.079);
  part.add(link);

  /* Short solid busbars bridging into the housing face, each now a real
     laminated bar on an insulator stand-off rather than a bare pin: the
     stand-off is what a busbar needs where it crosses a grounded casting,
     and it is 12 triangles. */
  for (let i = 0; i < 3; i++) {
    const bar = lib.cbox(0.010, 0.0035, 0.030, 0.0008, M.busbar);
    bar.position.set(1.448 + i * 0.024, 0.478, -0.016);
    part.add(bar);
    const iso = lib.cbox(0.013, 0.008, 0.009, 0.0016, M.plastic);
    iso.position.set(1.448 + i * 0.024, 0.4720, -0.0255);
    part.add(iso);
  }

  /* SIGNAL CONNECTOR. Gate drive, temperature and the interlock loop all
     leave this box, and until now nothing did: the DC feed was the only
     thing that left. A keyed shroud with a latch beak is the shape that
     says signal rather than power, and it is the one feature that tells a
     viewer which orange tube is the 810 V one. */
  const sig = lib.cbox(0.026, 0.020, 0.016, 0.0026, M.plastic);
  sig.position.set(1.4260, 0.4020, -0.0180);
  part.add(sig);
  const beak = lib.cbox(0.014, 0.005, 0.008, 0.0012, M.plastic);
  beak.position.set(1.4260, 0.3900, -0.0180);
  part.add(beak);

  /* DC feed to the pack, landing on hv-4's tunnel run end exactly */
  part.add(lib.tube([
    [1.430, 0.492, -0.062],
    [1.360, 0.450, -0.045],
    [1.310, 0.410, 0.000],
    [1.300, 0.402, 0.015],
  ], 0.008, M.hv, false, 18));

  /* Coolant stubs on the pocket flank, turned as ports: a flange face where
     they leave the casting, an O-ring land and a barb, so the pipe that is
     not drawn still has somewhere to go. */
  for (const [yy, mat] of [[0.424, M.coolant], [0.478, M.coolantHot]]) {
    const stub = zrev([
      [0.0000, -0.0200], [0.0125, -0.0200], [0.0125, -0.0140], [0.0070, -0.0120],
      [0.0070, 0.0030], [0.0082, 0.0044], [0.0082, 0.0120], [0.0096, 0.0134],
      [0.0072, 0.0200], [0.0000, 0.0200],
    ], mat, 10, { crease: 30 });
    stub.rotation.y = Math.PI / 2;
    stub.position.set(1.610, yy, -0.048);
    part.add(stub);
  }

  return part;
}

export function build() {
  const sys = new THREE.Group();

  /* rear corners at the NEW |z| 0.74 centers: motor rings, bearing unit,
     corner inverter, dual loops, per side */
  for (const s of [-1, 1]) {
    sys.add(rotorRingPart(s));
    sys.add(statorRingPart(s));
    sys.add(hubBearingPart(s));
    sys.add(cornerInverterPart(s));
    sys.add(serviceLoopPart(s));
  }

  sys.add(tvControllerPart());
  sys.add(frontUnitPart());
  sys.add(frontDisconnectPart());
  sys.add(frontInverterPart());

  return sys;
}
