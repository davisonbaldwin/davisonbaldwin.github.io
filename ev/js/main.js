/* EV·01 runtime: assembles the vehicle, wires the UI. */

import { STARTUP_GEN, assemble, buildVariant, SYSTEM_DEFS, VARIANTS, GENERATIONS } from './registry.js';
import { createViewer } from './viewer.js';
import { computeBudget, LOSS_NOTES } from './efficiency.js';
import { compare, slotBaseName, rung, moduleLabel } from './compare.js';
import { energyFor } from './energy.js';
import { STOPS, VIEWS, dwellMs } from './tour.js';

const $ = (s) => document.querySelector(s);
const el = (t, cls, html) => {
  const n = document.createElement(t);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

/* ── Assemble and mount ── */

const { root, systems, index, mass } = assemble();
const byKey = Object.fromEntries(index.map((r) => [r.key, r]));

/* A CLICK ON THE CAR TAKES THE WHEEL. This callback is the user's own pick and
   nothing else: viewer.js calls it from pick() only, so the tour's own
   viewer.select(null) between stops does not come through here. Autoplay used
   to keep its timer through it, so a reader who stopped the tour to look at
   the part it had just pointed at got yanked to the next stop mid-sentence,
   and the tour's camera flight fought the panel they had just opened. Every
   other manual gesture pauses; this is the one people actually make. */
const viewer = createViewer($('#gl'), (key) => {
  stopTourPlay();
  return key ? openPanel(key) : closePanel();
});
viewer.addVehicle(root, Object.fromEntries(
  /* def travels with the group because the viewer reads SYSTEM.closures off
     it: a lib.hinge tag says which geometry moves and the def says how */
  Object.entries(systems).map(([id, rec]) => [id, { group: rec.group, dir: rec.def.explode, def: rec.def }])
));

/* ── The palette, which was already here and was doing almost nothing ──
   Every module declares SYSTEM.color and the tree holds nine slot hues.
   Three lines in this file read them, all three to draw a thin bar beside a
   name. Handing the map to the viewer is what lets a selected part glow in
   ITS system's color instead of one global amber, and hexOf below is the
   same value on the CSS side, so the bar in the rail, the tab on the panel,
   the name under the pointer and the light on the car are one color and
   not four coincidences.
   Keyed by system id and sent once, so a variant built lazily on a switch
   an hour from now is already keyed: the map does not care whether the
   geometry exists yet. */
viewer.setSystemColors(Object.fromEntries(SYSTEM_DEFS.map((d) => [d.id, d.color])));
const hexOf = (def) => '#' + def.color.toString(16).padStart(6, '0');

/* THE ACCENT FOLLOWS WHAT YOU ARE LOOKING AT. --sel falls back to the amber
   in css/style.css, so with nothing selected the interface is exactly as
   monochrome as it was; the color arrives when a system does and leaves
   with it. That is the whole restraint: a pop where the attention already
   is, not a painted dashboard. */
const docEl = document.documentElement;
function setSel(def) {
  if (!def) {
    docEl.style.removeProperty('--sel');
    docEl.style.removeProperty('--sel-wash');
    return;
  }
  const c = def.color;
  docEl.style.setProperty('--sel', hexOf(def));
  docEl.style.setProperty('--sel-wash',
    `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255}, 0.13)`);
}

/* debug hook for console QA */
window.__ev = { viewer, root, systems, index };

/* ── Variants: one active system per slot; the rest stay hidden ── */

/* The car opens on the rung js/registry.js NAMES as STARTUP_GEN, which is
   Gen 18 at Davis's word on 2026-08-26 (Gen 1 until 2026-08-22, then the
   top rung until now). The registry builds exactly that rung's nine modules
   eagerly, so this is not a Gen 1 startup followed by a switch. */
const VARIANT_CHOICE = Object.fromEntries(VARIANTS.map((v) => [v.slot, STARTUP_GEN.choices[v.slot] || v.options[0].sys]));

/* the numbered ladder, excluding any side studies; buildRail reads this */
const LADDER = GENERATIONS.filter((g) => g.id !== 'value');

/* The readout's ladder strip, declared HERE and not beside the two functions
   that own it, three hundred lines down. refreshStats runs at module scope to
   fill the card, refreshStats calls refreshLadder, and refreshLadder reads
   this: `let` is not hoisted, so leaving the declaration where it read best
   threw "Cannot access ladBars before initialization" and the app booted to a
   blank page. That is the third time this file has been bitten by exactly
   this; see the notes on cmpOn and panelStep. */
let ladBars = [];

/* Search state, declared HERE and not down with the search code that owns it.
   refreshStats() runs at module scope to fill the readout and now quotes
   scale() in the stats strip's title, and `let` is not hoisted the way
   `function` is: leaving these where they read best threw "Cannot access
   SCALE before initialization" at module scope, which means no rail, no
   controls and a blank readout behind a car that renders fine. Second time
   this exact trap has been sprung in this file; the first is on cmpOn. */
let hay = null;
let SCALE = null;
let query = '';
/* id to SYSTEM, used by the cross-reference linker and by the energy model.
   Up here with the rest of the early state because refreshStats() runs at
   module scope and reaches it; the same trap as SCALE and cmpOn. */
const DEFS = Object.fromEntries(SYSTEM_DEFS.map((d) => [d.id, d]));

function currentGenId() {
  const hit = GENERATIONS.find((g) =>
    Object.entries(g.choices).every(([slot, sys]) => VARIANT_CHOICE[slot] === sys));
  return hit ? hit.id : 'custom';
}
const inactiveSys = () =>
  new Set(VARIANTS.flatMap((v) => v.options.filter((o) => o.sys !== VARIANT_CHOICE[v.slot]).map((o) => o.sys)));
for (const id of inactiveSys()) viewer.setSystemVisible(id, false);

/* THE RAIL KEEPS ONE ORDER FOR EVERY RUNG, and until this it did not.

   SYSTEM_DEFS is in the order js/registry.js imports its modules, which is
   roughly the order they were WRITTEN, so the rail was sorted by the history
   of the project rather than by the car. Gen 1 through Gen 10 all happened to
   read body, battery, drivetrain, thermal, hv, suspension, wheels, autonomy,
   interior, because those modules were added early and in that order. Gen 11
   read drivetrain, suspension, autonomy, interior, body, battery, wheels, hv,
   thermal, because its seven new modules were appended to the bottom of the
   import list and the two it carries were not.

   So stepping onto the flagship rung reshuffled all nine rows and renumbered
   them, and a reader who had learned that 01 is the body and 07 is the wheels
   had to learn it again. The order is now the SLOT order every other surface
   already uses: js/compare.js's SLOTS, the compare panel's nine rows, the
   generation presets themselves. A rung changes what is in a row, never where
   the row is. */
const SLOT_IX = {};
VARIANTS.forEach((v, i) => { for (const o of v.options) SLOT_IX[o.sys] = i; });

const activeDefs = () => {
  const hide = inactiveSys();
  return SYSTEM_DEFS.filter((d) => !hide.has(d.id))
    .sort((a, b) => (SLOT_IX[a.id] ?? 99) - (SLOT_IX[b.id] ?? 99));
};

/* Applying a generation changes up to nine slots at once. Rebuilding the
   rail and the readout once per slot meant nine full teardowns of #railList
   for one user action: measured at 9 wipes and 243 appended nodes where 27
   are wanted, and it also made the number tweens start from the eighth
   intermediate configuration instead of the rung the user came from, so a
   Gen 1 to Gen 9 step animated 23 miles of a 1,258 mile change. Coalescing
   is not an optimization here, it is what makes the animation true. */
let batching = 0, railDirty = false, statsDirty = false;
function flushUI() {
  if (railDirty) { railDirty = false; renderRail(); }
  if (statsDirty) { statsDirty = false; refreshStats(); }
  /* The generation control has to follow a single-slot change too. It did
     not: only applyGeneration refreshed it, so putting Gen 9 wheels on a
     Gen 5 car left the faceplate reading "Gen 5" with both stepper arrows
     enabled, and pressing the forward arrow then jumped the whole car to
     Gen 1 because LADDER.findIndex returned -1 and LADDER[-1 + 1] is Gen 1.
     Measured: 2,908 lb to 3,684 lb on one click of a button labeled next. */
  refreshGenCtl();
  /* A section is a plane at a station on THIS car, so a car that changed
     underneath it has moved the ends of the slider. Gen 1 is 4.86 m long and
     Gen 11 is narrower than either of them by 0.5 m, so a cut left at a Gen 1
     station can land outside a Gen 11 that no longer reaches it. */
  if (cutOn) refreshCutRange();
  /* a different car is a different set of measurements */
  if (dimsOn) refreshDims();
  /* and a different car opens differently: Gen 1's four doors on vertical
     hinges are not Gen 11's two, and the band names whatever this body
     actually declares */
  if (openOn) drawOpen();
}
function batch(fn) {
  batching++;
  try { fn(); } finally { batching--; }
  flushUI();
}

function setVariant(slot, sysId) {
  /* Both arguments checked against the registry, because this is on
     window.__ev and a script is what calls it with a name that does not
     exist. An unknown sysId reached buildVariant, which read `.parts` off an
     undefined definition and threw halfway through the swap: the old system
     had already been hidden on the line above, so the car was left with a
     hole in it and the slot pointing at a module that was never built. Bail
     before anything is mutated rather than after. */
  if (!Object.hasOwn(VARIANT_CHOICE, slot)) return;
  if (!VARIANTS.some((v) => v.slot === slot && v.options.some((o) => o.sys === sysId))) return;
  if (VARIANT_CHOICE[slot] === sysId) return;
  const old = VARIANT_CHOICE[slot];
  VARIANT_CHOICE[slot] = sysId;
  viewer.setSystemVisible(old, false);
  /* variants build lazily on first switch */
  if (!viewer.hasSystem(sysId)) {
    const built = buildVariant(sysId);
    if (built) viewer.addSystem(built.def.id, built.group, built.def.explode, built.def);
  }
  viewer.setSystemVisible(sysId, true);
  const sel = viewer.getSelected();
  if (sel && sel.startsWith(old + '/')) { closePanel(); viewer.select(null); }
  railDirty = true;
  statsDirty = true;
  if (!batching) flushUI();
}

/* Animate a numeric readout from its last value to the new one.
   500 ms and an ease-out cubic, which is exactly what css/style.css gives
   the waterfall bars, so a bar and the number beside it travel together
   instead of one snapping while the other crawls. */
const tweens = new Map();
function tweenNum(node, to, fmt, ms = 500) {
  const from = tweens.get(node) ?? to;
  tweens.set(node, to);
  /* settle on the true value synchronously; the animation only decorates
     the way there, so a paused rAF can never leave a stale readout */
  node.textContent = fmt(to);
  if (from === to) return;
  const t0 = performance.now();
  const stepFrame = (now) => {
    const k = Math.min(1, (now - t0) / ms);
    const e = 1 - Math.pow(1 - k, 3);
    node.textContent = fmt(from + (to - from) * e);
    if (k < 1 && tweens.get(node) === to) requestAnimationFrame(stepFrame);
    else node.textContent = fmt(to);
  };
  requestAnimationFrame(stepFrame);
}

/* Bars share ONE absolute scale across every configuration. Scaling each
   config to its own largest row made improvement read as growth: aero
   shrinks, the scale shrinks with it, and rolling and auxiliary bars got
   longer while their actual numbers fell. The scale is the worst row on
   the whole ladder, so shorter always means better. */
function budgetForChoices(choices) {
  const varSys = new Set(VARIANTS.flatMap((v) => v.options.map((o) => o.sys)));
  const active = new Set(SYSTEM_DEFS.map((d) => d.id).filter((id) => !varSys.has(id)));
  for (const sys of Object.values(choices)) active.add(sys);
  const m = index.filter((r) => active.has(r.sys)).reduce((a, r) => a + (r.meta.mass || 0), 0);
  return computeBudget([...active], m);
}
const BAR_SCALE = Math.max(
  ...GENERATIONS.map((g) => Math.max(...budgetForChoices(g.choices).rows.map(([, v]) => v)))
);

/* The waterfall rows are built ONCE and updated in place.
   css/style.css asks for `transition: width 500ms` on .e-bar i and it had
   never once run: refreshStats destroyed and recreated every row, and an
   element inserted with its width already set has no previous computed
   value to transition from, so getComputedStyle reported the final width in
   the same tick as the change. Measured on a Gen 1 to Gen 9 body swap the
   Aero bar went 100% to 42.2% instantly while the range headline crawled
   from 416 to 538 over 550 ms, so the card contradicted itself for half a
   second. Reusing the nodes makes the declared animation real, and the row
   numbers now ride the same tween as the headline. */
const effRows = new Map();   // label -> { row, fill, num }

function refreshStats() {
  const hide = inactiveSys();
  const act = index.filter((r) => !hide.has(r.sys));
  const mass = act.reduce((a, r) => a + (r.meta.mass || 0), 0);
  $('#stSys').textContent = activeDefs().length;
  $('#stParts').textContent = act.length;
  /* AMBIENT DENSITY, not a boast. These two figures already sat here saying
     "9" and "85" with no hint that they are a slice of something much
     larger, so the strip now carries the whole model in the one place a
     reader is already looking at a count of it. No new pixels. */
  {
    const s = scale();
    $('#stSys').parentElement.title =
      `${activeDefs().length} of ${s.systems} modules are on this car. ` +
      `The other ${s.systems - activeDefs().length} are the rest of the ladder.`;
    $('#stParts').parentElement.title =
      `${act.length} clickable parts on this car, ${s.parts} across all ` +
      `${s.systems} modules and ${s.rungs} rungs, carrying ` +
      `${s.specRows.toLocaleString()} spec rows and ` +
      `${s.words.toLocaleString()} words of written engineering. Search reaches all of it.`;
  }
  tweenNum($('#stMass'), mass, (v) => unitKey === 'imp'
    ? Math.round(v * 2.20462).toLocaleString() + ' lb'
    : Math.round(v).toLocaleString() + ' kg');

  /* live efficiency budget for the active configuration */
  const budget = computeBudget(activeDefs().map((d) => d.id), mass);
  const rowsEl = $('#effRows');
  const max = BAR_SCALE;
  const wanted = budget.rows.map(([label]) => label);
  /* the label set is the same at every rung today; rebuild only if a future
     budget term appears or disappears, so the common path keeps its nodes */
  if (wanted.length !== effRows.size || wanted.some((l) => !effRows.has(l))) {
    rowsEl.innerHTML = '';
    effRows.clear();
    for (const label of wanted) {
      const row = el('button', 'e-row');
      /* All five rows used to carry the identical title "What is this?",
         which names nothing, and a title needs a dwell before it appears.
         Five buttons that open five different explanations should not share
         one description; this is also what a screen reader reads out. */
      row.title = `${label}: what it costs, and what moves it`;
      const bar = el('div', 'e-bar');
      const fill = el('i');
      bar.append(fill);
      const num = el('b', null, '0');
      row.append(el('span', null, label), bar, num);
      rowsEl.append(row);
      effRows.set(label, { row, fill, num });
    }
  }
  let openLossNow = null;
  for (const [label, v] of budget.rows) {
    const r = effRows.get(label);
    r.fill.style.width = ((v / max) * 100).toFixed(1) + '%';
    tweenNum(r.num, v * U().per, (x) => x.toFixed(0));
    r.row.onclick = () => openLossPanel(label, v);
    if (lossOpen === label) openLossNow = v;
  }
  /* A LOSS PANEL HAS TO FOLLOW THE CAR IT DESCRIBES, and nothing was moving
     it. applyGeneration only closes the panel when something was SELECTED,
     and a loss panel is opened with no selection at all, so stepping the
     generation under an open "Rolling" left a chip reading "this build" over
     the previous rung's figure and a lever line pricing a car that was gone.
     setVariant only closes on the selected part's own module and
     refreshCompare only rebuilds a comparison, so nothing else reached it
     either. This is the one place that already knows every term's CURRENT
     value, so it is the place to re-render from: it covers the generation,
     a single slot swap and the mi/km toggle at once, because all three come
     through here. Re-rendered after the loop rather than inside it, so the
     rebuild cannot re-enter the draw it is standing in. */
  if (openLossNow != null) openLossPanel(lossOpen, openLossNow, true);
  /* print the end of the shared bar scale, so a short bar is a measurement
     against the whole ladder rather than a decoration */
  $('#effScale').textContent = (BAR_SCALE * U().per).toFixed(0);

  /* the readout: figures and their units are separate nodes so the headline
     number can be set at display size and the units stay small */

  /* THE HEADLINE ASCENDS. Wh per display unit is still what the waterfall
     above decomposes and still what the shared bar scale is printed in, so
     it is computed once here and used both ways: inverted for the figure the
     user reads, and printed verbatim underneath it as the sum of the rows.
     1000/(Wh/mi) is miles per kWh and 1000/(Wh/km) is km per kWh, so one
     expression serves both unit systems and the toggle needs nothing new.
     Measured over the ladder: 4.38, 5.73, 6.30, 6.52, 7.19, 7.66, 8.20,
     8.46, 8.81, 9.05, 10.22, which is the Wh/mi guard in tools/ladder.js
     read forward. That guard is NOT touched: it asserts Wh/mi falls rung
     over rung and it is correct. This is presentation. */
  const whPer = budget.total * U().per;
  tweenNum($('#effRate'), 1000 / whPer, (v) => v.toFixed(2));
  $('#effRateU').textContent = U().d + '/kWh';
  tweenNum($('#effTotal'), whPer, (v) => v.toFixed(1) + ' Wh/' + U().d);
  tweenNum($('#effRange'), budget.rangeKm * U().dist, (v) => Math.round(v).toLocaleString());
  $('#effRangeU').textContent = U().d;
  $('#effKwh').textContent = budget.kwh;
  refreshLadder();
  refreshEnergy();
}

/* ── THE PACK IN REAL TIME ──────────────────────────────────────────────
   Drive mode used to spin fourteen groups and mean nothing: measured, it
   costs 0.36 ms a frame and only the four wheels are visible from outside,
   under full covers. It now spends the battery, at the rate js/efficiency.js
   already computes, and parking the car puts it back at whatever rate the
   hv module's own spec row declares. The button finally answers a question.

   ONE TIME SCALE FOR BOTH, and that is the whole reason this is worth
   watching. Charging and driving are directly comparable, and what that
   comparison shows is the ladder: Gen 1 charges at 11 kW off an on-board AC
   charger and takes 8.6 hours to fill a pack that lasts 9.6 hours, so it
   spends nearly as long plugged in as moving. Gen 11 takes 36 minutes to
   fill a pack that lasts 44.7 hours. Normalizing the two rates would have
   hidden exactly that, so they share one scale and the scale is printed.

   THE SCALE IS 1 SECOND TO 10 MINUTES, and it was 30 until Davis asked how
   to see the pack charge back up. At 30 the answer was that you cannot: a
   320 kW fill takes 1.2 seconds of wall clock and the car starts charged
   before anyone has looked at it, so the readout only ever said HOLDING. At
   10 the same fill is 3.6 seconds, which is watchable, and Gen 1's is 52,
   which still makes the comparison the point of the thing. A full drain now
   takes longer than anyone will sit through and that is the right trade: the
   rate and the trend are the information, the empty pack is not.

   Every figure comes from js/energy.js, which reads the charge rate out of
   the panel a user can open and cross-checks it against the pack's own
   declared ceiling. tools/energy.sh asserts that hours-to-empty times the
   cycle speed reproduces the published range on all eleven rungs, which it
   does to 0.0000 miles. */
let driveOn = false;
const SIM_SCALE = 600;           // 1 s of wall clock is 10 min of car
let soc = 0.15;                  // starts low so the pad has real work on load
let energy = null;               // the active configuration's energy facts

function refreshEnergy() {
  const choices = {};
  for (const v of VARIANTS) choices[v.slot] = VARIANT_CHOICE[v.slot];
  energy = energyFor(choices, DEFS);
  drawEnergy();
}

/* Drive spends, parked fills, full holds. "Holds" is a real third state and
   it is what a finished charge looks like, so it is named rather than left
   as a bar that silently stops moving. */
function stepEnergy(dt) {
  if (!energy) return;
  const carSeconds = dt * SIM_SCALE;
  const before = soc;
  if (driveOn) soc -= (energy.driveKw * carSeconds / 3600) / energy.packKwh;
  else if (energy.chargeKw) soc += (energy.chargeKw * carSeconds / 3600) / energy.packKwh;
  soc = Math.max(0, Math.min(1, soc));
  if (soc !== before) drawEnergy();
  /* the pad stops pulsing the moment there is nothing to put in */
  viewer.setCharging(!driveOn && soc < 1 && !!energy.chargeKw);
}

function drawEnergy() {
  if (!energy) return;
  const full = soc >= 1;
  /* EMPTY IS A STATE, the same way "holding" is. soc clamps at 0, so a car
     driven to the bottom sat there reading "driving" with a bar at zero
     forever: the one moment the simulation has an answer for was the one it
     did not name, and the readout looked stalled rather than finished. Ahead
     of the driveOn test, because at zero the car is not driving any more. */
  const empty = driveOn && soc <= 0;
  const mode = empty ? 'empty'
    : driveOn ? 'driving' : full ? 'holding' : energy.chargeKw ? 'charging' : 'parked';
  $('#ergMode').textContent = mode;
  $('#ergMode').dataset.mode = mode;
  $('#ergFill').style.width = (soc * 100).toFixed(2) + '%';
  document.body.classList.toggle('driving', driveOn);
  /* The charging color went on the body next to `driving` rather than staying
     a sibling selector, because the sibling selector could never match:
     #ergMode is inside .e-head and #ergFill is inside .e-soc, so the two are
     cousins and `#ergMode[data-mode="charging"] ~ .e-soc` had no pair to
     match anywhere in the document. Charging therefore drew in exactly the
     same gray as driving, and the one state the pad animation exists to
     announce was the one the bar did not show. */
  document.body.classList.toggle('erg-charging', mode === 'charging');
  document.body.classList.toggle('erg-empty', empty);

  const kwh = soc * energy.packKwh;
  $('#ergState').innerHTML = `${Math.round(soc * 100)}<em>%</em>  ` +
    `${kwh.toFixed(0)}<em>of ${energy.packKwh} kWh</em>`;

  /* WHY THE FILL IS SO MUCH FASTER THAN THE DRAIN, which is the first thing
     anyone asks and which the readout could not answer. It is not the time
     scale: it is the two rates. A car cruising needs very little power and a
     DC port is built to shift a lot, so this car spends 4.25 kW and takes
     back 320, which is 75 times faster. Costs no pixels; lives on the hover
     of the section it explains. */
  if (energy.chargeKw) {
    const ratio = energy.chargeKw / energy.driveKw;
    $('.e-pack').title =
      `Driving spends ${energy.driveKw.toFixed(2)} kW at the model's ` +
      `${Math.round(energy.cycleKmh)} km/h cycle mean. The ${energy.boundBy} puts back ` +
      `${energy.chargeKw} kW, which is ${ratio.toFixed(0)} times faster, so ` +
      `${energy.hoursToEmpty.toFixed(1)} h of driving refills in ` +
      `${energy.chargeMinutes < 60 ? Math.round(energy.chargeMinutes) + ' min'
        : (energy.chargeMinutes / 60).toFixed(1) + ' h'}. ` +
      `On screen 1 second is ${Math.round(SIM_SCALE / 60)} minutes.`;
  }

  if (driveOn) {
    $('#ergRate').textContent = '-' + energy.driveKw.toFixed(2) + ' kW';
    const hrs = (kwh / energy.driveKw);
    const mi = hrs * energy.cycleKmh * 0.621371 * (unitKey === 'imp' ? 1 : 1 / 0.621371);
    $('#ergLeft').textContent = `${Math.round(mi).toLocaleString()} ${U().d} left`;
    $('#ergClock').textContent = hrs >= 1 ? hrs.toFixed(1) + ' h' : Math.round(hrs * 60) + ' min';
  } else if (full) {
    $('#ergRate').textContent = '0 kW';
    $('#ergLeft').textContent = 'full';
    $('#ergClock').textContent = '';
  } else if (energy.chargeKw) {
    $('#ergRate').textContent = '+' + energy.chargeKw + ' kW';
    const mins = ((1 - soc) * energy.packKwh / energy.chargeKw) * 60;
    /* naming the constraint, because on this ladder it is always the port
       and never the pack, and that is a fact about the design */
    $('#ergLeft').textContent = `${energy.boundBy} limit`;
    $('#ergClock').textContent = mins >= 60
      ? (mins / 60).toFixed(1) + ' h to full' : Math.round(mins) + ' min to full';
  } else {
    $('#ergRate').textContent = '';
    $('#ergLeft').textContent = 'no charge port declared';
    $('#ergClock').textContent = '';
  }
}

/* ── Units: imperial by default, since most viewers are American ── */
const UNITS = {
  imp: { d: 'mi', dist: 0.621371, per: 1 / 0.621371 },   // Wh/mi is larger than Wh/km
  met: { d: 'km', dist: 1, per: 1 },
};
let unitKey = 'imp';
try { unitKey = localStorage.getItem('ev-units') || 'imp'; } catch {}
/* A stored key that is not one of ours makes U() undefined, and the first
   thing refreshStats does with it is read U().per. That throws at module
   scope, which means no rail, no controls and a permanent readout of zeros
   behind a car that renders fine, and nothing the user can click gets them
   out of it. One line, because the restore path has to be unable to brick. */
if (!UNITS[unitKey]) unitKey = 'imp';
const U = () => UNITS[unitKey];

function setUnits(k) {
  unitKey = k;
  try { localStorage.setItem('ev-units', k); } catch {}
  $('#unitImp').classList.toggle('on', k === 'imp');
  $('#unitMet').classList.toggle('on', k === 'met');
  refreshStats();
}

/* Explain a waterfall row in the same panel parts use, so the efficiency
   card teaches instead of just reporting. */
/* which loss term is on screen, so the draw above can keep it current. null
   whenever the panel is showing anything else, which is every other writer
   of panelIsCompare below. */
let lossOpen = null;

/* `refresh` is the redraw above keeping an open panel current, as against a
   reader opening one. The difference is only the scroll: arriving at a panel
   starts at its top, the way openPanel's own note argues, but a generation
   step under a panel somebody is already reading halfway down must not yank
   them back to the top of it. */
function openLossPanel(label, whKm, refresh = false) {
  const note = LOSS_NOTES[label];
  if (!note) return;
  lossOpen = label;
  /* a loss term belongs to no system: aero is the body and the wheels and
     the mass all at once, so the accent goes back to the neutral amber
     rather than borrowing whichever system happened to be open before */
  setSel(null);
  panelIsCompare = false;
  const p = $('#panelIn');
  p.innerHTML = '';
  const nav = el('div', 'p-nav');
  const pill = el('div', 'p-sys', 'Efficiency budget');
  pill.style.setProperty('--sys', 'var(--acc)');
  nav.append(pill);
  p.append(nav, el('h3', null, label), el('p', 'p-tag', note.blurb));

  const chips = el('div', 'chips');
  chips.append(el('span', 'chip', `<small>this build</small>${(whKm * U().per).toFixed(1)} Wh/${U().d}`));
  p.append(chips);

  p.append(el('h5', null, 'What it is'), el('div', null, para(note.how)));
  p.append(el('h5', null, 'What moves it'), el('div', null, para(note.moves)));
  const lever = leverLine(label);
  if (lever) p.append(lever);

  /* the three lines every other panel ends on, and this one did not: it kept
     the previous panel's scroll offset, so opening "Rolling" from the middle
     of a long part panel landed in the middle of the loss panel, and it had no
     section strip at all while every other panel in the app has one. */
  sectionNav(p);
  if (!refresh) p.scrollTop = 0;
  spySections();

  $('#panel').classList.add('on');
  for (const b of Object.values(itemBtns)) b.classList.remove('on');
}
refreshStats();

/* ── Rail ── */

let itemBtns = {};

/* The rail names the SLOT, not the variant currently filling it, so the
   list of systems reads identically at every rung and only the dropdowns
   and counts move as you step the ladder. The slot's Gen 1 module carries
   the canonical name; the variant name is one line below in the dropdown
   and again at the top of the panel, so nothing is lost. */
const slotOf = (sysId) => VARIANTS.find((v) => v.options.some((o) => o.sys === sysId));
/* the rule itself lives in js/compare.js, because the compare panel names
   the same nine slots and two copies of "the slot is named after its Gen 1
   module" is one copy too many */
function slotName(def) {
  const slotDef = slotOf(def.id);
  return slotDef ? slotBaseName(slotDef.slot) : def.name;
}

/* A rail row is identified by its SLOT, never by the system currently in it,
   because the system id is the thing a variant change replaces. */
const slotKeyOf = (def) => (slotOf(def.id) || {}).slot || def.id;

/* The rail row that owns a part button. A slotted system lays out as
   head, then .r-var, then .r-parts, so the head is TWO siblings back, not
   one: `btn.parentElement.previousElementSibling` is the dropdown row, and
   it resolved that way for 85 of 85 part buttons at Gen 9. Marking that
   node `.open` matches no rule in the stylesheet, so the line that was
   supposed to reveal a part selected from the model or from a system
   overview had never once revealed one. */
function ownerHead(btn) {
  let n = btn.parentElement.previousElementSibling;
  while (n && !n.classList.contains('r-sys')) n = n.previousElementSibling;
  return n;
}

let railIntro = true;

/* ── SEARCH, over the parts AND over everything written about them ──────
   design/app-brief.md section 3 asks for a search across all 390 parts, and
   section 7 names the trap in the same breath: "a search that indexes only
   part names will be silent about the 232,633 words". That is the failure
   this project keeps having, stated in advance for once. A name index would
   answer "cell bricks" and would have nothing at all to say about "busbar",
   which appears in the prose of four packs and is the entire argument of one
   of them.

   So the haystack is every field a panel can show: the part name, its
   tagline, both columns of every spec row, How it works, Why this design,
   the failure modes, and the owning system's own name and blurb. The field
   a hit lands in is kept and reported, because "found in Why this design"
   is most of what makes a prose hit worth showing.

   IT SEARCHES ALL 53 MODULES, not the nine on screen. The ladder is the
   point of this model and a part that Gen 3 carried and Gen 9 replaced is a
   thing a person will look for. A hit outside the current car says so and
   switching to it swaps that slot on the way.

   Built ONCE and lazily, on the first keystroke rather than at boot: it is
   1.5 MB of string work and the boot path is already 350 ms of geometry
   before the first frame. `hay` is declared at the top of this file: see the
   note there. */
function buildHay() {
  if (hay) return hay;
  const defs = Object.fromEntries(SYSTEM_DEFS.map((d) => [d.id, d]));
  hay = index.map((rec) => {
    const m = rec.meta;
    const def = defs[rec.sys];
    const fields = [
      ['name', m.name || ''],
      ['tagline', m.tagline || ''],
      ['specification', (m.specs || []).map(([k, v]) => k + ': ' + v).join('  ')],
      ['how it works', m.how || ''],
      ['why this design', m.why || ''],
      ['failure modes', (m.fail || []).join('  ')],
      ['system', ((def && def.name) || '') + '. ' + ((def && def.blurb) || '')],
    ];
    return { rec, def, fields: fields.map(([f, v]) => [f, v, v.toLowerCase()]) };
  });
  return hay;
}

/* The counts the placeholder and the result line quote, measured off the same
   tree the panels render from so they cannot drift from what a user can open.

   WALKED OVER SYSTEM_DEFS AND NOT OVER THE HAYSTACK, which is a correction.
   The haystack carries the owning system's name and blurb on EVERY part, so
   that a search for a system name finds its parts; counting words off it
   therefore counts all 49 blurbs about nine times each and reported 372,166
   words against a true 328,613. A count and an index want the same text
   arranged differently, and reusing one for the other quietly inflated the
   headline figure by thirteen percent.

   It also means the count does not force the 1.5 MB haystack build, so the
   placeholder can be written without paying for a search nobody has run. */
function scale() {
  if (SCALE) return SCALE;
  const n = (s) => { const t = (s || '').trim(); return t ? t.split(/\s+/).length : 0; };
  let specRows = 0, words = 0;
  for (const d of SYSTEM_DEFS) {
    words += n(d.name) + n(d.blurb);
    for (const m of Object.values(d.parts)) {
      specRows += (m.specs || []).length;
      words += n(m.name) + n(m.tagline) + n(m.how) + n(m.why);
      for (const f of m.fail || []) words += n(f);
      for (const [k, v] of m.specs || []) words += n(k) + n(v);
    }
  }
  SCALE = { parts: index.length, systems: SYSTEM_DEFS.length,
            rungs: LADDER.length, specRows, words };
  return SCALE;
}

const esc = (s) => s.replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/* a window around the hit, so a prose match arrives with the sentence it
   was found in rather than as a filename */
function snippet(raw, at, len) {
  const s = Math.max(0, at - 40);
  const e = Math.min(raw.length, at + len + 60);
  return (s > 0 ? '…' : '') + esc(raw.slice(s, at)) +
         '<mark>' + esc(raw.slice(at, at + len)) + '</mark>' +
         esc(raw.slice(at + len, e)) + (e < raw.length ? '…' : '');
}

const RESULT_CAP = 60;

function runSearch(q) {
  const needle = q.toLowerCase();
  const hits = [];
  for (const h of buildHay()) {
    for (let i = 0; i < h.fields.length; i++) {
      const at = h.fields[i][2].indexOf(needle);
      if (at < 0) continue;
      /* the FIRST field that matches wins, and the field order above is the
         ranking: a name hit outranks a hit in the failure modes */
      hits.push({ h, rank: i, field: h.fields[i][0], raw: h.fields[i][1], at });
      break;
    }
  }
  hits.sort((a, b) => a.rank - b.rank ||
                      a.h.rec.meta.name.localeCompare(b.h.rec.meta.name));
  return hits;
}

function renderResults() {
  const railList = $('#railList');
  railList.innerHTML = '';
  railList.classList.remove('intro');
  itemBtns = {};
  const hits = runSearch(query);
  const live = new Set(Object.values(VARIANT_CHOICE));

  const head = el('div', 'r-count');
  if (!hits.length) {
    head.innerHTML = `<b>Nothing</b> matches “${esc(query)}” in ${scale().parts} parts ` +
                     `or the ${scale().words.toLocaleString()} words about them.`;
    railList.append(head);
    return;
  }
  const inCar = hits.filter((x) => live.has(x.h.rec.sys)).length;
  head.innerHTML = `<b>${hits.length}</b> part${hits.length === 1 ? '' : 's'} ` +
    `match “${esc(query)}”, ${inCar} on this car.`;
  railList.append(head);

  for (const hit of hits.slice(0, RESULT_CAP)) {
    const { rec, def } = hit.h;
    const b = el('button', 'r-hit' + (live.has(rec.sys) ? '' : ' off'));
    b.style.setProperty('--sys', hexOf(def));
    b.append(el('b', null, esc(rec.meta.name)));
    const where = el('u', null, hit.field === 'name' ? slotName(def)
      : `${slotName(def)} · ${hit.field}`);
    b.append(where);
    if (hit.field !== 'name') {
      b.append(el('span', null, snippet(hit.raw, hit.at, query.length)));
    }
    if (!live.has(rec.sys)) {
      /* a part from a rung that is not on screen is not hidden from the
         results, it is labeled, and choosing it swaps that slot */
      b.append(el('em', null, `not on this car · ${def.name}`));
    }
    b.onclick = () => gotoPart(rec, def);
    itemBtns[rec.key] = b;
    railList.append(b);
  }

  /* NO SILENT CAP. A list that quietly stops at sixty tells the reader it
     found sixty. */
  if (hits.length > RESULT_CAP) {
    railList.append(el('div', 'r-count more',
      `Showing the first ${RESULT_CAP}. ${hits.length - RESULT_CAP} more match; ` +
      `narrow the search to see them.`));
  }
}

/* Open a part wherever it lives. If its module is not the one filling that
   slot, the slot is swapped first, which is the whole reason searching all
   53 modules is useful rather than confusing. */
function gotoPart(rec, def) {
  const slotDef = slotOf(rec.sys);
  const needsSwap = slotDef && VARIANT_CHOICE[slotDef.slot] !== rec.sys;
  const finish = () => { viewer.select(rec.key); openPanel(rec.key); };
  if (!needsSwap) { finish(); return; }
  const run = () => { setVariant(slotDef.slot, rec.sys); finish(); };
  viewer.hasSystem(rec.sys) ? run() : withBusy(run);
}

/* One entry point, so every caller that dirties the rail gets whichever of
   the two lists is currently correct. buildRail used to be called directly
   from four places and a search would have been wiped by any of them. */
function renderRail() {
  if (query) renderResults(); else buildRail();
}

function buildRail() {
  const railList = $('#railList');
  const rail = $('#rail');
  /* Everything the user has done to this panel, carried across the rebuild.
     A variant change tore all of it up: measured, switching the wheels slot
     while a suspension part was open collapsed the expanded system, dropped
     the selected row's highlight (1 marked row to 0) and threw the scroll
     from 74 back to 0, while the 3D model and the open panel both still said
     that part was selected. Three surfaces, two of them lying. */
  const keepScroll = rail.scrollTop;
  const keepOpen = new Set([...railList.querySelectorAll('.r-sys.open')].map((h) => h.dataset.slot));
  const selKey = viewer.getSelected();

  railList.innerHTML = '';
  railList.classList.toggle('intro', railIntro);
  itemBtns = {};
  activeDefs().forEach((def, i) => {
    const head = el('button', 'r-sys');
    head.dataset.slot = slotKeyOf(def);
    /* the color goes on the ROW, not on the bead, so the open state can
       grow the same 3 px tab to full height without a second inline write */
    head.style.setProperty('--sys', hexOf(def));
    if (keepOpen.has(head.dataset.slot)) head.classList.add('open');
    head.title = def.name;
    head.append(el('span', 'car', '▶'));
    head.append(el('span', 'dot'), el('span', 'ix', String(i + 1).padStart(2, '0')),
                el('span', 'nm', slotName(def)));
    const partIds = Object.keys(def.parts);
    head.append(el('span', 'n', String(partIds.length)));

    const list = el('div', 'r-parts');
    for (const pid of partIds) {
      const key = def.id + '/' + pid;
      const b = el('button', 'r-item', def.parts[pid].name);
      b.onclick = () => { viewer.select(key); openPanel(key); };
      itemBtns[key] = b;
      list.append(b);
    }

    head.onclick = () => {
      const wasOpen = head.classList.contains('open');
      head.classList.toggle('open');
      if (!wasOpen) { viewer.focusSystem(def.id); openSystemPanel(def); }
    };

    $('#railList').append(head, list);

    /* variant dropdown under the slot this system belongs to, plus a
       "carried" note when the active rung predates the chosen generation,
       so a slot that does not change says so instead of silently repeating */
    const slotDef = slotOf(def.id);
    if (slotDef) {
      const slot = slotDef.slot;
      const row = el('div', 'r-var');
      /* One row per generation, not one per module. A slot that does not
         advance at a rung shows that rung as "carried", so a jump like
         thermal Gen 1 to Gen 5 reads as four deliberate carries instead of
         four missing generations. */
      const shortOf = (sys) =>
        (slotDef.options.find((o) => o.sys === sys)?.label || sys)
          .replace(/^Gen \d+\s*/, '') || 'reference';
      const introOf = (sys) => LADDER.find((g) => g.choices[slot] === sys);
      const opts = () => LADDER.map((g) => {
        const sys = g.choices[slot];
        const intro = introOf(sys);
        const isNew = intro && intro.id === g.id;
        return {
          value: g.id,
          label: isNew ? `${g.label} · ${shortOf(sys)}` : g.label,
          note: isNew ? undefined : `carried from ${intro ? intro.label : 'Gen 1'}`,
        };
      });
      const selected = () => {
        const cur = VARIANT_CHOICE[slot];
        const active = currentGenId();
        const here = LADDER.find((g) => g.id === active && g.choices[slot] === cur);
        return (here || LADDER.find((g) => g.choices[slot] === cur) || {}).id;
      };
      const slotDD = makeDropdown(
        opts, selected,
        (genId) => {
          const g = LADDER.find((x) => x.id === genId);
          if (!g) return;
          const sys = g.choices[slot];
          /* one module, so usually a few ms, but body-9 alone is worth a
             visible frame; show the same busy state a cold rung gets */
          if (viewer.hasSystem(sys)) setVariant(slot, sys);
          else withBusy(() => setVariant(slot, sys));
          /* the reader has found it; the invitation has done its job */
          learnedMix();
        },
        'dd-slot'
      );
      /* NAME THE ACTION. This control had no title at all, and its label reads
         "Gen 1 · reference", which is a STATUS. Styled as a control, sitting in
         a row of headings, saying only where the module came from: nothing
         about it says it can be changed, which is why the whole feature had to
         be stumbled into. The tooltip says the verb. */
      slotDD.title = `Take ${slotName(def).toLowerCase()} from any rung. ` +
                     'Mixing rungs builds a custom car.';
      row.append(slotDD);
      const intro = introOf(def.id);
      const curG = LADDER.find((g) => g.id === currentGenId());
      if (intro && curG && intro.id !== curG.id) {
        row.append(el('span', 'r-carry', `carried from ${intro.label}`));
      }
      head.after(row);
    }
  });
  if (railIntro) {
    [...railList.children].forEach((n, i) => { n.style.animationDelay = (i * 12) + 'ms'; });
    railIntro = false;
  }

  /* Put the selection back. The model and the panel both still hold it, so a
     rail that has forgotten it is the one surface out of three that is
     wrong. Expanding the owning system is part of that: without it the
     selected row is not merely unmarked, it is not in the document. */
  if (selKey && itemBtns[selKey]) {
    itemBtns[selKey].classList.add('on');
    const owner = ownerHead(itemBtns[selKey]);
    if (owner) owner.classList.add('open');
  }
  /* set last: the rows above decide how tall the list is */
  rail.scrollTop = keepScroll;
}
buildRail();

/* ── The search field ───────────────────────────────────────────────────
   The placeholder carries the size of the model, and this is the whole of
   what design/app-brief.md section 3 asks for under "surface the scale
   itself": ambient density beats a boast. A user who never types a word
   still reads that there are 390 parts and a quarter of a million words
   behind them, in the one place they were already looking for something.
   Every figure is counted off the same tree the panels render from. */
{
  const find = $('#railFind');
  /* Deferred off the boot path, because scale() builds the haystack and that
     is 1.5 MB of string work against a first frame this app is judged on.
     setTimeout and NOT requestAnimationFrame, for the reason the cold-rung
     note above records: rAF does not fire at all in a background tab, and a
     placeholder that never arrives is a search field with nothing written on
     it. Measured at 0 characters when this was two nested rAFs. */
  setTimeout(() => {
    const s = scale();
    /* NO WORD COUNT. It read as a boast, which is exactly what
       design/app-brief.md warned against under "ambient density beats a
       boast", and the useful half of the sentence was never the number: it
       is that the search reaches the writing and not only the names. That
       is what the title says now, in words. */
    find.placeholder = `Search ${s.parts} parts`;
    find.title = `${s.parts} parts across ${s.systems} modules and ${s.rungs} rungs. ` +
      `Search reaches the specifications and the written engineering, not just the names.`;
  }, 400);

  let t = 0;
  const apply = () => {
    const q = find.value.trim();
    /* one character matches most of the tree and is not a search */
    query = q.length >= 2 ? q : '';
    document.body.classList.toggle('finding', !!query);
    renderRail();
    $('#rail').scrollTop = 0;
  };
  find.addEventListener('input', () => {
    /* the scan is a linear pass over every field of 390 parts, so it is
       debounced to a frame rather than run on each keystroke of a paste */
    clearTimeout(t);
    t = setTimeout(apply, 90);
  });
  find.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && find.value) {
      /* Escape in the field clears the field, and does NOT fall through to
         the global handler that would close a panel the user is reading */
      e.stopPropagation();
      find.value = '';
      apply();
    }
    if (e.key === 'Enter') {
      const first = $('#railList .r-hit');
      if (first) first.click();
    }
  });
}

