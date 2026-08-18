/* Structural battery pack: cell-to-pack, 4680 cylindrical cells, serpentine
   liquid cooling, service disconnect. Reference implementation for the
   system-module contract described in SPEC.md. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'battery',
  name: 'Battery pack',
  color: 0x4fc4d8,
  explode: [0, -1.15, 0],
  blurb: 'A 95 kWh structural pack. The cells are load-bearing: the pack is the floor.',
  parts: {
    tray: {
      name: 'Structural tray',
      tagline: 'A stamped and welded aluminum tub that is also the chassis floor.',
      mass: 95,
      specs: [
        ['Material', 'AA6111 stamped + 6063 extrusions'],
        ['Side rail section', '86 x 60 mm, 3 chambers'],
        ['Sealing', 'FIPG bead + 124 M6 flanged bolts'],
        ['IP rating', 'IP67 to 1 m submersion'],
        ['Torsional contribution', '+24% body stiffness'],
      ],
      how: 'The tray carries the cells, the coolant, and a large share of the vehicle bending loads. Extruded side rails run the length of the pack and are the first structure a pole strikes in a side impact: the three internal chambers fold in sequence and absorb energy before it can reach a cell.\n\nThe floor of the tray doubles as the cabin floor. Removing the separate body floor panel saves roughly 40 kg and 30 mm of stack height, which is why the roofline can stay low without cutting headroom.',
      why: 'Making the pack structural inverts the old logic. Early EVs protected a fragile pack inside a strong car. Here the pack is the strong thing, so the body above it can be lighter. The cost is serviceability: the pack is bonded in, and a deep repair means dropping the whole assembly.',
      fail: [
        'Side rail intrusion beyond 40 mm compromises the outer cell rows and totals the pack.',
        'A breached FIPG seal admits moisture; isolation resistance monitoring catches it before it becomes a fault.',
        'Bonded construction means crash repairs are pack-out procedures, not panel work.',
      ],
      explode: [0, -0.42, 0],
    },
    coolplate: {
      name: 'Cooling plates',
      tagline: 'Serpentine aluminum channels that hold 960 cells within 2 °C of each other.',
      mass: 24,
      specs: [
        ['Construction', 'Brazed two-sheet aluminum'],
        ['Channel pitch', '52 mm serpentine'],
        ['Coolant', '50/50 ethylene glycol'],
        ['Flow rate', '28 L/min at full load'],
        ['Cell-to-cell gradient', '< 2 °C target'],
      ],
      how: 'Two stamped aluminum sheets are brazed together so the gap between them forms a serpentine channel. The plate snakes between cell rows and contacts each cell along its side wall through a thermally conductive gap filler. Side-wall cooling reaches the cell jellyroll faster than cooling through the base, because the thermal path crosses fewer material boundaries.\n\nCoolant enters at the front of the pack, splits into four parallel plate circuits to keep the pressure drop low, and returns along the center spine. During DC fast charging the same plates run in reverse duty and carry heat in from the heat pump to warm a cold pack before it will accept high current.',
      why: 'Temperature spread, not average temperature, is what ages a pack unevenly. A serpentine that visits every cell row keeps the spread under 2 °C, so all 960 cells age at nearly the same rate and the weakest cell stays close to the mean. Pack life follows the weakest cell.',
      fail: [
        'A clogged channel starves one circuit; the BMS sees the local temperature rise and derates charging.',
        'Gap filler voids leave cells air-coupled and locally hot; caught at end-of-line thermography.',
        'Coolant leak inside the pack is the worst case: isolation monitoring plus a leak-detection rope trigger contactor opening.',
      ],
      explode: [0, -0.18, 0],
    },
    modules: {
      name: 'Cell modules',
      tagline: 'Four cell blocks bonded straight into the tray. Three sealed, one shown open.',
      mass: 180,
      count: 4,
      specs: [
        ['Arrangement', '4 blocks, 240 cells each'],
        ['Cell bond', 'Polyurethane structural adhesive'],
        ['Fire barrier', 'Mica sheet + aerogel blanket'],
        ['Vent path', 'Directed channels to burst discs'],
      ],
      how: 'Cell-to-pack construction deletes the traditional module housing. Each block is a grid of 4680 cells bonded to each other and to the tray with a structural adhesive that is also the thermal interface. The adhesive turns hundreds of loose cylinders into a shear panel: the cells themselves carry chassis loads, the way an aircraft skin carries wing loads.\n\nAbove the cells sits a mica fire barrier and a vent channel. If a cell ever goes into thermal runaway, its header vents hot gas into the channel, which ducts it to burst discs at the rear of the pack, away from the cabin.',
      why: 'Removing module walls recovers roughly 10% pack energy density and a large amount of cost. The tradeoff is repairability: a single bad cell cannot be swapped. The bet, supported by field data, is that modern cells fail rarely enough that repair granularity is worth trading for range.',
      fail: [
        'One cell in runaway must not propagate: the aerogel blanket and vent path exist for exactly this, validated by nail-penetration tests.',
        'Adhesive bond degradation under thermal cycling is the long-term unknown; monitored by stiffness telemetry in fleet data.',
      ],
      explode: [0, 0.1, 0],
    },
    cells: {
      name: '4680 cylindrical cells',
      tagline: 'The 46 mm tabless cylinder: the unit of energy the whole car is designed around.',
      mass: 68,
      count: 960,
      specs: [
        ['Format', '46 mm dia x 80 mm'],
        ['Chemistry', 'NMC 811 / graphite + 5% Si'],
        ['Capacity', '26 Ah, 99 Wh per cell'],
        ['Tab design', 'Tabless, full-width current path'],
        ['Case', 'Nickel-plated steel, negative'],
      ],
      how: 'Each cell is a jellyroll: anode, separator, and cathode wound into a spiral. A conventional cylindrical cell collects current through one small tab, so electrons from the far end of the winding travel the whole strip length. The 4680 shears the foil edge into shingled fingers and folds them flat, turning the entire strip edge into the terminal. Current path length drops from meters to millimeters, and internal resistance falls with it.\n\nLower resistance is what makes the large format viable: a 46 mm cylinder holds five times the energy of a 21700, and without the tabless design it could not shed its heat or sustain fast-charge current.',
      why: 'Cylinders are wound at hundreds of parts per minute, tolerate swelling with even hoop stress, and a steel can is its own crash structure. The 46 mm diameter is a deliberate optimum: wide enough to cut can-mass overhead per watt-hour, narrow enough that the center of the jellyroll can still reach the cooling on the wall.',
      fail: [
        'Lithium plating during cold fast-charge is the main degradation risk; the BMS blocks high current below 10 °C.',
        'A single-digit ppm manufacturing defect rate across 960 cells is why cell-level fusing at the collector exists.',
        'Silicon in the anode swells 300% per cycle; capping it at 5% trades some energy for cycle life.',
      ],
      explode: [0, 0.34, 0],
    },
    crossmembers: {
      name: 'Crossmembers',
      tagline: 'Lateral beams that turn the open tub into a torsion box and a seat mount.',
      mass: 32,
      count: 5,
      specs: [
        ['Material', '6063-T6 extrusion'],
        ['Section', '40 x 180 mm double-hat'],
        ['Function', 'Torsion box + seat rails + side-impact load path'],
      ],
      how: 'Five extruded beams span the tray laterally, bolted through the side rails. They close the open tub into a torsion box, they are the load path that carries a side impact across the pack to the far rail, and their top faces are the seat mounting rails for the cabin above.',
      why: 'Every gram inside the pack envelope has to justify itself twice. These beams count as body structure and as pack structure at once, which is the whole argument for structural packs in one part.',
      fail: [
        'Bolt torque relaxation under thermal cycling is checked at service; a loose crossmember reads as a body creak long before it is a safety issue.',
      ],
      explode: [0, 0.22, 0],
    },
    busbars: {
      name: 'HV busbars',
      tagline: 'Laminated aluminum conductors that gather 960 cells into one 400 A output.',
      mass: 9,
      specs: [
        ['Conductor', 'Laminated Al, 630 mm² effective'],
        ['Joint', 'Laser weld to cell collectors'],
        ['Continuous rating', '400 A at 45 °C rise'],
        ['Insulation', 'PET film, 2.5 kV tested'],
      ],
      how: 'Current collectors laser-welded across each cell top gather the parallel groups; laminated busbars along the center spine carry the summed current to the contactors. Each cell connects to its collector through a narrow neck of foil that acts as a fuse: if one cell shorts internally, its neck melts and the other 959 carry on.\n\nAluminum wins over copper here on mass: it needs 1.6 times the cross-section but weighs half as much, and every joint is welded aluminum-to-aluminum, avoiding the galvanic pair at a Cu-Al interface.',
      why: 'The busbar layout is what sets the pack voltage architecture: 96 groups in series, 10 cells per group, nominal 355 V. Grouping in tens means one dead cell costs one percent of capacity, not one percent of voltage stability.',
      fail: [
        'A high-resistance weld joint self-heats under load; pack thermal imaging at end-of-line catches these at single-milliohm resolution.',
        'Vibration fatigue at busbar bends is designed out with stress-relief loops, then validated on a 6-DOF shaker.',
      ],
      explode: [0, 0.52, 0],
    },
    bms: {
      name: 'Battery management system',
      tagline: 'The accountant of the pack: it never generates energy, it only prevents lies about it.',
      mass: 3,
      specs: [
        ['Topology', 'Master + 8 daisy-chained monitors'],
        ['Cell channels', '96 voltage, 48 temperature'],
        ['Accuracy', '±1 mV per cell'],
        ['Balancing', 'Passive, 150 mA per group'],
        ['Isolation monitor', 'Continuous, 500 Ω/V threshold'],
      ],
      how: 'Monitor boards along the pack measure every series group at millivolt accuracy and report over an isolated daisy chain to the master. From voltage, current, and temperature the master runs a Kalman filter against an electrochemical cell model to estimate state of charge and state of health, quantities that cannot be measured directly, only inferred.\n\nBalancing is passive: groups that drift high are bled through a resistor a few percent per week. The master also owns the safety chain: it commands the contactors, watches isolation resistance, and can open the pack in under 10 ms on a fault.',
      why: 'A lithium pack without a BMS is not a battery, it is a fire pending scheduling. Every guarantee the car makes about range, charge speed, and warranty life is really a guarantee the BMS makes. Millivolt accuracy is the difference between using 95% of the pack and using 88% with the same safety margin.',
      fail: [
        'SoC estimate drift shows up as sudden range recalculation; a full charge-discharge cycle re-anchors the filter.',
        'A broken monitor daisy chain forces contactor opening: the pack must never operate unobserved.',
        'Passive balancing cannot fix a genuinely weak group, it can only hide it; SoH tracking exists to tell the difference.',
      ],
      explode: [0, 0.6, -0.25],
    },
    contactors: {
      name: 'Contactors and pyro fuse',
      tagline: 'The only switch between 355 volts and everything else.',
      mass: 6,
      specs: [
        ['Main contactors', '2x 500 A, ceramic chamber'],
        ['Precharge', '50 Ω resistor + pilot contactor'],
        ['Pyro fuse', 'Squib-fired, < 2 ms clear'],
        ['Service disconnect', 'Manual, tool-free, lockout-tagout'],
      ],
      how: 'Two main contactors isolate both pack terminals whenever the car sleeps. Closing them onto the inverter directly would weld their contacts shut, because the inverter input capacitors look like a dead short for the first milliseconds. So a precharge path closes first: a pilot contactor charges the capacitors through a 50 Ω resistor, and only when the voltage across the mains is near zero do they close.\n\nBeside them sits a pyrotechnic fuse. On a crash signal or an unclearable short, a small squib drives a wedge through the conductor and clears the circuit in under two milliseconds, faster than any thermal fuse can act.',
      why: 'Contactors are the pack’s promise to a first responder: with the car off or crashed, there is no voltage outside the pack envelope, and the cut loop confirms it. The pyro fuse exists because a 400 A thermal fuse sized for normal driving would ride through exactly the faults that matter most.',
      fail: [
        'Contact welding from a missed precharge is detected by a stuck-closed check on every sleep cycle.',
        'A fired pyro fuse is not resettable by design; the pack is inert until service replaces it.',
      ],
      explode: [0, 0.5, 0.25],
    },
  },
};

/* ── Geometry ── */

