/* Suspension and steering: double wishbone front, five-link rear, steer-by-wire
   rack with no mechanical column. Geometry builds the passenger side (+z) for
   corner parts and mirrors across z. Wheels are a separate system at z 0.81;
   everything here stays inboard of z 0.76. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'suspension',
  name: 'Suspension and steering',
  color: 0xc0a2ec,
  explode: [0, -0.62, 0],
  blurb: 'Double wishbones ahead, five links per side behind, and a steering rack no shaft touches. The 164 kg that decides how 2,200 kg reads the road.',
  parts: {
    'front-subframe': {
      name: 'Front subframe',
      tagline: 'An aluminum cradle that collects every front corner load and hands it to the body through rubber.',
      mass: 24,
      specs: [
        ['Construction', '6082-T6 extrusions, cast corner nodes'],
        ['Body mounts', '4x elastomer bushes, 55 Shore A'],
        ['Pivot tolerance', 'Machined post-weld, ±0.15 mm'],
        ['Carries', 'Wishbones, rack, anti-roll bar'],
        ['Crash role', 'Lower load path, shear-off bolts'],
      ],
      how: 'Two longitudinal rails and two crossmembers, welded through cast nodes, form a stiff ladder that every front suspension force enters first. A hard corner puts 11 kN of lateral load through each lower wishbone and up to 12 kN through the steering tie rods; the frame resolves most of those forces against each other internally and delivers only the net load to the body, through four studs instead of a dozen scattered brackets. All pivot bores are machined in one fixture after welding, so the geometry the wishbones depend on holds to ±0.15 mm regardless of weld distortion.\n\nBetween each stud and the body sits a laminated rubber mount. The mounts are the acoustic gatekeeper: tire and road input in the 80 to 300 Hz band is attenuated roughly 10 dB before it reaches the floor structure. In a frontal crash the rear pair of bolts is designed to shear, letting the subframe and drive unit dive under the battery pack instead of into it.',
      why: 'An EV has no engine noise to hide behind, so coarse-chip road roar is the loudest thing left in the cabin. Bolting control arms straight to the body would turn the floor into a soundboard. A separate frame on soft mounts puts the compliance where it is harmless, the whole frame translating a millimeter, rather than where it ruins geometry, at an individual arm pivot.',
      fail: [
        'Mount rubber stiffens with age and the isolation quietly fades; it is a 10-year part, not a lifetime one.',
        'A hard curb strike bends a rail: deliberate, because a subframe is a bolt-off repair and a body rail is not.',
        'Steel bolts in aluminum bores are a galvanic couple; flanged washers and sealant are there for corrosion, and skipping them at service invites seizure.',
      ],
      explode: [0.15, -0.45, 0],
    },
    wishbones: {
      name: 'Front double wishbones',
      tagline: 'Two unequal arms per corner that lean the tire into the corner as the body rolls.',
      mass: 15,
      count: 4,
      specs: [
        ['Layout', 'Unequal-length double wishbone'],
        ['Arms', 'Forged 6082-T6, solid section'],
        ['Ball joints', 'Sealed, 40 kN pull-out rating'],
        ['Camber gain', '-1.3° per 60 mm of bump'],
        ['Static roll center', '55 mm above ground'],
      ],
      how: 'The upper arm is shorter than the lower. In bump, the short arm pulls the top of the knuckle inboard faster than the long arm moves the bottom, so the wheel gains negative camber exactly when body roll would otherwise lean it away from the road. At 0.9 g of lateral load the outside contact patch stays within half a degree of flat; a strut in the same corner would have surrendered more than a degree and shed several percent of its grip with it.\n\nThe lower arm carries most of the work: cornering, braking reaction, and the coilover sits on it, so it is forged with a deep section around the spring seat. The inner bushes are tuned individually. The front bush is stiff radially so lateral load cannot steal the camber the geometry earned; the rear bush is softer longitudinally so a pothole edge can drive the wheel back a few millimeters instead of cracking the impact into the cabin.',
      why: 'Struts won the industry on cost and on width, because an engine used to need the space between the towers. With no engine, the packaging tax of an upper arm is affordable, and it buys camber control, a lower hood line, and a cleaner steering axis. On a 2,200 kg car the tires need the help more, not less.',
      fail: [
        'A torn ball joint boot is the classic field failure: grit grinds the joint loose in months once water is in.',
        'Bushing softening shows up as inner-shoulder tire wear before any driver feels it; alignment checks catch it.',
        'The arms have a designed bend point so a severe curb strike sacrifices a forging, not the subframe or knuckle.',
        'An open defect, measured and not fixed. The upper arm\'s rear inner pivot is inside the front casting. body/front-casting draws its rail as a solid from x 1.550 to 2.060 over y 0.300 to 0.580 and |z| 0.355 to 0.595, and the pivot sits at (1.650, 0.550, 0.380), which is 100 mm past that rail\'s rear face with its whole bush inside; the arm leaves through the face at (1.550, 0.5575, 0.540) and the checker reports 93.53 mm of straddle depth over 48 crossings on Gen 1 to Gen 3 and 92.68 mm over 152 from Gen 4. Nothing in this module reaches y 0.550, so the pivot has nowhere else to land: it is bolted to the casting and the casting is drawn as a brick. Moving it inboard of |z| 0.355 lengthens the upper arm by 25 mm, which is the camber gain and the roll center this panel argues from, so the repair is a wheel-well cavity in the casting rather than a shorter arm.',
      ],
      explode: [0.1, 0, 0.5],
    },
    knuckles: {
      name: 'Front knuckles',
      tagline: 'One hollow casting per corner that holds every wheel-defining point in a single rigid reference frame.',
      mass: 16,
      count: 2,
      specs: [
        ['Material', 'A356-T6, hollow low-pressure casting'],
        ['Hub bearing', 'Gen-3 flanged unit, 85 mm, double row'],
        ['Kingpin geometry', '9.5° inclination, 5 mm scrub'],
        ['Interface tolerance', '±0.1 mm across seven features'],
        ['Corner unsprung mass', '48 kg incl. wheel and brake'],
      ],
      how: 'The knuckle is the reference frame of the corner. Its upper and lower ball joint tapers define the steering axis, its bearing bore defines the wheel plane, and its steering arm defines toe. All seven interfaces are machined in one setup on one casting, because every bolted joint between them would be a tolerance and a rattle waiting to happen. The wheel bearing is a preloaded double-row unit: zero internal clearance, so 11 kN of cornering load deflects the wheel plane by hundredths of a degree rather than tenths.\n\nA motor in this knuckle was studied and rejected. A hub motor adds roughly 22 kg per corner, close to half again on the 48 kg already there. The wheel-hop resonance drops from about 12 Hz to under 10, closer to the body modes the damper must separate it from, and measured contact-force variation on a coarse road rises around 20 percent. That is grip lost precisely when the road is worst. Keeping the motors sprung costs two driveshafts of 4 kg each; the trade is not close.',
      why: 'Every gram here accelerates with the road at up to 20 g vertical, so mass in the knuckle is the most expensive mass on the car. Casting it hollow saves 1.8 kg per corner over a solid section at equal stiffness, which is why the foundry runs the harder process.',
      fail: [
        'A square-edged pothole can brinell the bearing races; the damage announces itself as a hum that tracks wheel speed.',
        'The 5 mm scrub radius assumes the specified wheel offset; aftermarket wheels quietly rewrite the steering feel and kickback.',
        'Bearing preload is set by the hub bolt torque once; reusing the bolt at service is how a good bearing dies early.',
      ],
      explode: [0.15, 0.05, 0.62],
    },
    coilovers: {
      name: 'Front coilovers',
      tagline: 'A spring that carries 500 kg, and a damper whose real job is turning motion into heat.',
      mass: 18,
      count: 2,
      specs: [
        ['Spring rate', '48 N/mm, ride frequency 1.45 Hz'],
        ['Damper', '46 mm monotube, 25 bar gas'],
        ['Force at 0.5 m/s', '2.4 kN rebound, 1.1 kN compression'],
        ['Travel', '95 mm bump, 85 mm rebound'],
        ['Top mount', 'Three-path, spring and damper loads split'],
      ],
      how: 'Each front corner suspends about 520 kg. The spring stores the road input; the damper decides how fast it comes back out. Inside the monotube a piston forces oil through shim stacks whose stiffness sets the force curve: digressive tuning, steep below 0.1 m/s so the body feels tied down in steering and pitch, then blowing off over sharp edges so a manhole cover reads as a thump, not a strike. The 25 bar nitrogen charge behind a floating piston keeps the oil from cavitating on rebound.\n\nAn EV makes this job harder in an unexpected way. The battery raises the sprung-to-unsprung ratio to roughly 11:1, luxury-sedan territory, which is why EVs feel planted. But the energy the damper must dissipate scales with total mass: this car pumps roughly 40 percent more heat through the same damper than a 1,600 kg car over the same crest at the same speed. The monotube layout is the answer, its single wall shedding heat straight to the airstream, and the valving is sized for sustained dissipation, not just peak force.',
      why: 'The planted EV ride the brochures promise is mostly the mass ratio, which comes free with the pack. The bill arrives at the damper as watts. Sizing dampers thermally, like a brake, rather than only by force curve, is the discipline heavy EVs forced back into chassis engineering.',
      fail: [
        'Gas charge loss brings cavitation: a papery rattle over small bumps and a damper doing half its job.',
        'A long mountain descent can shear-thin the oil 10 to 15 percent; the tune must stay stable hot.',
        'Top mount rubber ages into a clunk over ridges that owners blame, wrongly, on the ball joints.',
        'An open defect, measured and not fixed, and the oldest one on the ladder. The front damper column stands on the front halfshaft. The damper axis passes 26.5 mm from the front axle line at axle height, and the coil around it has an outer radius of 53 mm, so the spring reaches the axle centerline: sliced in cylindrical coordinates about (x 1.45, y 0.355), this part\'s innermost surface at z 0.540 is 0.0 mm from that line. Against the shaft\'s 22 mm tube the radial overlap is 48.5 mm. The checker reports 100.19 mm over 376 crossing triangle pairs, and that number is the plane-straddle convention over-reading on a 400 mm lathe strip, not an intrusion: rank by it, size the fix from the 48.5. The 26.5 mm has not moved from Gen 1 to Gen 10, through four drivetrains and three suspensions.\n\nTwo figures this entry used to publish were wrong, and both made the corner look more closed than it is. It said the shaft occupies x 1.408 to 1.492 "including its boots" and derived a corridor of x 1.355 or less or x 1.545 or more. 1.408 to 1.492 is the halfshaft part\'s bounding BOX, set by the r 42 mm CV boots, and the boots are nowhere near this station: sliced about the axle line the boot presents its full 42 mm only at z 0.400 and z 0.640, and from z 0.410 to 0.630 the shaft is the plain 22 mm tube. At the damper\'s own station it occupies x 1.428 to 1.472, so a 53 mm damper radius needs its axis at x 1.375 or less or x 1.525 or more, 20 mm nearer on each side than this entry claimed. A bounding box is not a section, and reading one as the other is how a corridor gets closed on paper.\n\nThe conclusion survives the correction, and it is now searched rather than argued. 273 candidate placements were swept against on-disk geometry: 171 pure translations over dx +/-0.22 and dz +/-0.10, and 102 rakes moving the lower eye and the top mount independently. Each was scored as the free radius to the nearest surface of any other part, minus the radius this column actually needs at that station, and not one of them fits. The best cell is still 19.2 mm short, at a lower eye 200 mm aft and a top mount 80 mm forward. Forward is closed by body/front-casting, whose aft face at x 1.550 bars any axis past 1.497, and going outboard around it needs |z| 0.648 or more, which puts the spring past the tire\'s inner face at 0.6925. Aft is closed by this module\'s own upper wishbone first, then by the front subframe, the steering rack and battery/lid. So the fix is a wheel-well cavity in the front casting, which is a body and frozen, and this crosses two slots: it is reported with both halves measured rather than half taken.',
      ],
      explode: [0, 0.6, 0.15],
    },
    steering: {
      name: 'Steer-by-wire rack',
      tagline: 'The column ends at a sensor box. From there to the tires, steering is a control loop.',
      mass: 15,
      specs: [
        ['Actuator', 'Belt-driven ball nut, dual-wound PMSM'],
        ['Peak rack force', '12 kN'],
        ['Ratio', 'Software-set, 9:1 to 14:1 equivalent'],
        ['Control loop', '1 kHz position, torque overlay'],
        ['Redundancy', 'Dual ECU, dual winding, dual supply'],
        ['Failover', 'Under 2 ms, full authority retained'],
      ],
      how: 'The hand wheel turns a short column that ends at the feedback unit: a triple-redundant angle sensor plus a small motor that renders the forces the rack is really seeing back into the rim, 2 to 6 Nm of synthetic but honest feel. Nothing mechanical continues downward. The rack itself is driven by a belt-and-ball-nut actuator: the motor spins a recirculating ball screw, converting rotation to up to 12 kN of thrust with little friction, and the tie rods push the knuckle steering arms.\n\nWith no mechanical fallback, the electrical chain is doubled end to end. The stator carries two independent three-phase windings, each fed by its own ECU from its own 12 V supply, each able to deliver over 60 percent of full assist alone. The two lanes cross-check position over two CAN-FD channels a thousand times a second; a disagreement is settled by the 2-of-3 hand-wheel sensor vote, and a failed lane is dropped in under 2 ms, faster than the driver can feel it.',
      why: 'Deleting the shaft buys a variable ratio in software, 9:1 in a parking lot and 14:1 at highway speed, removes the column as an intrusion path in a frontal crash, frees the rack to sit wherever packaging wants it, and filters kickback before it reaches hands. The honest reason the industry took decades to ship it is the redundancy bill. It is paid here, in copper and silicon, roughly two of everything.',
      fail: [
        'Total electrical loss means no steering at all: hence two supplies plus a capacitor bank sized to finish a lane change.',
        'Feel is synthesized, so feel is a calibration liability; a bad software release can make good hardware drive badly.',
        'Angle sensor drift is caught by the redundant vote, but a 2-of-3 system is only as good as its calibration discipline.',
        'An open defect, measured and not fixed, and A repair that was tried and withdrawn. The tie rod crosses the front brake disc. The disc is a solid 380 mm cylinder, friction ring r 0.190 about the axle over |z| 0.660 to 0.690; the tie rod leaves the rack ball at r 0.230, which is outside it, falls inside r 0.190 at |z| 0.587, and is at r 0.154 by the time it reaches the disc plane, so it goes straight through: 47.61 mm of straddle depth over 214 crossings into the disc and 61.40 mm over 48 into the caliper on Gen 1, 31.17 mm over 218 on Gen 2 to Gen 4. The outer ball joint at (1.375, 0.305, 0.705) sits r 0.090 from the axle, effectively on the hub, and that one number is the whole cause. Moving it outboard of the ring was tried and does not fit. At |z| 0.70 the corner is closed on four sides at once: the caliper occupies x 1.235 to 1.325 over y 0.330 to 0.460; the pack is inboard of x 1.300 with battery/tray\'s outer wall at y 0.140 to 0.300 over |z| 0.634 to 0.720 and battery/lid\'s top face at y 0.320; the tire\'s sidewall torus starts at r 0.239 over |z| 0.694; and the rim barrel closes with a face at |z| 0.710. An end at r above 0.204 therefore has to sit either below y 0.226, which is inside the pack, or above y 0.460, which puts the tie rod 185 mm above the rack and makes bump steer the dominant term. An attempt at (1.235, 0.280, 0.695) retired the disc and caliper pairs and put 156 crossings 40.9 mm into battery/lid and 54 crossings 67.2 mm into battery/tray, which trades a visible failure for a worse one; it was measured, rejected and reverted. The disc is too large for the corner it is drawn in, and that is a decision across suspension and wheels rather than an edit to either.',
      ],
      explode: [0.55, 0.12, 0],
    },
    'arb-front': {
      name: 'Front anti-roll bar',
      tagline: 'A torsion spring that exists only when the two front wheels disagree.',
      mass: 5,
      specs: [
        ['Bar', '26.5 mm OD, 4.5 mm wall, 34MnB5'],
        ['Rate at link', '28 N/mm'],
        ['Roll stiffness share', '58% front'],
        ['Body roll at 0.8 g', '3.4° with bar, ~5.6° without'],
      ],
      how: 'When both wheels rise together the bar simply rotates in its bushes and adds nothing. When the body rolls, one end arm swings up and the other down, and the center section is placed in pure torsion; the torque it develops pushes the loaded side back up. It is a spring that acts only on the difference between the two wheels, which is why it can stiffen roll without stiffening ride. The tube is hollow because torsional stress lives at the surface: deleting the core cuts 40 percent of the mass for about 5 percent of the rate.\n\nSizing starts from the roll budget. On springs alone this car would roll about 5.6 degrees at 0.8 g; the target is under 3.5, and the bars supply the difference, split deliberately unevenly: the front pair of wheels carries 58 percent of total roll stiffness on only 48 percent of the mass.',
      why: 'Roll stiffness distribution is the balance knob of the whole car. The axle carrying the larger share works its outside tire harder and saturates first, so a front-biased split makes the limit behavior understeer: stable, undramatic, recoverable by lifting. The front bar is set stiff to guarantee that character, and the smaller rear bar trims it.',
      fail: [
        'Drop-link ball joints are the first rattle on every car with a bar; a 30-second pry-bar check finds them.',
        'The bar bushes wear grooves and the bar starts to knock at roll reversal.',
        'The inherent limit: a one-wheel bump is partly copied to the other side. Roll control by coupling is paid for in head-toss on patched roads.',
      ],
      explode: [0.45, -0.22, 0],
    },
    'rear-subframe': {
      name: 'Rear subframe',
      tagline: 'A welded aluminum frame that gives ten links and a drive unit one stiff place to stand.',
      mass: 28,
      specs: [
        ['Construction', 'Extruded rails, cast link towers, mig welded'],
        ['Body mounts', '4x hydraulic bushes, glycol filled'],
        ['Stiffness at link pivots', '> 8 kN/mm local'],
        ['Carries', '10 links, spring loads, ARB, rear drive unit'],
      ],
      how: 'Five links per side means ten inner pivots, each seeing up to 9 kN, and each needing an abutment that does not move. The rails and crossmembers box the loads in plan; the cast towers rise above the rails to carry the upper camber links at the height their geometry demands. Stiffness here is not vanity: the rear elastokinematics assume the pivots stay put, and the toe behavior the links are tuned for lives in bushing deflections of a few tenths of a millimeter. A frame that flexed a whole millimeter would erase the tuning.\n\nThe body mounts are hydraulic: rubber bushes with internal glycol chambers and an orifice between them. At small amplitudes they are soft and isolate road noise like plain rubber; at large amplitudes the fluid is forced through the orifice and they damp. That second behavior matters because the rear drive unit hangs on this frame, and one-pedal driving swings its torque through zero dozens of times per journey. The hydraulic mounts kill the driveline shuffle those reversals would otherwise feed into the floor.',
      why: 'It is the front subframe argument doubled: the rear frame carries the noisiest sources, gear whine and road input, on the axle closest to the rear passengers. A stiff frame on soft, damped mounts delivers precise wheel control and a quiet floor at once, by putting compliance at the frame boundary where it is harmless instead of at a link pivot where it is poison.',
      fail: [
        'A hydraulic mount that loses its fluid still looks fine and quietly becomes plain rubber; the returning clunk under regen is the tell.',
        'Weld fatigue at the tower roots is the durability watch item; the test fleet logs strain there for a reason.',
        'Alignment lives on this frame: a subframe shifted 1 mm on its bolts after repair steers the rear axle. Dowels exist, use them.',
      ],
      explode: [-0.15, -0.45, 0],
    },
    'rear-links': {
      name: 'Five-link rear axle',
      tagline: 'Five rods per side, each removing one degree of freedom, leaving the wheel exactly one way to move.',
      mass: 26,
      specs: [
        ['Links', '5 per side: 2 upper, 2 lower, 1 toe'],
        ['Constraint logic', '5 DOF removed, vertical travel remains'],
        ['Toe under braking', '+0.15° toe-in at 0.3 g'],
        ['Anti-squat', '~60% under power'],
        ['Rear knuckle', 'Cast A356-T6, integrated hub unit'],
      ],
      how: 'A rigid body has six degrees of freedom. Each link, a rod with a joint at both ends, removes exactly one. Five links leave the rear knuckle a single path: near-vertical travel, with camber and toe programmed along it by where the rods point. The two upper links form a virtual pivot that sets camber, the toe link locks the steer angle, and the two lower links take traction and braking. Because each rod owns one job, each parameter tunes almost independently: change the toe curve without touching camber, add anti-squat without moving the roll center. That decoupling is the entire point.\n\nThe second layer is elastokinematics, the geometry of the bushings. Lift-off regen is a braking event at the rear axle only, up to 0.3 g, dozens of times per drive. The bushing rates are chosen so that longitudinal force deflects the wheel into slight toe-in, about 0.15 degrees, which plants the axle. A rear axle that toed out under regen would wander on every lift of the pedal. The same side-view geometry gives about 60 percent anti-squat under power, so the tail neither kneels on launch nor porpoises through one-pedal traffic.',
      why: 'Ten rods and twenty joints is the expensive answer, and a lighter car with gentle torque could use a simpler axle that ties camber, toe, and pitch together. A 2,200 kg car that can deliver full torque in 50 ms cannot: it needs each of those tuned to its own optimum, and five links is the cheapest architecture that allows it.',
      fail: [
        'Toe-link bushing wear is felt first and vaguely: a rear end that breathes on crown changes. Drivers report it as the front.',
        'The tuning assumes exact link lengths; rear toe is set to ±0.05° at the line and a curbed wheel can undo it.',
        'Twenty joints is twenty boots; the oldest ones fail from the inside out and only show up as play on the alignment rack.',
      ],
      explode: [-0.1, 0, 0.55],
    },
    'rear-springs': {
      name: 'Rear coil springs',
      tagline: 'Coils standing on a link perch, carrying the axle that carries the luggage.',
      mass: 6,
      count: 2,
      specs: [
        ['Rate', '130 N/mm at the coil'],
        ['Motion ratio', '0.64 to the wheel'],
        ['Wire', '54SiCr6, 13.5 mm, shot-peened'],
        ['Ride frequency', '1.55 Hz, 0.1 above front'],
      ],
      how: 'The spring stands on a perch forged into the lower link rather than wrapping around the damper. At a motion ratio of 0.64 the coil sees only two thirds of the wheel travel, so its rate must be the wheel rate divided by the ratio squared: 130 N/mm at the coil for 53 at the wheel. The link is sized for the bending this puts into it, and the spring seats are rubber-lined because a steel coil grinding on a bare steel perch is both a noise and a corrosion cell.\n\nThe rear runs 1.55 Hz to the front axle 1.45. That 0.1 Hz offset is the old flat-ride trick: the rear, struck by the same bump a wheelbase later, catches up in phase with the front so the body pitches once and settles instead of see-sawing. The rear also absorbs the payload swing. Four passengers and luggage add around 350 kg, most of it on this axle, and the rate is chosen so the fully laden car drops about 25 mm and keeps its damper travel.',
      why: 'Divorcing the spring from the damper buys 60 mm of trunk floor depth, because the fat coil tucks under the floor while only the slim damper rises into the wheelhouse. On an EV the boot is one of the few packaging wins left to give the customer; the suspension pays for it with one extra perch.',
      fail: [
        'Corrosion at the coil-to-isolator contact is where springs actually break: a stone nick plus ten winters.',
        'Springs sag 2 to 3 mm over a decade; the geometry tolerates it, but ride-height-based headlamp aim needs recalibrating.',
      ],
      explode: [0.05, 0.62, 0.08],
    },
    'rear-dampers': {
      name: 'Rear dampers',
      tagline: 'Slim monotubes that set the speed of every pitch the powertrain commands.',
      mass: 7,
      count: 2,
      specs: [
        ['Type', '46 mm monotube, rebound-biased'],
        ['Force at 0.5 m/s', '2.6 kN rebound, 1.0 kN compression'],
        ['Stroke', '105 mm'],
        ['Inclination', '12° to the tower mount'],
      ],
      how: 'Mechanically these are the front dampers without the spring: piston, shim stacks, gas backing, tuned digressive. Standing them nearly upright, apart from the spring, gives them a longer stroke and a better motion ratio than a coilover could reach under the trunk floor, so each newton of damping force does more work at the wheel.\n\nTheir signature job is one-pedal pitch. Every lift of the accelerator is a 0.2 to 0.3 g deceleration, nose down, tail up, hundreds of times a day. Springs and geometry set how far the body pitches; the dampers set how fast, and pitch rate is what passengers read as lurch. Rear low-speed rebound holds the tail down as it rises, front low-speed compression catches the nose, and the motor calibration ramps regen torque over about 150 ms so the demanded pitch rate stays under roughly 3 degrees per second. The damper tune and the torque ramp were signed off together, in the same week, as one system.',
      why: 'On a combustion car the powertrain disturbs the chassis occasionally; with one-pedal driving it disturbs it constantly, so the rear dampers moved up the engineering priority list. Rebound bias is the honest choice for a heavy tail: controlling 560 kg per corner on the way up matters more than cushioning it on the way down.',
      fail: [
        'Sustained rough-road work is a thermal problem first: a hot damper fades and the tail starts to float.',
        'A misting rod seal is legal wear until it wets the tube; then rebound control quietly halves.',
        'The tune leans on the bump stops as designed spring aid; worn stops turn full-payload compressions harsh.',
      ],
      explode: [-0.22, 0.55, 0.18],
    },
    'arb-rear': {
      name: 'Rear anti-roll bar',
      tagline: 'The smaller of the two bars, and the last suspension part anyone froze.',
      mass: 4,
      specs: [
        ['Bar', '21 mm OD, 3.5 mm wall'],
        ['Rate at link', '14 N/mm'],
        ['Roll stiffness share', '42% rear'],
        ['Links', 'To the lower trailing links'],
      ],
      how: 'Same mechanism as the front bar, torsion generated only by the difference between the two rear wheels, but sized to keep the rear the junior partner: 42 percent of total roll stiffness over the axle carrying 52 percent of the mass. That deficit is deliberate. It leaves the outside rear tire with grip in reserve while the front is already working, which is what makes the car push wide at the limit instead of rotating.\n\nBecause rate scales with diameter to the fourth power, small changes swing the balance hard: 2 mm of bar diameter is a character change the test drivers feel immediately. This is why the rear bar is the traditional last knob of chassis development. This car went through five rear bar rates in final sign-off, chasing the point where the balance stays neutral through a regen-loaded highway sweep, and the bar in the car is the fifth.',
      why: 'A bar adds roll stiffness without touching ride rate or ride height, so it is the one place balance can be trimmed late without re-homologating anything else. Keeping the rear bar small is a safety argument as much as a handling one: every kilogram of roll stiffness moved rearward moves the limit behavior toward oversteer.',
      fail: [
        'Same drop-link and bush wear as the front, arriving later because the loads are smaller.',
        'The coupling penalty is charged here too: one-wheel inputs cross the car, felt as rear-seat rock on broken surfaces.',
      ],
      explode: [-0.45, -0.22, 0],
    },
  },
};

/* ── Geometry ── */

