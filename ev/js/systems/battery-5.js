/* Gen 5 battery: sodium-ion cell-to-pack, the value counterpoint. 82 kWh at
   390 kg against Gen 3 (js/systems/battery-3.js) at 132 kWh / 318 kg, Gen 2
   (js/systems/battery-2.js) at 118 / 360, and Gen 1 (js/systems/battery.js)
   at 95 / 445. Wired 116s2p so 360 V nominal lands on the Gen 1 preset
   partners unchanged: the drivetrain.js rear inverter (250 to 450 V, 355 V
   nominal) and the hv.js penthouse (240 to 403 V, 400 A busbars, 500 A DC
   port pins). First deliberate capability reduction on the ladder; every
   part carries the cost argument with numbers and names what was lost. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'battery-5',
  name: 'Battery pack · Gen 5 sodium',
  color: 0x4fc4d8,
  explode: [0, -1.15, 0],
  blurb: 'The counterpoint pack: 82 kWh of sodium-ion at $42 per kWh where the Gen 1 cells paid $95, wired 116s2p so 360 V lands on the Gen 1 electronics unchanged. Heavier and shorter-ranged than Gen 3 on purpose: for an urban fleet the invoice wins, and this pack is honest about which axis it optimizes.',
  parts: {
    tray: {
      name: 'Structural tray',
      tagline: 'The Gen 1 tub rerun in cheaper metal at half the mass, because the lessons are amortized now.',
      mass: 46,
      specs: [
        ['Material', 'AA6060-T5 extrusions + AA5052 floor'],
        ['Side rail section', '86 x 60 mm, 3 chambers (Gen 1 drawing)'],
        ['Floor gauge', '1.1 mm (Gen 1: 1.4)'],
        ['Crossmembers', '2 carried of the Gen 1 five; cells carry the shear'],
        ['Torsional contribution', '+27% body stiffness (Gen 1: +24, Gen 3: +38)'],
        ['Tray cost', 'About 60% of the Gen 1 tray at equal volume'],
      ],
      how: 'The tub is the Gen 1 drawing rerun in cheaper metal. Same 86 x 60 mm three-chamber rail section, same FIPG bead and 124-bolt seal pattern, same IP67 case; the alloy drops from AA6111 to AA6060-T5, which extrudes about 30 percent faster through cheaper dies and welds with less preparation. The certification path carries with the geometry: the side-pole case was argued once, in Gen 1, and rerunning a proven section in a softer alloy with 0.4 mm more wall re-enters that argument instead of opening a new one.\n\nThe mass tells the ladder story. Gen 1 spent 127 kg on tray plus crossmembers, Gen 2 cut to 56 by making clamped stacks carry shear, Gen 3 kept only 19 kg of rocker rail. This tray lands at 46 because the value pack inherits those lessons free of charge: the 232 prismatic cans bond to the floor as bricks and carry the panel shear the way the Gen 2 stacks did, so three of the five Gen 1 crossmembers and 0.3 mm of floor gauge are deleted against the original drawing. Amortized engineering is a discount that never appears on a spec sheet and always appears on the invoice.',
      why: 'A structural pack was the right idea at every price point, so the philosophy carries and only the metal gets cheaper. The honest ledger: this pack is 72 kg heavier than the Gen 3 flagship pack while holding 50 kWh less. In town, with regeneration recovering most of what mass costs, the penalty is about 0.4 kWh per 100 km, three percent; the cell-bill difference is roughly a factor of six. Two cars can both be correct, and this tub is what correct looks like when the duty cycle is urban and the metric is cost per kilometer.',
      fail: [
        '6060 gives up yield strength to buy extrusion speed; the crash margin is certified on the assembly with bonded cells sharing load, so a tray with rows removed for service is a fixture case, not a drivable one.',
        'A 1.1 mm floor dents where the Gen 1 1.4 mm floor shrugged; the composite skid layer underneath is standard equipment, the same admission Gen 2 made.',
        'The FIPG reseal risk carries from Gen 1 verbatim: a distorted bead after service is the top field leak path, and the torque-sequence procedure exists for it.',
      ],
      explode: [0, -0.42, 0],
    },
    cells: {
      name: 'Sodium-ion prismatic cells',
      tagline: 'Worse on the spec sheet, better on the invoice: 114 Ah of sodium at $42 per kWh against the Gen 1 cell\'s $95.',
      mass: 314,
      count: 232,
      specs: [
        ['Format', 'Prismatic can, 148 x 115 x 70 mm, 1.35 kg'],
        ['Chemistry', 'Na iron-manganese layered oxide / hard carbon'],
        ['Capacity', '114 Ah, 353 Wh per cell'],
        ['Energy density', '261 Wh/kg cell, 210 Wh/kg pack (Gen 1: ~280 / 213)'],
        ['Cell cost', '~$42 per kWh (Gen 1 NMC: ~$95; Gen 3 blade: ~$170, program estimate)'],
        ['Cycle life', '4,000 full cycles to 80% (Gen 1: 1,500+, Gen 2: ~1,000)'],
      ],
      how: 'A sodium ion is three times the mass of a lithium ion and carries the same single charge, so the periodic table sets a ceiling this cell was never going to break: the best sodium cathode stores fewer watt-hours per kilogram than its lithium equivalent at any state of the art. The cathode here is a layered oxide of iron and manganese; the anode is hard carbon, a disordered char that stores sodium in nanopores, because graphite, the workhorse of every lithium generation, barely accepts sodium at all. Four generations of cell development closed most of the gap: 261 Wh/kg at cell level sits seven percent under the Gen 1 4680 this pack displaces and roughly half the Gen 3 blade. The open-circuit voltage slopes steadily from 3.45 down to 2.2 V across the window, and that slope is quietly worth money in the BMS.\n\nThe invoice is the reason the part exists. Sodium carbonate trades around 30 cents a kilogram against lithium carbonate averaging twelve dollars and spiking past seventy within the memory of this program; the cathode metals are iron and manganese; the collectors on both electrodes are aluminum. There is no lithium, no cobalt, no nickel and no copper anywhere in the can, which does two things at once: it puts the cell near $42 per kWh where the Gen 1 NMC cell sat near $95, and it disconnects the pack price from every exchange that made lithium procurement a hedging exercise. The Gen 1 cell bill moved double-digit percent quarter to quarter with the metals index. This one moves with electricity and payroll, which is what a fleet buyer can actually forecast.',
      why: 'The capability reduction is deliberate and the arithmetic is short. An urban duty day of 260 to 300 km spends 40 to 48 kWh at city speeds; 82 kWh covers it with winter margin and a missed depot night in reserve. The Gen 3 pack carries 132 kWh, which on this duty cycle means 50 kWh of cells, roughly $9,000 at the blade rate, riding along as depreciating capital that never discharges. Over a 300,000 km fleet life this pack costs about a cent per kilometer in cell capital against the flagship\'s seven and a half. The flagship wins every highway comparison and should; the value car declines the comparison.',
      fail: [
        'The tub is full: at about 300 Wh/L the envelope that held 132 kWh of blades holds 82 of sodium, and there is no sodium flagship in this envelope. Pretending otherwise would need a second floor.',
        'The layered-oxide cathode is hygroscopic before assembly; the cell plant needs dry handling, milder than the Gen 2 dew-point rooms but real, and a humid lot shows up as first-cycle capacity scatter.',
        'Sodium plates the way lithium does if pushed hard enough cold; below -20 °C the BMS tapers DC charge current, down to a trickle at the -30 °C floor. The window is wider than any lithium generation managed, not infinite.',
      ],
      explode: [0, 0.34, 0],
    },
    busbars: {
      name: 'Aluminum busbars and collectors',
      tagline: 'No copper anywhere in the pack: sodium, unlike lithium, permits an aluminum anode collector.',
      mass: 5,
      specs: [
        ['Conductor', 'Laminated Al spine, 640 mm²'],
        ['Interconnects', '8 row strips + 7 jumpers, laser welded'],
        ['Continuous rating', '400 A (matches the Gen 1 penthouse busbars)'],
        ['Copper content', 'Zero; ~14 kg and ~$180 saved against a lithium build'],
        ['Cell fusing', 'Per-can fusible necks, 2p groups'],
      ],
      how: 'Lithium chemistry forces copper into every cell it touches: at anode potential lithium alloys with aluminum and destroys it, so every lithium generation carried copper foil on the anode side, about 22 kg of it across a pack this size. Sodium does not alloy with aluminum, so both collectors are aluminum foil and the pack-level conductors follow suit: 14 kg and roughly $180 leave the bill of materials, and with them the last tie between this pack and the copper index. The pack-level argument was already won in Gen 1, which ran laminated aluminum busbars for the mass; the sodium cell extends the same argument through the can wall to the electrode itself.\n\nThe 2p wiring buys back what Gen 2 and Gen 3 gave up. Their single strings had no parallel path, so one failed cell stopped the car and protection had to become prediction. Here each series group is a pair: a can that fails open leaves its partner carrying the group at half capacity, the BMS derates around the weak group, and the car finishes its route. The aluminum anode also unlocks a logistics line nobody sees on a spec sheet: with no copper to dissolve, the cells ship and store at a true zero volts, electrically inert, which relaxes freight class, insurance and warehousing between the cell plant and the pack line by single-digit dollars per kilowatt-hour. On an 82 kWh pack that is a few hundred dollars that never bought any hardware at all.',
      why: 'Every conductor in this pack is the same metal, so every weld is aluminum to aluminum, and the galvanic pair at a copper-aluminum joint, which Gen 1 had to engineer around, simply does not exist here. Cheapness by deletion is the most reliable kind: the part that is not fitted never fails, never corrodes and never appears on a warranty claim.',
      fail: [
        'A high-resistance weld self-heats under load, carried from Gen 1; end-of-line thermography at milliohm resolution remains the catch.',
        'Aluminum creeps under bolted joints, so the serviceable terminals torque through spring washers and get a recheck interval, a maintenance line copper never needed.',
        'A 2p fuse neck must clear on the short current one partner cell can deliver, half of what a Gen 1 ten-cell group threw at the same fault; neck sizing is verified per production lot because the margin is thinner.',
      ],
      explode: [0, 0.52, 0],
    },
    coolplate: {
      name: 'Bottom cooling plate',
      tagline: 'One brazed plate under everything: the temperature window widened, so the hardware shrank.',
      mass: 8,
      specs: [
        ['Construction', 'Single brazed two-sheet plate, full floor'],
        ['Continuous capacity', '5 kW (Gen 1: ~10, Gen 2: 4, Gen 3: 9)'],
        ['Flow', 'Series loop, up to 25 L/min (thermal-5; Gen 1: 28)'],
        ['Cell window', '-30 to 60 °C operating (Gen 1 NMC: 10 to 45)'],
        ['Preconditioning', 'None fitted; derated fast charge to -20 °C'],
      ],
      how: 'The cells stand on a single brazed plate through a thermally conductive filler, and heat leaves through the can base. That is the whole system. It is sized by the chemistry tolerance, not by the peak: the sodium cell runs from -30 to 60 °C where the Gen 1 NMC cell lived inside 10 to 45, and a pack that tolerates a twenty-degree excursion does not need hardware that prevents one. The plumbing follows the spec downward: one plate on thermal-5\'s single series loop, first in the flow order, sharing the one 25 L/min pump with the drive unit\'s oil cooler because packs like this one stopped demanding a circuit of their own.\n\nFast charge leans on the Gen 2 trick, run on cheaper hardware. A 500 A session dissipates about 9 kW in the 35 mΩ string; the plate removes 5 and the 390 kg of pack absorbs the rest, warming perhaps 12 degrees across the 20-minute session and paying it back on the road. Cold is where the sodium sheet turns honestly favorable: this pack accepts derated DC charge at -20 °C with no preheat, where an LFP fleet spends 5 to 8 kWh per vehicle per winter day preconditioning before the chargers will engage. Across a 200-vehicle depot that is a megawatt-hour a day of invisible consumption the sodium pack simply does not incur, and it is why the Gen 5 thermal system fits no battery preconditioning circuit at all.',
      why: 'Part count is the real cost driver in thermal systems, and the honest way to cut parts is to need less, not to promise less. Gen 2 shrank its cooling by moving the window and admitted the desert corner case it lost; this plate makes the same trade knowingly at a lower price point, and the corner cases land on a duty cycle, urban routes and depot nights, that rarely visits them.',
      fail: [
        'Back-to-back 500 A sessions in high ambient exceed the 5 kW recovery rate and the second session derates, the same admission Gen 2 made; rare on a depot duty cycle, routine on a road-trip one.',
        'One circuit means a restriction derates the whole pack; the four parallel circuits of Gen 1 failed more gracefully, and that redundancy is part of what the invoice deleted.',
        'Filler voids under a can leave it air-coupled and locally hot, carried from Gen 1; end-of-line thermography is still the catch.',
      ],
      explode: [0, -0.18, 0],
    },
    bms: {
      name: 'Battery management system',
      tagline: 'A bookkeeper again, not an actuary: gentle failure modes bought back a cheap computer.',
      mass: 2,
      specs: [
        ['Cell channels', '116 taps at ±2 mV, one per 2p group (Gen 1: 96 at ±1 mV)'],
        ['Temperature', '12 thermistors (Gen 1: 48, Gen 2: 16)'],
        ['SoC method', 'OCV lookup + coulomb count; no EIS, no load cells'],
        ['Isolation monitor', 'Continuous, 500 Ω/V warn, 100 Ω/V trip (carried from Gen 1)'],
        ['Balancing', 'Passive, 100 mA'],
        ['Electronics cost', '~$170 per pack, about a third of Gen 1'],
      ],
      how: 'The sloped voltage curve does the expensive work. Sodium layered oxide falls steadily from 3.45 to 2.2 V across the window, so a rested cell voltage reads state of charge to within a couple of percent from a lookup table and a current integral. Gen 1 ran a Kalman filter against an electrochemical model because NMC needed one; Gen 2 swept impedance spectra hunting dendrites weeks early; Gen 3 printed 436 channels of wallpaper because a sealed structural pack could afford no blind spot. This pack runs a bookkeeper: 116 taps at ±2 mV, twelve thermistors, passive balancing, the Gen 1 isolation monitor carried whole (500 Ω per volt logs a warning, 100 opens the contactors, the same thresholds hv.js quotes for the bus it watches), and firmware simple enough to validate in a fraction of the hours.\n\nWide guard bands are a chemistry purchase, not a software setting. A sodium cell dragged to zero volts is undamaged, so overdischarge is an event log entry rather than a warranty claim; the 60 °C ceiling sits far above anything the duty cycle produces; and the failure modes that justified the Gen 2 actuary, dendrites through a ceramic separator with no parallel path behind them, do not exist in a 2p liquid-electrolyte sodium string. Every guard band the chemistry widens shrinks the sensing, the firmware and the certification behind it, which is why the electronics bill lands near $170 where Gen 1 spent roughly three times that and Gen 3 several times more.',
      why: 'The BMS budget should scale with the price of being wrong. The Gen 2 and Gen 3 packs could be destroyed, or could strand the car, through faults only foresight would catch, so foresight was worth 24 kg of clamps and a printed nervous system. Shrinking the consequence let the value pack shrink the instrumentation with it, and that chain, gentle chemistry, small consequence, cheap computer, is the whole economic argument of this pack in miniature.',
      fail: [
        'Twelve thermistors map the pack coarsely; a single hot joint shows late, so the end-of-line weld thermography carries weight the fleet cannot re-verify in service.',
        '100 mA passive balancing converges slowly; a badly imbalanced pack levels over nights, not hours, and the driver sees the shortfall as missing range in the meantime.',
        'The wide guard bands assume genuine sodium gentleness; a wrong-lot or counterfeit cell inherits protections tuned for a chemistry it is not, which is why cell provenance sits inside the safety case, not the purchasing department.',
      ],
      explode: [0, 0.6, -0.25],
    },
    contactors: {
      name: 'Contactors and pyro fuse',
      tagline: 'Carried from Gen 1 unchanged: the value generation buys its safety chain second-hand and certified.',
      mass: 6,
      specs: [
        ['Main contactors', '2x 500 A, ceramic chamber (carried from Gen 1)'],
        ['Precharge', '50 Ω resistor + pilot contactor, carried'],
        ['Pyro fuse', 'Squib-fired, < 2 ms clear, carried'],
        ['Conduction loss', '~32 W at 400 A (Gen 2 SiC path: ~290 W at 700 A)'],
        ['Bus window', '250 to 403 V (drivetrain.js floor, hv.js ceiling)'],
      ],
      how: 'This is a deliberate step back down the ladder. Gen 2 replaced these contactors with a SiC semiconductor disconnect that opens in ten microseconds, and Gen 3 carried it; this pack un-carries it. What returns: the wake-up ritual of pilot contactor and 50 Ω precharge, the millisecond clearing time during which a bolted short climbs past ten kiloamps where the SiC path cut it near 1,500, and the weld-shut failure mode checked on every sleep cycle. What is gained: closed contacts conduct at roughly a third of the SiC path\'s 0.6 mΩ, about 32 W at 400 A where the semiconductor would dissipate near 96 W at the same current and 290 at its own 700 A rating, with no cold plate and no gate electronics, and a parts invoice in tens of dollars instead of hundreds. A pack that works eight-hour shifts pockets that conduction difference every working day.\n\nThe 116s2p string exists so this box could be carried unchanged. 116 is the largest series count whose 3.47 V per-cell charge ceiling stays under 403 V, the rating of the Gen 1 penthouse directly above (hv.js): its 400 A laminated busbars, its ceramic aux fusing, and its HVIL loop that opens these contactors within 200 ms of any connector lifting. The floor is the Gen 1 rear inverter (drivetrain.js), which accepts 250 to 450 V and reads 360 V nominal as a rounding error on its 355 design point; the DC pins of the carried charge port land here through the penthouse at 500 A sustained with thermistor derating. Every number in this paragraph belongs to a box this program did not have to buy, qualify or certify again.',
      why: 'Gen 3 argued that a generation changing everything must hold something still, and held the disconnect. Gen 5 inverts it: a generation changing the chemistry holds everything else still, and the safety chain, with a decade of fleet history and a stocked service network behind it, is the most valuable thing there is to hold. The novelty budget of this pack is spent in exactly one place, the cell, and this box is where that discipline is most visible.',
      fail: [
        'Contact welding from a missed precharge returns with the hardware; the stuck-closed check on every sleep cycle returns with it, carried from Gen 1.',
        'Millisecond clearing means downstream conductors keep their Gen 1 sizing for ten-kiloamp let-through; pairing this pack with cabling sized around a semiconductor disconnect would be a specification error, the exact cross-generation trap the Gen 4 retrospective documented.',
        'A fired pyro fuse is not resettable and the pack is inert until service, carried; on a fleet that is a tow line item priced into the availability model.',
      ],
      explode: [0, 0.5, 0.25],
    },
    lid: {
      name: 'Composite lid',
      tagline: 'A bolted lid again: the value pack brings back the one feature the flagship deleted, the ability to be opened.',
      mass: 9,
      specs: [
        ['Material', 'Glass-fiber SMC, 2.2 mm molded'],
        ['Attachment', 'Bolted, compression gasket (Gen 3: bonded, cut to open)'],
        ['Tooling', 'molds at roughly a tenth of a stamping die set'],
        ['Service quantum', 'One 29-cell row, ~10 kWh, in-car'],
        ['Burst discs', '2x rear-facing'],
      ],
      how: 'Sheet molding compound is chopped glass in a polyester matrix pressed hot into shape: heavier per square meter than aluminum at equal stiffness and dramatically cheaper to tool, which is the correct trade at fleet volume. Two properties ride along free. SMC is an electrical insulator, so the creepage spacers a metal lid needs above live busbars are deleted; and it molds in one shot with bosses and ribs that stamped aluminum needed secondary operations to earn. Nine kilograms closes the pack against water and dust, carries the two rear-facing burst discs, and does so with deliberately no structural ambition, reviving the Gen 1 argument: loads live in the tray, so the lid can come off in service without unloading the body.\n\nComing off in service is the point. Gen 3 bonded its floor-lid into the torsion box and admitted the price: any internal fault outside one hatch totaled the car in most markets. This lid unbolts against a reusable gasket, the row straps below unbolt after it, and the replaceable unit becomes a 29-cell row, about 10 kWh, swapped in-car in an afternoon at a depot workshop. On a 300,000 km fleet life, the bet that a pack never needs opening is one the flagship made and a value fleet cannot afford; this generation prices serviceability as a feature and pays nine kilograms and a gasket for it.',
      why: 'End of life is where sodium economics invert. An NMC pack retires holding nickel and cobalt worth real money, so recyclers pay for a Gen 1 pack; a sodium pack is iron, manganese, salt and aluminum, worth nearly nothing at the shredder, and its recycling is a cost the seller must own. The design answer is the second life the bolted architecture enables: rows that unbolt, a chemistry safe at zero volts with 4,000-cycle endurance, and depot storage racks that accept a retired row as-is. The residual value of this pack is its function, not its elements, and the lid is the part that keeps the function accessible.',
      fail: [
        'SMC creeps under gasket compression, so the perimeter bolts take a re-torque at first service; skip it and the leak path opens exactly where a fleet pack gets wet, at the pressure washer.',
        'Near-zero scrap value cuts both ways: an abandoned sodium pack is a disposal liability, not an asset, so the take-back contract is priced into the sale rather than assumed from salvage.',
      ],
      explode: [0, 0.75, 0],
    },
  },
};

/* ── Geometry ── */

