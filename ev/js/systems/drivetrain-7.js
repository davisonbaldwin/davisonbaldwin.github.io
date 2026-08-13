/* Drive units, Gen 7: range. This module exists to answer one question,
   how far the car goes on a charge, and it answers it by giving things up.
   Peak power falls from drivetrain-6's 480 kW to 260, the in-wheel rings
   move 70 mm inboard per side onto the new rear track, and the front axle
   gains two dog clutches so it can stop turning altogether at cruise.
   The car is about two seconds slower to 100 km/h. That is the trade, it
   is stated on every panel, and it is the correct one here.

   NEW BINDING interface contract with wheels-7 (design/gen7.md), which
   SUPERSEDES the Gen 3 annulus contract in design/gen3.md:
   - rear wheel centres (-1.45, 0.355, +/-0.74); front unchanged at +/-0.81
   - motor annulus r 0.155..0.235 spanning world |z| 0.65..0.73
   - flange face at |z| 0.65; wheels-7 leaves the annulus void and provides
     the flange, drivetrain-7 occupies it
   - rear-corner part groups explode z-outward at 0.78, the motor rings at
     0.90 (the extra 0.12 opens the flange joint), system explode zero
   VERIFIED against wheels-7's shipped build code, both sides, per the
   standing rule. wheels-7 leaves the annulus void: zero of its vertices
   fall inside r 0.1555..0.2345 over |z| 0.6505..0.7295. Zero vertices of
   this module fall inside any wheels-7 solid at the rear corner, namely
   its rim flange plate (r 0.150..0.244, |z| 0.6460..0.6500), flange bolt
   heads (r 0.2185..0.2315, |z| 0.6401..0.6479), park brake backplate
   (r <= 0.100, |z| 0.628..0.635), shoe carrier (r <= 0.066, |z| 0.631..
   0.648), drum shell (r 0.072..0.090, |z| 0.658..0.732) and drum torus
   (r 0.086..0.094, |z| 0.654..0.662). Three numbers are met from both
   sides: the drum bore and this hub housing are both 0.072, the wheel disc
   spigot and this stud flange are both 0.060, and wheels-7's park brake
   boss lands its outboard face on this housing's inboard face at |z|
   0.6475 exactly, which the sweep confirms as contact rather than a gap.

   ONLY the rotor flange touches the |z| 0.650 contract plane, because that
   plane is a rotating face. Every static part stands off it: the stator
   terminal land at 0.6515, the carrier step at 0.6505. The rim flange bore
   is 0.150, and the three static crossings of the joint plane, the carrier
   neck, the purge feed and the three phase busbars, hold r <= 0.1494
   through |z| 0.6455..0.6500, so the tightest of them clears the bore by
   0.6 mm. Measured rear-corner envelopes, so the reviewer can check
   numerically:
     rotor rings      r 0.1880..0.2330, |z| 0.6500..0.7280
     stator rings     r 0.1267..0.1972, |z| 0.6361..0.7260
     hub bearings     r 0.0000..0.1680, |z| 0.6340..0.7376
     corner inverter  r 0.1273..0.1759, |z| 0.6110..0.6610
     service loops    r 0.0916..0.1783, |z| 0.6020..0.6440
   No load-bearing ring dips below r 0.155 inside the annulus, which was
   drivetrain-6's second defect, and nothing static crosses the flange
   plane at annulus radii, which was its third. Three service crossings do
   run between r 0.130 and 0.155 over |z| 0.6505..0.6625, in the 12 mm of
   axial band immediately outboard of the plane and BELOW the annulus
   floor: the carrier neck and its step, the purge feed, and the three
   phase busbars. They are declared rather than hidden because they are the
   only way out of a wheel whose rim flange bore is 0.150, and at that
   station wheels-7 owns only its drum at r <= 0.094 and its rim at
   r >= 0.254, so 160 mm of radius separates them from anything.

   FRONT AXLE, checked against wheels-7 rather than inherited. Its front
   wheel puts the hub face inboard plane on |z| 0.7625 in its build code,
   the same plane drivetrain.js, drivetrain-2, drivetrain-3 and
   drivetrain-6 all land the outboard CV joint on. This module lands it
   there too: halfshaft centres at |z| 0.520, joint centre 0.215 out, joint
   55 mm long, outboard face 0.7625 exactly. The first draft pulled the
   pair in to 0.510 so the inboard joints would reach the new dog collars,
   which left every front halfshaft ending 10 mm short of the wheel it
   drives. The collars moved to |z| 0.245 instead, where they still overlap
   the output shaft inboard and now meet the joint outboard.

   FINDING for wheels-7, reported and not edited, and it is the one the
   annulus sweep does not catch because it is not in the annulus. Its park
   brake backplate is a disc of r 0.100 on |z| 0.628..0.635, translated
   70 mm inboard with the rest of the corner, and it is UNSPRUNG: it hangs
   on the upright, so suspension-4's plus or minus 3 degrees of rear steer
   swings it about the wheel centre. Swept, its inboard face reaches
   |z| 0.6236 at the radius where this module's service-loop bracket sits,
   1.4 mm INBOARD of the plane hv-4 ends its rear corner run on. Statically
   the bracket clears the backplate by 1.0 mm; at minus 3 degrees the
   backplate takes 3.4 mm of it. Nothing in this module can fix that,
   because the bracket is pinned to hv-4's landing at (-1.36, 0.425,
   +/-0.625) and the backplate's own radius covers that station through the
   whole of wheel travel, so there is no radial escape either. What the
   corner needs is one of two moves, both outside this file: wheels-7 puts
   the backplate 10 mm further outboard, or hv-4 brings its rear corner run
   end in to |z| 0.610 when it is redrawn for the hv-5 stubs above. The
   bracket here is drawn as small as the landing allows and its measured
   corner, r 0.0916 at |z| 0.611..0.627, is stated rather than rounded,
   which is what the first draft of this file got wrong: it claimed every
   station held r >= 0.14 and therefore touched nothing.

   BATTERY KEEP-OUT, raised against battery-6 and now CLOSED against
   battery-7's shipped geometry. Moving the rear centres 70 mm inboard
   pulls the motor rings into the battery envelope declared in
   design/gen4.md (x [-1.30, 1.30], y [0.13, 0.31], z +/-0.72). Measured
   intrusion per side: rotor rings x -1.300..-1.222, y 0.179..0.309,
   |z| 0.650..0.667; stator rings x -1.300..-1.261, y 0.234..0.309,
   |z| 0.650..0.720. Against battery-6's shipped geometry that put 116 of
   this module's vertices inside its floor-lid corner at x -1.290..-1.240,
   y 0.290..0.302, |z| 0.660..0.710. The annulus in design/gen7.md is the
   later authority, so the pack was the side that moved, and it did:
   sweeping battery-7's built meshes puts ZERO of its points inside the
   235 mm radius cylinder about the rear axle line over |z| 0.65..0.73,
   its rearmost lid material over |z| 0.66..0.71 stands at x -1.068, and
   the closest approach anywhere at this corner is 35 mm, rotor flange at
   (-1.249, 0.291, 0.650) to floor lid at (-1.250, 0.290, 0.615).

   FINDING for hv-4, reported and not edited, and it is the one this
   module's first draft missed. hv-4 is carried unchanged from Gen 4 and
   its rear geometry was drawn against a corner at |z| 0.81, so two of its
   parts now sit in the Gen 7 annulus:
   - the by-wire feed run, r 0.008 at y 0.36 along |z| 0.700, enters the
     235 mm cylinder at x -1.295 and leaves it at x -1.215, 80 mm per side
     straight through the machine. It interpenetrates the stator carrier
     sleeve (13 mm), a stator tooth pack (3 mm) and the rotor hoop (1 mm).
     The Gen 4 interface contract pins its rear stubs at (-1.30, 0.36,
     +/-0.70) and suspension-4 lands its bosses there, so this is not a
     routing slip, it is a contract point that the new track invalidates.
     What hv-5 and suspension-5 owe each other is a rear stub below the
     band: hold |z| <= 0.645 across x -1.30 to -1.21, or drop the run to
     y 0.20 where the cylinder does not reach.
   - the rear zonal controllers, 140 by 70 by 100 mm boxes at (-1.19,
     0.386, +/-0.615), reach |z| 0.665 and x -1.26, which puts their
     outboard aft corner inside the annulus over |z| 0.650..0.665 at
     r 0.190..0.235. The rotor flange runs 15 mm into that corner.
     Trimming the box to |z| <= 0.650, 15 mm, clears it; so does moving
     its aft face forward from x -1.260 to x -1.2245.
   For scale, drivetrain-6 had exactly one hv-4 overlap, its service loop
   inside hv-4's run end, which is the intended landing. These two are new
   and they are the price of the track move, stated here rather than left
   for an integrator to find.

   FINDING for suspension-4, reported and not edited, per the standing
   instruction in design/gen7.md. Its rear corner was drawn for a wheel at
   |z| 0.81 and the shipped file still is, so five of its parts now share
   volume with three of mine, 61 mesh pairs in total:
     rear-structure   upper link rods and their ball joints run through
                      the stator and rotor rings (36 mm at the deepest,
                      at (-1.514, 0.524, 0.650)); the knuckle plate at
                      |z| 0.724..0.756 reaches r 0.229 and takes 6 mm of
                      the annulus; the toe arm enters the hub housing 21 mm
     rear-steer       the outboard tie-rod ball joint at (-1.39, 0.31,
                      +/-0.705) sits 23 mm INSIDE the hub bearing housing
     48v-feeds        the rear damper lead crosses the hub housing 26 mm
                      deep; the connector boss at (-1.285, 0.36, +/-0.70)
                      puts 10 mm of itself inside the carrier sleeve
     active-dampers   the damper body and its valve head cross the hub
                      carrier neck at |z| 0.634..0.646, 25 mm deep
     air-springs      the bellows skirt clips the hub carrier neck 5 mm
   None of this is edited here. It is also not new in kind: drivetrain-6
   against the same shipped file gives 17 such pairs, including its own
   service loop 20 mm inside a damper. What IS new is the count and the
   depth, and the conclusion the numbers force: design/gen7.md asks for
   rear links that "reach 70 mm further inboard", and that is not enough.
   A knuckle plate 70 mm further inboard lands in the middle of the
   annulus rather than at its edge. The rear upright has to become an
   annular carrier that meets this module's neck at r <= 0.149 inboard of
   |z| 0.65, and the tie-rod and damper stations have to move with it.
   That is a suspension-5, not a translation of suspension-4.

   Three things this module DID move, because they were its own choices
   rather than a partner's: the corner inverter pack, the service loop
   bundle and the coordinator's corner harnesses. All three were drawn
   through suspension-4 hardware that a redraw is unlikely to delete, and
   all three now clear it. The reasoning is at each function below.

   Gen 7 preset partners, reconciled per design/retro-gen4.md and the
   partner-geometry rule from design/retro-gen5-apex.md:
   - hv-4 (carried, Gen 4): its two rear corner runs END at (-1.36, 0.425,
     +/-0.625) in its BUILD CODE, not at the (-1.36, 0.40, +/-0.63) its own
     comment claims and drivetrain-6 copied. The service-loop brackets are
     placed on the geometry, not the prose. Its front tunnel run ends at
     (1.30, 0.402, 0.015) and this module's front DC feed now lands on that
     exact point rather than 21 mm away from it. Its rear by-wire run and
     rear zonal boxes are a separate matter and are the finding above.
   - battery-7 and wheels-7 and thermal-7 build in this same workflow. Per
     the asymmetric-timing note in design/retro-gen4.md, only the later
     reviewer sees both sides. Bus numbers here are derived from battery-6's
     shipped string, 210 series layers, 810 V nominal, 630 to 861 V, and
     what this module needs from battery-7 is stated as a window rather
     than assumed: any bus whose sag floor stays above 600 V holds the
     corner rating without a rewind.
   - suspension-4 (carried, Gen 4): design/gen7.md asks for rear links
     70 mm further inboard, and the measured inventory above says the whole
     rear corner has to be redrawn instead. REPORTED, not edited, in the
     hub-bearings and corner-inverter panels.
   - body-7 (Gen 6, carried): unchanged, which is why the aero the new
     track unlocks is not banked this generation. Said plainly below. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'drivetrain-7',
  name: 'Drive units · Gen 7 range',
  color: 0xe8a24c,
  explode: [0, 0, 0],
  blurb: 'The generation that gives power back. 480 kW becomes 260, peak corner torque 900 Nm becomes 710, and 0 to 100 km/h goes from about 3.0 seconds to about 5.0, because peak output costs iron and copper the car pays for in every hour it is not using them. At a steady 100 km/h the drivetrain burns about 170 W where drivetrain-6 burned roughly 1,150. The rings also move 70 mm inboard per side to free the rear track, which is this module\'s largest contribution and the one it does not get to collect.',
  /* Mating features this module has to land on. Schema in SPEC.md;
     tools/check-interfaces.sh proves these against the built mesh. This is
     the male half of the front drive joint: extent 'max' means the shaft
     must reach the wheel's hub face and stop there, which is the assertion
     that would have caught the joint ending 10 mm short at Gen 8 and
     70 mm long at Gen 9. */
  interfaces: {
    'front-halfshaft-outboard': {
      kind: 'face', axis: 'z', at: 0.7625, tol: 0.002,
      part: 'front-unit', mirrored: true, extent: 'max',
      note: 'outboard CV joint face. Shaft centres at |z| 0.52, joint centre 0.215 out, joint 55 mm long, so the face lands on 0.7625.',
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
      how: 'Start with what did not change. The annulus is still a binding contract, r 0.155 to 0.235 m, and drivetrain-3 already computed that 900 Nm out of a 76 mm gap at 195 mm radius is roughly 50 kPa of magnetic shear stress, the ragged top of what liquid-cooled permanent-magnet machines reach. Shear stress does not care how much money is in the room. So this ring does not try to beat it: it holds 48 kPa and simply gets shorter. Active length falls from 76 to 60 mm and peak torque falls in exact proportion, 900 Nm to 710. That is 21% less iron to magnetise on every revolution the car ever makes, in exchange for torque the car will use for a few seconds a week. Then the pole count goes from 20 to 32 in 36 slots. More poles means a higher electrical frequency at the same road speed, 208 Hz at 100 km/h against drivetrain-6\'s 130 (780 wheel rpm on a 0.34 m dynamic rolling radius, a touch above Gen 3\'s 0.335 because a low-Crr casing at higher inflation deflects less), which sounds like the wrong direction until you follow the flux: flux per pole falls with pole count, so the yoke that carries it thins from 20 mm to 7, and the loss it burns goes as frequency times flux density squared. The frequency term rises by 1.6 and the squared-flux term falls by more than that, and 6 kg of yoke iron leaves the car with it.\n\nThe third change is the material, and it is the largest. Gen 3 chose soft magnetic composite and gave an honest reason: at 297 Hz maximum, "iron loss stops mattering", which was true when the comparison was a geared machine spinning at 1.7 kHz. It stopped being true when the road load did. This car cruises on about 4.7 kW at 100 km/h, so a hundred watts of core loss is not a rounding error, it is 2% of everything the wheels are asked to do. The stack is now 0.10 mm laminations of 6.5% silicon steel, whose specific loss at these frequencies is roughly a quarter of SMC\'s, and the three changes compound: about 24 W per ring at 100 km/h where the drivetrain-6 ring, computed from its own geometry and its own material, burns about 145. Magnetic slot wedges close the slot openings so the rotor sees a smoother field and stops paying eddy loss for the stator\'s teeth. Windings stay vacuum-potted and the corner stays dry-air purged, both carried from drivetrain-6 without change, because both were right.',
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
      tagline: 'The ring that moved the car sideways: 70 mm inboard per corner, which is worth more miles than anything else on this panel and none of them this generation.',
      mass: 14,
      count: 2,
      specs: [
        ['Magnets', 'NdFeB, 32 poles, Halbach array (Gen 5: 20 poles)'],
        ['Carrier', 'Aluminium hoop: a Halbach needs no back iron'],
        ['New centre', '|z| 0.74, was 0.81; rear track 1.48 m, was 1.62'],
        ['Mounting', 'Twelve titanium bolts, flange face |z| 0.65 exactly'],
        ['Coasting drag', 'About 12 W per corner at 100 km/h from magnets and can'],
        ['Maturity', 'Pilot line (hermetic canning at wheel scale, carried)'],
      ],
      how: 'The magnetics are drivetrain-3\'s idea in its third posting: tangentially magnetised segments between the poles steer flux inward at the stator and leave the outer face nearly dead, so there is no back iron anywhere and the carrier can be aluminium instead of steel. Thirty-two poles instead of twenty means each pole carries less flux, so the magnet thins from 12 mm to 8 and the whole array loses weight without losing airgap flux density. The hermetic 0.3 mm stainless can that drivetrain-6 introduced carries over unchanged, because a canned pole is inspected like a pressure part and an uncanned one is inspected like a chemistry experiment. Finer poles would ordinarily cost the rotor more eddy loss, since the slot harmonics that heat the can arrive more often; the stator\'s magnetic slot wedges cancel that and then some, and the pair lands at about 12 W of magnet and can drag per corner at 100 km/h. That figure is stated as magnet and can only, which is what drivetrain-6\'s 55 W row also measured. This generation states the whole coasting number somewhere it can be found: core plus magnets plus bearings and seals is about 51 W per corner, against about 188 for the drivetrain-6 corner computed the same way.\n\nThe geometry is the real news. The flange bolt circle moves from |z| 0.81 to |z| 0.74 at the wheel centre, and the rotor flange\'s inboard face now sits exactly on the contract plane at |z| 0.650 rather than 2 mm off it, which is a defect drivetrain-6\'s reviewer found and this module does not inherit. Seventy millimetres per side is 140 mm of rear track, 1.62 m down to 1.48, and it is the number the Gen 6 aero audit said the whole car was waiting on. That audit rejected body-7\'s claimed Cd 0.105 in favour of 0.118 for one reason: the haunch is pinned at 0.950 half-width by the old rear track, so all 400 mm of plan closure gets crammed into the last 845 mm at 21 to 33 degrees, past the 12 to 15 degree limit where flow stays attached, and the tail separates. The size of the prize belongs to wheels-7, which owns the tyre and did the derivation off body-7\'s own stations, and this panel takes its number rather than inventing a friendlier one: the haunch requirement falls from 0.950 to 0.852 half-width, the closure over that last 845 mm falls from 0.400 m to 0.302, the mean plan half-angle goes 25.2 degrees to 19.7, and the honest part of that sentence is that 19.7 is still outside the attached band. The track alone does not hand the body Cd 0.105; it hands it about 0.107, CdA 0.2244 against 0.2477, and roughly 69 miles. That 69 is on the 105 Wh per mile target baseline design/gen7.md sets and wheels-7 uses throughout; run the same Cd step against the 119.7 Wh per mile this configuration actually models and it is about 52 miles. Neither number is collected here, and the smaller one is the one a Gen 8 would start from. Moving a wheel also breaks things, and this one broke the pack: a ring at |z| 0.74 reaches into the battery envelope that design/gen4.md has declared since Gen 4, x -1.300 to -1.222 and y 0.179 to 0.309 per side, and it landed 116 vertices inside battery-6\'s actual floor-lid corner. The pack was the side that moved, because design/gen7.md is the later authority, and battery-7 shipped with the cut made: zero of its points fall inside the 235 mm cylinder this ring needs over |z| 0.65 to 0.73, and the closest it comes anywhere at this corner is 35 mm.',
      why: 'Those 69 miles are not in this generation, and saying so is the point. body-7 carries unchanged by instruction, so the constraint is released and the prize is left on the table for Gen 8. It would be very easy to write this panel as though moving the wheel had already bought the drag reduction; the aero audit is on record about how the last such claim went. What this module actually delivers is the precondition, and the honest ledger reads: 140 mm of track, 69 miles enabled on wheels-7\'s arithmetic, zero banked, one design authority (design/gen7.md) that says to note it as a Gen 8 opportunity rather than edit the body.',
      fail: [
        'A 1.48 m rear track against a 1.62 m front track makes the car deliberately asymmetric. Rear lateral load transfer for a given cornering force rises about 9%, which pushes the limit balance toward oversteer; suspension-4\'s anti-roll decoupler has the authority to trim it, and that check belongs to whoever reviews wheels-7 against suspension-4, reported here rather than edited.',
        'The can is still hermetic until it is not, and a breach is still invisible from outside; the tell is still a slow per-corner back-EMF amplitude drift, watched every drive, and it is still the pilot-line claim on this panel.',
        'Thirty-two poles means thirty-two segment joints per ring instead of twenty, so the adhesive bond population that holds the array against 4 kN per millimetre of magnetic pull grew by 60% while each joint got smaller. More joints is more places to be wrong, and the retention argument restarts its statistics.',
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
        ['Cornering load', 'Up about 9% at the outer rear on the 1.48 m track'],
        ['Maturity', 'Hybrid bearings production practice; probes pilot line'],
      ],
      how: 'The unit is drivetrain-6\'s, and the three answers it gave to drivetrain-3\'s three confessions all carry: silicon nitride rolling elements so the inverter\'s common-mode current has no path and the grounding ring stays deleted, ceramic hardness so the brinelling threshold moves even though the mechanism does not, and three eddy-current probes trending the hub flange orbit every revolution so preload relaxation is telemetry rather than archaeology. Two things about it changed for Gen 7 and they pull in opposite directions. Peak corner torque fell from 900 to 710 Nm, which takes about a kilogram of race section and carrier web out of each unit. Then the rear track narrowed by 140 mm, and for a given cornering force the load transferred onto the outer rear wheel rises roughly in inverse proportion to track: about 9% more load on the outer bearing, and since ball-bearing life goes as the cube of the load ratio, about a quarter less L10 life if nothing is done. Something is done: the ball complement grows to put the life back where it was, and the net mass change is a single kilogram out.\n\nThe carrier structure was redrawn rather than inherited, and the reason is that the load path has to thread a hole. drivetrain-6\'s stator carrier sleeve ran r 0.150 to 0.156, dipping five millimetres inside the annulus floor and into volume the wheel owns. Here the sleeve is r 0.1555 to 0.168, wholly inside the contract, and it reaches the upright through a neck at r 0.132 to 0.149, because wheels-7\'s rim flange has a 0.150 bore and nothing wider gets past it. The step between the two sits at |z| 0.6505 to 0.6625, where wheels-7 owns only its drum at r 0.094 and its rim at r 0.254, so the carrier passes through a 160 mm wide gap it did not have to invent. The gap probes moved too, and the reason is worth stating: drivetrain-6 aimed them at the rotor flange, which in this corner is bolted face to face against the rim flange and cannot be seen at all. They now read the hub flange from the housing, which is where bearing tilt is largest anyway, and every one of them sits on the housing instead of floating, because design/retro-gen5-apex.md recorded that a part which touches nothing reads as floating even when it passes every zone check. One partner is reported rather than solved, and the report grew when it was measured instead of estimated. Against suspension-4\'s SHIPPED file, which still draws its rear corner around a wheel at |z| 0.81, the relocated corner does not leave a comfortable gap to the rear-steer link: that link\'s outboard ball joint at (-1.39, 0.31, plus or minus 0.705) sits 23 mm INSIDE this housing, the knuckle toe arm enters it 21 mm, the rear damper body and valve head cross the carrier neck at |z| 0.634 to 0.646, and the 48 V damper lead runs 26 mm through the housing. Five suspension-4 parts share volume with three of mine across 61 mesh pairs, listed with depths in this file\'s header. Move the rear-steer link the 70 mm design/gen7.md asks for and its joint does land 12 mm inboard of the housing face and 3 mm outside its radius, which is worth knowing, but a translated corner is not a redrawn one: the same 70 mm carries suspension-4\'s knuckle plate from the edge of the annulus into the middle of it. What this axle actually needs is an upright that becomes an annular carrier and meets the neck above at r 0.149 or less, inboard of |z| 0.65. Reported, not edited, because a Gen 4 partner is not this module\'s to redraw.',
      why: 'These are still the least optional kilograms in the system, because gap collapse is still a magnet ring meeting a coil ring at road speed, and the magnetic negative spring still pulls about 4 kN per millimetre of eccentricity whatever the track is. What Gen 7 adds is a reminder that moving a wheel is never free: the aero prize came with a bearing bill, the bill was 9% of load and a quarter of life, and it was paid in steel rather than argued away.',
      fail: [
        'Ceramic elements still fail by cracking rather than the slow spalling steel announces for thousands of kilometres. The pairing with gap telemetry is deliberate and unchanged: quieter failure mode, louder instrumentation.',
        'The narrower track raises cornering load every corner of the car\'s life, not occasionally, so the recovered life depends on a ball complement change holding its preload distribution across temperature. That is a rig claim today and a fleet claim later.',
        'Every suspension-4 number above is measured against a file that everyone already agrees is out of date, so it describes today\'s model rather than tomorrow\'s axle. It is quoted anyway, because design/retro-gen4.md says a partner claim gets verified rather than inherited, and because the alternative is what the first draft of this panel said, that the tightest thing the relocated corner created was a 12 mm gap. It was not a gap. It was 23 mm of overlap, and nobody would have found it by reading.',
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
        'The pack sits at x -1.500 to -1.376, y 0.478 to 0.528, |z| 0.611 to 0.661: a 32 mm box in a 40 mm window, its lid 3.2 mm under suspension-4\'s two rear upper links and its floor 5 mm over that corner\'s air-spring top plate, with the phase busbars dipping outside the box to within 1 mm of the same plate. Those are static numbers and static numbers are not clearances, which is the part worth saying out loud. This pack is UNSPRUNG, bolted to the carrier and living the corner\'s 40 g, while the air-spring top plate is body-side, standing on the bellows the spring link compresses. One millimetre of static gap between those two is one millimetre of wheel travel. The 70 mm move is what created it: drivetrain-6\'s pack sat at |z| 0.674 to 0.706, outboard of the spring footprint entirely, and this one sits under it. There is no room to solve it inside this file. Outboard is the stator yoke, forward is the service-loop column, and the spring stands at (-1.447, 0.60) only because suspension-4 was drawn for a wheel at |z| 0.81. It belongs on the list of things the rear-corner redraw owes, beside the 61 mesh pairs in this file\'s header. The numbers are here so the next reviewer measures rather than trusts, and the first draft deserves naming: a 46 mm pack sitting 18 mm lower put 560 sampled points inside that spring plate.',
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
      how: 'Two loops per corner, each rated to carry the whole corner alone, joined at the inverter through ideal-diode ORing stages: that architecture is drivetrain-6\'s and it carries because it turned a wear-out failure from announced into unhurried. The Gen 7 story is what moving the wheel did to it. hv-4 is a Gen 4 module carried unchanged, so its corner runs still terminate where they always did, and this module lands on the coordinates in hv-4\'s build code, (-1.36, 0.425, +/-0.625), rather than the (-1.36, 0.40, +/-0.63) that hv-4\'s own comment claims and that drivetrain-6 copied out of the prose. That is a 25 mm correction and it exists because design/retro-gen5-apex.md made partner geometry, not partner prose, the standard. The corner then moved 70 mm inboard while the body-side bracket stayed put, so the free span between fixed and moving ends shrank by 70 mm with the wheel travel unchanged. A shorter umbilical is not a gentler one: the same suspension stroke folded into a shorter cable is a tighter bend radius and more strand strain per kilometre.\n\nWhat pays for it is the same arithmetic that cut the power. Peak corner current falls from 130 A to 80 because peak corner power fell from 105 kW to 65 on the same bus, so each loop drops from 16 mm2 to 10. Bending strain on a stranded conductor is the strand radius divided by the bend radius, and a 10 mm2 class 6 bundle reaches the same strand strain at a 70 mm radius that the 16 mm2 bundle needed 90 mm for. The loop lost 70 mm of span and gained 20 mm of bend allowance, and the two very nearly cancel; the remainder is taken up as deliberate slack routed forward of the bracket rather than pretended away. The 4 mm dry-air purge line to the stator cavity still rides the same jacketed bundle, so the corner\'s whole umbilical still flexes as one engineered object, and the per-loop resistance trend still runs every drive, because strand fatigue is still the thing this part exists to see coming.',
      why: 'Every serious argument against in-wheel drive names unsprung mass first and this cable second. Gen 3 answered with monitoring, Gen 5 answered with a twin, and Gen 7 had to answer a new question, which is what happens to a fatigue-critical flexing joint when you move one of its ends. The answer here is that it got harder and then the voltage arithmetic paid for it, and the honest version of that sentence includes the first half.',
      fail: [
        'Both loops still share one routing plane and one bracket, so the redundancy is against fatigue and not against geometry: the kerb strike that crushes one crushes both, and the corner isolation that follows is the same event Gen 3 owned.',
        'Ten square millimetres is a smaller conductor in a wetter, saltier place, and connector fretting scales with contact count, not with copper area; the flagged-loop policy still replaces the cable with both its connectors and attempts no diagnosis, because the ambiguity did not shrink with the wire.',
        'The 70 mm bend radius is a design minimum on nominal geometry, and suspension-4 has not yet been redrawn for the 1.48 m track. If its rear links end up with more articulation than the current geometry implies, this is the part that finds out first.',
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
      how: 'The yaw arithmetic first, because it is the cost. A pair of opposed rear wheels makes a yaw moment equal to the longitudinal force difference times the track. Continuous torque per corner fell from 550 to 400 Nm and the track fell from 1.62 to 1.48 m, so standing yaw authority from the rear pair falls from about 2,620 Nm to about 1,740, a third of it gone: roughly a quarter from torque and the remaining tenth from the track itself. Nothing recovers that, and the panel says so. What softens it is that suspension-4\'s plus or minus 3 degrees of rear steer is still the fourth input and still costs nothing to hold, so the split that drivetrain-6 learned stands: torque buys the transient, geometry holds the steady state, and the coordinator spends the smaller torque budget only where an angle cannot arrive fast enough. Ownership is unchanged and exact, because it has to be: suspension-4\'s chassis ECU owns the rear-steer schedule and its fail ladder, the two computers exchange yaw demands at 1 kHz over hv-4\'s zonal bus, and a braking demand from the wheels-7 master unit overrides any vectoring demand within 2 ms, always.\n\nThe new job is connection. With the front axle mechanically disconnected at cruise the car is rear drive with a third of its old yaw authority, and this box decides when that stops being acceptable. Commanded reconnect takes about 180 ms, of which roughly 140 is spinning the front rotor and both gear stages up to synchronous speed before the dog collars can engage. That is far too slow to be a reaction, so it is not one: the coordinator reconnects on prediction, from steering rate, pedal rate, the friction estimate, and autonomy-4\'s forward camera wedge, the same preview feed suspension-4 uses for its valves. Predicted reconnect lands in about 40 ms of actual clutch travel because the rotor is already turning. The arbitration is deliberately asymmetric and biased toward waking up: any of a dozen cues closes the clutches, only a sustained quiet cruise opens them, and the energy cost of a wrong wake-up is a few watt-hours while the cost of a wrong sleep is a car that understeers into an event with one axle.',
      why: 'Gen 5 argued that authority compounds, and it was right, so Gen 7 has to be honest that it just spent some. What it bought is a drivetrain whose fixed losses at cruise fell by roughly 980 W, and yaw authority is a capability the car uses for seconds while cruise loss is a bill it pays for hours. That is the whole generation in one trade. The part that is genuinely new engineering rather than genuinely new sacrifice is the arbitration: a car that can switch between two drivetrain topologies at speed needs one computer that owns the switch, and putting it here rather than in the chassis ECU keeps the safety demotion clean, because this box has always been allowed to fail into three-motor allocation and now fails into two.',
      fail: [
        'A stuck-open clutch is the failure that matters, and it is silent: the car simply is not all-wheel drive any more, and finds out at the first split-grip launch. The detection is a torque-versus-speed residual on the front machine checked at every reconnect, and the fallback is that the rear pair plus friction braking is a complete, if slower, car.',
        'Prediction that is biased toward waking up will wake up wrongly, and every false reconnect spends the energy this part exists to save. The bias is deliberate and the ledger is real: the model budgets a few false wakes per hundred kilometres, which is watt-hours, against a single late one, which is a handling event.',
        'Two computers negotiating one yaw budget was already a live-disagreement fault class in Gen 5; a third state, whether the front axle even exists right now, multiplies the cases the dissimilar-code validation has to cover, and every release of either controller reopens the file.',
      ],
      explode: [0, 0.5, 0],
    },
    'front-unit': {
      name: 'Front drive unit',
      tagline: 'Halved to 130 kW and sized by the braking it can catch, not the acceleration it can make.',
      mass: 38,
      specs: [
        ['Machine', 'Yokeless axial flux, 130 kW / 240 Nm (Gen 5: 270 / 450)'],
        ['Reduction', '5.95:1 two-stage, open diff (carried since Gen 2)'],
        ['Sizing case', 'Regen capture: 130 kW is about 0.32 g at 100 km/h'],
        ['Housing', 'Additively built AlSi10Mg, printed load-path ribs (carried)'],
        ['Mass detail', '28 kg unit + 8 kg halfshafts + 2 kg mounts'],
        ['Maturity', 'Machine production practice; AM housing pilot line'],
      ],
      how: 'The machine is the axial-flux family\'s fourth posting, rescaled rather than redesigned: the same yokeless topology with concentrated coils on two stator discs either side of a carbon-hooped rotor, the same 5.95:1 two-stage reduction and open differential that drivetrain-2 introduced, in the same additively built housing whose ribs follow a topology optimiser\'s load paths. Active diameter comes down and the rating with it, 270 kW and 450 Nm to 130 and 240. The question is what sets the new number, and the answer is not acceleration. Under braking, load transfer puts roughly 70% of the car\'s weight on the front axle, so front regeneration is where the recoverable energy actually is, and 130 kW at 100 km/h is about 0.32 g of deceleration captured electrically. That covers the overwhelming majority of real decelerations, which means the friction brakes stay cold and the energy comes back. Sizing the axle by the deceleration it can catch rather than the acceleration it can deliver is the single most range-shaped decision in this module.\n\nThe rest is what the car gives up, stated straight. Combined output is 260 kW against drivetrain-6\'s 480. Total tractive force at launch is about 8,400 N against about 13,200, so 0 to 100 km/h goes from around 3.0 seconds to around 5.0, and the car is torque limited the whole way rather than traction limited, which means it no longer even reaches the tyres\' capability. Some of that loss was already notional: wheels-7 trades grip for a Crr of 0.0038, so a good share of drivetrain-6\'s 480 kW would not have reached the road through these tyres anyway. That is a defence of the decision, not the reason for it. The reason is mass and iron: peak power costs stator area, magnet volume, conductor section and cooling capacity, all of which are present and lossy on every single kilometre, and a car built to travel 1,800 of them in one sitting cannot justify carrying a launch it uses for four seconds a month.',
      why: 'There is a ghost on this panel worth naming. Gen 1 and Gen 2 ran an induction machine on the front axle for a reason drivetrain-2 stated exactly: "its best operating state, off, cannot be improved", because an induction rotor has no magnets and therefore no drag when de-energised. Gen 3 moved the permanent-magnet axial-flux unit forward and quietly threw that property away, and nobody noticed for four generations because the road load was high enough to hide it. Gen 7 noticed. The property is bought back on the next panel with two dog clutches instead of a different machine, because an induction machine idles free but drives worse, and this axle\'s job is now regeneration, where every point of efficiency is energy going back into the pack.',
      fail: [
        'Full torque through steered Rzeppa joints has been an open ledger since Gen 3 and the boot statistics are still accumulating; less torque helps the joints and does nothing for the boots, which fail on angle and heat rather than on load.',
        'An additively built housing still swaps die-cast porosity, a known defect population, for lack-of-fusion voids, an unknown one. The helium pressure check carries over, and pilot-line honesty says the defect statistics restart at zero every time the geometry changes, which it just did.',
        'A 130 kW front axle plus a 130 kW rear pair means sustained grade climbing with a trailer has no reserve to hide in. The derate arrives on a long alpine climb rather than never, and the car will tell the driver it is a range car at exactly the moment they wanted it to be something else.',
      ],
      explode: [0.4, -0.05, 0],
    },
    'front-disconnect': {
      name: 'Front axle disconnect',
      tagline: 'Two dog clutches so the front machine, both gear stages and the whole oil sump can stop turning: the largest single lever in this module.',
      mass: 5,
      specs: [
        ['Type', 'Two dog collars, one per differential output, 48 V actuated'],
        ['Why two', 'One leaves the carrier churning; two stop everything'],
        ['Saved at cruise', 'About 780 W at 100 km/h that the front axle no longer burns'],
        ['Engagement', 'About 180 ms commanded, about 40 ms with the rotor pre-spun'],
        ['Feedback', 'Collar position, output speed, and a torque residual check'],
        ['Maturity', 'Production practice'],
      ],
      how: 'A permanent-magnet machine geared to the road cannot be switched off. With the wheels turning at 100 km/h the front rotor turns at about 4,640 rpm whatever the inverter does, and open-circuit core loss and windage in a machine that size come to roughly 540 W, with another 180 in the two gear stages churning oil and loading their bearings, and about 60 in the inverter keeping the bus honest. That is close to 780 W of pure parasitic draw on a car whose entire road load at that speed is about 4,700, and it is there every hour of every long drive. So the axle gets to stop. Two dog collars, one on each differential output, are pushed by 48 V actuators fed from hv-4\'s dual by-wire feeds, and when they open the halfshafts turn with the wheels while the differential carrier, both gear stages, the rotor and every litre of oil in the sump go still. Production cars that do this use one clutch and accept the carrier still turning in its bath, because the second clutch costs money. Cost is not an argument on this project, and the second collar deletes the last of the churning.\n\nThe reconnect is the engineering. There is no synchroniser, so the collars can only engage when the speeds already match, which in a car with an electric motor is easier than in a car with a gearbox: the machine spins its own rotor and both gear stages up to synchronous speed using its resolver against the wheel speed sensors, and it has 240 Nm to do it with against roughly 0.07 kg m2 of inertia reflected to the rotor, so 486 rad/s arrives in about 140 ms. Add collar travel and the commanded reconnect is about 180 ms. That is far too slow to be a reaction, which is why the coordinator on the neighbouring panel reconnects on prediction and keeps the rotor pre-spun whenever the situation is even slightly interesting, cutting the actual engagement to about 40 ms. On the mixed cycle the efficiency model uses, the disconnect plus the corner work moves battery-to-wheel efficiency from 0.945 to about 0.958, roughly 1.2% of range or near 20 miles; at a steady 100 km/h, which is what a record attempt actually looks like, the same hardware is worth about 16 Wh per mile. The smaller number is the one this module leads with.',
      why: 'Gen 1 got this right by accident and Gen 3 lost it by inattention. An induction front axle costs nothing when idle, which drivetrain-2 said in one sentence and then the ladder forgot for four generations while permanent magnets took over the front. The disconnect buys the property back without giving up the regeneration efficiency that makes a magnet machine the right choice for the axle that catches most of the braking. It is 5 kg that removes 780 W, against 17 kg of mass taken out elsewhere in this module, which on js/efficiency.js\'s own cycle is 0.48 Wh per km of rolling and stop-go and works out at about 10 miles. The module\'s net is the 12 kg between them. The comparison is the lesson: on a car this slippery, fixed losses matter far more than mass, and any range work that starts with a diet is starting in the wrong place.',
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
      how: 'One power-electronics family in two homes is a Gen 1 idea in its third silicon generation: the corner and the pocket share dies, gate drivers, balancing logic and one qualification file, and the flying-capacitor bridge that lets 650 V GaN serve an 810 V nominal bus is the same argument in both places. Halving the axle rating halves the current and lets the DC link fall from 30 to 16 uF of stacked ceramic. The genuinely new behaviour is that this inverter is allowed to be completely off. In drivetrain-6 the front machine was the daily machine, so its inverter held the bus and modulated on every kilometre; here the disconnect opens first and the gates stop second, so the inverter is not idling into a spinning magnet field, it is dark next to a stationary one. That ordering matters: opening the clutch while the inverter still commands current would leave torque going nowhere, and closing it while the gates are off would let the machine be back-driven into an uncontrolled rectifier.\n\nThe reconciliation paragraph is the uncomfortable one. hv-4 is carried unchanged from Gen 4, and its front run is 3.1 m of 50 mm2 copper sized against Gen 3\'s 531 A at 508 V. At battery-6\'s 810 V nominal, drivetrain-6\'s 270 kW peaked at 333 A and the run was already generous. At this axle\'s 130 kW the run peaks near 160 A, about 27% of its 600 A thirty-second rating, and roughly 1.7 kg of that copper pair now has no job at all. On a generation whose entire mass ledger is being scrutinised for miles, 1.7 kg of dead conductor is worth about a mile of range, and it stays, because hv-4 is not this generation\'s to edit. The panel names the number rather than pretending a carry-over is free. One thing does get fixed: this module\'s DC feed now terminates at (1.30, 0.402, 0.015), which is where hv-4\'s tunnel run actually ends in its build code, instead of the 21 mm away that drivetrain-6 landed it.',
      why: 'Retiring the hardest qualification in the family into the easiest seat was drivetrain-6\'s good idea and it carries. What Gen 7 adds is the discipline of naming what the carried architecture costs: a harness sized for a car that no longer exists is 1.7 kg of copper travelling 1,800 miles to do nothing, and a generation that claims miles from a 12 kg drivetrain diet has to be willing to count that in the other direction.',
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
const WY = P.wheelY;            // 0.355, wheel centre height
/* NEW rear wheel centre |z|. P.wheelZ (0.81) still governs the FRONT axle;
   design/gen7.md moves the rear centres to 0.74 and this module and
   wheels-7 are the only two that may use the new number. */
const REAR_Z = 0.74;
const RING_Z = 0.69;            // motor annulus centre plane, |z| 0.65..0.73
const FLANGE_Z = 0.65;          // contract flange face, |z|

/* Front unit axes, carried from drivetrain-2's installation through Gen 3
   and Gen 5. The machine shrank; the axes did not move. */
const A7 = [1.48, 0.40];        // motor disc axis
const B7 = [1.505, 0.458];      // intermediate axis
const C7 = [1.45, P.wheelY];    // ring gear / halfshaft axis
const GZ7 = -0.16;              // gear case centre plane, z

/* Cylinder with its axis along z instead of y. */
function zc(mesh) { mesh.rotation.x = Math.PI / 2; return mesh; }

/* Annulus (ring) extruded along z, centred on its own origin. */
function ringMesh(rOut, rIn, depth, mat, seg = 32) {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOut, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, rIn, 0, Math.PI * 2, true);
  s.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: seg });
  geo.translate(0, 0, -depth / 2);
  return lib.mesh(geo, mat);
}

/* One halfshaft, centred on its own origin so lib.spin works.
   Local +z points outboard. Same forgings as Gen 1 through Gen 5. */
function halfshaft() {
  const g = new THREE.Group();
  const shaft = zc(lib.cyl(0.022, 0.40, M.steel, 16));
  g.add(shaft);
  for (const s of [-1, 1]) {
    const joint = zc(lib.cyl(0.036, 0.055, M.darkSteel, 18));
    joint.position.z = s * 0.215;
    g.add(joint);
    const boot = lib.cone(0.042, 0.07, M.rubber, 20);
    boot.rotation.x = s * Math.PI / 2;
    boot.position.z = s * 0.155;
    g.add(boot);
  }
  return g;
}

/* Rotor ring: canned 32-pole Halbach array on an aluminium hoop, bolted to
   the wheels-7 rim flange at the |z| 0.65 contract plane. Lives entirely
   inside the annulus (r 0.155..0.235, |z| 0.65..0.73).

   Defect corrected from drivetrain-6: its rotor flange inboard face sat at
   |z| 0.722 against a 0.720 contract plane, a 2 mm standoff. Here the
   flange is 8 mm thick at local z -0.036 from a ring centre of 0.69, so its
   inboard face lands on |z| 0.650 exactly. */
function rotorRingPart(s) {
  const part = lib.part('rotor-rings', [0, 0, s * 0.90]);
  const spinG = new THREE.Group();

  /* structural hoop, r 0.2070..0.2160, |z| 0.658..0.728. Aluminium because
     a Halbach array self-closes its flux and needs no back iron, and a
     non-magnetic hoop keeps the outer face field near zero. */
  const hoop = ringMesh(0.2160, 0.2070, 0.070, M.alu, 44);
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
     1.0 mm of mechanical clearance, carried from Gen 5. */
  const can = ringMesh(0.1990, 0.1982, 0.062, M.alu, 44);
  can.position.z = s * 0.003;
  spinG.add(can);

  /* rotor flange: inboard face ON the contract plane at |z| 0.650 */
  const flange = ringMesh(0.233, 0.188, 0.008, M.alu, 44);
  flange.position.z = -s * 0.036;
  spinG.add(flange);

  /* twelve titanium bolts, heads on the outboard face of the flange and
     outboard of the hoop bore so the joint reads as one fastener set */
  const bolts = lib.bolts(12, 0.224, 0.0045, M.steel);
  bolts.rotation.x = Math.PI / 2;
  bolts.position.z = s * (0.008 - 0.036 + 0.0027);
  spinG.add(bolts);

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
   wheels-7 rim flange. That flange measures r 0.150..0.244 over
   |z| 0.6460..0.6500 in wheels-7's build code, so the crossing corridor is
   the 0.150 bore, and this tube's swept surface holds r <= 0.1471 through
   |z| 0.6455..0.6500 and 0.1484 at the plane itself. */
function statorRingPart(s) {
  const part = lib.part('stator-rings', [0, 0, s * 0.90]);
  const g = new THREE.Group();
  g.position.set(RX, WY, s * RING_Z);

  /* yoke r 0.174..0.181, |z| 0.655..0.725. Seven millimetres because 32
     poles carry a third less flux each than Gen 5's 20 did. */
  const yoke = ringMesh(0.181, 0.174, 0.070, M.steel, 44);
  g.add(yoke);

  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const x = Math.cos(a), y = Math.sin(a);
    const tooth = lib.box(0.015, 0.013, 0.060, M.steel);
    tooth.position.set(x * 0.1885, y * 0.1885, 0);
    tooth.rotation.z = a;
    g.add(tooth);
    const coil = lib.box(0.013, 0.026, 0.048, M.copper);
    coil.position.set(x * 0.1875, y * 0.1875, 0);
    coil.rotation.z = a;
    g.add(coil);
  }

  /* magnetic slot wedges: the band that closes the slot openings so the
     rotor stops paying eddy loss for the stator's teeth */
  const wedges = ringMesh(0.1972, 0.1960, 0.060, M.plasticLt, 44);
  g.add(wedges);

  /* potting end rings: the epoxy fill read as two resin bands */
  for (const e of [-1, 1]) {
    const pot = lib.torus(0.1875, 0.005, M.plasticLt, 40, 8);
    pot.position.z = e * 0.031;
    g.add(pot);
  }

  /* water jacket in the gap between the carrier sleeve OD (0.168) and the
     yoke bore (0.174), so nothing cooling-related dips under r 0.155 */
  for (const e of [-1, 1]) {
    const jac = lib.torus(0.1712, 0.0032, M.coolant, 40, 8);
    jac.position.z = e * 0.020;
    g.add(jac);
  }

  /* coolant stubs stay wholly inside the annulus at |z| 0.656..0.680, where
     wheels-7 owns only the drum at r <= 0.094 and the rim at r >= 0.254.
     The run onward to thermal-7 passes behind the upright and is implied,
     the house pattern since Gen 3. */
  for (const [da, mat] of [[-0.35, M.coolant], [0.35, M.coolantHot]]) {
    const a = Math.PI * 1.5 + da;
    const stub = zc(lib.cyl(0.007, 0.024, mat, 10));
    stub.position.set(Math.cos(a) * 0.1712, Math.sin(a) * 0.1712, -s * 0.022);
    g.add(stub);
  }

  /* phase terminal land on the inboard end face, r 0.163..0.181, spanning
     |z| 0.6515..0.6595. It stands 1.5 mm OFF the contract plane, and the
     1.5 mm is the point. At those radii the thing immediately inboard of
     the plane is wheels-7's rim flange and its co-cured titanium insert,
     r 0.150..0.244 over |z| 0.646..0.650, and that face turns with the
     wheel. A static terminal ring drawn flush on 0.650, which is what the
     first draft did, is a static face bearing on a rotating one at 780 rpm.
     Only the rotor flange is entitled to touch that plane. */
  const term = ringMesh(0.181, 0.163, 0.008, M.plastic, 40);
  term.position.z = -s * 0.0345;
  g.add(term);
  for (const adeg of [75, 90, 105]) {
    const a = (adeg / 180) * Math.PI;
    const stud = zc(lib.cyl(0.006, 0.010, M.copper, 10));
    stud.position.set(Math.cos(a) * 0.172, Math.sin(a) * 0.172, -s * 0.033);
    g.add(stud);
  }

  /* dry-air purge feed: stub on the jacket, then down through the rim
     flange bore at r <= 0.1456 to the landing the service-loop bundle
     reaches. Angle 55 degrees puts it on the forward side of the corner,
     where the bundle now falls, and clear of the inverter pack at 71 to
     107 degrees and the coolant stubs at 250 and 290. */
  const pa = (55 / 180) * Math.PI, pc = Math.cos(pa), ps = Math.sin(pa);
  const pStub = zc(lib.cyl(0.004, 0.024, M.plasticLt, 8));
  pStub.position.set(pc * 0.1712, ps * 0.1712, -s * 0.022);
  g.add(pStub);
  part.add(lib.tube([
    [RX + pc * 0.1712, WY + ps * 0.1712, s * 0.672],
    [RX + pc * 0.160, WY + ps * 0.160, s * 0.660],
    [RX + pc * 0.145, WY + ps * 0.145, s * 0.653],
    [RX + pc * 0.134, WY + ps * 0.134, s * 0.645],
    [RX + pc * 0.130, WY + ps * 0.130, s * 0.638],
  ], 0.004, M.plasticLt));

  part.add(g);
  return part;
}

/* Hub bearing unit: preloaded double-row hybrid bearing, five-spoke carrier
   web, a neck that threads the wheels-7 rim flange bore, the static stator
   sleeve, and the rotating stud flange. The Gen 3 grounding ring stays
   deleted (ceramic elements do not conduct).

   Defect corrected from drivetrain-6: its stator sleeve ran r 0.150..0.156
   and dipped 5 mm inside the r 0.155 annulus floor. Here the load path is
   explicit and every station is checked against wheels-7's build code:
     spokes  r 0.068..0.144 over |z| 0.6395..0.6495 (backplate ends 0.635)
     neck    r 0.132..0.149 over |z| 0.634..0.654  (flange bore is 0.150)
     step    r 0.145..0.156 over |z| 0.6505..0.6625 (drum OD 0.094, rim 0.254)
     sleeve  r 0.1555..0.168 over |z| 0.657..0.729  (inside the annulus)
   The housing OD of 0.072 is the drum bore wheels-7 chose, so the two
   modules meet on that number from both sides. */
function hubBearingPart(s) {
  const part = lib.part('hub-bearings', [0, 0, s * 0.78]);
  const g = new THREE.Group();
  g.position.set(RX, WY, s * 0.685);

  const housing = zc(lib.cyl(0.072, 0.075, M.castAlu, 28));
  g.add(housing);

  /* carrier web: five spokes inboard of the rim flange, clear of the park
     brake backplate below them and of the flange bore outboard of them.
     Their outboard face is at |z| 0.6495, 2 mm INTO the housing's inboard
     face at 0.6475, because the web is the load path from the housing out
     to the neck and a web that stops 1.5 mm short of the bearing it
     carries reads as floating. That 1.5 mm was the first draft.
     PHASE IS A PAIR NUMBER. wheels-7 phases its two park-brake shoe arms
     to 1.214 and 4.356 radians and says in its own comment that they are
     placed to miss a five-spoke hub carrier; with the arm offset of 0.36
     they actually land at 1.574 and 4.716, exactly half a spoke pitch
     apart, so no five-spoke phase clears both by more than a quarter
     pitch. At the shipped 0.9 the 4.716 arm and the 4.671 spoke shared
     3 mm of the same volume over |z| 0.636..0.646. Base 1.26 puts both
     arms 0.314 rad off the nearest spoke and the web is 4 mm narrower,
     which turns a 1.8 mm interference into a 2.6 mm gap at the arm's
     inner radius and 4.4 mm at its outer. */
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 1.26;
    const spoke = lib.box(0.076, 0.020, 0.010, M.castAlu);
    spoke.position.set(Math.cos(a) * 0.106, Math.sin(a) * 0.106, -s * 0.0405);
    spoke.rotation.z = a;
    g.add(spoke);
  }

  /* neck through the rim flange bore, then the step out to the sleeve */
  const neck = ringMesh(0.1490, 0.1320, 0.020, M.castAlu, 40);
  neck.position.z = -s * 0.041;
  g.add(neck);
  const step = ringMesh(0.1560, 0.1450, 0.012, M.castAlu, 40);
  step.position.z = -s * 0.0285;
  g.add(step);

  /* dry-air purge landing on the neck, where the service-loop bundle ends.
     55 degrees, the forward side, following the bundle off the air spring */
  const pa = (55 / 180) * Math.PI;
  const pBoss = lib.box(0.016, 0.016, 0.014, M.plasticLt);
  pBoss.position.set(Math.cos(pa) * 0.138, Math.sin(pa) * 0.138, -s * 0.0435);
  g.add(pBoss);

  /* stator carrier sleeve: r 0.1555..0.168, wholly inside the annulus */
  const sleeve = ringMesh(0.168, 0.1555, 0.072, M.castAlu, 44);
  sleeve.position.z = s * 0.008;
  g.add(sleeve);

  /* three eddy-current gap probes on the housing's outboard face, reading
     the hub flange orbit once per revolution. drivetrain-6 aimed these at
     the rotor flange, which in the Gen 7 corner is bolted face to face
     against the wheels-7 rim flange and cannot be seen; bearing tilt is
     the quantity wanted anyway, and this is where it is largest. */
  for (const a of [1.55, 3.65, 5.75]) {
    const probe = lib.box(0.012, 0.012, 0.007, M.sensor);
    probe.position.set(Math.cos(a) * 0.062, Math.sin(a) * 0.062, s * 0.0285);
    probe.rotation.z = a;
    g.add(probe);
  }

  /* stud flange on the rotating race. 0.685 is this group's plane, so the
     face lands 15 mm inboard of the new REAR_Z wheel centre, on the r 0.060
     spigot wheels-7's rear disc bolts to. */
  const studSpin = new THREE.Group();
  const studFlange = zc(lib.cyl(0.060, 0.014, M.steel, 24));
  studSpin.add(studFlange);
  const studs = lib.bolts(5, 0.048, 0.006, M.steel);
  studs.rotation.x = Math.PI / 2;
  studs.position.z = s * 0.009;
  studSpin.add(studs);
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
   clears wheels-7's park brake backplate (r <= 0.100 over |z| 0.628..0.635)
   by 6 mm of radius and sits 156 mm above its master-unit brake line. The
   busbars thread the rim flange bore at r <= 0.1482 against its 0.150.

   The pack is 32 mm deep rather than drivetrain-6's 46, and it sits 14 mm
   higher, because at |z| 0.63 the column over the machine is not empty.
   suspension-4's rear air spring stands at (-1.447, 0.60) and puts a
   body-side top plate of r 0.055 at y 0.465..0.477 directly over the
   machine, and its two upper links cross above at x -1.409..-1.381 and
   -1.534..-1.503 with their lowest surface at y 0.5172. The window is
   40 mm tall, and this is the box that fits in it: 5 mm over the spring
   plate, 3.2 mm under the links, with the ceramic link standing into the
   94 mm of x between them. The first draft was 46 mm deep and 18 mm lower
   and put 560 sampled points inside the spring plate. The phase busbars
   dip below the box to y 0.478, 1 mm over that same plate, and because
   this pack is unsprung while the plate is body-side, that 1 mm is
   reported as a travel conflict on the panel rather than sold as a
   clearance. */
function cornerInverterPart(s) {
  const part = lib.part('corner-inverters', [0, 0, s * 0.78]);

  const body = lib.box(0.100, 0.032, 0.022, M.castAlu);
  body.position.set(RX, 0.498, s * 0.630);
  part.add(body);

  const board = lib.box(0.084, 0.024, 0.005, M.pcb);
  board.position.set(RX, 0.498, s * 0.6165);
  part.add(board);

  /* the ceramic link stands proud on the lid, in the 94 mm of x between
     the two upper links rather than under either of them */
  const capStack = lib.box(0.030, 0.013, 0.013, M.plasticLt);
  capStack.position.set(RX - 0.022, 0.5205, s * 0.628);
  part.add(capStack);

  /* three busbars from the stator phase studs, down through the wheels-7
     rim flange bore, then back up into the board pack */
  for (const adeg of [75, 90, 105]) {
    const a = (adeg / 180) * Math.PI, c = Math.cos(a), n = Math.sin(a);
    part.add(lib.tube([
      [RX + c * 0.172, WY + n * 0.172, s * 0.656],
      [RX + c * 0.138, WY + n * 0.138, s * 0.6525],
      [RX + c * 0.132, WY + n * 0.132, s * 0.6440],
      [RX + c * 0.140, WY + n * 0.140, s * 0.6340],
    ], 0.005, M.busbar));
  }

  /* DC landing with the ideal-diode ORing stage for loops A and B. It is on
     the FORWARD face of the pack, not the rear one drivetrain-6 used: aft of
     the pack the only route to it passes through the air spring, forward of
     it the loops have 120 mm of free column to fall into. */
  const dcLanding = lib.box(0.032, 0.020, 0.026, M.hv);
  dcLanding.position.set(RX + 0.058, 0.492, s * 0.624);
  part.add(dcLanding);

  return part;
}

/* Dual service loops: two 10 mm2 HV DC umbilicals from the body-rail
   bracket to the inverter DC landing, plus the 4 mm purge air line riding
   the same bundle up to the stator cavity. The bracket sits on hv-4's
   BUILD-CODE landing at (-1.36, 0.425, +/-0.625), not on the (-1.36, 0.40,
   +/-0.63) its comment claims. Orange per SPEC. */
function serviceLoopPart(s) {
  const part = lib.part('service-loops', [0, 0, s * 0.78]);

  /* the bracket stops at |z| 0.627, inboard of wheels-7's park brake
     backplate, while still enveloping hv-4's run end at |z| 0.625 */
  const bracket = lib.box(0.024, 0.044, 0.016, M.plastic);
  bracket.position.set(-1.36, 0.425, s * 0.619);
  part.add(bracket);

  /* THE BUNDLE FALLS FORWARD, NOT AFT. Aft of the bracket the column is
     suspension-4's: its rear air spring stands at (-1.447, 0.60) and puts a
     bellows of r 0.052 through y 0.245..0.465 and a body-side top plate of
     r 0.055 at y 0.465..0.477 directly over the machine, and its rear damper
     hangs a 30 by 45 by 30 mm valve head at x -1.545..-1.498, y 0.395..0.440.
     A loop drooping aft, which is what drivetrain-6 drew when the corner was
     at |z| 0.81, now passes through both. Forward of the bracket the column
     x -1.30..-1.38 is empty from y 0.36 to 0.54, so the slack goes there and
     the bundle climbs to the inverter's forward face. Every CABLE station
     holds |z| <= 0.6405 and r >= 0.13 about the axle, clear of the park
     brake backplate (r <= 0.100 over |z| 0.628..0.635) and no nearer than
     9 mm to the wheels-7 flange insert at |z| 0.646. The bracket itself is
     the exception and it is measured, not asserted: its inboard forward
     corner sits at r 0.0916, inside the backplate's radius, 1.0 mm clear of
     it statically and NOT clear of it under rear steer. That is the
     wheels-7 finding in this file's header, reported rather than edited.

     loop A: deliberate slack, 70 mm bend radius, 250 mm of cable for 90 mm
     of net span. */
  part.add(lib.tube([
    [-1.360, 0.420, s * 0.622],
    [-1.336, 0.394, s * 0.612],
    [-1.320, 0.438, s * 0.616],
    [-1.336, 0.476, s * 0.622],
    [-1.362, 0.492, s * 0.624],
    [-1.380, 0.494, s * 0.624],
  ], 0.0065, M.hv));

  /* loop B: its own bend plane, 8 mm outboard of A, same landing */
  part.add(lib.tube([
    [-1.352, 0.414, s * 0.628],
    [-1.328, 0.386, s * 0.620],
    [-1.308, 0.434, s * 0.624],
    [-1.326, 0.474, s * 0.630],
    [-1.356, 0.490, s * 0.630],
    [-1.378, 0.492, s * 0.628],
  ], 0.0065, M.hv));

  /* purge air line, dry side of the bundle, landing on the carrier boss
     rather than crossing the flange face the way the Gen 5 stub implied.
     The boss moved with the bundle, from 125 degrees round the carrier to
     55, so the umbilical still flexes as one object. */
  part.add(lib.tube([
    [-1.352, 0.402, s * 0.614],
    [-1.330, 0.390, s * 0.606],
    [-1.318, 0.428, s * 0.614],
    [-1.334, 0.458, s * 0.626],
    [-1.356, 0.468, s * 0.634],
    [-1.371, 0.468, s * 0.6405],
  ], 0.004, M.plasticLt));

  const clamp = lib.box(0.026, 0.032, 0.026, M.plastic);
  clamp.position.set(-1.318, 0.436, s * 0.620);
  part.add(clamp);

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

  const body = lib.box(0.14, 0.045, 0.16, M.castAlu);
  body.position.set(-1.66, 0.43, -0.10);
  part.add(body);
  const pcb = lib.box(0.12, 0.006, 0.14, M.pcb);
  pcb.position.set(-1.66, 0.456, -0.10);
  part.add(pcb);

  for (const [cx, cz] of [[-1.62, -0.15], [-1.70, -0.05]]) {
    const conn = lib.box(0.026, 0.022, 0.032, M.plastic);
    conn.position.set(cx, 0.464, cz);
    part.add(conn);
  }

  /* corner harnesses to the service-loop brackets at (-1.36, 0.425, ±0.625).
     They cross under the penthouse hard point (x -1.58..-1.16, y 0.33..0.56)
     at y 0.322, which drivetrain-6's runs did not: its 0.330 to 0.335 band
     skimmed the penthouse floor. Below them the rear subframe tops out at
     y 0.30 and above them the hv-4 ring laminate starts at y 0.339.

     They also go OUTBOARD LATE, forward of x -1.31, and that is the Gen 7
     correction. suspension-4 stands a damper tower on each rear rail, a
     260 by 200 by 50 mm plate at (-1.47, 0.40, +/-0.48) filling y 0.30 to
     0.50 over |z| 0.455..0.505, and the only gap under it is the 5 mm
     between the rail top at 0.295 and the tower bottom at 0.300. A harness
     crossing |z| 0.48 anywhere between x -1.60 and -1.34 goes through the
     tower, which is what the first draft of this route did, 18 mm deep.
     Crossing that band at x -1.30 instead clears it by 38 mm. */
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
  ], 0.0035, M.plastic));
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
  ], 0.0035, M.plastic));

  /* yaw-demand link ONTO suspension-4's chassis ECU, whose box measures
     0.18 by 0.036 by 0.12 about (-0.95, 0.334, -0.28) in its build code,
     so its aft face is at x -1.04 and the run has to reach past it rather
     than stop at the centre coordinate. It lands at (-1.030, 0.330,
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
  ], 0.0030, M.plastic));

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

  /* disc housing: rim ring closed by two dishes, r 0.142 where the 270 kW
     machine needed 0.168 */
  const rim = ringMesh(0.142, 0.132, 0.084, M.castAlu, 44);
  rim.position.set(A7[0], A7[1], 0.030);
  part.add(rim);
  const inDish = zc(lib.cyl(0.142, 0.010, M.castAlu, 44));
  inDish.position.set(A7[0], A7[1], -0.017);
  part.add(inDish);
  const outDish = zc(lib.cyl(0.142, 0.010, M.castAlu, 44));
  outDish.position.set(A7[0], A7[1], 0.077);
  part.add(outDish);
  const hubBoss = zc(lib.cyl(0.040, 0.020, M.castAlu, 24));
  hubBoss.position.set(A7[0], A7[1], 0.092);
  part.add(hubBoss);
  const rimBolts = lib.bolts(14, 0.136, 0.006, M.steel);
  rimBolts.rotation.x = Math.PI / 2;
  rimBolts.position.set(A7[0], A7[1], 0.074);
  part.add(rimBolts);

  /* printed load-path ribs, following the optimiser's spider */
  for (let i = 0; i < 7; i++) {
    const a = 0.35 + i * 0.82;
    const rib = lib.box(0.066, 0.010, 0.010, M.castAlu);
    rib.position.set(A7[0] + Math.cos(a) * 0.092, A7[1] + Math.sin(a) * 0.092, -0.026);
    rib.rotation.z = a;
    part.add(rib);
  }

  /* neck down to the gear case, then the shallow case on two axes */
  const neck = zc(lib.cyl(0.042, 0.090, M.castAlu, 24));
  neck.position.set(A7[0], A7[1], -0.062);
  part.add(neck);
  for (const [ax, r] of [[B7, 0.048], [C7, 0.075]]) {
    const caseDrum = zc(lib.cyl(r, 0.110, M.castAlu, 32));
    caseDrum.position.set(ax[0], ax[1], GZ7);
    part.add(caseDrum);
  }
  const caseFill = lib.box(0.072, 0.096, 0.110, M.castAlu);
  caseFill.position.set(1.477, 0.406, GZ7);
  part.add(caseFill);
  const coverBolts = lib.bolts(8, 0.066, 0.005, M.steel);
  coverBolts.rotation.x = Math.PI / 2;
  coverBolts.position.set(C7[0], C7[1], -0.217);
  part.add(coverBolts);

  /* oil-to-coolant plate under the case, with water stubs */
  const oilCooler = lib.box(0.09, 0.028, 0.08, M.castAlu);
  oilCooler.position.set(1.48, 0.270, -0.08);
  part.add(oilCooler);
  for (const [zz, mat] of [[-0.105, M.coolant], [-0.055, M.coolantHot]]) {
    const stub = lib.cyl(0.008, 0.05, mat, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(1.42, 0.270, zz);
    part.add(stub);
  }

  /* right-hand output shaft from the case out to the disconnect collar */
  const outShaft = zc(lib.cyl(0.024, 0.370, M.steel, 14));
  outShaft.position.set(C7[0], C7[1], 0.035);
  part.add(outShaft);

  /* mounts: two bushes to the front subframe, each on a cast arm. Gen 5
     hung the bushes at z +/-0.28 with the nearest housing 67 mm away in x,
     so they read as floating; the arms are the fix, and they land the
     bushes inside P.driveF (z +/-0.31 against the zone's 0.35). */
  for (const sz of [-1, 1]) {
    const arm = lib.box(0.030, 0.024, 0.250, M.castAlu);
    arm.position.set(1.520, 0.295, sz * 0.185);
    part.add(arm);
    const bush = zc(lib.cyl(0.025, 0.040, M.rubber, 16));
    bush.position.set(1.560, 0.290, sz * 0.290);
    part.add(bush);
  }

  /* both front halfshafts, spinning, in this part's 38 kg.
     0.52 is not a free number. The outboard CV joint is 55 mm long on a
     centre 215 mm out, so its outboard face lands on |z| 0.7625, which is
     where wheels-7's front wheel puts its hub face inboard plane in its
     build code, and where drivetrain.js, drivetrain-2, drivetrain-3 and
     drivetrain-6 all landed the same joint. A first draft of this module
     pulled the pair in to 0.51 to reach the new dog collars and left the
     joint 10 mm short of the wheel it drives; the collars moved instead. */
  for (const sz of [-1, 1]) {
    const shaftG = halfshaft();
    shaftG.position.set(C7[0], C7[1], sz * 0.52);
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
    const collar = zc(lib.cyl(0.050, 0.070, M.steel, 24));
    collar.position.set(C7[0], C7[1], sz * 0.245);
    part.add(collar);

    /* dog teeth read as a ring of small blocks on the collar face */
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const dog = lib.box(0.010, 0.012, 0.010, M.darkSteel);
      dog.position.set(C7[0] + Math.cos(a) * 0.044, C7[1] + Math.sin(a) * 0.044, sz * 0.273);
      dog.rotation.z = a;
      part.add(dog);
    }

    const act = lib.box(0.050, 0.050, 0.036, M.plasticLt);
    act.position.set(C7[0], 0.418, sz * 0.245);
    part.add(act);
    const fork = lib.cyl(0.010, 0.030, M.steel, 12);
    fork.position.set(C7[0], 0.400, sz * 0.245);
    part.add(fork);

    const sense = lib.box(0.016, 0.016, 0.012, M.sensor);
    sense.position.set(C7[0] - 0.048, 0.372, sz * 0.249);
    part.add(sense);
  }

  return part;
}

