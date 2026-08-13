/* Gen 11 autonomy: the same brain, re-seated on a car that is 680 mm
   narrower than the one every sensor on it was aimed at.

   THE ARCHITECTURE IS autonomy-10's AND IT IS NOT REOPENED. Three 500 TOPS
   lanes, one at full rate, one running a separately written distilled
   checker at a fifth of the work, one in retention and promotable in 60 ms.
   192 W typical against Gen 4's 380, the 640 W peak untouched, the 2-of-3
   vote intact. design/gen11.md section 6 carries that whole and so does this
   file, down to the duty split and the per-lane ledger.

   WHAT IS ENTIRELY NEW IS WHERE EVERY PIECE OF IT IS BOLTED, and the reason
   is worth stating in one line before any of the numbers: autonomy-10 is
   drawn against body-9, and body-9 does not exist in this preset. Measured on
   the BUILT autonomy-10 against the BUILT body-11:

     cameras      B-pillar pair at |z| 0.9262 on a flank that is now 0.6000.
                  tools/check-interfaces.sh reports both instances FLOATING,
                  273.6 mm from body-11/doors.
     gnss-imu     antenna mast reaching y 1.3780 over a roof at 1.3300, and
                  the instance reports FLOATING at 33.8 mm from the canopy.
     radars       corner units at |z| 0.7012 where the built flank is 0.5540
                  at the front station and 0.4502 at the rear, so 12.7 mm of
                  the front pair is inside body-11/skin over 159 crossings.
     ring         routed on the OLD cabin floor perimeter at |z| 0.5504, and
                  19.4 mm inside hv-11/zonal over 1,045 crossings.
     compute      a cold plate at y 0.3895 to 0.4661 on the centreline, which
                  on a tandem is inside the REAR OCCUPANT. thermal-11 says so
                  in its own header before this module existed.

   Seven part pairs and three floating instances, all from the same cause,
   and none of them a judgement call. HANDOFF.md records 13 floating instances
   on this ladder and every one of them is in an autonomy module, because
   sensors were placed at coordinates against a body that was then replaced.
   Nothing in this file is placed at a coordinate. Every mount below is a ray
   or a box sweep against the built partner, quoted with the number it
   returned, and the module's own gate is in the block above build().

   AND THE TANDEM CHANGES THE SENSING PROBLEM, NOT JUST THE MOUNTING. Section
   "WHAT A 1.20 M CAR COSTS THE SENSOR SET" below re-derives the baselines
   rather than carrying them, finds that two of the four did not move at all
   for reasons that are measurements and not luck, and prices the two that
   did. The driver monitor comes off the header entirely, because a centreline
   occupant 260 mm from the windscreen header is a different problem from an
   occupant 380 mm off the axis and 600 mm away. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib } from '../common.js';

/* ── THE COMPUTE POWER BASIS, carried whole ───────────────────────────────

   autonomy-10 derived this table and js/efficiency.js books -75 W against
   it. design/gen11.md section 6 says the compute booking carries, and the
   brief for this module says to re-book only if fewer sensors on a narrower
   car genuinely earn watts from the module's OWN duty ratio.

   THEY DO NOT, AND THE ARITHMETIC IS SHORT. Every term in the 192 W is a
   function of lane state and scene statistics: NPU dynamic, leakage, SRAM
   and NoC, LPDDR, CPU and safety, front end, point-of-load loss. Not one of
   them is a function of vehicle width. The sensor COUNT is unchanged, five
   radars, six imagers, two lidars, one driver monitor, two receivers and
   three IMUs, so the 11.6 W of front end per lane is unchanged, and the
   34.8 W of deserialisation across three lanes is unchanged. The pixel rate
   is unchanged because the imagers are unchanged. The duty split is a
   judgement about SCENES and a narrow car meets the same scenes.

   So this module books -75 W, the same number, and the reason it is not
   re-derived downward is the reason design/retro-gen10.md gives for it not
   being -195 in the first place: the baseline it stacks on is hv-4's 820 W
   slot lump, autonomy-4's published 380 W was only ever 45 W booked to this
   slot with the other 335 inside that lump, and writing a bigger negative
   number hands the rung watts it did not earn. A generation that moves
   brackets does not get to bill for it.

   ONE HONEST QUALIFIER. The 79 W of sensor and ring-interface draw that no
   rung of this ladder books is also unchanged, for the same reason: the
   sensors are the same sensors. It is still outside every baseline on the
   car and it is still not this module's to fix. */
export const COMPUTE_BASIS = {
  gen1PeakW: 450,               // autonomy.js:107, a cold-plate load
  gen4PeakW: 640,               // autonomy-4.js:28
  gen4TypicalW: 380,            // autonomy-4.js:28
  dutyRatio: 380 / 640,
  gen1TypicalW: 267,            // 450 x dutyRatio, the figure booked
  gen1TypicalAlt: 253,          // constant lane typical, the conservative one
  gen1TypicalImplied: 335,      // what METRICS' additive 45 W implies
  gen10TypicalW: 192,
  gen11TypicalW: 192,           // unchanged: no term in it is a width
  gen10PeakW: 640,
  bookedAuxDelta: -75,          // carried, not re-derived. See the block above
  unbookedSlotSensorW: 79,      // measured bottom up, in NO baseline
  note: 'Gen 11 re-books nothing. Every term in the 192 W is a lane state or ' +
        'a scene statistic and none of them is a function of vehicle width, ' +
        'the sensor count is unchanged, and the -75 stacks on a slot lump ' +
        'that design/retro-gen10.md already corrected once.',
};

/* Per-lane typical at Gen 4, 48 V input, apportioned. Carried from
   autonomy-10 unchanged, and carried with its own caveat: it is calibrated
   to the published 126.7 W a lane rather than derived independently of it,
   so it says WHERE the watts are and not that there are 380 of them. */
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

/* The three lane states, same silicon, different duty. */
const LANE = {
  fullStructured: 96,   // foveated ingest, structured scene
  fullMixed: 108,       // foveated ingest, mixed scene
  fullDense: 113,       // dense scene, foveation nearly saturated
  checker: 45,          // reduced-rate diverse checker
  standby: 17,          // retention, promotable in 60 ms
  peak: 213,            // worst case, 640 / 3
};

/* Duty split over the mixed cycle. The least evidenced input in the module,
   and a judgement about scene statistics rather than a measurement. */
const DUTY = { cruise: 0.58, elevated: 0.30, dense: 0.12 };

/* ── THE MEASURED ENVELOPE ────────────────────────────────────────────────

   Every number below came off a built partner with a ray or a box sweep, and
   every mount in build() is written in terms of one of them. They are
   collected here so that a reader can check the module against the car
   rather than against this file's own prose, and so that the next body
   generation can re-run one script and see exactly which constants moved.

   body-11, swept:
     canopy crown           y 1.3300 at z 0, flat from x 0.300 aft to -1.120.
                            1.3290 at |z| 0.10, 1.3285 at 0.15, 1.3280 at 0.20
     canopy at the header   1.3189 at (0.3925, 0), 1.3166 at (0.3925, 0.060),
                            1.3123 at (0.4475, 0)
     flank skin             |z| 0.5901 at (0.780, 1.010); 0.5951 at y 0.990
                            and 0.5855 at 1.030, so it tumbles 0.24 mm per mm
     nose skin              x 2.3648 at (y 0.500, z 0), 2.3630 at y 0.530,
                            2.3684 at y 0.440
     nose flank             |z| 0.5540 at (2.140, 0.440), interpolated between
                            0.5590 at x 2.120 and 0.5492 at 2.160
     bumper beam front      x 2.2620 at y 0.500, across |z| up to 0.470
     front light band       front face 2.3780, BACK face 2.3640, y 0.5925
                            to about 0.640
     tail cone              x -2.4405 at (y 0.900, z 0)
     tail flank             |z| 0.4502 at (-2.300, 0.650)
     cowl cross member      cage crown y 0.8960 at x 0.990, falling to 0.8919
                            at 0.980 and 1.000 and 0.8845 at 0.970, flat in z
                            out past |z| 0.160
     tail cant rail         cage top 0.7540 at (-1.234, |z| 0.455) and 0.7456
                            at (-1.398, |z| 0.435), the highest point anywhere
                            under the shoe AND arm strip rather than the height
                            at the shoe centre. Its inboard face is |z| 0.4334
                            at the first station and 0.4153 at the second
   hv-11, swept:
     zonal controllers      four boxes, x 1.0098 to 1.2200 and -1.2435 to
                            -0.9898, y 0.4200 to 0.5000, |z| 0.4910 to 0.6315.
                            The inboard wall is chamfered: 0.5100 at y 0.430,
                            0.4910 at 0.445, 0.4927 at 0.460, 0.5370 at 0.490
   thermal-11, swept:
     compute bulkhead       plate x -0.955 to -0.845, y 0.494 to 0.564,
                            z -0.656 to -0.632, with two r 0.007 ports on the
                            axis (-0.900, z -0.6250) at y 0.511 and 0.547.
                            NOTE the built x is -0.900 and thermal-11's own
                            prose says -0.950 in three places; the geometry is
                            what this module lands on
   wheels-11, swept:
     tyre column            |z| 0.6725 to 0.8075, y 0 to 0.7100, and the front
                            tyre reaches x 1.8050
   interior-11, swept, and it landed while this module was being built:
     rear occupant          rear-seat-cushion x -1.0944 to 0.0050, y 0.3080 to
                            1.2600, so the reclined envelope ends at x -1.0944
     luggage                a box, x -1.3950 to -1.1499, y 0.7750 to 1.1132,
                            |z| 0.4050
     display stack          x 1.0273 to 1.0838, y 0.7740 to 0.9997
   suspension-9, swept:
     air-supply line        ONE line, on the +z flank only, |z| 0.5700 to
                            0.6174 at y 0.302 to 0.336 over the whole cabin.
                            This is the measurement that killed the obvious
                            ring route and section "THE RING" says why. */

/* ── WHAT A 1.20 M CAR COSTS THE SENSOR SET ───────────────────────────────

   Four baselines on this vehicle. Two of them fell and two did not, and the
   two that did not are the more interesting half, because both look like they
   should have. Every figure is the MOUNT STATION of the built unit, which is
   the one quantity both modules state unambiguously, rather than a bounding
   box that includes a bracket.

   1. FLANK CAMERA PAIR: 1.800 m to 1.096 m, a 39.1 percent cut.
      autonomy-10 stands them at (0.1, 1.0, +-0.900); this module at
      (0.780, 1.010, +-0.548), where the body surface measures |z| 0.5901.
      Two cameras cross-fixing a target abeam resolve range as the baseline
      over the angular disparity, so at a fixed per-camera bearing noise the
      same target is 1.64 times worse in range. That is a RATIO. This project
      has never published a bearing noise figure and inventing one to multiply
      by would be arithmetic dressed as evidence.

   2. FRONT CORNER RADAR PAIR: 1.160 m to 0.940 m, a 19.0 percent cut, and
      each unit is now 202.5 mm inboard of its own tyre's inner face at
      |z| 0.6725 on a body that draws no wheel fairing at all.

   3. LIDAR PAIR: 0.600 m, UNCHANGED. It was never a function of the flank.
      The nose half-width at the puck station (2.320, 0.615) measures
      |z| 0.5103 and the pucks sit at 0.300, so what binds them is the light
      band aperture, and a tandem narrows the greenhouse rather than the nose.

   4. GNSS ANTENNA PAIR: 0.650 m, UNCHANGED, because it is LONGITUDINAL. A
      car does not get shorter between the ears when it gets narrower between
      the shoulders, and design/gen11.md section 5 measures this cabin at
      about 2.86 m against the four-seat car's 2.684.

   AND ONE COST THAT IS NOT A BASELINE AT ALL, which is the largest of them.
   body-11 deletes every wheel fairing, so all four tyres stand entirely
   outside the bodywork between |z| 0.6725 and 0.8075 with no material of any
   kind below y 0.6200 at a wheel station. Measured in plan from the built
   tyre column and the built radar mount, the front tyre subtends 10.97 to
   45.21 degrees off the straight-aft direction from (2.140, -0.470), so 34.2
   degrees of the rear-outboard sector of a 150 degree field is looking at
   rubber. And the flank camera at (1.010, 0.548) grazing the tyre's top inner
   corner at (0.710, 0.6725) puts its shadow edge on the ground at |z| 0.967,
   so a 294 mm strip of road from 0.6725 outward is hidden at each wheel
   station. Gen 10's bodywork blocked comparable sectors and that is NOT the
   same thing: a flank is a static occluder a calibration subtracts once, and
   a tyre steers, moves in ride and rotates. The blind wedge became dynamic.
   Both figures are in the radar and camera fail lists with what is done about
   them, which is corroboration across modalities and nothing cleverer. */

