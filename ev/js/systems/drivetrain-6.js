/* Drive units, Gen 5 apex. NAMING: module id and file use the -6 suffix
   because the -5 ids belong to the demoted value study; every user-facing
   label says Gen 5 (see design/gen5-apex.md).

   The rear in-wheel pair EVOLVED, with the Gen 3 verdict addressed point
   by point: bearing life (ceramic hybrid elements plus gap probes),
   sealing (vacuum-potted stators plus a dry-air purge fed from the
   suspension-4 air supply), service loops (dual redundant, per-loop
   monitored). The front axle keeps the axial-flux machine, now on the
   900 V class bus with a GaN three-level inverter; front in-wheel stays
   rejected on steering articulation and hub packaging, and the content
   says Gen 3 called it and it still holds.

   BINDING interface contract with wheels-3 (design/gen3.md, VERBATIM):
   at each rear corner the motor annulus, radius 0.155 to 0.235 spanning
   world |z| 0.72 to 0.80, belongs to this module; wheels-3 leaves it void
   and provides the rim flange face at |z| = 0.72. Rear-corner part groups
   explode z-outward at magnitude 0.85, the motor rings at 0.97 (the extra
   0.12 opens the flange joint), and the system-level explode is zero,
   matching wheels-3, so the shared corner stays level through the whole
   explode range. Nothing here enters the rim/tire volume.

   Gen 5 preset partners, reconciled per design/retro-gen4.md:
   - battery-6 (builds in this same workflow; the later reviewer sees both
     sides): 900 V class bus, 810 V nominal, 630 to 861 V window (861 at
     full charge, nine volts under hv-4's input ceiling).
   - hv-4: converter input 300 to 870 V brackets the whole pack window;
     rear corner runs (16 mm2, sized at 148 A) land on the service-loop
     brackets at (-1.36, 0.40, +/-0.63), kept at exactly those points;
     front tunnel run ends at (1.30, 0.402, 0.015) and this module's
     front DC landing meets it at (1.32, 0.405, 0.01).
   - suspension-4: rear-steer is the fourth vectoring input, commanded
     through its chassis ECU, never directly; the corner purge air names
     its dried 15 bar supply. Its rear-steer hardware lives at y <= 0.22
     and the coordinator harnesses stay above and clear of it.
   - wheels-3: contract above; its master-unit brake-priority line over
     this module's vectoring coordinator carries over by name.
   The vectoring coordinator moved aft to x -1.71..-1.57, z -0.18..-0.02,
   clear of the hv-4 converter volume (x -1.53..-1.21, y 0.36..0.49,
   z +/-0.22) and its input boss; harness runs cross below y 0.335. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'drivetrain-6',
  name: 'Drive units · Gen 5 apex',
  color: 0xe8a24c,
  explode: [0, 0, 0],
  blurb: 'Gen 3 shipped in-wheel drive with an open verdict and an itemized bill. Gen 5 keeps the wager and pays the bill by name: potted and purged stators, ceramic hybrid bearings with gap telemetry, dual service loops, and a front axial-flux unit moved to the 900 V bus on GaN. 480 kW, 130 kg, and torque vectoring gains a fourth input, suspension-4\'s rear-steer.',
  parts: {
    'stator-rings': {
      name: 'Wheel motor stator rings',
      tagline: 'Same annulus, same 900 Nm, 40% more power: the torque was already at the physics ceiling, so the evolution went into heat and speed.',
      mass: 29,
      count: 2,
      specs: [
        ['Topology', 'Outer rotor, 18 coils, 20 poles (carried)'],
        ['Working radius', '158 to 192 mm, the binding annulus'],
        ['Peak per corner', '105 kW / 900 Nm (Gen 3: 75 / 900)'],
        ['Continuous', '55 kW / 550 Nm (Gen 3: 40 / 450)'],
        ['Windings', 'Vacuum-potted solid, dry-air purged corner'],
        ['Maturity', 'Potting production practice; purge pilot line'],
      ],
      how: 'Peak torque does not move, and that is the honest headline. Gen 3 computed that 900 Nm from this annulus works out to roughly 50 kPa of magnetic shear stress, the ragged upper edge of what liquid-cooled permanent-magnet machines achieve, and the annulus is a binding contract: radius 0.155 to 0.235 m, 80 mm of axial span, shared with the wheels-3 rim and not negotiable. Shear stress does not scale with resources, so unlimited resources buy no more torque from the same gap. What they buy is everywhere else on the map. The 810 V nominal bus from battery-6 raises the voltage ceiling the back-EMF runs into, so the ring holds its 900 Nm to a higher wheel speed before field weakening bites, and peak power per corner rises from 75 to 105 kW with the magnetics untouched. The continuous rating rises further, 40 to 55 kW, because the whole winding is now vacuum-potted: epoxy fills every void from copper to jacket wall, cutting winding-to-coolant thermal resistance roughly threefold and spreading the zero-speed hot coil, Gen 3\'s hill-hold villain, into its potted neighbours.\n\nThe potting is also half of the sealing answer, because Gen 3 confessed that a failed lip seal now floods a stator instead of wetting a drum. A potted winding is a solid block: water that gets in finds no exposed copper, no crossing to track, and drains back out of a machine that no longer cares. The other half is that the corner stops being passively sealed at all. A 4 mm line teed from the suspension-4 air supply, which already dries every litre through its desiccant bed, holds the motor cavity at about 50 mbar over ambient on roughly two litres a minute: the corner leaks outward, always, and a pressure-washer lance meets escaping dry air instead of a vulnerable lip. Potting is production practice, named in principle from industrial traction and marine machines that have run flooded-environment duty for decades. The purge is pilot line, and what has to become true is specific: the rotating seal interface must hold the overpressure across the full temperature swing without the purge flow creeping up into a compressor duty item that suspension-4 would notice.',
      why: 'Gen 3 sized this ring at the shear ceiling and took the mass penalty for one reason, per-wheel authority, and Gen 5 does not pretend the ceiling moved. Spending the evolution on thermals instead is what the physics actually offered: continuous torque is a heat problem, heat problems respond to engineering, and 550 Nm continuous per corner is what the vectoring coordinator cashes the investment into.',
      fail: [
        'A dead purge quietly returns the corner to Gen 3 sealing: still potted, still survivable, but the margin is gone; a dew-point sensor in the cavity trends moisture so the regression is telemetry, not archaeology.',
        'Potting deleted the rewind: a faulted winding is a ring swap, because epoxy that bonds heat out also bonds the copper in, and no service bay will ever dig it free.',
        'The zero-speed derate survives, softened: one coil holding the car on a kerb ramp still triples its duty, and the observer that protects it still arrives exactly when a driver with a trailer wants it least.',
      ],
      explode: [0, 0, 0.97],
    },
    'rotor-rings': {
      name: 'Wheel motor rotor rings',
      tagline: 'The Halbach ring\'s magnetics needed nothing; its chemistry did. Every pole now lives in a welded stainless can.',
      mass: 15,
      count: 2,
      specs: [
        ['Magnets', 'NdFeB, 20 poles, Halbach array (carried)'],
        ['Canning', '0.3 mm austenitic stainless, laser-welded, hermetic'],
        ['Mounting', 'Twelve titanium bolts to the wheels-3 flange (carried)'],
        ['Airgap', '1.0 mm radial, bearing-controlled (carried)'],
        ['Drag, gates off', '~55 W per corner at 110 km/h'],
        ['Maturity', 'Pilot line (hermetic canning at wheel scale)'],
      ],
      how: 'The array carries over intact: twenty poles with tangentially magnetised segments between them, steering flux inward toward the stator and nearly silent on the outer face, no back iron anywhere. What changes is what stands between the magnets and the road. Gen 3 disclosed that NdFeB corrodes enthusiastically, that a stone chip through the epoxy coat lets a pole swell and delaminate, and it bought a service line item no earlier generation had: visual inspection at every tire change. Gen 5 seals each pole group inside a 0.3 mm austenitic stainless can, laser-welded shut, hermetic. Austenitic because it is non-magnetic and high-resistivity, thin because a conductive sheet in an alternating field pays eddy loss; even so the can costs about 10 W per corner at motorway speed, netted against finer magnet segmentation to hold the gates-off drag near 55 W where Gen 3 paid 60. The tire-change ritual survives but changes species: a can is inspected like a pressure part, by looking for dents and weld-line cracks, not like a chemistry experiment.\n\nThe other carried liability is the joint. Every drive-to-regen transition still reverses torque through the twelve titanium flange bolts, and fretting at that friction-critical joint is still the wear mode the torque-stretch spec exists to prevent. The evolution is bookkeeping with teeth: captive load-indicating washers under each bolt head report preload at every service, and the vectoring coordinator counts torque-reversal cycles per corner, so the fatigue budget is a running ledger instead of an assumption. The wheels-3 park-and-rescue drum still lives millimetres away inside this ring, its dragged rescue stop still a heat event beside magnets, and the corner controller still trades braking forward to the friction discs when the magnet temperature model approaches the knee. That handoff is carried unchanged because it was right.',
      why: 'This is what unlimited resources look like when the physics is already correct: the magnetics of the Halbach ring were never the problem, so the effort goes into chemistry and statistics, a hermetic barrier against the environment and instrumentation against the one fatigue mode the joint owns. Boring retention was Gen 3\'s achievement; durable retention is Gen 5\'s.',
      fail: [
        'The can is hermetic until it is not, and a breach is invisible from outside: the tell is a slow back-EMF amplitude drift per corner as a wet pole ages, watched per drive by the same telemetry that watches the gap.',
        'The weld line flexes with the 20-pole force ripple for the life of the car; pilot-line honesty says what must become true: salt spray plus a design life of reversal cycles on the welded can without a delamination signature, proven on rigs now, on fleets only eventually.',
        'A dented can that still seals can still touch the stator across 1.0 mm; any strike that marks a can books the same runout-and-gap inspection a kerbed rim already triggers on the wheels-3 side.',
      ],
      explode: [0, 0, 0.97],
    },
    'hub-bearings': {
      name: 'Hub bearing units',
      tagline: 'Gen 3 made the bearing motor structure and named three ways it ages. Gen 5 answers each: ceramic elements, deleted arc path, and a gap that reports every drive.',
      mass: 19,
      count: 2,
      specs: [
        ['Type', 'Double-row angular contact, silicon nitride elements'],
        ['Bore', '120 mm (carried)'],
        ['Airgap budget', '0.30 of the 1.0 mm gap is bearing tilt (Gen 3: 0.35)'],
        ['Gap telemetry', 'Three eddy-current probes, once per revolution'],
        ['Grounding ring', 'Deleted: ceramic elements do not conduct the arc'],
        ['Maturity', 'Hybrid bearing production practice; probes pilot line'],
      ],
      how: 'Gen 3\'s three bearing confessions were exact: a pothole strike can brinell the races into a once-per-revolution hum, the shaft grounding ring is a wear part in a place nobody looks, and preload relaxation spends airgap budget diagnosable only by a slow-roll test invented for this car. The first answer is the rolling elements themselves. Silicon nitride rollers are roughly 60% lighter than steel, so their own centrifugal load drops, and they are hard enough that the classic brinelling mechanism inverts: the dent, when a big enough pothole finds it, forms in the steel race under a ceramic roller at measurably higher load thresholds than steel-on-steel. Hybrid bearings are production practice, named in principle from machine-tool spindles and the motor shafts of most current EV drive units, where they were adopted for exactly the second answer: ceramic does not conduct. The inverter common-mode current that Gen 1 tamed with an insulated race and Gen 3 re-tamed with a grounding ring now has no path through the bearing at all, and the grounding ring, the wear part nobody looks at, is deleted rather than improved.\n\nThe third answer is to stop inferring the gap and start measuring it. Three eddy-current probes on the carrier web read the rotor flange runout once per revolution, every revolution, and the corner controller trends the orbit: brinelling announces itself the day it happens as a new once-per-rev component, preload relaxation shows as a slow tilt drift over months, and the slow-roll back-EMF test moves from the service bay into telemetry. The tilt allocation in the 1.0 mm airgap budget tightens from 0.35 to 0.30 mm, and that reclaimed 0.05 mm is handed straight back to the machine as thermal-growth margin. The negative-spring physics is untouched and untouchable: the magnet ring still pulls about 4 kN per millimetre of eccentricity, the bearing still out-stiffens an inverted spring under a 0.9 g corner, and the sizing argument still closes with a test.',
      why: 'These remain the least optional kilograms in the system, because gap collapse is still a magnet ring meeting a coil ring at wheel speed. The half kilogram per corner spent on ceramic elements and probes buys the two things a safety-critical structure wants most: fewer ageing mechanisms, and the remaining ones on camera.',
      fail: [
        'Ceramic elements fail by cracking, not by the slow spalling that steel announces for thousands of kilometres; rarer, but sudden. The gap probes are the compensating control, and the pairing is deliberate: quieter failure mode, louder instrumentation.',
        'The probes live in wheel spray and winter salt, qualified to the same environment as the bearing they watch; pilot-line honesty says the claim that the sensor outlives the sensed is exactly the claim the fleet has to prove.',
        'The race steel still takes the dent even under a ceramic roller, the softer partner always does; the threshold moved, the mechanism did not, and the worst pothole of the car\'s life still ends at a corner replacement, not a bearing swap.',
      ],
      explode: [0, 0, 0.85],
    },
    'gan-inverters': {
      name: 'Rim-side GaN inverters',
      tagline: 'The topology was right; the packaging was the bet. Embedded-die construction deletes every bond wire the vibration was fatiguing.',
      mass: 5,
      count: 2,
      specs: [
        ['Topology', 'Three-level flying capacitor, 650 V GaN (carried)'],
        ['Packaging', 'Embedded die: plated copper vias, zero bond wires'],
        ['Switching', '100 kHz per device, 200 kHz ripple (carried)'],
        ['DC link', 'Ceramic stack, 12 uF (carried)'],
        ['Peak phase current', '260 A (carried); bus 810 V nominal'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'Everything Gen 3 argued from physics carries over untouched, which is its vindication: the flying-capacitor bridge that halves the voltage per die and admits 650 V GaN to the high bus, the ceramic DC link that replaced a film capacitor no potting could qualify for a wheel, the 100 kHz loop that holds torque smooth with no gear lash left to hide behind. What Gen 3 could not argue away was time: automotive GaN at 40 g had a fleet history measured in years, and the solder and sinter joints earned this part number the system\'s only five-year preventive replacement interval. Gen 5 attacks the joints by removing them. In embedded-die packaging the dies are laminated inside the board itself and interconnected by plated copper vias grown in place: no bond wires to resonate, no solder balls to shear, the two classic vibration fatigue sites deleted rather than reinforced, with sinter-silver carrying the die attach. The moving part count of the package drops to zero in the sense that matters at 40 g: nothing in the current path is a wire in bending.\n\nThe honesty ledger transfers rather than closes. The replacement interval extends to ten years on accelerated vibration data, and the claim that it can retire entirely is labeled extrapolated: what has to become true is a corner-inverter fleet reaching a decade at wheel-level vibration without an on-resistance drift signature, and no rig compresses a decade of thermal cycling and salt without an argument attached. The active balancing of the flying capacitors, monitored every cycle, carries over with its derate-on-suspicion policy, and the cold plate still shares the stator jacket, so a mountain descent still derates the corner as one unit while the front axle carries on alone, a fallback this family has kept since Gen 1.',
      why: 'One inverter per motor was settled in Gen 3 and stays settled: the alternative is chopped phases flexing through the service loops and radiating from a moving antenna. The corner is the worst mounting environment on the vehicle, so the evolution went precisely where the environment was doing its damage: the package, not the topology.',
      fail: [
        'Embedded die is unrepairable by construction: there is no lid to lift and no module to swap, so diagnosis is replacement, and the board is stocked and scheduled as the wear part its interval says it is.',
        'The new wear hypothesis is laminate CTE cycling, copper vias working against board resin through every thermal sweep; the accelerated model that blesses the ten-year interval is itself the claim under test.',
        'A drifting flying-capacitor sense divider still forces a corner derate on suspicion, carried from Gen 3, because the failure it prevents is still a fired die at speed.',
      ],
      explode: [0, 0, 0.85],
    },
    'service-loops': {
      name: 'Dual service loops',
      tagline: 'Gen 3 taught the loop to confess. Gen 5 gives it a twin, so the confession stops being urgent.',
      mass: 7,
      count: 2,
      specs: [
        ['Conductors', 'Two loops per corner, 16 mm2 DC pair each, class 6'],
        ['Redundancy', 'Either loop carries the full corner alone, diode-ORed'],
        ['Bend control', '90 mm radius, jacket-enforced plane (carried)'],
        ['Corner current', '130 A peak at 810 V (Gen 3: 148 A at 508 V)'],
        ['Monitoring', 'Per-loop resistance trend, every drive (carried)'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The fix is not cleverer copper; it is a second loop. Gen 3 engineered one cable like the CV joint it replaced, fine strands near 0.1% bending strain, a jacket rib enforcing the bend plane, and, its real invention, a resistance trend measured every drive so that strand fatigue books a service visit instead of concentrating heat at pack voltage in a moving cable. Gen 5 keeps every gram of that thinking and duplicates it: loops A and B per corner, each rated for the corner\'s full 130 A, joined at the inverter landing through ideal-diode ORing stages, the same passive-handover pattern hv-4 uses for the by-wire feeds, named. A flagged loop is opened by its own solid-state switch and the corner never notices; the swap goes on the next scheduled service instead of this week\'s calendar. The failure that Gen 3 turned from silent into announced, Gen 5 turns from announced into unhurried.\n\nThe sizing paragraph is really a partner reconciliation, per the drift failure class retro-gen4 named. The evolved corner peaks at 105 kW where Gen 3 drew 75, yet peak current falls from 148 A to 130, because battery-6\'s 810 V nominal bus is 60% above the 508 V these corners first drank from: power up 40%, current down 12. hv-4\'s two 16 mm2 corner runs were sized at 148 A against the generation they shipped with, so they carry this generation unchanged and end where they always did, on the loop brackets at x -1.36, y 0.40, z plus and minus 0.63, kept at exactly those points. Each loop is 16 mm2 rather than Gen 3\'s single 25, matching the fixed run upstream, and the same jacketed bundle now carries the 4 mm purge air line out to the stator, so the corner\'s whole umbilical flexes as one engineered object.',
      why: 'Every analysis that kills in-wheel on paper cites unsprung mass first and this cable second, and Gen 3 answered only with monitoring. Doubling the loop makes corner loss from cable fatigue a two-fault event, which is the difference between a wear part and a failure point, and in-wheel drive\'s credibility was always exactly the credibility of this copper.',
      fail: [
        'The loops share one routing plane and one bracket, so the redundancy is against fatigue, not geometry: the kerb strike that crushes one crushes both, and the corner isolation that follows is the same event Gen 3 owned.',
        'Connector fretting still mimics strand fatigue in the trend, so a flagged loop is still replaced with both its connectors, no diagnosis attempted; the policy carries because the ambiguity does.',
        'Twice the loops is twice the fretting population and twice the cold-morning stiff cycles; the fatigue model still books sub-zero kilometres at triple weight, now across two cables per corner.',
      ],
      explode: [0, 0, 0.85],
    },
    'tv-controller': {
      name: 'Vectoring coordinator',
      tagline: 'Three motors and, for the first time, an angle: suspension-4\'s rear-steer becomes the fourth input of one yaw budget.',
      mass: 2,
      specs: [
        ['Inputs', 'Left rear, right rear, front axle torque + rear-steer angle'],
        ['Loop rate', '1 kHz corner torque, 100 Hz yaw (carried)'],
        ['Yaw authority', '±2,500 Nm continuous from the rear pair alone'],
        ['Rear-steer ownership', 'suspension-4 chassis ECU; demands exchanged at 1 kHz'],
        ['Safety', 'Dual channel, dissimilar code, 5 ms cross-check (carried)'],
        ['Maturity', 'Loops production practice; four-input allocation pilot line'],
      ],
      how: 'Gen 3 built per-wheel authority; Gen 4 built rear-steer; the Gen 5 news is that they stop being separate products. Four actuators can now shape the car\'s yaw: left rear torque, right rear torque, front axle torque, and the plus-or-minus 3 degree rear-steer angle, and the allocation between them follows bandwidth and energy rather than department lines. A torque split answers in milliseconds but pays current for as long as it holds; an angle takes tens of milliseconds to arrive and then costs nothing to keep. So the coordinator spends torque on transients, the lane-change entry, the split-grip launch, the phase lead no tire can provide, and hands the steady state to geometry: in a long motorway curve the rear axle steers a fraction of a degree and the asymmetric torque that Gen 3 held for the whole curve rings to zero. The rear pair\'s own authority rises with the stator\'s continuous rating, 550 Nm opposed per side working out to about 2,500 Nm of standing yaw moment against Gen 3\'s 2,200, available with the steering straight.\n\nOwnership is the part that has to be exact, per the partner-reconciliation law. This box never commands the rear-steer actuator: suspension-4\'s chassis ECU owns that schedule, its speed-phase map and its fail ladder, and the two computers exchange yaw demands at 1 kHz across the hv-4 zonal bus. The arbitration ladder above both is carried by name: a braking demand from the wheels-3 master-unit overrides any vectoring demand within 2 milliseconds, always, provably, and the chassis ECU sits deliberately below safety, so its death pins the rear axle to centre and this coordinator falls back to three-motor allocation, a case run in fault injection, not argued on paper. The dual-channel, dissimilar-code, 5 ms cross-check architecture carries from Gen 3 unchanged, because a stuck-high wheel motor is still a yaw fault and still fails dangerous, not safe.',
      why: 'Gen 3 closed its verdict honestly open: per-wheel authority was the one unmatchable return, and whether it was reason enough the fleet would answer. Gen 5\'s answer is that authority compounds. The fourth input did not add a fourth of capability; it changed what the other three are worth, because torque freed from holding steady-state yaw is torque available for the transient, and the bills that kept the verdict open, sealing, bearings, loops, are each answered by name on the neighbouring panels, with maturity labels attached. In-wheel stays because its return grew, not because its costs vanished: 130 kg against Gen 3\'s 138, the unsprung adder down about 1.5 kg per corner, and the ride cost of what remains now answered by the preset itself, suspension-4\'s preview-fed active dampers doing at 48 V bandwidth what Gen 3\'s semi-active hardware could only half do.',
      fail: [
        'Two computers negotiating one yaw budget at 1 kHz is a new class of fault: not a dead box but a live disagreement, bounded by the rule that this coordinator\'s torque demands saturate rather than fight a rear-steer angle it did not expect.',
        'Vectoring still steers against an estimated tire grip, and the estimator is still tested by injecting lies into it; the fourth input raises the stakes, because a wrong grip estimate can now be spent through an angle as well as a torque.',
        'The dissimilar-code validation bill, inherited from Gen 3 and the Gen 2 brake unit before it, is now paid across two interacting controllers; every release of either reopens the file.',
      ],
      explode: [0, 0.5, 0],
    },
    'front-unit': {
      name: 'Front drive unit',
      tagline: 'The twice-proven axial-flux machine, third generation on duty, and the wheels it drives stay motorless on purpose: Gen 3 called it, and it still holds.',
      mass: 50,
      specs: [
        ['Machine', 'Yokeless axial flux, 270 kW / 450 Nm (carried)'],
        ['Reduction', '5.95:1 two-stage, open diff (carried)'],
        ['Bus', '810 V nominal, 900 V class (battery-6)'],
        ['Housing', 'Additively built AlSi10Mg, printed load-path ribs'],
        ['Mass detail', '40 kg unit + 8 kg halfshafts + 2 kg mounts'],
        ['Maturity', 'Machine production practice; AM housing pilot line'],
      ],
      how: 'The first question an apex generation must answer here is why the front wheels do not get motors too, and the answer is Gen 3\'s, unchanged and restated: front in-wheel fails on steering articulation and hub packaging, and no quantity of resources repeals either. A steered corner sweeps its service loop through torsion as well as bending, and torsion is the strain regime fine-strand copper survives worst; the rear loops live on a controlled single-plane bend that a steering axis would destroy. Packaging is harsher still: the kingpin axis must pass near the contact patch centre, and a motor annulus filling the rim pushes that axis outboard until scrub radius grows and every pothole becomes a steering input, on the axle that steers. And the front rim volume is already spoken for: wheels-3 sizes its 355 mm discs by the alpine, full-pack, dead-HV stop that software cannot refuse, and that iron claims the space a front ring would want. Restraint is what apex looks like when the physics says no.\n\nWhat did evolve is the machine\'s third posting. The dual 24-coil stator discs, the carbon-hooped 20-pole rotor capped at 10,000 rpm, the 5.95:1 gearset and open differential carry over bolt for bolt from their Gen 2 birth and Gen 3 relocation, the strongest kind of hardware claim the programme owns. The housing is new: additively built AlSi10Mg dishes with ribs printed exactly along the load paths a topology optimiser drew, 1.5 kg out of the casting at equal stiffness, and the oil baffle that Gen 3 welded in after discovering what a 1 g regenerative stop does to a forward-facing sump is now printed in as one wall. One ledger note keeps the comparison honest: Gen 3\'s 49 kg unit figure carried its pocket inverter inside, and this 40 kg machine does not, because the front inverter now answers on its own panel. The duty carries from Gen 3: this is the daily machine, cruising in its 96 to 97% island, taking the larger regeneration share because load transfer favours the front under braking, the same physics Gen 1 cited when it first sized an axle for harvest.',
      why: 'Gen 5 concentrates its risk at the rear corners on purpose, and this axle is where the certainty is stored: a machine that held 270 kW as the working rear axle loafs at 20 kW of cruise load here, deep in its efficiency island, with two generations of fleet behind its bearings and its hoop. The apex move on proven hardware is to leave it alone loudly.',
      fail: [
        'Full torque through steered Rzeppa joints was new in Gen 3 and the boot statistics are still accumulating; the best-known numbers in the company still do not transfer to these joint angles, and boot life remains an open ledger.',
        'An additively built housing swaps die-cast porosity, a known defect population, for lack-of-fusion voids, an unknown one; the helium pressure check carries over, but pilot-line honesty says the defect statistics restart at zero.',
        'The 20-pole whine at 1.7 kHz still lives a bulkhead from the driver\'s feet; harmonic injection carries over with its thinner margin, and the fleet microphones are still the referee.',
      ],
      explode: [0.4, -0.05, 0],
    },
    'front-inverter': {
      name: 'Front GaN inverter',
      tagline: 'The corner-proven three-level bridge moves into the housing pocket: the hardest qualification in the family, retired to the easiest seat.',
      mass: 3,
      specs: [
        ['Topology', 'Three-level flying capacitor, 650 V GaN'],
        ['Rating', '270 kW; 333 A peak at 810 V (was 531 at 508)'],
        ['Switching', '60 kHz per device, 120 kHz effective'],
        ['DC link', 'Ceramic stack, 30 uF, in the cast pocket'],
        ['Peak efficiency', '99.5% (Gen 2 SiC: 99.3)'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'Gen 3 qualified this topology in the worst seat on the car, bolted to a wheel at 40 g; Gen 5 installs it in the best, the machined pocket in the housing\'s inboard face where Gen 2\'s SiC board set lived at 3 g. The argument for three-level GaN over two-level SiC is the same one the corners proved: the flying capacitor halves the bus per device, so 650 V lateral GaN serves an 810 V nominal bus, and 60 kHz per device with 120 kHz effective ripple lets 30 uF of stacked ceramic do what 190 uF of film did in Gen 2, deleting the last wound capacitor in the drive system and 8 mm of pocket depth with it. Peak efficiency moves from 99.3 to 99.5%, two tenths that read as nothing and compound as something: across the partial-load region where the car lives, GaN\'s near-zero switching tail is worth 1 to 2% of everything this axle touches, and this is the axle that touches every kilometre.\n\nThe reconciliation paragraph, per the retro-gen4 law, is the quiet victory. hv-4\'s front run kept its 50 mm2 section and 600 A 30-second rating when it was sized against 531 A at the Gen 3 pack\'s 508 V; at battery-6\'s 810 V nominal the same 270 kW peaks at 333 A, so the run that was once within 12% of its rating now peaks at 55% of it, margin recovered from voltage alone, and the tunnel run still lands on this pocket\'s DC boss where it always did. Upstream, hv-4\'s converter input window, 300 to 870 V, brackets the entire battery-6 window by name: 861 V at full charge, nine volts under the ceiling, and a 630 V sag floor more than twice the input floor, which is the reconciliation retro-gen4 demanded written where the numbers live.',
      why: 'One power-electronics family in two homes: the corner and the pocket share dies, gate drivers, balancing logic, and one qualification file, which is the Gen 1 module-family philosophy carried to its third silicon generation. The pocket integration itself is Gen 2\'s deleted-cable argument, kept because it was never wrong.',
      fail: [
        'The flying-capacitor balance must hold at 270 kW scale, ten times the corner\'s power through the same logic; a drifting sense divider here derates the daily axle, not a helper, and the car feels it.',
        '650 V GaN at the 431 V a die sees at battery-6\'s 861 V ceiling is 66% of rating, above the 56% Gen 2 accepted on its freshly charged SiC, and GaN\'s neutron burnout dataset is a decade younger than SiC\'s; the fleet failure model carries wider error bars on both counts and says so.',
        'The ceramic link now thermal-cycles against a pocket wall that also sees gear heat; cracked ceramic is an open, not a short, so the failure is a ripple alarm and a limp, designed that way because the other order is a fire.',
      ],
      explode: [0.45, 0.4, 0],
    },
  },
};

/* ── Geometry ── */

