/* Gen 4 HV electrical: 48 V zonal. The 12 V island is deleted after 70
   years, control power moves to a laminated 48 V ring around the cabin
   floor fed from both ends, four corner zonal controllers fuse every
   circuit in silicon, one 800 V class converter replaces the penthouse
   PDU and the DC-DC, the charge port learns to sell energy back, and two
   redundant 48 V feeds run the rockers to the suspension-4 by-wire
   actuators. 64 kg against Gen 1 (js/systems/hv.js) at 88. This slot
   skipped Gen 2 and Gen 3 on purpose: the content says why. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'hv-4',
  name: 'HV electrical · Gen 4',
  color: 0xff8a3c,
  explode: [-1.5, 0.3, 0],
  blurb: 'Gen 1 split the car into a high-voltage energy bus and a 12 V control island, and this slot then sat out two generations because copper was never the bottleneck. By-wire made it one: Gen 4 rebuilds control power as a 48 V zonal ring with dual lifelines to the chassis actuators, deletes the 12 V battery, and returns 64 kg against Gen 1’s 88.',
  parts: {
    converter: {
      name: '800 V to 48 V converter',
      tagline: 'One conversion for the whole car: the penthouse PDU and the DC-DC collapsed into a single box in the same bay.',
      mass: 8,
      specs: [
        ['Rating', '7 kW continuous, 14 kW for 10 s'],
        ['Input', '800 V class, 300 to 870 V; sees 380 to 570 V on this pack'],
        ['Output', '48 V, up to 290 A peak'],
        ['Topology', '3 interleaved LLC phases, SiC primary, 97% at half load'],
        ['Distribution', '5 solid-state HV branches, telemetered'],
        ['Ancestors', 'Gen 1 penthouse PDU 12 kg + DC-DC 7 kg'],
      ],
      how: 'Gen 1 spent two boxes on this bay: a 12 kg penthouse PDU that only routed, and a 7 kg DC-DC that only converted, 2.5 kW of it at 94 percent. This box does both jobs at 8 kg. Three interleaved LLC phases chop the pack bus through one planar transformer and rectify onto the 48 V ring at 97 percent, and the input silicon is qualified for the full 800 V class, 300 to 870 V, so the ladder’s next pack drops in without touching it; on the Gen 3 pack it runs at 508 V nominal. The distribution deck sits on the input side: five HV branches, the front drive unit, the two rear corner inverters, the thermal loop, and the V2G port, each switched by back-to-back SiC pairs instead of the ceramic fuses Gen 1 bolted in, each reporting its current onto the zonal bus. The HVIL interlock loop and the crash-discharge logic carry over from the Gen 1 penthouse unchanged, because nothing about a finger near a busbar changed.\n\nThe asymmetry Gen 1 stated is preserved and sharpened: high voltage still cannot connect itself. The 48 V net boots the computers, the computers check isolation, and only then do the contactor coils pull in. What changed is the direction of dependency in service: Gen 1’s DC-DC fed a 12 V rail that merely kept the car controllable, while this converter feeds the rail that steers and brakes it. That is why it is derated to half its silicon limit, cooled on its own coolant branch, and why the buffer pack at the other end of the ring exists at all.',
      why: 'Every conversion stage costs mass twice, once in silicon and once in the enclosure, seals and cooling around it. Folding routing and conversion into one casting in the penthouse bay saves 11 kg outright and shortens the highest-current 48 V busbars to the length of the box. The single-converter architecture is the honest risk of the design: it is the one component the dual by-wire feeds cannot make redundant, which is exactly why the buffer exists and why this box runs coldest of anything on the HV bus.',
      fail: [
        'Converter loss while driving hands the ring to the buffer pack: 20 minutes at the average by-wire driving draw, five at the 146 A worst case, with escalating warnings to stop, the same contract Gen 1’s 12 V battery signed at 30 minutes.',
        'A solid-state HV branch that fails short cannot be melted open; the pack’s pyro fuse remains the backstop, unchanged since Gen 1.',
        'Interleave imbalance from a drifting current sensor loads one LLC phase hardest; per-phase telemetry flags the skew months before the hot phase ages out.',
      ],
      explode: [-0.45, 0.35, 0],
    },
    ring: {
      name: '48 V ring backbone',
      tagline: 'A laminated loop around the cabin floor, fed from both ends: quarter the current of 12 V, a sixteenth of the loss.',
      mass: 9,
      specs: [
        ['Conductor', 'Laminated Al pair, 240 mm² per rail'],
        ['Rating', '250 A continuous, either direction'],
        ['Feed', 'Both ends: converter at the rear, buffer at the front'],
        ['Data', '1 Gbit control ring pair; autonomy-4’s 10 Gbit sensor pair alongside'],
        ['Window', '48 V nominal, 36 to 54 V'],
        ['Ledger', '9 kg against 15 kg of spine copper inside Gen 1’s harness'],
      ],
      how: 'Power is volts times amps, so the same kilowatt crosses this laminate at a quarter of the current a 12 V spine needed, and resistive loss falls with the square of current: one sixteenth of the heat in the same conductor. That arithmetic is what lets the ring be aluminum instead of copper and still run cooler than what it replaced: two flat 240 mm² laminae around the cabin floor perimeter at 9 kg, against the 15 kg of spine copper buried inside Gen 1’s 34 kg harness, a 40 percent cut from voltage alone. The loop closes on itself and is fed from both ends, the converter at the rear corner and the buffer pack in the frunk, so any single cut leaves every zonal controller fed from the other direction. Gen 1’s ring promised one cut degrades; this one promises one cut changes nothing.\n\nThe same laminate carries the car’s nervous system: two counter-rotating 1 Gbit Ethernet rings, one clockwise and one counterclockwise, pressed between the power laminae. This is the zonal bus, the backbone the four controllers and the chassis ECU hang from; autonomy-4 presses its own 10 Gbit sensor ring pair into the same laminate between the same four boxes, a separate network that borrows this one’s geometry. The control pair inherits the power layer’s fault logic: a severed laminate loses one direction of travel and the frames arrive the other way around, microseconds later. Power and data fail together or not at all, which is the property a by-wire car actually needs, because an actuator with power but no commands is as useless as the reverse.',
      why: 'The honest question is why this took four generations, and the answer is that it should not have taken a redesign at all: this slot skipped Gen 2 and Gen 3 because Gen 1’s zonal 12 V harness was already modern and the bottleneck generations were spending their risk budget on cells and structure. What forced the move was suspension-4: steering and braking as electrical loads need kilowatt peaks delivered redundantly, and at 12 V that means hundreds of amps through crimped connectors, a current no one can promise twice.',
      fail: [
        'Aluminum terminations are the watch item: every Al to Cu junction is a galvanic couple, so each landing is a bimetal transition plate, and joint resistance is trended per terminal over the telemetry the eFuses already produce.',
        'A laminate chafe at a body pass-through shorts 48 V to chassis; the zone segment isolates in microseconds, but the carbonized track is permanent and the repair is a section swap, not a splice.',
        'Both feeds share this one ring: a fault that poisons the whole loop, a stuck regulator overvolting it, defeats the redundancy above it. The 54 V crowbar at each zonal controller exists for exactly that case.',
      ],
      explode: [0, -0.45, 0],
    },
    zonal: {
      name: 'Zonal controllers',
      tagline: 'Four corner computers where the fuse box used to be: every circuit a MOSFET, every trip a data point.',
      mass: 11,
      count: 4,
      specs: [
        ['Channels', '96 eFuse outputs per box, 0.5 to 60 A'],
        ['Trip', 'Under 10 µs at 1.3x rating; a melt fuse needs ms at 2x'],
        ['Legacy rail', '12 V point-of-load bucks, 25 A per box'],
        ['Telemetry', 'Per-circuit current at 1 kHz onto the zonal bus'],
        ['Compute', 'Lockstep dual core, ASIL D'],
        ['Ancestor', 'Gen 1 zone controllers, four boxes on a 12 V spine'],
      ],
      how: 'A melting fuse is a thermal race: it needs two to ten times its rated current, held for milliseconds, before the element lets go, and every wire upstream must be sized to survive the wait. An eFuse is a MOSFET with a current sensor and an opinion. It measures, compares, and opens in under ten microseconds at 1.3 times rating, before the harness has warmed a degree, then retries after transients that would have stranded a melt-fuse car at the roadside, and soft-starts motors so inrush stops being a sizing case. Gen 1 introduced these boxes; Gen 4 promotes them, because the circuits they gate now include the ones that steer and brake, which is why the trip logic runs on lockstep dual cores and the safety channels carry a second series switch.\n\nThe deeper change is that the fuse became a sensor. Every channel streams its current at 1 kHz onto the zonal bus, and the fleet learns what healthy looks like: a window motor’s signature, a pump’s ripple, a seat heater’s cold resistance. A bearing that is starting to die draws its confession months before it seizes, and a corroding ground shows up as a slow offset no human would ever notice. Each box also carries a 25 A bank of 12 V point-of-load bucks, because mirrors, locks and a hundred commodity parts are qualified at 12 V and will be for years; the island is gone, but its citizens got local visas.',
      why: 'Gen 1 made the topology argument, 34 kg zonal against roughly 50 point-to-point, and it holds. Gen 4’s delta is duty: a fuse box was never a safety item because hydraulics backed everything it fed, and in a by-wire car that excuse is gone. The corner boxes were redesigned not to switch more current but to be trusted, and the mass stayed almost flat, 11 kg against Gen 1’s share, because certification weighs nothing and telemetry is free.',
      fail: [
        'Fusing is firmware, carried from Gen 1 verbatim: a bad trip table would ship to every circuit at once, so the tables remain locked, safety-certified code with a hardware second-source on safety channels.',
        'A MOSFET’s natural failure is short, not open; on by-wire channels a series redundant switch covers it, on comfort channels the upstream zone segment is the backstop and the load stays energized until service.',
        'One corroded connector seal still takes out a zone branch instead of a single circuit, the price of density Gen 1 already named; the telemetry at least says which pin, which Gen 1 could not.',
      ],
      explode: [0.25, 0.28, 0.45],
    },
    buffer: {
      name: '48 V buffer pack',
      tagline: 'The 12 V battery is dead after 70 years; the thing that killed it was the steering rack becoming honest about its appetite.',
      mass: 6,
      specs: [
        ['Chemistry', 'LFP, 15s, 48 V nominal'],
        ['Capacity', '12 Ah, 0.58 kWh (Gen 1 12 V: 0.42 kWh)'],
        ['Peak', '300 A for 10 s, 14 kW'],
        ['Hold-up', '5 min at the 146 A worst case, 20 at the 1.7 kW driving average'],
        ['Mass', '6 kg against Gen 1’s 8 kg 12 V LFP'],
        ['Placement', 'Frunk, the opposite end of the ring from the converter'],
      ],
      how: 'Twelve volts survived seven decades for one reason: ecosystem. The voltage was set in the mid-1950s when 6 V could no longer crank rising compression ratios, and from then on every bulb, relay, sensor and ECU on earth was qualified against it, so no single carmaker could leave, because leaving meant requalifying the entire supply chain alone. The starter motor that set the number died with the engine, and the standard outlived its reason by twenty years on pure inertia. What finally killed it was by-wire arithmetic: a steering rack pulling 2 kW mid-corner draws 170 A at 12 V through crimped connectors that corrode, or 42 A at 48. And 48 is not an arbitrary stop: it is the last voltage under the 60 V DC touch-safe threshold, the highest rail that needs no orange, no interlocks and no gloves.\n\nThis pack is the ring’s second source, and its address is the argument. It sits in the frunk at the far end of the loop from the converter, so no single fault, no single flood, and no single crash removes both feeds; a rear impact that kills the converter leaves the buffer holding the ring through the stop, and the reverse holds too. The duty carries over from Gen 1’s 12 V battery almost word for word: wake the computers before the contactors close, carry the parking loads for two weeks, and power hazards, doors and the emergency-call modem after a crash has made the big pack inert. Only the voltage moved.',
      why: 'Gen 1 called its 12 V island eight kilos of insurance, and the policy does not lapse just because the rail changed: contactor coils, door releases and the crash aftermath still need a reservoir that owes nothing to the HV bus. LFP keeps the job for the same reasons it won it, flat discharge, thousands of cycles, honest state of health on the bus, and the 48 V version does it two kilograms lighter with 38 percent more energy.',
      fail: [
        'The century of 12 V roadside ritual is gone with the rail: a dead buffer cannot be jumped from a passing car, and the recovery procedure is a 48 V bench supply at the service point, a real regression the design accepts.',
        'Deep discharge below the protective cutoff needs a service wake, carried from Gen 1: rarer than a dead lead-acid, less self-serve.',
        'Sub-zero charge current is still limited to protect the plating window, so a deep winter drain recovers slowly; the cabin loop lends heat when the car is awake.',
      ],
      explode: [0.35, 0.35, -0.2],
    },
    'v2g-port': {
      name: 'Bidirectional charge port',
      tagline: 'The port learned to sell: 11 kW out through the same pins, with the warranty arithmetic printed on the label.',
      mass: 13,
      specs: [
        ['Standard', 'CCS2, ISO 15118-20 bidirectional'],
        ['DC charge', '630 A peak; 320 kW at this pack voltage'],
        ['AC', '11 kW three-phase, both directions, grid-forming'],
        ['V2G stage', 'SiC totem-pole + CLLC, 96.5% each way'],
        ['Export meter', 'Separate throughput counter, 2 MWh per year in warranty'],
        ['Ancestors', 'Gen 1 inlet 4 kg + onboard charger 11 kg'],
      ],
      how: 'Gen 1’s onboard charger already ran backward, 3.6 kW of utility from the pack to run power tools; Gen 4 finishes the thought. The AC electronics leave the penthouse and move behind the quarter panel beside the pins they serve, and the totem-pole plus CLLC stages now pass the full 11 kW in either direction at 96.5 percent each way. The stage is grid-forming, not just grid-following: it can energize a dead circuit and hold frequency, which means a house without power is a load this car can carry for two days. DC export needs no hardware at all, the station’s rectifier simply runs in reverse under ISO 15118-20, and the pack follows the same BMS current requests in both directions. The pin thermistors, the arc-proof motorized lock, and the software-before-current handshake carry over from Gen 1 unchanged.\n\nThe honest part is the warranty ledger, because V2G marketing rarely shows it. Export is battery throughput like any other: this pack’s cycle life is a budget, and at roughly 3 cents per kWh of wear, selling 10 kWh into every evening peak spends about a megawatt-hour of budget a season. So the port meters export on its own counter, the warranty carries 2 MWh a year of it without question, and beyond that the export column starts consuming warranted throughput. The economics still close in most markets, evening spreads beat 3 cents plus the 7 percent round trip, but the car states the price instead of hiding it, because a warranty surprise discovered at year six is how good ideas die.',
      why: 'Moving the electronics to the port shortens the AC wiring to nothing, frees the penthouse bay for the one converter, and puts every grid-facing component inside one serviceable enclosure: 13 kg against the 15 Gen 1 spent on the inlet and charger separately. Bidirectionality itself cost 1 kg of silicon and sensing; a car that is parked 95 percent of its life is the cheapest grid battery a household will ever own, and refusing that on warranty fear would have been the dishonest choice.',
      fail: [
        'Export doubles the connector’s duty cycle, so contact pitting arrives in half the years; the pilot line still breaks current first and the pins still switch dead, carried from Gen 1.',
        'Grid-forming hardware inverts the threat model: a compromised session now faces electronics that could energize a dead line, so islanding detection is certified hardware, not firmware, and fails to open.',
        'The thermistors still cannot tell whose resistance is rising, the car’s pins or a worn station’s, so derating punishes both sides equally, carried from Gen 1 and still unsolved.',
      ],
      explode: [-0.45, 0.55, 0.4],
    },
    'hv-runs': {
      name: 'Thinned HV runs',
      tagline: 'The orange network sheds a third of its mass while its front run’s job nearly doubles: the 508 V dividend, collected at last and spent at once.',
      mass: 8,
      specs: [
        ['Runs', '6: pack feed, front unit, two rear corners, thermal, port'],
        ['Front run', '50 mm² kept; 531 A peak at 508 V (Gen 1: 420 A at 355 V)'],
        ['Rear corners', '16 mm² each, 148 A per wheel motor (Gen 1: one 620 A feed)'],
        ['Insulation', 'Silicone 180 °C, braid bonded both ends, carried'],
        ['Route', 'Pack-lid tunnel centerline, carried from Gen 1'],
      ],
      how: 'Gen 1’s cable set predicted its own successor: it computed that raising pack voltage would shrink the front run and called it the 800 V argument. The pack then rose, 355 V to 508 across Gen 2 and Gen 3, and this slot, frozen at Gen 1, never collected, because the drivetrain spent the dividend first: Gen 3 moved the 270 kW axial-flux machine onto the front axle. So the 3.1 m front run keeps its 50 mm². Its job grew 80 percent over Gen 1’s 150 kW induction unit while its peak current grew only 26, 420 A to 531, still inside the carried 600 A, 30 s thermal-mass rating; at 355 V the same machine would have demanded 760 A and roughly 90 mm² of copper. The dividend is real, it was just paid out as capability at the front axle instead of kilograms in this loom.\n\nThe kilograms come from the back. Gen 1’s rear run fed a 220 kW machine at 620 A peaks; its successors now live inside the rear wheels, so one heavy feed becomes two 16 mm² corner runs at 148 A each, ending at drivetrain-3’s service-loop brackets where the flexing umbilicals take over. The runs also start one box earlier, leaving the converter’s distribution deck directly, which deletes the separate penthouse-to-everything hop and a heavy connector pair per branch. What survives carries over exactly: the front run rides the tunnel centerline over the pack lid on standoff clips, the most protected real estate in the car, and the thermal spur still earns its orange, because 7 kW of cabin heat at 48 V would be 145 A of copper for a comfort load, exactly the mistake the 48 V migration exists to avoid in the other direction.',
      why: 'Cable mass is a voltage decision, and this part pays that sentence out honestly: 8 kg against Gen 1’s 12, with the saving taken at the rear while the front run’s duty nearly doubled for free. The ladder’s lesson about neglected slots got sharper on the way: a dependency nobody owns does not collect its own dividends, but other slots will happily spend them, and Gen 3 could only afford a 270 kW front axle because the voltage had risen two generations before this loom billed for it.',
      fail: [
        'Chafe through to the shield is still a slow isolation decline the monitor catches early; bend radii stay at six diameters, carried from Gen 1.',
        'Connector fretting still raises resistance micro-ohm by micro-ohm, and terminal sensors still watch the trend, not the value.',
        'The front run kept its conductor but not its margin: launch peaks rose from 420 to 531 A against the same 600 A, 30 s rating, so the thermal budget spends about 60 percent faster and back-to-back launch starts now graze the derate line Gen 1 never reached.',
      ],
      explode: [0.15, -0.6, 0],
    },
    'bywire-feeds': {
      name: 'By-wire feed pair',
      tagline: 'Two 48 V lifelines, one per rocker, each sized for the whole by-wire load: the car steers and brakes on either one alone.',
      mass: 4,
      count: 2,
      specs: [
        ['Runs', '2, one along each rocker top, 16 mm²'],
        ['Rating', '150 A each; the full by-wire load is 146 A'],
        ['Termination', '4 stubs at the subframe corners, mated by suspension-4'],
        ['Separation', 'Opposite rockers, no shared connector, no shared zone'],
        ['Handover', 'Ideal-diode ORing at every actuator, under 100 µs'],
      ],
      how: 'This is the interface the whole generation hangs on. Two 16 mm² runs leave the corner zonal controllers and travel the length of each rocker top, terminating in four stubs under the subframe corners; suspension-4 lands its connector bosses on exactly those stubs and runs its own short leads onward to the actuators, and in the exploded view the pair drops away together, because a connection is one object with two owners. Every actuator sees both feeds through ideal-diode ORing stages, so the handover when one feed dies is passive physics, under 100 microseconds, faster than any controller could even notice. The feeds run opposite rockers on purpose: a side impact that crushes one sill and its feed leaves the other sill’s feed carrying the car, fed from its own pair of corner controllers, which are themselves fed from a ring with two sources.\n\nEach feed is sized for the entire by-wire budget alone: steering’s dual lanes, the brake boost, four damper valve heads, the rear-steer actuator and the air compressor sum to 146 A at worst-case simultaneity, and each run carries 150 continuously. That sounds like double spending until you price the alternative: at 12 V the same load is 580 A, and duplicating a 580 A path means duplicating busbar, not wire. Redundant power at by-wire scale is only affordable at all because the voltage moved first; the feed pair is 4 kg total, the entire line item for making chassis power fail-operational.',
      why: 'Fail-operational power is the thesis of Gen 4 stated in copper: an actuator that must always be able to brake needs energy that can always arrive, through a source that survives (converter or buffer), a path that survives (either rocker), and a connection that survives (ORing at the load). Gen 1 had exactly one of those layers, the 12 V battery, and could add no more, because at 12 V the second path costs what the first one did. The generation’s bill closes here too: hv-4 returns 24 kg against Gen 1, suspension-4 and autonomy-4 spend 11 of it on actuators and compute, and the car nets 13 kg and a chassis with no mechanical fallback left to lean on. The scale barely notices; the capability is the entire purchase.',
      fail: [
        'A shorted ORing stage welds the two feeds into one and deletes the redundancy invisibly; the zonal controllers pulse each feed monthly and watch the other for the sag, the by-wire equivalent of testing your spare tire.',
        'The stub connectors live in the wet zone under the sills, so their seals are the corrosion watch item; per-pin resistance rides the same telemetry as every eFuse channel.',
        'Both feeds meet upstream at the ring: a whole-ring collapse defeats the pair, which is why the buffer sits on that ring and why suspension-4’s actuators carry local hold-up for the final 200 ms. The layers are stacked, not infinite.',
      ],
      explode: [0, -0.25, 0],
    },
    'zone-drops': {
      name: 'Zone sub-harnesses',
      tagline: 'Forty centimeters to the nearest controller: the last copper a robot cannot lay, and there is less of it every generation.',
      mass: 5,
      specs: [
        ['Topology', 'Short drops from 4 corner boxes, carried from Gen 1'],
        ['Wire length', '0.9 km (Gen 1: 1.6; point-to-point legacy: 3.2)'],
        ['Circuits', 'About 380 (Gen 1: 450)'],
        ['Rails', '48 V primary, 12 V point-of-load for legacy parts'],
        ['Form', 'Flat pressed runs in body channels, machine-laid'],
      ],
      how: 'The topology is Gen 1’s, kept whole: a tailgate motor wires 40 cm to the rear corner box, not 4 m to a dashboard, and wire length is set by the distance to the nearest controller. What Gen 4 changes is the wire itself. The 48 V primary rail quarters the current of every power circuit, so conductors shrink a gauge or two across the board, and consolidation keeps eating circuits as loads integrate: 380 now, against Gen 1’s 450 and the 1,200 of the point-to-point ancestor both generations measured themselves against. The ledger runs 3.2 km to 1.6 to 0.9, and the mass of the whole distribution layer, ring plus boxes plus these drops, lands at 25 kg against Gen 1’s 34.\n\nGen 1 made the sub-harnesses simple enough for automated assembly; Gen 4 makes most of them flat. A pressed ribbon run lies in a body channel and is laid by machine, taped by machine, and inspected by camera, which converts the harness from the one major component no robot could install into an ordinary line operation. The holdouts are the vertical drops up the pillars and into the doors, still draped by hand through moving seals, still the reason a human stands at that station. The honest trend line says those go next generation, not this one.',
      why: 'The zonal argument was banked by Gen 1, so this part claims only what is new: the voltage dividend and the flat form. That discipline matters, because harness marketing loves to double-count the topology win every generation; the 9 kg saved here comes from thinner wire and fewer circuits, not from re-announcing the architecture.',
      fail: [
        'Mixed 12 V and 48 V rails share bundles, and a chafe between them puts 48 on a 12 V net; the point-of-load bucks crowbar within microseconds, but every downstream legacy part still gets a stress test it was never qualified for.',
        'A damaged flat run is replaced, not spliced: repair copper does not press back into a channel, so the service quantum grew from a wire to a segment.',
        'Fewer, denser connectors still mean one corroded seal darkens a branch, carried from Gen 1 and unbeaten by any topology.',
      ],
      explode: [0, 0.4, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────

   DETAIL PASS. Nothing about the electrical architecture moved: the same
   eight parts, the same masses, the same routes, the same four by-wire
   contract points. What changed is that each part now carries the features
   a manufactured one would have, and every one of them was placed against a
   coordinate swept off a built mesh rather than off a comment.

   Four measurements this file is built on, all taken from partner geometry:

     LID 0.302   the battery floor-lid top, identical on battery-3, -6 and
                 -7 everywhere this module stands anything on it. Every
                 standoff seats there and nothing new goes below it.
     CASTING     the body rear casting presents a vertical face at |z| 0.460
                 over x -1.62 to -1.68, y 0.64 to 0.70, on body-4, -6, -7,
                 -8 and -9 alike. The driver-side rear sub-harness clips to
                 it, which is why it no longer ends in air.
     DASH        interior-4 and interior-6 both put dash structure about
                 29 mm forward and up of the A-pillar drop's old free end,
                 so that end now carries a connector that reaches it.
     ANNULUS     r 0.155..0.235 about (x -1.45, y 0.355) over |z| 0.65..0.73
                 belongs to the drivetrain. Two things this module already
                 owns sit inside it, the rear by-wire stubs and the rear
                 zonal corners, and both are contract geometry that cannot
                 move here. One thing added in this pass is also inside it,
                 the crimp collar that has to sit on the stub face, and the
                 rear tap junctions were pulled inboard to |x| 1.196 to pay
                 for it. Swept over deduplicated vertices the band holds 96
                 of this module's against 134 before, and the deepest of
                 them went from 18.0 mm past the nearest wall to 15.0.    */

