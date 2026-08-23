/* Body, aero concept: the same two megacastings, rockers, and boron cage
   wearing a low-drag skin. One glass teardrop canopy, a sealed nose with
   active shutters, rear wheel skirts, a boat-tailed plan view, and a Kamm
   cutoff tail. Target Cd 0.17 against the reference shell's 0.21. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';
import { STRUCT_META, buildStructure, abox, profile, mirrorZ } from './body.js';

export const SYSTEM = {
  id: 'body-aero',
  name: 'Body · Aero concept',
  color: 0x9fc0d8,
  explode: [0, 1.7, 0],
  blurb: 'The same skateboard in a slipperier suit: one glass teardrop, skirted rear wheels, a boat-tailed plan, and a Kamm tail chasing Cd 0.17.',
  /* THE CLOSURES. Gen 2 is the optimization pass and the doors are the part
     of it that did not get optimized: two leaves a side on vertical hinges,
     the same arrangement as Gen 1, on a body whose whole argument is that the
     air has been attended to and nothing else has. The curbside figure says
     so, and it is the honest reading of the pair against Gen 1.

     Both axes sit on the paint at each leaf's own widest point rather than
     inside it. body-8 tested the alternative on a body that still had a
     fender step and put its door 36.5 mm through the step, so an inboard
     axis is not something any rung on this ladder gets to use. */
  closures: {
    'door-front': {
      name: 'Front door',
      kind: 'door',
      part: 'doors',
      mass: 19,
      seconds: 1.1,
      seat: 'Hinge pillar at the x 1.1240 cut, axis on the skin at |z| 0.9625',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [1.1240, 0.640, 0.9625], deg: 66 },
      ],
      why: 'A Kammback and a set of active shutters and a solid-state pack, and the door still opens the way the reference car\'s did. That is worth saying plainly rather than hiding: Gen 2 attacked drag and mass and left packaging alone, and packaging is what a door costs. The panel is 1.034 m long and swings 66 degrees, so the arc is what the arc has always been.',
      cost: [
        'It buys nothing over Gen 1 in the one currency a door is charged in. Whatever this rung saved in Wh/mi, the ground it needs beside a parked car is the same ground.',
        'The camera pod at |z| 1.0000 is the widest thing on this car and it is on the fixed A-pillar strip, not on the leaf, so the door swings past it rather than carrying it.',
      ],
    },
    'door-rear': {
      name: 'Rear door',
      kind: 'door',
      part: 'doors',
      mass: 18,
      seconds: 1.1,
      seat: 'B-pillar hinge at the x 0.0799 cut, axis on the skin at |z| 0.9817',
      motion: [
        { kind: 'swing', axis: [0, 1, 0], pivot: [0.0799, 0.640, 0.9817], deg: 66 },
      ],
      why: 'Front-hinged off the B-pillar, the ordinary arrangement, and 0.974 m long against the front leaf\'s 1.034. On this body the two are nearly the same length, so unlike every later rung the two doors want nearly the same room, which is what a cabin drawn before the package was argued about looks like.',
      cost: [
        'The daylight opening on this body is drawn as one pane spanning both doors, so unlike Gen 1 the glass cannot travel with the leaf it belongs to without being cut, and cutting it would move geometry. It stays fixed, which is a drafting artifact rather than a design: on a real car each pane runs in its own door.',
      ],
    },
    hood: {
      name: 'Clamshell hood',
      kind: 'hood',
      part: 'nose',
      mass: 11,
      seconds: 1.3,
      seat: 'Pin on the inner panel\'s aft edge at (1.0420, 0.9284), inside the windshield bond bead at x 1.045',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [1.0420, 0.9284, 0], deg: 55 },
      ],
      why: 'One PIN is exact here, and that is A measurement rather than an assumption. Swept along its own aft edge from the centerline out to |z| 0.7300, this panel holds world y 0.9422 on the outer face and 0.9284 on the back at every vertex, and world x 1.0442 and 1.0420: the line has zero camber. body-9\'s decklid cut falls 220.9 mm from its crown to its outboard ends and cannot use a fixed axis at all without driving its leading edge into the panel behind it. This one is a flat rounded rectangle, 1.28 m by 1.70 m on a 0.12 m corner radius, lying 9.1 degrees nose-down, so a single transverse pin is the whole hinge and there is nothing clever to do.\n\nWhat opens is the whole panel, and the module had to choose. The clamshell carries three grooves, measured off the built surface: a cowl gap whose outer lips sit at x 1.1084, y 0.9320, and two fore-aft gaps at |z| 0.7310 through the flat of it. Read as shutlines, those three draw a conventional hood with bolt-on fender tops. The spec row says one-piece clamshell and the failure note says a parking tap that would have cost one headlamp now costs the whole strip. The geometry sides with the spec row: this is one lofted surface closed by one returned edge, with three channels sunk into it, and a channel is not a separation. So the closure opens the panel that exists and the three grooves ride with it as the reveals they are.\n\nThe axis was put on the drawn cowl gap first, and swept, and moved. Pin it at (1.1084, 0.9320) and the 65 mm of panel behind the pin swings down and forward rather than up, into the cowl bead that bonds the windshield to this very panel. Measured with the checker\'s own triangle predicate, the overlap with body-aero/canopy goes from 4.12 mm at rest to 8.43 mm at 13.8 degrees of travel, 4.31 mm deeper into a 26 by 12 mm run of structural polyurethane, and does not clear until past 18 degrees. On the pin this closure uses, the same pair never once exceeds its resting 4.12 mm and falls to 1.65 mm at full open. Two things had to move to get there: the pin went 65 mm aft along the panel onto its own edge, and then through the thickness onto the back face, so the one point on the panel that never moves is the point the bond bead is wrapped around. That is also where a hood hinge arm bolts on a real car, to the inner panel and not to the paint. Taking it off the mid-thickness costs 2.0 mm of lift and buys the last 0.04 mm of growth the checker could still find.',
      cost: [
        'A one-piece clamshell is the most expensive panel decision on the front of this car. It spans both fender tops, so the outer skin is one 2.16 m2 draw with no relief joint anywhere in it, and damage anywhere on it replaces all of it. That is the same bill the part text books for the light blade, taken a second time on a much larger panel.',
        'It opens onto a full thermal bay and not onto a frunk, and the numbers are the point rather than an apology. Measured along the bay centerline inside |z| 0.30 in 100 mm bands, the clear height under the panel is 271.1 mm at x 1.05 to 1.15 and 280.2 at 1.15 to 1.25, then collapses to 47.0 mm at 1.45 to 1.55, 14.9 at 1.55 to 1.65 and minus 7.2 at 1.75 to 1.85, where hv\'s 12 V battery is already through the panel line. The largest empty box under the whole aperture, with every gen2 partner as the floor, is 84.9 L at x 1.120 to 1.440 and 0.221 m tall, and it is the scuttle. Gen 2 has a hood and no frunk: the skateboard freed the floor, not the nose, and opening the lid is the honest way to show that.',
        'The lid is what makes two standing disagreements visible. thermal/radiator stands 35.5 mm above this panel\'s own back-face plane over 432 vertices, deepest at (2.1950, 0.7790, 0.3850), and thermal/coolant-lines 30.5 mm over 21, deepest at (2.1576, 0.7800, -0.4211); the closure checker scores the same two pairs at 18.66 and 6.51 mm of triangle penetration with the car shut. Neither is a strike, because the growth test only fails a pair that was clear at rest and both of these shrink the moment the panel rises. They are still a radiator through a hood, and they belong to thermal and this body jointly.',
        'At 55 degrees the panel peaks at y 1.8572, which is 393.7 mm over the parked roof at 1.4635. Gen 1 spends 412.4 mm at 52 degrees, so this one opens three degrees further and still stands 18.7 mm lower, and the reason is the lever rather than the hinge: 1.2822 m from this pin to the panel tip. A low garage or a roof box is a real constraint on a hood in a way it never is on a decklid, and neither figure changes that.',
      ],
    },
    /* ONE WARNING SURVIVES ON THIS ONE AND IT IS THE CHECKER'S BOOKKEEPING,
       not the car. tools/closures.js resolves `carries` by pushing a SPREAD
       COPY of the selected instance into the moving set (closures.js line
       324) while `moving` is a Set keyed on object identity, so the ORIGINAL
       autonomy/cameras instance stays in staticParts and the lid sweeps
       through a ghost of the camera it is carrying. Reproduced: at t = 0 the
       copy reads 1.00 mm against its own original, which is what puts the key
       in the baseline map; at 8.8 degrees the deck panel passes through the
       volume the camera vacated and reads 1.95 mm against the ghost, so the
       tool prints 0.9 mm of growth. Gen 1 declares the same carry against the
       same part and does not show it, so it takes a lid whose panel sweeps
       its own camera station to surface this at all.
       Nothing here can fix it: dropping the carry turns 1.95 mm into a real
       STRIKE and a FAIL, which is worse and also wrong. It belongs to
       tools/closures.js. */
    decklid: {
      name: 'Decklid',
      kind: 'decklid',
      part: 'skin',
      mass: 5,
      seconds: 1.3,
      seat: 'Gooseneck pin on the deck\'s own leading gap at (-1.7381, 0.9712), 44 mm inside the panel edge',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [-1.7381, 0.9712, 0], deg: -70 },
      ],
      carries: [{ part: 'autonomy/cameras', box: [-2.30, 0.93, 0, -2.19, 1.00, 0.05] }],
      why: 'The same zero at the other end of the car. Swept along its own leading edge out to |z| 0.6500 the deck panel holds world y 0.9779 on the outer face and 0.9641 on the back, and world x -1.6925 and -1.6946, at every vertex. No camber, one pin again, and what travels is the whole 1.30 by 0.595 m panel, because like the clamshell it is one lofted surface with one returned edge and its three grooves are channels in it rather than separations.\n\nThe PIN is 44 mm inside the panel\'s own leading edge, which is a gooseneck, and it was chosen by sweeping the alternative rather than by drawing it. Put the axis on the panel edge at (-1.6935, 0.9710) and the lid rotates about the line where the deck meets the backlight bond bead: measured, that carries body-aero/canopy 3.72 mm deeper at 50 degrees and never lets go of it. Put it on the leading gap the panel already carries at (-1.7381, 0.9712) and the 44 mm of panel ahead of the pin tucks down under the backlight instead of scrubbing along it: the same pair grows 0.85 mm at most, at 12 degrees, and is clear of the canopy altogether from 23 degrees to full open. That tuck is not a trick, it is what the gooseneck on every sedan decklid does and the reason the shelf under one has a pocket in it. It is also the one place on this panel where the drawing and the kinematics land on the same line.\n\nThe wrap-over does not open, and saying so is the point. The Kamm face carries the other half of a tailgate and it is real geometry: a lower gap measured at y 0.6350 and two side gaps at |z| 0.6935. Joining the two halves into one rigid body is not a regrouping. That face is a single lofted panel holding the lid region, the lamp channel and the fixed lower band inside one grid and one returned edge, so cutting a lid out of it means re-authoring the loft, and a re-authored loft moves vertices, which is a redraw rather than the re-slice a closure is allowed to be. The two apertures could not be made to agree in any case: the deck\'s side gaps land on |z| 0.5980 and the face\'s on 0.6935, 95.5 mm apart per side, and this file\'s own note on the Kamm tail measures why bringing the face\'s gaps in runs them through a lamp channel that reaches 0.6497. The wrap-over is a body-generation fix. What opens on Gen 2 is a decklid.',
      cost: [
        'The wrap-over is drawn and does not open, so the load sill stays at the deck\'s own aft edge, measured at y 0.8859, instead of dropping to the tailgate\'s lower gap at 0.6350. Every case that goes in goes over a 250.9 mm lip, and deleting that lip is the whole reason a Kamm tail over a skateboard floor is worth drawing. This rung draws the answer and does not open it.',
        'There is no load floor under the aperture, and the lid is what exposes that. Measured in 100 mm bands inside |z| 0.598, what is under this panel is the tail panel\'s inner face at y 0.8165 from x -2.280 to -2.180, then nothing at all from -2.180 to -2.080 where the model is open to the underbody, then body-aero\'s own rear casting at 0.6225 from -2.080 to -1.980 and 0.7400 from -1.880 to -1.780. The largest empty box under the aperture measures 223.2 L only because its floor is the diffuser at y 0.2275. A trunk pan is a part no rung on this ladder has drawn, and 223 L is not a load space, it is a hole.',
        'The reversing camera travels with the lid because on any real car it is bolted through it, and the sweep says so in millimeters: left on the static car it is struck 1.95 mm at 8.8 degrees by the panel it sits on. autonomy/cameras is at x -2.2590 to -2.2300 on the centerline, standing 94.6 mm above this panel\'s back-face plane over 100 vertices, which is 80.8 mm proud of the paint. It floats, and the float is autonomy\'s to fix. What this declaration fixes is ownership, which is the lesson this whole pass keeps re-learning: a static model cannot tell you which body a part is bolted to, and only motion can.',
        'It is the cheapest closure on the car and the contrast is the point. Zero lateral, because a rotation about z moves no vertex in z. Zero fore and aft: the aft edge swings to x -2.2943 at 9 degrees, 57 mm short of the parked tail at -2.3513. And zero overhead, because at full open the panel peaks at y 1.4583 against a parked roof at 1.4635. Seventy degrees of decklid costs nothing the world outside the car can charge for. The front door on the same body needs 907.1 mm of ground beside it.',
      ],
    },
  },
  parts: {
    ...STRUCT_META,
    canopy: {
      name: 'Teardrop canopy',
      tagline: 'One unbroken glass surface from cowl to tail: the flow never finds an edge.',
      mass: 42,
      specs: [
        ['Glazing', 'Cell-cast laminated, 3 facets, one bond'],
        ['Stack', '2.1 mm + acoustic PVB + 1.6 mm'],
        ['IR coating', 'Sputtered silver stack, 20% TSET'],
        ['Peak height', '1.38 m at x = 0.15'],
        ['Windshield rake', '63 degrees from vertical'],
        ['Bond run', '11 m structural PU'],
      ],
      how: 'The canopy is windshield, roof, and backlight fused into a single glazed surface: it rises in one line from the cowl at 0.92 m to a peak of 1.38 m just aft of the front seats, then falls away as a fastback all the way to the deck. Cell-cast lamination is what makes the shape buildable: each ply is sagged over a precision mold at 620 degrees C, so the three facets meet at radii large enough that the boundary layer never separates crossing them. A sputtered silver IR stack keeps total solar transmittance near 20 percent, the price of admission for a cabin under this much glass.\n\nAerodynamically the value is the absence of junctions. On a conventional car the flow crosses a cowl step, a windshield header, a roof panel gap, and a backlight trim strip, and every one of those trips the boundary layer a little. Here the air attaches at the cowl and stays attached past the peak and down the fastback, because the tumblehome and the falling roofline together keep the local pressure gradient mild. Attached flow over the whole upper body is worth roughly 15 counts against the reference shell before any other device is counted.',
      why: 'Drag is separation, and separation starts at edges. Paying for one large complex glazing instead of three simple ones buys a top surface with no edges at all, and the same single bond line that seals it also carries shear into the cage the way the reference roof and screen already did separately.',
      fail: [
        'One stone chip anywhere condemns the whole canopy; the replacement is the most expensive single panel on the car and needs ADAS recalibration afterward.',
        'A surface this large moves millimeters with thermal expansion; the PU bond is sized for the shear, but a dry spot in the bead shows up as a creak, then a leak.',
        'The fast rake stretches the optical path: the camera zone above the mirror is held to optical tolerance, and even so night-time double imaging is the honest limit of a 63 degree screen.',
      ],
      explode: [0, 0.9, 0],
    },
    skin: {
      name: 'Monoform body sides',
      tagline: 'Nose to tail in one visual motion, because taper, not smoothness, is what kills drag.',
      mass: 46,
      specs: [
        ['Panels', 'AA6016 outer, 0.9 mm, bonded'],
        ['Plan taper', '3 to 8 degrees aft of the doors'],
        ['Front arch', '430 mm radius, open'],
        ['Drag budget', 'Wheels ~25%, wake ~30% of total'],
        ['Surface waviness', '< 0.15 mm over 300 mm'],
      ],
      how: 'Ask where drag actually lives on a modern car and the answer is unglamorous: roughly a quarter is the wheels and their open arches, a third is the base wake behind the tail, the underbody and cooling flows take most of the rest, and the smooth painted surfaces people point at contribute almost nothing. A mirror-finish panel and a merely good one differ by a count or two; a wake that is 10 percent smaller is worth twenty. So the skin is shaped for one job: hand the flow to the tail with as little frontal area still moving as possible.\n\nThat is why the body sides pull inboard aft of the doors. The quarter panels rotate 4 to 8 degrees in plan, boat-tailing the body so the air converges gently instead of being dumped at full width. Convergence recompresses the flow, raising static pressure on the rearward-facing surfaces, and that pressure literally pushes the car forward, recovering part of what the nose paid. The front arches stay open at 430 mm radius because the wheels steer; everything aft of the B-pillar tapers.',
      why: 'Smooth is table stakes; taper is the design. A perfectly polished brick still carries a full-width wake. The monoform side exists to make the plan view a teardrop, and every crease on it is longitudinal so the converging flow is guided, never crossed.',
      fail: [
        'Boat-tailing narrows the trunk aperture and the rear track of usable cabin; the taper angle is a negotiation with the luggage test, and 8 degrees is where luggage lost.',
        'A parking scrape on a tapered quarter reads from ten meters because the highlight line runs the whole car; repairs must be blended over the full panel.',
        'Bonded skin cannot be slide-hammered; paintless dent repair or panel replacement are the only menu items.',
      ],
      explode: [0, 0.1, 0.65],
    },
    nose: {
      name: 'Clamshell nose',
      tagline: 'No grille, one light blade, and a stagnation line placed exactly where the rules allow.',
      mass: 15,
      specs: [
        ['Panel', 'One-piece clamshell, AA6016'],
        ['Grille', 'None; sealed face'],
        ['Light blade', 'Full-width matrix LED strip'],
        ['Stagnation line', 'y = 0.50 m on the sealed face'],
        ['Head clearance', '70 mm to hard points'],
      ],
      how: 'Every body of revolution in a flow has a stagnation point where the air divides, and everything about a nose follows from where you put it. Here the sealed face places the stagnation line low, at about half a meter, so most of the oncoming air goes over the top along one unbroken line from the tip at 0.72 m to the cowl. High-energy air hugging the clamshell feeds the canopy attached; the smaller share below is metered through the shutter bank or ducted into the air curtains, thin jets that sheet across the front wheel faces and close the arch turbulence off from the body side.\n\nAn EV needs a fraction of a combustion car\'s cooling air, which is what makes the grilleless face honest rather than styling. The counterweight is pedestrian protection: the rules score head impact by deceleration, and lowering a nose steals the crush depth under the skin. This nose is legal because the frunk tub and casting edges sit 70 mm down and the clamshell inner is a cone-waffle field that buckles at a tuned force. The light blade spans the full width at the tip, a single sealed strip, because two conventional lamp housings would each carve a trench through the cleanest air on the car.',
      why: 'The nose sets the terms for every surface behind it. A low stagnation line and a sealed face cost nothing an EV needed anyway, and they hand the canopy the one thing it cannot make for itself: attached flow with all its energy still in it.',
      fail: [
        'A sealed nose has no ram-air reserve: if the shutter bank jams shut on a mountain climb, the thermal system must shed load, and the car tells the driver why power just tapered.',
        'The full-width blade is one part; a parking tap that would have cost one headlamp now costs the whole strip.',
        'Pedestrian compliance caps how low this nose can go; the concept sits 20 mm above the aero optimum, and that is the rulebook, not timidity.',
      ],
      explode: [1.05, 0.12, 0],
    },
    shutters: {
      name: 'Active grille shutters',
      tagline: 'Cooling drag on demand: closed at speed, open when the battery asks.',
      mass: 2,
      specs: [
        ['Slats', '5, glass-filled PP, one actuator'],
        ['Closed overlap', '5.1 mm blade to blade on a 47 mm pitch'],
        ['Cd swing', '~0.010 open to closed'],
        ['Closed fraction', '> 85% of highway time'],
        ['Response', 'Full travel in 1.5 s'],
        ['Failure position', 'Spring fails open'],
      ],
      how: 'Air that goes through a car is drag you chose: it stagnates on the radiator, tumbles through the bay, and exits with its momentum spent. That loss is worth about 0.010 of Cd, a full percent of highway range, and an EV only needs the cooling flow during fast charging, hill climbs, and hot-day loads. So the only intake on the sealed nose carries a bank of five slats on a single actuator: closed, the nose is aerodynamically solid; open, the thermal loop gets its full airflow within two seconds.\n\nThe control logic is a standing negotiation between the aero controller and the thermal controller, and thermal always wins. Coolant temperature, predicted load from the navigation profile, and charger handshakes all bid for position; the aero case is only granted when every thermal margin is green. The mechanism spring-loads to open: a stuck-open shutter costs a count of drag, a stuck-closed one cooks a battery mid-charge, so the failure geometry encodes the priority. Cooling beats drag every time they argue.',
      why: 'A fixed intake must be sized for the worst hour of the car\'s life and then pays for it every other hour. A shutter sizes the intake per minute instead. It is the cheapest 0.01 of Cd on the car: one actuator, five slats, and software.',
      fail: [
        'Road grit and ice jam slat pivots; the actuator runs a self-test sweep at every cold start and reports a stiff bank before it matters.',
        'Fail-open is safe but not free: a broken return spring quietly costs a percent of range until the fault is read.',
        'Slats sit in the stone-strike zone; glass-filled PP survives gravel that would crack a brittle vane, and the bank is a single cheap cartridge by design.',
      ],
      explode: [1.3, -0.08, 0],
    },
    splitter: {
      name: 'Splitter and air curtains',
      tagline: 'The front axle wants to fly; the splitter sells lift back for almost no drag.',
      mass: 5,
      specs: [
        ['Lip', 'Carbon composite, 18 mm section'],
        ['Overhang', '60 mm ahead of the fascia'],
        ['Front lift', 'Cl,f near zero at 130 km/h'],
        ['Curtain ducts', '2, exit across wheel faces'],
        ['Ground clearance', '135 mm static'],
      ],
      how: 'A smooth nose is a wing whether you meant it or not: air accelerating over the clamshell drops the pressure above, air packing under the nose raises it below, and the difference is lift on the axle that steers. The splitter attacks the underside term. Its lip forces the stagnation region above the plate, so high pressure pushes down on the lip while only slow, thin flow is admitted underneath. The recovered downforce arrives almost free because the lip adds frontal area measured in millimeters.\n\nThe tradeoff is the whole story. More splitter means more front grip and more stability in crosswinds, but past the optimum the plate starts working as a bluff face and drag climbs faster than lift falls. This car runs the lip at the drag-neutral point, targeting zero front lift at highway speed rather than racetrack downforce. The two air-curtain ducts share the same real estate: they swallow the messy stagnation-zone air and sheet it flat across the front wheel faces, tidying the one region the open arches cannot.',
      why: 'Steering feel at speed is a pressure distribution, not a suspension setting. A front axle at zero lift keeps its alignment loads and its driver confidence at 130 km/h, and a splitter buys that for less drag than any other device on the menu.',
      fail: [
        'Curbs and parking-garage ramps are the design load case; the lip mounts on shear-away fasteners so a strike costs a bracket, not the fascia.',
        'A splitter tuned at 135 mm ride height is mistuned at any other; the aero map assumes the suspension holds its speed-dependent height.',
        'Snow packed into the curtain ducts turns them into plain drag holes until it melts.',
      ],
      explode: [1.0, -0.35, 0],
    },
    diffuser: {
      name: 'Rear diffuser',
      tagline: 'The flat floor does the work; the diffuser lets the underbody exhale slowly.',
      mass: 7,
      specs: [
        ['Ramp angle', '13 degrees, 4 vanes'],
        ['Start', 'x = -1.63, clear of the pack'],
        ['Vanes', '90 mm deep, below the floor, x -1.852 aft'],
        ['Exit height', '0.42 m at the Kamm face'],
        ['Underbody', 'Sealed flat floor ahead of it'],
        ['Material', 'Carbon-look composite, bolted'],
      ],
      how: 'Air under the flat floor travels fast, which means low pressure, which is fine until it has to rejoin the wake at the tail. Dump it out at full speed and the mismatch feeds the base wake; that is drag. The diffuser is a controlled deceleration: the floor sweeps up at 13 degrees over the last 0.7 m, the duct area grows, the flow slows, and by Bernoulli its static pressure recovers toward ambient before it meets the wake. Recovered pressure acting on an upswept surface has a forward component, so a working diffuser reduces drag and adds rear downforce at the same time, one of the few free lunches in aerodynamics.\n\nThe four vanes keep the expansion honest. A 13 degree ramp is near the separation limit, and air pulled in from the sides would stall it; the vanes fence the flow into straight channels so the expansion stays two-dimensional. None of this worked on combustion cars, whose underbodies were a canyon of exhausts and tunnels. The EV skateboard is the enabler: the battery pack gives a floor that is already flat, sealed, and structural from axle to axle, so the diffuser inherits clean, fast flow instead of manufacturing it.',
      why: 'The underbody is the largest single surface on the car and the flat pack floor made it usable. Finishing that surface with a diffuser is what turns the floor from neutral into an aero device: the reference car leaves those counts on the table.\n\nThe vanes were on the wrong side of the floor until the cross-module sweep found them, and the failure note below has been claiming the opposite since Gen 2. All six fences were seated in world +y from the floor centerline rather than along the floor\'s own outward-down normal, and this ramp is rotated 157 degrees, so world +y is into the car: measured off the built mesh they spanned y 0.157 to 0.523 against a floor that tops out at 0.425, and their forward ends ran through suspension\'s rear subframe at 128.4 mm. A vane inside the underbody is not a vane, it is 7 kg of carbon fencing nothing, and the ramp it was supposed to keep attached was running unfenced at 13 degrees. Seated on the normal they now span y 0.144 to 0.404, entirely inside the floor\'s own y range, so the diffuser\'s lowest point is still the floor\'s leading lip and the built silhouette is unchanged to the sixth decimal.',
      fail: [
        'Ramp angle is everything: add two degrees and the diffuser stalls, the wake fattens, and drag rises above the no-diffuser case.',
        'The vanes are not the lowest rear point on the car and this note said they were for nine rungs: measured off the built mesh their lower edge is y 0.1444 and the ramp floor\'s own leading lip is y 0.1347, so the floor reaches 9.7 mm lower than the fences bolted under it, and aft of x -1.30 the tire contact patch, the rim and the wheel cover are all lower again. What is true is that they are the lowest thing a steep driveway meets before the floor does, because they sit 202 mm aft of the lip, so they are still sacrificial bolt-ons and they still go first.',
        'Vane depth is set by ground clearance rather than by aerodynamics: 90 mm is what fits under a ramp that begins 135 mm off the road, and it is why they start at x -1.852 instead of at the ramp leading edge.',
        'A trailer hitch sits exactly where the ramp wants to be; towing and this diffuser are mutually exclusive by geometry.',
      ],
      explode: [-0.9, -0.35, 0],
    },
    skirts: {
      name: 'Rear wheel skirts',
      tagline: 'The oldest trick in the book: a flat panel worth a full point of drag.',
      mass: 6,
      count: 2,
      specs: [
        ['Cd saving', '~0.010 for the pair'],
        ['Mounting line', '5 mm reveal, 3.5 mm deep, four edges'],
        ['Material', 'AA5182, 0.8 mm, bonded stiffener'],
        ['Attachment', 'Two cam latches, tool-free'],
        ['Service time', '20 s to remove per side'],
      ],
      how: 'A rotating wheel in an open arch is an air pump with no purpose: the tire drags the boundary layer around, flings it out of the arch gap, and the resulting spray of turbulence runs down the body side ruining the taper the quarter panels paid for. Covering the opening with a flush panel simply removes the pump from the flow. The number has been stable since streamliners in the 1930s and lab cars like the EV1: about 0.010 of Cd for a pair of rear skirts, which on this car is two to three percent of highway consumption.\n\nThe reason every car does not do this is the front axle: steered wheels sweep through more than 60 degrees of arc and lean with the suspension, so a front skirt would need to stand a hand-width off the body, which costs more than the open arch. Rear wheels only travel vertically, which is what lets a skirt sit within millimeters of the tire instead of standing off it. Serviceability is the other historical objection, answered here with two cam latches per side: a tire change starts with a twenty-second, tool-free panel drop, and the latch geometry will not close unless the panel is seated flush.',
      why: 'Skirts are the rare aero device with no aero downside: no lift change, no yaw sensitivity, no ride-height dependence. The whole cost is looks and a latch, which is why they mark the honest boundary between cars styled for drag and cars engineered for it.',
      fail: [
        'A curbed rim throws the wheel weights against the skirt; a rattle from the rear arch means the clearance is spent.',
        'Packed snow between tire and skirt can freeze the panel into contact; the latches open outward so it still comes off.',
        'Roadside assistance that has never met a skirt will pry it; the latch markings are cast into the panel for exactly that moment.',
      ],
      explode: [-0.15, 0, 0.8],
    },
    doors: {
      name: 'Flush doors and camera mirrors',
      tagline: 'The shutline you cannot feel and the mirror that is not there.',
      mass: 46,
      count: 4,
      specs: [
        ['Skins', 'Bonded AA6016, hemmed, flush ±0.3 mm'],
        ['Glazing', 'Frameless laminated, 0.5 mm proud'],
        ['Mirrors', 'Camera pods on 90 mm stalks'],
        ['Mirror Cd saving', '~0.008 vs glass mirrors'],
        ['Handles', 'None; capacitive strip, e-latch'],
      ],
      how: 'A door is where four processes meet on one surface, and the air audits the meeting. These skins are bonded and hemmed to ±0.3 mm flushness, the glass stands half a millimeter proud with no frame, and there are no handles at all: a capacitive strip under the skin fires an e-latch, deleting the last protrusion and its little wake. The seals matter as much as the metal. A twin EPDM barrier holds the cabin a few pascals above the outside static so the seal is always energized; let it leak and a flush door still whistles, because a seal gap at 130 km/h is a referee\'s whistle in cross-section.\n\nThe camera pods are the visible regulatory story. A glass door mirror is a brick in the cleanest air on the body, worth about 0.008 of Cd for the pair plus the wind noise your left ear files complaints about. Cameras on slim stalks recover most of that, and the regs, un R46 since 2016 and a slower US rulebook, now permit them with strict fields of view, latency, and failure behavior. The stalks still exist because the rules and physics both want the lens outboard, away from spray, with a sightline down the body.',
      why: 'Doors are where flushness is won or lost: they are the largest movable panels on the car, and every edge of them is a potential trip. Building them as bonded, frameless, handle-less skins is expensive process control, but it is the only way the body side reads as one surface to the flow.',
      fail: [
        'E-latches need a mechanical backup path by law; the hidden cable release is tested at every service because nobody uses it until the day it matters.',
        'A camera failure at speed blanks a mirror you cannot lean to compensate for; the display fails to the wide view and the car nags until it is fixed.',
        'Frameless seals take a compression set over years, and the first symptom of a tired seal is the whistle returning at exactly the speed you drive every day.',
      ],
      explode: [0.08, 0, 0.85],
    },
    tail: {
      name: 'Kamm tail',
      tagline: 'Cut the tail where the flow would have left anyway, and make the cut clean.',
      mass: 5,
      specs: [
        ['Face', 'Vertical, y 0.55 to 0.88 at x = -2.28'],
        ['Theory', 'Kamm truncation of the ideal teardrop'],
        ['Base pressure', 'The last unpaid drag account'],
        ['Lamp', 'Full-width LED blade, inset'],
        ['Ideal tail', '~1 m longer than the law allows'],
      ],
      how: 'The zero-wake body is a teardrop tapering to a point somewhere over a meter behind this bumper, and no parking garage on earth will host it. Wunibald Kamm\'s 1930s insight makes the compromise principled: taper the body only as long as the flow stays attached, then cut it off square, because behind the truncation the wake behaves almost as if the missing tail were still there. The air leaves the sharp edge cleanly, the shear layers converge as the phantom tail would have guided them, and a car a meter shorter keeps most of the long tail\'s drag number.\n\nWhat remains is base drag: the cut face sits in the wake at below-ambient pressure, and that pressure deficit times the face area is a rearward force you pay every kilometer. The design response is to shrink the face and sharpen its edge. The boat-tailed quarters and falling deck have already pulled the perimeter inboard, the face spans only 0.55 to 0.88 m in height, and the edge radius is as tight as paint allows, because a soft edge lets the separation point wander and the wake breathe. The lamp blade is inset flush into the face where the air, having already left, can no longer be offended.',
      why: 'Every production car is a truncated ideal body; the Kamm tail is simply honest about it. Given a length cap set by law, parking, and crash overhang, the highest-value move is to spend the length on taper and end it in one clean vertical shear, which is why the deck stops like a guillotine instead of drooping.',
      fail: [
        'Base suction pulls road film onto the face; the camera above the lamp blade sits in the dirtiest air on the car and washes itself on a schedule.',
        'The sharp edge is pedestrian-checked and hail-vulnerable; it is an applied trim section, replaceable without repainting the quarter.',
        'A roof box or open tailgate destroys the truncation logic entirely; the trip computer\'s range estimate learns this the hard way.',
      ],
      explode: [-1.2, 0.1, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   Silhouette (side view, meters): nose tip (2.30, 0.72) rising in one line
   to the cowl (1.05, 0.92), canopy peak (0.15, 1.38), fastback to
   (-1.70, 0.97), deck to the Kamm face at x -2.28, vertical y 0.55..0.88.
   Plan view: full width 0.94 at the doors, quarters rotate 4..8 degrees
   inboard aft of x -0.9, Kamm face half-width 0.73. Front arches open at
   R 0.43; rear arches skirted flush at |z| ~0.945.

   ── THE AERODYNAMIC SURFACE, AND WHY THIS PASS COULD NOT MOVE IT ──

   This body has no STATIONS table. Its shadow is the union of the panels
   themselves, so the constraint is per-HEIGHT rather than per-panel: what
   matters is the widest |z| at each y, because that is what the frontal
   integral sees. Swept over the built mesh at 5 mm bands, that number is
   owned by seven things and only seven:

     y 0.12 to 0.19   splitter lip and its air-curtain strakes, 0.776-0.800
     y 0.19 to 0.29   the diffuser floor, flat at 0.720
     y 0.29 to 0.32   the nose corner wraps, 0.9191
     y 0.32 to 0.76   the rear skirts, 0.9581 rising to 0.9797
     y 0.76 to 0.89   the rear door skin, 0.9733 rising to 0.9817
     y 0.89 to 0.91   the rear quarter, 0.9565
     y 0.94 to 0.96   the camera mirror pods, exactly 1.0000

   Every painted panel below is rebuilt as the SAME SOLID an angled box
   gave: identical width, height, thickness, position and rotation, with the
   outer face resampled so a groove can be sunk into it and the boundary
   returned to the back face. A groove only removes material and a return
   only fills in what the box already occupied, so none of those seven
   owners can grow. Everything genuinely new is placed under the owner at
   its own height, which is why the intake surround stops at |z| 0.520 and
   the lower fascia at 0.710: the diffuser floor holds 0.720 all the way
   from y 0.19 to 0.29, and that is the ceiling down there.

   Measured, built mesh to built mesh by one integrator over both, with
   only this file changed: 2.070749 m2 before, 2.070359 m2 after, a change
   of -3.90 cm2 or -0.019 percent. Per scanline at 0.5 mm the union grows
   0.11 cm2 and loses 4.02 cm2, so nothing on it moved outward that matters.
   The loss is almost all one thing: the 2 mm chamfer on the nose corner
   wraps, which costs -4.18 mm of union at y 0.300 and -2.09 mm from y 0.32
   to 0.42 where the wrap's inboard edge is a union boundary, -3.41 cm2 in
   total. The other -0.6 cm2 is chamfer on the door skins, the shoulder
   strip and the camera pods.

   WHAT THIS PASS DID NOT FIX, because it could not without moving that
   surface. The flank is a set of cards whose planes disagree: the rear
   quarter carries no plan taper at all where its own part text claims 4 to
   8 degrees, while the skirt beside it carries 4.0 degrees, so the two
   cross at x -1.45 and the skirt runs 34 mm proud at its front edge and 30
   mm inboard at its rear. The front and rear door skins step 19.4 mm at the
   B-pillar shutline against a part text that claims flush to 0.3 mm. Both
   are plane errors, and every candidate repair moves a shadow owner: giving
   the quarter the taper it claims puts it 33 mm outboard over y 0.89 to
   0.91 and grows the integral 14 cm2. They are a body-generation fix, not a
   detail-pass fix, and they are reported rather than papered over. */

const ARCH = 0.43;

/* Degrees, consulted only ON a panel grid line. A channel wall stands at
   about 71 degrees at the default wall fraction and a run-out ramp falls
   away to nothing along its own fade, so the threshold is deciding where
   along a line the feature actually is, not whether a feature is a feature.

   body-8 needs a map of DECLARED lines because its base surface is a coarse
   loft under linear interpolation, where all curvature sits on the station
   lines and an angle test cannot tell a designed crease from a sample.
   These panels are FLAT between their grooves: the only thing on one that
   turns at all is a channel, so the angle alone can decide, provided it is
   never asked about a quad diagonal. That exclusion is the part that
   matters, and it is why lib.crease is not used on a grooved panel: at a
   groove corner a bilinear patch twists, a pure angle test hardens the
   diagonal, and the triangulation shows through the paint. */
const LINE = 22;

/* The panel gap: 5 mm wide, 3.5 mm deep, two real walls, so it catches
   light on the near lip and goes dark in the floor instead of being
   nothing. A character line is the same machinery an order of magnitude
   shallower: wide, soft-walled, 2 mm deep, which reads as a crease in a
   reflection without breaking the surface. */
const GAP = { width: 0.005, depth: 0.0035 };
const CHAR = { width: 0.020, depth: 0.002, wall: 0.008 };

/* ── Angled box with chamfered edges ──────────────────────────────────────
   abox's signature with the chamfer after the depth. A chamfer is what
   turns one flat highlight into two, which is most of the difference
   between a part and a block, and it costs 44 triangles against 12. */
function acbox(w, h, d, c, mat, x, y, z, rz = 0, rx = 0, ry = 0) {
  const m = lib.cbox(w, h, d, c, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz, 'ZXY');
  return m;
}

/* Fractional index of a value in a monotone station list, so a shutline can
   be declared in meters and handed to lib.loft in the index units its
   groove machinery works in. */
function fidx(list, v) {
  const n = list.length;
  for (let i = 0; i < n - 1; i++) {
    if (v <= list[i + 1] || i === n - 2) return i + (v - list[i]) / (list[i + 1] - list[i]);
  }
  return 0;
}

/* ── Creasing along grid lines ────────────────────────────────────────────
   Split normals where the two faces meeting on a ROW or COLUMN line of the
   panel's own grid turn by more than deg. Quad diagonals are never hard.

   Faces meet in a six-triangle fan around each interior vertex, cut by at
   most two lines, so the components come out of a six-element union over
   that fan. Slots run round the fan: 0 quad(i-1,j-1) tri1, 1 quad(i,j-1)
   tri0, 2 quad(i,j-1) tri1, 3 quad(i,j) tri0, 4 quad(i-1,j) tri1,
   5 quad(i-1,j) tri0. Slots 0-1 and 3-4 meet on row line i, 2-3 and 5-0 on
   column line j, and 1-2 and 4-5 are the diagonals.

   Triangle cost is zero: the geometry de-indexes to three vertices per
   triangle and not one position moves. Adapted from body-8's creaseLines,
   which additionally consults a map of declared lines. */
function creaseGrid(mesh, R, C, deg) {
  const pos = mesh.geometry.attributes.position.array;
  const uv = mesh.geometry.attributes.uv.array;
  const QR = R - 1, QC = C - 1;
  const cosL = Math.cos((deg * Math.PI) / 180);
  const P = (i, j) => (i * C + j) * 3;

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
      face(o, P(i, j), P(i + 1, j), P(i, j + 1));
      face(o + 3, P(i, j + 1), P(i + 1, j), P(i + 1, j + 1));
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
      for (let k = 0; k < 6; k++) par[k] = k;
      const join = (a, b, online) => {
        if (slot[a] < 0 || slot[b] < 0) return;
        if (online && cosOf(slot[a], slot[b]) < cosL) return;
        const ra = find(a), rb = find(b);
        if (ra !== rb) par[ra] = rb;
      };
      join(0, 1, true); join(1, 2, false); join(2, 3, true);
      join(3, 4, true); join(4, 5, false); join(5, 0, true);
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
    const p = P(i, j), o = ((i * C + j) * 6 + k) * 3, t = (i * C + j) * 2;
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

/* ── A skin panel a shutline can be cut into ──────────────────────────────
   Every painted panel on this body was an angled box, and a box has nowhere
   to put a gap. This builds the same solid: the outer face is resampled
   from a station grid so lib.loft's groove machinery can sink real channels
   into it, and the boundary is returned to the back face so the panel has
   an edge you can see instead of a card's cut end.

   The panel is built in ONE canonical frame and the caller rotates the
   group, so the same builder makes a flank, a hood and a Kamm face: rows
   run along local x, columns across local y at hv(x) times a fraction from
   -1 to 1, and the outer face looks along +z with the back at -z. That
   ordering matters, because lib.loft sinks a groove along u cross v, which
   for this frame is +z, so the cut goes inward and not outward.

   Cuts are declared in the panel's own units. { u } is a channel at
   constant local x in meters; { v } one at a constant fraction of the local
   half-height. span is [a, b] in the OTHER axis's units and runout is the
   fade at each end of it, so a gap that should stop 40 mm short of a corner
   stops there instead of ramping out across the whole panel. */
function gpanel(o) {
  const { u, v, hv, t, mat } = o;
  const sections = u.map((x) => v.map((s) => [x, hv(x) * s, t / 2]));
  const grooves = [];
  for (const c of o.cuts || []) {
    const row = c.u != null;
    const own = row ? u : v, other = row ? v : u;
    const g = { width: c.width, depth: c.depth };
    if (c.wall != null) g.wall = c.wall;
    if (row) g.row = fidx(own, c.u); else g.col = fidx(own, c.v);
    if (c.span) {
      g.span = [fidx(other, c.span[0]), fidx(other, c.span[1])];
      const ro = c.runout != null ? c.runout : (row ? 0.10 : 0.04);
      g.runout = Math.max(1e-3, fidx(other, c.span[0] + ro) - g.span[0]);
    }
    grooves.push(g);
  }
  const grid = lib.loftGrid(sections, {
    rowSub: o.rowSub || 0, colSub: o.colSub || 0, interp: 'linear', grooves,
  });
  const g = new THREE.Group();
  g.add(lib.shell(creaseGrid(lib.loftMesh(grid, mat, {}), grid.rows, grid.cols, o.line || LINE)));

  /* The returned edge, walked counter-clockwise seen from outside so the
     side walls face out, and creased at 40 so the corners break while the
     run along each edge stays smooth. Its ring is read straight off the
     grid, so the return cannot open a hairline against the face. */
  const P = (a, b) => {
    const k = (a * grid.cols + b) * 3;
    return [grid.pts[k], grid.pts[k + 1], grid.pts[k + 2]];
  };
  const ring = [];
  for (let a = 0; a < grid.rows; a++) ring.push(P(a, 0));
  for (let b = 1; b < grid.cols; b++) ring.push(P(grid.rows - 1, b));
  for (let a = grid.rows - 2; a >= 0; a--) ring.push(P(a, grid.cols - 1));
  for (let b = grid.cols - 2; b >= 1; b--) ring.push(P(0, b));
  const inner = ring.map(([x, y, z]) => [x, y, z - t]);
  g.add(lib.shell(lib.crease(lib.loft([ring, inner], mat, true), 40)));
  return g;
}

/* A placed panel frame, with worldToLocal available before anything is
   built, so a shutline can be measured against the partner it opens against
   and then declared in the panel's own coordinates. */
function frame(x, y, z, rz = 0, rx = 0, ry = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.set(rx, ry, rz, 'ZXY');
  g.updateMatrixWorld(true);
  return g;
}
const lx = (f, x, y, z) => f.worldToLocal(new THREE.Vector3(x, y, z)).x;
const ly = (f, x, y, z) => f.worldToLocal(new THREE.Vector3(x, y, z)).y;

/* Canonical frame orientations. Local +z is the outward face. */
const FACE_FWD = [Math.PI / 2, 0, Math.PI / 2];   /* +x: nose face   */
const FACE_AFT = [-Math.PI / 2, 0, Math.PI / 2];  /* -x: Kamm face   */
const FACE_UP = [-Math.PI / 2, 0, 0];             /* +y: hood, deck */

/* Rounded-rectangle half-height, the outline lib.plate draws. */
const roundHV = (hw, hd, r) => (x) => {
  const a = Math.abs(x) - (hw - r);
  return a <= 0 ? hd : hd - r + Math.sqrt(Math.max(0, r * r - a * a));
};
/* Row stations for that outline: the radius turns 15 degrees at a time, so
   it stays under the crease threshold and shades as a curve. */
function roundU(hw, r, mid) {
  const s = [...mid];
  for (const sg of [-1, 1]) {
    for (let k = 0; k <= 6; k++) s.push(sg * (hw - r + r * Math.sin((k / 6) * (Math.PI / 2))));
  }
  return [...new Set(s.map((q) => +q.toFixed(6)))].sort((a, b) => a - b);
}

export function build() {
  const sys = new THREE.Group();
  buildStructure(sys);
  buildCanopy(sys);
  buildSkin(sys);
  buildNose(sys);
  buildShutters(sys);
  buildSplitter(sys);
  buildDiffuser(sys);
  buildSkirts(sys);
  buildDoors(sys);
  buildTail(sys);
  return sys;
}

/* ── canopy: three glass facets and the bond run that makes them one ──────
   The facets are where they were. What is new is four transverse beads of
   the structural polyurethane the part text sells: one at the cowl, one at
   each facet joint and one at the deck. Summed off the built boxes that is
   4.47 m, so it is the transverse run and not the whole 11 m the spec row
   quotes; the two long side rails are not modeled. It is the bond line
   that turns three intersecting slabs into a glazed assembly, and it is
   also the only thing on a 22 percent-opacity surface that a softbox can
   find. */
function buildCanopy(sys) {
  const canopy = lib.part('canopy', [0, 0.9, 0]);
  const WS = Math.atan2(0.46, -0.90), RF = Math.atan2(-0.07, -0.90), BL = Math.atan2(-0.34, -0.95);
  canopy.add(lib.shell(acbox(1.02, 0.014, 1.26, 0.004, M.glass, 0.60, 1.15, 0, WS)));
  canopy.add(lib.shell(acbox(0.91, 0.014, 1.14, 0.004, M.glass, -0.30, 1.345, 0, RF)));
  canopy.add(lib.shell(acbox(1.01, 0.014, 1.00, 0.004, M.glass, -1.225, 1.14, 0, BL)));
  for (const [x, y, d, a] of [[1.045, 0.925, 1.26, WS], [0.152, 1.379, 1.15, (WS + RF) / 2],
                              [-0.748, 1.312, 1.06, (RF + BL) / 2], [-1.698, 0.972, 1.00, BL]]) {
    canopy.add(acbox(0.026, 0.012, d, 0.003, M.paintDark, x, y, 0, a));
  }
  sys.add(canopy);
}

/* ── skin ────────────────────────────────────────────────────────────────
   Front fender, arch lip, beltline shoulder, rear quarter, boat-tail
   quarter and the tail deck. */
function buildSkin(sys) {
  const skinSide = lib.part('skin', [0, 0.1, 0.65]);

  /* front fender profile; top edge continues the nose line */
  skinSide.add(lib.shell(lib.crease(profile(
    [[1.13, 0.90], [1.13, 0.647], 'arc', [2.30, 0.50], [2.30, 0.71]],
    [[1.45, 0.355, ARCH, 2.395, 0.384, true]],
    0.02, M.paint, 0.88
  ), 34)));
  skinSide.add(archLip());

  /* shoulder strip along the beltline, leaned inboard. It owns the shadow
     over the 10 mm from y 0.965 to 0.975, so the chamfer is the only thing
     that touches it and it is held to 2 mm for that reason. */
  skinSide.add(lib.shell(acbox(2.06, 0.10, 0.016, 0.002, M.paint, 0.10, 0.925, 0.905, 0, 0.30)));

  /* Rear quarter, straight section over the skirted arch. The cuts are read
     off partners: the leading gap sits 6 mm ahead of the rear door skin's
     own trailing edge at x -0.894, and the skirt line is laid on the skirt
     panel's measured top edge at y 0.762 so the reveal IS the skirt's
     shutline rather than a decoration near it. */
  const qf = frame(-1.30, 0.66, 0.93, 0, 0.07);
  const qhv = () => 0.25;
  const q = gpanel({
    u: [-0.40, -0.20, 0, 0.20, 0.40], v: [-1, -0.5, 0, 0.5, 1], hv: qhv, t: 0.02, mat: M.paint,
    cuts: [
      { u: 0.3755, ...GAP, span: [-0.96, 0.96], runout: 0.05 },
      { u: -0.3755, ...GAP, span: [-0.96, 0.96], runout: 0.05 },
      { v: ly(qf, -1.30, 0.762, 0.94) / 0.25, ...GAP, span: [-0.376, 0.376], runout: 0.05 },
      { v: ly(qf, -1.30, 0.845, 0.94) / 0.25, ...CHAR, span: [-0.372, 0.372], runout: 0.06 },
    ],
  });
  qf.add(q);
  skinSide.add(qf);

  /* Boat-tail quarter, 8 deg plan rotation pulling the tail inboard. Its
     leading edge is pulled back from x -1.682 to -1.694 so it stops 6 mm
     clear of the rear quarter's trailing edge instead of overlapping it by
     18 mm, and pulling a panel with plan taper AFT can only narrow it. */
  const bf = frame(-1.996, 0.65, 0.90, 0, 0.07, -0.14);
  const bhv = () => 0.23;
  const b = gpanel({
    u: [-0.304, -0.15, 0, 0.15, 0.304], v: [-1, -0.5, 0, 0.5, 1], hv: bhv, t: 0.02, mat: M.paint,
    cuts: [
      { u: 0.280, ...GAP, span: [-0.96, 0.96], runout: 0.05 },
      { v: ly(bf, -1.90, 0.762, 0.92) / 0.23, ...GAP, span: [0.02, 0.280], runout: 0.04 },
      { v: ly(bf, -1.90, 0.845, 0.92) / 0.23, ...CHAR, span: [-0.28, 0.28], runout: 0.06 },
    ],
  });
  bf.add(b);
  skinSide.add(bf);

  sys.add(skinSide);
  sys.add(mirrorZ(skinSide));

  /* Deck: closes the tail between backlight and Kamm face, and carries the
     tailgate. The hatch aperture is a real three-sided cut, two side gaps
     at 92 percent of the half-width and a leading gap behind the
     backlight's bond bead at x -1.698. Read off the built deck rather than
     off the declaration: the side gaps land on |z| 0.5980 and the leading
     gap on x -1.7381, which is 40.1 mm behind the bead's center and 25.8
     behind its aft face.

     THE DECKLID IS THIS GROUP, and it costs one word. `deck` was already its
     own lib.part group holding exactly this one panel and nothing else, which
     is what a closure needs: a closure is a rigid body, so it has to be the
     object the viewer transforms. Adding lib.hinge changes no vertex, no
     mesh, no coordinate and no part id, so the deck stays part of the one
     clickable `skin` and opens anyway. What it does NOT do is take the Kamm
     face with it; see SYSTEM.closures.decklid for why the wrap-over is drawn
     and stays shut. */
  const deck = lib.hinge(lib.part('skin', [-0.2, 0.55, 0]), 'decklid');
  const df = frame(-1.99, 0.925, 0, 0.1539, FACE_UP[0], FACE_UP[1]);
  const dhv = () => 0.65;
  df.add(gpanel({
    u: [-0.30, -0.15, 0, 0.15, 0.30], v: [-1, -0.5, 0, 0.5, 1], hv: dhv, t: 0.014, mat: M.paint,
    cuts: [
      { u: 0.256, ...GAP, span: [-0.92, 0.92], runout: 0.05 },
      { v: 0.92, ...GAP, span: [-0.278, 0.256], runout: 0.04 },
      { v: -0.92, ...GAP, span: [-0.278, 0.256], runout: 0.04 },
    ],
  }));
  deck.add(df);
  sys.add(deck);
}

/* ── the open front arch's edge ───────────────────────────────────────────
   A 20 mm card cut to an arc has a card's edge. A real arch has a lip
   rolled inboard onto a liner flange, and the flange is where the liner
   screws live, which is exactly the place lib.fastener's own note says a
   fastener belongs. The lip stays at or inside |z| 0.900, the fender card's
   own outer face, so it adds nothing to the shadow, and it clears wheels-2's
   front tire by 59.5 mm radially. That figure is the innermost ring, R 0.4225
   about the axle at (1.45, 0.355), against the tire's BUILT outer radius of
   0.3630 swept vertex by vertex. Measuring the outer ring at R 0.4335
   against the nominal 0.355 gives 78 mm and both halves of that are wrong. */
function archLip() {
  const g = new THREE.Group();
  const N = 20, a0 = 2.395, a1 = 0.384, cx = 1.45, cy = 0.355;
  const rings = [[ARCH, 0.9000], [ARCH - 0.0035, 0.8935],
                 [ARCH - 0.0075, 0.8820], [ARCH + 0.0035, 0.8735]];
  const secs = rings.map(([rr, z]) => {
    const s = [];
    for (let i = 0; i <= N; i++) {
      const a = a0 + (a1 - a0) * (i / N);
      s.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a), z]);
    }
    return s;
  });
  g.add(lib.shell(lib.crease(lib.loft(secs, M.paint, false), 34)));
  for (const k of [0.16, 0.5, 0.84]) {
    const a = a0 + (a1 - a0) * k;
    const f = lib.fastener(0.0075, M.alu, 'hex');
    f.position.set(cx + (ARCH + 0.0035) * Math.cos(a), cy + (ARCH + 0.0035) * Math.sin(a), 0.8725);
    f.rotation.x = -Math.PI / 2;
    g.add(f);
  }
  return g;
}

/* ── nose ────────────────────────────────────────────────────────────────
   Clamshell, sealed face, corner wraps, the light blade the part text says
   is a single sealed strip, the intake surround and the lower fascia. */
function buildNose(sys) {
  const nose = lib.part('nose', [1.05, 0.12, 0]);

  /* Clamshell. lib.plate seats its slab between y + t/2 and y + 3t/2, so
     the frame sits t above the old plate origin and the outline is
     reproduced exactly: 1.28 by 1.70 on a 0.12 corner radius.

     Two cuts. The cowl gap at local x -0.575 is the clamshell's hinge line,
     landing at world x 1.108, which is 51 mm ahead of the windshield's own
     bond bead at 1.045 and leaves a real scuttle strip between them. The
     two side gaps at 86 percent of the local half-width run from the cowl
     gap forward to the tip, splitting the one panel into a hood and the
     two fender tops it actually is, which is what a clamshell nose looks
     like from above on any car that has one. */
  const cf = frame(1.675, 0.834, 0, -0.159);
  cf.rotation.set(FACE_UP[0], FACE_UP[1], -0.159, 'ZXY');
  cf.updateMatrixWorld(true);
  cf.add(gpanel({
    u: roundU(0.64, 0.12, [-0.40, -0.20, 0, 0.20, 0.40]),
    v: [-1, -0.5, 0, 0.5, 1], hv: roundHV(0.64, 0.85, 0.12), t: 0.014, mat: M.paint,
    cuts: [
      { u: -0.575, ...GAP, span: [-0.90, 0.90], runout: 0.06 },
      { v: 0.86, ...GAP, span: [-0.565, 0.56], runout: 0.05 },
      { v: -0.86, ...GAP, span: [-0.565, 0.56], runout: 0.05 },
    ],
  }));
  /* THE HOOD IS THIS FRAME, MOVED AND NOT REDRAWN. `cf` already held exactly
     one panel and nothing else, so the whole change is which group owns it:
     the same mesh at the same coordinates goes into its own lib.part group
     under the same `nose` id, so the nose stays one clickable part and the
     clamshell opens. A closure is a rigid body and the group is what the
     viewer transforms, which is the rule that forces this and the only reason
     the line exists.

     Nothing here is a re-slice, and that is deliberate. Splitting a lid out
     of one of these panels is not available on this body the way it is on
     body-9: body-9 resolves ONE master grid and hands out index ranges of it,
     so a decklid is four fixed pieces and a lid off the same vertices. Every
     panel here resolves its own grid inside gpanel and closes it with its own
     returned edge, so a lid cut out of one would need a second grid with
     different interior stations and two new return rings. That is new
     geometry, which is a redraw. The panels that open on this body are the
     ones drawn as whole panels, which is why there are two of them.

     The lid explodes a little higher than the rest of the nose so the
     exploded view reads as an assembly rather than a panel inside a panel. */
  const lid = lib.hinge(lib.part('nose', [1.05, 0.42, 0]), 'hood');
  lid.add(cf);
  sys.add(lid);

  /* Sealed face: 0.30 tall, 1.58 wide on a 0.06 radius, 60 mm thick,
     spanning x 2.255 to 2.315 exactly where lib.plate put it. gpanel puts
     its outer face at frame + t/2, so the FRAME goes on 2.285 and not on
     2.315: the first cut of this pass put the frame on the outer face,
     which slid the whole panel 30 mm forward and buried the badge 27.6 mm
     inside it and the light blade 10.5 mm behind its own channel floor.
     Ray-swept, the badge was reading 0.18 cm2 from its best exterior view
     and the pixel comb 1.93 cm2 against the tail comb's 81.

     The blade channel is cut 24 mm deep at world y 0.700, because the blade
     used to stand 72 mm PROUD of this face while the part text called it a
     single sealed strip. The blade now sits 4.5 mm inboard of the face with
     the comb 1.5 mm inboard of it.

     THE CHANNEL DOES NOT COME OUT THE WIDTH IT IS ASKED FOR, and the reason
     is worth keeping. 48 mm at u 0.130 would put the upper lip on u 0.154
     and this panel ends at u 0.150, so the cut cannot fit; the groove
     machinery sizes its parametric half-width from the local meters-per-
     index scale, which on roundU's corner stations runs 12.4 mm per index
     below the cut and 10.0 above it, and what lands is 41.0 mm lip to lip
     between y 0.6749 and 0.7159, centered on y 0.6954 rather than 0.700.
     Swept off the built face at 2 mm, that is the number the hardware has
     to fit, so the comb is 34 mm centered on 0.6954 and not 40 on 0.700:
     at 40 its top 4.1 mm lay behind the ungrooved face and never rendered,
     and 312 of its triangles crossed the panel. */
  const ff = frame(2.285, 0.57, 0);
  ff.rotation.set(FACE_FWD[0], FACE_FWD[1], FACE_FWD[2], 'ZXY');
  ff.updateMatrixWorld(true);
  ff.add(gpanel({
    u: roundU(0.15, 0.06, [-0.09, 0, 0.09]),
    v: [-1, -0.5, 0, 0.5, 1], hv: roundHV(0.15, 0.79, 0.06), t: 0.06, mat: M.paint,
    cuts: [{ u: 0.130, width: 0.048, depth: 0.024, wall: 0.012, span: [-0.92, 0.92], runout: 0.05 }],
  }));
  nose.add(ff);

  /* The marque, extruded 2.4 mm with a beveled rim on the sealed face. A
     decal has no edge for a softbox to find; a badge does. */
  const badge = lib.badge(CHEVRON, 0.0024, M.alu);
  badge.rotation.y = Math.PI / 2;
  badge.position.set(2.315, 0.575, 0);
  nose.add(badge);

  /* Corner wraps. Their lower outboard corner owns the shadow over the
     30 mm from y 0.290 to 0.320 at |z| 0.9191, and a chamfer takes the
     corner off: at 6 mm it cost 12.5 mm of union, so this one is held to
     2 mm, which costs -4.18 mm at y 0.300 and -2.09 mm from y 0.32 to 0.42
     where the wrap's inboard edge is a union boundary. That is -3.41 cm2,
     most of this pass's whole -3.90 cm2 move, and it is the price of the
     one chamfer on this body that lands on a shadow owner. */
  for (const s of [-1, 1]) {
    nose.add(lib.shell(acbox(0.34, 0.42, 0.024, 0.002, M.paint, 2.23, 0.50, s * 0.82, 0, 0, s * 0.55)));
  }

  /* Light blade, inset in its channel: one sealed strip with the matrix
     read as a comb of 34 pixel dividers rather than a smooth bar.

     52 mm tall, not 46. The sealed face stops at y 0.720 and the clamshell
     starts at 0.726, and a 46 mm blade leaves that 3 mm slot open: an axial
     ray sweep found 196 rays going straight through it onto thermal's
     radiator, a hole the plain-box version did not have because its blade
     stood proud of the face and covered the slot. The blade laps it now.
     The extra height lands in the channel walls, where nothing sees it,
     and at |z| 0.710 against the front fender's 0.900 at these heights the
     blade is nowhere near a shadow owner. */
  nose.add(acbox(0.014, 0.052, 1.42, 0.003, M.lamp, 2.3035, 0.700, 0));
  const comb = lib.grille(1.40, 0.034, 0.004, M.plastic, { bars: 34, barW: 0.004 });
  comb.rotation.y = Math.PI / 2;
  comb.position.set(2.3115, 0.6954, 0);
  nose.add(comb);

  /* Valance band closing the gap between splitter lip and shutter bank, and
     the intake surround: two jambs and two rails framing an aperture
     0.940 wide by 0.238 tall, so the shutter bank sits IN something. The
     jambs stop at |z| 0.520 and the lower fascia at 0.710, both under the
     diffuser floor's 0.720, which is what owns the shadow down here. */
  nose.add(lib.shell(acbox(0.05, 0.07, 1.44, 0.006, M.paint, 2.325, 0.165, 0)));
  nose.add(lib.shell(acbox(0.042, 0.022, 0.980, 0.005, M.paint, 2.331, 0.437, 0)));
  nose.add(lib.shell(acbox(0.042, 0.020, 0.980, 0.005, M.paint, 2.331, 0.180, 0)));
  for (const s of [-1, 1]) {
    nose.add(lib.shell(acbox(0.042, 0.278, 0.020, 0.004, M.paint, 2.331, 0.3085, s * 0.510)));
    /* Lower fascia, closing the corner between the intake and the wrap, and
       carrying the air-curtain mouth as an 85 by 118 mm pocket sunk 30 mm
       into it. Before this the curtain duct was a solid block standing on
       the fascia; a duct that does not go anywhere is a decal, and the fix
       is the same one the crispness guide records for body-8's louvers:
       cut the recess the intake always implied. Both sides use the same
       frame orientation and a symmetric pocket, so the pair is identical
       rather than mirrored. */
    const lf = frame(2.3305, 0.3175, s * 0.615, FACE_FWD[2], FACE_FWD[0], FACE_FWD[1]);
    lf.add(gpanel({
      u: [-0.1275, -0.062, 0, 0.1275], v: [-1, -0.5, 0, 0.5, 1], hv: () => 0.095,
      t: 0.045, mat: M.paint,
      cuts: [{ u: -0.062, width: 0.085, depth: 0.030, wall: 0.010, span: [-0.62, 0.62], runout: 0.10 }],
    }));
    nose.add(lf);
  }
  sys.add(nose);
}

/* ── active grille shutters ──────────────────────────────────────────────
   Five slats on one actuator, and the whole point of the part is that they
   CLOSE, so they are modeled closed and the closure is arithmetic rather
   than an assertion. Pivot pitch 47.0 mm on the axis heights the plain-box
   version had, blade chord 64 mm at the 0.62 rad closed angle. A blade's
   upper edge then lands at pivot + 26.0 mm and the next blade's lower edge
   at pivot + 21.0, so consecutive blades overlap by 5.1 mm in height while
   standing 37 mm apart in x: there is no straight-through path at any
   height across the aperture, which is what closed means on a louver. Each
   blade carries a thinner formed tip over its last 14 mm, the sealing edge
   that lands on the blade above.

   THE PIVOT PINS AND BEARING BOSSES CAME OFF. Ray-swept from 67 exterior
   cameras they were 0 percent visible: the pins sat inside the jambs and
   the jambs themselves were duplicated by the nose's own intake jamb, 572
   triangles of hardware behind hardware. What replaced them is a bearing
   rail per side that IS in the aperture plane, with its five pivot bosses
   on the rail's front face where a real shutter cartridge shows them, and
   the nose jamb narrowed to |z| 0.500-0.520 to make room.

   The crank arms, the link bar and the actuator stay. They sit behind the
   bank and no exterior camera sees them, but this part explodes 1.3 m
   forward and is the thing a reader clicks, so the mechanism is visible in
   the view the model is actually read in. That is the same argument the
   boron cage under the skin runs on, and it is reported rather than
   assumed. */
function buildShutters(sys) {
  const shut = lib.part('shutters', [1.3, -0.08, 0]);
  const TILT = 0.62, HZ = 0.470, PIVX = 2.3293, PITCH = 0.047;
  for (let i = 0; i < 5; i++) {
    const y = 0.215 + i * PITCH;
    const blade = new THREE.Group();
    const main = lib.cbox(0.010, 0.050, 2 * HZ, 0.0025, M.plastic);
    main.position.y = -0.007;
    blade.add(main);
    const tip = lib.cbox(0.005, 0.014, 2 * HZ, 0.0015, M.plastic);
    tip.position.y = 0.025;
    blade.add(tip);
    blade.position.set(PIVX, y, 0);
    blade.rotation.z = TILT;
    shut.add(blade);
  }
  /* bearing rail per side, in the aperture plane, bosses on its front face */
  for (const s of [-1, 1]) {
    shut.add(acbox(0.042, 0.262, 0.030, 0.004, M.plastic, 2.3305, 0.309, s * 0.485));
    for (let i = 0; i < 5; i++) {
      const boss = lib.cyl(0.0075, 0.007, M.plasticLt, 10);
      boss.rotation.z = Math.PI / 2;
      boss.position.set(2.3545, 0.215 + i * PITCH, s * 0.485);
      shut.add(boss);
    }
  }
  /* crank arms, link bar and actuator, behind the left bearing rail */
  shut.add(acbox(0.010, 0.212, 0.008, 0.002, M.alu, 2.2985, 0.309, 0.485));
  for (let i = 0; i < 5; i++) {
    shut.add(acbox(0.008, 0.026, 0.006, 0.0015, M.alu, 2.3055, 0.221 + i * PITCH, 0.485, TILT));
  }
  shut.add(acbox(0.052, 0.048, 0.048, 0.006, M.plasticLt, 2.2680, 0.240, 0.485));
  shut.add(acbox(0.014, 0.070, 0.010, 0.002, M.alu, 2.2905, 0.300, 0.485));
  sys.add(shut);
}

/* ── splitter lip and air curtains ───────────────────────────────────────
   The lip keeps its outline and its 18 mm section: it owns the shadow from
   y 0.135 to 0.152 at |z| 0.800 and the two exit strakes own it from 0.155
   to 0.190 at 0.776, so neither is chamfered and neither moved. What is new
   is the six shear-away fasteners the part's own failure note promises, and
   an air curtain that is a duct instead of a block: an 85 by 118 mm mouth
   sunk 30 mm into the lower fascia, a throat behind it, and a turning vane
   in the throat aiming the sheet at the wheel face. Built and swept, the
   mouth is 85.0 mm across its lips, 65.0 across its floor, and 98.8 mm at
   full depth running out to 117.8 lip to lip along the fascia. */
function buildSplitter(sys) {
  const spl = lib.part('splitter', [1.0, -0.35, 0]);
  const lip = lib.plate(0.30, 1.60, 0.018, 0.09, M.carbon);
  lip.position.set(2.21, 0.125, 0);
  spl.add(lib.shell(lib.crease(lip, 34)));
  /* Shear-away fasteners on the lip UNDERSIDE. On the top face, ray-swept
     from 67 exterior cameras, three of six were 0 percent visible: the
     intake surround above them takes every downward sightline. A splitter
     is a part you see from in front and below, so the heads go where a
     curb strike would show them. */
  for (const z of [-0.70, -0.42, -0.14, 0.14, 0.42, 0.70]) {
    const f = lib.fastener(0.0085, M.alu, 'torx');
    f.position.set(2.150, 0.134, z);
    f.rotation.z = Math.PI;
    spl.add(f);
  }
  for (const s of [-1, 1]) {
    /* Throat liner behind the fascia pocket, its front face 0.5 mm proud of
       the pocket floor at 2.3230, and two turning vanes whose outermost
       corner reaches 2.3288, standing 5.8 mm off that floor inside a 30 mm
       pocket, so the mouth reads as something the air goes into rather than
       a dark rectangle. Both numbers are swept off the built vane, not off
       the chamfer-free box: lib.cbox insets its faces by the chamfer. */
    spl.add(acbox(0.060, 0.081, 0.120, 0.004, M.plastic, 2.2935, 0.2555, s * 0.615));
    spl.add(acbox(0.024, 0.062, 0.008, 0.002, M.carbon, 2.3170, 0.2555, s * 0.632, 0, 0, s * 0.40));
    spl.add(acbox(0.024, 0.062, 0.008, 0.002, M.carbon, 2.3170, 0.2555, s * 0.598, 0, 0, s * 0.40));
    /* exit strake, sheeting the curtain across the front wheel face */
    spl.add(lib.shell(lib.crease(abox(0.26, 0.07, 0.012, M.carbon, 2.23, 0.155, s * 0.77), 34)));
  }
  sys.add(spl);
}

/* ── diffuser ────────────────────────────────────────────────────────────
   13 degree ramp with 4 vanes, rising to the Kamm face. The floor owns the
   shadow from y 0.19 to 0.29 at a flat |z| 0.720, so it keeps its plain
   section and its exact width; the vanes, the two end fences and the six
   mounting bolts all sit inside it. The bolts are on the UNDERSIDE, where a
   sacrificial bolt-on diffuser shows its heads and where a low camera can
   see them. */
function buildDiffuser(sys) {
  const RZD = Math.atan2(0.28, -0.67);          /* (-1.63,0.14) -> (-2.30,0.42) */
  const dif = lib.part('diffuser', [-0.9, -0.35, 0]);
  dif.add(lib.shell(lib.crease(abox(0.72, 0.014, 1.44, M.carbon, -1.965, 0.28, 0, RZD), 34)));

  /* The floor's outward-down normal, which is what everything bolted to the
     ramp has to be seated along. Used by the vanes, the end fences and the
     bolt heads alike. */
  const dn = [-Math.sin(RZD), Math.cos(RZD)];
  const ur = [Math.cos(RZD), Math.sin(RZD)];

  /* THE VANES HANG BELOW THE RAMP, which is the whole claim this part's
     panel makes when it calls them the lowest rear point on the car, and it
     was not what the geometry did. All six were seated 60 and 72 mm along
     world +y from the floor centerline instead of along dn, so every one of
     them stood INSIDE the underbody: swept off the built mesh they spanned
     y 0.157 to 0.523 against a ramp whose highest point is 0.425, and the
     forward ends of the two inner vanes ran through suspension's rear
     subframe at 128.4 mm of straddle depth over 22 crossing pairs at
     |z| 0.18. This is the same error the bolt heads below already document
     and correct: the floor box's local +y maps to world DOWN under this
     rotation, so anything offset in world +y goes the wrong way.
     The ramp floor itself is untouched and the built silhouette does not
     move, because the vanes were always inside the floor's own shadow.

     Two numbers changed with the seating. Depth is 90 mm rather than 130,
     and the run starts at x -1.852 rather than -1.640, because the ramp
     leading edge is only 135 mm off the ground: a 130 mm vane hung off the
     front of it would finish 8 mm above the road. At x -1.852 the ramp has
     risen far enough that the vane's lower edge sits at y 0.1444, which is
     9.7 mm ABOVE the ramp's own leading lip at y 0.1347 rather than level
     with it, so the diffuser's lowest point is still the floor's front lip
     and nothing hangs below it. That station is also
     102 mm behind suspension/rear-subframe's rear face at x -1.750, which
     is why the pair is gone rather than reduced. */
  const VANE = 0.09;                     /* vane depth below the floor */
  const VW = 0.464;                      /* along-ramp length, x -1.852 to -2.280 */
  const VT = 0.1095;                     /* along-ramp offset of the vane center */
  const vs = 0.007 + VANE / 2;           /* half the floor plus half the vane */
  const vx = -1.965 + VT * ur[0] + vs * dn[0];
  const vy = 0.28 + VT * ur[1] + vs * dn[1];
  for (const z of [-0.54, -0.18, 0.18, 0.54, -0.702, 0.702]) {
    dif.add(acbox(VW, VANE, 0.012, 0.003, M.carbon, vx, vy, z, RZD));
  }

  /* Mounting bolts on the ramp's UNDERSIDE. The first attempt put them on
     the wrong face: the floor box's local +y maps to world DOWN under this
     rotation, so seating at -0.008 along it and turning the head by RZD+pi
     grew all six heads UP INTO the ramp, and the ray sweep found 0 percent
     of 432 triangles. The heads sit 7 mm along dn from the floor centerline
     and grow the same way, which is where a low camera and a steep driveway
     both find them. */
  for (const [t, z] of [[-0.30, -0.62], [0, -0.62], [0.30, -0.62],
                        [-0.30, 0.62], [0, 0.62], [0.30, 0.62]]) {
    const f = lib.fastener(0.008, M.alu, 'hex');
    f.position.set(-1.965 + t * Math.cos(RZD) + 0.007 * dn[0],
                   0.28 + t * Math.sin(RZD) + 0.007 * dn[1], z);
    f.rotation.z = RZD;
    dif.add(f);
  }
  sys.add(dif);
}

/* ── rear wheel skirts ───────────────────────────────────────────────────
   The skirt owns the shadow over the whole of y 0.32 to 0.76, so its outer
   plane is untouched to the last decimal. Everything here is cut INTO it or
   returned behind it.

   The mounting line is a 5 mm reveal 24 mm inside all four edges, which is
   what a bolt-on panel over a quarter looks like from a meter away, and the
   panel now has a 15 mm returned edge instead of a card's cut end. The two
   cam latches sit in 52 mm pockets sunk 6 mm into the skin.

   TWO THINGS ABOUT THAT HARDWARE ARE HONEST RATHER THAN GOOD, and both
   come from the flank plane error above, not from this pass.

   Only the FORWARD latch reads. Swept as a first-hit raster from 95
   exterior directions at 0.8 mm, the forward cam presents 8.25 cm2 from its
   best view and the aft one 1.32, all of it the arrow: the aft cam disc and
   its slot are never the nearest surface from any direction at all. The
   reason is measurable and is not the latch's fault. At y 0.660 the skirt
   is the outermost surface only from x -1.41 to -0.96; from -1.95 to -1.44
   the untapered rear quarter and the boat-tail quarter stand over it, by
   25 mm at x -1.80 where the aft latch is. Moving the latch to where it
   could be seen would put both latches in the front third of a 1.04 m
   panel, which is worse than leaving 200 triangles behind a panel that
   should not have been there. It goes with the quarter's taper.

   And the slot in each cam stands 1.5 mm PROUD of the skirt's outer face
   rather than sitting in the pocket with the cam and the arrow. It costs
   nothing: at its own height the skirt's widest point is its leading edge
   at |z| 0.9749 and the slot reaches 0.9665, so the union never sees it.

   Clearance to wheels-2's rear tire is NOT clearance. Swept vertex by
   vertex against the skirt's own outer plane, the tire stands 4.14 mm
   OUTBOARD of it, deepest at (-1.805, 0.355, 0.9025), and that figure is
   identical in the plain-box baseline because the skirt plane did not move.
   The skirt's outboard position owns the shadow over the whole of y 0.32 to
   0.76, so re-planing it moves A by 0.4 to 1.4 percent. It is a body
   generation's problem. The pockets are cut inward and do not touch it. */
function buildSkirts(sys) {
  const skirt = lib.part('skirts', [-0.15, 0, 0.8]);
  const sf = frame(-1.45, 0.54, 0.925, 0, 0.05, -0.07);
  const LATCH = [-0.35, 0.35];
  const cuts = [
    { u: 0.496, ...GAP, span: [-0.955, 0.955], runout: 0.04 },
    { u: -0.496, ...GAP, span: [-0.955, 0.955], runout: 0.04 },
    { v: 0.945, ...GAP, span: [-0.496, 0.496], runout: 0.03 },
    { v: -0.945, ...GAP, span: [-0.496, 0.496], runout: 0.03 },
    { v: 0.30, ...CHAR, span: [-0.47, 0.47], runout: 0.05 },
  ];
  for (const t of LATCH) {
    cuts.push({ v: 0.545, width: 0.052, depth: 0.006, wall: 0.010, span: [t - 0.026, t + 0.026], runout: 0.008 });
  }
  sf.add(gpanel({
    u: [-0.52, -0.26, 0, 0.26, 0.52], v: [-1, -0.5, 0, 0.5, 1], hv: () => 0.22,
    t: 0.015, mat: M.paint, cuts,
  }));
  /* The cam itself, seated on the pocket floor, with its slot and the arrow
     the failure note says is cast into the panel.

     THE ARROW IS ON THE SKIN, NOT IN THE POCKET, and that is a measurement
     and not a preference. The pocket runs u t-0.026 to t+0.026 with an 8 mm
     fade at each end, so it is only at full depth over t-0.018 to t+0.018,
     and the cam disc is 31 mm across on the same center: there is no floor
     left beside it. Seated at z 0.0038, which is inside the pocket's depth,
     the arrow's own footprint straddles the span end, where the fade has
     already carried the surface back to full height. Swept vertex by vertex
     against the built skin, 20 of its 28 corners sat 3.7 mm INSIDE the
     paint. It now sits on the outer face and stands 1.2 mm proud of it,
     which is what a molded marking on a bolt-on panel does. It costs
     nothing: at its own height the skirt's widest point is its leading edge
     and the arrow does not reach it. */
  for (const t of LATCH) {
    const g = new THREE.Group();
    const cam = lib.cyl(0.0155, 0.005, M.alu, 14);
    cam.rotation.x = Math.PI / 2;
    cam.position.set(t, 0.1199, 0.0045);
    g.add(cam);
    const slot = lib.cbox(0.020, 0.0035, 0.003, 0.0008, M.darkSteel);
    slot.position.set(t, 0.1199, 0.0075);
    slot.rotation.z = 0.6;
    g.add(slot);
    const arrow = lib.badge([[-0.010, -0.005], [0.004, -0.005], [0.004, -0.011],
                             [0.014, 0], [0.004, 0.011], [0.004, 0.005], [-0.010, 0.005]],
                            0.0012, M.alu);
    arrow.position.set(t + 0.026, 0.1199, 0.0075);
    g.add(arrow);
    sf.add(g);
  }
  skirt.add(sf);
  sys.add(skirt);
  sys.add(mirrorZ(skirt));
}

/* ── doors ───────────────────────────────────────────────────────────────
   Two skins per side, frameless glass, camera pods.

   The shutlines are placed against built partners. The front skin's leading
   gap is 6 mm from the front fender's trailing edge, measured at x 1.130 on
   the fender profile, which meant growing the skin forward from 1.110 to
   1.124: the front skin carries no plan rotation, so lengthening it in x
   cannot widen it. The rear skin's trailing edge is pulled back from -0.900
   to -0.894 to open the same 6 mm against the rear quarter it used to touch.
   Between them the B-pillar tube runs from x -0.022 to 0.062 on the built
   cage, and the two skins leave a 10 mm slot at x 0.080 to 0.090 that is 18
   mm ahead of it. That slot is the shutline and it gets no reveal, because
   a 10 mm gap with a 5 mm channel either side reads as a 20 mm trench. The
   pillar mismatch is reported, not hidden: closing it means shortening the
   rear skin, which is a shadow owner from y 0.76 to 0.89.

   The capacitive strip is a real 3.5 mm recess 140 mm long at the beltline,
   because the part text deletes the handle and replaces it with one. */
function buildDoors(sys) {
  /* ONE GROUP PER LEAF, plus a fixed one. Same meshes at the same
     coordinates; what changed is which group owns them. The daylight opening
     is drawn here as ONE pane spanning both doors, so unlike body.js it
     cannot travel with either of them without being cut, and cutting it
     would move geometry. It stays fixed and the checker says what that
     costs. The camera pod at x 1.05 is ahead of the front door and is on the
     A-pillar either way. */
  const doors = lib.hinge(lib.part('doors', [0.08, 0, 0.85]), 'door-front');
  const doorsR = lib.hinge(lib.part('doors', [0.08, 0, 0.85]), 'door-rear');
  const fixedKit = lib.part('doors', [0.08, 0, 0.85]);

  const front = frame(0.607, 0.64, 0.935, 0, 0.07);
  front.add(gpanel({
    u: [-0.517, -0.26, 0, 0.26, 0.517], v: [-1, -0.5, 0, 0.5, 1], hv: () => 0.25,
    t: 0.02, mat: M.paint,
    cuts: [
      { u: 0.493, ...GAP, span: [-0.955, 0.955], runout: 0.04 },
      { u: -0.493, ...GAP, span: [-0.955, 0.955], runout: 0.04 },
      { v: 0.945, ...GAP, span: [-0.493, 0.493], runout: 0.03 },
      { v: -0.945, ...GAP, span: [-0.493, 0.493], runout: 0.03 },
      { v: ly(front, 0.60, 0.800, 0.945) / 0.25, ...CHAR, span: [-0.49, 0.49], runout: 0.06 },
      { v: ly(front, 0.60, 0.845, 0.945) / 0.25, width: 0.016, depth: 0.0035,
        span: [-0.447, -0.307], runout: 0.012 },
    ],
  }));
  doors.add(front);

  const rear = frame(-0.407, 0.64, 0.93, 0, 0.07, -0.05);
  rear.add(gpanel({
    u: [-0.487, -0.24, 0, 0.24, 0.487], v: [-1, -0.5, 0, 0.5, 1], hv: () => 0.25,
    t: 0.02, mat: M.paint,
    cuts: [
      { u: 0.463, ...GAP, span: [-0.955, 0.955], runout: 0.04 },
      { u: -0.463, ...GAP, span: [-0.955, 0.955], runout: 0.04 },
      { v: 0.945, ...GAP, span: [-0.463, 0.463], runout: 0.03 },
      { v: -0.945, ...GAP, span: [-0.463, 0.463], runout: 0.03 },
      { v: ly(rear, -0.41, 0.800, 0.94) / 0.25, ...CHAR, span: [-0.46, 0.46], runout: 0.06 },
      { v: ly(rear, -0.41, 0.845, 0.94) / 0.25, width: 0.016, depth: 0.0035,
        span: [-0.383, -0.243], runout: 0.012 },
    ],
  }));
  doorsR.add(rear);

  const dlo = profile(
    [[0.95, 0.0], [0.32, 0.44], [-0.50, 0.43], [-1.30, 0.0]],
    [], 0.012, M.glass, 0
  );
  dlo.rotation.x = -0.50;
  dlo.position.set(0, 0.92, 0.88);
  fixedKit.add(lib.shell(lib.crease(dlo, 34)));

  /* Camera pod. |z| 1.0000 at the lens housing is the widest thing on the
     car and it owns the shadow from y 0.938 to 0.965, so the pod's outer
     face stayed exactly there; the chamfer, the airfoil stalk section and
     the rearward-looking barrel are all inboard of it. */
  fixedKit.add(acbox(0.024, 0.012, 0.090, 0.0018, M.plastic, 1.05, 0.95, 0.955));
  fixedKit.add(acbox(0.058, 0.030, 0.030, 0.0018, M.sensor, 1.05, 0.95, 0.985));
  const barrel = lib.cyl(0.0085, 0.012, M.plasticLt, 12);
  barrel.rotation.z = Math.PI / 2;
  barrel.position.set(1.016, 0.95, 0.985);
  fixedKit.add(barrel);
  const lens = lib.cyl(0.0062, 0.003, M.glass, 12);
  lens.rotation.z = Math.PI / 2;
  lens.position.set(1.0095, 0.95, 0.985);
  fixedKit.add(lens);

  for (const g of [doors, doorsR, fixedKit]) {
    sys.add(g);
    sys.add(mirrorZ(g));
  }
}

/* ── Kamm tail ───────────────────────────────────────────────────────────
   The cut, made a cut. The face was a box, which meets the deck and the
   quarters in a rounded-off box corner; it is now a returned panel whose
   outer face ends in a hard 90 against a 24 mm return, with the applied
   trim section the failure note describes wrapping that edge. That trim is
   the thing that reads: a Kamm truncation is only worth its counts if the
   separation line is fixed, and a fixed separation line has an edge on it.

   Cut into the face: the lamp channel, 58 mm wide and 18 mm deep, because
   the blade used to stand 10 mm PROUD of a face the part text calls inset;
   the tailgate's lower gap at y 0.635; and its two side gaps at 95 percent
   of the half-width. Swept off the built face the channel measures 58.0 mm
   lip to lip, y 0.7708 to 0.8295, and the side gaps land on |z| 0.6935.

   THE SIDE GAPS DO NOT LINE UP WITH THE DECK'S and cannot. The deck is
   1.30 m wide and its hatch gaps sit on |z| 0.598; this face is 1.46 m wide
   and 95 percent of it is |z| 0.6935, so the two are 95.5 mm apart on each
   side. Bringing this face's gaps in to 0.598 would run them straight
   through the lamp channel, which reaches |z| 0.6497, and put the blade
   across its own shutline. The two apertures are different widths because
   the two panels are, and that is a body-generation fix. */
function buildTail(sys) {
  const tail = lib.part('tail', [-1.2, 0.1, 0]);
  const tf = frame(-2.285, 0.715, 0);
  tf.rotation.set(FACE_AFT[0], FACE_AFT[1], FACE_AFT[2], 'ZXY');
  tf.updateMatrixWorld(true);
  tf.add(gpanel({
    u: [-0.165, -0.08, 0, 0.085, 0.165], v: [-1, -0.5, 0, 0.5, 1], hv: () => 0.73,
    t: 0.024, mat: M.paint,
    cuts: [
      { u: 0.085, width: 0.058, depth: 0.018, wall: 0.012, span: [-0.89, 0.89], runout: 0.05 },
      { u: -0.080, ...GAP, span: [-0.95, 0.95], runout: 0.05 },
      { v: 0.95, ...GAP, span: [-0.080, 0.165], runout: 0.03 },
      { v: -0.95, ...GAP, span: [-0.080, 0.165], runout: 0.03 },
    ],
  }));
  tail.add(tf);

  /* the applied trim section on the truncation edge */
  const H = 0.165, W = 0.73;
  for (const dy of [H - 0.006, -H + 0.006]) {
    tail.add(acbox(0.006, 0.012, 2 * W, 0.0015, M.paintDark, -2.2985, 0.715 + dy, 0));
  }
  for (const s of [-1, 1]) {
    tail.add(acbox(0.006, 2 * H - 0.024, 0.012, 0.0015, M.paintDark, -2.2985, 0.715, s * (W - 0.006)));
  }

  /* The blade, inset in its channel, and its pixel comb.

     BOTH MOVED IN. The blade was 0.5 mm inboard of the face and the comb
     over it was 3.5 mm PROUD of it, on a face whose spec row reads "inset"
     and whose text says the blade is inset flush. A 16 mm channel could not
     hold a 14 mm blade and a 4 mm comb, so the channel is 18 mm and the
     stack now reads the way the nose's does: comb outer face 0.5 mm inboard
     of the Kamm face, blade outer face 2.0 mm inboard of that, blade back
     2.0 mm clear of the channel floor. This is all in x, downstream of the
     frontal projection, so none of it can touch the shadow. */
  tail.add(acbox(0.014, 0.050, 1.30, 0.003, M.lampRed, -2.2880, 0.800, 0));
  const comb = lib.grille(1.28, 0.044, 0.004, M.plastic, { bars: 30, barW: 0.004 });
  comb.rotation.y = Math.PI / 2;
  comb.position.set(-2.2945, 0.800, 0);
  tail.add(comb);

  /* The wash-on-a-schedule camera the failure note puts above the blade,
     standing on the face instead of inside it. Seated at -2.2905 its 12 mm
     housing ran x -2.2965 to -2.2845, entirely within the 24 mm wall of the
     Kamm panel, and a first-hit raster from 95 exterior directions returned
     zero pixels for it: only the lens stood out. Both move out 11 mm, so
     the housing spans -2.3075 to -2.2955 and reads as a pod on the
     tailgate. It sits in the base wake, where the part text says the air
     has already left, and at |z| 0.0055 it is nowhere near a shadow owner. */
  tail.add(acbox(0.012, 0.026, 0.040, 0.004, M.sensor, -2.3015, 0.848, 0));
  const eye = lib.cyl(0.0055, 0.004, M.glass, 12);
  eye.rotation.z = Math.PI / 2;
  eye.position.set(-2.3095, 0.848, 0);
  tail.add(eye);

  for (const s of [-1, 1]) {
    tail.add(lib.shell(acbox(0.20, 0.34, 0.02, 0.005, M.paint, -2.225, 0.715, s * 0.795, 0, 0, -s * 0.75)));
  }
  /* Valance. Grown 15 mm taller than the box it replaces, because the old
     one topped out at y 0.540 and the Kamm face starts at 0.550: an axial
     ray sweep found 244 rays going straight through that 10 mm slot onto
     the rear megacasting. It now laps the face by 5 mm. |z| 0.70 against
     an envelope of 0.96 at these heights, so closing it costs nothing. */
  tail.add(acbox(0.02, 0.145, 1.40, 0.004, M.plastic, -2.28, 0.4825, 0));
  sys.add(tail);
}

/* The marque: a chevron, extruded 2.4 mm with a beveled rim, the same
   outline body-8 wears. */
const CHEVRON = [
  [-0.045, 0.000], [-0.017, -0.019], [0.000, -0.007], [0.017, -0.019],
  [0.045, 0.000], [0.017, 0.019], [0.000, 0.007], [-0.017, 0.019],
];
