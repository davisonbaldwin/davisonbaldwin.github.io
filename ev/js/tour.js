/* THE GUIDED TOUR: the ladder, read out.

   design/app-brief.md section 3 asks for this in one line: "the retros are a
   narrative and nothing reads them out." Eleven rungs of design documents and
   retrospectives sit in design/ and no user of the app has ever seen a word of
   them. The app could show you Gen 7 and it could show you Gen 8, and after
   compare mode it could tell you what the second bought over the first, but
   nothing in it ever said WHY a generation happened, which is the only part a
   person actually remembers.

   ── WHAT IS AUTHORED HERE AND WHAT IS NOT ────────────────────────────────

   The PROSE is authored, and every paragraph traces to a document in design/
   named in `cite`. It is the one place in this app where a sentence is not
   derived from the tree, so it is kept to what those documents actually say
   and the numbers are taken out of it.

   THE NUMBERS ARE NOT AUTHORED. Every figure a stop prints is a token that
   js/main.js resolves against js/compare.js at the moment the stop is shown:
   `{dRange}` is the real delta between those two rungs, computed the same way
   the readout and tools/ladder.js compute it. A tour with the miles typed into
   it would be a fourth place for the ladder's figures to live and the first
   one to go stale, and design/app-pass-1.md records the census in
   design/app-brief.md going stale exactly that way inside a week.

   NO DOM IN HERE, for the same reason js/compare.js has none: this file is
   data plus a little arithmetic, and js/main.js owns every pixel.

   ── UNITS ARE NOT DECIDED HERE ───────────────────────────────────────────

   The app has a mi/km switch and the tour has to honor it, so no sentence
   below contains a converted figure or a unit word for one. Tokens carry the
   quantity and js/main.js formats it in whatever the user has selected. The
   two exceptions are quotations of a measurement made in meters in a design
   document (roof rails at 1.40 m, a cabin at 1.20 m), which are geometry
   rather than a reading on this car's instruments, and stay as written. */

import { LADDER } from './compare.js';

/* Camera stations. Positions are [x, y, z] with x along the car's length,
   z across it and y up, matching every module in js/systems.

   These are AUTHORED rather than framed from bounding boxes, because the
   frame is part of what a stop says: the frontal-area rungs are seen from
   dead ahead where a narrower car is the whole picture, the tail rung from
   behind, and the package rung from above where a tandem cabin is obvious and
   from nowhere else. viewer.frameGroups keeps the user's own view direction
   on purpose, which is right for a part and wrong for an argument. */
export const VIEWS = {
  home:    { pos: [6.4, 2.6, 6.8],   tgt: [0, 0.55, 0] },
  hero:    { pos: [5.6, 1.9, 5.4],   tgt: [0, 0.62, 0] },
  /* dead ahead, low. Frontal area is a silhouette, so the stops about it are
     shown as one: no perspective on the flank to read depth from. */
  front:   { pos: [9.2, 1.15, 0.0],  tgt: [0.2, 0.72, 0] },
  frontQ:  { pos: [7.4, 1.5, 3.4],   tgt: [0.3, 0.65, 0] },
  side:    { pos: [0.4, 1.05, 8.6],  tgt: [0.1, 0.68, 0] },
  rearQ:   { pos: [-6.6, 2.0, 5.2],  tgt: [-0.4, 0.6, 0] },
  rear:    { pos: [-8.8, 1.3, 0.0],  tgt: [-0.4, 0.7, 0] },
  /* High three-quarter, 9.7 m out, and it went through two wrong versions.
     A true plan view at 8.3 m clipped both bumpers, because the 34 degree
     lens sees 5.07 m of scene there against a 4.8 m car. Pulling back to
     12.4 m fitted it and made it small and flat: under x-ray a plan view of
     this car is a dark rectangle. Looking DOWN INTO it from 41 degrees keeps
     the flank, so the cabin, the pack and the flank read at once. */
  above:   { pos: [5.2, 6.4, 5.2],   tgt: [0, 0.5, 0] },
  low:     { pos: [6.2, 0.55, 4.2],  tgt: [0.2, 0.45, 0] },
};