const B = P.battery;
const W = B.x[1] - B.x[0];      // 2.60 pack length
const D = B.z[1] - B.z[0];      // 1.44 pack width

/* Cell field: 29 columns along x, 8 rows across z, 116s2p = 232 cans.
   The rear bay (x < -1.0) keeps the carried Gen 1 contactor block and the
   BMS master, under the hv.js penthouse exactly as Gen 1 arranged it. */
const NX = 29, NZ = 8;
const PX = 0.0762, PZ = 0.156;
const X0 = -0.955;
const CELL_W = 0.070, CELL_H = 0.115, CELL_D = 0.148;
const CELL_Y = 0.2155;          // spans 0.158 to 0.273

export function build() {
  const sys = new THREE.Group();

  /* tray: Gen 1 silhouette, thinner floor, two surviving crossmembers */
  const tray = lib.part('tray', [0, -0.42, 0]);
  const floor = lib.plate(W, D, 0.012, 0.05, M.castAlu);
  floor.position.y = 0.132;
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
  for (const cx of [-0.45, 0.35]) {
    const beam = lib.box(0.05, 0.022, D - 0.20, M.alu);
    beam.position.set(cx, 0.287, 0);
    tray.add(beam);
  }
  sys.add(tray);

  /* cooling: one thin plate under the whole cell field, stubs at the
     front face toward the Gen 5 simplified thermal loop */
  const cool = lib.part('coolplate', [0, -0.18, 0]);
  const plate = lib.plate(2.24, 1.26, 0.006, 0.03, M.coolant);
  plate.position.set(0.11, 0.148, 0);
  cool.add(plate);
  for (const [zz, mat] of [[-0.1, M.coolant], [0.1, M.coolantHot]]) {
    const stub = lib.cyl(0.014, 0.09, mat, 12);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(B.x[1] + 0.02, 0.155, zz);
    cool.add(stub);
  }
  sys.add(cool);

  /* cells: 232 instanced prismatic cans */
  const cells = lib.part('cells', [0, 0.34, 0]);
  const canGeo = new THREE.BoxGeometry(CELL_W, CELL_H, CELL_D);
  const inst = new THREE.InstancedMesh(canGeo, M.cell, NX * NZ);
  inst.castShadow = inst.receiveShadow = true;
  const dummy = new THREE.Object3D();
  let k = 0;
  for (let ix = 0; ix < NX; ix++) {
    for (let iz = 0; iz < NZ; iz++) {
      dummy.position.set(X0 + ix * PX, CELL_Y, (iz - (NZ - 1) / 2) * PZ);
      dummy.updateMatrix();
      inst.setMatrixAt(k++, dummy.matrix);
    }
  }
  cells.add(inst);
  sys.add(cells);

  /* busbars: aluminum spine, per-row strips, end jumpers, and the two
     HV take-off leads into the rear bay */
  const bus = lib.part('busbars', [0, 0.52, 0]);
  const spine = lib.box(2.18, 0.008, 0.055, M.busbar);
  spine.position.set(0.11, 0.281, 0);
  bus.add(spine);
  for (let iz = 0; iz < NZ; iz++) {
    const strip = lib.box(2.16, 0.005, 0.02, M.busbar);
    strip.position.set(0.11, 0.2765, (iz - (NZ - 1) / 2) * PZ);
    bus.add(strip);
  }
  for (let j = 0; j < NZ - 1; j++) {
    const jump = lib.box(0.03, 0.005, PZ, M.busbar);
    jump.position.set(j % 2 === 0 ? 1.20 : -0.975, 0.2765, (j - 3) * PZ);
    bus.add(jump);
  }
  bus.add(lib.tube(
    [[-0.98, 0.278, 0.03], [-1.06, 0.25, 0.20], [-1.10, 0.23, 0.36]],
    0.008, M.hv
  ));
  bus.add(lib.tube(
    [[-0.98, 0.278, -0.03], [-1.08, 0.245, 0.12], [-1.12, 0.225, 0.30]],
    0.008, M.hv
  ));
  sys.add(bus);

  /* BMS: master in the rear bay, four monitor boards on the cell tops */
  const bms = lib.part('bms', [0, 0.6, -0.25]);
  const master = lib.box(0.15, 0.018, 0.09, M.pcb);
  master.position.set(-1.14, 0.19, -0.45);
  bms.add(master);
  for (const mx of [-0.6, 0.0, 0.6, 1.05]) {
    const mon = lib.box(0.06, 0.012, 0.045, M.pcb);
    mon.position.set(mx, 0.28, -0.55);
    bms.add(mon);
  }
  bms.add(lib.tube(
    [[-1.07, 0.20, -0.47], [-0.6, 0.278, -0.55], [0.2, 0.278, -0.55], [1.0, 0.278, -0.55]],
    0.0035, M.plastic
  ));
  sys.add(bms);

  /* contactor block, carried from Gen 1: housing, two ceramic-chamber cans,
     precharge resistor, pyro fuse, manual service loop, and the two short
     terminal stubs rising toward the penthouse above */
  const cont = lib.part('contactors', [0, 0.5, 0.25]);
  const housing = lib.box(0.20, 0.10, 0.16, M.plastic);
  housing.position.set(-1.14, 0.21, 0.44);
  cont.add(housing);
  for (const zz of [0.39, 0.49]) {
    const can = lib.cyl(0.028, 0.055, M.steel, 16);
    can.position.set(-1.14, 0.276, zz);
    cont.add(can);
  }
  const precharge = lib.cyl(0.012, 0.05, M.darkSteel, 10);
  precharge.rotation.x = Math.PI / 2;
  precharge.position.set(-1.05, 0.185, 0.36);
  cont.add(precharge);
  const pyro = lib.box(0.045, 0.035, 0.045, M.hv);
  pyro.position.set(-1.0175, 0.20, 0.44);   /* flush to the housing; clear of the x -0.99 cell face */
  cont.add(pyro);
  const loop = lib.torus(0.018, 0.004, M.plasticLt, 20, 8);
  loop.position.set(-1.0175, 0.235, 0.44);
  cont.add(loop);
  for (const zz of [0.40, 0.48]) {
    const term = lib.tube(
      [[-1.20, 0.265, zz], [-1.22, 0.285, zz], [-1.23, 0.300, zz]],
      0.008, M.hv
    );
    cont.add(term);
  }
  sys.add(cont);

  /* lid: molded SMC panel, perimeter bolts, two rear burst discs */
  const lid = lib.part('lid', [0, 0.75, 0]);
  const lidPanel = lib.plate(W - 0.02, D - 0.02, 0.008, 0.05, M.plasticLt);
  lidPanel.position.y = 0.295;   /* plate rises t/2..3t/2: skin spans 0.299 to 0.307 */
  lib.shell(lidPanel);
  lid.add(lidPanel);
  for (const zs of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const bolt = lib.cyl(0.005, 0.006, M.darkSteel, 8);
      bolt.position.set(-1.2 + i * 0.4, 0.306, zs * 0.68);
      lid.add(bolt);
    }
  }
  for (const zz of [-0.25, 0.25]) {
    const burst = lib.cyl(0.014, 0.006, M.steel, 12);
    burst.rotation.z = Math.PI / 2;
    burst.position.set(-1.286, 0.296, zz);   /* r 0.014 tops at 0.310, on the envelope like battery-3 */
    lid.add(burst);
  }
  sys.add(lid);

  return sys;
}
