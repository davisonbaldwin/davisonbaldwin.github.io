/* Interior and controls: the seven systems the occupants actually touch.
   Single-screen HMI, steer-by-wire yoke, by-wire pedals, and seats bolted
   straight onto the battery crossmembers. Nothing in here is shell: the
   cabin stays visible in x-ray, which is the point of x-ray. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'interior',
  name: 'Interior and controls',
  color: 0xd9c08a,
  explode: [0, 1.05, 0],
  blurb: 'About 185 kg of cabin: everything the occupants see and touch. The flat battery floor underneath sets every dimension in here.',
  parts: {
    dashboard: {
      name: 'Dashboard',
      tagline: 'One calm surface over a magnesium beam that carries everything else.',
      mass: 48,
      specs: [
        ['Substrate', 'Long-glass PP, 2.4 mm'],
        ['Crossbeam', 'Cast magnesium, 6.4 kg'],
        ['Top pad', 'TPO skin over 9 mm PU foam'],
        ['Vent', 'Full-width 8 mm slot, motorized vanes'],
        ['Airbags', 'Passenger 90 L + knee, invisible seams'],
      ],
      how: 'The part you see is trim. The part that matters is the cast magnesium crossbeam behind it, running door to door and bolted to both A-pillar bases. It carries the displays, the passenger airbag, the HVAC distribution box, and the steer-by-wire feedback loads, and its first bending mode is held above 38 Hz so the screen does not shimmer on coarse surfaces. Magnesium costs more than steel per part but saves 5 kg high and forward, exactly where mass hurts most.\n\nThe visible slab is three pieces: a padded knee roll low enough to be the first contact in a submarining crash, the main molding, and a soft top pad. Air arrives through one full-width 8 mm slot under the top pad edge; motorized vanes upstream steer the jet using the Coanda effect, so the cabin is swept by a wide slow sheet of air rather than four cold jets. The slot is sized against the glass roof above it: even with an infrared-reflective silver coating rejecting about two thirds of solar energy, a parked summer cabin still starts 30 °C above ambient.',
      why: 'Cabin comfort is a range problem wearing trim. Every watt of summer cooling and winter heating comes out of the pack, and the heat pump can only be as small as the worst-case cabin load, so the coated roof glass and the sheet-flow vent are battery decisions as much as comfort ones. Decluttering the surface, one slot, one screen, no switch banks, is what the buttonless cabin actually buys physically: fewer cutlines, fewer rattles, one tool per market instead of a dozen.',
      fail: [
        'Squeak and rattle from clip stack-up across the -30 to +85 °C soak range is the top interior warranty item industry-wide; the one-piece main molding exists to cut the cutline count.',
        'The TPO skin chalks and gains gloss under a decade of UV through the glass roof; the coating slows this, it does not stop it.',
        'A failed vane actuator freezes the air sheet in one direction, and reaching it means pulling the whole top pad.',
      ],
      explode: [0.55, 0.35, 0],
    },
    displays: {
      name: 'Displays',
      tagline: 'One 14-inch panel where sixty switches used to be, and a strip that never leaves the sight line.',
      mass: 8,
      specs: [
        ['Center display', '14 in, 2400 x 1500, bonded'],
        ['Cluster strip', '12 in ultrawide, 1920 x 320'],
        ['Brightness', '1000 cd/m2, matte etch'],
        ['Compute', 'One SoC renders both panels'],
        ['Tell-tales', 'Isolated ASIL-B display core'],
      ],
      how: 'The center panel is optically bonded, glass laminated to pixels with no air gap, which is most of the difference between readable and washed out in sunlight, and it is yawed 10 degrees toward the driver. One automotive SoC renders both panels. The safety-relevant symbols, speed, tell-tales, warnings, do not trust it: an isolated ASIL-B core composites them onto the cluster strip through a hardware overlay, with a watchdog that can repaint speed within 500 ms of a main-OS crash.\n\nThe cluster strip sits on the dash top directly in the driver’s sight line, about 10 degrees below the horizon, and its layout never changes: speed, limit, drive state, range, always in the same places. Everything glanceable lives on the strip; everything that needs a decision lives on the center panel; everything that must work blind, wipers, turn signals, horn, lamps, stays on stalks and the yoke.',
      why: 'The honest case for one screen is cost and cadence: a switch bank is dozens of parts tooled per market and frozen at launch, while a screen is one part updated over the air for a decade. The honest case against is also real: touch demands eyes, a climate knob is faster and blind-operable, and Euro NCAP’s 2026 protocol penalizes exactly this by requiring physical access to core functions. The split here, fixed strip, stalks for reflexes, screen for decisions, is a compromise position, and it is a compromise, not a solved problem.',
      fail: [
        'Low sun directly behind the driver still washes out the matte etch; there is no software fix for geometry.',
        'An SoC failure drops both panels; the ASIL-B island keeps speed and warnings alive on the strip and the car stays drivable.',
        'Menu depth creeps with every software release; each relocated function is a small safety regression that never shows up in a crash test.',
      ],
      explode: [0.6, 0.6, 0],
    },
    yoke: {
      name: 'Steering yoke',
      tagline: 'A flat-bottom rim wired, not shafted, to the front axle.',
      mass: 9,
      specs: [
        ['Rim', 'Flat-bottom, 360 mm across'],
        ['Column', '200 mm stub, no shaft below'],
        ['Sensors', 'Duplex 14-bit angle + torque'],
        ['Feedback motor', '8 Nm peak, belt drive'],
        ['Ratio', 'Variable, 1.7 turns lock to lock'],
      ],
      how: 'The column is a 200 mm stub that ends at a duplex sensor pack, and that is the entire mechanical system: no intermediate shaft, no universal joints, nothing through the firewall. Rim angle and rim torque are each measured twice by independent sensors on independent power and communication paths, and the front rack actuator follows the command. The ratio is synthetic: about 1.7 turns lock to lock in a parking lot, much slower around center at highway speed, which is the only reason a cut-down rim is usable at all.\n\nFeel is synthesized by the belt-driven motor on the same stub. It renders an estimate of rack load, tire self-aligning torque reconstructed from rack current and a vehicle model, plus programmed end stops. Remove its torque and the rim spins weightlessly; everything a driver calls steering feel is this motor’s output.',
      why: 'The yoke argument, stated honestly: a cut top rim clears the cluster sight line and the knee path, and steer-by-wire makes the packaging and left-right drive conversion trivial. Against it, full yokes shipped by others punished hand-over-hand steering wherever the variable ratio did not rescue it, and retrained a reflex a century old. This car keeps a round top and flattens only the bottom: the sight line benefit survives, and a hand thrown at the rim in a slide always finds rim.',
      fail: [
        'There is no mechanical fallback, so the electrical system must clear aviation-grade numbers: dual sensors, dual ECUs, dual power feeds, target failure rate below 10^-9 per hour.',
        'Sensor disagreement drops the system to a fixed ratio with reduced assist, a limp mode the driver feels immediately.',
        'A dead feedback motor leaves steering fully functional and completely numb; drivable, and deeply unpleasant.',
      ],
      explode: [0.45, 0.15, 0],
    },
    'front-seats': {
      name: 'Front seats',
      tagline: 'The heaviest thing in the cabin, because a seat is a restraint device first.',
      mass: 64,
      count: 2,
      specs: [
        ['Structure', 'Stamped steel + Mg cushion pan'],
        ['Adjustment', '8-way, three 25 W motors'],
        ['Restraints', 'Pretensioner loads into seat frame'],
        ['Heating', '90 W cushion + backrest mats'],
        ['Mass', '32 kg per seat'],
      ],
      how: 'In a 30 g frontal pulse the seat must hold its occupant while the pretensioned belt feeds about 4 kN into the frame, the recliner gear must not back-drive under torso load, and the tracks must not release. That load case, not comfort, sets the gauge of every stamped member, and it is why the seats bolt straight onto the battery pack crossmembers: the crash path runs occupant, frame, track, pack structure, with no soft floor in between.\n\nThe 32 kg audit: 12 kg of frame and recliners, 7 kg of foam and trim, 6 kg of tracks and three motors, 4 kg of cushion pan and mounts, and 3 kg of heater mats, side-airbag module, and electronics. The tan piping is the only part with no engineering excuse.',
      why: 'Seats resisted the diet the rest of the car went on because their mass scales with occupants and crash loads, not with vehicle mass. A 24 kg thin-shell seat exists and was considered; it gives back adjustment range and long-haul comfort, and on a car bought for range and road trips that trade fails. Heaviest interior system, and correctly so.',
      fail: [
        'Track wear reads as fore-aft rock under braking and is routinely misdiagnosed as a chassis fault.',
        'Cushion foam loses around 15% height by 100,000 entry cycles, quietly lowering the H-point and the belt geometry with it.',
        'Heater mats fail at the flex line of the cushion, the single most-flexed wire in the car.',
      ],
      explode: [0, 0.4, -0.28],
    },
    'rear-bench': {
      name: 'Rear bench',
      tagline: 'Three real seats on a floor with nothing under it.',
      mass: 36,
      specs: [
        ['Fold', '60/40 split, flat load floor'],
        ['ISOFIX', 'Two positions + top tethers'],
        ['Cushion depth', '480 mm, dual-density PU'],
        ['Middle seat', 'Flat footwell, full three-point belt'],
      ],
      how: 'Two molded foam elements on a steel pan, bolted to the rear pack crossmembers, with belts anchored to the body so a folded seat never carries restraint loads. The 60/40 backrest latches into the package shelf structure and folds onto the cushion for a flat load floor.\n\nThe cushion is not a slab, and the reason is autonomy\'s computer. Its case occupies x -0.765 to -0.360 at y 0.377 to 0.463 with the GNSS pod just forward of the lip, which is inside the seat rather than under it: measured off both built meshes that was 170 crossing triangle pairs at 65.00 mm and 32 more at 6.00. There is 57 mm of clear air between the case and the pack lid, so the computer would happily sit lower, but the pan runs across that station and moving it is an autonomy edit paired with a bench edit rather than either one alone. The foam is therefore molded around the box with 8 mm of nominal gap at the sides and aft face and 13 mm over the lid, which is how every under-seat module in a real car is packaged. What it costs is stated rather than hidden: 34 mm of foam over the computer against 130 mm everywhere else, so the front third of the cushion is firm and the occupant can feel where the box is.\n\nThe flat floor is the skateboard dividend paid out in full: no transmission tunnel, no exhaust path, so the middle passenger gets a flat footwell and the same 480 mm cushion depth as the outboard seats instead of a perch. The honest tax: the pack raises the floor about 130 mm over a sedan, and at a fixed roofline that compresses heel-to-hip height, so tall adults ride slightly knees-up. The skateboard moved the compromise, it did not delete it.',
      why: 'Bench comfort is decided by the platform, not the upholstery. The decision that made this seat work was made in the battery layout: keeping cells out of a tunnel and the floor dead flat is worth more to the middle occupant than any amount of foam tuning.',
      fail: [
        'The middle belt’s upper anchor geometry is marginal for small statures; a booster cushion corrects it and almost nobody fits one there.',
        'ISOFIX bars invite over-torqued bases; the surrounding foam is sacrificial by design.',
        'Fold latches wear into rattle sources at exactly the frequency coarse chip roads excite.',
      ],
      explode: [-0.25, 0.45, 0],
    },
    console: {
      name: 'Center console',
      tagline: 'Furniture, not structure: nothing underneath it needs a tunnel.',
      mass: 15,
      specs: [
        ['Storage', '11 L bin under the armrest'],
        ['Cupholders', 'Two, 70 mm, damped liners'],
        ['Charging', 'Two 15 W inductive pads'],
        ['Armrest', 'Sliding pad, 60 mm travel'],
      ],
      how: 'There is no mechanical reason for this part to exist. With no gearbox and no driveshaft the floor between the seats is empty, so the console is pure furniture: a plastic tub bolted to the flat floor, hiding the low-voltage harness spine and the air duct feeding the rear footwells, and carrying an 11 liter bin, two damped cupholders, and two inductive charging pads.\n\nThe pads are thermally limited, not electrically: 15 W into a phone in a sun-soaked cabin will cook it, so a coil temperature cap derates charging above 60 °C, which is why summer wireless charging feels slow. The armrest slides 60 mm to put the elbow behind the wrist on the screen, an ergonomic detail used hundreds of times a day.',
      why: 'A walk-through cabin was on the table, and some rivals ship one. The armrest won: elbow support at the right height scores higher in long-drive comfort clinics than openness scores in anything measurable. Choosing the console is choosing what the flat floor is spent on, and this car spends it on posture, not theater.',
      fail: [
        'The spill drains under the cupholders clog with years of crumbs and sugar; once blocked, the next 250 ml coffee reaches the inductive electronics the drains were validated to protect.',
        'Steel phone cases and stray coins trip the foreign-object detection and charging stops silently.',
        'The armrest slide is the highest-cycle moving part in the cabin and wears into lateral play before anything else in the console.',
      ],
      explode: [0.15, 0.6, 0],
    },
    pedals: {
      name: 'Pedals',
      tagline: 'The brake pedal is an input device; its feel is a product decision.',
      mass: 4,
      specs: [
        ['Brake', 'By-wire, decoupled simulator'],
        ['Simulator', 'Coil spring + elastomer, two stage'],
        ['Travel', '55 mm, about 70 N at 1.0 g'],
        ['Fallback', 'Hydraulic push-through circuit'],
        ['Accelerator', 'Dual-track Hall sensor, organ style'],
      ],
      how: 'The brake pedal does not push fluid in normal driving; it pushes a simulator. A plunger loads a coil spring first, then an elastomer stack, giving a two-stage curve: 12 N of breakaway so a resting foot does not brake, a linear region for modulation, then a sharply rising rate so 1.0 g arrives at about 70 N and 55 mm. That curve was tuned in blind clinics, because it is the only thing the driver ever feels.\n\nDecoupling is what makes consistency possible: the controller blends regeneration, up to about 0.3 g from the motors alone, with friction braking, and the handover is imperceptible because pedal force no longer comes from the hydraulics doing the work. More than nine in ten daily braking events end without a pad touching a disc. On total electrical failure the pedal bottoms through to a direct hydraulic push-through circuit on the front axle: roughly triple the effort, longer travel, legal-minimum deceleration.',
      why: 'A hydraulic pedal’s feel drifts with pad temperature, fluid age, and regen state; a simulator’s feel is identical on the first stop of a winter morning and the tenth stop down a mountain pass. Once braking is blended electronics anyway, synthesizing the feel honestly is more truthful to the driver than coupling the pedal to plumbing whose behavior changes underneath it.',
      fail: [
        'The simulator always feels the same, so it cannot telegraph fade or a failing circuit through the sole; that information moves to the display and a chime, an honest demotion.',
        'Push-through fallback shocks drivers who have never felt it: triple effort reads as failure even while meeting the legal stop.',
        'Disagreement between the accelerator’s two Hall tracks zeroes the torque request immediately; the car coasts, brakes unaffected.',
      ],
      explode: [0.35, -0.18, 0],
    },
  },
};

/* ── Geometry ──
   lib.plate spans y [pos.y + t/2, pos.y + 3t/2]; positions below account
   for that. Driver sits at z -0.38. */

