/* Gen 4 autonomy: the fail-operational brain. This slot skipped Gen 2 and
   Gen 3 on purpose: a duplex computer that stops when confused was the right
   brain for a car with a licensed human and a steering column behind it.
   suspension-4 deletes the column, so Gen 4 rebuilds the slot around one
   idea: after any single fault, the car keeps driving. Three voting lanes
   on one cold plate, imaging radar at every corner, flash lidar behind the
   Gen 3 light band, and a dual-ring sensor bus on hv-4's zonal controllers.
   The vehicle-level explode keeps the slot's signature: the whole awareness
   lifts clear of the body and hangs as a floating constellation. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'autonomy-4',
  name: 'Autonomy · Gen 4',
  color: 0x6ea8ff,
  explode: [0, 2.3, 0],
  blurb: 'The nervous system rebuilt for the generation that deleted the steering column: three compute lanes that outvote their own fault, imaging radar at every corner, lidar moved off the roof and into the light band. 19 kg where Gen 1 spent 16, and every added kilogram is named.',
  parts: {
    compute: {
      name: 'Triplex compute',
      tagline: 'Three lanes on one cold plate: the car no longer has to agree with itself, only to outvote its own fault.',
      mass: 13.5,
      specs: [
        ['Lanes', '3x 500 TOPS, independent power and DRAM'],
        ['Voter', '2-of-3 majority, analysable logic, ASIL D'],
        ['Power', '640 W peak, 380 W typical'],
        ['Cooling', 'One cold plate teed off the pack cold loop'],
        ['Feeds', 'Two hv-4 zonal feeds, diode-ORed'],
        ['After one fault', 'Drives on, duplex rules apply'],
      ],
      how: 'Three identical lanes sit side by side on one liquid cold plate, each with its own SoC delivering about 500 INT8 TOPS, its own DRAM, and power arriving over two diode-ORed feeds from separate hv-4 zonal controllers, so no single supply fault darkens more than one lane. Every lane subscribes to the same frames on the sensor ring, runs the full stack, and emits a trajectory plus a health word every 50 ms. The voter is a few hundred gates of fully analysable logic, ASIL D like Gen 1\'s comparator, but it now holds three opinions instead of two, and that changes everything. Gen 1\'s dual-lane compute (11.3 kg) could detect a disagreement but never localise it: with two lanes there is no majority, so its only honest response was a minimal-risk stop. That is fail-safe. Three lanes vote the liar down two to one, take it offline, and keep driving on the surviving pair under exactly the Gen 1 duplex rule. That is fail-operational, and the difference is the 2.2 kg the third lane costs.\n\nThe cold plate tees off the pack cold loop, the glycol ring main the thermal system runs above the battery lid, and the thermal ledger is now a range item worth stating. Peak draw is 640 W; the honest number is the 380 W the stack burns continuously, which against the car\'s 17 kW motorway draw is a permanent 2 percent consumption tax that no aerodynamic trick recovers. In winter the tax refunds itself as cabin heat, exactly as Gen 1 noted; in summer it is simply the price of carrying a brain that can survive its own stroke. The side fins carry the case through a coolant pump failure long enough to stop, a behaviour carried from Gen 1 unchanged.',
      why: 'For two generations nothing moved here because nothing here was the bottleneck: Gen 2 optimised parts in place and Gen 3 merged structures, and through both, a supervised duplex brain remained exactly right, because the human and the mechanical steering column were the real fallback layers. Gen 4\'s steer-by-wire removes the column, and the moment steering is a network message, stopping the computer stops being a safe state. Gen 1\'s compute content said the computer must be its own backup; Gen 4 finishes the sentence: it must also know which third of itself to believe.',
      fail: [
        'Three identical software stacks are confidently, identically wrong together; voting is powerless against a common-mode bug, so the small formally verified collision checker carried from Gen 1 still watches all three lanes and can veto any of them.',
        'The voter itself is the one element the architecture cannot vote on, which is precisely why it is a few hundred analysable gates and not a fourth computer.',
        'Loss of the cold loop throttles all three lanes at once; the stack sheds to a minimal sensor set and makes an early, unhurried stop rather than a late one.',
      ],
      explode: [0, -0.75, 0],
    },
    radars: {
      name: '4D imaging radar ring',
      tagline: 'Five imaging units: elevation at every corner, and the sensor that deleted the ultrasonic ring.',
      mass: 2.4,
      count: 5,
      specs: [
        ['Band', '76 to 81 GHz FMCW, 4 GHz chirp'],
        ['Front unit', '768 virtual channels, 300 m'],
        ['Corners', '4x 192 channels, 150 degree field, 150 m'],
        ['Range resolution', '4 cm, floor 0.15 m'],
        ['Velocity', '0.1 m/s, direct Doppler'],
      ],
      how: 'Gen 1\'s radar suite (1.9 kg) had one modern sensor and four ordinary ones: the 4D imaging unit looked forward, and the corners measured azimuth and Doppler but no elevation. Gen 4 makes all five imaging. The front unit grows to 768 virtual channels and 300 m of reach; each corner now carries the 192-channel array that Gen 1 reserved for the nose. Elevation everywhere means the bridge-versus-stalled-truck distinction, which Gen 1 could only make straight ahead, now works across the whole 360 degree ring, and the zero-Doppler clutter problem, the manhole cover versus the stopped car, is solvable from any approach angle rather than only head-on.\n\nThe second consequence is quieter but paid for a whole part\'s deletion. A 4 GHz chirp resolves range to 4 cm with a minimum range of 0.15 m, which is the territory Gen 1\'s ultrasonic ring existed for: twelve transducers, 0.5 kg, muted above 30 km/h, owning the bumper-blind last metre because nothing else could. A corner imaging radar behind the same fascia now sees that metre at centimetre grade, in any weather, with no speed cutoff, so the parking map comes from the same sensors that drive the motorway and the ring of discs is gone.',
      why: 'The ledger states the consolidation argument exactly: five better radars replace five radars plus twelve ultrasonics at 2.4 kg, and Gen 1 spent the same 2.4 kg across both parts. The scale reads flat and the capability does not, which is the Gen 4 trade in miniature: the win is elevation at every corner and a parking sensor that never goes deaf, not a lighter car.',
      fail: [
        'Mutual interference climbs with fleet penetration, and imaging radars chirp across more of the band; randomised chirp timing keeps collisions rare and brief, carried from Gen 1.',
        'The ultrasonics\' acoustically soft obstacle returns as the radar-soft obstacle: a dry hedge or thin plastic bollard gives a weak echo, and the surround cameras arbitrate the last half metre.',
        'Multipath ghosts now come with plausible elevation: a guardrail can still mirror a real car into an empty lane, and track-level fusion kills any ghost no camera confirms.',
      ],
      explode: [0.55, 0, 0],
    },
    cameras: {
      name: 'Camera set and thermal imager',
      tagline: 'Five visible imagers where Gen 1 carried eight, plus the one camera that does not need light.',
      mass: 1.6,
      count: 6,
      specs: [
        ['Imagers', '5x 12 MP HDR + 1 thermal, gen-locked'],
        ['Thermal', '640 x 512 microbolometer, 8 to 14 um'],
        ['Dynamic range', '140 dB split pixel'],
        ['Telephoto crop', '300 m vehicle detection'],
        ['Deleted', '50 degree main, both fender repeaters'],
      ],
      how: 'Gen 1\'s camera constellation (1.2 kg) spent eight imagers: a wedge of three, the B-pillar pair, two fender repeaters, and a rear unit. Gen 4 keeps the geometry that earned its place and folds the rest into pixels. The wedge drops to two: a 12 MP wide whose centre crop reproduces the old 50 degree main as a software product, and a telephoto that resolves a vehicle at 300 m. The B-pillar units widen to 160 degrees and inherit the rearward flank the repeaters used to own. Five imagers do what eight did because per-camera pixels rose half again, from 8.3 to 12 MP, the flank fields widened, and cropping a sharp wide frame is cheaper, lighter, and better calibrated than pointing a third lens at the overlap.\n\nThe addition is a long-wave thermal imager in the nose face: a 640 x 512 microbolometer reading emitted heat between 8 and 14 microns. It detects a pedestrian at 200 m in zero lux, and it is structurally immune to the failure Gen 1\'s camera content listed first, low sun saturating the pixels around a traffic signal, because it does not look at light at all. Oncoming high beams, tunnel exits, and glare off wet tarmac arrive as nothing. Its limits are the mirror image: no colour, no text, no signal state, and its contrast collapses on a 37 degree summer afternoon when the road and the pedestrian read the same temperature.',
      why: 'Consolidation against redundancy, stated honestly: three deleted cameras are three fewer lenses to fail, but also three fewer overlapping fields for catching a liar, and Gen 1 used that overlap deliberately. The wager is that cross-checking moves from same-modality overlap to different-modality overlap, imaging radar with elevation at every corner and lidar occupancy ahead. A second camera squinting into the same sun fails with the first; a bolometer does not, which is why the eighth camera became a thermal one instead of staying a visible one. The ledger says what that costs: 1.6 kg against Gen 1\'s 1.2, and the 0.4 kg gained is the thermal channel entire, bolometer core, germanium window, and window heater.',
      fail: [
        'A raindrop on a flank lens now has fewer neighbouring fields to vote it down; the stack leans on corner radar corroboration and declares the sector degraded instead of guessing.',
        'Thermal contrast is worst at midday in summer, exactly when visible cameras are strongest; the two failure envelopes barely overlap, which is the point, but the fusion weights must track ambient temperature honestly.',
        'Monocular range error still grows with distance squared; consolidation changed nothing about physics, and the telephoto\'s 300 m detection is a bearing with a guess attached until the front radar confirms it.',
      ],
      explode: [0.2, 0.4, 0],
    },
    lidar: {
      name: 'Flash lidar pair',
      tagline: 'Two solid-state units behind the light band: the suite\'s last moving part, deleted.',
      mass: 0.7,
      count: 2,
      specs: [
        ['Type', 'Flash, no moving parts'],
        ['Emitter', 'VCSEL array, 940 nm, Class 1'],
        ['Receiver', '0.4 MP SPAD array, global shutter'],
        ['Range', '140 m at 10% reflectance'],
        ['Fields', '2x 120 x 25 degrees, toed out 25'],
        ['Mounting', 'Behind the front light band, inboard ends'],
      ],
      how: 'A flash unit has no mirror: the VCSEL array illuminates the whole scene each pulse and a SPAD receiver times single photons per pixel, histogramming thousands of pulses into one range image. Every point in the frame is captured at the same instant. Gen 1\'s roof lidar (0.9 kg) painted its scene through a scanning mirror across roughly 100 ms, so a car crossing at 50 km/h smeared 1.4 m within a single frame and the tracker had to unwarp it; the flash frame is geometrically rigid, and the scanning mirror, the only moving part in the entire Gen 1 sensor suite, is gone.\n\nPlacement is the integration echo. Gen 3\'s monoform closed the body\'s front face with a light band, and Gen 4 slides one puck behind each end of that band, at x 2.33 and z ±0.30, looking through IR-clear dark segments and sharing the band\'s heater, so the sensor lives inside the body\'s one surface instead of on top of it like the Gen 1 roof pod. The wavelength moves from 1550 to 940 nm because SPAD silicon demands it, and eye safety at 940 caps emitted power well below the 1550 design, so range falls from 250 m to 140. That trade is taken knowingly: the 300 m front radar owns the far field now, and the lidar\'s job narrows to exact geometry inside 140 m, the mattress on the motorway, the fallen rider, the shape no network recognises but occupancy must still brake for.',
      why: 'Two pucks replace one pod at less mass, 0.7 kg against 0.9, and buy what the single roof unit could never offer: each covers the other\'s field across a 0.6 m baseline, so one blinded window degrades the picture instead of deleting it. The roof pod also cost drag counts and a silhouette; the band windows cost the body nothing, which is the kind of accounting Gen 3 taught.',
      fail: [
        'Fog and heavy snow return first-surface echoes; the SPAD histogram takes the last return, but past a density threshold range collapses honestly and the stack knows it, carried from Gen 1.',
        'Retroreflective signs bloom hard on a SPAD array, saturating neighbouring pixels for a frame; bloom masks are calibrated per unit.',
        'Both pucks sit behind one band, so packed snow can blind the pair together; the shared heater and a blockage monitor are the mitigation, and one failure domain for two sensors is the honest cost of embedding.',
      ],
      explode: [0.5, 0.15, 0],
    },
    dms: {
      name: 'Driver monitor',
      tagline: 'The only sensor pointed inward, and the honest limit of the L3 handover.',
      mass: 0.1,
      specs: [
        ['Imager', '940 nm IR, 60 fps'],
        ['Illumination', 'Two invisible IR emitters'],
        ['Tracks', 'Gaze vector, eyelid aperture, head pose'],
        ['Distraction call', 'Under 2 s'],
        ['Handover budget', '10 s, own stop armed throughout'],
        ['Mounting', 'Shared header casting, 221 mm arm'],
      ],
      how: 'A small IR camera on the header rail floods the driver\'s face with invisible 940 nm light and reads the corneal glint against the pupil centre, giving a gaze vector good to about 2 degrees, plus eyelid aperture, blink cadence, and head pose. Processing happens on the camera and only states leave it, attentive or not, drowsy or not; no video crosses the ring. It shares one cast rail with the forward camera wedge: the wedge sits on the rail\'s top face, a 221 mm arm bolts to its outboard end through a lapped splice plate, and a clevis at the far end drops the pod and tilts it 17 degrees down onto the driver\'s face. One casting, one datum, two sensors that must stay aligned to the same car. It is the one part in this module with no Gen 1 ancestor, and the reason is architectural: Gen 1 was a supervised system, the human watched the car. At conditional autonomy the car drives, and the car must watch the human.\n\nThe L3 handover problem, stated honestly: when the system reaches the edge of its domain it asks for the human back, and this camera can verify within 2 s that eyes returned to the road. It cannot verify that the model of the road returned with them. Takeover research puts genuine situational awareness seconds to tens of seconds behind gaze, so the 10 s handover budget is a courtesy, not a guarantee. The architecture therefore never stakes safety on the handover completing: the triplex compute keeps its own minimal-risk stop armed through every transfer and executes it if the driver\'s first inputs disagree with the scene.',
      why: 'Monitoring is the least glamorous sensor on the car and the one the L3 regulations actually mandate, because every alternative amounts to pretending the human is a component with a datasheet. The gap between eyes-on and mind-on is the residual risk no camera closes, and the design treats the handover as a favour requested, never a dependency.',
      fail: [
        'Gaze is not attention: eyes on the road with the mind elsewhere reads as fully compliant, which is exactly why the fallback is the car\'s own stop and not the handover.',
        'Direct low sun through the glass can saturate the IR image for seconds; the bandpass filter narrows the window and dropouts are flagged as monitoring lost, not as driver attentive.',
        'IR-opaque sunglass coatings defeat gaze tracking; the system degrades to head pose only and says so rather than inventing a gaze vector.',
      ],
      explode: [0.3, 0.5, -0.4],
    },
    'gnss-imu': {
      name: 'Redundant pose unit',
      tagline: 'Two antennas, two receivers, three IMUs: the pose becomes a thing the car can vote on.',
      mass: 0.4,
      specs: [
        ['Receivers', '2x dual band L1/L5 + RTK'],
        ['Antennas', 'Roof spine pair, 0.65 m baseline'],
        ['Heading', '0.3 degrees, standing or moving'],
        ['IMUs', '3x MEMS, one per compute lane'],
        ['Dead reckoning', '0.25% of distance travelled'],
      ],
      how: 'Gen 1\'s pose unit (0.2 kg) was one antenna and one IMU: excellent numbers, single points everywhere. Gen 4 doubles the sky side and triples the inertial side. Two dual-band receivers hang on two roof-spine antennas 0.65 m apart, and the carrier-phase difference across that baseline yields heading to 0.3 degrees while the car is parked, something Gen 1\'s single antenna could only observe by moving. The receivers land on opposite segments of the sensor ring, so no single cut silences both.\n\nThe three IMUs mount one per compute lane, which makes pose votable by the same 2-of-3 machinery as everything else: a gyro drifting toward tens of metres of error is outvoted before the filter has to notice. Bias estimation against GNSS, wheel odometry, and the vision stack carries over from Gen 1 unchanged, and with three bias histories to compare, dead reckoning tightens from 0.3 to 0.25 percent of distance travelled, about 2.5 m per kilometre of tunnel.',
      why: 'The pose unit is still the hinge between relative perception and the absolute map, and still the only sensor an attacker can feed from 20,000 km away, so it remains a hint to be verified, never a truth to be obeyed. Redundancy sharpens that stance: a spoofer must now bend two antennas and three independent inertial histories into one consistent lie, and consistency is precisely what the voter checks.',
      fail: [
        'Urban multipath off glass towers still gives confident fixes that are metres wrong, and both receivers can be wrong together since they share the sky; visual localisation wins every conflict, carried from Gen 1.',
        'Jamming takes both receivers at once because it takes the band, not the box; the response is demotion to inertial dead reckoning, not belief.',
        'With no fix, the three IMUs agree ever more precisely on a pose that is drifting; consensus is not accuracy, and the filter widens its stated uncertainty on schedule regardless.',
      ],
      explode: [0, 0.6, 0],
    },
    ring: {
      name: 'Sensor ring bus',
      tagline: 'Two counter-rotating data rings on hv-4\'s zonal controllers: the constellation\'s actual nervous system.',
      mass: 0.3,
      specs: [
        ['Topology', 'Dual counter-rotating rings'],
        ['Media', '10 Gbit automotive Ethernet, single pair'],
        ['Nodes', 'The four hv-4 zonal controllers'],
        ['Heal time', 'Under 100 us after a cut'],
        ['Sensor power', '48 V via zonal solid-state fuses'],
      ],
      how: 'Every sensor patches into its nearest of hv-4\'s four zonal controllers, and the controllers are joined by two 10 Gbit Ethernet rings running opposite directions around the cabin floor perimeter. Each frame is multicast both ways, so a cut anywhere leaves every node reachable the long way round, and the rings heal in under 100 microseconds, well inside one 50 ms compute tick. The same connector that carries a sensor\'s data delivers its 48 V from the controller\'s solid-state fuse, so a shorted camera is disconnected in microseconds with telemetry, not with a dimming neighbourhood.\n\nThe reason this part appears at Gen 4 specifically is arithmetic. Gen 1\'s dual-lane compute duplicated every sensor stream electrically at the deserialiser, a workable fan-out for two lanes; a third lane would have meant a third copy of every run home to the box under the rear seat. The ring inverts the pattern: each frame enters the network once and all three lanes subscribe. Wire length is set by the distance to the nearest corner instead of the distance to the computer, which is the same zonal argument hv-4 makes for power, applied to data.',
      why: 'A star network has a centre and a centre is a single point; a ring has none, which is the topology the fail-operational argument demands of the wiring, not just the silicon. It is 0.3 kg of shared pair replacing a loom of point-to-point home runs, and it is the part that makes the exploded constellation legible as one organism rather than a bag of sensors.',
      fail: [
        'Both rings run the same perimeter, separated by centimetres, so a hard corner intrusion severs them together; healing reroutes the surviving arcs and only sensors on the crushed controller go dark, which is the correct outcome in a crash already under way.',
        '10 Gbit on a single pair beside 48 V switching hardware is an EMC knife fight; error bursts under inverter transients are absorbed by forward error correction, and sustained degradation drops the link rate with the stack shedding camera resolution honestly.',
        'Both rings speak the same protocol stack, so a malformed frame that wedges one switch can wedge its twin; the zonal controllers carry independent watchdogs precisely because voting does not apply to the wire.',
      ],
      explode: [0, -0.45, 0],
    },
  },
};

/* ── Detail vocabulary, local to this module ──────────────────────────────

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
   nobody can see is a decal with a triangle budget. */

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
   the front element itself. */
