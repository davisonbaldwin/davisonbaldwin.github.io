/* Gen 7 battery: the maximum-energy pack. 190 kWh at 385 kg, 810 V, the same
   anode-free bipolar chemistry battery-6 shipped and NOT a denser one.

   design/gen7.md asked this pack to grow into the volume the Gen 6 boat-tail
   and the narrowed rear track free up. Measured against the partners'
   geometry rather than their prose (design/retro-gen4.md drift law), neither
   of those is where the volume is, and the content says so:

   - The narrowed rear track COSTS this pack volume. The gen7 contract puts
     the rear motor annulus at |z| 0.65 to 0.73 with its flange face at 0.65,
     70 mm inboard of the Gen 3 contract, so the rear tyre's inner face moves
     inboard with it and the pack's rear corners have to be cut away.
   - The boat-tail volume is real but this pack declines it, for two reasons
     stated in numbers on the bricks part: it lies aft of the rear crash
     structure, and its centroid is 857 mm behind the rear axle.
   - The volume actually taken is under the pack, and body-7's own geometry
     is what exposes it. NOTE ON DATUMS: lib.plate(w, d, t, r, mat) lays its
     slab from y + t/2 to y + 3t/2, so a plate written "at y 0.10" has its
     underside at 0.10 + t/2, not at 0.10. Every height quoted in this file
     is a measured world y, not a plate position argument. Measured that way,
     body-7's venturi closeouts (closeF x 1.32 to 2.10, closeR x -1.935 to
     -1.315, both 12 mm plates written at y 0.10) have their underside at
     y 0.106, and its floor strakes hang lower still, underside y 0.1025.
     battery-6's pan underside is y 0.132. The pack floor has therefore been
     sitting 26 mm up inside a floor that was flat either side of it since
     battery-3. Taking the pack's lowest surface down to y 0.1025, level with
     the strakes and 3.5 mm under the closeout plane, is 29.5 mm of floor,
     and 29 of it arrives as stack height over 3.5 m2 of pack.

   Envelope, superseding design/gen4.md's table for this module only:
   x [-1.29, 1.30], y [0.1025, 0.308], z [-0.71, 0.71], narrowing to
   |z| 0.615 aft of x -1.00 for wheels-7's relocated rear corner. Rocker
   bond rails and the shield edge rails they carry run x [-1.06, 1.08] at
   |z| 0.696 to 0.78, carried from battery-3. All of that is inside
   design/gen4.md's own x [-1.30, 1.30], y [0.13, 0.31] except the floor
   drop, which is the deviation this module exists to make.

   Preset partners, every cited number derived from their build geometry:
   - hv-4: converter is ONE cast box (0.32 x 0.13 x 0.44 at x -1.37) with ONE
     HV input boss at (-1.542, 0.45, 0.10), so there is a single conversion
     front end and the pack must land inside its 300 to 870 V input. 210
     series layers charging to 4.10 V give 861 V, unchanged from battery-6.
     Its pack feed starts at (-1.13, 0.315, 0.38): the service hatch stays
     exactly there. Its port geometry carries 630 A that this pack cannot use.
   - body-7: floor strake underside y 0.1025 sets the new floor datum, with
     the venturi closeout underside 3.5 mm above it at y 0.106; its rear
     closeout reaches x -1.315 and its strakes x -1.33, which is what stops
     the pack growing aft along the floor.
   - suspension-4: rear subframe forward crossmember x [-1.40, -1.32] at
     y [0.215, 0.285], rear-steer housing x [-1.424, -1.312] at y [0.137,
     0.218]. Together they close the aft face at x -1.30.
   - drivetrain-7 / wheels-7: neither was built when this pack was drawn, so
     its rear clearances were derived from the gen7 contract flange at
     |z| 0.65. Both have since landed and the waist has been re-verified
     against wheels-7's built tyre: see the verification notes at the foot of
     this file. The waist holds with 31 mm to spare.
   - thermal-7: vapor stub UNCHANGED at (1.272, 0.268, -0.10), meeting
     thermal-7's riser flange at x 1.296 to 1.308. The liquid feed stub MOVED
     DOWN 29 mm, from battery-6's built position (1.272, 0.147, 0.10) to
     (1.272, 0.118, 0.10), because the floor dropped. This module reported
     that joint rather than editing a partner, and thermal-7 has since landed
     its condensate return flange at y 0.118: both joints are now closed and
     verified against thermal-7's built meshes. Design heat load falls 25 kW
     to 15 kW. One item stays open between the two modules, the ~19 kg of
     fluoroketone standing in this pack's pool, and it is named on the
     galleries part rather than quietly booked.

   Mass ledger, binding: 325 bricks + 6 bands + 19 rails + 12 lid + 5
   galleries + 3 film + 4 disconnect + 11 strike shield = 385 kg. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'battery-7',
  name: 'Battery pack · Gen 7 range',
  color: 0x4fc4d8,
  explode: [0, -1.15, 0],
  blurb: 'The pack that buys the range number: 190 kWh at 385 kg, 40 kWh more than battery-6 in the same footprint. None of it comes from a better cell. The chemistry, the layer format and the 810 V string are battery-6\'s, unchanged; the energy comes from 29 mm of floor depth the underbody was already giving away and from filling the gaps between layers that a 480 kW pack needed and a 260 kW one does not. Pack gravimetric density falls 500 to 494 Wh/kg and the pack states that plainly. Net contribution 361 miles, after its own 85 kg has been charged 25 of them back.',
  parts: {
    bricks: {
      name: 'Bipolar stack bricks',
      tagline: 'Same chemistry, same 210 layers, same 478 Wh per litre of layer: every one of the extra 40 kWh is volume, and the pack refuses to call it anything else.',
      mass: 325,
      count: 5,
      specs: [
        ['Format', 'Brick, 420 x 164 x 1,300 mm; 42 bipolar layers each'],
        ['Chemistry', 'Anode-free Li metal / Li-rich Mn cathode, sulfide separator (unchanged from Gen 5)'],
        ['String', '210s, 810 V nominal, 630 to 861 V window (identical to Gen 5)'],
        ['Capacity', '235 Ah, 907 Wh per layer; 38 kWh per brick, 190 kWh total'],
        ['Energy density', '585 Wh/kg cell, 494 Wh/kg pack (Gen 5: 586 / 500)'],
        ['Maturity', 'Anode-free: pilot line. Full-pack bipolar: extrapolated'],
      ],
      how: 'Nothing in the electrochemistry moved. A bipolar plate is still one sheet of steel collecting the cathode in front of it and the anode behind it, the sulfide separator is still 20 µm, the string is still 210 layers deep because hv-4 still has exactly one conversion front end and its input silicon is still qualified for 300 to 870 V. Charge 210 layers to 4.10 V and the string tops out at 861, nine volts under that ceiling, which is the same arithmetic battery-6 ran and the same reason it stops short of the cell\'s own 4.20. What changed is the size of a layer. The face grows from 135 x 1,300 mm to 164 x 1,300, and the layer itself thickens from 8.5 to 8.9 mm inside an unchanged 10.0 mm pitch, so the inter-layer gap closes from 1.5 mm to 1.1. Multiply those out and one layer goes from 1.492 to 1.897 litres. The energy density of that litre is unchanged: 478 Wh, exactly what battery-6 achieved, because the cathode formulation, the loading and the separator are the same parts. 210 layers at 907 Wh is 190 kWh, and 585 Wh/kg at the cell is 586 rounded down. Pack-level density goes the wrong way, 500 Wh/kg down to 494, because the strike shield and the larger galleries store nothing; volumetric density goes up, 241 Wh/L of structural envelope to 269, measured pan underside to lid top over the lid plan on both packs, which is 3.664 m2 by 0.170 m on battery-6 and 3.609 by 0.1965 here. This module claims no chemistry progress at all, and the reason to be blunt about that is that a range generation is the easiest place on this ladder to smuggle one in.\n\nThe 29 mm of extra height is the whole story and it was found in body-7 rather than invented, by measuring its meshes rather than reading its prose. Its venturi closeouts are 12 mm carbon plates whose underside sits at y 0.106, forward of the pack at x 1.32 to 2.10 and behind it at x -1.935 to -1.315, and its floor strakes hang 3.5 mm lower again with their underside at y 0.1025. battery-6\'s pan underside sits at y 0.132. The pack has therefore been a 26 mm recess in the middle of a flat floor since battery-3 set that envelope, with a rearward-facing step at its leading edge and a forward-facing one at its trailing edge. This pack takes its lowest surface down to y 0.1025, exactly level with body-7\'s strakes, which leaves 3.5 mm of step at each end instead of 26 and gives the stack 29.5 mm of floor. Ground clearance genuinely does not change, because the strakes were already the lowest thing on the underbody and the shield now sits in their plane rather than below it. What changes is that 3.5 m2 of pack floor lives at the strike plane instead of 26 mm above it, which is why the strike shield exists and why it is 11 kg. The gaps supply the rest: taking 0.4 mm out of each of 210 inter-layer channels puts 4.7 percent more layer volume in the same brick length, and it is available only because drivetrain-7 asks for 260 kW where drivetrain-6 asked for 480. That trade is paid for on the cooling side and the number is on the galleries part.',
      why: 'The energy is not free and here is the whole ledger in miles. At the generation\'s 105 Wh/mi this pack returns 190,000 / 105 = 1,809 miles. Its 85 kg then has to be charged back. Rolling resistance costs Crr x g x 1,609 m per kilogram per mile, which at wheels-7\'s target Crr of 0.0038 is 60.0 J or 0.0167 Wh per kg per mile, so 85 kg adds 1.42 Wh/mi at steady cruise. The same car carrying battery-6 instead, 300 kg and 150 kWh, therefore consumes 103.58 Wh/mi and covers 150,000 / 103.58 = 1,448 miles. The net contribution of this module is 1,809 minus 1,448, which is 361 miles. Had the mass been free it would have been 386, so the feedback ate 25 miles, 6.4 percent of the gross gain. On a stop-start cycle the unrecovered kinetic term adds roughly 0.0153 Wh per kg per mile on top, the feedback doubles to 2.7 Wh/mi, and the net falls to about 343 miles; at Gen 3\'s Crr of 0.0050 rather than wheels-7\'s target it is 355, so the conclusion survives either tyre. What that arithmetic does NOT show is a self-limit, and the brief expected one. A kilogram anywhere on this car costs 0.29 miles and a kilowatt-hour adds 9.5, so any subsystem carrying more than 30 Wh/kg still pays; this pack\'s marginal rate is 40 kWh for 85 kg, which is 470 Wh/kg, fifteen times break-even. Mass would only stop the energy lever at a range near 28,000 miles. The real ceiling is the envelope, and that is why this part spends two paragraphs on 29 mm of floor and why it declined the boat-tail cavity: about 0.3 m3 sits between body-7\'s diffuser hinge at x -1.938 and its Kamm face at x -2.675, enough for another 40 kWh, but body-7\'s rear casting occupies x -1.600 to -2.295, so the forward two thirds of that cavity is inside crash structure certified on the Gen 1 pulse and the rest is behind it. The centroid sits at x -2.31, which is 857 mm aft of the rear axle: 85 kg there takes 85 x 0.857 / 2.90 = 25 kg off the front axle, and at 2.31 m from mid-wheelbase it adds 85 x 2.31 squared, about 450 kg·m2, of yaw inertia to a 5.06 m car. Cells behind a crash structure are not a tradeoff, they are a mistake.',
      fail: [
        'Every anode-free failure mode carries over from Gen 2 and Gen 3 unchanged, and one gets worse: plating goes filamentary at low temperature and high current, and this pack\'s layer is 21 percent taller, so the current map has a longer edge-to-centre spreading path across the bipolar plate and the corner cells reach the plating limit before the middle ones do. The fast-charge floor stays at 15 °C and the charge ceiling drops, which is on the specs above rather than hidden here.',
        'Full-pack bipolar remains the extrapolated claim and the bar rose with the face: 20 µm sulfide sheets now have to be pinhole-free across 0.213 m2 rather than 0.176, and coulombic efficiency still has to hold 99.99% for the life of a string with no lithium reserve. Defect probability goes with area, so a larger pinhole-free sheet is a harder physical problem than the same one scaled up, not an identical one repeated.',
        'The replaceable unit grew from a 30 kWh brick to a 38 kWh one, and a single failed layer still opens the only string. Losing one brick is now a fifth of a 190 kWh pack and roughly 360 miles of range, which is the honest size of the no-parallel-paths bet at this scale.',
      ],
      explode: [0, 0.34, 0],
    },
    bands: {
      name: 'Preload band sets',
      tagline: 'A taller brick breathes further and presses harder: 64 kN per brick against battery-6\'s 53, on the same wound carbon hoops.',
      mass: 6,
      count: 15,
      specs: [
        ['Preload', '0.3 MPa on every layer face (unchanged since Gen 3)'],
        ['Tension', '64 kN per brick; ~10.7 kN per band leg (Gen 5: 53 / 8.8)'],
        ['Band', 'Filament-wound CFRP hoop, 26 x 2 mm section (Gen 5: 22 x 2)'],
        ['Compliance', 'Disc-spring corner rockers, force within ±8%'],
        ['Breathing absorbed', '22.5 mm per brick, empty to full (Gen 5: 21)'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'The requirement has not moved since Gen 3 and will not: a solid electrolyte conducts only where it is pressed, lithium strips unevenly on every discharge, and voids concentrate the next charge into fewer contact points, which is how dendrites start. 0.3 MPa on every face, forever. What moves is the load, because pressure times area is force and the area grew. 0.3 MPa across a 0.213 m2 face is 64 kN per brick where battery-6 needed 53, so the hoop section goes from 22 x 2 mm to 26 x 2 and each of the six legs carries 10.7 kN instead of 8.8. That is still under 15 percent of band strength, the region where carbon fibre effectively does not creep, and the corner rockers are the Gen 2 disc-spring idea in its third form.\n\nBreathing scales with capacity, not with height, and it is worth doing the arithmetic rather than assuming. 235 Ah moves 61 grams of lithium per layer instead of 48; spread over a face that grew in proportion, the plated thickness is 0.536 mm against battery-6\'s 0.512, so a 42-layer brick travels 22.5 mm from empty to full instead of 21. The brick is still the mechanical quantum for the same reason: 42 layers is where pressure uniformity and breathing stay controllable, and a monolithic 210-layer stack would now move 113 mm. The bands close the same structural loop they closed in Gen 5, bonded between the rocker rails and the floor-lid so the brick field is the shear web of the floor, and that web only works because its laminations cannot slide.',
      why: 'Six kilograms against battery-6\'s four is 50 percent more band for 27 percent more brick and 21 percent more preload force, so this part got heavier per unit of energy it helps carry, and the direction is worth printing because it is the wrong one. The section had to grow with the force, the hoop had to grow with the brick, and the two compound. The other honest note is what the extra tension does to the failure margin rather than to the mass: at 10.7 kN a leg the hoops sit closer to the stress-rupture knee than battery-6\'s did, so the strain-bridge trend on the sensing film is doing more work than it used to, and the inspection interval it implies is shorter.',
      fail: [
        'Band stress-rupture is the slow failure and this pack loads it harder. Every hoop carries a strain bridge, and a relaxing hoop re-runs the Gen 2 story: voids, rising impedance, an EIS flag weeks ahead of a short.',
        'A shifted corner rocker tilts the pressure field, and a taller brick tilts further for the same shift because the moment arm grew. The low-pressure edge ages fastest, and the film\'s strain grid is the only thing that reads it in service.',
      ],
      explode: [0, 0.18, 0],
    },
    rockerrails: {
      name: 'Rocker bond rails',
      tagline: 'Same 19 kg, 26 mm taller, thinner walls: a deeper section is a stiffer one, and the pack floor dropped so the rail had to follow it down.',
      mass: 19,
      count: 2,
      specs: [
        ['Material', '7003-T6 extrusion, 3 chambers (carried from Gen 3)'],
        ['Section', '196 x 60 mm, walls 2.7 mm (Gen 5: 170 x 60 at 3.2)'],
        ['Bond', 'Toughened epoxy, 3 mm bondline, + 28 flow-drill screws per side'],
        ['Crush budget', '68 mm before the first end plate (Gen 5: 60)'],
        ['Length', 'x -1.06 to 1.08, shortened 20 mm for wheels-7\'s rear corner'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The concept is battery-3\'s, carried for the third time: a three-chamber extrusion bonded to the body rocker on its outer face and to the brick ends on its inner face, so a side pole runs rocker, rail, brick stack, rail, rocker with no tray in between. The rail follows the pack floor down from y 0.130 to 0.1035 and its section grows 170 to 196 mm, and it does that without gaining mass because section modulus goes with the square of depth: the walls thin from 3.2 to 2.7 mm and the rail is stiffer and crushes further than the one it replaces, 68 mm of controlled collapse against 60. The 40 mm intrusion budget body-7\'s rockers quote is a contract with this part, and it now has more room to honour it.\n\nThe rail also got shorter, and that is the rear track sending its first bill. The gen7 contract puts the rear motor annulus flange at |z| 0.65 against Gen 3\'s 0.72, and wheels-7 as built lands its rear tyre inner face at |z| 0.6625; sweeping every vertex of that tyre through suspension-4\'s ±3 degrees of rear steer takes it 16.5 mm further in, to |z| 0.646, and moves its leading edge to x -1.0908. The rail used to run to x -1.08, 15 mm clear of the old tyre. It now stops at -1.06, 31 mm clear of the swept new one, and everything else in the rear of this pack narrows for the same reason. The 810 V raceway laminated into the passenger-side rail carries over unchanged, because the string voltage did not move; the conductor sees less current than it did in Gen 5, 321 A at drivetrain-7\'s peak against 593 at drivetrain-6\'s, and it was not resized, which is a deliberate carry rather than an oversight.',
      why: 'This part is the pack\'s seatbelt and it is sized by a pole test, not by a range target, so a generation optimising miles is exactly the generation that should be suspicious of touching it. What it did instead was follow the floor down and take the free stiffness that a deeper section hands over, and hold the crash geometry otherwise identical, so the side-impact argument battery-3 made is still the argument and not a new one that needs proving.',
      fail: [
        'An abraded raceway laminate puts 861 V one insulation layer from body ground, carried from Gen 3 and Gen 5 unchanged; the isolation monitor watches this seam first.',
        'Thinner walls buy stiffness and spend dent resistance. A 2.7 mm chamber wall is more easily damaged by a jack pad in the wrong place than a 3.2 mm one, and the jacking points are now a hard instruction rather than a suggestion.',
        'A side pole that bottoms all three chambers puts end plates and layers into the load path, and the repair boundary after such a hit is the body shell rather than the pack, the line battery-3 drew and this module has no reason to move.',
      ],
      explode: [0, 0.06, 0.55],
    },
    floorlid: {
      name: 'Floor-lid',
      tagline: 'Carried whole from battery-6 except where wheels-7 cut its corners off: the rear 290 mm narrows from 1.42 m to 1.23.',
      mass: 12,
      specs: [
        ['Material', 'CFRP skins on 14 mm aramid honeycomb (carried from Gen 5)'],
        ['Plan', '1.42 m wide to x -1.00, then 1.23 m to the rear wall'],
        ['Attachment', 'Bonded perimeter + brick-top adhesive; structural'],
        ['Thermal duty', 'Insulating ceiling of the vapor space'],
        ['Service access', 'One bolted hatch, cover face y 0.3070 at (-1.13, 0.38), hv-4 interface'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Four jobs, all carried from battery-6: pressure and moisture boundary of the pack, the surface the cabin carpet bonds to, the upper skin of the floor torsion box bonded to the rails and to every brick top, and the insulating ceiling over a 49 to 68 °C vapor space. The honeycomb core is what makes the last one work, because skin-to-skin conductance is two orders below the aluminium panel battery-3 used, and the carpet side stays near cabin temperature at full boil. Seat loads still pass through potted inserts into the brick tops beneath. The panel did not need to change for a taller pack, because a lid is loaded in bending and shear and neither of those cares how deep the box below it is. The bonded perimeter is where the sandwich stops being a sandwich: the core tapers out and the two skins close down onto a solid laminate land that lies on the rocker rail top at y 0.2995 and runs to |z| 0.744, which is the joint the second line of the attachment spec has always described.\n\nWhat changed is the plan view, and it is the clearest place on this pack to see what the aero lever costs. wheels-7 moves the rear wheel centres to |z| 0.74 and the annulus flange to 0.65, and the swept rear tyre reaches |z| 0.646 at its innermost. The lid therefore runs full width to x -1.00 and then steps in to 1.23 m for its last 290 mm, losing two corners of about 0.028 m2 each. That waist was cut to |z| 0.615 from the contract flange before wheels-7 existed, and the built tyre turned out to be 12.5 mm further out than the contract implied, so the lid now clears the swept tyre by 31 mm where 14 would have done. Nothing in that corner stores energy, so the surplus is packaging margin rather than lost range, and it is left in place rather than re-cut because the next tyre is the one that will use it. The service hatch is unaffected and unmoved, because hv-4\'s pack feed leaves it at (-1.13, 0.315, 0.38) and that coordinate is an interface, not a preference. The two burst discs stay rear-facing on the rear wall at x -1.29, inside the new waist.',
      why: 'A lid that did not need redesigning did not get redesigned, and the interesting content is the shape of what was taken away rather than the panel itself. The narrowed rear track is the precondition for body-7\'s tail closing harder, which is the second-largest lever in this generation, and the pack is one of the parts that pays for it. Naming that cost in square metres of floor panel is more useful than absorbing it quietly, because the next generation will want to know whether narrowing the track further is still nearly free in packaging terms, and this is the part where it stops being free.',
      fail: [
        'Brick-top bond degradation under vapor-space thermal cycling softens the torsion box quietly, carried from Gen 3 and Gen 5; the film strain grid lives on the underside of that joint.',
        'The waisted rear corners put a re-entrant step into a bonded perimeter, and a step is a stress raiser: the corner radius there is 40 mm rather than the 50 the rest of the panel uses, and it is the first place to inspect after any rear impact.',
        'A lid breach is still two faults at once, a moisture path to a sulfide chemistry that makes H2S from water and a vapor leak that drops gallery pressure; the humidity and pressure telltales bracket it from both sides.',
      ],
      explode: [0, 0.78, 0],
    },
    galleries: {
      name: 'Two-phase fluid galleries',
      tagline: 'Where the C-rate actually went: the inter-layer gap closed to 1.1 mm, the boiling channel got confined, and 25 kW of heat authority became 15.',
      mass: 5,
      specs: [
        ['Concept', 'Pool-boiling immersion; 14 mm pool, inter-layer gaps as channels'],
        ['Fluid', 'C6 fluoroketone, ~12 L in pack; ~19 kg on thermal-7\'s ledger'],
        ['Channel gap', '1.1 mm over a 164 mm rise (Gen 5: 1.5 mm over 135)'],
        ['Confinement', 'Gap / capillary length 1.4 against 1.9; CHF ~60% of unconfined'],
        ['Design heat load', '15 kW at the 430 A charge ceiling (Gen 5: 25 at 630)'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'The mechanism is battery-6\'s and it is still the reason this pack can be cooled at all: a wetted surface crossing the fluid\'s saturation point makes vapor, and the latent heat it spends is 88 kJ per kilogram against the 1 or 2 kJ per kilogram-kelvin a single-phase bath moves sensibly. Thermal-7 sets the saturation temperature by owning the gallery pressure, 1.0 bar for 49 °C and 1.8 bar for 68, so a pressure regulator is the thermostat and there are no moving parts inside the envelope. The circuit is the same shape: condensate arrives at the liquid feed, spreads into the pool the bricks stand in, boiling lifts vapor up the inter-brick risers, two headers collect it and hand it back. One coordinate moved and thermal-7 had to follow it. The vapor stub stays exactly at (1.272, 0.268, -0.10), which is where thermal-7 already reaches, its riser flange spanning x 1.296 to 1.308 against this stub\'s 1.297. The liquid feed drops 29 mm, from battery-6\'s built stub at (1.272, 0.147, 0.10) to (1.272, 0.118, 0.10), because the pack floor did. Note that battery-6\'s own text names that stub 0.150 and its geometry puts it at 0.147, which is why this move is 29 mm and not the 32 the prose would have given; interfaces are measured here, not read. This module held the coordinate its pool floor demands and reported the joint rather than editing a partner, and thermal-7 has since dropped its condensate return flange to y 0.118 and gained 10.4 kPa of receiver head doing it. Both joints now close on built geometry.\n\nOne number between these two modules is still open and it belongs on this panel rather than in an integration note. The pool holds about 12 litres, roughly 19 kg, of fluoroketone, and this module books that mass on thermal-7 because thermal-7 owns the fluid. thermal-7 has landed and says that pushes it to 63 kg against a 52 kg target, and offers three ways out: a shallower pool, the fluid moving onto this ledger where the pool physically is, or a mass target that admits what two-phase cooling costs. This pack cannot absorb 19 kg without breaking its own 385, and a shallower pool makes the slosh entry below worse, so the choice is an integration decision and neither module should make it alone. What both can do is refuse to double-count it, and neither does.\n\nThe honest content of this part is the number that got worse. C6 fluoroketone at 49 °C has a capillary length near 0.8 mm, and a boiling channel stops behaving like open pool boiling when its gap approaches that: bubbles bridge the wall spacing instead of departing, vapor slugs form, and the surface periodically dries. Battery-6 ran a 1.5 mm gap over a 135 mm rise, a gap-to-capillary ratio near 1.9 and comfortably unconfined. This pack spent 0.4 mm of that gap on cathode, so the gap is 1.1 mm and the rise is 164, the ratio is 1.4, and there is 21 percent more channel for the vapor to climb. Confined-channel critical heat flux in that regime runs roughly 60 percent of the unconfined value, so the design heat load falls from 25 kW to 15 even though the string resistance improved from 63 to 54 mΩ. Put in the usual units, battery-6 was a 3.2 C pack, 480 kW over 150 kWh, and this is a 1.4 C one, 260 kW over 190, with the charge rate falling from 3.4 C to 1.8. That is what a lower power-to-energy ratio means physically. It is not a marketing decision to rate the pack softer, it is that the geometry which bought the energy took the cooling headroom, and the ceiling it sets is on the disconnect part in amps.',
      why: 'Five kilograms of dry plumbing rated for 15 kW is worse authority per kilogram than battery-6\'s 3 kg rated for 25, and printing that comparison the right way round matters more here than anywhere else on this pack. Every other line in this module improved. This one paid, and it paid deliberately: at cruise the string dissipates about 4 watts of ohmic loss, so the boiling ceiling is irrelevant for the entire duration of a record run and only appears at the charger. Spending peak cooling to buy energy is the correct trade for a range car and the wrong one for almost any other, which is exactly the sort of statement this generation exists to make out loud.',
      fail: [
        'Dryout is closer than it was. The design point sits near 60 percent of a critical heat flux that is itself 60 percent of battery-6\'s, so the margin fell by roughly a third, and the acoustic channels listening for the boiling-signature shift went from a nice-to-have to the primary protection during fast charge.',
        'A confined channel dries from the top, because vapor quality rises with height and the last millimetres of a 164 mm channel see the most vapor. The RTD sentinels moved to the layer tops accordingly, and any new dry-corner logic has to be validated there rather than at the pool line.',
        'The pool is 14 mm deep and the floor dropped 29 mm without deepening it much, so a long grade or sustained lateral g still shifts it and an uncovered brick base still loses nucleation exactly when regen is loading the string. The floor ribs remain the baffles and the derate ladder still trips on the sentinels.',
      ],
      explode: [0, -0.35, 0],
    },
    sensefilm: {
      name: 'Cell-edge sensing film',
      tagline: 'The Gen 3 wallpaper again, with its temperature grid moved up the channel to where a confined boiler actually dries out.',
      mass: 3,
      specs: [
        ['Construction', 'Printed polyimide laminate across all five brick tops'],
        ['Voltage taps', '210, one per layer (unchanged from Gen 5)'],
        ['Temperature', '340 printed RTD points, 210 of them at channel top'],
        ['Strain', '30 bridges on band hoops and bond lines'],
        ['Acoustics', '20 piezo channels watching boiling regime (Gen 5: 12)'],
        ['Maturity', 'Pilot line (lineage: Gen 3, Gen 5)'],
      ],
      how: 'The observability problem is battery-3\'s and unchanged: 41 of every 42 layers in a bipolar brick have no external terminal, so each brick laminates tap foils from its internal plates to its top edge and this film lands on all 210 as it rolls across the field. The playbook carries over whole, weekly EIS sweeps at rest, mid-frequency impedance rise as the weeks-early dendrite flag, and electrical and mechanical witnesses cross-checking so a lying sensor is caught by a disagreeing neighbour. What this pack adds is density where its new failure mode lives. Battery-6 spent 260 RTD points on a field cooled by an unconfined pool; this pack has one RTD per layer at the top of its boiling channel, because a confined channel dries from the top down and an average brick temperature is exactly the wrong measurement for that.\n\nThe acoustic set grew from 12 channels to 20 for the same reason and it is now doing primary work rather than secondary. Nucleate boiling has a broadband crackle whose spectrum shifts as vapor generation climbs toward departure, and in a 1.1 mm channel that shift arrives before any temperature does, because the wall is still wetted intermittently while the mean temperature looks fine. The film hears the transition, the top-of-channel RTDs confirm it, and the disconnect derates the charge current. Three witnesses for one failure is the same architecture Gen 3 argued for, aimed at the one thing this generation made worse.',
      why: 'A pack with no parallel paths, no service access and a structural duty gets exactly one protection layer, which is foresight, and the sensing has to be as distributed as the risk. The risk moved this generation: the electrical margins got better, the thermal margin got worse, and a sensor set that had not followed that shift would have been measuring the last generation\'s pack. One kilogram of extra film is the lightest addition in this module and it is buying the thing the module made most fragile.',
      fail: [
        'The film bonds under the floor-lid, so a recycling debond destroys it by design and a mid-life panel cut almost certainly tears it, carried from Gen 3 with a larger nervous system at stake.',
        'Printed RTDs drift as the substrate ages, and 340 of them drift at 340 different rates; the EIS trace remains the independent witness and a thermally plausible but impedance-inconsistent reading flags the sensor rather than the cell.',
        'The acoustic channels are cleanest when the car is still, and confined-channel dryout is a charging failure rather than a driving one, which is convenient rather than designed: the classifier runs wide guard bands on the move and leans on the top-of-channel RTDs there.',
      ],
      explode: [0, 0.55, 0],
    },
    disconnect: {
      name: 'Semiconductor disconnect',
      tagline: 'Carried a third time and deliberately not shrunk: the current fell by half, the voltage class did not, and short-circuit withstand sets the die.',
      mass: 4,
      specs: [
        ['Switch', 'Back-to-back SiC banks, 1,200 V class (lineage: Gen 2, 3, 5)'],
        ['On-resistance', '0.9 mΩ; 93 W at drivetrain-7\'s 321 A peak (Gen 5: 315 W)'],
        ['DC charge ceiling', '430 A, 348 kW at 810 V (Gen 5: 630 A, 510 kW)'],
        ['Turn-off', '< 10 µs'],
        ['Backup', 'Pyro fuse + manual service disconnect, under the hatch'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The device is battery-6\'s, and carrying it unchanged when the duty halved is the decision worth explaining. Drivetrain-7 peaks at 260 kW, which is 321 A at 810 V nominal, against drivetrain-6\'s 480 kW and 593 A, so conduction loss falls from 315 W to 93 and the obvious move is to shrink the silicon. It was not shrunk, for two reasons that have nothing to do with nominal current. The string still charges to 861 V, so the die is still 1,200 V class with inductive margin. And the die area of a disconnect is set by what it survives, not what it carries: a bolted short still has to be cut in under 10 µs before busbar inductance lets the fault climb past roughly 1,500 A, and that number is a property of the pack, not of the motor. A smaller switch would have saved perhaps a kilogram and made the one component whose job is to end every other component\'s bad day into the marginal one.\n\nThe charge ceiling is this part\'s honest number and it is a real loss. hv-4\'s port geometry and its own spec carry 630 A of DC pin capability, and battery-6 used all of it: 510 kW at 810 V. This pack stops at 430 A, because 430 A through a 54 mΩ string is 10 kW of ohmic heat and roughly 15 with polarisation, which is precisely the confined-channel ceiling the galleries part derives. 348 kW instead of 510. In practice, 500 miles is 52.5 kWh at this car\'s 105 Wh/mi, so it takes 9 minutes to add rather than 6. A 10 to 80 percent fill is 133 kWh, about 23 minutes at the ceiling and nearer 25 with taper, against about 16 if this pack could still take 510 kW and about 13 for battery-6\'s smaller 105 kWh fill at that rate. A 190 kWh pack fills slowly in absolute terms even before its C-rate drops, and both effects point the same way. The hand-off choreography with hv-4 is unchanged: the 48 V ring boots the computers, the computers check isolation, then this switch ramps the string onto the bus, and its pack feed leaves the hatch at (-1.13, 0.315, 0.38).',
      why: 'Two hundred amps of hv-4\'s charging capability are now stranded, and that is the shape of the whole generation in one line: a car optimised for one number gives up capability that a different car would have used. It is worth saying that the stranded capability is in the fastest-changing part of the system, so a later pack with a better boiling channel could take it back without touching hv-4 or the port. The pack is the limit here, not the infrastructure, and that is the correct place for a limit to sit.',
      fail: [
        'Fails short, not open, carried and unchanged since Gen 2: an unclearable fault escalates to the pyro fuse, which is not resettable, an hour at the hatch to replace.',
        'The cold plate shares the gallery liquid, so a drained gallery takes disconnect cooling with it; die temperature sits ahead of pool level in the trip chain, carried from Gen 3 for exactly this case.',
        'The 430 A ceiling is enforced in firmware against a thermal model, not by a fuse, so a model that is wrong in the optimistic direction is a dryout event rather than a nuisance trip. The acoustic and top-of-channel witnesses are what stop that, and they are the reason the ceiling is stated as a derived number rather than a datasheet one.',
      ],
      explode: [0, 0.5, 0.3],
    },
    strikeshield: {
      name: 'Underfloor strike shield',
      tagline: 'The bill for 29 mm of floor: 3.5 square metres of pack now sits at the strike plane, so it wears titanium.',
      mass: 11,
      specs: [
        ['Material', '0.7 mm Ti-6Al-4V sheet, folded edge flanges, 26 flush fasteners'],
        ['Coverage', 'x -1.29 to 1.30, 3.53 m2, underside y 0.1025'],
        ['Rated', '2.5 kJ blunt strike, road debris at 110 km/h with no standoff'],
        ['Aero', 'Two 26 mm underbody steps become 3.5 mm; ~2 counts, NOT audited'],
        ['Ancestor', 'None: battery-3 through battery-6 had no shield'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Dropping the pack floor from y 0.132 to 0.1025 does not lower the car. Body-7\'s floor strakes were already at 0.1025 and its venturi closeouts at 0.106, so this shield lands in the plane of the lowest underbody surface the car already had, and ground clearance is unchanged to the millimetre. The change is entirely one of exposure: road debris that used to pass 26 mm under a recessed pan now meets a working surface. The shield is what that costs. Titanium rather than aluminium because the failure mode is a point strike rather than a distributed load, and Ti-6Al-4V holds roughly three times the specific yield of a 6000-series sheet in the thickness where a skid plate lives. At 4,430 kg/m3, 0.7 mm is 3.10 kg per square metre, and the shield covers 3.53 m2 once the waisted rear panel is counted, so the sheet is 10.9 kg and the 26 flush fasteners take the part to 11. The edge flanges are folded from the same sheet rather than added to it, which is why they are not a separate line in that sum. They bolt up to the rocker bond rails at |z| 0.72, the only structure along the pack sides stiff enough to take a strike load into the body rather than into the pan, and they overlap the shield skin inboard so the panel hangs off structure at both edges instead of off the pan. The fasteners are countersunk into the 3.5 mm shield stack and sit inside its thickness, because a bolt head standing proud into the boundary layer on a car that just spent a generation on drag would be an unforced error. The skin is not flat either, and it cannot be: 0.7 mm of sheet spanning 1.2 metres between edge flanges drums. Five stiffening beads 45 mm wide and 2 mm deep run the length of the panel and two more form the fastener lands, and every one of them is pressed UP into the 3.5 mm stack rather than down into the airstream, so the lowest surface on the car is still an unbroken land at y 0.1025. The 26 heads sit in the two lands with their faces at y 0.10295, which is 0.45 mm above the surrounding skin and 1.55 mm inside the stack: flush in the sense that matters aerodynamically, and visible from underneath, which a head buried inside a plate is not.\n\nWhat the flatter floor gives back is an aero item, and it is deliberately not claimed in this generation\'s efficiency model. Two full-width 26 mm steps, one rearward-facing at x 1.32 and one forward-facing at x -1.315, are the kind of feature a venturi floor is most sensitive to, and cutting them to 3.5 mm should be worth something like 2 counts on body-7\'s audited Cd of 0.118, which is about 1.0 Wh/mi at 65 mph and 18 miles of range. The word should is doing real work in that sentence, and so is the 3.5 mm that stays: the step is reduced, not deleted, because the strake plane and the closeout plane are not the same plane. Body-7\'s 0.118 came from an independent audit that did not model either step, so this module states the estimate, states its basis, and asks the integrator to leave it out of the efficiency-model entries until an audit puts it in. A range generation that adds unaudited counts to its own headline is the exact failure this brief warned about.',
      why: 'This is the only part on the pack that stores no energy and it exists because the volume grab created a hazard rather than because the pack needed it, which makes it the cleanest statement of what the 40 kWh actually cost. Eleven kilograms is 3.2 miles of range at this car\'s 0.29 miles per kilogram, against the 361 the energy returns. The trade is not close, and the reason to run the arithmetic anyway is that it is the same arithmetic that would have said no to a heavier answer, and it has to be run before the answer is known rather than after.',
      fail: [
        'A shield that takes a hard strike protects the pack and hides the evidence: titanium dents without tearing, so the damage is under an intact-looking panel. Any strike heavy enough to be felt mandates dropping the shield, which is an hour on a lift and 26 fasteners.',
        'Titanium against an aluminium rocker rail is a galvanic couple wherever moisture bridges them, the same problem the carbon lid solved with an isolation ply; the edge flanges carry a glass ply and a sealed fastener, and a damaged one starts slow attack on the rail flange rather than on the shield.',
        'The shield is a thermal blanket over a pack that boils its coolant, worth roughly 2 °C of pool temperature at sustained fast charge. It is inside thermal-7\'s margin, but it is a real term and it did not exist before this part did.',
      ],
      explode: [0, -0.62, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────
   New envelope, superseding design/gen4.md's battery row for this module:
     x [-1.29, 1.30], y [0.1025, 0.308], z [-0.71, 0.71]
     narrowing to |z| 0.615 aft of x -1.00 (wheels-7 rear corner)

   Datum warning: lib.plate(w, d, t, r, mat) puts its slab between y + t/2
   and y + 3t/2, so the constant below is NOT the underside. Every height in
   this table is a MEASURED world y. Vertical stack, bottom to top:
     0.1025  strike shield underside, level with body-7's floor strakes and
             3.5 mm under its venturi closeout plane at 0.106
     0.1045  swage floor. The shield skin is a formed panel: its five
             stiffening beads and its two fastener lands press 2 mm UP into
             the 3.5 mm stack, never down into the airstream, so the lowest
             surface on the car is still an unbroken 0.1025 land
     0.1060  shield top (0.5 mm bonded overlap into the pan)
     0.1055  pan underside
     0.1095  pan top, and the foot of the 35 mm pool retaining wall
     0.1075  pool floor (the fluid wets 2 mm into the pan section)
     0.1115  brick bottom, 2.0 mm over the pan top and carried on the band
             bottom legs, whose inner face is this plane. The slotted pool
             baffles stand in the riser gaps between bricks, not under them,
             and they run to 0.1275, so nothing here rests on a rib
     0.1215  pool surface (14 mm pool, brick 10 mm submerged)
     0.2755  brick top
     0.2775  sensing film top
     0.2900  floor-lid skin underside
     0.2995  rocker rail top, and the plane the floor-lid's bonded perimeter
             land now sits on
     0.3020  floor-lid skin top (identical to battery-6, so hv-4's hatch
             feed at (-1.13, 0.315, 0.38) lands exactly where it did)
     0.3080  seat rail tops, the pack's highest geometry (battery-6: same)

   THE DETAIL PASS. Not one datum in that table moved and not one kilogram
   in the ledger moved. What changed is that every part now carries the
   features a made one would: the rocker rail is a real three-chamber
   extrusion with its section open at both ends instead of a plain box, the
   preload bands are continuous wound hoops instead of four disconnected
   legs, the 210 bipolar layers are chamfered so the stack reads as
   laminations, the pool has a wall, the spigots have flanges and bolts, the
   disconnect has a manual service handle with a lockout, and the strike
   shield is one continuous formed panel with stiffening beads rather than
   two flat plates. Every addition was ray-tested against the rest of the
   pack and against the preset partners: the results are at the foot of the
   file. */