/* ── The stops ───────────────────────────────────────────────────────────

   `gen`     which rung the car wears. The tour drives the real generation
             control, so the rail, the readout and the pack all follow.
   `against` which rung this one is read against. Null on the two stops that
             are about the whole ladder rather than about a step in it; every
             rung stop names its predecessor and the tour lights the slots
             that differ, which is compare mode's ghosting without compare
             mode's panel.
   `view`    a camera station above.
   `read`    a module id the stop offers to open, chosen as the one the
             paragraphs are actually about.
   `cite`    the document in design/ the prose comes from. Printed, because a
             claim about engineering that cannot be traced is decoration.
   `xray`    fade the shell for this stop. Five of the twenty ask for it,
             and they are the five whose argument is INSIDE the car: the
             nervous system, the 190 kWh pack, the tandem package, the
             corner and the track. On any
             of those the body is itself a changed slot, so it stays solid
             under the compare ghosting and hides the thing being discussed.
             The tour restores whatever the x-ray switch was set to when it
             opened, because a tour must not change the app it walked. */
export const STOPS = [
  /* THE OPENING STOP WEARS THE TOP RUNG. Davis, 2026-08-23: the app opens on
     Gen 17 and the tour opens itself on a first visit, so an opening stop on
     Gen 1 was a hard cut from the best car to the plainest one before a word
     had been read. The opening holds the car the reader is already looking
     at and says so; the step back to Gen 1 is the second stop, where the
     title explains it. */
  {
    id: 'open',
    title: 'Nineteen rungs',
    theme: 'what this is',
    gen: 'gen19', against: null, view: 'hero',
    cite: 'design/app-brief.md',
    paras: [
      'This is a place to learn how an electric car works, part by part: every component on the stage can be clicked, and each one explains what it does, why it is designed the way it is, and how it fails. The objective behind the whole model is the most efficient electric car that can be drawn, with no budget and no factory in the way, only physics and engineering.',
      'So the model is a ladder. Nineteen generations of one car, each strictly better than the last on every measured column, with the argument for every step written into the parts themselves; the car on the stage is the nineteenth, the top rung. The tour walks it from the first rung back up to this one. At each rung the car becomes that generation, the slots that changed stay lit while the ones that carry fade back, and every figure below is computed live from the same model the readout reads. Nothing here is typed in.',
    ],
  },

  {
    id: 'gen1',
    title: 'The honest reference',
    theme: 'Gen 1',
    gen: 'gen1', against: null, view: 'side', read: 'body',
    cite: 'design/gen3.md',
    paras: [
      'Gen 1 is deliberately ordinary: an NMC 4680 pack, a radial permanent-magnet motor, a stamped and cast body. Nothing about it is clever, and that is its job. It is the reference every rung after it is measured against, so it has to be honest rather than good.',
      '{range} at {rate}. Those two numbers are what the next seventeen generations move.',
    ],
  },

  {
    id: 'gen2',
    title: 'Optimization in place',
    theme: 'Gen 2',
    gen: 'gen2', against: 'gen1', view: 'frontQ', read: 'battery-2',
    cite: 'design/gen3.md',
    paras: [
      'Same architecture, better parts. A solid-state pack, an axial-flux drive, a Kammback shell and low-loss corners, each one optimized where it stands without changing what the car is.',
      'That is worth {dRange} and {dMass}. It is also the cheapest kind of progress there is, and the ladder never gets it this easily again: everything after this has to change the shape of the problem rather than the quality of a part.',
    ],
  },

  {
    id: 'gen3',
    title: 'Integration',
    theme: 'Gen 3',
    gen: 'gen3', against: 'gen2', view: 'low', read: 'battery-3',
    cite: 'design/gen3.md',
    paras: [
      'Gen 3 dissolves the boundaries between systems. One lofted monoform instead of panels, cells carrying structure inside the body, motors moved into the rear wheels. Parts stop being parts and start being functions that share material.',
      'Integration is not free and the modules say so in their own content: serviceability, repair economics and engineering risk all get worse. On this ladder that bill is payable, because the premise is unlimited resources. The honesty is the part worth keeping.',
    ],
  },

  {
    id: 'gen4',
    title: 'Control',
    theme: 'Gen 4',
    gen: 'gen4', against: 'gen3', view: 'above', read: 'hv-4', xray: true,
    cite: 'design/gen4.md',
    paras: [
      'The big four slots carry unchanged here. Gen 4 rebuilds the nervous system instead: a 48 volt zonal architecture, active chassis control, an active-aero body and a fail-operational triplex brain.',
      'The ledger is almost flat, 24 kg of copper traded for 11 kg of actuators, and the range moves {dRange}. What this rung buys is capability, not consumption, and it is the first proof that a generation which barely touches the headline still earns its number.',
    ],
  },

  {
    id: 'gen5',
    title: 'Apex',
    theme: 'Gen 5',
    gen: 'gen5', against: 'gen4', view: 'hero', read: 'battery-6',
    cite: 'design/gen5-apex.md',
    paras: [
      'This is where the project stated its mandate plainly: build the best possible car under unlimited resources, planning and funding. Cost and manufacturability stop being arguments anywhere on the ladder, and every part from here carries a maturity row that says whether it is production practice, a pilot line, or extrapolated. Nothing wears a certainty it has not earned.',
      'A bipolar anode-free pack and a 480 kW evolved in-wheel drive under an active-aero monoform, for {dRange}.',
    ],
  },

  {
    id: 'gen6',
    title: 'Form',
    theme: 'Gen 6',
    gen: 'gen6', against: 'gen5', view: 'front', read: 'body-7',
    cite: 'design/gen6.md',
    paras: [
      'Five generations optimized the drag coefficient while frontal area sat untouched. Drag is proportional to Cd times A, so half of that expression had never been opened, and the reason was a single inherited line of geometry: every body from Gen 1 to Gen 5 imported the same safety cage, whose roof rails sit at 1.40 m and pin the roof near 1.45 and the area near 2.3 square meters.',
      'Gen 6 is the generation that questions the cage. One module, and the waterfall names exactly what it moved: {topTerm}, against {dArea} of frontal area.',
    ],
  },

  {
    id: 'gen7',
    title: 'Range',
    theme: 'Gen 7',
    gen: 'gen7', against: 'gen6', view: 'rearQ', read: 'battery-7', xray: true,
    cite: 'design/gen7.md',
    paras: [
      'Every rung so far optimized a discipline. Gen 7 optimizes an outcome: how far can this car go on one charge, with no cost ceiling? A target that is a number changes how the work is done, because each module is now chosen by the miles it returns rather than by whether it advances its own field.',
      'A narrowed rear track unpins the tail, the pack goes to 190 kWh, the drive is tuned for part load and the thermal loop for long haul. {dRange}, the largest single step on the ladder.',
    ],
  },

  {
    id: 'gen8',
    title: 'The tail',
    theme: 'Gen 8',
    gen: 'gen8', against: 'gen7', view: 'rear', read: 'body-8',
    cite: 'design/gen8.md',
    paras: [
      'One module, and one module is the correct size for it. Gen 7 narrowed the rear track specifically so the boat tail could close, then carried the old body and claimed no credit for aero it had not drawn. Gen 8 draws it.',
      'It also proves the thing the next two rungs are built on: an afterbody cannot move frontal area. The front fairings own the silhouette from 0.28 to 0.78 m and the max-section ring owns everything above it, so only the front and the package can buy A.',
      '{dRange}. A generation earns its number by teaching something, not by its part count.',
    ],
  },

  {
    id: 'gen9',
    title: 'The front',
    theme: 'Gen 9',
    gen: 'gen9', against: 'gen8', view: 'front', read: 'body-9',
    cite: 'design/gen9.md',
    paras: [
      'So the work goes to the front, and it pulls three levers at once because the Gen 8 retrospective warned that no single clever idea reaches 1,800 miles. The front track narrows to match the rear, the fairings collapse onto the flank, and the auxiliary draw is attacked.',
      'Each lever is reported with what it returned, including the one that returned least. {dArea} of frontal area and {dRange}.',
    ],
  },

  {
    id: 'gen10',
    title: 'The slots that own their term',
    theme: 'Gen 10',
    gen: 'gen10', against: 'gen9', view: 'frontQ', read: 'wheels-10',
    cite: 'design/retro-gen10.md',
    paras: [
      'The Gen 9 retrospective found a fault in how that rung had been briefed rather than in what it built: its largest target was set on a module that does not own the term. Thermal held 20.8 percent of the 649 watts it was told to cut by 46 percent.',
      'So every target in Gen 10 sits on the slot that owns a majority of the quantity it is asked to move. Three modules, three terms, and it worked exactly as designed.',
      'It also produced the smallest step in six generations, {dRange}, and its own retrospective refuses to explain that away. Doing everything right and gaining little is a finding, and it is the finding Gen 11 was built on.',
    ],
  },

  {
    id: 'gen11',
    title: 'The package',
    theme: 'Gen 11',
    gen: 'gen11', against: 'gen10', view: 'above', read: 'body-11', xray: true,
    cite: 'design/gen11.md',
    paras: [
      'Two occupants in tandem, a body narrowed to 1.20 m around them, and the platform left alone underneath. That last clause is the whole generation and it is the opposite of what the rung set out to build.',
      'The brief assumed a narrow cabin means a narrow pack, and that assumption made the package fail by 479 miles. It traced to one untested line: a pack wider than its body is not a design. Measured, there is no material beside the cells at their own height and the pack edge already hides inside the tire column. So the pack stays whole, the track stays, and the suspension and drivetrain carry untouched.',
      '{slots} changed. What carries is the Gen 9 drive unit and the Gen 9 suspension, settled two rungs earlier and never reopened, and {dArea} of frontal area is what a body 1.20 m wide around two people buys.',
    ],
  },

  {
    id: 'gen12',
    title: 'The shape',
    theme: 'Gen 12',
    gen: 'gen12', against: 'gen11', view: 'rearQ', read: 'body-12',
    cite: 'design/gen12.md',
    paras: [
      'Gen 11 bought its area with a package and paid for it in drag: the re-zeroed coefficient, a drag buildup off the built triangles with every empirical term published and identical on every rung, read it as the worst shape on the ladder. The wide pan stopped at x -1.07 in a 59 degree plan break and the rear tires stood in clean air, a fifth of the car\'s drag on their own.',
      'Gen 12 keeps the package and redraws the rear around it: the shoulder carried aft over the rear wheels and a tail 740 mm longer, drawn station by station against the separation walk so the flow reaches the Kamm face instead of leaving the body behind the cabin. {dRange} on {slots}, and {dArea} of area, because an afterbody cannot move frontal area and this one does not pretend to.',
    ],
  },

  {
    id: 'gen13',
    title: 'The floor',
    theme: 'Gen 13',
    gen: 'gen13', against: 'gen12', view: 'side', read: 'body-13',
    cite: 'design/gen13.md',
    paras: [
      'The roof was floored by a seat riser, not by the pack. The cabin had sat on a 150 mm pan on tracks over a battery lid that was already the floor; put both occupants on the lid as shells and the whole greenhouse comes down 65 mm with the head under it, at the same 50 mm of clearance. The first fairing over a steered wheel arrives on the same rung, a pod on the knuckle that turns with the tire.',
      'It is the rung the five-column rule starts on: mass, area and drag coefficient against the rung below, consumption and range against the best on the ladder, and every kilogram derived off drawn geometry. {dRange}, {dArea}, {dMass}, and the method\'s third revision on the wheel term, which re-priced every rung before this one and is said so.',
    ],
  },

  {
    id: 'gen14',
    title: 'The outline',
    theme: 'Gen 14',
    gen: 'gen14', against: 'gen13', view: 'frontQ', read: 'wheels-14',
    cite: 'design/gen14.md',
    paras: [
      'What the frontal outline of Gen 13 still carried that nothing needed: a greenhouse drawn to the flank it stood on instead of the head it held, and a rear tire whose crown the spat wall, edge-on to the air, never hid. The greenhouse comes in to the head; a crown band fairs each rear wheel on its own upright; the front pants come down to the disc floor.',
      'The trap shows for the second time and is priced first: an area lever alone raises the coefficient, because friction and the wheel term are charged against a smaller reference area, so the area lever and the coefficient lever are one rung or neither. {dRange} on {slots}, {dArea}, and the hand wheel replaced by the by-wire yoke because the low sightline was the dashboard\'s and the wheel was merely first in the line.',
    ],
  },

  {
    id: 'gen15',
    title: 'The flank',
    theme: 'Gen 15',
    gen: 'gen15', against: 'gen14', view: 'front', read: 'body-15',
    cite: 'design/gen15.md',
    paras: [
      'The last dimension of the outline set by nothing the occupant needs. The probe of the flank band found a recovery core, a charge port, two zone drops, two camera pads and the body\'s own pillars beside a 0.52 m pair of shoulders in a 1.20 m cabin, so the cabin comes in to 1.12 m from the shoulder up at every station, and the front casting\'s corners set the number. The cowl break closes to the 15 degrees the method scores at zero.',
      'Every tenant a planned fork, and two tools the rung owed: the wheel envelope, which sweeps a fairing through lock, rear steer, bump and rebound against every partner\'s surface and found 1.7 mm at the combined extremes on the shipped wheels; and a ruler that prints every blocker on a sightline rather than the first. {dRange}, {dArea}, {slots}.',
    ],
  },

  {
    id: 'gen16',
    title: 'The corner',
    theme: 'Gen 16',
    gen: 'gen16', against: 'gen15', view: 'low', read: 'suspension-16', xray: true,
    cite: 'design/gen16.md',
    paras: [
      'The suspension redrawn for the car it actually carries, 120 kg lighter than the one it was estimated for at Gen 4 and Gen 9: every forged section at the load ratio to the one third, every wall at the load ratio, the bars at the one quarter, the bellows and the damper bore at the square root, and not one hard point moved. Then its ledger read against its own drawing for the first time, by a tool built for the rung, and found wrong both ways: 31 kg of structure and knuckle booked that the drawings do not hold, 16 kg of bar and rack drawn and never booked. Both corrections stand, and the five planes partners land on are declared at last.',
      'The body takes the two skin levers left on this package: the canopy glass on the loft instead of 8 mm proud of it, which was the car\'s whole crown in the frontal projection and nothing needed it; and the tail\'s upper section shrunk about its waterline from x -2.300 aft until the upper stream reaches the Kamm at the limit, nine scenarios swept before one was drawn. {dRange}, {dMass}, {dArea}, and the lightest car on the ladder, best on all five columns.',
    ],
  },

  {
    id: 'gen17',
    title: 'The track',
    theme: 'Gen 17',
    gen: 'gen17', against: 'gen16', view: 'frontQ', read: 'wheels-17', xray: true,
    cite: 'design/gen17.md',
    paras: [
      'The track has been 1.48 m since Gen 9, held at Gen 11 on a stability budget written in prose. Measured on Gen 16 with a tool built for the question, the laden center of gravity sits at 0.455 m and the static stability factor at 1.63, with room in it; and the geometry of the outline below the shoulder turned out to be the sill: the tires stood 27.5 mm proud of it each side. Both axles come in 20 mm so the tire\'s 135 mm section sits centered on the sill\'s 120 mm chambered section, which is the only track that lowers the outline at all: one axle alone makes the area worse, and the tool showed it before a line was drawn.',
      'Seven modules follow one decision: every corner translated 20 mm inboard the way Gen 9 translated 70, the front upper arm shortened because its inner pivot already sits 30 mm from the drive housing, the rear rings and the front halfshafts with the wheels, the pack\'s corner keep-out with the tire and sixteen cell layers a side giving 9.7 mm for it, the spat wall following the rear tire in, the compute handover plane off the tire, and the by-wire boss contract open since Gen 9 closed at the front and named at the rear. {dRange}, {dArea}, {dMass}, on {slots}, the thinnest coefficient margin on the ladder and said so.',
    ],
  },

  {
    id: 'gen18',
    title: 'The single seat',
    theme: 'Gen 18',
    gen: 'gen18', against: 'gen17', view: 'rearQ', read: 'body-18',
    cite: 'design/gen18.md',
    paras: [
      'The retrospective after Gen 17 wrote that the package was spent: no area lever left that did not reopen the cabin, the pack or the sill, and no coefficient lever left on the skin. It was true of a two-seat car. The lever it could not see was the second seat. A tandem rear head at x -0.63 held the roof flat at 1.257 for two meters behind the driver; with one occupant the roof descends from behind the single head at the limit the drag method has always used, eased where the lower body has its own steps, and the Kamm face\'s upper section closes from 0.347 to 0.238 m2. The belt seam comes in because a 0.52 m pair of shoulders needs nothing at 0.55 above the belt; the rear seat, its belts, its repeater and its liner go, the charge port and the roof instruments move off a flank and a roof that are no longer there, and the space behind the seat becomes a well the width of the cabin under a hatch.',
      'The arithmetic was wrong twice before the march was run and the brief says where: the upper base floors near 0.23 because the pack\'s sidewall band is not the cabin\'s to move, and a sloping roof has more skin than a flat one, so the step is {dRange}, {dRate}, {dMass} on {slots}, not the 175 miles the estimate promised. Every column on Gen 17 and the walk clean to 15.0 degrees. The cost, stated as the rule requires: the car carries one person. What it hands the next rung is a face that is mostly sidewall, which is the boat tail\'s to close.',
    ],
  },

  {
    id: 'gen19',
    title: 'The boat tail',
    theme: 'Gen 19',
    gen: 'gen19', against: 'gen18', view: 'side', read: 'body-19',
    cite: 'design/gen19.md',
    paras: [
      'Gen 18 left a face at the Kamm cut that was mostly the pack\'s sidewall band, 0.315 m2 of base no cabin lever could touch, and the plan named the boat tail to close it. Priced through the shipped buildup, the price of length has a shape: the base term falls as the three-halves power of the base while the skin is charged per square meter the whole way, so the first 0.6 m of tail buys almost all of it and full closure measures worse, on the walks and on the mass column both. The tail that ships is 600 mm at 15 degrees a side in plan, 15 on the roof and 8 on the floor, every angle typed, both walks clean at 14.9 and 14.2 against the method\'s 15, ending at a 0.077 m2 tip that carries the light guide, the marque and the rear camera.',
      'Mass is the column the rung was won on. The tail\'s skin costs 3.3 kg by drawn area; what pays for it is the Kamm spoiler, deleted with the base it worked on, and the diffuser flap\'s hinge, drives and taps, deleted because a ramp run out to the tip at angles that cannot stall has nothing left for a control to guard. The surround camera pod comes flush into a flank it had stood 38 mm outside since Gen 15, which is the whole of the area column. The step is {dRange}, {dRate}, {dMass} on {slots}. The costs, stated: the car is 5.68 m long and 1.85 m of it is rear overhang, the airbrake authority is gone with the blade, and the diffuser\'s trim in yaw and over crests is gone with the drives.',
    ],
  },

  {
    id: 'close',
    title: 'What it cost, and what is open',
    theme: 'the end of the ladder',
    gen: 'gen19', against: 'gen1', view: 'hero', read: 'interior-18',
    cite: 'design/gen18.md',
    paras: [
      'End to end: {dRange} and {dRate} over the reference car, on {slots}.',
      'It is not finished, and the model says where. Every rung from Gen 13 on has improved every column against the rung below, and the last six did it with no change to the method that prices them; the nineteenth is the lightest car on the ladder and the best on all five, and it carries one person. What is open is named rather than hidden: the air handler that stands 30 mm into the occupant\'s thigh has been carried through seven retrospectives; the regenerative braking constant is a cycle assumption nobody has booked per configuration; 202 W of low-voltage load has no owner; and the hood at 0.94 m is what caps the roof over the head. The plan after this rung is written: the wheels fully inside the body, then three wheels.',
      'The rule that makes this a ladder rather than a list: a generation that does not correct or build on a specific lesson does not ship, and a number that cannot be traced to a document in design/ is decoration. Every figure in this tour is computed on arrival from the same model the readout uses, and every stop cites the document its argument comes from.',
    ],
  },
];

