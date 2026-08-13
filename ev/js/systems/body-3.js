/* Gen 3 body: the monoform. One lofted surface from nose to Kamm face wears
   the same two megacastings, rockers, and boron cage as Gen 1 (body.js) and
   the Gen 2 aero concept (body-aero.js). Panels become regions of a single
   loft, the rear arches are skirted by the surface itself, both end faces
   are closed by light, and the first moving exterior part sits on the deck.
   Target Cd 0.145 against Gen 2's 0.17 and Gen 1's 0.21. Shell mass 162 kg
   over the 196 kg structure: 358 kg total. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';
import { STRUCT_META, buildStructure, mirrorZ } from './body.js';

export const SYSTEM = {
  id: 'body-3',
  name: 'Body · Gen 3 monoform',
  color: 0xaed4e8,
  explode: [0, 1.7, 0],
  blurb: 'The Gen 1 shell was panels and the Gen 2 concept was devices; Gen 3 is one surface. A single loft nose to Kamm face, glass lofted into the skin line, both faces closed by light, and the first moving exterior part. Cd 0.145, paid for in repair quantum and certification debt.',
  parts: {
    ...STRUCT_META,
    skin: {
      name: 'Monoform skin',
      tagline: 'Bonnet, fenders, quarters, deck, and both fascias: eight Gen 1 panels, one lofted surface.',
      mass: 64,
      specs: [
        ['Construction', 'Superformed AA5083, 1.3 mm, bonded to the cage'],
        ['Surface', 'One loft through 10 stations, x +2.375 to -2.375'],
        ['Replaces', '8 Gen 1 panels and every shutline between them'],
        ['Continuity', 'G2 curvature along the length; no joint crosses the flow'],
        ['Rear arches', 'Skirted by the loft itself; Gen 2 needed bolt-on panels'],
        ['Repair unit', 'The whole side, blended; no panel boundary to hide in'],
      ],
      how: 'The skin is not an assembly, it is a surface: ten cross-sections define one loft from the nose to the Kamm face, and the metal is made to follow it. Superforming is what makes that possible. A 1.3 mm AA5083 sheet is heated to 500 degrees C and blown by gas pressure into a female die over several minutes, an aerospace process that produces in one cycle the compound curvature cold stamping would need a dozen panels and their tolerance stacks to approximate. Gen 1 built this surface from a bonnet, fenders, quarters, a deck panel, and two fascias; the Gen 2 aero concept kept the panel count and spent its budget on flushness, holding every joint to a fraction of a millimetre so the boundary layer would forgive the seams. Gen 3 stops apologising for the joints and deletes them.\n\nThe aerodynamic value is continuity, and the grade of continuity matters. Matching panel edges buys tangency; a loft buys G2, matched curvature, and the boundary layer feels the difference because pressure gradient follows curvature. Every place the Gen 1 shell changed part, bonnet to fender, fender to door, quarter to fascia, the curvature stepped and the flow paid a fraction of a count; summed over a body, curvature continuity is drag money. The rear arch is the clearest case. Gen 2 proved a skirt was worth 0.010 for the pair and paid with cam latches, panel gaps, and a flushness tolerance; here the loft simply continues over the wheel, and the skirt is not a part, it is a region of the surface. Cd 0.145 is the sum of such deletions.',
      why: 'The bill is honest and large. The skin is the entire visible body, so the repair quantum is the entire visible body: a trolley scrape that cost Gen 1 four fender bolts, and Gen 2 a blended quarter, costs the monoform a repaint blended along a highlight line that runs 4.75 m without a break. The insurance group tables price exactly this, and the actuarial review sat inside the design loop here just as it did for the battery-3 floor. Integration always sends this invoice; the monoform simply sends it for the whole car at once.',
      fail: [
        'Superformed spans this large oil-can under hail and careless palms, and paintless dent repair needs backside tool access that the bonded closed sections mostly deny.',
        'A rear arch kerb strike that Gen 2 answered with a twenty-second skirt swap is now structural skin repair: a cut-in section and a multi-day blend, and the premium table already says so.',
        'Superforming holds minutes-long cycle times against the seconds of a stamping press; the skin is the slowest part in the plant, and the build rate of the whole car is hostage to one forming cell.',
      ],
      explode: [0, 0.62, 0],
    },
    canopy: {
      name: 'Glass canopy band',
      tagline: 'Glass and metal are stations of the same loft: the section never notices the material change.',
      mass: 38,
      specs: [
        ['Glazing', 'Cell-cast laminated, 2.1 mm + acoustic PVB + 1.6 mm'],
        ['Span', 'Cowl at x 1.06 to the deck at -1.87, one band'],
        ['Surface', 'Cut from the skin loft stations; curvature continuous at the joint'],
        ['Solar', 'Sputtered IR stack, 20% TSET'],
        ['Bond', '11 m structural PU, shear-active'],
        ['Camera zone', 'Optical-grade tolerance above the mirror'],
      ],
      how: 'The Gen 2 teardrop canopy proved the one-piece idea: 42 kg of cell-cast glass from cowl to tail, three facets, one bond, and attached flow over the whole upper body. Gen 3 keeps the proof and integrates it differently. The glass is a band, tumblehome to crown, and its mould is cut from the same ten loft stations as the metal below it, so the outer face of the glass lies on the same mathematical surface as the paint. The material changes; the section does not. Each ply is sagged over a precision mould at 620 degrees C, laminated over an acoustic PVB core, and finished with a sputtered silver stack that holds total solar transmittance near 20 percent under a crown that is mostly sky.\n\nAerodynamically the band completes the argument the skin started: the one remaining joint that runs across the flow, glass edge to metal, is a step and not a curvature break, because both surfaces are cut from the same ten stations, so the section never changes shape where the material does and the boundary layer meets a joint with no pressure-gradient signature. The bond is structural and doubles as the datum: the PU bead thickness is the adjustment that indexes the glass to the loft at fitting, the same trick Gen 1 used for its windscreen, stretched over eleven metres. Acoustically the laminate does what it has since Gen 1, damping the 3 kHz band where wind rush lives, which matters more than ever under this much glass.',
      why: 'Glass goes where eyes need it and superformed aluminium goes where they do not. Gen 2 ran glass all the way down the fastback because its facets could not turn the corner into metal cleanly; the shared loft can, so the band ends where sight lines end and the deck returns to metal, which is 4 kg saved and, more usefully, a surface the Kamm flap can actually mount to.',
      fail: [
        'One stone chip condemns the band, carried from Gen 2 unimproved, and the replacement must re-index to the skin loft or the joint becomes the step this design exists to delete.',
        'Aluminium expands roughly twice as fast as glass; the 11 m bond absorbs millimetres of relative motion every thermal cycle, and a dry spot in the bead announces itself as a creak, then a leak.',
        'The screen region lies at 70 degrees, past Gen 2\'s 63: the optical path is longer, night-time double imaging is the honest limit, and no chip repair may touch the camera zone.',
      ],
      explode: [0, 1.05, 0],
    },
    doors: {
      name: 'Flush doors and camera pods',
      tagline: 'The only four shutlines left on the body, each obliged to vanish back into the loft it interrupts.',
      mass: 41,
      count: 4,
      specs: [
        ['Skins', 'Superformed AA6016, cut from the master loft'],
        ['Flushness', '±0.25 mm to the surrounding skin'],
        ['Handles', 'None; capacitive strip and e-latch, carried from Gen 2'],
        ['Mirrors', 'Camera pods on 90 mm stalks, carried from Gen 2'],
        ['Glazing', 'Frameless laminated, 0.5 mm proud'],
        ['Mass', '41 kg for four (Gen 2: 46, Gen 1: 82)'],
      ],
      how: 'The monoform deleted every joint on the body side except these four, which means the door cuts now carry the entire tolerance argument alone. Each skin is not a styled panel that happens to fit, it is the master loft surface between two shutlines, trimmed from the same mathematics as the skin around it, so a closed door restores the surface exactly. The hinges adjust in three axes against the casting datum, the same end-of-line camera gauge discipline Gen 1 introduced, but the pass criterion tightened from flush panels to an unbroken highlight: a light line swept down the car must cross all four doors without a visible kink.\n\nThe hardware is carried, and the carry is deliberate. The capacitive strip and e-latch came in with the Gen 2 aero concept and arrive here with a generation of fleet history behind them; the camera pods on their 90 mm stalks likewise, still worth about 0.008 of Cd against glass mirrors, still mounted on stalks because the rules and the spray physics both want the lens outboard. What changed is mass and frame: the frameless glass and bonded construction shed another 5 kg against Gen 2, and the twin EPDM seal system now seals against a lofted aperture rather than a flat flange, which is a die-cut problem solved once rather than a fitting problem solved per car.',
      why: 'Doors are where the monoform admits people exist. A moving panel through a G2 surface is a hard promise: the air cares about step, not gap, so the design spends its tolerance budget on flushness and lets the gap width be what the seals need. Four cuts, each returning to the surface within a quarter millimetre, is the price of a body that is otherwise one part.',
      fail: [
        'E-latches keep their legally required mechanical backup; the hidden cable release is exercised at every service because nobody touches it until the day it matters.',
        'Hinge sag no longer reads as a bad gap, it reads as a broken highlight line running the length of the car; the fix is adjustment, but the symptom is the whole body looking wrong.',
        'Seal compression set returns as a whistle at exactly the speed you drive daily, carried from both ancestors because EPDM chemistry did not read the design brief.',
      ],
      explode: [0.08, 0, 0.85],
    },
    lightbands: {
      name: 'Light bands',
      tagline: 'The only two flat faces on the car are the ones that glow.',
      mass: 4,
      count: 2,
      specs: [
        ['Front', '2 x 84-pixel matrix behind one 1.04 m conformal window'],
        ['Rear', 'PMMA guide, 1.23 m in a 1.27 m aperture, Kamm face 1.32 m there'],
        ['Brake rise', '< 10 ms, carried from Gen 1'],
        ['Format', 'Windows set 1.5 mm into the two flat faces, on a 20 mm reveal'],
        ['Aim', 'Referenced to ride height'],
      ],
      how: 'The lineage runs straight. Gen 1 hung two 84-pixel matrix headlamps in the nose and drew one full-width tail bar; Gen 2 fused the headlamps into a single blade on its sealed face. Gen 3 finishes the thought: the loft is truncated by exactly two flat faces, nose and Kamm, and each face is closed by a light band. The matrix optics, the light guide, and their drivers sit behind one conformal window per face, so no lamp housing carves a trench through the skin. The pixels still blank oncoming traffic out of the high beam through the same 50 ms camera loop, and the rear guide still reaches full brake output in under 10 ms, roughly seven metres of warning at motorway speed, numbers Gen 1 set and nothing since has needed to move.\n\nBoth bands live in aerodynamically dead air by construction. The front face sits at the stagnation region where the flow has already decided to go around, and the Kamm face sits inside the wake where, as the Gen 2 tail content put it, the air has already left. That placement is what lets the bands be flush and frameless: they are lighting a face the flow never touches, so their windows owe nothing to the loft except its edge line.',
      why: 'A monoform leaves nowhere else for light to live. Any housing cut into the lofted surface would be a curvature break in exactly the air the whole body is shaped to keep attached, while the two truncation faces are flat, vertical, and already outside the attached flow. The lamps went to the only two places that cost nothing.',
      fail: [
        'One part per face: a parking tap costs the whole band, the Gen 2 blade warning doubled to both ends of the car.',
        'Slim sealed housings still condense; membrane vents manage it and field complaints prove they do not abolish it.',
        'Base suction films the rear band with road dirt, so the dirtiest surface on the car is also its only rear signal; the wash cycle is a safety schedule, not valeting.',
      ],
      explode: [1.15, 0.1, 0],
    },
    kammflap: {
      name: 'Active Kamm flap',
      tagline: 'The first moving part on an EV·01 exterior: twelve degrees that buy the phantom tail back.',
      mass: 6,
      specs: [
        ['Chord x span', '190 mm hinge to tail, 0.20 m on the deck, 1.17 m span'],
        ['Travel', '0 to 12 degrees; modelled deployed'],
        ['Effect', 'Base area -8%, ~6 counts at 130 km/h'],
        ['Actuator', 'One brushless worm drive, spring return to flush'],
        ['Endurance', '10^6 cycles, iced-hinge rated'],
        ['Certification', 'Pedestrian and pinch tested in every position'],
      ],
      how: 'Gen 2 truncated the ideal teardrop and named the price: base drag on the cut face, paid every kilometre. The flap buys some of the phantom tail back, but only during the hours it earns. Above roughly 80 km/h the worm drive rotates the deck trailing edge down 12 degrees, extending the boat-tail line the quarters started, pulling the separation edge inboard and down, and shrinking the base area about 8 percent: worth around 6 counts at motorway speed, which is range you can measure. Below that speed it lies flush in the deck, restoring the approach angle, the pedestrian geometry, and the clean parked silhouette. It is modelled here in the deployed position because that is the position in which it justifies its mass.\n\nTwo generations of EV·01 bodies kept every exterior surface static, and even Gen 2 hid its one mechanism, the shutter bank, behind the intake opening; the flap is the first moving piece of the surface itself, and its certification bill shows why that record stood. A surface that moves is a new impact geometry in every position it can hold, so certification runs the pedestrian headform and legform series at flush, at 12 degrees, and at the worst mid-travel angle, plus pinch protection for fingers, gravel bombardment, and icing. Endurance is its own bill: a flap that cycles on every on-ramp sees a million actuations in a vehicle life, so the hinge line is a dry polymer bearing with no service interval, and the actuator runs a self-test sweep at every cold start, the same habit as Gen 2\'s shutter bank, reporting a stiff hinge before the motorway does.',
      why: 'The failure position is the design argument in one detail. The return spring pulls the flap flush, never deployed, because a flap stuck at 12 degrees in town is an uncertified pedestrian geometry, while a flap stuck flush merely costs six counts. Gen 2 encoded cooling beats drag in its shutter spring; the flap encodes law beats drag. Same grammar, new clause.',
      fail: [
        'Ice can lock the hinge line solid; the cold-start sweep detects the torque spike, leaves the flap flush for the day, and the range estimate quietly explains the missing counts.',
        'The hinge is the fatigue villain: a million small reversals through a polymer bearing, and wear shows first as a millimetre of trailing-edge lash the self-test is tuned to catch.',
        'Certification debt freezes the design: any change to the hinge, edge radius, or actuator re-triggers the full pedestrian series, so the flap will outlive facelifts that redraw everything around it.',
      ],
      explode: [-1.0, 0.45, 0],
    },
    spats: {
      name: 'Front wheel spats',
      tagline: 'Gen 2 skirted the wheels that do not steer; Gen 3 half-covers the ones that do.',
      mass: 5,
      count: 2,
      specs: [
        ['Coverage', '0.026 m2 a side: 12% of the arch, three quarters of the reachable-free area'],
        ['Vents', '3 louvres bleeding arch pressure aft'],
        ['Clearance', '8.7 mm to the full-lock, full-bump swept solid'],
        ['Worth', '~4 counts the pair (rear skirting: ~10, now in the loft)'],
        ['Removal', 'Two bolts each; chains require it'],
      ],
      how: 'The Gen 2 skirt content laid out the physics: a rotating wheel in an open arch is an air pump with no purpose, and covering it is worth counts. It also gave the honest reason the front stayed open, a steered wheel sweeps more than 60 degrees and leans with the suspension, so a full front skirt must stand a hand-width off the body. Gen 3 attacks the loophole in that argument: the tyre cannot reach the whole opening. The swept envelope of the wheel through full lock plus full bump is a computed solid, swept here against the built tyre, rim and cover through plus and minus 40 degrees of steer and 60 mm of bump, and 16 percent of the arch area above the rocker line lies outside it: a crescent at the leading edge and a slightly smaller one trailing. The spats take three quarters of that, 0.026 square metres a side, standing 8.7 mm clear of the swept solid at the closest point and lying on the loft line the way no full skirt could.\n\nThe louvres are the second half of the trick. Partially sealing an arch traps the pumping air the opening used to spill, and trapped pressure pushes the spat outward and feeds lift; the three louvres in the trailing spat bleed that pressure aft as a thin sheet along the body side, in the same spirit as the Gen 2 air curtains but powered by the arch itself. The pair is worth about 4 counts. Full rear skirting, now a region of the monoform loft rather than a panel, is worth about 10. The front spats are the difference between a car that skirts what is easy and one that skirts what is possible.',
      why: 'Partial is the honest optimum, not a compromise. The full front skirt fails on geometry, the open arch leaves counts on the table, and the crescents in between are free: fixed panels, no mechanism, no clearance risk, bolted so a chain fit or a deep-snow winter can delete them in a minute per side.',
      fail: [
        'The spats lead the wheel into every kerb approach; they are sized as sacrificial and the two-bolt mounting is the repair strategy.',
        'Packed snow bridges the 8.7 mm clearance gap and the tyre will grind it; the noise is alarming and harmless, and the louvres double as the melt drain.',
        'Everywhere the steered wheel needs the volume the arch stays an open arch, and that is most of it: sighted horizontally at hub height the opening still reads straight through the car. Closing it needs a panel over the tyre, which is the thing full lock deletes.',
        'Snow chains and the spats are mutually exclusive by geometry; the manual says remove, and roadside reality says someone will not.',
      ],
      explode: [0.4, -0.05, 0.75],
    },
    venturi: {
      name: 'Venturi floor lip',
      tagline: 'Gen 2 fought front lift with a splitter plate; the monoform meters the whole floor instead.',
      mass: 4,
      specs: [
        ['Lip', 'Carbon composite, 16 mm section, full width'],
        ['Ground gap', '110 mm under the lip at static height'],
        ['Front lift', 'Cl,f zero at 130 km/h, target carried from Gen 2'],
        ['Underfloor', 'Feeds the sealed battery-3 floor plane'],
        ['Mounting', 'Shear-away fasteners, carried from Gen 2'],
      ],
      how: 'Gen 2\'s splitter worked by blockage: force the stagnation region above a protruding plate, let high pressure push down on the lip, and admit only slow flow underneath. It bought zero front lift for a 60 mm overhang and a small bluff-face drag tax. The venturi lip inverts the method. Instead of blocking the underfloor, it meters it: the lip drops the intake gap to 110 mm, and the floor behind it, dead flat from nose to diffuser thanks to the battery-3 cell-to-body plane, forms a long shallow venturi with the road. Metered mass flow through a converging gap accelerates, static pressure falls along the whole floor length, and the front axle is held down by distributed suction rather than by a plate\'s local push.\n\nThe distinction matters at the drag ledger. The splitter\'s downforce came with a bluff frontal edge; the lip\'s comes from the underside of a body already there, so the same zero-lift target arrives with roughly two fewer counts spent. The dependency also moves: a venturi is tuned by its gap, so the lip\'s numbers assume the suspension holds its speed-dependent ride height, and the aero map degrades gracefully but measurably when it cannot. The lip section is carbon because the load case is a car-park ramp, not the air.',
      why: 'Steering feel at speed is a pressure distribution, as the Gen 2 splitter content argued, and the monoform gets to make that pressure with geometry it already owns. A flat structural floor was the battery\'s gift to the body; finishing its leading edge with 4 kg of carbon is the cheapest downforce purchase left on the car.',
      fail: [
        'Kerbs and ramps rake the lip first; the shear-away fasteners cost a bracket, not the nose, carried unchanged from Gen 2 because the physics of car parks is also carried unchanged.',
        'A ride-height fault mistunes the whole floor, not just a plate: front lift returns quietly at speed, so the aero controller cross-checks height sensors and widens the stability margins when they disagree.',
        'Deep snow packs the gap and the venturi becomes a plough; the lip is rated for it structurally, but the range estimate cannot explain slush.',
      ],
      explode: [1.05, -0.35, 0],
    },
  },
};
/* ── Geometry ──────────────────────────────────────────────────────────────

   THE AERODYNAMIC SURFACE IS THE STATIONS TABLE AND NOTHING ELSE. Ten
   sections, x +2.375 to -2.375, six [y, half-width] pairs up the driver side
   plus a crown, mirrored to thirteen ring points so the underside stays open
   at the floor. efficiency.js books Cd 0.145 on A 2.18 against this table, so
   every number in it is carried unchanged and every part meant to lie on the
   skin is placed through halfWidth, bottomY, skinZ or surfaceY rather than by
   eye.

   WHAT THIS PASS CHANGED is resolution and edges, not shape. The old build
   was four independent lofts through the raw table: 192 triangles for the
   whole visible body, with nothing to cut a shutline into. The doors were
   four boxes floating 3 mm above a surface they claimed to be part of and
   both truncation faces were rectangles laid over a curved ring outline. The
   same ten sections now resolve into ONE master grid at rowSub 2, colSub 2
   with interp: 'linear', and every painted panel is a slice of it, so panels
   that share an edge share vertices and a gap can be cut once with each side
   picking up its own half of the channel.

   INTERPOLATION IS LINEAR ON PURPOSE. lib.loft's clamped Catmull-Rom holds
   the envelope but not the integral: frontal area is the widest point at each
   HEIGHT, so a surface that moves between profile points moves A without
   touching any extreme, and design/crispness.md measures that at +0.64
   percent clamped and +2.80 unclamped. Only linear is zero, and this body's A
   is booked. Linear also keeps every clearance quoted below true, because the
   surface between two stations does not move at all.

   THE CREASES ARE DECLARED, NOT DISCOVERED. Under linear interpolation every
   span between stations is exactly flat, so all of the curvature sits on the
   station lines and a global angle test cannot tell a designed edge from a
   coarse sample. Swept as face dihedrals this body's station lines turn 7 to
   27 degrees across the flank while the shoulder turns 39 to 70, so one
   threshold would either miss the shoulder or facet the nose. HARDR and HARDC
   name the lines that are allowed to break, each with the extent it is a
   feature over, and a 20 degree test then decides where along a named line
   the feature actually is. ── */

