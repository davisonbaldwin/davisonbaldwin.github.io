/* Autonomy sensors and compute: eight cameras, five radars, one lidar,
   twelve ultrasonics, a dual-lane central computer, and the pose unit
   that ties perception to the map. The vehicle-level explode lifts the
   whole constellation clear of the body so it hangs as a floating array:
   the car's entire awareness, visible at once. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'autonomy',
  name: 'Autonomy sensors and compute',
  color: 0x6ea8ff,
  explode: [0, 2.3, 0],
  blurb: 'Eight cameras, five radars, a lidar, twelve ultrasonics, and a dual-lane computer that must agree with itself before the car moves. All of it together weighs 16 kg.',
  parts: {
    cameras: {
      name: 'Camera constellation',
      tagline: 'Eight imagers: the only sensors that can read what the road is saying.',
      mass: 1.2,
      count: 8,
      specs: [
        ['Imagers', '8x 8.3 MP CMOS, gen-locked'],
        ['Dynamic range', '140 dB split-pixel HDR'],
        ['Telephoto reach', '250 m vehicle detection'],
        ['Frame rate', '36 fps, common master clock'],
        ['Flicker handling', 'Exposure split across 90 to 300 Hz PWM'],
      ],
      how: 'The wedge behind the glass carries three focal lengths: a 120 degree wide for cut-ins and overhead signals, a 50 degree main, and a narrow telephoto that resolves a vehicle at 250 m. The B-pillar pair looks sideways for crossing traffic at intersections, the fender repeaters look rearward along the flanks to cover the over-the-shoulder blind spot, and the rear camera closes the circle. Every imager is a split-pixel HDR design: each pixel site holds a large and a small photodiode read at different gains, so a single exposure spans 140 dB, headlights and an unlit pedestrian in the same frame. LED signals and signs pulse at 90 to 300 Hz, so exposure is split across the pulse period to avoid catching a traffic light in its dark phase.\n\nA camera measures bearing almost perfectly and distance almost not at all. Depth is inferred: from stereo overlap inside the wedge, from motion parallax as the car moves, and from learned priors about the size of things. The inference is good to a few percent at 30 m and degrades roughly with the square of distance, which is the number to keep in mind whenever cameras are proposed as the whole answer.',
      why: 'The road system is a document written for human eyes: painted lines, colored lights, text on signs, turn signal flashes. No other modality can read any of it. Cameras are therefore not optional on any car that shares roads with humans, and the honest sensing debate is never about deleting cameras, only about whether they get corroboration.',
      fail: [
        'Low sun within a few degrees of a traffic signal saturates the surrounding pixels exactly when signal state matters most.',
        'A raindrop on a lens is an unmodeled fisheye; overlapping fields let the stack notice one camera disagreeing with its neighbors and discount it.',
        'Monocular range error grows with distance squared: a stationary car 200 m out is a bearing with a guess attached until radar or lidar confirms.',
      ],
      explode: [0.2, 0.4, 0],
    },
    radars: {
      name: 'Radar suite',
      tagline: 'Five 77 GHz units that measure closing speed directly, in any weather that exists.',
      mass: 1.9,
      count: 5,
      specs: [
        ['Band', '76 to 81 GHz FMCW'],
        ['Front unit', '4D imaging, 192 virtual channels, 250 m'],
        ['Corner units', '4x, 150 degree field, 100 m'],
        ['Velocity resolution', '0.1 m/s, direct Doppler'],
        ['Mounting', 'Hidden behind painted fascia'],
      ],
      how: 'Each unit transmits a frequency-modulated continuous wave: a chirp ramping through the band in under 100 microseconds. Mixing the returning echo with the outgoing chirp produces a beat whose frequency gives range; the phase rotation of that beat across successive chirps gives radial velocity directly from Doppler, resolvable to 0.1 m/s in a single 20 ms burst with no differentiation across frames. Phase differences across the antenna array give bearing. The front unit is a 4D imaging radar with 192 virtual channels, enough angular resolution to separate a pedestrian from the car beside them at 100 m, and enough elevation measurement that a bridge deck and a stalled truck beneath it stop looking alike.\n\nThe four corner units are simpler, splayed 40 degrees outward, and give the car its crossing-traffic and blind-spot coverage. The 4 mm wavelength passes through rain, fog, snow, and the plastic fascia in front of each unit, which is why the car appears to carry no radars at all. The classic weakness is stationary clutter: a manhole cover and a stopped car both return strong zero-Doppler echoes, and legacy radars filtered stationary returns out to avoid phantom braking. Elevation data and camera fusion are the modern answer: the cover is flat and lies on the road plane, the car is not.',
      why: 'Radar is the only sensor that measures closing speed rather than computing it, and its performance is essentially indifferent to weather and light. That combination makes it the anchor for the two functions that must never be lost, keeping distance and emergency braking, at a unit cost below a headlamp.',
      fail: [
        'A guardrail can mirror a real car into a ghost lane via multipath; track-level fusion kills ghosts that no camera confirms.',
        'Mutual interference from oncoming radars in the same band is rising with fleet penetration; chirp timing randomization keeps collisions rare and brief.',
        'Wet snow packed onto the fascia attenuates the beam; a blockage monitor watches the noise floor and declares the sensor degraded rather than blind.',
      ],
      explode: [0.55, 0, 0],
    },
    lidar: {
      name: 'Roof lidar',
      tagline: 'Direct time-of-flight geometry: the one sensor that never has to guess a distance.',
      mass: 0.9,
      specs: [
        ['Wavelength', '1550 nm, Class 1 eye-safe'],
        ['Range', '250 m at 10% reflectance'],
        ['Ranging error', '±2 cm, independent of range'],
        ['Point rate', '600k points/s'],
        ['Field of view', '120 x 26 degrees, forward'],
      ],
      how: 'The pod fires 1550 nm laser pulses through a scanning mirror and times the photon return: 6.7 nanoseconds per meter, two-way. Each point is a direct distance measurement with about 2 cm of error whether the target is at 5 m or 250 m, which is precisely the property cameras lack. The wavelength choice is an eye-safety argument: the cornea and lens absorb 1550 nm before it reaches the retina, so the transmitter can emit roughly an order of magnitude more power than a 905 nm design while staying Class 1, and that power budget is what buys 250 m of range on a dark 10 percent reflectance target.\n\nPerception consumes the output as a point cloud, and the crucial consumers are the ones with no idea what they are looking at. A mattress on the highway, a fallen rider, an overturned truck showing its roof to traffic: a vision network that has never seen the class can mislabel it, but the point cloud states that a solid surface occupies these cells of space regardless of what it is. Occupancy needs no recognition, and braking for occupied space is the last line of defense.',
      why: 'The camera-versus-lidar argument, stated honestly: cameras infer depth from parallax and learned priors and are cheap; lidar measures depth directly and once cost more than the rest of the car. The inference is right nearly always, and nearly is the entire problem, because the residue is exactly the unfamiliar scenes where learned priors fail. With solid-state units now priced in the hundreds of dollars, keeping one is redundancy priced like a wheel bearing, and the case for deleting it is cost discipline, not engineering.',
      fail: [
        'Airborne water returns first-surface echoes in fog and heavy snow; full-waveform processing takes the last return, but past a density threshold range collapses honestly and the stack knows it.',
        'Retroreflective signs return thousands of times more light than the design target and bloom across neighboring points.',
        'It reads nothing: color, text, and light state are invisible to it, so it can corroborate cameras but never replace them.',
      ],
      explode: [0, 0.65, 0],
    },
    ultrasonics: {
      name: 'Ultrasonic ring',
      tagline: 'Twelve echo sounders that own the last meter and a half.',
      mass: 0.5,
      count: 12,
      specs: [
        ['Count', '12, six per fascia'],
        ['Frequency', '52 kHz nominal'],
        ['Span', '0.15 to 5.5 m'],
        ['Accuracy', '±1 cm inside 2 m'],
        ['Cutoff', 'Muted above 30 km/h'],
      ],
      how: 'Each disc is a piezoelectric transducer bonded to the fascia so the painted skin itself is the diaphragm. It rings at 52 kHz for a few hundred microseconds, stops, listens, and times the echo at 343 m/s: 5.8 ms of round trip per meter. Firing is scheduled so neighbors listen to each other. One sensor hearing its own echo places the obstacle on a sphere; a neighbor hearing the same echo cuts that to an intersection, which is how a 60 degree beam produces a centimeter-grade map of a curb.\n\nThey exist for the region where everything else has gone blind: the bumper hides the last meter from the cameras, and radar range resolution is coarser than the gap that matters between a tow bar and a shin. Above about 30 km/h wind noise buries the band and the ring is dropped from fusion entirely. These are parking instruments, and the design pretends nothing else.',
      why: 'A transducer costs about two dollars and solves the region where a scrape is certain and a claim is likely. The discipline is scope: give the last meter to the cheapest sensor that can own it, and spend the expensive photons and TOPS on the road ahead.',
      fail: [
        'Snow, mud, or ice on a disc detunes its resonance; a ring-down self-test runs every cycle and flags the sensor rather than guessing.',
        'Acoustically soft obstacles return weak echoes and can read as absent: a hedge, a snow bank, loose clothing.',
        'Air brakes and other cars\' parking pulses inject phantom echoes; coded firing patterns reject most of them.',
      ],
      explode: [0.6, -0.25, 0],
    },
    compute: {
      name: 'Dual-lane compute',
      tagline: 'Two identical computers under the rear seat; the car moves only while they agree.',
      mass: 11.3,
      specs: [
        ['Lanes', '2x 500 TOPS, fully independent'],
        ['Comparator', 'Simple analyzable logic, ASIL D'],
        ['Power', '450 W peak, liquid cooled'],
        ['Sensor feed', 'Duplicated at the deserializer'],
        ['Fallback', 'Minimal-risk maneuver on one lane'],
      ],
      how: 'The housing holds two complete computers, lane A and lane B. Each has its own SoC delivering about 500 INT8 TOPS, its own DRAM, its own power feed from an independent 12 V rail, and its own copy of every camera, radar, and lidar stream, duplicated electrically at the deserializers so both lanes see identical frames. Each lane runs the full stack, perception through planning, and emits a trajectory plus a health word every 50 ms tick. A comparator built from simple, fully analyzable logic cross-checks the two, and agreement is the only condition under which the actuators are released.\n\nDisagreement is not settled by voting, because with two lanes there is no majority. The system instead assumes it is broken: whichever lane still passes its own self-tests executes a minimal-risk maneuver, slowing in lane or pulling to the shoulder. The 450 W thermal load runs into a cold plate on the cabin coolant loop, so in winter the computer is a useful heater, and the side fins carry the case through a coolant pump failure long enough to stop. This is the fail-operational argument in hardware: a supervised driver-assist system may simply switch off because the human is the backup. Remove the human and the computer must be its own backup, which is what the second lane is.',
      why: 'Perception is probabilistic but the substrate beneath it must not be: a flipped bit is not entitled to an opinion. Duplicated hardware converts silent faults into loud disagreements, the only kind a machine can act on. The accounting is honest: double silicon and double power buy protection against hardware faults only, since a software bug executes identically on both lanes. That is why a third, deliberately different program, a small formally verified collision checker, watches both lanes and can veto either.',
      fail: [
        'Common-mode software faults defeat duplication by construction; the diverse safety monitor exists because both lanes can be confidently, identically wrong.',
        'A cosmic-ray bit flip in DRAM is a certainty at fleet scale; ECC corrects most, lane comparison catches the rest.',
        'Loss of the coolant loop throttles both lanes; the stack sheds workload to a minimal sensor set and makes an early, unhurried stop instead of a late one.',
      ],
      explode: [0, -0.75, 0],
    },
    'gnss-imu': {
      name: 'Gnss-imu pose unit',
      tagline: 'Centimeters when the sky is open, honest dead reckoning when it is not.',
      mass: 0.2,
      specs: [
        ['GNSS', 'Dual band L1/L5 + RTK corrections'],
        ['Fix', '2 cm RTK, 1.5 m single point'],
        ['IMU', '6-axis MEMS, 2 deg/hr gyro bias'],
        ['Dead reckoning', '0.3% of distance traveled'],
        ['Output', '200 Hz fused pose'],
      ],
      how: 'The puck receives GNSS on two frequencies, L1 and L5. Ionospheric delay is dispersive, so comparing arrival across the bands cancels the dominant error term, and carrier-phase corrections from a base-station network pin the remaining ambiguity: the fix tightens from about 1.5 m to 2 cm under open sky. The IMU beside it integrates acceleration and rotation at 200 Hz. Integration is unforgiving: a constant 2 degree per hour gyro bias becomes tens of meters of position error within a couple of minutes, so the filter continuously estimates its own biases against GNSS, wheel odometry, and the vision stack.\n\nThe car does not steer on this pose. Absolute position seeds localization: it tells the map matcher roughly which 50 m of road to search, and the matcher then locks perceived lane geometry, curbs, and landmarks onto the map at centimeter level. In a tunnel the unit degrades rather than fails: inertial plus odometry dead reckoning holds about 0.3 percent of distance traveled, roughly 3 m per kilometer, enough to keep the map prior valid until the sky returns.',
      why: 'Perception is relative and the map is absolute; this unit is the hinge between the two frames. It is also the only sensor on the car an attacker can feed from a distance, since GNSS arrives as a whisper from 20,000 km, so the architecture treats it as a hint to be verified, never a truth to be obeyed.',
      fail: [
        'Urban multipath off glass towers gives confident fixes that are meters wrong; visual localization wins every conflict.',
        'Jamming and spoofing are detected by power and consistency monitors; the response is demotion to dead reckoning, not belief.',
        'With no fix and no odometry the pose is a guess after about a minute, and it is flagged as one.',
      ],
      explode: [0.15, 0.35, 0.3],
    },
  },
};

/* ── Geometry ── */

