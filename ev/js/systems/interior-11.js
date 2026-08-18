/* Interior, Gen 11: THE TANDEM CABIN.
   Successor to interior-6 (Gen 5 apex), which served six rungs unchanged.

   design/gen11.md narrows the greenhouse to 1.20 m BUILT and puts the two
   occupants in line. Four seats become two, there is no side-by-side
   seating, and this module owns the consequences: the seat that the rear
   occupant's knees straddle, the channel his feet run in, the restraints
   that no longer have a neighbor to protect anyone from, and the head
   clearance that ten generations never checked.

   EVERY NUMBER BELOW IS MEASURED OFF BUILT PARTNER GEOMETRY, not read out of
   a design document. The partners as they exist on 2026-08-12:

   - battery-11 floorlid: skin top y 0.3020, four C-section rails whose tops
     are y 0.3080, at |z| 0.2800 (x -0.055..0.695) and |z| 0.5200 (same x),
     plus rear pads at x -0.850..-0.750 on both |z|. THE LID IS THE FLOOR.
     Nothing in this module draws a second one, and nothing rests on the lid
     except the four landings named in the seat panels.
   - battery-11 sill: |z| 0.6600 to 0.7800, y 0.1035 to 0.4200. Taken.
   - body-11 doors and skin: cabin inner face |z| 0.6000. Canopy |z| 0.5976,
     glass to y 1.3300. Loft crown y 1.3220 on the centerline.
   - body-11 cage: THREE full-width bows whose SOFFIT is y 1.2990, at x 0.300,
     x -0.450 and x -1.100. The third was found by a 5 mm ray grid and missed
     by a 20 mm one, which is why the grid in the self check is 5 mm. They are
     the lowest roof structure over the head corridor, and the liner in this
     module runs 1.0 mm UNDER them rather than 58 mm under the roof. See the
     canopy-liner panel: that one millimeter is the whole fix.
   - body-11 floor pan: OUTBOARD only, |z| 0.6560 to 0.7800, y 0.4200 to
     0.5600. There is no cabin floor to bolt to inboard of that.
   - thermal-11 local-circuits: two vertical channel panels built at
     x 0.500..0.755, y 0.308..0.417. Their INNER face is the outboard wall of
     the rear foot channel and half of the 158 mm this module was asked to
     deliver. Re-measured over the deck's own x span it is |z| 0.5280, so
     against this module's own wall at 0.3810 the channel is 147.0 mm rather
     than 158, and the difference is thermal-11's, not this module's.
   - autonomy-11 ring: the 48 V loop runs the length of the foot channel at
     y 0.3580 to 0.3720, |z| up to 0.5005. It is the highest thing under the
     rear footwell deck and 2.0 mm is the clearance, which is the tightest
     number this module publishes.
   - thermal-11 recovery-core: stands IN the passenger-side channel from
     x 0.8000 to 0.9990 at |z| 0.3000 to 0.4200, and crosses the driver-side
     channel at x 0.4547 to 0.8453, y 0.4508 to 0.5580. The deck stops at
     x 0.7900 short of the first and under the second. It is the only partner
     this cabin's occupants still touch and the fail lists say so.
   - thermal-11 air-handler and glycol-loop, hv-11 spine, zone-drops and
     hv-runs, wheels-11 master-unit, autonomy-11 compute and dms,
     suspension-9 air-supply and steering: all swept, all avoided, all listed
     in the geometry notes below with the number.

   EVERY PARTNER FIGURE IN THIS FILE WAS RE-MEASURED AFTER thermal-11,
   wheels-11 and hv-11 WERE LAST REBUILT, on 2026-08-13. That is not a
   formality: thermal-11's recovery core moved 50 mm inboard in the foot
   channel and its air-handler crown 3 mm between one rebuild and the next,
   and a number carried across a partner rebuild is a number about a car that
   no longer exists.

   THE PARTNER SET IS ENUMERATED, NEVER TYPED. Every sweep quoted in this file
   builds its partner list from js/registry.js's VARIANTS plus what is on
   disk: each slot takes `<slot>-11.js` if that file exists and the last
   registered generation's choice otherwise, which yields body-11,
   battery-11, wheels-11, hv-11, thermal-11, autonomy-11 and the two carried
   modules drivetrain-9 and suspension-9. An earlier draft of this file quoted
   `autonomy-10` in four places because a human had written the list down
   before autonomy-11 landed, and one of those quotes was the foot-channel
   proof, which was false against the module the preset actually builds.

   Nothing here is lib.shell(). The cabin has to stay visible in x-ray.

   TWO PART IDS ARE CHOSEN RATHER THAN INVENTED, and the reason is written
   down here so nobody has to guess. tools/occupant.js carries a hard-coded
   DECLARED_CONTACTS list that recognizes `front-seats`, `rear-bench`,
   `cushion` and `headrest` LITERALLY, because it was written against
   interior-6's own ids. A new id is invisible to it, and an occupant sitting
   on a seat the tool cannot name reads as an intrusion. So the front seat
   keeps interior-6's id and the rear seat's id carries `cushion`. That is a
   compromise with a tool, it is not a description of the hardware, and it is
   stated here rather than discovered later. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

/* ── LOCAL package constants, all BUILT and all measured above ─────────── */
const LID = 0.3020;        // battery-11 floorlid skin top: THE CABIN FLOOR
const RAILY = 0.3080;      // battery-11 seat-rail tops
const RAILZ = 0.2800;      // inner rail pair, the seats land on these
const CHANRAILZ = 0.5200;  // outer rail pair, and the deck's outboard edge
const CABINZ = 0.6000;     // body-11 door and skin inner face
const SEATZ = 0.3810;      // seat side-structure outer face
const CHANZ = 0.5280;      // thermal-11 channel-panel inner face, MEASURED
const CUSH = 0.4520;       // cushion top: LID + 150 mm, gen11.md section 5
const HIPY = 0.4070;       // H-point: cushion minus the 45 mm sink
const REC = 36;            // booked recline, degrees from vertical
const PITCH = 0.8150;      // measured knee-bound tandem pitch
const HIPF = 0.4250;       // front H-point x
const HIPR = HIPF - PITCH; // rear H-point x, -0.3900
const LINER = 1.2980;      // liner skin, 1.0 mm UNDER the cage bow soffit
const TR = Math.tan((REC * Math.PI) / 180);   // 0.72654
const SR = Math.sin((REC * Math.PI) / 180);
const CR = Math.cos((REC * Math.PI) / 180);

/* The backrest face at height y for a seat whose bight sits 80 mm behind its
   H-point. One function, both seats, so the two can never drift apart. */
function backX(hx, y) { return hx - 0.080 - TR * (y - CUSH); }