const UP = new THREE.Vector3(0, 1, 0);

/* Solid cylinder between two world points. */
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

/* Rubber bushing, axis along x. */
function bush(p, r = 0.02, h = 0.05) {
  const b = lib.cyl(r, h, M.rubber, 12);
  b.rotation.z = Math.PI / 2;
  b.position.set(...p);
  return b;
}

function balljoint(p, r = 0.02) {
  const s = lib.sphere(r, M.darkSteel, 14);
  s.position.set(...p);
  return s;
}

/* Local stand-in for lib.mirrorZ. THREE's Object3D.copy JSON-serializes
   userData on clone(true), turning explode Vector3s into plain objects,
   which lib.mirrorZ then calls .clone() on and crashes. Rebuild proper
   Vector3s with z negated instead (traverse already visits the root). */
function mirrorZ(group) {
  const c = group.clone(true);
  c.traverse((o) => {
    if (o.userData && o.userData.explode) {
      const e = o.userData.explode;
      o.userData.explode = new THREE.Vector3(e.x, e.y, -e.z);
    }
  });
  c.scale.z *= -1;
  return c;
}

/* A-arm: two legs from inner pivots meeting at a ball joint. */
function aArm(i1, i2, bj) {
  const g = new THREE.Group();
  g.add(rod(i1, bj, 0.015, M.alu), rod(i2, bj, 0.015, M.alu));
  g.add(balljoint(bj, 0.024), bush(i1), bush(i2));
  return g;
}

