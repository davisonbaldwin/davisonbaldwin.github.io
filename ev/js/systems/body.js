/* Body and structure: front and rear aluminum megacastings, bolt-on crush
   rails, multi-chamber rockers, a hot-stamped steel safety cage, and the
   bonded glass and painted skin over the top. The visual signature of EV·01. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'body',
  name: 'Body and structure',
  color: 0x8fa8bf,
  explode: [0, 1.7, 0],
  blurb: 'Two megacastings, a boron-steel cage, and bonded glass: 385 kg that decides how the car drives, crashes, and looks.',
  /* THE CLOSURES, and this rung is the zero every later one is measured
     against. Gen 1 opens the way every mass-market car has opened since the
     1950s: two doors a side on vertical hinges at their leading edges, a hood
     on a transverse axis at the cowl, and a decklid on a transverse axis at
     the deck cut. Nothing here is clever and that is the point. What the
     ladder has to beat is written in the numbers tools/closures.sh sweeps off
     this geometry, not in an adjective.

     The two lids are the pair worth reading together, because they are the
     same mechanism spending the same currency in opposite amounts. The hood
     opens onto 2.1894 m2 of plan area and stands 412.4 mm over the parked
     car; the decklid opens onto 1.0963 m2 and stands 294. Neither spends a
     millimeter of width. Both numbers are swept, and the ratio between the
     two apertures is almost exactly two to one, which is the sedan's own
     shape stated as a number. */
  closures: {
    'door-front': {
      name: 'Front door',
      kind: 'door',
      part: 'doors',
      mass: 20.5,
      seconds: 1.1,
      seat: 'A-pillar hinge face, 8 mm ahead of the x 1.120 shutline',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [1.128, 0.670, 0.9582], deg: 66 },
      ],
      why: 'A vertical axis at the leading edge is the cheapest door there is, in every sense: two hinges, one latch, a check strap with three detents, and a hole in the side of a monocoque that the B-pillar closes. It costs nothing to build and nothing to carry, and it spends something the car does not own, which is the ground beside it. Every later rung on this ladder is an argument with that trade.',
      cost: [
        'The swing is the whole cost and it is not small: the panel sweeps outboard through its own length, so the space it needs beside the car is the space a parked car does not have.',
        'The hinge carries the door in bending at full open. Years of somebody leaning on an open door is what puts a front door out of alignment, and it shows up as a latch that needs a firmer shut.',
      ],
    },
    'door-rear': {
      name: 'Rear door',
      kind: 'door',
      part: 'doors',
      mass: 20.5,
      seconds: 1.1,
      seat: 'B-pillar hinge face at the x 0.016 shutline, on the pillar the front door latches to',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [0.024, 0.670, 0.9582], deg: 66 },
      ],
      why: 'The rear door hangs off the B-pillar the front door latches to, which is why the pillar is a structural member rather than a trim piece and why a four-door body cannot delete it. The aperture is shorter than the front one and the swing is the same, so the rear door needs marginally less room and gives an occupant marginally less opening.',
      cost: [
        'Two apertures a side means a pillar between them, and a pillar between them is the single largest obstruction to getting into the back seat.',
      ],
    },
    hood: {
      name: 'Hood',
      kind: 'hood',
      part: 'hood',
      mass: 12,
      seconds: 1.3,
      seat: 'Cowl hinge line at x 0.967, on the casting the strut towers stand on',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [0.967, 0.930, 0], deg: 52 },
      ],
      why: 'Hinged at the back and lifted at the front, which is the arrangement that puts the panel out of the way of the person leaning over the opening rather than into their face. It also fails safe at speed: a latch that lets go on a rear-hinged hood is caught by the airflow pressing it shut, where a forward-hinged one would be torn open across the windshield.',
      cost: [
        'The panel stands most of a meter above the car at full open, so a low garage or a roof box is a real constraint on a hood that a decklid never has.',
        'The 70 mm of pedestrian crush stroke under this panel is the reason there is so little usable depth beneath it.',
      ],
    },
    decklid: {
      name: 'Decklid',
      kind: 'decklid',
      part: 'fenders',
      mass: 7,
      seconds: 1.2,
      seat: 'Transverse axis on the deck front cut, the panel\'s own top face at (-1.5155, 1.0166), 5.6 mm behind the backlight rim',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [-1.5155, 1.0166, 0], deg: -80 },
      ],
      /* The reversing camera above the plate recess is at (-2.24, 0.96),
         which is 35 mm ahead of this lid's own trailing edge and 26.1 mm
         proud of the deck plane it overlaps by 0.34 mm at rest. It is bolted
         through the lid, so it travels with it. */
      carries: [{ part: 'autonomy/cameras', box: [-2.30, 0.93, 0, -2.19, 1.00, 0.05] }],
      why: 'THE CUT HAS NO CAMBER, and that is the whole reason one fixed axis is exact here. The lid\'s front line is fourteen vertices at x -1.515482 and y 1.016648, dead straight from z -0.636 to 0.636: zero camber across 1.2726 m of a 1.392 m panel, because a three-box deck is a flat plate raked 0.096 rad and nothing else. So an axis through that line pins the ENTIRE leading edge rather than one point on it. Swept from 0 to 80 degrees the lid\'s maximum x runs -1.5107 to -1.5154, which is 4.7 mm AFT: the leading edge never advances at all, and the 5.6 mm shutline to the backlight\'s rear rim at (-1.5051, 1.0203) is never spent. Gen 9 measured 220.9 mm of camber on the same cut and had to put its axis at the crown to pin one point of it. This body gets for free what that one had to argue for, and the reason is that it is the plain sedan.\n\nWHERE THE AXIS SITS IN THE PANEL\'S THICKNESS IS THE ONLY REAL DECISION, and it has 10.5 mm of latitude on a 12 mm panel. On the top face the advance is zero. Drop it to the bottom face, 12 mm down, where a hinge bolted to a lid\'s inner panel actually lives, and the leading edge advances 7.1 mm at full travel against a 5.6 mm gap. Put it where a gooseneck\'s real pivot goes, forward of and below the cut inside the load space, and it stops being a tolerance and becomes a redesign: 100 mm forward and 100 mm down advances the leading edge 176.4 mm and drives the panel 165.1 mm into body/roof-glass, which over that station is the bonded backlight; 200 and 150 advances it 308.2 mm, 307.5 mm into the backlight and 59.6 mm into interior/rear-bench. So this lid is a four-bar, or an offset hinge that keeps its effective pivot within 10 mm of the cut. The gooseneck is the cheaper hardware and it is not available, because on a three-box body the thing directly ahead of the trunk cut is a fixed piece of glass.\n\nNOTHING ON THE CAR LIMITS THE TRAVEL, which is worth saying out loud because it is rare on this ladder. Swept in 5 degree steps against the other 131 built parts of the preset, out to 120 degrees, this panel grows into nothing at all: it retreats from the tail roll rather than into it, it shares no z with the quarter shoulder band at |z| 0.7040 because the lid stops at 0.6960, and it leans back over its own aperture instead of forward over the glass. The 80 degrees is set by the hinge statics instead. The panel\'s area centroid sits 380.2 mm aft of the axis and 42.6 mm below it, so the arm crosses over the axis at 96.4 degrees of travel, and past that the lid\'s own weight carries it forward onto the backlight rather than holding it against the struts. Eighty leaves 16.4 degrees of margin, which is where a torsion bar can hold the lid up and gravity can still shut it.\n\nWHAT IT OPENS ONTO is the number this rung exists to publish. Measured off the built neighbors, the trunk aperture is 0.7786 m by 1.4080 m, 1.0963 m2 in plan, against the hood\'s 1.3126 by 1.6680 and 2.1894 m2. The nose of a skateboard car opens onto almost exactly twice the plan area the tail does, and the tail\'s half is not small because the volume behind it is small. It is small because a three-box body puts a fixed backlight where a hatch would put an opening, and every liftgate further up this ladder is arguing with that ratio.',
      cost: [
        'Eighty degrees costs 292.1 mm of height over the parked car, whose own tallest point is the lidar pod at 1.4635, so the lid crown reaches 1.7556 and wants a 1.76 m ceiling where the hood wants 1.88. Spending nothing sideways is the point: 0.0 mm of lateral excursion at every angle of the travel, against a front door that is outside a 2.50 m stall after 17 degrees. A trunk can be loaded in a bay the doors cannot be opened in.',
        'The effective pivot has to stay inside the top 10.5 mm of a 12 mm panel, which rules out the cheap gooseneck and buys a four-bar. That is real money on the rung whose whole argument is that nothing here is clever, and it is the first place on this body where the cheapest hardware is not available.',
        'The lid is 7 of the 16 kg the fenders part declares for every skin panel on the tail and the flanks. Splitting a closure out of a bag of panels is what makes a ledger like that visible: 16 kg was always thin for four fenders, two quarters, the pillar outers, the cowl, the tail roll and this lid, and now 7 of it has a name on it.',
        'The trunk gutter under the lid is a solid dark plate 18 mm below the deck plane spanning the whole aperture, so what opening this reveals today is a floor rather than a well. Turning that plate into a ring over a real tub is a bigger job than every hinge on this body put together, and it is not done here.',
      ],
    },
  },
  parts: {
    'front-casting': {
      name: 'Front megacasting',
      tagline: 'One 6,100 ton die shot where seventy stamped parts used to be.',
      mass: 48,
      specs: [
        ['Process', 'High-pressure die cast, vacuum assist'],
        ['Alloy', 'AlSi10MnMg, no heat treatment'],
        ['Wall thickness', '2.8 to 4.5 mm, ribbed'],
        ['Cooling bay', 'Open above y 0.370 between the spars'],
        ['Replaces', '72 stampings, ~900 spot welds'],
        ['Integrates', 'Shock towers, rail and cradle mounts'],
      ],
      how: 'Molten alloy at 700 °C is injected into a steel die at several meters per second under partial vacuum, filling a 1.5 m part in under 100 milliseconds before the gate freezes. The alloy is the enabling trick: AlSi10MnMg reaches its strength by natural aging, because a casting this large would warp unacceptably in the water quench a conventional T6 treatment needs. Manganese stands in for iron to stop the melt soldering to the die while keeping ductility for crash.\n\nStructurally the casting is a node, not a crush element. It gathers the crash rails, the upper apron loads, and the rocker fronts, and it must stay elastic while the bolted rails ahead of it fold. The rib pattern comes from topology optimization against those load cases, and every suspension and drive unit mount is machined in one fixture, so the whole front axle geometry hangs off a single datum.',
      why: 'The argument is tolerance and capital, not romance. Seventy stamped parts carry seventy tolerance stacks and need a body shop full of robots to join; one casting holds hardpoints within ±0.5 mm from a single machining setup. Steering precision is a straight function of front-end stiffness, and stiffness is cheapest when there are no joints to lose it in.\n\nWhat ties the two spars together is now a lower crossmember at the casting\'s front face and nothing else, and that correction is worth stating because the old drawing was a claim nobody had checked. The spars were tied by a solid block 310 mm deep, 280 mm tall and 680 mm across, filling x 1.760 to 2.070 over the full section height. That is 0.0590 cubic meters of drawn aluminum, 159 kg of it, inside a part that declares 48 kg for the whole casting. It is also exactly the volume every thermal variant on the ladder uses for its chiller, manifold, pumps and heat pump, so the block was not a member, it was an unmeasured solid standing in the cooling bay: measured by ray parity, thermal/chiller came back 96.3 percent enclosed by this part, thermal-6/heat-pump 92.7, thermal-6/pressure-set 88.7, thermal/manifold 76.3 and thermal/fans 74.5. Equipment that far inside a solid cannot be seen or picked at explode 0, which is the defect, not the millimeters. Counting vertices against the casting boxes agrees with that sweep to within 1.1 points on every part, and finds one it missed: thermal/pumps was 100 percent inside this casting, every vertex of it, so it made no crossings at all and no penetration check on the car could see it.\n\nThe crossmember that replaces the block runs x 2.000 to 2.070, y 0.300 to 0.370, and its station was chosen the same way the crash rails were: swept against every part of every other module on all ten presets, it is the one place in the bay that adds no pair and deepens none. Enclosure afterward, ray parity again so both columns are one method: pumps 100.0 to 0 percent, thermal/manifold 76.3 to 0, thermal/chiller 96.3 to 11.1, thermal/fans 74.5 to 23.1, thermal-6/pressure-set 88.7 to 39.7, thermal-6/heat-pump 92.7 to 45.2. thermal/heat-pump does not move at all and stays at 80.7 percent, because it sits in the spar and not in the bay, which is the half of this casting that is still a brick.',
      fail: [
        'Gas porosity is the process risk: trapped air becomes subsurface voids, controlled by vacuum level and caught by X-ray sampling.',
        'A crash hard enough to yield the casting writes off the shell; the repair economics are the honest price of integration.',
        'Every steel bolt into aluminum is a galvanic couple; isolation coatings and sealed interfaces are a warranty item, not a detail.',
        'The spars are still drawn as 510 x 280 x 240 mm solids and they still are not one: the suspension pickups arrive inside them at up to 93.5 mm, and thinning them to a real section makes the reported straddle depth worse rather than better, so that half of the casting is measured and left alone rather than quietly redrawn.',
        'This crossmember is inside the frontal silhouette of three bodies and nobody knew. It spans |z| 0.340 and stops 15 mm short of the spars it ties, which is wrong, and widening it to |z| 0.355 so it lands on them grew the built silhouette of body-3 by 0.001674 m2, body-4 by 0.001553 and body-6 by 0.000135, because on those three the skin does not cover the centerline between y 0.300 and 0.370 and this casting is what stands in the shadow there. The 15 mm gap therefore stays until the AREA table is regenerated, and a structural member is being held to a coordinate by an aerodynamic table, which is worth knowing before the next body is drawn.',
      ],
      explode: [0.85, -0.35, 0],
    },
    'rear-casting': {
      name: 'Rear megacasting',
      tagline: 'Castings started at the rear, where stamped geometry was deepest and paid best.',
      mass: 50,
      specs: [
        ['Process', 'High-pressure die cast, 6,100 t lock'],
        ['Alloy', 'AlSi10MnMg'],
        ['Replaces', '79 stamped parts'],
        ['Integrates', 'Spring seats, wheelhouses, cradle mounts'],
        ['Rear rails', 'Bolt-on, sacrificial'],
      ],
      how: 'The rear went first across the industry because deep-drawn geometry, spring seats, wheelhouse bowls, and the trunk floor step, is exactly where stamped construction needs the most individual parts and the most welding. A die can form in one shot what a press line approximates in nine draws. The thermal fight is local: thick bosses at the spring seats cool slower than 3 mm walls, so the die carries conformal cooling channels to keep solidification even and hot tears out of the rib junctions.\n\nCrash duty mirrors the front. Short bolted rails and a rear beam take the low-speed hits and unbolt for repair; the casting itself is sized to stay below yield through the insurance-test regime. It also carries the rear drive unit on three bushings and reacts seat and belt anchor loads from the row above the penthouse.',
      why: 'A casting is bought by the meter of weld it deletes. The rear deletes the most, which is why it carried the business case before the front did, and why the two castings plus the structural battery between them replace what used to be a floorpan made of sixty pieces.',
      fail: [
        'Hot tearing at thick-to-thin transitions is the casting defect that matters; CT scans on a sampling plan police it.',
        'A large aluminum plate rings; damping patches and the bonded trunk trim are NVH treatment, not decoration.',
        'Same write-off threshold as the front: yield the casting and the shell is done.',
      ],
      explode: [-0.85, -0.35, 0],
    },
    'crash-rails': {
      name: 'Crash rails and bumper beam',
      tagline: 'Bolt-on crush cans that spend themselves so the casting never has to.',
      mass: 14,
      specs: [
        ['Section', '90 x 90 mm octagonal, 3.0 mm wall, 6082-T6'],
        ['Mean crush force', '~120 kN per rail over 230 mm'],
        ['Rail centerline', '|z| 0.550, outer wall flush with the spar'],
        ['Clearance to cooling core', '60 mm each side'],
        ['Attachment', '8x M12 per side, bolted'],
        ['Repair threshold', '16 km/h RCAR, casting untouched'],
      ],
      how: 'An octagonal extrusion folds like a concertina if you ask it politely: stamped trigger beads near the free end make the first fold start there, and each subsequent fold forms at near-constant force. Constant force is the whole design goal, because energy is force times stroke: two rails at roughly 120 kN over 0.23 m absorb about 55 kJ, the front structure share of a 56 km/h offset barrier.\n\nThe beam across the nose is curved in plan to cover 85 percent of vehicle width, so partial-overlap hits still load both rails instead of one. Everything is bolted, torqued against shear sleeves: after a moderate hit the assembly comes off with hand tools and a new one goes on without touching a jig.',
      why: 'Crash structure is a fuse hierarchy, and fuses should be the cheap parts. Ahead of a megacasting that logic is not optional: the rails exist so that the component whose replacement totals the car is the last one in the load path to yield.\n\nWhere the rails sit across the car is a settled number now and it was wrong for nine rungs. The ladder drew both rails on |z| 0.420, which puts a 90 mm section between |z| 0.375 and 0.465, and every cooling core on the ladder is 890 mm across: thermal\'s radiator and thermal-6\'s condenser both reach |z| 0.445. The rail therefore ran through 70 mm of tube bank on each side, straight through the core in x, and the cross-module sweep reads it at 105.0 mm on Gen 1 to Gen 3, 97.0 on Gen 4 and 145.0 on Gen 6. The rails now sit on |z| 0.550, so the 90 mm section spans 0.505 to 0.595 and clears the core by 60 mm, and the pack passes between the rails the way it does on a real front end. The station was chosen by sweeping it against every part of every other module on all ten presets in 10 mm steps: 0.420 fouls thirteen of them, 0.550 fouls two, and 0.550 is also where the rail\'s outer wall becomes coplanar with the casting spar\'s outer wall at |z| 0.595, so the front load path is one continuous plane instead of a rail loading the middle of a spar face 55 mm inboard of its own axis.',
      fail: [
        'A small-overlap impact outboard of the rails bypasses them entirely; the casting corner and wheel take it, which is the honest limit of any rail layout.',
        'Chloride sitting inside the closed section corrodes unseen; drain holes and internal wax are the countermeasure.',
        'Bent rails must be replaced, never straightened: work-hardened folds have already spent their ductility.',
        'Widening the rail track buys core clearance and spends offset-barrier margin: the rails are now 1,090 mm apart across their outer walls on a 1,880 mm car, so a barrier overlap that used to load a rail squarely can now load its inboard corner.',
      ],
      explode: [0.95, -0.05, 0],
    },
    rockers: {
      name: 'Rocker beams',
      tagline: 'Eight aluminum chambers between a pole and 960 cells.',
      mass: 22,
      specs: [
        ['Process', '6082-T6 multi-void extrusion'],
        ['Section', '100 x 70 mm, 8 chambers'],
        ['Design case', 'Side pole, 32 km/h, 254 mm dia'],
        ['Intrusion budget', '< 40 mm at the pack rail'],
        ['Joining', 'Flow-drill screws + structural adhesive'],
      ],
      how: 'The side pole test is the sizing case for any EV: a rigid 254 mm pole at 32 km/h, all the energy into a hand-width of sill. The rocker answers with eight extruded chambers that crush in sequence from outboard in, each web adding a step to the force curve, absorbing the hit in roughly 70 mm of controlled collapse. Whatever load remains crosses the battery crossmembers to the far rocker, so both sides of the car resist a one-sided hit.\n\nThe extrusion runs the full two meters between the wheel wells at constant section. Constant section is the point: an extrusion die costs a fraction of a stamping set, and there are no weak stations along the length for a pole to find.',
      why: 'The 40 mm intrusion budget is a contract with the battery: inside it the pack side rails stay elastic and the outer cell rows survive. The rocker is not really a body part, it is the seatbelt of the pack, and its section was sized from the cell map outward.',
      fail: [
        'Intrusion past 40 mm compromises the outer cell rows and totals the pack; the body repair is the cheap half of that event.',
        'Flow-drill screws have a narrow process window in cast material; torque curves are logged per joint at the plant.',
        'A curb strike can crush inner chambers invisibly; sill impacts warrant inspection even when the paint survives.',
      ],
      explode: [0, -0.5, 0.3],
    },
    pillars: {
      name: 'Safety cage',
      tagline: 'Hot-stamped boron steel, the one place steel still beats aluminum.',
      mass: 62,
      specs: [
        ['Material', '22MnB5, hot stamped'],
        ['Strength', '1,500 MPa after die quench'],
        ['B-pillar', 'Tailored soft zone, lower third at 600 MPa'],
        ['Roof crush', '4.4x curb mass before 127 mm'],
        ['A-pillar section', '38 x 90 mm closed'],
      ],
      how: 'Each member starts as a blank heated to 930 °C, formed in a water-cooled die, and quenched in place at over 27 °C per second, converting the boron steel to martensite at 1,500 MPa. That number is what buys thin pillars: an A-pillar strong enough for rollover at 38 mm width costs about three degrees less blind spot than the mild-steel section it replaced.\n\nThe cage is the intrusion-resistant cell inside the aluminum car: A-pillars and header take roof crush, B-pillars carry it down into the rockers, and the C-pillars close the ring around the backlight. The B-pillar lower third is deliberately tempered back to 600 MPa so that in a side impact it bends inboard in a controlled arc instead of fracturing, keeping the door aperture attached. Steel meets aluminum through structural adhesive and self-pierce rivets, with the glue line doubling as galvanic isolation.',
      why: 'Around the passengers the requirement is strength in minimal package space, not energy absorption, and martensitic steel carries roughly three times the load of any practical aluminum section of the same width. Everywhere else on this body aluminum wins on mass; here the centimeters matter more than the kilograms.',
      fail: [
        'Martensite does not tolerate straightening: heat or force enough to move it and it cracks, so damaged members are cut out and section-replaced.',
        'Hydrogen picked up in the furnace can embrittle the steel; dew point control in the line is the quiet safeguard.',
        'The steel-aluminum interface is a corrosion cell wherever the adhesive film is breached; a scratched flange is a warranty claim years later.',
      ],
      explode: [0, 0.32, 0],
    },
    'roof-glass': {
      name: 'Glass roof and backlight',
      tagline: 'Bonded into the cage, the glass carries shear like any other structural panel.',
      mass: 30,
      specs: [
        ['Roof panel', '4.76 mm laminated, gray PVB'],
        ['Backlight', '4.13 mm laminated'],
        ['Solar transmittance', '22 percent total'],
        ['IR coating', 'Sputtered silver stack'],
        ['Bond', 'PU bead, 9 m run, 8 mm dia'],
      ],
      how: 'Both panels are laminated: two soda-lime plies over a 0.76 mm PVB interlayer, tinted in the mass and finished with a sputtered silver stack that reflects near-infrared before it enters the cabin. Total solar energy transmitted stays near 22 percent, which is what makes a fixed glass ceiling livable without a blind in most climates.\n\nThe polyurethane bond is structural. Once cured, the glass works as a shear panel across the cage rails and adds a measurable few percent to torsional stiffness, exactly as a bonded windshield has since the 1970s. The packaging win is quieter: a glass panel plus its bond is around 25 mm thinner than a steel roof, its bows, and a headliner, and deleting a sliding sunroof mechanism saves 12 kg of the heaviest-mounted mass on the car.',
      why: 'The honest ledger: glass costs about 8 kg over an aluminum roof skin, and buys headroom under a lower roofline, stiffness continuity, and a cabin that reads twice its size. Because the boron-steel rails and header carry all of the roof-crush load, the glass is never asked to do more than shear, which laminated glass does well.',
      fail: [
        'Laminated glass fails safe: cracks spread slowly and the panel stays bonded in the frame rather than raining in.',
        'An edge chip inside the bond line is the crack initiator that matters; the ceramic frit band exists partly to hide and protect that edge.',
        'Replacement is a bonded repair with a cure-before-drive-away time; the adhesive is structure, not sealant.',
      ],
      explode: [0, 0.85, 0],
    },
    windshield: {
      name: 'Windshield',
      tagline: 'The most loaded optic on the car: structure, acoustics, and a camera all look through it.',
      mass: 14,
      specs: [
        ['Stack', '2.1 mm + 0.76 acoustic PVB + 1.6 mm'],
        ['Rake', '48 degrees from vertical'],
        ['Acoustic core', 'Tri-layer PVB, soft center'],
        ['Camera zone', 'Optical-grade tolerance window'],
        ['Wipers', 'Twin arm, 560 mm blades, cowl-parked'],
        ['Bond', 'Structural PU, shear-active'],
      ],
      how: 'The stack is asymmetric on purpose: a 2.1 mm outer ply for stone impact, a 1.6 mm inner to save mass, and an acoustic PVB between them whose soft middle layer damps the coincidence frequency near 3 kHz, the band where ordinary glass leaks wind rush and speech. The difference is roughly 3 dB where the ear is most sensitive, which is why conversation at 130 km/h works.\n\nThe 48 degree rake is a negotiated settlement. More rake lowers drag and it stretches the hood line the pedestrian rules want, but it also lengthens the optical path through the glass: camera distortion, night-time double imaging, and solar load all grow with the angle. Above the mirror sits the camera window, a zone of the lamination held to optical tolerances the rest of the screen does not need.',
      why: 'Since bonded screens replaced rubber gaskets, the windshield has been a shear panel, and the slim A-pillars of this cage assume it. Removing the glass measurably softens the front ring, which is why a windshield here is fitted like structure, not trim.',
      fail: [
        'Any replacement forces ADAS recalibration: a half-degree of camera pitch error is meters of lane-position error at range.',
        'Edge delamination from trapped moisture is the slow failure; the frit and encapsulation exist to keep water out of the interlayer.',
        'Chip repair is off-limits inside the camera zone; resin refraction there corrupts what the car sees.',
      ],
      explode: [0.5, 0.65, 0],
    },
    'side-glass': {
      name: 'Side glass',
      tagline: 'Frameless laminated panes, and the four counts of drag they do not buy.',
      mass: 16,
      specs: [
        ['Front doors', '4.96 mm laminated acoustic'],
        ['Rear doors', '3.85 mm tempered'],
        ['Flushness', 'Not flush: 3.5 mm inside the door skin at the joint'],
        ['Frameless drop', '8 mm on unlatch'],
        ['Tumblehome', '29 degrees at the glass'],
      ],
      how: 'Front panes are laminated for the same acoustic reasons as the screen, and because a laminated pane resists casual break-in far longer than tempered. Rear panes stay tempered: cheaper, lighter, and they preserve the one pane a rescue tool can actually shatter, which is an honest safety argument, not a cost excuse. The frameless doors drop each pane 8 mm on unlatch to clear the seal lip, then press it back for closure.\n\nTHE PANE IS NOT FLUSH, and this panel used to say it was. The aero argument for frameless glazing is real: framed glass sits in a channel roughly 6 mm below the body surface, a pane standing 0.5 mm proud with no frame at all lets the boundary layer cross the beltline without tripping, and on a car chasing 0.21 that is worth about four counts of drag. This car does not build it, and it is worth being exact about what it does build, because the first correction of this panel was not.\n\nRay-swept off the mesh, the pane\'s outer face is 0.9305 at its foot at y 0.9258. The door skin at that SAME height is a flat land at 0.9340 running the full span of both doors, so the flushness step at the joint is 3.5 mm, glass inside the land. The door skin\'s widest point is 0.9582, but it sits at y 0.9156, ten millimeters lower and on the far side of the door\'s own beltline turnover, which gives up 24.2 mm of z in 4.4 mm of height. Subtracting those two numbers gives 27.7 mm, and 27.7 was published here as the flushness. It is the depth of the shoulder from the widest point of the door up to the glass, taken at two different stations. Both figures are real and they answer different questions, and a flushness row has to carry the one measured at the joint.\n\nWhich of them costs the drag count is neither obvious nor the pane. The boundary layer coming up the door side meets the 24.2 mm turnover BEFORE it reaches any glass, so it trips on the door skin whether or not the pane is flush with the land above. The four counts are not built, and closing the 3.5 mm at the joint would not build them. What stands in the way is the beltline turnover, which is a body-side feature, not a glazing one.\n\nWhat the pane can and cannot do, since this panel previously said it could not move at all. The daylight opening was already brought outboard from z 0.880 to 0.920 once. Taking it the remaining 3.5 mm out to sit flush with the land at 0.9340 is FREE in frontal area: the built silhouette over the pane\'s own x span at the glass foot height is 0.9362, and that is the B-pillar crown at x 0.020 rather than any panel, so a pane at 0.9340 still sits 2.2 mm inside the widest thing on the car at that height and casts no new shadow. What the pane cannot do is reach the door skin\'s 0.9582, which is 24 mm past the crown and would make the glass the widest thing on the car and pay for its count in area. So the joint is closable and the shoulder is not, and the shoulder is the one that owns the drag. The geometry is left alone here because moving it moves the Gen 1 silhouette, and Gen 1 is the zero the frontal-area re-zero was measured against.\n\nWHAT THAT DOES TO THE LADDER, said out loud rather than quietly patched. js/efficiency.js carries \'body\': { cd: 0.21 } for Gen 1, and four counts of that were bought with flush glazing this geometry does not have. Withdrawing them gives Cd 0.214. Priced through the ladder\'s own model at the measured 1,671 kg, that is 3 miles of range. The Wh/mi cost has to be quoted against a named area convention, because the frontal-area re-zero landed while this was being measured: the same withdrawal reads 221.1 to 222.7 Wh/mi and 430 to 427 miles on the area convention before it, and 228.2 to 229.9 and 416 to 413 after it. So it is +1.6 Wh/mi on the old area and +1.8 on the measured one, and it differs because a Cd delta is charged against the reference area and the reference area moved by 8 percent. The 3 miles survives the convention change and the Wh/mi does not, so a single convention-free number for it is the one thing not to write here.\n\nIt is NOT changed in js/efficiency.js here, and the reason is design/retro-gen9.md: no Cd count moves until one integrator re-zeroes every body at once, because Gen 1 is the ladder\'s zero and patching it alone would leave eight rungs measured against a baseline that no longer exists. The area half of that re-zero has now been done. This is the first sized entry for the coefficient half.',
      why: 'Frameless glazing is still right for the reasons that survive the measurement: no channel, no frame, no mechanism, no mass, and a beltline the eye reads as one surface rather than as glass in a picture frame. What it is not currently buying is the drag count, because the beltline turns over 24.2 mm in front of the pane and the pane then sits 3.5 mm inside the land that turnover leaves, and a lever nobody has pulled is worth naming as an unspent lever rather than banking as a win. Glass is still the cheapest place on a body to buy counts: it needs tooling discipline and a seal that tolerates a naked edge, and no mass at all.',
      fail: [
        'Frameless seals wear into a whistle; the drop-and-press cycle is tested to 100k operations for exactly this.',
        'Laminated side glass defeats rescue punches; the tempered rear panes and marked cut points are the designed answer.',
        'Regulator alignment drifts with door slam count; a misaligned pane announces itself as wind noise at speed.',
      ],
      explode: [0, 0.5, 0.55],
    },
    hood: {
      name: 'Hood',
      tagline: 'An aluminum skin tuned to strike a pedestrian more softly than what sits beneath it.',
      mass: 11,
      specs: [
        ['Outer', 'AA6016, 0.9 mm stamped'],
        ['Inner', 'AA5182 cone-waffle structure'],
        ['Head clearance', '70 mm minimum to hard points'],
        ['HIC target', '< 1,000 across child and adult zones'],
        ['Closure', 'Double-pawl latch, gas struts'],
      ],
      how: 'Pedestrian head impact is scored by HIC, a weighted integral of deceleration during the strike, and the way to lower it is stroke: the skin must deflect 60 to 80 mm before the head finds anything hard. So the frunk tub, strut towers, and casting edges are all packaged at least 70 mm below the outer surface, and the inner panel is a field of shallow cones that buckle at a tuned force, turning the hood into a distributed crush zone the size of a door.\n\nThe 0.9 mm outer skin on its own would oil-can at a touch; bonded to the cone structure with structural mastic it gains flexural depth without welds that would print through the paint. Aluminum halves the panel mass against steel, and on the highest closure of the nose that is mass exactly where you least want it.',
      why: 'The nose line at 0.78 m and the long fall to the windshield are not styling first: wrap-around-distance zones in the pedestrian rules dictate where a head lands at speed, and the surface is shaped so every landing point has stroke under it. The design freedom people admire in EV noses is real, but it is exercised inside that rulebook.',
      fail: [
        'Low dent stiffness is the tax on pedestrian compliance: hail and careless palms mark it.',
        'Mastic cured off-schedule reads through the paint as a ghost pattern of the inner cones.',
        'The double-pawl latch exists because a hood at speed is a windshield strike; it is a scheduled inspection point.',
      ],
      explode: [0.55, 0.5, 0],
    },
    doors: {
      name: 'Doors',
      tagline: 'Four aluminum boxes hung to half a millimeter so the airflow never notices the split.',
      mass: 82,
      count: 4,
      specs: [
        ['Outer', 'AA6016, 0.95 mm, hemmed'],
        ['Intrusion beam', '7003-T6 extrusion, diagonal'],
        ['Panel gap', '8.0 mm nominal, ±0.5'],
        ['Flushness', '±0.5 mm skin to skin'],
        ['Sealing', 'Twin EPDM barriers'],
        ['Mass', '20.5 kg per door'],
      ],
      how: 'Each door is a stamped outer skin hemmed over an inner frame, with a 7003 extruded beam running diagonally from the hinge face toward the latch so a side impact loads the beam in tension between two anchored corners rather than bending an unsupported span. The latch striker ties the door into the B-pillar, which is why a closed door is part of the side structure, not a lid over a hole.\n\nThe 8 mm gap is a tolerance treaty between panels that come from different processes. What the air cares about is not the gap width but the step: a flush joint at ±0.5 mm keeps the boundary layer attached where a 2 mm mismatch would trip it. Hinges adjust in three axes, and a camera gauge at end of line sets every door against the casting datum, which is the quiet reason megacast bodies fit better.',
      why: 'Gaps are honest: they are the visible sum of every tolerance behind them, and shrinking the sum costs process control, not craftsmanship theater. Chasing flushness pays twice, in drag counts and in the perceived quality that a customer reads with a fingertip in the showroom.',
      fail: [
        'EPDM seals take a compression set over years; closing effort rises and wind noise follows.',
        'Front hinge sag from years of leaning on an open door shows up as a latch that needs a firmer shut.',
        'Flush handles freeze in ice storms; the heater element behind each one is an admission, not a gadget.',
      ],
      explode: [0.05, 0, 0.85],
    },
    fenders: {
      name: 'Fenders and quarter panels',
      tagline: 'Soft-skinned caps over the arches: bolted at the front, bonded at the back.',
      mass: 16,
      specs: [
        ['Front fenders', 'Bolt-on stamped AA6016'],
        ['Rear quarters', 'Bonded and riveted to the cage'],
        ['Arch radius', '440 mm over the 360 mm built tire'],
        ['Clearance case', 'Full lock plus full bump'],
        ['Closure panels', 'Tail roll and cowl bonded, deck lid hinged'],
        ['Charge flap', '152 mm aperture, flush lid'],
      ],
      how: 'The front fender bolts on and is fitted late in the line, which lets its gaps be set against the finished door rather than hoped for. The arch is cut at 440 mm radius over a tire that measures 360 mm on the built wheel, so the annulus is 80 mm, and it is consumed by full bump travel plus full steering lock plus snow chains, the classic clearance case. The opening carries a rolled lip standing 13 mm proud of the panel face: an arch edge is the one place on a body side where the eye can read the thickness of a stamping, and a raw cut section reads as a first draft.\n\nThe rear quarter is the opposite philosophy: it is structural skin, bonded and riveted into the cage, forming the C-pillar outer and the tail corner in one stamping. The deck panel between backlight and lamp bar is the one piece of that group that is NOT bonded to anything: it is the trunk lid, hung on a transverse axis at its own front cut, and it is the reason this part id owns a closure as well as a set of skins.\n\nAerodynamically the arches are the expensive real estate: on a 0.21 car the wheel wells account for roughly a quarter of total drag, which is why arch gaps are tight and the fascia feeds air curtains across the front wheel faces.',
      why: 'Front and rear are joined differently because they fail differently: front corners collect parking damage, so they unbolt; rear quarters almost never do, so they buy stiffness continuity instead. Same panel thickness, opposite statistics, opposite joints.',
      fail: [
        'A missing arch liner lets the tire sandblast the paint from inside the wheel well.',
        'Quarter panel repair is a bonded cut-in section, hours of labor where a fender would be four bolts.',
        'The wide flat deck panel will oil-can if the mastic beads between its outer skin and its inner panel skip in production; it drums at highway speed, and on a hinged lid there is no cage behind it to damp the noise.',
      ],
      explode: [0.3, 0.05, 0.6],
    },
    fascias: {
      name: 'Bumper fascias',
      tagline: 'Painted TPO over foam: the only body parts designed to be hit.',
      mass: 11,
      specs: [
        ['Material', 'TPO, 3.0 mm injection molded'],
        ['Energy absorber', 'EPP foam ahead of the beam'],
        ['Pedestrian case', 'FlexPLI leg-form limits'],
        ['Sensor suite', '12 ultrasonic + radar window'],
        ['Aero features', 'Air-curtain inlets, sealed shutline'],
      ],
      how: 'Thermoplastic polyolefin flexes and recovers below about 8 km/h, so shopping cart taps cost paint at worst. Between the skin and the aluminum beam sits an EPP foam block tuned for the leg-form impactor: the rules cap tibia acceleration and knee shear, which sets a ceiling on stiffness at exactly bumper height, and the beam behind sits in the regulated 445 to 555 mm band so car meets car beam-to-beam.\n\nThe fascia is also the front of the aero story: it places the stagnation line, feeds the air curtains that sheet flow across the front wheels, and seals against the hood shutline so cooling air goes through the radiator, not around it. The radar looks through the plastic, which quietly constrains the paint: heavy metal-flake finishes attenuate the beam, so the color palette is an RF specification.',
      why: 'Separating a cheap, paintable, elastic skin from the metal structure is one of the oldest good ideas in car design: pedestrians and parking meet plastic, the beam and rails behind meet physics, and each layer is replaceable at its own price.',
      fail: [
        'Paint on TPO and paint on aluminum age apart; a resprayed fascia that matched in the booth can mismatch in daylight.',
        'Wet slush frozen over the radar window blinds cruise assist; the car degrades to camera-only and says so.',
        'The clip towers behind the skin snap in minor hits, so a cosmetic scuff can hide a fascia that is no longer locating.',
      ],
      explode: [1.1, 0, 0],
    },
    headlights: {
      name: 'Headlamps',
      tagline: 'Two 84-pixel matrices that carve oncoming traffic out of the high beam.',
      mass: 6,
      count: 2,
      specs: [
        ['Source', '84-pixel matrix LED per side'],
        ['Low beam flux', '1,400 lm on road'],
        ['High beam range', '480 m'],
        ['Blanking latency', '~50 ms camera to pixel'],
        ['Mount height', '0.71 m to lamp center, regulation min 0.50'],
      ],
      how: 'Each lamp images an array of 84 individually driven LEDs through a projection lens, so the beam is a low-resolution picture drawn on the road. The windshield camera detects headlamps and tail lamps ahead, and the controller blanks only the pixels covering each vehicle: oncoming drivers sit in a moving dark tunnel while the rest of the scene stays under full high beam. The loop runs at roughly 50 ms, fast enough to track a car cresting a rise.\n\nThe engineering fight in a strip this slim is thermal. LED flux falls as junction temperature rises, and a shallow housing has little air to convect into, so each module conducts into a finned heatsink and the housing breathes through a membrane vent. The slim horizontal format is not fashion alone: it keeps the lamp mass low and outboard where the nose needs to stay soft for the pedestrian zones between the lamps.',
      why: 'Adaptive beams exist because the regulations finally allow the light to move instead of forcing a binary high-low choice. Glare-free high beam is the rare feature that is pure safety with no tradeoff for anyone: more seeing distance for the driver, less glare for everyone else.',
      fail: [
        'Condensation inside slim housings is the chronic field complaint; membrane vents manage it but do not abolish it.',
        'A failed pixel controller degrades gracefully to a plain low beam, never to darkness.',
        'Beam aim is referenced to ride height; a load-leveling fault turns a legal lamp into a glare source.',
      ],
      explode: [1.15, 0.12, 0.18],
    },
    taillights: {
      name: 'Tail lamp bar',
      tagline: 'One light guide across the tail: brake warning measured in milliseconds.',
      mass: 3,
      specs: [
        ['Source', '240 LEDs into a PMMA guide'],
        ['Brake rise time', '< 10 ms vs ~200 ms bulb'],
        ['Functions', 'Tail, brake, turn signals, CHMSL'],
        ['Photometry', 'EU and US modes, software set'],
      ],
      how: 'The bar is a single PMMA light guide running the width of the tail: LEDs fire into its ends and edges, light travels by total internal reflection, and micro-prisms along the back face leak a calibrated fraction outward so 240 point sources read as one unbroken red line. Uniformity is a tooling problem, prism density increasing with distance from each LED, solved in the mold, not in software.\n\nThe number that matters is rise time. An LED reaches full output in under 10 ms where an incandescent filament needs around 200 ms; at 130 km/h that difference is about seven meters of extra warning distance for the car behind. The full-width format is conspicuity engineering: a wide lit edge gives following drivers a better distance and closing-rate cue at night than two separate clusters.',
      why: 'A tail lamp is a communication channel with exactly one message and no retry, so latency and legibility beat styling every time. That the full-width bar also became the visual signature of the era is the rare case of regulation, physics, and fashion agreeing.',
      fail: [
        'A crack anywhere in the guide shows as a dark band; the whole bar is replaced, there is no partial repair.',
        'PMMA yellows under UV over a decade; the outer lens carries the stabilizer package to slow it.',
        'Turn-signal color rules differ by market, amber in the EU, red permitted in the US; one lamp serves both only because photometry is software-configured.',
      ],
      explode: [-1.2, 0.12, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   Key lines (side view, meters): nose 0.78 at x 2.30 rising to 0.92 at 0.85,
   windshield (0.85, 0.95) to (0.35, 1.40), roof 1.42 back to -0.55, backlight
   down to (-1.50, 1.02), deck to the tail at (-2.30, 0.92). Beltline 0.92.
   Half-widths: 0.94 at the doors, 0.62 at the roof. Arches at x = ±1.45 ± 0.44
   stay open: the dark background reads as the wheel opening. */

const ARCH_R = 0.44;

/* Kept as this module's export because five other bodies import it, but it
   is lib.mirrorZ now rather than a copy of it. The comment it used to carry
   said lib.mirrorZ "throws on .clone()" because Object3D.clone JSON-copies
   userData and the explode Vector3 arrives as a plain {x,y,z}: lib.mirrorZ
   has rebuilt the vector from its fields for a long time and does not
   throw, so the stand-in was duplicating working code. It also could not
   see lib.hinge, which is what a closure needs mirrored, and a second copy
   of a mirroring rule is exactly how one side of a car ends up disagreeing
   with the other. */
export function mirrorZ(group) { return lib.mirrorZ(group); }

/* Angled box helper: rotations in radians, order z then x then y. */
export function abox(w, h, d, mat, x, y, z, rz = 0, rx = 0, ry = 0) {
  const m = lib.box(w, h, d, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz, 'ZXY');
  return m;
}

/* Extruded XY profile placed at depth z0, thickness t along +z. */
export function profile(pts, arcs, t, mat, z0) {
  const s = new THREE.Shape();
  s.moveTo(pts[0][0], pts[0][1]);
  let ai = 0;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    if (p === 'arc') {
      const [cx, cy, r, a0, a1, cw] = arcs[ai++];
      s.absarc(cx, cy, r, a0, a1, cw);
    } else {
      s.lineTo(p[0], p[1]);
    }
  }
  const geo = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 18 });
  const m = lib.mesh(geo, mat);
  m.position.z = z0;
  return m;
}

