/* Suspension, generation 9: the narrow-track front. suspension-4 carried
   unchanged from Gen 4 through Gen 8 and cannot survive a 140 mm front
   track change, so this is the first new suspension in five rungs.

   The thesis in one line: the front corner is TRANSLATED, not redrawn.
   Every ball joint, damper mount, spring seat and tie rod end moves 70 mm
   inboard together, so arm lengths, camber gain, caster, scrub radius,
   motion ratios and bump steer all carry exactly, and the only property
   that changes is the one the track owns, which is roll stiffness. That
   falls as track squared, 16.5 percent at the front, and the anti-roll
   decouplers buy it back by growing the bars, which they are allowed to
   do because a decoupled bar has no ride penalty to pay for its size.

   Three things this module found by sweeping partner GEOMETRY rather than
   reading partner prose, all reported in the panels:
     1. Gen 7 narrowed the rear track and nobody re-checked the roll
        stiffness split. Gen 8 has been running 62/38 against a designed
        58/42. Gen 9 puts it back exactly, and that is worth more than the
        total it also restores.
     2. drivetrain-7's rear hub carrier makes suspension-4's rear outer
        joint plane unreachable. The rear pickups move 100 mm inboard and
        the spring, damper and bar drop links move with them by the
        arithmetic that keeps the rear wheel rate identical.
     3. The Gen 4 by-wire stub points at |z| 0.70 are now inside the
        wheels at BOTH ends. Contract honored, defect reported, amendment
        named. See the 48v-feeds panel.

   BINDING interface contract with hv-4 (design/gen4.md, restated binding
   in design/gen9.md): connector bosses 30 x 20 x 20 mm centered at EXACTLY
   (+/-1.30, 0.36, +/-0.70), explode [0, -0.25, 0] on both sides. Verified
   against hv-4.js built geometry: its four stubs are cylinders r 0.012
   spanning x +/-(1.286 to 1.314), y 0.348 to 0.372, |z| 0.688 to 0.712,
   centered on the contract points to the micrometer. The bosses here sit
   on those points.

   Hard points this module CHANGES, for body-9 and drivetrain-7 to honor:
     - front strut top mounts move to (+/-1.50, 0.735, +/-0.41), 70 mm
       inboard, because the whole corner translated. The damper's own top
       mount rim tops out at y 0.729 on the built mesh, not 0.720, because
       the strut is inclined 14.9 degrees and the mount is a 34 mm disc.
     - P.driveF narrows from z +/-0.35 to z +/-0.31, measured off
       drivetrain-7's built front housing, whose widest section reaches
       |z| 0.3100 at x 1.505 to 1.585. The upper wishbone inner pivots take
       the released space at |z| 0.34.

   Interfaces this module HOLDS, both read off the partner's built mesh
   rather than its prose, and both wrong in the first draft:
     - wheels-9's front hub face is at |z| 0.6925. The hub flange lands on
       it. Drawn to 0.690 it stood 2.5 mm short of the face it clamps.
     - wheels-9's caliper bracket lands on "the upright's inboard face at
       0.6475", at (1.425, 0.488) and (1.425, 0.528). That face now exists.
       The first draft put two lugs on the knuckle body 54 and 88 mm away
       from any caliper surface, so the front brakes hung on nothing.

   One defect this module MEASURED AND DID NOT FIX, on the front uprights
   panel with all seven numbers: the front lower ball joint at r 0.120 and
   the steering arm joint at r 0.090 sit inside the brake disc's radial
   shadow, so every member reaching them crosses the disc bell web at
   |z| 0.6040. It is Gen 1 geometry translated faithfully and suspension-4
   had it too. Fixing it moves either camber gain or bump steer, which is
   the one thing a congruence generation may not do quietly. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

/* ── Governing coordinates ──────────────────────────────────────────────
   FZ is derived from the Gen 9 front corner (+/-1.45, 0.355, +/-0.74) and
   cross-checked against wheels-7's built FRONT corner translated 70 mm
   inboard, which is what wheels-9 is: disc ring |z| 0.595 to 0.645 at
   r 0.145 to 0.183, disc hat 0.680 to 0.695 at r 0.078 to 0.090, caliper
   0.559 to 0.679, wheel hub face 0.690, rim flange 0.670. Every number in
   the knuckle below is a clearance against one of those. */

const FZ = 0.74;        // front wheel center |z|, was 0.81
const RZ = 0.74;        // rear wheel center |z|, carried from Gen 7
const D = 0.07;         // the move: 70 mm per side
const LIP = 0.38;       // lower wishbone inner pivot |z| (0.45 - D)
const UIP = 0.34;       // upper wishbone inner pivot |z| (0.38 - D + 0.03)
const RJ = 0.60;        // rear outer joint plane |z|, was 0.70

/* Two underfloor mounting planes, and they are NOT the same plane. An
   earlier draft used one constant for both and described it as the battery
   lid, which is wrong in both directions.

   Cast straight down over the ECU footprint and over each rocker clip
   station against the built gen9 preset: battery-7's floorlid tops out at
   y 0.3020 at every one of them, and interior-6's NVH pad reaches y 0.3068
   over the aft outboard corner of the ECU only. The same sweep run over the
   shipped tree returns y 0.3020 as well, so the lid did NOT move during the
   crispness pass and never was at 0.3080; the ECU's published mounting
   plane has been 6.0 mm above battery-7's lid since Gen 9 shipped, and what
   it actually lands within 1.2 mm of is interior-6's pad.

   So the ECU keeps its published y 0.3080, which is the plane its panel and
   its 0.344 top are quoted against, and the rocker clips get the surface
   they really stand on. Drawn at LIDY they hung 6.0 mm over open air above
   the pack, which is the floating-hardware class this project keeps
   catching, and it is what put them in the battery envelope report as an
   intrusion rather than as adjacency. */
const LIDY = 0.3080;    // ECU flange underside, on interior-6's NVH pad
const PACKLID = 0.3020; // battery-7 floorlid top, measured at all four clips

