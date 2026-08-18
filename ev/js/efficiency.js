/* Live efficiency budget: computes a Wh/km breakdown and range estimate
   from the ACTIVE configuration, so switching variants shows what each
   choice actually buys. The cycle is a simplified mixed model (steady
   aero at an effective 86 km/h, rolling at the 70 km/h mean, stop-go
   kinetic churn with partial regen, auxiliary draw, battery in/out
   losses). Labeled an estimate in the UI; its job is honest comparison
   between configurations, not homologation.

   Numbers are transcribed from the system modules' own spec content.
   When a variant does not change a quantity, it inherits its slot default. */

const AIR = 1.20;          // kg/m3
const G = 9.81;
const V_MEAN = 19.4;       // m/s, cycle mean speed (70 km/h)
/* Exported because js/energy.js turns Wh/km into kW and needs the speed the
   budget was computed at. One constant, one place: a second copy of "70" in
   the app would silently disagree the day this cycle is retuned. */
export const CYCLE_KMH = V_MEAN * 3.6;
const V_AERO = 24.0;       // m/s, aero-weighted effective speed (v^3 mean)
const ACCEL_PER_KM = 0.9;  // significant accelerations per km
const REGEN_RETURN = 0.65; // share of kinetic energy recovered on average
/* Pack round-trip overhead. This is a PER-PACK figure, not a constant:
   for a series string, loss = I^2 R with I = P/V and R = n * r_cell, and
   n rises in proportion to V, so loss scales with r_cell / V. Both terms
   improve up the ladder. Bus voltage climbs 355, 462, 508, 810 V, and
   series resistance falls as module walls (Gen 2), then the tray and its
   interconnects (Gen 3), then the busbars themselves (Gen 5 bipolar, where
   series current passes straight through shared electrode plates) are
   deleted. Values are relative to Gen 1 at 6%. */
const BATT_LOSS_DEFAULT = 1.060;

/* slot defaults (Gen 1) */
const BASE = {
  cd: 0.21,                      // body
  /* area is NOT a slot default any more. It is looked up per configuration
     from AREA below, because it is not a property of any single slot. This
     value is the last resort if a configuration carries no body at all, and
     it is Gen 1's measured figure so the fallback is not a fiction either. */
  area: 2.4045,
  crr: 0.0072,                   // wheels
  driveEff: 0.90,                // battery-to-wheel, mixed cycle
  auxW: 900,                     // thermal + LV + compute, real-world average
  kwh: 95,                       // usable pack energy
  battLoss: BATT_LOSS_DEFAULT,   // round-trip overhead, set by the pack
};

/* per-system overrides, keyed by system id.

   BODY ENTRIES CARRY Cd ONLY. Frontal area moved out of this table entirely
   in the re-zero: see AREA below and design/area-rezero.md. */