const RX = P.axleR;             // -1.45, rear axle x
const WY = P.wheelY;            // 0.355
const RING_Z = 0.76;            // motor annulus centre plane, |z|

/* Front unit axes, carried from drivetrain-3's installation. */
const A6 = [1.48, 0.40];        // motor disc axis
const B6 = [1.505, 0.458];      // intermediate axis
const C6 = [1.45, P.wheelY];    // ring gear / halfshaft axis
const GZ6 = -0.16;              // gear case centre plane, z

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

/* One halfshaft, centred on its own origin so lib.spin works.
   Local +z points outboard. Same forgings as Gen 1 through Gen 3. */
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

/* Rotor ring: canned Halbach magnet ring on a steel carrier, bolted to
   the wheels-3 rim flange at the |z| = 0.72 plane. Lives entirely inside
   the contract annulus (r 0.155..0.235, |z| 0.72..0.80). The thin inner
   sleeve is the stainless can face over the pole set. Spins with wheel. */
function rotorRingPart(s) {
  const part = lib.part('rotor-rings', [0, 0, s * 0.97]);
  const spinG = new THREE.Group();
  const carrier = ringMesh(0.235, 0.212, 0.062, M.steel, 48);
  carrier.position.z = s * 0.007;
  spinG.add(carrier);
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    const mag = lib.box(0.012, 0.052, 0.058, M.cell);
    mag.position.set(Math.cos(a) * 0.205, Math.sin(a) * 0.205, s * 0.003);
    mag.rotation.z = a;
    spinG.add(mag);
  }
  /* hermetic can inner face: thin stainless skin over the pole faces,
     riding the airgap side of the magnets (teeth tips end at r 0.192,
     magnet faces start at 0.199; the can sits between, never touching) */
  const can = ringMesh(0.1975, 0.194, 0.056, M.alu, 48);
  can.position.z = s * 0.003;
  spinG.add(can);
  const flange = ringMesh(0.235, 0.188, 0.008, M.steel, 48);
  flange.position.z = -s * 0.034;
  spinG.add(flange);
  /* twelve nuts on the same r 0.225 circle as the wheels-3 rim flange
     bolt heads, so the joint reads as one fastener set from both sides;
     load-indicating washers live under these heads per the content */
  const bolts = lib.bolts(12, 0.225, 0.0045, M.steel);
  bolts.rotation.x = Math.PI / 2;
  bolts.position.z = -s * 0.027;
  spinG.add(bolts);
  spinG.position.set(RX, WY, s * RING_Z);
  lib.spin(spinG, 'z', 30);
  part.add(spinG);
  return part;
}