/* ── Generation presets: the optimization ladder, stepper + dropdown ── */

/* Changing the generation RELEASES the selected part, and this is a fix
   rather than a preference: Davis reported the view staying locked on
   whatever he was reading when he stepped the ladder, "a few times", which is
   exactly the shape of the bug.

   setVariant already deselects, but only when the selected part belongs to
   the module being swapped OUT, and it returns early when a slot does not
   change. Six of the nine slots are the SAME module between gen9 and gen10,
   so reading anything in body-9, drivetrain-9, hv-4, suspension-9, thermal-9
   or interior-6 and then stepping the ladder left the part selected, the
   panel open and the camera framed on it. Reading battery-10 or wheels-10 and
   doing the same thing worked, because those modules do change. Hence "a few
   times" rather than always.

   Deselecting per SLOT can never be right, because the question is not
   whether this part's module survived. It is that the user asked to look at a
   different car. */
function applyGeneration(id) {
  const g = GENERATIONS.find((x) => x.id === id);
  if (!g) return;
  const hadSelection = !!viewer.getSelected();
  batch(() => { for (const [slot, sys] of Object.entries(g.choices)) setVariant(slot, sys); });
  /* guarded: viewer.select(null) flies the camera home, so calling it when
     nothing was selected would yank a camera the user had placed themselves */
  if (hadSelection) { closePanel(); viewer.select(null); }
  refreshGenCtl();
}

/* ── Cold rungs ────────────────────────────────────────────────────────
   A generation whose modules have never been built blocks the main thread
   while they build. Timed over a fresh page, one visit each: gen2 103 ms,
   gen3 55, gen4 137, gen5 163, gen6 39, gen7 105, gen8 35, gen9 294, and
   0.5 to 5 ms once warm. 294 ms is a third of a second in which the frame
   does not advance, the cursor does not change and the stepper stays
   enabled, so the honest reading of that button is that the click did
   nothing, and the second click a user gives it is entirely reasonable.

   The work cannot be made to disappear, so it is made VISIBLE: the busy
   class goes on, two frames are allowed to pass so the browser actually
   paints it, and only then does the build run. The setTimeout is not a
   race with the frames, it is the floor under them: rAF does not fire at
   all in a background tab, and a click that lands just before the user
   switches away must still be honored when they come back.

   What is deliberately NOT here is a speculative idle prebuild of the next
   rung. It was written and then removed: this environment reports the page
   as hidden at every instant, so requestIdleCallback fires once per three
   seconds and rAF never fires at all, and there was no way to measure
   whether it helped a real visible tab. The one measurement that could be
   taken said it did not, a paced walk up the ladder costing 1,928 ms of
   blocking with it against 932 ms without, so it is written up rather than
   shipped on faith.

   applyGeneration itself stays SYNCHRONOUS. It is on window.__ev and a
   verification pass drives the ladder from script and screenshots it; a
   promise there would silently screenshot the previous rung. */
const isCold = (id) => {
  const g = GENERATIONS.find((x) => x.id === id);
  return !!g && Object.values(g.choices).some((sys) => !viewer.hasSystem(sys));
};

function withBusy(fn) {
  document.body.classList.add('busy');
  let ran = false;
  const run = () => {
    if (ran) return;
    ran = true;
    try { fn(); } finally { document.body.classList.remove('busy'); }
  };
  /* two frames: the first is the one this handler is already inside */
  requestAnimationFrame(() => requestAnimationFrame(run));
  setTimeout(run, 120);
}
/* Walking the ladder with a comparison open is the best thing this app can
   do, and it broke on the second step. Compare Gen 11 against Gen 10, press
   previous, and the current rung becomes the rung already being compared
   against: measured, the panel then read "Gen 10 to Gen 10, nothing differs"
   over a car that had just changed seven slots, and every further step down
   the ladder stayed degenerate.

   So a STEP carries the other half with it, and only when the pair would
   otherwise collapse. An explicit pick from the compare dropdown is left
   exactly where the user put it, including when they deliberately choose the
   same rung on both sides: that case is a real thing to look at, it is what
   proves the view is not silent when nothing changed, and auto-correcting it
   would make it unreachable. */
