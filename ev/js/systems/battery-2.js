/* Gen 2 battery: anode-free lithium-metal cells in a sulfide solid
   electrolyte, prismatic cell-to-chassis. Same envelope as Gen 1
   (js/systems/battery.js): 118 kWh where Gen 1 fit 95, at 360 kg
   instead of 445. Every part is written as a delta against Gen 1. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'battery-2',
  name: 'Battery pack · Gen 2',
  color: 0x4fc4d8,
  explode: [0, -1.15, 0],
  blurb: 'An anode-free lithium-metal pack with a sulfide solid electrolyte: 118 kWh in the envelope that held 95, at 360 kg instead of 445. The price is stack pressure, dry rooms, and a string with no parallel paths.',
  parts: {
    tray: {
      name: 'Structural tray',
      tagline: 'The same tub, 39 kg lighter, because the clamped cell stacks now carry the structure.',
      mass: 56,
      specs: [
        ['Material', 'AA6111 stamped + 6063 extrusions'],
        ['Side rail section', '70 x 45 mm, 2 chambers (Gen 1: 86 x 60, 3)'],
        ['Floor gauge', '1.0 mm (Gen 1: 1.4 mm)'],
        ['Crossmembers', 'Deleted (Gen 1: five, 32 kg)'],
        ['Torsional contribution', '+31% body stiffness (Gen 1: +24%)'],
      ],
      how: 'Gen 1 earned its structural-pack title with heavy sections: 86 mm rails, a 1.4 mm floor, and five crossmembers to close the tub into a torsion box. This tray keeps the layout and sheds the metal. The twelve cell stacks, clamped to 68 kN and bonded to the floor, are rigid bricks; chassis loads shear through them instead of around them, so the rails lose a chamber, the floor thins, and the crossmembers are deleted outright. The seat rails that used to sit on crossmembers now pick up hardpoints on the stack-frame end plates through the lid.\n\nThe accounting: Gen 1 spent 127 kg on tray plus crossmembers. Gen 2 spends 56 on the tray and 24 on the stack frames, 80 kg total, and ends up 31% stiffer, because a clamped prismatic stack is a better shear web than a field of glued cylinders.',
      why: 'Gen 1 made the pack structural so the body above it could lighten. Gen 2 pushes one level deeper: the cells themselves are the structure and the tray is reduced to their fixture and their splash guard. The honest cost is coupling. The floor is a load path that assumes every stack is at full preload, so a slack tie rod is a chassis fault, not just a battery fault, and the repair concept is still pack-out.',
      fail: [
        'The two-chamber rail absorbs less side-pole energy than the Gen 1 three-chamber section; the margin now comes from the stack frames behind it, and the crash case was certified on the assembly, never on the rail alone.',
        'A 1.0 mm floor dents where 1.4 mm shrugged; the composite skid layer under the pack is standard equipment, not an option.',
        'Loss of stack preload locally softens the structure; the frame load cells report it and the car derates before a body creak becomes a bent floor.',
      ],
      explode: [0, -0.42, 0],
    },
    cells: {
      name: 'Anode-free lithium-metal cells',
      tagline: 'There is no anode in the box. The first charge plates one out of the cathode, 66 grams of lithium at a time.',
      mass: 240,
      count: 120,
      specs: [
        ['Format', 'Prismatic slab, 270 x 126 x 52 mm'],
        ['Chemistry', 'In-situ Li metal / Ni-rich NMC, Li6PS5Cl separator'],
        ['Capacity', '255 Ah, 983 Wh per cell'],
        ['Energy density', '490 Wh/kg cell level (Gen 1 4680: ~280)'],
        ['DC resistance', '0.15 mΩ at 50% SoC, 45 °C'],
        ['Cycle life', '~1,000 full cycles to 80% (Gen 1: 1,500+)'],
      ],
      how: 'Gen 1 graphite is a hotel for lithium: 372 mAh per gram of host, plus binder, plus the copper it is coated on. This cell ships with a bare copper foil and no anode at all. The first factory charge strips lithium out of the cathode and plates it onto the copper as a dense metallic layer, 3,860 mAh per gram; discharge strips it back. Deleting the host and its overhead is worth roughly 40% in cell-level Wh/kg on its own; a 25 µm sulfide separator replacing the flooded polymer stack, plus a thicker dry-coated cathode, carries the total from Gen 1 ~280 to 490.\n\nThe separator is the enabling material. Argyrodite Li6PS5Cl conducts lithium ions at about 6 mS/cm at room temperature, on par with Gen 1 liquid carbonate, which is why going solid costs no resistance penalty; it is a hard ceramic that cannot leak, cannot burn like a solvent, and doubles its conductivity by 60 °C, so the cell prefers to run warm. The unforgiving part is that there is zero excess lithium. Every side reaction retires atoms permanently, so coulombic efficiency has to hold 99.98%; even at that rate the pack reaches 80% capacity near cycle 1,000, short of Gen 1 graphite. That is the honest price of the density.',
      why: 'Prismatic is not a styling choice. This chemistry only works under 2 MPa of face pressure, and you cannot press uniformly on a cylinder, so the format is dictated by the physics. Once the cells are flat slabs, 120 large cells replace 960 small ones, weld count drops by an order of magnitude, and 23 kWh appear in the same envelope at 85 kg less pack mass.',
      fail: [
        'Dendrites: at high current density or low temperature, plating goes filamentary and can pierce the separator. Stack pressure and the BMS current map are the two controls; below 15 °C the pack heats itself before it will fast-charge.',
        'Moisture kills: Li6PS5Cl reacts with water to make H2S. A breached cell in the rain is a toxic-gas event, not just an electrical one.',
        'Manufacturing is the real risk: electrode and stacking lines live at a -50 °C dew point, and one pinhole scraps a 983 Wh cell. Stack yield in the mid-90s, against a mature wound line in the high 90s, is priced into every pack.',
      ],
      explode: [0, 0.34, 0],
    },
    stackframes: {
      name: 'Stack compression frames',
      tagline: 'Twelve tie-rod fixtures holding 68 kN each, because this chemistry does not work unsqueezed.',
      mass: 24,
      count: 12,
      specs: [
        ['Preload', '2 MPa across each cell face'],
        ['Clamp force', '68 kN per stack, ~7 metric tons'],
        ['Tie rods', '4x M12, 42CrMo4, 17 kN each'],
        ['Compliance', 'Disc-spring stacks, force held within ±10%'],
        ['Breathing absorbed', '~30 mm per stack, empty to full'],
      ],
      how: 'Gen 1 needed no clamp because a liquid electrolyte wets whatever gap the cells leave. A solid electrolyte touches only where it is pressed. On every discharge, lithium strips off the copper imperfectly and leaves microscopic voids; voids concentrate the next charge into fewer contact points, and concentrated current is exactly how dendrites start. Two megapascals of sustained pressure makes the soft lithium creep back into its own voids between cycles and keeps the ceramic interface fully mated. The pressure is not packaging. It is electrochemistry.\n\nThe plated lithium layer is the state of charge, so each cell is about 3 mm thicker full than empty and a ten-cell stack breathes near 30 mm. The end plates and four tie rods hold a fixed outer length while disc-spring stacks on the rod ends absorb the motion and keep force within ±10%. That fixed outer length is what makes cell-to-chassis possible at all: you cannot bond a breathing cell to a floor, but you can bond a frame that swallows the breathing internally.',
      why: 'Twenty-four kilograms that store no energy is a tax, and it is the main reason 490 Wh/kg cells become a 328 Wh/kg pack. It still wins: the frames replace the 32 kg of Gen 1 crossmembers as the lateral structure, so net structural mass falls while the pack gains 115 Wh/kg over Gen 1 at pack level.',
      fail: [
        'A cracked or yielding tie rod drops local pressure; voids form, impedance rises, and the BMS flags the stack from its EIS trace weeks before a short. The load cell confirms it.',
        'Uneven torque or a warped end plate tilts the pressure field, and the low-pressure corner ages fastest; end-of-line pressure mapping exists for exactly this.',
        'Service granularity worsens: relaxing 68 kN safely needs a fixture, so the replaceable unit is the stack, never the cell.',
      ],
      explode: [0, 0.18, 0],
    },
    cooling: {
      name: 'Edge cooling plates',
      tagline: 'Two thin plates replace a serpentine that visited every row: the temperature window moved, so the hardware shrank.',
      mass: 9,
      count: 2,
      specs: [
        ['Construction', 'Brazed two-sheet aluminum, vertical, at the pack edges'],
        ['Continuous capacity', '4 kW (Gen 1: ~10 kW)'],
        ['Flow rate', '9 L/min (Gen 1: 28)'],
        ['Cell window', '15 to 75 °C (Gen 1: 10 to 45)'],
        ['Heat spreader', 'Tray floor, bonded to all twelve stacks'],
      ],
      how: 'Gen 1 cooling was sized by chemistry, not by heat: every hour a liquid cell spends warm grows its SEI layer and costs calendar life, so the serpentine chased every cell row to hold the pack under 45 °C at all times. The sulfide cell has no solvent to decompose and gets more conductive as it warms, so it runs at 40 to 65 °C on purpose. When the ceiling moves to 75 °C, the same watt needs a fraction of the plate area and flow to remove, and the plumbing collapses to two edge plates with the bonded tray floor spreading heat to them.\n\nFast charge shows the other trick: thermal mass as a buffer. At 350 kW the 18 mΩ string dissipates about 10 kW, but a 10-to-80 session lasts 14 minutes; 9 MJ into 360 kg of pack is a 24 °C rise, from 40 into the mid-60s, still inside the window. The plates then pull it back down at 4 kW over the next half hour of driving. Gen 1 had to extract peak heat in real time; Gen 2 absorbs the session and pays it back later. The cell itself would take 4C, 470 kW. The public connector at 350 kW is now the bottleneck, not the chemistry.',
      why: 'Fifteen kilograms and two thirds of the pump duty deleted, and the win is honest as long as sessions are spaced. The tradeoff is authority: 4 kW cannot brute-force back-to-back fast charges in desert heat, so the second session derates where Gen 1 with 10 kW rode through. Cold is the other edge: with less plate area, preconditioning a frozen pack takes longer than Gen 1 needed.',
      fail: [
        'Consecutive 350 kW sessions in high ambient exceed the 4 kW recovery rate; the charge curve derates, and the trip computer says so before the second stop.',
        'Cold soak is the weak flank: sulfide conductivity falls and plating risk rises, so a -10 °C morning means minutes of heater time before any fast charge, more than Gen 1 asked.',
        'A coolant breach wets the tray wall, not the cells, because the plates live at the edges; the leak drains along the rails and isolation monitoring still catches it.',
      ],
      explode: [0, -0.05, 0.5],
    },
    busbars: {
      name: 'HV busbars',
      tagline: 'One string of 120 cells at 462 volts: every electron crosses every cell, and there is no second path.',
      mass: 8,
      specs: [
        ['Architecture', '120s1p, 462 V nominal (Gen 1: 96s10p, 355 V)'],
        ['Conductor', 'Laminated Al, 720 mm²'],
        ['Continuous rating', '700 A'],
        ['Peak', '1,050 A for 10 min'],
        ['Interconnects', '119 cell-to-cell straps, laser welded'],
      ],
      how: 'Gen 1 gathered 960 cylinders through collector plates and thousands of fuse-neck welds. Here the series path is 119 short laminated straps between adjacent prismatic terminals plus a spine to the disconnect: a few hundred welds instead of a few thousand, each one fat, inspectable, and imaged at end of line. The 30% voltage bump does quiet work too: at 462 V the same power moves with 23% less current, which is why conductor mass falls to 8 kg even though pack power went up.\n\nWhat vanished with the parallel groups is graceful degradation. A Gen 1 cell that shorted melted its fuse neck and the other nine in its group carried on at a 1% capacity loss. Here a failed cell is a failed element of the only string: the pack stops, full stop. Protection therefore moves upstream, from isolating a fault after it happens to predicting it weeks before; that is the whole job of the BMS impedance tracker, and it is why this architecture is only sane with 120 individually graded cells instead of 960 statistical ones.',
      why: 'Parallel paths exist to average out cell variance. Gen 2 buys the variance down at the factory instead, with 100% impedance grading and tight binning, and pockets the redundant conductor, the fuse necks, and the collector plates. Mass and weld count fall; the yield discipline that replaces them is a real cost, it just lives in the plant instead of the car.',
      fail: [
        'A high-resistance strap weld self-heats at 700 A; end-of-line thermography catches milliohm outliers and the per-cell voltage taps bracket any that develop in service.',
        'One open cell strands the car with no limp-home. The mitigation is prediction and scheduled service, not redundancy. That is the honest bet of this architecture.',
      ],
      explode: [0, 0.55, 0],
    },
    bms: {
      name: 'Battery management system',
      tagline: 'Fewer thermistors, more physics: it measures every cell impedance and hunts dendrites before they exist.',
      mass: 2,
      specs: [
        ['Cell channels', '120 voltage, one per cell (Gen 1: 96, one per 10-cell group)'],
        ['Temperature', '16 thermistors (Gen 1: 48)'],
        ['Stack pressure', '12 load cells, one per frame'],
        ['Impedance', 'Online EIS sweep, 0.1 Hz to 1 kHz, every cell weekly'],
        ['Balancing', 'Passive, 250 mA'],
      ],
      how: 'The 1p string gives the BMS something Gen 1 never had: a private tap on every cell, not on a group of ten hiding their differences behind a shared terminal. To that it adds electrochemical impedance spectroscopy: a small AC current swept through the string at rest, each cell response separated by its own tap. Void formation at the lithium interface and pressure loss both raise mid-frequency impedance weeks before any voltage symptom, and the load cells in the stack frames give an independent second witness.\n\nThe thermistor count drops by two thirds because the pack is deliberately near-isothermal: clamped stacks conduct well, the floor spreads heat, and the edge-plate layout removed the row-to-row gradients Gen 1 had to map. The sensing budget moved from thermal geography to electrochemical state. The safety chain sharpened too: opening a semiconductor disconnect costs microseconds and zero wear, so trip thresholds are set hair-trigger, and a false trip costs the driver a torque blink instead of a contactor cycle.',
      why: 'An anode-free string has no lithium reserve and no parallel redundancy, so the pack survives on foresight rather than margin. The Gen 1 BMS was an accountant. This one is an actuary: it prices the failure before it files the claim. That is also the honest risk, because protection quality now lives in models, firmware, and the guard bands they choose, not in redundant hardware.',
      fail: [
        'EIS is only clean at rest; a pack that never sleeps long enough postpones its weekly sweep, and coverage degrades silently until the next long park.',
        'The SoC and SoH models have a fraction of the fleet history behind Gen 1; early packs run wider guard bands, and the usable window opens over the air as data accumulates.',
        'Load-cell drift can mask slow preload loss; the cross-check against the EIS trace is what catches a lying sensor.',
      ],
      explode: [0, 0.62, -0.28],
    },
    disconnect: {
      name: 'Semiconductor disconnect',
      tagline: 'Opens in eight microseconds and never welds; the rent is 290 watts of heat while conducting.',
      mass: 5,
      specs: [
        ['Switch', 'Back-to-back SiC MOSFET banks, both polarities'],
        ['On-resistance', '0.6 mΩ total path'],
        ['Turn-off', '< 10 µs (Gen 1 contactor: 3 to 5 ms)'],
        ['Precharge', 'Gate-controlled current ramp, no resistor, no pilot'],
        ['Backup', 'Pyro fuse + manual service disconnect'],
      ],
      how: 'Gen 1 connected the pack with a mechanical ritual: pilot contactor, 50 Ω resistor to precharge the inverter capacitors, then two main contactors closing with a clunk. Here the switch is silicon carbide. To connect, the gates ramp as a current limiter and charge the capacitors in 200 ms with no precharge hardware at all. To disconnect, the gates drop and current stops in under 10 µs. That speed changes fault physics: through a few microhenries of busbar, a bolted short is cut before it climbs past roughly 1,500 A, where the Gen 1 contactor watched the same fault run beyond 10,000 A for milliseconds and then opened into an arc. Downstream conductors are sized for the smaller number.\n\nThe rent is conduction loss. Closed contactor contacts are a fraction of a milliohm; the SiC path is 0.6 mΩ and dissipates about 290 W at the 700 A continuous rating, roughly triple the contactors, so the disconnect taps the cooling loop through its own cold plate. And semiconductors fail short, not open: a blown MOSFET conducts. The pyro fuse therefore stays, as the one device that guarantees a physical air gap for a crash or a first responder, and the manual service disconnect provides true galvanic isolation against the microamps a nominally open MOSFET still leaks.',
      why: 'No moving parts means no weld-shut failure mode, no wear budget, no precharge hardware, and protection thresholds the BMS can set aggressively because reclosing is free and instant. The costs are honest: SiC die money, a permanent 0.05 to 0.1% efficiency tax at high power, and a hard dependency on the pyro backup for absolute isolation.',
      fail: [
        'Fails short by nature: any unclearable fault escalates to the pyro fuse, which is not resettable, and the pack is inert until service.',
        'Loss of the gate-driver supply is an undetermined state; the watchdog treats it as a fault and fires the pyro rather than guess.',
        'Cold-plate starvation at full charge current cooks the die in tens of seconds, which is why die temperature sits in the BMS trip chain.',
      ],
      explode: [0, 0.5, 0.3],
    },
    lid: {
      name: 'Pack lid',
      tagline: 'Thinner and lighter, and now the moisture barrier for a chemistry that makes toxic gas when wet.',
      mass: 16,
      specs: [
        ['Material', 'AA5754, 0.9 mm (Gen 1: 1.2 mm)'],
        ['Seal', 'Compression gasket + leak-down test at reseal'],
        ['Internal atmosphere', 'Sealed dry, dew point < -40 °C, desiccant cartridge'],
        ['Burst discs', '2x rear-facing (Gen 1: 4x)'],
      ],
      how: 'The job description changed. The Gen 1 lid kept water out to protect isolation resistance, and a small leak was an electrical alarm. This lid keeps water out of a pack whose electrolyte reacts with it to make hydrogen sulfide, so the seal is a chemical barrier first: the pack ships sealed at a -40 °C dew point with a desiccant cartridge and a humidity telltale inside, and a tripped telltale quarantines the pack even when every electrical reading is perfect.\n\nThe fire story changed but did not vanish. There is no carbonate solvent, so the classic vent-jet fire and the liquid-fueled propagation are gone, and runaway spreading between clamped dry cells is far harder; that is why two burst discs replace four and the skin thins to 0.9 mm. What remains is 8 kg of plated lithium at full charge, which burns hot if a crash breaches cells, and vent gas that can carry H2S. The discs still point down and rearward, away from the cabin, and a vented pack is handled as hazmat, with different first-responder placards than Gen 1.',
      why: 'The lid stays non-structural on purpose, same as Gen 1: keeping loads in the tray and the stacks means service can open the pack without unloading the body. The 12 kg saving is real, but the sealing duty went up, so reseal is a torque-sequence procedure with a leak-down check, not a visual.',
      fail: [
        'A distorted gasket after service reseal is the top field risk, and the consequence rose from an isolation warning to slow H2S chemistry; the leak-down test exists for this.',
        'Crash breach plus rain or fording is the scenario that rewrites roadside procedure: responders treat vent gas as toxic first, flammable second.',
      ],
      explode: [0, 0.78, 0],
    },
  },
};

/* ── Geometry ── */

