/* Gen 10 autonomy: the asymmetric triplex. Gen 4 built this slot around one
   idea, that after any single fault the car keeps driving, and it bought that
   with three identical always-on lanes burning 380 W continuously. Gen 10
   keeps the property and stops paying for it three times over.

   The observation the whole module rests on: triplication buys fault
   LOCALISATION, and localisation does not require three full-rate copies of
   the same answer. It requires three opinions good enough to disagree inside
   a bounded time. So lane A runs the full stack at full rate, lane B runs a
   diverse distilled stack at a reduced rate, and lane C sits in retention and
   is woken when the first two disagree or when the scene gets hard. The
   silicon is unchanged: three 500 TOPS lanes, all three promotable, peak
   still 640 W. What changed is what the car asks them to do.

   Two consequences beyond the watts. Lane B running a DIFFERENT program is
   the first answer this ladder has had to the common-mode software fault that
   voting is powerless against, which Gen 1 and Gen 4 both listed as their
   first failure mode. And the cable ring that Gen 4 ran around the axles is
   back inside the cabin floor where its own panel always said it was. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

/* ── THE COMPUTE POWER BASIS, exported as data ────────────────────────────

   design/gen10.md risk 0: of the 240 W this generation was asked to cut, only
   45 is booked to the autonomy slot in js/efficiency.js and the rest is
   asserted to sit inside hv-4's 820 W lump on the strength of a subtraction,
   380 minus 45, with no module publishing the 335. The brief was to derive
   the number rather than inherit it. This constant is that derivation, in the
   shape of CD_BASIS, so the next reader argues with data instead of prose.

   WHAT IS MEASURED AND WHAT IS NOT. Two figures on this ladder are published
   by a module: autonomy.js line 107 says the Gen 1 duplex is '450 W peak,
   liquid cooled', and autonomy-4.js line 28 says the Gen 4 triplex is '640 W
   peak, 380 W typical'. Both are COMPUTE figures and not slot totals, and the
   thing that settles it is autonomy.js's own sentence: 'The 450 W thermal
   load runs into a cold plate on the cabin coolant loop.' Sensors are not on
   that cold plate. So 450 and 640 are cold-plate loads, and the 380 typical
   sits in the same spec row as the 640 peak.

   THE DERIVATION. A lane's peak is set by its thermal design point and its
   typical by scene statistics, so the peak-to-typical ratio is a property of
   the WORKLOAD, not of the silicon generation, and both generations run the
   same class of stack. Gen 4 publishes both ends: 380 / 640 = 0.5938.
   Applied to Gen 1's published 450 W peak, the Gen 1 duplex continuous draw
   is 267.2 W, or 133.6 W a lane against a 225 W lane peak.

   THE CROSS-CHECK, and it does not agree exactly. Hold the LANE typical
   constant instead of the ratio: Gen 4 is 126.7 W a lane, so a Gen 1 duplex
   would be 253.4 W. That assumption is weaker, because Gen 1's lane peak is
   225 W against Gen 4's 213.3 and a hotter lane should also idle hotter, but
   it is the more conservative booking and this module says so out loud: at
   253 W the auxDelta is -61 rather than -75 and the rung reads 1,712.0 miles
   rather than 1,717.0. The published figure is 267 because it uses both
   modules' own numbers and one stated assumption, and the reader is told
   which way the choice cuts.

   WHAT THAT DOES TO THE MODEL'S OWN BOOKING. js/efficiency.js books
   autonomy-4 at auxW 45, additive, which is a statement that the Gen 4
   triplex draws 45 W MORE than the Gen 1 duplex did. Against a published 380,
   that implies a Gen 1 duplex of 335 W, which is 167.5 W a lane, or 74.4
   percent of its own 225 W lane peak held continuously, against Gen 4's 59.4
   percent of its own. Nothing anywhere names a mechanism for an older, less
   integrated lane sitting closer to its thermal limit all day. So the 45 is
   68 W light: on this derivation the model carries 312 W of compute at Gen 9
   where the module publishes 380, and the ladder's 559 W auxiliary is 68 W
   under the car it describes. That is not this module's to fix; it lives in
   js/efficiency.js and hv-4, and it is reported rather than corrected. */
export const COMPUTE_BASIS = {
  gen1PeakW: 450,               // autonomy.js:107, a cold-plate load
  gen4PeakW: 640,               // autonomy-4.js:28
  gen4TypicalW: 380,            // autonomy-4.js:28
  dutyRatio: 380 / 640,
  gen1TypicalW: 267,            // 450 x dutyRatio, the figure booked
  gen1TypicalAlt: 253,          // constant lane typical, the conservative one
  gen1TypicalImplied: 335,      // what METRICS' additive 45 W implies
  gen10TypicalW: 192,
  gen10PeakW: 640,
  bookedAuxDelta: -75,          // gen10TypicalW - gen1TypicalW
  unbookedSlotSensorW: 79,      // measured bottom up below, in NO baseline
  note: 'Peaks are cold-plate loads and exclude sensors. The slot draws about ' +
        '79 W more than any of these figures in sensors and ring interfaces, ' +
        'and no rung of this ladder books it.',
};

/* Per-lane typical at Gen 4, 48 V input, apportioned. This table is the
   module's own construction and it is calibrated to the published 126.7 W a
   lane rather than derived independently of it, which means it is evidence
   about WHERE the watts are and not evidence that there are 380 of them. Its
   job is to say which blocks a mechanism can reach. */
const LANE_GEN4 = {
  npuDynamic: 52.0,
  leakageAlwaysOn: 12.0,
  sramNoc: 13.0,
  lpddr: 12.0,
  cpuSafety: 16.0,
  frontEnd: 11.6,      // deserialisers 4.6, ISP and radar/lidar preprocess 7.0
  /* silicon 116.6, point-of-load at 92 percent, so 10.1 W of conversion */
  total: 126.7,
};

/* The three lane states, same silicon, different duty. Derived block by
   block from LANE_GEN4 in the compute panel's ledger. */
const LANE = {
  fullStructured: 96,   // foveated ingest, structured scene
  fullMixed: 108,       // foveated ingest, mixed scene
  fullDense: 113,       // dense scene, foveation nearly saturated
  checker: 45,          // reduced-rate diverse checker
  standby: 17,          // retention, promotable in 60 ms
  peak: 213,            // worst case, 640 / 3
};

/* Duty split over the mixed cycle the efficiency model uses. This is the
   least evidenced input in the module and the panel says so: it is a
   judgement about scene statistics, not a measurement. */
const DUTY = { cruise: 0.58, elevated: 0.30, dense: 0.12 };

