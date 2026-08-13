/* THE ENERGY STATE OF A CONFIGURATION: what it draws, what it can take back,
   and how long each of those takes.

   The efficiency card answers "how far", which is a distance. This answers
   "how fast is that being spent and how fast can it be replaced", which is a
   POWER, and power is what makes drive mode mean anything. Nothing here is a
   new model: consumption comes from computeBudget at the same cycle speed it
   was integrated at, and every charging figure is READ OUT OF THE MODULES'
   OWN SPEC ROWS rather than assumed.

   NO DOM. Imported by a browser and by tools/energy.sh.

   ── WHY THE CHARGE RATE IS PARSED AND NOT TABULATED ─────────────────────

   Writing "320 kW" in this file would be a second copy of a number that
   already exists in hv-11's v2g-port panel, and design/area-rezero.md is the
   record of what a second copy of a number does to this project. So the
   figure is lifted from the spec row a user can read for themselves, and if
   a module ever renames that row the tool fails loudly rather than serving a
   stale constant.

   TWO CONSTRAINTS, NOT ONE, and which of them binds is the interesting part.
   The port declares what it can deliver and the pack declares what it can
   accept, so the real rate is the lower of the two. Measured across the
   ladder: Gen 1 to 3 charge at 11 kW because they have only an on-board AC
   charger; Gen 4 brings a 320 kW DC port; and from Gen 7 the pack declares a
   348 kW ceiling of its own, which never binds, so the PORT is the limit on
   every rung that has one. That is a fact about this design worth showing
   rather than a number worth hiding. */

import { computeBudget, CYCLE_KMH } from './efficiency.js';

/* the first number followed by kW, on a row that is about charging */
const KW = /([\d.]+)\s*kW/;

/* Only parts that ARE the charging hardware. Scanning a whole module for a
   row mentioning power finds inverters, converters and low-voltage rails and
   picks whichever happens to be largest, which is how a plausible wrong
   answer gets published. hv.js calls them charge-port and obc, hv-4 and
   hv-11 call it v2g-port. */
const PORT_PART = /charge|port|obc/i;
const PORT_KEY = /charge|^ac$|^power$/i;
const PACK_KEY = /charge ceiling/i;

function bestKw(def, partRe, keyRe) {
  let kw = null, from = null;
  for (const [pid, m] of Object.entries(def.parts)) {
    if (partRe && !partRe.test(pid)) continue;
    for (const [k, v] of m.specs || []) {
      if (!keyRe.test(k)) continue;
      const hit = KW.exec(String(v));
      /* the FASTEST declared route, because a port that offers both AC and
         DC is used on its DC side */
      if (hit && (kw === null || +hit[1] > kw)) { kw = +hit[1]; from = { part: pid, key: k, text: String(v) }; }
    }
  }
  return { kw, from };
}

/* What one configuration does with energy. `defs` is an id to SYSTEM map, so
   this file needs no opinion about how modules are registered. */
export function energyFor(choices, defs) {
  const ids = Object.values(choices);
  let mass = 0;
  for (const id of ids) for (const m of Object.values(defs[id].parts)) mass += m.mass || 0;
  const b = computeBudget(ids, mass);

  /* Wh/km at the cycle mean speed is Wh/h, which is W. The five terms carry
     through the same multiplication, so the budget breakdown becomes a live
     power split without a second model behind it. */
  const toKw = (whKm) => (whKm * CYCLE_KMH) / 1000;
  const driveKw = toKw(b.total);

  const port = bestKw(defs[choices.hv], PORT_PART, PORT_KEY);
  const pack = bestKw(defs[choices.battery], null, PACK_KEY);
  const limits = [port.kw, pack.kw].filter((x) => x != null);
  const chargeKw = limits.length ? Math.min(...limits) : null;
  /* naming the binding constraint is the point of reading both */
  const boundBy = chargeKw == null ? null
    : (pack.kw != null && pack.kw < port.kw) ? 'pack' : 'port';

  return {
    packKwh: b.kwh,
    mass,
    cycleKmh: CYCLE_KMH,
    driveKw,
    terms: b.rows.map(([label, whKm]) => ({ label, kw: toKw(whKm) })),
    hoursToEmpty: b.kwh / driveKw,
    chargeKw,
    boundBy,
    port,
    pack,
    /* a flat fill at the declared rate. No taper curve is declared anywhere
       in the tree, and inventing the shape of one to make a nicer animation
       is exactly the kind of invention this project does not do. */
    chargeMinutes: chargeKw ? (b.kwh / chargeKw) * 60 : null,
  };
}