export const SYSTEM = {
  id: 'suspension-9',
  name: 'Suspension · Gen 9 narrow track',
  color: 0xc0a2ec,
  explode: [0, -0.62, 0],
  blurb: 'The front corner moves 70 mm inboard to match the rear, and the corner is translated rather than redrawn, so every kinematic property carries and only roll stiffness changes. It falls 16.5 percent at the front and the decouplers grow the bars to put the rate and the balance back exactly, leaving 0.9 percent of roll gradient that a bar cannot reach because the roll center moved. What no control can buy back is stated in numbers: the roll-over margin and the load transfer are geometry, and geometry does not negotiate.',
  parts: {
    'front-structure': {
      name: 'Front subframe and wishbones',
      tagline: 'The corner is translated, not redrawn: same arms, same angles, 70 mm further in.',
      mass: 41,
      specs: [
        ['Wheel center', '(+/-1.45, 0.355, +/-0.74), was +/-0.81'],
        ['Lower arm', 'Inner |z| 0.38, ball joint 0.64, length unchanged'],
        ['Upper arm', 'Inner |z| 0.34, ball joint 0.63, 30 mm short of true'],
        ['Roll center', '104 mm at 1.62 m track, 95 mm true, 97 as drawn'],
        ['Camber gain', '-1.3 deg per 60 mm bump, carried'],
        ['Maturity', 'Production practice'],
        ['Mass', '41 kg here plus 16 of uprights, 57 against Gen 4\'s 55'],
      ],
      how: 'A track change can be taken two ways. Shorten the arms and leave the inner pivots where they are, and the wishbones lose 27 percent of their length: camber gain rises by a third, the instant center swings, the roll center climbs, bush loads rise, and every calibration the chassis ECU has learned since Gen 4 is wrong. Move the inner pivots inboard with the ball joints, and the corner is congruent with the one it replaces: arm lengths identical, arm angles identical, kingpin, caster and scrub radius identical, motion ratios identical, bump steer identical because the tie rod inner end travels the same 70 mm as its outer end. The second way costs package space and nothing else, and this module takes it. The lower inner pivots go from |z| 0.45 to 0.38, the upper from 0.38 to 0.34, the lower ball joint from 0.71 to 0.64, the upper from 0.70 to 0.63.\n\nOne pivot pair stops short and the panel will not round it away. A pure translation puts the upper inner pivots at |z| 0.31, inside the front drive zone. drivetrain-7\'s front housing was swept vertex by vertex rather than read: excluding the halfshafts, which drivetrain-7 already declares as living outside the zone, it reaches |z| 0.3100 at x 1.505 to 1.585 and 0.2200 at x 1.427 to 1.473. This module therefore narrows P.driveF from z +/-0.35 to +/-0.31, the measured value, and parks the upper pivots at 0.34 with their bushes spanning 0.32 to 0.36, ten millimeters outside it. The upper arm ends up 30 mm shorter than congruence would make it, 0.29 m against 0.32, which moves the front roll center from the 95 mm a true translation gives to 97 mm as drawn, against 104 mm at the old track. Nine millimeters of roll center is the entire kinematic bill for this generation. Two things still cross the narrowed zone and both are carried rather than new: the anti-roll bar center section at x 1.70 and the rack at x 1.22 have run through the drive-zone footprint since Gen 1, and both are measured clear of drivetrain-7\'s built housing, which spans x 1.338 to 1.622. A zone is a reservation; the sweep against built geometry is the test that actually matters, and this module reports both.\n\nThe subframe keeps its body interface exactly: rails at |z| 0.46, four bushed mounts at (+/-1.34 and +/-1.72, 0.30, +/-0.50), so the front casting body-9 inherits from body-8 does not move a datum. What changed inside it is the forward crossmember, which drops from y 0.25 to y 0.21. Swept over that crossmember\'s own footprint, x 1.32 to 1.40, drivetrain-7\'s front housing bottoms out at y 0.2624, and the Gen 4 crossmember topped out at y 0.285: a 22.6 mm interference across the 80 mm the crossmember is deep, and nobody had measured it. Dropped, the top goes to 0.245 and it clears by 17.4 mm, and the lower arm pivots ride on 40 mm risers. The housing\'s absolute low point is y 0.2560, but that occurs at x 1.525, well aft of this crossmember, and quoting it here would have overstated both the defect and the fix. The crossmembers also carry the pivots 170 mm from the rails now instead of 100, so they gain section and the arms lose length, and the net is plus two kilograms.',
      why: 'Congruence is the whole argument. A narrowed track is a big enough change to the car without also being a redesign of the corner, and every property that can be carried should be carried, because a property that is carried has the fleet history of the generation that proved it. The temptation with 140 mm to find is to re-optimize the kinematics at the same time and claim both wins; the discipline is to change one variable so the roll stiffness arithmetic in the decoupler panel is exactly true rather than approximately true.',
      fail: [
        'The upper pivots now sit 30 mm from a zone boundary that only exists because this module narrowed it. If any future front drive unit grows past |z| 0.310 the wishbone has nowhere to go, and the next module to widen that housing owns a suspension redesign it may not know it has bought.',
        'The dropped forward crossmember passes under the drive unit rather than beside it, so removing the unit for service now means dropping the subframe or lifting the unit through the top. The interference is fixed and the serviceability is worse, which is the honest shape of the trade.',
        'Carried arms at a narrower track see the same forces through the same sections at higher lateral load transfer, so the fatigue spectrum is slightly worse than the one the Gen 1 bushes were validated against. It is a rig question with a known answer shape and no fleet data yet.',
        'Both lower A-arm legs cross wheels-9\'s front disc bell web at |z| 0.6040, by 13.0 and 11.5 mm, because the lower ball joint they run to sits at r 0.120 from the axle and the web is solid from r 0.0900 to 0.1825. The upper legs, running to a joint at r 0.210, clear the same web by 11.9 and 12.4 mm. It is carried Gen 1 geometry and it is measured and reported in full on the front uprights panel rather than left for the integrator.',
      ],
      explode: [0.15, -0.45, 0],
    },
    'front-knuckle': {
      name: 'Front uprights',
      tagline: 'Redrawn for one reason: the old one was inside the brake disc, and two generations never noticed.',
      mass: 16,
      count: 2,
      specs: [
        ['Body plane', '|z| 0.551 to 0.583, inboard of the disc'],
        ['Bearing bore', 'r 0.0487 built, 4.6 mm clear of the CV boot'],
        ['Disc clearance', '15.5 mm to the ring face at |z| 0.5985'],
        ['Hub face', 'r 0.0575 to 0.072 annulus on |z| 0.6925'],
        ['Caliper face', 'Arch to |z| 0.6475 at (1.425, 0.488 and 0.528)'],
        ['Joints', 'Lower 0.64, upper 0.63, steering arm 0.635'],
        ['Open defect', 'Seven members cross the disc web at |z| 0.6040'],
        ['Maturity', 'Production practice'],
        ['Mass', '16 kg the pair, the Gen 1 knuckle number carried'],
      ],
      how: 'suspension-4 drew the knuckle as a single plate 70 mm inboard of the wheel center with a hub boss through it. Sweeping it against wheels-7\'s built front corner, that plate spans |z| 0.724 to 0.756 and the disc hat spans 0.750 to 0.7625 at r 0.078 to 0.090: six millimeters of plate inside the rotating hat, on every front corner, since Gen 4. Translating the same plate to the new track would have carried the defect inboard with it, so the knuckle is the one front part that is redrawn rather than moved.\n\nThe new body sits at |z| 0.551 to 0.583, 15.5 mm inboard of the disc ring face, which wheels-9\'s built mesh puts at 0.5985 rather than the 0.595 a first pass read off the ring alone. The ball joints stay exactly where the translation puts them and both clear, narrowly: lower at (1.45, 0.235, 0.64) passes the disc bore at r 0.120 with 1.7 mm to the nearest disc surface, upper at (1.45, 0.565, 0.63) clears the 0.1826 outside diameter at r 0.210 by 3.5 mm. A bearing barrel of r 0.054 runs outboard from the body to |z| 0.6845 through the hat bore, and a hub flange of r 0.072 lands flat on the wheel hub face at |z| 0.6925, which is the plane wheels-9 puts 74 vertices on at r 0 to 0.0740. That last number moved during review: the flange was drawn to 0.690 off wheels-7 prose and stood 2.5 mm short of the face it is supposed to clamp.\n\nAND THEN THE WHOLE ASSEMBLY WAS SWEPT AGAINST THE SHAFT THAT GOES THROUGH IT, WHICH NOBODY HAD DONE. Every clearance above is measured against the WHEEL. Measured against drivetrain-9 instead, this part and its front unit shared 2,036 crossing triangle pairs, the largest count anywhere on the ladder, for three reasons that are all this module\'s. The body was one solid 85 by 360 by 32 mm box with NO BEARING BORE, and since its aft face stood at x 1.4275 against an axle line at 1.45 there was not enough plate behind the axle to cut one: the outboard CV boot presents r 0.0420 across that band and stood 19.5 mm inside solid aluminum. The aft stiffening rib ran the full 300 mm at x 1.4415, 2.5 mm off the axle line, so the bar went through it. And the wheel speed lead climbed through (1.4520, 0.3400), 15.1 mm off the same line. The plate now reaches 42.5 mm further aft, keeps its forward edge and both z faces exactly where they were, and carries a real bearing bore: r 0.052 nominal, 0.0487 as built once the extrude bevel has closed the mouth, with an 18 mm wall behind it. The rib is two segments that stop clear of the bore and the lead climbs behind it. Crossings against drivetrain-9/front-unit are 2,036 to ZERO. Station by station the tightest radial gap through the plate is 4.6 mm, at z 0.575 where the boot\'s big clamp presents r 0.0420, and the tightest surface separation anywhere in the joint is 3.28 mm, between that boot and this part\'s steering arm.\n\nThe outboard end tells the other half of that story. Both modules were drawing the same hub. This part closed its barrel and its hub flange down to r 0.020 on the axis, and drivetrain-9 bolts a real CV flange of r 0.0225 to 0.0520 into that space over |z| 0.6825 to 0.6925, ten millimeters thick. Two solids, one volume, and the CV flange is the half that cannot move, because SYSTEM.interfaces declares its outboard face on 0.6925 with extent max and the checker asserts it. So this half opens: the seal land flares to r 0.0575 and the hub flange becomes an annulus of r 0.0575 to 0.0720, leaving 5.5 mm of radial air. That is the correct assembly rather than a concession, because a bolted halfshaft goes into the CENTER of a hub and the wheel clamps on the annulus around it.\n\nThe caliper interface was missed entirely and is now built. wheels-9\'s caliper does not bolt to the knuckle body: its source runs a two-lug bracket outboard of the ring face and lands it, in its own words, on the upright\'s inboard face at |z| 0.6475, at (1.425, 0.488) and (1.425, 0.528). This part had two lugs on its trailing face that stood 54 and 88 mm from any caliper surface, so the front brakes hung on nothing. An arch now reaches that face around the trailing-upper quadrant, crossing the ring band at radius 0.206 or better and topping out 2.4 mm clear of the disc, with a 26 by 78 by 8 mm pad whose inboard face is at 0.6475 exactly. It goes around the trailing side because straight over the crown is where the upper ball joint sits.',
      why: 'A knuckle is the one part in a corner that has to know where every other part is, and it is therefore the part most worth measuring rather than assuming. The lesson from Gen 8 was that a comparison run by one method over both rungs finds errors that two methods hide; the corner equivalent is that a clearance swept against built geometry finds interferences that two spec sheets agreeing with each other will not. This part proves that twice over, once in its favor and once against: the same sweep that found the plate inside the hat also found the caliper bracket landing on air and seven members crossing a disc web, and the first draft of this panel claimed the caliper was the only neighbor it touched.',
      fail: [
        'AN OPEN DEFECT, MEASURED AND NOT FIXED. wheels-9\'s front disc closes its bell with a solid web at |z| 0.6040, an annulus from r 0.0900 to 0.1825, and seven members cross it: the knuckle lower leg by 15.1 mm, the upper leg by 11.7, both lower A-arm legs by 13.0 and 11.5, the steering arm by 6.9, the tie rod by 6.6 and its outer ball joint by 8.2. The cause is one number rather than seven: the lower ball joint sits at r 0.120 and the steering arm joint at r 0.090, both inside the disc\'s radial shadow, so any metal reaching them from a body plane at 0.583 has to pass through that web. The upper joint at r 0.210 is outside the shadow and its arms clear by 11.9 and 12.4 mm, which is the proof that the drawing is right wherever the radius allows it. This is Gen 1 geometry translated faithfully: suspension-4 had the identical relationship against wheels-7\'s front disc, whose web sat at |z| 0.6740. Fixing it means moving the lower and steering joint planes inboard of 0.5985 or their radii outboard of 0.1826, and both are kinematic changes: the first moves bump steer and the roll center, the second moves camber gain and the steering ratio. Neither belongs in a generation whose entire claim is that the corner is congruent, so it is published here for whoever redraws the front corner rather than half-fixed by this one.',
        'drivetrain-7\'s front halfshafts still end at |z| 0.7625, which was the hub face when the wheel center was at 0.81. This part now puts the hub face at 0.6925, so each shaft overruns the flange it drives by 70.0 mm and its outboard joint sits in the wheel dish. wheels-9 measured and reported the same 70.0 mm; it is repeated here because the flange is this part\'s face and design/retro-gen8.md records the same interface failing one generation ago in the other direction, 10 mm short. A length that has now been wrong at two consecutive rungs should be derived from the hub face rather than carried.',
        'The hub flange is the whole axial location of the wheel and it is a 72 mm radius landing on a 74 mm face, so a 2 mm assembly error puts the flange over the edge of its seat. The pilot diameter does the locating and the flange only clamps, which is a note the assembly fixture has to enforce.',
        'Moving the body inboard lengthens the overhang from the body plane to the wheel center from 70 to 157 mm, so the bearing sees more moment for the same wheel load. The bearing is sized for it and the section is not free: that is part of the two kilograms the front structure gained.',
      ],
      explode: [0.1, -0.2, 0.35],
    },
    'rear-structure': {
      name: 'Rear subframe and links',
      tagline: 'The rear track carries, the rear rates carry to the newton, and the pickup plane moves 100 mm because the motor is in the way.',
      mass: 55,
      specs: [
        ['Wheel center', '(-1.45, 0.355, +/-0.74), carried from Gen 7'],
        ['Outer joints', '|z| 0.60, was 0.70'],
        ['Spring seat', '|z| 0.539, was 0.600, to hold the motion ratio'],
        ['Motion ratio', '0.615 at the spring, unchanged to three places'],
        ['Link couple', '0.4375 of vertical wheel load, was 0.125'],
        ['Maturity', 'Production practice'],
        ['Mass', '55 kg against suspension-4\'s 54'],
      ],
      how: 'design/gen9.md says the rear carries, and the rear track, the five-link topology, the anti-squat, the commanded toe authority and every rate do carry. What could not carry is where the links attach, and the reason is drivetrain-7 rather than this module. Sweeping its built rear corner in cylindrical coordinates about the axle: the hub carrier is a ring from r 0.1555 to 0.168 over |z| 0.657 to 0.729, the stator fills 0.127 to 0.196 over 0.636 to 0.726, the rotor 0.188 to 0.233 over 0.650 to 0.728, and a carrier flange closes the bore from r 0.069 to 0.144 over 0.6395 to 0.6495. There is a free pocket at r 0.072 to 0.1555 between |z| 0.657 and 0.729, and there is no radial or axial path out of it. wheels-7 reported 352 suspension-4 vertices inside the annulus and was too kind: the old rear outer joints are not merely intruding, they are in a sealed volume with no route to the rest of the car.\n\nSo the pickup plane moves inboard to |z| 0.60, ahead of the stator face at 0.636, and the upright becomes what an in-wheel motor axle actually needs, a carrier that ends at a flange of r 0.086 landing exactly on drivetrain-7\'s carrier flange face at |z| 0.6395. The links shorten from 0.26 to 0.16 in span. The rate arithmetic then has to be re-run rather than assumed, and it is: the spring sat at 0.16 of a 0.26 span for a motion ratio of 0.615, so it moves to 0.0985 of a 0.16 span, which is |z| 0.539, and the wheel rate and the 1.55 Hz rear ride frequency come out identical. The damper keeps its 0.769 ratio at |z| 0.563 and its inclination, and the bar drop link keeps 0.615 at 0.539. Nothing about how this axle rides changes. What changes is what it costs to hold the wheel: the wheel center is now 140 mm outboard of the joint plane instead of 40, so the couple the upper and lower links take for a given vertical wheel load goes from 0.125 to 0.4375 of it, three and a half times, and the bushes, the link sections and the carrier all grew to suit. That is where the kilogram went.',
      why: 'Two contracts were both honored for two generations and they were never checked against each other. The annulus contract said r 0.155 to 0.235 over |z| 0.65 to 0.73 was the motor\'s, and it was obeyed by the modules that read it; the rear suspension geometry predated it and was carried by a module that had no reason to re-read it. The failure mode is not carelessness, it is that carrying a part is exactly the state in which nobody re-verifies it. A slot that has not changed in five generations is the most likely place in the car to find a defect, not the least.',
      fail: [
        'A 140 mm overhang from the joint plane to the wheel center is the structural price of an in-wheel motor and it is now paid in the open rather than hidden. Carrier stiffness, not link stiffness, sets rear camber compliance from here, and a compliance number that used to belong to bushes now belongs to a casting.',
        'The rear links are 100 mm shorter, so their arc is tighter and camber gain and lateral compliance steer both rise. The rear rates are identical and the rear kinematics are not; the chassis ECU\'s rear camber map is re-learned, and that is a calibration item this module hands to the integrator rather than pretending it does not exist.',
        'The upright now bolts to a face drivetrain-7 owns, at |z| 0.6395. Any future rear motor that moves that face by a millimeter moves this suspension, and the two modules are now geometrically married in a way the annulus contract alone did not make them.',
      ],
      explode: [-0.15, -0.45, 0],
    },
    'air-springs': {
      name: 'Air springs',
      tagline: 'Carried whole, and moved: front bellows 70 mm inboard, rear seats 61 mm, both to keep the frequency they had.',
      mass: 12,
      count: 4,
      specs: [
        ['Type', 'Rolling-lobe single chamber, carried from Gen 4'],
        ['Ride frequency', '1.45 Hz front, 1.55 Hz rear, unchanged'],
        ['Front seat', 'Translated 70 mm inboard with the corner'],
        ['Rear seat', '|z| 0.539, moved to hold motion ratio 0.615'],
        ['Roll share', 'Front 497 Nm/deg of 1,383, rear 524 of 1,001'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Nothing in this part is new and both ends of the car moved it, for opposite reasons that produce the same result. At the front the whole corner translated, so the strut sits at the same angle on the same arm at the same fraction of its length, and the motion ratio is unchanged by construction. At the rear the outer joint plane moved but the wheel did not, so the seat had to be re-solved: 0.615 of the old 0.26 m span is 0.16 m from the pivot, and 0.615 of the new 0.16 m span is 0.0985 m, which puts the seat at |z| 0.539. Same ratio, same rate, same frequency, 61 mm further in.\n\nWhat the narrow track does change is how much of the roll stiffness these springs are responsible for, and the answer is less. An air spring holds a fixed ride frequency, so its rate is proportional to the load it carries, and its contribution to roll stiffness is that rate times track squared over two. At the design load the front pair gives 596 Nm per degree at a 1.62 m track and 497 at 1.48. The bars pick up the difference, so the springs go from 40 percent of front roll stiffness to 36. That is worth stating because the two devices behave differently with payload: spring roll stiffness scales with load and bar roll stiffness does not, so a bar-heavier car holds a slightly different roll balance empty than laden. It is a couple of percent and the chassis ECU now carries a load term in its roll model that it did not need in Gen 4.',
      why: 'The reason the air spring is the right part to carry through a track change is that it is the one spring type whose defining property, constant frequency under any load, is untouched by geometry. A steel coil at a new motion ratio is a new coil. An air spring at a new motion ratio is the same spring at a different pressure, and the pressure is a control variable this car already owns.',
      fail: [
        'Every failure mode from Gen 4 carries: abraded lobes from grit, slow leaks read as compressor duty trend, total loss ending on the internal bumpstop at 80 km/h. None of them got better and none got worse.',
        'The rear seat now sits 61 mm closer to the car centerline on a link that is 100 mm shorter, so the same spring force reacts through a shorter lever into the same bush. Bush load at the rear inner pivot rises about 8 percent for the same wheel load.',
        'Air spring roll stiffness falling with an empty car is not new, but it matters more now that the total is 10 percent lower. An empty car on a fast sweeping road is the condition where this generation feels least like Gen 8.',
      ],
      explode: [0, 0.62, 0.18],
    },
    'air-supply': {
      name: 'Compressor and valve block',
      tagline: 'The unit is untouched by the track. One of its four lines was not, and it was found inside a steered tire.',
      mass: 7,
      specs: [
        ['Compressor', 'Twin piston, 300 W at 48 V, carried'],
        ['Reservoir', '3.0 L at 15 bar, carried'],
        ['Lift speed', '40 mm on all corners in 6 s'],
        ['Feed', 'hv-4 front passenger zone'],
        ['Rocker line', 'Front run at |z| 0.505 to 0.522, was 0.60 to 0.62'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The reservoir and compressor sit where Gen 4 put them, ahead of the front subframe on the passenger side, on rubber, because the unit runs while the car is parked and leveling. The architecture argument is unchanged: a 3 liter tank at 15 bar converts a peak demand into an average one, so 40 mm of lift on four corners takes 6 seconds from stored air while a 300 W compressor refills at leisure, and 300 W at 48 V is 6.5 A through unremarkable wire.\n\nWhat did change is the plumbing, and one line changed for a reason the first draft of this module missed. The front spring seats moved 70 mm inboard and the rear seats 61 mm, so all four supply lines are re-routed and two of them are now shorter; the cross-car line to the driver-side front spring drops from 1.42 m to 1.28. The fourth line is the rocker trunk to the rear passenger spring, and suspension-4 ran it at |z| 0.62 to 0.63 through the front wheelhouse, which was 45 mm clear of a wheel centered on 0.81. Pulling it in by 20 mm was not enough. Sweeping wheels-9\'s built front corner about the kingpin axis, the swept solid at the commanded 14 degrees of lock reaches |z| 0.5844 at x 1.10 and 0.5600 at x 1.30, and the line as drawn stood 25.4 mm inside the tire. It now runs at 0.505 to 0.522 through that band and returns to 0.61 through the cabin, because interior-6 holds seat-rail material out to |z| 0.543 under the floor and a line pulled in for its whole length would have traded a tire for a seat rail. A pressurized line inside a steered tire is not a clearance question, it is the line, and it was found by sweeping rather than by looking, because at zero lock it was clear.\n\nLine volume is part of the lift-speed budget, and the shorter runs give back about 4 percent of the 6 second figure, which is inside the rounding and is not claimed as an improvement.',
      why: 'A generation is judged partly by what it leaves alone. The supply unit was sized for average demand rather than peak, which is why it is 7 kg rather than 12, and a track change touches neither the demand nor the average. Re-drawing it to look busy would be the opposite of engineering. Its plumbing is a different matter, and the lesson from the trunk line is worth keeping: when a wheel moves 70 mm, everything that passes its wheelhouse moves 70 mm, including the parts of the car nobody thinks of as chassis.',
      fail: [
        'A saturated dryer still cascades into wet valves and then ice. The humidity sensor watching the bed is there because nobody changes desiccant on schedule.',
        'The compressor is still the wear item at roughly eight years of duty, and the duty-cycle counter is still the leak detector.',
        'The shorter lines are stiffer in the hydraulic sense, so the pressure transient when a corner vents is marginally sharper. It is below the threshold the valve block\'s ramp already smooths, and it is stated because it was measured rather than assumed to be zero.',
        'The rocker trunk line now runs 80 mm further inboard through the front wheelhouse, which puts it closer to the battery lid and further from the sill it used to hide behind. Impact intrusion that reaches the lid now reaches this line at the same moment, and losing it strands the rear passenger corner on its bumpstop rather than only bleeding the reservoir.',
      ],
      explode: [0.55, 0.3, 0.35],
    },
    'active-dampers': {
      name: 'Active dampers',
      tagline: 'Same valve, same law, same 4 ms, and a new job holding a car with 10 percent less roll stiffness under it.',
      mass: 16,
      count: 4,
      specs: [
        ['Base', '46 mm monotube, Gen 1 bore, carried'],
        ['Valve', 'Proportional solenoid, 48 V head, 4 ms full stroke'],
        ['Force span', '0.4 to 3.2 kN at 0.5 m/s'],
        ['Front mount', '(1.50, 0.72, +/-0.41), rim to y 0.729, angle carried'],
        ['Rear mount', '|z| 0.563 at ratio 0.769, inclination unchanged'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The hardware is Gen 4\'s and the skyhook law is Gen 4\'s. Both mounts moved and neither ratio did: the front strut translated with its corner so its inclination and its 0.417 ratio are unchanged by construction, and the rear damper was re-solved onto the shorter trailing link at |z| 0.563, holding 0.769, with its top mount moved the same 80 mm in z so the strut angle is identical. A damper that keeps its ratio and its angle keeps its curve, and the whole Gen 4 damper calibration is valid on day one.\n\nWhat the dampers inherit is a transient job that got slightly harder. Roll stiffness is 10.3 percent lower than Gen 8 before the bars are re-sized and exactly equal after, but roll stiffness only sets the steady state. The transient is set by damping in roll, and roll damping from four dampers scales with track squared exactly as stiffness does, so the front pair lost 16.5 percent of its roll damping authority when the track came in. The valves make that back the only way they can, by running firmer in the roll-rate channel: the skyhook gain on the roll axis is up 18 percent at the front, which is inside the force span and costs nothing at the wheel because the same valve is doing the same work at a different set point. There is no free lunch hiding in that sentence: the dampers were not saturated before and are not saturated now.',
      why: 'The reason an active damper is the right thing to have when the track narrows is that damping is the term you can re-tune in software and stiffness is not. A passive car losing 16.5 percent of front roll damping would need new valving in every corner and a new shim stack for every market; this one needs a gain change on one axis of one controller, tested overnight.',
      fail: [
        'Higher roll-channel gain means the valve spends more of its life away from mid-stroke, which is a duty question rather than a force question. Solenoid thermal duty rises about 12 percent on a mountain road, inside the derate model and visible in it.',
        'Oil cleanliness is still what kills proportional valves, and the 5 micron spec is still the reason a field top-up with generic fluid is a slow death.',
        'AN OPEN DEFECT, MEASURED AND NOT FIXED. The front strut column stands on the same fore-and-aft station as the front halfshaft and always has. The damper axis passes 26.5 mm from the front axle line at axle height, and the partner here is drivetrain-9, not drivetrain-7: its bar is necked to r 18.6 mm between the rolled fillets, so a 21 mm damper body overlaps it by 13.1 mm rather than by the 16.6 mm suspension-4 reads against a plain 22 mm tube. Sliced the other way around about the axle line for the same answer, this part\'s innermost surface at z 0.505 is 5.5 mm out, inside a bar of 18.6. The checker reports 79.07 mm over 96 crossing triangle pairs, which is the straddle convention over-reading on a long lathe strip. The x and y of both are Gen 4 numbers and this generation moved only z, so it is carried rather than new. It is also not repairable here: 273 candidate placements of this column were swept against on-disk geometry and none fits, and the damper lower mount is a pickup point that the motion ratios and the whole congruence claim of this generation are written against, so moving it is a kinematic change and not a drawing fix. A strut has to sit ahead of or behind a driveshaft, and on this car it sits on top of one.',
        'The fail state is still passive mid, still the Gen 1 digressive curve. What it is NOT is a rollier car, and an earlier draft of this panel said it was: the decoupler collars spring to LOCK, so a dead car keeps the full 2,384 Nm per degree the re-sized bars restore, which is Gen 8\'s number. What a dead Gen 9 loses is roll DAMPING, because passive damping at the wheel is unchanged while its roll authority scales with track squared. Front roll damping falls 16.5 percent and the rear is untouched, so the passive car sits about 9 percent down in total roll damping on the same stiffness. It is under-damped in roll rather than soft in roll, which is a different feel and a different fault report.',
      ],
      explode: [0.1, 0.55, 0.3],
    },
    'arb-decouplers': {
      name: 'Anti-roll decouplers',
      tagline: 'The clutch that lets a bar be any size it likes, spent on getting 245 Nm per degree back.',
      mass: 12,
      count: 2,
      specs: [
        ['Bars', '27.7 mm front, 22.3 mm rear, was 26.5 and 21.0'],
        ['Front roll rate', '886 Nm/deg at 1.48 m, was 743'],
        ['Rear roll rate', '477 Nm/deg at 1.48 m, was 374'],
        ['Lock torque', '1,550 Nm front, 1,150 rear, was 1,400 and 900'],
        ['Straight-line state', 'Open, wheels decoupled, unchanged'],
        ['Fail state', 'Locked, sprung to lock, unchanged'],
        ['Maturity', 'Production practice'],
      ],
      how: 'This is the part design/gen9.md asked to show its arithmetic, so here is all of it, one method run over both rungs. Roll stiffness from anything mounted at the wheel scales with track squared: (1.48/1.62) squared is 0.8346, so a 140 mm narrower front track removes 16.5 percent of every front contribution. Start from the design point: 1,205 kg of sprung mass split 52/48 front to rear, because both rear traction motors are unsprung, giving 313 kg and 289 kg sprung per corner; the carried 1.45 and 1.55 Hz ride frequencies then put 26.0 N/mm under each front corner and 27.4 under each rear. Spring roll rate is wheel rate times track squared over two, which is 596 Nm per degree at the front and 628 at the rear on a 1.62 m track. Gen 4\'s stated 58/42 split closes the system and sizes the bars it shipped with: 890 Nm per degree front, 448 rear, total 2,562.\n\nNow run the same method over the rungs. Gen 7 narrowed the REAR track to 1.48 and left everything else alone, so the rear scaled by 0.8346 and nobody wrote it down: Gen 8 rolls on 1,486 front and 898 rear, a 62.3/37.7 split against a designed 58/42, with a total of 2,384. Gen 9 narrows the front too, and because both ends now scale by the same factor the split returns to exactly 58.0/42.0, with the total at 2,138, which is 10.3 percent below Gen 8. Restoring that total while holding the split needs 886 Nm per degree from the front bar against the 743 the carried bar gives, and 477 from the rear against 374. Bar stiffness goes as diameter to the fourth, so the front bar is 26.5 times 1.1923 to the quarter power, which is 27.7 mm, and the rear is 21.0 times 1.2752 to the quarter, which is 22.3. The balance comes back to the number Gen 4 designed, and the gradient comes back ALMOST to Gen 8\'s 1.98 degrees per g. The residual is the roll center. The front-structure panel measures the front roll center falling from 103.7 mm to 97.0 as drawn, and because the center of gravity sits 0.48 of the wheelbase behind the front axle the front end owns 0.52 of the roll axis height under it, so the axis drops 3.5 mm, which lengthens the roll moment arm from 0.3993 m to 0.4028. Same stiffness, longer lever: 2.00 degrees per g against 1.98, 0.9 percent worse. A bar can restore a rate and it cannot move a roll center, so that 0.9 percent is the one part of the roll loss that stays lost, and it is stated here rather than rounded into the 1.98.\n\nThat also settles a number wheels-9 published for this module to use, and the answer is that it does not apply. wheels-9 solved the front wishbone lines with the outer joints translated and the INNER PIVOTS HELD, which puts the instant center at z -1.739 and raises the front roll center to 0.1262, shortens the roll-moment arm 5.7 percent and cuts the required injection from 19.8 percent to 13.0. Every step of that is correct for the corner it describes and this module drew a different one. Translating the inner pivots too, which is the whole thesis, puts the instant center at z -2.381 and the roll center at 0.0970, so the arm gets 1.7 percent LONGER rather than 5.7 shorter and there is no credit to take. The full track term is found in the bars. Both figures come from the same construction run over both corners, which is why they can be compared at all: partner prose said 13.0 and partner geometry says the number was for another drawing.\n\nThe reason those bars can grow at all is the clutch, and the reason it is worth spending the growth here rather than on stiffer springs is that a bar is the only roll device that can be switched off. A conventional car sizes its bar as a compromise between roll control and one-wheel harshness, because a bar copies one wheel\'s bump to the other side; this bar is open on the straight, so the harshness constraint is not binding and diameter is free until stress or clutch torque says otherwise. Both were checked. At the same roll angle the front bar\'s torque rises 8.9 percent while its section modulus rises 14, so peak surface stress FALLS 4.5 percent; the rear bar has no track change to help it, so its torque rises 27.5 percent against 20 percent more section and its stress rises 6.2, which the material has and the panel states. Clutch capacity follows torque: 1,400 to 1,550 Nm front, 900 to 1,150 rear, which is a 3 mm bigger dog collar at each end and about two kilograms across the part.',
      why: 'The honest accounting of what control buys back, since the generation is built on the claim. It buys back roll stiffness completely, because roll stiffness is a rate and rates are what a bar supplies, and it buys back the roll stiffness split, which matters more than the total and had drifted unnoticed for two generations. It buys back none of the roll-over margin: static stability factor is mean track over twice the center of gravity height, no actuator appears in that expression, and at a 0.50 m center of gravity the number goes 1.62 in Gen 4, 1.55 in Gen 8 with one narrow axle, and 1.48 now. Allowing the usual 15 percent for suspension and tire compliance, the on-road threshold is about 1.26 g against Gen 8\'s 1.32, and since wheels-7\'s tire gives up at 0.74 g the car still slides half a g before it rolls and cannot roll over on flat pavement at all; what genuinely gets worse is the tripped case, where the lateral velocity needed to go over a curb falls about 4.5 percent. It buys back none of the load transfer either, because transfer is mass times acceleration times center of gravity height over track: at 0.74 g on 1,400 kg the total rises from 3,279 to 3,434 N, 4.7 percent, and all the bars do is choose the split, which moves from 2,043 front and 1,236 rear to 1,992 and 1,442. Axle capacity lost to transfer goes as the square of it, so the front actually improves 5 percent and the rear worsens 36, the sum rises 6, and on a term worth roughly 6 percent of peak lateral that is 0.4 percent of grip, about 0.003 g. Track does not change a tire\'s cornering stiffness at all; it changes load transfer, and the 13 percent of grip this ladder has given away belongs to wheels-7\'s tire and not to this track. A generation that said control recovered the narrow track would be lying by about half, and the half it recovers is the half a driver feels every day.',
      fail: [
        'The bars are stiffer when locked, so the one thing the decoupler cannot protect is a single-wheel bump taken mid-corner with the collar closed. Cross-axle disturbance transfer in that state rises 19 percent at the front and 27 at the rear, and that is the true capability cost of buying roll stiffness with diameter.',
        'Bars now supply 64 percent of front roll stiffness and 48 percent of rear, against 60 and 42 in Gen 8. Bar rate does not scale with payload and air spring rate does, so the roll balance moves a couple of percent between empty and laden and the chassis ECU carries a load term it did not need before.',
        'Rear bar surface stress is up 6.2 percent with no track change to offset it, so the rear bar is the one component in this module with less fatigue margin than its ancestor. It is within allowable and it is the item the durability fleet watches first.',
        'A software regression that closes a collar under load still machines the dog teeth away, and the teeth are now carrying 1,550 Nm. Torque-window enforcement stays in the actuator, below anything a calibration update can reach.',
      ],
      explode: [0.45, -0.25, 0],
    },
    steering: {
      name: 'Steer-by-wire rack',
      tagline: '140 mm shorter, both lanes still 760 mm apart, and the tie rods are the same two rods.',
      mass: 10,
      specs: [
        ['Rack', '0.96 m, was 1.10'],
        ['Lane centers', '+/-0.38, separation 0.76 m unchanged'],
        ['Tie rod', 'Inner |z| 0.475, outer 0.635, length unchanged'],
        ['Peak rack force', '12 kN from either lane alone'],
        ['Bump steer', 'Unchanged: both rod ends moved together'],
        ['Maturity', 'Production practice'],
        ['Mass', '10 kg against suspension-4\'s 11'],
      ],
      how: 'The rack loses 70 mm at each end because both tie rod outer ball joints came in 70 mm with the knuckles, and the inner ends came with them: 0.545 to 0.475. The rod itself is untouched, same length, same two ball joints, which is the whole reason bump steer carries. A tie rod defines a bump steer curve by its length and by where its inner end sits relative to the arm pivots, and translating a corner moves the arm pivots and the rod inner end by the same 70 mm, so the relationship is identical and the curve is identical. Nothing about steering feel or straight-line stability had to be re-tuned.\n\nThe dual-lane architecture is unchanged and deliberately so. Both ball-nut drives stay at |z| 0.38, which keeps them 760 mm apart on a shorter rack, still sharing nothing but a forged steel bar, still one hv-4 zone each, still full 12 kN authority from either lane alone and sub-2 ms failover. What the shorter rack does change is worth one sentence: the same steering arm on the same knuckle at a narrower track means the same rack travel produces the same wheel angle, because the steering arm length never moved, so the ratio, the lock and the rack force are all carried. The kilogram saved is bar, housing and the two shorter boots.',
      why: 'The steering was already the most carefully separated pair of lanes on the car and a track change is not a reason to reopen it. The interesting decision was to hold the lane separation at 760 mm on a 960 mm rack rather than let the nuts move in with the ends, because lane separation is the property that makes a flooded connector or a cooked winding a single-lane event: it buys nothing to keep the geometry tidy and lose the thing that made it redundant.',
      fail: [
        'Total electrical loss is still no steering, so both zones plus the capacitor bank must still finish a lane change, and the bank is still sized against exactly that maneuver.',
        'Feel is still synthesized and still a calibration liability, carried word for word from Gen 4.',
        'A shorter rack with the same lane separation leaves less bar between the outer nut and the rod end, so the rack\'s own bending compliance under a one-wheel curb strike rises about 9 percent. It is a comfort and precision number rather than a strength one, and it is measured rather than estimated.',
        'The tie rod and its outer ball joint cross wheels-9\'s front disc, by 6.6 and 8.2 mm at the bell web at |z| 0.6040. It is carried rather than new, the same relationship suspension-4 had against wheels-7, and the cause is on the front uprights panel: the steering arm joint sits at r 0.090 from the axle, inside the disc\'s radial shadow. It is not fixable without moving the joint, and moving the joint moves either the steering ratio or the bump steer curve, which is the one thing this panel exists to say did not change.',
      ],
      explode: [0.55, 0.12, 0],
    },
    'rear-steer': {
      name: 'Rear-steer actuator',
      tagline: 'Five kilograms that got more valuable the moment the front axle got narrower.',
      mass: 5,
      specs: [
        ['Authority', '3.0 deg each way, unchanged'],
        ['Tie rods', 'Outer ends to |z| 0.625 with the pickup plane'],
        ['Low speed', 'Opposite phase below 50 km/h'],
        ['High speed', 'Same phase above 80 km/h'],
        ['Fail', 'Sprung and pinned to center'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'The actuator is Gen 4\'s and it hangs where Gen 4 hung it, below y 0.22 under the rear subframe. Its tie rods follow the rear pickup plane inboard, landing on the knuckle toe arm at |z| 0.625 instead of 0.705, which shortens each rod by 80 mm and raises its axial load for a given toe moment by the ratio of the toe arm lengths. The thrust spec is unchanged because the toe arm moved with everything else.\n\nWhat changed is the value of the part rather than the part. A narrower front track means less yaw authority from front differential braking, 8.6 percent less, in the same direction and for the same reason drivetrain-7 reported the rear pair losing a third of its vectoring authority when the rear track came in. Rear steer is the one yaw actuator on the car whose authority does not scale with track at all: it works through slip angle, not through a force difference across a lever. In a generation that narrowed the last wide axle, the actuator that does not care about track is the one that ends up carrying the transient, and the speed schedule shifts accordingly, with the coordinator leaning on angle earlier and on brake-based yaw later than it did in Gen 8.',
      why: 'This is the clearest case on the car of a part bought for one reason paying for itself under a different one. Gen 4 added rear steer to make a 2.90 m wheelbase park like 2.2 m and to delete the lane-change tail step. Gen 9 needs it because two narrow tracks have taken every lever-arm-based yaw actuator down by nearly a tenth, and the one that works on geometry rather than leverage is suddenly the backbone.',
      fail: [
        'Stuck off-center is still worse than dead, still not back-drivable, still pinned by a sprung detent, still speed-limped past 0.5 degrees of stuck offset.',
        'The shorter tie rods carry more axial load for the same commanded toe, so the rod end bearings see about 12 percent more duty over their life. It is a service interval question, and the interval moved.',
        'Leaning harder on rear steer for yaw means a rear-steer fault is now a bigger handling event than it was in Gen 8. The fallback is the same, brake-based yaw at reduced authority, and the car is honest about telling the driver the margin shrank.',
      ],
      explode: [-0.45, -0.3, 0],
    },
    'chassis-ecu': {
      name: 'Chassis ECU',
      tagline: 'Same kilogram of computer, three new numbers in its model, still allowed to die.',
      mass: 1,
      specs: [
        ['Loop', '1 kHz, four corners plus both steer axes'],
        ['New terms', 'Roll model load term, rear camber map, yaw split'],
        ['Networks', 'Both hv-4 zonal rings'],
        ['Mounting', 'Flange flat at y 0.3080, on interior-6\'s pad over the pack'],
        ['Role', 'Comfort coordinator, never a safety path'],
        ['Fail', 'Every actuator to its local default'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The box, the loop rate, the inputs and the demotion are all Gen 4\'s, and its whole architecture argument still holds: it commands comfort and coordination and never safety, the steering lanes close their own loops, the dampers hold local spool defaults, the collars spring locked, the air valves sit on their check seats and the rear-steer pins to center. Pull its connector at speed and the car becomes a well-tuned passive car mid-corner.\n\nThree things in its model changed, and they are named so nobody looks for a fourth. The roll model gains a payload term, because bars now carry 64 percent of front roll stiffness and bar rate does not scale with load while air spring rate does. The rear camber map is re-learned, because the rear links are 100 mm shorter and their arc is tighter even though their rates are identical. And the yaw split between front rack, rear steer and brake-based vectoring is re-weighted, because the front track lost 8.6 percent of its differential-braking lever. None of the three is a new capability and all three are re-calibrations, which is exactly what a chassis ECU is for: it is the part of a track change that ships as a file rather than as metal.',
      why: 'The demotion is what makes a 1 kg single-lane box acceptable in a car that has just given away roll stiffness and roll-over margin, and it is worth restating in that context. Every rung of the fail ladder lands on a passive car, and a passive Gen 9 holds the same 2,384 Nm per degree a passive Gen 8 did, because the collars spring locked onto bars this module made bigger. It is about 9 percent down on roll damping and 0.9 percent down on roll gradient from the lower front roll center, and those are the two numbers the fault injection cases were re-run against rather than assumed unchanged.',
      fail: [
        'It is still a single point for ride quality, still obvious within one pothole, still safe by design.',
        'Preview still degrades silently in fog and snow, still says so rather than letting the driver hunt a phantom fault.',
        'Three re-calibrations in one generation is three chances for a bad release to make good hardware drive badly, and chassis tunes still ship on the slow ring with a rollback.',
      ],
      explode: [0, -0.4, -0.45],
    },
    '48v-feeds': {
      name: '48 V by-wire feeds',
      tagline: 'The contract is honored exactly, and honoring it exactly is what proves it has to change.',
      mass: 1,
      count: 4,
      specs: [
        ['Boss centers', '(+/-1.30, 0.36, +/-0.70), contract exact'],
        ['hv-4 stubs', 'Verified: x +/-1.286 to 1.314, y 0.348 to 0.372'],
        ['Front status', '10.5 mm inside the wheel spoke web at r 0.1657'],
        ['Rear status', '10.2 mm inside drivetrain-7 hub carrier bore'],
        ['Amendment', 'Stubs to |z| 0.58, both sides, one commit'],
        ['Explode', 'Pairs with hv-4 at [0, -0.25, 0]'],
        ['Maturity', 'Production practice, contract under amendment'],
      ],
      how: 'The verification design/gen9.md asked for was run against hv-4\'s built geometry rather than its prose. Its four stubs are cylinders of r 0.012 and 28 mm length spanning x plus and minus 1.286 to 1.314, y 0.348 to 0.372, |z| 0.688 to 0.712, centered on the contract points exactly. The bosses here are 30 by 20 by 20 mm on those same four points, so the mated pair is geometrically exact and departs together on the shared explode vector. That part of the contract passes.\n\nThe rest of it does not, and the reason is this generation. A by-wire stub at |z| 0.70 was chosen in Gen 4 when both wheel centers sat at |z| 0.81 with tire inner faces at 0.7325 and the rear motor annulus ran |z| 0.72 to 0.80: the stub was 33 mm inboard of the nearest rotating part and entirely sensible. Gen 7 moved the rear centers to 0.74 and the annulus to 0.65 to 0.73, and Gen 9 moves the front centers to 0.74. Both tire inner faces are now at |z| 0.6625, so all four contract points are 40 mm INSIDE their wheels. At the front the boss lands in the wheel dish: wheels-9\'s built front wheel carries its spoke web from r 0.0760 to 0.2453 across |z| 0.6995 to 0.7205, and the boss reaches r 0.1657 at |z| 0.710, so it is 10.5 mm inside it. At the rear it lands in the free pocket inside drivetrain-7\'s motor, and its forward outboard corner reaches r 0.1657 from the rear axle against a hub carrier inner radius of 0.1555, so 10.2 mm of the boss is inside the carrier.\n\nThe front LEADS are a separate question and they were re-routed, because unlike the boss they are free to move. A lead leaving that boss is inside the brake disc\'s steered path unless it is radially outside the ring\'s 0.1826 or axially clear of the band once the swing is added, and at the commanded 14 degrees of lock the disc swings 0.242 of its fore-and-aft offset in z. Drawn against the static disc they passed; swept against the steered one, the outboard lead was 12.3 mm inside the ring at 14 degrees and the branch to the front damper valve head was 16.8 mm inside it at minus 14. Both now hold |z| 0.688 out to r 0.210 before diving, and the branch runs at 0.505 to 0.545, which clears the swept band by construction. What is left inside the wheel is the boss and the 60 mm of lead in its own plane, 10.5 mm into the spoke web, and that is the contract\'s number rather than a routing choice. hv-4\'s own stub reaches r 0.1649 and is inside it by 9.4 mm, which is the decisive point: shrinking this module\'s side would hide half of a joint that does not fit.\n\nWorse than the overlap is the topology. Sweeping drivetrain-7\'s rear corner in cylindrical coordinates shows the pocket the rear stub sits in is sealed: carrier ring outboard at r 0.1555, stator from 0.127, rotor from 0.188, and a carrier flange closing r 0.069 to 0.144 across |z| 0.6395 to 0.6495. There is no radial path out and no axial path out. The rear leads drawn here therefore cross that flange between r 0.099 and 0.116, where a 24 mm feedthrough would have to exist and does not, and they are drawn that way and reported rather than routed through a fiction. The amendment is one line on each side: move all four stubs from |z| 0.70 to |z| 0.58, which keeps x, y, the rocker run, the boss size and the explode pairing, clears the front wheel dish by 82 mm and leaves the rear motor entirely. It costs hv-4 a 120 mm inboard kink at each end of each rocker run and costs this module nothing. It must be made on both sides in one commit, exactly as the Gen 8 area audit was applied to both rungs at once, because a stub moved on one side only is worse than a stub in the wrong place on both.',
      why: 'A contract that was correct when written and was invalidated by a later generation is the purest form of the drift this project keeps finding, and the right response is not to quietly move a boss. The connector face is where the drawing and the warranty change hands, so the point where it sits is not this module\'s to choose. Honor it exactly, measure what that costs, publish the number, and name the amendment. Everything else is a module editing a contract in the dark.',
      fail: [
        'As drawn, all four bosses are inside their wheels and the rear leads pass through a carrier flange with no feedthrough. This is a known, measured, reported defect in the shipped geometry, not an oversight, and it is the first thing an integrator should fix.',
        'The rocker is still the salt-spray zone and seal service life still sets the inspection interval, which the amendment does not change: |z| 0.58 is wetter than 0.70, not drier, because it sits under the floor rather than in the sill top.',
        'A 48 V arc still does not self-extinguish, so live disconnection is still procedurally forbidden and the interlock pin still opens first.',
        'Nobody re-verified this contract for four generations because both sides kept passing their own smoke tests. Contract points need a re-check every time either partner moves, and there is no test in the project that enforces that today.',
      ],
      explode: [0, -0.25, 0],
    },
  },
};

/* ── Geometry ── */

const UP = new THREE.Vector3(0, 1, 0);

/* Solid cylinder between two world points. Carried from suspension-4. */
function rod(a, b, r, mat, seg = 12) {
  const va = new THREE.Vector3(...a);
  const dir = new THREE.Vector3(...b).sub(va);
  const len = dir.length();
  const m = lib.cyl(r, len, mat, seg);
  m.position.copy(va).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(UP, dir.normalize());
  return m;
}

/* Place a group built along local Y between two world points. */
function span(g, a, b) {
  const va = new THREE.Vector3(...a);
  const dir = new THREE.Vector3(...b).sub(va);
  g.position.copy(va).addScaledVector(dir, 0.5);
  g.quaternion.setFromUnitVectors(UP, dir.clone().normalize());
  return g;
}

/* ── Detail vocabulary ──────────────────────────────────────────────────
   None of this moves a hard point. Every helper below takes the same
   governing coordinates the Gen 4 corner was drawn on and gives the part
   the features a manufactured one has: a real section on the extrusions,
   flanges and weld beads on the fabrications, draft and ribs on the
   castings, and a fastener wherever the car is actually serviced.

   ONE RULE governs the front corner and it is not cosmetic. wheels-9
   closes its front disc bell with a solid web at |z| 0.6040 over
   r 0.0900 to 0.1825, and the front uprights panel publishes the seven
   members that cross it to a tenth of a millimeter. So no detail feature
   on the front corner is allowed outboard of |z| 0.575, and the round
   shanks that do reach the web are left bit for bit. The seven numbers
   are the same numbers after this pass as before it because the geometry
   that produces them was not touched, which is a stronger guarantee than
   re-deriving them and hoping the derivation matches. */

const ZAX = new THREE.Vector3(0, 0, 1);

/* Stand an extruded section between two world points. The profile is drawn
   in the section plane and extruded along +Z, so ExtrudeGeometry caps both
   ends: a triangle fan over a non-convex forged section would not close.
   `taper` scales the section linearly root to tip, which is exact at one
   step because a sweep between two stations is linear. */
function section(shape, a, b, mat, o = {}) {
  const va = new THREE.Vector3(...a);
  const dir = new THREE.Vector3(...b).sub(va);
  const len = dir.length();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: len, bevelEnabled: false, steps: 1,
    curveSegments: o.curveSegments != null ? o.curveSegments : 3,
  });
  if (o.taper != null && o.taper !== 1) {
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const f = 1 + (o.taper - 1) * (p.getZ(i) / len);
      p.setX(i, p.getX(i) * f);
      p.setY(i, p.getY(i) * f);
    }
    geo.computeVertexNormals();
  }
  const m = lib.mesh(geo, mat);
  const d = dir.clone().normalize();
  m.quaternion.setFromUnitVectors(ZAX, d);
  /* Roll the section so its local +Y lands on world up projected into the
     section plane, otherwise a web ends up on its side wherever the
     minimal rotation happens to leave it. The atan2 below already carries
     its own half turn in the sign of the run; adding PI would point every
     flange the wrong way. */
  const up = new THREE.Vector3(0, 1, 0).addScaledVector(d, -d.y);
  if (up.lengthSq() > 1e-9) {
    up.normalize();
    const xw = new THREE.Vector3(1, 0, 0).applyQuaternion(m.quaternion);
    const yw = new THREE.Vector3(0, 1, 0).applyQuaternion(m.quaternion);
    const roll = Math.atan2(-xw.dot(up), yw.dot(up)) + (o.roll || 0);
    m.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(ZAX, roll));
  }
  m.position.copy(va);
  return lib.crease(m, o.crease != null ? o.crease : 34);
}

/* Forged I section: two flanges of width w across the top and bottom of a
   web, overall depth h. This is what a wishbone leg actually looks like in
   section and it is the single cheapest way to stop one reading as a bar. */
function iShape(w, h, ft, wt) {
  const hw = w / 2, hh = h / 2, hwt = wt / 2;
  const s = new THREE.Shape();
  s.moveTo(-hw, -hh);
  s.lineTo(hw, -hh); s.lineTo(hw, -hh + ft); s.lineTo(hwt, -hh + ft);
  s.lineTo(hwt, hh - ft); s.lineTo(hw, hh - ft); s.lineTo(hw, hh);
  s.lineTo(-hw, hh); s.lineTo(-hw, hh - ft); s.lineTo(-hwt, hh - ft);
  s.lineTo(-hwt, -hh + ft); s.lineTo(-hw, -hh + ft);
  s.closePath();
  return s;
}

/* Rounded rectangle, for a forged link that is wider than it is deep. */
function ovalShape(w, h, r) {
  const s = new THREE.Shape();
  const hw = w / 2 - r, hh = h / 2 - r;
  s.moveTo(-hw, -h / 2);
  s.lineTo(hw, -h / 2);  s.absarc(hw, -hh, r, -Math.PI / 2, 0);
  s.lineTo(w / 2, hh);   s.absarc(hw, hh, r, 0, Math.PI / 2);
  s.lineTo(-hw, h / 2);  s.absarc(-hw, hh, r, Math.PI / 2, Math.PI);
  s.lineTo(-w / 2, -hh); s.absarc(-hw, -hh, r, Math.PI, Math.PI * 1.5);
  s.closePath();
  return s;
}

/* Hollow chamfered box section, for the subframe extrusions. The wall is
   real: a crossmember runs 90 mm past the rail it crosses, so the open end
   is visible and a solid bar reads as a solid bar. */
function tubeShape(w, h, c, wall) {
  const s = new THREE.Shape();
  const hw = w / 2, hh = h / 2;
  s.moveTo(-hw + c, -hh);
  s.lineTo(hw - c, -hh); s.lineTo(hw, -hh + c);
  s.lineTo(hw, hh - c);  s.lineTo(hw - c, hh);
  s.lineTo(-hw + c, hh); s.lineTo(-hw, hh - c);
  s.lineTo(-hw, -hh + c);
  s.closePath();
  if (wall > 0) {
    const p = new THREE.Path();
    const iw = hw - wall, ih = hh - wall;
    p.moveTo(-iw, -ih); p.lineTo(iw, -ih); p.lineTo(iw, ih); p.lineTo(-iw, ih);
    p.closePath();
    s.holes.push(p);
  }
  return s;
}

/* A right-triangle gusset lying flat, legs of signed length lx and lz from
   p and thickness t upward. Eight triangles, and it is the difference
   between a welded fabrication and two bars that happen to meet. */
function flatGusset(p, lx, lz, t, mat) {
  const s = new THREE.Shape();
  s.moveTo(0, 0); s.lineTo(lx, 0); s.lineTo(0, -lz); s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, steps: 1 });
  geo.rotateX(-Math.PI / 2);   /* shape +y becomes world -z, depth becomes +y */
  const m = lib.mesh(geo, mat);
  m.position.set(...p);
  return lib.crease(m, 34);
}

/* A fillet weld bead along a joint line, 24 triangles. */
function bead(a, b, r, mat) {
  return rod(a, b, r, mat, 6);
}

/* A fabricated plate with round lightening holes, extruded along z. */
function holedPlate(w, h, t, holes, mat) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2, -h / 2); s.lineTo(w / 2, -h / 2);
  s.lineTo(w / 2, h / 2); s.lineTo(-w / 2, h / 2); s.closePath();
  for (const [hx, hy, hr] of holes) {
    const p = new THREE.Path();
    p.absarc(hx, hy, hr, 0, Math.PI * 2, true);
    s.holes.push(p);
  }
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: t, bevelEnabled: false, steps: 1, curveSegments: 8,
  });
  geo.translate(0, 0, -t / 2);
  return lib.crease(lib.mesh(geo, mat), 34);
}

