/* Drive units, generation 2: the radial permanent-magnet rear machine of
   Gen 1 becomes a yokeless axial-flux disc, two stator discs flanking one
   magnet-carrier rotor, with the 462 V inverter integrated into the housing
   face. The induction front unit carries over almost untouched, which is
   part of the lesson. Same zone, same explode direction as drivetrain.js;
   the app shows one variant at a time. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'drivetrain-2',
  name: 'Drive units · Gen 2',
  color: 0xe8a24c,
  explode: [0, -0.5, 0],
  blurb: 'Gen 2 replaces the radial rear machine with a yokeless axial-flux disc: 150 kg where Gen 1 carried 194, 420 kW where it made 370. The front induction unit carries over, because its best operating state, off, cannot be improved.',
  parts: {
    housing: {
      name: 'Rear drive unit housing',
      tagline: 'Two shallow dishes replace the Gen 1 clamshell drum: half the enclosed volume, half the metal.',
      mass: 11,
      specs: [
        ['Material', 'AlSi10Mg high-pressure die cast'],
        ['Construction', 'Two dishes, bolted at a 336 mm rim'],
        ['Axial depth', '110 mm (Gen 1 drum: 205 mm)'],
        ['Face parallelism', '40 microns across the diameter'],
        ['Oil charge', '1.1 L ATF, shared motor and gears'],
        ['Heat exchanger', 'Oil-to-coolant plate, 13 kW'],
      ],
      how: 'Gen 1 machined a deep drum and a gear case on one datum to hold three gear axes parallel. This case is two shallow dishes bolted at a 336 mm rim, and the precision problem has rotated ninety degrees: what matters now is flatness. Each stator face must sit parallel to the rotor within 40 microns across the full diameter, because the working airgap is 1 mm and disc geometry multiplies tilt. A face wobble a radial machine would never notice becomes an airgap that breathes once per revolution, and a breathing gap is a force ripple you can hear. Both stator faces are machined in a single clamping with the spigot that locates the gear case.\n\nThe oil circuit keeps the Gen 1 one-fluid philosophy with new plumbing. The pump feeds a gallery ring at the hub; oil runs radially outward through channels between the stator segments, bathing the copper along its whole length, and the spinning rotor slings it to the rim, where a scroll cast into the rear dish collects it and returns it through the plate heat exchanger. The rotor does half the pumping work for free. This gallery is the answer to the cooling weakness described on the rotor disc, and it is the reason a machine with buried, insulated magnets can hold 270 kW at all.',
      why: 'Mass drops from 23 to 11 kg mostly because there is half as much machine to wrap. The packaging win is bigger than the mass win: Gen 1 spent 205 mm of axial length on the motor drum and then stacked its inverter on top, pushing hardware to y = 650 mm. This case is 110 mm deep and carries the inverter on its inboard face, inside length the drum used to own, so nothing stacks above the unit and the deck over the rear drive drops by 90 mm. That height goes straight into the trunk well.',
      fail: [
        'The two airgaps balance roughly 20 kN of axial magnetic pull, and they only cancel while they stay equal; a 0.2 mm gap mismatch puts a permanent thrust load on the rotor bearings, so the gaps are shimmed and measured at assembly rather than left to tolerance stack.',
        'A 30 °C temperature split between the dishes tilts the stator faces and spends airgap margin; the oil circuit deliberately divides flow between both faces to hold them within a few degrees of each other.',
        'The helium pressure check carries over from Gen 1, but the inverter cover on the inboard face adds one gasket and one leak path the drum never had.',
      ],
      explode: [0, -0.25, 0],
    },
    stators: {
      name: 'Stator discs',
      tagline: 'Gen 1 carried 24 kg of stator iron and copper; these two discs carry 13 together and make more torque.',
      mass: 13,
      count: 2,
      specs: [
        ['Topology', 'Segmented, 24 concentrated coils per disc'],
        ['Core', 'Pressed soft magnetic composite teeth'],
        ['Yoke', '6 mm ring (Gen 1: 32 mm of back iron)'],
        ['Winding', 'Bobbin-wound rectangular wire, 65% fill'],
        ['Peak phase current', '584 A (Gen 1: 620 A)'],
        ['Fundamental frequency', 'to 1.7 kHz at 10,000 rpm'],
      ],
      how: 'Each disc is a ring of 24 trapezoidal teeth, every one wound on its own bobbin before assembly and then keyed to a thin yoke ring. That undoes the Gen 1 winding math from the other end: hairpin construction packed 73% of each slot but spent roughly a third of its copper in end windings that only connect, while a concentrated coil wraps the tooth it works on and wastes almost nothing. Fill drops to 65%, because a bobbin cannot pack like pressed hairpins, but dead copper falls from a third to about a tenth, so resistance per useful turn still goes down. The teeth are pressed soft magnetic composite instead of laminations: at 1.7 kHz fundamental, twenty poles at 10,000 rpm, flux at the tooth face moves in three dimensions, and laminations only suppress eddy currents in one plane.\n\nBoth discs work on the rotor at once, each carrying half the tangential force, and the oil gallery floods the gaps between segments so no turn of copper sits more than about 2 mm from moving oil. Current is the delta that did not arrive: on battery-2\'s 462 V string, 270 kW needs 584 A peak where Gen 1 pushed 620 for 220, so conductor sections, terminals and busbars barely move while the power crossing them rises 23%. The pack\'s 30% voltage bump was spent on capability, not on copper. Field weakening still exists above base speed, but the disc machine needs less of it, because the ratio was chosen to keep the rotor under 10,000 rpm.',
      why: 'This is where axial flux wins torque density. In a radial machine, flux crosses the gap and must then travel circumferentially through back iron to the next pole; that yoke iron carries flux sideways and makes no torque. Twenty poles shorten the pole-to-pole hop until the yoke almost vanishes, and the flux path through the rotor is a straight axial shot. Meanwhile every square centimetre of working airgap sits at 100 to 145 mm radius, where Gen 1 worked at 68 mm: the same tangential force earns twice the lever arm. Less iron carried, more radius per kilogram, and 13 kg of stators do what 24 kg did.',
      fail: [
        'Every tooth-to-yoke joint is a small parasitic gap; sloppy seating shows up as a few percent torque loss and a once-per-slot ripple, so seating force is instrumented on the assembly line.',
        'Twenty poles put the fundamental at 1.7 kHz and its force harmonics squarely in the most audible band; the pole count that buys torque density is a standing NVH liability that the controller partly cancels with harmonic current injection.',
        'Nothing about winding 48 bobbins and landing 96 terminations is automated at volume today, while the Gen 1 hairpin line was. This stator is where the unit costs more per kilowatt than the machine it replaces, and the claim that automation closes the gap is a projection, not a fact.',
      ],
      explode: [0, 0, 0.55],
    },
    'rotor-disc': {
      name: 'Rotor disc',
      tagline: 'Gen 1 spun 15 kg of magnet-stuffed iron; this is 5 kg of magnets in composite, held by a carbon hoop.',
      mass: 5,
      specs: [
        ['Magnets', 'NdFeB, 20 poles, through-magnetised'],
        ['Carrier', 'Carbon composite disc, zero iron'],
        ['Banding', 'Wound carbon hoop, pre-tensioned'],
        ['Max speed', '10,000 rpm, 153 m/s at the hoop'],
        ['Peak torque', '450 Nm (Gen 1: 340)'],
        ['Airgap', '1.0 mm each face'],
      ],
      how: 'Gen 1 buried its magnets in rotor iron and left thin steel bridges to hold them against 15,000 g; the iron was flux path and retention at once, and it weighed 15 kg. Here the flux path through the rotor is straight through, axially, from one stator to the other, so the rotor needs no iron at all: each magnet is magnetised through its thickness and acts as a bridge between the two stator faces, potted in a carbon composite carrier that contributes stiffness and nothing magnetic. Retention moves to a wound carbon hoop around the rim. At 10,000 rpm the hoop surface runs 153 m/s, and NdFeB is strong in compression but poor in tension, so the hoop is wound on with deliberate pre-tension: the magnets stay compressed radially even at full speed, and centrifugal load only unloads the pre-stress instead of ever pulling on the magnet material.\n\nCooling is the price of the layout, and it must be said plainly: these magnets sit farther from coolant than any component in the car. Composite is a thermal insulator, so the only escape paths for heat are the two airgap faces, and slot harmonics from the stators induce eddy heating in the magnets with nowhere obvious for it to go. Two answers: each pole is split into four electrically isolated magnet segments, which cuts the eddy heating at its source roughly fourfold, and the housing gallery drives oil across both gap edges before the rim scroll collects it, scrubbing the faces that can conduct. What remains is a thinner thermal margin than Gen 1 ever ran, managed by an observer model, and the model is the true limit on continuous power.',
      why: 'Torque is force times radius, and this disc applies force on both faces of an annulus that reaches 145 mm out, roughly twice the lever arm of the Gen 1 rotor. That is how 5 kg makes 450 Nm where 15 kg made 340. The cost is honest and permanent: the carbon hoop caps rim speed, rim speed caps the machine at 10,000 rpm against Gen 1’s 16,500, and that lost speed range has to be paid for in the gearset.',
      fail: [
        'Hoop fibre is the containment case: a steel rotor fails by yielding, a wound hoop fails by unravelling, so burst margin is proven by overspeed-to-failure tests and the stators double as containment rings.',
        'Sustained heat soak, a mountain climb towing, drives magnet temperature toward the knee where fault currents could demagnetise; the inverter derate protects the magnets, not the copper, same logic as Gen 1 but with less margin behind it.',
        'Composite creeps under centrifugal load at 150 °C in a way steel does not; airgap growth over life is tracked at service through the back-EMF signature, and the acceptance band is tight because gap is torque.',
      ],
      explode: [0, 0, 0.3],
    },
    gearset: {
      name: 'Single-speed gearset',
      tagline: 'Same one-ratio philosophy as Gen 1, shorter ratio: 450 Nm only needs 5.95:1.',
      mass: 8,
      specs: [
        ['Ratio', '5.95:1 in two stages (Gen 1: 8.1)'],
        ['Stage 1', '21:50 helical, input pinion'],
        ['Stage 2', '24:60 helical, to ring gear'],
        ['Max input', '450 Nm at up to 10,000 rpm'],
        ['Wheel torque', '2,680 Nm at the hubs'],
        ['Finish', 'Ground flanks, crowned (carryover)'],
      ],
      how: 'The ratio changed because the machine changed shape. Gen 1’s rotor was happy at 16,500 rpm and made 340 Nm, so its box multiplied by 8.1. The disc rotor makes 450 Nm but the carbon hoop caps it at 10,000 rpm, so the ratio drops to 5.95 to keep wheel speed: 2,680 Nm at the hubs against Gen 1’s 2,750, and a 225 km/h ceiling against 270. Both regressions are accepted on purpose. Nothing in the car’s duty cycle needs 270 km/h, and the front unit’s 1,900 Nm still arrives on demand, so combined launch torque barely moves.\n\nInput torque is up 32% at lower speed, so face widths grow about a millimetre, while the lower total ratio shrinks the stage-two ring gear; the net is 8 kg against Gen 1’s 10. The silence problem is harder than before, not easier. Mesh frequencies drop slightly with the shorter ratio, but the motor now contributes its own tones: a 20-pole machine has torque ripple at high multiples of rotation that lands in exactly the band where gear whine lives, and there is still no engine to mask any of it. The ground, crowned flanks carry over unchanged, and the inverter runs harmonic current injection to cancel the worst motor orders before the gears can amplify them.',
      why: 'Gen 1 argued a two-speed box was not worth 15 kg and a new failure population, and the new motor does not reopen the case, it closes it harder: a second ratio could buy back the 225 km/h ceiling, and the trade study says the ceiling is worth less than the mass. One ratio, chosen once, chosen again.',
      fail: [
        'Higher torque at lower input speed shifts the worst lubrication case toward launch, where the oil film lives on additive chemistry rather than hydrodynamics; the additive package was requalified for the higher tooth loads.',
        'Regen still reverses torque through the mesh every pedal lift, so coast flanks remain working surfaces and software still ramps torque through zero to keep lash crossings inaudible.',
        'Motor torque ripple at pole-count orders can excite the gear train into rattle at low load; if the harmonic injection ever mistunes, the gearset is the loudspeaker, and cabin-microphone order analysis in fleet data is watching for it.',
      ],
      explode: [0, 0, -0.45],
    },
    differential: {
      name: 'Differential',
      tagline: 'Carried over in concept, resized in metal: the open diff still lets the inverter do the traction work.',
      mass: 6,
      specs: [
        ['Type', 'Open bevel, four pinions (carryover)'],
        ['Mounting', 'Bolted into the stage-2 ring gear'],
        ['Case torque', '2,680 Nm maximum'],
        ['Slip handling', 'Inverter torque cut, < 10 ms'],
      ],
      how: 'The mechanism is untouched from Gen 1: four bevel pinions let wheel speeds differ while torque splits equally, and the case bolts into the bore of the stage-two ring gear so the ring gear doubles as the case flange. What changed is sizing. The new ring gear is smaller in diameter, case torque falls slightly to 2,680 Nm, and reworking the case webs to the new bore takes 2 kg out without touching a working surface.\n\nThe electronic traction argument transfers whole: an open diff can only send both wheels what the slipperier one can take, and the answer is still upstream, an inverter that cuts or restores torque in under 10 ms plus a brake controller that drags a spinning wheel to shove torque across. Regeneration back-drives the same path. Nothing about the axial-flux motor weakens that logic; the faster the torque loop, the less reason friction hardware ever had.',
      why: 'When an optimization pass leaves a part’s concept alone, that is data: the open diff plus fast inverter was already the minimum-mass answer to wheelspin, and Gen 2 could only resize it, not out-think it. The 2 kg saved came from the smaller ring gear, not from a better idea.',
      fail: [
        'Sustained one-wheel spin still scuffs the pinion thrust faces; the traction controller caps spin duration, same protection as Gen 1.',
        'True split-grip launches remain brake-assisted, and the drag torque is still energy deliberately spent for mobility; no generation of open diff escapes the equal-split rule.',
      ],
      explode: [0, 0, -0.65],
    },
    halfshafts: {
      name: 'Halfshafts',
      tagline: 'The same four shafts as Gen 1, kept on purpose: the loads did not change enough to buy new forgings.',
      mass: 16,
      count: 4,
      specs: [
        ['Shaft', 'Induction-hardened steel, 40 mm hollow'],
        ['Outer joint', 'Rzeppa six-ball, to 47 degrees'],
        ['Inner joint', 'Tripod, 23 mm axial plunge'],
        ['Rating', '3,400 Nm ultimate per shaft'],
        ['Peak applied', '1,340 Nm per shaft (Gen 1: 1,375)'],
      ],
      how: 'Identical hardware to Gen 1, and the reasons hold: a Rzeppa joint at the wheel passes rotation at constant velocity through full steer and bump, a tripod joint at the unit lets the shaft plunge as the suspension arcs, and the hollow section carries torque in the outer fibres where the material actually works. Peak per-shaft torque falls slightly with the new ratio, from 1,375 to 1,340 Nm, so nothing in the load case argues for new parts.\n\nThe one thing that needed attention is invisible: the anti-judder control loop. The shafts are still the softest torsional element in the path, and a launch still tries to oscillate the car fore-aft through their windup. The disc rotor is lighter but larger in radius, and reflected through the shorter ratio its inertia at the wheels lands within about 20% of Gen 1, so the damping loop needed a retune, not a redesign. The calibration changed; the steel did not.',
      why: 'Carrying a part over is a Gen 2 decision too. These joints and boots have years of field population behind them, and swapping a proven boot for zero load benefit is how you purchase new failure modes with no return. The part number survives because the data behind it is worth more than any gram it could shed.',
      fail: [
        'A torn boot remains the dominant field failure: grease out, grit in, clicking on full-lock turns months later; the boot compound and clamp design carry over precisely because their failure statistics are known.',
        'Every drive-to-regen transition still crosses joint and spline lash, and torque still ramps through zero in about 50 ms to keep the crossing silent.',
        'Kerb-strike overload protection still depends on the traction controller cutting torque faster than the shaft reaches its ultimate rating; the retuned damping loop had to prove it kept that reaction time.',
      ],
      explode: [0, 0, 0.75],
    },
    inverter: {
      name: 'Integrated rear inverter',
      tagline: 'Gen 1 argued 400 V was right for this box and named the condition for changing it. The pack moved 30 percent, which is not the move Gen 1 meant.',
      mass: 4,
      specs: [
        ['DC input', '360 to 570 V, 462 V nominal'],
        ['Peak phase current', '584 A (Gen 1: 620)'],
        ['Switching', '24 kHz space-vector PWM'],
        ['DC link', '190 uF film capacitor'],
        ['Mounting', 'Cast pocket in the housing inboard face'],
        ['Peak efficiency', '99.3% (unchanged, and that is the point)'],
      ],
      how: 'Gen 1’s inverter carried an unusual why: it defended 400 V while admitting the 900 V argument is won in the charging spec and the harness, and promised that when the pack moved, this box would change dies and nothing else. The pack moved, and the size of the move is the story: 120 solid-state cells in series put the bus at 462 V nominal and 504 at full charge, a 30 percent step, where the 900 V argument was about a bus roughly twice this one. Thirty percent is still enough to break the 750 V die class Gen 1 qualified, so the promise is kept exactly as written, one class up and nothing else. The input window is then qualified to 570 V rather than the pack’s 504, because the 900 V die has the headroom free and a qualification that stops exactly at today’s pack is a qualification that expires with it, which is the lesson Gen 1 learned the expensive way. What does not follow is the copper. At 462 V, 270 kW needs 584 A where Gen 1 pushed 620 for 220, so the AC busbars carry 23 percent more power on very nearly the same section, and the DC feed to the pack thins by a few percent instead of by half. The DC link capacitor still falls from 480 to 190 uF, but the credit belongs to frequency rather than voltage: ripple current tracks phase current, which barely moved, while switching at 24 kHz gives the capacitor 2.4 times as many chances a second to be topped up. Switching rises to 24 kHz because the motor demands it: a 1.7 kHz fundamental needs sufficient pulses per electrical cycle, and 24 kHz also clears the audible band that the high pole count made crowded.\n\nThe second change is where the box lives. Gen 1 bolted a 10 kg cased inverter on top of the drum; this one is a board set, DC link and busbars in a machined pocket cast into the housing’s inboard face, closed by a lid. The housing is the case, the housing cold plate is the cold plate, and the phase connections are 60 mm solid busbars straight to the stator terminals instead of 400 mm of cable. Every deleted connector is deleted milliohms and a deleted failure mode, and the 6 kg saved here is really the housing and inverter splitting one structure between them.',
      why: 'The honest lesson is that Gen 1’s reasoning was right about the mechanism and wrong about the scale. It expected the charging spec to force the pack architecture, and instead the cells did it: anode-free prismatics in series happened to land at 462 V, and the charging spec collected the benefit afterwards rather than demanding it. So this box gets the small version of the dividend, one die class and 26 percent more charging power through the same 630 A port, 290 kW where Gen 1 bought 230, and the 900 V argument stays open for a later generation to settle. Efficiency does not move, 99.3% peak then and now, because a 30 percent voltage step and a 23 percent power step very nearly cancel in the loss budget.',
      fail: [
        'Integration couples fates: a failed inverter now sends the whole drive unit to the workshop where Gen 1’s bolt-on box swapped in twenty minutes; the board set is designed for bench replacement with the lid off, and whether service actually achieves that is not yet proven.',
        '504 V at full charge demands more creepage and clearance than Gen 1’s 450 V ceiling everywhere it lands, and partial discharge that never started at 450 V becomes an insulation qualification test in its own right, including at altitude where thinner air lowers the inception voltage.',
        'The 190 uF link runs closer to its ripple rating than Gen 1’s generous 480; capacitor health is still inferred from ripple telemetry, now with less slack behind the inference.',
      ],
      explode: [0, 0.4, -0.35],
    },
    'power-modules': {
      name: 'SiC power modules',
      tagline: 'The package outlived its dies: 900 V silicon in the same footprint Gen 1 qualified at 750 V.',
      mass: 2,
      count: 3,
      specs: [
        ['Die', 'SiC MOSFET, 900 V class (Gen 1: 750 V)'],
        ['Parallelism', '8 dies per switch (Gen 1: 8)'],
        ['On resistance', '1.5 mOhm per switch, 25 °C'],
        ['Switching edge', 'up to 12 kV/us'],
        ['Cooling', 'Double-sided direct liquid (carryover)'],
      ],
      how: 'A 30 percent voltage step does not pay for itself inside the module, and the numbers deserve daylight. The step is not optional: a 504 V pack at full charge would sit at 67% of a 750 V die rating, past the 60% Gen 1 held as its cosmic-ray line, so the class has to rise. Higher-class SiC dies carry more specific resistance, so eight 900 V dies at 1.5 mOhm per switch replace eight 750 V dies at 1.1 mOhm, and holding the number that low costs die area. Current barely helps, 584 A against Gen 1’s 620, so conduction loss lands about 21% higher while the machine it feeds makes 23% more power: loss per kilowatt comes out flat, which is the honest verdict. Switching loss rises outright, because each transition swings 462 V instead of 355 and there are 24,000 of them a second instead of 10,000. What the step actually bought is counted outside this module: 290 kW at the charge port on the same 630 A pins, and a die that sees 56% of its rating on a freshly charged pack where Gen 1 sized for 60%.\n\nWhat carries over is everything that was hard to qualify. The positive temperature coefficient still self-balances the parallel set, a hot die shedding current to its neighbours. The dies are still sintered between two ceramic substrates with coolant on both faces. The footprint, the sinter process and the gate driver architecture are identical to Gen 1, which is why the front unit could adopt the new die class as a drop-in: one package family, both axles, second generation running.',
      why: 'Keeping the package and changing the die is the cheapest possible way through a voltage migration: the mechanical, thermal and reliability qualification of the module survives, and only the silicon requalifies. That was the design intent when Gen 1 chose the footprint, and Gen 2 is the evidence it worked.',
      fail: [
        'Cosmic-ray margin is the reason the class moved at all, and it now has to be watched from the other side: these dies sit at 51% of 900 V at nominal and touch 56% on a freshly charged 504 V pack, against the 60% Gen 1 sized for, so margin improved and the loss budget paid for it; the fleet failure model still gets checked against the fleet, not assumed.',
        'Holding on-resistance near Gen 1’s through a class change costs die area, because a 900 V die is physically larger for the same current; the switch spreads its loss over a bigger footprint, and one lost die takes more of the module’s thermal path with it than a count of eight suggests.',
        'Thermal cycling still fatigues the sinter and substrate interfaces, and larger dies swing through steeper internal gradients per cycle; on-state voltage trend remains the wear indicator.',
      ],
      explode: [0, 0.75, -0.35],
    },
    'front-unit': {
      name: 'Front drive unit',
      tagline: 'The one Gen 2 change is the die class in its inverter. The machine was already the right answer.',
      mass: 85,
      specs: [
        ['Machine', 'Induction, cast copper cage (carryover)'],
        ['Peak output', '150 kW / 250 Nm (unchanged)'],
        ['Reduction', '7.6:1 single speed (unchanged)'],
        ['Inverter', 'Integrated here; re-died to 900 V SiC'],
        ['Drag when off', 'Near zero, the reason it stays'],
        ['Service', 'Sealed for life (carryover)'],
      ],
      how: 'The optimization pass studied this axle and walked away, and that is the most instructive decision in the system. The induction unit’s job in the energy budget is to not exist at cruise: gates off, rotor field collapses, bearing drag only, while the rear does the work. Gen 1 already achieved that completely. An axial-flux front motor was costed and it lost, because torque density improvements amortize over usage and this axle works a small fraction of miles; the segmented stator’s manual assembly cost would land twice per car while its efficiency benefit landed almost never, and the front zone has no packaging crisis to relieve. There is no yokeless version of zero.\n\nWhat did change is the minimum possible: its inverter, treated here as part of the unit, swapped its 750 V power modules for the 900 V class shared with the rear, because a pack that reaches 504 V at full charge gives no one a choice. The flux observer, the test-pulse creep strategy, the sub-20 ms wake, the sealed-for-life oil: all carry over byte for byte and part for part. Mass stays 85 kg with the inverter counted, exactly the sum Gen 1 split across two entries.',
      why: 'A generation pass earns credibility by what it declines to touch. Every carried-over part is a claim that Gen 1 got it right, and this is the strongest such claim in the vehicle: the machine’s best operating point is off, off costs nothing, and nothing cannot be optimized. Spending the Gen 2 budget where the physics had headroom, the rear axle, is the whole discipline of the exercise.',
      fail: [
        'Slip is still heat in a rotor with no direct cooling, so a long alpine climb still derates the front axle first while the rear carries on; the derate thresholds are unchanged from Gen 1.',
        'A cracked cage bar where it meets the end ring still announces itself as torque ripple at slip frequency in the phase currents, and the detection carries over with the hardware.',
        'Sealed-for-life is now a one-generation-old bet: the oil that was young in Gen 1 fleets is aging in the field, and Gen 2 inherits whatever that data eventually says, for better or worse.',
      ],
      explode: [0.4, -0.05, 0],
    },
  },
};

/* ── Geometry ── */

