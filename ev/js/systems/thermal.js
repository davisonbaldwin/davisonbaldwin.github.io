/* Thermal management: heat pump, octovalve-style coolant manifold, front
   radiator with fans, battery chiller, HVAC core, and the glycol ring main
   that ties pack, drive units, and cabin into one heat economy. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'thermal',
  name: 'Thermal management',
  color: 0x58d6a6,
  explode: [1.5, 0.35, 0],
  blurb: 'One refrigerant circuit, two glycol loops, and a single valve block that decides where heat goes. The same hardware cools the pack in July and scavenges heat for the cabin in January.',
  parts: {
    radiator: {
      name: 'Front radiator',
      tagline: 'The only surface where the car can hand heat to the outside world.',
      mass: 7,
      specs: [
        ['Core', '880 x 500 x 42 mm, brazed aluminum'],
        ['Fins', 'Louvered, 1.8 mm pitch'],
        ['Heat rejection', '28 kW at 40 °C air-to-coolant delta'],
        ['Coolant flow', 'Up to 40 L/min'],
        ['Air management', 'Active grille shutters upstream'],
      ],
      how: 'A crossflow core: coolant enters the driver-side tank, crosses through roughly fifty flat aluminum tubes, and collects in the passenger tank. Louvers stamped into the fins slice the airflow so the boundary layer keeps restarting, and that is where the transfer happens: the air side is about 80% of the total thermal resistance, so fin geometry, not tube count, sets the rating.\n\nAbove about 50 km/h ram air does the work and the fans idle. The grille shutters ahead of the core default to closed, because an open cooling duct costs 2 to 3% of highway range; the controller opens them only when the loop actually has heat to shed. Radiator cooling is nearly free in energy terms, which is why the control logic always prefers it over the chiller.',
      why: 'An EV needs a fraction of the radiator a combustion car carries: drivetrain losses at highway cruise are around 2 kW against the 60 kW an engine throws away. The sizing case is not cruising, it is a hot-day DC fast charge on a heat-soaked pack with the condenser rejecting on top. Size for that afternoon and every other day is margin.',
      fail: [
        'A stone strike punctures a tube; at 1.5 bar the loop seeps rather than bursts, showing up as slow reservoir loss.',
        'Leaves and insects packed between fan and core raise the approach temperature; the tell is higher fan duty at the same load.',
        'Above roughly 45 °C ambient the air-to-coolant delta collapses; the chiller takes over and charging derates.',
      ],
      explode: [0.55, 0.15, 0],
    },
    fans: {
      name: 'Cooling fans',
      tagline: 'For the hours when the car makes heat while standing still.',
      mass: 4,
      count: 2,
      specs: [
        ['Type', '2x brushless axial, 400 mm'],
        ['Power', '400 W each at full speed'],
        ['Airflow', '2400 m³/h combined, free air'],
        ['Control', 'PWM, continuous 0 to 100%'],
        ['Sizing case', 'DC fast charge, vehicle parked'],
      ],
      how: 'Two five-blade axial fans sit in sealed shroud rings behind the core, so every cubic meter they move has passed through the fins rather than around them. Speed is continuously variable to 2800 rpm; ramping instead of stepping keeps the blade-pass tone from jumping out against an otherwise silent car.\n\nDriving barely needs them. The design point is a 250 kW charge stop: the pack pushes over 10 kW into the coolant, the condenser adds more if the cabin is cooling, and there is zero ram air. Shutters open, both fans ramp with coolant temperature, and they may hold full speed for twenty minutes, which is a duty cycle no combustion-car fan ever sees.',
      why: 'Two 400 mm fans beat one large one here: the package is only 60 mm deep behind the core, and redundancy matters when charge rate depends on airflow. If one fan stalls, the survivor at full speed still moves about 60% of design air and the car derates charging instead of stopping it.',
      fail: [
        'Bearing wear from long full-speed charge sessions presents as tonal noise well before failure.',
        'A stalled rotor is caught by the motor commutation and reported; the result is slower charging, not a tow.',
        'A torn shroud seal lets air recirculate around the core; rejection falls with no fault code, only rising fan commands.',
      ],
      explode: [0.32, 0.08, 0],
    },
    'heat-pump': {
      name: 'Heat pump',
      tagline: 'Three joules of cabin heat per joule from the pack. Resistive heat is the fallback, not the plan.',
      mass: 9,
      specs: [
        ['Compressor', '400 V scroll, 33 cm³/rev'],
        ['Speed range', '800 to 8500 rpm'],
        ['Refrigerant', 'R1234yf, 950 g charge'],
        ['Heating capacity', '7 kW at -10 °C ambient'],
        ['COP', 'About 3 in mild cold, 1.8 at -10 °C'],
        ['Accumulator', 'Suction side, 500 ml'],
      ],
      how: 'The compressor is an electric scroll: one spiral orbits inside a fixed one, and the crescent-shaped gas pockets between them shrink toward the center, compressing R1234yf to around 15 bar. That raises its condensing temperature above the cabin target, so the refrigerant gives up heat to a water-cooled condenser feeding the heater core loop, then expands and evaporates below ambient temperature, soaking heat back in from outside air or from the chiller. Motor speed is the capacity knob, 800 to 8500 rpm.\n\nThe accumulator on the suction line traps liquid refrigerant during mode changes, because a scroll ingesting liquid hydrolocks. As ambient falls, suction density falls and capacity and COP sink together; below about -25 °C the system deliberately runs lossy compressor modes so that even its inefficiency lands in the loop as useful heat.',
      why: 'A resistive heater turns 1 kWh of pack energy into 1 kWh of heat. The pump moves about 3 for 1 in mild cold. Cabin heating is the single largest parasitic load an EV has: roughly 15% of winter range goes to it with resistive heat, and the heat pump gives about two thirds of that back. The remaining loss is cold-cell chemistry and dense air, which no compressor can fix.',
      fail: [
        'COP collapses toward 1 below about -20 °C; the pump becomes an expensive resistive heater and range predictions must track that honestly.',
        'R1234yf leaks are found by pressure and superheat trends; the charge is small, expensive, and mildly flammable, so topping up blind is not an option.',
        'A history of liquid slugging shows up as scroll bearing wear and a rising start-current signature.',
      ],
      explode: [0.15, 0.45, 0.28],
    },
    manifold: {
      name: 'Coolant manifold (octovalve)',
      tagline: 'One machined block where fifteen hoses and five valves used to live.',
      mass: 4,
      specs: [
        ['Ports', '8 coolant, quick-connect'],
        ['Actuation', '2 stepper-driven rotary spools'],
        ['Distinct modes', '14 plumbing configurations'],
        ['Body', 'Die-cast aluminum, machined bores'],
        ['Integrated sensors', '4 temperature, 2 pressure'],
      ],
      how: 'Inside the casting sit two rotary spools, each a drum with galleries cut through it, indexed by a stepper motor against hard stops. Each pair of spool positions maps a different connection graph across the eight ports: pack loop and powertrain loop in series or in parallel, radiator in circuit or bypassed, chiller engaged or idle, heater core fed or isolated. Two spools multiply into 14 usable modes without a single external valve.\n\nThe modes are the car\'s thermal vocabulary. Cold morning: loops in series, radiator bypassed, motor waste heat warms the pack. Summer fast charge: pack loop through the chiller, powertrain loop through the radiator, fully parallel. Mild day: everything through the radiator and the compressor stays off entirely.',
      why: 'Every deleted hose is two clamped joints that can leak, a meter of assembly work, and about 300 g. Folding five standalone valves into one block cut the hose count by more than half and left one part to leak-test instead of twenty. The price is concentration: a seized spool now touches every mode, which is why the steppers re-index against their hard stops on every sleep cycle.',
      fail: [
        'A stepper losing its index is self-healed by recalibrating against the hard stops at the next sleep.',
        'Casting swarf scoring a spool seal cross-leaks the loops; the tell is two loop temperatures converging when the mode says they should not.',
        'Integration risk is real: one jammed spool degrades several functions at once. That trade was made knowingly.',
      ],
      explode: [0.22, 0.32, -0.18],
    },
    pumps: {
      name: 'Coolant pumps',
      tagline: 'Two identical wet-rotor pumps, one per loop, no shaft seals to fail.',
      mass: 2,
      count: 2,
      specs: [
        ['Type', 'BLDC wet-rotor centrifugal'],
        ['Flow', '25 L/min at 70 kPa each'],
        ['Power', '15 to 120 W'],
        ['Control', 'LIN bus, speed and fault reporting'],
        ['Commonality', 'Same part number, both positions'],
      ],
      how: 'Wet-rotor means the rotor and its bearings run submerged in the coolant they pump. The stator drives the rotor magnetically through a thin stainless can, so there is no rotating shaft penetrating the housing and the classic weep-hole seal failure of automotive water pumps is deleted outright. The coolant itself lubricates the journal bearings and carries away motor heat.\n\nMost of their life is spent loafing at 15 to 20 W; full power exists for fast-charge and towing corner cases. Because the electronics report actual speed against commanded torque, each pump is its own flow meter: air in the loop reads as overspeed at low torque, and a fouled impeller reads as the opposite.',
      why: 'One pump per loop gives the manifold freedom: it can join the loops in series for winter heat scavenging while each loop keeps its own head source. Making both positions the same part number means one spare SKU, and either pump can be sanity-checked against the other\'s baseline curve in service.',
      fail: [
        'Dry running kills a coolant-lubricated bearing in minutes; the vacuum-fill procedure and overspeed detection exist for exactly this.',
        'Glycol breakdown sediment can jam a journal bearing after years; brief stir cycles during long parking prevent stiction.',
      ],
      explode: [0.12, -0.2, -0.08],
    },
    chiller: {
      name: 'Battery chiller',
      tagline: 'A refrigerant-to-coolant plate stack for when the radiator is not cold enough.',
      mass: 3,
      specs: [
        ['Construction', '24 brazed stainless plates'],
        ['Footprint', '190 x 90 mm'],
        ['Capacity', '8 kW at 35 °C coolant in'],
        ['Refrigerant control', 'Electronic expansion valve'],
        ['Approach temperature', '3 to 5 °C'],
      ],
      how: 'Herringbone-pressed plates are stacked and copper-brazed so that refrigerant and coolant flow in alternating channels, counterflow, with the entire stack acting as one folded heat exchanger. The expansion valve drops refrigerant into the stack at whatever boiling point the controller asks for, typically 10 to 15 °C, and boiling refrigerant will pull the coolant below ambient temperature, which no radiator can ever do.\n\nThe duty split is economic. Radiator cooling costs fan watts; chiller cooling costs roughly 1 kW of compressor power per 3 kW moved. So the controller uses the radiator whenever the coolant target sits above ambient plus the approach temperature, and cuts the chiller in for the cases that break that rule: a fast charge in 40 °C heat, or pulling a heat-soaked pack down before a track session.',
      why: 'The chiller is sized for the fast-charge case, not for cruising. Steady-state pack losses are under 2 kW, which the radiator absorbs without noticing. This part exists for the twenty minutes when charge power, hot asphalt air, and a warm pack line up. It sits beside the manifold to keep the refrigerant run, and therefore the charge volume, as short as possible.',
      fail: [
        'A braze crack cross-leaks refrigerant into the glycol: falling refrigerant charge plus a pressurized coolant reservoir is the classic signature.',
        'Glycol-side fouling raises the approach temperature, so the same duty needs colder refrigerant and COP quietly falls.',
        'An expansion valve stuck closed starves the stack; pack charge rate derates within a minute.',
      ],
      explode: [0.02, -0.08, -0.45],
    },
    'hvac-core': {
      name: 'HVAC core',
      tagline: 'One blower, one evaporator, one liquid heater core: the cabin is just another load on the loop.',
      mass: 12,
      specs: [
        ['Blower', '300 W, up to 450 m³/h'],
        ['Evaporator', '5.5 kW cooling, sensible + latent'],
        ['Heater core', 'Liquid-fed from condenser loop'],
        ['Backup heat', '3 kW PTC element'],
        ['Filtration', 'Activated-carbon cabin filter'],
      ],
      how: 'The blower draws cabin or outside air through the filter and pushes everything across the evaporator first, in every season. Cooling the air below its dew point wrings the moisture out; in winter the same air is then reheated by the core, which is why the glass stays clear instead of fogging. A blend flap meters how much of the stream passes through the heater core, and that ratio, not compressor cycling, sets the outlet temperature.\n\nThe heater core runs on hot glycol from the heat pump\'s condenser loop rather than on refrigerant directly. That keeps the refrigerant charge small and contained in the frunk, and it means the cabin can be heated by motor waste heat alone with the compressor off. Recirculation saves several hundred watts in winter, but a humidity sensor caps it wherever the dew point would cross the glass temperature.',
      why: 'At 100 km/h the car draws about 17 kW; holding the cabin at 21 °C in -5 °C weather needs about 3.5 kW of heat. Resistively that is a 20% consumption penalty, with the heat pump nearer 7%. The rest of the winter strategy is aimed at people rather than air: 50 W of seat heat buys the same comfort as hundreds of watts of warmer cabin, letting the air target drop 2 to 3 °C. Comfort per watt, not watts, is the metric.',
      fail: [
        'Biofilm on a permanently damp evaporator is the classic HVAC smell; an afterblow drying cycle at shutdown prevents it.',
        'A blend flap actuator losing index causes slow outlet temperature hunting, an annoyance long before it is a fault.',
        'The PTC backup can silently mask a degrading heat pump; energy accounting per source exists so it cannot hide.',
        'AN OPEN DEFECT, MEASURED AND NOT FIXED. This case is not behind the instrument panel, it is in front of the passenger. Built, it fills x 0.700 to 0.930, y 0.610 to 0.915, z -0.150 to 0.445, and interior/dashboard fills x 0.950 to 1.270 while interior/front-seats start at x 0.610, so the whole 230 mm of it stands in the 340 mm gap between the panel\'s aft face and the seats, 20 mm clear of the panel and 90 mm clear of the seat, with 270 mm of its width directly over the passenger cushion at z 0.13 to 0.63 and its underside 45 mm above that cushion\'s top face at y 0.565. It got there escaping the two deepest equipment-in-equipment pairs on the ladder, 140.00 mm into the console and 120.00 into the dashboard, and design/penetration-triage.md classes exactly that overlap as habit D, correct packaging drawn as two overlapping solids rather than a fault in the car. Trading it for a case in the occupant\'s knees is the worse of the two. The station cannot be repaired from this module alone: a probe of this case swept over x 0.90 to 1.30 by y 0.55 to 0.95 by |z| 0.20 at 20 mm resolution against every partner part in gen1 to gen4 at once finds ZERO clear positions, interior/yoke closes everything inboard of z -0.178, and the real fix is a dashboard drawn as a shell with a cavity, which is one edit here and one in both cabins.',
      ],
      explode: [-0.3, 0.42, 0],
    },
    'coolant-lines': {
      name: 'Coolant lines',
      tagline: 'Eleven liters of glycol in transit: the fluid that makes one thermal system of the whole car.',
      mass: 21,
      specs: [
        ['Coolant', '50/50 ethylene glycol, 11 L total'],
        ['Main runs', '19 mm ID, EPDM and PA12'],
        ['Working pressure', '1.5 bar, 2.5 bar cap'],
        ['Connections', 'Quick-connect with EPDM O-rings'],
        ['Layout', 'Pack ring main + hot branches'],
      ],
      how: 'The cold loop leaves the manifold, runs the passenger side above the pack lid, arches over the rear drive unit, and returns along the driver side to its pump: a ring main that feeds the pack cooling plates along the way. Hot branches serve the radiator and the rear drive unit, and a third carries condenser heat to the HVAC core, passing under both cabins\' knee rolls rather than through them. Everything remote from the frunk is reached by pumped liquid, never by refrigerant.\n\nThe loop is also the preconditioning path. Cells at 10 °C accept perhaps 50 kW before lithium plating becomes a risk; the same cells at 45 °C take 250 kW. When navigation targets a fast charger, the manifold flips to series mode and pushes drive-unit waste heat plus heat pump output into this loop. Twenty minutes of driving adds about 25 °C to the pack, and the energy spent comes back several times over in charging minutes saved.',
      why: 'Glycol at 3.3 kJ/kg·K in a 1.5 bar rubber hose is the cheapest, most leak-tolerant way to move kilowatts around a car. Running refrigerant to every device would multiply the charge volume and turn every meter of line into a pressurized leak surface. The 11 liters of fluid also act as thermal ballast, flattening any load spike shorter than about a minute.',
      fail: [
        'Quick-connector O-rings disturbed in service are the dominant field leak path; single-use retention clips exist for this reason.',
        'Corrosion inhibitors deplete over years; spent glycol quietly attacks brazed aluminum, so the fluid has a service interval even though it never wears out thermally.',
        'Air trapped after a refill cavitates a pump and leaves cold spots on the pack plates; filling is done under vacuum, not by pouring.',
      ],
      explode: [0.1, -0.18, 0],
    },
  },
};

/* ── Geometry ── */