export const SYSTEM = {
  id: 'autonomy-10',
  name: 'Autonomy · Gen 10',
  color: 0x6ea8ff,
  explode: [0, 2.3, 0],
  blurb: 'Gen 4 proved a car can outvote its own fault. Gen 10 stops paying for that three times a second: one full-rate lane, one diverse checker at a fifth of the work, one lane in retention that wakes when they argue. 192 W typical against Gen 4\'s 380, the 640 W peak untouched, and the number this module books is derived rather than inherited.',
  parts: {
    compute: {
      name: 'Asymmetric triplex compute',
      tagline: 'Three lanes that are no longer three copies: the majority still wins, and only one of them is awake at full rate.',
      mass: 12.5,
      specs: [
        ['Lanes', '3x 500 TOPS, one primary, one checker, one reserve'],
        ['Voter', '2-of-3 majority, analysable logic, ASIL D'],
        ['Power', '640 W peak held, 192 W typical'],
        ['Against Gen 4', '380 W typical, so 188 W cut and 52 W missed'],
        ['Diversity', 'Two independently written stacks, not three copies'],
        ['Fault to isolation', '100 ms at Gen 4, 250 ms worst case here'],
      ],
      how: 'Three lanes sit on one cold plate exactly as Gen 4 built them, each an independent 500 TOPS SoC with its own DRAM and its own pair of diode-ORed 48 V feeds. What changed is the job. Lane A runs the primary stack at the full 20 Hz tick. Lane B runs a SEPARATELY WRITTEN stack, distilled and quantised down to a working set that lives in its own on-die SRAM, at 10 Hz on a quarter of the input pixel and point rate. Lane C is in retention: clocks gated, SRAM held, DRAM in self-refresh, wake to full rate in 60 ms. In cruise the car is a duplex with a third opinion 60 ms away; the instant A and B disagree, or the scene crosses an escalation trigger, C comes up and the vote is a genuine 2-of-3. Escalation is not rare and it is not free: measured over the mixed cycle this module assumes 58 percent cruise, 30 percent elevated with both checkers awake at reduced rate, and 12 percent dense with all three lanes at full rate.\n\nTHE LEDGER, and every watt in it has a named mechanism. Gen 4 spends 126.7 W a lane at the 48 V input, which apportions as 52.0 W of NPU array dynamic, 12.0 of SoC leakage and always-on domains, 13.0 of on-die SRAM and network-on-chip traffic, 12.0 of LPDDR5X PHY and DRAM, 16.0 of CPU and safety cluster, 11.6 of sensor front end, and 10.1 of point-of-load conversion loss at 92 percent. Note what that table is: it is calibrated to the published 380 W rather than derived independently of it, so it says where the watts are and not that there are 380 of them. Against it, a reduced-rate checker is 45 W (NPU dynamic to 8.0, because an eighth of the op rate at 0.60 V instead of 0.75 leaves 4.2 W of arithmetic and 3.8 W of fetch and sequencer overhead that does not scale; leakage to 9.0; SRAM and NoC to 5.0; LPDDR to 3.0 because the distilled working set is resident on die; CPU and safety to 11.0, since the safety monitor and the voter interface run at full rate on every lane by design; front end to 5.0, deserialisers up and the ISP at a quarter rate). A lane in retention is 17 W, and the reason it is not near zero is leakage at an automotive junction temperature. A full-rate lane with foveated ingest is 96 W in a structured scene, 108 in a mixed one and 113 in a dense one, where the ROI is chosen from radar occupancy and the previous frame\'s motion energy and the periphery runs at quarter resolution. Applied in that order: **lane B to a reduced-rate checker, 72 W. Lane C to retention in cruise, 88 W. Foveated ingest on whichever lanes are at full rate, 28 W. Total 188 W of a 240 W target, and the module misses by 52 W.**\n\nTWO MECHANISMS WERE EXAMINED AND BOOK NOTHING, which is the honest half of the ledger. Resident weights in a large on-die SRAM is the obvious way to attack the 12 W of LPDDR, and it does not survive arithmetic: a 1 Gbit macro is about 100 mm2 at this node and leaks roughly 5 to 15 W at an automotive junction temperature, against the 12 W of DRAM interface it displaces. It is a wash, and a wash is booked at ZERO rather than rounded toward the target. Sharing one deserialisation stage across three lanes would save about 10 W of the 34.8 W the three front ends spend on identical streams, and it is declined for a different reason: it moves a trusted boundary, because a corrupted shared front end lies to all three lanes at once, and 10 W is not the price of the one property this slot exists to hold.\n\nWHAT THE MODULE BOOKS, and it is smaller than the brief asked for. See the COMPUTE_BASIS derivation at the top of this file. The Gen 1 duplex continuous draw is 267 W, not the 335 that js/efficiency.js\'s additive 45 W implies, so the auxDelta this module has earned is 192 minus 267, or **-75 W**, and the car\'s auxiliary reads 439 W rather than the 319 design/gen10.md expected. On the Gen 9 configuration with nothing else changed that is 110.656 Wh/mi and 1,717.0 miles against 1,673.9, a step of **+43.1** where the design doc priced +87.7. Half the shortfall is the 52 W of compute the ledger could not find and half is the 68 W the model never booked in the first place.\n\nCheck the entry the way design/gen10.md hard point 1 asks. auxDelta stacks on the SLOT BASELINE, which is hv-4\'s 820 W, and replacing autonomy-4 also removes its additive +45: 820 minus 306 for thermal-9 minus 75 is **439 W**, which reads as 45 W of thermal plus 192 of compute plus 202 of other low voltage. Writing the obvious 192 minus 380, or -188, would give 326 W and hand this rung 113 W it did not earn. One convention to a sentence, because this is the paragraph that exists to stop a booking error and quoting the other one inside it is the drift it is guarding against: against the Gen 9 partners every other number here is priced on, those 113 W are **42.0 miles**, 1,759.0 against 1,717.0. Priced instead on the full Gen 10 preset with wheels-10\'s Crr in, the same slip is 44.0 miles and reads **1,802.0** against 1,757.9, so the one mistake this check exists to prevent is also the one that would make the generation look like it cleared 1,800. And note which way the remaining uncertainty cuts: if the Gen 1 duplex really is 335 W the same architecture books -143 and the rung reads 1,742.1 miles, and if it is the 253 W the constant-lane-typical route gives it books -61 and reads 1,712.0. The 267 is the larger of the two derived figures and therefore the more flattering of them, which is stated here rather than left for a reader to notice.',
      why: 'The Gen 4 argument was that a duplex can detect a fault but cannot localise it, so a car with no steering column needs a third opinion. That is still right. What Gen 4 did not ask is how much of a third opinion, and how often. A liar is caught by disagreement, and disagreement needs the other two lanes to be RIGHT, not to be fast: a checker running at half the tick rate on a quarter of the pixels still produces a trajectory that a diverging primary cannot match, because the divergence that matters is metres of path, not centimetres of perception noise. Buying that with 45 W instead of 127 is the same safety property at a third of the price, and the price is paid in latency rather than in coverage, which is a trade you can bound and publish.\n\nThe part of this that is a capability GAIN rather than a saving is the diversity. Gen 1 and Gen 4 both list a common-mode software fault first among their failure modes, because three identical stacks are confidently and identically wrong together and voting is powerless against it. Once lane B is not trying to keep up with lane A it no longer has to be lane A, and a separately written, separately trained checker is the first thing on this ladder that can actually disagree with a bug. It also means the 2-of-3 vote is no longer a vote among clones, which is what the analysable-voter argument always quietly assumed it was not.',
      fail: [
        'Fault to isolation grows from 100 ms to 250 ms worst case: two consecutive disagreeing checker ticks at 10 Hz plus one tick of alignment. The bound that makes that survivable is a rate limit on the primary\'s commanded trajectory during the window, so a liar held for 250 ms at 3 m/s2 of lateral authority moves the car 94 mm off line, which is a lane-keeping excursion and not a departure. If the rate limiter is defeated the whole argument goes with it.',
        'The reduced checker is blind to a class and the class is nameable: at a quarter of the pixel rate its reliable classification range for a 0.4 m obstacle falls from about 90 m to about 45 m, and at 10 Hz it sees a 30 m/s closing target 3 m later than the primary at every tick. Inside 45 m a small unfamiliar object is corroborated by the formally verified collision checker, which runs on all three lanes and brakes for occupied space without recognising it, and not by a second perception opinion.',
        'Promotion is not instant. When the primary is voted out, the surviving checker restores full clock, reloads the primary weight set from its own LPDDR and re-establishes on the next tick, about 60 ms in which the car runs on a distilled stack plus the collision checker. That is enough to hold lane and decelerate and it is not enough to execute a new manoeuvre, which is exactly the window this module has bought its watts in.',
        'The duty split is the softest number here. 58 / 30 / 12 is a judgement about scene statistics on a mixed cycle, not a measurement. Moved with ONE convention over both ends, cruise and elevated held in their 58 to 30 ratio while the dense fraction is what changes, the published 192 W is 185.0 at a 0.08 dense fraction and 198.4 at 0.16. An earlier draft of this row read 185 and 199, which are the two ends of two DIFFERENT reallocation rules: 199 is what comes out if cruise alone absorbs the change, and that rule gives 184.5 at the other end. The architecture does not change with either; the booked auxDelta does, and priced through the shipped model those two points are 1,719.6 and 1,714.7 miles against the booked 1,717.0, so +2.5 and -2.3 and about five miles across the whole span rather than five either way.',
        'ONE INTERPENETRATION SURVIVES THIS GENERATION AND IT IS THIS PART\'S, so the module is 1 undeclared cross-module pair rather than 0. The coolant stubs on the cold plate cross thermal-9/glycol-loop over 24 triangle pairs to 2.29 mm at (-0.778, 0.414, 0.055), identical in count, depth and location to Gen 4\'s, against a Gen 4 total of 25 pairs and 5,823 crossing triangle pairs. It is the hose-over-spigot fit on the plane x -0.795, which thermal-6, -7 and -9 all name as where they land their glycol loop and which this file names as where its spigot ends stay, so it is the one pair on the car both halves of wrote down. Closing it from this side either opens a gap in a coolant joint or edits a module this generation does not open, and neither is worth a clean number.',
        'Loss of the cold loop still throttles all three lanes at once. The shed state is now one reduced-rate lane plus the collision checker rather than a full lane, which is why the flank fin banks are half the height Gen 4 needed and where the module\'s kilogram comes from: 2 banks of 13 fins 34 mm tall become 2 of 9 at 17, which is 6.63e-4 m3 of aluminium against 2.30e-4, or 1.17 kg, plus 0.05 kg off the end caps, less 0.2 kg of hold-up capacitors for the reserve lane. The cold plate itself does NOT shrink, because a cold plate is sized by the peak and the peak is held at 640 W. It is also why the stack\'s unhurried stop is now made on a checker rather than on a primary.',
      ],
      explode: [0, -0.75, 0],
    },
    radars: {
      name: '4D imaging radar ring',
      tagline: 'Five imaging units carried from Gen 4, and four of them finally out of the crash structure they were drawn inside.',
      mass: 2.4,
      count: 5,
      specs: [
        ['Band', '76 to 81 GHz FMCW, 4 GHz chirp'],
        ['Front unit', '768 virtual channels, 300 m'],
        ['Corners', '4x 192 channels, 150 degree field, 150 m'],
        ['Range resolution', '4 cm, floor 0.15 m'],
        ['Duty', 'Full rate in every lane state, 42 W total'],
      ],
      how: 'Nothing in the sensing argument moves this generation. Five imaging radars, elevation at every corner, a 4 GHz chirp that resolves range to 4 cm and owns the last 150 mm that Gen 1 spent twelve ultrasonic transducers on. What moves is where two pairs of them are bolted. Swept against body-9, Gen 4\'s front corner units at (2.20, 0.50, 0.55) are inside the crash rail: 172 triangle pairs cross to 28.66 mm of plane-straddle depth and the two surfaces read 0.02 mm apart, which is what a separation reads when the surfaces are through each other rather than beside each other. The rear pair is 152 pairs and 26.00 mm inside the rear casting. Both are drawn inside the structure they are supposed to hide behind. Measured on the built body, the pockets that are actually empty are centred on (2.16, 0.44, 0.58) and (-2.15, 0.50, 0.66), so the front pair drops 60 mm and comes 30 mm outboard and the rear pair goes 110 mm outboard, which is where a corner radar wants to be anyway. One method over both rungs, true surface separation: the front corner unit goes from 0.02 mm and 28.7 mm inside the crash rail to 38.59 mm clear of it, and the rear pair from 0.03 mm and 26.0 mm inside the rear casting to 37.66 mm clear. The one radar figure that did not improve is the FRONT unit, and the feature that owns it is worth naming exactly rather than approximately: it is the HARNESS CONNECTOR on the back face, whose boot has sat 0.41 mm off the crash rail since Gen 4 at (2.268, 0.503, 0.057) and still does. The fin bank behind the same unit reads 1.00 mm on the same sweep, so a sentence that hangs the module\'s tightest figure on the fin bank names the wrong feature by 0.6 mm. Both are carried, not created, and the 0.41 is the tightest thing in this module.\n\nThe radars are the largest single item in the sensor draw at 42 W of the 79 and that draw is worth stating even though no rung of this ladder books it. Bottom up: 18 W for the 768-channel front cascade, 24 W for four 192-channel corners, 8 W for five 12 MP imagers, 4.5 W for the thermal core and its window heater, 20 W for two flash lidars, 1.5 W for the driver monitor and 3 W for two receivers and three IMUs. About 79 W, none of it inside the 380 W compute figure and none of it inside the 559 W the model carries, because the auxiliary term was never decomposed far enough to have a place for it.',
      why: 'The radar case is unchanged and it is still the strongest sensing argument on the car: it is the only modality that measures closing speed rather than computing it, and it does not care about weather or light. What Gen 10 adds is that the corner units are now the FULL-RATE half of the asymmetric architecture. Radar frames are cheap to produce and cheap to consume, so both checkers ingest them at full rate even in cruise while camera pixels are the thing being rationed, and that is why the periphery of a foveated frame still has a sensor watching it.',
      fail: [
        'Mutual interference climbs with fleet penetration and imaging radars chirp across more of the band; randomised chirp timing keeps collisions rare and brief, carried from Gen 1.',
        'The radar-soft obstacle is now load bearing rather than incidental. A dry hedge or a thin plastic bollard gives a weak echo, and in the foveated periphery it is also being watched at a quarter of the camera resolution, so the two weaknesses line up. The escalation trigger includes any low-confidence periphery track for exactly this reason.',
        'Multipath ghosts come with plausible elevation: a guardrail can mirror a real car into an empty lane, and track-level fusion kills any ghost no camera confirms.',
      ],
      explode: [0.55, 0, 0],
    },
    cameras: {
      name: 'Camera set and thermal imager',
      tagline: 'Five visible imagers and one that does not need light, feeding a stack that no longer reads all of them at full resolution.',
      mass: 1.6,
      count: 6,
      specs: [
        ['Imagers', '5x 12 MP HDR + 1 thermal, gen-locked'],
        ['Thermal', '640 x 512 microbolometer, 8 to 14 um'],
        ['Dynamic range', '140 dB split pixel'],
        ['Primary ingest', 'Foveated: full rate on the ROI, quarter elsewhere'],
        ['Checker ingest', 'Quarter rate, whole field'],
      ],
      how: 'The imagers are Gen 4\'s and the argument for them is Gen 4\'s: a 12 MP wide whose centre crop reproduces an old 50 degree main in software, a telephoto that resolves a vehicle at 300 m, B-pillar units at 160 degrees that inherited the deleted fender repeaters, a rear camera, and a long-wave thermal imager in the nose that detects a pedestrian at 200 m in zero lux and is structurally immune to low sun. What is new is the read-out contract. The primary lane ingests a foveated frame: full resolution over a region of interest chosen from radar occupancy, the previous tick\'s motion energy and the map, and quarter resolution everywhere else. That is 0.3625 of the pixel rate, which is 23.2 W of NPU backbone and 5.0 W of ISP a lane, and it is the third mechanism in the compute ledger.\n\nThe geometry changed in two places, both because a sweep against body-9 said so. The shared header casting carrying the forward wedge and the driver monitor is 20 mm lower, HDR.pos going from autonomy-4.js\'s y 1.310 to 1.290: at Gen 4 the wedge reaches y 1.3283 through a canopy whose surface at that station measures y 1.3220, so it stood 6 mm outside the glass it is supposed to look through. On the new origin the wedge tops out at y 1.3083, the same 20 mm down, and the nearest canopy surface is 7.74 mm away, measured SURFACE to SURFACE on the built meshes rather than vertex to triangle. The thermal imager came back 6 mm for the same reason: its germanium window was 1.6 mm through the nose skin, and the same sweep now reads 3.30 mm of clear air.',
      why: 'Consolidation against redundancy was Gen 4\'s trade and Gen 10 sharpens the second half of it. Three deleted cameras are three fewer overlapping fields for catching a liar, and the answer was cross-modality overlap. Foveation looks like it walks that back, because the periphery is now read at a quarter of the pixels. It does not, and the reason is which sensor owns which job: the periphery is covered by imaging radar at full rate and by lidar occupancy inside 140 m, and the fovea is the only place where READING is required, which is the one thing no other modality can do. Spending the pixel budget where the text and the light state are, and the photon budget where the geometry is, is the same argument Gen 1 made for keeping cameras at all.',
      fail: [
        'A radar-soft object in the foveated periphery is detected one tick later and at roughly half the range it would have been at full resolution. That is a real capability cost of the compute cut and it is the reason the escalation trigger is generous rather than tight.',
        'A raindrop on a flank lens now has fewer neighbouring fields to vote it down; the stack leans on corner radar corroboration and declares the sector degraded instead of guessing.',
        'Thermal contrast is worst at midday in summer, exactly when visible cameras are strongest; the two failure envelopes barely overlap, which is the point, but the fusion weights must track ambient temperature honestly.',
      ],
      explode: [0.2, 0.4, 0],
    },
    lidar: {
      name: 'Flash lidar pair',
      tagline: 'Two solid-state units behind the light band, and the sensor the collision checker leans on when the checker lane is looking elsewhere.',
      mass: 0.7,
      count: 2,
      specs: [
        ['Type', 'Flash, no moving parts'],
        ['Emitter', 'VCSEL array, 940 nm, Class 1'],
        ['Receiver', '0.4 MP SPAD array, global shutter'],
        ['Range', '140 m at 10% reflectance'],
        ['Fields', '2x 120 x 25 degrees, toed out 25'],
        ['Occupancy path', 'Full rate to all three lanes, always'],
      ],
      how: 'The units are Gen 4\'s: a VCSEL array illuminates the whole scene each pulse and a SPAD receiver times single photons per pixel, so every point in the frame is captured at the same instant and there is no scanning mirror to smear a crossing car across a frame. Each puck came back 10 mm this generation, to local x 2.320, because Gen 4\'s window face was 4.8 mm through body-9\'s light band over 140 triangle pairs and a sensor that looks THROUGH a panel should stop short of it rather than inside it. Measured surface to surface, the nearest light-band surface is now 4.56 mm ahead of the window and the nose skin 11.21 mm ahead of that.\n\nThe architectural change is what the point cloud feeds. The formally verified collision checker, carried from Gen 1 and now the thing standing behind a reduced-rate checker lane, consumes lidar occupancy at full rate on all three lanes including the one in retention, because occupancy needs no recognition and a few hundred thousand voxels a tick is not what costs 127 W. That is deliberate: the cheapest part of the perception stack is the part that brakes for a shape nobody has classified, and it is the part that must never be duty cycled.',
      why: 'Two pucks replace one roof pod at less mass and buy overlapping fields across a 0.6 m baseline, so one blinded window degrades the picture instead of deleting it. Gen 10 adds a second reason to keep them: an architecture that rations camera pixels needs one modality that measures geometry directly and cheaply, or the rationing quietly becomes a coverage cut. Lidar occupancy is that modality, and its cost is in photons rather than in TOPS.',
      fail: [
        'Fog and heavy snow return first-surface echoes; the SPAD histogram takes the last return, but past a density threshold range collapses honestly and the stack knows it.',
        'Retroreflective signs bloom hard on a SPAD array, saturating neighbouring pixels for a frame; bloom masks are calibrated per unit.',
        'Both pucks sit behind one band, so packed snow can blind the pair together; the shared heater and a blockage monitor are the mitigation, and one failure domain for two sensors is the honest cost of embedding.',
      ],
      explode: [0.5, 0.15, 0],
    },
    dms: {
      name: 'Driver monitor',
      tagline: 'The only sensor pointed inward, and the one part of the car that never gets duty cycled.',
      mass: 0.1,
      specs: [
        ['Imager', '940 nm IR, 60 fps'],
        ['Illumination', 'Two invisible IR emitters'],
        ['Tracks', 'Gaze vector, eyelid aperture, head pose'],
        ['Distraction call', 'Under 2 s'],
        ['Handover budget', '10 s, own stop armed throughout'],
        ['Mounting', 'Shared header casting, 221 mm arm'],
      ],
      how: 'A small IR camera on the shared header rail floods the driver\'s face with invisible 940 nm light and reads the corneal glint against the pupil centre, giving a gaze vector good to about 2 degrees plus eyelid aperture, blink cadence and head pose. Processing happens on the camera and only states leave it; no video crosses the ring. It shares one cast rail with the forward camera wedge, and that rail dropped 20 mm this generation to get the wedge out of body-9\'s canopy, so the pod moved down with it. Swept off the built mesh the pod now sits at (0.4127, 1.2375, -0.3020) with its optical axis 17.2 degrees below horizontal, unchanged, because a translation does not rotate anything.\n\nThe reason this sensor is exempt from every duty argument in this module is worth stating plainly. Escalation triggers are computed from the scene, and a handover request is the one event where the scene is not the thing that changed. So the driver monitor runs at 60 fps in every lane state including cruise, its states are voted like any other input, and a monitoring dropout is itself an escalation trigger that wakes lane C.',
      why: 'Monitoring is the least glamorous sensor on the car and the one the L3 regulations actually mandate, because every alternative amounts to pretending the human is a component with a datasheet. The gap between eyes-on and mind-on is the residual risk no camera closes, and the design treats the handover as a favour requested, never a dependency. Gen 10 makes that structural: the minimal-risk stop stays armed on the primary through every transfer, and now on a checker as well.',
      fail: [
        'Gaze is not attention: eyes on the road with the mind elsewhere reads as fully compliant, which is exactly why the fallback is the car\'s own stop and not the handover.',
        'Direct low sun through the glass can saturate the IR image for seconds; the bandpass filter narrows the window and dropouts are flagged as monitoring lost, not as driver attentive.',
        'IR-opaque sunglass coatings defeat gaze tracking; the system degrades to head pose only and says so rather than inventing a gaze vector.',
      ],
      explode: [0.3, 0.5, -0.4],
    },
    'gnss-imu': {
      name: 'Redundant pose unit',
      tagline: 'Two antennas, two receivers, three IMUs, and the first pair of antennas on this ladder that is actually bonded to the roof.',
      mass: 0.4,
      specs: [
        ['Receivers', '2x dual band L1/L5 + RTK'],
        ['Antennas', 'Roof pair, 0.650 m baseline, 10.4 mm proud'],
        ['Heading', '0.3 degrees, standing or moving'],
        ['IMUs', '3x MEMS, one per compute lane'],
        ['Dead reckoning', '0.25% of distance travelled'],
      ],
      how: 'Two dual-band receivers hang on two antennas 0.650 m apart, and the carrier-phase difference across that baseline yields heading to 0.3 degrees while the car is parked. Three MEMS IMUs mount one per compute lane, which makes pose votable by the same machinery as everything else. The pose filter is the one consumer that does NOT change with lane state: a lane in retention keeps its IMU powered and integrating, because a gyro bias history is worth nothing if it has a 60 ms hole in it every time the car enters a motorway.\n\nTwo placement defects closed, both measured rather than argued. design/area-rezero.md logs Gen 4\'s antennas reaching y 1.429 through a roof that closes at 1.368, 61 mm of hardware standing in open air and 0.003 m2 of shadow that is not charged as drag. Ray-swept straight down onto body-9\'s built canopy, the roof surface is y 1.3624 at x 0.25 and y 1.3676 at x -0.40, and both stations sit on the flat between the crown and the windscreen break rather than on the steep aft fall where a flat 50 mm foot buries its far edge. Each foot is seated on the highest canopy point under its own footprint, so the bond pad measures 1.20 mm at its thinnest, surface to surface, and the radomes reach y 1.3728 and y 1.3780, standing 10.4 mm proud of the glass they are bonded to against Gen 4\'s 61 mm of open air. The coax leaves each foot horizontally and runs INBOARD along the canopy to a bonded grommet rather than piercing it, so nothing here penetrates the body; the direction is measured rather than chosen, because interior-6\'s canopy liner sweeps down through roof-height hardware between x -0.56 and -0.64 and a run aft crossed it over 48 triangle pairs. And the three IMUs moved off the plate at x -0.740 onto the lane boards at x -0.545: Gen 4 put them where interior-6\'s rear bench has a centreline pan that the swept surface passes straight through, 3.2 mm over 40 triangle pairs, and the same sweep now reads 31.90 mm.',
      why: 'The pose unit is still the hinge between relative perception and the absolute map, and still the only sensor an attacker can feed from 20,000 km away, so it remains a hint to be verified and never a truth to be obeyed. Redundancy sharpens that stance: a spoofer must bend two antennas and three independent inertial histories into one consistent lie, and consistency is precisely what the voter checks. Keeping the reserve lane\'s IMU awake while the rest of that lane sleeps is the same argument in miniature, that the cheap continuous thing is what makes the expensive intermittent thing trustworthy when it wakes.',
      fail: [
        'Urban multipath off glass towers still gives confident fixes that are metres wrong, and both receivers can be wrong together since they share the sky; visual localisation wins every conflict.',
        'Jamming takes both receivers at once because it takes the band, not the box; the response is demotion to inertial dead reckoning, not belief.',
        'With no fix, the three IMUs agree ever more precisely on a pose that is drifting; consensus is not accuracy, and the filter widens its stated uncertainty on schedule regardless.',
      ],
      explode: [0, 0.6, 0],
    },
    ring: {
      name: 'Sensor ring bus',
      tagline: 'The most promiscuous part on the car, re-routed: 18 penetrating part pairs and 18 rear-annulus vertices, both now zero.',
      mass: 0.3,
      specs: [
        ['Topology', 'Dual counter-rotating rings'],
        ['Media', '10 Gbit automotive Ethernet, single pair'],
        ['Nodes', 'The four hv-4 zonal controllers'],
        ['Heal time', 'Under 100 us after a cut'],
        ['Plan', 'x +/-1.16, |z| 0.470 and 0.482, y 0.388 to 0.445'],
      ],
      how: 'Every sensor patches into its nearest of hv-4\'s four zonal controllers, and the controllers are joined by two 10 Gbit rings running opposite directions around the cabin floor. Each frame is multicast both ways, so a cut anywhere leaves every node reachable the long way round, and the rings heal in under 100 microseconds, well inside one 50 ms compute tick. The same connector that carries a sensor\'s data delivers its 48 V from the controller\'s solid-state fuse.\n\nTHE ROUTE IS THE WHOLE POINT OF THIS PART THIS GENERATION. HANDOFF.md ranks autonomy-4/ring as the part that crosses more module boundaries than anything else on the ladder, 18 modules and 54.21 mm deep, and on the Gen 9 preset it interpenetrates five other modules over 18 part pairs while putting 18 vertices inside the rear annulus that belongs to the drivetrain alone. Both numbers came from the same cause: a run its own panel described as the cabin floor perimeter was drawn at x +/-1.92 and |z| 0.66, which is 470 mm past the axles and out among the fairings, castings, knuckles, discs and hub bearings. The cabin floor is between the axles. Re-swept against every part of all eight partners rather than against a box drawn round a guess, the corridor that is actually empty is |z| 0.470 to 0.482 at y 0.388, lifting to y 0.445 across the rear where hv-4\'s rear motor cable crosses the centreline. The loops now run x -1.16 to +1.16 on that line, and against the same eight partners measured with the same predicate the count is **0 penetrating part pairs and 0 annulus vertices**. Four gland nodes carry the loops out to hv-4\'s zonal controllers. They stand off rather than land, and the reason is measured: the controller\'s inboard wall is chamfered, running |z| 0.5385 at y 0.380 to 0.5920 at y 0.430, so a flat face pressed against it would float at the bottom or bury itself at the top. The node sits 5.13 mm off it with four drops bridging the gap. The tightest thing anywhere on the route is **3.45 mm to hv-4\'s front HV run at (1.116, 0.397, 0.423)**, where the loops\' forward corner radius turns inboard past the zonal controller, and the next three are 5.13 mm to hv-4/zonal, 6.12 to hv-4/buffer and 9.51 to wheels-9/master-unit. Every one of those is true surface separation, triangle to triangle, over the whole route against every part of all eight partners. An earlier draft of this panel published 3.53 mm to interior-6\'s rear bench pan; that pan measures **9.85 mm** on this sweep, so the earlier figure named the wrong partner AND the wrong distance, which is what a clearance measured inside a box drawn around a guess does. The number quoted is the one from the sweep that covers the route.',
      why: 'A star network has a centre and a centre is a single point; a ring has none, which is the topology the fail-operational argument demands of the wiring and not just of the silicon. The re-route is not a tidying pass, it is that argument taken seriously: a data ring whose two loops are threaded through the rear suspension, the rear motor and both front brake assemblies has no failure independence at all, whatever the topology diagram says. Bringing it inside the cabin floor is what makes the counter-rotating claim mean something.',
      fail: [
        'Both rings still run the same perimeter, 12 mm apart, so a hard corner intrusion severs them together and healing only reroutes the surviving arcs. The corridor measures 3.45 mm of true surface separation at its tightest point, to hv-4\'s front HV run, and there is no second corridor at this height on this car, so genuinely separated routing is a body-and-interior decision and not a cable one. It is not claimed here.',
        '10 Gbit on a single pair beside 48 V switching hardware is an EMC knife fight; error bursts under inverter transients are absorbed by forward error correction, and sustained degradation drops the link rate with the stack shedding camera resolution honestly.',
        'Both rings speak the same protocol stack, so a malformed frame that wedges one switch can wedge its twin; the zonal controllers carry independent watchdogs precisely because voting does not apply to the wire.',
      ],
      explode: [0, -0.45, 0],
    },
  },
};