/* Rear unit axes in the x-y plane, motor axis along z (pancake disc).
   A2 = motor axis, B2 = intermediate (lay) axis, C2 = ring gear,
   differential and halfshaft axis at wheel-centre height. */
const A2 = [-1.48, 0.40];
const B2 = [-1.505, 0.458];
const C2 = [-1.45, P.wheelY];     // 0.355
const GZ2 = -0.16;                // gear case centre plane, z

/* Axial stack along z: inboard stator, rotor, outboard stator. */
const Z_ROT = 0.040;              // rotor disc centre
const Z_ST_OUT = 0.072;           // outboard stator centre plane
const Z_ST_IN = 0.008;            // inboard stator centre plane

/* Cylinder with its axis along z instead of y. */
function zc(mesh) { mesh.rotation.x = Math.PI / 2; return mesh; }

/* Annulus (ring) extruded along z, centred on its own origin. */
function ringMesh(rOut, rIn, depth, mat, seg = 32) {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOut, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, rIn, 0, Math.PI * 2, true);
  s.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: seg });
  geo.translate(0, 0, -depth / 2);
  return lib.mesh(geo, mat);
}

/* One stator disc: thin yoke ring, 24 SMC teeth, copper coil ring visible
   as segments. dir = +1 builds the outboard disc (teeth face -z toward the
   rotor), dir = -1 the inboard disc (teeth face +z). Group is centred on
   the disc's own plane and positioned by the caller. */