/* ── Surface datums ────────────────────────────────────────────────────────

   Every panel added by the detail pass is placed through one of these, and
   every one of them was swept off the Gen 1 geometry rather than restated,
   so no new panel can move a surface the drag figure is booked against.

   noseY and deckY are the outer faces of the hood and trunk planes. The
   original plates put those faces through (0.875257, 0.944480) to
   (2.278769, 0.809326) and (-1.503520, 1.017800) to (-2.279930, 0.943034),
   a 0.096 rad rake each way, and both functions reproduce them exactly.

   fendTopY and quarTopY are the crown lines of the two side profiles, read
   off their own point lists: (2.26, 0.79) to (1.128, 0.95) at the front and
   (-1.028, 0.95) to (-2.27, 0.88) at the rear.

   SIDE_Z is the bumper corner wraps' own outboard extreme,
   0.85 + 0.12 sin 0.55 + 0.014 cos 0.55 = 0.9246578. The side panels are
   brought out to it because the frontal silhouette at every height they
   occupy is owned by the B-pillar and the doors, 0.9292 to 0.9582 measured
   off the built mesh, so a fender face here costs nothing. The upper figure
   was written here as 0.9585 and is 0.958249: the widest built geometry on
   the body side is the door skin's beltline crest, and nothing on this car
   reaches 0.9585. A coordinate of (-0.596, 0.915, 0.9582) was quoted here
   for it and no such vertex exists. Exactly four vertices sit at the
   maximum, all of them at y 0.9156, at x -1.0070, -0.0010, 0.0410 and
   1.1030, which are the four door corners.

   THE B-PILLAR EXPOSURE, which those two numbers hide rather than state.
   The pair above is the ENVELOPE of the pillar and the doors together, and
   the two do not agree with each other. Swept as surfaces rather than as
   vertices, by casting a ray along +z at the pillar station x 0.020 and at
   clear door skin, the B-pillar member's crown stands OUTBOARD of the door
   skin by 21.8 mm at the bottom of the aperture at y 0.445, 19.0 at y 0.50,
   18.2 at y 0.60, 13.1 at y 0.65, 12.1 at y 0.70, 4.9 at y 0.80 and 2.0 at
   y 0.82; it goes flush at y 0.833 and is 19.2 mm INSIDE the skin at the
   beltline. The exposure over the door aperture is therefore 0 to 22 mm.

   A figure of 11 to 14 mm has been quoted for this and it is a slice of
   that curve rather than its range. Measured against the door skin plane as
   it stood BEFORE the detail pass, z = 0.894051 + 0.070084 y, the same
   sweep reads 14.0 at y 0.50, 13.2 at y 0.60, 12.2 at y 0.70 and 9.6 at
   y 0.75, so 11 to 14 mm is what the middle of the aperture measured on the
   old skin. Two things move it. The curve runs from 16.8 mm at the bottom
   of the aperture to zero at y 0.833 and the middle is not the range. And
   the body-side crease steps the lower door panel 5 mm inboard below
   y 0.643, which adds exactly 5 mm to every reading under that height and
   takes the peak from 16.8 to 21.8. The crease was worth having and it was
   not free: 500 mm of dead flat door skin cost a highlight, and the price
   was 5 mm more exposed pillar on the lower half. */
