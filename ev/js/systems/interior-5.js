/* Gen 5 interior: the fleet-durable cabin. The interior slot sat out
   Gen 2, 3, and 4 because no performance axis ran through it; the cost
   axis does. Manual seats on modular rails, physical HVAC controls under
   a smaller display, a washable floor with drain plugs where the console
   was, door cards on reusable fasteners, and a round wheel with three
   stalks on the carried Gen 1 by-wire stub. 168 kg on the ledger.
   Preset partners reconciled per design/gen5.md: body-aero.js (cabin
   line, beltline 0.92, camera-mirror pods, e-latch doors) and Gen 1
   autonomy.js (standard camera set, compute under the rear bench).
   The wear-rated replaceable fabric of the design brief lives inside the
   seat and bench parts; pedals are pure Gen 1 carry-over and say so.
   Same packaging as interior.js: driver at z -0.38, dash x 0.95..1.28,
   seats at x 0.35 and -0.75. Nothing here is shell: the cabin stays
   visible in x-ray. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'interior-5',
  name: 'Interior · Gen 5 fleet',
  color: 0xd9c08a,
  explode: [0, 1.05, 0],
  blurb: 'The cabin sat out three generations because no performance axis ran through it: drag, structure, and control all live elsewhere. Economics runs straight through the seats. 168 kg of fleet-durable interior: manual seats, physical controls under a smaller screen, a washable floor where the console was, and door cards on reusable fasteners. None of it out-drives the flagship cabin; it out-earns it.',
  parts: {
    dash: {
      name: 'Simplified dashboard',
      tagline: 'The same calm surface tooled for half the money: a welded steel tube where the magnesium casting was.',
      mass: 43,
      specs: [
        ['Crossbeam', 'Welded steel tube, 11.0 kg'],
        ['Ancestor beam', 'Cast magnesium, 6.4 kg (interior.js)'],
        ['Substrate', 'Long-glass PP, self-coloured, unwrapped'],
        ['Vents', '4 manual ball vents, zero actuators'],
        ['Airbags', 'Passenger 90 L + knee, carried'],
        ['First bending mode', 'Above 38 Hz, same target'],
      ],
      how: 'The dash still hangs everything on a beam bolted to both A-pillar bases: the display, the passenger airbag, the by-wire feedback loads, and the HVAC distribution box, which is the Gen 1 core that thermal-5 carries unchanged, because the dash was tooled around it. Gen 1 cast the beam in magnesium at 6.4 kg to save 5 kg high and forward. Gen 5 welds it from steel tube at 11.0 kg for roughly half the part cost: magnesium die casting needs dedicated tooling and a foundry that handles molten magnesium under cover gas, and its per-part price never falls far, while a bent-and-welded steel assembly comes off equipment every tier one already owns. The 38 Hz first-mode target that keeps the screen from shimmering is met either way; steel gets there by gauge instead of geometry. About 30 dollars comes off the invoice and 4.6 kg goes back on the scale, and at urban speeds with regen behind it, mass is the cheapest it ever gets.\n\nThe rest of the savings is process, not material. The TPO skin over PU foam is gone: the moulding is grained, self-coloured PP with a hard top pad, which deletes a wrapping station and a glue line from the build. Four manual ball vents replace the full-width motorised Coanda slot; Gen 1 flagged in its own fail list that the vane actuator was buried under the top pad, and a ball vent has no actuator to bury. Each one is aimed with gloved fingers and swaps from the front with a trim tool in a minute. The moulding count stays at one main piece, because Gen 1\'s squeak-and-rattle argument for few cutlines is worth more at 300,000 km, not less.',
      why: 'The Gen 1 dash was honest luxury: magnesium and foam bought grams and touch. The fleet dash keeps the engineering, beam stiffness, airbag package, and cutline discipline, and deletes the caresses. Nobody who rides in this car twice a day for money strokes the dash pad; everyone notices a rattle. Two dashboards, both correct, for two different invoices.',
      fail: [
        'Unwrapped PP reads cold in a showroom and scuffs show sooner than on a padded skin; the grain hides scratches, it does not delete them.',
        'The steel beam moves mass up and forward, exactly what Gen 1 paid magnesium to avoid; 4.6 kg is the standing bill and this generation pays it knowingly.',
        'Ball vents in fleet duty get snapped by cleaning cloths and boots; they are clip-in, front-serviceable parts because the failure is certain and only the date is unknown.',
      ],
      explode: [0.55, 0.35, 0],
    },
    controls: {
      name: 'Display and physical controls',
      tagline: 'A 9 inch screen doing what only a screen can, over knobs doing what knobs always did better.',
      mass: 5,
      specs: [
        ['Display', '9 in, 1280 x 768, bonded, fixed layout'],
        ['Ancestor', '14 in + 12 in strip, 8 kg (interior.js)'],
        ['HVAC controls', '3 detented knobs + 6 mechanical keys'],
        ['Mirror displays', '2x 5 in at the dash ends (body-aero)'],
        ['Tell-tales', 'ASIL-B island carried, 500 ms watchdog'],
        ['BOM delta', 'About 130 dollars a car returned'],
      ],
      how: 'What stays a screen is what the law and the sensors demand: the reversing view from the Gen 1 rear camera above the plate (autonomy.js) needs somewhere to draw, plus navigation and the fleet app. What returns to hardware is climate: temperature, fan, distribution, and defrost on three detented knobs and six mechanical keys, mounted on the face of the HVAC bulge and wired straight into the carried Gen 1 core behind them. The knob argument has four legs and all of them are real. Glance time: a detent is set by feel after the first shift, while instrumented studies put touchscreen climate tasks at 2 to 4 times the eyes-off-road time. Glove operation: winter and delivery gloves defeat capacitive glass and do nothing to a knob. Failure rate: a knob is a switch with a rated life in the millions of cycles, while a digitizer is a consumable. Cost: three knobs and six keys bill under 15 dollars, and the screen area they replace does not. Euro NCAP 2026 protocol pushes the same way, as Gen 1\'s display copy already conceded.\n\nThe two 5 inch panels at the dash ends are not decoration: the study body is body-5, whose doors keep the camera pods where glass mirrors would be, so the interior owns the display half of that regulatory promise. interior.js predates the pairing and never hosted them; this cabin fits them as standard because body-5 keeps the pods (they are cheap and pay their way in drag). The safety story carries over shrunken rather than deleted: an isolated ASIL-B core composites speed and tell-tales onto the 9 inch panel through the same hardware overlay, with the same 500 ms repaint watchdog Gen 1 specified, because a cheap screen inherits every safety obligation of an expensive one.',
      why: 'The 14 inch panel is the better screen: brighter, bigger navigation, room for a second occupant content pane. It is also about 130 dollars more before the larger SoC behind it, and a fleet cabin sizes a screen by what it must show, not what it could. This is the one part of Gen 5 where the argument is not even durability: most of what the big screen showed was never worth showing.',
      fail: [
        'Knob caps walk off in fleet duty; they press onto serrated shafts and cost cents, which is the correct answer to a certain loss.',
        'A 9 inch panel has no room for passenger entertainment; the passenger answer is their own phone, an honest demotion from Gen 1.',
        'A failed camera-mirror display blanks a legal field of view; like the body-aero pods it falls back to the wide view and the car nags until it is repaired.',
      ],
      explode: [0.6, 0.6, 0],
    },
    wheel: {
      name: 'Wheel and column stalks',
      tagline: 'A round urethane rim on the Gen 1 by-wire stub, and a third stalk where a menu used to be.',
      mass: 8,
      specs: [
        ['Rim', 'Round, 370 mm, moulded urethane'],
        ['Column', 'Gen 1 200 mm by-wire stub, carried'],
        ['Feedback', '8 Nm peak belt drive, carried (interior.js)'],
        ['Rack', 'Gen 1 12 kN belt drive (suspension.js)'],
        ['Stalks', '3: indicators, wipers, drive select'],
        ['Ratio', 'Variable, 1.7 turns lock to lock'],
      ],
      how: 'Steering stays by-wire because the preset carries the Gen 1 suspension and its 12 kN steer-by-wire rack (suspension.js), and the redundancy bill, two of everything as that module puts it, was paid and amortized generations ago. Reverting to a mechanical column would mean a new firewall pass-through, a new crash path, and a new rack for a car that is trying to spend less: the cheap rung here is the rung already bought. So the 200 mm column stub, the duplex sensor pack, and the 8 Nm feedback motor carry over untouched from interior.js, and the variable ratio stays because software is the one component with zero marginal cost per car.\n\nWhat changes is everything the hand touches. The rim goes back to a full circle in self-coloured moulded urethane: leather on a shared car is polished to gloss by tens of thousands of hand-hours and cannot be wiped down between shifts, and urethane can. Gen 1 already kept wipers, indicators, lamps, and horn on stalks, the things that must work blind; Gen 5 extends the principle and puts drive selection on a third column stalk, so a driver who has never sat in this car, which is every driver on day one of a shift, finds reverse where seventy years of cars put it. A stalk set bills 8 to 12 dollars. The fleet buys three and considers it the best interface money it spends.',
      why: 'The yoke answered a sight-line question this cabin no longer asks: with the cluster folded into the 9 inch panel, nothing hides behind the rim. A full circle also deletes outright the hand-over-hand punishment interior.js admitted full yokes inflicted, rather than mitigating it with a flattened bottom. The honest accounting: the yoke was solving a real problem, the problem moved, and the cheapest shape is also the shape every hired hand already knows.',
      fail: [
        'A urethane rim is cold on a winter morning and there is no heated-rim option; seat heat is where this car spends its comfort watts.',
        'A drive-select stalk can be bumped; selection is request-based and the drivetrain refuses impossible requests, so a rolling car ignores park, same logic as every by-wire selector.',
        'The by-wire failure ladder is unchanged from Gen 1: sensor disagreement drops to a fixed ratio with reduced assist, and a dead feedback motor leaves steering functional and completely numb.',
      ],
      explode: [0.45, 0.15, 0],
    },
    'front-seats': {
      name: 'Manual seats on modular rails',
      tagline: 'Same crash structure, no motors: adjustment became a lever because a lever is faster.',
      mass: 56,
      count: 2,
      specs: [
        ['Structure', 'Gen 1 frame, recliners, tracks load path, carried'],
        ['Adjustment', 'Manual slide, height ratchet, recline wheel'],
        ['Deleted', '3 motors, module, switches: 4 kg, 150 to 250 dollars a seat'],
        ['Cover', 'Contract fabric, 100k Martindale, zip panels'],
        ['Foam', 'Replaceable topper over carried base'],
        ['Mass', '28 kg per seat (Gen 1: 32)'],
      ],
      how: 'Nothing structural changed because crash loads did not get cheaper: the 12 kg frame and recliner gears, the 4 kN pretensioner path, and the tracks bolted straight to the battery crossmembers all carry over from interior.js. What left is the powertrain of a furniture item: three 25 W motors, their gearboxes, a seat module, a switch bank, and the harness between them, about 4 kg and 150 to 250 dollars a seat at BOM. A slide lever, a height ratchet pump, and a recline wheel replace them for about 40 dollars. In a one-owner car that trade is a real loss; set-once powered comfort is worth its money. In a car whose driver changes twice a day, adjustment is a between-shifts event measured in seconds, and a lever beats a 25 W motor by a factor of five on the clock.\n\nThe wear system is where the fleet money goes instead. Gen 1\'s own fail list contains the fleet timeline: foam loses around 15 percent of its height by 100,000 entry cycles, a figure a shared car reaches in a fraction of the time a commuter car would. So the cushion splits into a carried structural base and a replaceable comfort topper, and every touched surface is a zip-off panel in contract-grade fabric rated past 100,000 Martindale rubs, roughly three times the Gen 1 knit. The yarn is solution-dyed because fade is a depreciation line even under body-5\'s steel roof: the glasshouse is still large, kerbside sun works on the cabin year round, and piece-dyed cloth fades in a couple of summers either way. A soiled driver cushion cover is a 30 dollar part and a four minute depot swap. The rails are the modular half of the name: the passenger seat comes out on four fasteners and one connector, and the same bosses take a cargo shelf, so a Tuesday parcel car and a weekend shuttle are the same car. Heater mats stay, 90 W on the Gen 1 12 V parts bin (hv.js), because 50 W at the body beats hundreds of watts in the air, which is the thermal ledger\'s own arithmetic (thermal.js ran it first).',
      why: 'A power seat is the correct answer to a question this car is never asked. The BOM of one powered pair funds the entire cover-and-topper system through its first replacement cycle, and durability per dollar is the design target motors score zero on. Stated without pretence: the flagship seat is more comfortable on hour three of a motorway run, and this seat is unchanged on year three of a shift pattern. Both are correct.',
      fail: [
        'The recline wheel is slower than a motor for large adjustments and drivers who swap between this car and anything powered will notice; the choice was cost, and it is not disguised as preference.',
        'Zips replace sewn seams as the wear point; they are tucked into garages out of the load path, and a dead zip still costs a 30 dollar cover, not a retrim.',
        'Heater mats still fail at the cushion flex line exactly as Gen 1 said; the difference is the mat now sits under a zip panel instead of behind hog rings.',
      ],
      explode: [0, 0.4, 0.28],
    },
    'rear-bench': {
      name: 'Rear bench',
      tagline: 'Gen 1 bench in work clothes: same three seats, covers that unzip, trim that was never missed.',
      mass: 33,
      specs: [
        ['Fold', '60/40 split, flat load floor, carried'],
        ['ISOFIX', '2 positions + top tethers, carried'],
        ['Cover', 'Same 100k contract fabric, zip panels'],
        ['Deleted', 'Seatback carpet, map pockets, shelf trim: 3.9 kg'],
        ['Under the cushion', 'Gen 1 dual-lane compute (autonomy.js)'],
        ['Mass', '33 kg (Gen 1: 36)'],
      ],
      how: 'The platform argument carries over whole: flat footwell, 480 mm cushions across all three places, belts anchored to the body so a folded seat never takes restraint loads. The bench also keeps its tenant: the Gen 1 dual-lane computer sits under this cushion on its coolant loop (autonomy.js), and the cushion base lifts off as the service panel above it, so 450 W of winter-cabin-heating silicon is a five minute reach instead of a trim-out.\n\nThe deletions are the parts passengers wear out without ever using: seatback carpet, map pockets, and the flocked parcel-shelf trim, 3.9 kg and a set of glue stations out of the build. Against that the cover system adds 0.9 kg of zips and heavier cloth, three panels per row, and the honest net is minus three. The middle-seat truth from Gen 1 stands unimproved: the pack raises the floor, tall adults ride slightly knees-up, and a value generation does not spend money lowering it.',
      why: 'The bench was already the cheap part of the Gen 1 cabin because the battery layout did the work; Gen 5 stops dressing it as furniture. What a 300,000 km interior looks like is decided here and on the floor below: cloth chosen off abrasion charts instead of colour boards, and every surface a child seat or a Friday night can ruin priced as a part, not a repair.',
      fail: [
        'Gen 1 called the foam around the ISOFIX bars sacrificial by design; Gen 5 agrees and prices it: an outboard zip panel plus a foam biscuit, about 40 dollars fitted.',
        'Fold latches still wear into rattles at exactly the frequency coarse chip roads excite, same mechanism as Gen 1; the fleet answer is a latch check at every tyre rotation, not a better latch.',
        'A cushion base refitted in a hurry can miss its rear hooks and the first hard stop finds it; the latch handles are colour-flagged so an unseated panel shows from the door.',
      ],
      explode: [-0.25, 0.45, 0],
    },
    floor: {
      name: 'Washable floor',
      tagline: 'Carpet is a liability with a nap: one moulded tray, four drains, and a hose instead of a detailing invoice.',
      mass: 9,
      specs: [
        ['Tray', 'One-piece moulded TPE, 2.5 mm'],
        ['Drains', '4x 30 mm plugs at the footwell low points'],
        ['Console', 'Deleted: 15 kg out, walk-through cabin'],
        ['Caddy bosses', '4 threaded inserts for a bolt-in console'],
        ['Turnaround', 'Hose and squeegee, minutes not a day'],
      ],
      how: 'An interior that earns money gets things spilled in it on a schedule, and carpet amortizes none of that: a rideshare detail visit bills 100 to 200 dollars and, worse, costs a day of the car not driving. The tray is one moulded TPE piece from toe board to bench base, lipped at the sills, with four 30 mm drain plugs at the footwell low points. The rear pair sits outboard because the Gen 1 dual-lane computer lives under the bench just behind them (autonomy.js): wash water is denied any path that ends at silicon by geometry, not by care.\n\nThe deleted console is the biggest line item. Gen 1 weighed a walk-through cabin against an armrest and the armrest won its comfort clinic; a fleet re-runs the clinic with different judges. Deleting the console removes 15 kg, the cabin\'s most-soiled surfaces, Gen 1\'s own fail list has the cupholder drains clogging with sugar until coffee reaches the electronics, and the last obstacle to a straight hose line front to back. It also buys kerb-side exit across the cabin, which an urban driver uses dozens of times a week. Four threaded bosses under the tray take a 60 dollar bolt-in caddy for operators who want cupholders back, which is what modular means when it is real.',
      why: 'This is the purest part of the generation: it adds nothing a spec sheet can see and attacks the two numbers the invoice does see, cleaning cost per week and downtime per incident. The flagship carpet is nicer in every showroom way and would not survive a month of this duty. Both cars are correct, which is the whole Gen 5 argument in one floor.',
      fail: [
        'A washable floor returns road noise that carpet used to absorb; moulded damping ribs claw some back and the cabin is still about 2 dB(A) louder on coarse chip, an honest demotion.',
        'A drain plug left open after a wash pulls draughts and, at speed, spray; the plugs seat proud so an open one is felt underfoot before it is a problem.',
        'The caddy bosses are moulded-in blind inserts, not holes, because the one unrecoverable way to ruin a sealed floor is to drill it.',
      ],
      explode: [0, -0.45, 0],
    },
    'door-cards': {
      name: 'Door cards',
      tagline: 'Trim that comes off the way it went on: fifty-cycle fasteners on the panel every door repair starts with.',
      mass: 10,
      count: 4,
      specs: [
        ['Cards', '4, self-coloured PP, grained'],
        ['Fasteners', 'Steel quarter-turn, 50+ cycles rated'],
        ['Ancestor clips', 'Single-use press pins, ~1 in 3 lost per pull'],
        ['E-latch release', 'Surface pull, two-stage (body-aero doors)'],
        ['Armrest', 'Replaceable cap on 3 fasteners'],
        ['Top edge', 'y 0.88, under the 0.92 beltline (body-aero)'],
      ],
      how: 'A door card is the most-removed trim in a car\'s life: regulator, speaker, latch, harness, and the water membrane all live behind it. The industry hangs it on press-in pins that are single-use by design, so every removal snaps a third of them, which is tolerable at one pull a decade and absurd at fleet rates. These cards land on steel quarter-turn fasteners rated past fifty cycles: one tool, ninety seconds, zero broken clips, and the armrest cap, the one surface a hand actually wears through, is its own three-fastener part in the same self-coloured PP.\n\nThe cards also settle a debt the preset owes. The Gen 5 body is body-aero: flush doors, capacitive strips, e-latches, and a legally required mechanical backup release that body-aero carries as a hidden cable and admits nobody uses until the day it matters. In a fleet cabin every passenger is a first-time passenger, so the release surfaces here as a visible two-stage pull on the card face, and the annual function test becomes a ten second tug instead of a trim-off inspection. The cards stop at y 0.88, tucked under the body\'s 0.92 beltline, and everything on them wipes down with the floor.',
      why: 'Interior generations are usually judged by surfaces; this one asks to be judged by fasteners. The cards join this slot\'s ledger so the interior bill finally carries every surface the cabin wears, and the parts that come off weekly belong, in the accounting, to the people who take them off.',
      fail: [
        'A visible release invites curious fingers; the two-stage pull and the latch\'s own speed inhibit make the curiosity harmless, the same promise the hidden cable made.',
        'Self-coloured PP shows pale stress marks when struck; a heat gun raises them, which is depot knowledge and will never be owner knowledge.',
        'The butyl-sealed water membrane behind the card is the one non-reusable layer left in the stack, and it is the honest limit of a fifty-cycle door.',
      ],
      explode: [0, 0.1, 0.65],
    },
    pedals: {
      name: 'Pedals',
      tagline: 'Carried from Gen 1 unchanged, because the by-wire pedal was already the value answer.',
      mass: 4,
      specs: [
        ['Brake', 'By-wire, decoupled simulator, carried (interior.js)'],
        ['Curve', '70 N at 1.0 g, 55 mm, unchanged'],
        ['Fallback', 'Hydraulic push-through circuit, carried'],
        ['Accelerator', 'Dual-track Hall, organ style, carried'],
        ['New tooling', 'None'],
      ],
      how: 'Nothing here changed, and on this generation that earns a card of its own: the pedal set is pure carry-over, the same two-stage simulator curve, the same push-through fallback, the same dual-track Hall accelerator, at zero new tooling. The fleet dividend was designed in by accident: blended regen means more than nine in ten stops end without a pad touching a disc (interior.js), and on an urban duty cycle that stretches friction pads past 150,000 km, a consumable all but deleted from the maintenance ledger.\n\nThe simulator\'s second fleet virtue is consistency. Pedal feel is identical on the first stop of every driver\'s first shift, indifferent to pad temperature, fluid age, and regen state, which flattens the learning curve of a car that changes hands twice a day. The candidate deletion, a plain hydraulic pedal, was priced and rejected: regen blending needs the decoupling anyway, so a cheaper pedal would cost range, pads, and consistency to save a part that already exists on an amortized line.',
      why: 'The ladder rule is to step down where the cheaper rung is the right one, and here the rungs coincide: designed once, tooled once, amortized across every generation since. The cheapest part in any car is the one you do not change.',
      fail: [
        'Push-through fallback still shocks a driver who has never felt it, and a fleet multiplies drivers; depot orientation includes one deliberate push-through stop in the yard.',
        'A simulator cannot telegraph fade through the sole; the display-and-chime demotion Gen 1 admitted stands unimproved.',
      ],
      explode: [0.35, -0.18, 0],
    },
  },
};

/* Geometry. lib.plate spans y [pos.y + t/2, pos.y + 3t/2]. Driver sits
   at z -0.38. Per-side parts are built in loops rather than mirrored. */

