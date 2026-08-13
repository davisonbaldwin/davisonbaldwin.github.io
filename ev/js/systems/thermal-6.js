/* Thermal, Gen 5 apex. NAMING: the module id and filename carry the -6
   suffix because the -5 ids belong to the demoted value study; every
   user-facing label says Gen 5 (design/gen5-apex.md).

   The generation's move: the battery stops being a customer of the glycol
   loop and becomes a boiler. Dielectric fluid stands in battery-6's pool,
   boils at the plate edges, and hands 25 kW of fast-charge loss to outside
   air through a condenser, with no compressor in the path. The heat pump,
   the front stack and the cabin core carry over from Gen 1 (js/systems/
   thermal.js) with their duty rewritten around that.

   Zones held: front stack x [2.08, 2.26] (P.thermalFront) and firewall
   HVAC x [0.78, 1.00], both unchanged since Gen 1. Loop hardware sits
   behind the stack under the frunk floor (y <= 0.55), the house pattern
   Gen 1 set. Two deliberate zone entries, both to land on a partner's own
   stub inside that partner's zone: the drivetrain-6 oil circuit landings
   inside P.driveF, and the battery-6 gallery stubs at the pack face.

   Gen 5 preset partners, reconciled per design/retro-gen4.md and
   retro-gen5.md (reconcile against the PRESET, not the slot's ancestor):
   - battery-6 (binding, both sides built in this workflow): liquid feed
     stub (1.27, 0.15, 0.10), 24 mm, face at x 1.297; vapor return stub
     (1.27, 0.27, -0.10), 36 mm, face at x 1.297. Design load 25 kW at the
     630 A plateau = 0.284 kg/s of vapor on 88 kJ/kg, about 21 L/s at
     1.2 bar, 20 m/s through its two 26 mm headers. Matched exactly here:
     the riser opens to 48 mm on this side and says why.
   - drivetrain-6: literal landings, no dead ends. Front inverter pocket
     stubs (1.645, 0.425, -0.053) cold and (1.645, 0.487, -0.053) hot;
     gearbox oil-to-coolant stubs (1.395..1.445, 0.246, -0.105) cold and
     (1.395..1.445, 0.246, -0.055) hot. Rear corner stator jackets are fed
     through drivetrain-6's own service-loop bundle, whose crossing of the
     wheels-3 flange plane that module declares implied; not redrawn here.
   - hv-4: converter coolant stubs (-1.43, 0.40, 0.247) and (-1.31, 0.40,
     0.247) are landed by the long loop; its thermal HV spur ends at
     (1.70, 0.55, 0.42) and lands on the compressor terminal box here.
   - body-6: intake gates, 4 slats spanning y 0.175 to 0.375 at x 2.335,
     z +-0.42, feeding this stack. Verified on this side: the bank lines up
     with the radiator row (y 0.26 to 0.40) and stops 65 mm short of the
     condenser row (y 0.44 to 0.74), so the plenum in the 75 mm gap between
     body-6's slats and this core face has to turn the flow up and spread
     it. Turning vanes are drawn on the stack's forward face, inside the
     zone. The gate opening at z +-0.42 brackets both cores in width.
   - autonomy-4: its compute cold plate stubs (-0.795, 0.42, -+0.05) are
     landed. Its content tees that plate off "the pack cold loop"; this
     preset has no pack glycol loop, so the plate moved onto the long
     electronics loop. Noted for the integrator.
   - suspension-4: its air supply owns x 1.82..1.98, y 0.25..0.40; all
     loop hardware here stays above y 0.36 or outboard of it.

   Mass ledger, binding +-2 kg: 7 + 8 + 8 + 4 + 16 + 7 + 8 = 58 kg, of
   which 15 kg is fluid and 9 L of that stands inside battery-6. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'thermal-6',
  name: 'Thermal · Gen 5 apex',
  color: 0x58d6a6,
  explode: [1.5, 0.35, 0],
  blurb: 'This slot stood still from Gen 1 through Gen 4 because no pack on the ladder ever asked for more than a glycol loop could carry. battery-6 asks: 25 kW dissipated in one envelope at the charge plateau, which Gen 1\'s answer would have met with 8 kW of compressor and 33 kW to reject. Two-phase immersion answers it with 1.2 kW of fans instead, because a fluid that boils moves heat at 88 kJ per kilogram and a pack allowed to sit at 68 °C has 28 K of delta to a hot day. 58 kg, and every two-phase claim wears its pilot line label.',
  parts: {
    condenser: {
      name: 'Vapor condenser and receiver',
      tagline: 'The one place in the car where 25 kilowatts stop being a phase change and start being warm air.',
      mass: 7,
      specs: [
        ['Core', '770 x 300 x 45 mm brazed aluminium, 0.23 m² frontal'],
        ['Duty', '25 kW condensing at battery-6\'s 630 A plateau'],
        ['Saturation window', '54 °C at 1.2 bar, 68 °C at 1.8 bar'],
        ['Air side', '4,950 m³/h at 40 °C ambient, 16 K rise'],
        ['Receiver', '0.9 L shell, 0.6 L working; 3.5 kPa of head over the pool'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'Vapor arrives along the top header at the saturation temperature the pressure set has chosen, gives up its 88 kJ per kilogram against tube walls the fans are holding near air temperature, and leaves the bottom header as liquid a few kelvin subcooled. The whole 25 kW crosses at one temperature, which is what makes the core small: a single-phase radiator has to spread its load across a coolant that warms as it goes, so its driving delta collapses along the flow path, while a condensing core sees the same delta on every tube. The sizing case is the worst hour this car has, a 40 °C afternoon on a 542 kW charge with no ram air at all: the pressure set raises saturation to 68 °C, the 28 K delta pulls 4,950 m³/h through the core at a 16 K air rise, and the arithmetic closes with a core one third the volume of Gen 1\'s radiator (js/systems/thermal.js, 880 x 500 x 42 mm for 28 kW).\n\nThe core sits in the upper row of the stack, above the glycol radiator, and the reason is gravity rather than air. Condensate leaves the bottom header at y 0.427 and falls into a receiver whose working level sits at y 0.375, about 228 mm above the pool surface battery-6 holds at y 0.147, which is 3.5 kPa of static head. That head is the entire pumping budget of this loop on level ground: 2.2 kPa of it is spent in the vapor riser and about 0.4 in the liquid return, so the loop runs as a thermosiphon with roughly a kilopascal in hand and no pump at all. Put this core in the lower row and the head disappears, which is why the intake compromise described on the radiator panel was resolved the way it was. The receiver also does the job every condensing system needs done: it holds the charge that the vapor space displaces as load changes, so the condenser never floods at low duty or starves at high.',
      why: 'This slot stood still from Gen 1 through Gen 4 and the arithmetic says why: Gen 2\'s solid-state stacks and Gen 3\'s cell-to-body blades each rejected under 10 kW at their charge plateau, which Gen 1\'s 28 kW radiator and 8 kW chiller covered with margin, and Gen 4 rebuilt the nervous system because the bottleneck was control, not heat. Nothing forced a redesign until a pack arrived that dissipates 25 kW inside one envelope. Gen 1 also stated the rule this part exists to exploit: radiator cooling is nearly free in energy terms, chiller cooling costs about 1 kW of compressor for every 3 kW moved. Moving battery-6\'s 25 kW the Gen 1 way would have meant 8 kW of compressor and 33 kW to reject instead of 25. The only way out of that arithmetic is to let the heat leave at a temperature above ambient, and the only way to hold a 150 kWh pack at one temperature while it dumps 25 kW is to boil something. This core is where that decision cashes out: a compressor-free path from cell edge to outside air on the hottest day the car is rated for.',
      fail: [
        'Non-condensable gas is the specific enemy of a condenser and it collects here first: a few grams of air blanket the coldest tubes, capacity falls with no temperature symptom anywhere else, and the purge pot on the pressure set exists for exactly this. The tell is condensing pressure drifting up at unchanged duty.',
        'A stone through the core is worse than a glycol leak: the charge is a sealed inventory with no roadside top-up, so a breach vents the loop to atmosphere, the pack falls back to derated charging on the liquid galleries alone, and the car says so rather than continuing at full current.',
        'Flooding at low duty would subcool the condensate and dull the response of the whole loop; the receiver is sized against that, but a stuck level sensor lets it happen quietly, which is why level and condensing pressure are cross-checked rather than trusted separately.',
      ],
      explode: [0.55, 0.35, 0],
    },
    radiator: {
      name: 'Radiator stack and fans',
      tagline: 'Half the core Gen 1 needed and twice the fan: the pack left the glycol loop, and the sizing case left the road.',
      mass: 8,
      specs: [
        ['Core', '500 x 140 x 40 mm louvred, lower row of the stack'],
        ['Rating', '12 kW at 100 km/h ram; 5 kW parked on fans alone'],
        ['Fans', '2 x 400 mm brushless, 4,950 m³/h combined, 650 W each'],
        ['Air supply', 'body-6 intake gates, 4 slats at y 0.175 to 0.375'],
        ['Stack order', 'Condenser above, radiator below, one shroud, one fan bank'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Two cores share one frame and one fan bank, stacked vertically rather than in series, so neither breathes the other\'s exhaust. The split is by duty, not by size. The condenser\'s sizing hour is a parked fast charge, when the drivetrain is making no heat at all; the radiator\'s sizing hour is a sustained climb or a long descent on regen, when the pack is barely working. The two loads almost never peak together, so giving each core its own fresh air costs frontal area the nose can afford, and it removes the argument about which fluid deserves the front row. What is left for glycol is small: front inverter and gearbox on one loop, compute, converter and corner jackets on the other, twelve kilowatts at the top of the range against the twenty-eight Gen 1 sized its single radiator for.\n\nThe fans are the part that grew. Gen 1 spent 400 W a side to move 2,400 m³/h because its parked case was a 250 kW charge rejecting through a chiller; this stack has to pull 4,950 m³/h through a condenser at 200 Pa on a 40 °C afternoon, so each fan is a 650 W machine and the pair draws 1.2 kW at full song. That is the whole energy bill for rejecting 25 kW, and it is worth writing next to the 8 kW of compressor the same job would have cost as chiller duty. Air arrives from body-6\'s intake gates, and this side of that interface has an honest note attached. The gate bank spans y 0.175 to 0.375, which lines up almost exactly with the radiator row at 0.26 to 0.40 and stops 65 mm short of the condenser row at 0.44 to 0.74, because a sealed nose wants its opening low in the stagnation region while a thermosiphon wants its condenser high. The 75 mm plenum between the slats and this core face therefore has to turn the flow up and spread it across 300 mm of condenser, which two turning vanes on the stack\'s forward face do, and which the fans behind both cores make acceptable rather than fatal.',
      why: 'A radiator is sized by the hour it cannot refuse, and this generation moved that hour. Once the pack rejects through its own condenser, nothing left on the glycol side has a parked worst case worth 28 kW, so the core shrinks by two thirds and the mass goes into fans that serve both rows. Keeping the fans in one bank behind both cores is the packaging argument Gen 1 made and it survives: the frontal plane is the scarce resource in the nose, and every square centimetre spent on a second shroud is area not spent on heat transfer.',
      fail: [
        'One fan out is now a bigger event than it was: with 25 kW of condensing duty on the same bank, the survivor at full speed holds roughly 60 percent of design air, and the pressure set answers by raising saturation temperature, which the pack pays for in ageing rather than in minutes.',
        'The intake plenum turns flow upward through roughly 30 degrees, so the condenser row sees a less uniform approach than a bench test does; the honest consequence is that the last two kelvin of the rated delta are a tunnel claim, not a rig claim.',
        'Leaves and salt pack the lower row first because it sits directly in the gate exit; the tell is fan duty rising at unchanged coolant temperature, the same signature Gen 1 named and no less annoying for being predicted.',
      ],
      explode: [0.45, -0.28, 0],
    },
    'heat-pump': {
      name: 'Integrated heat pump',
      tagline: 'Gen 1\'s scroll without the battery chiller it used to feed: the compressor now works for the cabin and for the cold morning, and nothing else.',
      mass: 8,
      specs: [
        ['Compressor', 'Electric scroll, 27 cm³/rev, 900 to 9,000 rpm'],
        ['Refrigerant', 'R1234yf, 780 g (Gen 1: 950 g)'],
        ['Heating', '7 kW at -10 °C; COP about 3 in mild cold, 1.8 at -10'],
        ['Exchangers', 'Cabin condenser plate stack + gallery conditioner'],
        ['Preconditioning', '6 kW into the gallery liquid, about 1.1 K per minute'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The machine is Gen 1\'s, and the carry is the point: an electric scroll compressing R1234yf, a water-cooled condenser feeding the cabin loop, an accumulator on the suction line because a scroll that ingests liquid hydrolocks, and the same deliberate lossy modes below about -25 °C so that even the inefficiency lands in the loop as useful heat. What changed is that its largest customer left. Gen 1 sized this compressor partly around an 8 kW battery chiller for hot-day fast charging, and that duty is gone: the pack now rejects through its own condenser at 68 °C, above ambient, where refrigeration has nothing to offer. Displacement falls from 33 to 27 cm³ per revolution and the charge from 950 to 780 g, and the machine spends its life on the load that actually justifies a heat pump, the cabin.\n\nThe second plate stack is the new one and it points the other way. Below 15 °C, battery-6 refuses fast charge outright, because plating goes filamentary at low temperature and the lithium reserve in an anode-free cell is zero by definition; its own panels say the current map holds that floor and that preconditioning is what reaches it. The gallery conditioner is that path: a refrigerant-to-fluid plate stack sitting in the liquid return, which puts up to 6 kW of heat-pump output straight into the fluoroketone the galleries circulate. Below saturation nothing boils, so the same plumbing runs single-phase and warm, driven by the condensate pump rather than by gravity. The pack and its fluid together are about 317 kJ per kelvin, so 6 kW moves the field at 1.1 K per minute, and a 35 K precondition from a winter morning to the charge window is roughly half an hour, or considerably less with drive-unit waste heat routed in through the valve block. The two computers stay honest about the target: the field crosses the floor together, or the current map does not open.',
      why: 'The apex move here was subtraction. A heat pump earns its mass on the load it can move against a temperature gradient nature will not give you for free, and after two-phase cooling arrived there is exactly one such load left in this car: cabin comfort in winter, plus the cold pack that has to be dragged to 15 °C before it can accept a charge. Everything else now rejects to air. Deleting the chiller duty took a kilogram out of the compressor and 170 g out of the charge, and it removed the failure mode Gen 1 named first, a braze crack cross-leaking refrigerant into glycol, from the pack\'s critical path entirely.',
      fail: [
        'COP still collapses toward 1 below about -20 °C, carried from Gen 1 unimproved, and the preconditioning promise inherits that: a -25 °C morning buys its 35 K at close to resistive efficiency, and the range estimate has to say so before the driver leaves rather than after.',
        'The gallery conditioner is the one place refrigerant and pack fluid meet across a wall; a braze crack there puts R1234yf into a loop whose pressure sets the boiling point of the battery, so the plate stack is double-walled with a vented interstitial space and the vent is monitored.',
        'The compressor is a single machine with no redundancy, and cabin heat is not safety critical, but preconditioning now depends on it; the honest fallback is slower charging in winter, stated as such, not a hidden derate.',
      ],
      explode: [0.15, 0.45, 0.35],
    },
    'pressure-set': {
      name: 'Gallery pressure set',
      tagline: 'The thermostat of a 150 kWh pack is a pressure regulator, and every kelvin it buys is booked against cycle life.',
      mass: 4,
      specs: [
        ['Setpoint', 'Dome regulator, 1.0 to 1.9 bar, 0.02 bar steps'],
        ['Saturation', '49 °C at 1.0 bar, 54 at 1.2, 68 at 1.8'],
        ['Buffer', 'Twin bellows vessels, 1.0 L total'],
        ['Purge', 'Non-condensable pot with getter cartridge'],
        ['Condensate pump', '20 W gear pump, attitude and precondition duty'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'A saturated fluid has one degree of freedom: fix the pressure and the temperature follows. So the control surface for the whole pack is a regulator, not a valve schedule, and battery-6 states the mapping this side owns: 1.0 bar boils at 49 °C, 1.8 bar at 68. The dome regulator holds the vapor space against a reference volume, a pair of bellows vessels totalling 1.0 L absorbs the swing as the vapor inventory changes with load, and there is nothing inside the battery envelope that moves. The setpoint is scheduled against ambient rather than against load, because the number that matters is the delta the condenser can work with: on a 15 °C day 1.2 bar gives 39 K and is ample, on a 40 °C day the same setting gives 14 K and the stack cannot reject 25 kW through it, so the regulator walks up toward 1.8 bar until the condenser closes its own energy balance. Raising the setpoint buys twice: the ambient delta grows, and the vapor densifies from 13.9 to 20.1 kg per cubic metre, which drops header velocity from 19 to 13 m/s and the riser loss with it.\n\nThe cost is the reason the schedule is stingy. Sixty-eight degrees is a temperature this chemistry tolerates for the twenty minutes of a charge plateau and dislikes as a way of life, so every minute above 54 °C is logged against the pack\'s ageing budget and the regulator returns to the lowest pressure that still closes the balance. Two other pieces of hardware live here because two-phase loops fail in ways single-phase loops do not. The purge pot is a small cold trap at the condenser\'s bottom corner where non-condensables collect; a getter cartridge holds what it catches, because air that leaks in never leaves on its own and a few grams of it blankets condenser tubes. And the condensate pump exists for attitude: the thermosiphon has 3.5 kPa of head on the flat, the pack sits 0.85 m behind the receiver, so a descent steeper than about 12 percent cancels the head geometrically. That is precisely when regeneration is loading the string, so the pump runs on grades and during preconditioning and is idle the other 97 percent of the time.',
      why: 'Every earlier generation on this ladder controlled pack temperature by controlling a flow: pump speed, valve position, chiller duty. A boiling pack cannot be controlled that way, because the fluid picks its own flow to match the local flux, which is the property that makes it worth having. What is left to control is the temperature the fluid boils at, and that is a pressure. Concentrating the entire thermal authority of a 150 kWh pack into one regulator is a real integration risk of the same species as Gen 1\'s octovalve, taken knowingly for the same reason: the alternative is hardware inside an envelope that cannot be serviced.',
      fail: [
        'A regulator stuck high runs the pack hotter than the schedule intended and the symptom is not a fault code but an ageing bill, so pressure and saturation temperature are cross-checked against each other and against the pool RTDs, and a persistent disagreement caps charge current rather than trusting the reading.',
        'A regulator stuck low is the acute case: on a hot day the condenser cannot reject at 54 °C, vapor accumulates, gallery pressure rises against a regulator that will not admit it, and the derate ladder trips on rising pool temperature before the burst discs battery-6 carries ever see the load.',
        'The purge is a consumable dressed as a component: a getter cartridge has a finite capacity, and if the loop leaks air faster than the service interval assumes, the first symptom is a condenser that quietly underperforms rather than a loop that visibly fails.',
      ],
      explode: [0.20, 0.30, -0.45],
    },
    'phase-lines': {
      name: 'Two-phase lines and charge',
      tagline: 'Fifteen kilograms of fluid and two welded pipes: in this system the working fluid is the wiring, and it never touches an elastomer.',
      mass: 16,
      specs: [
        ['Charge', '9.4 L C6 fluoroketone, 15 kg; 9 L stands in battery-6\'s pool'],
        ['Vapor riser', '48 mm, 11.6 m/s at design, 2.2 kPa, about 0.5 K'],
        ['Liquid return', '16 mm, 0.9 m/s, gravity fed at 3.5 kPa'],
        ['Interface', 'battery-6 stubs (1.27, 0.15, 0.10) and (1.27, 0.27, -0.10)'],
        ['Joints', 'Welded aluminium, two bellows, no elastomer in the loop'],
        ['Maturity', 'Pilot line; life-of-vehicle sealing is extrapolated'],
      ],
      how: 'Two pipes carry the entire pack thermal load, and the arithmetic on both sides of the joint has to agree, so it is written out. battery-6\'s 630 A plateau dissipates 25 kW in its 63 mΩ string; at 88 kJ per kilogram of latent heat that is 0.284 kg/s of vapor; at 1.2 bar the vapor is 13.9 kg per cubic metre, so 20.4 litres per second leave the pack, and through the two 26 mm headers battery-6 draws inside its envelope that is 19 m/s. Its stub hands over at 36 mm, and this side opens the riser to 48 mm immediately. The reason is the head budget and nothing else: velocity pressure scales with the square, so holding 20 m/s all the way to the condenser would cost more than 5 kPa, and a gravity-returned loop has 3.5 to spend. At 48 mm the riser runs 11.6 m/s and 2.2 kPa, which costs about half a kelvin of saturation temperature between pool and condenser, and that half kelvin is the whole thermodynamic penalty of moving the heat 0.9 m forward. The liquid return needs 16 mm for the same 0.284 kg/s, because liquid at 1,600 kg per cubic metre is 115 times denser than its own vapor.\n\nThe fluid is C6 fluoroketone, chosen for four properties at once: it boils at 49 °C at atmospheric pressure so the useful window sits exactly where a battery wants it, it is a dielectric so a leak inside the pack is a mess and not a short, it is non-flammable, and its 88 kJ per kilogram of latent heat is what lets 3 kg of dry plumbing outrank the 24 kg of serpentine Gen 1 spent for 10 kW. The loop is welded aluminium end to end with two bellows for thermal growth and no elastomer anywhere, and that is a deliberate departure from Gen 1\'s quick-connectors with EPDM O-rings, which its own panel named as the dominant field leak path. Two reasons. This charge cannot be topped up from a bottle at the roadside, so a slow permeation loss is a system failure rather than a service item, and battery-6\'s sulfide chemistry makes hydrogen sulfide from water, so a joint that lets moisture in is a chemistry event and not a coolant event. The fill hardware stays keyed and desiccant-capped, carried from battery-6\'s own statement of the same hazard.',
      why: 'Fifteen kilograms of fluid is the largest single line on this ledger and it looks like a step backward until you price what it replaced: Gen 1 carried 11 litres of glycol at 21 kg in hoses that only ever moved sensible heat at 3.3 kJ per kilogram-kelvin. This charge moves 88 kJ per kilogram by changing phase, and it does it with no pump in the path on level ground. Two pipes and a pool replaced a ring main, two pumps, a chiller and a valve block, and the pack duty went from 10 kW to 25 in the same move.',
      fail: [
        'Life-of-vehicle sealing is the extrapolated claim, stated plainly: a welded loop holding a 15 kg charge of a small molecule for fifteen years with no top-up has been done in fixed plant, not in something that is vibrated, salted and crashed. What has to become true is a permeation and weld-fatigue dataset at vehicle duty, plus a charge telemetry good enough to see a 100 g loss, which is what the receiver level sensor is really for.',
        'A riser blockage or a partially closed line is invisible to pressure alone, because the pack side simply boils at a higher temperature until the flow gets through; the paired pool and condenser saturation readings are the only witnesses to that, so they are cross-checked every charge.',
        'The lines carry a fluid that is a dielectric and an excellent solvent for the wrong seals; every material in contact is compatibility qualified, and the maintenance rule is blunt, nothing that is not on the list ever enters this loop.',
      ],
      explode: [0.10, -0.30, 0.10],
    },
    'glycol-loop': {
      name: 'Glycol circuit',
      tagline: 'What is left of Gen 1\'s ring main after the pack stopped drinking: 3.4 litres, two pumps, six ports instead of fourteen modes.',
      mass: 7,
      specs: [
        ['Loops', '2: front drive loop, long electronics and cabin loop'],
        ['Valve block', '6 ports, 6 modes (Gen 1 octovalve: 8 ports, 14 modes)'],
        ['Pumps', '2 x wet-rotor BLDC, 25 L/min at 70 kPa, same part number'],
        ['Coolant', '3.4 L of 50/50 glycol (Gen 1: 11 L)'],
        ['Landings', 'drivetrain-6 inverter and oil cooler, hv-4 converter, autonomy-4 cold plate'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Everything in this car that still wants liquid at 60 °C rather than a boiling pool is on one of two loops. The front drive loop is short and lives in the nose: pump A feeds drivetrain-6\'s front GaN inverter at its pocket stubs, which get the coldest coolant because junction temperature is what limits that part, then the gearbox oil-to-coolant plate under the case, then back to the radiator\'s driver tank. The long loop leaves pump B through the heat pump\'s cabin condenser, feeds the HVAC heater core at the firewall, runs aft over the battery lid to autonomy-4\'s triplex compute cold plate, on to hv-4\'s 800 V to 48 V converter in the penthouse bay, and returns forward. The rear corner stator jackets tee off that leg at the converter bay and ride out to the wheels inside drivetrain-6\'s service-loop bundle, the crossing of the wheels-3 flange plane that module declares implied. One reconciliation is written down here rather than assumed: autonomy-4 says its cold plate tees off the pack cold loop, and in this preset there is no pack glycol loop at all, so the plate moved onto this circuit and its landing coordinates are matched rather than described.\n\nThe valve block is the honest measure of what the generation did. Gen 1 folded five valves into one casting with eight ports and fourteen plumbing configurations, and most of that vocabulary existed to negotiate between the pack, the powertrain and the cabin: loops in series to warm a cold pack, in parallel to cool a hot one, chiller in or out. The pack is no longer in that conversation, so six ports and six modes cover what is left: the two loops in series for winter scavenging, in parallel for summer, radiator in or bypassed, and the heat pump\'s cabin condenser in or out of the hot leg. Coolant volume falls from 11 litres to 3.4 and the whole circuit from 27 kg of pumps, block, chiller and lines to 7. The wet-rotor pumps carry over unchanged, both positions the same part number, because a rotor running submerged in the fluid it pumps has no shaft seal to weep and there was nothing to improve.',
      why: 'This part is what a thermal system looks like after its largest customer has left. Nothing here is new engineering, and that is the argument: the parts that still work at 60 °C in a liquid loop are exactly the parts a liquid loop suits, power electronics with hot spots too small to boil anything and a cabin heater that wants a fluid it can meter through a blend flap. The mass saving is real but the structural saving is bigger, because seven ports of plumbing complexity left the car with the pack loop, and every deleted mode is a state the controller can no longer get wrong.',
      fail: [
        'The long loop is a single path from nose to penthouse and back, so a leak anywhere in it takes the compute plate, the converter and the corner jackets together; each of those has its own thermal fallback and the loop is monitored by flow rather than by level, but the topology is a knowing concentration.',
        'Air trapped after a refill still cavitates a pump and leaves warm spots at the far end of the run, carried from Gen 1: filling is done under vacuum, not by pouring, and the pumps report overspeed at low torque when they are pumping foam.',
        'Corrosion inhibitors deplete on a clock rather than on mileage, and a circuit this small has proportionally less inhibitor per metre of aluminium than the one it replaced, so the fluid service interval got shorter even though the fluid does less work.',
      ],
      explode: [0.05, -0.45, -0.15],
    },
    'hvac-core': {
      name: 'Cabin HVAC core',
      tagline: 'The same three jobs Gen 1 gave it, with the resistive backup deleted and the reason written down.',
      mass: 8,
      specs: [
        ['Blower', '280 W, up to 450 m³/h'],
        ['Evaporator', '5.5 kW, sensible and latent'],
        ['Heater core', 'Liquid fed from the long loop hot leg'],
        ['Backup heat', 'None; the Gen 1 3 kW PTC element is deleted'],
        ['Filtration', 'Activated carbon plus HEPA class particulate'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The architecture is Gen 1\'s and it was right: blower, then evaporator in every season, then a blend flap metering how much of the stream crosses a liquid heater core. Cooling below the dew point wrings out the moisture, reheating clears the glass, and outlet temperature is set by the flap ratio rather than by cycling the compressor. The heater core still runs on hot glycol rather than refrigerant, which keeps the refrigerant charge small and contained in the nose and means the cabin can be heated by drive-unit waste heat with the compressor off. What moved is the case: expanded polypropylene and glass-filled PA in place of the Gen 1 mouldings, 8 kg where Gen 1 spent 12, in the same firewall envelope between x 0.78 and 1.00 that this slot has held since the first generation.\n\nThe deleted part is the interesting one. Gen 1 carried a 3 kW PTC element as backup heat and its own panel warned that a resistive element can silently mask a degrading heat pump. The apex car deletes it and pays for the deletion three ways. The compressor runs deliberately lossy modes below -25 °C, so its own inefficiency lands in the loop as heat, which was Gen 1\'s stated behaviour and is now the only cold-extreme path. The long loop can be put in series by the valve block, so drive-unit and power-electronics losses reach the heater core directly. And the cabin strategy stays aimed at people rather than air, carried whole from Gen 1: 50 W of seat heat buys the comfort of several hundred watts of warmer cabin, letting the air target drop two to three degrees. Comfort per watt, not watts, is still the metric, and a car with no resistive element cannot quietly cheat on it.',
      why: 'Cabin heating is still the largest parasitic load an electric car has, and the honest apex answer was not a better heater but the removal of the one component that let the system hide from its own energy accounting. Everything else about this box earned its place two generations ago: air handling is a solved problem, the failure modes are known, and the mass that came out came from materials rather than from function.',
      fail: [
        'With no PTC there is no instant heat: a -20 °C cold start warms the cabin at the pace the heat pump and the loop allow, which is minutes, and the car states that instead of burning pack energy to hide it.',
        'Biofilm on a permanently damp evaporator is the classic HVAC smell, carried from Gen 1 with the same answer, an afterblow drying cycle at shutdown, and the same admission that owners who disable it will find out why it existed.',
        'A blend flap actuator losing index causes slow outlet temperature hunting, an annoyance long before it is a fault, and the only symptom the driver ever gets is a cabin that will not settle.',
      ],
      explode: [-0.30, 0.42, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   Front stack: two cores stacked vertically inside P.thermalFront, the
   condenser row on top (y 0.44..0.74) so the receiver clears the pool by
   228 mm, the glycol row below (y 0.26..0.40) in line with body-6's gate
   exit, one fan bank behind both at the Gen 1 coordinates. Loop hardware
   lives behind the stack under the frunk floor, driver side for the
   two-phase set, passenger side for the compressor, which is where hv-4's
   thermal spur already ends. */