/* Bush: the arm's own forged eye, the rubber, and the inner crush tube
   with a washer at each end. The flanges are the point: a plain rubber
   cylinder is what a bush looks like with its hardware left off.

   r is the OUTER radius, the eye, and everything else nests inside it. That
   is not a stylistic choice: the front upper pivot bushes are published as
   "spanning 0.32 to 0.36, ten millimeters outside" a drive zone this module
   itself narrowed to |z| 0.31, so a 1.32 r eye grown around the old rubber
   would have put 6.4 mm of aluminum inside the zone and made the panel
   wrong. Grown inward, every bush on the car keeps the exact envelope the
   plain cylinder had.

   THREE OF THIS MODULE'S EIGHT PIVOT STATIONS ARE INSIDE A CLOSED SECTION
   AND BUILD NO BUSH AT ALL. That is not a saving, it is the first lesson
   this project keeps paying for. Every mesh in the module was ray tested in
   all four viewer states, closed, x-ray, exploded and exploded x-ray, at
   1,400 directions per sampled face over both normals, and the whole five
   piece assembly came back unreachable at (1.70, 0.25, +/-0.38), which sits
   in the cavity of the x 1.70 crossmember, and at (-1.44, 0.235, 0.44) and
   (-1.64, 0.25, 0.44), which sit in the cavity of the rear rail. Those
   pivots being inside their beams is Gen 4 geometry and a detail pass may
   not move them; what it can do is not spend 1,472 triangles and 38 draw
   calls drawing what is sealed in. Draw calls are the binding budget now:
   HANDOFF.md measures Gen 9 at about 20 fps on 5,054 meshes and 378k
   triangles. The callers switch those three stations off. Every station whose
   clevis or riser is visible keeps its bush entire, crush tube and washers
   included, because the tube is the through-bolt the clevis comments are
   written about, and 544 triangles of capped internals are left in place for
   that reason and reported rather than quietly deleted. */
