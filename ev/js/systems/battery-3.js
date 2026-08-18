/* Gen 3 battery: cell-to-body. The tray is deleted: 44 bipolar blade cells
   bond directly between the rocker rails, the cabin floor panel is the pack
   lid, and the cell stack carries body shear. 132 kWh at 318 kg, against
   Gen 2 (js/systems/battery-2.js) at 118 kWh / 360 kg and Gen 1
   (js/systems/battery.js) at 95 kWh / 445 kg. Every part carries the
   integration bill: repair economics, insurance, end-of-life debt. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'battery-3',
  name: 'Battery pack · Gen 3',
  color: 0x4fc4d8,
  explode: [0, -1.15, 0],
  blurb: 'Cell-to-body: the tray is deleted, 44 bipolar blade cells bond between the rockers and carry the floor shear, and the cabin floor panel is the pack lid. 132 kWh at 318 kg, with the bill paid in repair economics, insurance premiums, and end-of-life debt.',
  parts: {
    cells: {
      name: 'Bipolar blade cells',
      tagline: 'Three cells share each can: the series connection is now a plate through-thickness, not a strap.',
      mass: 254,
      count: 44,
      specs: [
        ['Format', 'Blade, 1,400 x 135 x 46 mm, 5.8 kg'],
        ['Chemistry', 'Anode-free Li metal / Ni-rich NMC, sulfide (carried from Gen 2)'],
        ['Internal stack', '3 bipolar layers per blade; 132 series layers, 508 V nominal'],
        ['Capacity', '260 Ah per layer, 3.0 kWh per blade'],
        ['Energy density', '520 Wh/kg cell, 415 Wh/kg pack (Gen 2: 490 / 328)'],
        ['Face pressure', '0.3 MPa from can pre-tension (Gen 2: 2 MPa, external frames)'],
      ],
      how: 'Gen 2 connected 120 prismatics with 119 welded straps. Here most of those connections moved inside the can. In a bipolar stack one steel plate is the cathode collector of a layer on one face and the anode collector of the next layer on the other; current crosses the plate through its thickness, spread over the full 0.19 m² face, so the interconnect has effectively zero length, zero mass, and no weld. Only a solid electrolyte permits this: a shared liquid bath would ionically short every layer, which is why Gen 1 could never do it and why Gen 2 had to go solid first. Three layers put 11.6 V behind each can wall, and 44 blades in series reach 508 V through 43 short straps, the last exposed busbars in the pack.\n\nThe other Gen 2 tax this cell retires is the clamp. Gen 2 held 2 MPa on every cell face with twelve 68 kN tie-rod frames, 24 kg that stored nothing. Here the interface work moved into the materials: a compliant sulfide-polymer composite separator holds contact at 0.3 MPa, and that residual preload comes from the drawn steel can, tensioned over its own laminate at assembly like a shrink fit. The blade arrives as a rigid, self-clamped brick, which is exactly what allows it to be structural adhesive stock: bonded between the rocker rails and under the floor-lid, the 44 blades are the shear web of the body floor, finishing the migration Gen 1 started with a structural tray and Gen 2 continued with load-bearing stacks.',
      why: 'Every generation moved the series connection closer to the electrochemistry: Gen 1 welded thousands of fuse necks, Gen 2 cut that to 119 straps, Gen 3 makes most of them a shared wall. What stops it going further is scrap economics: a pinhole in any layer scraps the whole blade, so three layers is where the yield curve and the energy curve cross. The blade is also the repair quantum at 3 kWh, and once bonded into the body it rounds up to the whole floor.',
      fail: [
        'A pinhole in one layer scraps 3 kWh before assembly and strands 3 kWh after it; every blade is CT-scanned at the plant because there is no cell-level repair, and after cure no blade-level repair either.',
        'Dendrites carry over from Gen 2: plating still goes filamentary at low temperature, so the current map and the bath heater enforce the same rule, no fast charge until the pack is warm.',
        'End of life is a debt the design admits: blades release only when the debond primer expands at 190 °C, a full-body oven cycle, and the recycler still receives adhesive-skinned cans that Gen 2 never produced.',
      ],
      explode: [0, 0.34, 0],
    },
    rockerrails: {
      name: 'Rocker bond rails',
      tagline: 'The last of the tray: two extrusions that marry the cell stack to the body and carry the return current home.',
      mass: 19,
      count: 2,
      specs: [
        ['Material', '7003-T6 extrusion, 3 chambers'],
        ['Section', '95 x 60 mm against the rocker inner face'],
        ['Bond', 'Toughened epoxy, 3 mm bondline, + 28 flow-drill screws per side'],
        ['Integrated raceway', 'Laminated Al return busbar, 700 mm², isolated'],
        ['Torsional contribution', '+38% body stiffness (Gen 1: +24, Gen 2: +31)'],
      ],
      how: 'Gen 2 already thinned the tray to a fixture; Gen 3 deletes it and keeps only its edges. Each rail is a three-chamber extrusion bonded to the body rocker on its outer face and to the blade ends on its inner face, so a side-impact load runs rocker, rail, blade stack, rail, rocker with no tray floor in between. The chambers are the crush budget: they fold in sequence across 60 mm before intrusion reaches the first can wall, the same philosophy as the Gen 1 three-chamber rail, now mounted on the body instead of the pack. Flow-drill screws back up the epoxy against peel, because an adhesive-only joint that fails in a crash fails everywhere at once.\n\nThe rail also solves the problem the bipolar string created. With 44 blades in series along the car, the string terminals land at opposite ends of the pack, and the current has to get back. Rather than reintroduce a Gen 2 style spine busbar inside the pack, the return conductor laminates into an isolated raceway along the passenger-side rail: 700 mm² of aluminum riding a structure that was already going exactly where the current needs to go. One extrusion is now crash structure, bond flange, and conductor.',
      why: 'Integration priced honestly: the two rails weigh 19 kg where the Gen 2 tray weighed 56, and the missing metal did not vanish, it moved into cells that must now be trusted as structure and into an insurance table. The actuarial review sat inside the design loop for exactly that reason; the flow-drill screws exist because the peel-failure case priced out worse than their 1.4 kg.',
      fail: [
        'A side pole that bottoms all three chambers has the same consequence as Gen 2’s worst case, cells in the load path, but with no pack-out repair behind it: the shell is compromised, the write-off line moves in, and the premium tables already say so.',
        'An abraded raceway laminate puts pack potential one insulation layer from body ground; the isolation monitor watches exactly this seam, and it is the first place service looks on any isolation fault.',
        'Epoxy bondline creep under thermal cycling is watched by the sensing film strain bridges; drift beyond 0.2 mm re-torques nothing, because nothing here re-torques. It schedules a body jig inspection.',
      ],
      explode: [0, 0.06, 0.55],
    },
    floorlid: {
      name: 'Floor-lid',
      tagline: 'One panel, three jobs: pack lid, cabin floor, and the shear skin that closes the torsion box.',
      mass: 21,
      specs: [
        ['Material', 'AA5754, 1.1 mm, bonded top-hat stiffeners'],
        ['Replaces', 'Gen 2 pack lid, 16 kg and deliberately non-structural'],
        ['Attachment', 'Bonded perimeter and blade-top adhesive; structural'],
        ['Service access', 'One bolted hatch over the rear bay, nothing else'],
        ['Burst discs', '2x rear-facing, ducted below the bumper'],
      ],
      how: 'Gen 1 declared the pack the floor, and both ancestors kept one escape hatch: the lid. The Gen 1 lid (28 kg) and the Gen 2 lid (16 kg) were each the carpet base of the cabin, and each was deliberately non-structural so service could open the pack without unloading the body. This panel closes the escape hatch. It is the pressure and moisture boundary of the pack, the surface the carpet glues to, and the upper skin of the floor torsion box: bonded to the rails at its edges and to every blade top through a thermally conductive adhesive, it turns the cell field into a closed box section instead of an open tub with a dropped-in cover. That closure is where the +38% stiffness figure comes from.\n\nThe seat rails bolt to bosses that pass load through the panel into the blade tops beneath, so a hard belt pull anchors, ultimately, in the cell stack: the integration bet stated as bluntly as possible. Sealing changed with the job. The Gen 2 gasket, torque sequence, and leak-down reseal ritual are gone because there is no opening left to gasket; the panel bonds on once, a leak-down port confirms the cavity at the plant, and the only door into the pack is the bolted hatch over the rear bay, sized for the disconnect, the film aggregator, and the fluid fittings.',
      why: 'The panel weighs 21 kg against the 16 of the Gen 2 lid, and the 5 kg buys a promotion: a removable cover only had to seal, a torsion-box skin has to carry. The ledger that matters sits one level up. Gen 1 enclosed and braced its cells with 155 kg of tray, crossmembers, and lid; Gen 2 cut that to 96 with clamped stacks doing the bracing; this pack does it with 40, two rails plus this panel, and the body gets stiffer at every step: +24, +31, +38 percent. The real price is the one Gen 1 and Gen 2 both refused to pay: the pack can no longer be opened in service.',
      fail: [
        'Any internal fault outside the rear bay is unserviceable; the panel comes off by cutting the bond, which is body repair, not battery repair, and in most markets it totals the car.',
        'Distributed bond degradation between panel and blade tops softens the box quietly; the film strain grid lives on the underside of exactly this joint.',
        'A seat-anchor overload event now mandates a pack inspection, a sentence never written about Gen 1 or Gen 2.',
      ],
      explode: [0, 0.78, 0],
    },
    cooling: {
      name: 'Dielectric cooling gallery',
      tagline: 'The bottom 22 mm of the pack is liquid: every blade stands in the coolant instead of near it.',
      mass: 17,
      specs: [
        ['Concept', 'Partial immersion, 22 mm ester bath under all 44 blades'],
        ['Fluid', 'Synthetic ester, 16 L; 15 kg of the 17 kg is fluid'],
        ['Continuous capacity', '9 kW (Gen 2: 4, Gen 1: ~10)'],
        ['Circulation', '20 L/min through the front heat exchanger'],
        ['Cell window', '15 to 75 °C, carried from Gen 2'],
        ['Second duty', 'Vent-gas quench and fire suppression'],
      ],
      how: 'Gen 1 bought its thermals with hardware: 24 kg of brazed serpentine at 28 L/min visiting every cell row to hold a liquid chemistry under 45 °C. The Gen 2 edge plates were the opposite bet, elegant and mostly paid: with the sulfide ceiling at 75 °C, 4 kW of extraction plus the thermal mass of the pack could absorb a fast-charge session and repay it later. The bet failed in one specific place, back-to-back 350 kW sessions in high ambient, where the second charge derated. This gallery is the repair. The pack floor is a shallow tub of synthetic ester, electrically inert, and every blade stands 22 mm deep in it: heat leaves through the can base and the wetted skirt of both large faces with no plate, no gap filler, and no row-to-row gradient, and a 20 L/min loop cycles the bath through the front heat exchanger at 9 kW continuous, back within sight of the Gen 1 serpentine with 2 kg of hardware to its 24.\n\nThe honest ledger, because immersion is fashionable and rarely priced: the fluid alone weighs 15 kg against 9 kg for the entire Gen 2 cooling system, and what it buys is 5 kW of authority plus a base-temperature uniformity the sensing film can actually verify. The purchase only clears because the fluid moonlights. It is the pack fire suppressant: a venting blade injects its gas at the fluid line, where the ester quenches ejecta and cools the jet before the burst discs pass it rearward under the bumper. And in winter the loop runs backward, warming the bath from the heat pump so the whole field reaches the 15 °C fast-charge floor together, faster than the Gen 2 edge plates managed on their weakest flank.',
      why: 'Immersion won on the second function, not the first. As pure thermals, 8 extra kilograms for 5 kW is defensible arithmetic and no more; adding a quench layer under a cell field that can never again be opened or swapped is what made the bath the conservative choice rather than the exotic one.',
      fail: [
        'The pan under the fluid is a 2 mm boundary, not armor; strike protection belongs to the body floor and a sacrificial skid, and a breached pan is a fluid loss the level sensor reports before the isolation monitor has anything to say.',
        'Moisture gains a service-port path: wet fluid at a top-up would feed a sulfide chemistry that makes H2S from water, so the fill hardware is keyed and desiccant-capped, and the bath humidity telltale quarantines the pack exactly as the Gen 2 lid telltale did.',
        'Ester ages: oxidation thickens it and shaves the transfer coefficient a few percent a year, so the fluid is a scheduled service item on a pack that otherwise abolished service.',
      ],
      explode: [0, -0.35, 0],
    },
    sensefilm: {
      name: 'Cell-edge sensing film',
      tagline: 'The BMS became wallpaper: one printed film across the blade tops replaces the harness, the boards, and the load cells.',
      mass: 2,
      specs: [
        ['Construction', 'Printed polyimide laminate across all 44 blade tops'],
        ['Voltage taps', '132, one per layer (Gen 2: 120 per cell; Gen 1: 96 per group)'],
        ['Temperature', '216 printed RTD points (Gen 2: 16; Gen 1: 48)'],
        ['Strain', '88 bridges watching bondline preload (Gen 2: 12 load cells)'],
        ['Impedance', 'Online EIS per layer, carried from Gen 2'],
        ['Compute', 'One aggregator in the rear bay, dual film tails'],
      ],
      how: 'Bipolar blades create a sensing problem Gen 2 never had: two of every three series layers have no external terminal to probe. The film is the answer. Each blade laminates thin tap foils from its internal plates up to its top edge, and the pack-wide film lands on all 132 of them as it is rolled across the field, the way wallpaper lands on a wall. Printed RTD grids and strain bridges ride the same substrate, so temperature is measured at 216 points instead of 16, and bondline preload is watched at every blade instead of at twelve frames.\n\nThe compute stays an actuary, and a better-armed one. The Gen 2 playbook carries over whole: weekly EIS sweeps at rest, mid-frequency impedance rise as the weeks-early dendrite flag, cross-checks between electrical and mechanical witnesses so a lying sensor is caught by its disagreeing neighbor. What sharpens is resolution. A fault now localizes to one layer of one blade, and the strain grid sits on the exact adhesive joints the body depends on, so the same film that guards the electrochemistry also audits the structure. One printed part absorbed the monitor boards, the sense harness, the thermistors, and the load cells: 2 kg, the same as the Gen 2 electronics it replaces, running 436 channels where Gen 1 wired 144 and Gen 2 148. The temperature count tells the whole arc in one row: Gen 1 mapped its gradients with 48 thermistors, Gen 2 engineered the gradients away and cut to 16, Gen 3 prints 216 because a printed point is nearly free and a bath level fault deserves early witnesses.',
      why: 'A pack with no parallel paths, no service access, and a structural duty cannot be allowed a blind spot; foresight is the only protection layer left, so the sensing had to become as distributed as the risk. Printing it as one laminate is also the only way four hundred channels enter a sealed cavity: as two flat tails through the rear bay, not as a harness through a gland.',
      fail: [
        'The film bonds to the blade tops and the floor-lid bonds over it, so a recycling debond destroys the film by design, and a mid-life panel cut almost certainly tears it, adding the pack nervous system to the repair bill.',
        'Printed RTDs drift as the substrate ages; the EIS trace is the independent witness, and a thermally plausible but impedance-inconsistent reading flags the sensor, not the cell.',
        'EIS still needs rest, carried from Gen 2: a car that never parks long enough postpones its sweep, and coverage decays silently until the next long park.',
      ],
      explode: [0, 0.55, 0],
    },
    disconnect: {
      name: 'Semiconductor disconnect',
      tagline: 'Carried from Gen 2 whole: microseconds to open, no moving parts, and the pyro fuse still guarantees the air gap.',
      mass: 5,
      specs: [
        ['Switch', 'Back-to-back SiC MOSFET banks (carried from Gen 2)'],
        ['On-resistance', '0.6 mΩ; ~290 W at 700 A continuous'],
        ['Turn-off', '< 10 µs'],
        ['Cooling', 'Cold plate fed by the dielectric loop (Gen 2: glycol)'],
        ['Backup', 'Pyro fuse + manual service disconnect, under the hatch'],
      ],
      how: 'This is the one Gen 2 battery part carried forward whole, and the content of the carry is the argument. The SiC banks connect the 508 V string by ramping their gates as a current limiter, with no precharge hardware; they open in under 10 µs, cutting a bolted short before busbar inductance lets it climb past roughly 1,500 A. Nothing in the Gen 3 architecture asked for more speed or less resistance, and silicon that is already fast enough does not get faster by being redesigned. The changes are plumbing: the cold plate now taps the dielectric loop instead of a glycol branch, and the pack side lands on the rear blade terminal and the rail raceway directly.\n\nIts neighborhood changed more than it did. The disconnect, the pyro fuse, the manual service plug, the film aggregator, and the fluid fittings are now the entire serviceable content of the pack, gathered in the rear bay under the one bolted hatch in the floor-lid. Gen 1 spread service across a removable lid; Gen 2 shrank it to sealed procedures; Gen 3 shrinks it to a shoebox. Everything inside the box is chosen to be replaceable in under an hour, because everything outside the box is not replaceable at all.',
      why: 'Carrying a part is an engineering decision with the same weight as designing one. The honest reasons: its failure modes are known, its fleet history is a full generation deep, and the risk budget of this pack was spent on cells and structure. A generation that changes everything must hold something still, and the safety chain is the right thing to hold.',
      fail: [
        'Fails short, not open, carried and unchanged: an unclearable fault escalates to the pyro fuse, which is not resettable, though here that is an hour at the hatch rather than a pack drop.',
        'The cold plate shares the cell fluid loop, so a drained bath takes the disconnect cooling with it; die temperature sits ahead of bath level in the trip chain for exactly this case.',
        'Loss of the gate-driver supply remains an undetermined state; the watchdog fires the pyro rather than guess, exactly as Gen 2 decided.',
      ],
      explode: [0, 0.5, 0.3],
    },
  },
};

/* ── Geometry ── */