export const SYSTEM = {
  id: 'autonomy-11',
  name: 'Autonomy · Gen 11',
  color: 0x6ea8ff,
  explode: [0, 2.3, 0],
  /* THE ONE PLANE THIS MODULE HAS TO MEET, and it is met rather than
     asserted: thermal-11 ends its glycol run on a bulkhead plate whose
     outboard face is z -0.6560, 4.0 mm inboard of body-11's pan upstand
     inner face and of battery-11's sill head inner face at the same plane,
     and declares it for autonomy-11 to answer. The `compute` part realises
     it with the saddle clamp at x -1.180 to -1.140, whose outboard face is
     on the plane to the digit, and extent min asserts what matters on the
     arriving half: nothing in this part gives up before it and nothing goes
     past it into battery-11's sill. Driver side only, so mirrored is false
     and the plane is signed, which is the convention thermal-11 uses. */
  interfaces: {
    'compute-coolant-inboard': {
      kind: 'face', axis: 'z', at: -0.6560, tol: 0.003,
      part: 'compute', mirrored: false, extent: 'min',
      note: 'the saddle clamp that carries this module\'s two coolant hoses onto thermal-11\'s bulkhead. thermal-11/glycol-loop declares the same plane on the same axis with the same sign.',
    },
  },
  blurb: 'The asymmetric triplex carries whole: one full-rate lane, one diverse checker, one in retention, 192 W typical and the 640 W peak held. Everything else is new, because every sensor on Gen 10 is aimed at a body 680 mm wider than this one. The compute leaves the centreline it shared with the rear occupant and goes behind them; the driver monitor leaves the header, because a tandem driver sits on the axis 260 mm from it; and the two baselines that did not change did not change for reasons that are measurements rather than luck.',
  parts: {
    compute: {
      name: 'Asymmetric triplex compute',
      tagline: 'Same three lanes, same 192 W, and a new address: the centreline volume it used to occupy is now a person.',
      mass: 13.2,
      specs: [
        ['Lanes', '3x 500 TOPS, one primary, one checker, one reserve'],
        ['Voter', '2-of-3 majority, analysable logic, ASIL D'],
        ['Power', '640 W peak held, 192 W typical, unchanged'],
        ['Station', 'Tail, x -1.526 to -1.106, y 0.6745 to 0.7511'],
        ['Mount', 'Slung under the cant rail on four measured shoes'],
        ['Coolant', '1.517 m of hose to thermal-11\'s declared |z| 0.6560'],
      ],
      how: 'THE MACHINE IS autonomy-10\'s AND THE ARGUMENT FOR IT IS autonomy-10\'s. Three independent 500 TOPS SoCs on one cold plate, each with its own DRAM and its own pair of diode-ORed 48 V feeds. Lane A runs the primary stack at the full 20 Hz tick. Lane B runs a SEPARATELY WRITTEN stack, distilled and quantised into a working set resident in its own on-die SRAM, at 10 Hz on a quarter of the input pixel and point rate. Lane C sits in retention with clocks gated, SRAM held and DRAM in self-refresh, and comes to full rate in 60 ms when the first two disagree or the scene crosses an escalation trigger. Over the mixed cycle this module assumes 58 percent cruise, 30 percent elevated and 12 percent dense, and the ledger that turns that into 192 W is unchanged: lane B to a reduced-rate checker is 72 W, lane C to retention in cruise is 88 W, foveated ingest on whichever lanes are at full rate is 28 W, 188 W of a 240 W target with the module missing by 52 W and saying so.\n\nWHAT MOVED IS THE ADDRESS, AND THE PARTNER SAID SO FIRST. autonomy-10\'s plate sits at x -0.795 to -0.322, y 0.3895 to 0.4661, |z| up to 0.200, which its own panel calls "under the rear seat". On a tandem there is no under-the-rear-seat: thermal-11 puts the two occupants\' hip stations at the BUILT x 0.700 and -0.100 and design/gen11.md section 5 puts the seat pan 150 mm over a lid at y 0.3020, so that box is occupied from y 0.302 to 0.452 by the rear occupant\'s seat and above that by the rear occupant. thermal-11\'s own header reaches the same conclusion in one line, "autonomy-4\'s plate is on the centreline inside the rear occupant", and it acted on it: it declines to draw the three spigots thermal-9 drove into autonomy-4 and ends its glycol run on a bulkhead plate instead.\n\nSO THE PLATE GOES BEHIND THE REAR OCCUPANT, AND THE PLACE WAS FOUND BY SWEEPING RATHER THAN BY CHOOSING. A 20 mm occupancy voxel grid over body-11, battery-11, hv-11, thermal-11, wheels-11, drivetrain-9 and suspension-9 leaves exactly one volume in this car big enough for a 420 by 300 mm plate and not inside somebody: the tail behind the rear occupant and over the rear casting. The box x -1.575 to -1.070, y 0.668 to 0.756, |z| under 0.210 contains ZERO partner vertices. That it is behind the occupant is now a measurement rather than a derivation, because interior-11 landed: its rear seat cushion ends at x -1.0944, the cold plate\'s forward edge is x -1.5262, and the assembly\'s own forward-most feature, the coolant boss at x -1.1710, clears the cushion by 76.6 mm.\n\nTHE HEIGHT IS interior-11\'s TO GIVE AND IT TOOK MOST OF IT. An earlier draft of this module stood the plate ON the cant rail at y 0.780 to 0.845. It was clear when it was drawn and it was 142.65 mm inside interior-11/luggage over 1,277 triangle pairs a few hours later, because that part is a box from x -1.3950 to -1.1499, y 0.7750 to 1.1132, |z| 0.4050 and it did not exist yet. The whole assembly therefore HANGS under the rail rather than standing on it, y 0.6745 to 0.7511 with the mounting straps reaching 0.7600, which leaves 15.0 mm to the luggage floor. It still takes about 40 litres of what design/gen11.md section 9 item 3 already lists as luggage volume this generation deletes, and it now takes it from underneath rather than out of the middle. That is a real cost and it is named rather than absorbed.\n\nTHE MOUNT IS FOUR MEASURED POINTS AND NOT A PLANE. body-11\'s tail cant rail is a rounded section whose top varies 21 mm over 300 mm of x, so a flat shoe laid on its nominal height touches at one point and floats elsewhere, which is design/crispness.md\'s hardware-on-a-groove-floor lesson and autonomy-10\'s own ROOF_SEAT lesson in a different place. Each shoe is seated on the HIGHEST cage vertex anywhere under its own shoe and arm strip, ray-swept at 2 mm: 0.7540 at (-1.234, |z| 0.455) and 0.7456 at (-1.398, |z| 0.435), and both sit on 1.5 mm of shim rather than on a fit. The FOOTPRINT matters as much as the point: an earlier draft scanned a 24 mm box around a chosen station rather than the strip the hardware actually covers, missed the crown at the aft foot by 1.1 mm, and put 32 triangle pairs 5.78 mm into body-11/cage. From each shoe an arm reaches inboard to |z| 0.402, which is inside the rail\'s own inner face at 0.4334 and 0.4153, and a strap drops from there to a transverse channel whose top face is the plate underside at y 0.6745.\n\nTHE COOLANT IS THE ONE JOINT THIS MODULE DOES NOT CLOSE, DELIBERATELY. thermal-11 declares `compute-coolant-inboard` at |z| 0.6560 and builds a bulkhead plate at x -0.955 to -0.845 with two ports on the axis (-0.900, z -0.6250). This module runs 1.05 m of hose from the plate down the driver flank to those two ports and stops 1.0 mm short of them, and it does NOT declare the key. Both decisions have measured reasons and the fail list carries them.',
      why: 'Moving a cold plate is not an architecture change and this panel does not pretend it is. What is worth arguing is the claim underneath it, that a package generation can invalidate a mount without touching a single line of the module that owns it. That is exactly what happened here and it happened silently: autonomy-10 builds without error on this preset, reports the correct triangle count, passes its own smoke test, and puts 12.5 kg of computer inside a passenger. Nothing in a module can see that, because the occupant lives in a module that does not exist yet and the volume it needs is described in a design document.\n\nThe general form is the one SPEC.md keeps finding: a check is only as good as the shape of fault it can represent, and there is still no check on this car that can represent "this part is where a person goes". The nearest thing is tools/occupant.sh, and it tests one occupant against one liner. What this module can do instead is refuse to place anything by coordinate, publish the sweep that found each volume, and say which volumes are empty of GEOMETRY but not empty of PEOPLE. The tail deck is empty of both, measured, and that is why it is the only place the plate went.',
      fail: [
        'THE COOLANT JOINT IS 1.0 mm OF AIR AND ONLY ONE OF THE TWO PORTS COULD BE REACHED AT ALL. thermal-11 draws its bulkhead ports as two VERTICAL r 0.007 stubs on ONE axis at (-0.900, z -0.6250), 36 mm apart in y. The upper one has a free top face and the feed lands on it. The lower one has no accessible face: above it is the upper port, below it is a plate underside at y 0.494 with 12 mm of air to hv-11\'s by-wire feeds at 0.4820, and inboard is the plate\'s own face at z -0.632. So the return lands on the plate top beside it instead. Two ports side by side in x, or one pair of horizontal spigots, makes both reachable, and that is thermal-11\'s geometry to change rather than this module\'s. Both landings are 1.0 mm standoffs rather than sleeved joints, because DECLARED_JOINTS ships empty on the argument that a declaration is an agreement between two modules and not a way to make a red line go away. autonomy-10 took the other option and carries 24 undeclared triangle pairs at 2.29 mm from Gen 4 for it.',
        'The tail deck is luggage volume. About 40 litres of the only remaining stowage on a car that already deleted its rear bench goes to a computer, and interior-11 inherits a smaller number than it would like. The alternative volumes were swept and there are none: the flank channel over battery-11\'s sill is filled by hv-11\'s zonal controllers, spine and by-wire feeds and by thermal-11\'s recovery core, and the centreline is occupied by people.',
        'A rear-mounted compute stack is in the rear crush path in a way a centreline one was not. The plate sits at x -1.526 to -1.106 with body-11\'s rear casting starting at x -1.600 and the Kamm face at -2.4427, so there is 0.84 m of structure behind it, but that structure is a tail this generation compressed on an 18.4 degree plan half-angle and it was never sized as a battery-grade intrusion barrier. This module states it rather than pricing it, because rear impact energy is nobody\'s published number on this project.',
        'Fault to isolation is still 100 ms at Gen 4 against 250 ms worst case here, and the rate limit on the primary\'s commanded trajectory during the window is what makes it survivable: a liar held for 250 ms at 3 m/s2 of lateral authority moves the car 94 mm off line. If the rate limiter is defeated the whole argument goes with it. Carried from autonomy-10 unchanged, because the architecture is unchanged.',
        'The duty split is the softest number in the module. 58 / 30 / 12 is a judgement about scene statistics, not a measurement, and moved with one convention over both ends the published 192 W is 185.0 at a 0.08 dense fraction and 198.4 at 0.16. Carried, and carried with the same warning autonomy-10 attached: the architecture does not change with either, the booked auxDelta does.',
      ],
      explode: [-0.55, 0.35, 0],
    },
    radars: {
      name: '4D imaging radar ring',
      tagline: 'Five imaging units, unchanged hardware, and four corners that have to come 230 mm inboard onto a car with no wheel fairings to hide behind.',
      mass: 2.4,
      count: 5,
      specs: [
        ['Band', '76 to 81 GHz FMCW, 4 GHz chirp'],
        ['Front unit', '768 virtual channels, 300 m'],
        ['Corners', '4x 192 channels, 150 degree field, 150 m'],
        ['Front pair separation', '0.940 m, against 1.160 on Gen 10'],
        ['Duty', 'Full rate in every lane state, 42 W total'],
      ],
      how: 'Nothing in the sensing argument moves and nothing in the hardware moves. Five imaging radars, elevation at every corner, a 4 GHz chirp resolving range to 4 cm. What moves is all four corners, and by a lot.\n\nTHE FRONT PAIR. Gen 10 carries them at (2.16, 0.44, plus and minus 0.58) against body-9. On body-11 the nose flank at that exact station measures |z| 0.5492, so the unit is 31 mm outboard of the skin before its own 90 mm width is counted, and the shipped predicate agrees: swept against the built body-11, autonomy-10/radars crosses body-11/skin over 159 triangle pairs to 12.7 mm at (2.160, 0.431, -0.562). The pockets that are actually empty were found by box sweep at 40 mm steps: (2.140, 0.440, plus and minus 0.470) contains zero partner vertices in a 90 by 80 by 90 mm box, with the nose flank 84 mm outboard at |z| 0.5540 and the bumper beam front face 122 mm ahead at x 2.2620.\n\nTHE REAR PAIR. Gen 10 puts them at (-2.15, 0.50, plus and minus 0.66), which on this car is inside a tail that closes to 0.4028 half-width at the Kamm face. Body-11\'s rear casting occupies |z| up to 0.560 out to x -2.245, so the pocket is aft of the casting and above it: (-2.300, 0.650, plus and minus 0.360), where the tail flank measures |z| 0.4502 and the box is clear.\n\nTHE FRONT UNIT moves 10 mm forward to x 2.290 for one reason and it is not the nose. body-11\'s bumper beam came in to 1.00 m span when the car narrowed and its front face measures x 2.2620 at y 0.500 across |z| up to 0.470, which is 8 mm ahead of where body-9\'s crash rail sat relative to this unit. The connector boot is the rearmost feature on the assembly at x 2.277, so the unit goes forward until the boot clears the beam by 15.0 mm, and the radome then stops at 2.326 with the nose skin 38.8 mm ahead at 2.3648. Gen 10\'s tightest figure in this part was 0.41 mm and this one is 15.0.\n\nTHE FOUR CORNERS ARE IN TWO lib.part GROUPS, ONE PER SIDE, AND THAT IS A DELIBERATE TRADEOFF CARRIED FROM autonomy-10. Four separate groups would cost ten more draw calls on a module that already carries the highest merged mesh count on the car. SPEC.md is explicit that this makes the module choosing to be checked two at a time: [attachment] and [enclosure] run per lib.part group, so a group holding a front and a rear unit can only report that SOMETHING in it is attached. The cost is accepted here for the same reason and stated for the same reason, and it is bounded by the fact that both units in each group are measured and reported individually in the mount table in this file.',
      why: 'The radar case is unchanged and still the strongest sensing argument on the car: the only modality that measures closing speed rather than computing it, and the only one that does not care about weather or light. What Gen 11 adds is a problem no earlier rung had, and it comes from the body rather than from the sensor. body-11 deletes every wheel fairing, so all four tyres stand entirely outside the bodywork between |z| 0.6725 and 0.8075 with no material at all below y 0.6200 at any wheel station. A corner radar at |z| 0.470 is 202.5 mm inboard of its own front tyre\'s inner face and looks straight down the flank into it.\n\nMeasured in plan from the built tyre column and the built radar station, the front tyre subtends 11.0 to 45.2 degrees off the straight-aft direction, so 34.2 degrees of the rear-outboard sector of a 150 degree field is looking at rubber. A body flank blocked the same sector on Gen 10 and that is not the point: a flank is a static known occluder that a calibration can subtract, and a tyre steers, and moves in ride, and rotates. The mitigation is the one the architecture already has, corroboration across modalities and an escalation trigger on any low-confidence track, and the honest statement is that the blind wedge is now dynamic rather than fixed.',
      fail: [
        'The rear-outboard wedge behind each front tyre is a moving occluder, 34.2 degrees wide in plan at the measured mount, and it moves with steer angle and ride height. The stack knows the wheel position from the by-wire feedback and can mask it, and masking is not seeing.',
        'The front corner pair separation falls from 1.160 to 0.940 m, so two corner units cross-fixing a near target have a 19 percent shorter baseline and their 150 degree fields overlap sooner. That buys redundancy in the middle and spends it at the edges, which is the opposite of what a corner radar is for.',
        'Mutual interference climbs with fleet penetration and imaging radars chirp across more of the band; randomised chirp timing keeps collisions rare and brief, carried from Gen 1.',
        'Multipath ghosts come with plausible elevation, and an open wheel adds a new mirror: a wet tyre sidewall 200 mm outboard of the corner unit is a specular surface at 77 GHz that no earlier rung had in the near field. Track-level fusion kills any ghost no camera confirms, which is the same answer as before applied to a new cause.',
      ],
      explode: [0.55, 0, 0],
    },
    cameras: {
      name: 'Camera set and thermal imager',
      tagline: 'Six imagers, none of them changed, and a flank pair whose separation just fell 36 percent because the car did.',
      mass: 1.6,
      count: 6,
      specs: [
        ['Imagers', '5x 12 MP HDR + 1 thermal, gen-locked'],
        ['Thermal', '640 x 512 microbolometer, 8 to 14 um'],
        ['Dynamic range', '140 dB split pixel'],
        ['Flank separation', '1.096 m, against 1.800 on Gen 10'],
        ['Primary ingest', 'Foveated: full rate on the ROI, quarter elsewhere'],
        ['Checker ingest', 'Quarter rate, whole field'],
      ],
      how: 'The imagers and the read-out contract are autonomy-10\'s: a 12 MP wide whose centre crop reproduces a 50 degree main in software, a telephoto that resolves a vehicle at 300 m, two wide flank units, a rear camera, and a long-wave thermal imager in the nose. The primary lane ingests a foveated frame at 0.3625 of the pixel rate and the checker takes a quarter-rate whole field. None of that is reopened.\n\nTHE FORWARD WEDGE MOVES 2 mm AND THAT IS THE WHOLE OF IT. autonomy-10 dropped the shared header casting to y 1.290 to get the wedge out of body-9\'s canopy, and body-11\'s roof is 38 mm lower, so the first question was whether the whole assembly had to be redrawn. It did not, because the header sits at x 0.42 where the canopy is falling toward the windscreen rather than at the crown: ray-swept, the glass measures 1.3189 at (0.3925, 0) and 1.3166 at (0.3925, 0.060). What it did need was 2 mm, and the reason is a graze rather than an intrusion: at 1.290 the wedge\'s upper front corner crosses body-11/skin by 0.09 mm over 6 triangle pairs at (0.429, 1.304, 0.057), which the shipped predicate counts as a penetrating part pair and which no amount of prose makes zero. At 1.288 that corner clears by 2.1 mm and the binding corner at the back of the wedge clears the canopy by 9.9 mm, against 7.74 mm on body-9. Move the header 60 mm forward instead and none of it works: the glass is 1.2940 at x 0.60.\n\nTHE FLANK PAIR MOVES 352 mm INBOARD AND IT IS THE MOUNT THAT CHANGES, NOT THE CAMERA. Gen 10 stands them at (0.1, 1.0, plus and minus 0.9) on a body whose door skin was 71 mm outboard of the mount. On body-11 that is open air: tools/check-interfaces.sh reports both instances FLOATING at 273.6 mm from body-11/doors, which is the exact failure mode HANDOFF.md records against three autonomy-4 instances and the reason this file measures every mount. The new station is x 0.780, which is the mirror position just ahead of the front occupant\'s shoulder at the built hip station of 0.700, and the flank there measures |z| 0.5901 at y 1.010. The surface tumbles 0.24 mm per mm of height through the camera\'s own 30 mm, from 0.5951 at y 0.990 to 0.5855 at 1.030, so the mount pads are 20 mm tall rather than 40 and their outer faces sit on |z| 0.5891, 1.0 mm off the skin at the pad\'s own height instead of 4 mm off at one end and buried at the other.\n\nTHE THERMAL IMAGER COMES BACK 3 mm. body-11\'s nose at (y 0.530, z 0) measures x 2.3630 against body-9\'s 2.375, so the germanium window at Gen 10\'s station would stand 2.0 mm off the skin instead of the 3.30 it was drawn for. The casing moves to x 2.335 and the window face to 2.358, which is 5.0 mm of clear air.\n\nTHE REAR CAMERA moves aft and down. Gen 10 sits at (-2.24, 0.96) under body-9\'s kamm flap; body-11\'s flap spans x -2.3672 to -2.1827 at y 0.9444 to 1.0182 and its tail cone measures x -2.4405 at (y 0.900, z 0), so the unit goes to (-2.410, 0.900, 0) with the lens face 12.5 mm off the tail skin, which is what an aperture in a Kamm face wants and is also its attachment.',
      why: 'Consolidation against redundancy was Gen 4\'s trade and foveation was Gen 10\'s, and neither is reopened. What this generation has to answer for is the geometry, because a 1.20 m car is a smaller instrument.\n\nThe flank pair is the loss and it is measurable. Their separation goes from 1.800 m to 1.096 m, both figures taken off the mount station each module states, which is a 39.1 percent cut. Two cameras cross-fixing a target abeam the car resolve range as the baseline over the angular disparity, so at a fixed per-camera bearing noise the same target is resolved 1.64 times worse in range than it was on Gen 10. That is a ratio and not an accuracy claim, because this project has never published a bearing noise figure and inventing one to multiply it by would be arithmetic dressed as evidence.\n\nThe two baselines that did NOT move are the more interesting half, because both look like they should have. The lidar pair holds 0.600 m because it was never a function of the flank: the nose half-width at the puck station measures |z| 0.5103 at (2.320, 0.615) and the pucks sit at 0.300, so what binds them is the light band aperture, and a tandem narrows the greenhouse and not the nose. The GNSS pair holds 0.650 m because its baseline is LONGITUDINAL, and a car does not get shorter between the ears when it gets narrower between the shoulders. Two of the four baselines on this car survived the generation for reasons that are measurements, and saying so is what stops the width from being blamed for everything.',
      fail: [
        'The flank pair is 1.096 m apart instead of 1.800, and the 1.64x cross-range penalty falls exactly where a lane-change decision is made. The stack leans harder on corner radar, which measures range directly and does not care about baseline, and the honest cost is that a camera-only fallback abeam the car is now the weakest fix on the vehicle.',
        'Both flank cameras sit 124.5 mm inboard of their own tyre\'s inner face on a body with no wheel fairing, so at the four wheel stations the road from |z| 0.6725 outward is behind rubber. Grazing the tyre\'s top inner corner at (0.710, 0.6725) from the camera at (1.010, 0.548) puts the shadow edge on the ground at |z| 0.967, so a 294 mm strip of road at each wheel station is not seen by the flank camera at all. On a car with fairings that strip was under bodywork and equally unseen; what is new is that it now contains a moving object.',
        'A radar-soft object in the foveated periphery is detected one tick later and at roughly half the range it would have been at full resolution. Carried from Gen 10 and unchanged, because the read-out contract is unchanged.',
        'A raindrop on a flank lens now has fewer neighbouring fields to vote it down AND a shorter baseline to the other one; the stack declares the sector degraded rather than guessing, which is the same policy applied to a worse geometry.',
        'Thermal contrast is worst at midday in summer, exactly when visible cameras are strongest; the two failure envelopes barely overlap, which is the point, but the fusion weights must track ambient temperature honestly.',
      ],
      explode: [0.2, 0.4, 0],
    },
    lidar: {
      name: 'Flash lidar pair',
      tagline: 'The one baseline on this car that a 680 mm narrower body did not touch, and the measurement that says why.',
      mass: 0.7,
      count: 2,
      specs: [
        ['Type', 'Flash, no moving parts'],
        ['Emitter', 'VCSEL array, 940 nm, Class 1'],
        ['Receiver', '0.4 MP SPAD array, global shutter'],
        ['Range', '140 m at 10% reflectance'],
        ['Baseline', '0.600 m, unchanged from Gen 10'],
        ['Occupancy path', 'Full rate to all three lanes, always'],
      ],
      how: 'The units are Gen 4\'s and the architecture is Gen 10\'s: a VCSEL array illuminates the whole scene each pulse, a SPAD receiver times single photons per pixel, and the formally verified collision checker consumes lidar occupancy at full rate on all three lanes including the one in retention, because occupancy needs no recognition and is the part of the stack that must never be duty cycled.\n\nTHE PUCKS DO NOT MOVE, AND THAT IS THE MEASUREMENT THIS PANEL EXISTS FOR. Everything else in this module moved inboard, so the first thing to check was whether a 0.600 m baseline still fits in a 1.20 m car. It does, with room, and the reason is that the pucks were never held by the flank. Ray-swept on the built body-11, the nose half-width at the puck station (2.320, 0.615) is |z| 0.5103, and the puck outline reaches |z| 0.338 at its widest after the 25 degree toe-out, so it clears the skin by 172 mm. What actually binds it is the light band: the front band\'s BACK face measures x 2.3640 and the window face reaches 2.3585 at its forward-most vertex once the toe is applied, which is 5.5 mm of clear air against Gen 10\'s 4.56 on body-9. A tandem narrows the greenhouse. It does not narrow the nose, and the nose is where this sensor lives.\n\nThe pucks therefore carry at (2.320, 0.615, plus and minus 0.300) with the same toe-out and the same aperture, and the panel says so with the sweep rather than carrying them silently. A carried number that was checked is a different object from a carried number that was assumed, and this ladder has thirteen floating instances that are the second kind.',
      why: 'Two pucks replace one roof pod at less mass and buy overlapping fields across a 0.600 m baseline, so one blinded window degrades the picture instead of deleting it. On this generation that argument gains a second half: a car whose flank camera baseline just fell 36 percent needs at least one modality that measures geometry directly, at a baseline the package did not touch, or the narrowing quietly becomes a coverage cut. Lidar occupancy is that modality and its cost is in photons rather than in TOPS.\n\nIt is also the sensor that answers the open wheel. The corner radars now look down a flank with a rotating rubber column in it, and the flank cameras lose 195 mm of road at each wheel station. The lidar pair looks FORWARD from the nose past both front tyres rather than along the flank between them, so the one geometry the tandem made worse is the one geometry this sensor never used.',
      fail: [
        'Fog and heavy snow return first-surface echoes; the SPAD histogram takes the last return, but past a density threshold range collapses honestly and the stack knows it.',
        'Retroreflective signs bloom hard on a SPAD array, saturating neighbouring pixels for a frame; bloom masks are calibrated per unit.',
        'Both pucks sit behind one band, so packed snow can blind the pair together; the shared heater and a blockage monitor are the mitigation, and one failure domain for two sensors is the honest cost of embedding.',
        'The 5.5 mm to the light band\'s back face is the tightest clearance in this module and it is a carried tightness rather than a new one. A light band redraw that adds 6 mm of depth closes it, and nothing in body-11 declares that face as an interface, so nothing would catch it except a sweep.',
      ],
      explode: [0.5, 0.15, 0],
    },
    dms: {
      name: 'Driver monitor',
      tagline: 'Off the header and onto the cowl, because a tandem driver sits on the axis 260 mm from the roof rail instead of 380 mm off it and 600 mm away.',
      mass: 0.1,
      specs: [
        ['Imager', '940 nm IR, 60 fps'],
        ['Illumination', 'Two invisible IR emitters'],
        ['Station', 'Cowl cross member, (0.972, 0.945, 0), on the axis'],
        ['Range to eye point', '0.797 m at 14.1 degrees elevation'],
        ['Distraction call', 'Under 2 s'],
        ['Handover budget', '10 s, own stop armed throughout'],
      ],
      how: 'A small IR camera floods the driver\'s face with invisible 940 nm light and reads the corneal glint against the pupil centre, giving a gaze vector good to about 2 degrees plus eyelid aperture, blink cadence and head pose. Processing happens on the camera and only states leave it; no video crosses the ring. All of that is carried.\n\nTHE MOUNT IS RE-DERIVED AND NOT CARRIED, AND THE REASON IS GEOMETRY RATHER THAN PACKAGING. autonomy-10 hangs the pod off the shared header casting on a 221 mm arm to (0.4127, 1.2375, -0.3020), which works because a four-seat driver sits about 380 mm off the axis and 0.5 to 0.7 m from the header. On a tandem the driver is ON the axis, and the axis is where the header already is. Taking thermal-11\'s built hip station of x 0.700 and design/gen11.md section 5\'s own 36 degree relation, the front occupant\'s head crown is at x 0.133 and y 1.24795 and the eye point is near (0.20, 1.15). A pod on the header at (0.42, 1.24) is 0.26 m from that face. Three things are wrong with it at once: a 940 nm gaze camera at 260 mm needs a much wider lens and loses the very off-axis accuracy it is there for, the pod hangs inside the 51.1 mm of head clearance body-11 measured and fought for, and the head corridor body-11 publishes, |z| within 0.15 over x 0.350 to -1.150, is exactly where the arm would have to reach.\n\nSO THE POD GOES FORWARD ONTO THE COWL, ON THE ONE PIECE OF BODY-11 STRUCTURE THAT IS THERE. Ray-swept, body-11\'s cage carries a cowl cross member running x 0.970 to 1.010 at |z| out past 0.160, and it is a rounded section rather than a flat: its crown is y 0.8960 at x 0.990, falling to 0.8919 at 0.980 and 1.000 and 0.8845 at 0.970. The foot seats on the crown plus 1.0 mm of shim, and the pod sits at (0.972, 0.945, 0), looking aft and up: 0.797 m to the eye point at 14.1 degrees of elevation, which is a production column-top geometry rather than an improvised one. It is 22 mm forward of where an earlier draft put it, because interior-11 landed and its display stack occupies x 1.0273 to 1.0838 at y 0.774 to 1.000; the pod now clears that by 25.4 mm and interior-11/dashboard at x 1.011 by 8.8 mm, which are the two tightest neighbours this part has.\n\nAND THIS IS THE ONE PLACE THE TANDEM MAKES THE SENSING PROBLEM EASIER. A centreline occupant is an on-axis occupant. Gen 10\'s pod reads a face across about 20 degrees of yaw, where the corneal glint model is weakest and where an IR-opaque coating on one lens of a pair of sunglasses takes one eye before the other. This one reads it head on, and the gaze vector it produces is symmetric about the axis it is measured on.',
      why: 'Monitoring is the least glamorous sensor on the car and the one the L3 regulations actually mandate, because every alternative amounts to pretending the human is a component with a datasheet. The gap between eyes-on and mind-on is the residual risk no camera closes, and the design treats the handover as a favour requested, never a dependency: the minimal-risk stop stays armed on the primary through every transfer and now on a checker as well.\n\nTHE SECOND OCCUPANT IS NOT MONITORED AND THAT IS A DECISION. A tandem puts a second human 0.800 m behind the first with no inward-facing sensor pointed at them, and the obvious move is a second imager. It is declined on the architecture\'s own argument rather than on cost. This sensor exists to watch the person who can take over, and the rear occupant on this car cannot: they are reclined at 36 degrees behind a seat back, with their knees astride it and their feet in a 158 mm channel, and there are no controls within reach. Watching someone who is not a fallback produces a state the voter cannot use. The geometry says the same thing from the other side, which is that the front seat back stands between the only available mounting point and the only thing worth looking at, so the sensor would need its own station in the rear headliner to see anything at all. Named as a capability cost in the fail list, not absorbed.',
      fail: [
        'The steering column and whatever wheel or yoke interior-11 draws now sit between the pod and the face, which is the standard cost of a column-top station and the standard reason production units put a second emitter off-axis. interior-11 does not exist, so the occlusion is stated as a risk and not measured, and it is the one mount in this module that a partner module can still invalidate.',
        'The rear occupant is unmonitored. If the front occupant is incapacitated there is a second person in the car whom no sensor sees and who cannot reach the controls, and the vehicle\'s response is its own minimal-risk stop with no knowledge of them. That is the same response it would make with an empty rear seat, which is the honest description of what is lost.',
        'Gaze is not attention: eyes on the road with the mind elsewhere reads as fully compliant, which is exactly why the fallback is the car\'s own stop and not the handover.',
        'Direct low sun up the windscreen into a cowl-mounted unit is a worse case than the same sun into a header unit, because the optic now points up rather than down. The bandpass filter narrows the window and dropouts are flagged as monitoring lost, not as driver attentive.',
      ],
      explode: [0.5, -0.3, 0],
    },
    'gnss-imu': {
      name: 'Redundant pose unit',
      tagline: 'Two antennas 0.650 m apart, and the baseline survived the generation because it runs along the car rather than across it.',
      mass: 0.4,
      specs: [
        ['Receivers', '2x dual band L1/L5 + RTK'],
        ['Antennas', 'Roof pair, 0.650 m baseline, 10.5 mm proud'],
        ['Heading', '0.3 degrees, standing or moving'],
        ['IMUs', '3x MEMS, one per compute lane'],
        ['Dead reckoning', '0.25% of distance travelled'],
      ],
      how: 'Two dual-band receivers hang on two antennas 0.650 m apart and the carrier-phase difference across that baseline yields heading to 0.3 degrees while the car is parked. Three MEMS IMUs mount one per compute lane, which makes pose votable by the same machinery as everything else, and a lane in retention keeps its IMU powered and integrating because a gyro bias history is worth nothing with a 60 ms hole in it.\n\nTHE BASELINE IS UNCHANGED AND THE REASON IS THE ONE STRUCTURAL FACT ABOUT THIS GENERATION. Gen 11 narrows the car and does not shorten the cabin: design/gen11.md section 5 measures the tandem cabin at about 2.86 m against a four-seat 2.684, because deleting a row and reclining to 36 degrees buys length. A GNSS heading baseline is a vector, this one runs along x, and a longer cabin is a longer roof. 0.650 m carries exactly.\n\nWHAT DOES MOVE IS THE SEAT, AND IT MOVES 48 mm DOWN. Gen 10 seats its feet at y 1.3638 and 1.3690 on body-9\'s canopy and the radomes reach 1.3780, which on body-11 stands 48.0 mm above a roof that closes at 1.3300, and the shipped attachment check calls the instance FLOATING at 33.8 mm from body-11/canopy. Ray-swept straight down onto the built canopy, this roof is FLAT: 1.3300 at z 0 from x 0.300 aft to -1.120, falling only to 1.3290 at |z| 0.10 and 1.3280 at 0.20. Both 50 mm feet therefore sit on one plane rather than on a crown that falls both ways, which is the problem autonomy-10 had to solve with a per-station seat table and this body simply does not have. Each foot is seated on 1.3300 and the radomes reach 1.3405, standing 10.5 mm proud of the glass they are bonded to, against Gen 10\'s 10.4 on a different roof.\n\nThe feet are the ground plane, which is worth saying on a car whose whole roof is glass: the alloy disc under each radome is what a patch antenna needs and the canopy cannot provide. The coax leaves each foot horizontally and runs inboard along the glass to a bonded grommet rather than piercing it. Both runs head toward the middle of the roof, and on this car that is a free choice rather than a forced one, because interior-11 does not exist to have a liner in the way; the direction is kept from autonomy-10 so that the next interior inherits a route that was already clear of one.\n\nThe three IMUs stay one per lane and travel with the compute to the tail deck, at x -1.311 on the lane boards, in the clear span between the SoC lid and the first DRAM package.',
      why: 'The pose unit is still the hinge between relative perception and the absolute map, and still the only sensor an attacker can feed from 20,000 km away, so it remains a hint to be verified and never a truth to be obeyed. Redundancy sharpens that stance: a spoofer must bend two antennas and three independent inertial histories into one consistent lie, and consistency is precisely what the voter checks.\n\nThis generation adds one argument the earlier rungs did not need. A tandem is a long thin vehicle, its side area falls from 5.1598 to 4.6293 m2, and design/gen11.md section 9 item 5 says the yaw response changes because of it. A heading estimate good to 0.3 degrees standing still is worth more on a vehicle whose yaw behaviour in a gust is less familiar, and it costs nothing extra here, which is the rare case where the package change makes an existing sensor more valuable rather than less.',
      fail: [
        'Urban multipath off glass towers still gives confident fixes that are metres wrong, and both receivers can be wrong together since they share the sky; visual localisation wins every conflict.',
        'Jamming takes both receivers at once because it takes the band, not the box; the response is demotion to inertial dead reckoning, not belief.',
        'With no fix, the three IMUs agree ever more precisely on a pose that is drifting; consensus is not accuracy, and the filter widens its stated uncertainty on schedule regardless.',
        'The three IMUs now sit in the tail at x -1.311 rather than under the cabin floor, which puts them 1.2 m behind the vehicle CG instead of 0.5 m. Lever-arm compensation from a measured mounting offset is routine and is not the risk; the risk is that the tail is a compressed structure on an 18.4 degree taper and its local stiffness is lower than a floor pan\'s, so structural modes enter the gyro signal at frequencies a floor mount did not see. Filed rather than measured, because nothing on this project computes a mode shape.',
      ],
      explode: [0, 0.6, 0],
    },
    ring: {
      name: 'Sensor ring bus',
      tagline: 'The one part on this car that has to run all the way round it, on a floor perimeter that is now a battery lid and a sill.',
      mass: 0.3,
      specs: [
        ['Topology', 'Dual counter-rotating rings'],
        ['Media', '10 Gbit automotive Ethernet, single pair'],
        ['Nodes', 'The four hv-11 zonal controllers'],
        ['Heal time', 'Under 100 us after a cut'],
        ['Plan', 'x +1.16 to -1.12, |z| 0.4815 and 0.4935, y 0.3650'],
      ],
      how: 'Every sensor patches into its nearest of hv-11\'s four zonal controllers, and the controllers are joined by two 10 Gbit rings running opposite directions around the cabin floor. Each frame is multicast both ways, so a cut anywhere leaves every node reachable the long way round, and the rings heal in under 100 microseconds, well inside one 50 ms compute tick.\n\nTHE ROUTE IS THE WHOLE POINT OF THIS PART AND IT IS RE-SWEPT, NOT ADJUSTED. autonomy-10 found its own corridor by measurement and got a good answer for body-9: |z| 0.470 to 0.482 at y 0.388, zero penetrating pairs against eight partners. On this preset the same route is 19.4 mm inside hv-11/zonal over 1,045 triangle pairs, because hv-11 redrew the zonal controllers onto a narrower sill and they now occupy |z| 0.4910 to 0.6315 at y 0.4200 to 0.5000. A corridor is a property of a preset, not of a module.\n\nTHE OBVIOUS ROUTE IS WRONG AND ONE ASYMMETRIC PART IS WHY. The cabin floor is now battery-11\'s lid at y 0.3020 and its perimeter is the sill head inner face at |z| 0.6600, so the first candidate is a loop tight against the sill at |z| 0.59, 17 mm over the lid. A 5 mm voxel sweep says that is clear for 2.46 m on the DRIVER flank and it is not clear on the passenger flank, because suspension-9/air-supply is a SINGLE line rather than a mirrored pair: it runs |z| 0.5700 to 0.6174 at y 0.302 to 0.336 on the +z side only, sweeping inboard and outboard along its length. A route chosen on one flank and mirrored would have shipped a ring through it, which is the same shape of error as a mount placed by coordinate.\n\nSO THE CORRIDOR IS THE ONE THAT IS CLEAR ON BOTH FLANKS, SWEPT AS A PAIR. Occupancy was built for +z and -z together and only cells clear on both sides count. The widest such channel at cabin-floor height is y 0.3650 over |z| 0.4650 to 0.5100, clear for the full 2.40 m from x -1.20 to +1.20 with a 10 mm halo in y and z. The two loops run on 0.4815 and 0.4935, 12 mm apart on the centre of that band, 57 mm over the pack lid and 24.5 mm inboard of the nearest node face.\n\nTHE ENDS ARE NOT SYMMETRIC EITHER, AND ALSO BY MEASUREMENT. The forward cross-car run sits at x 1.16, where a 24 mm tall box across the whole cabin is clear; at x 1.20 it is not, because suspension-9/steering arrives with 122 vertices. The rear cross-car run sits at x -1.12 rather than -1.16, where hv-11/hv-runs puts two vertices into the same box. Gen 10 solved its rear crossing by lifting the run 57 mm in y; this one solves it by moving 40 mm in x, and the difference is that on this car the height above the run is a person\'s heel.\n\nTHE FOUR NODES GO UNDER THE CONTROLLERS RATHER THAN BESIDE THEM. autonomy-10 stands its gland blocks off the controllers\' inboard wall, and on hv-11 that volume is taken: swept at (1.115, 0.460, |z| 0.455) a 60 by 46 by 48 mm block collects 10 vertices of hv-11/bywire-feeds. The controllers\' underside is free, on all four corners, in a box 60 by 46 by 44 mm at (plus and minus 1.115, 0.387, plus and minus 0.530). Each block\'s top face is therefore y 0.4100, 10.0 mm under the controller floor at 0.4200, with four drops bridging the gap. That is a standoff and not a landing, exactly as Gen 10\'s was for a different reason, and 10.0 mm is inside the 15.0 mm the attachment check calls touching.',
      why: 'A star network has a centre and a centre is a single point; a ring has none, which is the topology the fail-operational argument demands of the wiring and not just of the silicon. That argument is unchanged and so is the geometry that makes it mean something: both loops inside the cabin floor, nothing outboard of |z| 0.4935, nothing near an axle, and nothing in the rear annulus band the drivetrain owns.\n\nWhat the tandem changes is the length. A 1.20 m car has a shorter cross-car run and a longer flank run, so the loop is nearly the same total length arranged differently, and the practical consequence is that the two counter-rotating arcs are LESS different from each other than they were: on a wide car a cut at the front cross-run leaves two very unequal surviving arcs, and on this one it leaves two long flanks. That is a small improvement in the worst-case heal path and it is the only thing about this part the narrow body made better.',
      fail: [
        'Both rings still run the same perimeter, 12 mm apart, so a hard corner intrusion severs them together and healing only reroutes the surviving arcs. On this car that is worse than it was, because the corridor is 57 mm above a pack lid with battery-11\'s structural sill immediately outboard of it and there is no second corridor at this height. Genuinely separated routing is a body and interior decision and it is not claimed here.',
        'The route is only clear because suspension-9/air-supply happens to be a single unmirrored line, and a suspension generation that mirrors it for symmetry closes the driver-flank half of this corridor without touching this module. Nothing declares it and nothing would catch it except a re-sweep, which is the argument for a corridor declaration this project does not have.',
        '10 Gbit on a single pair beside 48 V switching hardware is an EMC knife fight; error bursts under inverter transients are absorbed by forward error correction, and sustained degradation drops the link rate with the stack shedding camera resolution honestly.',
        'Both rings speak the same protocol stack, so a malformed frame that wedges one switch can wedge its twin; the zonal controllers carry independent watchdogs precisely because voting does not apply to the wire.',
      ],
      explode: [0, -0.45, 0],
    },
  },
};