export function build() {
  const sys = new THREE.Group();

  /* dash: one main moulding, hard lower, steel tube beam, 4 ball vents */
  const dash = lib.part('dash', [0.55, 0.35, 0]);
  const dashMain = lib.plate(0.30, 1.70, 0.12, 0.06, M.plastic);
  dashMain.position.set(1.12, 0.64, 0);            /* y 0.70..0.82 */
  dash.add(dashMain);
  const dashLower = lib.plate(0.16, 1.62, 0.06, 0.03, M.plasticLt);
  dashLower.position.set(1.03, 0.61, 0);           /* y 0.64..0.70 */
  dash.add(dashLower);
  const topPad = lib.plate(0.24, 1.64, 0.04, 0.05, M.plastic);
  topPad.position.set(1.14, 0.80, 0);              /* y 0.82..0.86 */
  dash.add(topPad);
  const beam = lib.cyl(0.025, 1.66, M.steel, 14);  /* the honest steel tube */
  beam.rotation.x = Math.PI / 2;
  beam.position.set(1.16, 0.76, 0);
  dash.add(beam);
  for (const s of [-1, 1]) {
    const bracket = lib.box(0.03, 0.09, 0.02, M.steel);
    bracket.position.set(1.16, 0.74, s * 0.82);
    dash.add(bracket);
  }
  for (const z of [-0.70, -0.36, 0.36, 0.70]) {   /* inners clear the HVAC case corner at z 0.31 */
    const ring = lib.cyl(0.028, 0.018, M.plasticLt, 18);
    ring.rotation.z = Math.PI / 2;
    ring.position.set(0.966, 0.76, z);
    dash.add(ring);
    const ball = lib.cyl(0.018, 0.02, M.sensor, 14);
    ball.rotation.z = Math.PI / 2;
    ball.position.set(0.962, 0.76, z);
    dash.add(ball);
  }
  sys.add(dash);

  /* controls: 9in fixed display, HVAC knob panel, two mirror displays */
  const controls = lib.part('controls', [0.6, 0.6, 0]);
  const centre = new THREE.Group();
  const bezel = lib.box(0.02, 0.16, 0.24, M.plastic);
  const face = lib.box(0.006, 0.15, 0.23, M.sensor);
  face.position.x = -0.012;
  centre.add(bezel, face);
  centre.position.set(0.985, 0.80, 0);
  centre.rotation.z = -0.15;                       /* raked, not yawed: shared car */
  controls.add(centre);
  /* knob bank rides the aft face of the carried HVAC case, which bulges
     into the cabin to x 0.78 (thermal-5): mounting the controls on the box
     they command keeps them clear of its envelope and visible from the
     seats, 1 mm embed for the fasteners */
  const hvacPanel = lib.box(0.016, 0.075, 0.28, M.plastic);
  hvacPanel.position.set(0.773, 0.665, 0);
  controls.add(hvacPanel);
  for (const z of [-0.09, 0, 0.09]) {
    const knob = lib.cyl(0.016, 0.016, M.plasticLt, 16);
    knob.rotation.z = Math.PI / 2;
    knob.position.set(0.759, 0.677, z);
    controls.add(knob);
  }
  for (const z of [-0.125, -0.075, -0.025, 0.025, 0.075, 0.125]) {
    const key = lib.box(0.008, 0.014, 0.024, M.plasticLt);
    key.position.set(0.767, 0.641, z);
    controls.add(key);
  }
  for (const s of [-1, 1]) {
    const md = new THREE.Group();
    const mBezel = lib.box(0.012, 0.075, 0.115, M.plastic);
    const mFace = lib.box(0.005, 0.065, 0.105, M.sensor);
    mFace.position.x = -0.008;
    md.add(mBezel, mFace);
    md.position.set(1.045, 0.875, s * 0.70);
    md.rotation.y = -s * 0.35;                     /* angled at the driver */
    controls.add(md);
  }
  sys.add(controls);

  /* wheel: full round rim on the carried Gen 1 stub, three stalks.
     Built facing +Z, yawed to face the driver, raked back like Gen 1. */
  const wheelP = lib.part('wheel', [0.45, 0.15, 0]);
  const tilt = new THREE.Group();
  const wheel = new THREE.Group();
  const rim = lib.torus(0.185, 0.017, M.rubber, 36, 10);
  wheel.add(rim);
  const hub = lib.cyl(0.05, 0.05, M.plastic, 20);
  hub.rotation.x = Math.PI / 2;
  wheel.add(hub);
  const crossSpoke = lib.box(0.33, 0.042, 0.024, M.plastic);
  wheel.add(crossSpoke);
  const lowerSpoke = lib.box(0.04, 0.15, 0.022, M.plastic);
  lowerSpoke.position.y = -0.095;
  wheel.add(lowerSpoke);
  const column = lib.cyl(0.028, 0.20, M.darkSteel, 14);
  column.rotation.x = Math.PI / 2;
  column.position.z = -0.125;
  wheel.add(column);
  const sbwSensor = lib.box(0.085, 0.075, 0.06, M.sensor);
  sbwSensor.position.z = -0.25;                    /* Gen 1 duplex pack, carried */
  wheel.add(sbwSensor);
  /* stalks: local +x maps to world +z. Left indicators, right wiper,
     right-lower drive select. */
  const stalkAt = (lx, ly, tiltZ) => {
    const st = lib.box(0.10, 0.013, 0.015, M.plasticLt);
    st.position.set(lx, ly, -0.16);
    st.rotation.z = tiltZ;
    return st;
  };
  wheel.add(stalkAt(-0.105, 0.0, -0.12));          /* indicators, driver left */
  wheel.add(stalkAt(0.105, 0.012, 0.12));          /* wipers */
  wheel.add(stalkAt(0.10, -0.05, 0.3));            /* drive select */
  wheel.rotation.y = -Math.PI / 2;
  tilt.add(wheel);
  tilt.rotation.z = -0.35;
  tilt.position.set(0.84, 0.73, -0.38);
  wheelP.add(tilt);
  sys.add(wheelP);

  /* front seats: Gen 1 shape, rails and manual levers instead of motors.
     s = -1 driver side. */
  for (const s of [-1, 1]) {
    const zc = 0.38 * s;
    const seat = lib.part('front-seats', [0, 0.4, 0.28 * s]);
    for (const zo of [-0.19, 0.19]) {
      const rail = lib.box(0.55, 0.03, 0.04, M.steel);
      rail.position.set(0.35, 0.39, zc + zo);      /* the modular rails */
      seat.add(rail);
    }
    const seatBase = lib.box(0.46, 0.07, 0.44, M.darkSteel);
    seatBase.position.set(0.35, 0.44, zc);
    seat.add(seatBase);
    const cushion = lib.box(0.50, 0.13, 0.50, M.fabric);
    cushion.position.set(0.35, 0.54, zc);
    seat.add(cushion);
    const cushionZip = lib.box(0.52, 0.02, 0.52, M.tan);
    cushionZip.position.set(0.35, 0.585, zc);      /* zip-panel seam band */
    seat.add(cushionZip);
    const backrest = lib.box(0.13, 0.62, 0.48, M.fabric);
    backrest.rotation.z = 0.26;
    backrest.position.set(0.052, 0.85, zc);
    seat.add(backrest);
    const backZip = lib.box(0.135, 0.04, 0.49, M.tan);
    backZip.rotation.z = 0.26;
    backZip.position.set(0.005, 1.024, zc);
    seat.add(backZip);
    const headrest = lib.box(0.10, 0.13, 0.24, M.fabric);
    headrest.rotation.z = 0.26;
    headrest.position.set(-0.062, 1.24, zc);
    seat.add(headrest);
    for (const zo of [-0.06, 0.06]) {
      const post = lib.cyl(0.008, 0.1, M.steel, 8);
      post.rotation.z = 0.26;
      post.position.set(-0.043, 1.165, zc + zo);
      seat.add(post);
    }
    const slideBar = lib.box(0.02, 0.015, 0.30, M.steel);
    slideBar.position.set(0.60, 0.45, zc);         /* slide release under the nose */
    seat.add(slideBar);
    const reclineWheel = lib.cyl(0.028, 0.014, M.plasticLt, 16);
    reclineWheel.rotation.x = Math.PI / 2;
    reclineWheel.position.set(0.14, 0.60, zc + s * 0.26);
    seat.add(reclineWheel);
    const pumpLever = lib.box(0.12, 0.014, 0.02, M.plasticLt);
    pumpLever.position.set(0.42, 0.50, zc + s * 0.26);
    seat.add(pumpLever);
    sys.add(seat);
  }

  /* rear bench: Gen 1 geometry with zip bands, lift-off cushion base */
  const bench = lib.part('rear-bench', [-0.25, 0.45, 0]);
  const benchCushion = lib.box(0.55, 0.13, 1.52, M.fabric);
  benchCushion.position.set(-0.72, 0.445, 0);
  bench.add(benchCushion);
  const benchZip = lib.box(0.57, 0.02, 1.54, M.tan);
  benchZip.position.set(-0.72, 0.49, 0);
  bench.add(benchZip);
  const benchBack = lib.box(0.13, 0.64, 1.52, M.fabric);
  benchBack.rotation.z = 0.3;
  benchBack.position.set(-1.082, 0.766, 0);
  bench.add(benchBack);
  const benchBand = lib.box(0.135, 0.04, 1.53, M.tan);
  benchBand.rotation.z = 0.3;
  benchBand.position.set(-1.127, 0.914, 0);
  bench.add(benchBand);
  for (const zo of [-0.4, 0.4]) {
    const hr = lib.box(0.09, 0.12, 0.26, M.fabric);
    hr.rotation.z = 0.3;
    hr.position.set(-1.2, 1.14, zo);
    bench.add(hr);
  }
  for (const zo of [-0.5, 0.5]) {
    const latch = lib.box(0.03, 0.015, 0.04, M.plasticLt);
    latch.position.set(-0.43, 0.40, zo);           /* lift-off base handles */
    bench.add(latch);
  }
  sys.add(bench);

  /* floor: one TPE tray, sill lips, 4 drains, caddy bosses, no console */
  const floor = lib.part('floor', [0, -0.45, 0]);
  const tray = lib.plate(2.20, 1.44, 0.016, 0.10, M.rubber);
  tray.position.set(0.10, 0.352, 0);               /* y 0.360..0.376 */
  floor.add(tray);
  for (const s of [-1, 1]) {
    const lip = lib.box(2.20, 0.025, 0.02, M.rubber);
    lip.position.set(0.10, 0.372, s * 0.71);
    floor.add(lip);
  }
  for (const [x, z] of [[1.02, -0.48], [1.02, 0.48], [-0.30, -0.48], [-0.30, 0.48]]) {
    const plug = lib.cyl(0.03, 0.012, M.plasticLt, 16);
    plug.position.set(x, 0.374, z);
    floor.add(plug);
  }
  for (const [x, z] of [[0.45, -0.08], [0.45, 0.08], [0.78, -0.08], [0.78, 0.08]]) {
    const boss = lib.cyl(0.012, 0.01, M.steel, 10);
    boss.position.set(x, 0.374, z);
    floor.add(boss);
  }
  sys.add(floor);

  /* door cards: two per side on quarter-turns, armrest caps, release pulls */
  for (const s of [-1, 1]) {
    const cards = lib.part('door-cards', [0, 0.1, 0.65 * s]);
    const front = lib.box(0.90, 0.44, 0.016, M.plasticLt);
    front.position.set(0.62, 0.66, s * 0.875);     /* y 0.44..0.88 */
    cards.add(front);
    /* rear card stops at x -0.04, clear of the B-pillar tube at x 0.02
       r 0.042 (body.js cage, z ~0.90 in this y band) */
    const rear = lib.box(0.84, 0.44, 0.016, M.plasticLt);
    rear.position.set(-0.46, 0.66, s * 0.87);
    cards.add(rear);
    const armF = lib.box(0.30, 0.045, 0.055, M.plastic);
    armF.position.set(0.55, 0.70, s * 0.845);
    cards.add(armF);
    const armR = lib.box(0.30, 0.045, 0.055, M.plastic);
    armR.position.set(-0.45, 0.70, s * 0.84);
    cards.add(armR);
    const pullF = lib.box(0.07, 0.02, 0.012, M.alu);
    pullF.position.set(0.80, 0.76, s * 0.858);     /* the visible e-latch release */
    cards.add(pullF);
    const pullR = lib.box(0.07, 0.02, 0.012, M.alu);
    pullR.position.set(-0.20, 0.76, s * 0.853);
    cards.add(pullR);
    const speaker = lib.cyl(0.06, 0.006, M.plastic, 20);
    speaker.rotation.x = Math.PI / 2;
    speaker.position.set(0.35, 0.54, s * 0.864);
    cards.add(speaker);
    sys.add(cards);
  }

  /* pedals: Gen 1 carry-over, verbatim geometry. Faces kept |z| >= 0.3575
     clear of the front drive zone ending at z -0.35. */
  const pedals = lib.part('pedals', [0.35, -0.18, 0]);
  const brakePlate = lib.box(0.016, 0.09, 0.09, M.rubber);
  brakePlate.rotation.z = -0.4;
  brakePlate.position.set(1.26, 0.46, -0.46);
  pedals.add(brakePlate);
  const brakeArm = lib.cyl(0.009, 0.15, M.steel, 10);
  brakeArm.rotation.z = -0.54;
  brakeArm.position.set(1.31, 0.56, -0.46);
  pedals.add(brakeArm);
  const simulator = lib.box(0.06, 0.05, 0.045, M.plastic);
  simulator.position.set(1.35, 0.62, -0.46);
  pedals.add(simulator);
  const accelPlate = lib.box(0.016, 0.13, 0.055, M.rubber);
  accelPlate.rotation.z = -0.5;
  accelPlate.position.set(1.29, 0.43, -0.39);
  pedals.add(accelPlate);
  const accelHinge = lib.box(0.04, 0.025, 0.065, M.plastic);
  accelHinge.position.set(1.26, 0.365, -0.39);
  pedals.add(accelHinge);
  sys.add(pedals);

  return sys;
}