const SHIELD_Y = 0.10075;   // plate datum: underside lands at 0.1025
const PAN_Y = 0.1035;
const POOL_Y = 0.1075;
const POOL_T = 0.014;
const BRICK_Y0 = 0.1115;
const BRICK_H = 0.164;
const BRICK_Y = BRICK_Y0 + BRICK_H / 2;      // 0.1935
const BRICK_L = 0.42, BRICK_W = 1.30;
const LID_Y = 0.284;
const RAIL_TOP = 0.2995;                     // measured rocker rail top

/* five bricks along x on battery-6's pitch; the rear bay behind the last
   brick keeps the disconnect, the film aggregator and the fill hardware */
const BX = [-0.76, -0.312, 0.136, 0.584, 1.032];
const GAPX = [-0.536, -0.088, 0.36, 0.808];
const LAYERS = 42, LPITCH = 0.010, LAYER_T = 0.0089;
const PLATE_T = 0.008;                       // brick end plate thickness
const PLATE_FACE = 0.213 + PLATE_T / 2;      // 0.217, outer face from brick centre

/* the waist: aft of WAIST_X nothing static may sit outboard of WAIST_Z.
   Drawn before wheels-7 existed, from the gen7 contract flange face at
   |z| 0.65 minus a 2.5 mm tyre-inboard offset, 18.6 mm of assumed rear-steer
   sweep and 14 mm liner clearance. Re-verified against wheels-7 as built:
   its rear tyre inner face is |z| 0.6625, the ±3 degree sweep takes it to
   0.646, so this waist clears the swept tyre by 31 mm. It holds. */