function ring(x, half, crownY) {
  const pts = [];
  for (let i = 0; i < half.length; i++) pts.push([x, half[i][0], -half[i][1]]);
  pts.push([x, crownY, 0]);
  for (let i = half.length - 1; i >= 0; i--) pts.push([x, half[i][0], half[i][1]]);
  return pts;
}

/* [x, [[y, half-width] x6], crownY]. Carried unchanged from the first pass. */
const STATIONS = [
  /* 0  nose face */
  [2.375, [[0.42, 0.50], [0.47, 0.55], [0.53, 0.57], [0.58, 0.53], [0.62, 0.44], [0.648, 0.20]], 0.66],
  /* 1 */
  [2.10, [[0.34, 0.68], [0.44, 0.73], [0.56, 0.75], [0.65, 0.69], [0.72, 0.55], [0.755, 0.25]], 0.77],
  /* 2  front arch leading edge; the arch is R 0.43 about the front axle */
  [1.82, [[0.574, 0.86], [0.66, 0.875], [0.76, 0.86], [0.83, 0.74], [0.88, 0.57], [0.905, 0.26]], 0.915],
  /* 3  front axle, arch crown */
  [1.45, [[0.785, 0.90], [0.82, 0.905], [0.86, 0.89], [0.90, 0.78], [0.93, 0.60], [0.947, 0.27]], 0.955],
  /* 4  cowl (COWL): the glass root */
  [1.06, [[0.536, 0.90], [0.66, 0.92], [0.90, 0.935], [0.99, 0.79], [1.035, 0.59], [1.056, 0.26]], 1.065],
  /* 5  mid-canopy rings hold a near-flat roof band out to z +-0.66 so the
        glass wraps the cage rails instead of dipping under them */
  [0.45, [[0.30, 0.91], [0.55, 0.935], [0.92, 0.94], [1.12, 0.74], [1.425, 0.66], [1.44, 0.35]], 1.445],
  /* 6  maximum section */
  [-0.35, [[0.30, 0.92], [0.55, 0.94], [0.92, 0.94], [1.16, 0.72], [1.435, 0.67], [1.448, 0.35]], 1.452],
  /* 7  rear axle: the flank holds 0.94 outboard of a tyre face at 0.9025, so
        the loft itself is the rear skirt and there is no bolt-on panel */
  [-1.45, [[0.30, 0.94], [0.55, 0.94], [0.92, 0.925], [1.02, 0.68], [1.115, 0.46], [1.153, 0.21]], 1.16],
  /* 8  deck station (DECK): the glass ends and painted metal returns */
  [-1.87, [[0.34, 0.93], [0.55, 0.925], [0.90, 0.90], [0.965, 0.64], [1.025, 0.43], [1.052, 0.195]], 1.06],
  /* 9  Kamm face */
  [-2.375, [[0.42, 0.66], [0.55, 0.68], [0.72, 0.66], [0.80, 0.55], [0.85, 0.40], [0.874, 0.18]], 0.88],
];