const METRICS = {
  'body': { cd: 0.21 },
  'body-aero': { cd: 0.17 },
  'body-3': { cd: 0.145 },
  /* body-7 uses the INDEPENDENT AUDIT's figure, not the module's own claim
     of Cd 0.105. The audit found the plan taper does not begin until x -1.83
     because the haunch is pinned by the 1.62 m rear track, cramming all
     400 mm of closure into the last 845 mm at 25 to 33 degrees, past the
     attached-flow limit. Separation is likely, so Cd 0.118. */
  'body-7': { cd: 0.118 },
  /* body-8 audited: Cd 0.108 not the module's 0.105, because the flank runs
     16.5 to 18.3 degrees in plan and the equivalent cone sits ON 15 rather
     than the 12 the earlier audit priced, and the truncated base grew. */
  'body-8': { cd: 0.108 },
  /* body-9 audited independently. The Cd claim of 0.107 is NOT confirmed:
     the 1.15 counts the module books for deleting the fairing blister are
     priced on a 0.083 m2 trailing cross-section that measures 0.0736, so the
     count is 1.02, and three debits go unbooked. The 0.3941 m2 base did not
     move, which costs +0.31 counts against a smaller reference area on the
     audit's own 0.030 base coefficient; wetted area is essentially unchanged
     while A fell, worth +0.7 to +1.0 counts of friction; and the camera pods
     now stand 51.8 mm proud of a flat flank where they sat 11.5 mm inside
     body-8's fairing shadow. Gen 9 buys area, not coefficient. */
  'body-9': { cd: 0.108 },
  'body-4': { cd: 0.140 },
  'body-6': { cd: 0.130 },
  /* body-5 is the demoted value study and js/registry.js does not register
     it. It has no row in AREA and was not re-zeroed. Re-registering it means
     measuring it first with tools/area.sh. */
  'body-5': { cd: 0.185 },
  /* battLoss: r_cell/V relative to Gen 1, so both the bus-voltage climb and
     the deletion of interconnect resistance show up in the waterfall */
  'battery':   { kwh: 95,  battLoss: 1.060 },  // 355 V, tabbed cells + busbars
  'battery-2': { kwh: 118, battLoss: 1.038 },  // 462 V, module walls deleted
  'battery-3': { kwh: 132, battLoss: 1.031 },  // 508 V, tray and interconnects deleted
  'battery-6': { kwh: 150, battLoss: 1.016 },  // 810 V bipolar, busbars deleted
  'battery-5': { kwh: 82,  battLoss: 1.055 },  // 360 V sodium, higher cell ASR
  'drivetrain': { driveEff: 0.90 },
  'drivetrain-2': { driveEff: 0.925 },
  'drivetrain-3': { driveEff: 0.93 },
  'drivetrain-6': { driveEff: 0.945 },
  'drivetrain-7': { driveEff: 0.958 },  // part-load optimized, peak power traded away
  /* drivetrain-9 is drivetrain-7 with the front halfshafts shortened to reach
     wheels-9's relocated hub face. Nothing electrical or geometric in the
     power path changed, so the efficiency is carried, not re-earned. */
  'drivetrain-9': { driveEff: 0.958 },
  'wheels': { crr: 0.0072 },
  'wheels-2': { crr: 0.0052 },
  'wheels-3': { crr: 0.0052 },   // 5.2 kg/t, per wheels-6's ancestor ledger
  'wheels-6': { crr: 0.0046 },   // 4.6 kg/t, low-loss construction + full covers
  'wheels-7': { crr: 0.0038 },   // 3.8 kg/t, narrow track + full covers
  /* wheels-9 carries wheels-7's construction, section, compound and covers
     unchanged. Narrowing the front track moves frontal area and roll
     stiffness, not rolling resistance, so the Crr does not move. */
  'wheels-9': { crr: 0.0038 },
  /* wheels-10 CARRIES 0.0038 UNCHANGED, and that is the module's finding
     rather than an omission. design/gen10.md asked it for 0.0034, worth 43
     miles and the entire margin over 1,800. It shipped CRR_BASIS instead and
     declined the count, because a rolling-resistance coefficient comes off a
     drum or a coastdown and there is neither here. Eight bodies once booked
     Cd counts on exactly that kind of reasoning until design/area-rezero.md
     had to freeze the whole coefficient and make them retrospective fiction.
     The geometry is real; the number is not available. */
  'wheels-10': { crr: 0.0038 },
  'battery-7': { kwh: 190, battLoss: 1.014 },  // 810 V bipolar, low C-rate
  /* battery-10 CARRIES battery-7's pack unchanged, and the entry is required
     even though the module books no improvement. The module's own note says
     it "books nothing on kwh", which is true about the DELTA and a trap about
     the ENTRY: METRICS is keyed by system id, so a pack with no row inherits
     BASE, which is Gen 1's 95 kWh and 1.060. Omitting this line put Gen 10 at
     822 miles against Gen 9's 1,674, caught by the monotonicity guard in
     tools/area.sh. Carrying is not the same as booking. */
  'battery-10': { kwh: 190, battLoss: 1.014 },
  'hv': { auxW: 900 },
  'hv-4': { auxW: 820 },
  'thermal-5': { auxW: 960 },    // simplified loop spends a little more on hot/cold days
  'autonomy-4': { auxW: 45 },    // additive triplex compute load
  /* auxDelta is order-independent: thermal sits before hv in the module
     list, so a plain auxW here would be overwritten by hv-4's entry. */
  'thermal-7': { auxDelta: -216 },  // ventilation recovery + occupant-local conditioning
  /* thermal-9 lands the car at 559 W of auxiliary. auxDelta stacks on the SLOT
     BASELINE, which is hv-4's 820 plus autonomy-4's additive 45, so reaching
     559 needs -306 and NOT the -90 the module's own ledger headline suggests.
     Writing -90 would yield 775 W and cost the generation about 55 miles.

     The module misses gen9.md's 350 W target and says so. The reason is
     structural and worth keeping: of the 649 W it was told to cut, 380 is
     autonomy-4's continuous compute and 134 is other low-voltage draw, so
     thermal owns 135 W, or 20.8% of the term. Zero the thermal system
     entirely and auxiliary is still 514 W. That is the same error as asking
     a tail generation to move frontal area, one slot over. The next real
     auxiliary generation is an autonomy generation. */
  'thermal-9': { auxDelta: -306 },
  /* autonomy-10 books -75, NOT the -195 design/gen10.md hoped for, and the
     gap is two separate honesty corrections rather than a shortfall.

     First, the ledger found 188 W of the 240 W target and says so: lane B to
     a reduced-rate checker 72 W, lane C to retention 88 W, foveated ingest
     28 W. Two further mechanisms were examined and book ZERO. Resident
     weights in on-die SRAM is a wash, because a 1 Gbit macro leaks 5 to 15 W
     at automotive junction temperature against the 12 W of DRAM interface it
     displaces, and a wash is booked at zero rather than rounded toward the
     target. Sharing one deserialization stage saves 10 W and is declined on
     a trust boundary, because a corrupted shared front end lies to all three
     lanes at once.

     Second, and larger, the BASELINE was wrong. autonomy-4's 380 W was only
     ever 45 W booked to this slot; the other 335 sat inside hv-4's 820 W
     lump, and neither 820 nor 900 appears in any module. Derived instead
     from autonomy.js's own 450 W peak at autonomy-4's duty ratio, the Gen 1
     duplex draws 267 W, so the earned delta is 192 minus 267 = -75 and
     auxiliary reads 439 W: 45 thermal, 192 compute, 202 other low voltage.
     Writing the obvious 192 minus 380 = -188 would hand this rung 113 W it
     never earned, which on the full Gen 10 preset is 44 miles and would put
     it over 1,800. The one booking mistake this note exists to prevent is
     also the one that would make the generation look like it cleared the
     target. */
  'autonomy-10': { auxDelta: -75 },

  /* ── GEN 11, the package generation ─────────────────────────────────────
     A ROW FOR EVERY MODULE, INCLUDING THE ONES THAT BOOK NOTHING, because
     METRICS is keyed by system id and a slot with no row inherits BASE.
     Omitting battery-10's line put Gen 10 at 822 miles. body-11 and
     interior-11 carry no row here for the same reason no interior ever has:
     they move mass and area, which are measured elsewhere. */

  /* body-11 CARRIES body-9's Cd 0.108 UNCHANGED, and the row exists precisely
     because it books nothing. Without it body-11 inherits BASE's 0.21, which
     is Gen 1's blunt shell, and the ladder read 126.1 Wh/mi and 1,507 miles:
     a generation that narrows the car by 680 mm reported as WORSE than the one
     it succeeds. That is the same trap battery-10's line documents, one slot
     over, and it caught the integrator who wrote "a row for every module,
     including those that book nothing" and then left this one out.

     Why 0.108 and not a better number. design/area-rezero.md froze the drag
     coefficient project-wide until one integrator re-zeroes every body at
     once, and there is no tunnel here. Gen 11's gain is AREA, which is
     MEASURED at 1.6920 m2 against Gen 10's 2.0897 and regenerated from the
     built geometry by tools/area.sh. A tandem greenhouse with a 1.20 m
     section and a faired pack shoulder very likely earns a coefficient too,
     and this generation does not claim it, exactly as design/gen11.md says
     no Cd may be booked. Carrying the predecessor's number is the
     conservative direction: if the real coefficient is better, Gen 11 is
     understated. */
  'body-11': { cd: 0.108 },

  /* battery-11 CARRIES battery-10's pack: same chemistry, same 1.30 m cell
     width, same 210 layers, same 190.0 kWh. It refused the +17 layers its
     brief offered, measuring that 227 layers charge to 930.7 V against
     hv-4's 870 V ceiling, and refused the front-corner chamfer too. The sill
     adds 23.2 kg and no energy. It also asks the integrator, in its own
     strikeshield panel, NOT to book the 2 Cd counts a flatter floor should be
     worth, because body-7's audit never modeled the step. Declined as asked:
     design/area-rezero.md froze the coefficient and an unaudited count is
     exactly what that freeze is for. */
  'battery-11': { kwh: 190, battLoss: 1.014 },

  /* wheels-11 books NOTHING, inherited principle rather than omission.
     wheels-10 shipped CRR_BASIS and declined its count because a
     rolling-resistance coefficient comes off a drum or a coastdown and there
     is neither here. Rerouting a brake harness earns no less and no more. */
  'wheels-11': { crr: 0.0038 },

  /* hv-11 carries hv-4's 820 W lump. The re-architecture is geometric: a
     perimeter ring drawn on a 1.88 m floor cannot exist on a 1.20 m one, and
     nothing about a shorter route makes a converter more efficient. */
  'hv-11': { auxW: 820 },

  /* thermal-11 books 0.5 W of new work, and choosing 0.5 over 4.5 is an
     INTEGRATOR decision the module set up honestly and left open.
     It measures two things. 4.0 W is thermal-9's entitlement since Gen 10:
     the same module re-based on autonomy-10's 192 W of compute instead of
     autonomy-4's 380, owed since Gen 10 and never booked. 0.5 W is what
     thermal-11's own tandem loop earns on top of it.
     Gen 11 takes the 0.5 and leaves the 4.0. Booking a predecessor's
     unclaimed entitlement as this rung's gain is precisely what
     design/retro-gen10.md caught in autonomy-10, where writing the obvious
     -188 would have handed that rung 113 W it never earned and put it over
     1,800 miles. The 4.0 W is thermal-9's to collect in a backfill that
     re-measures Gen 10 as well. -306 is thermal-9's own delta; -306.5 carries
     it and adds the half watt this module earned. */
  'thermal-11': { auxDelta: -306.5 },

  /* autonomy-11 RE-BOOKS NOTHING and says so in data rather than prose: every
     term in its 192 W is a lane state or a scene statistic and none is a
     function of vehicle width. The sensor count is unchanged, so the
     front-end power is unchanged, so the number is unchanged. */
  'autonomy-11': { auxDelta: -75 },
};

