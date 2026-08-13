/* EV·01 runtime: assembles the vehicle, wires the UI. */

import { assemble, buildVariant, SYSTEM_DEFS, VARIANTS, GENERATIONS } from './registry.js';
import { createViewer } from './viewer.js';
import { computeBudget, LOSS_NOTES } from './efficiency.js';
import { compare, slotBaseName } from './compare.js';
import { energyFor } from './energy.js';

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

const viewer = createViewer($('#gl'), (key) => (key ? openPanel(key) : closePanel()));
viewer.addVehicle(root, Object.fromEntries(
  Object.entries(systems).map(([id, rec]) => [id, { group: rec.group, dir: rec.def.explode }])
));

/* ── The palette, which was already here and was doing almost nothing ──
   Every module declares SYSTEM.color and the tree holds nine slot hues.
   Three lines in this file read them, all three to draw a thin bar beside a
   name. Handing the map to the viewer is what lets a selected part glow in
   ITS system's colour instead of one global amber, and hexOf below is the
   same value on the CSS side, so the bar in the rail, the tab on the panel,
   the name under the pointer and the light on the car are one colour and
   not four coincidences.
   Keyed by system id and sent once, so a variant built lazily on a switch
   an hour from now is already keyed: the map does not care whether the
   geometry exists yet. */
viewer.setSystemColors(Object.fromEntries(SYSTEM_DEFS.map((d) => [d.id, d.color])));
const hexOf = (def) => '#' + def.color.toString(16).padStart(6, '0');

/* THE ACCENT FOLLOWS WHAT YOU ARE LOOKING AT. --sel falls back to the amber
   in css/style.css, so with nothing selected the interface is exactly as
   monochrome as it was; the colour arrives when a system does and leaves
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

const VARIANT_CHOICE = Object.fromEntries(VARIANTS.map((v) => [v.slot, v.options[0].sys]));

/* the numbered ladder, excluding any side studies; buildRail reads this */
const LADDER = GENERATIONS.filter((g) => g.id !== 'value');

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

const activeDefs = () => {
  const hide = inactiveSys();
  return SYSTEM_DEFS.filter((d) => !hide.has(d.id));
};

/* Applying a generation changes up to nine slots at once. Rebuilding the
   rail and the readout once per slot meant nine full teardowns of #railList
   for one user action: measured at 9 wipes and 243 appended nodes where 27
   are wanted, and it also made the number tweens start from the eighth
   intermediate configuration instead of the rung the user came from, so a
   Gen 1 to Gen 9 step animated 23 miles of a 1,258 mile change. Coalescing
   is not an optimisation here, it is what makes the animation true. */
let batching = 0, railDirty = false, statsDirty = false;
function flushUI() {
  if (railDirty) { railDirty = false; renderRail(); }
  if (statsDirty) { statsDirty = false; refreshStats(); }
  /* The generation control has to follow a single-slot change too. It did
     not: only applyGeneration refreshed it, so putting Gen 9 wheels on a
     Gen 5 car left the faceplate reading "Gen 5" with both stepper arrows
     enabled, and pressing the forward arrow then jumped the whole car to
     Gen 1 because LADDER.findIndex returned -1 and LADDER[-1 + 1] is Gen 1.
     Measured: 2,908 lb to 3,684 lb on one click of a button labelled next. */
  refreshGenCtl();
}
function batch(fn) {
  batching++;
  try { fn(); } finally { batching--; }
  flushUI();
}

