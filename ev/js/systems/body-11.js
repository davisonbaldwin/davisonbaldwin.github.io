/* Gen 11 body: the section.

   Every body on this ladder has had ONE width. A flank ran up from the sill
   to the beltline at more or less one half-width, and the pack hid under it.
   design/gen11.md section 3 breaks that, and the shape it leaves is new to
   this project: a WIDE PAN UNDER A NARROW TUB. The greenhouse comes to
   |z| 0.600, which is 1.20 m built, and the floor plan stays at |z| 0.7800
   because that is where battery-11's cells and its sill are and they do not
   move. Between the two there is a shoulder, and getting the shoulder right
   IS the generation.

   WHY THE PAN IS ALLOWED TO BE WIDER THAN THE CABIN, measured rather than
   assumed. At the cells' own height, y 0.1115 to 0.2755, there is no body
   beside them: body-9's lowest flank vertex mid-car is y 0.2800. And the
   tire column is |z| 0.6725 to 0.8075 at the held 1.48 track, so the pack's
   outer face at 0.7800 stands INSIDE a shadow the frontal-area union already
   counts. A union cannot charge twice for one shadow. What the wide pan
   really costs is the sliver between the flank at 0.600 and the tire inner
   face at 0.6725, which design/gen11.md measured at +0.0571 m2 with the
   shipped integrator, and the shoulder fairing that closes it costs a
   further +0.0010 m2 over 50 to 200 mm of height because anything below the
   tire top at y 0.710 is already inside that same shadow.

   SO THE SHOULDER IS DRAWN AT 170 mm OF HEIGHT AND IT STOPS AT y 0.6200,
   90 mm UNDER THE TIRE TOP, and that is its BUILT top rather than its
   intended one. It runs from the pan flange top at (0.7800, 0.4500) through
   (0.7500, 0.5000) and (0.6900, 0.5600) to the flank base at (0.6000,
   0.6200). Every one of those four points is below y 0.710 and therefore
   inside the tire's own projection, which is the whole reason the fairing is
   nearly free. Let it rise above 0.710 and it starts buying silhouette at
   0.09 m2 per meter of height, which is the price design/gen11.md section 3
   puts on height at this width.

   AND IT STOPS IN X, WHICH IS THE CORRECTION THAT MATTERS MORE THAN ANY
   OTHER IN THIS FILE. The first draft of this module ran that section from
   x 1.450 to -1.850, which is straight through both axles, and the result
   was measured with the shipped predicate rather than argued about:
   body-9 against wheels-10 is 0 penetrating part pairs and that draft was 7,
   plus drivetrain and suspension. Its shoulder crossed drivetrain-9's stator
   rings 542 times at 30.46 mm, its rotor rings 287 times at 36.03, the tires
   264 times, the discs 132 at 19.55, the calipers 197, and its skin crossed
   the discs 260 times. Seventeen NEW penetrating pairs against a body-9
   baseline of eleven.

   The reason is one measurement and it decides the whole lower section.
   ABOVE y 0.6200 the innermost carried material outboard of |z| 0.5900 is
   the tire at 0.6725, so a 0.6000 flank is clear by 72.5 mm at every station
   on the car. BELOW y 0.6200 there is no half-width that clears a wheel
   corner at all: suspension-9's front knuckle reaches |z| 0.5198, its rear
   structure 0.4440, wheels-10's calipers 0.5640 and drivetrain-9's front
   unit 0.5712. So the lower four profile points take one of exactly two
   forms and nothing in between. Over battery-11's sill they are the
   shoulder. At every wheel station they are an ARCH: a 12 mm return under
   the flank base and then nothing, so the body simply has no material below
   y 0.6200 there. The shoulder is full section from x 1.030 to -1.030,
   which is battery-11's own 28-screw run to the digit, and closed to the
   flank base by x 1.120 and -1.120. The nearest tire vertex is at
   |x| 1.0980, so the full section stops 68.0 mm short of it in x and the
   closure station stops 22.0 mm short. Re-swept, all seventeen of those
   pairs are gone.

   That is what an open-wheel car looks like from underneath, and it is not a
   compromise forced on the loft: the arch line rising over each wheel is the
   same statement the paragraph below makes about deleting the fairings, drawn
   rather than described.

   WHAT THIS BODY GIVES UP TO GET THERE, NAMED BEFORE ANYTHING ELSE, because
   it is the largest capability cost on the rung and design/gen11.md section
   9 does not list it.

   THE WHEELS ARE NO LONGER ENCLOSED. body-9 wrapped its front wheels in
   sealed pods holding 0.925 half-width and its rear wheels in closeouts at
   |z| 0.715. On a car whose flank is 0.600 and whose track is 1.48, all four
   tires stand entirely outside the bodywork: |z| 0.6725 to 0.8075 against a
   flank at 0.600. Enclosing them would mean growing back to 0.82 half-width
   at every arch station, which is exactly the fairing this generation exists
   to delete. So the front fairings, the rear arch closeouts and the active
   arch louvers all go, and with them 13 kg, the louver bank's cooling path
   and the sealed-pod story body-7 through body-9 told. Three real
   consequences and none of them is aerodynamic:

     - Spray and stone throw off four open tires land on the flank and on the
       glass rather than inside a liner. This body draws no mudguard, because
       a guard over the tire crown would stand at y 0.710 to 0.760 and buy
       new silhouette at exactly the rate the paragraph above prices.
     - Full mudguard coverage is a type-approval requirement in most markets
       this car would be sold in, and an open-wheel car is a track or
       low-volume registration in several of them. This is a legal cost, not
       a styling one, and it is stated here rather than left to be found.
     - The one thing it does NOT cost is frontal area, because the tire
       column is a union term that was already being paid.

   A guard that hugged the tire from |z| 0.6725 to 0.8075 and stayed under
   y 0.710 would be free on the same argument as the shoulder. It is not
   drawn here because it needs the swept steered envelope of wheels-11, which
   does not exist yet, and drawing it against wheels-10's envelope is exactly
   the mistake body-8 made at its own front lip. It is handed on.

   THE LENGTH. 4.8288 m BUILT, taken entirely from the tail. The nose is held
   station for station because it is crash budget: stations 0, 1 and 2 keep
   body-9's x, so the crush stroke ahead of the front megacasting is
   unchanged and the hood leading edge keeps its 43 degree pedestrian
   geometry. Everything aft of x -1.850 is compressed on the measured 18.4
   degree plan half-angle, so the flank closes 0.600 at -1.850 to 0.4028 at
   the Kamm face at -2.4427, and the built car measures 4.8288 m nose to
   tail against body-9's 5.1623.

   THE 4.8288 IS THE MEASUREMENT AND 4.8300 WAS A TRANSCRIPTION. An earlier
   self-check on this module reported 4.8300 PASS, and it got there from a
   forward-most x of 2.3843 typed into a note. Swept, the forward-most vertex
   on this body is the intake gates' actuator boss at x 2.383143 and the
   rearmost is the rear light band's back face at -2.4457, which is 4.82884 m.
   design/gen11.md books 4.83 m and 4.8288 rounds to it, so nothing in the
   contract moves; what moves is that this file now states the number its own
   geometry produces rather than the number it was aiming at.

   THE NOSE IS HELD IN X AND NOT IN Z, AND THE CRASH STRUCTURE MOVED WITH IT.
   A 1.30 m bumper beam on a 1.20 m car is not a car. The beam comes to 1.00 m
   at |z| 0.500 and the rails to |z| 0.440, and that FIXES a condition body-9
   inherited from body.js and named as a debt: its beam corner stood 14.9 mm
   OUTSIDE the nose loft at (2.27, 0.50, +-0.65). Measured on this loft the
   same corner sits 40.6 mm inside the skin. Coverage goes from 1.30 m of a
   1.850 m body to 1.00 m of a 1.200 m body, 70 percent to 83, and the two
   rails still absorb the same 55 kJ because neither section nor stroke
   changed.

   THE CASTINGS, AND A REFUSAL. This module was asked to hold the front and
   rear casting |z| at body-9's built values and declare them as an interface
   with suspension-9. It holds every plane suspension-9 actually lands on and
   it does NOT hold the bounding boxes, because those two are not the same
   thing and the numbers say so. body-9's front-casting reaches |z| 0.5950
   and that is its RAIL AND CRADLE SPAR, drawn to put its outer wall in the
   plane of a crash rail at 0.550. body-9's rear-casting reaches |z| 0.6250
   and that is its REAR BUMPER BEAM, a 1.25 m span. Neither is a suspension
   interface, and a 1.25 m rear beam does not fit inside a tail that closes
   to 0.4028 half-width. What IS held, to the digit, off suspension-9's built
   mesh:

     front tower pad     (1.545, 0.745, +-0.430), |z| 0.310 to 0.550,
                         receiving its tower plate at (1.50, 0.735, +-0.41)
                         and its damper top at (1.50, 0.72, +-0.41)
     subframe mounts     |z| 0.500 at x +-1.72, which is the plane its own
                         seats sit on at (x, 0.297, +-0.50)
     rear cradle mount   the same plane at x -1.72

   Both are declared as interfaces below. suspension-9 declares none of its
   own, so both keys are UNMET and will warn on every run of
   tools/check-interfaces.sh until suspension-9 is amended. That is a warning
   and not a failure, it is visible rather than silent, and it is the correct
   state for a plane one module has written down and the other has not.

   THE ROOF, AND THE FLOOR UNDER IT, WHICH ARE ONE PROBLEM AND WERE SOLVED
   AS TWO. The roof is BUILT at y 1.3300 and the thing that measures 1.3300
   is the glass, 8 mm proud of a loft crown at 1.3220, which is the same
   convention body-9's built roof of 1.3680 was measured on. It is flat from
   x 0.300 to -1.120, which covers both head positions at the measured
   0.815 m tandem pitch.

   THE PACK LID IS THE CABIN FLOOR AND THIS MODULE NO LONGER BUILDS A SECOND
   ONE. An earlier draft drew a structural pan across the cabin at y 0.3500
   to 0.4517, 150 mm above battery-11's lid at 0.3020, and it made the
   generation impossible. design/gen11.md section 5's own occupant relation,
   which it says reproduces the shipped car to 0.2 mm, is
   crown = 0.407 + 0.965 cos t + 0.1025 sin t over the LID. At t = 36 degrees
   that is 1.24795 m. Add 150 mm of second floor and the crown is 1.39795,
   which is 108.6 mm through a 1.320 roof and 67.6 mm through even the 1.330
   this module now builds. interior-6 states the principle in its own header
   and draws no floor of its own for exactly this reason, and it has been
   true on every rung since Gen 5.

   So the pan is structure OUTBOARD of the cabin and nothing else, and the
   numbers fall out clean. Occupant crown 1.24795 over the lid. The three
   transverse roof bows are 20 mm tubes centered on y 1.3090 whose crowns
   touch the loft at 1.3190, so the soffit a liner hangs on is y 1.2990,
   31.0 mm under the built roof. Measured over the head corridor, |z| within
   0.15 and x 0.350 to -1.150, the lowest structure this body puts anywhere
   above the occupant is exactly that soffit at 1.2990, and the clearance is
   51.1 mm. design/gen11.md section 5 books a 1.33 m roof for 50 mm; this
   body hits it with 1.1 mm to spare, on 31.0 mm of structure rather than the
   30 the stack budgets.

   interior-11 still owns the gate and tools/occupant.sh cannot be run end to
   end until it exists. What this module can say is the plane its own
   structure leaves and the clearance under it, both measured off the built
   cage in the self-check rather than budgeted.

   SIDE IMPACT, WHICH design/gen11.md SECTION 9 ITEM 7 SAYS THIS BODY MUST
   EITHER FIX OR STATE. It is fixed at hip level and inherited above it, and
   both halves are geometry rather than intent. Fixed: body-9's rocker beam,
   100 by 70 mm at |z| 0.845 to 0.915, is DELETED from this module and its
   job is battery-11's structural sill, one extrusion from y 0.1035 to 0.4200
   with six chambers, whose head carries 120 mm of chambered section from
   |z| 0.6600 to 0.7800 across the whole 118 mm of height where a hip is.
   That is the measured figure and not the 130 mm an earlier draft of both
   modules claimed: the head's inner wall stands 10.0 mm outboard of the cell
   face at 0.6500, and battery-11's own z-ray prints the four walls.
   This module lands on it on two declared planes and that is the whole load
   path at hip height. Inherited: above y 0.4500 this body
   is a 1.1 mm CFRP skin with a cage behind it and NO door beam, NO inner
   panel and NO reinforcement, which is exactly what the feasibility measured
   on body-9's door aperture at 0.9 to 1.6 mm. A narrower car makes that
   worse per occupant, not better. The honest statement is that the sill is
   a real fix at hip level and the shoulder band is an inherited defect that
   an interior or a body generation still owes.

   Gen 11 preset partners, all cited from BUILT geometry:
   battery-11 (sill outer face |z| 0.7800, head inner face 0.6600, top
   y 0.4200, lid top 0.3020, 28 flow-drill screws a side over x -1.03 to
   1.03), suspension-9 (tower plate (1.50, 0.735, +-0.41), damper top
   y 0.729, subframe seats at |z| 0.500, air-supply reaching |z| 0.6174 at
   y 0.3020 to 0.3355), wheels-10 (tire column |z| 0.6725 to 0.8075, y 0 to
   0.710, nearest vertex to the centerline at |x| 1.0980), drivetrain-9
   (front-unit aft face x 1.3261), and the four Gen 11 modules that do not
   exist yet, which is why nothing here is mounted on prose.

   Mass ledger, binding plus or minus 3 kg: 144 kg structure + 109 kg shell
   = 253 kg, against body-9's 200 + 152 = 352. The cage gained 4 kg for the
   sill rail and its two legs and the pan lost 9 by ceasing to be a floor.
   The credit is 99 kg and this module does not book it: design/gen11.md section 4 books the body credit
   at ZERO and the rule both preceding design documents broke is that a
   module states its ledger and the integrator books it once, at the end. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';
import { mirrorZ } from './body.js';

/* Gen 11's envelope, declared LOCALLY. Not one P constant is touched, the
   way body-9 declared its own FRONTZ rather than editing P.wheelZ. */
const FRONTZ = 0.74;          /* front wheel center, track HELD at 1.48 */
const CABIN = 0.600;          /* greenhouse half-width, 1.20 m built */
const ROOF = 1.330;           /* built roof, design/gen11.md section 5 */
const SILL_Z = 0.7800;        /* battery-11 sill outer face */
const SILL_TOP = 0.4200;      /* battery-11 sill top face */
const HEAD_ZI = 0.6600;       /* battery-11 sill head inner face */
const PAN_T = 0.0300;         /* pan section, 30 mm */
const PAN_FLANGE = SILL_TOP + PAN_T;   /* 0.4500, the loft's bottom edge */
const PAN_X = 1.030;          /* pan half-length: battery-11's screw run */
const SHOULDER_X = 1.030;     /* the shoulder is full section to here */
const ARCH_X = 1.120;         /* and closed to the flank base by here */
const KAMM = -2.4427;         /* tail station */