function nudgeAgainst() {
  if (!cmpOn || cmpAgainst !== currentGenId()) return;
  const i = LADDER.findIndex((g) => g.id === cmpAgainst);
  cmpAgainst = (LADDER[i - 1] || LADDER[i + 1] || LADDER[0]).id;
  cmpDD?.refresh();
  refreshCompare();
}

/* what the UI calls; scripts keep the direct one */
const goGeneration = (id) => {
  const run = () => { applyGeneration(id); nudgeAgainst(); };
  return isCold(id) ? withBusy(run) : run();
};

/* Extend the console QA hook now that the ladder controls exist. Driving the
   ladder from script is how a verification pass screenshots every rung
   without 40 UI clicks; see tools/shots.sh. */
/* search and scale go on the hook for the same reason applyGeneration does:
   this tab reports as hidden, so anything measured through a timer measures
   the clamp, and the only honest way to time the scan is to call it */
Object.assign(window.__ev, { applyGeneration, setVariant, GENERATIONS, VARIANTS,
                             search: (q) => runSearch(q), scale });

/* ── THE LADDER IN THE READOUT ──────────────────────────────────────────

   Eleven bars under the range figure, one per rung, height by range, the rung
   on screen lit. It exists because the readout could show you 1,942 miles and
   had no way to say that it started at 416 and that this is the top of an
   eleven-rung climb, which is the entire argument the project makes.

   IT IS ALSO THE CONTROL. Every bar is a button that goes to that rung, so
   the ladder is navigable from the card where its number lives, which is the
   difference between a picture of the ladder and the ladder.

   Bars rather than a line, and CSS rather than SVG: eleven rungs read as
   eleven things, and a flex row of divs is crisp at any card width without a
   viewBox to distort. Built once, because the figures are a property of the
   ladder and not of the car on screen; only the lit bar and the two endpoint
   labels change, and the labels change only when the unit does. */
function buildLadder() {
  const host = $('#effLadder');
  if (!host || ladBars.length) return;
  const figs = LADDER.map((g) => ({ id: g.id, label: g.label, ...(rung(g.id) || {}) }));
  const max = Math.max(...figs.map((f) => f.miles || 0)) || 1;
  ladBars = figs.map((f) => {
    const b = el('button', 'lad');
    /* a floor of 8 percent so Gen 1 is a bar and not a line: the ladder
       spans 423 to 1,560, about 3.7 to 1 on a 34 px strip */
    b.style.setProperty('--h', (8 + 92 * ((f.miles || 0) / max)).toFixed(1) + '%');
    b.dataset.gen = f.id;
    b.onclick = () => goGeneration(f.id);
    host.append(b);
    return { el: b, ...f };
  });
  refreshLadder();
}

/* the lit bar follows the car, and the titles carry the figure in whatever
   unit is selected, which is why this runs from refreshStats as well */
function refreshLadder() {
  if (!ladBars.length) return;
  const cur = currentGenId();
  for (const b of ladBars) {
    b.el.classList.toggle('on', b.id === cur);
    b.el.title = `${b.label} · ${rounded(asDist(b.miles))} ${U().d}`;
    b.el.setAttribute('aria-label', b.el.title);
  }
  /* the endpoint labels are the strip's MIN and MAX, not its first and last
     bars. Those were the same thing for as long as the ladder was monotonic,
     and the Cd re-zero ended that: Gen 11 is the last rung and not the
     highest, so labeling the last bar captioned a 1,560-mile strip "1,415".
     See design/cd-rezero.md. */
  let lo = ladBars[0], hi = ladBars[0];
  for (const b of ladBars) {
    if ((b.miles || 0) < (lo.miles || 0)) lo = b;
    if ((b.miles || 0) > (hi.miles || 0)) hi = b;
  }
  $('#ladLo').textContent = rounded(asDist(lo.miles));
  $('#ladHi').textContent = `${rounded(asDist(hi.miles))} ${U().d}`;
}

let genDD = null, genPrev = null, genNext = null, cmpBtn = null, cmpDD = null, tourBtn = null;
let genBack = null;
/* the last rung the car actually stood on, so a custom mix has somewhere to go
   back TO by name rather than to a hardcoded Gen 1 */
let lastRungId = 'gen1';
/* Declared HERE and not down with the rest of compare mode, because
   refreshGenCtl runs during the generation control's own setup and reads
   both of them, and the compare block sits below that. `let` is not hoisted
   the way `function` is, so leaving these where they read best threw
   "Cannot access cmpAgainst before initialization" at module scope, which
   means no rail, no controls and a blank readout behind a car that renders
   fine. Same failure shape the unit-key guard above exists to prevent. */
let cmpOn = false;
let cmpAgainst = null;
/* The tour's two state values live here rather than down with the rest of the
   tour, because refreshGenCtl below reads them and refreshGenCtl runs during
   module evaluation. Declared at the bottom they sat in a `let`'s temporal
   dead zone at that moment and the whole file stopped executing on a
   ReferenceError, which takes the app down to the boot screen. */
let tourOn = false;
let tourAt = 0;
function refreshGenCtl() {
  refreshLadder();
  genDD?.refresh();
  cmpDD?.refresh();
  const cur = currentGenId();
  const i = LADDER.findIndex((g) => g.id === cur);
  if (i >= 0) lastRungId = cur;          // somewhere to come back to
  if (genPrev) genPrev.disabled = i <= 0;
  if (genNext) genNext.disabled = i < 0 || i >= LADDER.length - 1;
  /* A DISABLED CONTROL THAT SAYS NOTHING IS A FAULT REPORT. Both steppers go
     dead the moment the car stops being a rung, which is correct, and until now
     they went dead with an empty title, so the interface's answer to "why can I
     not press this" was silence. Say it, and offer the door out beside them. */
  const backTo = LADDER.find((g) => g.id === lastRungId);
  if (i < 0) {
    const why = 'This car is a mix of rungs, so there is no next or previous one';
    if (genPrev) genPrev.title = why;
    if (genNext) genNext.title = why;
    if (genBack && backTo) {
      genBack.hidden = false;
      genBack.textContent = backTo.label;
      genBack.title = `Put every system back on ${backTo.label}`;
    }
  } else {
    if (genPrev) genPrev.title = 'The rung below this one';
    if (genNext) genNext.title = 'The rung above this one';
    if (genBack) genBack.hidden = true;
  }
  /* A custom mix is not a rung, so there is nothing on the ladder to compare
     it with. The stepper already disables itself for exactly this reason and
     this follows it rather than inventing a second answer: comparing a mix
     would mean naming it, and it has no name. */
  if (cmpBtn) {
    cmpBtn.disabled = i < 0;
    if (i < 0 && cmpOn) setCompare(false);
  }
  if (cmpOn) refreshCompare();
  /* THE TOUR'S GHOST BELONGS TO THE TOUR'S RUNG, and the stepper sits in the
     same #pGen group as the tour button and is never disabled while the tour
     runs. tourGo ghosts the slots its stop changed, by module id, and those
     ids are the ids of THAT rung: step the generation underneath and every id
     in the focus set names a module that is no longer on the car, so every
     visible module tests as outside the focus. The whole car went to 7 percent
     and nothing on it could be clicked, with the tour bar still reading like
     everything was fine. Compare had this covered one line up and the tour
     had no branch at all.

     Dropped rather than re-derived. Re-deriving would silently rewrite the
     stop's argument against a rung the stop is not about; the reader has
     driven away from the comparison, so the honest thing is to stop drawing
     it and hand the car back solid. The tour bar, its prose and its stop
     stay, and stepping back to the stop's own rung restores the ghost.

     Ordering is safe: the tour's own applyGeneration at tourGo runs BEFORE it
     sets the focus, and at that moment the current rung is already the stop's,
     so this leaves a normal tour step alone. */
  if (tourOn && STOPS[tourAt] && currentGenId() !== STOPS[tourAt].gen) {
    viewer.setFocusSystems(null);
  }
}

if (GENERATIONS.length) {
  const wrap = el('div', 'gen');
  genPrev = el('button', 'gen-step', '‹');
  genNext = el('button', 'gen-step', '›');
  const step = (d) => {
    const i = LADDER.findIndex((g) => g.id === currentGenId());
    /* a custom mix is not on the ladder, so there is no next rung. Without
       this, LADDER[-1 + 1] made "next" mean "throw the mix away and go to
       Gen 1", and "previous" read LADDER[-2] and did nothing at all. */
    if (i < 0) return;
    const next = LADDER[i + d];
    if (next) goGeneration(next.id);
  };
  genPrev.onclick = () => step(-1);
  genNext.onclick = () => step(1);

  const genOpts = () => [
    ...LADDER.map((g) => ({ value: g.id, label: g.label, note: g.note, group: 'Ladder' })),
    ...GENERATIONS.filter((g) => g.id === 'value')
      .map((g) => ({ value: g.id, label: g.label + ' · value study', note: g.note, group: 'Studies' })),
  ];
  genDD = makeDropdown(genOpts, currentGenId, goGeneration, 'dd-gen');

  /* THE WAY BACK OUT OF A CUSTOM CAR. Mixing rungs is the one thing here that
     leaves the ladder, and until now leaving it was a one-way door as far as
     the faceplate was concerned: the label read "Custom", both steppers went
     disabled with NO title on them, compare went disabled, and nothing on
     screen said what had happened or how to undo it. The rung was still in the
     dropdown, so the way back existed; it was just never offered. This is the
     offer, and it names the rung so it is a promise rather than a reset button:
     "Gen 5" tells you where you land. */
  genBack = el('button', 'gen-step gen-back', '');
  genBack.onclick = () => goGeneration(lastRungId);
  genBack.hidden = true;

  /* The compare control sits in the generation group because it asks a
     generation question. It is a toggle and not a mode screen: the car, the
     rail and every other control keep working while it is on. */
  cmpBtn = el('button', 'gen-step cmp', 'vs');
  cmpBtn.title = 'Compare this rung with another';
  cmpBtn.onclick = () => setCompare(!cmpOn);
  cmpDD = makeDropdown(
    () => LADDER.map((g) => ({ value: g.id, label: g.label, note: g.note })),
    () => cmpAgainst,
    (id) => { cmpAgainst = id; openComparePanel(); },
    'dd-gen dd-cmp');

  /* The tour sits with the generation controls because it walks the ladder,
     and beside `vs` because the two are the same question asked at different
     lengths: one rung against another, or all eleven in order with the reason
     each one happened. */
  tourBtn = el('button', 'gen-step tour', 'tour');
  tourBtn.title = 'Walk the ladder, Gen 1 to Gen 22, with the argument for each rung';
  tourBtn.onclick = () => setTour(!tourOn);

  wrap.append(genPrev, genDD, genBack, genNext, cmpBtn, cmpDD, tourBtn);
  $('#pGen').append(el('small', null, 'generation'), wrap);
  refreshGenCtl();
}

/* ── Compare mode ───────────────────────────────────────────────────────
   The whole argument this project makes is the ladder: eleven rungs, each
   strictly better, with the reasons written down. Until this the app could
   not put two of them side by side. You stepped the dropdown, the car
   changed, and the one thing the model exists to demonstrate was the one
   thing it could not show.

   ONLY ONE CAR IS EVER BUILT, and that is a deliberate answer to the warning
   in design/app-brief.md section 5 that compare mode would make cold builds
   more likely by showing two rungs at once. Applying gen11 cold measured
   3.4 s in the browser because seven modules build; a compare that built
   both rungs would pay that twice, on a control that invites stepping
   through pairs. It is not needed. The FIGURES for the other rung come out
   of js/compare.js, which computes them from registry metadata and
   computeBudget without building a single triangle, and the PICTURE is the
   car already on screen with the slots that differ lit and the slots that
   carry ghosted. Nothing is built that was not already built.

   The ghost state is never worse than reading a part, either: selecting a
   part today ghosts everything outside one system, and the widest compare
   ghosts everything outside seven. The measured 9.0 ms frame with
   FX.ghostCull on is the bound for both.

   cmpOn and cmpAgainst are declared up with the generation control, because
   refreshGenCtl reads them during that control's setup, which is above. */

/* EARLIER RUNG FIRST, ALWAYS. The ladder is an ascent and reading it that
   way is what makes a delta mean "bought". Picking Gen 9 while sitting on
   Gen 5 would otherwise render as Gen 9 to Gen 5 and report every gain as a
   loss, which is true arithmetic and a lie about the ladder. */
function cmpPair() {
  const cur = currentGenId();
  const ia = LADDER.findIndex((g) => g.id === cmpAgainst);
  const ib = LADDER.findIndex((g) => g.id === cur);
  return ia <= ib ? [cmpAgainst, cur] : [cur, cmpAgainst];
}

function setCompare(on) {
  cmpOn = on;
  document.body.classList.toggle('cmp', on);
  /* the second rung dropdown joins or leaves the faceplate's first row, and
     on a narrow window that changes how many rows the bar has */
  syncBarH();
  cmpBtn.classList.toggle('on', on);
  cmpBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  if (on) {
    /* default to the rung before this one, which is the comparison anybody
       stepping the ladder is already making in their head. Gen 1 has no
       predecessor, so it looks forward instead of offering nothing. */
    const i = LADDER.findIndex((g) => g.id === currentGenId());
    if (!cmpAgainst || cmpAgainst === currentGenId()) {
      cmpAgainst = (LADDER[i - 1] || LADDER[i + 1] || LADDER[0]).id;
    }
    refreshCompare();
    openComparePanel();
  } else {
    viewer.setFocusSystems(null);
    closePanel();
  }
  cmpDD?.refresh();
}

/* Which modules ON SCREEN belong to a slot that differs between the two
   rungs. Read from VARIANT_CHOICE rather than from either preset, because
   the statement being made is about the car in front of you.

   An empty list is passed through rather than special-cased: two rungs with
   no slot between them ghost nothing, which viewer.setFocusSystems treats as
   "light everything" on purpose. See the note there. */
function applyCompareGhost() {
  if (!cmpOn) return;
  const c = compare(...cmpPair());
  if (!c) return;
  viewer.setFocusSystems(c.slots.filter((s) => s.changed).map((s) => VARIANT_CHOICE[s.slot]));
}

/* Stepping the ladder with compare open changes one half of the pair, so
   the panel has to be rebuilt and not merely re-ghosted. It had not been:
   measured, stepping from Gen 11 back to Gen 10 with the comparison open
   re-ghosted the car correctly and left the panel reading "Gen 11 to Gen 11,
   nothing differs" over a car that now differed in seven slots. Two
   surfaces, one of them wrong, which is the same shape as the rail bug the
   selection-restore note above records.

   Guarded on panelIsCompare so that reading a MODULE from the comparison is
   not interrupted: the ghosting follows the ladder, the panel stays where
   the user put it. */
let panelIsCompare = false;
/* How to walk to the next part of the module being read, or null when the
   panel is not a part. Set by openPanel, cleared by everything else that
   owns the panel, and read by the arrow keys. Declared up here with the
   other panel state and not beside the key binding that reads it, because
   openPanel is above that and `let` is not hoisted; the note on cmpOn
   records what that costs. */
let panelStep = null;
function refreshCompare() {
  applyCompareGhost();
  if (cmpOn && panelIsCompare) openComparePanel();
}

/* ── DIMENSIONS ─────────────────────────────────────────────────────────

   design/app-brief.md section 3 asks for visible measurements in 3D. This is
   that, and the rule it lives by is the one the whole project lives by:
   NOTHING HERE IS DECLARED. Every figure is measured off the geometry that
   is on screen at that instant, through viewer.vehicleBox and
   viewer.partBoxes, so a dimension cannot disagree with the car it is drawn
   on. There is no table of vehicle dimensions anywhere in this app and there
   is deliberately not going to be one.

   The tires are the anchor for the wheelbase and both tracks, and they can
   be: every one of the eight wheel modules on the ladder, Gen 1 through Gen
   11, names its tire part `tires`, and each of the four is its own instance
   in the part group. Four boxes give two axle stations and two track widths.
   A single union box would only ever have given an overall width.

   DRAWN AS AN OVERLAY, NOT AS GEOMETRY. Lines in the scene would be meshes,
   and js/viewer.js draws the scene twice a frame for the floor reflection,
   so every dimension would cost two draw calls and would need excluding from
   the mirrored pass by hand. An SVG on top costs nothing per frame but the
   projection of a handful of points, stays hairline-crisp at any zoom, and
   is what a drawing looks like anyway: a dimension is not part of the car.
   The price is that dimension lines do not hide behind bodywork, which is
   also true of every dimension on every engineering drawing ever made. */

let dimsOn = false;
let dimEl = null;
let dimSet = [];        // the world-space dimensions currently being drawn
let dimSelKey = null;   // the part the current set describes, or null for the car
let dimNodes = [];      // one node bundle per dimension, reused across frames
const SVGNS = 'http://www.w3.org/2000/svg';

const svg = (t, attrs) => {
  const n = document.createElementNS(SVGNS, t);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
};

/* One unit for the whole set, chosen by its largest member: a part 0.6 m
   long beside two figures in millimeters reads as three different kinds of
   thing. The model's own spec rows do the same. */
function dimUnit(dims) {
  const big = dims.reduce((m, d) => Math.max(m, d.v), 0);
  return big < 0.5
    ? { k: 1000, u: 'mm', d: 0 }
    : { k: 1, u: 'm', d: 3 };
}

/* THE VEHICLE, measured. Seven figures, and they are the seven a packaging
   argument is made in: the three overall extents, the wheelbase, both
   tracks, and what is left under the car.

   Both tracks and not one, because the ladder turns on the difference. Gen 7
   narrows the REAR track to |z| 0.74 so the boat tail can close and leaves
   the front where it was; Gen 9 brings the front in to match. Two figures
   make that visible and one figure hides it. */
function vehicleDims() {
  /* THE PARKED BOX, not the live one, and only for the overall envelope. How
     wide a car is is a property of the car and not of whether somebody left a
     door ajar: with a front door open on Gen 1 the live box reads 3.93 m
     across, which is a true measurement of the wrong thing. parkedBox is the
     last box measured with every closure shut, which is the figure that goes
     on a certificate. Ground clearance below reads the live box on purpose,
     because nothing that opens on this car reaches under it. */
  const box = viewer.parkedBox() || viewer.vehicleBox();
  if (!box) return [];
  const tires = viewer.partBoxes(VARIANT_CHOICE.wheels + '/tires');
  const mid = (b, k) => (b.min[k] + b.max[k]) / 2;
  const front = tires.filter((b) => mid(b, 'x') > 0);
  const rear = tires.filter((b) => mid(b, 'x') <= 0);
  const meanX = (list) => list.reduce((s, b) => s + mid(b, 'x'), 0) / (list.length || 1);
  const track = (list) => (list.length < 2 ? 0
    : Math.abs(Math.max(...list.map((b) => mid(b, 'z'))) - Math.min(...list.map((b) => mid(b, 'z')))));

  const xf = meanX(front), xr = meanX(rear);
  const tf = track(front), tr = track(rear);
  /* the lowest point of the car that is NOT a wheel, which is what ground
     clearance means and why the wheels system is the one thing left out */
  const under = viewer.vehicleBox(VARIANT_CHOICE.wheels);
  const clear = under ? Math.max(0, under.min.y) : 0;
  /* WHERE EACH LINE STANDS IS THE HALF OF THIS THAT IS NOT ARITHMETIC.

     Every label is drawn at the midpoint of its own line, so two dimensions
     that share a plane and a direction put their labels on top of each
     other. The first version had length, wheelbase and ground clearance all
     on the floor on the near side within 0.2 m of each other, and all three
     labels landed in the same hundred pixels.

     So the seven are spread across four planes: the two long ones stand off
     the near flank at 0.60 and 0.30, far enough apart to separate on screen
     at any sane zoom; width stands ahead of the nose; height stands off the
     rear corner rather than on the centerline, where it crossed the body;
     and the clearance goes on the FAR side, where nothing else is. Only the
     two tracks are drawn on the car, and they have to be: a track is
     measured between wheel centers and that is where the wheels are. */
  const zo = box.max.z;
  const out = [
    /* the two long dimensions carry their labels at different points ALONG
       themselves, 0.62 and 0.28, because standing them 0.30 m apart in the
       world is worth about ten pixels from a three-quarter camera and their
       two-line labels are taller than that. Moving a label along its own
       line separates them whatever the view is doing. */
    { name: 'length', v: box.max.x - box.min.x, t: 0.62,
      a: [box.min.x, 0, zo + 0.60], b: [box.max.x, 0, zo + 0.60] },
    { name: 'width', v: box.max.z - box.min.z,
      a: [box.max.x + 0.35, 0, box.min.z], b: [box.max.x + 0.35, 0, box.max.z] },
    { name: 'height', v: box.max.y - box.min.y,
      a: [box.min.x - 0.35, box.min.y, zo], b: [box.min.x - 0.35, box.max.y, zo] },
  ];
  if (front.length && rear.length) {
    out.push({ name: 'wheelbase', v: xf - xr, t: 0.28,
               a: [xr, 0, zo + 0.30], b: [xf, 0, zo + 0.30] });
  }
  if (tf) out.push({ name: 'front track', v: tf, a: [xf, 0, -tf / 2], b: [xf, 0, tf / 2] });
  if (tr) out.push({ name: 'rear track', v: tr, a: [xr, 0, -tr / 2], b: [xr, 0, tr / 2] });
  if (clear > 0.001) {
    out.push({ name: 'ground clearance', v: clear,
               a: [0, 0, -zo - 0.30], b: [0, clear, -zo - 0.30] });
  }
  return out;
}

/* ONE INSTANCE OF THE PART, not the union of them. A wheel module's tires
   are four objects 1.6 m apart and their union is a track width, which is
   not a tire. Four brake discs measure one disc, and the label says `each`
   so the figure cannot be mistaken for a total. */
function partDims(key) {
  const boxes = viewer.partBoxes(key);
  if (!boxes.length) return [];
  const box = boxes.reduce((m, b) => {
    const vol = (x) => (x.max.x - x.min.x) * (x.max.y - x.min.y) * (x.max.z - x.min.z);
    return vol(b) > vol(m) ? b : m;
  }, boxes[0]);
  const n = boxes.length > 1 ? ' each' : '';
  const { min, max } = box;
  return [
    { name: 'length' + n, v: max.x - min.x, a: [min.x, min.y, min.z], b: [max.x, min.y, min.z] },
    { name: 'width' + n, v: max.z - min.z, a: [max.x, min.y, min.z], b: [max.x, min.y, max.z] },
    { name: 'height' + n, v: max.y - min.y, a: [max.x, min.y, max.z], b: [max.x, max.y, max.z] },
  ].filter((d) => d.v > 0.0005);
}

function buildDims() {
  if (dimEl) return dimEl;
  dimEl = svg('svg', { id: 'dims' });
  document.body.append(dimEl);
  return dimEl;
}

/* Rebuild the node bundles. Called when WHAT is being measured changes, not
   when the camera moves: a camera move only reprojects points that already
   have nodes, which is drawDims below and is the thing that runs per frame. */
function refreshDims() {
  if (!dimsOn) return;
  const sel = viewer.getSelected();
  dimSelKey = sel;
  dimSet = sel ? partDims(sel) : vehicleDims();
  const u = dimUnit(dimSet);
  buildDims();
  dimEl.innerHTML = '';
  dimNodes = dimSet.map((d) => {
    const g = svg('g', { class: 'dim' });
    const line = svg('line', {});
    const t1 = svg('line', { class: 'dim-t' });
    const t2 = svg('line', { class: 'dim-t' });
    const val = svg('text', { class: 'dim-v' });
    const name = svg('text', { class: 'dim-n' });
    val.textContent = (d.v * u.k).toFixed(u.d) + ' ' + u.u;
    name.textContent = d.name;
    g.append(line, t1, t2, name, val);
    dimEl.append(g);
    return { g, line, t1, t2, val, name };
  });
  drawDims();
}

/* Per frame, and it is deliberately the cheapest thing that can be: two
   projections and eight attribute writes per dimension, no layout reads. */