function bush(p, r = 0.02, h = 0.05, axis = 'x') {
  const g = new THREE.Group();
  g.add(lib.cyl(r, h * 0.80, M.alu, 12));
  g.add(lib.cyl(r * 0.78, h, M.rubber, 12));
  g.add(lib.cyl(r * 0.30, h * 1.30, M.steel, 8));
  for (const s of [-1, 1]) {
    const w = lib.cyl(r * 0.56, h * 0.10, M.darkSteel, 8);
    w.position.y = s * h * 0.58;
    g.add(w);
  }
  if (axis === 'x') g.rotation.z = Math.PI / 2;
  else if (axis === 'z') g.rotation.x = Math.PI / 2;
  g.position.set(...p);
  return g;
}

/* Plain ball: kept for the FRONT corner joints only, where the published
   disc-web interference list fixes the envelope to the tenth of a
   millimeter and a boot would add an eighth member to a list of seven. */
function balljoint(p, r = 0.02) {
  const s = lib.sphere(r, M.darkSteel, 14);
  s.position.set(...p);
  return s;
}

/* Ball joint with the hardware a real one carries: a housing, a molded
   boot with its two retaining beads, a stud and a castellated nut. `n` is
   the stud axis pointing out of the housing. Nothing here leaves the
   cylinder of radius r * 1.30 about that axis, so a joint swapped in for a
   bare sphere of radius r * 1.30 keeps the same lateral envelope. */
function joint(p, n, r, o = {}) {
  const g = new THREE.Group();
  const hr = r * 1.30;
  g.add(lib.cyl(hr, r * 1.05, M.darkSteel, 12));
  g.add(lib.lathe([
    [r * 0.34, r * 0.52], [hr * 0.96, r * 0.70], [hr * 0.86, r * 1.30], [r * 0.38, r * 1.48],
  ], M.rubber, 12));
  const stud = lib.cyl(r * 0.32, r * 1.10, M.steel, 8);
  stud.position.y = r * 1.90;
  g.add(stud);
  if (o.nut !== false) {
    const nut = lib.cyl(r * 0.62, r * 0.46, M.steel, 6);
    nut.position.y = r * 2.30;
    g.add(nut);
    const crown = lib.cyl(r * 0.50, r * 0.26, M.steel, 6);
    crown.position.y = r * 2.66;
    g.add(crown);
  }
  const d = new THREE.Vector3(...(n || [0, 1, 0]));
  if (d.lengthSq() > 1e-9) g.quaternion.setFromUnitVectors(UP, d.normalize());
  g.position.set(...p);
  return g;
}

/* A fastener head seated on a face, axis along n. lib.fastener puts its
   seating face on y = 0, so the caller owns the one thing that goes wrong
   here: p must be the VISIBLE face of the thing being bolted, swept off
   the built mesh, never its center and never its datum. */
function screw(p, n, r, mat, type = 'hex') {
  const g = lib.fastener(r, mat, type);
  const d = new THREE.Vector3(...n);
  g.quaternion.setFromUnitVectors(UP, d.normalize());
  g.position.set(...p);
  return g;
}

/* A convoluted gaiter along local Y, centered, for a rack or an actuator
   rod. Convolutions are what tells a rack boot from a bit of hose. */
function gaiter(rIn, rOut, len, conv, seg = 12, bands = true) {
  const pts = [[rIn, 0], [rOut * 0.92, len * 0.04]];
  for (let i = 0; i < conv; i++) {
    const f = (i + 0.5) / conv, g2 = (i + 1) / conv;
    pts.push([rOut, len * (0.06 + 0.88 * f)]);
    pts.push([rOut * 0.72, len * (0.06 + 0.88 * g2)]);
  }
  pts.push([rIn * 1.04, len * 0.96], [rIn, len]);
  const m = lib.lathe(pts, M.rubber, seg);
  m.position.y = -len / 2;
  const g = new THREE.Group();
  g.add(m);
  if (bands) {
    for (const y of [-len / 2 + len * 0.03, len / 2 - len * 0.03]) {
      const band = lib.cyl(rIn * 1.14, len * 0.035, M.darkSteel, seg);
      band.position.y = y;
      g.add(band);
    }
  }
  return g;
}

/* A P-clip: the strap around a line plus the foot it is screwed through.
   A pressurized line that floats through a wheelhouse is a line nobody
   routed, and this car has eleven meters of them. */
function pclip(p, n, r, drop, mat) {
  const g = new THREE.Group();
  const strap = lib.torus(r * 1.35, r * 0.30, M.darkSteel, 10, 6);
  strap.rotation.y = Math.PI / 2;
  g.add(strap);
  const stem = lib.box(r * 0.9, drop, r * 2.0, mat || M.darkSteel);
  stem.position.y = -r * 1.2 - drop / 2;
  g.add(stem);
  const foot = lib.box(r * 2.6, r * 0.5, r * 2.2, mat || M.darkSteel);
  foot.position.y = -r * 1.2 - drop;
  g.add(foot);
  const d = new THREE.Vector3(...(n || [1, 0, 0]));
  if (d.lengthSq() > 1e-9) g.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), d.normalize());
  g.position.set(...p);
  return g;
}

/* Clevis: the two ears a pivot bush actually sits between, on an x axis,
   with the pivot bolt head on the outer face of the forward ear. `drop`
   extends the ears down onto the member they stand on, and `pad` adds the
   bolt face on top for a pivot that picks up on the body above it.

   `bolt` is false at the two rear inner pivots that sit inside the hollow
   subframe rail. The ears hang below the rail and read; the bolt head lives
   in the 5.1 mm slot between the ear's outer face at x -1.4065 and the rail
   cavity around it, and the sweep returns it unreachable in all four viewer
   states. See the bush() comment. */
