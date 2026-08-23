/* Gen 11 HV electrical: the ring loses its corridor and becomes two spines.

   hv-4 is the oldest live module on this car and its perimeter ring IS the
   1.88 m floor. It runs a laminated loop around the cabin floor at |z| 0.6940
   standing on six insulator posts seated on the pack lid, closes across the
   car at x 1.11 and -1.13 over that same lid, hangs four corner boxes off it
   at |z| 0.6860, and lands four by-wire stubs at |z| 0.7000. Every one of
   those numbers is a statement about a floor that Gen 11 deletes.

   THREE MEASUREMENTS DECIDE THIS FILE, all swept off the built partners.

     1  THE OLD OUTBOARD CORRIDOR IS NOW STRUCTURE. battery-11's merged sill
        fills |z| 0.6600 to 0.7800 from y 0.1035 to 0.4200, and body-11's
        floor pan takes 0.6560 to 0.7800 from 0.4200 to 0.5600. hv-4's ring
        side leg sits at |z| 0.6400 to 0.6900 at y 0.3414 to 0.3534, so it is
        50.00 mm inside that sill over 530 crossing triangle pairs. The
        corridor did not move. It was filled in.

     2  THE PACK LID IS THE CABIN FLOOR AND NOTHING MAY STAND ON IT.
        design/gen11.md section 5 makes this a hard constraint and the first
        body-11 was rejected for breaking it. hv-4 stands 193 vertices on that
        lid: six ring insulator posts, four zonal feet, four tunnel clip posts
        and a feedthrough plate. Every one of them is 40 to 60 mm of the
        occupant's head clearance, and the crown already sits at 1.2479 under
        a 1.2990 liner. So the ring cannot cross the car over the lid, which
        deletes both of its cross legs, and it cannot stand on the lid, which
        deletes all six of its posts.

     3  ONE CHANNEL SURVIVES AND IT IS THE ONLY ONE. Swept at 18 mm clearance
        over the whole car between the lid and the shoulder, the free volume
        outboard of the occupant and inboard of the sill is |z| 0.5200 to
        0.6480 at y 0.4400 to 0.4900, running x -1.06 to 1.08, which is
        battery-11's own sill length. Its walls are all measured: the floor
        pan's upstand at |z| 0.6600 outboard; body-11's cage rocker hoop
        above, filling y 0.4516 to 0.5997 inside |z| 0.5803 to 0.6975 and
        leaving the built spine 11.5 mm; wheels-11's master-unit harness
        below, which in the spine's own |z| 0.6280 to 0.6480 band tops out at
        y 0.3612; and suspension-9's air-supply trunk at |z| 0.6174
        inboard-below, on the +z flank only. It is
        the rocker trim volume, which is where a real car has always run its
        harness, and this is the first generation on this ladder whose floor
        plan forces the module into it.

   SO THE RING BECOMES TWO SPINES AND THE LOOP CLOSES THROUGH THE TWO SOURCE
   BOXES. Converter at the rear, left spine forward, buffer in the nose,
   right spine aft, converter again. Topologically it is still one loop and
   a single cut anywhere still leaves every zonal controller fed from the
   other direction, which was the whole content of hv-4's ring promise. What
   changes is where the loop closes: through two bolted terminal decks
   instead of through two busbar cross legs. The failure notes price that.

   WHAT IS CARRIED WHOLE, because a redraw is not a license to re-argue
   settled things. 48 V zonal architecture, the deleted 12 V island, the
   single 800 V class converter, four corner eFuse controllers, the LFP
   buffer as the ring's second source, bidirectional CCS2, dual by-wire
   feeds with ideal-diode ORing at every actuator, and the 146 A worst-case
   by-wire budget. hv-4's panels teach all of it and this file does not
   repeat them. What is new is geometry, one interface contract, and one
   honest refusal to book a watt.

   ── THE BY-WIRE STUB DEFECT, OPEN SINCE GEN 9, AND WHY THE RECORDED
      AMENDMENT COULD NOT BE APPLIED AS WRITTEN ──────────────────────────

   hv-4 declares FZ = 0.70 and STUB_X = 1.30 in two comments that call
   themselves "interface contract" and declares nothing to the checker.
   suspension-9 measured the result against built geometry and wrote the
   amendment into its own panel: all four stubs are 40 mm INSIDE their
   wheels, the front boss is 10.5 mm inside wheels-9's spoke web, the rear
   sits in a sealed motor pocket with no radial and no axial path out, and
   "the amendment is one line on each side: move all four stubs from |z| 0.70
   to |z| 0.58". Two generations shipped after that sentence was written.

   IT WAS MEASURED BEFORE IT WAS APPLIED, AND IT IS WRONG. Sweeping the box
   the amendment describes, x 1.286 to 1.314 by y 0.348 to 0.372, against the
   built gen11 corner: wheels-11's caliper occupies |z| 0.5681 to 0.6743
   there. A 24 mm stub whose outboard face sits on |z| 0.5800 spans 0.5520 to
   0.5800, so 11.9 mm of it is inside the caliper and the whole boss
   suspension-9 draws around it is deeper still. The amendment was written
   against a corner that had a wheel in it and not a brake.

   The plane is therefore DERIVED rather than quoted. In that same box the
   free window is |z| 0.5299, where suspension-9's rack stops, to 0.5681,
   where the caliper starts: 38.2 mm, and a 24 mm stub does not fit in it
   with a boss. Lifting to y 0.4400 clears the rack entirely, which has no
   material at all in that box above y 0.42, and opens the outboard wall to
   0.5885 at the front and 0.6030 at the rear, because the caliper's inboard
   face falls away above the disc center and drivetrain-9's service loops are
   the binding wall behind. The four stubs land on ONE plane at |z| 0.5200
   with their faces on it, at |x| 1.3000 and y 0.4400.

   THE MARGINS ARE MEASURED OVER THE ASSEMBLY AND NOT AT ITS CENTERLINE, and
   that is not a formality: the set is 36 mm tall, y 0.4218 to 0.4582, and
   the caliper closes back to |z| 0.5675 at y 0.445 having been 0.5885 at
   0.4400. Surface to surface against the built partners the plane clears the
   front caliper by 44.1 mm and the nearest tire by 172.1, the rear service
   loops by 83.0, and its tightest clearance anywhere is 12.9 mm, to
   suspension-9's rear structure at the rear pair. Not 68.5 and not 152.5,
   which is what quoting a single height gives you and what the first draft
   of this file did.

   AND THIS TIME IT IS DECLARED, WHICH IS THE POINT OF THE MODULE. The four
   stub faces are an interface now and not a sentence. `bywire-stubs` is its
   own part precisely so that the two keys below can carry an extent, which
   is impossible on a part that also owns 2.14 m of rocker run.
   SYSTEM.interfaces asserts, from vertices, on every check run, that the
   faces are on |z| 0.5200, that nothing in the part passes that plane, and
   that the station is |x| 1.3000. It realizes: the built part carries 304
   vertices lying exactly on |z| 0.5200 and 384 exactly on |x| 1.3000, and
   tools/check-interfaces.sh reports both keys at nearest vertex 0.0 mm with
   the part spanning |z| 0.4863 to 0.5200, so `extent: max` is proved rather
   than asserted. suspension-9 is carried unchanged and does not declare its
   half, so both keys report UNMET, which is the visible state and the
   correct one: a generation that inherits this will now be told, rather than
   having to measure a comment.

   ── THE GATE, AND WHAT IT IS SWEPT AGAINST ────────────────────────────────

   Every module a gen11 preset builds, enumerated from js/registry.js's own
   slot list plus the -11 modules on disk rather than from any list written
   by hand, then swept part against part at the shipped 0.005 mm tolerance:
   body-11, battery-11, wheels-11, drivetrain-9, suspension-9, autonomy-11,
   thermal-11, interior-11. autonomy-11's header explains why the list has to
   be built that way and this file follows it, because two of those modules
   landed mid-build and a hand-written list would have missed them.

   hv-11 penetrates NOTHING in that preset: zero part pairs, zero crossings.
   hv-4 in the same slot, which is the baseline this rung is a diff against,
   penetrates 48 part pairs to a worst depth of 50.00 mm. Six of the zero
   were cleared during this pass and each is documented beside the geometry
   that fixed it: the charge door hinge into the skin and the tail cone, the
   rear corner runs into suspension-9's rear structure, and all three zone
   drops, into the cage, into the rear structure and into the rear casting.                                                     */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'hv-11',
  name: 'HV electrical · Gen 11',
  color: 0xff8a3c,
  explode: [-1.5, 0.3, 0],
  blurb: 'The 48 V zonal architecture is carried whole from Gen 4 and its geometry is not: a 1.20 m cabin over an unmoved pack leaves no perimeter to run a ring around and no lid to stand it on, so the loop becomes two sill spines closed through the converter and the buffer. The four by-wire stubs move off a plane that has been inside the wheels since Gen 9, onto one that is measured, and they are declared this time. 61 kg against hv-4 at 64.',

  /* ── DECLARED INTERFACES ────────────────────────────────────────────────
     Four keys, and none of them has a partner in this preset. That is worth
     stating rather than hiding: an unmet key warns instead of failing, and
     all four are still live assertions, because tools/interfaces.js proves
     REALIZATION and EXTENT from this module's own vertices whether or not
     anybody declares the other half. Every one of them is a claim that has
     been made in a comment on this ladder before and was never checkable.

     The perverse case the schema documentation warns about does not apply to
     any of these: each names a part whose extents are true of ALL of it,
     which is why `bywire-stubs` exists as a part at all. ── */
  interfaces: {
    'bywire-stub-outboard': {
      kind: 'face', axis: 'z', at: 0.5200, tol: 0.002,
      part: 'bywire-stubs', mirrored: true, extent: 'max',
      note: 'the four by-wire stub mating faces, which suspension-9 lands its connector bosses on. extent max is the half that matters: it is what stops a later rung walking this plane back out into a wheel, which is exactly what happened between Gen 4 and Gen 9 with nothing to catch it. suspension-9 carries the open amendment in its 48v-feeds panel and does not declare its half, so this key reports unmet.',
    },
    'bywire-stub-station': {
      kind: 'face', axis: 'x', at: 1.3000, tol: 0.002,
      part: 'bywire-stubs', mirrored: true,
      note: 'the fore-and-aft station of the four stubs, carried from hv-4 unchanged. The stub axis runs along z, so its widest section has a real vertex on |x| 1.3000 and realization proves the station rather than a comment claiming it.',
    },
    'sill-channel-inboard': {
      kind: 'face', axis: 'z', at: 0.6600, tol: 0.002,
      part: 'spine', mirrored: true, extent: 'max',
      note: 'battery-11 sill inner face below y 0.4200 and body-11 floor-pan upstand inner face above it, measured at the same |z| on both. The spine brackets land on it and nothing in this part passes it. This is the wall that makes the channel a channel, and the key exists so the next rung cannot quietly grow the loom into the structure the way hv-4 grew into the sill.',
    },
    'pack-lid-top': {
      kind: 'face', axis: 'y', at: 0.3080, tol: 0.002,
      part: 'hv-runs', mirrored: false, extent: 'min',
      note: 'battery-11 lid top, measured. The pack service feed seats its flange on it and nothing in this part goes below it, which is the checkable form of "this module does not enter the pack". hv-4 put 193 vertices inside the battery envelope and had no way to say so.',
    },
  },

  parts: {
    converter: {
      name: '800 V to 48 V converter',
      tagline: 'One conversion for the whole car, carried from Gen 4, and now also the rear node where the 48 V loop closes on itself.',
      mass: 8,
      specs: [
        ['Rating', '7 kW continuous, 14 kW for 10 s'],
        ['Input', '800 V class, 300 to 870 V; sees 380 to 570 V on this pack'],
        ['Output', '48 V, up to 290 A peak'],
        ['Topology', '3 interleaved LLC phases, SiC primary, 97% at half load'],
        ['New', 'Bolted 48 V through-bar deck, both side walls'],
        ['Case', 'x -1.540 to -1.300, aft of the pack lid at -1.290'],
        ['Overhang', 'Keyed HV inlet reaches -1.256, 34.0 mm over the lid'],
      ],
      how: 'The electrical box is hv-4\'s and nothing inside it moved: three interleaved LLC phases chop the pack bus through one planar transformer and rectify onto 48 V at 97 percent, the input silicon is qualified for the full 300 to 870 V class, and five solid-state HV branches leave the distribution deck on the input side with back-to-back SiC pairs instead of fuses. The HVIL interlock and the crash-discharge logic carry over unchanged, because nothing about a finger near a busbar changed.\n\nWhat moved is the box and what it now does structurally for the network. hv-4 centered it at x -1.320, which puts its forward wall at -1.200, 90 mm forward of the pack lid\'s rear edge at -1.290 and therefore over the cabin floor. It is at -1.420 now, so the case spans -1.540 to -1.300 and every part of the casting, its lid, its fins and its four mounting ears is aft of the lid. Measured against the built partners its tightest clearance is 46.8 mm, to drivetrain-9\'s torque-vectoring controller at the rear corner, then 55.0 mm to the pack lid itself and 78.8 mm to suspension-9\'s rear structure. The new feature is on the two side walls: a bolted 48 V through-bar deck, one per side, where each sill spine terminates. hv-4\'s ring closed on itself and merely landed here; this deck is the rear half of the loop closure, so it is a bolted bar with a cover rather than a connector, and it is sized for the full 250 A ring rating in either direction.\n\nThe keyed HV input does overhang the lid and the panel says so: 718 vertices of it stand over the lid. The inlet on the forward wall reaches x -1.2560, which is 34.00 mm forward of the lid\'s rear edge at -1.2900, over y 0.3570 to 0.4550. It cannot simply move back: the bay between that edge and the tv-controller\'s forward face at -1.5900 measures 300.0 mm and this assembly is 292.0 mm long, so all 8.0 mm of slack in the car goes to one end or the other. It is spent at the front, and the reason is measurable rather than aesthetic. The volume the inlet occupies, x -1.290 to -1.250 by y 0.308 to 0.520 inside |z| 0.22, contains zero vertices of every other module in the preset; its lowest point is 49.0 mm above the lid; and interior-11\'s rear seat cushion ends at x -1.0944, so the overhang starts 195.6 mm behind the rear occupant. The alternative is 8.0 mm of air behind a controller that has to come out to be serviced.',
      why: 'Folding routing and conversion into one casting saved Gen 4 eleven kilograms and that argument is unchanged. The move aft is not styling: the pack lid is the cabin floor now, and hv-4\'s forward 90 mm sat over it at the height a rear occupant\'s heels use. What Gen 11 buys with the 100 mm it moved is the whole case out of that volume; what it cannot buy is the connector, and design/gen11.md section 5 is absolute about the lid, so the 34 mm is stated as a breach with its measurement rather than described as a clearance. The through-bar deck is the price of deleting the ring\'s cross legs, and it is the honest place to pay it, because a bolted bar inside a sealed casting is the most reliable node in the network and the only one on the car that was going to be there anyway.',
      fail: [
        'The keyed HV input is 34.00 mm of this module standing over the pack lid, against a design rule that says nothing may. It is 49 mm above the lid, 196 mm behind the rear cushion and clear of every partner, so what it costs is not height and not clearance: it is the precedent. The next module that wants 34 mm over the lid will cite this panel, and the answer has to be the measurement rather than the exception.',
        'The loop now closes through this box. A fault at the through-bar deck, a corroded bolted joint or a crushed case, converts the loop into two open-ended spines each fed from one end only. hv-4\'s busbar loop survived that case and this one does not; the mitigation is that the deck is bolted metal with no semiconductor in the path and the two bars are on opposite walls, so one event has to reach both.',
        'Converter loss while driving hands the network to the buffer pack: 20 minutes at the average by-wire driving draw, five at the 146 A worst case, carried from Gen 4 unchanged.',
        'A solid-state HV branch that fails short cannot be melted open; the pack\'s pyro fuse remains the backstop, unchanged since Gen 1.',
      ],
      explode: [-0.55, 0.30, 0],
    },
    spine: {
      name: '48 V sill spines',
      tagline: 'The ring stood on the pack lid and closed across a floor that no longer exists, so it became two laminated blades in the rocker channel and a loop that closes through its own sources.',
      mass: 8,
      count: 2,
      specs: [
        ['Conductor', 'Laminated Al pair on edge, 8 by 30 mm, 240 mm² each'],
        ['Rating', '250 A continuous, either direction'],
        ['Channel', '|z| 0.6280 to 0.6480 at y 0.4400 to 0.4700'],
        ['Support', '14 brackets onto the pan upstand at |z| 0.6600'],
        ['Loop', 'Converter, left spine, buffer, right spine, converter'],
        ['Ledger', '8 kg against hv-4\'s 9 kg ring, on 6.3 m against 7.0'],
      ],
      how: 'Power is volts times amps, so the same kilowatt crosses this laminate at a quarter of the current a 12 V spine needed and resistive loss falls with the square of current. That arithmetic is Gen 4\'s and it is why the conductor is aluminum and still runs cool. What Gen 11 changes is the section and the route. hv-4 pressed two flat 240 mm² laminae face to face and laid them horizontally around the cabin floor perimeter, which needs a 50 mm wide shelf and a lid to stand on. The channel that survives at a 1.20 m cabin is 42.6 mm wide between suspension-9\'s air-supply trunk at |z| 0.6174 and the sill wall at 0.6600, so the laminate turns ninety degrees and stands on edge: two 8 by 30 mm rails with a 4 mm insulating lamina between them, 20 mm across the channel and 30 mm tall, the same 240 mm² per rail in a quarter of the width. Standing it on edge is also why it can be bracketed rather than stood up: 14 saddles bolt to the floor pan\'s upstand at |z| 0.6600, which is a measured face on body-11, so the spine hangs on structure instead of resting six insulator posts on the battery.\n\nThe loop is the part that had to be re-thought rather than re-drawn. hv-4 closed its rectangle with two cross legs over the pack lid at x 1.11 and -1.13, and both of them are now inside the cabin floor. So the two spines run the sill and close through the two sources instead: converter at the rear, left spine forward, buffer in the nose, right spine aft. Trace it and it is still one continuous conductive loop, which is the property that matters, because a cut anywhere still leaves every zonal controller reachable the other way around. The four corner boxes tap the spines in passing rather than sitting in series with them, so a dead controller is a dead controller and not a broken loop. The sill sections are laminate; the four corner transitions out to the converter and the buffer are 70 mm² flexible cable in convoluted loom, because a pressed bar cannot turn through 60 degrees of climb and 400 mm of z in the space available and a real car does not ask it to.',
      why: 'The channel is not a preference, it is the only free volume left, and finding that out is the whole content of this rung for this slot. Once the route is forced, standing the laminate on edge is what makes it fit, and bracketing to the pan upstand is what gets the module off the pack lid. The side benefit is the one design/gen11.md section 7 was written for: the conductor now runs inboard of a 7003-T6 merged sill rather than behind the 0.9 to 1.6 mm door skin hv-4\'s side leg sat under, so the single highest-value cable on the low-voltage network is finally inside the only rated crush member on the car.',
      fail: [
        'One channel per side carries the spine, the by-wire feed and, on the passenger side, the 810 V front-drive run. A side impact that opens one sill takes all three on that side. hv-4 was no better, its ring leg and its feed ran the same rocker 35 mm apart, but the geometry is denser now and the honest statement is that side separation on this car is 1.28 m of air and nothing else.',
        'The loop closes through the converter and the buffer, so their terminal decks are two single points the ring used to route around. Both are bolted metal, both are at opposite ends of the car, and neither is a semiconductor, but the topology is genuinely weaker than a closed busbar rectangle and it was traded for the height budget.',
        'Aluminum terminations are the watch item exactly as they were: every Al to Cu junction is a galvanic couple, each landing is a bimetal transition plate, and joint resistance is trended per terminal. The channel is also wetter than hv-4\'s shelf, because it sits under the sill rather than on top of the lid, which suspension-9 predicted in writing when it proposed moving the by-wire stubs into the same volume.',
      ],
      explode: [0, -0.42, 0.30],
    },
    zonal: {
      name: 'Zonal controllers',
      tagline: 'Four corner computers where the fuse box used to be, moved off the ring leg and onto the cage hoops, tapping the spines instead of sitting in them.',
      mass: 11,
      count: 4,
      specs: [
        ['Channels', '96 eFuse outputs per box, 0.5 to 60 A'],
        ['Trip', 'Under 10 µs at 1.3x rating; a melt fuse needs ms at 2x'],
        ['Stations', '|x| 1.155, |z| 0.5600, y 0.4500; case y 0.4200 to 0.4800'],
        ['Mount', 'Spine tap strap only; no body structure within 41.7 mm'],
        ['Topology', 'Tapped off the spine, not in series with it'],
        ['Telemetry', 'Per-circuit current at 1 kHz onto the zonal bus'],
        ['Compute', 'Lockstep dual core, ASIL D'],
      ],
      how: 'A melting fuse is a thermal race: it needs two to ten times its rated current held for milliseconds before the element lets go, and every wire upstream must survive the wait. An eFuse measures, compares and opens in under ten microseconds at 1.3 times rating, retries after transients, and soft-starts motors so inrush stops being a sizing case. Every channel streams its current at 1 kHz, so the fuse became a sensor and a bearing starting to die draws its confession months before it seizes. All of that is Gen 4\'s and none of it moved.\n\nWhere the boxes sit did move, twice over. hv-4 put them at |z| 0.6150 with their cases spanning 0.5650 to 0.6650, which reads 10.06 mm into wheels-11\'s tires, 18.27 into the rear wheels and 15.41 into drivetrain-9\'s rotor rings on this envelope, and it stood each box on a 49 mm plastic foot seated on the pack lid. They are at |z| 0.5600 now, cases spanning |z| 0.5100 to 0.6100 at y 0.4200 to 0.4800, which is 55 mm inboard and 68 mm higher than Gen 4. The 40 mm of that height is a correction rather than a choice: at y 0.4900 the fin bank stood in wheels-11\'s aft brake harness, which this generation reroutes and mirrors, so it is present on both flanks at y 0.438 to 0.635 inside |z| 0.6167 where wheels-10 carried it on the driver side alone. Dropped to 0.4500 the whole box clears that unit by 21.6 mm and the front caliper by 21.4 mm at its worst corner. The electrical change is smaller and worth one line: the boxes tap the spine through a short laminated strap instead of sitting in series in the ring the way hv-4\'s did, so a controller that fails open no longer opens the loop with it.\n\nWhat carries them is an open question and the panel will not pretend otherwise. There is no cage rocker hoop at x 1.00 to 1.10 or -1.10 to -1.20 to bolt each box to: the built cage ends at x 1.0300 at the front, and aft of x -1.10 its lowest material is at y 0.696, up in the pillar. Swept part by part, the nearest body-11 surface to anything in this part is 41.7 mm, and at the box stations themselves there is no body-11 vertex at all in the band y 0.395 to 0.525. That is not an accident of drawing: body-11\'s floor pan stops at |x| 1.0366, battery-11\'s sill at 1.080, and the boxes stand at 1.155 because autonomy-11 has already built its four node blocks 10 mm under them at |x| 1.115. So the ear is a bracket with nothing to bolt to, the boxes hang on their spine tap straps, and the failure list carries it as the open item it is.',
      why: 'Gen 4 made the topology argument, 34 kg zonal against roughly 50 point-to-point, and it holds. The corner stations are chosen by what is there rather than by symmetry, and what is there is less than a hoop, which is why the mount is a stated defect instead of a sentence about one. Tapping rather than series-feeding costs one bolted joint per box and buys back the failure mode the new loop topology gave away at the converter.',
      fail: [
        'Fusing is firmware, carried from Gen 4 verbatim: a bad trip table would ship to every circuit at once, so the tables stay locked, safety-certified code with a hardware second source on safety channels.',
        'A MOSFET\'s natural failure is short, not open; on by-wire channels a series redundant switch covers it, on comfort channels the upstream spine segment is the backstop and the load stays energized until service.',
        'The boxes are 55 mm further inboard and 68 mm higher than Gen 4 put them, which puts them behind the sill trim rather than under the floor. That is drier and much harder to reach: the service access is through the trim panel and the seat, and on a tandem car the rear pair are behind the rear occupant.',
        'The mount is unresolved and it is the largest open item in this module. Four 11 kg boxes stand at |x| 1.155, where the nearest body-11 surface is 41.7 mm away and there is no body vertex at all in their own height band, so nothing structural carries them: the bracket on each case is drawn against a cage hoop that ends 125 mm short. It cannot be fixed inside this module. Moving the boxes inboard to the hoop at |x| 1.03 strands autonomy-11\'s four node blocks, which are built 10 mm under these cases at |x| 1.115 and measured against them; reaching outboard to the pan upstand at |z| 0.6600 crosses the spine channel and the pan stops at |x| 1.0366 anyway; and standing a foot on the pack lid is the one thing design/gen11.md section 5 forbids. It closes when the sill, the cage or the autonomy mount is next redrawn, in a commit that moves both sides at once.',
      ],
      explode: [0.28, 0.30, 0.45],
    },
    buffer: {
      name: '48 V buffer pack',
      tagline: 'The second source, and now also the front node the loop closes through: the frunk is the only volume in a 1.20 m nose that will take it.',
      mass: 6,
      specs: [
        ['Chemistry', 'LFP, 15s, 48 V nominal'],
        ['Capacity', '12 Ah, 0.58 kWh (Gen 1 12 V: 0.42 kWh)'],
        ['Peak', '300 A for 10 s, 14 kW'],
        ['Hold-up', '5 min at the 146 A worst case, 20 at the 1.7 kW average'],
        ['Station', 'x 1.80 to 2.00, y 0.632 to 0.752, on a rail-to-rail tray'],
        ['Loop', 'Both spines land here; the front closure is a bolted bar'],
      ],
      how: 'Twelve volts survived seven decades on ecosystem alone and what killed it was by-wire arithmetic: a steering rack pulling 2 kW mid-corner draws 170 A at 12 V through crimped connectors that corrode, or 42 A at 48. Forty-eight is the last rail under the 60 V DC touch-safe threshold, so it needs no orange, no interlocks and no gloves. This pack wakes the computers before the contactors close, carries the parking loads for two weeks, and powers hazards, doors and the emergency-call modem after a crash has made the big pack inert. All carried.\n\nIts address is the argument and the address had to be re-found. hv-4 put it at x 1.90, y 0.615, which on this body is 38.30 mm inside body-11\'s front casting over 206 crossing pairs, because a 1.20 m nose is a different shape from a 1.88 m one. The frunk volume that survives is above the casting deck rather than beside it: swept at 20 mm clearance the free box at x 1.80 to 2.00 runs y 0.660 to 0.800 across |z| 0.560, and its floor is the two crash rails, whose top face body-11 builds at y 0.6250 over |z| 0.365 to 0.485. So the pack sits on a tray that spans rail to rail at y 0.6250 to 0.6320 and the case sits on the tray, which is the first time this part has been supported by anything on this ladder rather than floating in a declared zone. It is still the opposite end of the loop from the converter, which is the whole point of it: no single fault, no single flood and no single crash removes both sources.',
      why: 'Gen 1 called its 12 V island eight kilos of insurance and the policy does not lapse because the rail changed. The relocation is forced, and the tray is the part worth defending: a 6 kg mass on a 14 kW peak needs a real load path, and hv-4 gave it none in any of the six presets it shipped in. Putting it directly over the crash rails also puts it inside the front crush structure, which is a real objection and is answered in the failure list rather than argued away.',
      fail: [
        'It sits between the crash rails, so a front impact severe enough to fold them reaches the pack that is supposed to be holding the car up during the stop. The rear source survives that case and the ring is fed from both ends, which is the entire reason there are two, but the front node of the loop is now inside the front crush zone and hv-4\'s was not.',
        'The century of 12 V roadside ritual is gone with the rail: a dead buffer cannot be jumped from a passing car, and recovery is a 48 V bench supply at a service point.',
        'Sub-zero charge current is limited to protect the plating window, so a deep winter drain recovers slowly; the cabin loop lends heat when the car is awake.',
      ],
      explode: [0.50, 0.35, 0],
    },
    'v2g-port': {
      name: 'Bidirectional charge port',
      tagline: '11 kW out through the same pins, on a flank that measures 204.4 mm narrower at this station than the one Gen 4 mounted it to.',
      mass: 13,
      specs: [
        ['Standard', 'CCS2, ISO 15118-20 bidirectional'],
        ['DC charge', '630 A peak; 320 kW at this pack voltage'],
        ['AC', '11 kW three-phase, both directions, grid-forming'],
        ['V2G stage', 'SiC totem-pole + CLLC, 96.5% each way'],
        ['Aperture', 'Datum x -1.845, y 0.790; flank |z| 0.6000 measured'],
        ['Recess', 'Rim 0.5720, pins 4.5 mm behind it, flange face 0.5600'],
        ['Door', 'Hinge axis |z| 0.6110, base inner face 5.0 mm proud'],
        ['Export meter', 'Separate throughput counter, 2 MWh per year in warranty'],
      ],
      how: 'The electronics are hv-4\'s and they are unchanged: a totem-pole plus CLLC stage that passes the full 11 kW in either direction at 96.5 percent each way, grid-forming rather than grid-following so it can energize a dead circuit and hold frequency, with DC export needing no hardware at all because the station\'s rectifier simply runs in reverse under ISO 15118-20. The pin thermistors, the arc-proof motorized lock and the software-before-current handshake all carry.\n\nWhat moved is the hole it sits in. hv-4 reads P.chargePort at z 0.88 and builds an inlet whose bezel reaches |z| 0.9838: against a car whose greenhouse half-width is 0.6000 the part does not merely foul the body, it is 384 mm out in the air beside it.\n\nThe aperture is re-cut against the built loft, and on one set of numbers. One set of numbers for the two features, read off the mesh: three sets for the same flank and flange (0.5919, 0.5820 with 0.5940, 0.5950 falling to 0.5750) is how a panel ends up matching none of them. Ray-swept on the built body, the outermost surface at the datum station (x -1.845, y 0.790) is |z| 0.6000, and it is 0.6000 everywhere forward of x -1.840 because that is the greenhouse half-width. Aft of that the tail cone tapers, 0.5961 at x -1.860 and 0.5811 at -1.900, so the 110 mm inlet crosses 20 mm of taper and the station that binds is its aft edge. Swept over the whole footprint, x -1.900 to -1.790 by y 0.735 to 0.845, the minimum flank is 0.5801. The shroud rim therefore sits on 0.5720, which is 8.1 mm inside that minimum and 28.0 mm inside the flank at the datum; the mounting flange lands at |z| 0.5540 to 0.5600; and the seven AC contacts and two DC pins stand to 0.5675, 4.5 mm behind the rim, where a coupler expects to find them and where hv-4 stood them 8 mm proud. P is not touched: Port is a local constant in this file, the same way wheels-9 carried FRONTZ and REARZ, because a packaging constant that five other modules read is not a Gen 11 decision.\n\nThe door is the one piece outboard of the skin, because a leaf swinging about an axis that lies in a surface sweeps through it. Its hinge axis is at |z| 0.6110 and the base spans 0.6050 to 0.6170, 5.0 mm proud of a flank that measures 0.6000 under all of it. That number was 0.6000 when the flank was read as 0.5950, which put the base astride the skin: 12.46 mm into body-11/tail-cone and a new pair against body-11/skin at 4.00 mm. The electronics box sits directly inboard and below at x -1.965 to -1.815, y 0.665 to 0.755, |z| 0.365 to 0.495, with a 190 mm AC pigtail instead of hv-4\'s 210.',
      why: 'Moving the electronics to the port shortens the AC wiring to nothing and puts every grid-facing component in one serviceable enclosure. Re-cutting the aperture against the built loft rather than against P is the discipline this project keeps learning the hard way: hv-4\'s inlet was measured against a body that no longer exists and three of autonomy-4\'s five camera instances float today for the same reason. A car that is parked 95 percent of its life is the cheapest grid battery a household will own, and refusing bidirectionality on warranty fear would have been the dishonest choice.',
      fail: [
        'A 1.20 m car has 204.4 mm less quarter panel per side at this station than the one this inlet was drawn for, body-9 measuring |z| 0.8044 against body-11\'s 0.6000, so the flap now opens into the space a person stands in to plug the car in. It clears the tire by 215.6 mm and it does not clear a curb.',
        'The hinge bracket is the only part of this module outboard of the body skin, 5.0 mm proud of it, because body-11 draws no pocket for a charge aperture and a door leaf cannot hinge on a surface it has to swing through. It is the tightest partner clearance in this part and it is a styling debt as much as a packaging one: a flush hinge needs a recess that only the body module can cut.',
        'Export doubles the connector\'s duty cycle, so contact pitting arrives in half the years; the pilot line still breaks current first and the pins still switch dead.',
        'Grid-forming hardware inverts the threat model: a compromised session faces electronics that could energize a dead line, so islanding detection is certified hardware, not firmware, and fails to open.',
      ],
      explode: [-0.55, 0.45, 0.45],
    },
    'hv-runs': {
      name: 'Orange HV runs',
      tagline: 'The tunnel centerline was the most protected real estate on the car and it is the cabin floor now, so 810 V moves into the sill and says what that costs.',
      mass: 7,
      specs: [
        ['Runs', '6: pack feed, front drive, two rear corners, thermal, port'],
        ['Front run', '50 mm² kept; 531 A peak at 508 V'],
        ['Rear corners', '16 mm² each, 148 A per wheel motor'],
        ['Route', 'Passenger sill |z| 0.5980, driver sill for the thermal spur'],
        ['Pack landing', 'battery-11 service hatch, flange on the lid at 0.3080'],
        ['Ledger', '7 kg against hv-4\'s 8, on a car 332 mm shorter'],
      ],
      how: 'hv-4 ran the 3.1 m front-drive cable along the pack-lid centerline on four standoff clips and called it, correctly, the most protected real estate in the car: a 50 mm² conductor inside the tunnel, under the console, surrounded by pack on both sides. That volume is the tandem cabin floor now and the occupants sit on it, so the run has to leave and there is exactly one place for it to go. It travels the passenger sill channel at |z| 0.5980, 16 mm inboard of the spine\'s inner rail and 24 mm outboard of the by-wire feed, three services in one 128 mm channel with the highest voltage in the middle and the safety-critical one furthest from the sill wall. The conductor does not change: 531 A peak at 508 V through 50 mm² against a carried 600 A, 30 s rating, because the front axle machine did not move either.\n\nThe pack end is the one landing this module makes above the battery lid and it is the partner\'s own feature. battery-11 carries hv-4\'s service-hatch feed at (-1.13, 0.315, 0.38) explicitly, in its header, as geometry it built for this module to arrive at, so the feedthrough flange seats there on the measured lid top at y 0.3080 and the key `pack-lid-top` asserts that nothing else in this part is below that plane. The thermal spur takes the driver sill for the same reason the front run takes the passenger one, which keeps 7 kW of cabin heat off the same channel as the traction feed, and the two rear corner runs and the port run never enter the cabin at all: they leave the converter aft and stay aft.\n\nThe two ends that moved are both aft, and both moved because A sweep said so. The rear corner runs turn outboard at x -1.305 instead of -1.345, because suspension-9\'s rear structure carries a diagonal member filling |z| 0.4580 to 0.5020 at x -1.345 over every height these runs use, and the earlier station laid the conduit 0.1 mm off its face and 5.53 mm inside it. Forward of x -1.320 that band is empty, and the route now clears every partner by at least 22.7 mm. The port run reaches the V2G box: it ended at |z| 0.3400 against a box wall at 0.3650, so it stopped 25 mm short of the enclosure it feeds and its gland was silently never built, because the crossing that places the fitting simply returned nothing. Both are the same lesson in different clothes, which is that a run is not finished until something has measured where it ends.',
      why: 'Cable mass is a voltage decision and the ledger here is a length decision: the car is 332 mm shorter, the rear machines are still in the wheels, and the total built run length falls with both. What is not claimed is a Cd, an area or a drag number of any kind, because the frontal-area coefficient is frozen project-wide and nothing about a loom disturbs it. The route is the whole argument and it is a trade rather than an improvement, which is why the failure list names it first.',
      fail: [
        'An 810 V run is now in the side-impact load path. hv-4 had it on the tunnel centerline with a meter of pack either side; Gen 11 has it 62 mm inboard of the sill wall. The mitigations are real and they are not equivalent: the merged sill is the only rated crush member on the car, the run is the innermost of the three services in the channel, and the pack pyro fuse is unchanged. A car that trades protection for packaging should say so in the panel, and this is the sentence.',
        'Three services in one channel means one loom clamp failure can chafe 810 V onto a 48 V conduit. The HV run keeps its bonded braid both ends and its own isolation monitor, and the 24 mm to the by-wire feed is the smallest separation anywhere on the low-voltage network.',
        'The front run kept its conductor but not its margin, carried from Gen 4: launch peaks of 531 A against the same 600 A, 30 s rating, so the thermal budget spends about 60 percent faster and back-to-back launches graze the derate line.',
      ],
      explode: [0.18, -0.58, 0],
    },
    'bywire-feeds': {
      name: 'By-wire feed pair',
      tagline: 'Two 48 V lifelines, one per rocker, each sized for the whole by-wire load: the car steers and brakes on either one alone.',
      mass: 3,
      count: 2,
      specs: [
        ['Runs', '2, one along each sill channel, 16 mm²'],
        ['Rating', '150 A each; the full by-wire load is 146 A'],
        ['Channel', '|z| 0.5520 at y 0.4550, innermost of three services'],
        ['Separation', 'Opposite sills, no shared connector, no shared zone'],
        ['Handover', 'Ideal-diode ORing at every actuator, under 100 µs'],
      ],
      how: 'Each feed is sized for the entire by-wire budget alone: steering\'s dual lanes, the brake boost, four damper valve heads, the rear-steer actuator and the air compressor sum to 146 A at worst-case simultaneity and each run carries 150 continuously. At 12 V the same load is 580 A and duplicating a 580 A path means duplicating busbar rather than wire, which is why redundant chassis power is only affordable at all once the voltage moved. Every actuator sees both feeds through ideal-diode ORing stages, so the handover when one feed dies is passive physics under 100 microseconds. All carried from Gen 4 word for word.\n\nThe geometry is not carried. hv-4 ran the pair along the rocker tops at |z| 0.7000 and y 0.3600, which on this car is inside battery-11\'s sill over 3,528 crossing pairs, inside drivetrain-9\'s stator rings at 31.34 mm, inside the rotor rings at 29.55 and inside both front and rear wheels. The pair now runs the same sill channel as everything else, at |z| 0.5520, the innermost of the three services and the furthest from the sill wall, which is the correct order for the run that has to survive the impact. It reaches the four stub stations by climbing out of the channel forward and aft at |x| 1.08 and 1.06 and dropping to y 0.4400, and the loom stops 14 mm short of each stub so the stub part owns its own extents and can declare them.',
      why: 'Fail-operational power is the thesis of Gen 4 stated in copper: an actuator that must always be able to brake needs a source that survives, a path that survives and a connection that survives. Gen 11 keeps all three layers and moves the middle one, and the move is a net gain rather than a concession: the path is now inboard of a structural sill instead of on top of a door skin. The pair is 3 kg and the stubs are the fourth kilogram, split out because a contract needs a part it can be true of.',
      fail: [
        'A shorted ORing stage welds the two feeds into one and deletes the redundancy invisibly; the zonal controllers pulse each feed monthly and watch the other for the sag.',
        'Both feeds meet upstream at the spine loop, and the loop now closes through two boxes rather than through itself, so a whole-network collapse is one fault closer than it was. suspension-9\'s actuators still carry local hold-up for the final 200 ms.',
        'The feeds share their channel with the spine and, on the passenger side, with 810 V. Gen 4 had 35 mm of air between its feed and its ring leg on the same rocker; this has 24 mm and one more service in it.',
      ],
      explode: [0, -0.30, 0.18],
    },
    'bywire-stubs': {
      name: 'By-wire stub set',
      tagline: 'Four mating faces on one measured plane, and the first geometry on this ladder that a checker can hold to it.',
      mass: 1,
      count: 4,
      specs: [
        ['Stations', '|x| 1.3000, y 0.4400, faces on |z| 0.5200'],
        ['Was', '|z| 0.7000 since Gen 4, 40 mm inside all four wheels'],
        ['Amendment', 'suspension-9 proposed 0.5800; measured 11.9 mm inside a caliper'],
        ['Front margin', '44.1 mm to the wheels-11 caliper, 172.1 to the tire'],
        ['Rear margin', '83.0 mm to drivetrain-9 service loops'],
        ['Tightest', '12.9 mm to suspension-9 rear structure, at the rear pair'],
        ['Declared', 'bywire-stub-outboard extent max, bywire-stub-station'],
      ],
      how: 'Each stub is a 24 mm barrel on the feed axis with a mating flange, a crimp collar and a keyed cap, and suspension-9 lands a 30 by 20 by 20 mm connector boss on the flange face. The mated pair departs together on the shared explode vector, because a connection is one object with two owners. The barrel runs along z rather than along x, which is what lets the face be a face: the outboard end of the assembly is a flat annulus lying exactly on |z| 0.5200 and nothing in this part passes it, so `extent: max` on that key is a real assertion rather than a comment restated.\n\nThe plane was derived and the derivation is the content. hv-4 froze |z| 0.7000 in Gen 4 when both wheel centers sat at 0.81 and the stub was 33 mm inboard of the nearest rotating part. Gen 7 moved the rear centers to 0.74, Gen 9 moved the front, and all four contract points ended 40 mm inside their wheels with nothing on the car able to say so. suspension-9 measured that and wrote the fix, |z| 0.5800, into its own panel two generations ago. Swept against the built gen11 corner before applying it, that plane puts 11.9 mm of each front stub inside wheels-11\'s caliper, which occupies |z| 0.5681 to 0.6743 in the amendment\'s own box. So the free window at y 0.3600 is 38.2 mm wide and will not take a stub with a boss on it, and the assembly lifts to y 0.4400, where the caliper\'s inboard face has fallen back to 0.5885 and the rear wall is drivetrain-9\'s service loops at 0.6030.\n\nThe margins are quoted over the footprint and not at the datum, which changes three of them. A stub is 36 mm tall and this assembly occupies y 0.4218 to 0.4582, so what binds it is the worst station under all of it rather than the number at its centerline: 0.5885 is true at exactly y 0.4400 and the caliper closes back to |z| 0.5675 at y 0.445, which is inside the assembly. Measured surface to surface against the built partners, the set clears the front caliper by 44.1 mm and the nearest tire by 172.1, the rear service loops by 83.0 and the rear stator ring by more, and its tightest clearance to anything on the car is 12.9 mm, to suspension-9\'s rear structure whose outboard face reaches |z| 0.4960 at x -1.328 beside the rear pair. Every one of those is a clearance and not a crossing: swept against every module in the preset this part penetrates nothing.',
      why: 'A contract written in a comment is not a contract, and this project has now paid for that three times: drivetrain-7 said 0.7625 everywhere in its file while its shafts ran 70 mm past the wheel, hv-4 said "interface contract" twice on a plane that spent two generations inside a tire, and suspension-9 wrote the correction and had no mechanism to make anyone apply it. Splitting the stubs into their own part costs one part id and buys two keys with extents on them, which is the smallest change that makes the next inheritance loud instead of silent.',
      fail: [
        'suspension-9 is carried unchanged and its bosses are still on |z| 0.7000, so the joint does not close in the gen11 preset and both declared keys report unmet. That is the correct visible state of a two-module change made on one side, and it is the reason the keys exist; the pairing lands when the suspension slot is next redrawn.',
        'The stubs sit 180 mm inboard of where a technician expects them, behind the sill trim rather than under the rocker, so the connector is no longer serviceable from underneath the car.',
        'The plane is measured against wheels-11 and drivetrain-9 as built. A future corner that moves the caliper inboard or grows the service-loop bracket eats the margin, and the extent key will say so on the run that breaks it rather than two generations later.',
      ],
      explode: [0.12, -0.30, 0.55],
    },
    'zone-drops': {
      name: 'Zone sub-harnesses',
      tagline: 'Forty centimeters to the nearest controller, and a tandem cabin deletes two door lines and a row of seats before a single wire is drawn.',
      mass: 4,
      count: 4,
      specs: [
        ['Topology', 'Short drops from 4 corner boxes, carried from Gen 1'],
        ['Circuits', 'About 300 (hv-4: 380; point-to-point legacy: 1,200)'],
        ['Rails', '48 V primary, 12 V point-of-load for legacy parts'],
        ['Landings', 'Dash side panel |z| 0.5260, V2G box, casting inner face 0.3450'],
        ['Form', 'Flat pressed runs in body channels, machine-laid'],
      ],
      how: 'The topology is Gen 1\'s and it is kept whole: a tailgate motor wires 40 cm to the rear corner box rather than 4 m to a dashboard, and wire length is set by the distance to the nearest controller rather than by the size of the car. What Gen 11 changes is how many circuits there are to lay. A tandem cabin has one door aperture per side instead of two and two seats instead of four, and design/gen11.md section 9 already agreed both of those as capability costs, so the second-row door modules, window motors, latches, mirrors repeaters, speakers, seat position motors, heaters and belt pretensioners are simply absent. That is about 80 circuits against hv-4\'s 380, and it is the only line in this module\'s ledger that comes from the package rather than from a route.\n\nAll four drops land on measured hardware, and all four had to be re-found, because the first cut of this part put two of them inside body structure and one of them in mid air. The front pair climb the 24 mm channel outboard of interior-11\'s dash side panel, which fills |z| 0.5000 to 0.5260 over y 0.615 to 0.740 at x 1.02 to 1.12, and mate 7.0 mm off its outboard face. They do not climb the A-pillar: the cage carries a cross-car header at x 0.96 to 1.00 reaching |z| 0.0700, so at (0.985, 0.846) the free gap is 6 mm at every |z| from 0.28 to 0.42 and no sideways offset gets a drop past it. The passenger rear drop glands into the V2G electronics box through its inboard wall at |z| 0.3650, the only load in that quarter. The driver rear drop plugs onto body-11\'s rear casting, and onto its inboard face at |z| 0.3450, because that slab fills |z| 0.3450 to 0.4950 from x -1.620 aft and a drop arriving from inboard cannot reach the outboard face at 0.4950 without crossing it. Both rear drops cross the |z| 0.44 to 0.52 band while they are still under the corner box, where it is 29 to 47 mm clear, and run the inboard channel from there aft: sampled on the built curves the tightest surface clearance on either is 15.5 mm, which is 10.5 mm of margin on a 5 mm conduit.',
      why: 'The zonal argument was banked by Gen 1 so this part claims only what is new, and what is new is a package decision that was already paid for elsewhere: two doors and two seats fewer is fewer circuits, and it is the one place in this module where a narrower car with two occupants genuinely changes the low-voltage network. It is booked as mass and circuit count and not as watts, for the reason the module blurb gives and the converter panel does not repeat.',
      fail: [
        'Mixed 12 V and 48 V rails share bundles, and a chafe between them puts 48 on a 12 V net; the point-of-load bucks crowbar within microseconds, but every downstream legacy part still gets a stress test it was never qualified for.',
        'A damaged flat run is replaced, not spliced, so the service quantum is a segment rather than a wire.',
        'The rear drops are now the longest unsupported runs on the car, because a 1.20 m body has no inner quarter panel to channel them along and they cross open volume between the corner box and the casting.',
      ],
      explode: [0, 0.42, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────

   LOCAL CONSTANTS ONLY. js/common.js is not touched and no P constant moves,
   the way wheels-9 carried FRONTZ and REARZ. Every number below is swept off
   a BUILT partner mesh and the sweep is named beside it.                  */

const SILLZ = 0.6600;   /* battery-11 sill inner face below y 0.4200 AND
   body-11 floor-pan upstand inner face above it. Both measure 0.6600 to four
   places, which is the joint design/gen11.md section 7 hands to those two
   modules and the wall that makes this channel a channel. */
const LID   = 0.3080;   /* battery-11 floorlid top, measured maximum over the
   whole part. The structural lid plane is 0.3020; 0.3080 is what the built
   mesh reaches once its hardware is counted, and a clearance datum has to be
   the built number. */
const PANY  = 0.4200;   /* body-11 pan flange underside = battery-11 sill top.
   Declared by both of them under the key `sill-top`. */

const SPZ   = 0.6380;   /* spine laminate center |z|: rails at 0.6280..0.6360
   and 0.6400..0.6480, so 12.0 mm of air to the wall at SILLZ. Swept along
   the whole run at 2 cm the nearest body-11 surface is 22.0 mm at x -1.02. */
const SPY   = 0.4550;   /* channel center height. The band is bounded BELOW by
   wheels-11/master-unit, whose rerouted aft harness fills y 0.3077 to 0.3612
   inside the spine's own |z| 0.6280 to 0.6480 band and reaches y 0.3870
   anywhere in |z| 0.61 to 0.66 over the spine's x run, and ABOVE by
   body-11's cage rocker hoop, which fills y 0.4516 to 0.5997 inside
   |z| 0.5803 to 0.6975 over x -1.035 to 1.029. Measured part to part the
   built spine clears that cage by 11.5 mm at (1.010, 0.471, 0.660), the
   tightest thing above it, and everything in the channel is inside
   y 0.4400 to 0.4700 for that reason. */
const HVZ   = 0.5980;   /* 810 V front-drive run centerline, 16.0 mm inboard
   of the spine's inner rail. Nearest body-11 surface along the run 62.0 mm. */
const BWZ   = 0.5520;   /* by-wire feed centerline, innermost of the three,
   24.0 mm inboard of the HV run. Nearest body-11 surface 101.8 mm. */

const CX    = -1.4200;  /* converter center. hv-4 uses -1.3200, which puts the
   case's forward wall at -1.2000, 90 mm over the pack lid whose rear edge is
   -1.2900. The case is 240 mm long, so -1.4200 lands it at -1.5400..-1.3000
   and the CASE is aft of the lid. The keyed HV input on its forward wall is
   NOT: it reaches -1.2560, 34.00 mm over the lid across 718 vertices, and
   the part panel carries that as a stated breach with the reason it cannot
   move. The bay is 300.0 mm, from the lid's rear edge to
   drivetrain-9/tv-controller's forward face at -1.5900 measured inside this
   part's own y and z footprint, and the assembly is 292.0 mm long. Nearest
   partner surface anywhere on the part: 46.8 mm to that controller, 55.0 mm
   to battery-11/floorlid, 78.8 mm to suspension-9/rear-structure. */

const STUBX = 1.3000;   // by-wire stub station, carried from hv-4 unchanged
const STUBY = 0.4400;   // by-wire stub height, DERIVED: see the part panel
const STUBZ = 0.5200;   /* by-wire stub MATING FACE. hv-4 froze 0.7000 and
   suspension-9 proposed 0.5800; measured against wheels-11 as built, 0.5800
   puts 11.9 mm of each front stub inside a caliper spanning |z| 0.5681 to
   0.6743 in the amendment's own box. Declared, with extent, above. */

const PORT  = [-1.8450, 0.7900, 0.5720];  /* charge aperture datum, which is
   the SHROUD RIM rather than the skin. P.chargePort is [-1.92, 0.80, 0.88]
   and 0.88 is 280 mm outboard of body-11's widest surface at this station.

   ONE SET OF NUMBERS, RAY-SWEPT OFF THE BUILT LOFT, because an earlier draft
   carried three sets of them and no set matched the mesh. At the datum
   station (x -1.845, y 0.790) body-11's outermost surface is |z| 0.6000, and
   it holds 0.6000 over the whole greenhouse forward of x -1.840. Aft of that
   the tail cone tapers: 0.5961 at x -1.860, 0.5887 at -1.880, 0.5811 at
   -1.900. A 110 mm inlet therefore crosses 20 mm of taper, and the station
   that binds is its AFT edge: swept at 5 mm over the whole footprint,
   x -1.900 to -1.790 by y 0.735 to 0.845, the minimum flank is 0.5801 at
   (-1.900, 0.845). The rim on 0.5720 is 8.1 mm inboard of that minimum and
   28.0 mm inboard of the flank at the datum, so the inlet is a recessed
   pocket at every station rather than at the one that was measured.
   P is NOT touched. */
const VBOX  = [-1.8900, 0.7100, 0.4300];  /* V2G electronics, case
   x -1.965..-1.815, y 0.665..0.755, |z| 0.365..0.495. Ray-swept along z at
   2 cm stations, body-11's rear casting is a slab filling |z| 0.3450 to
   0.4950 at every station from x -1.620 to -1.780 at y 0.66, chamfered at
   its forward edge where it reads 0.3540 to 0.4860 at x -1.611, and there is
   nothing at x -1.800 or aft of it. The box's forward wall stands 35 mm
   behind the casting's aft face, in the open part. */
const BUFX  = 1.9000, BUFY = 0.6950, BUFZ = 0.0000;   /* buffer case center.
   The frunk free box at 20 mm clearance is x 1.80..2.00 by y 0.660..0.800
   across |z| 0.560; the tray under it lands on body-11/crash-rails, whose
   top face is y 0.6250 over |z| 0.3650..0.4850. */
const RAILY = 0.6250;   // body-11 crash-rail top face, measured

const ZONX  = 1.1550;   /* zonal box station |x|, held because autonomy-11 has
   already built its four node blocks 10 mm under these cases at |x| 1.115 and
   measured them against this station. It is NOT a body mount: the cage ends
   at x 1.0300 forward and carries nothing below y 0.696 aft of x -1.10, the
   floor pan stops at |x| 1.0366 and the sill at 1.080, so the nearest
   body-11 surface to this part is 41.7 mm. The part panel names that as an
   open defect rather than describing a hoop that is not there. */
const ZONZ  = 0.5600;   // zonal box center |z|, case 0.5100..0.6100
const ZONY  = 0.4500;   /* zonal box center y, case 0.4200..0.4800. It was
   0.4900 and the fin bank then stood in wheels-11/master-unit, which reroutes
   the aft brake harness this generation and MIRRORS it, so it fills y 0.438
   to 0.635 inside |z| 0.6167 over x 1.050 to 1.279 on BOTH flanks where
   wheels-10 carried it on the driver side alone. Dropped 40 mm the whole box
   clears that unit by 21.6 mm and wheels-11/calipers by 21.4 mm at its worst
   corner. Everything the part panel says about height is this number: 0.4500
   center, 0.4200 to 0.4800 case. */

/* lib.fastener seats its face on y = 0 and grows along +Y, so a head on any
   other face needs the rotation that carries +Y onto that face's outward
   normal. Carried from hv-4 with its lesson attached: seat it on the face you
   MEASURED, not on the datum you assumed. */
const FACE = {
  py: [0, 0, 0],
  ny: [Math.PI, 0, 0],
  px: [0, 0, -Math.PI / 2],
  nx: [0, 0, Math.PI / 2],
  pz: [Math.PI / 2, 0, 0],
  nz: [-Math.PI / 2, 0, 0],
};
function head(r, mat, type, pos, face) {
  const f = lib.fastener(r, mat, type);
  const e = FACE[face];
  f.rotation.set(e[0], e[1], e[2]);
  f.position.set(pos[0], pos[1], pos[2]);
  return f;
}

/* Place a sub-assembly built with +X along its own axis. setFromUnitVectors
   rather than an atan2 pair, because an atan2 with a negative run already
   carries a half turn and adding one on top is how a part ends up pointing
   into the panel it should sit on. */
function aim(obj, pos, dir) {
  const g = new THREE.Group();
  g.position.set(pos[0], pos[1], pos[2]);
  const d = new THREE.Vector3(dir[0], dir[1], dir[2]).normalize();
  g.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), d);
  g.add(obj);
  return g;
}

/* Same, with a second axis pinned: +X along the cable, +Y toward the surface
   the clip bolts to. */
function place(obj, pos, xdir, ydir) {
  const g = new THREE.Group();
  g.position.set(pos[0], pos[1], pos[2]);
  const X = new THREE.Vector3(xdir[0], xdir[1], xdir[2]).normalize();
  const Y = new THREE.Vector3(ydir[0], ydir[1], ydir[2]);
  Y.addScaledVector(X, -Y.dot(X)).normalize();
  const Z = new THREE.Vector3().crossVectors(X, Y);
  g.setRotationFromMatrix(new THREE.Matrix4().makeBasis(X, Y, Z));
  g.add(obj);
  return g;
}

/* Convoluted loom. A smooth swept tube reads like a garden hose; the orange
   runs on a real car wear ribbed conduit and the ribs are the point, because
   one every 20 to 35 mm breaks a single long highlight into a row of them.

   Pitch is set off the diameter rather than picked, at 2.6 r, because
   convoluted loom runs its convolutions at roughly one to one and a half
   diameters and anything longer reads as a wavy hose instead of a ribbed one.

   THE CONVOLUTION CUTS INWARD ONLY: crests on r, roots on r(1-2amp), so the
   swept envelope is exactly the smooth tube this replaces and no clearance in
   the module gets tighter for being detailed. Conduit is specified on its
   outside diameter anyway, so this is also the honest way around. Carried from
   hv-4 with both notes, because both are still true. */
function conduit(points, r, mat, o) {
  const q = o || {};
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(p[0], p[1], p[2])), false);
  const len = curve.getLength();
  const pitch = q.pitch != null ? q.pitch : 0.032;
  const amp = q.amp != null ? q.amp : 0.13;
  const rad = q.radial != null ? q.radial : 8;
  const N = Math.max(4, Math.round((len / pitch) * 2));
  const fr = curve.computeFrenetFrames(N, false);
  const pos = new Float32Array((N + 1) * (rad + 1) * 3);
  const uv = new Float32Array((N + 1) * (rad + 1) * 2);
  const idx = [];
  for (let i = 0; i <= N; i++) {
    const c = curve.getPoint(i / N);
    const nn = fr.normals[i], bn = fr.binormals[i];
    const rr = r * (i & 1 ? 1 - 2 * amp : 1);
    for (let j = 0; j <= rad; j++) {
      const a = (j / rad) * Math.PI * 2;
      const cs = Math.cos(a) * rr, sn = Math.sin(a) * rr;
      const k = i * (rad + 1) + j;
      pos[k * 3] = c.x + nn.x * cs + bn.x * sn;
      pos[k * 3 + 1] = c.y + nn.y * cs + bn.y * sn;
      pos[k * 3 + 2] = c.z + nn.z * cs + bn.z * sn;
      uv[k * 2] = (i / N) * len;
      uv[k * 2 + 1] = (j / rad) * Math.PI * 2 * r;
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < rad; j++) {
      const a = i * (rad + 1) + j, c = a + 1, b = a + rad + 1;
      idx.push(a, c, b, c, b + 1, b);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return lib.mesh(geo, mat);
}

/* Where a run crosses a plane and which way it is heading there, read off the
   same Catmull-Rom curve conduit() sweeps. A gland placed from this lands ON
   the cable; one placed from the control point nearest the wall lands near
   it. Also used to measure built run length. */
function crossing(points, axis, value, outward) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(p[0], p[1], p[2])), false);
  const N = 600;
  let prev = curve.getPoint(0);
  for (let i = 1; i <= N; i++) {
    const t = i / N, p = curve.getPoint(t);
    if ((prev[axis] - value) * (p[axis] - value) <= 0 && prev[axis] !== p[axis]) {
      const f = (value - prev[axis]) / (p[axis] - prev[axis]);
      const at = prev.clone().lerp(p, f);
      const tan = curve.getTangent((i - 1 + f) / N).normalize();
      if (outward != null && tan[axis] * outward < 0) tan.negate();
      return { at: at.toArray(), dir: tan.toArray() };
    }
    prev = p;
  }
  return null;
}