const NOSE_TILT = -0.096, DECK_TILT = 0.096;
const noseY = (x) => 0.944480 - 0.096296 * (x - 0.875257);
const deckY = (x) => 1.017800 + 0.096296 * (x + 1.503520);
const fendTopY = (x) => 0.950 - 0.141343 * (x - 1.128);
const quarTopY = (x) => 0.950 + 0.056361 * (x + 1.028);
const SIDE_Z = 0.9246578;

/* Rounded-rectangle outline, half-extents hw by hd with corner radius r.
   The point count is 4 (seg + 1) whatever the arguments, so two outlines at
   different radii can be lofted point for point. */
function roundRect(hw, hd, r, seg = 5) {
  const p = [], q = Math.PI / 2;
  const rr = Math.max(1e-4, Math.min(r, hw, hd));
  for (const [cx, cy, a0] of [[hw - rr, hd - rr, 0], [-(hw - rr), hd - rr, q],
                              [-(hw - rr), -(hd - rr), 2 * q], [hw - rr, -(hd - rr), 3 * q]]) {
    for (let i = 0; i <= seg; i++) {
      const a = a0 + (i / seg) * q;
      p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
  }
  return p;
}

/* Shape from a closed [x, y] polygon, plus optional holes. */
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

/* A closure panel: rounded rectangle lying in the XZ plane, every rim
   chamfered by c, and THE ORIGIN ON THE TOP FACE, so a panel is placed by
   naming the point its visible surface has to pass through. lib.plate hangs
   its slab between y + t/2 and y + 3t/2 instead, which is the arithmetic
   that has already put three fastener banks inside the parts they held. */
function cpanel(w, d, t, r, c, mat) {
  const seg = Math.max(4, Math.min(10, Math.round(r * 80)));
  const geo = new THREE.ExtrudeGeometry(
    shapeOf(roundRect(w / 2 - c, d / 2 - c, r - c, seg), null),
    { depth: Math.max(1e-4, t - 2 * c), bevelEnabled: true, bevelThickness: c,
      bevelSize: c, bevelSegments: 1, curveSegments: 4 });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -(t - c), 0);
  return lib.crease(lib.mesh(geo, mat), 30);
}