const RINGS = STATIONS.map(([x, half, crownY]) => ring(x, half, crownY));

const COWL = 4;                 /* ring index where the glass band starts */
const DECK = 8;                 /* ring index where the glass ends */
const LAST = STATIONS.length - 1;

/* Profile at an arbitrary x: linear between the two bracketing stations. */
function profileAt(x) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  const p = [];
  for (let k = 0; k < A[1].length; k++) {
    p.push([(1 - t) * A[1][k][0] + t * B[1][k][0], (1 - t) * A[1][k][1] + t * B[1][k][1]]);
  }
  p.push([(1 - t) * A[2] + t * B[2], 0]);
  return p;
}

/* Half-width of the loft at (x, y), linear between profile points. */
function halfWidth(x, y) {
  const p = profileAt(x);
  if (y <= p[0][0]) return p[0][1];
  for (let k = 0; k < p.length - 1; k++) {
    if (y <= p[k + 1][0]) {
      const [y0, w0] = p[k], [y1, w1] = p[k + 1];
      return y1 === y0 ? w1 : w0 + ((y - y0) / (y1 - y0)) * (w1 - w0);
    }
  }
  return 0;
}

/* Lower edge of the loft at x. Over the front axle this is the arch lip. */
function bottomY(x) { return profileAt(x)[0][0]; }