/* A sealed connector on the end of a run. Local +X is the mating direction:
   the mating face sits on x = 0 and the shell, the lever and the boot grow
   back along -X, so the caller aims it down the cable and the joint lands
   where the run stops. */
function connector(len, h, w, r, mat) {
  const g = new THREE.Group();
  const shell = lib.cbox(len, h, w, Math.min(0.0035, h * 0.16), mat);
  shell.position.x = -len / 2;
  g.add(shell);
  const key = lib.cbox(len * 0.78, h * 0.34, 0.0035, 0.0008, mat);
  key.position.set(-len * 0.5, 0, w / 2 + 0.0016);
  g.add(key);
  const col = lib.cyl(Math.min(h, w) * 0.33, 0.0055, M.plasticLt, 10);
  col.rotation.z = Math.PI / 2;
  col.position.x = -0.0026;
  g.add(col);
  const lev = lib.cbox(len * 0.60, 0.0045, w * 0.56, 0.001, M.plastic);
  lev.position.set(-len * 0.44, h / 2 + 0.0026, 0);
  g.add(lev);
  const boot = lib.lathe([
    [r * 1.05, 0], [r * 1.85, 0.0045], [r * 1.85, 0.013],
    [r * 1.38, 0.025], [r * 1.18, 0.034],
  ], M.plastic, 6);
  boot.rotation.z = Math.PI / 2;
  boot.position.x = -len;
  g.add(boot);
  return g;
}