/* cpanel with its middle cut out: an aperture RING rather than a lid.

   A gutter's whole job is to put a lit floor under a shutline, so it only
   ever needed to be as wide as the gap can see. Drawn solid it also closed
   the aperture, which nobody noticed while the closures were painted on:
   open the hood and the plate underneath reads as a SECOND HOOD, which is
   exactly what Davis saw. `band` is how far inboard of its own rim the
   plate survives, and 60 mm is measured rather than picked: the gap is
   8.0 mm wide and the plate hangs 18 mm under the closure plane, so a
   sightline steep enough to see past the near lip lands within 18 mm of it
   and the ring is more than three times that. */
function cring(w, d, t, r, c, mat, band) {
  const seg = Math.max(4, Math.min(10, Math.round(r * 80)));
  const ow = w / 2 - c, od = d / 2 - c;
  const geo = new THREE.ExtrudeGeometry(
    shapeOf(roundRect(ow, od, r - c, seg),
            [roundRect(ow - band, od - band, Math.max(0.004, r - c), seg)]),
    { depth: Math.max(1e-4, t - 2 * c), bevelEnabled: true, bevelThickness: c,
      bevelSize: c, bevelSegments: 1, curveSegments: 4 });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -(t - c), 0);
  return lib.crease(lib.mesh(geo, mat), 30);
}