function drawDims() {
  if (!dimsOn) return;
  /* WHAT is being measured is checked here rather than wired into every
     path that can change it. A part is selected from the rail, from the
     canvas, from a cross-reference inside a panel, from search, from the
     compare rows and from the tour, and every one of those would have had to
     remember to say so. One string comparison a frame buys all of them. */
  const sel = viewer.getSelected();
  if (sel !== dimSelKey) { dimSelKey = sel; refreshDims(); return; }
  if (!dimNodes.length) return;
  for (let i = 0; i < dimNodes.length; i++) {
    const d = dimSet[i], n = dimNodes[i];
    const a = viewer.project(d.a[0], d.a[1], d.a[2]);
    const b = viewer.project(d.b[0], d.b[1], d.b[2]);
    if (a.behind || b.behind) { n.g.style.display = 'none'; continue; }
    n.g.style.display = '';
    n.line.setAttribute('x1', a.x); n.line.setAttribute('y1', a.y);
    n.line.setAttribute('x2', b.x); n.line.setAttribute('y2', b.y);
    /* ticks across the ends, in SCREEN space, so a dimension seen almost
       edge-on still ends in something a reader can see */
    let dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const px = (-dy / len) * 5, py = (dx / len) * 5;
    n.t1.setAttribute('x1', a.x - px); n.t1.setAttribute('y1', a.y - py);
    n.t1.setAttribute('x2', a.x + px); n.t1.setAttribute('y2', a.y + py);
    n.t2.setAttribute('x1', b.x - px); n.t2.setAttribute('y1', b.y - py);
    n.t2.setAttribute('x2', b.x + px); n.t2.setAttribute('y2', b.y + py);
    /* the label sits off the line on the side away from the car, which for
       every dimension here is the side the line is already standing off on */
    /* A SHORT DIMENSION PUTS ITS LABEL PAST THE END OF ITSELF. A tire is
       0.710 by 0.135 by 0.710, so its width edge is about 25 px on screen at
       the distance select() frames a part from, and a label centered on that
       edge sits inside the two labels either side of it. Past 60 px the
       label goes where a drawing puts it, on the middle of the line. */
    const t = d.t == null ? 0.5 : d.t;
    let mx, my;
    if (len < 60) {
      mx = b.x + (dx / len) * 26 + px * 1.4;
      my = b.y + (dy / len) * 26 + py * 1.4;
    } else {
      mx = a.x + dx * t + px * 2.2;
      my = a.y + dy * t + py * 2.2;
    }
    n.val.setAttribute('x', mx); n.val.setAttribute('y', my);
    n.name.setAttribute('x', mx); n.name.setAttribute('y', my - 12);
  }
}

/* THE SIZE CONTROL IS GONE, at Davis's request on 2026-08-17: "remove the size
   feature button we don't need it". The BUTTON is what was removed, not the
   measurement: setDims still works and window.__ev.dims still drives it, which
   is what a verification pass uses to assert the figures rather than reading
   them off an image, and viewer.parkedBox is the same machinery the closures
   card measures against. Nothing in the app reaches this any more, so if it is
   still unreachable next time somebody reads this file, delete the lot:
   buildDims, refreshDims, vehicleDims, partDims and the #dims styles. */
function setDims(on) {
  dimsOn = on;
  buildDims();
  document.body.classList.toggle('dims', on);
  if (on) refreshDims(); else { dimEl.innerHTML = ''; dimNodes = []; dimSet = []; }
}

/* ── The guided tour ────────────────────────────────────────────────────

   Thirteen stops that walk the ladder end to end, driving the real controls:
   the generation the car wears, the camera, and the same slot ghosting
   compare mode uses. Nothing here is a second copy of anything. The rail, the
   readout and the pack all follow, because the tour changes the app's state
   rather than drawing a picture of it.

   THE PROSE IS IN js/tour.js AND THE NUMBERS ARE NOT. Every figure a stop
   prints is a token resolved here, at the moment the stop is shown, against
   the same js/compare.js the compare panel reads. A tour with 223 miles typed
   into it would be the fourth home for the ladder's figures and the first to
   go stale, which is exactly how design/app-brief.md's census went wrong.

   IT DOES NOT TURN COMPARE MODE ON. It borrows the ghosting and leaves the
   panel alone, because the panel is where the tour's own text lives and two
   things cannot own one surface. The last control on the bar hands over to
   the full comparison for anyone who wants the nine slots and the waterfall,
   and that is a deliberate exit rather than a duplicate view. */

/* tourOn and tourAt are declared up beside cmpOn, not here: refreshGenCtl
   consults both and it runs during module evaluation, which is ahead of this
   point and inside a `let`'s dead zone. */
let tourPlay = false;
let tourTimer = null;
let tourEl = null;
let tourWasPanel = false;
let tourWasXray = false;
let tourWasCut = false;
let tourWasExplode = 0;   // the slider's own 0 to 100, restored on the way out
/* bumped by every tourGo; a deferred cold-rung build checks it before it
   touches anything. See the note there. */
let tourSeq = 0;

/* The figures a stop can print. Computed on arrival rather than cached: the
   unit toggle is live, so a tour left open while someone presses km has to
   re-render, and re-rendering has to be the same call. */
function tourFacts(stop) {
  const c = stop.against ? compare(stop.against, stop.gen) : null;
  const self = compare(stop.gen, stop.gen);   // a rung against itself: its own totals
  const b = (c || self).b;
  const num = (s) => `<u class="t-n">${s}</u>`;
  const topTerm = c && c.terms.reduce((m, t) => (Math.abs(t.d) > Math.abs(m.d) ? t : m), c.terms[0]);
  return {
    c, b,
    range:  num(`${rounded(asDist(b.miles))} ${U().d}`),
    rate:   num(`${asRate(b.whMi).toFixed(2)} ${U().d}/kWh`),
    mass:   num(`${rounded(asMass(b.mass))} ${massU()}`),
    dRange: c ? num(`${signed(asDist(c.totals.dMiles), 0)} ${U().d}`) : '',
    dRate:  c ? num(`${signed(asRate(c.b.whMi) - asRate(c.a.whMi), 2)} ${U().d}/kWh`) : '',
    dMass:  c ? num(`${signed(asMass(c.totals.dMass), 0)} ${massU()}`) : '',
    dArea:  c ? num(`${signed(c.totals.dArea, 4)} m2`) : '',
    /* the term the rung actually moved, which is the sentence every retro in
       design/ is about and the one figure a reader cannot get anywhere else */
    topTerm: topTerm ? num(`${topTerm.label.toLowerCase()} ${signed(asWh(topTerm.d), 1)} Wh/${U().d}`) : '',
    slots:  c ? num(`${c.changedCount} of ${c.slots.length} slots`) : '',
  };
}

const tourFill = (text, f) => text.replace(/\{(\w+)\}/g, (m, k) => (k in f ? f[k] : m));

function buildTour() {
  if (tourEl) return tourEl;
  tourEl = el('section', null);
  tourEl.id = 'tour';
  tourEl.innerHTML =
    '<div class="t-head">' +
      '<b class="t-theme"></b><span class="t-title"></span>' +
      '<div class="t-marks"></div>' +
      '<button class="t-x" aria-label="Leave the tour">×</button>' +
    '</div>' +
    '<div class="t-body"><div class="t-text"></div><div class="t-figs"></div></div>' +
    '<div class="t-foot">' +
      '<button class="t-step t-prev">‹</button>' +
      '<button class="t-play" title="Play the tour"><i></i></button>' +
      '<button class="t-step t-next">›</button>' +
      '<span class="t-count"></span>' +
      '<button class="t-read"></button>' +
      '<button class="t-vs">full comparison</button>' +
      '<span class="t-cite"></span>' +
    '</div>';
  document.body.append(tourEl);

  tourEl.querySelector('.t-x').onclick = () => setTour(false);
  tourEl.querySelector('.t-prev').onclick = () => tourGo(tourAt - 1, true);
  tourEl.querySelector('.t-next').onclick = () => tourGo(tourAt + 1, true);
  tourEl.querySelector('.t-play').onclick = () => setTourPlay(!tourPlay);
  /* Hand over to compare mode ON THIS PAIR, which is the whole reason the
     tour can afford to be brief: the nine slots, the waterfall and the
     residual are one control away and they are the real thing rather than a
     summary of it. Leaving the tour is correct here. The panel is where the
     comparison lives and the tour is sitting on the other half of the screen
     talking about the same two rungs. */
  tourEl.querySelector('.t-vs').onclick = () => {
    const s = STOPS[tourAt];
    setTour(false);
    if (!s.against) return;
    /* The pair is named by the STOP, not inferred from whatever the car
       happens to be wearing. cmpPair() reads the live generation, and the
       generation a stop asks for arrives through withBusy on a cold rung, so
       a hand-over that only set cmpAgainst could pair Gen 9 against a car
       that had not finished becoming Gen 10 yet. Applying the rung again is
       free when it is already on: setVariant returns early per slot. */
    const run = () => { applyGeneration(s.gen); cmpAgainst = s.against; setCompare(true); };
    isCold(s.gen) ? withBusy(run) : run();
  };
  return tourEl;
}

/* Marks, not dots: one per stop, the current one lit, and clicking any of
   them jumps. A tour with no way back to stop four is a video. */
function buildTourMarks() {
  const wrap = tourEl.querySelector('.t-marks');
  wrap.innerHTML = '';
  STOPS.forEach((s, i) => {
    const b = el('button', 't-mark');
    b.title = `${s.theme}: ${s.title}`;
    b.onclick = () => tourGo(i, true);
    wrap.append(b);
  });
}

function renderTour() {
  const s = STOPS[tourAt];
  const f = tourFacts(s);
  const q = (sel) => tourEl.querySelector(sel);

  q('.t-theme').textContent = s.theme;
  q('.t-title').textContent = s.title;
  q('.t-count').textContent = `${tourAt + 1} / ${STOPS.length}`;
  q('.t-cite').textContent = s.cite;

  const text = q('.t-text');
  text.innerHTML = '';
  for (const p of s.paras) text.append(el('p', null, tourFill(p, f)));

  /* THE FIGURE COLUMN IS THE CAR IN FRONT OF YOU, not the stop's argument.
     Three quantities, always the same three, so a reader tracking the ladder
     watches one place rather than hunting a different layout per stop. The
     opening stop has no predecessor and shows the size of the model instead,
     which is the only thing on the tour that is about the app rather than
     about the car. */
  const figs = q('.t-figs');
  figs.innerHTML = '';
  const fig = (label, value, delta) => {
    const d = el('div', 't-fig');
    d.append(el('small', null, label), el('b', null, value));
    if (delta) d.append(el('i', null, delta));
    figs.append(d);
  };
  if (s.id === 'open') {
    const sc = scale();
    fig('rungs', String(sc.rungs), 'on the ladder');
    fig('modules', String(sc.systems), `${sc.parts} clickable parts`);
    fig('written', sc.words.toLocaleString(), 'words of engineering');
  } else {
    const c = f.c;
    fig(`range · ${U().d}`, rounded(asDist(f.b.miles)),
        c ? signed(asDist(c.totals.dMiles), 0) : null);
    fig(`efficiency · ${U().d}/kWh`, asRate(f.b.whMi).toFixed(2),
        c ? signed(asRate(c.b.whMi) - asRate(c.a.whMi), 2) : null);
    fig(`mass · ${massU()}`, rounded(asMass(f.b.mass)),
        c ? signed(asMass(c.totals.dMass), 0) : null);
  }

  const read = q('.t-read');
  const def = s.read ? DEFS[s.read] : null;
  read.style.display = def ? '' : 'none';
  if (def) {
    read.textContent = 'read ' + def.name.toLowerCase();
    read.style.setProperty('--sys', hexOf(def));
    read.onclick = () => { stopTourPlay(); gotoSystem(def.id); };
  }
  q('.t-vs').style.display = s.against ? '' : 'none';

  [...tourEl.querySelectorAll('.t-mark')].forEach((b, i) => {
    b.classList.toggle('on', i === tourAt);
    b.classList.toggle('seen', i < tourAt);
  });
  q('.t-prev').disabled = tourAt === 0;
  q('.t-next').disabled = tourAt === STOPS.length - 1;
}

/* THE CAR IS FRAMED IN THE SPACE THE TEXT LEAVES, not in the window.

   The stops aim at a point on the car, which is what a camera station in
   js/tour.js means, and lookAt puts that point in the middle of the WINDOW.
   The bottom of the window is a plate of text between 200 and 270 px tall
   depending on the stop, so a car centered in the window sits a sixth of the
   frame too low and the tour reads as if the plate is covering it.

   The correction is one pan of the aim point, computed rather than dialed
   in: the viewer's lens is 34 degrees vertical, so the scene is
   2 * distance * tan(17 degrees) tall at the aim point, and lowering the aim
   by that height times half the plate's share of the window centers the car
   in what is left. It is recomputed per stop because the plate is not one
   height, and it lowers the AIM and not the camera: the low stations already
   sit 0.55 m off the floor and dropping those under it would put the camera
   through a floor that reflects. */
function tourAim(v) {
  const bar = tourEl ? tourEl.getBoundingClientRect().height + 12 : 0;
  const h = window.innerHeight;
  /* Both measurements can come back zero or nonsense, and viewer.js's resize
     already guards the same way for the same reason: this page is driven by
     an automation pane that reports the window as 0 by 0, and a 0-width
     layout gives the plate a 2,149 px height. An aim point computed from
     that would fly the camera into the floor. No measurement, no correction:
     the stop's authored aim is the honest fallback. */
  if (!(h > 0) || !(bar > 0) || bar > h) return v.tgt;
  /* the authored distance, times the viewer's portrait factor: on a phone held
     upright the camera stands further back than the station says, and the
     world height it sees grows with it */
  const dist = Math.hypot(v.pos[0] - v.tgt[0], v.pos[1] - v.tgt[1], v.pos[2] - v.tgt[2]) * (viewer.fitFactor ? viewer.fitFactor() : 1);
  const worldH = 2 * dist * Math.tan((34 * Math.PI / 180) / 2);
  return [v.tgt[0], v.tgt[1] - worldH * (bar / h) * 0.5, v.tgt[2]];
}

/* Going to a stop is four state changes in a fixed order, and the order is
   the whole of it:

   1. the generation, because applyGeneration flies the camera home when a
      part was selected and would yank a camera this function is about to
      place;
   2. the ghost, which is compare mode's own answer to "which slots differ"
      read straight out of js/compare.js;
   3. the camera, authored per stop in js/tour.js;
   4. the text.

   A cold rung blocks the main thread for up to 3.4 s while seven modules
   build, so the whole sequence goes through withBusy exactly as the stepper
   does. Without that the tour looks frozen at Gen 11 and the busy sweep,
   which exists for this, never appears. */
function tourGo(i, manual = false) {
  /* The pause comes FIRST, before the bounds check, because a manual gesture
     is a manual gesture whether or not it lands on a stop. Ordered the other
     way, a right arrow on the last stop and a left arrow on the first one
     returned here and left autoplay running, so the one input that reads as
     "I am driving this now" was the one input that did not take the wheel,
     and the timer moved the reader on a second later. Every other manual step
     paused; these two were an accident of the early return. */
  if (manual) stopTourPlay();
  if (i < 0 || i >= STOPS.length) return;
  tourAt = i;
  const s = STOPS[i];
  /* A COLD RUNG DEFERS THIS WHOLE BLOCK, so by the time it runs the tour may
     be somewhere else or gone. Leaving the tour during a Gen 5 build left
     the deferred half to land afterward: it ghosted the car for a
     comparison, turned x-ray on and wrote a stop into a bar that was no
     longer on screen, and the user was looking at a faded car with nothing
     saying why. The stamp is the same guard applyGeneration's own cold path
     needed and did not have to invent, because withBusy runs whatever it is
     handed; the decision about whether it is still wanted belongs here. */
  const seq = ++tourSeq;
  const run = () => {
    if (!tourOn || seq !== tourSeq) return;
    if (currentGenId() !== s.gen) applyGeneration(s.gen);
    if (viewer.getSelected()) { closePanel(); viewer.select(null); }
    const c = s.against ? compare(s.against, s.gen) : null;
    viewer.setFocusSystems(c ? c.slots.filter((x) => x.changed).map((x) => VARIANT_CHOICE[x.slot]) : null);
    /* the shell is a changed slot on every stop that asks for x-ray, so the
       ghosting leaves it solid over the thing the stop is about */
    setXray(!!s.xray);
    /* a stop may show the staged explode; the next stop that omits it closes
       the car again. The reader's own slider is parked for the whole tour
       and restored on exit, unchanged below. */
    const ex = Math.round((s.explode || 0) * 100);
    if (+$('#exp').value !== ex) { $('#exp').value = ex; viewer.setExplode(ex / 100); setExplodeVal(ex); }
    /* the text goes in BEFORE the camera, because the camera is aimed off the
       height of the plate the text is sitting in and that height is the text */
    renderTour();
    const v = VIEWS[s.view] || VIEWS.home;
    viewer.view(v.pos, tourAim(v), 1200);
    if (tourPlay) armTourTimer();
  };
  isCold(s.gen) ? withBusy(run) : run();
}

/* ── Autoplay ───────────────────────────────────────────────────────────
   setTimeout and not rAF, deliberately: this environment reports the page as
   hidden at every instant and rAF does not fire at all in a hidden tab, so a
   frame-driven timer would leave the tour parked on stop one forever in
   exactly the case where nobody is watching it to notice.

   The dwell is per stop, from its own word count, because the stops are not
   the same length and a flat interval would either rush Gen 11 or leave Gen 1
   sitting there. See dwellMs in js/tour.js. */
function armTourTimer() {
  clearTimeout(tourTimer);
  tourTimer = setTimeout(() => {
    if (!tourOn || !tourPlay) return;
    if (tourAt >= STOPS.length - 1) { setTourPlay(false); return; }
    tourGo(tourAt + 1);
  }, dwellMs(STOPS[tourAt]));
}
function stopTourPlay() { if (tourPlay) setTourPlay(false); }
function setTourPlay(on) {
  tourPlay = on;
  clearTimeout(tourTimer);
  tourEl.classList.toggle('playing', on);
  tourEl.querySelector('.t-play').title = on ? 'Pause' : 'Play the tour';
  if (on) armTourTimer();
}

function setTour(on, at = 0) {
  if (on === tourOn) { if (on) tourGo(at, true); return; }
  tourOn = on;
  buildTour();
  document.body.classList.toggle('tour', on);
  if (on) {
    buildTourMarks();
    /* compare mode and the tour are two answers to the same question and
       both of them ghost the car, so the tour takes the surface rather than
       arguing with it over the panel */
    tourWasPanel = $('#panel').classList.contains('on');
    tourWasXray = xrayIsOn();
    /* THE TURNTABLE STOPS FOR THE TOUR. Every station in js/tour.js is an
       argument about a viewpoint, and the two frontal-area stops are the
       silhouette itself; seven idle seconds into reading one of them the
       turntable has quietly turned the evidence away. It is suppressed the
       way a selected part suppresses it, in the viewer and not through the
       switch, so the user's own preference is neither read as consent nor
       written over: the button keeps saying what it has always said and the
       setting comes back the moment the tour closes. */
    viewer.setAutoRotate(false);
    /* A section left on would cut every one of the thirteen authored frames,
       including the two that ARE a silhouette. Same contract as the x-ray
       switch: taken for the duration, handed back on the way out. */
    tourWasCut = cutOn;
    if (cutOn) setCutOn(false);
    /* AND THE EXPLODE, on the same contract as the section and the x-ray. All
       thirteen stations are authored against an assembled car; a slider left
       at 60 percent scattered every one of them and the stop's own text went
       on describing parts that were no longer where it said. It was the one
       of the three taken for granted, presumably because nothing in the tour
       sets it, but the reader can have set it before pressing TOUR. Handed
       back on the way out with the rest. */
    tourWasExplode = +$('#exp').value;
    if (tourWasExplode) { $('#exp').value = 0; viewer.setExplode(0); setExplodeVal(0); }
    if (cmpOn) setCompare(false);
    if (tourWasPanel) { closePanel(); viewer.select(null); }
    tourGo(at, true);
  } else {
    setTourPlay(false);
    /* Compare has to go the same way the ghost does. The last control on the
       tour bar hands over to the full comparison, so compare can be ON when
       the tour closes, and clearing the focus set below takes the GHOST it
       was drawing with it. That left compare switched on, its panel open and
       its dropdown armed, over a car with nothing faded: the interface
       claimed a comparison it was no longer drawing. setCompare(false) before
       the clear, so the two states leave together. */
    if (cmpOn) setCompare(false);
    viewer.setFocusSystems(null);
    setXray(tourWasXray);
    if (tourWasCut) setCutOn(true);
    if (tourWasExplode) {
      $('#exp').value = tourWasExplode;
      viewer.setExplode(tourWasExplode / 100);
      setExplodeVal(tourWasExplode);
    }
    viewer.setAutoRotate(spinOn);
    /* the car is left wearing whatever rung the tour finished on, which is
       the point of having walked it; only the ghosting and the camera go */
    viewer.view(VIEWS.home.pos, VIEWS.home.tgt, 900);
  }
  tourBtn?.classList.toggle('on', on);
  tourBtn?.setAttribute('aria-pressed', on ? 'true' : 'false');
}

/* ARROWS WALK WHATEVER IS OPEN: the tour if it is running, otherwise the
   parts of the module being read. Both are the same gesture, next and
   previous through an ordered thing, and the tour takes precedence because
   it is the larger context.

   Guarded on the search field and the dropdowns, which own the arrow keys
   while they are focused: the rail's search box is one Tab away from
   everything and a left arrow inside it must move a cursor. */
addEventListener('keydown', (e) => {
  if (openMenu) return;
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const t = e.target;
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
  const d = e.key === 'ArrowRight' ? 1 : -1;
  if (tourOn) { e.preventDefault(); tourGo(tourAt + d, true); }
  else if (panelStep && $('#panel').classList.contains('on')) { e.preventDefault(); panelStep(d); }
});

/* ── Paint ─────────────────────────────────────────────────────────────
   Eleven generations and every one of them has been the same dark teal,
   because common.js has exactly one body color, M.paint at 0x2a5666, and
   every body module reaches for it.

   The color cannot be changed where it is defined: js/common.js is off
   limits to app work, and editing M.paint would repaint the charge-port
   flap, the reference car and the value study all at once with no way back.
   So the respray happens in the viewer, on the per-part material clones it
   already makes, selected by base color. See viewer.js setPaint.

   These are finishes, not decoration: the shell material runs metalness
   0.88 under a full clearcoat, so a saturated color tints its own
   reflections and the studio softboxes rake across it. Nine of them,
   ordered neutral, cool, warm, with the teal kept in the middle of the list
   and named for what it is, because eleven rungs of renders and every
   screenshot in design/ were taken in it. */
const PAINTS = [
  /* NEUTRAL */
  { id: 'graphite', label: 'Graphite',         hex: 0x1a1e23, group: 'Neutral' },
  { id: 'gunmetal', label: 'Gunmetal',         hex: 0x3f454c, group: 'Neutral' },
  /* SOLID, not metallic. See the note on paintMetal in js/viewer.js: at
     M.paint's 0.88 a light color is a mirror in a dark room and reads dark.
     These three are the finishes that are solids in the real world, so they
     say so and everything else keeps common.js's own value untouched. */
  { id: 'nardo',    label: 'Nardo gray',       hex: 0x8d9196, group: 'Neutral', metal: 0.25 },
  { id: 'silver',   label: 'Silver',           hex: 0xb4bcc3, group: 'Neutral' },
  { id: 'alpine',   label: 'Alpine white',     hex: 0xdde1e4, group: 'Neutral', metal: 0.25 },
  { id: 'slate',    label: 'Slate',            hex: 0x596270, group: 'Neutral' },
  /* COOL */
  { id: 'teal',     label: 'Reference teal',   hex: 0x2a5666, group: 'Cool',
    note: 'the finish every rung has worn since Gen 1' },
  /* the ID stays `petrol` because it is what a stored preference holds; only
     the LABEL is user-facing, and petrol is the British word for gasoline */
  { id: 'petrol',   label: 'Deep teal',        hex: 0x123f4a, group: 'Cool' },
  { id: 'cobalt',   label: 'Cobalt',           hex: 0x1e4f9e, group: 'Cool' },
  { id: 'ice',      label: 'Ice blue',         hex: 0x6f9fd0, group: 'Cool' },
  { id: 'iris',     label: 'Iris',             hex: 0x5b4a92, group: 'Cool' },
  { id: 'plum',     label: 'Plum',             hex: 0x4a2a4e, group: 'Cool' },
  { id: 'brook',    label: 'Brooklands green', hex: 0x1d4a34, group: 'Cool' },
  { id: 'jade',     label: 'Jade',             hex: 0x2f7d62, group: 'Cool' },
  /* WARM */
  { id: 'sand',     label: 'Sand',             hex: 0xc2a878, group: 'Warm' },
  { id: 'brass',    label: 'Brass',            hex: 0xba8c2a, group: 'Warm' },
  { id: 'copper',   label: 'Copper',           hex: 0x9e5a2c, group: 'Warm' },
  { id: 'ember',    label: 'Ember',            hex: 0xb2481f, group: 'Warm' },
  { id: 'signal',   label: 'Signal red',       hex: 0xc0281e, group: 'Warm', metal: 0.30 },
  { id: 'oxblood',  label: 'Oxblood',          hex: 0x8a2230, group: 'Warm' },
];
/* THE CAR ARRIVES IN A FINISH, not in a base color. Ice blue, metallic,
   under an alpine white pearl at 25 percent: the pearl lifts the face-on
   blue toward silver and lets go at a glancing angle, so the car reads
   cooler as it turns, and the heat-extraction covers on the Gen 3 and Gen 4
   wheels stand out in silver. Davis's pick, 2026-08-22, settled after three
   tries that day (alpine white under brass at 80; this blue under alpine at
   20; under brass at 77; and this). The defaults below are what a first
   visit opens to; a stored preference wins over them, but see the stamp
   below: a NEW default reaches every browser once. */