/* A cable gland where a run leaves or enters a sealed box: a bolted flange on
   the box face, a hex body and a compression nut. Local +X is the outgoing
   cable direction with the flange face on x = 0. */
function gland(r, mat) {
  const g = new THREE.Group();
  const fl = lib.cbox(0.005, r * 4.2, r * 4.2, 0.0012, mat);
  fl.position.x = 0.0025;
  g.add(fl);
  const body = lib.cyl(r * 1.85, 0.010, mat, 6);
  body.rotation.z = Math.PI / 2;
  body.position.x = 0.0100;
  g.add(body);
  const nut = lib.cyl(r * 1.50, 0.0075, M.plastic, 6);
  nut.rotation.z = Math.PI / 2;
  nut.position.x = 0.0188;
  g.add(nut);
  return g;
}

/* A P-clip: a band around a cable running along local +X, on a stem dropping
   to a bolted foot at local +Y = stand. */
function pclip(r, stand, mat) {
  const g = new THREE.Group();
  const band = lib.torus(r + 0.0018, 0.0016, mat, 8, 4);
  band.rotation.y = Math.PI / 2;
  g.add(band);
  const stem = lib.cbox(0.006, Math.max(0.004, stand - r), 0.0038, 0.0008, mat);
  stem.position.y = (stand + r + 0.0018) / 2;
  g.add(stem);
  const foot = lib.cbox(0.013, 0.0035, 0.011, 0.0009, mat);
  foot.position.y = stand;
  g.add(foot);
  return g;
}