/* Small camera unit built facing +x: housing box plus a proud dark lens.
   wz is width across z, hy height, dx depth along the facing axis. */
function camUnit(wz, hy, dx, lensR = 0.008) {
  const g = new THREE.Group();
  g.add(lib.box(dx, hy, wz, M.sensor));
  const lens = lib.cyl(lensR, 0.01, M.carbon, 12);
  lens.rotation.z = Math.PI / 2;
  lens.position.x = dx / 2 + 0.004;
  g.add(lens);
  return g;
}

/* Flat radar unit facing +x: dark body with a slightly proud radome face. */
function radarUnit(wz, hy) {
  const g = new THREE.Group();
  g.add(lib.box(0.016, hy, wz, M.sensor));
  const face = lib.box(0.005, hy * 0.8, wz * 0.85, M.plastic);
  face.position.x = 0.01;
  g.add(face);
  return g;
}

/* Bracket from a radar to the crash structure it is packaged against.

   FOUR OF THESE FIVE UNITS WERE HANGING IN OPEN AIR AND THE ATTACHMENT
   CHECK COULD NOT SEE IT. [attachment] in tools/check-interfaces.sh works
   at PART granularity and all five units share the id `radars`, so the
   center unit sitting 6.50 mm off body/fascias passed the whole part while
   the four corners stood 28.49 mm (gen1 and gen3 front), 11.27 (gen2
   front) and 35.00 mm (rear, all three) from the nearest surface of
   anything at all, measured surface to surface per instance against a
   15.0 mm tolerance. That is the same defect this file's own note used to
   justify moving the center unit 10 mm forward, left standing on the units
   it did not measure.

   The landing surfaces are the same on every preset and each was ray
   probed on all ten: the front crash beam's underside is y 0.500 over
   (x 2.215, |z| 0.555), its top is y 0.600 over (x 2.252, z 0), and the
   rear casting's top face is y 0.600 for x at or behind -2.225 over
   |z| 0.520 to 0.590, with nothing between the unit and the surface in any
   of those columns. Each foot stops 1.5 mm short, which is inside the
   tolerance on the tightest body and 4.5 mm clear on the rest, and adds no
   penetrating pair on any rung. */