/* The flank continued BELOW its own bottom edge on the tangent it ends on,
   so a closeout panel in the arch lies on the line the skin was taking
   rather than on a plane of constant |z|. Above the edge this is halfWidth. */
function skinZ(x, y) {
  const p = profileAt(x);
  if (y >= p[0][0]) return halfWidth(x, y);
  return p[0][1] + ((p[1][1] - p[0][1]) / (p[1][0] - p[0][0])) * (y - p[0][0]);
}

/* Inverse of halfWidth on the upper branch: the height at which the surface
   is hz wide. The Kamm flap reads the deck through this. */
function surfaceY(x, hz) {
  let lo = bottomY(x), hi = 1.50;
  for (let k = 0; k < 44; k++) {
    const m = (lo + hi) / 2;
    if (halfWidth(x, m) > hz) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}

/* Fractional station index of an x. */
function rowOf(x) {
  for (let i = 0; i < STATIONS.length - 1; i++) {
    if (x <= STATIONS[i][0] && x >= STATIONS[i + 1][0]) {
      return i + (STATIONS[i][0] - x) / (STATIONS[i][0] - STATIONS[i + 1][0]);
    }
  }
  return x > STATIONS[0][0] ? 0 : LAST;
}

/* Angled box with chamfered edges: abox's signature with the chamfer after
   the depth. A chamfer is what turns one flat highlight into two. */
function acbox(w, h, d, c, mat, x, y, z, rz = 0, rx = 0, ry = 0) {
  const m = lib.cbox(w, h, d, c, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz, 'ZXY');
  return m;
}

/* ── The four shutlines ────────────────────────────────────────────────
   The monoform deletes every joint on the body side except the doors, so
   these are the only cuts on the car, and each is placed against BUILT
   partner geometry rather than against prose.

   x 0.900 is the front door's leading edge, and the two pieces of body.js
   structure it has to clear were both measured off the built mesh rather than
   off the tube's nominal centreline. The A-pillar runs from (0.85, 0.95, 0.72)
   up and aft on a 42 mm radius, and because the axis leans 43 degrees off X
   its forward cap reaches only x 0.8781, not the 0.892 a perpendicular tube
   would give: the cut clears it by 21.9 mm. The nearer part is the cowl beam,
   an 80 mm section across z +-0.720 at y 0.89 to 0.97 whose forward face is
   x 0.8900, so the governing clearance is 10.0 mm. Ahead of the cut the
   flank is fixed fender for 120 mm, back to where the arch closes out at
   x 1.020, and that strip is where the hinges and the belt anchor live.

   x 0.075 is the B-pillar joint. That pillar is a 42 mm tube on x 0.02, so it
   spans -0.022 to 0.062 and the cut sits 13 mm behind it.

   x -1.000 is the rear door's trailing edge. wheels-3's rear tyre reaches
   x -1.087 as built and the rocker extrusion ends at -1.010, so the cut is
   87 mm ahead of the tyre and 10 mm ahead of the sill's own end.

   Every cut runs from the lower body line to the beltline seam and no
   further, and BOTH ENDS OF THAT SPAN ARE PANEL EDGES rather than comfortable
   values past them. Ring fraction 0.48 is y 0.420 from x 0.45 aft, which is
   the top of the 100 mm rocker at |z| 0.915: the sill is structure you sit
   on, not door skin. It is a RING fraction and not a height, so where the
   arch lifts the flank's bottom edge it lifts with it: measured on the built
   sill panel the line runs y 0.5492 at the front cut, 129 mm above the rocker
   top, and reaches 0.420 by the B-pillar cut. The front shutline is that much
   shorter at the bottom than the other two.

   Ring 3 is the glass root, and along a door there is no
   painted panel above it at all, so a span that ended past ring 3 would run
   its fade out on a surface that is never built and leave the channel at full
   depth on the panel's own top edge. ── */
const GAP = { width: 0.005, depth: 0.004 };
const SILL = 0.48;
const SEAM = 3;
const FADE = 0.05;
const CUTX = [0.900, 0.075, -1.000];

const GROOVES = [];
for (const x of CUTX) {
  const r = rowOf(x);
  GROOVES.push({ row: r, ...GAP, span: [SILL, SEAM], runout: FADE });
  GROOVES.push({ row: r, ...GAP, span: [12 - SEAM, 12 - SILL], runout: FADE });
}
/* The Kamm flap's hinge line, cut across the deck band so a panel that moves
   reads as a panel that moves. x -2.185 is 190 mm ahead of the Kamm face,
   which is the chord the flap's own metadata carries. */
const HINGEX = -2.185;
GROOVES.push({ row: rowOf(HINGEX), ...GAP, span: [SEAM, 12 - SEAM], runout: FADE });

const SHELL = lib.loftGrid(RINGS, {
  rowSub: 2, colSub: 2, interp: 'linear', grooves: GROOVES,
});

const RI = (i) => SHELL.rowIndex(i);
const CI = (j) => SHELL.colIndex(j);
/* column bands in resolved indices */
const FL = [0, CI(SEAM)], FR = [CI(12 - SEAM), CI(12)];
const UP = [CI(SEAM), CI(12 - SEAM)];
const DOORR = [CI(12 - SEAM), CI(12 - SILL)];
const SILLL = [0, CI(SILL)], SILLR = [CI(12 - SILL), CI(12)];
/* each shutline pushed a left and a right groove; both resolve to the same
   split row, which is the far floor edge of the channel */
const CUT = [SHELL.grooves[0].split, SHELL.grooves[2].split, SHELL.grooves[4].split];
const FCUT = SHELL.grooves[6].split;

/* ── The declared hard lines ────────────────────────────────────────────
   Resolved indices that are ALLOWED to break; everything else stays smooth
   whatever angle it turns through.

   Every groove contributes its four channel lines over its own span plus
   every resolved line inside its two run-outs, declared across the channel
   width only. A run-out is an interval and not two lines: declaring only the
   ends leaves any foreign line landing inside the fade shading smooth while
   the rest of the ramp breaks.

   Ring 2 and ring 10 are the shoulder, and they are the one feature line here
   that is neither a gap nor a panel boundary. Measured as face dihedrals the
   flank below stands within 6 degrees of vertical from the cowl aft while the
   tumblehome above leans in at 42 to 70, so it is a designed beltline and not
   a sampling kink. It carries an extent: station 2 aft, which is the front
   arch crest, so the crease is born on the fender and the two nose rings
   ahead of it stay a dome. ── */
const SHOULDER = 2;
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
  for (const k of [g.i0, g.f0, g.f1, g.i1]) declare(own, k, lo, hi);
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
for (const c of [SHOULDER, 12 - SHOULDER]) declare(HARDC, CI(c), RI(2), SHELL.rows - 1);

/* Degrees. Consulted only ON a declared line, so it sits below any real
   channel wall at 65 to 75 degrees and above fade noise. */
const LINE = 20;

/* Split normals along the declared lines only. lib.crease cannot do this: it
   is a pure angle test with no idea which grid line an edge lies on, and the
   whole point is that on a linear body an angle test hardens sampling kinks.
   This walks the grid the panel was sliced from instead. Faces meet in a
   six-triangle fan around each interior vertex, cut by at most two lines, so
   the components come out of a six-element union over that fan. Triangle cost
   is zero: the geometry de-indexes to three vertices per triangle and not one
   position moves. Lifted from body-8, which paid for it. */
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

const panel = (rows, cols, mat) =>
  lib.shell(creaseLines(lib.loftMesh(SHELL, mat || M.paint, { rows, cols }), rows, cols));

/* ── The two flat faces ─────────────────────────────────────────────────
   The loft is truncated by exactly two planes and each is closed by a light
   band, so each face is built as an ANNULUS between the master grid's own
   edge ring and the lamp aperture rather than as a rectangle laid over the
   opening. The rectangles it replaces were the wrong shape in both
   directions: the nose plate was 1.00 m wide against a ring 1.14 m across at
   its widest and left the corners of the face open, while the light band
   above it was 0.86 m wide at a height where the ring is 0.58, so the lamp
   stood 140 mm outside the bodywork on each side. An annulus cannot do
   either, because both of its boundaries are read off geometry.

   The aperture is found by casting a ray from a point inside the band out
   through each ring point and clipping it to the aperture polygon, which
   preserves the cyclic order of the ring exactly however finely the grid is
   resolved. Both faces are planar, so a lamp sits at a known depth everywhere
   on them and needs none of the cone arithmetic a tapered cap forces. */
function faceRing(rowIdx) {
  const r = [];
  for (let b = 0; b < SHELL.cols; b++) {
    const k = (rowIdx * SHELL.cols + b) * 3;
    r.push([SHELL.pts[k], SHELL.pts[k + 1], SHELL.pts[k + 2]]);
  }
  return r;
}

/* poly is a convex list of [y, z] corners and o an [y, z] inside it */
function clipRing(ring, poly, o, x) {
  return ring.map(([, y, z]) => {
    const dy = y - o[0], dz = z - o[1];
    let best = Infinity;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      const ey = b[0] - a[0], ez = b[1] - a[1];
      const det = ey * dz - ez * dy;
      if (Math.abs(det) < 1e-12) continue;
      const t = (ey * (a[1] - o[1]) - ez * (a[0] - o[0])) / det;
      const s = (dy * (a[1] - o[1]) - dz * (a[0] - o[0])) / det;
      if (t > 1e-9 && s >= -1e-9 && s <= 1 + 1e-9 && t < best) best = t;
    }
    if (!isFinite(best)) best = 0;
    return [x, o[0] + best * dy, o[1] + best * dz];
  });
}