/* Which rungs the tour visits, in order, for the progress marks. A stop that
   repeats a rung (the opening and the close both wear the top rung) is still
   its own mark: the marks count STOPS, and labeling them by rung is what
   would be misleading. */
export const stopRung = (s) => LADDER.find((g) => g.id === s.gen) || null;

/* Total dwell for autoplay, in ms. Reading speed rather than a flat interval,
   because the stops are not the same length: the Gen 11 stop is three times
   the Gen 1 stop and a fixed timer would either rush it or leave the short
   ones sitting there.

   PACED FOR A SKIM, AND CAPPED. It was 240 words a minute, an unhurried read
   of every word, which put the whole tour at 5.4 minutes, the mean stop at 25
   seconds and Gen 11 at 39.5. Watched rather than measured, that is a wait.
   330 with a 16 second ceiling is 3.3 minutes, mean 15.4, and nothing sits
   long enough to feel stuck. The ceiling is what does the real work: it only
   binds on the four longest stops, and those were the ones that dragged.

   This is the right trade because the reader is not trapped by it. Any
   interaction stops the timer FOR GOOD rather than resetting it, so someone
   who wants to finish a panel presses next once and is driving from then on.
   The constant still covers the 1.2 s camera flight that lands before anyone
   starts reading.

   AND AGAIN, 2026-08-22: with eighteen stops Davis said autoplay "still feels
   like it goes through each window a little slowly", so it went to 420 words
   a minute under an 11 second ceiling; then "a little too fast now, split the
   difference". So: 375 words a minute, a 13.5 second ceiling and a 5.5 second
   floor. The whole tour is about 3.8 minutes, the mean stop about 12 seconds,
   the long stops (Gen 11, Gen 16, the close) sit at the ceiling, and a reader
   who wants the words presses next once and has them for as long as they
   like. Autoplay is a trailer, not the read. */
export function dwellMs(stop) {
  const words = stop.paras.join(' ').split(/\s+/).length;
  return Math.round(Math.max(5500, Math.min(13500, (words / 375) * 60000 + 1650)));
}