/* Panel with real apertures, extruded t along +z from the local origin with
   every rim, hole rims included, chamfered by c. The chamfer grows the
   outline by c and shrinks each hole by c, exactly as a rolled edge does,
   and the callers below state the mid-surface and allow for it. */
function holed(outline, holes, t, c, mat) {
  const geo = new THREE.ExtrudeGeometry(shapeOf(outline, holes), {
    depth: Math.max(1e-4, t - 2 * c), bevelEnabled: c > 0, bevelThickness: c,
    bevelSize: c, bevelSegments: 1, curveSegments: 5 });
  geo.translate(0, 0, c);
  return lib.crease(lib.mesh(geo, mat), 30);
}

/* profile() with apertures cut through it, for the one side panel that has
   a hole in it. No bevel: a bevel grows an outline by its own size, which
   on this panel would close the door gap it was measured to open. */
function profileCut(pts, arcs, holes, t, mat, z0) {
  const s = new THREE.Shape();
  s.moveTo(pts[0][0], pts[0][1]);
  let ai = 0;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    if (p === 'arc') {
      const [cx, cy, r, a0, a1, cw] = arcs[ai++];
      s.absarc(cx, cy, r, a0, a1, cw);
    } else {
      s.lineTo(p[0], p[1]);
    }
  }
  for (const h of holes || []) {
    const q = new THREE.Path();
    q.moveTo(h[0][0], h[0][1]);
    for (let i = 1; i < h.length; i++) q.lineTo(h[i][0], h[i][1]);
    q.closePath();
    s.holes.push(q);
  }
  const geo = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 18 });
  const m = lib.crease(lib.mesh(geo, mat), 30);
  m.position.z = z0;
  return m;
}

/* A chamfered box placed like abox. */
function cabox(w, h, d, c, mat, x, y, z, rz = 0, rx = 0, ry = 0) {
  const m = lib.cbox(w, h, d, c, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz, 'ZXY');
  return m;
}

/* The panel that turns a flat side plate and a flat deck into one surface.
   A ruled band between two space curves at zi and zo, crowned by `crown` so
   the turn reads as a shoulder rather than a bevel. Linear interpolation
   only: this body's clearances were audited off flat plates and a smoothed
   band would move the surface between stations. */
function shoulderBand(xs, zi, zo, yi, yo, crown, mat, cols = 6) {
  const secs = xs.map((x) => {
    const a = yi(x), b = yo(x), r = [];
    for (let j = 0; j <= cols; j++) {
      const t = j / cols;
      r.push([x, a + (b - a) * (t * t * (3 - 2 * t)) + crown * Math.sin(Math.PI * t),
              zi + (zo - zi) * t]);
    }
    return r;
  });
  return lib.crease(lib.loft(secs, mat, false, { interp: 'linear' }), 34);
}

/* Ruled skin between two space polylines given as [x, y, z] point pairs.
   Used for the A-pillar and C-pillar outers, which are the two places this
   body showed daylight straight through to the cage. */
function ruled(a, b, n, cols, crownZ, mat) {
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t,
                             p[2] + (q[2] - p[2]) * t];
  const secs = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, p = lerp(a[0], a[1], t), q = lerp(b[0], b[1], t), r = [];
    for (let j = 0; j <= cols; j++) {
      const u = j / cols, s = lerp(p, q, u);
      s[2] += crownZ * Math.sin(Math.PI * u) * (s[2] < 0 ? -1 : 1);
      r.push(s);
    }
    secs.push(r);
  }
  return lib.crease(lib.loft(secs, mat, false, { interp: 'linear' }), 34);
}

/* Structural part ids shared by every shell variant. A shell variant module
   imports STRUCT_META and buildStructure so the crash hardware, rockers,
   and safety cage stay identical while the skin changes. */
export const STRUCT_IDS = ['front-casting', 'rear-casting', 'crash-rails', 'rockers', 'pillars'];
export const STRUCT_META = Object.fromEntries(STRUCT_IDS.map((id) => [id, SYSTEM.parts[id]]));

export function build() {
  const sys = new THREE.Group();
  buildStructure(sys);
  buildShell(sys);
  return sys;
}

/* ── the invariant structure ── */
export function buildStructure(sys) {
  /* ── front megacasting: outboard spars, cross portion, shock towers.
     The driveF zone (x 1.15..1.75, y 0.22..0.58, z ±0.35) stays clear. */
  const fc = lib.part('front-casting', [0.85, -0.35, 0]);
  for (const s of [-1, 1]) {
    fc.add(abox(0.51, 0.28, 0.24, M.castAlu, 1.805, 0.44, s * 0.475));
    fc.add(abox(0.20, 0.16, 0.15, M.castAlu, 1.65, 0.66, s * 0.535));
    const rib = lib.fins(0.45, 0.045, 0.20, 4, 0.012, M.castAlu);
    rib.position.set(1.805, 0.60, s * 0.475);
    fc.add(rib);
  }
  /* The cross portion is a lower crossmember at the casting's front face,
     x 2.000 to 2.070, y 0.300 to 0.370, not a block filling the nose. It
     used to be one 0.31 x 0.28 x 0.68 solid spanning x 1.760 to 2.070 over
     the full 280 mm section height, which is 0.0590 m3 of drawn aluminum,
     159 kg at 2,700 kg/m3, against a part that declares 48 kg for the whole
     casting. The bay it filled is where every thermal variant packages its
     chiller, manifold, pumps and heat pump, so the model was drawing metal
     through the cooling pack and burying it: thermal/chiller measured 95.9
     percent enclosed, thermal/manifold 70.9, thermal/fans 67.5,
     thermal-6/pressure-set 93.0. Opening the bay is the honest drawing and
     it retires thermal/manifold and thermal-6/glycol-loop outright and takes
     thermal-6/pressure-set from 60.0 to 45.0 mm, thermal/fans and
     thermal-6/radiator from 48.0 to 33.0, with no pair anywhere getting
     deeper. */
  fc.add(abox(0.07, 0.07, 0.68, M.castAlu, 2.035, 0.335, 0));
  sys.add(fc);

  /* ── rear megacasting, mirrored logic, plus its bolt-on rear rails/beam */
  const rc = lib.part('rear-casting', [-0.85, -0.35, 0]);
  for (const s of [-1, 1]) {
    rc.add(abox(0.45, 0.28, 0.24, M.castAlu, -1.825, 0.44, s * 0.475));
    rc.add(abox(0.18, 0.16, 0.15, M.castAlu, -1.70, 0.66, s * 0.535));
    const rib = lib.fins(0.40, 0.045, 0.20, 4, 0.012, M.castAlu);
    rib.position.set(-1.825, 0.60, s * 0.475);
    rc.add(rib);
    rc.add(abox(0.17, 0.09, 0.09, M.alu, -2.145, 0.55, s * 0.42));
  }
  rc.add(abox(0.23, 0.28, 0.68, M.castAlu, -1.935, 0.44, 0));
  rc.add(abox(0.06, 0.10, 1.25, M.alu, -2.25, 0.55, 0));
  sys.add(rc);

  /* ── front crash rails + bumper beam, bolted flanges at the casting face */
  const rails = lib.part('crash-rails', [0.95, -0.05, 0]);
  for (const s of [-1, 1]) {
    rails.add(abox(0.54, 0.09, 0.09, M.alu, 1.97, 0.55, s * 0.55));
    rails.add(abox(0.02, 0.15, 0.12, M.alu, 1.71, 0.55, s * 0.535));
  }
  rails.add(abox(0.06, 0.10, 1.30, M.alu, 2.24, 0.55, 0));
  sys.add(rails);

  /* ── rockers: full-length sills between the arches */
  const rockL = lib.part('rockers', [0, -0.5, 0.3]);
  rockL.add(abox(2.02, 0.10, 0.07, M.paintDark, 0, 0.37, 0.88));
  sys.add(rockL);
  sys.add(mirrorZ(rockL));

  /* ── safety cage: mirrored side members + central headers and cowl beam */
  const cageSide = lib.part('pillars', [0, 0.32, 0]);
  const members = [
    [[0.85, 0.95, 0.72], [0.35, 1.40, 0.615]],                          /* A-pillar */
    [[0.35, 1.40, 0.615], [-0.55, 1.42, 0.615]],                        /* roof rail */
    [[0.02, 0.44, 0.90], [0.02, 0.92, 0.895], [0.02, 1.40, 0.62]],      /* B-pillar */
    [[-0.55, 1.42, 0.615], [-1.45, 1.00, 0.70], [-1.72, 0.82, 0.76]],   /* C-pillar */
  ];
  for (const m of members) cageSide.add(lib.tube(m, 0.042, M.darkSteel));
  sys.add(cageSide);
  sys.add(mirrorZ(cageSide));

  const cageMid = lib.part('pillars', [0, 0.32, 0]);
  cageMid.add(lib.tube([[0.35, 1.40, -0.615], [0.35, 1.40, 0.615]], 0.04, M.darkSteel));
  cageMid.add(lib.tube([[-0.55, 1.42, -0.615], [-0.55, 1.42, 0.615]], 0.04, M.darkSteel));
  cageMid.add(lib.tube([[0.85, 0.93, -0.72], [0.85, 0.93, 0.72]], 0.04, M.darkSteel));
  sys.add(cageMid);
}

/* The marque: a chevron, extruded 4.4 mm with a beveled rim, the same
   outline the later bodies carry. A decal has no edge for a softbox to
   find; a badge does, which is the whole reason this is geometry. */
const CHEVRON = [
  [-0.045, 0.000], [-0.017, -0.019], [0.000, -0.007], [0.017, -0.019],
  [0.045, 0.000], [0.017, 0.019], [0.000, 0.007], [-0.017, 0.019],
];

/* A fascia face: outline and holes stated as [z, y] polygons, extruded t
   along x with every rim chamfered by c, placed with its outer face on
   xFace. dir is +1 for the nose and -1 for the tail. */
function facePanel(outline, holes, t, c, mat, xFace, dir) {
  const m = holed(outline, holes, t, c, mat);
  m.geometry.rotateY((dir * Math.PI) / 2);
  m.geometry.translate(xFace - dir * t, 0, 0);
  return m;
}

/* roundRect offset into place, for the fascia outlines above. */
function rrAt(hw, hd, r, cz, cy) {
  return roundRect(hw, hd, r, 5).map(([a, b]) => [a + cz, b + cy]);
}