/* Stator ring: SMC yoke, 18 outward-facing potted coils, water jacket in
   the bore, purge stub at top, phase leads exiting inboard. Static; all
   inside the annulus. */
function statorRingPart(s) {
  const part = lib.part('stator-rings', [0, 0, s * 0.97]);
  const g = new THREE.Group();
  g.position.set(RX, WY, s * RING_Z);
  const yoke = ringMesh(0.178, 0.158, 0.072, M.steel, 48);
  g.add(yoke);
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const x = Math.cos(a), y = Math.sin(a);
    const tooth = lib.box(0.014, 0.036, 0.066, M.steel);
    tooth.position.set(x * 0.185, y * 0.185, 0);
    tooth.rotation.z = a;
    g.add(tooth);
    const coil = lib.box(0.018, 0.054, 0.048, M.copper);
    coil.position.set(x * 0.182, y * 0.182, 0);
    coil.rotation.z = a;
    g.add(coil);
  }
  /* potting end rings: the epoxy fill read as two resin bands */
  for (const e of [-1, 1]) {
    const pot = lib.torus(0.182, 0.006, M.plasticLt, 48, 10);
    pot.position.z = e * 0.028;
    g.add(pot);
  }
  const jacket = lib.torus(0.163, 0.007, M.coolant, 48, 10);
  g.add(jacket);
  /* water stubs inside the annulus, outboard of the wheels-3 flange face
     at |z| 0.72; the run to the body is behind the upright (implied),
     matching the Gen 3 house pattern */
  for (const da of [-0.35, 0.35]) {
    const a = Math.PI * 1.5 + da;
    const stub = zc(lib.cyl(0.007, 0.030, da < 0 ? M.coolant : M.coolantHot, 10));
    stub.position.set(Math.cos(a) * 0.163, Math.sin(a) * 0.163, -s * 0.020);
    g.add(stub);
  }
  /* dry-air purge stub at the top of the cavity; the crossing of the
     flange plane is implied like the coolant runs */
  const purge = zc(lib.cyl(0.0045, 0.030, M.plasticLt, 8));
  purge.position.set(0, 0.163, -s * 0.020);
  g.add(purge);
  /* phase leads sit inboard of the flange plane, meeting the inverter
     busbars; the crossing behind the spinning flange is implied */
  for (const adeg of [80, 90, 100]) {
    const a = (adeg / 180) * Math.PI;
    const lead = zc(lib.cyl(0.006, 0.05, M.copper, 10));
    lead.position.set(Math.cos(a) * 0.170, Math.sin(a) * 0.170, -s * 0.070);
    g.add(lead);
  }
  part.add(g);
  return part;
}