const PH = P.penthouse;
const CX = -1.320;                     /* converter center. It was -1.37, the
   midpoint of P.penthouse, and that put the case's -x wall at x -1.530
   inside drivetrain-3's torque-vectoring controller on gen4: 63.29 mm over
   52 crossing triangle pairs at (x -1.530 to -1.421, |z| 0.220). The
   controller is a cross-car bar reaching x -1.367 at |z| 0.612 and its
   surface at this case's |z| stops at -1.421, so the case is 240 mm long
   instead of 320 with its rear wall at -1.440, measured clear on gen4
   through gen9. The keyed HV inlet went with it: on the -x wall it would
   have spanned x -1.479 to -1.440 and read 11.46 mm back into the same
   controller, and the pack it feeds from is FORWARD of this box anyway, so
   the inlet is on the +x wall now. */
const RY = 0.345;                      // ring backbone height, per design/gen4.md (~0.34)
const FY = 0.36;                       // by-wire feed height, interface contract
const FZ = 0.70;                       // by-wire feed |z|, interface contract
const STUB_X = 1.30;                   // by-wire stub |x|, interface contract
const LID = 0.302;                     // battery floor-lid top, measured

/* lib.fastener seats its face on y = 0 and grows along +Y, so a head on any
   other face needs the rotation that carries +Y onto that face's outward
   normal. Seat it on the face you MEASURED, not on the datum you assumed:
   the buried heads this pass deleted from the converter were placed on the
   box center plus a guess. */