const PAINT_DEFAULT = 'ice';
const PEARL_DEFAULT = 'alpine';
const PEARL_AMT_DEFAULT = 0.25;
/* per-part overrides a first visit opens with, keyed "sys/part" like the
   stored ones; only used when nothing is stored, because an empty stored
   object is a decision (every panel put back) and not a first visit */
const PART_PAINTS_DEFAULT = { 'wheels-3/covers': 0xb4bcc3 };
const paintById = (id) => PAINTS.find((p) => p.id === id) || null;
/* per-part overrides are stored as a color rather than an id, so the finish
   type is recovered from the color; every paint in the table is distinct */
const paintByHex = (hex) => PAINTS.find((p) => p.hex === hex) || null;

/* ── SOLID OR METALLIC, on any color ───────────────────────────────────
   The palette declares which finish each color normally is, because a solid
   white and a metallic silver are different products. But that is a default
   and not a law: a color can be ordered either way in the real world, and
   asking the model for a metallic white or a solid cobalt is a reasonable
   thing to want. So the declared type is the starting point and this is an
   explicit override that sticks across color changes.

   `metallic` resolves to null rather than to 0.88, so it means "whatever
   common.js gave this material" and cannot drift from it. */
const SOLID_METAL = 0.25;
/* METALLIC BY DEFAULT, which is Davis's call and is also the finish every
   render in design/ was taken in. `auto` would follow each color's declared
   type and put the shipped Alpine white default on 0.25, which reads white;
   metallic keeps whatever common.js gave the material and gives the bronze
   that white under a brass pearl actually makes on an 0.88 surface. The
   toggle reaches the other one in a click. */
/* A NEW DEFAULT REACHES EVERY BROWSER ONCE. Davis, 2026-08-23: the default
   above was deployed and his own browser went on showing ice under brass at
   38, because a stored finish wins over the default and, until this commit,
   the two restore calls at the bottom of this section wrote the finish back
   into storage on every load: a visit under any earlier default stamped that
   default in as if it had been chosen, and a browser that tried a swatch once
   kept it forever. So the default's own name is kept in storage, and when the
   stored name is not the current one the stored finish is dropped and the
   default applies, once; from then on a choice made in the finish panel
   sticks across visits as before. Changing a default constant above changes
   the name, so every browser resets once per new default, which is what a
   deploy of a new default should have done all along. The solid/metallic
   mode goes with the coats, since the finish is the three together. The
   per-panel overrides are left alone: they are only ever written by a hand
   on the control, and the stamp is read before ev-finish is restored, just
   below, so the drop lands before the read. */
const PAINT_STAMP = `${PAINT_DEFAULT}/${PEARL_DEFAULT}/${PEARL_AMT_DEFAULT}`;
try {
  if (localStorage.getItem('ev-paint-default') !== PAINT_STAMP) {
    for (const k of ['ev-paint', 'ev-finish', 'ev-pearl', 'ev-pearl-amt']) localStorage.removeItem(k);
    localStorage.setItem('ev-paint-default', PAINT_STAMP);
  }
} catch {}

let finishMode = 'metallic';     // auto | solid | metallic
try {
  const f = localStorage.getItem('ev-finish');
  if (f === 'solid' || f === 'metallic') finishMode = f;
} catch {}
function metalOf(p) {
  if (finishMode === 'solid') return SOLID_METAL;
  if (finishMode === 'metallic') return null;
  return p && p.metal != null ? p.metal : null;
}
/* what the toggle should show as active right now */
const effectiveFinish = () => (finishMode !== 'auto' ? finishMode
  : (paintById(paintId) || {}).metal != null ? 'solid' : 'metallic');
function setFinishMode(mode) {
  finishMode = mode;
  try { localStorage.setItem('ev-finish', mode); } catch {}
  /* re-apply the car AND every panel override, because the finish type is a
     property of the paint and not of the panel that happens to wear it */
  setPaint(paintId);
  for (const [k, v] of Object.entries(partPaints)) viewer.setPartPaint(k, v, metalOf(paintByHex(v)));
}

let paintId = PAINT_DEFAULT;
try { paintId = localStorage.getItem('ev-paint') || PAINT_DEFAULT; } catch {}
/* same guard the unit restore carries, for the same reason: a stored id that
   is not one of ours would make find() return undefined and the first thing
   done with it is read .hex */
if (!PAINTS.some((p) => p.id === paintId)) paintId = PAINT_DEFAULT;

/* Per-panel overrides, so the car can be two-tone. Keyed by "sys/part", which
   means a color put on body-11's shoulder does not follow you to Gen 9,
   because that is a different part. Stored, like the body color, because a
   finish you chose is a preference and not a session. */
let partPaints = { ...PART_PAINTS_DEFAULT };
try {
  const stored = localStorage.getItem('ev-paint-parts');
  if (stored !== null) partPaints = JSON.parse(stored);
} catch {}
/* the same reason the unit restore is guarded: a stored value that is not a
   color reaches setHex and the car comes back black with no way out */
if (!partPaints || typeof partPaints !== 'object' || Array.isArray(partPaints)) partPaints = {};
for (const [k, v] of Object.entries(partPaints)) {
  /* INTEGER, not just a number in range. `typeof v === 'number'` with a
     bounds check let 123.456 through, and Color.setHex floors its argument,
     so a fractional value landed on a near-black color: exactly the black car
     the guard above was written to prevent, reached by the one input it did
     not reject. Number.isInteger also rejects NaN and Infinity, which the
     comparison chain let through as false only by accident of NaN comparing
     false to everything. */
  if (!Number.isInteger(v) || v < 0 || v > 0xffffff) { delete partPaints[k]; continue; }
  /* and a key has to name a part that still exists. A stored override for a
     part that has since been renamed or removed can never be reached by any
     control, but it is replayed into the viewer on every load and counted by
     partPaintCount, so the faceplate read "1 panel in its own color" over a
     car with no such panel, permanently. hasOwn rather than a truthiness
     test, because byKey['__proto__'] is Object.prototype and passes one. */
  if (!Object.hasOwn(byKey, k)) delete partPaints[k];
}
const savePartPaints = () => {
  try { localStorage.setItem('ev-paint-parts', JSON.stringify(partPaints)); } catch {}
};

const swatchOf = (hex) => '#' + hex.toString(16).padStart(6, '0');

/* The second coat, restored the same guarded way as the first, with one more
   state than the first needs.

   SOLID IS STORED AS "none" AND NOT AS A MISSING KEY. The default pearl is a
   real color now, so "no key" and "the user chose solid" stopped meaning the
   same thing: removing the key on solid would hand brass straight back on the
   next load and there would be no way to keep a solid car. An absent key is a
   first visit; the string "none" is a decision. */
let pearlId = PEARL_DEFAULT;
let pearlAmt = PEARL_AMT_DEFAULT;
try {
  const s = localStorage.getItem('ev-pearl');
  if (s === 'none') pearlId = null;
  else if (s && paintById(s)) pearlId = s;
  const a = parseFloat(localStorage.getItem('ev-pearl-amt'));
  if (a >= 0 && a <= 1) pearlAmt = a;
} catch {}

let paintBtn = null;
function refreshPaintBtn() {
  if (!paintBtn) return;
  const base = paintById(paintId);
  const pearl = pearlId ? paintById(pearlId) : null;
  const sw = paintBtn.querySelector('.sw');
  sw.style.setProperty('--sw', swatchOf(base ? base.hex : 0x2a5666));
  /* the pearl rides as a ring around the base chip, so the control is the
     combination rather than the name of half of it */
  sw.style.setProperty('--pearl', pearl ? swatchOf(pearl.hex) : 'transparent');
  const n = viewer.partPaintCount();
  const article = (w) => ('aeiou'.includes(w[0].toLowerCase()) ? 'an' : 'a');
  paintBtn.title = (base ? base.label : 'Paint') +
    (pearl ? ` with ${article(pearl.label)} ${pearl.label.toLowerCase()} pearl` : ', solid') +
    (n === 0 ? '' : n === 1 ? ' · 1 panel in its own color'
                            : ` · ${n} panels in their own colors`);
}

/* `save` is false only for the restore at load. A finish is stored when a
   hand chooses it, never because the page opened: see the stamp note. */
function setPaint(id, save = true) {
  const p = paintById(id) || PAINTS[0];
  paintId = p.id;
  viewer.setPaint(p.hex, metalOf(p));
  refreshPaintBtn();
  if (!save) return;
  try { localStorage.setItem('ev-paint', p.id); } catch {}
}

function setPearl(id, amt, save = true) {
  pearlId = id;
  if (amt != null) pearlAmt = amt;
  const p = pearlId ? paintById(pearlId) : null;
  viewer.setPearl(p ? p.hex : null, pearlAmt);
  refreshPaintBtn();
  if (!save) return;
  try {
    /* "none" is written, not removed: see the restore note */
    localStorage.setItem('ev-pearl', p ? p.id : 'none');
    localStorage.setItem('ev-pearl-amt', String(pearlAmt));
  } catch {}
}

/* ── The finish popover ─────────────────────────────────────────────────
   Two coats and a strength, which does not fit in an option list, so this is
   a small panel rather than a dropdown. It reuses mountMenu, which means it
   inherits the placement, the outside-click, the Escape and the follow-the-
   scroll that the option list already had debugged. */
function buildFinishMenu() {
  const menu = el('div', 'dd-menu fin');
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-label', 'Finish');

  const chipRow = (items, current, onPick) => {
    const wrap = el('div', 'sw-grid');
    for (const it of items) {
      const b = el('button', 'sw-pick' + (it.id === current ? ' on' : ''));
      b.title = it.label;
      b.dataset.id = it.id == null ? 'none' : it.id;
      if (it.hex == null) b.classList.add('sw-none');
      else b.style.setProperty('--sw', swatchOf(it.hex));
      b.onclick = () => {
        for (const s of wrap.children) s.classList.remove('on');
        b.classList.add('on');
        onPick(it.id);
      };
      wrap.append(b);
    }
    return wrap;
  };

  /* base coat, grouped the way the palette is organized */
  menu.append(el('div', 'fin-h', 'Base coat'));
  let last = null;
  for (const g of ['Neutral', 'Cool', 'Warm']) {
    const items = PAINTS.filter((p) => p.group === g);
    menu.append(el('div', 'fin-g', g));
    const row = chipRow(items, paintId, (id) => { setPaint(id); markBase(); markSeg(); });
    menu.append(row);
    last = row;
  }
  /* the base rows are three separate grids, so marking the chosen one has to
     clear all three rather than only the row that was clicked */
  const markBase = () => {
    for (const b of menu.querySelectorAll('.fin-base .sw-pick')) {
      b.classList.toggle('on', b.dataset.id === paintId);
    }
  };
  for (const r of menu.querySelectorAll('.sw-grid')) r.classList.add('fin-base');

  /* solid or metallic, on whatever color is chosen */
  const finRow = el('div', 'fin-seg');
  const segs = {};
  for (const mode of ['solid', 'metallic']) {
    const b = el('button', null, mode);
    b.onclick = () => {
      setFinishMode(mode);
      for (const k in segs) segs[k].classList.toggle('on', k === effectiveFinish());
    };
    segs[mode] = b;
    finRow.append(b);
  }
  const markSeg = () => {
    for (const k in segs) segs[k].classList.toggle('on', k === effectiveFinish());
  };
  markSeg();
  menu.append(finRow);

  menu.append(el('div', 'fin-h', 'Pearl coat'));
  menu.append(el('p', 'fin-note',
    'A second color in the mid coat. It tints the panel face-on and takes ' +
    'over at a glancing angle, so the car changes as it turns.'));
  const pearlItems = [{ id: null, label: 'Solid, no pearl', hex: null },
                      ...PAINTS.map((p) => ({ id: p.id, label: p.label, hex: p.hex }))];
  menu.append(chipRow(pearlItems, pearlId, (id) => { setPearl(id, null); syncAmt(); }));

  const amtRow = el('label', 'fin-amt');
  amtRow.append(el('span', null, 'strength'));
  const sl = el('span', 'slider');
  const input = el('input');
  input.type = 'range'; input.min = '0'; input.max = '100';
  input.value = String(Math.round(pearlAmt * 100));
  sl.append(input);
  amtRow.append(sl);
  const amtVal = el('b', null, Math.round(pearlAmt * 100) + '%');
  amtRow.append(amtVal);
  const syncAmt = () => {
    sl.style.setProperty('--v', input.value + '%');
    amtVal.textContent = input.value + '%';
    amtRow.classList.toggle('off', !pearlId);
    input.disabled = !pearlId;
  };
  input.oninput = () => { setPearl(pearlId, +input.value / 100); syncAmt(); };
  menu.append(amtRow);
  syncAmt();

  /* ── PANELS IN THEIR OWN COLOR ─────────────────────────────────────
     A gap in the first version of this: painting a panel is easy, the
     override persists across sessions, and there was NO way to see which
     panels carried one or to put them back. The faceplate button counted
     them in a tooltip, which is not a list and not a control. So "why is
     the door pink" had no answer inside the app at all.
     Shown only when there is something to show, and it names the parts
     rather than the count, because the count was never the question. */
  const keys = Object.keys(partPaints);
  if (keys.length) {
    menu.append(el('div', 'fin-h', 'Panels in their own color'));
    const list = el('div', 'fin-over');
    for (const k of keys) {
      const def = DEFS[k.split('/')[0]];
      const meta = def && def.parts[k.split('/')[1]];
      const pt = paintByHex(partPaints[k]);
      const row = el('button', 'fin-orow');
      row.style.setProperty('--sw', swatchOf(partPaints[k]));
      row.innerHTML = `<em class="sw"></em><b>${esc(meta ? meta.name : k)}</b>` +
                      `<span>${esc(pt ? pt.label : 'custom')}</span><u>clear</u>`;
      row.title = 'Put ' + (meta ? meta.name : k) + ' back on the body color';
      row.onclick = () => {
        delete partPaints[k];
        viewer.setPartPaint(k, null);
        savePartPaints();
        refreshPaintBtn();
        row.remove();
        if (!Object.keys(partPaints).length) list.previousElementSibling?.remove();
      };
      list.append(row);
    }
    menu.append(list);
    const all = el('button', 'fin-reset', 'Put every panel back on the body color');
    all.onclick = () => {
      for (const k of Object.keys(partPaints)) { delete partPaints[k]; viewer.setPartPaint(k, null); }
      savePartPaints();
      refreshPaintBtn();
      closeMenu();
    };
    menu.append(all);
  }

  return menu;
}

{
  paintBtn = el('button', 'dd dd-paint');
  paintBtn.setAttribute('aria-haspopup', 'dialog');
  paintBtn.setAttribute('aria-expanded', 'false');
  paintBtn.append(el('em', 'sw'));
  paintBtn.onclick = () => {
    if (paintBtn.classList.contains('open')) { closeMenu(); return; }
    closeMenu();
    mountMenu(paintBtn, buildFinishMenu(), false);
  };
  paintBtn.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowDown' || e.key === 'Enter') && !paintBtn.classList.contains('open')) {
      e.preventDefault();
      paintBtn.click();
    }
  });
  $('#pPaint').append(el('small', null, 'finish'), paintBtn);

  setPaint(paintId, false);
  setPearl(pearlId, pearlAmt, false);
  /* restore the overrides AFTER the coats, so a panel that carries one is not
     briefly repainted to the body color and back. setPartPaint records the
     override whether or not that system is built yet, and indexSystem reads
     it back when a variant builds, so a stored color survives a generation
     the session has never visited. */
  for (const [k, v] of Object.entries(partPaints)) viewer.setPartPaint(k, v, metalOf(paintByHex(v)));
  refreshPaintBtn();
}

/* ── Finish, offered on the parts that actually wear paint ───────────────
   Not on the faceplate. The faceplate control is the CAR's color and there
   is no room on it for a second scope, and more to the point the question
   "what color is this panel" belongs where the panel is already open. A
   part that is not sprayed in body color is never offered a swatch row it
   could not honor: viewer.isPainted answers off the material set, so glass,
   carbon, alu, cast and rubber say no on their own without a list here. */
/* ── WHAT A TERM IS WORTH ───────────────────────────────────────────────

   The app could say what a rung MOVED, in the waterfall, and never what a
   term is WORTH, which is the question every one of the 328,613 words was
   actually settled on. design/retro-gen8.md concludes that 1,800 miles needs
   several levers at once rather than one clever generation; that sentence is
   an exchange rate, and a reader had none.

   So each loss panel prints one line: take this car, move ONE input by a
   stated step, and report the miles. It is the shipped budget called twice.
   Nothing here is a slider: the moment a reader can drag Cd to 0.09 the app
   is showing figures for a car nobody built, which is the thing
   design/app-brief.md rules out. Fixed steps, stated beside their answer.

   IT IS NOT ON THE READOUT CARD, deliberately. That card already carries a
   headline, a consumption line, the ladder strip, five waterfall rows, a
   shared scale, the pack gauge and a stats strip. This goes in the panel a
   reader deliberately opened about that exact term.

   MASS MOVES TWO TERMS AT ONCE and the line says so where it appears: the
   figure is the whole car's response to 100 kg, not that row's share of it,
   which is the same honesty js/compare.js practices about its residual. */
/* Each lever names its DIRECTION, because "100 kg is worth +13 mi" does not
   say which way the hundred kilograms went. Every one of them is a removal:
   this is a ladder that gets better, and the question a reader is asking is
   what the next kilogram out would buy. */
const LEVERS = {
  Rolling: [
    { label: '100 kg out', mass: -100 },
    { label: '1 kg/t less rolling resistance', over: { crrDelta: -0.001 } },
  ],
  'Stop-go': [{ label: '100 kg out', mass: -100 }],
  Aero: [{ label: '0.1 m2 off the frontal area', over: { areaDelta: -0.1 } }],
  Auxiliary: [{ label: '100 W less auxiliary draw', over: { auxDelta: -100 } }],
  'Battery losses': [{ label: 'one point less round-trip loss', over: { battDelta: -0.01 } }],
};

function leverLine(label) {
  const levers = LEVERS[label];
  if (!levers) return null;
  const ids = activeDefs().map((d) => d.id);
  const mass = activeDefs().reduce((a, d) =>
    a + Object.values(d.parts).reduce((b, x) => b + (x.mass || 0), 0), 0);
  const base = computeBudget(ids, mass);
  const baseMi = base.rangeKm * MI_PER_KM;

  const rows = [];
  for (const lv of levers) {
    /* the override is expressed as a DELTA on the model's own value, because
       the absolute numbers belong to the modules and this must not restate
       them: read the base budget's own inputs, move one, ask again */
    let over = null;
    if (lv.over) {
      const cur = base.inputs;
      over = {};
      if ('crrDelta' in lv.over) over.crr = cur.crr + lv.over.crrDelta;
      if ('areaDelta' in lv.over) over.area = cur.area + lv.over.areaDelta;
      if ('auxDelta' in lv.over) over.auxW = Math.max(120, cur.auxW + lv.over.auxDelta);
      if ('battDelta' in lv.over) over.battLoss = cur.battLoss + lv.over.battDelta;
    }
    const alt = computeBudget(ids, mass + (lv.mass || 0), over);
    const d = alt.rangeKm * MI_PER_KM - baseMi;
    if (Math.abs(d) < 0.05) continue;
    rows.push([lv.label, `${signed(asDist(d), 0)} ${U().d}`]);
  }
  if (!rows.length) return null;

  const wrap = el('div', 'lever');
  wrap.append(el('b', null, 'What it is worth on this car'));
  for (const [k, v] of rows) {
    const line = el('div', 'lever-row');
    line.append(el('span', null, k), el('u', null, v));
    wrap.append(line);
  }
  wrap.append(el('small', null, label === 'Rolling' || label === 'Stop-go'
    ? 'Mass moves rolling and stop-go together, so the figure is the whole car\'s response rather than this row\'s share. Estimate, at the cycle mean.'
    : 'Estimate, at the cycle mean, with everything else on this car held.'));
  return wrap;
}

/* ── THE PART ON THE LADDER ─────────────────────────────────────────────

   Eleven ticks under the mass chip: one per rung, filled on every rung whose
   module draws a part with this id, and the rung on screen marked. Pressing a
   tick swaps that rung's module into this slot and opens the same part there.

   IT IS A NEW AXIS, not a second view of one the app already had. Compare
   mode compares whole cars; the rail says "carried from Gen N" about a
   MODULE; nothing anywhere said whether the part you are reading is new or is
   the ninth drawing of a thing that has been on the car since Gen 1. The
   doors run 82, 46, 41, 38, 38, 34, 34, 34, 34, 34, 22 kg across eleven
   rungs, and that line is the whole ladder told through one part.

   MATCHED BY PART ID, and the caption says so, because that is the honest
   limit: a part renamed between two modules reads as absent on the earlier
   rung rather than as continuous. 103 of the 170 part ids in the tree appear
   in more than one module of their own slot, so most parts have a line to
   draw; the ones that do not are drawn as a single tick, which is itself the
   fact that they are new.

   No new data. GENERATIONS gives each rung's module for the slot, and the
   module's own parts table gives the declared mass. */