/* Hub bearing unit: preloaded double-row hybrid bearing, five-spoke
   carrier web inboard of the flange plane, static bore sleeve carrying
   the stator inside the annulus, rotating stud flange. The Gen 3
   grounding ring is deliberately absent (ceramic elements do not
   conduct); three eddy-current gap probes ride the web inboard face.
   Spoke phase 0.9 dodges the wheels-3 drum gearmotor. */
function hubBearingPart(s) {
  const part = lib.part('hub-bearings', [0, 0, s * 0.85]);
  const g = new THREE.Group();
  g.position.set(RX, WY, s * 0.755);
  const housing = zc(lib.cyl(0.072, 0.075, M.castAlu, 28));
  g.add(housing);
  /* spoke web plate in the band between the wheels-3 drum backplate
     (world |z| <= 0.702) and the flange plane at 0.72 */
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.9;
    const spoke = lib.box(0.077, 0.024, 0.009, M.castAlu);
    spoke.position.set(Math.cos(a) * 0.1075, Math.sin(a) * 0.1075, -s * 0.0405);
    spoke.rotation.z = a;
    g.add(spoke);
  }
  /* gap probes: three sensor nubs between the spokes, reading the rotor
     flange orbit once per revolution */
  for (const a of [1.55, 3.65, 5.75]) {
    const probe = lib.box(0.012, 0.012, 0.008, M.sensor);
    probe.position.set(Math.cos(a) * 0.132, Math.sin(a) * 0.132, -s * 0.046);
    probe.rotation.z = a;
    g.add(probe);
  }
  /* stator carrier sleeve: threads the gap between the drum hardware
     (r <= 0.148) and the stator yoke bore (0.158), inside the annulus */
  const sleeve = ringMesh(0.156, 0.150, 0.066, M.castAlu, 48);
  sleeve.position.z = s * 0.005;
  g.add(sleeve);
  /* stud flange rides the rotating race: own origin-centred group on the
     axle axis so it spins with the wheel in drive mode */
  const studSpin = new THREE.Group();
  const studFlange = zc(lib.cyl(0.060, 0.014, M.steel, 24));
  studSpin.add(studFlange);
  const studs = lib.bolts(5, 0.048, 0.006, M.steel);
  studs.rotation.x = Math.PI / 2;
  studs.position.z = s * 0.009;
  studSpin.add(studs);
  studSpin.position.z = s * 0.040;
  lib.spin(studSpin, 'z', 30);
  g.add(studSpin);
  part.add(g);
  return part;
}