function lensBarrel(r, len, seg = 12) {
  const g = new THREE.Group();
  const b = lib.cyl(r, len * 0.82, M.darkSteel, seg);
  b.rotation.z = Math.PI / 2; b.position.x = len * 0.41; g.add(b);
  const ring = lib.cyl(r * 1.16, len * 0.20, M.alu, seg);
  ring.rotation.z = Math.PI / 2; ring.position.x = len * 0.90; g.add(ring);
  const el = lib.cyl(r * 0.82, len * 0.08, M.glass, seg);
  el.rotation.z = Math.PI / 2; el.position.x = len * 0.98; g.add(el);
  return g;
}

/* A flat annulus with its axis along +X, centred on the local origin. A
   bezel and a heater trace are rings, and a solid disc in their place hides
   the aperture they exist to frame: the first lidar build put a 30 mm disc
   of dark steel over the emitter face it was supposed to surround. 160
   triangles at 20 segments. */
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
   a sun hood over it, two bolted ears and a sealed tail on the back face.
   dx is the housing depth and the barrel is sized so the front element
   lands exactly on frontX, which the caller measures against the panel the
   camera looks through. */
function camUnit(wz, hy, dx, lensR = 0.008, frontX = null) {
  const g = new THREE.Group();
  const body = lib.cbox(dx, hy, wz, Math.min(0.004, hy * 0.12), M.sensor);
  g.add(body);
  /* parting line: a thin proud band round the cast shell */
  const flash = lib.cbox(dx * 0.92, 0.0016, wz + 0.0012, 0.0004, M.sensor);
  flash.position.y = -hy * 0.08;
  g.add(flash);
  const face = dx / 2;
  const reach = (frontX != null ? frontX : face + 0.010) - face;
  const barrel = lensBarrel(lensR, reach, 12);
  barrel.position.x = face;
  g.add(barrel);
  /* sun hood: a lip over the barrel, stopping on the same plane */
  const hood = lib.cbox(reach + 0.002, 0.0022, wz * 0.7, 0.0006, M.plastic);
  hood.position.set(face + reach / 2, hy / 2 - 0.0011, 0);
  g.add(hood);
  /* two bolted ears on the outboard walls */
  for (const s of [1, -1]) {
    const ear = lib.cbox(dx * 0.7, 0.0035, 0.010, 0.0009, M.castAlu);
    ear.position.set(-dx * 0.05, 0, s * (wz / 2 + 0.005));
    g.add(ear);
    g.add(screw([-dx * 0.05, 0.00175, s * (wz / 2 + 0.005)], [0, 1, 0], 0.0026, M.steel));
  }
  /* sealed tail on the back face */
  const tail = connector(0.0042, 0.014, M.plastic);
  tail.rotation.z = Math.PI / 2;
  tail.position.set(-face, -hy * 0.1, 0);
  g.add(tail);
  return g;
}

