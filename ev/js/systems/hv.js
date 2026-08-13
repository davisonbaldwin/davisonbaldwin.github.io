/* HV electrical: penthouse distribution unit, onboard charger, DC-DC
   converter, charge inlet, orange cable set, 12 V lithium battery, and the
   zonal LV harness. Everything that moves energy around the car, and the
   low-voltage island that keeps it controllable when the big pack faults. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'hv',
  name: 'HV electrical',
  color: 0xff8a3c,
  explode: [-1.5, 0.3, 0],
  blurb: 'The 355 V network that moves the energy, and the 12 V island that keeps steering and braking alive when it fails. About 88 kg of copper, silicon and insulation.',
  parts: {
    penthouse: {
      name: 'Penthouse PDU',
      tagline: 'Every high-voltage ampere in the car passes through this one sealed box on the pack’s rear deck.',
      mass: 12,
      specs: [
        ['Bus', '355 V nominal, 240 to 403 V'],
        ['Branches', '5: two inverters, OBC, DC-DC, thermal'],
        ['Busbars', 'Laminated Cu, 400 A continuous'],
        ['Aux fusing', '3x 30 to 60 A ceramic'],
        ['Interlock', 'HVIL loop, opens contactors in 200 ms'],
        ['Enclosure', 'Cast Al, IP6K7, shared pack seal'],
      ],
      how: 'Two cables arrive from the pack contactors directly below and land on a pair of laminated copper busbars. Five branches leave: heavy unfused runs to the two drive inverters, protected upstream by the pack’s pyro fuse, and three fused spurs for the onboard charger, the DC-DC converter, and the thermal system’s heater and compressor. Every connector carries two extra low-voltage pins that thread a single interlock loop, the HVIL, through the entire orange network: unseat any connector half a turn and the loop breaks, the contactors open within 200 ms, and the bus is dead before a fingertip can reach a terminal.\n\nThe penthouse is also where precharge and isolation monitoring earn their keep. When the car wakes, the pack’s pilot contactor charges every capacitor hanging on this bus, both inverter DC links plus the charger and converter inputs, through a 50 Ω resistor before the mains close. And the pack’s isolation monitor is really measuring this room: it pulses the bus against the chassis and computes the leakage path. Below 500 Ω per volt it logs a warning; below 100 it opens the contactors. On a crash signal the pyro fuse fires and the inverters are commanded to discharge their links below 60 V within 2 seconds.',
      why: 'Concentrating distribution in one box on the rear pack deck keeps the highest-current busbars under 400 mm long, puts every HV joint inside a single sealed, interlocked enclosure, and leaves exactly one place to look during service. The alternative, scattering junction boxes around the car, multiplies seals, interlock zones and failure points.',
      fail: [
        'A vibration-worn HVIL pin opens the loop intermittently: the car shuts down mid-drive, safely but abruptly, and the fault is maddening to trace.',
        'Aux fuse fatigue from thermal cycling parts a branch years before its rated current is ever reached.',
        'Coolant ingress through a chafed seal shows up first as a slow isolation-resistance decline, which is exactly what the monitor exists to catch.',
      ],
      explode: [-0.25, -0.02, 0],
    },
    obc: {
      name: 'Onboard AC charger',
      tagline: 'An 11 kW rectifier carried everywhere, because the grid speaks AC and the pack does not.',
      mass: 11,
      specs: [
        ['Power', '11 kW, 3-phase 16 A'],
        ['Topology', 'Totem-pole PFC + CLLC resonant'],
        ['Switches', 'SiC MOSFETs at 140 kHz'],
        ['Peak efficiency', '96.5%'],
        ['Output', '240 to 403 V, isolated'],
        ['Cooling', 'Cold plate on the shared coolant loop'],
      ],
      how: 'Three 230 V phases at 16 A enter through the AC pins of the charge inlet. A totem-pole power-factor stage boosts them onto a 650 V internal link while shaping the input current to near-unity power factor, so the car looks like a clean resistive load to the grid. A CLLC resonant bridge then chops that link at 140 kHz through a planar transformer and rectifies the secondary onto the pack bus. Silicon carbide switches make the frequency possible, and the frequency makes the magnetics small: the transformer that moves 11 kW is the size of a paperback.\n\nThe box exists because a battery accepts only DC. On AC the conversion hardware must ride in the car, so it is sized by what the car can carry and cool: 11 kW. A DC fast-charge station does the same job with 400 kg of rectifier cabinets bolted to the ground, which is why the port’s DC pins bypass this box entirely and land, via the penthouse, straight on the pack bus. Same physics, different postcode for the mass. The stages also run in reverse: the car can source 3.6 kW of mains AC from its own pack to power tools or a house.',
      why: '11 kW is a deliberate ceiling. It refills the 95 kWh pack overnight, about nine hours flat, and it is what an ordinary European three-phase domestic supply delivers. Every kilowatt beyond that adds silicon, copper and coolant capacity that rides along on every trip to serve a rare occasion; the rare occasion is what DC stations are for.',
      fail: [
        'Grid surges kill PFC front ends; a sacrificial varistor stage absorbs lightning-adjacent transients and is replaced, not repaired.',
        'A blocked coolant branch derates charging to 3 kW long before the silicon is at risk.',
        'Relay contacts pit over ten thousand plug cycles; the pilot line always breaks current first, so the relays only ever switch dead.',
      ],
      explode: [-0.55, 0.35, -0.30],
    },
    dcdc: {
      name: 'DC-DC converter',
      tagline: 'The alternator this car does not have: 355 V in, 14 V out, 180 A.',
      mass: 7,
      specs: [
        ['Rating', '2.5 kW continuous, 3.2 kW for 30 s'],
        ['Input', '240 to 403 V'],
        ['Output', '12.0 to 15.2 V, up to 180 A'],
        ['Topology', 'Phase-shifted full bridge'],
        ['Isolation', 'Reinforced barrier, 2.5 kV tested'],
        ['Efficiency', '94% at half load'],
      ],
      how: 'A phase-shifted full bridge chops the pack bus at 120 kHz into a planar transformer with a 25:1 step-down. The secondary rectifies through synchronous MOSFETs rather than diodes because at 180 A even 0.45 V of diode drop would burn 80 W; the MOSFET channel drops a tenth of that. The output floats the 12 V battery at 14.2 V and follows a jagged load: 40 W of sleeping electronics, a kilowatt spike when the steering rack loads up mid-corner, the brake booster precharging on top.\n\nThe transformer is also the safety boundary. The 12 V net is chassis-referenced, bolted to the body everywhere; the HV bus floats, connected to chassis nowhere. The reinforced barrier between them is tested to 2.5 kV because its failure would reference the pack to every ground strap in the car, which is why barrier integrity is watched by the same isolation monitor that guards the cables.',
      why: 'Steering assist, brake boost, airbags, contactor coils and every computer stay on 12 V by design, so the dependency runs one way: the HV system cannot even connect itself without the LV rail energising the contactor coils, but the LV rail survives any HV fault. That asymmetry is the safety architecture in one sentence.',
      fail: [
        'If the converter dies while driving, the car runs on the 12 V battery alone: roughly 30 minutes of steering, braking and hazards, with escalating warnings to stop.',
        'Output capacitor ageing raises ripple, which radio and sensor supplies notice before anything else does.',
        'An isolation-barrier fault is caught by the pack monitor, not by this box, and opens the contactors.',
      ],
      explode: [-0.55, 0.35, 0.30],
    },
    'charge-port': {
      name: 'Charge inlet',
      tagline: 'The one place a stranger’s equipment is allowed to touch the pack bus.',
      mass: 4,
      specs: [
        ['Standard', 'CCS2: 3-phase AC + DC pins'],
        ['DC current', '500 A sustained, 630 A peak'],
        ['Handshake', 'ISO 15118 PLC over Control Pilot'],
        ['Pin sensing', 'NTC thermistor in each DC pin'],
        ['Lock', 'Motorised, manual release in the boot'],
      ],
      how: 'Nothing conducts until software agrees. Station and car negotiate over powerline comms on the Control Pilot pin: identity, contract, limits. The station then runs an insulation test on the still-dead cable, the car closes its contactors, and current ramps entirely under the car’s command: the BMS requests amps according to cell temperature and the station follows. The peak request is 630 A, which at this bus voltage buys barely 230 kW, so each DC pin carries an embedded thermistor: contact resistance rises as pins wear, resistive heat scales with the square of the current, and the car derates its request the moment pin temperature climbs.\n\nBehind the socket the two paths diverge completely. The AC pins wire to the onboard charger, which owns rectification. The DC pins are a busbar shot through the penthouse to the pack: no conversion, because the station’s rectifier already matched the pack voltage. The motorised lock is not theft protection, it is arc protection: breaking 500 A of DC would draw an arc that sustains itself across centimetres, so the connector cannot be withdrawn until current is zero and the lock releases.',
      why: 'This inlet is the argument for 800 V packs stated in copper: at twice the voltage those 630 A become 315, passively cooled station cables replace liquid-cooled ones, and the pins stop being the thermal bottleneck. This car stays at 355 V for silicon cost and charging-network maturity, and pays for that choice right here, in pin temperature.',
      fail: [
        'Worn station connectors, not the car’s pins, cause most derating: the thermistors cannot tell whose resistance is rising, only that heat is arriving.',
        'A failed lock actuator strands the connector on the car; a manual release cable behind the boot lining exists for exactly this.',
        'Water in the socket trips the station’s insulation test before energisation: an inconvenience by design, never a hazard.',
      ],
      explode: [-0.45, 0.55, 0.40],
    },
    'hv-cables': {
      name: 'HV cable set',
      tagline: 'Three shielded orange runs that make pack voltage a mass decision.',
      mass: 12,
      count: 3,
      specs: [
        ['Conductor', '50 mm² class-5 fine-strand Cu'],
        ['Insulation', 'Silicone, 180 °C, 1 kV class'],
        ['Shield', 'Tinned Cu braid, bonded both ends'],
        ['Runs', 'Front 3.1 m, rear 0.6 m, port 1.2 m'],
        ['Rating', '250 A continuous, 600 A for 30 s'],
      ],
      how: 'Each run is effectively a coaxial cable: fine-strand copper for flex where the powertrain moves, silicone insulation that shrugs off 180 °C beside a motor, and a tinned braid shield bonded to chassis at both ends. The shield does two jobs. It contains the electromagnetic hash of inverters slewing hundreds of volts in nanoseconds, which would otherwise wipe out AM radio and whisper into every sensor line. And it guarantees that a crushed cable faults to grounded braid first, tripping the isolation monitor, rather than energising bodywork. The orange runs through the full insulation depth, so a cut cable still shows orange.\n\nThe front run sets the sizing problem: 3.1 m from the penthouse along the tunnel to the front inverter, carrying 420 A peaks when the front motor pulls its 150 kW share. At 355 V that takes 50 mm² of copper at 0.45 kg per metre. Doubling pack voltage to 710 V halves the current, quarters the resistive loss in the same conductor, and would shrink this run to 25 mm²: about 2 kg saved across the set, more in connectors, plus halved charge current at the port and better switching efficiency from SiC. That is the 800 V argument, and it is real; it is also modest on a 4.75 m car with one long run, and decisive on a bus or pickup with eight-metre runs.',
      why: 'Routing matters as much as sizing. The front run rides the centreline of the pack lid through the tunnel, the most protected real estate in the car: above the strongest structure, inside the crash cell, far from the sills where a side impact intrudes. The rear and port runs are kept short by putting the penthouse next to both of their endpoints.',
      fail: [
        'Chafe through to the shield is a slow isolation decline the monitor catches early; bend radii are specified at six cable diameters so flexing never works the strands.',
        'Connector fretting under vibration raises contact resistance micro-ohm by micro-ohm; terminal temperature sensors watch the trend, not the value.',
        'The 30 s peak rating is thermal mass, not steady state: two consecutive launch-control starts spend most of it.',
      ],
      explode: [0.05, -0.28, 0],
    },
    'lv-battery': {
      name: '12 V lithium battery',
      tagline: 'Eight kilos of insurance that steering and brakes outlive any high-voltage fault.',
      mass: 8,
      specs: [
        ['Chemistry', 'LiFePO4, 4s, 12.8 V nominal'],
        ['Capacity', '33 Ah, 0.42 kWh'],
        ['Peak discharge', '350 A for 5 s'],
        ['Mass', '8 kg against 22 kg lead-acid'],
        ['Management', 'Internal BMS, reports on CAN'],
      ],
      how: 'Everything that must never lose power is deliberately kept off the HV bus: brake booster, steering assist, airbag controller, door releases, hazard lights, and the contactor coils themselves. When the car sleeps, the pack contactors are open and the entire vehicle is this battery, living on a budget under 30 mA for the radio keys and the alarm. The morning wake is a bootstrap: this battery powers the computers, the computers check isolation, and only then do 12 V coils pull in the contactors that connect the big pack. High voltage cannot turn itself on.\n\nLithium iron phosphate replaces the lead-acid brick that started a century of cars. LFP sits happily at full charge, cycles thousands of times against lead’s hundreds, and holds voltage flat under load, so 33 Ah of it replaces 60 Ah of lead at a third of the mass. Its internal BMS balances the four cells and reports genuine state of health on CAN, turning the fading 12 V battery, still the single most common cause of EV roadside calls, into a scheduled service line item.',
      why: 'A separate 12 V island looks redundant next to a 95 kWh pack until you ask what happens in the worst second of the car’s life: a crash that fires the pyro fuse. The pack is inert by design from that moment, and everything protecting the occupants afterwards, hazards, door unlocking, the emergency-call modem, runs on this box. Regulations assume it; the architecture depends on it.',
      fail: [
        'Deep discharge below 9 V triggers a protective lockout that needs a service wake: the lithium equivalent of a flat battery, rarer but less self-serve.',
        'BMS silence on CAN is treated as imminent failure and flagged at once: an unmonitored safety battery is worse than a weak one.',
        'Sub-zero charge current is limited to protect the cells, so a deep winter drain recovers slowly.',
      ],
      explode: [0.35, 0.35, -0.15],
    },
    'lv-harness': {
      name: 'Zonal LV harness',
      tagline: 'Four zone controllers and one spine, replacing the heaviest hand-built part in the car.',
      mass: 34,
      specs: [
        ['Architecture', '4 zone controllers on a power spine'],
        ['Backbone', '10 Mbit automotive Ethernet ring'],
        ['Wire length', '1.6 km against 3.2 km legacy'],
        ['Circuits', 'About 450, against 1200 legacy'],
        ['Protection', 'Solid-state eFuses, no melt fuses'],
      ],
      how: 'A conventional harness is point-to-point: every lamp, motor and sensor wired individually back to a central fuse box, kilometres of copper converging into trunks as thick as a wrist. It is also the one major component no robot can install: a limp, tangled thing that humans drape through the body shell by hand. The zonal answer is topological. One power spine runs the length of the sill, and four zone controllers sit within a metre of the loads they serve. A tailgate motor is wired 40 cm to the rear zone controller, not 4 m to the dashboard.\n\nEach controller distributes power through solid-state eFuses: MOSFETs with current sensing that trip in microseconds instead of the milliseconds a melting fuse needs, retry after transients, soft-start motors to kill inrush, and report every circuit’s current onto the Ethernet backbone. Data rides the same backbone, so the four controllers are physically identical parts distinguished only by firmware, and the short, stiff zone sub-harnesses are finally simple enough for automated assembly.',
      why: 'The argument is mass and the factory in equal parts: 34 kg here against roughly 50 for the point-to-point equivalent, and hours of skilled hand labour converted into robot-compatible operations. The copper halves because wire length is now set by the distance to the nearest controller, not the distance to the dashboard.',
      fail: [
        'The spine is a single point of failure per zone, which is why it is a ring fed from both ends: one cut degrades, two cuts darken a corner of the car.',
        'Fusing is now firmware: an eFuse threshold bug would ship to every circuit at once, so the trip tables are locked, safety-certified code.',
        'Fewer, denser connectors mean one corroded seal takes out a zone branch instead of a single circuit.',
      ],
      explode: [0, -0.35, -0.30],
    },
  },
};

/* ── Geometry ── */