const WAIST_X = -1.00;
const WAIST_Z = 0.615;
const REAR_X = -1.29;

/* ── Local detail helpers ─────────────────────────────────────────────
   None of these move a datum. They exist so a fabricated part reads as
   folded sheet, an extrusion reads as an extrusion, and a bolted joint
   reads as bolted. Sections are written in WORLD coordinates: a section
   drawn for extrudeX is a list of [z, y] pairs at the world heights and
   half-widths the part actually occupies, so a reader can check a number
   against the stack table above without doing any arithmetic. */

/* Closed rounded-rectangle outline, centred on the local origin. */
function rrect(w, h, r, seg = 2) {
  const hw = w / 2, hh = h / 2, rr = Math.max(0, Math.min(r, hw, hh));
  if (rr < 1e-6) return [[hw, -hh], [hw, hh], [-hw, hh], [-hw, -hh]];
  const p = [];
  const arc = (cx, cy, a0) => {
    for (let i = 0; i <= seg; i++) {
      const a = a0 + (Math.PI / 2) * (i / seg);
      p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
  };
  arc(hw - rr, -hh + rr, -Math.PI / 2);
  arc(hw - rr, hh - rr, 0);
  arc(-hw + rr, hh - rr, Math.PI / 2);
  arc(-hw + rr, -hh + rr, Math.PI);
  return p;
}

function shapeOf(outline, holes) {
  const trace = (path, pts) => {
    path.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) path.lineTo(pts[i][0], pts[i][1]);
    path.closePath();
  };
  const s = new THREE.Shape();
  trace(s, outline);
  for (const h of holes || []) { const p = new THREE.Path(); trace(p, h); s.holes.push(p); }
  return s;
}