/* Rim-side GaN inverter: embedded-die board pack on the carrier web,
   upper quadrant, thinner than the Gen 3 cased unit, with ceramic DC
   link, busbars to the phase leads, and the ORed DC landing both service
   loops feed. */
function ganInverterPart(s) {
  const part = lib.part('gan-inverters', [0, 0, s * 0.85]);
  const body = lib.box(0.12, 0.06, 0.026, M.castAlu);
  body.position.set(RX, 0.50, s * 0.690);
  part.add(body);
  const board = lib.box(0.10, 0.05, 0.005, M.pcb);
  board.position.set(RX, 0.50, s * 0.674);
  part.add(board);
  const capStack = lib.box(0.040, 0.016, 0.016, M.plasticLt);
  capStack.position.set(RX - 0.030, 0.538, s * 0.688);
  part.add(capStack);
  for (const adeg of [80, 90, 100]) {
    const a = (adeg / 180) * Math.PI;
    const bar = zc(lib.cyl(0.005, 0.018, M.busbar, 10));
    bar.position.set(RX + Math.cos(a) * 0.170, WY + Math.sin(a) * 0.170, s * 0.700);
    part.add(bar);
  }
  /* DC landing with the ideal-diode ORing stage for loops A and B */
  const dcLanding = lib.box(0.040, 0.022, 0.030, M.hv);
  dcLanding.position.set(RX - 0.058, 0.50, s * 0.680);
  part.add(dcLanding);
  return part;
}