/* THE PENTHOUSE HARD POINT IS NOT EMPTY, AND THIS MODULE USED TO ASSUME IT
   WAS. `P.penthouse` reserves x -1.58 to -1.16, y 0.33 to 0.56, z +/-0.45,
   and drivetrain-7, drivetrain-9 and thermal all cite it and route around
   it. Gen 1 and Gen 2's rear drive units do not: swept against the built
   meshes, the reservation is occupied by

     drivetrain/housing        x to -1.345, y to 0.530, z -0.306 to 0.040
     drivetrain/inverter       x to -1.230, y 0.435 to 0.639, |z| to 0.170
     drivetrain/power-modules  y 0.621 to 0.651
     drivetrain/rotor          x to -1.414, y to 0.446, |z| to 0.255
     drivetrain/gearset        x to -1.364, y to 0.514, z -0.30 to -0.20
     drivetrain-2/housing      x to -1.312, y to 0.568, z -0.220 to 0.102
     drivetrain-2/inverter     x to -1.264, y 0.390 to 0.530
     drivetrain-2/stators      x to -1.330, y to 0.550
     drivetrain-3/tv-controller x to -1.367, y 0.396 to 0.449, |z| to 0.612
     halfshafts (gen1, gen2)   y 0.313 to 0.397 at every z

   and two of those, the Gen 1 inverter at 0.639 and its power modules at
   0.651, are through the reservation's own 0.56 ceiling. Three boxes
   totalling 30 kg were drawn into that volume anyway: the penthouse alone
   read 120.00 mm against the Gen 1 and Gen 2 halfshafts over 396 crossing
   triangle pairs, 78.00 mm against the Gen 2 housing over 647, and 62.50
   against the Gen 1 housing over 608, and the charger and converter above it
   read 90.00 and 35.00 against the same drive units.

   The shaft line and the joint centres are fixed and the drive unit is not
   this module's to move, so the bay was re-swept for what is actually free
   and the three boxes were rebuilt inside it. Solid probes were run against
   every partner in gen1, gen2 and gen3 at once. What survives is three
   volumes:

     FLANKS   x -1.300 to -1.170, y 0.368 to 0.548, |z| 0.190 to 0.440.
              Clear on all three rungs. This is where the pack's rear deck
              ends (P.battery stops at x -1.30) and it is the only part of
              the reservation the drive unit does not reach.
     BRIDGE   x -1.225 to -1.170 across |z| 0.190. The centre has to be cut
              back to -1.225 because the Gen 1 rear inverter reaches x -1.230
              and the Gen 2 one -1.264, both on the centreline.
     BOOT     x -1.520 to -1.190, y 0.665 to 0.760, |z| to 0.440, over the
              drive unit and under the rear bench's backrest, which comes
              down to y 0.760 at x -1.550 and no lower.

   So the PDU is a U in plan, straddling the front of the rear drive unit
   with a chamber on each flank and a spine across the pack's rear deck, and
   the charger and the converter go up onto the boot shelf on rails down the
   flanks. That is also the arrangement the panels already described and the
   old geometry did not: "one sealed box on the pack's rear deck" with "two
   cables from the pack contactors directly below" was drawn 200 mm aft of
   the pack, on top of the motor. */