const B = P.battery;
const W = B.x[1] - B.x[0];      // 2.60 pack length
const D = B.z[1] - B.z[0];      // 1.44 pack width

/* Four rows of stacks across z; three stacks per row along x. The stack
   field sits forward so the rear bay (x < -1.03) keeps the BMS master,
   the disconnect, and the HV take-off, like the Gen 1 penthouse end. */
const ZROWS = [-0.50, -0.17, 0.17, 0.50];
const XSTACKS = [-0.70, 0.10, 0.90];
const CELLS_PER_STACK = 10;
const CELL_PITCH = 0.058;

export function build() {
  const sys = new THREE.Group();

  /* tray: thinner floor, slimmer rails, no crossmembers */
  const tray = lib.part('tray', [0, -0.42, 0]);
  const floor = lib.plate(W, D, 0.010, 0.05, M.castAlu);
  floor.position.y = 0.138;
  tray.add(floor);
  for (const zs of [-1, 1]) {
    const rail = lib.box(W, 0.14, 0.058, M.alu);
    rail.position.set(0, 0.21, zs * (D / 2 - 0.029));
    tray.add(rail);
  }
  for (const xs of [-1, 1]) {
    const wall = lib.box(0.04, 0.14, D - 0.13, M.alu);
    wall.position.set(xs * (W / 2 - 0.02), 0.21, 0);
    tray.add(wall);
  }
  sys.add(tray);

  /* cells: 120 prismatic slabs standing in 12 clamped stacks */
  const cells = lib.part('cells', [0, 0.34, 0]);
  const slabGeo = new THREE.BoxGeometry(0.052, 0.126, 0.27);
  const inst = new THREE.InstancedMesh(slabGeo, M.cell, ZROWS.length * XSTACKS.length * CELLS_PER_STACK);
  inst.castShadow = inst.receiveShadow = true;
  const dummy = new THREE.Object3D();
  let k = 0;
  for (const rz of ZROWS) {
    for (const cx of XSTACKS) {
      for (let i = 0; i < CELLS_PER_STACK; i++) {
        dummy.position.set(cx + (i - (CELLS_PER_STACK - 1) / 2) * CELL_PITCH, 0.214, rz);
        dummy.updateMatrix();
        inst.setMatrixAt(k++, dummy.matrix);
      }
    }
  }
  cells.add(inst);
  sys.add(cells);

  /* stack frames: end plates, four tie rods each, spring nuts on the ends */
  const frames = lib.part('stackframes', [0, 0.18, 0]);
  for (const rz of ZROWS) {
    for (const cx of XSTACKS) {
      for (const xs of [-1, 1]) {
        const plate = lib.box(0.024, 0.146, 0.30, M.castAlu);
        plate.position.set(cx + xs * 0.30, 0.220, rz);
        frames.add(plate);
      }
      for (const yy of [0.162, 0.280]) {
        for (const zo of [-0.143, 0.143]) {
          const rod = lib.cyl(0.006, 0.648, M.steel, 10);
          rod.rotation.z = Math.PI / 2;
          rod.position.set(cx, yy, rz + zo);
          frames.add(rod);
          for (const xs of [-1, 1]) {
            const nut = lib.cyl(0.011, 0.02, M.darkSteel, 8);
            nut.rotation.z = Math.PI / 2;
            nut.position.set(cx + xs * 0.318, yy, rz + zo);
            frames.add(nut);
          }
        }
      }
    }
  }
  sys.add(frames);

  /* cooling: two vertical edge plates, one circuit each; the two groups
     share one part id and explode outward through opposite z */
  for (const zs of [-1, 1]) {
    const cool = lib.part('cooling', [0, -0.05, zs * 0.5]);
    const plate = lib.box(2.30, 0.126, 0.010, M.coolant);
    plate.position.set(0.05, 0.214, zs * 0.6555);
    cool.add(plate);
    const stub = lib.cyl(0.013, 0.08, zs > 0 ? M.coolant : M.coolantHot, 12);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(1.24, 0.214, zs * 0.6555);
    cool.add(stub);
    sys.add(cool);
  }

  /* busbars: center spine, row take-offs, stack jumpers, HV leads rearward */
  const bus = lib.part('busbars', [0, 0.55, 0]);
  const spine = lib.box(2.10, 0.008, 0.036, M.busbar);
  spine.position.set(0.05, 0.294, 0);
  bus.add(spine);
  const takeoffX = [-0.55, -0.05, 0.35, 0.75];
  ZROWS.forEach((rz, i) => {
    const strap = lib.box(0.016, 0.006, Math.abs(rz) + 0.02, M.busbar);
    strap.position.set(takeoffX[i], 0.294, rz / 2);
    bus.add(strap);
  });
  for (const rz of ZROWS) {
    for (const gx of [-0.30, 0.50]) {
      const jump = lib.box(0.22, 0.006, 0.03, M.busbar);
      jump.position.set(gx, 0.288, rz);
      bus.add(jump);
    }
  }
  bus.add(lib.tube([[-0.95, 0.292, 0.025], [-1.06, 0.24, 0.20], [-1.12, 0.19, 0.40]], 0.009, M.hv));
  bus.add(lib.tube([[-0.95, 0.292, -0.025], [-1.08, 0.25, 0.06], [-1.14, 0.20, 0.34]], 0.009, M.hv));
  sys.add(bus);

  /* BMS: master in the rear bay, two monitor boards, sense harness */
  const bms = lib.part('bms', [0, 0.62, -0.28]);
  const master = lib.box(0.15, 0.018, 0.09, M.pcb);
  master.position.set(-1.13, 0.160, -0.52);
  bms.add(master);
  for (const mx of [-0.30, 0.55]) {
    const mon = lib.box(0.06, 0.010, 0.045, M.pcb);
    mon.position.set(mx, 0.290, -0.615);
    bms.add(mon);
  }
  bms.add(lib.tube(
    [[-1.06, 0.165, -0.55], [-0.60, 0.284, -0.615], [0.55, 0.288, -0.615], [1.00, 0.288, -0.60]],
    0.0035, M.plastic
  ));
  sys.add(bms);

  /* semiconductor disconnect + pyro backup, rear bay passenger side */
  const disc = lib.part('disconnect', [0, 0.5, 0.3]);
  const coldplate = lib.box(0.16, 0.012, 0.12, M.coolant);
  coldplate.position.set(-1.13, 0.157, 0.45);
  disc.add(coldplate);
  const sicBlock = lib.box(0.14, 0.04, 0.10, M.plastic);
  sicBlock.position.set(-1.13, 0.185, 0.45);
  disc.add(sicBlock);
  const fin = lib.fins(0.12, 0.014, 0.09, 7, 0.004, M.alu);
  fin.position.set(-1.13, 0.213, 0.45);
  disc.add(fin);
  const pyro = lib.box(0.055, 0.035, 0.045, M.hv);
  pyro.position.set(-1.00, 0.170, 0.45);
  disc.add(pyro);
  const loop = lib.torus(0.018, 0.004, M.plasticLt, 20, 8);
  loop.position.set(-1.00, 0.198, 0.45);
  disc.add(loop);
  sys.add(disc);

  /* lid: 0.9 mm skin, two rear burst discs, ghostable in x-ray */
  const lid = lib.part('lid', [0, 0.78, 0]);
  const lidPlate = lib.plate(W - 0.02, D - 0.02, 0.008, 0.05, M.castAlu);
  lidPlate.position.y = 0.297;   /* plate rises t/2..3t/2, so skin tops out at 0.309 */
  lib.shell(lidPlate);
  lid.add(lidPlate);
  for (const zs of [-1, 1]) {
    const burst = lib.cyl(0.016, 0.006, M.steel, 12);
    burst.position.set(-1.20, 0.3065, zs * 0.25);
    lid.add(burst);
  }
  sys.add(lid);

  return sys;
}