/* additive entries stack on the slot baseline instead of replacing it */
const ADDITIVE = new Set(['autonomy-4']);

/* ── FRONTAL AREA, RE-ZEROED. Full method in design/area-rezero.md. ──

   Both of the area debts this file used to record are closed here, and they
   were closed together because closing either alone is the failure
   design/retro-gen8.md names.

   THE CONVENTION. Frontal area is the area of the UNION of the yz-plane
   projections of every triangle built by the configuration's BODY, WHEELS
   and PACK, integrated upward from the ground plane y = 0. One integrator,
   `frontalArea` in tools/silhouette.js, run over all 48 cells below in a
   single process by tools/area.sh. Nothing here is asserted and nothing is
   carried over from an earlier convention.

   WHY THE TABLE IS KEYED ON A PAIR AND NOT ON A BODY. Because the tire
   columns belong to the wheels. body-7's old 2.163 embedded wheels-7's
   split-track columns while the Gen 6 preset ran body-7 on wheels-6, so one
   number was serving two different cars. Measured, Gen 6 is 2.1855 and
   Gen 7 is 2.2106: the split track costs 0.0251 m2, and each rung now
   carries its own figure instead of sharing one.

   WHY THE PACK IS IN THE UNION. body.js draws no underbody at all, its
   lowest part being a fascia lip at y 0.270, where every later body draws a
   venturi floor from about y 0.10. Measuring Gen 1 without a floor would
   hand it 0.17 m2 of free shadow on a drafting difference. The Gen 1 car has
   a floor: battery.js builds one, spanning y 0.140 to 0.360 under the shell.
   That is the BUILT range. P.battery still reserves y 0.13 to 0.31 and the
   pack outgrew the reservation generations ago, which HANDOFF.md records.

   WHY NOTHING ELSE IS IN THE UNION, measured rather than assumed, and
   measured JOINTLY. Leave one slot out of a preset at a time and
   drivetrain, hv, suspension, autonomy and thermal never reach 0.004 m2 on
   any rung. That figure alone would not settle it, because leave-one-out is
   blind to two excluded slots shadowing each other: drop all five at once
   and they add up to 0.0123 m2, on Gen 4. The honest statement of the cost
   of this scope is the whole difference between the union of all nine slots
   and the union of the three, which tools/area.sh --presets prints as its
   FULL-pack column: 0.0018, 0.0101, 0.0128, 0.0135, 0.0047, 0.0811, 0.0776,
   0.0771 and 0.0770 m2 on Gens 1 to 9. Below Gen 6 that is at most 0.0135,
   which is 0.6% of the reference area and 1.8 miles, on Gen 4. Priced by
   running the ladder both ways, the scope is worth -0.1, -1.1, -1.6, -1.8
   and -0.8 miles on Gens 1 to 5.

   The four rungs at 0.077 are one slot: interior-6 adds 0.072 m2 on Gen 6
   through Gen 9 because its canopy liner reaches y 1.405 and its NVH pack
   y 1.391 through a roof that closes at 1.368. A headliner standing outside
   the roof is a geometry defect, not frontal area, and it is not charged as
   drag. It is 13.6 to 19.5 miles on those four rungs, which is the honest
   size of the defect: Gen 9 would read 1,654 rather than 1,674 if that
   headliner were real bodywork. It is logged in design/area-rezero.md for
   whoever owns that module.

   WHAT MOVED. The audited rungs were close: Gen 6 to Gen 9 were 0.02 to
   0.055 m2 light. The pre-audit rungs were not: Gen 1 to Gen 5 were 0.18 to
   0.25 m2 light, and their published order was wrong, not merely offset.
   Frontal area does NOT fall from Gen 1 to Gen 5. It sits at 2.36 to 2.42
   and wanders, which is design/gen6.md's own thesis, that five generations
   optimized Cd while the package sat untouched. The published table said
   2.22 down to 2.17 and quietly contradicted the design doc that motivated
   Gen 6. The real area ladder has exactly two steps in it, Gen 6 at
   -0.230 m2 and Gen 9 at -0.114, and Gen 6 was being credited with 0.007.

   Cells are body|wheels. The pack is the one the ladder runs behind that
   pair, or that body's own generation pack where the ladder never runs the
   pair. All nine rungs are named pairs, so all nine are exact, and the pack
   residual below reaches only cells off the ladder.

   That residual is battery-7. Hold a body and its wheels and swap the pack
   through the four pre-Gen-7 packs and the union moves at most 0.014 m2, and
   0.008 or less on seven of the eight bodies. Put battery-7 under a shell that
   was never drawn around its rocker rails and the spread goes to 0.048 on
   `body`, 0.038 on `body-aero` and 0.020 on `body-4`.

   GENERATED BY tools/area.sh. Re-run it rather than hand-editing a cell, and
   note that the tool now reads this table back and FAILS if any cell
   disagrees with what it just measured, so a geometry change that moves a
   shadow cannot sit here unnoticed. That guard is the whole point: standing
   rule 2 of design/area-rezero.md used to be a rule people had to remember. */
