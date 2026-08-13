/* Gen 5 body: the design-to-cost Kammback. The Gen 2 aero silhouette
   (body-aero.js) carried line for line, and the skin under it redesigned
   for the invoice: steel stampings in fewer, larger draws, a painted steel
   roof where the glass canopy was, a fixed moulded intake in place of the
   shutter bank, unpainted TPO where the fleet meets the world, four cheap
   rectangular lamps, and open rear arches. Same invariant structure as
   every shell (STRUCT_META / buildStructure from body.js). 377 kg against
   body-aero's 370, Cd 0.185 against 0.17, every count and kilogram priced.
   Preset partners per design/gen5.md: thermal-5 (the fixed intake feeds
   its smaller radiator), interior-5 (cabin line, camera-mirror displays).
   No em dashes anywhere. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';
import { STRUCT_META, buildStructure, abox, profile, mirrorZ } from './body.js';

export const SYSTEM = {
  id: 'body-5',
  name: 'Body · Gen 5 design-to-cost',
  color: 0x9aa8b4,
  explode: [0, 1.7, 0],
  blurb: 'The Gen 2 Kammback redesigned to cost: same wind where the wind pays, cheaper skin everywhere else. Steel draws instead of bonded aluminium, a painted roof under the same line, a fixed intake, unpainted bumpers, four cheap lamps, and open rear arches. 377 kg against body-aero\'s 370, Cd 0.185 against 0.17, and the ledger for every count is in the parts.',
  parts: {
    ...STRUCT_META,
    skin: {
      name: 'Kamm shell stampings',
      tagline: 'Six steel draws where the aero car bonded ten aluminium panels: the wind reads shape, not substrate.',
      mass: 63,
      specs: [
        ['Material', 'Galvanised steel, 0.65 to 0.70 mm'],
        ['Stampings', '2 major draws per side, plus deck and Kamm face'],
        ['Counterpart', 'body-aero skin + tail: 51 kg bonded AA6016'],
        ['Mass penalty', '+12 kg for steel'],
        ['Tooling', 'Conventional draw dies; 8 to 12 million dollars less to cut'],
        ['Rear arches', 'Open; skirts deleted, 0.010 Cd surrendered'],
      ],
      how: 'The lines are body-aero\'s, unmoved: nose tip at (2.30, 0.72), cowl at (1.05, 0.92), Kamm face at x -2.28, half-width 0.94 at the doors, and the 4 to 8 degree boat-tail in plan. What changed is under the paint. Aero cares about shape and surface continuity; it cannot tell 0.68 mm of galvanised steel from 0.9 mm of AA6016, so the substrate switches to the metal that costs a quarter as much per kilogram and forms in any press shop on earth. The side regroups into two large draws, fender and bodyside, where body-aero bonded four panels a side: fewer flanges, fewer bond lines, fewer fixtures, and a die bill 8 to 12 million dollars lighter because four die sets are never cut.\n\nThe rear arches are the visible deletion. body-aero skirted them for 0.010 of Cd; this shell opens them and surrenders those ten counts, because in fleet service a skirt is a consumable: kerbed rims throw wheel weights against it, tyre bays remove it wrong, roadside assistance pries it, and every event is an 80 dollar panel plus a day off the road. The honest ledger both ways: steel adds 12 kg here while the deleted aero devices give about 20 kg back across the shell, which is how the whole car sits only 7 kg over the aero shell at 377, and the ten counts cost 2 to 3 percent of consumption at motorway speed but under 1 percent at the 25 km/h average this car is bought for. Sheet steel alone gives roughly 200 dollars a car back before the tooling is counted.',
      why: 'Two cars can both be correct. body-aero spends process to buy counts because it is the optimization argument; this shell spends counts to buy process because it is the economics argument. Steel where aero does not care, aluminium and glass only where it does, and the silhouette, the one thing the wind actually audits, carried unchanged.',
      fail: [
        'Steel rusts where aluminium chalked: every hem, cut edge, and stone chip is a corrosion clock, and the galvanise plus seam sealer are doing work body-aero never asked of them.',
        'Large shallow steel draws oil-can; the deck carries mastic pads, and a skipped pad drums at motorway speed exactly as body.js warned for its own deck.',
        'The 12 kg is a straight range tax, about half a percent, bought knowingly with the die savings.',
      ],
      explode: [0, 0.1, 0.65],
    },
    roof: {
      name: 'Painted steel roof',
      tagline: 'The canopy\'s centre facet in 0.65 mm steel: the same line over the cabin, none of the sky.',
      mass: 12,
      specs: [
        ['Panel', '0.65 mm steel, two bows, bonded to the cage rails'],
        ['Line', 'Peak 1.38 at x 0.15 falling to 1.31 at -0.75, carried'],
        ['Counterpart', 'body-aero canopy roof facet, cell-cast laminated glass'],
        ['BOM saving', 'Roughly 400 to 600 dollars at the panel'],
        ['Insurance', 'The most expensive panel claim on the car, deleted'],
        ['Cabin cost', 'Headliner at 1.28 m; the sky is gone'],
      ],
      how: 'The panel follows the canopy\'s middle facet exactly, peak 1.38 m at x 0.15 falling to 1.31 m at x -0.75, so flow crossing from the windscreen header to the backlight sees the line it saw on body-aero, now with two bonded glass edges instead of none. Two roll-formed bows underneath stop the oil-canning a metre-wide 0.65 mm pressing invites, and the panel bonds to the same boron cage rails the glass did. Roof crush was always the cage\'s job, on this car as on every shell since body.js said so, so swapping the panel changes no crash number.\n\nThe money is blunt. A cell-cast laminated facet with its sputtered IR stack is a three-figure part that needs careful handling and a glass line; a steel pressing with a coat of body colour is tens of dollars. Insurance sees it too: the canopy was the most expensive single panel on the car by body-aero\'s own admission, and its claim rate prices every policy, so the premium drops when the roof becomes the panel that never claims. The honest penalty is the one you feel from the back seat: a headliner at 1.28 m instead of tinted sky, a cabin that reads smaller than it measures. interior-5\'s fleet cabin was priced for exactly that customer, the one who is paid to be in the car; and interior-5\'s solution-dyed fabric, chosen against the glass roof\'s UV load, is merely over-specified under steel, which is the right direction for a carried part.',
      why: 'Glass overhead was never structure; body.js priced it honestly at 8 kg over an aluminium skin and bought headroom and light with it, and body-aero doubled down for flow continuity. Both were experience purchases. A fleet invoice does not buy experience, it buys the line the wind needs at the lowest cost per panel, and that is a steel pressing.',
      fail: [
        'A steel roof drums: the bows and mastic pads are NVH treatment, and a skipped pad is a motorway resonance the glass never had.',
        'The bonded seam at the cage rails is a corrosion cell if the primer is breached; the glass bond line never rusted.',
        'The cabin-feel penalty is real and shows in rider scores; the honest answer is that the person paying for the car and the person riding in it are different people.',
      ],
      explode: [0, 0.85, 0],
    },
    glazing: {
      name: 'Windscreen and backlight',
      tagline: 'The two panes the law and the driver need, cut free from the canopy that fused them.',
      mass: 21,
      specs: [
        ['Windscreen', '2.1 + 0.76 acoustic PVB + 1.6 mm, 63 degree rake'],
        ['Backlight', '3.85 mm tempered'],
        ['Counterpart', 'body-aero canopy: one glazing, 42 kg, one bond'],
        ['Bond', 'Two PU beads, about 7 m against the canopy\'s 11'],
        ['Camera zone', 'Optical-tolerance window above the mirror, carried'],
        ['Replacement', 'A 500 dollar windscreen vs condemning a canopy'],
      ],
      how: 'Both panes sit on the canopy\'s own facet angles: the windscreen runs the cowl line from (1.05, 0.92) to the peak at (0.15, 1.38), the backlight falls from (-0.75, 1.31) to (-1.70, 0.97). The windscreen keeps the full body-aero stack, acoustic PVB and the optical camera zone included, because the 63 degree rake and the ADAS camera are carried and physics does not discount. The backlight drops to tempered: no acoustic duty at the tail, no camera looking through it, and a rescue tool needs one pane it can actually shatter, the same honest argument body.js made for rear side glass.\n\nSeparation is the economics. A windscreen is the most replaced panel on any fleet car; stone chips retire them on a schedule measured in one or two hundred thousand kilometres. Standalone, that event is a 500 dollar pane and a camera recalibration; fused into a canopy it meant condemning the most expensive panel on the car, which body-aero\'s own fail list conceded. The tempered backlight is a 150 dollar part. Two ordinary sag-formed panes also delete the cell-cast tooling: no 620 degree precision moulds, no three-facet lamination, just glass any supplier quotes from a catalogue.',
      why: 'Glass where you must, steel where you may. The two panes that remain each have a job no other material does, seeing out and being seen through by a camera; the facet between them had no such job once the sky stopped being a requirement, and it was the facet that cost the most.',
      fail: [
        'The 63 degree rake\'s optical path carries over, night-time double imaging and all; the rake is the silhouette\'s and the silhouette is not for sale.',
        'A tempered backlight fails totally: one stone and the aperture is open to the weather until the pane arrives, where laminated would have limped on.',
        'Every windscreen swap forces ADAS recalibration, and a fleet does many; the half-degree-equals-metres warning from body.js is a depot procedure here, not a footnote.',
      ],
      explode: [0.5, 0.65, 0],
    },
    nose: {
      name: 'Steel clamshell nose',
      tagline: 'body-aero\'s sealed nose was already the cheap kind of aero: carry the shape, swap the metal.',
      mass: 18,
      specs: [
        ['Panel', 'One steel clamshell draw, 0.65 mm'],
        ['Counterpart', 'body-aero nose: 15 kg AA6016'],
        ['Penalty', '+3 kg; about 60 dollars a car back'],
        ['Stagnation line', 'y 0.50 on the sealed face, carried'],
        ['Splitter', 'Deleted: front lift returns at speed'],
        ['Head clearance', '70 mm to hard points, carried'],
      ],
      how: 'The stagnation line at half a metre, the single line from tip (2.30, 0.72) to cowl (1.05, 0.92), and the sealed grilleless face all carry over, because a sealed nose is the rare aero device that is also the cheap option: an EV never needed the grille, and the shape costs the same to press in either metal, so it is pressed in the cheaper one. The pedestrian mechanics carry too: cone-waffle inner, 70 mm of stroke over the frunk tub and casting edges, and a steel outer whose dent stiffness comes cheaper at equal gauge.\n\nTwo things left the nose. The full-width light blade goes, replaced by the lamps part, taking its housing trench out of the cleanest air on the car and its several-hundred-dollar replacement out of the parts book. And the splitter under it is deleted entirely: the carbon lip, its shear-away brackets, and its 5 kg were tuned to hold the front axle at zero lift at 130 km/h, and a car whose duty cycle averages 25 km/h rents that stability for hours it never drives. Front lift goes slightly positive at motorway speed and the steering gets a shade lighter at 130; the aero map accepts it, the content states it, and the air-curtain job the splitter ducts did is handled by plain moulded slots in the fascia, Gen 1 style (body.js).',
      why: 'The nose is where body-aero\'s logic and Gen 5\'s logic agree: delete the grille, seal the face, place the stagnation line low. Where they part is anything that exists only above 100 km/h, and everything deleted here fails exactly that test.',
      fail: [
        'A steel bonnet marks in hail and under careless palms, same physics as body.js\'s aluminium but cheaper per repaint, which is the fleet consolation.',
        'Steel bolted to the aluminium casting is a galvanic couple at every fastener; isolation washers carry over from the structure\'s own warranty list.',
        'No splitter means crosswind and truck-wake composure at motorway speed sits a shade below body-aero; under 80 km/h no driver will feel it, and above it the honest answer is that the flagship exists.',
      ],
      explode: [1.05, 0.12, 0],
    },
    intake: {
      name: 'Fixed moulded intake',
      tagline: 'One glass-filled moulding where five slats cycled: nothing to jam, seize, ice, or replace.',
      mass: 1,
      specs: [
        ['Aperture', '640 x 220 mm, ducted to the thermal-5 core'],
        ['Counterpart', 'body-aero shutters: 5 slats, 1 actuator, 2 kg'],
        ['Cd cost', '+0.003 weighted; 5 to 6 counts at 120 km/h'],
        ['Hardware deleted', 'Actuator, linkage, position sensor: 30 to 40 dollars'],
        ['Sizing case', 'Hot-day DC charge (thermal-5, 16 kW core)'],
      ],
      how: 'One glass-filled PP moulding with three fixed vanes, sealed to thermal-5\'s 620 x 400 mm radiator core. The aperture is sized once, for the worst hour: a hot afternoon on a DC charger with the single fan at full duty, per thermal-5\'s own sizing. That is just over half the open area Gen 1\'s 880 x 500 core needed, which is what keeps a fixed hole honest: battery-5\'s heat tolerance shrank the radiator, and the radiator shrank the hole in the nose.\n\nThe counterpart is body-aero\'s shutter bank, closed more than 85 percent of highway time and worth 0.010 of Cd when it was. A fixed aperture pays 5 to 6 of those counts back at 120 km/h, thermal-5 books the same physics as 2 to 3 percent of motorway range, and weighted over a duty cycle that averages 25 km/h the shell\'s ledger carries it at 3 counts. Against that: one actuator, one linkage, one position sensor, one cold-start self-test, and one class of winter ice-jam warranty claim, all deleted for 30 to 40 dollars a car and roughly a kilogram. body-aero\'s spring-fails-open logic also becomes moot: a moulding cannot fail toward the battery.',
      why: 'A shutter sizes the intake per minute and is the right answer on a car that lives at motorway speed; body-aero called it the cheapest 0.01 of Cd on the car and was right for its car. A fleet car buys the opposite theorem: the cheapest moving part is the one that does not move, and cooling drag at city speed is a rounding error against rolling resistance.',
      fail: [
        'The worst-hour aperture is open every hour: the drag is paid at every speed, and above 100 km/h the flagship\'s shutters are simply better.',
        'Leaves and road grit collect on fixed vanes; the service answer is a hose, not an actuator sweep, which is the trade in one sentence.',
        'On a 45 degree afternoon the intake is not the limit and neither is the fan: thermal-5\'s charge derate owns that day, and the intake can be neither blamed nor improved.',
      ],
      explode: [1.3, -0.08, 0],
    },
    cladding: {
      name: 'TPO cladding',
      tagline: 'Moulded-in black on every surface the fleet actually hits: paint is a cost per square metre, and bumpers meet the world.',
      mass: 12,
      specs: [
        ['Material', 'TPO, 2.5 to 3.0 mm, colour moulded in'],
        ['Coverage', 'Both fascias, rockers, rear valance: about 4 m²'],
        ['Paint deleted', '60 to 100 dollars a car, plus every respray claim'],
        ['Counterpart', 'body-aero painted nose face and tail valance; body.js painted fascias'],
        ['Rear ramp', 'Moulded upsweep in the valance; vaned diffuser deleted'],
        ['Repair', 'A scuff sands out; a panel swaps for 60 to 90 dollars'],
      ],
      how: 'Same polymer as body.js\'s fascias, minus the paint shop. Painting TPO needs an adhesion promoter, a colour-matched base, a clear coat, and a paint-line slot, 60 to 100 dollars per car across both ends, and the result ages apart from the metal it neighbours, as body.js\'s own fail list admits. Moulded-in black needs none of it, hides scuffs in its own colour to full depth, and turns the most-hit panels on the car into the cheapest per event. The rockers get the same treatment because they live in the stone and kerb blast; painted metal there would be chipped to primer in a fleet year.\n\nThe rear valance carries the underbody\'s exit. body-aero bolted a 7 kg vaned carbon diffuser and earned real counts from a 13 degree ramp near the separation limit; this valance moulds a shallower upsweep into the same TPO piece for nothing, keeps most of the flat floor\'s pressure recovery, and gives back about 2 counts against the vaned version. It also deletes the diffuser\'s failure modes wholesale: no bolt-on carbon at the lowest rear point of the car, no driveway-rake sacrifices, no vanes to stall. The air-curtain slots for the front wheels are moulded into the front fascia the same way, plain ducts doing the splitter\'s tidying job at zero part count.',
      why: 'Separating the elastic cheap skin from the structure is one of the oldest good ideas in car design, and body.js said so; Gen 5 just refuses to paint it. On a car bought per kilometre, cladding is priced per incident, and moulded-in black is the lowest number that field has ever produced.',
      fail: [
        'Unpainted TPO chalks grey over years of UV; on a fleet car that reads as honest wear, on a driveway it reads as cheap, and this car knows which customer it has.',
        'A deep gouge shows white and stays; sanding hides scuffs, not gashes, and the answer is the 60 to 90 dollar panel.',
        'The moulded ramp is tuned once for one ride height; it is 2 counts short of the vaned diffuser on its best day and it has no best day, only average ones.',
      ],
      explode: [1.15, -0.05, 0],
    },
    doors: {
      name: 'Steel doors and camera pods',
      tagline: 'Framed windows, a handle you can grab with a glove, and the one Gen 2 gadget that pays fleet rent.',
      mass: 50,
      count: 4,
      specs: [
        ['Skins', 'Steel, 0.7 mm, hemmed over steel inner frames'],
        ['Windows', 'Framed tempered drop glass, plain channel seals'],
        ['Handles', 'Mechanical flush pulls, cable latch'],
        ['Mirrors', 'Camera pods carried: 0.008 Cd (body-aero)'],
        ['Counterpart', 'body-aero flush doors: 46 kg bonded'],
        ['Penalty', '+4 kg net; steel +8, tempered framed glass -4'],
      ],
      how: 'A stamped steel outer hemmed over a stamped steel inner with a visible window frame: door construction as every press shop has built it for seventy years, and that is the argument. The frame is what the frameless body-aero door paid to delete: with a frame, the glass is cheap tempered running in a plain channel, there is no drop-on-unlatch mechanism, no seal that must energise against a naked glass edge, and no per-door flushness calibration. The handles return as mechanical flush pulls on cable latches: body-aero\'s capacitive strip, e-latch, and the legally required backup release collapse into one 8 dollar mechanism per door that works with delivery gloves, a dead 12 V rail, and ice. The intrusion beam carries over unchanged because crash never got cheaper.\n\nThe camera pods stay, and the arithmetic says why. A pod is a 30 dollar camera in a stalk; a powered, heated, folding glass mirror is a 100 dollar mechanism per side before the wind noise. The expensive half of the camera promise, the two 5 inch displays, is already on this preset\'s invoice inside interior-5\'s dash, so the marginal cost of keeping the pods is nearly zero while the 0.008 of Cd they save is worth 1 to 3 percent of energy depending on route, 150 to 300 dollars of electricity over a 400,000 km fleet life, plus every knocked-mirror claim a 90 mm stalk avoids. Flushness on the skins is held to Gen 1\'s honest ±0.5 mm rather than body-aero\'s ±0.3: the last tenth of flushness is the most expensive tenth, and it buys a count this ledger will not pay for.',
      why: 'Doors are the most opened, slammed, kerbed, and leaned-on panels on a working car. Every deletion here removes a calibration or a mechanism that fleet duty would have worn out, and the one gadget kept is kept because its running-cost math clears the hurdle with the displays already paid for.',
      fail: [
        'Framed glass and visible pulls cost 1 to 2 counts against body-aero\'s flush doors; the ledger carries them under details and does not pretend otherwise.',
        'Steel hems rust from the inside if the sealer skips a beat; body-aero\'s bonded aluminium never had the failure, and galvanise is the mitigation, not the cure.',
        'A dead pod camera still blanks a legal field of view, same as body-aero: the display falls back to the wide view and the car nags, and the fleet answer is a spare pod in the depot drawer.',
      ],
      explode: [0.08, 0, 0.85],
    },
    lamps: {
      name: 'Rectangular lamp modules',
      tagline: 'Four sealed boxes that bolt in from outside: a parking tap costs 80 dollars, not a light blade.',
      mass: 4,
      count: 4,
      specs: [
        ['Front', '2 projector LED modules, no matrix'],
        ['Rear', '2 LED modules: tail, brake, indicator'],
        ['Counterpart', 'body-aero\'s two full-width blades'],
        ['Module cost', '60 to 90 dollars; a blade bills in the high hundreds'],
        ['Brake rise', 'Under 10 ms, carried: LED physics is free'],
        ['Aim', 'Screw adjusters at service; no levelling ECU'],
      ],
      how: 'Each front module is a single projector LED behind a plain lens in a sealed rectangular housing: 1,300 lumen low beam, a binary high beam, screw-set aim, and enough housing volume that a simple finned heatsink cools it without the thermal gymnastics body.js described for slim strips. The 84 pixel matrix is deleted along with its camera link and pixel controller: regulations price photometry, glare, and aim, not signature, and a rectangle passes the same tables the blade did.\n\nThe rear pair keeps what physics gives for free, sub-10 ms brake rise and software photometry for EU and US markets, and deletes the metre-long PMMA light guide whose uniformity was a tooling project in itself. The fleet argument is the parts book: body-aero\'s own fail list admits a parking tap that would have cost one lamp costs the whole strip, and corner taps are the most frequent claim in urban fleet service. Four independent 60 to 90 dollar modules stock in a depot drawer, swap in minutes from outside, and never total a bumper\'s worth of lighting in one event.',
      why: 'The blades were conspicuity engineering and brand in equal parts, and the brand half was real value on a flagship. A fleet buyer pays for lumens, latency, and replacement cost, and on those three axes the cheap rectangle is not a compromise, it is the optimum.',
      fail: [
        'A binary high beam is a genuine capability regression on rural night routes; the matrix\'s glare-free carving was pure safety, and this car gave it up for money, stated plainly.',
        'No auto-levelling means a loaded car aims high until the service screw is set; the depot checks it at tyre rotations.',
        'Condensation in lamp housings was chronic per body.js; boxy housings breathe better through the same membrane vents, and still fog on the wrong autumn morning.',
      ],
      explode: [1.15, 0.1, 0.25],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   Silhouette carried from body-aero.js unchanged: nose tip (2.30, 0.72) to
   cowl (1.05, 0.92), canopy peak (0.15, 1.38) now split windscreen / steel
   roof / backlight on the same facets, fastback to (-1.70, 0.97), deck to
   the Kamm face at x -2.28. Half-width 0.94 at the doors, boat-tail plan
   carried. Front AND rear arches open at R 0.43: the skirts are gone. */