export const SYSTEM = {
  id: 'body-11',
  name: 'Body · Gen 11 wide pan, narrow tub',
  color: 0xdcf2fb,
  explode: [0, 1.7, 0],
  blurb: 'The first section shape on this ladder that is not one width. The greenhouse comes to |z| 0.6000, 1.2000 m built and measured, around two occupants in tandem, while the floor plan stays at 0.7800 because that is where battery-11\'s cells and its merged sill are and they do not move. Between them is a 170 mm shoulder that stops at y 0.6200, ninety millimeters under the tire top, so every square meter of it is inside a shadow the frontal-area union already pays for. The shoulder exists over the sill and nowhere else: full section from x 1.030 to -1.030 and closed to the flank base by 1.120, because below y 0.6200 there is no half-width at all that clears a wheel corner and the body therefore draws nothing down there at any wheel station. Above y 0.6200 a 0.6000 flank is clear of the nearest tire by 72.5 mm. There is no cabin floor in this module: battery-11\'s lid at y 0.3020 is the floor, as it has been since Gen 5, and a pan across the cabin puts the occupant\'s crown 67.6 mm through the roof. The pan is structure outboard of the cabin only, a flange and an upstand on the sill top, and the safety cage lands on it at y 0.4500. Roof 1.3300 built, 51.1 mm of head clearance under the bow soffit at 36 degrees. The tail is compressed to 4.8288 m built on the measured 18.4 degree plan half-angle with the nose held station for station as crash budget, and the bumper beam comes to 1.00 m, which fixes the 14.9 mm the beam corner had stood outside body-9\'s skin since body.js. 253 kg against body-9\'s 352, booked at zero.',
  interfaces: {
    /* ── THE SILL, DECLARED ON BOTH FACES. design/gen11.md section 7 gives
       this joint to battery-11 and body-11 jointly and says neither can make
       it alone, which is why nothing found it for ten generations.

       AN EARLIER DRAFT DECLARED BOTH KEYS WITH extent min AND BOTH WOULD
       HAVE FAILED, which is worth writing out because the failure is in what
       an extent MEANS rather than in a number. realize() in
       tools/interfaces.js takes lo and hi over EVERY vertex of the named
       part, not over the face the note describes, and extent min fails when
       lo is below the plane by more than tol. That draft declared |z| 0.7800
       extent min on a part whose built |z| spanned 0.1600 to 0.7800, because
       it was a floor that crossed the car, so it UNDERRAN its own
       declaration by 620 mm.

       The fix is the one the checker is designed for: declare a key on a
       part whose extents are true of all of it. This pan is now nothing but
       the flange and its upstand, so every vertex of it sits at y >= 0.4200
       and |z| <= 0.7800, and the two clauses below are true of the whole
       part rather than of one face of it.

       |z| 0.7800 is declared extent MAX on both sides. battery-11 says its
       sill stops there and this module says the pan flange stops there too,
       and REALIZATION is what proves the pan arrives: the checker demands a
       vertex within 2 mm of the plane, so max plus realization is exactly
       "reaches it and goes no further". extent min is not available to this
       half at all, because it would assert that no vertex of the pan is
       inboard of 0.7800, which is a pan 0 mm wide.

       y 0.4200 is declared extent MIN here against battery-11's MAX. That
       pair is the one that carries a real load: the sill may not grow above
       the plane and the pan may not sink below it, so a pan drawn floating
       in the cabin fails as loudly as a sill that grows into the body. ── */
    'sill-outboard': {
      kind: 'face', axis: 'z', at: 0.7800, tol: 0.002,
      part: 'floor-pan', mirrored: true, extent: 'max',
      note: 'battery-11 sill outer face. The pan flange runs out to it and stops, and battery-11 declares the same plane with the same extent; realization is what proves the flange arrives.',
    },
    'sill-top': {
      kind: 'face', axis: 'y', at: 0.4200, tol: 0.002,
      part: 'floor-pan', mirrored: false, extent: 'min',
      note: 'battery-11 sill top face, which is body-9\'s rocker top carried to the digit. The pan flange seats on it over |z| 0.6600 to 0.7800 and nothing in this part is below it.',
    },
    /* ── THE CASTINGS. Declared because design/gen11.md asks for it and
       because suspension-9 is carried whole and lands on them. Read the
       header for what is held and what is not: these are the planes its own
       seats sit on, not the castings' bounding boxes. Both keys are UNMET
       until suspension-9 declares its half, and an unmet key warns rather
       than fails, which is the visible state and the right one. ── */
    'front-subframe-mount': {
      kind: 'face', axis: 'z', at: 0.5000, tol: 0.003,
      part: 'front-casting', mirrored: true,
      note: 'inner face of the front subframe bushing boss at x 1.72, the plane suspension-9 seats at (1.72, 0.297, +-0.50). Held to the digit from body-9 and from suspension-4 before it.',
    },
    'rear-cradle-mount': {
      kind: 'face', axis: 'z', at: 0.5000, tol: 0.003,
      part: 'rear-casting', mirrored: true,
      note: 'inner face of the rear cradle bushing boss at x -1.72, the plane suspension-9 seats at (-1.72, 0.297, +-0.50).',
    },
  },
  /* THE DOOR, and the package chose it rather than the styling.

     A tandem cabin produces one aperture a side and this one is 1.789 m long,
     measured on the built leaf between the cuts at x 0.8483 and -0.9411. Hang
     that on a vertical hinge at its forward cut and the arithmetic is
     immediate and fatal: the trailing edge reaches |z| 2.247 at 67 degrees
     against a parked half-width of 0.809, so the door would want 1.438 m of
     clear ground beside a car that is only 1.618 m wide. Every other rung on
     this ladder needs between 0.64 and 0.97 m. The longest door on the car
     would need the most room by half again, on the narrowest body, which is
     the exact opposite of what a narrow car is for.

     So it rotates about a fore and aft axis along its own top edge and lifts
     instead. The panel is 421 mm deep and the sill edge swings up and
     outboard together, so what a stall has to give it is a fraction of the
     arc a swing door sweeps. That is the whole argument: on a wide car a
     vertical hinge is merely expensive, and on a 1.20 m tandem cabin it is
     unbuildable, so the axis has to lie down.

     The glass does not come with it. body-11's canopy is one bonded band
     across both flanks and the roof, so there is no seam to open it on, and
     the aperture is the 421 mm of flank rather than a full door opening.
     interior-11 and the canopy panel both already book what that costs an
     occupant getting in. */
  closures: {
    door: {
      name: 'Canopy door',
      kind: 'door',
      part: 'doors',
      mass: 19,
      seconds: 1.6,
      seat: 'Deck shoulder at y 1.3030, axis along x at |z| 0.3685, inboard of the cage roof rail',
      motion: [
        { kind: 'swing', axis: [1, 0, 0], pivot: [0, 1.3030, 0.3685], deg: -50 },
      ],
      why: 'The axis lies along the car instead of standing across it, and that is forced by length. A door on a vertical hinge sweeps its own length times the sine of its angle, so the cost of opening it grows with the aperture, and a tandem cabin makes the aperture as long as the cabin: hung on a vertical hinge at its forward cut, the trailing edge of this leaf reaches |z| 2.247 at 67 degrees against a parked half-width of 0.809, so it would want 1.438 m of clear ground beside a car that is only 1.618 m wide. Rotating about a fore and aft axis makes the cost grow with the panel depth instead. Measured, that is 231.5 mm of curbside, and the panel never leaves a 2.50 m stall at any point in its travel.\n\nThe leaf is the flank and the tumblehome together, and that pairing is the whole of what makes this a door rather than a hatch. The flank alone opens 408.8 mm between its own lower edge at y 0.6192 and the canopy band above it, over a shoulder standing at |z| 0.7275 with the sill top at y 0.4200. A 409 mm letterbox above a 620 mm sill is not ingress by any definition. Taking the glass up to the deck shoulder with it opens 683.8 mm, from the flank base at 0.6192 to the fixed roof band at 1.3030, which is a low sports car\'s door and a car somebody can get into.\n\nWhere it parts is the argument, because a bonded structural band cannot open and this body needs one. The cage carries the side ring, A-pillar to roof rail to C-pillar, with three transverse bows across the roof and its rails at |z| 0.300, and deleting the B-pillar put the mid-span side load into battery-11\'s sill. So the piece that must stay bonded is the roof band between the two deck shoulders, sitting over the bows and the rails, and that is exactly the piece left behind: ring 6 to 10. What travels is ring 10 to 12 each side, the tumblehome between the deck shoulder at y 1.3030 and the beltline seam, which spans nothing structural at all. The rails are inboard of it and the sill is below it. The parting line is the deck shoulder, which this module already declares as a hard crease, so the seam a door needs lands where the painted surface already breaks rather than across a face meant to be smooth.',
      cost: [
        'It needs headroom rather than curb: 69.6 mm above the parked car at full travel, measured, so a garage that clears the car clears the door by a hand\'s width and no more. A swing door has no such constraint at all.',
        'A 2.15 m panel carrying its own glass on a horizontal axis is held in torsion by its hinge for its whole length, and it is held up by struts against its own weight rather than by a check strap against a gust. That is the failure mode: a strut that has lost pressure drops 19 kg of door and glass onto whoever is under it, so this wants a mechanical lock at full open and not just gas.',
        'The tumblehome is no longer bonded along the beltline seam or the deck shoulder, so the two joints that used to be structural adhesive are now a seal and a hinge line. The roof band still is, which is why the cage keeps its bows, but a laminate that carried shear across the whole greenhouse now carries it across two thirds of one.',
        'Rain and a wide sill: the opening is 683.8 mm tall but its lower edge is 619 mm off the ground and the shoulder outboard of it stands at |z| 0.7275, so an occupant still crosses a sill on the way in. The door makes ingress possible rather than easy, and a tandem cabin was never going to make it easy.',
      ],
    },
    /* ── THE TWO LIDS, AND THE ONE RULE THEY SHARE ─────────────────────
       Both were drawn as grooves and neither opened, which is what Davis
       saw: this car has had the LINES of a hood and a decklid since the
       shutlines were declared, and the panels ran straight over the top of
       both. Making them open is a re-slice of the master grid at indices
       that were already in it, and the only thing that had to be designed
       is the axis.

       THE AXIS OF A LID ON THIS BODY CANNOT LIE IN ITS OWN CUT, and that is
       measured rather than styled. Two properties of a deck do it. The cut
       line is a curve: the hood's is cambered 17.7 mm from y 1.0674 at the
       crown to 1.0497 at its outboard ends, the decklid's 23.6 mm from
       1.3076 to 1.2840. And the deck does not stop rising at the cut: past
       the hood's cut it goes on up 7.6 mm to the cowl crown at y 1.0750,
       and past the decklid's up 14.4 mm to the roof crown at 1.3220. So an
       axis laid in the cut is an axis buried under the panel it has to
       swing past, and every point of the cut that is not exactly on it
       sweeps sideways into that panel as the lid turns.

       Swept at 60 degrees against the whole gen11 preset, per axis:

         hood, axis at the cut's outboard end y 1.0497   3.603 mm into the skin
         hood, axis 20 mm under the cut  y 1.0474        3.420 mm
         hood, axis at the cut's crown   y 1.0674        0.024 mm
         hood, axis at the cowl crown    y 1.0750        clean, and clean to 90
         lid,  axis at the cut's outboard end y 1.2840  11.009 mm into the skin
                                                        and 7.341 mm deeper into the cage
         lid,  axis at the cut's crown   y 1.3076        clean to 66, 0.106 mm at 68
         lid,  axis at the roof crown    y 1.3220        clean, and clean to 90

       body-9 solved the same problem the other way, by pinning the crown of
       a cut cambered 220.9 mm so that everything else on the line withdrew,
       and its panel is worth reading for how much worse that case is. What
       makes the axis affordable here is the size of the rise: 7.6 and
       14.4 mm fits inside the hinge hardware, because a link that carries an
       axis a centimeter above the paint is a hinge and one that carries it a
       hand's width above the paint is a mast. Neither lid needs a second
       stage because of it. A ten millimeter pop-up before the swing was
       drawn and measured as the alternative and it is worse: lifted 6, 7 and
       8 mm the hood crosses the cowl band by 1.009, 0.888 and 0.447 mm,
       because a cut line standing above its axis sweeps AFT as it turns
       rather than forward, and only at 10 mm does it clear the band
       entirely. The 5 mm shutline is what opens as the panel leaves its
       seat. ── */
    hood: {
      name: 'Hood',
      kind: 'hood',
      part: 'skin',
      mass: 6.5,
      seconds: 1.2,
      seat: 'Aft cut at x 1.1286, axis carried up to the cowl crown at y 1.0750, which is 7.6 mm above the panel it hinges',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [1.1286, 1.0750, 0], deg: 60 },
      ],
      why: 'Hinged at the back, which airflow chooses rather than the packaging. A hood hinged at the nose that loses its latch at speed is caught by the air and thrown open into the glass; hinged at the cowl, the same failure is a panel the air holds down. That is the whole of why the axis is at x 1.1286 and not at x 2.2173, and it is the one decision on this closure that no measurement on this car could have made.\n\nWhere the axis sits is the measured part, and the section above gives the sweep: on the axis a drawing would use, the outboard end of the cut at y 1.0497, this panel drives 3.603 mm into the fixed cowl band at 60 degrees. On the crown of its own cut it still crosses by 0.024 mm, which is five times the 5 micrometer tolerance every penetration check on this project shares and therefore a real crossing rather than noise. Carried up to y 1.0750, the crown of the cowl deck it swings past, it is clean at every angle from 0 to 90.\n\nAnd it opens onto A frunk, which is a correction to something already in writing. interior-11 states that the frunk is spoken for, because hv-11\'s buffer runs x 1.798 to 2.016 and thermal-11\'s heat pump x 1.789 to 2.047, and that is exactly true of P.frunk, the declared zone at x 1.78 to 2.12. The hood is not cut on P.frunk. It runs x 2.2173 to 1.1286, so the zone is 340 mm of a 1.089 m aperture, and the rest of it is over volume nobody had booked. Swept on a 25 mm grid and then verified triangle by triangle against every part in the preset, the largest empty box under this panel is 475 by 600 by 255 mm, 72.7 liters, at x 1.275 to 1.750 and y 0.725 to 0.980: forward of interior-11\'s dashboard, which ends at x 1.246, aft of the heat pump, and above hv-11\'s spine, which is what sets its floor. That is a carry-on and a soft bag, and it is a real number rather than a bounding box, which matters here because interior-11\'s own panel records losing two rear trays to exactly that mistake.',
      cost: [
        'It spends height where a door spends width: 60 degrees puts the leading edge at y 1.917, which the checker measures as 578.2 mm over the parked car. Geometry is not what stops it there, since the sweep is clean to 90, and neither is access, since the bay under it is 255 mm deep and fully open by 60. What stops it is the strut, the wind load on a 0.685 m2 panel standing near vertical, and the garage.',
        'The axis stands 7.6 mm proud of the paint, so the hinge is a link and a bracket rather than a butt pin, and its bearings are in the weather at the top of the cowl where water runs off the windshield. That is the same bill body-9 paid at its door for the same reason, on a rung that had deleted the step a hinge hides in.',
        'Six and a half kilograms is 4.72 kg of laminate at this skin\'s own measured areal density, 6.89 kg per square meter over 0.6849 m2, plus hinges, latch, seal and two struts. The strut is a safety part: a 1.089 m panel standing at 60 degrees over a bay somebody has their hands in falls on their forearms if it loses pressure.',
        'The frunk is measured, not built. There is no liner, no floor, no drain and no latch for a load in it anywhere in this model, and the 72.7 liters is the volume between hv-11\'s spine and the underside of the paint. Somebody has to draw the box before the number means luggage.',
      ],
    },
    decklid: {
      name: 'Decklid',
      kind: 'decklid',
      part: 'skin',
      mass: 6,
      seconds: 1.4,
      seat: 'Front cut at x -1.1600, axis carried up to the roof crown at y 1.3220, which is 14.4 mm above the panel it hinges',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [-1.1600, 1.3220, 0], deg: -60 },
      ],
      why: 'Hinged at the front, at the cut 40 mm aft of where the canopy glass ends, so the whole panel swings up and away from the cabin and nothing it carries ever crosses the plane of the hinge. The axis is at the roof crown for the reason the section above measures: in its own cut, at the crown, this lid is clean to 66 degrees and crosses the fixed skin by 0.106 mm at 68; on the outboard end of the cut it crosses by 11.009 mm and drives 7.341 mm deeper into this module\'s own cage rails at full travel. Carried up 14.4 mm to y 1.3220 it is clean to 90 and the published 60 has 30 degrees of margin in it.\n\nWhat it opens onto is the part worth reading, and it is not A trunk. interior-11 says so in as many words, "There is no trunk", and it is right: swept, the bay under this lid holds autonomy-11\'s compute stack and GNSS unit, hv-11\'s rear runs, converter and zone drops, drivetrain-9\'s torque-vectoring controller and this module\'s own rear casting. What the lid actually exposes is two things and they should be counted separately.\n\nThe first is interior-11\'s 61 liter locker, x -1.395 to -1.150, and 235 of its 245 mm sit under this aperture. interior-11 drew it hinged at its forward edge and loaded over the seat back, because when it was drawn there was no other way in; measured, the roof of that locker is at y 1.1132 and the crown of this lid over it runs 1.251 to 1.308, so opening the decklid puts 138 to 194 mm of air over it and it can now be loaded from outside the car. That is the one capability this closure adds that somebody had already asked for, and it is not a clean fit: the locker is 810 mm across and this aperture is 717 mm, so 46 mm of each end of it stays under fixed paint and a case has to go in between the side gaps rather than straight down onto the whole lid.\n\nThe second is 100 liters that nobody has claimed. The largest box under this panel that is verified clear of every triangle in the preset is 500 by 500 by 400 mm at x -2.100 to -1.600, y 0.600 to 1.000, aft of the cage hoop and over the rear casting. interior-11 looked at the volume immediately forward of that, x -1.60 to -1.39, rejected it because the hoop stands in it, and never looked further aft. It is not luggage as it stands: there is no floor, no liner, no tie-down and no trim in it, and the nearest thing under it is drivetrain-9\'s torque-vectoring controller. It is 100 liters of measured air with a lid over it, which is a different claim and a smaller one, and the module that would have to make it luggage is interior-11 rather than this one.',
      cost: [
        'The lid straddles two parts. It runs x -1.1601 to -2.0997 and the tail cone begins at the compression datum x -1.850, so 0.4824 m2 of it is the skin\'s rows and 0.1610 m2 is the tail cone\'s. A closure is one rigid body and carries one part id, so it carries `skin`, and clicking the tail cone no longer selects the strip of deck between x -1.850 and -2.100. That is an honest cost of the re-slice and not a defect: the alternative was to move three quarters of the panel into the other part instead. The 6 kg is 4.43 kg of laminate at this skin\'s measured 6.89 kg per square meter over the lid\'s whole 0.6434 m2, plus hinges, latch, seal and struts.',
        '60 degrees puts the free edge at y 1.997, which the checker measures as 658.3 mm over the parked car and 80 mm higher than the hood, because the lid hinges 247 mm higher up. Anybody loading the bay is reaching under a panel whose edge is at head height, held up by struts on a 6 kg lid.',
        'It opens onto hardware. Under the aft two thirds of this aperture there is no floor at any height between the rear casting and the paint, so anything put in there sits on a controller, a converter or the compute stack unless somebody draws a tray. A lid over a bay with no floor invites exactly the load the bay cannot take.',
        'The tail carries no backlight and this lid carries no glass, so the reversing camera and the sensor suite are the whole of the rear view whether the lid is up or down, and autonomy-11\'s rear hardware sits on the fixed band rather than on the lid, which is why it does not travel with it.',
      ],
    },
  },
  parts: {
    /* ── structure ────────────────────────────────────────────────────── */
    'front-casting': {
      name: 'Front megacasting',
      tagline: 'The tower pad does not move by a millimeter. Everything the suspension does not touch comes in 45 mm with the car.',
      mass: 40,
      specs: [
        ['Counterpart', 'body-9 front-casting, 45 kg: process, alloy and tower pad identical'],
        ['Process', 'High-pressure die cast, vacuum assist, 6,100 t lock'],
        ['Tower pad', '(1.545, 0.745, +-0.430), |z| 0.310 to 0.550, held'],
        ['Subframe bosses', 'x +-1.72 at |z| 0.500 to 0.560, drawn for the first time'],
        ['Spar', '|z| 0.335 to 0.535 (body-9: 0.355 to 0.595)'],
        ['Maturity', 'Production practice; new die, carried process and alloy'],
      ],
      how: 'The casting process is the Gen 1 part and is not reopened: AlSi10MnMg injected at 700 degrees C under partial vacuum, filling the part in under 100 milliseconds, reaching strength by natural aging because a casting this large would warp in a water quench. The crash rails, the upper apron loads and the sill fronts gather here, it stays elastic while the bolted rails ahead of it fold, and every suspension and drive mount is machined in one fixture so the front axle geometry hangs off a single datum.\n\nWhat is held and what moved is the whole content of this panel, because a narrower car is exactly the situation in which a datum gets moved by accident. Held to the digit: the shock tower pad at (1.545, 0.745, plus and minus 0.430), spanning |z| 0.310 to 0.550, which is where body-9 put it to receive suspension-9\'s tower plate at (1.50, 0.735, plus and minus 0.41) and a damper body topping out at y 0.729. Held likewise: the four subframe bushing planes at |z| 0.500, which suspension-4 set and suspension-9 still seats on at (x, 0.297, plus and minus 0.50). Those bosses are drawn here for the first time, as 60 mm cylinders whose inner faces lie exactly on 0.500, because body-9 asserted the interface in prose and put no geometry on the plane, and an interface with no vertex on it is the defect tools/check-interfaces.sh calls realization.\n\nMoved: the rail and cradle spar comes in from |z| 0.355 to 0.595 to 0.335 to 0.535, and the apron rib boss follows it. That is 60 mm off the widest point of the casting and it is not a suspension interface at any height: body-9 set the spar\'s outer wall in the plane of a crash rail at |z| 0.550, and the crash rail moved to 0.440 with the beam. The lower crossmember narrows from 0.68 to 0.56 m for the same reason. Swept against the built partner after the move, suspension-9\'s tower plate still sits 17.5 mm inside the pad, its damper 11.5 mm inside it, and its front air supply line still passes 14.9 mm clear at (1.60, 0.56, plus and minus 0.43).',
      why: 'design/gen11.md hands this module an instruction it cannot follow literally, and the useful work is saying so with the measurement rather than either obeying it or ignoring it. The instruction is to hold the castings\' |z| at body-9\'s built values. body-9\'s front casting reaches 0.5950 and that number is a spar drawn to line up with a crash rail, not a plane any partner lands on. Holding it would put 8 mm of casting outside a 1.20 m flank at hip height and buy nothing at all, because suspension-9 is 45 mm inboard of it. What a carried module actually needs is its own mating planes, so those are held exactly and declared, and the bounding box is allowed to follow the car. The general form is design/retro-gen4.md\'s rule: move geometry around an interface rather than moving the interface, and be specific about which is which.',
      fail: [
        'A new die is a new porosity map: gas porosity is still the process risk, still controlled by vacuum level, still caught by X-ray sampling, and the fleet history of the old tool does not transfer.',
        'The spar came in 60 mm and the tower pad did not, so the rib carrying the pad back onto the spar is 60 mm longer in bending than body-9\'s. That is a fresh topology result rather than a proven one and it is the first thing a body-in-white stiffness rig should measure.',
        'suspension-9 declares no interfaces of its own, so the two keys this module writes down are unmet and warn. A warning is not a check, and until suspension-9 declares its half the only thing proving these planes agree is this file.',
      ],
      explode: [0.85, -0.35, 0],
    },
    'rear-casting': {
      name: 'Rear megacasting',
      tagline: 'The tail lost 333 mm and the casting is where it came from: the same cradle mounts on a beam that no longer overhangs the car.',
      mass: 40,
      specs: [
        ['Counterpart', 'body-9 rear-casting, 50 kg: cradle mounts identical'],
        ['Envelope', 'x -1.60 to -2.20, y 0.30 to 0.72'],
        ['Cradle bosses', 'x -1.72 at |z| 0.500 to 0.560, drawn for the first time'],
        ['Rear beam', '0.90 m span at |z| 0.450 (body-9: 1.25 m at 0.625)'],
        ['Cantilever aft of the rails', '213 mm (body-9: 525 mm)'],
        ['Maturity', 'Production practice, carried process since Gen 1'],
      ],
      how: 'One shot replacing dozens of stamped pieces, thick spring-seat bosses fed by conformal die cooling so solidification stays even and hot tears stay out of the rib junctions, short bolted rails and a beam behind them that take the low-speed hits and unbolt for repair. It carries the rear drive cradle on its bushings and reacts the rear belt and seat anchor loads.\n\nThe tail compression lands here and it lands as a simplification. body-9 hung 525 mm of bonded carbon off its bolted rails at x -2.25 and handed this casting 451 Nm at full airbrake. On a 4.83 m car the Kamm face is at x -2.4427 and the bond pad moves to -2.23, so the cantilever is 213 mm and the same blade at the same download hands the casting about 183 Nm, a 59 percent reduction that nobody designed and everybody gets. The rear beam narrows from 1.25 to 0.90 m because a 1.25 m beam at |z| 0.625 stands 222 mm outside a tail that closes to 0.4028 half-width, which is the same arithmetic that narrowed the front beam and it is the reason this casting cannot hold body-9\'s built |z| of 0.6250. What is held is the cradle mount plane at |z| 0.500 at x -1.72, drawn here as a real boss for the first time, and the C-pillar node, which moves inboard with the cage to (-1.70, 0.66, plus and minus 0.420) and still lands on cast metal rather than in bonded skin.',
      why: 'A ladder earns credibility by knowing which inherited part is a constraint and which is merely inherited. The rear casting was carried verbatim through four generations because nothing behind the cowl changed. This generation changes the length of the car, so it changes, and the honest way to change it is to name the two numbers that moved for a reason (the beam span, because the tail closed; the bond pad, because the tail shortened) and hold the one number a partner depends on. Renumbering the rest would spend proven rear pickups to buy nothing.',
      fail: [
        'Hot tearing at thick-to-thin transitions is still the casting defect that matters; CT scans on a sampling plan police it.',
        'A shorter cantilever is a stiffer one, and a stiffer mount changes the buffet response of the blade it carries. The Kamm flap\'s fatigue case was never run on the long version and is now unrun on a different one.',
        'The 0.90 m rear beam covers 75 percent of a 1.20 m body against 68 percent on body-9, which is better coverage of a worse case: a narrow car in a rear impact has less structure per occupant, and this module has no rear-impact model to say by how much.',
      ],
      explode: [-0.85, -0.35, 0],
    },
    'crash-rails': {
      name: 'Crash rails and bumper beam',
      tagline: 'The debt body-9 named and could not pay: its beam corner stood 14.9 mm outside the skin, and on this loft the same corner is 40.6 mm inside it.',
      mass: 12,
      specs: [
        ['Counterpart', 'body-9 crash-rails, 14 kg: identical section and stroke'],
        ['Section', '90 x 90 mm octagonal, 3.0 mm wall, 6082-T6, unchanged'],
        ['Mean crush force', '~120 kN per rail over 230 mm; ~55 kJ, unchanged'],
        ['Rails', '|z| 0.440 (body-9: 0.550)'],
        ['Beam', 'x 2.21 to 2.27, 1.00 m span (body-9: 1.30 m)'],
        ['Coverage', '1.00 m of a 1.200 m body: 83 percent (body-9: 70)'],
        ['Maturity', 'Production practice, section carried unchanged since Gen 1'],
      ],
      how: 'An octagonal extrusion with stamped trigger beads folds at near-constant force, and constant force is the design goal because energy is force times stroke: two rails at 120 kN over 0.23 m absorb about 55 kJ. The beam is curved in plan so a partial-overlap hit loads both rails. Everything is bolted against shear sleeves, so a moderate hit is a hand-tool repair with no jig. None of that changes here, and it is worth being explicit that the absorbed energy does not either: the section, the wall, the alloy and the stroke are body-9\'s, and Gen 11\'s mass at the floor case is within a percent of Gen 10\'s, so the same fuse is sized for the same pulse.\n\nWhat changed is where the beam ends, and it closes a defect rather than opening one. body-9 recorded that its beam\'s outboard corner sits at (2.27, 0.50, plus and minus 0.65) against a nose loft measuring 0.6351 half-width there, so 14.9 mm of hard structure stood outside the painted surface, carried unexamined since body.js. It also recorded why it could not fix it: shortening the span is a crash decision and body-9 had no reason to make one. This generation does. A 1.30 m beam on a 1.20 m car overhangs the bodywork by 50 mm a side before anything else is considered, so the span comes to 1.00 m at |z| 0.500 and the rails follow to 0.440. Measured on this loft at x 2.27, the half-width at y 0.55 is 0.5406, so the beam corner is 40.6 mm inside the skin. The rails at 0.440 also clear the narrowed cooling stack: thermal-11 does not exist, but the aperture this body meters is 0.44 m wide against body-9\'s 0.532, so a rail at 0.440 is outside it by 0.220 rather than through it.',
      why: 'Crash structure is a fuse hierarchy and the member that yields first must be the one ahead of the megacasting. Nine generations did not reorder that and a package generation is not allowed to either. The interesting work here was a negative result turned positive: body-9 checked whether narrowing the car by 166 mm reached the crash package and found that it had already, in the wrong direction, and left the finding on the panel for a successor. This is the successor, and the reason the fix is affordable is that coverage is a ratio. A shorter beam on a much narrower car covers more of it, so the small-overlap corner this body cannot reach is a smaller corner than body-9\'s was.',
      fail: [
        'A small-overlap impact outboard of the rails still bypasses them, and there is no longer a frangible fairing sitting there to be sacrificed first: on this car the flank at that station is the flank, and a wheel outside it.',
        'Chloride sitting inside the closed section corrodes unseen; drain holes and internal wax are the countermeasure, carried.',
        'Narrowing a beam narrows the offset-deformable-barrier engagement as well as the small-overlap one, and this module has no barrier model. The 83 percent coverage figure is a ratio, not a result.',
      ],
      explode: [0.95, -0.05, 0],
    },
    cage: {
      name: 'Tandem safety cage',
      tagline: 'Two occupants in line means no B-pillar and one door aperture a side, so the cage is a tube rather than a frame. It lands on the pan flange at y 0.4500.',
      mass: 52,
      specs: [
        ['Counterpart', 'body-9 cage, 69 kg: same material, new topology'],
        ['Material', '22MnB5 hot stamped, 1,500 MPa after die quench'],
        ['Roof rails', '42 mm tube on y 1.290 to 1.292 at |z| 0.300 (body-9: 56 mm at 0.510)'],
        ['Transverse bows', '20 mm tube at x 0.300, -0.450, -1.100; soffit y 1.2990'],
        ['Sill rail', '25 mm tube on the pan flange at |z| 0.7016; built min y 0.4500'],
        ['B-pillar', 'Deleted: one door aperture per side'],
      ],
      how: 'Rails in a tailored-blank tube at |z| 0.300 under a roof band at y 1.319, A-pillars raked 57.5 degrees from vertical, C-pillars landing on the rear casting boss at (-1.70, 0.66, plus and minus 0.420), and three transverse bows at x 0.300, -0.450 and -1.100 spanning 0.52 m instead of 1.02. The cowl beam and the A-pillar feet come to (0.99, 0.870, plus and minus 0.420) from body-9\'s plus and minus 0.660, because the flank at that station is 0.600 and a foot at 0.660 would be outside the car.\n\nAnd it lands on something, which a cage drawn to the roof alone does not. That cage had a built minimum y of 0.6891. It touched nothing on the car but the shell skin at 3.0 mm and it stopped 269 mm above battery-11\'s sill top and 239 mm above the pan flange. body-9\'s cage lands on its rockers at y 0.4200 and measures a minimum y of 0.4381, so the comparison was available and was not made. This cage carries a sill rail: a 25 mm tube lying on the pan flange at y 0.4500, in the 25 mm of clear flange between the pan upstand\'s outer face at |z| 0.6900 and the 28 bolt heads at 0.7132, with a hinge-pillar leg up to the A-pillar foot and a rear leg up to the C-pillar\'s landing on the rear casting. The rail is horizontal on purpose: a horizontal tube\'s own radius puts its lowest surface exactly on the plane it lands on, and a raked leg stops a radius above it and lands on nothing. Measured on the built mesh the cage now spans y 0.4500 to 1.3190. It lands on the pan flange and not directly on the sill top, which is the shorter statement of the load path: cage, flange, 28 flow-drill screws, sill head, brick stack.\n\nDeleting the B-pillar is the tandem package showing up in the structure. Two occupants in line need one aperture a side and there is nothing between them to hang a pillar on: the rear occupant\'s knees are astride the front seat back at the measured 0.815 m pitch. So the side ring is A-pillar, roof rail, C-pillar, and the mid-span load a B-pillar used to take in a side pole now goes into battery-11\'s sill, which is why that member had to grow to a rated 120 mm of chambered section before this cage could lose a leg. The middle bow at x -0.450 is 182 mm forward of the rear occupant\'s head crown at the booked 36 degrees, which is where a bow belongs.\n\nThe roof structure comes out at 31.0 mm rather than the 30 the stack budgets, and it is measured rather than allocated: the glass is at y 1.3300, the loft crown 8 mm under it at 1.3220, the bows are 20 mm tubes centered on 1.3090 whose crowns touch the loft at 1.3190, and their soffit at 1.2990 is the plane a liner hangs on. Swept over the head corridor, |z| within 0.15 and x 0.350 to -1.150, that soffit is the lowest structure this body puts above an occupant, and at the booked 36 degrees it clears the crown at 1.24795 by 51.1 mm.',
      why: 'A cage is the one system where carrying a part unchanged is usually worth more than improving it, because certification attaches to geometry rather than to a drawing number. That argument does not survive this generation: the cabin is 1.20 m wide instead of 1.85 and there are two occupants instead of four, so every node moves and the Gen 6 roof-crush result does not carry. The right response is to say that plainly on the panel rather than to renumber a carried part and hope. What the topology buys is the thing a tandem car should buy: 17 kg, a continuous side ring with no mid-span joint, and a load path that ends in a rated sill rather than in a pillar foot. What it cost to get there was noticing that the ring had no bottom at all, which no amount of reading would have found and one bounding box did.',
      fail: [
        'The roof-crush result is not carried and this is the only module that CAN say so. body-9 quotes the certified Gen 6 result on the Gen 6 load path. Every node here has moved, the B-pillar is gone and the roof is 38 mm lower. This cage has no roof-crush result at all and it needs one before anything ships.',
        'Martensite does not tolerate straightening: damaged members are cut out and section-replaced, and the rails are tailored blanks, so a section repair must land on the correct thickness zone.',
        'A single 1.79 m door aperture a side is a long unbraced opening in a shear structure. The sill closes it at the bottom and the roof rail at the top, and nothing closes it in the middle, which is exactly the load case a B-pillar exists for.',
      ],
      explode: [0, 0.36, 0],
    },

    /* ── shell ────────────────────────────────────────────────────────── */
    skin: {
      name: 'Gen 11 skin',
      tagline: 'The tub. One surface at |z| 0.600 through the whole greenhouse, and nothing on this car stands outside it.',
      mass: 31,
      specs: [
        ['Counterpart', 'body-9 skin, 46 kg: same laminate, new loft'],
        ['Construction', 'Thin-ply CFRP 1.1 mm, AFP laid, bonded to the cage'],
        ['Stations', '17 rings, x +2.375 to -2.4427; nose x held as crash budget'],
        ['Greenhouse half-width', '0.6000 built, and swept it is the widest vertex on the car above y 0.6200'],
        ['Roof', 'Loft crown y 1.3220; the built roof is the glass at 1.3300'],
        ['Panel joints', 'Hood x 2.220 to 1.130 and decklid -1.160 to -2.100, and both of them open'],
        ['Maturity', 'Skin pilot line; no Cd is claimed anywhere in this module'],
      ],
      how: 'Seventeen loft rings of eight profile points and a crown, resampled two for one in both directions with linear interpolation and grooved for the shutlines. The stations forward of x 1.820 keep body-9\'s x exactly, because the nose is crash budget and shortening it would spend crush stroke to buy length that the tail gives up more cheaply. Everything from station 3 aft is this generation, and the shape of it is one sentence: the flank holds 0.600 half-width from y 0.620 upward at every station from x 1.820 to -1.850, which is the whole cabin and both wheel bays, and the tumblehome above that closes to a 0.300 half-width deck line at y 1.319 under a 1.322 crown. Below y 0.620 the ring takes one of two forms and nothing between them: the shoulder over the sill, and an arch that stops at the flank base at every wheel station.\n\nLinear interpolation is not negotiable here, for the reason body-9 wrote down and this body inherits with more at stake. The clamp in lib.loft protects the envelope, not the projected area: a surface that bulges between two profile points moves the frontal-area integral without touching any extreme. body-9 measured clamped Catmull-Rom at plus 0.64 percent of A and unclamped at plus 2.80. This module publishes a greenhouse half-width of exactly 0.600 and a whole generation rests on the sliver between 0.600 and the tire inner face at 0.6725, which is 72.5 mm. Swept, the widest vertex on this entire body above y 0.6200 measures |z| 0.6000 and it is on this part. A 0.64 percent bulge is enough to eat a fifth of it, so the surface is linear and every clearance quoted in this file is exact rather than nominal.\n\nAnd nothing stands outside the flank, which is a change body-9 could not make. Its camera pods rode on 90 mm stalks at |z| 0.9768 against bodywork at 0.925, so the car measured 1.954 m over the pods and 1.850 m over the paint, and its own panel called that awkward and quoted the market qualifier that lets a camera monitor system be excluded from width. This body flush-mounts the surround cameras into the A-pillar base with their outer face at |z| 0.5980, 2 mm inside the skin, so the built half-width of this car is 0.600 everywhere above y 0.620 and the width on the certificate is the width in the model. The glass was the last thing standing outside that and it is inside it now: a canopy band pushed 1.2 percent outboard makes the built width 1.2144 m. That is worth 0.0041 m2 of protrusion term on body-9\'s own accounting and it is worth more than that as a statement: there is no asterisk on this number.',
      why: 'design/gen11.md section 3 says the design is what moves and the measurement is regenerated at the end, so this panel deliberately publishes no area figure at all. What it publishes instead is the two dimensions the area is a function of, both built and both checkable with a ruler: 0.6000 at the greenhouse and 1.3300 at the roof. tools/area.sh regenerates area from this geometry at integration and whatever it returns is the number, including if it returns something worse than the 1.4705 the feasibility measured on a scaled body-9. The risk register in design/gen11.md already names this as risk 1, that a real loft fairs the shoulder corner and changes the figure, and the correct response to that risk is to draw the loft honestly and let the integrator measure it rather than to tune the loft until it reproduces a prediction.',
      fail: [
        'Thin-ply carbon takes barely visible impact damage, and this car has four open wheels throwing stones at its flank with no liner in between. Ultrasound spot checks were a schedule item on body-9 and they are a more frequent one here.',
        'The hood leading edge geometry is body-9\'s because the nose is held, but the pedestrian head-impact map is not: a 1.20 m wide nose puts the A-pillar bases 240 mm closer together, and pillar strikes are the part of that map nobody has run.',
        'One uninterrupted 4.83 m highlight line with two shutlines in it is the hardest surface on the car to repair well, and it is harder than body-9\'s because the shoulder crease runs the length of the car underneath it and shows every step in the panel above.',
      ],
      explode: [0, 0.62, 0],
    },
    shoulder: {
      name: 'Shoulder fairing',
      tagline: 'The generation, in one panel: 170 mm of surface that closes a 180 mm step and costs about a thousandth of a square meter because it never leaves the tire shadow.',
      mass: 5,
      specs: [
        ['Counterpart', 'None. No body on this ladder has had a shoulder'],
        ['Span', 'x -1.120 to 1.120 built; full section to 1.030, 68.0 mm clear of the nearest tire vertex at |x| 1.0980'],
        ['Section', '(0.7800, 0.4500) to (0.7500, 0.5000) to (0.6900, 0.5600) to (0.6000, 0.6200)'],
        ['Height', '170 mm; built top y 0.6200, which is 90 mm under the tire top at 0.710'],
        ['Priced at', '+0.0010 m2 over 50 to 200 mm of height, design/gen11.md section 3'],
        ['Maturity', 'Pilot line: the surface is new, the laminate is body-9\'s'],
      ],
      how: 'The first thing to say about this panel is where it is not. Run from x 1.450 to -1.850, through both axles, it crosses drivetrain-9\'s stator rings 542 times at 30.46 mm, its rotor rings 287 times at 36.03, wheels-10\'s tires 264 times, its discs 132 times at 19.55 and its calipers 197: seven penetrating pairs against wheels-10 where body-9 has none, so it does not run there. It exists now over battery-11\'s sill and nowhere else, full section from x 1.030 to -1.030 and closed to the flank base by 1.120, because the nearest tire vertex is at |x| 1.0980 and a fairing 180 mm wide has to stop 68 mm short of it rather than run past it. Its built top is y 0.6200 and its built span is 2.240 m, both measured.\n\nThe step this panel closes is 180 mm wide: the pan flange ends at |z| 0.7800 over battery-11\'s sill and the flank starts at 0.6000. Left as a step it is a rearward-facing 180 mm ledge, which is the single worst feature a venturi floor could have beside it. Drawn as a fairing it is four profile points over 170 mm of height, and its whole aerodynamic argument is a height rather than a shape: the tire column occupies |z| 0.6725 to 0.8075 from the ground to y 0.710, so any surface between the flank and the tire that stays below 0.710 is inside a projection the union already counts. This one tops out at 0.6200. design/gen11.md priced exactly this fairing with the shipped integrator at plus 0.0010 m2 over 50 to 200 mm of height and plus 0.0060 at 300 mm, which is two to three percent of the 0.0571 m2 sliver the wide pack costs and zero to two miles.\n\nThe 170 mm is chosen against the tire and not against the surface, and that is the discipline body-8 got wrong at its front lip and body-9 wrote a whole panel about. Take the fairing to 300 mm of height and its top lands at y 0.750, which is 40 mm above the tire crown, and every millimeter above 0.710 is bought at the 0.09 m2 per meter of height that design/gen11.md measures for a 1.20 m cabin. Take it to 50 mm and the shoulder is a 130 mm chamfer on a 180 mm step, which is not a fairing. 170 mm is the largest height that is entirely free, and the free-ness is a property of the tire rather than of this panel, so it is stated with the tire column that produces it and it changes the moment the track does.',
      why: 'This is the panel that makes A wide pack under A narrow cabin A shape rather than A contradiction. tools/gen11-area.js declined the whole architecture in one line, that a pack wider than its body is not a design, and design/gen11.md answered that there is no body beside the cells. Both are true and neither draws the joint. Between the cells and the cabin there is 180 mm of z and 170 mm of y to cross, and if that crossing costs real area then the generation is worth 0.0571 m2 less than it says. Measuring it before drawing it, and drawing it inside the constraint the measurement produced, is the difference between this panel and the side-pod architecture the feasibility killed, which was priced at a height 500 mm above the one where it bound.',
      fail: [
        'A shoulder is a horizontal surface on a car with no wheel liners. It collects road film, salt and stone chips exactly where the tire throws them, and it drains inboard onto the pan rather than outboard off the car.',
        'It stops 55 mm short of each end of battery-11\'s sill, at x 1.030 against a sill running to 1.080 and -1.030 against -1.060, because the tire is where the rest of the fairing would go. The last 50 mm of sill top per end is open to the road, and the flow into and out of the closure ramp at x 1.120 is nothing this project can model.',
        'The panel is priced on a 1.48 m track. Narrow the track and the tire shadow moves inboard while this surface does not, so every millimeter of it outboard of the new tire inner face starts costing area. A future rung that narrows the track has to re-price this panel first, not last.',
        'It is drawn as part of the master loft rather than as a bonded add-on, so a damaged shoulder is a structural repair on the same laminate as the flank, and there is no shutline anywhere near it to hide a scarf.',
      ],
      explode: [0, -0.25, 1.0],
    },
    'floor-pan': {
      name: 'Sill pan',
      tagline: 'The part that lands on battery-11, and the part that had to stop being a floor. An L on the sill top, outboard of the cabin, with nothing at all inboard of it.',
      mass: 9,
      specs: [
        ['Counterpart', 'None. body-9 had no floor: battery-10\'s lid was the floor, and it still is'],
        ['Section', '30 mm CFRP sandwich; flange y 0.4200 to 0.4500, upstand to 0.5600'],
        ['Plan', 'x -1.030 to 1.030, battery-11\'s own 28-screw run'],
        ['Flange', '|z| 0.6600 to 0.7800 on the sill top; upstand 0.6600 to 0.6900'],
        ['Declares', 'sill-outboard |z| 0.7800 and sill-top y 0.4200, both with battery-11'],
        ['Maturity', 'Production practice'],
      ],
      how: 'This part is defined by what is not in it. A structural pan drawn straight across the cabin at y 0.3500 to 0.4517, from the centerline out to the sill, destroys the generation, and this module does not draw one. design/gen11.md section 5 makes battery-11\'s lid at y 0.3020 the cabin floor and forbids anything on top of it, because the occupant relation that section publishes puts the crown at 1.24795 over the lid and at 1.39795 over a 150 mm pan, which is 67.6 mm through the roof bows of even the 1.330 m roof this body now builds. interior-6 states the same principle in its own header and has no floor of its own. Such a pan also creates a 48 mm dead cavity between the two floors and a second set of seat rails over the four battery-11 already pots into the brick tops, which is design/retro-gen10.md\'s wasted-volume defect recreated by the generation that exists to fix it.\n\nWhat is left is an L on the sill top and nothing else. The flange runs y 0.4200 to 0.4500 across |z| 0.6600 to 0.7800, so it covers the sill head\'s whole top face and stops on its outer face. The upstand stands on the flange\'s inboard edge, |z| 0.6600 to 0.6900 and y 0.4500 to 0.5600, so its inner face continues the sill head\'s own inner face and the cabin side is one plane from the pack lid up to 0.5600; its outboard top corner lands exactly on the shoulder\'s crease at (0.5600, 0.6900). Flange, upstand and shoulder skin close a triangular box on top of the sill, which is what ties a body into a pack. A flange on its own is a strap. Twenty-eight bolt heads pull it down on battery-11\'s own screw stations, x -1.03 to 1.03 at a 76.3 mm pitch, and one joint carries one number in both modules.\n\nThe part exists at y greater than or equal to 0.4200 and |z| less than or equal to 0.7800 and nowhere else, which is what makes its two declarations true of the whole of it rather than of one face. That is the fix to a real failure: the cabin-spanning draft declared |z| 0.7800 with extent min on a part whose built |z| ran from 0.1600, so it underran its own interface by 620 mm and tools/interfaces.js would have failed the key.',
      why: 'A body that has never needed a floor was given one for a reason that turned out not to survive contact with the height budget. The reason was suspension-9/air-supply, which puts 295 vertices at y 0.3020 to 0.3355 and |z| up to 0.6174 over x -0.861 to 0.4287, about 17 mm outboard of a 0.6000 flank, and design/gen11.md section 6 asked for a pan at least 28 mm thick out to |z| 0.618 to cover it. Measured against the section that is actually built, that line does not need a body pan at all: the sill head\'s inner face is |z| 0.6600, so the air line runs 42.6 mm inboard of it and 86.5 mm below the pan flange, in the sill-side channel of the cabin floor where a pneumatic line belongs. It is under interior-11\'s trim, not under body structure, and that is a cheaper answer than 150 mm of height. Nine kilograms rather than eighteen, on a body that just deleted 22 kg of rocker beam.',
      fail: [
        'The flange is the only thing tying the body to the pack at hip height and it is bonded and bolted to one face. battery-11\'s own fail list says the same thing from the other side: if this flange does not land on y 0.4200 the sill is a cantilever off the brick ends.',
        'The upstand is drawn as a closing web and no crash model has been run on it. The triangular box it makes with the shoulder skin is a geometry claim about a load path, not a result.',
        'Deleting the cabin floor hands interior-11 a problem this module used to hide: the pneumatic line, the 48 V harness and whatever hv-11 routes next now run in open cabin volume on the pack lid, and something has to cover them and stay under the seat rails at y 0.3080.',
      ],
      explode: [0, -0.45, 0],
    },
    'tail-cone': {
      name: 'Compressed boat tail',
      tagline: '333 mm shorter on the same 18.4 degree plan half-angle, which is the one number the compression is not allowed to change.',
      mass: 8,
      specs: [
        ['Counterpart', 'body-9 tail-cone, 12 kg: same closure logic on a 0.643 x run'],
        ['Closure begins', 'x -1.850, on the measured 18.4 degree plan half-angle'],
        ['Flank', '0.600 at x -1.850 to 0.4028 at the Kamm face'],
        ['Kamm face', 'x -2.4427, 0.806 m wide by y 0.580 to 0.930'],
        ['Overall length', '4.8288 m built and measured (body-9: 5.1623)'],
        ['Maturity', 'Production practice: boat tails and Kamm truncation are old'],
      ],
      how: 'The compression is a single rule applied to four stations and it is deliberately not a redesign. design/gen11.md gives the tail 4.83 m of car with the nose held, so 333 mm comes out aft of x -1.850, and the plan half-angle measured on body-9\'s own tail, 18.4 degrees, is what the new stations are generated from rather than what they are checked against. The flank runs 0.600 at x -1.850, 0.5424 at -2.0230, 0.4719 at -2.2345 and 0.4028 at the Kamm face at -2.4427, which is tan 18.4 degrees at every one of the three intervals to four decimals. The crown falls 1.322 at x -1.120 to 0.930 at the face, and the lower edge falls from the arch return at 0.608 to 0.580 at the face for the diffuser.\n\nWhat the compression costs is not the angle, it is the base. A boat tail is priced by its equivalent-cone half-angle and by the base it fails to close. body-9 closed 0.925 half-width to 0.550 over 1.675 m of length. This tail closes 0.600 to 0.4028 over 0.593 m, so the plan angle is preserved but the base is 0.806 by 0.350 m against body-9\'s 1.10 by 0.430: 0.282 m2 against 0.394. That is a 28 percent smaller base on a car with 42 percent less frontal area, so the base as a fraction of frontal area is slightly worse, and this module does not claim otherwise. No coefficient is booked here or anywhere in this file; design/area-rezero.md froze Cd project-wide and a tail that got shorter is exactly the change a frozen coefficient is frozen against.',
      why: 'Gen 7 narrowed the rear track so the tail could close, Gen 8 closed it and collected 58 miles, Gen 9 narrowed the front. Each spent a permission the rung before created. Gen 11 spends a different currency: it takes 333 mm of car out of the tail because a tandem cabin does not need it, and it takes the whole of it aft of the rear axle where nothing lives. The reason to hold the plan angle exactly rather than re-solving the tail is that the angle is the one property of this surface anybody has measured, and a compression that changed it would be a new aerodynamic claim on a rung that is not allowed to make one.',
      fail: [
        'The claim that this tail stays attached rests on an equivalent cone, and a moving-ground tunnel is still owed. It is now owed on a third body and the queue is not getting shorter.',
        'The bond pad moved from x -2.28 to -2.23 and the blade with it, so the fatigue case on the bonded joint is a new one on an unchanged laminate schedule.',
        'Luggage. design/gen11.md section 9 item 3 says the four-seat car\'s rear bench volume is gone and nothing replaces it. A 0.806 by 0.350 m base with the diffuser under it is a shallower well than body-9\'s, and this panel is where that shows up: there is no trunk on this car worth the name and interior-11 has to say what remains.',
      ],
      explode: [-1.45, 0.30, 0],
    },
    canopy: {
      name: 'Glass canopy band',
      tagline: 'The same stack over a cabin 325 mm narrower, and the roof band is now flat enough to sit under.',
      mass: 14,
      specs: [
        ['Counterpart', 'body-9 canopy, 21 kg: identical stack, 0.65 x the area'],
        ['Glazing', 'Chemically strengthened aluminosilicate, 1.1 + PVB + 0.7 mm'],
        ['Span', 'Cowl x 1.030 to x -1.120; backlight still deleted'],
        ['Roof band', 'Flat from |z| 0 to 0.30 at y 1.327 to 1.330'],
        ['Widest vertex', '|z| 0.5976, inset 0.4 percent, so it is inside the 0.6000 flank'],
        ['Maturity', 'Production practice for the glass; mirrorless is legal in most markets, not all'],
      ],
      how: 'The band is cut from the same loft stations as the skin, 8 mm proud of them, and carries body-7\'s stack unchanged: a 1.1 mm ion-exchanged outer ply that resists the same stone strike as 2.1 mm of annealed soda-lime, a 0.7 mm inner, and an electrochromic interlayer scheduled between 20 and 1 percent transmittance. body-3\'s codified lesson is carried too, the near-flat roof band from the centerline out to |z| 0.30 so the glass wraps the cage rails rather than dipping under them.\n\nWhat this generation does to the glass is arithmetic rather than design. The cabin is 1.20 m wide instead of 1.85 and 0.593 m shorter overall, so the band\'s developed area falls by about 35 percent and the mass with it, 21 kg to 14. The one thing worth checking rather than assuming was whether the roof band is still flat enough to clear the rails after the roof came down 38 mm to 1.330: the rails moved inboard to |z| 0.300 with the cabin, the loft at that half-width measures y 1.319, and the rail tops are at 1.313, so the glass clears them by 6 mm, which is body-9\'s own margin at that joint.\n\nAnd the band is now inside the paint in Z, which is A correction. A band 8 mm proud in y and 1.2 percent outboard in z puts its widest vertex at |z| 0.6072 and the built width of this car at 1.2144 m against a contract that binds 1.20 m built. The offset in z is now 0.4 percent inboard, so the widest glass vertex is 0.5976, the two surfaces still cannot z-fight, and swept over the whole module the widest vertex above y 0.6200 is the painted flank at exactly 0.6000. The contract does not move; the geometry came to it.',
      why: 'A monoform with a deleted backlight depends on its sensor suite for everything behind the occupants, and that was Gen 8\'s decision taken for a tolerance reason rather than a styling one. Gen 11 does not reopen it, and design/gen11.md section 9 item 4 already books the further cost: rear visibility past a reclined front occupant in a narrow tube is worse than a four-seat cabin\'s. What is worth saying here is that the glass is the only part of this body whose mass fell for a purely geometric reason, with no argument and no risk attached, which is what a package generation is supposed to produce and mostly does not.',
      fail: [
        'One deep chip still condemns the band and the replacement must re-index to the loft within half a millimeter, carried unimproved.',
        'A camera-only rear view fails differently from a mirror: a blinded lens is a blank screen, so the rear camera washer circuit is a safety item whose failure caps speed. With no wheel liners there is materially more spray reaching that lens.',
        'The band is inset 0.4 percent in z to keep the built width honest, which means the glass sits 2.4 mm inside the paint at the beltline seam rather than flush with it. That is a visible step in a highlight line and a place for water to sit, and the alternative was a car 14.4 mm wider than its own contract.',
      ],
      explode: [0, 1.05, 0],
    },
    doors: {
      name: 'Flush doors',
      tagline: 'One aperture a side, 1.79 m long, because two occupants in line have nothing between them to hang a pillar on.',
      mass: 22,
      count: 2,
      specs: [
        ['Counterpart', 'body-9 doors, 34 kg for four: same hardware, two apertures'],
        ['Skins', 'Thin-ply CFRP, the master loft itself, flushness +-0.25 mm'],
        ['Shutlines', 'x 0.850 and -0.940, cut 5 mm wide by 4 mm deep'],
        ['Aperture', '1.790 m long; lower edge at the pan flange y 0.4500'],
        ['Cameras', 'Flush in the A-pillar base, outer face |z| 0.5980'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Each skin is the master loft surface between two shutlines, hinged off the A-pillar foot at x 0.99 and latched at the C-pillar, with e-latches on hv-11\'s zonal controllers as fused telemetered channels. The cuts are real recessed channels, 5 mm wide and 4 mm deep with two walls at about 71 degrees, and they run from the loft\'s bottom edge at the pan flange up to the beltline seam. The door does not own anything below its own cut, because below it is battery-11\'s sill with the pan flange on top of it, and neither of those opens.\n\nThe shutlines are measured against built partners, which is the discipline body-8 got wrong at x 1.06 and body-9 fixed. Forward cut x 0.850: this is the station where the flank hands over to the nose, 180 mm behind the cowl ring at x 1.030 and 140 mm behind the A-pillar foot at 0.99 that carries the hinges. There is no wheelhouse to clear, because there is no wheelhouse: wheels-10\'s front tire reaches x 1.0917 at its rearmost and stands at |z| 0.6725, entirely outboard of a 0.600 flank, so the constraint that forced body-9\'s forward cut aft does not exist here and the cut is set by the pillar instead. Rear cut x -0.940: 243 mm ahead of the rear tire\'s leading edge at -1.1835 and 120 mm ahead of the sill\'s rear end at -1.060.\n\nThe camera pods are gone and that is a deletion rather than a move. body-9 put them on 90 mm stalks whose outer faces measured |z| 0.9768 against bodywork at 0.925, so the widest thing on that car was a camera and its own panel had to quote the market qualifier that excludes a camera monitor system from vehicle width. The surround cameras here are flush in the A-pillar base with their outer face at 0.5980, 2 mm inside the skin. It costs field of view at the rear quarter, which on a car with a deleted backlight is the view that was already worst, and it buys a car whose built width has no asterisk on it.',
      why: 'design/gen11.md section 9 item 2 agreed the cost in advance: rear ingress is past the front seat and a 1.20 m tandem cabin has no second door line worth the name. This panel is where that stops being a sentence. A single 1.79 m aperture a side is what the package produces, it is why the cage has no B-pillar, and it is why battery-11\'s sill had to become a rated 130 mm crush member before the cage could lose that leg. Three modules had to agree for one door to exist, which is the cleanest illustration on this rung of why the sill is declared rather than described.',
      fail: [
        'Rear ingress is over the sill, past the front seat back, into a reclined seat. That is a touring posture entered from a track-car aperture and it is worse for anyone with limited mobility than any car on this ladder.',
        'A 1.79 m door is heavy on its hinges and long in a wind gust, and there is no B-pillar to close on. The latch, the check strap and the hinge pillar are all doing more than body-9\'s did.',
        'E-latches keep their legally required mechanical release, exercised at every service because nobody touches it until the day it matters. On a two-door car with a reclined rear occupant, the day it matters is worse.',
      ],
      explode: [0.08, 0, 0.85],
    },
    'venturi-floor': {
      name: 'Sealed venturi underbody',
      tagline: 'Carried panel for panel and narrowed with the car, and it is still the largest frontal-area term nobody has attacked.',
      mass: 7,
      specs: [
        ['Counterpart', 'body-9 venturi-floor, 9 kg: same panels, narrowed'],
        ['Panels', 'Carbon closeouts, lip to pack and pack to the hinge at x -1.900'],
        ['Ground gap', '110 mm at the lip; suspension-9 holds it +-3 mm at speed'],
        ['Splitter', '0.80 m wide (body-9: 1.02)'],
        ['Strakes', 'Underside y 0.1025, level with battery-11\'s strike shield'],
        ['Maturity', 'Production practice: sealed floors universal, tunnels in series'],
      ],
      how: 'Carried from body-9 without a panel changing in kind: a carbon lip at a 110 mm gap, a valance behind it so the splitter bolts to something rather than floating, a front closeout bridging to battery-11\'s pack leading edge, the pack underside running to x -1.30, a rear closeout bridging to the diffuser hinge, and strakes dividing the rear run into twin tunnels so a yawed crosswind stalls one side while the other keeps pulling. The strake undersides sit at y 0.1025, exactly level with battery-11\'s strike shield, which is the datum battery-7 set and every module since has held to the micron.\n\nWhat changed is width and one station. The splitter comes from 1.02 to 0.80 m and the valance interpolants narrow with it, because a splitter wider than the nose it feeds is a splitter feeding the wake beside the car. The rear closeout now bridges to a hinge at x -1.900 instead of -2.000, because the tail is 333 mm shorter and a ramp hinged at the old station would run past the Kamm face. The front closeout is untouched in x at 1.32 to 2.10 and its plan is held at |z| 0.620, which is inboard of the pack at 0.780 and deliberately so: the front tires occupy |z| 0.6725 to 0.8075 from x 1.1835 to 1.8050, so a closeout drawn out to the pack\'s own width would be inside the front wheels for half a meter.',
      why: 'The underbody is the largest surface on the car and the only one the pack already paid to flatten. Three generations have now looked at this floor and left it alone for three different good reasons, and body-9 wrote that this usually means the fourth should look harder. This is the fourth and it does not look harder, for a reason that is specific rather than lazy: the sub-loft term is a fraction of frontal area, the frontal area just fell by 42 percent, and the same panels now occupy a much larger share of a much smaller number. Attacking them is a real lever for the first time and it is a floor generation\'s work, not a package generation\'s, and naming the moment it became worth doing is the useful thing this panel can do.',
      fail: [
        'Curbs and ramps still rake the lip first; the shear-away fasteners cost a bracket, carried through seven generations.',
        'A narrow splitter feeds a narrow stagnation region into the tunnels, and the crosswind case has been outstanding since body-7. It is worse here: design/gen11.md section 9 item 5 books a changed yaw response on a car whose side area fell from 5.1598 to about 4.63 m2 with the CG essentially unchanged.',
        'With no wheel liners, the tunnels now sit directly downstream of four open tires. Tire wake into a diffuser inlet is a real interaction and nothing in this project can model it.',
      ],
      explode: [0, -0.55, 0],
    },
    'intake-gates': {
      name: 'Intake gates',
      tagline: 'A 0.44 m bank against body-9\'s 0.56, on a cabin-loss and a pack that both got smaller.',
      mass: 2,
      specs: [
        ['Counterpart', 'body-9 intake-gates, 2 kg: same bank, 120 mm less span'],
        ['Bank', '4 slats, 0.44 m span, one 48 V actuator'],
        ['Aperture', '0.412 by 0.146 m cut in the valance, ducted to a mouth at x 2.215'],
        ['Feeds', 'thermal-11\'s stack in the untouched front zone x 2.08 to 2.26'],
        ['Fail position', 'Spring open: cooling beats drag, the Gen 2 law'],
        ['Maturity', 'Production practice since the 2010s'],
      ],
      how: 'A four-slat bank below the nose face metering the only air admitted through the body, ducted to the radiator stack in the front zone this ladder has never moved. The thermal controller owns the position request, the aero controller is granted closure only when every thermal margin is green, and the spring fails the bank open because a stuck-shut gate on a mountain climb cooks hardware while a stuck-open one costs a count. The aperture is a real hole with a returned rim and a throat behind it carrying back to a mouth at x 2.215, and a bar lattice sits 18 mm behind the valance skin so no oblique view finds a way round it into the cavity. All of that is body-9\'s and none of it is reopened.\n\nThe span comes down 120 mm and the argument is arithmetic on a partner that does not exist yet, which is stated as such. The bank is sized on rejection, and two of the three terms fell: the cabin-loss UA is a function of cabin surface area and this cabin is 35 percent smaller, and occupant-local conditioning now serves two people rather than four. The third, the pack\'s charge-heat rejection, did not fall: battery-11 books the same 15 kW design heat load and the same 430 A ceiling as battery-10 because not one cell moved. So the honest sizing is a modest reduction rather than a proportional one, 0.56 m to 0.44, and thermal-11 owns the real case. If its heat pump wants more air on a hot-day pulldown then this slat count is wrong and thermal-11 gets to say so; the fail-open spring means the direction of that error is safe.',
      why: 'A fixed intake is sized for the worst hour and paid for every other hour. Metering the opening per minute is what keeps the sealed-nose fiction honest, and the reason to touch it at all in a package generation is that the nose is the one place where a narrower car changes what fits rather than only what it weighs. The reason not to touch it further is on the panel above: the largest single term in the rejection is a pack that did not change, and a body module that sized an aperture off a partner drawn in the same generation would be repeating body-9\'s own least well founded number.',
      fail: [
        'Road grit and ice jam slat pivots; the cold-start sweep reports a stiff bank before the highway or the charger does.',
        'Stuck shut is the dangerous direction: the thermal module sheds load, tapers power and the car explains why, and with 21 percent less aperture the margin between shedding and not shedding is smaller than body-9\'s.',
        'The sizing case is inherited from a partner that has not been drawn, which makes this the least well founded number in this module and the first one an integrator should challenge. body-9 said the same sentence about the same part and it was true then too.',
      ],
      explode: [1.3, -0.08, 0],
    },
    lightbands: {
      name: 'Light bands',
      tagline: 'The front band does not move by a millimeter, and it is the only interface on this car that survived the package intact.',
      mass: 3,
      count: 2,
      specs: [
        ['Counterpart', 'body-9 lightbands, 4 kg: front identical, rear narrowed'],
        ['Front', '2 x 84-pixel matrix + lidar windows at z +-0.30, held'],
        ['Held coordinates', 'Front band face x 2.371, y 0.615, half-width 0.43'],
        ['Rear', 'PMMA guide across the Kamm face at x -2.4387, 0.70 m'],
        ['Kamm face', '0.806 m wide by 350 mm tall'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The front band is carried without a change to a single coordinate and that is a contract rather than a convenience. autonomy-4 mounts its flash lidar pucks at (2.33, 0.615, plus and minus 0.30) and its thermal camera at (2.345, 0.53, 0), all written against a band face at x 2.371, y 0.615, half-width 0.43. The nose loft at that station carries 0.487 half-width at y 0.615, so the band sits inside the surface with 57 mm to spare on each side and all three sensor points land. On a car that narrowed by 650 mm at the greenhouse and lost 333 mm of tail, exactly one partner interface came through untouched, and it is worth naming which one and why: the nose was held as crash budget, and holding a length held a set of coordinates that nothing else on the car could have preserved.\n\nThe rear band narrows to 0.70 m with the Kamm face, which closes to 0.806 m wide on the 18.4 degree taper. Its back face at x -2.4457 is the rearmost geometry on the car and it is what sets the built overall length. The forward-most vertex is the intake gates\' actuator boss, and swept it is at x 2.383143, not the 2.3843 an earlier note transcribed, so the built car is 4.82884 m. design/gen11.md books 4.83 and 4.8288 rounds to it; the difference is 1.2 mm and the point of writing it down is that the earlier figure was a number typed into a comment and this one is a number read off the mesh.',
      why: 'A monoform leaves nowhere else for light to live and nowhere better for a lidar: the front face is the one flat, forward, washable, heated surface on the car, sitting in the stagnation region where a window costs no drag. autonomy-11 is a redraw and will re-seat everything against this built body, and the useful thing this panel does is guarantee that at least one of its mounting families does not have to move. design/retro-gen4.md\'s rule is to move geometry around an interface rather than moving the interface; this is the one place on the rung where that was free.',
      fail: [
        'One part per face: a parking tap costs the whole band, and at the front possibly a lidar recalibration with it.',
        'Base suction still films the rear band with road dirt, and with four open wheels there is more of it. The wash cycle stays a safety schedule.',
        'The rear band is now the rearmost geometry on the car by 3 mm, so it is also the first thing a curb behind the car meets. body-9 had 3 mm of the same exposure and a longer overhang to absorb it.',
      ],
      explode: [1.15, 0.1, 0],
    },
    'kamm-flap': {
      name: 'Deployable Kamm spoiler',
      tagline: 'Same mechanism on a base 28 percent smaller and a cantilever 59 percent shorter, and the module books nothing for either.',
      mass: 4,
      specs: [
        ['Counterpart', 'body-9 kamm-flap, 6 kg: identical drives and logic'],
        ['Blade', 'Carbon, 0.70 m span, 160 mm chord, drawn deployed'],
        ['Travel', 'Flush to 62 mm proud, continuous; full-up airbrake'],
        ['Base it works on', '0.282 m2 (body-9: 0.394)'],
        ['Booked', 'Nothing. Cd is frozen project-wide by design/area-rezero.md'],
        ['Maturity', 'Production practice: multi-position wings have shipped for decades'],
      ],
      how: 'Mechanism, actuation, control logic and fail position are carried without a change: two 48 V spindle drives on fused channels from the rear zonal controllers, continuous travel from flush to 62 mm proud, a spring return to flush because a spoiler that fails should cost counts and never control, stow below 80 km/h to restore the certified pedestrian geometry, and full-up in half a second on a hard brake-by-wire demand.\n\nEverything about its context changed and none of it is bookable. The base is 0.282 m2 against 0.394, the span comes to 0.70 m with the face, the chord to 160 mm in proportion, and the deck it stands on is 213 mm aft of the bolted rails instead of 525, so the couple into the rear casting falls from about 451 Nm to about 183. The download at 130 km/h scales with the blade area and comes to roughly 260 N against 365. Every one of those is a real number and not one of them is a range claim: this generation books no drag coefficient anywhere, which design/gen11.md states twice and design/area-rezero.md froze project-wide.',
      why: 'A fixed truncation pays average-case drag every hour; a blade with travel buys the best case at speed, the legal case in town, and free download in the one maneuver where drag is an asset. Carrying it into a package generation is correct and the discipline is refusing to book anything for the cleaner base it now works against. body-8 was caught out in the opposite direction on its diffuser, where half a count was debited for an effect measurement showed went the other way, and the lesson is to price what can be measured and name what cannot.',
      fail: [
        'Ice can lock the blade flush; the cold-start sweep detects the torque spike, leaves it stowed, and the range estimate explains the missing counts.',
        'Stuck deployed is the bad direction: an uncertified geometry below 80 km/h, so a second independent spring release drops the blade.',
        'The blade is 0.70 m on a car with a 1.48 m track, so it spans less than half the rear axle. Whatever it does in yaw, it does it over a narrower base than any spoiler on this ladder, and nothing here models that.',
      ],
      explode: [-0.9, 0.55, 0],
    },
    'diffuser-flap': {
      name: 'Deployable diffuser flap',
      tagline: 'The hinge moved forward 100 mm because the tail got shorter, and the ramp lost 45 percent of its length doing it.',
      mass: 4,
      specs: [
        ['Counterpart', 'body-9 diffuser-flap, 5 kg: same control law, shorter ramp'],
        ['Ramp', '0.512 m hinged at x -1.900, drawn at 18.0 degrees'],
        ['Span', '0.90 m at the hinge to 0.72 m at the exit'],
        ['Exit area', '0.128 m2 on the ladder\'s measure (body-9: 0.217)'],
        ['Fail position', 'Spring-held 13 degrees, where a diffuser cannot stall'],
        ['Maturity', 'Production practice: active diffuser flaps ship in limited series'],
      ],
      how: 'The control law is carried whole: pressure taps along the ramp plus suspension-9\'s ride-height signal trim the angle back the moment the expansion approaches separation, in yaw, in crosswind or over a crest, and a spring holds 13 degrees whenever power or control is in doubt, because at 13 a diffuser cannot stall, it merely earns less. Two 48 V drives on the rear zonal channels.\n\nThe geometry is where the tail compression arrives. body-9 hinged at x -2.000 and ran 0.78 m of ramp to x -2.744. On a car whose Kamm face is at -2.4427 that ramp would run 300 mm past the back of the car, so the hinge comes forward to -1.900 and the ramp to 0.512 m, ending at -2.412 and 34 mm inside the face. The span narrows with the tail, 1.16 to 0.90 m at the hinge, and the exit area falls from 0.217 to 0.128 m2. That is the honest cost of 333 mm of length and it is a real aerodynamic loss rather than a bookkeeping one: exit area is span times rise, the rise is what the ramp length bought, and 45 percent less ramp is 41 percent less exit. No coefficient is booked either way.',
      why: 'The underbody exhaust is the last big account on the drag ledger and its optimum angle moves with speed, height and yaw, so fixing the ramp means buying the safest angle forever. What this generation adds is a warning for whoever prices the tail next: the length came out of the one 600 mm of car that the diffuser was using. Taking length from a tail is nearly free in mass and in wetted area and it is not free in expansion, and this panel is the only place on the rung where that shows up as a number.',
      fail: [
        'An iced or mud-blinded pressure tap forfeits the steep regime: control falls back to 13 degrees and the range estimate quietly loses the difference.',
        'The departure angle worsens with a shorter overhang and a rising lower edge, and angled bays are still a curb-strike geometry.',
        'A 41 percent smaller exit on a floor whose tunnels are unchanged in width means a higher exit velocity for the same mass flow, which is exactly the condition that makes a diffuser separation-prone. Nothing in this project can model whether 18 degrees is still the right drawn angle, and it is drawn at 18 because body-9 drew it there.',
      ],
      explode: [-1.0, -0.4, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   17 loft stations, x +2.375 to -2.4427 (4.8288 m built), 8 half-profile
   pairs plus a crown per ring, so 17 points per ring. body-9 used 7 pairs and
   could not have drawn this section: the shoulder needs three points of its
   own between the pan flange and the flank base, and a seven-point ring
   spends all three on the tumblehome. Two of the seventeen stations exist
   only to close the shoulder in x before the wheels, at 1.120 and -1.120,
   and two more carry its full section at the ends of battery-11's screw run,
   at 1.030 and -1.030.

   Governing numbers, all measured against the partners' BUILT geometry:

   - THE SECTION, mid-car. Pan flange top (0.7800, 0.4500); shoulder through
     (0.7500, 0.5000) and (0.6900, 0.5600); flank base (0.6000, 0.6200);
     flank 0.6000 to y 1.0400; tumblehome to a 0.3000 deck line at y 1.3190;
     crown 1.3220 with the glass 8 mm proud at 1.3300. The tire column is
     |z| 0.6725 to 0.8075 over y 0 to 0.710, so every point of the shoulder
     is inside it and the flank is 72.5 mm inboard of it.

   - THE SECTION AT A WHEEL STATION. Points 0 to 3 collapse to a 12 mm return
     under the flank base, (0.5900, 0.6080) to (0.6000, 0.6200), and there is
     no body below it. That is not a styling choice: above y 0.6200 the
     innermost carried material outboard of |z| 0.5900 is the tire at 0.6725,
     and below it suspension-9's front knuckle reaches |z| 0.5198, its rear
     structure 0.4440, wheels-10's calipers 0.5640 and drivetrain-9's front
     unit 0.5712. There is no half-width down there that clears a corner.

   - THE PACK AND THE SILL, from battery-11's build(). Sill x [-1.060,
     1.080], y [0.1035, 0.4200], |z| [0.6600, 0.7800]; 0.6600 is the declared
     head inner face and 0.7800 the declared outer. Lid top 0.3020, seat
     rails to 0.3080, 28 flow-drill screws a side over x -1.03 to 1.03. The
     pan lands on both declared planes and matches the screw run in x.

   - suspension-9, from its build(). air-supply puts 295 vertices outboard of
     |z| 0.600, at y 0.3020 to 0.3355 and |z| up to 0.6174 over x -0.861 to
     0.4287. There is no body pan over them any more and none is needed: the
     sill head's inner face is 0.6600, so that line runs 42.6 mm inboard of
     structure and 86.5 mm below the pan flange, in the cabin's own sill
     channel on the pack lid. Its front tower plate is (1.50, 0.735, +-0.41)
     and its damper top y 0.729, both landing inside the held casting pad at
     (1.545, 0.745, +-0.430). Its subframe seats are at (+-1.72, 0.297,
     +-0.50) and this module draws bosses whose inner faces lie exactly on
     |z| 0.500.

   - wheels-10, from its build(). Tire column |z| 0.6725 to 0.8075, y 0 to
     0.710, x +-1.1835 to +-1.8050 at full section and +-1.0980 at the
     nearest vertex to the centerline. Nothing on this body encloses it and
     nothing on this body is below y 0.6200 within 68 mm of it in x.

   - THE TAIL COMPRESSION. Everything aft of x -1.850 closes at 18.4 degrees
     in plan: flank 0.6000 at -1.8500, 0.5424 at -2.0230, 0.4719 at -2.2345,
     0.4028 at the Kamm face at -2.4427. tan(18.4 deg) = 0.33269 and each of
     the three intervals reproduces it to four decimals.

   - THE ROOF AND THE OCCUPANT. Crown 1.3220, glass 1.3300, flat from
     x 0.300 to -1.120. design/gen11.md section 5's own relation,
     crown = 0.407 + 0.965 cos t + 0.1025 sin t over the PACK LID at 0.302
     and no second floor, gives 1.24795 m at t = 36 degrees. The bows are
     20 mm tubes centered on 1.3090 with a soffit at 1.2990, which is 31.0 mm
     of roof structure, and the clearance is 51.1 mm against the 50 mm
     design/gen11.md books at a 1.33 m roof. Over the 150 mm pan an earlier
     draft drew, the same relation gives 1.39795 and the generation does not
     exist.

   - CARRIED FROM body-9 AND NOT FIXED: hv-4's charge port hard point at
     (-1.92, 0.80, 0.88) stands 280 mm outside this tail flank rather than
     the 105 mm it stood outside body-9's, and interior-6's rear belt towers
     at (x -1.15, y 1.212) stand 98 mm outside body-9's loft and would stand
     further outside this one. Both belong to modules Gen 11 redraws, both
     are worse here than they were, and neither is this module's to move. */

function ring(x, half, crownY) {
  const pts = [];
  for (let i = 0; i < half.length; i++) pts.push([x, half[i][0], -half[i][1]]);
  pts.push([x, crownY, 0]);
  for (let i = half.length - 1; i >= 0; i--) pts.push([x, half[i][0], half[i][1]]);
  return pts;
}

/* [x, [[y, half-width] x8], crownY].
   Point 0 is the loft's lower edge. Points 1 and 2 are the shoulder. Point 3
   is the flank base, where the greenhouse half-width is reached. Points 4
   and 5 are the flank and the beltline seam. Points 6 and 7 are the deck
   shoulder and the deck.

   THE LOWER FOUR POINTS TAKE ONE OF TWO FORMS AND NOTHING IN BETWEEN, which
   is the correction that makes this body possible at all. SHLD is the full
   shoulder: it drops to the pan flange top at (0.4500, 0.7800) and it exists
   ONLY over battery-11's sill. ARCH is what the body does at every wheel
   station: a 12 mm return under the flank base and nothing below it, because
   measured against the built partners there is no half-width at all that
   clears a wheel corner below y 0.6200. Above y 0.6200 the innermost carried
   material outboard of |z| 0.5900 is the tire at 0.6725, so a 0.6000 flank
   is clear by 72.5 mm; below it, wheels-10, suspension-9 and drivetrain-9
   reach inboard to |z| 0.5198 at the front knuckle and 0.4440 at the rear
   structure. A body that draws anything at all down there is inside a corner.
   The first draft of this module drew the shoulder from x 1.450 to -1.850,
   which is straight through both axles, and produced 7 penetrating part
   pairs against wheels-10 alone. */
const SHLD = [[0.4500, 0.7800], [0.5000, 0.7500], [0.5600, 0.6900], [0.6200, 0.6000]];
const ARCH = [[0.6080, 0.5900], [0.6120, 0.5935], [0.6160, 0.5968], [0.6200, 0.6000]];
const STATIONS = [
  /* 0  nose face, x HELD: autonomy-4's band face and its three sensor points */
  [2.375, [[0.330, 0.400], [0.400, 0.450], [0.470, 0.480], [0.560, 0.490],
           [0.620, 0.487], [0.670, 0.440], [0.710, 0.320], [0.735, 0.170]], 0.750],
  /* 1  over the thermal stack front edge, x HELD: the bumper beam station */
  [2.220, [[0.320, 0.480], [0.400, 0.520], [0.470, 0.545], [0.560, 0.560],
           [0.660, 0.548], [0.760, 0.470], [0.830, 0.320], [0.858, 0.165]], 0.872],
  /* 2  hood and frunk zone, x HELD */
  [2.030, [[0.310, 0.540], [0.390, 0.570], [0.470, 0.588], [0.560, 0.596],
           [0.700, 0.588], [0.820, 0.500], [0.910, 0.340], [0.945, 0.175]], 0.960],
  /* ── THE FOUR HOOD STATIONS COME DOWN UNDER THE DRIVER'S EYE LINE ────
     These four crowns used to read 1.075, 1.145, 1.125 and 1.120, which put
     a 145 mm hump over the front axle and held the cowl 28 mm ABOVE the
     front occupant's eye at y 1.0920. Dead ahead was not a missing window,
     it was a hood nobody could see over: tools/occupant.sh's 0 degree ray
     left the eye, ran forward UNDER that hump the whole length of the car
     and struck the skin from the inside at x 1.729, reported as BLOCKED by
     body-11/skin at 1.802 m. Opening the glass could never have fixed it.

     WHAT THE VOLUME UNDER THERE TURNED OUT TO BE. Swept in 50 mm slices,
     the tallest vertex of anything at all forward of x 1.25 is nothing:
     the bay is empty to the heat pump's 0.892 at x 1.789. The binding
     constraints are all aft of that and all low. body-11's own cage falls
     from 1.099 at x 0.90 to 0.932 at x 1.00 and stops entirely at x 1.05,
     so the A-pillar foot is nowhere near this run; interior-11's dashboard
     peaks at 1.042 at x 1.20 and its displays at 1.000. The cage had to be
     measured by hand rather than left to tools/check-interfaces.sh, because
     that checker only ever compares parts from DIFFERENT modules and the
     cage and the skin are both this one. Same blind spot tools/occupant.sh
     was written for.

     SO THE DECK LANDS BETWEEN TWO NUMBERS: under 1.0920 so the eye clears
     it, over the dashboard so it does not sit on the fascia. Measured on the
     new line, the deck is 1.0667 at x 1.20 against a dashboard at 1.042,
     24.7 mm clear, and 1.075 at the cowl against an eye at 1.092, 17 mm
     clear. The upper profile points are compressed toward the beltline seam
     in the same proportion as the crown, so the tumblehome keeps its shape
     and only its height changes.

     THE HALF-WIDTHS ARE UNTOUCHED, and that is what makes this free. Frontal
     area is the union of the yz projections, and at every height these four
     stations reach, station 8's flank is already wider: 0.588 at y 1.10
     against 0.19 to 0.37 here. Lowering a silhouette that is entirely
     inside a taller one removes nothing from the union. tools/area.sh is
     what settles that rather than this paragraph. ── */
  /* 3  front arch, ARCH. The front tire reaches x 1.8020 and this station is
        18.0 mm ahead of it, so the arch line is open from here aft */
  [1.820, [...ARCH,
           [0.800, 0.600], [0.910, 0.520], [0.980, 0.350], [1.005, 0.180]], 1.015],
  /* 4  front axle, ARCH */
  [1.450, [...ARCH,
           [0.860, 0.600], [0.960, 0.530], [1.020, 0.360], [1.041, 0.185]], 1.050],
  /* 5  front shoulder closure, ARCH. x 1.120 is 22.0 mm inboard of the
        nearest front tire vertex at 1.0980 */
  [ARCH_X, [...ARCH,
           [0.891, 0.600], [0.989, 0.538], [1.050, 0.368], [1.065, 0.189]], 1.072],
  /* 6  cowl, and the first station at full shoulder. x 1.030 is the forward
        end of battery-11's 28-screw run and of this module's pan flange */
  [SHOULDER_X, [...SHLD,
           [0.900, 0.600], [0.996, 0.540], [1.055, 0.370], [1.069, 0.190]], 1.075],
  /* 7  windshield base and the forward shutline */
  [0.850, [...SHLD,
           [0.960, 0.600], [1.120, 0.560], [1.226, 0.390], [1.246, 0.200]], 1.256],
  /* 8  front occupant, and the roof reaches its crown */
  [0.300, [...SHLD,
           [1.020, 0.600], [1.190, 0.575], [1.295, 0.390], [1.319, 0.300]], 1.322],
  /* 9  maximum section, between the two occupants */
  [-0.450, [...SHLD,
            [1.040, 0.600], [1.210, 0.580], [1.295, 0.400], [1.319, 0.300]], 1.322],
  /* 10 rear shoulder closure, the aft end of the screw run and the flange */
  [-SHOULDER_X, [...SHLD,
            [1.020, 0.600], [1.200, 0.570], [1.293, 0.390], [1.319, 0.298]], 1.322],
  /* 11 rear arch, ARCH. x -1.120 is 22.0 mm inboard of the nearest rear tire
        vertex at -1.0980, and the rear occupant's head is over it */
  [-ARCH_X, [...ARCH,
            [1.020, 0.600], [1.200, 0.570], [1.293, 0.390], [1.319, 0.298]], 1.322],
  /* 12 rear axle, ARCH */
  [-1.440, [...ARCH,
            [0.940, 0.600], [1.090, 0.540], [1.196, 0.360], [1.212, 0.270]], 1.240],
  /* 13 THE COMPRESSION DATUM, still ARCH: the rear tire reaches x -1.8020 */
  [-1.850, [...ARCH,
            [0.860, 0.600], [1.000, 0.520], [1.108, 0.340], [1.124, 0.250]], 1.140],
  /* 12 0.600 - 0.173 tan 18.4 = 0.5424 */
  [-2.0230, [[0.510, 0.5424], [0.545, 0.5424], [0.590, 0.5424], [0.650, 0.5424],
             [0.820, 0.5310], [0.940, 0.4700], [1.045, 0.3100], [1.060, 0.2300]], 1.075],
  /* 13 0.600 - 0.385 tan 18.4 = 0.4719 */
  [-2.2345, [[0.545, 0.4719], [0.575, 0.4719], [0.615, 0.4719], [0.670, 0.4719],
             [0.800, 0.4610], [0.900, 0.4100], [0.975, 0.2750], [0.988, 0.2050]], 1.000],
  /* 14 Kamm face. 0.600 - 0.5927 tan 18.4 = 0.4028 */
  [KAMM, [[0.580, 0.4028], [0.605, 0.4028], [0.640, 0.4028], [0.690, 0.4028],
          [0.790, 0.3920], [0.860, 0.3500], [0.905, 0.2350], [0.920, 0.1750]], 0.930],
];

const RINGS = STATIONS.map(([x, half, crownY]) => ring(x, half, crownY));

/* Half-width of the loft at an arbitrary (x, y): linear between the two
   bracketing stations, linear between profile points inside each. body-7's
   helper, carried through body-8 and body-9, because every panel meant to
   lie on the surface is derived from the surface rather than placed by eye. */
function halfWidth(x, y) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  const pts = [];
  for (let k = 0; k < A[1].length; k++) {
    pts.push([(1 - t) * A[1][k][0] + t * B[1][k][0], (1 - t) * A[1][k][1] + t * B[1][k][1]]);
  }
  pts.push([(1 - t) * A[2] + t * B[2], 0]);
  if (y <= pts[0][0]) return pts[0][1];
  for (let k = 0; k < pts.length - 1; k++) {
    if (y <= pts[k + 1][0]) {
      const [y0, w0] = pts[k], [y1, w1] = pts[k + 1];
      return y1 === y0 ? w1 : w0 + (y - y0) / (y1 - y0) * (w1 - w0);
    }
  }
  return 0;
}

/* Lower edge of the loft at an arbitrary x: the shoulder's bottom line over
   the sill and the arch return at every wheel station. */
function bottomY(x) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  return (1 - t) * A[1][0][0] + t * B[1][0][0];
}

/* Inverse of halfWidth on the upper branch: the height at which the surface
   is hz wide, so struts and mounts land ON the deck instead of near it. */
function surfaceY(x, hz) {
  let lo = bottomY(x), hi = 1.45;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    if (halfWidth(x, mid) > hz) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/* x of a fractional station index, the inverse of rowOf below. */
function xOf(u) {
  const i = Math.max(0, Math.min(STATIONS.length - 2, Math.floor(u)));
  return STATIONS[i][0] + (u - i) * (STATIONS[i + 1][0] - STATIONS[i][0]);
}

/* Flat end cap built from a ring's own outline, so the nose and Kamm faces
   fill their apertures exactly instead of standing proud of a curved edge.
   closeLoop is not optional and body-9 is the proof: an open ring fanned to
   a shrunken copy leaves the sector across the bottom unfilled, and 24.0
   percent of body-9's nose window looked straight through the bodywork at
   the megacastings until it was closed. The fan also has to end on a real
   apex rather than on a shrunken ring, or a 46 by 13 mm slot is left at the
   center of each face. Both fixes are carried here from the start. */
function endCap(ringPts, dx, mat) {
  const ys = ringPts.map((p) => p[1]);
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const x0 = ringPts[0][0] + dx;
  const inner = ringPts.map(([x, y, z]) => [x + dx, cy + (y - cy) * 0.05, z * 0.05]);
  const apex = ringPts.map(() => [x0, cy, 0]);
  return lib.loft([ringPts, inner, apex], mat, true);
}

/* Angled box with chamfered edges: a chamfer is what turns one flat
   highlight into two, and on a car built largely out of boxes it is most of
   the crispness for almost none of the budget, 44 triangles against 12. */
function acbox(w, h, d, c, mat, x, y, z, rz = 0, rx = 0, ry = 0) {
  const m = lib.cbox(w, h, d, c, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz, 'ZXY');
  return m;
}

const NPT = 8;                        /* profile points per half ring */
const RIGHT = 2 * NPT;                /* ring index of the +z bottom edge */
const SEAM = 4;                       /* profile index of the beltline seam */
const COWL = 6;      /* ring index where the glass band starts, x 1.030 */
const DECK = 11;     /* ring index where the glass ends, x -1.120 */
const LAST = STATIONS.length - 1;

/* THE GLASS IS PROUD IN Y AND INSET IN Z, and that is a correction rather
   than a style. An earlier draft pushed the band 1.2 percent outboard as
   well as 8 mm up, which put its widest vertex at |z| 0.6072 and made the
   BUILT width of this car 1.2144 m against a contract that binds 1.20 m
   BUILT. The band is now inset 0.4 percent, so its widest vertex is 0.5976,
   2.4 mm inside the loft, the two surfaces still cannot z-fight, and the
   widest thing on this car above y 0.6200 is the painted flank at exactly
   0.6000. */
const glassBand = RINGS.slice(COWL, DECK + 1).map((r) =>
  r.slice(SEAM, 2 * NPT + 1 - SEAM).map((p) => [p[0], p[1] + 0.008, p[2] * 0.996])
);

/* ── The crisp shell: one master grid ──────────────────────────────────
   Every painted panel is a slice of ONE resampled loft rather than several
   independent ones, which is what lets a shutline be cut once and picked up
   in halves by the two parts either side of it.

   INTERPOLATION IS LINEAR AND THAT IS NOT NEGOTIABLE. The clamp in lib.loft
   protects the ENVELOPE, not the projected area: a surface that moves
   between two profile points moves the integral without touching any
   extreme. Measured over body-8's shell by one integrator, clamped
   Catmull-Rom costs +0.64 percent of A and unclamped +2.80. This body
   publishes a greenhouse half-width of exactly 0.600 against a tire inner
   face at 0.6725, and the 72.5 mm between them is the whole generation, so
   only linear is available here. ── */

function rowOf(x) {
  for (let i = 0; i < STATIONS.length - 1; i++) {
    if (x <= STATIONS[i][0] && x >= STATIONS[i + 1][0]) {
      return i + (STATIONS[i][0] - x) / (STATIONS[i][0] - STATIONS[i + 1][0]);
    }
  }
  return x > STATIONS[0][0] ? 0 : STATIONS.length - 1;
}

const GAP = { width: 0.005, depth: 0.004 };
const FADE = 0.05;

/* ── DOOR SHUTLINES, placed against BUILT partner geometry ─────────────
   Two cuts, not three, because a tandem cabin has one aperture a side.

   x 0.850, the forward cut. The windshield base station, so the cut lands
   where the surface already changes character. 180 mm behind the cowl ring
   at x 1.030 and 140 mm behind the cage A-pillar foot at x 0.99 that
   carries the hinges. There is no wheelhouse to clear: wheels-10's front
   tire reaches x 1.0917 at its rearmost and sits at |z| 0.6725, entirely
   outboard of a 0.600 flank, so the constraint that pushed body-9's forward
   cut aft does not exist on this car.

   x -0.940, the rear cut. 243 mm ahead of the rear tire's leading edge at
   x -1.1835, 90 mm ahead of the shoulder's full section at -1.030 and
   120 mm ahead of battery-11's sill, which ends at -1.060.

   Both ends of the span are panel edges. The cut runs from the loft's own
   bottom edge, which is the pan flange top at y 0.450, up to the beltline
   seam at profile point 5. Below the cut is battery-11's sill with this
   module's pan flange on it, and neither opens. ── */
const SHUT = [rowOf(0.850), rowOf(-0.940)];
const DOORL = [0, SEAM], DOORR = [RIGHT - SEAM, RIGHT];

/* Hood x 2.220 to 1.130, forward of the cowl at ring 5 and aft of the nose
   fascia band. Decklid x -1.160 to -2.100, leaving 343 mm of fixed tail
   under the spoiler mounts and the Kamm face. Side gaps on the deck
   shoulder, clear of the beltline seam. Only the decklid opens. */
const HOOD = [rowOf(2.220), rowOf(1.130)];
const LID = [rowOf(-1.160), rowOf(-2.100)];
const DECKSPAN = [5.6, RIGHT - 5.6];

const GROOVES = [];
for (const r of SHUT) {
  GROOVES.push({ row: r, ...GAP, span: DOORL, runout: FADE });
  GROOVES.push({ row: r, ...GAP, span: DOORR, runout: FADE });
}
for (const r of [...HOOD, ...LID]) {
  GROOVES.push({ row: r, ...GAP, span: DECKSPAN, runout: FADE });
}
for (const c of [6.3, RIGHT - 6.3]) {
  GROOVES.push({ col: c, ...GAP, span: [HOOD[0] - FADE, HOOD[1] + FADE], runout: FADE });
  GROOVES.push({ col: c, ...GAP, span: [LID[0] - FADE, LID[1] + FADE], runout: FADE });
}

const SHELL = lib.loftGrid(RINGS, {
  rowSub: 2, colSub: 2, interp: 'linear', grooves: GROOVES,
});

const RI = (u) => SHELL.rowIndex(u);
const CI = (v) => SHELL.colIndex(v);
const gp = (a, b) => {
  const k = (a * SHELL.cols + b) * 3;
  return [SHELL.pts[k], SHELL.pts[k + 1], SHELL.pts[k + 2]];
};

/* ── DECLARED CREASES, not a global angle threshold ────────────────────
   lib.crease takes one angle and applies it to every edge in a mesh, and on
   a body lofted through fifteen coarse stations that cannot work: a
   threshold cannot tell a designed edge from the kink a coarse table puts in
   the surface. body-8 shipped the global version and its nose went
   polygonal. So the creases here are DECLARED as sets of grid lines, and a
   declared line still has to show a real turn before it breaks.

   RING LINES: profile points 1 and 6, and their mirrors. Point 1 is the
   SHOULDER, the top of the pan flange, and it is the one genuinely new
   crease on this car: the surface turns 31 degrees there mid-car, from a
   vertical flange face to the fairing. Point 6 is the deck shoulder, which
   is body-9's declaration carried and is what makes a Kamm tail read as a
   tail. Nothing else is declared, and in particular no STATION line is,
   because the three biggest turns along x on this table are all
   parametrization artifacts of the kind body-9 measured and refused to
   break. ── */
const GATE = 24;
const HARDROW = new Set();
const HARDCOL = new Set([CI(1), CI(3), CI(6), CI(RIGHT - 6), CI(RIGHT - 3), CI(RIGHT - 1)]);
for (const g of SHELL.grooves) {
  const S = g.axis === 'row' ? HARDROW : HARDCOL;
  S.add(g.i0); S.add(g.f0); S.add(g.f1); S.add(g.i1);
}

/* Split the normals of a grid panel along the declared lines only. Costs
   zero triangles: the geometry is de-indexed, which triples the vertex count
   and leaves positions, UVs and winding untouched. Carried from body-9. */
function creaseDeclared(mesh, r0, c0, R, C) {
  const geo = mesh.geometry.toNonIndexed();
  const pos = geo.attributes.position.array;
  const nf = pos.length / 9, CC = C - 1;
  const fn = new Float64Array(nf * 3);
  for (let f = 0; f < nf; f++) {
    const a = f * 9;
    const ux = pos[a + 3] - pos[a], uy = pos[a + 4] - pos[a + 1], uz = pos[a + 5] - pos[a + 2];
    const wx = pos[a + 6] - pos[a], wy = pos[a + 7] - pos[a + 1], wz = pos[a + 8] - pos[a + 2];
    const nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
    const L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    fn[f * 3] = nx / L; fn[f * 3 + 1] = ny / L; fn[f * 3 + 2] = nz / L;
  }
  const qsum = (a, b) => {
    if (a < 0 || a >= R - 1 || b < 0 || b >= CC) return null;
    const q = (a * CC + b) * 6;
    return [fn[q] + fn[q + 3], fn[q + 1] + fn[q + 4], fn[q + 2] + fn[q + 5]];
  };
  const unit = (v) => {
    const L = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / L, v[1] / L, v[2] / L];
  };
  const cosG = Math.cos((GATE * Math.PI) / 180);
  const nrm = new Float32Array(pos.length);
  const find = (p, i) => { while (p[i] !== i) i = p[i]; return i; };
  for (let f = 0; f < nf; f++) {
    const q = f >> 1, a = (q / CC) | 0, b = q % CC;
    const corners = (f & 1) ? [[a, b + 1], [a + 1, b], [a + 1, b + 1]]
                            : [[a, b], [a + 1, b], [a, b + 1]];
    for (let k = 0; k < 3; k++) {
      const va = corners[k][0], vb = corners[k][1];
      const qa = [va - 1, va], qb = [vb - 1, vb];
      const S = [qsum(qa[0], qb[0]), qsum(qa[0], qb[1]), qsum(qa[1], qb[0]), qsum(qa[1], qb[1])];
      const p = [0, 1, 2, 3];
      const join = (i, j) => { const ri = find(p, i), rj = find(p, j); if (ri !== rj) p[ri] = rj; };
      const turns = (i, j) => {
        const u = unit(S[i]), v = unit(S[j]);
        return u[0] * v[0] + u[1] * v[1] + u[2] * v[2] < cosG;
      };
      const hardR = HARDROW.has(r0 + va), hardC = HARDCOL.has(c0 + vb);
      for (const cs of [0, 1]) {
        if (S[cs] && S[2 + cs] && !(hardR && turns(cs, 2 + cs))) join(cs, 2 + cs);
      }
      for (const rs of [0, 1]) {
        if (S[rs * 2] && S[rs * 2 + 1] && !(hardC && turns(rs * 2, rs * 2 + 1))) join(rs * 2, rs * 2 + 1);
      }
      const root = find(p, (a === va - 1 ? 0 : 2) + (b === vb - 1 ? 0 : 1));
      let sx = 0, sy = 0, sz = 0;
      for (let s = 0; s < 4; s++) {
        if (!S[s] || find(p, s) !== root) continue;
        sx += S[s][0]; sy += S[s][1]; sz += S[s][2];
      }
      const L = Math.hypot(sx, sy, sz);
      const o = (f * 3 + k) * 3;
      if (L > 1e-12) { nrm[o] = sx / L; nrm[o + 1] = sy / L; nrm[o + 2] = sz / L; }
      else { nrm[o] = fn[f * 3]; nrm[o + 1] = fn[f * 3 + 1]; nrm[o + 2] = fn[f * 3 + 2]; }
    }
  }
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  mesh.geometry = geo;
  return mesh;
}

const panel = (rows, cols) => {
  const m = lib.loftMesh(SHELL, M.paint, { rows, cols });
  return lib.shell(creaseDeclared(m, rows[0], cols[0],
    rows[1] - rows[0] + 1, cols[1] - cols[0] + 1));
};

/* End cap taken off the master grid's own edge ring, so the nose and Kamm
   faces close against the subdivided panels exactly. */
function capOf(rowIdx, dx, mat) {
  const r = [];
  for (let b = 0; b < SHELL.cols; b++) r.push(gp(rowIdx, b));
  return endCap(r, dx, mat);
}

/* Column bands in resolved indices. FULL is the whole open ring, used
   wherever ONE part owns the shoulder, the flank and the deck at the same
   station: the nose and the tail cone. */
const SHOULDL = [0, CI(3)], SHOULDR = [CI(RIGHT - 3), CI(RIGHT)];
const FLANKR = [CI(RIGHT - SEAM), CI(RIGHT - 3)];
/* The port mirror of FLANKR, spelled out because the SKIN is not mirrored the
   way the doors are: profile point 3 to the beltline seam, which is the strip
   of paint between the flank and the glass. */
const FLANKL = [CI(3), CI(SEAM)];
const UP = [CI(SEAM), CI(RIGHT - SEAM)];
const MIDBAND = [CI(3), CI(RIGHT - 3)];
/* THE SHOULDER'S OWN ROW SPAN, and it is the whole of blocker 2's fix. RB
   and RC are the two ARCH stations either side of the sill, so the shoulder
   part is built over x 1.120 to -1.120 and nowhere else. RD is the tail
   closure datum; between RC and RD the skin carries an ARCH section over the
   rear wheel. */
const RB = 5, RC = 11, RD = 13;
const FULL = [0, SHELL.cols - 1];
/* each shutline pushed a left and a right groove; both resolve to the same
   split row, which is the far floor edge of the channel */
const CUT = [SHELL.grooves[0].split, SHELL.grooves[2].split];

/* THE HOOD'S AND THE DECKLID'S OWN FOUR CUT LINES EACH, read off the grid's
   records rather than re-derived. The rows are the two hood gaps and the two
   lid gaps declared above; the columns are the side gaps pushed over each
   lid's span. Resolved: the hood is rows [7, 23] by columns [27, 46] and the
   lid is rows [57, 72] by columns [28, 47].

   THE TWO LIDS DO NOT SHARE A COLUMN PAIR, and that is worth stating because
   every instinct says they should: both side gaps are declared at the same
   ring parameters, 6.3 and RIGHT - 6.3, so a reader expects one pair of grid
   columns to serve both. They do not. lib.loftGrid sizes a 5 mm channel from
   the local meters-per-index scale probed along the groove's OWN span, and
   these two spans are on opposite ends of a body whose ring spacing is not
   uniform: measured, the hood gap's parametric half-width comes out 0.01461
   and the lid gap's 0.02826, so the same declared 5 mm gap lands on columns
   27 and 46 forward and on 28 and 47 aft. Reading the split off each groove's
   own record gets that right without anybody having to know it. Deriving the
   columns once and using them twice would have cut the decklid one grid
   column narrow on each side and moved a strip of paint from the lid to the
   quarters, which the soup hash would not have caught, because the soup hash
   is blind to which mesh owns a triangle and that is the whole point of it. */
const HOODROW = [SHELL.grooves[4].split, SHELL.grooves[5].split];
const HOODCOL = [SHELL.grooves[8].split, SHELL.grooves[10].split];
const LIDROW = [SHELL.grooves[6].split, SHELL.grooves[7].split];
const LIDCOL = [SHELL.grooves[9].split, SHELL.grooves[11].split];

/* ── The lower valance and the nose aperture, narrowed with the car ─────
   body-7's valance written as its two interpolants rather than as a table,
   because the panel and the hole cut in it have to be the same surface to
   the last decimal. The x interpolant is body-7's UNCHANGED, which is what
   holds this module's built maximum x at the nose. The half-width
   interpolant comes in from 0.510 / 0.446 to 0.400 / 0.350, because a
   valance wider than the nose it feeds is a valance feeding the wake. ── */
const vx = (y) => (y < 0.280 ? 2.240 + (y - 0.128) / 0.152 * 0.085
                             : 2.325 + (y - 0.280) / 0.140 * 0.048);
const vhz = (y) => (y < 0.280 ? 0.400 + (y - 0.128) / 0.152 * -0.006
                              : 0.394 + (y - 0.280) / 0.140 * -0.044);
const RAKE = Math.atan2(0.133, 0.292);        /* valance lean, 24.5 degrees */
const AP = { y0: 0.214, y1: 0.360, z: 0.206 };

/* The marque: a chevron, extruded with a beveled rim. A decal has no edge
   for a softbox to find; a badge does. */
const CHEVRON = [
  [-0.045, 0.000], [-0.017, -0.019], [0.000, -0.007], [0.017, -0.019],
  [0.045, 0.000], [0.017, 0.019], [0.000, 0.007], [-0.017, 0.019],
];

export function build() {
  const sys = new THREE.Group();
  buildStructure(sys);
  buildShell(sys);
  return sys;
}

/* ── structure ── */
function buildStructure(sys) {
  const fc = lib.part('front-casting', [0.85, -0.35, 0]);
  for (const s of [-1, 1]) {
    /* rail and cradle spar, |z| 0.335 to 0.535: it followed the crash rail
       inboard, and it is not a suspension interface at any height */
    fc.add(acbox(0.51, 0.28, 0.20, 0.012, M.castAlu, 1.805, 0.44, s * 0.435));
    /* SHOCK TOWER PAD, HELD at body-9's coordinate to the digit. It receives
       suspension-9's tower plate at (1.50, 0.735, +-0.41) and a damper body
       topping out at y 0.729, and moving it would move a datum the carried
       corner hangs off. */
    fc.add(acbox(0.20, 0.055, 0.24, 0.008, M.castAlu, 1.545, 0.745, s * 0.430));
    fc.add(acbox(0.11, 0.20, 0.07, 0.008, M.castAlu, 1.600, 0.650, s * 0.480));
    const rib = lib.fins(0.45, 0.045, 0.16, 4, 0.012, M.castAlu);
    rib.position.set(1.805, 0.60, s * 0.435);
    fc.add(rib);
    /* SUBFRAME BUSHING BOSSES, drawn for the first time on this ladder. Their
       INNER faces lie exactly on |z| 0.500, which is the plane suspension-9
       seats on at (x, 0.297, +-0.50) and the plane this module declares.
       body-9 asserted this interface in prose and put no vertex on it. */
    const boss = lib.cyl(0.030, 0.060, M.castAlu, 12);
    boss.rotation.x = Math.PI / 2;
    boss.position.set(1.72, 0.300, s * 0.530);      /* |z| 0.500 to 0.560 */
    fc.add(boss);
  }
  /* lower crossmember at the casting's front face, narrowed with the beam */
  fc.add(acbox(0.07, 0.07, 0.56, 0.010, M.castAlu, 2.035, 0.335, 0));
  sys.add(fc);

  const rc = lib.part('rear-casting', [-0.85, -0.35, 0]);
  for (const s of [-1, 1]) {
    rc.add(acbox(0.45, 0.28, 0.20, 0.012, M.castAlu, -1.825, 0.44, s * 0.435));
    /* C-pillar node, inboard with the cage */
    rc.add(acbox(0.18, 0.16, 0.15, 0.010, M.castAlu, -1.70, 0.66, s * 0.420));
    const rib = lib.fins(0.40, 0.045, 0.16, 4, 0.012, M.castAlu);
    rib.position.set(-1.825, 0.60, s * 0.435);
    rc.add(rib);
    rc.add(acbox(0.17, 0.09, 0.09, 0.008, M.alu, -2.065, 0.55, s * 0.36));
    const boss = lib.cyl(0.030, 0.060, M.castAlu, 12);
    boss.rotation.x = Math.PI / 2;
    boss.position.set(-1.72, 0.300, s * 0.530);     /* |z| 0.500 to 0.560 */
    rc.add(boss);
  }
  rc.add(acbox(0.23, 0.28, 0.60, 0.014, M.castAlu, -1.935, 0.44, 0));
  rc.add(acbox(0.06, 0.10, 0.90, 0.008, M.alu, -2.150, 0.55, 0));
  rc.add(acbox(0.03, 0.28, 0.70, 0.006, M.alu, -2.230, 0.60, 0));
  sys.add(rc);

  /* front crash rails and bumper beam: same section, same stroke, 300 mm
     less span. The beam corner is now 40.6 mm inside the skin. */
  const rails = lib.part('crash-rails', [0.95, -0.05, 0]);
  for (const s of [-1, 1]) {
    rails.add(acbox(0.54, 0.09, 0.09, 0.008, M.alu, 1.97, 0.55, s * 0.44));
    rails.add(acbox(0.02, 0.15, 0.12, 0.005, M.alu, 1.71, 0.55, s * 0.425));
  }
  rails.add(acbox(0.06, 0.10, 1.00, 0.008, M.alu, 2.24, 0.55, 0));
  sys.add(rails);

  /* THE CAGE. A-pillar, roof rail, C-pillar and three transverse bows. No
     B-pillar: a tandem cabin has one aperture a side and nothing between the
     occupants to hang a pillar on, so the mid-span side load goes into
     battery-11's sill instead. The bow section is 22 mm rather than body-9's
     26, which is what buys the 30 mm roof-structure budget. */
  const cageSide = lib.part('cage', [0, 0.36, 0]);
  /* THE CAGE LANDS ON THE PAN FLANGE AT y 0.4500, WHICH IS BOLTED TO
     battery-11'S SILL TOP AT 0.4200. An earlier draft of this module built
     this cage with a minimum y of 0.6891, so it touched nothing but the
     shell skin at 3.0 mm and stopped 269 mm above the sill: a cage that
     lands on nothing is not a cage. The sill rail below is a horizontal
     member, so its own radius puts its lowest surface exactly on the flange
     plane rather than a radius above it, and the two legs off its ends are
     what carry the roof ring down into the pack. body-9's cage lands on its
     rockers at the same 0.4200 plane and measures a minimum y of 0.4381. */
  const members = [
    /* SILL RAIL. A 25 mm tube lying on the pan flange at y 0.4500, in the
       25 mm of clear flange between the pan upstand's outer face at
       |z| 0.6900 and the 28 bolt heads at 0.7132. It is horizontal on
       purpose: a horizontal tube's own radius puts its lowest surface
       exactly on the plane it lands on, where a raked leg would stop a
       radius above it and land on nothing. */
    [0.0125, [[PAN_X - 0.020, 0.4625, 0.7016], [-(PAN_X - 0.020), 0.4625, 0.7016]]],
    /* hinge pillar: the sill rail up to the A-pillar foot, coming inboard
       fast because the loft is at |z| 0.6900 at y 0.560 and 0.6000 at 0.620 */
    [0.020, [[PAN_X - 0.020, 0.4625, 0.7016], [1.005, 0.5500, 0.6450],
             [1.000, 0.6400, 0.5300], [0.99, 0.880, 0.4200]]],
    [0.026, [[0.99, 0.880, 0.420], [0.90, 1.020, 0.402], [0.86, 1.140, 0.372],
             [0.80, 1.222, 0.340], [0.55, 1.290, 0.300]]],          /* A-pillar */
    [0.021, [[0.55, 1.290, 0.300], [-1.100, 1.292, 0.300]]],        /* roof rail */
    [0.024, [[-1.100, 1.292, 0.300], [-1.380, 1.188, 0.318],
             [-1.560, 0.988, 0.360], [-1.700, 0.700, 0.400]]],      /* C-pillar */
    /* rear leg: the sill rail up to the C-pillar's foot on the rear casting */
    [0.020, [[-(PAN_X - 0.020), 0.4625, 0.7016], [-1.015, 0.5500, 0.6450],
             [-1.022, 0.6400, 0.5300], [-1.100, 0.7200, 0.4800],
             [-1.700, 0.7000, 0.4000]]],
  ];
  for (const [r, m] of members) cageSide.add(lib.tube(m, r, M.darkSteel));
  cageSide.add(acbox(0.70, 0.016, 0.015, 0.003, M.plastic, -0.35, 1.270, 0.2825));
  sys.add(cageSide);
  sys.add(mirrorZ(cageSide));

  const cageMid = lib.part('cage', [0, 0.36, 0]);
  /* Three transverse bows. r 0.010 centered on y 1.3090, so the crown touches
     the loft at 1.3190 and the SOFFIT is y 1.2990: that is the liner plane
     this module publishes, 31.0 mm under the built roof at 1.3300. They span
     |z| +-0.26 rather than +-0.30 because the loft falls over the last 40 mm
     and a bow to 0.300 would stand proud of the skin. */
  for (const bx of [0.300, -0.450, -1.100]) {
    cageMid.add(lib.tube([[bx, 1.3090, -0.260], [bx, 1.3090, 0.260]], 0.010, M.darkSteel));
  }
  cageMid.add(lib.tube([[0.99, 0.870, -0.420], [0.99, 0.870, 0.420]], 0.026, M.darkSteel));
  sys.add(cageMid);
}

/* ── the Gen 11 shell ── */
function buildShell(sys) {
  /* ── skin: the nose and the quarters around the hood, the cowl deck, the
     beltline strips either side of the door cuts, the deck around the
     decklid, and the nose face. ── */
  /* ── THE SKIN STOPS AT THE GREENHOUSE, and it did not.

     This module's canopy panel publishes "Span: Cowl x 1.030 to x -1.120",
     and the glass band is built over exactly those rings, COWL to DECK, in
     the columns between the two beltline seams. Then the skin painted over
     every square millimeter of it: MIDBAND is columns 3 to 13 and UP is 4 to
     12, so the three panels below carried opaque CFRP across the whole
     greenhouse from the cowl to the rear arch, with the glass sitting 8 mm
     outside it and nothing to see through. The counterpart the mass and the
     laminate are both scaled from, body-9, stops its hood panel AT its own
     COWL ring and paints no greenhouse at all.

     What that cost was measured rather than argued: tools/occupant.sh's
     vision check put the front occupant at 8 of 8 sightlines blocked, four of
     them by this part, against body-9's 3 of 8 clear through its canopy. A
     car nobody could see out of passed every other gate the model has.

     The rows either side of the door cuts still need their beltline strip,
     which is the paint between the flank and the glass; the strip BETWEEN
     the cuts already belongs to the doors, which build FLANKR and mirror it.
     Nothing moves in space here. Not one vertex of the loft changes, so the
     frontal area, the penetration set and every clearance in this file are
     the same as before; panels are removed, not redrawn. ── */
  /* ── AND THE HOOD AND THE DECKLID COME OUT OF IT, which is a RE-SLICE and
     not a redraw. Both sets of four cut lines were grooved into the master
     grid the day the shutlines were declared, and the panels below simply ran
     over the top of them: the nose was one panel from the face to the front
     shoulder closure and the rear was one panel over the arch, so the car had
     the LINES of a hood and a decklid and neither of them opened. Davis noticed
     exactly that.

     What each part keeps is the band ahead of its lid, the two quarters either
     side of it and the band behind it. Every panel here is a slice of the same
     master grid at the same indices it always ran across, so the union of the
     pieces is the quad for quad the single panel was, and tools/geohash.sh
     --soup is the proof rather than this paragraph. ── */
  const skin = lib.part('skin', [0, 0.62, 0]);
  skin.add(panel([RI(0), HOODROW[0]], FULL));           /* nose, ahead of the hood */
  skin.add(panel(HOODROW, [0, HOODCOL[0]]));            /* left of the hood */
  skin.add(panel(HOODROW, [HOODCOL[1], SHELL.cols - 1]));  /* right of it */
  skin.add(panel([HOODROW[1], RI(RB)], FULL));          /* the band aft of the hood */
  skin.add(panel([RI(RB), RI(COWL)], MIDBAND));         /* cowl deck */
  skin.add(panel([RI(COWL), CUT[0]], FLANKL));          /* cowl sides, ahead of the door */
  skin.add(panel([RI(COWL), CUT[0]], FLANKR));
  skin.add(panel([CUT[1], RI(RC)], FLANKL));            /* rear quarters, behind it */
  skin.add(panel([CUT[1], RI(RC)], FLANKR));
  skin.add(panel([RI(RC), LIDROW[0]], FULL));           /* over the rear arch, ahead of the lid */
  skin.add(panel([LIDROW[0], RI(RD)], [0, LIDCOL[0]]));            /* left of the lid */
  skin.add(panel([LIDROW[0], RI(RD)], [LIDCOL[1], SHELL.cols - 1]));  /* right of it */
  skin.add(lib.shell(capOf(RI(0), -0.012, M.paint)));   /* nose face, closed */
  sys.add(skin);

  /* ── the shoulder fairing: the loft's lowest two profile intervals over
     the pack's own x span. It is a slice of the master surface rather than a
     bonded add-on, so the crease at profile point 1 is the same line the
     flank above it breaks on. ── */
  const shoulder = lib.part('shoulder', [0, -0.25, 1.0]);
  shoulder.add(panel([RI(RB), CUT[0]], SHOULDL));
  shoulder.add(panel([RI(RB), CUT[0]], SHOULDR));
  shoulder.add(panel([CUT[0], CUT[1]], SHOULDL));
  shoulder.add(panel([CUT[0], CUT[1]], SHOULDR));
  shoulder.add(panel([CUT[1], RI(RC)], SHOULDL));
  shoulder.add(panel([CUT[1], RI(RC)], SHOULDR));
  sys.add(shoulder);

  /* ── tail cone: one panel over the whole ring aft of the closure station,
     plus the Kamm face and the marque. ── */
  /* THE DECKLID STRADDLES THIS PART AND THE SKIN, because the cut and the
     aerodynamic closure station are 690 mm apart and neither was drawn with
     the other in mind. The lid runs x -1.1601 to -2.0997 and this part begins
     at the compression datum, x -1.850, so 0.4824 m2 of the lid is the skin's
     rows and 0.1610 m2 is this part's. A closure is one rigid body and one
     group, so it carries ONE part id, and it carries `skin`: three quarters of
     it by area, and the skin's own spec line already books both panel joints,
     "Hood x 2.220 to 1.130, decklid -1.160 to -2.100". What this part keeps
     over the lid's rows is the two quarters outboard of the side gaps. */
  const tail = lib.part('tail-cone', [-1.45, 0.30, 0]);
  tail.add(panel([RI(RD), LIDROW[1]], [0, LIDCOL[0]]));             /* left quarter */
  tail.add(panel([RI(RD), LIDROW[1]], [LIDCOL[1], SHELL.cols - 1]));  /* right quarter */
  tail.add(panel([LIDROW[1], RI(LAST)], FULL));                     /* the fixed tail band */
  tail.add(lib.shell(capOf(RI(LAST), 0.012, M.paint)));
  /* The depth is set by the panel and not by taste: the Kamm face is a cone
     from the ring outline to a near point rather than a plane, so a thin
     badge stands proud at one corner and sinks behind the panel at the
     other. 4.4 mm with its back face 2.2 mm inside the cap clears both. */
  const mark = lib.badge(CHEVRON, 0.0044, M.alu);
  mark.rotation.y = -Math.PI / 2;
  mark.position.set(KAMM + 0.0135, 0.760, 0);
  tail.add(mark);
  sys.add(tail);

  /* ── THE TWO LIDS. Each is one panel and one group, both carrying the part
     id `skin` so the shell stays one clickable thing with one panel, exactly
     as the four doors on the swing-door rungs stay one `doors` part. Neither
     is mirrored: each spans the centerline in the master grid's own column
     order, which is the arrangement the canopy's tumblehome had to be split
     by hand to reach and is free here. ── */
  const hood = lib.hinge(lib.part('skin', [0, 0.62, 0]), 'hood');
  hood.add(panel(HOODROW, HOODCOL));
  sys.add(hood);

  const lid = lib.hinge(lib.part('skin', [0, 0.62, 0]), 'decklid');
  lid.add(panel(LIDROW, LIDCOL));
  sys.add(lid);

  /* ── glass canopy band, 8 mm proud of the same stations ── */
  /* THE BAND PARTS AT THE DECK SHOULDER, so the tumblehome can travel with
     the door and the roof can stay bonded to the cage.

     Ring index 10 is where it splits, and that line was already there: it is
     half[6], the deck shoulder, and it is one of the two ring lines this
     module already declares as a hard crease. So the seam a parting line
     needs coincides with a break the painted surface already has, rather
     than putting a shading edge across a face that was meant to be smooth.

     What stays fixed is ring 6 to 10, which is the roof band between the two
     deck shoulders. That is the piece sitting over the cage's three
     transverse bows and its roof rails at |z| 0.300, and it is the piece
     whose bond matters. What travels is ring 10 to 12 each side, the
     tumblehome between the deck shoulder and the beltline seam, which spans
     nothing structural: the rails are inboard of it and the sill is below
     it. The door was a 409 mm letterbox without this and it is a 707 mm
     aperture with it.

     Both pieces keep the part id `canopy`, so the glass is still one
     clickable part with one panel, exactly as body.js does with its side
     panes. The split is a REGROUPING: ring 10 is shared by both lofts, so
     the quads either side of it are the quads the single band already had,
     and tools/geohash.sh --soup proves it moved nothing. */
  const ROOFSPLIT = 6;   /* glassBand index of ring 10, the deck shoulder */
  const canopy = lib.part('canopy', [0, 1.05, 0]);
  canopy.add(lib.shell(lib.loft(glassBand.map((r) => r.slice(2, ROOFSPLIT + 1)), M.glass)));
  sys.add(canopy);
  /* The tumblehome each side, tagged to travel with the door it is the upper
     half of. BOTH SIDES ARE AUTHORED, and lib.mirrorZ is deliberately not
     used here, which is the one place on this car that is true.

     Mirroring reverses the order the profile points arrive in, and lib.loft
     splits every quad along the diagonal from (row, col+1) to (row+1, col).
     Reverse the columns and that diagonal connects the other two corners of
     the same four vertices. Measured: mirroring the +z piece left every
     vertex exactly where it was and re-triangulated 20 of them on the -z
     tumblehome, which tools/geohash.sh --soup correctly refused. The two
     halves are therefore sliced from the band's own two ends, in the band's
     own order, and the third argument to lib.hinge says which side a group
     was authored on so the viewer conjugates the motion for the far one. */
  const sideGlass = (lo, hi, mir) => {
    const g = lib.hinge(lib.part('canopy', [0, 1.05, 0]), 'door', mir);
    g.add(lib.shell(lib.loft(glassBand.map((r) => r.slice(lo, hi)), M.glass)));
    return g;
  };
  sys.add(sideGlass(ROOFSPLIT, 9, false));                /* +z, ring 10 to 12 */
  sys.add(sideGlass(0, 2 * NPT + 1 - 2 * SEAM - ROOFSPLIT, true));  /* -z, ring 4 to 6 */

  /* ── THE SILL PAN. THERE IS NO CABIN FLOOR IN THIS MODULE AND THERE MUST
     NOT BE ONE. battery-11's lid at y 0.3020 is the cabin floor, exactly as
     it has been on every rung from Gen 5, and interior-6 says so in its own
     header and draws no floor of its own. An earlier draft of this module
     drew a structural pan straight across the cabin at y 0.3500 to 0.4517
     and it destroyed the generation: over a floor 150 mm above the lid, the
     occupant crown given by design/gen11.md section 5's own relation lands
     at 1.3976, which is 67.6 mm through the roof bows of even a 1.330 m
     roof. It also created a 48 mm dead cavity and a second set of seat rails
     over the four battery-11 already potted into the brick tops, which is
     design/retro-gen10.md's wasted-volume defect recreated by the generation
     that exists to fix it.

     What is left is structure OUTBOARD of the cabin and nothing else: a
     flange on the sill top from |z| 0.6600 to 0.7800 and an upstand inboard
     of it that closes the shoulder into a box. Inboard of |z| 0.6300 this
     module draws nothing at all between the lid and the roof. ── */
  const pan = lib.part('floor-pan', [0, -0.45, 0]);
  /* x -1.030 to 1.030, which is battery-11's own 28-screw run to the digit
     rather than a number of this module's choosing. */
  const PAN_L = 2 * PAN_X;
  for (const s of [-1, 1]) {
    /* THE FLANGE. It seats on battery-11's sill top at y 0.4200 and stops on
       its outer face at |z| 0.7800. Both planes are declared, and this part
       exists at y >= 0.4200 and |z| <= 0.7800 ONLY, so the two declarations
       are true of every vertex in it rather than only of one face. */
    const flange = lib.cbox(PAN_L, PAN_T, SILL_Z - HEAD_ZI, 0.004, M.carbon);
    flange.position.set(0, SILL_TOP + PAN_T / 2, s * (HEAD_ZI + (SILL_Z - HEAD_ZI) / 2));
    pan.add(flange);
    /* THE UPSTAND. A 30 mm web standing on the flange's inboard edge, so its
       inner face continues the sill head's own inner face at |z| 0.6600 and
       the cabin side is one plane from the pack lid at y 0.3020 up to
       0.5600. Its outboard top corner lands exactly on the shoulder's own
       crease at (0.5600, 0.6900), so flange, upstand and shoulder skin close
       a triangular box on the sill top. A flange on its own is a strap. */
    const up = lib.cbox(PAN_L, 0.1100, PAN_T, 0.004, M.carbon);
    up.position.set(0, PAN_FLANGE + 0.0550, s * (HEAD_ZI + PAN_T / 2));
    pan.add(up);
    /* 28 bolt heads, one number for one joint: these are battery-11's own 28
       flow-drill screws per side at its own stations, x -1.03 to 1.03 at a
       76.3 mm pitch. An earlier draft drew 14 at 155 mm and called it 28 in
       the comment above them. */
    for (let i = 0; i < 28; i++) {
      const f = lib.fastener(0.005, M.steel, 'hex', { height: 0.0012, flange: 0.0068, flangeT: 0.0005 });
      f.position.set(-PAN_X + (i * 2 * PAN_X) / 27, PAN_FLANGE, s * 0.720);
      pan.add(f);
    }
  }
  sys.add(pan);

  /* ── doors: the skins ARE the master surface between the two shutlines.
     Each door carries the far wall and lip of the cut in front of it and the
     near lip, wall and floor of the cut behind it. ── */
  const doors = lib.hinge(lib.part('doors', [0.08, 0, 0.85]), 'door');
  doors.add(panel([CUT[0], CUT[1]], FLANKR));   /* profile 3 to 4: the flank */
  /* the surround camera, flush in the A-pillar base: outer face |z| 0.5980,
     which is 2 mm inside a 0.600 flank. body-9 put this on a 90 mm stalk at
     0.9768 and made a camera the widest thing on the car. */
  sys.add(doors);
  sys.add(mirrorZ(doors));
  /* the surround camera and its trim strip are at x 0.90 and 0.86, FORWARD of
     the door's own forward cut at 0.850, so they are on the A-pillar base and
     not on the leaf. They keep the part id and carry no hinge. */
  const pillarKit = lib.part('doors', [0.08, 0, 0.85]);
  const zc = halfWidth(0.90, 0.980);
  pillarKit.add(acbox(0.05, 0.028, 0.020, 0.004, M.sensor, 0.90, 0.980, 0.5880));
  pillarKit.add(acbox(0.09, 0.020, 0.012, 0.003, M.alu, 0.86, 0.980, Math.min(zc, 0.5940) - 0.004));
  sys.add(pillarKit);
  sys.add(mirrorZ(pillarKit));

  /* ── sealed venturi underbody, narrowed with the car ── */
  const floorPart = lib.part('venturi-floor', [0, -0.55, 0]);
  const splitter = lib.plate(0.26, 0.80, 0.016, 0.06, M.carbon);
  splitter.position.set(2.228, 0.112, 0);
  floorPart.add(lib.shell(splitter));
  const vrow = (y) => {
    const h = vhz(y);
    return [-h, -AP.z, -AP.z / 2, 0, AP.z / 2, AP.z, h].map((z) => [vx(y), y, z]);
  };
  floorPart.add(lib.shell(lib.loft([vrow(0.128), vrow(AP.y0)], M.carbon)));
  floorPart.add(lib.shell(lib.loft([vrow(AP.y1), vrow(0.420)], M.carbon)));
  for (const s of [-1, 1]) {
    floorPart.add(lib.shell(lib.loft([AP.y0, 0.280, AP.y1].map((y) =>
      [[vx(y), y, s * AP.z], [vx(y), y, s * (AP.z + vhz(y)) / 2], [vx(y), y, s * vhz(y)]]), M.carbon)));
  }
  /* The throat. An aperture with a short return lets daylight read straight
     through the car, so the rim carries back to a mouth ahead of the
     radiator stack's forwardmost station, which this ladder has never moved. */
  const rim = (at) => {
    const p = [], b = at(AP.y0), k = at(0.280), t = at(AP.y1);
    for (const z of [-AP.z, -AP.z / 2, 0, AP.z / 2, AP.z]) p.push([b[0], b[1], z]);
    p.push([k[0], k[1], AP.z]);
    for (const z of [AP.z, AP.z / 2, 0, -AP.z / 2, -AP.z]) p.push([t[0], t[1], z]);
    p.push([k[0], k[1], -AP.z]);
    return p;
  };
  const MOUTH = { x: 2.215, y0: 0.256 };
  floorPart.add(lib.shell(lib.crease(lib.loft([
    rim((y) => [vx(y), y]),
    rim((y) => [MOUTH.x, MOUTH.y0 + (y - AP.y0) / (AP.y1 - AP.y0) * (AP.y1 - MOUTH.y0)]),
  ], M.carbon, true), 40)));
  for (const s of [-1, 1]) {
    floorPart.add(acbox(0.28, 0.05, 0.012, 0.004, M.carbon, 2.16, 0.19, s * 0.34));
  }
  for (const z of [-0.30, -0.14, 0.14, 0.30]) {
    const f = lib.fastener(0.0040, M.steel, 'hex');
    f.position.set(2.170, 0.136, z);
    floorPart.add(f);
  }
  /* front closeout held at |z| 0.620 rather than taken out to the pack's own
     0.780: the front tires occupy |z| 0.6725 to 0.8075 from x 1.1835 to
     1.8050 and a wider plate would be inside them for half a meter */
  const closeF = lib.plate(0.78, 1.24, 0.012, 0.04, M.carbon);
  closeF.position.set(1.71, 0.10, 0);
  floorPart.add(lib.shell(closeF));
  const closeR = lib.plate(0.60, 1.24, 0.012, 0.04, M.carbon);
  closeR.position.set(-1.600, 0.10, 0);
  floorPart.add(lib.shell(closeR));
  for (const z of [-0.50, -0.21, 0.21, 0.50]) {
    floorPart.add(acbox(0.56, 0.055, 0.010, 0.003, M.carbon, -1.61, 0.13, z));
  }
  sys.add(floorPart);

  /* ── intake gates: a 0.44 m bank over a real hole ── */
  const gates = lib.part('intake-gates', [1.3, -0.08, 0]);
  const SET = 0.018;
  const mesh = lib.grille(0.440, 0.186, 0.022, M.darkSteel, {
    bars: 17, cross: 5, barW: 0.0045, chamfer: 0.0009,
  });
  mesh.rotation.y = Math.PI / 2;
  const back = new THREE.Group();
  back.add(mesh);
  back.rotation.z = -RAKE;
  back.position.set(vx(0.287) - (SET + 0.011) * Math.cos(RAKE),
                    0.2870 + (SET + 0.011) * Math.sin(RAKE), 0);
  gates.add(back);
  for (let i = 0; i < 4; i++) {
    const y = 0.215 + i * 0.048;
    gates.add(acbox(0.012, 0.05, 0.44, 0.0035, M.plastic, vx(y) + 0.014, y, 0, 0.55));
  }
  for (const s of [-1, 1]) {
    gates.add(acbox(0.02, 0.20, 0.05, 0.006, M.plastic, vx(0.295) + 0.014, 0.295, s * 0.245));
  }
  gates.add(acbox(0.05, 0.03, 0.03, 0.006, M.plasticLt, vx(0.330) + 0.016, 0.330, 0.27));
  sys.add(gates);

  /* ── light bands. The front face is HELD at x 2.371, y 0.615, half-width
     0.43 so autonomy-4's pucks at (2.33, 0.615, +-0.30) still land. The rear
     band's back face is the rearmost geometry on the car and it is what sets
     the built overall length at 4.8288 m, measured rather than intended. ── */
  const lbF = lib.part('lightbands', [1.15, 0.1, 0]);
  lbF.add(acbox(0.014, 0.045, 0.86, 0.004, M.lamp, 2.371, 0.615, 0));
  for (const s of [-1, 1]) {
    lbF.add(acbox(0.012, 0.03, 0.06, 0.003, M.sensor, 2.376, 0.615, s * 0.30));
  }
  sys.add(lbF);
  const lbR = lib.part('lightbands', [-1.15, 0.1, 0]);
  lbR.add(acbox(0.014, 0.05, 0.70, 0.004, M.lampRed, KAMM + 0.0040, 0.760, 0));
  sys.add(lbR);

  /* ── Kamm spoiler, drawn deployed on a base 28 percent smaller ── */
  const spoiler = lib.part('kamm-flap', [-0.9, 0.55, 0]);
  const BX = KAMM + 0.155, BY = 1.000;
  spoiler.add(acbox(0.16, 0.012, 0.70, 0.003, M.carbon, BX, BY, 0, 0.16));
  for (const s of [-1, 1]) {
    const sx = BX + 0.02, sz = s * 0.24;
    const deck = surfaceY(sx, Math.abs(sz));
    spoiler.add(acbox(0.016, BY - deck + 0.03, 0.05, 0.004, M.darkSteel, sx,
      (BY + deck - 0.03) / 2 + 0.005, sz));
    spoiler.add(acbox(0.05, 0.035, 0.06, 0.006, M.plasticLt, BX + 0.08, deck + 0.02, s * 0.17));
  }
  sys.add(spoiler);

  /* ── diffuser flap. The hinge came forward 100 mm because the tail is
     333 mm shorter, and the ramp lost 45 percent of its length. ── */
  const HINGE_X = -1.900, RAMP_X = -2.412, RAMP_Y0 = 0.1281, RAMP_Y1 = 0.3450;
  const RZF = Math.atan2(RAMP_Y1 - RAMP_Y0, RAMP_X - HINGE_X + 0.0007);
  const flap = lib.part('diffuser-flap', [-1.0, -0.4, 0]);
  const rampSection = (x, y, hz) => {
    const pts = [];
    for (let i = 0; i <= 6; i++) pts.push([x, y, -hz + (2 * hz * i) / 6]);
    for (let i = 6; i >= 0; i--) pts.push([x, y + 0.012, -hz + (2 * hz * i) / 6]);
    return pts;
  };
  flap.add(lib.crease(lib.loft([rampSection(HINGE_X - 0.0007, RAMP_Y0, 0.450),
                                rampSection(RAMP_X, RAMP_Y1, 0.360)], M.carbon, true), 40));
  for (const z of [-0.30, -0.12, 0.12, 0.30]) {
    flap.add(acbox(0.50, 0.09, 0.010, 0.003, M.carbon, (HINGE_X + RAMP_X) / 2,
      (RAMP_Y0 + RAMP_Y1) / 2, z, RZF));
  }
  const hinge = lib.cyl(0.012, 0.90, M.darkSteel, 12);
  hinge.rotation.x = Math.PI / 2;
  hinge.position.set(HINGE_X, 0.135, 0);
  flap.add(hinge);
  for (const s of [-1, 1]) {
    flap.add(acbox(0.05, 0.04, 0.06, 0.006, M.plasticLt, HINGE_X - 0.08, 0.205, s * 0.24));
  }
  /* Strake fixings taking the ramp's own rotation, growing DOWNWARD out of
     the panel into the flow. body-9 recorded that adding a further pi about
     x sends the head straight into the laminate and buries 640 triangles;
     the correction is carried here rather than re-made. */
  for (const z of [-0.30, -0.12, 0.12, 0.30]) {
    for (const dx of [-0.16, 0.16]) {
      const f = lib.fastener(0.0038, M.steel, 'hex');
      f.rotation.set(0, 0, RZF, 'ZXY');
      f.position.set((HINGE_X + RAMP_X) / 2 + dx * Math.cos(RZF),
                     (RAMP_Y0 + RAMP_Y1) / 2 + dx * Math.sin(RZF),
                     z + Math.sign(z) * 0.011);
      flap.add(f);
    }
  }
  sys.add(flap);
}

/* ── Verification notes (measured off built geometry, not prose) ──────────

   The full per-part diff against body-9, the triangle and merged-mesh
   counts, and the five gates design/gen11.md sets for this module are in the
   self-check that ships with this rung rather than transcribed here, because
   a number typed into a comment is the failure mode this project has
   documented most often. What belongs here is what the self-check cannot
   say: which numbers are held, which are refused, and which could not be
   verified at all.

   HELD, and every one of them is a partner's coordinate rather than this
   module's preference:
     front tower pad    (1.545, 0.745, +-0.430), body-9's, receiving
                        suspension-9's plate at (1.50, 0.735, +-0.41)
     subframe planes    |z| 0.500 at x +-1.34 and +-1.72, suspension-4's
     front band face    x 2.371, y 0.615, half-width 0.43, autonomy-4's
     nose stations      x 2.375, 2.220, 2.030, body-9's, as crash budget
     valance x          body-7's two interpolants, unchanged
     strake underside   y 0.1025, battery-7's floor datum
     sill faces         |z| 0.7800 and y 0.4200, battery-11's, declared

   REFUSED, with the measurement:
     the castings' bounding |z|. body-9 reaches 0.5950 at the front and
     0.6250 at the rear and both are crash members rather than suspension
     interfaces. A 1.25 m rear beam does not fit a tail closing to 0.4028.
     a cabin floor of any kind. design/gen11.md section 5 makes the pack lid
     the floor and this module now obeys it. The 150 mm pan an earlier draft
     drew put the occupant crown at 1.39795 against a 1.330 roof.
     a shoulder that reaches the wheels. Measured, not styled: see below.

   THE FIVE THINGS THIS DRAFT CHANGED, EVERY ONE FOUND BY SWEEPING AND NONE
   BY READING. They are listed with the number that found them because that
   is the only part of this note a reader should trust.

     1. THE SECOND FLOOR. Pan at y 0.3500 to 0.4517 across the cabin, 150 mm
        over battery-11's lid at 0.3020. Occupant crown 1.39795, which is
        67.6 mm through the roof bows even after the roof rose to 1.330.
        Deleted. Crown is now 1.24795 and the clearance under the bow soffit
        at 1.2990 measures 51.1 mm, against the 50 mm design/gen11.md books.
        The duplicate seat rails and the 48 mm dead cavity went with it.
     2. THE SHOULDER THROUGH THE WHEELS. Drawn x 1.450 to -1.850, which is
        both axles. Seven penetrating pairs against wheels-10 where body-9
        has zero, worst 542 crossings into drivetrain-9's stator rings at
        30.46 mm and 287 into its rotor rings at 36.03. Now x 1.120 to
        -1.120, full section to 1.030, against a nearest tire vertex at
        |x| 1.0980. Zero pairs.
     3. THE REAR ANNULUS. 66 shoulder vertices inside r 0.155 to 0.235 over
        |z| 0.65 to 0.73 about (-1.45, 0.355), at r 0.1653 to 0.2145.
        Replaying tools/interfaces.js LIMITS.annulus clause for clause, this
        module is now CLEAR at 0 vertices, which is body-9's and
        battery-11's own answer.
     4. THE FLOATING CAGE. Built minimum y 0.6891, touching nothing but the
        shell skin at 3.0 mm, 269 mm above the sill top. Now 0.4500, on the
        pan flange, via a horizontal 25 mm sill rail and two legs.
     5. THE SILL DECLARATIONS. sill-outboard was declared |z| 0.7800 extent
        min on a part whose built |z| ran from 0.1600, an underrun of 620 mm
        that tools/interfaces.js realize() would have failed. Both keys now
        sit on a part that exists only at y >= 0.4200 and |z| <= 0.7800.

   THE ONE PAIR THAT SURVIVES, and it is not this module's.
   battery-11/sill against wheels-10/master-unit, 570 crossing pairs at
   23.52 mm. That is the aft brake harness at y 0.3327 to 0.3687 and
   |z| 0.6723 to 0.7678, inside the volume design/gen11.md section 7
   commissions the sill in, and section 6 already made it wheels-11's job
   and its reason for existing. body-11 no longer contributes to it: its own
   pan cleared master-unit the moment the cabin floor went, because the
   flange lives at y 0.4200 to 0.4500 and the harness tops out at 0.3930.

   NOT VERIFIED BY THIS MODULE, stated rather than implied:
     No frontal area and no drag coefficient are claimed anywhere in this
     file. AREA is regenerated from built geometry at integration.
     tools/occupant.sh cannot be run end to end because interior-11 does not
     exist. What is checked here is the liner PLANE this body's structure
     leaves, not an occupant in a seat.
     No crash model of any kind has been run. The 55 kJ, the 83 percent
     coverage and the six-chamber sill load path are all geometry and
     arithmetic.
     The wetted area of 19.344 m2 that design/gen11-feasibility.md
     recommends is the basis for this module's skin mass and it has not been
     re-measured on the built loft. The arch line deletes real surface at
     four wheel stations, so that figure is now conservative by an unknown
     amount and this module does not guess at it.
     Every mass in the ledger is an estimate scaled off body-9's own lines
     by area or by span. None of it is weighed, and design/gen11.md section
     4 books the whole 99 kg credit at zero for exactly that reason.

   THE SELF-CHECK IS EXHAUSTIVE NOW AND THAT IS THE LESSON FROM THE LAST
   ROUND. The previous one enumerated volumes BY HAND and swept the carried
   modules against those. It never swept the shoulder, the one genuinely new
   outer surface on this car, against anything, so a total failure of exactly
   the kind it was checking for produced SILENCE. That is SPEC.md's third
   documented fault in the SHAPE of a check, and this project has now found
   eight of them. The sweep is therefore every part of body-11 and
   battery-11 against every part of wheels-10, suspension-9 and drivetrain-9
   and against each other, through tools/interfaces.js's own clipTris,
   sweepPrune and triTriDepth at LIMITS.pen, with body-9 and battery-10 in
   their place as the baseline and the gate on the DIFF:

     GEN 11    52 parts, 807 pairs enumerated, 53 tested, 10 penetrating
     BASELINE  54 parts, 881 pairs enumerated, 54 tested, 11 penetrating
     NEW       1, and it is battery-11/sill x wheels-10/master-unit
     GONE      2, both body-9/front-fairings, which this generation deletes

   Every one of body-11's ten is a casting against suspension-9, and every
   one of those exists on body-9 as well. Three of them are DEEPER than
   body-9's, three shallower: front-casting into front-structure goes 59.06
   to 44.15 mm, into arb-decouplers 13.08 to 10.17, rear-casting into
   active-dampers 8.49 to 7.00; the other way, air-supply 14.71 to 15.56,
   rear-structure 14.00 to 15.00 and tv-controller 3.24 to 6.70. These are
   the megacastings drawn as solid blocks around a carried corner, which is
   a defect this ladder has carried since Gen 1 and which this module did
   not create and does not fix.

   BUILT, from the sweep, so the next reader does not have to run it:
     triangles 27,236 against SPEC.md's 60,000 (body-9: 20,584)
     merged meshes 39, which is the draw-call budget (body-9: 50)
     overall length 4.82884 m, x 2.383143 to -2.4457
     overall height 1.3300 m, the glass at the crown
     widest vertex above y 0.6200  |z| 0.6000, on the skin, so 1.2000 m
     widest glass vertex           |z| 0.5976
     shoulder                      x -1.1200 to 1.1200, y 0.4500 to 0.6200
     pan                           x -1.0366 to 1.0366 over the bolt heads,
                                   y 0.4200 to 0.5600, |z| 0.6600 to 0.7800
     cage                          y 0.4500 to 1.3190 */