export const AREA = {
  'body':        { 'wheels': 2.4045, 'wheels-2': 2.3743, 'wheels-3': 2.3733, 'wheels-6': 2.3738, 'wheels-7': 2.3820, 'wheels-9': 2.3353, 'wheels-10': 2.3267, 'wheels-11': 2.3267 },
  'body-aero':   { 'wheels': 2.4183, 'wheels-2': 2.3937, 'wheels-3': 2.3937, 'wheels-6': 2.3932, 'wheels-7': 2.3998, 'wheels-9': 2.3589, 'wheels-10': 2.3515, 'wheels-11': 2.3515 },
  'body-3':      { 'wheels': 2.4392, 'wheels-2': 2.4137, 'wheels-3': 2.4124, 'wheels-6': 2.4135, 'wheels-7': 2.4218, 'wheels-9': 2.3769, 'wheels-10': 2.3678, 'wheels-11': 2.3677 },
  'body-4':      { 'wheels': 2.3898, 'wheels-2': 2.3645, 'wheels-3': 2.3638, 'wheels-6': 2.3648, 'wheels-7': 2.3718, 'wheels-9': 2.3267, 'wheels-10': 2.3177, 'wheels-11': 2.3175 },
  'body-6':      { 'wheels': 2.4439, 'wheels-2': 2.4163, 'wheels-3': 2.4125, 'wheels-6': 2.4155, 'wheels-7': 2.4302, 'wheels-9': 2.3824, 'wheels-10': 2.3734, 'wheels-11': 2.3734 },
  'body-7':      { 'wheels': 2.2115, 'wheels-2': 2.1864, 'wheels-3': 2.1840, 'wheels-6': 2.1855, 'wheels-7': 2.2106, 'wheels-9': 2.1622, 'wheels-10': 2.1550, 'wheels-11': 2.1550 },
  'body-8':      { 'wheels': 2.2253, 'wheels-2': 2.1998, 'wheels-3': 2.1976, 'wheels-6': 2.1990, 'wheels-7': 2.2114, 'wheels-9': 2.1741, 'wheels-10': 2.1670, 'wheels-11': 2.1670 },
  'body-9':      { 'wheels': 2.1587, 'wheels-2': 2.1235, 'wheels-3': 2.1212, 'wheels-6': 2.1227, 'wheels-7': 2.1351, 'wheels-9': 2.0978, 'wheels-10': 2.0897, 'wheels-11': 2.0906 },
  /* REGENERATED 2026-08-13 after body-11's four hood stations came down
     under the driver's eye line. Every cell fell by 0.0005 to 0.0006 m2 and
     no other body's row moved at all, which is the sweep confirming that the
     change was local to the front deck.
     The prediction attached to that change was that it would cost NOTHING,
     on the argument that a silhouette lying entirely inside a taller one adds
     nothing to the union. That argument was wrong by 6 cm2 and the guard in
     tools/area.sh is what said so, which is exactly what it is for: the cells
     are measured, not reasoned about. Gen 11 goes from 1.6920 to 1.6914 m2,
     so the vision fix made the car very slightly better rather than free. */
  'body-11':     { 'wheels': 1.8327, 'wheels-2': 1.7657, 'wheels-3': 1.7616, 'wheels-6': 1.7702, 'wheels-7': 1.7904, 'wheels-9': 1.7088, 'wheels-10': 1.6915, 'wheels-11': 1.6914 },
};