const FACE = {
  py: [0, 0, 0],
  ny: [Math.PI, 0, 0],
  px: [0, 0, -Math.PI / 2],
  nx: [0, 0, Math.PI / 2],
  pz: [Math.PI / 2, 0, 0],
  nz: [-Math.PI / 2, 0, 0],
};
function head(r, mat, type, pos, face) {
  const f = lib.fastener(r, mat, type);
  const e = FACE[face];
  f.rotation.set(e[0], e[1], e[2]);
  f.position.set(pos[0], pos[1], pos[2]);
  return f;
}

/* Place a sub-assembly built with +X along its own axis. setFromUnitVectors
   is used rather than an atan2 pair on purpose: an atan2 with a negative run
   already carries a half turn, and adding one on top of it is how a part
   ends up pointing into the panel it should be sitting on. */
function aim(obj, pos, dir) {
  const g = new THREE.Group();
  g.position.set(pos[0], pos[1], pos[2]);
  const d = new THREE.Vector3(dir[0], dir[1], dir[2]).normalize();
  g.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), d);
  g.add(obj);
  return g;
}

/* Same, but with a second axis pinned: +X along the cable, +Y toward the
   surface the clip bolts to. */
function place(obj, pos, xdir, ydir) {
  const g = new THREE.Group();
  g.position.set(pos[0], pos[1], pos[2]);
  const X = new THREE.Vector3(xdir[0], xdir[1], xdir[2]).normalize();
  const Y = new THREE.Vector3(ydir[0], ydir[1], ydir[2]);
  Y.addScaledVector(X, -Y.dot(X)).normalize();
  const Z = new THREE.Vector3().crossVectors(X, Y);
  g.setRotationFromMatrix(new THREE.Matrix4().makeBasis(X, Y, Z));
  g.add(obj);
  return g;
}

/* Corrugated conduit. A smooth swept tube reads like a garden hose; the
   orange runs on a real car wear convoluted loom, and the convolutions are
   the whole point, because a rib every 20 to 35 mm is what breaks one long
   highlight into a row of them.

   PITCH IS SET OFF THE DIAMETER, not picked. A first cut ran the by-wire
   feeds at 44 mm pitch on a 16 mm cable, 2.75 diameters, and it rendered as
   a wavy hose rather than a ribbed one: the ramp between crest and root was
   longer than the tube was wide. Convoluted loom runs its convolutions at
   roughly one to one and a half diameters, so every run here is pitched at
   2.6 r and the ribs read as ribs.

   THE CONVOLUTION CUTS INWARD ONLY. Crests sit on r and roots on r(1-2amp),
   so the swept envelope is exactly the smooth tube this replaces and not one
   clearance in the module gets tighter for being detailed. A symmetric
   ripple was tried first and it cost 1.4 mm against wheels-3's master unit
   and 0.9 mm against the body front casting, both of which the smooth runs
   had already been grazing. Conduit is specified on its outside diameter
   anyway, so this is also the honest way around.

   Cost is 2 x rings x radial triangles with rings = 2 x length / pitch.
   Winding is (a, c, b): the ring runs counter-clockwise in the frame's
   (normal, binormal) plane and the tangent is normal x binormal, so the
   other order faces every triangle inward.

   This one deliberately does NOT get lib.crease. An eight-sided tube's
   longitudinal dihedral is 45 degrees and a convolution's is about 16, so
   every threshold that breaks the ribs breaks the facets first and the run
   comes out octagonal. Loom is blow-molded and its ribs really are
   rounded, so smooth normals are the honest ones: the corrugation reads
   through the silhouette and the specular ripple instead. */
function conduit(points, r, mat, o) {
  const q = o || {};
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(p[0], p[1], p[2])), false);
  const len = curve.getLength();
  const pitch = q.pitch != null ? q.pitch : 0.032;
  const amp = q.amp != null ? q.amp : 0.13;
  const rad = q.radial != null ? q.radial : 8;
  const N = Math.max(4, Math.round((len / pitch) * 2));
  const fr = curve.computeFrenetFrames(N, false);
  const pos = new Float32Array((N + 1) * (rad + 1) * 3);
  const uv = new Float32Array((N + 1) * (rad + 1) * 2);
  const idx = [];
  for (let i = 0; i <= N; i++) {
    const c = curve.getPoint(i / N);
    const nn = fr.normals[i], bn = fr.binormals[i];
    const rr = r * (i & 1 ? 1 - 2 * amp : 1);
    for (let j = 0; j <= rad; j++) {
      const a = (j / rad) * Math.PI * 2;
      const cs = Math.cos(a) * rr, sn = Math.sin(a) * rr;
      const k = i * (rad + 1) + j;
      pos[k * 3] = c.x + nn.x * cs + bn.x * sn;
      pos[k * 3 + 1] = c.y + nn.y * cs + bn.y * sn;
      pos[k * 3 + 2] = c.z + nn.z * cs + bn.z * sn;
      uv[k * 2] = (i / N) * len;
      uv[k * 2 + 1] = (j / rad) * Math.PI * 2 * r;
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < rad; j++) {
      const a = i * (rad + 1) + j, c = a + 1, b = a + rad + 1;
      idx.push(a, c, b, c, b + 1, b);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return lib.mesh(geo, mat);
}

/* Where a run crosses a plane, and which way it is heading there, read off
   the same Catmull-Rom curve conduit() and lib.tube build from. A gland
   placed from this lands ON the cable; a gland placed from the control
   point nearest the wall lands near it. */
function crossing(points, axis, value, outward) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(p[0], p[1], p[2])), false);
  const k = axis;
  const N = 600;
  let prev = curve.getPoint(0);
  for (let i = 1; i <= N; i++) {
    const t = i / N, p = curve.getPoint(t);
    if ((prev[k] - value) * (p[k] - value) <= 0 && prev[k] !== p[k]) {
      const f = (value - prev[k]) / (p[k] - prev[k]);
      const at = prev.clone().lerp(p, f);
      const tan = curve.getTangent((i - 1 + f) / N).normalize();
      if (outward != null && tan[k] * outward < 0) tan.negate();
      return { at: at.toArray(), dir: tan.toArray() };
    }
    prev = p;
  }
  return null;
}