/* Imaging radar facing +x. A real one is a die-cast box with a finned back
   for the transmit chain, a moulded radome that reads as plastic rather
   than metal, a bezel sealing the radome to the casting, two bolted ears
   and one sealed connector. frontX is the local x of the radome face and
   the caller measures it against the fascia it hides behind. */
function radarUnit(wz, hy, dx, frontX, fins = 7) {
  const g = new THREE.Group();
  const backX = frontX - 0.007 - dx;
  const housing = lib.cbox(dx, hy, wz, Math.min(0.004, hy * 0.09), M.darkSteel);
  housing.position.x = backX + dx / 2;
  g.add(housing);
  /* draft-relieved parting line round the casting */
  const flash = lib.cbox(dx * 0.9, 0.0016, wz + 0.0014, 0.0004, M.darkSteel);
  flash.position.set(backX + dx / 2, -hy * 0.06, 0);
  g.add(flash);
  /* the radome: matte plastic, generously chamfered so it crowns */
  const dome = lib.cbox(0.007, hy * 0.80, wz * 0.86, 0.0018, M.plastic);
  dome.position.x = frontX - 0.0035;
  g.add(dome);
  const bz = bezel(0.006, hy * 0.92, wz * 0.94, 0.0055, 0.0012, M.darkSteel);
  bz.position.x = frontX - 0.003;
  g.add(bz);
  /* Finned back: the transmit chain is the hot part of a radar. The bank
     stops at 58 percent of the width so the connector's flange lands on
     bare casting rather than inside the fins. */
  if (fins > 0) {
    const bank = lib.fins(0.009, wz * 0.58, hy * 0.82, fins, 0.0022, M.darkSteel);
    bank.rotation.x = Math.PI / 2;
    bank.position.x = backX - 0.0055;
    g.add(bank);
  }
  /* bolted ears above and below, where a bumper beam bracket lands */
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

/* The bracket those ears bolt to, which was declared in the casting and
   never drawn.

   THE FOUR CORNER UNITS WERE HANGING IN OPEN AIR ON SIX RUNGS. Coming out
   of the crash rails left them 24.37 mm (front pair) and 26.76 mm (rear
   pair) from the nearest surface of anything, measured per instance and
   surface to surface against a 15.0 mm attachment tolerance, on gen4
   through gen9. [attachment] in tools/check-interfaces.sh reports at PART
   granularity and all five units share the id `radars`, so the centre unit
   sitting 0.41 mm off the rails passed the part and hid the other four.

   The landing surfaces were ray probed on all ten presets and are the same
   on every body: the front crash beam's underside is y 0.500 over
   (x 2.215, |z| 0.555) and the rear casting's top face is y 0.600 for x at
   or behind -2.225 over |z| 0.520 to 0.590, with nothing in either column
   in between. Each foot stops 1.5 mm short of it, and adds no penetrating
   pair on any rung. Same geometry and same stations as autonomy.js, which
   uses these two corners on gen1 to gen3. */
function radarFoot(x, z, y0, y1) {
  const b = lib.box(0.028, y1 - y0, 0.020, M.castAlu);
  b.position.set(x, (y0 + y1) / 2, z);
  return b;
}

/* Rounded-rectangle ring of points around the cabin floor, y constant.
   X is the half length, W the half width. */
function ringPts(y, X, W) {
  const shape = [
    [1, 0], [0.94, 0.79], [0.73, 0.97], [0.26, 1], [-0.26, 1], [-0.73, 0.97],
    [-0.94, 0.79], [-1, 0], [-0.94, -0.79], [-0.73, -0.97], [-0.26, -1],
    [0.26, -1], [0.73, -0.97], [0.94, -0.79],
  ];
  return shape.map(([sx, sz]) => [sx * X, y, sz * W]);
}

/* The point and tangent on the BUILT ring curve nearest a target, read off
   the same closed Catmull-Rom that lib.tube sweeps.

   Anything that has to sit on this cable reads its seat from here, never
   from the control points. The control points are a 14-gon and the curve
   bows outside them between stations: at the forward junction-box station
   the shape point is 27 mm from where the curve actually runs. A box placed
   on the polygon and a box placed on the curve are two different boxes, and
   the second one is the one the loom goes through. Same lesson hv-4 wrote up
   for its tunnel clips, which stood 8.1 mm off the cable they clamped. */
function ringNear(points, target) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(p[0], p[1], p[2])), true);
  const N = 1200;
  const t = new THREE.Vector3(target[0], target[1], target[2]);
  let best = 0, bd = Infinity;
  for (let i = 0; i < N; i++) {
    const d = curve.getPoint(i / N).distanceToSquared(t);
    if (d < bd) { bd = d; best = i; }
  }
  return {
    at: curve.getPoint(best / N).toArray(),
    dir: curve.getTangent(best / N).normalize().toArray(),
  };
}