/* The body is whichever active id has a row, the wheels whichever has a cell
   in it. Deriving both from the table means there is no second list of ids
   to fall out of step with this one.

   THE FALLBACK IS LOUD ON PURPOSE. Every registered body and every registered
   wheels module has a cell, so a fallback means somebody added a variant and
   did not measure it, and the number that would be served is Gen 1's. A wrong
   area returns a plausible range and nothing looks broken, which is exactly
   how a fiction gets published. Say so rather than silently answering. */
/* Exported because js/compare.js needs the frontal area of a configuration
   that is not the one on screen, and the alternative is a second reader of
   the AREA table. Two readers is how the pre-re-zero table came to have one
   number serving two different cars. There is one integrator for measuring
   it and there is one lookup for reading it. */
export function areaFor(activeIds) {
  let row = null, bodyId = null;
  for (const id of activeIds) if (AREA[id]) { row = AREA[id]; bodyId = id; }
  if (row) for (const id of activeIds) if (row[id] !== undefined) return row[id];
  warnOnce(row
    ? 'efficiency: no AREA cell for ' + bodyId + ' with these wheels. Falling back to Gen 1 area ' + BASE.area + ' m2. Run tools/area.sh.'
    : 'efficiency: no AREA row for the active body. Falling back to Gen 1 area ' + BASE.area + ' m2. Run tools/area.sh.');
  return BASE.area;
}