/* Extrude a section drawn in the world XY plane along +Z, from z = 0. */
function extrudeZ(outline, holes, len, mat, creaseDeg = 30) {
  const geo = new THREE.ExtrudeGeometry(shapeOf(outline, holes),
    { depth: len, bevelEnabled: false, curveSegments: 2 });
  const m = lib.mesh(geo, mat);
  return creaseDeg ? lib.crease(m, creaseDeg) : m;
}

/* Extrude a section drawn as world [z, y] pairs along +X, from x = 0.
   rotateY(+90) maps local z to world x and local x to world -z, so the
   section is negated on the way in and the caller's numbers are the world
   ones. Only the x placement is left to the caller. */
function extrudeX(outlineZY, holesZY, len, mat, creaseDeg = 30) {
  const flip = (a) => a.map(([z, y]) => [-z, y]);
  const geo = new THREE.ExtrudeGeometry(shapeOf(flip(outlineZY), (holesZY || []).map(flip)),
    { depth: len, bevelEnabled: false, curveSegments: 2 });
  geo.rotateY(Math.PI / 2);
  const m = lib.mesh(geo, mat);
  return creaseDeg ? lib.crease(m, creaseDeg) : m;
}

/* A hex head with its seating face on y = 0, growing +Y, 24 triangles
   against lib.fastener's 80. Used only where a bank runs to dozens of
   heads and the silhouette is all that reads at that size. */
function hexHead(r, h, mat) {
  const m = lib.mesh(new THREE.CylinderGeometry(r * 0.88, r, h, 6), mat);
  m.position.y = h / 2;
  const g = new THREE.Group();
  g.add(m);
  return g;
}

/* Countersunk flush head: the visible disc is on y = 0 and the shank sinks
   -Y, so the caller seats it on the face it is flush with. */
function cskHead(r, t, mat, socket) {
  const g = new THREE.Group();
  const h = lib.mesh(new THREE.CylinderGeometry(r, r * 0.5, t, 12), mat);
  h.position.y = -t / 2;
  g.add(h);
  const s = lib.mesh(new THREE.CylinderGeometry(r * 0.44, r * 0.44, t * 0.5, 6),
    socket || M.darkSteel);
  s.position.y = -t * 0.24;
  g.add(s);
  return g;
}

/* The strike shield's plan outline: half-width against x, interpolated
   linearly so the panel's own stations ARE its outline and nothing between
   them can bulge past |z| 0.700 or past the waist at 0.610. */
const SHIELD_STA = [
  [-1.290, 0.560], [-1.272, 0.600], [-1.150, 0.610], [-1.000, 0.610],
  [-0.955, 0.632], [-0.890, 0.700], [-0.400, 0.700], [0.200, 0.700],
  [0.800, 0.700], [1.230, 0.700], [1.278, 0.686], [1.300, 0.648],
];
const SK_LO = 0.1025, SK_HI = 0.1060, SK_ROLL = 0.0009;
const SK_NB = 10;                 // bottom-edge intervals: 11 ring points
const SK_FAST_T = 0.857;          // fastener land, as a fraction of half-width

function shieldHalf(x) {
  const S = SHIELD_STA;
  if (x <= S[0][0]) return S[0][1];
  for (let i = 1; i < S.length; i++) {
    if (x <= S[i][0]) {
      const f = (x - S[i - 1][0]) / (S[i][0] - S[i - 1][0]);
      return S[i - 1][1] + f * (S[i][1] - S[i - 1][1]);
    }
  }
  return S[S.length - 1][1];
}