/* ── Detail vocabulary, carried from autonomy-4 ───────────────────────────

   Every sensor on this car was a box and a cylinder. What follows is the
   smallest set of features that makes each one read as a manufactured
   object: a cast housing with draft and a parting line, a radome that is
   deliberately not metal, lens barrels with retaining rings, bezels that
   frame an aperture instead of covering it, sealed connectors with a
   backshell and a boot, and bolted ears wherever a real one is serviced.

   Two placement rules are baked in here because the project has paid for
   both. lib.fastener seats on y = 0 and grows along +Y, so `screw` takes a
   point that must be ON the visible face and a normal, never a guess at a
   coordinate. And a bezel is four strips with a hole in the middle, not a
   plate: a plate hides the thing it is supposed to frame, and geometry
   nobody can see is a decal with a triangle budget.

   AND THAT RULE IS TESTED RATHER THAN ASSERTED. The built module, UNMERGED
   so every authored feature is still its own mesh, is 748 meshes and 33,464
   triangles. Every triangle centroid is a sample point, lifted 10 microns off
   its own face, and 42 directions over a Fibonacci sphere leave each of them
   and run one metre against every other mesh in the module. EVERY MESH HAS AN
   ESCAPING RAY. Nothing here is sealed inside anything else.

   THE SAMPLING IS THE WHOLE TEST AND IT IS NOT FREE, which is why it is every
   triangle and not a handful. Run the same sweep from six samples a mesh and
   eight meshes come back sealed, from twelve samples five, from twenty-four
   two, and the sets barely overlap: they are radome faces sitting open behind
   a bezel aperture and a germanium window standing 0.4 mm proud of its own
   retaining ring, all of them plainly visible, all of them missed because the
   six triangles the stride happened to pick were the buried ones. A visibility
   test that samples sparsely reports sound geometry as a defect and would miss
   the reverse, so the budget goes on samples rather than on a stated ray
   count. Exhaustive, with early exit on the first escaping ray, it costs
   32,631 rays against a 1,405,488 worst case.

   One qualifier, and it is the reason the first run of that test was wrong.
   Treating the lidar's own M.glass window as opaque buries 54 meshes, 27 a
   puck: the VCSEL tile, its 24 emitters, the SPAD barrel and the SPAD lens.
   They are behind a window at 0.22 opacity, which is what a lidar looking
   through a window looks like, so transparent meshes are not blockers. A
   visibility test that cannot tell a window from a wall reports a correct
   sensor as a defect. */