export const SYSTEM = {
  id: 'interior-11',
  name: 'Interior · Gen 11 tandem',
  color: 0xd9c08a,
  explode: [0, 1.05, 0],
  /* WHERE THE PEOPLE ARE, declared rather than left to be guessed. These are
     the two H-points this cabin is drawn around, and tools/occupant.sh now
     reads them instead of inferring a seat from the geometry. It matters
     because inference failed four different ways on a tandem, every one of
     them a side-by-side cabin built into the ruler: a hard-coded 380 mm z
     offset, a hip station 80 mm forward of the seat bight (out by 141 mm at
     36 degrees of recline), the occupant's own backrest answering a question
     about the roof, and seats told apart only by z, which cannot see two
     seats that share a centerline. A declaration is still a CLAIM: the tool
     checks the hip actually sits on cushion and reports the sink. */
  occupants: [
    { name: 'front', hip: [0.4250, 0.4070, 0.0000], recline: 36 },
    /* legZ is the half-separation of the feet, and the rear occupant's are
       ASTRIDE the front seat rather than together: that is the whole tandem
       packaging argument. It is the CHANNEL center and not a stance, and an
       earlier draft got that wrong by 150 mm. It declared 0.300, reasoning
       from the front cushion's own edge at |z| 0.250 plus half a channel, and
       0.300 is inside the seat: the side-impact extrusion spans |z| 0.3450 to
       0.3810 and its three shell ribs span 0.2520 to 0.3400, both over the
       whole leg height, so a foot there is 73.0 mm into `front-seats` and a
       shin 78.3. Measured against the BUILT walls the clear channel is
       |z| 0.3810 (this seat's beam) to 0.5306 (thermal-11's channel panel),
       so its center is 0.4558 and the tread under it is built at 0.4505.
       0.4505 is what is declared, because the declaration has to name the
       station the geometry actually cut.                                    */
    { name: 'rear',  hip: [-0.3900, 0.4070, 0.0000], recline: 36, legZ: 0.4505 },
  ],
  blurb: 'Two occupants in line inside a 1.20 m greenhouse, and the first cabin on this ladder anyone has actually sat in. 111 kg against interior-6\'s 150, and the 39 kg is not a diet: a second row and a center console leave, a side-impact structure that only a tandem can afford arrives, and the canopy liner stops hanging under the roof and becomes a stressed skin held 1.0 mm under body-11\'s cage bows, which is the single change that turns 270.3 mm SHORT into 50.1 mm of measured head clearance at both stations. Both cushions sit on design/gen11.md\'s 150 mm pan, built 149.0, because a rear pan stepped up to dodge a partner that had already moved was quietly spending 37 mm of that 50.',
  parts: {
    dashboard: {
      name: 'Cowl beam and fascia',
      tagline: 'A 1.20 m cabin has 640 mm less beam to span than a 1.88 m one, and a beam\'s mass goes as the cube of its span at fixed stiffness.',
      mass: 18,
      specs: [
        ['Ancestor', 'interior-6 dashboard, 27 kg over a 1.88 m cabin'],
        ['Beam', 'Mg tube, 96 mm OD on (1.078, 0.740), span 1.000 m to |z| 0.500'],
        ['First bending mode', '71 Hz, from 52 Hz, on span alone'],
        ['Fascia', 'Carbon-skinned PET foam core, 4.2 mm sandwich, x 1.046..1.246'],
        ['Clearances', '24 mm aft of body-11 cage cowl ring, which ends at x 1.022'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The ledger is a span argument and nothing else, which is why it is the one part of this cabin whose saving needed no new idea. A simply supported beam at fixed first bending frequency and fixed section carries mass proportional to span, and at fixed DEFLECTION under a fixed load it goes as span cubed; the real case sits between the two because the section is redesigned as well. interior-6 spent 3.8 kg on a beam bridging a 1.88 m cabin and this one bridges 1.000 m between cage feet at |z| 0.500, so the tube drops to 96 mm OD in thinner wall and lands at 1.9 kg with first bending going 52 to 71 Hz. The fascia sandwich falls with area, from roughly 6 kg to 3.4, because the panel is 640 mm narrower and 180 mm shorter in x. Duct work is 1.8 kg against 2.5 because thermal-11 sweeps the cabin end to end with ONE extract rather than mixing four corners, so the fascia carries a supply plenum and no return. The remainder, the vent bodies, brackets, harness and fixings, is 10.9 against 14.7. Add 1.9, 3.4, 1.8 and 10.9 and the part is 18 kg.\n\nWhere it sits was decided by sweeping the partners rather than by styling. The volume x 0.90 to 1.00 between y 0.60 and 0.90 is thermal-11\'s air handler, x 0.926 to 1.022 is body-11\'s cage cowl ring, and hv-11\'s zone-drops fill x 0.941 to 1.054 from y 0.594 to 0.948 out to |z| 0.427. The first clear column aft of all three starts at x 1.046 and runs from y 0.680 to 1.080, so the beam axis is (1.078, 0.740) and the fascia stands on it between x 1.046 and 1.246. That puts the instrument surface 621 mm forward of the driver\'s H-point at x 0.425, while the hand wheel sits 255 mm forward of it, which is a reclined layout and reads as one: the eyes travel to a far surface and the hands stay near the chest. Four vents sit at |z| 0.170 and 0.300 on the fascia, inboard of the 0.427 that hv-11 already owns.',
      why: 'Everything a dashboard does badly, it does because it is wide. Its mass sits high and forward, so it is paid twice, once in the ledger and once in yaw inertia. Its beam has to span the whole car, so its section is set by a bending mode nobody wants to hear. Its ducting has to reach four corners. A tandem deletes the width and all three follow, and that is the honest reason this is the largest percentage saving in the cabin while being the least interesting engineering in it.',
      fail: [
        'Squeak and rattle across the -30 to +85 degree soak is still the top interior warranty item industry wide and a narrower beam does not change the bond line it is glued to, so the watch item carries from interior-6 unchanged.',
        'The instrument surface is 621 mm from the H-point and 366 mm beyond the wheel rim, which is further than any production car puts it, and the only reason it works is that the eyes are on a screen rather than on a needle. A driver who wants to reach the fascia cannot.',
        'The fascia sits 24 mm aft of body-11\'s cage cowl ring, and that ring is the load path for the whole front structure. Any body change that moves the ring aft closes the gap before anyone notices, because the two modules do not declare that plane as an interface.',
      ],
      explode: [0.55, 0.35, 0],
    },
    displays: {
      name: 'HMI and handover band',
      tagline: 'The band that told a driver how much of the handover budget was left is 640 mm shorter, and the passenger it used to talk to is now sitting behind the driver looking at the back of the seat.',
      mass: 7,
      specs: [
        ['Ancestor', 'interior-6 displays, 9 kg'],
        ['Center display', '13 in, 2800 x 1180, optically bonded, 1400 cd/m2'],
        ['Handover band', '0.700 m across the fascia at (1.062, 0.786), 8 ms out'],
        ['Rear repeater', '110 mm strip in the front seat back, x -0.140, y 0.900'],
        ['Safety path', 'Isolated core repaints speed and state within 300 ms'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Two things carry from interior-6 because they were right and the package did not touch them: optical bonding, which is most of the difference between readable and washed out, and an isolated ASIL-B core that repaints speed and state inside 300 ms whatever the application processor is doing. The panel shrinks from 15 to 13 inches because the fascia is 640 mm narrower, and the handover band shrinks from 1.44 to 0.700 m for the same reason. Neither is a capability loss: the band was never read foveally, it was read peripherally, and 0.700 m at the 621 mm the fascia stands from the H-point subtends 59 degrees, which is still wider than the useful field.\n\nWhat the tandem genuinely changes is that the second occupant can no longer see the instrument surface at all. In interior-6 the passenger sat beside the driver and shared one panel; here the rear occupant faces the back of a seat 623 mm in front of his chest, and the only thing he can see is that seat. So the band grows a repeater: a 110 mm strip let into the front seat back at (x -0.140, y 0.900), driven by the same isolated core, showing the same three states in the same three colors. It is not a screen and deliberately so. A rear occupant who can read a menu will use one, and a menu 623 mm from a reclined face at 36 degrees is a neck-strain complaint waiting to be filed. Three ticks and a color is what a passenger actually needs from a fail-operational car: is it driving, is a lane down, and is it about to ask the human in front of me for something.',
      why: 'interior-6 argued the band on peripheral bandwidth during a handover, and that argument is unchanged by seating. What is changed is the second person. A side-by-side passenger is a redundant pair of eyes on the same instruments and an aid in a handover; a tandem passenger is a payload facing upholstery. Giving him three ticks rather than nothing is the difference between a passenger who knows the car is thinking and one who only finds out when it slows down.',
      fail: [
        'Low sun behind the driver still washes out the matte etch, carried from interior-6 unimproved, because there is no software fix for geometry.',
        'The rear repeater is 623 mm from the rear occupant and 110 mm wide, so it is legible and uninformative by design. Anyone who wants to know WHY a lane went down has to ask the person in front, and that is a genuine regression against a shared center panel.',
        'A color-blind rear occupant gets segment position and motion and nothing else, because there is no room for words on a 110 mm strip.',
      ],
      explode: [0.62, 0.6, 0],
    },
    wheel: {
      name: 'Hand wheel and feel unit',
      tagline: 'The one part of interior-6 that moves to the centerline and gets simpler doing it: a tandem driver sits on the car\'s axis of symmetry, so the wheel does too.',
      mass: 10,
      specs: [
        ['Ancestor', 'interior-6 wheel, 10 kg, at z -0.380'],
        ['Position', 'Rim axis (0.680, 0.870, 0.000), 645 mm from the acromion'],
        ['Steering shaft', 'None. suspension-9 draws none either; both sides checked'],
        ['Mount', 'Two tubes to body-11 cage crown y 0.8960, shoes on 1.0 mm shim'],
        ['Feel motor', '16 Nm direct drive, 90 Hz useful bandwidth'],
        ['Sensing', 'Triple angle and torque, three supplies, three ring segments'],
        ['Maturity', 'Pilot line; direct-drive feel at automotive NVH is not shipped'],
      ],
      how: 'The hardware carries from interior-6 whole and is not re-argued here: a 16 Nm direct-drive machine on the rim axis with no gearbox and no belt, reaching about 90 Hz where a toothed belt stopped being useful near 25, triple angle and torque sensing on three supplies, and no steering shaft continuing anywhere, in this module or in suspension-9. The ledger is unchanged at 10 kg because nothing about the machine changed.\n\nWhat changed is where it is, and the tandem makes that both easier and harder. Easier: a driver on the centerline puts the rim on the plane of symmetry, so the two hands see identical structure. Harder: the volume forward of the driver is fuller than it was. Swept against the built partners, thermal-11\'s air handler fills x 0.7860 to 1.0050 up to y 0.8960, thermal-11\'s recovery core x 0.8000 to 0.9990, body-11\'s cage x 0.9438 to 1.0213 and wheels-11\'s master unit x 0.8470 to 1.1994. The last clear column aft of all four ends at x 0.780. So the rim axis sits at (0.680, 0.870, 0.000) with a 175 mm rim in the y-z plane, 645 mm from the driver\'s acromion at (0.0382, 0.9393) with the grip circle running 508 to 748 mm, which is a straight-armed reclined reach and is the posture this generation booked rather than an accident of packaging.\n\nA CAR WITH NO STEERING SHAFT STILL NEEDS A MOUNT, AND AN EARLIER DRAFT OF THIS PART DID NOT HAVE ONE. It ended in a cast post at (0.520, 0.780, 0.000) hanging in mid air, and tools/check-interfaces.sh named it exactly: "interior-11/wheel instance at (x 0.623, y 0.870, z 0.000), 11 meshes", nearest other surface 52.6 mm away. It was the first floating instance in an interior on this ladder, against thirteen in autonomy modules that HANDOFF.md already records. The post is deleted.\n\nWhat replaces it was found by rays rather than by drawing. body-11 carries a cowl cross member at x 0.9640 to 1.0160 whose section is constant across the car: crown y 0.8960 at x 0.990, 0.8919 at 0.980 and 1.000, 0.8845 at 0.970 and 1.010, unchanged at every |z| from 0.180 to 0.280. autonomy-11 lands its driver monitor on the same member 200 mm inboard. THE ROUTE TO IT IS OUTBOARD, because the centerline is full: rayed down at |z| 0.2200 to 0.2500, the highest partner surface anywhere from x 0.700 to 0.960 is the air handler at y 0.8200, since the case only reaches its own 0.8960 crown inboard of |z| 0.2071. That lane is 76 mm deep and it exists at the same |z| on BOTH sides, so the mount stays symmetric. Two 28 mm tubes leave the machine end faces at (0.646, 0.876, |z| 0.062), sweep out and forward into the lane and run flat to shoes at (0.990, 0.902, |z| 0.235). Each shoe is 48 mm long over a crown that falls 11.5 mm across it, so it seats on 1.0 mm of shim rather than on a fit, which is autonomy-11\'s lesson on this same member. Measured after the fact: the whole assembly clears thermal-11\'s air handler by 26.4 mm and its recovery core by 85.5 mm, and the shipped attachment check now passes with 133 instances and none floating.',
      why: 'A car with no steering shaft can put the rim where the driver\'s arms are instead of where a steering box is, and interior-6 spent that dividend moving the rim 145 mm closer. A tandem spends it differently: it moves the rim onto the centerline, which is the only place in this car where the structure is symmetric, and it accepts a longer reach because a 36 degree recline lengthens the arm line anyway. Both are the same argument, that the interface goes where the human is. The mount is the other half of that argument and the half that is easy to forget: deleting a shaft deletes the load path as well as the linkage, and a feel unit with 16 Nm of authority reacts every newton of it into whatever is holding it.',
      fail: [
        'A direct-drive motor has no gearbox to hide its cogging behind, carried from interior-6 unfixed: the machine is wound for smoothness rather than density and is heavier than its torque figure justifies.',
        'The mount lands on body-11 and NEITHER MODULE DECLARES IT. The shoes sit 1.0 mm over a cage crown at y 0.8960 that this module measured and does not own, so a body revision that lowers that member by more than a millimeter puts an interior part inside a structural one and the only check that would catch it is the cross-module sweep, after the fact. It is the same undeclared-plane defect the dashboard fail list already carries, and it is now on two parts.',
        'The tubes run 26.4 mm from thermal-11\'s air handler over 260 mm of their length and nothing declares that plane either, so a thermal revision that grows the case aft or outboard closes it silently.',
        'Feel is a calibration liability with 90 Hz of authority behind it, and a bad release now makes good hardware drive badly on the centerline where both hands feel it equally.',
      ],
      explode: [0.45, 0.15, 0],
    },
    'front-seats': {
      name: 'Front seat, and the side structure only a tandem can afford',
      tagline: 'Nobody sits beside this occupant, so the 131 mm of width per side that a second person used to occupy becomes the door beam body-9 never had.',
      mass: 26,
      count: 1,
      specs: [
        ['Ancestor', 'interior-6 front-seats, 44 kg for two, 22 kg each'],
        ['H-point', '(0.425, 0.407, 0.000), cushion top BUILT 0.4510 = lid + 149.0'],
        ['Backrest', '36.0 degrees from vertical, the booked recline'],
        ['Landings', 'battery-11 inner rails |z| 0.2800 at x 0.100 and 0.640'],
        ['Side structure', 'Mg extrusion |z| 0.3450..0.3810, y 0.360..0.620, 670 mm'],
        ['Footwell deck', 'x 0.170..0.790, |z| 0.381..0.520, y 0.3740..0.3800'],
        ['Cross member', 'x 0.170..0.250, |z| to 0.520, same plane, ties both decks'],
        ['Maturity', 'Pilot line; the seat-mounted side beam is not shipped anywhere'],
      ],
      how: 'The load case that set every gauge in interior-6 is unchanged, and it is why this is still the heaviest single item in the cabin. In a 30 g frontal pulse the frame holds its occupant while the pretensioned belt feeds about 4 kN into it, the recliner must not back-drive, and the tracks must not release, and all of that now runs through an integrated belt because there is no B-pillar in a 1.20 m tandem worth anchoring to. The seat therefore reacts the full belt load itself, which adds 3.5 kg of frame over interior-6\'s 6.5 and is the reason a two-seat cabin does not save what a naive halving would predict. The crash path is occupant, frame, track, rail, cell stack: each track lands on battery-11\'s INNER rail pair at |z| 0.2800, at x 0.100 and x 0.640, both inside that rail\'s built span of x -0.055 to 0.695, and the lid passes the load through potted inserts into the brick tops. The OUTER rail pair at |z| 0.5200 carries nothing in this cabin and is re-purposed as the foot-channel tread, which is the one place a tandem gets something for free. The 26 kg audit reads: 10.0 kg frame, recliner and belt reaction, 5.5 kg side structure, 4.5 kg foam and trim, 2.5 kg tracks and two motors, 3.5 kg of posture cells, pump, ventilation and heater mats.\n\nThe side structure is the part of this seat that has no ancestor. design/gen11.md section 9 item 7 records that above the sill this car has no door beam, no inner panel and no reinforcement anywhere, measured, and that a narrow car makes that worse. A tandem is the first package on this ladder that can answer it, because the 131 mm per side between the cushion edge at |z| 0.250 and the foot channel wall at 0.381 is width that used to be a second person and is now empty. A magnesium extrusion runs there, |z| 0.3450 to 0.3810 and y 0.360 to 0.620, from x 0.050 to 0.720, tying the front and rear track towers together and standing 312 mm above the lid at the occupant\'s hip line. Its underside is held at y 0.360 rather than at the rail top for a measured reason: thermal-11\'s local circuits run a cross tube at x 0.655 to 0.741 whose crown is y 0.353, and 7 mm is the clearance this module accepts there. In a side impact the beam is loaded in three-point bending between the towers with the pack sill 219 mm below it as the reaction, which is a load path body-9 never had and a door skin of 0.9 to 1.6 mm could never be.\n\nThat beam\'s outer face at |z| 0.3810 is also the inboard wall of the REAR occupant\'s foot channel, and the channel is where design/gen11.md\'s 158 mm figure lives. Measured on both built walls over the deck\'s own x span: this face at |z| 0.3810 and thermal-11\'s channel panel inner face at |z| 0.5280, which is 147.0 mm and not 158. Against a shod 95th percentile foot breadth of 0.120 m that is 27.0 mm of total spare rather than the doc\'s 38, 13.5 mm a side.\n\nTHE CHANNEL IS AT |z| 0.4505 AND NOT WHERE AN EARLIER DRAFT DECLARED IT. That draft put the rear occupant\'s feet at |z| 0.300, reasoning from the front cushion\'s own edge at 0.250 plus half a channel, and 0.300 is inside this seat: the side extrusion spans |z| 0.3450 to 0.3810 and its three shell ribs 0.2520 to 0.3400, both over the whole leg height, so a foot there is 73.0 mm into this part and a shin 78.3. The declaration now names the station the geometry cut, which is the center of the built deck.\n\nThe floor of that channel is the other surprise. Swept with tools/interfaces.js against all nine gen11 modules, a shod foot box of 0.287 by 0.073 by 0.120 at |z| 0.4505 reads: sole on the pack lid at y 0.3020, thermal-11/local-circuits 49.53 mm, autonomy-11/ring 30.36, battery-11\'s own outer lid rail 13.00 and thermal-11/glycol-loop 17.92 on the driver side; sole on the 4 mm NVH tile at 0.3062, the same four at 49.55 mm worst; sole at y 0.3800, CLEAR on both sides over x 0.450 to 0.737. Five modules route through the 78 mm between the lid and that plane, so the rear footwell gets a raised deck rather than a floor: a 6 mm plate cantilevered off this seat\'s own side beam, top face y 0.3800, |z| 0.3810 to 0.5200, running x 0.170 to 0.790, with a cross member on the same plane from x 0.170 to 0.250 closing the two sides into one floor rather than two ledges. THE DECK\'S UNDERSIDE AT y 0.3740 CLEARS autonomy-11\'s 48 V RING BY 2.0 mm, ray-measured at its highest vertex under the footprint, (0.6835, 0.3720, -0.4763), and that is the tightest clearance this module publishes. Nothing stands on the deck: a 3 mm grip rib was drawn and deleted for the same 2 mm.\n\nThe cross member is not decoration and it is not only structure. tools/occupant.sh finds the floor the heel lands on by firing ONE ray down the cabin centerline, at x 0.2100 for this cabin\'s rear station. With two cantilevered ledges and a hole between them it found the NVH tile at y 0.3062 and put the rear heel 78 mm below the floor this seat gives it. The floor is genuinely continuous now and the ruler reads it as one: floorY 0.3800, and both occupants come back clear.',
      why: 'interior-6 correctly rejected a 24 kg thin-shell seat because it gave back adjustment and comfort to buy mass. The tandem changes the question rather than the answer: the seat is no longer competing for width with a neighbor, so the mass argument stops being about the seat at all and becomes about what else that width could do. Nothing else can use it. thermal-11 already put a radiant panel on the far wall of the channel, hv-11 and autonomy-11 route below y 0.470, and the volume between the cushion and the channel is otherwise dead air 312 mm tall. Spending 5.5 kg of it on the only side structure this car has is the highest-value kilogram in this module by a wide margin.',
      fail: [
        'The rear occupant\'s toe box does not clear thermal-11. Rebuilt at the booked 36 degrees with the heel on this deck, the ruler straightens the shank until it reaches the floor and the right foot runs out to x 0.970, where thermal-11\'s recovery core stands in the channel from x 0.8000 to 0.9990 at |z| 0.3000 to 0.4200: 69.80 mm over 123 triangle pairs at (0.779, 0.450, 0.433). The same core crosses the driver-side channel higher up at x 0.4547 to 0.8453, y 0.4508 to 0.5580, and takes 16.71 mm of shin. Those two are the ONLY things either occupant touches across all nine gen11 modules, this deck stops at x 0.790 ten millimeters short of the first, and neither is inside this module\'s gift to move.',
        'The side beam is seat-mounted, so it protects the occupant only in the seat position it is bolted at, and it moves 120 mm of fore-aft travel with him. A door beam is in the door whatever the seat is doing, and this one is not. THE FOOTWELL DECK MOVES WITH IT, which is worse, because the rear occupant\'s floor is then a function of where the front occupant put his seat, and nothing in this module bounds that coupling.',
        'Magnesium in a seat frame is a corrosion and creep question rather than a strength one, carried from interior-6: a coating breach at a track bolt is how a light frame becomes a warranty case, and the beam adds a second bolted joint in the same salt path.',
        'The integrated belt puts the whole restraint load into two tracks on one rail pair at |z| 0.2800, where interior-6 spread it over a B-pillar anchor and two rails. battery-11\'s potted inserts are now a single-path item for the belt as well as the seat, and nothing in either module declares that as an interface.',
      ],
      explode: [0.35, 0.4, 0],
    },
    'rear-seat-cushion': {
      name: 'Rear seat, and the knee recess it sits behind',
      tagline: 'At the measured knee-bound pitch of 0.815 m the rear occupant\'s knees arrive exactly where the front seat back is, so the front seat back gets out of the way rather than the pitch growing.',
      mass: 22,
      specs: [
        ['Ancestor', 'interior-6 rear-bench, 24 kg for three seats'],
        ['H-point', '(-0.390, 0.407, 0.000), 0.8150 m behind the front'],
        ['Cushion', 'BUILT top 0.4510 = lid + 149.0 mm, flat, same table as front'],
        ['Landings', 'battery-11 rails at x -0.030 and rear pads at x -0.800'],
        ['Knee recess', 'Front seat back narrows to |z| 0.1850 over y 0.510..0.620'],
        ['Ingress', 'Past the front seat, no second door line: see fail'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The pitch is measured rather than chosen and it is the tightest dimension in the cabin. Buttock-to-knee on a 95th percentile male is 660 mm, so a rear H-point 815 mm behind the front puts the rear knee joint at x 0.256, while the front seat back face at that height is built at x 0.278. The knee and the seat back are 22 mm apart, which is what knee-bound means. Two ways out exist and only one is affordable: grow the pitch, which costs cabin length the 4.83 m car does not have, or take the width out of the front seat back where the knees are. This module takes the width. The front seat back is built at half-width 0.250 everywhere except between y 0.510 and 0.620, where it narrows to 0.1850 over a 110 mm band, and that band is exactly the height the rear knees occupy at 36 degrees. The occupant model\'s thigh box is 0.396 m across, so its outer face sits at |z| 0.198 and the recess clears it by 13 mm per side.\n\nThe seat itself lands on battery-11 and on nothing else, which took a frame the front seat does not need. The rails on the lid run x -0.055 to 0.695 and the rear pads run x -0.850 to -0.750, and there is 0.695 m of flat lid between them with no landing on it at all. So each side of this seat is one magnesium beam on |z| 0.2800 spanning from a foot at x -0.800 on the pad to a foot at x -0.030 on the rail\'s aft end, 770 mm between landings, carrying the cushion pan and the backrest tower in between. Nothing is bolted to the lid skin itself, and the beam is drawn 36 mm wide rather than 46 so that it stays inside |z| 0.300, because thermal-11\'s glycol loop passes at |z| 0.303 directly over that rear pad. The 22 kg audit: 9.0 kg beams, pan and backrest tower, 4.5 kg foam and trim, 2.5 kg recliner and belt reaction, 3.0 kg of posture cells and ventilation, 3.0 kg side structure, which is the same extrusion as the front seat\'s but 105 mm shorter because that same glycol loop climbs to y 0.441 at x -0.770 to -0.701 and the beam stops forward of it at x -0.685.\n\nTHIS CUSHION IS FLAT AND AN EARLIER DRAFT STEPPED IT, which is the most expensive thing this module has deleted. The step lifted the rear 132 mm of the pan by 42 mm to clear autonomy-10\'s triplex compute stack at x -0.762 to -0.338, y 0.389 to 0.460. autonomy-11 is the Gen 11 partner and it moved that plate to the tail deck at x -1.5262 to -1.1710 under body-11\'s cant rail, for exactly the reason this seat would have given it, so the step was clearing an obstacle against a module the preset does not build. Rayed down at 5 mm over x -0.95 to -0.15, |z| under 0.32, the only partner material left under this cushion is battery-11/floorlid topping at y 0.3080 and suspension-9/chassis-ecu at x -1.0610 to -0.8440 up to y 0.3440, both below the flat pan\'s own underside of 0.3520. And the step cost the head clearance: it put the built cushion top at 0.4892 under the declared H-point instead of the booked 0.4520, so the real H-point was 0.4442 and 50.1 mm of clearance was really 12.8. Rayed down at (x -0.390, z 0) the flat cushion now measures y 0.4510, which is lid plus 149.0 mm against design/gen11.md section 5\'s 150 mm pan, and tools/occupant.sh reports 42.1 mm of sink against a declared 0.4070 hip, inside the 45 mm a cushion gives.',
      why: 'A tandem rear seat is the only seat on this ladder whose geometry is set by the seat in front of it rather than by the body around it. interior-6\'s bench was set by autonomy-4\'s cold plate underneath and by the cage hoop above; this one is set by a knee. That is worth saying plainly because it changes who owns the risk: if the front seat is redrawn 30 mm wider at knee height, this seat does not fit and neither module\'s own smoke test can see it, because a knee recess and the knee it clears are in the same module only by luck.',
      fail: [
        'Rear ingress is past the front seat and there is no second door line worth the name in a 1.20 m cabin. Getting in means the front seat back folding and the occupant stepping over the pack sill at |z| 0.660 to 0.780 and then down 312 mm into a reclined bucket. It is a genuinely worse operation than a rear door, it is slower, and no amount of seat kinematics makes it good.',
        'Rear visibility past a reclined front occupant is worse than a four-seat cabin\'s and worse than it sounds. A head at 36 degrees sits 1.2479 m up and 497 mm forward of its own H-point, so from the rear H-point the front occupant subtends about 24 degrees of the forward view and the front headrest takes another 9. The mirrors are camera-fed and the rear occupant is not driving, which is a mitigation and not a fix.',
        'The knee recess clears the occupant model\'s thigh box by 13 mm per side, and that box is a conservative rectangle rather than a knee. A real knee splays outboard and a real trouser leg is not 396 mm across, so the true margin is larger and unmeasured. Quoting 13 mm is honest about the model, not about the person.',
        'The rear occupant\'s posture is a declaration and a declaration can be wrong. tools/occupant.js now takes both the hip and the leg half-separation from SYSTEM.occupants and MEASURES them against the built seat, which is the right shape of check, but it can only measure what is declared: an earlier draft declared feet at |z| 0.300 and the tool dutifully drove them 73.0 mm through the seat in front, and the number that caught it came from a foot box swept by hand rather than from the gate. The gate reports sink and intrusion; nothing in this repo checks that a declared leg station is inside the channel the same module cut.',
      ],
      explode: [-0.25, 0.45, 0],
    },
    luggage: {
      name: 'Luggage, and where it actually went',
      tagline: 'design/gen11.md section 9 item 3 names luggage as an unpriced capability cost and hands it to this module. The answer is 61 liters, and it is not a good answer.',
      mass: 5,
      specs: [
        ['Deleted', 'interior-6 rear bench footprint, x -1.27..-0.48, about 310 L'],
        ['Tail locker', 'x -1.390..-1.150, y 0.780..1.100, |z| 0.400, 61 L'],
        ['Channel trays', 'DRAWN AND DELETED: the volume is not free, see how'],
        ['Frunk', 'NOT available: hv-11 buffer and thermal-11 heat pump own it'],
        ['Total', '61 L, against a class norm near 400'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The honest accounting first, because the number is bad and burying it would be worse. Deleting the rear bench deletes a bench, not the volume under and behind it, and on this car most of that volume was never luggage: swept against the built partners, the bay from x -1.90 to -1.15 contains hv-11\'s rear runs, converter, v2g port, zone-drops, spine and zonal boxes, suspension-9\'s rear structure, dampers, air springs and ARB decouplers, drivetrain-9\'s torque-vectoring controller and autonomy-11\'s ring, in 22 distinct part boxes. There is no trunk. The frunk is likewise spoken for: hv-11\'s buffer occupies x 1.798 to 2.016 and thermal-11\'s heat pump x 1.789 to 2.047, which is the whole of P.frunk.\n\nWhat is left is measured rather than hoped for, and it is one thing. Above the hardware and behind the rear headrest there is a genuine void: swept at 20 mm steps, the volume x -1.390 to -1.150, y 0.780 to 1.100, |z| below 0.400 contains nothing at all except body-11\'s cage, whose rear hoop stands forward of it at x -1.483 to -1.394 and whose skin closes above y 1.096. A 61 liter locker goes there, hinged at its forward edge off the rear seat\'s backrest tower and loaded over the seat back. A second idea was drawn and then deleted, and the deletion is worth recording because it is the finding: two shallow trays in the foot channels, 50 mm deep between the lid rail tops at y 0.3080 and the underside of autonomy-11\'s 48 V ring at y 0.3580. Swept against the built partners they penetrated thermal-11\'s glycol loop, which crosses that band from x -0.933 to -0.249, and suspension-9\'s chassis ECU at x -1.055 to -0.845. The volume looked free in a bounding box and was not free in the geometry, which is the third time in this module that a box lied and a sweep did not.',
      why: 'The alternative was to say nothing, and design/gen11.md explicitly forbids that: it names luggage as a capability cost nobody agreed to and asks this module to state what remains. Sixty-one liters is a weekend for one person or an overnight for two, and it is the price of a 1.20 m car whose entire floor is a 190 kWh pack and whose entire tail is the rear corner. The alternative that was NOT taken is worth naming too: a locker in the volume x -1.60 to -1.39 would be 40 liters larger and it is where body-11\'s rear cage hoop stands, and no amount of luggage is worth cutting a hoop.',
      fail: [
        'Sixty-one liters against a class norm near 400 is not a compromise, it is the deletion of a capability, and calling the tail locker a trunk would be dishonest. The car cannot carry a suitcase.',
        'The tail locker is loaded over the rear seat back from inside the cabin, because body-11 has no tailgate aperture at that station. Loading it means reclining or folding the rear backrest, which cannot be done with a rear occupant in the seat.',
        'Sixty-one liters is the number with the locker empty of anything else, and thermal-11, hv-11 and autonomy-11 are all still being drawn for this generation. It is the first free void any of them will look for, and this module has no claim on it stronger than having drawn it first.',
      ],
      explode: [-0.5, 0.35, 0],
    },
    pedals: {
      name: 'Pedal set',
      tagline: 'Hung from the cowl beam because there is still no floor to stand on, and now inboard of |z| 0.230 because everything outboard of that belongs to somebody.',
      mass: 5,
      specs: [
        ['Ancestor', 'interior-6 pedals, 5 kg'],
        ['Brake', 'By-wire, decoupled; dual-element simulator, either alone legal'],
        ['Travel', '55 mm, about 70 N at 1.0 g, curve carried from Gen 5'],
        ['Position', 'Faces at (1.212, 0.556), |z| 0.070..0.170; box on (1.200, 0.734)'],
        ['Sensing', 'Triple redundant position, three supplies, two zonal rings'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The mechanism carries from interior-6 and is not re-derived: a decoupled brake pedal pushing two simulator elements in parallel, each sized so either alone meets the legal effort limits, a two-stage curve giving 12 N of breakaway then 1.0 g at about 70 N and 55 mm, and three position channels on three supplies split across both of hv-11\'s zonal rings. The hydraulic fallback belongs to the braking hardware in the wheels module and is deliberately not described here, for the reason interior-6 gave.\n\nWhere the pedals go is entirely new, because the volume forward of a reclined tandem driver is the busiest part of this car. Swept between x 1.05 and 1.45, drivetrain-9\'s front unit fills x 1.326 to 1.531 out to |z| 0.332, its disconnect x 1.400 to 1.469, its inverter x 1.293 to 1.585; thermal-11\'s local circuits run x 1.002 to 1.469 between y 0.447 and 0.626; wheels-11\'s master unit reaches x 1.048 to 1.152 at |z| 0.316 to 0.355; suspension-9\'s steering occupies x 1.190 to 1.250 out to |z| 0.480 and autonomy-11\'s ring crosses at x 1.0501 to 1.1731. Two more had to be added to that list after the first cut was swept: wheels-11 runs its master-unit harness through x 1.066 to 1.128 at y 0.604 to 0.630, and thermal-11 runs local circuits through y 0.566 to 0.629 out to |z| 0.235, and the first pedal box sat inside both. Both pedals therefore hang from the cowl beam as organ pedals on a 130 mm stay, with the box on (1.200, 0.734) and the faces at (1.212, 0.556) inboard of |z| 0.170, which is the only column in the bay clear of all eight. There is no floor pedestal because there is no floor: battery-11\'s lid ends at x 1.290 and body-11 draws no cabin floor inboard of |z| 0.6560 at any station.',
      why: 'A simulator\'s feel is a specification and a hydraulic pedal\'s feel is a consequence of pad temperature and fluid age, and once braking is blended electronics anyway the synthesis is the more truthful of the two. What the tandem adds is only that the pedal box is now a packaging problem rather than an ergonomics one, and the honest response to a packaging problem is a sweep rather than a preference.',
      fail: [
        'The simulator always feels the same, so it cannot telegraph fade or a failing circuit through the sole; that information moves to the handover band, which is an honest demotion carried from interior-6.',
        'A reclined driver with a 1.34 m hip-to-heel reach presses the pedals with a nearly straight leg, so pedal effort is reacted by the seat back through the pelvis rather than by the hip flexors. It is the racing-car answer and it is fatiguing in traffic in a way an upright pedal box is not.',
        'The pedal faces stop at |z| 0.170 because wheels-11 and thermal-11 own everything outboard of them in that bay. That is 100 mm narrower than interior-6, and a large boot in a hurry can foul the inboard edge of the throttle, which is a real regression bought by the package.',
      ],
      explode: [0.35, -0.18, 0],
    },
    'canopy-liner': {
      name: 'Canopy liner, clipped into the cage rather than hung under it',
      tagline: 'This is the part that was wrong for ten generations. interior-6 hung its ceiling 58 mm under the roof and put its own occupant 270.3 mm through it. This one is a stressed skin at the cage soffit and it gives 50.1 mm back.',
      mass: 5,
      specs: [
        ['The defect', 'interior-6 liner at y 1.266 under a headrest top of 1.2546'],
        ['The fix', 'Flat skin at y 1.2980, 1.0 mm UNDER the bow soffits at 1.2990'],
        ['Head crown', 'y 1.2479 at 36 degrees over a 0.3020 floor, both occupants'],
        ['Clearance', '50.1 mm, measured on a 5 mm ray grid over the whole head box'],
        ['Span', 'x 0.240 to -1.060, half-width 0.210 to 0.230, flat to |z| 0.097'],
        ['Maturity', 'Pilot line; a structural low-e ceiling skin is not shipped'],
      ],
      how: 'The failure this part exists to correct is worth stating exactly, because it survived ten rungs. interior-6 builds a formed shell hanging on six clips under body-6\'s crown, and on the Gen 7 to Gen 9 roofs that shell sits at y 1.266 while its OWN headrest tops out at 1.2546 and its own occupant\'s crown lands at 1.4520. tools/occupant.sh reports 270.3 mm SHORT against that liner. Nothing on the car could see it because every penetration check compares parts from DIFFERENT modules and a seat and its own ceiling are one module. The geometric cause is simple: a liner hung UNDER the lowest roof structure spends the head clearance twice, once on the structure and once on the trim.\n\nSo this liner is not hung, it is stretched, and it is FLAT. body-11 lays three full-width cage bows across the cabin whose soffit is y 1.2990, at x 0.300, x -0.450 and x -1.100, and those three soffits are the lowest roof structure over the head corridor. A pre-tensioned skin needs no depth to hold its shape, so this one runs at a constant y 1.2980 from x 0.240 to x -1.060 and passes 1.0 mm under all three bows rather than 58 mm under the roof. The consequence is the number this generation is built on: a 95th percentile male at 36 degrees on a 0.4520 cushion over the 0.3020 lid puts his crown at y 1.2479, and a 5 mm ray grid fired up from that crown plane over the whole 0.307 by 0.165 m head box returns 50.1 mm at BOTH stations, against the 50 mm design/gen11.md section 5 budgets. The headrests top out at 1.2600, 12 mm above the crown and 38 mm below this skin, which is the opposite of interior-6\'s ordering and is the whole content of the fix.\n\nTwo details are worth keeping because both were found by measurement and neither by drawing. The skin is FLAT out to |t| 0.46 of its own half-width, which lands at |z| 0.097 at the narrowest station and is outboard of a 95th percentile head\'s 0.0825 half-breadth: the first cut let the section start dropping at |z| 0.072 and the head-box CORNERS then read 48.7 mm instead of 50.1. And the two ceiling lamps are recessed ABOVE the skin at y 1.3015 rather than surface-mounted below it, because a 6 mm lamp hanging under the ceiling took the same measurement to 43.1 mm. Both are interior-6\'s mistake exactly, committed at 1.4 mm and 7 mm instead of 58. The low-emissivity physics carries from interior-6 unchanged: a vacuum-metallized upper face at emissivity 0.05 against glass at 0.84 gives an effective 0.0495, which is 5.9 percent of the bare-glass exchange, over a canopy 1.20 m wide rather than 1.88.',
      why: 'Every other fix for a cabin that does not fit costs something: recline costs posture, roof height costs frontal area, cushion height costs the pack. This one costs nothing at all, because the trim was occupying volume the structure had already spent. A skin in tension can do that and a formed shell on clips cannot, which is the whole engineering content of the part. It is also the reason design/gen11.md could book 1.33 m of roof at 36 degrees instead of 1.44: the 50 mm of head clearance in that stack is only available if nothing hangs below the cage.',
      fail: [
        'A tensioned skin is a drum. It has a first mode where a formed shell has none, and a 24 mm cavity is too shallow to damp it, so the acoustic treatment on its lower face is doing structural work as well as absorptive work and the NVH panel books it once.',
        'The clearance is 50.1 mm to body-11\'s own structure and this module cannot defend it. If a cage bow moves down 50 mm the occupant is through it, and nothing in this file would report that: the check that catches it compares two modules and would name body-11 against interior-11, not the head against the roof.',
        'The skin stops at x 0.240 and at |z| 0.210 to 0.230, so there is a strip of canopy with no ceiling under it along both shoulder lines and across the header. Outboard of |z| 0.230 the cage roof rail drops to y 1.2695 and no flat skin can pass it, which is the same edge condition interior-6 published and the same honest answer: the cage lives there and a liner cannot.',
      ],
      explode: [0, 0.55, 0],
    },
    nvh: {
      name: 'NVH package',
      tagline: 'A tandem cabin is a tube, and a tube has axial modes a box does not: the 2.9 m cavity between the windshield and the tail bulkhead resonates at 59 Hz with both occupants on the axis, which is the worst place to sit.',
      mass: 5,
      specs: [
        ['Carried tone', 'drivetrain-9 rear corners, 2,241 Hz at 100 km/h'],
        ['New mode', 'First axial cavity mode 59 Hz over a 2.90 m cabin length'],
        ['Why it matters', 'Both occupants sit ON the axis, at a pressure antinode'],
        ['ANC band', '30 to 300 Hz, four headrest transducers, two per occupant'],
        ['Floor treatment', 'Butyl tiles on the lid at y 0.302, between the rails'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The tone this package was built around carries unchanged from interior-6 and so does the reason it cannot be canceled: drivetrain-9\'s rear corners repeat their radial force ripple 180 times per wheel revolution, which is 2,241 Hz at 100 km/h, and a cancellation zone holds about 10 dB out to a tenth of a wavelength, which at that frequency is 15 mm. Above 300 Hz it is a materials problem and below it is a control problem, and the split is physics rather than taste.\n\nWhat is new is the cavity. A four-seat box is roughly as wide as it is long and its lowest acoustic modes are lateral, at 88 Hz across 1.95 m, and its occupants sit at the lateral nodes where the pressure is lowest. A tandem cabin is 1.20 m wide and about 2.90 m long between the windshield root and the tail bulkhead, so the first axial mode sits at 343 divided by twice 2.90, which is 59 Hz, and it has a pressure ANTINODE at each end and a node in the middle. Both occupants sit on that axis: the front head at x -0.072 and the rear at x -0.887, neither of them at the node. Fifty-nine hertz is squarely inside road-roar territory and squarely inside what ANC can reach, so the answer is control rather than absorption: four transducers, two in each headrest, driven from eight microphones and four accelerometers on the rocker ends. The material budget is 1.4 kg of butyl constrained-layer tile bonded on the lid skin at y 0.3042 in the twelve bays battery-11 leaves between its rails, 1.4 kg of ANC electronics, 0.8 kg of headrest transducers and 1.4 kg of pillar and liner treatment, most of it the perforated lower face of the canopy liner working a second job. Five kilograms against interior-6\'s eight. THE WHEELHOUSE PACKS ARE NOT IN THAT LIST AND NOT IN THE LEDGER, and that is the honest half of this panel: interior-6 books 3.6 kg of barrier and decoupler in the rear wheelhouses, this module drew the same two blocks, and the sweep put them 62.36 mm inside suspension-9\'s rear structure and inside wheels-11\'s master unit. There is no free volume in either wheelhouse on this car. They were deleted from the geometry AND from the mass rather than described, because a module that books mass for absorption it cannot place is the defect tools/twins.sh exists to catch.',
      why: 'interior-6 spent its NVH budget on a frequency the drivetrain radiates, correctly, because in-wheel machines put their ripple inside the cabin\'s near field with one isolation stage. This module keeps all of that and adds the one thing the package changed. Narrowing a cabin does not make it quieter; it makes it a different shape of resonator, and a shape whose lowest mode has an antinode exactly where the heads are is worse than the one it replaced. Naming the 59 Hz rather than letting it be discovered on a prototype is the entire point of writing it down here.',
      fail: [
        'ANC is a feedback system with a stability margin, so a failed microphone is muted rather than trusted, and the honest symptom is a cabin that gets a few decibels louder at 60 Hz with no warning light.',
        'The 59 Hz figure is a rigid-wall estimate on a measured length. The real cavity has a compliant canopy, a tensioned liner and two people in it, all of which move it and none of which are modeled here, so it is a design target rather than a measurement.',
        'battery-11\'s carbon lid is still 5 dB lighter-and-louder than an aluminum floor by the mass law, and constrained-layer tiles address panel resonance rather than mass-law transmission. That debt is inherited from Gen 5 and this module does not pay it.',
        'Absorption is a volume game and this car has no volume: both wheelhouses are full of suspension-9 and wheels-11 and there is no trunk at all. What ships is 5 kg of damping and control with almost no absorber in it, which is a real regression against interior-6, and it is priced at zero here only because nothing was drawn.',
      ],
      explode: [0, -0.35, 0],
    },
    restraints: {
      name: 'Occupant restraint set, re-derived',
      tagline: 'There is no far-side occupant to be thrown into, and the rear occupant faces a seat back rather than a dashboard. Both of interior-6\'s distinctive bags are wrong for this car.',
      mass: 8,
      specs: [
        ['Ancestor', 'interior-6 restraints, 9 kg, 8 bags for four occupants'],
        ['Deleted', 'Center far-side bag, passenger 90 L bag, two curtains'],
        ['New', 'Rear thorax pair from the front seat back, x -0.315'],
        ['Belts', 'Integrated 3-point per seat, all-belt-to-seat, no pillar anchor'],
        ['Load limiter', 'Adaptive, 2.0 to 4.5 kN, switching in 8 ms'],
        ['Maturity', 'Production practice; the seat-back bag pair is pilot line'],
      ],
      how: 'Three of interior-6\'s eight bags do not survive the package and one has to be invented, and re-deriving is cheaper than carrying because each deletion is a different argument. The CENTER BAG goes first. interior-6 fires it from the driver seat\'s inboard bolster to fill the space a missing transmission tunnel left between two occupants in a far-side impact, and a tandem has no second occupant abreast, so the volume it filled is now the foot channel and the seat side structure. The 90 LITER PASSENGER BAG goes with the passenger: there is nobody in front of the fascia on the far side of the cabin. The TWO CURTAINS become one pair covering a 1.20 m greenhouse rather than a 1.88 m one, at 0.7 kg instead of 1.2. What arrives is a pair the four-seat car never needed: the rear occupant at 36 degrees faces the back of the front seat 623 mm from his chest, which is a nearer and harder target than a dashboard at 1.6 m, so two 28 liter thorax bags deploy from the front seat back at x -0.315 between y 0.720 and 0.980, aimed aft and outboard, and they are on this ledger rather than on the seat\'s because interior-6 established that restraint hardware is not trim.\n\nThe frontal geometry is unchanged and still hard. body-11 puts the bumper beam face at x 2.270 with bolted crash rails back to x 1.700 and the front casting filling x 1.445 to 2.070, and this module\'s pedal faces reach x 1.210, so there is 1.06 m between the driver\'s sole and the bumper of which the rails book about 230 mm as usable fold at roughly 120 kN each. What the tandem changes is the second row: the rear occupant is 815 mm further from the crush structure and rides down a pulse that has already been shaped by the front occupant\'s restraint stroke, which is better, and he is 623 mm from a seat back that is decelerating with the car, which is worse. Both belts are all-belt-to-seat with adaptive limiters switching 2.0 to 4.5 kN inside 8 ms on a seat pressure mat classification, because a 1.20 m cabin has no B-pillar geometry worth anchoring an upper loop to. Scope, so nothing is double counted: this ledger carries the bags, inflators, housings, webbing, buckle pretensioners and limiters at 8 kg; the belt REACTION structure is in each seat, which is why both seat ledgers grew.',
      why: 'Carrying a restraint set across a package change is how a center bag ends up firing into a foot channel. Every bag in a car answers a specific geometry question, and this generation changed four of them at once: who is beside the occupant, what is in front of him, how wide the greenhouse is, and how far he is from the crush structure. The only honest response is to ask each question again, and three of the answers came back as deletions, which is the direction that almost never survives a carry.',
      fail: [
        'The seat-back thorax pair is the pilot-line item and it fires from a structure that is itself moving in the pulse, which no production bag does. What has to become true is that a bag mounted on a decelerating seat back deploys into a decelerating occupant with a repeatable relative velocity, and nothing in this file proves that.',
        'All-belt-to-seat with no pillar anchor puts every newton of restraint load into two tracks on one rail pair at |z| 0.2800. It is the standard solution for seats with no pillar beside them and it is a genuine single path, and battery-11\'s potted inserts are now carrying the belt as well as the seat.',
        'The pressure mat classifies mass rather than anatomy, carried from interior-6 unfixed, so an out-of-position occupant gets a limiter level chosen for a nominal posture. A 36 degree recline makes out-of-position MORE likely rather than less, because a reclined occupant submarines under a lap belt more readily than an upright one, and the anti-submarining ramp in each cushion is the mitigation rather than the fix.',
      ],
      explode: [0.15, 0.9, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────

   PARTNER CLEARANCES THAT MOVED GEOMETRY IN THIS MODULE, every one read off
   the partner's BUILT mesh with tools/interfaces.js's own sweep:

   - battery-11 floorlid rails: tops y 0.3080 at |z| 0.2575..0.3025 and
     0.4975..0.5425 over x -0.055..0.695, rear pads x -0.850..-0.750. The
     four seat feet and the two rear beams land ON those and nowhere else.
   - thermal-11 local-circuits cross tube, x 0.655..0.741, crown y 0.353,
     |z| 0.371..0.425. The front seat's side extrusion holds y >= 0.360.
   - thermal-11 glycol-loop riser, x -0.770..-0.701, y 0.347..0.441,
     |z| 0.311..0.420. The rear seat's side extrusion stops at x -0.685.
   - thermal-11 channel panels, inner face |z| 0.5280 over the deck's own
     x span. The seat side extrusion's outer face is |z| 0.3810, so the
     channel is 0.5280 - 0.3810 = 0.1470 m against design/gen11.md's 158.
     Both halves are BUILT and both are swept. The rear footwell deck the
     heel lands on is a wing off this module's own beam at y 0.3800, because
     a foot on the lid at 0.3020 is 49.53 mm inside thermal-11's local
     circuits and a foot on the deck crosses nothing.
   - autonomy-11 ring, y 0.3580..0.3720, |z| up to 0.5005 the length of the
     foot channel. The deck's underside holds y >= 0.3740, which is 2.0 mm
     and is the tightest clearance in this module.
   - thermal-11 recovery-core, x 0.8000..0.9990 at |z| 0.3000..0.4200 on the
     passenger side and x 0.4547..0.8453 at y 0.4508..0.5580 on the driver
     side. The deck stops at x 0.7900 and the seat fail list carries the
     occupant intrusion this one still causes.
   - thermal-11 air-handler, x 0.7860..1.0050, y 0.5560..0.8960, |z| 0.2630,
     with its crown only reaching |z| 0.2071 and only y 0.8200 outboard of
     that. The hand wheel's mount tubes run in the lane over it, 26.4 mm
     clear at their nearest.
   - body-11 cage cowl cross member, x 0.9640..1.0160, crown y 0.8960 at
     x 0.990 falling to 0.8845 at 0.970 and 1.010, constant from |z| 0.180
     to 0.280. The hand wheel's two shoes seat on it plus 1.0 mm of shim.
   - body-11 cage cowl ring, x 0.926..1.022. The fascia holds x >= 1.020.
   - body-11 cage bows, soffit y 1.2990 at x 0.300 and -1.100. The liner
     runs 1.0 mm UNDER all three at a constant y 1.2980, flat out to
     |z| 0.097 so the head-box corners get the same 50.1 mm as its center.
   - hv-11 zone-drops, x 0.941..1.054, y 0.594..0.948, |z| 0.427. The fascia
     stays aft of x 1.020 and inboard of |z| 0.400.
   - autonomy-11 dms at (0.9371..1.0100, 0.8970..0.9644, |z| 0.0280), on the
     same cage cross member the hand wheel's shoes land on but 200 mm inboard
     of them: 191.0 mm between the two assemblies, the loosest joint in this
     bay and the reason the mount could go where it went.

   WHAT IS NOT HERE, and each absence is a decision:
   - NO CABIN FLOOR. battery-11's lid IS the floor, exactly as interior-6
     said and exactly as design/gen11.md section 5 insists.
   - NO CENTER CONSOLE. A console is furniture between two people sitting
     side by side. There is nobody beside anybody, and the volume it would
     occupy is the two foot channels.
   - NO DOOR CARDS and NO SILL TRIM, both carried as open from interior-6.
     thermal-11's rocker-shoulder extract still declares an aperture through
     a sill trim that no interior module on this ladder draws.                */

/* Axis-aligned box placed in world coordinates. */
function abox(w, h, d, mat, x, y, z, rz = 0) {
  const b = lib.box(w, h, d, mat);
  b.position.set(x, y, z);
  if (rz) b.rotation.z = rz;
  return b;
}

/* The same with all twelve edges chamfered: 44 triangles against 12, and it
   is most of the difference between a molding and a rectangle. */
function cbox(w, h, d, c, mat, x, y, z, rz = 0) {
  const b = lib.cbox(w, h, d, c, mat);
  b.position.set(x, y, z);
  if (rz) b.rotation.z = rz;
  return b;
}

/* Cylinder with its axis along Z. */
function zcyl(r, h, mat, seg = 16) {
  const c = lib.cyl(r, h, mat, seg);
  c.rotation.x = Math.PI / 2;
  return c;
}

/* Column k of every section: the boundary curve a loft leaves open. */
function edge(secs, k) { return secs.map((s) => s[k]); }

/* Close the open boundary between two lofted skins with a rolled seam. Every
   intermediate point is a per-axis blend of the pair it spans, so the strip
   lies inside the box those two curves already occupy and cannot move an
   envelope. Carried from interior-6, including the reason only Z is held
   out near the face curve: holding Y out as well collapses on a cushion,
   where the two skins are separated by height rather than by depth. */
function seamStrip(faceEdge, backEdge, mat, w1 = [0.70, 0.70, 0.94], w2 = [0.26, 0.26, 0.94]) {
  const mix = (a, b, w) => [
    a[0] * w[0] + b[0] * (1 - w[0]),
    a[1] * w[1] + b[1] * (1 - w[1]),
    a[2] * w[2] + b[2] * (1 - w[2]),
  ];
  const secs = faceEdge.map((a, i) => [a, mix(a, backEdge[i], w1), mix(a, backEdge[i], w2), backEdge[i]]);
  return lib.crease(lib.loft(secs, mat), 30);
}

/* An upholstered or molded panel: linear interpolation, grooves for the
   stitch lines, and a crease pass. Carried from interior-6 with its rule
   intact, that interpolation stays linear because every clearance this
   module publishes was audited off the built surface. */
function trim(sections, mat, grooves, deg = 45) {
  const grid = lib.loftGrid(sections, { interp: 'linear', grooves });
  return lib.crease(lib.loftMesh(grid, mat, {}), deg);
}

/* A dash air vent: bezel, four directional vanes in a real throat, and the
   thumbwheel that aims them. Built facing aft. crossZ seats the vane family
   behind the bezel's own aft face rather than proud of the fascia, which is
   the defect interior-6's detail pass found and fixed. */
function vent(x, y, z) {
  const g = new THREE.Group();
  g.add(lib.grille(0.046, 0.022, 0.016, M.plasticLt, {
    bars: 0, cross: 4, barW: 0.0024, chamfer: 0.0006, frame: 0.0042,
    crossZ: -0.0025,
  }));
  const wheel = lib.cyl(0.0052, 0.009, M.darkSteel, 8);
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0.028, -0.016, 0.004);
  g.add(wheel);
  g.rotation.y = -Math.PI / 2;
  g.position.set(x, y, z);
  return g;
}

/* Seat belt webbing: a rectangular section swept down a run, turning its
   flat face onto the body it restrains and tapering into each anchor.
   Carried from interior-6, including `flat` for a run that lies down. */
function webbing(points, width, thick, mat, toward, taper = 0.6, flat = false) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const N = 12;
  const T = new THREE.Vector3(), W = new THREE.Vector3(), Nv = new THREE.Vector3();
  const secs = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const p = curve.getPoint(t);
    T.copy(curve.getTangent(t)).normalize();
    Nv.set(p.x - toward[0], flat ? p.y - toward[1] : 0, p.z - toward[2]);
    if (Nv.lengthSq() < 1e-9) Nv.set(1, 0, 0);
    Nv.normalize();
    W.crossVectors(T, Nv).normalize();
    Nv.crossVectors(W, T).normalize();
    const g = taper + (1 - taper) * Math.sin(Math.PI * t);
    const hw = (width / 2) * g, ht = thick / 2;
    secs.push([
      [p.x + W.x * hw + Nv.x * ht, p.y + W.y * hw + Nv.y * ht, p.z + W.z * hw + Nv.z * ht],
      [p.x - W.x * hw + Nv.x * ht, p.y - W.y * hw + Nv.y * ht, p.z - W.z * hw + Nv.z * ht],
      [p.x - W.x * hw - Nv.x * ht, p.y - W.y * hw - Nv.y * ht, p.z - W.z * hw - Nv.z * ht],
      [p.x + W.x * hw - Nv.x * ht, p.y + W.y * hw - Nv.y * ht, p.z + W.z * hw - Nv.z * ht],
    ]);
  }
  return lib.crease(lib.loft(secs, mat, true), 40);
}

/* ── seat tables ───────────────────────────────────────────────────────────

   Both seats are generated from ONE pair of tables so the two can never
   drift apart, which is the failure design/retro-gen9.md calls a dimension
   in one module that is secretly a function of another's envelope. Here it
   would be a dimension in one SEAT that is secretly a function of the other
   seat's, since the rear occupant's knees clear the front seat's back.

   CUSHION rows are [dx from the H-point, y, half-width, lift]. The bight
   sits at dx -0.080, which is where tools/occupant.js expects to find it,
   and the front lip at +0.355, 100 mm short of a 95th percentile knee.

   BACKREST rows are [y, half-width, wing]. x comes from backX() so the
   36.000 degree face angle is generated rather than tabulated. The two rows
   at y 0.510 and 0.620 carry the KNEE RECESS: half-width 0.1850 against
   0.2500 elsewhere, which is the 130 mm band the rear occupant's knees
   occupy at this pitch.                                                     */
const CUSHION = [
  /* dx from the H-point, face y, half-width, bolster lift, pan depth */
  [0.355, CUSH - 0.018, 0.222, 0.030, 0.082],
  [0.270, CUSH + 0.002, 0.243, 0.048, 0.082],
  [0.170, CUSH + 0.006, 0.250, 0.055, 0.082],
  [0.060, CUSH + 0.002, 0.250, 0.055, 0.082],
  [-0.020, CUSH - 0.002, 0.244, 0.048, 0.082],
  [-0.080, CUSH - 0.008, 0.232, 0.036, 0.082],
];

/* THE REAR CUSHION IS NOT STEPPED, AND THE STEP THAT USED TO BE HERE IS THE
   MOST EXPENSIVE THING THIS MODULE HAS DELETED.

   An earlier draft carried a second table, CUSHION_R, that lifted the rear
   0.132 m of the rear pan by 42 mm to clear `autonomy-10`'s triplex compute
   stack at x -0.762 to -0.338, y 0.389 to 0.460, |z| 0.152. Two things were
   wrong with it and only the second one was obvious.

   The stack is not there any more. `autonomy-11` is the Gen 11 partner and it
   moved the cold plate to the tail deck, x -1.5262 to -1.1710 hanging under
   body-11's cant rail at y 0.6745 to 0.7511, for exactly the reason this seat
   would have given it: on a tandem there is no under-the-rear-seat. Rayed down
   at 5 mm over x -0.95 to -0.15, |z| under 0.32, the only partner material
   left beneath this cushion is `battery-11/floorlid` topping out at y 0.3080
   and `suspension-9/chassis-ecu` at x -0.875 to -0.844, both of them below the
   flat pan's own underside of 0.3520. The step was clearing an obstacle that
   the generation had already moved, measured against a module the preset does
   not build.

   And the step cost the whole head-clearance claim. It put the built cushion
   top at 0.4892 under the declared H-point rather than the 0.4520 this
   module's own spec row and design/gen11.md section 5 both book, so the real
   H-point was 0.4442, the crown rose 37.2 mm with it, and 50.1 mm of head
   clearance was really 12.8. `tools/occupant.sh` caught the same fault from
   the other end and said so in one line: 83.5 mm of sink under a declared hip,
   where a cushion gives about 45. A declaration and a geometry that disagree
   are one defect, not two, and the fix is one table.

   So both seats now run off CUSHION, the pan is design/gen11.md's 150 mm, and
   the sink is measured rather than asserted.                                  */
const BACKREST = [
  [0.470, 0.230, 0.010],
  [0.510, 0.185, 0.008],
  [0.620, 0.185, 0.008],
  [0.700, 0.245, 0.030],
  [0.830, 0.250, 0.055],
  [0.960, 0.238, 0.060],
  [1.060, 0.196, 0.040],
];

/* One cross-car row of a seat surface. `hw` is the half-width, `wing` lifts
   or pulls the outer points to make a bolster. */
function seatRow(ax, ay, hw, wing) {
  const f = [-1, -0.74, -0.34, 0, 0.34, 0.74, 1];
  const w = [1, 0.55, 0.08, 0, 0.08, 0.55, 1];
  return f.map((t, i) => [ax, ay + wing * w[i], t * hw]);
}
function backRow(hx, y, hw, wing) {
  const f = [-1, -0.74, -0.34, 0, 0.34, 0.74, 1];
  const w = [1, 0.55, 0.08, 0, 0.08, 0.55, 1];
  return f.map((t, i) => [backX(hx, y) + wing * w[i], y, t * hw]);
}

const XSPAN = { span: [0.35, 5.65], runout: 0.30 };
const CUSHION_SEAMS = [
  { col: 2, width: 0.008, depth: 0.006 },
  { col: 4, width: 0.008, depth: 0.006 },
];
const BACK_SEAMS = [
  { col: 2, width: 0.008, depth: 0.006 },
  { col: 4, width: 0.008, depth: 0.006 },
  { row: 3, width: 0.007, depth: 0.005, ...XSPAN },
  { row: 5, width: 0.007, depth: 0.005, ...XSPAN },
];

/* ── one tandem seat ───────────────────────────────────────────────────────
   hx        H-point x
   feet      [x, x] of the two track landings on battery-11's inner rails
   sideX     [x0, x1] span of the side-impact extrusion
   headY     headrest top
   front     the forward seat carries the rear repeater and the rear bags    */
function buildSeat(g, hx, feet, sideX, front) {
  const TBL = CUSHION;   /* ONE table, both seats: see the note above CUSHION */
  /* cushion face */
  const cushSecs = TBL.map((r) => seatRow(hx + r[0], r[1], r[2], r[3]));
  g.add(trim(cushSecs, M.fabric, CUSHION_SEAMS, 42));

  /* cushion pan under it: same plan, dropped, so the cushion is a solid */
  const panSecs = TBL.map((r) => seatRow(hx + r[0], r[1] - r[4], r[2] - 0.006, r[3] * 0.3));
  g.add(lib.crease(lib.loft(panSecs, M.alu), 40));
  for (let k = 0; k <= 6; k += 6) {
    g.add(seamStrip(edge(cushSecs, k), edge(panSecs, k), M.fabric));
  }
  g.add(seamStrip(cushSecs[0], panSecs[0], M.fabric));
  g.add(seamStrip(cushSecs[cushSecs.length - 1], panSecs[panSecs.length - 1], M.fabric));

  /* backrest face and shell */
  const backSecs = BACKREST.map((r) => backRow(hx, r[0], r[1], r[2]));
  g.add(trim(backSecs, M.fabric, BACK_SEAMS, 42));
  const shellSecs = BACKREST.map((r) => {
    const row = backRow(hx, r[0], r[1] - 0.004, r[2] * 0.25);
    return row.map((p) => [p[0] - 0.106, p[1], p[2]]);
  });
  g.add(lib.crease(lib.loft(shellSecs, M.alu), 40));
  for (let k = 0; k <= 6; k += 6) {
    g.add(seamStrip(edge(backSecs, k), edge(shellSecs, k), M.fabric));
  }
  g.add(seamStrip(backSecs[0], shellSecs[0], M.fabric));
  g.add(seamStrip(backSecs[6], shellSecs[6], M.fabric));

  /* headrest: top at y 1.2600, 40 mm under the liner soffit and 12 mm over
     the occupant's own crown at 1.2479. interior-6 put this 11.4 mm ABOVE
     its own ceiling and that is the defect this generation exists to fix. */
  const hy = 1.1600, hTop = 1.2600;
  const hx0 = backX(hx, hy) - 0.020;
  g.add(cbox(0.090, hTop - hy, 0.230, 0.016, M.fabric, hx0 - 0.045, (hy + hTop) / 2, 0));
  for (const s of [-1, 1]) {
    g.add(abox(0.014, 0.070, 0.014, M.darkSteel, hx0 - 0.030, hy - 0.030, s * 0.072));
  }

  /* THE REAR FOOTWELL DECK, on the front seat only, because it is a wing off
     the front seat's side beam and it is the floor the REAR occupant's heel
     lands on. Its top face is y 0.3800, 78 mm above the pack lid rather than
     on it, and that height is measured against the modules a gen11 preset
     actually builds rather than against an earlier rung.

     A shod 95th percentile foot, 0.287 by 0.073 by 0.120, was placed at
     |z| 0.4505 and swept with tools/interfaces.js against all nine:

       sole on the lid at y 0.3020    thermal-11/local-circuits 49.53 mm,
                                      autonomy-11/ring 30.36, battery-11's own
                                      outer lid rail 13.00, thermal-11/
                                      glycol-loop 17.92 on the driver side
       sole on the nvh tile at 0.3062 the same four, worst 49.55 mm
       sole on this deck at 0.3800    CLEAR, both sides, x 0.450 to 0.737

     So the deck is what makes the channel a channel. It cantilevers off the
     side extrusion rather than standing on the lid for the same reason: the
     78 mm under it is where five modules route.

     THE DECK REACHES BACK TO x 0.1700 AND CLOSES ACROSS THE CAR, which an
     earlier draft did not do, and the cross member is the part that matters.
     Two 139 mm treads cantilevered off two beams are two springs; tying them
     across the car turns the pair into a closed section and gives the rear
     footwell ONE floor plane instead of two ledges. It is also the plane
     tools/occupant.sh measures: the tool fires a single ray down the
     centerline at x 0.2100 to find the floor the heel lands on, and with
     nothing there it found the 4 mm NVH tile at y 0.3062 and put the rear
     heel 78 mm below the deck the design gives it. The cross member is at
     x 0.1700 to 0.2500 because that is where the deck ends, and the ray lands
     on it because the floor is genuinely there.

     Swept against every gen11 partner, the cross member at x 0.1700 to
     0.2500, y 0.3740 to 0.3800, |z| under 0.5200 is CLEAR: nothing crosses
     it at all. */
  if (front) {
    for (const s of [-1, 1]) {
      /* 6 mm plate, top face y 0.3800, and NOTHING stands on it: a 3 mm
         grip rib was drawn and deleted because autonomy-11's 48 V ring runs
         2.0 mm under the plate's own underside and a rib would have to come
         off the top of a plate that is already the thinnest thing here. */
      g.add(abox(0.620, 0.006, CHANRAILZ - SEATZ, M.alu, 0.480, 0.3770,
        s * (SEATZ + CHANRAILZ) / 2));
    }
    /* The cross member: same plate, same plane, closing the two treads. It
       runs THROUGH both side beams, whose own footprint is |z| 0.3450 to
       0.3810 over y 0.3600 to 0.6200, so the tie is picked up in the beam's
       shear plane rather than bonded to its skin. */
    g.add(abox(0.080, 0.006, 2 * CHANRAILZ, M.alu, 0.210, 0.3770, 0));
  }

  /* side-impact extrusion, the part of this seat with no ancestor */
  for (const s of [-1, 1]) {
    const zc = s * (SEATZ + 0.3450) / 2, zt = SEATZ - 0.3450;
    g.add(abox(sideX[1] - sideX[0], 0.260, zt, M.alu, (sideX[0] + sideX[1]) / 2, 0.490, zc));
    /* three ribs tying the extrusion back into the shell */
    for (let i = 0; i < 3; i++) {
      const rx = sideX[0] + (sideX[1] - sideX[0]) * (0.16 + 0.34 * i);
      g.add(abox(0.020, 0.180, 0.088, M.alu, rx, 0.470, s * 0.2960));
    }
  }

  /* tracks and feet, landing on battery-11's inner rails at |z| 0.2800 */
  for (const s of [-1, 1]) {
    g.add(abox(feet[1] - feet[0] + 0.070, 0.026, 0.040, M.darkSteel,
      (feet[0] + feet[1]) / 2, 0.3350, s * RAILZ));
    for (const fx of feet) {
      g.add(abox(0.048, 0.014, 0.040, M.steel, fx, 0.3150, s * RAILZ));
      g.add(abox(0.030, 0.086, 0.030, M.alu, fx, 0.3900, s * RAILZ));
    }
    /* recliner discs at the backrest root */
    const rc = lib.cyl(0.046, 0.020, M.steel, 18);
    rc.rotation.x = Math.PI / 2;
    rc.position.set(backX(hx, 0.470) - 0.030, 0.470, s * 0.2440);
    g.add(rc);
  }

  /* posture cells under the cushion face, visible in x-ray */
  const cellStep = front ? 0.105 : 0.080;
  for (let i = 0; i < (front ? 4 : 3); i++) {
    const cx = hx + 0.285 - i * cellStep;
    for (const s of [-1, 1]) {
      g.add(cbox(0.078, 0.026, 0.088, 0.008, M.rubber, cx, CUSH - 0.048, s * 0.108));
    }
  }
  /* and up the lumbar line */
  for (let i = 0; i < 3; i++) {
    const y = 0.560 + i * 0.130;
    g.add(cbox(0.026, 0.090, 0.190, 0.008, M.rubber, backX(hx, y) - 0.048, y, 0));
  }

  if (front) {
    /* rear-facing repeater strip let into the back shell */
    g.add(abox(0.008, 0.026, 0.110, M.lamp, backX(hx, 0.900) - 0.092, 0.900, 0));
  }
}

export function build() {
  const sys = new THREE.Group();

  /* ── dashboard ────────────────────────────────────────────────────────── */
  const dash = lib.part('dashboard', [0.55, 0.35, 0]);
  {
    /* cowl beam: 96 mm tube between cage feet at |z| 0.500 */
    const beam = zcyl(0.048, 1.000, M.alu, 20);
    beam.position.set(1.078, 0.740, 0);
    dash.add(beam);
    for (const s of [-1, 1]) {
      dash.add(abox(0.100, 0.150, 0.024, M.castAlu, 1.078, 0.690, s * 0.5140));
      dash.add(lib.bolts(4, 0.038, 0.008, M.steel).translateX(1.078).translateY(0.690));
    }
    /* fascia: a lofted sandwich from the beam up to the screen root */
    const rows = [];
    const R = [[1.046, 0.790, 0.372], [1.058, 0.880, 0.380], [1.078, 0.952, 0.372],
               [1.120, 1.008, 0.346], [1.186, 1.042, 0.308], [1.246, 1.050, 0.270]];
    for (const [x, y, hw] of R) {
      const f = [-1, -0.7, -0.35, 0, 0.35, 0.7, 1];
      rows.push(f.map((t) => [x, y - 0.010 * t * t, t * hw]));
    }
    dash.add(lib.crease(lib.loft(rows, M.plastic), 40));
    /* the pad's lower closing skin */
    const rows2 = rows.map((r) => r.map((p) => [p[0] - 0.026, p[1] - 0.030, p[2] * 0.96]));
    dash.add(lib.crease(lib.loft(rows2, M.plasticLt), 40));
    dash.add(seamStrip(rows[0], rows2[0], M.plastic));
    dash.add(seamStrip(rows[5], rows2[5], M.plastic));
    for (const k of [0, 6]) dash.add(seamStrip(edge(rows, k), edge(rows2, k), M.plastic));
    /* four vents on the fascia */
    for (const z of [-0.300, -0.170, 0.170, 0.300]) dash.add(vent(1.050, 0.830, z));
    /* supply plenum landing on thermal-11's air handler top face */
    for (const z of [-0.120, 0.120]) {
      dash.add(abox(0.130, 0.048, 0.086, M.plasticLt, 1.076, 0.930, z));
      const dp = lib.tube([[1.038, 0.930, z], [1.048, 0.918, z], [1.048, 0.880, z]], 0.026, M.plasticLt);
      dash.add(dp);
    }
    /* glove bin */
    dash.add(cbox(0.160, 0.100, 0.280, 0.010, M.plasticLt, 1.150, 0.850, 0));
  }
  sys.add(dash);

  /* ── displays ─────────────────────────────────────────────────────────── */
  const disp = lib.part('displays', [0.62, 0.6, 0]);
  {
    const scr = abox(0.010, 0.170, 0.360, M.lamp, 1.062, 0.905, 0);
    scr.rotation.z = -0.20;
    disp.add(scr);
    disp.add(abox(0.016, 0.190, 0.380, M.darkSteel, 1.054, 0.905, 0, -0.20));
    /* the handover band across the fascia aft edge */
    disp.add(abox(0.008, 0.014, 0.700, M.lamp, 1.062, 0.786, 0));
    disp.add(abox(0.014, 0.024, 0.712, M.plastic, 1.056, 0.786, 0));
  }
  sys.add(disp);

  /* ── hand wheel ───────────────────────────────────────────────────────── */
  const wheelP = lib.part('wheel', [0.45, 0.15, 0]);
  {
    const rim = lib.torus(0.175, 0.019, M.rubber, 28, 10);
    rim.rotation.y = Math.PI / 2;
    rim.rotation.x = -0.28;
    rim.position.set(0.680, 0.870, 0);
    wheelP.add(rim);
    /* flat-bottom chord */
    const chord = zcyl(0.019, 0.190, M.rubber, 10);
    chord.rotation.y = 0;
    chord.position.set(0.706, 0.722, 0);
    wheelP.add(chord);
    for (const s of [-1, 1]) {
      const spoke = abox(0.030, 0.020, 0.150, M.alu, 0.700, 0.862, s * 0.090);
      spoke.rotation.z = -0.28;
      wheelP.add(spoke);
    }
    /* hub and feel machine */
    const hub = zcyl(0.052, 0.070, M.darkSteel, 20);
    hub.position.set(0.692, 0.870, 0);
    wheelP.add(hub);
    const mot = zcyl(0.070, 0.108, M.steel, 22);
    mot.position.set(0.638, 0.870, 0);
    wheelP.add(mot);
    /* the closing plate on the aft end of the machine */
    wheelP.add(abox(0.026, 0.120, 0.120, M.castAlu, 0.556, 0.870, 0));

    /* ── THE MOUNT, WHICH THIS PART DID NOT HAVE ──────────────────────────
       An earlier draft ended the steering in a cast post at (0.520, 0.780)
       hanging in mid air, and tools/check-interfaces.sh said so exactly:
       "interior-11/wheel instance at (x 0.623, y 0.870, z 0.000), 11 meshes",
       nearest other surface 52.6 mm away. It was the first floating instance
       in an interior on this ladder and every one of the thirteen HANDOFF.md
       records is in an autonomy module.

       A car with no column still needs a feel unit mount, and the place it
       goes is the cowl. body-11 carries a cross member there, ray-swept at
       10 mm: a constant rounded section at x 0.9640 to 1.0160 whose crown is
       y 0.8960 at x 0.990, 0.8919 at 0.980 and 1.000, and 0.8845 at 0.970 and
       1.010, unchanged at every |z| from 0.180 to 0.280. autonomy-11 lands
       its driver monitor on the same member 200 mm inboard.

       THE ROUTE IS OUTBOARD BECAUSE THE CENTERLINE IS FULL, and that was
       measured rather than assumed. Between the machine and the cowl the
       corridor carries thermal-11's air handler at x 0.7860 to 1.0050 up to
       y 0.8960, thermal-11's recovery core, body-11's own cage and hv-11's
       zone drops. Rayed down at |z| 0.2200 to 0.2500, the highest partner
       surface anywhere from x 0.700 to 0.960 is the air handler at y 0.8200,
       because the case's 0.8960 crown only reaches |z| 0.2104. That is the
       lane, it is 76 mm deep, and it exists on BOTH sides at the same |z|,
       so the mount stays symmetric and the two hands still see identical
       structure.

       Each shoe seats on the crown plus 1.0 mm of shim rather than on a fit,
       which is autonomy-11's lesson on this same member: a flat pad laid on a
       rounded section touches at one point and floats everywhere else. */
    const SHOE_X = 0.990, SHOE_Z = 0.2350, CROWN = 0.8960;
    for (const s of [-1, 1]) {
      /* shoe: 48 mm of pad over a crown that falls 11.5 mm across it */
      wheelP.add(abox(0.048, 0.010, 0.032, M.castAlu, SHOE_X, CROWN + 0.0060, s * SHOE_Z));
      for (const dx of [-0.016, 0.016]) {
        const sc = lib.cyl(0.0030, 0.010, M.steel, 10);
        sc.position.set(SHOE_X + dx, CROWN + 0.0110, s * SHOE_Z);
        wheelP.add(sc);
      }
      /* the support tube: machine end face, out and forward into the lane,
         then straight to the shoe. Its underside stays at y 0.9040 from
         x 0.880 forward, 84 mm over the air handler and 8 mm over the crown
         it lands on. */
      wheelP.add(lib.tube([
        [0.6460, 0.8760, s * 0.0620],
        [0.7000, 0.8900, s * 0.1400],
        [0.7700, 0.9060, s * 0.2050],
        [0.8800, 0.9180, s * SHOE_Z],
        [0.9900, 0.9180, s * SHOE_Z],
      ], 0.0140, M.castAlu, false, 12));
      /* the trunnion that picks the tube up off the machine end face */
      wheelP.add(abox(0.070, 0.070, 0.014, M.castAlu, 0.6380, 0.8760, s * 0.0610));
    }
    /* three sensor ring segments on the hub face */
    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3;
      wheelP.add(abox(0.010, 0.030, 0.030, M.pcb, 0.720,
        0.870 + 0.038 * Math.cos(a), 0.038 * Math.sin(a)));
    }
  }
  sys.add(wheelP);

  /* ── front seat ───────────────────────────────────────────────────────── */
  const fs = lib.part('front-seats', [0.35, 0.4, 0]);
  buildSeat(fs, HIPF, [0.100, 0.640], [0.050, 0.720], true);
  sys.add(fs);

  /* ── rear seat ────────────────────────────────────────────────────────── */
  const rs = lib.part('rear-seat-cushion', [-0.25, 0.45, 0]);
  buildSeat(rs, HIPR, [-0.800, -0.030], [-0.685, -0.120], false);
  {
    /* the two long beams that bridge the 0.695 m of flat lid between
       battery-11's rails and its rear pads */
    for (const s of [-1, 1]) {
      rs.add(abox(0.790, 0.034, 0.036, M.alu, -0.415, 0.3520, s * RAILZ));
    }
  }
  sys.add(rs);

  /* ── luggage ──────────────────────────────────────────────────────────── */
  const lug = lib.part('luggage', [-0.5, 0.35, 0]);
  {
    /* tail locker: 61 L in the only measured void behind the rear headrest */
    const x0 = -1.390, x1 = -1.150, y0 = 0.780, y1 = 1.100, hz = 0.400;
    lug.add(abox(x1 - x0, 0.010, 2 * hz, M.carbon, (x0 + x1) / 2, y0, 0));
    lug.add(abox(0.010, y1 - y0, 2 * hz, M.carbon, x0, (y0 + y1) / 2, 0));
    for (const s of [-1, 1]) {
      lug.add(abox(x1 - x0, y1 - y0, 0.010, M.carbon, (x0 + x1) / 2, (y0 + y1) / 2, s * hz));
    }
    const lid = abox(x1 - x0, 0.012, 2 * hz - 0.020, M.plasticLt, (x0 + x1) / 2, y1, 0);
    lid.rotation.z = 0.06;
    lug.add(lid);
    for (const s of [-1, 1]) lug.add(abox(0.040, 0.020, 0.020, M.darkSteel, x1 - 0.030, y1 - 0.012, s * 0.300));
  }
  sys.add(lug);

  /* ── pedals ───────────────────────────────────────────────────────────── */
  const ped = lib.part('pedals', [0.35, -0.18, 0]);
  {
    /* the box that hangs off the cowl beam; no floor pedestal exists */
    ped.add(abox(0.120, 0.062, 0.290, M.castAlu, 1.200, 0.734, 0));
    ped.add(abox(0.130, 0.026, 0.040, M.castAlu, 1.140, 0.752, 0));
    for (const s of [-1, 1]) {
      ped.add(abox(0.024, 0.086, 0.030, M.castAlu, 1.176, 0.756, s * 0.120));
    }
    for (const [z, w] of [[-0.120, 0.100], [0.120, 0.100]]) {
      const arm = abox(0.020, 0.140, 0.030, M.alu, 1.196, 0.636, z);
      arm.rotation.z = 0.16;
      ped.add(arm);
      const face = abox(0.016, 0.120, w, M.darkSteel, 1.212, 0.556, z);
      face.rotation.z = 0.16;
      ped.add(face);
      ped.add(abox(0.012, 0.110, w - 0.014, M.rubber, 1.222, 0.554, z, 0.16));
    }
    /* two simulator elements in parallel, and the triple position pack */
    for (const s of [-1, 1]) {
      const sp = lib.spring(0.020, 0.076, 6, 0.0035, M.steel);
      sp.rotation.z = Math.PI / 2;
      sp.position.set(1.182, 0.688, -0.120 + s * 0.026);
      ped.add(sp);
    }
    ped.add(cbox(0.050, 0.040, 0.048, 0.006, M.pcb, 1.164, 0.716, -0.056));
  }
  sys.add(ped);

  /* ── canopy liner ─────────────────────────────────────────────────────── */
  const lin = lib.part('canopy-liner', [0, 0.55, 0]);
  {
    /* THE FIX: body-11's three cage bow soffits are y 1.2990 and this skin
       is flat at y 1.2980, 1.0 mm under them, rather than 58 mm under the
       roof the way interior-6's formed shell hangs.
       Stations run x 0.240 to -1.060, inboard of the forward and aft bows. */
    const ST = [
      [0.240, LINER, 0.210],
      [0.100, LINER, 0.220],
      [-0.140, LINER, 0.230],
      [-0.420, LINER, 0.230],
      [-0.700, LINER, 0.230],
      [-0.920, LINER, 0.220],
      [-1.060, LINER, 0.210],
    ];
    const rows = ST.map(([x, y, hw]) => {
      /* the |t| 0.46 column lands at |z| 0.097 at the narrowest station,
         outboard of a 95th percentile head's 0.0825 half-breadth */
      const f = [-1, -0.78, -0.46, 0, 0.46, 0.78, 1];
      /* FLAT over the head corridor: the drop starts outboard of |t| 0.36,
         which is |z| 0.083, the half-breadth of a 95th percentile head. */
      const d = [0.026, 0.011, 0.000, 0, 0.000, 0.011, 0.026];
      return f.map((t, i) => [x, y - d[i], t * hw]);
    });
    lin.add(lib.crease(lib.loft(rows, M.fabric), 40));
    /* the tension frame: two longerons and the two bow clip rails */
    for (const s of [-1, 1]) {
      const lon = lib.tube(ST.map(([x, y, hw]) => [x, y - 0.034, s * hw]), 0.009, M.alu);
      lin.add(lon);
    }
    for (const x of [0.250, -1.070]) {
      lin.add(abox(0.028, 0.008, 0.380, M.alu, x, 1.3040, 0));
      for (const s of [-1, 1]) lin.add(abox(0.026, 0.018, 0.024, M.darkSteel, x, 1.3060, s * 0.150));
    }
    /* two ceiling lights and the swept-cavity extract collar */
    for (const x of [-0.060, -0.860]) {
      /* recessed ABOVE the skin: a lamp hanging below it would spend head
         clearance, which is the exact mistake this part exists to undo */
      lin.add(abox(0.070, 0.006, 0.130, M.lamp, x, 1.3015, 0));
    }
    const col = lib.tube([[-1.000, 1.2880, 0.140], [-1.024, 1.2740, 0.180],
                          [-1.040, 1.2400, 0.200]], 0.022, M.plasticLt);
    lin.add(col);
  }
  sys.add(lin);

  /* ── NVH ──────────────────────────────────────────────────────────────── */
  const nvh = lib.part('nvh', [0, -0.35, 0]);
  {
    /* butyl tiles bonded on the lid skin at y 0.3020, in the bays
       battery-11's own rails leave: |z| 0.000..0.2575 and 0.3025..0.4975 */
    for (const [zc, zw] of [[0, 0.470], [0.395, 0.150], [-0.395, 0.150]]) {
      for (let i = 0; i < 4; i++) {
        nvh.add(abox(0.300, 0.004, zw, M.rubber, -0.720 + i * 0.340, 0.3042, zc));
      }
    }
    /* four headrest transducers, two per occupant */
    for (const hx of [HIPF, HIPR]) {
      for (const s of [-1, 1]) {
        const t = zcyl(0.028, 0.026, M.darkSteel, 14);
        t.position.set(backX(hx, 1.190) - 0.118, 1.190, s * 0.086);
        nvh.add(t);
      }
    }
    /* four accelerometers on the rocker ends, inboard of the pack sill */
    for (const s of [-1, 1]) {
      for (const x of [0.900, -1.000]) {
        nvh.add(abox(0.024, 0.016, 0.024, M.pcb, x, 0.5000, s * 0.5760));
      }
    }
    /* eight microphones on the liner longeron line */
    for (const x of [0.180, -0.140, -0.560, -0.940]) {
      for (const s of [-1, 1]) {
        nvh.add(abox(0.016, 0.010, 0.016, M.pcb, x, 1.2680, s * 0.240));
      }
    }
  }
  sys.add(nvh);

  /* ── restraints ───────────────────────────────────────────────────────── */
  const res = lib.part('restraints', [0.15, 0.9, 0]);
  {
    for (const hx of [HIPF, HIPR]) {
      /* One cushion height, both seats. The rear lap run used to sit 42 mm
         higher on a stepped pan that no longer exists; see the note above
         CUSHION for why the step went. */
      const CY = CUSH;
      /* all-belt-to-seat: upper loop on the seat's own shoulder tower */
      const up = [backX(hx, 1.030) - 0.070, 1.030, -0.196];
      const lapL = [hx - 0.030, CY - 0.010, -0.246];
      const lapR = [hx - 0.030, CY - 0.010, 0.246];
      const buckle = [hx + 0.060, CY + 0.010, 0.150];
      res.add(webbing([up, [up[0] + 0.090, 0.860, -0.150], [hx - 0.010, 0.560, -0.030], buckle],
        0.046, 0.0012, M.fabric, [hx - 0.20, 0.70, 0], 0.62));
      res.add(webbing([lapL, [hx + 0.020, CY + 0.004, -0.140], buckle],
        0.046, 0.0012, M.fabric, [hx, CY - 0.30, 0], 0.62, true));
      res.add(webbing([buckle, [hx + 0.030, CY + 0.006, 0.200], lapR],
        0.046, 0.0012, M.fabric, [hx, CY - 0.30, 0], 0.62, true));
      /* retractor and adaptive limiter on the tower, buckle stalk */
      res.add(cbox(0.086, 0.100, 0.062, 0.010, M.darkSteel, backX(hx, 0.960) - 0.100, 0.960, -0.196));
      res.add(abox(0.030, 0.060, 0.026, M.steel, buckle[0], buckle[1] - 0.014, buckle[2]));
      /* two thorax bags in the seat side structure */
      for (const s of [-1, 1]) {
        res.add(cbox(0.230, 0.060, 0.030, 0.008, M.plastic, hx - 0.040, 0.620, s * 0.3620));
      }
      /* pretensioner at each lap anchor */
      for (const s of [-1, 1]) {
        res.add(abox(0.062, 0.028, 0.028, M.steel, hx - 0.030, CY - 0.022, s * 0.246));
      }
    }
    /* the pair the four-seat car never needed: rear thorax bags firing
       aft out of the FRONT seat back at x -0.315 */
    for (const s of [-1, 1]) {
      res.add(cbox(0.040, 0.260, 0.090, 0.010, M.plastic, -0.315, 0.850, s * 0.170));
    }
    /* one curtain pair over a 1.20 m greenhouse */
    for (const s of [-1, 1]) {
      res.add(abox(1.400, 0.040, 0.026, M.fabric, -0.330, 1.2000, s * 0.3900));
    }
  }
  sys.add(res);

  return sys;
}