function lineageStrip(def, pid) {
  const slotDef = slotOf(def.id);
  if (!slotDef) return el('span');
  const row = LADDER.map((g) => {
    const sys = g.choices[slotDef.slot];
    const part = DEFS[sys] && DEFS[sys].parts[pid];
    return { gen: g, sys, part };
  });
  const on = row.filter((r) => r.part);
  if (on.length < 2) return el('span');        // one tick is not a lineage

  const wrap = el('div', 'lin');
  const strip = el('div', 'lin-ticks');
  /* MARKED BY MODULE, not by rung. Pressing a tick swaps that rung's module
     into this one slot and leaves the rest of the car alone, which is what
     every other jump in this app does and is the precise answer to "show me
     this part as Gen 3 drew it". The car is then a custom mix and no single
     rung is current, so marking by rung would leave the strip with nothing
     lit and the reader with no place. Marking by module lights every rung
     that uses the module now in the slot, which is also the truer statement:
     body-9 is the door on both Gen 9 and Gen 10. */
  const inSlot = VARIANT_CHOICE[slotDef.slot];
  for (const r of row) {
    /* `r.part &&` matters, and Davis found it by asking what the bars mean.
       Lighting a rung on the module alone paints a rung where THIS PART DOES
       NOT EXIST in the full system accent, identical to the rung you are
       standing on, while its tooltip reads "not on this rung" and it cannot be
       pressed. body-aero/skin was the clean case: Gen 1 runs the `body`
       module, which is the module in the slot, but `body` draws no `skin`, so
       Gen 1 came up bright blue and dead. 225 of the 419 parts with a lineage
       had at least one, which is 54 percent of them. The accent means "here,
       now, and you can read it"; absence gets the empty tick it always had. */
    const t = el('button', 'lin-t' + (r.part ? ' has' : '') +
                           (r.part && r.sys === inSlot ? ' on' : ''));
    /* the module's short label only when it says something the rung label
       does not: the Gen 1 body variant is called "Gen 1", and "Gen 1 · Gen 1"
       is a tooltip that has learned nothing */
    const ml = r.part ? moduleLabel(slotDef.slot, r.sys) : null;
    t.title = r.part
      ? `${r.gen.label}${ml && ml !== r.gen.label ? ' · ' + ml : ''} · ${r.part.mass || 0} kg`
      : `${r.gen.label} · not on this rung`;
    t.setAttribute('aria-label', t.title);
    if (r.part) {
      t.onclick = () => {
        const k = r.sys + '/' + pid;
        const go = () => { setVariant(slotDef.slot, r.sys); viewer.select(k); openPanel(k); };
        viewer.hasSystem(r.sys) ? go() : withBusy(go);
      };
    } else {
      t.disabled = true;
    }
    strip.append(t);
  }
  wrap.append(strip);

  /* the line in words, because eleven ticks say WHERE and the masses say
     WHAT IT COST, which is the half worth reading */
  const first = on[0], last = on[on.length - 1];
  const m0 = first.part.mass || 0, m1 = last.part.mass || 0;
  const span = on.length === LADDER.length
    ? `On every rung`
    : `On ${on.length} of ${LADDER.length} rungs, from ${first.gen.label}`;
  /* EVERY RUNG, not the two ends. This compared first against last, so a part
     that put mass on and took it back off again read as "N kg throughout",
     which is a claim about the whole line made from two samples of it. The
     same blind spot hides an excursion PAST both ends: 10 to 20 to 12 printed
     "10 to 12 kg" and lost the 20 entirely. Both are the shape of fault this
     project keeps finding, an aggregate standing in for the thing itself, so
     the line now says which of the four cases it is. */
  const masses = on.map((r) => r.part.mass || 0);
  const lo = Math.min(...masses), hi = Math.max(...masses);
  let mass = '';
  if (m0) {
    if (lo === hi) mass = `, ${m0} kg throughout`;
    else if (m0 === m1) mass = `, ${m0} kg at both ends, ${lo} to ${hi} in between`;
    else if (lo === Math.min(m0, m1) && hi === Math.max(m0, m1)) mass = `, ${m0} to ${m1} kg`;
    else mass = `, ${m0} to ${m1} kg, and ${lo} to ${hi} across the line`;
  }
  wrap.append(el('div', 'lin-foot', `${span}${mass}`));
  /* the honest limit, where a reader can reach it and where it costs no line:
     the match is by part id, so a renamed part reads as absent rather than as
     continuous */
  strip.title = 'Rungs that draw this part id. Press one to read it there.';
  return wrap;
}

/* ── THE PANEL OPENS ON THE ENGINEERING ─────────────────────────────────

   It did not. Every one of the 455 part panels appended a 21 swatch color
   grid ABOVE the specification, so the first 424 px of a part at 1440 by 900
   was chrome, the whole opening screen of every part on a phone was a control
   nobody came for, and the reading strip announced FINISH as the first
   section of an engineering document.

   The control does not go away, it goes where it belongs: a chip beside the
   mass, filled with the color the part is wearing, opening the same swatch
   row in a popover on the same plate every other menu in this app uses. It is
   one press from every panel instead of 94 px above every panel, and the
   section strip now lists only what the document actually contains.

   The buried-part warning moves with it, because that warning is about what a
   color will do and belongs where the color is chosen. */
function finishChip(key) {
  const painted = viewer.isPainted(key);
  if (!painted && !viewer.isTintable(key)) return null;
  const chip = el('button', 'chip chip-fin');
  chip.type = 'button';
  chip.innerHTML = `<small>${painted ? 'finish' : 'color'}</small><i class="chip-sw"></i>`;
  const dot = chip.querySelector('.chip-sw');
  const paint = () => {
    const hex = viewer.partColor(key);
    dot.style.setProperty('--sw', hex == null ? 'transparent' : swatchOf(hex));
    const own = viewer.getPartPaint(key);
    chip.title = own == null
      ? (painted ? 'Body color. Press to give this panel its own.' : 'As built. Press to change this part\'s color.')
      : `${(paintByHex(own) || {}).label || 'Custom'}. Press to change it.`;
  };
  paint();
  chip.onclick = () => {
    if (openMenu && menuBtn === chip) { closeMenu(true); return; }
    closeMenu();
    const menu = el('div', 'dd-menu fin-pop');
    menu.append(finishRow(key, paint));
    if (!painted) {
      menu.append(el('div', 'sw-note',
        'The material is unchanged: only its color moves, so the part keeps the way it takes light.'));
    }
    const buried = hiddenNote(key);
    if (buried.className) menu.append(buried);
    mountMenu(chip, menu);
  };
  return chip;
}

/* A MASS WITH NOTHING TO MEASURE IT AGAINST IS A NUMBER. This is the same sum
   the readout already prints as curb mass, cut two ways: what this part is of
   its own module, and what it is of the whole car in front of you. */
function massShare(def, m) {
  if (!m.mass) return null;
  const sysMass = Object.values(def.parts).reduce((a, x) => a + (x.mass || 0), 0);
  const carMass = activeDefs().reduce((a, d) =>
    a + Object.values(d.parts).reduce((b, x) => b + (x.mass || 0), 0), 0);
  if (!sysMass || !carMass) return null;
  const pc = (v) => (v >= 10 ? v.toFixed(0) : v.toFixed(1));
  return el('div', 'p-share',
    `${pc((m.mass / sysMass) * 100)}% of ${esc(slotName(def).toLowerCase())} · ` +
    `${pc((m.mass / carMass) * 100)}% of the car`);
}

/* A COLOR YOU CANNOT SEE IS INDISTINGUISHABLE FROM A CONTROL THAT DOES
   NOTHING, and this app had one. Davis reported that the Gen 11 wheels do not
   change color. They do: on that rung the full-face covers close over the
   whole corner, and a sweep of 3,225 pixels across the front corner returns
   only `tires` and `covers`, so the forged wheels, the discs, the calipers and
   the park brake are unreachable by any ray from outside the car. The swatch
   worked and the car never showed it.

   So the panel says so, in the moment, measured from where the camera is
   standing rather than from a list of which parts are usually buried. It also
   names what is over the part and offers the one control that gets it back,
   because a note that only reports a problem is half a fix. */
function hiddenNote(key) {
  const vis = viewer.partVisibility(key);
  if (!vis.known || vis.visible) return el('span');
  const wrap = el('div', 'sw-hidden');
  const blocker = vis.blockedBy && byKey[vis.blockedBy];
  const name = blocker ? blocker.meta.name : null;
  /* THE PART IS THE SUBJECT OF THE SENTENCE, and it was not. This read
     "Behind Aero wheel covers on this car: a color set here shows while the
     part is selected, and no view from outside can see it", and Davis, who
     wrote the model it is describing, could not tell what it meant. Four
     things were wrong at once, and they compound:

       - it OPENED ON THE BLOCKER, in bold, so the eye lands on "Aero wheel
         covers" and the note reads as though it is about the covers rather
         than about the part whose panel is open;
       - the part is never named, only called "the part", so the reader has to
         work out which of the two things in the sentence it means;
       - it leads with the consolation and buries the point, so the fact that
         the color will not be visible arrives last;
       - "no view from outside can see it" leaves "it" ambiguous between the
         color and the part, and a view does not see anything.

     Now: the fact, then what it costs you. The old note avoided a verb after
     the blocker's name because a part title can be singular or plural, and
     "Full-face covers cover this part" and "Gen 11 skin cover this part" were
     both wrong at once. Making the part the subject dissolves that: the verb
     agrees with "This part" and the blocker is only ever the object of a
     preposition, so it can be any number at all. */
  wrap.append(el('span', null, name
    ? `This part is hidden behind <b>${esc(name)}</b>. A color set here will not show ` +
      'from outside the car, only with the part selected or in x-ray.'
    : 'This part is enclosed inside the car. A color set here will not show from outside, ' +
      'only with the part selected or in x-ray.'));
  const btn = el('button', 'sw-xray', xrayIsOn() ? 'x-ray is on' : 'turn on x-ray');
  btn.onclick = () => {
    setXray(true);
    btn.textContent = 'x-ray is on';
    btn.disabled = true;
  };
  btn.disabled = xrayIsOn();
  wrap.append(btn);
  return wrap;
}

function finishRow(key, onPick) {
  const row = el('div', 'sw-row');
  const pick = (hex) => {
    if (hex == null) delete partPaints[key];
    else partPaints[key] = hex;
    viewer.setPartPaint(key, hex, metalOf(hex == null ? null : paintByHex(hex)));
    savePartPaints();
    refreshPaintBtn();
    /* mark in place rather than rebuilding the panel, which would throw away
       the scroll position of whatever the user was reading */
    for (const b of row.children) b.classList.remove('on');
    row.querySelector(`[data-hex="${hex == null ? 'body' : hex}"]`)?.classList.add('on');
    onPick?.();
  };
  const cur = viewer.getPartPaint(key);
  const add = (label, hex) => {
    const b = el('button', 'sw-pick' + ((hex == null ? cur == null : cur === hex) ? ' on' : ''));
    b.dataset.hex = hex == null ? 'body' : String(hex);
    b.title = label;
    if (hex == null) b.classList.add('sw-none');
    else b.style.setProperty('--sw', swatchOf(hex));
    b.onclick = () => pick(hex);
    row.append(b);
  };
  /* the empty well is "no override", which reads as "match the body" on a
     panel that follows the respray and as "as built" on anything else */
  add(viewer.isPainted(key) ? 'Match the body' : 'As built', null);
  for (const p of PAINTS) add(p.label, p.hex);
  return row;
}

/* ── Info panel ── */

function specTable(rows) {
  const t = el('table', 'spec-t');
  for (const [k, v] of rows) {
    const tr = el('tr');
    /* 444 of the 2,988 cross-references are in spec rows, where a cell like
       "Counterpart: body-9 skin, 46 kg" is the most navigable sentence in
       the whole panel */
    tr.append(el('td', null, linkify(k)), el('td', null, linkify(v)));
    t.append(tr);
  }
  return t;
}

function openPanel(key) {
  const rec = byKey[key];
  if (!rec) return;
  const def = SYSTEM_DEFS.find((d) => d.id === rec.sys);
  const m = rec.meta;
  const color = hexOf(def);
  setSel(def);
  panelIsCompare = false;
  lossOpen = null;
  const p = $('#panelIn');
  p.innerHTML = '';

  /* Navigation row: the system pill goes back up a level, and the stepper
     walks the system's parts in place, so browsing a system does not mean
     closing the panel and re-selecting it for every part. */
  const nav = el('div', 'p-nav');
  /* the system color keys the 3D model, so it stays, but as a 3 px index
     tab rather than a whole line of colored type */
  const back = el('button', 'p-back');
  /* names the rail row you go back to, not the variant, so the label is
     short enough to set whole and the way back is unambiguous */
  back.innerHTML = `<i>‹</i><span class="p-sys">${slotName(def)}</span>`;
  back.style.setProperty('--sys', color);
  back.title = 'Back to ' + def.name;
  back.onclick = () => { viewer.focusSystem(def.id); openSystemPanel(def); };
  nav.append(back);

  const ids = Object.keys(def.parts);
  const idx = ids.indexOf(rec.part);
  panelStep = null;
  if (ids.length > 1 && idx >= 0) {
    const go = (d) => {
      const k = def.id + '/' + ids[idx + d];
      if (!k || !ids[idx + d]) return;
      viewer.select(k);
      openPanel(k);
    };
    /* the same walk the arrow keys take; see the note where they are bound */
    panelStep = go;
    const steps = el('div', 'p-steps');
    const prev = el('button', null, '‹');
    const next = el('button', null, '›');
    prev.title = 'Previous part';
    next.title = 'Next part';
    prev.disabled = idx === 0;
    next.disabled = idx === ids.length - 1;
    prev.onclick = () => go(-1);
    next.onclick = () => go(1);
    steps.append(prev, el('span', null, `${idx + 1}/${ids.length}`), next);
    nav.append(steps);
  }
  p.append(nav, el('h3', null, esc(m.name)), el('p', 'p-tag', linkify(m.tagline)));

  const chips = el('div', 'chips');
  if (m.mass) chips.append(el('span', 'chip', `<small>mass</small>${m.mass} kg`));
  if (m.count) chips.append(el('span', 'chip', `<small>qty</small>${m.count}`));
  /* the color control is a CHIP here, beside the mass, not a swatch grid at
     the top of the document. See finishChip. */
  const fin = finishChip(key);
  if (fin) chips.append(fin);
  p.append(chips);
  /* what share of its own system and of the whole car this part is: a mass
     with nothing to measure it against is a number, and this is the first
     time the panel says how much of the car you are looking at */
  const shareLine = massShare(def, m);
  if (shareLine) p.append(shareLine);
  p.append(lineageStrip(def, rec.part));

  /* EVERY PART CAN CARRY A COLOR NOW, and the heading says which kind.
     A body panel gets FINISH: the override goes through the paint machinery,
     under the same clearcoat and pearl as the car, and clearing it puts the
     panel back on the body color. Anything else gets COLOR: its own
     materials keep their roughness, metalness and sheen and only the hue
     moves, so a tinted tire still reads as rubber. Davis asked for the
     wheels and the covers, which are the second kind. */

  if (m.specs?.length) { p.append(el('h5', null, 'Specification'), specTable(m.specs)); }
  if (m.how) { p.append(el('h5', null, 'How it works'), el('div', null, para(m.how))); }
  if (m.why) { p.append(el('h5', null, 'Why this design'), el('div', null, para(m.why))); }
  if (m.fail?.length) {
    p.append(el('h5', null, 'Failure modes and limits'));
    const ul = el('ul', 'fail');
    /* 871 of them are in here, which is the section most likely to name the
       module that caused the limit */
    for (const f of m.fail) ul.append(el('li', null, linkify(f)));
    p.append(ul);
  }

  sectionNav(p);
  /* A panel is a place, and arriving at one starts at its top. Stepping from
     part seven to part eight of a module used to land wherever the last
     panel had been scrolled to, which on a long one is the middle of a
     failure mode. The paint picker is careful NOT to rebuild the panel for
     exactly this reason, so every call that reaches here is a navigation. */
  p.scrollTop = 0;
  spySections();

  $('#panel').classList.add('on');
  for (const [k, b] of Object.entries(itemBtns)) b.classList.toggle('on', k === key);
  /* make sure the owning system list is expanded, and that the marked row is
     actually on screen: a highlight inside a scrolled-away list says nothing */
  const btn = itemBtns[key];
  if (btn) {
    const head = ownerHead(btn);
    if (head) head.classList.add('open');
    btn.scrollIntoView({ block: 'nearest' });
  }
}

/* ── THE CROSS-REFERENCE WEB ────────────────────────────────────────────
   These modules talk about each other constantly and none of it was
   navigable. Measured over the whole tree: 2,988 references to another
   module by id, in the writing of 294 of 455 parts, which is 65 percent.
   suspension-9's panel names drivetrain-9, body-11 names battery-11 nine
   times, and reading any of it meant closing the panel, remembering an id
   and hunting for it in the rail.

   ONLY THE SUFFIXED IDS ARE LINKED, and dropping the other ten is the whole
   reason this can be automatic. `body`, `battery`, `wheels`, `thermal`,
   `interior`, `hv`, `drivetrain`, `suspension` and `autonomy` are the Gen 1
   module ids AND they are ordinary English in this domain: "the body",
   "thermal load", "interior volume". Linking those would put a hyperlink on
   almost every paragraph in the model and send most of them somewhere wrong.
   Naive matching counted 4,096 hits; 1,108 of them were the English words.
   So 39 of the 49 ids are linkable and a reference to a Gen 1 module reads
   as plain text, which is a limitation worth stating rather than papering
   over with a guess about context.

   The text is ESCAPED first and linked second. The prose is plain text
   throughout, verified: the only angle brackets anywhere in js/systems are
   two `<slot>` in source comments, so escaping changes nothing that renders
   today and closes the door on a module ever shipping a stray bracket that
   silently eats a paragraph. */
const LINKABLE = SYSTEM_DEFS.map((d) => d.id).filter((id) => /-\d+$/.test(id))
  .sort((a, b) => b.length - a.length);
const XREF = new RegExp('\\b(' + LINKABLE.join('|') + ')\\b', 'g');

function linkify(text) {
  return esc(String(text)).replace(XREF, (id) => {
    const def = DEFS[id];
    if (!def) return id;
    /* the link carries its TARGET's color, so where it goes is readable
       before it is clicked, and it stays neutral until hovered so a dense
       paragraph does not turn into nine colors of underline */
    return `<a class="xref" data-sys="${id}" style="--sys:${hexOf(def)}" ` +
           `title="${esc(def.name)}">${id}</a>`;
  });
}

function para(text) {
  return String(text).split('\n\n').map((t) => `<p>${linkify(t)}</p>`).join('');
}

/* Open a module wherever it lives, swapping its slot in if the car is not
   currently wearing it. The system twin of gotoPart, and the reason a link
   to a module from another generation is worth having at all. */
function gotoSystem(sysId) {
  const def = DEFS[sysId];
  if (!def) return;
  const slotDef = slotOf(sysId);
  const show = () => { viewer.focusSystem(sysId); openSystemPanel(def); };
  if (!slotDef || VARIANT_CHOICE[slotDef.slot] === sysId) { show(); return; }
  const run = () => { setVariant(slotDef.slot, sysId); show(); };
  viewer.hasSystem(sysId) ? run() : withBusy(run);
}

/* One delegated listener on the panel rather than a handler per link. A
   single part's How it works can carry a dozen of them and the panel is
   rebuilt on every selection. */
$('#panelIn').addEventListener('click', (e) => {
  const a = e.target.closest('.xref');
  if (!a) return;
  e.preventDefault();
  gotoSystem(a.dataset.sys);
});

/* ── The compare panel ──────────────────────────────────────────────────
   js/compare.js works in miles and kilograms because tools/ladder.js does,
   and every published figure in HANDOFF.md and design/ comes from there.
   The display unit is a UI question and is answered here, once, rather than
   by giving the model a second opinion about what a mile is. */
const MI_PER_KM = 0.621371;
const asDist = (mi) => (unitKey === 'imp' ? mi : mi / MI_PER_KM);
const asRate = (whMi) => 1000 / (whMi * (unitKey === 'imp' ? 1 : MI_PER_KM));
const asWh = (whMi) => whMi * (unitKey === 'imp' ? 1 : MI_PER_KM);
const asMass = (kg) => (unitKey === 'imp' ? kg * 2.20462 : kg);
const massU = () => (unitKey === 'imp' ? 'lb' : 'kg');
const signed = (v, d) => (v > 0 ? '+' : '') + v.toFixed(d);
const rounded = (v) => Math.round(v).toLocaleString();

function openComparePanel() {
  if (!cmpOn) return;
  const c = compare(...cmpPair());
  if (!c) return;

  /* A part left selected owns the focus, and it would ghost six of the seven
     slots this panel is about. The compare view speaks about the whole car,
     so it takes the whole car back first. */
  if (viewer.getSelected()) viewer.select(null);
  for (const b of Object.values(itemBtns)) b.classList.remove('on');
  panelIsCompare = true;
  lossOpen = null;
  panelStep = null;
  applyCompareGhost();
  setSel(null);

  const p = $('#panelIn');
  p.innerHTML = '';

  const nav = el('div', 'p-nav');
  const pill = el('div', 'p-sys', 'Compare');
  pill.style.setProperty('--sys', 'var(--acc)');
  nav.append(pill);
  p.append(nav);

  p.append(el('h3', null, `${c.a.label}<i class="cmp-to">to</i>${c.b.label}`));
  p.append(el('p', 'p-tag', c.b.note || ''));

  /* WHAT THE VIEW SAYS WHEN NOTHING CHANGED. design/app-brief.md section 7
     names this exact trap: a compare that lists only what changed is silent
     about a generation that changed nothing, and silence is indistinguishable
     from the feature being broken. Two rungs running the same nine modules
     get a sentence, not an empty list. */
  const carried = c.slots.length - c.changedCount;
  /* Says what the view DOES, not what will be visible. When the body is one
     of the slots that changed it stays solid and hides the ghosted platform
     behind it, which is the correct picture (the new shell is the story) but
     would make a promise of "you will see them fade" into a lie. When the
     body carries, it fades and you look straight through it at everything
     the rung replaced, which is the best thing this view does. */
  p.append(el('div', 'cmp-lede', c.changedCount === 0
    ? 'Nothing differs. These two run the same nine modules, so the car is shown whole.'
    : `<b>${c.changedCount}</b> of ${c.slots.length} slots changed. The car holds ` +
      `${c.changedCount === 1 ? 'that one' : 'those ' + c.changedCount} solid and fades the ` +
      `${carried} that ${carried === 1 ? 'carries' : 'carry'}.`));

  /* ── What it bought ── */
  p.append(el('h5', null, 'What it bought'));
  const t = el('table', 'cmp-t');
  const row = (k, from, to, delta, unit) => {
    const tr = el('tr');
    const d = el('td', 'cmp-d');
    if (delta === null) { d.textContent = 'unchanged'; d.classList.add('zero'); }
    else d.textContent = delta;
    tr.append(el('td', null, k), el('td', 'cmp-ab', `${from}<i>to</i>${to}<em>${unit}</em>`), d);
    t.append(tr);
  };
  row('efficiency', asRate(c.a.whMi).toFixed(2), asRate(c.b.whMi).toFixed(2),
      signed(asRate(c.b.whMi) - asRate(c.a.whMi), 2), U().d + '/kWh');
  row('range', rounded(asDist(c.a.miles)), rounded(asDist(c.b.miles)),
      signed(asDist(c.totals.dMiles), 0), U().d);
  row('mass', rounded(asMass(c.a.mass)), rounded(asMass(c.b.mass)),
      signed(asMass(c.totals.dMass), 0), massU());
  row('frontal area', c.a.area.toFixed(4), c.b.area.toFixed(4),
      c.totals.dArea ? signed(c.totals.dArea, 4) : null, 'm2');
  row('pack', String(c.a.kwh), String(c.b.kwh),
      c.totals.dKwh ? signed(c.totals.dKwh, 0) : null, 'kWh');
  p.append(t);

  /* ── Which TERM the generation moved ──────────────────────────────────
     The efficiency card has always shown this rung's five-way split and
     never which of them a rung actually moved, which is what every retro in
     design/ is about. Gen 6 is the answer to why that matters: it is one
     module and it takes 0.230 m2 out of the frontal area, so its whole story
     is in one bar.

     Drawn as a before and after on ONE scale rather than two numbers: the
     part both rungs share is solid, and the difference is drawn beyond it,
     hatched when the term shrank and solid when it grew. A term that did not
     move has no second segment at all. */
  p.append(el('h5', null, 'Where the energy went'));
  const wfMax = Math.max(...c.terms.map((t) => Math.max(t.a, t.b))) || 1;
  const biggest = c.terms.reduce((m, t) => (Math.abs(t.d) > Math.abs(m.d) ? t : m), c.terms[0]);
  for (const t of c.terms) {
    const row = el('div', 'wf-row' + (t === biggest && t.d ? ' wf-top' : ''));
    row.append(el('span', null, t.label));
    const bar = el('div', 'wf-bar');
    const keep = el('i', 'wf-keep');
    keep.style.width = ((Math.min(t.a, t.b) / wfMax) * 100).toFixed(2) + '%';
    const diff = el('i', 'wf-diff' + (t.d < 0 ? ' gone' : ' added'));
    diff.style.left = ((Math.min(t.a, t.b) / wfMax) * 100).toFixed(2) + '%';
    diff.style.width = ((Math.abs(t.d) / wfMax) * 100).toFixed(2) + '%';
    bar.append(keep, diff);
    row.append(bar, el('u', null, t.d ? signed(asWh(t.d), 1) : 'flat'));
    p.append(row);
  }
  p.append(el('div', 'cmp-foot',
    `Wh/${U().d}, both rungs on one scale. These five are the total: they sum ` +
    `to ${signed(asWh(c.totals.dWhMi), 1)} with ${asWh(Math.abs(c.residual.termWhMi)) < 0.005
      ? 'nothing' : signed(asWh(c.residual.termWhMi), 2)} left over, because a term is ` +
    `a share of where the energy went. The slot figures below are the same ` +
    `total cut the other way and they do not close, which is the difference ` +
    `between partitioning a number and swapping the things that make it.`));

  /* ── Nine slots, all of them, every time ── */
  p.append(el('h5', null, `${c.slots.length} slots`));
  for (const s of c.slots) {
    const b = el('button', 'cmp-slot' + (s.changed ? '' : ' carry'));
    b.style.setProperty('--sys', '#' + s.color.toString(16).padStart(6, '0'));
    b.append(el('b', null, s.name));
    /* Consumption, not mi/kWh, and for the same reason the efficiency card
       keeps its breakdown in Wh: these are shares of a total that is spent,
       and one over a share of a sum is not a share of anything. */
    b.append(el('u', null, s.changed
      ? `${signed(asMass(s.dMass), 0)} ${massU()}<i>${signed(asWh(s.dWhMi), 1)} Wh/${U().d}</i>`
      : 'carried'));
    b.append(el('span', null, s.changed
      ? `${s.aLabel}<i class="cmp-to">to</i>${s.bLabel}`
      : `${s.bLabel}, unchanged since ${s.bIntro ? s.bIntro.label : 'Gen 1'}`));
    /* the module ON SCREEN for that slot, because that is the car being
       looked at and the panel it opens has to be about something visible */
    b.onclick = () => {
      const def = SYSTEM_DEFS.find((d) => d.id === VARIANT_CHOICE[s.slot]);
      if (!def) return;
      viewer.focusSystem(def.id);
      openSystemPanel(def);
    };
    p.append(b);
  }

  /* ── The part that keeps this honest ── */
  if (c.changedCount) {
    p.append(el('h5', null, 'Reading the slot figures'));
    p.append(el('div', null, para(
      `Each slot figure above is the ${c.a.label} car with only that slot changed. ` +
      `The mass column adds up to the ${signed(asMass(c.totals.dMass), 0)} ${massU()} ` +
      `total exactly, because mass is a sum.\n\n` +
      `The consumption column does not, and it cannot. Swapping two slots lands the ` +
      `second on a car the first one already changed; frontal area belongs to the body ` +
      `and the wheels together rather than to either; and drivetrain efficiency divides ` +
      `the aero, rolling and stop-go terms all three, so what it is worth depends on how ` +
      `large they already are. The nine figures leave ` +
      `${signed(asWh(c.residual.whMi), 2)} Wh/${U().d} of the ` +
      `${signed(asWh(c.totals.dWhMi), 1)} unaccounted for, and that leftover is the ` +
      `coupling between the slots rather than an error in either number.`)));
  }

  sectionNav(p);
  p.scrollTop = 0;
  spySections();

  $('#panel').classList.add('on');
}