const B = P.battery;
const W = B.x[1] - B.x[0];      // 2.60 pack length
const D = B.z[1] - B.z[0];      // 1.44 pack width

export function build() {
  const sys = new THREE.Group();

  /* tray: floor + side rails + end walls */
  const tray = lib.part('tray', [0, -0.42, 0]);
  const floor = lib.plate(W, D, 0.014, 0.05, M.castAlu);
  floor.position.y = 0.14;
  tray.add(floor);
  for (const zs of [-1, 1]) {
    const rail = lib.box(W, 0.16, 0.086, M.alu);
    rail.position.set(0, 0.22, zs * (D / 2 - 0.043));
    tray.add(rail);
  }
  for (const xs of [-1, 1]) {
    const wall = lib.box(0.05, 0.16, D - 0.17, M.alu);
    wall.position.set(xs * (W / 2 - 0.025), 0.22, 0);
    tray.add(wall);
  }
  sys.add(tray);

  /* cooling plates: four strips with visible serpentine ribs */
  const cool = lib.part('coolplate', [0, -0.18, 0]);
  for (let i = 0; i < 4; i++) {
    const px = (i % 2 === 0 ? -1 : 1) * 0.635;
    const pz = (i < 2 ? -1 : 1) * 0.345;
    const plate = lib.plate(1.2, 0.6, 0.008, 0.02, M.coolant);
    plate.position.set(px, 0.156, pz);
    cool.add(plate);
    for (let r = 0; r < 5; r++) {
      const rib = lib.box(1.14, 0.004, 0.018, M.coolant);
      rib.position.set(px, 0.163, pz - 0.24 + r * 0.12);
      cool.add(rib);
    }
  }
  /* inlet and outlet stubs at the front face */
  for (const [zz, mat] of [[-0.1, M.coolant], [0.1, M.coolantHot]]) {
    const stub = lib.cyl(0.016, 0.1, mat, 12);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(B.x[1] + 0.02, 0.17, zz);
    cool.add(stub);
  }
  sys.add(cool);

  /* three sealed modules + one open bay */
  const modules = lib.part('modules', [0, 0.1, 0]);
  const bays = [[-0.635, -0.345], [-0.635, 0.345], [0.635, 0.345]];
  for (const [bx, bz] of bays) {
    const block = lib.box(1.2, 0.085, 0.6, M.darkSteel);
    block.position.set(bx, 0.205, bz);
    modules.add(block);
    const lidS = lib.plate(1.16, 0.56, 0.006, 0.02, M.carbon);
    lidS.position.set(bx, 0.252, bz);
    modules.add(lidS);
  }
  sys.add(modules);

  /* the open bay: instanced 4680 cells */
  const cells = lib.part('cells', [0, 0.34, 0]);
  const cellGeo = new THREE.CylinderGeometry(0.023, 0.023, 0.08, 14);
  const nx = 24, nz = 12;
  const inst = new THREE.InstancedMesh(cellGeo, M.cell, nx * nz);
  inst.castShadow = inst.receiveShadow = true;
  const dummy = new THREE.Object3D();
  let k = 0;
  for (let ix = 0; ix < nx; ix++) {
    for (let iz = 0; iz < nz; iz++) {
      dummy.position.set(
        0.635 - 0.575 + ix * 0.05,
        0.205,
        -0.345 - 0.275 + iz * 0.05
      );
      dummy.updateMatrix();
      inst.setMatrixAt(k++, dummy.matrix);
    }
  }
  cells.add(inst);
  sys.add(cells);

  /* crossmembers */
  const cross = lib.part('crossmembers', [0, 0.22, 0]);
  for (let i = 0; i < 5; i++) {
    const beam = lib.box(0.04, 0.05, D - 0.18, M.alu);
    beam.position.set(-1.04 + i * 0.52, 0.285, 0);
    cross.add(beam);
  }
  sys.add(cross);

  /* busbar spine down the center plus collector strips over the open bay */
  const bus = lib.part('busbars', [0, 0.52, 0]);
  const spine = lib.box(W - 0.3, 0.008, 0.07, M.busbar);
  spine.position.set(0, 0.262, 0);
  bus.add(spine);
  for (let i = 0; i < 6; i++) {
    const strip = lib.box(0.012, 0.006, 0.56, M.busbar);
    strip.position.set(0.115 + i * 0.2, 0.252, -0.345);
    bus.add(strip);
  }
  sys.add(bus);

  /* BMS master + monitor boards */
  const bms = lib.part('bms', [0, 0.6, -0.25]);
  const master = lib.box(0.16, 0.02, 0.1, M.pcb);
  master.position.set(-1.15, 0.27, -0.5);
  bms.add(master);
  for (let i = 0; i < 4; i++) {
    const mon = lib.box(0.07, 0.012, 0.05, M.pcb);
    mon.position.set(-0.9 + i * 0.6, 0.268, -0.66);
    bms.add(mon);
  }
  sys.add(bms);

  /* contactor block + pyro fuse at the rear face */
  const cont = lib.part('contactors', [0, 0.5, 0.25]);
  const housing = lib.box(0.2, 0.09, 0.16, M.plastic);
  housing.position.set(-1.13, 0.27, 0.45);
  cont.add(housing);
  for (const zz of [0.39, 0.51]) {
    const can = lib.cyl(0.028, 0.06, M.steel, 16);
    can.position.set(-1.13, 0.33, zz);
    cont.add(can);
  }
  const pyro = lib.box(0.06, 0.04, 0.05, M.hv);
  pyro.position.set(-1.0, 0.29, 0.45);
  cont.add(pyro);
  sys.add(cont);

  /* pack lid, ghostable in x-ray */
  const lid = lib.part('lid', [0, 0.75, 0]);
  const lidPlate = lib.plate(W - 0.02, D - 0.02, 0.01, 0.05, M.castAlu);
  lidPlate.position.y = 0.305;
  lib.shell(lidPlate);
  lid.add(lidPlate);
  sys.add(lid);

  return sys;
}

/* lid metadata lives with the rest, added after the main table for clarity */
SYSTEM.parts.lid = {
  name: 'Pack lid',
  tagline: 'A sealed composite-aluminum cover that is also the cabin floor carpet base.',
  mass: 28,
  specs: [
    ['Material', 'AA5754, 1.2 mm, stiffening beads'],
    ['Seal', 'Compression gasket, IP67'],
    ['Burst discs', '4x rear-facing vent ports'],
  ],
  how: 'The lid closes the pack against water and dust and carries the burst discs that give thermal-runaway gases a controlled exit path pointing away from the cabin. Stiffening beads let 1.2 mm of aluminum span the full pack width without drumming.',
  why: 'The lid is deliberately not structural: keeping loads in the tray and crossmembers means the lid can be removed in service without unloading the body.',
  fail: [
    'A distorted gasket after service reseal is the most common field leak path; torque-sequence procedure exists for this reason.',
  ],
  explode: [0, 0.75, 0],
};