const SX = 2.195;               // stack core plane x
const CY = 0.59;                // condenser core centre y: 0.44 to 0.74
const GY = 0.33;                // radiator core centre y: 0.26 to 0.40
const RCV = [2.14, 0.375, -0.40];   // receiver axis centre

/* Cylinder with its axis along X. Carried from thermal.js. */
function xcyl(r, h, mat, seg) {
  const c = lib.cyl(r, h, mat, seg);
  c.rotation.z = Math.PI / 2;
  return c;
}

export function build() {
  const sys = new THREE.Group();

  /* ── condenser: upper core, end tanks, inlet and outlet headers, the
     receiver on the driver side with its level sensor, and the condensate
     drop from the outlet header into the receiver ── */
  const cond = lib.part('condenser', [0.55, 0.35, 0]);
  const cCore = lib.fins(0.045, 0.30, 0.77, 34, 0.005, M.alu);
  cCore.position.set(SX, CY, 0);
  cond.add(cCore);
  for (const zs of [-1, 1]) {
    const tank = lib.box(0.075, 0.31, 0.06, M.plastic);
    tank.position.set(SX, CY, zs * 0.415);
    cond.add(tank);
  }
  const inHdr = lib.box(0.058, 0.026, 0.80, M.darkSteel);
  inHdr.position.set(SX, 0.757, 0);
  cond.add(inHdr);
  const outHdr = lib.box(0.058, 0.024, 0.80, M.darkSteel);
  outHdr.position.set(SX, 0.427, 0);
  cond.add(outHdr);
  const recv = xcyl(0.045, 0.14, M.steel, 20);
  recv.position.set(...RCV);
  cond.add(recv);
  for (const xs of [-1, 1]) {
    const cap = lib.sphere(0.045, M.steel, 16);
    cap.position.set(RCV[0] + xs * 0.07, RCV[1], RCV[2]);
    cond.add(cap);
  }
  const level = lib.box(0.03, 0.05, 0.022, M.sensor);
  level.position.set(2.14, 0.432, -0.40);
  cond.add(level);
  cond.add(lib.tube([
    [2.19, 0.418, -0.35],
    [2.17, 0.404, -0.378],
    [2.145, 0.398, -0.395],
  ], 0.009, M.coolant));
  const recvOut = lib.cyl(0.010, 0.035, M.coolant, 12);
  recvOut.position.set(2.10, 0.345, -0.40);
  cond.add(recvOut);
  sys.add(cond);

  /* ── radiator row and the shared fan bank. Fan rings and rotors carried
     from thermal.js at x 2.02; turning vanes on the stack's forward face
     spread body-6's low gate exit across both core rows ── */
  const rad = lib.part('radiator', [0.45, -0.28, 0]);
  const gCore = lib.fins(0.040, 0.14, 0.50, 24, 0.005, M.alu);
  gCore.position.set(2.19, GY, 0);
  rad.add(gCore);
  for (const zs of [-1, 1]) {
    const tank = lib.box(0.07, 0.15, 0.055, M.plastic);
    tank.position.set(2.19, GY, zs * 0.275);
    rad.add(tank);
  }
  for (const [vy, va] of [[0.30, -0.52], [0.385, -0.44]]) {
    const vane = lib.box(0.04, 0.006, 0.68, M.plasticLt);
    vane.position.set(2.238, vy, 0);
    vane.rotation.z = va;
    rad.add(vane);
  }
  for (const zs of [-1, 1]) {
    const ring = lib.torus(0.20, 0.012, M.plastic, 28, 8);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(2.02, 0.50, zs * 0.215);
    rad.add(ring);

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
    rotor.position.set(2.02, 0.50, zs * 0.215);
    lib.spin(rotor, 'x', 20);
    rad.add(rotor);
  }
  sys.add(rad);

  /* ── heat pump: scroll compressor and accumulator on the passenger side
     under the frunk floor, terminal box where hv-4's thermal spur ends at
     (1.70, 0.55, 0.42), cabin condenser and gallery conditioner plate
     stacks on the driver side, discharge and suction crossing the nose ── */
  const hp = lib.part('heat-pump', [0.15, 0.45, 0.35]);
  const comp = xcyl(0.058, 0.23, M.castAlu, 24);
  comp.position.set(1.80, 0.470, 0.415);
  hp.add(comp);
  const compEnd = xcyl(0.052, 0.045, M.darkSteel, 24);
  compEnd.position.set(1.665, 0.470, 0.415);
  hp.add(compEnd);
  const termBox = lib.box(0.055, 0.035, 0.05, M.plastic);
  termBox.position.set(1.73, 0.5375, 0.45);
  hp.add(termBox);
  const bracket = lib.box(0.24, 0.010, 0.12, M.steel);
  bracket.position.set(1.80, 0.407, 0.435);
  hp.add(bracket);
  const accum = lib.cyl(0.040, 0.15, M.steel, 20);
  accum.position.set(1.95, 0.45, 0.44);
  hp.add(accum);
  const accumCap = lib.sphere(0.040, M.steel, 16);
  accumCap.position.set(1.95, 0.525, 0.44);
  hp.add(accumCap);
  const strap = lib.torus(0.043, 0.006, M.darkSteel, 20, 8);
  strap.rotation.x = Math.PI / 2;
  strap.position.set(1.95, 0.45, 0.44);
  hp.add(strap);
  /* cabin condenser: refrigerant to glycol, driver side of the block */
  const cabCond = lib.box(0.08, 0.10, 0.07, M.alu);
  cabCond.position.set(1.79, 0.42, -0.20);
  hp.add(cabCond);
  for (let i = 0; i < 6; i++) {
    const pl = lib.box(0.0045, 0.09, 0.06, M.steel);
    pl.position.set(1.762 + i * 0.011, 0.42, -0.20);
    hp.add(pl);
  }
  /* gallery conditioner: double walled refrigerant to fluoroketone plate
     stack sitting in the liquid return, the preconditioning heater */
  const galCond = lib.box(0.09, 0.09, 0.08, M.alu);
  galCond.position.set(1.82, 0.275, -0.26);
  hp.add(galCond);
  for (let i = 0; i < 6; i++) {
    const pl = lib.box(0.005, 0.08, 0.07, M.steel);
    pl.position.set(1.788 + i * 0.013, 0.275, -0.26);
    hp.add(pl);
  }
  const vent = lib.cyl(0.006, 0.05, M.plasticLt, 8);
  vent.position.set(1.87, 0.345, -0.245);
  hp.add(vent);
  for (const [ex, ey, ez] of [[1.775, 0.395, -0.255], [1.775, 0.345, -0.255]]) {
    const exv = lib.box(0.03, 0.045, 0.03, M.sensor);
    exv.position.set(ex, ey, ez);
    hp.add(exv);
  }
  /* discharge: compressor to the cabin condenser, over the valve block */
  hp.add(lib.tube([
    [1.80, 0.533, 0.40],
    [1.79, 0.545, 0.20],
    [1.78, 0.530, 0.00],
    [1.78, 0.490, -0.14],
    [1.785, 0.462, -0.19],
  ], 0.008, M.coolantHot));
  /* liquid line down to the two expansion valves */
  hp.add(lib.tube([
    [1.790, 0.372, -0.212],
    [1.784, 0.385, -0.235],
    [1.778, 0.392, -0.250],
  ], 0.006, M.coolant));
  /* suction: gallery conditioner back to the accumulator, under the
     glycol pumps and outboard of suspension-4's air reservoir */
  hp.add(lib.tube([
    [1.830, 0.240, -0.290],
    [1.845, 0.320, -0.220],
    [1.845, 0.360, -0.100],
    [1.845, 0.385, 0.050],
    [1.845, 0.395, 0.170],
    [1.880, 0.400, 0.260],
    [1.920, 0.405, 0.360],
    [1.950, 0.412, 0.400],
  ], 0.009, M.steel));
  /* pigtail out to the exact point where hv-4's thermal spur ends */
  hp.add(lib.tube([
    [1.730, 0.545, 0.470],
    [1.715, 0.549, 0.445],
    [1.700, 0.550, 0.420],
  ], 0.007, M.hv));
  sys.add(hp);

  /* ── pressure set: dome regulator on the riser at the condenser inlet,
     bellows buffer vessel, purge pot, condensate pump on the liquid line,
     and the sensor cluster. Driver side, clear of the fan swept band ── */
  const pset = lib.part('pressure-set', [0.20, 0.30, -0.45]);
  const dome = lib.cyl(0.038, 0.09, M.castAlu, 20);
  dome.position.set(2.03, 0.575, -0.475);
  pset.add(dome);
  const domeCap = lib.cyl(0.026, 0.02, M.darkSteel, 14);
  domeCap.position.set(2.03, 0.63, -0.475);
  pset.add(domeCap);
  /* twin bellows vessels lying along z, slim enough to thread the 48 mm
     window between autonomy-4's two sensor-ring laminae (x 1.86 at y 0.428
     and x 1.92 at y 0.400) */
  for (const vy of [0.455, 0.515]) {
    const vessel = lib.cyl(0.028, 0.20, M.steel, 20);
    vessel.rotation.x = Math.PI / 2;
    vessel.position.set(1.89, vy, -0.30);
    pset.add(vessel);
    for (const vz of [-0.40, -0.20]) {
      const end = lib.sphere(0.028, M.steel, 14);
      end.position.set(1.89, vy, vz);
      pset.add(end);
    }
    const vBand = lib.torus(0.031, 0.005, M.darkSteel, 18, 8);
    vBand.position.set(1.89, vy, -0.30);
    pset.add(vBand);
  }
  const vLink = lib.cyl(0.010, 0.035, M.steel, 12);
  vLink.position.set(1.89, 0.485, -0.35);
  pset.add(vLink);
  const purge = lib.cyl(0.028, 0.08, M.alu, 16);
  purge.position.set(1.97, 0.465, -0.25);
  pset.add(purge);
  const getter = lib.cyl(0.020, 0.04, M.plasticLt, 12);
  getter.position.set(1.97, 0.525, -0.25);
  pset.add(getter);
  const cpump = xcyl(0.030, 0.07, M.darkSteel, 18);
  cpump.position.set(1.99, 0.315, -0.39);
  pset.add(cpump);
  const cpumpHead = xcyl(0.024, 0.03, M.castAlu, 16);
  cpumpHead.position.set(2.035, 0.315, -0.39);
  pset.add(cpumpHead);
  const senseBlock = lib.box(0.05, 0.03, 0.04, M.sensor);
  senseBlock.position.set(1.93, 0.545, -0.40);
  pset.add(senseBlock);
  /* regulator dome to the buffer vessel, and the vessel's purge tap */
  pset.add(lib.tube([
    [2.010, 0.545, -0.478],
    [1.970, 0.545, -0.455],
    [1.930, 0.535, -0.415],
    [1.895, 0.518, -0.398],
  ], 0.006, M.coolantHot));
  pset.add(lib.tube([
    [1.918, 0.455, -0.320],
    [1.945, 0.460, -0.292],
    [1.968, 0.466, -0.266],
  ], 0.005, M.coolantHot));
  sys.add(pset);

  /* ── two-phase lines: 48 mm vapor riser from battery-6's vapor stub
     (face x 1.297) up the driver side to the condenser inlet header, and
     the 16 mm liquid return from the receiver through the gallery
     conditioner to battery-6's liquid feed stub. Both end ON the partner
     stub faces, hose over spigot ── */
  const lines = lib.part('phase-lines', [0.10, -0.30, 0.10]);
  const vFlange = xcyl(0.030, 0.012, M.darkSteel, 16);
  vFlange.position.set(1.302, 0.268, -0.10);
  lines.add(vFlange);
  lines.add(lib.tube([
    [1.290, 0.268, -0.10],
    [1.325, 0.283, -0.15],
    [1.345, 0.320, -0.24],
    [1.360, 0.375, -0.32],
    [1.415, 0.442, -0.40],
    [1.550, 0.448, -0.410],
    [1.800, 0.462, -0.425],
    [1.980, 0.505, -0.450],
    [2.090, 0.600, -0.475],
    [2.150, 0.690, -0.440],
    [2.175, 0.745, -0.410],
  ], 0.024, M.coolantHot));
  const bellowsA = xcyl(0.028, 0.03, M.steel, 16);
  bellowsA.position.set(1.55, 0.448, -0.410);
  bellowsA.rotation.y = -0.15;
  lines.add(bellowsA);
  const lFlange = xcyl(0.018, 0.012, M.darkSteel, 14);
  lFlange.position.set(1.292, 0.147, 0.10);
  lines.add(lFlange);
  lines.add(lib.tube([
    [2.100, 0.335, -0.400],
    [2.020, 0.315, -0.392],
    [1.950, 0.300, -0.360],
    [1.890, 0.290, -0.310],
    [1.820, 0.278, -0.262],
    [1.760, 0.240, -0.250],
    [1.700, 0.195, -0.240],
    [1.600, 0.190, -0.150],
    [1.500, 0.185, -0.050],
    [1.420, 0.175, 0.040],
    [1.350, 0.160, 0.080],
    [1.300, 0.150, 0.098],
    [1.285, 0.147, 0.100],
  ], 0.009, M.coolant));
  const bellowsB = xcyl(0.012, 0.025, M.steel, 12);
  bellowsB.position.set(1.60, 0.190, -0.15);
  lines.add(bellowsB);
  /* keyed, desiccant capped fill port on the liquid line */
  const fill = lib.cyl(0.011, 0.05, M.coolant, 12);
  fill.position.set(1.95, 0.325, -0.36);
  lines.add(fill);
  const fillCap = lib.cyl(0.014, 0.012, M.plasticLt, 12);
  fillCap.position.set(1.95, 0.356, -0.36);
  lines.add(fillCap);
  for (const [cx, cy, cz] of [[1.50, 0.185, -0.05], [1.90, 0.470, -0.434]]) {
    const clamp = lib.box(0.018, 0.03, 0.02, M.plastic);
    clamp.position.set(cx, cy, cz);
    lines.add(clamp);
  }
  sys.add(lines);

  /* ── glycol circuit: two wet-rotor pumps, the six-port valve block, and
     the runs that land on real partner geometry. Front drive loop in the
     nose; the long loop runs aft over the battery lid at y 0.318, under
     hv-4's ring laminate (bottom face 0.339) and over the battery-6 lid
     stiffeners (top 0.303) ── */
  const gly = lib.part('glycol-loop', [0.05, -0.45, -0.15]);
  const block = lib.box(0.11, 0.09, 0.14, M.castAlu);
  block.position.set(1.87, 0.49, -0.02);
  gly.add(block);
  /* ports on the block's aft face: the underside is crossed by autonomy-4's
     sensor ring laminae at y 0.400 and 0.428 */
  for (const bz of [-0.05, 0.00, 0.045]) {
    const port = xcyl(0.014, 0.04, M.castAlu, 12);
    port.position.set(1.805, 0.49, bz);
    gly.add(port);
  }
  const stepper = lib.cyl(0.024, 0.04, M.darkSteel, 16);
  stepper.position.set(1.87, 0.555, -0.02);
  gly.add(stepper);
  const pumpPos = [[1.90, 0.43, 0.12], [1.90, 0.43, -0.15]];
  for (const [px, py, pz] of pumpPos) {
    const motor = xcyl(0.032, 0.09, M.darkSteel, 18);
    motor.position.set(px, py, pz);
    gly.add(motor);
    const volute = xcyl(0.046, 0.032, M.plastic, 18);
    volute.position.set(px + 0.065, py, pz);
    gly.add(volute);
    const outlet = lib.cyl(0.012, 0.05, M.coolant, 10);
    outlet.position.set(px + 0.065, py + 0.045, pz);
    gly.add(outlet);
  }
  /* front drive loop: pump A to the drivetrain-6 front inverter cold stub */
  gly.add(lib.tube([
    [1.965, 0.470, 0.10],
    [1.930, 0.450, 0.06],
    [1.870, 0.432, 0.01],
    [1.780, 0.430, -0.03],
    [1.700, 0.428, -0.05],
    [1.647, 0.426, -0.053],
  ], 0.010, M.coolant));
  /* inverter hot stub down and aft to the gearbox oil cooler cold stub,
     kept inboard of x 1.66 so it clears suspension-4's front anti-roll bar
     at x 1.685..1.715 and the subframe crossmember at x 1.66..1.74 */
  gly.add(lib.tube([
    [1.647, 0.487, -0.053],
    [1.655, 0.468, -0.110],
    [1.650, 0.400, -0.170],
    [1.630, 0.330, -0.200],
    [1.580, 0.286, -0.205],
    [1.500, 0.250, -0.185],
    [1.440, 0.250, -0.145],
    [1.410, 0.246, -0.105],
  ], 0.010, M.coolantHot));
  /* oil cooler hot stub forward under the subframe to the radiator */
  gly.add(lib.tube([
    [1.410, 0.246, -0.055],
    [1.460, 0.215, -0.030],
    [1.600, 0.195, -0.020],
    [1.800, 0.190, -0.060],
    [1.950, 0.190, -0.140],
    [2.050, 0.200, -0.235],
    [2.130, 0.250, -0.268],
    [2.175, 0.295, -0.275],
  ], 0.010, M.coolantHot));
  /* radiator passenger tank back up to the pumps and the block */
  gly.add(lib.tube([
    [2.175, 0.295, 0.275],
    [2.100, 0.255, 0.290],
    [2.020, 0.228, 0.260],
    [1.980, 0.255, 0.238],
    [1.960, 0.360, 0.220],
    [1.955, 0.430, 0.160],
  ], 0.010, M.coolant));
  /* block to pump B, pump B out to the heat pump cabin condenser */
  gly.add(lib.tube([
    [1.870, 0.445, -0.07],
    [1.880, 0.435, -0.11],
    [1.868, 0.430, -0.150],
  ], 0.010, M.coolant));
  gly.add(lib.tube([
    [1.965, 0.470, -0.175],
    [1.930, 0.455, -0.215],
    [1.870, 0.448, -0.230],
    [1.815, 0.445, -0.215],
    [1.796, 0.462, -0.205],
  ], 0.010, M.coolant));
  /* cabin condenser out over the front drive zone to the HVAC heater core,
     staying above y 0.588 across P.driveF, the Gen 1 crossing rule */
  gly.add(lib.tube([
    [1.790, 0.462, -0.235],
    [1.760, 0.520, -0.280],
    [1.720, 0.600, -0.230],
    [1.600, 0.648, -0.170],
    [1.300, 0.650, -0.110],
    [1.100, 0.646, -0.090],
    [1.010, 0.642, -0.082],
  ], 0.010, M.coolantHot));
  /* heater core return down to the lid and aft to autonomy-4's cold plate */
  gly.add(lib.tube([
    [1.010, 0.640, -0.150],
    [0.940, 0.560, -0.175],
    [0.900, 0.430, -0.190],
    [0.860, 0.340, -0.200],
    [0.600, 0.322, -0.200],
    [0.000, 0.320, -0.190],
    [-0.550, 0.325, -0.170],
    [-0.800, 0.360, -0.120],
    [-0.840, 0.415, -0.060],
    [-0.797, 0.420, -0.050],
  ], 0.009, M.coolantHot));
  /* cold plate on to hv-4's converter, passing under the ring laminate */
  gly.add(lib.tube([
    [-0.797, 0.420, 0.050],
    [-0.870, 0.395, 0.110],
    [-0.950, 0.345, 0.155],
    [-1.150, 0.322, 0.190],
    [-1.310, 0.325, 0.220],
    [-1.400, 0.350, 0.270],
    [-1.430, 0.392, 0.262],
    [-1.430, 0.400, 0.250],
  ], 0.009, M.coolantHot));
  /* converter hot stub forward under the front unit back to the block */
  gly.add(lib.tube([
    [-1.310, 0.400, 0.250],
    [-1.290, 0.352, 0.280],
    [-1.200, 0.322, 0.250],
    [-1.050, 0.318, 0.210],
    [-0.400, 0.318, 0.200],
    [0.600, 0.318, 0.200],
    [1.050, 0.318, 0.205],
    [1.250, 0.322, 0.225],
    [1.340, 0.270, 0.240],
    [1.450, 0.198, 0.255],
    [1.620, 0.192, 0.240],
    [1.780, 0.196, 0.190],
    [1.880, 0.240, 0.180],
    [1.930, 0.330, 0.180],
    [1.945, 0.430, 0.140],
    [1.920, 0.462, 0.045],
  ], 0.009, M.coolantHot));
  sys.add(gly);

  /* ── HVAC core at the firewall, carried from thermal.js: case, blower
     scroll, duct stubs, heater core stubs, condensate drain. Same
     x 0.78 to 1.00 envelope this slot has held since Gen 1 ── */
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
  const filter = lib.box(0.14, 0.03, 0.22, M.plasticLt);
  filter.position.set(0.86, 0.835, -0.05);
  hvac.add(filter);
  const drain = lib.cyl(0.008, 0.04, M.rubber, 8);
  drain.position.set(0.89, 0.575, -0.10);
  hvac.add(drain);
  sys.add(hvac);

  return sys;
}