/* ── Detail vocabulary, carried from autonomy-10 ──────────────────────────

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

   One qualifier carried with it, because it is the reason autonomy-10's
   own visibility test was wrong the first time: transparent meshes are not
   blockers. Treating the lidar's M.glass window as opaque buries 27 meshes a
   puck, and a visibility test that cannot tell a window from a wall reports
   a correct sensor as a defect. */

const YUP = new THREE.Vector3(0, 1, 0);

/* A fastener head seated on a face whose outward normal is n. */
function screw(p, n, r, mat = M.steel, type = 'hex') {
  const g = lib.fastener(r, mat, type);
  g.quaternion.setFromUnitVectors(YUP, new THREE.Vector3(n[0], n[1], n[2]).normalize());
  g.position.set(p[0], p[1], p[2]);
  return g;
}

/* Sealed circular connector: mounting flange, shell, keyed collar, and a
   strain-relief boot. Mounting face on y = 0 growing along +Y. */
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

/* A lens barrel growing along +X from x = 0: barrel, retaining ring, and the
   front element. elMat exists because an IR optic is NOT clear: a 940 nm
   emitter or a bandpass-filtered IR imager reads black to the eye, so those
   elements pass M.sensor and merge, while a visible-light camera keeps
   M.glass and stays a separate transparent draw call. */
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