/* A sealed connector on the end of a run. Local +X is the mating direction:
   the mating face sits on x = 0 and the shell, the lever and the cable boot
   grow back along -X, so the caller aims it down the cable and the joint
   lands where the run stops. Keyed shell, round mating collar, locking
   lever with its pivot pin, strain-relief boot. */
function connector(len, h, w, r, mat) {
  const g = new THREE.Group();
  const shell = lib.cbox(len, h, w, Math.min(0.0035, h * 0.16), mat);
  shell.position.x = -len / 2;
  g.add(shell);
  const key = lib.cbox(len * 0.78, h * 0.34, 0.0035, 0.0008, mat);
  key.position.set(-len * 0.5, 0, w / 2 + 0.0016);
  g.add(key);
  const col = lib.cyl(Math.min(h, w) * 0.33, 0.0055, M.plasticLt, 10);
  col.rotation.z = Math.PI / 2;
  col.position.x = -0.0026;
  g.add(col);
  const lev = lib.cbox(len * 0.60, 0.0045, w * 0.56, 0.001, M.plastic);
  lev.position.set(-len * 0.44, h / 2 + 0.0026, 0);
  g.add(lev);
  const pin = lib.cyl(0.0022, w * 0.74, M.steel, 6);
  pin.rotation.x = Math.PI / 2;
  pin.position.set(-len * 0.16, h / 2 + 0.0026, 0);
  g.add(pin);
  const boot = lib.lathe([
    [r * 1.05, 0], [r * 1.85, 0.0045], [r * 1.85, 0.013],
    [r * 1.38, 0.025], [r * 1.18, 0.034],
  ], M.plastic, 6);
  boot.rotation.z = Math.PI / 2;
  boot.position.x = -len;
  g.add(boot);
  return g;
}

/* A cable gland where a run leaves or enters a sealed box: a bolted flange
   on the box face, a hex body and a compression nut around the cable. Local
   +X is the outgoing cable direction with the flange face on x = 0. */
function gland(r, mat) {
  const g = new THREE.Group();
  const fl = lib.cbox(0.005, r * 4.2, r * 4.2, 0.0012, mat);
  fl.position.x = 0.0025;
  g.add(fl);
  const body = lib.cyl(r * 1.85, 0.010, mat, 6);
  body.rotation.z = Math.PI / 2;
  body.position.x = 0.0100;
  g.add(body);
  const nut = lib.cyl(r * 1.50, 0.0075, M.plastic, 6);
  nut.rotation.z = Math.PI / 2;
  nut.position.x = 0.0188;
  g.add(nut);
  return g;
}

/* A P-clip: a band around a cable running along local +X, on a stem that
   drops to a bolted foot at local +Y = stand. */
function pclip(r, stand, mat) {
  const g = new THREE.Group();
  const band = lib.torus(r + 0.0018, 0.0016, mat, 8, 4);
  band.rotation.y = Math.PI / 2;
  g.add(band);
  const stem = lib.cbox(0.006, Math.max(0.004, stand - r), 0.0038, 0.0008, mat);
  stem.position.y = (stand + r + 0.0018) / 2;
  g.add(stem);
  const foot = lib.cbox(0.013, 0.0035, 0.011, 0.0009, mat);
  foot.position.y = stand;
  g.add(foot);
  return g;
}

/* A tape-wrapped transition where convoluted loom stops and the last
   stretch runs bare into a connector. */
function wrap(r, len, mat) {
  const w = lib.cyl(r * 1.34, len, mat, 8);
  w.rotation.z = Math.PI / 2;
  return w;
}

/* Cut a set of [lo, hi] gaps out of the interval [a, b] and return what
   survives, so a data lamina can be interrupted at every splice joint and
   every terminal pad instead of running through them. */
function segs(a, b, cuts) {
  let parts = [[a, b]];
  for (const [lo, hi] of cuts) {
    const next = [];
    for (const [s, e] of parts) {
      if (hi <= s || lo >= e) { next.push([s, e]); continue; }
      if (lo > s) next.push([s, lo]);
      if (hi < e) next.push([hi, e]);
    }
    parts = next;
  }
  return parts.filter(([s, e]) => e - s > 0.02);
}

/* A bolted splice over a laminated busbar: the cover plate that clamps two
   sections together, with a pair of heads across the bar. The ring's own
   failure note calls the repair a section swap rather than a splice, which
   is only true if the sections are bolted, so this is where the sections
   end. */
function splice(pos, alongZ, mat) {
  const g = new THREE.Group();
  const w = alongZ ? 0.058 : 0.064;
  const d = alongZ ? 0.064 : 0.058;
  const plate = lib.cbox(w, 0.009, d, 0.0018, mat);
  plate.position.set(pos[0], pos[1] + 0.0045, pos[2]);
  g.add(plate);
  for (const s of [-1, 1]) {
    g.add(head(0.0034, M.steel, 'hex',
      alongZ ? [pos[0] + s * 0.017, pos[1] + 0.009, pos[2]]
             : [pos[0], pos[1] + 0.009, pos[2] + s * 0.017], 'py'));
  }
  return g;
}

/* A stepped insulating standoff shed. The stem below it is left exactly as
   built, an eight-sided post from the pack lid at y 0.302, because that is
   the only geometry this module puts inside the battery envelope and it is
   correct adjacency rather than intrusion. The sheds start at y 0.3115,
   clear of the envelope entirely. */
function shed(mat) {
  return lib.lathe([
    [0.0105, 0.0000], [0.0105, 0.0030], [0.0062, 0.0050], [0.0062, 0.0088],
    [0.0125, 0.0110], [0.0125, 0.0140], [0.0062, 0.0162], [0.0062, 0.0235],
  ], mat, 8);
}