/* once per message, and only if there is somewhere to say it: the headless
   tools run under JavaScriptCore, which has no console */
const warned = new Set();
function warnOnce(msg) {
  if (warned.has(msg)) return;
  warned.add(msg);
  if (typeof console !== 'undefined' && console.warn) console.warn(msg);
}

/* ── THE DRAG COEFFICIENT IS AN INTERNAL CURRENCY. IT IS NOT A TUNNEL
      RESULT, AND THIS LADDER CANNOT MAKE IT ONE. ──

   design/retro-gen9.md's second finding was that the absolute Cd drifted
   below credibility, and it blocked further drag work until the ladder was
   re-zeroed. The area half of that re-zero is done above. The coefficient
   half CANNOT BE DONE HERE, and saying so plainly is the honest outcome
   rather than a failure to finish the job.

   WHY NOT. A drag coefficient is a wake measurement. It comes out of a wind
   tunnel or a validated CFD solve and out of nothing else. There is no
   tunnel and no solver in this project, so any number written here would be
   an invention dressed as a correction, which is worse than the drift it
   claimed to fix.

   THE BASE, NAMED. Every Cd above is `body`'s 0.21 plus booked counts. That
   base is an asserted class-typical figure for a stamped-and-cast reference
   sedan rather than a measurement, and as a base it is defensible: real
   production sedans of that description sit at 0.20 to 0.23. What is not
   defensible is where the accumulated counts arrive.

   WHERE THE LADDER CROSSES THE REAL WORLD. The lowest figure ever recorded
   on a full-scale four-wheeled car is the Mercedes VISION EQXX at 0.17, and
   the EQXX is a technology demonstrator that was never sold. The lowest on a
   car anyone could actually buy is the Lightyear 0 at 0.175, then the VW XL1
   at 0.189. The best research vehicles ever built, the Ford Probe IV and V
   and the GM Precept, sit at 0.137 to 0.163. The Schlorwagen's 0.113 was a
   wheel-shrouded teardrop and not a car anyone could drive to work.

   This ladder reaches 0.17 at GEN 2 and 0.130 at GEN 5. So a four-seat
   sedan on this ladder matches the lowest coefficient ever recorded on any
   full-scale car at its second rung, and at its fifth it is below every
   research vehicle on that list, the Probe V's 0.137 included. The rungs
   that carry it there are exactly the four that were never independently
   audited: body-aero, body-3, body-4 and body-6. The three that were audited
   all moved the wrong way for the claim, 0.105 to 0.118, 0.105 to 0.108 and
   0.107 to 0.108.

   THE OFFSET, RECORDED SO A READER IS NOT MISLED. The Gen 9 audit expected
   body-9 to measure Cd 0.14 to 0.16 and CdA 0.29 to 0.33 in a tunnel. This
   file carries 0.108, so the top of the ladder is optimistic by roughly
   +0.032 to +0.052 in Cd, which is 30 to 48 percent.

   AND THE AREA RE-ZERO DID NOT CLOSE IT. Gen 9's CdA was 0.2206 on the old
   area and is 0.2266 on the measured one. The gap to the audit's expectation
   was 0.069 to 0.109 m2 before this pass and is 0.063 to 0.103 after it, so
   0.0060 m2 of a gap that starts at 0.069: under a tenth. And it closes from
   the wrong side, by making the reference area larger rather than by making
   the coefficient honest. The credibility problem is in the
   coefficient, not in the reference area, and now that the area is measured
   there is nowhere else for it to hide.

   WHAT IS STILL TRUE. Every rung-to-rung Cd comparison is sound, because
   each count was booked against a named mechanism on the rung before it.
   The currency is internally consistent. It is the exchange rate to the real
   world that is unknown, and LOSS_NOTES.Aero says so in the UI. */
