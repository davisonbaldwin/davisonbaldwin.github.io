/* Gen 5 apex body. NAMING: the module id and filename carry the -6 suffix
   because the -5 ids belong to the demoted value study; every user-facing
   label says Gen 5 (design/gen5-apex.md).

   The monoform loft is carried from body-3.js VERBATIM, including the flat
   roof band that wraps the cage rails at ~1.44-1.45 at z +-0.66; that lesson
   is codified and not re-learned here. The apex delta is everything the
   surface could not do while it stood still: a deployable Kamm spoiler and
   diffuser flap (both drawn deployed), active front arch louvers, metered
   intake gates, and a sealed twin-tunnel venturi floor, all actuated at
   48 V from hv-4's zonal bus. Cd 0.130 in the deployed highway state.

   Gen 5 preset partners this module reconciles against (design/gen5-apex.md,
   per the retro-gen4/retro-gen5 drift law): hv-4 (48 V zonal actuation),
   wheels-3 (185/50 R21 tire faces at |z| 0.9025; rear arch skirt audited
   against suspension-4's +-3 degree rear-steer sweep), thermal-6 (intake
   gates feed its radiator stack in the unchanged front zone x 2.08..2.26),
   suspension-4 (ride-height hold for the venturi floor), autonomy-4 (flash
   lidar in the front light band, camera pods on the doors).

   Mass ledger, binding +-2 kg: 196 kg structure (STRUCT_META, carried) +
   156 kg shell = 352 kg total. Gen 3 monoform: 358. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';
import { STRUCT_META, mirrorZ } from './body.js';

/* Frontier honesty rule (gen5-apex): every part carries a Maturity row.
   The five carried structure parts get one appended here; where a Gen 1
   part already had six rows, the sixth is replaced so the count holds. */
const STRUCT_APEX = Object.fromEntries(
  Object.entries(STRUCT_META).map(([id, p]) => [id, {
    ...p,
    specs: [...p.specs.slice(0, 5), ['Maturity', 'Production practice, carried from Gen 1 unchanged']],
  }])
);