/* Damper (optionally a coilover) built along Y, then spanned a -> b. */
function damper(a, b, withSpring) {
  const L = new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...b));
  const g = new THREE.Group();
  const body = lib.cyl(0.021, L * 0.58, M.darkSteel, 16);
  body.position.y = -L * 0.2;
  g.add(body);
  const shaft = lib.cyl(0.008, L * 0.55, M.steel, 10);
  shaft.position.y = L * 0.2;
  g.add(shaft);
  if (withSpring) {
    g.add(lib.spring(0.045, 0.30, 7, 0.008, M.steel));
    for (const yy of [-0.16, 0.16]) {
      const seat = lib.cyl(0.052, 0.008, M.darkSteel, 16);
      seat.position.y = yy;
      g.add(seat);
    }
  }
  const top = lib.cyl(0.034, 0.022, M.rubber, 14);
  top.position.y = L / 2 - 0.011;
  g.add(top);
  const eye = lib.torus(0.015, 0.007, M.darkSteel, 14, 8);
  eye.position.y = -L / 2 + 0.007;
  g.add(eye);
  return span(g, a, b);
}

/* Subframe ladder, s = +1 front / -1 rear. Rails start at |x| 1.31 to stay
   clear of the battery end walls at |x| 1.25..1.30. Both wishbone inner
   pivots land on the rails, at |x| 1.36 and 1.70 and |z| 0.45, so the
   crossmembers tie the rails together and carry no pickup: their shape is
   free to give way where something else has to pass.

   The inner crossmember dips through the middle because the drive unit
   stands over it. Measured over the beam's own x band of |x| 1.32 to 1.40:
   the Gen 1 and Gen 2 motor case bottoms out at y 0.251, the Gen 3 case at
   y 0.252, and its oil pipes at y 0.2384, against a full-depth beam whose
   top face was y 0.285. That was 35.9 mm of beam inside the front unit on
   Gen 1 and Gen 2, 30.5 mm on Gen 3, and 24.3 to 41.4 mm inside the rear
   housing, stators and rotor disc. The center section now runs y 0.192 to
   0.232, which clears the lowest of those by 6.4 mm above and battery's
   coolant ports, which reach x 1.37 at y 0.186, by 6.0 mm below. Those
   ports are why it is not lower: a first cut at y 0.185 to 0.225 clipped
   them and put 16 crossings into battery/coolplate. The ends keep full
   depth outboard of |z| 0.32, where nothing stands over them. */
