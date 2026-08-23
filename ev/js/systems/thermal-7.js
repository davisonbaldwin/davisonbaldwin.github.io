/* Thermal, Gen 7 range. The generation optimizes miles, and this slot owns
   the one term the ladder has never attacked: auxiliary load, about 20 Wh/mi
   since Gen 1 (design/gen7.md lever 4). On a 1,809 mile run at 105 km/h that
   is 27.7 hours of constant draw, and thermal owns roughly a quarter of it.

   Ancestors: thermal.js (Gen 1, 62 kg, octovalve and R1234yf scroll) and
   thermal-6 (Gen 5 apex, 58 kg, two-phase immersion for battery-6's 25 kW
   charge plateau). The slot skipped Gen 6, correctly: a form generation has
   nothing to say about a heat pump. It did redraw the surface above this
   module's stack, and that is checked here rather than assumed.

   The three moves, and what each is worth on the reference run:
   1. Deliver at 35 C instead of 55. Condensing falls from 60 to 40 C, so the
      lift falls, so COP goes 2.9 to 4.2 at 4 C ambient.
   2. Condition the occupants, not the cabin volume. Air setpoint 21 to 16 C
      in winter and 24 to 27 in summer, with the difference delivered by
      contact and radiation into interior-6's seats and footwells.
   3. Give the ventilation air its heat back. 90 m3/h of fresh air is 513 W
      at 4 C; a counterflow membrane core returns 78 percent of it.
   Thermal's own share of aux: 352 W to 135 W, which is 5.40 to 2.06 Wh/mi,
   about 57 miles on the mild reference sweep, 83 on a 4 C night, 193 at
   -10 C. The arithmetic is on the parts.

   Where the 217 W comes from, applied in order to the 297 W of cabin
   electrical the thermal-6 architecture would draw on this car. The terms
   are order dependent and do not sum in isolation:
     1. Ventilation recovery                          78 W   about 20 miles
     2. Ceiling-gap damper shut below 10 C             9 W   about  2 miles
     3. Occupant-local setpoint shift                 54 W   about 14 miles
     4. COP 2.9 to 4.2 plus the smaller blower        64 W   about 17 miles
     5. Pumps: three small ones for thermal-6's two   12 W   about  3 miles
   Plus 2 miles from the 6 kg the ledger sheds, and that term is derived
   rather than asserted. battery-7 runs the feedback for this generation:
   at wheels-7's Crr 0.0038 a kilogram costs Crr x g x 1,609 m per mile,
   which is 60.0 J or 0.0167 Wh per kg per mile at steady cruise. Six
   kilograms is 0.100 Wh/mi, so 190 kWh goes 190,000 / 104.90 = 1,811 miles
   against 190,000 / 105 = 1,809, a gain of 1.7 which rounds to 2. Stated
   per unit that is 0.29 miles a kilogram, the same coefficient battery-7
   published, and every mass claim on these panels uses it. Note what the
   ordering says: the seductive item, conditioning people instead of air, is the
   third largest. The dull one, giving the ventilation air its heat back,
   is the biggest. This generation is prone to overclaiming and the ledger
   is the place to refuse.

   Reference condition, stated once and used everywhere: 105 km/h (65.2 mph),
   two occupants, 190 kWh usable at 105 Wh/mi, so 1,809 miles in 27.7 hours,
   with the ambient sweeping 4 C for 9 h, 14 C for 11 h and 26 C plus sun for
   7.7 h. A record attempt cannot pick one ambient and stay in it.

   Cabin envelope, derived from partner geometry rather than prose:
   - Glazing 2.58 m2. interior-6's canopy-liner audits body-6's canopy at
     3.4 m2; body-7's canopy spec row states 24 percent less area.
   - Floor 4.35 m2 at U 0.8, because battery-6's lid is carbon over aramid
     honeycomb and its own panel states skin-to-skin conductance two orders
     below the aluminum panel it replaced.
   - Other opaque 4.45 m2 at U 3.0, glass at U 5.0 swept / 3.2 still.
   - UA 29.7 W/K with interior-6's ceiling gap ventilated, 25.1 W/K with the
     rail-duct dampers shut. The glass is 43 percent of the conductance on 23
     percent of the area.
   - Ventilation 90 m3/h (0.030 kg/s), which already carries the 25 percent
     tax for a return grille under the dash. Infiltration 30 m3/h.
   - Internal gains 270 W: 2 x 75 W of occupant sensible plus 120 W of
     autonomy-4's stated 380 W continuous compute draw reaching the cabin.

   Gen 7 preset partners, reconciled against build geometry where it exists:
   - body-7 (built): loft stations read directly. Its hood over the front
     zone runs y 0.849 at (x 2.14, |z| 0.40) and y 0.837 at (2.17, 0.40).
     thermal-6's condenser inlet header topped out at y 0.770 and body-7 had
     to draw a 43 degree hood leading edge to clear it. The tallest thing
     this module leaves in that stack is the refrigerant distributor at
     y 0.528, and the tightest hood clearance anywhere over the stack is
     311 mm, at (2.207, |z| 0.350) where the nose has already started down.
     So the interference is deleted rather than cleared. Both cores take
     horizontal headers that stop at |z| 0.35 or
     0.40, so nothing reaches the crash rails at |z| 0.375..0.465 either.
     The core plane also moves aft to x 2.168, ending the 7.5 mm overlap
     between thermal-6's core and body-7's bumper beam at x 2.210.
   - body-7 front megacasting, abox(0.31, 0.28, 0.68) at (1.915, 0.44, 0),
     so x 1.760..2.070, y 0.300..0.580, |z| <= 0.340, plus side blocks at
     0.355 <= |z| <= 0.595 and rib banks at y 0.577..0.623. Coordinates are
     body.js's, carried unchanged for seven generations. thermal.js put its
     octovalve at (1.86, 0.50, -0.02) and thermal-6 put its valve block at
     (1.87, 0.49, -0.02); both sit inside that casting. This module puts
     nothing inside it. See the glycol circuit panel.
   - body-7 intake gates: four slats spanning y 0.19 to 0.384 at |z| <= 0.40.
     The stack is drawn to that band, y 0.255 to 0.520, so the plenum spreads
     the flow 116 mm instead of turning it up 356 mm as it did for thermal-6.
   - body-7 wheel-well louvers: outlet bank at x 1.100..1.286, y 0.45..0.55 on the
     fairing band. The ventilation exhaust discharges into that same low
     pressure cavity, so the extract is assisted rather than resisted.
   - interior-6 (built): seat tracks land on battery-6's lid rails at y 0.308,
     |z| 0.28 and 0.52, so the seat manifolds sit at |z| 0.40 between them.
     Its seats already carry heater mats and 12 W ventilation fans on their
     own 22 kg ledger; this module carries the loop, not the mats. Its
     canopy-liner takes 596 W of downward radiation to 35 with a low-e
     ceiling and sweeps the gap with 40 m3/h a side of dash-plenum air, and
     the damper on that takeoff is this module's.
   - autonomy-4 (built): compute cold plate x -0.795..-0.322, y 0.395..0.463,
     stubs at (-0.795, 0.42, -+0.05). Landed.
   - hv-4 (built): converter stubs (-1.43, 0.40, 0.247) and (-1.31, 0.40,
     0.247), thermal HV spur ending at (1.70, 0.55, 0.42). Both landed.
     FINDING, reported not edited: that spur end and its last 180 mm sit
     inside body-7's front casting side block AND inside the crash rail's
     rear bulkhead plate (x 1.700..1.720, y 0.475..0.625, |z| 0.345..0.495).
     The pigtail here lands on the declared point and leaves as fast as the
     rib gaps allow; roughly 6 cm3 of tube stays inside body-7 structure.
     Both partners are already built, so neither can fix it alone.
   - suspension-4 (built): air supply x 1.820..1.980, y 0.252..0.390. All
     hardware here is above y 0.63 or forward of x 2.07.
   - battery-7 landed mid-build and this module was reconciled against its
     build code, which changed three things and left one open:
     (a) Vapor stub unchanged at (1.272, 0.268, -0.10). The riser flange here
         spans x 1.296..1.308 against that stub's face at 1.297. Held.
     (b) Liquid feed stub MOVED DOWN 29 mm to (1.272, 0.118, 0.10) because
         the pack floor dropped. battery-7 reports the joint standing open
         and says thermal-7 owns the move. Moved: the condensate return and
         its flange now land at y 0.118. The move is 29 mm and not the 32
         this module first wrote down, because battery-6's PROSE names its
         liquid stub y 0.150 and its BUILD CODE puts it at 0.147. battery-7
         caught that and measured; this module had read the prose. Same
         failure as (c) below, in a smaller place.
     (c) Design heat load is 15 kW, not the 7.3 this module first derived
         from current-squared scaling. battery-7's limit is not ohmic, it is
         confined-channel critical heat flux in a 1.1 mm boiling gap. The
         riser goes 26 to 34 mm and the return 10 to 13 to suit. The panel
         says plainly what the first derivation got wrong.
     (d) OPEN, reported not resolved: battery-7 declares about 12 L and 19 kg
         of fluoroketone on THIS ledger. With the larger transport that makes
         the pack loop 22 kg and this module 63 kg against a binding 52. The
         integrator has to choose between a shallower pool, a fluid ledger
         that sits on battery-7, or a higher mass target. This module holds
         52 kg and says where the missing 11 kg is.
   - drivetrain-7 was NOT drawn when this module was built, so the drive-loop
     landing was declared on the P.driveF zone face at x 1.75, a binding hard
     point from design/gen4.md rather than a partner coordinate. It has since
     landed, and this section is the reconciliation against its build code.
     RESOLVED: it KEEPS a front unit, 130 kW behind two dog clutches, so the
     contingency on the glycol panel (that a rear-driven range car might
     delete the front axle and take this spur with it) is dead. The flange
     pair and its 0.6 kg stay.
     OPEN, reported not edited: the two sides do not meet. drivetrain-7's
     oil-to-coolant plate carries water stubs at (1.42, 0.270, -0.105) and
     (1.42, 0.270, -0.055), 50 mm apart, free ends pointing aft at x 1.395.
     This module's flanges are at (1.75, 0.50, -0.10) and (1.75, 0.50, -0.20),
     100 mm apart. That is 355 mm of x, 230 mm of y and a different pitch.
     This module cannot close it alone, and the reason is a third partner:
     drivetrain-7's stub ends are themselves 5 mm inside suspension-4's front
     subframe crossmember (x 1.320..1.400, y 0.215..0.285, |z| <= 0.550), and
     the direct route back at y 0.270 is blocked by the second crossmember at
     x 1.660..1.740 over the same y band and by suspension-4's ARB decoupler
     tube at x 1.665..1.735, y 0.269..0.341, |z| <= 0.110. Running hose to
     those stubs means drivetrain-7 moves them or suspension-4 gets edited,
     and neither is this module's to do. The integrator picks; the flange
     pair holds the declared plane until then.

   Zones held: front stack x [2.08, 2.26] (P.thermalFront) and firewall HVAC
   x [0.78, 1.00], both unchanged since thermal.js. Loop hardware sits above
   the front casting in the frunk bay, which is a departure and costs the
   frunk; the panels say so.

   Mass ledger, binding +-2 kg: 10 + 10 + 7 + 4 + 6 + 11 + 4 = 52 kg, of
   which 8.9 kg is fluoroketone standing in battery-7's pool. See item (d)
   above: battery-7 asks for 19 kg of fluid there, and the difference is
   declared rather than absorbed. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'thermal-7',
  name: 'Thermal · Gen 7 range',
  color: 0x58d6a6,
  explode: [1.5, 0.35, 0],
  blurb: 'Auxiliary load is the term this ladder never attacked: about 20 Wh/mi since Gen 1, and on a 27.7 hour record run it is 1.3 kW of constant draw. Three moves take thermal\'s share of it from 5.40 to 2.06 Wh/mi. A heat pump that delivers 35 °C instead of 55 and therefore runs at COP 4.2 instead of 2.9. Conditioning aimed at the occupants rather than at the cabin volume. Ventilation air that hands 78 percent of its heat to the air leaving. Worth about 57 miles on the reference sweep, 83 on a 4 °C night, 193 at -10 °C. The comfort equivalence the whole claim rests on is asserted rather than measured, and the part that rests on it says so in its Maturity row.',
  parts: {
    'outdoor-coil': {
      name: 'Outdoor coil and fan bank',
      tagline: 'It got deeper instead of taller, because body-7 had to draw a 43 degree hood leading edge over where thermal-6 put its header and the pack stopped needing the height.',
      mass: 10,
      specs: [
        ['Rows', 'Glycol y 0.285 to 0.400, refrigerant y 0.427 to 0.497, one frame'],
        ['Face', '0.091 and 0.055 m², both 70 mm deep, 1.2 mm louvered fin pitch'],
        ['Duty', '6 kW glycol parked at 40 °C, 9 kW below 25 °C, 12 kW on 100 km/h ram'],
        ['Approach', '6 K in heat-pump mode at 1 to 3 kW, where thermal-6 ran 11'],
        ['Fans', '2 x 230 mm brushless, 2,600 m³/h combined, 320 W each parked'],
        ['Maturity', 'Production practice'],
      ],
      how: 'A heat pump is only as good as the temperature it can find outside, and what stands between the refrigerant and the ambient air is this coil\'s approach temperature. Every kelvin of approach is a kelvin the compressor has to lift that nature was offering free, worth about 3 percent of COP each on the reference night. thermal-6 ran an 11 K approach because its condenser was sized for a 25 kW condensing duty on a 40 °C afternoon and nothing else mattered. The refrigerant row here carries 1 to 3 kW and is sized for approach rather than for capacity: 70 mm of depth, a 1.2 mm louvered fin pitch and a face velocity near 2.5 m/s where thermal-6 ran 6, which buys 6 K. Under this project\'s premise a heat exchanger is allowed to be extravagant, and extravagance in a coil means slow air over a great deal of surface.\n\nThe shape is not a free choice, and every reason is a partner. body-7\'s intake gates admit air through four slats spanning y 0.19 to 0.384 at |z| up to 0.40, which is the whole aperture this car has. Its hood over the front zone runs y 0.849 at (x 2.14, |z| 0.40). Its bumper beam occupies x 2.210 to 2.270, which thermal-6\'s core overlapped by 7.5 mm and body-7 recorded as a carried condition. thermal-6 stacked its condenser at y 0.44 to 0.74 to win the gravity head its thermosiphon needed, which put its inlet header at y 0.770 and forced body-7 to draw a 43 degree hood leading edge over it, a pedestrian-zone bill body-7 lists on its own skin panel. None of that is needed now, because the pack condenses into the glycol row rather than into air. Both rows drop into the band the gates actually feed, the core plane moves aft to x 2.168 so the beam overlap goes away, and the tallest thing this module leaves in the front stack is the refrigerant distributor at y 0.528, which clears the hood by 311 mm at the tightest station over the stack. The plenum spreads the gate flow 116 mm instead of turning it up 356, and thermal-6\'s two turning vanes go with it.',
      why: 'This coil is the module\'s COP part, and COP is the module\'s whole claim on miles. Everything else in the heat pump argument is a compressor doing less work, and the way to make a compressor do less work is to hand it a smaller temperature gap at both ends. The delivery side gives 20 K back by dropping from 55 to 35 °C. The source side gives 5 K back by spending depth and fan area on approach. Between them the lift falls from 63 K to 43 K on the reference night, and that ratio is most of the 2.9 to 4.2. The COP term is worth 64 W with the smaller blower, about 17 miles, and roughly a quarter of it is this coil. Frontal area is the scarce resource in this nose and the aperture belongs to body-7, so the only direction left to grow was depth, which is exactly the direction a low-velocity coil wants.',
      fail: [
        'A heat pump outdoor coil evaporating below 0 °C in moist air frosts, and no amount of face area prevents it. The defrost pass is a glycol circuit brazed into the refrigerant fin block and fed from the electronics loop, so a defrost cycle spends drivetrain and compute waste heat rather than stealing cabin heat, but it still costs air-side capacity while it runs and the range estimate carries the interruption rather than hiding it. On a wet 2 °C night the honest figure is roughly 4 percent of heating output lost to defrost.',
        'The parked fast-charge case is aperture limited and the aperture is not this module\'s to change. body-7\'s gate bank is 0.80 m by 0.194 m, so 0.155 m² of opening, and pulling 2,600 m³/h through it costs 640 W of fan and still only carries about 6 kW at 40 °C. That is what sets the pack loop\'s charge ceiling on hot asphalt, and the number is on that panel rather than hidden here.',
        'The two rows share one aperture and one fan bank, so they compete on the one hour they both peak: a 40 °C fast charge with the cabin cooling. The controller resolves it by letting the glycol row float warmer, which raises the pack\'s saturation temperature a few kelvin, and that is booked against battery-7\'s aging budget rather than reported as a fault.',
      ],
      explode: [0.55, -0.10, 0],
    },
    'heat-pump': {
      name: 'Low-lift heat pump',
      tagline: 'A heat pump\'s efficiency is set by how far it has to lift, so this one stops lifting to 55 °C and lifts to 35 instead. That single change is most of the auxiliary saving, and it is why the delivery had to be redesigned first.',
      mass: 10,
      specs: [
        ['Machine', 'Economized two-stage scroll with vapor injection, 900 to 9,000 rpm'],
        ['Refrigerant', 'R290 propane, 140 g, in one sealed and vented nose module'],
        ['Heating COP', '4.2 at 4 °C, 2.7 at -10 °C (thermal-6: 2.9 and 1.8)'],
        ['Cooling COP', '5.3 on the 16 °C branch, 3.3 on the 4 °C dehumidify branch'],
        ['Delivery', '35 °C water, condensing at 40; thermal-6 condensed at 60'],
        ['Maturity', 'Pilot line; the 58 percent Carnot fraction is extrapolated'],
      ],
      how: 'The arithmetic is worth writing out because it is the whole generation in four numbers. thermal-6 fed a heater core with 55 °C glycol, so it condensed at 60 °C, and on a 4 °C night with a good coil it evaporated at -3: Carnot COP is 333 / (333 - 270) = 5.29, and a real R1234yf scroll returns about 55 percent of that, which is 2.9, exactly the figure Gen 1 published and Gen 5 carried. This machine condenses at 40 °C because nothing downstream asks for more than 35, so Carnot is 313 / (313 - 270) = 7.28, and at 58 percent that is 4.2. Two thirds of the gain is the lift and one third is the machine. The machine part is a two-stage scroll with an economizer: a fraction of the liquid is flashed at an intermediate pressure and injected into the compression pocket, which subcools the main stream, restores volumetric capacity at high pressure ratio and drops discharge temperature. That is what holds 2.7 at -10 °C where thermal-6 managed 1.8, and it is the reason this module does not repeat Gen 1\'s admission that below -20 °C the pump becomes an expensive resistive heater. It still degrades. It degrades from a much better place.\n\nThe fluid is propane, and the choice is honest about what it costs. R290 has a volumetric capacity and a low-temperature vapor density that R1234yf simply does not, which is most of the remaining COP, and it is the fluid every serious low-ambient heat pump in the building industry has moved to. It is also an A3 flammable, so the entire charge is 140 g, it lives in one sealed module bolted above body-7\'s front casting with a drained and vented enclosure, and no refrigerant crosses the firewall in either direction. That last constraint is not a compromise imposed on the design, it is the design: because the cabin is reached by water rather than by refrigerant, the machine is free to choose a fluid that would be unacceptable inside a cabin, and because the water only has to reach 35 °C, the machine gets its COP. The comfort argument and the safety argument and the efficiency argument all point at the same secondary loop. A hydrocarbon sensor sits at the enclosure low point with a purge fan and an overboard drain, on hv-4\'s 48 V zonal bus, and the enclosure is the reason this module took the frunk. One finding came out of wiring it. hv-4\'s thermal HV spur ends at (1.70, 0.55, 0.42), and its last 180 mm run through x 1.52 to 1.70 at y 0.51 to 0.55, which is inside body-7\'s front casting side block at x 1.55 to 2.06, y 0.30 to 0.58, |z| 0.355 to 0.595. Its terminal point also sits on the crash rail\'s rear bulkhead plate at x 1.700 to 1.720, y 0.475 to 0.625, |z| 0.345 to 0.495. Neither module can fix that from its own side, so this pigtail lands on the declared coordinate, climbs at once, and threads the 51 mm gap between the casting rib blades at |z| 0.387 to 0.438; about 6 cm3 of it is still inside body-7\'s carried structure within 20 mm of the landing. The finding is reported rather than edited around, and the choice is between moving hv-4\'s spur end or coring a duct through the casting and the rail plate.',
      why: 'gen7.md ranks auxiliary fourth among the levers and it is right to, but fourth of five on a 1,800 mile run is still 27.7 hours of a kilowatt. The reason this term never moved through six generations is that every previous module treated the heat pump as a fixed-efficiency device and tried to reduce the load it served. That is backward. COP is not a property of a compressor, it is a property of the two temperatures it works between, and both of those are design variables that live in other parts: the coil sets the cold end, and occupant-local delivery sets the hot end. This part is where the two decisions cash out, and it is the only place in the car where a 20 K change in a setpoint is worth 45 percent more heat per joule.',
      fail: [
        'A 140 g propane charge forward of the firewall is the extrapolated safety claim, stated plainly. Sealed hydrocarbon systems of this size are production practice in domestic heat pumps and in commercial refrigeration; none of them are crashed at 56 km/h into an offset barrier. What has to become true is a crash and post-crash leak dataset for a hydrocarbon charge in a front module, plus evidence that the vented enclosure clears a full-charge release below the lower flammable limit in a closed garage. Until that exists the honest label is pilot line and the fallback is a smaller R1234yf charge at roughly 0.4 lower COP.',
        'The 58 percent Carnot fraction is the number the whole saving leans on and it is at the top of what any real machine has demonstrated. It assumes a variable-speed compressor spending most of its life at 20 to 40 percent load, where scroll isentropic efficiency is at its best, and it assumes the coil delivers its 6 K approach in service rather than on a rig. A machine that returns 50 percent instead of 58 gives back about a third of the cabin saving, which is roughly 19 miles.',
        'Everything now depends on one compressor: cabin heat, cabin cooling, pack preconditioning and the chilled branch that makes occupant-local cooling work. thermal-6 could at least fall back on a boiling pack that needed no compressor at all. Here a dead compressor means a cabin at ambient and a pack that cannot be preconditioned, and the honest statement is that the car keeps driving and stops being comfortable, which on a 27 hour run is not a small thing.',
      ],
      explode: [0.20, 0.50, 0.35],
    },
    'air-handler': {
      name: 'Cabin air handler',
      tagline: 'The air side stops being the heater and becomes what it should always have been: ventilation, defog, and one damper that decides whether interior-6\'s ceiling gap insulates or breathes.',
      mass: 7,
      specs: [
        ['Blower', '330 mm wheel, 44 W at the 210 m³/h cruise point (thermal-6: 90 W at 300)'],
        ['Coils', '4 °C dehumidify coil and 35 °C heating coil, blended by flap'],
        ['Air setpoint', '16 °C in winter, 27 in summer; comfort is delivered locally'],
        ['Ceiling damper', 'interior-6\'s gap shut below 10 °C: UA 29.7 to 25.1 W/K'],
        ['Filtration', 'Activated carbon plus HEPA class, carried from thermal-6'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The architecture is thermal.js\'s and it was right three generations ago: blower, then a cold coil in every season so the air is dried below its dew point, then a blend flap metering how much of the stream crosses a liquid heating coil. What changed is how much work the air is asked to do. When the cabin is held at 16 °C rather than 21 and the occupants are warmed by contact, the air stream is no longer the heating system, it is ventilation and defog, so the flow falls from 300 to 210 m³/h. Blower power goes roughly with the cube of flow at a fixed system, which alone would take 90 W to 31, and the wheel then grows from 200 to 330 mm and turns slower for the same duty, which is the classic trade of volume for watts that a car normally cannot make and this one can. The recovery core adds 30 Pa a side and gives 12 W of that back, so the cruise number is 44 W. On a 27.7 hour run those 46 saved watts are 0.7 Wh/mi, and they sit inside the 64 W this box and the compressor return together, about 17 miles.\n\nThe damper is the simplest thing in this module, two flaps and a schedule, and close to the most useful. interior-6\'s canopy liner solves a real problem that body-7 creates, an electrochromic canopy that absorbs rather than rejects and then radiates 596 W downward onto people\'s heads, and it solves it with a low-emissivity ceiling swept by 40 m³/h a side of air taken from this plenum. Sweeping the gap is exactly right in July and exactly wrong in January, because a ventilated cavity cannot insulate: with the gap breathing, the 2.58 m² of canopy runs at U 5.0 and contributes 12.9 of the cabin\'s 29.7 W/K, which is 43 percent of the conductance on 23 percent of the area. Shutting the takeoff below 10 °C ambient turns the 58 mm gap into a still-air layer at U 3.2 and takes UA to 25.1, worth 74 W of load at the reference night for two damper flaps and a schedule, which across the whole sweep is 9 W of electrical and about 2 miles. The schedule has to watch solar as well as ambient, because a cold bright morning can hot-soak a shut cavity, and that is the one place this decision can be got wrong.',
      why: 'Every generation of this slot has stated the same sentence, that comfort per watt rather than watts is the metric, and every generation has then spent its watts heating air anyway because the air side was where the hardware lived. The honest way to act on that sentence is to demote the air handler, and demoting it is what makes the number move: a smaller flow, a lower supply temperature, a bigger slower wheel, and a heating coil that never has to reach 55 °C so the compressor upstream never has to lift that far. What survives here is what only air can do, which is carry moisture out of the cabin and off the glass. Nothing else in this box is trying to be warm.',
      fail: [
        'Defog authority is the floor under every number on this panel. A 16 °C cabin holds less moisture but its glass also runs colder, so the dew point margin is not obviously better, and the blower cannot go below about 180 m³/h with the dehumidify coil live without losing the windshield. That is why the 4 °C branch survives into a system whose whole argument is that it stopped lifting far, and it is the one duty that still runs the compressor at a bad COP.',
        'The ceiling damper is a new failure mode with no obvious symptom: stuck open costs 74 W on a winter night, which reads as slightly worse range and nothing else, and stuck shut on a bright spring day lets the liner run warm and gives an occupant a hot scalp with a cabin thermostat that says everything is fine. Position is sensed rather than inferred for exactly that reason.',
        'Biofilm on a permanently damp coil is the classic HVAC smell, carried unchanged from thermal.js with the same afterblow drying cycle and the same admission that owners who disable it will find out why it existed.',
      ],
      explode: [-0.32, 0.45, 0],
    },
    'recovery-core': {
      name: 'Ventilation recovery core',
      tagline: 'Ninety cubic meters an hour of fresh air is 513 watts thrown out of the window at 4 °C, and in seven generations nobody has asked for any of it back.',
      mass: 4,
      specs: [
        ['Core', 'Counterflow membrane, 0.9 m² folded into a 170 mm cube'],
        ['Effectiveness', '78 percent sensible, 65 percent latent at 90 m³/h'],
        ['Winter', '513 W of ventilation load at 4 °C becomes 80 W'],
        ['Summer', '198 W of ventilation latent load becomes 69 W'],
        ['Bill', 'Passenger toe box loses 170 mm; exhaust pierces body-7\'s fairing wall'],
        ['Maturity', 'Pilot line in a vehicle, production practice in buildings'],
      ],
      how: 'Fresh air is not optional on a 27.7 hour drive. Two people in a sealed 3 m³ cabin put CO2 past 2,000 ppm within about twenty minutes on full recirculation, and the humidity they add fogs the glass long before that, so the car runs 90 m³/h of outside air. With a return grille under the dash rather than a dedicated extract at the rear, some supply short-circuits back before it reaches anyone, so the ventilation effectiveness is about 0.8 and the 90 already carries that 25 percent tax. At the reference night that stream is 0.030 kg/s crossing 17 K, which is 513 W, and every previous generation of this car simply heated it and threw it away. The core is a counterflow stack of vapor-permeable membrane, 0.9 m² folded into a 170 mm cube, with the incoming and outgoing streams in adjacent channels running in opposite directions. Counterflow is what allows an effectiveness above one half: each increment of supply air meets exhaust air that is still warmer than it is, all the way along, so the approach stays small over the whole path instead of collapsing as it would in crossflow. At 90 m³/h the stack returns 78 percent of the sensible and 65 percent of the latent, which takes the winter ventilation load from 513 W to 80 and the summer latent load from 198 W to 69.\n\nWhere the exhaust goes is the part that had to be checked against body-7 rather than assumed. Cabin air leaves the core at 170 mm behind the firewall and has to get out of the car, and the useful place to put it is somewhere already at negative pressure. body-7\'s front wheel wells are fully enclosed by its fairings and vented by an outlet louver bank at x 1.100 to 1.286, y 0.45 to 0.55, sitting on the pod band where the local pressure coefficient is negative at speed. The exhaust duct therefore runs outboard and pierces the fairing inner wall, which body-7 draws at |z| 0.693 to 0.707 between x 1.050 and 1.850, and discharges at (1.058, 0.490, 0.80) just aft of that bank, into the same cavity and the same suction. The extract is assisted rather than resisted, which is worth about 15 Pa of blower budget, and the penetration is a hole in a partner\'s panel that this module owns and states rather than discovers at first build. The bill is real and it is in the passenger footwell: the core takes 170 mm of toe depth on that side, so the passenger sits with less foot room than the driver, and on a car whose interior module already asks everyone to recline 20 degrees further, that is a genuine imposition and not a rounding error.',
      why: 'This is the largest single line in the auxiliary ledger and it exists because the metric changed. A ventilation heat exchanger is worthless on a 30 minute commute, where the cabin is in transient the whole time and the mass of the core is a liability. On a 27.7 hour steady-state run it is the only device in the car that attacks a load nothing else can touch, because ventilation is not a leak to be sealed and not an inefficiency to be engineered out. It is a requirement, and the only thing you can do with a requirement is recover it. Applied first to the thermal-6 baseline it takes cabin electrical from 297 W to 219, which is 78 W, 1.20 Wh/mi and about 20 miles: the largest single line in this module and the least glamorous. Buildings worked this out forty years ago and cars have never needed to.',
      fail: [
        'The membrane is a consumable dressed as a component. A cabin air stream carries road dust, brake and tire particulate and pollen, and the supply side is filtered but the exhaust side is not, so the core fouls from the inside on a schedule nobody can see. What has to become true for the pilot line label to fall away is 15 years of membrane life at vehicle duty, plus a differential-pressure trend good enough to call the service before effectiveness has quietly halved.',
        'A fouled or frozen core must never be able to block ventilation, so there is a motorized bypass around it and the failure position is bypassed. That is the right choice and it means the 78 percent is an availability number as much as a physics number: any fault anywhere in the core takes the car straight back to thermal-6 behavior with no warning other than a range estimate that moves.',
        'Below about -5 °C the exhaust stream can condense and freeze in the core, which is the classic building failure and is worse in a car because the cabin is a moisture source with no dehumidifier upstream. The answer here is a preheat off the 35 °C loop rather than a defrost cycle, and it costs roughly a fifth of the recovery back at the coldest end of the range, which the -10 °C figures on the other panels already carry.',
      ],
      explode: [-0.15, 0.10, 0.45],
    },
    'local-circuits': {
      name: 'Occupant-local delivery',
      tagline: 'A heat pump lifting to 35 °C is worth 4.2, and 35 °C is exactly the temperature a seat wants. The comfort argument and the efficiency argument turn out to be the same argument.',
      mass: 6,
      specs: [
        ['Loop', '35 °C heating and 16 °C chilled, one 10 W pump, 2.4 L'],
        ['Delivered to', 'interior-6 seat and headrest mats, two footwell radiant panels'],
        ['Ledger', 'The mats and their 12 W fans are on interior-6\'s 22 kg seat, not here'],
        ['Setpoint shift', 'Cabin air 21 to 16 °C in winter, 24 to 27 in summer'],
        ['Rear row', 'Bench gets mats only, no radiant panel: a full car is worse served'],
        ['Maturity', 'Extrapolated; the comfort equivalence is asserted, not measured'],
      ],
      how: 'A person is not warmed by air temperature, they are warmed by their own heat balance, and air is the least efficient of the four channels available. Radiation and conduction reach the body directly; convection has to raise the temperature of an entire cabin volume that is simultaneously leaking through 29.7 W/K of envelope. thermal.js already said the sentence, that 50 W of seat heat buys the comfort of several hundred watts of warmer cabin, and then went on heating air anyway. Acting on it means running the cabin at 16 °C in winter and 27 in summer and delivering the difference where the person is: interior-6\'s seat cushion, backrest and headrest mats fed with 35 °C water, two radiant panels under the toe boards at (1.03, 0.494, ±0.29), and a heated wheel rim on hv-4\'s 48 V bus for the one contact surface that cannot take a hose. The loop is 2.4 liters on a 10 W pump, and it summer-switches to the same distribution at 16 °C, which is where interior-6\'s 12 W of seat ventilation fans become genuinely powerful because they are now moving tempered air rather than cabin air.\n\nThe cost is written into the loop temperature, and it is the reason this part exists rather than being a footnote on the air handler. Contact heating wants a surface at 33 to 38 °C: warmer than that and it is uncomfortable against skin, cooler and it is not felt. A heating loop that only has to reach 35 °C lets the compressor condense at 40 instead of 60, which is the 2.9 to 4.2. A cooling loop that only has to reach 16 °C lets it evaporate at 12 instead of 2, which is the 3.3 to 5.3 on the sensible branch. Volume conditioning is what forces the extreme temperatures: to heat a whole cabin quickly through a small coil you need hot water, and to dehumidify you need genuinely cold refrigerant. Deliver locally and both extremes stop being necessary except for defog, which is why the 4 °C branch survives and is used for nothing else. The ledger note matters too: the mats and fans are already counted on interior-6\'s 22 kg seat, so this part carries the pump, the mixing valve, the manifolds at (0.30, 0.338, ±0.40) between that seat\'s own track rails, the rear pair at (-0.905, 0.337, ±0.47), the two radiant panels and the hose. Counting the mats here would be double counting and the six kilograms would be a lie.',
      why: 'This is where the generation\'s auxiliary claim actually lives, and it is also the claim with the weakest evidence, which is why both statements are on the same panel. Cabin conditioning on the reference sweep falls from 297 W to 92, and the honest split is not the flattering one: taken in order, this part is worth 54 W of that 205, about 0.83 Wh/mi and 14 miles, behind the ventilation recovery core at 78 W and the compressor and blower at 64. The idea that sounds cleverest is the third largest term. And a setpoint shift is a claim about people, not about physics: it says that 16 °C air with 200 W of contact and radiant delivery is worth the same to an occupant as 21 °C air, and there is no measurement behind that in this project. It is a plausible extrapolation from heated-seat studies and from radiant comfort work in buildings, and it is the single number a reviewer should attack first.',
      fail: [
        'Occupant-local comfort is posture-dependent in a way volume heating is not. Sitting still and belted, a 16 °C cabin with warm contact surfaces is genuinely comfortable. Lean forward off the backrest, reach into the back seat, take a hand off a heated rim, and you are in a 16 °C car with cold hands and a cold face. Nothing in this design fixes that, and on a long drive the moments when a person moves are exactly the moments they notice.',
        'The rear bench gets mats and no radiant panel, because there is no toe board back there to mount one on and interior-6\'s pan is already stepped over autonomy-4\'s compute. So a fully occupied car is worse served than the two-up record run every number on this panel is quoted against, and the honest statement is that the rear setpoint has to run 2 to 3 K warmer than the front, which gives back roughly a fifth of the saving whenever there are four people aboard.',
        'The whole scheme depends on knowing who is sitting where, which means it depends on interior-6\'s seat occupancy sensing and autonomy-4\'s driver monitor. A wrong occupancy call does not fail loudly, it delivers heat to an empty seat and leaves a person cold, and the recovery is a passenger reaching for a control on a car that was supposed to have worked it out.',
      ],
      explode: [0.05, -0.35, 0.25],
    },
    'pack-loop': {
      name: 'Pack gallery loop',
      tagline: 'battery-7 dissipates four watts at record cruise and fifteen kilowatts at its charge ceiling, so the loop that had to boil at 25 kW spends more than 99 percent of its life as a warm pumped liquid.',
      mass: 11,
      specs: [
        ['Design load', '15 kW at battery-7\'s 430 A ceiling; its own confined-channel limit'],
        ['At cruise', '4.0 W: 6.85 kW out of the pack is 8.6 A through 54 mΩ'],
        ['Transport', 'Riser 34 mm at 14.0 m/s (thermal-6: 48 mm); return 13 mm'],
        ['Pressure', 'No setpoint: sealed, floating 1.0 to 1.75 bar, 49 to 66 °C'],
        ['Head', 'Receiver at y 0.780 over battery-7\'s pool at 0.118: 10.4 kPa'],
        ['Maturity', 'Pilot line; the 19 kg fluid ledger is unresolved, see the fails'],
      ],
      how: 'This module first derived its design load rather than reading it, because battery-7 did not exist when the geometry was drawn, and the derivation is worth printing because it was wrong in an instructive way. battery-6 gave the one hard number in the chain: 630 A through a 63 m\u03a9 string dissipates 25.0 kW at its charge plateau, and 630\u00b2 x 0.063 confirms it. gen7.md cuts peak power from 480 kW to about 260, ohmic loss goes with the square of current, so the same string at the new ceiling would dissipate 7.3 kW. Every step of that is correct and the answer is half of the truth. battery-7 landed and reports 15 kW, because its limit is not ohmic at all. Its string resistance actually improved, 63 to 54 m\u03a9, but the geometry that bought the energy closed the inter-brick boiling gap from 1.5 mm to 1.1 against a C6 fluoroketone capillary length near 0.8. That is a confined channel: bubbles bridge the walls instead of departing, and critical heat flux falls to roughly 60 percent of the unconfined value. The pack is limited by how fast its coolant can leave, not by how much heat its resistance makes. Scaling a partner\u2019s number by the term you happen to know is exactly the cross-generation drift design/retro-gen4.md named, wearing a more respectable hat, and the correction is recorded here rather than quietly overwritten. The loop is sized on battery-7\u2019s 15 kW: 0.170 kg/s of vapor on 88 kJ/kg, 12.7 liters a second at 1.15 bar and 13.4 kg/m\u00b3, so a 34 mm riser runs 14.0 m/s where thermal-6 needed 48 mm at 11.6, and the liquid return is 13 mm. Its liquid feed stub also dropped to (1.272, 0.118, 0.10) when the pack floor did; battery-7 reported the joint standing open and said this module owns the move, so the condensate return and its flange landed at y 0.118 and the receiver gained head rather than losing it, 10.4 kPa over the new pool. That drop is 29 mm and this module first called it 32, because battery-6’s text names its liquid stub y 0.150 while its build code puts the stub at 0.147. Reading a partner’s prose where its geometry was available is the same mistake as the paragraph above, three millimeters wide instead of eight kilowatts, and it is on the panel for the same reason.\n\nThe other number is the one that governs the design. On the reference run the pack delivers 6.85 kW, which at 810 V is 8.6 A, and 8.6\u00b2 x 0.054 is 4.0 watts. A 190 kWh pack cruising at 0.036 C is not a cooling problem in any sense: its own dissipation is a rounding error against the 380 W autonomy-4 burns thinking, and at that current the cell resistance could double without costing a measurable joule, so the pack is allowed to float at ambient. The sizing case for pack conditioning on this car is not the road at all, it is a charging bay, and the loop spends more than 99 percent of its life doing almost nothing. That is where the simplification comes from. thermal-6 needed a dome regulator scheduling 1.0 to 1.9 bar against ambient because it was choosing the pack temperature; this loop does not choose. It is sealed with a fixed charge and one 0.4 L bellows, and the pressure floats wherever the condenser and the load put it, 1.0 bar and 49 \u00b0C on a mild day, 1.75 and 66 at the hot-parked limit. The regulator, the setpoint schedule, the second buffer vessel and the ambient map all go, and the condensate pump thermal-6 ran only on grades becomes the primary 8 W circulation pump that runs always. The pack rejects into the glycol circuit through a plate stack rather than into its own air-side condenser, which costs 10 K of extra approach against a load reduction worth about 12, so worst-case saturation lands near 66 \u00b0C against battery-6\u2019s 68. What the generation buys is not a much cooler pack. It is a pack that reaches that temperature during a 348 kW charge instead of a 542 kW one, on a loop with no pressure authority to get wrong.',
      why: 'thermal-6 was right to boil, and the reason it was right has gone away. Boiling is what you reach for when a large heat load appears in an envelope you cannot pump through and cannot service, and battery-6 at 480 kW was exactly that. A range car is the opposite machine. It buys its miles by never asking for peak power, and the first consequence of never asking for peak power is that the pack stops making heat. Carrying thermal-6\'s pressure schedule, its 15 kg charge and its 48 mm riser into a car that needs 29 percent of the duty would have been the ladder\'s heaviest piece of inherited ambition, and the honest generation move was to take it out. What this part does not do is return auxiliary miles. thermal-6\'s thermosiphon drew no pump power at cruise either, so the aux ledger is unchanged here and it would be dishonest to book any of the 57 miles against this panel. What it returns is mass: the pack path falls from thermal-6\'s 27 kg of condenser, pressure set and charge to 11 kg. At the 0.0167 Wh per kg per mile battery-7 derives from wheels-7\'s Crr 0.0038, 16 kg is 0.267 Wh/mi, so the run goes 190,000 / 104.73 = 1,814 miles against 1,809, which is 4.6 and rounds to 5. That is a gross figure and the module does not get to keep it: the recovery core, the deeper coil and 1.2 m of extra pipe spend 10 kg of it back, so the net ledger sheds 6 kg and books 2 miles. The 5 belongs on this panel because this is where the mass came out; the 2 is what the car actually gets.',
      fail: [
        'Simplifying the pack path is a capability loss and the numbers are worse than this module first thought. battery-7 rates itself at 430 A and 348 kW, and reaching that needs 15 kW of rejection, which this coil only delivers near 0 °C ambient. The binding term above that is body-7\'s intake aperture, 0.80 by 0.194 m: parked on 40 °C asphalt the glycol row rejects about 6 kW, which at the square-law relation supports 272 A and roughly 220 kW; 25 °C gives about 270 kW and 10 °C about 310. So the pack cannot reach its own ceiling on any warm day, thermal-6\'s car took 542 kW, and no amount of fan power buys it back because the hole in the nose is not this module\'s to enlarge.',
        'The fluid ledger does not close and this module will not pretend it does. battery-7 declares about 12 liters and 19 kg of fluoroketone standing in its pool, carried on this ledger; with the 34 mm riser and the larger return that makes the pack loop 22 kg and the module 63 against a binding 52. The 11 kg on this panel is the target, not the truth. Three ways out exist, a shallower pool, the fluid mass moving onto battery-7 where the pool physically is, or a mass target that admits what two-phase cooling costs, and choosing between them is an integration decision rather than a module one. Stating a number this module cannot reach would have been the easier and worse option.',
        'Letting the pack float at ambient on a range run is the right efficiency answer and it has a consequence at the end of the run: arriving at a charger with a 4 °C pack means preconditioning before any real current flows, because this chemistry still refuses fast charge below 15 °C and its lithium reserve is zero by definition. Preconditioning is cheaper than it was, roughly half, because a 30 °C target from a low-lift machine runs near COP 5.3, but it is not free and it is time as well as energy.',
      ],
      explode: [0.15, -0.25, -0.30],
    },
    'glycol-loop': {
      name: 'Glycol circuit',
      tagline: 'One loop, four ports, and the first thermal hardware in seven generations that is not sitting inside body.js\'s front megacasting.',
      mass: 4,
      specs: [
        ['Loop', '1 circuit, 1.8 L, one 20 W wet-rotor pump (thermal-6: 2 loops, 3.4 L)'],
        ['Valve block', '4 ports and 4 modes (thermal-6: 6 and 6; thermal.js: 8 and 14)'],
        ['Landings', 'autonomy-4 cold plate, hv-4 converter, the pack condenser'],
        ['Drive handover', 'Flanges at x 1.75, y 0.50, z -0.10 and -0.20; drivetrain-7 lands 355 mm off'],
        ['Casting clearance', 'Rail top y 0.740 on four legs to the casting top at 0.580'],
        ['Maturity', 'Production practice'],
      ],
      how: 'What is left for glycol keeps shrinking and this is the smallest it has been. autonomy-4\'s triplex compute at 380 W continuous, hv-4\'s converter, the pack condenser plate stack, and whatever drivetrain-7 puts in P.driveF: one circuit, 1.8 liters, one wet-rotor pump, four ports and four modes against thermal.js\'s fourteen. The drive landing is the honest part. drivetrain-7 had not been drawn when this module was built, and the two obvious moves were both wrong: naming drivetrain-6\'s front inverter stubs would be specifying against the wrong generation, which is precisely the drift failure design/retro-gen4.md named, and a capped stub going nowhere would be the dead end design/retro-gen5-apex.md rejected. So the loop terminates in a flanged pair on the P.driveF zone boundary at (1.75, 0.50, -0.10) and (1.75, 0.50, -0.20), a plane that comes from design/gen4.md\'s binding hard-points table rather than from any partner\'s drawing.\n\ndrivetrain-7 has since landed, and the reconciliation is worth printing because a declared plane is a promise and this one is not yet kept. It keeps a front unit, so the spur lives. Its oil-to-coolant plate presents water stubs at (1.42, 0.270, -0.105) and (1.42, 0.270, -0.055), free ends aft at x 1.395 and 50 mm apart; these flanges sit at x 1.75, y 0.50 and 100 mm apart. Nothing joins them. The gap is not laziness on either side, it is a third partner: those stub ends already sit 5 mm inside suspension-4\'s front subframe crossmember at x 1.320 to 1.400, y 0.215 to 0.285, and the straight run back at stub height is blocked twice more, by the second crossmember at x 1.660 to 1.740 across the same y band and by the ARB decoupler tube at x 1.665 to 1.735, y 0.269 to 0.341. A hose that reached those stubs would have to pass through Gen 4 structure that carries suspension loads. So this module holds the declared plane and states the shortfall in numbers rather than drawing a pipe through a subframe, and the close-out is one integration decision: drivetrain-7 raises its stubs onto the zone face, or the pair meets somewhere both can reach.\n\nThe other thing this part does is move, and the reason is a finding rather than a preference. body-7\'s front megacasting is drawn as abox(0.31, 0.28, 0.68) at (1.915, 0.44, 0), which is x 1.760 to 2.070, y 0.300 to 0.580, |z| up to 0.340, and body-7 states those coordinates are body.js\'s, carried unchanged. thermal.js put its octovalve at (1.86, 0.50, -0.02) and its pumps at (1.90, 0.40, ±0.14); thermal-6 put its valve block at (1.87, 0.49, -0.02) and its pumps at (1.90, 0.43, ±0.14). All of it is inside that casting, on every body variant, for six generations, and no reviewer caught it because both sides checked the P.thermalFront and P.driveF zone boxes and neither checked the structure between them. This module puts nothing there. The pump, the valve block, the pack condenser and receiver, the local-circuit pump and the heat-pump module all sit on a rail at y 0.740 bolted to the casting top face at y 0.580, threading the 51 mm gaps between the casting rib bank at y 0.577 to 0.623 and clearing hv-4\'s buffer pack, whose upper case tops out at y 0.712 at x 1.800 to 2.000. The bill is the frunk. body-7\'s tail cone panel calls this a two-trunk car, frunk and a shallow rear well; with this hardware above the casting, the honest count is one trunk and a dry locker.',
      why: 'A finding is worth more than a fix when the fix is easy, and this one was easy: the space above the casting was always there and nobody used it because the space inside the casting looked empty in a zone diagram. The lesson is the retro\'s, restated for structure rather than for prose. Zone boxes describe where a system may put things, not what is already occupying that volume, and a shared part whose coordinates never change is exactly the kind of thing every module stops checking. The reward for checking is not only clearance: the loop hardware is now serviceable from above with the hood open instead of from a pit, and the pack receiver gained 6 kPa of head it did not have to design for. In miles this part is modest and says so. Collapsing two circuits into one takes pump draw from 50 W to 38, which is 0.18 Wh/mi and about 3 miles.',
      fail: [
        'Consolidating to one loop puts autonomy-4\'s compute, hv-4\'s converter and the pack condenser on a single path, so one leak takes all three. Each has a thermal fallback and the loop is monitored by flow rather than by level, but the topology is a knowing concentration and it is worse than thermal-6\'s two-loop split, not better.',
        'The drive handover still does not close, and now it is a measured gap rather than an open question. This module guessed that a 260 kW rear-driven range car might delete the front axle and take this spur with it; drivetrain-7 kept a 130 kW front unit behind two dog clutches, so the flange pair and its 0.6 kg stay. What it did not do is come to the declared plane: its water stubs stop at (1.42, 0.270, -0.105) and (1.42, 0.270, -0.055) against flanges at x 1.75, y 0.50, which is 355 mm of x, 230 mm of y and a pitch of 50 mm against 100. Roughly 0.9 m of hose and about 0.4 kg belong to whichever module the integrator assigns them to, and this panel carries neither.',
        'Moving the hardware above the casting costs about 1.2 m of extra pipe run to reach the pack stubs and the firewall, which is most of the reason this module still weighs 52 kg after deleting a condenser, a pressure set and 6 kg of fluid. Packaging honesty is not free.',
      ],
      explode: [0.05, -0.45, -0.15],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   Front stack (P.thermalFront, x 2.08..2.26): two coil rows in one frame,
   glycol y 0.285..0.400 and refrigerant y 0.427..0.497, both matched to
   body-7's gate band at y 0.19..0.384. Core plane x 2.168, so the core spans
   2.133..2.203 and clears body-7's bumper beam at x 2.210, which thermal-6
   overlapped by 7.5 mm. Two fans behind at x 2.100. The tallest item in the
   stack is the refrigerant distributor at y 0.528; measured against body-7's
   loft the tightest clearance over the whole stack is 311 mm at (2.207,
   |z| 0.350), where body-7 had to clear thermal-6's header by 43.
   The frunk-bay hardware above the casting is the tight one, and it is
   tight because this module took the frunk: the pack purge pot tops out at
   y 0.875 and clears the hood by 36 mm at (1.989, z -0.258). Nothing in
   the nose touches the skin, but nothing else fits up there either, which
   is the packaging half of the bill the glycol panel states in words.

   Nose plumbing corridor: the fans sit at |z| 0.135..0.375, body-7's crash
   rails at |z| 0.375..0.465 and y 0.505..0.595, and the front megacasting at
   x <= 2.070. That leaves one clean vertical route, |z| 0.05..0.13 between
   the two fans and forward of x 2.073, and every line in the nose uses it.

   Frunk bay: loop hardware on a rail at y 0.740 standing on four legs to the
   casting top face at y 0.580, threading the 51 mm gaps in the casting's rib
   bank (blades at |z| 0.375..0.387, 0.438..0.450, 0.500..0.512, 0.563..0.575
   over y 0.577..0.623) and clearing hv-4's buffer (upper case y 0.555..0.712
   at x 1.800..2.000, z -0.356..-0.204). The R290 module has its own drained
   pan at y 0.625 on the passenger side, its legs inboard of body-7's crash
   rails (|z| 0.375..0.465, y 0.505..0.595) which block any leg outboard of
   that on the way down to the casting.

   One deliberate 10 mm excursion forward of the zone: the two coil brackets
   reach x 2.070 so they land ON the casting face rather than hovering in
   front of it, which is the retro-gen5-apex visual-attachment lesson.

   AUDITED RESIDUALS, every intersection this module has with a partner
   solid, so the next reviewer checks a list rather than a claim. Measured
   with a sub-box vertex-chunk sweep against every Gen 7 preset partner:
     pack-loop / battery-7 galleries      the two hose-over-spigot landings
                                          at the vapor and liquid stubs
     pack-loop / battery-7 floorlid       the riser passing its lid edge
     pack-loop / battery-7 strikeshield   the lowered return flange, whose
                                          y 0.104..0.132 grazes the shield
                                          top at 0.106 over 12 mm of x
     glycol-loop / hv-4 converter         its stub landing
     glycol-loop / autonomy-4 compute     its stub landing
     heat-pump / body-7 casting + rails,
     heat-pump / hv-4 hv-runs             the HV pigtail, finding (2) above
     recovery-core / body-7 fairings      the declared exhaust penetration
   Everything above the pigtail and the exhaust is a joint at a declared
   interface rather than a fault: hose over spigot, or a line leaving the
   pack past its own lid edge.
   Clean against drivetrain-7, wheels-7 and suspension-4 at every vertex.
   Visual attachment: all 234 meshes sit within 3 mm of another solid, so
   nothing in this module floats.

   For scale on the finding that drove the move above the casting: the same
   sweep puts thermal.js at roughly 87,000 cm3 and thermal-6 at 79,000 cm3
   inside body-7's front megacasting. This module is under 20.

   Firewall (x 0.78..1.00): the air handler case at thermal.js's coordinates,
   the recovery core hung beneath it on the passenger side above hv-4's front
   HV run (top y 0.363).

   Aft runs leave the nose over the casting top at y 0.65, drop to the
   battery lid outboard of interior-6's console (|z| 0.289) and forward of
   suspension-4's steering rack (x 1.175..1.389, y 0.291..0.430). */