export const SYSTEM = {
  id: 'body-6',
  name: 'Body · Gen 5 apex',
  color: 0xbde2f2,
  explode: [0, 1.7, 0],
  blurb: 'Gen 3 made the body one surface; Gen 5 teaches that surface to move. The same loft in thin-ply carbon, a Kamm spoiler and diffuser flap drawn deployed, arch louvers and intake gates that breathe on demand, and a sealed twin-tunnel floor, every actuator on hv-4\'s 48 V zonal bus. Cd 0.130 deployed, 352 kg, and every frontier claim wears its maturity label.',
  /* THE CLOSURES, and the whole argument is one sentence long: a door that
     rotates is priced by its own LENGTH, and a door that translates is priced
     by the CURVATURE of the flank it runs along.

     Both halves are measured on this body, not asserted. Sweep this car's
     rear door about a conventional vertical hinge at its leading edge and it
     reaches |z| 1.8497 at 65 degrees, because lateral reach is panel length
     times the sine of the angle and this panel is 1.020 m long. Slide the
     same panel aft instead and the only thing it has to clear is how far the
     flank swells under it as it travels, which on this loft is 12.9 mm,
     because the tail is falling away from the door rather than rising into
     it: the beltline half-width runs 0.9400 at x -1.30, 0.8436 at -1.80 and
     0.6249 at -2.00. The front door's own number is 53.1 mm for the same
     reason in reverse, and both are an order of magnitude under any angle a
     swing can be opened to.

     Direction is not a preference either, it is forced twice. The rear door
     sliding FORWARD needs a 99.7 mm stand-off and lands on the camera pod at
     x 0.850. The front door sliding forward crosses both arch louver pockets
     at x 1.135 to 1.755 and stands 587 mm off a fender that has dropped away
     underneath it. Aft is the only direction this surface allows, and aft is
     where the space is, because the rear door vacates 1.020 m of flank as it
     goes and the front door moves into it.

     What the mechanism costs is a rail and a carriage per side and nothing
     electrical, which is the reason this is the rung that gets it: every
     other panel on this body is already 48 V actuated off hv-4's zonal bus,
     the doors already have no handles, and the rocker at x -1.010 to 1.010
     is 2.02 m of extruded structure whose top face at y 0.4200 is exactly the
     door's own lower edge line. The one thing to be honest about is that this
     buys nothing for the passenger's head: the daylight opening over these
     doors is the bonded canopy band, which is a shear panel and does not
     move, so no window goes down on this car. */
  closures: {
    'door-front': {
      name: 'Front door',
      kind: 'door',
      part: 'doors',
      mass: 24,
      seconds: 1.7,
      seat: 'Carriage on the rocker top face at y 0.4200, x -1.010 to 1.010; upper guide in the beltline rail behind the paint at y 0.880',
      motion: [
        { kind: 'slide', axis: [0, 0, 1], dist: 0.115, at: [0, 0.12] },
        { kind: 'slide', axis: [-1, 0, 0], dist: 0.760, at: [0.12, 1] },
      ],
      why: 'A hundred and fifteen millimeters straight out, then 760 aft along the flank, and the first number is not set by the body at all. The surface asks for 53.1 mm, which is the deepest the panel would otherwise be inside the flank it runs over at the far end of the travel, and the same figure has to clear a rear door that has not been opened, because a rail that only works when both doors move together needs an interlock and an interlock is a failure mode. What actually sets the stand-off is the tallest thing bolted to the flank, and on this rung that is hv-4\'s charge flap standing at |z| 0.9828 with the port drawn open. 115 mm clears it with the door face at 1.0627 and the same rail carries both leaves. The 760 mm is the aperture itself: this door is the flank between the shutline at x 0.779 and the B-pillar cut at x 0.019, and it parks exactly its own length aft, which puts its leading edge on the B-pillar and leaves the whole front aperture open. What the rung buys is the number the checker prints: the panel never leaves a 2.50 m stall at any point in its travel, where a swing door on this same body is out of the stall before it is a quarter open.',
      cost: [
        'A rail and a carriage per side is mass and it is mechanism: this leaf is 24 kg against a swing door\'s 20, and the extra is a hardened rail in the rocker, a three-roller carriage and the aft guide that carries the panel in torsion when it is standing 115 mm outboard with nothing under its far end.',
        'A hundred and fifteen millimeters of stand-off is 115 mm of open slot along the whole beltline while the door is moving, and it is a wet slot: a sliding door seals on a compression lip that only lands at the last 20 mm of closing, so the door cannot be left half open in rain the way a swing door can.',
        'The panel is outside the body for the whole travel rather than only at the end, so a curb, a bollard or a neighbor\'s mirror strikes the door face in the flat rather than the door edge in the arc.',
      ],
    },
    'door-rear': {
      name: 'Rear door',
      kind: 'door',
      part: 'doors',
      mass: 26,
      seconds: 1.9,
      seat: 'Same rocker rail, aft carriage; the panel runs out past the rocker end at x -1.010 onto a cantilevered extension in the rear quarter',
      motion: [
        { kind: 'slide', axis: [0, 0, 1], dist: 0.115, at: [0, 0.09] },
        { kind: 'slide', axis: [-1, 0, 0], dist: 1.020, at: [0.09, 1] },
      ],
      why: 'The rear door is the cheap one and the tail is why. Sliding it aft over the rear quarter, the deepest it would ever be inside the surface behind it is 12.9 mm, because the flank is tapering away from the panel the whole way: 0.9400 at x -1.30 down to 0.6249 at -2.00. Thirteen millimeters is what the geometry asks for and it is not what the door gets. It gets the same 115 mm the front door gets, and the reason is hv-4: the charge port sits at x -1.92 with its bezel out at |z| 0.8997 and its flap, which this preset draws open, at 0.9828, directly in the slide path. Dimensioning the rail to pass an open charge flap costs 102 mm of stand-off this door does not need and deletes an interlock between two modules, which is the better trade. One rail, one carriage part number, two doors.',
      cost: [
        'It parks over the tail taper with up to 489 mm of air behind it, because this body\'s flank stops being a translation surface aft of x -1.30. The door is still inside the silhouette, but the open state reads as a panel standing off the quarter rather than lying on it, and a body that wanted this properly would shape the quarter to receive it.',
        'The rail has to cantilever past the rocker\'s own end at x -1.010, so the last 1.011 m of travel is carried on an extension bonded into the rear quarter rather than on the extrusion. That is the piece that will set the door\'s sag spec.',
        'Two doors on one rail means the front leaf can only park where the rear leaf has already left, so the front door cannot open past 60 percent of its travel while the rear door is shut. That is a control interlock inside one module rather than between two, which is the kind this rung will accept.',
      ],
    },
    hood: {
      name: 'Hood',
      kind: 'hood',
      part: 'skin',
      mass: 9,
      seconds: 1.3,
      seat: 'Cowl hinge line at x 1.1380, axis 4.1 mm above the highest node on the panel at y 1.0418',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [1.1376, 1.0430, 0], deg: 38 },
      ],
      why: 'Thirty eight degrees is not a styling number, it is the angle at which the highest point of the open panel is 1.4618 m, which is this car\'s own roof line to within 0.2 mm. A frunk that opens under any ceiling the car itself clears is worth more than a few extra degrees of nothing, and 38 degrees already lifts the nose edge 707 mm clear of an aperture 1.101 m long. The axis sits 4.1 mm above the crown of the panel, and that is forced rather than chosen: on a rear-hinged panel every point above the axis sweeps backward as it opens, so an axis anywhere inside the crowned cowl line drives the middle of the shutline into the cowl behind it. Rear hinged is also the only safe direction at speed, because a latch that lets go on this panel is pressed shut by the airflow instead of being torn open across the glass.',
      cost: [
        'The panel is 1.5596 m2, the largest single opening on the car, and in 1.1 mm thin-ply carbon that is 2.66 kg of laminate carrying its own struts, latch and seal to a 9 kg leaf. A panel that light needs two gas struts to stay up rather than one, because wind under a big flat lid is a bigger load than its own weight.',
        'It opens onto a 1,061 L envelope with 475 L free, of which only 93 L is inside the declared P.frunk box. The rest of the free volume is scattered around thermal-6\'s front stack and is not luggage space, it is service access.',
        'The nose fascia band ahead of the hood does not open with it, so the light band, the lidar windows and the intake gate actuator stay fixed and the aperture stops 100 mm short of the nose.',
      ],
    },
    decklid: {
      name: 'Decklid, with the spoiler on it',
      kind: 'decklid',
      part: 'skin',
      mass: 34,
      seconds: 1.5,
      seat: 'Transverse axis at the x -1.9047 shutline, 3.3 mm above the highest node on the lid at y 1.0467',
      /* The rear camera sits above the plate recess at x -2.2365, which is
         inside this lid's own span, so it is mounted ON the lid and swings
         with it. Drawn fixed, the lid went 6.9 mm through it 8 percent into
         the travel. */
      carries: [
        { part: 'autonomy-4/cameras', box: [-2.30, 0.90, 0.00, -2.18, 1.02, 0.05] },
      ],
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [-1.9047, 1.0470, 0], deg: -70 },
      ],
      why: 'This is the closure that teaches packaging rather than curb space, because it opens entirely inside the car\'s own silhouette: at 70 degrees the highest point of the lid is y 1.3856, which is 76 mm below the roof, and it never passes the tail plane at full travel. A skateboard car can do that and a car with an engine over its rear axle cannot. The axis is again above the panel rather than in it, and the measurement that settles it is worth keeping: put the pivot on the shutline\'s own low corner at y 0.9759, where a drawing would put it, and the crown of the leading edge swings 62.7 mm forward at full travel, down through the fixed deck and into the bonded glass at x -1.870. A straight axis under a crowned panel is a hinge that eats the panel in front of it. The Kamm spoiler travels with the lid because its struts already pass 24.5 mm through this panel: it is bolted to the lid, not through it.',
      cost: [
        'Carrying the spoiler makes this a 34 kg leaf, of which 0.88 kg is the laminate and 6 kg is the wing and its two spindle drives. The hinges and struts are sized by the wing, not by the lid, and the 48 V harness to the spoiler has to cross the hinge line in a service loop.',
        'The lid\'s leading edge is 35 mm behind the glass band\'s bonded rear edge, so the aperture starts at x -1.9047 while interior-6\'s rear bench back stands at -1.2671. 902 L of the rear is free and only 398 L of it is behind this lid.',
        'The tail edge swings aft before it rises, which is what a front-hinged panel does, so the car needs the clearance behind it that a hatch would not.',
      ],
    },
  },
  parts: {
    ...STRUCT_APEX,
    skin: {
      name: 'Monoform apex skin',
      tagline: 'The Gen 3 loft carried to the station, rebuilt in thin-ply carbon: the surface was finished, the material was not.',
      mass: 56,
      specs: [
        ['Construction', 'Thin-ply CFRP, 1.1 mm nominal, bonded to the cage'],
        ['Surface', 'Gen 3 loft carried verbatim: 10 stations, x +2.375 to -2.375'],
        ['Cd ledger', '0.130 deployed, 0.142 all-flush; Gen 3: 0.145'],
        ['Roof band', 'Flat band wraps the cage rails at z +-0.66, Gen 3 law'],
        ['Mass', '56 kg against Gen 3\'s 64 kg superformed aluminum'],
        ['Maturity', 'Skin pilot line; the Cd 0.130 total is a pilot line claim'],
      ],
      how: 'The ten loft stations are carried from Gen 3 without a single coordinate moved, and that is a measurement, not nostalgia: the monoform surface was already pressed against every hard point it owns, the cage rails it wraps with the flat roof band at z +-0.66, the arches, the battery envelope below. Re-lofting it would buy fractions of a count and re-run every clearance audit for nothing, because the drag left on this car does not live in the loft. It lives in the base, the arches, the intake and the floor, and Gen 5 attacks those with devices instead. What changes here is the material. Spread-tow thin-ply carbon, plies in the 20 to 30 g/m2 class, is laid by an automated fiber placement head over the full body side in one program and cured on the same loft mold the superform die was cut from. Thin plies suppress the microcracking that limits ordinary laminates, so the skin runs at 1.1 mm where the AA5083 ran 1.3, and the side of a car becomes an 8 kg lighter part with three times the specific stiffness.\n\nThe carried surface also gets re-audited against the generation it actually ships with, which is the ladder\'s standing law. Gen 3 wrote "flank holds 0.94 past the tire face at 0.9275" using the Gen 1 tire width; the Gen 5 preset runs wheels-3\'s 185/50 R21, whose static face sits at |z| 0.9025, and suspension-4\'s rear-steer swings the tread corners through +-3 degrees, reaching |z| 0.921 at the worst point of the arc. The skirted rear arch clears the moving envelope by 19 mm, and that number is now written down where the next generation can check it instead of inheriting the assumption. The 0.130 figure is a configuration, stated honestly: spoiler and flap deployed, louvers trimmed, gates shut, highway ride height. Parked, everything flush, the same body reads 0.142.\n\nThe skin also stopped pretending about where it opens. A car that cannot reach its frunk or its trunk has no hood and no decklid, and until now this one had neither drawn: the surface was continuous over both. There is now a real recessed hood from x 2.240 to 1.140, four gaps closing it, aft of the fascia band that carries the light band and the lidar windows, forward of the cowl where the glass root starts, and covering the whole of P.frunk and thermal-6\'s front stack beneath it. A decklid opens the painted deck aft of x -1.905, which is 35 mm behind the glass band\'s bonded rear edge so the lid\'s leading edge is a gap on paint rather than a line drawn on a bond. Every one is 5 mm wide and 4 mm deep with two real walls, cut into the master grid the panels are sliced from, so no joint can open a hairline against its neighbor. The four permitted interruptions on the body side are still four; these are on the deck.\n\nBoth end faces are closed, and that is a repair rather than a refinement. The nose was a 1.00 by 0.22 m box inside an aperture 0.57 half-width at y 0.53 and 0.66 tall, so 70 mm of open loft showed on each side at the widest point: rastered with axial rays, 5.2 percent of the nose face was the front megacasting and the crash rails seen through the bodywork. The Kamm face was the same mistake in the other direction, a box whose top corners stood 332 mm outside their own outline while the waist stayed 40 mm open. Each face is now a cap fanned from the master grid\'s own edge ring with the loop closed across the bottom, and closing the loop across the bottom was only half of it: lib.loft skins between sections, so a cap lofted from its outline to a shrunken copy of that outline keeps a hole the size of the copy, and 5.92 cm2 of the nose still showed the bumper beam while 14.56 cm2 of the Kamm face was a clear line straight through the car. Each cap is now fanned to its own center as well. The same raster returns 0.0 percent casting, 0.0 percent bumper beam and no ray through either face.',
      why: 'A surface at its packaging limit has one honest upgrade path: mass. Taking 8 kg out of the largest part on the car pays in every corner and every cycle, and carbon\'s fatigue behavior under the bonded-skin load case is better than the aluminum it replaces. The pilot line label is carried by two claims at once: nobody has cured a 4.7 m one-shot thin-ply body side at automotive rate, and Cd 0.130 for a five-seat car exists in tunnel programs, not on a certification sheet. What has to become true: the fiber placement cell must hold the loft\'s waviness spec, under 0.15 mm over 300 mm, across the full side in one cure, and the full-scale moving-ground tunnel must confirm the device stack within two counts of the panel-level sums.',
      fail: [
        'Thin-ply carbon takes barely visible impact damage: hail or a parking-garage knock can delaminate plies under paint that looks perfect, so the service schedule carries ultrasound spot checks, the same discipline wheels-3 applies to its barrels.',
        'The repair quantum is carried from Gen 3 and gets worse in carbon: a strike that yields the skin means a bonded scarf repair cured in place, hours of tooling against a highlight line that runs 4.75 m without a break.',
        'Carbon is an RF shield, so the antennas that lived under Gen 3\'s aluminum moved behind the glass and the light band windows, and a bonded copper grounding mesh rides in the layup; a repair that skips re-bonding the mesh leaves a panel that floats electrically and a radio that fades.',
      ],
      explode: [0, 0.62, 0],
    },
    canopy: {
      name: 'Glass canopy band',
      tagline: 'The same lofted glass, four kilograms lighter and finally answering to the thermal system.',
      mass: 34,
      specs: [
        ['Glazing', 'Chemically strengthened aluminosilicate, 1.1 + PVB + 0.7 mm'],
        ['Span', 'Cowl at x 1.06 to the deck at -1.87, carried loft stations'],
        ['Solar', 'Electrochromic interlayer, 1 to 20% transmittance, zoned'],
        ['Step', '< 0.5 mm at the glass-to-carbon joint'],
        ['Mass', '34 kg against Gen 3\'s 38'],
        ['Maturity', 'Production practice; thin glass and EC film both shipped'],
      ],
      how: 'The band is cut from the same ten loft stations as the skin, the Gen 3 argument unchanged: the material switches at the cowl but the section never notices. The mass comes out of the plies. Ion-exchange strengthening drives the glass surface into compression, so a 1.1 mm outer ply resists the same stone strike as Gen 3\'s 2.1 mm annealed soda-lime, and the inner ply thins to 0.7 mm; four kilograms leave the highest-mounted panel on the car, which is worth more than four anywhere else, because roll inertia and center of gravity both price mass by its height.\n\nThe interlayer stops being passive. An electrochromic film replaces the fixed IR stack and runs the band anywhere from 20 percent transmittance down to 1, in zones, in seconds. That turns the roof into a thermal actuator with a name attached: thermal-6 owns the setpoint, darkening the canopy during a hot-soak precondition so the heat pump starts against a smaller solar load, and clearing it on a gray highway. The 11 m structural bond carries over with the CTE bill Gen 3 disclosed, slightly relieved because carbon\'s expansion sits closer to glass than aluminum\'s did: the bead now absorbs about a third less relative motion per thermal cycle.',
      why: 'Glass goes where eyes need it, carried from two generations back, and the apex version simply makes every gram of it work twice: structural shear panel, acoustic barrier, and now a controllable solar admittance that the cabin\'s energy budget can schedule. Chemically strengthened automotive laminates and electrochromic roofs are both in series production today, so this is the rare Gen 5 part that is pure production practice.',
      fail: [
        'One deep chip still condemns the band, carried from Gen 3 unimproved, and the replacement must re-index to the loft within half a millimeter or the joint becomes the step this body exists to delete.',
        'The EC film fails clear by design, sight over shade, so a failed zone costs solar load, not vision; the honest symptom is a bright stripe on a dark roof and a heat pump working harder than the forecast said.',
        'Thinner plies flex more between bond lines: a pressure-washer lance held close can oil-can the crown audibly, alarming and harmless, and the manual says so.',
      ],
      explode: [0, 1.05, 0],
    },
    doors: {
      name: 'Flush doors and camera pods',
      tagline: 'The four permitted interruptions, third generation, now wired to the partners that watch and power them.',
      mass: 38,
      count: 4,
      specs: [
        ['Skins', 'Thin-ply CFRP cut from the master loft'],
        ['Flushness', '+-0.25 mm; the unbroken-highlight law, carried'],
        ['Handles', 'None; capacitive strip and e-latch on hv-4\'s 48 V zonal bus'],
        ['Mirrors', 'Camera pods on 90 mm stalks, feeding autonomy-4'],
        ['Mass', '38 kg for four (Gen 3: 41, Gen 1: 82)'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The architecture is Gen 3\'s, kept whole, and the geometry has finally caught up with it. Each skin is the master loft surface between two shutlines now, sliced from the same resampled grid as the body around it, where it used to be a 13 mm box standing 26 mm proud of the flank it was meant to be flush with: 246 of the old part\'s 288 vertices were outside the loft. The three cuts a side are placed off the cage rather than off prose. The front one is at x 0.780, 28 mm behind the A-pillar base node\'s own aft face at 0.808, because a door leading edge that hinges on that pillar cannot start ahead of it and the old skins started 272 mm ahead of it, across the front arch. The middle cut is the B-pillar centerline at x 0.020 exactly. The rear one is at x -1.000, ten millimeters forward of the rocker\'s rear end and 92 mm forward of the rear tire\'s leading edge at -1.0917, so the aperture stops where the sill it sits on stops and 271 mm of fixed quarter covers interior-6\'s rear seat back. Each cut is 5.00 mm lip to lip and 4.00 mm deep, measured off the built mesh, and each door carries the far wall of the joint ahead of it and the near lip, wall and floor of the joint behind it, so the channel between two panels is closed and reads as two lit walls and a dark floor. Hinges are adjusted against the casting datum until a swept light line crosses all four doors without a kink. The skins follow the body into thin-ply carbon and give back three kilograms, and the frameless glass follows the canopy into chemically strengthened plies. What Gen 5 adds is names on the wires. Gen 3\'s e-latches drew from an unnamed supply; here the capacitive strips and latches ride hv-4\'s corner zonal controllers, forty centimeters of 48 V drop to the nearest box, each latch a fused, telemetered channel that reports its actuation current signature to the fleet the way every eFuse circuit does.\n\nThe camera pods are carried on their 90 mm stalks, still worth about 0.008 of Cd against glass mirrors, and they now serve two masters: the driver\'s displays and autonomy-4\'s consolidated camera set, which indexes the pod lenses into its surround model. That makes a pod a sensor mount with an optical spec, not a styling item; its stalk stiffness is toleranced so road vibration stays inside the stabilization budget of the perception stack.',
      why: 'Doors are where the monoform admits people exist, and the apex body keeps the Gen 3 settlement: spend the tolerance budget on flushness, let the gap be what the seals need, and hold the only four joints on the body side to a quarter millimeter. Everything else is inheritance done properly: power from the partner that owns power, vision to the partner that owns vision.',
      fail: [
        'E-latches keep their legally required mechanical release, exercised at every service because nobody touches it until the day it matters, carried word for word from Gen 3.',
        'A curbed camera pod is now a perception event: autonomy-4 flags the degraded sector and widens its margins until the pod is re-indexed, so a cosmetic knock books a calibration, not just a part.',
        'Seal compression set still returns as a whistle at exactly the speed you drive daily; EPDM chemistry has ignored three design briefs in a row.',
      ],
      explode: [0.08, 0, 0.85],
    },
    lightbands: {
      name: 'Light bands',
      tagline: 'Two flat faces, two glowing closures, and the car\'s long-range eyes living behind the front one.',
      mass: 4,
      count: 2,
      specs: [
        ['Front', '2 x 84-pixel matrix + autonomy-4\'s lidar pair at z +-0.30'],
        ['Rear', 'PMMA guide across the Kamm face'],
        ['Brake rise', '< 10 ms, the Gen 1 number, still standing'],
        ['Placement', 'The only two flat faces on the car, both in dead air'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The Gen 3 logic carries: the loft is truncated by exactly two flat faces, and each face is closed by a light band living in air the flow has already abandoned, the stagnation region at the nose and the wake behind the Kamm face. The matrix optics and the rear guide are unchanged because their numbers never needed to move: 84 pixels a side carving oncoming traffic out of the high beam through a 50 ms camera loop, and a brake signal at full output in under 10 ms, seven meters of warning at highway speed.\n\nThe front band earns its Gen 5 line by being shared real estate. autonomy-4\'s solid-state flash lidar pair sits behind the same conformal window, one puck toed out behind each end of the band at z +-0.30, exactly where the Gen 4 module mounted them; the band\'s heater film keeps the shared window clear for matrix and lidar alike, and the wash nozzle schedule is owned by the perception stack, not the lighting controller, because a dirty window is a sensor fault before it is a styling fault. At the tail, the deployed Kamm spoiler sits above and ahead of the face, and the band\'s photometry was certified with the blade at every position: the regulated angles of visibility clear the deployed blade by design, not by luck.',
      why: 'A monoform still leaves nowhere else for light to live, and now nowhere better for a lidar either: the front face is the one flat, forward, washable, heated surface on the car, in dead air where a window costs no drag. Two systems sharing one aperture is the cleanest integration on the body.',
      fail: [
        'One part per face, carried: a parking tap costs the whole band, and now possibly a lidar recalibration with it.',
        'Base suction still films the rear band with road dirt, so the dirtiest surface on the car remains its only rear signal; the wash cycle is a safety schedule, carried from Gen 3.',
        'A stone star in the shared front window sits in the lidar\'s aperture long before it bothers the human eye; the perception stack detects the scatter signature and books the glass.',
      ],
      explode: [1.15, 0.1, 0],
    },
    'kamm-spoiler': {
      name: 'Deployable Kamm spoiler',
      tagline: 'Gen 3 tilted the deck twelve degrees; Gen 5 gives the tail a blade with real travel and a brake pedal.',
      mass: 6,
      specs: [
        ['Blade', 'Carbon, 1.16 m span, 200 mm chord, drawn deployed'],
        ['Travel', 'Flush to 78 mm proud, continuous; full-up airbrake'],
        ['Worth', '~4 counts deployed at 130 km/h; base area -6%'],
        ['Actuation', 'Two 48 V spindle drives on hv-4\'s rear zonal channels'],
        ['Fail position', 'Spring to flush; law beats drag, carried'],
        ['Maturity', 'Production practice: multi-position wings have shipped for decades'],
      ],
      how: 'The Kamm argument is two generations old: the wake behaves as if the phantom tail were present, and everything you can do to pull the separation edge inboard shrinks the base area the pressure deficit acts on. Gen 3 bought that with a 12 degree deck flap. The apex blade does the same job with authority: raised 78 mm on its struts it re-cambers the last 200 mm of the upper surface, drives the upper separation line down, and takes about 6 percent out of the base area, worth around 4 counts at highway speed. Four counts against the six Gen 3 claimed is the baseline moving, not the blade losing: the sealed floor and the deployed diffuser have already shrunk and lowered the wake this blade trims, so each percent of base area buys less than it did when the deck flap fought the tail alone. Because it moves continuously it also becomes a trim device, balancing the rear axle against the venturi floor\'s suction so the pitch attitude suspension-4 holds stays inside the floor\'s tuned window; tail and floor are one control loop, not two devices.\n\nThe span is 1.16 m and it used to be 1.30, and that is a drawing correction rather than a design change. At the blade station the deck shoulder is 0.594 half-width, so 1.30 m of blade hung 214 mm off each side of the car it was supposed to be trimming: a wing wider than the tail it sits on does not re-camber the tail, it just makes tip vortices. The blade now stops 14 mm inside the shoulder line, and both struts are placed through the loft\'s own inverse rather than at a nominal height, so they stand on the deck instead of near it.\n\nThe actuation is named, per the ladder\'s law: two 48 V spindle drives fed from hv-4\'s rear corner zonal controllers on ordinary fused channels, not the by-wire feed pair, because aero is deliberately not safety-critical: a spoiler that fails costs counts, never control. The stow logic mirrors Gen 3\'s flap: below roughly 80 km/h the blade lies flush, restoring the certified pedestrian geometry and the parked silhouette. The one new verb is braking. On a hard brake-by-wire demand from wheels-3\'s master unit the blade drives to full-up in half a second as an airbrake, adding drag and rear downforce exactly when the friction brakes and the regen map want both; the same trick Veyron-class cars certified twenty years ago, done here at 48 V.',
      why: 'A fixed truncation pays average-case drag every hour; a blade with travel buys the best case at speed, the legal case in town, and a free contribution to the one maneuver where drag is suddenly an asset. The mechanism is production practice down to the spindle drives, so the maturity bill for the whole tail lands on the Cd total, not on this part.',
      fail: [
        'Ice can lock the blade flush; the cold-start sweep detects the torque spike, leaves it stowed for the day, and the range estimate explains the missing counts, the habit carried from Gen 2\'s shutter bank.',
        'Stuck deployed is the bad direction: an uncertified geometry below 80 km/h, so a second, independent spring release drops the blade, and if both fail the car caps speed and says why.',
        'A million deploy cycles work the strut pivots; wear arrives as a millimeter of blade lash the self-test measures, booked before the highway can flutter it.',
      ],
      explode: [-0.9, 0.55, 0],
    },
    'diffuser-flap': {
      name: 'Deployable diffuser flap',
      tagline: 'The floor\'s exhaust nozzle learns to steepen itself: 17.5 degrees under feedback where a fixed ramp dared 13.',
      mass: 5,
      specs: [
        ['Ramp', '0.56 m, hinged at x -1.78; 13 to 17.5 degrees, drawn deployed'],
        ['Span', '1.26 m; 87 mm clear of wheels-3\'s rear tires'],
        ['Worth', '~5 counts with the sealed floor; rear axle zero-lift trim'],
        ['Actuation', 'Two 48 V drives on hv-4\'s rear zonal channels'],
        ['Fail position', 'Spring to 13 degrees, the passive-safe angle'],
        ['Maturity', 'Production practice: active diffuser flaps shipped in limited series'],
      ],
      how: 'Gen 2\'s diffuser content named the cliff: a fixed ramp lives two degrees from stall, so it ships at 13 and leaves recovery on the table. The apex flap hinges the whole ramp at x -1.78, clear of the rear drive zone, and runs it at 17.5 degrees under closed-loop control, drawn here in that deployed state. Steeper expansion means more pressure recovery, more counts, and more rear downforce, and it is only tenable because the flap can retreat: pressure taps along the ramp and suspension-4\'s ride-height signal feed a controller that trims the angle back the moment the expansion approaches separation, in yaw, in crosswind, or over a crest. A fixed ramp buys the worst case; a controlled one sells it back.\n\nThe geometry respects every rear contract on the ladder. The span stops at |z| 0.63, which clears wheels-3\'s 185-section tire faces at 0.7175 by 87 mm and never approaches the in-wheel annulus at r 0.155 to 0.235, |z| 0.72 to 0.80, which belongs to the drivetrain and is not touched by this or any body part. Four fence vanes keep the widened expansion two-dimensional, carried physics from Gen 2. The two 48 V drives sit at the hinge ends on hv-4\'s rear zonal controllers, ordinary fused channels, a few amps against a spring that holds the ramp at 13 degrees whenever power or control is in doubt: at 13 the diffuser cannot stall, it merely earns less.',
      why: 'The underbody exhaust is the last big account on the drag ledger, and its optimum angle is a moving target that depends on speed, height and yaw. Fixing the ramp meant buying the safest angle forever. Actuating it converts margin into recovery on the 90 percent of highway time when conditions are benign, and gives the margin back automatically when they are not: the definition of grown-up active aero.',
      fail: [
        'An iced or mud-blinded pressure tap forfeits the steep regime: control falls back to 13 degrees and the range estimate quietly loses the difference, honest degradation carried from the Gen 3 aero playbook.',
        'The tunnels feed the ramp everything the road throws under the car; the vanes take the gravel, and a bent vane announces itself as a one-sided stall the taps can see.',
        'Deep snow packs the expansion and the diffuser becomes a plow; the flap is rated for the load and the controller parks it at 13, but slush remains beyond the drag model, carried from Gen 3 unimproved.',
      ],
      explode: [-1.0, -0.4, 0],
    },
    'arch-louvers': {
      name: 'Active arch louvers',
      tagline: 'Gen 3 covered the crescents the tire cannot reach; Gen 5 gives that cover a hinge, a brake-temperature model, and at last a pocket to live in.',
      mass: 3,
      count: 2,
      specs: [
        ['Coverage', 'Two tapered flank pockets per side, 48 to 137 mm tall, over the front arch'],
        ['Blades', '7 per side, one 48 V rotary actuator per bank'],
        ['Worth', '~5 counts trimmed shut, carried from Gen 3 and not re-audited'],
        ['Clearance', '50 mm to wheels-6\'s swept front corner through 30 deg of lock'],
        ['Fail position', 'Spring open, venting the arch'],
        ['Maturity', 'Pilot line at the arch; the shutter mechanism is production practice'],
      ],
      how: 'The arch logic is Gen 3\'s and it carries: a rotating wheel in an open arch is an air pump with no purpose, and partially sealing the opening traps the pumping pressure unless something bleeds it. Gen 3 bled it through three static louvers, an average-case setting paid at every speed. Gen 5 pivots the blades. Shut, the banks seal to the loft line and the arch sheds its side-spill cleanly; open, they dump arch pressure and admit cooling flow on demand. The demand signal is real: the Gen 5 front corner carries friction discs and calipers, and a mountain descent or a towing-grade repeated stop needs arch airflow the cruise condition never does, so a brake-temperature model opens the blades exactly when the rotors ask.\n\nWhere the bank lives is the part this generation had to correct, and the correction is geometry rather than argument. Gen 3 spoke of covering the crescents of arch opening that the steered tire cannot reach, and this module drew seven blades a side to do it. Swept vertex by vertex against the body surface, 414 of the bank\'s 432 vertices stood outside the bodywork, the worst by 151.8 mm, and 180 of them hung below the arch line entirely: the bank was floating in the air beside the front tire and touching nothing. It is not a placement that could be nudged back, because there is no band down there to nudge it into. Sweeping wheels-6\'s built front corner about the steering axis through (1.45, 0.81) puts the tread at |z| 0.9584 at 10 degrees of lock, 1.0108 at 20 and 1.0593 at 30, against a flank that is 0.905 wide: at any usable lock the tire is outside the car, which is why no production front arch is ever closed and why body-9 filed a defect against body-8 for a front closeout the steered tire entered at 3.1 degrees.\n\nWhat the sweep cannot do is rise. Rotation about a vertical axis moves nothing in y, and the tire\'s own crown is 0.713, so the flank above the arch line is the one band a front arch device can occupy and be certain of never being reached. The banks are now cut into that flank: two pockets a side, both 30 mm deep and both centered in their own bay so neither mouth sits on the front axle station where the flow accelerates hardest. Each one is cut at a fixed fraction of the flank rather than at a fixed height, so it tapers with the fender it is in: swept lip to lip on the built mesh the aft pocket runs 137 mm at x 1.135 down to 54 mm at x 1.375, and the forward one 83 mm at x 1.755 down to 48 mm at x 1.515. The blades follow, 78 mm at the wide end of the aft bank to 40 mm at its narrow end. Measured in three dimensions against the swept solid the nearest hardware is 50 mm clear, and the arch line itself is tighter than that at 5 mm over the static tire, which is a property of the carried Gen 3 loft and not of this bank. Each blade stands proud of a cassette frame that lies on the pocket floor, and the frames are tilted onto the channel\'s own line and seated along the surface normal, because the flank leans in two axes and a frame placed as though the floor were a plane buries one corner and floats the other.\n\nEach bank runs one 48 V rotary actuator from hv-4\'s front zonal controllers, tens of watts on an ordinary fused channel, and position truth comes free from the eFuse telemetry: the actuation current signature is the sensor, the same fleet-learning trick hv-4 runs on every circuit. The fail direction is chosen by physics, not convenience: blades spring open, because a sealed arch that cannot vent traps the pumping pressure the opening used to spill, and trapped arch pressure feeds front lift, the one thing a 130 km/h front axle must never be surprised by. The mechanism is the grille shutter bank\'s, relocated; what earns the pilot line label is the address, and what has to become true is sealing and icing endurance in the wheel\'s own spray, plus a frangible blade certified against the once-a-decade contact nobody plans.',
      why: 'An arch is an air pump whose duty varies a hundred to one between a summer cruise and an alpine descent. Fixed louvers priced the average; actuated blades buy both ends of the range for 30 watts and half a kilogram per corner, and they finally let the front arches close the gap to the skirted rears that the monoform has enjoyed since Gen 3.',
      fail: [
        'Grit and ice in the pivots is the chronic case; the cold-start sweep catches a stiff bank and leaves it open, costing counts, never cooling.',
        'A blade struck through the pocket mouth is designed frangible: it tears free rather than levering its cassette into the fender, loud and harmless, and the current signature logs exactly when it happened.',
        'Snow chains and the pocket mouths remain mutually exclusive by geometry; the quick-release mounts are the design answer and roadside reality is the carried caveat.',
      ],
      explode: [0.4, -0.05, 0.75],
    },
    'venturi-floor': {
      name: 'Sealed venturi underbody',
      tagline: 'The pack made the floor flat; Gen 5 closes the last gaps and carves the flat into two working tunnels.',
      mass: 7,
      specs: [
        ['Panels', 'Carbon closeouts, lip-to-pack and pack-to-flap hinge'],
        ['Tunnels', 'Twin, strake-divided, exhausting through the diffuser flap'],
        ['Ground gap', '110 mm at the lip; suspension-4 holds it +-3 mm at speed'],
        ['Arch vent', 'Skirted rear arches drain wheels-3\'s ~110 m3/h into the tunnels'],
        ['Worth', '~5 counts sealed and tunneled against Gen 3\'s metered flat floor'],
        ['Maturity', 'Production practice: sealed floors universal, tunnels in series production'],
      ],
      how: 'Gen 3 metered the underbody with a carbon lip and let the battery\'s flat belly do the rest. Gen 5 finishes the plane. The lip carries over at a 110 mm gap; behind it a carbon closeout bridges to the pack\'s leading edge, the pack underside runs to x -1.30 in the envelope battery-6 inherits from the battery-3 convention, and a rear closeout bridges from the pack to the diffuser flap\'s hinge line at x -1.78. Nose to tail, the air sees one continuous ceiling. Strakes then divide the rear run into twin tunnels, so a yawed crosswind can stall one side while the other keeps pulling, and the whole floor\'s suction degrades by half instead of letting go at once, the same fence logic the diffuser vanes apply at the exit.\n\nA venturi is tuned by its gap, and Gen 3 listed the untuned case as a failure mode with no owner. The Gen 5 preset gives it one: suspension-4\'s air springs hold the speed-scheduled ride height to a few millimeters, closing the loop the floor always needed, and its height sensors cross-check against the flap\'s pressure taps so a drifting sensor is caught by disagreement. The skirted rear arches join the circuit too: wheels-3\'s heat-extraction covers pump roughly 110 m3/h per corner out of each rear wheel, and inside a skirted arch that flow needs a drain, so the arch floor slots into the tunnel ceiling and the floor\'s suction empties the arch downward instead of letting it spill out the skirt line. One system, four consumers, every number reconciled against the partner that owns it.',
      why: 'The underbody is the largest surface on the car and the only one the battery already paid to flatten. Sealing its last two gaps and shaping the flat into tunnels is the highest-value aero purchase remaining at this Cd, and it is the device stack\'s foundation: the diffuser flap is only worth its counts because this floor feeds it fast, clean, height-stable flow.',
      fail: [
        'Curbs and ramps still rake the lip first; the shear-away fasteners cost a bracket, carried through three generations because parking lots have not changed.',
        'A torn closeout flutters and drums before it drags; the cabin microphone array flags the signature and the drag estimator confirms it, so the failure is heard before it is felt.',
        'Deep snow packs the tunnels and the floor becomes a plow; structurally rated, aerodynamically dead, and still beyond the range model\'s vocabulary, carried from Gen 3 with the same apology.',
      ],
      explode: [0, -0.55, 0],
    },
    'intake-gates': {
      name: 'Intake gates',
      tagline: 'The sealed nose finally admits it has a customer: a metered gate whose sizing case happens at 0 km/h.',
      mass: 3,
      specs: [
        ['Bank', '4 slats, one 48 V actuator on hv-4\'s front zonal channels'],
        ['Feeds', 'thermal-6\'s radiator stack, front zone x 2.08 to 2.26'],
        ['Cd swing', '~0.008 open to shut; shut > 90% of driving time'],
        ['Sizing case', 'Fast charge, parked: fans pull, gates full open'],
        ['Fail position', 'Spring open: cooling beats drag, the Gen 2 law'],
        ['Maturity', 'Production practice since the 2010s'],
      ],
      how: 'Gen 2 proved the argument and Gen 3, in its pursuit of one unbroken surface, quietly stopped drawing the intake at all. The apex body puts it back and puts a name on it: below the nose face, a four-slat bank meters the only air admitted through the body, ducted straight to thermal-6\'s radiator stack in the front zone the ladder has never moved, x 2.08 to 2.26. The gate logic is Gen 2\'s standing negotiation, carried verbatim: the thermal controller owns the position request, the aero controller is granted closure only when every thermal margin is green, and the spring fails the bank open because a stuck-shut gate on a mountain climb cooks hardware while a stuck-open one costs a count.\n\nWhat Gen 5 changes is which hour sizes the opening. The dominant heat event in this preset is not driving at all: battery-6\'s fast charge rejects its peak load through thermal-6\'s stack while the car sits still, no ram air, fans pulling through a fully opened bank. Sized for that stationary worst case, the driving requirement is trivial, which is why the gates spend more than 90 percent of road time sealed and the nose spends its life aerodynamically solid, exactly the assumption the Cd 0.130 configuration is built on. The bank\'s single 48 V actuator rides a fused channel on hv-4\'s front zonal controllers and runs the same cold-start self-test sweep every actuated surface on this body inherited from the Gen 2 shutter bank.',
      why: 'A fixed intake is sized for the worst hour and paid for every other hour, and the worst hour moved off the road when charging power passed driving power. Metering the opening per minute keeps the sealed-nose fiction honest: the surface Gen 3 drew is now a position this mechanism actually holds, most of the time, and admits it is not holding the rest.',
      fail: [
        'Road grit and ice jam slat pivots; the cold-start sweep reports a stiff bank before the highway or the charger does, carried from Gen 2.',
        'Stuck shut is the dangerous direction: thermal-6 sheds load, tapers power, and the car explains why, the same graceful surrender the sealed nose has promised since the aero concept.',
        'The slats live in the stone-strike zone; glass-filled polymer takes the gravel, and a cracked slat costs a cartridge swap, not a nose.',
      ],
      explode: [1.3, -0.08, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   The primary surface is the body-3 loft carried VERBATIM: 10 stations,
   x +2.375 to -2.375, 13 points per ring, sliced into flank / nose / glass /
   deck bands that share edges. The mid-canopy rings hold the near-flat roof
   band out to z +-0.66 so the glass wraps the cage rails (top ~1.46 at
   z 0.615) instead of dipping under: the codified Gen 3 lesson, do not
   re-learn it.

   THE CRISPNESS PASS CHANGED NO STATION AND NO PROFILE POINT. What it
   changed is that the surface is now resampled through one master grid with
   real recessed shutlines cut into it, that the panels which used to float
   above the surface are slices OF it, and that the hardware which used to
   hang outside the bodywork is seated on measured geometry. Everything below
   is derived from the STATIONS table by helper, never placed by eye.

   PARTNER GEOMETRY THIS PASS WAS MEASURED AGAINST, all off built meshes of
   the Gen 5 preset in js/registry.js, which is wheels-6 and not the wheels-3
   named in design/gen5-apex.md:

   - CAGE, from body.js: A-pillar base node (0.85, 0.95, 0.72) on a 0.042 m
     tube, so its aft face is x 0.808; B-pillar at x 0.020; rocker outer face
     |z| 0.915, top y 0.42, ends x +-1.010. The three door cuts are placed
     off those three numbers and not off prose.
   - wheels-6: front and rear tire outer faces at |z| 0.9025 exactly, tire
     top y 0.713, front tire spanning x 1.0917 to 1.8083. Swept about the
     steering axis through (1.45, 0.81) the corner reaches 0.9584 at 10
     degrees of lock, 1.0108 at 20 and 1.0593 at 30, always at hub height
     y 0.355. Nothing the wheel sweeps ever rises above y 0.713.
   - interior-6: rear bench x -1.271 to -0.475, front seats -0.084 to 0.650.
   - thermal-6: forwardmost vertex x 2.257, the radiator core face.
   - battery-6: floor lid x -1.294 to 1.290 at y 0.276 to 0.308.
   - autonomy-4: flash lidar pucks at x 2.284 to 2.369, y 0.583 to 0.647,
     |z| up to 0.340.

   CARRIED CONDITIONS, measured and stated rather than fixed here:
   hv-4's charge port is a design/gen4.md hard point at (-1.92, 0.80, 0.88)
   and draws its own open flap. This loft is 0.8717 half-width there, so the
   bezel stands 26 mm outside the flank and the pin face 56 mm. No tail that
   closes to a 0.88 Kamm face can hold 0.88 of half-width at x -1.92, and
   both the port and its flap are hv-4 geometry. interior-6's restraints
   reach |z| 0.886 at y around 1.0 where this loft is 0.867, so they stand
   19 mm outside the skin; the same towers stand outside body-7 and body-8.
   Both are older than this pass and neither is a body-6 defect to repair
   without moving a surface that is booked. */

function ring(x, half, crownY) {
  const pts = [];
  for (let i = 0; i < half.length; i++) pts.push([x, half[i][0], -half[i][1]]);
  pts.push([x, crownY, 0]);
  for (let i = half.length - 1; i >= 0; i--) pts.push([x, half[i][0], half[i][1]]);
  return pts;
}

/* [x, [[y, half-width] x6], crownY]. Every number is body-3's. */
const STATIONS = [
  [2.375, [[0.42, 0.50], [0.47, 0.55], [0.53, 0.57], [0.58, 0.53], [0.62, 0.44], [0.648, 0.20]], 0.66],
  [2.10, [[0.34, 0.68], [0.44, 0.73], [0.56, 0.75], [0.65, 0.69], [0.72, 0.55], [0.755, 0.25]], 0.77],
  [1.82, [[0.574, 0.86], [0.66, 0.875], [0.76, 0.86], [0.83, 0.74], [0.88, 0.57], [0.905, 0.26]], 0.915],
  [1.45, [[0.785, 0.90], [0.82, 0.905], [0.86, 0.89], [0.90, 0.78], [0.93, 0.60], [0.947, 0.27]], 0.955],
  [1.06, [[0.536, 0.90], [0.66, 0.92], [0.90, 0.935], [0.99, 0.79], [1.035, 0.59], [1.056, 0.26]], 1.065],
  [0.45, [[0.30, 0.91], [0.55, 0.935], [0.92, 0.94], [1.12, 0.74], [1.425, 0.66], [1.44, 0.35]], 1.445],
  [-0.35, [[0.30, 0.92], [0.55, 0.94], [0.92, 0.94], [1.16, 0.72], [1.435, 0.67], [1.448, 0.35]], 1.452],
  [-1.45, [[0.30, 0.94], [0.55, 0.94], [0.92, 0.925], [1.02, 0.68], [1.115, 0.46], [1.153, 0.21]], 1.16],
  [-1.87, [[0.34, 0.93], [0.55, 0.925], [0.90, 0.90], [0.965, 0.64], [1.025, 0.43], [1.052, 0.195]], 1.06],
  [-2.375, [[0.42, 0.66], [0.55, 0.68], [0.72, 0.66], [0.80, 0.55], [0.85, 0.40], [0.874, 0.18]], 0.88],
];

const RINGS = STATIONS.map(([x, half, crownY]) => ring(x, half, crownY));

/* Half-width of the loft at an arbitrary (x, y): linear between the two
   bracketing stations, linear between profile points inside each. This is
   body-7's helper carried in, and it is what makes every placement below a
   measurement of the surface rather than a remembered number. */
function halfWidth(x, y) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  const pts = [];
  for (let k = 0; k < A[1].length; k++) {
    pts.push([(1 - t) * A[1][k][0] + t * B[1][k][0], (1 - t) * A[1][k][1] + t * B[1][k][1]]);
  }
  pts.push([(1 - t) * A[2] + t * B[2], 0]);
  if (y <= pts[0][0]) return pts[0][1];
  for (let k = 0; k < pts.length - 1; k++) {
    if (y <= pts[k + 1][0]) {
      const [y0, w0] = pts[k], [y1, w1] = pts[k + 1];
      return y1 === y0 ? w1 : w0 + (y - y0) / (y1 - y0) * (w1 - w0);
    }
  }
  return 0;
}

/* Lower edge of the loft at an arbitrary x: the flank's bottom line, which
   over the wheels is the arch line. */
function bottomY(x) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  return (1 - t) * A[1][0][0] + t * B[1][0][0];
}

/* Inverse of halfWidth on the upper branch: the height at which the surface
   is hz wide. Spoiler struts, light bands and end-face hardware are placed
   through this so they land ON the surface instead of near it. */
function surfaceY(x, hz) {
  let lo = bottomY(x), hi = 1.46;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    if (halfWidth(x, mid) > hz) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/* [y, half-width] at a fractional ring-profile index c on the station at x.
   The recesses are cut at a column fraction rather than at a height, so the
   hardware that goes in them has to be able to ask where that column is. */
function colPt(x, c) {
  const k = Math.max(0, Math.min(4, Math.floor(c))), f = c - k;
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  const p = (s, j) => [(1 - t) * A[1][j][0] + t * B[1][j][0],
                       (1 - t) * A[1][j][1] + t * B[1][j][1]];
  const a = p(0, k), b = p(0, k + 1);
  return [a[0] + f * (b[0] - a[0]), a[1] + f * (b[1] - a[1])];
}

/* Fractional row index of a station x, for placing grooves by coordinate. */
function rowOf(x) {
  for (let i = 0; i < STATIONS.length - 1; i++) {
    if (x <= STATIONS[i][0] && x >= STATIONS[i + 1][0]) {
      return i + (STATIONS[i][0] - x) / (STATIONS[i][0] - STATIONS[i + 1][0]);
    }
  }
  return x > STATIONS[0][0] ? 0 : STATIONS.length - 1;
}

/* Flat end cap built from a ring's own outline, so the nose and Kamm faces
   fill their apertures exactly instead of being rectangles inside a curved
   edge.

   closeLoop is not optional. A ring here is an OPEN polyline from the
   flank's bottom edge on one side, over the crown, to the bottom edge on the
   other, so fanning it to a shrunken copy without joining the last point
   back to the first leaves the sector across the bottom unfilled. That is
   the defect body-8 and body-9 both carried, and this body carried a worse
   version of it: the nose face was a 1.00 by 0.22 m box inside an aperture
   0.57 half-width at y 0.53 and 0.66 tall, so 70 mm of open loft showed on
   each side at the widest point and the Kamm box stood 332 mm outside its
   own outline at the top corners while leaving 40 mm open at the waist.

   AND closeLoop IS NOT SUFFICIENT EITHER, which is the second half of the
   same lesson. lib.loft skins BETWEEN sections and leaves the inside of the
   last one open, so a cap lofted from its outline to a shrunken copy of that
   outline still has a hole exactly the size of the copy. Rastered with axial
   rays before the fan went in, 5.92 cm2 of the nose face showed the polished
   bumper beam at x 2.270, and 14.56 cm2 of the Kamm face was a clear line
   straight through the whole car: those rays leave again at the nose cap,
   x 2.374. closeLoop fixes the notch across the bottom. It does not fix the
   middle, and only a raster of the finished face finds the middle. */
function endCap(ringPts, dx, mat) {
  const ys = ringPts.map((p) => p[1]);
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const inner = ringPts.map(([x, y, z]) => [x + dx, cy + (y - cy) * 0.05, z * 0.05]);
  return [lib.loft([ringPts, inner], mat, true), fanTo(inner, mat, dx < 0 ? 1 : -1)];
}

/* Triangle fan closing a ring onto its own centroid, wound so the face looks
   along xdir. One triangle per ring segment and nothing outside the ring
   moves, which is why the cap is closed this way rather than by collapsing
   the inner section: every square millimeter of the lofted band, and the
   badge seated on it, keeps the surface it was measured against. */
function fanTo(ring, mat, xdir) {
  const n = ring.length;
  let cx = 0, cy = 0, cz = 0;
  for (const [x, y, z] of ring) { cx += x; cy += y; cz += z; }
  cx /= n; cy /= n; cz /= n;
  const a0 = ring[0], b0 = ring[1];
  const nx = (a0[1] - cy) * (b0[2] - cz) - (a0[2] - cz) * (b0[1] - cy);
  const flip = nx * xdir < 0;
  const pos = new Float32Array(n * 9), uv = new Float32Array(n * 6);
  for (let i = 0; i < n; i++) {
    const a = ring[i], b = ring[(i + 1) % n];
    const t = flip ? [[cx, cy, cz], b, a] : [[cx, cy, cz], a, b];
    for (let k = 0; k < 3; k++) {
      pos[i * 9 + k * 3] = t[k][0];
      pos[i * 9 + k * 3 + 1] = t[k][1];
      pos[i * 9 + k * 3 + 2] = t[k][2];
      uv[i * 6 + k * 2] = t[k][2];
      uv[i * 6 + k * 2 + 1] = t[k][1];
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.computeVertexNormals();
  return lib.mesh(geo, mat);
}

/* Angled box with chamfered edges: abox's signature with the chamfer after
   the depth. A chamfer turns one flat highlight into two, which is most of
   the difference between a part and a block. */
function acbox(w, h, d, c, mat, x, y, z, rz = 0, rx = 0, ry = 0) {
  const m = lib.cbox(w, h, d, c, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz, 'ZXY');
  return m;
}

const COWL = 4;      /* ring index where the glass band starts */
const DECK = 8;      /* ring index where the glass ends and the deck begins */
const LAST = STATIONS.length - 1;
const NC = 12;       /* last column index; the ring is 13 points */

const glassBand = RINGS.slice(COWL, DECK + 1).map((r) =>
  r.slice(3, 10).map((p) => [p[0], p[1] + 0.008, p[2] * 1.012])
);

/* ── The crisp shell: one master grid ──────────────────────────────────

   Every painted panel is a slice of ONE resampled loft rather than four
   independent ones plus four boxes. Three things follow.

   Panels that share an edge share vertices, so the beltline and the
   paint-to-glass seam cannot open a hairline. A shutline is cut once, at a
   fractional station, and the two panels either side of it each pick up
   their own half of the channel, so a door gap is 5 mm wide and 4 mm deep
   with two lit walls and a dark floor instead of being nothing at all. And
   the station table, 10 rings of 13 points, is about 9 by 3 quads on a whole
   flank, which is not enough grid to cut anything into.

   INTERPOLATION IS DELIBERATELY LINEAR. lib.loft's Catmull-Rom mode is
   envelope-clamped and the envelope really is held, but frontal area is the
   widest point at each HEIGHT, so a surface that moves between profile
   points moves the integral without touching any extreme: measured on
   body-8's shell, clamped Catmull-Rom still moves A by 0.64 percent and
   unclamped by 2.80. Only linear takes it to zero, and this body's
   efficiency.js entry books an area. Linear also keeps the surface between
   stations bit for bit, which is what every clearance quoted on this page is
   measured against. See design/crispness.md.

   THE CREASE IS DECLARED, NOT DISCOVERED. Under linear interpolation every
   span between stations is exactly flat, so ALL of this body's curvature
   sits on its station lines and a global angle test cannot tell a designed
   crease from a coarse sample. body-8 put a knife edge round its own nose
   that way. Hardness is therefore declared per line in HARDR and HARDC, with
   an extent, and a 20 degree threshold is consulted only after a line has
   been named. What is declared here is every groove's four channel lines
   over its span, every resolved line inside a groove's run-outs across the
   channel width only, and the BELTLINE at ring point 2 and its mirror at
   ring point 10 from station 1 aft. That beltline is a real feature and not
   a sample: at station 6 the flank turns 43 degrees there, from a section
   running 0.935 to 0.940 half-width up to y 0.92 and then falling away to
   0.72 by y 1.16, and it does the same at every station from the front axle
   to the tail. It is the line the whole car is drawn around and it was being
   averaged into the panels either side of it. No station line is declared,
   so the nose stays a dome. ── */

const GAP = { width: 0.005, depth: 0.004 };
const FADE = 0.05;

/* ── Door shutlines, placed off the cage ────────────────────────────────
   x 0.780 is 28 mm aft of the A-pillar base node's own aft face at 0.808,
   which is where a front door leading edge has to be if it is to hinge on
   that pillar. The old skins started at x 1.080, 272 mm FORWARD of the
   pillar and across the front arch, which is a door that cannot open.
   x 0.020 is the B-pillar centerline exactly, and a four-door car splits its
   apertures on the B-pillar by definition.
   x -1.000 is 10 mm forward of the rocker's rear end at -1.010 and 92 mm
   forward of the rear tire's leading edge at -1.0917, so the aperture stops
   where the sill it sits on stops. interior-6's rear bench runs back to
   -1.271, which leaves 271 mm of fixed quarter over the seat back.

   The cut runs from the rocker top up to the paint-to-glass seam, because
   the sill is structure you sit on rather than door skin and the glass above
   is bonded. SILL is a column fraction rather than a height, so the height
   it lands at follows the surface: 0.515 at the front cut, 0.420 at the
   other two, against a rocker top at 0.420 and a flank bottom edge of 0.428
   and 0.300. Both ends of the span are panel edges, which is deliberate: a
   span that ends short of a boundary leaves the channel at full depth on the
   panel's own last row, and body-8 measured 3.952 mm of it. */
const SILL = 0.48;
const SEAM = 3;
const DOORL = [SILL, SEAM], DOORR = [NC - SEAM, NC - SILL];
const SHUT = [rowOf(0.780), rowOf(0.020), rowOf(-1.000)];

/* Hood, x 2.240 to 1.140: aft of the nose fascia band that carries the
   light band and the lidar windows, forward of the cowl at station 4 where
   the glass root starts, and covering P.frunk's x 1.78 to 2.12 with 120 mm
   at the front and thermal-6's whole front stack (1.993 to 2.257) beneath
   it. Decklid, x -1.905 aft: 35 mm behind the glass band's bonded rear edge
   at -1.870, so the lid's leading edge is a gap on paint rather than a line
   drawn on a bond. Its trailing edge is the Kamm face's own outline, which
   needs no groove because the panels already break there. Side gaps sit at
   ring fraction 3.45 and 8.55, on the deck shoulder and clear of the seam.

   The four permitted interruptions on the BODY SIDE are still four; these
   two are on the deck, where a car that cannot open its frunk or reach its
   trunk is not a car. */
const HOOD = [rowOf(2.240), rowOf(1.140)];
const LID = rowOf(-1.905);
const DECKSPAN = [3.45, 8.55];

const GROOVES = [];
const push = (g) => (GROOVES.push(g), GROOVES.length - 1);
const SHUTG = SHUT.map((r) => [
  push({ row: r, ...GAP, span: DOORL, runout: FADE }),
  push({ row: r, ...GAP, span: DOORR, runout: FADE }),
]);
/* The push ORDER is the groove table's order and nothing may reorder it: the
   resolved index of every line on this surface follows from it. What changed
   when the hood and the lid became closures is only that their groove indices
   are now KEPT, because a panel that opens has to be sliced at the split its
   own channel resolved to rather than at a number retyped from a survey. */
const HOODG = HOOD.map((r) => push({ row: r, ...GAP, span: DECKSPAN, runout: FADE }));
const LIDG = push({ row: LID, ...GAP, span: DECKSPAN, runout: FADE });
const HOODC = [], LIDC = [];
for (const c of DECKSPAN) {
  HOODC.push(push({ col: c, ...GAP, span: [HOOD[0] - FADE, HOOD[1] + FADE], runout: FADE }));
  LIDC.push(push({ col: c, ...GAP, span: [LID - FADE, LAST + 0.10], runout: FADE }));
}

/* ── The arch louver recesses ───────────────────────────────────────────
   THE DEFECT. arch-louvers was not on the car. Swept vertex by vertex
   against halfWidth, 414 of its 432 vertices stood OUTSIDE the loft, the
   worst by 151.8 mm at (1.908, 0.340, 0.955), and 180 of them sat below the
   flank's own bottom edge, which over a wheel is the arch line. The bank was
   hanging in the air beside the front tire. body-7 and body-8 carried the
   opposite version of the same fault, a bank buried 1.8 mm behind unbroken
   paint, and the fix is the same either way: the recess the bank always
   implied has to exist.

   AND THE FLANK IS THE ONLY BAND A FRONT ARCH DEVICE CAN LIVE IN. Panels in
   the arch aperture itself are not a cheaper answer, they are a wrong one:
   sweeping wheels-6's built front corner about the steering axis through
   (1.45, 0.81) puts the tread at |z| 0.9584 at 10 degrees of lock, 1.0108 at
   20 and 1.0593 at 30, all of it at hub height, so anything hung in the
   aperture inboard of 1.06 is in the tire's path. body-9 filed that exact
   defect against body-8's front lower closeout, which the steered tire
   entered at 3.1 degrees. What the sweep cannot do is rise: rotation about a
   vertical axis moves no point in y, and the tire's own crown is y 0.713.
   Everything below is above that, so the swept solid never reaches it and
   the arch line stays the binding surface over the wheel, at 72 mm at the
   axle and 18 mm at x 1.635 where the fender is tightest.

   EACH BANK IS CENTERED IN ITS OWN BAY, x 1.135 to 1.375 between stations 4
   and 3 and 1.515 to 1.755 between stations 3 and 2, keeping 75 and 65 mm to
   the stations either side. That matters for the reason it did on body-8:
   station 3 is the front axle ring and the flow accelerates hardest around
   it, and a vent mouth cut into a shoulder ingests instead of exhausting.

   EACH BANK IS SIZED TO THE FLANK IT IS CUT INTO, which is not one number.
   Between the second and third profile points the surface runs 202 mm per
   index at x 1.135 and 54 mm at x 1.525, so one width and one column
   fraction for both banks put the forward one across the beltline kink and
   stood its cassette 39 mm outside the paint. The aft pocket is declared
   95 mm at column 1.50 and the forward one 70 mm at column 1.15.

   THE DECLARED WIDTH IS NOT THE BUILT WIDTH, AND A FIRST PASS HERE QUOTED
   THE WIDTH AT ONE STATION AS IF IT WERE THE RUN. A groove's parametric
   half-width is sized from the meters-per-index scale AVERAGED along its own
   run, so it holds its stated width only where the run's local scale equals
   that average. Swept lip to lip over every resolved row of each span on the
   built mesh, the aft pocket runs 53.57 mm at x 1.375 to 136.81 mm at
   x 1.135, and the forward one 47.73 mm at x 1.515 to 83.39 mm at x 1.755.
   The aft bay's scale changes by a factor of 2.55 over its own 240 mm, not
   by a third, and it is the aft bay and not the forward one that does it.
   What is constant is the FRACTION of the flank band the pocket occupies,
   which is what "taper with the fender" actually means here, and every piece
   of hardware takes its height from the channel's own resolved half-width
   times the local meters-per-index at its own station, so the blades taper
   with it: 78 mm at the aft end of the aft bank down to 40 mm at its forward
   end. The content quotes the measured range, not the declared number.
   Making the meter width constant instead would need per-span widths inside
   one bay, which buys a uniform slot at the price of a ridge at every span
   boundary, so it is not obviously the better car and it is not done here.

   The pocket's lowest lip is (1.135, 0.723), 10 mm above wheels-6's tire
   crown at y 0.713, which is the margin the whole flank argument rests on.

   FRONTAL AREA CANNOT MOVE, and the reason is arithmetic rather than hope. A
   is the widest half-width at each HEIGHT. Measured on the built lips the
   pockets span y 0.662 to 0.860 where the loft at their own stations is
   |z| 0.871 to 0.925, but the widest the car is anywhere in that height band
   is the station 5 and 6 beltline at 0.940, 400 mm further aft. Cutting into
   a surface that is not the widest one at
   its own height cannot move A, and deleting a bank that stood at |z| 0.967
   in the band y 0.33 to 0.68 takes silhouette OFF a body whose loft is 0.94
   there. */
const LOUV = { depth: 0.030, runout: 0.035 };
const BANKS = [
  { x: [1.135, 1.375], n: 4, col: 1.50, width: 0.095, wall: 0.013 },
  { x: [1.515, 1.755], n: 3, col: 1.15, width: 0.070, wall: 0.011 },
];
for (const b of BANKS) {
  b.g = push({ col: b.col, width: b.width, wall: b.wall, depth: LOUV.depth,
               span: [rowOf(b.x[1]), rowOf(b.x[0])], runout: LOUV.runout });
  push({ col: NC - b.col, width: b.width, wall: b.wall, depth: LOUV.depth,
         span: [rowOf(b.x[1]), rowOf(b.x[0])], runout: LOUV.runout });
}

/* The pocket floor at a station, for the hardware that has to sit on it.

   TWO THINGS GO WRONG HERE AND BOTH ARE PAID FOR. A groove sinks its depth
   along the surface NORMAL, so the floor is not LOUV.depth inboard in z and
   it is not a plane of constant |z|: it is the surface point pushed along
   (-hx, -hy, 1) / sqrt(1 + hx^2 + hy^2), which moves in y as well. body-8
   buried 186 triangles of cassette frame in its own pocket floor by using
   the z component alone.

   And the pocket is cut at a COLUMN FRACTION, not at a height, so its center
   line rises and falls along the car: over the forward bank colPt puts it at
   y 0.7072 at x 1.741 and y 0.7954 at x 1.525, 88 mm of drift across 216 mm
   of bank, and the floor tilts from 6.3 to 11.8 degrees over the same run. A
   first pass here took one height for the whole bank, which put the end
   frames 33 mm off the channel and onto the shoulder segment below it, where
   the profile falls 1.7 in z per 1 in y instead of 0.21, and stood them
   39 mm outside the paint. Every piece is placed at its own x. */
function pocket(x, b) {
  const c = colPt(x, b.col);
  const a = colPt(x, b.col - 0.25), d = colPt(x, b.col + 0.25);
  const dy = d[0] - a[0], dz = d[1] - a[1];
  const L = Math.hypot(dy, dz) || 1;
  const e = 0.004;
  const hy = (halfWidth(x, c[0] + e) - halfWidth(x, c[0] - e)) / (2 * e);
  const hx = (halfWidth(x + e, c[0]) - halfWidth(x - e, c[0])) / (2 * e);
  const N = Math.sqrt(1 + hx * hx + hy * hy);
  return {
    y: c[0] + (LOUV.depth * hy) / N,      /* floor center */
    z: c[1] - LOUV.depth / N,
    t: Math.atan2(dz / L, dy / L),        /* tilt of the channel's own line */
    ny: -dz / L, nz: dy / L,              /* outward normal in the yz plane */
    flat: 2 * SHELL.grooves[b.g].flat * (L / 0.5),   /* usable floor height */
  };
}

const SHELL = lib.loftGrid(RINGS, {
  rowSub: 2, colSub: 2, interp: 'linear', grooves: GROOVES,
});

const RI = (i) => SHELL.rowIndex(i);
const CI = (j) => SHELL.colIndex(j);
/* the two flank column bands and the deck band, in resolved indices */
const FL = [0, CI(3)], FR = [CI(9), CI(NC)], UP = [CI(3), CI(9)];
/* A door skin is the flank band between the two ends of its own cut, not the
   whole flank band. Below the cut the 120 to 140 mm of flank over the rocker
   is structure, so it stays with the skin. */
const DOORBAND = [CI(9), CI(NC - SILL)];
const SILLR = [CI(NC - SILL), CI(NC)], SILLL = [0, CI(SILL)];
/* each shutline pushed a left and a right groove; both resolve to the same
   split row, which is the far floor edge of the channel */
const CUT = SHUTG.map(([a]) => SHELL.grooves[a].split);
/* THE HOOD AND THE LID AS INDEX WINDOWS, read off their own channels rather
   than typed in. Measured on this grid: the hood is rows 6..28 by columns
   28..54 and the lid is rows 61..65 by columns 27..53. The two lid side gaps
   resolve one column inboard of the two hood side gaps even though both are
   pushed at ring fractions 3.45 and 8.55, because a groove inserts its own
   lip nodes and the two channels do not run over the same rows; reading the
   split instead of the fraction is what makes that a non-event. The lid's
   aft edge needs no groove: the Kamm cap is its own mesh, so the panels
   already break on the tail outline. */
const HOODROWS = HOODG.map((g) => SHELL.grooves[g].split);
const HOODCOLS = HOODC.map((g) => SHELL.grooves[g].split);
const LIDROWS = [SHELL.grooves[LIDG].split, RI(LAST)];
const LIDCOLS = LIDC.map((g) => SHELL.grooves[g].split);

/* ── The declared hard lines ────────────────────────────────────────────
   Resolved row and column indices that are ALLOWED to break. Everything else
   stays smooth whatever angle it turns through.

   A LINE IS DECLARED WITH ITS EXTENT. body-8 learned this the expensive way:
   a bare run-out index landed on a station and hardened the whole of it,
   putting a facet round the nose 400 mm from where the feature was. Every
   channel line here carries its groove's span and every run-out line carries
   the groove's own channel width. A run-out is an interval and not two
   lines, so every resolved line inside the fade is declared and the angle
   picks which of them is the ramp. Quad diagonals are never hard. */
const BELT = 2;
const HARDR = new Map(), HARDC = new Map();
const declare = (m, k, lo, hi) => {
  let l = m.get(k);
  if (!l) m.set(k, (l = []));
  l.push([lo, hi]);
};
const onLine = (m, k, o) => {
  const l = m.get(k);
  if (!l) return false;
  for (const [a, b] of l) if (o >= a && o <= b) return true;
  return false;
};
for (const g of SHELL.grooves) {
  const own = g.axis === 'row' ? HARDR : HARDC;
  const map = g.axis === 'row' ? CI : RI;
  const end = (g.axis === 'row' ? SHELL.cols : SHELL.rows) - 1;
  const lo = g.span ? map(g.span[0]) : 0, hi = g.span ? map(g.span[1]) : end;
  /* Every line between the two lips, not only the four that name the
     channel. A groove is not four lines with nothing between them: its
     run-out ramps the whole channel, and where a base profile point falls
     inside the channel the 30 mm offset sharpens that point into a ridge on
     the pocket floor. Measured before this was declared, fifteen interior
     lines turned 40 to 83 degrees and rendered smooth while the four
     declared ones broke cleanly: column 1.0 carries 82.7 degrees on the
     forward louver floor at x 1.570, and the hood side gap's own walls at
     columns 3.44 and 3.46 carry 66 degrees where they cross the decklid side
     gap's run-out at x -1.880. That is the foreign-line trap
     design/crispness.md documents in the row axis, one axis over. The 20
     degree threshold still decides which of them is a feature. */
  for (let k = g.i0; k <= g.i1; k++) declare(own, k, lo, hi);
  if (g.span) {
    const other = g.axis === 'row' ? HARDC : HARDR;
    const axis = g.axis === 'row' ? SHELL.v : SHELL.u;
    for (const [a, b] of [[g.span[0], g.span[0] + g.fade], [g.span[1] - g.fade, g.span[1]]]) {
      for (let k = 0; k < axis.length; k++) {
        if (axis[k] >= a - 1e-9 && axis[k] <= b + 1e-9) declare(other, k, g.i0, g.i1);
      }
    }
  }
}
for (const c of [BELT, NC - BELT]) declare(HARDC, CI(c), RI(1), SHELL.rows - 1);

/* Degrees. Consulted only ON a declared line, so it sits far below the 36 a
   global test would need: a channel wall stands at 65 to 75 degrees and a
   run-out ramp falls away to nothing along its own fade, so the threshold is
   deciding where along a named line the feature is, not whether it is one. */
const LINE = 20;

/* Split normals along the declared lines only. lib.crease cannot do this: it
   is a pure angle test with no idea which grid line an edge lies on. This
   walks the grid the panel was sliced from instead. Faces meet in a
   six-triangle fan around each interior vertex, cut by at most two lines, so
   the components come out of a six-element union over that fan. Triangle
   cost is zero, exactly as lib.crease. Carried from body-8. */
function creaseLines(mesh, rows, cols) {
  const r0 = rows[0], c0 = cols[0];
  const R = Math.min(SHELL.rows - 1, rows[1]) - r0 + 1;
  const C = Math.min(SHELL.cols - 1, cols[1]) - c0 + 1;
  const pos = mesh.geometry.attributes.position.array;
  const uv = mesh.geometry.attributes.uv.array;
  const QR = R - 1, QC = C - 1;
  const cosL = Math.cos((LINE * Math.PI) / 180);
  const PT = (i, j) => (i * C + j) * 3;

  const fn = new Float64Array(QR * QC * 6);
  const face = (o, a, b, c) => {
    const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
    const vx = pos[c] - pos[a], vy = pos[c + 1] - pos[a + 1], vz = pos[c + 2] - pos[a + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    fn[o] = nx / L; fn[o + 1] = ny / L; fn[o + 2] = nz / L;
  };
  for (let i = 0; i < QR; i++) {
    for (let j = 0; j < QC; j++) {
      const o = (i * QC + j) * 6;
      face(o, PT(i, j), PT(i + 1, j), PT(i, j + 1));
      face(o + 3, PT(i, j + 1), PT(i + 1, j), PT(i + 1, j + 1));
    }
  }
  const cosOf = (a, b) => fn[a] * fn[b] + fn[a + 1] * fn[b + 1] + fn[a + 2] * fn[b + 2];

  const vn = new Float64Array(R * C * 18);
  const slot = new Int32Array(6);
  const par = new Int32Array(6);
  const find = (x) => { while (par[x] !== x) x = par[x] = par[par[x]]; return x; };
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const q = (a, b, t) => (a >= 0 && a < QR && b >= 0 && b < QC ? (a * QC + b) * 6 + t * 3 : -1);
      slot[0] = q(i - 1, j - 1, 1); slot[1] = q(i, j - 1, 0); slot[2] = q(i, j - 1, 1);
      slot[3] = q(i, j, 0); slot[4] = q(i - 1, j, 1); slot[5] = q(i - 1, j, 0);
      const hr = onLine(HARDR, r0 + i, c0 + j), hc = onLine(HARDC, c0 + j, r0 + i);
      for (let k = 0; k < 6; k++) par[k] = k;
      const join = (a, b, hard) => {
        if (slot[a] < 0 || slot[b] < 0) return;
        if (hard && cosOf(slot[a], slot[b]) < cosL) return;
        const ra = find(a), rb = find(b);
        if (ra !== rb) par[ra] = rb;
      };
      join(0, 1, hr); join(1, 2, false); join(2, 3, hc);
      join(3, 4, hr); join(4, 5, false); join(5, 0, hc);
      for (let k = 0; k < 6; k++) {
        if (slot[k] < 0) continue;
        let sx = 0, sy = 0, sz = 0;
        const rk = find(k);
        for (let l = 0; l < 6; l++) {
          if (slot[l] < 0 || find(l) !== rk) continue;
          sx += fn[slot[l]]; sy += fn[slot[l] + 1]; sz += fn[slot[l] + 2];
        }
        const L = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        const o = ((i * C + j) * 6 + k) * 3;
        vn[o] = sx / L; vn[o + 1] = sy / L; vn[o + 2] = sz / L;
      }
    }
  }

  const nt = QR * QC * 2;
  const op = new Float32Array(nt * 9), on = new Float32Array(nt * 9), ou = new Float32Array(nt * 6);
  let w = 0, wu = 0;
  const put = (i, j, k) => {
    const p = PT(i, j), o = ((i * C + j) * 6 + k) * 3, t = (i * C + j) * 2;
    op[w] = pos[p]; op[w + 1] = pos[p + 1]; op[w + 2] = pos[p + 2];
    on[w] = vn[o]; on[w + 1] = vn[o + 1]; on[w + 2] = vn[o + 2];
    ou[wu] = uv[t]; ou[wu + 1] = uv[t + 1];
    w += 3; wu += 2;
  };
  for (let i = 0; i < QR; i++) {
    for (let j = 0; j < QC; j++) {
      put(i, j, 3); put(i + 1, j, 5); put(i, j + 1, 1);
      put(i, j + 1, 2); put(i + 1, j, 4); put(i + 1, j + 1, 0);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(op, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(on, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(ou, 2));
  mesh.geometry = geo;
  return mesh;
}

const panel = (rows, cols) =>
  lib.shell(creaseLines(lib.loftMesh(SHELL, M.paint, { rows, cols }), rows, cols));

/* End cap taken off the master grid's own edge ring, so the nose and Kamm
   faces close against the subdivided panels exactly. */
function capOf(rowIdx, dx, mat) {
  const r = [];
  for (let b = 0; b < SHELL.cols; b++) {
    const k = (rowIdx * SHELL.cols + b) * 3;
    r.push([SHELL.pts[k], SHELL.pts[k + 1], SHELL.pts[k + 2]]);
  }
  const g = new THREE.Group();
  for (const m of endCap(r, dx, mat)) g.add(lib.shell(lib.crease(m, 34)));
  return g;
}

/* ── The light bands, drawn to their own apertures ──────────────────────
   Both bands were boxes, and a box does not fit a lofted hole. The front one
   was 0.86 wide against an aperture that has narrowed to 0.29 half-width by
   the band's own top edge, so its upper corners stood 144 mm outside the
   nose; the rear one stood 55 mm outside the Kamm face at the top. Each band
   now follows the aperture: its top edge is the loft outline inset by 8 mm,
   read off surfaceY at the end ring, held flat across the middle and allowed
   to fall at the ends, and its lower edge parallels it. That is also simply a
   better light: a band that arcs with the nose reads as designed where a
   rectangle reads as applied. */
function bandSections(x, hzMax, flatTop, depth, inset, xb, xf) {
  const secs = [];
  const N = 11;
  const at = (hz, end) => {
    const top = Math.min(flatTop, surfaceY(x, Math.abs(hz)) - inset);
    const bot = top - depth;
    const s = end ? 0.05 : 1;
    const mid = (top + bot) / 2;
    const t = mid + (top - mid) * s, b = mid + (bot - mid) * s;
    const xa = end ? (xb + xf) / 2 - 0.001 : xb, xz = end ? (xb + xf) / 2 + 0.001 : xf;
    return [[xa, b, hz], [xz, b, hz], [xz, t, hz], [xa, t, hz]];
  };
  secs.push(at(-hzMax - 0.008, true));
  for (let i = 0; i <= N; i++) secs.push(at(-hzMax + (2 * hzMax * i) / N, false));
  secs.push(at(hzMax + 0.008, true));
  return secs;
}

/* The marque: a chevron extruded with a beveled rim. A decal has no edge for
   a softbox to find, which is the whole reason this is geometry. */
const CHEVRON = [
  [-0.042, 0.000], [-0.016, -0.018], [0.000, -0.006], [0.016, -0.018],
  [0.042, 0.000], [0.016, 0.018], [0.000, 0.006], [-0.016, 0.018],
];

export function build() {
  const sys = new THREE.Group();
  buildStructure(sys);
  buildShell(sys);
  return sys;
}

/* ── the invariant structure, body.js's coordinates to the millimeter with
   every block chamfered. Not one position, extent or rotation moved: a
   megacasting that reads as a stack of untouched boxes is a first draft of a
   casting, and 44 triangles a box against 12 is the cheapest fix on the car.
   The cage is already tube geometry and is left alone. ── */
function buildStructure(sys) {
  const fc = lib.part('front-casting', [0.85, -0.35, 0]);
  for (const s of [-1, 1]) {
    fc.add(acbox(0.51, 0.28, 0.24, 0.012, M.castAlu, 1.805, 0.44, s * 0.475));
    fc.add(acbox(0.20, 0.16, 0.15, 0.010, M.castAlu, 1.65, 0.66, s * 0.535));
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
  fc.add(acbox(0.07, 0.07, 0.68, 0.010, M.castAlu, 2.035, 0.335, 0));
  sys.add(fc);

  const rc = lib.part('rear-casting', [-0.85, -0.35, 0]);
  for (const s of [-1, 1]) {
    rc.add(acbox(0.45, 0.28, 0.24, 0.012, M.castAlu, -1.825, 0.44, s * 0.475));
    rc.add(acbox(0.18, 0.16, 0.15, 0.010, M.castAlu, -1.70, 0.66, s * 0.535));
    const rib = lib.fins(0.40, 0.045, 0.20, 4, 0.012, M.castAlu);
    rib.position.set(-1.825, 0.60, s * 0.475);
    rc.add(rib);
    rc.add(acbox(0.17, 0.09, 0.09, 0.008, M.alu, -2.145, 0.55, s * 0.42));
  }
  rc.add(acbox(0.23, 0.28, 0.68, 0.014, M.castAlu, -1.935, 0.44, 0));
  rc.add(acbox(0.06, 0.10, 1.25, 0.008, M.alu, -2.25, 0.55, 0));
  sys.add(rc);

  /* The beam is CURVED IN PLAN, which is what the part has claimed since
     body.js and what no body on the ladder ever drew. Straight at 1.30 m
     across x 2.24 its outboard corner reached |z| 0.650 where this nose is
     0.596 half-width, so 42 mm of polished bumper beam stood through the
     paint and read as a defect from any front three-quarter view. body-8
     carries the same condition at 15 mm and documents it rather than fixing
     it. Same span, same 90 by 90 section, same rail pickups at |z| 0.42: the
     ends now sweep back to x 2.16, where the loft has opened to 0.709 at the
     beam's own height.

     THE CLEARANCE IS 9 mm, NOT THE 46 A FIRST PASS WROTE HERE. Swept vertex
     by vertex against halfWidth, every beam vertex forward of x 2.10 sits
     between 9.0 and 283.2 mm inside the loft, and the tightest point is the
     outboard top corner of the swept end at (2.191, 0.592, 0.652). Nine
     millimeters is enough, and an axial raster of the nose face finds no ray
     that reaches the beam, but it is a ninth of what the comment claimed and
     a beam this close is worth knowing about before anyone thickens it. */
  const rails = lib.part('crash-rails', [0.95, -0.05, 0]);
  const BEND = Math.atan2(0.08, 0.23);
  for (const s of [-1, 1]) {
    rails.add(acbox(0.54, 0.09, 0.09, 0.010, M.alu, 1.97, 0.55, s * 0.55));
    rails.add(acbox(0.02, 0.15, 0.12, 0.005, M.alu, 1.71, 0.55, s * 0.535));
    rails.add(acbox(0.06, 0.10, Math.hypot(0.08, 0.23), 0.008, M.alu,
                    2.20, 0.55, s * 0.535, 0, 0, -s * BEND));
  }
  rails.add(acbox(0.06, 0.10, 0.84, 0.008, M.alu, 2.24, 0.55, 0));
  sys.add(rails);

  const rockL = lib.part('rockers', [0, -0.5, 0.3]);
  rockL.add(acbox(2.02, 0.10, 0.07, 0.008, M.paintDark, 0, 0.37, 0.88));
  sys.add(rockL);
  sys.add(mirrorZ(rockL));

  const cageSide = lib.part('pillars', [0, 0.32, 0]);
  const members = [
    [[0.85, 0.95, 0.72], [0.35, 1.40, 0.615]],
    [[0.35, 1.40, 0.615], [-0.55, 1.42, 0.615]],
    [[0.02, 0.44, 0.90], [0.02, 0.92, 0.895], [0.02, 1.40, 0.62]],
    [[-0.55, 1.42, 0.615], [-1.45, 1.00, 0.70], [-1.72, 0.82, 0.76]],
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

/* ── the lower valance, its aperture and its duct ───────────────────────
   THE DEFECT. intake-gates has claimed since Gen 2 that it meters "the only
   air admitted through the body", and there was nothing to meter. The slat
   bank stood at x 2.335 with the fascia 247 mm behind it at 2.088, so the
   bank hung in the air over the splitter and its 168 vertices touched no
   panel at all. The valance itself was a flat 16 mm plate that stopped 26 mm
   short of the loft's own bottom edge.

   The fascia is now the surface it should always have been: a twisted band
   from the splitter's top shelf up to the loft's lower edge, meeting the
   nose cap's bottom chord exactly at (2.375, 0.420, +-0.500) and following
   the col-0 curve outboard from there to (2.161, 0.358, +-0.640) so no view
   from ahead sees the front megacasting through the gap. It lands on the lip
   at x 2.300, which leaves 65 mm of splitter proud of it: the lip was drawn
   to x 2.365 and the old flat valance made it look like a plate glued to
   nothing.

   THE HOLE is real and it is sized by the bank that covers it, 720 by 160 mm
   at y 0.200 to 0.360. Every edge of it sits inside the slat bank, so from
   straight ahead the gates still read shut and what shows in the gaps is the
   lattice behind and thermal-6's coil face, whose forwardmost vertex is at
   x 2.257. The duct rim carries back to a mouth at 2.263, 6 mm ahead of it,
   and rises 40 mm on the way because a duct whose exit sits below its heat
   exchanger is just a longer hole: the front rim spans y 0.200 to 0.360 and
   the mouth y 0.240 to 0.400, which brackets thermal-6's coil face where the
   coil is, y 0.2875 to 0.3922 at x 2.2574. */
const VZ = 0.640;                   /* valance half-span */
const VLIP = 0.136;                 /* top face of the splitter lip */
const VTOPY = 0.420, VTOPX = 2.375; /* the nose cap's bottom chord */
function vtop(z) {
  const a = Math.abs(z);
  if (a <= 0.50) return [VTOPX, VTOPY];
  const r = (a - 0.50) / 0.18;
  return [VTOPX - r * 0.275, VTOPY - r * 0.080];
}
function vpt(z, v) {
  const t = vtop(z);
  const bulge = 0.010 * Math.sin(Math.PI * v);
  return [2.300 + v * (t[0] - 2.300) + bulge, VLIP + v * (t[1] - VLIP), z];
}
const AP = { z: 0.360, y0: 0.200, y1: 0.360 };
const VA = (AP.y0 - VLIP) / (VTOPY - VLIP);
const VB = (AP.y1 - VLIP) / (VTOPY - VLIP);
const VSPAN = [-VZ, -0.56, -0.50, -0.44, -0.36, -0.18, 0, 0.18, 0.36, 0.44, 0.50, 0.56, VZ];
const vrow = (v) => VSPAN.map((z) => vpt(z, v));
/* the aperture's own span, so its rim lands on grid lines of its own */
const VAPZ = [-0.36, -0.24, -0.12, 0, 0.12, 0.24, 0.36];

function buildShell(sys) {
  /* ── skin: both flanks fore and aft of the door apertures, the sills, the
     nose deck carrying the hood and its four gaps, the deck band carrying
     the decklid, and the two closed end faces. Every one of them is a slice
     of the master grid, so the surface is body-3's to the last decimal. ── */
  const skin = lib.part('skin', [0, 0.62, 0]);
  skin.add(panel([0, CUT[0]], FL));                       /* front flank */
  skin.add(panel([0, CUT[0]], FR));
  skin.add(panel([CUT[2], RI(LAST)], FL));                /* rear quarter */
  skin.add(panel([CUT[2], RI(LAST)], FR));
  skin.add(panel([CUT[0], CUT[2]], SILLL));               /* sill under the cuts */
  skin.add(panel([CUT[0], CUT[2]], SILLR));
  /* The deck band, re-sliced at its own channels so the two panels that open
     are their own rigid bodies. One call became five and then four, and not a
     vertex moved: every index below is a resolved node of the same grid, and
     the panels that used to be one mesh still share every boundary row and
     column with their new neighbors. What is left in `skin` here is the nose
     fascia ahead of the hood, the two deck shoulder strips beside it, the
     cowl behind it, the fixed deck ahead of the lid, and the two deck strips
     beside the lid. */
  skin.add(panel([0, HOODROWS[0]], UP));                  /* nose fascia band */
  skin.add(panel(HOODROWS, [UP[0], HOODCOLS[0]]));        /* shoulders beside the hood */
  skin.add(panel(HOODROWS, [HOODCOLS[1], UP[1]]));
  skin.add(panel([HOODROWS[1], RI(COWL)], UP));           /* cowl */
  skin.add(panel([RI(DECK), LIDROWS[0]], UP));            /* fixed deck ahead of the lid */
  skin.add(panel(LIDROWS, [UP[0], LIDCOLS[0]]));          /* strips beside the lid */
  skin.add(panel(LIDROWS, [LIDCOLS[1], UP[1]]));
  skin.add(capOf(0, -0.012, M.paint));                    /* nose face */
  skin.add(capOf(RI(LAST), 0.012, M.paint));              /* Kamm face */
  /* The marque, and the only one on the car: a sealed nose carrying a
     full-width light band has nowhere honest to put a second. The Kamm cap
     is a cone from the ring outline to a near-point rather than a plane, so
     the depth is set by the panel and not by taste. Rastered at 2,400 rays
     across the badge's own 87 by 39 mm footprint the cap runs x -2.36623 to
     -2.36408, a 2.2 mm fall, and a 4.0 mm badge with its back face at
     -2.3628 stands 0.57 to 2.72 mm proud everywhere while its back stays
     1.28 to 3.43 mm inside the cap everywhere: no gap under the rim at one
     corner and no z-fight at the other. */
  const mark = lib.badge(CHEVRON, 0.0040, M.alu);
  mark.rotation.y = -Math.PI / 2;
  mark.position.set(-2.3628, 0.700, 0);
  skin.add(mark);
  sys.add(skin);

  /* ── the two deck closures, each its own rigid body under part id `skin`
     because that is what they are made of: the same laminate on the same
     mold, cut at the channel instead of bonded across it. Both keep the
     skin's explode vector so the exploded car reads exactly as it did before
     the split, and both are authored once because a transverse hinge on the
     centerline is its own mirror image. ── */
  const hood = lib.hinge(lib.part('skin', [0, 0.62, 0]), 'hood');
  hood.add(panel(HOODROWS, HOODCOLS));
  sys.add(hood);
  const lid = lib.hinge(lib.part('skin', [0, 0.62, 0]), 'decklid');
  lid.add(panel(LIDROWS, LIDCOLS));
  sys.add(lid);

  /* ── glass canopy band, lofted 8 mm proud of the same stations ── */
  const canopy = lib.part('canopy', [0, 1.05, 0]);
  canopy.add(lib.shell(lib.crease(lib.loft(glassBand, M.glass, false,
    { rowSub: 1, colSub: 1, interp: 'linear' }), 34)));
  sys.add(canopy);

  /* ── light bands closing both faces, each drawn to its own aperture ── */
  const lbF = lib.part('lightbands', [1.15, 0.1, 0]);
  lbF.add(lib.crease(lib.loft(
    bandSections(2.375, 0.430, 0.6375, 0.045, 0.008, 2.361, 2.377), M.lamp, true), 34));
  for (const s of [-1, 1]) {
    /* flash lidar windows over autonomy-4's pucks at (2.33, 0.615, +-0.30);
       the band's own centerline there is y 0.6058, so the window is drawn
       45 mm tall and contains 0.615. It is a CONFORMAL window, so it sits
       1 mm proud of the band's own front face at x 2.377 and not 8: drawn at
       2.379 its front face reached 2.385, ten millimeters ahead of the nose
       ring at 2.375, which made a sensor cover the foremost point on the
       car. */
    lbF.add(acbox(0.012, 0.045, 0.062, 0.003, M.sensor, 2.372, 0.6058, s * 0.30));
  }
  sys.add(lbF);
  const lbR = lib.part('lightbands', [-1.15, 0.1, 0]);
  lbR.add(lib.crease(lib.loft(
    bandSections(-2.375, 0.530, 0.8300, 0.055, 0.010, -2.377, -2.361), M.lampRed, true), 34));
  sys.add(lbR);

  /* ── deployable Kamm spoiler, drawn deployed. The blade followed no part
     of the car: 1.30 m of span at x -2.13 where the deck shoulder is 0.594
     half-width, so 214 mm of it hung off each side into open air. It now
     spans 1.16 m, 14 mm inside that shoulder line, and the struts land on
     the deck through surfaceY instead of near it.

     THE SPOILER TRAVELS WITH THE DECKLID, and that is measured rather than
     styled. Its strut feet sit at y 0.9155 where the lid surface under them
     is surfaceY(-2.110, 0.42) = 0.9405, so each strut passes 24.5 mm through
     the panel, and the two spindle drives rest 2.5 mm above surfaceY(-2.030,
     0.24) = 0.9900. Both stations are inside the lid's own z span, which
     leaves exactly two ways to build it: put four slots in a panel that has
     to seal, or bolt the whole device to the lid and let it lift with it.
     The second is what a 911 does with its engine lid and it is what this
     does, so the group carries the decklid's closure tag rather than a
     closure of its own. It is also why the lid is a 34 kg leaf and not a
     9 kg one. ── */
  const spoiler = lib.hinge(lib.part('kamm-spoiler', [-0.9, 0.55, 0]), 'decklid');
  const BX = -2.130, BSZ = 0.42;
  const deck = surfaceY(BX + 0.02, BSZ);
  const BY = surfaceY(BX, 0.0) + 0.078;
  spoiler.add(lib.shell(acbox(0.20, 0.012, 1.16, 0.003, M.carbon, BX, BY, 0, 0.15)));
  for (const s of [-1, 1]) {
    const sx = BX + 0.02, sz = s * BSZ;
    spoiler.add(acbox(0.016, BY - deck + 0.03, 0.05, 0.004, M.darkSteel,
                      sx, (BY + deck - 0.03) / 2 + 0.005, sz));
    /* the two 48 V spindle drives, seated on the deck they push against */
    const dz = s * 0.24;
    spoiler.add(acbox(0.05, 0.035, 0.06, 0.006, M.plasticLt,
                      BX + 0.10, surfaceY(BX + 0.10, Math.abs(dz)) + 0.020, dz));
  }
  sys.add(spoiler);

  /* ── deployable diffuser flap, drawn deployed at 17.5 degrees: ramp
     hinged at (-1.78, 0.135) rising to (-2.32, 0.30), four fence vanes, a
     hinge tube and twin 48 V drives. Span |z| <= 0.63, which clears
     wheels-6's tire faces at 0.9025 by 272 mm and never approaches the
     in-wheel annulus at r 0.155 to 0.235, |z| 0.72 to 0.80. The strakes take
     their rotation from the ramp's own vector, so they lie on the panel they
     stand on, and each shows the two fixings a fence that eats gravel has to
     have. ── */
  const RZF = Math.atan2(0.17, -0.54);
  const flap = lib.part('diffuser-flap', [-1.0, -0.4, 0]);
  flap.add(lib.shell(acbox(0.56, 0.012, 1.26, 0.003, M.carbon, -2.05, 0.215, 0, RZF)));
  for (const z of [-0.50, -0.19, 0.19, 0.50]) {
    flap.add(acbox(0.50, 0.09, 0.010, 0.003, M.carbon, -2.04, 0.26, z, RZF));
    /* Two per strake, on the ramp's own line. The strake center already lies
       on the panel, so the seat needs no y offset, and the head sits 11 mm
       outboard of the strake plane so its 10.2 mm flange clears the 10 mm
       fin it retains. */
    for (const dx of [-0.17, 0.17]) {
      const f = lib.fastener(0.0042, M.steel, 'hex');
      f.rotation.set(0, 0, RZF, 'ZXY');
      f.position.set(-2.04 + dx * Math.cos(RZF), 0.26 + dx * Math.sin(RZF),
                     z + Math.sign(z) * 0.011);
      flap.add(f);
    }
  }
  const hinge = lib.cyl(0.012, 1.26, M.darkSteel, 14);
  hinge.rotation.x = Math.PI / 2;
  hinge.position.set(-1.78, 0.135, 0);
  flap.add(hinge);
  for (const s of [-1, 1]) {
    flap.add(acbox(0.05, 0.04, 0.06, 0.006, M.plasticLt, -1.86, 0.22, s * 0.30));
  }
  sys.add(flap);

  /* ── active arch louvers, now IN the recesses cut for them above. Seven
     blades a side, four in the aft bay and three in the forward one, the
     count and the 50 mm chord carried. Each blade keeps a set angle, stands
     proud of its cassette frame, and takes its height from the channel's own
     floor at its own station: the pocket tapers with the fender, so a bank
     built to one height walks out of its own recess at the narrow end. Each
     frame is rotated onto the channel line's own direction and seated along
     the surface normal rather than in z alone, because the flank leans in
     both axes and a frame placed as though the floor were a plane buries one
     corner and floats the other. body-8 paid 186 triangles for that.

     A BLADE HAS TO FIT THE POCKET IN THE DIRECTION THE POCKET IS DEEP, which
     is the other half of the same lesson and was still open. A 50 mm chord
     set at 0.45 rad needs 2 x (25 sin a + 5 cos a) = 30.8 mm along the floor
     normal, against a 30 mm pocket, and it was centered 10 mm off the floor
     rather than in the middle of it: swept vertex by vertex against the
     ungrooved surface, 264 of the bank's 3,928 vertices stood BEHIND the
     recessed paint, the worst by 3.7 mm, on all four aft-bay blades and one
     cassette frame. Blade seat and blade angle were then swept together
     against the built surface, because the two banks do not behave alike: a
     50 mm blade runs 50 mm along a flank that is falling away in x, so the
     chord's two ends sit at different depths and the forward bank is 3.7 mm
     tighter than the aft one for the same nominal seat. At 0.36 rad seated
     13 mm off the floor the worst blade corner on either bank is 1.6 mm
     inside the paint and 1.0 mm clear of the floor. The frames moved out one
     millimeter. Nothing is behind the floor and nothing is proud of the
     paint. ── */
  const BLADE = 0.36;
  const louv = lib.part('arch-louvers', [0.4, -0.05, 0.75]);
  const seat = (p, o) => [p.y + o * p.ny, p.z + o * p.nz];
  for (const b of BANKS) {
    const [xa, xb] = b.x, n = b.n;
    for (let i = 0; i < n; i++) {
      const x = xa + 0.032 + i * ((xb - xa - 0.064) / Math.max(1, n - 1));
      const p = pocket(x, b);
      const s = seat(p, 0.013);
      louv.add(acbox(0.050, p.flat * 0.86, 0.010, 0.002, M.plastic,
                     x, s[0], s[1], 0, p.t, BLADE));
    }
    /* the cassette: a plain side frame at the fore end and the 48 V rotary
       actuator housing at the aft end, both lying on the recess floor */
    for (const [x, w] of [[xa + 0.010, 0.014], [xb - 0.016, 0.026]]) {
      const p = pocket(x, b);
      const s = seat(p, 0.013);
      louv.add(acbox(w, p.flat * 0.94, 0.022, 0.003, M.plasticLt, x, s[0], s[1], 0, p.t));
      /* One fixing through each end of the cassette. A louver bank is bolted
         to the liner and is the one place on this surface where a head
         belongs. Seated on the FRAME face and taking the frame's own normal,
         so it lies flat on a tilted face instead of standing on a plane
         behind it. */
      const h = seat(p, 0.024);
      const f = lib.fastener(0.0036, M.steel, 'hex');
      f.rotation.x = Math.PI / 2 + p.t;
      f.position.set(x, h[0], h[1]);
      louv.add(f);
    }
  }
  sys.add(louv);
  sys.add(mirrorZ(louv));

  /* ── sealed venturi underbody: the carried lip, the new fascia and its
     aperture, front and rear carbon closeouts at y 0.10 bridging to the pack
     plane, and the twin-tunnel strakes. Rear closeout ends at the flap hinge
     line x -1.78. ── */
  const floor = lib.part('venturi-floor', [0, -0.55, 0]);
  const lip = lib.plate(0.26, 1.32, 0.016, 0.08, M.carbon);
  lip.position.set(2.235, 0.112, 0);
  floor.add(lib.shell(lip));
  /* Splitter fixings on the 65 mm of shelf the fascia leaves proud. A carbon
     lip working at a 110 mm gap is a strike item: it bolts on, and the heads
     are the evidence that it can be replaced. lib.plate puts its lower face
     at the given y plus half its thickness, so this 16 mm plate at 0.112 runs
     0.120 to 0.136 and the seating face is 0.136, not the 0.128 mid-plane. */
  for (const z of [-0.50, -0.22, 0.22, 0.50]) {
    const f = lib.fastener(0.0040, M.steel, 'hex');
    f.position.set(2.332, 0.136, z);
    floor.add(f);
  }
  /* the fascia, in four panels around the aperture */
  floor.add(lib.shell(lib.crease(lib.loft(
    [vrow(0), vrow(VA * 0.5), vrow(VA)], M.carbon), 34)));
  floor.add(lib.shell(lib.crease(lib.loft(
    [vrow(VB), vrow((VB + 1) / 2), vrow(1)], M.carbon), 34)));
  for (const s of [-1, 1]) {
    floor.add(lib.shell(lib.crease(lib.loft([VA, (VA + VB) / 2, VB].map((v) =>
      [vpt(s * AP.z, v), vpt(s * (AP.z + VZ) / 2, v), vpt(s * VZ, v)]), M.carbon), 34)));
  }
  /* The duct. An aperture with a returned lip still lets daylight through the
     car, so the rim carries all the way back to a mouth 6 mm ahead of
     thermal-6's forwardmost vertex at x 2.2570, rising to y 0.265 because
     that is where the coil face starts. One closed-loop loft, so all four
     walls and their four corners arrive together and the crease breaks every
     one. */
  const rim = (f) => {
    const p = [];
    for (const z of VAPZ) p.push(f(z, VA));
    for (let i = VAPZ.length - 1; i >= 0; i--) p.push(f(VAPZ[i], VB));
    return p;
  };
  floor.add(lib.shell(lib.crease(lib.loft([
    rim((z, v) => vpt(z, v)),
    rim((z, v) => [2.263, v === VA ? 0.240 : 0.400, z]),
  ], M.carbon, true), 34)));
  for (const s of [-1, 1]) {
    floor.add(acbox(0.28, 0.05, 0.012, 0.004, M.carbon, 2.16, 0.19, s * 0.55));
  }
  const closeF = lib.plate(0.78, 1.24, 0.012, 0.04, M.carbon);
  closeF.position.set(1.71, 0.10, 0);
  floor.add(lib.shell(closeF));
  const closeR = lib.plate(0.45, 1.24, 0.012, 0.04, M.carbon);
  closeR.position.set(-1.545, 0.10, 0);
  floor.add(lib.shell(closeR));
  for (const z of [-0.50, -0.21, 0.21, 0.50]) {
    floor.add(acbox(0.44, 0.055, 0.010, 0.003, M.carbon, -1.55, 0.13, z));
  }
  sys.add(floor);

  /* ── intake gates: the four-slat bank, drawn shut, now standing ON the
     fascia over a hole rather than 247 mm in front of a wall. Behind it a
     real bar lattice, set 16 mm behind the fascia skin along its own normal.

     THE LATTICE IS SIZED TO THE DUCT, not to a guess. The aperture is 720 mm
     of z by 165.5 mm of surface run, and the duct behind it is a straight
     tube at |z| 0.360, so a lattice wider than 720 mm pokes through the duct
     wall and a lattice narrower than that leaves a strip of bare duct round
     the mouth: 700 by 150 left 10 mm of it on each side in z and 7.7 mm at
     top and bottom. 716 by 160 clears the duct walls by 2 mm and leaves
     under 3 mm of rim showing anywhere. ── */
  const gates = lib.part('intake-gates', [1.3, -0.08, 0]);
  const RAKE = Math.atan2(vpt(0, 1)[0] - vpt(0, 0)[0], VTOPY - VLIP);
  const mesh = lib.grille(0.716, 0.160, 0.018, M.darkSteel, {
    bars: 26, cross: 5, barW: 0.0045, chamfer: 0.0009,
  });
  mesh.rotation.y = Math.PI / 2;               /* bars across z, depth along +x */
  const back = new THREE.Group();
  back.add(mesh);
  back.rotation.z = -RAKE;
  const vmid = vpt(0, (VA + VB) / 2);
  back.position.set(vmid[0] - 0.016 * Math.cos(RAKE), vmid[1] + 0.016 * Math.sin(RAKE), 0);
  gates.add(back);
  for (let i = 0; i < 4; i++) {
    const v = VA + (VB - VA) * (0.125 + i * 0.25);
    const p = vpt(0, v);
    /* 34 mm slats on a 40 mm pitch: drawn shut they fill 85 percent of their
       own window and the other 15 percent is the lattice and thermal-6's
       coil face behind it. Sized to overlap would have made the bank one
       solid slab, which is a panel and not a shutter. */
    gates.add(acbox(0.012, 0.034, 0.720, 0.0030, M.plastic, p[0] + 0.004, p[1], 0, -RAKE));
  }
  for (const s of [-1, 1]) {
    const p = vpt(s * 0.368, (VA + VB) / 2);
    gates.add(acbox(0.018, 0.176, 0.016, 0.004, M.plastic, p[0] + 0.004, p[1], p[2], -RAKE));
  }
  /* The bank's 48 V rotary actuator, outboard of the aperture on the fascia
     it drives through. It was a 46 mm block laid along X with no rake, sitting
     8 mm proud at v 0.73, which put its front face at x 2.3929: 18 mm AHEAD
     of the nose ring at 2.375 and 31 mm proud of the fascia, so the
     forwardmost point on a car claiming a sealed nose was a plastic housing
     in the stagnation region. It now lies on the fascia's own rake with
     22 mm of it proud and 2 mm buried, front face x 2.369, and the nose face
     is the front of the car again. */
  const pa = vpt(0.412, (VA + VB) / 2);
  gates.add(acbox(0.024, 0.046, 0.034, 0.005, M.plasticLt,
                  pa[0] + 0.010, pa[1], pa[2], -RAKE));
  sys.add(gates);

  /* ── flush doors. The skins ARE the master surface between two shutlines
     now, which is what this part's text has claimed for three generations
     and what the geometry finally does: the old skins were 13 mm boxes
     standing 26 mm proud of the flank they were meant to be flush with, and
     246 of their 288 vertices were outside the loft. Each door carries the
     far wall and lip of the cut in front of it and the near lip, wall and
     floor of the cut behind it, so every channel is closed.

     The capacitive strips are 8 mm boxes with their inner face ON the
     measured surface at y 0.880, just under the beltline, so they stand 8 mm
     proud at the center and 9.0 mm at the worst corner, where the flank falls
     away across their own 140 mm.

     The camera pods are on the A-pillar sail at x 0.850, 70 mm forward of the
     front cut, where the flank measures |z| 0.8045 and a 90 mm stalk lands
     the pod's outer face at |z| 0.9225. The old pods sat at 0.9790, so the
     pod comes IN 56.5 mm: the stalk length the panel claims is now true and
     the silhouette does not grow to pay for it.

     ONE PART GROUP PER LEAF, which is a regrouping and not a redraw. The two
     skins and the two capacitive strips are the meshes this module already
     built at the coordinates it already built them at; what changed is which
     group owns them, because a closure is a rigid body and a rigid body
     cannot be a slice of a larger group. All three groups keep the part id
     `doors`, so they stay one clickable part with one panel and one explode
     vector, and the exploded car reads exactly as it did before the split.
     Each strip goes with the leaf it is the latch sensor for: x 0.140 is
     inside the front skin's x 0.019 to 0.779, x -0.860 inside the rear
     skin's -1.001 to 0.019.

     THE CAMERA PODS DO NOT TRAVEL, and this body is the reason. They stand
     at x 0.850, which is 71 mm FORWARD of the front cut at 0.779, on the
     A-pillar sail. On a swing-door car the mirror is on the door because the
     door is what the mirror's field of view has to follow; on a car whose
     doors translate aft there is nothing to follow and a pod on a sliding
     panel would drag its own harness 760 mm every time somebody gets in. The
     pods are therefore on the fixed sail in a third, untagged group. There
     is no door glass to travel either: the daylight opening over these doors
     is the bonded canopy band, which is structure and does not move. ── */
  const pods = lib.part('doors', [0.08, 0, 0.85]);
  const leaf = (id, rows, sx) => {
    const g = lib.hinge(lib.part('doors', [0.08, 0, 0.85]), id);
    g.add(panel(rows, DOORBAND));
    g.add(acbox(0.140, 0.024, 0.008, 0.003, M.alu, sx, 0.880,
                halfWidth(sx, 0.880) + 0.004));
    /* THE SURROUND CAMERA IS THIS BODY'S, seated on this body's own surface.
       It used to be autonomy-4's, placed at an absolute |z| that could not be
       right on more than one body: measured, the same coordinate stood 11.70
       mm proud of body-4 and body-6's door skin and 71.5 mm proud of body-7,
       -8 and -9's, so on the flat-flank bodies it floated clear of the panel
       it was bolted to. A module builds once and is shared by five bodies, so
       no coordinate it can write is right for all of them. The body is the
       only module that knows where its own flank is, which is why body-11
       already draws its own and why this one does now. Flush, 2 mm inside the
       skin, so it is a camera rather than a thing standing in the airflow. */
    if (id === 'door-front') {
      const camZ = halfWidth(0.100, 1.000);
      g.add(acbox(0.050, 0.028, 0.020, 0.004, M.sensor, 0.100, 1.000, camZ - 0.002));
      g.add(acbox(0.090, 0.020, 0.012, 0.003, M.alu, 0.060, 1.000, camZ - 0.004));
    }
    return g;
  };
  const PX = 0.850, PY = 1.010;
  const ps = halfWidth(PX, PY);
  pods.add(acbox(0.014, 0.012, 0.090, 0.003, M.plastic, PX, PY, ps + 0.045));
  pods.add(acbox(0.050, 0.028, 0.028, 0.005, M.sensor, PX, PY, ps + 0.104));
  for (const g of [leaf('door-front', [CUT[0], CUT[1]], 0.140),
                   leaf('door-rear', [CUT[1], CUT[2]], -0.860),
                   pods]) {
    sys.add(g);
    sys.add(mirrorZ(g));
  }
}

export const _PROBE = { SHELL, RI, CI, CUT, HOOD, LID, LIDG, GROOVES, DECKSPAN, UP, DOORBAND, SILL, NC, LAST, COWL, DECK, rowOf, surfaceY, halfWidth, colPt, RINGS };
