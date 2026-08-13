/* COMPARE: what one rung of the ladder bought over another.

   The whole thesis of this project is the ladder, eleven generations each
   strictly better with the reasons written down, and until this file existed
   the app could not put two of them side by side. You stepped the generation
   dropdown, the car changed, and nothing said what changed or why.

   NOTHING HERE IS INVENTED. Every figure comes out of js/registry.js and
   js/efficiency.js by the same calls the live readout makes, and the rung
   totals are produced the way tools/ladder.js produces them, so the app and
   the headless ladder cannot drift apart. tools/compare.sh runs this file
   under JavaScriptCore and checks exactly that.

   NO DOM IN HERE. The UI is js/main.js's problem. This file is imported by a
   browser and by a command-line checker and has to work in both.

   ── THE ONE THING THIS FILE IS CAREFUL ABOUT ────────────────────────────

   A per-slot decomposition of MASS is exact, because mass is a sum. A
   per-slot decomposition of EFFICIENCY IS NOT, and pretending otherwise
   would be the same class of error design/retro-gen8.md names: a number
   produced one way sitting next to a number produced another.

   Consumption is not a sum of independent slot contributions. Frontal area
   is a property of the body and the wheels TOGETHER, so AREA is keyed on the
   pair. Drivetrain efficiency divides the aero, rolling and stop-go terms
   all three, so its value depends on how large those terms already are.
   Mass sets the rolling and stop-go terms and every slot carries mass. Swap
   two slots and the second swap lands on a car the first one already
   changed.

   So each slot's figure here answers exactly one question, stated in those
   words wherever it is shown: TAKE THE A CAR AND CHANGE ONLY THIS SLOT.
   Those nine answers do not add up to the total, and the leftover is
   computed and reported as `residual` rather than quietly distributed into
   the rows. On Gen 10 to Gen 11 the mass residual is 0.00 kg to the gram,
   because mass really is a sum, and the Wh/mi residual is not zero, because
   consumption really is not. Printing both is the point: the pair is the
   evidence that the decomposition is being read correctly. */

import { GENERATIONS, VARIANTS, SYSTEM_DEFS } from './registry.js';
import { computeBudget, areaFor } from './efficiency.js';

const MI_PER_KM = 0.621371;

const defs = Object.fromEntries(SYSTEM_DEFS.map((d) => [d.id, d]));
const variantOf = Object.fromEntries(VARIANTS.map((v) => [v.slot, v]));

/* rail order, which is the order the slots are read in everywhere a person
   looks at them; it is NOT the order they are evaluated in below */
export const SLOTS = VARIANTS.map((v) => v.slot);

/* the numbered ladder, excluding side studies, matching js/main.js */
export const LADDER = GENERATIONS.filter((g) => g.id !== 'value');

/* The slot's canonical name is its Gen 1 module's name, so the label does
   not change as the ladder advances. js/main.js's slotName() defers to this
   rather than carrying its own copy of the rule. */
export function slotBaseName(slot) {
  const v = variantOf[slot];
  const base = v && defs[v.options[0].sys];
  return base ? base.name : slot;
}

/* "Gen 11 tandem", the short name a variant goes by in the dropdowns */
export function moduleLabel(slot, sysId) {
  const v = variantOf[slot];
  const o = v && v.options.find((x) => x.sys === sysId);
  return (o && o.label) || sysId;
}

/* Which rung first put this module in this slot. A slot that does not
   advance at a rung is CARRIED, and naming where it was carried from is the
   difference between "nothing to see here" and "this was settled in Gen 9
   and Gen 11 had no reason to reopen it". */
export function introducedBy(slot, sysId) {
  return LADDER.find((g) => g.choices[slot] === sysId) || null;
}

const massOf = (ids) => ids.reduce((total, id) =>
  total + Object.values(defs[id].parts).reduce((s, m) => s + (m.mass || 0), 0), 0);

/* EVALUATION ORDER IS THE PRESET'S OWN KEY ORDER, not SLOTS.
   computeBudget walks its id list and Object.assign's each METRICS entry
   over the running set, so a plain auxW can overwrite an earlier one: the
   comment on thermal-7 in js/efficiency.js records that hv-4's 820 W would
   clobber a thermal auxW written the other way round. Object spread keeps
   the position of a key that already exists, so a one-slot swap below
   preserves the order the generation literal declared, and these figures
   are the same ones tools/ladder.js publishes rather than a near miss. */