function setVariant(slot, sysId) {
  if (VARIANT_CHOICE[slot] === sysId) return;
  const old = VARIANT_CHOICE[slot];
  VARIANT_CHOICE[slot] = sysId;
  viewer.setSystemVisible(old, false);
  /* variants build lazily on first switch */
  if (!viewer.hasSystem(sysId)) {
    const built = buildVariant(sysId);
    if (built) viewer.addSystem(built.def.id, built.group, built.def.explode);
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
  for (const [label, v] of budget.rows) {
    const r = effRows.get(label);
    r.fill.style.width = ((v / max) * 100).toFixed(1) + '%';
    tweenNum(r.num, v * U().per, (x) => x.toFixed(0));
    r.row.onclick = () => openLossPanel(label, v);
  }
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
     read forwards. That guard is NOT touched: it asserts Wh/mi falls rung
     over rung and it is correct. This is presentation. */
  const whPer = budget.total * U().per;
  tweenNum($('#effRate'), 1000 / whPer, (v) => v.toFixed(2));
  $('#effRateU').textContent = U().d + '/kWh';
  tweenNum($('#effTotal'), whPer, (v) => v.toFixed(1) + ' Wh/' + U().d);
  tweenNum($('#effRange'), budget.rangeKm * U().dist, (v) => Math.round(v).toLocaleString());
  $('#effRangeU').textContent = U().d;
  $('#effKwh').textContent = budget.kwh;
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
   fill a pack that lasts 44.7 hours. Normalising the two rates would have
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
  const mode = driveOn ? 'driving' : full ? 'holding' : energy.chargeKw ? 'charging' : 'parked';
  $('#ergMode').textContent = mode;
  $('#ergMode').dataset.mode = mode;
  $('#ergFill').style.width = (soc * 100).toFixed(2) + '%';
  document.body.classList.toggle('driving', driveOn);

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
function openLossPanel(label, whKm) {
  const note = LOSS_NOTES[label];
  if (!note) return;
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
         results, it is labelled, and choosing it swaps that slot */
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
    /* the colour goes on the ROW, not on the bead, so the open state can
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
      row.append(makeDropdown(
        opts, selected,
        (genId) => {
          const g = LADDER.find((x) => x.id === genId);
          if (!g) return;
          const sys = g.choices[slot];
          /* one module, so usually a few ms, but body-9 alone is worth a
             visible frame; show the same busy state a cold rung gets */
          if (viewer.hasSystem(sys)) setVariant(slot, sys);
          else withBusy(() => setVariant(slot, sys));
        },
        'dd-slot'
      ));
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
   switches away must still be honoured when they come back.

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

let genDD = null, genPrev = null, genNext = null, cmpBtn = null, cmpDD = null;
/* Declared HERE and not down with the rest of compare mode, because
   refreshGenCtl runs during the generation control's own setup and reads
   both of them, and the compare block sits below that. `let` is not hoisted
   the way `function` is, so leaving these where they read best threw
   "Cannot access cmpAgainst before initialization" at module scope, which
   means no rail, no controls and a blank readout behind a car that renders
   fine. Same failure shape the unit-key guard above exists to prevent. */