function frame(s, withTowers) {
  const g = new THREE.Group();
  for (const zs of [-1, 1]) {
    const rail = lib.box(0.44, 0.09, 0.09, M.alu);
    rail.position.set(s * 1.53, 0.25, zs * 0.46);
    g.add(rail);
  }
  const cmOuter = lib.box(0.08, 0.07, 1.10, M.alu);
  cmOuter.position.set(s * 1.70, 0.25, 0);
  g.add(cmOuter);
  for (const zs of [-1, 1]) {
    const cmEnd = lib.box(0.08, 0.07, 0.23, M.alu);
    cmEnd.position.set(s * 1.36, 0.25, zs * 0.435);
    g.add(cmEnd);
  }
  const cmMid = lib.box(0.08, 0.04, 0.66, M.alu);
  cmMid.position.set(s * 1.36, 0.212, 0);
  g.add(cmMid);
  for (const zs of [-1, 1]) {
    for (const xm of [1.34, 1.72]) {
      const mt = lib.cyl(0.028, 0.05, M.rubber, 12);
      mt.position.set(s * xm, 0.30, zs * 0.50);
      g.add(mt);
    }
    /* Rear upper-link tower, and it is a portal rather than a plate. The
       rear halfshaft runs through this station on the axle line: measured,
       its tube occupies x -1.472 to -1.428 and y 0.333 to 0.377 where it
       crosses z 0.455 to 0.505, and the old solid plate spanned x -1.60 to
       -1.34 and y 0.30 to 0.50, so the shaft went straight through it with
       no aperture at all. That is the deepest pair on the whole ladder,
       150.64 mm over 128 crossings on Gen 1 and Gen 2. The header now
       starts at y 0.43, 53 mm above the shaft, and the two legs stand
       either side of it with 33 mm and 73 mm of clearance in x. Both
       upper-link pivots at y 0.50 and |z| 0.47 are unmoved, and the new
       solid is a strict subset of the old one, so nothing else can have
       been pushed into. */
    if (withTowers) {
      const hdr = lib.box(0.26, 0.07, 0.05, M.alu);
      hdr.position.set(s * 1.47, 0.465, zs * 0.48);
      g.add(hdr);
      for (const xl of [1.3675, 1.5725]) {
        const leg = lib.box(0.055, 0.13, 0.05, M.alu);
        leg.position.set(s * xl, 0.365, zs * 0.48);
        g.add(leg);
      }
    }
  }
  return g;
}