/* System overview: blurb plus its clickable part list. */
function openSystemPanel(def) {
  const color = hexOf(def);
  setSel(def);
  panelIsCompare = false;
  lossOpen = null;
  panelStep = null;
  const p = $('#panelIn');
  p.innerHTML = '';

  const nav = el('div', 'p-nav');
  /* Compare mode stays ON while a module is read, so the way back to the
     comparison belongs in the panel. Without it the only route back is
     toggling compare off and on, which throws away the pair that was
     chosen. It goes on the SYSTEM level and not on the part level, so the
     ladder reads as one hierarchy: compare, then system, then part. */
  if (cmpOn) {
    const back = el('button', 'p-back');
    back.innerHTML = '<i>‹</i><span class="p-sys">Compare</span>';
    back.style.setProperty('--sys', 'var(--acc)');
    back.title = 'Back to the comparison';
    back.onclick = openComparePanel;
    nav.append(back);
  }
  const pill = el('div', 'p-sys', 'System');
  pill.style.setProperty('--sys', color);
  nav.append(pill);
  p.append(nav, el('h3', null, esc(def.name)), el('p', 'p-tag', linkify(def.blurb || '')));

  const entries = Object.entries(def.parts);
  const totMass = entries.reduce((a, [, m]) => a + (m.mass || 0), 0);
  const chips = el('div', 'chips');
  chips.append(el('span', 'chip', `<small>parts</small>${entries.length}`));
  chips.append(el('span', 'chip', `<small>mass</small>${Math.round(totMass)} kg`));
  p.append(chips);

  /* ── WHO NAMES THIS MODULE ────────────────────────────────────────────
     The forward links let you follow a reference out. This is the same web
     read backward, and it is the more surprising direction: hv-4 is named
     in the writing of 239 parts, which is a fact about how central that
     module is that nothing in the app could previously say.
     It hands off to the search rather than growing its own list, because
     the search already renders hits with the sentence they were found in
     and already knows how to reach a part on a rung that is not on screen. */
  if (LINKABLE.includes(def.id)) {
    const back = runSearch(def.id).filter((h) => h.h.rec.sys !== def.id);
    if (back.length) {
      const b = el('button', 'p-back-ref');
      b.innerHTML = `Named in the writing of <b>${back.length}</b> ` +
        `other part${back.length === 1 ? '' : 's'}`;
      b.title = `Search the whole model for ${def.id}`;
      b.onclick = () => {
        const find = $('#railFind');
        find.value = def.id;
        find.dispatchEvent(new Event('input'));
        if (document.body.classList.contains('rail-hidden')) $('#railToggle').click();
        find.focus();
      };
      p.append(b);
    }
  }

  p.append(el('h5', null, 'Parts'));
  entries.forEach(([pid, m], i) => {
    const row = el('button', 'p-part');
    row.append(el('u', null, String(i + 1).padStart(2, '0')),
               el('b', null, m.name), el('span', null, m.tagline || ''));
    row.onclick = () => { const key = def.id + '/' + pid; viewer.select(key); openPanel(key); };
    p.append(row);
  });

  sectionNav(p);
  p.scrollTop = 0;
  spySections();

  $('#panel').classList.add('on');
  for (const b of Object.values(itemBtns)) b.classList.remove('on');
}

/* ── Section marks and the reading column ───────────────────────────────

   A part panel is between 583 words and 4,820 of them, and until this the
   only way to know what was in one was to scroll it. The strip lists the
   sections a panel actually has, sticks to the top of the scroll once the
   title has passed, and marks the one being read.

   ONE LISTENER FOR THE LIFE OF THE PAGE, not one per panel. openPanel
   replaces the contents of #panelIn on every selection, so a listener added
   during a build would have to be taken off during the next one, and the
   scroll container is the same element throughout anyway. The heading list
   is what changes, so that is what is swapped. */
const SECT_SHORT = {
  'Specification': 'spec',
  'How it works': 'how',
  'Why this design': 'why',
  'Failure modes and limits': 'limits',
  'What it bought': 'bought',
  'Where the energy went': 'energy',
  'Reading the slot figures': 'reading',
  /* the closure card has two headings starting with "What", so the first
     word rule gives it two marks reading the same thing */
  'What it costs in space': 'space',
  'How it opens': 'opens',
  'What it costs': 'costs',
};
let panelHeads = [];
let panelMarks = [];

function sectionNav(p) {
  panelHeads = [...p.querySelectorAll('h5')];
  panelMarks = [];
  /* one heading is not a structure, and a strip that says "spec" over a
     panel whose whole content is the spec is furniture */
  if (panelHeads.length < 2) return;
  const strip = el('div', 'p-sects');
  panelHeads.forEach((h, i) => {
    /* one word, and not the first one when the first one is a count: the
       compare panel's slot heading is "9 slots", whose first word is 9 */
    const words = h.textContent.split(' ');
    const label = SECT_SHORT[h.textContent] ||
      (/^\d+$/.test(words[0]) ? words[1] : words[0]).toLowerCase();
    const b = el('button', null, label);
    b.title = h.textContent;
    b.onclick = () => {
      /* 44 px above the heading: the strip is 36 and the gap is what stops
         the heading sitting under its own mark */
      $('#panelIn').scrollTo({ top: h.offsetTop - 44, behavior: 'smooth' });
    };
    strip.append(b);
    panelMarks.push(b);
  });
  panelHeads[0].parentNode.insertBefore(strip, panelHeads[0]);
}

function spySections() {
  if (!panelMarks.length) return;
  const st = $('#panelIn').scrollTop + 56;
  let at = 0;
  for (let i = 0; i < panelHeads.length; i++) if (panelHeads[i].offsetTop <= st) at = i;
  for (let i = 0; i < panelMarks.length; i++) panelMarks[i].classList.toggle('on', i === at);
}
$('#panelIn').addEventListener('scroll', spySections, { passive: true });

/* Sticky across visits, like the rail and the readout, because it is a
   reading preference rather than a state of the model. */
function setReadWide(on) {
  document.body.classList.toggle('read-wide', on);
  $('#panelWide').setAttribute('aria-pressed', on ? 'true' : 'false');
  $('#panelWide').title = on ? 'Narrow the reading column' : 'Widen the reading column';
  try { localStorage.setItem('ev-read-wide', on ? '1' : '0'); } catch {}
  /* the headings moved, so the marks are reading stale offsets */
  spySections();
}
$('#panelWide').onclick = () =>
  setReadWide(!document.body.classList.contains('read-wide'));
try { if (localStorage.getItem('ev-read-wide') === '1') setReadWide(true); } catch {}

function closePanel() {
  $('#panel').classList.remove('on');
  panelStep = null;
  setSel(null);
  panelIsCompare = false;
  lossOpen = null;
  for (const b of Object.values(itemBtns)) b.classList.remove('on');
}

/* Closing the panel leaves compare mode with it. The ghosted car is not a
   view in its own right: it is the picture the panel is explaining, and
   leaving seven eighths of the vehicle faded to seven percent with nothing
   on screen saying why reads as a fault rather than as a comparison. */
$('#panelClose').onclick = () => {
  if (cmpOn) setCompare(false);
  closePanel();
  viewer.select(null);
};

/* ── Controls ── */

/* auto-rotate preference, remembered; clicking the car still pauses it */
let spinOn = true;
try { spinOn = localStorage.getItem('ev-autorotate') !== '0'; } catch {}
function setSpin(on) {
  spinOn = on;
  /* The tour holds the turntable for its duration, and setTour says why: the
     two frontal-area stops ARE the silhouette, and seven idle seconds of
     turntable turns the evidence away while it is being read. That
     suppression went through the viewer rather than through this switch
     precisely so the preference survives, but this function then wrote
     straight past it: pressing the button mid-tour started the car spinning
     off the authored station. The preference is still recorded and still
     saved below; it is applied when the tour hands the car back, at the
     setAutoRotate(spinOn) in setTour. */
  if (!tourOn) viewer.setAutoRotate(on);
  $('#btnSpin').classList.toggle('on', on);
  $('#btnSpin').title = on ? 'Auto-rotate when idle (on)' : 'Auto-rotate when idle (off)';
  try { localStorage.setItem('ev-autorotate', on ? '1' : '0'); } catch {}
}
$('#btnSpin').onclick = () => setSpin(!spinOn);
setSpin(spinOn);

$('#unitImp').onclick = () => setUnits('imp');
$('#unitMet').onclick = () => setUnits('met');
setUnits(unitKey);

/* collapsible systems rail, sticky across visits */
const railToggle = $('#railToggle');
function setRailHidden(hidden) {
  document.body.classList.toggle('rail-hidden', hidden);
  railToggle.textContent = hidden ? '›' : '‹';
  try { localStorage.setItem('ev-rail-hidden', hidden ? '1' : '0'); } catch {}
}
railToggle.onclick = () => setRailHidden(!document.body.classList.contains('rail-hidden'));
/* BOTH SIDE PANELS ARE OPEN WHEN THE SITE OPENS. Davis, 2026-08-23: "the side
   window tabs should also be open automatically when opening the site". The
   hidden state was sticky across visits here since the collapsible rail
   shipped; it is not restored any more, so a reader who collapsed a panel
   last time gets the whole instrument back on the next load, and the toggle
   still works for the session. The key is still written so nothing else
   that reads it breaks. */

/* collapsible efficiency card, for the session. Same pattern as the
   rail: the card slides out and its control follows it to the edge, so the
   way back is always visible. */
const effToggle = $('#effToggle');
function setEffHidden(hidden) {
  document.body.classList.toggle('eff-hidden', hidden);
  effToggle.textContent = hidden ? '‹' : '›';
  effToggle.title = (hidden ? 'Show' : 'Hide') + ' the efficiency card';
  try { localStorage.setItem('ev-eff-hidden', hidden ? '1' : '0'); } catch {}
}
effToggle.onclick = () => setEffHidden(!document.body.classList.contains('eff-hidden'));
/* open on every load, see the rail above. EXCEPT ON A PHONE. Davis,
   2026-08-23, on his: "the two windows on the side and the car was zoomed in
   and looked strange". Under 640 px the two plates cannot stand beside the
   car, they stand on it: the rail and the readout shared one column over the
   whole stage and the car was behind both. So a phone opens on the car, both
   plates slid out, and the two latches (taller there, see the coarse-pointer
   block in css/style.css) bring either back; the desktop rule is unchanged.
   Read once at boot, which is the same moment the desktop rule applies. A
   phone on its side is a phone too: 812 by 375 leaves 300 px of car between
   two 248 px plates, so the height clause catches it. */
const PHONE = matchMedia('(max-width: 640px), (max-height: 500px)').matches;
if (PHONE) { setRailHidden(true); setEffHidden(true); }

/* the slider's track fills to the thumb, so the control reads its own value
   at a glance the way a gauge does */
/* scoped to its own group: the section plate below carries a second slider
   built from the same class, and this used to be a bare $('.slider') that
   worked only because document order happened to put the faceplate first */
const expSlider = $('#pExp .slider');
function setExplodeVal(v) {
  expSlider.style.setProperty('--v', v + '%');
  $('#expVal').textContent = v + '%';
}
$('#exp').oninput = (e) => {
  viewer.setExplode(+e.target.value / 100);
  setExplodeVal(e.target.value);
};
setExplodeVal($('#exp').value);
/* One way in and out of x-ray, because the tour drives it too and a second
   caller reaching straight past the button would leave the switch lit for a
   shell that is solid, or dark for one that is not. */
function setXray(on) {
  $('#btnXray').classList.toggle('on', on);
  viewer.setXray(on);
}
const xrayIsOn = () => $('#btnXray').classList.contains('on');
$('#btnXray').onclick = () => setXray(!xrayIsOn());

/* ── The section ────────────────────────────────────────────────────────

   X-ray fades the shell and shows you a ghost of what is behind it. A
   SECTION cuts the car on a plane and shows you the real thing: where the
   pack floor sits under the seat, how deep the tunnel is, what the tandem
   cabin actually did to the package. design/app-brief.md section 3 asks for
   cutaway and section views, and this is that.

   THE PLANE IS IN THE CAR'S OWN METERS, which is the difference between a
   toy and an instrument. The slider does not run 0 to 100 percent of a
   bounding box: it runs the real extent of the vehicle on that axis, the
   readout prints the station in meters, and 0 on the long axis is the
   centerline every module in js/systems already measures itself against.

   THE NEAR HALF GOES FIRST. Picking an axis chooses the side to remove from
   where the camera is standing, because a cut whose closed face is toward
   you is indistinguishable from no cut at all, and that first impression is
   the whole feature. Orbiting past the plane afterward does NOT re-flip it:
   a view that reorganizes itself while it is being dragged is worse than one
   that needs a button, and the button is right there. */

const CUT_AXES = [
  { id: 'long',  label: 'along',  axis: 'z',
    note: 'the centerline section: cabin, tunnel and pack floor in one cut' },
  { id: 'cross', label: 'across', axis: 'x',
    note: 'a station through the car, the way a body engineer draws it' },
  { id: 'plan',  label: 'plan',   axis: 'y',
    note: 'a horizontal cut: the pack, the floor and what sits on them' },
];
const AXIS_OF = Object.fromEntries(CUT_AXES.map((a) => [a.id, a.axis]));
/* what the number beside the slider is a measurement OF */
const CUT_READS = {
  long:  'from centerline',
  cross: 'along the car',
  plan:  'above the floor',
};

let cutOn = false;
let cutAxis = 'long';
let cutAt = 0;
let cutFlip = false;
let cutEl = null;
let cutInit = false;
let cutRange = { min: -1, max: 1 };

function cutBounds(axis) {
  const box = viewer.vehicleBox();
  if (!box) return { min: -1, max: 1 };
  const k = AXIS_OF[axis];
  /* a hair inside the extremes, because a plane exactly on the last vertex
     of the car either clips everything or nothing and both ends of the
     slider would then be dead travel */
  return { min: box.min[k] + 0.01, max: box.max[k] - 0.01 };
}

function buildCut() {
  if (cutEl) return cutEl;
  cutEl = el('div', null);
  cutEl.id = 'cut';
  /* the outer element is a BAND across the free space and the inner one is
     the plate; see the note in css/style.css on why the plate is not simply
     centered on the window */
  cutEl.innerHTML =
    '<div class="cut-in">' +
      '<small>section</small>' +
      '<div class="cut-ax"></div>' +
      '<span class="slider cut-slide"><input id="cutPos" type="range" min="0" max="1" step="0.005"></span>' +
      '<b class="cut-val"></b>' +
      '<button class="cut-flip" title="Keep the other half">flip</button>' +
      '<button class="cut-x" aria-label="Stop sectioning">×</button>' +
    '</div>';
  document.body.append(cutEl);
  /* the strip's height into --cuth, so the readout can start below it rather
     than under it on a short window; see the note beside syncCutH */
  syncCutH();
  new ResizeObserver(syncCutH).observe(cutEl);

  const ax = cutEl.querySelector('.cut-ax');
  for (const a of CUT_AXES) {
    const b = el('button', 'cut-axb', a.label);
    b.title = a.note;
    b.onclick = () => setCutAxis(a.id);
    b.dataset.ax = a.id;
    ax.append(b);
  }
  cutEl.querySelector('#cutPos').oninput = (e) => {
    const t = +e.target.value;
    cutAt = cutRange.min + t * (cutRange.max - cutRange.min);
    applyCut();
  };
  cutEl.querySelector('.cut-flip').onclick = () => { cutFlip = !cutFlip; applyCut(); };
  cutEl.querySelector('.cut-x').onclick = () => setCutOn(false);
  return cutEl;
}

function applyCut() {
  viewer.setCut(cutOn ? { axis: cutAxis, at: cutAt, flip: cutFlip } : null);
  if (!cutEl) return;
  const span = cutRange.max - cutRange.min || 1;
  const t = Math.max(0, Math.min(1, (cutAt - cutRange.min) / span));
  const slide = cutEl.querySelector('.cut-slide');
  slide.style.setProperty('--v', (t * 100).toFixed(1) + '%');
  cutEl.querySelector('#cutPos').value = String(t);
  cutEl.querySelector('.cut-val').innerHTML =
    `${cutAt.toFixed(3)}<i>m</i><span>${CUT_READS[cutAxis]}</span>`;
  for (const b of cutEl.querySelectorAll('.cut-axb')) {
    b.classList.toggle('on', b.dataset.ax === cutAxis);
  }
}

/* The car changed under the plane: keep the axis and the half, re-measure
   the travel, and hold the station where it is unless it now falls off the
   end of the car. */
function refreshCutRange() {
  cutRange = cutBounds(cutAxis);
  cutAt = Math.max(cutRange.min, Math.min(cutRange.max, cutAt));
  applyCut();
}

/* Which half to keep, decided from where the camera is: the half the viewer
   is standing in is the half that goes. */
function cutFlipForCamera(axis, at) {
  const p = viewer.cameraPos();
  return p[AXIS_OF[axis]] < at;
}

function setCutAxis(id) {
  cutAxis = id;
  cutRange = cutBounds(id);
  /* the centerline is the interesting place to start on the long axis and
     the middle of the travel is the interesting place on the other two */
  cutAt = id === 'long' ? 0 : (cutRange.min + cutRange.max) / 2;
  cutFlip = cutFlipForCamera(id, cutAt);
  applyCut();
}

function setCutOn(on) {
  cutOn = on;
  buildCut();
  document.body.classList.toggle('cut', on);
  $('#btnCut').classList.toggle('on', on);
  $('#btnCut').setAttribute('aria-pressed', on ? 'true' : 'false');
  /* The plane is chosen ONCE and then remembered. Deriving the axis defaults
     on every activation threw away the station and the half a reader had
     just set whenever anything took the section away and gave it back, and
     the tour does exactly that. Only the first opening has nothing to
     remember; after that the car may have changed underneath it, which is
     what re-measuring the travel is for. */
  if (!on) applyCut();
  else if (cutInit) refreshCutRange();
  else { cutInit = true; setCutAxis(cutAxis); }
}
$('#btnCut').onclick = () => setCutOn(!cutOn);

/* ── OPEN: the closures, and what they cost in space ───────────────────

   The band is the section strip's twin because it is the same kind of
   control: a mode with a small number of choices and one measurement beside
   them. What it adds over a row of toggles is the line on the right, which
   is the whole reason the feature exists. A door is the one part of a car
   whose cost is paid by the ground next to it, and nothing in this app could
   say how much until the sweep existed.

   Every figure in here is measured off the geometry on screen through
   viewer.closureMetrics. Nothing is declared, so nothing can go stale
   against a body that changed underneath it. */

let openOn = false;
let openEl = null;
let openFocus = null;   // the closure whose numbers the band is showing

const STALL_M = 2.50;

function buildOpen() {
  if (openEl) return openEl;
  openEl = el('div', null);
  openEl.id = 'open';
  openEl.innerHTML =
    '<div class="open-in">' +
      '<small>open</small>' +
      '<div class="open-list"></div>' +
      '<button class="open-all" title="Open every panel at once">all</button>' +
      '<button class="open-x" aria-label="Close the panels and leave">×</button>' +
    '</div>';
  document.body.append(openEl);
  syncOpenH();
  new ResizeObserver(syncOpenH).observe(openEl);
  openEl.querySelector('.open-all').onclick = () => {
    const list = viewer.closureList();
    const anyShut = list.some((c) => !c.open);
    viewer.setAllClosures(anyShut);
    drawOpen();
  };
  openEl.querySelector('.open-x').onclick = () => setOpenOn(false);
  return openEl;
}

/* One sentence about what this closure needs from the world around it. The
   lateral figure is what a parking stall has to give it; the overhead one is
   what a garage ceiling has to. A closure reports whichever it actually
   spends, because a hood that needs no width and 412 mm of height and a door
   that needs 965 mm of width and no height are the same measurement asked in
   two directions. */
function closureRead(key) {
  const m = viewer.closureMetrics(key);
  if (!m) return '';
  const mm = (v) => Math.round(v * 1000) + ' mm';
  const spec = closureSpec(key);
  const full = spec ? Math.round(spec.motion.reduce((a, s) => (s.kind === 'slide' ? a : a + s.deg), 0)) : 0;
  const bits = [];
  /* 1 mm, not 5. At 5 the zero case could be a panel standing half a
     centimeter outside the car, and the sentence it prints claims the
     opposite in so many words, so the claim has to be worth its threshold. */
  if (m.lateral > 0.001) bits.push(mm(m.lateral) + ' of curbside');
  if (m.overhead > 0.001) bits.push(mm(m.overhead) + ' overhead');
  if (m.fore > 0.001) bits.push(mm(m.fore) + ' ahead');
  if (m.aft > 0.001) bits.push(mm(m.aft) + ' behind');
  /* SAY THE FACT, NOT THE ABSENCE. This used to read "nothing outside the
     parked car", which is what the measurement returns and not what it
     means: a reader has to work out that the four numbers are excursions
     and that all four being zero is a property worth having. Gen 3's
     decklid swings 75 degrees and every point of it stays inside the
     outline the shut car already occupies, which is a real packaging
     result and the one line in this readout that is good news. */
  if (!bits.length) bits.push('opens inside the car\'s own outline');
  /* the stall line is only interesting for something that swings sideways: a
     hood is not competing with the car parked next to this one */
  if (m.lateral > 0.005) {
    bits.push(m.bayFrac === null
      ? 'opens fully in a 2.5 m stall'
      : (spec ? Math.round(travelDegAt(spec, m.bayFrac)) + ' of ' + full + ' deg' : 'stops')
        + ' in a 2.5 m stall');
  }
  return bits.join(' · ');
}

