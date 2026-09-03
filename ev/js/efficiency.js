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
/* THE REGEN RE-ZERO, 2026-08-27. This was `const REGEN_RETURN = 0.65`, one
   number applied to every rung from Gen 1 to Gen 23, inside the largest
   term on the car: at Gen 23 stop-go is 37.9 percent of the energy and it
   is half m v squared times ONE MINUS this. design/retro-gen21.md named it
   as a cycle assumption nobody had booked per configuration. It is booked
   now, and design/regen-rezero.md is the account.

   It is DERIVED per configuration rather than typed, because recovered
   fraction is a property of hardware: what the machines can catch, what
   the path back into the pack costs, and what is lost below the speed
   regeneration fades. The first three are per-module numbers this file
   already carries or the drivetrain publishes.

   The insight that made it worth doing: authority in g is P / (m v g0), so
   it improves every time the car gets LIGHTER, for free, and a typed
   constant froze the mass of whatever rung it was written against.
   drivetrain-9 publishes 130 kW giving 0.32 g at 100 km/h on a 1,388 kg
   car; the same machines on Gen 23's 1,125.6 kg give far more.

   0.65 survives as the FALLBACK for a configuration whose drivetrain has
   no row, and it warns rather than passing silently. */
const REGEN_FADE_KMH = 8;      // below this, regeneration fades and friction finishes the stop
const REGEN_FRONT_SHARE = 0.70; // drivetrain-9: load transfer under braking
const REGEN_MU = 0.714;         // the grip budget every tool in this project uses
/* The share of a mixed cycle's kinetic energy in stops at or under a given
   mean deceleration. THE PESSIMISTIC END of a band that was run three ways
   (tools/regen.sh prints all three): every one of them clears the old 0.65
   at the top rung, so the direction is measured and only the level is
   assumed, and the level shipped is the conservative one. */
const REGEN_DECEL = [
  [0.10, 0.24], [0.15, 0.20], [0.20, 0.20], [0.25, 0.14],
  [0.30, 0.10], [0.40, 0.08], [0.60, 0.04],
];
const REGEN_FALLBACK = 0.65;
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
/* Exported for tools/ladder.js's missing-row guard, which needs to know
   what "silently inherited the base car" looks like per metric. Nothing
   in the app reads it; computeBudget below is still the one consumer. */
