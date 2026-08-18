/* Gen 5 thermal: the simplified loop. First variant of the thermal slot
   since Gen 1 (thermal.js), and the first module on the ladder to step
   DOWN on purpose: one glycol loop, one pump, one fan, a 4-way valve in
   place of the octovalve, and a heating-only heat pump. 48 kg against
   Gen 1's 62. Preset partners, per design/gen5.md: battery-5 (wide-window
   sodium pack, no preconditioning), Gen 1 drivetrain (oil cooler landing,
   drivetrain.js), Gen 1 hv (355 V bus, hv.js). No em dashes anywhere. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'thermal-5',
  name: 'Thermal · Gen 5 simplified',
  color: 0x58d6a6,
  explode: [1.5, 0.35, 0],
  blurb: 'The thermal slot sat out three generations because heat was never its bottleneck; cost was, and it took the economics generation to say so. One loop, one pump, one fan, a three-position valve and a heating-only heat pump: 48 kg against Gen 1\'s 62, the octovalve\'s service bill deleted with the modes, and battery-5\'s wide temperature window signing for all of it.',
  parts: {
    radiator: {
      name: 'Front radiator',
      tagline: 'A smaller core than the flagship carries, because the pack behind it stopped being fussy.',
      mass: 5,
      specs: [
        ['Core', '620 x 400 x 42 mm, brazed aluminum'],
        ['Heat rejection', '16 kW at 40 °C air-to-coolant delta'],
        ['Coolant flow', 'Up to 25 L/min, single pump'],
        ['Air management', 'Fixed aperture, no grille shutters'],
        ['Gen 1 ancestor', '880 x 500 mm, 28 kW, 7 kg (thermal.js)'],
      ],
      how: 'Same crossflow construction as Gen 1, one size down: coolant crosses about forty flat aluminum tubes between two tanks, louvered fins own 80% of the thermal resistance, and ram air does the work above 50 km/h. What shrank the core is the customer behind it. battery-5\'s sodium cells run happily up toward 60 °C, well beyond where the flagship\'s lithium pack wants to live, so the loop can run hotter, the air-to-coolant delta stays wide on the hottest day, and 16 kW of rejection covers everything an urban duty cycle generates: roughly 2 kW of drivetrain loss at cruise (drivetrain.js), a few hundred watts from the pack in town, condenser heat on top in summer.\n\nThe active grille shutters are the deletion worth naming. The Gen 2 aero body fitted them because an open cooling duct costs 2 to 3% of highway range, and closed shutters bought that back. Gen 5 fits a fixed aperture sized for the hot-day worst case and pays the duct drag whenever the car moves fast. At 120 km/h that is a real 2 to 3% penalty against the flagship. At a 25 km/h city average, cooling drag is a rounding error against rolling resistance and accessory load, and the shutter actuator, its linkage, its position sensor and its winter ice-jam warranty claims are all gone.',
      why: 'The chiller does not exist in this generation, so this core is the only cooler the car has, and it is still smaller than Gen 1\'s. That is not bravado, it is the pack contract: a chemistry that tolerates heat converts directly into aluminum you do not buy, and the sizing case moves from "protect the pack on the worst afternoon" to "derate the charge and let the wide window carry it".',
      fail: [
        'A stone strike seeps at 1.5 bar rather than bursting, same as Gen 1; the difference is there is no chiller behind it, so a lost radiator now means limp-home cooling, not degraded cooling.',
        'Debris packed between fan and core shows as rising fan duty at the same load; one fan makes the signal cleaner than Gen 1\'s pair, and the margin behind it thinner.',
        'Above about 45 °C ambient the delta collapses and DC charging derates hard; the flagship\'s chiller covered this afternoon, the value car waits it out.',
      ],
      explode: [0.55, 0.15, 0],
    },
    fan: {
      name: 'Cooling fan',
      tagline: 'One 450 mm fan where Gen 1 fitted two: the redundancy protected a duty this car rarely sees.',
      mass: 2,
      count: 1,
      specs: [
        ['Type', 'Single brushless axial, 450 mm'],
        ['Power', '350 W at full speed'],
        ['Airflow', '1900 m³/h free air'],
        ['Control', 'PWM, continuous 0 to 100%'],
        ['Gen 1 ancestor', '2x 400 mm, 2400 m³/h, 4 kg'],
      ],
      how: 'One five-blade axial fan in a sealed shroud ring covers the whole core, so every cubic meter it moves has passed through the fins. Driving needs almost none of it; the design point is the parked charge. And here the duty cycle does the engineering: this car\'s fleet day ends on the 11 kW depot AC charger (the same onboard charger hv.js carries), which puts a few hundred watts of heat into an 82 kWh pack, an amount the core sheds with the fan barely turning. The 250 kW charge stop that sized Gen 1\'s twin fans is this car\'s exception, a few stops a month, not a nightly event.\n\nGen 1 bought two fans partly for package depth and partly for redundancy: lose one, and charging derates instead of stopping. Gen 5 spends neither. A single larger fan is cheaper than two smaller ones by the price of a motor, a shroud and a harness branch, roughly $40 and 2 kg on the invoice, and if it stalls the car still drives, still AC charges overnight, and derates DC charging deeply until service. That is a regression, it is priced, and on this duty cycle it lands on the right side of the trade.',
      why: 'Redundancy is a cost decision like any other. The flagship needs airflow guaranteed at all times because its charging model assumes the highway; the value car\'s charging model assumes the depot, where a derated stop costs minutes of a night the car was parked anyway.',
      fail: [
        'A stalled rotor is caught by motor commutation and reported; the consequence is a deep DC charge derate, not a tow, and overnight AC charging is unaffected.',
        'Bearing wear from long full-speed sessions announces itself tonally, exactly as on Gen 1, but there is no second fan to carry the load while parts arrive.',
        'A torn shroud seal recirculates air around the core; rejection falls with no fault code, only rising fan commands at the same coolant temperature.',
      ],
      explode: [0.32, 0.08, 0],
    },
    valve: {
      name: '4-way coolant valve',
      tagline: 'Three positions instead of fourteen modes: the octovalve\'s vocabulary cut to the sentences a fleet car actually says.',
      mass: 2,
      specs: [
        ['Ports', '4 coolant, quick-connect'],
        ['Actuation', '1 stepper spool, 3 indexed positions'],
        ['Modes', '3, against the Gen 1 octovalve\'s 14'],
        ['Body', 'Glass-filled nylon cartridge, serviceable'],
        ['Service cost', 'About $40 and 20 minutes; octovalve replacement runs four figures'],
      ],
      how: 'One rotary spool, indexed by one stepper against hard stops, connects four ports into three arrangements. Heat: radiator bypassed, heater core in circuit, so every watt the car makes, drive-unit loss and condenser output alike, arrives in the cabin. Cool: radiator in, heater out, compressor off when ambient air is cold enough and on when it is not. Reheat: radiator and heater both in circuit, for dehumidified defrost on damp mornings. The re-index-on-sleep logic is carried from Gen 1\'s spools unchanged.\n\nThe deleted modes each have a price, and the content owes them honestly. The chiller circuit is gone, so no valve position can put the pack below ambient: on a 35 °C day a DC fast charge derates by roughly a third once the pack warms through, and battery-5\'s heat tolerance is the only reason that is survivable rather than crippling. Loop separation is gone, so pack and drive unit share one temperature: behind a hard highway pull the pack runs 5 to 8 °C warmer than the flagship\'s split loops would hold it, a cycle-life tax worth a fraction of a percent per year in town and more if the car lives at 130 km/h. And preconditioning is gone as a mode because it is gone as a need: battery-5 accepts DC charge cold, at temperatures that would plate a lithium pack.',
      why: 'This is the slot\'s first variant since Gen 1, and the reason is in the failure statistics, not the physics. The octovalve was never the bottleneck of any performance generation, so Gens 2 through 4 carried it untouched; it is, however, a warranty line item, and warranty incidents scale with state count. Fourteen modes across two coordinated spools is fourteen firmware paths multiplied by every seal and sensor feeding them, and one seized spool degrades several functions at once, a risk Gen 1 accepted knowingly. Three positions on one spool can be tested exhaustively, fails to a defined position, and when it does fail it is a $40 cartridge swap, not a manifold-and-refrigerant service visit.',
      fail: [
        'A stepper losing its index self-heals against the hard stops at the next sleep cycle, carried from Gen 1.',
        'A worn spool seal cross-leaks radiator flow into the heater branch; the tell is a cabin that cannot quite hold target on a mild day.',
        'The honest limit is the missing mode itself: nothing this valve can do puts the pack below ambient. That is a design decision, and on the hottest charging days it is felt.',
      ],
      explode: [0.22, 0.32, -0.18],
    },
    pump: {
      name: 'Coolant pump',
      tagline: 'The same wet-rotor pump Gen 1 fitted twice, fitted once.',
      mass: 1,
      count: 1,
      specs: [
        ['Type', 'BLDC wet-rotor centrifugal'],
        ['Flow', '25 L/min at 70 kPa'],
        ['Power', '15 to 120 W'],
        ['Control', 'LIN bus, speed and fault reporting'],
        ['Part number', 'Identical to Gen 1 (thermal.js), quantity halved'],
      ],
      how: 'Wet-rotor, exactly as on Gen 1: rotor and bearings run submerged in the coolant, driven magnetically through a stainless can, so no shaft seal exists to weep. The part is carried at the part-number level, which is the cheapest kind of engineering there is: the tooling is amortized, the failure modes have years of field history, and every service point already stocks it. Because the electronics report speed against torque, the pump doubles as the loop\'s flow meter: overspeed at low torque means air, the opposite means a fouled impeller.\n\nWhat changed is the count. Gen 1 ran one pump per loop because its manifold could split the circuit in two, and each half needed its own head. This valve has no split modes, so the second loop does not exist and neither does its pump. The single unit sits behind the radiator outlet and pushes the whole series circuit at about 10 L/min, the operating point the stacked drop of plate, cooler and radiator leaves of the 25 L/min rating, and the same figure battery-5 quotes at its cooling plate. It spends its life at 15 to 20 W; the 120 W corner exists for the parked summer charge.',
      why: 'The deletion is not really the pump, it is the mode that justified the pump; once the architecture drops loop separation, the hardware saving of roughly $60 and a kilogram follows for free. Keeping the Gen 1 part number instead of tooling a cheaper pump was deliberate: a new SKU costs more in validation than it could ever save at this volume.',
      fail: [
        'Dry running kills a coolant-lubricated bearing in minutes; vacuum filling and overspeed detection carry over from Gen 1.',
        'This is now a single point of failure: a dead pump stops the only loop, and the car limps on the thermal mass of 8 liters of glycol, minutes at city load, less on a climb.',
        'Glycol sediment stiction after long parking is prevented by brief stir cycles, same as Gen 1.',
      ],
      explode: [0.12, -0.2, -0.08],
    },
    'heat-pump': {
      name: 'Heat pump (heating only)',
      tagline: 'One refrigerant direction, one customer: the cabin keeps its heat pump, the pack loses every refrigerant service it never needed.',
      mass: 8,
      specs: [
        ['Compressor', 'Scroll, 27 cm³/rev, on the 355 V bus'],
        ['Supply', 'Fused thermal spur in the Gen 1 penthouse (hv.js)'],
        ['Refrigerant', 'R1234yf, 700 g'],
        ['Heating capacity', '5 kW at -10 °C ambient'],
        ['COP', 'About 3 in mild cold, 1.8 at -10 °C'],
        ['Battery circuits', 'None: no chiller, no preconditioning (battery-5)'],
      ],
      how: 'The circuit runs one way and never reverses: compressor, water-cooled condenser dumping into the glycol loop, expansion, then one of two evaporators chosen by a pair of cheap solenoid shutoffs rather than a mode manifold. In winter the front-of-stack outside coil evaporates refrigerant against ambient air and the condenser heat lands in the heater core: that is the heat pump, about 3 joules of cabin heat per joule from the pack in mild cold. In summer the cabin coil in the carried HVAC core evaporates instead, plain air conditioning, and the condenser heat leaves through the radiator via the 4-way valve. Heating only means the pump serves one customer: no refrigerant ever touches the battery loop, because the chiller plate is deleted and the preconditioning circuit was never built. battery-5\'s sodium cells need neither chilling below ambient on this duty cycle nor warming before a charger.\n\nThe economics of keeping it are the counterexample that keeps Gen 5 honest, because a compressor is not cheap and the cull spared it anyway. Cabin heating is the largest parasitic load an EV has, and a fleet car works through winter by the hour: against the 3 kW PTC element it backstops, a COP of 3 hands back about 2 kW for every heating hour, and a thousand winter working hours a year is roughly 2 MWh of electricity annually at depot tariffs. The hardware premium over an A/C-only circuit is a few hundred dollars, once. This generation deletes what does not pay and keeps what does, and this box pays.',
      why: 'The flagship\'s refrigerant circuit is a switchyard because its lithium pack has a narrow comfort band that must be defended in both directions, hot and cold. battery-5 widened the band and the plumbing followed it out the door: what remains is the one refrigerant job with an unarguable payback. Resistive heat turns 1 kWh into 1 kWh; this box turns 1 into about 3, and on a car bought on cost per kilometer that ratio is the point.',
      fail: [
        'Below about -20 °C the COP slides toward 1 and the PTC in the HVAC core carries the difference; range predictions track it honestly, the same physics Gen 1 owned.',
        'R1234yf leaks are found on pressure and superheat trends; the 700 g charge is smaller than Gen 1\'s 950 and just as unforgiving to top up blind.',
        'Liquid slugging at evaporator changeover is trapped by the suction accumulator; shrinking the accumulator was studied for cost and rejected, a hydrolocked scroll is not a $12 saving.',
      ],
      explode: [0.15, 0.45, 0.28],
    },
    'hvac-core': {
      name: 'HVAC core',
      tagline: 'Carried from Gen 1 without a drawing change: the cheapest part in this system is the one nobody touched.',
      mass: 12,
      specs: [
        ['Blower', '300 W, up to 450 m³/h'],
        ['Evaporator', '5.5 kW cooling, sensible + latent'],
        ['Heater core', 'Liquid-fed from the condenser loop'],
        ['Backup heat', '3 kW PTC element'],
        ['Status', 'Unchanged from Gen 1 (thermal.js), zero new tooling'],
      ],
      how: 'Mechanically identical to Gen 1: the blower draws cabin or outside air through the filter and across the evaporator in every season, wringing moisture out below the dew point, and a blend flap meters how much of the stream reheats through the liquid-fed heater core. That ratio sets outlet temperature, and it is why the glass stays clear in winter. Recirculation logic, the humidity cap against fogging, and the shutdown afterblow cycle all carry over verbatim.\n\nCarrying a part is engineering too, and it is the cheapest kind: a validated HVAC case represents tooling, airflow development and noise work that the value generation re-spends not at all. The one number that changed is upstream of it: the heater core now sees a 5 kW condenser loop instead of 7, so on the coldest mornings the blend logic reaches for the PTC a little earlier. That is a firmware constant, not a part, and it cost nothing.',
      why: 'The case, blower and cores were already commodity-priced when Gen 1 chose them; there was no cheaper rung below to step down to. Deleting the carbon filter or thinning the blower would save single dollars and surface in every shift review as complaints. Gen 5 cuts where cost lives, and it did not live here.',
      fail: [
        'Biofilm smell on a permanently damp evaporator is prevented by the afterblow drying cycle, carried from Gen 1.',
        'A blend flap actuator losing index hunts the outlet temperature slowly, an annoyance long before it is a fault.',
        'The PTC can silently mask a degrading heat pump, so per-source energy accounting is carried too; on a car sold on running cost, a hidden threefold heating bill is a warranty claim in waiting.',
      ],
      explode: [-0.3, 0.42, 0],
    },
    'coolant-lines': {
      name: 'Coolant lines',
      tagline: 'Eight liters in one series loop: pack, drive unit, valve, and nothing that exists twice.',
      mass: 18,
      specs: [
        ['Coolant', '50/50 ethylene glycol, 8 L (Gen 1: 11 L)'],
        ['Topology', 'Single series loop, no split modes'],
        ['Main runs', '19 mm ID, EPDM and PA12'],
        ['Working pressure', '1.5 bar, 2.5 bar cap'],
        ['Drive unit landing', 'Gen 1 oil cooler plate, 11 kW (drivetrain.js)'],
      ],
      how: 'Out of the pump the loop crosses the valve, runs the passenger side above the pack lid feeding battery-5\'s single brazed cooling plate, ducks under the penthouse, and lands on the rear drive unit\'s oil-to-coolant plate, the same 11 kW exchanger at the same stub positions drivetrain.js has carried since Gen 1, with the rear inverter\'s cold plate teed off the same run. It returns along the driver side. The order is deliberate: the pack gets the coolest coolant first, the drive unit\'s oil circuit tolerates the few degrees the pack adds, and the front induction unit needs nothing because Gen 1 sealed it for life. One loop, nine hoses landing on four valve ports; Gen 1 filled the octovalve\'s eight from two loops and a chiller branch, and every hose is two clamped joints, a meter of assembly labor, and about 300 g.\n\nWhat this loop no longer does is the flagship\'s most celebrated trick. Gen 1\'s lines were the preconditioning path: flip the manifold to series, push motor and compressor heat forward, and add 25 °C to a lithium pack before a fast charger, because cold lithium plates at high current. battery-5 charges cold, so the errand is deleted along with the liters, the second pump, and the modes that ran it. Three liters less glycol also means 3 kg less mass and less thermal ballast: load spikes reach the valve sooner than they did on Gen 1, and the wide-window pack absorbs them without comment.',
      why: 'Hose count is the honest unit of thermal cost, which is why Gen 1 folded five valves into one block and why Gen 5 goes further and deletes the circuits themselves. The range ledger, stated plainly: on a cold highway WLTP the flagship\'s full system holds a 3 to 5% edge over this one, shutters, split loops and chiller each earning their keep at speed. On the 25 km/h urban cycle this car was bought for, the gap closes to about 1%, inside tire-pressure noise, and the invoice difference never closes.',
      fail: [
        'Quick-connector O-rings disturbed in service remain the dominant field leak path; single-use retention clips carry over from Gen 1.',
        'One loop means one leak drains the whole system; there is no second circuit to limp on, only the low-coolant derate.',
        'Air left after a careless refill cavitates the single pump; filling is vacuum-only, and the procedure is the one Gen 1 wrote.',
      ],
      explode: [0.1, -0.18, 0],
    },
  },
};

/* ── Geometry ── */