const CX = 2.168;          /* coil core plane x: 2.133..2.203 */
const GY = 0.3425;         /* glycol row center: y 0.285..0.400 */
const RY = 0.4620;         /* refrigerant row center: y 0.427..0.497 */
const FX = 2.104;          /* fan plane */
const FY = 0.376;          /* fan axis height */
const FZ = 0.255;          /* fan axis |z|, leaving |z| < 0.135 clear */
const RAILY = 0.740;       /* frunk-bay mounting rail top face */
const PANY = 0.635;        /* R290 module pan top face */

/* Cylinder with its axis along X. Carried from thermal.js. */
function xcyl(r, h, mat, seg) {
  const c = lib.cyl(r, h, mat, seg);
  c.rotation.z = Math.PI / 2;
  return c;
}

function at(mesh, x, y, z) {
  mesh.position.set(x, y, z);
  return mesh;
}

export function build() {
  const sys = new THREE.Group();

  /* ── outdoor coil: glycol row below, refrigerant row above, horizontal
     headers so nothing reaches the crash rails at |z| 0.375..0.465, two fans
     behind with a clear plumbing corridor between them, and two brackets
     landing on the front casting face at x 2.070 ── */
  const coil = lib.part('outdoor-coil', [0.55, -0.10, 0]);

  coil.add(at(lib.box(0.078, 0.024, 0.80, M.darkSteel), CX, 0.267, 0));
  const gCore = lib.fins(0.070, 0.115, 0.79, 22, 0.005, M.alu);
  gCore.position.set(CX, GY, 0);
  coil.add(gCore);
  coil.add(at(lib.box(0.078, 0.022, 0.80, M.darkSteel), CX, 0.411, 0));
  const rCore = lib.fins(0.070, 0.070, 0.79, 16, 0.005, M.alu);
  rCore.position.set(CX, RY, 0);
  coil.add(rCore);
  /* the refrigerant row is U-flow, so both its connections live in one top
     header, and that header stops at |z| 0.35 to stay out of the crash rail */
  coil.add(at(lib.box(0.078, 0.022, 0.70, M.darkSteel), CX, 0.509, 0));
  coil.add(at(lib.box(0.082, 0.012, 0.030, M.castAlu), CX, 0.509, 0));
  for (const zs of [-1, 1]) {
    coil.add(at(lib.box(0.078, 0.244, 0.010, M.alu), CX, 0.375, zs * 0.400));
  }
  /* glycol tap pair and the refrigerant distributor, all in the corridor */
  for (const [ty, tz, mat] of [[0.267, 0.090, M.coolant], [0.411, -0.090, M.coolantHot]]) {
    coil.add(at(xcyl(0.011, 0.040, mat, 10), CX - 0.056, ty, tz));
  }
  coil.add(at(lib.box(0.040, 0.038, 0.032, M.castAlu), CX - 0.054, 0.509, 0.090));
  coil.add(at(lib.box(0.036, 0.034, 0.030, M.castAlu), CX - 0.054, 0.509, -0.090));
  /* glycol defrost tee into the refrigerant fin block */
  coil.add(at(lib.box(0.030, 0.030, 0.028, M.darkSteel), CX - 0.054, 0.462, 0.140));

  /* shroud frame: two rails and four posts, all inboard of the crash rails */
  coil.add(at(lib.box(0.022, 0.014, 0.66, M.plasticLt), 2.132, 0.259, 0));
  coil.add(at(lib.box(0.022, 0.014, 0.66, M.plasticLt), 2.132, 0.500, 0));
  for (const pz of [-0.320, -0.105, 0.105, 0.320]) {
    coil.add(at(lib.box(0.022, 0.250, 0.014, M.plasticLt), 2.132, 0.378, pz));
  }
  for (const bz of [-0.060, 0.060]) {
    coil.add(at(lib.box(0.062, 0.012, 0.070, M.steel), 2.101, 0.300, bz));
  }

  for (const fz of [-FZ, FZ]) {
    const ring = lib.torus(0.114, 0.010, M.plastic, 26, 8);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(FX, FY, fz);
    coil.add(ring);

    const rotor = new THREE.Group();
    rotor.add(xcyl(0.034, 0.044, M.plastic, 16));
    const nose = lib.cone(0.024, 0.024, M.plasticLt, 12);
    nose.rotation.z = -Math.PI / 2;
    nose.position.x = 0.016;
    rotor.add(nose);
    for (let i = 0; i < 7; i++) {
      const pivot = new THREE.Group();
      const blade = lib.box(0.007, 0.086, 0.040, M.plasticLt);
      blade.position.y = 0.069;
      blade.rotation.y = 0.52;
      pivot.add(blade);
      pivot.rotation.x = (i / 7) * Math.PI * 2;
      rotor.add(pivot);
    }
    rotor.position.set(FX, FY, fz);
    lib.spin(rotor, 'x', 18);
    coil.add(rotor);
  }
  sys.add(coil);

  /* ── R290 heat pump: one sealed module on a drained pan above the front
     casting, passenger side. The pan legs land on the casting's central
     block at |z| 0.09 and 0.30, inboard of the crash rail at |z| 0.375 ── */
  const hp = lib.part('heat-pump', [0.20, 0.50, 0.35]);

  const pan = lib.plate(0.200, 0.380, 0.010, 0.020, M.alu);
  pan.position.set(1.965, PANY - 0.010, 0.240);
  hp.add(pan);
  for (const [lx, lz] of [[1.885, 0.090], [2.045, 0.090], [1.885, 0.300], [2.045, 0.300]]) {
    hp.add(at(lib.box(0.020, 0.050, 0.020, M.steel), lx, 0.600, lz));
  }

  hp.add(at(lib.box(0.150, 0.012, 0.090, M.steel), 1.980, 0.641, 0.240));
  hp.add(at(xcyl(0.052, 0.150, M.castAlu, 24), 1.980, 0.702, 0.240));
  hp.add(at(xcyl(0.046, 0.034, M.darkSteel, 20), 1.888, 0.702, 0.240));
  hp.add(at(lib.box(0.055, 0.035, 0.050, M.plastic), 1.930, 0.772, 0.240));

  hp.add(at(lib.cyl(0.034, 0.115, M.steel, 20), 1.905, 0.700, 0.365));
  hp.add(at(lib.sphere(0.034, M.steel, 14), 1.905, 0.758, 0.365));
  const strap = lib.torus(0.037, 0.005, M.darkSteel, 18, 8);
  strap.rotation.x = Math.PI / 2;
  strap.position.set(1.905, 0.696, 0.365);
  hp.add(strap);

  /* economizer flash vessel and its plate stack */
  hp.add(at(lib.box(0.065, 0.080, 0.058, M.alu), 2.020, 0.700, 0.370));
  for (let i = 0; i < 5; i++) {
    hp.add(at(lib.box(0.004, 0.070, 0.050, M.steel), 1.994 + i * 0.013, 0.700, 0.370));
  }
  /* water condenser: refrigerant into the 35 C loop */
  hp.add(at(lib.box(0.075, 0.085, 0.065, M.alu), 1.958, 0.688, 0.110));
  for (let i = 0; i < 6; i++) {
    hp.add(at(lib.box(0.004, 0.075, 0.057, M.steel), 1.929 + i * 0.012, 0.688, 0.110));
  }
  /* chilled evaporator: refrigerant into the 16 C branch */
  hp.add(at(lib.box(0.062, 0.075, 0.055, M.alu), 2.028, 0.685, 0.110));
  /* gallery conditioner: double walled, refrigerant into the pack liquid */
  hp.add(at(lib.box(0.070, 0.075, 0.060, M.alu), 1.955, 0.795, 0.180));
  hp.add(at(lib.cyl(0.006, 0.038, M.plasticLt, 8), 1.990, 0.851, 0.180));
  for (const ez of [0.150, 0.205]) {
    hp.add(at(lib.box(0.026, 0.038, 0.026, M.sensor), 1.916, 0.652, ez));
  }
  /* hydrocarbon sensor at the enclosure low point and its overboard vent */
  hp.add(at(lib.box(0.032, 0.028, 0.028, M.sensor), 1.990, 0.654, 0.400));
  hp.add(at(lib.cyl(0.013, 0.055, M.plasticLt, 10), 2.030, 0.620, 0.400));

  /* discharge to the water condenser, mid-pressure injection, suction */
  hp.add(lib.tube([
    [1.980, 0.755, 0.240],
    [1.968, 0.752, 0.190],
    [1.958, 0.736, 0.145],
  ], 0.007, M.coolantHot));
  hp.add(lib.tube([
    [2.005, 0.700, 0.342],
    [1.988, 0.712, 0.310],
    [1.972, 0.722, 0.282],
  ], 0.005, M.coolant));
  hp.add(lib.tube([
    [1.958, 0.648, 0.145],
    [1.948, 0.646, 0.215],
    [1.938, 0.658, 0.290],
    [1.920, 0.678, 0.340],
    [1.905, 0.692, 0.352],
  ], 0.008, M.steel));
  /* HV pigtail: lands on hv-4's spur end, climbs at once, and threads the
     casting rib gap at |z| 0.387..0.438 */
  hp.add(lib.tube([
    [1.700, 0.550, 0.420],
    [1.704, 0.592, 0.412],
    [1.716, 0.648, 0.410],
    [1.780, 0.692, 0.390],
    [1.862, 0.742, 0.320],
    [1.925, 0.772, 0.262],
  ], 0.007, M.hv));
  sys.add(hp);

  /* ── glycol circuit: the rail the whole bay stands on, the four-port valve
     block, the pump, the runs that land on autonomy-4 and hv-4, and the
     declared handover flanges on the P.driveF zone face at x 1.75 ── */
  const gly = lib.part('glycol-loop', [0.05, -0.45, -0.15]);

  const rail = lib.plate(0.220, 0.400, 0.010, 0.020, M.alu);
  rail.position.set(1.972, RAILY - 0.010, -0.300);
  gly.add(rail);
  for (const [lx, lz] of [[1.900, -0.140], [2.045, -0.140], [1.900, -0.475], [2.045, -0.475]]) {
    gly.add(at(lib.box(0.022, 0.160, 0.022, M.steel), lx, 0.660, lz));
  }

  gly.add(at(lib.box(0.090, 0.075, 0.110, M.castAlu), 1.905, 0.7775, -0.150));
  gly.add(at(lib.cyl(0.020, 0.032, M.darkSteel, 14), 1.905, 0.831, -0.150));
  for (const bz of [-0.200, -0.150, -0.100]) {
    gly.add(at(xcyl(0.011, 0.030, M.castAlu, 10), 1.845, 0.770, bz));
  }
  gly.add(at(xcyl(0.026, 0.074, M.darkSteel, 18), 1.995, 0.775, -0.150));
  gly.add(at(xcyl(0.036, 0.024, M.plastic, 18), 2.044, 0.775, -0.150));
  gly.add(at(lib.cyl(0.010, 0.038, M.coolant, 10), 2.044, 0.810, -0.150));

  /* pump out, over the casting top, down the driver flank of the tunnel and
     aft to autonomy-4's compute cold plate stub */
  gly.add(lib.tube([
    [1.750, 0.500, -0.200],
    [1.744, 0.560, -0.215],
    [1.730, 0.628, -0.235],
    [1.640, 0.650, -0.270],
    [1.400, 0.652, -0.318],
    [1.150, 0.664, -0.288],
    [1.046, 0.652, -0.262],
    [0.994, 0.474, -0.260],
    [0.954, 0.358, -0.300],
    [0.700, 0.328, -0.350],
    [0.200, 0.324, -0.345],
    [-0.400, 0.324, -0.300],
    [-0.660, 0.328, -0.240],
    [-0.830, 0.348, -0.175],
    [-0.880, 0.400, -0.110],
    [-0.842, 0.418, -0.062],
    [-0.800, 0.420, -0.050],
  ], 0.008, M.coolant));
  /* compute plate through to hv-4's converter stubs, then forward on the
     passenger flank at y 0.320, under hv-4's front HV run at y 0.334 */
  gly.add(lib.tube([
    [-0.800, 0.420, 0.050],
    [-0.850, 0.398, 0.130],
    [-0.950, 0.348, 0.200],
    [-1.120, 0.324, 0.240],
    [-1.250, 0.336, 0.250],
    [-1.340, 0.382, 0.247],
    [-1.430, 0.400, 0.247],
  ], 0.008, M.coolantHot));
  gly.add(lib.tube([
    [-1.310, 0.400, 0.247],
    [-1.300, 0.360, 0.282],
    [-1.288, 0.326, 0.332],
    [-1.240, 0.320, 0.424],
    [-1.100, 0.320, 0.478],
    [-0.700, 0.320, 0.482],
    [-0.400, 0.322, 0.478],
    [0.200, 0.318, 0.420],
    [0.700, 0.322, 0.380],
    [0.905, 0.334, 0.356],
    [0.950, 0.348, 0.350],
    [0.972, 0.372, 0.346],
    [0.992, 0.412, 0.342],
    [1.016, 0.456, 0.336],
    [1.042, 0.494, 0.328],
    [1.078, 0.528, 0.314],
    [1.150, 0.564, 0.290],
    [1.300, 0.618, 0.250],
    [1.470, 0.648, 0.200],
    [1.650, 0.652, 0.168],
    [1.740, 0.664, 0.140],
    [1.812, 0.702, 0.096],
    [1.872, 0.744, 0.020],
    [1.898, 0.762, -0.090],
    [1.906, 0.768, -0.132],
  ], 0.008, M.coolantHot));
  for (const fz of [-0.100, -0.200]) {
    gly.add(at(xcyl(0.016, 0.014, M.darkSteel, 14), 1.752, 0.500, fz));
  }
  /* coil cold header up the corridor, over the casting, to drive flange A */
  gly.add(lib.tube([
    [2.104, 0.267, 0.090],
    [2.098, 0.380, 0.092],
    [2.092, 0.540, 0.096],
    [2.086, 0.606, 0.092],
    [2.068, 0.664, 0.082],
    [1.980, 0.686, 0.020],
    [1.862, 0.680, -0.040],
    [1.770, 0.658, -0.072],
    [1.752, 0.612, -0.086],
    [1.748, 0.556, -0.094],
    [1.750, 0.500, -0.100],
  ], 0.009, M.coolant));
  /* block to the pack condenser plate stack */
  gly.add(lib.tube([
    [1.905, 0.775, -0.210],
    [1.908, 0.782, -0.290],
    [1.912, 0.788, -0.352],
  ], 0.008, M.coolant));
  /* pump down the inter-fan corridor to the coil's hot glycol header */
  gly.add(lib.tube([
    [2.044, 0.810, -0.150],
    [2.052, 0.760, -0.130],
    [2.076, 0.660, -0.108],
    [2.096, 0.560, -0.094],
    [2.100, 0.470, -0.090],
    [2.104, 0.411, -0.090],
  ], 0.009, M.coolantHot));
  sys.add(gly);

  /* ── pack gallery loop: condenser plate stack and receiver on the rail, a
     sealed bellows instead of thermal-6's regulator, purge pot, the 8 W
     circulation pump, and the 34 mm riser and 13 mm return to the pack ── */
  const pk = lib.part('pack-loop', [0.15, -0.25, -0.30]);

  pk.add(at(lib.box(0.075, 0.085, 0.070, M.alu), 1.912, 0.783, -0.387));
  for (let i = 0; i < 6; i++) {
    pk.add(at(lib.box(0.004, 0.075, 0.062, M.steel), 1.883 + i * 0.012, 0.783, -0.387));
  }
  pk.add(at(xcyl(0.034, 0.100, M.steel, 20), 2.015, 0.780, -0.387));
  for (const cs of [-1, 1]) {
    pk.add(at(lib.sphere(0.034, M.steel, 14), 2.015 + cs * 0.050, 0.780, -0.387));
  }
  pk.add(at(lib.box(0.028, 0.045, 0.020, M.sensor), 2.015, 0.822, -0.387));
  pk.add(at(lib.cyl(0.026, 0.055, M.steel, 16), 1.975, 0.830, -0.250));
  pk.add(at(lib.cyl(0.016, 0.018, M.darkSteel, 12), 1.975, 0.866, -0.250));
  pk.add(at(lib.cyl(0.018, 0.040, M.alu, 12), 2.045, 0.775, -0.250));
  pk.add(at(lib.cyl(0.014, 0.028, M.plasticLt, 10), 2.045, 0.808, -0.250));
  pk.add(at(xcyl(0.020, 0.055, M.darkSteel, 16), 1.895, 0.766, -0.470));
  pk.add(at(xcyl(0.016, 0.022, M.castAlu, 14), 1.935, 0.766, -0.470));

  /* 34 mm riser sized on battery-7's 15 kW: its unchanged vapor stub face
     at x 1.297, up the driver flank, over the casting top at y 0.652 */
  pk.add(at(xcyl(0.024, 0.012, M.darkSteel, 14), 1.302, 0.268, -0.100));
  pk.add(lib.tube([
    [1.290, 0.268, -0.100],
    [1.300, 0.304, -0.136],
    [1.312, 0.356, -0.192],
    [1.342, 0.416, -0.252],
    [1.372, 0.474, -0.296],
    [1.412, 0.548, -0.320],
    [1.512, 0.632, -0.348],
    [1.700, 0.652, -0.386],
    [1.820, 0.700, -0.390],
    [1.890, 0.752, -0.388],
    [1.906, 0.770, -0.387],
  ], 0.017, M.coolantHot));
  const bellowsA = xcyl(0.021, 0.026, M.steel, 14);
  bellowsA.position.set(1.700, 0.652, -0.390);
  pk.add(bellowsA);

  /* 13 mm liquid return to battery-7's LOWERED feed stub at y 0.118, the
     joint that module reported standing open against thermal-7 as drawn */
  pk.add(at(xcyl(0.014, 0.012, M.darkSteel, 12), 1.292, 0.118, 0.100));
  pk.add(lib.tube([
    [2.053, 0.762, -0.387],
    [2.030, 0.748, -0.340],
    [2.005, 0.756, -0.260],
    [1.985, 0.772, -0.140],
    [1.968, 0.790, 0.040],
    [1.958, 0.792, 0.140],
    [1.950, 0.782, 0.176],
    [1.905, 0.730, 0.200],
    [1.840, 0.678, 0.230],
    [1.760, 0.650, 0.240],
    [1.560, 0.640, 0.230],
    [1.430, 0.548, 0.215],
    [1.374, 0.404, 0.190],
    [1.346, 0.362, 0.174],
    [1.320, 0.338, 0.156],
    [1.306, 0.288, 0.140],
    [1.296, 0.216, 0.122],
    [1.289, 0.158, 0.108],
    [1.285, 0.118, 0.100],
  ], 0.0065, M.coolant));
  const bellowsB = xcyl(0.0095, 0.022, M.steel, 12);
  bellowsB.position.set(1.560, 0.640, 0.230);
  pk.add(bellowsB);
  /* keyed, desiccant capped fill port on the liquid line */
  pk.add(at(lib.cyl(0.009, 0.038, M.coolant, 10), 1.985, 0.795, -0.140));
  pk.add(at(lib.cyl(0.012, 0.010, M.plasticLt, 10), 1.985, 0.819, -0.140));
  for (const [cx, cy, cz] of [[1.500, 0.630, -0.380], [1.372, 0.400, 0.190]]) {
    pk.add(at(lib.box(0.016, 0.026, 0.018, M.plastic), cx, cy, cz));
  }
  sys.add(pk);

  /* ── occupant-local delivery: pump, mixing valve and expansion vessel on
     the rail, the 35 C and 16 C pair running aft over the battery lid to
     manifolds between interior-6's own seat track rails, and two footwell
     radiant panels clear of its pedal set ── */
  const loc = lib.part('local-circuits', [0.05, -0.35, 0.25]);

  loc.add(at(xcyl(0.022, 0.064, M.darkSteel, 16), 1.998, 0.770, -0.300));
  loc.add(at(xcyl(0.030, 0.022, M.plastic, 16), 2.042, 0.770, -0.300));
  loc.add(at(lib.box(0.048, 0.048, 0.048, M.castAlu), 1.912, 0.766, -0.300));
  loc.add(at(lib.cyl(0.026, 0.056, M.steel, 16), 1.912, 0.770, -0.360));

  /* feed and return aft: over the casting top, down the flank forward of
     suspension-4's rack, then along the battery lid at y 0.324 */
  const runAft = (zNose, zSeat, mat) => lib.tube([
    [2.020, 0.792, zNose],
    [1.950, 0.784, zNose - 0.008],
    [1.880, 0.770, zNose - 0.018],
    [1.826, 0.756, zNose - 0.030],
    [1.788, 0.744, zNose - 0.040],
    [1.746, 0.692, zNose - 0.052],
    [1.500, 0.652, zSeat * 0.36],
    [1.180, 0.652, zSeat * 0.42],
    [1.044, 0.642, zSeat * 0.50],
    [0.998, 0.520, zSeat * 0.58],
    [0.962, 0.358, zSeat * 0.78],
    [0.900, 0.332, zSeat * 0.92],
    [0.700, 0.328, zSeat],
    [0.430, 0.326, zSeat],
    [0.345, 0.334, zSeat],
  ], 0.007, mat);
  loc.add(runAft(-0.280, -0.400, M.coolantHot));
  loc.add(runAft(-0.340, 0.400, M.coolant));

  for (const sz of [-0.400, 0.400]) {
    loc.add(at(lib.box(0.100, 0.045, 0.070, M.castAlu), 0.300, 0.338, sz));
    for (const py of [0.330, 0.350]) {
      loc.add(at(lib.cyl(0.007, 0.020, M.coolant, 8), 0.352, py, sz));
    }
    /* aft to the rear bench manifolds, outboard of suspension-4's chassis
       ECU at x -1.040..-0.847, z -0.340..-0.220 */
    loc.add(lib.tube([
      [0.250, 0.338, sz],
      [0.000, 0.326, sz * 1.08],
      [-0.400, 0.324, sz * 1.14],
      [-0.780, 0.328, sz * 1.18],
      [-0.885, 0.336, sz * 1.18],
    ], 0.006, M.coolantHot));
    loc.add(at(lib.box(0.090, 0.042, 0.060, M.castAlu), -0.905, 0.337, sz * 1.18));
  }

  /* footwell radiant panels under the toe boards, clear of interior-6's
     pedal set at x 1.103..1.387, z -0.510..-0.358 */
  for (const rz of [-0.290, 0.290]) {
    const panel = lib.box(0.115, 0.012, 0.130, M.alu);
    panel.rotation.z = 0.35;
    panel.position.set(1.030, 0.494, rz);
    loc.add(panel);
    loc.add(at(lib.box(0.014, 0.028, 0.014, M.steel), 1.030, 0.520, rz));
    loc.add(lib.tube([
      [0.988, 0.488, rz],
      [0.994, 0.480, rz * 0.90],
      [1.000, 0.470, rz * 0.80],
    ], 0.005, M.coolantHot));
  }
  sys.add(loc);

  /* ── cabin air handler at the firewall, x 0.78..1.00, the envelope this
     slot has held since thermal.js: case, 330 mm blower wheel, the two
     coils, filter, duct stubs, and the rail-duct takeoffs whose dampers
     decide whether interior-6's ceiling gap insulates or breathes ── */
  const ah = lib.part('air-handler', [-0.32, 0.45, 0]);

  ah.add(at(lib.box(0.220, 0.240, 0.560, M.plastic), 0.890, 0.700, 0.030));
  const scroll = lib.cyl(0.115, 0.078, M.plasticLt, 22);
  scroll.rotation.x = Math.PI / 2;
  scroll.position.set(0.890, 0.700, 0.298);
  ah.add(scroll);
  const inlet = lib.cyl(0.062, 0.030, M.plasticLt, 18);
  inlet.rotation.x = Math.PI / 2;
  inlet.position.set(0.890, 0.700, 0.352);
  ah.add(inlet);

  const dehum = lib.fins(0.030, 0.160, 0.300, 10, 0.004, M.alu);
  dehum.position.set(0.845, 0.700, -0.060);
  ah.add(dehum);
  const htr = lib.fins(0.030, 0.160, 0.300, 10, 0.004, M.copper);
  htr.position.set(0.930, 0.700, -0.060);
  ah.add(htr);
  ah.add(at(lib.box(0.006, 0.150, 0.290, M.plasticLt), 0.888, 0.700, -0.060));

  ah.add(at(lib.box(0.140, 0.030, 0.220, M.plasticLt), 0.860, 0.832, -0.050));
  for (const dz of [-0.100, 0.120]) {
    ah.add(at(lib.box(0.070, 0.040, 0.120, M.plasticLt), 0.890, 0.840, dz));
  }
  /* rail-duct takeoffs to interior-6's A-pillar ducts, each with its damper */
  for (const tz of [-0.245, 0.245]) {
    ah.add(at(lib.box(0.050, 0.045, 0.050, M.plasticLt), 0.930, 0.815, tz));
    ah.add(at(lib.box(0.024, 0.026, 0.024, M.darkSteel), 0.930, 0.850, tz));
    ah.add(lib.tube([
      [0.930, 0.838, tz],
      [0.934, 0.868, tz * 1.05],
      [0.938, 0.898, tz * 1.10],
    ], 0.014, M.plasticLt));
  }
  /* the two water stubs the local loop feeds, and the condensate drain */
  for (const hz of [-0.080, -0.150]) {
    ah.add(at(xcyl(0.011, 0.028, M.coolantHot, 10), 0.998, 0.640, hz));
  }
  ah.add(at(lib.cyl(0.008, 0.040, M.rubber, 8), 0.890, 0.572, -0.100));
  sys.add(ah);

  /* ── ventilation recovery core: counterflow membrane stack under the case
     on the passenger side, above hv-4's front HV run (top y 0.363), with the
     cabin return grille, the cowl fresh-air riser, a motorized bypass, and
     the exhaust that pierces body-7's fairing inner wall at |z| 0.693..0.707
     to discharge into the wheel well just aft of its outlet louver bank ── */
  const rec = lib.part('recovery-core', [-0.15, 0.10, 0.45]);

  rec.add(at(lib.box(0.170, 0.170, 0.170, M.plasticLt), 0.895, 0.478, 0.295));
  for (let i = 0; i < 5; i++) {
    rec.add(at(lib.box(0.150, 0.006, 0.150, M.white), 0.895, 0.420 + i * 0.029, 0.295));
  }
  for (const bz of [0.240, 0.350]) {
    rec.add(at(lib.box(0.020, 0.024, 0.020, M.steel), 0.895, 0.575, bz));
  }
  /* cabin return grille under the dash and its short duct into the core */
  rec.add(at(lib.box(0.018, 0.090, 0.170, M.plasticLt), 0.801, 0.470, 0.290));
  rec.add(lib.tube([
    [0.812, 0.470, 0.290],
    [0.830, 0.472, 0.292],
    [0.848, 0.474, 0.295],
  ], 0.020, M.plasticLt));
  /* fresh air down from the cowl into the core */
  rec.add(lib.tube([
    [0.928, 0.892, 0.356],
    [0.946, 0.782, 0.348],
    [0.936, 0.660, 0.326],
    [0.922, 0.572, 0.306],
  ], 0.022, M.plasticLt));
  /* tempered supply across to the blower inlet */
  rec.add(lib.tube([
    [0.906, 0.566, 0.336],
    [0.898, 0.606, 0.346],
    [0.890, 0.650, 0.352],
  ], 0.020, M.plasticLt));
  rec.add(at(lib.box(0.038, 0.046, 0.038, M.darkSteel), 0.952, 0.545, 0.222));
  /* exhaust out through the fairing wall into the wheel well */
  rec.add(lib.tube([
    [0.958, 0.452, 0.375],
    [0.992, 0.462, 0.470],
    [1.018, 0.472, 0.590],
    [1.042, 0.482, 0.700],
    [1.058, 0.490, 0.782],
  ], 0.020, M.plasticLt));
  rec.add(at(lib.box(0.050, 0.070, 0.026, M.plastic), 1.058, 0.490, 0.800));
  sys.add(rec);

  return sys;
}