/* A tape-wrapped transition where loom stops and the last stretch runs bare
   into a connector. */
function wrap(r, len, mat) {
  const w = lib.cyl(r * 1.34, len, mat, 8);
  w.rotation.z = Math.PI / 2;
  return w;
}

/* Cut a set of [lo, hi] gaps out of [a, b] and return what survives, so a
   data lamina is interrupted at every splice and every terminal pad instead
   of running through them. A section swap is only a section swap if the
   sections end somewhere. */
function segs(a, b, cuts) {
  let parts = [[a, b]];
  for (const [lo, hi] of cuts) {
    const next = [];
    for (const [s, e] of parts) {
      if (hi <= s || lo >= e) { next.push([s, e]); continue; }
      if (lo > s) next.push([s, lo]);
      if (hi < e) next.push([hi, e]);
    }
    parts = next;
  }
  return parts.filter(([s, e]) => e - s > 0.02);
}

export function build() {
  const sys = new THREE.Group();

  /* ── 800 V to 48 V converter ─────────────────────────────────────────
     One casting in the bay aft of the pack: cast base, machined joint
     flange, bolted lid, real fin pitch, four mounting ears on webs, keyed
     HV input facing the pack it feeds from, glanded coolant ports, a manual
     service disconnect with its interlock, and the two 48 V through-bar
     decks where the loop closes.

     Mounting hardware is on ears standing outboard of the case wall, never
     on the case center plus a guess: hv-4 shipped four corner bolts wholly
     inside the box they were fixing for three generations. */
  const conv = lib.part('converter', [-0.55, 0.30, 0]);
  const cvBase = lib.cbox(0.240, 0.089, 0.440, 0.007, M.castAlu);
  cvBase.position.set(CX, 0.4045, 0);            // y 0.360 to 0.449
  conv.add(cvBase);
  const cvJoint = lib.cbox(0.256, 0.012, 0.456, 0.003, M.castAlu);
  cvJoint.position.set(CX, 0.455, 0);            // y 0.449 to 0.461, proud 8 mm
  conv.add(cvJoint);
  const cvLid = lib.cbox(0.222, 0.029, 0.422, 0.005, M.alu);
  cvLid.position.set(CX, 0.4755, 0);             // y 0.461 to 0.490
  conv.add(cvLid);
  const cvFins = lib.fins(0.20, 0.018, 0.38, 15, 0.003, M.alu);
  cvFins.position.set(CX, 0.499, 0);             // y 0.490 to 0.508
  conv.add(cvFins);
  for (const bz of [-0.220, 0.220]) {
    for (const bx of [-0.090, 0.090]) conv.add(head(0.0045, M.steel, 'hex', [CX + bx, 0.461, bz], 'py'));
  }
  for (const bx of [-0.120, 0.120]) {
    for (const bz of [-0.110, 0.110]) conv.add(head(0.0045, M.steel, 'hex', [CX + bx, 0.461, bz], 'py'));
  }
  for (const ex of [-0.080, 0.080]) {
    for (const ez of [-1, 1]) {
      const ear = lib.cbox(0.052, 0.014, 0.044, 0.004, M.castAlu);
      ear.position.set(CX + ex, 0.371, ez * 0.240);      // |z| 0.218 to 0.262
      conv.add(ear);
      const web = lib.cbox(0.018, 0.026, 0.018, 0.003, M.castAlu);
      web.position.set(CX + ex, 0.391, ez * 0.227);
      conv.add(web);
      conv.add(head(0.0055, M.steel, 'hex', [CX + ex, 0.378, ez * 0.250], 'py'));
    }
  }
  /* Keyed HV input on the +x wall, facing the pack it feeds from. It is on
     the +x wall on hv-4 too, for the same reason and after the same
     correction: on the -x wall it read 11.46 mm back into the drivetrain
     controller behind it. */
  const HVIN = 0.160;
  const hvPlate = lib.cbox(0.010, 0.064, 0.064, 0.002, M.hv);
  hvPlate.position.set(-1.295, 0.396, HVIN);
  conv.add(hvPlate);
  const hvShell = lib.cbox(0.024, 0.044, 0.044, 0.004, M.hv);
  hvShell.position.set(-1.278, 0.396, HVIN);
  conv.add(hvShell);
  const hvCol = lib.cyl(0.0135, 0.010, M.hv, 14);
  hvCol.rotation.z = Math.PI / 2;
  hvCol.position.set(-1.261, 0.396, HVIN);
  conv.add(hvCol);
  const hvLever = lib.cbox(0.028, 0.006, 0.016, 0.0015, M.plastic);
  hvLever.position.set(-1.278, 0.4215, HVIN);
  conv.add(hvLever);
  for (const pz of [-0.027, 0.027]) conv.add(head(0.0030, M.steel, 'hex', [-1.290, 0.396, HVIN + pz], 'px'));
  /* HV distribution outlets on the +x wall: front drive, thermal spur and
     the port run all leave from here rather than through a separate hop */
  for (const [oy, oz] of [[0.440, 0.060], [0.440, -0.060], [0.372, 0.075]]) {
    const boss = lib.cbox(0.012, 0.030, 0.030, 0.002, M.hv);
    boss.position.set(-1.294, oy, oz);
    conv.add(boss);
  }
  /* coolant ports: gland flange on the wall, stub, quick-connect collar */
  for (const [sz, mat] of [[-0.06, M.coolant], [0.06, M.coolantHot]]) {
    const flange = lib.cbox(0.030, 0.030, 0.010, 0.002, M.castAlu);
    flange.position.set(CX + sz, 0.40, 0.225);
    conv.add(flange);
    const stub = lib.cyl(0.008, 0.03, mat, 10);
    stub.rotation.x = Math.PI / 2;
    stub.position.set(CX + sz, 0.40, 0.232);
    conv.add(stub);
    const collar = lib.cyl(0.0105, 0.005, M.plasticLt, 12);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(CX + sz, 0.40, 0.2425);
    conv.add(collar);
  }
  /* manual service disconnect and its HVIL loop on the -z wall. A solid
     state branch cannot be melted open, so the one thing a technician can
     open by hand is the part that has to be visible. */
  const msdBody = lib.cbox(0.075, 0.055, 0.030, 0.004, M.hv);
  msdBody.position.set(CX, 0.418, -0.234);
  conv.add(msdBody);
  const msdLever = lib.cbox(0.056, 0.014, 0.020, 0.003, M.plastic);
  msdLever.position.set(CX, 0.452, -0.242);
  conv.add(msdLever);
  const hvil = lib.cbox(0.020, 0.018, 0.018, 0.002, M.plasticLt);
  hvil.position.set(CX - 0.055, 0.404, -0.228);
  conv.add(hvil);
  for (const mx of [-0.028, 0.028]) conv.add(head(0.0030, M.steel, 'hex', [CX + mx, 0.418, -0.249], 'nz'));
  /* THE 48 V THROUGH-BAR DECK, one per side wall, which is the rear half of
     the loop closure. A bolted bar under a cover, not a connector: this is
     the node the spine passes through, so it carries the full 250 A ring
     rating in either direction and has no semiconductor in the path. */
  for (const zs of [-1, 1]) {
    const deck = lib.cbox(0.086, 0.010, 0.026, 0.002, M.busbar);
    deck.position.set(CX + 0.062, 0.4200, zs * 0.2320);
    conv.add(deck);
    const cover = lib.cbox(0.096, 0.016, 0.036, 0.002, M.plastic);
    cover.position.set(CX + 0.062, 0.4330, zs * 0.2320);
    conv.add(cover);
    for (const dx of [-0.030, 0.030]) {
      conv.add(head(0.0034, M.steel, 'hex', [CX + 0.062 + dx, 0.4250, zs * 0.2320], 'py'));
    }
  }
  /* LV control and telemetry receptacle, taking the driver-side rear drop */
  const lvRecept = lib.cbox(0.026, 0.024, 0.014, 0.002, M.plasticLt);
  lvRecept.position.set(CX - 0.088, 0.400, -0.226);
  conv.add(lvRecept);
  /* HV warning plates on both side walls, clear of the coolant ports on +z
     and of the disconnect, the interlock and the receptacle on -z */
  for (const [wx, wz] of [[CX - 0.06, 1], [CX + 0.06, -1]]) {
    const warn = lib.badge([[-0.024, -0.021], [0.024, -0.021], [0, 0.021]], 0.0016, M.hv,
      { holes: [[[-0.011, -0.013], [0.011, -0.013], [0, 0.0095]]] });
    if (wz < 0) warn.rotation.y = Math.PI;
    warn.position.set(wx, 0.410, wz * 0.2205);
    conv.add(warn);
  }
  sys.add(conv);

  /* ── 48 V sill spines ────────────────────────────────────────────────
     Per side: a laminated pair standing on edge in the rocker channel, 14
     saddle brackets onto the floor pan's upstand at SILLZ, a segmented data
     lamina on the inboard face, two bolted splices, four tap pads for the
     corner boxes, and the two flexible corner transitions that close the
     loop through the converter aft and the buffer forward.

     THE LAMINATE IS VERTICAL AND THAT IS THE WHOLE SECTION CHANGE. hv-4
     pressed two 240 mm2 laminae face to face and laid them flat, 50 mm
     across and 12 mm tall. The channel that survives at a 1.20 m cabin is
     42.6 mm wide between suspension-9's air-supply trunk at |z| 0.6174 and
     the sill wall at 0.6600, so 50 mm does not go in it at any height. On
     edge, the same two 240 mm2 rails are 8 by 30 mm each and the stack is
     20 mm across the channel. */
  const SPX0 = -1.060, SPX1 = 1.080;             // battery-11 sill length
  for (const zs of [-1, 1]) {
    const sp = lib.part('spine', [0, -0.42, zs * 0.30]);

    const railIn = lib.cbox(SPX1 - SPX0, 0.030, 0.008, 0.0012, M.alu);
    railIn.position.set((SPX0 + SPX1) / 2, SPY, zs * (SPZ - 0.005));
    sp.add(railIn);
    const lam = lib.box(SPX1 - SPX0 - 0.010, 0.026, 0.004, M.plastic);
    lam.position.set((SPX0 + SPX1) / 2, SPY, zs * SPZ);
    sp.add(lam);
    const railOut = lib.cbox(SPX1 - SPX0, 0.030, 0.008, 0.0012, M.alu);
    railOut.position.set((SPX0 + SPX1) / 2, SPY, zs * (SPZ + 0.005));
    sp.add(railOut);

    /* data laminae on the inboard face, cut at the splices and the pads.
       Two counter-rotating 1 Gbit rings pressed against the power stack, so
       a severed section loses one direction of travel and the frames arrive
       the other way around microseconds later: power and data fail together
       or not at all, which is the property a by-wire car needs. */
    const spliceX = [-0.520, 0.560];
    const padX = [-0.990, -0.760, 0.760, 1.010];
    const cuts = spliceX.map((c) => [c - 0.038, c + 0.038])
      .concat(padX.map((c) => [c - 0.032, c + 0.032]));
    for (const [a, b] of segs(SPX0 + 0.02, SPX1 - 0.02, cuts)) {
      const data = lib.box(b - a, 0.014, 0.004, M.pcb);
      data.position.set((a + b) / 2, SPY, zs * (SPZ - 0.011));
      sp.add(data);
    }
    for (const sx of spliceX) {
      const plate = lib.cbox(0.060, 0.038, 0.009, 0.0018, M.alu);
      plate.position.set(sx, SPY, zs * (SPZ + 0.0135));
      sp.add(plate);
      for (const dx of [-0.018, 0.018]) {
        sp.add(head(0.0034, M.steel, 'hex', [sx + dx, SPY, zs * (SPZ + 0.018)], zs > 0 ? 'pz' : 'nz'));
      }
    }
    /* Saddle brackets onto the floor pan upstand. The foot's outboard face
       lands ON |z| SILLZ, which is what realizes the `sill-channel-inboard`
       key: the extent clause then proves nothing in this part passes it. */
    for (let i = 0; i < 7; i++) {
      const bx = SPX0 + 0.060 + i * ((SPX1 - SPX0 - 0.120) / 6);
      const foot = lib.cbox(0.022, 0.034, 0.006, 0.001, M.plasticLt);
      foot.position.set(bx, SPY, zs * (SILLZ - 0.003));
      sp.add(foot);
      const arm = lib.cbox(0.016, 0.010, 0.014, 0.001, M.plasticLt);
      arm.position.set(bx, SPY + 0.012, zs * (SPZ + 0.013));
      sp.add(arm);
      const saddle = lib.cbox(0.014, 0.040, 0.026, 0.0012, M.plastic);
      saddle.position.set(bx, SPY, zs * SPZ);
      sp.add(saddle);
      sp.add(head(0.0030, M.steel, 'hex', [bx, SPY, zs * (SILLZ - 0.0065)], zs > 0 ? 'nz' : 'pz'));
    }
    /* tap pads for the four corner boxes, two per side */
    for (const px of padX) {
      const pad = lib.cbox(0.052, 0.020, 0.008, 0.0016, M.busbar);
      pad.position.set(px, SPY + 0.008, zs * (SPZ - 0.012));
      sp.add(pad);
      for (const s of [-1, 1]) {
        sp.add(head(0.0030, M.steel, 'hex', [px + s * 0.017, SPY + 0.008, zs * (SPZ - 0.017)],
          zs > 0 ? 'nz' : 'pz'));
      }
    }

    /* THE TWO CORNER TRANSITIONS. 70 mm2 flexible cable in loom, because a
       pressed bar cannot turn through 60 degrees of climb and 400 mm of z in
       the space that is there. Both routes were swept point by point against
       all five carried modules before they were drawn. */
    const rearLink = [
      [SPX0, SPY, zs * SPZ],
      [-1.120, 0.4520, zs * 0.6100],
      [-1.190, 0.4480, zs * 0.5500],
      [-1.270, 0.4400, zs * 0.4400],
      [-1.340, 0.4300, zs * 0.3300],
      [-1.395, 0.4220, zs * 0.2560],
      [-1.420, 0.4200, zs * 0.2380],
    ];
    sp.add(conduit(rearLink, 0.010, M.plasticLt, { pitch: 0.026, radial: 6 }));
    const rl = crossing(rearLink, 'z', zs * 0.2420, -zs);
    if (rl) sp.add(aim(connector(0.022, 0.024, 0.028, 0.010, M.plasticLt), rl.at, rl.dir));

    const frontLink = [
      [SPX1, SPY, zs * SPZ],
      [1.140, 0.4600, zs * 0.6100],
      [1.200, 0.4800, zs * 0.5600],
      [1.250, 0.5300, zs * 0.5000],
      [1.292, 0.5950, zs * 0.4400],
      [1.340, 0.6400, zs * 0.3800],
      [1.440, 0.6750, zs * 0.3100],
      [1.580, 0.6950, zs * 0.2200],
      [1.720, 0.6980, zs * 0.1200],
      [1.796, 0.6950, zs * 0.0620],
    ];
    sp.add(conduit(frontLink, 0.010, M.plasticLt, { pitch: 0.026, radial: 6 }));
    const fl = crossing(frontLink, 'x', 1.7960, 1);
    if (fl) sp.add(aim(connector(0.022, 0.024, 0.028, 0.010, M.plasticLt),
      [1.7980, 0.6950, zs * 0.0600], [1, 0, -zs * 0.28]));

    sys.add(sp);
  }

  /* ── zonal controllers ───────────────────────────────────────────────
     Four corner boxes bolted to body-11's cage rocker hoops, tapping the
     spine rather than sitting in series with it. Cast case, bolted machined
     lid, a fin bank at a pitch a heatsink would use, three keyed connectors
     on the inboard wall, a gland where the sub-harness leaves, a mounting
     ear onto the hoop and a rating plate.

     hv-4 stood each of these on a 49 mm plastic foot seated on the pack lid.
     There are no feet here: the ear is the only support and it lands on
     body structure, which is the whole point. */
  for (const [zx, ear] of [[ZONX, -1], [-ZONX, 1]]) {
    for (const zs of [-1, 1]) {
      const zc = lib.part('zonal', [ear * 0.28, 0.30, zs * 0.45]);
      const zz = zs * ZONZ;
      const body = lib.cbox(0.130, 0.060, 0.100, 0.005, M.castAlu);
      body.position.set(zx, ZONY, zz);            // y 0.420 to 0.480
      zc.add(body);
      const lid = lib.cbox(0.122, 0.008, 0.086, 0.002, M.alu);
      lid.position.set(zx, 0.484, zz);
      zc.add(lid);
      const fins = lib.fins(0.104, 0.012, 0.046, 9, 0.0025, M.alu);
      fins.position.set(zx, 0.494, zz);           // y 0.488 to 0.500
      zc.add(fins);
      for (const bx of [-0.056, 0.056]) {
        for (const bz of [-0.036, 0.036]) zc.add(head(0.0032, M.steel, 'hex', [zx + bx, 0.488, zz + bz], 'py'));
      }
      /* keyed connectors on the inboard wall */
      for (const cx of [-0.038, 0, 0.038]) {
        const shell = lib.cbox(0.018, 0.024, 0.020, 0.003, M.plasticLt);
        shell.position.set(zx + cx, 0.444, zz - zs * 0.059);
        zc.add(shell);
        const key = lib.cbox(0.004, 0.015, 0.014, 0.001, M.plasticLt);
        key.position.set(zx + cx + 0.008, 0.444, zz - zs * 0.062);
        zc.add(key);
        const lev = lib.cbox(0.014, 0.005, 0.011, 0.0012, M.plastic);
        lev.position.set(zx + cx, 0.4585, zz - zs * 0.062);
        zc.add(lev);
      }
      /* gland on the wall the sub-harness actually leaves through, which is
         the -x wall on all four boxes: the front drops climb to the dash
         beam and the rear drops run aft. */
      zc.add(aim(gland(0.005, M.castAlu), [zx - 0.066, 0.456, zz], [-1, 0, 0]));
      /* laminated tap strap up to the spine's pad */
      zc.add(lib.tube([
        [zx, 0.452, zz + zs * 0.048],
        [zx + (zx > 0 ? 0.02 : -0.02), 0.456, zz + zs * 0.062],
        [zx > 0 ? 1.010 : -0.990, SPY + 0.008, zs * (SPZ - 0.014)],
      ], 0.005, M.busbar, false, 8));
      /* MOUNTING EAR, AND IT LANDS ON NOTHING. It is drawn on the wall that
         faces the car's center, which is where a bracket would go if there
         were structure to take it, and there is not: measured part by part
         the nearest body-11 surface to this whole part is 41.7 mm, and in
         the band y 0.395 to 0.525 at |x| 1.155 body-11 has no vertex at all.
         The ear is kept, drawn and named as an open defect in the part panel
         rather than deleted, because a bracket with no partner is a question
         somebody has to answer and an absent bracket is not. */
      const ex = zx > 0 ? zx - 0.075 : zx + 0.075;
      const earPl = lib.cbox(0.030, 0.010, 0.036, 0.0018, M.castAlu);
      earPl.position.set(ex, 0.434, zz);
      zc.add(earPl);
      zc.add(head(0.0034, M.steel, 'hex', [ex, 0.440, zz], 'py'));
      const plate = lib.badge([[-0.018, -0.007], [0.018, -0.007], [0.018, 0.007], [-0.018, 0.007]],
        0.0012, M.plasticLt);
      plate.rotation.y = zs > 0 ? Math.PI : 0;
      plate.position.set(zx + (zx > 0 ? 0.044 : -0.044), 0.460, zz - zs * 0.0505);
      zc.add(plate);
      sys.add(zc);
    }
  }

  /* ── 48 V buffer pack ────────────────────────────────────────────────
     LFP in the frunk on a tray that spans the two crash rails, with a ribbed
     case, a gasketed and bolted lid, terminal posts under bolted lugs, a BMS
     connector, a pressure vent and the two spine landings.

     THE TRAY IS THE NEW PART. hv-4's buffer floats in P.frunk in every one
     of the six presets it ships in and is 38.30 mm inside body-11's front
     casting in this one. body-11 builds its crash-rail top face at y 0.6250
     over |z| 0.3650 to 0.4850, so the tray lands on both rails and the case
     lands on the tray. */
  const buf = lib.part('buffer', [0.50, 0.35, 0]);
  const tray = lib.cbox(0.150, 0.007, 0.840, 0.002, M.alu);
  tray.position.set(BUFX, RAILY + 0.0035, BUFZ);   // y 0.6250 to 0.6320
  buf.add(tray);
  for (const zs of [-1, 1]) {
    for (const tx of [-0.055, 0.055]) {
      buf.add(head(0.0038, M.steel, 'hex', [BUFX + tx, RAILY + 0.007, zs * 0.4100], 'py'));
    }
    const rib = lib.cbox(0.150, 0.014, 0.010, 0.0018, M.alu);
    rib.position.set(BUFX, RAILY + 0.014, zs * 0.2600);
    buf.add(rib);
  }
  const bCase = lib.cbox(0.200, 0.115, 0.170, 0.006, M.plastic);
  bCase.position.set(BUFX, BUFY, BUFZ);            // y 0.6375 to 0.7525
  buf.add(bCase);
  for (const bz of [-1, 1]) {
    for (const bx of [-0.062, 0, 0.062]) {
      const rib = lib.cbox(0.008, 0.096, 0.005, 0.0012, M.plastic);
      rib.position.set(BUFX + bx, BUFY - 0.003, BUFZ + bz * 0.0865);
      buf.add(rib);
    }
  }
  const bGask = lib.box(0.204, 0.004, 0.174, M.rubber);
  bGask.position.set(BUFX, 0.7525, BUFZ);
  buf.add(bGask);
  const bLid = lib.cbox(0.202, 0.018, 0.172, 0.004, M.plasticLt);
  bLid.position.set(BUFX, 0.7635, BUFZ);           // y 0.7545 to 0.7725
  buf.add(bLid);
  for (const bx of [-0.088, 0.088]) {
    for (const bz of [-0.074, 0.074]) buf.add(head(0.0038, M.steel, 'hex', [BUFX + bx, 0.7725, BUFZ + bz], 'py'));
  }
  /* terminal posts, bolted lugs and insulating collars, one per spine */
  for (const zs of [-1, 1]) {
    const collar = lib.cyl(0.0145, 0.008, M.plastic, 12);
    collar.position.set(BUFX - 0.070, 0.7765, zs * 0.0600);
    buf.add(collar);
    const term = lib.cyl(0.008, 0.018, M.copper, 10);
    term.position.set(BUFX - 0.070, 0.7805, zs * 0.0600);
    buf.add(term);
    const lugPad = lib.cbox(0.030, 0.004, 0.016, 0.0009, M.copper);
    lugPad.position.set(BUFX - 0.058, 0.7910, zs * 0.0600);
    buf.add(lugPad);
    buf.add(head(0.0042, M.steel, 'hex', [BUFX - 0.070, 0.7930, zs * 0.0600], 'py'));
  }
  /* hold-down strap seated ON the lid, with a bolted tab turned down each
     end onto the case side. Heads on top of the tabs would be inside the
     strap, which is hv-4's own correction carried. */
  const strap = lib.cbox(0.024, 0.006, 0.184, 0.0012, M.steel);
  strap.position.set(BUFX + 0.060, 0.7755, BUFZ);
  buf.add(strap);
  for (const [tz, face] of [[-0.0895, 'nz'], [0.0895, 'pz']]) {
    const tab = lib.cbox(0.024, 0.030, 0.007, 0.0012, M.steel);
    tab.position.set(BUFX + 0.060, 0.7635, BUFZ + tz);
    buf.add(tab);
    buf.add(head(0.0030, M.steel, 'hex', [BUFX + 0.060, 0.758, BUFZ + tz + (face === 'nz' ? -0.0035 : 0.0035)], face));
  }
  const bms = lib.cbox(0.026, 0.020, 0.016, 0.002, M.plasticLt);
  bms.position.set(BUFX + 0.040, 0.6700, BUFZ - 0.093);
  buf.add(bms);
  const bmsLev = lib.cbox(0.018, 0.004, 0.010, 0.001, M.plastic);
  bmsLev.position.set(BUFX + 0.040, 0.6825, BUFZ - 0.095);
  buf.add(bmsLev);
  const vent = lib.cyl(0.0085, 0.012, M.plastic, 10);
  vent.rotation.z = Math.PI / 2;
  vent.position.set(BUFX + 0.106, 0.6800, BUFZ);
  buf.add(vent);
  const ventCap = lib.cyl(0.0105, 0.004, M.plasticLt, 10);
  ventCap.rotation.z = Math.PI / 2;
  ventCap.position.set(BUFX + 0.114, 0.6800, BUFZ);
  buf.add(ventCap);
  sys.add(buf);

  /* ── bidirectional charge port ───────────────────────────────────────
     A CCS2 inlet built as an inlet: a screwed mounting flange behind the
     skin, a shrouded bezel with a chamfered rim and a seal ring, a recessed
     contact face with the pins BEHIND the rim where a coupler finds them,
     the locking pin actuator, a hinged flap on real knuckles, and the V2G
     electronics in the quarter with a finned lid and a glanded pigtail.

     PORT is measured off the built loft rather than read from P: the flank
     at the datum station (x -1.845, y 0.790) is |z| 0.6000 and
     P.chargePort's 0.88 is 280.0 mm outside this body. */
  const v2g = lib.part('v2g-port', [-0.55, 0.45, 0.45]);
  const cpx = PORT[0], cpy = PORT[1], cpz = PORT[2];
  const mount = lib.cyl(0.055, 0.006, M.plastic, 20);
  mount.rotation.x = Math.PI / 2;
  mount.position.set(cpx, cpy, cpz - 0.0150);      // |z| 0.5540 to 0.5600
  v2g.add(mount);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    v2g.add(head(0.0030, M.steel, 'torx',
      [cpx + Math.cos(a) * 0.0500, cpy + Math.sin(a) * 0.0500, cpz - 0.0120], 'pz'));
  }
  const shroud = lib.lathe([
    [0.0510, 0.0000], [0.0510, 0.0180], [0.0492, 0.0215], [0.0452, 0.0215],
    [0.0434, 0.0180], [0.0434, 0.0020],
  ], M.plastic, 20);
  shroud.rotation.x = Math.PI / 2;
  shroud.position.set(cpx, cpy, cpz - 0.0215);     // rim ON the datum, 0.5720
  v2g.add(shroud);
  const seal = lib.torus(0.0450, 0.0022, M.rubber, 16, 4);
  seal.position.set(cpx, cpy, cpz - 0.0100);
  v2g.add(seal);
  const face = lib.cyl(0.0428, 0.005, M.plasticLt, 20);
  face.rotation.x = Math.PI / 2;
  face.position.set(cpx, cpy, cpz - 0.0150);
  v2g.add(face);
  /* seven Type-2 contacts above, two DC below, all 4.5 mm BEHIND the rim
     where a coupler finds them. hv-4 stood them 8 mm proud of the bezel,
     which is the one thing a charge inlet never does. */
  for (const [dx, dy] of [[-0.028, 0.008], [-0.017, 0.016], [-0.006, 0.020],
                          [0.006, 0.020], [0.017, 0.016], [0.028, 0.008], [0, 0.006]]) {
    const pin = lib.cyl(0.0050, 0.013, M.copper, 8);
    pin.rotation.x = Math.PI / 2;
    pin.position.set(cpx + dx, cpy + dy + 0.006, cpz - 0.0110);
    v2g.add(pin);
  }
  for (const dx of [-0.018, 0.018]) {
    const pin = lib.cyl(0.0110, 0.015, M.copper, 12);
    pin.rotation.x = Math.PI / 2;
    pin.position.set(cpx + dx, cpy - 0.023, cpz - 0.0120);
    v2g.add(pin);
  }
  const lockBody = lib.cbox(0.030, 0.022, 0.026, 0.003, M.plastic);
  lockBody.position.set(cpx, cpy - 0.066, cpz - 0.0230);
  v2g.add(lockBody);
  const lockPin = lib.cyl(0.0035, 0.020, M.steel, 8);
  lockPin.position.set(cpx, cpy - 0.048, cpz - 0.0190);
  v2g.add(lockPin);
  /* flap on knuckles and a real pin, hinged at the top and swung open. It
     stands proud of a flank 204.4 mm narrower at this station than the one
     hv-4 drew this inlet for, body-9 measuring |z| 0.8044 there against
     body-11's 0.6000, which is stated in the failure list rather than
     hidden. */
  /* THE HINGE IS OUTBOARD OF THE SKIN AND EVERY OTHER PIECE IS INBOARD OF
     IT, WHICH IS THE ONLY WAY THIS PART DOES NOT CROSS THE LOFT. A door leaf
     swinging about an axis IN a surface sweeps through that surface for the
     first few degrees, so the axis has to stand clear of it, and how far
     clear is a measurement rather than a guess.

     IT WAS THE WRONG MEASUREMENT AND THE GATE CAUGHT IT. This hinge stood at
     |z| 0.6000 against a flank an earlier draft read as 0.5950, and the
     flank is 0.6000: ray-swept over the hinge's own footprint, x -1.890 to
     -1.800 by y 0.828 to 0.856, body-11's outermost surface is |z| 0.6000
     everywhere forward of x -1.840 and falls away only aft of it, so the
     base straddled the skin. It read 12.46 mm into body-11/tail-cone over 20
     pairs and opened a NEW pair against body-11/skin at 4.00 mm over 22,
     which is the one thing the gate refuses. The axis is at 0.6110 now: the
     base spans |z| 0.6050 to 0.6170 and its inner face is 5.0 mm proud of a
     flank that measures 0.6000 under all of it. A hinge bracket standing
     5 mm off the skin is what a car with no pocket in its loft has to look
     like, and the failure list says so rather than the geometry hiding it. */
  const HINGEZ = 0.6110, HINGEY = cpy + 0.0520;
  const hingeBase = lib.cbox(0.082, 0.014, 0.012, 0.002, M.plastic);
  hingeBase.position.set(cpx, HINGEY, HINGEZ);     // |z| 0.5940 to 0.6060
  v2g.add(hingeBase);
  for (const kx of [-0.028, 0.028]) {
    const knuck = lib.cyl(0.0055, 0.013, M.plastic, 10);
    knuck.rotation.z = Math.PI / 2;
    knuck.position.set(cpx + kx, HINGEY, HINGEZ);
    v2g.add(knuck);
  }
  const hingePin = lib.cyl(0.0026, 0.082, M.steel, 8);
  hingePin.rotation.z = Math.PI / 2;
  hingePin.position.set(cpx, HINGEY, HINGEZ);
  v2g.add(hingePin);
  const flapPivot = new THREE.Group();
  flapPivot.position.set(cpx, HINGEY, HINGEZ);
  const flap = lib.cbox(0.118, 0.118, 0.006, 0.0018, M.paint);
  flap.position.set(0, -0.059, 0.0075);
  lib.shell(flap);
  flapPivot.add(flap);
  const flapLiner = lib.cbox(0.104, 0.102, 0.004, 0.0012, M.plastic);
  flapLiner.position.set(0, -0.059, 0.0025);
  flapPivot.add(flapLiner);
  const flapArm = lib.cbox(0.066, 0.012, 0.010, 0.0018, M.plastic);
  flapArm.position.set(0, -0.006, 0.0060);
  flapPivot.add(flapArm);
  flapPivot.rotation.x = -1.45;    // 83 degrees open; min built |z| 0.6111
  v2g.add(flapPivot);
  /* V2G electronics, directly inboard and below the inlet it serves */
  const vBox = lib.cbox(0.150, 0.090, 0.130, 0.005, M.castAlu);
  vBox.position.set(VBOX[0], VBOX[1], VBOX[2]);    // y 0.635 to 0.725
  v2g.add(vBox);
  const vLid = lib.cbox(0.142, 0.008, 0.122, 0.002, M.alu);
  vLid.position.set(VBOX[0], VBOX[1] + 0.049, VBOX[2]);
  v2g.add(vLid);
  const vFins = lib.fins(0.110, 0.011, 0.096, 13, 0.0028, M.alu);
  vFins.position.set(VBOX[0], VBOX[1] + 0.0585, VBOX[2]);
  v2g.add(vFins);
  for (const bx of [-0.061, 0.061]) {
    for (const bz of [-0.050, 0.050]) v2g.add(head(0.0035, M.steel, 'hex', [VBOX[0] + bx, VBOX[1] + 0.053, VBOX[2] + bz], 'py'));
  }
  const vWarn = lib.badge([[-0.020, -0.018], [0.020, -0.018], [0, 0.018]], 0.0014, M.hv,
    { holes: [[[-0.009, -0.011], [0.009, -0.011], [0, 0.008]]] });
  vWarn.rotation.y = Math.PI;
  vWarn.position.set(VBOX[0], VBOX[1], VBOX[2] - 0.0655);
  v2g.add(vWarn);
  /* AC pigtail: out of the back of the inlet under a strain-relief boot and
     glanded into the box's +z wall, 190 mm away */
  const acRun = [
    [cpx, cpy - 0.0100, cpz - 0.0300],
    [cpx - 0.007, cpy - 0.0280, cpz - 0.0470],
    [cpx - 0.017, cpy - 0.0460, cpz - 0.0620],
    [cpx - 0.027, cpy - 0.0620, cpz - 0.0740],
    [cpx - 0.035, cpy - 0.0720, cpz - 0.0820],
  ];
  v2g.add(conduit(acRun, 0.008, M.plasticLt, { pitch: 0.021, amp: 0.13, radial: 6 }));
  v2g.add(aim(connector(0.020, 0.026, 0.030, 0.008, M.plasticLt),
    [cpx + 0.004, cpy - 0.0020, cpz - 0.0250], [-0.20, -0.55, -0.81]));
  const acCross = crossing(acRun, 'z', VBOX[2] + 0.065, -1);
  if (acCross) v2g.add(aim(gland(0.008, M.castAlu), acCross.at,
    [-acCross.dir[0], -acCross.dir[1], -acCross.dir[2]]));
  sys.add(v2g);

  /* ── orange HV runs ──────────────────────────────────────────────────
     Six runs and twelve terminated ends. The one that moved is the front
     drive feed: hv-4 rode the pack-lid centerline on four standoff clips and
     that lid is the cabin floor now, so it takes the passenger sill channel
     at HVZ, 16.0 mm inboard of the spine's inner rail. The thermal spur
     takes the driver sill for the same reason, which keeps 7 kW of cabin
     heat out of the traction feed's channel. */
  const runs = lib.part('hv-runs', [0.18, -0.58, 0]);

  /* pack feed: battery-11's own service hatch at (-1.13, 0.315, 0.38), which
     that module carries in its header as geometry built for this one. The
     flange seats on the measured lid top and REALIZES the `pack-lid-top`
     key; the extent clause proves nothing else in this part goes below it. */
  const packFeed = [
    [-1.130, 0.3220, 0.3800],
    [-1.170, 0.3450, 0.3400],
    [-1.220, 0.3750, 0.2800],
    [-1.262, 0.3930, 0.2050],
    [-1.288, 0.3960, 0.1750],
  ];
  runs.add(conduit(packFeed, 0.012, M.hv, { pitch: 0.031 }));
  const pfPlate = lib.cbox(0.058, 0.010, 0.078, 0.003, M.hv);
  pfPlate.position.set(-1.130, LID + 0.005, 0.3860);   // y 0.3080 to 0.3180
  runs.add(pfPlate);
  const pfBoss = lib.cyl(0.019, 0.014, M.hv, 10);
  pfBoss.position.set(-1.130, 0.3250, 0.3800);
  runs.add(pfBoss);
  for (const bx of [-0.021, 0.021]) {
    for (const bz of [-0.030, 0.030]) runs.add(head(0.0030, M.steel, 'hex', [-1.130 + bx, 0.3180, 0.3860 + bz], 'py'));
  }
  const pfWarn = lib.badge([[-0.012, -0.009], [0.012, -0.009], [0, 0.009]], 0.0014, M.hv,
    { holes: [[[-0.005, -0.006], [0.005, -0.006], [0, 0.004]]] });
  pfWarn.rotation.set(-Math.PI / 2, 0, 0);
  pfWarn.position.set(-1.130, 0.3181, 0.4110);
  runs.add(pfWarn);
  const pfIn = crossing(packFeed, 'x', -1.2800, -1);
  if (pfIn) runs.add(aim(gland(0.012, M.castAlu), pfIn.at, [-pfIn.dir[0], -pfIn.dir[1], -pfIn.dir[2]]));

  /* FRONT DRIVE FEED, passenger sill. 50 mm2, 531 A peak at 508 V. */
  const drive = [
    [-1.290, 0.4400, 0.0620],
    [-1.250, 0.4460, 0.2200],
    [-1.200, 0.4520, 0.3800],
    [-1.140, 0.4550, 0.5100],
    [-1.080, 0.4550, 0.5760],
    [-0.700, 0.4550, HVZ],
    [0.000, 0.4550, HVZ],
    [0.700, 0.4550, HVZ],
    [1.070, 0.4550, 0.5820],
    [1.150, 0.4640, 0.5200],
    [1.210, 0.4720, 0.4200],
    [1.250, 0.4640, 0.2600],
    [1.272, 0.4480, 0.1200],
    [1.286, 0.4300, 0.0450],
  ];
  runs.add(conduit(drive, 0.014, M.hv, { pitch: 0.036 }));
  runs.add(aim(gland(0.014, M.castAlu), [-1.2920, 0.4400, 0.0640], [0.24, 0.04, 0.97]));
  runs.add(aim(connector(0.030, 0.036, 0.040, 0.014, M.hv),
    [1.2940, 0.4265, 0.0390], [0.66, -0.52, -0.54]));
  const dvWrap = crossing(drive, 'x', 1.2500, 1);
  if (dvWrap) runs.add(aim(wrap(0.014, 0.014, M.plastic), dvWrap.at, dvWrap.dir));
  /* channel clips, seated on the cable rather than on its datum: crossing()
     reads the same curve conduit() sweeps, so the band is concentric with
     the loom and the arm lands on the pan upstand at SILLZ. */
  for (const clipX of [-0.860, -0.300, 0.280, 0.820]) {
    const seat = crossing(drive, 'x', clipX, 1);
    if (!seat) continue;
    runs.add(place(pclip(0.0148, 0.0170, M.plastic), seat.at, seat.dir, [0, 1, 0]));
    const armLen = SILLZ - 0.006 - (seat.at[2] + 0.0170);
    const arm = lib.cbox(0.010, 0.006, Math.max(0.004, armLen), 0.001, M.plastic);
    arm.position.set(clipX, seat.at[1] + 0.0170, seat.at[2] + 0.0170 + Math.max(0.004, armLen) / 2);
    runs.add(arm);
    const foot = lib.cbox(0.018, 0.026, 0.006, 0.001, M.plastic);
    foot.position.set(clipX, seat.at[1] + 0.0170, SILLZ - 0.003);
    runs.add(foot);
  }

  /* THERMAL SPUR, driver sill. 7 kW of cabin heat at 48 V would be 145 A of
     copper for a comfort load, which is exactly the mistake the 48 V
     migration exists to avoid in the other direction, so this one earns its
     orange. It ends at the nose station thermal-11 has to land on. */
  const spur = [
    [-1.290, 0.4400, -0.0620],
    [-1.250, 0.4460, -0.2200],
    [-1.200, 0.4520, -0.3800],
    [-1.140, 0.4550, -0.5100],
    [-1.080, 0.4550, -0.5760],
    [-0.500, 0.4550, -HVZ],
    [0.200, 0.4550, -HVZ],
    [0.800, 0.4550, -0.5940],
    [1.080, 0.4620, -0.5500],
    [1.180, 0.4900, -0.4900],
    [1.250, 0.5450, -0.4300],
    [1.310, 0.6100, -0.3900],
    [1.430, 0.6600, -0.3500],
    [1.560, 0.6850, -0.3200],
    [1.648, 0.6920, -0.3020],
  ];
  runs.add(conduit(spur, 0.008, M.hv, { pitch: 0.024, radial: 6 }));
  runs.add(aim(gland(0.008, M.castAlu), [-1.2920, 0.4400, -0.0640], [0.24, 0.04, -0.97]));
  runs.add(aim(connector(0.022, 0.022, 0.026, 0.008, M.hv),
    [1.6700, 0.6940, -0.2970], [0.96, 0.09, 0.26]));
  runs.add(aim(wrap(0.008, 0.012, M.plastic), [1.6400, 0.6905, -0.3060], [0.96, 0.09, 0.26]));
  for (const clipX of [-0.700, 0.000, 0.560]) {
    const seat = crossing(spur, 'x', clipX, 1);
    if (!seat) continue;
    runs.add(place(pclip(0.0086, 0.0120, M.plastic), seat.at, seat.dir, [0, 1, 0]));
    const armLen = SILLZ - 0.006 + (seat.at[2] - 0.0120);
    const arm = lib.cbox(0.010, 0.006, Math.max(0.004, armLen), 0.001, M.plastic);
    arm.position.set(clipX, seat.at[1] + 0.0120, seat.at[2] - 0.0120 - Math.max(0.004, armLen) / 2);
    runs.add(arm);
    const foot = lib.cbox(0.018, 0.026, 0.006, 0.001, M.plastic);
    foot.position.set(clipX, seat.at[1] + 0.0120, -(SILLZ - 0.003));
    runs.add(foot);
  }

  /* two rear corner runs to drivetrain-9's service-loop brackets, which the
     built mesh puts at x -1.385 to -1.300, y 0.3796 to 0.5004, |z| <= 0.6440 */
  for (const zs of [-1, 1]) {
    /* THE RUN CROSSES |z| 0.44 TO 0.52 AT x -1.305, AND WHERE IT CROSSES IS
       THE WHOLE ROUTE. suspension-9's rear structure carries a diagonal
       member through that band: probed along z it fills |z| 0.4580 to 0.5020
       at x -1.345 over every height from y 0.376 to 0.450, thins to
       0.4750..0.4850 by x -1.360, and is absent forward of x -1.320. An
       earlier cut ran out to -1.345 before turning aft and put its conduit
       0.1 mm from that member's face, 5.53 mm inside it over 139 pairs.

       Sampled on the curve conduit() actually sweeps rather than on the
       control polygon, this route's tightest point is 22.7 mm of surface
       clearance, to drivetrain-9/service-loops at its own landing, which is
       15.7 mm of margin on a 7 mm conduit. */
    const corner = [
      [-1.288, 0.3760, zs * 0.0900],
      [-1.298, 0.3900, zs * 0.2600],
      [-1.303, 0.4050, zs * 0.4200],
      [-1.305, 0.4150, zs * 0.5000],
      [-1.318, 0.4250, zs * 0.5600],
      [-1.340, 0.4300, zs * 0.5850],
    ];
    runs.add(conduit(corner, 0.007, M.hv, { pitch: 0.020, radial: 6 }));
    runs.add(aim(gland(0.007, M.castAlu), [-1.2900, 0.3755, zs * 0.0870], [-0.11, 0.08, zs * 0.99]));
    runs.add(aim(connector(0.020, 0.020, 0.024, 0.007, M.hv),
      [-1.3375, 0.4325, zs * 0.6010], [0.10, 0.13, zs * 0.99]));
  }

  /* port run, converter to the V2G electronics box in the rear quarter */
  /* PORT RUN, AND IT CLIMBS INBOARD BEFORE IT GOES OUTBOARD. The free map of
     the rear quarter has two channels and no way between them until x -1.82:
     body-11's rear casting fills |z| 0.34 to 0.52 at every station from
     x -1.58 to -1.78 over y 0.60 to 0.72, with open volume inboard of 0.32
     and outboard of 0.54. A run drawn straight from the converter to the
     electronics box crosses the casting, which is what a first cut did at
     11.60 mm. This one climbs the inboard channel to y 0.715 and only then
     goes outboard, aft of x -1.82 where the quarter opens up. */
  const portRun = [
    [-1.545, 0.4700, 0.2000],
    [-1.570, 0.5400, 0.2400],
    [-1.590, 0.6200, 0.2700],
    [-1.605, 0.6900, 0.2900],
    [-1.690, 0.7150, 0.3000],
    [-1.790, 0.7180, 0.3100],
    [-1.870, 0.7150, 0.3400],
    [-1.895, 0.7130, 0.3700],
  ];
  runs.add(conduit(portRun, 0.010, M.hv, { pitch: 0.026, radial: 6 }));
  runs.add(aim(gland(0.010, M.castAlu), [-1.5420, 0.4660, 0.1980], [-0.42, 0.87, 0.26]));
  /* IT HAS TO REACH THE BOX TO BE GLANDED INTO IT. This run ended at
     |z| 0.3400 and the V2G box's inboard wall is at 0.3650, so crossing()
     found nothing and the gland was silently not built: a 300 mm orange run
     stopped 25 mm short of the enclosure it feeds and nothing said so,
     because a null return reads exactly like a run that needs no fitting.
     The run now ends inside the box and the gland is placed on the LAST
     crossing of that wall, found by reversing the control points. */
  const prIn = crossing([...portRun].reverse(), 'z', VBOX[2] - 0.065, -1);
  if (prIn) runs.add(aim(gland(0.010, M.castAlu), prIn.at, prIn.dir));
  sys.add(runs);

  /* ── by-wire feed pair ───────────────────────────────────────────────
     One 16 mm2 run per sill channel at BWZ, the innermost of the three
     services and the furthest from the sill wall, which is the right order
     for the run that has to survive the impact. Convoluted loom over the
     free span, three bracketed clips per side onto the pan upstand, taps
     from the two same-side corner controllers, and a tape-wrapped
     transition where the loom stops 14 mm short of each stub. */
  /* THE ROUTE DIPS INBOARD AT BOTH ENDS AND THAT IS NOT COSMETIC. The corner
     boxes occupy |z| 0.5100 to 0.6100 over x 1.090 to 1.220 and -1.220 to
     -1.090, and a feed running straight from BWZ to the stub station passes
     |z| 0.527 at x 1.155, which is inside the controller it is supposed to
     run past. It dips to |z| 0.4820 through the box stations and comes back
     out to the stub lead, clear of the box by 28 mm and of every partner by
     35 mm at its tightest, which is suspension-9's rack at x 1.270. */
  const feedRoute = (zs) => [
    [-1.294, 0.4402, zs * 0.5060],
    [-1.270, 0.4420, zs * 0.4960],
    [-1.200, 0.4470, zs * 0.4820],
    [-1.120, 0.4520, zs * 0.4880],
    [-1.040, 0.4550, zs * BWZ],
    [0.000, 0.4550, zs * BWZ],
    [1.040, 0.4550, zs * BWZ],
    [1.120, 0.4520, zs * 0.4880],
    [1.200, 0.4470, zs * 0.4820],
    [1.270, 0.4420, zs * 0.4960],
    [1.294, 0.4402, zs * 0.5060],
  ];
  for (const zs of [-1, 1]) {
    const feeds = lib.part('bywire-feeds', [0, -0.30, zs * 0.18]);
    const route = feedRoute(zs);
    feeds.add(conduit(route, 0.008, M.hv, { pitch: 0.021, radial: 6 }));
    for (const cx of [-0.900, 0.000, 0.900]) {
      const seat = crossing(route, 'x', cx, 1);
      if (!seat) continue;
      const band = lib.torus(0.0098, 0.0016, M.plastic, 10, 5);
      band.rotation.y = Math.PI / 2;
      band.position.set(cx, seat.at[1], seat.at[2]);
      feeds.add(band);
      const arm = lib.cbox(0.010, 0.005, SILLZ - 0.006 - (Math.abs(seat.at[2]) + 0.010), 0.001, M.plastic);
      arm.position.set(cx, seat.at[1] + 0.014,
        zs * ((Math.abs(seat.at[2]) + 0.010 + SILLZ - 0.006) / 2));
      feeds.add(arm);
      const stem = lib.cbox(0.008, 0.014, 0.006, 0.001, M.plastic);
      stem.position.set(cx, seat.at[1] + 0.007, seat.at[2]);
      feeds.add(stem);
      const foot = lib.cbox(0.018, 0.024, 0.006, 0.001, M.plastic);
      foot.position.set(cx, seat.at[1] + 0.014, zs * (SILLZ - 0.003));
      feeds.add(foot);
    }
    /* taps from the two same-side corner controllers, off the box's inboard
       wall and down onto the run passing 28 mm below and inboard of it */
    for (const zx of [ZONX, -ZONX]) {
      feeds.add(lib.tube([
        [zx, 0.4400, zs * (ZONZ - 0.050)],
        [zx, 0.4450, zs * 0.4950],
        [zx, 0.4480, zs * 0.4830],
      ], 0.005, M.hv, false, 6));
    }
    /* tape-wrapped transitions where the loom stops short of each stub */
    for (const xs of [-1, 1]) {
      const tape = lib.cyl(0.0104, 0.014, M.plastic, 8);
      tape.rotation.z = Math.PI / 2;
      tape.position.set(xs * 1.2830, 0.4404, zs * 0.5045);
      feeds.add(tape);
    }
    sys.add(feeds);
  }

  /* ── by-wire stub set ────────────────────────────────────────────────
     FOUR MATING FACES ON ONE MEASURED PLANE, AND THE REASON THIS IS ITS OWN
     PART. tools/interfaces.js realizes an extent over EVERY vertex of the
     named part, so a key with `extent: max` on |z| STUBZ is only meaningful
     if the part contains nothing but the stubs. Put them inside
     bywire-feeds, which owns 2.14 m of rocker run at |z| 0.5520, and the
     extent clause is either meaningless or false.

     The barrel therefore runs along Z rather than along X: the outboard end
     is a flat annulus lying exactly on STUBZ and the whole assembly grows
     inboard from it. lib.cyl's radial ring at 12 segments carries vertices
     at theta 90 and 270 degrees, which sit on |x| STUBX exactly, so the
     station key realizes off the same geometry. */
  for (const xs of [-1, 1]) {
    for (const zs of [-1, 1]) {
      const st = lib.part('bywire-stubs', [xs * 0.12, -0.30, zs * 0.55]);
      const barrel = lib.cyl(0.012, 0.024, M.hv, 12);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(xs * STUBX, STUBY, zs * (STUBZ - 0.012));   // |z| 0.4960..0.5200
      st.add(barrel);
      const flange = lib.cyl(0.0182, 0.005, M.hv, 12);
      flange.rotation.x = Math.PI / 2;
      flange.position.set(xs * STUBX, STUBY, zs * (STUBZ - 0.0025));  // face ON 0.5200
      st.add(flange);
      const crimp = lib.cyl(0.0128, 0.007, M.plastic, 6);
      crimp.rotation.x = Math.PI / 2;
      crimp.position.set(xs * STUBX, STUBY, zs * (STUBZ - 0.0275));
      st.add(crimp);
      const key = lib.cbox(0.006, 0.010, 0.014, 0.0008, M.hv);
      key.position.set(xs * (STUBX + 0.0148), STUBY, zs * (STUBZ - 0.0110));
      st.add(key);
      const lead = lib.tube([
        [xs * STUBX, STUBY, zs * (STUBZ - 0.0310)],
        [xs * 1.2940, 0.4402, zs * 0.5055],
      ], 0.008, M.hv, false, 6);
      st.add(lead);
      sys.add(st);
    }
  }

  /* ── zone sub-harnesses ──────────────────────────────────────────────
     Four drops, all four landing on measured hardware.

       front pair   climb the channel outboard of interior-11's dash side
                    panel and mate 7.0 mm off its outboard face at |z| 0.5260.
       rear +z      a gland on the V2G electronics box's inboard wall at
                    |z| 0.3650, the only load in that quarter.
       rear -z      a sealed connector 7.0 mm off body-11's rear casting on
                    its INBOARD face at |z| 0.3450.

     Both rear drops cross the rear structure's |z| 0.44 to 0.52 band while
     they are still under the corner box, which is the only station where
     that band is open, and run the inboard channel from there aft. */
  for (const zs of [-1, 1]) {
    const drops = lib.part('zone-drops', [0, 0.42, 0]);
    /* THE DROP STOPS AT THE DASH BEAM AND DOES NOT CLIMB THE A-PILLAR, AND
       THE REASON IS A MEMBER NOBODY LOOKED FOR. An earlier cut ran up the
       pillar to y 0.945 and ended in air 28.1 mm from the nearest body
       surface, which is the floating-instance defect this file criticizes
       hv-4 for. On the way there it also crossed body-11/cage at 4.48 mm
       over 64 pairs, because the cage carries a cross-car header at x 0.96
       to 1.00 that reaches |z| 0.0700: at (0.985, 0.846) the free gap is
       6 mm at EVERY |z| from 0.28 to 0.42, so no sideways offset clears it.
       A drop cannot pass a member that spans the whole car.

       interior-11 gives the landing instead, and it is a real one. Its
       dashboard builds a side panel filling |z| 0.5000 to 0.5260 over
       y 0.615 to 0.740 at x 1.02 to 1.12, and outboard of that face the
       channel to the cage is clear: swept on the curve, this route's
       tightest point is 22.0 mm, 17.0 mm of margin on a 5 mm conduit. The
       connector mates 7.0 mm off the panel's outboard face at |z| 0.5260,
       which is a bolted bracket's stack rather than a hole in a dash. */
    const front = [
      [1.086, 0.4560, zs * 0.5600],
      [1.082, 0.5200, zs * 0.5570],
      [1.076, 0.5900, zs * 0.5540],
      [1.071, 0.6500, zs * 0.5510],
      [1.068, 0.6850, zs * 0.5480],
    ];
    drops.add(conduit(front, 0.005, M.plasticLt, { pitch: 0.018, amp: 0.13, radial: 6 }));
    drops.add(aim(connector(0.024, 0.020, 0.028, 0.005, M.plasticLt),
      [1.0680, 0.6900, zs * 0.5330], [0, 0.14, -zs * 0.99]));
    drops.add(aim(wrap(0.005, 0.012, M.plastic), [1.076, 0.5900, zs * 0.5540], [-0.08, 0.99, -zs * 0.04]));
    sys.add(drops);
  }
  /* BOTH REAR DROPS LEAVE THE BOX GOING INBOARD, WHICH IS THE ONE CROSSING
     THIS QUARTER ALLOWS. suspension-9's rear structure fills |z| 0.44 to
     0.52 continuously from x -1.28 to -1.42 at every height from y 0.50 to
     0.54: probed on a 10 mm grid the free gap through that band never
     exceeds 6 mm anywhere aft of x -1.31. Earlier cuts dived across it at
     x -1.33 and read 4.79 mm inside it over 343 pairs. Forward of x -1.29
     the same band is 29 to 47 mm clear, so the drops cross |z| 0.50 while
     they are still under the corner box and run the inboard channel from
     there aft, where |z| 0.31 to 0.39 is open the whole length of the
     quarter. */
  const dropsR = lib.part('zone-drops', [0, 0.42, 0]);
  const rearP = [
    [-1.224, 0.4560, 0.5600],
    [-1.252, 0.4780, 0.4900],
    [-1.278, 0.5000, 0.4300],
    [-1.330, 0.5300, 0.3900],
    [-1.430, 0.5800, 0.3550],
    [-1.540, 0.6350, 0.3300],
    [-1.650, 0.6850, 0.3150],
    [-1.760, 0.7150, 0.3200],
    [-1.850, 0.7150, 0.3700],
  ];
  dropsR.add(conduit(rearP, 0.005, M.plasticLt, { pitch: 0.018, amp: 0.13, radial: 6 }));
  /* The gland goes on the LAST crossing of the box wall, not the first.
     crossing() walks from the start and this run leaves the corner box at
     |z| 0.5600, so asked forward it answers with the point where the drop
     dives inboard, 400 mm short of the box and in mid air. Reversing the
     control points reverses the same curve, so the first crossing found is
     the last one on the run, which is the one that is on the wall. */
  const rpIn = crossing([...rearP].reverse(), 'z', VBOX[2] - 0.065, -1);
  if (rpIn) dropsR.add(aim(gland(0.005, M.castAlu), rpIn.at, rpIn.dir));
  const rearD = [
    [-1.224, 0.4560, -0.5600],
    [-1.252, 0.4780, -0.4900],
    [-1.278, 0.5000, -0.4300],
    [-1.330, 0.5300, -0.3900],
    [-1.430, 0.5800, -0.3450],
    [-1.540, 0.6300, -0.3220],
    [-1.640, 0.6650, -0.3150],
  ];
  dropsR.add(conduit(rearD, 0.005, M.plasticLt, { pitch: 0.018, amp: 0.13, radial: 6 }));
  /* THE CONNECTOR LANDS ON THE CASTING'S INBOARD FACE, WHICH IS THE FACE
     THIS DROP CAN REACH. body-11's rear casting is a slab filling |z| 0.3450
     to 0.4950 from x -1.610 aft, so its OUTBOARD face at 0.4950 can only be
     reached by a run that is already outboard of 0.495, and this one arrives
     from inboard: an earlier cut aimed at 0.4880 and put 3.53 mm of conduit
     inside the slab at (-1.611, 0.651, -0.466) over 27 pairs. The inboard
     face measures 0.3450 over x -1.61 to -1.72 at y 0.60 to 0.68, and the
     mating face lands 7.0 mm off it at 0.3380. There is no P-clip between
     the box and here, which is what this part's own failure list already
     says about the rear drops rather than a floating clip contradicting it.

     THE CONNECTOR AXIS IS NORMAL TO THE FACE IT MATES ON, and that is a
     geometric requirement rather than a drawing preference. Aimed along the
     cable instead, at 55 degrees to the face, the shell's own 16 mm
     half-diagonal projects 13 mm further in z than its mating face does and
     the corner lands 4.45 mm inside the casting over 26 pairs, with the face
     itself still correctly 7.0 mm clear. A connector is a cylinder about the
     mating axis, so the run turns to meet it rather than the other way. */
  dropsR.add(aim(connector(0.022, 0.020, 0.026, 0.005, M.plasticLt),
    [-1.6400, 0.6650, -0.3380], [0, 0, -1]));
  sys.add(dropsR);

  return sys;
}