export function build() {
  const sys = new THREE.Group();

  /* ── bricks: 210 instanced bipolar layers in five stacks, machined
     terminal end plates with tie bosses, laminated flexible links across
     the riser gaps because a brick breathes 22.5 mm and a rigid bar would
     tear, the two string terminals with their insulation boots, and the
     front take-off into the rail raceway ── */
  const bricks = lib.part('bricks', [0, 0.34, 0]);
  /* Chamfered 0.8 mm on every edge. That is the whole difference between a
     block and a stack: a 1.1 mm inter-layer channel plus two 0.8 mm
     chamfers is a 2.7 mm shadow line at every one of the 210 pitches, and
     it costs 44 triangles per layer against a plain box's 12. */
  const layerGeo = lib.cbox(LAYER_T, BRICK_H, BRICK_W, 0.0008, M.cell).geometry;
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
  inst.instanceMatrix.needsUpdate = true;
  bricks.add(inst);
  /* End plates. 8 mm machined steel, chamfered, outer face at |x - cx|
     0.217 so the band leg lands on it rather than through it. The two
     outermost plates carry the tie bosses and the terminals; the eight
     inner ones sit 14 mm from their neighbour and get the chamfer only. */
  for (const cx of BX) {
    for (const xs of [-1, 1]) {
      const plate = lib.cbox(PLATE_T, BRICK_H, BRICK_W, 0.0015, M.steel);
      plate.position.set(cx + xs * 0.213, BRICK_Y, 0);
      bricks.add(plate);
      const outer = (cx === BX[0] && xs < 0) || (cx === BX[BX.length - 1] && xs > 0);
      if (!outer) continue;
      for (const bz of [-0.56, -0.19, 0.19, 0.56]) {
        const boss = lib.cyl(0.011, 0.007, M.steel, 8);
        boss.rotation.z = Math.PI / 2;
        boss.position.set(cx + xs * (PLATE_FACE + 0.0035), BRICK_Y, bz);
        bricks.add(boss);
        const nut = hexHead(0.007, 0.005, M.darkSteel);
        nut.rotation.z = xs > 0 ? -Math.PI / 2 : Math.PI / 2;
        nut.position.set(cx + xs * (PLATE_FACE + 0.007), BRICK_Y, bz);
        bricks.add(nut);
      }
    }
  }
  /* Series links across the riser gaps. Three 6 mm copper laminations
     between two clamp bars: the stack has to take 22.5 mm of breathing per
     brick across four gaps, so the link is deliberately compliant and is
     drawn that way. The clamp bars are 30 mm across a 90 mm lamination so
     that 30 mm of every foil stands clear of them at each end, which is the
     only reason any of this is visible through a 14 mm slot. */
  for (const gx of GAPX) {
    for (const zz of [-0.35, 0.35]) {
      for (let i = 0; i < 3; i++) {
        const foil = lib.cbox(0.026, 0.006, 0.090, 0.0010, M.busbar);
        foil.position.set(gx, BRICK_Y + (i - 1) * 0.038, zz);
        bricks.add(foil);
      }
      for (const xs of [-1, 1]) {
        const clamp = lib.cbox(0.005, 0.122, 0.030, 0.0010, M.busbar);
        clamp.position.set(gx + xs * 0.0045, BRICK_Y, zz);
        bricks.add(clamp);
      }
      for (const cs of [-1, 1]) {
        const nut = hexHead(0.006, 0.005, M.darkSteel);
        nut.rotation.x = cs > 0 ? Math.PI / 2 : -Math.PI / 2;
        nut.position.set(gx, BRICK_Y, zz + cs * 0.015);
        bricks.add(nut);
      }
    }
  }
  /* The two ends of the 210s string. Moulded standoff, bolted copper lug,
     hex nut, orange boot: the only two places in the pack where 810 V
     leaves a brick, so they are the only two that get a boot. */
  for (const [tcx, txs, tz] of [[BX[BX.length - 1], 1, 0.52], [BX[0], -1, -0.52]]) {
    const face = tcx + txs * PLATE_FACE;
    const stand = lib.cyl(0.019, 0.012, M.plasticLt, 12);
    stand.rotation.z = Math.PI / 2;
    stand.position.set(face + txs * 0.006, 0.24, tz);
    bricks.add(stand);
    const lug = lib.cbox(0.006, 0.030, 0.024, 0.0012, M.busbar);
    lug.position.set(face + txs * 0.015, 0.24, tz);
    bricks.add(lug);
    const nut = hexHead(0.007, 0.006, M.darkSteel);
    nut.rotation.z = txs > 0 ? -Math.PI / 2 : Math.PI / 2;
    nut.position.set(face + txs * 0.018, 0.24, tz);
    bricks.add(nut);
    /* the boot goes on the cable end of the joint, not over the whole
       terminal: a sleeve over all four pieces is four pieces nobody sees */
    const boot = lib.cyl(0.011, 0.016, M.hv, 12);
    boot.rotation.z = Math.PI / 2;
    boot.position.set(face + txs * 0.032, 0.24, tz);
    bricks.add(boot);
  }
  /* HV warning, extruded rather than printed: a decal has no rim for a
     softbox to find and this one sits on the face a technician meets first
     when the front closeout comes off. */
  const warnTri = [[-0.030, -0.020], [0.030, -0.020], [0.0, 0.032]];
  const warnBolt = [[-0.004, -0.010], [0.007, 0.006], [0.001, 0.006],
                    [0.006, 0.019], [-0.007, 0.002], [-0.001, 0.002]];
  const warn = lib.badge(warnTri, 0.0018, M.busbar, { holes: [warnBolt] });
  warn.rotation.y = Math.PI / 2;
  warn.position.set(BX[BX.length - 1] + PLATE_FACE, 0.185, 0.10);
  bricks.add(warn);
  bricks.add(lib.tube(
    [[1.283, 0.24, 0.52], [1.256, 0.270, 0.64], [1.245, 0.2845, 0.706]],
    0.008, M.hv
  ));
  sys.add(bricks);

  /* ── preload bands: three filament-wound carbon hoops per brick. One
     continuous rounded hoop per station rather than four separate legs: the
     corner radius is the whole visual difference between a wound band and a
     welded frame, and the envelope is unchanged to the tenth of a
     millimetre. The bottom leg runs in the pan section: the pan top is
     0.1095 and the brick bottom is 0.1115, so a 5 mm leg passing under the
     brick cannot also sit on the pan, and it is drawn 3.0 mm into the 4 mm
     pan the way a moulded channel would take it. The tow overwrap sits on
     the top leg where the winding terminates, offset 100 mm forward of the
     hoop centre so it misses the floor-lid stiffener crowns at 0.2830 ── */
  const bands = lib.part('bands', [0, 0.18, 0]);
  const hoopOut = rrect(0.444, 0.176, 0.014, 3);
  /* Inner corner radius 1.5 mm, matching the end plate's own chamfer rather
     than the 9 mm this was first drawn with. A 9 mm inner fillet over a
     square-cornered brick swallows the four end-plate corners by up to
     1.9 mm at every one of the sixty band-to-brick corners. */
  const hoopIn = rrect(0.434, 0.166, 0.0015, 3);
  for (const cx of BX) {
    for (const bz of [-0.45, 0, 0.45]) {
      /* outer 0.444 x 0.176 about (cx, 0.1945): y 0.1065 to 0.2825, the
         same two faces the four boxes closed on before */
      const hoop = extrudeZ(hoopOut.map(([a, b]) => [a + cx, b + BRICK_Y + 0.001]),
        [hoopIn.map(([a, b]) => [a + cx, b + BRICK_Y + 0.001])], 0.026, M.carbon, 35);
      hoop.position.set(0, 0, bz - 0.013);
      bands.add(hoop);
      /* tow overwrap: the winding starts and finishes here and the band is
         locally two plies thicker. 1.2 mm proud, which keeps the hoop under
         the 2.5 mm of clear air between it and the floor-lid stiffeners. */
      const wrap = lib.cbox(0.056, 0.0024, 0.030, 0.0008, M.carbon);
      wrap.position.set(cx - 0.10, 0.2837, bz);
      bands.add(wrap);
    }
  }
  sys.add(bands);

  /* ── rocker bond rails: carried from battery-3, 26 mm deeper because the
     floor dropped, 20 mm shorter at the rear because the track narrowed.
     Drawn for the first time as the extrusion it has always been: a real
     three-chamber 196 x 60 section with 2.7 mm walls, open at both ends so
     the chambers read. Bond bead inboard, flow-drill screws on top, 810 V
     return raceway on the passenger side only ── */
  const RAIL_L = 2.14, RAIL_X0 = -1.06;
  const RW = 0.0027;                       // wall
  const rz = 0.030, ry = 0.098;            // half section
  const chamber = (ry - RW - RW / 2) * 2 / 3;   // three equal chambers
  for (const zs of [-1, 1]) {
    const rr = lib.part('rockerrails', [0, 0.06, zs * 0.55]);
    const zc = zs * 0.75, yc = 0.2015;
    const sec = (dz, dy, r) => rrect(dz, dy, r, 2).map(([a, b]) => [a * zs + zc, b + yc]);
    const holes = [];
    for (const cy of [-(chamber + RW / 2 + RW), 0, chamber + RW / 2 + RW]) {
      holes.push(rrect(2 * (rz - RW), chamber, 0.003, 2)
        .map(([a, b]) => [a * zs + zc, b + cy + yc]));
    }
    const rail = extrudeX(sec(2 * rz, 2 * ry, 0.005), holes, RAIL_L, M.alu, 30);
    rail.position.x = RAIL_X0;
    rr.add(rail);
    /* Structural adhesive bead on the inner face, raised above the strike
       shield's edge flange which now bolts to the lower 40 mm of that face. */
    const bead = extrudeX([
      [zs * 0.7020, 0.1550], [zs * 0.7195, 0.1550], [zs * 0.7195, 0.2850],
      [zs * 0.7020, 0.2850], [zs * 0.6980, 0.2650], [zs * 0.6980, 0.1750],
    ], null, 2.08, M.plastic, 40);
    bead.position.x = -1.03;
    rr.add(bead);
    /* 28 flow-drill screws per side into the body rocker, seated on the
       measured rail top at 0.2995 and pulled outboard to |z| 0.765 so the
       floor-lid's bonded perimeter land does not bury them. */
    for (let i = 0; i < 28; i++) {
      const sx = -1.03 + i * (2.06 / 27);
      const screw = hexHead(0.0055, 0.0042, M.darkSteel);
      screw.position.set(sx, RAIL_TOP, zs * 0.765);
      rr.add(screw);
    }
    if (zs > 0) {
      /* The 810 V return: a copper bar in an orange insulation channel,
         clipped to the rail inner wall every 300 mm. Centred on y 0.2775,
         not 0.284: the floor-lid skin's underside is 0.2900 and its bonded
         perimeter land runs 0.2950 to 0.2995 over this same |z| band, and a
         raceway on 0.284 puts the jacket 2.5 mm and the clips 3.1 mm into
         the panel it hangs under. The clip tops now measure 0.2885. */
      const jacket = lib.cbox(2.14, 0.022, 0.012, 0.0015, M.hv);
      jacket.position.set(0.01, 0.2775, 0.7135);
      rr.add(jacket);
      const conductor = lib.cbox(2.14, 0.012, 0.005, 0.0008, M.busbar);
      conductor.position.set(0.01, 0.2775, 0.7105);
      rr.add(conductor);
      for (let i = 0; i < 8; i++) {
        const clip = lib.cbox(0.014, 0.030, 0.020, 0.0012, M.plasticLt);
        clip.position.set(-1.00 + i * 0.29, 0.2735, 0.7175);
        rr.add(clip);
      }
    }
    sys.add(rr);
  }

  /* ── floor-lid: carbon sandwich, full width to WAIST_X then waisted for
     wheels-7's rear corner, a bonded perimeter land that actually reaches
     the rocker rail tops it is bonded to, real top-hat stiffeners under the
     skin, C-section seat rails with their potted-insert hardware visible
     through the slot, the rear-bay service hatch in a machined landing rim
     at hv-4's feed coordinate, and two flanged burst discs ── */
  const lid = lib.part('floorlid', [0, 0.78, 0]);
  const panel = lib.plate(2.29, 1.42, 0.012, 0.05, M.carbon);
  panel.position.set(0.145, LID_Y, 0);
  lib.shell(panel);
  lid.add(panel);
  const panelR = lib.plate(0.29, 2 * WAIST_Z, 0.012, 0.04, M.carbon);
  panelR.position.set(-1.145, LID_Y, 0);
  lib.shell(panelR);
  lid.add(panelR);
  /* The bonded perimeter. Until this pass the lid stopped at |z| 0.710 and
     the rail it is bonded to starts at 0.720, so the joint the content
     describes had a 10 mm air gap in it. The land is the sandwich panel's
     solid laminate edge: the core tapers out and the skins close down onto
     the rail top at 0.2995. It stops at |x| 1.04 because body-7's front
     fairing occupies |z| 0.693 to 0.894 from x 1.05 forward. */
  for (const zs of [-1, 1]) {
    /* The core taper finishes at |z| 0.7180, just inboard of the rail's
       inner face at 0.7200, and the land is FLAT on 0.2995 from there
       outboard. Run the taper all the way to 0.7440 instead and its
       underside is below the rail top everywhere over the rail: the first
       draft cut 1.9 mm into the rail it is meant to sit on. */
    const land = extrudeX([
      [zs * 0.6980, 0.2950], [zs * 0.7180, 0.2995], [zs * 0.7440, 0.2995],
      [zs * 0.7440, 0.3020], [zs * 0.6980, 0.3020],
    ], null, 2.08, M.carbon, 30);
    land.position.x = -1.04;
    lid.add(land);
    /* the bondline, with its squeeze-out bead on the inboard side where a
       technician looking up into the pack would see it */
    const bond = extrudeX([
      [zs * 0.7000, 0.2978], [zs * 0.7195, 0.2985], [zs * 0.7195, 0.2995],
      [zs * 0.7000, 0.2995], [zs * 0.6975, 0.2988],
    ], null, 2.08, M.plastic, 40);
    bond.position.x = -1.04;
    lid.add(bond);
  }
  /* Top-hat stiffeners, bonded to the lid underside where the 12.5 mm
     between the skin at 0.290 and the sensing film at 0.2775 actually is.
     They used to be flat bars buried 6 mm inside the skin they stiffen. */
  for (const hx of [-0.5, 0.1, 0.7]) {
    const hat = extrudeZ([
      [hx - 0.030, 0.2900], [hx - 0.030, 0.2885], [hx - 0.0215, 0.2885],
      [hx - 0.0215, 0.2830], [hx + 0.0215, 0.2830], [hx + 0.0215, 0.2885],
      [hx + 0.030, 0.2885], [hx + 0.030, 0.2900],
    ], null, 1.30, M.carbon, 30);
    hat.position.z = -0.65;
    lid.add(hat);
  }
  /* Seat rails: a C-section with a 16 mm slot, so the potted-insert bolts
     that carry the seat load into the brick tops are visible where a real
     one shows them, and the rail top stays on 0.3080. */
  for (const zz of [-0.52, -0.28, 0.28, 0.52]) {
    const rail = extrudeX([
      [zz - 0.0225, 0.3010], [zz + 0.0225, 0.3010], [zz + 0.0225, 0.3080],
      [zz + 0.0080, 0.3080], [zz + 0.0080, 0.3062], [zz + 0.0165, 0.3062],
      [zz + 0.0165, 0.3028], [zz - 0.0165, 0.3028], [zz - 0.0165, 0.3062],
      [zz - 0.0080, 0.3062], [zz - 0.0080, 0.3080], [zz - 0.0225, 0.3080],
    ], null, 0.75, M.alu, 30);
    rail.position.x = -0.055;
    lid.add(rail);
    for (let i = 0; i < 4; i++) {
      const b = hexHead(0.0062, 0.0028, M.darkSteel);
      b.position.set(0.005 + i * 0.21, 0.3028, zz);
      lid.add(b);
    }
    const pad = lib.cbox(0.10, 0.0044, 0.05, 0.0012, M.alu);
    pad.position.set(-0.80, 0.3032, zz);
    lid.add(pad);
    for (const px of [-0.835, -0.765]) {
      const b = hexHead(0.0055, 0.0026, M.darkSteel);
      b.position.set(px, 0.3054, zz);
      lid.add(b);
    }
  }
  /* Service hatch. A raised machined landing rim, a chamfered cover, eight
     countersunk heads flush in the cover face and an extruded HV warning.
     Everything stays at or under 0.3075: hv-4's pack feed comes down to
     0.3040 at the centre of this panel and interior-6's NVH mat lands on
     0.3020 either side of it. */
  const hboss = lib.cbox(0.300, 0.0016, 0.260, 0.0008, M.alu);
  hboss.position.set(-1.13, 0.3028, 0.38);      /* 0.3020 to 0.3036 */
  lid.add(hboss);
  const gasket = lib.cbox(0.286, 0.0012, 0.246, 0.0004, M.rubber);
  gasket.position.set(-1.13, 0.3042, 0.38);     /* 0.3036 to 0.3048 */
  lid.add(gasket);
  const cover = lib.cbox(0.282, 0.0022, 0.242, 0.0010, M.alu);
  cover.position.set(-1.13, 0.3059, 0.38);      /* 0.3048 to 0.3070, which is
                                                   battery-6's hatch face */
  lid.add(cover);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const f = cskHead(0.0056, 0.0022, M.steel);
    f.position.set(-1.13 + Math.cos(a) * 0.118, 0.3070, 0.38 + Math.sin(a) * 0.098);
    lid.add(f);
  }
  const lidWarn = lib.badge(warnTri.map(([a, b]) => [a * 0.58, b * 0.58]), 0.0010, M.busbar,
    { holes: [warnBolt.map(([a, b]) => [a * 0.58, b * 0.58])] });
  lidWarn.rotation.x = -Math.PI / 2;
  lidWarn.position.set(-1.228, 0.3070, 0.38);   /* 0.3070 to 0.3080, the cap */
  lid.add(lidWarn);
  const pull = lib.cbox(0.044, 0.0010, 0.015, 0.0003, M.darkSteel);
  pull.position.set(-1.040, 0.3075, 0.38);
  lid.add(pull);
  /* Burst discs, rear-facing on the rear wall at x -1.29: a machined boss,
     a bolted retaining ring and the domed rupture disc standing proud of it.
     The stack is ordered by what has to be OUTERMOST. The retaining ring is
     r 18.5 mm and the bolt circle is r 15.8 mm, so a ring whose own rear
     face sits on x -1.29 encloses every bolt head and the disc as well: as
     first drawn it buried twelve heads and two discs, 384 triangles, inside
     itself. The ring now stops at x -1.2868 and the disc and the heads are
     the things on x -1.29. */
  for (const zz of [-0.25, 0.25]) {
    const boss = lib.cyl(0.016, 0.009, M.steel, 14);
    boss.rotation.z = Math.PI / 2;
    boss.position.set(-1.2773, 0.284, zz);   /* x -1.2818 to -1.2728 */
    lid.add(boss);
    const ring = lib.cyl(0.0185, 0.005, M.darkSteel, 14);
    ring.rotation.z = Math.PI / 2;
    ring.position.set(-1.2843, 0.284, zz);   /* rear face x -1.2868 */
    lid.add(ring);
    const disc2 = lib.cyl(0.0115, 0.006, M.steel, 12);
    disc2.rotation.z = Math.PI / 2;
    disc2.position.set(-1.2870, 0.284, zz);  /* rear face flush at x -1.29,
                                                3.2 mm proud of the ring */
    lid.add(disc2);
    const rb = lib.bolts(6, 0.0158, 0.0026, M.darkSteel);
    rb.rotation.z = Math.PI / 2;
    rb.position.set(-1.2882, 0.284, zz);     /* heads -1.28976 to -1.28664,
                                                seated on the ring rear face */
    lid.add(rb);
  }
  sys.add(lid);

  /* ── two-phase galleries: pan with the pool retaining wall it always
     needed, 14 mm pool, slotted baffle ribs and brick pedestals, liquid
     feed manifold with its lowered flanged stub, two vapor headers with
     riser take-offs and clips to the rail rather than a floating tube, and
     the keyed fill standpipe ── */
  const gal = lib.part('galleries', [0, -0.35, 0]);
  const pan = lib.plate(2.29, 1.38, 0.004, 0.04, M.plastic);
  pan.position.set(0.145, PAN_Y, 0);
  gal.add(pan);
  const panR = lib.plate(0.29, 2 * WAIST_Z, 0.004, 0.035, M.plastic);
  panR.position.set(-1.145, PAN_Y, 0);
  gal.add(panR);
  /* The pool retaining wall. 35.5 mm from the pan top at 0.1095, which is
     21 mm of freeboard over a 14 mm pool: the slosh entry on the fail list
     is about lateral g moving the fluid off a brick base, and until this
     pass there was nothing at the pan edge to move it against. */
  const WALL_T = 0.008, WALL_H = 0.0355, WALL_Y = 0.1095 + WALL_H / 2;
  for (const zs of [-1, 1]) {
    const wf = lib.cbox(2.284, WALL_H, WALL_T, 0.0015, M.plastic);
    wf.position.set(0.142, WALL_Y, zs * 0.686);
    gal.add(wf);
    const wr = lib.cbox(0.282, WALL_H, WALL_T, 0.0015, M.plastic);
    wr.position.set(-1.141, WALL_Y, zs * 0.610);
    gal.add(wr);
    const ws = lib.cbox(WALL_T, WALL_H, 0.084, 0.0015, M.plastic);
    ws.position.set(-1.000, WALL_Y, zs * 0.648);
    gal.add(ws);
  }
  const wfront = lib.cbox(WALL_T, WALL_H, 1.372, 0.0015, M.plastic);
  wfront.position.set(1.272, WALL_Y, 0);   /* 1.268 to 1.276: thermal's
                                              condensate riser reaches 1.2788 */
  gal.add(wfront);
  const wrear = lib.cbox(WALL_T, WALL_H, 1.190, 0.0015, M.plastic);
  wrear.position.set(-1.282, WALL_Y, 0);
  gal.add(wrear);
  /* The fluid keeps battery-6's plan, |z| 0.670 and 0.595: the retaining
     wall stands 12 mm outboard of it with bare pan between, because
     wheels-9's front tyre already reaches |z| 0.6625 over x 1.095 to 1.353
     and widening the pool into it would have made an existing overlap
     worse. See the verification notes. */
  const pool = lib.box(2.264, POOL_T, 1.340, M.coolant);
  pool.position.set(0.136, POOL_Y + POOL_T / 2, 0);
  gal.add(pool);
  const poolR = lib.box(0.278, POOL_T, 1.190, M.coolant);
  poolR.position.set(-1.139, POOL_Y + POOL_T / 2, 0);
  gal.add(poolR);
  /* Baffle ribs under the riser gaps, in seven segments so the pool can
     equalise between bays while the segments still break a slosh front. */
  for (const gx of GAPX) {
    for (let i = 0; i < 7; i++) {
      const rib = lib.cbox(0.013, 0.020, 0.164, 0.0015, M.plastic);
      rib.position.set(gx, POOL_Y + 0.010, -0.585 + i * 0.195);
      gal.add(rib);
    }
  }
  gal.add(lib.tube([[1.263, 0.1145, -0.60], [1.263, 0.1145, 0.60]], 0.011, M.coolant));
  /* Liquid feed stub. The barrel is where it has always been, x 1.247 to
     1.297 at (1.272, 0.118, 0.10), because thermal-7 and thermal-9 land
     their condensate flange over it from 1.286. What it gains is the male
     spigot hardware a slip joint has: a shoulder, two O-ring lands and a
     lead-in, all inside x 1.286 where the partner's flange begins. */
  const feed = lib.cyl(0.012, 0.05, M.coolant, 12);
  feed.rotation.z = Math.PI / 2;
  feed.position.set(1.272, 0.118, 0.10);
  gal.add(feed);
  /* Bulkhead collar clamping the pool wall the stub passes through. No bolt
     circle: the annulus between a 24 mm barrel and a 34 mm collar is 5 mm
     and any head that fits in it is a head half inside the pipe. */
  const feedCollar = lib.cbox(0.012, 0.034, 0.034, 0.0015, M.alu);
  feedCollar.position.set(1.272, 0.123, 0.10);    /* x 1.266 to 1.278 */
  gal.add(feedCollar);
  for (const zs of [-1, 1]) {
    gal.add(lib.tube(
      [[-1.00, 0.272, zs * 0.665], [1.19, 0.272, zs * 0.665]],
      0.011, M.coolantHot
    ));
    /* Riser take-offs: the header collects from the inter-brick gaps, so it
       gets a spigot over each one rather than running past them blind. Five
       per side, the four inter-brick gaps and the aft end gap at x -0.984,
       and there is no sixth. A pair was first drawn at x 1.256 over the gap
       ahead of the last brick, which is 58 mm past the end of the header it
       takes off from: it stood in open air on one side and speared the brick
       string take-off on the other. A take-off cannot be forward of its
       header, the header stops at x 1.190 because the crossover turns there,
       and every point on it forward of x 1.099 is inside wheels-9's front
       tyre, so the forward gap vents aft under the lid instead. */
    for (const gx of GAPX.concat([-0.984])) {
      const t = lib.cyl(0.008, 0.016, M.coolantHot, 8);
      t.position.set(gx, 0.264, zs * 0.665);
      gal.add(t);
    }
    /* P-clips to the rail bond bead every 380 mm: the header used to hang
       in air 44 mm off the nearest structure */
    for (let i = 0; i < 6; i++) {
      const cx2 = -0.90 + i * 0.38;
      const clip = lib.cbox(0.014, 0.026, 0.040, 0.0012, M.plasticLt);
      clip.position.set(cx2, 0.272, zs * 0.679);   /* |z| 0.659 to 0.699 */
      gal.add(clip);
    }
  }
  gal.add(lib.tube(
    [[1.19, 0.272, 0.665], [1.235, 0.270, 0.0], [1.19, 0.272, -0.665]],
    0.011, M.coolantHot
  ));
  gal.add(lib.tube([[1.235, 0.270, -0.10], [1.262, 0.268, -0.10]], 0.014, M.coolantHot));
  /* Vapor stub, unmoved at (1.272, 0.268, -0.10) with its face on x 1.297,
     now closing on thermal's riser flange as the bolted pair it is: a
     matched 48 mm flange from 1.284 to 1.296 with four heads on the
     accessible side. thermal-7 and thermal-9 both start theirs at 1.296. */
  const vap = lib.cyl(0.017, 0.05, M.coolantHot, 12);
  vap.rotation.z = Math.PI / 2;
  vap.position.set(1.272, 0.268, -0.10);
  gal.add(vap);
  /* 48 mm across in z to match thermal's, trimmed to 43.5 mm in height: a
     square 48 tops out at y 0.292 and the floor-lid skin's underside is
     0.290, so the corners went into the lid. */
  const vflange = lib.cbox(0.012, 0.0435, 0.048, 0.002, M.alu);
  vflange.position.set(1.290, 0.268, -0.10);
  gal.add(vflange);
  for (const dy of [-0.0155, 0.0155]) {
    for (const dz of [-0.0155, 0.0155]) {
      const b = lib.fastener(0.005, M.darkSteel, 'hex');
      b.rotation.z = Math.PI / 2;
      b.position.set(1.284, 0.268 + dy, -0.10 + dz);
      gal.add(b);
    }
  }
  /* Keyed fill standpipe: threaded collar, hex cap, lockwire tab. */
  const fill = lib.cyl(0.010, 0.16, M.coolant, 12);
  fill.position.set(-1.02, 0.192, 0.30);
  gal.add(fill);
  const collar = lib.cyl(0.014, 0.012, M.alu, 12);
  collar.position.set(-1.02, 0.266, 0.30);
  gal.add(collar);
  const fillCap = lib.mesh(new THREE.CylinderGeometry(0.0115, 0.0135, 0.010, 6), M.plasticLt);
  fillCap.position.set(-1.02, 0.277, 0.30);
  gal.add(fillCap);
  const wireTab = lib.cbox(0.004, 0.006, 0.016, 0.0008, M.darkSteel);
  wireTab.position.set(-1.02, 0.279, 0.316);
  gal.add(wireTab);
  /* Pool level probe. Die temperature sits ahead of pool level in the
     disconnect's trip chain, and this is what reads it. It stands on the pan
     top at 0.1095 rather than starting 5.5 mm above it, and it sits on
     x -1.02 opposite the fill standpipe rather than on -1.05, where the
     disconnect's rear HV lead passes through the rod. */
  const probe = lib.cyl(0.004, 0.1555, M.steel, 8);
  probe.position.set(-1.02, 0.18725, -0.30);   /* y 0.1095 to 0.2650 */
  gal.add(probe);
  const probeHead = lib.cbox(0.028, 0.020, 0.024, 0.0015, M.plasticLt);
  probeHead.position.set(-1.02, 0.275, -0.30);
  gal.add(probeHead);
  const float = lib.cyl(0.011, 0.010, M.plasticLt, 10);
  float.position.set(-1.02, 0.1185, -0.30);
  gal.add(float);
  sys.add(gal);

  /* ── sensing film: one sheet across every brick top with a tap comb at
     each layer, the acoustic channels that listen for the boiling-regime
     shift, the rear-bay aggregator and its two flat tails ── */
  const film = lib.part('sensefilm', [0, 0.55, 0]);
  const sheet = lib.box(2.24, 0.0016, 1.26, M.pcb);
  sheet.position.set(0.13, 0.2767, 0);
  film.add(sheet);
  /* 210 tap foils, one per layer, standing off the brick top edge and
     folding into the sheet: 41 of every 42 layers in a bipolar brick have
     no external terminal and this is the only thing that reaches them. */
  const tapGeo = new THREE.BoxGeometry(0.0055, 0.0072, 0.010);
  const taps = new THREE.InstancedMesh(tapGeo, M.busbar, BX.length * LAYERS);
  taps.castShadow = taps.receiveShadow = true;
  let t2 = 0;
  for (const cx of BX) {
    for (let i = 0; i < LAYERS; i++) {
      dummy.position.set(cx + (i - (LAYERS - 1) / 2) * LPITCH, 0.2791, 0.6385);
      dummy.updateMatrix();
      taps.setMatrixAt(t2++, dummy.matrix);
    }
  }
  taps.instanceMatrix.needsUpdate = true;
  film.add(taps);
  /* 20 piezo channels: this generation made dryout the primary risk and
     these are the witnesses that see it before any temperature does. */
  for (let i = 0; i < 20; i++) {
    const px = -0.90 + (i % 10) * 0.21;
    const pz = i < 10 ? -0.56 : 0.56;
    const pz2 = lib.cyl(0.009, 0.0026, M.steel, 10);
    pz2.position.set(px, 0.2788, pz);
    film.add(pz2);
  }
  const agg = lib.cbox(0.096, 0.016, 0.064, 0.0015, M.pcb);
  agg.position.set(-1.13, 0.1275, 0.31);
  film.add(agg);
  const aggLid = lib.cbox(0.084, 0.0035, 0.054, 0.0010, M.plasticLt);
  aggLid.position.set(-1.13, 0.1372, 0.31);
  film.add(aggLid);
  for (const cz of [-0.024, 0.024]) {
    const conn = lib.cbox(0.020, 0.010, 0.014, 0.0010, M.plasticLt);
    conn.position.set(-1.087, 0.1275, 0.31 + cz);
    film.add(conn);
  }
  for (const ez of [-1, 1]) {
    const ear = lib.cbox(0.016, 0.004, 0.014, 0.0008, M.pcb);
    ear.position.set(-1.13, 0.1215, 0.31 + ez * 0.039);
    film.add(ear);
    const s = hexHead(0.0045, 0.0026, M.darkSteel);
    s.position.set(-1.13, 0.1235, 0.31 + ez * 0.039);
    film.add(s);
  }
  const tailA = [[-0.995, 0.276, 0.20], [-1.06, 0.20, 0.26], [-1.10, 0.135, 0.30]];
  const tailB = [[-0.995, 0.276, 0.44], [-1.07, 0.19, 0.38], [-1.095, 0.135, 0.325]];
  film.add(lib.tube(tailA, 0.0035, M.pcb));
  film.add(lib.tube(tailB, 0.0035, M.pcb));
  for (const [tp, tf] of [[tailA, 0.55], [tailB, 0.55]]) {
    const p0 = tp[1];
    const clip = lib.cbox(0.010, 0.014, 0.010, 0.0008, M.plasticLt);
    clip.position.set(p0[0], p0[1], p0[2]);
    film.add(clip);
  }
  sys.add(film);

  /* ── semiconductor disconnect: rear bay under the hatch, cold plate on
     the gallery liquid loop with the two pipes that feed it, SiC power
     module with its terminals and driver connectors, a real fin stack, the
     pyro backup and the manual service disconnect with its lockout ── */
  const disc = lib.part('disconnect', [0, 0.5, 0.3]);
  const coldplate = lib.cbox(0.16, 0.012, 0.12, 0.0018, M.coolant);
  coldplate.position.set(-1.13, 0.1245, 0.45);
  disc.add(coldplate);
  /* Four feet down to the pan. The plate used to float 9 mm over it. */
  for (const fx of [-0.062, 0.062]) {
    for (const fz of [-0.042, 0.042]) {
      const foot = lib.cbox(0.016, 0.0090, 0.016, 0.0010, M.alu);
      foot.position.set(-1.13 + fx, 0.1140, 0.45 + fz);
      disc.add(foot);
    }
  }
  /* The cold plate shares the gallery liquid, so it is plumbed to it. */
  for (const [pz3, pr] of [[-0.062, 0.0065], [0.062, 0.0065]]) {
    const port = lib.cyl(pr, 0.014, M.coolant, 10);
    port.rotation.x = Math.PI / 2;
    port.position.set(-1.13, 0.1245, 0.45 + pz3 * 1.1);
    disc.add(port);
  }
  disc.add(lib.tube([[-1.13, 0.1245, 0.518], [-1.13, 0.118, 0.560], [-1.13, 0.1145, 0.585]],
    0.0055, M.coolant));
  /* The return runs FORWARD off the plate rather than inboard: the film
     aggregator occupies x -1.178..-1.082 over z 0.264..0.356 with its
     mounting ears, and the first route through that box put 5 mm of pipe
     inside it. */
  disc.add(lib.tube([[-1.13, 0.1245, 0.382], [-1.095, 0.1200, 0.372], [-1.062, 0.1145, 0.360]],
    0.0055, M.coolant));
  /* SiC power module: baseplate, moulded housing, two DC terminals with
     bolted lugs, and the gate-driver board with its control connector. */
  const modBase = lib.cbox(0.144, 0.006, 0.104, 0.0012, M.alu);
  modBase.position.set(-1.13, 0.1335, 0.45);
  disc.add(modBase);
  const sicBlock = lib.cbox(0.132, 0.028, 0.094, 0.0025, M.plastic);
  sicBlock.position.set(-1.13, 0.1505, 0.45);
  disc.add(sicBlock);
  for (const ts of [-1, 1]) {
    const term = lib.cbox(0.026, 0.006, 0.028, 0.0010, M.busbar);
    term.position.set(-1.13 + ts * 0.079, 0.1665, 0.45);
    disc.add(term);
    const tn = hexHead(0.0055, 0.0035, M.darkSteel);
    tn.position.set(-1.13 + ts * 0.079, 0.1695, 0.45);
    disc.add(tn);
  }
  const driver = lib.cbox(0.100, 0.0022, 0.060, 0.0006, M.pcb);
  driver.position.set(-1.13, 0.1665, 0.408);
  disc.add(driver);
  const dconn = lib.cbox(0.026, 0.010, 0.012, 0.0010, M.plasticLt);
  dconn.position.set(-1.088, 0.1720, 0.408);
  disc.add(dconn);
  /* Fin stack: 21 blades at 4.5 mm pitch on a 4 mm base, seated on the
     module top at 0.1705, against the seven 4 mm slabs that were there. */
  const finBase = lib.cbox(0.130, 0.004, 0.094, 0.0010, M.alu);
  finBase.position.set(-1.13, 0.1725, 0.45);
  disc.add(finBase);
  const finGeo = new THREE.BoxGeometry(0.124, 0.020, 0.0013);
  const finInst = new THREE.InstancedMesh(finGeo, M.alu, 21);
  finInst.castShadow = finInst.receiveShadow = true;
  for (let i = 0; i < 21; i++) {
    dummy.position.set(-1.13, 0.1845, 0.45 + (i / 20 - 0.5) * 0.090);
    dummy.updateMatrix();
    finInst.setMatrixAt(i, dummy.matrix);
  }
  finInst.instanceMatrix.needsUpdate = true;
  disc.add(finInst);
  /* Pyro fuse: a real cylindrical body with two bolted lugs and an
     initiator connector, bracketed down to the pan. */
  const pyro = lib.cyl(0.019, 0.050, M.hv, 14);
  pyro.rotation.x = Math.PI / 2;
  pyro.position.set(-1.02, 0.140, 0.45);
  disc.add(pyro);
  for (const ps of [-1, 1]) {
    const lug = lib.cbox(0.020, 0.005, 0.012, 0.0010, M.busbar);
    lug.position.set(-1.02, 0.140, 0.45 + ps * 0.030);
    disc.add(lug);
    const ln = hexHead(0.0048, 0.0030, M.darkSteel);
    ln.rotation.x = ps > 0 ? Math.PI / 2 : -Math.PI / 2;
    ln.position.set(-1.02, 0.140, 0.45 + ps * 0.036);
    disc.add(ln);
  }
  const init = lib.cbox(0.014, 0.014, 0.012, 0.0010, M.plasticLt);
  init.position.set(-1.02, 0.164, 0.428);
  disc.add(init);
  const pyroFoot = lib.cbox(0.026, 0.032, 0.010, 0.0010, M.alu);
  pyroFoot.position.set(-1.02, 0.1255, 0.472);
  disc.add(pyroFoot);
  const loop = lib.torus(0.018, 0.004, M.plasticLt, 20, 8);
  loop.position.set(-1.02, 0.176, 0.462);
  disc.add(loop);
  /* Manual service disconnect. Under the hatch, in the one part of the
     rear bay nothing else uses: x -1.273 to -1.203, aft of the cold plate
     and outboard of nothing. Base, plug, bail handle to 0.2865 with 3.5 mm
     of air under the lid skin, padlock hasp, and the interlock connector
     that has to open before the plug will lift. */
  const MSD_X = -1.238, MSD_Z = 0.38;
  const msdBase = lib.cbox(0.070, 0.062, 0.090, 0.0025, M.plasticLt);
  msdBase.position.set(MSD_X, 0.1525, MSD_Z);
  disc.add(msdBase);
  for (const fx of [-0.026, 0.026]) {
    for (const fz of [-0.034, 0.034]) {
      const leg = lib.cbox(0.010, 0.012, 0.010, 0.0008, M.alu);
      leg.position.set(MSD_X + fx, 0.1155, MSD_Z + fz);
      disc.add(leg);
    }
  }
  const msdPlug = lib.cbox(0.052, 0.042, 0.070, 0.0025, M.hv);
  msdPlug.position.set(MSD_X, 0.2045, MSD_Z);
  disc.add(msdPlug);
  for (const hs of [-1, 1]) {
    const arm = lib.cbox(0.012, 0.038, 0.010, 0.0010, M.darkSteel);
    arm.position.set(MSD_X, 0.2445, MSD_Z + hs * 0.030);
    disc.add(arm);
  }
  const grip = lib.cbox(0.014, 0.012, 0.070, 0.0025, M.darkSteel);
  grip.position.set(MSD_X, 0.2695, MSD_Z);
  disc.add(grip);
  const hasp = lib.cbox(0.004, 0.020, 0.014, 0.0008, M.steel);
  hasp.position.set(MSD_X + 0.027, 0.2280, MSD_Z);
  disc.add(hasp);
  const shackle = lib.torus(0.0065, 0.0018, M.steel, 12, 6);
  shackle.rotation.y = Math.PI / 2;
  shackle.position.set(MSD_X + 0.027, 0.2340, MSD_Z);
  disc.add(shackle);
  const ilock = lib.cbox(0.016, 0.014, 0.020, 0.0010, M.plasticLt);
  ilock.position.set(MSD_X - 0.031, 0.1680, MSD_Z);
  disc.add(ilock);
  const msdWarn = lib.badge(warnTri.map(([a, b]) => [a * 0.55, b * 0.55]), 0.0012, M.busbar,
    { holes: [warnBolt.map(([a, b]) => [a * 0.55, b * 0.55])] });
  msdWarn.position.set(MSD_X, 0.1560, MSD_Z + 0.045);
  disc.add(msdWarn);
  /* The two HV leads, now clipped rather than floating. */
  const leadA = [[-1.005, 0.24, -0.52], [-1.10, 0.21, -0.15], [-1.17, 0.175, 0.20],
                 [-1.145, 0.150, 0.38]];
  const leadB = [[-1.050, 0.2845, 0.712], [-1.068, 0.256, 0.650], [-1.098, 0.214, 0.570],
                 [-1.150, 0.174, 0.500]];
  disc.add(lib.tube(leadA, 0.009, M.hv));
  disc.add(lib.tube(leadB, 0.009, M.hv));
  for (const p of [leadA[1], leadA[2], leadB[1], leadB[2]]) {
    const clip = lib.cbox(0.014, 0.016, 0.014, 0.0010, M.plasticLt);
    clip.position.set(p[0], p[1] - 0.010, p[2]);
    disc.add(clip);
  }
  sys.add(disc);

  /* ── underfloor strike shield: ONE continuous formed titanium panel now,
     not two flat plates butted at x -0.96. Its underside is on y 0.1025,
     level with body-7's floor strakes and 3.5 mm under its venturi closeout
     plane at 0.106; its five stiffening beads and two fastener lands press
     2 mm UP into the 3.5 mm stack, so the lowest surface on the car is
     still an unbroken land and ground clearance is unchanged to the
     micron. The 26 flush heads sit in the fastener lands, 0.4 mm above the
     surrounding skin rather than buried inside it where nothing could see
     them. Two folded edge flanges bolt to the rocker bond rails at |z|
     0.720 so the strike load path is skin, flange, rail, body ── */
  const shield = lib.part('strikeshield', [0, -0.62, 0]);
  const sSec = [];
  for (let r = 0; r < SHIELD_STA.length; r++) {
    const [sx, H] = SHIELD_STA[r];
    const end = r === 0 || r === SHIELD_STA.length - 1;
    const yb = end ? SK_LO + SK_ROLL : SK_LO;
    const yt = end ? SK_HI - SK_ROLL : SK_HI;
    const roll = Math.min(SK_ROLL, (yt - yb) / 3);
    const w = H - SK_ROLL;
    const ring = [];
    for (let j = 0; j <= SK_NB; j++) ring.push([sx, yb, (-1 + (2 * j) / SK_NB) * w]);
    ring.push([sx, yb + roll, H], [sx, yt - roll, H]);
    for (let j = SK_NB; j >= 0; j--) ring.push([sx, yt, (-1 + (2 * j) / SK_NB) * w]);
    ring.push([sx, yt - roll, -H], [sx, yb + roll, -H]);
    sSec.push(ring);
  }
  const col = (t) => (t + 1) * (SK_NB / 2);
  const SPAN = [0.9, 10.4], RUNOUT = 0.4;
  const grooves = [];
  for (const t of [-0.60, -0.30, 0, 0.30, 0.60]) {
    grooves.push({ col: col(t), width: 0.045, depth: 0.002, span: SPAN, runout: RUNOUT });
  }
  for (const t of [-SK_FAST_T, SK_FAST_T]) {
    grooves.push({ col: col(t), width: 0.030, depth: 0.002, span: SPAN, runout: RUNOUT });
  }
  const skin = lib.loft(sSec, M.alu, true, {
    interp: 'linear', grooves, crease: 34,
  });
  lib.shell(skin);
  shield.add(skin);
  /* 26 flush heads, seated on the fastener land floor at 0.1045 and
     following the land as it follows the panel outline through the waist.
     Head bottoms measure 0.1029: inside the 3.5 mm stack, 1.6 mm clear of
     the airstream, and visible from below because the land is a 30 mm
     channel rather than a hole nobody cut. */
  const fastX = [];
  /* 195 mm pitch, not 200: at 200 the twelfth station lands on x 1.260 and
     the liquid feed manifold runs x 1.252..1.274 with its underside inside
     the shield stack, so two heads grew into it. */
  for (let i = 0; i < 12; i++) fastX.push(-0.94 + i * 0.195);
  fastX.push(-1.205);
  for (const fx of fastX) {
    for (const zs of [-1, 1]) {
      const f = lib.fastener(0.005, M.steel, 'hex', { height: 0.0010, flange: 0.0064, flangeT: 0.0004 });
      f.rotation.z = Math.PI;
      f.position.set(fx, 0.10435, zs * SK_FAST_T * (shieldHalf(fx) - SK_ROLL));
      shield.add(f);
    }
  }
  /* Folded edge flanges. A 2 mm strip: a lap on the skin top at 0.1060
     outboard of the pan edge, a 45 degree kick up and out, and a vertical
     web against the rail inner face from 0.1250 to 0.1440. */
  for (const zs of [-1, 1]) {
    const fl = extrudeX([
      [zs * 0.6905, 0.1060], [zs * 0.7020, 0.1060], [zs * 0.7200, 0.1240],
      [zs * 0.7200, 0.1440], [zs * 0.7180, 0.1440], [zs * 0.7180, 0.1250],
      [zs * 0.7010, 0.1080], [zs * 0.6905, 0.1080],
    ], null, 2.14, M.alu, 30);
    fl.position.x = -1.06;
    shield.add(fl);
    /* the glass isolation ply that keeps titanium off the aluminium rail */
    const ply = extrudeX([
      [zs * 0.7180, 0.1250], [zs * 0.7175, 0.1250], [zs * 0.7175, 0.1440],
      [zs * 0.7180, 0.1440],
    ], null, 2.14, M.white, 30);
    ply.position.x = -1.06;
    shield.add(ply);
    for (let i = 0; i < 8; i++) {
      const b = lib.fastener(0.005, M.darkSteel, 'hex');
      b.rotation.x = zs > 0 ? -Math.PI / 2 : Math.PI / 2;
      b.position.set(-1.00 + i * 0.29, 0.1345, zs * 0.7175);
      shield.add(b);
    }
  }
  sys.add(shield);

  return sys;
}