/* Data, for tools and for the next pass to argue against. Nothing imports it
   yet; the reader-facing version of all of this is LOSS_NOTES.Aero below,
   which the panel does show. */
export const CD_BASIS = {
  base: 0.21,
  baseId: 'body',
  topOfLadder: 0.108,
  tunnelExpectation: [0.14, 0.16],   // design/retro-gen9.md, body-9
  cdaExpectation: [0.29, 0.33],
  anchors: { EQXX: 0.17, 'Lightyear 0': 0.175, 'VW XL1': 0.189,
             'GM Precept': 0.163, 'Ford Probe IV': 0.152, 'Ford Probe V': 0.137 },
};

/* What each row of the waterfall means, why it is there, and what moves it.
   The card is part of the teaching surface, so no term goes unexplained. */
export const LOSS_NOTES = {
  Aero: {
    blurb: 'Energy spent shoving air out of the way.',
    how: 'Aerodynamic drag rises with the square of speed, so this is the term that dominates on the highway and almost vanishes in town. What sets it is CdA, the drag coefficient multiplied by the frontal area the car presents. Both halves matter equally, and a good Cd on a large frontal area is not a good car.\n\nOn the mixed cycle the model uses an effective 86 km/h for this term, weighted toward higher speeds because drag work grows with the cube of speed and the fast part of a journey dominates the average.\n\nThe two halves of CdA are known to very different standards here, and it is worth knowing which is which. THE FRONTAL AREA IS MEASURED. It is the union of the shadow the body, the wheels and the pack cast on a plane across the airstream, integrated from the ground up off the built geometry, by one integrator run over every generation at once. Change the shape and the number moves on its own.\n\nTHE DRAG COEFFICIENT IS NOT MEASURED. A coefficient is a wake result and needs a wind tunnel, which this project does not have. Every Cd on the ladder is the Gen 1 reference car\'s 0.21 plus counts booked against named mechanisms, so comparing one generation with the next is sound. The absolute value is not a tunnel figure and should not be read as one: this ladder reaches 0.17 by Gen 2, which matches the lowest drag coefficient ever recorded on a full-scale car of any kind, and by Gen 5 it is at 0.130, below every research prototype ever built. The independent audit of Gen 9 expected the real number to be nearer 0.14 to 0.16 than the 0.108 carried here. Treat the coefficient as the model\'s own currency and the area as the physical measurement.',
    moves: 'Body shape and size. Lower Cd through a longer taper, a smoother surface and a narrower plan; lower frontal area through a lower roof and more tumblehome.',
  },
  Rolling: {
    blurb: 'Energy lost flexing the tires against the road.',
    how: 'A tire is not a rigid wheel. Its contact patch is squashed flat and then released once per revolution, and the rubber does not give back everything it absorbed. That hysteresis is rolling resistance, expressed as Crr, and the force it costs is Crr times the weight on the tire. It is roughly constant with speed, so it matters most at low and medium speeds where drag has not yet taken over.\n\nBecause the force is proportional to weight, this is the row where vehicle mass shows up most directly.',
    moves: 'Tire construction and compound, tire width and pressure, and total vehicle mass.',
  },
  'Stop-go': {
    blurb: 'Kinetic energy poured into accelerating that regen cannot fully recover.',
    how: 'Every time the car accelerates it stores energy as motion, and every time it slows that energy has to go somewhere. Regenerative braking sends most of it back to the pack, but not all: the motor, inverter and pack each take a cut on the way out and again on the way in, and hard stops exceed what regen alone can absorb. The model assumes about 65% comes back.\n\nThe energy at stake scales with mass and with the square of speed, so this term punishes a heavy car in traffic far more than a light one.',
    moves: 'Vehicle mass above all, then how much of the braking regen can capture and the efficiency of the path it travels.',
  },
  Auxiliary: {
    blurb: 'Everything drawing power that is not propulsion.',
    how: 'Cabin heating and cooling, pumps and fans, lights, computers and sensors. Unlike the other rows this is a roughly constant power draw rather than a force, so its cost per kilometer depends on how long you take to travel that kilometer. It is nearly free at highway speed and brutal in stop-start traffic or at a standstill.\n\nThis is why cold weather hurts range so much: cabin heat is a kilowatt-scale load that does not care how fast you are going.',
    moves: 'Thermal system efficiency, especially the heat pump, plus the low-voltage architecture and how much compute the car runs.',
  },
  'Battery losses': {
    blurb: 'Resistive heating inside the pack, on the way out and on the way back in.',
    how: 'Current passing through the internal resistance of cells, welds, busbars and connectors turns some of the energy into heat. The loss goes as current squared times resistance, and for a given power the current is set by the bus voltage, so raising voltage is the most effective lever available.\n\nIn a series string the pack resistance is the cell resistance multiplied by the number of cells, and that count rises with voltage, so the two effects partly cancel and the loss ends up scaling with cell resistance divided by bus voltage. Both improve up this ladder as the voltage climbs and as module walls, trays and finally busbars are deleted.',
    moves: 'Bus voltage, cell chemistry and internal resistance, and how much interconnect hardware sits between the cells and the terminals.',
  },
};

