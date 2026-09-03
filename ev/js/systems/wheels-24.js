/* GEN 24: THE PRESSURE. wheels-22 with the front section 125 to 105 mm
   and the front cold pressure 5.6 to 6.7 bar. The track does not move,
   nothing is repositioned, and one constant changes: SECT.

   DESIGN/GEN23.MD REFUSED THIS EXACT TIRE AND WAS RIGHT TO. Its words:
   "A 105 section holds 595 kg against a 602 kg load and fails outright.
   The front tire has no width left and this brief was wrong to say it
   did." That measurement stands. What it holds fixed is the inflation
   pressure, because wheels-21 chose 5.6 bar as one placard figure for all
   three corners and nothing since had reason to reopen it. Casing
   capacity is pressure times section width by this module's own rule, so
   the two were never separate numbers, and only one of them had ever been
   moved.

   THE INVARIANT IS THE PRODUCT, AND BOTH THINGS A TIRE OWES THIS CAR
   DEPEND ONLY ON IT. Capacity scales with p times w. Contact patch area
   is load over pressure and patch length is that over the net tread
   width, so patch length scales as 1/(p times w), and static deflection
   is patch length squared over eight times the radius. Capacity and
   deflection are therefore two readings of one quantity:

     125 mm x 5.6 bar = 700     708 kg capacity, 99.7 mm patch, 3.5 mm
     105 mm x 5.6 bar = 588     595 kg, and gen23.md is right that it fails
     105 mm x 6.7 bar = 703     711 kg capacity, 99.2 mm patch, 3.5 mm

   Hold the product and the tire owes the car exactly what it owed before:
   the same load margin to the kilogram and the same deflection to the
   tenth of a millimetre. The 20 mm of section is then free of both, and
   it is 5 mm a side off the widest thing on this car.

   THE WIDEST THING ON THIS CAR IS THIS PART, which is why 5 mm a side is
   worth a rung. tools/bands.sh on Gen 23: from y 0.10 to 0.75, thirteen
   bands and 43 percent of the car's height, the outer edge belongs to
   wheels-22/front-pants at a flat 1.586 m, while the cabin above it is
   1.10 m. The fairings are 486 mm wider than the cabin they serve and
   they set the frontal area of the whole vehicle.

   WHY THE TRACK DOES NOT MOVE, MEASURED TWICE. Moving the wheel centers
   inboard is the other way to narrow this band and two drafts tried it.
   At FRONTZ 0.710 tools/check-interfaces.sh returned wheels-24/tires 15.4
   mm into battery-21/bricks over 68 crossing pairs: the draft had read
   the tire's inboard face off an axis-aligned box and missed OFF, the
   5 mm the barrel rides inboard of the hub, so the face was at 0.6475
   rather than the 0.6525 it claimed. At 0.7175 the pack was clear and two
   different pairs appeared instead, the knuckle against the pant and
   against the wheel, because the hub face is a DECLARED CONTRACT at |z|
   0.6725 that both this module and suspension-22 publish, and a wheel
   cannot move without it. Moving a published contract to buy 0.0014 m2
   is not a trade this rung is willing to make. Narrowing the section
   moves the outboard face in and the inboard face OUT, 5 mm of extra
   clearance everywhere, and needs no contract at all.

   WHERE IT STOPS. Measured at 125, 115, 105 and 100 mm the frontal area
   reads 1.5249, 1.5231, 1.5224 and 1.5224. It saturates at 105 because
   the pant's outer face lands on body-23's shoulder plane at |z| 0.7800
   and the body becomes the binding edge. Going narrower buys nothing
   without moving the body, and this rung does not.

   WHAT IT COSTS, STATED. The contact patch is load over pressure, so at
   6.7 bar it is 16 percent smaller than the 125's at 5.6, and because the
   length is held the whole loss is width. A narrower patch is worse in
   lateral grip and a higher pressure rides firmer. Both are real
   capability costs of exactly the kind wheels-21 booked when it thinned
   this same margin and called it a cost rather than a footnote. The
   0.714 g grip budget is carried as a requirement rather than shown to
   survive, because this method has no tire model that could show it, and
   that is on the fail list.

   No Crr count is booked. The deflection does not move, and even if it
   did, design/crr-findings.md shows the laden basis is not yet common
   across rungs and no tire comparison on this ladder means anything until
   it is.

   The carried text below is wheels-22's and says 125 mm and 5.6 bar
   wherever it describes the front. design/gen24.md is the brief. */

/* GEN 22: THE STANDOFF. wheels-21 with one number re-derived: the front
   pant's outer wall comes in 3.5 mm a side, its face from 0.7965 to
   0.7930, because the 18-off-the-section-max constant it carried dates
   from the era when a body held the wall over a moving wheel, and this
   wall has ridden the knuckle since wheels-20: lock and travel never
   close its gap, so what it honestly keeps is the class 10.0 mm spin gap
   to its own cover (measured at |z| 0.7790, the outermost rotating
   surface) plus the 4 mm laminate. Nothing else moves: the tires, the
   rims, the floors, the inboard edges and the whole rear are carried to
   the vertex, and body-22's spat wall follows the new plane the way it
   followed the old one. The re-derivation was found by the 2026-08-25
   union probe, which showed the pant plane owning 0.70 m of the car's
   outline with 3.5 mm of nothing at its face. design/gen22.md is the
   brief. The carried text below reads 0.7955 or 0.7965 about the wall
   wherever wheels-21 and its ancestors did.

/* wheels-17: THE TRACK. wheels-15 with both wheel centers 20 mm inboard,
   |z| 0.74 to 0.72 (a 1.44 m track against 1.48), and every fairing riding
   with its wheel. design/gen17.md is the brief; design/retro-gen16.md
   section 8 named the rung.

   Why 1.44 and not less, measured: below the shoulder the car's outline is
   battery-11's sill at |z| 0.78 and the tires at 0.6725 to 0.8075, 27.5 mm
   proud of it. At 1.44 the tire's 135 mm section is centered on the sill's
   120 mm chambered section, 7.5 mm proud each way, which is where the
   frontal union stops falling: narrow further and the inboard sliver that
   comes out from behind the sill's inner face grows faster than the outer
   saving. And both axles or neither: one axle moved leaves the other at
   0.8075 setting the outline while the moved tire's sliver appears, and the
   area goes UP (front-only 1.6061 m2, rear-only 1.6036, against 1.5975).

   What rides: the tires, rims, discs, calipers, hubs and park brakes are
   built about FRONTZ and REARZ and move by the constants; the front pants
   and rear saddles are built about the wheel centers' x and y at wheels-13's
   |z| and are translated as groups by (FRONTZ - 0.74) and (REARZ - 0.74), so
   every clearance inside a fairing (band to tread 18 mm, edges on the tire's
   section planes) is exactly wheels-15's. Every absolute |z| in the carried
   text below reads 20 mm inboard here: the tire section 0.6525 to 0.7875,
   the pant wall 0.8055, the saddle's outer edge 0.7875, the hub face 0.6725,
   the knuckle face the pant bracket foot lands on 0.5630. The three keys
   this module re-declares say so in numbers: front-halfshaft-outboard
   0.6725 (drivetrain-17 and suspension-17 agree), front-corner-pack-outboard
   0.6425 (the pack's corner keep-out, the tire face less 10, which
   battery-17 draws its corner closeouts to), front-pant-bracket 0.5630;
   rear-saddle-foot is a y plane and does not move.

   Measured on the gen17 set by the tools that own each number: frontal area
   1.5739 m2 on body-17 against 1.5975; wheel term 0.0149 against 0.0163
   (front 0.0213, rear 0.0307 m2 of exposed rotating tire); Cd 0.1099 against
   0.1104. Crr carries at 0.0038 unbooked as wheels-10 left it. Mass: the
   same metal, 80.8 kg. tools/envelope.sh on this module against body-17's
   spat wall at 0.81 (22.5 mm off the tire face) is the gate the rung owes
   before it ships and its result is in design/gen17.md section 12.

   ── wheels-15's own header follows, unchanged ────────────────────────

/* Wheels and brakes, Gen 15: wheels-14 with three edges moved by millimeters,
   every one of them named by the tool this rung built to find them.

   Ancestry: wheels.js (Gen 1) through wheels-14.js (Gen 14, the saddles and
   the pants brought down), which is the direct parent and which this module
   carries in every rotating coordinate, in the harness, in the pant disc
   and its notch, in the pant bracket and in the saddle's tubes and foot.
   wheels-14's own header is preserved below this one. No Crr count is
   booked.

   WHY THIS FORK EXISTS. design/retro-gen14.md section 6 asked for the wheel
   envelope as a tool, because Gen 14 had found two shipped defects in
   wheels-13 with an ad hoc sweep. tools/envelope.sh now sweeps a wheels
   module's fairings through lock, rear steer, bump and rebound against
   every partner's SURFACE (the ad hoc sweep was vertex to vertex and the
   shipped prose before it was prose), and run on wheels-14 in the gen15 set
   it read, at the combined extremes:
     rear saddle nose end to the spat wall's leading blend
       at 3 deg of rear steer and full rebound                 1.8 mm
     rear saddle tail end to the wall's trailing closure
       at 3 deg the other way and full rebound                 4.9 mm
     front nose cap's bottom inboard corner to body-15's
       venturi floor front closeout at 14 deg of lock         1.7 mm
     front band tail tip to hv-15's zonal box
       at 14 deg of lock and full rebound                      6.7 mm
   None is a penetration and every one is a combination of two extremes;
   all four are the class of number a fairing that rides with its wheel
   owes its partners at every pose, and 1.7 mm is not it. Three are this
   module's and one is the body's: the 1.7 mm is the venturi floor's front
   closeout plate, which body-13 held at |z| 0.620 for a tire at 0.6725 and
   which the nose cap's bottom swings to 0.603 past at full lock, so body-15
   notches that plate to 0.580 over the cap's swept x and the cap keeps its
   full width. The three edges here:
     the REAR SADDLE's outer edge, on the tire's face at |z| 0.8075 over the
       crown, tapers to 0.7900 over its last 15 degrees at each end (from
       50 to 65 ahead of the top, from 60 to 75 behind), so the ends that
       swing 19 mm at 3 degrees keep 20 mm from the wall's blend and closure
       where they kept 2 and 5; the projection loses the tire's outer
       17.5 mm over y 0.51 to 0.60 at the nose, about 0.002 m2 a pair, and
       nothing at the tail, which the crown's own shadow already covers;
     the SADDLE's inboard taper starts at 35 degrees ahead of the top
       instead of 45, because autonomy's compute deck has a corner at
       (-1.187, 0.542, 0.659) on the driver side beside the saddle's nose at
       40 to 50 degrees, and at 3 degrees of rear steer plus full rebound
       the edge at 0.6725 read 8.6 mm from it; about 0.002 m2 a pair;
     the FRONT BAND's tail edge comes from 0.715 to 0.725, ten more
       millimeters from hv-15's zonal box at lock plus rebound, for nothing
       in the projection, which the nose side covers at every height the
       tail does.
   Measured again by the same tool after the change: the numbers it prints
   on the gen15 set are the record, and the tightest pose is in this
   module's own panel rather than in a sentence that says there is nothing
   there.

   MASS: carried. The three tapers move laminate by grams on a 5.3 and 1.5
   kg pair; the module reads 80.8 kg as wheels-14.

   wheels-14's header follows, as the record of the saddles and the pants
   brought down. Read "this module" below as wheels-14. */

/* (wheels-14) Wheels and brakes, Gen 14: the corner does not move, and both axles are
   faired by a shell that rides with the wheel.

   Ancestry: wheels.js (Gen 1) through wheels-13.js (Gen 13, the front
   pants), which is the direct parent and which this module carries in every
   rotating coordinate, in the harness, in the pant disc's plane and in the
   pant bracket's foot. wheels-13's own header is preserved below this one,
   because everything it says about the corner is still true: no tire,
   wheel, cover, disc, caliper, park brake or hub coordinate changed, the
   tire column is still |z| 0.6725 to 0.8075, the hub face is still 0.6925,
   all three declared interfaces carry, and no Crr count is booked.

   WHY THIS RUNG EXISTS. design/retro-gen13.md section 4: after the front
   pants the wheel term is 0.0337 of Gen 13's 0.1327, and per axle the
   rotating tire outside the filled outline measures front 0.0370 m2 and
   REAR 0.0880, Gen 12's rear figure to the fourth decimal. The spat wall
   that body-12 built beside the rear tire is edge-on to the stream and its
   trailing closure stands behind the wheel, where rule 4 of the third
   revision says nothing shields; what it hides is its leading blend's 27.5
   mm of width over the tire's outer edge, 0.017 m2 of the 0.105 the rear
   would otherwise show. What the rear tire presents is its CROWN over the
   wall top at y 0.52 and its strip under the skirt at 0.18. The rear wheel
   does not steer, it rides 80 mm of bump and 3.0 degrees of rear steer, and
   nothing on the ladder stands on its hub. Now something does.

   WHAT IS NEW. One part, rear-saddles, and one part redrawn, front-pants.

   REAR SADDLES, per rear corner: a crown band of 4 mm carbon sandwich bent
   to r 0.373 inner about the rear axle, 18 mm over the tread, spanning
   exactly the tire's section |z| 0.6725 to 0.8075 with no lip outboard of
   the tire face and no lip inboard of it, from 65 degrees ahead of the top
   (x -1.108, y 0.514) over the crown to 75 degrees behind it (x -1.814,
   y 0.452), its inboard edge tapering to 0.695 from 45 degrees ahead so
   that the 19 mm it swings at 3 degrees of rear steer keeps 20 mm from
   autonomy-13's compute corner at (-1.142, 0.552, 0.656). Two aluminum
   tubes at r 0.007 carry it: each leaves a foot on suspension-9's rear
   upright top face at y 0.580 between that upright's joint bolts, rises at
   |z| 0.624 (17 mm outboard of the flank, 19 inboard of the rotor ring) to
   y 0.700, and jogs 40 mm outboard over 26 of rise to the band's inboard
   edge at 0.664, passing the tire's upper shoulder at 19 mm.
   NO nose below the crown and no disc: battery-11's sill (|z| 0.66 to 0.78,
   y 0.104 to 0.42, ending 35 mm ahead of the tire), body-13's shoulder and
   pan (0.78 at y 0.42 to 0.50) and the wall's leading blend (0.78 to 0.8075,
   y 0.18 to 0.52) already stand ahead of or beside the tire over y 0.104
   to about 0.51 in the method's own projection, and a nose drawn there
   would stand 11 mm from the sill's end. What stays exposed: the contact
   strip under y 0.104 and the 27.5 mm outer band between 0.104 and 0.18.
   MEASURED by tools/aero-run.js's wheelArea on body-14 with battery-11:
   the rear pair 0.0341 m2 against wheels-13's 0.0880, the front pair 0.0214
   against 0.0370, the wheel term 0.0555 against 0.1250.

   FRONT PANTS, three changes and the rest carried: the band radius comes
   from 0.400 to 0.373 inner (the rear's 18 mm over the tread), which is
   possible because the bracket no longer passes over the tire's shoulder:
   the leg rises as before up the leading side at x 1.500 and |z| 0.635 and
   ends at the band's own inboard edge at (1.500, 0.722, 0.664) through a
   jog of 25 mm, instead of reaching over the shoulder at 18 mm to the
   band's underside. The nose cap runs to 137 degrees so its bottom edge
   meets the disc's own lower edge at y 0.080 instead of stopping at 0.126.
   And the band's inboard edge over the crown comes from |z| 0.700 to the
   tire's face at 0.6725 for 42 degrees each side of the top, where the
   edge swings 14 mm or less at 14 degrees of lock, tapering to 0.700 by 50
   degrees and then to the nose edge wheels-13 set and a tail edge at 0.715
   (wheels-13's 0.690 put the tail tip 3.6 mm from hv-11's spine at full
   lock and full rebound). The disc follows the band to r 0.373, keeps its
   plane at |z| 0.8255 and its floor at y 0.080, and is NOTCHED at its
   trailing edge over the sill's heights: swept about the axle plane at 14
   degrees of lock, the r 0.400 disc's trailing-lower quadrant swung 91 mm
   inboard and 18 mm past the end face of battery-11's sill at x 1.080, which
   wheels-13's own envelope missed because it looked for the body and the
   sill is the pack's. Below y 0.53 this disc ends at x 1.115, the tire's
   own trailing edge there, and clears the sill end by 24 mm at full lock.

   THE CLEARANCES THIS PART OWNS, measured off the built partners (the
   checker's sweep is the record; these are the design figures it confirms):
     rear band inner face to tread at the crown      18.0 mm (r 0.373 over 0.355)
     rear band outer edge to spat wall               32.5 mm at rest, 13.5 at
                                                     3 deg of rear steer at the ends
     rear band nose end to body-13 shoulder          18 mm in x (-1.108 to -1.090)
     rear band inboard edge to autonomy-13 compute   16.5 mm at rest, 20 at steer
                                                     after the 0.695 taper
     rear tube to body flank (riser at 0.624)        17 mm, at any bump
     rear tube to rotor ring                         19 mm inboard of its face
     rear tube jog to tread shoulder                 19 mm (0.671 to 0.690 at y 0.72)
     rear tube to upright joint bolts                4 mm in x, same rigid body
     front band inner face to tread at the crown     18.0 mm (r 0.373 over 0.355)
     front leg to tire inner sidewall                26.5 mm (0.635 + 0.011 to 0.6725)
     front leg jog to tread shoulder                 19 mm (0.671 to 0.690 at y 0.72)
     front leg to flank at 14 deg of lock            12 mm, as wheels-13
     front band crown edge to flank at 14 deg lock   14 mm at 42 degrees off the top
     front disc trailing edge to sill end, full lock  24 mm (wheels-13: 18 mm INSIDE it)
     front band tail tip to hv-11 spine, lock+rebound 17 mm (wheels-13: 3.6 mm)
     front nose cap bottom to the road               80 mm, constant (it rides the wheel)

   WHAT THE METHOD SEES. Both shells are STATIC parts of the wheels module,
   so under the third revision each is background for its own axle's wheel
   term and skin for the wetted soup, and is charged friction. What stays
   exposed and charged: at the front the contact strip under y 0.080 and
   the inboard band between 42 and 58 degrees; at the rear the strip under
   y 0.104 and the 27.5 mm outer band to 0.18. The frontal area each adds
   is measured by tools/area.sh, not asserted here: the design doc priced
   the rear band's crown at +0.006 m2 a pair and the front band's drop at
   -0.006, and the sweep reads -0.003 for the module on every body (body-13
   1.6687 to 1.6656, body-14 1.6429 to 1.6398).

   MASS, derived and not carried. Front, a corner: disc pi r2 less the
   clipped segment at r 0.373, 0.437 - 0.035 = 0.402 m2; band 198 degrees
   at r 0.375 mean by 0.135 average width, 0.175 m2; 0.577 m2 at 3.5 kg/m2
   for a 4 mm carbon sandwich is 2.02 kg; bracket, 0.30 m of aluminum leg
   at r 0.011 with a foot and a clip, 0.44; fixings 0.20. 2.66 a corner,
   5.3 the pair against wheels-13's 5.8. Rear, a corner: band 140 degrees
   at r 0.375 mean by 0.135, 0.123 m2, 0.43 kg; two tubes, 0.38 m of
   aluminum at r 0.007, 0.16; foot, clips and fixings 0.17. 0.76 a corner,
   1.5 the pair. Both unsprung. The module reads 80.8 kg against wheels-13's
   79.8: +1.5 of saddles and -0.5 of pants.

   Spin rules as ever: corner groups spin about z in drive mode; calipers,
   park-brake backplates, the master unit, the PANTS and the SADDLES do not.
   A pant steers and rises with its wheel and a saddle rises and rear-steers
   with its wheel; the model animates neither, and the envelopes above are
   the published claim about the rest. */

/* ────────────────────────────────────────────────────────────────────────
   wheels-13's header, preserved, because the corner it describes is the
   corner this module builds. Read "this module" below as wheels-13.
   ──────────────────────────────────────────────────────────────────────── */
/* (wheels-13) Wheels and brakes, Gen 13: the corner does not move, and the front wheel
   gets the one thing no rung on this ladder has ever given a wheel that
   steers: a fairing that steers with it.

   Ancestry: wheels.js (Gen 1) through wheels-11.js (Gen 11, 74 kg, the
   rerouted brake harness), which is the direct parent and which this module
   carries in every rotating coordinate and in the harness. wheels-11's own
   header is preserved below this one, because everything it says about the
   corner is still true: no tire, wheel, cover, disc, caliper, park brake or
   hub coordinate changed, the tire column is still |z| 0.6725 to 0.8075,
   the hub face is still 0.6925, both declared interfaces carry, and no Crr
   count is booked.

   WHY THIS RUNG EXISTS. design/retro-gen12.md section 4: after Gen 12's
   rear spats the wheel term is the largest open term in the drag buildup,
   and it is the FRONTS. The third revision of tools/aero.js (per axle, the
   rotating tire outside the car's filled outline, design/gen13.md section
   7) measures the front pair at 0.0832 m2 of exposed tire on Gen 12 and the
   rear pair at 0.0852, because the spat wall stops at y 0.52 and the tire's
   exposed band is mostly above it. A fixed front spat was declined twice on
   the record: at 14 degrees of lock the tire's ends swing about 85 mm, and
   below y 0.608 the body draws nothing at a wheel station to hang a wall
   from. Neither objection applies to a shell on the knuckle. It has a
   constant gap to its own tire at every lock and every bump, because it is
   the same rigid body, and it hangs from the upright.

   WHAT IS NEW, AND ONLY THIS. One part, front-pants: per front corner, a
   flat outer disc at |z| 0.8255 (18 mm off the tire's section maximum at
   0.8075, 16.5 off the cover lip at 0.8090), circular at r 0.400 about the
   axle and clipped at y 0.080 below; a crown band at the same r 0.400 from
   70 degrees ahead of the top to 70 behind it, spanning |z| 0.680 to 0.8255
   at the crown and tapering its inboard edge to 0.720 by 50 degrees; and a
   bracket off the knuckle's outboard face at (1.505, 0.470, 0.583), up the
   LEADING side of the wheel at x 1.500 and |z| 0.635, over the tire's
   shoulder to the band's underside at (1.458, 0.738, 0.690). No inboard
   wall: an inboard wall's ends would swing into the 0.60 flank at lock,
   and the tire's inboard shoulder above the flank is left exposed instead
   and charged.

   THE CLEARANCES THIS PART OWNS, measured off the built partners:
     disc inner face to tire section max       16.0 mm (0.8235 to 0.8075)
     disc inner face to cover lip              14.5 mm (0.8235 to 0.8090)
     band inner face to tread at the crown     41.0 mm (r 0.396 over 0.355)
     bracket arm to tire shoulder at |z| 0.69  18 mm, the tightest on the part
     bracket leg to tire inner sidewall        26.5 mm (0.635 + 0.011 to 0.6725)
     bracket leg to body flank, zero lock      24 mm (0.635 - 0.011 to 0.600)
     bracket leg to flank at 14 deg of lock    12 mm: the leg is 50 mm ahead
                                               of the axle and swings 12 mm
     upper ball joint to bracket leg           38 mm in x, the joint at 1.450
   THE SWEPT ENVELOPE AT LOCK. Everything on this part is outboard of the
   0.60 flank except the bracket foot on the knuckle, so the only body
   conflict a steered pant can have is at its inboard edges. The band's
   inboard edge at |z| 0.680 is held to the crown, where a point 0.0 m from
   the kingpin plane swings 0 mm, and tapers to 0.720 by 50 degrees, where
   a point 0.306 m off the plane swings 74 mm to 0.646 against a flank at
   0.600 and a flank bottom edge at y 0.608; at 70 degrees the band is at y
   0.492, under the flank entirely. The disc's ends swing 97 mm, outboard
   into air on one lock and inboard to |z| 0.725 on the other, where the
   body has nothing. The tire's own inboard corner still swings into the
   flank at the tire ends, which is the recorded Gen 11 foul, and that
   belongs to the body's arch, not to this part: body-13 relieves it.

   WHAT THE METHOD SEES. The pant is a STATIC part of the wheels module, so
   under the third revision it is background for the wheel term and skin for
   the wetted soup: it hides the rotating tire's outboard face and crown and
   is charged friction on its own wetted surface. What stays exposed and
   charged: the tire below y 0.080, which is 0.135 by 0.080 a wheel, and the
   inboard shoulder above the 0.60 flank between |z| 0.6725 and 0.680. The
   frontal area it adds is measured by tools/area.sh, not asserted here; the
   design doc priced it at +0.024 m2 a pair before the band was raised to
   clear the bracket, and the sweep is the number.

   MASS, derived and not carried. Disc: pi r2 less the clipped segment,
   0.503 - 0.017 = 0.486 m2; band: 2.44 rad x 0.400 x 0.136 average width =
   0.133 m2; 0.619 m2 a side at 3.5 kg/m2 for a 4 mm carbon sandwich is
   2.17 kg; bracket, an 0.42 m aluminum arm at r 0.011 with a foot and a
   pad, 0.55 kg; fixings 0.20. 2.9 kg a corner, 5.8 the pair, booked as 6
   at the kilogram resolution the ledger works at. All of it unsprung, and
   the corner's unsprung mass rises from about 21 kg to 24, which is the
   one cost the panel prices rather than the area.

   Spin rules as ever: corner groups spin about z in drive mode; calipers,
   park-brake backplates, the master unit and the PANTS do not. A pant steers
   and rises with its wheel and the model animates neither; what it draws is
   the straight-ahead, static-ride position, and the envelope above is the
   published claim about the rest. */

/* GEN 21: THREE WHEELS. wheels-20 with the rear corner deleted as a class:
   one rear wheel centered on z 0 at the same axle line, a 155/65 R20 on
   the pair's own carried 4.5J rim, sized to the load with margin; the fronts on
   125/81 R20, a 3.5J rim (wheels-10's own move at 5.0 to 4.5: every radius
   frozen, every axial with the width) re-offset 5 mm inboard on the fixed
   hub face so the inner face holds the carried 0.6525 to the digit and the
   outer face takes the whole 10 mm to 0.7775. The saddle pair becomes one
   center house, and the house is a perimeter SKIRT and nothing else: a
   plan-wrap band 10 mm off the tire, y 0.039 to 0.130, because the pack's
   y 0.1025 scanline already owns the union above it and the body's
   wheelhouse owns the cavity, so a side disc up there would be a decal by
   this file's own rule (geometry nobody can measure is a decal with a
   triangle budget). Union cost of the skirt and its tire, measured on the
   built module against body-20: +0.0040 m2 on the shipped 155 (+0.0078 on
   the draft's 185), all of it below the pack line, where the center band
   was empty in gen20's projection; a full-depth wall would have booked
   about 0.0145, and an earlier draft called it +0.0013 by netting off a
   naked center tire that never stood in any union on this ladder.
   Exposure measured the same run: front 0.0129, rear 0.0055, aWheel
   0.0184 against Gen 20's 0.0400. One drum, one
   backplate, one cover leave with the deleted wheel; there was never a
   rear disc or caliper to leave. design/gen21.md is the brief;
   design/retro-gen20.md section 8 named the rung and demanded the
   stability tool rule first, which it did (tools/cg.sh, the delta-trike
   case: lift 0.932 g on gen20's own mass, and better with this module's
   mass out of the corner). Every absolute coordinate in the carried text
   below that names a REAR corner at |z| 0.72 describes a corner this
   module no longer builds; the front text reads 5 mm further outboard
   than built wherever it names the outer face. The GEN 20 header below
   is carried unchanged. */

/* GEN 20: THE WHEELS INSIDE. wheels-17 with its pants and saddles grown to
   full fairings: the front disc and nose cap carried down from y 0.080 to
   0.045, the rear saddle given a disc of its own inside the wall's skirt
   and its arcs carried down the same way. Everything still rides the
   knuckle, so lock and travel cost no clearance by construction.
   design/gen20.md is the brief; its section 3 holds the exposure map this
   geometry closes (the contact-patch band, not the crown). Everything not
   named there is wheels-17's, byte for byte. */
import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

/* ── CRR_BASIS ──────────────────────────────────────────────────────────
   design/gen10.md section 4b makes this a shipping requirement, in the shape
   js/efficiency.js's CD_BASIS already uses: the base, the named anchors, the
   offset to the real world, and the statement that a rolling-resistance
   coefficient comes off a drum or a coastdown and there is neither here.

   IT IS EXPORTED AS DATA RATHER THAN WRITTEN INTO A PANEL because that is
   what CD_BASIS did and because the point of both is to be argued against by
   the next pass. Nothing imports it yet.

   THE ONE THING THIS IS WEAKER AT THAN CD_BASIS, said first so a reader does
   not have to find it. CD_BASIS's tunnelExpectation came from an INDEPENDENT
   audit of body-9. `drumExpectation` below did not: it is this module's own
   estimate off the anchor list, so it carries exactly the warrant of the
   anchors and no more. It is a narrower claim than CD_BASIS's and it is
   labeled as one.

   CONFIDENCE ON THE ANCHORS THEMSELVES. The two EU label limits are
   regulatory and exact. The EQXX figure is a manufacturer publication for a
   purpose-built demonstrator. The production, solar-challenge and
   eco-marathon figures are class figures rather than one measured tire, and
   they are quoted to a hundredth of a kg/t only so the arithmetic is
   reproducible. The finding does not turn on any single one of them: move
   any anchor by 0.5 kg/t and the ladder is still under the lowest number on
   the list from Gen 5 onward. */
export const CRR_BASIS = {
  base: 0.0072,                 // wheels.js, Gen 1
  baseId: 'wheels',
  topOfLadder: 0.0038,          // wheels-7, carried by wheels-9 and by this module
  /* This module's own estimate for what a drum would show for the tire it
     BUILDS: 135/75 R20 at 5.6 bar carrying 508 kg per front corner, with
     every mechanism in `ledger` below. Not an independent audit. */
  drumExpectation: [0.0045, 0.0055],
  anchors: {
    'EU C1 label class A limit': 0.0065,
    'best measured C1 production tire': 0.0055,
    'Mercedes vision EQXX, Bridgestone ENLITEN': 0.0047,
    'EU C3 heavy-truck label class A limit': 0.0040,
    'solar-challenge tire, 4 to 6 bar, about 65 kg per tire': 0.0025,
    'steel wheel on steel rail': 0.0015,
    'Shell Eco-marathon prototype tire, about 25 kg per tire': 0.0008,
  },
  /* every count this ladder has booked, and what it was booked against */
  counts: [
    ['wheels', 0.0072, 'base, a class-typical premium sedan tire. EU C1 label class B'],
    ['wheels-2', 0.0052, '235/50 R19 to 185/50 R21, low-loss compound. Crosses the EU C1 class A limit'],
    ['wheels-3', 0.0052, 'carried'],
    ['wheels-6', 0.0046, 'one-piece carbon wheel, low-loss construction, full covers. Goes under the lowest figure ever published for A full-scale car, and no rung says so'],
    ['wheels-7', 0.0038, '155/65 R20 at 4.4 bar, narrow section and full covers. Inside the heavy-truck class A band, on a tire a third of a truck tire\'s diameter'],
    ['wheels-9', 0.0038, 'carried. Narrowing the front track moves area and roll stiffness, not Crr'],
    ['wheels-10', 0.0038, 'Carried, and the geometry is not. See `ledger` and `verdict`'],
    ['wheels-11', 0.0038, 'Carried again, and this rung has less claim on the number than any before it: it builds no tire. Rolling drag is Crr times weight, a harness route is neither, and design/gen11.md section 8 declines a Crr credit for three wheels on the same argument'],
    ['wheels-13', 0.0038, 'Carried. A pant is a static shell beside a tire; it moves no tread and changes no pressure. It adds 3 kg of unsprung mass a corner and that is booked in mass, not in Crr'],
  ],
  /* what wheels-10 BUILDS, priced, and deliberately not booked */
  ledger: [
    ['inflation 4.4 to 5.6 bar', 0.908, 'Crr proportional to p^-0.4, the exponent standard practice uses across the C1 range. The pressure is a stated operating figure and the exponent is published; this is the best evidenced line here'],
    ['tread 5.5 to 4.5 mm, void 24.0 to 18.6 percent, center groove deleted', 0.920, 'tread band hysteresis is the largest single share of a passenger tire\'s Crr. The depth and the void fraction are measured off the built lathe profile with one function over both tires; the share is literature'],
    ['single-ply carbon-cord casing, steel-free two-ply belt', 0.920, 'fewer sheared rubber interfaces in the belt package. Asserted. No measurement behind it'],
    ['section 155 to 135 mm', 1.000, 'Measured as zero, and it is the line most likely to be booked by mistake. Contact patch area is load divided by inflation pressure and does not know the section width, so a narrower casing at the same pressure buys no Crr on its own. What it buys is the pressure, the frontal area and the pack corner'],
    ['lower loss tangent compound', 1.000, 'Declined. That is a chemistry claim, and battery-7 refused to make one in a range generation for the reason this module also declines it: a range generation is the easiest place on a ladder to smuggle one in'],
  ],
  product: 0.7686,              // the four multipliers above
  wouldReach: 0.00292,          // 0.0038 x product
  verdict: 'Not booked. The product of the named mechanisms takes 3.80 kg/t to 2.92, which is inside the solar-challenge band at about eight times the load per tire and past the 3.40 the brief asked for. Run the identical product on a real 5.50 kg/t class A tire and it gives 4.23, which is a defensible best-in-world figure, and on the EQXX\'s 4.70 it gives 3.61. The multipliers are the same; only the base differs, and only one of the two answers is a tire anybody has built. That is the signature of a base that has drifted, which is exactly what design/area-rezero.md concluded about Cd, so this module does what that document did: it publishes the basis and freezes the coefficient.',
  offset: 'The ladder carries 0.0038 and this module expects a drum to show 0.0045 to 0.0055 for the tire it builds, so the top of the ladder is optimistic by roughly 0.0007 to 0.0017 in Crr, which is 16 to 31 percent. For scale, CD_BASIS records the Cd half at 30 to 48 percent. The rung-to-rung deltas are a sound internal currency; the exchange rate to reality is unknown and this constant is where that is written down.',
  method: 'A rolling-resistance coefficient is measured on a drum to ISO 28580 or backed out of a coastdown. There is no drum here and no coastdown, exactly as there is no wind tunnel for Cd. Everything above is arithmetic over published anchors and over geometry this module builds.',
};