/* Dual service loops: two HV DC umbilicals from the body-rail bracket
   (kept at the hv-4 landing point, -1.36, 0.40, +/-0.63), each drooping
   through its own controlled bend to the inverter DC landing, plus the
   4 mm purge air line riding the same bundle. Orange, per SPEC. */
function serviceLoopPart(s) {
  const part = lib.part('service-loops', [0, 0, s * 0.85]);
  const bracket = lib.box(0.028, 0.055, 0.028, M.plastic);
  bracket.position.set(-1.36, 0.40, s * 0.63);
  part.add(bracket);
  /* loop A */
  part.add(lib.tube([
    [-1.36, 0.395, s * 0.63],
    [-1.42, 0.33, s * 0.615],
    [-1.50, 0.295, s * 0.625],
    [-1.555, 0.33, s * 0.65],
    [-1.545, 0.43, s * 0.665],
    [-1.507, 0.487, s * 0.673],
  ], 0.008, M.hv));
  /* loop B: its own bend plane, offset, same landing */
  part.add(lib.tube([
    [-1.352, 0.385, s * 0.645],
    [-1.415, 0.345, s * 0.658],
    [-1.49, 0.315, s * 0.672],
    [-1.548, 0.35, s * 0.688],
    [-1.54, 0.44, s * 0.695],
    [-1.505, 0.485, s * 0.690],
  ], 0.008, M.hv));
  /* purge air line to the corner, dry side of the bundle */
  part.add(lib.tube([
    [-1.35, 0.378, s * 0.615],
    [-1.41, 0.33, s * 0.603],
    [-1.48, 0.31, s * 0.616],
    [-1.53, 0.35, s * 0.645],
    [-1.52, 0.44, s * 0.666],
    [-1.478, 0.498, s * 0.694],
  ], 0.0045, M.plasticLt));
  const clamp = lib.box(0.020, 0.034, 0.024, M.plastic);
  clamp.position.set(-1.542, 0.445, s * 0.668);
  part.add(clamp);
  return part;
}

