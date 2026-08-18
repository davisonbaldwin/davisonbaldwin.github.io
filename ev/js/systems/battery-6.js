/* Gen 5 apex battery. NAMING: the id and filename use -6 because the -5 id
   belongs to the demoted value study; every user-facing label says Gen 5
   (see design/gen5-apex.md).

   Anode-free bipolar stack: 210 series layers in five self-clamped bricks,
   150 kWh at 300 kg, 810 V nominal. Cell-to-body carried from battery-3:
   envelope x [-1.30, 1.30], y [0.13, 0.31], z [-0.72, 0.72], rocker rails
   to z +-0.78 with |x| <= 1.08 (they never enter the wheel wells).

   Preset partners, reconciled per design/retro-gen4.md and gen5-apex.md:
   - drivetrain-6: 480 kW across three motors = 593 A at 810 V nominal.
   - hv-4 (binding): converter input 300 to 870 V, so the string charges to
     861 V and stops; its pack feed begins at the floor-lid hatch at
     (-1.13, 0.315, 0.38); its DC port pins carry 630 A.
   - thermal-6: two-phase immersion. This pack provides the fluid galleries
     (liquid feed stub at (1.27, 0.15, 0.10), vapor return stub at
     (1.27, 0.27, -0.10), design heat load 25 kW at the 630 A plateau);
     thermal-6 owns the fluid, the condenser, and the gallery pressure. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'battery-6',
  name: 'Battery pack · Gen 5 apex',
  color: 0x4fc4d8,
  explode: [0, -1.15, 0],
  blurb: 'The apex pack: 150 kWh at 300 kg, five bipolar bricks in one 810 V string. The series interconnect became a shared plate face, the coolant boils exactly where the heat appears, and every frontier number wears its maturity label: anode-free is pilot line, full-pack bipolar is extrapolated, and the content states what has to become true.',
  parts: {
    bricks: {
      name: 'Bipolar stack bricks',
      tagline: 'Five bricks, 210 layers, one string: the series connection is a plate face, and the busbar is nearly extinct.',
      mass: 256,
      count: 5,
      specs: [
        ['Format', 'Brick, 420 x 135 x 1,300 mm; 42 bipolar layers each'],
        ['Chemistry', 'Anode-free Li metal / Li-rich Mn cathode, sulfide separator (lineage: Gen 2, Gen 3)'],
        ['String', '210s, 810 V nominal, 630 to 861 V window'],
        ['Capacity', '185 Ah; 30 kWh per brick, 150 kWh total'],
        ['Energy density', '586 Wh/kg cell, 500 Wh/kg pack (Gen 3: 520 / 415)'],
        ['Maturity', 'Anode-free: pilot line. Full-pack bipolar: extrapolated'],
      ],
      how: 'A bipolar plate is one sheet of steel doing two jobs: cathode collector of the layer on its forward face, anode collector of the layer behind it. Current crosses the plate through its thickness, spread over the full 0.18 m² face, so the series interconnect has no length, no weld, and effectively no resistance. The ladder walked here one rung at a time: Gen 1 gathered 960 cylinders through collector plates and thousands of fuse necks, Gen 2 cut the interconnect to 119 welded straps, Gen 3 folded three layers behind each can wall and got down to 43 straps. This pack finishes the walk: 42 layers per brick, four vapor gaps, eight jumper plates. The entire exposed conductor set of a 150 kWh pack weighs under two kilograms. A liquid electrolyte made this architecture impossible for a century, because a shared bath is a shared ionic medium: any two layers wetted by the same liquid self-discharge through it. The sulfide separator conducts ions only through its 20 µm thickness, and the immersion fluid outside the bricks is aprotic and ionically inert, which is why this pack can stand in its coolant without recreating the short the liquid era could never design out.\n\nThe brick, not the pack, is the mechanical quantum, and the reason is arithmetic. The plated lithium layer is the state of charge: 185 Ah moves 48 grams of lithium per layer, about 0.5 mm of thickness, so a 42-layer brick breathes roughly 21 mm from empty to full, the same order Gen 2 absorbed per clamped stack. A monolithic 210-layer stack would breathe 105 mm, and no preload system holds 0.3 MPa flat across a column that moves a tenth of a meter; 42 layers is where pressure uniformity and breathing stay controllable. The series count is set by a partner, not by the chemistry: hv-4’s converter accepts 300 to 870 V, so 210 layers charge to 4.10 V each and stop at 861, nine volts under the ceiling. The cell could take 4.20; the pack declines, because the number that governs is the partner’s, not the datasheet’s.',
      why: 'Deleting the interconnect was the last large win this envelope had left. Gen 3 already made the cells carry body structure; the remaining dead mass was collector, strap, and busbar, and bipolar retires it, which is where 586 Wh/kg cell and 500 Wh/kg pack come from within the same sulfide family Gen 2 introduced. The string also pairs with its generation by number: drivetrain-6’s three motors draw 480 kW, which is 593 A at 810 V nominal; the same power at Gen 1’s 355 V would have been over 1,300 A and a conductor set this pack no longer owns.',
      fail: [
        'Dendrites carry over from Gen 2 and Gen 3 unchanged: plating goes filamentary at low temperature and high current, so the current map still refuses fast charge below the 15 °C floor, and thermal-6’s preconditioning exists to reach it.',
        'Full-pack bipolar is the extrapolated claim, stated plainly: it becomes true only when 20 µm sulfide sheets can be made pinhole-free across 0.18 m² faces and coulombic efficiency holds 99.99% for the life of the string; anode-free means the lithium reserve is zero by definition, so every shortfall retires capacity permanently.',
        'A single failed layer opens the only string, carried from Gen 2: there is no limp-home, so the film’s per-layer taps and the weekly EIS sweep are the real protection layer, and the replaceable unit is a 30 kWh brick, ten times the Gen 3 blade.',
      ],
      explode: [0, 0.34, 0],
    },
    bands: {
      name: 'Preload band sets',
      tagline: 'Gen 2 squeezed each stack with seven metric tons of tie rods; the apex brick wears a wound carbon bandage that never lets go.',
      mass: 4,
      count: 15,
      specs: [
        ['Preload', '0.3 MPa on every layer face (Gen 2: 2 MPa; Gen 3: 0.3)'],
        ['Tension', '53 kN per brick; ~9 kN per band leg'],
        ['Band', 'Filament-wound CFRP hoop, 22 x 2 mm section'],
        ['Compliance', 'Disc-spring corner rockers, force within ±8%'],
        ['Breathing absorbed', '~21 mm per brick, empty to full'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'The lesson arrived in Gen 2 and never left: a solid electrolyte touches only where it is pressed. Lithium strips imperfectly on every discharge, voids concentrate the next charge into fewer contact points, and concentrated current is how dendrites begin, so sustained face pressure is electrochemistry, not packaging. Gen 2 held 2 MPa with twelve tie-rod frames at 68 kN each, 24 kg of steel; Gen 3 moved the interface work into a compliant sulfide-polymer separator that keeps contact at 0.3 MPa and let a pre-tensioned can supply it. The apex brick is far too large for a drawn can, so the answer is a bandage: three filament-wound carbon hoops around each brick, tensioned over disc-spring corner rockers, holding 53 kN per brick.\n\nThe hoop is the right structure for the load because it has no threads, no bending, and no joints: pure tension in a material strongest in exactly that direction. Each leg carries about 9 kN at under 15% of band strength, the region where carbon fiber effectively does not creep, and the corner rockers do what Gen 2’s disc springs did, absorbing the 21 mm of brick breathing while holding force within ±8%. The bands also close a structural loop: bonded between the rocker rails and the floor-lid, the bricks are the shear web of the floor, and a shear web only works if its laminations cannot slide, which is precisely what the preload guarantees.',
      why: 'Four kilograms against Gen 2’s 24 for the same guarantee is the ladder working as intended: the requirement never changed, 0.3 MPa on every face forever, and each generation met it with less mass as the compliance moved from steel springs into materials. What the bands spend instead is inspectability: a tie rod could be torqued and re-checked by hand, a wound band is trusted through its strain bridge or not at all.',
      fail: [
        'Band stress-rupture is the slow failure: the strain bridges on every hoop trend tension over years, and a hoop that relaxes re-runs the Gen 2 story, voids, rising impedance, an EIS flag weeks ahead of a short.',
        'A shifted corner rocker tilts the pressure field and the low-pressure edge ages fastest; the watch moved from Gen 2’s end-of-line pressure mapping into the film’s strain grid, which reads every hoop in service.',
      ],
      explode: [0, 0.18, 0],
    },
    rockerrails: {
      name: 'Rocker bond rails',
      tagline: 'Carried from Gen 3 because nothing improved on them: two extrusions that marry the bricks to the body and carry 810 volts home.',
      mass: 19,
      count: 2,
      specs: [
        ['Material', '7003-T6 extrusion, 3 chambers (carried from Gen 3)'],
        ['Section', '95 x 60 mm against the rocker inner face'],
        ['Bond', 'Toughened epoxy, 3 mm bondline, + 28 flow-drill screws per side'],
        ['Raceway', 'Laminated Al return, 810 V nominal, doubled creepage'],
        ['Torsional contribution', '+40% body stiffness (Gen 3: +38)'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The concept is Gen 3’s, carried whole: each rail is a three-chamber extrusion bonded to the body rocker on its outer face and to the brick ends on its inner face, so a side impact runs rocker, rail, brick stack, rail, rocker with no tray in between. The chambers remain the crush budget, folding in sequence across 60 mm before intrusion reaches the first end plate, and the rails still stop at |x| = 1.08 so they never enter the wheel wells, the packaging convention this slot has held since Gen 3. The raceway solves the same problem it solved then: a series string laid along the car puts its terminals at opposite ends, and the return conductor laminates into the passenger-side rail, riding structure that was already going where the current needs to go.\n\nTwo things changed for the apex pack, both driven by neighbors. The raceway now lives at 810 V nominal instead of 508, so its laminate insulation thickened and every creepage distance along the seam doubled; the conductor itself barely changed, because 480 kW at 810 V is less current than Gen 3 moved at 508. And the bond flange gained a thin glass isolation ply, because the floor-lid above went carbon fiber, and CFRP against aluminum is a galvanic couple whenever a film of moisture bridges them; the ply breaks the circuit before chemistry can start it.',
      why: 'Two extrusions are all that remains of what began as a 95 kg tray, and they survive the apex generation because the load path found nothing better: the rocker is where side loads enter, the brick field is the strongest shear structure in the car, and the shortest line between them is a bonded flange. A generation whose cells, interconnect, and coolant all changed keeps its crash path deliberately boring.',
      fail: [
        'An abraded raceway laminate puts pack potential one insulation layer from body ground, carried from Gen 3 with twice the voltage behind it; the isolation monitor watches exactly this seam, and it is the first place service looks on any isolation fault.',
        'A side pole that bottoms all three chambers puts end plates and layers into the load path; the film’s strain and tap grid localizes the damage to the brick, and the repair boundary after such a hit is the body shell itself, not the pack, the same line Gen 3 drew.',
        'A breached isolation ply under the carbon lid starts slow galvanic attack of the rail flange; the bondline strain bridges see the stiffness drift long before the section thins.',
      ],
      explode: [0, 0.06, 0.55],
    },
    floorlid: {
      name: 'Floor-lid',
      tagline: 'The same three jobs as Gen 3 at nine kilograms less, plus a new one: keeping a 60 °C vapor space out of the cabin floor.',
      mass: 12,
      specs: [
        ['Material', 'CFRP skins on 14 mm aramid honeycomb'],
        ['Replaces', 'Gen 3 aluminum floor-lid, 21 kg'],
        ['Attachment', 'Bonded perimeter + brick-top adhesive; structural'],
        ['Thermal duty', 'Insulating ceiling of the vapor space'],
        ['Service access', 'One bolted hatch over the rear bay'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The jobs carry over from Gen 3 unchanged: pressure and moisture boundary of the pack, the surface the cabin carpet bonds to, and the upper skin of the floor torsion box, bonded to the rails at its edges and to every brick top across the field. What changed is the material physics. A sandwich panel puts its skins where the strain is and its core where the shear is, and bending stiffness grows with the cube of thickness, so 12 kg of carbon skins over aramid honeycomb out-stiffens the 21 kg aluminum panel it replaces; the +40% torsional figure the rails quote is closed by this skin. Seat loads pass through potted inserts in the core into the brick tops beneath, so a hard belt pull still anchors in the cell stack, the integration bet Gen 3 stated and this generation keeps.\n\nThe new job is thermal, and it points the unusual way: out. Gen 3 bonded an aluminum lid to its blade tops as a heat spreader; this pack boils its coolant, so the space under the lid runs at 49 to 68 °C of saturated vapor by design, and an aluminum panel would conduct that straight into the cabin floor. The honeycomb core is the insulation: skin-to-skin conductance is two orders below the old panel, and the carpet side stays near cabin temperature at full fast-charge boil. The two burst discs carry over, rear-facing and ducted below the bumper, and the bolted hatch over the rear bay remains the only door; hv-4’s pack feed rises from that hatch at (-1.13, 0.315, 0.38), a coordinate its geometry owns and this panel simply frames.',
      why: 'Nine kilograms saved on a panel this large is real, but the honest argument is the inversion of its thermal duty: once the coolant boils at the source, the lid no longer needs to spread heat, so the material no longer needs to conduct, and the panel is free to be chosen on specific stiffness alone. That is what apex means in this slot: each function moved to the component that does it best, and the lid kept only the jobs a lid actually wins.',
      fail: [
        'Brick-top bond degradation under vapor-space thermal cycling softens the torsion box quietly, carried from Gen 3; the film strain grid lives on the underside of exactly this joint.',
        'Core crush at a seat boss from an overload event is invisible from above; any belt-anchor overload still mandates a pack inspection, the sentence first written in Gen 3.',
        'A lid breach is now two faults at once: a moisture path to a sulfide chemistry that makes H2S from water, and a vapor leak that drops gallery pressure; the pressure telltale and the humidity telltale bracket it from both sides.',
      ],
      explode: [0, 0.78, 0],
    },
    galleries: {
      name: 'Two-phase fluid galleries',
      tagline: 'Plumbing for a coolant that leaves as gas: a pool, four risers, two headers, and two stubs where thermal-6 takes over.',
      mass: 3,
      specs: [
        ['Concept', 'Pool-boiling immersion: 12 mm liquid pool, brick gaps as vapor risers'],
        ['Fluid', 'C6 fluoroketone, ~9 L in pack; ~14 kg, carried on thermal-6’s ledger'],
        ['Boil point', '49 °C at 1.0 bar, 68 °C at 1.8; thermal-6 owns the pressure'],
        ['Design heat load', '25 kW at the 630 A charge plateau'],
        ['Interface', 'Liquid feed (1.27, 0.15, 0.10); vapor return (1.27, 0.27, -0.10)'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'Boiling is the move single-phase cooling cannot match: a wetted surface crossing the fluid’s saturation point makes vapor, and the latent heat it spends is enormous, 88 kJ per kilogram against the 1 or 2 kJ per kilogram-kelvin that Gen 3’s ester bath moved sensibly. The flux follows the demand with no controller: a hotter spot nucleates harder, cooler spots stop boiling, and the whole wetted field self-regulates to the saturation temperature. Thermal-6 sets that temperature by owning the gallery pressure, 1.0 bar boils at 49 °C and 1.8 bar at 68, so the thermostat of a 150 kWh pack is a pressure regulator, with no moving parts inside the envelope.\n\nThe circuit, named for thermal-6 because both sides build to it: the condenser behind the front stack returns liquid to the feed stub at (1.27, 0.15, 0.10), the manifold spreads it into the 12 mm pool the bricks stand in, boiling lifts vapor up the four 16 mm inter-brick risers, two 26 mm headers along the pack edges collect it, and the vapor stub at (1.27, 0.27, -0.10) hands it back. The design-point arithmetic: the 630 A fast-charge plateau dissipates 25 kW in the 63 mΩ string, which is 0.28 kg/s of vapor, about 21 liters per second, roughly 20 m/s through the headers. Below the 15 °C fast-charge floor the same plumbing runs single-phase and warm: preconditioning is back because this chemistry demands it, and thermal-6’s heat pump feeds the manifold until the field crosses the floor together.',
      why: 'The ladder in one line: Gen 1 spent 24 kg of serpentine for 10 kW, Gen 2 spent 9 for 4, Gen 3 spent 17 for 9, and these galleries are 3 kg of dry plumbing rated for 25, because latent heat replaced sensible heat and the fluid mass moved onto thermal-6’s ledger. Authority per kilogram improved by an order of magnitude, and it had to: this pack charges through hv-4’s 630 A pins at over 500 kW, and no plate-and-glycol loop in this envelope has ever held that.',
      fail: [
        'Critical heat flux is the cliff: past it, vapor blankets the wall, the film insulates instead of cooling, and wall temperature runs away in seconds. The design point sits near a third of CHF, and the sense film’s acoustic channels listen for the boiling-signature shift that precedes dryout.',
        'The pool is 12 mm deep, so a long grade or sustained lateral g shifts it, and an uncovered brick base loses nucleation exactly when regen is loading the string; the floor ribs act as baffles, and the derate ladder trips on the film’s dry-corner RTD sentinels.',
        'The loop is dry by construction and must stay so: water in the fluid reaches a sulfide chemistry that makes H2S, carried from Gen 2, so the fill hardware stays keyed and desiccant-capped and the humidity telltale still quarantines the pack.',
      ],
      explode: [0, -0.35, 0],
    },
    sensefilm: {
      name: 'Cell-edge sensing film',
      tagline: 'The Gen 3 wallpaper, taught two new senses: it reads every layer of every brick, and it listens to the coolant boil.',
      mass: 2,
      specs: [
        ['Construction', 'Printed polyimide laminate across all five brick tops'],
        ['Voltage taps', '210, one per layer (Gen 3: 132)'],
        ['Temperature', '260 printed RTD points, incl. dry-corner sentinels'],
        ['Strain', '30 bridges on band hoops and bond lines'],
        ['Acoustics', '12 piezo channels watching boiling regime'],
        ['Maturity', 'Pilot line (lineage: Gen 3)'],
      ],
      how: 'Bipolar stacks create the observability problem Gen 3 first solved: 41 of every 42 layers in a brick have no external terminal to probe, so each brick laminates thin tap foils from its internal plates up to its top edge, and the pack-wide film lands on all 210 as it rolls across the field. The playbook carries over whole: weekly EIS sweeps at rest, mid-frequency impedance rise as the weeks-early dendrite flag, cross-checks between electrical and mechanical witnesses so a lying sensor is caught by its disagreeing neighbor. Resolution now reaches one layer in one brick, which is what makes a 210-series string with no parallel paths a monitorable object at all.\n\nThe two new senses serve the two new subsystems. The strain bridges moved outward onto the preload band hoops, because the bands replaced frames and cans as the pressure guarantee and a wound band is only trustworthy through its telemetry. And the piezo channels are new: nucleate boiling has an acoustic signature, a broadband crackle whose spectrum shifts as vapor generation climbs toward departure from nucleate boiling, so the film hears a cooling problem forming before any RTD moves. The aggregator and its two flat tails through the rear bay carry over from Gen 3 unchanged.',
      why: 'A pack with no parallel paths, no service access, and a structural duty gets exactly one protection layer, foresight, so the sensing has to be as distributed as the risk: that argument is Gen 3’s, and the apex pack raises the stakes on every axis it names. The brick is a 30 kWh quantum, the string is 210 deep, and the coolant has a failure mode, dryout, that develops in seconds; each of those bought a sense the film did not have before.',
      fail: [
        'The film bonds under the floor-lid, so a recycling debond destroys it by design and a mid-life panel cut almost certainly tears it, carried from Gen 3 with a larger nervous system at stake.',
        'Printed RTDs drift as the substrate ages; the EIS trace remains the independent witness, and a thermally plausible but impedance-inconsistent reading flags the sensor, not the cell.',
        'The acoustic channels are cleanest when the car is still; under road noise the boiling classifier runs wider guard bands, so dryout detection while driving leans on the RTD sentinels instead.',
      ],
      explode: [0, 0.55, 0],
    },
    disconnect: {
      name: 'Semiconductor disconnect',
      tagline: 'Third generation in service: re-died for 861 volts, cooled by the gallery, still the only thing between the string and the car.',
      mass: 4,
      specs: [
        ['Switch', 'Back-to-back SiC banks, 1,200 V class (lineage: Gen 2, Gen 3)'],
        ['On-resistance', '0.9 mΩ; ~315 W at the 593 A drivetrain-6 peak'],
        ['Turn-off', '< 10 µs'],
        ['Cooling', 'Cold plate on the liquid gallery loop (thermal-6)'],
        ['Backup', 'Pyro fuse + manual service disconnect, under the hatch'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The safety chain is carried for the second time, and the carry is again the argument. The SiC banks connect the string by ramping their gates as a current limiter, no precharge hardware; they open in under 10 µs, cutting a bolted short before busbar inductance lets it climb past roughly 1,500 A. What changed is the silicon’s voltage class: an 861 V ceiling plus inductive margin needs 1,200 V die, so the banks re-died upward while the current duty actually fell, 593 A at drivetrain-6’s 480 kW peak where Gen 3 moved 700, and conduction loss stays near 300 W on a slightly higher on-resistance. The cold plate now sits in the liquid gallery loop, the one place in the pack guaranteed to hold 68 °C or less while any current flows.\n\nThe hand-off to hv-4 is the choreography the whole car depends on, so it is named: hv-4’s 48 V ring boots the computers, the computers check isolation, and only then does this switch ramp the string onto the bus. The converter at the other end was qualified for 300 to 870 V input, which is why the string’s full 630 to 861 V swing lands inside it with margin at both ends, and hv-4’s pack feed begins directly above this bay, rising from the hatch at (-1.13, 0.315, 0.38). The rear bay under that hatch remains the entire serviceable content of the pack, carried from Gen 3: disconnect, pyro fuse, manual plug, film aggregator, fill standpipe, every item replaceable in under an hour because nothing outside the bay is replaceable at all.',
      why: 'Carrying a part is a decision with the same weight as designing one; Gen 3 wrote that sentence about this device, and it holds a second time. A generation that changes the cells, the interconnect, the preload, and the phase of its coolant must hold something still, and the thing to hold still is the layer whose job is to end every experiment the rest of the pack might attempt.',
      fail: [
        'Fails short, not open, carried and unchanged: an unclearable fault escalates to the pyro fuse, which is not resettable, an hour at the hatch to replace.',
        'The cold plate shares the gallery liquid, so a drained gallery takes disconnect cooling with it; die temperature sits ahead of pool level in the trip chain, carried from Gen 3 for exactly this case.',
        'Loss of the gate-driver supply remains an undetermined state; the watchdog fires the pyro rather than guess, a rule now three generations old.',
      ],
      explode: [0, 0.5, 0.3],
    },
  },
};

/* ── Geometry ── */