const YUP = new THREE.Vector3(0, 1, 0);

/* A fastener head seated on a face whose outward normal is n. */
function screw(p, n, r, mat = M.steel, type = 'hex') {
  const g = lib.fastener(r, mat, type);
  g.quaternion.setFromUnitVectors(YUP, new THREE.Vector3(n[0], n[1], n[2]).normalize());
  g.position.set(p[0], p[1], p[2]);
  return g;
}

/* Sealed circular connector: mounting flange, shell, keyed collar, and a
   strain-relief boot. Mounting face on y = 0 growing along +Y, so it seats
   exactly like a fastener. Rotate the returned group to face it. */
function connector(r, len, mat = M.plastic, seg = 8) {
  const g = new THREE.Group();
  const fl = lib.cbox(r * 2.8, 0.002, r * 2.4, 0.0005, M.darkSteel);
  fl.position.y = 0.001;
  g.add(fl);
  const shell = lib.cyl(r, len * 0.46, mat, seg);
  shell.position.y = 0.002 + len * 0.23;
  g.add(shell);
  const collar = lib.cyl(r * 1.22, len * 0.14, M.darkSteel, seg);
  collar.position.y = 0.002 + len * 0.40;
  g.add(collar);
  const boot = lib.cyl(r * 0.76, len * 0.52, M.rubber, seg);
  boot.position.y = 0.002 + len * 0.74;
  g.add(boot);
  return g;
}

/* Four chamfered strips framing an aperture in the local YZ plane, so what
   sits behind it stays visible. Thickness t runs along X. */
function bezel(t, h, d, rim, c, mat) {
  const g = new THREE.Group();
  const top = lib.cbox(t, rim, d, c, mat); top.position.y = (h - rim) / 2; g.add(top);
  const bot = lib.cbox(t, rim, d, c, mat); bot.position.y = -(h - rim) / 2; g.add(bot);
  const sd = h - 2 * rim;
  const a = lib.cbox(t, sd, rim, c, mat); a.position.z = (d - rim) / 2; g.add(a);
  const b = lib.cbox(t, sd, rim, c, mat); b.position.z = -(d - rim) / 2; g.add(b);
  return g;
}

/* A lens barrel growing along +X from x = 0: barrel, retaining ring, and
   the front element itself.

   Two material choices here are draw-call decisions and they are stated
   rather than buried. The retaining ring is the barrel's own black anodised
   alloy rather than bright aluminium, which is what a real one is and which
   also keeps it inside the barrel's merge bucket. And `elMat` exists because
   an IR optic is NOT clear: a 940 nm emitter or a bandpass-filtered IR
   imager reads black to the eye, so those elements pass M.sensor and merge,
   while a visible-light camera keeps M.glass and stays a separate
   transparent draw call, which is correct on both counts. */
function lensBarrel(r, len, seg = 12, elMat = M.glass) {
  const g = new THREE.Group();
  const b = lib.cyl(r, len * 0.82, M.darkSteel, seg);
  b.rotation.z = Math.PI / 2; b.position.x = len * 0.41; g.add(b);
  const ring = lib.cyl(r * 1.16, len * 0.20, M.darkSteel, seg);
  ring.rotation.z = Math.PI / 2; ring.position.x = len * 0.90; g.add(ring);
  const el = lib.cyl(r * 0.82, len * 0.08, elMat, seg);
  el.rotation.z = Math.PI / 2; el.position.x = len * 0.98; g.add(el);
  return g;
}

/* A flat annulus with its axis along +X, centred on the local origin. A
   bezel and a heater trace are rings, and a solid disc in their place hides
   the aperture they exist to frame. 160 triangles at 20 segments. */
function annulus(rIn, rOut, t, mat, seg = 20) {
  const m = lib.lathe([[rIn, -t / 2], [rOut, -t / 2], [rOut, t / 2], [rIn, t / 2], [rIn, -t / 2]], mat, seg);
  m.rotation.z = Math.PI / 2;
  return m;
}

/* One InstancedMesh from a placement callback, for anything repeated. */
function instanced(geo, mat, n, place) {
  const im = new THREE.InstancedMesh(geo, mat, n);
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) { place(i, m); im.setMatrixAt(i, m); }
  im.instanceMatrix.needsUpdate = true;
  im.castShadow = true; im.receiveShadow = true;
  return im;
}

/* ── Geometry helpers ── */

/* Camera unit facing +x: cast housing with a parting line, a lens barrel,
   a sun hood over it, two bolted ears and a sealed tail on the back face. */
function camUnit(wz, hy, dx, lensR = 0.008, frontX = null) {
  const g = new THREE.Group();
  const body = lib.cbox(dx, hy, wz, Math.min(0.004, hy * 0.12), M.sensor);
  g.add(body);
  const flash = lib.cbox(dx * 0.92, 0.0016, wz + 0.0012, 0.0004, M.sensor);
  flash.position.y = -hy * 0.08;
  g.add(flash);
  const face = dx / 2;
  const reach = (frontX != null ? frontX : face + 0.010) - face;
  const barrel = lensBarrel(lensR, reach, 12);
  barrel.position.x = face;
  g.add(barrel);
  const hood = lib.cbox(reach + 0.002, 0.0022, wz * 0.7, 0.0006, M.plastic);
  hood.position.set(face + reach / 2, hy / 2 - 0.0011, 0);
  g.add(hood);
  for (const s of [1, -1]) {
    const ear = lib.cbox(dx * 0.7, 0.0035, 0.010, 0.0009, M.castAlu);
    ear.position.set(-dx * 0.05, 0, s * (wz / 2 + 0.005));
    g.add(ear);
    g.add(screw([-dx * 0.05, 0.00175, s * (wz / 2 + 0.005)], [0, 1, 0], 0.0026, M.steel));
  }
  const tail = connector(0.0042, 0.014, M.plastic);
  tail.rotation.z = Math.PI / 2;
  tail.position.set(-face, -hy * 0.1, 0);
  g.add(tail);
  return g;
}

/* Imaging radar facing +x: die-cast box, finned back for the transmit chain,
   a moulded radome, a sealing bezel, two bolted ears and one sealed tail. */
function radarUnit(wz, hy, dx, frontX, fins = 7) {
  const g = new THREE.Group();
  const backX = frontX - 0.007 - dx;
  const housing = lib.cbox(dx, hy, wz, Math.min(0.004, hy * 0.09), M.darkSteel);
  housing.position.x = backX + dx / 2;
  g.add(housing);
  const flash = lib.cbox(dx * 0.9, 0.0016, wz + 0.0014, 0.0004, M.darkSteel);
  flash.position.set(backX + dx / 2, -hy * 0.06, 0);
  g.add(flash);
  const dome = lib.cbox(0.007, hy * 0.80, wz * 0.86, 0.0018, M.plastic);
  dome.position.x = frontX - 0.0035;
  g.add(dome);
  const bz = bezel(0.006, hy * 0.92, wz * 0.94, 0.0055, 0.0012, M.darkSteel);
  bz.position.x = frontX - 0.003;
  g.add(bz);
  if (fins > 0) {
    const bank = lib.fins(0.009, wz * 0.58, hy * 0.82, fins, 0.0022, M.darkSteel);
    bank.rotation.x = Math.PI / 2;
    bank.position.x = backX - 0.0055;
    g.add(bank);
  }
  for (const s of [1, -1]) {
    const ear = lib.cbox(dx * 0.62, 0.0035, wz * 0.28, 0.0009, M.castAlu);
    ear.position.set(backX + dx * 0.45, s * (hy / 2 + 0.00175), 0);
    g.add(ear);
    g.add(screw([backX + dx * 0.45, s * (hy / 2 + 0.0035), 0], [0, s, 0], 0.003, M.steel));
  }
  const tail = connector(0.0045, 0.013, M.plastic);
  tail.rotation.z = Math.PI / 2;
  tail.position.set(backX, 0, wz * 0.37);
  g.add(tail);
  return g;
}

/* ── The ring route ───────────────────────────────────────────────────────

   Gen 4 drew this loop at x +/-1.92 and |z| 0.66 and called it the cabin
   floor perimeter. It is not: the axles are at x +/-1.45, so that plan runs
   470 mm past them through the fairings, the castings, the knuckles, the
   discs, the hub bearings, the park brake and the rear structure, and it puts
   18 vertices inside the rear annulus the drivetrain owns outright.

   The plan below was chosen by measurement, not by drawing. A point-to-
   triangle clearance map over body-9, battery-7, drivetrain-9, wheels-9,
   hv-4, suspension-9, thermal-9 and interior-6 was swept at 5 mm along every
   candidate loop, and the widest clear channel at cabin-floor height is
   |z| 0.470 to 0.482 at y 0.388, with 7.5 mm of clearance at its tightest.
   Three things bound it: interior-6's rear bench pan inboard of |z| 0.49 over
   x -0.85 to -0.50, interior-6's front seat rails around x 0.22, and
   thermal-9's recovery core aft of x 1.00. The rear cross-car run lifts to
   y 0.445 because hv-4's rear motor cable crosses the centreline at y 0.302
   to 0.446 in x -1.30 to -1.10.

   Both loops clear the annulus by construction rather than by luck: the band
   is |z| 0.65 to 0.73 and nothing here is outboard of |z| 0.4865. */

const RING = { XF: 1.16, XR: 1.16, R: 0.14, yS: 0.388, yF: 0.398, yR: 0.445 };
const RING_W = [0.470, 0.482];
const RING_R = 0.0045;