/* Cable cleats along one ring, one per shape point, oriented to the local
   tangent so each grips the pair rather than floating beside it. One
   InstancedMesh, 44 triangles a cleat.

   The block is 19 mm across the cable, seated 3.5 mm outboard of its axis,
   so against a 6 mm tube it stands 7.0 mm proud outboard, is flush inboard
   and is 1.5 mm proud above and below. It therefore CAN reach things the
   bare cable does not.

   That used to matter on four partners and now it matters on one. The
   routing WAS the defect, this note said so, and the loop has since been
   shortened from a half length of 1.92 to 1.05: the drivetrain and thermal
   contacts went with it. What is left is 4.05 mm of the inner ring's cleat
   in interior-4's front seat base on gen4, and it is the cleat alone, since
   the bare tube at this width clears the seats at every height between
   0.412 and 0.428. It is left as measured because the only way to trim it
   is to narrow the inner ring past 0.618, which opens a deeper contact with
   interior-6's seats on five later rungs. */
function ringCleats(pts) {
  const n = pts.length;
  const geo = lib.cbox(0.019, 0.015, 0.010, 0.002, M.plasticLt).geometry;
  const x = new THREE.Vector3(), y = new THREE.Vector3(0, 1, 0), z = new THREE.Vector3();
  const a = new THREE.Vector3(), b = new THREE.Vector3(), p = new THREE.Vector3();
  return instanced(geo, M.plasticLt, n, (i, m) => {
    a.set(...pts[(i + n - 1) % n]);
    b.set(...pts[(i + 1) % n]);
    p.set(...pts[i]);
    z.subVectors(b, a).normalize();                 // along the cable
    x.crossVectors(y, z).normalize();               // horizontal, across it
    if (x.dot(p) < 0) x.multiplyScalar(-1);         // outward from the ring
    z.crossVectors(x, y).normalize();
    m.makeBasis(x, y, z);
    m.setPosition(p.x + x.x * 0.0035, p.y, p.z + x.z * 0.0035);
  });
}

/* ── The header casting ──────────────────────────────────────────────────

   The forward camera wedge and the driver monitor are one assembly on one
   cast rail behind the windshield header, and modelling it is the fix for
   a real defect: tools/check-interfaces.sh reported autonomy-4/dms
   standing in open space on every preset from gen5 to gen9, 74.8 mm from
   the nearest surface in the worst of them, because the camera was placed
   at a coordinate on a header rail that did not exist as geometry.

   The rail cannot bolt straight to the roof, and that is measured, not
   assumed: at x 0.42 the roof inner surface is y 1.322 on body-7, -8 and
   -9 and y 1.453 on body-4 and -6, 131 mm apart, so no single bracket
   height touches both. What every preset does share is the wedge, which
   already lands on the body. Rail and arm are therefore built in one
   tilted frame at (0.42, 1.31, 0) with the wedge at its origin, they meet
   on the plane z = -0.075 in that frame, and a bolted splice plate laps
   the joint. Both halves are cbox faces on the same plane, so the contact
   is 0.0 mm rather than a tolerance. */

const HDR = { pos: [0.42, 1.31, 0], tilt: -0.1, joint: -0.075 };