const shrink = (r, o, k, x) => r.map(([, y, z]) => [x, o[0] + (y - o[0]) * k, o[1] + (z - o[1]) * k]);

/* A truncation face and the lamp that closes it. dir is +1 at the nose and
   -1 at the Kamm face; everything behind the plane is built along -dir so the
   reveal, the emitter bank and the housing floor all sit inside the body.

   THE FASCIA IS BODYWORK AND GOES TO THE SKIN, not to the lamp. It is painted
   AA5083 like the rest of the shell, the skin's own tagline claims both
   fascias, and the two annuli are 0.19 and 0.48 square metres, which is most
   of what a camera sees of either end of the car. Booked to `lightbands` they
   would click through as the 4 kg lamp pair and fly forward with it on the
   staged explode while the surface they are part of rose with the body. The
   lamp keeps its reveal, housing, emitter and window. */
function lightFace(part, skinPart, rowIdx, dir, poly, mid, emitter) {
  const outer = faceRing(rowIdx);
  const x = outer[0][0];
  const ap = clipRing(outer, poly, mid, x);
  /* lib.loft winds its quads off the section order, so a ring swept from the
     rim inward faces +x and the same ring swept outward faces -x. The nose
     therefore takes its sections in the opposite order to the Kamm face, and
     the surface is lit from the side the camera is actually on. Verified by
     signed volume on every piece of both faces. */
  const two = (a, b) => (dir > 0 ? [b, a] : [a, b]);
  /* the fascia, closed across the bottom of the ring by closeLoop */
  skinPart.add(lib.shell(lib.loft(two(outer, ap), M.paint, true,
    { rowSub: 1, colSub: 0, interp: 'linear' })));
  /* the reveal: 20 mm of wall, so the aperture has a lit lip and a shadow */
  const back = shrink(ap, mid, 0.955, x - dir * 0.020);
  part.add(lib.shell(lib.loft(two(ap, back), M.paintDark, true)));
  /* the housing floor, so nothing behind the fascia reads as daylight */
  part.add(lib.loft(two(back, shrink(back, mid, 0, x - dir * 0.024)), M.plastic, true));
  /* the emitter bank, 9 mm inside the plane and well within the reveal */
  emitter.rotation.y = (dir > 0 ? 1 : -1) * Math.PI / 2;
  emitter.position.set(x - dir * 0.009, mid[0], mid[1]);
  part.add(emitter);
  /* the window: a clear lens 1.5 mm inside the plane, so its rim catches
     light instead of z-fighting the fascia it sits in */
  const win = shrink(ap, mid, 0.985, x - dir * 0.0015);
  part.add(lib.shell(lib.loft(two(win, shrink(win, mid, 0, x - dir * 0.0015)), M.glass, true)));
}