/* A flat annulus with its axis along +X, centred on the local origin. */
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

   Chosen by a paired occupancy sweep and not by drawing. A 5 mm voxel grid
   over body-11, battery-11, hv-11, thermal-11, wheels-11, drivetrain-9 and
   suspension-9 was built for BOTH flanks at once, so a cell counts as clear
   only when it is clear at +z and at -z. That pairing is the whole method
   here: suspension-9/air-supply is one unmirrored line at |z| 0.5700 to
   0.6174 on the +z side, so the tightest-to-the-sill route is clear on the
   driver flank and blocked on the passenger flank, and a route measured on
   one side and mirrored would have shipped through it.

   The widest channel clear on both flanks is y 0.3650 over |z| 0.4650 to
   0.5100, running the full 2.40 m from x -1.20 to +1.20 with a 10 mm halo.
   The loops take the centre of it at 0.4815 and 0.4935.

   The ends are measured separately because they are not symmetric. A 24 mm
   tall box across the whole cabin at x 1.16 is clear; at x 1.20 it collects
   122 vertices of suspension-9/steering. At x -1.16 it collects two of
   hv-11/hv-runs and at -1.12 it is clear. Both loops clear the rear annulus
   by construction rather than by luck: the band is |z| 0.65 to 0.73 and
   nothing here is outboard of |z| 0.4935. */