/* ── Verification notes (measured off partner build geometry, not prose) ──

   Envelope, measured per vertex after the detail pass, and unchanged by it:
   every mesh sits inside x [-1.2900, 1.3000], y [0.1025, 0.3080],
   z [-0.7800, 0.7800]. The x maximum is the shield skin at 1.300 and the
   vapor stub at 1.297, both of which have to reach that far and both of
   which are inside design/gen4.md's x [-1.30, 1.30]. The y minimum is the
   shield's unbroken 0.10250 land and the y maximum is the seat rail tops at
   0.30800, exactly as before. Geometry outboard of |z| 0.71 is the rocker
   bond rails at |z| 0.72 to 0.78, the floor-lid's bonded perimeter land at
   0.698 to 0.744, the shield edge flanges and their bolts at 0.690 to 0.720
   (0.7210 before: the flange web now stops ON the rail inner face instead of
   1 mm past it), the disconnect's raceway lead at 0.716 and the brick
   take-off at 0.708. All of it lies in x [-1.06, 1.08], which is battery-3's
   carried rocker exception. The land at 0.744 is the one item this pass adds
   to that list and the reason is that the lid is specified as bonded to the
   rails and used to stop 10 mm short of them.

   Triangles, before and after the detail pass, measured off the built mesh:

     part            before    after
     bricks           3,024   12,960     chamfered layers, machined end
                                         plates, laminated series links,
                                         two terminals, an HV badge
     strikeshield     1,552    4,952     one formed panel with five beads
                                         and two fastener lands, folded
                                         edge flanges, 26 flush heads
     galleries        1,728    4,704     pool wall, slotted baffles, riser
                                         take-offs, P-clips, flanged vapor
                                         stub, bulkhead collar, level probe
     sensefilm          600    4,308     210 tap foils, 20 piezo channels,
                                         a real aggregator
     disconnect       1,208    3,728     power module, 21-blade fin stack,
                                         plumbed cold plate, pyro, and the
                                         manual service disconnect
     floorlid           844    2,920     perimeter land, real top hats,
                                         C-section seat rails, hatch stack,
                                         flanged burst discs
     bands              720    2,580     continuous wound hoops
     rockerrails        444    2,192     real three-chamber extrusion,
                                         56 flow-drill screws, jacketed
                                         raceway with clips
     total           10,120   38,344     against a 60,000 budget

   Both columns are one sweep of the built mesh over both states, the before
   column read off the pre-pass file rather than off its prose.

   Mass is unchanged at 385 kg: 325 + 6 + 19 + 12 + 5 + 3 + 4 + 11. Nothing
   added here is a kilogram, and the ladder in js/efficiency.js does not
   move.

   Strike shield, measured on the built skin. The panel is one closed loft
   through twelve stations with linear interpolation, so its plan outline is
   its station table and nothing between stations can bulge. Swept at
   x 0.200 the underside reads 0.10250 on the lands and 0.10450 on the seven
   channel floors, at |z| 0.0, 0.20, 0.41 and 0.594; the two at 0.594 are the
   fastener lands. All 26 heads measure y 0.10295 at their lowest, 0.45 mm
   above the land plane and 1.55 mm inside the 3.5 mm stack. Ground clearance
   is therefore unchanged to the micron and the fasteners are visible from
   below for the first time, where before they were cylinders coplanar with
   the skin's own underside and could only ever have z-fought with it.

   Waist, measured per vertex. Nothing aft of x -1.095 sits outboard of
   |z| 0.6150. The lid and pan reach exactly 0.6150, the shield 0.6100, the
   disconnect lead 0.5923, the film 0.3400.

   Floor datum, from body-7's build(). lib.plate places its slab from y + t/2
   to y + 3t/2, so plate position arguments are not undersides and every
   number here is measured. closeF is lib.plate(0.78, 1.24, 0.012) at
   (1.71, 0.10, 0) and closeR is lib.plate(0.62, 1.24, 0.012) at
   (-1.625, 0.10, 0): both closeout undersides measure y 0.10600. The floor
   strakes are lib.box(0.60, 0.055, 0.010) at (-1.63, 0.13, ±0.21 / ±0.50)
   and measure y 0.10250 to 0.15750, spanning x -1.93 to -1.33, so the
   strakes and not the closeouts are the car's lowest underbody surface.
   This shield's underside measures 0.10250, level with them, and its
   fasteners sit inside the skin rather than below it, so the pack's lowest
   vertex is 0.10250 and ground clearance is unchanged. battery-6's pan
   underside measures 0.13200 and its rocker rail bottom 0.13000. In x,
   closeF starts at 1.32 and the shield ends at 1.30 (20 mm gap); closeR ends
   at -1.315 and the shield ends at -1.29 (25 mm gap); the strakes end at
   -1.33, 40 mm clear of the pack's rear wall, and they are the reason the
   pack does not grow aft along the floor.

   Aft face, from suspension-4's build(). The rear subframe forward
   crossmember measures x [-1.400, -1.320], y [0.215, 0.285]; the rear-steer
   housing and its motor measure x [-1.424, -1.312], y [0.137, 0.218]. The
   pack rear wall at x -1.290 clears the nearest of those by 22 mm. A sixth
   brick needs 448 mm of pitch. The rear bay from the last brick face at
   x -0.976 to the rear wall is 318 mm and every millimetre of it holds the
   disconnect, the film aggregator and the fill standpipe, and even
   surrendering all of it leaves the brick 130 mm short; growing the wall aft
   buys 22 mm before suspension-4. Named as a Gen 8 lever, not a near miss.

   hv-4 interface, measured. Its 'hv-runs' pack feed reaches down to y 0.3040
   at (-1.13, ~0.315, 0.38); this lid's hatch is now a landing rim, gasket
   and cover stack rather than battery-6's single slab, and it measures
   y 0.3020 at the rim's foot to 0.3070 at the cover face, with that face
   spanning x -1.271 to -0.989 and z 0.259 to 0.501. The face is the plane
   and the height battery-6 handed over, so the feed rises off it exactly as
   it did. Its ring rear leg
   measures x [-1.135, -1.125], |z| [0.595, 0.605], underside y 0.3020; the
   lid skin top is 0.3020 and the tallest thing on it is a seat rail at
   0.3080, and the rails sit at |z| 0.28 and 0.52 between the legs at 0.60,
   which is battery-6's condition carried unchanged. Its converter measures
   one box x [-1.530, -1.210], y [0.360, 0.490], z ±0.220 with one HV input
   boss at x [-1.557, -1.527], y [0.434, 0.466], z [0.084, 0.116]: one
   conversion front end, and its own spec row reads 300 to 870 V input, so
   210 layers at 4.10 V giving 861 land inside it. Its v2g-port spec carries
   630 A of DC pin capability and this pack uses 430, so about 200 A is
   stranded by the pack rather than by the infrastructure.

   thermal-7 interface, measured after thermal-7 was reconciled mid-review.
   Vapor: this stub measures x [1.247, 1.297], y [0.251, 0.285],
   z [-0.117, -0.083] and thermal-7's riser flange measures x [1.296, 1.308],
   y [0.2446, 0.2914], z [-0.124, -0.076], so they meet over 1 mm of x.
   Liquid: this feed stub measures x [1.247, 1.297], y [0.106, 0.130] at
   (1.272, 0.118, 0.10), 29 mm below battery-6's BUILT stub at
   (1.272, 0.147, 0.10) rather than the 32 mm battery-6's prose implies, and
   thermal-7's condensate flange now measures x [1.286, 1.298],
   y [0.104, 0.132], z [0.086, 0.114]. They overlap by 11 mm of x. Both
   joints closed. That flange also crosses the strike shield skin by 2 mm at
   x [1.286, 1.298]: the return penetrates the shield plane at the pack's
   front lower corner, which is a sealed grommet in the real part and is
   recorded here rather than nudged out of sight. Design heat load 15 kW,
   down from 25. Open between the two modules and stated on the galleries
   panel: the ~19 kg of fluoroketone in this pool, which thermal-7 carries
   and cannot fit inside its 52 kg target. Neither module double-counts it.

   wheels-7 and drivetrain-7, both sides, measured after they landed. The
   waist was drawn from the contract before either existed. Re-checked by
   sweeping every wheels-7 rear-corner vertex through suspension-4's ±3
   degrees of rear steer about (-1.45, 0.355, ±0.74) in 0.25 degree steps:
   the rear tyre inner face is |z| 0.66250 static and 0.64596 swept, so the
   contract flange was 12.5 mm more conservative than the built tyre and the
   waist at 0.615 clears the swept solid by 30.96 mm rather than the 14 mm it
   was drawn to. No recut needed. The swept tyre's leading edge is x -1.0908
   and the rocker rail ends at -1.06, so the rail clears it by 30.8 mm in x,
   which is the only clearance holding those two apart: they overlap in both
   y and |z|. The annulus contract itself holds on both sides. wheels-7 puts
   ZERO vertices inside r 0.155 to 0.235 over |z| 0.65 to 0.73 across tyres,
   rear wheels, covers and park brake, and puts 328 vertices exactly on the
   |z| 0.650 flange plane out to r 0.2440. drivetrain-7 fills it: rotor rings
   r 0.1880 to 0.2330 over |z| 0.6500 to 0.7280 with 2,136 vertices on the
   flange plane, stator rings up to r 0.1972 over |z| 0.636 to 0.726 with
   1,944. Explode matches: drivetrain-7 rings ±0.90 and corner groups ±0.78,
   wheels-7 rear wheels and park brake ±0.78. Two observations handed on
   rather than acted on. First, drivetrain-7's stator rings run inboard to
   |z| 0.636 and down to r 0.127, outside the contracted band on the inboard
   side; that space is not wheels-7's and it clears this pack (nearest
   approach 41 mm in x), but wheels-7's own note records the stator as
   r 0.1552 over |z| 0.620, which is not what it measures. Second,
   suspension-4's rear geometry was never relocated for the |z| 0.74 corner
   and it fouls it: against wheels-6 the rear-steer to rear-wheel overlap is
   1.7 mm and against wheels-7 it is 58 mm, with new overlaps appearing at
   the rear-steer to tyre (46 mm), active damper to rear wheel (10 mm) and
   air spring to rear wheel (8 mm) pairs. None of that touches this pack;
   wheels-7 enumerates the same fouls and suspension-4's owner has the fix.

   Attachment, per mesh, re-swept mesh by mesh rather than part by part,
   because tools/check-interfaces.sh asks whether a PART touches another part
   and will pass a part that carries one detached mesh inside it. Two did.
   The forward vapor riser take-offs stood 9.8 mm clear of anything on the
   driver side and only touched the brick string take-off, which they
   pierced, on the passenger side; they are gone, and the reason is with the
   loop that builds them. The pool level probe hung 5.5 mm above the pan and
   5.0 mm under the lid; its rod now stands on the pan top at 0.1095, and it
   moved to x -1.02 because the disconnect's rear HV lead ran through it at
   -1.05. With those two fixed the worst mesh-to-mesh gap in the module is
   0.5 mm, the rocker rail inner face to the adhesive bead on it, and
   tools/check-interfaces.sh reports [attachment] ok on gen7, gen8 and gen9.
   The pass closed four joints that were drawn but not built: the
   floor-lid's bonded perimeter now reaches the rail top it is bonded to
   instead of stopping 10 mm short, the disconnect's cold plate stands on
   four feet down to the pan instead of floating 9 mm over it and is plumbed
   to the pool it shares fluid with, the vapor headers are clipped to the
   rail bond bead every 380 mm instead of hanging 44 mm off the nearest
   structure, and the pool has a 35 mm retaining wall around the pan it
   stands in.

   Visibility, ray-tested. Every mesh in the module was sampled at up to 14
   face centroids and each sample cast against 96 directions over the sphere,
   with the occluder set restricted to the mesh's OWN part, because parts
   move as units under explode and a feature buried inside its own part can
   never be seen from any camera in any mode. Zero meshes come back fully
   occluded. The floor is 1.2 percent, and it is the twenty-four nuts on the
   series-link clamp bars, which can only be seen straight down the 14 mm
   slot between two bricks; the next band up is 2.1 percent, the clamp bars
   themselves. Nothing else in the module is under 8 percent. An earlier
   draft of this note claimed nothing was under 8 percent and that was two
   errors in one sentence: those nuts were always at 1.2, and twelve burst
   disc bolts and two rupture discs, 384 triangles, were at 0.0 because the
   retaining ring is r 18.5 mm over a bolt circle of 15.8 and its rear face
   was on x -1.29, so it enclosed everything it was holding. The ring now
   stops at x -1.2868 and the heads and the discs are what reach -1.29.
   Three drafts of this pass did not pass
   that test and were changed rather than shipped: the terminal boot swallowed
   its own standoff, lug and nut (the boot moved onto the cable end); the SiC
   module's DC terminal nuts grew into the heatsink base above them, which is
   lesson 2 exactly (the terminals moved 27 mm outboard of the fin footprint);
   and the laminated series links were sealed inside their own clamp bars
   (the bars are now 30 mm across a 90 mm lamination, so 30 mm of every foil
   stands clear at each end and reads through the 14 mm slot between bricks).
   Two further items were deleted rather than fixed: ten pedestal rails,
   440 triangles of geometry 10 mm under an opaque pool surface, and a
   sealed grommet for thermal's condensate penetration, which cannot be
   built at that corner without either passing x 1.300 or standing inside
   the pan. The grommet is the one thing on the brief this module could not
   deliver.

   Clashes with partners, triangle-level, both preset sets. Everything that
   crosses a partner in gen7, gen8 or gen9 is either pre-existing geometry
   this pass did not touch (the lid panel against wheels' front disc and
   thermal's riser, the feed and vapor barrels through thermal's flanges,
   thermal's condensate flange through the shield skin and the pan,
   interior-6 resting on the lid) or is listed here. Counted as mesh pairs
   that actually cross, the pack meets gen7 and gen8 in 17 pairs and gen9 in
   23, and both counts are what the pre-pass file gave plus the one item
   below. New and deliberate: the vapor stub's bolted flange at x 1.284 to
   1.296 is 48 mm across in z to match thermal's own and butts it, and it
   crosses thermal's riser tube in one place, because that tube overshoots
   its own flange back to x 1.2733 and the stub it lands on already crosses
   it. It is 43.5 mm tall rather than 48 because a square 48 puts its top
   corners on y 0.292 and the floor-lid skin's underside is 0.290. New and reported
   rather than resolved: the pool retaining wall at |z| 0.686 over
   x 1.095 to 1.268 sits inside wheels-9's front tyre, whose inner face
   measures |z| 0.6625 from x 1.095 to 1.353. That is not a new condition,
   it is a newly visible one: this pack's strike shield skin has occupied
   |z| up to 0.700 over the same x band since the module was written, and so
   have its vapor headers at 0.676. The fluid itself was NOT widened into it,
   which is why the pool keeps battery-6's |z| 0.670 plan and the wall stands
   12 mm outboard of it with bare pan between. wheels-9's owner should know
   that a front tyre at |z| 0.6625 and a pack at 0.700 cannot both be right.

   Clashes INSIDE the module, part against part, triangle level, swept over
   the pre-pass file and this one by the same script so the two states are
   comparable. The pass introduced ten and all ten are fixed here:

     band hoop inner fillet 9 mm over a square brick, up to 1.9 mm into the
       end plate corners at sixty corners (fillet is 1.5 mm now, which is
       the end plate's own chamfer)
     floor-lid perimeter land tapering all the way to |z| 0.744, up to
       1.9 mm into the rail top it is bonded to (taper ends at 0.7180 and
       the land is flat on 0.2995 outboard of it)
     810 V raceway on y 0.284, jacket 2.5 mm and clips 3.1 mm into the lid
       panel edge and its land (raceway 0.2775, clips top out at 0.2885
       under a 0.2900 skin)
     disconnect cold-plate return 5 mm inside the film aggregator
       (routed forward of it instead of through it)
     forward vapor riser take-offs 58 mm past the end of their header
       (removed: there is nowhere on the header to put them)
     twelve burst disc bolts and two rupture discs inside their own
       retaining ring (ring moved forward 3.2 mm)
     vapor flange corners 2 mm into the lid skin (flange 43.5 mm tall)
     two shield flush heads into the liquid feed manifold at x 1.260
       (fastener pitch 195 mm, so no station lands under the manifold)
     pool level probe pierced by the rear HV lead (probe moved to x -1.02)
     pool level probe hanging 5.5 mm off the pan (rod stands on it)

   Five are older than this pass, measure identically on the pre-pass file,
   and are NOT fixed here because none of them is a detail edit:

     The front vapor crossover runs inside the fifth brick. The tube spans
     x 1.179 to 1.246 at y 0.259 to 0.283 and the brick top is 0.2755, so
     16.5 mm of a 22 mm tube is inside the stack for the whole 1.3 m of z,
     and on the way it crosses the sensing film sheet and six of its tap
     foils. It cannot simply be lifted: 0.4 mm separates the brick top from
     the film and 14.5 mm separates the film from the lid. Routing it
     forward of the end plate at x 1.249 is the answer and that corner
     already holds the string terminal, its boot and the brick take-off
     cable, so it is a re-draw of the pack's front corner.
     The liquid feed manifold has its underside on y 0.1035: 6.0 mm below
     the pan top it should lie on, 2.0 mm below the pan underside and
     2.5 mm inside the strike shield.
     The band bottom legs run 3.0 mm into the 4 mm pan, because the pan top
     is 0.1095, the brick bottom is 0.1115, and a 5 mm leg has to pass
     between them.
     The band legs cross the sensing film sheet by 1.6 mm and the pool
     baffle ribs by 4.5 mm, both under an opaque pool surface.
     The brick string take-off cable dead-ends in air at (1.245, 0.2845,
     0.706). The raceway it is described as feeding stops at x 1.080.

   Two joints held exactly. The service hatch face still measures y 0.3070,
   the plane battery-6 handed over, and the landing rim under it keeps that
   panel's x -1.28 to -0.98 by z 0.25 to 0.51 footprint, so hv-4's pack feed
   at (-1.13, 0.315, 0.38) lands where it always did; what changed under it
   is a machined
   landing rim, a gasket, eight countersunk heads and an extruded HV warning
   that caps the pack at 0.3080 rather than exceeding it. The vapor stub's
   face is still x 1.297 and the liquid feed's is still (1.272, 0.118, 0.10).

   Not checked by this module and handed on: the extra 85 kg lands on
   suspension-4's air springs and wheels-7's tyres and neither was resized
   for it, and no secondary mass compounding is carried in the range
   arithmetic above. */