function headerFrame() {
  const g = new THREE.Group();
  g.rotation.z = HDR.tilt;
  g.position.set(HDR.pos[0], HDR.pos[1], HDR.pos[2]);
  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* ── cameras ─────────────────────────────────────────────────────────
     Wedge of two behind the windshield header, on the shared cast rail.
     The lens elements stop on x 0.037 in the frame, which is where the
     body-7 windshield inner surface sits: nothing here may grow forward. */
  const camWedge = lib.part('cameras', [0.2, 0.4, 0]);
  const wf = headerFrame();

  const wedge = new THREE.Group();
  wedge.add(lib.cbox(0.055, 0.032, 0.12, 0.004, M.sensor));
  /* parting line and a machined pad where the wedge sits on the rail */
  const wflash = lib.cbox(0.052, 0.0016, 0.1214, 0.0004, M.sensor);
  wflash.position.y = -0.003;
  wedge.add(wflash);
  /* wide left, telephoto right, both stopping on the same plane */
  for (const [lr, z] of [[0.0105, -0.03], [0.0072, 0.03]]) {
    const bar = lensBarrel(lr, 0.0095, 12);
    bar.position.set(0.0275, 0, z);
    wedge.add(bar);
    /* a hood over each barrel, ending on the same plane as the element */
    const hood = lib.cbox(0.0105, 0.0022, 0.028, 0.0006, M.plastic);
    hood.position.set(0.0323, lr + 0.0026, z);
    wedge.add(hood);
  }
  /* gen-lock and data tail out of the aft face */
  const wtail = connector(0.0048, 0.016, M.plastic);
  wtail.rotation.z = Math.PI / 2;
  wtail.position.set(-0.0275, -0.004, 0.030);
  wedge.add(wtail);
  wf.add(wedge);

  /* the cast rail the wedge and the driver monitor share. Its top face is
     the wedge's own bottom plane, so the two meet rather than overlap. */
  const rail = lib.cbox(0.050, 0.015, 0.150, 0.004, M.castAlu);
  rail.position.set(0, -0.0235, 0);
  wf.add(rail);
  const railRib = lib.cbox(0.014, 0.008, 0.060, 0.002, M.castAlu);
  railRib.position.set(0, -0.0345, 0);
  wf.add(railRib);
  /* The four bolts that pull the wedge down onto the rail. They seat on the
     underside of two machined pads, which is the only face here anybody can
     see: a head placed on the wedge's own bottom would have grown straight
     into the rail it is supposed to be holding. */
  for (const sz of [1, -1]) {
    const bossPad = lib.cbox(0.044, 0.003, 0.016, 0.0008, M.alu);
    bossPad.position.set(0, -0.0325, sz * 0.058);
    wf.add(bossPad);
    /* x 0.019, not 0.010: the driver monitor's splice plate laps this rail
       out to x 0.015 and a head inside it is a head nobody sees. */
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
       harness tail leaves the back face on that axis.

       The pads sit close in to that axis, at local z +/-0.010, and that is
       the sloped-face lesson rather than a styling choice. The camera is
       yawed 63 degrees, so a pad offset along the camera's own z sweeps
       across the door instead of standing off it. At +/-0.0215 the inboard
       pad reached |z| 0.8698 while body-4 and body-6's door skin tumbles
       from |z| 0.8780 at y 0.985 to 0.8631 at y 1.000, so the pad's lower
       corner went 3.87 mm through the paint on five vertices a side while
       its top floated 19 mm off it. Pulled in to +/-0.010 and shortened to
       20 mm, the mount's most inboard point is |z| 0.8868, measured on the
       built mesh: 11.70 mm clear of body-4 and body-6's door and 71.5 mm
       clear of body-7, -8 and -9's. The camera housing itself is the
       closest thing here at 4.09 mm, and it has not moved. The harness
       tail's flange is 2.17 mm from the nearer pad. */
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
  /* Washer nozzle above it: the one camera on the car that gets dirty. It
     goes ABOVE the lens because body-4's kamm flap is only 9 mm below this
     camera and a nozzle hung under it sat 5.7 mm inside the flap. */
  const nozBody = lib.cbox(0.012, 0.009, 0.010, 0.002, M.plasticLt);
  nozBody.position.set(-2.2325, 0.9805, 0.022);
  camRear.add(nozBody);
  const noz = lib.cyl(0.0022, 0.011, M.plasticLt, 8);
  noz.rotation.z = Math.PI / 2;
  noz.position.set(-2.2440, 0.9805, 0.022);
  camRear.add(noz);
  sys.add(camRear);

  /* thermal imager in the nose face: germanium optic reads gold, and it is
     the one window on the car with a resistive heater printed round it */
  const camTherm = lib.part('cameras', [0.55, 0.12, 0]);
  const th = new THREE.Group();
  th.add(lib.cbox(0.030, 0.034, 0.034, 0.0035, M.sensor));
  const thFlash = lib.cbox(0.028, 0.0016, 0.0352, 0.0004, M.sensor);
  thFlash.position.y = -0.004;
  th.add(thFlash);
  /* Barrel, heater ring, retaining ring, germanium window, stepping down in
     radius so each ring shows as a real annulus rather than hiding inside
     the one behind it. The window face stays on local x 0.022, which is
     where the nose skin is, so nothing here grows forward. */
  const gBarrel = lib.cyl(0.0140, 0.0050, M.darkSteel, 14);
  gBarrel.rotation.z = Math.PI / 2; gBarrel.position.x = 0.0155;
  th.add(gBarrel);
  const heat = lib.cyl(0.0133, 0.0016, M.copper, 14);
  heat.rotation.z = Math.PI / 2; heat.position.x = 0.0188;
  th.add(heat);
  const gRing = lib.cyl(0.0124, 0.0020, M.alu, 14);
  gRing.rotation.z = Math.PI / 2; gRing.position.x = 0.0206;
  th.add(gRing);
  const ge = lib.cyl(0.0106, 0.0030, M.busbar, 16);
  ge.rotation.z = Math.PI / 2; ge.position.x = 0.0205;
  th.add(ge);
  /* bolted ears and a sealed tail out of the back */
  for (const s of [1, -1]) {
    const ear = lib.cbox(0.018, 0.0032, 0.010, 0.0008, M.castAlu);
    ear.position.set(-0.004, 0, s * 0.0220);
    th.add(ear);
    th.add(screw([-0.004, 0.0016, s * 0.0220], [0, 1, 0], 0.0026, M.steel));
  }
  /* The tail leaves the top, not the back: the front radar's radome sits
     4 mm behind this casing and a tail out of the back face went inside it. */
  const thTail = connector(0.0042, 0.013, M.plastic);
  thTail.position.set(-0.004, 0.017, 0);
  th.add(thTail);
  th.position.set(2.345, 0.53, 0);
  camTherm.add(th);
  sys.add(camTherm);

  /* ── radars ──────────────────────────────────────────────────────────
     Front unit ahead of the thermal stack. Two things bind it and both are
     swept off partner geometry rather than read off a comment. Ahead of it,
     the thermal imager's own casing starts at x 2.330. Level with it,
     body-4 now draws its intake mouth as real geometry: the aperture is
     y 0.4505 to 0.4995 and its duct walls run back to x 2.3220, while this
     radome is 68.8 mm tall and would cross both lips. So the radome stops
     on 2.316, which is 6.0 mm behind the mouth's rear plane and 14.0 mm
     behind the imager, the fin bank on 2.271, and the connector on 2.268.
     Nothing else is in that window on any of the nine presets: the crash
     rails are 46 mm further back and the thermal packs further back still.

     The radar still sits directly behind body-4's mouth, which is a
     packaging question between two modules and not a detail one. This
     setback only takes the radome out of the mouth's lips. */
  const radFront = lib.part('radars', [0.55, 0, 0]);
  const fr = radarUnit(0.150, 0.086, 0.028, 0.036, 9);
  fr.position.set(2.280, 0.50, 0);
  radFront.add(fr);
  sys.add(radFront);

  /* Four imaging corner units, splayed 40 degrees outward.

     THE OLD NOTE HERE SAID THEY SAT 11 MM OFF A CRASH RAIL AND 1.3 MM OFF
     THE REAR CASTING. Both figures were nearest-vertex readings and both
     were wrong by their sign: measured as surface penetration the front pair
     was 28.66 mm INSIDE body-4, -7, -8 and -9's crash rails over 172
     crossing triangle pairs and 26.00 inside body-6's over 278, and the rear
     pair 26.00 mm inside every body's rear casting over 152. Ten pairs, six
     rungs, and the same defect autonomy carries on gen1 to gen3.

     The rails are the constraint. body/crash-rails fill y 0.475 to 0.625
     over x 1.700 to 2.270 on every body, so the front pair drops to y 0.44,
     under the rail and behind the lower fascia; the rear pair climbs to
     y 0.66. A radar-sized probe, 66 x 60 x 76 mm, at (2.200, 0.440,
     +/-0.550) and (-2.200, 0.660, +/-0.550) is clear against every partner
     part in all nine presets. autonomy uses the same two stations on gen1
     to gen3.

     THIS NOTE USED TO SAY THE REAR CASTING FILLS y 0.300 TO 0.750 AT THE
     SAME |z| AND IT DOES NOT. Ray probed straight down at |z| 0.520, 0.555
     and 0.590, the casting's top face here is y 0.600 on every body and it
     is absent altogether forward of x -2.222. The rear pair is therefore
     not climbing above a wall, it is standing 26.76 mm over a shelf, which
     is why each unit now carries a foot down to it. */
  for (const s of [1, -1]) {
    const fc = lib.part('radars', [0.35, -0.05, 0.4 * s]);
    const fu = radarUnit(0.090, 0.060, 0.020, 0.015, 5);
    fu.rotation.y = -0.7 * s;
    fu.position.set(2.215, 0.44, 0.555 * s);
    fc.add(fu);
    fc.add(radarFoot(2.215, 0.555 * s, 0.4520, 0.4985));
    sys.add(fc);

    const rcnr = lib.part('radars', [-0.35, -0.05, 0.4 * s]);
    const ru = radarUnit(0.090, 0.060, 0.020, 0.015, 5);
    ru.rotation.y = Math.PI + 0.7 * s;
    ru.position.set(-2.215, 0.66, 0.555 * s);
    rcnr.add(ru);
    rcnr.add(radarFoot(-2.225, 0.555 * s, 0.6015, 0.6480));
    sys.add(rcnr);
  }

  /* ── lidar ───────────────────────────────────────────────────────────
     Flash pucks behind the light band ends (band face x 2.371, y 0.615,
     half width 0.43), toed out 25 degrees. The window face stays on local
     x 0.031, which is what lands the puck on the band at 0.3 mm; every
     added feature grows inboard from there. */
  for (const s of [1, -1]) {
    const lid = lib.part('lidar', [0.5, 0.15, 0.3 * s]);
    const puck = new THREE.Group();
    /* The casting stops on x 0.020. It used to run to 0.026, and its end
       cap sealed the emitter face, the emitter array and the receiver
       objective inside it: 1,100 triangles of the one thing this part is
       supposed to show. The aperture is open from 0.020 forward. */
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
    /* aperture: bezel, heater ring, then a real window with the emitter
       and receiver faces visible behind it */
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
    /* SPAD receiver objective beside it */
    const spadB = lib.cyl(0.0092, 0.0040, M.darkSteel, 12);
    spadB.rotation.z = Math.PI / 2; spadB.position.set(0.0235, 0, 0.0125);
    puck.add(spadB);
    const spadL = lib.cyl(0.0074, 0.0016, M.glass, 12);
    spadL.rotation.z = Math.PI / 2; spadL.position.set(0.0258, 0, 0.0125);
    puck.add(spadL);
    /* rear cover, sealed tail, and two bolted ears */
    const board = lib.cbox(0.012, 0.050, 0.050, 0.003, M.pcb);
    board.position.x = -0.031;
    puck.add(board);
    /* The tail comes straight out of the back, on the axis. Offset to one
       side it swung 10 mm further outboard once the toe-out is applied,
       and the front crash rail is only 15 mm behind this puck. */
    const ltail = connector(0.0048, 0.013, M.plastic);
    ltail.rotation.z = Math.PI / 2;
    ltail.position.set(-0.037, 0, 0);
    puck.add(ltail);
    /* Ears sideways, not up. Measured: the body skin is 40 mm above this
       puck on body-4 and -6, and an ear plus a bolt head on the crown left
       2.4 mm of it. Sideways there is 206 mm. */
    for (const sz of [1, -1]) {
      const ear = lib.cbox(0.026, 0.014, 0.0035, 0.0009, M.castAlu);
      ear.position.set(-0.006, 0, sz * 0.0335);
      puck.add(ear);
      puck.add(screw([-0.006, 0, sz * 0.0353], [0, 0, sz], 0.0030, M.steel));
    }
    /* THIS PUCK IS BURIED AND IT IS STAYING BURIED, AND THAT IS A DECISION
       WITH BOTH NUMBERS BEHIND IT.

       The window face lands on x 2.358. The bodywork at this station fills
       x 2.340 to 2.390 on every body that carries the puck, skin on body-4
       and -6 and skin plus light band on -7, -8 and -9, so the sensor sits
       BEHIND the surface it looks through. The triage's ray parity puts it
       99.7 percent inside body-4/skin and body-6/skin at a straddle depth of
       only 3.14 mm: 706th of 765 by depth, and by the buried-and-unpickable
       criterion the clearest defect in this module.

       Bringing it out was tried and measured rather than argued. At x 2.364
       the window face is on 2.392, 2 mm proud of the outermost body surface
       on any of the six presets, and the sensor is visible. The cost is that
       the 64 mm barrel then crosses the panel it came through: the reading
       goes from 7 partner parts and 10.64 mm to 10 partner parts and
       21.62 mm, because a let-in sensor needs an aperture and neither the
       light band nor the skin has one. Cutting that aperture is a body edit.

       So the puck stays where it is and the burial is reported instead of
       being traded for a deeper undeclared penetration on more pairs. Both
       measurements are in AUDITED RESIDUALS; the fix is one change in two
       modules and it belongs to whoever owns the bodies. */
    puck.rotation.y = -0.44 * s;
    puck.position.set(2.33, 0.615, 0.30 * s);
    lid.add(puck);
    sys.add(lid);
  }

  /* ── triplex compute ─────────────────────────────────────────────────
     One cold plate under the rear seat carrying three identical lanes
     across z, the voter bar on the forward edge, two diode-ORed 48 V feeds
     and one coolant tee. The three lanes are built to be counted: three
     boards, three SoCs, three DRAM banks, three data jumpers into the
     voter and three orange power drops off the feed block, so the
     architecture is legible before anyone opens the panel.

     Measured envelope: y 0.3895 to 0.4661. The nearest interior-4 rear-bench
     FACES are 13 mm below and 10 mm above that band, but read the next
     sentence before trusting them, because a face is not a void.
     interior-4 draws its bench cushion as one solid box, y 0.380 to 0.510
     over x -0.995 to -0.445, and the aft 350 mm of this cold plate is
     inside it: 830 intersecting triangle pairs swept off the built meshes.
     That is a pre-existing packaging conflict between two modules, not a
     detail defect, and it was there before this pass with the smaller
     envelope too (356 pairs). It cannot be fixed from this side: clearing
     the cushion means dropping the plate below the bench pan at y 0.370,
     which lands it on battery-3's rear seat pads. Do not quote a clearance
     to interior-4/rear-bench; the two parts overlap.

     The two coolant spigot ends stay on x -0.795, which is where thermal-6,
     -7 and -9 all land their glycol loop, and that contact is this part's
     attachment. */
  const comp = lib.part('compute', [0, -0.75, 0]);
  const CX = -0.55;

  const cold = lib.cbox(0.420, 0.044, 0.300, 0.005, M.castAlu);
  cold.position.set(CX, 0.417, 0);
  comp.add(cold);
  /* the casting's parting line, and the machined deck the boards mount on */
  const cflash = lib.cbox(0.4245, 0.0022, 0.3045, 0.0006, M.castAlu);
  cflash.position.set(CX, 0.4115, 0);
  comp.add(cflash);
  const deck = lib.cbox(0.404, 0.007, 0.284, 0.0015, M.alu);
  deck.position.set(CX, 0.4425, 0);
  comp.add(deck);
  /* stiffening ribs on the underside, cast in with the plate */
  const ribs = lib.fins(0.380, 0.0055, 0.260, 9, 0.005, M.castAlu);
  ribs.position.set(CX, 0.3922, 0);
  comp.add(ribs);

  /* three lanes */
  for (const zi of [-0.095, 0, 0.095]) {
    for (const sx of [1, -1]) for (const sz of [1, -1]) {
      const so = lib.cyl(0.0022, 0.0035, M.alu, 6);
      so.position.set(-0.545 + sx * 0.130, 0.44775, zi + sz * 0.033);
      comp.add(so);
    }
    const pcb = lib.cbox(0.280, 0.0016, 0.082, 0.0005, M.pcb);
    pcb.position.set(-0.545, 0.4503, zi);
    comp.add(pcb);
    /* SoC: substrate plus a machined integrated heat spreader */
    const sub = lib.cbox(0.054, 0.0022, 0.054, 0.0006, M.pcb);
    sub.position.set(-0.600, 0.4522, zi);
    comp.add(sub);
    const ihs = lib.cbox(0.042, 0.0035, 0.042, 0.0009, M.alu);
    ihs.position.set(-0.600, 0.45505, zi);
    comp.add(ihs);
    /* four DRAM packages per lane */
    for (let i = 0; i < 4; i++) {
      const d = lib.cbox(0.010, 0.0014, 0.019, 0.0003, M.plastic);
      d.position.set(-0.500 + i * 0.014, 0.4518, zi);
      comp.add(d);
    }
    /* lane power stage, its own brick per lane */
    const vrm = lib.cbox(0.020, 0.005, 0.030, 0.0012, M.darkSteel);
    vrm.position.set(-0.640, 0.4536, zi);
    comp.add(vrm);
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
    /* lane number, cast into the deck edge: one bar, two bars, three */
    const lane = zi === -0.095 ? 1 : zi === 0 ? 2 : 3;
    for (let b = 0; b < lane; b++) {
      const bar = lib.cbox(0.010, 0.0014, 0.0025, 0.0004, M.alu);
      bar.position.set(-0.3900, 0.4467, zi - 0.010 + b * 0.007);
      comp.add(bar);
    }
  }

  /* the voter: a sealed can with a machined lid and four screws, because
     it is the one element the architecture cannot vote on */
  const voter = lib.cbox(0.035, 0.018, 0.270, 0.0035, M.darkSteel);
  voter.position.set(-0.36, 0.454, 0);
  comp.add(voter);
  const vlid = lib.cbox(0.029, 0.0030, 0.264, 0.0008, M.alu);
  vlid.position.set(-0.36, 0.4625, 0);
  comp.add(vlid);
  for (const sz of [-0.125, -0.042, 0.042, 0.125]) {
    comp.add(screw([-0.36, 0.4640, sz], [0, 1, 0], 0.0028, M.steel));
  }

  /* heatsink banks on both flanks, on their own base rails */
  for (const s of [1, -1]) {
    const base = lib.cbox(0.310, 0.008, 0.048, 0.0018, M.castAlu);
    base.position.set(CX, 0.399, 0.176 * s);
    comp.add(base);
    const bank = lib.fins(0.300, 0.034, 0.044, 13, 0.0025, M.castAlu);
    bank.position.set(CX, 0.420, 0.176 * s);
    comp.add(bank);
    for (const sx of [1, -1]) {
      const cap = lib.cbox(0.006, 0.042, 0.048, 0.0015, M.castAlu);
      cap.position.set(CX + sx * 0.152, 0.418, 0.176 * s);
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

  /* two 48 V feeds from separate hv-4 zonal controllers, diode-ORed into
     one block, then three orange drops so each lane is fed on its own */
  const feed = lib.cbox(0.026, 0.022, 0.088, 0.0035, M.hv);
  feed.position.set(-0.3350, 0.4150, 0);
  comp.add(feed);
  /* The two feeds come in on top of the block, not out of its nose: this
     assembly's forward face is the tightest thing on the cold plate and the
     original nubs already defined x -0.3225 as its limit. */
  for (const s of [1, -1]) {
    const fc = connector(0.0050, 0.014, M.hv);
    fc.position.set(-0.3350, 0.4260, 0.030 * s);
    comp.add(fc);
  }
  /* Each feed arrives along the top of its own heatsink bank and drops into
     the block. Routing them over the deck was tried and abandoned: the
     voter bar spans the whole forward edge from y 0.445 to 0.466 and the
     rear bench ceiling is y 0.475, so there is no lane over it and no lane
     under it. The flank above the fins is the only real path, and it is
     also where a harness would actually be clipped. */
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
     plane thermal lands its loop on; the boss, the O-ring land and the
     hose barbs all grow inboard of it. */
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

  /* earth stud with its ring terminal: the chassis reference for three
     lanes that have to agree about what zero volts means */
  const stud = lib.cyl(0.0030, 0.0090, M.busbar, 8);
  stud.position.set(-0.7300, 0.4505, -0.140);
  comp.add(stud);
  const lug = lib.cbox(0.018, 0.0016, 0.010, 0.0004, M.copper);
  lug.position.set(-0.7205, 0.4548, -0.140);
  comp.add(lug);
  comp.add(screw([-0.7300, 0.4556, -0.140], [0, 1, 0], 0.0032, M.steel));

  sys.add(comp);

  /* ── driver monitor ──────────────────────────────────────────────────
     The arm bolts to the header casting at z -0.075 in the shared frame
     and carries the pod at its outboard end, tilted down onto the driver's
     face. Aft is -x in this frame and the pod adds 0.40 rad about z, but
     the frame's own -0.1 rad tilts the same axis back UP, so the two
     subtract rather than add. Swept off the built mesh, the pod sits at
     (0.4127, 1.2575, -0.3020) and its optical axis is (-0.9553, -0.2955,
     0), which is 17.2 degrees below horizontal. The driver's head, taken
     from the built headrest in interior-4 and interior-6, lies on a line 7
     to 12 degrees below the pod, so 17 degrees already looks past it and
     the 23 the old comment claimed would look further past it still. The
     geometry is the right one and the arithmetic was the wrong one; the
     metadata now says 17 degrees because that is what is built. */
  const dmsG = lib.part('dms', [0.3, 0.5, -0.4]);
  const df = headerFrame();

  const arm = lib.cbox(0.038, 0.015, 0.221, 0.003, M.castAlu);
  arm.position.set(0, -0.0235, -0.1855);
  df.add(arm);
  const armRib = lib.cbox(0.012, 0.007, 0.160, 0.0018, M.castAlu);
  armRib.position.set(0, -0.0345, -0.2000);
  df.add(armRib);
  /* the splice plate that laps the joint, and its four bolts */
  const splice = lib.cbox(0.030, 0.004, 0.080, 0.001, M.alu);
  splice.position.set(0, -0.0330, -0.0750);
  df.add(splice);
  for (const sx of [1, -1]) for (const sz of [-0.045, -0.105]) {
    df.add(screw([sx * 0.010, -0.0350, sz], [0, -1, 0], 0.0028, M.steel));
  }

  /* The drop bracket off the arm's end. The pod is tilted and the arm is
     not, so something has to make the transition: hung straight off the
     arm, the pod's forward top corner rose 22 mm into the arm it hangs
     from. It is a clevis, two side plates lapping the arm with a bolt
     through each, because that is the joint a bracket like this has and
     the bolt heads land on a face somebody can see. */
  const drop = lib.cbox(0.026, 0.019, 0.032, 0.0025, M.castAlu);
  drop.position.set(-0.002, -0.0400, -0.3020);
  df.add(drop);
  for (const sx of [1, -1]) {
    const plate = lib.cbox(0.004, 0.026, 0.030, 0.0009, M.castAlu);
    plate.position.set(sx * 0.021, -0.0330, -0.3000);
    df.add(plate);
    df.add(screw([sx * 0.023, -0.0255, -0.2905], [sx, 0, 0], 0.0026, M.steel));
  }

  /* the pod: moulded shell, parting line, framed aperture, lens barrel
     with a hood, and two IR emitters that are separate optics */
  const pod = new THREE.Group();
  pod.rotation.z = 0.40;
  pod.position.set(-0.002, -0.0530, -0.3020);

  pod.add(lib.cbox(0.044, 0.030, 0.046, 0.0035, M.sensor));
  const pflash = lib.cbox(0.0446, 0.0016, 0.0466, 0.0004, M.sensor);
  pflash.position.y = -0.004;
  pod.add(pflash);
  /* mounting flange on top, clamped by the drop bracket. No bolt heads on
     its upper face: the bracket covers it, and a head under a bracket is a
     head nobody sees. The clevis bolts through the arm are the visible pair. */
  const flange = lib.cbox(0.030, 0.004, 0.038, 0.001, M.castAlu);
  flange.position.set(0.001, 0.0170, 0);
  pod.add(flange);
  /* aperture: a frame, not a plate, so the optics behind it read */
  const pbz = bezel(0.005, 0.026, 0.044, 0.0045, 0.0012, M.darkSteel);
  pbz.position.x = -0.0235;
  pod.add(pbz);
  const barrel = lensBarrel(0.0072, 0.0090, 12);
  barrel.rotation.y = Math.PI;
  barrel.position.x = -0.0215;
  pod.add(barrel);
  const phood = lib.cbox(0.0100, 0.0022, 0.020, 0.0006, M.plastic);
  phood.position.set(-0.0272, 0.0142, 0);
  pod.add(phood);
  /* two invisible 940 nm emitters, each in its own barrel with a lens,
     sized to sit inside the bezel aperture rather than across its rim */
  for (const sz of [1, -1]) {
    const eb = lib.cyl(0.0045, 0.0055, M.darkSteel, 10);
    eb.rotation.z = Math.PI / 2;
    eb.position.set(-0.0245, -0.0012, sz * 0.0128);
    pod.add(eb);
    const el = lib.cyl(0.0036, 0.0016, M.glass, 10);
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
     Two roof-spine antennas, 0.65 m baseline. Each is a patch under a
     moulded radome on a machined base flange, with the coax gland below.

     AN OPEN DEFECT, MEASURED AND NOT FIXED, AND IT IS THE SAME ONE
     autonomy.js RECORDS FOR ITS LIDAR. These two antennas are at a single y
     and they serve four different roofs. Ray probed straight up at their
     own stations, x 0.15 and x -0.50 on the centreline, the roof surface
     over them is

       body-4 and body-6 canopy    y 1.4556 and 1.4202
       body-7, body-8, body-9      y 1.3632 and 1.3642

     and the assembly fills y 1.4148 to 1.4291. So on gen4 and gen5 the
     forward unit is 26 mm UNDER the canopy and the aft one 8.9 mm through
     it, which the cross-module check reports as 3.20 mm into body-4 and
     body-6's canopy and 5.25 mm into body-6's pillars; and on gen6 through
     gen10 the whole assembly stands about 50 mm ABOVE the roof skin in open
     air, penetrating nothing and touching nothing, 42.12 mm from the
     nearest surface of any part on the car.

     IT USED TO READ AS ATTACHED ON THOSE FIVE RUNGS AND THE ATTACHMENT WAS
     FALSE. interior-6's canopy liner was drawn against body-6's crown and
     ran under the same station at y 1.409, 9.16 mm below this flange, so
     [attachment] found a neighbour. That liner was 40 mm out of position on
     every body-7 rung and the penetration wave rehung it on the lowest
     roof, where it belongs, at y 1.2576. The antenna did not move; the part
     that was holding it up was never there.

     Both alternatives were measured before deciding not to take either.
     Dropping the pair to the Gen 6 roof retires the three penetrating pairs
     and lands them on gen6 to gen10, and then floats them 90 mm over the
     liner on gen4 and gen5. Leaving them here floats them on five rungs and
     buries them on two. A flat-bottomed antenna cannot sit on two roofs
     92 mm apart from one coordinate, and the fix is a base that follows the
     roof it bolts to or one agreed spine station, both of which are
     body-side. Reported rather than traded, which is the call autonomy.js
     made on the same shape of problem. */
  const ant = lib.part('gnss-imu', [0, 0.6, 0]);
  for (const ax of [0.15, -0.50]) {
    const flangeA = lib.cyl(0.0250, 0.0035, M.alu, 20);
    flangeA.position.set(ax, 1.4165, 0);
    ant.add(flangeA);
    const dome = lib.lathe([
      [0.0000, 0.0000], [0.0215, 0.0000], [0.0220, 0.0018],
      [0.0215, 0.0072], [0.0185, 0.0098], [0.0000, 0.0108],
    ], M.plastic, 20);
    dome.position.set(ax, 1.4183, 0);
    ant.add(dome);
    /* A cast index lug on the flange, not a patch under the radome: the
       ceramic patch is inside an opaque moulding and modelling it buys 44
       triangles of geometry nobody can ever see. */
    const lug2 = lib.cbox(0.008, 0.0035, 0.014, 0.0009, M.alu);
    lug2.position.set(ax + 0.0275, 1.4165, 0);
    ant.add(lug2);
    const gland = lib.cyl(0.0055, 0.0080, M.darkSteel, 10);
    gland.position.set(ax, 1.4108, 0);
    ant.add(gland);
    for (const sz of [1, -1]) ant.add(screw([ax, 1.4183, sz * 0.0205], [0, 1, 0], 0.0024, M.steel));
  }
  sys.add(ant);

  /* three IMUs on the cold plate, one per lane, each a machined block with
     a bonded lid, four screws and its own micro connector */
  const imus = lib.part('gnss-imu', [0.25, -0.75, 0.35]);
  for (const zi of [-0.095, 0, 0.095]) {
    const base = lib.cbox(0.022, 0.008, 0.022, 0.0018, M.alu);
    base.position.set(-0.740, 0.450, zi);
    imus.add(base);
    const lid = lib.cbox(0.018, 0.010, 0.018, 0.0015, M.darkSteel);
    lid.position.set(-0.740, 0.459, zi);
    imus.add(lid);
    for (const sx of [1, -1]) for (const sz of [1, -1]) {
      imus.add(screw([-0.740 + sx * 0.0085, 0.454, zi + sz * 0.0085], [0, 1, 0], 0.0020, M.steel));
    }
    const ic = lib.cbox(0.005, 0.004, 0.010, 0.0009, M.plastic);
    ic.position.set(-0.7285, 0.4525, zi);
    imus.add(ic);
  }
  sys.add(imus);

  /* ── sensor ring bus ─────────────────────────────────────────────────
     Two counter-rotating rings round the cabin floor, cleated at every
     shape point, landing on four zonal junction boxes.

     THE HALF LENGTH IS 1.10 AND IT USED TO BE 1.92. That single number was
     the largest interference this module carried, and the ringCleats note
     below named it a generation before it was fixed: "this ring already
     runs 86 mm through hv-4's zonal controllers and through the thermal and
     drivetrain packs on every preset: the routing is the defect, not the
     cleats". Measured, the defect was bigger than that. At X 1.92 the loop
     ran out past both axles into the corner hardware and interpenetrated
     50 partner parts over 20,878 crossing triangle pairs, deepest 54.21 mm
     into body-9's front fairings, and it fouled 18 modules: five bodies,
     four drivetrains, three wheel sets, two suspensions, two thermal packs,
     hv-4 and interior-4.

     Nothing out there was ever a node. This bus joins four zonal
     controllers at |x| 1.16 and 1.19, and its own panel argues that wire
     length is set by the distance to the nearest corner. 820 mm of loom a
     side ran past the last node it serves, through the rear drive unit and
     out over the front knuckle, and served nothing at either end.

     The corridor was swept rather than guessed. A 24 x 15 x 24 mm probe,
     the cleated pair's real envelope, was walked over x -1.98 to 1.98 by
     y 0.36 to 0.52 by |z| 0.52 to 0.76 against every partner part in all
     six presets at once. The cabin floor perimeter is clear and both ends
     are packed solid: every one of the 50 pairs but three sat at |x| 1.0 or
     beyond. Half lengths from 1.00 to 1.24 were then measured on the BUILT
     tube against the same six presets, at both ring heights and at half
     widths 0.56, 0.60, 0.63 and 0.66, and a squarer plan with a tighter end
     radius was measured against the same grid. Everything at or above 1.12
     puts the loop back into hv-4's own tunnel runs; the widths below 0.63
     put it into interior-4's front seats and into every wheel set's master
     unit at x 0.62. 1.05 and 1.06 are the minimum of the one residual that
     survives, and the two differ because the two rings meet the same slab at
     different stations.

     WHAT IS LEFT, AND IT IS NOT MINE TO FIX. Two parts of interior-4, on
     gen4 only. The loop is clean against gen5 to gen9 outright.

       rear-bench   7.01 mm, 286 crossings, at (x -0.999, y 0.427, z -0.478).
                    The gen4 bench is a slab from y 0.311 to 1.211 spanning
                    x -1.261 to -0.435 and |z| up to 0.770, standing across
                    the whole rear cabin floor. Probed at 10 mm resolution
                    there is NO free (y, z) station between y 0.38 and 0.50
                    anywhere in |z| 0.44 to 0.77 at x -1.00 or at x -0.45;
                    the only gap at ring height is a sill channel at |z| 0.78
                    to 0.83, and that is closed by the rear wheel at x -1.15.
                    Sweeping the half length from 1.00 to 1.12 moves this
                    reading between 6.6 and 26.0 mm without ever clearing it,
                    which is the signature of a reading against a wall rather
                    than a clearance that can be engineered. The bench is the
                    deepest single item on the whole ladder, 154.94 mm
                    outside body-4's canopy, and it belongs to the cabin
                    shard. Routing this bus into the rocker to dodge a part
                    that is being rebuilt would size a cable off a defect.
       front-seats  4.05 mm, 24 crossings, at (x 0.279, y 0.435, z -0.636),
                    and it is the CLEAT, not the cable: the bare tube at this
                    width is clear of the seats at every height from 0.412 to
                    0.428. Narrowing the inner ring walks it down, 7.09 mm at
                    0.626, 3.09 at 0.622, 0.50 at 0.618, but 0.618 opens
                    3.47 mm into interior-6's front seats on all five later
                    rungs, which is a worse trade than 4.05 mm on one. */
  const net = lib.part('ring', [0, -0.45, 0]);
  const outer = ringPts(0.400, 1.05, 0.66);
  const inner = ringPts(0.428, 1.06, 0.63);
  net.add(lib.tube(outer, 0.006, M.plasticLt, true));
  net.add(lib.tube(inner, 0.006, M.plastic, true));
  net.add(ringCleats(outer));
  net.add(ringCleats(inner));

  /* Patch leads to the four nodes.

     The loop stops short of the controllers because they are 140 mm boxes
     and the loop is a cable: hv-4/zonal spans |z| 0.565 to 0.665 over
     x 1.090 to 1.230 and -1.260 to -1.120, so a loop drawn through that
     station is drawn through the box, which is what the 36.92 mm reading
     against zonal was. Each ring instead patches in, and the lead is built
     the way a loom actually reaches a connector rather than as a straight
     line to it:

       off the cable    the start is ringNear() on the BUILT curve, so the
                        lead leaves the loom it belongs to.
       inboard first    hv-4 puts the three keyed connectors on the box's
                        INBOARD wall, shells out to |z| 0.546 and boots to
                        |z| 0.5385, and the loop runs OUTBOARD of the box at
                        |z| 0.60. A lead drawn straight from one to the other
                        crosses the case corner. It comes inboard to |z| 0.49
                        at its own ring height, runs along x at that offset,
                        and only then drops onto the boot.
       drops last       the drop is last because hv-4's buffer lead crosses
                        this corridor: its conduit passes (1.16, 0.374,
                        -0.507) on its way to the 48 V ring's front terminal
                        pad, and a patch lead traversing at the boot's own
                        y 0.376 goes straight through it. Held at ring height
                        until |z| 0.49 the lead clears it, and the clearance
                        is 1.30 mm, not the 6 mm this line used to publish.
                        Swept surface to surface over the built lead against
                        the built conduit on gen4 and gen9, the closest
                        approach is at (1.162, 0.383, -0.514). It does not
                        penetrate on any rung, and 1.30 mm between a data
                        lead and a 48 V conduit is a coincidence rather than
                        a clearance: this is the tightest thing the patch
                        leads pass and it wants a clip, from whichever of
                        the two modules gets there first.
       ends ON the face the last control point is |z| 0.5385, which is the
                        boot's inboard end face measured off hv-4's own
                        geometry (a 8 mm cylinder centred on |z| 0.5425).
                        lib.tube leaves the sweep open, so the lead stops at
                        the boot instead of passing through it and no
                        undeclared joint is invented here.

     Each box carries three keyed connectors at x offsets -40, 0 and +40 mm.
     The outer ring takes the one nearest the cabin and the inner ring the
     middle; the outboard one is left free, and it has to be, because
     suspension-4 and suspension-9 both put steering hardware across the
     front box's outboard connector at x 1.201 and a lead landing there
     reads 0.18 mm into it. */
  for (const [nx, nz] of [[1.160, 1], [1.160, -1], [-1.190, 1], [-1.190, -1]]) {
    const inward = nx > 0 ? -1 : 1;
    for (const [ring, cdx] of [[outer, inward * 0.040], [inner, nx > 0 ? 0 : -0.040]]) {
      const s = ringNear(ring, [nx > 0 ? 1.02 : -1.02, ring[0][1], nz * 0.60]);
      const cx = nx + cdx;
      const ry = s.at[1];
      /* The traverse offset is not the same at both ends. Forward it holds
         |z| 0.505, because suspension-4 and suspension-9 both put the
         steering rack across |z| 0.470 at x 1.10 to 1.24, 34.05 mm and
         22.00 mm respectively. Aft it comes in to 0.470, because thermal's
         coolant lines cross |z| 0.505 there, 12.63 mm on the driver side. */
      const tz = nx > 0 ? 0.505 : 0.470;
      net.add(lib.tube([
        s.at,
        [s.at[0] - inward * 0.02, ry, nz * 0.545],
        [s.at[0] - inward * 0.05, ry, nz * (tz + 0.03)],
        [cx, ry, nz * (tz - 0.015)],
        [cx, 0.386, nz * (tz + 0.011)],
        [cx, 0.376, nz * 0.529],
        [cx, 0.376, nz * 0.534],
        [cx, 0.376, nz * 0.5385],
      ], 0.004, M.plastic, false, 30));
    }
  }

  /* Where the four junction boxes stand, and why not at the corners.

     The obvious station is the ring's four corners, and it is wrong. A
     60 x 50 x 50 box centred on the ring at x +/-1.500 is submerged: swept
     against every partner in all six presets this slot appears in, the
     forward pair intersects suspension-4's air springs over a 55 x 49 x 33
     mm region, plus the drivetrain front unit on every generation, and
     wheels-9's disc and suspension-9's knuckle on Gen 9; the aft pair
     intersects wheels-7 and wheels-9's park brake over 84 x 61 x 53 mm,
     drivetrain hub bearings, suspension-4's dampers and suspension-9's rear
     structure. The intersection regions are larger than the box, which is
     the measurement that says the box is inside the hardware rather than
     brushing it. Two tubes could thread that corner; a box cannot.

     So the ring was swept station by station with the box footprint carried
     along it and tested against every partner part in gen4 through gen9 at
     once. Four windows on the +z half come out clear, and these are the two
     nearest the zone they serve: x 0.632 to 0.969 forward and x -0.475 to
     -0.727 aft. The boxes sit mid-window, and the box is centred BETWEEN
     the two tube axes rather than on the outer one, so both rings really do
     run through it.

     THE Z NOW COMES OFF THE BUILT CURVE AND USED TO BE A CONSTANT. It was
     0.6475 forward and 0.6448 aft, correct for a loop of half length 1.92
     and wrong for anything else, so shortening the loop to 1.10 would have
     left both boxes hanging beside the cable they are supposed to carry.
     ringNear() walks the same closed Catmull-Rom lib.tube sweeps and returns
     the midpoint of the two axes at the station, which is the definition the
     old constants were a snapshot of. The x windows are unchanged: they were
     chosen against partner geometry, and no partner moved. */
  const JB = [0.900, -0.620].map((x) => ({
    x,
    z: (ringNear(outer, [x, 0.400, 0.66]).at[2] + ringNear(inner, [x, 0.428, 0.63]).at[2]) / 2,
  }));

  for (const st of JB) {
    for (const sz of [1, -1]) {
      const jb = new THREE.Group();
      jb.add(lib.cbox(0.060, 0.050, 0.050, 0.004, M.plasticLt));
      /* gland plate on the inboard face, where the ring and the drops land */
      const gp = lib.cbox(0.004, 0.040, 0.040, 0.001, M.alu);
      gp.position.z = -0.026;
      jb.add(gp);
      for (const [gy, gz] of [[0.011, -0.011], [0.011, 0.011], [-0.011, -0.011], [-0.011, 0.011]]) {
        const c = connector(0.0048, 0.012, M.plastic);
        c.rotation.x = -Math.PI / 2;
        c.position.set(gz, gy, -0.028);
        jb.add(c);
      }
      /* Two bolted feet under the box, and a moulded status lens. The feet
         go underneath rather than out of the flanks: both rings pass
         straight through this box at y 0.400 and 0.428, and an ear at the
         box's mid height put its bolt head inside the outer ring. */
      for (const s of [1, -1]) {
        const foot = lib.cbox(0.012, 0.0035, 0.030, 0.0009, M.plasticLt);
        foot.position.set(s * 0.036, -0.0268, 0);
        jb.add(foot);
        jb.add(screw([s * 0.036, -0.0285, 0], [0, -1, 0], 0.0028, M.steel));
      }
      const led = lib.cyl(0.0035, 0.0022, M.lamp, 10);
      led.position.y = 0.0261;
      jb.add(led);
      jb.rotation.y = sz > 0 ? 0 : Math.PI;
      jb.position.set(st.x, 0.414, st.z * sz);
      net.add(jb);
    }
  }
  sys.add(net);

  return sys;
}