export const BASE = {
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

   NO BODY ENTRIES. Frontal area moved out of this table in the first half of
   the re-zero (AREA below, design/area-rezero.md) and the drag coefficient in
   the second (CD below, design/cd-rezero.md). A body moves the budget by
   being measured, never by writing here. */
/* Exported READ ONLY for tools/aero-run.js, which prints the buildup beside
   what the model carries. Nothing in the app reads it from outside this file,
   and nothing should: the one consumer of a metric is computeBudget below. */
export const METRICS = {
  /* NO BODY ROWS. The drag coefficient left this table in the second half of
     the re-zero, exactly as frontal area left it in the first: both are
     properties of the CONFIGURATION, not of one slot, and both are MEASURED
     off the built geometry rather than booked. See CD below and
     design/cd-rezero.md. The audit history that used to live here, body-7
     rejected 0.105 for 0.118, body-8 0.105 for 0.108, body-9's claim of
     0.107 unconfirmed, is preserved in design/area-rezero.md and stands as
     the record of the booked era; the booked column itself is retired. */
  /* battLoss: r_cell/V relative to Gen 1, so both the bus-voltage climb and
     the deletion of interconnect resistance show up in the waterfall */
  'battery':   { kwh: 95,  battLoss: 1.060 },  // 355 V, tabbed cells + busbars
  'battery-2': { kwh: 118, battLoss: 1.038 },  // 462 V, module walls deleted
  'battery-3': { kwh: 132, battLoss: 1.031 },  // 508 V, tray and interconnects deleted
  'battery-6': { kwh: 150, battLoss: 1.016 },  // 810 V bipolar, busbars deleted
  'battery-5': { kwh: 82,  battLoss: 1.055 },  // 360 V sodium, higher cell ASR
  'drivetrain': { driveEff: 0.90, regenKw: 45 },   /* ASSUMED: one conventional rear machine of the reference car; design/regen-rezero.md marks it assumed */
  'drivetrain-2': { driveEff: 0.925, regenKw: 70 },   /* ASSUMED: axial flux, still one axle */
  'drivetrain-3': { driveEff: 0.93, regenKw: 120 },   /* ASSUMED: in-wheel at four corners */
  'drivetrain-6': { driveEff: 0.945, regenKw: 240 },   /* ASSUMED: the apex 480 kW class, half of it forward */
  'drivetrain-7': { driveEff: 0.958, regenKw: 130 },   /* drivetrain-7 drops to 260 kW total and splits it: 130 forward */  // part-load optimized, peak power traded away
  /* drivetrain-9 is drivetrain-7 with the front halfshafts shortened to reach
     wheels-9's relocated hub face. Nothing electrical or geometric in the
     power path changed, so the efficiency is carried, not re-earned. */
  'drivetrain-9': { driveEff: 0.958, regenKw: 130 },   /* drivetrain-9 publishes 130 kW at the front axle and 0.32 g at 100 km/h on Gen 9 mass, which regenFor reproduces */
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
     they move mass, area and shape, which are measured elsewhere. */

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
  /* autonomy-12 is autonomy-11 with one camera mount moved to body-12's
     tail (the drivetrain-9 precedent, one module over). Nothing electrical
     changed, so the row carries the same delta: carrying is not booking,
     and a fork with no row would inherit BASE and hand Gen 12 an 855 W
     autonomy bill it never ran. */
  'autonomy-12': { auxDelta: -75 },

  /* ── GEN 13, the floor ──────────────────────────────────────────────────
     A row for every new module, including the three that book nothing,
     because a slot with no row inherits BASE (the battery-10 lesson). */
  /* wheels-13 is wheels-11 with a static fairing on each front wheel. A
     pant moves no tread and changes no pressure: Crr carries at 0.0038,
     unbooked as wheels-10 left it. What it changes is measured elsewhere:
     the wheel term of the drag buildup and the AREA cell. */
  'wheels-13': { crr: 0.0038 },
  /* thermal-13 moves the recovery core out of the occupants and re-routes
     its ducts; nothing electrical changed and the membrane is the same 1.67
     m2, so the -306.5 W carries. */
  'thermal-13': { auxDelta: -306.5 },
  /* autonomy-13 is autonomy-12 with four mounts re-seated 65 mm lower on
     body-13. Same lanes, same duty, same 192 W: carrying is not booking. */
  'autonomy-13': { auxDelta: -75 },

  /* ── GEN 14, the outline ───────────────────────────────────────────────
     One row, for the one new module that lives in a slot with a metric.
     body-14 and interior-14 carry no row, as no body or interior ever has:
     they move mass, area and shape, which are measured elsewhere. */
  /* wheels-14 is wheels-13 with a crown band on each rear wheel and the
     front pants brought down: static shells, no tread moved, no pressure
     changed. Crr carries at 0.0038, unbooked as wheels-10 left it. What the
     shells change is measured elsewhere: the wheel term of the drag buildup
     and the AREA cell. */
  'wheels-14': { crr: 0.0038 },

  /* ── GEN 15, the flank ─────────────────────────────────────────────────
     A ROW FOR EVERY NEW MODULE THAT LIVES IN A SLOT WITH A METRIC, including
     the three that book nothing, because a slot with no row inherits BASE
     (the battery-10 lesson: omitting a line put Gen 10 at 822 miles). body-15
     and interior-15 carry no row, as no body or interior ever has. */
  /* hv-15 carries hv-11's 820 W lump: the port and the front drops moved
     40 mm inboard with the flank and nothing electrical changed. */
  'hv-15': { auxW: 820 },
  'hv-18': { auxW: 820 },       /* Gen 18: hv-15 with the port forward; the 820 W lump carries */
  'hv-21': { auxW: 820 },       /* Gen 21: hv-18 with the converter aft; the same silicon in a new place, the 820 W lump carries */
  'hv-22': { auxW: 820 },       /* Gen 22: hv-21 with the charge flap drawn closed; a hinge state is not a watt, the lump carries */
  /* thermal-15 re-folds the recovery core 40 mm shallower in z; the same
     1.67 m2 of membrane, nothing electrical changed: -306.5 W carries. */
  'thermal-15': { auxDelta: -306.5 },
  /* autonomy-15 re-seats two camera pads on body-15's skin. Same lanes, same
     duty, same 192 W: carrying is not booking. */
  'autonomy-15': { auxDelta: -75 },
  /* wheels-15 is wheels-14 with three fairing edges moved by millimeters
     (tools/envelope.sh's findings); no tread moved, no pressure changed,
     Crr carries at 0.0038 unbooked. */
  'wheels-15': { crr: 0.0038 },

  /* ── GEN 16, the corner ────────────────────────────────────────────────
     body-16 and suspension-16 carry no row, as no body or suspension ever
     has: they move mass, area and shape, which are measured elsewhere (the
     AREA and CD rows below, and the parts' ledgers). autonomy-16 re-seats
     the rear camera 45 mm under body-16's Kamm crown: same lanes, same
     duty, same 192 W, and the row is here because a slot with no row
     inherits BASE (the battery-10 lesson). */
  'autonomy-16': { auxDelta: -75 },

  /* ── GEN 17, the track ─────────────────────────────────────────────────
     battery-17 gives 0.11 percent of its cells to the front corner keep-out
     of a 1.44 m track: 189.8 kWh, the same loss. wheels-17 carries Crr 0.0038
     unbooked as every wheels module since wheels-10 has. autonomy-17 and
     thermal-17 move one plane and nothing electrical: their rows carry
     autonomy-16's and thermal-15's, because a slot with no row inherits
     BASE. body-17, suspension-17 and drivetrain-17 carry no row, as their
     slots never have. */
  'battery-17': { kwh: 189.8, battLoss: 1.014 },
  /* battery-21 is battery-17 with the aft-center notch, and the notch starts
     36 mm aft of the last layer (|x| 1.05 against x -1.086): no cells, no
     energy, nothing electrical. Its row carries. The first ladder run of
     this rung had no row here and read 995 miles off BASE's 95 kWh, the
     drivetrain-17 lesson a second time. */
  'battery-21': { kwh: 189.8, battLoss: 1.014 },
  /* drivetrain-17 is drivetrain-9 with its rings and shafts moved: the same
     machines, the same losses, the same row, because the slot HAS a row and
     a missing one hands the rung Gen 1's drive efficiency (the first ladder
     run of this rung read 1,872 miles for exactly that reason). */
  'drivetrain-17': { driveEff: 0.958, regenKw: 130 },   /* Gen 17: drivetrain-9's machines moved, so its 130 kW front pair carries. See design/regen-rezero.md for why this is a power and not a fraction. */
  /* drivetrain-21 deletes the -z rear machine and translates the +z one to
     the centerline with its ring at 1.4 times the torque: the same machine
     family and the same loss maps, with each of three carrying what four
     did. The per-machine point moves up the load axis, where these maps
     flatten, so 0.958 carries and is the conservative end. */
  'drivetrain-21': { driveEff: 0.958, regenKw: 130, regenRearShare: 0.7 },   /* Gen 21: the front pair is untouched at 130 kW; drivetrain-21 states rear regen drops to 0.7 of the pair it replaced, which costs only the rear share of a braking split that is 70 percent front. The trike loses less regen than it looks, and the mass it removed gives more back. */
  'wheels-17': { crr: 0.0038 },
  'wheels-20': { crr: 0.0038 },   /* Gen 20: the tires are wheels-17's untouched; the fairings do not touch rolling resistance */
  'wheels-21': { crr: 0.0038 },   /* Gen 21: three patches at 3.5 to 5.0 mm of deflection against the carried tire's 6.3; the deflection route reads about 2.4 kg/t and the count stays unbooked for CRR_BASIS's unchanged reason */
  /* Gen 24: the 115 section at 6.1 bar. Patch length is load over pressure
     over net width, so it scales as 1/(width x pressure) and 0.92 x 1.089 is
     1.002: the front patch holds 99.7 mm and its deflection holds at 3.5 mm.
     The tire changed and the rolling term did not, which is the arithmetic
     rather than the caution. design/crr-findings.md is why no count is booked
     on this ladder at all yet: the laden basis is not common across rungs. */
  'wheels-24': { crr: 0.0038 },
  'wheels-22': { crr: 0.0038 },   /* Gen 22: the tires are wheels-21's untouched; a fairing wall is not rolling resistance */
  'autonomy-17': { auxDelta: -75 },
  'autonomy-18': { auxDelta: -75 },   /* Gen 18: a fork of autonomy-17, its row carried (the drivetrain-17 lesson) */
  'autonomy-19': { auxDelta: -75 },   /* Gen 19: a fork of autonomy-18, its row carried (the same lesson) */
  'autonomy-21': { auxDelta: -75 },   /* Gen 21: autonomy-19's sensors and compute re-homed to the catamaran hulls; nothing electrical moved, its row carried */
  'autonomy-22': { auxDelta: -75 },   /* Gen 22: the fascia suite translated and the antennas conformal; same silicon, same watts, its row carried */
  'autonomy-23': { auxDelta: -125.5 },   /* Gen 23: THE ONE ELECTRICAL CHANGE ON THE LADDER SINCE Gen 19. autonomy-23 applies its own published cycle split to its own sensors: 119.4 W flat out becomes 68.9 weighted 0.40 cruise, 0.75 elevated, 1.00 dense over 58/30/12, so 50.5 W leaves and the carried -75 becomes -125.5. tools/watts.sh is the instrument that found it by putting the compute argument and the sensor draw side by side */
  'thermal-17': { auxDelta: -306.5 },
  'thermal-22': { auxDelta: -306.5 },
  'thermal-23': { auxDelta: -306.5 },   /* Gen 23: four mounting stations and a hose waypoint follow the flank; nothing thermodynamic moved, its row carried */   /* Gen 22: thermal-17 with the front stack slid aft; a station is not a watt, its row carried. The first gen22 ladder run missed this row and read +6.7 Wh/mi: the additive aux path is the missing-row guard's one documented hole, and this is its second demonstration */
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
  'body':        { 'wheels': 2.4045, 'wheels-2': 2.3743, 'wheels-3': 2.3733, 'wheels-6': 2.3738, 'wheels-7': 2.3820, 'wheels-9': 2.3353, 'wheels-10': 2.3267, 'wheels-11': 2.3267, 'wheels-13': 2.3351, 'wheels-14': 2.3364, 'wheels-15': 2.3364, 'wheels-17': 2.3278, 'wheels-20': 2.3289, 'wheels-21': 2.3431, 'wheels-22': 2.3410, 'wheels-24': 2.3374 },
  'body-aero':   { 'wheels': 2.4183, 'wheels-2': 2.3937, 'wheels-3': 2.3937, 'wheels-6': 2.3932, 'wheels-7': 2.3998, 'wheels-9': 2.3589, 'wheels-10': 2.3515, 'wheels-11': 2.3515, 'wheels-13': 2.3578, 'wheels-14': 2.3591, 'wheels-15': 2.3591, 'wheels-17': 2.3525, 'wheels-20': 2.3536, 'wheels-21': 2.3678, 'wheels-22': 2.3663, 'wheels-24': 2.3629 },
  'body-3':      { 'wheels': 2.4392, 'wheels-2': 2.4137, 'wheels-3': 2.4124, 'wheels-6': 2.4135, 'wheels-7': 2.4218, 'wheels-9': 2.3769, 'wheels-10': 2.3678, 'wheels-11': 2.3677, 'wheels-13': 2.3769, 'wheels-14': 2.3782, 'wheels-15': 2.3782, 'wheels-17': 2.3680, 'wheels-20': 2.3691, 'wheels-21': 2.3789, 'wheels-22': 2.3766, 'wheels-24': 2.3735 },
  'body-4':      { 'wheels': 2.3898, 'wheels-2': 2.3645, 'wheels-3': 2.3638, 'wheels-6': 2.3648, 'wheels-7': 2.3718, 'wheels-9': 2.3267, 'wheels-10': 2.3177, 'wheels-11': 2.3175, 'wheels-13': 2.3267, 'wheels-14': 2.3280, 'wheels-15': 2.3280, 'wheels-17': 2.3181, 'wheels-20': 2.3192, 'wheels-21': 2.3298, 'wheels-22': 2.3275, 'wheels-24': 2.3246 },
  'body-6':      { 'wheels': 2.4439, 'wheels-2': 2.4163, 'wheels-3': 2.4125, 'wheels-6': 2.4155, 'wheels-7': 2.4302, 'wheels-9': 2.3824, 'wheels-10': 2.3734, 'wheels-11': 2.3734, 'wheels-13': 2.3825, 'wheels-14': 2.3838, 'wheels-15': 2.3838, 'wheels-17': 2.3735, 'wheels-20': 2.3746, 'wheels-21': 2.3829, 'wheels-22': 2.3806, 'wheels-24': 2.3753 },
  'body-7':      { 'wheels': 2.2115, 'wheels-2': 2.1864, 'wheels-3': 2.1840, 'wheels-6': 2.1855, 'wheels-7': 2.2106, 'wheels-9': 2.1622, 'wheels-10': 2.1550, 'wheels-11': 2.1550, 'wheels-13': 2.1610, 'wheels-14': 2.1622, 'wheels-15': 2.1622, 'wheels-17': 2.1569, 'wheels-20': 2.1580, 'wheels-21': 2.1675, 'wheels-22': 2.1659, 'wheels-24': 2.1604 },
  'body-8':      { 'wheels': 2.2253, 'wheels-2': 2.1998, 'wheels-3': 2.1976, 'wheels-6': 2.1990, 'wheels-7': 2.2114, 'wheels-9': 2.1741, 'wheels-10': 2.1670, 'wheels-11': 2.1670, 'wheels-13': 2.1729, 'wheels-14': 2.1742, 'wheels-15': 2.1742, 'wheels-17': 2.1676, 'wheels-20': 2.1686, 'wheels-21': 2.1788, 'wheels-22': 2.1772, 'wheels-24': 2.1723 },
  'body-9':      { 'wheels': 2.1587, 'wheels-2': 2.1235, 'wheels-3': 2.1212, 'wheels-6': 2.1227, 'wheels-7': 2.1351, 'wheels-9': 2.0978, 'wheels-10': 2.0897, 'wheels-11': 2.0906, 'wheels-13': 2.0965, 'wheels-14': 2.0978, 'wheels-15': 2.0978, 'wheels-17': 2.0912, 'wheels-20': 2.0923, 'wheels-21': 2.1024, 'wheels-22': 2.1008, 'wheels-24': 2.0960 },
  'body-11':     { 'wheels': 1.8327, 'wheels-2': 1.7657, 'wheels-3': 1.7616, 'wheels-6': 1.7702, 'wheels-7': 1.7904, 'wheels-9': 1.7088, 'wheels-10': 1.6915, 'wheels-11': 1.6914, 'wheels-13': 1.7334, 'wheels-14': 1.7303, 'wheels-15': 1.7303, 'wheels-17': 1.7123, 'wheels-20': 1.7134, 'wheels-21': 1.7127, 'wheels-22': 1.7079, 'wheels-24': 1.7024 },
  'body-12':     { 'wheels': 1.8380, 'wheels-2': 1.7718, 'wheels-3': 1.7708, 'wheels-6': 1.7767, 'wheels-7': 1.7951, 'wheels-9': 1.7270, 'wheels-10': 1.7162, 'wheels-11': 1.7162, 'wheels-13': 1.7467, 'wheels-14': 1.7436, 'wheels-15': 1.7436, 'wheels-17': 1.7380, 'wheels-20': 1.7391, 'wheels-21': 1.7449, 'wheels-22': 1.7424, 'wheels-24': 1.7370 },
  'body-13':     { 'wheels': 1.7599, 'wheels-2': 1.6937, 'wheels-3': 1.6927, 'wheels-6': 1.6987, 'wheels-7': 1.7170, 'wheels-9': 1.6489, 'wheels-10': 1.6382, 'wheels-11': 1.6381, 'wheels-13': 1.6687, 'wheels-14': 1.6656, 'wheels-15': 1.6656, 'wheels-17': 1.6600, 'wheels-20': 1.6611, 'wheels-21': 1.6669, 'wheels-22': 1.6643, 'wheels-24': 1.6590 },
  'body-14':     { 'wheels': 1.7342, 'wheels-2': 1.6680, 'wheels-3': 1.6670, 'wheels-6': 1.6729, 'wheels-7': 1.6913, 'wheels-9': 1.6232, 'wheels-10': 1.6124, 'wheels-11': 1.6124, 'wheels-13': 1.6429, 'wheels-14': 1.6398, 'wheels-15': 1.6398, 'wheels-17': 1.6343, 'wheels-20': 1.6353, 'wheels-21': 1.6411, 'wheels-22': 1.6386, 'wheels-24': 1.6332 },
  'body-15':     { 'wheels': 1.6988, 'wheels-2': 1.6329, 'wheels-3': 1.6320, 'wheels-6': 1.6378, 'wheels-7': 1.6562, 'wheels-9': 1.5892, 'wheels-10': 1.5784, 'wheels-11': 1.5784, 'wheels-13': 1.6092, 'wheels-14': 1.6064, 'wheels-15': 1.6064, 'wheels-17': 1.6025, 'wheels-20': 1.6036, 'wheels-21': 1.6076, 'wheels-22': 1.6050, 'wheels-24': 1.5996 },
  'body-16':     { 'wheels': 1.6899, 'wheels-2': 1.6240, 'wheels-3': 1.6231, 'wheels-6': 1.6289, 'wheels-7': 1.6473, 'wheels-9': 1.5802, 'wheels-10': 1.5694, 'wheels-11': 1.5694, 'wheels-13': 1.6003, 'wheels-14': 1.5975, 'wheels-15': 1.5975, 'wheels-17': 1.5936, 'wheels-20': 1.5947, 'wheels-21': 1.5987, 'wheels-22': 1.5961, 'wheels-24': 1.5907 },
  'body-17':     { 'wheels': 1.6888, 'wheels-2': 1.6232, 'wheels-3': 1.6221, 'wheels-6': 1.6278, 'wheels-7': 1.6475, 'wheels-9': 1.5671, 'wheels-10': 1.5565, 'wheels-11': 1.5565, 'wheels-13': 1.5908, 'wheels-14': 1.5879, 'wheels-15': 1.5879, 'wheels-17': 1.5805, 'wheels-20': 1.5816, 'wheels-21': 1.5853, 'wheels-22': 1.5828, 'wheels-24': 1.5769 },
  'body-18':     { 'wheels': 1.6845, 'wheels-2': 1.6251, 'wheels-3': 1.6252, 'wheels-6': 1.6248, 'wheels-7': 1.6390, 'wheels-9': 1.5465, 'wheels-10': 1.5359, 'wheels-11': 1.5359, 'wheels-13': 1.5702, 'wheels-14': 1.5673, 'wheels-15': 1.5673, 'wheels-17': 1.5580, 'wheels-20': 1.5591, 'wheels-21': 1.5632, 'wheels-22': 1.5607, 'wheels-24': 1.5561 },
  'body-19':     { 'wheels': 1.6835, 'wheels-2': 1.6241, 'wheels-3': 1.6242, 'wheels-6': 1.6237, 'wheels-7': 1.6379, 'wheels-9': 1.5454, 'wheels-10': 1.5348, 'wheels-11': 1.5348, 'wheels-13': 1.5691, 'wheels-14': 1.5663, 'wheels-15': 1.5663, 'wheels-17': 1.5570, 'wheels-20': 1.5581, 'wheels-21': 1.5622, 'wheels-22': 1.5597, 'wheels-24': 1.5550 },
  'body-20':     { 'wheels': 1.6835, 'wheels-2': 1.6241, 'wheels-3': 1.6242, 'wheels-6': 1.6237, 'wheels-7': 1.6379, 'wheels-9': 1.5441, 'wheels-10': 1.5268, 'wheels-11': 1.5268, 'wheels-13': 1.5691, 'wheels-14': 1.5663, 'wheels-15': 1.5663, 'wheels-17': 1.5474, 'wheels-20': 1.5485, 'wheels-21': 1.5525, 'wheels-22': 1.5500, 'wheels-24': 1.5453 },
  'body-21':     { 'wheels': 1.6835, 'wheels-2': 1.6241, 'wheels-3': 1.6242, 'wheels-6': 1.6238, 'wheels-7': 1.6379, 'wheels-9': 1.5441, 'wheels-10': 1.5268, 'wheels-11': 1.5268, 'wheels-13': 1.5691, 'wheels-14': 1.5663, 'wheels-15': 1.5663, 'wheels-17': 1.5473, 'wheels-20': 1.5484, 'wheels-21': 1.5458, 'wheels-22': 1.5427, 'wheels-24': 1.5381 },
  'body-22':     { 'wheels': 1.6835, 'wheels-2': 1.6241, 'wheels-3': 1.6242, 'wheels-6': 1.6238, 'wheels-7': 1.6379, 'wheels-9': 1.5441, 'wheels-10': 1.5268, 'wheels-11': 1.5268, 'wheels-13': 1.5691, 'wheels-14': 1.5663, 'wheels-15': 1.5663, 'wheels-17': 1.5473, 'wheels-20': 1.5484, 'wheels-21': 1.5458, 'wheels-22': 1.5411, 'wheels-24': 1.5364 },
  'body-23':     { 'wheels': 1.6673, 'wheels-2': 1.6079, 'wheels-3': 1.6080, 'wheels-6': 1.6075, 'wheels-7': 1.6217, 'wheels-9': 1.5279, 'wheels-10': 1.5105, 'wheels-11': 1.5105, 'wheels-13': 1.5529, 'wheels-14': 1.5501, 'wheels-15': 1.5501, 'wheels-17': 1.5310, 'wheels-20': 1.5321, 'wheels-21': 1.5296, 'wheels-22': 1.5248, 'wheels-24': 1.5202 },
  'body-24':     { 'wheels': 1.6673, 'wheels-2': 1.6079, 'wheels-3': 1.6080, 'wheels-6': 1.6075, 'wheels-7': 1.6217, 'wheels-9': 1.5279, 'wheels-10': 1.5105, 'wheels-11': 1.5105, 'wheels-13': 1.5529, 'wheels-14': 1.5501, 'wheels-15': 1.5501, 'wheels-17': 1.5310, 'wheels-20': 1.5321, 'wheels-21': 1.5296, 'wheels-22': 1.5248, 'wheels-24': 1.5202 },
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
    ? 'efficiency: no area cell for ' + bodyId + ' with these wheels. Falling back to Gen 1 area ' + BASE.area + ' m2. Run tools/area.sh.'
    : 'efficiency: no area row for the active body. Falling back to Gen 1 area ' + BASE.area + ' m2. Run tools/area.sh.');
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

/* ── THE DRAG COEFFICIENT, MEASURED. The second half of the re-zero. ──

   design/retro-gen9.md blocked drag work until one integrator re-zeroed
   every body at once. design/area-rezero.md did the AREA half and recorded
   that the coefficient half could not be done by ARGUMENT, because a Cd is a
   wake measurement and there is no tunnel here. That freeze then cost what
   design/retro-gen11.md measured: the most reshaped body on the ladder
   booked zero counts, because under the freeze a shape had no way to earn
   one, and it inherited a coefficient from a car it does not resemble.

   This table is the second half, done the way the first was: MEASURED, one
   method, every configuration, one run. tools/aerogeom.js takes wetted area,
   a 25 mm section march, base area and an underbody roughness index off the
   built triangles; tools/aero.js turns them into a COMPONENT BUILDUP with
   every empirical coefficient published, cited in place, and applied
   identically to every cell. It is anchored twice: Gen 1 returns 0.2018
   against the asserted class-typical 0.21, and the Ahmed body, the reference
   bluff shape of automotive aerodynamics, returns 0.2060 against its
   published 0.230. Both anchors read LOW, so every figure here is a floor.
   design/cd-rezero.md is the write-up, including the two rungs this column
   sent backward and the decision to adopt it anyway (Davis, 2026-08-21):
   ascent is earned by geometry now, not by bookkeeping.

   THIS IS STILL NOT A TUNNEL RESULT. It is the same kind of claim as a
   preliminary-design drag estimate, good to 10 or 15 percent, and its known
   bias is optimism about vortex drag, which no correlation over geometry can
   see. What makes it admissible where the booked counts were not: to move a
   cell of this table you must move the GEOMETRY and rerun the sweep. There
   is no way to argue with it in prose.

   Keyed exactly like AREA, and for the same reason: a coefficient is a
   property of the configuration. body-7 measures 0.1714 on Gen 6's wheels
   and 0.1742 on Gen 7's, and one number per body would have to be one of
   those on both cars, which is the exact one-number-two-cars failure the
   pre-re-zero area table had.

   SECOND REVISION, 2026-08-21 night: a forebody term (Hucho's edge, plan,
   cowl and rake penalties) and the roughness index windowed between the
   axles, design/cd-rezero.md section 7 and design/gen12-front.md.

   THIRD REVISION, 2026-08-22: the wheel term is the ROTATING tire outside
   the car's FILLED outline, PER AXLE, against what stands beside or ahead
   of that axle. design/gen13.md section 7 and design/cd-rezero.md section 8.
   Three things the first two revisions got wrong, each found by running the
   rule written before it: a static part of the wheels module was charged as
   a tire; tires were credited with filling holes in the projection where
   no firewall or sill closure is drawn; and a frontal projection collapses
   x, so four tires cast two silhouettes and a rear spat was credited with
   hiding the fronts. Under the corrected rule every wheel term rises, Gen 1
   to 0.2611 with a wheel share of 23 percent against Hucho's quarter, and
   Gen 12 to 0.1788 because its front tires stand in clean air outside a
   0.60 flank. Every cell below is from that revision. The body-12 cell
   history (three spat constructions measured, the enclosure lost) is in
   design/gen12.md and the module's own panel.

   REGENERATE with tools/aero.sh --table after any body, wheels or pack
   change. A new body needs a row here, a row in AREA, and entries in
   tools/area.js, and the loud fallback below is what tells you if you
   forget. */
/* COOLING IS SWAPPED OUT OF THESE CELLS BEFORE THEY ARE USED. Every value
   below carries tools/aero.js's flat 0.008 cooling constant, and
   computeBudget replaces it with the configuration's own derived term
   (coolingFor above, design/cooling-rezero.md). A cell here is therefore
   NOT the coefficient the car runs on: it is about 0.005 high on the
   recent rungs. The app's readout resolves through computeBudget and shows
   the corrected number. */
export const CD = {
  'body':          { 'wheels': 0.2611, 'wheels-2': 0.2511, 'wheels-3': 0.2506, 'wheels-6': 0.2489, 'wheels-7': 0.2404, 'wheels-9': 0.2388, 'wheels-10': 0.2358, 'wheels-11': 0.2360, 'wheels-13': 0.2266, 'wheels-14': 0.2238, 'wheels-15': 0.2238, 'wheels-17': 0.2234, 'wheels-20': 0.2148, 'wheels-21': 0.2079, 'wheels-22': 0.2080, 'wheels-24': 0.2076 },
  'body-aero':     { 'wheels': 0.1685, 'wheels-2': 0.1581, 'wheels-3': 0.1577, 'wheels-6': 0.1585, 'wheels-7': 0.1494, 'wheels-9': 0.1473, 'wheels-10': 0.1446, 'wheels-11': 0.1447, 'wheels-13': 0.1390, 'wheels-14': 0.1365, 'wheels-15': 0.1365, 'wheels-17': 0.1359, 'wheels-20': 0.1292, 'wheels-21': 0.1238, 'wheels-22': 0.1238, 'wheels-24': 0.1233 },
  'body-3':        { 'wheels': 0.1915, 'wheels-2': 0.1771, 'wheels-3': 0.1766, 'wheels-6': 0.1734, 'wheels-7': 0.1624, 'wheels-9': 0.1554, 'wheels-10': 0.1514, 'wheels-11': 0.1517, 'wheels-13': 0.1383, 'wheels-14': 0.1357, 'wheels-15': 0.1357, 'wheels-17': 0.1343, 'wheels-20': 0.1268, 'wheels-21': 0.1215, 'wheels-22': 0.1216, 'wheels-24': 0.1211 },
  'body-4':        { 'wheels': 0.1844, 'wheels-2': 0.1734, 'wheels-3': 0.1727, 'wheels-6': 0.1714, 'wheels-7': 0.1602, 'wheels-9': 0.1560, 'wheels-10': 0.1522, 'wheels-11': 0.1525, 'wheels-13': 0.1387, 'wheels-14': 0.1360, 'wheels-15': 0.1360, 'wheels-17': 0.1344, 'wheels-20': 0.1267, 'wheels-21': 0.1208, 'wheels-22': 0.1209, 'wheels-24': 0.1204 },
  'body-6':        { 'wheels': 0.2049, 'wheels-2': 0.1898, 'wheels-3': 0.1888, 'wheels-6': 0.1879, 'wheels-7': 0.1761, 'wheels-9': 0.1699, 'wheels-10': 0.1655, 'wheels-11': 0.1658, 'wheels-13': 0.1492, 'wheels-14': 0.1461, 'wheels-15': 0.1463, 'wheels-17': 0.1448, 'wheels-20': 0.1351, 'wheels-21': 0.1293, 'wheels-22': 0.1294, 'wheels-24': 0.1290 },
  'body-7':        { 'wheels': 0.2026, 'wheels-2': 0.1917, 'wheels-3': 0.1912, 'wheels-6': 0.1922, 'wheels-7': 0.1783, 'wheels-9': 0.1848, 'wheels-10': 0.1821, 'wheels-11': 0.1821, 'wheels-13': 0.1717, 'wheels-14': 0.1688, 'wheels-15': 0.1688, 'wheels-17': 0.1683, 'wheels-20': 0.1600, 'wheels-21': 0.1560, 'wheels-22': 0.1561, 'wheels-24': 0.1557 },
  'body-8':        { 'wheels': 0.1708, 'wheels-2': 0.1598, 'wheels-3': 0.1599, 'wheels-6': 0.1613, 'wheels-7': 0.1503, 'wheels-9': 0.1502, 'wheels-10': 0.1476, 'wheels-11': 0.1476, 'wheels-13': 0.1370, 'wheels-14': 0.1347, 'wheels-15': 0.1347, 'wheels-17': 0.1337, 'wheels-20': 0.1285, 'wheels-21': 0.1244, 'wheels-22': 0.1244, 'wheels-24': 0.1241 },
  'body-9':        { 'wheels': 0.1792, 'wheels-2': 0.1645, 'wheels-3': 0.1646, 'wheels-6': 0.1660, 'wheels-7': 0.1546, 'wheels-9': 0.1546, 'wheels-10': 0.1509, 'wheels-11': 0.1519, 'wheels-13': 0.1410, 'wheels-14': 0.1386, 'wheels-15': 0.1386, 'wheels-17': 0.1376, 'wheels-20': 0.1322, 'wheels-21': 0.1279, 'wheels-22': 0.1279, 'wheels-24': 0.1276 },
  'body-11':       { 'wheels': 0.3432, 'wheels-2': 0.3215, 'wheels-3': 0.3222, 'wheels-6': 0.3173, 'wheels-7': 0.2831, 'wheels-9': 0.2849, 'wheels-10': 0.2766, 'wheels-11': 0.2766, 'wheels-13': 0.2258, 'wheels-14': 0.2077, 'wheels-15': 0.2081, 'wheels-17': 0.2065, 'wheels-20': 0.2026, 'wheels-21': 0.1957, 'wheels-22': 0.1961, 'wheels-24': 0.1959 },
  'body-12':       { 'wheels': 0.2504, 'wheels-2': 0.2231, 'wheels-3': 0.2231, 'wheels-6': 0.2212, 'wheels-7': 0.1910, 'wheels-9': 0.1869, 'wheels-10': 0.1787, 'wheels-11': 0.1787, 'wheels-13': 0.1318, 'wheels-14': 0.1142, 'wheels-15': 0.1143, 'wheels-17': 0.1141, 'wheels-20': 0.1103, 'wheels-21': 0.1036, 'wheels-22': 0.1036, 'wheels-24': 0.1031 },
  'body-13':       { 'wheels': 0.2565, 'wheels-2': 0.2282, 'wheels-3': 0.2282, 'wheels-6': 0.2261, 'wheels-7': 0.1945, 'wheels-9': 0.1904, 'wheels-10': 0.1818, 'wheels-11': 0.1818, 'wheels-13': 0.1327, 'wheels-14': 0.1142, 'wheels-15': 0.1143, 'wheels-17': 0.1141, 'wheels-20': 0.1102, 'wheels-21': 0.1031, 'wheels-22': 0.1031, 'wheels-24': 0.1026 },
  'body-14':       { 'wheels': 0.2594, 'wheels-2': 0.2308, 'wheels-3': 0.2309, 'wheels-6': 0.2287, 'wheels-7': 0.1966, 'wheels-9': 0.1925, 'wheels-10': 0.1838, 'wheels-11': 0.1838, 'wheels-13': 0.1339, 'wheels-14': 0.1151, 'wheels-15': 0.1152, 'wheels-17': 0.1150, 'wheels-20': 0.1110, 'wheels-21': 0.1038, 'wheels-22': 0.1038, 'wheels-24': 0.1033 },
  'body-15':       { 'wheels': 0.2605, 'wheels-2': 0.2316, 'wheels-3': 0.2316, 'wheels-6': 0.2294, 'wheels-7': 0.1965, 'wheels-9': 0.1924, 'wheels-10': 0.1836, 'wheels-11': 0.1836, 'wheels-13': 0.1330, 'wheels-14': 0.1139, 'wheels-15': 0.1140, 'wheels-17': 0.1132, 'wheels-20': 0.1091, 'wheels-21': 0.1018, 'wheels-22': 0.1019, 'wheels-24': 0.1013 },
  'body-16':       { 'wheels': 0.2580, 'wheels-2': 0.2286, 'wheels-3': 0.2286, 'wheels-6': 0.2266, 'wheels-7': 0.1935, 'wheels-9': 0.1892, 'wheels-10': 0.1803, 'wheels-11': 0.1803, 'wheels-13': 0.1295, 'wheels-14': 0.1103, 'wheels-15': 0.1104, 'wheels-17': 0.1096, 'wheels-20': 0.1054, 'wheels-21': 0.0981, 'wheels-22': 0.0981, 'wheels-24': 0.0976 },
  'body-17':       { 'wheels': 0.2615, 'wheels-2': 0.2317, 'wheels-3': 0.2317, 'wheels-6': 0.2299, 'wheels-7': 0.1927, 'wheels-9': 0.1903, 'wheels-10': 0.1814, 'wheels-11': 0.1814, 'wheels-13': 0.1302, 'wheels-14': 0.1106, 'wheels-15': 0.1107, 'wheels-17': 0.1100, 'wheels-20': 0.1058, 'wheels-21': 0.0987, 'wheels-22': 0.0987, 'wheels-24': 0.0982 },
  'body-18':       { 'wheels': 0.2550, 'wheels-2': 0.2239, 'wheels-3': 0.2238, 'wheels-6': 0.2229, 'wheels-7': 0.1862, 'wheels-9': 0.1848, 'wheels-10': 0.1757, 'wheels-11': 0.1757, 'wheels-13': 0.1239, 'wheels-14': 0.1038, 'wheels-15': 0.1039, 'wheels-17': 0.1034, 'wheels-20': 0.0992, 'wheels-21': 0.0916, 'wheels-22': 0.0916, 'wheels-24': 0.0910 },
  'body-19':       { 'wheels': 0.2443, 'wheels-2': 0.2128, 'wheels-3': 0.2127, 'wheels-6': 0.2119, 'wheels-7': 0.1752, 'wheels-9': 0.1732, 'wheels-10': 0.1640, 'wheels-11': 0.1640, 'wheels-13': 0.1124, 'wheels-14': 0.0922, 'wheels-15': 0.0923, 'wheels-17': 0.0918, 'wheels-20': 0.0876, 'wheels-21': 0.0801, 'wheels-22': 0.0800, 'wheels-24': 0.0794 },
  'body-20':       { 'wheels': 0.2468, 'wheels-2': 0.2156, 'wheels-3': 0.2153, 'wheels-6': 0.2144, 'wheels-7': 0.1777, 'wheels-9': 0.1757, 'wheels-10': 0.1654, 'wheels-11': 0.1654, 'wheels-13': 0.1130, 'wheels-14': 0.0929, 'wheels-15': 0.0930, 'wheels-17': 0.0922, 'wheels-20': 0.0880, 'wheels-21': 0.0805, 'wheels-22': 0.0804, 'wheels-24': 0.0797 },
  'body-21':       { 'wheels': 0.2498, 'wheels-2': 0.2187, 'wheels-3': 0.2185, 'wheels-6': 0.2175, 'wheels-7': 0.1806, 'wheels-9': 0.1791, 'wheels-10': 0.1686, 'wheels-11': 0.1686, 'wheels-13': 0.1161, 'wheels-14': 0.0957, 'wheels-15': 0.0962, 'wheels-17': 0.0935, 'wheels-20': 0.0893, 'wheels-21': 0.0816, 'wheels-22': 0.0816, 'wheels-24': 0.0809 },
  'body-22':       { 'wheels': 0.2500, 'wheels-2': 0.2188, 'wheels-3': 0.2185, 'wheels-6': 0.2177, 'wheels-7': 0.1807, 'wheels-9': 0.1792, 'wheels-10': 0.1687, 'wheels-11': 0.1687, 'wheels-13': 0.1163, 'wheels-14': 0.0958, 'wheels-15': 0.0963, 'wheels-17': 0.0930, 'wheels-20': 0.0888, 'wheels-21': 0.0811, 'wheels-22': 0.0811, 'wheels-24': 0.0804 },
  'body-23':       { 'wheels': 0.2520, 'wheels-2': 0.2206, 'wheels-3': 0.2203, 'wheels-6': 0.2195, 'wheels-7': 0.1821, 'wheels-9': 0.1806, 'wheels-10': 0.1700, 'wheels-11': 0.1700, 'wheels-13': 0.1170, 'wheels-14': 0.0963, 'wheels-15': 0.0968, 'wheels-17': 0.0934, 'wheels-20': 0.0892, 'wheels-21': 0.0813, 'wheels-22': 0.0814, 'wheels-24': 0.0807 },
  'body-24':       { 'wheels': 0.2519, 'wheels-2': 0.2205, 'wheels-3': 0.2202, 'wheels-6': 0.2194, 'wheels-7': 0.1820, 'wheels-9': 0.1805, 'wheels-10': 0.1699, 'wheels-11': 0.1699, 'wheels-13': 0.1169, 'wheels-14': 0.0961, 'wheels-15': 0.0966, 'wheels-17': 0.0932, 'wheels-20': 0.0890, 'wheels-21': 0.0812, 'wheels-22': 0.0813, 'wheels-24': 0.0806 },
};

/* One lookup, one loud fallback, exactly as areaFor above and for the same
   reason: a silent default returns a plausible budget for an unmeasured car,
   and that is how a fiction gets published. */
export function cdFor(activeIds) {
  let row = null, bodyId = null;
  for (const id of activeIds) if (CD[id]) { row = CD[id]; bodyId = id; }
  if (row) for (const id of activeIds) if (row[id] !== undefined) return row[id];
  warnOnce(row
    ? 'efficiency: no CD cell for ' + bodyId + ' with these wheels. Falling back to Gen 1 Cd ' + BASE.cd + '. Run tools/aero.sh --table.'
    : 'efficiency: no CD row for the active body. Falling back to Gen 1 Cd ' + BASE.cd + '. Run tools/aero.sh --table.');
  return BASE.cd;
}

/* ── What remains of the booked-Cd era: the record of where it stood when it
      ended. The essay that lived here, on why a coefficient could not be
      measured in this project, was half right: it cannot be measured by
      ARGUMENT. design/cd-rezero.md is the account of measuring it by
      geometry plus published correlation instead, and the CD table above is
      the result. CD_BASIS survives as data for the app and the tools: the
      method's two anchors, its stated band, and the anchors from the real
      world that bound what any figure here may credibly claim. */
export const CD_BASIS = {
  method: 'component buildup over built geometry, tools/aero.js',
  band: 0.15,                        // good to about 15 percent, biased LOW
  anchorGen1: { measured: 0.2018, asserted: 0.21 },
  anchorAhmed: { measured: 0.2060, published: 0.230 },
  anchors: { EQXX: 0.17, 'Lightyear 0': 0.175, 'VW XL1': 0.189,
             'GM Precept': 0.163, 'Ford Probe IV': 0.152, 'Ford Probe V': 0.137 },
};

/* What each row of the waterfall means, why it is there, and what moves it.
   The card is part of the teaching surface, so no term goes unexplained. */
export const LOSS_NOTES = {
  Aero: {
    blurb: 'Energy spent shoving air out of the way.',
    how: 'Aerodynamic drag rises with the square of speed, so this is the term that dominates on the highway and almost vanishes in town. What sets it is CdA, the drag coefficient multiplied by the frontal area the car presents. Both halves matter equally, and a good Cd on a large frontal area is not a good car.\n\nOn the mixed cycle the model uses an effective 86 km/h for this term, weighted toward higher speeds because drag work grows with the cube of speed and the fast part of a journey dominates the average.\n\nBoth halves of CdA are measured off the built geometry here, and to different standards worth knowing. The frontal area is exact: the union of the shadow the body, wheels and pack cast on a plane across the airstream, integrated from the ground up, by one integrator over every generation at once.\n\nThe drag coefficient is A measured estimate. A final coefficient is a wake result and needs a wind tunnel, which this project does not have. Instead every configuration gets a component buildup, the method used to design real cars before their tunnel time: wetted area, section taper, base area and underbody roughness are measured off the triangles, and each is priced by a published empirical coefficient applied identically to every generation. The method reproduces the reference sedan at 0.202 against its accepted 0.21, and the Ahmed body, the standard test shape of car aerodynamics, at 0.206 against its wind-tunnel 0.230, so treat every coefficient here as good to roughly 15 percent and, if anything, flattering. Adopting this measurement in 2026 sent two generations backward, which the ladder shows rather than hides: a rung is bought back with geometry, not bookkeeping.',
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
/* REGEN_RETURN, derived. Two bounds and two efficiencies:
     machine   P / (m v g0) at the cycle mean, which is why a lighter car
               recovers more of its own kinetic energy for free
     tire      mu times the share of weight on the driven wheels, which
               under braking is the front share plus whatever the rear
               still contributes
   times the drive efficiency for the generating direction, times the pack
   round trip from its own battLoss, less the energy under the fade speed. */
export function regenFor(m, massKg) {
  const kw = m.regenKw;
  if (!kw) {
    warnOnce('efficiency: no regenKw for this drivetrain, so REGEN_RETURN falls back to ' +
      REGEN_FALLBACK + '. Add a row: see design/regen-rezero.md.');
    return REGEN_FALLBACK;
  }
  const rear = m.regenRearShare === undefined ? 1 : m.regenRearShare;
  const share = REGEN_FRONT_SHARE + (1 - REGEN_FRONT_SHARE) * rear;
  const gMachine = (kw * 1000) / (massKg * V_MEAN * 9.81);
  const gAuth = Math.min(gMachine, REGEN_MU * share) * share;
  /* CUMULATIVE AND CONTINUOUS, not a sum over buckets. A step table makes
     the mass lever discontinuous, because authority is P/(m v g0) and a
     hundred kilograms can tip the car across a bucket edge, which
     tools/levers.sh correctly reported as a CURVED rate on Gens 1 and 2.
     The cliff is an artifact of tabulating a distribution that is smooth
     in reality, so the table is read as a cumulative curve and
     interpolated within the bucket the authority actually lands in. */
  let capture = 0, prevG = 0;
  for (const [g, sh] of REGEN_DECEL) {
    if (gAuth >= g) { capture += sh; prevG = g; continue; }
    const span = g - prevG;
    if (span > 0) capture += sh * Math.max(0, Math.min(1, (gAuth - prevG) / span));
    break;
  }
  const tail = Math.pow((REGEN_FADE_KMH / 3.6) / V_MEAN, 2);
  return capture * m.driveEff * (1 / m.battLoss) * (1 - tail);
}

/* THE COOLING RE-ZERO, 2026-08-30. The fifth, and the argument is in
   design/cooling-rezero.md and tools/cooling.js. The short form:
   tools/aero.js charges every body a flat 0.008 of Cd for cooling flow,
   on Hucho's authority, and Hucho's figure is a measurement of
   CONVENTIONAL cars. A radiator on a combustion car is sized to reject
   tens of kilowatts. This car at the cycle mean rejects 501 W, and it has
   been billed as though it rejected 2,287, which is what Gen 1 rejects.

   Cooling drag is the momentum thrown away by the air taken in to carry
   the heat off, so it scales with the heat and inversely with the area it
   is spread over. Both are known per configuration. The LEVEL stays
   empirical and stays exactly the number already carried, anchored at
   Gen 1 where Hucho's measurement actually applies; only the RATIO
   between rungs is derived, and the ratio carries no judgment because the
   two things a derivation would have to assume, the air-side temperature
   rise and the fraction of heat leaving through the nose, are uniform
   multipliers that cancel in it.

   This sits here rather than in tools/aero.js for the same reason frontal
   area and the drag coefficient sit here: it is a property of the
   CONFIGURATION, not of a body, and aero.js is a geometry instrument that
   has no business knowing a drivetrain's efficiency. aero.js keeps its
   flat constant for its own absolute reporting and computeBudget swaps it
   for the derived term below. THE PUBLISHED CD TABLE THEREFORE CARRIES
   COOLING AT THE FLAT 0.008 AND THE BUDGET DOES NOT USE IT AS-IS. That is
   stated again in the CD table's own header.

   No generation may claim these miles. Same rule as the fourth re-zero. */
const COOL_ANCHOR = 0.008;      // what aero.js bills, and Gen 1's true value
const COOL_REF_Q = 2287;        // W, Gen 1's waste heat at the cycle mean
const COOL_REF_AREA = 2.4045;   // m2, Gen 1's frontal area
/* Both reference figures are Gen 1's, printed by tools/cooling.sh. They are
   constants because Gen 1 is a fixed rung; regenerate them there if it ever
   moves. */

/* Waste heat at the cycle mean: what the drivetrain, the pack and the
   auxiliary bus all end up rejecting. */
function wasteHeatW(m, massKg, cd) {
  const fAero = 0.5 * AIR * cd * m.area * V_AERO * V_AERO;
  const fRoll = m.crr * massKg * G;
  const pWheel = (fAero * (V_AERO / V_MEAN) + fRoll) * V_MEAN;
  const pDrive = pWheel / m.driveEff;
  const pBatt = pDrive + m.auxW;
  return (pDrive - pWheel) + pBatt * (m.battLoss - 1) + m.auxW;
}

/* The cooling term this configuration actually earns. Cooling drag is part
   of the drag that sets the heat, so this is a fixed point; it is reached
   in two passes because the term is a few percent of Cd and the feedback
   is a few percent of that. The third pass moves the fifth decimal. */
export function coolingFor(m, massKg, cdWithFlat) {
  let cd = cdWithFlat, cool = COOL_ANCHOR;
  for (let i = 0; i < 2; i++) {
    const q = wasteHeatW(m, massKg, cd);
    cool = COOL_ANCHOR * (q / COOL_REF_Q) * (COOL_REF_AREA / m.area);
    cd = cdWithFlat - COOL_ANCHOR + cool;
  }
  return cool;
}

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
  /* after the loop, because area and coefficient are properties of the
     configuration and no single slot's entry is allowed to set either */
  m.area = areaFor(activeIds);
  m.cd = cdFor(activeIds);
  /* swap aero.js's flat cooling constant for this configuration's own.
     m.cd carries the corrected value from here on, so everything
     downstream, the app's readout included, sees the real coefficient. */
  const coolCd = coolingFor(m, massKg, m.cd);
  m.cd = m.cd - COOL_ANCHOR + coolCd;
  /* after both, so an override can move the quantities the loop is not
     allowed to set */
  if (over) Object.assign(m, over);

  const fAero = 0.5 * AIR * m.cd * m.area * V_AERO * V_AERO;   // N
  const fRoll = m.crr * massKg * G;                            // N
  const eKin = 0.5 * massKg * V_MEAN * V_MEAN;                 // J per event

  const whKmAero = (fAero * 1000) / 3600 / m.driveEff;
  const whKmRoll = (fRoll * 1000) / 3600 / m.driveEff;
  const regen = regenFor(m, massKg);
  const whKmKin = (eKin * ACCEL_PER_KM * (1 - regen)) / 3600 / m.driveEff;
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
              battLoss: m.battLoss, driveEff: m.driveEff, regen,
              coolCd, cdFlat: cdFor(activeIds) },
  };
}