function clevis(p, r, halfSpan, depth, drop, mat, pad, bolt = true) {
  const g = new THREE.Group();
  for (const s of [-1, 1]) {
    const ear = lib.cbox(0.008, r * 2.7 + drop, depth, 0.002, mat);
    ear.position.set(s * halfSpan, -drop / 2, 0);
    g.add(ear);
  }
  if (bolt) g.add(screw([halfSpan + 0.004, 0, 0], [1, 0, 0], r * 0.58, M.steel));
  if (pad) {
    /* the bolt face keeps the clevis's own depth: on the front upper pivots
       that depth is what holds the assembly inside |z| 0.32 to 0.36 */
    const pl = lib.cbox(halfSpan * 2 + 0.02, 0.009, depth, 0.002, mat);
    pl.position.set(0, r * 1.55, 0);
    g.add(pl);
  }
  g.position.set(...p);
  return g;
}

/* An anti-roll bar bush: the rubber D-bush, the strap that clamps it and
   the two bolts that hold the strap down. The bar diameters are published
   to a tenth of a millimeter and neither one moves; this is the hardware
   that was missing from around them. */
function arbBush(x, y, z, barR) {
  const g = new THREE.Group();
  const ro = barR + 0.009;
  const b = lib.cyl(ro, 0.038, M.rubber, 12);
  b.rotation.x = Math.PI / 2;
  b.position.set(x, y, z);
  g.add(b);
  const top = lib.cbox(0.064, 0.008, 0.042, 0.002, M.steel);
  top.position.set(x, y + ro + 0.004, z);
  g.add(top);
  for (const xo of [-1, 1]) {
    const leg = lib.cbox(0.008, 0.050, 0.040, 0.002, M.steel);
    leg.position.set(x + xo * 0.028, y + ro - 0.021, z);
    g.add(leg);
    g.add(screw([x + xo * 0.028, y + ro + 0.008, z], [0, 1, 0], 0.0075, M.steel));
  }
  return g;
}

/* A drop link with the two rod-end housings and the length adjuster a real
   one carries, on exactly the endpoints the bar and the arm already use. */
function dropLink(a, b, r) {
  const g = new THREE.Group();
  const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b);
  const dn = vb.clone().sub(va);
  const len = dn.length();
  dn.normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(UP, dn);
  g.add(section(ovalShape(r * 2.5, r * 1.8, r * 0.62),
    va.clone().addScaledVector(dn, r * 2.2).toArray(),
    vb.clone().addScaledVector(dn, -r * 2.2).toArray(), M.darkSteel));
  for (const [p, sg] of [[va, 1], [vb, -1]]) {
    const eye = lib.cyl(r * 1.85, r * 2.5, M.darkSteel, 10);
    eye.quaternion.copy(q);
    eye.position.copy(p).addScaledVector(dn, sg * r * 1.25);
    g.add(eye);
  }
  const adj = lib.cyl(r * 1.45, r * 1.8, M.steel, 6);
  adj.quaternion.copy(q);
  adj.position.copy(va).addScaledVector(dn, len * 0.38);
  g.add(adj);
  return g;
}

/* A forged wishbone leg. An I section from the inner bush out to a
   transition, then the ORIGINAL round shank the rest of the way, so the
   published crossing of wheels-9's disc web is left untouched. */
function forgedLeg(a, b, r, mat, zSplit) {
  const g = new THREE.Group();
  const az = Math.abs(a[2]), bz = Math.abs(b[2]);
  let t = 1;
  if (zSplit != null && bz > zSplit && bz > az) t = (zSplit - az) / (bz - az);
  t = Math.max(0.10, Math.min(1, t));
  const mid = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  g.add(section(iShape(r * 1.94, r * 2.28, r * 0.50, r * 0.54), a, mid, mat, { taper: 0.82 }));
  if (t < 0.999) g.add(rod(mid, b, r, mat, 12));
  return g;
}

/* A-arm: two forged legs from the inner bushes meeting at a ball joint.
   `b1` and `b2` are false at an inner pivot the sweep found sealed inside a
   closed section, where the bush would be 192 triangles and 5 draw calls
   nobody can reach. See the bush() comment. */
function aArm(i1, i2, bj, b1 = true, b2 = true) {
  const g = new THREE.Group();
  g.add(forgedLeg(i1, bj, 0.015, M.alu, 0.575));
  g.add(forgedLeg(i2, bj, 0.015, M.alu, 0.575));
  g.add(balljoint(bj, 0.024));
  if (b1) g.add(bush(i1));
  if (b2) g.add(bush(i2));
  return g;
}

/* Subframe ladder, s = +1 front / -1 rear. Body mounts unchanged from
   Gen 4 so body-9 keeps its datums. The FRONT forward crossmember drops
   to y 0.21 to clear drivetrain-7's front housing, which starts at
   y 0.256 across x 1.338 to 1.40 (measured, not read). */
function frame(s, withTowers) {
  const g = new THREE.Group();
  const front = s > 0;
  /* Rails and crossmembers are hollow extrusions with a chamfered corner.
     The wall is not decoration: a crossmember runs 90 mm past the rail it
     crosses, so both open ends are in plain sight and a solid bar reads as
     a solid bar. Ends and centerlines are the Gen 4 ones to the millimeter:
     rails x s*1.31 to s*1.75 at |z| 0.46, crossmembers z +/-0.55 at
     x 1.36 and 1.70. */
  for (const zs of [-1, 1]) {
    g.add(section(tubeShape(0.09, 0.09, 0.012, 0.009),
      [s * 1.31, 0.25, zs * 0.46], [s * 1.75, 0.25, zs * 0.46], M.alu));
  }
  for (const xm of [1.36, 1.70]) {
    const low = front && xm === 1.36;
    const y = low ? 0.21 : 0.25;
    g.add(section(tubeShape(0.08, 0.07, 0.010, 0.008),
      [s * xm, y, -0.55], [s * xm, y, 0.55], M.alu));
    /* Fillet beads and a gusset at each of the four T joints onto the
       rails. The gusset runs toward MID rail, never outward: pointed the
       other way at the x 1.36 crossmember it overhung the rail's own
       forward end at x 1.31 by 46 mm and put sixteen vertices inside
       P.battery, which is a floating splitter with a keep-out breach
       attached. It also sits on the rail's INBOARD face at |z| 0.415 rather
       than inside the hollow section. */
    for (const zs of [-1, 1]) {
      const yTop = Math.min(y + 0.035, 0.29);
      for (const zf of [0.415, 0.505]) {
        g.add(bead([s * (xm - 0.041), yTop, zs * zf], [s * (xm + 0.041), yTop, zs * zf], 0.004, M.alu));
      }
      const xd = xm === 1.36 ? 1 : -1;
      g.add(flatGusset([s * (xm + xd * 0.041), yTop - 0.006, zs * 0.415],
        s * xd * 0.055, -zs * 0.045, 0.005, M.alu));
    }
  }
  for (const zs of [-1, 1]) {
    /* Body mount: the bush sits in a machined seat on the rail top under a
       washer and a hex head, which is what a subframe mount looks like from
       above. The four centers are untouched at (s*1.34, s*1.72, 0.30,
       +/-0.50) so body-9 keeps its datums. */
    for (const xm of [1.34, 1.72]) {
      const seat = lib.cyl(0.036, 0.012, M.alu, 14);
      seat.position.set(s * xm, 0.297, zs * 0.50);
      g.add(seat);
      const mt = lib.cyl(0.028, 0.034, M.rubber, 14);
      mt.position.set(s * xm, 0.303, zs * 0.50);
      g.add(mt);
      const wash = lib.cyl(0.032, 0.005, M.darkSteel, 14);
      wash.position.set(s * xm, 0.3225, zs * 0.50);
      g.add(wash);
      g.add(screw([s * xm, 0.325, zs * 0.50], [0, 1, 0], 0.0105, M.steel));
    }
    if (withTowers) {
      /* The rear tower is a fabricated shear panel, so it is drawn as one:
         a web with two lightening holes between a top and a bottom flange.
         Same 0.26 by 0.20 by 0.05 envelope at (s*1.47, 0.40, +/-0.48). */
      const web = holedPlate(0.26, 0.20, 0.010, [[-0.062, -0.012, 0.040], [0.062, -0.012, 0.040]], M.alu);
      web.position.set(s * 1.47, 0.40, zs * 0.48);
      g.add(web);
      for (const yf of [0.305, 0.495]) {
        const fl = lib.cbox(0.26, 0.010, 0.050, 0.003, M.alu);
        fl.position.set(s * 1.47, yf, zs * 0.48);
        g.add(fl);
      }
      for (const xf of [-0.125, 0.125]) {
        const rib = lib.cbox(0.010, 0.190, 0.044, 0.003, M.alu);
        rib.position.set(s * (1.47 + xf), 0.40, zs * 0.48);
        g.add(rib);
      }
    }
    if (front) {
      /* Riser carrying the lower arm pivot up off the dropped crossmember,
         drawn as the clevis a pivot actually lands in: two ears with the
         bush between them and the pivot bolt through both. The ear faces
         are at x 1.325 and 1.395, which is where bush()'s crush tube ends
         at x 1.3275 and 1.3925, measured off the built mesh. */
      const rz = lib.cbox(0.07, 0.05, 0.062, 0.005, M.alu);
      rz.position.set(1.36, 0.235, zs * LIP);
      g.add(rz);
      for (const xo of [-1, 1]) {
        const ear = lib.cbox(0.008, 0.046, 0.054, 0.003, M.alu);
        ear.position.set(1.36 + xo * 0.031, 0.252, zs * LIP);
        g.add(ear);
        g.add(screw([1.36 + xo * 0.035, 0.25, zs * LIP], [xo, 0, 0], 0.010, M.steel));
      }
    }
  }
  return g;
}

/* Front upright, redrawn. Body inboard of the disc ring face at |z| 0.595,
   bearing barrel through the hat bore (r 0.078), hub flange landing on the
   wheel hub face at |z| 0.690. Built on the passenger side. */
function frontUpright() {
  const g = new THREE.Group();
  /* A knuckle is a casting, so it gets what a casting has: chamfered
     edges, ribs on the unloaded face, a machined bearing seat with a step
     and a seal land, and a chamfer on the hub flange rim. The envelope is
     untouched: the body faces are still |z| 0.551 and 0.583, so the
     15.5 mm to wheels-9's ring face at 0.5985 is still 15.5 mm. */
  /* THE BODY HAD NO BEARING BORE, AND THE HALFSHAFT WENT THROUGH THE SOLID.
     It was one 85 by 360 by 32 mm chamfered box centered on x 1.47, so its
     aft face stood at x 1.4275 and the axle line it is built around is at
     x 1.45: 22.5 mm of plate, no hole. drivetrain-9's outboard CV boot
     presents r 0.0420 across that band, so the boot stood 19.5 mm inside a
     solid plate and the bar 3.9 mm clear of its aft face by luck rather
     than by a bore. That is most of the 2,036 crossing triangle pairs
     between this part and drivetrain-9/front-unit, the largest crossing
     count anywhere on the ladder.

     A bore cannot be cut into the old outline: r 0.048 about the axle
     reaches x 1.402 and the plate stopped at 1.4275, so the hole broke out
     of the aft face. The plate therefore grows AFT and keeps its forward
     edge, and the z faces do not move: measured on the built mesh they are
     still 0.5510 and 0.5830, so the 15.5 mm to wheels-9's ring face at
     0.5985 is still 15.5 mm and the spec row above still reads true.

     THE BUILT BORE IS NOT THE NOMINAL ONE AND THE SPEC ROW QUOTES THE BUILT
     ONE. The hole is cut at r 0.052 in the shape, but ExtrudeGeometry's
     bevel offsets the outline outward and the hole inward, so the plate
     finishes 3 mm larger all round at x 1.3770 to 1.5155 and y 0.2170 to
     0.5830, and the bore finishes SMALLER: 0.0497 at the inboard face,
     0.0487 through the body, pinching to 0.0423 at the outboard bevel. The
     mouth therefore narrows where a real bearing seat would flare, which is
     the one thing about this part that is drawn worse than the machine
     shop would cut it. It is left because it is measured and it clears:
     station by station against drivetrain-9's built envelope the tightest
     radial gap through the plate is 4.6 mm, at z 0.575 where the boot's big
     clamp presents r 0.0420. */
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.06625, -0.18); bodyShape.lineTo(0.06625, -0.18);
  bodyShape.lineTo(0.06625, 0.18);   bodyShape.lineTo(-0.06625, 0.18);
  bodyShape.closePath();
  const bore = new THREE.Path();
  bore.absarc(0.00375, -0.045, 0.052, 0, Math.PI * 2, true);
  bodyShape.holes.push(bore);
  const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.026, steps: 1, curveSegments: 16,
    bevelEnabled: true, bevelThickness: 0.003, bevelSize: 0.003, bevelSegments: 1,
  });
  bodyGeo.translate(0, 0, -0.013);
  const body = lib.crease(lib.mesh(bodyGeo, M.castAlu), 30);
  body.position.set(1.44625, 0.40, 0.567);
  g.add(body);
  /* Stiffening ribs, INBOARD of the body face at |z| 0.551 by construction
     so they cannot reach the disc. The aft rib ran the full 300 mm at
     x 1.4415, which puts its nearest face 2.5 mm from the axle line: it
     crossed the bore mouth and the halfshaft bar went through it. It is now
     two segments that stop clear of the bore, which is what a rib does on a
     real casting anyway, because a rib that crosses a machined bore is a
     rib the machinist cuts in half. The forward rib at x 1.4985 is 42.5 mm
     off the axle, clears the bar by 24 mm and only laps the bore mouth by
     5.5 mm, so it is left whole. */
  for (const [x, y, h] of [[1.4415, 0.2775, 0.055], [1.4415, 0.4775, 0.145],
                           [1.4985, 0.400, 0.300]]) {
    const rib = lib.cbox(0.012, h, 0.011, 0.002, M.castAlu);
    rib.position.set(x, y, 0.5455);
    g.add(rib);
  }
  /* The rib tie moves up 14.5 mm so it lands on the two upper rib segments
     instead of lying across the bore mouth at y 0.3935 to 0.4065. */
  const cross = lib.cbox(0.075, 0.013, 0.011, 0.002, M.castAlu);
  cross.position.set(1.470, 0.4145, 0.5455);
  g.add(cross);
  /* Bearing barrel, machined: a housing shoulder at the body, then the
     r 0.054 barrel through the hat bore, then a seal land. The shoulder is
     r 0.066 only over |z| 0.567 to 0.583, inboard of everything wheels-9
     builds, whose innermost surface at any radius above 0.08 is the ring
     face at 0.5985. */
  /* THE OUTBOARD END OPENS TO r 0.055 BECAUSE THE HUB IS DRAWN TWICE.
     Both halves of this joint end their profile at r 0.020, which closed
     the outboard end of the barrel and the bore of the hub flange down onto
     the axis. drivetrain-9 bolts a real CV flange into that space: r 0.0225
     to 0.0520 over |z| 0.6825 to 0.6925, ten millimeters thick, and it is
     the half that CANNOT move, because SYSTEM.interfaces declares its
     outboard face on 0.6925 with extent max and tools/check-interfaces.sh
     asserts it. So this half opens instead. The seal land flares from
     0.0495 to 0.0550 and the hub flange becomes an annulus of r 0.0550 to
     0.0720, which leaves the CV flange 3.0 mm of radial air and lets it
     land on 0.6925 as declared.

     That is also the correct assembly rather than a concession. A bolted
     halfshaft goes into the CENTER of the hub and the wheel clamps on the
     annulus around it, so two concentric faces on one plane is what this
     joint looks like on a real car. Two solids in the same 8 mm of z was
     not a joint, it was the same flange drawn by two modules. */
  const barrel = lib.lathe([
    [0.052, 0], [0.066, 0], [0.066, 0.016], [0.054, 0.021],
    [0.054, 0.100], [0.0495, 0.104], [0.0495, 0.1080],
    [0.0575, 0.1105], [0.0575, 0.1175],
  ], M.castAlu, 20);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(P.axleF, P.wheelY, 0.567);
  g.add(barrel);
  /* hub flange: outboard face on wheels-9's built hub face plane at 0.6925,
     measured off its mesh (74 vertices at r 0 to 0.0740 on that plane). The
     rim carries a 3.5 mm chamfer; the clamping annulus out to r 0.0685 is
     still flat on the plane. */
  const flange = lib.lathe([
    [0.0575, 0], [0.072, 0], [0.072, 0.0045], [0.0685, 0.008], [0.0575, 0.008],
  ], M.steel, 20);
  flange.rotation.x = Math.PI / 2;
  flange.position.set(P.axleF, P.wheelY, 0.6845);
  g.add(flange);
  /* Wheel speed sensor in its boss on the inboard face, with the lead
     clipped up the upper wishbone. Everything here is inboard of |z| 0.551. */
  const sBoss = lib.cyl(0.010, 0.016, M.castAlu, 10);
  sBoss.rotation.x = Math.PI / 2;
  sBoss.position.set(1.4400, 0.3150, 0.5435);
  g.add(sBoss);
  const sBody = lib.cbox(0.017, 0.028, 0.014, 0.002, M.plastic);
  sBody.position.set(1.4400, 0.2960, 0.5435);
  g.add(sBody);
  /* The lead used to pass (1.4520, 0.3400) on its way up, which is 15.1 mm
     from the axle line, and a 3.5 mm lead against an 18.6 mm bar needs
     22.1 mm to touch: it ran through the halfshaft. It now climbs AFT of
     the bearing bore, which is where a wheel speed lead is clipped anyway,
     because the bore is the one place on a knuckle nothing may cross. */
  g.add(lib.tube([
    [1.4400, 0.2860, 0.5435], [1.4180, 0.3350, 0.5390], [1.4300, 0.4150, 0.5300],
    [1.4560, 0.4600, 0.5230], [1.4400, 0.5300, 0.5350], [1.4210, 0.5614, 0.5600],
  ], 0.0035, M.plastic, false, 14));
  g.add(pclip([1.4285, 0.5580, 0.5480], [0.38, 0.05, 0.92], 0.0035, 0.004, M.darkSteel));
  /* legs out to the translated ball joints */
  g.add(rod([1.462, 0.30, 0.570], [P.axleF, 0.242, 0.634], 0.018, M.castAlu));
  g.add(rod([1.462, 0.52, 0.570], [P.axleF, 0.558, 0.625], 0.017, M.castAlu));
  /* Steering arm out to the tie rod outer ball joint. The OUTER end is a
     kinematic point and does not move: (1.375, 0.305, 0.635) is the toe
     pickup the bump steer arithmetic is written against. The root drops
     14 mm, which is not a pickup and changes nothing kinematic, because at
     (1.452, 0.302) the arm's inboard face stood 42.0 mm off the front axle
     line and drivetrain-9's outboard CV boot presents r 0.0412 there: the
     two cleared each other by 1.46 mm, the tightest surface separation
     anywhere between this part and the front unit. */
  g.add(rod([1.452, 0.288, 0.580], [1.375, 0.305, 0.635], 0.011, M.castAlu));
  /* Caliper mount. wheels-9's caliper does not bolt to the knuckle body: its
     own source runs a two-lug bracket at |z| 0.646 to 0.6485 and lands it on
     "the upright's inboard face at 0.6475" at (1.425, 0.488) and
     (1.425, 0.528). That face has to exist here. The arch reaches it around
     the disc, crossing the ring band (r 0.1450 to 0.1826 over |z| 0.5985 to
     0.6395) at radius 0.206 or better, and it runs up the TRAILING side
     because straight over the crown is where the upper ball joint sits. */
  g.add(lib.tube([
    [1.4300, 0.5480, 0.5680],
    [1.3880, 0.5530, 0.6010],
    [1.3560, 0.5400, 0.6330],
    [1.3520, 0.5360, 0.6400],
    [1.3860, 0.5250, 0.6520],
    [1.4180, 0.5120, 0.6515],
  ], 0.010, M.castAlu));
  const cpad = lib.box(0.026, 0.078, 0.008, M.castAlu);
  cpad.position.set(1.427, 0.508, 0.6515);
  g.add(cpad);
  return g;
}