const PH = P.penthouse;
const PFWD = -1.170;                   // enclosure forward wall
const PAFT = -1.300;                   // flank rear wall, 12 mm off drivetrain-2's housing
const PBRG = -1.225;                   // spine rear wall, 5 mm off the Gen 1 rear inverter
const PZI = 0.190;                     // flank inboard wall, 20 mm outboard of the inverters
const PZO = 0.430;                     // flank outboard wall
const PY0 = 0.380;                     // enclosure floor
const PY1 = 0.500;                     // enclosure lid
const PDK = 0.368;                     // deck plate underside
const LIDTOP = 0.315;                  // highest pack vertex under this footprint,
                                       // battery/contactors on gen1; battery-2 and
                                       // battery-3 are both 0.310 here
const phx = (PFWD + PAFT) / 2;         // -1.235, flank centre
const bootY = 0.668;                   // charger and converter floor on the boot shelf

export function build() {
  const sys = new THREE.Group();

  /* penthouse PDU: U-plan deck, U-plan enclosure, orange bosses, service
     disconnect, standoffs to the pack lid */
  const pent = lib.part('penthouse', [-0.25, -0.02, 0]);
  /* three deck plates and three chambers, one per leg of the U */
  const legs = [
    [(PFWD + PAFT) / 2, PAFT - PFWD, (PZI + PZO) / 2, PZO - PZI],
    [(PFWD + PAFT) / 2, PAFT - PFWD, -(PZI + PZO) / 2, PZO - PZI],
    [(PFWD + PBRG) / 2, PBRG - PFWD, 0, 2 * PZI],
  ];
  for (const [cx, lx, cz, lz] of legs) {
    const plate = lib.plate(Math.abs(lx) + 0.008, Math.abs(lz) + 0.010, 0.012, 0.006, M.alu);
    plate.position.set(cx, PDK + 0.006, cz);
    pent.add(plate);
    const chamber = lib.box(Math.abs(lx), PY1 - PY0, Math.abs(lz), M.castAlu);
    chamber.position.set(cx, (PY0 + PY1) / 2, cz);
    pent.add(chamber);
  }
  /* connector bosses. The two heavy feeds leave the flank rear faces, which
     is where the rear drive unit is; the fused spurs and the tunnel run
     leave the spine's forward face. */
  for (const bz of [-0.30, 0.30]) {
    const boss = lib.cyl(0.022, 0.025, M.hv, 14);
    boss.rotation.z = Math.PI / 2;
    boss.position.set(PAFT - 0.012, 0.440, bz);
    pent.add(boss);
  }
  const bossF = lib.cyl(0.02, 0.022, M.hv, 14);
  bossF.rotation.z = Math.PI / 2;
  bossF.position.set(PFWD + 0.011, 0.440, 0.06);
  pent.add(bossF);
  /* manual service disconnect on the spine lid */
  const disc = lib.cyl(0.026, 0.03, M.hv, 16);
  disc.position.set((PFWD + PBRG) / 2, PY1 + 0.015, 0.015);
  pent.add(disc);
  const grip = lib.torus(0.019, 0.0045, M.hv, 20, 8);
  grip.rotation.x = Math.PI / 2;
  grip.position.set((PFWD + PBRG) / 2, PY1 + 0.033, 0.015);
  pent.add(grip);
  /* Standoffs to the pack lid, and the stations come off the pack rather
     than off the footprint. Swept at 20 mm resolution over gen1, gen2 and
     gen3, the highest pack vertex under this deck is 0.360 (gen1's
     contactors at x -1.16, |z| 0.34 to 0.42) and 0.310 to 0.315 everywhere
     inboard of |z| 0.34, but a vertex ceiling is the wrong instrument for a
     lid built as one large plate: the corners carry the vertices and the
     surface between them carries none, so the scan read 0.310 where the
     material is at 0.330. Probed as a solid slab instead, gen1's lid fills
     y 0.318 to 0.330 across this whole footprint and everything from 0.330
     up is clear on all three rungs. The legs stop at 0.332. */
  for (const sx of [PAFT + 0.022, PFWD - 0.022]) {
    for (const sz of [-0.32, -0.20, 0.20, 0.32]) {
      const leg = lib.cyl(0.007, PDK - 0.332, M.alu, 8);
      leg.position.set(sx, (0.332 + PDK) / 2, sz);
      pent.add(leg);
    }
  }
  /* lid bolts, on top of each chamber where a head is reachable. The four
     they replace sat on the deck flange at y 0.384, which is 4 mm inside a
     chamber floored at 0.380: buried hardware, the failure hv-4 wrote up
     four times in its own detail pass. */
  for (const [cx, lx, cz, lz] of legs) {
    for (const bx of [-0.3, 0.3]) {
      for (const bz of [-0.34, 0.34]) {
        const bolt = lib.cyl(0.006, 0.012, M.steel, 8);
        bolt.position.set(cx + bx * Math.abs(lx), PY1 + 0.004, cz + bz * Math.abs(lz));
        pent.add(bolt);
      }
    }
  }
  sys.add(pent);

  /* onboard AC charger: finned flat box on the boot shelf, driver side,
     on two rails down the penthouse's driver flank */
  const obc = lib.part('obc', [-0.55, 0.35, -0.30]);
  const obcBody = lib.box(0.330, 0.065, 0.350, M.castAlu);
  obcBody.position.set(-1.355, bootY + 0.0325, -0.240);
  obc.add(obcBody);
  const obcFins = lib.fins(0.310, 0.016, 0.330, 9, 0.004, M.alu);
  obcFins.position.set(-1.355, bootY + 0.073, -0.240);
  obc.add(obcFins);
  const acBoss = lib.cyl(0.017, 0.026, M.plasticLt, 12);
  acBoss.rotation.z = Math.PI / 2;
  acBoss.position.set(-1.532, bootY + 0.0325, -0.300);
  obc.add(acBoss);
  const obcHv = lib.cyl(0.013, 0.024, M.hv, 12);
  obcHv.rotation.z = Math.PI / 2;
  obcHv.position.set(-1.531, bootY + 0.0325, -0.160);
  obc.add(obcHv);
  for (const rx of [-1.290, -1.205]) {
    const rail = lib.box(0.026, bootY - PY1, 0.014, M.alu);
    rail.position.set(rx, (PY1 + bootY) / 2, -0.380);
    obc.add(rail);
  }
  sys.add(obc);

  /* DC-DC converter: second flat box on the shelf, passenger side */
  const dcdc = lib.part('dcdc', [-0.55, 0.35, 0.30]);
  const dcBody = lib.box(0.300, 0.050, 0.310, M.castAlu);
  dcBody.position.set(-1.350, bootY + 0.025, 0.235);
  dcdc.add(dcBody);
  const dcFins = lib.fins(0.280, 0.014, 0.290, 8, 0.004, M.alu);
  dcFins.position.set(-1.350, bootY + 0.057, 0.235);
  dcdc.add(dcFins);
  for (const tz of [0.150, 0.280]) {
    const stud = lib.cyl(0.008, 0.022, M.copper, 10);
    stud.rotation.z = Math.PI / 2;
    stud.position.set(-1.211, bootY + 0.025, tz);
    dcdc.add(stud);
  }
  for (const rx of [-1.290, -1.205]) {
    const rail = lib.box(0.026, bootY - PY1, 0.014, M.alu);
    rail.position.set(rx, (PY1 + bootY) / 2, 0.380);
    dcdc.add(rail);
  }
  sys.add(dcdc);

  /* charge inlet on the rear passenger quarter */
  const port = lib.part('charge-port', [-0.45, 0.55, 0.40]);
  const [cpx, cpy, cpz] = P.chargePort;
  const bezel = lib.cyl(0.058, 0.028, M.plastic, 24);
  bezel.rotation.x = Math.PI / 2;
  bezel.position.set(cpx, cpy, cpz + 0.004);
  port.add(bezel);
  const face = lib.cyl(0.048, 0.014, M.plasticLt, 24);
  face.rotation.x = Math.PI / 2;
  face.position.set(cpx, cpy, cpz + 0.013);
  port.add(face);
  /* AC pin arc above, two DC pins below: the CCS2 face */
  for (const [dx, dy] of [[-0.024, 0.010], [-0.012, 0.017], [0, 0.020], [0.012, 0.017], [0.024, 0.010]]) {
    const pin = lib.cyl(0.0055, 0.016, M.plastic, 10);
    pin.rotation.x = Math.PI / 2;
    pin.position.set(cpx + dx, cpy + dy + 0.006, cpz + 0.02);
    port.add(pin);
  }
  for (const dx of [-0.019, 0.019]) {
    const pin = lib.cyl(0.0115, 0.018, M.plastic, 12);
    pin.rotation.x = Math.PI / 2;
    pin.position.set(cpx + dx, cpy - 0.024, cpz + 0.02);
    port.add(pin);
  }
  /* body-colour door flap hinged open at the top edge */
  const flapPivot = new THREE.Group();
  flapPivot.position.set(cpx, cpy + 0.068, cpz + 0.017);
  const flap = lib.box(0.125, 0.125, 0.006, M.paint);
  flap.position.set(0, -0.0625, 0);
  lib.shell(flap);
  flapPivot.add(flap);
  flapPivot.rotation.x = -2.2;
  port.add(flapPivot);
  /* short pigtail dropping inboard behind the panel */
  port.add(lib.tube([
    [cpx, cpy - 0.03, cpz - 0.02],
    [cpx + 0.015, cpy - 0.09, cpz - 0.06],
    [cpx + 0.035, cpy - 0.145, cpz - 0.11],
  ], 0.014, M.hv));
  sys.add(port);

  /* HV cable set: three orange runs, all three re-ended on the PDU's new
     faces and all three re-swept against the built partner meshes.

     THE PORT RUN GOES OVER THE REAR CORNER, NOT THROUGH IT. Its old line
     climbed the quarter at y 0.40 to 0.66 and read 12.09 mm into the body
     rear casting on all three rungs, 40 crossings. Three candidate lines
     were measured: at the old height it fouls the casting and the rear
     dampers, 10 to 11 mm each; at a middle height it adds the rear subframe
     and the rear links; over the top of the damper tower, cresting at
     y 0.82 by x -1.72, it is clean on gen1, gen2 and gen3. That is also the
     only one of the three a loom would actually take, because the other two
     run it down the side of a moving suspension link. */
  const cables = lib.part('hv-cables', [0.05, -0.28, 0]);
  /* penthouse spine to the front drive unit, along the tunnel over the pack
     lid. Lifted 5 mm: gen1's lid is a single plate filling y 0.318 to 0.330
     and the run at y 0.335 was 2.48 mm inside it over 106 crossings. */
  cables.add(lib.tube([
    [-1.155, 0.440, 0.060],
    [-1.080, 0.400, 0.055],
    [-1.020, 0.355, 0.050],
    [-0.450, 0.340, 0.050],
    [0.350, 0.340, 0.050],
    [0.950, 0.345, 0.050],
    [1.140, 0.375, 0.060],
    [1.280, 0.450, 0.100],
  ], 0.014, M.hv));
  /* driver flank to the rear inverter */
  cables.add(lib.tube([
    [-1.300, 0.445, -0.300],
    [-1.390, 0.470, -0.330],
    [-1.500, 0.500, -0.330],
    [-1.600, 0.510, -0.280],
    [-1.660, 0.500, -0.200],
  ], 0.014, M.hv));
  /* passenger flank to the charge port, over the damper tower */
  cables.add(lib.tube([
    [-1.300, 0.445, 0.300],
    [-1.400, 0.600, 0.380],
    [-1.560, 0.760, 0.520],
    [-1.720, 0.820, 0.680],
    [-1.850, 0.790, 0.800],
    [-1.885, 0.735, 0.845],
  ], 0.014, M.hv));
  /* P-clips holding the tunnel run to the pack lid */
  for (const clipX of [-0.45, 0.55]) {
    const clip = lib.torus(0.016, 0.004, M.plastic, 16, 8);
    clip.rotation.y = Math.PI / 2;
    clip.position.set(clipX, 0.341, 0.05);
    cables.add(clip);
  }
  sys.add(cables);

  /* 12 V lithium battery in the frunk, driver side.

     IT USED TO BE INSIDE THE FRONT CASTING. Sat at (1.85, 0.61) the case was
     62.50 mm inside body/front-casting over 38 crossings and 60.00 mm inside
     the crash rails over 13, on gen1, gen2 and gen3 alike, which is a
     battery buried in structural aluminium rather than mounted to it. Probed
     as a solid, the frunk's free window at this z is y 0.628 to about 0.818:
     the crash rails cap it at 0.625 underneath and body-aero's nose closes
     it at 0.820 on gen2, the tightest of the three. The whole stack is 186 mm
     with the lid and posts trimmed 6 mm, so it sits from 0.630 with the post
     tops at 0.816, and it moved forward to x 1.68 where all three noses are
     clear. */
  const lvb = lib.part('lv-battery', [0.35, 0.35, -0.15]);
  const caseBox = lib.box(0.26, 0.15, 0.19, M.plastic);
  caseBox.position.set(1.68, 0.705, -0.30);
  lvb.add(caseBox);
  const lid = lib.box(0.262, 0.020, 0.192, M.plasticLt);
  lid.position.set(1.68, 0.790, -0.30);
  lvb.add(lid);
  for (const tz of [-0.355, -0.245]) {
    const term = lib.cyl(0.009, 0.016, M.copper, 10);
    term.position.set(1.60, 0.808, tz);
    lvb.add(term);
  }
  const strap = lib.box(0.026, 0.006, 0.20, M.steel);
  strap.position.set(1.74, 0.803, -0.30);
  lvb.add(strap);
  sys.add(lvb);

  /* Zonal LV harness: sill spine, four branches, four zone controllers.

     THE SPINE NOW RUNS THE LENGTH OF THE SILL, WHICH IS WHAT ITS PANEL
     ALWAYS SAID. It was drawn at |z| 0.60, which is not the sill, and it ran
     from x 2.02 to -1.92, which is past both axles. Measured, it read
     42.24 mm into the Gen 1 and Gen 2 halfshafts, 30.71 into drivetrain-3's
     front unit, 30.14 into the steering rack, 25.27 into the rear dampers,
     20.42 into the body front casting, 20.09 into the crash rails and
     19.23 into the radiator fans, twenty partner parts in all.

     The rocker really is clear and it was swept to find out where it ends. A
     20 x 30 x 55 mm probe, the zone controller's own envelope, walked over
     x -1.70 to 2.05 by |z| 0.40 to 0.86 at y 0.40 and 0.47 in gen1, gen2 and
     gen3 at once, gives a continuous corridor at |z| 0.76 from x -1.05 to
     1.05 and nothing at all beyond that: the tyre closes it at |x| 1.09,
     15.7 mm deep on gen1's larger wheel, because a rocker stops at the wheel
     arch. So the spine holds |z| 0.76 between the arches and turns inboard
     to |z| 0.49 to 0.56 at each end, which is where the corridor reopens,
     and the two end controllers went with it.

     Both end controllers moved. The front one was at x 1.90, inside the
     crash rails; at x 1.23 it is 450 mm from the 12 V battery it feeds and
     530 from the radiator fans, both inside the one-metre rule the panel
     states. It is at |z| 0.56 rather than 0.48 because interior/pedals fills
     the 0.48 station, 18.84 mm on all three rungs. The rear one was at
     x -1.42, inside the rear damper and spring; it is at x -1.24, and at
     |z| 0.56 rather than 0.49 because thermal's coolant lines cross the
     0.49 station, 11.95 mm on all three rungs. */
  const har = lib.part('lv-harness', [0, -0.35, -0.30]);
  har.add(lib.tube([
    [1.230, 0.440, -0.560],
    [1.120, 0.415, -0.640],
    [1.020, 0.400, -0.710],
    [0.600, 0.400, -0.760],
    [0.000, 0.400, -0.760],
    [-0.600, 0.400, -0.760],
    [-1.000, 0.400, -0.720],
    [-1.120, 0.410, -0.600],
    [-1.240, 0.440, -0.560],
  ], 0.006, M.plasticLt));
  /* branch 1: up to the 12 V battery terminals */
  har.add(lib.tube([
    [1.230, 0.445, -0.555],
    [1.360, 0.520, -0.480],
    [1.480, 0.640, -0.400],
    [1.570, 0.760, -0.330],
    [1.600, 0.800, -0.300],
  ], 0.005, M.plasticLt));
  /* branch 2: front-mid zone, up the B-pillar base */
  har.add(lib.tube([
    [0.900, 0.400, -0.758],
    [0.900, 0.460, -0.790],
    [0.900, 0.510, -0.800],
  ], 0.005, M.plasticLt));
  /* branch 3: rear-mid zone */
  har.add(lib.tube([
    [-0.750, 0.400, -0.758],
    [-0.750, 0.460, -0.775],
    [-0.750, 0.520, -0.780],
  ], 0.005, M.plasticLt));
  /* branch 4: across to the DC-DC output studs, which are on the boot shelf
     now rather than in the penthouse bay */
  har.add(lib.tube([
    [-1.240, 0.440, -0.560],
    [-1.300, 0.500, -0.300],
    [-1.300, 0.580, 0.000],
    [-1.270, 0.650, 0.100],
    [-1.215, 0.690, 0.150],
  ], 0.005, M.plasticLt));
  /* zone controllers at the branch points */
  for (const [zx, zy, zz] of [
    [1.230, 0.455, -0.560],
    [0.900, 0.522, -0.800],
    [-0.750, 0.532, -0.780],
    [-1.240, 0.455, -0.560],
  ]) {
    const zc = lib.box(0.07, 0.022, 0.048, M.plastic);
    zc.position.set(zx, zy, zz);
    har.add(zc);
  }
  sys.add(har);

  return sys;
}