const ARCH = 0.43;

export function build() {
  const sys = new THREE.Group();
  buildStructure(sys);

  /* ── skin: fender + bodyside draws per side, deck, Kamm face ── */
  const skinSide = lib.part('skin', [0, 0.1, 0.65]);
  /* front fender draw, open arch, top edge continues the nose line */
  skinSide.add(lib.shell(profile(
    [[1.13, 0.90], [1.13, 0.647], 'arc', [2.30, 0.50], [2.30, 0.71]],
    [[1.45, 0.355, ARCH, 2.395, 0.384, true]],
    0.02, M.paint, 0.88
  )));
  /* shoulder strip along the beltline, leaned inboard */
  skinSide.add(lib.shell(abox(2.06, 0.10, 0.016, M.paint, 0.10, 0.925, 0.905, 0, 0.30)));
  /* rear quarter draw with OPEN arch: the skirt panel is deleted */
  skinSide.add(lib.shell(profile(
    [[-1.04, 0.90], [-1.04, 0.482], 'arc', [-1.86, 0.52], [-1.86, 0.90]],
    [[-1.45, 0.355, ARCH, 0.30, 2.75, false]],
    0.02, M.paint, 0.88
  )));
  /* boat-tail section pulling inboard to the Kamm corner, plan taper carried */
  skinSide.add(lib.shell(abox(0.42, 0.40, 0.02, M.paint, -2.09, 0.67, 0.885, 0, 0.07, -0.14)));
  sys.add(skinSide);
  sys.add(mirrorZ(skinSide));

  /* deck: closes the tail between backlight and Kamm face */
  const deck = lib.part('skin', [-0.2, 0.55, 0]);
  deck.add(lib.shell(abox(0.60, 0.014, 1.30, M.paint, -1.99, 0.925, 0, Math.atan2(-0.09, -0.58))));
  sys.add(deck);

  /* Kamm face stamping with corner wraps */
  const kamm = lib.part('skin', [-0.95, 0.15, 0]);
  kamm.add(lib.shell(abox(0.024, 0.33, 1.46, M.paint, -2.285, 0.715, 0)));
  for (const s of [-1, 1]) {
    kamm.add(lib.shell(abox(0.20, 0.34, 0.02, M.paint, -2.225, 0.715, s * 0.795, 0, 0, -s * 0.75)));
  }
  sys.add(kamm);

  /* ── roof: painted steel panel on the canopy's centre facet, two bows ── */
  const roof = lib.part('roof', [0, 0.85, 0]);
  roof.add(lib.shell(abox(0.91, 0.016, 1.14, M.paint, -0.30, 1.345, 0, Math.atan2(-0.07, -0.90))));
  roof.add(abox(0.05, 0.018, 1.06, M.steel, 0.02, 1.352, 0));
  roof.add(abox(0.05, 0.018, 1.06, M.steel, -0.62, 1.302, 0));
  sys.add(roof);

  /* ── glazing: windscreen and backlight on the canopy facet angles ── */
  const ws = lib.part('glazing', [0.5, 0.65, 0]);
  ws.add(lib.shell(abox(1.02, 0.014, 1.26, M.glass, 0.60, 1.15, 0, Math.atan2(0.46, -0.90))));
  sys.add(ws);
  const bl = lib.part('glazing', [-0.5, 0.6, 0]);
  bl.add(lib.shell(abox(1.01, 0.014, 1.00, M.glass, -1.225, 1.14, 0, Math.atan2(-0.34, -0.95))));
  sys.add(bl);

  /* ── nose: steel clamshell, sealed painted upper face; no splitter ── */
  const nose = lib.part('nose', [1.05, 0.12, 0]);
  const clam = lib.plate(1.28, 1.70, 0.014, 0.12, M.paint);
  clam.position.set(1.675, 0.82, 0);
  clam.rotation.z = -0.159;                     /* one line, tip to cowl */
  nose.add(lib.shell(clam));
  nose.add(lib.shell(abox(0.05, 0.16, 1.50, M.paint, 2.335, 0.64, 0)));
  sys.add(nose);

  /* ── fixed moulded intake: frame, three fixed vanes, short sealed duct
     toward the thermal-5 core (stays ahead of the thermalFront zone) ── */
  const intake = lib.part('intake', [1.3, -0.08, 0]);
  intake.add(abox(0.03, 0.03, 0.72, M.plastic, 2.325, 0.445, 0));
  intake.add(abox(0.03, 0.03, 0.72, M.plastic, 2.325, 0.195, 0));
  for (const s of [-1, 1]) {
    intake.add(abox(0.03, 0.28, 0.03, M.plastic, 2.325, 0.32, s * 0.345));
    intake.add(abox(0.05, 0.22, 0.012, M.plastic, 2.295, 0.32, s * 0.33));
  }
  for (let i = 0; i < 3; i++) {
    intake.add(abox(0.012, 0.045, 0.66, M.plastic, 2.325, 0.245 + i * 0.075, 0, 0.5));
  }
  sys.add(intake);

  /* ── cladding: unpainted TPO fascias, rocker strips, rear valance ramp ── */
  const cladF = lib.part('cladding', [1.15, -0.05, 0]);
  cladF.add(lib.shell(abox(0.05, 0.12, 1.56, M.plastic, 2.345, 0.515, 0)));
  for (const s of [-1, 1]) {
    cladF.add(lib.shell(abox(0.05, 0.26, 0.40, M.plastic, 2.345, 0.325, s * 0.585)));
    cladF.add(lib.shell(abox(0.24, 0.40, 0.024, M.plastic, 2.24, 0.46, s * 0.83, 0, 0, s * 0.55)));
    cladF.add(abox(0.20, 0.05, 0.012, M.plastic, 2.27, 0.20, s * 0.72));   /* air-curtain slots */
  }
  cladF.add(lib.shell(abox(0.05, 0.09, 1.50, M.plastic, 2.335, 0.155, 0)));
  sys.add(cladF);

  const cladR = lib.part('cladding', [-1.15, -0.05, 0]);
  cladR.add(lib.shell(abox(0.03, 0.22, 1.44, M.plastic, -2.29, 0.435, 0)));
  for (const s of [-1, 1]) {
    cladR.add(lib.shell(abox(0.18, 0.28, 0.02, M.plastic, -2.235, 0.44, s * 0.77, 0, 0, -s * 0.60)));
  }
  /* moulded upsweep ramp in the valance: the vaned diffuser's cheap heir */
  cladR.add(lib.shell(abox(0.58, 0.012, 1.30, M.plastic, -2.025, 0.24, 0, Math.atan2(0.18, -0.55))));
  sys.add(cladR);

  const cladSill = lib.part('cladding', [0, -0.35, 0.55]);
  cladSill.add(lib.shell(abox(2.02, 0.11, 0.018, M.plastic, 0, 0.345, 0.90)));
  sys.add(cladSill);
  sys.add(mirrorZ(cladSill));

  /* ── doors: steel skins, framed drop glass, flush pulls, camera pods ── */
  const doors = lib.part('doors', [0.08, 0, 0.85]);
  doors.add(lib.shell(abox(1.02, 0.50, 0.02, M.paint, 0.60, 0.64, 0.935, 0, 0.07)));
  doors.add(lib.shell(abox(0.98, 0.50, 0.02, M.paint, -0.41, 0.64, 0.93, 0, 0.07, -0.05)));
  const dlo = profile(
    [[0.95, 0.0], [0.32, 0.44], [-0.50, 0.43], [-1.30, 0.0]],
    [], 0.012, M.glass, 0
  );
  dlo.rotation.x = -0.50;
  dlo.position.set(0, 0.92, 0.88);
  doors.add(lib.shell(dlo));
  /* visible B-pillar window frame, leaned with the glass plane */
  doors.add(lib.shell(abox(0.05, 0.44, 0.016, M.paintDark, 0.02, 1.11, 0.777, 0, -0.50)));
  /* mechanical flush pulls */
  doors.add(lib.shell(abox(0.14, 0.03, 0.014, M.plasticLt, 0.24, 0.84, 0.947)));
  doors.add(lib.shell(abox(0.14, 0.03, 0.014, M.plasticLt, -0.82, 0.84, 0.944)));
  /* camera mirror pods, carried from body-aero */
  doors.add(abox(0.016, 0.012, 0.09, M.plastic, 1.05, 0.95, 0.955));
  doors.add(abox(0.055, 0.03, 0.03, M.sensor, 1.05, 0.95, 0.985));
  sys.add(doors);
  sys.add(mirrorZ(doors));

  /* ── lamps: four rectangular modules, mirrored front and rear pairs ── */
  const hl = lib.part('lamps', [1.15, 0.1, 0.25]);
  hl.add(abox(0.03, 0.15, 0.32, M.plastic, 2.345, 0.64, 0.55));
  hl.add(abox(0.025, 0.11, 0.26, M.lamp, 2.36, 0.64, 0.55));
  sys.add(hl);
  sys.add(mirrorZ(hl));

  const tl = lib.part('lamps', [-1.15, 0.1, 0.25]);
  tl.add(abox(0.02, 0.16, 0.30, M.plastic, -2.30, 0.71, 0.56));
  tl.add(abox(0.02, 0.12, 0.24, M.lampRed, -2.312, 0.71, 0.56));
  sys.add(tl);
  sys.add(mirrorZ(tl));

  return sys;
}