/* Rear upright: everything inboard of the stator face at |z| 0.636, with a
   mounting flange landing on drivetrain-7's carrier flange at |z| 0.6395. */
function rearUpright() {
  const g = new THREE.Group();
  const body = lib.cbox(0.085, 0.36, 0.032, 0.004, M.castAlu);
  body.position.set(-1.45, 0.40, RJ);
  g.add(body);
  /* ribs inboard of the body face at |z| 0.584, and a boss at each link
     landing so a joint has something to bolt into */
  for (const x of [-1.4215, -1.4785]) {
    const rib = lib.cbox(0.012, 0.300, 0.011, 0.002, M.castAlu);
    rib.position.set(x, 0.400, 0.5785);
    g.add(rib);
  }
  const cross = lib.cbox(0.075, 0.013, 0.011, 0.002, M.castAlu);
  cross.position.set(-1.450, 0.400, 0.5785);
  g.add(cross);
  const barrel = lib.cyl(0.062, 0.024, M.castAlu, 20);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(-1.45, P.wheelY, 0.6275);
  g.add(barrel);
  /* The mounting face on drivetrain-7's carrier flange at |z| 0.6395,
     machined with a spigot step and a chamfered rim, plus the four bolts
     that actually hold this married pair together. Their heads seat on the
     flange's inboard face at |z| 0.6275, measured off the built lathe. */
  const face = lib.lathe([
    [0.030, 0], [0.086, 0], [0.086, 0.0085], [0.0825, 0.012], [0.030, 0.012],
  ], M.steel, 20);
  face.rotation.x = Math.PI / 2;
  face.position.set(-1.45, P.wheelY, 0.6275);
  g.add(face);
  /* Bolt circle at r 0.062, not 0.073. At 0.073 the heads came within
     0.06 mm of wheels-9's park brake, which reads as touching. Re-swept off
     the built gen9 preset, the sixteen head vertices at 0.062 clear the park
     brake by 2.06 mm at (-1.4062, 0.3988, 0.6275), autonomy-4's ring by 6.67,
     wheels-9's master unit by 4.74 and drivetrain-9's hub bearings by 12.12.
     A review draft of this comment said 5.5 mm and a review draft of the
     report said 0.54; both were wrong and the sweep is the number.

     The heads also straddle the upright's own barrel rather than standing on
     the flange face named above. A head of this size spans r 0.0535 to 0.0705
     about the axle and the barrel is a solid r 0.062 cylinder over |z| 0.6155
     to 0.6395, so the flange face at 0.6275 is only exposed outboard of
     r 0.062 and each head is half sunk in the barrel. Three of the four still
     read; the fourth is occluded whatever is done to it. Moving the circle
     outboard to clear the barrel walks it back toward the park brake this
     module already pulled it away from, so it is measured and reported here
     rather than traded for the clearance. */
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    g.add(screw([-1.45 + Math.cos(a) * 0.062, P.wheelY + Math.sin(a) * 0.062, 0.6275],
      [0, 0, -1], 0.007, M.steel));
  }
  return g;
}

/* Damper without a spring: monotube body, rod, top mount, eye, and the
   48 V proportional valve head clamped to the body. Built along Y. */
function activeDamper(a, b, o = {}) {
  const L = new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...b));
  const g = new THREE.Group();
  const yb = -L * 0.49, yt = L * 0.09;
  /* Monotube body: a rolled base, the r 0.021 barrel, and a machined gland
     nut at the top. The 0.021 carries a published number and does not
     move. That number is NOT drivetrain-7's: this preset runs
     drivetrain-9, whose bar is necked to r 0.0186 between its rolled
     fillets, so the overlap at the 26.5 mm axis separation this corner has
     always had is 0.021 plus 0.0186 minus 0.0265, which is 13.1 mm and not
     the 16.6 mm suspension-4 reads against a plain 22 mm tube. Measured
     the other way round for the same answer: sliced about the front axle
     line, this part's innermost surface at z 0.505 is 5.5 mm out, inside a
     bar of 18.6. Only the ends gained shape. */
  g.add(lib.lathe([
    [0, yb], [0.013, yb], [0.021, yb + 0.011],
    [0.021, yt - 0.030], [0.0245, yt - 0.025], [0.0245, yt - 0.008],
    [0.0210, yt - 0.004], [0.0092, yt],
  ], M.darkSteel, 16));
  const shaft = lib.cyl(0.008, L * 0.55, M.steel, 10);
  shaft.position.y = L * 0.2;
  g.add(shaft);
  /* bump stop on the rod, and the boot over the rest of the stroke */
  g.add(lib.lathe([
    [0.0085, yt + 0.006], [0.0165, yt + 0.014],
    [0.0155, yt + 0.040], [0.0085, yt + 0.048],
  ], M.rubber, 10));
  const bootLo = yt + 0.056, bootHi = L / 2 - 0.026;
  if (bootHi - bootLo > 0.02) {
    const bt = gaiter(0.0105, 0.019, bootHi - bootLo, 3, 10, false);
    bt.position.y = (bootLo + bootHi) / 2;
    g.add(bt);
  }
  /* Top mount. Its rim radius and its top plane are both load bearing: the
     front strut is inclined 14.9 degrees and the panel publishes the rim
     topping out at y 0.729, which is 0.72 plus 0.034 sin 14.9. So the
     lathe's widest ring is still 0.034 and it still sits on local +L/2. */
  g.add(lib.lathe([
    [0.010, L / 2 - 0.022], [0.030, L / 2 - 0.022], [0.034, L / 2 - 0.016],
    [0.034, L / 2], [0.010, L / 2],
  ], M.rubber, 14));
  const cap = lib.cyl(0.026, 0.005, M.steel, 14);
  cap.position.y = L / 2 - 0.0035;
  g.add(cap);
  /* Lower eye: metal outer, rubber, and the through bolt, on a local z axis. */
  for (const [r, h, mat] of [[0.019, 0.024, M.darkSteel], [0.0132, 0.026, M.rubber], [0.0062, 0.034, M.steel]]) {
    const c = lib.cyl(r, h, mat, 12);
    c.rotation.x = Math.PI / 2;
    c.position.y = -L / 2 + 0.008;
    g.add(c);
  }
  /* The 48 V proportional valve head, drawn as the piggyback it is: a
     gallery canister banded to the body with the solenoid on its crown and
     a sealed connector beside it. It sits LOW on the body, below the air
     spring piston, because on the front corner this damper is the strut
     and the air sleeve rolls on a piston around it. */
  const vy = -L * 0.34;
  const pig = lib.cyl(0.0165, L * 0.20, M.darkSteel, 12);
  pig.position.set(0.036, vy, 0);
  g.add(pig);
  for (const dy of [-L * 0.075, L * 0.075]) {
    const band = lib.cbox(0.052, 0.007, 0.030, 0.002, M.steel);
    band.position.set(0.018, vy + dy, 0);
    g.add(band);
  }
  const sol = lib.cyl(0.0125, 0.026, M.sensor, 10);
  sol.position.set(0.036, vy + L * 0.10 + 0.013, 0);
  g.add(sol);
  const vcon = lib.cbox(0.015, 0.012, 0.013, 0.002, M.plastic);
  vcon.position.set(0.036, vy + L * 0.10 + 0.032, 0);
  g.add(vcon);
  const nub = lib.cyl(0.008, 0.018, M.hv, 10);
  nub.rotation.z = Math.PI / 2;
  nub.position.set(0.058, vy, 0);
  g.add(nub);
  g.userData.feed = new THREE.Vector3(0.036, vy + L * 0.10 + 0.040, 0);
  return span(g, a, b);
}

/* Rolling-lobe air bellows built along Y, centered on its own origin, with
   the four things the old zigzag lathe left off: the ALUMINUM PISTON the
   lobe actually rolls down onto, the crimp ring that seals the sleeve to
   it, a top plate with a bolt circle, and the air fitting the supply line
   plugs into. Sleeve and piston are separate meshes because they are
   separate materials, which is most of why one lathe could not read right.

   g.userData.port is the fitting mouth in LOCAL coordinates, so the caller
   can put the end of its supply line exactly on it rather than near it. */