/* Front GaN inverter: the pocket on the housing inboard face, GaN board
   row, ceramic link, busbars into the housing, coolant stubs, and the DC
   feed whose landing is hv-4's tunnel run END POINT (1.30, 0.402, 0.015)
   exactly, rather than the 21 mm miss drivetrain-6 shipped. */
function frontInverterPart() {
  const part = lib.part('front-inverter', [0.45, 0.4, 0]);

  const body = lib.box(0.20, 0.11, 0.040, M.castAlu);
  body.position.set(1.49, 0.450, -0.048);
  part.add(body);
  const lid = lib.box(0.18, 0.09, 0.006, M.alu);
  lid.position.set(1.49, 0.450, -0.071);
  part.add(lid);

  /* embedded-die GaN packs on the lid face */
  for (let i = 0; i < 3; i++) {
    const pack = lib.box(0.040, 0.040, 0.010, M.plasticLt);
    pack.position.set(1.432 + i * 0.050, 0.464, -0.079);
    part.add(pack);
  }

  /* ceramic DC link block, 16 uF where drivetrain-6 needed 30 */
  const link = lib.box(0.042, 0.050, 0.016, M.plasticLt);
  link.position.set(1.562, 0.436, -0.079);
  part.add(link);

  /* short solid busbars bridging into the housing face */
  for (let i = 0; i < 3; i++) {
    const bar = zc(lib.cyl(0.006, 0.028, M.busbar, 10));
    bar.position.set(1.448 + i * 0.024, 0.478, -0.016);
    part.add(bar);
  }

  /* DC feed to the pack, landing on hv-4's tunnel run end exactly */
  part.add(lib.tube([
    [1.430, 0.492, -0.062],
    [1.360, 0.450, -0.045],
    [1.310, 0.410, 0.000],
    [1.300, 0.402, 0.015],
  ], 0.008, M.hv));

  /* coolant stubs on the pocket flank */
  for (const [yy, mat] of [[0.424, M.coolant], [0.478, M.coolantHot]]) {
    const stub = lib.cyl(0.007, 0.040, mat, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(1.610, yy, -0.048);
    part.add(stub);
  }

  return part;
}

export function build() {
  const sys = new THREE.Group();

  /* rear corners at the NEW |z| 0.74 centres: motor rings, bearing unit,
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