export function build() {
  const sys = new THREE.Group();

  /* ── 800 V to 48 V converter ─────────────────────────────────────────
     One casting in the penthouse bay, and now built like one: a cast base
     with a machined joint flange, a bolted lid, a real fin pitch, four
     mounting ears on webs, a keyed HV input with a locking lever, glanded
     coolant ports, a manual service disconnect with its interlock, and the
     two laminated straps down to the ring's rear leg.

     The four corner bolts this part used to carry were 5 mm cylinders at
     y 0.365 inside a case spanning y 0.360 to 0.490, so all four sat wholly
     inside the box they were fixing. They are gone; the mounting hardware
     is now on ears that stand outboard of the case wall, where the pack lid
     is 69 mm below and nothing else is within 100 mm. */
  const conv = lib.part('converter', [-0.45, 0.35, 0]);
  const cvBase = lib.cbox(0.240, 0.089, 0.440, 0.007, M.castAlu);
  cvBase.position.set(CX, 0.4045, 0);          // y 0.360 to 0.449
  conv.add(cvBase);
  const cvJoint = lib.cbox(0.256, 0.012, 0.456, 0.003, M.castAlu);
  cvJoint.position.set(CX, 0.455, 0);          // y 0.449 to 0.461, proud 8 mm
  conv.add(cvJoint);
  const cvLid = lib.cbox(0.222, 0.029, 0.422, 0.005, M.alu);
  cvLid.position.set(CX, 0.4755, 0);           // y 0.461 to 0.490
  conv.add(cvLid);
  const cvFins = lib.fins(0.20, 0.018, 0.38, 15, 0.003, M.alu);
  cvFins.position.set(CX, 0.499, 0);           // y 0.490 to 0.508, 18 mm pitch
  conv.add(cvFins);
  /* lid bolts, seated on the joint flange top at y 0.461 and clear of both
     the lid at |z| 0.211 and the fin block at |z| 0.190 */
  for (const bz of [-0.220, 0.220]) {
    for (const bx of [-0.090, 0.090]) conv.add(head(0.0045, M.steel, 'hex', [CX + bx, 0.461, bz], 'py'));
  }
  for (const bx of [-0.120, 0.120]) {
    for (const bz of [-0.110, 0.110]) conv.add(head(0.0045, M.steel, 'hex', [CX + bx, 0.461, bz], 'py'));
  }
  /* mounting ears on webs, standing outboard of the case wall at |z| 0.220 */
  for (const ex of [-0.080, 0.080]) {
    for (const ez of [-1, 1]) {
      const ear = lib.cbox(0.052, 0.014, 0.044, 0.004, M.castAlu);
      ear.position.set(CX + ex, 0.371, ez * 0.240);      // z 0.218 to 0.262
      conv.add(ear);
      const web = lib.cbox(0.018, 0.026, 0.018, 0.003, M.castAlu);
      web.position.set(CX + ex, 0.391, ez * 0.227);
      conv.add(web);
      conv.add(head(0.0055, M.steel, 'hex', [CX + ex, 0.378, ez * 0.250], 'py'));
    }
  }
  /* Keyed HV input from the pack, on the -x wall below the joint flange.

     HVZ IS 0.180 BECAUSE 0.100 WAS INSIDE ANOTHER MODULE. drivetrain-3's
     tv-controller is a box spanning x -1.635 to -1.485, y 0.3975 to 0.4425,
     |z| <= 0.085 in gen4, and it straddles this wall. At z 0.100 the plate
     (z 0.071 to 0.129) put its inboard corner 14.0 mm inside that box and
     the connector shell 7.0 mm inside it, measured as vertex depth against
     the built drivetrain-3 mesh. At z 0.180 the whole inlet assembly clears
     every partner in all six presets it runs in by 25.8 mm at worst, swept
     over the assembly's own bounding box.

     The two plate screws sit on the z axis, not the y axis. On the y axis
     at +/-0.023 their flanges (r 1.22 x head r) ran 2.4 and 3.0 mm into the
     connector shell they were holding down, which is lesson 2 again. */
  const HVZ = 0.180;
  const hvPlate = lib.cbox(0.010, 0.064, 0.064, 0.002, M.hv);
  hvPlate.position.set(-1.195, 0.396, HVZ);
  conv.add(hvPlate);
  const hvShell = lib.cbox(0.024, 0.044, 0.044, 0.004, M.hv);
  hvShell.position.set(-1.178, 0.396, HVZ);
  conv.add(hvShell);
  const hvCol = lib.cyl(0.0135, 0.010, M.hv, 14);
  hvCol.rotation.z = Math.PI / 2;
  hvCol.position.set(-1.161, 0.396, HVZ);
  conv.add(hvCol);
  const hvLever = lib.cbox(0.028, 0.006, 0.016, 0.0015, M.plastic);
  hvLever.position.set(-1.178, 0.4215, HVZ);
  conv.add(hvLever);
  for (const pz of [-0.027, 0.027]) conv.add(head(0.0030, M.steel, 'hex', [-1.190, 0.396, HVZ + pz], 'px'));
  /* coolant ports: gland flange on the wall, stub, quick-connect collar */
  for (const [sz, mat] of [[-0.06, M.coolant], [0.06, M.coolantHot]]) {
    const flange = lib.cbox(0.030, 0.030, 0.010, 0.002, M.castAlu);
    flange.position.set(CX + sz, 0.40, 0.225);
    conv.add(flange);
    const stub = lib.cyl(0.008, 0.03, mat, 10);
    stub.rotation.x = Math.PI / 2;
    stub.position.set(CX + sz, 0.40, 0.232);
    conv.add(stub);
    const collar = lib.cyl(0.0105, 0.005, M.plasticLt, 12);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(CX + sz, 0.40, 0.2425);
    conv.add(collar);
  }
  /* manual service disconnect and its HVIL loop, on the -z wall. A solid
     state branch cannot be melted open, so the one thing a technician can
     open by hand is the part that has to be visible. */
  const msdBody = lib.cbox(0.075, 0.055, 0.030, 0.004, M.hv);
  msdBody.position.set(-1.320, 0.418, -0.234);
  conv.add(msdBody);
  const msdLever = lib.cbox(0.056, 0.014, 0.020, 0.003, M.plastic);
  msdLever.position.set(-1.320, 0.452, -0.242);
  conv.add(msdLever);
  const hvil = lib.cbox(0.020, 0.018, 0.018, 0.002, M.plasticLt);
  hvil.position.set(-1.375, 0.404, -0.228);
  conv.add(hvil);
  for (const mx of [-0.028, 0.028]) conv.add(head(0.0030, M.steel, 'hex', [-1.320 + mx, 0.418, -0.249], 'nz'));
  /* LV control and telemetry connector, taking the driver-side rear
     sub-harness. See zone-drops, which terminates on it. */
  const lvRecept = lib.cbox(0.026, 0.024, 0.014, 0.002, M.plasticLt);
  lvRecept.position.set(-1.408, 0.400, -0.226);
  conv.add(lvRecept);
  /* laminated output straps to the ring's rear-leg terminal pads, with a
     bolted lug where each one lands */
  for (const zs of [-1, 1]) {
    conv.add(lib.tube([
      [-1.215, 0.378, zs * 0.14],
      [-1.172, 0.370, zs * 0.28],
      [-1.132, 0.366, zs * 0.40],
    ], 0.007, M.busbar, false, 8));
    const cover = lib.cbox(0.030, 0.016, 0.030, 0.002, M.plastic);
    cover.position.set(-1.213, 0.378, zs * 0.14);
    conv.add(cover);
  }
  /* HV warning plates on the two side walls, clear of the coolant ports on
     +z and of the disconnect, the interlock and the LV receptacle on -z */
  for (const [wx, wz] of [[CX, 1], [CX - 0.02, -1]]) {
    const warn = lib.badge([[-0.024, -0.021], [0.024, -0.021], [0, 0.021]], 0.0016, M.hv,
      { holes: [[[-0.011, -0.013], [0.011, -0.013], [0, 0.0095]]] });
    if (wz < 0) warn.rotation.y = Math.PI;
    warn.position.set(wx, 0.410, wz * 0.2205);
    conv.add(warn);
  }
  sys.add(conv);

  /* ── 48 V ring backbone ──────────────────────────────────────────────
     A laminated Al pair, and now built as a pair: two 4.8 mm rails with a
     2.4 mm insulating lamina pressed between them, inside the same 12 mm
     envelope the single slab occupied. The data laminae are interrupted at
     every splice joint and every terminal pad, because a section swap is
     only a section swap if the sections end somewhere. */
  const ring = lib.part('ring', [0, -0.45, 0]);
  const laminate = (w, d, x, z) => {
    const g = new THREE.Group();
    const lo = lib.cbox(w, 0.0048, d, 0.0012, M.alu);
    lo.position.set(x, 0.3414, z);
    g.add(lo);
    const ins = lib.box(w * 0.92, 0.0024, d * 0.92, M.plastic);
    ins.position.set(x, 0.3450, z);
    g.add(ins);
    const up = lib.cbox(w, 0.0048, d, 0.0012, M.alu);
    up.position.set(x, 0.3486, z);
    g.add(up);
    return g;
  };
  ring.add(laminate(0.05, 1.38, 1.11, 0));
  ring.add(laminate(0.05, 1.38, -1.13, 0));
  for (const zs of [-1, 1]) ring.add(laminate(2.29, 0.05, -0.01, zs * 0.665));

  /* splice stations, chosen where the headroom above the leg is 43 mm or
     more on every preset this module runs in */
  const spliceX = [-0.30, 0.30];
  const spliceFZ = [-0.30, 0.30];
  const spliceRZ = [-0.20, 0.20];
  const gap = (c) => [c - 0.040, c + 0.040];
  for (const zs of [-1, 1]) {
    for (const [a, b] of segs(-1.11, 1.09, spliceX.map(gap))) {
      const dataS = lib.box(b - a, 0.004, 0.018, M.pcb);
      dataS.position.set((a + b) / 2, RY + 0.008, zs * 0.665);
      ring.add(dataS);
    }
    for (const sx of spliceX) ring.add(splice([sx, 0.351, zs * 0.665], false, M.alu));
  }
  for (const [a, b] of segs(-0.65, 0.65, spliceFZ.map(gap).concat([[-0.535, -0.465]]))) {
    const dataL = lib.box(0.018, 0.004, b - a, M.pcb);
    dataL.position.set(1.11, RY + 0.008, (a + b) / 2);
    ring.add(dataL);
  }
  for (const [a, b] of segs(-0.65, 0.65, spliceRZ.map(gap).concat([[-0.435, -0.365], [0.365, 0.435]]))) {
    const dataL = lib.box(0.018, 0.004, b - a, M.pcb);
    dataL.position.set(-1.13, RY + 0.008, (a + b) / 2);
    ring.add(dataL);
  }
  for (const sz of spliceFZ) ring.add(splice([1.11, 0.351, sz], true, M.alu));
  for (const sz of spliceRZ) ring.add(splice([-1.13, 0.351, sz], true, M.alu));

  /* standoff insulators. The eight-sided post from the pack lid at y 0.302
     is unchanged; the sheds above it start at y 0.3115, outside the battery
     envelope entirely. */
  for (const [fx, fz] of [
    [1.11, -0.60], [1.11, 0.60], [-1.13, -0.60], [-1.13, 0.60],
    [0, -0.665], [0, 0.665],
  ]) {
    const foot = lib.cyl(0.005, 0.037, M.plastic, 8);
    foot.position.set(fx, LID + 0.0185, fz);
    ring.add(foot);
    const sh = shed(M.plasticLt);
    sh.position.set(fx, 0.3115, fz);
    ring.add(sh);
  }
  /* terminal pads: two for the converter straps on the rear leg, one for
     the buffer lead on the front leg, each with its bolted lugs */
  for (const [px, pz] of [[-1.13, -0.40], [-1.13, 0.40], [1.11, -0.50]]) {
    const pad = lib.cbox(0.058, 0.008, 0.058, 0.0016, M.busbar);
    pad.position.set(px, RY + 0.010, pz);
    ring.add(pad);
    for (const s of [-1, 1]) ring.add(head(0.0034, M.steel, 'hex', [px, RY + 0.014, pz + s * 0.021], 'py'));
  }
  sys.add(ring);

  /* ── zonal controllers ───────────────────────────────────────────────
     Four corner boxes riding the ring's side legs. Cast case, bolted
     machined lid, a fin bank at a pitch a heatsink would actually use, a
     row of three keyed connectors with locking levers on the inboard wall,
     a gland where the sub-harness leaves, and a rating plate.

     Everything added here is kept out of the rear annulus, by |z| or by
     radius: the lid bolts stop at |z| 0.647 against the band's 0.650 wall,
     and the mounting ear does reach |z| 0.686 but sits at radius 0.245 to
     0.275 about the rear axle, outside the band's 0.235 wall. */
  const zPos = [
    [1.16, -0.615, 0.25], [1.16, 0.615, 0.25],
    [-1.19, -0.615, -0.25], [-1.19, 0.615, -0.25],
  ];
  for (const [zx, zz, ex] of zPos) {
    const zs = Math.sign(zz);
    const fwd = zx > 0 ? 1 : -1;          // the box's outward face along x
    const zc = lib.part('zonal', [ex, 0.28, zs * 0.45]);
    const body = lib.cbox(0.140, 0.062, 0.100, 0.005, M.castAlu);
    body.position.set(zx, 0.382, zz);      // y 0.351 to 0.413
    zc.add(body);
    /* The lid is 66 mm deep on a 100 mm case, sunk onto a machined landing.
       It was 92 mm, and the extra 13 mm a side put its two outboard corners
       inside the rear annulus on the rear pair of boxes: 66 vertices of pure
       de-indexing cost, since lib.cbox splits normals and carries 132
       vertices where lib.box carried 24. The band is where the annulus
       contract lives, so the lid comes in rather than the count going up. */
    const lid = lib.cbox(0.132, 0.008, 0.066, 0.002, M.alu);
    lid.position.set(zx, 0.417, zz);       // y 0.413 to 0.421, |z| <= 0.648
    zc.add(lid);
    const fins = lib.fins(0.110, 0.012, 0.046, 9, 0.0025, M.alu);
    fins.position.set(zx, 0.427, zz);      // y 0.421 to 0.433, 5.4 mm pitch
    zc.add(fins);
    for (const bx of [-0.061, 0.061]) {
      for (const bz of [-0.028, 0.028]) zc.add(head(0.0032, M.steel, 'hex', [zx + bx, 0.421, zz + bz], 'py'));
    }
    /* keyed connectors on the inboard wall */
    for (const cx of [-0.04, 0, 0.04]) {
      const shell = lib.cbox(0.018, 0.024, 0.020, 0.003, M.plasticLt);
      shell.position.set(zx + cx, 0.376, zz - zs * 0.059);
      zc.add(shell);
      const key = lib.cbox(0.004, 0.015, 0.014, 0.001, M.plasticLt);
      key.position.set(zx + cx + 0.008, 0.376, zz - zs * 0.062);
      zc.add(key);
      const lev = lib.cbox(0.014, 0.005, 0.011, 0.0012, M.plastic);
      lev.position.set(zx + cx, 0.3905, zz - zs * 0.062);
      zc.add(lev);
      const boot = lib.cyl(0.0062, 0.008, M.plastic, 8);
      boot.rotation.x = Math.PI / 2;
      boot.position.set(zx + cx, 0.376, zz - zs * 0.0725);
      zc.add(boot);
    }
    /* gland on the wall the sub-harness actually leaves through, which is
       the rearward -x wall on all four boxes: both drops run aft. */
    zc.add(aim(gland(0.005, M.castAlu), [zx - 0.070, 0.398, zz], [-1, 0, 0]));
    /* tap strap down to the ring leg */
    zc.add(lib.tube([
      [zx, 0.36, zz + zs * 0.03],
      [zx, 0.352, zz + zs * 0.05],
    ], 0.004, M.busbar, false, 3));
    /* Mounting ear. It goes on the OUTBOARD wall, over the exposed 25 mm of
       ring side leg between the case wall at |z| 0.665 and the leg edge at
       0.690, because that is the only place on this box where a bolt head
       is not underneath the case it is holding. An earlier draft put the
       boss over the standoff post at z offset 0.025, which is inside the
       case footprint, and buried both the boss and its head: lesson 2 of
       this pass, paid for a fourth time. Also checked against the rear
       annulus: at x -1.19 the ear's radius about the rear axle is 0.245 to
       0.275, outside the band's 0.235 wall. */
    const ear = lib.cbox(0.030, 0.008, 0.026, 0.0018, M.castAlu);
    ear.position.set(zx, 0.355, zz + zs * 0.058);   // |z| 0.660 to 0.686
    zc.add(ear);
    zc.add(head(0.0034, M.steel, 'hex', [zx, 0.359, zz + zs * 0.058], 'py'));
    const foot = lib.cyl(0.006, 0.049, M.plastic, 8);
    foot.position.set(zx, LID + 0.0245, zz - zs * 0.025);
    zc.add(foot);
    /* rating plate on the inboard wall, between the connectors and the
       forward corner */
    const plate = lib.badge([[-0.020, -0.008], [0.020, -0.008], [0.020, 0.008], [-0.020, 0.008]],
      0.0012, M.plasticLt);
    plate.rotation.y = zs > 0 ? Math.PI : 0;
    plate.position.set(zx - fwd * 0.052, 0.398, zz - zs * 0.050);
    zc.add(plate);
    sys.add(zc);
  }

  /* ── 48 V buffer pack ────────────────────────────────────────────────
     LFP in the frunk with a ribbed case, a gasketed and bolted lid,
     terminal posts under bolted lugs, a BMS connector, a pressure vent, a
     hold-down strap that now sits on the lid instead of 1 mm above it, and
     a gland where the ring lead leaves. */
  const buf = lib.part('buffer', [0.35, 0.35, -0.2]);
  const bCase = lib.cbox(0.200, 0.120, 0.150, 0.006, M.plastic);
  bCase.position.set(1.90, 0.615, -0.28);      // y 0.555 to 0.675
  buf.add(bCase);
  for (const bz of [-1, 1]) {
    for (const bx of [-0.062, 0, 0.062]) {
      const rib = lib.cbox(0.008, 0.100, 0.005, 0.0012, M.plastic);
      rib.position.set(1.90 + bx, 0.612, -0.28 + bz * 0.0765);
      buf.add(rib);
    }
  }
  const bGask = lib.box(0.204, 0.004, 0.154, M.rubber);
  bGask.position.set(1.90, 0.675, -0.28);
  buf.add(bGask);
  const bLid = lib.cbox(0.202, 0.018, 0.152, 0.004, M.plasticLt);
  bLid.position.set(1.90, 0.686, -0.28);       // y 0.677 to 0.695
  buf.add(bLid);
  for (const bx of [-0.088, 0.088]) {
    for (const bz of [-0.065, 0.065]) buf.add(head(0.0038, M.steel, 'hex', [1.90 + bx, 0.695, -0.28 + bz], 'py'));
  }
  /* terminal posts, bolted lugs and insulating collars */
  for (const tz of [-0.33, -0.23]) {
    const collar = lib.cyl(0.0145, 0.008, M.plastic, 12);
    collar.position.set(1.83, 0.699, tz);
    buf.add(collar);
    const term = lib.cyl(0.008, 0.018, M.copper, 10);
    term.position.set(1.83, 0.703, tz);
    buf.add(term);
    const lugPad = lib.cbox(0.030, 0.004, 0.016, 0.0009, M.copper);
    lugPad.position.set(1.842, 0.7135, tz);
    buf.add(lugPad);
    buf.add(head(0.0042, M.steel, 'hex', [1.83, 0.7155, tz], 'py'));
  }
  /* hold-down strap, seated on the lid with a bolted tab at each end */
  const strap = lib.cbox(0.024, 0.006, 0.164, 0.0012, M.steel);
  strap.position.set(1.96, 0.6975, -0.28);     // y 0.6945 to 0.7005, on the lid
  buf.add(strap);
  /* The strap turns down over each end of the lid and bolts to the case
     side. Heads on TOP of the tabs would have been inside the strap. */
  for (const [tz, face] of [[-0.3595, 'nz'], [-0.2005, 'pz']]) {
    const tab = lib.cbox(0.024, 0.030, 0.007, 0.0012, M.steel);
    tab.position.set(1.96, 0.6855, tz);
    buf.add(tab);
    buf.add(head(0.0030, M.steel, 'hex', [1.96, 0.680, tz + (face === 'nz' ? -0.0035 : 0.0035)], face));
  }
  /* BMS connector on the -z wall, and the pressure-equalization vent on
     the +x wall. Both faces were measured clear: 25 mm to the body front
     casting off -z, 306 mm off +x. */
  const bms = lib.cbox(0.026, 0.020, 0.016, 0.002, M.plasticLt);
  bms.position.set(1.94, 0.630, -0.362);
  buf.add(bms);
  const bmsLev = lib.cbox(0.018, 0.004, 0.010, 0.001, M.plastic);
  bmsLev.position.set(1.94, 0.6425, -0.364);
  buf.add(bmsLev);
  const vent = lib.cyl(0.0085, 0.012, M.plastic, 10);
  vent.rotation.z = Math.PI / 2;
  vent.position.set(2.005, 0.640, -0.28);
  buf.add(vent);
  const ventCap = lib.cyl(0.0105, 0.004, M.plasticLt, 10);
  ventCap.rotation.z = Math.PI / 2;
  ventCap.position.set(2.013, 0.640, -0.28);
  buf.add(ventCap);
  /* Ring lead: glanded out of the case floor and lugged onto the front
     leg's terminal pad. It used to land at z -0.61, which is inside the
     front driver-side zonal controller's own footprint (x 1.09 to 1.23,
     z -0.565 to -0.665), so the lug and the pad's bolt heads were both
     inside a box. It lands at z -0.50 instead.

     THE ROUTE BETWEEN THOSE TWO ENDS IS SET BY A CLEARANCE SWEEP, NOT BY A
     STRAIGHT LINE. This corridor carries six presets' worth of hardware and
     a route drawn through it by eye buries itself in three of them: the
     first attempt ran 21.4 mm inside suspension-9's steering rack around
     (1.295, 0.374, -0.488), 3.1 mm inside suspension-9's air supply and,
     at the gland, 3.0 mm inside thermal-6's pressure set, all measured as
     vertex depth against the built partner meshes. The gland moved inboard
     to x 1.838, clear of the pressure set's x 1.854 wall, and the run now
     swings out to |z| 0.53 through the x 1.35 to 1.20 stretch where the
     rack is, then comes back to the pad. Sampled every 1.6 mm over its own
     Catmull-Rom in all six presets, the tightest point left on the
     centerline is 0.1 mm off gen9's rear air spring, which the smooth run
     it replaces was already grazing, and the only thing it still touches is
     body-4's front casting, which the buffer case itself already sits in.

     The gland stays 11.4 degrees off vertical, matching the curve's own
     start tangent, so its flange lies on the case floor rather than
     hovering at an angle to it. */
  const bLead = [
    [1.838, 0.5520, -0.300],
    [1.836, 0.5160, -0.307],
    [1.798, 0.4840, -0.372],
    [1.680, 0.4280, -0.402],
    [1.520, 0.4150, -0.442],
    [1.350, 0.4150, -0.528],
    [1.200, 0.3950, -0.526],
    [1.145, 0.3655, -0.500],
  ];
  buf.add(conduit(bLead, 0.006, M.plasticLt, { pitch: 0.020, amp: 0.13, radial: 6 }));
  buf.add(aim(gland(0.006, M.plastic), [1.838, 0.5555, -0.300], [-0.054, -0.980, -0.190]));
  const bLug = lib.cbox(0.050, 0.005, 0.018, 0.0010, M.busbar);
  bLug.position.set(1.1225, 0.3615, -0.500);   // on the pad top at y 0.359
  buf.add(bLug);
  buf.add(head(0.0030, M.steel, 'hex', [1.104, 0.364, -0.500], 'py'));
  sys.add(buf);

  /* ── bidirectional charge port ───────────────────────────────────────
     A CCS2 inlet built as an inlet: a screwed mounting flange, a shrouded
     bezel with a chamfered rim and a seal ring, a recessed contact face
     with the pins BEHIND the rim where a coupler would find them, the
     locking pin actuator, a hinged flap on real knuckles, and the V2G
     electronics behind the quarter panel with a finned lid and glands.

     The pins used to stand 8 mm proud of the bezel, which is the one thing
     a charge inlet never does. They now sit 6.5 mm inside it. */
  const v2g = lib.part('v2g-port', [-0.45, 0.55, 0.4]);
  const cpx = P.chargePort[0], cpy = P.chargePort[1], cpz = P.chargePort[2];
  const mount = lib.cyl(0.066, 0.006, M.plastic, 20);
  mount.rotation.x = Math.PI / 2;
  mount.position.set(cpx, cpy, cpz - 0.012);   // z 0.865 to 0.871
  v2g.add(mount);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    v2g.add(head(0.0030, M.steel, 'torx',
      [cpx + Math.cos(a) * 0.0605, cpy + Math.sin(a) * 0.0605, cpz - 0.009], 'pz'));
  }
  const shroud = lib.lathe([
    [0.0535, 0.0000], [0.0535, 0.0240], [0.0515, 0.0285], [0.0475, 0.0285],
    [0.0455, 0.0245], [0.0455, 0.0020],
  ], M.plastic, 20);
  shroud.rotation.x = Math.PI / 2;
  shroud.position.set(cpx, cpy, cpz - 0.010);  // rim at z 0.8985
  v2g.add(shroud);
  const seal = lib.torus(0.0473, 0.0022, M.rubber, 16, 4);
  seal.position.set(cpx, cpy, cpz + 0.0175);
  v2g.add(seal);
  const face = lib.cyl(0.0450, 0.005, M.plasticLt, 20);
  face.rotation.x = Math.PI / 2;
  face.position.set(cpx, cpy, cpz - 0.0045);   // contact face at z 0.878
  v2g.add(face);
  /* seven Type-2 contacts above, two DC below, all inside the shroud */
  for (const [dx, dy] of [[-0.030, 0.008], [-0.018, 0.017], [-0.006, 0.021],
                          [0.006, 0.021], [0.018, 0.017], [0.030, 0.008], [0, 0.006]]) {
    const pin = lib.cyl(0.0052, 0.014, M.copper, 8);
    pin.rotation.x = Math.PI / 2;
    pin.position.set(cpx + dx, cpy + dy + 0.006, cpz + 0.005);
    v2g.add(pin);
  }
  for (const dx of [-0.019, 0.019]) {
    const pin = lib.cyl(0.0115, 0.016, M.copper, 12);
    pin.rotation.x = Math.PI / 2;
    pin.position.set(cpx + dx, cpy - 0.024, cpz + 0.006);
    v2g.add(pin);
  }
  /* locking pin actuator under the shroud */
  const lockBody = lib.cbox(0.030, 0.022, 0.026, 0.003, M.plastic);
  lockBody.position.set(cpx, cpy - 0.068, cpz - 0.002);
  v2g.add(lockBody);
  const lockPin = lib.cyl(0.0035, 0.020, M.steel, 8);
  lockPin.position.set(cpx, cpy - 0.050, cpz + 0.002);
  v2g.add(lockPin);
  /* flap, on knuckles and a real pin */
  const hingeBase = lib.cbox(0.086, 0.014, 0.012, 0.002, M.plastic);
  hingeBase.position.set(cpx, cpy + 0.064, cpz - 0.007);
  v2g.add(hingeBase);
  for (const kx of [-0.030, 0.030]) {
    const knuck = lib.cyl(0.0055, 0.013, M.plastic, 10);
    knuck.rotation.z = Math.PI / 2;
    knuck.position.set(cpx + kx, cpy + 0.068, cpz + 0.001);
    v2g.add(knuck);
  }
  const hingePin = lib.cyl(0.0026, 0.088, M.steel, 8);
  hingePin.rotation.z = Math.PI / 2;
  hingePin.position.set(cpx, cpy + 0.068, cpz + 0.001);
  v2g.add(hingePin);
  const flapPivot = new THREE.Group();
  flapPivot.position.set(cpx, cpy + 0.068, cpz + 0.001);
  const flap = lib.cbox(0.125, 0.125, 0.006, 0.0018, M.paint);
  flap.position.set(0, -0.0625, 0);
  lib.shell(flap);
  flapPivot.add(flap);
  const flapLiner = lib.cbox(0.110, 0.108, 0.004, 0.0012, M.plastic);
  flapLiner.position.set(0, -0.0625, -0.0048);
  flapPivot.add(flapLiner);
  const flapArm = lib.cbox(0.070, 0.012, 0.010, 0.0018, M.plastic);
  flapArm.position.set(0, -0.006, -0.0015);
  flapPivot.add(flapArm);
  flapPivot.rotation.x = -2.2;
  v2g.add(flapPivot);
  /* V2G electronics behind the quarter panel.

     THE BOX WAS 380 MM INBOARD OF THE INLET IT SERVES AND IT WAS INSIDE THE
     REAR SUSPENSION. At (-1.66, 0.590, 0.52) it read 92.34 mm into
     suspension-4's active dampers on gen4 to gen8 and 97.65 into
     suspension-9's on gen9, 78.00 mm into every body's rear casting over 316
     crossing triangle pairs, and 7.52 into the Gen 8 and Gen 9 safety cage.
     Fifteen pairs, six rungs, one box. The previous note here recorded that
     most of its surface was enclosed by the casting and then placed a
     warning plate on the one clear face rather than moving the box, which
     is treating the symptom.

     The rear quarter is the fullest corner on the car and it was swept
     properly this time: a 40 mm probe over x -1.95, -1.85 and -1.75 by
     y 0.56 to 1.02 by z 0.60 to 0.92, against every partner in all six
     presets at once. Almost nothing is free. The tire, the rotor rings, the
     rear arch closeouts, interior-6's NVH blanket, the cage and five
     different quarter-panel surfaces between them fill the volume the old
     box stood in and every volume outboard of it.

     One pocket survives, and it is the right one: x -2.000 to -1.840,
     y 0.610 to 0.750, z 0.590 to 0.730, directly inboard and below the inlet
     rather than 380 mm forward of it. Clear on gen4 through gen9 with no
     exception. The box is 150 x 90 x 130 there against 220 x 70 x 140
     before, the AC pigtail is 210 mm instead of 380, and the panel's own
     claim that this is "the V2G electronics behind the quarter panel" is
     true of the geometry for the first time. */
  const VBX = -1.920, VBY = 0.665, VBZ = 0.660;
  const vBox = lib.cbox(0.150, 0.090, 0.130, 0.005, M.castAlu);
  vBox.position.set(VBX, VBY, VBZ);            // y 0.620 to 0.710
  v2g.add(vBox);
  const vLid = lib.cbox(0.142, 0.008, 0.122, 0.002, M.alu);
  vLid.position.set(VBX, VBY + 0.049, VBZ);
  v2g.add(vLid);
  const vFins = lib.fins(0.110, 0.011, 0.096, 13, 0.0028, M.alu);
  vFins.position.set(VBX, VBY + 0.0585, VBZ);
  v2g.add(vFins);
  for (const bx of [-0.061, 0.061]) {
    for (const bz of [-0.050, 0.050]) v2g.add(head(0.0035, M.steel, 'hex', [VBX + bx, VBY + 0.053, VBZ + bz], 'py'));
  }
  /* Warning plate on the inboard wall, which is the face a hand reaches
     from the trunk. It was on the lid, at y 0.625 extruding +Y, which is the
     underside of a lid spanning y 0.625 to 0.633: all 48 triangles of it
     were inside the lid they were printed on, 6.6 mm below its top face,
     and the plate rendered nowhere in any preset. */
  const vWarn = lib.badge([[-0.020, -0.018], [0.020, -0.018], [0, 0.018]], 0.0014, M.hv,
    { holes: [[[-0.009, -0.011], [0.009, -0.011], [0, 0.008]]] });
  vWarn.rotation.y = Math.PI;
  vWarn.position.set(VBX, VBY, VBZ - 0.0655);
  v2g.add(vWarn);
  /* AC pigtail: leaves the back of the inlet under a strain-relief boot and
     glands into the box's +z wall, 210 mm away */
  const acRun = [
    [-1.918, 0.774, 0.858],
    [-1.919, 0.757, 0.820],
    [-1.920, 0.735, 0.780],
    [-1.920, 0.712, 0.748],
    [-1.920, 0.694, 0.716],
  ];
  v2g.add(conduit(acRun, 0.008, M.plasticLt, { pitch: 0.021, amp: 0.13, radial: 6 }));
  v2g.add(aim(connector(0.020, 0.026, 0.030, 0.008, M.plasticLt),
    [-1.920, 0.776, 0.862], [0.36, 0.36, 0.86]));
  const acCross = crossing(acRun, 'z', VBZ + 0.065, -1);
  if (acCross) v2g.add(aim(gland(0.008, M.castAlu), acCross.at, [-acCross.dir[0], -acCross.dir[1], -acCross.dir[2]]));
  sys.add(v2g);

  /* ── thinned HV runs ─────────────────────────────────────────────────
     Six orange runs, now wearing convoluted conduit instead of reading as
     smooth hose, and every one of the twelve ends terminated. Four of them
     used to stop in open air or fade into a wall with no hardware on them:
     the pack feed at the lid, the tunnel run at the front unit, the two
     rear corner runs at the service-loop brackets, and the thermal spur at
     the heat pump. Each now carries a sealed connector aimed down its own
     last tangent, or a gland where it passes a box wall. */
  const runs = lib.part('hv-runs', [0.15, -0.6, 0]);

  const packFeed = [
    [-1.13, 0.315, 0.38],
    [-1.16, 0.35, 0.30],
    [-1.20, 0.40, 0.20],
    [-1.24, 0.42, 0.12],
  ];
  runs.add(conduit(packFeed, 0.012, M.hv, { pitch: 0.031 }));
  /* pack-side feedthrough: a bolted flange plate seated on the lid at
     y 0.302, a boss around the cable, and the warning label ON the plate */
  const pfPlate = lib.cbox(0.058, 0.010, 0.078, 0.003, M.hv);
  pfPlate.position.set(-1.13, LID + 0.005, 0.386);   // y 0.302 to 0.312
  runs.add(pfPlate);
  const pfBoss = lib.cyl(0.019, 0.014, M.hv, 10);
  pfBoss.position.set(-1.13, 0.319, 0.38);
  runs.add(pfBoss);
  for (const bx of [-0.021, 0.021]) {
    for (const bz of [-0.030, 0.030]) runs.add(head(0.0030, M.steel, 'hex', [-1.13 + bx, 0.312, 0.386 + bz], 'py'));
  }
  const pfWarn = lib.badge([[-0.012, -0.009], [0.012, -0.009], [0, 0.009]], 0.0014, M.hv,
    { holes: [[[-0.005, -0.006], [0.005, -0.006], [0, 0.004]]] });
  pfWarn.rotation.set(-Math.PI / 2, 0, 0);
  pfWarn.position.set(-1.13, 0.3121, 0.411);
  runs.add(pfWarn);
  const pfIn = crossing(packFeed, 'x', -1.21, -1);
  if (pfIn) runs.add(aim(gland(0.012, M.castAlu), pfIn.at, [-pfIn.dir[0], -pfIn.dir[1], -pfIn.dir[2]]));

  const tunnel = [
    [-1.21, 0.42, 0.05],
    [-1.05, 0.35, 0.05],
    [-0.45, 0.34, 0.05],
    [0.35, 0.34, 0.05],
    [0.95, 0.34, 0.05],
    [1.14, 0.37, 0.05],
    [1.235, 0.390, 0.030],
    [1.278, 0.399, 0.017],
  ];
  runs.add(conduit(tunnel, 0.014, M.hv, { pitch: 0.036 }));
  runs.add(aim(gland(0.014, M.castAlu), [-1.208, 0.4185, 0.05], [1, -0.36, 0]));
  runs.add(aim(connector(0.030, 0.036, 0.040, 0.014, M.hv),
    [1.302, 0.4035, 0.010], [0.94, 0.19, -0.29]));
  /* Tape transition, placed BEHIND the connector's strain-relief boot and
     on the cable rather than near it. connector() runs its shell back 30 mm
     from the mating face and its boot a further 34 mm, so anything inside
     64 mm of the face is inside the boot: the wrap was at 32 mm, radius
     18.8 mm against a boot radius of 22.9 mm at that station, and all 32 of
     its triangles were inside the molding. It now sits at x 1.2349, which
     is 71 mm back along the run and happens to be one of the tunnel's own
     control points, so crossing() returns the curve's point and tangent and
     the wrap lands square on the loom. */
  const tnWrap = crossing(tunnel, 'x', 1.2349, 1);
  if (tnWrap) runs.add(aim(wrap(0.014, 0.014, M.plastic), tnWrap.at, tnWrap.dir));
  /* Standoff clips on the tunnel centerline. Six-sided posts rather than
     eight so four clips cost the battery envelope about what two used to.

     A CLIP GOES ON THE CABLE, NOT ON THE CABLE'S DATUM. Lesson 3 of this
     pass, paid again: the run is drawn through control points at y 0.34
     and 0.35, but the Catmull-Rom that conduit() actually sweeps dips
     between them, and at the four clip stations the BUILT centerline is at
     y 0.3344, 0.3392, 0.3400 and 0.3350. Seated at a constant y 0.3425 the
     band stood 8.1, 3.3, 2.5 and 7.5 mm above the cable it was clamping,
     while the stem, the foot and the top of the post ran 7.4, 2.5, 1.8 and
     6.7 mm INSIDE it: 784 triangles across the four clips, all of them
     either floating or buried. Both the seat and the post height now come
     from crossing(), which reads the same curve, so the band is concentric
     with the loom and the post lands under the foot at 0.0 mm.

     Post heights fall out at 14.1, 19.0, 19.7 and 14.8 mm against the flat
     24 mm they were. Every post still starts on the pack lid at y 0.302
     and every top still stops above y 0.31, so the battery-envelope count
     is unchanged at 193 vertices. */
  for (const clipX of [-0.85, -0.30, 0.28, 0.80]) {
    const seat = crossing(tunnel, 'x', clipX, 1);
    if (!seat) continue;
    const h = seat.at[1] - 0.01825 - LID;     // foot bottom sits at cy - 18.25 mm
    const post = lib.cyl(0.0042, h, M.plastic, 6);
    post.position.set(clipX, LID + h / 2, seat.at[2]);
    runs.add(post);
    runs.add(place(pclip(0.0145, 0.0165, M.plastic), seat.at, seat.dir, [0, -1, 0]));
  }

  for (const zs of [-1, 1]) {
    const corner = [
      [-1.52, 0.44, zs * 0.16],
      [-1.50, 0.435, zs * 0.38],
      [-1.44, 0.43, zs * 0.54],
      [-1.355, 0.425, zs * 0.612],
    ];
    runs.add(conduit(corner, 0.007, M.hv, { pitch: 0.020, radial: 6 }));
    const out = crossing(corner, 'z', zs * 0.220, zs);
    if (out) runs.add(aim(gland(0.007, M.castAlu), out.at, out.dir));
    runs.add(aim(connector(0.020, 0.020, 0.024, 0.007, M.hv),
      [-1.338, 0.4245, zs * 0.6255], [0.72, -0.04, zs * 0.69]));
  }

  const spur = [
    [-1.22, 0.40, 0.12],
    [-0.90, 0.35, 0.10],
    [-0.20, 0.345, 0.10],
    [0.50, 0.345, 0.12],
    [0.95, 0.35, 0.18],
    [1.08, 0.37, 0.34],
    [1.13, 0.42, 0.44],
    [1.30, 0.47, 0.45],
    [1.52, 0.51, 0.44],
    [1.678, 0.5455, 0.4235],
  ];
  runs.add(conduit(spur, 0.008, M.hv, { pitch: 0.024, radial: 6 }));
  const spurOut = crossing(spur, 'x', -1.21, 1);
  if (spurOut) runs.add(aim(gland(0.008, M.castAlu), spurOut.at, spurOut.dir));
  runs.add(aim(connector(0.022, 0.022, 0.026, 0.008, M.hv),
    [1.702, 0.5510, 0.4180], [0.973, 0.216, -0.108]));
  runs.add(aim(wrap(0.008, 0.012, M.plastic), [1.668, 0.5433, 0.4249], [0.973, 0.216, -0.108]));

  const portRun = [
    [-1.578, 0.578, 0.505],
    [-1.535, 0.572, 0.498],
    [-1.520, 0.520, 0.430],
    [-1.500, 0.462, 0.330],
    [-1.462, 0.425, 0.245],
    [-1.435, 0.412, 0.180],
  ];
  runs.add(conduit(portRun, 0.010, M.hv, { pitch: 0.026, radial: 6 }));
  const prOut = crossing(portRun, 'x', -1.550, 1);
  if (prOut) runs.add(aim(gland(0.010, M.castAlu), prOut.at, prOut.dir));
  const prIn = crossing(portRun, 'z', 0.220, -1);
  if (prIn) runs.add(aim(gland(0.010, M.castAlu), prIn.at, [-prIn.dir[0], -prIn.dir[1], -prIn.dir[2]]));
  sys.add(runs);

  /* ── by-wire feed pair ───────────────────────────────────────────────
     THE CONTRACT IS THE FOUR STUBS AND IT DOES NOT MOVE. Cylinders of
     r 0.012 and 28 mm length on (+/-1.30, 0.36, +/-0.70), spanning
     |x| 1.286 to 1.314, y 0.348 to 0.372 and |z| 0.688 to 0.712, which is
     what suspension-9 measured off this mesh and landed its bosses on.
     suspension-9 also carries an open recommendation to move all four to
     |z| 0.58; that is a coordinated two-module change and is NOT made here.

     What is added: convoluted loom over the free span, tape-wrapped
     transitions and crimp collars at the four terminations, and three
     bracketed clips per side standing off the ring's own side leg, which
     is the nearest structure to a run that was previously unsupported over
     2.6 m. The loom is deliberately confined to |x| <= 1.16 so none of it
     lands in the rear annulus, and the rear tap junctions moved from
     |x| 1.23 to 1.196, out of the band, to pay for the crimp collars, which
     have to sit on the stub face at |x| 1.2895 and are inside it. Measured
     on the built mesh, the band holds 192 vertices of this part against 184
     before, and the deepest of them is unchanged because the loom's crests
     sit on the same radius the smooth tube did. */
  const feeds = lib.part('bywire-feeds', [0, -0.25, 0]);
  for (const zs of [-1, 1]) {
    feeds.add(conduit([
      [1.16, FY, zs * FZ],
      [0.45, FY, zs * FZ],
      [-0.45, FY, zs * FZ],
      [-1.16, FY, zs * FZ],
    ], 0.008, M.hv, { pitch: 0.021, radial: 6 }));
    for (const xs of [-1, 1]) {
      /* the free lead from the loom to the stub, kept to two segments so
         the 80 mm of it that lies in the annulus band costs what the old
         single tube cost there */
      feeds.add(lib.tube([
        [xs * 1.286, FY, zs * FZ],
        [xs * 1.16, FY, zs * FZ],
      ], 0.008, M.hv, false, 2));
      const stub = lib.cyl(0.012, 0.028, M.hv, 12);
      stub.rotation.z = Math.PI / 2;
      stub.position.set(xs * STUB_X, FY, zs * FZ);
      feeds.add(stub);
      const crimp = lib.cyl(0.0128, 0.007, M.plastic, 6);
      crimp.rotation.z = Math.PI / 2;
      crimp.position.set(xs * 1.2895, FY, zs * FZ);
      feeds.add(crimp);
      const tape = lib.cyl(0.0104, 0.014, M.plastic, 8);
      tape.rotation.z = Math.PI / 2;
      tape.position.set(xs * 1.152, FY, zs * FZ);
      feeds.add(tape);
    }
    /* Bracketed clips off the ring's side leg, the only structure within
       reach: 58 mm of air below the run and 145 mm out to the sill.

       THE FOOT SEATS ON THE LEG, NOT ON THE LEG'S DATUM. The side leg's
       laminate top is y 0.3510, but the ring's data lamina stands 4 mm
       proud of it over |z| 0.656 to 0.674 at exactly these three x
       stations. A 20 mm foot centered on |z| 0.680 spanned 0.670 to 0.690
       and so buried its inboard 4 mm inside that lamina, 284 triangles of
       it across the six clips. The foot is 12 mm deep on |z| 0.682 now, so
       it spans 0.676 to 0.688: 2.0 mm clear of the lamina edge and 2.0 mm
       inboard of the leg edge at 0.690, still seated on the laminate. */
    for (const cx of [-1.02, 0, 1.00]) {
      const foot = lib.cbox(0.018, 0.005, 0.012, 0.001, M.plastic);
      foot.position.set(cx, 0.3535, zs * 0.682);
      feeds.add(foot);
      const arm = lib.cbox(0.013, 0.004, 0.013, 0.001, M.plastic);
      arm.position.set(cx, 0.3565, zs * 0.687);
      feeds.add(arm);
      const band = lib.torus(0.0098, 0.0016, M.plastic, 10, 5);
      band.rotation.y = Math.PI / 2;
      band.position.set(cx, FY, zs * FZ);
      feeds.add(band);
    }
    /* taps from the two same-side corner controllers. Both junctions now
       sit at |x| 1.196, inboard of the annulus band's 1.215 wall. */
    feeds.add(lib.tube([
      [1.16, 0.375, zs * 0.655],
      [1.178, 0.365, zs * 0.682],
      [1.196, FY, zs * FZ],
    ], 0.005, M.hv, false, 8));
    feeds.add(lib.tube([
      [-1.19, 0.375, zs * 0.655],
      [-1.192, 0.365, zs * 0.682],
      [-1.196, FY, zs * FZ],
    ], 0.005, M.hv, false, 8));
  }
  sys.add(feeds);

  /* ── zone sub-harnesses ──────────────────────────────────────────────
     Four drops, all four of which used to stop in open air. They now leave
     their corner box through a gland, wear convoluted loom with a
     tape-wrapped breakout, and land on measured hardware:

       front pair   a bulkhead connector reaching the dash structure, which
                    interior-4 and interior-6 both put about 29 mm forward
                    and up of where these drops used to stop.
       rear +z      a gland on the V2G electronics box's +x wall. The port
                    electronics are the passenger-side rear quarter's only
                    load, and the box was already sitting in the path the
                    old drop swept through.
       rear -z      a P-clip and a sealed connector on the body rear
                    casting, whose vertical face at |z| 0.460 over x -1.62
                    to -1.68 and y 0.64 to 0.70 is present on every body
                    this module runs with. */
  const drops = lib.part('zone-drops', [0, 0.4, 0]);
  for (const zs of [-1, 1]) {
    const front = [
      [1.108, 0.398, zs * 0.615],
      [1.062, 0.400, zs * 0.618],
      [1.020, 0.430, zs * 0.645],
      [0.985, 0.510, zs * 0.678],
      [0.950, 0.635, zs * 0.699],
      [0.912, 0.765, zs * 0.707],
      [0.882, 0.870, zs * 0.710],
    ];
    drops.add(conduit(front, 0.005, M.plasticLt, { pitch: 0.018, amp: 0.13, radial: 6 }));
    drops.add(aim(connector(0.024, 0.020, 0.028, 0.005, M.plasticLt),
      [0.9018, 0.8959, zs * 0.710], [0.60, 0.80, 0]));
    drops.add(aim(wrap(0.005, 0.012, M.plastic), [0.912, 0.765, zs * 0.707], [-0.274, 0.961, 0.027]));
  }
  /* Passenger side: into the V2G electronics box.

     BOTH REAR DROPS CLIMB OVER THE AIR SPRING RATHER THAN THROUGH IT. The
     rear air spring is a body of revolution reaching y 0.4770 over x -1.502
     to -1.392 and |z| 0.545 to 0.655 on suspension-4, and the same volume
     on suspension-9. A drop that was at y 0.448 at x -1.370 arrived at
     y 0.470 by x -1.399 and ran 5.1 mm inside it on this side and 2.5 mm on
     the other, measured as vertex depth against the built suspension mesh.
     Both drops now leave the corner box climbing, so they are above the
     spring's crown before they reach its leading edge. */
  const rearP = [
    [-1.242, 0.398, 0.615],
    [-1.292, 0.410, 0.612],
    [-1.360, 0.470, 0.598],
    [-1.450, 0.525, 0.580],
    [-1.530, 0.575, 0.558],
    [-1.572, 0.606, 0.545],
  ];
  drops.add(conduit(rearP, 0.005, M.plasticLt, { pitch: 0.018, amp: 0.13, radial: 6 }));
  const rpIn = crossing(rearP, 'x', -1.550, -1);
  if (rpIn) drops.add(aim(gland(0.005, M.castAlu), rpIn.at, [-rpIn.dir[0], -rpIn.dir[1], -rpIn.dir[2]]));
  /* driver side: clipped and plugged onto the body rear casting */
  const rearD = [
    [-1.242, 0.398, -0.615],
    [-1.292, 0.410, -0.611],
    [-1.358, 0.474, -0.586],
    [-1.462, 0.534, -0.538],
    [-1.556, 0.598, -0.492],
    [-1.634, 0.662, -0.4525],
    [-1.672, 0.694, -0.4425],
  ];
  drops.add(conduit(rearD, 0.005, M.plasticLt, { pitch: 0.018, amp: 0.13, radial: 6 }));
  /* The clip sits on a control point, so it is on the cable rather than
     near it, and its foot reaches |z| 0.4612 against a casting face at
     0.460: 1.2 mm of bite, which is what a bolted clip has. */
  drops.add(place(pclip(0.0058, 0.0072, M.plastic), [-1.634, 0.662, -0.4525],
    [-0.717, 0.623, 0.314], [0, 0, -1]));
  drops.add(aim(connector(0.022, 0.020, 0.026, 0.005, M.plasticLt),
    [-1.6905, 0.7095, -0.4360], [-0.717, 0.623, 0.314]));
  sys.add(drops);

  return sys;
}