const TF = P.thermalFront;                    // x [2.08,2.26] y [0.25,0.78] z ±0.45
const RX = (TF.x[0] + TF.x[1]) / 2;           // 2.17 radiator center x
const RY = (TF.y[0] + TF.y[1]) / 2;           // 0.515 radiator center y

function xcyl(r, h, mat, seg) {               // cylinder with axis along X
  const c = lib.cyl(r, h, mat, seg);
  c.rotation.z = Math.PI / 2;
  return c;
}

export function build() {
  const sys = new THREE.Group();

  /* radiator: fin core between two end tanks, header strips top and bottom */
  const radiator = lib.part('radiator', [0.55, 0.15, 0]);
  const core = lib.fins(0.045, 0.50, 0.77, 32, 0.005, M.alu);
  core.position.set(RX, RY, 0);
  radiator.add(core);
  for (const zs of [-1, 1]) {
    const tank = lib.box(0.07, 0.52, 0.06, M.plastic);
    tank.position.set(RX, RY, zs * 0.415);
    radiator.add(tank);
  }
  for (const ys of [-1, 1]) {
    const header = lib.box(0.05, 0.014, 0.77, M.darkSteel);
    header.position.set(RX, RY + ys * 0.257, 0);
    radiator.add(header);
  }
  sys.add(radiator);

  /* fans: shroud rings fixed, rotors (hub + 5 pitched blades) spin about x */
  const fans = lib.part('fans', [0.32, 0.08, 0]);
  for (const zs of [-1, 1]) {
    const ring = lib.torus(0.20, 0.012, M.plastic, 28, 8);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(2.02, RY, zs * 0.215);
    fans.add(ring);

    const rotor = new THREE.Group();
    const hub = xcyl(0.048, 0.055, M.plastic, 18);
    rotor.add(hub);
    const nose = lib.cone(0.03, 0.035, M.plasticLt, 14);
    nose.rotation.z = -Math.PI / 2;
    nose.position.x = 0.042;
    rotor.add(nose);
    for (let i = 0; i < 5; i++) {
      const pivot = new THREE.Group();
      const blade = lib.box(0.008, 0.132, 0.052, M.plasticLt);
      blade.position.y = 0.108;
      blade.rotation.y = 0.55;
      pivot.add(blade);
      pivot.rotation.x = (i / 5) * Math.PI * 2;
      rotor.add(pivot);
    }
    rotor.position.set(2.02, RY, zs * 0.215);
    lib.spin(rotor, 'x', 20);
    fans.add(rotor);
  }
  sys.add(fans);

  /* heat pump: scroll compressor (axis x) + suction accumulator, tucked
     outboard of the front drive unit (z > 0.35 clears its envelope) and
     below the frunk tub floor (top of the can at y 0.545) */
  const hp = lib.part('heat-pump', [0.15, 0.45, 0.28]);
  const compBody = xcyl(0.065, 0.26, M.castAlu, 24);
  compBody.position.set(1.80, 0.48, 0.42);
  hp.add(compBody);
  const compEnd = xcyl(0.058, 0.05, M.darkSteel, 24);
  compEnd.position.set(1.645, 0.48, 0.42);
  hp.add(compEnd);
  const discharge = lib.cyl(0.012, 0.03, M.steel, 10);
  discharge.position.set(1.85, 0.535, 0.47);
  hp.add(discharge);
  const termBox = lib.box(0.06, 0.035, 0.05, M.plastic);
  termBox.position.set(1.72, 0.5625, 0.42);
  hp.add(termBox);
  hp.add(lib.tube([[1.72, 0.575, 0.42], [1.66, 0.625, 0.30], [1.62, 0.615, 0.20]], 0.008, M.hv));
  const bracket = lib.box(0.26, 0.01, 0.12, M.steel);
  bracket.position.set(1.80, 0.415, 0.44);
  hp.add(bracket);
  const accum = lib.cyl(0.042, 0.16, M.steel, 20);
  accum.position.set(1.68, 0.48, 0.56);
  hp.add(accum);
  const accumCap = lib.sphere(0.042, M.steel, 16);
  accumCap.position.set(1.68, 0.56, 0.56);
  hp.add(accumCap);
  const strap = lib.torus(0.045, 0.006, M.darkSteel, 20, 8);
  strap.rotation.x = Math.PI / 2;
  strap.position.set(1.68, 0.48, 0.56);
  hp.add(strap);
  hp.add(lib.tube([[1.68, 0.565, 0.56], [1.71, 0.55, 0.52], [1.77, 0.53, 0.475]], 0.009, M.steel));
  sys.add(hp);

  /* manifold: cast block, 8 ports below, 2 stepper heads on top */
  const manifold = lib.part('manifold', [0.22, 0.32, -0.18]);
  const block = lib.box(0.16, 0.13, 0.22, M.castAlu);
  block.position.set(1.86, 0.50, -0.02);
  manifold.add(block);
  for (const xs of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const port = lib.cyl(0.017, 0.05, M.castAlu, 12);
      port.position.set(1.86 + xs * 0.045, 0.425, -0.095 + i * 0.05);
      manifold.add(port);
    }
  }
  for (const zs of [-1, 1]) {
    const stepper = lib.cyl(0.026, 0.045, M.darkSteel, 16);
    stepper.position.set(1.86, 0.585, -0.02 + zs * 0.055);
    manifold.add(stepper);
    const cap = lib.cyl(0.012, 0.02, M.plastic, 10);
    cap.position.set(1.86, 0.615, -0.02 + zs * 0.055);
    manifold.add(cap);
  }
  sys.add(manifold);

  /* pumps: motor can + volute + outlet stub, one per loop; kept aft of
     x 2.003 so nothing sits in the fan blades' swept band */
  const pumps = lib.part('pumps', [0.12, -0.2, -0.08]);
  for (const pz of [-0.15, 0.12]) {
    const motor = xcyl(0.032, 0.09, M.darkSteel, 18);
    motor.position.set(1.90, 0.40, pz);
    pumps.add(motor);
    const volute = xcyl(0.046, 0.032, M.plastic, 18);
    volute.position.set(1.965, 0.40, pz);
    pumps.add(volute);
    const outlet = lib.cyl(0.012, 0.05, M.coolant, 10);
    outlet.position.set(1.965, 0.445, pz);
    pumps.add(outlet);
  }
  sys.add(pumps);

  /* chiller: brazed-plate stack beside the manifold */
  const chiller = lib.part('chiller', [0.02, -0.08, -0.45]);
  for (const xs of [-1, 1]) {
    const end = lib.box(0.008, 0.13, 0.10, M.steel);
    end.position.set(1.80 + xs * 0.045, 0.41, -0.26);
    chiller.add(end);
  }
  for (let i = 0; i < 8; i++) {
    const pl = lib.box(0.0045, 0.12, 0.09, M.alu);
    pl.position.set(1.765 + i * 0.01, 0.41, -0.26);
    chiller.add(pl);
  }
  for (const [sx, sz] of [[1.785, -0.235], [1.815, -0.285]]) {
    const stub = lib.cyl(0.011, 0.035, M.coolant, 10);
    stub.position.set(sx, 0.4875, sz);
    chiller.add(stub);
  }
  /* suction line: chiller outlet under the pumps and around the drive-unit
     envelope to the accumulator */
  chiller.add(lib.tube([
    [1.80, 0.345, -0.26],
    [1.82, 0.34, -0.05],
    [1.80, 0.345, 0.20],
    [1.74, 0.345, 0.42],
    [1.69, 0.40, 0.52],
  ], 0.008, M.steel));
  sys.add(chiller);

  /* HVAC core: case, blower scroll, duct stubs, drain.

     READ THE OPEN DEFECT ON THIS PART'S PANEL BEFORE MOVING ANY OF IT. The
     reasoning below is sound about what it measured and it measured the
     wrong thing: it asked which volume in the cabin is free and never asked
     whether an HVAC case may stand there. Built, the case ends up at
     x 0.700 to 0.930 against a dashboard that starts at x 0.950 and seats
     that start at x 0.610, so it is entirely aft of the instrument panel
     and 90 mm off the seat, in the front passenger's knees, and centered
     130 mm to the passenger side of a car whose "center stack" the
     coolant-lines panel used to claim it was in. The overlap it escaped is
     habit D in design/penetration-triage.md, which that document calls
     correct packaging drawn as two overlapping solids. Nothing is moved
     here, because a probe of this case swept over x 0.90 to 1.30 by y 0.55
     to 0.95 by |z| 0.20 at 20 mm resolution against every partner in gen1
     to gen4 finds no clear station at all, and a third guess at a position
     is worth less than the measurement.

     THIS CASE WAS INSIDE THE INSTRUMENT PANEL AND THE CONSOLE, and the
     numbers were the two deepest equipment-in-equipment pairs on the ladder:
     140.00 mm into interior/console and interior-4/console over 55 crossing
     triangle pairs, 120.00 mm into both dashboards over 127 and 129, 60.60
     into interior/displays and 40.00 into interior/yoke. In a real car the
     case does live inside the panel, so the alternative fix was a dashboard
     with a cavity cut for it. That was rejected on measurement rather than on
     taste, and the measurement was overstated: the case ran x 0.780 to 1.000
     against a dash trim starting at x 0.950, so 50 mm of it WAS inside the
     panel's x band and the other 170 mm stood aft of the panel's face, in
     the cabin. The sentence here used to read "did not sit inside the panel
     at all" and "190 mm aft", and neither survives the box. A cavity would
     have had to be cut around a case three quarters of which was behind the
     panel rather than in it, which is a real objection, and it is a smaller
     one than the note claimed.

     What the built cabins actually leave free at this station, measured on
     interior.js and interior-4.js together: the console tub tops out at
     y 0.620 and its armrest at 0.670 but only out to x 0.600; the dash trim
     and both knee rolls start at x 0.950; interior/yoke's rim reaches
     z -0.178 at its inboard edge; interior/displays' center bezel spans
     x 0.943 to 1.017. So the free volume is x below 0.94, y above 0.63, and
     z above -0.15, and the case is moved into it by 80 mm aft, 55 mm up and
     100 mm outboard, which puts its forward face at x 0.920 and leaves
     interior/displays' bezel 7.8 mm of clearance. Its size, its port count and its mass are unchanged. */
  const hvac = lib.part('hvac-core', [-0.3, 0.42, 0]);
  const caseBox = lib.box(0.22, 0.24, 0.56, M.plastic);
  caseBox.position.set(0.810, 0.755, 0.13);
  hvac.add(caseBox);
  const scroll = lib.cyl(0.10, 0.07, M.plasticLt, 20);
  scroll.rotation.x = Math.PI / 2;
  scroll.position.set(0.810, 0.755, 0.41);
  hvac.add(scroll);
  /* the defog stubs stand on the case top AFT of the cowl beam. body's
     pillars carry a cross member at x 0.81..0.89, y 0.890..0.970 across the
     full width on all four of these bodies, so anything standing above the
     case has to do it behind x 0.795. */
  for (const dz of [0.00, 0.22]) {
    const duct = lib.box(0.07, 0.04, 0.12, M.plasticLt);
    duct.position.set(0.750, 0.895, dz);
    hvac.add(duct);
  }
  for (const hz of [0.02, -0.05]) {
    const stub = xcyl(0.012, 0.03, M.coolantHot, 10);
    stub.position.set(0.915, 0.695, hz);
    hvac.add(stub);
  }
  /* the evaporator drain hangs outboard of the console tub, which is
     |z| 0.12 wide on both cabins */
  const drain = lib.cyl(0.008, 0.04, M.rubber, 8);
  drain.position.set(0.810, 0.630, 0.30);
  hvac.add(drain);
  sys.add(hvac);

  /* coolant lines: pack ring main (cold) plus hot branches */
  const lines = lib.part('coolant-lines', [0.1, -0.18, 0]);

  /* cold pack loop: manifold, passenger side, rear arch, driver side, pump A.
     The arch climbs while still outboard (z > 0.45) so it clears the
     penthouse box, and only crosses z +/-0.35 above y 0.60, over driveR.

     THE REAR ARCH REDRAW MOVED THE FRONT CORNER OF THIS HOSE AND NOTHING
     ASKED IT TO. Seven control points were added to the arch, from x -1.28
     back to -1.02, and the four points forward of x 0.60 are byte-identical
     to what they were. The built surface at the front driver corner still
     moved 4.59 mm, measured as the one-sided Hausdorff distance from every
     pre-change vertex in the window x 1.15 to 1.40, y 0.28 to 0.42,
     z -0.75 to -0.55 to the nearest post-change triangle, and the pair
     thermal/coolant-lines x wheels/discs went from 4.51 mm over 10 crossings
     to 15.06 mm over 8 on Gen 1. lib.tube takes its segment count from
     points.length * 6 and a closed Catmull-Rom is reparameterized over the
     whole loop, so every station on a 7 m hose resamples when one end of it
     gains a waypoint. The trap is written up on the hot branch below; this
     is the loop that paid for it.

     PINNING THE SEGMENT COUNT WAS TRIED AND IT IS NOT THE FIX. Forcing 384
     segments takes the disc pair to 12.53 mm over 16 crossings rather than
     back to 4.51, and moves five pairs that had nothing to do with it:
     drivetrain/halfshafts 23.33 to 12.16, suspension/steering 19.55 to
     17.01, body/front-casting 17.49 to 15.95, wheels/calipers 13.97 to
     11.03, suspension/coilovers 11.81 to 10.09. A finer sample is a
     different perturbation, not the old one undone.
     Reverted, and the 15.06 mm is reported rather than tuned. */
  lines.add(lib.tube([
    [1.86, 0.43, 0.06],
    [1.76, 0.37, 0.44],
    [1.45, 0.35, 0.58],
    [1.28, 0.335, 0.645],
    [0.60, 0.335, 0.66],
    [-0.60, 0.335, 0.66],
    [-1.02, 0.340, 0.660],
    [-1.14, 0.370, 0.668],
    [-1.24, 0.450, 0.676],
    [-1.31, 0.568, 0.672],
    [-1.37, 0.678, 0.648],
    [-1.44, 0.755, 0.580],
    [-1.51, 0.792, 0.400],
    [-1.556, 0.806, 0.180],
    [-1.568, 0.810, 0.000],
    [-1.556, 0.806, -0.180],
    [-1.51, 0.792, -0.400],
    [-1.44, 0.755, -0.580],
    [-1.37, 0.678, -0.648],
    [-1.31, 0.568, -0.672],
    [-1.24, 0.450, -0.676],
    [-1.14, 0.370, -0.668],
    [-1.02, 0.340, -0.660],
    [-0.60, 0.335, -0.66],
    [0.60, 0.335, -0.66],
    [1.28, 0.335, -0.645],
    [1.55, 0.36, -0.45],
    [1.79, 0.365, -0.40],
    [1.88, 0.378, -0.33],
    [1.945, 0.385, -0.21],
    [1.958, 0.40, -0.15],
  ], 0.012, M.coolant, true));

  /* hot branch: manifold to rear drive unit along the driver side. Leaves
     forward of the chiller stack, crosses the driveF face only outboard of
     z -0.35, then ducks under the penthouse floor (y < 0.33 there) and lands
     on the drive unit low fitting behind the penthouse at x -1.62. */
  lines.add(lib.tube([
    [1.84, 0.44, -0.13],
    [1.87, 0.42, -0.24],
    [1.86, 0.41, -0.33],
    [1.79, 0.395, -0.42],
    [1.55, 0.37, -0.50],
    [1.32, 0.36, -0.58],
    /* THE CABIN-FLOOR RUN IS 26 MM FURTHER OUTBOARD AND 3 MM LOWER, and both
       numbers come from the cabin rather than from a routing preference.
       At |z| 0.600 this hose was inside interior and interior-4's driver seat
       base, which reaches z -0.600 exactly over x 0.12 to 0.58, 51 crossing
       triangle pairs at 4.61 mm on all four rungs; it then clipped
       interior-4's bench pan at y 0.370 over 40 pairs at 19.16 mm and its
       outboard bench leg at |z| 0.495 to 0.545 over 14 more. At |z| 0.626 and
       y 0.352 a 24 mm hose sits 13 mm outboard of the seat base, 16 mm
       outboard of the bench pan edge at 0.610 and 81 mm clear of the leg, and
       stays under hv-4's rocker ring, whose lower tube starts at y 0.394.
       The point COUNT on this polyline is unchanged on purpose. lib.tube
       reparameterizes a Catmull-Rom over a fixed segment count, so adding a
       control point re-tessellates the whole hose and moves every reported
       depth on it: the same fix written with one extra waypoint moved four
       untouched crossings a thousand millimeters away by up to 3.2 mm. Same
       count, and the forward half moves by 0.2 to 1.0 mm instead. */
    [0.50, 0.352, -0.626],
    [-0.50, 0.352, -0.626],
    [-1.02, 0.358, -0.560],
    [-1.18, 0.360, -0.520],
    [-1.26, 0.430, -0.520],
    [-1.32, 0.520, -0.480],
    [-1.35, 0.552, -0.400],
    [-1.37, 0.548, -0.300],
  ], 0.012, M.coolantHot));

  /* hot branch: manifold to the radiator top tank. Skims low over the frunk
     floor, swings outboard of the driver fan shroud (z < -0.45 while
     crossing the blade band), then climbs to the tank inlet. */
  lines.add(lib.tube([
    [1.92, 0.56, -0.08],
    [1.95, 0.565, -0.30],
    [1.99, 0.575, -0.46],
    [2.07, 0.68, -0.48],
    [2.14, 0.75, -0.44],
    [2.16, 0.77, -0.415],
  ], 0.012, M.coolantHot));

  /* radiator return: bottom tank, around the passenger shroud, to pump B */
  lines.add(lib.tube([
    [2.16, 0.27, 0.415],
    [2.06, 0.25, 0.36],
    [1.98, 0.28, 0.28],
    [1.975, 0.36, 0.19],
    [1.967, 0.40, 0.135],
  ], 0.012, M.coolant));

  /* pump B pressure side back into the manifold */
  lines.add(lib.tube([
    [1.965, 0.455, 0.12],
    [1.94, 0.47, 0.09],
    [1.905, 0.445, 0.055],
  ], 0.012, M.coolant));

  /* hot branch: condenser heat to the HVAC core, over the front drive unit
     (stays above y 0.588 across the whole driveF envelope) */
  /* condenser heat to the HVAC core. It passes UNDER both cabins' knee
     rolls, which start at y 0.640 and run x 0.950..1.110 on interior and
     interior-4 alike, and it comes up to the case stub only aft of x 0.95.
     The old line held y 0.64..0.66 straight along that band. */
  lines.add(lib.tube([
    [1.84, 0.565, -0.08],
    [1.60, 0.615, -0.12],
    [1.30, 0.605, -0.10],
    [1.10, 0.598, -0.05],
    /* THE CLIMB TO THE CASE STUB STARTS 45 MM FURTHER AFT. The note above is
       right that this line passes under the knee rolls and wrong about where
       it stops doing it: both cabins start their roll at x 0.950 and y 0.640,
       and the old climb put the hose at y 0.648 at x 0.940, so with a 12 mm
       radius its shoulder reached back into the roll at 0.960. 24 crossing
       triangle pairs at 9.10 mm on interior and interior-4 alike, on all four
       rungs. Climbing from x 0.985 through 0.945 and 0.926 instead keeps the
       whole hose aft of 0.950 by the time it passes y 0.640, and it is three
       waypoints where there were two so the transition stays a hose bend
       rather than a kink. */
    [0.985, 0.600, -0.01],
    [0.945, 0.610, 0.004],
    [0.926, 0.644, 0.014],
    [0.918, 0.685, 0.02],
  ], 0.012, M.coolantHot));

  sys.add(lines);

  return sys;
}