/* Vectoring coordinator: one box in the rear drive zone, moved aft of the
   hv-4 converter volume (x -1.53..-1.21, y 0.36..0.49, z +/-0.22) so the
   Gen 5 preset packages clean. Harnesses run below y 0.335 to the corner
   brackets and toward the suspension-4 chassis ECU (its box at -0.95,
   0.334, -0.28; the last centimetres are implied, house pattern). */
function tvControllerPart() {
  const part = lib.part('tv-controller', [0, 0.5, 0]);
  const body = lib.box(0.14, 0.045, 0.16, M.castAlu);
  body.position.set(-1.64, 0.43, -0.10);
  part.add(body);
  const pcb = lib.box(0.12, 0.006, 0.14, M.pcb);
  pcb.position.set(-1.64, 0.456, -0.10);
  part.add(pcb);
  for (const zo of [-0.15, -0.05]) {
    const conn = lib.box(0.028, 0.020, 0.036, M.plastic);
    conn.position.set(-1.567, 0.425, zo);
    part.add(conn);
  }
  /* corner harnesses: below the converter floor at y 0.36, above the
     rear subframe top at y 0.30 */
  part.add(lib.tube([
    [-1.565, 0.415, -0.155],
    [-1.50, 0.325, -0.35],
    [-1.42, 0.32, -0.55],
    [-1.37, 0.385, -0.605],
  ], 0.0035, M.plastic));
  part.add(lib.tube([
    [-1.60, 0.41, -0.045],
    [-1.55, 0.325, 0.20],
    [-1.45, 0.325, 0.50],
    [-1.37, 0.385, 0.605],
  ], 0.0035, M.plastic));
  /* yaw-demand link toward the suspension-4 chassis ECU, hugging the
     underfloor gap under the hv-4 ring laminate (bottom face y 0.339) */
  part.add(lib.tube([
    [-1.655, 0.405, -0.155],
    [-1.60, 0.332, -0.30],
    [-1.40, 0.330, -0.33],
    [-1.15, 0.331, -0.30],
    [-1.06, 0.332, -0.285],
  ], 0.0030, M.plastic));
  return part;
}

/* Front drive unit: the Gen 2 axial-flux machine on its third posting,
   in the additively built housing. Dishes, gear case, mounts, and both
   front halfshafts (spinning). The inverter pocket contents belong to
   the front-inverter part. All inside P.driveF. */