function figuresFor(choices) {
  const ids = Object.values(choices);
  const mass = massOf(ids);
  const b = computeBudget(ids, mass);
  const whMi = b.total / MI_PER_KM;
  return {
    ids, mass, whMi,
    miKwh: 1000 / whMi,
    miles: b.rangeKm * MI_PER_KM,
    area: areaFor(ids),
    kwh: b.kwh,
    rows: b.rows,
  };
}

/* The public figure set for one rung, for the app's own readout. */
export function rung(genId) {
  const g = GENERATIONS.find((x) => x.id === genId);
  if (!g) return null;
  return { id: g.id, label: g.label, note: g.note, choices: g.choices, ...figuresFor(g.choices) };
}

/* ── The comparison ──────────────────────────────────────────────────────

   Returns EVERY slot, always, changed or not, and this is a decision rather
   than a convenience. design/app-brief.md section 7 names the failure this
   project keeps having: a check whose question cannot express the fault it
   exists to catch. The app-work version of it is a compare view that lists
   only what changed, which would be SILENT on a generation that changed
   nothing, and silence there is indistinguishable from a bug in the compare
   view itself. Nine rows in, nine rows out, and `changedCount` says how many
   of them moved so the caller never has to infer it from a list length. */
export function compare(aId, bId) {
  const a = rung(aId);
  const b = rung(bId);
  if (!a || !b) return null;

  const slots = SLOTS.map((slot) => {
    const aSys = a.choices[slot];
    const bSys = b.choices[slot];
    const changed = aSys !== bSys;
    /* take the A car and change ONLY this slot: see the header. Skipped
       entirely when the slot carries, because the answer is zero by
       construction and computing it would be nine extra budgets to prove it. */
    const only = changed ? figuresFor({ ...a.choices, [slot]: bSys }) : null;
    return {
      slot,
      name: slotBaseName(slot),
      color: defs[bSys].color,
      changed,
      aSys, bSys,
      aLabel: moduleLabel(slot, aSys),
      bLabel: moduleLabel(slot, bSys),
      aIntro: introducedBy(slot, aSys),
      bIntro: introducedBy(slot, bSys),
      dMass: only ? only.mass - a.mass : 0,
      dWhMi: only ? only.whMi - a.whMi : 0,
      dArea: only ? only.area - a.area : 0,
      dKwh: only ? only.kwh - a.kwh : 0,
    };
  });

  /* ── WHICH TERM THE GENERATION MOVED ──────────────────────────────────
     The budget card has always shown THIS rung's aero, rolling, stop-go,
     auxiliary and battery split and never which of them a generation
     actually moved, which is what every retro in design/ is about.

     This decomposition is EXACT, and that is the interesting part when it is
     read next to the per-slot one above. computeBudget's total is the sum of
     its five rows by construction: the first four are added to make the
     subtotal and the fifth is that subtotal times the pack's round-trip
     overhead. So the five term deltas add up to the total delta with nothing
     left over, while the nine slot deltas do not and cannot.

     Two decompositions of one number, one that closes and one that does not,
     and the reason is not arithmetic: a term is a share of where the energy
     went, and a slot is a thing you can swap. Slots interact. Terms partition. */
  const terms = a.rows.map(([label, aWhKm], i) => {
    const bWhKm = b.rows[i][1];
    return {
      label,
      a: aWhKm / MI_PER_KM,
      b: bWhKm / MI_PER_KM,
      d: (bWhKm - aWhKm) / MI_PER_KM,
    };
  });

  const sum = (k) => slots.reduce((s, x) => s + x[k], 0);
  const totals = {
    dMass: b.mass - a.mass,
    dWhMi: b.whMi - a.whMi,
    dMiKwh: b.miKwh - a.miKwh,
    dMiles: b.miles - a.miles,
    dArea: b.area - a.area,
    dKwh: b.kwh - a.kwh,
  };

  return {
    a, b, slots, terms, totals,
    changedCount: slots.filter((s) => s.changed).length,
    /* mass closes to the gram and consumption does not, which is the whole
       statement about what kind of quantity each one is. termWhMi is the
       control: the SAME total decomposed the other way closes exactly, so a
       reader can see that the slot residual is a property of slots and not a
       bug in the arithmetic. */
    residual: {
      mass: totals.dMass - sum('dMass'),
      whMi: totals.dWhMi - sum('dWhMi'),
      termWhMi: totals.dWhMi - terms.reduce((s, t) => s + t.d, 0),
    },
  };
}