function bellows(len, rMax = 0.055) {
  const g = new THREE.Group();
  const y0 = -len / 2;
  /* piston: a spun can with a rolled crown, the surface the lobe rides */
  g.add(lib.lathe([
    [0.016, y0], [0.040, y0], [0.043, y0 + 0.012],
    [0.043, y0 + len * 0.32], [0.038, y0 + len * 0.375], [0.020, y0 + len * 0.385],
  ], M.alu, 20));
  /* sleeve: the rolling lobe at the bottom, then two free convolutions */
  g.add(lib.lathe([
    [0.0325, y0 + len * 0.26],
    [rMax * 0.74, y0 + len * 0.35], [rMax, y0 + len * 0.44],
    [rMax * 0.88, y0 + len * 0.55], [rMax, y0 + len * 0.65],
    [rMax * 0.90, y0 + len * 0.755], [rMax * 0.98, y0 + len * 0.845],
    [rMax * 0.72, y0 + len * 0.925], [rMax * 0.58, y0 + len * 0.972],
    [rMax * 0.58, y0 + len],
  ], M.rubber, 20));
  const crimpLo = lib.cyl(0.0345, 0.007, M.darkSteel, 14);
  crimpLo.position.y = y0 + len * 0.27;
  g.add(crimpLo);
  const crimpHi = lib.cyl(rMax * 0.62, 0.008, M.darkSteel, 16);
  crimpHi.position.y = y0 + len * 0.966;
  g.add(crimpHi);
  /* top plate with its three studs and the air fitting */
  const plate = lib.lathe([
    [0, y0 + len - 0.001], [rMax * 0.70, y0 + len - 0.001],
    [rMax * 0.70, y0 + len + 0.008], [rMax * 0.62, y0 + len + 0.011], [0, y0 + len + 0.011],
  ], M.alu, 18);
  g.add(plate);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.6;
    const st = lib.cyl(0.0042, 0.016, M.steel, 6);
    st.position.set(Math.cos(a) * rMax * 0.56, y0 + len + 0.017, Math.sin(a) * rMax * 0.56);
    g.add(st);
  }
  const px = rMax * 0.34, pz = 0;
  const boss = lib.cyl(0.0085, 0.009, M.alu, 8);
  boss.position.set(px, y0 + len + 0.014, pz);
  g.add(boss);
  const port = lib.cyl(0.0055, 0.016, M.alu, 8);
  port.position.set(px, y0 + len + 0.026, pz);
  g.add(port);
  g.userData.port = new THREE.Vector3(px, y0 + len + 0.033, pz);
  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* ── front structure: subframe plus the translated corner ── */
  const fs = lib.part('front-structure', [0.15, -0.45, 0]);
  fs.add(frame(1, false));
  const fCorner = new THREE.Group();
  /* NO BUSH AT THE AFT LOWER INNER PIVOT, and the reason is measured. The
     x 1.70 crossmember is a hollow 80 by 70 extrusion with an 8 mm wall, so
     its cavity spans x 1.668 to 1.732 and y 0.223 to 0.277, and the pivot at
     (1.70, 0.25, +/-0.38) puts an eye of r 0.020 and a 50 mm rubber entirely
     inside it. Swept in all four viewer states, all five pieces come back
     unreachable from every direction, 192 triangles and 5 draw calls a side.
     The pivot sitting inside the beam is Gen 4 geometry and a detail pass may
     not move it, so the bush is not drawn. The forward pivot at x 1.36 stands
     in the riser clevis outside the crossmember and keeps its bush entire. */
  fCorner.add(aArm([1.36, 0.25, LIP], [1.70, 0.25, LIP], [P.axleF, 0.235, 0.64], true, false));
  fCorner.add(aArm([1.33, 0.55, UIP], [1.65, 0.55, UIP], [P.axleF, 0.565, 0.63]));
  /* The upper inner pivots pick up on body-9's front casting rather than on
     this subframe, so they get the clevis and the bolt face that interface
     is made of. The pivot centers are the published (1.33 and 1.65, 0.55,
     +/-0.34) to the millimeter; only the hardware around them is new. */
  /* Half span 0.0305 rather than 0.0335 puts the ear faces at x 1.2955 and
     1.3645, so bush()'s crush tube, which ends at x 1.2975 and 1.3625, ends
     inside the ears rather than outboard of them.

     DEPTH 0.030, NOT 0.040, AND THE REASON IS interior-6. Half the depth is
     the ear's reach in z, so a 0.040 clevis on a pivot at |z| 0.34 spans
     0.3200 to 0.3600, and interior-6's pedal box and its six linkage blocks
     all start at |z| 0.3575 over y 0.4125 to 0.5240 at x 1.235 to 1.307. A
     triangle-triangle sweep of the built preset returned 45 crossing pairs
     between the forward ear and that box: the ear was inside it, not near
     it. An unsigned nearest-vertex distance cannot tell 0.62 mm of gap from
     0.62 mm of interference and an earlier draft read it as gap. At 0.030
     the ears span |z| 0.3250 to 0.3550 and the sweep returns zero crossings
     with 2.5 mm to spare. The bush is untouched, so the published envelope
     is still exactly |z| 0.3200 to 0.3600: that number belongs to the eye,
     not to the ears. */
  for (const x of [1.33, 1.65]) {
    fCorner.add(clevis([x, 0.55, UIP], 0.02, 0.0305, 0.030, 0.030, M.alu, true));
  }
  /* Wheel travel sensor on the rear crossmember: a rotary body with its
     connector and the drop link down onto the lower arm. */
  const tsens = lib.cbox(0.024, 0.026, 0.022, 0.003, M.sensor);
  tsens.position.set(1.70, 0.315, 0.42);
  fCorner.add(tsens);
  const tcon = lib.cbox(0.010, 0.012, 0.014, 0.002, M.plastic);
  tcon.position.set(1.7145, 0.318, 0.42);
  fCorner.add(tcon);
  const tarm = lib.cbox(0.030, 0.008, 0.006, 0.0015, M.darkSteel);
  tarm.position.set(1.6845, 0.305, 0.4085);
  fCorner.add(tarm);
  fCorner.add(rod([1.697, 0.305, 0.42], [1.6615, 0.2477, 0.42], 0.004, M.darkSteel));
  fs.add(fCorner, lib.mirrorZ(fCorner));
  sys.add(fs);

  /* ── front uprights ── */
  const fk = lib.part('front-knuckle', [0.1, -0.2, 0.35]);
  fk.add(frontUpright());
  sys.add(fk, lib.mirrorZ(fk));

  /* ── rear structure: carried five-link on a pickup plane 100 mm inboard ── */
  const rs = lib.part('rear-structure', [-0.15, -0.45, 0]);
  rs.add(frame(-1, true));
  const rCorner = new THREE.Group();
  rCorner.add(rearUpright());
  /* Five-link rods, forged rather than turned: a section deeper than it is
     wide, a bush in a clevis at the inner end and a ball joint with a boot
     and a castellated nut at the outer. The four inner pivots and the four
     outer joint centers are exactly where the rate arithmetic put them, and
     the joints stud VERTICALLY so nothing grows in z: the housings reach
     |z| 0.6221 against drivetrain-7's stator face at 0.636. */
  /* The last field is false at the two inner pivots the sweep found sealed
     inside the subframe rail. The rail is a hollow 90 by 90 extrusion at
     |z| 0.46 with a 9 mm wall, so its cavity spans y 0.214 to 0.286 and
     z 0.424 to 0.496, and both the bush at (-1.44, 0.235, 0.44) and the one
     at (-1.64, 0.25, 0.44) sit wholly within it, as does the clevis pivot
     bolt in the 5.1 mm slot outboard of each forward ear. All of it comes
     back unreachable in all four viewer states, 272 triangles and 7 draw
     calls per station per side, so none of it is drawn. The EARS are kept:
     their 62 and 30 mm drop carries them out through the floor of the rail
     and they are the part of the joint a viewer can actually see. The two
     upper pivots stand in the open and keep everything. */
  const links = [
    [[-1.36, 0.50, 0.47], [-1.41, 0.545, RJ], 0.012, 1, 0.030, true],    /* upper front */
    [[-1.58, 0.50, 0.47], [-1.49, 0.545, RJ], 0.012, 1, 0.030, true],    /* upper rear */
    [[-1.44, 0.235, 0.44], [-1.45, 0.225, RJ], 0.017, -1, 0.062, false], /* spring link */
    [[-1.64, 0.25, 0.44], [-1.53, 0.26, RJ], 0.013, -1, 0.030, false],   /* lower trailing */
  ];
  for (const [inner, outer, r, sn, drop, open] of links) {
    rCorner.add(section(ovalShape(r * 1.72, r * 2.36, r * 0.54), inner, outer, M.steel, { taper: 0.92 }));
    if (open) rCorner.add(bush(inner, 0.018, 0.04));
    rCorner.add(clevis(inner, 0.018, 0.0295, 0.052, drop, M.alu, false, open));
    rCorner.add(joint(outer, [0, sn, 0], 0.017));
  }
  /* knuckle toe arm: the rear-steer tie rod lands on its outer point */
  rCorner.add(rod([-1.44, 0.31, 0.616], [-1.39, 0.31, 0.625], 0.011, M.castAlu));
  rs.add(rCorner, lib.mirrorZ(rCorner));
  sys.add(rs);

  /* ── air springs: front translated with the corner, rear re-seated at
     |z| 0.539 to hold the 0.615 motion ratio ── */
  const air = lib.part('air-springs', [0, 0.62, 0.18]);
  const fBell = bellows(0.27);
  span(fBell, [1.479, 0.40, 0.493], [1.496, 0.66, 0.426]);
  fBell.updateMatrixWorld(true);
  /* The supply line has to land ON the fitting, not near it, so the port
     is read out of the built strut rather than guessed from the seat. */
  const fPort = fBell.userData.port.clone().applyMatrix4(fBell.matrixWorld);
  air.add(fBell);
  /* Strut top mount plate, with the three studs that carry it into the
     body. The damper's own mount rim tops out at y 0.7286 under it. */
  const fTower = lib.lathe([
    [0.014, 0.728], [0.050, 0.728], [0.050, 0.7385], [0.044, 0.742], [0.014, 0.742],
  ], M.alu, 18);
  fTower.position.set(1.50, 0, 0.41);
  air.add(fTower);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.35;
    const st = lib.cyl(0.0048, 0.014, M.steel, 6);
    st.position.set(1.50 + Math.cos(a) * 0.038, 0.749, 0.41 + Math.sin(a) * 0.038);
    air.add(st);
  }
  /* Rear spring perch: dished, with a locating rim the piston sits inside
     and three bolts down into the spring link. */
  const perch = lib.lathe([
    [0.018, 0.229], [0.058, 0.229], [0.058, 0.2350],
    [0.040, 0.2390], [0.036, 0.2450], [0.018, 0.2450],
  ], M.steel, 16);
  perch.position.set(-1.446, 0, 0.539);
  air.add(perch);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 1.1;
    air.add(screw([-1.446 + Math.cos(a) * 0.049, 0.2350, 0.539 + Math.sin(a) * 0.049],
      [0, 1, 0], 0.0065, M.steel));
  }
  const rBell = bellows(0.23, 0.052);
  rBell.position.set(-1.447, 0.359, 0.539);
  rBell.updateMatrixWorld(true);
  const rPort = rBell.userData.port.clone().applyMatrix4(rBell.matrixWorld);
  air.add(rBell);
  sys.add(air, lib.mirrorZ(air));

  /* ── air supply: unchanged unit, re-routed lines ── */
  const sup = lib.part('air-supply', [0.55, 0.3, 0.35]);
  /* Twin-piston motor can with real end bells and cooling bands, a finned
     compressor head, a dryer with dished ends and its band clamp, a valve
     block with four solenoid coils and a sealed connector, and a reservoir
     that is one pressure vessel with dished heads and weld beads rather
     than a cylinder with two balls stuck on the ends. Every envelope is
     the Gen 4 one: can x 1.82 to 1.98 at r 0.042, tank |z| 0.168 at
     r 0.048, block and head where they were. */
  const can = lib.lathe([
    [0, 0], [0.030, 0], [0.038, 0.011], [0.042, 0.022],
    [0.042, 0.138], [0.038, 0.149], [0.030, 0.160], [0, 0.160],
  ], M.darkSteel, 16);
  can.rotation.z = Math.PI / 2;      /* local +Y lands on world -X */
  can.position.set(1.98, 0.325, 0.30);
  sup.add(can);
  for (const cx of [1.855, 1.885, 1.915, 1.945]) {
    const band = lib.cyl(0.0448, 0.005, M.darkSteel, 14);
    band.rotation.z = Math.PI / 2;
    band.position.set(cx, 0.325, 0.30);
    sup.add(band);
  }
  const head = lib.cbox(0.040, 0.052, 0.062, 0.005, M.castAlu);
  head.position.set(1.84, 0.330, 0.30);
  sup.add(head);
  const hfins = lib.fins(0.034, 0.020, 0.054, 6, 0.003, M.alu);
  hfins.position.set(1.84, 0.366, 0.30);
  sup.add(hfins);
  const dryer = lib.lathe([
    [0, 0], [0.016, 0], [0.024, 0.010], [0.024, 0.080], [0.016, 0.090], [0, 0.090],
  ], M.alu, 14);
  dryer.position.set(1.86, 0.300, 0.20);
  sup.add(dryer);
  const dband = lib.cyl(0.0255, 0.008, M.darkSteel, 14);
  dband.position.set(1.86, 0.345, 0.20);
  sup.add(dband);
  const hsens = lib.cbox(0.012, 0.014, 0.014, 0.002, M.sensor);
  hsens.position.set(1.86, 0.397, 0.20);
  sup.add(hsens);
  const vblock = lib.cbox(0.070, 0.050, 0.062, 0.005, M.castAlu);
  vblock.position.set(1.86, 0.330, 0.40);
  sup.add(vblock);
  for (let i = 0; i < 4; i++) {
    const coil = lib.cyl(0.0095, 0.020, M.plastic, 10);
    coil.position.set(1.836 + (i % 2) * 0.048, 0.365, 0.382 + Math.floor(i / 2) * 0.038);
    sup.add(coil);
    const cap2 = lib.cyl(0.0055, 0.007, M.darkSteel, 8);
    cap2.position.set(1.836 + (i % 2) * 0.048, 0.3785, 0.382 + Math.floor(i / 2) * 0.038);
    sup.add(cap2);
  }
  const vcon = lib.cbox(0.024, 0.020, 0.014, 0.002, M.plastic);
  vcon.position.set(1.86, 0.330, 0.437);
  sup.add(vcon);
  /* Reservoir: dished heads, weld beads at the head seams, two straps and
     a drain at the bottom. Same 3.0 L envelope, |z| 0.168 at r 0.048. */
  const tank = lib.lathe([
    [0, 0], [0.028, 0.005], [0.043, 0.018], [0.048, 0.040],
    [0.048, 0.296], [0.043, 0.318], [0.028, 0.331], [0, 0.336],
  ], M.steel, 20);
  tank.rotation.x = Math.PI / 2;     /* local +Y lands on world +Z */
  tank.position.set(1.90, 0.30, -0.168);
  sup.add(tank);
  for (const zs of [-1, 1]) {
    const seam = lib.cyl(0.0487, 0.005, M.steel, 20);
    seam.rotation.x = Math.PI / 2;
    seam.position.set(1.90, 0.30, zs * 0.128);
    sup.add(seam);
    const strap = lib.torus(0.0505, 0.0035, M.darkSteel, 14, 5);
    strap.rotation.y = Math.PI / 2;
    strap.position.set(1.90, 0.30, zs * 0.075);
    sup.add(strap);
  }
  const drain = lib.cyl(0.007, 0.016, M.steel, 8);
  drain.position.set(1.90, 0.2455, 0.05);
  sup.add(drain);
  const psens = lib.cbox(0.014, 0.016, 0.014, 0.002, M.sensor);
  psens.position.set(1.90, 0.3555, -0.05);
  sup.add(psens);
  sup.add(lib.tube([
    [1.86, 0.35, 0.42], [1.74, 0.42, 0.44], [1.60, 0.56, 0.43],
    [fPort.x, fPort.y, fPort.z],
  ], 0.0045, M.plasticLt));
  sup.add(lib.tube([
    [1.86, 0.33, 0.36], [1.83, 0.33, 0], [1.80, 0.34, -0.32],
    [1.68, 0.40, -0.41], [1.56, 0.58, -0.43], [fPort.x, fPort.y, -fPort.z],
  ], 0.0045, M.plasticLt));
  /* Rocker trunk line to the rear passenger spring. suspension-4 ran this at
     |z| 0.62 to 0.63 past a front wheel centered on 0.81. The wheel came in
     70 mm and this line has to come in with it: the front corner's swept
     solid at the commanded 14 degrees of lock reaches |z| 0.5844 at x 1.10
     and 0.5600 at x 1.30, so the front run sits at 0.505 to 0.522. It goes
     back out to 0.61 through the cabin, because interior-6 holds seat-rail
     material to |z| 0.543 under the floor and pulling the whole line in
     would have swapped one foul for another. */
  sup.add(lib.tube([
    [1.88, 0.322, 0.42], [1.72, 0.325, 0.46], [1.42, 0.327, 0.505],
    [1.05, 0.327, 0.522], [0.70, 0.327, 0.575], [0, 0.327, 0.61],
    [-1.20, 0.327, 0.58], [-1.41, 0.31, 0.55],
    [-1.4415, 0.42, 0.5425], [rPort.x, rPort.y, rPort.z],
  ], 0.0045, M.plasticLt));
  /* P-clips down the rocker trunk. The line is 3.3 m long and it used to
     float the whole way. Each foot lands on PACKLID, which is battery-7's
     floorlid top measured by casting down from every one of these four
     stations rather than assumed from the ECU's plane. The four stations
     are over the pack, not ahead of it: at x 1.42 the nearest thing below
     is body-9's venturi floor 204 mm down, which is not something a clip
     reaches, so there is no fifth clip there. */
  for (const [cx, cz] of [[1.05, 0.522], [0.70, 0.575], [0.00, 0.610], [-1.20, 0.580]]) {
    sup.add(pclip([cx, 0.327, cz], [1, 0, 0], 0.0045, 0.327 - 0.0045 * 1.45 - PACKLID, M.darkSteel));
  }
  sys.add(sup);

  /* ── active dampers: same ratios, both mounts moved ── */
  const dampF = lib.part('active-dampers', [0.1, 0.55, 0.3]);
  const dF = activeDamper([1.47, 0.255, 0.53], [1.50, 0.72, 0.41]);
  dF.updateMatrixWorld(true);
  /* the 48 V branch has to arrive at the connector, so read it off the
     built strut rather than aiming at where the valve used to be */
  const dFeedF = dF.userData.feed.clone().applyMatrix4(dF.matrixWorld);
  dampF.add(dF);
  sys.add(dampF, lib.mirrorZ(dampF));
  const dampR = lib.part('active-dampers', [-0.2, 0.55, 0.3]);
  const dR = activeDamper([-1.555, 0.258, 0.563], [-1.575, 0.67, 0.483]);
  dR.updateMatrixWorld(true);
  const dFeedR = dR.userData.feed.clone().applyMatrix4(dR.matrixWorld);
  dampR.add(dR);
  /* rear damper top mount: a plate with the three studs that carry it */
  const rdPlate = lib.lathe([
    [0.010, 0.678], [0.042, 0.678], [0.042, 0.6875], [0.036, 0.690], [0.010, 0.690],
  ], M.alu, 16);
  rdPlate.position.set(-1.575, 0, 0.483);
  dampR.add(rdPlate);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.9;
    const st = lib.cyl(0.0045, 0.013, M.steel, 6);
    st.position.set(-1.575 + Math.cos(a) * 0.031, 0.6965, 0.483 + Math.sin(a) * 0.031);
    dampR.add(st);
  }
  sys.add(dampR, lib.mirrorZ(dampR));

  /* ── anti-roll decouplers: 27.7 mm front and 22.3 mm rear bars on the
     Gen 4 clutch architecture, drop links following the new arms ── */
  const arbF = lib.part('arb-decouplers', [0.45, -0.25, 0]);
  arbF.add(lib.tube([
    [1.56, 0.33, 0.53], [1.63, 0.315, 0.43], [1.70, 0.305, 0.27], [1.70, 0.305, 0.10],
  ], 0.01385, M.steel));
  arbF.add(lib.tube([
    [1.70, 0.305, -0.10], [1.70, 0.305, -0.27], [1.63, 0.315, -0.43], [1.56, 0.33, -0.53],
  ], 0.01385, M.steel));
  const fDrum = lib.cyl(0.039, 0.22, M.darkSteel, 18);
  fDrum.rotation.x = Math.PI / 2;
  fDrum.position.set(1.70, 0.305, 0);
  arbF.add(fDrum);
  const fCollar = lib.cyl(0.044, 0.05, M.steel, 18);
  fCollar.rotation.x = Math.PI / 2;
  fCollar.position.set(1.70, 0.305, 0.06);
  arbF.add(fCollar);
  const fSol = lib.cyl(0.016, 0.05, M.sensor, 12);
  fSol.position.set(1.70, 0.36, 0);
  arbF.add(fSol);
  const fSolCon = lib.cbox(0.022, 0.014, 0.016, 0.002, M.plastic);
  fSolCon.position.set(1.70, 0.392, 0);
  arbF.add(fSolCon);
  /* Split-line flanges on the clutch housing with the bolts that close it,
     because a 1,550 Nm dog clutch is a serviceable assembly and not a
     turned billet. */
  for (const zf of [-0.095, 0.095]) {
    const fl = lib.cyl(0.0455, 0.008, M.darkSteel, 18);
    fl.rotation.x = Math.PI / 2;
    fl.position.set(1.70, 0.305, zf);
    arbF.add(fl);
  }
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    arbF.add(screw([1.70 + Math.cos(a) * 0.042, 0.305 + Math.sin(a) * 0.042, 0.099],
      [0, 0, 1], 0.0065, M.steel));
  }
  for (const zs of [-1, 1]) {
    arbF.add(dropLink([1.56, 0.33, zs * 0.53], [1.5375, 0.2415, zs * 0.552], 0.006));
    arbF.add(arbBush(1.70, 0.305, zs * 0.20, 0.01385));
  }
  sys.add(arbF);
  const arbR = lib.part('arb-decouplers', [-0.45, -0.25, 0]);
  arbR.add(lib.tube([
    [-1.558, 0.326, 0.519], [-1.63, 0.315, 0.41], [-1.70, 0.305, 0.28], [-1.70, 0.305, 0.09],
  ], 0.01115, M.steel));
  arbR.add(lib.tube([
    [-1.70, 0.305, -0.09], [-1.70, 0.305, -0.28], [-1.63, 0.315, -0.41], [-1.558, 0.326, -0.519],
  ], 0.01115, M.steel));
  const rDrum = lib.cyl(0.036, 0.20, M.darkSteel, 18);
  rDrum.rotation.x = Math.PI / 2;
  rDrum.position.set(-1.70, 0.305, 0);
  arbR.add(rDrum);
  const rCollar = lib.cyl(0.041, 0.045, M.steel, 18);
  rCollar.rotation.x = Math.PI / 2;
  rCollar.position.set(-1.70, 0.305, 0.055);
  arbR.add(rCollar);
  const rSol = lib.cyl(0.015, 0.05, M.sensor, 12);
  rSol.position.set(-1.70, 0.355, 0);
  arbR.add(rSol);
  const rSolCon = lib.cbox(0.022, 0.014, 0.016, 0.002, M.plastic);
  rSolCon.position.set(-1.70, 0.387, 0);
  arbR.add(rSolCon);
  for (const zf of [-0.086, 0.086]) {
    const fl = lib.cyl(0.0425, 0.008, M.darkSteel, 18);
    fl.rotation.x = Math.PI / 2;
    fl.position.set(-1.70, 0.305, zf);
    arbR.add(fl);
  }
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    arbR.add(screw([-1.70 + Math.cos(a) * 0.039, 0.305 + Math.sin(a) * 0.039, 0.090],
      [0, 0, 1], 0.0065, M.steel));
  }
  for (const zs of [-1, 1]) {
    arbR.add(dropLink([-1.558, 0.326, zs * 0.519], [-1.572, 0.256, zs * 0.539], 0.006));
    arbR.add(arbBush(-1.70, 0.305, zs * 0.20, 0.01115));
  }
  sys.add(arbR);

  /* ── steering: 0.96 m rack, lanes still 0.76 m apart, tie rods carried ── */
  const st = lib.part('steering', [0.55, 0.12, 0]);
  const RY = 0.36;
  const rack = lib.cyl(0.02, 0.96, M.steel, 14);
  rack.rotation.x = Math.PI / 2;
  rack.position.set(1.22, RY, 0);
  st.add(rack);
  const housing = lib.cyl(0.03, 0.62, M.castAlu, 16);
  housing.rotation.x = Math.PI / 2;
  housing.position.set(1.22, RY, -0.05);
  st.add(housing);
  /* Cast mounting ears on the housing with their isolators and bolt faces.
     Nothing this module owns sits above the rack: the nearest built
     surface over (1.22, 0.40, 0.20) is 119 mm away, so these are the
     interface to body-9's front casting and they are drawn as such. */
  for (const zs of [-1, 1]) {
    const ear = lib.cbox(0.048, 0.014, 0.038, 0.003, M.castAlu);
    ear.position.set(1.22, RY + 0.032, zs * 0.22);
    st.add(ear);
    const iso = lib.cyl(0.014, 0.014, M.rubber, 10);
    iso.position.set(1.22, RY + 0.046, zs * 0.22);
    st.add(iso);
    st.add(screw([1.22, RY + 0.053, zs * 0.22], [0, 1, 0], 0.009, M.steel));
  }
  for (const zs of [-1, 1]) {
    const nut = lib.cyl(0.046, 0.09, M.castAlu, 18);
    nut.rotation.x = Math.PI / 2;
    nut.position.set(1.22, RY, zs * 0.38);
    st.add(nut);
    /* ball-nut drive motor: a can with end bells and a sealed connector */
    const mot = lib.lathe([
      [0, -0.070], [0.026, -0.070], [0.034, -0.060], [0.037, -0.051],
      [0.037, 0.051], [0.034, 0.060], [0.026, 0.070], [0, 0.070],
    ], M.darkSteel, 16);
    mot.rotation.x = Math.PI / 2;
    mot.position.set(1.30, RY, zs * 0.44);
    st.add(mot);
    const mcon = lib.cbox(0.018, 0.016, 0.014, 0.002, M.plastic);
    mcon.position.set(1.30, RY + 0.043, zs * 0.44);
    st.add(mcon);
    const cov = lib.cbox(0.120, 0.055, 0.030, 0.004, M.plastic);
    cov.position.set(1.26, RY, zs * 0.415);
    st.add(cov);
    /* lane ECU: a sealed die-cast box with cooling ribs and its connector */
    const ecu = lib.cbox(0.050, 0.030, 0.050, 0.004, M.sensor);
    ecu.position.set(1.30, RY + 0.055, zs * 0.44);
    st.add(ecu);
    const efins = lib.fins(0.044, 0.010, 0.044, 5, 0.003, M.alu);
    efins.position.set(1.30, RY + 0.075, zs * 0.44);
    st.add(efins);
    const econ = lib.cbox(0.014, 0.014, 0.022, 0.002, M.plastic);
    econ.position.set(1.3315, RY + 0.055, zs * 0.44);
    st.add(econ);
    /* rack gaiter: convoluted, with a clip at each end */
    const bt = gaiter(0.021, 0.030, 0.10, 4, 10);
    bt.rotation.x = Math.PI / 2;
    bt.position.set(1.22, RY, zs * 0.40);
    st.add(bt);
    st.add(rod([1.22, RY, zs * 0.475], [1.375, 0.305, zs * 0.635], 0.010, M.steel));
    st.add(balljoint([1.22, RY, zs * 0.475], 0.015));
    st.add(balljoint([1.375, 0.305, zs * 0.635], 0.014));
    /* Tie rod length adjuster and its locknut, both held INBOARD of
       |z| 0.575: the outer half of this rod is the geometry whose crossing
       of wheels-9's disc web the steering panel publishes at 6.6 mm. */
    const dn = new THREE.Vector3(0.155, -0.055, zs * 0.160).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(UP, dn);
    const adj = lib.cyl(0.0145, 0.020, M.steel, 6);
    adj.quaternion.copy(q);
    adj.position.set(1.2907, 0.3349, zs * 0.5480);
    st.add(adj);
    const lock = lib.cyl(0.0135, 0.008, M.steel, 6);
    lock.quaternion.copy(q);
    lock.position.set(1.2752, 0.3404, zs * 0.5320);
    st.add(lock);
  }
  sys.add(st);

  /* ── rear-steer actuator, tie rods following the pickup plane inboard ── */
  const rst = lib.part('rear-steer', [-0.45, -0.3, 0]);
  const rHouse = lib.cyl(0.028, 0.60, M.castAlu, 16);
  rHouse.rotation.x = Math.PI / 2;
  rHouse.position.set(-1.34, 0.19, 0);
  rst.add(rHouse);
  /* housing split line, so the actuator reads as two castings bolted
     together rather than one turned tube */
  for (const zf of [-0.21, 0.21]) {
    const fl = lib.cyl(0.0325, 0.008, M.castAlu, 16);
    fl.rotation.x = Math.PI / 2;
    fl.position.set(-1.34, 0.19, zf);
    rst.add(fl);
  }
  const rMot = lib.lathe([
    [0, -0.050], [0.016, -0.050], [0.022, -0.042], [0.024, -0.035],
    [0.024, 0.035], [0.022, 0.042], [0.016, 0.050], [0, 0.050],
  ], M.darkSteel, 14);
  rMot.rotation.x = Math.PI / 2;
  rMot.position.set(-1.40, 0.19, 0.06);
  rst.add(rMot);
  const rMotCon = lib.cbox(0.016, 0.014, 0.012, 0.002, M.plastic);
  rMotCon.position.set(-1.40, 0.2205, 0.06);
  rst.add(rMotCon);
  const rBelt = lib.cbox(0.090, 0.040, 0.030, 0.004, M.plastic);
  rBelt.position.set(-1.37, 0.19, 0.125);
  rst.add(rBelt);
  for (const xo of [-0.032, 0.032]) {
    const brib = lib.cbox(0.006, 0.034, 0.026, 0.002, M.plastic);
    brib.position.set(-1.37 + xo * 0.62, 0.19, 0.141);
    rst.add(brib);
  }
  for (const zs of [-1, 1]) {
    const boot = gaiter(0.019, 0.026, 0.07, 3, 10);
    boot.rotation.x = Math.PI / 2;
    boot.position.set(-1.34, 0.19, zs * 0.30);
    rst.add(boot);
    rst.add(rod([-1.34, 0.19, zs * 0.315], [-1.39, 0.31, zs * 0.625], 0.010, M.steel));
    rst.add(balljoint([-1.34, 0.19, zs * 0.315], 0.014));
    rst.add(balljoint([-1.39, 0.31, zs * 0.625], 0.013));
    /* tie rod adjuster, held inboard of the pickup plane */
    const dn = new THREE.Vector3(-0.05, 0.12, zs * 0.31).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(UP, dn);
    const adj = lib.cyl(0.0145, 0.018, M.steel, 6);
    adj.quaternion.copy(q);
    adj.position.set(-1.3610, 0.2406, zs * 0.4650);
    rst.add(adj);
    /* mounting strap with its two bolts down onto the subframe */
    const strap = lib.cbox(0.016, 0.040, 0.030, 0.003, M.darkSteel);
    strap.position.set(-1.345, 0.196, zs * 0.20);
    rst.add(strap);
    rst.add(screw([-1.345, 0.216, zs * 0.20], [0, 1, 0], 0.006, M.steel));
  }
  const pin = lib.cyl(0.009, 0.03, M.steel, 10);
  pin.position.set(-1.34, 0.152, -0.10);
  rst.add(pin);
  sys.add(rst);

  /* ── chassis ECU in the underfloor gap above the battery lid ── */
  const ecu = lib.part('chassis-ecu', [0, -0.4, -0.45]);
  /* A sealed die-cast enclosure, drawn as one: a mounting flange with four
     bolts, a cast body, a lid with cooling ribs and a data plate, and three
     shrouded connectors. The flange underside is on LIDY and the top is
     y 0.344; the only vertices this part puts inside P.battery are the same
     twelve that were there before, on a plain unchamfered flange chosen for
     exactly that reason. See the LIDY comment for what is actually under
     that plane.

     THE FLANGE IS 210 BY 150, NOT 180 BY 120, AND THE REASON IS THE BOLTS.
     Drawn at 180 by 120 the flange stood 2 mm proud of a 176 by 116 cast
     body, so all four torx heads, which seat on the flange top at y 0.3140
     and grow to 0.3182, were inside a body that fills y 0.3140 to 0.3340
     across the whole bolt circle. A ray test over the gen9 preset returned
     them hidden from every direction in all four viewer states, closed,
     x-ray, exploded and exploded x-ray, because the bolts and the body are
     one part and no explode stage ever separates them: 896 triangles, 67
     percent of this part, that nobody can ever see. The flange now carries
     a corner mounting ear past each corner of the body and the bolts sit on
     the ears, 1.3 mm clear of the body wall in x and in z. */
  const ecuFlange = lib.box(0.210, 0.006, 0.150, M.sensor);
  ecuFlange.position.set(-0.95, LIDY + 0.003, -0.28);
  ecu.add(ecuFlange);
  const ecuBody = lib.cbox(0.176, 0.020, 0.116, 0.004, M.sensor);
  ecuBody.position.set(-0.95, 0.324, -0.28);
  ecu.add(ecuBody);
  const ecuLid = lib.cbox(0.170, 0.006, 0.110, 0.002, M.sensor);
  ecuLid.position.set(-0.95, 0.337, -0.28);
  ecu.add(ecuLid);
  const ecuFins = lib.fins(0.150, 0.004, 0.096, 6, 0.004, M.alu);
  ecuFins.position.set(-0.95, 0.342, -0.28);
  ecu.add(ecuFins);
  const plate = lib.cbox(0.040, 0.0015, 0.024, 0.0004, M.alu);
  plate.position.set(-1.020, 0.3408, -0.28);
  ecu.add(plate);
  /* On the ears, outboard of the cast body's 0.088 by 0.058 half extents.
     A torx head of r 0.0055 carries a flange of r 0.00671, so a center at
     0.096 by 0.066 puts the head between 0.0893 and 0.1027 in x and 0.0593
     and 0.0727 in z: 1.3 mm clear of the body wall, 2.3 mm inside the
     flange edge, and on the +y face nothing else covers. */
  for (const xo of [-0.096, 0.096]) {
    for (const zo of [-0.066, 0.066]) {
      ecu.add(screw([-0.95 + xo, 0.314, -0.28 + zo], [0, 1, 0], 0.0055, M.steel, 'torx'));
    }
  }
  /* signal connectors on the +x face, both hv-4 rings */
  for (const zo of [-0.030, 0.030]) {
    const shr = lib.cbox(0.018, 0.022, 0.032, 0.002, M.plastic);
    shr.position.set(-0.853, 0.324, -0.28 + zo);
    ecu.add(shr);
    const lev = lib.cbox(0.006, 0.005, 0.028, 0.001, M.plastic);
    lev.position.set(-0.853, 0.3375, -0.28 + zo);
    ecu.add(lev);
  }
  /* the 48 V feed lands on its own sealed connector, on the -x face */
  const pwr = lib.cbox(0.016, 0.018, 0.022, 0.002, M.plastic);
  pwr.position.set(-1.053, 0.324, -0.30);
  ecu.add(pwr);
  sys.add(ecu);

  /* ── hv-4 interface: bosses on the exact contract points. The front pair
     now sits inside the front wheel dish and the rear pair inside
     drivetrain-7's hub carrier bore; both are reported in the panel rather
     than silently relocated, because hv-4's own stubs are in there too. ── */
  const feeds = lib.part('48v-feeds', [0, -0.25, 0]);
  for (const xs of [1, -1]) {
    for (const zs of [1, -1]) {
      /* The boss is the CONTRACT and it is left alone: 30 by 20 by 20 mm,
         unchamfered, on the exact point, so the two published overlaps stay
         the numbers they are (r 0.1657 into the front spoke web over
         10.5 mm of z, and 10.2 mm into drivetrain-7's carrier bore). What
         it gains is the hardware around the joint rather than on it: a
         strain-relief backshell on the face the lead actually leaves by,
         which is the x-inboard one. On the rear pair that face runs AWAY
         from the axle, so the backshell sits at r 0.135 falling to 0.115
         and adds nothing at all to the annulus. */
      const boss = lib.box(0.03, 0.02, 0.02, M.hv);
      boss.position.set(xs * 1.30, 0.36, zs * 0.70);
      feeds.add(boss);
      const back = lib.cyl(0.0092, 0.014, M.darkSteel, 10);
      back.rotation.z = Math.PI / 2;
      back.position.set(xs * 1.30 - 0.022, 0.36, zs * 0.70);
      feeds.add(back);
      const gland = lib.cyl(0.0072, 0.010, M.darkSteel, 6);
      gland.rotation.z = Math.PI / 2;
      gland.position.set(xs * 1.30 - 0.033, 0.36, zs * 0.70);
      feeds.add(gland);
    }
  }
  for (const zs of [1, -1]) {
    /* Front leads, routed against the STEERED disc rather than the static
       one. The disc ring is r 0.1450 to 0.1826 over |z| 0.5985 to 0.6395 in
       the wheel's own frame, and at the commanded 14 degrees of lock it
       sweeps +/-0.242 of the fore-and-aft offset in z. So a lead is only
       safe if it is radially outside 0.1826 or if z plus that swing stays
       clear of the band. This one runs out to r 0.210 while still at
       |z| 0.688, then dives inboard behind the ring. */
    feeds.add(lib.tube([
      [1.30, 0.36, zs * 0.70], [1.268, 0.356, zs * 0.697], [1.240, 0.352, zs * 0.688],
      [1.228, 0.344, zs * 0.58], [1.222, 0.352, zs * 0.48], [1.220, 0.360, zs * 0.42],
    ], 0.008, M.hv));
    /* THE DAMPER BRANCH CLIMBS OVER THE HALFSHAFT INSTEAD OF THROUGH IT.
       It used to run [1.42, 0.350] straight to the valve connector, and the
       front axle line is at (x 1.45, y 0.355) with a forged bar of r 0.0186
       between its rolled fillets over |z| 0.338 to 0.632, so the straight
       line went through the bar: 110 crossing triangle pairs against
       drivetrain-9/front-unit, 6.72 mm deep. drivetrain-9's own fail panel
       measured the same clash from its side, 8.6 mm into this bar and
       18.2 mm into drivetrain-7's plain 22 mm cylinder, and ended "it is
       inherited routing and it belongs to whoever redraws that feed".

       The connector is ABOVE the axle, so the lead goes over the bar rather
       than under it and the detour costs nothing in length. Measured
       SURFACE to surface, triangle to triangle including every edge pair
       rather than nearest vertex, the lead now clears the whole front unit
       by 11.24 mm, closest between (1.4228, 0.3692, 0.5016) on the lead and
       (1.4350, 0.3652, 0.5340) on the bar. Crossings against the front unit
       go 110 to 0. */
    feeds.add(lib.tube([
      [1.234, 0.342, zs * 0.545], [1.31, 0.332, zs * 0.520], [1.404, 0.348, zs * 0.505],
      [1.424, 0.390, zs * 0.497], [1.458, 0.401, zs * 0.482],
      [dFeedF.x, dFeedF.y, zs * dFeedF.z],
    ], 0.008, M.hv));
    /* rear stub: inboard through the carrier bore at r 0.11, then down */
    feeds.add(lib.tube([
      [-1.30, 0.36, zs * 0.70], [-1.34, 0.355, zs * 0.665], [-1.34, 0.35, zs * 0.60],
      [-1.36, 0.34, zs * 0.55],
    ], 0.008, M.hv));
  }
  /* front passenger stub also feeds the compressor */
  feeds.add(lib.tube([
    [1.2285, 0.344, 0.583], [1.34, 0.318, 0.50], [1.50, 0.305, 0.43],
    [1.70, 0.305, 0.40], [1.84, 0.325, 0.38],
  ], 0.008, M.hv));
  /* rear driver stub also feeds the rear-steer actuator and the chassis ECU */
  feeds.add(lib.tube([
    [-1.36, 0.34, -0.55], [-1.35, 0.27, -0.42], [-1.34, 0.215, -0.29],
  ], 0.008, M.hv));
  feeds.add(lib.tube([
    [-1.36, 0.34, -0.55], [-1.20, 0.34, -0.46], [-1.06, 0.334, -0.345],
    [-1.0620, 0.3300, -0.3000],
  ], 0.008, M.hv));
  /* rear damper valve heads, one from each rear stub, landing on the
     connector the built valve head actually carries */
  for (const zs of [1, -1]) {
    feeds.add(lib.tube([
      [-1.36, 0.34, zs * 0.55], [-1.42, 0.35, zs * 0.47], [-1.49, 0.395, zs * 0.48],
      [dFeedR.x, dFeedR.y, zs * dFeedR.z],
    ], 0.008, M.hv));
  }
  /* P-clips where a lead crosses structure instead of running past it */
  feeds.add(pclip([1.70, 0.305, 0.40], [1, 0, 0], 0.008, 0.010, M.darkSteel));
  feeds.add(pclip([-1.35, 0.27, -0.42], [0.08, -0.86, 0.50], 0.008, 0.012, M.darkSteel));
  sys.add(feeds);

  return sys;
}