function frontUnitPart() {
  const part = lib.part('front-unit', [0.4, -0.05, 0]);

  /* disc housing: rim ring closed by two dishes */
  const rim = ringMesh(0.168, 0.157, 0.110, M.castAlu, 48);
  rim.position.set(A6[0], A6[1], 0.040);
  part.add(rim);
  const inDish = zc(lib.cyl(0.168, 0.012, M.castAlu, 48));
  inDish.position.set(A6[0], A6[1], -0.021);
  part.add(inDish);
  const outDish = zc(lib.cyl(0.168, 0.012, M.castAlu, 48));
  outDish.position.set(A6[0], A6[1], 0.101);
  part.add(outDish);
  const hubBoss = zc(lib.cyl(0.045, 0.022, M.castAlu, 24));
  hubBoss.position.set(A6[0], A6[1], 0.116);
  part.add(hubBoss);
  const rimBolts = lib.bolts(16, 0.162, 0.006, M.steel);
  rimBolts.rotation.x = Math.PI / 2;
  rimBolts.position.set(A6[0], A6[1], 0.098);
  part.add(rimBolts);
  /* printed load-path ribs: seven, following the optimiser's spider */
  for (let i = 0; i < 7; i++) {
    const a = 0.35 + i * 0.82;
    const rib = lib.box(0.080, 0.010, 0.010, M.castAlu);
    rib.position.set(A6[0] + Math.cos(a) * 0.108, A6[1] + Math.sin(a) * 0.108, -0.030);
    rib.rotation.z = a;
    part.add(rib);
  }

  /* neck down to the gear case, then the shallow case on two axes */
  const neck = zc(lib.cyl(0.048, 0.09, M.castAlu, 24));
  neck.position.set(A6[0], A6[1], -0.070);
  part.add(neck);
  for (const [ax, r] of [[B6, 0.055], [C6, 0.085]]) {
    const caseDrum = zc(lib.cyl(r, 0.11, M.castAlu, 32));
    caseDrum.position.set(ax[0], ax[1], GZ6);
    part.add(caseDrum);
  }
  const caseFill = lib.box(0.08, 0.10, 0.11, M.castAlu);
  caseFill.position.set(1.475, 0.405, GZ6);
  part.add(caseFill);
  const coverBolts = lib.bolts(8, 0.074, 0.005, M.steel);
  coverBolts.rotation.x = Math.PI / 2;
  coverBolts.position.set(C6[0], C6[1], -0.217);
  part.add(coverBolts);

  /* oil-to-coolant plate under the case, with water stubs */
  const oilCooler = lib.box(0.09, 0.028, 0.08, M.castAlu);
  oilCooler.position.set(1.48, 0.246, -0.08);
  part.add(oilCooler);
  for (const [zz, mat] of [[-0.105, M.coolant], [-0.055, M.coolantHot]]) {
    const stub = lib.cyl(0.008, 0.05, mat, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(1.42, 0.246, zz);
    part.add(stub);
  }

  /* diff output stub and intermediate shaft */
  const stubOut = zc(lib.cyl(0.022, 0.050, M.steel, 16));
  stubOut.position.set(C6[0], C6[1], -0.225);
  part.add(stubOut);
  const interShaft = zc(lib.cyl(0.015, 0.46, M.steel, 12));
  interShaft.position.set(C6[0], C6[1], 0.070);
  part.add(interShaft);

  /* mounts: two bushes to the front subframe */
  for (const sz of [-1, 1]) {
    const bush = zc(lib.cyl(0.025, 0.040, M.rubber, 16));
    bush.position.set(1.60, 0.28, sz * 0.28);
    part.add(bush);
  }

  /* both front halfshafts, spinning, in this part's 50 kg */
  for (const sz of [-1, 1]) {
    const shaftG = halfshaft();
    shaftG.position.set(C6[0], C6[1], sz * 0.52);
    lib.spin(shaftG, 'z', 30);
    part.add(shaftG);
  }

  return part;
}

/* Front GaN inverter: the pocket on the housing inboard face, GaN board
   row, ceramic link, busbars into the housing, coolant stubs, and the
   810 V DC feed whose landing at (1.32, 0.405, 0.01) meets the hv-4
   tunnel run end at (1.30, 0.402, 0.015). */
function frontInverterPart() {
  const part = lib.part('front-inverter', [0.45, 0.4, 0]);
  const body = lib.box(0.24, 0.13, 0.044, M.castAlu);
  body.position.set(1.49, 0.455, -0.053);
  part.add(body);
  const lid = lib.box(0.22, 0.11, 0.006, M.alu);
  lid.position.set(1.49, 0.455, -0.078);
  part.add(lid);
  /* embedded-die GaN packs on the lid face */
  for (let i = 0; i < 3; i++) {
    const pack = lib.box(0.045, 0.045, 0.010, M.plasticLt);
    pack.position.set(1.415 + i * 0.055, 0.472, -0.086);
    part.add(pack);
  }
  /* ceramic DC link block */
  const link = lib.box(0.05, 0.06, 0.018, M.plasticLt);
  link.position.set(1.575, 0.44, -0.086);
  part.add(link);
  /* short solid busbars bridging into the housing face */
  for (let i = 0; i < 3; i++) {
    const bar = zc(lib.cyl(0.006, 0.030, M.busbar, 10));
    bar.position.set(1.44 + i * 0.025, 0.485, -0.018);
    part.add(bar);
  }
  /* thin 810 V DC feed to the pack: the hv-4 partner landing */
  part.add(lib.tube([
    [1.40, 0.50, -0.055],
    [1.36, 0.45, -0.02],
    [1.32, 0.405, 0.01],
  ], 0.008, M.hv));
  /* coolant stubs on the pocket flank */
  for (const [yy, mat] of [[0.425, M.coolant], [0.487, M.coolantHot]]) {
    const stub = lib.cyl(0.007, 0.04, mat, 10);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(1.625, yy, -0.053);
    part.add(stub);
  }
  return part;
}

export function build() {
  const sys = new THREE.Group();

  /* rear corners: motor rings, bearing, inverter, dual loops, per side */
  for (const s of [-1, 1]) {
    sys.add(rotorRingPart(s));
    sys.add(statorRingPart(s));
    sys.add(hubBearingPart(s));
    sys.add(ganInverterPart(s));
    sys.add(serviceLoopPart(s));
  }

  sys.add(tvControllerPart());
  sys.add(frontUnitPart());
  sys.add(frontInverterPart());

  return sys;
}