const B = P.battery;
const W = B.x[1] - B.x[0];      // 2.60 pack length
const D = B.z[1] - B.z[0];      // 1.44 pack width

const NBLADES = 44;
const PITCH = 0.052;
const X0 = -0.978;              // first blade center; rear bay lives behind it
const BLADE_T = 0.046, BLADE_H = 0.135, BLADE_L = 1.40;
const BLADE_Y = 0.2075;         // blade center height: spans 0.14 to 0.275

export function build() {
  const sys = new THREE.Group();

  /* cells: 44 bipolar blades spanning rocker to rocker, plus the 43
     blade-to-blade straps (the last exposed busbars) and the front
     take-off jumper into the rail raceway */
  const cells = lib.part('cells', [0, 0.34, 0]);
  const bladeGeo = new THREE.BoxGeometry(BLADE_T, BLADE_H, BLADE_L);
  const inst = new THREE.InstancedMesh(bladeGeo, M.cell, NBLADES);
  inst.castShadow = inst.receiveShadow = true;
  const dummy = new THREE.Object3D();
  for (let i = 0; i < NBLADES; i++) {
    dummy.position.set(X0 + i * PITCH, BLADE_Y, 0);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }
  cells.add(inst);
  for (let j = 0; j < NBLADES - 1; j++) {
    const strap = lib.box(0.04, 0.005, 0.06, M.busbar);
    strap.position.set(X0 + j * PITCH + PITCH / 2, 0.2785, j % 2 === 0 ? 0.60 : -0.60);
    cells.add(strap);
  }
  cells.add(lib.tube(
    [[1.258, 0.272, 0.56], [1.262, 0.281, 0.64], [1.245, 0.284, 0.705]],
    0.008, M.hv
  ));
  sys.add(cells);

  /* rocker bond rails: three-chamber extrusions reaching z ±0.78 to express
     the bond into the rockers; adhesive bead inboard, flow-drill screws on
     top, and the isolated HV return raceway on the passenger side only */
  for (const zs of [-1, 1]) {
    const rr = lib.part('rockerrails', [0, 0.06, zs * 0.55]);
    /* rails stop short of the wheel wells (|x| <= 1.08) so they never
       enter the tire volume at the four corners */
    const rail = lib.box(2.16, 0.17, 0.06, M.alu);
    rail.position.set(0, 0.215, zs * 0.75);
    rr.add(rail);
    const bead = lib.box(2.10, 0.13, 0.018, M.plastic);
    bead.position.set(0, 0.20, zs * 0.711);
    rr.add(bead);
    for (let i = 0; i < 6; i++) {
      const screw = lib.cyl(0.008, 0.008, M.darkSteel, 8);
      screw.position.set(-1.05 + i * 0.42, 0.304, zs * 0.75);
      rr.add(screw);
    }
    if (zs > 0) {
      const raceway = lib.box(2.16, 0.016, 0.008, M.busbar);
      raceway.position.set(0, 0.284, 0.7135);
      rr.add(raceway);
    }
    sys.add(rr);
  }

  /* floor-lid: one bonded panel, top-hat stiffeners, seat rails and pads,
     the rear-bay service hatch, and two rear-facing burst discs */
  const lid = lib.part('floorlid', [0, 0.78, 0]);
  const panel = lib.plate(W - 0.02, D - 0.02, 0.012, 0.05, M.castAlu);
  panel.position.y = 0.284;   /* plate rises t/2..3t/2: skin spans 0.290 to 0.302 */
  lib.shell(panel);
  lid.add(panel);
  for (const hx of [-0.5, 0.1, 0.7]) {
    const hat = lib.box(0.05, 0.007, 1.30, M.castAlu);
    hat.position.set(hx, 0.3045, 0);
    lid.add(hat);
  }
  for (const zz of [-0.52, -0.28, 0.28, 0.52]) {
    const rail = lib.box(0.75, 0.007, 0.045, M.alu);
    rail.position.set(0.32, 0.3065, zz);
    lid.add(rail);
    const pad = lib.box(0.10, 0.007, 0.05, M.alu);
    pad.position.set(-0.80, 0.3065, zz);
    lid.add(pad);
  }
  const hatch = lib.box(0.30, 0.005, 0.26, M.alu);
  hatch.position.set(-1.13, 0.3045, 0.38);
  lid.add(hatch);
  const hatchBolts = lib.bolts(8, 0.11, 0.005, M.darkSteel);
  hatchBolts.position.set(-1.13, 0.3045, 0.38);
  lid.add(hatchBolts);
  for (const zz of [-0.25, 0.25]) {
    const burst = lib.cyl(0.014, 0.006, M.steel, 12);
    burst.rotation.z = Math.PI / 2;
    burst.position.set(-1.291, 0.296, zz);
    lid.add(burst);
  }
  sys.add(lid);

  /* dielectric gallery: thin non-structural pan, the ester bath the blade
     bases stand in, supply and return manifolds, external stubs at the
     front face toward the thermal system */
  const cool = lib.part('cooling', [0, -0.35, 0]);
  const pan = lib.plate(2.32, 1.38, 0.004, 0.04, M.plastic);
  pan.position.set(0.12, 0.128, 0);
  cool.add(pan);
  const bath = lib.box(2.30, 0.028, 1.36, M.coolant);
  bath.position.set(0.12, 0.148, 0);
  cool.add(bath);
  cool.add(lib.tube([[1.26, 0.141, -0.62], [1.26, 0.141, 0.62]], 0.011, M.coolant));
  cool.add(lib.tube([[-1.03, 0.141, -0.62], [-1.03, 0.141, 0.62]], 0.011, M.coolantHot));
  for (const [zz, mat] of [[-0.10, M.coolant], [0.10, M.coolantHot]]) {
    const stub = lib.cyl(0.012, 0.05, mat, 12);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(1.275, 0.150, zz);
    cool.add(stub);
  }
  /* keyed fill standpipe with desiccant cap, rear bay, under the hatch */
  const fill = lib.cyl(0.010, 0.13, M.coolant, 12);
  fill.position.set(-1.02, 0.21, 0.30);
  cool.add(fill);
  const fillCap = lib.cyl(0.013, 0.010, M.plasticLt, 12);
  fillCap.position.set(-1.02, 0.279, 0.30);
  cool.add(fillCap);
  sys.add(cool);

  /* sensing film: one wallpaper sheet across every blade top, the rear-bay
     aggregator, and its two flat tails */
  const film = lib.part('sensefilm', [0, 0.55, 0]);
  const sheet = lib.box(2.28, 0.0016, 1.30, M.pcb);
  sheet.position.set(0.128, 0.2763, 0);
  film.add(sheet);
  const agg = lib.box(0.09, 0.014, 0.06, M.pcb);
  agg.position.set(-1.13, 0.145, 0.31);
  film.add(agg);
  film.add(lib.tube(
    [[-1.005, 0.276, 0.20], [-1.06, 0.22, 0.26], [-1.10, 0.155, 0.30]],
    0.0035, M.pcb
  ));
  film.add(lib.tube(
    [[-1.005, 0.276, 0.44], [-1.07, 0.21, 0.38], [-1.095, 0.155, 0.325]],
    0.0035, M.pcb
  ));
  sys.add(film);

  /* semiconductor disconnect, carried from Gen 2: cold plate now on the
     dielectric loop, SiC block, fins, pyro backup, service loop, and the
     two HV leads from the rear blade terminal and the rail raceway */
  const disc = lib.part('disconnect', [0, 0.5, 0.3]);
  const coldplate = lib.box(0.16, 0.012, 0.12, M.coolant);
  coldplate.position.set(-1.13, 0.142, 0.45);
  disc.add(coldplate);
  const sicBlock = lib.box(0.14, 0.04, 0.10, M.plastic);
  sicBlock.position.set(-1.13, 0.170, 0.45);
  disc.add(sicBlock);
  const fin = lib.fins(0.12, 0.014, 0.09, 7, 0.004, M.alu);
  fin.position.set(-1.13, 0.198, 0.45);
  disc.add(fin);
  const pyro = lib.box(0.055, 0.035, 0.045, M.hv);
  pyro.position.set(-1.02, 0.155, 0.45);
  disc.add(pyro);
  const loop = lib.torus(0.018, 0.004, M.plasticLt, 20, 8);
  loop.position.set(-1.02, 0.185, 0.45);
  disc.add(loop);
  disc.add(lib.tube(
    [[-0.985, 0.272, -0.56], [-1.10, 0.235, -0.15], [-1.17, 0.19, 0.20], [-1.145, 0.168, 0.38]],
    0.009, M.hv
  ));
  disc.add(lib.tube(
    [[-1.245, 0.284, 0.70], [-1.205, 0.24, 0.60], [-1.155, 0.19, 0.50]],
    0.009, M.hv
  ));
  sys.add(disc);

  return sys;
}