export const SYSTEM = {
  id: 'wheels-24',
  name: 'Wheels and brakes · Gen 22 the standoff',
  color: 0xd0d6db,
  explode: [0, 0, 0],
  blurb: 'wheels-21 with one number re-derived and nothing else touched: the front pant\'s outer wall comes in 3.5 mm a side, 0.7965 to 0.7930, because the 18 mm standoff off the tire\'s section max dated from walls a body held over a moving wheel. This wall rides the knuckle, so lock and travel never close its gap; what it keeps is the class 10.0 mm spin gap to its own cover, measured at 0.7790, plus the 4 mm laminate, and the 3.5 mm above that floor was silhouette nothing needed, on the plane that owns 0.70 m of the car\'s outline. body-22\'s spat wall follows the new plane as it followed the old.\n\n' + 'wheels-20 with the rear corner deleted as a class: one rear wheel centered on z 0 at the same axle line, and the fronts narrowed onto the plane the area column lives on. The center wheel is a 155/65 R20 on the pair\'s own carried 4.5J rim at 5.6 bar, sized by the load that did not leave with the corner: 520 kg laden static, 572 at 0.30 g power-on, against 878 kg of casing capacity by the same pressure-times-width rule every tire panel here has used, at 5.0 mm of deflection inside the class the carried crr rode on. A first draft carried a 185; the load arithmetic rejected it as over-tired and its extra 30 mm of section billed the union at the one station a trike cannot hide. No lateral transfer ever reaches it: a contact patch on the roll axis takes no roll couple, which is also why the rear anti-roll hardware leaves with the corner rather than with this module. The fronts are 125/81 R20 on a 3.5J rim re-offset 5 mm inboard on the fixed hub face: the inner face holds the carried 0.6525 to the digit, the pack keep-out derivation reads unchanged, and the outer face takes the whole 10 mm to 0.7775, which is the plane every wall follows and the whole of the area column. The saddle pair becomes one center house, and the house is a perimeter skirt and nothing else: a plan-wrap band 10 mm off the tire from y 0.039 to 0.130, because the pack\'s y 0.1025 scanline already owns the union above it and a side disc there would be a decal by this module\'s own rule; the skirt and its tire book a measured +0.0040 m2 of union on the shipped 155 (all below the pack line, where gen20\'s projection was empty; a full-depth wall would book about 0.0145), the floor is 39 mm, the tire\'s own deflection budget plus margin, and there is no swing envelope to referee because a centered wheel does not steer. One drum, one backplate, one cover and one wheel leave; there was never a rear friction disc or caliper to leave, because the rear has braked by ring regen plus drum since the in-wheel architecture arrived. The stability tool ruled before this module was drawn: the delta-trike lift threshold (tools/cg.js, the diagonal-axis case) reads 0.932 g on gen20\'s own mass distribution against the 0.714 g grip budget, and improves as this module\'s mass leaves the corner, low and aft.\n\n' + 'wheels-17 with its fairings grown until the wheels are inside the bodywork: the front disc and nose cap carried down from y 0.080 to 0.045 and 145 degrees, the rear saddle\'s arcs from 65 and 75 degrees to 147, wrapping the tire to 39 mm off the road. Everything still rides the knuckle, so lock and travel never close a gap; what closes gaps is the tire\'s own deflection, and the 45 mm floor is that budget plus margin. Measured on the gen20 set: the exposed rotating silhouette falls from 0.0545 to 0.0400 m2 and the wheel term from 0.0158 to 0.0116 of Cd; the front cap\'s reach is a sharp measured optimum (141 degrees reads 0.0204 of front exposure, 145 reads 0.0138, 147 reads 0.0150, because the fill convention charges the air a cover encloses wherever nothing else spans the scanline); the saddle\'s ends and deep runs taper where tools/envelope.sh ruled, and every retreat is priced in the constants. 81.8 kg against 80.8.\n\n' + 'wheels-15 with both axles 20 mm inboard, a 1.44 m track against 1.48, the tire centered on the sill\'s chambered section and every fairing riding with its wheel. Measured: 1.5739 m2 on body-17 against 1.5975, the wheel term 0.0149 against 0.0163, Cd 0.1099 against 0.1104; one axle alone would have made the area worse. Every key re-declared at its new plane.\n\n' + 'wheels-15: wheels-14 with three edges moved by millimeters, every one named by tools/envelope.sh, the wheel-envelope sweep design/retro-gen14.md asked for: the rear saddle\'s outer edge tapers over its last 15 degrees at each end so the ends that swing 19 mm at 3 degrees of rear steer keep 20 mm from the spat wall\'s blend and closure where they kept 2 and 5; the saddle\'s inboard taper starts ten degrees earlier for autonomy\'s compute corner at rear steer plus rebound; the front band\'s tail edge comes to 0.725 for ten more millimeters from hv-15\'s zonal box at lock plus rebound. Nothing else moves, nothing is booked, the mass is carried.\n\n' + 'wheels-13 with one part added and one redrawn, and nothing moved: a crown band on each rear wheel, riding the upright, and the front pants brought down to the same 18 mm over the tread. design/retro-gen13.md section 4 measured the rear pair at 0.088 m2 of exposed tire under a wall that hides 0.017, because a wall beside a wheel is edge-on to the stream and its closure stands behind the wheel; what the rear tire shows the air is its crown over the wall top and its strip under the skirt. The saddle covers the crown from 65 degrees ahead of the top to 75 behind, exactly the tire\'s section wide, on two tubes off the rear upright\'s top face between its joint bolts; it needs no nose, because the sill, the shoulder and the wall\'s leading blend already stand ahead of the tire from y 0.104 to 0.51, and no disc, because the wall at 0.84 is the tire\'s side fairing and is measured to be doing that work. The front band comes from 45 mm over the tread to 18 once the bracket stops passing over the tire\'s shoulder and lands on the band\'s own edge instead; the nose cap runs to the disc\'s lower edge at y 0.080; the band\'s crown edge comes in to the tire\'s face where its swing at lock allows. 1.5 kg of saddles and 5.3 of pants, derived, all unsprung. What the method sees is two static shells hiding two rotating tires; the contact strips stay charged, and the frontal area is the sweep\'s to state. Everything below is wheels-13\'s and then wheels-11\'s, carried to the vertex.\n\n' + 'wheels-11 with one part added and nothing moved: a fairing on each front wheel that steers with it. The third revision of the drag buildup measures the front pair at 0.083 m2 of exposed tire on Gen 12, as much as the rears the spats were supposed to have closed, and a fixed spat was declined twice because a steered tire swings 85 mm at lock and the body has nothing below y 0.608 to hang a wall from. A shell on the knuckle has neither problem: a flat disc at |z| 0.8255 over the tire\'s outboard face, a crown band 45 mm over the tread from 70 degrees ahead of the top to 70 behind, and a bracket up the leading side of the wheel between the flank and the sidewall. No inboard wall, because its ends would swing into the flank. What the method sees is a static shell hiding a rotating tire: the tire below y 0.080 and its inboard shoulder stay charged, the shell is charged friction, and the frontal area it adds is measured by the sweep. 6 kg the pair, derived off the drawn area, all of it unsprung. Everything below the blurb is wheels-11\'s, carried to the vertex, including the harness and the rerouted aft runs.\n\n' + 'wheels-10 with one cable moved, and the reason it had to move belongs to two other modules. design/gen11.md narrows the cabin to 1.20 m and merges battery-10\'s pack rail with body-9\'s rocker into one structural sill at |z| 0.6600 to 0.7800, y 0.1035 to 0.4200, which is the 65 mm of air the brake-by-wire unit has run its aft harnesses through since Gen 7. Measured rather than assumed: inside the cabin band wheels-10 puts 1,491 vertices at |z| 0.6045 to 0.7678 and y 0.3327 to 0.3930, all of them above the pack lid, and 570 crossing triangle pairs 23.52 mm inside battery-11/sill. So both runs come inboard and down, into the rocker corner at |z| 0.6297 to 0.6477 and y 0.3175 to 0.3446, over the lid step and 75.4 mm under the lowest material hv-11 draws over it, and the +z run stops crossing the cabin under the front occupant and crosses at the toeboard instead. Swept against all nine modules a gen11 preset builds, enumerated from js/registry.js and from disk rather than from a list, the wheels slot goes from 14 penetrating part pairs and 5,115 crossings to 10 and 4,321: four close outright, including the sill at 23.52 mm and a brake line 37.55 mm inside interior-11\'s front seat, and nothing new appears. It costs 683.9 mm of harness on the pair, three more bends, a minimum bend radius that falls from 355 mm to 72 measured on the polyline the tube is built from, eight more clips and a service access that is now inside a rocker cavity with no removable outer panel. Two pairs at the rear termination deepen by a few hundredths on a curve that did not move, and the panel says why. The corner does not move. Every tire, wheel, cover, disc, caliper and park-brake vertex is wheels-10\'s, compared one by one at 1e-6 m and identical; the tire column is still |z| 0.6725 to 0.8075 and the hub face is still 0.6925. No Crr count is booked, because wheels-10 refused one for a tire it actually built and a harness route has no claim on a coefficient at all.',
  /* Mating features other modules have to land on. Schema in SPEC.md;
     tools/check-interfaces.sh proves these against the built mesh.

     BOTH KEYS ARE CARRIED AT THE PLANES THE PARTNERS DECLARE, AND THE
     PARTNERS ARE NOW GEN 11 ON ONE OF THEM. design/gen11.md carries
     drivetrain-9 unchanged, so front-halfshaft-outboard still meets
     drivetrain-9/front-unit at |z| 0.6925 with 2 mm of tolerance.
     front-corner-pack-outboard now meets battery-11/cornerclose, which
     declares the same 0.6625 that battery-10 did, with a 10 mm tolerance
     rather than battery-10's 8. The checker takes the TIGHTEST tolerance any
     declarer states for agreement and each declarer's OWN for realization,
     so this module keeps 11 mm: its nearest tire vertex is 10.0 mm off the
     plane by construction and an 11 mm window is what leaves that legible.
     Neither plane moved and neither could: this module built no new surface
     anywhere near either of them.

     front-halfshaft-outboard is wheels-9's declaration carried forward
     unchanged, and carrying it is load bearing rather than tidy. The hub
     face is at local -0.0475 and no radius, offset or hub coordinate has
     moved since, so the plane really is still 0.6925 and the nearest
     front-wheels vertex to it measures 0.0000 mm. A key declared by only ONE
     module in a preset merely WARNS, so dropping this line would turn the
     guard off on the one defect it was built for. */
  interfaces: {
    'front-halfshaft-outboard': {
      kind: 'face', axis: 'z', at: 0.6725, tol: 0.002,
      part: 'front-wheels', mirrored: true,
      note: 'hub face inboard plane, ET47 off a rim centerline at FRONTZ 0.74. The titanium insert ring spans |z| 0.6925 to 0.7125.',
    },
    /* THE FRONT CORNER, declared because design/gen10.md hard point 3 asks
       for it and because Gen 9 proved twice that two modules at one corner
       will otherwise measure against each other's prose.

       DERIVATION, from THIS module's built mesh and from nothing else. The
       tire's section maximum is a real vertex ring at |z| 0.6725, swept off
       the built lathe. The plane is that ring less a 10.0 mm running
       clearance, so |z| 0.6625, and `tol` here IS that clearance plus a
       millimeter of build: this module accepts the plane anywhere inside the
       air it holds, and `extent: 'min'` asserts that no tire geometry
       anywhere on this module, front or rear, comes inboard of it.
       battery-11 declares the same key with `extent: 'max'` and stops its
       corner closeout at |z| 0.6550, 7.5 mm inside the plane, which also
       leaves 12.5 mm over the cell stack at |z| 0.6500.

       TWO DERIVATIONS LAND ON ONE NUMBER AND THAT IS WORTH SAYING RATHER
       THAN LEAVING TO BE FOUND. battery-10 declares this key at the same
       0.6625 and its own note reads that number as wheels-9's 155 mm
       sidewall on the 0.740 center. It is also that, by coincidence. The
       derivation that governs is the one above, off geometry this module
       builds, per hard point 3. The two agree today and would stop agreeing
       the moment either module changed a section, so the next rung to open
       this corner should reconcile them to the built face at 0.6725.

       AND IT IS NECESSARY RATHER THAN SUFFICIENT, WHICH THIS NOTE SAYS
       BECAUSE A DECLARATION THAT OVERSTATES IS WORSE THAN NONE. It is a
       STATIC plane and the front wheels steer. The pack has cut past it to
       |z| 0.6550, which clears the disc ring the plane never reached, and the
       corner is still fouled beyond 3.0 degrees of lock. design/gen11.md
       section 9 item 6 inherits that foul explicitly and this module does
       nothing about it, because fixing it means moving a tire. The discs
       panel carries the sweep, measured against battery-10 and unchanged by
       anything here. */
    /* GEN 21: the extent clause retires. It asserted no tire vertex
       inboard of the plane, which was the contract's meaning while every
       tire was a corner tire; the center tire lives at |z| 0.0775 and
       makes the global claim false without touching the contract, which
       guards the pack's forward corner against the FRONT tire. Agreement
       and realization stand: the front inner face still derives the plane
       at 10.0 mm and battery-17 still closes to it. */
    /* GEN 24: THE TOLERANCE IS 0.021 AND THE PLANE DID NOT MOVE. This key
       asserts a DISTANCE from the pack's built corner keep-out to the
       tire, and the distance changed because the section did: the front
       inboard face goes 0.6525 to 0.6625, so the tire now stands 20.0 mm
       off the keep-out where it stood 10.0. The plane stays at 0.6425
       because battery-21 built its corner closeouts to it and this rung
       does not touch the pack. The checker read 19.5 mm against a 11.0 mm
       tolerance and failed, correctly, because the declaration said ten.

       WIDENING A TOLERANCE TO PASS A CHECK IS THE ONE THING THIS FILE MUST
       NOT BE DOING, so the direction matters and is stated: the tire moved
       AWAY from the pack. Every millimetre of the change is clearance
       gained, and the number is updated to the measurement the way the
       ladder's pinned descents are, never the other way round.

       AND IT LEAVES SOMETHING ON THE TABLE FOR THE PACK. battery-21's
       closeouts are drawn to a keep-out derived from a tire face that has
       since moved outboard 10 mm, so the pack's forward corners are now
       10 mm more conservative than the rule that built them. Reclaiming
       that is a battery generation, not this one, and it is named here so
       the next rung can find it. */
    'front-corner-pack-outboard': {
      kind: 'face', axis: 'z', at: 0.6425, tol: 0.021,
      part: 'tires', mirrored: true,
      note: 'Gen 24: keep-out for the pack outboard front corner, built tire section minimum |z| 0.6625 less 20.0 mm of running clearance. The plane is battery-21\'s and did not move; the 105 section took the tire 10 mm further off it than the 125 stood. Covers the tire only; see the discs panel for the disc ring and the steered envelope.',
    },
    /* THE PANT BRACKET, new for Gen 13. The foot lands on suspension-9's front
       knuckle outboard face, which its own panel measures at |z| 0.5830 and
       which drivetrain-9's halfshaft sweep reproduces. Declared with extent
       MIN on this part: no vertex of front-pants is inboard of the plane, so
       the foot arrives at it and nothing of the pant is inside the upright.
       suspension-9 is carried unchanged and declares no half, so this key
       WARNS as unmet rather than fails, which is the visible and honest
       state: the knuckle has the face and no declaration, exactly as body-12
       declared its subframe planes against a carried suspension-9. */
    'front-pant-bracket': {
      kind: 'face', axis: 'z', at: 0.5630, tol: 0.002,
      part: 'front-pants', mirrored: true, extent: 'min',
      note: 'suspension-9 front knuckle outboard face. The pant bracket foot seats on it at (1.505, 0.470) and nothing of the pant reaches inboard of it.',
    },
    /* THE HOUSE FOOT, replacing the saddle foot the deleted corner took
       with it. The center house mounts as every fairing since wheels-11
       has, on the unsprung side: each of its two legs leaves a foot on the
       underside plane of suspension-21's arms at y 0.3270, the
       twin trailing fork that carries the center wheel. Declared with
       extent MAX on the part: no vertex of the house stands outboard of
       the plane, so the feet arrive at it and nothing of the house
       reaches into the fork. Until suspension-21 is registered in a preset this
       key WARNS as unmet rather than fails, which is the visible and
       honest state the pant bracket and saddle foot keys both shipped
       in. */
    'center-house-foot': {
      kind: 'face', axis: 'y', at: 0.3270, tol: 0.002,
      part: 'center-house', mirrored: false, extent: 'max',
      note: 'the swingarm arms\' underside plane. The house leg feet bolt up into it at (-1.28, +z) and (-1.22, -z), and nothing of the house stands above it, which extent max asserts.',
    },
  },
  parts: {
    tires: {
      name: 'Tires',
      tagline: 'Gen 24: three tires, two drawings and now two pressures: 105/96 R20 at 6.7 bar on the axle that carries the roll couple, one 155/65 R20 at 5.6 on the patch no couple can reach. The front section came in 20 mm and the pressure came up to hold their product, which is the only quantity either the casing or the rolling term can see.',
      mass: 20.1,   /* Gen 24: 21.0 x 0.95851, the drawn area over wheels-22's (1.9607 m2 against 2.0456). It is the ONLY part in this module whose area moves at all, which is the assertion this rung rests on: nothing was repositioned, so nothing else could change. */
      count: 3,
      specs: [
        ['Sizes', 'Gen 24: front 105/96 R20 at 6.7 bar, one rear 155/65 R20 li 102 at 5.6 (wheels-22: 125/81 front at 5.6)'],
        ['Rolling resistance', 'Gen 24: 3.8 kg/t booked unchanged once more, and this time the reason is arithmetic rather than caution. Patch length is load over pressure over net width, so it scales as 1 over width times pressure: 0.84 x 1.196 is 1.005. The front patch reads 99.2 mm against 99.7 and its deflection holds at 3.5 mm, so this rung moves the rolling term in neither direction. See CRR_BASIS and design/crr-findings.md'],
        ['Cold pressure', 'Gen 24: 6.7 bar front, 5.6 rear; the placard is two figures now, and 6.7 x 105 is 703 against the 125\'s 700 at 5.6'],
        ['Patches', 'Gen 24: front 51.4 cm2 at 351 kg laden static on 105 mm at 6.7 bar, rear 91.1 at 520; the front patch is 16 percent smaller and 99.2 mm long against 99.7, so the loss is width and the deflection holds at 3.5 mm'],
        ['Envelope', 'OD 0.7100 m frozen; front faces |z| 0.6525/0.7775, rear faces z -0.0775/+0.0775'],
        ['Load margins', 'outer front 602 kg worst at 0.714 g against 708 of casing; rear 572 at 0.30 g power-on against 878'],
        ['Maturity', 'The 5.6 bar C1 casing and the steel-free belt are both extrapolated'],
      ],
      how: 'Gen 21: the corner count changed and the load map with it, so this panel re-derives before it carries. The rear axle\'s load did not leave with the corner: 519 kg of laden static rear load that two 135 casings shared now lands on one patch, and one 135 at 5.6 bar is inside its 765 kg capacity on load and outside it on deflection, because patch area is load over pressure and does not care how many tires share the axle: the patch doubles, the chord solution puts the deflection at 6.7 mm against the front\'s 3.5, and deflection over radius is the first-order crr route. The honest pair of answers is width or bar; this module ships the width, and the drawing then took a size back: a first draft carried a 185, whose 1,049 kg of capacity and front-class patch were more tire than any case needs, and whose extra 30 mm of section billed the frontal union at the one station a trike cannot hide. What ships is a 155/65 R20 on the pair\'s own 4.5J rim: capacity by the same pressure-times-width rule (690 kg at 4.4 bar and 155 becomes 690 x 1.273) is 878 kg against 520 static and 572 at 0.30 g power-on, 53 percent of margin against the fronts\' own 15; the patch runs 119 mm at 5.0 mm of deflection, inside the 6.3 the carried crr\'s own 135 rode on, so the coefficient stays honest by the deflection route as well as the ledger one. No lateral transfer ever reaches this tire: a contact patch on the roll axis takes no roll couple, so its worst case is longitudinal, and braking unloads it.\n\nThe fronts take the other half of the map: the whole roll couple crosses the one axle with a track now, so the outer front carries 602 kg at the 0.714 g grip budget, and the 125 section\'s capacity at 5.6 bar is 708. Inside its casing by 15 percent, where wheels-10\'s 135 sat 6.7 kg inside at a four-wheel couple; the margin thinned and the brief says so as a capability cost, not a footnote. The 125 keeps the 135\'s tread architecture scaled: net width 61.7 mm, patch 61.5 cm2 at 351 kg static, 99.7 mm long. Every patch on the car now deflects at or under 5.0 mm against Gen 20\'s 6.3: per-tire load fell everywhere (351 front against 508, 520 rear on a casing rated 878), so the deflection route now reads about 2.4 kg/t where the module books 3.8, and the count stays unbooked for CRR_BASIS\'s unchanged reason: the base is already outside the world.\n\nWhat follows is the carried record of the 135 this drawing scales from, wheels-17\'s panel and then wheels-10\'s, with every measurement intact; its four-corner load cases describe the car this module unbuilt.\n\nGen 17: the same tire on a 1.44 m track: section |z| 0.6525 to 0.7875 at both axles, centered on battery-11\'s sill so that 7.5 mm stands proud of it each way instead of 27.5 outboard. The pack\'s corner keep-out follows, 0.6425 (the face less 10 mm), and battery-17 draws its closeouts to it. Crr 0.0038, carried.\n\nCarried whole from wheels-10, verified at 1e-6 m rather than asserted. All 32,256 tire vertices compare identical to wheels-10\'s in build order, so the section, the tread, the pressure and the column at |z| 0.6725 to 0.8075 are Gen 10\'s to the micron. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means gen 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nThe whole of this panel is one decision and design/gen10.md wrote the order of work before any of it: write the anchors first, then decide whether a count may be booked. So the anchors come first here too.\n\nWhere this ladder\'s Crr sits against the world, in kg/t, which is newtons of resistance per kilonewton of load. EU C1 label class A, the regulatory limit for a passenger tire, is 6.5. The best C1 production tires measure about 5.5 on the ISO 28580 drum. The lowest figure published for a full-scale, four-seat, road-registered car is the Mercedes vision EQXX at 4.7, on a Bridgestone ENLITEN casing built for one 1,200 km run. Below that there is exactly one road-legal class: EU C3 heavy-truck label class A at 4.0, reached by long-haul steer tires a meter in diameter running 8 to 9 bar under 3,000 kg. Below that the list runs out of road cars: solar-challenge tires at 2.0 to 3.0 carrying about 65 kg each, a steel wheel on a steel rail at 1.0 to 2.0, and a Shell Eco-marathon prototype tire at about 0.8 under 25 kg.\n\nNow the ladder against that list. Gen 1 is 7.2, which is EU class B and a defensible base for a stamped sedan. Gen 2 is 5.2, under the class A limit. Gen 5 is 4.6, which is under the EQXX, and no rung on this ladder says so. Gen 7 is 3.8, inside the heavy-truck class A band on a tire a third of a truck tire\'s diameter, and that is what wheels-9 carried and what this module carries. The brief asked for 3.4.\n\nThe test that decides it, and it is arithmetic rather than judgment. Three mechanisms are available to a tire whose diameter is frozen, and every one of them is real. Inflation 4.4 to 5.6 bar, at the standard Crr proportional to p^-0.4, is a factor of 0.908. Tread depth 5.5 to 4.5 mm with the void fraction 24.0 to 18.6 percent, against a tread band that is the largest single share of a passenger tire\'s loss, is about 0.92. A single-ply carbon-cord casing under a steel-free two-ply belt, which removes sheared rubber interfaces from the belt package, is about another 0.92. Multiply: 0.7686. Apply it to 3.80 and the answer is 2.92 kg/t.\n\n2.92 is not 3.40. It is well past the target, and a module that wanted the count could stop there and book it. Apply the identical product to the anchors instead. On a real 5.50 kg/t class A tire it gives 4.23, which is about the EQXX and is a completely defensible best-in-world figure. On the EQXX\'s own 4.70 it gives 3.61, which is a claim somebody would have to defend and could. On 3.80 it gives 2.92, which is inside the solar-challenge band at roughly eight times the load per tire: 508 kg on this car\'s front corner against about 65 kg on a solar car. One set of multipliers, three bases, and only the answers from the real bases are tires anybody has built.\n\nThat is the signature of a base that has drifted, and it is the same signature design/area-rezero.md found in Cd: the deltas are sound and the absolute zero is not. So this module does what that document did. CRR_BASIS is exported with the base, the anchors, the count-by-count history, the mechanism ledger and the offset, and js/efficiency.js should carry \'wheels-10\': { crr: 0.0038 }. The geometry is here and the number is not.\n\nWhat that costs the generation, stated rather than buried, because it is the whole margin. design/gen10.md section 7 prices the Crr step at 43.1 miles and its own table carries the outcome: with autonomy-10 at its target and Crr frozen, Gen 10 reads 107.852 Wh/mi and about 1,761.7 miles, a step of +87.7 against Gen 9\'s 1,673.9 and 38.3 miles short of 1,800. That is the third largest step on the ladder and it is short of the target, and both halves of that sentence are this module\'s to say.\n\nOne correction to that row, upward, and it is this module\'s to make because nobody else measured it. Section 7 holds frontal area at 2.0978 m2 throughout, which is the Gen 9 cell, and this module moves it: the union of body-9, this module and a pack measures 2.090612 on battery-7 and 2.089740 on battery-10 as it stands, against the 2.097783 the same integrator returns for Gen 9. Run through the shipped computeBudget at Gen 10\'s own operating point, aux 319 W and mass 1,386.58 kg and Crr still 0.0038, that is worth 2.08 miles, so the rung reads about 1,763.8 and is 36.2 short of 1,800 rather than 38.3. The correction is small and it is in the direction that flatters this module, which is exactly why it is written down rather than absorbed. It is also not a booking: the area table is regenerated once by the integrator after every Gen 10 module lands, per hard point 2, and the cell that ends up in it is the one that counts. See the covers panel for why none of those four figures may be pasted into a cell.\n\nWhat the tire actually is, since it is built. 135/75 R20 on a 4.5J rim at 5.6 bar cold. The aspect ratio is an output: P.tireR 0.355 and the 20 inch bead seat fix the section height at 101.0 mm on every tire this slot will ever draw, so a 135 mm section reads 75 series for the same reason a 155 read 65. Measured off the built lathe with one function over both profiles, the tread band is 81.8 mm against wheels-9\'s 94.0, the net contact width at full crown radius is 66.6 mm against 71.4, and the void fraction is 18.6 percent against 24.0. Four circumferential grooves 4.5 mm deep replace five at 5.5 and 5.0, and the center groove is deleted for a continuous 30.4 mm center rib, which is the pattern decision the whole panel rests on: a groove down the centerline splits the rib carrying the highest contact pressure into two half-ribs that squirm independently, and block squirm is hysteresis.\n\nThe contact patch, one model over both tires, because every number below and the deflection route to Crr all come out of it. Contact patch area is load divided by inflation pressure. The front static corner carries about 508 kg laden on both rungs, on a 56.9 percent front split, so the patch goes from 113.4 cm2 to 89.0, and on the net contact width the patch length goes 158.8 mm to 133.7. Solving the chord gives a static deflection of 8.88 mm against 6.29, and the vertical rate, taken as the derivative of pressure times patch area with respect to deflection, goes 280.9 kN/m to 396.1.\n\nAnd that deflection is the second, independent route to the same verdict. Rolling resistance is hysteresis in rubber that is cyclically strained once per revolution, so to first order Crr goes as deflection over free radius. The deflection ratio is 0.7087, which on 3.80 gives 2.69 kg/t. Two different models, one from mechanism multipliers and one from measured geometry, land at 2.92 and 2.69. Neither is 3.40, both are past every anchor, and the agreement between them is not reassurance. It is the same overshoot twice.',
      why: 'Because design/gen10.md wrote the decision rule in advance and this module is not allowed to invert it, and because the rule is right.\n\nThe argument for booking is easy to make and worth stating fairly. The ladder\'s Crr is an internal currency; every count from Gen 1 has been booked against a named mechanism; the mechanisms here are real physics with a published exponent on the strongest of them; and a rung-to-rung comparison on a consistent currency is exactly what this project\'s model is for. All of that is true. It is also, word for word, what CD_BASIS says about the drag coefficient, and design/area-rezero.md still concluded that no Cd count may be booked. It did not conclude that a body may keep booking counts as long as it documents the offset. Requiring CRR_BASIS and then booking 43.1 miles would be the weaker half of that precedent, and 43.1 miles is 33 percent of this generation\'s predicted step and the entire margin over 1,800.\n\nThe structural reason is sharper than the precedent. A count is defensible when the mechanism it names is measured on the object it is applied to. Here the mechanisms are measured on the world\'s tires and the object is a coefficient that is already outside the world\'s tires. Applying a real 9 percent to a base that is 19 percent below the lowest number anyone has published does not produce a tire that is 28 percent better; it produces a number with no referent. Eight bodies reached Cd 0.108 one defensible count at a time, and every one of those counts had a mechanism too.\n\nThere is a version of this rung that is worth more than the count, and it is this one. The tire that would earn 3.4 kg/t is drawn, measured and priced in wet grip, braking distance, ride rate and load capacity. The anchors that decide whether 3.4 is a tire or a fiction are written down and exported as data. If a drum ever exists, the count is already derived and the geometry is already built. What Gen 11\'s retro will not have to do is write off 43.1 miles.',
      fail: [
        'The load index is finally not short, and part of the repair is the tire gripping less. wheels-9 recorded the defect and declined the fix: at 0.74 g on the 1.48 m matched track with a 58 percent front roll couple, the outer front tire carries 768 kg laden against load index 95\'s 690, so 78 kg over, and it named load index 100 as the correct answer. One method over both rungs, laden 1,787.58 kg then and 1,786.58 now: the capacity a casing earns scales with inflation pressure times section width at a given deflection, so 690 kg at 4.4 bar and 155 mm becomes 765 kg at 5.6 and 135. The outer front corner reads 758.1 kg, because a 0.714 g tire transfers less load than a 0.740 g one. So the corner goes from 78 kg over to 6.7 kg under, and the honest decomposition is that 75 kg of that swing is casing and 9 kg is grip the car no longer has. Held at 0.74 g the same casing would still be 2.3 kg over. This is the first rung in the ladder\'s history where the worst-loaded corner is inside its tire, and it is inside by seven kilograms.',
        'Wet grip is the price and it is A large one. One model over both tires, with the terms named so it can be rejected: peak wet friction taken as dry peak times 0.60 at wheels-9\'s 5.5 mm tread and 4.4 bar, scaled by tread depth to the quarter power for drainage and by pressure to the minus tenth for the smaller patch. Dry peak falls 0.740 to 0.714, because mean contact pressure rises 27 percent and rubber friction falls with contact pressure at roughly the minus 0.15 power. Wet peak falls 0.444 to 0.398, which is 10.4 percent. Braking from 100 km/h goes 53.15 m to 55.10 m dry, so 1.95 m, and 88.58 m to 98.92 m wet, so 10.34 m. Ten meters is two car lengths and it is the real cost of this tire.\n\nHydroplaning moves the other way and the two must not be added together. Dynamic hydroplaning onset goes as the square root of inflation pressure, so on the classic 9 times root psi in knots the onset rises from 133.2 km/h to 150.2. So the tire is harder to float and worse once wet, which are two different failure modes with two different answers, and the deleted center groove is on the wrong side of the second one: the water that does reach the patch has one fewer path out from under the rib that carries the most load.\n\nAnd there is no skid trailer here either. The wet numbers above are a model with named terms, exactly like the Crr numbers this panel refuses to book, and they are published in that spirit rather than as measurements.',
        'The ride rate rises 41 percent and the slot that would catch it is not open. The tire is the top spring in series with everything suspension-4 and suspension-9 built, and its vertical rate goes 280.9 kN/m to 396.1 on the same patch model. Ride frequency is held by construction on this car because the air springs scale rate with load, so the primary ride is unaffected; what moves is the secondary ride and the wheel-hop mode. On a stated 42 kg of unsprung mass per front corner, of which 17.5 kg is this module\'s own tire, wheel, disc and cover, and a 40 kN/m spring path, hop goes from 13.91 Hz to 16.22 Hz. That assumption is stated because it is an assumption: suspension-9 owns the rest of the unsprung mass and Gen 10 does not open the suspension slot, so nobody re-tunes a damper against this. A 41 percent stiffer tire on an untouched damper is a real and uncompensated regression in impact harshness.',
        'Tread life, and the thing this module would have done if it were allowed. 4.5 mm of pattern leaves 2.9 mm above the 1.6 mm legal floor, against wheels-9\'s 3.9 and wheels-6\'s 5.9. Three generations of this slot have spent tread depth and each has left less. The lever that would give it all back is diameter: a taller casing at the same section carries more tread rubber and a smaller deflection per unit load, and it is the single best answer to everything on this panel. It is not available. wheels-9/tires is built to y 0.0000 to 0.7100 exactly, P.wheelY 0.355 puts the hub on the crown radius with the patch on the ground plane and zero slack at either end, and P.wheelY appears in seventeen system modules and, re-measured here with comments stripped, is a live code read in all seventeen rather than design/gen10.md\'s fifteen; the difference is a comment-stripping convention and the conclusion is the same either way. design/gen10.md hard point 5b makes it a frozen constant rather than a design variable, and section 4b says why: drivetrain-9 derives its entire core-loss argument, and therefore the driveEff 0.958 the whole ladder books, from a 0.34 m dynamic rolling radius. Growing the tire is the halfshaft defect with the axis rotated. It wants a fifth module and a re-sweep of all seventeen readers, and it comes back to design/gen10.md before it is drawn.',
        'The rolling radius moved anyway, by 0.9 MM, and nobody asked for it. The free radius is frozen and this module holds it to the micron. The dynamic rolling radius is not the free radius: it is the free radius less about a third of the deflection, and the deflection fell 8.88 mm to 6.29 mm when the pressure rose. So the dynamic rolling radius goes 0.3520 m to 0.3529 m, plus 0.9 mm and plus 0.26 percent, which at drivetrain-9\'s 780 wheel rpm is 0.26 percent of speed. It does not move the booked driveEff and the reason is worth more than the number: drivetrain-9 derives that efficiency from a 0.34 m dynamic rolling radius, and neither tire produces 0.34. The two are 12 mm apart already, so this generation moved a quantity by a fourteenth of a discrepancy nobody has closed. It is reported here rather than left for a reviewer because a frozen constant with an unfrozen derivative is how the halfshaft got wrong at two consecutive rungs.',
        'One placard pressure for four corners, carried from wheels-9 and now more binding. Both axles run the same geometry, so a pressure change to fix understeer changes rolling resistance at both ends at once, and at 5.6 bar the tuning window is narrower than it was at 4.4 because the casing is closer to its rating and the patch is 21 percent smaller. The compensation is still suspension-9\'s bars rather than the tire, and suspension-9 is not open this generation.',
      ],
      explode: [0, 0, 0.85],
    },
    'front-wheels': {
      name: 'Front wheels',
      tagline: 'Twenty by three and a half, re-offset 5 mm inboard on a hub face that did not move, which is wheels-10\'s own trick played one size further down.',
      mass: 10.2,
      count: 2,
      specs: [
        ['Wheel center', '(+-1.45, 0.355, +-0.72); front track 1.44 m, carried from wheels-17'],
        ['Size', '20 x 3.5J re-offset 5 mm inboard, hub face plane |z| 0.6725 untouched (wheels-10: 4.5J centered)'],
        ['Rim planes', 'flange lips |z| 0.66405 / 0.76595, seats 0.67055 / 0.75945'],
        ['Bead seat', '5.02 degrees of taper carried, 2.1 mm of radius across the seat'],
        ['What it buys', 'tire faces 0.6525 / 0.7775: the inner face to the digit, the outer in the full 10 mm'],
        ['Maturity', 'Pilot line; the wheel is wheels-6\'s drawing on a narrower, offset barrel'],
      ],
      how: 'Gen 21: the barrel narrows to 3.5J and shifts 5 mm inboard as one move, and the two must land together or the area column dies at the rim. Drawn out before cutting: a 125 tire centered on the 0.72 wheel plane puts its face at 0.7825, only 5 mm in, and the carried 4.5J flange lip at 0.7837 would then stand PROUD of the tire and own the outline, handing back most of the 10 mm the section change bought. So every axial on the barrel moves with the width exactly as wheels-10 moved it at 5.0J to 4.5J (radii frozen: flange 0.2665, seat 0.2540, well 0.2300), and the whole barrel then shifts 5 mm inboard so the tire it carries holds its inner face on the carried 0.6525 plane, which keeps the pack keep-out\'s 10.0 mm derivation reading unchanged, and lands the outer face at 0.7775. The hub face is not on the barrel and does not move: local -0.0475, world |z| 0.6725, the declared front-halfshaft-outboard plane, nearest vertex 0.0000 mm, which is the whole reason a rim was ever the free dimension at this corner. A 125 on 3.5J is a 1.09 width ratio, inside the approved band the same way the 135 sat on its 4.5J.\n\nWhat follows is the carried record, wheels-10\'s panel with its measurements intact; its absolute planes describe the 4.5J centered barrel this drawing re-offsets.\n\nCarried whole from wheels-10, verified at 1e-6 m rather than asserted. All 15,824 front-wheel vertices compare identical to wheels-10\'s, so the 4.5J barrel, the tapered bead seat and the hub face at |z| 0.6925 are Gen 10\'s. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means gen 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nWhat moved and what did not, because on this part it is exactly one axis. Every radius on this wheel is wheels-6\'s to the digit: the flange lip is 0.2665, the bead seat is 0.2540, the drop-well floor is 0.2300 and 24 mm deep, the hub insert is 0.0740 and the spoke web runs to 0.2305. Every axial coordinate on the barrel moved inboard with the 4.5J width and nothing else did. The hub face is still at local -0.0475, which is world |z| 0.6925, which is the declared front-halfshaft-outboard plane; the nearest vertex to it measures 0.0000 mm and drivetrain-9\'s front-unit reaches exactly 0.6925 on the other side of it. Narrowing a rim does not move an offset, and that is the whole reason this generation could touch the rim at all.\n\nThe bead seat is tapered now and it should always have been. wheels-6, wheels-7 and wheels-9 all drew the seat as a cylinder at constant radius. A passenger rim seat rises at 5 degrees toward the flange, and that taper is not decoration: it is the mechanism by which inflation pressure drives the bead up the ramp into an interference fit against the flange, which is what holds a tubeless tire on a rim that has just lost its air. On a 4.4 bar tire drawing it flat was a drawing error. On a 5.6 bar tire it is the retention argument, so it is built: 2.1 mm of radius across a 23.9 mm seat, measured back off the profile as 5.02 degrees. The safety hump inboard of each seat is wheels-9\'s and is unchanged in radius.\n\nThe swept envelope, run the same way wheels-9 ran it so the pair is one method. Every vertex of the built front tire, wheel, cover and disc rotated about the vertical axis through (1.45, 0.74), maximum |z| recorded:\n\n    deg      wheels-9   wheels-10   delta\n      0      0.8190     0.8090      -10.0 mm\n      2      0.8298     0.8198      -10.0\n      6      0.8512     0.8412       -9.9\n     10      0.8720     0.8621       -9.8\n     14      0.8926     0.8834       -9.2\n     16      0.9032     0.8941       -9.1\n  17.25      0.9097     0.9006       -9.1\n     20      0.9238     0.9148       -8.9\n     22      0.9337     0.9249       -8.8\n\nTen millimeters static, tapering to 8.8 at 22 degrees, and the taper is itself a measurement worth having: a narrowing is not a translation. wheels-9 moved the corner rigidly, so its whole swept surface shifted 70 mm at every angle and body-9 could work from a subtraction. This module shrinks the corner about its own center, so the gain is largest where the binding feature is the cover disc and smallest once the tire shoulder takes over. Do not subtract a constant from this table.\n\nWhat the ten millimeters buy at the partners, measured surface to surface against the built body-9 rather than against its prose, one method over both wheels:\n\n    cover to front fairing        43.90 mm  ->  50.16 mm\n    tire to front fairing         25.50     ->  35.50\n    cover to arch louvers         72.40     ->  82.39\n    tire to rear arch closeout     4.74     ->  10.89\n\nThe last row is the one nobody had. 4.74 mm from the rear tire to body-9\'s rear arch closeout is the tightest clearance this corner has to the body at either axle, it is not on any wheels-9 panel, and it is not on any body-9 panel either. It is a surface-to-surface reading; a nearest-vertex sweep would have missed it, which is precisely how the pack clearances on the discs panel went wrong. It is now 10.89 mm and it is still the tightest.\n\nWhat this panel does not claim. body-9 is carried unchanged and this module books no area credit against it. Ten millimeters of swept envelope per side is real and it is body-9\'s to spend or not; nobody has redrawn a fairing around it and nothing in js/efficiency.js should move because of it. wheels-9 made exactly this distinction about Cd and it was right: a wheel module that starts crediting itself with a partner\'s integral is how a ladder loses track of who measured what.',
      why: 'A 4.5J rim is not a styling choice, it is the only rim a 135 section can sit on, and getting it wrong in either direction is a real failure. Too wide and the sidewalls are pulled straight, the casing loses the curvature that carries lateral load and the bead is over-stressed at 5.6 bar. Too narrow and the section balloons, which puts the widest point of the tire back where the narrowing was supposed to take it from and hands the frontal area straight back. 135 mm of section on 114.3 mm of rim is a 1.18 ratio, which is what a passenger tire of this aspect wants.\n\nThe deeper reason to touch the rim at all is that it is the one part of this corner whose axial coordinates are free. Everything else is pinned: the hub face is an interface, the disc is pinned by a ball joint radius, the caliper is pinned by the disc, and the diameter is pinned by seventeen modules reading P.wheelY. The rim width is the only dimension on the front corner that no other module reads, which is why it is where the section change is allowed to land.',
      fail: [
        'hv-4\'s by-wire feed ran through this wheel on Gen 10 and it does not on Gen 11, and the tense is the correction rather than the finding. This entry is wheels-10\'s, carried, and it is a gen10-preset measurement: hv-4 is not in a gen11 preset. Swept against the hv-11 that is, this slot has zero penetrating pairs with the hv slot, on every part, for wheels-10 as well as for this module. What follows is therefore the history of the pair and not a live foul, and the live sweep is the gate block above build().\n\nThe number got worse by the tool\'s own metric while the geometry got better. Measured with tools/check-interfaces.sh\'s own predicate, one method over both rungs: hv-4/bywire-feeds x wheels/front-wheels goes from 182 crossing triangle pairs at 16.23 mm to 142 pairs at 18.57 mm. The feed occupies x 1.1024 to 1.3140, y 0.3480 to 0.3798 and |z| 0.6522 to 0.7128, and the rim barrel it crosses spans |z| 0.67635 to 0.80365 at radii 0.2300 to 0.2665, so pulling the inboard flange 6.35 mm outboard reduced how much of the cable is inside the barrel from 42.8 mm to 36.4. The crossing count agrees with that and the depth does not, and SPEC.md already says why: the reported depth is the plane-straddle depth, which on a slender part crossing a large panel is not the intrusion. Both figures are published because design/gen10.md hard point 8 says a pair that deepens is this generation\'s, and this one deepens by that metric. It is not fixable from the wheels side without giving the pack corner back.',
        'Two more pairs deepen and both are hv-4 against the tire rather than the wheel, and they are on this panel because this panel owns the whole-car sweep. hv-4/bywire-feeds x wheels/tires goes 144 pairs at 3.88 mm to 167 at 4.24, and hv-4/zonal x wheels/tires goes 232 pairs at 9.89 mm to 126 at 10.06. Both are the tire\'s inner sidewall moving 10 mm outboard into cable that was routed around a 155 section. Against them, two pairs close outright, autonomy-4/ring x wheels/tires at 112 pairs and 6.53 mm and interior-6/nvh x wheels/tires at 96 pairs and 8.56 mm, and five improve. Only two of the five get shallower: hv-4/ring x wheels/tires 571 pairs at 19.37 mm to 460 at 16.00, and hv-4/bywire-feeds x wheels/rear-wheels 176 at 18.97 to 182 at 15.84. The other three keep their depth to the hundredth and lose crossings: body-9/front-fairings x wheels/calipers 832 to 815, hv-4/zonal x wheels/rear-wheels 390 to 314, interior-6/nvh x wheels/rear-wheels 52 to 48. "Four shallow" would be wrong here: it is neither the two that are shallower nor the five that improve.\n\nAnd read the rear-wheels feed pair twice, because it is the fourth pair this generation made worse and it is easy to file under an improvement. hv-4/bywire-feeds x wheels/rear-wheels is 3.13 mm shallower and it gains six crossings, 176 to 182. design/gen10.md hard point 7 counts a pair that appears, deepens or gains crossings as this generation\'s work, and the calipers panel invokes that same clause against this module\'s own first sensor route, so it has to be invoked here. The cause is the same 6.35 mm of rim: the rear barrel moved outboard into a feed routed around a 5.0J rim, exactly as the front one did, and like the front one it is not fixable from the wheels side. Net over the whole car: 32 penetrating part pairs and 9,668 crossings become 30 and 9,135. The corner is better, three pairs are deeper and a fourth is wider, and a module that published only the first half of that sentence would be doing what the discs panel had to be corrected for.\n\nEvery figure in this entry is A gen10 preset figure and none of it is live. hv-4, interior-6 and autonomy-4 are the partners it names and a gen11 preset builds none of them. On the preset this module ships into, the wheels slot has zero pairs with hv, zero with interior and zero with autonomy, and its whole-car sweep is 10 penetrating part pairs and 4,321 crossings against wheels-10\'s 14 and 5,115. The entry is kept because the decision rule it invokes is the rule this module is judged by and because deleting a cost when the partner that priced it goes away is exactly the move this file exists to argue against.',
        'suspension-9 is the third party at this corner and it is not in this generation. All nine of its pairs against this module were re-swept after the geometry moved, one method over both, and every one of them is bit identical: rear structure through the park brake 1,416 pairs at 20.00 mm, steering into the disc 212 at 14.79, front structure into the disc 148 at 14.78, front knuckle into the disc 572 at 13.83, the 48 V feeds into this wheel 35 at 12.46, front knuckle into the caliper 251 at 10.91, rear steer into the master unit 192 at 9.79, rear structure into the master unit 122 at 7.27, and rear steer into the park brake 215 at 2.46. Not one appeared, deepened or gained a crossing. That is the required result rather than a good one: the corner is fouled, the fix belongs to two slots, and design/gen10.md is explicit that this generation is not that task and only has to avoid making it bigger.',
        'The wheel got 98 grams lighter per rim and the ledger does not book it. 12.7 mm less barrel width on a 0.53 m barrel at 3 mm of CFRP wall is 0.098 kg, so 0.39 kg across four rims. That is a real saving and it is below the resolution this project\'s mass ledger works at, which is the kilogram, so booking it would mean rounding 0.39 up to 1 and taking 0.7 miles the car did not earn. The front wheels stay at 11 kg and the rear at 12, exactly as wheels-9 had them.',
      ],
      explode: [0, 0, 1.15],
    },
    'front-pants': {
      name: 'Front wheel pants',
      tagline: 'wheels-13\'s fairing over the wheel that steers, brought down to 18 mm over the tread and run to the road, because the bracket stopped passing over the tire.',
      mass: 5.4,    /* Gen 21: the dish flare shortens 10 mm with the tire face and the disc plane rides in with it; Gen 20 booked 5.5 (5.3 x 1.0364, the drawn area over wheels-17's) */
      count: 2,
      specs: [
        ['Ancestor', 'wheels-13 front pants, 5.8 kg: band at r 0.400, nose to y 0.126, crown edge at |z| 0.700, arm over the shoulder'],
        ['Disc', '|z| 0.8255 outer face, r 0.373 about the axle, clipped at y 0.045 (Gen 20; wheels-13 to 17: 0.080) and notched at its trailing edge to x 1.115 below y 0.53, for battery-11\'s sill end at full lock; 16.0 mm off the tire section max, 14.5 off the cover lip'],
        ['Band', 'r 0.373 inner (18 mm over the tread at the crown), 61 degrees behind the top to 137 ahead; |z| 0.6725 to 0.8255 at the crown, the inboard edge at the tire face to 42 degrees, 0.700 by 50, then 0.665 on the nose and 0.725 on the tail from 58'],
        ['Bracket', 'Knuckle face (1.505, 0.470, 0.583), up the leading side at x 1.500 and |z| 0.635 to y 0.700, a 25 mm jog to the band\'s inboard edge at (1.500, 0.722, 0.664). No arm over the tire'],
        ['Tightest', 'tools/envelope.sh on gen15: the nose cap\'s bottom to body-15\'s notched floor closeout at 14 degrees of lock, 23 mm (1.7 before body-15 notched it); the tail tip to hv-15\'s zonal box at lock plus rebound, 17 mm (wheels-14: 6.7); 12 mm, leg to the flank at lock (carried)'],
        ['Mass', '2.02 kg of 4 mm carbon sandwich at 3.5 kg/m2 over 0.577 m2, 0.44 of aluminum leg, foot and clip, 0.20 of fixings: 2.66 a corner, unsprung'],
        ['Maturity', 'Production practice on a three-wheeler and on record cars; a steered pant on a four-wheel road car is a pilot-line claim'],
      ],
      how: 'Gen 21: the pant follows the tire it rides. The 125 section takes the outer face to 0.7775, so the disc\'s outer plane comes in the same 10 mm to 0.7955 and the dish between band and disc shortens; the band\'s inboard edge stays on the tire\'s inner face, which the re-offset rim holds at the carried 0.6525, so every inboard clearance in the carried text below is untouched: the bracket, the nose and tail edges, the notch for the sill\'s end face at full lock. The exposed front strip below the 45 mm floor narrows with the section, 0.0138 to a measured 0.0129 m2 the pair, and this plane, 0.7955, is now the widest thing on the car, which is what body-21\'s walls follow and where the whole area column lives.\n\nGen 17: the pant rides 20 mm inboard with its wheel, translated as a group, so every clearance inside it is wheels-15\'s: the wall at |z| 0.8055, the band\'s inboard edge at the tire\'s face 0.6525, the bracket foot on suspension-17\'s knuckle face at 0.5630. Exposed front tire 0.0213 m2 against 0.0232.\n\nThree changes to wheels-13\'S pant, each one of its own measurements pointed at. wheels-13 held its band 41 to 45 mm over the tread because the bracket arm crossed the tire\'s shoulder under the band at 18 mm and the band had to clear the arm; the rear saddle on this module needs no arm because it hangs from the inboard side, and once the front leg is made to end at the band\'s own edge rather than reach under it, the front band can sit where the rear one does. So the leg still leaves the knuckle\'s outboard face at (1.505, 0.470, 0.583) and still rises up the leading side at x 1.500 and |z| 0.635, where it is 26.5 mm from the tire\'s inner sidewall and 24 mm from the flank; at y 0.700 it jogs 25 mm outboard over 22 mm of rise to (1.500, 0.722, 0.664), which is beside the tire\'s tread shoulder at |z| 0.690 with 19 mm to spare, and a 30 by 12 mm clip ties it to the band\'s inboard edge. The band\'s inner face is at r 0.373, 18 mm over the crown, the same 18 mm the old arm had over the shoulder: the one clearance wheels-13 named as its tightest is now the band\'s own, and nothing passes between band and tire any more.\n\nThe second change is the nose. wheels-13\'s cap stopped at 125 degrees, y 0.126 at x 1.778, and its own header charged the tire below 0.126 as exposed. The disc already runs to y 0.080; the cap now runs to 137 degrees so its bottom edge meets the disc\'s at y 0.080, and the tire below that is the contact strip and stays charged. At 137 degrees the cap\'s bottom is at x 1.704 and swings 71 mm at 14 degrees of lock, inboard to |z| 0.594 against body-13\'s venturi floor edge at 0.580, which is 14 mm, the nearest thing on the nose to a conflict and named as such.\n\nThe third is the crown edge. wheels-13 held the band\'s inboard edge at |z| 0.700 over the crown and tapered to 0.720 by 50 degrees, reasoning from the swing of a point 0.306 m off the kingpin plane. A point at the crown swings nothing. Over the 42 degrees each side of the top where the edge at the tire\'s face 0.6725 swings 14 mm or less at full lock (the flank is at 0.600), the edge now sits at the face, and it tapers to 0.700 by 50 degrees and to wheels-13\'s nose and tail edges from 58. What that buys in the projection is the inboard 27.5 mm of the tread between y 0.66 and the crown, a few square centimeters a wheel, at no cost in area because the tire is already in the union there; what it costs is that the band\'s edge now rides 14 mm from the flank at one lock angle where it rode 46. The disc follows the band to r 0.373 and loses 13 percent of its area; the plane at 0.8255, the floor at 0.080 and the 4 mm laminate carry.\n\nTwo more things the sweep found, both wheels-13\'s and both closed here. Swept about the axle plane at 14 degrees of lock against every gen13 module, the disc\'s trailing-lower quadrant swings 91 mm inboard into |z| 0.72 to 0.78 and, at r 0.400, 18 mm past the end face of battery-11\'s sill at x 1.080; wheels-13\'s envelope looked for the body there and found nothing, and the sill is the pack\'s. At r 0.377 the same quadrant stops 4 mm short, and this disc is notched below y 0.53 to end at x 1.115, the tire\'s own trailing edge at those heights, which is 24 mm clear at full lock and costs the disc a 20 mm sliver of overlap the projection never saw. And the band\'s tail tip, at 0.690 inboard, sat 3.6 mm from hv-11\'s spine at full lock plus full rebound where the spine runs forward past the wheel at |z| about 0.61; the tail edge is 0.715 now and the tip stays 17 mm clear of the spine there.\n\nMass, derived as before: 0.402 m2 of disc and 0.175 of band at 3.5 kg/m2 is 2.02 kg, a 0.30 m leg at r 0.011 with its foot and clip 0.44, fixings 0.20, 2.66 a corner and 5.3 the pair against 5.8. The corner\'s unsprung mass is 23.7 kg against 24.',
      why: 'Because the rear saddle showed the front pant what it did not need. Every one of wheels-13\'s three larger numbers, the 45 mm crown standoff, the 0.126 nose floor and the 0.700 crown edge, was set by a part the pant carried rather than by the tire it covers: the arm, the disc\'s floor it never reached, the swing of a point that is not on the crown. A fairing that rides with its wheel has a constant gap to its tire, and the gap should be the tire\'s growth and a stone, not the bracket\'s path. 18 mm everywhere is the honest number and both axles now carry it.',
      fail: [
        'The pant is in the wind at lock, carried from wheels-13 unfixed: the disc presents its face 14 degrees to the stream and the band\'s ends swing 95 mm; at the 10 degrees a fast lane change needs it is a yawing moment on the upright the steering has to hold, and nothing in this project models an unsteady side load on a steered fairing.',
        'The band is 18 mm over A tire that grows, and now the band is the tightest thing rather than an arm. Radial growth at speed and a flat-spotted cold casing both eat that gap from below, and a stone between band and tread has 18 mm to lodge in at the crown. Aptera-class pants run similar gaps and run them with a liner; this one has no liner drawn.',
        'The nose rides 14 mm from the VENTURI floor edge at full lock on the inboard swing, measured against body-13\'s built floor at |z| 0.580 and y 0.10 to 0.14. It is clear at rest and at every lock short of full, and the arch is not the limit; the floor is. A nose that stopped at 125 degrees had 46 mm there, and this module trades 32 of them for 0.012 m2 of tire.',
        'Unsprung mass, 2.66 kg a corner, a tenth of a kilogram lighter than wheels-13 and still all at r 0.37 on a part that steers. suspension-9\'s active dampers were tuned on the lighter corner; the ride penalty is real and unmeasured here.',
      ],
      explode: [0, 0, 1.25],
    },
    'center-house': {
      name: 'Center wheel house skirt',
      tagline: 'The saddle pair\'s successor is a skirt and nothing else, because the union already owns everything above the pack line and this file does not pay for decals.',
      mass: 1.4,
      count: 1,
      specs: [
        ['Ancestors', 'wheels-20 rear saddles, 2.3 kg the pair: crown bands to 39 mm off the road on two corners this module deletes'],
        ['Skirt', 'a plan-wrap band around the tire, 4 mm carbon sandwich: sides at |z| 0.0875 (10 mm off the 155\'s faces), nose and tail arcs 10 mm off the tread\'s swept silhouette, from y 0.039 up to 0.130'],
        ['Why it stops at 0.130', 'the pack floor\'s y 0.1025 scanline spans |z| 0.70 for most of the wheelbase, so the union covers the tire above it from any x at all; 27.5 mm of overlap is margin, everything higher would be a decal'],
        ['Floor', 'y 0.039, the tire\'s 20 to 25 mm deflection budget plus margin, the Gen 20 rule at the Gen 20 number'],
        ['Legs', 'two aluminum legs off the skirt\'s side bands to feet bolted up into the arms\' undersides on y 0.3270, asymmetric in x (-1.28 and -1.22) to clear the spring and the damper; the skirt rides the fork, so travel never moves the floor'],
        ['Union price', 'measured +0.0040 m2 on the built module against body-20 (the draft\'s 185 read +0.0078): the skirt and tire\'s silhouette below the pack line, less the slivers the body\'s floor edges already spanned; the center band was empty in gen20\'s union'],
        ['Mass', '0.17 m2 of wrap at 3.5 kg/m2 is 0.60 kg; legs, feet, stiffening lips and fixings 0.80: 1.4, unsprung'],
        ['Maturity', 'Production practice; a fender on a trike\'s center wheel is the oldest fairing there is'],
      ],
      how: 'The drawing is the decomposition, run before a line was cut. What does a centered rear wheel show the air that the car does not already cover? The frontal union collapses x: any surface anywhere in x that spans a (y, z) cell covers that cell for the whole car. At |z| under 0.70 the pack floor spans y 0.1025 and up for most of the wheelbase, the pack body and the tail span everything above that, so the tire\'s crown, flanks and shoulders are inside the union from the pack\'s own scanline and contribute nothing. What is outside is one band: ground to y 0.1025, tire width, 0.155 by 0.0635, about 0.0098 m2 of naked rotating silhouette, plus the strip below any skirt\'s floor. So the house is a skirt across exactly that band and no more: sides 10 mm off the faces at |z| 0.1025, arcs 10 mm off the tread\'s swept silhouette at the nose and tail, floor at 0.039 where the deflection budget rules, top at 0.130 so it overlaps the pack line by 27.5 mm of margin. The exposed remainder measures 0.0055 m2 on the built module (the 0.155 by 0.039 estimate says 0.0060), and the rear wheel term goes from Gen 20\'s 0.0262 to that figure.\n\nWhat the skirt costs the union was estimated at +0.0013 and measured at +0.0040 on the shipped 155 (+0.0078 on the draft\'s 185), and the difference is a lesson worth the ink: the estimate netted the skirt against the tire strip it hides, but gen20\'s union never contained a center tire to net against, so the whole skirt-and-strip band below the pack line is new area less only the slivers the body\'s floor edges already spanned. The exposure ledger pays for it many times over: the union price at the car\'s Cd against 0.0196 of rotating silhouette retired at the wheel coefficient, and the 155 that replaced the draft\'s 185 narrowed the whole band 30 mm. The alternative drawn first and rejected was saddle-style side discs 18 mm off the faces running to the crown: below the pack line a full-depth wall books about 0.0145 m2 of new union, ten times the skirt for the same exposure floor, and above the pack line every square centimeter of it is a decal. The fill convention charges what nothing else spans; here almost everything is already spanned, which no corner wheel ever enjoyed, and the drawing is smaller because the measurement said so.\n\nThe mount is the fork, because the doctrine holds: every fairing since wheels-11 rides the unsprung side so its gap to the tire is constant by construction. Two legs leave the skirt\'s side bands and bolt up into the arms\' own undersides on y 0.3270, declared as center-house-foot, asymmetric in x because the spring owns one flank and the damper the other; two earlier mounts (down the axle plane, then down the plate line) met the spindle and the perch, and the checker retired both; the skirt travels with the wheel, the 39 mm floor never moves relative to the patch, and there is no lock and no rear steer to swing anything, which retires the whole class of envelope retreats the saddles bought at Gen 20 (the taper for the wall, the step for the disconnect, the early ends for droop: none of them has a partner any more).\n\nMass, derived: the wrap\'s perimeter is about 1.87 m (plan footprint 0.73 by 0.205, rounded arcs) by 0.091 m of height, 0.17 m2, 0.60 kg at the pants\' own 3.5 kg/m2 sandwich; two legs, two feet, a stiffening lip top and bottom and fixings, 0.80. 1.4 kg, unsprung, on the corner whose unsprung mass this rung cut by a wheel.',
      why: 'Because Gen 20\'s two hardest lessons, applied in advance, cancel most of the part. A background shields only what it overlaps or encloses; the fill convention charges enclosed air. At the deleted corners those rules cost four measured retreats and priced every reach. At the center they mostly pay the other way: the pack and the tail overlap nearly the whole wheel in the projection already, so the shield exists before this part is drawn, and the only honest geometry left is the strip below the pack line. A part that drew more would be claiming work the union never asked of it.',
      fail: [
        'The skirt floor is consumable by design, the Gen 20 sentence at the Gen 20 number: curbs, ramps and deep snow meet 39 mm of sacrificial laminate with a rub strip, and the floor never moves with travel, only with tire squash.',
        'A stone between skirt and tread has 10 mm to lodge in around the whole plan wrap, and no liner is drawn; the front pants carry the same sentence at their 18.',
        'The union argument leans on the pack floor\'s y 0.1025 scanline. If a future pack raises its floor or shortens its x-span past the rear axle, the tire\'s flanks come out from behind the union and this part is suddenly too small; the dependency is named here so that rung finds it in writing.',
        'Spray. Two corner wheels threw water at the walls that faired them; a center wheel throws it up the diffuser\'s twin channels. The skirt\'s trailing arc is the only mitigation drawn and nothing in this project models it.',
      ],
      explode: [0, 0.6, 0],
    },
    'rear-wheels': {
      name: 'Structural center wheel',
      tagline: 'One wheel where the pair stood, and it is the pair\'s own drawing to the vertex: the 4.5J barrel carried whole to the centerline, the contract flange at z -0.0900 exactly where its locals always put it.',
      mass: 6.6,
      count: 1,
      specs: [
        ['Wheel center', '(-1.45, 0.355, 0); centered, no track to have'],
        ['Size', '20 x 4.5J, the pair\'s barrel carried; the 155 sits on it inside its approved band'],
        ['Flange face', 'z -0.0900 exactly, out to r 0.2440; the contract plane for drivetrain-21\'s single ring'],
        ['Motor annulus', 'r 0.155 to 0.235 over z -0.090 to -0.010, void; one band, one side'],
        ['Rim planes', 'flange lips z -0.06365 / +0.06365, seats -0.05715 / +0.05715, carried'],
        ['Uprating', 'the spoke web sized for 520 kg static and 572 at power-on, one wheel\'s duty where two shared it: 6.6 kg against the pair\'s 6.0 each'],
        ['Maturity', 'Pilot line; the co-cured titanium flange stays extrapolated'],
      ],
      how: 'Gen 21: the drawing is wheels-10\'s rear wheel moved to the centerline and asked to be one wheel instead of two, and almost nothing else: a first draft widened the barrel to 6.0J for a 185 that the load arithmetic then rejected as over-tired, and the 155 that ships sits on the pair\'s own 4.5J inside its approved band, so the barrel, seats, humps, well and flange carry to the vertex. The contract survives the move because it was always written in the wheel\'s own local frame: the flange face at local -0.0900 with its radii 0.1500 and 0.2440, the titanium ring at -0.0940 to -0.0900, the twelve bolts at -0.0979, the hub pilot and clamp web outboard of the annulus, and at a wheel center of z 0 those locals are, exactly, the world coordinates. The one change is the spoke web, sized for 520 kg of laden static where each of the pair carried 260: 6.6 kg against 6.0, derived from the load ratio at constant stress rather than asserted.\n\nWhat follows is the carried record of the pair this drawing descends from, wheels-10\'s panel with its measurements intact; its |z| coordinates describe corners at 0.72 that no longer exist, and its four-generation valve finding is inherited whole (the valve is on the outboard well side, under the cover\'s door, exactly as it landed there in Gen 10).\n\nCarried whole from wheels-10, verified at 1e-6 m rather than asserted. All 20,336 rear-wheel vertices compare identical to wheels-10\'s, and the rear annulus band was re-swept on the Gen 11 build anyway: zero wheels-11 vertices inside r 0.155 to 0.235 over |z| 0.65 to 0.73. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means gen 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nThe contract survived A rim narrowing and that is this panel\'s deliverable. The rear annulus contract reserves r 0.155 to 0.235 over |z| 0.65 to 0.73 for drivetrain-9\'s in-wheel motor, and pulling both bead seats 6.35 mm outboard moves six profile points into the axial span the contract covers, which is the direction that could break it. It does not, and the check was run rather than argued: sweeping every vertex of this module against the rear wheel center (-1.45, 0.355, 0.74), zero vertices fall inside the band. The smallest radius among the six points the narrowing moved into the band\'s axial span is the bead seat\'s well end at 0.2519, 16.9 mm clear of the 0.235 ceiling, and the tightest approach anywhere in the band is unchanged from wheels-7, wheels-9 and this module alike: r 0.2480 on the drop-well floor at |z| 0.7220, 13.0 mm clear. The flange face is still at local -0.0900, its outer edge is still r 0.2440, and drivetrain-9\'s rotor rings still bolt to it face to face.\n\nThe valve, which this wheel has never had, and which is A four-generation defect. wheels-3, wheels-6, wheels-7 and wheels-9 all draw a valve through the front well floor and none in the rear wheel, while drawing one cover part with one service door and fitting it to all four corners. So two of the four covers on this car have carried a service door opening onto solid carbon, and the rear tires have had no way to be inflated. It is the same class of defect this file has caught three times before, a fastener seated inside the part it bolts to, a lattice behind a solid panel, a backing plate with no window in front of it: geometry and the story about it disagreeing where nobody checks.\n\nIt goes on the outboard side of the drop well at local +0.0060, not the inboard side the front uses, and the reason is measured. drivetrain-9\'s rotor rings reach |z| 0.7280 and its hub bearings 0.7290. An inboard valve at local -0.0060 puts the stem at |z| 0.7298 to 0.7382, which is 1.8 mm off the rotor rings; the outboard placement puts the built stem at 0.7420 to 0.7500 and stands the whole valve 12.80 mm off those rings measured surface to surface, segment to segment and vertex to triangle over both triangle sets. The convention matters on this number too: 13.8 mm is the axial difference and the closest approach is diagonal, so the axial figure overstates the gap by a millimeter exactly the way a nearest-vertex reading overstated the pack clearances on the discs panel. It is clocked to the same 54 degrees as the front so it lands between two spokes and under the cover\'s door, and the spoke half-width at that radius subtends 3.7 degrees against the 18 it has on either side.\n\nAnd it is A clamp-in rather than A snap-in, on both axles, because of the pressure. A snap-in valve is a rubber body retained by its own interference in the rim bore and the industry rating on it stops around 4.5 bar; this tire runs 5.6. The part that goes in a hole at 5.6 bar is a brass stem through a sealing grommet, pulled down onto the outside of the rim by a hex nut, with a screwed metal cap that is a second seal rather than a dust cover. Three pieces are drawn and the grommet is not, because it is compressed inside the rim bore where no part of it can be a first hit: an orthographic first-hit sweep of 216 upper-hemisphere directions at 1.11 mm per pixel, run over this corner with the module alone and the cover on, returns 4,765 first-hit pixels for the stem, 3,564 for the cap and 1,562 for the nut, and would return zero for a grommet. Read the scene on that sentence: module alone. In the assembled Gen 10 car the fairing takes all three to zero, and the module header says so. wheels-9\'s own pass deleted a caliper backing plate, a banjo bolt and six pistons on exactly that test.\n\nThe rest of the drawing is wheels-7\'s and unchanged in every coordinate. Twelve flange bolts on the r 0.225 circle seating on the inboard face of a 2 mm co-cured titanium ring that runs |z| 0.646 to 0.650, so they bear on metal; the ring owning the whole flange face from r 0.1500 out to 0.2440 on its own; a hub pilot at r 0.0605 to 0.072 over |z| 0.730 to 0.756 with a lead-in chamfer, closed outboard by a clamp web whose five nuts sit at 0.7376 to 0.7471. The drop well is 6 mm deep against the front wheel\'s 24, because a 0.230 floor would put carbon inside the annulus at |z| 0.722, and that remains a shop-equipment consequence of putting a motor inside a wheel.',
      why: 'A contract is worth proving rather than asserting, and the failure mode here is silent. Nothing about the rear corner\'s purpose changed this generation, so a drift would have to arrive through a shared constant or through a partner moving, and both have happened on this ladder. This generation did something more dangerous than either: it moved the rear wheel\'s own geometry, for a reason that has nothing to do with the contract, in the one axis the contract is written in. Six points crossed into the band\'s axial span and every one of them had to be re-swept. That is exactly the case where a module carries forward a sentence it has stopped being entitled to.\n\nThe valve is the other half of the same argument. Nobody noticed for four generations that a cover part fitted to four corners was opening onto two valves, because no tool asks whether a service access reaches the thing it services. What found it was drawing the rim and asking what a 5.6 bar tire needs at the hole.',
      fail: [
        'The co-cured titanium flange is still the extrapolated claim, unchanged since wheels-6 and unchanged here. What must become true: a titanium-to-CFRP co-cure holding bolt preload through a design life of drive-to-regen torque reversals at hub temperature and salt exposure, with no delamination signature. Rigs show it, fleets close it, and until then the joint is inspected at every tire change.',
        'The contract is 99.6 percent clean rather than clean, and that has not moved. suspension-9 still puts 13 vertices inside the annulus band, 48 V cable at r 0.1657 and |z| 0.7100, in a volume reserved for a motor. wheels-9 inherited that from wheels-7 and reported it; this module re-swept it and confirms it unchanged. tools/check-interfaces.sh reports the whole band as 302 non-drivetrain vertices on the Gen 9 preset and 302 on the same preset with this module swapped in as the only change, to the vertex and part for part, so nothing about the rim narrowing touched it either way. On the full Gen 10 preset it reads 284, and the 18 that leave are autonomy-4/ring, which autonomy-10 does not have. That is worth separating rather than quoting one number for both: the wheels-only swap is the comparison that tests this module, and the preset figure is the one a reader will see on the rail. It is reported here because this module owns the wheel side of that band and nobody else sweeps it.',
        'A 4.5J rear rim at 5.6 bar changes the duty on a flange nobody re-validated. The 13 mm annulus margin, the 0.5 mm pilot fit and the 12-bolt flange were sized against drivetrain-7 as built and carried through wheels-9, and the load path into them now arrives through a casing that is 41 percent stiffer vertically and 20 mm narrower. The bolts are the same, the ring is the same, and the impact loads reaching them through a stiffer tire are not. Nothing in this module models that, and nothing in the suspension slot is open this generation to catch it.',
        'The rear valve is 104 triangles and three meshes A corner that the static car never shows, and the module header carries the measurement rather than leaving it to a reviewer. Orthographic first-hit, 216 upper-hemisphere directions at 1.11 mm per pixel: with the cover on it wins seven pixels over three directions, which is a sampler catching a sliver and not visibility, and inside the assembled Gen 10 car it wins three. It is 7,957 pixels once the cover leaves, which the staged explode does at 120 mm of relative travel here. So this part is justified by packaging and by the service door that has opened onto solid carbon for four generations, and not by the silhouette. 1,405 pixels with the cover on does not reproduce on the hemisphere the header declares. The honest position is that a tire at 5.6 bar needs a valve at every corner and this one is paid for out of the explode view.',
        'The valve is drawn and the pressure monitoring is not. A car running 5.6 bar on a casing whose load capacity depends on that pressure needs a direct sensor per corner, and the only pressure telemetry on this vehicle is inferred from hv-4\'s wheel-speed comparison, which resolves a slow leak in tens of kilometers rather than in seconds. wheels-9 could afford that at 4.4 bar with 78 kg of load-index deficit already on the books. At 5.6 bar with 6.7 kg of margin, a corner that drops half a bar is over its rating before the driver is told. That is an hv or an autonomy item and it is named here because this is the module that made it urgent.',
      ],
      explode: [0, 0, 0.78],
    },
    covers: {
      name: 'Full-face covers',
      tagline: 'Three covers, two dishes: the front follows its 3.5J seat and 125 lip inboard, the center keeps the pair\'s dish with its flare retargeted to the 155, and the front lip is still the outermost surface on the car.',
      mass: 4.5,
      count: 3,
      specs: [
        ['Type', 'Full-face CFRP disc, flush to the tire section, no moving parts'],
        ['Extent', 'r 0.048 inlet bore to r 0.312, seated on the rim flange lip'],
        ['Mass', '1.5 kg each, three of them; the drawing scales, the areal mass carries'],
        ['Front lip', '|z| 0.7790, 1.5 mm proud of the 125\'s built face at 0.7775: the outermost surface on the car'],
        ['Center lip', 'z +0.0790, 1.5 mm proud of the 155\'s face; one cover, outboard well side, over the valve'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Gen 21: one part becomes two drawings and one of the four leaves. The front dish follows both of its masters the way this part always has: the seat follows the rim (3.5J re-offset: flange lip at local 0.04595) and the lip follows the tire (125: local 0.0590, world 0.7790, still 1.5 mm proud of the built section maximum and still the outermost surface on the car, which keeps this part the one the area integral reads at those heights). The center wheel takes one cover on its +z well side, where its valve and service door live; the -z side carries the ring flange and the drum and has never worn a cover on any rung. Its dish is the pair\'s own drawing on the carried 4.5J seat at 0.06365, with only the flare retargeted: lip at 0.0790 over the 155\'s face. The fourth cover leaves with the deleted wheel.\n\nWhat follows is the carried record of the one-drawing-four-corners part this descends from.\n\nCarried whole from wheels-10, verified at 1e-6 m rather than asserted. All 25,804 cover vertices compare identical to wheels-10\'s, so the lip is still the outermost surface on the car at |z| 0.8090. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means gen 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nThis part changed by two numbers and they are not the same number, which is the whole content of the panel. The flange seat follows the rim, so it comes in 6.35 mm to local 0.06365. The outer lip follows the tire, so it comes in 10.0 mm to local 0.0690, which is world |z| 0.8090. The dish between them is therefore 3.7 mm shallower than wheels-9\'s, and every radius on it is wheels-7\'s untouched: the r 0.048 inlet throat, the bell mouth flaring to 0.062, the hub service recess, the riser, the 12 mm bayonet land recessed 1.5 mm, the r 0.2665 flange seat and the r 0.312 outer lip with its 1.1 mm rolled edge.\n\nThis part owns the outer edge of the car at both axles and it is worth saying which surface that is. The cover lip stands 1.5 mm proud of the tire section maximum, so at |z| 0.8090 it is the outermost surface of the whole corner, front and rear, exactly as it was at 0.8190. Frontal area is decided at the outermost surface, which makes the cover and not the tire the part the integral actually reads at those heights. The 1.5 mm is measured against the built section maximum rather than taken from the tire panel\'s prose, because a cover sized off a sentence is how a lip ends up 11.5 mm proud of a tire that got narrower.\n\nWhat the narrowing is worth in area, and the honest limits on the figure. One integrator, the same frontalArea in tools/silhouette.js that design/area-rezero.md re-zeroed the whole ladder on, run over both modules at 0.1 mm scanlines. This module\'s own built shadow falls from 0.307129 m2 to 0.289800, so 0.017329. 0.289800 is what the integrator returns; 0.289793 and 0.017336 are seven square millimeters off it, and a file that carries both disagrees with itself. On wheels-9\'s own published tire-column convention, twice the tire band times 0.28, the columns fall from 0.0868 to 0.0756, so 0.0112, and that convention reproduces wheels-9\'s published 0.0868 to the digit.\n\nNeither of those is what the car gets, and the difference matters more than the numbers. Frontal area is a union over body, wheels and pack, and battery-7\'s rocker rails already stand at |z| 0.7800 in the band this tire occupies, so most of what the tire gives back was already in somebody else\'s shadow. Run the union with body-9 and a pack and it goes 2.097783 m2 to 2.090612 on battery-7, and 2.096910 to 2.089740 on battery-10 as that module stood when this was last re-swept. Three things in those four numbers, and only one of them is safe to quote.\n\nThe 2.097783 reproduces the area table\'s Gen 9 cell exactly, which is the check that says the integrator here is the shipped one. The delta is invariant to the pack, 0.007171 on battery-7 and 0.007170 on battery-10, so what this module buys is 0.00717 m2 whichever pack it is measured behind, and priced through computeBudget at gen 10\'s own operating point rather than at Gen 9\'s marginal rate it is 2.08 miles and not the 1.87 that rate gives. Quoting the Gen 9 rate for a Gen 10 gain is the convention drift design/gen10.md hard point 1 exists to stop.\n\nThe battery-10 column is not stable and must not be quoted at all. An earlier build of that module put it at 2.097789 and 2.090618, six square millimeters above battery-7 rather than 873 below, and this panel concluded from that pair that the pack notch was worth nothing in shadow because everything it removed stood behind a rocker rail. That conclusion was about a pack that no longer exists, and it is exactly design/retro-gen9.md\'s "a module written before its partner lands will measure against the wrong partner" turning up in the area integral rather than in a clearance. The pack has been rewritten under this measurement twice, and each time it was the two cells moved by about 0.00088 m2, which is a hundred and fifty times the number the old draft published. Note also that the sign depends on whether the wheels are in the union: body-9 with battery-10 alone is 0.000348 m2 larger than body-9 with battery-7, and only once the tire columns are added does the pack read smaller. A union does not decompose, which is the second reason these cells belong to one sweep run after every module has landed and not to this panel.\n\nNone of those four figures is the gen 10 area cell and none may be pasted into one. They are four cells of a 56-cell table measured by one process on one afternoon, and the table is only sound when every cell in it comes out of the same sweep after every module has landed. design/gen10.md hard point 2 and design/area-rezero.md standing rule 2 both say the same thing: Area is regenerated once, by the integrator, after every module in the generation has landed, because a sweep run between two of them produces a complete, self-consistent, wrong table that the guard passes. Nothing in this module edits a cell and nobody should run the sweep on its account.',
      why: 'The interesting property of this part is that it demonstrates the difference between following the rim and following the tire, and that a part which changed by two different amounts in two places is the one most likely to be drawn wrong.\n\nIt also does the thing wheels-9 said it did: it is the rim protector. The outboard sidewall of the tire carries no relief at all, no legend and no rib, because this dish runs 2 to 6 mm off it across every radius and takes 100 percent of the first hits from r 0.048 to 0.312 in an orthographic ray grid. Narrowing the tire and flattening the dish did not change that relationship, and it was re-measured rather than assumed: the cover\'s underside and the tire\'s outboard sidewall interpenetrate only where the elastomer seal is designed to squeeze them together, at 2.58 mm on both rungs to the hundredth, which is the same seal squeeze wheels-9 built.',
      fail: [
        'A full cover is a full cover in a curb strike, unchanged from wheels-7: the dish stands proud of the tire section at its outer edge, which is the first thing a curb touches, and a cracked cover is a whole cover. What changed is that the whole corner came in 10 mm, so where wheels-9 put the lip 41.8 mm from body-9\'s fairing this module measures 50.16 mm surface to surface. Ten millimeters of hand and tool access came back at the bayonet ring, against the 50 mm wheels-9 spent. That is a service improvement and it is worth exactly what it sounds like.',
        'The brake air path is scheduled by a louver this module does not own and nobody has re-derived it across two generations now. body-9 moved the arch louver bank to |z| 0.8750 to 0.9164 across y 0.580 to 0.733 and nobody re-derived the flow. This module then moved the cover\'s exhaust slot 10 mm inboard and 6.4 mm in the dish, into a pressure field that has now moved twice with no measurement behind either move. The 188 m3/h on the discs panel is a pumped figure for the disc, not a measured exhaust. Measured surface to surface, the gap from this cover to those louvers goes 72.40 mm to 82.39, so the exhaust has further to travel into a region nobody has characterized.',
        'The rear cover still rides the 0.90 explode vector rather than the corner\'s 0.78, matching drivetrain-9\'s rotor rings, exactly as wheels-3, wheels-6, wheels-7 and wheels-9 all disclosed. The cover cannot come off with the motor ring in place, so a cover service is a corner service. What is new is that the service behind that cover is no longer hypothetical at the rear: the rear wheel now has a valve, so somebody will actually open the rear door, and it is the door on the corner that needs the whole assembly apart.',
        'One part number for four corners is still the right call and it is now doing slightly more work. Both axles run the same rim, the same section, the same pressure and the same lip plane, so the cover is genuinely identical at all four corners in a way it has not been since Gen 5. The cost is that any change to it changes all four, and the front pair sits in a steered envelope while the rear pair does not.',
      ],
      explode: [0, 0, 1.45],
    },
    discs: {
      name: 'Front brake discs',
      tagline: 'Carried whole, re-derived anyway, and the panel where the front corner declares its plane to the pack and then says what the plane does not cover.',
      mass: 7,
      count: 2,
      specs: [
        ['Size', '365 x 30 mm vented C/SiC, carried whole from wheels-9'],
        ['Continuous case', '13.66 kW per disc re-derived (wheels-9: 13.67 on one method)'],
        ['Thermal mass', 'About 3,000 J/K, carried'],
        ['Ring planes', '|z| 0.604 to 0.634, unmoved, and this is the pack problem'],
        ['Pack corner', 'Declared at |z| 0.6625; the ring needs a further local bite'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Carried whole from wheels-10, verified at 1e-6 m rather than asserted. All 20,104 disc vertices compare identical to wheels-10\'s. The steered-lock table below was measured against battery-10 and is not re-measured against battery-11 here; design/gen11.md section 9 item 6 inherits that foul explicitly. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means gen 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nThe disc is carried whole and the sizing case was re-derived rather than copied, which is how you find out whether anything moved. One model over both rungs: a 10 percent grade at 60 km/h on the preset laden mass, gravity power less rolling at the booked Crr less aero at Cd 0.108 on the measured area. Gen 9 at 1,787.58 kg gives 29.08 kW of gravity, 1.11 of rolling and 0.63 of aero, leaving 27.34 kW of friction and 13.67 per front disc. Gen 10 at 1,786.58 kg gives 29.07, 1.11, 0.63, 27.33 and 13.66. Ten watts. The ring, the 36 curved vanes in the 18 mm passage, the 3,000 J/K, the 740 to 800 C steady descent and the 3.5 mm to suspension-9\'s upper front ball joint are all wheels-9\'s and all unchanged, and translating nothing cannot change a radius.\n\nNote which way the Crr decision pushed that. Had this module booked 0.0034 the rolling term would fall to 0.99 kW and the disc would take 13.72 instead, because on a descent every watt the tire stops absorbing is a watt the friction brake absorbs instead. Refusing the count is worth 60 watts to this part, which is nothing and is the right sign, and it is the only place in the module where the two decisions touch.\n\nThe pack corner, which is this panel\'s real subject, and battery-10 has landed so it is measured against the partner that shipped. wheels-9 published three pack clearances here that a reviewer showed do not exist, because the surfaces interpenetrate, and HANDOFF.md records the correction. This panel does not publish a clearance across an intersection. It publishes the penetration, the interface plane, the clearance where there is one, and what none of that covers.\n\nFour sweeps, one predicate, tools/check-interfaces.sh\'s own at its own 0.005 mm tolerance, static:\n\n    wheels-9  x battery-7    5 part pairs   804 crossings   deepest 21.40 mm\n    wheels-10 x battery-7    5 part pairs   676 crossings   deepest 21.40 mm\n    wheels-9  x battery-10   0 part pairs     0 crossings\n    wheels-10 x battery-10   0 part pairs     0 crossings\n\nThe static corner is closed. battery-10 cut it and the notch is generous enough that it would have cleared wheels-9 too, which is the honest reading of that third row and is worth printing rather than letting this module take credit for the pack\'s work. What the narrowing contributed is the middle row: 128 crossing triangle pairs and 1.38 mm off the deepest gallery crossing against the old pack, and 10 mm of inner sidewall handed to the new one before it drew anything.\n\nThe clearances that exist now, measured surface to surface against battery-10 as built, segment to segment and vertex to triangle over both triangle sets rather than nearest vertex. The method is checked before it is used: run over wheels-9 against battery-7 it returns the 4.38 mm rim-to-galleries figure HANDOFF.md publishes, to the hundredth, and 4.38 is itself a correction of a 5.79 mm nearest-vertex reading.\n\n    disc ring to floor lid      10.00 mm   near (1.2904, 0.2974, 0.6040)\n    tire to floor lid           10.73 mm   near (1.1076, 0.2792, 0.6878)\n    wheel flange to floor lid   21.35 mm   near (1.1907, 0.2999, 0.6767)\n    caliper to floor lid        33.06 mm   near (1.2559, 0.3355, 0.6289)\n\nTwo of those four rows first shipped as 9.77 and 33.30 and this is why they moved. battery-10 was written alongside this module and changed on disk after the first sweep, so those two rows were measured against a pack that no longer exists. That is design/retro-gen9.md\'s "a module written before its partner lands will measure against the wrong partner", live, inside the one generation whose hard point 6 says the pack and the wheels are one decision. The two rows that did not move, 10.73 and 21.35, are the tire and the wheel flange, and they did not move because the notch face they read is the one the declared interface pins. The rows that moved are the two the interface does not reach. Anyone re-running this table after battery-10 changes again should expect the same two rows to be the ones that move, and the interface is the reason.\n\nThe first row is still the one to read. battery-10 did not stop at the declared plane and go home: it cut past it to |z| 0.6550 across x 1.09 to 1.30 on lid, gallery, strike shield and its own corner closeout, so the disc ring at 0.6040 to 0.6340, which the declared plane does not reach at all, clears by 10.00 mm, tying against the lid and against the corner closeout at the same vertex. The 26 by 56 by 30 mm bite this panel was going to have to ask for is already gone.\n\nThe interface, declared, and exactly what it asserts. SYSTEM.interfaces carries front-corner-pack-outboard at |z| 0.6625, mirrored, realized by the tire with extent min. The derivation is one line off this module\'s built mesh: the tire\'s section maximum is a real vertex ring at 0.6725, and the plane is that ring less a 10.0 mm running clearance. It also leaves 12.5 mm over the cell stack, which sits at |z| 0.6500 on both packs, so a notch that lands on this plane takes lid, strike shield and cooling gallery and no cells. battery-10 declares the same key at the same 0.6625 with extent max, and it did not land on the plane: its corner closeout stops at 0.6550, 7.5 mm inside the declared plane and 5.0 mm off its own cells, which measure |z| 0.6500 in the fouled x band 1.09 to 1.30 on both packs, and that is why the disc clears. The checker reports the key met with two modules agreeing, this module\'s nearest tire vertex 10.0 mm off inside an 11 mm tolerance and the pack\'s nearest closeout vertex 7.5 mm off inside 8.\n\nAnd here is what none of it covers, published on the same panel so nobody has to find it. tools/check-interfaces.sh sweeps static geometry. The front wheels steer.\n\nRe-running the identical predicate with the front corner rotated about the vertical axis through (1.45, 0.74), one method over both wheels and both packs:\n\n    lock      wheels-9 x battery-10        wheels-10 x battery-10\n    0.0 deg    clean                        clean\n    1.0        clean                        clean\n    1.5        2 pairs, 40 crossings        clean\n    3.0        5 pairs, 745                 clean\n    3.5        9 pairs, 1,061               4 pairs, 73 crossings\n    4.0       10 pairs, 1,280               4 pairs, 159\n    8.0       10 pairs, 2,250              10 pairs, 1,961\n   14.0       10 pairs, 2,801              10 pairs, 2,607, deepest 21.40 mm\n\nSo the contained lock at this corner is 3.0 degrees and the rack commands 14. The narrowing buys exactly two degrees of it, from 1.0 to 3.0, and that is the honest size of what a tire section can do here. Beyond three degrees the front tire sweeps through the pack\'s forward outboard corner, and by fourteen it is 21.40 mm into the floor lid over ten part pairs and 2,607 crossing triangle pairs.\n\nThree things about that. It is inherited: Gen 9 bought 0.1136 m2 of frontal area by bringing the front track to |z| 0.74, and this is the rest of the invoice, arriving at a corner where the pack runs to x 1.29 and the axle sits at 1.45. It is the same shape of defect design/retro-gen9.md records against body-8, which claimed 17.25 degrees of contained lock and fouled at 3.11 when somebody finally swept it. And neither module CAN fix it: the pack cannot cut to |z| 0.5770 without taking cells that sit at 0.6500, and the wheel cannot leave, because no tire section reaches the plane and the disc ring is pinned outboard by the wheel spokes at |z| 0.706 and inboard by the caliper it straddles. It wants the pack to stop further forward than x 1.29 or the front track to go back out, and both of those are generation-scale.',
      why: 'A clearance is between two surfaces and a penetration is a different measurement, and this panel is where this project learned the difference the hard way. wheels-9 published 2.8 mm to the strike shield, 6.2 mm to the galleries and a 19 mm repair to the lid, and all three were nearest-vertex readings taken across an intersection. The correction then shipped with the same drift inside it, quoting 5.79 mm for a gap that is 4.38 because the closest approach lands on a triangle edge where no vertex sits.\n\nSo this panel states the convention on every number. Penetrations are plane-straddle depth at 0.005 mm, from tools/check-interfaces.sh\'s own predicate, which reproduces every published wheels-9 figure to the digit before it was used on anything new. Clearances are true surface separation, segment to segment and vertex to triangle over both triangle sets, which reproduces the corrected 4.38 mm to the hundredth. The two conventions are never mixed in one sentence.\n\nThe steered sweep is on this panel rather than in a footnote because a declared interface is a plane and the thing it has to protect is a swept volume. A module that declares the plane and stops has told the truth and left out the part that decides whether the corner is fixable. design/gen10.md hard point 3 asks for the plane. It also says a false declaration is worse than a red check, and a plane published as though it were the whole requirement would be one.',
      fail: [
        'The static corner is closed and the steered corner is not, and the second one is the bigger of the two. Zero crossings at rest against battery-10, ten part pairs and 2,607 crossings at the 14 degrees suspension-9\'s rack commands, contained to 3.0 degrees. tools/check-interfaces.sh will report the corner as clean on the Gen 10 preset and it is clean by everything that tool measures, which is exactly why this fail entry exists: a static checker going green on a steered corner is a false all-clear, and this file has been corrected once already for publishing a clearance that a different measurement did not support. Nothing about the pack check knows the wheels turn. The predicate that would catch it is the same one, run over a swept corner, and it is about forty lines.',
        'The pads are still the limiting component and the disc now runs hotter for a second reason. C/SiC handles 800 C and the organic and metallic binders in the pad do not; wheels-9 already put the descent at the top of the pad\'s friction window at 740 to 800 C. What is new is that the exhaust path behind this disc has moved twice with nobody re-deriving the flow: body-9 moved the arch louvers 150 mm up and 80 mm inboard, and this module then moved the cover\'s exhaust slot 10 mm in and 6.4 mm through the dish. 188 m3/h remains a pumped figure for the vane passage rather than a measured exhaust into a pressure field, and the 3,000 J/K ring has less margin to absorb a wrong schedule than wheels-7\'s 4,000 had.',
        'A narrower vane passage packs sooner, unchanged from wheels-9. An 18 mm passage reaches the debris-blocked state on less salt and dust than a 24 mm one, the symptom is a disc running 150 degrees hotter rather than a noise, and it starts from a ring already 100 degrees above where wheels-7 ran it.',
        'The wear sensor lead used to run through this disc and the tool that should have caught it does not exist. wheels-9\'s 2.6 mm lead crossed this part in 64 triangle pairs a side, 5.64 mm into the outboard friction plate, 4.32 mm through the ceramic band face and 0.96 mm through a vane, with its middle waypoint at radial 0.1545 and |z| 0.618, inside the ring band and inside the vane passage. SPEC.md leaves part pairs inside one module to tools/smoke.sh, and tools/smoke.sh checks metadata against geometry rather than geometry against itself, so nothing on this project sweeps a module against its own parts. The lead is rerouted on the calipers panel and this module now crosses its own discs in zero pairs, but the gap in the tooling is real and is worth more than the fix: an intra-module version of the cross-module predicate is about thirty lines and would have caught this at Gen 9.',
      ],
      explode: [0, 0, 0.45],
    },
    calipers: {
      name: 'Front calipers',
      tagline: 'Not one coordinate moved, and a 2.6 mm sensor lead that has run through the brake disc since wheels-6 comes out of it.',
      mass: 5,
      count: 2,
      specs: [
        ['Type', 'Fixed monobloc, 6 x 32 mm pistons, carried from wheels-6'],
        ['Clamp force', '38 kN per side at 160 bar, unchanged'],
        ['Torque available', '4.36 kNm per corner against the 1.29 a 0.714 g tire takes'],
        ['Straddle', 'Halves at |z| 0.5885 and 0.6495, unmoved'],
        ['Mass', '2.5 kg each, carried from wheels-9'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Carried whole from wheels-10, verified at 1e-6 m rather than asserted. All 6,758 caliper vertices compare identical to wheels-10\'s, including the rerouted wear sensor lead. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means gen 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nNot one coordinate of the caliper moved, and one 2.6 mm tube did. The casting, the six 32 mm pistons in three pairs, the titanium piston crowns, the rollback seals, the three bridges, the pads, the two-lug bracket reaching for suspension-9\'s upright at |z| 0.6475, the crossover boss and its banjo are all wheels-9\'s at wheels-9\'s coordinates. The corner did not translate this generation, so there was nothing for this part to follow.\n\nThe pad wear sensor lead was routed through the brake disc and that is A defect this module found on its own corner. Swept mesh by mesh inside the module with tools/check-interfaces.sh\'s own predicate at its own tolerance, wheels-9\'s lead crosses wheels-9/discs in 64 triangle pairs a side: 43 pairs 5.64 mm into the outboard friction plate, 9 pairs 4.32 mm through the ceramic band face, and 12 pairs 0.96 mm through a vane. Its second waypoint sits at radial 0.1545 and |z| 0.618, which is inside the ring\'s r 0.145 to 0.1825 band and inside the 18 mm vane passage between the plates. It is a cable threaded through a part that turns at 747 rpm and runs at 800 C on a descent.\n\nWhy nothing caught it. SPEC.md is explicit that part pairs inside one module are not tested by tools/check-interfaces.sh, on the correct grounds that two modules sharing a volume is a decision neither can make alone while a module overlapping its own boxes is tools/smoke.sh\'s business. But tools/smoke.sh checks metadata against geometry, not geometry against itself. So there is no tool on this project that sweeps a module against its own parts, and this file has now shipped four generations with a wire through a brake rotor. Running the cross-module predicate with both sides pointed at one module is about thirty lines and it is what found this.\n\nThe new route, placed against measured constraints rather than drawn by eye. It goes under the caliper, out past the disc, and then up the caliper\'s own outboard face to a connector beside the bleed nipples, which is also what a wear sensor lead does on a real corner: it is captive to the caliper as far as a bulkhead and it is not a chassis harness. The two caliper halves are solid boxes over y 0.3499 to 0.4799, so the run holds y at or below 0.3400 until it is outboard of them; the ring\'s outboard face is |z| 0.634, so the run reaches 0.6480 before its radius comes inside 0.1825; the outboard half ends at |z| 0.6645, so the climb sits on 0.6690, 4.5 mm proud of the face it clips to; and the disc\'s hat bell stands at r 0.0900 over |z| 0.635 to 0.676, which the climb clears at radial 0.161.\n\nIt took two attempts and the first one is worth keeping. A route that climbed to the bracket at |z| 0.6470 passed straight through autonomy-4\'s cable ring, which crosses this corner at y 0.3925 to 0.4355 and |z| 0.5968 to 0.6623: autonomy-4/ring x wheels/calipers went from 494 crossing triangle pairs to 578 with the depth unchanged at 42.36 mm. That is design/gen10.md hard point 8\'s rule arriving in real time, a pair that gains crossings being this generation\'s rather than inherited, and it was caught by re-running the whole-car sweep rather than by looking at the corner. The route above puts that pair back at exactly 494, and body-9/front-fairings x wheels/calipers goes 832 to 815.\n\nThe sizing case got easier and the reason is embarrassing. A peak stop on the Gen 9 preset at its 0.740 g tire is 10.07 kN at the road, about three quarters of it at the front once transfer has finished, 1.341 kNm per front corner. On Gen 10\'s 0.7137 g tire it is 9.71 kN and 1.292. The caliper delivers 4.36 kNm either way. So the one thing that made this part less oversized this generation is the tire getting worse, which is not a saving and is not booked as one: the kilogram wheels-7 refused to bank is refused again, for the reason it was refused twice before. Peak torque is not what sizes this caliper. Fade-free clamp after months of disuse, at the end of a descent, with a rear axle contributing under 8 percent, is what sizes it, and every one of those cases is unchanged.',
      why: 'A part that survives five generations of the hardware around it survives because its sizing case never got easier in a way that counts, and this generation is the cleanest demonstration yet: the only input that moved is the tire\'s peak grip, it moved the wrong way, and it made the caliper more oversized rather than less. Booking a kilogram off that would be banking a safety margin against a capability loss, which is the exact trade wheels-7 and wheels-9 both declined.\n\nThe sensor lead is the other half of the panel and it earns more space than the caliper does, because the caliper is right and the lead was wrong for four generations in a place nothing looks. Rerouting it is a fifteen-minute edit. Finding it needed a sweep nobody had written, and the reason nobody had written it is that the contract explicitly assigns intra-module overlap to a tool that does not check for it. That gap is worth more to the next generation than the fix is to this one.',
      fail: [
        'The bracket still does not land on the upright it is drawn against. Swept against suspension-9\'s built front knuckle, this module\'s two lugs and their pad at |z| 0.6475 stand 14.0 mm off the nearest knuckle surface, exactly as wheels-9 measured, because neither part moved. It is not a foul and not a float, since the caliper is captured by the ring it straddles at 1.0 mm; it is a bolted joint with no boss on the other side of it, and suspension-9 owes 14 mm of mounting face at radial 0.145, y 0.498, on the inboard flank of the front upright. Two generations have now published that requirement and no suspension generation has been open to take it.',
        'suspension-9\'s front knuckle is still 10.91 mm inside this caliper over 251 crossing triangle pairs, bit identical to wheels-9. Nothing this module did touched it and nothing this module could do would: the caliper is pinned by the ring and the knuckle is pinned by a suspension slot that is not open. It is one of the nine inherited pairs listed in full on the front wheels panel.',
        'Two calipers is still two single points, unchanged since Gen 2. These two components are the entire hydraulic system of the vehicle, one pressure block, two lines, twelve pistons, and the rear axle offers even less behind a mistake than it did in Gen 5 because the tire behind it now grips 3.5 percent less again.',
        'C/SiC pad dust is abrasive rather than merely dirty and the disc still runs 100 degrees hotter than wheels-7\'s, which shortens piston seal and dust-boot life. The seal interval was already shorter than the pad interval in Gen 7 and this generation does nothing about it. What it does add is a wear sensor lead that now runs on the outside of the caliper rather than through the disc, so it is exposed to that dust where it used to be exposed to 800 C. Both are bad and one of them is not a fire.',
      ],
      explode: [-0.3, 0, 0.2],
    },
    'park-brake': {
      name: 'Park-and-rescue brake',
      tagline: 'One drum where two stood, holding the same axle load through one spindle, and the thirty percent nose-down case still belongs to the tire, not the drum.',
      mass: 1.3,
      count: 1,
      specs: [
        ['Type', '180 x 22 mm simplex inside the center wheel\'s ring bore, spindle uprated 6 to 7.5 kN'],
        ['Hold required', '1,222 Nm at the one rear wheel, 30% grade laden (1,221.2 kg)'],
        ['Hold available', '1,350 Nm from the 7.5 kN dry spindle at r 0.090'],
        ['Statutory case', '754 Nm at the 18% grade type approval asks for; 44% of margin'],
        ['Binding limit', 'Not the drum. The tire: nose-down at 30% it needs 0.785 and has 0.714'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Gen 21: the arithmetic re-runs because the corner count halved and the axle load did not. On a 30 percent grade the laden car pulls 1,221.2 times 9.81 times sin(arctan 0.30), 3,442 N down the slope, and one wheel now holds all of it: 1,222 Nm at the 0.355 m radius, where each of the pair held 894 on a heavier car. A simplex drum roughly doubles what its spindle applies, so 1,222 Nm at the 90 mm band asks 6.79 kN and the carried 6 kN spindle no longer clears its own case: the spindle uprates to 7.5, giving 1,350 Nm and 10 percent of margin at the spec grade, 44 percent at the statutory 18 (754 Nm). Every coordinate carries in the wheel\'s local frame at the new z 0 center, the whole device still lives inside r 0.155, and the mass books 1.3 against the pair\'s 2.0: one backplate, one shoe set, one gearmotor, a heavier spindle.\n\nAnd the finding this panel has carried since Gen 10 survives the rung intact, re-solved on this car\'s own CG (laden 0.413 m, rear share 0.4248): nose-up at 30 percent the patch needs 0.642 of friction and has 0.714, holds; nose-down the rear share thins to 0.3821 and the patch needs 0.785, does not hold, exactly the class of miss the pair recorded at 0.791. One patch instead of two changes the torque per drum and changes the friction budget not at all, because both scale with the same normal load. The statutory 18 percent nose-down needs 0.451 and holds with 37 percent of friction margin. The device meets the law and misses the specification this file wrote for itself, on the third consecutive rung, and now does it through one drum.\n\nWhat follows is the carried record of the pair.\n\nCarried whole from wheels-10, verified at 1e-6 m rather than asserted. All 8,786 park-brake vertices compare identical to wheels-10\'s, and the gearmotor at (-1.494, 0.287, plus and minus 0.616) is why the rerouted aft harnesses had to keep their terminations. The rest of this panel is wheels-10\'s with its measurements intact, so every \'this generation\' and \'this module\' in it means gen 10 and not Gen 11. Gen 11 moved two cables on the brake-by-wire unit and touched nothing else on the car; see that panel and the module header.\n\nThe device is untouched in every coordinate and its arithmetic was re-run anyway, which is how this panel has earned its place twice before. Holding torque is a function of mass, grade and tire radius, and this generation moved exactly one of the three by exactly one kilogram. On a 30 percent grade gravity pulls 1,786.58 times 9.81 times sin(arctan 0.30), which is 5,036 N down the slope against Gen 9\'s 5,039, and this axle is the only axle holding it, so each corner resists 2,518 N and at the 0.355 m tire radius that is 894 Nm. Gen 9 needed 894 Nm. To the newton-meter, nothing moved, and the radius is why: P.tireR is frozen, so the one input that could have changed this number is the one this generation was forbidden to touch.\n\nA simplex drum roughly doubles what its spindle applies, so 894 Nm at the 90 mm band radius asks 4.97 kN and the dry spindle is specified at 6, giving 1,080 Nm and a fifth of margin. Every coordinate is unchanged: the rotating carrier necking from r 0.090 onto the hub pilot at r 0.072 over |z| 0.658 to 0.732, the static boss at 0.6395, the backplate at 0.6315 holding r 0.100, the shoes at 0.682, the gearmotor at 0.616 reaching inboard to 0.596. Every radius is inside 0.155, so the device lives in the annulus bore and the contract band stays void.\n\nAnd the drum was never the binding limit, which no generation of this slot has said. Three generations have compared 894 Nm of demand against 1,080 Nm of drum and called it a fifth of margin. That comparison assumes the tire can put 894 Nm into the road, and on a rear-axle-only park brake it often cannot. Solved with one model over both rungs, static rear share 43.1 percent, center of gravity 0.500 m, wheelbase 2.90 m, longitudinal transfer on the slope included:\n\n    case                    rear normal share   mu required   Gen 9   Gen 10\n    30 % grade, nose up          0.4624            0.6215     0.740   0.714   holds\n    30 % grade, nose down        0.3633            0.7910     0.740   0.714   neither holds\n    18 % grade, nose up          0.4547            0.3896     0.740   0.714   holds\n    18 % grade, nose down        0.3936            0.4500     0.740   0.714   holds\n\nParked nose down on the 30 percent grade this device is sized for, the rear tires need a coefficient of 0.791 and have 0.714. The drum can produce 1,080 Nm and the road will not take 894. This is inherited and not created: wheels-9\'s 0.740 g tire needs the same 0.791 and misses by less, so the car has never held that case and three panels have implied it does by quoting a drum against a demand. What Gen 10 did was make the miss worse, from a ratio of 0.936 to 0.902, and it did that by trading grip for rolling resistance on a count it then declined to book.\n\nThe statutory case is the one that is actually certified and it passes comfortably: 18 percent nose down needs 0.450 against 0.714, which is 59 percent of margin, and 551 Nm against 1,080. So the device meets the law and misses the specification this file wrote for itself, and the two have been printed as one number for three generations.',
      why: 'Re-deriving a carried number rather than copying it is how you find the input that moved, and this time the useful finding is that nothing moved and the comparison was wrong anyway. wheels-7 found 20 Nm of extra laden mass. wheels-9 found 8 Nm going the other way. This module found zero, and then found that the quantity everyone has been comparing is not the quantity that decides the case.\n\nThe temptation to delete a device that contributes under 8 percent of a dead-vehicle stop grows every generation and is wrong every generation, because the law requires a car with every electron gone to hold and to stop. What this panel adds is that the law\'s case, 18 percent, is not the case the panel has been quoting, 30 percent, and only one of the two is met.',
      fail: [
        'The 30 percent nose-down hold does not exist and it is the tire, not the drum. 0.791 required against 0.714 available, a ratio of 0.902, on a car whose park brake acts on one axle. The honest fixes are all outside this module: a park brake on the front axle, which means a second dry actuator and a second failure set on the axle that already carries the entire hydraulic system; a lower center of gravity, which is nine modules; or a tire with more grip, which is the trade this generation just made in the other direction. What this module can do is publish the number, which no previous generation of this slot did.',
        'It is still the least inspectable friction device on the vehicle, inside a motor inside a wheel, and no better placed than it was in Gen 7. Shoe condition is inferred from the gearmotor current signature on hv-4\'s telemetry, and the self-adjusting spindle that could jam in Gen 2 can still jam here behind more hardware than ever.',
        'The bore it lives in is still crowded by suspension-9 and the crowding is bit identical to wheels-9: rear structure through this device in 1,416 crossing triangle pairs at 20.00 mm, which is the deepest pair the wheels slot has against any module on the car, and rear steer at 2.46 mm over 215 pairs. Note where that deepest one is. It is at the rear, on the axle Gen 9 deliberately did not touch and Gen 10 did not touch either, which is why a part list drawn around the front corner has missed it twice.',
        'Two full applies from 20 km/h and it needs minutes to cool, unchanged and by disclosure. The fallback deceleration behind it stays at wheels-7\'s 0.33 g, and it stays because it is limited by wheel-motor torque rather than by grip: 0.33 g needs a coefficient of 0.33 and the tire still has 0.714. That is the one place on this panel where the tire change costs nothing.',
      ],
      explode: [0, 0, 0.78],
    },
    'master-unit': {
      name: 'Brake-by-wire unit',
      tagline: 'Seven generations without moving a coordinate, and the eighth moves two cables because a partner filled the air they ran through. The box did not move. The corridor did.',
      mass: 3,
      specs: [
        ['Architecture', 'One-box dry unit, front hydraulics only, 0 to 180 bar in 120 ms'],
        ['Aft corridor', '|z| 0.6297..0.6477, y 0.3175..0.3446 (wheels-10: |z| to 0.7678)'],
        ['Corridor clearance', '12.30 mm to battery-11/sill, 15.49 to the lid, 17.43 to air-supply'],
        ['Tightest on the part', '2.37 mm, the crossover against thermal-11/local-circuits'],
        ['Min bend radius', '72.1 mm on the built polyline, 39.1 on the curve under it'],
        ['Harness pair', '6.2896 m against wheels-10\'s 5.6057, so +683.9 mm, +12.2 %'],
      ],
      how: 'The hardware did not move and the envelope around it did, which is the same shape of defect this ladder found at Gen 9 in a halfshaft and design/gen11.md risk 4 predicted in writing before anyone measured it. The pedal box, the plunger block, the ball-screw motor, the reservoir with its filler and level connector, the ECU with its heatsink and connector shells, the conduit and the forward hydraulic pair are wheels-10\'s geometry at wheels-10\'s coordinates. Both hydraulic runs still terminate at (1.286, 0.484, plus and minus 0.620) and both aft harnesses still land on the park-brake gearmotor at (-1.494, 0.287, plus and minus 0.616). What changed is the middle of the two aft runs, and only because design/gen11.md section 7 merged battery-10\'s pack rail with body-9\'s rocker into one structural sill and put it exactly where the cable was.\n\nThe measurement that made this A module. wheels-7 routed both aft harnesses out to |z| 0.7400 and three generations carried it, because on a 1.9536 m car that is the 65.0 mm of air between a pack rail at 0.7800 and a rocker inner face at 0.8450 with no y overlap at all. design/gen11.md section 7 fills it. Swept against the built battery-11 with tools/interfaces.js\'s own predicate at its own tolerance, wheels-10/master-unit puts 570 crossing triangle pairs 23.52 mm inside battery-11/sill, deepest at (0.2568, 0.3457, 0.6707). Scanned as vertices inside the cabin band x -1.12 to 1.03, it puts 1,491 of them at |z| 0.6045 to 0.7678 and y 0.3327 to 0.3930, and 1,262 inside the sill\'s own box of |z| 0.6600 to 0.7800 over y 0.1035 to 0.4200. Every one is above the lid top of 0.3080, so the pack\'s shoulder does not cover any of it: it is at rocker height, which is the one height the sill now owns outright. The rebuilt part puts zero vertices in that box, zero in body-11\'s pan box, and its outermost point anywhere is a clip ferrule at |z| 0.6477.\n\nWhere it went, and why there and nowhere else. Four corridors exist on this section and three are shut. Outboard of the sill is body-11\'s floor pan from y 0.4200 to 0.5600 and the tire column beyond that. Under the pack is the strike shield at y 0.1025 to 0.1440 and then the road, which is not where a park-brake command line goes. On top of the lid is forbidden outright by design/gen11.md section 5, which is the clause the first body-11 broke and lost the whole height budget doing it. What is left is the rocker corner inboard of the sill, and when this route was drawn it was not empty: hv-4\'s floor perimeter ring ran the length of the car at |z| 0.6360 to 0.6940 over y 0.3510 to 0.3626, with its bywire feeds just outboard at 0.6920 to 0.7080 over y 0.3531 to 0.3669, and suspension-9/air-supply sits inboard of both, topping out at |z| 0.6174 and y 0.3357. That left two slots, one above the ring and one below it, and both were built and swept before either was chosen.\n\nThe ring is gone now and the route is published against what the preset builds, not against what it was drawn against. hv-11 landed after this route and redrew the floor: it puts no material below y 0.4200 anywhere over this corridor, its lowest part there is a zonal controller sitting exactly on 0.4200 at |z| 0.5100 to 0.6310, the lowest member spanning the run\'s own |z| band is the spine underside at 0.4350, and swept part by part hv-11 has zero penetrating pairs against this module. suspension-9/air-supply is the only partner left in the corner and it holds 17.43 mm at (-0.0455, 0.3256, 0.6323). So the corridor is now empty above the run for 75.4 mm, the nearest hv-11 part measures 80.94 mm surface to surface, and every hv figure in the paragraph above is history rather than clearance. It is kept because a route that survives the deletion of its own justification should say which of the two it is.\n\nBelow the ring won, on A measurement rather than A preference. A corridor at y 0.390 clears the ring in y and still reads 2.00 mm of penetration where the run descends to the rear termination, and it sits 82 mm above a cabin floor at 0.3020 in a car whose whole generation is a height budget. The corridor at y 0.326 sits 18.0 mm above the cabin floor plane at 0.3080 and 24.0 mm above the lid\'s outboard step at 0.3020, under the ring and over that step, which is where a rocker trim goes on a real car, and against the hv of the day it took hv-4/ring from wheels-10\'s 444 crossings at 21.13 mm to 82 at 3.69, and against the hv-11 the preset builds it takes it to zero. Built and measured, the run occupies |z| 0.6297 to 0.6477 and y 0.3175 to 0.3446 from x 0.600 back to x -1.050.\n\nWhat the corridor run clears, re-measured against the preset and corrected. Every figure below is triangle to triangle over the nine modules a gen11 preset builds, scoped to the corridor span and to nothing else, and the row that was wrong was wrong by 10 mm in the comfortable direction. The three closest things to the run are battery-11/sill at 12.30 mm, with the nearest point on this module a clip ferrule at (0.0395, 0.3257, -0.6477) facing a wall at -0.6600; battery-11/floorlid at 15.49 mm; and suspension-9/air-supply at 17.43 mm, the third wall of this corridor. After those it opens out: battery-11/sensefilm 34.79, battery-11/galleries 38.65, battery-11/bricks 41.99, thermal-11/local-circuits 64.01, body-11/floor-pan 70.37, hv-11/spine 80.94.\n\nAnd the row that was false, named, because this project has shipped three false clearances and every one was A number quoted from the wrong measurement. 23.52 mm is not a clearance to hv-4/zonal: it is the depth wheels-10/master-unit penetrates battery-11/sill, three sentences up in this same panel, and it does not belong in a clearance row. The true figure for the row as written is 13.41 mm, from the whole part to hv-4/zonal at (-1.1373, 0.3372, -0.6362), and the corridor run itself is over 100 mm from it. Both numbers are moot, because hv-4 is not in this preset: hv-11 is, and its zonal controllers are 123.69 mm from the corridor run. The same applies to the "thermal-9/recovery-core 22.44" that sat beside it, which measures 22.12 mm against the thermal-9 it named and 143.48 mm against the thermal-11 the preset builds.\n\nAnd the +z run stopped crossing the cabin, which is the change worth more than the sill fix. wheels-10 took it across the car at (0.70, 0.45, 0.00) and (0.40, 0.36, 0.55). On a 1.9536 m four-seat car that is under a center console. On a 1.20 m tandem cabin whose floor is the pack lid and whose seat pan sits 150 mm above it, it is a cable lying across the cabin floor at seat-pan height, under the front occupant, and the sweep agrees. Re-run against the interior the preset builds rather than against interior-6, which is the four-seat cabin this route was first checked on, wheels-10/master-unit crosses interior-11/front-seats in 118 triangle pairs to 37.55 mm. That is the deepest penetrating pair the wheels slot has anywhere on this car, deeper than the 23.52 mm sill foul this module exists to fix, and it is a brake line inside a seat. It closes, and so do three more that only appear on the built Gen 11 partners: autonomy-11/ring at 76 pairs and 14.94 mm, thermal-11/recovery-core at 26 and 12.32, and the sill itself. It now crosses at x 1.075, which is 38.4 mm forward of body-11\'s floor pan front edge at 1.0366 and 5.0 mm aft of the sill\'s front face at 1.0800, so the crossover is on the toeboard plane in the front compartment. "Forward of both" is a millimeter error in the direction that sounds better, and it is the kind that gets repeated.\n\nThe crossover took three attempts and the first two are the reason this panel trusts the third. A crossover at x 1.050 and y 0.494 passed the five-module gate this module was written against with zero new pairs, and drove 173 crossing triangle pairs 37.3 mm into thermal-9/local-circuits, which is the HVAC stack occupying x 0.95 to 1.11 at |z| under 0.3775 over y 0.33 to 0.66. A second at x 1.050 and y 0.440 cleared that block in y and still caught it on the approach at (1.005, 0.479, -0.328). The route that ships goes outboard first, to |z| -0.400 at x 1.030, which was past thermal-9\'s stack in z rather than under it in y, then forward and across at x 1.075 and y 0.452, which is a lane measured clear over the whole span from z -0.36 to +0.64.\n\nAnd the crossover clearances were measured against thermal-9, which is not the thermal module this preset builds. 21.8 mm to local-circuits, 21.8 to the recovery core and 32.3 to the glycol loop are thermal-9 figures and do not apply here. Against the built thermal-11 the crossover holds 2.37 mm to thermal-11/local-circuits at (1.0505, 0.4599, -0.3536), which is the tube\'s upper surface, 32.73 mm to the glycol loop and 38.71 mm to the recovery core. 2.37 mm is a clearance and not a crossing, and the gate at the foot of this file confirms zero penetrating pairs against thermal-11 in either direction. It is still the tightest air on this route by a factor of five, and the sentence above it does not survive the measurement either: thermal-11/local-circuits reaches |z| 0.4375 forward of x 0.8675, and the detour turns at 0.400, so the route is inside the block in z rather than past it. What clears it is a local step in the block face, by 2.37 mm, and calling that "past the stack in z" would be describing thermal-9\'s geometry on thermal-11\'s car.\n\nThe part as A whole comes closer to things than the corridor run does, and "the closest it comes to anything is 12.30 mm" is true only of the corridor run, not of the part. Scoped to the corridor run that sentence is true. Scoped to master-unit it is not. Below zero, the two rear terminations are inside suspension-9/rear-steer by 9.96 mm and rear-structure by 7.82, which are the connector interpenetrations this panel opens with and which the fail list prices. Above zero the list is: 2.37 mm to thermal-11/local-circuits at the crossover, 4.78 mm to drivetrain-9/hub-bearings, 5.17 mm to hv-11/spine at (1.2372, 0.5238, 0.5241), 8.28 mm to thermal-11/glycol-loop at (1.0606, 0.6304, -0.2354), then 12.30 mm to battery-11/sill. Two of those five are unchanged wheels-10 geometry meeting a Gen 11 partner: the forward hydraulic pair this module never touched holds 5.17 mm to hv-11 and 8.28 to thermal-11, both at points that measure identically on wheels-10. That is this module\'s opening sentence pointed the other way, and it is the reason the gate is run over the preset rather than over the parts that changed.\n\nWhat the reroute costs, and A reroute that costs nothing is not A reroute. The -z run goes 2.5863 m to 2.5972, so 10.9 mm longer. The +z run goes 3.0194 m to 3.6924, so 673.0 mm longer, all of it in the outboard-and-forward detour around the HVAC stack. The pair goes 5.6057 m to 6.2896, plus 683.9 mm and plus 12.2 percent. Bends over 3 degrees of turn go 6 to 6 on the -z run and 7 to 10 on the +z.\n\nThe minimum bend radius, re-measured on the route this module actually builds, and it is worse than the number that was published. Measured on the control points the radius falls from 663.8 mm to 102.1 at the outlet turn, where the +z run leaves the unit through 57 degrees, and that reads as a pass. Both figures are circumradii of the control polygon, which is not the route: lib.tube runs a Catmull-Rom through those points and TubeGeometry samples it in arc length, so the built centerline is the sample set and the control points are only its handles. Measured three ways, on both runs, on the same curve the mesh is made from:\n\n     control polygon      wheels-10  663.8 mm   ->  wheels-11  102.1 mm\n     Built polyline       wheels-10  354.6 mm   ->  wheels-11   72.1 mm\n     underlying curve     wheels-10  227.4 mm   ->  wheels-11   39.1 mm\n\nThe built figure is 72.1 mm, at sample 2 of 44 on the +z run at (1.0052, 0.4806, -0.4119), and that is the number this module publishes. The control polygon flattered it by 30 mm and misnamed it as well: the tightest corner is not the 57 degree outlet turn but the 74.1 degree corner one control point later, at (1.030, 0.466, -0.400), where the run stops going outboard and turns forward. Two corners 84 mm apart get averaged into one circumradius by a polygon and separated by the curve.\n\nAnd the verdict flips on the third row. On a 7.0 mm outside diameter harness a fixed installation wants about six diameters, so 42 mm. The built polyline at 72.1 mm is 10.3 diameters and passes. The curve that polyline samples is 39.1 mm, which is 5.6 diameters, and it does not: it is 2.9 mm inside the rule at the one corner named above, and the only reason the built figure looks better is that an 84 mm sample pitch cannot represent a 39 mm corner. A denser tube would not fix it, it would only stop hiding it. The honest statement is that this route is at or just past its own bend limit at one corner, that the fix is a fourth control point spreading that turn over 150 mm rather than 84, and that it is not made here because it moves geometry after the gate rather than before it. It is filed on the fail list. It is a cable and not a hydraulic tube, so the tighter tube rule does not govern; the forward hydraulic pair, which is 8.0 mm steel and does have that limit, was not touched and its minimum radius did not move.\n\nClips and service, both worse. Six clips on the -z run and ten on the +z against wheels-10\'s four and four, because the runs are longer and because the old spacing left one 1.05 m span with nothing holding it next to what is now a structural member. Spans are 0.14 to 0.61 m against 0.25 to 1.05. Eight extra clips is eight extra things to release, and the access is the real cost: at |z| 0.7400 in the old flank the run was reachable from under the car once the aero floor was off, and at 0.6400 in the rocker corner it is inside the cavity behind the sill, which on this car has no removable outer panel because the sill is the structure. Service is from inside the cabin, under whatever trim interior-11 puts over the floor edge, and that is a cabin-in job on a two-seat car with one door line per side.\n\nMass is not booked and here is the number. 683.9 mm of extra harness at roughly 55 g per meter for a 7 mm conduited multicore is 38 g, and eight extra clips at about 3 g each is 24 g, so 62 g. This project\'s mass ledger works to the kilogram, so booking it means rounding 62 g up to 1 kg and charging the car about 0.7 miles it did not lose. master-unit stays at 3 kg and the module stays at 74.0, exactly as wheels-10 declined to book the 0.39 kg its rim narrowing saved.',
      why: 'Because the alternative was to leave a brake harness inside a structural member, and because of the three things a routing decision has to answer this one only had one honest answer.\n\nA harness in the sill is not a clearance problem that a millimeter fixes. The sill is the crush structure design/gen11.md section 7 bought to protect a tandem occupant who no longer has 380 mm of car beside him, and its whole argument is that a merged rail and rocker carry a side impact where a 0.9 to 1.6 mm door skin cannot. A cable inside that section is a cable in the load path: it is crushed first in the event the member exists for, and in normal service it is a stress raiser in a bonded box beam that nobody inspects. It also cannot be a stressed member, which is the constraint that rules out the tempting fix of clipping the run to the sill\'s inner web and calling the sill its support.\n\nThe corridor it went to is the one every production car uses for exactly this cable, and that is corroboration rather than the argument. The argument is that it is the only volume on this section bounded on three sides by parts that are already agreed, clear over the whole 1.65 m it needs, and inboard of a plane two modules have declared. Taking the lower of the two slots rather than the upper is the second half of that: it keeps the harness 18.0 mm off the cabin floor plane instead of 82, and it was chosen after both were built and swept rather than reasoned about. The argument for it at the time was that it tucked under hv-4\'s floor perimeter ring, two floor-level runs stacked in one rocker being normal practice; hv-11 has since deleted that ring and the choice stands on the height alone, which the panel says plainly rather than leaving the old reason in place.\n\nThe forward crossover is the part of this that was not forced. The run could have crossed on the lid at floor level and been 400 mm shorter. design/gen11.md section 5 forbids building on the lid, and even if it did not, a cable across a 1.20 m cabin floor at seat-pan height is a thing an occupant stands on, which is what the 118 pairs 37.55 mm inside interior-11/front-seats were. Spending 673 mm of harness to put the crossover on the toeboard is the trade, and it is stated as a trade because the 673 mm is real and is 22 percent of that run.',
      fail: [
        'The two rear-corner pairs both got deeper by the reported metric and the curve barely moved, and design/gen10.md hard point 7 counts a pair that deepens or gains crossings as this generation\'s work, so it is claimed here rather than filed under inherited. master-unit against suspension-9/rear-steer goes 192 crossing pairs at 9.79 mm to 184 at 9.96, so eight fewer crossings and 0.17 mm deeper, and against suspension-9/rear-structure 122 at 7.27 to 126 at 7.82, so four more and 0.55 mm deeper. Sampled at 30,000 points, the new centerlines lie within 0.054 mm of wheels-10\'s everywhere aft of x -1.300, which is the span both suspension parts occupy, and the last four control points are wheels-10\'s to the digit. Between x -1.100 and -1.300 the curve does move, by up to 5.61 mm at x -1.168, because Catmull-Rom shapes a segment from its neighbors and the neighbor at x -0.900 came down 20 mm. Past that the difference is the tessellation: TubeGeometry samples uniformly in arc length, the route ahead got 673 mm longer, so a different triangle is the deepest straddler on the same curve. SPEC.md already warns that plane-straddle depth on a slender part crossing a large panel is not the intrusion, and this is that warning arriving as a 0.55 mm swing on a curve that moved 0.05. The honest statement is that the physical intrusion is unchanged to a twentieth of a millimeter and the published number is not, and both halves belong on the panel.',
        'The rear corner is still fouled and this module did not try. Getting to a gearmotor at (-1.494, 0.287, plus and minus 0.616) means passing through suspension-9\'s rear subframe, which spans x -1.7551 to -1.3049 over y 0.1487 to 0.5924, and through the rear steer actuator at y 0.137 to 0.323. There is no route that does not: outboard is drivetrain-9\'s rotor and stator rings from |z| 0.6500, below is the same subframe, above is the motor. The fix wants the suspension slot and the wheels slot open in one generation and design/gen11.md opens neither, so the pair is carried with its numbers printed. It is the same conclusion wheels-10 published about the 1,416-pair park-brake foul at 20.00 mm, which is deeper than anything on this panel and is also still here, bit identical.',
        'The hv foul this entry used to report is gone, and the entry is kept because of how it went. "hv-4/ring is still penetrated, 82 crossings at 3.69 mm" is not this module\'s largest open item. That reproduces exactly against hv-4, and hv-4 is not what a gen11 preset builds. Swept against the built hv-11, part by part, the wheels slot has zero penetrating pairs with the hv slot, for wheels-10 as well as for this module, because hv-11 deleted the perimeter ring design/gen11.md section 6 condemned and put nothing below y 0.4200 anywhere over this corridor. This module did not earn that. hv-11 did, and the residue it was going to have to argue with never arrived: the corridor at y 0.3175 to 0.3446 clears the lowest hv-11 material over it by 75.4 mm and its nearest part by 80.94 surface to surface.\n\nWhat remains is the warning the entry was really making. A module that publishes a foul against a partner the preset does not build is publishing a number about a car that does not exist, and this file did it in four places before it was caught. Every hv figure in this module is now measured against hv-11 or labeled as history. The corridor is still not declared by anybody, which is the entry below.',
        'The corridor is reserved and nobody agreed to it, and interior-11 has since landed without agreeing to it. interior-11 has landed, so the pair is swept here rather than deferred. It has been: interior-11/nvh is the only part of it anywhere near this corner and it holds 163.41 mm, so the corridor is clear and nothing has to move. That is luck rather than agreement. interior-11 owns the cabin floor edge, this run sits at |z| 0.6400 and y 0.3175 to 0.3446 inside the cabin\'s outer footprint above the lid, and no key names it in either module, so the next interior that puts a sill trim or a floor-edge finisher where a finisher belongs takes it without breaking a declared plane. What that module needs is the whole envelope, which is |z| up to 0.6477 and y 0.3175 to 0.3446 over x 0.600 back to -1.050, plus about 20 mm of hand access to release a clip. A sill trim covering it is still the expected answer and it is still not this module\'s to draw.',
        'The whole corridor is 12.30 mm wide and the plane that bounds it is not declared by anybody. battery-11\'s sill has a continuous inboard wall at |z| 0.6600 from y 0.3020 to 0.4200 over x -1.0600 to 1.0800, and the outermost thing on this part is a clip ferrule at 0.6477. That is the margin, at every station, and it is a clip and not the cable: the tube alone holds 15.72 mm, at (0.0170, 0.3244, -0.6443). 16.5 mm is 0.640 plus a 3.5 mm radius against a 0.6600 wall, arithmetic on the control points rather than a measurement of the tube; the Catmull-Rom overshoots |z| 0.640 by 0.3 mm and the built skin reaches 0.6443. Twelve millimeters is a real production clearance for a clipped harness against a bonded panel and it is not a comfortable one, and nothing protects it. battery-11 declares sill-outboard at |z| 0.7800 and sill-top at y 0.4200, and says nothing about the inner wall, so a later pack that thickens the section inboard, which is a normal thing to want from a crush member, takes this corridor without breaking a single declared key. The right fix is a sill-inboard key at 0.6600 held jointly by the pack and this module, and it is not written here because a declared key needs both halves in one commit and this module may not edit battery-11. It is filed for the integrator instead.\n\nA number wrong in the comfortable direction is the easy one to write, which is why the paragraph above is stated the way it is. Scanning the sill as vertices in x stations reported |z| 0.6600 at x plus and minus 1.05 and 0.7075 everywhere between, which reads as a corridor 63 mm wide mid-car and only pinched at two bulkheads, and is wrong. A 2.14 m plate has vertices at its ends and nowhere else. Re-measured on triangles it is one wall the whole way. The surface-to-surface number, 12.30 mm, was right in both drafts, because it never asked the question of vertices; the story built around it was wrong for a page.',
        'The +z run is at or past its own bend limit at one corner, and measuring the wrong curve hides it. The published radius was 102.1 mm, a circumradius of the control polygon, and it was published with the verdict "it passes at 14.6 diameters". On the polyline the tube is actually built from, 44 arc-length samples of the Catmull-Rom through those points, the minimum is 72.1 mm at (1.0052, 0.4806, -0.4119). On the curve that polyline samples it is 39.1 mm at (1.030, 0.466, -0.400), the 74.1 degree corner where the run stops going outboard and turns forward. On a 7.0 mm outside diameter harness at the usual six diameters the limit is 42 mm, so the curve is 2.9 mm inside it and 5.6 diameters where the panel claimed 14.6. The route is buildable and the mesh is fine; what fails is the cable rule, at one corner, by three millimeters. The fix is a fourth control point spreading that 74 degrees over about 150 mm instead of 84, and it is not made here because it is a geometry change after the gate rather than before it, and this file has already shipped once on numbers that were not re-swept. The next pass on this module owns it.',
        'The crossover clears thermal-11 by 2.37 mm and that is the tightest air on the whole route. It is a clearance and not a crossing, the gate reports zero penetrating pairs against thermal-11, and it is still five times tighter than anything else on this run and roughly a tenth of the thermal-9 figures. The cause is that thermal-11 widened its forward local-circuits block to |z| 0.4375 after this detour was drawn to |z| 0.400, so the route is inside the block in z and survives on a local step in its face. Nothing declares that face. A thermal pass that fills the step, which is the normal thing to want from an HVAC casing, closes 2.37 mm without breaking a single declared key, and the pair would then be a brake command line inside a coolant block. It is filed for the integrator alongside the sill-inboard key, and the two want the same fix: this corridor and this crossover both need a declared plane and neither has one.',
        'Nothing was re-derived on the control side and three calibrations are still stale from gen 10. The anti-lock threshold, the pad conditioning schedule and the 0.33 g fallback all date from before wheels-10 changed the tire under them, and wheels-10 said so. This module changed a cable route, which touches none of them, so it neither fixed nor worsened any of it and it inherits all three. The 0.33 g fallback is now the oldest open item in this file at eight generations, and it is still an estimate from a drivetrain model rather than a number derived from the built machine.',
      ],
      explode: [0.5, 0.35, 0],
    },
  },
};

/* ── Geometry ──
   Corner-local frame carried from wheels.js through wheels-9.js: origin at
   the wheel center, z along the axle, s = sign(world z) so +s is outboard.
   NEITHER ORIGIN MOVES THIS GENERATION. FRONTZ and REARZ are both 0.74,
   exactly as wheels-9 left them, and they are still written twice on
   purpose: they are two independent contracts that happen to agree, and
   collapsing them into one constant is how the next generation moves an axle
   it did not mean to move.

   P.wheelZ stays 0.81 in js/common.js and P.wheelY and P.tireR stay 0.355.
   Do not edit any of the three. body-8's fairing inboard wall is literally
   P.wheelZ - 0.110, so editing that constant makes a partner foul vanish by
   accident rather than by drawing. P.wheelY appears in seventeen system
   modules and is a live code read in all seventeen of them, and
   drivetrain-9 derives the driveEff the whole ladder books from a rolling
   radius that depends on it. P.wheelZ is mentioned in twelve modules and is
   a live code read in nine. Both counts were re-measured here with block and
   line comments stripped rather than carried: design/gen10.md reports 17 and
   15 for P.wheelY and 12 and 11 for P.wheelZ, so the mention counts agree to
   the module and the live sub-counts do not. The convention is the
   difference and neither reading changes anything.

   THE ONE AXIS THIS GENERATION MOVES IS THE CORNER'S OWN WIDTH. Every radius
   below is wheels-6's or wheels-7's to the digit. Every axial coordinate on
   the tire, the two rim barrels and the cover moved inboard, and by three
   different amounts, which is the thing to keep straight: the RIM narrowed
   6.35 mm a side because it is 4.5J instead of 5.0J, the TIRE narrowed 10.0
   mm a side because it is a 135 section instead of a 155, and the COVER's
   seat followed the rim while its lip followed the tire. Nothing else in the
   file moved at all: the disc, the caliper, the park brake and the master
   unit are wheels-9's geometry at wheels-9's coordinates.

   Key world planes, FRONT corner. An arrow marks a plane that moved:
     0.5640  caliper bridge, inboard face
     0.5735  caliper inboard half, inboard face
     0.6040  disc friction ring, inboard face
     0.6340  disc friction ring, outboard face
     0.6625  DECLARED front-corner-pack-outboard keep-out plane      <-
     0.6725  tire inner face, the 135 section maximum                <-
     0.67635 rim inboard flange lip, 4.5J                            <-
     0.68285 rim inboard bead seat, flange end                       <-
     0.6925  hub face plane, ET47, the declared halfshaft interface
     0.7400  wheel center plane
     0.79715 rim outboard bead seat, flange end                      <-
     0.80365 rim outboard flange lip                                 <-
     0.8075  tire outer face                                         <-
     0.8090  cover outer lip, the outermost surface on the car       <-

   Key world planes, REAR corner. The contract half is untouched:
     0.6315  park-brake backplate, static
     0.6382  flange bolt heads, inboard face
     0.6460  flange bolt heads, seating face on the titanium ring
     0.6500  CONTRACT flange face, drivetrain-9 rotor rings bolt here
     0.67635 rim inboard flange lip, 4.5J                            <-
     0.6725  tire inner face                                         <-
     0.7300  outboard edge of the CONTRACT annulus
     0.7400  wheel center plane
     0.7460  valve, which this wheel has never had before            <-
     0.8075  tire outer face                                         <-
     0.8090  cover outer lip                                         <- */

const FRONTZ = 0.72;             // UNCHANGED. Gen 24 moves the section, not the track; see the header
const REARZ = 0.72;              // rear wheel center |z|, carried from wheels-7
const TSEG = 48;                 // tire lathe segments
const RSEG = 48;                 // cover, disc and flange-ring lathe segments
/* Rim barrels stay at 40. Their silhouette is never the corner's outline:
   the cover owns every radius out to 0.312 from outboard and the tire owns
   everything past it, so the barrel is only ever seen inboard or exploded,
   where 40 segments carry 0.8 mm of chord sag on a 0.53 m circle. Holding
   the covers and discs at 48 and the barrels at 40 is worth 864 triangles
   and no visible difference, which is the whole argument against raising a
   segment count everywhere at once. */
const WSEG = 40;                 // rim barrel and shell segments

/* THE RIM NARROWS WITH THE SECTION AND NOTHING ELSE ABOUT IT MOVES.
   4.5J instead of wheels-7's and wheels-9's 5.0J, so the bead seats sit at
   local +-0.05715 instead of +-0.0635 and the flange lips 6.5 mm outboard
   of each seat as before. The seat DIAMETER does not change, because the
   rim is still a 20 inch rim: BEAD and FLANGE are radii and they are
   wheels-6's to the digit. Everything derived from a radius therefore
   carries unchanged, which includes the drop-well floors, the cover's
   flange seat radius, the bayonet land and the whole of both hub joints. */
/* Gen 21: two rims, one rule. The front barrel narrows to 3.5J and the
   whole of it rides OFF inboard on the fixed hub face; the center wheel
   keeps the pair's 4.5J under the 155. Radii are frozen on both, as they have been
   since wheels-6. */
const RIMW = 0.04445;            // 3.5J half-width: bead seat, local axial (wheels-10: 4.5J, 0.05715)
const BEAD = 0.2540;             // 20 inch bead seat radius, at the flange end
const BEADT = 0.0021;            // seat taper radius drop; across the front's shorter seat see BEADT_F
const BEADT_F = 0.0016;          // the same 5 degrees across the 3.5J's 18.6 mm seat
const FLANGE = 0.2665;           // rim flange lip radius
const LIP = RIMW + 0.0065;       // flange lip, local axial: 0.05095
const SECT = 0.0525;             // Gen 24: 105 mm section: half-width, local axial
const OFF = -0.005;              // Gen 21: the front barrel and tire ride 5 mm inboard; the hub face does not
const RIMW_R = 0.05715;          // the center wheel keeps the pair's own 4.5J
const LIP_R = RIMW_R + 0.0065;   // 0.06365, carried to the digit
const SECT_R = 0.0775;           // 155 mm section: half-width
const EDGE = 30;                 // crease threshold in degrees, design/crispness.md

/* ── What is actually visible, re-measured on THIS module rather than
   carried, because a full aero cover hides most of a wheel and geometry
   nobody can see is a decal with a triangle budget.

   THE METHOD, STATED IN FULL BECAUSE THE ANSWER DEPENDS ON THE SCENE AND AN
   EARLIER DRAFT OF THIS BLOCK DID NOT SAY WHICH SCENE IT USED. Orthographic
   first-hit z-buffer, 216 directions on a Fibonacci UPPER hemisphere so no
   eye is ever below the ground plane, 1.11 mm per pixel, pixel-center
   sampling, run separately over the front +z and the rear +z corner. Every
   figure in this block is one run of that function. It is run over THREE
   scenes, because a wheel module measured on its own and a wheel measured
   inside the car do not give the same answer and only one of them was
   published before:

     A  the corner, module alone, aero cover ON, which is the convention
        wheels-9 used and the one the shares below are on
     B  the same corner with the cover OFF, which is the state the staged
        explode reaches: covers travel |z| 1.45 front and 0.90 rear against
        the wheel's own 1.15 and 0.78, so the cover leaves by 300 mm at the
        front and 120 at the rear while the tire stays on its rim
     C  the corner inside the assembled Gen 10 preset, all nine modules

   Scene A, front corner, 47,760,958 first-hit pixels, by part:

     tires        46.66 %      covers        30.68 %      discs   10.26 %
     front-wheels  5.57 %      master-unit    3.69 %      calipers 3.14 %

   Scene A, rear corner, 46,530,359: tires 46.32, covers 29.45, rear-wheels
   17.37, park-brake 4.05, master-unit 2.81.

   Two things this decided, and both went the way the measurement said.

   THE VALVE STAYS AND IT GETS A THIRD PIECE. In scene A the clamp-in valve
   returns 4,765 first-hit pixels for the stem, 3,564 for the cap and 1,562
   for the nut, 9,891 in all against wheels-9's two-piece snap-in at 8,367,
   one method over both. The sealing grommet was drawn and then deleted: it
   is compressed inside the rim bore and can be a first hit from no direction
   at all, which is the same test that took wheels-9's caliper backing plate,
   banjo bolt and six pistons off the corner.

   THE REAR VALVE IS DIFFERENT AND AN EARLIER DRAFT OF THIS BLOCK HAD IT
   WRONG. It said the rear valve returns 1,405 pixels against zero because
   the rear well is deeper under its cover. Re-run on the hemisphere this
   block declares, the rear valve returns SEVEN pixels over three of 216
   directions in scene A, which is not visibility, it is the sampler catching
   a sliver. The rear cover does not leave a way in. What the rear valve does
   return is scene B: 3,501 for the stem, 3,303 for the cap and 1,153 for the
   nut over 38, 50 and 23 of 216 directions. So it is kept on a narrower
   claim than the one that was published. A tire at 5.6 bar needs a valve at
   every corner, the part is 104 triangles and three meshes a corner, and it
   earns them in the exploded and cover-off states rather than in the static
   silhouette. Anything that wanted a stronger claim than that would have to
   cut the service door in the cover as real geometry, which is a cover
   generation and not a detail.

   THE REROUTED SENSOR LEAD IS NOT A DECAL, AND ITS PUBLISHED NUMBER WAS THE
   REJECTED ROUTE'S. An earlier draft said 17,796 pixels on the front corner
   against wheels-9's 2,687. Measured on the route this file actually ships,
   scene A gives 9,198 for the tube, 973 for the sensor body and 160 for the
   clip, 10,331 in all, against wheels-9's 2,451 on the same run. Still four
   times as visible, and the reason the two disagree is instructive: the
   first route climbed at |z| 0.6470 out in the open, and the shipped route
   climbs at 0.6690 tucked against the caliper's outboard face, which is what
   keeps it out of autonomy-4's cable ring. The route that measured better
   here is the route that fouled a partner. Scene B is 21,779, 975 and 2,797.

   AND SCENE C IS THE LIMIT OF ALL OF IT, WHICH NOTHING IN THIS FILE SAID
   BEFORE. Inside the assembled car the front +z corner's 520 million first
   hits belong to body-9 at 58.75 percent, battery-10 at 20.37 and interior-6
   at 11.95, and every feature named above measures zero or near zero: the
   valve 0 pixels from all 216 directions, the lead 45 pixels over 4. The
   corner is behind a fairing. That does NOT make the corner a decal, because
   explode and the wheel-level camera flights are what the corner is drawn
   for and both are scene A or B. It does mean a module-alone visibility
   figure is a claim about the module and not about the car, and this project
   has been bitten twice by a number whose convention was implied rather than
   written down.

   ONE THING MEASURED AND THEN NOT BUILT. Raising the tire lathe from 48 to
   60 segments takes the chord sag on the crown from 0.760 mm to 0.487 and
   costs 2,688 triangles across four tires. The tire is the single largest
   first-hit surface on the car at 46.6 percent, so it is the one place a
   segment count would be defensible, and it is still not worth 0.27 mm of
   sag: it would take this module from 94.1 percent of its budget to 98.7
   with nothing left for the generation after. wheels-9 made the same call
   about barrels at 40 segments and it was right. ── */

/* Rotate a Y-axis mesh so its axis runs along z. */
function zc(mesh) { mesh.rotation.x = Math.PI / 2; return mesh; }

/* Lathe in the corner-local frame: profile is [radius, axialOffset] pairs
   in increasing axial order, where axialOffset = |z| - (corner center).
   deg creases the result: a molded step, a bead seat or a groove wall
   keeps its own normal instead of blurring into the surface beside it, and
   the triangle count does not move. Pass null to leave a surface smooth. */
function zlathe(profile, s, mat, seg, deg = EDGE) {
  const m = lib.lathe(profile.map(([r, a]) => [r, s * a]), mat, seg);
  m.rotation.x = Math.PI / 2;
  return deg == null ? m : lib.crease(m, deg);
}

/* A fastener head seated on a face whose normal runs along the corner axis.
   out is +1 for an outboard face and -1 for an inboard one; lib.fastener
   seats on y = 0 and grows along +y, so this puts the seating face on the
   plane the caller names and the head outside the part rather than in it. */
function zfast(r, mat, type, s, out, o) {
  const g = lib.fastener(r, mat, type, o);
  g.rotation.x = (s * out > 0 ? 1 : -1) * (Math.PI / 2);
  return g;
}

/* Position something at radius r and clock angle ang in the corner-local
   frame, at axial offset a, and turn it to stand along the radius. */
function zat(obj, r, ang, a, s, spin = true) {
  obj.position.set(Math.cos(ang) * r, Math.sin(ang) * r, s * a);
  if (spin) obj.rotation.z = ang;
  return obj;
}

/* A drafted, dished spoke rather than a flat plate on edge.

   sections are [radius, axial, halfWidth, halfThickness] and the closed
   eight-point ring swept through them gives a real section that tapers from
   a wide root at the hub face to a narrow waist and fans again where it
   lets into the well, with draft on every face. Cost is 2 (n-1) 8 triangles,
   64 for the five stations used here, against 12 for the box it replaces. */
const SPOKE_RING = [[1, 0], [0.72, 0.72], [0, 1], [-0.72, 0.72],
                    [-1, 0], [-0.72, -0.72], [0, -1], [0.72, -0.72]];
function spokeMesh(sections, s, mat, ang) {
  const ca = Math.cos(ang), sa = Math.sin(ang);
  const secs = sections.map(([r, a, hw, ht]) => SPOKE_RING.map(([u, v]) => {
    const y = hw * u;
    return [r * ca - y * sa, r * sa + y * ca, s * (a + ht * v)];
  }));
  return lib.crease(lib.loft(secs, mat, true), EDGE);
}

/* ── Tires ──
   135/75 R20 on a 4.5J rim, against wheels-9's 155/65 R20 on 5.0J.

   WHAT IS FROZEN, AND IT IS THE WHOLE RADIAL COLUMN. The rim seat radius is
   BEAD 0.2540, the flange lip is FLANGE 0.2665 and the crown is P.tireR
   0.355, so the section HEIGHT is 101.0 mm on both tires and the outside
   diameter is 0.7100 m on both. P.wheelY 0.355 puts the hub on the crown
   radius and the contact patch on y 0.0000 with no slack at either end, and
   seventeen modules read P.wheelY as live code. design/gen10.md section 4b
   and hard point 5b make the consequence explicit and this module obeys it: the
   section, the compound, the pressure and the construction are open and the
   DIAMETER IS NOT. Every axial coordinate below moved and not one radial
   coordinate did.

   Aspect ratio is therefore an output rather than an input. 101.0 mm of
   section height on a 135 mm section is 74.8 percent, so the size reads
   135/75 R20 for the same reason wheels-7's read 155/65: it is the only
   aspect that keeps the rolling radius on the constant.

   WHAT MOVED, in one table, local axial half-widths:

                        wheels-9    wheels-10
     bead seat            0.0635      0.05715   4.5J instead of 5.0J
     section maximum      0.0775      0.0675    135 mm instead of 155
     tread band edge      0.0570      0.0496    the shoulder radius station
     full-radius crown    0.0470      0.0409
     groove depth        5.5 / 5.0 mm  4.5 mm
     circumferential
       grooves               5           4      the center groove is deleted

   THE CENTER GROOVE IS DELETED AND THAT IS THE POINT OF THE PATTERN, not a
   simplification. A groove down the centerline splits the rib carrying the
   highest contact pressure into two half-ribs that can each squirm
   independently, and block squirm is hysteresis in the tread band. One
   continuous center rib is what a low-loss tread does, and what it costs is
   the one drainage path directly under the standing water a tire displaces
   first. The wet number is on the panel and it is worse.

   The rim protector and the section asymmetry are wheels-9's and the reason
   survives the narrowing: the outboard sidewall runs 2 to 6 mm off the inside
   of a cover that takes 100 percent of the first hits from r 0.048 to 0.312,
   so nothing may stand proud there and nothing there could be seen if it did.
   The rib stays on the INBOARD sidewall, which faces the arch. */
/* Gen 21: one tread architecture, three tires, two drawings. The crown and
   sidewall stations that scale with the section are scaled (k = section
   over the 135 they were drawn at); the bead stations ride their rims. The
   front profile is then shifted OFF with its barrel, which is what holds
   the inner face on the carried 0.6525 while the outer takes the full
   10 mm. The center tire is symmetric about its own wheel plane at z 0. */
function tireProfile(sect, rimw, lip, off, k) {
  const pts = [
    /* inboard sidewall: the half a viewer can see */
    [BEAD,   -rimw],          /* bead heel on the tapered rim seat */
    [0.2670, -lip - 0.0020],  /* rim protector, turned out over the flange lip */
    [0.2800, -lip],           /* casing level with the flange lip */
    [0.3040, -0.0658 * k],
    [0.3180, -sect],          /* SECTION MAX: front world 0.6525, rear z -0.0925 */
    [0.3340, -0.0645 * k],
    [0.3470, -0.0575 * k],
    /* crown: four grooves and three ribs, the center one continuous */
    [0.3535, -0.0496 * k],
    [0.3505, -0.0477 * k],
    [0.3505, -0.0446 * k],
    [P.tireR, -0.0409 * k],
    [P.tireR, -0.0228 * k],
    [0.3505, -0.0209 * k],
    [0.3505, -0.0171 * k],
    [P.tireR, -0.0152 * k],
    [P.tireR,  0.0152 * k],   /* continuous center rib, scaled with the tread */
    [0.3505,  0.0171 * k],
    [0.3505,  0.0209 * k],
    [P.tireR,  0.0228 * k],
    [P.tireR,  0.0409 * k],
    [0.3505,  0.0446 * k],
    [0.3505,  0.0477 * k],
    [0.3535,  0.0496 * k],
    /* outboard sidewall: the half the cover hides */
    [0.3470,  0.0575 * k],
    [0.3340,  0.0645 * k],
    [0.3180,  sect],          /* SECTION MAX: front world 0.7775, rear z +0.0925 */
    [0.3040,  0.0658 * k],
    [0.2790,  lip],           /* casing level with the flange lip the cover seats on */
    [BEAD,    rimw],
  ];
  return pts.map(([r, z2]) => [r, z2 + off]);
}
const TIRE_F = tireProfile(SECT, RIMW, LIP, OFF, 105 / 135);
const TIRE_R = tireProfile(SECT_R, RIMW_R, LIP_R, 0, 155 / 135);

function tirePart(s, rear) {
  const g = lib.part('tires', [0, 0, s * (rear ? 0.78 : 0.85)]);
  g.add(zlathe(rear ? TIRE_R : TIRE_F, s, M.rubber, TSEG));
  return g;
}

/* A CLAMP-IN VALVE, AND THE PRESSURE IS WHY IT IS NOT THE SNAP-IN ONE.
   wheels-9 drew a two-piece rubber snap-in valve, a stem and a grommet seat,
   which is the right part for the 4.4 bar it carried and is not rated for
   the 5.6 this tire runs: a snap-in valve is a rubber body retained by its
   own interference in the rim hole and the industry rating on it stops
   around 4.5 bar. The part that goes in a hole at 5.6 bar is a clamp-in: a
   brass stem through a sealing grommet, pulled down onto the OUTSIDE of the
   rim by a hex nut, with a screwed metal cap that is a second seal rather
   than a dust cover.

   THE GROMMET IS NOT DRAWN AND THAT IS DELIBERATE. It is compressed inside
   the rim bore between the stem flange and the well floor, so no part of it
   can be a first hit from any direction, and this file has form for paying
   triangles for exactly that: a caliper backing plate, six pistons and a
   banjo bolt all measured zero first hits in wheels-9 and two of the three
   came off. Three pieces, two materials, and the third material wheels-9
   spent on this valve comes back.

   It sits on the same radius as the cover's service door, because a full
   cover means the only way to a valve is through that door, and it is the
   one place on this wheel where the pressure argument is a part rather than
   a sentence. */
function valve(g, wellR, a, s, ang = Math.PI * 0.30) {
  const stem = lib.cyl(0.0040, 0.032, M.copper, 10);
  zat(stem, wellR - 0.0140, ang, a, s);
  stem.rotation.z += Math.PI / 2;
  g.add(stem);
  const nut = lib.cyl(0.0068, 0.0050, M.steel, 6);
  zat(nut, wellR - 0.0035, ang, a, s);
  nut.rotation.z += Math.PI / 2;
  g.add(nut);
  const cap = lib.cyl(0.0052, 0.0090, M.copper, 10);
  zat(cap, wellR - 0.0295, ang, a, s);
  cap.rotation.z += Math.PI / 2;
  g.add(cap);
}

/* ── Front wheel ──
   wheels-6's wheel narrowed to 4.5J and nothing else. One-piece CFRP:
   barrel, ten integral spokes, hub face with the co-cured titanium insert.
   The hub face inboard plane is at local -0.0475 as it has been since
   wheels-6, so it lands at world |z| 0.6925, which is the declared
   front-halfshaft-outboard interface and which this generation does not
   touch. Well floor at r 0.230, 24 mm deep, because no annulus stands in
   front of it. */
function frontWheelPart(s) {
  const g = lib.part('front-wheels', [0, 0, s * 1.15]);

  /* Barrel. Every RADIUS wheels-6 set is here to the digit, flange lip
     FLANGE 0.2665, bead seat BEAD 0.2540 and the 24 mm well floor at
     r 0.2300. Every AXIAL coordinate moved inboard with the 4.5J width, so
     the inboard flange lip goes from local -0.0700 to -0.06365 and the
     outboard lip the same distance the other way.

     TWO THINGS ARE NEW AND BOTH ARE THE PRESSURE.

     THE SEAT IS TAPERED NOW, AND IT SHOULD ALWAYS HAVE BEEN. wheels-6
     through wheels-9 drew the bead seat as a cylinder at constant BEAD,
     which is not what a rim is: a passenger rim seat rises at 5 degrees
     toward the flange, and that taper is the whole mechanism by which
     inflation pressure drives the bead up the ramp into an interference fit
     against the flange. On a 4.4 bar tire a flat seat is a drawing error. On
     a 5.6 bar tire it is the retention argument, so it is drawn: BEADT
     0.0021 of radius across a 23.9 mm seat, measured back as 5.02 degrees.

     THE HUMPS GET A PARTNER AT THE REAR. wheels-9 put a hump inboard of each
     front bead seat and none at all on the rear wheel, which reads as an H2
     rim at the front and a flat-base rim at the rear on a car whose two
     axles now run the same tire at the same pressure. Both wheels carry
     humps on both seats here.

     WHAT THE NARROWING BOUGHT AT THE PACK. The inboard flange lip moves from
     world |z| 0.6700 to 0.67635. Measured surface to surface against
     battery-7 as built, one method over both wheels, the wheel's one
     surviving pack clearance goes from 4.38 mm to 5.85 mm, measured surface
     to surface rather than nearest vertex, and it is still the only pack
     clearance this corner has. Six millimeters of flange does not buy six
     millimeters of clearance because the approach is diagonal, which is
     itself the reason to measure it rather than subtract it. Everything else
     about that corner is a penetration and it is on the discs panel. */
  g.add(zlathe([
    [FLANGE,         OFF - LIP],      /* flange lip crest, world 0.66405 */
    [0.2645,         OFF - 0.04975],  /* rolled corner under the lip */
    [0.2620,         OFF - 0.04805],
    [BEAD,           OFF - RIMW],     /* bead seat, flange end */
    [BEAD - BEADT_F, OFF - 0.02585],  /* bead seat, well end: 5 degrees across the 3.5J's 18.6 mm */
    [0.2570,         OFF - 0.0220],   /* safety hump */
    [BEAD - BEADT_F, OFF - 0.0185],
    [0.2300,         OFF - 0.0140],   /* drop well, 24 mm deep, 28 wide on the narrower barrel */
    [0.2300,         OFF + 0.0140],
    [BEAD - BEADT_F, OFF + 0.0185],
    [0.2570,         OFF + 0.0220],   /* safety hump */
    [BEAD - BEADT_F, OFF + 0.02585],
    [BEAD,           OFF + RIMW],
    [0.2620,         OFF + 0.04805],
    [0.2645,         OFF + 0.04975],
    [FLANGE,         OFF + LIP],
  ], s, M.carbon, WSEG));

  /* Hub face, the declared interface. The co-cured titanium insert spans
     |z| 0.6925 to 0.7125 exactly as it has since wheels-6, and what changed
     is that it is a machined face rather than a plain cylinder: a spigot
     recess for drivetrain-9's joint nose sunk 6.5 mm into the inboard face,
     a chamfer off the inboard corner, a through bore, and a nut land 2 mm
     below the outboard face so the five heads sit in a pocket. The two
     points at local -0.0475 ARE the front-halfshaft-outboard plane; moving
     either of them moves the interface, so they carry that comment. */
  g.add(zlathe([
    [0.0140, -0.0410],   /* through bore, inboard end */
    [0.0280, -0.0410],   /* spigot recess floor */
    [0.0300, -0.0475],   /* INTERFACE PLANE |z| 0.6925 */
    [0.0680, -0.0475],   /* INTERFACE PLANE |z| 0.6925 */
    [0.0740, -0.0440],   /* chamfer out to full diameter */
    [0.0740, -0.0310],
    [0.0700, -0.0275],   /* outboard chamfer, |z| 0.7125 */
    [0.0530, -0.0275],
    [0.0530, -0.0295],   /* nut land, pocketed 2 mm */
    [0.0180, -0.0295],
    [0.0140, -0.0330],
    [0.0140, -0.0410],
  ], s, M.steel, 24));

  /* Ten integral spokes, drafted and dished from the hub face out into the
     well. This is where a one-piece wheel reads as molded or does not. */
  for (let i = 0; i < 10; i++) {
    g.add(spokeMesh([
      [0.0700, -0.0340, 0.0215, 0.0120],
      [0.1050, -0.0300, 0.0150, 0.0105],
      [0.1600, -0.0225, 0.0122, 0.0092],
      [0.2050, -0.0140, 0.0135, 0.0078],
      [0.2305, -0.0140, 0.0180, 0.0066],   /* Gen 21: the well floor rides OFF */
    ], s, M.carbon, (i / 10) * Math.PI * 2));
  }

  /* Five lug nuts on the pocketed land, seen down the cover's inlet bore
     and nowhere else, which is why they are heads rather than cylinders. */
  for (let i = 0; i < 5; i++) {
    g.add(zat(zfast(0.0105, M.steel, 'hex', s, 1), 0.046, (i / 5) * Math.PI * 2, -0.0295, s, false));
  }

  /* Valve, through the well floor at r 0.2300, pointing inboard down the
     radius: see the valve helper above for why it is now a clamp-in. */
  valve(g, 0.2300, -0.0110, s);   /* Gen 21: through the offset well floor */

  /* Balance weights were drawn on the inboard flange and taken off again for
     the clearance reason in the barrel comment above. There is nowhere else
     on this wheel to put one: the outboard flange is under the cover and the
     well is inside the sealed tire cavity. */

  return g;
}

/* ── Rear wheel ──
   wheels-7's rear wheel with the rim narrowed to 4.5J alongside the front,
   and nothing else touched: the CONTRACT flange face is still at local
   -0.0900, its outer edge is still r 0.2440, and the lathe still leaves the
   annulus void. Over |z| 0.65 to 0.73 (axial -0.090 to -0.010) the profile
   radius is 0.248 or greater everywhere except the flange face itself, which
   lies exactly on the |z| 0.65 boundary plane. */
function rearWheelPart(s) {
  const g = lib.part('rear-wheels', [0, 0, s * 0.78]);

  /* THE CONTRACT IS A VERTEX CONTRACT AND THIS PROFILE IS WHERE IT LIVES.
     Over local -0.090 to -0.010, which is world |z| 0.650 to 0.730, every
     point below must sit at r < 0.155 or r > 0.235. The flange face plane at
     -0.0900 carries exactly two radii, 0.1500 and 0.2440, one either side of
     the band, and the straight edge between them crosses the band with no
     vertex on it, which is the same face drivetrain-9's rotor rings bolt to.

     THE NARROWING MOVES SIX POINTS INSIDE THE BAND AND EVERY ONE OF THEM WAS
     RE-SWEPT RATHER THAN ARGUED. Pulling the inboard bead seat from local
     -0.0635 to -0.05715 and the flange lip from -0.0700 to -0.06365 moves the
     whole inboard rim section 6.35 mm outboard, INTO the axial span the
     contract covers, which is the direction that could break it. It does not,
     because every one of those points is a rim radius: the smallest is the
     bead seat at BEAD - BEADT, 0.2519, which is 16.9 mm clear of the 0.235
     ceiling and is the figure the panel publishes. An earlier draft of this
     comment said 0.2517 and 16.7 mm, which is neither the constant nor the
     built vertex: the six rings the narrowing moved into the band sweep at
     r 0.26650, 0.26200, 0.25400, 0.25190, 0.25700 and 0.25190. The
     tightest approach anywhere in the band is unchanged and is still the
     drop-well floor at r 0.2480 and |z| 0.7220, 13.0 mm clear, and the sweep
     still returns zero breaching vertices. */
  g.add(zlathe([
    [0.2440,       -0.0900],   /* flange face outer edge, on the CONTRACT plane */
    [0.2540,       -0.0855],   /* fillet: from here out the profile clears r 0.235 */
    [0.2620,       -0.0790],
    [0.2650,       -0.0700],
    [FLANGE,       -LIP_R],    /* inboard bead flange lip: the pair's 4.5J, carried */
    [0.2620,       -0.0608],   /* radius under the lip */
    [BEAD,         -RIMW_R],   /* inboard bead seat, flange end */
    [BEAD - BEADT, -0.03325],  /* seat, well end: the same 5 degree taper */
    [0.2570,       -0.0295],   /* safety hump */
    [BEAD - BEADT, -0.0257],
    [0.2480,       -0.0180],   /* shallow drop well, forced by the annulus */
    [0.2480,        0.0180],
    [BEAD - BEADT,  0.0257],
    [0.2570,        0.0295],   /* safety hump */
    [BEAD - BEADT,  0.03325],
    [BEAD,          RIMW_R],
    [0.2620,        0.0608],
    [FLANGE,        LIP_R],
  ], s, M.carbon, WSEG));

  /* Co-cured titanium flange insert, 2 mm, spanning |z| 0.646 to 0.650 so
     the bolt heads bear on metal, chamfered on the inboard corner so the
     ring reads as a machined washer face. It now OWNS the whole flange face
     from r 0.1500 out to 0.2440: the CFRP shell used to draw the same
     annulus on the same plane, two coincident faces fighting for the same
     pixels on the one plane drivetrain-9 bolts to. The shell now starts at
     r 0.2440 and hands the face to the ring, which is also how the joint
     works: the bolts have to see metal all the way to the shell. */
  g.add(zlathe([
    [0.1500, -0.0940],
    [0.2400, -0.0940],
    [0.2440, -0.0922],
    [0.2440, -0.0900],   /* CONTRACT face plane |z| 0.650, out to r 0.2440 */
    [0.1500, -0.0900],
    [0.1500, -0.0940],
  ], s, M.steel, RSEG));

  /* Twelve flange bolts on the r 0.225 circle drivetrain-9's nuts share, all
     inboard of the 0.650 contract plane. They now SEAT on the titanium
     ring's inboard face at local -0.0940 and grow inboard from it. The bank
     as it stood was centered at -0.0960, which put its seating face at
     -0.0921, 1.9 mm INSIDE the 2 mm ring it is supposed to bear on: a bolt
     head grown into the laminate rather than bolted to it. Left as plain
     heads rather than promoted to lib.fastener because these twelve sit on
     the face drivetrain-9's rotor rings bolt to, and the rear tire and rear
     wheel share an explode vector, so nothing ever uncovers them. */
  const flangeBolts = lib.bolts(12, 0.225, 0.0065, M.steel);
  flangeBolts.rotation.x = Math.PI / 2;
  flangeBolts.position.z = s * -0.0979;
  g.add(flangeBolts);

  /* hub pilot, outboard of the annulus at |z| 0.730 to 0.756, drawn as a
     BORE seating over drivetrain-9's r 0.060 spigot with 0.5 mm of fit, with
     a lead-in chamfer at the mouth so the spigot has something to find */
  g.add(zlathe([
    [0.0605, -0.0100],
    [0.0720, -0.0100],
    [0.0720,  0.0160],
    [0.0605,  0.0160],
    [0.0605, -0.0072],
    [0.0648, -0.0100],   /* lead-in chamfer */
    [0.0605, -0.0100],
  ], s, M.steel, 24));

  /* clamp web closing the bore at |z| 0.732 to 0.7376, r 0.040 to 0.0605,
     which drivetrain-9's five r 0.048 studs pass through */
  g.add(zlathe([
    [0.0400, -0.0080],
    [0.0605, -0.0080],
    [0.0605, -0.0024],
    [0.0400, -0.0024],
    [0.0400, -0.0080],
  ], s, M.steel, 24));

  /* center web: ten spokes, pilot to drop well, every station outboard of
     local 0.000 so the whole web stands clear of the contract band */
  for (let i = 0; i < 10; i++) {
    g.add(spokeMesh([
      [0.0720,  0.0140, 0.0200, 0.0100],
      [0.1100,  0.0130, 0.0150, 0.0092],
      [0.1600,  0.0110, 0.0122, 0.0085],
      [0.2100,  0.0095, 0.0135, 0.0075],
      [0.2485,  0.0090, 0.0175, 0.0068],
    ], s, M.carbon, (i / 10) * Math.PI * 2));
  }

  /* five nuts seating on the clamp web's outboard face at local -0.0024 */
  for (let i = 0; i < 5; i++) {
    g.add(zat(zfast(0.0126, M.steel, 'hex', s, 1), 0.048, (i / 5) * Math.PI * 2, -0.0024, s, false));
  }

  /* A VALVE, WHICH THIS WHEEL HAS NEVER HAD. wheels-3, wheels-6, wheels-7 and
     wheels-9 all draw a valve in the FRONT wheel and none in the rear, while
     drawing one cover part with one service door and fitting it to all four
     corners. Two of the four covers therefore carried a service door over
     nothing, and the rear tire had no way to be inflated. It goes on the
     OUTBOARD side of the drop well at local +0.0060, not the inboard side the
     front uses, because the inboard side is 5 mm from drivetrain-9's rotor
     rings at |z| 0.7280: measured, the outboard placement stands the stem at
     |z| 0.7420 to 0.7500 and stands 12.80 mm off those rings measured
     surface to surface over both triangle sets. State the convention: 13.8
     mm is the AXIAL difference from 0.7418 to the rings' 0.7280 and this
     file does not publish one of those as a clearance, because the closest
     approach here is diagonal and lands a millimeter short of it. It is
     clocked to
     the same 54 degrees as the front so it lands between two spokes and under
     the cover's door, and the spoke half-width at that radius subtends
     3.7 degrees against the 18 it has either side. */
  valve(g, 0.2480, 0.0060, s);   /* carried: the outboard well side, under the cover door */

  return g;
}

/* ── Covers ──
   wheels-7's cover, one part for all four corners, following the rim and the
   section inboard. A shallow CFRP dish from a r 0.048 inlet bore out to
   r 0.312, seated on the rim flange lip at r 0.2665 and flaring outboard so
   its edge stands 1.5 mm proud of the tire section maximum. Every RADIUS is
   wheels-7's. The two axial numbers that own this part both moved with the
   narrowing, and they moved by different amounts:

     flange seat   local 0.0700 to 0.06365,  because the rim is 4.5J
     outer lip     local 0.0790 to 0.0690,   because the tire is 135 wide

   so the dish is 3.7 mm shallower from seat to lip than wheels-9's, and the
   cover's outer lip lands on world |z| 0.8090 instead of 0.8190. That lip is
   the outermost surface of the whole corner at both axles, which makes this
   part, not the tire, the one that owns the outer edge of the frontal-area
   integral. It also makes it the part that must never be sized by the tire's
   prose: 1.5 mm proud of the BUILT section maximum, measured. */
function coverPart(s, rear) {
  const g = lib.part('covers', [0, 0, s * (rear ? 0.90 : 1.45)]);

  /* Gen 21: one dish, two sets of numbers. The seat follows the rim and the
     lip follows the tire, the two rules this part has always run on; the
     front's numbers ride the 3.5J re-offset barrel and the 125 face, the
     center wheel's the carried 4.5J and the 155. Every radius is wheels-7's. */
  const C = rear
    ? { bell0: 0.0533, bell1: 0.0565, bell2: 0.0589, step: 0.0575, floor: 0.0571,
        rise: 0.0603, main: 0.0625, edge: 0.0634, land: 0.0619, seat: LIP_R,
        f1: 0.0712, f2: 0.0770, lip: 0.0790, roll: 0.0786, seal: 0.05815,
        spider: 0.0537, door: 0.0615, doorRim: 0.0631, lug: 0.0589 }
    : { bell0: 0.0383, bell1: 0.0415, bell2: 0.0439, step: 0.0425, floor: 0.0421,
        rise: 0.0453, main: 0.0475, edge: 0.0484, land: 0.0469, seat: OFF + LIP,
        f1: 0.0470, f2: 0.0555, lip: 0.0590, roll: 0.0586, seal: 0.0432,
        spider: 0.0387, door: 0.0465, doorRim: 0.0481, lug: 0.0412 };
  g.add(zlathe([
    [0.0480, C.bell0],  /* inlet throat, the published r 0.048 bore */
    [0.0512, C.bell1],  /* bell radius */
    [0.0620, C.bell2],  /* bell lip */
    [0.0740, C.step],   /* step down into the hub service recess */
    [0.1200, C.floor],  /* recess floor */
    [0.1300, C.rise],   /* riser onto the main face */
    [0.1800, C.main],   /* carried station */
    [0.2420, C.edge],
    [0.2440, C.land],   /* bayonet land, recessed 1.5 mm and 12 mm wide */
    [0.2560, C.land],
    [FLANGE, C.seat],   /* seats on the rim flange lip */
    [0.2850, C.f1],
    [0.3060, C.f2],
    [0.3120, C.lip],    /* OUTER LIP: front world 0.7790, center z 0.0940 */
    [0.3110, C.roll],   /* rolled edge, 1.1 mm of real section on the rim */
  ], s, M.carbon, RSEG));

  /* Peripheral seal, an elastomer bead in the flange seat, sunk flush as
     wheels-10 left it. */
  const seal = lib.torus(0.2660, 0.0055, M.rubber, RSEG, 5);
  seal.position.z = s * C.seal;
  g.add(seal);

  /* Inlet spider: five struts and a boss in the open brake-duct bore.
     The CENTER cover carries neither: suspension-21's spindle and nut own
     the axis its bore looks down, so the bore reads as a hub, not a hole,
     and a spider there would stand inside the axle. */
  if (!rear) {
    for (let i = 0; i < 5; i++) {
      g.add(zat(lib.cbox(0.036, 0.0055, 0.008, 0.0012, M.plasticLt),
                0.0320, (i / 5) * Math.PI * 2, C.spider, s));
    }
    const boss = zc(lib.cyl(0.0140, 0.0100, M.plasticLt, 14));
    boss.position.z = s * C.spider;
    g.add(boss);
  }

  /* Valve service door, on the valve's own radius and clock angle. */
  const door = zc(lib.cyl(0.0245, 0.0032, M.carbon, 18));
  zat(door, 0.2145, Math.PI * 0.30, C.door, s, false);
  g.add(door);
  const doorRim = lib.torus(0.0268, 0.0022, M.alu, 16, 4);
  zat(doorRim, 0.2145, Math.PI * 0.30, C.doorRim, s, false);
  g.add(doorRim);
  g.add(zat(zfast(0.0042, M.steel, 'hex', s, 1), 0.2145, Math.PI * 0.30, C.doorRim, s, false));

  /* Bayonet lock: one torx on the land, four lugs following their rim. */
  g.add(zat(zfast(0.0050, M.steel, 'torx', s, 1), 0.2500, Math.PI * 1.30, C.land, s, false));
  for (let i = 0; i < 4; i++) {
    g.add(zat(lib.cbox(0.009, 0.026, 0.0060, 0.0012, M.alu),
              0.2485, (i / 4) * Math.PI * 2 + 0.4, C.lug, s));
  }

  return g;
}

/* ── Front discs ──
   365 x 30 mm internally vented C/SiC, wheels-9's disc at wheels-9's
   coordinates and not one point of it moved. Two 6 mm friction plates at local -0.136..-0.130 and
   -0.112..-0.106, with 36 curved vanes in the 18 mm between them at
   r 0.145 to 0.1825. World: the ring spans |z| 0.604 to 0.634.

   Diameter is still blocked and the check was re-run rather than carried:
   suspension-4's upper front ball joint sits at radial 0.210 with a 0.024
   sphere, inner edge 0.186, clearing r 0.1825 by 3.5 mm, and translating a
   corner in z cannot change a radius. The lower joint's outer edge is still
   at radial 0.144 against the 0.145 ring bore. So the hat stays a deep top
   hat: the web turns in on the ring's inboard face at local -0.136 and the
   bell runs out at r 0.090 to the hub face plane at local -0.0475. */
function discPart(s) {
  const g = lib.part('discs', [0, 0, s * 0.45]);

  /* Two 6 mm friction plates. The four planes are wheels-7's arithmetic and
     do not move: |z| 0.604 and 0.634 are the faces the pads and the piston
     crowns land on, and the caliper straddles them with 0.5 mm a side, so
     nothing here may grow axially and nothing may pass r 0.1825, which
     stands 3.5 mm radially off suspension-9's upper front ball joint. The
     detail is therefore all subtractive: a 1.2 mm chamfer on all four
     corners of the section, which is the whole of what a ring this
     constrained is allowed.

     Each plate is a 5.6 mm carrier plus a 0.4 mm ceramic band standing on the
     face the pad sweeps, so the pair still measures 6.0 mm from |z| 0.604 to
     0.610 and 0.628 to 0.634 and the 18 mm passage between them is untouched.
     The band the torus replaced was worse than decorative: at r 0.164 with a
     5.5 mm tube centered ON the friction plane it reached local -0.1415, which
     is 5.0 mm INSIDE the caliper's inboard half, so the part that publishes a
     1.0 mm straddle was in fact interpenetrating by five. */
  const c = 0.0012;
  for (const [a0, a1, band] of [[-0.1356, -0.1300, -0.1360],
                                [-0.1120, -0.1064, -0.1060]]) {
    g.add(zlathe([
      [0.1450 + c, a0],
      [0.1825 - c, a0],
      [0.1825, a0 + c],
      [0.1825, a1 - c],
      [0.1825 - c, a1],
      [0.1450 + c, a1],
      [0.1450, a1 - c],
      [0.1450, a0 + c],
      [0.1450 + c, a0],
    ], s, M.darkSteel, RSEG));
    const face = zlathe([[0.1470, 0], [0.1815, 0]], s, M.plasticLt, RSEG, null);
    face.position.z = s * band;
    g.add(face);
  }
  /* A scribed wear line was drawn on the outer edge of each plate and then
     taken off again. It is 0.6 mm deep on a 30 mm ring edge that subtends
     about 16 pixels when the disc fills a panel, so the line would be under
     a third of a pixel, and it cost 1,536 triangles across the two discs.
     Measure the feature against the scale it is drawn at before paying for
     it: that budget went to the vanes and the hat, which do read. */

  /* Thirty six curved internal vanes in the 18 mm passage, about 188 m3/h at
     747 rpm against wheels-7's 250 through 24 mm. They were straight boxes
     set on a tangent, which is a vane in name only: a lofted blade through
     three radial stations gives the real curve, and the passage mouths are
     what a viewer sees of them through the 18 mm gap at r 0.1825. */
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const secs = [[0.1455, 0.0000], [0.1640, 0.0062], [0.1825, 0.0170]].map(([r, tan]) => {
      const ang = a + tan / r;
      const cx = Math.cos(ang) * r, cy = Math.sin(ang) * r;
      const tx = -Math.sin(ang), ty = Math.cos(ang);
      return [[0.0030, 0.0090], [-0.0030, 0.0090], [-0.0030, -0.0090], [0.0030, -0.0090]]
        .map(([w, h]) => [cx + tx * w, cy + ty * w, s * (-0.1210 + h)]);
    });
    g.add(lib.crease(lib.loft(secs, M.darkSteel, true), EDGE));
  }

  /* The hat. It was five points and a straight bell; a real one has a radius
     out of the web, a machined bell, and a bolt flange with heads on it. The
     flange face at local -0.0475 is world |z| 0.6925, which is the wheel's
     hub face plane, so the disc and the wheel meet face to face there rather
     than the disc stopping in mid air near it. */
  g.add(zlathe([
    [0.1450, -0.1360],  /* web on the ring's inboard face, |z| 0.604 */
    [0.1150, -0.1360],
    [0.1030, -0.1322],  /* radius out of the web */
    [0.0940, -0.1215],
    [0.0900, -0.1050],  /* bell around the upright hub boss, r 0.054 */
    [0.0900, -0.0640],
    [0.0860, -0.0570],
    [0.0820, -0.0520],
    [0.0780, -0.0475],  /* bolts to the wheel hub face at |z| 0.6925 */
    [0.0620, -0.0475],
    [0.0600, -0.0500],  /* flange rim */
  ], s, M.alu, RSEG));

  /* Five hat bolts. They SEAT on the flange face at local -0.0475, which is
     the |z| 0.6925 plane the wheel's hub face lands on, and grow inboard
     because the wheel is on the other side. Seating them on -0.0500, which
     is the flange's back edge rather than a face, left five heads floating
     2.5 mm off the part they bolt: the seating plane has to be a face that
     exists, and this file has caught that twice today. */
  for (let i = 0; i < 5; i++) {
    g.add(zat(zfast(0.0080, M.steel, 'hex', s, -1), 0.0700, (i / 5) * Math.PI * 2 + 0.3, -0.0475, s, false));
  }

  return g;
}

/* ── Front calipers ──
   Fixed monobloc at 160 degrees, straddling the 30 mm ring with a 0.5 mm
   pad gap each side: halves centered at local -0.1515 and -0.0905, which is
   world |z| 0.5885 and 0.6495, bridge outside r 0.1825 at 0.619, six piston
   crowns landing on the friction faces at 0.604 and 0.634. Bracketed back
   to a pad on the inboard face of the front upright at |z| 0.6475, which is
   suspension-9's part and is an interface requirement rather than a
   verified clearance. Static: never rotates. The halves bottom out at
   y 0.3499 and the PART now bottoms out 15.3 mm below that, at y 0.3346,
   because the rerouted wear sensor lead dips under them. wheels-9's part
   stopped at 0.3459 and this comment carried its 0.346 forward for a
   generation in which it stopped being true. Both are clear of battery-7's
   lid at y 0.31, and measured surface to surface the part stands 33.06 mm
   off battery-10's floor lid with the lead as the closest point. */
function caliperPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('calipers', [-0.3, 0, s * 0.2]);

  const CA = Math.PI * (160 / 180);
  const cx = x + Math.cos(CA) * 0.175;
  const cy = P.wheelY + Math.sin(CA) * 0.175;
  const tanX = Math.cos(CA + Math.PI / 2), tanY = Math.sin(CA + Math.PI / 2);

  /* Nothing below is allowed to change the CASTING's bounding extents. The
     halves stand 0.5 mm off the ring at local -0.1365 and -0.1055 and their
     lower edge is y 0.3499, which is the plane the panel publishes, against
     battery-7's lid at 0.31. The PART is 15.3 mm lower than the casting at
     y 0.3346 and the lead is what put it there; see the header. lib.cbox
     holds a box's face planes exactly and only takes material off the twelve
     edges, so chamfering is free of all of that. */
  for (const az of [-0.1515, -0.0905]) {
    const half = lib.cbox(0.090, 0.130, 0.030, 0.0045, M.caliper);
    half.position.set(cx, cy, s * (FRONTZ + az));
    g.add(half);
    /* two cast stiffening ribs down the outer face of each half */
    for (const t of [-0.042, 0.042]) {
      const rib = lib.cbox(0.062, 0.014, 0.0055, 0.0012, M.caliper);
      rib.position.set(cx + tanX * t, cy + tanY * t, s * (FRONTZ + az + (az < -0.12 ? -0.0177 : 0.0177)));
      g.add(rib);
    }
  }

  /* THREE bridges rather than one slab. A monobloc is bridged where it has
     to be and open where the pads come out, and the two windows the change
     opens are the only way anyone ever sees a pad or a piston on this car.
     The three together span the same 0.100 the slab did, so the extents and
     the r 0.1825 stand-off are unchanged. */
  const brX = x + Math.cos(CA) * 0.203, brY = P.wheelY + Math.sin(CA) * 0.203;
  for (const t of [-0.037, 0, 0.037]) {
    const br = lib.cbox(0.030, 0.026, 0.110, 0.0035, M.caliper);
    br.position.set(brX + tanX * t, brY + tanY * t, s * (FRONTZ - 0.121));
    br.rotation.z = CA;
    g.add(br);
  }

  /* Pads, sitting on the ring faces at local -0.136 and -0.106 where the
     piston crowns used to land directly, with the rollback seals' own 0.1 mm
     between pad and disc.

     WHAT A PAD CAN AND CANNOT BE HERE, measured rather than assumed. The
     halves' inner faces stand 0.5 mm off the ring at local -0.1365 and
     -0.1055, those two planes are published, and the body is a solid block
     across the pad's whole footprint. So a 5.8 mm pad drawn onto the disc
     face has 5.4 mm of itself inside the caliper body: only the 0.4 mm at
     the disc is ever a first hit, which is also exactly what a real caliper
     shows of a pad from outside. The pad earns its 44 triangles on that
     sliver and it stays. Its 4 mm backing plate did not: sitting behind the
     pad it fell wholly between local -0.1055 and -0.0755, entirely inside
     the body, and an orthographic sweep of 216 directions at 1.11 mm per
     pixel returned ZERO first hits for it in the module alone and zero in
     the full Gen 9 car. That is 176 triangles of decal and they are gone.
     Drawing the plate properly needs a pad window cut in the body, which is
     a caliper redesign and not a detail pass. */
  const px = x + Math.cos(CA) * 0.162;
  const py = P.wheelY + Math.sin(CA) * 0.162;
  for (const az of [-0.1390, -0.1030]) {
    const pad = lib.cbox(0.034, 0.104, 0.0058, 0.0010, M.plasticLt);
    pad.position.set(px, py, s * (FRONTZ + az));
    g.add(pad);
  }

  /* Six pistons, three a side, in their bores behind the pads. They are in
     the body the way a piston is in a bore, so none of the six is ever a
     first hit: 0 pixels each over 216 directions. Two of the six already
     measured 0 before the pads went in and the other four measured 130, 112,
     17 and 7, so moving them 6 mm back off the disc cost almost nothing that
     was visible and bought a pad that is. Drawing them properly is the same
     pad window the backing plates would need, and that is a caliper
     redesign. */
  for (const az of [-0.1455, -0.0965]) {
    for (const t of [-0.038, 0, 0.038]) {
      const p = zc(lib.cyl(0.016, 0.012, M.steel, 12));
      p.position.set(px + tanX * t, py + tanY * t, s * (FRONTZ + az));
      g.add(p);
    }
  }

  /* Two pad retaining pins through the bridge windows, which is what holds
     the pads in and what a mechanic pulls first. */
  for (const t of [-0.019, 0.019]) {
    const pin = zc(lib.cyl(0.0035, 0.082, M.steel, 8));
    pin.position.set(brX + tanX * t - Math.cos(CA) * 0.012,
                     brY + tanY * t - Math.sin(CA) * 0.012, s * (FRONTZ - 0.121));
    g.add(pin);
  }

  /* One bleed nipple per half, standing vertically on the top face of each
     body, because a bleed screw has to be the highest point of its gallery
     or it bleeds nothing. The first draft ran them along the caliper's own
     radius at radial 0.113, which is 62 mm the WRONG way: that is toward the
     wheel center, so both nipples came out of the BOTTOM of the caliper half
     buried to the shoulder. Seating face at cy + 0.065, which is the box's
     top; the pair tops out at y 0.4994 against the bracket's 0.5365, so the
     caliper's published extents do not move. */
  for (const az of [-0.1515, -0.0905]) {
    const nip = lib.cyl(0.0038, 0.014, M.steel, 8);
    nip.position.set(cx - 0.024, cy + 0.0720, s * (FRONTZ + az));
    g.add(nip);
    const cap = lib.cyl(0.0052, 0.0055, M.plastic, 6);
    cap.position.set(cx - 0.024, cy + 0.0817, s * (FRONTZ + az));
    g.add(cap);
  }

  /* Two-lug bracket back to the upright, |z| 0.646 to 0.6485, outboard of
     the ring face at 0.634 and landing on the upright's inboard face at
     0.6475. suspension-9 owns that face; this is the interface it must hold.
     The two runs are drawn with 8 sections rather than the 18 the helper
     defaults to, which is 320 triangles back for a lug nobody sees curve. */
  g.add(lib.tube([
    [cx + 0.008, cy + 0.055, s * 0.6460],
    [1.360, 0.487, s * 0.6465],
    [1.425, 0.528, s * 0.6475],
  ], 0.010, M.castAlu, false, 8));
  g.add(lib.tube([
    [cx + 0.008, cy - 0.050, s * 0.6460],
    [1.360, 0.445, s * 0.6465],
    [1.425, 0.488, s * 0.6475],
  ], 0.010, M.castAlu, false, 8));
  const pad = lib.cbox(0.024, 0.070, 0.014, 0.0025, M.castAlu);
  pad.position.set(1.428, 0.498, s * 0.647);
  g.add(pad);
  /* the two bolts that make it a bolted joint rather than two touching faces */
  for (const dy of [-0.022, 0.022]) {
    const b = lib.fastener(0.0072, M.steel, 'hex');
    b.position.set(1.428, 0.498 + dy, s * 0.640);
    b.rotation.x = s > 0 ? -Math.PI / 2 : Math.PI / 2;
    g.add(b);
  }

  /* Brake line crossover boss spanning |z| 0.5765 to 0.6615 so it seats into
     the top of BOTH halves; the master unit terminates in its bore. The
     banjo eye and its bolt are what a line actually ends in.

     A BANJO BOLT HAS TO BE WIDER THAN THE BORE IT CLAMPS. At r 0.0068 the
     head measured 6.8 mm across the flats against the boss's own 8.0 mm
     radius, so the whole head sat inside the tube it was supposed to be
     holding: zero first hits over 216 directions, with only 0.3 mm of flange
     rim showing. It is now r 0.0110, which puts the flange on 13.42 mm, the
     same rim the banjo eye already carries at 0.0092 plus 0.0042, and the
     nearest caliper surface over the head's own |z| 0.6242 to 0.6325 is
     17.02 mm away on the bracket, so nothing else moves. The boss running
     through it is the fluid path, which is what makes a banjo bolt hollow. */
  const fitting = zc(lib.cyl(0.008, 0.085, M.steel, 10));
  fitting.position.set(cx, cy + 0.070, s * (FRONTZ - 0.121));
  g.add(fitting);
  const banjo = lib.torus(0.0092, 0.0042, M.steel, 12, 5);
  banjo.position.set(cx, cy + 0.070, s * 0.620);
  g.add(banjo);
  const bb = lib.fastener(0.0110, M.steel, 'hex');
  bb.position.set(cx, cy + 0.070, s * 0.6242);
  bb.rotation.x = s > 0 ? Math.PI / 2 : -Math.PI / 2;
  g.add(bb);

  /* Pad wear sensor, and its lead.

     THE LEAD USED TO RUN THROUGH THE DISC AND THAT IS THE DEFECT THIS
     MODULE FOUND ON ITS OWN CORNER. Swept mesh by mesh inside this module,
     wheels-9's 2.6 mm sensor lead crosses wheels-9/discs in 64 triangle
     pairs, 5.64 mm into the outboard friction plate, 4.32 mm through the
     ceramic band face and 0.96 mm through a vane, on each side. Its second
     waypoint sat at radial 0.1545 and |z| 0.618, which is inside the ring's
     r 0.145 to 0.1825 band and inside the 18 mm vane passage between the two
     plates: the lead was threaded through a part that turns at 747 rpm and
     runs at 800 C. Nothing catches this. SPEC.md leaves part pairs inside one
     module to tools/smoke.sh, and tools/smoke.sh checks metadata against
     geometry and not geometry against itself, so the whole-module sweep had
     to be written to see it and it is worth writing.

     The route now goes UNDER the caliper, out past the disc, and then up the
     caliper's own outboard face to a connector beside the bleed nipples. It
     never leaves the caliper, which is also what a wear sensor lead does on a
     real corner: it is captive to the caliper as far as a bulkhead and it is
     not a chassis harness. Every waypoint is placed against a measured
     constraint rather than drawn by eye.

       the two caliper halves are solid boxes over y 0.3499 to 0.4799, so the
       run holds y at or below 0.3400 until it is outboard of them in |z|
       the ring's outboard face is at |z| 0.634, so the run reaches 0.6480
       before its radius comes inside 0.1825
       the caliper's outboard half ends at |z| 0.6645, so the climb sits on
       0.6690, 4.5 mm proud of the face it is clipped to
       autonomy-4/ring passes this corner at y 0.3925 to 0.4355 and |z| 0.5968
       to 0.6623, and the climb crosses that y band 6.7 mm outboard of it

     That last line is the one that took two attempts. A first route climbed
     to the bracket at |z| 0.6470 and put the lead straight through the ring:
     autonomy-4/ring x wheels/calipers went from 494 crossing triangle pairs
     to 578 while the depth stayed at 42.36 mm, which is design/gen10.md hard
     point 8's "a pair that gains crossings is this generation's" arriving
     immediately. Re-swept on this route, that pair is back to 494 and this
     module crosses its own discs in ZERO triangle pairs. */
  const sense = lib.cbox(0.014, 0.012, 0.010, 0.002, M.sensor);
  sense.position.set(cx - 0.030, cy - 0.063, s * 0.598);
  g.add(sense);
  g.add(lib.tube([
    [cx - 0.030, cy - 0.063, s * 0.5980],
    [1.2520, 0.3400, s * 0.6080],
    [1.2620, 0.3380, s * 0.6480],
    [1.2900, 0.3400, s * 0.6690],
    [1.2950, 0.4100, s * 0.6690],
    [1.2980, 0.4720, s * 0.6650],
  ], 0.0026, M.plastic, false, 10));
  const cl = lib.cbox(0.009, 0.013, 0.008, 0.0016, M.plastic);
  cl.position.set(1.2950, 0.4100, s * 0.6690);
  g.add(cl);

  return g;
}

/* ── Park brake, rotating half ── unchanged from wheels-7 through wheels-9,
   rear corner, not a coordinate touched. */
function parkDrumPart(s) {
  const g = lib.part('park-brake', [0, 0, s * 0.78]);

  /* The drum. r 0.100 is a hard ceiling on this whole device: it is the
     figure the panel publishes and it is what leaves 28.8 mm to
     drivetrain-9's deepest corner inverter at r 0.1288. Nothing below
     touches it. What the pass adds is a rolled mouth, a stiffening bead
     around the band, and a real neck onto the hub pilot instead of a cone. */
  g.add(zlathe([
    [0.0900, -0.0820],
    [0.0930, -0.0660],   /* stiffening bead around the friction band */
    [0.0900, -0.0560],
    [0.0900, -0.0340],
    [0.0800, -0.0180],
    [0.0740, -0.0110],
    [0.0720, -0.0080],   /* lands on the wheel's hub pilot wall */
  ], s, M.castAlu, 32));

  const lip = lib.torus(0.090, 0.004, M.castAlu, 32, 5);
  lip.position.z = s * -0.082;
  g.add(lip);

  return g;
}

/* ── Park brake, static half ── unchanged from wheels-7 through wheels-9,
   rear corner. What moved is the case behind it rather than the device: the
   park-brake panel re-solves the 30 percent grade against the TIRE rather
   than against the drum and finds it does not hold nose down.
   Central boss at r 0.066, backplate at r 0.100, shoe web threading r 0.073
   to 0.089, shoes phased to 1.214 and 4.356 radians. World planes: boss
   0.6395, plate 0.6315, shoes 0.682, gearmotor 0.616. */
function parkBackPart(x, z, sExp) {
  const s = sExp !== undefined ? sExp : Math.sign(z);   /* Gen 21: the center wheel sits at z 0 */
  const g = lib.part('park-brake', [0, 0, s * 0.78]);
  g.position.set(x, P.wheelY, z);

  /* Mounting boss with a real bolt flange, in place of a plain cylinder.
     Spans local -0.1085 to -0.0925 as before, so |z| 0.6315 to 0.6475 and
     the published 0.6395 center are all untouched. */
  g.add(zlathe([
    [0.0180, -0.1085],
    [0.0660, -0.1085],
    [0.0660, -0.0985],
    [0.0600, -0.0945],
    [0.0480, -0.0925],
    [0.0180, -0.0925],
    [0.0180, -0.1085],
  ], s, M.darkSteel, 20));
  const bosBolts = lib.bolts(4, 0.0520, 0.0055, M.darkSteel);
  bosBolts.rotation.x = Math.PI / 2;
  bosBolts.position.z = s * -0.1118;
  g.add(bosBolts);

  /* Backplate. It was a flat 7 mm disc; it is now a pressed plate with a
     turned rim and an inspection plug, still centered on local -0.1085 and
     still stopping at r 0.100, which is the ceiling that leaves 28.8 mm to
     drivetrain-9's deepest corner inverter. */
  g.add(zlathe([
    [0.0640, -0.1120],
    [0.0740, -0.1098],
    [0.0950, -0.1098],
    [0.1000, -0.1062],
    [0.0760, -0.1050],
    [0.0640, -0.1072],
  ], s, M.darkSteel, 32));
  const plug = zc(lib.cyl(0.0085, 0.0050, M.plastic, 10));
  plug.position.set(0.0500, -0.0620, s * -0.1120);
  g.add(plug);

  for (const a of [1.214, 4.356]) {
    const shoe = lib.mesh(
      new THREE.TorusGeometry(0.081, 0.008, 6, 16, Math.PI * 0.72),
      M.steel
    );
    shoe.rotation.z = a;
    shoe.scale.z = 1.375;          /* 16 mm web drawn to the 22 mm band width */
    shoe.position.z = s * -0.058;
    g.add(shoe);
    /* friction lining on the band face, a separate ring so the shoe reads
       as steel carrying a lining rather than as one homogeneous arc */
    const lin = lib.mesh(
      new THREE.TorusGeometry(0.0872, 0.0022, 4, 16, Math.PI * 0.70),
      M.plasticLt
    );
    lin.rotation.z = a + 0.01;
    lin.scale.z = 4.6;
    lin.position.z = s * -0.058;
    g.add(lin);
    const arm = lib.cbox(0.012, 0.020, 0.046, 0.0025, M.darkSteel);
    arm.position.set(Math.cos(a + 0.36) * 0.078, Math.sin(a + 0.36) * 0.078, s * -0.082);
    arm.rotation.z = a + 0.36;
    g.add(arm);
  }

  /* Gearmotor, with the housing and connector a dry actuator actually has,
     and its lead clipped to the backplate rather than ending in space. */
  /* Gen 21: the gearmotor clocks from (-0.044, -0.068) to (0.068, -0.044)
     so it stands forward of suspension-21's fork plate, whose band starts
     at x -1.395; a drum actuator clocks anywhere on the backplate. */
  const motor = zc(lib.cyl(0.015, 0.040, M.plastic, 14));
  motor.position.set(0.068, -0.044, s * -0.124);
  g.add(motor);
  const gearbox = lib.cbox(0.028, 0.022, 0.018, 0.0030, M.darkSteel);
  gearbox.position.set(0.068, -0.044, s * -0.1130);
  g.add(gearbox);
  const spindle = zc(lib.cyl(0.005, 0.050, M.steel, 8));
  spindle.position.set(0.068, -0.044, s * -0.084);
  g.add(spindle);
  /* Lead to the backplate, clipped. Every waypoint and the clip itself are
     held inside r 0.100, which is this device's published ceiling and what
     leaves 28.8 mm to drivetrain-9's corner inverter: the first routing drawn
     here ran the lead to r 0.1028 and the clip to r 0.1052, which is a cable
     leaving the bore the panel says the whole device stays inside. */
  g.add(lib.tube([
    [0.068, -0.0640, s * -0.1290],
    [0.048, -0.0800, s * -0.1215],
    [0.024, -0.0860, s * -0.1130],
  ], 0.0026, M.plastic, false, 6));
  const cl = lib.cbox(0.009, 0.012, 0.008, 0.0016, M.plastic);
  cl.position.set(0.024, -0.0860, s * -0.1130);
  g.add(cl);

  return g;
}

/* ── Brake-by-wire unit ──
   THE ONE PART THIS GENERATION TOUCHES, and it touches only the two aft
   harnesses on it. The box itself, the plunger block, the reservoir, the ECU
   with its heatsink and connector shells, the conduit and the forward
   hydraulic pair are wheels-10's at wheels-10's coordinates. Every endpoint
   is wheels-10's too: the forward pair still terminates inside the caliper
   crossover fittings at (1.286, 0.484, +-0.620) and the two aft harnesses
   still land on the park-brake gearmotor at (-1.494, 0.287, +-0.616). Both
   terminations are drawn as interpenetrations because a connector is one.

   WHAT CHANGED IS THE MIDDLE OF THE TWO AFT RUNS AND THE CORRIDOR THEY LIVE
   IN. wheels-7 put them at |z| 0.74 through the flank, which was 65 mm of air
   between battery-10's rail at 0.7800 and body-9's rocker at 0.8450, and
   design/gen11.md section 7 fills that air with one merged structural sill.
   RE-MEASURED, EVERY ROW, ON THE MODULES A gen11 PRESET ACTUALLY BUILDS. An
   earlier draft of this table carried the header "measured on the built Gen 11
   modules" over four rows taken from hv-4, which this preset does not build,
   and one row taken from design/gen11.md's prose rather than from the pan the
   body draws. Both faults are the same fault and it is the one this project
   keeps paying for: a number is only measured against the thing it names.
   Enumerated from js/registry.js plus the -11 modules on disk, the corridor
   section reads

     |z| 0.6174   suspension-9/air-supply, outermost point of its whole run,
                  at (0.0000, 0.3270, 0.6174)
     |z| 0.6400   THE NEW CORRIDOR CENTERLINE, both runs                 <-
     |z| 0.6443   harness outer skin. NOT 0.6435: the centerline is a
                  Catmull-Rom through control points at |z| 0.640 and it
                  overshoots them by 0.3 mm, so 0.640 plus the 3.5 mm radius
                  understates the skin. Measured on the built tube
     |z| 0.6477   routing clip ferrule, the outermost thing on this part <-
     |z| 0.6600   battery-11 SILL INBOARD WALL, and it is continuous: two
                  triangles from x -1.0600 to 1.0800 spanning y 0.3020 to
                  0.4200, so the keep-out is real material at every station
     |z| 0.6600   body-11 FLOOR PAN inboard edge, y 0.4200 to 0.5600. The
                  earlier draft of this table said 0.6560, which is
                  design/gen11.md section 6's figure and not the built pan:
                  body-11 draws it on the same 0.6600 plane as the sill, so
                  the pan is 4.0 mm further outboard than the prose and the
                  two members are flush rather than stepped
     |z| 0.6961   battery-11 sill, the innermost of its rib planes, which run
                  from here out to 0.7439 before the outer face at 0.7800
     |z| 0.7075   battery-11 sill, one of those rib planes, and the one the
                  vertex scan below mistook for the section's inner wall
     |z| 0.7440   battery-11 floor lid, widest point, at x +-1.0400. The
                  earlier draft said x 1.05

   and in y, at the mid-car station where the corridor is tightest:

     y 0.3020   battery-11 floor lid, top of its outboard step under the run.
                The earlier draft said 0.2900, which is 12.0 mm low and is
                the row the 15.49 mm lid clearance is measured from
     y 0.3080   battery-11 floor lid top inboard, which IS the cabin floor
     y 0.3175   harness and clips, LOWEST point in the corridor       <-
     y 0.3446   harness and clips, highest point in the corridor      <-
     y 0.4200   battery-11 sill top and body-11 floor pan underside, and
                also hv-11/zonal's floor, which is the LOWEST hv material
                anywhere over this corridor and sits at |z| 0.5100 to 0.6310
                over x -1.0990 to -0.9898
     y 0.4350   hv-11/spine underside, |z| 0.6140 to 0.6600, which is the
                lowest hv member spanning the run's own |z| band
     y 0.4368   hv-11/hv-runs, |z| 0.5513 to 0.6600
     y 0.4442   hv-11/bywire-feeds, |z| 0.4980 to 0.6600

   THE hv ROWS ARE THE ONES THAT CHANGED THE MOST AND THE STORY UNDER THEM
   CHANGED WITH THEM. This corridor was chosen against hv-4, whose floor
   perimeter ring ran the length of the car at |z| 0.6360 to 0.6940 over
   y 0.3510 to 0.3626 with its by-wire feeds outboard of that, and the whole
   argument for taking y 0.326 rather than y 0.390 was that it tucked UNDER
   that ring. hv-11 then landed and deleted the ring: it carries no member
   below y 0.4200 anywhere over this section, its lowest floor part is the
   zonal floor at 0.4200, and swept part by part hv-11 has ZERO penetrating
   pairs against this module, against wheels-10 as well. So the corridor no
   longer sits under anything. It sits in an empty rocker corner 75.4 mm
   below the lowest hv material over it, and the nearest hv-11 part to the
   corridor run, surface to surface, measures 80.94 mm away.

   THE CHOICE SURVIVES ITS OWN JUSTIFICATION GOING AWAY, and that is worth one
   line rather than a quiet edit. Two heights were built and swept before this
   one was taken: y 0.390 sat 82 mm above a cabin floor at 0.3020 in a car
   whose whole generation is a height budget, and against the hv of the day it
   was still 2.00 mm penetrated. y 0.326 sits 18.0 mm above the cabin floor
   plane at 0.3080 and 24.0 mm above the lid's outboard step at 0.3020, which
   is where a rocker trim goes on a real car. Against hv-4 that choice took
   hv-4/ring from wheels-10's 444 crossings at 21.13 mm to 82 at 3.69, and
   against the hv-11 the preset builds it takes it to zero. It is NOT on the
   lid: design/gen11.md section 5 forbids that, and the closest the part comes
   to the lid is 15.49 mm.

   THAT WALL WAS NEARLY MISSED AND THE WAY IT WAS NEARLY MISSED IS WORTH THE
   THREE LINES. Scanned as VERTICES, the sill puts a vertex on |z| 0.6600 at
   exactly two x stations, -1.0600 and 1.0800, 72 of them and nothing between,
   and the nearest plane a mid-car station reports is 0.7075. A plate 2.140 m
   long has vertices only at its ends. An earlier draft of the panel below
   published that reading and concluded the corridor was 63 mm wide mid-car.
   Re-measured on TRIANGLES it is 12.30 mm wide at every station: the nearest
   point on this module is a clip ferrule at (0.0395, 0.3257, -0.6477) and the
   sill face it faces is at (0.0395, 0.3257, -0.6600). Same class of error as
   SPEC.md's third fault: the question was asked of the wrong primitive and
   the answer was quiet and wrong. */
/* A routing clip on a run: a ferrule around the line with a tab standing off
   it, placed at p with the line's local tangent dir. Every long run on this
   car used to cross the whole floor unsupported, which is the one thing a
   brake line is never allowed to do. */
function lineClip(p, dir, r, mat) {
  const grp = new THREE.Group();
  grp.add(lib.cyl(r + 0.0042, 0.0110, mat, 8));
  const tab = lib.cbox(0.0050, 0.0150, 0.0080, 0.0012, mat);
  tab.position.y = 0.0125;
  grp.add(tab);
  const d = new THREE.Vector3(dir[0], dir[1], dir[2]).normalize();
  grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
  grp.position.set(p[0], p[1], p[2]);
  return grp;
}

/* Clip a polyline at the given fractional indices into its point list. */
function clipRun(g, pts, fracs, r, mat) {
  for (const f of fracs) {
    const i = Math.min(pts.length - 2, Math.floor(f));
    const t = f - i;
    const a = pts[i], b = pts[i + 1];
    g.add(lineClip([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t],
                   [b[0] - a[0], b[1] - a[1], b[2] - a[2]], r, mat));
  }
}

function masterUnitPart() {
  const g = lib.part('master-unit', [0.5, 0.35, 0]);

  /* The pedal unit, the plunger block and the reservoir were four plain
     boxes and a cylinder. Same envelope, same positions, chamfered so the
     softboxes find their edges, plus the hardware a dry unit has to have:
     a filler cap and a level connector on the reservoir, connector shells
     and a heatsink on the ECU, and four studs on the pedal box flange. */
  const body = lib.cbox(0.11, 0.10, 0.11, 0.006, M.plastic);
  body.position.set(0.95, 0.62, -0.35);
  g.add(body);

  const block = lib.cbox(0.07, 0.08, 0.06, 0.005, M.castAlu);
  block.position.set(1.02, 0.60, -0.32);
  g.add(block);

  const motor = lib.cyl(0.032, 0.06, M.steel, 18);
  motor.rotation.z = Math.PI / 2;
  motor.position.set(1.085, 0.60, -0.32);
  g.add(motor);
  const endcap = lib.cyl(0.026, 0.012, M.darkSteel, 14);
  endcap.rotation.z = Math.PI / 2;
  endcap.position.set(1.121, 0.60, -0.32);
  g.add(endcap);

  const reservoir = lib.cbox(0.05, 0.035, 0.05, 0.004, M.plasticLt);
  reservoir.position.set(1.02, 0.655, -0.32);
  g.add(reservoir);
  const filler = lib.cyl(0.0140, 0.0110, M.plastic, 12);
  filler.position.set(1.008, 0.678, -0.32);
  g.add(filler);
  const level = lib.cbox(0.014, 0.010, 0.012, 0.002, M.sensor);
  level.position.set(1.040, 0.648, -0.297);
  g.add(level);

  const ecu = lib.cbox(0.09, 0.08, 0.012, 0.0025, M.pcb);
  ecu.position.set(0.95, 0.62, -0.288);
  g.add(ecu);
  /* Heatsink and connector shells, both on the ECU's outboard face, and both
     sized by what is actually beside them rather than by the board.

     Two things were measured after the first draft put them there. thermal-9's
     air handler occupies this bay: swept over the blades' own footprint its
     nearest surface stands at z -0.2770 and it reaches x 0.9472, so a blade
     bank spread over x 0.913 to 0.987 at z -0.2815 to -0.2715 drove its two
     inboard blades straight through the duct, 32 triangles, on a pair that
     was clean before this pass. And the two connector shells at x 0.947 to
     0.977 crossed three blades of the same heatsink, 122 triangles, because
     both were placed on the middle of the same face.

     So the bank is now 36 mm of spread on x 0.970, blades x 0.9533 to 0.9868,
     entirely outboard of the duct's 0.9472, and 40 mm tall on y 0.620. The
     connectors move to the board's top and bottom margins at y 0.581 to 0.595
     and 0.643 to 0.657, clear of the blades, and out to x 0.953 so they clear
     the duct too. The blades seat 1.5 mm into the board instead of floating
     0.5 mm off it. */
  const hs = lib.fins(0.0100, 0.040, 0.036, 8, 0.0025, M.alu);
  hs.rotation.y = Math.PI / 2;      /* spread the blades along x, not z */
  hs.position.set(0.970, 0.620, -0.2785);
  g.add(hs);
  for (const dy of [-0.032, 0.030]) {
    const cn = lib.cbox(0.030, 0.014, 0.013, 0.002, M.plastic);
    cn.position.set(0.968, 0.62 + dy, -0.276);
    g.add(cn);
  }

  const conduit = lib.cyl(0.006, 0.05, M.plastic, 10);
  conduit.rotation.z = Math.PI / 2;
  conduit.position.set(0.872, 0.595, -0.35);
  g.add(conduit);

  /* Forward hydraulic pair, re-landed 71 mm inboard at the relocated
     crossover fittings; the last 200 mm approaches from inboard and below.
     Endpoints are the published (1.286, 0.484, +-0.620) and are untouched. */
  const fwdL = [
    [1.05, 0.63, -0.34],
    [1.10, 0.60, -0.44],
    [1.18, 0.545, -0.54],
    [1.25, 0.505, -0.60],
    [1.286, 0.484, -0.620],
  ];
  const fwdR = [
    [1.05, 0.63, -0.30],
    [1.10, 0.62, -0.05],
    [1.14, 0.60, 0.28],
    [1.22, 0.545, 0.50],
    [1.27, 0.505, 0.58],
    [1.286, 0.484, 0.620],
  ];
  g.add(lib.tube(fwdL, 0.004, M.steel, false, 24));
  g.add(lib.tube(fwdR, 0.004, M.steel, false, 30));

  /* Aft harnesses: park-brake commands plus the brake-priority arbitration
     line to drivetrain-9's vectoring coordinator. THE ONLY GEOMETRY THIS
     GENERATION MOVES.

     The -z run leaves the unit on wheels-7's own outlet at (0.92, 0.57,
     -0.38), descends outboard across the footwell and settles into the
     corridor by x 0.550 instead of running out to |z| 0.74. Its last four
     control points from x -1.100 back to the gearmotor are wheels-10's to
     the digit: this module has no business at the rear corner and the panel
     says what that costs and what it does not fix.

     The +z run is the one that changes character rather than coordinates.
     wheels-10 crossed the car at (0.70, 0.45, 0.00) and (0.40, 0.36, 0.55),
     which on a 1.20 m tandem cabin is a cable across the cabin floor 148 mm
     up, under the front occupant, at the height interior-11's seat pan sits,
     and the sweep agrees: on the gen11 preset wheels-10/master-unit crosses
     interior-11/front-seats in 118 triangle pairs to 37.55 mm, which is the
     deepest pair the wheels slot has on this car and is a brake line inside
     a seat. It closes. It now goes OUTBOARD FIRST, to |z| -0.400 at x 1.030,
     because thermal-9's HVAC stack filled x 0.95 to 1.11 at |z| under 0.3775
     from y 0.33 to 0.66 when this route was drawn. thermal-11 has since
     redrawn it wider, to |z| 0.4375 forward of x 0.8675, so the detour is
     inside that block in z rather than past it and clears on a local step by
     2.37 mm. The panel carries that correction and the two earlier crossovers
     that went under the stack in y and fouled it, one by 37.3 mm. The
     crossing itself is at x 1.075 and y 0.452, 38.4 mm forward of body-11's
     floor pan front edge at 1.0366 and 5.0 mm aft of the sill's front face
     at 1.0800, so it is on the toeboard plane in the front compartment and
     not in the cabin at all.

     SEGMENT COUNTS ARE SET BY SAMPLE PITCH AND NOT CARRIED. TubeGeometry
     samples uniformly in arc length, so holding the count while the route
     grows coarsens the chord. wheels-10 ran 2.5863 m at 36 and 3.0194 m at
     36, so 71.8 mm and 83.9 mm per sample. These are 2.5972 m at 36 and
     3.6924 m at 44, so 72.1 mm and 83.9 mm, and the +z figure matches its
     parent to a tenth of a millimeter. 128 more triangles. */
  const aftL = [
    [0.920, 0.570, -0.380],
    [0.870, 0.500, -0.480],
    [0.800, 0.430, -0.570],
    [0.700, 0.372, -0.618],
    [0.550, 0.334, -0.636],
    [0.300, 0.326, -0.640],
    [-0.550, 0.325, -0.640],
    [-0.900, 0.326, -0.639],
    [-1.100, 0.336, -0.612],
    [-1.300, 0.312, -0.604],
    [-1.450, 0.292, -0.603],
    [-1.494, 0.287, -0.603],
  ];
  const aftR = [
    [0.920, 0.570, -0.320],
    [0.960, 0.512, -0.405],
    [1.030, 0.466, -0.400],
    [1.070, 0.454, -0.220],
    [1.075, 0.452, 0.120],
    [1.060, 0.446, 0.350],
    [1.005, 0.418, 0.510],
    [0.910, 0.364, 0.602],
    [0.780, 0.332, 0.634],
    [0.600, 0.327, 0.640],
    [0.300, 0.326, 0.640],
    [-0.550, 0.325, 0.640],
    [-0.900, 0.326, 0.639],
    [-1.100, 0.336, 0.612],
    [-1.300, 0.312, 0.604],
    [-1.450, 0.292, 0.603],
    [-1.494, 0.287, 0.603],
  ];
  g.add(lib.tube(aftL, 0.0035, M.plastic, false, 36));
  g.add(lib.tube(aftR, 0.0035, M.plastic, false, 44));

  /* CLIPS. The forward pair is wheels-10's, unchanged. The aft pair is
     reclipped because a longer run in a tighter corridor is exactly where an
     unsupported span becomes a rattle against a structural member, and
     because the old spacing left one 1.05 m span with nothing holding it.

     Six clips on the -z run and ten on the +z, at spans of 0.14 to 0.61 m
     against wheels-10's 0.25 to 1.05. Both runs stop clipping at fractional
     index 8.0 and 13.0, which is x -1.100 on both, so nothing this module
     adds goes near the rear annulus band: the band is r 0.155 to 0.235 about
     the rear axle over |z| 0.65 to 0.73, the clips stop 350 mm forward of the
     axle and the whole harness now holds |z| under 0.6477 anyway. The band
     count is re-swept on the built module and is still zero. No clip is
     placed on the two tightest arcs, the recovery-core pass at x 0.96 and
     the sill bulkhead at x -1.05, because a ferrule adds 7.7 mm of radius to
     whatever the tube already holds. */
  clipRun(g, fwdL, [1.5, 3.0], 0.004, M.plastic);
  clipRun(g, fwdR, [1.4, 3.4], 0.004, M.plastic);
  clipRun(g, aftL, [1.5, 3.5, 5.3, 5.7, 7.0, 8.0], 0.0035, M.plastic);
  clipRun(g, aftR, [2.0, 3.5, 5.0, 7.0, 8.0, 9.5, 10.4, 10.8, 12.0, 13.0], 0.0035, M.plastic);

  return g;
}

/* ── THE GATE ─────────────────────────────────────────────────────────────

   ENUMERATED, NEVER LISTED. The preset is read out of js/registry.js's own
   VARIANTS slots, and for each slot the disk is probed for a `<slot>-11.js`;
   the -11 module is taken if it loads and registry's own carried choice
   stands if it does not. autonomy-11 does this and its reason is this
   module's reason: interior-11, hv-11 and thermal-11 landed mid-build, a
   hand-written partner list would have missed all three, and this file
   already paid for that once. Its first published clearances were quoted
   against hv-4 and thermal-9, which the preset does not build, and one of
   them was ten times optimistic.

   The preset that enumerates today is body-11, battery-11, drivetrain-9,
   wheels-11, hv-11, suspension-9, autonomy-11, interior-11, thermal-11.
   NINE modules. Both runs use tools/interfaces.js's own clipTris,
   sweepPrune and triTriDepth at LIMITS.pen, and the BASELINE is the same
   nine with wheels-10 in this slot, so the diff is this module and nothing
   else. Verified: the non-wheels part pairs are identical in both runs.

     wheels-11 IN THE SLOT: 10 penetrating part pairs, 4,321 crossings
        depth  pairs  part pair
        20.00   1416  suspension-9/rear-structure x wheels-11/park-brake
        14.79    212  suspension-9/steering      x wheels-11/discs
        14.78    148  suspension-9/front-structure x wheels-11/discs
        13.83    574  suspension-9/front-knuckle x wheels-11/discs
        12.46     35  suspension-9/48v-feeds     x wheels-11/front-wheels
        10.91    251  suspension-9/front-knuckle x wheels-11/calipers
         9.96    184  suspension-9/rear-steer    x wheels-11/master-unit
         7.82    126  suspension-9/rear-structure x wheels-11/master-unit
         5.08   1160  drivetrain-9/hub-bearings  x wheels-11/rear-wheels
         2.46    215  suspension-9/rear-steer    x wheels-11/park-brake

     BASELINE, wheels-10 in the slot: 14 pairs, 5,115 crossings
        depth  pairs  part pair
        37.55    118  interior-11/front-seats    x wheels-10/master-unit
        23.52    570  battery-11/sill            x wheels-10/master-unit
        20.00   1416  suspension-9/rear-structure x wheels-10/park-brake
        14.94     76  autonomy-11/ring           x wheels-10/master-unit
        14.79    212  suspension-9/steering      x wheels-10/discs
        14.78    148  suspension-9/front-structure x wheels-10/discs
        13.83    574  suspension-9/front-knuckle x wheels-10/discs
        12.46     35  suspension-9/48v-feeds     x wheels-10/front-wheels
        12.32     26  thermal-11/recovery-core   x wheels-10/master-unit
        10.91    251  suspension-9/front-knuckle x wheels-10/calipers
         9.79    192  suspension-9/rear-steer    x wheels-10/master-unit
         7.27    122  suspension-9/rear-structure x wheels-10/master-unit
         5.08   1160  drivetrain-9/hub-bearings  x wheels-10/rear-wheels
         2.46    215  suspension-9/rear-steer    x wheels-10/park-brake

   GATE: ZERO NEW PENETRATING PAIRS. Four close outright, at 37.55, 23.52,
   14.94 and 12.32 mm, and every one of the four is a Gen 11 partner that did
   not exist when this route was drawn. Two deepen, both at the rear
   termination and both on a centerline that did not move; the fail list
   carries the arithmetic. The hv slot appears in neither table, which is not
   an omission: hv-11 has zero penetrating pairs against this slot with
   wheels-10 in it as well. */

/* ── THE FRONT PANTS, wheels-13's, with three numbers moved. World
   coordinates about the front axle at (P.axleF, P.wheelY, s * FRONTZ); s =
   sign(z) so +s is outboard. The module header carries every clearance and
   the swept envelope; the panel carries the why. Nothing here spins. ── */
const PANT = {
  R: 0.377,        // band OUTER radius about the axle: inner 0.373, 18 mm over the tire's 0.355 (wheels-13: 0.400)
  ZOUT: 0.8120,    // Gen 22: world 0.7920, the wall outer face at 0.7930. The 18-off-the-section constant dated from walls a body held over a moving wheel; this wall rides the knuckle, so what it keeps is the class 10.0 spin gap to its own cover at 0.7790 plus the 4 mm laminate, re-derived, and the 3.5 mm above that floor returns to the silhouette. (Gen 21: 0.8155, world 0.7955, 18 mm off the section max)
  ZIN: 0.6725,     // band inboard edge over the crown: the tire's own face, |theta| <= 42 deg (wheels-13: 0.700)
  ZIN_50: 0.700,   // and wheels-13's crown edge by 50 degrees, where the swing is 74 mm
  ZIN_NOSE: 0.685, // Gen 17: the nose's inboard edge HOLDS its absolute |z| 0.665 while the pant rides 20 mm in; at full lock the nose swings 70 to 75 mm inboard and read 9.6 mm from the arch skin and 11.9 from the front casting otherwise (tools/envelope.sh). It costs 0.0002 of Cd in exposed tread. wheels-13's 0.665 in the pant's frame
  ZIN_TAIL: 0.745, // Gen 17: the tail's inboard edge HOLDS its absolute |z| 0.725 against hv-15's zonal box while the pant rides 20 mm in (0.2 mm at lock plus rebound otherwise, the envelope tool read); wheels-15's 0.725 in the pant's frame. wheels-13's 0.690 put the tail tip 3.6 mm from hv-11's spine at full lock and full rebound; wheels-14's 0.715 read 6.7 mm from hv-15's zonal box by surface (tools/envelope.sh); 0.725 reads 17
  Y0: 0.045,       // Gen 20: disc lower edge 45 mm above the road (wheels-13 to 17: 0.080). The disc rides the knuckle, so lock and travel never close the gap; what does is the tire's own deflection, 20 to 25 mm at peak vertical load, and 45 is that budget plus margin. Deeper floors were measured and bought nothing: the fill convention charges the air a cover encloses wherever nothing else spans the scanline, and 0.045 with the 145 degree cap is the measured optimum of nine configurations
  TH: 0.004,       // laminate
  ARC_NOSE: 145,   // Gen 20: the nose cap reaches down to y 0.046 at x 1.666 (wheels-17: 137, y 0.080). A sharp measured optimum: 141 reads 0.0204 of front exposure, 143 0.0147, 145 0.0138, 147 0.0150
  ARC_TAIL: 61,    // the tail stops at y 0.538 at x 1.120: battery-11's sill runs to x 1.080, carried
};

function frontPantPart(s) {
  const g = lib.part('front-pants', [0, 0, s * 1.25]);
  const cx = P.axleF, cy = P.wheelY;

  /* THE DISC: a circle of r R about the axle, cut flat at y Y0, extruded
     TH along its own normal so it has two faces and a chamfered rim. */
  const yc = PANT.Y0 - cy;
  const a0 = Math.asin(yc / PANT.R);
  /* THE TRAILING EDGE IS NOTCHED OVER THE SILL'S HEIGHTS. battery-11's sill
     runs forward to x 1.080 at |z| 0.720 to 0.780, y 0.104 to 0.420, and at
     14 degrees of lock the disc's trailing edge swings 91 mm inboard into
     that band: swept about the axle plane, wheels-13's r 0.400 disc put its
     trailing-lower quadrant 18 mm past the sill's end face and this disc at
     r 0.377 put it 4 mm short. So below dy 0.173 the disc ends at dx -0.335,
     which is x 1.115 at rest, the tire's own trailing edge at those heights,
     and 24 mm ahead of the sill end at full lock. Above that the circle
     never reaches -0.335 and the notch is not there. */
  const XN = -0.335;
  const aN = Math.acos(XN / PANT.R);
  /* the outline is a polyline at 5 degree steps rather than two absarc calls,
     because ExtrudeGeometry gives every arc the same segment count whatever
     its span and the module is inside its triangle budget by 84 */
  const shape = new THREE.Shape();
  const STEP = (5 * Math.PI) / 180;
  const arc = (from, to) => {
    const n = Math.max(1, Math.round((to - from) / STEP));
    for (let i = 0; i <= n; i++) {
      const a = from + ((to - from) * i) / n;
      const px = PANT.R * Math.cos(a), py = PANT.R * Math.sin(a);
      if (from === a0 && i === 0) shape.moveTo(px, py); else shape.lineTo(px, py);
    }
  };
  arc(a0, aN);
  shape.lineTo(XN, -Math.sqrt(PANT.R * PANT.R - XN * XN));
  arc(2 * Math.PI - aN, Math.PI - a0);
  shape.closePath();
  const discGeo = new THREE.ExtrudeGeometry(shape, {
    depth: PANT.TH, steps: 1, curveSegments: 1,
    bevelEnabled: true, bevelThickness: 0.001, bevelSize: 0.001, bevelSegments: 1,
  });
  const disc = lib.crease(lib.mesh(discGeo, M.paint), 40);
  disc.position.set(cx, cy, s * PANT.ZOUT - (s > 0 ? PANT.TH : 0));
  g.add(lib.shell(disc));

  /* THE BAND IS THE POD: one closed thin section lofted around the wheel
     from the tail at -ARC_TAIL, over the crown, down the nose to +ARC_NOSE
     (positive is forward). Each section is the outer face from ZIN(t) out
     to ZOUT, back along the inner face at R - TH, so the loop closes and
     the band reads solid. THE INBOARD EDGE: at the tire's face 0.6725 over
     the 42 degrees each side of the top where a point R sin(theta) off the
     kingpin plane swings 14 mm or less at 14 degrees of lock against the
     flank at 0.600; to 0.700 by 50 degrees (wheels-13's crown edge, 74 mm
     of swing); then to 0.665 on the nose and 0.690 on the tail from 58,
     as wheels-13 drew them and for its reasons. */
  const zin = (deg) => {
    const d = Math.abs(deg);
    if (d <= 42) return PANT.ZIN;
    if (d <= 50) return PANT.ZIN + (PANT.ZIN_50 - PANT.ZIN) * (d - 42) / 8;
    const t = Math.max(0, Math.min(1, (d - 50) / 8));
    const end = deg >= 0 ? PANT.ZIN_NOSE : PANT.ZIN_TAIL;
    return PANT.ZIN_50 + (end - PANT.ZIN_50) * t;
  };
  const rows = [];
  for (let deg = -PANT.ARC_TAIL; deg <= PANT.ARC_NOSE + 1e-9; deg += 6) {
    const th = (deg * Math.PI) / 180;
    const x = cx + PANT.R * Math.sin(th), y = cy + PANT.R * Math.cos(th);
    const xi = cx + (PANT.R - PANT.TH) * Math.sin(th), yi = cy + (PANT.R - PANT.TH) * Math.cos(th);
    const z0 = zin(deg), z1 = PANT.ZOUT;
    const zs = [z0, z0 + (z1 - z0) * 0.33, z0 + (z1 - z0) * 0.66, z1];
    const row = [];
    for (const z of zs) row.push([x, y, s * z]);
    for (const z of zs.slice().reverse()) row.push([xi, yi, s * z]);
    rows.push(s > 0 ? row : row.slice().reverse());
  }
  g.add(lib.shell(lib.crease(lib.loft(rows, M.paint, true), 40)));
  /* the two open ends of the band, capped */
  for (const deg of [-PANT.ARC_TAIL, PANT.ARC_NOSE]) {
    const th = (deg * Math.PI) / 180;
    const z0 = zin(deg), zw = PANT.ZOUT - z0;
    const cap = lib.box(PANT.TH, 0.0015, zw, M.paint);
    cap.position.set(cx + (PANT.R - PANT.TH / 2) * Math.sin(th), cy + (PANT.R - PANT.TH / 2) * Math.cos(th), s * (z0 + zw / 2));
    cap.rotation.z = -th;
    g.add(cap);
  }

  /* THE BRACKET: foot on the knuckle's outboard face at |z| 0.5830 and the
     leg up the leading side at x 1.500 and |z| 0.635, both wheels-13's;
     then, instead of the arm over the tire's shoulder to the band's
     underside, a 25 mm jog to the band's own inboard edge at
     (1.500, 0.722, 0.664) and a clip on that edge. Nothing passes between
     band and tire. */
  const KF = 0.5830;
  const foot = lib.cbox(0.040, 0.050, 0.007, 0.002, M.castAlu);
  foot.position.set(1.505, 0.470, s * (KF + 0.0035));
  g.add(foot);
  for (const dy of [-0.016, 0.016]) {
    const b = lib.fastener(0.0040, M.steel, 'hex');
    b.rotation.x = s > 0 ? -Math.PI / 2 : Math.PI / 2;
    b.position.set(1.505, 0.470 + dy, s * (KF + 0.007));
    g.add(b);
  }
  g.add(lib.tube([
    [1.505, 0.470, s * 0.5900],
    [1.500, 0.495, s * 0.6350],
    [1.500, 0.700, s * 0.6350],
    [1.500, 0.722, s * 0.6640],
  ], 0.011, M.castAlu, false, 12));
  /* the clip on the band's inboard edge: a 30 by 12 mm block straddling the
     edge at |z| 0.6725 between r 0.373 and 0.377, at the leg's station */
  const thL = Math.asin(0.050 / (PANT.R - PANT.TH / 2));
  const clip = lib.cbox(0.030, 0.012, 0.014, 0.001, M.castAlu);
  clip.position.set(1.500, cy + (PANT.R - PANT.TH / 2) * Math.cos(thL), s * 0.6715);
  g.add(clip);
  g.position.z = s * (FRONTZ - 0.74);
  return g;
}

/* ── THE CENTER HOUSE, Gen 21: the saddles' successor is a perimeter skirt
   and nothing else. The pack floor's y 0.1025 scanline owns the frontal
   union above it and the body's wheelhouse owns the cavity, so the only
   honest geometry is the band from the floor to just past the pack line:
   a plan wrap 10 mm off the tire, riding the fork so the floor never moves
   relative to the patch. No lock, no rear steer, no swing envelope: the
   whole ladder of Gen 20 saddle retreats has no partner here. ── */
const HOUSE = {
  ZS: 0.0875,      // side plane: the 155's face at 0.0775 plus 10 mm
  XEND: 0.285,     // nose and tail planes off the axle: the widest chord in the band (0.2746 at y 0.130) plus 10 mm
  RC: 0.045,       // plan corner radius
  Y0: 0.039,       // floor: the tire's deflection budget plus margin, the Gen 20 number
  Y1: 0.130,       // top: the pack's y 0.1025 scanline plus 27.5 mm of overlap
  TH: 0.004,       // laminate
  ZLEG: 0.1210,    // retired with the boss mount; the feet bolt up into the arm undersides on y 0.3270 now
};

function centerHousePart() {
  const g = lib.part('center-house', [0, 0.6, 0]);
  const cx = P.axleR;

  /* the wrap: a rounded-rectangle ring in plan, extruded from Y0 to Y1 */
  const rr = (sh, hx, hz, r) => {
    sh.moveTo(-hx + r, -hz);
    sh.lineTo(hx - r, -hz); sh.absarc(hx - r, -hz + r, r, -Math.PI / 2, 0, false);
    sh.lineTo(hx, hz - r);  sh.absarc(hx - r, hz - r, r, 0, Math.PI / 2, false);
    sh.lineTo(-hx + r, hz); sh.absarc(-hx + r, hz - r, r, Math.PI / 2, Math.PI, false);
    sh.lineTo(-hx, -hz + r); sh.absarc(-hx + r, -hz + r, r, Math.PI, Math.PI * 1.5, false);
  };
  const ring = new THREE.Shape();
  rr(ring, HOUSE.XEND, HOUSE.ZS, HOUSE.RC);
  const hole = new THREE.Path();
  rr(hole, HOUSE.XEND - HOUSE.TH, HOUSE.ZS - HOUSE.TH, Math.max(0.001, HOUSE.RC - HOUSE.TH));
  ring.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(ring, { depth: HOUSE.Y1 - HOUSE.Y0, steps: 1, curveSegments: 10, bevelEnabled: false });
  const wrap = lib.crease(lib.mesh(geo, M.paint), 40);
  wrap.rotation.x = -Math.PI / 2;
  wrap.position.set(cx, HOUSE.Y0, 0);
  g.add(lib.shell(wrap));

  /* two legs to the fork bosses: foot against the boss's inboard face at
     |z| ZLEG, a leg down the outside of the cover to a clip on the wrap's
     top lip. The leg's whole run stands 15 mm or more off the tire face,
     the rim lip and the cover lip; the drum's gearmotor is 44 mm away in
     x on the other side. */
  /* the legs hang from the swingarm's own undersides, their feet bolted
     up into the arm bottoms on the declared y 0.3270 plane, and they are
     deliberately asymmetric in x: the +z leg at -1.28 clears the spring
     perch by 20 mm, the -z leg at -1.22 clears the damper body by 22, and
     neither goes near the spindle whose z-span killed the first two
     mounting drafts (down the axle plane, then down the plate line). */
  for (const [sgn, LX, LZ] of [[1, -1.28, 0.128], [-1, -1.22, 0.124]]) {
    const foot = lib.cbox(0.032, 0.006, 0.030, 0.0015, M.castAlu);
    foot.position.set(LX, 0.3240, sgn * LZ);
    g.add(foot);
    for (const dx of [-0.010, 0.010]) {
      const b = lib.fastener(0.0040, M.steel, 'hex');
      b.rotation.x = Math.PI;
      b.position.set(LX + dx, 0.3205, sgn * LZ);
      g.add(b);
    }
    /* the leg doglegs inboard above the lid: below y 0.31 it holds
       |z| 0.098, inside the pack's notch band, because the lid's flank
       plates own everything outboard of 0.105 at these x */
    g.add(lib.tube([
      [LX, 0.320, sgn * LZ],
      [LX, 0.306, sgn * 0.0980],
      [LX, 0.134, sgn * 0.0940],
    ], 0.006, M.castAlu, false, 10));
    const clip = lib.cbox(0.030, 0.012, 0.014, 0.001, M.castAlu);
    clip.position.set(LX, 0.128, sgn * 0.0900);
    g.add(clip);
  }
  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* Two front corners where four stood. FRONTZ is still its own contract;
     REARZ is gone with the corners it named: the center wheel sits on z 0
     and needs no constant to say so twice. */
  for (const z of [FRONTZ, -FRONTZ]) {
    const x = P.axleF, s = Math.sign(z);
    const spinG = new THREE.Group();
    spinG.position.set(x, P.wheelY, z);
    lib.spin(spinG, 'z', 30);
    spinG.add(tirePart(s, false), coverPart(s, false), frontWheelPart(s), discPart(s));
    sys.add(spinG);
    sys.add(caliperPart(x, z));
    sys.add(frontPantPart(s));
  }

  /* THE CENTER WHEEL. One spin group at (axleR, wheelY, 0); its local frame
     IS the world frame, so the contract flange lands at z -0.0900 exactly
     as the profile draws it. The cover rides the +z well side; the ring,
     the drum and the backplate own -z. */
  const spinG = new THREE.Group();
  spinG.position.set(P.axleR, P.wheelY, 0);
  lib.spin(spinG, 'z', 30);
  spinG.add(tirePart(1, true), coverPart(1, true), rearWheelPart(1), parkDrumPart(1));
  sys.add(spinG);
  sys.add(parkBackPart(P.axleR, 0, 1));
  sys.add(centerHousePart());

  sys.add(masterUnitPart());
  return sys;
}