function statorDisc(dir) {
  const g = new THREE.Group();
  const yoke = ringMesh(0.150, 0.088, 0.010, M.steel, 40);
  yoke.position.z = dir * 0.012;
  g.add(yoke);
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const x = Math.cos(a) * 0.118, y = Math.sin(a) * 0.118;
    const tooth = lib.box(0.026, 0.048, 0.016, M.steel);
    tooth.position.set(x, y, 0);
    tooth.rotation.z = a;
    g.add(tooth);
    const coil = lib.box(0.036, 0.056, 0.010, M.copper);
    coil.position.set(x, y, -dir * 0.011);
    coil.rotation.z = a;
    g.add(coil);
  }
  return g;
}

/* One halfshaft, centred on its own origin so lib.spin works.
   Local +z points outboard. Carried over from Gen 1: same forgings. */
function halfshaft() {
  const g = new THREE.Group();
  const shaft = zc(lib.cyl(0.022, 0.40, M.steel, 16));
  g.add(shaft);
  for (const s of [-1, 1]) {
    const joint = zc(lib.cyl(0.036, 0.055, M.darkSteel, 18));
    joint.position.z = s * 0.215;
    g.add(joint);
    const boot = lib.cone(0.042, 0.07, M.rubber, 20);
    boot.rotation.x = s * Math.PI / 2;
    boot.position.z = s * 0.155;
    g.add(boot);
  }
  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* ── housing: two shallow dishes, open on +z so the disc stack shows ── */
  const housing = lib.part('housing', [0, -0.25, 0]);
  const rim = ringMesh(0.168, 0.157, 0.110, M.castAlu, 48);
  rim.position.set(A2[0], A2[1], 0.040);
  housing.add(rim);
  const rearDish = zc(lib.cyl(0.168, 0.012, M.castAlu, 48));
  rearDish.position.set(A2[0], A2[1], -0.021);
  housing.add(rearDish);
  const hubBoss = zc(lib.cyl(0.045, 0.022, M.castAlu, 24));
  hubBoss.position.set(A2[0], A2[1], -0.038);
  housing.add(hubBoss);
  /* rim bolt ring on the open face */
  const rimBolts = lib.bolts(16, 0.162, 0.006, M.steel);
  rimBolts.rotation.x = Math.PI / 2;
  rimBolts.position.set(A2[0], A2[1], 0.098);
  housing.add(rimBolts);
  /* oil collection scroll ridge at the rim of the rear dish */
  const scroll = lib.torus(0.150, 0.010, M.castAlu, 40, 10);
  scroll.position.set(A2[0], A2[1], -0.030);
  housing.add(scroll);
  /* radial stiffening ribs on the rear dish */
  for (let i = 0; i < 5; i++) {
    const a = 0.5 + i * 1.1;
    const rib = lib.box(0.085, 0.012, 0.010, M.castAlu);
    rib.position.set(A2[0] + Math.cos(a) * 0.105, A2[1] + Math.sin(a) * 0.105, -0.033);
    rib.rotation.z = a;
    housing.add(rib);
  }
  /* neck from the hub down to the gear case, then the shallow gear case */
  const neck = zc(lib.cyl(0.048, 0.09, M.castAlu, 24));
  neck.position.set(A2[0], A2[1], -0.070);
  housing.add(neck);
  for (const [ax, r] of [[B2, 0.055], [C2, 0.085]]) {
    const caseDrum = zc(lib.cyl(r, 0.11, M.castAlu, 32));
    caseDrum.position.set(ax[0], ax[1], GZ2);
    housing.add(caseDrum);
  }
  const caseFill = lib.box(0.08, 0.10, 0.11, M.castAlu);
  caseFill.position.set(-1.475, 0.405, GZ2);
  housing.add(caseFill);
  const coverBolts = lib.bolts(8, 0.074, 0.005, M.steel);
  coverBolts.rotation.x = Math.PI / 2;
  coverBolts.position.set(C2[0], C2[1], -0.217);
  housing.add(coverBolts);
  /* oil-to-coolant plate heat exchanger under the case, with water stubs */
  const oilCooler = lib.box(0.10, 0.030, 0.09, M.castAlu);
  oilCooler.position.set(-1.48, 0.245, -0.08);
  housing.add(oilCooler);
  for (const [zz, mat] of [[-0.105, M.coolant], [-0.055, M.coolantHot]]) {
    const stub = lib.cyl(0.008, 0.05, mat, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(-1.42, 0.245, zz);
    housing.add(stub);
  }
  sys.add(housing);

  /* ── stators: two discs flanking the rotor, exploding apart on z ── */
  const statorOut = lib.part('stators', [0, 0, 0.55]);
  const discOut = statorDisc(1);
  discOut.position.set(A2[0], A2[1], Z_ST_OUT);
  statorOut.add(discOut);
  sys.add(statorOut);

  const statorIn = lib.part('stators', [0, 0, -0.3]);
  const discIn = statorDisc(-1);
  discIn.position.set(A2[0], A2[1], Z_ST_IN);
  statorIn.add(discIn);
  /* phase leads exit the inboard disc toward the integrated inverter */
  for (let i = 0; i < 3; i++) {
    const lead = lib.cyl(0.006, 0.045, M.copper, 10);
    lead.position.set(-1.51 + i * 0.025, 0.50, Z_ST_IN);
    statorIn.add(lead);
  }
  sys.add(statorIn);

  /* ── rotor disc: magnet carrier + carbon band, spins about z ── */
  const rotor = lib.part('rotor-disc', [0, 0, 0.3]);
  const rotorSpin = new THREE.Group();
  const carrier = zc(lib.cyl(0.132, 0.012, M.plasticLt, 48));
  rotorSpin.add(carrier);
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    const mag = lib.box(0.030, 0.052, 0.016, M.cell);
    mag.position.set(Math.cos(a) * 0.105, Math.sin(a) * 0.105, 0);
    mag.rotation.z = a;
    rotorSpin.add(mag);
  }
  const band = ringMesh(0.146, 0.132, 0.018, M.carbon, 48);
  rotorSpin.add(band);
  const hub = zc(lib.cyl(0.030, 0.030, M.steel, 20));
  rotorSpin.add(hub);
  const shaft = zc(lib.cyl(0.016, 0.28, M.steel, 14));
  shaft.position.z = -0.115;      /* reaches the gear case pinion */
  rotorSpin.add(shaft);
  const sensorRing = zc(lib.cyl(0.026, 0.010, M.copper, 16));
  sensorRing.position.z = -0.055;
  rotorSpin.add(sensorRing);
  rotorSpin.position.set(A2[0], A2[1], Z_ROT);
  lib.spin(rotorSpin, 'z', 60);
  rotor.add(rotorSpin);
  sys.add(rotor);

  /* ── gearset: stepped cylinders on the three axes, shorter ratio ── */
  const gearset = lib.part('gearset', [0, 0, -0.45]);
  const pinion = zc(lib.cyl(0.019, 0.050, M.steel, 24));
  pinion.position.set(A2[0], A2[1], GZ2);
  gearset.add(pinion);
  const layBig = zc(lib.cyl(0.045, 0.024, M.steel, 32));
  layBig.position.set(B2[0], B2[1], -0.145);
  gearset.add(layBig);
  const laySmall = zc(lib.cyl(0.033, 0.030, M.steel, 24));
  laySmall.position.set(B2[0], B2[1], -0.185);
  gearset.add(laySmall);
  const layShaft = zc(lib.cyl(0.011, 0.09, M.darkSteel, 12));
  layShaft.position.set(B2[0], B2[1], GZ2);
  gearset.add(layShaft);
  const ringGear = zc(lib.cyl(0.083, 0.028, M.steel, 44));
  ringGear.position.set(C2[0], C2[1], -0.185);
  gearset.add(ringGear);
  const ringWeb = zc(lib.cyl(0.050, 0.012, M.darkSteel, 26));
  ringWeb.position.set(C2[0], C2[1], -0.185);
  gearset.add(ringWeb);
  sys.add(gearset);

  /* ── differential: resized case on the ring gear axis + output stubs ── */
  const diff = lib.part('differential', [0, 0, -0.65]);
  const diffCase = zc(lib.cyl(0.042, 0.080, M.castAlu, 24));
  diffCase.position.set(C2[0], C2[1], -0.140);
  diff.add(diffCase);
  const diffBolts = lib.bolts(8, 0.033, 0.005, M.steel);
  diffBolts.rotation.x = Math.PI / 2;
  diffBolts.position.set(C2[0], C2[1], -0.175);
  diff.add(diffBolts);
  const stubOut = zc(lib.cyl(0.022, 0.050, M.steel, 16));
  stubOut.position.set(C2[0], C2[1], -0.225);
  diff.add(stubOut);
  /* intermediate shaft carrying drive to the far-side inner joint */
  const interShaft = zc(lib.cyl(0.015, 0.46, M.steel, 12));
  interShaft.position.set(C2[0], C2[1], 0.070);
  diff.add(interShaft);
  sys.add(diff);

  /* ── halfshafts: four, both axles, spinning, exploding outboard ── */
  for (const ax of [P.axleR, P.axleF]) {
    for (const s of [-1, 1]) {
      const hs = lib.part('halfshafts', [0, 0, s * 0.75]);
      const shaftG = halfshaft();
      shaftG.position.set(ax === P.axleR ? C2[0] : 1.45, P.wheelY, s * 0.52);
      lib.spin(shaftG, 'z', 40);
      hs.add(shaftG);
      sys.add(hs);
    }
  }

  /* ── integrated inverter: pocket on the housing inboard face ── */
  const inverter = lib.part('inverter', [0, 0.4, -0.35]);
  const invBody = lib.box(0.24, 0.14, 0.050, M.castAlu);
  invBody.position.set(-1.49, 0.46, -0.055);
  inverter.add(invBody);
  const invLid = lib.box(0.22, 0.12, 0.008, M.alu);
  invLid.position.set(-1.49, 0.46, -0.084);
  inverter.add(invLid);
  /* DC link film capacitor block beside the module row */
  const dcLink = lib.box(0.055, 0.085, 0.028, M.plasticLt);
  dcLink.position.set(-1.565, 0.445, -0.098);
  inverter.add(dcLink);
  /* short solid busbars bridging into the housing face */
  for (let i = 0; i < 3; i++) {
    const bar = zc(lib.cyl(0.006, 0.030, M.busbar, 10));
    bar.position.set(-1.44 + i * 0.025, 0.485, -0.018);
    inverter.add(bar);
  }
  /* DC feed toward the pack at 462 V nominal, 584 A peak */
  const dcFeed = lib.tube([
    [-1.375, 0.50, -0.085],
    [-1.32, 0.46, -0.06],
    [-1.27, 0.42, -0.02],
  ], 0.008, M.hv);
  inverter.add(dcFeed);
  /* coolant stubs on the pocket flank */
  for (const [yy, mat] of [[0.425, M.coolant], [0.49, M.coolantHot]]) {
    const stub = lib.cyl(0.007, 0.04, mat, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(-1.625, yy, -0.055);
    inverter.add(stub);
  }
  sys.add(inverter);

  /* ── SiC power modules: three flat packs on the inverter lid ── */
  const modules = lib.part('power-modules', [0, 0.75, -0.35]);
  for (let i = 0; i < 3; i++) {
    const xx = -1.545 + i * 0.058;
    const pack = lib.box(0.048, 0.055, 0.018, M.plasticLt);
    pack.position.set(xx, 0.50, -0.093);
    modules.add(pack);
    const tab = lib.box(0.028, 0.010, 0.004, M.busbar);
    tab.position.set(xx, 0.532, -0.090);
    modules.add(tab);
  }
  sys.add(modules);

  /* ── front drive unit: carried over from Gen 1, inverter included ── */
  const front = lib.part('front-unit', [0.4, -0.05, 0]);
  const fDrum = zc(lib.cyl(0.115, 0.24, M.castAlu, 32));
  fDrum.position.set(1.47, 0.38, 0.06);
  front.add(fDrum);
  const fNose = zc(lib.cyl(0.06, 0.05, M.castAlu, 24));
  fNose.position.set(1.47, 0.38, 0.20);
  front.add(fNose);
  const fCase = zc(lib.cyl(0.12, 0.11, M.castAlu, 32));
  fCase.position.set(1.45, 0.36, -0.13);
  front.add(fCase);
  const fBulge = zc(lib.cyl(0.075, 0.09, M.castAlu, 26));
  fBulge.position.set(1.45, P.wheelY, -0.21);
  front.add(fBulge);
  const fBolts = lib.bolts(8, 0.10, 0.006, M.steel);
  fBolts.rotation.x = Math.PI / 2;
  fBolts.position.set(1.45, 0.36, -0.188);
  front.add(fBolts);
  for (const a of [0.9, 1.57, 2.24]) {
    const rib = lib.box(0.020, 0.010, 0.22, M.castAlu);
    rib.position.set(1.47 + Math.cos(a) * 0.119, 0.38 + Math.sin(a) * 0.119, 0.06);
    rib.rotation.z = a;
    front.add(rib);
  }
  const fStub = zc(lib.cyl(0.024, 0.05, M.steel, 16));
  fStub.position.set(1.45, P.wheelY, -0.267);
  front.add(fStub);
  const fInter = zc(lib.cyl(0.016, 0.44, M.steel, 14));
  fInter.position.set(1.45, P.wheelY, 0.06);
  front.add(fInter);
  /* its inverter, now counted as part of the unit: same box, new dies */
  const fInvBody = lib.box(0.24, 0.05, 0.28, M.castAlu);
  fInvBody.position.set(1.46, 0.535, 0);
  front.add(fInvBody);
  const fInvFins = lib.fins(0.20, 0.014, 0.24, 10, 0.005, M.alu);
  fInvFins.position.set(1.46, 0.567, 0);
  front.add(fInvFins);
  const fFeed = lib.tube([
    [1.40, 0.53, 0.10],
    [1.38, 0.50, 0.115],
    [1.42, 0.47, 0.10],
  ], 0.010, M.hv);
  front.add(fFeed);
  sys.add(front);

  return sys;
}