/* Rounded rectangle in plan with a per-end height, returned as a closed
   world-space polyline. */
function ringPts(W) {
  const { XF, XR, R, yS, yF, yR } = RING;
  const pts = [], n = 5;
  const put = (x, y, z) => pts.push([x, y, z]);
  const lerp = (a, b, t) => a + (b - a) * t;
  const arc = (cx, cz, a0, a1, y0, y1) => {
    for (let i = 1; i < n; i++) {
      const t = i / n, a = lerp(a0, a1, t);
      put(cx + R * Math.cos(a), lerp(y0, y1, t), cz + R * Math.sin(a));
    }
  };
  /* Straight runs get intermediate stations so the cleats land every 200 mm
     or so. Gen 4's loop had control points only at its shape corners, which
     left a 2 m span of unsupported cable that read as a bare tube and was
     unsupported in the geometry as well as in the drawing. */
  const run = (x0, y0, z0, x1, y1, z1, k) => {
    for (let i = 1; i <= k; i++) {
      const t = i / k;
      put(lerp(x0, x1, t), lerp(y0, y1, t), lerp(z0, z1, t));
    }
  };
  put(XF - R, yS, W);
  arc(XF - R, W - R, Math.PI / 2, 0, yS, yF);
  put(XF, yF, W - R);
  run(XF, yF, W - R, XF, yF, -(W - R), 3);
  arc(XF - R, -(W - R), 0, -Math.PI / 2, yF, yS);
  put(XF - R, yS, -W);
  run(XF - R, yS, -W, -(XR - R), yS, -W, 6);
  arc(-(XR - R), -(W - R), -Math.PI / 2, -Math.PI, yS, yR);
  put(-XR, yR, -(W - R));
  run(-XR, yR, -(W - R), -XR, yR, W - R, 3);
  arc(-(XR - R), W - R, Math.PI, Math.PI / 2, yR, yS);
  run(-(XR - R), yS, W, XF - R, yS, W, 6);
  return pts;
}

/* Cable cleats, one per station, each gripping BOTH loops rather than one
   cleat a cable. Gen 4 clipped its two rings separately, which is two clips
   where a loom has one, and it doubles the draw calls and the triangles for
   nothing. Oriented to the local tangent so the block sits across the pair.
   One InstancedMesh, 44 triangles a cleat.

   Station spacing matters as much as the block does. Gen 4's loop carried
   control points only at its shape corners, so a 2 m flank had no cleat on
   it at all; the straight runs here are subdivided so the pitch is about
   330 mm on the flanks, which is what an automotive loom is actually
   clipped at, and tighter than that round the corners. */
function ringCleats(a0, b0) {
  const n = a0.length;
  const geo = lib.cbox(0.026, 0.014, 0.010, 0.0018, M.plasticLt).geometry;
  const x = new THREE.Vector3(), y = new THREE.Vector3(0, 1, 0), z = new THREE.Vector3();
  const a = new THREE.Vector3(), b = new THREE.Vector3(), p = new THREE.Vector3();
  return instanced(geo, M.plasticLt, n, (i, m) => {
    const j0 = (i + n - 1) % n, j1 = (i + 1) % n;
    a.set((a0[j0][0] + b0[j0][0]) / 2, (a0[j0][1] + b0[j0][1]) / 2, (a0[j0][2] + b0[j0][2]) / 2);
    b.set((a0[j1][0] + b0[j1][0]) / 2, (a0[j1][1] + b0[j1][1]) / 2, (a0[j1][2] + b0[j1][2]) / 2);
    p.set((a0[i][0] + b0[i][0]) / 2, (a0[i][1] + b0[i][1]) / 2, (a0[i][2] + b0[i][2]) / 2);
    z.subVectors(b, a).normalize();
    x.crossVectors(y, z).normalize();
    if (x.dot(p) < 0) x.multiplyScalar(-1);
    z.crossVectors(x, y).normalize();
    m.makeBasis(x, y, z);
    m.setPosition(p.x, p.y, p.z);
  });
}

/* ── The header casting ──────────────────────────────────────────────────

   The forward camera wedge and the driver monitor are one assembly on one
   cast rail behind the windshield header. Gen 4 built it at y 1.31 for a
   family of bodies whose roof inner surface ranges over 131 mm, and on
   body-9 that puts the wedge 6 mm outside the canopy: ray-swept straight
   down, the canopy surface above (0.42, 0) is y 1.3220 and the Gen 4 wedge
   reaches y 1.3283 over 118 crossing triangle pairs.

   autonomy-10 runs on one preset and one body, so it is drawn to that body.
   The frame origin drops 20 mm to y 1.290 and the wedge tops out at 1.3083,
   and the closest approach of the whole assembly to the canopy is 7.74 mm,
   measured SURFACE to SURFACE rather than nearest vertex. State the
   convention every time: a nearest-VERTEX reading of the same pair gives a
   different and flattering answer, which is the correction HANDOFF.md
   records against the wheels-9 panel. Rail and arm meet
   on the plane z = -0.075 in the frame and a bolted splice plate laps the
   joint, both halves being cbox faces on the same plane, so the contact is
   0.0 mm rather than a tolerance. */

const HDR = { pos: [0.42, 1.290, 0], tilt: -0.1, joint: -0.075 };

function headerFrame() {
  const g = new THREE.Group();
  g.rotation.z = HDR.tilt;
  g.position.set(HDR.pos[0], HDR.pos[1], HDR.pos[2]);
  return g;
}

/* Antenna seats: [x station, seat y, roof slope aft in m/m]. The seat y is
   the HIGHEST canopy surface under the 50 mm foot, ray-swept off body-9's
   built mesh, plus a bond pad. Roof at z = 0 measures 1.3626 at x 0.225 and
   1.3622 at 0.275, and 1.3678 at x -0.425 and 1.3674 at -0.375, so each
   50 mm foot is seated on 1.3626 and 1.3678 respectively. The two stations
   are 0.650 m apart, which is the baseline the panel publishes, and both sit
   on the flat between the crown at x -0.45 and the windscreen break at
   x 0.30 rather than on the steep aft fall. */
const ROOF_SEAT = [
  /* x, seat y, coax direction in x, roof rise per metre along that run */
  [0.25, 1.3638, -1, 0.008],
  [-0.40, 1.3690, +1, -0.008],
];