function radarFoot(x, z, y0, y1) {
  const b = lib.box(0.028, y1 - y0, 0.020, M.steel);
  b.position.set(x, (y0 + y1) / 2, z);
  return b;
}

export function build() {
  const sys = new THREE.Group();

  /* cameras: several groups share the id so the constellation spreads.
     Tri-cam wedge behind the windshield header. */
  const camWedge = lib.part('cameras', [0.2, 0.4, 0]);
  const wedge = new THREE.Group();
  wedge.add(lib.box(0.06, 0.035, 0.16, M.sensor));
  const lensR = [0.007, 0.009, 0.007];
  for (let i = 0; i < 3; i++) {
    const lens = lib.cyl(lensR[i], 0.012, M.carbon, 12);
    lens.rotation.z = Math.PI / 2;
    lens.position.set(0.034, 0, -0.05 + i * 0.05);
    wedge.add(lens);
  }
  wedge.rotation.z = -0.1;
  wedge.position.set(0.42, 1.31, 0);
  camWedge.add(wedge);
  sys.add(camWedge);

  /* THE B-PILLAR SURROUND POD IS THE BODY'S NOW. A module builds once and
     that build is shared by every preset it appears in, so an absolute
     |z| 0.900 had to serve every body this suite rides, and measured it stood
     proud of some door skins and floated clear of others. The body is the
     only module that knows where its own flank is. It draws the pod, seated
     on its own halfWidth and flush with its own paint; this module keeps the
     camera, the suite and the argument. See body-11, which worked this out
     for itself first. */
  /* fender repeater cameras, both sides explicitly */
  for (const s of [1, -1]) {
    const rep = lib.part('cameras', [0.4, 0.1, 0.45 * s]);
    const rcam = camUnit(0.025, 0.022, 0.045, 0.006);
    rcam.rotation.y = Math.PI + 0.45 * s;
    rcam.position.set(1.7, 0.86, 0.9 * s);
    rep.add(rcam);
    sys.add(rep);
  }

  /* rear camera above the plate recess */
  const camRear = lib.part('cameras', [-0.5, 0.25, 0]);
  const rc = camUnit(0.035, 0.025, 0.02, 0.007);
  rc.rotation.y = Math.PI;
  rc.position.set(-2.24, 0.96, 0);
  camRear.add(rc);
  sys.add(camRear);

  /* Radars: front long-range behind the fascia.

     y 0.66, NOT 0.50, AND IT IS THE STRUCTURE THAT SAYS SO. At 0.50 this
     unit was 30.00 mm inside body/crash-rails on all three rungs, 18
     crossings on the centerline: the rails fill y 0.475 to 0.625 over
     x 1.700 to 2.270 and there is a member on |z| 0.05. Below the rail at
     y 0.44 gen2's nose closes to 12.00 mm; above it at 0.66 the station is
     clear on gen1, gen2 and gen3. High is not the textbook height for a
     long-range unit and it is the height this structure leaves.

     x 2.250 rather than 2.240 because [attachment] is a check too: at 2.240
     the nearest surface was body/fascias 19.5 mm away on gen1 and
     body-3/skin 16.5 mm on gen3, and a radar 16 mm off the back of the
     fascia it fires through is a floating part. That argument was right and
     it was applied to gen1 and gen3 only: at 2.250 the unit is 6.50 mm off
     the gen1 fascia and 12.79 mm off body-3's skin, but 28.82 mm off
     body-aero's nose, so on gen2 it stayed exactly the floating part the
     note describes. It stands on the crash beam now, which is a surface all
     three bodies put in the same place. */
  const radFront = lib.part('radars', [0.55, 0, 0]);
  const fr = radarUnit(0.1, 0.06);
  fr.position.set(2.25, 0.66, 0);
  radFront.add(fr);
  radFront.add(radarFoot(2.250, 0, 0.6015, 0.6450));
  sys.add(radFront);

  /* Four corner radars, splayed 40 degrees outward.

     THEY USED TO BE INSIDE THE STRUCTURE THEY LOOK THROUGH. At y 0.50 the
     front pair sat 30.00 mm inside body/crash-rails over 62 crossing
     triangle pairs and the rear pair 25.00 mm inside body/rear-casting over
     41, on gen1, gen2 and gen3 alike, and gen2's diffuser took another
     27.92. A radar aimed into cast aluminum is not a sensor, and this
     panel's own claim that the beam "passes through rain, fog, snow, and the
     plastic fascia in front of each unit" is false of a unit behind a rail.

     The rails are the constraint and they are measured, not assumed:
     body/crash-rails fill y 0.475 to 0.625 over x 1.700 to 2.270, so the
     front pair drops to y 0.44, under the rail and behind the lower fascia.
     The rear pair climbs to y 0.66, above the diffuser gen2 puts under it.
     A radar-sized probe, 66 x 60 x 76 mm, at (2.215, 0.440, +/-0.555) and
     (-2.215, 0.660, +/-0.555) is clear against every partner part in NINE
     presets, which is the span these stations have to survive because
     autonomy-4 uses the same two on gen4 to gen9.

     CLEAR IS NOT THE SAME AS MOUNTED, and this note used to stop at clear.
     It also said the rear casting "fills y 0.300 to 0.740 at the same |z|",
     which the casting does not: ray probed straight down at |z| 0.520,
     0.555 and 0.590, its top face is y 0.600 on every body, and forward of
     x -2.222 it is not there at all. So the rear pair does not climb above
     a wall of casting, it hangs 35.00 mm over the top of one, which is why
     each unit now carries a foot down to it. The front pair sits 35.00 mm
     under the crash beam and has a foot up to that. */
  for (const s of [1, -1]) {
    const fc = lib.part('radars', [0.35, -0.05, 0.4 * s]);
    const fu = radarUnit(0.07, 0.05);
    fu.rotation.y = -0.7 * s;
    fu.position.set(2.215, 0.44, 0.555 * s);
    fc.add(fu);
    fc.add(radarFoot(2.215, 0.555 * s, 0.4520, 0.4985));
    sys.add(fc);

    const rcnr = lib.part('radars', [-0.35, -0.05, 0.4 * s]);
    const ru = radarUnit(0.07, 0.05);
    ru.rotation.y = Math.PI + 0.7 * s;
    ru.position.set(-2.215, 0.66, 0.555 * s);
    rcnr.add(ru);
    rcnr.add(radarFoot(-2.225, 0.555 * s, 0.6015, 0.6480));
    sys.add(rcnr);
  }

  /* Lidar: low rounded pod on the roof at P.lidar, dark window strip.

     THIS POD IS INSIDE THE ROOF AND IT IS STAYING THERE, WITH BOTH NUMBERS
     WRITTEN DOWN. lib.plate centers on its origin, so at y 1.396 the pod
     fills 1.3735 to 1.4185 and its TOP is 1.5 mm below P.roof rather than
     its base 1.5 mm into the skin, which is what the note here used to say.
     Measured as surface penetration it is 22.50 mm inside body/roof-glass
     over 188 crossings, 13.35 inside every body's pillars and 11.16 inside
     body-3's canopy, and the triage's ray parity calls it 77.2 percent
     enclosed by the canopy on gen3.

     Lifting it clears that outright and is still the wrong move. Based at
     y 1.461, 1 mm proud of the highest roof surface any of the three puts
     under this footprint, autonomy/lidar goes to zero penetrating pairs and
     then FAILS [attachment] on all three rungs: from the raised pod the
     nearest surface is body/roof-glass 53.0 mm below on gen1,
     body-aero/pillars 62.4 mm on gen2 and body-3/canopy 26.8 mm on gen3, all
     at (x 0.414, y 1.480, z -0.045). The roof falls steeply across this
     140 mm footprint and the three bodies disagree about where it is by
     40 mm; P.lidar's own y of 1.455 matches none of them, and P.roof's 1.42
     matches only body-aero. A flat-bottomed pod cannot sit on three
     different curved roofs from one coordinate.

     So the pod stays down and the penetration is reported rather than traded
     for a part floating on three rungs. The fix is a mount that follows the
     roof it bolts to, or one agreed roof surface at this station, and both
     are body-side decisions. */
  const lid = lib.part('lidar', [0, 0.65, 0]);
  const pod = lib.plate(0.14, 0.18, 0.045, 0.055, M.plasticLt);
  pod.position.set(P.lidar[0], P.roof - 0.024, P.lidar[2]);
  lid.add(pod);
  const win = lib.box(0.008, 0.02, 0.09, M.sensor);
  win.position.set(P.lidar[0] + 0.068, P.roof + 0.021, P.lidar[2]);
  lid.add(win);
  sys.add(lid);

  /* ultrasonics: six discs per fascia, flush, following the bumper curve */
  const usZ = [-0.625, -0.375, -0.125, 0.125, 0.375, 0.625];
  const usFront = lib.part('ultrasonics', [0.6, -0.25, 0]);
  const usRear = lib.part('ultrasonics', [-0.6, -0.25, 0]);
  for (const z of usZ) {
    const fx = 2.35 - 0.1 * Math.pow(z / 0.65, 2);
    const df = lib.cyl(0.013, 0.01, M.sensor, 14);
    df.rotation.z = Math.PI / 2;
    df.position.set(fx, 0.55, z);
    usFront.add(df);
    const dr = lib.cyl(0.013, 0.01, M.sensor, 14);
    dr.rotation.z = Math.PI / 2;
    dr.position.set(-fx, 0.55, z);
    usRear.add(dr);
  }
  sys.add(usFront);
  sys.add(usRear);

  /* compute: finned cold plate under the rear seat, one board per lane */
  const comp = lib.part('compute', [0, -0.75, 0]);
  const cold = lib.box(0.34, 0.06, 0.26, M.castAlu);
  cold.position.set(-0.55, 0.42, 0);
  comp.add(cold);
  for (const s of [1, -1]) {
    const bank = lib.fins(0.32, 0.05, 0.05, 7, 0.004, M.castAlu);
    bank.position.set(-0.55, 0.42, 0.158 * s);
    comp.add(bank);
    const pcb = lib.box(0.3, 0.006, 0.22, M.pcb);
    pcb.position.set(-0.55, 0.42 + 0.033 * s, 0);
    comp.add(pcb);
    for (const zc of [-0.05, 0.05]) {
      const soc = lib.box(0.05, 0.007, 0.05, M.darkSteel);
      soc.position.set(-0.58, 0.42 + 0.0395 * s, zc);
      comp.add(soc);
    }
  }
  const conn = lib.box(0.02, 0.035, 0.14, M.plastic);
  conn.position.set(-0.37, 0.42, 0);
  comp.add(conn);
  for (const [z, mat] of [[-0.05, M.coolant], [0.05, M.coolantHot]]) {
    const stub = lib.cyl(0.008, 0.05, mat, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(-0.74, 0.42, z);
    comp.add(stub);
  }
  sys.add(comp);

  /* gnss-imu: antenna puck and IMU block on the compute housing */
  const pose = lib.part('gnss-imu', [0.15, 0.35, 0.3]);
  const puck = lib.cyl(0.02, 0.012, M.sensor, 20);
  puck.position.set(-0.45, 0.462, 0.085);
  pose.add(puck);
  const imu = lib.box(0.022, 0.01, 0.022, M.sensor);
  imu.position.set(-0.45, 0.461, 0.04);
  pose.add(imu);
  sys.add(pose);

  return sys;
}