/* Annulus extruded along z, centered on its own origin: a bore drawn as a
   bore rather than implied by a solid cylinder. */
function ringZ(rOut, rIn, depth, mat, seg = 24) {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOut, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, rIn, 0, Math.PI * 2, true);
  s.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: seg });
  geo.translate(0, 0, -depth / 2);
  return lib.mesh(geo, mat);
}

/* Upright + hub bearing shared by front and rear knuckles.

   The halfshaft comes through this part, so the hub carries a real bore.
   Measured, the outer CV joint is a 36 mm-radius cylinder on the axle line
   running |z| 0.7075 to 0.7625; the upright was a solid 85 x 360 x 32 mm
   web running straight through y 0.355, with a solid 54 mm boss and a solid
   32 mm face concentric with the shaft on top of it. The shaft was
   therefore 16.50 mm inside the knuckle over 368 crossing triangle pairs on
   every rung from Gen 1 to Gen 8, which is a missing bore rather than a
   misplaced part. The web is now two struts landing on the boss above and
   below, the boss is a 44 to 54 mm carrier bore and the bearing is a 38 to
   44 mm race inside it, leaving 2 mm of radial clearance on the joint.
   Every new solid is inside the old one, so nothing else moved, and no
   depth anywhere on the ladder changed. What did change is crossing
   COUNTS on pairs this part was already failing: two extruded annuli
   carry more triangles than the two solid cylinders they replace, so
   suspension/knuckles x wheels/discs reads 902 crossings against 498 at
   the same 16.77 mm. Segment counts are held at 16 and 12 to keep that
   inflation to roughly 80 percent rather than 140. */