const TF = P.thermalFront;              // x [2.08, 2.26], y [0.25, 0.78], z ±0.45
const RX = 2.17;                        // radiator center x
const RY = 0.50;                        // radiator center y

function xcyl(r, h, mat, seg) {         // cylinder with axis along X
  const c = lib.cyl(r, h, mat, seg);
  c.rotation.z = Math.PI / 2;
  return c;
}

export function build() {
  const sys = new THREE.Group();

  /* radiator: smaller fin core between two tanks, headers top and bottom */
  const radiator = lib.part('radiator', [0.55, 0.15, 0]);
  const core = lib.fins(0.042, 0.40, 0.62, 26, 0.005, M.alu);
  core.position.set(RX, RY, 0);
  radiator.add(core);
  for (const zs of [-1, 1]) {
    const tank = lib.box(0.07, 0.44, 0.06, M.plastic);
    tank.position.set(RX, RY, zs * 0.345);
    radiator.add(tank);
  }
  for (const ys of [-1, 1]) {
    const header = lib.box(0.05, 0.014, 0.62, M.darkSteel);
    header.position.set(RX, RY + ys * 0.207, 0);
    radiator.add(header);
  }
  sys.add(radiator);

  /* single fan: shroud ring fixed, rotor (hub + 5 pitched blades) spins on x */
  const fan = lib.part('fan', [0.32, 0.08, 0]);
  const ring = lib.torus(0.225, 0.013, M.plastic, 30, 8);
  ring.rotation.y = Math.PI / 2;
  ring.position.set(2.02, RY, 0);
  fan.add(ring);
  const rotor = new THREE.Group();
  const hub = xcyl(0.052, 0.055, M.plastic, 18);
  rotor.add(hub);
  const nose = lib.cone(0.032, 0.038, M.plasticLt, 14);
  nose.rotation.z = -Math.PI / 2;
  nose.position.x = 0.044;
  rotor.add(nose);
  for (let i = 0; i < 5; i++) {
    const pivot = new THREE.Group();
    const blade = lib.box(0.008, 0.15, 0.056, M.plasticLt);
    blade.position.y = 0.122;
    blade.rotation.y = 0.55;
    pivot.add(blade);
    pivot.rotation.x = (i / 5) * Math.PI * 2;
    rotor.add(pivot);
  }
  rotor.position.set(2.02, RY, 0);
  lib.spin(rotor, 'x', 18);
  fan.add(rotor);
  sys.add(fan);

  /* 4-way valve: nylon cartridge block, 4 ports below, ONE stepper on top */
  const valve = lib.part('valve', [0.22, 0.32, -0.18]);
  const block = lib.box(0.11, 0.09, 0.11, M.plastic);
  block.position.set(1.86, 0.48, -0.02);
  valve.add(block);
  for (const xs of [-1, 1]) {
    for (const zs of [-1, 1]) {
      const port = lib.cyl(0.016, 0.05, M.plasticLt, 12);
      port.position.set(1.86 + xs * 0.042, 0.425, -0.02 + zs * 0.042);
      valve.add(port);
    }
  }
  const stepper = lib.cyl(0.026, 0.045, M.darkSteel, 16);
  stepper.position.set(1.86, 0.5475, -0.02);
  valve.add(stepper);
  const cap = lib.cyl(0.012, 0.02, M.plastic, 10);
  cap.position.set(1.86, 0.578, -0.02);
  valve.add(cap);
  sys.add(valve);

  /* single pump: motor can + volute + outlet, aft of the fan blade band */
  const pump = lib.part('pump', [0.12, -0.2, -0.08]);
  const motor = xcyl(0.032, 0.09, M.darkSteel, 18);
  motor.position.set(1.90, 0.40, 0.10);
  pump.add(motor);
  const volute = xcyl(0.046, 0.032, M.plastic, 18);
  volute.position.set(1.965, 0.40, 0.10);
  pump.add(volute);
  const outlet = lib.cyl(0.012, 0.05, M.coolant, 10);
  outlet.position.set(1.965, 0.445, 0.10);
  pump.add(outlet);
  sys.add(pump);

  /* heat pump: scroll compressor + accumulator + water condenser + outside
     coil at the front of the stack. Outboard of driveF (z > 0.35), under
     the frunk floor. One-way circuit: no chiller anywhere. */
  const hp = lib.part('heat-pump', [0.15, 0.45, 0.28]);
  const compBody = xcyl(0.055, 0.22, M.castAlu, 24);
  compBody.position.set(1.80, 0.48, 0.42);
  hp.add(compBody);
  const compEnd = xcyl(0.05, 0.045, M.darkSteel, 24);
  compEnd.position.set(1.6675, 0.48, 0.42);
  hp.add(compEnd);
  const termBox = lib.box(0.05, 0.03, 0.045, M.plastic);
  termBox.position.set(1.76, 0.55, 0.42);
  hp.add(termBox);
  /* 355 V feed from the penthouse spur direction (hv.js) */
  hp.add(lib.tube([[1.76, 0.565, 0.42], [1.68, 0.62, 0.30], [1.63, 0.61, 0.20]], 0.008, M.hv));
  const bracket = lib.box(0.24, 0.01, 0.11, M.steel);
  bracket.position.set(1.79, 0.42, 0.43);
  hp.add(bracket);
  const accum = lib.cyl(0.038, 0.14, M.steel, 20);
  accum.position.set(1.68, 0.47, 0.56);
  hp.add(accum);
  const accumCap = lib.sphere(0.038, M.steel, 16);
  accumCap.position.set(1.68, 0.54, 0.56);
  hp.add(accumCap);
  hp.add(lib.tube([[1.68, 0.545, 0.56], [1.72, 0.53, 0.50], [1.76, 0.51, 0.46]], 0.008, M.steel));
  /* water-cooled condenser plate stack above the compressor */
  const cond = lib.box(0.09, 0.11, 0.05, M.steel);
  cond.position.set(1.72, 0.63, 0.40);
  hp.add(cond);
  for (const zz of [0.378, 0.422]) {
    const stub = lib.cyl(0.01, 0.03, M.coolantHot, 10);
    stub.position.set(1.72, 0.695, zz);
    hp.add(stub);
  }
  /* discharge line: compressor to condenser */
  hp.add(lib.tube([[1.90, 0.52, 0.43], [1.85, 0.565, 0.42], [1.77, 0.60, 0.41]], 0.008, M.steel));
  /* outside coil: thin finned panel at the very front of the stack */
  const coil = lib.fins(0.018, 0.34, 0.52, 20, 0.004, M.alu);
  coil.position.set(2.24, RY, 0);
  hp.add(coil);
  /* liquid line to the coil and suction return to the accumulator,
     both swung outboard (z > 0.30) around the fan blade band */
  hp.add(lib.tube([
    [1.72, 0.68, 0.44],
    [1.90, 0.66, 0.50],
    [2.10, 0.58, 0.42],
    [2.22, 0.52, 0.30],
  ], 0.006, M.steel));
  hp.add(lib.tube([
    [2.22, 0.38, 0.30],
    [2.05, 0.36, 0.48],
    [1.85, 0.38, 0.55],
    [1.70, 0.40, 0.56],
  ], 0.009, M.steel));
  sys.add(hp);

  /* HVAC core at the firewall, carried from Gen 1: case, blower scroll,
     duct stubs, heater stubs, drain */
  const hvac = lib.part('hvac-core', [-0.3, 0.42, 0]);
  const caseBox = lib.box(0.22, 0.24, 0.56, M.plastic);
  caseBox.position.set(0.89, 0.70, 0.03);
  hvac.add(caseBox);
  const scroll = lib.cyl(0.10, 0.07, M.plasticLt, 20);
  scroll.rotation.x = Math.PI / 2;
  scroll.position.set(0.89, 0.70, 0.31);
  hvac.add(scroll);
  for (const dz of [-0.10, 0.12]) {
    const duct = lib.box(0.07, 0.04, 0.12, M.plasticLt);
    duct.position.set(0.89, 0.84, dz);
    hvac.add(duct);
  }
  for (const hz of [-0.08, -0.15]) {
    const stub = xcyl(0.012, 0.03, M.coolantHot, 10);
    stub.position.set(0.995, 0.64, hz);
    hvac.add(stub);
  }
  const drain = lib.cyl(0.008, 0.04, M.rubber, 8);
  drain.position.set(0.89, 0.575, -0.10);
  hvac.add(drain);
  sys.add(hvac);

  /* coolant lines: one series loop plus the heater branch */
  const lines = lib.part('coolant-lines', [0.1, -0.18, 0]);

  /* supply: valve, passenger side above the pack lid, under the penthouse,
     landing on the Gen 1 oil cooler cold stub (drivetrain.js, x -1.42 area) */
  lines.add(lib.tube([
    [1.86, 0.43, 0.03],
    [1.78, 0.375, 0.40],
    [1.50, 0.35, 0.56],
    [1.28, 0.335, 0.645],
    [0.60, 0.335, 0.66],
    [-0.60, 0.335, 0.66],
    [-1.24, 0.335, 0.645],
    [-1.31, 0.325, 0.54],
    [-1.35, 0.295, 0.30],
    [-1.38, 0.27, 0.14],
    [-1.40, 0.246, -0.055],
  ], 0.012, M.coolant));

  /* return: oil cooler hot stub, driver side, back up to the valve.
     Crosses the driveF x-band only outboard (z < -0.35) or above it. */
  lines.add(lib.tube([
    [-1.40, 0.246, 0.015],
    [-1.38, 0.27, -0.16],
    [-1.35, 0.30, -0.34],
    [-1.31, 0.33, -0.52],
    [-1.24, 0.335, -0.645],
    [-0.60, 0.335, -0.66],
    [0.60, 0.335, -0.66],
    [1.28, 0.335, -0.645],
    [1.60, 0.365, -0.50],
    [1.78, 0.39, -0.40],
    [1.84, 0.415, -0.20],
    [1.86, 0.43, -0.07],
  ], 0.012, M.coolantHot));

  /* valve to radiator top tank, around the fan shroud at z -0.3 */
  lines.add(lib.tube([
    [1.90, 0.525, -0.06],
    [1.96, 0.575, -0.22],
    [2.04, 0.66, -0.32],
    [2.12, 0.72, -0.34],
    [2.155, 0.705, -0.34],
  ], 0.012, M.coolantHot));

  /* radiator bottom tank back to the pump inlet */
  lines.add(lib.tube([
    [2.155, 0.30, 0.34],
    [2.06, 0.27, 0.30],
    [1.99, 0.30, 0.21],
    [1.968, 0.35, 0.13],
    [1.965, 0.375, 0.105],
  ], 0.012, M.coolant));

  /* pump pressure side into the valve */
  lines.add(lib.tube([
    [1.965, 0.45, 0.10],
    [1.945, 0.468, 0.075],
    [1.912, 0.452, 0.04],
  ], 0.012, M.coolant));

  /* heater branch: condenser to the HVAC core, above the driveF envelope */
  lines.add(lib.tube([
    [1.72, 0.70, 0.40],
    [1.60, 0.68, 0.20],
    [1.45, 0.66, 0.00],
    [1.20, 0.65, -0.08],
    [1.02, 0.64, -0.08],
  ], 0.012, M.coolantHot));

  /* heater return to the valve, staying above y 0.58 across driveF */
  lines.add(lib.tube([
    [0.995, 0.64, -0.15],
    [1.20, 0.63, -0.21],
    [1.50, 0.635, -0.22],
    [1.72, 0.625, -0.19],
    [1.80, 0.57, -0.12],
    [1.845, 0.48, -0.05],
  ], 0.012, M.coolant));

  sys.add(lines);

  return sys;
}