/* ── the reference shell: panels, glass, lamps ─────────────────────────────

   Gen 1 is the one body on the ladder that has to read as a mass-production
   stamped car, so the detail vocabulary is the familiar one: real gaps
   between real panels, a gutter behind every gap so a shutline reads as a
   dark line and not as a view of the chassis, chamfered rims everywhere, a
   grille with depth, lamp units with something inside them, a cowl with
   wipers in it, and a charge flap.

   Two rules bound every number below. Panel planes that the frontal
   silhouette is measured against do not move: the door skin's outer plane,
   the bumper corner wraps and both valances are carried untouched. Where a
   panel is nowhere near the silhouette, which on this car is anything
   inboard of 0.9247 at the fender and 0.86 at either fascia, the geometry
   is free and is used. */
function buildShell(sys) {
  /* ── glass roof and backlight ──
     The pane keeps its slab, y 1.441 to 1.453, but is now placed off its
     top face and chamfered, and it gains the ceramic frit band the part's
     own text calls the thing that hides and protects the bonded edge. */
  const roof = lib.part('roof-glass', [0, 0.85, 0]);
  const roofPane = cpanel(0.94, 1.16, 0.012, 0.06, 0.003, M.glass);
  roofPane.position.set(-0.10, 1.453, 0);
  roof.add(lib.shell(roofPane));
  for (const [w, d, x, z] of [[0.040, 1.160, 0.350, 0], [0.040, 1.160, -0.550, 0],
                              [0.940, 0.040, -0.100, 0.560], [0.940, 0.040, -0.100, -0.560]]) {
    roof.add(cabox(w, 0.005, d, 0.0015, M.paintDark, x, 1.4390, z));
  }
  roof.add(lib.shell(cabox(1.04, 0.012, 1.34, 0.004, M.glass, -1.025, 1.22, 0, 0.398)));
  /* backlight frit, on the inner face: local +y of that box points up and
     aft, so the cabin side is local -y */
  const blAt = (lx, ly, lz, w, h, d) => cabox(w, h, d, 0.0015, M.paintDark,
    -1.025 + Math.cos(0.398) * lx - Math.sin(0.398) * ly,
    1.22 + Math.sin(0.398) * lx + Math.cos(0.398) * ly, lz, 0.398);
  roof.add(blAt(0.492, -0.010, 0, 0.050, 0.005, 1.34));
  roof.add(blAt(-0.492, -0.010, 0, 0.050, 0.005, 1.34));
  for (const s of [-1, 1]) roof.add(blAt(0, -0.010, s * 0.645, 1.04, 0.005, 0.050));
  sys.add(roof);

  /* ── windshield ──
     Rake 48 degrees, unchanged. What is new is the frit frame, the camera
     window the part's text names, and the wipers. */
  const ws = lib.part('windshield', [0.5, 0.65, 0]);
  const WSA = Math.atan2(0.45, -0.50);
  ws.add(lib.shell(cabox(0.68, 0.014, 1.30, 0.004, M.glass, 0.60, 1.175, 0, WSA)));
  /* screen-local: +x runs up the glass, +y is the cabin side */
  const wsAt = (lx, ly) => [0.60 + Math.cos(WSA) * lx - Math.sin(WSA) * ly,
                            1.175 + Math.sin(WSA) * lx + Math.cos(WSA) * ly];
  for (const lx of [0.320, -0.320]) {
    const [x, y] = wsAt(lx, 0.010);
    ws.add(cabox(0.036, 0.005, 1.30, 0.0015, M.paintDark, x, y, 0, WSA));
  }
  for (const z of [0.620, -0.620]) {
    const [x, y] = wsAt(0, 0.010);
    ws.add(cabox(0.68, 0.005, 0.056, 0.0015, M.paintDark, x, y, z, WSA));
  }
  const [cwx, cwy] = wsAt(0.240, 0.011);
  ws.add(cabox(0.130, 0.006, 0.190, 0.002, M.plastic, cwx, cwy, 0, WSA));
  /* wipers, parked. The screen's outward normal is (0.66898, 0.74329), so
     a blade placed 16 mm along it from the mid-plane stands 4 mm clear of a
     14 mm laminate, and the arm reaches down to a boss on the cowl. */
  const spAt = (lx, off) => [0.60 + Math.cos(WSA) * lx + 0.66898 * off,
                             1.175 + Math.sin(WSA) * lx + 0.74329 * off];
  for (const [zc, zp] of [[-0.30, -0.40], [0.30, 0.16]]) {
    const [bx, by] = spAt(-0.258, 0.016);
    ws.add(cabox(0.026, 0.010, 0.560, 0.003, M.rubber, bx, by, zc, WSA));
    ws.add(cabox(0.040, 0.016, 0.080, 0.004, M.darkSteel, bx + 0.008, by + 0.010, zc, WSA));
    const [px, py] = spAt(-0.352, 0.006);
    ws.add(lib.tube([[px, py, zp], [(px + bx) / 2 + 0.012, (py + by) / 2 + 0.004, (zp + zc) / 2],
                     [bx + 0.010, by + 0.012, zc]], 0.0085, M.darkSteel, false, 14));
    const boss = lib.cyl(0.020, 0.026, M.darkSteel, 12);
    boss.position.set(px, py, zp);
    boss.rotation.set(0, 0, WSA, 'ZXY');
    ws.add(boss);
  }
  sys.add(ws);

  /* ── side glass ──
     Split at the B-pillar, because buildStructure runs that member up
     x 0.020 and a four-door has two panes, not one. The daylight opening
     also comes outboard from z 0.880 to 0.920, against a part text that used
     to claim 0.5 mm proud.

     TWO STATIONS, and this comment previously ran them together. At the door
     skin's beltline CREST, y 0.9156, the skin's outer face is 0.958249. At
     the pane's own foot, y 0.9258, the skin has already turned over and is a
     flat land at 0.9340 across the whole door span, and the pane's outer
     face is 0.9305. So the joint step is 3.5 mm and the shoulder from the
     crest up to the glass is 27.7 mm, and 27.7 is not the flushness.
     0.920 is not the outboard limit either: the built silhouette over the
     pane's own x span at y 0.9258 is 0.9362, the B-pillar crown at x 0.020,
     so the pane could come out 3.5 mm to meet the land at 0.9340 and still
     sit 2.2 mm inside the crown. What it cannot reach is the crest at
     0.958249. Do not read the move from 0.880 to 0.920 as having made the
     joint flush; it took a 78 mm step down to 3.5 mm at the joint, and what
     is left is the door's own 24.2 mm beltline turnover, which is a
     beltline decision.

     THE PANES TRAVEL WITH THEIR DOORS, and that is engineering rather than
     presentation. A framed door carries its own glass: the pane runs in
     channels in the door and the frame is part of the door structure, which
     is why a sedan's window drops a few millimeters when you pull the
     handle. Drawn as fixed geometry it read as a pane hanging in the
     aperture, and tools/closures.sh found it the moment a door moved: the
     rear door's leading edge went 2.2 mm into its own glass 3 degrees into
     the swing. Each pane is therefore its own lib.part group under the same
     `side-glass` id, tagged with the closure it belongs to, so it stays one
     clickable part with one panel and moves with the door it is mounted in.
     The division bar is on the B-pillar and the roof molding is on the roof;
     neither opens, so neither is tagged. */
  const glassIn = (id, pts) => {
    const g = lib.part('side-glass', [0, 0.5, 0.55]);
    if (id) lib.hinge(g, id);
    const p = profile(pts, [], 0.012, M.glass, 0);
    p.rotation.x = -0.50;
    p.position.set(0, 0.92, 0.920);
    g.add(lib.shell(p));
    return g;
  };
  const sgFixed = lib.part('side-glass', [0, 0.5, 0.55]);
  /* division bar on the pillar axis, and the roof molding over the top run */
  sgFixed.add(cabox(0.016, 0.440, 0.014, 0.003, M.paintDark, 0.020, 1.125200, 0.815875, 0, -0.50));
  sgFixed.add(cabox(0.840, 0.012, 0.016, 0.003, M.alu, -0.080, 1.3180, 0.7000, 0, -0.50));
  for (const g of [glassIn('door-front', [[0.80, 0.0], [0.34, 0.46], [0.028, 0.46], [0.028, 0.0]]),
                   glassIn('door-rear', [[0.012, 0.0], [0.012, 0.46], [-0.50, 0.46], [-1.06, 0.0]]),
                   sgFixed]) {
    sys.add(g);
    sys.add(mirrorZ(g));
  }

  /* ── hood ──
     Same plane as the Gen 1 hood plate, cut back at both ends so it has
     somewhere to shut against. Built edges, swept off the mesh at 0.2 mm:
     x 0.9670 to 2.2636, sides at |z| 0.8260. That is 8.0 mm to the cowl
     closure's 0.9590, 8.0 mm to the nose roll's 2.2716, and 8.0 mm to the
     fender shoulders at 0.8340.

     The front end is 8 mm shorter than the first pass left it. With the
     panel at 1.620 the hood ran to 2.2716 and the nose roll starts at
     exactly 2.2716, so the two abutted with no gap at all under a 13.5 mm
     step, which reads as a butt joint and not as a shutline. The plane is a
     straight line and NOSE_TILT matches the noseY slope to seven digits, so
     sliding the panel along it moves the edge without moving the surface. */
  const hood = lib.hinge(lib.part('hood', [0.55, 0.5, 0]), 'hood');
  /* the PANEL, distinct from the part group above it. This pair used to read
     hood and hood; the American-spelling sweep collapsed both names onto
     one and the file stopped parsing, which is the one thing a rename over
     328,000 words of prose can actually break. */
  const hoodPanel = cpanel(1.301991, 1.652, 0.014, 0.10, 0.004, M.paint);
  hoodPanel.position.set(1.616, noseY(1.616), 0);
  hoodPanel.rotation.z = NOSE_TILT;
  hood.add(lib.shell(hoodPanel));
  sys.add(hood);

  /* ── doors ──
     Cuts placed off built partners. The B-pillar member runs up x 0.020, so
     the door-to-door split sits on that axis and both skins land on the
     pillar rather than beside it. The front cut is at x 1.120, which is
     110 mm behind the front arch's rear tangent at 1.010, and the rear cut
     at x -1.024, 14 mm behind the rear arch's front tangent at -1.010. All
     three gaps are 8.0 mm, which is what the part's own spec row says and
     what the Gen 1 geometry did not do: the door-to-door gap measured 16 mm
     and the door-to-quarter gap 6 mm. The skin plane, z = 0.894051 +
     0.070084 y, is untouched: it is the widest surface on the car. */
  const dSkin = (xa, xb, hx) => {
    const g = new THREE.Group();
    const w = xb - xa, xc = (xa + xb) / 2, c = 0.003;
    const panel = (h, yc, dz, holes) => {
      const m = holed(roundRect(w / 2 - c, h / 2 - c, 0.014, 4), holes, 0.022, c, M.paint);
      m.geometry.translate(0, yc, dz - 0.011);
      return lib.shell(m);
    };
    /* The upper panel keeps the outer plane and carries the handle
       aperture. The lower steps 5 mm inboard and overlaps it by 6 mm, and
       that step is the body-side crease: 500 mm of dead flat skin is most
       of what made this door read as a first draft, and a step inboard
       costs nothing at the silhouette because it only removes material. */
    g.add(panel(0.280, 0.110, 0, [rrAt(0.088 + c, 0.026 + c, 0.012, hx - xc, 0.065)]));
    g.add(panel(0.226, -0.137, -0.005, null));
    g.position.set(xc, 0.67, 0.930);
    g.rotation.set(0.07, 0, 0, 'ZXY');
    return g;
  };
  /* flush handles. The Gen 1 pair were 14 mm alu slabs centered on z 0.945,
     which at y 0.84 is 8 mm inside a skin whose outer face is at 0.9529:
     they were buried. These sit in a real aperture through the skin, with
     the pull 9 mm back from the face and a floor 15 mm back. */
  const dAt = (x, ly, lz) => [x, 0.67 + ly * 0.997551 - lz * 0.069943,
                              0.930 + ly * 0.069943 + lz * 0.997551];
  /* ONE PART GROUP PER LEAF, which is a regrouping and not a redraw. Every
     mesh below is the mesh this module already built at the coordinate it
     already built it at; what changed is which group owns it, because a
     closure is a rigid body and a rigid body cannot be a slice of a larger
     group. All four leaves keep the part id `doors`, so they stay one
     clickable part with one panel, and SPEC.md already allows several
     groups under one id. The per-instance checks get FINER here, not
     coarser: [attachment] and [enclosure] now measure a door instead of a
     door pair. */
  const leaf = (id, xa, xb, hx, wsX, wsW) => {
    const g = lib.hinge(lib.part('doors', [0.05, 0, 0.85]), id);
    g.add(dSkin(xa, xb, hx));
    const [fx, fy, fz] = dAt(hx, 0.175, -0.004);
    g.add(cabox(0.186, 0.058, 0.006, 0.002, M.paintDark, fx, fy, fz, 0, 0.07));
    const [px, py, pz] = dAt(hx, 0.172, 0.002);
    g.add(cabox(0.152, 0.026, 0.010, 0.003, M.alu, px, py, pz, 0, 0.07));
    /* beltline weatherstrip, in the 6 mm trough between the glass foot at
       z 0.9305 and the door top face's inner edge at 0.9365 */
    g.add(cabox(wsW, 0.013, 0.010, 0.002, M.rubber, wsX, 0.9235, 0.9290));
    return g;
  };
  for (const d of [leaf('door-front', 0.024, 1.120, 0.220, 0.572, 1.092),
                   leaf('door-rear', -1.024, 0.016, -0.850, -0.504, 1.036)]) {
    sys.add(d);
    sys.add(mirrorZ(d));
  }

  /* ── front fenders ──
     The plate keeps its outline and its inner face at z 0.880; the outer
     face goes from 0.900 to SIDE_Z 0.9247, the bumper corner wraps' own
     extreme. That is free: the built silhouette between y 0.479 and 0.950,
     which is every height this panel occupies, is owned by the B-pillar and
     the doors and never falls below 0.9292, its minimum, at y 0.950.

     What it does to the step is not a halving and this comment said it was.
     Ray-swept off the built door skin rather than off its nominal plane:
     the skin's outer face is 0.9188 at the sill at y 0.4245 and 0.958249 at
     the belt crest at y 0.9156, so the step from the old 0.900 face was
     18.8 mm at the sill, not 23, and 58.2 mm at the belt. The 23 came from
     the un-creased plane and the detail pass had already stepped the lower
     panel 5 mm inboard. Against SIDE_Z the belt step does halve, 58.2 to
     33.6, and the sill step INVERTS: the fender face now stands 5.9 mm
     PROUD of the door skin where it used to sit 18.8 mm inside it. That is
     a new step, in the other direction, and it is smaller than the one it
     replaced but it is not nothing. */
  const FT = SIDE_Z - 0.880;
  const fenF = lib.part('fenders', [0.3, 0.05, 0.6]);
  /* creased at 30 degrees, which is what the rear quarter gets for free from
     profileCut. ExtrudeGeometry hands back a de-indexed buffer and its own
     computeVertexNormals is therefore flat, so the shared profile() helper
     shades every one of the arch's 18 arc facets separately: swept as face
     dihedrals this plate had all 240 edges hard with a minimum turn of
     3.2 degrees, while the quarter's identical arch had 121 hard edges and a
     minimum of 30.0. One arch read polygonal and the other did not. The
     threshold cannot reach a real edge on this shape: the four outline
     corners turn 81.9, 98, 137 and 90 degrees and the arc turns 6.6. Zero
     triangles, no vertex moved. */
  fenF.add(lib.shell(lib.crease(profile(
    [[1.128, 0.95], [1.128, 0.655], 'arc', [2.26, 0.52], [2.26, 0.79]],
    [[1.45, 0.355, ARCH_R, 2.391, 0.384, true]],
    FT, M.paint, 0.88
  ), 30)));
  /* shoulder: the surface that turns the flat side plate into the hood
     plane, and the panel that closes the 50 mm slot Gen 1 left open
     between the hood edge and the fender top */
  fenF.add(lib.shell(shoulderBand(
    [1.128, 1.30, 1.55, 1.80, 2.00, 2.15, 2.262], 0.834, SIDE_Z,
    noseY, fendTopY, 0.006, M.paint)));
  /* arch lip: a rolled flange round the opening, 13 mm proud of the panel
     face. The built silhouette over the arch's own y band, 0.520 to 0.795,
     never falls below 0.9442, so 0.938 clears it by 6.2 mm. */
  fenF.add(lib.shell(archLip(1.45, 2.391, 0.384, true, FT)));
  sys.add(fenF);
  sys.add(mirrorZ(fenF));

  /* ── rear quarters ──
     Same treatment, plus the charge flap. P.chargePort is (-1.92, 0.80,
     0.88), so the flap sits on that point with its face on the panel. */
  const fenR = lib.part('fenders', [-0.3, 0.05, 0.6]);
  fenR.add(lib.shell(profileCut(
    [[-1.032, 0.95], [-1.032, 0.479], 'arc', [-2.27, 0.52], [-2.27, 0.88]],
    [[-1.45, 0.355, ARCH_R, 0.286, 2.758, false]],
    [roundRect(0.076, 0.076, 0.014, 3).map(([a, b]) => [a - 1.920, b + 0.800])],
    FT, M.paint, 0.88
  )));
  fenR.add(lib.shell(shoulderBand(
    [-1.5035, -1.65, -1.85, -2.05, -2.20, -2.2799], 0.704, SIDE_Z,
    deckY, quarTopY, 0.008, M.paint)));
  fenR.add(lib.shell(archLip(-1.45, 0.286, 2.758, false, FT)));
  /* charge flap: a real 152 mm aperture through the quarter, a recess floor
     22 mm in, and a flush lid sitting in it with a 6 mm gap all round. The
     socket itself is not drawn: behind a closed flap nobody can see it, and
     geometry nobody can see is a decal with a triangle budget. */
  fenR.add(cabox(0.176, 0.176, 0.008, 0.003, M.paintDark, -1.920, 0.800, 0.9027));
  fenR.add(lib.shell(cabox(0.140, 0.140, 0.010, 0.004, M.paint, -1.920, 0.800, SIDE_Z - 0.005)));
  /* hinge on the leading edge of the aperture. At SIDE_Z - 0.016 it spanned
     z 0.9007 to 0.9167 against a lid whose back face is 0.9147, so it grew
     2.0 mm into the lid over a 6 by 132 mm patch; 0.0195 clears it by 1 mm
     and still shows through the 6 mm gap, whose floor is at 0.9067. */
  fenR.add(cabox(0.010, 0.132, 0.016, 0.002, M.alu, -1.851, 0.800, SIDE_Z - 0.0195));
  sys.add(fenR);
  sys.add(mirrorZ(fenR));

  /* ── A-pillar and C-pillar outers ──
     Gen 1 showed daylight straight through to the cage at both. The A skin
     is ruled between the windshield's outer edge and the daylight opening's
     front edge, the sail between the daylight opening's rear edge and the
     backlight's, and both clear their tubes: the A-pillar member's surface
     reaches 0.762 at the base and the skin crosses that station at 0.0486
     from the axis against a 0.042 radius. */
  const pil = lib.part('fenders', [0.15, 0.30, 0.55]);
  pil.add(lib.shell(ruled(
    [[0.8574, 0.9528, 0.650], [0.3520, 1.4077, 0.650]],
    [[0.800, 0.920, 0.920], [0.340, 1.3237, 0.7095]], 4, 4, 0.010, M.paint)));
  pil.add(lib.shell(ruled(
    [[-1.060, 0.920, 0.920], [-0.500, 1.3237, 0.7095]],
    [[-1.5035, 0.9232, SIDE_Z], [-1.5043, 1.0184, 0.670]], 4, 4, 0.012, M.paint)));
  /* Roof drip: the strip between the daylight opening's top run and the
     cage rail. It stops ON the rail rather than over it. Running it in to
     the roof pane edge at 0.580 puts the band inside a tube whose surface
     reaches 0.657 at y 1.410, and going round the outside of that tube
     would be the one place on this body where a new panel has to leave the
     silhouette, so the rail crown stays visible instead. */
  pil.add(lib.shell(ruled(
    [[0.340, 1.3237, 0.7095], [-0.500, 1.3237, 0.7095]],
    [[0.345, 1.4270, 0.650], [-0.505, 1.4270, 0.650]], 3, 3, 0.002, M.paint)));
  sys.add(pil);
  sys.add(mirrorZ(pil));

  /* ── cowl, hood gutter, trunk gutter, tail roll, and the decklid ──
     The two gutters are the reason the shutlines read. Each is a dark RING
     18 mm under its closure plane, 60 mm wide around its own rim, so every
     gap around the hood and the trunk lid shows a recessed floor.

     They were solid plates until Davis opened the hood and asked why the
     car had two of them. Spanning the whole aperture was invisible while
     the closures were painted on and wrong the moment they moved: a lid
     lifting off a plate the same size and shape reads as a second lid, and
     what an open hood is supposed to show is the frunk. The ring does the
     only job a gutter has, because a shutline can only see as far under its
     own lip as the gap is deep.

     The decklid itself leaves this group below, because a closure has to be
     its own lib.part. Everything else here is fixed. */
  const clos = lib.part('fenders', [-0.45, 0.42, 0]);
  const gutF = cring(1.342178, 1.684, 0.010, 0.05, 0.003, M.paintDark, 0.060);
  gutF.position.set(1.620, noseY(1.620) - 0.018, 0);
  gutF.rotation.z = NOSE_TILT;
  clos.add(gutF);
  /* the cowl closure stops 8.0 mm short of the hood's rear edge at 0.9670.
     It used to stop at 0.9623, a 4.7 mm gap where every other cut on this
     body measures 8.0, and only 3.6 mm of gutter showed through it. */
  const cowlF = cpanel(0.112261, 1.690, 0.010, 0.03, 0.002, M.paintDark);
  cowlF.position.set(0.90335, noseY(0.90335) - 0.026, 0);
  cowlF.rotation.z = NOSE_TILT;
  clos.add(cowlF);
  /* the plenum grille is the front-most thing in the cowl, because its frame
     stands 8 mm outside the bar field: at w 0.100 the frame reached x 0.9635
     and set the hood gap at 3.5 mm wherever the closure panel sat. Sized
     so the frame lands on 0.9590 with the closure. */
  const cowl = lib.grille(0.095514, 1.660, 0.020, M.plastic,
    { bars: 4, barW: 0.016, frame: 0.008, chamfer: 0.002 });
  cowl.position.set(0.90275, noseY(0.90275) - 0.010, 0);
  cowl.rotation.set(-Math.PI / 2, 0, NOSE_TILT, 'ZXY');
  clos.add(cowl);

  /* THE DECKLID, and this is a regrouping and not a redraw. The panel below
     is the mesh this module already built at the coordinate it already built
     it at, and so is the badge; what changed is which group owns them,
     because a closure is a rigid body and a rigid body cannot be a slice of
     a larger group. It keeps the part id `fenders`, so the tail stays one
     clickable part with one info panel, and the same explode vector, so the
     assembly view is unchanged.

     The badge travels with the lid. It sits 0.2 mm proud of the deck plane
     at (-2.135, deckY(-2.135)), which is 619 mm aft of the cut, and on any
     real car a decklid badge is bolted through the outer panel. Leaving it
     in `clos` would have left a chevron floating in the aperture the moment
     the lid moved, which is the same fault the side glass had before the
     doors were split. */
  const lid = lib.hinge(lib.part('fenders', [-0.45, 0.42, 0]), 'decklid');
  const deck = cpanel(0.772054, 1.392, 0.012, 0.06, 0.004, M.paint);
  deck.position.set(-1.89575, deckY(-1.89575), 0);
  deck.rotation.z = DECK_TILT;
  lid.add(lib.shell(deck));
  const badgeR = lib.badge(CHEVRON, 0.0044, M.alu);
  badgeR.geometry.rotateX(-Math.PI / 2);
  badgeR.position.set(-2.135, deckY(-2.135) + 0.0002, 0);
  badgeR.rotation.z = DECK_TILT;
  lid.add(badgeR);
  sys.add(lid);
  const gutR = cring(0.796130, 1.440, 0.010, 0.05, 0.003, M.paintDark, 0.060);
  gutR.position.set(-1.89175, deckY(-1.89175) - 0.018, 0);
  gutR.rotation.z = DECK_TILT;
  clos.add(gutR);
  const roll = cpanel(0.129113, 1.720, 0.018, 0.075, 0.005, M.paint);
  roll.position.set(-2.349, 0.9211285, 0);
  roll.rotation.z = 0.333276;
  clos.add(lib.shell(roll));
  sys.add(clos);

  /* ── door aperture gutters ──
     A shut face behind each cut, so the 8 mm gaps read as dark lines rather
     than as slots into the cabin. Two measurements size them, and both were
     got wrong by hanging one 516 mm plate off the door plane at 18 mm.

     A shut face has to sit behind BOTH panels it backs. The door plane
     leans 0.07 and runs z = 0.894051 + 0.070084 y, but the fender and
     quarter faces are a constant |z| 0.9247, so a plate that follows the
     door comes out THROUGH the fender near the top of the cut: measured
     9.3 mm proud at (-1.057, 0.926), a dark strip 31 mm wide standing on
     the paint at all four side cuts, and the first surface a ray from
     outside finds there. At 30 mm the outer face is z = 0.856961 +
     0.070115 y, which is 2.6 mm behind the fender at the top of the cut and
     32 to 37 mm behind the door plane the whole way down.

     And a shut face has to stop where its partner stops. The front fender's
     arch edge is (1.128, 0.654) and the quarter's is (-1.032, 0.479), so a
     full-height plate hung 240 mm into the open front wheel well with
     57.7 mm of it inside the built tire at (1.159, 0.4157), and 150 mm into
     the rear arch. Each plate now spans only the height over which both of
     its neighbors exist. */
  const shut = lib.part('fenders', [0.3, 0.05, 0.6]);
  for (const [x, h, cy] of [[1.124, 0.270, 0.1227], [0.020, 0.516, 0],
                            [-1.028, 0.456, 0.0300]]) {
    const [gx, gy, gz] = dAt(x, cy, -0.030);
    shut.add(cabox(0.070, h, 0.008, 0.002, M.paintDark, gx, gy, gz, 0, 0.07));
  }
  sys.add(shut);
  sys.add(mirrorZ(shut));

  /* ── front fascia ──
     Rebuilt as a frame with real apertures rather than a solid slab. The
     face goes to x 2.350, which is where the corner wraps already reached
     and 50 mm ahead of where the Gen 1 slab stopped, so the wraps and the
     lamps now sit in the fascia instead of floating ahead of it: the lamp
     strips ran to x 2.4013 against a fascia front face at 2.280, 39 mm of
     daylight. Everything the silhouette is measured on is carried: the
     corner wraps and the lower valance are the Gen 1 boxes unchanged. */
  const fasF = lib.part('fascias', [1.1, 0, 0]);
  const FC = 0.006;
  fasF.add(lib.shell(facePanel(
    rrAt(0.860 - FC, 0.206 - FC, 0.060, 0, 0.556),
    [rrAt(0.520 + FC, 0.095 + FC, 0.030, 0, 0.565),
     rrAt(0.200 + FC, 0.032 + FC, 0.022, 0.600, 0.712),
     rrAt(0.200 + FC, 0.032 + FC, 0.022, -0.600, 0.712),
     rrAt(0.083 + FC, 0.100 + FC, 0.022, 0.7125, 0.500),
     rrAt(0.083 + FC, 0.100 + FC, 0.022, -0.7125, 0.500)],
    0.068, FC, M.paint, 2.350, 1)));
  const nroll = cpanel(0.084480, 1.720, 0.020, 0.080, 0.005, M.paint);
  nroll.position.set(2.315, 0.785650, 0);
  nroll.rotation.z = -0.594;
  fasF.add(lib.shell(nroll));
  for (const s of [-1, 1]) {
    fasF.add(lib.shell(abox(0.24, 0.44, 0.028, M.paint, 2.24, 0.57, s * 0.85, 0, 0, s * 0.55)));
  }
  fasF.add(abox(0.06, 0.10, 1.30, M.plastic, 2.30, 0.33, 0));
  /* the grille is a lattice with depth, set 21 mm back from the face, and
     it is visible: nothing solid stands in front of it */
  const gr = lib.grille(1.020, 0.180, 0.034, M.darkSteel,
    { bars: 24, cross: 3, barW: 0.009, chamfer: 0.002, crossZ: 0.026 });
  gr.position.set(2.312, 0.565, 0);
  gr.rotation.y = -Math.PI / 2;
  fasF.add(gr);
  /* the lattice is set 21 mm behind the face and backed at 2.276, so the
     bumper beam at x 2.210 to 2.270 is not what a viewer sees through it */
  fasF.add(cabox(0.008, 0.200, 1.080, 0.003, M.plastic, 2.276, 0.565, 0));
  /* radar window, ON the backing panel and not behind it. At 2.2715 it ran
     x 2.2675 to 2.2755 against a backing panel whose front face is 2.2800,
     and the backing panel is 1.080 by 0.200 against the window's 0.320 by
     0.130, so it covered it completely: a ray straight down the grille at
     (y 0.565, z 0.10) returned cross bar, backing panel, THEN window. 44
     triangles no exterior camera could reach. */
  fasF.add(cabox(0.008, 0.130, 0.320, 0.003, M.plasticLt, 2.2845, 0.565, 0));
  /* air curtains: a back wall and three vanes in each aperture */
  for (const s of [-1, 1]) {
    fasF.add(cabox(0.008, 0.186, 0.162, 0.002, M.plastic, 2.2865, 0.500, s * 0.7125));
    for (const d of [-0.042, 0, 0.042]) {
      fasF.add(cabox(0.046, 0.180, 0.007, 0.002, M.plasticLt, 2.318, 0.500, s * 0.7125 + d));
    }
  }
  for (const z of [-0.50, -0.30, -0.10, 0.10, 0.30, 0.50]) {
    const u = lib.cyl(0.011, 0.008, M.sensor, 10);
    u.position.set(2.3465, 0.400, z);
    u.rotation.z = Math.PI / 2;
    fasF.add(u);
  }
  fasF.add(cabox(0.010, 0.062, 0.078, 0.004, M.paint, 2.3475, 0.420, -0.575));
  const badgeF = lib.badge(CHEVRON, 0.0044, M.alu);
  badgeF.geometry.rotateY(Math.PI / 2);
  badgeF.position.set(2.3502, 0.712, 0);
  fasF.add(badgeF);
  sys.add(fasF);

  /* ── rear fascia ──
     Same rebuild. The Gen 1 tail stacked wrong: the fascia slab was the
     rearmost thing on the car at x -2.410 and the lamp bar sat at -2.34 to
     -2.31, 70 to 100 mm inside it, with a 130 mm hole between the trunk
     lid's rear edge and the tail face. The lamp now sits in an aperture on
     the face and the tail roll closes the hole. */
  const fasR = lib.part('fascias', [-1.1, 0, 0]);
  fasR.add(lib.shell(facePanel(
    rrAt(0.860 - FC, 0.275 - FC, 0.060, 0, 0.625),
    [rrAt(0.790 + FC, 0.024 + FC, 0.018, 0, 0.860),
     rrAt(0.260 + FC, 0.060 + FC, 0.015, 0, 0.460),
     rrAt(0.065 + FC, 0.025 + FC, 0.015, 0.620, 0.445),
     rrAt(0.065 + FC, 0.025 + FC, 0.015, -0.620, 0.445)],
    0.068, FC, M.paint, -2.410, -1)));
  fasR.add(cabox(0.010, 0.130, 0.540, 0.003, M.paintDark, -2.378, 0.460, 0));
  for (const s of [-1, 1]) {
    fasR.add(cabox(0.010, 0.056, 0.140, 0.003, M.lamp, -2.398, 0.445, s * 0.620));
    fasR.add(lib.shell(abox(0.24, 0.44, 0.028, M.paint, -2.27, 0.57, s * 0.85, 0, 0, -s * 0.55)));
    /* license plate lamp, inside the recess where it can be seen */
    fasR.add(cabox(0.012, 0.010, 0.040, 0.002, M.lamp, -2.3945, 0.508, s * 0.180));
  }
  fasR.add(abox(0.08, 0.12, 1.30, M.plastic, -2.28, 0.33, 0));
  for (const z of [-0.50, -0.30, -0.10, 0.10, 0.30, 0.50]) {
    const u = lib.cyl(0.011, 0.008, M.sensor, 10);
    u.position.set(-2.4065, 0.400, z);
    u.rotation.z = Math.PI / 2;
    fasR.add(u);
  }
  sys.add(fasR);

  /* ── headlamps ──
     84 pixels per side is not drawable, but the thing that makes a lamp
     read as a lamp is: a housing behind a clear lens with projector optics
     and a light guide inside it, set into the fascia aperture rather than
     hung in front of the car. */
  for (const s of [-1, 1]) {
    const hl = lib.part('headlights', [1.15, 0.12, s * 0.18]);
    /* The unit is an open pocket, not a block. A solid housing filling the
       aperture is what a first pass builds and it hides every optic behind
       it: back wall, barrels, guide and lens each own their own 10 mm of
       depth between x 2.282 and 2.350. */
    hl.add(cabox(0.008, 0.078, 0.410, 0.003, M.plasticLt, 2.2865, 0.712, s * 0.600));
    for (const d of [-0.105, -0.035, 0.035, 0.105]) {
      const barrel = lib.cyl(0.020, 0.034, M.alu, 12);
      barrel.position.set(2.309, 0.720, s * 0.600 + d);
      barrel.rotation.z = Math.PI / 2;
      hl.add(barrel);
      const eye = lib.cyl(0.0165, 0.008, M.lamp, 12);
      eye.position.set(2.3305, 0.720, s * 0.600 + d);
      eye.rotation.z = Math.PI / 2;
      hl.add(eye);
    }
    hl.add(cabox(0.012, 0.012, 0.392, 0.002, M.lamp, 2.3305, 0.6875, s * 0.600));
    hl.add(lib.shell(cabox(0.008, 0.064, 0.396, 0.003, M.glass, 2.3455, 0.712, s * 0.600)));
    sys.add(hl);
  }

  /* ── tail lamp bar ──
     A 240 LED guide is a channel with prisms in it, so that is what this
     is: a housing, a ribbed guide, and a lens on the tail face. The CHMSL
     the spec row lists goes where a sedan puts it, on the backlight's top
     rail. */
  const tl = lib.part('taillights', [-1.2, 0.12, 0]);
  tl.add(cabox(0.036, 0.062, 1.564, 0.004, M.plastic, -2.3585, 0.860, 0));
  tl.add(cabox(0.012, 0.034, 1.540, 0.002, M.lampRed, -2.3825, 0.860, 0));
  const ribs = lib.grille(1.500, 0.030, 0.012, M.lampRed, { bars: 42, barW: 0.005 });
  ribs.position.set(-2.3945, 0.860, 0);
  ribs.rotation.y = Math.PI / 2;
  tl.add(ribs);
  tl.add(lib.shell(cabox(0.008, 0.046, 1.572, 0.003, M.glass, -2.4055, 0.860, 0)));
  for (const s of [-1, 1]) {
    tl.add(cabox(0.13, 0.042, 0.03, 0.004, M.lampRed, -2.27, 0.885, s * 0.815, 0, 0, s * 0.45));
  }
  /* CHMSL on the backlight header */
  tl.add(cabox(0.070, 0.014, 0.420, 0.003, M.lampRed,
    -1.025 + Math.cos(0.398) * 0.470 - Math.sin(0.398) * -0.014,
    1.22 + Math.sin(0.398) * 0.470 + Math.cos(0.398) * -0.014, 0, 0.398));
  sys.add(tl);
}

/* Arch lip: a rolled flange swept round the wheel opening. Three columns,
   the panel face, a 13 mm proud crown and a return inboard, which is what
   turns the raw edge of an extruded profile into something that catches
   light. cw follows THREE.Shape.absarc's own sense. */
function archLip(cx, a0, a1, cw, ft) {
  const zFace = 0.880 + ft;
  const secs = [];
  const n = 22;
  let span = a1 - a0;
  if (cw) { while (span > 0) span -= Math.PI * 2; } else { while (span < 0) span += Math.PI * 2; }
  for (let i = 0; i <= n; i++) {
    const a = a0 + (span * i) / n;
    const c = Math.cos(a), s = Math.sin(a);
    const p = (r, z) => [cx + c * r, 0.355 + s * r, z];
    secs.push([p(ARCH_R + 0.004, 0.880), p(ARCH_R + 0.002, zFace),
               p(ARCH_R - 0.014, zFace + 0.013), p(ARCH_R - 0.044, zFace + 0.001)]);
  }
  return lib.crease(lib.loft(secs, M.paint, false, { interp: 'linear' }), 30);
}