const RING = { XF: 1.16, XR: 1.12, R: 0.14, yS: 0.3650, yF: 0.3650, yR: 0.3650 };
const RING_W = [0.4815, 0.4935];
const RING_R = 0.0045;

/* Rounded rectangle in plan with a per-end height, returned as a closed
   world-space polyline. Straight runs get intermediate stations so the
   cleats land every 200 to 350 mm, which is what an automotive loom is
   actually clipped at. */
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
   cleat a cable. Oriented to the local tangent so the block sits across the
   pair. One InstancedMesh, 44 triangles a cleat. */
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

/* ── The header casting ───────────────────────────────────────────────────

   autonomy-10 dropped this frame to y 1.290 to get the forward camera wedge
   out of body-9's canopy. body-11's roof is 38 mm lower and the frame does
   NOT have to move again, which is a coincidence and is therefore checked
   rather than assumed. The frame sits at x 0.42, where the canopy is falling
   toward the windscreen rather than sitting at its crown: ray-swept on the
   built glass, 1.3189 at (0.3925, 0), 1.3166 at (0.3925, 0.060) and 1.3123
   at (0.4475, 0). The wedge's highest point is its back-top edge under the
   frame's own -0.1 rad tilt, and the frame comes down 2 mm to 1.288 for one
   measured reason: at Gen 10's own 1.290 the wedge's upper front corner grazes
   body-11/skin by 0.09 mm over 6 triangle pairs at (0.429, 1.304, 0.057),
   which is a graze rather than an intrusion and is still a pair the shipped
   predicate counts. At 1.288 the corner clears by 2.1 mm and the binding
   corner at the back clears the canopy by 9.9 mm, against Gen 10's 7.74 on
   body-9.

   The driver monitor is NOT on this frame any more, so the rail carries the
   wedge alone and is 90 mm shorter in z. See the dms panel for why. */

const HDR = { pos: [0.42, 1.288, 0], tilt: -0.1 };

function headerFrame() {
  const g = new THREE.Group();
  g.rotation.z = HDR.tilt;
  g.position.set(HDR.pos[0], HDR.pos[1], HDR.pos[2]);
  return g;
}

/* Antenna seats: [x station, seat y]. body-11's canopy is FLAT over the whole
   head corridor, 1.3300 at z 0 from x 0.300 aft to -1.120 and 1.3280 at
   |z| 0.20, so a 50 mm foot lands on one plane and the per-station seat table
   autonomy-10 needed on body-9's crown is not needed here. Both stations are
   inside the flat and 0.650 m apart, which is the baseline the panel
   publishes and which the tandem did not touch. */
const ROOF_SEAT = [
  /* x, seat y, coax direction in x */
  [0.250, 1.3300, -1],
  [-0.400, 1.3300, +1],
];

/* ── The compute station ──────────────────────────────────────────────────

   CX is the cold plate centre and CY its underside. Every absolute
   coordinate inside the lane assembly is autonomy-10's, shifted by DX and DY,
   so the machine is demonstrably the same machine and only its address
   changed. DX = -0.766 and DY = +0.385.

   The four feet are the only numbers in here that are not a shift: they are
   the highest cage vertex under each 24 mm footprint, ray-swept on the built
   body-11 tail cant rail. The rail is a rounded section whose top varies
   21 mm over 300 mm of x, so a flat deck on its nominal height touches at one
   point and floats at three. */
const DX = -0.766;
const DY = 0.285;
const CX = -0.55 + DX;                 // -1.316
/* x station, arm reach in |z|, and the HIGHEST cage vertex anywhere under
   the shoe and arm footprint, ray-swept at 2 mm over the whole strip rather
   than at the shoe centre. An earlier draft measured a 24 mm box around a
   chosen point, missed the rail's true crown by 1.1 mm at the aft station and
   drove 32 triangle pairs 5.78 mm into body-11/cage. The shoes sit 1.5 mm
   above the crown, which is a bond line and not a fit, and 1.5 mm is inside
   the 15.0 mm the attachment check calls touching. */
const FEET = [
  [-1.234, 0.455, 0.7540],
  [-1.398, 0.435, 0.7456],
];
const STRAP_Z = 0.402;                 // inboard of the rail: its inner face
                                       // measures |z| 0.4334 at x -1.234 and
                                       // 0.4153 at -1.398
const DECK_BOT = 0.3895 + DY;          // 0.6745, the cold plate underside