/* `over` is an OPTIONAL set of overrides merged after everything else, and it
   exists so the app can ask this function what a term is worth rather than
   asserting it: call the budget as the car is, call it again with one input
   moved, and the difference is the model's own derivative rather than a
   second model's opinion. Omitting it is byte-identical to what shipped, and
   tools/levers.sh asserts exactly that against the ladder, compare and energy
   checkers. Nothing in the product may pass a value a reader chose: these are
   fixed steps stated beside their answer, not a slider over cars nobody
   built. See design/app-brief.md on inventing data. */
export function computeBudget(activeIds, massKg, over) {
  const m = { ...BASE };
  let auxAdd = 0;
  for (const id of activeIds) {
    const o = METRICS[id];
    if (!o) continue;
    if (ADDITIVE.has(id)) { auxAdd += o.auxW || 0; continue; }
    if (o.auxDelta) { auxAdd += o.auxDelta; continue; }
    Object.assign(m, o);
  }
  m.auxW = Math.max(120, m.auxW + auxAdd);
  /* after the loop, because area is a property of the configuration and no
     single slot's entry is allowed to set it */
  m.area = areaFor(activeIds);
  /* after area, so an override can move the one quantity the loop is not
     allowed to set */
  if (over) Object.assign(m, over);

  const fAero = 0.5 * AIR * m.cd * m.area * V_AERO * V_AERO;   // N
  const fRoll = m.crr * massKg * G;                            // N
  const eKin = 0.5 * massKg * V_MEAN * V_MEAN;                 // J per event

  const whKmAero = (fAero * 1000) / 3600 / m.driveEff;
  const whKmRoll = (fRoll * 1000) / 3600 / m.driveEff;
  const whKmKin = (eKin * ACCEL_PER_KM * (1 - REGEN_RETURN)) / 3600 / m.driveEff;
  const whKmAux = m.auxW / (V_MEAN * 3.6);
  const subtotal = whKmAero + whKmRoll + whKmKin + whKmAux;
  const whKmBatt = subtotal * (m.battLoss - 1);
  const total = subtotal + whKmBatt;

  return {
    rows: [
      ['Aero', whKmAero],
      ['Rolling', whKmRoll],
      ['Stop-go', whKmKin],
      ['Auxiliary', whKmAux],
      ['Battery losses', whKmBatt],
    ],
    total,
    rangeKm: (m.kwh * 1000) / total,
    kwh: m.kwh,
    /* the inputs this call actually resolved, so a caller asking what a term
       is worth can move ONE of them off the model's own value rather than
       restating a number the modules own. Additive: nothing that existed
       before reads it. */
    inputs: { cd: m.cd, crr: m.crr, area: m.area, auxW: m.auxW,
              battLoss: m.battLoss, driveEff: m.driveEff },
  };
}