function upright(x) {
  const g = new THREE.Group();
  for (const [yc, h] of [[0.490, 0.18], [0.265, 0.09]]) {
    const web = lib.box(0.085, h, 0.032, M.castAlu);
    web.position.set(x, yc, 0.74);
    g.add(web);
  }
  const boss = ringZ(0.054, 0.044, 0.036, M.castAlu, 16);
  boss.position.set(x, P.wheelY, 0.74);
  g.add(boss);
  const race = ringZ(0.044, 0.038, 0.036, M.steel, 12);
  race.position.set(x, P.wheelY, 0.74);
  g.add(race);
  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* front subframe */
  const fsub = lib.part('front-subframe', [0.15, -0.45, 0]);
  fsub.add(frame(1, false));
  sys.add(fsub);

  /* front wishbones, passenger side then mirror */
  const wish = lib.part('wishbones', [0.1, 0, 0.5]);
  wish.add(aArm([1.36, 0.25, 0.45], [1.70, 0.25, 0.45], [1.45, 0.235, 0.71]));
  wish.add(aArm([1.33, 0.55, 0.38], [1.65, 0.55, 0.38], [1.45, 0.565, 0.70]));
  sys.add(wish, mirrorZ(wish));

  /* front knuckle: upright + hub boss + steering arm */
  /* The steering arm and its tie rod cross the front brake disc, and they
     stay where they are: see the steering panel's open-defect note for the
     four surfaces that close every alternative position. */
  const kn = lib.part('knuckles', [0.15, 0.05, 0.62]);
  kn.add(upright(P.axleF));
  kn.add(rod([1.44, 0.30, 0.735], [1.375, 0.305, 0.705], 0.011, M.castAlu));
  sys.add(kn, mirrorZ(kn));

  /* front coilover: lower arm up to the tower mount at y 0.72 */
  const co = lib.part('coilovers', [0, 0.6, 0.15]);
  co.add(damper([1.47, 0.255, 0.60], [1.50, 0.72, 0.48], true));
  const towerPlate = lib.cyl(0.048, 0.014, M.alu, 16);
  towerPlate.position.set(1.50, 0.735, 0.48);
  co.add(towerPlate);
  sys.add(co, mirrorZ(co));

  /* steering: rack + belt actuator + tie rods + by-wire column stub.
     Rack centerline at y 0.36: the ball nut (r 0.046) is the deepest piece
     and must clear the battery lid, whose top face is y 0.31. */
  const st = lib.part('steering', [0.55, 0.12, 0]);
  const RY = 0.36;
  const rack = lib.cyl(0.02, 1.10, M.steel, 14);
  rack.rotation.x = Math.PI / 2;
  rack.position.set(1.22, RY, 0);
  st.add(rack);
  const housing = lib.cyl(0.03, 0.62, M.castAlu, 16);
  housing.rotation.x = Math.PI / 2;
  housing.position.set(1.22, RY, -0.05);
  st.add(housing);
  const nut = lib.cyl(0.046, 0.09, M.castAlu, 18);
  nut.rotation.x = Math.PI / 2;
  nut.position.set(1.22, RY, -0.38);
  st.add(nut);
  const motor = lib.cyl(0.037, 0.14, M.darkSteel, 18);
  motor.rotation.x = Math.PI / 2;
  motor.position.set(1.30, RY, -0.44);
  st.add(motor);
  const beltCover = lib.box(0.12, 0.055, 0.03, M.plastic);
  beltCover.position.set(1.26, RY, -0.415);
  st.add(beltCover);
  for (const zs of [-1, 1]) {
    const boot = lib.cyl(0.026, 0.10, M.rubber, 12);
    boot.rotation.x = Math.PI / 2;
    boot.position.set(1.22, RY, zs * 0.44);
    st.add(boot);
    st.add(rod([1.22, RY, zs * 0.545], [1.375, 0.305, zs * 0.705], 0.010, M.steel));
    st.add(balljoint([1.22, RY, zs * 0.545], 0.015));
    st.add(balljoint([1.375, 0.305, zs * 0.705], 0.014));
  }
  /* by-wire: the column stub descends to a sensor box, nothing continues */
  const sensorBox = lib.box(0.11, 0.09, 0.09, M.sensor);
  sensorBox.position.set(0.92, 0.55, -0.35);
  st.add(sensorBox);
  st.add(rod([0.90, 0.59, -0.35], [0.66, 0.80, -0.35], 0.014, M.steel));
  const colBoss = lib.sphere(0.024, M.plastic, 14);
  colBoss.position.set(0.90, 0.59, -0.35);
  st.add(colBoss);
  sys.add(st);

  /* front anti-roll bar on top of the front crossmember, drop links down
     to the lower wishbones */
  const arbF = lib.part('arb-front', [0.45, -0.22, 0]);
  arbF.add(lib.tube([
    [1.56, 0.33, 0.60], [1.63, 0.315, 0.50], [1.70, 0.305, 0.34],
    [1.70, 0.305, -0.34], [1.63, 0.315, -0.50], [1.56, 0.33, -0.60],
  ], 0.011, M.steel));
  for (const zs of [-1, 1]) {
    arbF.add(rod([1.56, 0.33, zs * 0.60], [1.54, 0.245, zs * 0.62], 0.006, M.darkSteel));
    const blk = lib.box(0.035, 0.03, 0.045, M.rubber);
    blk.position.set(1.70, 0.297, zs * 0.28);
    arbF.add(blk);
  }
  sys.add(arbF);

  /* rear subframe with upper-link towers */
  const rsub = lib.part('rear-subframe', [-0.15, -0.45, 0]);
  rsub.add(frame(-1, true));
  sys.add(rsub);

  /* five-link rear, passenger side: knuckle + five rods */
  const rl = lib.part('rear-links', [-0.1, 0, 0.55]);
  rl.add(upright(P.axleR));
  const links = [
    [[-1.36, 0.50, 0.47], [-1.41, 0.545, 0.70], 0.012],  /* upper front */
    [[-1.58, 0.50, 0.47], [-1.49, 0.545, 0.70], 0.012],  /* upper rear */
    [[-1.34, 0.30, 0.46], [-1.39, 0.31, 0.705], 0.012],  /* toe link */
    [[-1.44, 0.235, 0.44], [-1.45, 0.225, 0.70], 0.016], /* spring link */
    [[-1.64, 0.25, 0.44], [-1.53, 0.26, 0.70], 0.012],   /* lower trailing */
  ];
  for (const [inner, outer, r] of links) {
    rl.add(rod(inner, outer, r, M.steel));
    rl.add(bush(inner, 0.018, 0.04));
    rl.add(balljoint(outer, 0.017));
  }
  sys.add(rl, mirrorZ(rl));

  /* rear spring on the spring-link perch */
  const rs = lib.part('rear-springs', [0.05, 0.62, 0.08]);
  const perch = lib.cyl(0.058, 0.01, M.steel, 16);
  perch.position.set(-1.446, 0.235, 0.60);
  rs.add(perch);
  const coil = lib.spring(0.05, 0.22, 6, 0.009, M.steel);
  coil.position.set(-1.447, 0.355, 0.60);
  rs.add(coil);
  const seatTop = lib.cyl(0.054, 0.012, M.rubber, 16);
  seatTop.position.set(-1.448, 0.472, 0.60);
  rs.add(seatTop);
  sys.add(rs, mirrorZ(rs));

  /* rear damper, leaning 12 degrees from the lower trailing link up to the
     body-side tower mount (matches the inclination spec row) */
  const rd = lib.part('rear-dampers', [-0.22, 0.55, 0.18]);
  rd.add(damper([-1.555, 0.26, 0.64], [-1.575, 0.67, 0.56], false));
  const rdPlate = lib.cyl(0.042, 0.012, M.alu, 16);
  rdPlate.position.set(-1.575, 0.684, 0.56);
  rd.add(rdPlate);
  sys.add(rd, mirrorZ(rd));

  /* rear anti-roll bar on the rear crossmember */
  const arbR = lib.part('arb-rear', [-0.45, -0.22, 0]);
  arbR.add(lib.tube([
    [-1.56, 0.33, 0.58], [-1.63, 0.315, 0.48], [-1.70, 0.305, 0.34],
    [-1.70, 0.305, -0.34], [-1.63, 0.315, -0.48], [-1.56, 0.33, -0.58],
  ], 0.011, M.steel));
  for (const zs of [-1, 1]) {
    arbR.add(rod([-1.56, 0.33, zs * 0.58], [-1.575, 0.26, zs * 0.60], 0.006, M.darkSteel));
    const blk = lib.box(0.035, 0.03, 0.045, M.rubber);
    blk.position.set(-1.70, 0.297, zs * 0.28);
    arbR.add(blk);
  }
  sys.add(arbR);

  return sys;
}