/* The marque: a chevron extruded 4 mm with a bevelled rim, on the one flat
   panel that can carry it without interrupting a surface the flow is attached
   to. A decal has no edge for a softbox to find. */
const CHEVRON = [
  [-0.045, 0.000], [-0.017, -0.019], [0.000, -0.007], [0.017, -0.019],
  [0.045, 0.000], [0.017, 0.019], [0.000, 0.007], [-0.017, 0.019],
];

/* ── The front arch and what the wheel can never reach ──────────────────
   The swept solid is measured off wheels-3's BUILT tyre, rim and cover,
   rotated about the vertical through the wheel centre over plus and minus 40
   degrees and lifted plus and minus 60 mm, which is all the bump a 0.363 m
   tyre has inside a 0.430 m arch. Two things fall out of it and neither is
   the obvious one.

   The wheel's extent in X does not simply shrink with steer: the tread
   contribution falls as cos and the shoulder contribution grows as sin, and
   they peak together at 14.3 degrees. The swept solid reaches x 1.0832 aft
   and 1.8168 forward, not the static tyre's 1.087 and 1.813, and those are
   the two numbers a fixed panel has to clear.

   The wheel's extent in Z grows enormously: at full lock the leading tread
   corner sweeps to |z| 1.109 against a body 0.900 half-wide at the arch. That
   is Gen 2's own argument for leaving the front open, and it is why no part
   of this spat may lie over the tyre. The crescents fore and aft of the swept
   solid are the only places a fixed panel can be flush with the skin, and
   there it is exactly flush.

   SPATZ and SPATF are the two limits, each 8 mm clear of the swept solid IN X.
   That margin is not the clearance: the panel and the swept tyre are both
   curved, so the shortest line between them is not axial. Swept at half a
   degree of steer and 10 mm of bump against the built tyre, rim, cover, disc
   and caliper, the nearest approach is 8.7 mm, at the leading crescent's aft
   corner (1.8248, 0.4200, 0.8278) with the wheel at 12 degrees and full bump.
   That number, not the 8 mm axial margin, is what the spec row carries. */
const SPATZ = 1.0832 - 0.008;
const SPATF = 1.8168 + 0.008;
const SPATY = 0.420;            /* the rocker top: the car's lower body line */

/* x where the arch lip crosses the rocker line, aft (side -1) or forward */
function archEnd(side) {
  let lo = side < 0 ? 0.45 : P.axleF, hi = side < 0 ? P.axleF : 2.10;
  for (let k = 0; k < 44; k++) {
    const m = (lo + hi) / 2;
    if ((bottomY(m) > SPATY) === (side < 0)) hi = m; else lo = m;
  }
  return (lo + hi) / 2;
}

/* One crescent: a closed thin section swept along x, outer face on the skin
   line, 10 mm of return, both ends collapsed so the panel is a solid with no
   open edge anywhere. */
function crescent(x0, x1, n) {
  const secs = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const top = Math.max(bottomY(x), SPATY);
    const t = i === 0 || i === n ? 0 : 0.010;
    const outer = [], inner = [];
    for (let j = 0; j <= 3; j++) {
      const y = top - ((top - SPATY) * j) / 3;
      const z = skinZ(x, y) - 0.002;
      outer.push([x, y, z]);
      inner.push([x, y, z - t]);
    }
    /* the section runs inner bottom to top, then outer top to bottom, and
       that order is not cosmetic: swept along +x the other way round it
       winds the outer face inward, and a DoubleSide material then shades the
       one surface anyone looks at as if it were lit from inside the arch.
       Signed volume is the check, and it has to come out positive. */
    secs.push(inner.concat(outer.slice().reverse()));
  }
  return lib.shell(lib.crease(lib.loft(secs, M.paint, true), 34));
}

export function build() {
  const sys = new THREE.Group();
  buildStructure(sys);
  buildShell(sys);
  return sys;
}