let cmpOn = false;
let cmpAgainst = null;
function refreshGenCtl() {
  genDD?.refresh();
  cmpDD?.refresh();
  const cur = currentGenId();
  const i = LADDER.findIndex((g) => g.id === cur);
  if (genPrev) genPrev.disabled = i <= 0;
  if (genNext) genNext.disabled = i < 0 || i >= LADDER.length - 1;
  /* A custom mix is not a rung, so there is nothing on the ladder to compare
     it with. The stepper already disables itself for exactly this reason and
     this follows it rather than inventing a second answer: comparing a mix
     would mean naming it, and it has no name. */
  if (cmpBtn) {
    cmpBtn.disabled = i < 0;
    if (i < 0 && cmpOn) setCompare(false);
  }
  if (cmpOn) refreshCompare();
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

  wrap.append(genPrev, genDD, genNext, cmpBtn, cmpDD);
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
function refreshCompare() {
  applyCompareGhost();
  if (cmpOn && panelIsCompare) openComparePanel();
}

/* ── Paint ─────────────────────────────────────────────────────────────
   Eleven generations and every one of them has been the same dark teal,
   because common.js has exactly one body colour, M.paint at 0x2a5666, and
   every body module reaches for it.

   The colour cannot be changed where it is defined: js/common.js is off
   limits to app work, and editing M.paint would repaint the charge-port
   flap, the reference car and the value study all at once with no way back.
   So the respray happens in the viewer, on the per-part material clones it
   already makes, selected by base colour. See viewer.js setPaint.

   These are finishes, not decoration: the shell material runs metalness
   0.88 under a full clearcoat, so a saturated colour tints its own
   reflections and the studio softboxes rake across it. Nine of them,
   ordered neutral, cool, warm, with the teal kept in the middle of the list
   and named for what it is, because eleven rungs of renders and every
   screenshot in design/ were taken in it. */
const PAINTS = [
  /* NEUTRAL */
  { id: 'graphite', label: 'Graphite',         hex: 0x1a1e23, group: 'Neutral' },
  { id: 'gunmetal', label: 'Gunmetal',         hex: 0x3f454c, group: 'Neutral' },
  /* SOLID, not metallic. See the note on paintMetal in js/viewer.js: at
     M.paint's 0.88 a light colour is a mirror in a dark room and reads dark.
     These three are the finishes that are solids in the real world, so they
     say so and everything else keeps common.js's own value untouched. */
  { id: 'nardo',    label: 'Nardo grey',       hex: 0x8d9196, group: 'Neutral', metal: 0.25 },
  { id: 'silver',   label: 'Silver',           hex: 0xb4bcc3, group: 'Neutral' },
  { id: 'alpine',   label: 'Alpine white',     hex: 0xdde1e4, group: 'Neutral', metal: 0.25 },
  { id: 'slate',    label: 'Slate',            hex: 0x596270, group: 'Neutral' },
  /* COOL */
  { id: 'teal',     label: 'Reference teal',   hex: 0x2a5666, group: 'Cool',
    note: 'the finish every rung has worn since Gen 1' },
  { id: 'petrol',   label: 'Petrol',           hex: 0x123f4a, group: 'Cool' },
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
/* THE CAR ARRIVES IN A FINISH, not in a base colour. Alpine white under a
   brass pearl at 80 percent: white reads as white face-on and goes warm gold
   down the flanks and around every crease, which is the whole argument for
   modelling paint as two coats rather than one, made by the car before
   anybody opens the control. Davis's pick. */
const PAINT_DEFAULT = 'alpine';
const PEARL_DEFAULT = 'brass';
const PEARL_AMT_DEFAULT = 0.8;
const paintById = (id) => PAINTS.find((p) => p.id === id) || null;
/* per-part overrides are stored as a colour rather than an id, so the finish
   type is recovered from the colour; every paint in the table is distinct */
const paintByHex = (hex) => PAINTS.find((p) => p.hex === hex) || null;

/* ── SOLID OR METALLIC, on any colour ───────────────────────────────────
   The palette declares which finish each colour normally is, because a solid
   white and a metallic silver are different products. But that is a default
   and not a law: a colour can be ordered either way in the real world, and
   asking the model for a metallic white or a solid cobalt is a reasonable
   thing to want. So the declared type is the starting point and this is an
   explicit override that sticks across colour changes.

   `metallic` resolves to null rather than to 0.88, so it means "whatever
   common.js gave this material" and cannot drift from it. */
const SOLID_METAL = 0.25;
/* METALLIC BY DEFAULT, which is Davis's call and is also the finish every
   render in design/ was taken in. `auto` would follow each colour's declared
   type and put the shipped Alpine white default on 0.25, which reads white;
   metallic keeps whatever common.js gave the material and gives the bronze
   that white under a brass pearl actually makes on an 0.88 surface. The
   toggle reaches the other one in a click. */
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
   means a colour put on body-11's shoulder does not follow you to Gen 9,
   because that is a different part. Stored, like the body colour, because a
   finish you chose is a preference and not a session. */
let partPaints = {};
try { partPaints = JSON.parse(localStorage.getItem('ev-paint-parts') || '{}'); } catch {}
/* the same reason the unit restore is guarded: a stored value that is not a
   colour reaches setHex and the car comes back black with no way out */
if (!partPaints || typeof partPaints !== 'object' || Array.isArray(partPaints)) partPaints = {};
for (const [k, v] of Object.entries(partPaints)) {
  if (typeof v !== 'number' || !(v >= 0 && v <= 0xffffff)) delete partPaints[k];
}
const savePartPaints = () => {
  try { localStorage.setItem('ev-paint-parts', JSON.stringify(partPaints)); } catch {}
};

const swatchOf = (hex) => '#' + hex.toString(16).padStart(6, '0');

/* The second coat, restored the same guarded way as the first, with one more
   state than the first needs.

   SOLID IS STORED AS "none" AND NOT AS A MISSING KEY. The default pearl is a
   real colour now, so "no key" and "the user chose solid" stopped meaning the
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
    (n === 0 ? '' : n === 1 ? ' · 1 panel in its own colour'
                            : ` · ${n} panels in their own colours`);
}

function setPaint(id) {
  const p = paintById(id) || PAINTS[0];
  paintId = p.id;
  viewer.setPaint(p.hex, metalOf(p));
  refreshPaintBtn();
  try { localStorage.setItem('ev-paint', p.id); } catch {}
}

function setPearl(id, amt) {
  pearlId = id;
  if (amt != null) pearlAmt = amt;
  const p = pearlId ? paintById(pearlId) : null;
  viewer.setPearl(p ? p.hex : null, pearlAmt);
  refreshPaintBtn();
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

  /* base coat, grouped the way the palette is organised */
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

  /* solid or metallic, on whatever colour is chosen */
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
    'A second colour in the mid coat. It tints the panel face-on and takes ' +
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

  /* ── PANELS IN THEIR OWN COLOUR ─────────────────────────────────────
     A gap in the first version of this: painting a panel is easy, the
     override persists across sessions, and there was NO way to see which
     panels carried one or to put them back. The faceplate button counted
     them in a tooltip, which is not a list and not a control. So "why is
     the door pink" had no answer inside the app at all.
     Shown only when there is something to show, and it names the parts
     rather than the count, because the count was never the question. */
  const keys = Object.keys(partPaints);
  if (keys.length) {
    menu.append(el('div', 'fin-h', 'Panels in their own colour'));
    const list = el('div', 'fin-over');
    for (const k of keys) {
      const def = DEFS[k.split('/')[0]];
      const meta = def && def.parts[k.split('/')[1]];
      const pt = paintByHex(partPaints[k]);
      const row = el('button', 'fin-orow');
      row.style.setProperty('--sw', swatchOf(partPaints[k]));
      row.innerHTML = `<em class="sw"></em><b>${esc(meta ? meta.name : k)}</b>` +
                      `<span>${esc(pt ? pt.label : 'custom')}</span><u>clear</u>`;
      row.title = 'Put ' + (meta ? meta.name : k) + ' back on the body colour';
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
    const all = el('button', 'fin-reset', 'Put every panel back on the body colour');
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

  setPaint(paintId);
  setPearl(pearlId, pearlAmt);
  /* restore the overrides AFTER the coats, so a panel that carries one is not
     briefly repainted to the body colour and back. setPartPaint records the
     override whether or not that system is built yet, and indexSystem reads
     it back when a variant builds, so a stored colour survives a generation
     the session has never visited. */
  for (const [k, v] of Object.entries(partPaints)) viewer.setPartPaint(k, v, metalOf(paintByHex(v)));
  refreshPaintBtn();
}

/* ── Finish, offered on the parts that actually wear paint ───────────────
   Not on the faceplate. The faceplate control is the CAR's colour and there
   is no room on it for a second scope, and more to the point the question
   "what colour is this panel" belongs where the panel is already open. A
   part that is not sprayed in body colour is never offered a swatch row it
   could not honour: viewer.isPainted answers off the material set, so glass,
   carbon, alu, cast and rubber say no on their own without a list here. */
function finishRow(key) {
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
  add('Match the body', null);
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
  const p = $('#panelIn');
  p.innerHTML = '';

  /* Navigation row: the system pill goes back up a level, and the stepper
     walks the system's parts in place, so browsing a system does not mean
     closing the panel and re-selecting it for every part. */
  const nav = el('div', 'p-nav');
  /* the system colour keys the 3D model, so it stays, but as a 3 px index
     tab rather than a whole line of coloured type */
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
  if (ids.length > 1 && idx >= 0) {
    const go = (d) => {
      const k = def.id + '/' + ids[idx + d];
      viewer.select(k);
      openPanel(k);
    };
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
  p.append(chips);

  if (viewer.isPainted(key)) { p.append(el('h5', null, 'Finish'), finishRow(key)); }
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
    /* the link carries its TARGET's colour, so where it goes is readable
       before it is clicked, and it stays neutral until hovered so a dense
       paragraph does not turn into nine colours of underline */
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
    `Wh/${U().d}, both rungs on one scale. These five ARE the total: they sum ` +
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
      `Each slot figure above is the ${c.a.label} car with ONLY that slot changed. ` +
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

  $('#panel').classList.add('on');
}

/* System overview: blurb plus its clickable part list. */
function openSystemPanel(def) {
  const color = hexOf(def);
  setSel(def);
  panelIsCompare = false;
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
     read backwards, and it is the more surprising direction: hv-4 is named
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

  $('#panel').classList.add('on');
  for (const b of Object.values(itemBtns)) b.classList.remove('on');
}

function closePanel() {
  $('#panel').classList.remove('on');
  setSel(null);
  panelIsCompare = false;
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
  viewer.setAutoRotate(on);
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
try { if (localStorage.getItem('ev-rail-hidden') === '1') setRailHidden(true); } catch {}

/* collapsible efficiency card, sticky across visits. Same pattern as the
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
try { if (localStorage.getItem('ev-eff-hidden') === '1') setEffHidden(true); } catch {}

/* the slider's track fills to the thumb, so the control reads its own value
   at a glance the way a gauge does */
const expSlider = $('.slider');
function setExplodeVal(v) {
  expSlider.style.setProperty('--v', v + '%');
  $('#expVal').textContent = v + '%';
}
$('#exp').oninput = (e) => {
  viewer.setExplode(+e.target.value / 100);
  setExplodeVal(e.target.value);
};
setExplodeVal($('#exp').value);
$('#btnXray').onclick = (e) => viewer.setXray(e.currentTarget.classList.toggle('on'));
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
  if ($('#panel').classList.contains('on')) {
    /* the reading state is one layer, and compare mode is part of it: see
       the note on #panelClose */
    if (cmpOn) setCompare(false);
    closePanel();
    viewer.select(null);
    return;
  }
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
     one. That is what lets the paint control BE the colour it sets rather
     than a word for it, which is the only way it fits the faceplate without
     spending 90 px on the name of a colour the user can see. */
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

/* The tag used to be placed at the projected CENTRE of the part's bounding
   box. Measured over every hoverable pixel of a frame, that put the name an
   average of 106 px from the pointer at the home view and 270 px away once
   the camera is in close on a part, worst case 792 px, more than half the
   window: a part like the tyres or a cable run has its centroid nowhere
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
  const h = viewer.hovered();
  if (h && byKey[h]) {
    const pos = hasPtr ? { x: ptrX, y: ptrY } : viewer.labelFor(h);
    if (pos) {
      if (h !== tagKey) {
        tagKey = h;
        const def = SYSTEM_DEFS.find((d) => d.id === byKey[h].sys);
        /* names the system, as the rail does; the variant is in the panel */
        tag.innerHTML = `<small>${slotName(def)}</small>${byKey[h].meta.name}`;
        /* the same colour the part under the pointer is glowing in, so the
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
  soc: (v) => { if (v != null) { soc = Math.max(0, Math.min(1, v)); drawEnergy(); } return soc; },
});

/* ── Boot ──────────────────────────────────────────────────────────────
   Lift the boot plate only once a frame with the car in it has actually
   been presented. viewer.js registered its own rAF inside createViewer, so
   it is ahead of this one in the queue and has rendered by the time the
   second callback runs. */
let lifted = false;
const liftBoot = () => {
  if (lifted) return;
  lifted = true;
  document.body.classList.add('booted');
  setTimeout(() => $('#boot')?.remove(), 400);
};
requestAnimationFrame(() => requestAnimationFrame(liftBoot));
/* rAF does not run at all in a background tab, and a plate that outlives
   the thing it was covering is worse than the zeros it replaced */
setTimeout(liftBoot, 1200);