function closureSpec(key) {
  const rec = viewer.closureList().find((c) => c.key === key);
  return rec ? rec.spec : null;
}


/* Degrees swung at travel t, so the stall figure reads as an angle a person
   can picture rather than a percentage of an animation. */
function travelDegAt(spec, t) {
  let deg = 0;
  for (const st of spec.motion) {
    if (st.kind === 'slide') continue;
    const a = st.at ? st.at[0] : 0, b = st.at ? st.at[1] : 1;
    const s = b <= a ? (t >= b ? 1 : 0) : Math.max(0, Math.min(1, (t - a) / (b - a)));
    deg += st.deg * s;
  }
  return deg;
}

function drawOpen() {
  if (!openEl) return;
  const list = viewer.closureList();
  const box = openEl.querySelector('.open-list');
  box.innerHTML = '';
  for (const c of list) {
    const b = el('button', 'open-b', esc(c.spec.name));
    b.classList.toggle('on', c.open);
    b.dataset.key = c.key;
    b.title = c.spec.seat || '';
    b.setAttribute('aria-pressed', c.open ? 'true' : 'false');
    b.onclick = () => {
      viewer.setClosure(c.key, !c.open);
      openFocus = c.key;
      drawOpen();
    };
    box.append(b);
  }
  if (!openFocus || !list.some((c) => c.key === openFocus)) {
    openFocus = list.length ? list[0].key : null;
  }
  openEl.querySelector('.open-all').textContent =
    list.length && list.every((c) => c.open) ? 'shut' : 'all';
}

function setOpenOn(on) {
  openOn = on;
  buildOpen();
  document.body.classList.toggle('opening', on);
  $('#btnOpen').classList.toggle('on', on);
  $('#btnOpen').setAttribute('aria-pressed', on ? 'true' : 'false');
  if (on) drawOpen();
  else viewer.setAllClosures(false);
}
$('#btnOpen').onclick = () => setOpenOn(!openOn);

/* Drive is no longer only an animation: it is what spends the pack. */
$('#btnDrive').onclick = (e) => {
  driveOn = e.currentTarget.classList.toggle('on');
  viewer.setDrive(driveOn);
  drawEnergy();
};
$('#btnHome').onclick = () => { closePanel(); viewer.flyHome(); };

/* Escape dismisses ONE layer, the topmost. It used to fire all three lines
   every time, so opening the generation menu over an open part panel and
   then changing your mind cost you the panel and the 3D selection as well
   as the menu: one keypress, three states cleared, two of them unasked. */
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (openMenu) { closeMenu(true); return; }
  /* the closures band is a layer above the panel: escaping out of a card you
     opened from the band should leave the band standing */
  if (openOn && !$('#panel').classList.contains('on')) { setOpenOn(false); return; }
  if ($('#panel').classList.contains('on')) {
    /* the reading state is one layer, and compare mode is part of it: see
       the note on #panelClose */
    if (cmpOn) setCompare(false);
    closePanel();
    viewer.select(null);
    return;
  }
  /* the tour is a layer above the selection and below the panel: reading a
     module from a stop and pressing escape goes back to the stop, not out of
     the tour, because the stop is what sent you there */
  if (tourOn) { setTour(false); return; }
  if (viewer.getSelected()) viewer.select(null);
});

/* ── Dropdown primitive: button + glass menu appended to body (escapes the
   rail's overflow clipping via fixed positioning) ── */

let openMenu = null;
let menuBtn = null;
let placeMenu = null;
/* restore: put focus back on the button that owns the menu. Only the paths
   that dismissed the menu deliberately ask for it, so a click somewhere else
   on the page does not yank focus back to a control nobody is using. */
function closeMenu(restore = false) {
  const owner = menuBtn;
  if (openMenu) { openMenu.remove(); openMenu = null; }
  placeMenu = null;
  menuBtn = null;
  document.querySelectorAll('.dd.open').forEach((b) => {
    b.classList.remove('open');
    b.setAttribute('aria-expanded', 'false');
  });
  if (restore && owner && owner.isConnected) owner.focus();
}
addEventListener('pointerdown', (e) => {
  if (openMenu && !openMenu.contains(e.target) && !e.target.closest('.dd')) closeMenu();
});
/* The menu is position:fixed on the body so it escapes the rail's overflow
   clipping, and it was placed once and then left there. The rail is a
   scroll container and its variant dropdowns sit inside it: scrolling the
   rail 120 px with a menu open moved the button 120 px and the menu 0, so
   the menu went on pointing at whatever had scrolled into its place.
   Capture phase, because a scroll inside #rail does not bubble. */
addEventListener('scroll', () => placeMenu && placeMenu(), true);
addEventListener('resize', () => placeMenu && placeMenu());

/* Placement, dismissal and the scroll and resize follow, shared by the option
   list and by the finish popover. Extracted rather than copied: everything
   this function is careful about is written up on the listeners above, and a
   second copy would be a second thing to remember to keep following a scroll.
   matchWidth is for a menu that hangs off a wide button and should be at
   least as wide as it; the finish popover hangs off a 26 px swatch and sizes
   itself. */
function mountMenu(btn, menu, matchWidth) {
  document.body.append(menu);
  const place = () => {
    const r = btn.getBoundingClientRect();
    /* a button scrolled out of its own panel has no place to point at */
    if (r.bottom < 0 || r.top > innerHeight) { closeMenu(); return; }
    const mw = Math.max(menu.offsetWidth, matchWidth ? r.width : 0);
    if (matchWidth) menu.style.minWidth = r.width + 'px';
    menu.style.left = Math.max(12, Math.min(r.left, innerWidth - mw - 12)) + 'px';
    const below = innerHeight - r.bottom - 12;
    if (menu.offsetHeight > below && r.top > menu.offsetHeight + 12) {
      menu.style.maxHeight = '';
      menu.style.top = (r.top - menu.offsetHeight - 6) + 'px';
    } else {
      menu.style.top = (r.bottom + 6) + 'px';
      menu.style.maxHeight = below + 'px';
    }
  };
  place();
  btn.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
  openMenu = menu;
  menuBtn = btn;
  placeMenu = place;
}

/* The menu is a real listbox for the keyboard, not only for the mouse.
   It is appended to the end of <body> so it can escape the rail's overflow
   clipping, and nothing moved focus into it: measured on the generation
   dropdown at 1440x900, the first menu item was tab stop 36 of 44 while the
   button was tab stop 1, so opening the primary control of the product and
   reaching its first option cost 35 Tab presses through the entire rail and
   readout. The menu also never closed when focus left the button, and
   ArrowDown did nothing. */
function makeDropdown(getOptions, getValue, onPick, cls = '') {
  const btn = el('button', 'dd ' + cls);
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  /* An option may carry a swatch, and the button then wears the current
     one. That is what lets the paint control BE the color it sets rather
     than a word for it, which is the only way it fits the faceplate without
     spending 90 px on the name of a color the user can see. */
  const refresh = () => {
    const v = getValue();
    const o = getOptions().find((x) => x.value === v);
    const sw = o && o.swatch ? `<em class="sw" style="--sw:${o.swatch}"></em>` : '';
    btn.innerHTML = `${sw}<span>${o ? o.label : 'Custom'}</span><i>▾</i>`;
    if (o && o.swatch) btn.title = o.label;
  };
  btn.onclick = () => {
    if (btn.classList.contains('open')) { closeMenu(); return; }
    closeMenu();
    const menu = el('div', 'dd-menu');
    let lastGroup;
    for (const o of getOptions()) {
      if (o.group && o.group !== lastGroup) {
        menu.append(el('div', 'dd-group', o.group));
        lastGroup = o.group;
      }
      const it = el('button', 'dd-item' + (o.value === getValue() ? ' on' : ''));
      it.setAttribute('role', 'option');
      it.setAttribute('aria-selected', o.value === getValue() ? 'true' : 'false');
      if (o.swatch) {
        it.classList.add('has-sw');
        const s = el('em', 'sw');
        s.style.setProperty('--sw', o.swatch);
        it.append(s);
      }
      it.append(el('b', null, o.label));
      if (o.note) it.append(el('span', null, o.note));
      it.onclick = () => { closeMenu(true); onPick(o.value); };
      menu.append(it);
    }
    menu.setAttribute('role', 'listbox');
    /* Arrow keys walk the options and Tab stays inside the open menu, which
       is the only way a keyboard can reach an element the DOM puts at the
       end of the body. */
    menu.addEventListener('keydown', (e) => {
      const list = [...menu.querySelectorAll('.dd-item')];
      if (!list.length) return;
      const i = list.indexOf(document.activeElement);
      const go = (d) => {
        e.preventDefault();
        list[(i < 0 ? (d > 0 ? 0 : list.length - 1) : (i + d + list.length) % list.length)].focus();
      };
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) go(1);
      else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) go(-1);
      else if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
    });
    mountMenu(btn, menu, true);
    /* land on the current choice, so the menu opens showing where you are */
    (menu.querySelector('.dd-item.on') || menu.querySelector('.dd-item'))?.focus();
  };
  /* ArrowDown opens the menu from the button, the way a select does */
  btn.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !btn.classList.contains('open')) {
      e.preventDefault();
      btn.click();
    }
  });
  btn.refresh = refresh;
  refresh();
  return btn;
}

/* ── Hover tag ── */

/* The tag used to be placed at the projected CENTER of the part's bounding
   box. Measured over every hoverable pixel of a frame, that put the name an
   average of 106 px from the pointer at the home view and 270 px away once
   the camera is in close on a part, worst case 792 px, more than half the
   window: a part like the tires or a cable run has its centroid nowhere
   near the piece of it you are touching, and the label could sit over a
   DIFFERENT part that was not highlighted. The name of the thing under the
   pointer belongs at the pointer. labelFor stays as the fallback for the
   case where there is no pointer to speak of. */
const tag = $('#hoverTag');
const gl = $('#gl');
let ptrX = 0, ptrY = 0, hasPtr = false;
gl.addEventListener('pointermove', (e) => { ptrX = e.clientX; ptrY = e.clientY; hasPtr = true; });
gl.addEventListener('pointerleave', () => { hasPtr = false; });

/* This loop runs on every animation frame, so nothing in it may read layout.
   Two things in it did. offsetWidth and offsetHeight are layout reads, and
   left and top are layout WRITES, so the pair ran as write, read, write,
   read for as long as the pointer sat on the car, and viewer.js's resize()
   reads canvas.clientWidth at the top of the very next frame, which the
   write had just invalidated. Timed at Gen 9 over 300 iterations of the real
   body plus that clientWidth read: 84.7 us a frame as written, 83.7 with the
   size cached but still positioned by left and top, and 28.0 with the size
   cached and the position written as a transform. A transform is composited
   and dirties no layout, so the last of the three is the only version that
   takes the reflow out of the loop rather than moving it.
   The tag's own size only changes when its text does, which is once per part
   and not once per frame, so it is measured where the text is written. */
let tagKey = null, tagW = 0, tagH = 0;
function tagLoop() {
  requestAnimationFrame(tagLoop);
  /* dimensions ride this loop rather than starting a second one: they need
     exactly what it needs, a projection against the camera as it is now */
  drawDims();
  const h = viewer.hovered();
  if (h && byKey[h]) {
    const pos = hasPtr ? { x: ptrX, y: ptrY } : viewer.labelFor(h);
    if (pos) {
      if (h !== tagKey) {
        tagKey = h;
        const def = SYSTEM_DEFS.find((d) => d.id === byKey[h].sys);
        /* names the system, as the rail does; the variant is in the panel */
        tag.innerHTML = `<small>${slotName(def)}</small>${byKey[h].meta.name}`;
        /* the same color the part under the pointer is glowing in, so the
           label and the highlight are read as one thing. Set with the text
           and not per frame: it only changes when the part does. */
        tag.style.setProperty('--sys', hexOf(def));
        tagW = tag.offsetWidth;
        tagH = tag.offsetHeight;
      }
      /* the tag draws up and left of this point, so keep it off the topbar
         and inside the window rather than half of it sitting outside */
      const x = Math.max(tagW / 2 + 8, Math.min(innerWidth - tagW / 2 - 8, pos.x));
      const y = Math.max(56 + tagH * 1.9, pos.y);
      /* the -50% and -190% that css/style.css sets are restated here because
         an inline transform replaces the rule rather than adding to it */
      tag.style.transform = `translate(-50%, -190%) translate(${x}px, ${y}px)`;
      tag.classList.add('on');
      return;
    }
  }
  tagKey = null;
  tag.classList.remove('on');
}
/* Built here and not where it is declared: refreshLadder formats in the
   reader's chosen unit, and asDist, rounded and U are consts further down
   this file. Everything above guards on ladBars being empty for exactly the
   window between those two points. */
buildLadder();

tagLoop();

/* ── The energy clock ───────────────────────────────────────────────────
   Its own loop rather than a hook inside tagLoop, because the two answer to
   different things: the tag follows the pointer and this follows time. dt is
   clamped the way viewer.js clamps its own, so a tab that was in the
   background for a minute does not come back and empty the pack in one step.

   stepEnergy is on window.__ev for the same reason applyGeneration and
   search are: rAF does not fire at all in a background tab and this
   environment reports the page as hidden at every instant, so the only
   honest way to test the simulation is to call it. */
let ergLast = performance.now();
function ergLoop(now) {
  requestAnimationFrame(ergLoop);
  const dt = Math.min(0.05, (now - ergLast) / 1000);
  ergLast = now;
  stepEnergy(dt);
}
requestAnimationFrame(ergLoop);
Object.assign(window.__ev, {
  stepEnergy,
  energy: () => energy,
  /* The closures on the hook for the same reason the tour is: a verification
     pass has to open a panel, step the clock and read back what the sweep
     measured, and doing that through the band is a click on a control that an
     automation pane cannot always see. `closures()` with no argument reports;
     with a key it toggles and returns the same report. */
  closures: (key, open) => {
    if (!openOn) setOpenOn(true);
    if (key != null) { viewer.setClosure(key, open == null ? true : !!open); drawOpen(); }
    return viewer.closureList().map((c) => {
      const m = viewer.closureMetrics(c.key);
      return {
        key: c.key, name: c.spec.name, kind: c.spec.kind, open: c.open, at: c.at,
        lateral: m ? +(m.lateral * 1000).toFixed(1) : null,
        overhead: m ? +(m.overhead * 1000).toFixed(1) : null,
        stallDeg: m && m.bayFrac !== null ? +travelDegAt(c.spec, m.bayFrac).toFixed(1) : null,
        read: closureRead(c.key),
      };
    });
  },
  soc: (v) => { if (v != null) { soc = Math.max(0, Math.min(1, v)); drawEnergy(); } return soc; },
  /* The tour on the hook for the same reason applyGeneration is: a
     verification pass walks all thirteen stops and screenshots them, and
     doing that through the UI is thirteen clicks that a script cannot make
     land on a moving camera. tourAt is read back so a check can assert where
     it ended up rather than trusting that the click worked. */
  tour: (i) => { if (i == null) setTour(!tourOn); else setTour(true, i); return { on: tourOn, at: tourAt, stops: STOPS.length }; },
  /* Dimensions are drawn from main.js's animation loop, and an automation
     pane does not run one: rAF never fires there, so a check that turns them
     on sees seven empty nodes and a screenshot of nothing. This redraws on
     demand and reports what it measured, which is also the honest way to
     assert the figures rather than reading them off an image. */
  /* select AND open, which is what a click does. viewer.select on its own
     only moves the 3D selection: the panel is opened by the viewer's own
     click callback, so a script that used select() got a framed part and an
     empty panel, and every check of panel behavior had to be done by hand. */
  /* Guarded, because this is a HOOK and its callers are scripts rather than
     the interface. `!!byKey[key]` was the only check and it ran last, after
     both calls had already been made with whatever arrived: a number or an
     object threw inside viewer.select on key.split, and '__proto__' or
     'constructor' sailed past every truthiness test in the chain, because
     byKey['__proto__'] is Object.prototype, and ended up ghosting the whole
     car to 7 percent behind a panel built from the prototype. hasOwn is the
     test that distinguishes a part from an inherited property. */
  openPart: (key) => {
    if (typeof key !== 'string' || !Object.hasOwn(byKey, key)) return false;
    viewer.select(key);
    openPanel(key);
    return true;
  },
  dims: (on) => {
    if (on != null) setDims(!!on);
    refreshDims();
    return { on: dimsOn, of: dimSelKey || 'vehicle',
             set: dimSet.map((d) => [d.name, +d.v.toFixed(4)]) };
  },
  tourState: () => ({ on: tourOn, at: tourAt, playing: tourPlay, stop: STOPS[tourAt] }),
});

/* ── Boot ──────────────────────────────────────────────────────────────
   Lift the boot plate only once a frame with the car in it has actually
   been presented. viewer.js registered its own rAF inside createViewer, so
   it is ahead of this one in the queue and has rendered by the time the
   second callback runs. */
let lifted = false;
/* ── THE FACEPLATE MEASURES ITSELF ─────────────────────────────────────
   Everything anchored under the bar is positioned off --barh in
   css/style.css, and this is what writes it.

   It used to be arithmetic in the stylesheet: a bar fixed at 96 px below
   580, and a literal 108 in the rail, the panel, both latches and the
   section strip. That is correct only for as long as the controls wrap into
   the number of rows somebody counted by hand, and this app has now broken
   that twice: once when the paint control made row two overflow into a third
   row inside a fixed 96 px box, and once when Cut, Size and the tour took
   row one to 399 px against a 375 px phone with compare mode open.

   A ResizeObserver instead of a resize listener, because the bar's height
   changes without the window's doing so: opening compare adds a dropdown to
   the row, and a wrap is a layout event rather than a viewport one. */
const setBarH = (h) => docEl.style.setProperty('--barh', Math.round(h) + 'px');
/* A ResizeObserver delivers at the end of a frame, which is right for a
   window resize and one frame late for a control that rewraps the bar under
   a click. setCompare calls this directly for that reason: the second rung
   dropdown is what takes row one past a phone's width, and the rail must not
   spend a frame overlapping the row it just pushed out. Declared as a
   function rather than a const because setCompare is above it. */
/* clientHeight and not getBoundingClientRect: it excludes the bar's 1 px
   bottom hairline, which keeps --barh at exactly the 48 and 96 the old
   hand-written rules used, so this refactor moves nothing on screen today
   and only changes what happens when the bar wraps to a row nobody
   predicted. The observer reads contentRect for the same reason. */
function syncBarH() { setBarH($('#topbar').clientHeight); }
{
  const bar = $('#topbar');
  syncBarH();
  new ResizeObserver((es) => {
    for (const e of es) setBarH(e.contentRect.height);
  }).observe(bar);
}

/* ── And --effh, for exactly the reason --barh exists ───────────────────
   Below 520 px the rail and the readout share one column, so the rail's
   height is a function of the readout's. That used to be the literal 435
   in css/style.css: the card measured 399 plus three 12 px gaps. It went
   stale the same day it was written. 41a9594 derived it from a 399 px
   card at 16:47 and d967c63 put the eleven-bar ladder strip INSIDE that
   card at 17:07, taking it to 554, so the rail was allowed to be 155 px
   taller than the space that exists and lay on top of the readout at every
   width from 280 to 520. It was not merely covering it either: the rail is
   z-index 9 against the card's 8, so elementFromPoint at the card's top
   left returned a rail row and the waterfall was taking the taps, which is
   the same defect the mobile pass recorded at style.css:2185 and fixed
   once already.

   A measured property instead of a counted one, so the next thing added to
   the readout cannot reintroduce this. Same shape as --barh above and the
   same reasoning as the note there: correct only for as long as somebody
   recounts by hand is not correct.

   No feedback loop: --effh feeds the RAIL's max-height and nothing the
   readout's own height depends on. The readout is capped in the stylesheet
   against --barh and a constant, never against --effh. */
/* and --cuth, the section strip, for the same reason again: it wraps to one
   row or two according to width, so its height is a measurement rather than a
   number. The readout is anchored under the bar and so is the strip, so on a
   short window between 521 and 640 px the strip landed on the top of the
   card, over the stats and the budget heading. */
/* Called from buildCut rather than set up here, because the strip is built
   lazily on the first section and does not exist at this point. css/style.css
   carries a 0px default for the same reason: an unset custom property makes
   the whole calc() that reads it invalid, which silently drops the rule. */
function syncCutH() {
  const c = document.getElementById('cut');
  if (c) docEl.style.setProperty('--cuth', Math.round(c.getBoundingClientRect().height) + 'px');
}
/* the same for the closures band, which wraps to two rows on a phone for the
   same reason the section strip does, and which the readout card has to start
   below rather than under */
function syncOpenH() {
  const c = document.getElementById('open');
  if (c) docEl.style.setProperty('--openh', Math.round(c.getBoundingClientRect().height) + 'px');
}

const setEffH = (h) => docEl.style.setProperty('--effh', Math.round(h) + 'px');
{
  const eff = $('#eff');
  setEffH(eff.getBoundingClientRect().height);
  /* getBoundingClientRect, not clientHeight: the readout carries a 1 px
     border and the gap that has to clear is the border box, not the
     content box. A hidden readout reports 0 and the rail correctly takes
     the whole column, which is what body.eff-hidden and #panel.on already
     want. */
  new ResizeObserver(() => setEffH(eff.getBoundingClientRect().height)).observe(eff);
}

/* ── The hint line goes away for good when it is dismissed ─────────────
   It is instruction, not instrument: once a reader knows that dragging
   orbits, it is a line of type across the bottom of the car forever. The
   choice is remembered, and index.html reads the same key in its inline
   boot script so a dismissed hint never flashes on the next load. */
/* THE INVITATION GOES AWAY WHEN IT IS TAKEN, which is the difference between a
   note and a nag. Swapping any slot is proof the reader has found the feature,
   so the line retires itself on the first swap and never comes back; the x is
   there for somebody who reads it and is not interested. Same key shape and
   same guarded read as ev-hint-hidden. */
function learnedMix() {
  if (document.body.classList.contains('mix-learned')) return;
  document.body.classList.add('mix-learned');
  try { localStorage.setItem('ev-mix-learned', '1'); } catch {}
}
$('#mixHintX').onclick = learnedMix;

$('#hintX').onclick = () => {
  document.body.classList.add('no-hint');
  try { localStorage.setItem('ev-hint-hidden', '1'); } catch {}
};

/* THE TOUR OPENS ITSELF FOR A FIRST VISITOR. Davis, 2026-08-23: the tour is
   the model's argument, and a reader who has never been here should not have
   to find a button to hear it. So the first visit opens the tour at its first
   stop, a second after the boot plate lifts and the car has landed, with
   autoplay off: the reader drives it, or closes it. The visit is remembered
   (ev-tour-seen) the moment the tour opens, so a reload does not reopen it
   and the TOUR button is the way back; the same guarded read every other
   remembered choice here uses. A returning reader with the key set sees the
   car, as before. */
const firstVisitTour = () => {
  let seen = true;
  try { seen = !!localStorage.getItem('ev-tour-seen'); } catch {}
  if (seen) return;
  setTimeout(() => {
    /* written here, when the tour opens, and not a second earlier at the
       boot: a reader who leaves inside that second has not seen it, and
       keeps the one opening they are owed. Written whether or not the tour
       is already on, because a reader who pressed TOUR themselves in that
       second has seen it too. */
    try { localStorage.setItem('ev-tour-seen', '1'); } catch {}
    if (!tourOn) setTour(true, 0);
  }, 1000);
};
const liftBoot = () => {
  if (lifted) return;
  lifted = true;
  document.body.classList.add('booted');
  setTimeout(() => $('#boot')?.remove(), 400);
  firstVisitTour();
};
requestAnimationFrame(() => requestAnimationFrame(liftBoot));
/* rAF does not run at all in a background tab, and a plate that outlives
   the thing it was covering is worse than the zeros it replaced */
setTimeout(liftBoot, 1200);
