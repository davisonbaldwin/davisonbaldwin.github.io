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
   `xray`    fade the shell for this stop. Three of the thirteen ask for it,
             and they are the three whose argument is INSIDE the car: the
             nervous system, the 190 kWh pack and the tandem package. On any
             of those the body is itself a changed slot, so it stays solid
             under the compare ghosting and hides the thing being discussed.
             The tour restores whatever the x-ray switch was set to when it
             opened, because a tour must not change the app it walked. */
export const STOPS = [
  {
    id: 'open',
    title: 'Eleven rungs',
    theme: 'what this is',
    gen: 'gen1', against: null, view: 'hero',
    cite: 'design/app-brief.md',
    paras: [
      'This model is a ladder. Eleven generations of one car, each strictly better than the last, with the engineering argument for every step written into the parts themselves.',
      'The tour walks it end to end. At each rung the car becomes that generation, the slots that changed stay lit while the ones that carry fade back, and every figure below is computed live from the same model the readout reads. Nothing here is typed in.',
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
      '{range} at {rate}. Those two numbers are what the next ten generations move.',
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
    id: 'close',
    title: 'What it cost, and what is open',
    theme: 'the end of the ladder',
    gen: 'gen11', against: 'gen1', view: 'hero', read: 'interior-11',
    cite: 'design/app-pass-1.md',
    paras: [
      'End to end: {dRange} and {dRate} over the reference car, on {slots}.',
      'It is not finished, and the model says where. Gen 11 shipped with every one of the driver\'s eight sightlines blocked, a car nobody could see out of, and it passed every automated check the project has because none of them asked. A person looking at a render caught it in one glance. Four sightlines are open now, dead ahead among them, which no earlier rung has ever had.',
      'The hand wheel still stands in the low sightline and the interior cannot lower it alone, because the air handler sits underneath. That is a package decision across two slots, and it is written down rather than quietly fixed.',
    ],
  },
];

/* Which rungs the tour visits, in order, for the progress marks. A stop that
   repeats a rung (the opening pair, the close) is still its own mark: the
   marks count STOPS, and labeling them by rung is what would be misleading. */
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
   starts reading. */
export function dwellMs(stop) {
  const words = stop.paras.join(' ').split(/\s+/).length;
  return Math.round(Math.max(6000, Math.min(16000, (words / 330) * 60000 + 1800)));
}