export function build() {
  const sys = new THREE.Group();

  /* ── cameras ─────────────────────────────────────────────────────────
     Wedge of two behind the windshield header, on the shared cast rail. */
  const camWedge = lib.part('cameras', [0.2, 0.4, 0]);
  const wf = headerFrame();

  const wedge = new THREE.Group();
  wedge.add(lib.cbox(0.055, 0.032, 0.12, 0.004, M.sensor));
  const wflash = lib.cbox(0.052, 0.0016, 0.1214, 0.0004, M.sensor);
  wflash.position.y = -0.003;
  wedge.add(wflash);
  /* wide left, telephoto right, both stopping on the same plane */
  for (const [lr, z] of [[0.0105, -0.03], [0.0072, 0.03]]) {
    const bar = lensBarrel(lr, 0.0095, 12);
    bar.position.set(0.0275, 0, z);
    wedge.add(bar);
    const hood = lib.cbox(0.0105, 0.0022, 0.028, 0.0006, M.plastic);
    hood.position.set(0.0323, lr + 0.0026, z);
    wedge.add(hood);
  }
  const wtail = connector(0.0048, 0.016, M.plastic);
  wtail.rotation.z = Math.PI / 2;
  wtail.position.set(-0.0275, -0.004, 0.030);
  wedge.add(wtail);
  wf.add(wedge);

  /* the cast rail the wedge and the driver monitor share */
  const rail = lib.cbox(0.050, 0.015, 0.150, 0.004, M.castAlu);
  rail.position.set(0, -0.0235, 0);
  wf.add(rail);
  const railRib = lib.cbox(0.014, 0.008, 0.060, 0.002, M.castAlu);
  railRib.position.set(0, -0.0345, 0);
  wf.add(railRib);
  /* The four bolts that pull the wedge down onto the rail, on the underside
     of two machined pads, which is the only face here anybody can see. */
  for (const sz of [1, -1]) {
    const bossPad = lib.cbox(0.044, 0.003, 0.016, 0.0008, M.alu);
    bossPad.position.set(0, -0.0325, sz * 0.058);
    wf.add(bossPad);
    for (const sx of [1, -1]) {
      wf.add(screw([sx * 0.019, -0.0340, sz * 0.058], [0, -1, 0], 0.0026, M.steel));
    }
  }
  camWedge.add(wf);
  sys.add(camWedge);

  /* wide-field B-pillar cameras, both sides; repeaters are deleted */
  for (const s of [1, -1]) {
    const bp = lib.part('cameras', [0, 0.2, 0.5 * s]);
    const bcam = camUnit(0.036, 0.03, 0.024, 0.009, 0.022);
    bcam.rotation.y = -1.1 * s;
    bcam.position.set(0.1, 1.0, 0.9 * s);
    bp.add(bcam);
    /* Cast foot standing off the pillar flange behind the camera. Two side
       plates rather than one pad on the axis, because the camera's own
       harness tail leaves the back face on that axis, and the pads sit close
       in at local z +/-0.010 because the camera is yawed 63 degrees and a pad
       offset along its own z sweeps across the door instead of standing off
       it. Measured on the built mesh the mount's most inboard point is
       |z| 0.8868, 71.49 mm of true surface separation from body-9's door
       skin. Say which object that is, because it is not the whole assembly:
       the camera's own harness tail boot swings further inboard than the
       mount it stands beside, to |z| 0.8736 and 62.59 mm, and that is the
       figure the corner is actually held to. Both off one sweep. */
    const foot = new THREE.Group();
    for (const fz of [1, -1]) {
      const pad = lib.cbox(0.006, 0.020, 0.006, 0.0009, M.castAlu);
      pad.position.set(-0.0140, 0, fz * 0.0100);
      foot.add(pad);
      foot.add(screw([-0.017, 0, fz * 0.0100], [-1, 0, 0], 0.0024, M.steel));
    }
    foot.rotation.y = -1.1 * s;
    foot.position.set(0.1, 1.0, 0.9 * s);
    bp.add(foot);
    sys.add(bp);
  }

  /* rear camera above the plate recess */
  const camRear = lib.part('cameras', [-0.5, 0.25, 0]);
  const rc = camUnit(0.035, 0.025, 0.02, 0.007, 0.018);
  rc.rotation.y = Math.PI;
  rc.position.set(-2.24, 0.96, 0);
  camRear.add(rc);
  /* Washer nozzle ABOVE the lens: the kamm flap is only 9 mm below this
     camera and a nozzle hung under it sat 5.7 mm inside the flap. */
  const nozBody = lib.cbox(0.012, 0.009, 0.010, 0.002, M.plasticLt);
  nozBody.position.set(-2.2325, 0.9805, 0.022);
  camRear.add(nozBody);
  const noz = lib.cyl(0.0022, 0.011, M.plasticLt, 8);
  noz.rotation.z = Math.PI / 2;
  noz.position.set(-2.2440, 0.9805, 0.022);
  camRear.add(noz);
  sys.add(camRear);

  /* Thermal imager in the nose face. Gen 4 put the germanium window on
     x 2.367 and body-9's skin is at 2.375 with a surface that measures
     1.6 mm through it, so the whole casing comes back 6 mm. */
  const camTherm = lib.part('cameras', [0.55, 0.12, 0]);
  const th = new THREE.Group();
  th.add(lib.cbox(0.030, 0.034, 0.034, 0.0035, M.sensor));
  const thFlash = lib.cbox(0.028, 0.0016, 0.0352, 0.0004, M.sensor);
  thFlash.position.y = -0.004;
  th.add(thFlash);
  /* Barrel, heater ring, retaining ring, germanium window, stepping down in
     radius so each ring shows as a real annulus rather than hiding inside
     the one behind it. */
  const gBarrel = lib.cyl(0.0140, 0.0050, M.darkSteel, 14);
  gBarrel.rotation.z = Math.PI / 2; gBarrel.position.x = 0.0155;
  th.add(gBarrel);
  const heat = lib.cyl(0.0133, 0.0016, M.copper, 14);
  heat.rotation.z = Math.PI / 2; heat.position.x = 0.0188;
  th.add(heat);
  const gRing = lib.cyl(0.0124, 0.0020, M.darkSteel, 14);
  gRing.rotation.z = Math.PI / 2; gRing.position.x = 0.0206;
  th.add(gRing);
  const ge = lib.cyl(0.0106, 0.0030, M.busbar, 16);
  ge.rotation.z = Math.PI / 2; ge.position.x = 0.0205;
  th.add(ge);
  for (const s of [1, -1]) {
    const ear = lib.cbox(0.018, 0.0032, 0.010, 0.0008, M.castAlu);
    ear.position.set(-0.004, 0, s * 0.0220);
    th.add(ear);
    th.add(screw([-0.004, 0.0016, s * 0.0220], [0, 1, 0], 0.0026, M.steel));
  }
  /* The tail leaves the top, not the back: the front radar's radome sits
     behind this casing and a tail out of the back face went inside it. */
  const thTail = connector(0.0042, 0.013, M.plastic);
  thTail.position.set(-0.004, 0.017, 0);
  th.add(thTail);
  th.position.set(2.339, 0.53, 0);
  camTherm.add(th);
  sys.add(camTherm);

  /* ── radars ──────────────────────────────────────────────────────────
     Front unit ahead of the thermal stack. The radome stops on x 2.316, the
     fin bank is on 2.271 and the connector boot reaches back to 2.266, all
     three read off the built mesh. The setback figures autonomy-4.js quotes
     beside those, 6.0 mm behind body-4's intake mouth and 14.0 mm behind the
     imager, do NOT carry: body-4 is not in this preset, and this module's own
     thermal imager came back 6 mm, so its casing now starts at x 2.324 and
     the radome sits 8.0 mm behind it. The neighbour that actually binds this
     unit on body-9 is the crash rail, 0.41 mm off the connector boot.

     The four corner units are in ONE part group a side rather than four
     groups, which is 10 fewer draw calls for the same geometry, and both
     pairs moved. Gen 4 drew the front pair at (2.20, 0.50, 0.55), 28.66 mm
     inside the crash rail over 172 triangle pairs, and the rear pair at
     (-2.20, 0.50, 0.55), 26.00 mm inside the rear casting over 152. Swept for
     empty pockets on the built body, the mount points (2.16, 0.44, 0.58) and
     (-2.15, 0.50, 0.66) clear the nearest structure by 90.5 and 82.5 mm as
     POINTS. What matters is the unit around them, and that is measured as
     well: built and swept surface to surface, the front corner unit clears
     the crash rail by 38.59 mm and the rear by 37.66 mm to the casting. Quote
     the second pair, never the first, because a 90 mm box hung on a point
     does not keep the point's clearance. */
  const radFront = lib.part('radars', [0.55, 0, 0]);
  const fr = radarUnit(0.150, 0.086, 0.028, 0.036, 9);
  fr.position.set(2.280, 0.50, 0);
  radFront.add(fr);
  sys.add(radFront);

  for (const s of [1, -1]) {
    const cnr = lib.part('radars', [0.10, -0.05, 0.45 * s]);
    const fu = radarUnit(0.090, 0.060, 0.020, 0.015, 5);
    fu.rotation.y = -0.7 * s;
    fu.position.set(2.16, 0.44, 0.58 * s);
    cnr.add(fu);
    const ru = radarUnit(0.090, 0.060, 0.020, 0.015, 5);
    ru.rotation.y = Math.PI + 0.7 * s;
    ru.position.set(-2.15, 0.50, 0.66 * s);
    cnr.add(ru);
    sys.add(cnr);
  }

  /* ── lidar ───────────────────────────────────────────────────────────
     Flash pucks behind the light band ends, toed out 25 degrees. Gen 4 put
     the window face 4.8 mm through body-9's band over 140 triangle pairs, so
     each puck came back 10 mm to x 2.320 and the window face with it. */
  for (const s of [1, -1]) {
    const lid = lib.part('lidar', [0.5, 0.15, 0.3 * s]);
    const puck = new THREE.Group();
    /* The casting stops on x 0.020. It used to run to 0.026 and its end cap
       sealed the emitter face, the emitter array and the receiver objective
       inside it: 1,100 triangles of the one thing this part is supposed to
       show. The aperture is open from 0.020 forward. */
    const body = lib.cyl(0.032, 0.045, M.castAlu, 20);
    body.rotation.z = Math.PI / 2;
    body.position.x = -0.0025;
    puck.add(body);
    /* annular cooling fins: a VCSEL array is a heater with a duty cycle */
    for (const fx of [-0.006, -0.014, -0.022]) {
      const fin = lib.cyl(0.0375, 0.0032, M.castAlu, 20);
      fin.rotation.z = Math.PI / 2; fin.position.x = fx;
      puck.add(fin);
    }
    const bez = annulus(0.0248, 0.0310, 0.0090, M.darkSteel);
    bez.position.x = 0.0245;
    puck.add(bez);
    const wheat = annulus(0.0222, 0.0244, 0.0016, M.copper);
    wheat.position.x = 0.0262;
    puck.add(wheat);
    const win = lib.cyl(0.0245, 0.0040, M.glass, 20);
    win.rotation.z = Math.PI / 2; win.position.x = 0.029;
    puck.add(win);
    /* VCSEL tile: 24 emitters on one InstancedMesh, 940 nm, Class 1 */
    const tile = lib.cbox(0.0022, 0.0200, 0.0230, 0.0005, M.pcb);
    tile.position.set(0.0232, 0, -0.0105);
    puck.add(tile);
    const dotGeo = new THREE.BoxGeometry(0.0011, 0.0022, 0.0022);
    puck.add(instanced(dotGeo, M.lamp, 24, (i, m) => {
      const r = Math.floor(i / 6), c = i % 6;
      m.makeTranslation(0.0245, (r - 1.5) * 0.0045, -0.0105 + (c - 2.5) * 0.0040);
    }));
    const spadB = lib.cyl(0.0092, 0.0040, M.darkSteel, 12);
    spadB.rotation.z = Math.PI / 2; spadB.position.set(0.0235, 0, 0.0125);
    puck.add(spadB);
    const spadL = lib.cyl(0.0074, 0.0016, M.darkSteel, 12);
    spadL.rotation.z = Math.PI / 2; spadL.position.set(0.0258, 0, 0.0125);
    puck.add(spadL);
    const board = lib.cbox(0.012, 0.050, 0.050, 0.003, M.pcb);
    board.position.x = -0.031;
    puck.add(board);
    /* The tail comes straight out of the back, on the axis: offset to one
       side it swung 10 mm further outboard once the toe-out is applied. */
    const ltail = connector(0.0048, 0.013, M.plastic);
    ltail.rotation.z = Math.PI / 2;
    ltail.position.set(-0.037, 0, 0);
    puck.add(ltail);
    /* Ears sideways, not up: the body skin is 40 mm above this puck and an
       ear plus a bolt head on the crown left 2.4 mm of it. */
    for (const sz of [1, -1]) {
      const ear = lib.cbox(0.026, 0.014, 0.0035, 0.0009, M.castAlu);
      ear.position.set(-0.006, 0, sz * 0.0335);
      puck.add(ear);
      puck.add(screw([-0.006, 0, sz * 0.0353], [0, 0, sz], 0.0030, M.steel));
    }
    puck.rotation.y = -0.44 * s;
    puck.position.set(2.320, 0.615, 0.30 * s);
    lid.add(puck);
    sys.add(lid);
  }

  /* ── the asymmetric triplex ──────────────────────────────────────────
     One cold plate under the rear seat carrying three lanes across z, the
     voter bar on the forward edge, two diode-ORed 48 V feeds and one coolant
     tee. The cold plate does NOT shrink: it is sized by the 640 W peak and
     the peak is held. What shrinks is the flank fin bank, which is sized by
     the load the stack has to carry through a coolant pump failure, and that
     load halves when the shed state is one reduced-rate lane instead of one
     full one. 13 fins at 34 mm become 9 at 17, which is 1.17 kg, and 0.2 kg
     of it comes back as the reserve lane's hold-up capacitor bank.

     The three lanes are now built to be told apart, because that is the
     whole architecture: lane A carries a tall vapour-chamber lid, four DRAM
     packages and a six-phase power stage; lane B carries a low lid, two DRAM
     packages, a three-phase stage and its own separate program store, which
     is the diverse stack; lane C carries a low lid, two DRAM, a two-phase
     stage and four hold-up capacitors that hold its rails up through the
     60 ms wake. One bar, two bars, three bars cast into the deck edge.

     Measured envelope: y 0.3895 to 0.4661. Do not quote a clearance to
     interior-6/rear-bench from the coordinate alone: the bench has a
     centreline pan whose surface passes through (-0.740, 0.455, 0), which is
     why the pose IMUs moved forward onto the lane boards at x -0.545, where
     the same sweep reads 31.90 mm. The two coolant spigot ends stay on
     x -0.795, which is the plane thermal-6, -7 and -9 all land their glycol
     loop on, and that contact is this part's attachment. It is also the one
     surface pair this module still crosses, 24 triangle pairs to 2.29 mm
     carried from Gen 4 unchanged, and the panel's failure list says so
     rather than leaving it for a checker to find. */
  const comp = lib.part('compute', [0, -0.75, 0]);
  const CX = -0.55;

  const cold = lib.cbox(0.420, 0.044, 0.300, 0.005, M.castAlu);
  cold.position.set(CX, 0.417, 0);
  comp.add(cold);
  const cflash = lib.cbox(0.4245, 0.0022, 0.3045, 0.0006, M.castAlu);
  cflash.position.set(CX, 0.4115, 0);
  comp.add(cflash);
  const deck = lib.cbox(0.404, 0.007, 0.284, 0.0015, M.alu);
  deck.position.set(CX, 0.4425, 0);
  comp.add(deck);
  const ribs = lib.fins(0.380, 0.0055, 0.260, 9, 0.005, M.castAlu);
  ribs.position.set(CX, 0.3922, 0);
  comp.add(ribs);

  /* three lanes, and they are three different machines */
  const LANES = [
    { z: -0.095, bars: 1, lid: 0.0060, dram: 4, phases: 6, holdup: 0, store: false },
    { z: 0.000, bars: 2, lid: 0.0028, dram: 2, phases: 3, holdup: 0, store: true },
    { z: 0.095, bars: 3, lid: 0.0028, dram: 2, phases: 2, holdup: 4, store: false },
  ];
  for (const L of LANES) {
    const zi = L.z;
    for (const sx of [1, -1]) for (const sz of [1, -1]) {
      const so = lib.cyl(0.0022, 0.0035, M.alu, 6);
      so.position.set(-0.545 + sx * 0.130, 0.44775, zi + sz * 0.033);
      comp.add(so);
    }
    const pcb = lib.cbox(0.280, 0.0016, 0.082, 0.0005, M.pcb);
    pcb.position.set(-0.545, 0.4503, zi);
    comp.add(pcb);
    /* SoC: identical substrate on every lane, because the silicon is
       identical and every lane is promotable. The LID is what differs. */
    const sub = lib.cbox(0.054, 0.0022, 0.054, 0.0006, M.pcb);
    sub.position.set(-0.600, 0.4522, zi);
    comp.add(sub);
    const ihs = lib.cbox(0.042, L.lid, 0.042, 0.0009, M.alu);
    ihs.position.set(-0.600, 0.4533 + L.lid / 2, zi);
    comp.add(ihs);
    /* DRAM: four packages on the primary, two on a lane whose working set
       is resident on die */
    for (let i = 0; i < L.dram; i++) {
      const d = lib.cbox(0.010, 0.0014, 0.019, 0.0003, M.plastic);
      d.position.set(-0.500 + i * 0.014, 0.4518, zi);
      comp.add(d);
    }
    /* Power stage: one inductor a phase, so the lane's rate shows in its own
       copper before anybody opens the panel. All three bricks are aligned on
       their forward edge at x -0.6270, which is 6.0 mm clear of the SoC lid,
       so the lane that needs six phases is visibly the longest. */
    const vrmW = 0.006 + L.phases * 0.0042;
    const vrmX = -0.6270 - vrmW / 2;
    const vrm = lib.cbox(vrmW, 0.005, 0.030, 0.0012, M.darkSteel);
    vrm.position.set(vrmX, 0.4536, zi);
    comp.add(vrm);
    for (let i = 0; i < L.phases; i++) {
      const ind = lib.cbox(0.0034, 0.0040, 0.0060, 0.0008, M.copper);
      ind.position.set(vrmX - vrmW / 2 + 0.0051 + i * 0.0042, 0.4581, zi + 0.0095);
      comp.add(ind);
    }
    /* the diverse checker's own program store, physically separate from the
       primary's: a different part, holding a different binary */
    if (L.store) {
      const nor = lib.cbox(0.011, 0.0016, 0.008, 0.0004, M.darkSteel);
      nor.position.set(-0.4560, 0.4519, zi - 0.026);
      comp.add(nor);
    }
    /* hold-up bank: what keeps the reserve lane's rails alive across the
       60 ms it takes to come out of retention at full clock */
    for (let i = 0; i < L.holdup; i++) {
      const cap = lib.cyl(0.0035, 0.0090, M.alu, 10);
      cap.position.set(-0.4700 + i * 0.0090, 0.4556, zi - 0.026);
      comp.add(cap);
    }
    /* Stiffener frame round the SoC substrate. A 54 mm package on a 1.6 mm
       board warps as it heats, and the frame is what a real one carries. */
    for (const sz2 of [1, -1]) {
      const bar = lib.cbox(0.062, 0.0030, 0.005, 0.0008, M.alu);
      bar.position.set(-0.600, 0.4526, zi + sz2 * 0.0295);
      comp.add(bar);
      const bar2 = lib.cbox(0.005, 0.0030, 0.054, 0.0008, M.alu);
      bar2.position.set(-0.600 + sz2 * 0.0295, 0.4526, zi);
      comp.add(bar2);
    }
    /* Decoupling bank on the board's forward edge, two plus one a phase, so
       the lane carrying six phases visibly carries the current for them. */
    for (let i = 0; i < 2 + L.phases; i++) {
      /* lib.box, not lib.cbox: a 2.6 mm ceramic has no chamfer anybody can
         see and 32 triangles each is 544 across the three lanes. */
      const cap = lib.box(0.0026, 0.0018, 0.0045, M.darkSteel);
      cap.position.set(-0.5620 + i * 0.0038, 0.4520, zi - 0.0335);
      comp.add(cap);
    }
    /* board edge header, voter-side connector, and the jumper between */
    const hdr = lib.cbox(0.009, 0.007, 0.026, 0.0015, M.plastic);
    hdr.position.set(-0.4095, 0.4546, zi);
    comp.add(hdr);
    const vc = connector(0.0042, 0.010, M.plastic);
    vc.rotation.z = Math.PI / 2;
    vc.position.set(-0.3775, 0.4535, zi);
    comp.add(vc);
    comp.add(lib.tube([
      [-0.3895, 0.4535, zi],
      [-0.3960, 0.4562, zi],
      [-0.4050, 0.4552, zi],
    ], 0.0022, M.plasticLt, false, 12));
    /* lane number cast into the deck edge: one bar, two bars, three */
    for (let b = 0; b < L.bars; b++) {
      const bar = lib.cbox(0.010, 0.0014, 0.0025, 0.0004, M.alu);
      bar.position.set(-0.3900, 0.4467, zi - 0.010 + b * 0.007);
      comp.add(bar);
    }
  }

  /* the voter: a sealed can with a machined lid and four screws, because it
     is the one element the architecture cannot vote on */
  const voter = lib.cbox(0.035, 0.018, 0.270, 0.0035, M.darkSteel);
  voter.position.set(-0.36, 0.454, 0);
  comp.add(voter);
  const vlid = lib.cbox(0.029, 0.0030, 0.264, 0.0008, M.alu);
  vlid.position.set(-0.36, 0.4625, 0);
  comp.add(vlid);
  for (const sz of [-0.125, -0.042, 0.042, 0.125]) {
    comp.add(screw([-0.36, 0.4640, sz], [0, 1, 0], 0.0028, M.steel));
  }

  /* Flank heatsink banks, half the height Gen 4 needed. These are the
     coolant-loss reserve, not the steady-state path, and the shed load they
     have to carry to a stop halved with the architecture. */
  for (const s of [1, -1]) {
    const base = lib.cbox(0.310, 0.008, 0.048, 0.0018, M.castAlu);
    base.position.set(CX, 0.399, 0.176 * s);
    comp.add(base);
    const bank = lib.fins(0.300, 0.017, 0.044, 9, 0.0025, M.castAlu);
    bank.position.set(CX, 0.4115, 0.176 * s);
    comp.add(bank);
    for (const sx of [1, -1]) {
      /* End cap butted to the fin bank rather than lapping it: the bank now
         stops on x -0.700 and +0.400 and the cap's inner face is on the same
         plane, which is a joint and not a 1 mm interference. */
      const cap = lib.cbox(0.006, 0.025, 0.048, 0.0015, M.castAlu);
      cap.position.set(CX + sx * 0.153, 0.4075, 0.176 * s);
      comp.add(cap);
    }
  }

  /* four mounting ears, fore and aft, with the bolt on the visible face */
  for (const sx of [1, -1]) for (const sz of [1, -1]) {
    const ear = lib.cbox(0.026, 0.010, 0.040, 0.0025, M.castAlu);
    ear.position.set(CX + sx * 0.215, 0.400, sz * 0.100);
    comp.add(ear);
    comp.add(screw([CX + sx * 0.215, 0.405, sz * 0.100], [0, 1, 0], 0.0035, M.steel, 'torx'));
  }

  /* two 48 V feeds from separate hv-4 zonal controllers, diode-ORed into one
     block, then three orange drops so each lane is fed on its own */
  const feed = lib.cbox(0.026, 0.022, 0.088, 0.0035, M.hv);
  feed.position.set(-0.3350, 0.4150, 0);
  comp.add(feed);
  /* The two feeds come in on top of the block, not out of its nose: this
     assembly's forward face is the tightest thing on the cold plate. */
  for (const s of [1, -1]) {
    const fc = connector(0.0050, 0.014, M.hv);
    fc.position.set(-0.3350, 0.4260, 0.030 * s);
    comp.add(fc);
  }
  /* Each feed arrives along the top of its own heatsink bank and drops into
     the block. Routing them over the deck was tried and abandoned: the voter
     bar spans the whole forward edge and the rear bench ceiling is y 0.475,
     so there is no lane over it and no lane under it. */
  for (const s of [1, -1]) {
    comp.add(lib.tube([
      [-0.3350, 0.4410, s * 0.030],
      [-0.3400, 0.4440, s * 0.090],
      [-0.3560, 0.4440, s * 0.150],
      [-0.4000, 0.4430, s * 0.176],
      [-0.5500, 0.4430, s * 0.176],
      [-0.7060, 0.4430, s * 0.176],
    ], 0.0026, M.hv, false, 26));
    const gland = lib.cbox(0.010, 0.011, 0.014, 0.0025, M.plasticLt);
    gland.position.set(-0.7100, 0.4430, s * 0.176);
    comp.add(gland);
  }

  /* the coolant tee. The spigot ends stay on x -0.795 because that is the
     plane thermal lands its loop on; the boss, the O-ring land and the hose
     barbs all grow inboard of it. */
  for (const [z, mat] of [[-0.05, M.coolant], [0.05, M.coolantHot]]) {
    const boss = lib.cyl(0.0135, 0.0070, M.castAlu, 12);
    boss.rotation.z = Math.PI / 2;
    boss.position.set(-0.7635, 0.42, z);
    comp.add(boss);
    const stub = lib.cyl(0.008, 0.050, mat, 12);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(-0.77, 0.42, z);
    comp.add(stub);
    for (const bx of [-0.7810, -0.7900]) {
      const barb = lib.cyl(0.0097, 0.0032, mat, 12);
      barb.rotation.z = Math.PI / 2;
      barb.position.set(bx, 0.42, z);
      comp.add(barb);
    }
  }

  /* earth stud with its ring terminal: the chassis reference for three lanes
     that have to agree about what zero volts means */
  const stud = lib.cyl(0.0030, 0.0090, M.busbar, 8);
  stud.position.set(-0.7300, 0.4505, -0.140);
  comp.add(stud);
  const lug = lib.cbox(0.018, 0.0016, 0.010, 0.0004, M.copper);
  lug.position.set(-0.7205, 0.4548, -0.140);
  comp.add(lug);
  comp.add(screw([-0.7300, 0.4556, -0.140], [0, 1, 0], 0.0032, M.steel));

  sys.add(comp);

  /* ── driver monitor ──────────────────────────────────────────────────
     The arm bolts to the header casting at z -0.075 in the shared frame and
     carries the pod at its outboard end, tilted down onto the driver's face.
     Aft is -x in this frame and the pod adds 0.40 rad about z, but the
     frame's own -0.1 rad tilts the same axis back up, so the two subtract.
     The whole assembly dropped 20 mm with the rail, which is HDR.pos going
     from autonomy-4.js's 1.310 to 1.290 while the pod's own local position
     is unchanged; the pod's optical axis is unchanged at 17.2 degrees below
     horizontal too, because a translation does not rotate anything. */
  const dmsG = lib.part('dms', [0.3, 0.5, -0.4]);
  const df = headerFrame();

  const arm = lib.cbox(0.038, 0.015, 0.221, 0.003, M.castAlu);
  arm.position.set(0, -0.0235, -0.1855);
  df.add(arm);
  const armRib = lib.cbox(0.012, 0.007, 0.160, 0.0018, M.castAlu);
  armRib.position.set(0, -0.0345, -0.2000);
  df.add(armRib);
  const splice = lib.cbox(0.030, 0.004, 0.080, 0.001, M.alu);
  splice.position.set(0, -0.0330, -0.0750);
  df.add(splice);
  for (const sx of [1, -1]) for (const sz of [-0.045, -0.105]) {
    df.add(screw([sx * 0.010, -0.0350, sz], [0, -1, 0], 0.0028, M.steel));
  }

  /* The drop bracket off the arm's end. The pod is tilted and the arm is
     not, so something has to make the transition: a clevis, two side plates
     lapping the arm with a bolt through each, because that is the joint a
     bracket like this has and the bolt heads land on a face somebody sees. */
  const drop = lib.cbox(0.026, 0.019, 0.032, 0.0025, M.castAlu);
  drop.position.set(-0.002, -0.0400, -0.3020);
  df.add(drop);
  for (const sx of [1, -1]) {
    const plate = lib.cbox(0.004, 0.026, 0.030, 0.0009, M.castAlu);
    plate.position.set(sx * 0.021, -0.0330, -0.3000);
    df.add(plate);
    df.add(screw([sx * 0.023, -0.0255, -0.2905], [sx, 0, 0], 0.0026, M.steel));
  }

  /* the pod: moulded shell, parting line, framed aperture, lens barrel with
     a hood, and two IR emitters that are separate optics */
  const pod = new THREE.Group();
  pod.rotation.z = 0.40;
  pod.position.set(-0.002, -0.0530, -0.3020);

  pod.add(lib.cbox(0.044, 0.030, 0.046, 0.0035, M.sensor));
  const pflash = lib.cbox(0.0446, 0.0016, 0.0466, 0.0004, M.sensor);
  pflash.position.y = -0.004;
  pod.add(pflash);
  const flange = lib.cbox(0.030, 0.004, 0.038, 0.001, M.castAlu);
  flange.position.set(0.001, 0.0170, 0);
  pod.add(flange);
  const pbz = bezel(0.005, 0.026, 0.044, 0.0045, 0.0012, M.darkSteel);
  pbz.position.x = -0.0235;
  pod.add(pbz);
  const barrel = lensBarrel(0.0072, 0.0090, 12, M.sensor);
  barrel.rotation.y = Math.PI;
  barrel.position.x = -0.0215;
  pod.add(barrel);
  const phood = lib.cbox(0.0100, 0.0022, 0.020, 0.0006, M.plastic);
  phood.position.set(-0.0272, 0.0142, 0);
  pod.add(phood);
  for (const sz of [1, -1]) {
    const eb = lib.cyl(0.0045, 0.0055, M.darkSteel, 10);
    eb.rotation.z = Math.PI / 2;
    eb.position.set(-0.0245, -0.0012, sz * 0.0128);
    pod.add(eb);
    const el = lib.cyl(0.0036, 0.0016, M.sensor, 10);
    el.rotation.z = Math.PI / 2;
    el.position.set(-0.0278, -0.0012, sz * 0.0128);
    pod.add(el);
  }
  /* sealed tail: only states leave this camera, never video */
  const ptail = connector(0.0042, 0.013, M.plastic);
  ptail.rotation.z = -Math.PI / 2;
  ptail.position.set(0.0220, -0.004, 0);
  pod.add(ptail);
  df.add(pod);

  /* the harness back to the rail, clipped to the arm rather than floating */
  df.add(lib.tube([
    [0.0318, -0.0431, -0.3020],
    [0.0230, -0.0400, -0.2930],
    [0.0125, -0.0355, -0.2780],
    [0.0125, -0.0355, -0.2000],
    [0.0125, -0.0355, -0.1200],
    [0.0100, -0.0362, -0.0600],
  ], 0.0026, M.plasticLt, false, 24));
  for (const cz of [-0.250, -0.170, -0.100]) {
    const clip = lib.cbox(0.010, 0.010, 0.006, 0.0015, M.plasticLt);
    clip.position.set(0.0125, -0.0355, cz);
    df.add(clip);
  }
  dmsG.add(df);
  sys.add(dmsG);

  /* ── pose unit ───────────────────────────────────────────────────────
     Two low-profile patch antennas BONDED TO THE ROOF, which is the fix for
     design/area-rezero.md's smaller escaped-geometry defect: Gen 4 put these
     at y 1.4108 to 1.4291 through a canopy that closes at 1.368, so 61 mm of
     hardware stood in open air on four rungs.

     The seat is a measurement, not a coordinate. A vertical ray swept onto
     body-9's built canopy gives 1.3636 at x 0.10 and 1.3603 at x -0.55, and
     the crown is 1.3680 at x -0.45, so the surface FALLS both ways from
     there and a flat 50 mm foot laid on the local height buries its far edge
     in the glass. Each foot is seated on the highest point under its own
     footprint instead, ROOF_SEAT below, which lands the bond line 0.2 mm
     proud at the high edge and about 1.6 mm proud at the low one. That is a
     bond line, and it is the same lesson design/crispness.md files about
     hardware placed on a groove floor as though the floor were a plane.

     The coax leaves each foot horizontally and runs aft to a bonded grommet
     rather than piercing the glass, so nothing here penetrates the body. */
  const ant = lib.part('gnss-imu', [0, 0.6, 0]);
  for (const [ax, seatY, dir, slope] of ROOF_SEAT) {
    const foot = lib.cyl(0.0250, 0.0030, M.alu, 20);
    foot.position.set(ax, seatY + 0.0015, 0);
    ant.add(foot);
    const dome = lib.lathe([
      [0.0000, 0.0000], [0.0215, 0.0000], [0.0220, 0.0012],
      [0.0208, 0.0044], [0.0170, 0.0058], [0.0000, 0.0060],
    ], M.plastic, 16);
    dome.position.set(ax, seatY + 0.0030, 0);
    ant.add(dome);
    /* cast index lug on the foot, not a patch under the radome: the ceramic
       patch is inside an opaque moulding and modelling it buys 44 triangles
       of geometry nobody can ever see */
    const lug2 = lib.cbox(0.008, 0.0030, 0.014, 0.0008, M.alu);
    lug2.position.set(ax + 0.0275, seatY + 0.0015, 0);
    ant.add(lug2);
    /* Coax along the glass to a bonded grommet, on the roof's own measured
       slope rather than on a horizontal somebody hoped it was on, and BOTH
       runs head inboard toward the middle of the roof rather than outboard.
       That is not styling. interior-6's canopy liner stands as much as 35 mm
       OUTSIDE the canopy it lines, which design/area-rezero.md logs as an
       open defect worth 0.072 m2, and its surface sweeps down through
       roof-height hardware between x -0.56 and -0.64. A run aft from the
       rear antenna crossed it over 48 triangle pairs to 5.4 mm; the same run
       forward stays clear of it, and of everything else, entirely. */
    ant.add(lib.tube([
      [ax + dir * 0.020, seatY + 0.0034, 0.004],
      [ax + dir * 0.032, seatY + 0.0032 + slope * 0.012, 0.010],
      [ax + dir * 0.045, seatY + 0.0030 + slope * 0.025, 0.012],
    ], 0.0026, M.plasticLt, false, 10));
    const grom = lib.cbox(0.014, 0.0060, 0.012, 0.0015, M.plasticLt);
    grom.position.set(ax + dir * 0.049, seatY + 0.0030 + slope * 0.029, 0.012);
    ant.add(grom);
    for (const sz of [1, -1]) ant.add(screw([ax, seatY + 0.0030, sz * 0.0205], [0, 1, 0], 0.0022, M.steel));
  }
  sys.add(ant);

  /* Three IMUs, one per compute lane, and now actually ON the lane they
     belong to. Gen 4 stood them on the plate at x -0.740, which is where
     interior-6's rear bench has a centreline pan whose surface passes
     through (-0.740, 0.455, 0), so the blocks were 3.2 mm inside it over 40
     triangle pairs. Each one now sits on its own board at x -0.545, in the
     clear span between the SoC lid at -0.579 and the first DRAM package at
     -0.505, with the bench ceiling 34 mm above it. */
  const imus = lib.part('gnss-imu', [0.25, -0.75, 0.35]);
  for (const zi of [-0.095, 0, 0.095]) {
    const base = lib.cbox(0.022, 0.006, 0.022, 0.0015, M.alu);
    base.position.set(-0.545, 0.4541, zi);
    imus.add(base);
    const lid = lib.cbox(0.018, 0.005, 0.018, 0.0012, M.darkSteel);
    lid.position.set(-0.545, 0.4596, zi);
    imus.add(lid);
    for (const sx of [1, -1]) for (const sz of [1, -1]) {
      imus.add(screw([-0.545 + sx * 0.0085, 0.4571, zi + sz * 0.0085], [0, 1, 0], 0.0018, M.steel));
    }
    const ic = lib.cbox(0.005, 0.004, 0.010, 0.0009, M.plastic);
    ic.position.set(-0.5335, 0.4561, zi);
    imus.add(ic);
  }
  sys.add(imus);

  /* ── sensor ring bus ─────────────────────────────────────────────────
     Two counter-rotating loops on the measured cabin-floor corridor, cleated
     at every control point, terminating in four gland nodes that land on the
     inboard faces of hv-4's four zonal controllers at |z| 0.538. */
  const net = lib.part('ring', [0, -0.45, 0]);
  const loops = RING_W.map(ringPts);
  /* lib.tube's fifth argument is TUBULAR segments over the whole curve, not
     segments per span, so it has to scale with the control-point count or a
     38-station loop is drawn as a coarse polygon that bulges off its own
     route. Measured off ringPts, the loops close at 6.29 and 6.34 m over 38
     stations each, so two segments a station is 76. Those are spent where the
     curvature is rather than evenly: a corner arc station is 44 mm long and
     gets 22 mm a segment, a flank run station is 340 mm and gets 170 mm,
     which costs nothing because it is straight. */
  net.add(lib.tube(loops[0], RING_R, M.plasticLt, true, loops[0].length * 2));
  net.add(lib.tube(loops[1], RING_R, M.plastic, true, loops[1].length * 2));
  net.add(ringCleats(loops[0], loops[1]));

  /* The four ring nodes, and where they are is a measurement. Gen 4 put its
     junction boxes at x 0.900 and -0.620 and then ran the ring straight
     THROUGH hv-4's controllers 36.9 mm deep, which is the opposite of a node:
     the controllers are where the ring is supposed to END.

     Swept off hv-4's built mesh at y 0.370 to 0.430, the controllers' inboard
     wall is |z| 0.5385 over x 1.11 to 1.20 and x -1.23 to -1.14, so each node
     is a gland block 44 mm deep whose outboard face is on 0.5385 and whose
     glands face inboard, where the cables actually are. Height is a
     measurement too, and it is taken as a PLANE CUT through the built buffer
     rather than off the nearest vertex, which is what an earlier draft did and
     which read 10 to 19 mm short: hv-4's buffer reaches |z| 0.5090 at x 1.14
     and 0.5194 at x 1.17 on the minus-z side only, and cut every 5 mm across
     the node's own x 1.115 to 1.175 footprint it never stands above y 0.3898,
     which the block's underside at 0.405 clears by 15.2 mm, so the block
     sits at y 0.395 to 0.441 rather than on the loops' own 0.388. The result
     of that choice is published rather than assumed: the node's nearest
     approach to hv-4/buffer is 6.12 mm of true surface separation. */
  const NODES = [{ x: 1.145, y: 0.428 }, { x: -1.185, y: 0.428 }];
  const NODE_Z = 0.5165;   // 0.5385 outboard face less half of 44 mm
  for (const st of NODES) {
    for (const sz of [1, -1]) {
      const jb = new THREE.Group();
      jb.add(lib.cbox(0.060, 0.046, 0.044, 0.004, M.plasticLt));
      /* gland plate on the INBOARD face. The outboard face is left plain
         because it is the face that lands on the controller, and a connector
         grown out of it would be a connector inside somebody else's box. */
      const gp = lib.cbox(0.046, 0.036, 0.004, 0.001, M.alu);
      gp.position.z = -0.0225;
      jb.add(gp);
      for (const [gy, gx] of [[0.010, -0.014], [0.010, 0.014], [-0.010, -0.014], [-0.010, 0.014]]) {
        const c = connector(0.0040, 0.010, M.plastic);
        c.rotation.x = -Math.PI / 2;
        c.position.set(gx, gy, -0.0245);
        jb.add(c);
      }
      /* two bolted feet under the box and a moulded status lens on top */
      for (const s of [1, -1]) {
        const foot = lib.cbox(0.012, 0.0035, 0.026, 0.0009, M.plasticLt);
        foot.position.set(s * 0.036, -0.0248, 0);
        jb.add(foot);
        jb.add(screw([s * 0.036, -0.0265, 0], [0, -1, 0], 0.0026, M.steel));
      }
      /* two cast ribs across the lid, which is what a sealed enclosure of
         this size has and what stops it reading as a plain block */
      const rib = lib.cbox(0.006, 0.0035, 0.040, 0.0009, M.plasticLt);
      rib.position.set(-0.014, 0.0248, 0);
      jb.add(rib);
      const led = lib.cyl(0.0032, 0.0022, M.lamp, 10);
      led.position.y = 0.0241;
      jb.add(led);
      jb.rotation.y = sz > 0 ? 0 : Math.PI;
      jb.position.set(st.x, st.y, sz * NODE_Z);
      net.add(jb);

      /* Two short drops from the node's outboard face onto the controller.
         The controller's inboard wall is not a plane a box can land on: it
         is chamfered, running |z| 0.5385 at y 0.380 to 0.5920 at y 0.430,
         so a flat face pressed against it would either float at the bottom
         or bury itself at the top. The node therefore stands off it and the
         48 V and data drops bridge the gap, which is what a gland box beside
         a controller actually looks like. Published clearance below. */
      for (const dz of [-0.016, 0.016]) {
        net.add(lib.tube([
          [st.x + dz, st.y - 0.012, sz * (NODE_Z + 0.021)],
          [st.x + dz, st.y - 0.020, sz * (NODE_Z + 0.028)],
          [st.x + dz, st.y - 0.030, sz * (NODE_Z + 0.031)],
        ], 0.0030, M.plasticLt, false, 5));
      }

      /* spurs from both loops up and out to the node's gland face */
      for (let i = 0; i < 2; i++) {
        const near = nearestOnLoop(loops[i], st.x, sz * RING_W[i]);
        const gz = sz * (NODE_Z - 0.0295);
        const gy = st.y + (i ? 0.010 : -0.010);
        net.add(lib.tube([
          [near[0], near[1], near[2]],
          [(near[0] + st.x) / 2, (near[1] + gy) / 2, sz * (Math.abs(near[2]) + 0.006)],
          [st.x + (i ? 0.014 : -0.014), gy, gz],
        ], 0.0032, i ? M.plastic : M.plasticLt, false, 6));
      }
    }
  }
  sys.add(net);

  return sys;
}

/* Closest control point on a loop to a station, so a spur starts on the
   cable rather than beside it. */
function nearestOnLoop(pts, x, z) {
  let best = null, bd = Infinity;
  for (const p of pts) {
    const d = (p[0] - x) ** 2 + (p[2] - z) ** 2;
    if (d < bd) { bd = d; best = p; }
  }
  return best;
}