export function build() {
  const sys = new THREE.Group();

  /* dashboard: knee roll + main slab + top pad, spanning the cabin width */
  const dash = lib.part('dashboard', [0.55, 0.35, 0]);
  const dashMain = lib.plate(0.30, 1.70, 0.12, 0.06, M.plastic);
  dashMain.position.set(1.12, 0.64, 0);            /* y 0.70..0.82 */
  dash.add(dashMain);
  const kneeRoll = lib.plate(0.16, 1.62, 0.06, 0.03, M.tan);
  kneeRoll.position.set(1.03, 0.61, 0);            /* y 0.64..0.70 */
  dash.add(kneeRoll);
  const topPad = lib.plate(0.24, 1.64, 0.04, 0.05, M.plastic);
  topPad.position.set(1.14, 0.80, 0);              /* y 0.82..0.86 */
  dash.add(topPad);
  const ventSlot = lib.box(0.02, 0.014, 1.52, M.sensor);
  ventSlot.position.set(0.965, 0.815, 0);
  dash.add(ventSlot);
  const trimBlade = lib.box(0.015, 0.03, 1.62, M.tan);
  trimBlade.position.set(0.965, 0.71, 0);
  dash.add(trimBlade);
  sys.add(dash);

  /* displays: center landscape panel yawed at the driver + cluster strip */
  const displays = lib.part('displays', [0.6, 0.6, 0]);
  const center = new THREE.Group();
  const centerBezel = lib.box(0.022, 0.20, 0.31, M.plastic);
  const centerFace = lib.box(0.006, 0.19, 0.30, M.sensor);
  centerFace.position.x = -0.013;
  center.add(centerBezel, centerFace);
  center.position.set(0.98, 0.78, 0);
  center.rotation.set(0, -0.17, -0.12);            /* yaw at driver + rake */
  displays.add(center);
  const centerMount = lib.box(0.06, 0.05, 0.10, M.plastic);
  centerMount.position.set(1.0, 0.72, 0);
  displays.add(centerMount);
  const cluster = new THREE.Group();
  const clusterBezel = lib.box(0.018, 0.06, 0.31, M.plastic);
  const clusterFace = lib.box(0.006, 0.05, 0.30, M.sensor);
  clusterFace.position.x = -0.011;
  cluster.add(clusterBezel, clusterFace);
  cluster.position.set(1.02, 0.87, -0.38);
  cluster.rotation.z = -0.3;                       /* raked back */
  displays.add(cluster);
  sys.add(displays);

  /* yoke: flat-bottom rim (two torus arcs), hub, stub column, SbW sensor.
     Built facing +Z, yawed to face the driver, then raked back 20 deg. */
  const yoke = lib.part('yoke', [0.45, 0.15, 0]);
  const tilt = new THREE.Group();
  const wheel = new THREE.Group();
  const rimTop = lib.mesh(new THREE.TorusGeometry(0.185, 0.017, 10, 40, 4.189), M.rubber);
  rimTop.geometry.rotateZ(-0.524);                 /* 240 deg arc, gap at the bottom */
  wheel.add(rimTop);
  const rimBottom = lib.mesh(new THREE.TorusGeometry(0.42, 0.017, 10, 24, 0.781), M.rubber);
  rimBottom.geometry.rotateZ(-1.962);              /* shallow arc closing the gap */
  rimBottom.geometry.translate(0, 0.296, 0);
  wheel.add(rimBottom);
  const hub = lib.cyl(0.055, 0.05, M.plastic, 20);
  hub.rotation.x = Math.PI / 2;
  wheel.add(hub);
  const crossSpoke = lib.box(0.34, 0.045, 0.026, M.plastic);
  wheel.add(crossSpoke);
  const lowerSpoke = lib.box(0.04, 0.12, 0.024, M.plastic);
  lowerSpoke.position.y = -0.075;
  wheel.add(lowerSpoke);
  const column = lib.cyl(0.028, 0.20, M.darkSteel, 14);
  column.rotation.x = Math.PI / 2;
  column.position.z = -0.125;
  wheel.add(column);
  const sbwSensor = lib.box(0.085, 0.075, 0.06, M.sensor);
  sbwSensor.position.z = -0.25;                    /* column ends at the sensor */
  wheel.add(sbwSensor);
  wheel.rotation.y = -Math.PI / 2;
  tilt.add(wheel);
  tilt.rotation.z = -0.35;
  tilt.position.set(0.84, 0.73, -0.38);            /* column enters dash near (1.05, 0.65) */
  yoke.add(tilt);
  sys.add(yoke);

  /* front seats: built once per side rather than via lib.mirrorZ, whose
     clone path loses the Vector3 type on userData.explode. All meshes are
     z-symmetric, so re-positioning per side is exact. s = -1 driver side. */
  for (const s of [-1, 1]) {
    const zc = 0.38 * s;
    const seat = lib.part('front-seats', [0, 0.4, 0.28 * s]);
    const seatBase = lib.box(0.46, 0.07, 0.44, M.darkSteel);
    seatBase.position.set(0.35, P.floor + 0.035, zc);
    seat.add(seatBase);
    const cushion = lib.box(0.50, 0.13, 0.50, M.fabric);
    cushion.position.set(0.35, 0.50, zc);
    seat.add(cushion);
    const cushionPipe = lib.box(0.52, 0.03, 0.52, M.tan);
    cushionPipe.position.set(0.35, 0.545, zc);
    seat.add(cushionPipe);
    const backrest = lib.box(0.13, 0.62, 0.48, M.fabric);
    backrest.rotation.z = 0.26;                    /* reclined ~15 deg */
    backrest.position.set(0.052, 0.81, zc);
    seat.add(backrest);
    const backPipe = lib.box(0.135, 0.05, 0.49, M.tan);
    backPipe.rotation.z = 0.26;
    backPipe.position.set(0.005, 0.984, zc);
    seat.add(backPipe);
    const headrest = lib.box(0.10, 0.13, 0.24, M.fabric);
    headrest.rotation.z = 0.26;
    headrest.position.set(-0.062, 1.2, zc);
    seat.add(headrest);
    for (const zo of [-0.06, 0.06]) {
      const post = lib.cyl(0.008, 0.1, M.steel, 8);
      post.rotation.z = 0.26;
      post.position.set(-0.043, 1.125, zc + zo);
      seat.add(post);
    }
    sys.add(seat);
  }

  /* rear bench: full-width cushion, backrest against the package shelf */
  const bench = lib.part('rear-bench', [-0.25, 0.45, 0]);
  /* THE BENCH IS 180 MM NARROWER AND ITS HEADRESTS 78 MM LOWER THAN THEY
     WERE, and both numbers come from the roof rather than from a package
     drawing. Ray-swept over this station, the ceiling is body/roof-glass at
     y 1.1609 and body-aero/canopy at 1.1594, both flat across |z| 0.6, while
     body-3 and body-4's canopy runs 1.2476 at z 0 and 1.2134 at |z| 0.5. The
     headrest cores topped out at 1.2106, so they were 50 mm through the Gen 1
     and Gen 2 glass and clipped the Gen 3 and Gen 4 canopy as well: 64.04 mm
     over 36 crossing triangle pairs on Gen 1, 68.82 over 48 on Gen 2 and
     154.94 over 41 on Gen 4, which is the deepest single pair on the ladder.
     The 154.94 is a straddle depth on a 90 mm box and the real intrusion is
     the 46 mm the core stood above the glass; the fix is sized from the
     glass. The cushion loses 180 mm of span for a second reason, which is the
     side glass rather than the roof: body-4's canopy descends to y 1.013 at
     |z| 0.70 over this station, so a 1.52 m bench put its backrest corners
     outside the greenhouse, and body-3's skin closes to |z| 0.76 by x -1.10. */
  /* THE CUSHION IS MOLDED AROUND THE COMPUTE INSTEAD OF THROUGH IT, and the
     same relief carries on interior-4 against the bigger Gen 4 plate.
     autonomy's compute case is built at x -0.765 to -0.360, y 0.377 to 0.463,
     |z| 0.183, and its GNSS and IMU pod sits just forward of the cushion lip
     at x -0.470 to -0.430, y 0.456 to 0.468. One solid 130 mm foam block over
     that station swallowed both: 170 crossing triangle pairs at a straddle
     depth of 65.00 mm on the case and 32 at 6.00 mm on the pod, on gen1, gen2
     and gen3 alike.

     The computer is not the side that can move. Measured surface to surface,
     the gap under the case to the pack lid is 57.00 mm on battery, 68.00 on
     battery-2 and 75.00 on battery-3, all of it clear air, so the case would
     drop onto the lid; what it cannot do is drop through this bench, and on
     gen4 the pan that would need the aperture is this module's descendant
     rather than autonomy's. That pairing is written up rather than half done.

     So the foam is relieved and nothing else moves: a pocket open at the
     cushion's front face, walls 8.0 mm off the case on both sides and 8.0 mm
     off its aft end, roof 13.0 mm over the case and 8.0 mm over the pod. Only
     the center band is cut, because every face of the outboard bolsters is a
     face some other module is measured against. 34 mm of foam is left over
     the pocket where the rest of the cushion carries 130, and that thin
     section is the honest cost of a computer inside a seat. */
  const CUSH = { x0: -0.995, x1: -0.445, y0: 0.380, y1: 0.510, z: 0.670 };
  const POCK = { x0: -0.773, y1: 0.476, z: 0.191 };   /* open at CUSH.x1 */
  const cushionPiece = (x0, x1, y0, y1, z0, z1) => {
    const b = lib.box(x1 - x0, y1 - y0, z1 - z0, M.fabric);
    b.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    bench.add(b);
  };
  cushionPiece(CUSH.x0, CUSH.x1, CUSH.y0, CUSH.y1, -CUSH.z, -POCK.z);
  cushionPiece(CUSH.x0, CUSH.x1, CUSH.y0, CUSH.y1, POCK.z, CUSH.z);
  cushionPiece(CUSH.x0, POCK.x0, CUSH.y0, CUSH.y1, -POCK.z, POCK.z);
  cushionPiece(POCK.x0, CUSH.x1, POCK.y1, CUSH.y1, -POCK.z, POCK.z);
  const benchPipe = lib.box(0.57, 0.03, 1.36, M.tan);
  benchPipe.position.set(-0.72, 0.49, 0);
  bench.add(benchPipe);
  const benchBack = lib.box(0.13, 0.64, 1.34, M.fabric);
  benchBack.rotation.z = 0.3;
  benchBack.position.set(-1.082, 0.766, 0);
  bench.add(benchBack);
  const benchBand = lib.box(0.135, 0.05, 1.35, M.tan);
  benchBand.rotation.z = 0.3;
  benchBand.position.set(-1.127, 0.914, 0);
  bench.add(benchBand);
  for (const zo of [-0.4, 0.4]) {
    const hr = lib.box(0.09, 0.12, 0.26, M.fabric);
    hr.rotation.z = 0.3;
    hr.position.set(-1.2, 1.062, zo);
    bench.add(hr);
  }
  sys.add(bench);

  /* console: tub + armrest pad + cupholders, between the front seats */
  const consoleP = lib.part('console', [0.15, 0.6, 0]);
  const consoleBody = lib.box(0.62, 0.18, 0.24, M.plastic);
  consoleBody.position.set(0.61, 0.53, 0);         /* x 0.30..0.92, y 0.44..0.62 */
  consoleP.add(consoleBody);
  const armrest = lib.box(0.28, 0.05, 0.22, M.tan);
  armrest.position.set(0.46, 0.645, 0);
  consoleP.add(armrest);
  for (const zo of [-0.058, 0.058]) {
    const cup = lib.cyl(0.042, 0.03, M.plasticLt, 18);
    cup.position.set(0.66, 0.63, zo);   /* aft of thermal's HVAC case at x 0.71 */
    consoleP.add(cup);
  }
  sys.add(consoleP);

  /* pedals: brake plate + arm + simulator block, organ accelerator.
     Every face kept at |z| >= 0.3575 to stay clear of the front drive
     unit zone, which ends at z -0.35. */
  const pedals = lib.part('pedals', [0.35, -0.18, 0]);
  const brakePlate = lib.box(0.016, 0.09, 0.09, M.rubber);
  brakePlate.rotation.z = -0.4;
  brakePlate.position.set(1.26, 0.46, -0.46);
  pedals.add(brakePlate);
  const brakeArm = lib.cyl(0.009, 0.15, M.steel, 10);
  brakeArm.rotation.z = -0.54;
  brakeArm.position.set(1.31, 0.56, -0.46);
  pedals.add(brakeArm);
  const simulator = lib.box(0.06, 0.05, 0.045, M.plastic);
  simulator.position.set(1.35, 0.62, -0.46);       /* pedal simulator on the toe board */
  pedals.add(simulator);
  const accelPlate = lib.box(0.016, 0.13, 0.055, M.rubber);
  accelPlate.rotation.z = -0.5;
  accelPlate.position.set(1.29, 0.43, -0.39);
  pedals.add(accelPlate);
  const accelHinge = lib.box(0.04, 0.025, 0.065, M.plastic);
  accelHinge.position.set(1.26, 0.365, -0.39);
  pedals.add(accelHinge);
  sys.add(pedals);

  return sys;
}