export function build() {
  const sys = new THREE.Group();

  /* ── cameras ─────────────────────────────────────────────────────────
     Wedge of two behind the windshield header, on its own cast rail. */
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

  /* The cast rail. It is 0.060 m in z rather than autonomy-10's 0.150,
     because the driver monitor arm that used to run off its -z end is gone
     and a rail 90 mm longer than the thing it carries is a mass a panel
     cannot defend. */
  const rail = lib.cbox(0.050, 0.015, 0.060, 0.004, M.castAlu);
  rail.position.set(0, -0.0235, 0);
  wf.add(rail);
  const railRib = lib.cbox(0.014, 0.008, 0.048, 0.002, M.castAlu);
  railRib.position.set(0, -0.0345, 0);
  wf.add(railRib);
  /* Four bolts pulling the wedge onto the rail, on the underside of two
     machined pads, which is the only face here anybody can see. */
  for (const sz of [1, -1]) {
    const bossPad = lib.cbox(0.044, 0.003, 0.016, 0.0008, M.alu);
    bossPad.position.set(0, -0.0325, sz * 0.020);
    wf.add(bossPad);
    for (const sx of [1, -1]) {
      wf.add(screw([sx * 0.019, -0.0340, sz * 0.020], [0, -1, 0], 0.0026, M.steel));
    }
  }
  camWedge.add(wf);
  sys.add(camWedge);

  /* Flank cameras at the mirror station. x 0.780 is just ahead of the front
     occupant's shoulder at thermal-11's built hip station of 0.700, and the
     body surface there measures |z| 0.5901 at y 1.010. The camera is yawed
     so that it looks forward and outboard through its own aperture, and its
     two mount pads carry the whole assembly on the flank rather than on an
     interior module: the pads' outer faces sit on |z| 0.5891, 1.0 mm off the
     measured skin, which is what makes these instances ATTACHED on a preset
     where interior-11 does not exist. Gen 10's pair reads 273.6 mm of open
     air on this same preset for exactly the opposite reason. */
  for (const s of [1, -1]) {
    const bp = lib.part('cameras', [0, 0.2, 0.5 * s]);
    const bcam = camUnit(0.036, 0.030, 0.024, 0.009, 0.022);
    bcam.rotation.y = -1.15 * s;
    bcam.position.set(0.780, 1.010, 0.5480 * s);
    bp.add(bcam);
    /* Two pads rather than one on the axis, because the camera's own harness
       tail leaves the back face on that axis. They are 20 mm tall, not 40:
       the flank tumbles 0.24 mm per mm of height here, so a tall pad seated
       at its centre stands proud at the bottom and buries its top. */
    const foot = new THREE.Group();
    for (const fx of [1, -1]) {
      const pad = lib.cbox(0.010, 0.020, 0.0080, 0.0009, M.castAlu);
      pad.position.set(0.780 + fx * 0.013, 1.010, s * 0.5770);
      foot.add(pad);
      foot.add(screw([0.780 + fx * 0.013, 1.010, s * 0.5810], [0, 0, s], 0.0024, M.steel));
    }
    bp.add(foot);
    sys.add(bp);
  }

  /* Rear camera in the Kamm face. body-11's tail cone measures x -2.4405 at
     (y 0.900, z 0) and its kamm flap spans x -2.3672 to -2.1827 at y 0.9444
     to 1.0182, so the unit sits under the flap and behind nothing, with the
     lens face 12.5 mm off the tail skin. */
  const camRear = lib.part('cameras', [-0.5, 0.25, 0]);
  const rc = camUnit(0.035, 0.025, 0.02, 0.007, 0.018);
  rc.rotation.y = Math.PI;
  rc.position.set(-2.410, 0.900, 0);
  camRear.add(rc);
  /* Washer nozzle ABOVE the lens, carried from Gen 10 for the reason Gen 10
     gives: hung underneath it lands in the flap below. */
  const nozBody = lib.cbox(0.012, 0.009, 0.010, 0.002, M.plasticLt);
  nozBody.position.set(-2.4025, 0.9205, 0.022);
  camRear.add(nozBody);
  const noz = lib.cyl(0.0022, 0.011, M.plasticLt, 8);
  noz.rotation.z = Math.PI / 2;
  noz.position.set(-2.4140, 0.9205, 0.022);
  camRear.add(noz);
  sys.add(camRear);

  /* Thermal imager in the nose face. body-11's skin at (y 0.530, z 0)
     measures x 2.3630 against body-9's 2.375, so the casing comes back 4 mm
     from Gen 10's station and the germanium window face lands on 2.358, with
     5.0 mm of clear air ahead of it. */
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
  th.position.set(2.335, 0.53, 0);
  camTherm.add(th);
  sys.add(camTherm);

  /* ── radars ──────────────────────────────────────────────────────────
     The front unit moves 10 mm forward. body-11's bumper beam narrowed to a
     1.00 m span when the car did and its front face measures x 2.2620 at
     y 0.500, so the assembly's rearmost feature, the connector boot at
     x 2.277, clears it by 15.0 mm and the radome stops at 2.326 with the nose
     skin 38.8 mm ahead at 2.3648.

     THE FOUR CORNERS ARE IN ONE lib.part GROUP A SIDE rather than four
     groups, carried from autonomy-10 as a deliberate tradeoff: it is ten
     fewer draw calls on the module with the highest merged mesh count on the
     car, and SPEC.md is explicit that it means [attachment] and [enclosure]
     can only say that SOMETHING in the group is attached. It is taken again
     here with the same eyes open, and the per-unit clearances are published
     in the panel and in the mount table above so that the granularity the
     checker loses is not lost to a reader.

     Front corners: (2.140, 0.440, plus and minus 0.470), where a 90 by 80 by
     90 mm box holds zero partner vertices, the nose flank is |z| 0.5540 and
     the beam is 122 mm ahead. Rear corners: (-2.300, 0.650, plus and minus
     0.360), aft of body-11's rear casting which reaches x -2.245 at |z| up to
     0.560, with the tail flank at |z| 0.4502. */
  const radFront = lib.part('radars', [0.55, 0, 0]);
  const fr = radarUnit(0.150, 0.086, 0.028, 0.036, 9);
  fr.position.set(2.290, 0.50, 0);
  radFront.add(fr);
  sys.add(radFront);

  for (const s of [1, -1]) {
    const cnr = lib.part('radars', [0.10, -0.05, 0.45 * s]);
    const fu = radarUnit(0.090, 0.060, 0.020, 0.015, 5);
    fu.rotation.y = -0.7 * s;
    fu.position.set(2.140, 0.440, 0.470 * s);
    cnr.add(fu);
    /* Front corner strut, up to body-11's crash rail. Its underside is a flat
       at y 0.5050 over |z| 0.44 to 0.47 for every x from 2.10 to 2.18,
       up-rayed on the built rail, so the strut tops out on 0.5040 and the
       bracket line is 1.0 mm of shim rather than a fit. The bolt head is
       seated 3.5 mm below the strut top rather than on it, because
       lib.fastener grows along its normal and a head seated on the mating
       face stands 2.8 mm INSIDE the partner: that is 24 triangle pairs at
       0.62 mm, measured, on the first build of this bracket. Without it the whole
       corner group is 29.2 mm from the nearest surface on the car and the
       attachment check calls it floating, which is what four autonomy-4
       radars did for ten generations. */
    const fbr = lib.cbox(0.030, 0.033, 0.016, 0.0012, M.castAlu);
    fbr.position.set(2.140, 0.4875, 0.470 * s);
    cnr.add(fbr);
    cnr.add(screw([2.140, 0.5005, 0.470 * s], [0, 1, 0], 0.0028, M.steel));
    const ru = radarUnit(0.090, 0.060, 0.020, 0.015, 5);
    ru.rotation.y = Math.PI + 0.7 * s;
    ru.position.set(-2.300, 0.650, 0.360 * s);
    cnr.add(ru);
    /* Rear corner strut, outboard to body-11's tail cone. Its inner surface
       is |z| 0.4502 at x -2.300 over the whole y 0.60 to 0.68 band, z-rayed
       on the built cone, and it TAPERS: 0.4531 at x -2.291 and 0.4472 at
       -2.309, 0.33 m of |z| per metre of x. A 49 mm strut reaching 0.4492 was
       therefore 2.80 mm inside the cone at its aft end over 102 triangle
       pairs even though its centre station cleared, which is the same
       flat-part-on-a-curved-surface error the antenna feet exist to avoid. It
       is 18 mm long and stops on 0.4400, which clears the worst station on
       its own footprint by 7.2 mm. */
    const rbr = lib.cbox(0.018, 0.020, 0.040, 0.0012, M.castAlu);
    rbr.position.set(-2.300, 0.650, 0.4200 * s);
    cnr.add(rbr);
    cnr.add(screw([-2.300, 0.650, 0.4360 * s], [0, 0, s], 0.0026, M.steel));
    sys.add(cnr);
  }

  /* ── lidar ───────────────────────────────────────────────────────────
     Unmoved from autonomy-10 and re-measured rather than carried: the nose
     half-width at (2.320, 0.615) is |z| 0.5103 and the pucks reach 0.338, so
     the flank is 172 mm away and what binds them is the light band's back
     face at x 2.3640 against a window reaching 2.3585. */
  for (const s of [1, -1]) {
    const lid = lib.part('lidar', [0.5, 0.15, 0.3 * s]);
    const puck = new THREE.Group();
    /* The casting stops on x 0.020 so the aperture is open forward of it. */
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
    const ltail = connector(0.0048, 0.013, M.plastic);
    ltail.rotation.z = Math.PI / 2;
    ltail.position.set(-0.037, 0, 0);
    puck.add(ltail);
    /* Ears sideways, not up: the body skin is close above this puck and an
       ear plus a bolt head on the crown left 2.4 mm of it on Gen 10. */
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

  /* ── the asymmetric triplex, on the tail deck ────────────────────────
     One cold plate carrying three lanes across z, the voter bar on the
     forward edge, two diode-ORed 48 V feeds and a coolant pair running
     forward to thermal-11's declared bulkhead. The machine is autonomy-10's
     shifted by (DX, DY): the cold plate does not shrink because it is sized
     by the 640 W peak and the peak is held, and the flank fin banks stay at
     half Gen 4's height because they are sized by the shed load through a
     pump failure and that halved with the architecture.

     The three lanes are still built to be told apart, because that IS the
     architecture: lane A a tall vapour-chamber lid, four DRAM packages and a
     six-phase power stage; lane B a low lid, two DRAM, a three-phase stage
     and its own separate program store holding a different binary; lane C a
     low lid, two DRAM, a two-phase stage and four hold-up capacitors that
     hold its rails through the 60 ms wake. One bar, two bars, three bars cast
     into the deck edge. */
  const comp = lib.part('compute', [-0.55, 0.35, 0]);

  /* The plate HANGS from body-11's tail cant rail rather than standing on it,
     because interior-11 claims the volume above: its luggage box is
     x -1.3950 to -1.1499, y 0.7750 to 1.1132, |z| up to 0.4050, and an
     earlier draft of this module put 1,277 crossing triangle pairs 142.65 mm
     inside it. The whole assembly now lives UNDER that floor, y 0.6745 to
     0.7511, with 23.9 mm of air between its tallest feature and the luggage
     boards. Two shoes a station on the rail crown, two straps down its
     inboard face, one channel a station carrying the plate. */
  for (const [fx, fz, top] of FEET) {
    const seat = top + 0.0015;
    for (const s of [1, -1]) {
      const shoe = lib.cbox(0.030, 0.006, 0.024, 0.0012, M.castAlu);
      shoe.position.set(fx, seat + 0.003, s * fz);
      comp.add(shoe);
      comp.add(screw([fx, seat + 0.006, s * fz], [0, 1, 0], 0.0030, M.steel, 'torx'));
      /* arm inboard off the rail crown to the strap line */
      const reach = fz - STRAP_Z;
      const arm = lib.cbox(0.030, 0.006, reach, 0.0012, M.castAlu);
      arm.position.set(fx, seat + 0.003, s * (STRAP_Z + reach / 2));
      comp.add(arm);
      const h = seat + 0.006 - DECK_BOT;
      const strap = lib.cbox(0.024, h, 0.014, 0.0012, M.castAlu);
      strap.position.set(fx, DECK_BOT + h / 2, s * STRAP_Z);
      comp.add(strap);
    }
    const chan = lib.cbox(0.030, 0.014, 2 * STRAP_Z + 0.014, 0.0018, M.castAlu);
    chan.position.set(fx, DECK_BOT - 0.007, 0);
    comp.add(chan);
  }

  const cold = lib.cbox(0.420, 0.044, 0.300, 0.005, M.castAlu);
  cold.position.set(CX, 0.417 + DY, 0);
  comp.add(cold);
  const cflash = lib.cbox(0.4245, 0.0022, 0.3045, 0.0006, M.castAlu);
  cflash.position.set(CX, 0.4115 + DY, 0);
  comp.add(cflash);
  const deck = lib.cbox(0.404, 0.007, 0.284, 0.0015, M.alu);
  deck.position.set(CX, 0.4425 + DY, 0);
  comp.add(deck);
  const ribs = lib.fins(0.380, 0.0055, 0.260, 9, 0.005, M.castAlu);
  ribs.position.set(CX, 0.3922 + DY, 0);
  comp.add(ribs);

  const LANES = [
    { z: -0.095, bars: 1, lid: 0.0060, dram: 4, phases: 6, holdup: 0, store: false },
    { z: 0.000, bars: 2, lid: 0.0028, dram: 2, phases: 3, holdup: 0, store: true },
    { z: 0.095, bars: 3, lid: 0.0028, dram: 2, phases: 2, holdup: 4, store: false },
  ];
  for (const L of LANES) {
    const zi = L.z;
    for (const sx of [1, -1]) for (const sz of [1, -1]) {
      const so = lib.cyl(0.0022, 0.0035, M.alu, 6);
      so.position.set(-0.545 + DX + sx * 0.130, 0.44775 + DY, zi + sz * 0.033);
      comp.add(so);
    }
    const pcb = lib.cbox(0.280, 0.0016, 0.082, 0.0005, M.pcb);
    pcb.position.set(-0.545 + DX, 0.4503 + DY, zi);
    comp.add(pcb);
    /* SoC: identical substrate on every lane, because the silicon is
       identical and every lane is promotable. The LID is what differs. */
    const sub = lib.cbox(0.054, 0.0022, 0.054, 0.0006, M.pcb);
    sub.position.set(-0.600 + DX, 0.4522 + DY, zi);
    comp.add(sub);
    const ihs = lib.cbox(0.042, L.lid, 0.042, 0.0009, M.alu);
    ihs.position.set(-0.600 + DX, 0.4533 + DY + L.lid / 2, zi);
    comp.add(ihs);
    for (let i = 0; i < L.dram; i++) {
      const d = lib.cbox(0.010, 0.0014, 0.019, 0.0003, M.plastic);
      d.position.set(-0.500 + DX + i * 0.014, 0.4518 + DY, zi);
      comp.add(d);
    }
    /* Power stage: one inductor a phase, so the lane's rate shows in its own
       copper before anybody opens the panel. */
    const vrmW = 0.006 + L.phases * 0.0042;
    const vrmX = -0.6270 + DX - vrmW / 2;
    const vrm = lib.cbox(vrmW, 0.005, 0.030, 0.0012, M.darkSteel);
    vrm.position.set(vrmX, 0.4536 + DY, zi);
    comp.add(vrm);
    for (let i = 0; i < L.phases; i++) {
      const ind = lib.cbox(0.0034, 0.0040, 0.0060, 0.0008, M.copper);
      ind.position.set(vrmX - vrmW / 2 + 0.0051 + i * 0.0042, 0.4581 + DY, zi + 0.0095);
      comp.add(ind);
    }
    if (L.store) {
      const nor = lib.cbox(0.011, 0.0016, 0.008, 0.0004, M.darkSteel);
      nor.position.set(-0.4560 + DX, 0.4519 + DY, zi - 0.026);
      comp.add(nor);
    }
    for (let i = 0; i < L.holdup; i++) {
      const cap = lib.cyl(0.0035, 0.0090, M.alu, 10);
      cap.position.set(-0.4700 + DX + i * 0.0090, 0.4556 + DY, zi - 0.026);
      comp.add(cap);
    }
    /* Stiffener frame round the SoC substrate. A 54 mm package on a 1.6 mm
       board warps as it heats, and the frame is what a real one carries. */
    for (const sz2 of [1, -1]) {
      const bar = lib.cbox(0.062, 0.0030, 0.005, 0.0008, M.alu);
      bar.position.set(-0.600 + DX, 0.4526 + DY, zi + sz2 * 0.0295);
      comp.add(bar);
      const bar2 = lib.cbox(0.005, 0.0030, 0.054, 0.0008, M.alu);
      bar2.position.set(-0.600 + DX + sz2 * 0.0295, 0.4526 + DY, zi);
      comp.add(bar2);
    }
    /* Decoupling bank on the board's forward edge, two plus one a phase.
       lib.box, not lib.cbox: a 2.6 mm ceramic has no chamfer anybody can see
       and 32 triangles each is 544 across the three lanes. */
    for (let i = 0; i < 2 + L.phases; i++) {
      const cap = lib.box(0.0026, 0.0018, 0.0045, M.darkSteel);
      cap.position.set(-0.5620 + DX + i * 0.0038, 0.4520 + DY, zi - 0.0335);
      comp.add(cap);
    }
    const hdr = lib.cbox(0.009, 0.007, 0.026, 0.0015, M.plastic);
    hdr.position.set(-0.4095 + DX, 0.4546 + DY, zi);
    comp.add(hdr);
    const vc = connector(0.0042, 0.010, M.plastic);
    vc.rotation.z = Math.PI / 2;
    vc.position.set(-0.3775 + DX, 0.4535 + DY, zi);
    comp.add(vc);
    comp.add(lib.tube([
      [-0.3895 + DX, 0.4535 + DY, zi],
      [-0.3960 + DX, 0.4562 + DY, zi],
      [-0.4050 + DX, 0.4552 + DY, zi],
    ], 0.0022, M.plasticLt, false, 12));
    /* lane number cast into the deck edge: one bar, two bars, three */
    for (let b = 0; b < L.bars; b++) {
      const bar = lib.cbox(0.010, 0.0014, 0.0025, 0.0004, M.alu);
      bar.position.set(-0.3900 + DX, 0.4467 + DY, zi - 0.010 + b * 0.007);
      comp.add(bar);
    }
  }

  /* the voter: a sealed can with a machined lid and four screws, because it
     is the one element the architecture cannot vote on */
  const voter = lib.cbox(0.035, 0.018, 0.270, 0.0035, M.darkSteel);
  voter.position.set(-0.36 + DX, 0.454 + DY, 0);
  comp.add(voter);
  const vlid = lib.cbox(0.029, 0.0030, 0.264, 0.0008, M.alu);
  vlid.position.set(-0.36 + DX, 0.4625 + DY, 0);
  comp.add(vlid);
  for (const sz of [-0.125, -0.042, 0.042, 0.125]) {
    comp.add(screw([-0.36 + DX, 0.4640 + DY, sz], [0, 1, 0], 0.0028, M.steel));
  }

  /* Flank heatsink banks, the coolant-loss reserve rather than the steady
     state path, at half the height Gen 4 needed. */
  for (const s of [1, -1]) {
    const base = lib.cbox(0.310, 0.008, 0.048, 0.0018, M.castAlu);
    base.position.set(CX, 0.399 + DY, 0.176 * s);
    comp.add(base);
    const bank = lib.fins(0.300, 0.017, 0.044, 9, 0.0025, M.castAlu);
    bank.position.set(CX, 0.4115 + DY, 0.176 * s);
    comp.add(bank);
    for (const sx of [1, -1]) {
      const cap = lib.cbox(0.006, 0.025, 0.048, 0.0015, M.castAlu);
      cap.position.set(CX + sx * 0.153, 0.4075 + DY, 0.176 * s);
      comp.add(cap);
    }
  }

  /* two 48 V feeds from separate hv-11 zonal controllers, diode-ORed into
     one block, then a run out along each heatsink bank */
  const feed = lib.cbox(0.026, 0.022, 0.088, 0.0035, M.hv);
  feed.position.set(-0.3350 + DX, 0.4150 + DY, 0);
  comp.add(feed);
  for (const s of [1, -1]) {
    const fc = connector(0.0050, 0.014, M.hv);
    fc.position.set(-0.3350 + DX, 0.4260 + DY, 0.030 * s);
    comp.add(fc);
  }
  for (const s of [1, -1]) {
    comp.add(lib.tube([
      [-0.3350 + DX, 0.4410 + DY, s * 0.030],
      [-0.3400 + DX, 0.4440 + DY, s * 0.090],
      [-0.3560 + DX, 0.4440 + DY, s * 0.150],
      [-0.4000 + DX, 0.4430 + DY, s * 0.176],
      [-0.5500 + DX, 0.4430 + DY, s * 0.176],
      [-0.7060 + DX, 0.4430 + DY, s * 0.176],
    ], 0.0026, M.hv, false, 26));
    const gland = lib.cbox(0.010, 0.011, 0.014, 0.0025, M.plasticLt);
    gland.position.set(-0.7100 + DX, 0.4430 + DY, s * 0.176);
    comp.add(gland);
  }

  /* earth stud with its ring terminal: the chassis reference for three lanes
     that have to agree about what zero volts means */
  const stud = lib.cyl(0.0030, 0.0090, M.busbar, 8);
  stud.position.set(-0.7300 + DX, 0.4505 + DY, -0.140);
  comp.add(stud);
  const lug = lib.cbox(0.018, 0.0016, 0.010, 0.0004, M.copper);
  lug.position.set(-0.7205 + DX, 0.4548 + DY, -0.140);
  comp.add(lug);
  comp.add(screw([-0.7300 + DX, 0.4556 + DY, -0.140], [0, 1, 0], 0.0032, M.steel));

  /* THE COOLANT RUN, and it is this module's hose because thermal-11 says so:
     "roughly 0.7 m of hose and 0.3 kg belong to whichever module the
     integrator assigns them to". Two lines leave the plate's driver flank,
     drop to the sill wall and run forward along it to thermal-11's bulkhead.

     THE ROUTE IS THREE MEASURED CONSTRAINTS AND NOTHING ELSE. First, the
     |z| 0.6560 plane this module has to touch only EXISTS between y 0.4820
     and about y 0.5875: below it hv-11's spine, hv-runs and by-wire feeds
     fill the sill pocket out to the upstand, and above it body-11's shoulder
     crease closes in from |z| 0.6900 at y 0.5600 to 0.6000 at 0.6200, so a
     hose at z -0.6440 is outside the car by y 0.600. An earlier draft arced
     the feed to y 0.6150 over the bulkhead and put 36 triangle pairs 10.68 mm
     through body-11/shoulder for it. Second, that band is not
     clear along its length: swept at 20 mm over x -1.24 to -0.94, the plane
     z -0.6560 is blocked at x -1.10 and -1.08 by body-11's shoulder, at -1.04
     to -1.00 by its cage rear leg and floor pan, and from -0.98 forward by
     thermal-11's own bulkhead and recovery core. The one continuous lane
     across the whole span is z -0.5800, clear from x -1.24 to -0.94 in the
     same y band, and it is 10 mm wide rather than generous: at z -0.5900 the
     same sweep collects thermal-11's recovery core at x -0.94, and at -0.5500
     it collects hv-11/zonal, whose lid is y 0.5000 over |z| 0.4910 to 0.6315.
     So the two hoses are stacked in Y on one z lane at 0.5350 and 0.5500
     rather than run side by side, which is what a 10 mm lane allows. Third, the saddle that realises the declared plane therefore
     goes where the plane is actually reachable, x -1.180 to -1.140, which the
     same sweep shows empty from z -0.6560 inboard.

     WHERE THEY END IS A FINDING RATHER THAN A CHOICE. thermal-11's bulkhead
     carries two r 0.007 ports as VERTICAL stubs on one axis at
     (-0.900, z -0.6250), y 0.498 to 0.524 and 0.534 to 0.560, 36 mm apart in
     y. Only the upper one has a reachable face: anything landing on the lower
     port from above passes through the upper one, from below passes under a
     plate whose underside at y 0.494 leaves 12 mm to hv-11's by-wire feeds at
     0.4820, and from inboard passes through the plate's own inboard face at
     z -0.632. So the feed arcs over the bulkhead and drops coaxially onto the
     upper port, its 6 mm hose wall stopping on y 0.5610 against a port top of
     0.5600, and the return lands the same way on the plate's own top face at
     (-0.860, z -0.6440), its wall on y 0.5650 against a plate top of 0.5640.
     Both clearances are 1.0 mm and both are measured to the tube SURFACE
     rather than to its axis, which is the error an earlier draft of this run
     made in both places and paid 2.72 mm for. Both standoffs are deliberate:
     DECLARED_JOINTS ships empty and this generation's gate is zero NEW
     penetrating pairs, so a hose sleeved over a spigot would be an undeclared
     interference. The fail list names what has to change in thermal-11 for
     the lower port to be reachable at all. */
  const HOSE = [
    { mat: M.coolant, r: 0.0060, pts: [
      [-1.1600, 0.6980, -0.1520],
      [-1.1700, 0.6300, -0.3900],
      [-1.1650, 0.5700, -0.5300],
      [-1.1600, 0.5350, -0.5800],
      [-1.0600, 0.5350, -0.5800],
      [-0.9400, 0.5620, -0.5800],
      [-0.9100, 0.5730, -0.6180],
      [-0.9000, 0.5810, -0.6250],
      [-0.9000, 0.5670, -0.6250],
    ] },
    { mat: M.coolantHot, r: 0.0060, pts: [
      [-1.1600, 0.6980, -0.1820],
      [-1.1700, 0.6300, -0.4200],
      [-1.1650, 0.5750, -0.5300],
      [-1.1600, 0.5500, -0.5800],
      [-1.0600, 0.5500, -0.5800],
      [-0.9400, 0.5780, -0.5800],
      [-0.9000, 0.5780, -0.6100],
      [-0.8700, 0.5780, -0.6350],
      [-0.8600, 0.5710, -0.6440],
    ] },
  ];
  for (const H of HOSE) {
    const boss = lib.cyl(0.0110, 0.0070, M.castAlu, 12);
    boss.rotation.z = Math.PI / 2;
    boss.position.set(-1.1600, H.pts[0][1], H.pts[0][2] + 0.0130);
    comp.add(boss);
    comp.add(lib.tube(H.pts, H.r, H.mat, false, 36));
  }
  /* Two P-clips on the flank run and the saddle that REALISES the plane
     thermal-11 declares. The saddle straddles both hoses on the sill wall at
     x -1.180 to -1.140, and its outboard face is z -0.6560 to the digit: that
     face is the vertex the interface block at the top of this file points at,
     and extent min is true of the whole part because nothing else in it goes
     further outboard. */
  for (const [cx, cy, cz] of [[-1.0600, 0.5350, -0.5860], [-1.0600, 0.5500, -0.5860]]) {
    const clip = lib.cbox(0.012, 0.024, 0.010, 0.0015, M.plasticLt);
    clip.position.set(cx, cy, cz);
    comp.add(clip);
  }
  const saddle = lib.cbox(0.040, 0.060, 0.020, 0.0018, M.castAlu);
  saddle.position.set(-1.160, 0.5240, -0.6460);
  comp.add(saddle);
  for (const sy of [1, -1]) {
    comp.add(screw([-1.160, 0.5240 + sy * 0.022, -0.6340], [0, 0, 1], 0.0028, M.steel));
  }
  for (const H of HOSE) {
    const strap = lib.cbox(0.010, 0.014, 0.030, 0.0010, M.plasticLt);
    strap.position.set(-1.160, H.pts[3][1], -0.6100);
    comp.add(strap);
  }

  sys.add(comp);

  /* ── driver monitor ──────────────────────────────────────────────────
     On body-11's cowl cross member, on the axis, looking aft and up. The
     cage top face there measures y 0.8919 over x 0.980 to 1.000 at |z| up to
     0.140, with thermal-11's air handler stopping 10 mm below it at 0.882.
     The pod sits at (1.000, 0.930, 0), 0.830 m from the eye point implied by
     thermal-11's built hip station and gen11.md section 5's 36 degree
     relation, at 15.4 degrees of elevation. It is NOT on the header: at
     (0.42, 1.24) the same pod would be 0.26 m from that face and inside the
     51.1 mm of head clearance body-11 measured. */
  const dmsG = lib.part('dms', [0.5, -0.3, 0]);

  const pedFoot = lib.cbox(0.040, 0.005, 0.056, 0.0012, M.castAlu);
  pedFoot.position.set(0.990, 0.8995, 0);
  dmsG.add(pedFoot);
  for (const sz of [1, -1]) {
    dmsG.add(screw([0.990, 0.9020, sz * 0.021], [0, 1, 0], 0.0028, M.steel));
  }
  const post = lib.cbox(0.022, 0.032, 0.030, 0.0025, M.castAlu);
  post.position.set(0.982, 0.9180, 0);
  dmsG.add(post);
  const postRib = lib.cbox(0.006, 0.026, 0.018, 0.0012, M.castAlu);
  postRib.position.set(0.968, 0.9160, 0);
  dmsG.add(postRib);

  /* the pod: moulded shell, parting line, framed aperture, lens barrel with
     a hood, and two IR emitters that are separate optics. It faces aft and
     is pitched 15.4 degrees up, which is the measured line to the eye point
     and not a chosen angle. */
  const pod = new THREE.Group();
  pod.rotation.y = Math.PI;
  pod.rotation.z = -0.269;
  pod.position.set(0.972, 0.9450, 0);

  pod.add(lib.cbox(0.044, 0.030, 0.046, 0.0035, M.sensor));
  const pflash = lib.cbox(0.0446, 0.0016, 0.0466, 0.0004, M.sensor);
  pflash.position.y = -0.004;
  pod.add(pflash);
  const flange = lib.cbox(0.030, 0.004, 0.038, 0.001, M.castAlu);
  flange.position.set(-0.001, -0.0170, 0);
  pod.add(flange);
  const pbz = bezel(0.005, 0.026, 0.044, 0.0045, 0.0012, M.darkSteel);
  pbz.position.x = 0.0235;
  pod.add(pbz);
  const barrel = lensBarrel(0.0072, 0.0090, 12, M.sensor);
  barrel.position.x = 0.0215;
  pod.add(barrel);
  const phood = lib.cbox(0.0100, 0.0022, 0.020, 0.0006, M.plastic);
  phood.position.set(0.0272, 0.0142, 0);
  pod.add(phood);
  for (const sz of [1, -1]) {
    const eb = lib.cyl(0.0045, 0.0055, M.darkSteel, 10);
    eb.rotation.z = Math.PI / 2;
    eb.position.set(0.0245, -0.0012, sz * 0.0128);
    pod.add(eb);
    const el = lib.cyl(0.0036, 0.0016, M.sensor, 10);
    el.rotation.z = Math.PI / 2;
    el.position.set(0.0278, -0.0012, sz * 0.0128);
    pod.add(el);
  }
  /* sealed tail: only states leave this camera, never video */
  const ptail = connector(0.0042, 0.013, M.plastic);
  ptail.rotation.z = Math.PI / 2;
  ptail.position.set(-0.0220, -0.004, 0);
  pod.add(ptail);
  dmsG.add(pod);

  /* the harness down the post to the cowl, clipped rather than floating */
  dmsG.add(lib.tube([
    [0.9500, 0.9420, 0.0060],
    [0.9560, 0.9300, 0.0120],
    [0.9640, 0.9130, 0.0160],
    [0.9700, 0.9030, 0.0180],
  ], 0.0026, M.plasticLt, false, 12));
  const dclip = lib.cbox(0.008, 0.008, 0.006, 0.0015, M.plasticLt);
  dclip.position.set(0.9640, 0.9130, 0.0160);
  dmsG.add(dclip);
  sys.add(dmsG);

  /* ── pose unit ───────────────────────────────────────────────────────
     Two low-profile patch antennas bonded to the canopy crown, which on this
     body is FLAT: 1.3300 at z 0 from x 0.300 aft to -1.120, 1.3290 at
     |z| 0.10 and 1.3280 at 0.20. Both feet therefore seat on one measured
     plane, 0.650 m apart, and the radomes reach 1.3405, standing 10.5 mm
     proud of the glass. Gen 10's mast reaches 1.3780 here, 48.0 mm above the
     roof, and the shipped attachment check calls that instance floating.

     The alloy foot is the ground plane, which matters on a car whose entire
     roof is glass. The coax leaves each foot horizontally and runs inboard
     along the canopy to a bonded grommet rather than piercing it. */
  const ant = lib.part('gnss-imu', [0, 0.6, 0]);
  for (const [ax, seatY, dir] of ROOF_SEAT) {
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
    lug2.position.set(ax + dir * 0.0275, seatY + 0.0015, 0);
    ant.add(lug2);
    ant.add(lib.tube([
      [ax + dir * 0.020, seatY + 0.0034, 0.004],
      [ax + dir * 0.032, seatY + 0.0032, 0.010],
      [ax + dir * 0.045, seatY + 0.0030, 0.012],
    ], 0.0026, M.plasticLt, false, 10));
    const grom = lib.cbox(0.014, 0.0060, 0.012, 0.0015, M.plasticLt);
    grom.position.set(ax + dir * 0.049, seatY + 0.0030, 0.012);
    ant.add(grom);
    for (const sz of [1, -1]) ant.add(screw([ax, seatY + 0.0030, sz * 0.0205], [0, 1, 0], 0.0022, M.steel));
  }
  sys.add(ant);

  /* Three IMUs, one per compute lane, and still ON the lane they belong to.
     They travel with the plate to the tail deck: x -1.311, in the clear span
     between the SoC lid and the first DRAM package. */
  const imus = lib.part('gnss-imu', [0.25, -0.75, 0.35]);
  for (const zi of [-0.095, 0, 0.095]) {
    const base = lib.cbox(0.022, 0.006, 0.022, 0.0015, M.alu);
    base.position.set(-0.545 + DX, 0.4541 + DY, zi);
    imus.add(base);
    const lid = lib.cbox(0.018, 0.005, 0.018, 0.0012, M.darkSteel);
    lid.position.set(-0.545 + DX, 0.4596 + DY, zi);
    imus.add(lid);
    for (const sx of [1, -1]) for (const sz of [1, -1]) {
      imus.add(screw([-0.545 + DX + sx * 0.0085, 0.4571 + DY, zi + sz * 0.0085], [0, 1, 0], 0.0018, M.steel));
    }
    const ic = lib.cbox(0.005, 0.004, 0.010, 0.0009, M.plastic);
    ic.position.set(-0.5335 + DX, 0.4561 + DY, zi);
    imus.add(ic);
  }
  sys.add(imus);

  /* ── sensor ring bus ─────────────────────────────────────────────────
     Two counter-rotating loops on the paired-sweep corridor, cleated at every
     control point, terminating in four gland nodes UNDER hv-11's four zonal
     controllers rather than beside them. */
  const net = lib.part('ring', [0, -0.45, 0]);
  const loops = RING_W.map(ringPts);
  /* lib.tube's fifth argument is TUBULAR segments over the whole curve, not
     segments per span, so it scales with the control-point count or a
     38-station loop is drawn as a coarse polygon that bulges off its route. */
  net.add(lib.tube(loops[0], RING_R, M.plasticLt, true, loops[0].length * 2));
  net.add(lib.tube(loops[1], RING_R, M.plastic, true, loops[1].length * 2));
  net.add(ringCleats(loops[0], loops[1]));

  /* The four nodes. hv-11's controllers occupy |z| 0.4910 to 0.6315 at
     y 0.4200 to 0.5000, and the volume inboard of their chamfered wall is
     taken: a 60 by 46 by 48 mm block at (1.115, 0.460, |z| 0.455) collects 10
     vertices of hv-11/bywire-feeds. Their UNDERSIDE is free on all four
     corners. Each block therefore sits at y 0.364 to 0.410, its top face
     10.0 mm under the controller floor, with four drops bridging the gap and
     its gland plate facing inboard where the cables are. */
  const NODES = [{ x: 1.115, y: 0.387 }, { x: -1.115, y: 0.387 }];
  const NODE_Z = 0.5300;
  for (const st of NODES) {
    for (const sz of [1, -1]) {
      const jb = new THREE.Group();
      jb.add(lib.cbox(0.060, 0.046, 0.044, 0.004, M.plasticLt));
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
      const rib = lib.cbox(0.006, 0.0035, 0.040, 0.0009, M.plasticLt);
      rib.position.set(-0.014, 0.0248, 0);
      jb.add(rib);
      const led = lib.cyl(0.0032, 0.0022, M.lamp, 10);
      led.position.y = 0.0241;
      jb.add(led);
      jb.rotation.y = sz > 0 ? 0 : Math.PI;
      jb.position.set(st.x, st.y, sz * NODE_Z);
      net.add(jb);

      /* Four short drops from the node's lid onto the controller floor at
         y 0.4200. The node stands off rather than lands, because the
         controller's own floor plane is battery-11's sill top and pressing a
         gland box against it would be a box inside somebody else's mounting
         face. Published clearance 10.0 mm. */
      for (const dx2 of [-0.018, 0.018]) for (const dz2 of [-0.012, 0.012]) {
        net.add(lib.tube([
          [st.x + dx2, st.y + 0.0245, sz * (NODE_Z + dz2)],
          [st.x + dx2, st.y + 0.0300, sz * (NODE_Z + dz2)],
          [st.x + dx2, st.y + 0.0325, sz * (NODE_Z + dz2)],
        ], 0.0026, M.plasticLt, false, 4));
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