const B = P.battery;
const W = B.x[1] - B.x[0];      // 2.60 pack length
const D = B.z[1] - B.z[0];      // 1.44 pack width

/* Five bricks along x; rear bay behind the last brick keeps the disconnect,
   the film aggregator, and the fill hardware under the floor-lid hatch,
   the same rear-bay convention as battery-3. */
const BX = [-0.76, -0.312, 0.136, 0.584, 1.032];   // brick centers, 0.448 pitch
const GAPX = [-0.536, -0.088, 0.36, 0.808];        // vapor riser gaps
const BRICK_L = 0.42, BRICK_H = 0.135, BRICK_W = 1.30;
const BRICK_Y = 0.2075;         // brick center height: spans 0.140 to 0.275
const LAYERS = 42, LPITCH = 0.01;

export function build() {
  const sys = new THREE.Group();

  /* bricks: 210 instanced bipolar layers in five stacks, terminal end
     plates, eight jumper plates across the riser gaps, and the front
     take-off into the rail raceway */
  const bricks = lib.part('bricks', [0, 0.34, 0]);
  const layerGeo = new THREE.BoxGeometry(0.0085, BRICK_H, BRICK_W);
  const inst = new THREE.InstancedMesh(layerGeo, M.cell, BX.length * LAYERS);
  inst.castShadow = inst.receiveShadow = true;
  const dummy = new THREE.Object3D();
  let k = 0;
  for (const cx of BX) {
    for (let i = 0; i < LAYERS; i++) {
      dummy.position.set(cx + (i - (LAYERS - 1) / 2) * LPITCH, BRICK_Y, 0);
      dummy.updateMatrix();
      inst.setMatrixAt(k++, dummy.matrix);
    }
  }
  bricks.add(inst);
  for (const cx of BX) {
    for (const xs of [-1, 1]) {
      const plate = lib.box(0.006, BRICK_H, BRICK_W, M.steel);
      plate.position.set(cx + xs * 0.213, BRICK_Y, 0);
      bricks.add(plate);
    }
  }
  for (const gx of GAPX) {
    for (const zz of [-0.35, 0.35]) {
      const strap = lib.box(0.03, 0.10, 0.09, M.busbar);
      strap.position.set(gx, BRICK_Y, zz);
      bricks.add(strap);
    }
  }
  bricks.add(lib.tube(
    [[1.247, 0.25, 0.52], [1.252, 0.275, 0.63], [1.245, 0.2845, 0.706]],
    0.008, M.hv
  ));
  sys.add(bricks);

  /* preload bands: three carbon hoops per brick (top, bottom, two legs),
     the Gen 2 stack-pressure lesson carried at a sixth of the mass */
  const bands = lib.part('bands', [0, 0.18, 0]);
  for (const cx of BX) {
    for (const bz of [-0.45, 0, 0.45]) {
      const top = lib.box(0.444, 0.005, 0.022, M.carbon);
      top.position.set(cx, 0.2805, bz);
      bands.add(top);
      const bot = lib.box(0.444, 0.005, 0.022, M.carbon);
      bot.position.set(cx, 0.1345, bz);
      bands.add(bot);
      for (const xs of [-1, 1]) {
        const leg = lib.box(0.005, 0.152, 0.022, M.carbon);
        leg.position.set(cx + xs * 0.2195, BRICK_Y, bz);
        bands.add(leg);
      }
    }
  }
  sys.add(bands);

  /* rocker bond rails: carried from battery-3. Rails stop at |x| <= 1.08 so
     they never enter the tire volume; bond bead inboard, flow-drill screws
     on top, and the 810 V return raceway on the passenger side only */
  for (const zs of [-1, 1]) {
    const rr = lib.part('rockerrails', [0, 0.06, zs * 0.55]);
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

  /* floor-lid: carbon sandwich panel, top-hat stiffeners, seat rails and
     pads, the rear-bay service hatch, and two rear-facing burst discs */
  const lid = lib.part('floorlid', [0, 0.78, 0]);
  const panel = lib.plate(W - 0.02, D - 0.02, 0.012, 0.05, M.carbon);
  panel.position.y = 0.284;   /* plate spans y..y+t: skin 0.284 to 0.296 */
  lib.shell(panel);
  lid.add(panel);
  for (const hx of [-0.5, 0.1, 0.7]) {
    const hat = lib.box(0.05, 0.007, 1.30, M.carbon);
    hat.position.set(hx, 0.2995, 0);
    lid.add(hat);
  }
  for (const zz of [-0.52, -0.28, 0.28, 0.52]) {
    const rail = lib.box(0.75, 0.007, 0.045, M.alu);
    rail.position.set(0.32, 0.3045, zz);
    lid.add(rail);
    const pad = lib.box(0.10, 0.007, 0.05, M.alu);
    pad.position.set(-0.80, 0.3045, zz);
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
    burst.position.set(-1.291, 0.29, zz);
    lid.add(burst);
  }
  sys.add(lid);

  /* two-phase galleries: pan, 12 mm liquid pool, baffle ribs under the
     riser gaps, liquid feed manifold and stub, two vapor headers with the
     front cross-collector and vapor stub, and the keyed fill standpipe */
  const gal = lib.part('galleries', [0, -0.35, 0]);
  const pan = lib.plate(2.32, 1.38, 0.004, 0.04, M.plastic);
  pan.position.set(0.10, 0.130, 0);
  gal.add(pan);
  const pool = lib.box(2.26, 0.014, 1.34, M.coolant);
  pool.position.set(0.10, 0.140, 0);
  gal.add(pool);
  for (const gx of GAPX) {
    const rib = lib.box(0.016, 0.010, 1.30, M.plastic);
    rib.position.set(gx, 0.138, 0);
    gal.add(rib);
  }
  gal.add(lib.tube([[1.263, 0.141, -0.60], [1.263, 0.141, 0.60]], 0.011, M.coolant));
  const feed = lib.cyl(0.012, 0.05, M.coolant, 12);
  feed.rotation.z = Math.PI / 2;
  feed.position.set(1.272, 0.147, 0.10);
  gal.add(feed);
  for (const zs of [-1, 1]) {
    gal.add(lib.tube(
      [[-1.00, 0.272, zs * 0.665], [1.19, 0.272, zs * 0.665]],
      0.013, M.coolantHot
    ));
  }
  gal.add(lib.tube(
    [[1.19, 0.272, 0.665], [1.235, 0.270, 0.0], [1.19, 0.272, -0.665]],
    0.013, M.coolantHot
  ));
  gal.add(lib.tube([[1.235, 0.270, -0.10], [1.262, 0.268, -0.10]], 0.015, M.coolantHot));
  const vap = lib.cyl(0.018, 0.05, M.coolantHot, 12);
  vap.rotation.z = Math.PI / 2;
  vap.position.set(1.272, 0.268, -0.10);
  gal.add(vap);
  const fill = lib.cyl(0.010, 0.12, M.coolant, 12);
  fill.position.set(-1.02, 0.20, 0.30);
  gal.add(fill);
  const fillCap = lib.cyl(0.013, 0.010, M.plasticLt, 12);
  fillCap.position.set(-1.02, 0.265, 0.30);
  gal.add(fillCap);
  sys.add(gal);

  /* sensing film: one sheet across every brick top, rear-bay aggregator,
     two flat tails, carried from battery-3 */
  const film = lib.part('sensefilm', [0, 0.55, 0]);
  const sheet = lib.box(2.24, 0.0016, 1.26, M.pcb);
  sheet.position.set(0.13, 0.2763, 0);
  film.add(sheet);
  const agg = lib.box(0.09, 0.014, 0.06, M.pcb);
  agg.position.set(-1.13, 0.145, 0.31);
  film.add(agg);
  film.add(lib.tube(
    [[-0.995, 0.276, 0.20], [-1.06, 0.22, 0.26], [-1.10, 0.155, 0.30]],
    0.0035, M.pcb
  ));
  film.add(lib.tube(
    [[-0.995, 0.276, 0.44], [-1.07, 0.21, 0.38], [-1.095, 0.155, 0.325]],
    0.0035, M.pcb
  ));
  sys.add(film);

  /* semiconductor disconnect: rear bay under the hatch, cold plate on the
     gallery liquid loop, SiC block, fins, pyro backup, service loop, and
     the two HV leads from the rear brick terminal and the rail raceway */
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
    [[-0.976, 0.25, -0.52], [-1.10, 0.225, -0.15], [-1.17, 0.19, 0.20], [-1.145, 0.168, 0.38]],
    0.009, M.hv
  ));
  disc.add(lib.tube(
    [[-1.078, 0.2845, 0.712], [-1.12, 0.245, 0.62], [-1.155, 0.19, 0.50]],
    0.009, M.hv
  ));
  sys.add(disc);

  return sys;
}