function buildShell(sys) {
  /* ── monoform skin ─────────────────────────────────────────────────────
     THE NOSE IS ONE PANEL, from the bottom edge on one flank, over the crown,
     to the bottom edge on the other. It used to be a flank loft and a bonnet
     loft meeting at ring 3, and two meshes always break: swept as face
     dihedrals that seam turns 10.5 to 26.2 degrees around the nose, so the
     old build ran a hard crease straight down the one surface a monoform
     exists to make continuous. The tail is split at ring 3 instead of at
     station 8 for the same reason read the other way: there the ring seam
     turns 2.4 to 7.7 degrees while the station line turns 14.7 to 26.7. Put
     the mesh boundary where the surface is flat, not where the table has a
     point. ── */
  const skin = lib.part('skin', [0, 0.62, 0]);
  skin.add(panel([0, RI(COWL)], [0, CI(12)]));            /* nose, bonnet, fenders */
  skin.add(panel([RI(COWL), CUT[0]], FL));                /* fixed fender, hinge strip */
  skin.add(panel([RI(COWL), CUT[0]], FR));
  skin.add(panel([CUT[0], CUT[2]], SILLL));               /* sill under the cuts */
  skin.add(panel([CUT[0], CUT[2]], SILLR));
  skin.add(panel([CUT[2], RI(LAST)], FL));                /* rear quarters to the tail */
  skin.add(panel([CUT[2], RI(LAST)], FR));
  skin.add(panel([RI(DECK), FCUT], UP));                  /* deck ahead of the flap */
  sys.add(skin);

  /* ── glass canopy band, lofted 8 mm proud of the same stations and 1.2
     percent wider so the two surfaces never fight for the same pixel, and now
     resolved on the same subdivision as the metal it runs into ── */
  const canopy = lib.part('canopy', [0, 1.05, 0]);
  const glassBand = RINGS.slice(COWL, DECK + 1).map((r) =>
    r.slice(3, 10).map((p) => [p[0], p[1] + 0.008, p[2] * 1.012]));
  canopy.add(lib.shell(lib.loft(glassBand, M.glass, false,
    { rowSub: 2, colSub: 2, interp: 'linear' })));
  sys.add(canopy);

  /* ── light bands closing both faces ────────────────────────────────────
     Both apertures are trapezoids inset 30 mm from the face outline at their
     own heights, so each window is conformal to the face it sits in rather
     than a rectangle that overhangs it.

     Front: y 0.545 to 0.595, where the nose face measures 0.558 and 0.496
     half-wide, so the window is 1.052 m across the bottom and 0.929 across
     the top. Two 84-pixel matrices sit 9 mm behind the plane as a real
     lattice with a cross bank behind the bars, because a matrix headlamp read
     as one flat rectangle is the thing this pass exists to stop.

     Rear: y 0.650 to 0.720, where the Kamm face measures 0.668 and 0.660, so
     the guide is 1.276 m across and genuinely full width. It sits low enough
     that the deployed flap, whose trailing edge hangs to y 0.738 at the tips,
     never crosses it. ── */
  const lbF = lib.part('lightbands', [1.15, 0.1, 0]);
  const matrix = new THREE.Group();
  for (const s of [-1, 1]) {
    const m = lib.grille(0.420, 0.040, 0.010, M.lamp,
      { bars: 21, cross: 4, barW: 0.0055, chamfer: 0.0011 });
    m.position.x = s * 0.230;
    matrix.add(m);
  }
  lightFace(lbF, skin, 0, 1,
    [[0.545, -0.526], [0.595, -0.464], [0.595, 0.464], [0.545, 0.526]], [0.570, 0], matrix);
  sys.add(lbF);

  const lbR = lib.part('lightbands', [-1.15, 0.1, 0]);
  lightFace(lbR, skin, RI(LAST), -1,
    [[0.650, -0.638], [0.720, -0.630], [0.720, 0.630], [0.650, 0.638]], [0.685, 0],
    lib.grille(1.230, 0.052, 0.010, M.lampRed,
      { bars: 41, cross: 2, barW: 0.008, chamfer: 0.0016 }));
  sys.add(lbR);
  /* the marque, and the only one on the car: a nose carrying a full-width
     matrix has nowhere honest to put a second. The Kamm face is planar, so
     4 mm of extrusion stands 4 mm proud of it everywhere, which is the whole
     reason the neighbouring body needed 4.4 mm on a cone. It rides with the
     painted fascia it is bonded to, not with the lamp above it. */
  const mark = lib.badge(CHEVRON, 0.004, M.alu);
  mark.rotation.y = -Math.PI / 2;
  mark.position.set(STATIONS[LAST][0], 0.545, 0);
  skin.add(mark);

  /* ── active Kamm flap, drawn deployed ───────────────────────────────────
     The flap IS the deck's last 190 mm, not a blade bolted on top of it, so
     it is built as the master grid's own slice aft of the hinge with every
     point rotated 12 degrees about the hinge line at its own column. The
     leading edge therefore stays exactly on the deck it came from and the
     trailing edge falls away, which is what the mechanism does.

     The panel it replaces was a 1.30 m slab at a constant y 0.945 centred on
     x -2.27. The deck crown at that station is 0.9174, and at the slab's own
     tips the surface is at 0.790, so the flap floated between 28 and 155 mm
     above the body it was supposed to be part of, and its two hinge blocks
     stood 33 mm off the deck.

     Because the panel moves and the bodywork around it does not, the aperture
     it leaves has to be closed. The skirt is a ribbon between the flap's three
     free edges and where those edges sit on the fixed deck, and it collapses
     to nothing at the hinge. Without it a low rear view looks straight into
     the tail through a 40 mm slot. ── */
  const flap = lib.part('kammflap', [-1.0, 0.45, 0]);
  const DEP = (12 * Math.PI) / 180;
  const c0 = CI(SEAM), c1 = CI(12 - SEAM);
  const gp = (i, j) => {
    const k = (i * SHELL.cols + j) * 3;
    return [SHELL.pts[k], SHELL.pts[k + 1], SHELL.pts[k + 2]];
  };
  const drop = (i, j) => {
    const [x, y, z] = gp(i, j);
    const [hx, hy] = gp(FCUT, j);
    const dx = x - hx, dy = y - hy;
    return [hx + dx * Math.cos(DEP) - dy * Math.sin(DEP),
            hy + dx * Math.sin(DEP) + dy * Math.cos(DEP), z];
  };
  const rows = [];
  for (let i = FCUT; i <= RI(LAST); i++) {
    const sec = [];
    for (let j = c0; j <= c1; j++) sec.push(drop(i, j));
    rows.push(sec);
  }
  flap.add(lib.shell(lib.crease(lib.loft(rows, M.paint), 34)));
  const edge = [], seat = [];
  for (let i = FCUT; i <= RI(LAST); i++) { edge.push(drop(i, c0)); seat.push(gp(i, c0)); }
  for (let j = c0 + 1; j <= c1; j++) { edge.push(drop(RI(LAST), j)); seat.push(gp(RI(LAST), j)); }
  for (let i = RI(LAST) - 1; i >= FCUT; i--) { edge.push(drop(i, c1)); seat.push(gp(i, c1)); }
  flap.add(lib.shell(lib.crease(lib.loft([seat, edge], M.paintDark), 34)));
  sys.add(flap);

  /* ── front wheel spats ─────────────────────────────────────────────────
     Two crescents per side, lying ON the skin line rather than standing off
     it: the outer face is skinZ, which is halfWidth above the arch lip and
     the flank's own closing tangent below it, so each panel reads as the
     bodywork continuing down into the arch and stopping where the wheel needs
     the room. The pair they replace were flat plates at |z| 0.934, 32 mm
     proud of a flank 0.902 wide and directly over a tyre whose outer face is
     at 0.9025: a bolt-on look, and a clearance that only survives while the
     wheel never turns.

     Both lower edges sit on the rocker line at y 0.420, so the two crescents,
     the rocker and the loft's own rear skirt read as one lower body line the
     length of the car. ── */
  const spat = lib.part('spats', [0.4, -0.05, 0.75]);
  const VENT = 0.062;                     /* the louvre bank owns the last 62 mm */
  spat.add(crescent(archEnd(-1), SPATZ - VENT, 7));
  spat.add(crescent(SPATF, archEnd(1), 6));
  /* Three louvres in the 62 mm the trailing crescent gives up at its forward
     end, which is directly behind the wheel and the one place on this arch
     where an outlet works. The bank stands in a real opening between the panel
     and the swept solid, so it bleeds into the arch rather than onto a closed
     pocket, and it is CARRIED by the sill rail below rather than hanging in
     the opening. Rebuilt without the rail and swept vertex by vertex, not one
     of the three blades had a single vertex inside any other solid: the two
     forward ones sat 8.1 mm from their neighbour and nothing else, and the
     aftmost came within 2.0 mm of the rocker, which belongs to another module.
     That is the floating-part defect this project keeps catching.

     THE BLADE ANGLE IS SET BY THE SIGHTLINE, NOT BY TASTE. A 26 mm blade at
     0.50 rad projects 21.2 mm across a 19 mm pitch, which sounds opaque and
     is not: three of them cover 53 mm of a 62 mm opening, and swept with
     horizontal rays across the car through the arch band, 41 of 198 came out
     the other side. That is a hole you can see daylight through, and the old
     flat plate over the tyre had none. At 0.75 rad the same blade projects
     25.0 mm, and three on a 23.5 mm pitch overlap by 1.5 mm each and reach
     from inside the panel's own aft end to the swept limit. */
  const LVA = 0.75, LVP = 0.0235;
  const LVW = 0.005 * Math.cos(LVA) + 0.013 * Math.sin(LVA);
  const LVZ = 0.005 * Math.sin(LVA) + 0.013 * Math.cos(LVA);
  for (let i = 0; i < 3; i++) {
    const x = SPATZ - LVW - i * LVP;
    const yt = bottomY(x), yc = (yt + SPATY) / 2;
    spat.add(acbox(0.010, yt - SPATY - 0.004, 0.026, 0.002, M.plasticLt,
      x, yc, skinZ(x, yc) - 0.002 - LVZ, 0, 0, LVA));
  }
  /* The sill rail the blades stand on: the lower body line continued across
     the opening, running 82 mm from x 0.9912 to 1.0732, of which the first
     22 mm is back under the crescent. The overlap is that long because the
     crescent's section tapers to nothing over its last 36 mm, so a rail that
     stopped at the visible edge would meet a shell 0.05 mm thick and read as
     touching without touching. At x 0.9912 the crescent is 6.1 mm through and
     the rail's top face lands inside it: six rail vertices finish inside the
     crescent and six of every blade's finish inside the rail.

     The rail follows the flank's own taper over its run, which falls 7.8 mm
     across those 82 mm, so it lies parallel to the skin rather than crossing
     it. Its outer face is held 3.5 mm inboard of the flank line, which is
     1.5 mm behind the crescent's own face: enough that the two never share a
     plane, and enough that the buried 22 mm stays hidden behind the panel it
     is carried by. */
  const RX0 = SPATZ - VENT - 0.022, RX1 = SPATZ - 0.002, RY = SPATY + 0.005;
  const RZ0 = skinZ(RX0, RY) - 0.0155, RZ1 = skinZ(RX1, RY) - 0.0155;
  spat.add(lib.shell(acbox(Math.hypot(RX1 - RX0, RZ1 - RZ0), 0.010, 0.024, 0.002,
    M.paint, (RX0 + RX1) / 2, RY, (RZ0 + RZ1) / 2,
    0, 0, Math.atan2(-(RZ1 - RZ0), RX1 - RX0))));
  /* two bolts per crescent: the manual says remove them for chains, so the
     heads are the honest evidence that a minute per side is all it takes.
     Seated on the outer face itself, axis along the local surface normal. */
  for (const [bx, by] of [[0.920, 0.448], [0.985, 0.470], [1.855, 0.470], [1.925, 0.448]]) {
    const f = lib.fastener(0.0038, M.steel, 'hex');
    f.rotation.x = Math.PI / 2;
    f.position.set(bx, by, skinZ(bx, by) - 0.002);
    spat.add(f);
  }
  sys.add(spat);
  sys.add(mirrorZ(spat));

  /* ── venturi floor lip ─────────────────────────────────────────────────
     The lip's LOWER face is the number the whole part is tuned on, so it is
     set from lib.plate's own convention rather than from the plate's centre:
     the helper puts its slab between y + t/2 and y + 3t/2, so a 16 mm section
     at y 0.102 runs 0.110 to 0.126 and the ground gap is the published
     110 mm. Placed at 0.112 it was 120. ── */
  const vent = lib.part('venturi', [1.05, -0.35, 0]);
  const lip = lib.plate(0.26, 1.32, 0.016, 0.08, M.carbon);
  lip.position.set(2.235, 0.102, 0);
  vent.add(lib.shell(lip));
  /* the raked valance the lip bolts to: without it the lip reads as a
     floating plate, which is the defect this class of part keeps repeating */
  vent.add(lib.shell(acbox(0.016, 0.20, 1.32, 0.005, M.carbon, 2.088, 0.216, 0, 0.22)));
  for (const s of [-1, 1]) {
    vent.add(acbox(0.28, 0.05, 0.012, 0.003, M.carbon, 2.16, 0.19, s * 0.55));
  }
  /* shear-away fasteners on the lip's top face at y 0.126, inboard of the
     side dams. A carbon lip working at a 110 mm gap is a strike item: it
     bolts on, and the heads say so. */
  for (const z of [-0.42, -0.16, 0.16, 0.42]) {
    const f = lib.fastener(0.0040, M.steel, 'hex');
    f.position.set(2.190, 0.126, z);
    vent.add(f);
  }
  sys.add(vent);

  /* ── flush doors ───────────────────────────────────────────────────────
     The skins ARE the master surface between two shutlines, which is what
     this part's own text has claimed since it was written and what the
     geometry now does. Each door carries the far wall and lip of the cut in
     front of it and the near lip, wall and floor of the cut behind it, so the
     channel between two panels is closed: two lit walls and a dark floor
     instead of a painted line. ── */
  const doors = lib.part('doors', [0.08, 0, 0.85]);
  doors.add(panel([CUT[0], CUT[1]], DOORR));
  doors.add(panel([CUT[1], CUT[2]], DOORR));
  /* capacitive strips, 100 mm ahead of each door's own trailing cut and
     seated on the surface instead of 14 mm outside it */
  for (const x of [0.175, -0.900]) {
    doors.add(acbox(0.140, 0.024, 0.012, 0.004, M.alu, x, 0.800,
      halfWidth(x, 0.800) + 0.005));
  }
  /* camera pods on 90 mm stalks, on the fixed fender where a mirror belongs,
     with the stalk root taken off the flank it grows out of */
  const PX = 1.020, PY = 0.960, PZ = halfWidth(PX, PY);
  doors.add(acbox(0.016, 0.014, 0.090, 0.003, M.plastic, PX, PY, PZ + 0.043));
  doors.add(acbox(0.052, 0.030, 0.030, 0.006, M.sensor, PX, PY, PZ + 0.101));
  sys.add(doors);
  sys.add(mirrorZ(doors));
}
