/* GEN 24: THE TAPERED TIP. body-23 with one loft station redrawn, the
   nose tip at x 2.175: its eight profile half-widths scaled to 0.78 and
   its crown down 30 mm to 0.720. Nothing else on this body moves.

   THIS IS A STYLING CHANGE AND THE FILE SAYS SO IN ITS FIRST PARAGRAPH.
   Davis asked twice for a front that looks better, and design/gen24-front.md
   is the measurement that says he can have it for nothing: all four of the
   drag method's forebody proxies are clamped at zero on this car and have
   been since before Gen 18, by about a factor of two on the rounding
   terms, so the nose contributes exactly 0.00000 to Cd and cannot be
   drawn either better or worse within that margin. Measured across tip
   scales 1.00, 0.88, 0.78 and 0.68 the frontal area does not move by a
   single digit at any of them, because the tip is not the maximum section
   and the AREA gate is a union projection that has never seen this
   geometry. Edge rounding holds at 0.1850 and plan rounding at 0.7102.

   What it is worth, and it is not nothing: wetted area falls 0.042 m2,
   the tip's maximum half-width goes 0.490 to 0.382, and the car stops
   presenting a flat face. THE MILES ARE NOT THIS PART'S. gen23.md
   section 5 declined to credit its falling hood with that rung's range
   and this file declines the same way for the same reason: Gen 24's
   numbers are wheels-24's, and a nose that books range would be the error
   this project keeps writing down.

   WHAT WAS TRIED AND REJECTED, because the next person will try it. The
   nose is four loft stations over 355 mm and the surface between them is
   linear, so it is a faceted wedge and the obvious cure is more stations.
   It cannot be splines: body-9 measured clamped Catmull-Rom at +0.64
   percent of frontal area, and the greenhouse rests on a 72.5 mm sliver,
   which is why this file's ancestors say linear interpolation is not
   negotiable. Two rings were added instead with their profile points
   placed exactly on the linear chord, which should have cost nothing;
   measured, wetted area went 22.434 to 23.125 and the walk's peak and
   worst kink improved by zero. That 0.69 m2 is unexplained and is the
   first thing to understand if anyone reopens it. Adding rings also
   shifts every hardcoded panel index in this file, COWL, RB, RC and RD,
   which is the maintenance cost the Gen 18 note already hints at.

   The carried text below is body-23's and describes the tip at its old
   width. design/gen24.md is the brief. */

/* GEN 23: THE FLANK, AND THE NOSE FALLS. body-22 with the cabin flank
   brought in 30 mm a side, |z| 0.560 to 0.530 at fifteen loft stations
   with the tumblehome eased above it, and the front two hood crowns
   dropped to 0.800 and 0.850.

   THE FLANK IS GEN 15's MOVE, AVAILABLE AGAIN AND FOR A SHARPER REASON.
   body-15 brought this surface from 1.20 m to 1.12 because a 0.52 m pair
   of shoulders did not need it; Gen 18 then put ONE occupant on the
   centerline and the flank never followed. Probed in the two bands it
   owns, y 0.75 to 0.95, the nearest tenant inboard of the 0.560 skin is
   autonomy's flank camera at |z| 0.5184 and thermal's recovery core at
   0.5110: 42 mm of clear air behind a surface that has not moved in eight
   rungs. Measured on the scratch build before a line was committed: area
   1.5416 to 1.5268, wetted 22.531 to 22.439, CdA 0.1250 to 0.1241.

   AND IT IS WHY THE LADDER'S THIRD COLUMN CHANGED. This move raises Cd by
   0.0002 while improving every physical measure, because friction is 69
   percent of the coefficient and is charged against the area being cut.
   design/gen23.md section 3b has the arithmetic; tools/ladder.js gates on
   CdA now and prints a NOTE naming any rung that raises Cd. This is that
   rung, and the reason is here.

   THE HOOD LINE IS MONOTONIC, AND A SHIPPED DRAFT OF IT WAS NOT. The
   crowns run 0.750, 0.820, 0.870, 0.940 from the tip to the front arch: a
   nose that falls away, evenly, which is the whole of what Davis asked
   for. The first version of this file ran 0.750, 0.872, 0.850, 0.940 and
   SHIPPED, because the edit that lowered these two stations was written as
   a pair of string replacements and only one of them matched. The other
   passed silently, leaving a 22 mm dip at x 1.920 followed by a 90 mm
   rise: a dent in the hood that neither body-21 nor body-22 had, in the
   exact place the reader is looking. Every other edit in this project's
   history asserts its match count and this one did not, which is the whole
   lesson.

   THE NOSE FALLS BECAUSE DAVIS ASKED, AND IT IS NEARLY FREE. Measured,
   dropping these two crowns is worth 0.020 m2 of wetted area, about one
   mile, and this file says so rather than crediting the hood with the
   rung's range. What it buys is a nose that falls away instead of running
   flat to a blunt face, and it costs nothing.

/* GEN 22: THE OVERHANG. body-21 with 200 mm of front overhang deleted and
   nothing else touched: the fascia block (stations 0 and 1, the valance,
   the gates, the light band, the splitter and the throat) translates whole
   to x 2.175/2.020, so the crown rise, the pedestrian geometry and every
   fascia relation carry to the digit; station 2 compresses to 1.920 and
   the hood run steepens where the drag method does not look (a
   steep-to-flat transition is not a cowl break). Measured against body-21
   with the same tool: tip 2.1831 against 2.3831, wetted 22.697 against
   23.285, edgeE 0.159 identical, cowl break 13.0 identical, the forebody
   term still zero. The crash rails hold their 55 kJ by force instead of
   stroke (190 kN over 145 mm against 120 over 230, wall 3.0 to 4.1) and
   the panel states the pulse. The spat wall follows wheels-22's
   re-derived pant plane, 0.7955 to 0.7920, the same follow as Gen 21. The ten-generation nose hold ends on
   purpose: the sensor-band contract it preserved moves with the fascia,
   and autonomy-22 lands on the translated face. design/gen22.md is the
   brief. The carried text below says 2.375 or "held" about the nose
   wherever body-21 and its ancestors did.

/* GEN 21: THE CRADLE AND THE FOLLOWED WALL. body-20 with two moves and
   three measured refusals. The wall follows the 125-section pant plane in
   10 mm (0.8055 to 0.7955, the mid easing retired), which is the area
   column; the rear casting grows the cradle (pivot arms, clevises on the
   declared 0.1410 plane, the spring tower on 0.6150, converter rails at
   -2.45) because the subframe that used to hold the rear suspension left
   with the five-link; the rear closeout becomes the twin channels, edged
   against the drooped tire. Not built, measured: a wheelhouse dome and
   wheelhouse deletions. design/gen21.md is the
   brief. The carried text below describes the gen20 wall plane wherever
   it says 0.8055.

/* BODY-18: THE SINGLE SEAT. body-17 with its roof descending from the single
   head and its belt seam in, for a car that carries one person.
   design/gen18.md is the brief and section 4b the measurement this is built
   to; design/retro-gen17.md section 3 is the finding it answers.

   WHAT MOVES, AND WHY, IN ONE PARAGRAPH. The rear seat is gone (interior-18),
   so the roof that body-16 and 17 held flat at 1.257 from x 0.85 back to
   -1.10 for a rear head at x -0.63 has nothing under it aft of the single
   head's crown at x -0.14. From x -0.35 the upper section of every station
   (profile points 5 to 7 and the crown: the belt seam, the tumblehome, the
   deck shoulder, the roof) shrinks about the waterline (point 3) by a ramp
   that reaches 85 percent at the Kamm face, eased through the two bands
   where the lower body has its own section change (the spat closure, x
   -1.75 to -2.10, and the face, -2.40 to -2.60) so the two rates do not add
   past the 15 degree equivalent cone. The belt (point 4) keeps its z. Gen
   16's own 22 percent face shrink (TAILK) is off, because the section
   arriving at the face is already small and compounding the two read 17
   degrees in the last window. The belt seam (point 5) comes in from 0.550
   to 0.460 over the cabin stations, eased out by the rear arch, because a
   0.52 m pair of shoulders on the centerline needs nothing at 0.55 above
   the belt; the deck shoulder (point 6) and the crown band hold, so the door
   hinge axis at |z| 0.3585 and the cage rails at 0.300 stay where they are.
   The cage reads the loft it stands under: the bows, the roof rail and the
   C-pillar are derived from the crown at their own x instead of typed at
   the flat roof's height. The luggage bay shortens to where its ceiling
   still clears its floor, and the space behind the seat is the new well,
   which interior-18 lines. The hood, the front package, the recline and the
   eye line do not move: the hood is 0.94 and the eye 1.027, and that is the
   limit on the roof over the head (brief, section 2).

   MEASURED, NOT ESTIMATED (tools/gen18-tail.sh, the same march and buildup
   the ladder is priced with): the tail alone on wheels-17 and battery-17
   reads upper base 0.2378 against 0.3470, Cd 0.1031 against 0.1100, with
   three bubbles of 50 to 100 mm at 15.3 to 16.4 degrees on the lower
   body's own steps, which the method treats as reattaching. The flank, the
   spat closure, the station at -0.350 and the cage were added and the whole
   re-measured: 1.5580 m2, Cd 0.1034, upper base 0.2384, the worst window
   15.0 upper and 14.3 lower, no bubble over 50 mm. The numbers that ship
   are in the blurb.

   Everything below this block is body-17's own record, kept whole, because
   the car under the roof is body-17's. */
/* body-17: THE TRACK'S BODY. body-16 with the rear spat wall following the
   rear tire in: its straight run from |z| 0.8400 to 0.8100 and its trailing
   closure from 0.8000 to 0.7700, the rub lip with it, the leading blend
   still rising from the shoulder's 0.7800. wheels-17 puts the rear tire's
   face at 0.7875 (a 1.44 m track), so the wall stands 22.5 mm off the face
   against body-16's 32.5 mm off a face at 0.8075; tools/envelope.sh on the
   gen17 set is what decides the last ten, and design/gen17.md section 12
   records what it read. The wall is the car's outline at the rear from y
   0.18 to 0.52, which is why it follows: the track scenario with the wall
   left at 0.84 reads 1.5846 m2 and with it at 0.81 reads 1.5739.
   Everything else is body-16's, and its header follows; the venturi floor's
   rear closeout was re-measured against the tire at 0.6525 and is clear.

   ── body-16's own header follows, unchanged ──────────────────────────

/* body-16: THE CORNER'S BODY. body-15 with the canopy glass flush with the
   loft and the tail's upper stream taken to the limit the method has always
   used, which are the two skin levers design/retro-gen15.md section 5 said
   were the last a body could take on this package without reopening it.
   design/gen16.md is the brief; the suspension is the rung's mass lever and
   this body is its area and coefficient levers, and the three of them with
   autonomy-16's one re-seated camera are the rung.

   WHAT CHANGES, measured by the sweeps that own each number:

   1. THE GLASS IS FLUSH. Every body from Gen 11 cut the canopy band from the
      loft stations and stood it 8 mm proud in y. In the frontal projection
      that band is the car's whole crown from belt seam to belt seam, 1.12 m
      of it, and the 8 mm step is 0.0089 m2 of frontal area that nothing
      needed: 1.6064 to 1.5975 m2 on wheels-15, nothing else moved. Alone it
      reads Cd 0.1145 against 0.1140, the trap of Gen 13, 14 and 15 a fourth
      time (friction and the wheel term charged against a smaller reference
      area), and CdA 0.1830 against 0.1832, so by itself it buys a column and
      not a rung. The cowl break the finder reads goes 15.1 to 13.0 degrees
      because the glass no longer stands proud of the cowl ring; both score
      zero.

   2. THE TAIL'S UPPER STREAM GOES TO THE LIMIT. body-15's upper stream ran
      to the Kamm face at 13.6 degrees of equivalent cone against 15; the
      lower stream, the venturi floor's and the diffuser's, at 15.3 and not
      touched. From x -2.300 aft the upper four profile points and the crown
      of every tail station shrink about the waterline (point 3) by a factor
      growing linearly to 0.22 at the Kamm face, y toward the waterline and
      z toward the centerline in full. Swept with the shipped buildup over
      nine start-station and depth combinations (design/gen16.md section 4):
      from -1.950 or -2.100 the cone passes 15 before the base has fallen
      far; from -2.350 the stream separates at x -2.46; from -2.300 at 0.22
      it reaches the Kamm at 14.89 degrees on the bare loft with the upper
      base from 0.4132 to 0.3332 m2; BUILT, with the blade on its struts and
      the bay's tapered walls standing in the sections (they always have: the
      body module is what the walk sees), it reads 14.57 degrees and 0.3470,
      and the base term goes from 0.0201 to 0.0162. The Kamm face
      spans y 0.265 to 0.828 and is 0.48 m wide at its top against 0.887 and
      0.62. With the glass: Cd 0.1104 against 0.1140 on wheels-15, CdA
      0.1764 against 0.1832, -3.7 percent.

   3. WHAT THE TAIL TAKES WITH IT, each followed rather than left: the
      luggage bay's walls follow the ceiling down aft of -2.300 (a tapered
      panel read off the loft at |z| 0.330 less 10 mm; the skin over the
      bay's last 200 mm comes down to y 0.907 over walls that stood to 0.925,
      and the bay panel states what the bay lost); the Kamm spoiler's blade
      height is read off the new deck and its span comes 0.70 to 0.56 m
      because a blade wider than the deck it stands on is a blade in the
      wake; the rear light band comes 0.70 to 0.48 m because the face at
      y 0.760 is 0.52 m wide now; and autonomy-16 re-seats the rear camera
      45 mm lower under a crown that came down 59. The decklid's cut lines
      (-1.160 and -2.100) are ahead of the shrink and do not move; the
      diffuser and the lower four points of every station do not move.

   4. THE LEDGER: tail cone 10.3 to 9.9 kg (its drawn area 0.9601 of
      body-15's, tools measured), the blade 4 to 3.5 (3.2 by span, 0.3 of
      taller struts), the light bands 3 to 2.8 (the rear guide 0.22 m
      shorter of 1.56), the canopy held at 13.1 (its developed area is the
      same to four places flush or proud). 269.9 kg against 271.0.

   Everything else is body-15's: the flank at 0.560, the cowl at 15.1 on the
   loft (13.0 as read with the glass flush), the floor, the roof, the sill,
   the pan, the castings, the cage, the doors, the hood. Read "body-15" for
   "this body" below wherever the text names itself; the account that
   follows is body-15's, unchanged, and the Gen 16 notes in each part's
   panel say what moved.

   ── body-15's own header follows ──────────────────────────────────────

/* Gen 15 body: the flank.

   body-14 with its flank brought in from |z| 0.600 to 0.560 from the
   shoulder up, at every station from the front arch to the port, and its
   hood brought down to meet the glass at the angle the drag method scores
   at zero. design/retro-gen14.md section 5 probed the gen14 preset over
   |z| 0.44 to 0.60, y 0.60 to 1.05, and found nothing in the flank band
   that the occupant needs: the occupant model's widest box is 0.520 across
   and the cabin was 1.200. What stands there is plumbing (thermal-13's
   recovery core, hv-11's port and front zone drops, autonomy-13's camera
   pads) and this body's own pillars; the hardest thing is the front
   casting, whose upper corners stand at |z| 0.550 over y 0.725 to 0.765,
   and that is the number: 0.560, 10 mm of skin outside the casting. Below
   the shoulder the cabin is the occupant's (the rear foot channels run to
   |z| 0.528) and the shoulder flares to the sill at 0.78 as before.

   WHAT MOVES, station by station: profile point 4 (the belt seam and flank
   top) from 0.600 to 0.560 at stations 3 to 15b; the ARCH return at the
   wheel stations from 0.59 to 0.60 over y 0.608 to 0.62 to 0.55 to 0.56;
   SHLD's top from (0.62, 0.60) to (0.62, 0.56) with its two middle points
   eased so the shoulder turns as before; point 5 at stations 7b to 13
   brought in where it would otherwise stand outboard of the new seam, so
   the greenhouse keeps the shape body-14 drew against the head; stations 16
   on hold, because the tail's flank is already inside 0.56. The cage's
   hinge pillar and rear leg move inboard with the skin at their mid points,
   (1.000, 0.64) from |z| 0.53 to 0.50, to keep 40 mm of skin outside them;
   their feet hold at 0.645 under a shoulder that did not move (a draft with
   the feet at 0.615 met autonomy's compute coolant hose by 7.3 mm and the
   checker said so); the A-pillar, roof rails and C-pillar are inside
   already.
   THE COWL: hood stations 3 and 4 (x 1.82, 1.45) come down in crown and
   upper profile, 0.972 to 0.940 and 0.990 to 0.950, so the hood runs level
   from station 2 and its last 200 mm rise at 15 degrees into a glass that
   rises at 25. A first draft at 0.952 and 0.970 (the design doc's 20 mm)
   measured the break at 20.1 degrees, not 15, and a second at 0.945 and
   0.955 read 16.6, because the finder reads the crown of the loft with the
   glass standing 8 mm proud from the cowl ring; the third is what the
   finder scores. Station 2 holds at 0.940 over the heat pump's 0.892 and
   station 3 is 48 mm over its aft end, the same margin; the nose holds as
   crash budget. And the venturi floor's front closeout is notched to |z| 0.565
   over x 1.55 to 1.85, the front pant nose cap's swept zone at full lock,
   because tools/envelope.sh read 1.7 mm between the cap's bottom corner and
   the plate body-13 held at 0.620 for a tire at 0.6725. Everything else is
   body-14's to the vertex.

   WHAT IT MEASURES, by the sweeps that own each number (tools/area.sh,
   tools/aero.sh, tools/occupant.sh, tools/check-interfaces.sh), filled in
   from the runs and not from the drawing:
     frontal area     1.6064 m2 on wheels-15 against body-14's 1.6398 on
                      wheels-14: the flank is worth the whole of it
     Cd               0.1140 on wheels-15 under the third revision, against
                      body-14's 0.1151; CdA 0.1831 against 0.1888; the cowl
                      break 15.1 degrees against 24.9
     the walk         both streams to the Kamm, upper base 0.4132 m2 to x -2.68 at 13.6 degrees, lower 0.0770 to x -2.68 at 15.3
     wetted           23.558 m2 with wheels-15 and battery-11 (body-14: 23.613)
     maximum section  1.4412 m2 at x -0.45 (body-14: 1.4825)
     parked           5.077 m long, 1.684 m wide at the spats, 1.274 m tall
     mass             271.0 kg (body-14: 271.5): canopy, skin, shoulder and
                      cage re-priced off their drawn areas at body-14's own
                      areal densities (0.9667, 0.9736, 1.1351 and 1.0020: 13.1,
                      34.8, 5.7 and 51.3 kg; the shoulder GREW, because it now
                      lofts from 0.78 to 0.56), every other part carried

   THE FOUR TENANTS OF THE OLD FLANK BAND move in their own modules, each a
   planned fork: thermal-15 takes the recovery core 40 mm inboard, hv-15
   takes the port assembly 40 mm inboard and the front drops 25, autonomy-15
   re-seats the camera pads on the measured skin, interior-15 moves the
   dashboard's side panels with the drops. Nothing on this body is drawn
   around a tenant that has not moved.

   CARRIED FROM body-14 AND STILL TRUE: the greenhouse drawn to the head,
   the cabin on the lid, the luggage bay, the tail against the cone walk,
   the spat wall, the two lids and the canopy door, the occupant gate and
   the closures.

   ── body-14's header follows, as the record of the outline. ──
*/

/* (body-14) Gen 14 body: the outline.

   body-13 with its greenhouse drawn against the head it holds rather than
   the flank it stands on. design/retro-gen13.md section 5 decomposed Gen 13's
   1.6687 m2: the core inside |z| 0.600 is about 1.39, the tire and pant
   columns 0.22, and of the core the band above the belt seam is 0.32, of
   which the side glass at the maximum section runs (0.955, 0.600),
   (1.125, 0.575), (1.230, 0.390), (1.254, 0.300): 1.15 m of glass width at
   y 1.125, a hand over the eye line, beside a head 0.165 m wide on the
   centerline of a tandem cabin, with the A-pillar 200 mm inboard of it and
   the roof rails at 0.300. Every other dimension of the outline is set by
   something, and that one was set by body-11 carrying the flank's width up
   to the belt. So the band between the belt seam and the deck shoulder
   comes in at the cabin stations: profile point 5 from (1.125, 0.575) to
   (1.040, 0.585) and point 6 from (1.230, 0.390) to (1.215, 0.380) at
   stations 8 to 11, eased into the tail at 12 to 15b so the two crease
   lines stay fair, and nothing else moves: the flank and the belt seam at
   point 4 hold (autonomy-13's flank cameras sit on that surface at x 0.780
   and hv-11's port rim on it at x -1.845), the deck at point 7 and the
   crown hold (the roof antennas, the header frame, the bows and the liner
   sit under or on them), and every lower point holds because the sill, the
   pan and the tires did not move.

   THE THREE MEASUREMENTS THAT SET THE TWO NUMBERS, in the order the design
   doc fixed them:
     the roof rail at |z| 0.300, y 1.227, r 0.021: the skin passes its
       up-and-outboard quadrant at 0.325 against the rail's 0.315, 10 mm
       outside it, where body-13's passed 31 mm outside; point 6 moved out
       from a first draft at (1.200, 0.410) to keep that 10 mm
     autonomy-13's flank camera pads at (0.780, 0.945 to 1.010, |z| 0.577)
       on a surface that reads 0.590 at 0.945 and 0.574 at 1.010 on body-13:
       point 4 holds at stations 7 and 7b and at 8, and at x 0.780 the loft
       between 7b and 8 is 87 percent 7b, so the surface there moves by
       under a millimeter and the pads stay seated
     the occupant's head at 1.1829 under the liner at 1.2330: 50.1 mm, and
       the +5, +10 and +15 degree sightlines still leave through the canopy,
       because the crown and the deck are where body-13 put them

   WHAT IT MEASURES, by the sweeps that own each number (tools/area.sh,
   tools/aero.sh, tools/occupant.sh, tools/check-interfaces.sh), filled in
   from the runs and not from the drawing:
     frontal area     1.6398 m2 on wheels-14 against body-13's 1.6687 on
                      wheels-13: this body on wheels-13 reads 1.6429, so the
                      greenhouse is worth -0.026 of the -0.029 and wheels-14's
                      shells the other -0.003 (design/gen14.md priced the
                      greenhouse at -0.018 and the sweep found more)
     Cd               0.1151 on wheels-14 under the third revision, against
                      body-13's 0.1327 on wheels-13; CdA 0.1887 against 0.2215
     the walk         both streams to the Kamm, upper base 0.4132 m2 to x -2.68 at 13.6 degrees, lower 0.0770 to x -2.68 at 15.3
     wetted           23.613 m2 with wheels-14 and battery-11 (body-13: 23.767)
     maximum section  1.4825 m2 at x -0.45 (body-13: 1.5076)
     parked           5.077 m long, 1.684 m wide at the spats, 1.274 m tall
                      at autonomy-13's roof antennas over a 1.265 glass crown
     mass             271.5 kg (body-13: 272.3): the canopy and the skin
                      re-priced off their drawn areas at body-13's own areal
                      densities (0.9642 and 0.9919 of their areas, 13.5 and
                      35.7 kg), every other part carried

   THE DOOR HINGE FOLLOWS THE DECK SHOULDER. body-13 seats the canopy door's
   axis 8 mm above and 21.5 mm inboard of the deck shoulder at (1.2380,
   0.3685); this body keeps both offsets on the new shoulder, (1.2230,
   0.3585), and the closure sweep re-measures the leaf: 50 degrees, 133.7 mm
   of curbside against body-13's 148.7 and clean over 50 parts; the hood and
   the decklid as before, the hood's sweep now reading the cage 0.3 mm deeper
   than at rest where body-13's read clean, on a hood and a cage that did not
   move, which is the one loft resampled and is printed as the warning it is.

   THE REAR SPAT WALL IS body-13's, 0.18 to 0.52 at |z| 0.840, measured
   three times at Gen 13 and kept; design/retro-gen13.md section 4 found it
   hides 0.017 m2 of the 0.105 the rear tire would show without it, because
   it is edge-on and its closure stands behind the wheel, and wheels-14
   answers that with a crown band on the hub rather than with this wall.
   The wall keeps its two measured jobs, the tire's side fairing and the
   underbody channel's side wall, and this body does not touch it.

   CARRIED FROM body-13 AND STILL TRUE, so it is kept below this header
   rather than rewritten: the cabin on the lid, the cowl and the hood, the
   luggage bay, the tail against the cone walk, the port datum, the two lids
   and the canopy door, the occupant gate and the closures.

   ── body-13's header follows, as the record of the floor. ──
*/

/* (body-13) Gen 13 body: the floor.

   body-12 with its cabin brought down to the floor it already had. design/
   retro-gen12.md section 5 measured what the roof was floored by, and it was
   not the pack: battery-11's lid at y 0.3020 is the cabin floor, interior-11
   stood a 150 mm seat pan on tracks on it, and the occupant's head at 36
   degrees of recline sat 1.2479 m up under a 1.3220 crown. interior-13 puts
   both seats on the lid as shells, H-point 0.3420 instead of 0.4070, and
   this body follows the head down: every crown and upper profile point from
   the glass base aft is body-12's less 0.065, the cowl 1.0700 to 1.0050 over
   a dashboard that tops at 0.9850 and under an eye at 1.0270, the crown
   1.3220 to 1.2570, the Kamm face 0.952 to 0.887 at its top. The lower four
   profile points do not move, because the sill, the pan and the tires did
   not; the nose is held station for station as crash budget; the tail is
   scaled vertically above its own waterline so its cone keeps its shape.

   WHAT IT MEASURES, by the sweeps that own each number:
     frontal area     1.6381 m2 on wheels-11, 1.6687 on wheels-13 (tools/area.sh)
                      against body-12's 1.7162: the roof is worth -0.078 and
                      wheels-13's pants cost +0.031 of it back
     Cd               0.1326 on wheels-13 under the third revision (tools/aero.sh),
                      against body-12's 0.1788 on wheels-11: the front pants
                      take the wheel term from 0.0781 to 0.0335, the smaller
                      cabin takes friction from 0.0586 to 0.0584 and base
                      from 0.0209 to 0.0191; CdA 0.2213 against 0.3068
     the walk         both streams to the Kamm at x -2.68, upper 13.5 deg,
                      lower 15.3, base 0.4903 m2 (body-12: 0.5361)
     wetted           23.767 m2 with wheels-13 and battery-11 (body-12: 24.200)
     maximum section  1.5076 m2 at x -0.45 (body-12: 1.5858)
     parked           5.077 m long, 1.684 m wide at the spats, 1.274 m tall
                      at autonomy-13's roof antennas over a 1.265 glass crown
     mass             272.3 kg (body-12: 276.0): cage, skin, doors and tail
                      cone re-priced off their drawn areas at body-12's own
                      areal densities (0.984, 0.947, 0.839 and 0.940 of their
                      areas), the luggage bay added at 3.3

   THE REAR SPAT WALL WAS MEASURED AT THREE HEIGHTS AND STAYS AT 0.52, which
   is the first thing this module declined. design/gen13.md lever 2 asked
   whether the wall could rise to hide the tire's crown; drawn and swept on
   this body with wheels-13: 0.52 reads CdA 0.2213 with the upper stream to
   the Kamm at 13.5 degrees and no bubbles, 0.62 reads 0.2203 through seven
   reattaching bubbles at 16.7 degrees, 0.71 separates the upper stream at
   x -1.86 with a 0.96 m2 base and reads 0.2863. A wall parallel to the
   stream is edge-on in a frontal projection; only its leading blend shields
   the tire, so 100 mm more wall bought 0.0024 m2 of tire and 0.001 of CdA
   and put the tail's closure past the limit seven times. The SPAT_TOP
   constant carries the ledger.

   THE FRONT ARCH IS NOT RELIEVED, which is the second thing it declined,
   and the retrospective that asked for it was wrong about where the foul
   is. "The 3.0 degree steering foul" wheels-9 and wheels-11 record is the
   front tire's inboard corner swinging into battery-10/11's pack corner
   closeout at |z| 0.6550, at the tire's equator height; the flank at 0.600
   exists only above y 0.608, and there the tire's inboard edge is at x 1.214
   or further forward, 0.236 m off the kingpin plane, and swings 57 mm to
   0.615 at 14 degrees: 15 mm clear. So the foul is the pack's and the
   track's, it stays recorded in the wheels panel that owns it, and this
   body keeps body-12's arch.

   THE LUGGAGE BAY IS NEW AND IT IS WHAT body-12 SAID WAS OWED: a floor at
   y 0.7750 from the decklid's forward cut at x -1.160 back to -2.500, 35 mm
   over the rear casting and 11 over autonomy-13's compute plate, 660 mm
   between liner walls at |z| 0.330, 33 mm inboard of hv-11's charge-port
   body. interior-13 deletes its 61 liter cabin locker into it. Swept at
   20 mm against every gen13 module: 250 liters of free air inside the
   liner and one clear box of 1,060 by 620 by 160 mm, 105 liters, on this
   floor under the decklid. body-12 measured 156 in a clear box under a roof
   65 mm higher and 61 in a locker; the rung trades 217 in two places for
   250 in one, reachable through a lid that opens 60 degrees.

   THE COWL CROSS MEMBER DOES NOT COME DOWN. It stays at y 0.870 with its
   crown at 0.896 because interior-13's hand-wheel shoes and autonomy-13's
   driver monitor stand on it, and interior-13's dashboard tops at 0.985
   with 89 mm over it; what comes down is the skin and the glass. The cowl
   beam under the glass base moves 1.048 to 0.983 with the base and the hood
   hinge axis rides 6 mm above the panel on it.

   CARRIED FROM body-12 AND STILL TRUE, so it is kept below this header
   rather than rewritten: the tandem section, the pan and the shoulder over
   battery-11's sill, the ARCH at every wheel station, the spats as a wall
   with a trailing closure, the tail drawn against the cone walk, the port
   datum held for hv-11, the cab-forward glass base and the cowl beam, the
   two lids and the canopy door, the occupant gate and the closures. Every
   number in the body-12 text that names a height above the sill is 65 mm
   lower here, and the sections that state one (the hood stations, the roof
   and liner planes, the decklid and door axes) say so at the line.

   ── body-12's header follows, as the record of the rear and the front. ──
*/

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

/* GEN 20: THE CHANNEL SKIRT. body-19 with the rear spat wall's upper run
   given back: wheels-20's saddle band wraps the tire to 39 mm off the road,
   so the body-side wall from y 0.355 to 0.520 shielded nothing twice, and
   what remains is exactly what the lower stream needs, the underbody
   channel's side wall from 0.18 to 0.355 with its leading blend and
   trailing closure re-eased at the new height. design/gen20.md is the
   brief. Everything not named there is body-19's, byte for byte, and the
   notes below this block are the inherited record. */
import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';
import { mirrorZ } from './body.js';

/* Gen 11's envelope, declared LOCALLY. Not one P constant is touched, the
   way body-9 declared its own FRONTZ rather than editing P.wheelZ. */
const FRONTZ = 0.74;          /* front wheel center, track HELD at 1.48 */
const CABIN = 0.560;          /* greenhouse half-width, 1.12 m built (Gen 11 to 14: 0.600) */
const ROOF = 1.265;           /* built roof: Gen 11's 1.330 down 65 mm, design/gen13.md section 4 */
const SILL_Z = 0.7800;        /* battery-11 sill outer face */
const SILL_TOP = 0.4200;      /* battery-11 sill top face */
const HEAD_ZI = 0.6600;       /* battery-11 sill head inner face */
const PAN_T = 0.0300;         /* pan section, 30 mm */
const PAN_FLANGE = SILL_TOP + PAN_T;   /* 0.4500, the loft's bottom edge */
const PAN_X = 1.030;          /* pan half-length: battery-11's screw run */
const SHOULDER_X = 1.030;     /* the shoulder is full section to here */
const ARCH_X = 1.120;         /* and closed to the flank base by here */
const SPAT_TOP = 0.5200;      /* Gen 20 KEEPS the height and moves the metal: the
                                 first cut capped the wall at 0.355 and the upper walk
                                 separated at 18.8 degrees at x -0.96, because the
                                 shoulder's 0.78 half-width ends at -1.03 and the wall
                                 was what caught it; a wedge eased it to 18.0 and no
                                 further. So the wall keeps body-12's height for the
                                 WALK and gives the SILHOUETTE back by leaning: from
                                 y 0.355 up the surface kinks inboard to 0.8055 at the
                                 top edge, inside the pant band's own 0.8055, so the
                                 union above the split line never sees it; the skirt
                                 below 0.355 stays at 0.820 for the channel. The area
                                 give-back is the union's, the sections are the
                                 walk's, and the two no longer fight over one plane.
                                 spat wall top, body-12's, KEPT after measuring.
                                 design/gen13.md lever 2 asked whether the wall
                                 could rise; three heights were drawn on this
                                 body with wheels-13 and measured by tools/aero.js:
                                   0.52  A 1.6688  Cd 0.1326  CdA 0.2213  upper
                                         stream to the Kamm at 13.5 deg, clean
                                   0.62  A 1.6717  Cd 0.1318  CdA 0.2203  to the
                                         Kamm at 16.7 deg through 7 bubbles
                                   0.71  A 1.6751  Cd 0.1709  CdA 0.2863  upper
                                         stream SEPARATES at x -1.86, base 0.96
                                 A wall parallel to the stream is edge-on in a
                                 frontal projection: only its leading blend
                                 shields the tire, so 100 mm more wall bought
                                 0.0024 m2 of tire and 0.001 of CdA and put the
                                 tail's upper closure past the limit seven times.
                                 The enclosure lost on body-12 and loses again. */
const KAMM = -2.6900;         /* tail station: 5.097 m built, the length the
                                 taper needed rather than the length the old
                                 tail happened to have */

/* THE TAIL'S UPPER STREAM, TAKEN TO THE LIMIT. design/gen16.md section 4.
   body-15's upper stream ran to the Kamm at 13.6 degrees of equivalent cone
   against the 15 degree limit tools/aero.js has always used, and
   design/retro-gen15.md section 5 named the 1.4 degrees as the one
   coefficient lever left to a body. So from station TAILX aft the upper
   four profile points and the crown of every tail station shrink about the
   waterline (profile point 3, the underbody's side wall, which does not
   move) by a factor that grows linearly to TAILK at the Kamm face: y toward
   the waterline, z toward the centerline, the lower four points untouched
   because the lower stream is the venturi floor's and the diffuser's and
   already reads 15.3. TAILK and TAILX were swept with the shipped buildup
   (nine combinations in design/gen16.md section 4): starting the shrink at
   -1.950 or -2.100 puts the equivalent cone over 15 before the base has
   fallen far, starting at -2.350 separates the stream at x -2.46, and
   -2.300 at 0.22 reaches the Kamm at 14.89 degrees with the upper base
   from 0.4132 to 0.3332 m2 on the bare loft (14.57 and 0.3470 as built,
   with the blade and the bay walls in the sections). The Kamm face
   therefore spans y 0.265 to
   0.828 and is 0.48 m wide at its top against 0.887 and 0.62; what it
   costs the luggage bay is in that part's panel, measured. */
/* GEN 19: THE TAIL PAST THE FACE. From KAMM the whole section keeps closing
   to a tip DL meters aft: the flanks at PLAN degrees a side in plan, the
   crown down at TOP degrees, the floor up at FLOOR, all linear, so every
   surface angle is a typed number and the equivalent cone is whatever they
   make. Measured through the shipped march before this file existed
   (design/gen19.md 4b, tools/gen19-tail.sh): the upper walk 14.9 degrees at
   its worst window and the lower 14.2, both clean of bubbles, against the
   method's 15; at 10 degrees of floor the lower stream separates the moment
   the floor crosses the y 0.35 sill line the streams are split on, and at
   0.75 m of tail both walks bubble eight times as the section vanishes, so
   the tail ends at a 0.077 m2 base rather than a point, and the brief says
   why that is what a boat tail is under the five-column rule. The floor
   figure is the SIDE profile's; the underbody itself is the diffuser ramp's
   continuation, drawn in the flap part below. */
const G19 = { DL: 0.60, PLAN: 15, TOP: 15, FLOOR: 8 };
const TIP = KAMM - G19.DL;    /* -3.2900: the tip ring; the cap and the light
                                 guide put the built car at about 5.70 m */
const TAILK = 0.00;           /* Gen 18: OFF. Gen 16's 0.22 compounded on a section already 85 percent shrunk read 17 degrees in the last window (design/gen18.md 4b); the ramp below does all of it */
const TAILX = -2.300;         /* the station the shrink begins at */
const TAILWY = 1.0, TAILWZ = 1.0;   /* y toward the waterline, z toward the centerline, both in full */
const tl = (x, pts, crown) => {
  const f = TAILK * Math.max(0, (TAILX - x) / (TAILX - KAMM));
  const y3 = pts[3][0];
  const up = pts.map((q, k) => k < 4 ? q : [y3 + (q[0] - y3) * (1 - f * TAILWY), q[1] * (1 - f * TAILWZ)]);
  return [x, up, y3 + (crown - y3) * (1 - f * TAILWY)];
};
export const SYSTEM = {
  id: 'body-24',
  name: 'Body · Gen 23 the flank',
  color: 0xdcf2fb,
  explode: [0, 1.7, 0],
  blurb: 'body-22 with the cabin flank brought in 30 mm a side and the nose falling. The flank is Gen 15\'s move available again: that rung took this surface from 1.20 m to 1.12 for a pair of shoulders, Gen 18 then put one occupant on the centerline, and the flank never followed. Probed in the two bands it owns there is 42 mm of clear air behind it, the nearest tenants a flank camera at |z| 0.5184 and the recovery core at 0.5110, so fifteen loft stations come from 0.560 to 0.530 with the tumblehome eased above them. Measured before it was committed: area 1.5416 to 1.5268, three times Gen 22\'s win, wetted 22.531 to 22.439, CdA 0.1250 to 0.1241. It raises Cd by 0.0002, and that is why the ladder\'s third column is CdA now: friction is 69 percent of this coefficient and is charged against the very area being cut, so on a body this slender every remaining area lever raises the normalized number while lowering the drag the car actually feels. The two front hood crowns drop because Davis asked for a better front; it is worth about a mile and this panel refuses to credit it with more.\n\n' + 'body-21 with 200 mm of front overhang deleted, for the friction the coefficient is made of. The fascia block translates whole, stations 0 and 1 to x 2.175 and 2.020 with the valance, the gates, the light band, the splitter and the venturi throat riding it, so the crown rise and the pedestrian angles carry to the digit; station 2 compresses to 1.920 and the hood shortens with its run. Measured with the buildup\'s own tool: tip 2.1831 against 2.3831, wetted 22.697 m2 against 23.285, and the four forebody proxies identical to the parent (edgeE 0.159, cowl break 13.0 degrees), so the term the cut could have re-priced stays zero. The crash rails keep their 55 kJ fuse by force instead of stroke, 190 kN over 145 mm against 120 over 230, wall 3.0 to 4.1 mm, and the panel owns the stiffer pulse. What ends here on purpose is the nose hold: ten generations kept station 0 at x 2.375 as crash budget, and holding that length held the one partner interface that survived every rung untouched, autonomy\'s band face; the contract does not break, it moves, and autonomy-22 lands its pucks on the translated face at the same relative coordinates. And the spat wall follows again: wheels-22 re-derives its pant standoff for a wall that rides the knuckle and the plane comes in 3.5 mm, so this wall runs at 0.7920, 1 mm under it, with its taper and rub lip riding along, which is the whole of the rung\'s area column.\n\n' + 'body-20 with the wall followed and the cradle grown, for the axle that became a centerline. The spat wall\'s whole plane comes in 10 mm to 0.7955, flush under the pant band\'s new 0.7965, and its 2 mm mid easing retires because at the followed plane it would have owned the outline the pants now cap: that follow is the rung\'s whole area column, and it is only possible because the wall no longer has a tire inside it to clear. The rear casting inherits the suspension\'s home: two pivot arms run from the old cradle-mount bosses (whose subframe tenant left) to clevises on the swingarm axis at x -1.050, a cross-tie closes them 45 mm ahead of the tire, a spring tower spans under the compute hulls with its underside face on the declared y 0.6150, and two rails in the tail carry the converter the wheel displaced. Two things were measured and not built: no center wheelhouse dome (the tail interior is empty above the jounced crown) and no wheelhouse skins to delete (the walls were always the arches). The venturi redraw the same probe waved off turned out to be real: the rear closeout plate spanned the wheel\'s band at y 0.10 with every vertex at its far edges, the vertex probe\'s third blind spot of the rung, and the checker put the house 90 mm inside it; the plate is now the twin channels the brief named, edged against the drooped tire\'s chord. 46.3 kg on the casting against 40, derived; 11.9 on the wall against 12.2.\n\n' + 'body-19 with the rear spat wall re-read for a wheel that now wears its own full fairing. The wall keeps its height, because the first cut capped it at the sill line and the upper walk separated at 18.8 degrees where the shoulder ends (the sections lost 0.086 m2 in one window, measured); what it gives back instead is the silhouette: from y 0.355 the surface kinks inboard to 0.8055 at the top edge, inside the pant band\'s own plane, so the union above the split line never sees it and the frontal area falls 1.5570 to 1.5485 m2 with the walk clean at 15.0 through one 25 mm reattaching bubble at the blend. The lead blend finishes by x -1.095 for the saddle\'s forward reach at rear steer; the ledger splits by duty, the skirt at the wall\'s 16 kg per m2 and the sheltered upper band at the skin\'s 7.52. Measured on the gen20 set: 1,228.6 kg, 1.5485 m2, Cd 0.0880, 88.7 Wh/mi, 2,141 miles, every column on Gen 19. The plan\'s words for this rung were a body-side enclosure, and design/gen20.md row W6 prices them: +0.090 m2 of arches over 14 degrees of lock, two columns failed, 39 miles lost against the fairings; the record now has the number body-12 paid, reproduced under the third revision.\n\n' + 'body-18 with 600 mm of boat tail past its Kamm face, for the base the single seat could not close: the pack\'s sidewall band. From x -2.690 the whole section keeps closing to a tip at -3.290, the flanks at 15 degrees a side in plan, the crown down at 15, the floor up at 8, every angle typed and linear; the march reads the upper stream at 14.9 degrees at its worst window and the lower at 14.2, no bubbles, against the method\'s 15, and the summed base falls from 0.3154 to 0.0774 m2. The Kamm spoiler is deleted with the base it worked on, and its airbrake authority goes with it, stated; the diffuser flap goes fixed, its drives deleted, because a ramp run out to the tip at 12.8 then 4.1 degrees has nothing left for a control to guard; the surround camera pod comes flush into the flank it had stood 38 mm outside since Gen 15; the rear guide and the marque ride the tip. Measured on the gen19 set by the sweeps that own each number: frontal area 1.5570 m2 on wheels-17 against 1.5580, and the pod is the 0.0010 of it; Cd 0.0918 against 0.1034, CdA 0.1429 against 0.1611, the largest coefficient step since Gen 13; the summed base 0.0774 m2 against 0.3154 and the base term 0.0013 against 0.0109; wetted 23.37 m2 against 22.60; 266.1 kg against 268.9, the spoiler and the flap mechanism paying for the tail\'s skin; on the gen19 set 1,231.3 kg, 89.9 Wh/mi, 2,112 miles, every column on Gen 18. The car is 5.70 m long against 5.10 and every millimeter of the growth is rear overhang: the capability cost, stated.\n\n' + 'body-17 with its roof descending from the single head and its belt seam in, for a car that carries one person: the rear seat is gone, so from x -0.35 the upper section of every station shrinks about its waterline by a ramp that reaches 85 percent at the Kamm face, eased where the lower body has its own steps; the belt seam comes in from 0.550 to 0.460 over the cabin stations; the bows, the roof rail and the C-pillar read the loft; the luggage bay shortens to the ceiling it has and the space behind the seat is a well. Measured on the gen18 set by the sweeps that own each number: frontal area 1.5580 m2 on wheels-17 against 1.5805; Cd 0.1034 against 0.1100, CdA 0.1611 against 0.1738; the upper section at the Kamm face 0.238 m2 against 0.347; wetted 22.60 m2 against 23.38; the upper walk clean to 15.0 at its worst station and the lower to 14.3; 268.9 kg against 269.9, every changed part re-priced off its drawn area; on the gen18 set 1,234.1 kg, 93.0 Wh/mi, 2,041 miles, every column on Gen 17.\n\n' + 'body-16 with the rear spat wall following wheels-17\'s rear tire in, 0.84 to 0.81 on its straight run, the trailing closure and the rub lip with it, because the wall is the car\'s outline at the rear below the shoulder and a wall 72 mm off its tire is a wall in the wake. Measured on the gen17 set: 1.5739 m2 on wheels-17 against 1.5975 on wheels-15.\n\n' + 'body-16: body-15 with the canopy glass flush with the loft and the tail\'s upper stream taken to the 15 degree limit the drag method has always used: the two skin levers design/retro-gen15.md named as the last a body could take on this package. The 8 mm the glass stood proud was the car\'s whole crown in the frontal projection, 0.0089 m2 of area nothing needed, and alone it reads Cd worse, the trap a fourth time; from x -2.300 aft the tail\'s upper section shrinks about its waterline until the upper stream reaches the Kamm at 14.89 degrees on the bare loft (14.57 as built, with the blade and the bay walls in the sections), the upper base from 0.4132 to 0.3470 m2, and that is what buys the coefficient. Measured by the sweeps that own each number: frontal area 1.5975 m2 on wheels-15 against 1.6064; Cd 0.1104 against 0.1140, CdA 0.1764 against 0.1832; 269.9 kg against 271.0. The luggage bay\'s walls follow the ceiling down and its panel states the cost; the blade and the light band narrow with the face; autonomy-16 re-seats the rear camera.\n\n' + 'body-15: body-14 with its flank brought in from 1.20 m to 1.12 m from the shoulder up, at every station from the front arch to the port, and its hood brought down to meet the glass at the angle the drag method scores at zero. design/retro-gen14.md probed the flank band and found nothing in it the occupant needs: a 0.52 m pair of shoulders in a 1.20 m cabin, and for company a recovery core, a charge port, two zone drops, two camera pads and this body\'s own pillars. The front casting\'s corners at |z| 0.550 set the number at 0.560. The four tenants move in their own modules, each a planned fork; the cage\'s hinge pillar and rear leg move inboard with the skin; below the shoulder the cabin is the rear occupant\'s feet\' and does not move. Measured by the sweeps that own each number: frontal area 1.6064 m2 on wheels-15 against 1.6398; Cd 0.1140 against 0.1151, CdA 0.1831 against 0.1888, the cowl break 15.1 degrees against 24.9; 271.0 kg against 271.5, canopy, skin, shoulder and cage re-priced off their drawn areas.\n\n' + 'body-13 with its greenhouse drawn against the head it holds instead of the flank it stands on. design/retro-gen13.md measured the side glass at 1.15 m wide at y 1.125 beside a 0.165 m head on the centerline of a tandem cabin, with the A-pillar 200 mm inboard of it, and found it to be the one dimension of the frontal outline set by nothing: body-11 carried the flank\'s width up to the belt and two bodies moved that section down without asking. So the band between the belt seam and the deck shoulder comes in at the cabin stations, point 5 from (1.125, 0.575) to (1.040, 0.585) and point 6 from (1.230, 0.390) to (1.215, 0.380), eased into the tail; the flank, the belt seam, the deck and the crown hold, so the flank cameras, the port rim, the roof antennas, the bows and the liner stay where they were, and the occupant keeps 50.1 mm and every upward sightline. Measured by the sweeps that own each number: frontal area 1.6398 m2 on wheels-14 against 1.6687, the greenhouse worth -0.026 of it; Cd 0.1151 under the third revision against 0.1327, CdA 0.1887 against 0.2215; 271.5 kg against 272.3, the canopy and the skin re-priced off their drawn areas at 0.9642 and 0.9919 of body-13\'s. The door hinge follows the deck shoulder and the closure sweep re-measures the leaf. The spat wall is body-13\'s and stays: wheels-14 fairs the rear crown on the hub.\n\n' + 'body-12 brought down to the floor it already had. design/retro-gen12.md measured what the roof was floored by and it was a seat riser, not the pack: battery-11\'s lid at y 0.3020 is the floor, interior-11 stood a 150 mm pan on tracks on it, and the head sat under a 1.3220 crown. interior-13 puts both seats on the lid as shells, H-point 0.3420, and this body follows: every crown and upper profile point from the glass base aft is body-12\'s less 65 mm, the cowl 1.0050 over a dashboard at 0.9850 and under an eye at 1.0270, the crown 1.2570, the Kamm face to 0.887. The sill, the pan, the tires and the nose do not move. Measured by the sweeps that own each number: frontal area 1.6381 m2 on wheels-11 and 1.6687 with wheels-13\'s front pants, against body-12\'s 1.7162; Cd 0.1326 under the third revision of the drag buildup against 0.1788, CdA 0.2213 against 0.3068, both streams still to the Kamm at 13.5 degrees; 272.3 kg against 276.0, the cage, skin, doors and tail cone re-priced off their drawn areas. Three things were measured and declined: the spat wall at 0.62 and 0.71 (the second separates the tail), a relieved front arch (the steering foul is the tire into the pack corner, not into the flank), and a rear pant. One thing was added: a luggage bay on a floor at y 0.7750 under the decklid, 250 liters of swept free air and a 105 liter clear box, which is what body-12 said was owed and what interior-13 deletes its cabin locker into.',
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
      note: 'Gen 21: the tenant left with the subframe; the bosses stay as the pivot arms\' roots and the plane stays declared as their datum. Single-declarer, warns, and that is the honest state.',
    },
    /* ── GEN 21: the swingarm\'s planes, body\'s half. suspension-21
       declares the same two keys from its side; the checker closes them. */
    'swingarm-pivot-face': {
      kind: 'face', axis: 'z', at: 0.1410, tol: 0.002,
      part: 'rear-casting', mirrored: true,
      note: 'the clevis outer ear\'s inner face at (-1.050, 0.355, |z| 0.1410); suspension-21\'s pivot bush outer end faces close on it.',
    },
    'center-spring-top': {
      kind: 'face', axis: 'y', at: 0.6150, tol: 0.002,
      part: 'rear-casting', mirrored: false,
      note: 'the spring tower\'s underside face at (-1.36, 0.6150); the center spring plate\'s three studs and the damper plate\'s rise into it.',
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
      mass: 13.5,   /* Gen 18: 19 x 0.71, with the leaf's drawn area */
      seconds: 1.6,
      seat: 'Gen 18: the leaf ends at -0.450; the axis does not move. Deck shoulder at y 1.2230, axis along x at |z| 0.3585, inboard of the cage roof rail: body-13\'s 8 mm over and 21.5 mm inboard of a shoulder that moved to (1.215, 0.380) (body-13: 1.2380, 0.3685)',
      motion: [
        { kind: 'swing', axis: [1, 0, 0], pivot: [0, 1.2230, 0.3585], deg: -50 },
      ],
      why: 'The axis lies along the car instead of standing across it, and that is forced by length. A door on a vertical hinge sweeps its own length times the sine of its angle, so the cost of opening it grows with the aperture, and a tandem cabin makes the aperture as long as the cabin: hung on a vertical hinge at its forward cut, the trailing edge of this leaf reaches |z| 2.247 at 67 degrees against a parked half-width of 0.809, so it would want 1.438 m of clear ground beside a car that is only 1.618 m wide. Rotating about a fore and aft axis makes the cost grow with the panel depth instead. Measured on body-11 that was 231.5 mm of curbside; on this body the checker reads 198.5 mm, and the door did not change, the car did: the spats put the parked width at 1.684 m against 1.618, so the same leaf reaches 33 mm less beyond the widest point of the car it is attached to. The panel never leaves a 2.50 m stall at any point in its travel.\n\nThe leaf is the flank and the tumblehome together, and that pairing is the whole of what makes this a door rather than a hatch. The flank alone opens 408.8 mm between its own lower edge at y 0.6192 and the canopy band above it, over a shoulder standing at |z| 0.7275 with the sill top at y 0.4200. A 409 mm letterbox above a 620 mm sill is not ingress by any definition. Taking the glass up to the deck shoulder with it opens 683.8 mm, from the flank base at 0.6192 to the fixed roof band at 1.3030, which is a low sports car\'s door and a car somebody can get into.\n\nWhere it parts is the argument, because a bonded structural band cannot open and this body needs one. The cage carries the side ring, A-pillar to roof rail to C-pillar, with three transverse bows across the roof and its rails at |z| 0.300, and deleting the B-pillar put the mid-span side load into battery-11\'s sill. So the piece that must stay bonded is the roof band between the two deck shoulders, sitting over the bows and the rails, and that is exactly the piece left behind: ring 6 to 10. What travels is ring 10 to 12 each side, the tumblehome between the deck shoulder at y 1.3030 and the beltline seam, which spans nothing structural at all. The rails are inboard of it and the sill is below it. The parting line is the deck shoulder, which this module already declares as a hard crease, so the seam a door needs lands where the painted surface already breaks rather than across a face meant to be smooth.',
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
      mass: 5.4,   /* Gen 23: 5.3 x 1.0158, the hood leaf grows as the falling nose lengthens its run; the ledger follows the drawing up as readily as down. */   /* Gen 22: 6.5 x 0.8097, the leaf's drawn area on this loft over body-21's (0.4743 m2 against 0.5858), tools measured: the front edge rides station 1 back */
      seconds: 1.2,
      seat: 'Aft cut at x 1.2700, the glass base, axis carried up to y 1.0110, 6 mm above the panel it hinges (body-12: 1.0760)',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [1.2700, 1.0110, 0], deg: 60 },
      ],
      why: 'Hinged at the back, which airflow chooses rather than the packaging. A hood hinged at the nose that loses its latch at speed is caught by the air and thrown open into the glass; hinged at the cowl, the same failure is a panel the air holds down. That is the whole of why the axis is at x 1.2700 and not at x 2.2173, and it is the one decision on this closure that no measurement on this car could have made.\n\nWhere the axis sits is the measured part, and the section above gives the sweep: on the axis a drawing would use, the outboard end of the cut at y 1.0497, this panel drives 3.603 mm into the fixed cowl band at 60 degrees. On the crown of its own cut it still crosses by 0.024 mm, which is five times the 5 micrometer tolerance every penetration check on this project shares and therefore a real crossing rather than noise. Carried up to y 1.0750, the crown of the cowl deck it swings past, it is clean at every angle from 0 to 90.\n\nAnd it opens onto A frunk, which is a correction to something already in writing. interior-11 states that the frunk is spoken for, because hv-11\'s buffer runs x 1.798 to 2.016 and thermal-11\'s heat pump x 1.789 to 2.047, and that is exactly true of P.frunk, the declared zone at x 1.78 to 2.12. The hood is not cut on P.frunk. It runs x 2.2173 to 1.2700 on this body, 140 mm shorter than body-11\'s because the glass base came forward to meet it, so the zone is 340 mm of a 0.947 m aperture, and the rest of it is over volume nobody had booked. Swept on a 25 mm grid and then verified triangle by triangle against every part in the preset, the largest empty box under this panel is 475 by 600 by 255 mm, 72.7 liters, at x 1.275 to 1.750 and y 0.725 to 0.980: forward of interior-11\'s dashboard, which ends at x 1.246, aft of the heat pump, and above hv-11\'s spine, which is what sets its floor. That is a carry-on and a soft bag, and it is a real number rather than a bounding box, which matters here because interior-11\'s own panel records losing two rear trays to exactly that mistake.',
      cost: [
        'It spends height where a door spends width: 60 degrees puts the leading edge 456.2 mm over the parked car by the checker\'s measure, 122 mm less than body-11\'s hood because the panel is 140 mm shorter. Geometry is not what stops it there, since the sweep is clean to 90, and neither is access, since the bay under it is 255 mm deep and fully open by 60. What stops it is the strut, the wind load on a 0.685 m2 panel standing near vertical, and the garage.',
        'The axis stands 7.6 mm proud of the paint, so the hinge is a link and a bracket rather than a butt pin, and its bearings are in the weather at the top of the cowl where water runs off the windshield. That is the same bill body-9 paid at its door for the same reason, on a rung that had deleted the step a hinge hides in.',
        'Six and a half kilograms is laminate at this skin\'s measured areal density, 6.89 kg per square meter, over a panel 140 mm shorter than body-11\'s, plus hinges, latch, seal and two struts; the mass is carried rather than re-weighed. The strut is a safety part: a 0.947 m panel standing at 60 degrees over a bay somebody has their hands in falls on their forearms if it loses pressure.',
        'The frunk is measured, not built. There is no liner, no floor, no drain and no latch for a load in it anywhere in this model, and the 72.7 liters is the volume between hv-11\'s spine and the underside of the paint. Somebody has to draw the box before the number means luggage.',
      ],
    },
    decklid: {
      name: 'Decklid',
      kind: 'decklid',
      part: 'skin',
      mass: 7.5,    /* Gen 18: the hatch is 1.61 m long against 0.94; the struts and hinges for it, the panel is the skin's */
      seconds: 1.4,
      seat: 'Gen 18: a hatch from -0.490, the glass end, to -2.100, hinged at its front on the roof that is still flat there. Front cut at x -1.1600, axis carried up to y 1.3220, which is 9.2 mm above the panel it hinges on this body: the crown is already falling at the cut, 1.3128 at x -1.160 against body-11\'s 1.3076',
      motion: [
        { kind: 'swing', axis: [0, 0, 1], pivot: [-0.4900, 1.2560, 0], deg: -60 },   /* Gen 18: hinged at the glass end, on the roof that is still flat there */
      ],
      why: 'Hinged at the front, at the cut 40 mm aft of where the canopy glass ends, so the whole panel swings up and away from the cabin and nothing it carries ever crosses the plane of the hinge. The cut positions are body-11\'s, x -1.1600 and -2.1000, carried because the hinge and latch stations had nothing to do with the defect Gen 12 corrects; what changed is everything under and behind them. tools/closures.sh sweeps it clean through its whole 60 degree travel over five partner parts on the gen12 preset, and the published 60 keeps its margin.\n\nWhat it opens onto is the generation\'s second claim. body-11\'s decklid was honest that it was not a trunk: 100 liters of measured air with no floor, over a torque-vectoring controller. On this body the tail is 740 mm longer and every station of it is drawn for the cone walk, which means the volume under this lid is drawn for the air outside and happens to be mostly air inside. Measured the way interior-11 measured its locker, a 25 mm sweep against every triangle in the preset: 806 liters of enclosed free volume under the aperture between x -1.160 and -2.100, 905 aft of the locker\'s back wall at -1.400, and the largest single box clear of everything is 1,200 by 650 by 200 mm, 156 liters, at x -2.615 to -1.415 and y 0.750 to 0.950. That is a shelf the length of a pair of skis and the width of the cabin, directly under the lid, and its floor is this module\'s own tail structure rather than a partner\'s controller, which is what a trunk floor is.\n\nIt is still a measurement and not yet luggage, in exactly the terms body-11 used: there is no liner, no tie-down and no trim drawn in it, and the 61 liter locker interior-11 already built stays where it was, loadable from outside through this aperture as before. What Gen 12 adds is that the capability cost design/gen11.md section 9 booked, a four-seat car\'s rear volume gone with nothing replacing it, now has a measured number standing against it: 156 liters clear in one box, 217 with the locker, where Gen 11 had 100 of unclaimed air and 61 of locker.',
      cost: [
        'The lid straddles two parts. It runs x -1.1601 to -2.0997 and the tail cone begins at the spat closure station x -1.950 on this body, so the aft 150 mm of it is the tail cone\'s rows and the rest is the skin\'s. A closure is one rigid body and carries one part id, so it carries `skin`, and clicking the tail cone no longer selects the strip of deck between x -1.950 and -2.100. The 6 kg is laminate at this skin\'s measured areal density plus hinges, latch, seal and struts.',
        '60 degrees puts the free edge 681.3 mm over the parked car, which the checker measures, 23 mm more than on body-11 because the lid hinges on a deck that is 9 mm lower and swings through a longer tail. Anybody loading the shelf is reaching under a panel whose edge is at head height, held up by struts on a 6 kg lid.',
        'The shelf is 200 mm tall. A long, flat, wide volume is a ski bag and a suit carrier and two soft bags, and it is not a suitcase standing on end. The tail was drawn for the air outside it and the luggage is what the air left.',
        'The tail carries no backlight and this lid carries no glass, so the reversing camera, re-seated on the new face by autonomy-12, and the sensor suite are the whole of the rear view whether the lid is up or down.',
      ],
    },
  },
  parts: {
    /* ── structure ────────────────────────────────────────────────────── */
    'front-casting': {
      name: 'Front megacasting',
      tagline: 'The tower pad does not move by a millimeter. The arms, the horn and the rib follow the nose back; the datum the corner hangs off does not.',
      mass: 29.3,   /* Gen 22: 40 x 0.7328, the drawn area against body-21's (1.5967 m2 against 2.1788), tools measured: the arms shorten by the cut, 0.51 to 0.32 m, the coil horn translates to a front face at 1.870, the rib shortens with the arm and again for the glycol pad it now shares a station with */
      specs: [
        ['Counterpart', 'body-9 front-casting, 45 kg: process, alloy and tower pad identical'],
        ['Gen 22 redraw', 'The arms shorten by the cut, 0.51 to 0.32 m, and the coil horn translates -200 with the nose to a front face at 1.870; the rail handoff rises 120 to 190 kN per side with the shorter stroke and the shortened arms carry it at a higher section utilization, stated; the tower pad and the bushing bosses hold to the digit'],
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
      name: 'Rear megacasting and cradle',
      tagline: 'The subframe left and the casting inherited its job: pivot arms off the old mount bosses, clevises at the swingarm axis, a spring tower under the compute hulls, and rails for the converter the wheel displaced.',
      mass: 46.3,   /* Gen 21: 40 carried plus 6.3 derived for the cradle: two
                       0.72 m arm tubes 2.2, clevis ears, pins and block 0.9, the
                       cross-tie 0.5, the tower box at its drawn wall 1.4, cage
                       ties 0.3, converter rails 0.7, bolts 0.3. The scenario
                       guessed -6.0 for this part by imagining corner reach the
                       casting never had; the drawing answers with the sign
                       flipped and the reason stated. */
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
        'A shorter cantilever is a stiffer one, and a stiffer mount changes the buffet response of what it carries. Gen 19 rewrites the case a third time: the blade and its 183 Nm airbrake moment are deleted and the bonded tail behind the pad grows to 1.06 m, so the joint now sees a smaller but unmeasured spectrum of the tail\'s own lift and buffet, and no version of it has ever been run.',
        'The 0.90 m rear beam covers 75 percent of a 1.20 m body against 68 percent on body-9, which is better coverage of a worse case: a narrow car in a rear impact has less structure per occupant, and this module has no rear-impact model to say by how much.',
      ],
      explode: [-0.85, -0.35, 0],
    },
    'crash-rails': {
      name: 'Crash rails and bumper beam',
      tagline: 'The debt body-9 named and could not pay: its beam corner stood 14.9 mm outside the skin, and on this loft the same corner is 40.6 mm inside it.',
      mass: 11.6,   /* Gen 22: the rails shorten 0.54 to 0.34 m and thicken
         3.0 to 4.1 mm for the same 55 kJ; the shells price 2.3 kg against
         2.6 and the beam, bulkheads and sleeves carry: 12 less 0.4 */
      specs: [
        ['Counterpart', 'body-21 crash-rails, 12 kg: same section family, shorter and thicker'],
        ['Section', '90 x 90 mm octagonal, 4.1 mm wall, 6082-T6 (body-21: 3.0 mm)'],
        ['Mean crush force', '~190 kN per rail over 145 mm; ~55 kJ held (body-21: 120 kN over 230 mm)'],
        ['Rails', '|z| 0.440, x 1.70 to 2.04 (body-21: to 2.24)'],
        ['Beam', 'x 2.01 to 2.07, 1.00 m span'],
        ['Coverage', '1.00 m of a 1.200 m body: 83 percent, carried'],
        ['Fuse pulse', '~34 g at the rail stage against 21: the overhang\'s price, stated'],
      ],
      how: 'An octagonal extrusion with stamped trigger beads folds at near-constant force, and constant force is the design goal because energy is force times stroke: two rails at 120 kN over 0.23 m absorb about 55 kJ. The beam is curved in plan so a partial-overlap hit loads both rails. Everything is bolted against shear sleeves, so a moderate hit is a hand-tool repair with no jig. None of that changes here, and it is worth being explicit that the absorbed energy does not either: the section, the wall, the alloy and the stroke are body-9\'s, and Gen 11\'s mass at the floor case is within a percent of Gen 10\'s, so the same fuse is sized for the same pulse.\n\nGen 22 changes exactly one term of that equation and says which: stroke. A 200 mm shorter overhang leaves 145 mm of designed stroke where 230 stood, and energy is force times stroke, so holding the 55 kJ fuse means 190 kN per rail where 120 stood, which the same octagon buys at 4.1 mm of wall. The pulse is the price: 380 kN into 1,141 kg is about 34 g at the rail stage against 21, a stiffer fuse in the same hierarchy, and the front casting\'s yield margin was re-read against the higher handoff (its panel). What does not change: the energy, the trigger-bead folding mode, the bolted shear sleeves, the curved beam loading both rails on partial overlap.\n\nWhat changed is where the beam ends, and it closes a defect rather than opening one. body-9 recorded that its beam\'s outboard corner sits at (2.27, 0.50, plus and minus 0.65) against a nose loft measuring 0.6351 half-width there, so 14.9 mm of hard structure stood outside the painted surface, carried unexamined since body.js. It also recorded why it could not fix it: shortening the span is a crash decision and body-9 had no reason to make one. This generation does. A 1.30 m beam on a 1.20 m car overhangs the bodywork by 50 mm a side before anything else is considered, so the span comes to 1.00 m at |z| 0.500 and the rails follow to 0.440. Measured on this loft at x 2.27, the half-width at y 0.55 is 0.5406, so the beam corner is 40.6 mm inside the skin. The rails at 0.440 also clear the narrowed cooling stack: thermal-11 does not exist, but the aperture this body meters is 0.44 m wide against body-9\'s 0.532, so a rail at 0.440 is outside it by 0.220 rather than through it.',
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
      mass: 50.2,   /* Gen 18: 51.3 x 0.9777, the drawn tube area on this loft over body-17's, tools measured: the rail and C-pillar under a lower roof */   /* 51.2 x 1.0020: the drawn area on this loft over body-14's, tools measured */
      specs: [
        ['Counterpart', 'body-9 cage, 69 kg: same material, new topology'],
        ['Material', '22MnB5 hot stamped, 1,500 MPa after die quench'],
        ['Roof rails', '42 mm tube on y 1.290 to 1.292 at |z| 0.300 (body-9: 56 mm at 0.510)'],
        ['Transverse bows', '20 mm tube at x 0.300, -0.450, -1.100, each 13 mm under the crown at its own x (Gen 18: the roof descends from -0.350)'],
        ['Sill rail', '25 mm tube on the pan flange at |z| 0.7016; built min y 0.4500'],
        ['B-pillar', 'Deleted: one door aperture per side'],
      ],
      how: 'Gen 18: the roof rail and the C-pillar read the skin they stand under. Aft of the single head the roof descends, and the section narrows faster than it lowers, so a rail typed at crown minus 30 mm stood through the roof at x -1.1 on the first build (the march read it as a 175 mm bubble). Each member is now placed at the loft\'s height at its own half-width plus its radius, 6 mm inside the paint: the rail from (0.55, 1.225) runs level to -0.35 and follows the roof down to -1.10, the C-pillar leaves it there and comes down under the descending skin to the same node on the rear casting at (-1.70, 0.66, 0.42), and the three bows touch the loft at their own x, the head bow at -0.450 standing 310 mm aft of the single crown at -0.14. The liner plane is no longer one height; interior-18\'s liner reads the bows. 50.2 kg against 51.3 by the drawn tube area.\n\n' + 'Rails in a tailored-blank tube at |z| 0.300 under a roof band at y 1.319, A-pillars raked 57.5 degrees from vertical, C-pillars landing on the rear casting boss at (-1.70, 0.66, plus and minus 0.420), and three transverse bows at x 0.300, -0.450 and -1.100 spanning 0.52 m instead of 1.02. The cowl beam and the A-pillar feet come to (0.99, 0.870, plus and minus 0.420) from body-9\'s plus and minus 0.660, because the flank at that station is 0.600 and a foot at 0.660 would be outside the car.\n\nAnd it lands on something, which a cage drawn to the roof alone does not. That cage had a built minimum y of 0.6891. It touched nothing on the car but the shell skin at 3.0 mm and it stopped 269 mm above battery-11\'s sill top and 239 mm above the pan flange. body-9\'s cage lands on its rockers at y 0.4200 and measures a minimum y of 0.4381, so the comparison was available and was not made. This cage carries a sill rail: a 25 mm tube lying on the pan flange at y 0.4500, in the 25 mm of clear flange between the pan upstand\'s outer face at |z| 0.6900 and the 28 bolt heads at 0.7132, with a hinge-pillar leg up to the A-pillar foot and a rear leg up to the C-pillar\'s landing on the rear casting. The rail is horizontal on purpose: a horizontal tube\'s own radius puts its lowest surface exactly on the plane it lands on, and a raked leg stops a radius above it and lands on nothing. Measured on the built mesh the cage now spans y 0.4500 to 1.3190. It lands on the pan flange and not directly on the sill top, which is the shorter statement of the load path: cage, flange, 28 flow-drill screws, sill head, brick stack.\n\nDeleting the B-pillar is the tandem package showing up in the structure. Two occupants in line need one aperture a side and there is nothing between them to hang a pillar on: the rear occupant\'s knees are astride the front seat back at the measured 0.815 m pitch. So the side ring is A-pillar, roof rail, C-pillar, and the mid-span load a B-pillar used to take in a side pole now goes into battery-11\'s sill, which is why that member had to grow to a rated 120 mm of chambered section before this cage could lose a leg. The middle bow at x -0.450 is 182 mm forward of the rear occupant\'s head crown at the booked 36 degrees, which is where a bow belongs.\n\nThe roof structure comes out at 31.0 mm rather than the 30 the stack budgets, and it is measured rather than allocated: the glass is at y 1.3300, the loft crown 8 mm under it at 1.3220, the bows are 20 mm tubes centered on 1.3090 whose crowns touch the loft at 1.3190, and their soffit at 1.2990 is the plane a liner hangs on. Swept over the head corridor, |z| within 0.15 and x 0.350 to -1.150, that soffit is the lowest structure this body puts above an occupant, and at the booked 36 degrees it clears the crown at 1.24795 by 51.1 mm.',
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
      name: 'Gen 12 skin',
      tagline: 'The tub, with its tail back. One surface at |z| 0.600 through the whole greenhouse, and the highlight line now runs 5.10 m to a Kamm the flow actually reaches.',
      mass: 39.4,   /* Gen 24: 39.8 x 0.99068, the skin's drawn area on this loft over body-23's (5.2712 m2 against 5.3208), measured with one entry point on both bodies after buildVariant and build() were found to disagree on other parts. */   /* Gen 23: 40.5 x 0.9823, the fixed skin's drawn area on this loft over body-22's (4.0823 m2 against 4.1559), tools measured: the flank in 30 mm a side. */   /* Gen 22: 43.3 x 0.9361, the skin's whole drawn area, leaves included, on this loft over body-21's (5.3928 m2 against 5.7611, and 43.3 over 5.7611 is the 7.52 kg per m2 this ledger has carried since Gen 18), tools measured: the deleted hood run */   /* Gen 18: 34.8 x 1.2435, the drawn area on this loft over body-17's, tools measured: the hatch from -0.490 is skin where the rear glass was */   /* 35.7 x 0.9736: the drawn area on this loft over body-14's, tools measured */   /* 36 x 0.9919: the skin's drawn area on this loft over body-13's, tools measured */
      specs: [
        ['Counterpart', 'body-9 skin, 46 kg: same laminate, new loft'],
        ['Construction', 'Thin-ply CFRP 1.1 mm, AFP laid, bonded to the cage'],
        ['Stations', '23 rings, x +2.175 to -2.6900; the nose hold ended at Gen 22, glass base at 1.250'],
        ['Greenhouse half-width', '0.6000 built, and swept it is the widest vertex on the car above y 0.6200'],
        ['Roof', 'Loft crown y 1.3220; the built roof is the glass at 1.3300'],
        ['Panel joints', 'Hood x 2.220 to 1.270 and the hatch -0.490 to -2.100 (Gen 18; body-17: decklid -1.160 to -2.100), and both of them open'],
        ['Maturity', 'Skin pilot line; no Cd is claimed anywhere in this module'],
      ],
      how: 'Gen 18: from x -0.35 the upper section of every station shrinks about the waterline by a ramp that reaches 85 percent at the Kamm face, eased through the rear arch, the spat closure and the face; the roof that was flat to -1.10 descends from behind the single head, and the Kamm face\'s upper section reads 0.238 m2 against 0.347. The hatch runs from the glass end at -0.490 to -2.100 and is skin, so this part grows by the rear glass it replaces: 43.3 kg against 34.8 by the drawn area, of which the hatch is the whole difference. Measured on the gen18 set: 1.5580 m2 frontal area, wetted 22.60 m2 against 23.38.\n\n' + 'Twenty-three loft rings of eight profile points and a crown, resampled two for one in both directions with linear interpolation and grooved for the shutlines. The stations forward of x 1.820 keep body-9\'s x exactly, because the nose is crash budget and shortening it would spend crush stroke to buy length that the tail gives up more cheaply. Everything from station 3 aft is this generation, and the shape of it is one sentence: the flank holds 0.600 half-width from y 0.620 upward at every station from x 1.820 to -1.950, which is the whole cabin and both wheel bays, and the tumblehome above that closes to a 0.300 half-width deck line at y 1.319 under a 1.322 crown. Below y 0.620 the ring takes one of three forms and nothing between them: the shoulder over the sill, an arch that stops at the flank base at the front wheels because they steer, and the spat at the rears because they do not.\n\nLinear interpolation is not negotiable here, for the reason body-9 wrote down and this body inherits with more at stake. The clamp in lib.loft protects the envelope, not the projected area: a surface that bulges between two profile points moves the frontal-area integral without touching any extreme. body-9 measured clamped Catmull-Rom at plus 0.64 percent of A and unclamped at plus 2.80. This module publishes a greenhouse half-width of exactly 0.600 and a whole generation rests on the sliver between 0.600 and the tire inner face at 0.6725, which is 72.5 mm. Swept, the widest vertex on this entire body above y 0.6200 measures |z| 0.6000 and it is on this part. A 0.64 percent bulge is enough to eat a fifth of it, so the surface is linear and every clearance quoted in this file is exact rather than nominal.\n\nAnd nothing stands outside the flank, which is a change body-9 could not make. Its camera pods rode on 90 mm stalks at |z| 0.9768 against bodywork at 0.925, so the car measured 1.954 m over the pods and 1.850 m over the paint, and its own panel called that awkward and quoted the market qualifier that lets a camera monitor system be excluded from width. This body flush-mounts the surround cameras into the A-pillar base with their outer face at |z| 0.5980, 2 mm inside the skin, so the built half-width of this car is 0.600 everywhere above y 0.620 and the width on the certificate is the width in the model. The glass was the last thing standing outside that and it is inside it now: a canopy band pushed 1.2 percent outboard makes the built width 1.2144 m. That is worth 0.0041 m2 of protrusion term on body-9\'s own accounting and it is worth more than that as a statement: there is no asterisk on this number.',
      why: 'design/gen11.md section 3 says the design is what moves and the measurement is regenerated at the end, so this panel deliberately publishes no area figure at all. What it publishes instead is the two dimensions the area is a function of, both built and both checkable with a ruler: 0.6000 at the greenhouse and 1.3300 at the roof. tools/area.sh regenerates area from this geometry at integration and whatever it returns is the number, including if it returns something worse than the 1.4705 the feasibility measured on a scaled body-9. The risk register in design/gen11.md already names this as risk 1, that a real loft fairs the shoulder corner and changes the figure, and the correct response to that risk is to draw the loft honestly and let the integrator measure it rather than to tune the loft until it reproduces a prediction.',
      fail: [
        'Thin-ply carbon takes barely visible impact damage, and this car has two open front wheels throwing stones at its flank with no liner in between, and two enclosed rears throwing them at their own spat cavity. Ultrasound spot checks were a schedule item on body-9 and they are a more frequent one here.',
        'The hood leading edge geometry is body-9\'s because the nose is held, but the pedestrian head-impact map is not: a 1.20 m wide nose puts the A-pillar bases 240 mm closer together, and pillar strikes are the part of that map nobody has run.',
        'One uninterrupted 5.10 m highlight line with two shutlines in it is the hardest surface on the car to repair well, and it is harder than body-9\'s because the shoulder crease runs the length of the car underneath it and shows every step in the panel above.',
      ],
      explode: [0, 0.62, 0],
    },
    shoulder: {
      name: 'Shoulder fairing',
      tagline: 'The generation, in one panel: 170 mm of surface that closes a 180 mm step and costs about a thousandth of a square meter because it never leaves the tire shadow.',
      mass: 5.7,   /* 5 x 1.1351: the drawn area on this loft over body-14's, tools measured */
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
    spats: {
      name: 'Rear wheel spats',
      tagline: 'The largest single drag term on the car, deleted by 33 millimeters of laminate. The rear wheels are inside the body now.',
      mass: 11.9,   /* Gen 21: the followed wall sheds its mid easing and 2 mm of plane, -0.3 derived. Gen 20: the wall keeps its area (1.001 m2 against 0.991, tools
                       measured) and splits its ledger by duty. The skirt, 0.54 m2 from
                       y 0.18 to the kink, keeps the 16 kg per m2 the wall has carried
                       since body-12, because it is still the car's edge below the
                       shoulder: the sacrificial band, the rub lip, the curb class. The
                       upper band, 0.46 m2 above the kink, stands inside the pant
                       band's own 0.8055 now, shielded by a saddle that wraps the tire
                       to 39 mm off the road, and nothing reaches it before its own
                       fairing: it is skin, not fence, and it is priced at the skin's
                       measured 7.52 kg per m2. 0.54 x 16 + 0.46 x 7.52 = 12.1, carried
                       as 12.2 with the lip. A density is a duty, and the duty moved. */
      specs: [
        ['Counterpart', 'body-3 front spats, 5 kg, and body-8\'s 83 mm fairing step: Gen 3 skirted the crescents a steered wheel cannot reach, Gen 8 hid a hinge in a step, and this is the first rung to wall a whole wheel'],
        ['Span', 'x -1.120 to -1.950 built; the tire\'s last vertex is at -1.8020'],
        ['Outer face', '|z| 0.8400, which is the tire face at 0.8075 plus 32.5 mm'],
        ['Skirt edge', 'y 0.1800, and it is the underbody\'s side wall from the sill to the diffuser'],
        ['What it deleted', 'wheels marginal shadow 0.1991 to 0.1317 m2; the wheel term was 22 percent of Gen 11\'s drag and is 25 on a much smaller total'],
        ['What it costs', '+0.0304 m2 of frontal area, measured by tools/area.sh, and 12 kg'],
        ['Gen 13 ledger', 'The wall was measured at 0.52, 0.62 and 0.71 on this body with wheels-13: CdA 0.2213, 0.2203 and 0.2863, the last separating the tail. It stays at 0.52. See the SPAT_TOP constant'],
        ['Maturity', 'Production practice: enclosed rear wheels ship on land-speed and record-economy cars and nothing in this panel is speculative'],
      ],
      how: 'Gen 18: the trailing closure is redrawn because the tail it stands beside changed. On body-17 the wall returned from 0.82 to 0.66 over 160 mm, 45 degrees in plan, and the upper walk read 12 degrees across it; on a tail whose upper section is 85 percent smaller the same return read 17 to 19 over 175 mm. The top edge now returns over 670 mm in one taper of about 25 degrees to -2.400, ending 65 mm off the flank; the skirt below the sill line, whose stream was already at 15.0 on body-17, lands on the loft by -2.250 and rides it, so the wall twists between its two edges. The tire\'s z band is still crossed from -1.900 aft, in air. 15.9 kg against 12 by the drawn area, and the upper walk reads 15.0 at its worst station.\n\n' + 'Gen 17: the wall follows the rear tire of the 1.44 m track: |z| 0.8100 over its straight run (was 0.8400), the trailing closure 0.7700 (was 0.8000), the rub lip at 0.798, the leading blend still from the shoulder\'s 0.7800. 22.5 mm off the tire\'s face at 0.7875; the envelope tool sweeps the saddle against it at 3 degrees of rear steer and full rebound before the rung ships.\n\nOne lofted wall per side at |z| 0.8400, and it is not a slice of the master grid, which is the ledger of a design that was measured three times before it shipped. The first drawing blended the master loft itself from 0.8400 back to the flank at y 0.52; every station cleared the tire and the penetration sweep still put the surface 18.3 mm inside it at x -1.191, because the loft interpolates between stations and a tire is a circle while a loft is a line. The second drawing enclosed the wheel outright, holding 0.8400 above the tire\'s bump-travel top per station the way a record car\'s haunch does; the sweeps priced it at +0.114 m2 of frontal area with the maximum section moved aft into the haunch and its closure separating, CdA 0.2831 against the wall\'s 0.2343. The enclosure costs more than the crown it covers is worth, and that sentence is a measurement, run twice.\n\nSo the spat is a wall from y 0.1800 to 0.5200, its surface never entering the tire\'s z band at any x where rubber exists: the leading blend rises from the shoulder\'s own 0.7800 over x -1.050 to -1.130, the trailing closure returns to 0.6600 over -1.900 to -2.060, and the rubber\'s built span is -1.0980 to -1.8020, so both crossings happen in air. The tire face is 0.8075, the standing clearance 32.5 mm, and bump travel moves the tire in y along a wall that is constant in y, so travel never closes the gap. The crown stands over the open top edge and its remaining shadow is charged to the wheels term honestly: 0.1991 m2 of exposed wheel becomes 0.1317.\n\nThe closure is what makes it A fairing rather than A fence. An edge-on wall casts no shadow of its own, so with the wall alone the union still attributed the whole tire band to the wheels and the buildup kept charging Fackrell and Harvey\'s coefficient on it. The trailing closure is bodywork standing in the airstream at the tire\'s own band, which is the geometric statement that the wheelhouse now ends in body rather than in wake, and the inner edge stops at 0.6600, 12.5 mm inboard of the tire face, leaving the flank gap open as the wheelhouse vent.\n\nThe skirt is for the other stream. An earlier draw stopped it at y 0.3000 and the lower-stream walk separated at x -0.96 with a 0.39 m2 base, exactly where body-11\'s did, because below the sill the underbody still stepped inboard the moment the pack ended. At 0.1800 the skirt is the side wall of the underbody channel from the sill\'s end at x -1.06 to the diffuser hinge at -1.90, and the measured lower stream rides to the ramp: separation at x -2.68, base 0.0770 m2.',

      why: 'design/cd-rezero.md measured the wheels at 22 percent of Gen 11\'s drag, 0.1991 m2 of tire standing in clean air on the narrowest car this ladder has built, and named the fairing as the largest single measured lever on the vehicle. It is nearly free in frontal area because the tires already own that shadow: bodywork drawn against their column adds skin thickness and nothing else, and tools/area.sh prices the whole spat at 0.0304 m2. The front wheels are not enclosed, on the record and on a measurement: they steer, and Gen 11 carries a recorded steering-lock foul of 3.0 degrees against 14 commanded. A front spat drawn today would convert an open defect into a designed one, so the fronts keep the open arch and the buildup charges the car for them honestly.',
      fail: [
        'A 180 mm skirt meets the world: curbs, ramps and deep snow all arrive at the quarter panel first. The skirt edge is sacrificial laminate with a bonded rub strip, and the panel above it is the one this module can least afford to repair, because the flank highlight runs across it.',
        'An enclosed wheel is an enclosed brake. wheels-11\'s rear corners are drums on this ladder precisely because regen does the service braking, and a drum\'s duty cycle survives a closed wheelhouse where a working friction disc would cook; the spat is only buildable because the corner was already designed for it.',
        'Snow and stone pack. A cavity that a tire rotates inside collects what the tire throws, and there is no liner drawn in it. The service answer is a bolted skirt panel, and the honest answer is that this model has not drawn the bolts.',
      ],
      explode: [0, -0.30, 1.1],
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
      name: 'Boat tail, full length',
      tagline: 'The Kamm cut answered: 600 mm of closing tail past the face, both walks clean against the limit, and the base term all but gone',
      mass: 10.3,   /* Gen 19: 8.0 x 1.2893, the drawn area over body-18's (2.099 m2 against 1.628), tools measured: the appended band and the tip cap arrive, the old face cap goes */
      specs: [
        ['Counterpart', 'body-11 tail-cone, 8 kg: the compressed tail this one retires'],
        ['Closure begins', 'x -1.950, where the spat truncation lands and the flank owns the width'],
        ['Flank', '0.575 at x -1.950 to 0.4050 at the Kamm face, 12.9 degrees in plan'],
        ['Face and tip', 'The old face at x -2.6900 is a section of the tail now; the tip at -3.2900 is 0.48 m wide, y 0.349 to 0.501, 0.077 m2'],
        ['Overall length', 'about 5.70 m built (body-18: 5.10); every millimeter of the growth is rear overhang'],
        ['Cone walk', 'both streams attached to the tip: upper 14.9 degrees at its worst window, base 0.0744; lower 14.2, base 0.0030; no bubbles'],
        ['Maturity', 'Production practice: boat tails and Kamm truncation are old'],
      ],
      how: 'Gen 19: 600 mm of tail past the face the single seat left, because retro-gen18 measured that face as mostly the pack\'s sidewall band, which no cabin lever could close. The flanks keep closing at 15 degrees a side in plan, the crown comes down at 15, the floor rises at 8, all linear, and the march that prices every body on this ladder reads the upper stream at 14.9 degrees at its worst window and the lower at 14.2, clean of bubbles, to a tip of 0.077 m2. The base term falls from 0.0109 to about 0.0013 of Cd. It does not close to a point on purpose, and the reason is measured, not aesthetic: at 0.75 m both streams bubble eight times as the vanishing section outruns the cone limit, and the skin the extra length adds runs the mass column past Gen 18 while Hoerner\'s base relation, falling as the three-halves power, pays back almost nothing for the last 0.077. A boat tail under a rule that demands literal improvement on every column ends at a small base. What it costs is length: 5.70 m of car against 5.10, all of it behind the rear axle.\n\n' + 'Gen 18: the ramp from the single head reaches these stations at 80 to 85 percent, so the cone arrives at the face with its upper section at 0.238 m2 against 0.347, and Gen 16\'s own 22 percent face shrink is off, because compounding the two on a section already that small read 17 degrees in the last window. 8.0 kg against 9.9 by the drawn area.\n\n' + 'Gen 16: the upper four profile points and the crown of stations 19 to 21 (x -2.400, -2.550, the Kamm) shrink about the waterline by 0.05, 0.13 and 0.22 of their height and half-width, stations 16 to 18 hold, and the lower four points of every station hold because the lower stream is the floor\'s and already reads 15.3 degrees. The walk: the upper stream reaches the Kamm at 14.89 degrees on the bare loft against body-15\'s 13.6 and the method\'s 15, and 14.57 as built with the blade on its struts and the bay\'s tapered walls in the sections (the body module is what the walk sees, on every rung); its base 0.3470 m2 against 0.4132; Cd 0.1104 on wheels-15 against 0.1140, the base term 0.0162 against 0.0201. Nine start-and-depth combinations were swept before this one was drawn: earlier starts pass 15 before the base has fallen far and a later one separates at x -2.46; -2.300 at 0.22 is the pair that touches the limit and no further, which is the sentence design/retro-gen15.md section 5 wrote. The tail cone\'s drawn area is 0.9601 of body-15\'s and its ledger follows, 9.9 kg.\n\nThe stations are generated against the walk in tools/aero.js rather than against a styling buck, and the drawing rule is one sentence: no 200 mm window of the equivalent cone may exceed 15 degrees anywhere aft of the maximum section, on either stream. That rule sized everything. The tail is 740 mm longer than body-11\'s because the taper needs the run: closing a 1.586 m2 maximum section to a half-square-meter base inside 15 degrees takes 1.57 m of car, and body-11 gave the job 0.59. The crown falls 1.322 at x -1.120 to 0.952 at the face, 13.3 degrees along its whole length, which deliberately stays out of the 20 to 30 degree band where the Ahmed body\'s slant vortices live: tools/aero-validate.js carries that measurement and its 30 degree case is the method\'s own stated failure. The flank runs 0.575 at the spat closure to 0.4050 at the face, 12.9 degrees in plan against the 19 to 27 that condemned body-7\'s tail in its audit. The lower edge is the diffuser\'s: the ramp exit rose from x -2.412 to -2.660 with the tail, so its angle fell from 22.9 to 12.8 degrees, and a longer car got a gentler diffuser for free.\n\nMeasured, not aspired to: the sweep that prices every body on this ladder puts both streams attached to x -2.68, two stations short of the face, with a summed base of 0.5360 m2 against the 1.5699 body-11 separated onto. That single number is most of the generation.',
      why: 'design/cd-rezero.md located Gen 11\'s drag in two places and this part answers the second: the widest structure on the car ended at x -1.07 and the upper stream left the body at -0.98, so 1.46 m of drawn tail did nothing at all. Gen 11 compressed the tail because a tandem cabin does not need the length; that argument priced the length and never priced the wake, which is exactly the class of error a frozen coefficient guarantees, and retro-gen11 names it. The length goes back in because the measurement says the wake was the bill. Gen 8 closed a tail once before and collected 50 miles; this one is that rung\'s lesson applied to a car with 24 percent less frontal area to close.',
      fail: [
        'The claim that this tail stays attached rests on an equivalent cone, and a moving-ground tunnel is still owed. It is now owed on a third body and the queue is not getting shorter.',
        'The bonded cantilever behind the pad at x -2.23 grows from 0.46 to 1.06 m, and its sizing case changes in kind: the blade whose 183 Nm airbrake moment dimensioned the joint is deleted, so the worst load is now the tail\'s own lift and buffet, smaller but unmeasured here, on a fatigue spectrum that is new a third time.',
        'Luggage. design/gen11.md section 9 item 3 says the four-seat car\'s rear bench volume is gone and nothing replaces it. A 0.806 by 0.350 m base with the diffuser under it is a shallower well than body-9\'s, and this panel is where that shows up: there is no trunk on this car worth the name and interior-11 has to say what remains.',
      ],
      explode: [-1.45, 0.30, 0],
    },
    canopy: {
      name: 'Glass canopy band',
      tagline: 'The same stack over a cabin 325 mm narrower, and the roof band is now flat enough to sit under.',
      mass: 8.8,    /* Gen 23: 9.3 x 0.9477, the leaf's drawn area over body-22's (1.0155 m2 against 1.0716), tools measured: the glass follows the flank in. */   /* Gen 18: 13.1 x 0.7061, the drawn area on this loft over body-17's, tools measured: the glass ends at -0.450 */   /* 13.5 x 0.9667: the drawn area on this loft over body-14's, tools measured */   /* 14 x 0.9642: the canopy's drawn area on this loft over body-13's, tools measured */
      specs: [
        ['Counterpart', 'body-9 canopy, 21 kg: identical stack, 0.65 x the area'],
        ['Glazing', 'Chemically strengthened aluminosilicate, 1.1 + PVB + 0.7 mm'],
        ['Span', 'Glass base x 1.250 to x -1.120; backlight still deleted. The base moved 220 mm forward for Gen 12 so the hood-to-glass junction breaks at 24 degrees instead of 41, design/gen12-front.md'],
        ['Roof band', 'Flat from |z| 0 to 0.30 at y 1.327 to 1.330'],
        ['Widest vertex', '|z| 0.5976, inset 0.4 percent, so it is inside the 0.6000 flank'],
        ['Maturity', 'Production practice for the glass; mirrorless is legal in most markets, not all'],
      ],
      how: 'Gen 18: the glass ends at x -0.450, behind the single head, where body-17\'s ran to -1.120 for the rear one; aft of it the roof is the hatch. The band keeps its stack and its flat crown from the centerline to |z| 0.30 over the rails; the tumblehome below the deck shoulder is the door\'s and ends with it. The belt seam (profile point 5) comes in from 0.550 to 0.460 over the cabin stations and eases out by the aft spat, so the tumblehome is steeper and the side glass narrower, which is the 0.0225 m2 of frontal area this rung takes; the deck shoulder holds at 0.380 so the door hinge axis at 0.3585 stays inside it. 9.3 kg against 13.1 by the drawn area.\n\n' + 'Gen 16: the band sits on the loft stations instead of 8 mm proud of them. In the frontal projection the band is the car\'s whole crown from belt seam to belt seam, 1.12 m wide, and the 8 mm step was 0.0089 m2 of area nothing needed: 1.6064 to 1.5975 m2 on wheels-15 with nothing else moved. Flush, its edge meets the flank panels at the seam column where the shell draws no paint under it, so nothing z-fights; the cage bows\' crowns touch the loft from below at 1.2540 and the glass bonds to them; the rails at |z| 0.300 keep their 6 mm. The z inset of 0.4 percent, body-11\'s correction, stays: the widest glass vertex is 0.5576 inside a flank at 0.5600. Its developed area is the same to four places, so the 13.1 kg carries. Alone this lever reads Cd 0.1145 on the smaller area, the trap a fourth time, and the tail is what pays for it.\n\nThe band is cut from the same loft stations as the skin, 8 mm proud of them, and carries body-7\'s stack unchanged: a 1.1 mm ion-exchanged outer ply that resists the same stone strike as 2.1 mm of annealed soda-lime, a 0.7 mm inner, and an electrochromic interlayer scheduled between 20 and 1 percent transmittance. body-3\'s codified lesson is carried too, the near-flat roof band from the centerline out to |z| 0.30 so the glass wraps the cage rails rather than dipping under them.\n\nWhat this generation does to the glass is arithmetic rather than design. The cabin is 1.20 m wide instead of 1.85 and 0.593 m shorter overall, so the band\'s developed area falls by about 35 percent and the mass with it, 21 kg to 14. The one thing worth checking rather than assuming was whether the roof band is still flat enough to clear the rails after the roof came down 38 mm to 1.330: the rails moved inboard to |z| 0.300 with the cabin, the loft at that half-width measures y 1.319, and the rail tops are at 1.313, so the glass clears them by 6 mm, which is body-9\'s own margin at that joint.\n\nAnd the band is now inside the paint in Z, which is A correction. A band 8 mm proud in y and 1.2 percent outboard in z puts its widest vertex at |z| 0.6072 and the built width of this car at 1.2144 m against a contract that binds 1.20 m built. The offset in z is now 0.4 percent inboard, so the widest glass vertex is 0.5976, the two surfaces still cannot z-fight, and swept over the whole module the widest vertex above y 0.6200 is the painted flank at exactly 0.6000. The contract does not move; the geometry came to it.',
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
      mass: 13.1,   /* Gen 18: 18.5 x 0.7091, the drawn area on this loft over body-17's, tools measured: the leaf ends at -0.450 */
      count: 2,
      specs: [
        ['Counterpart', 'body-9 doors, 34 kg for four: same hardware, two apertures'],
        ['Skins', 'Thin-ply CFRP, the master loft itself, flushness +-0.25 mm'],
        ['Shutlines', 'x 0.850 and -0.940, cut 5 mm wide by 4 mm deep'],
        ['Aperture', '1.790 m long; lower edge at the pan flange y 0.4500'],
        ['Cameras', 'Flush in the A-pillar base, outer face |z| 0.5580 (Gen 19: it had sat at 0.5980, written for the 0.600 flank two rungs gone)'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Gen 18: the leaf ends at x -0.450 (body-17: -0.940), one aperture for one occupant whose hip is at 0.425 and whose crown is at -0.14: 1.30 m of cut against 1.79. The hinge axis and the forward cut do not move; the closure sweep re-measures the leaf. Behind the leaf the flank is the hatch\'s side panel. 13.1 kg against 18.5 by the drawn area.\n\n' + 'Each skin is the master loft surface between two shutlines, hinged off the A-pillar foot at x 0.99 and latched at the C-pillar, with e-latches on hv-11\'s zonal controllers as fused telemetered channels. The cuts are real recessed channels, 5 mm wide and 4 mm deep with two walls at about 71 degrees, and they run from the loft\'s bottom edge at the pan flange up to the beltline seam. The door does not own anything below its own cut, because below it is battery-11\'s sill with the pan flange on top of it, and neither of those opens.\n\nThe shutlines are measured against built partners, which is the discipline body-8 got wrong at x 1.06 and body-9 fixed. Forward cut x 0.850: this is the station where the flank hands over to the nose, 180 mm behind the cowl ring at x 1.030 and 140 mm behind the A-pillar foot at 0.99 that carries the hinges. There is no wheelhouse to clear, because there is no wheelhouse: wheels-10\'s front tire reaches x 1.0917 at its rearmost and stands at |z| 0.6725, entirely outboard of a 0.600 flank, so the constraint that forced body-9\'s forward cut aft does not exist here and the cut is set by the pillar instead. Rear cut x -0.940: 243 mm ahead of the rear tire\'s leading edge at -1.1835 and 120 mm ahead of the sill\'s rear end at -1.060.\n\nThe camera pods are gone and that is a deletion rather than a move. body-9 put them on 90 mm stalks whose outer faces measured |z| 0.9768 against bodywork at 0.925, so the widest thing on that car was a camera and its own panel had to quote the market qualifier that excludes a camera monitor system from vehicle width. The surround cameras here are flush in the A-pillar base with their outer face at 0.5580, 2 mm inside the skin; Gen 19 moved them in from 0.5980, where they had stayed since this text was written for a 0.600 flank, standing 38 mm proud of the 0.560 one. It costs field of view at the rear quarter, which on a car with a deleted backlight is the view that was already worst, and it buys a car whose built width has no asterisk on it.',
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
      mass: 2.7,    /* Gen 19: the rear guide is 80 mm shorter again, by the arithmetic that took Gen 16 from 3.0 to 2.8 */
      count: 2,
      specs: [
        ['Counterpart', 'body-9 lightbands, 4 kg: front identical, rear narrowed'],
        ['Front', '2 x 84-pixel matrix + lidar windows at z +-0.30, held'],
        ['Band coordinates', 'Front face x 2.171, y 0.615, half-width 0.43: the held 2.371 translated with the fascia at Gen 22'],
        ['Rear', 'PMMA guide across the tip face at x -3.2860, 0.40 m at y 0.425 (Gen 18: 0.48 across the Kamm face; the tip is 0.46 m wide at the guide)'],
        ['Kamm face', '0.77 m wide at the waterline, 0.48 at the top, 563 mm tall'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Gen 22: the front band rides the fascia to x 2.171. The contract the carried paragraphs below celebrate, one band face untouched for ten generations because the nose was held as crash budget, ends the only way a contract should: the whole coordinate frame moves 200 mm aft together, autonomy-22 lands its pucks at (2.13, 0.615, plus and minus 0.30) and its camera at (2.145, 0.53, 0) on the same relative offsets, and both modules state the same number. Nothing about the band itself changes.\n\n' + 'Gen 19: the guide rides the tip. The boat tail closes the face the 0.48 m guide sat in, so the rear band comes to 0.40 m at y 0.425 on the tip, which is 0.46 m wide there, and the marque sits above it. Nothing at the front moves, again.\n\n' + 'Gen 16: the rear guide comes from 0.70 to 0.48 m because the Kamm face at its height, y 0.735 to 0.785, is 0.52 m wide on the shrunken tail and a lamp wider than the face it sits in is a lamp in the air. The front band and every sensor point on it do not move. 2.8 kg: the rear guide is 0.22 m shorter of 1.56 m of guide and the housings carry.\n\nThe front band is carried without a change to a single coordinate and that is a contract rather than a convenience. autonomy-4 mounts its flash lidar pucks at (2.33, 0.615, plus and minus 0.30) and its thermal camera at (2.345, 0.53, 0), all written against a band face at x 2.371, y 0.615, half-width 0.43. The nose loft at that station carries 0.487 half-width at y 0.615, so the band sits inside the surface with 57 mm to spare on each side and all three sensor points land. On a car that narrowed by 650 mm at the greenhouse and lost 333 mm of tail, exactly one partner interface came through untouched, and it is worth naming which one and why: the nose was held as crash budget, and holding a length held a set of coordinates that nothing else on the car could have preserved.\n\nThe rear band narrows to 0.70 m with the Kamm face, which closes to 0.806 m wide on the 18.4 degree taper. Its back face at x -2.4457 is the rearmost geometry on the car and it is what sets the built overall length. The forward-most vertex is the intake gates\' actuator boss, and swept it is at x 2.383143, not the 2.3843 an earlier note transcribed, so the built car is 4.82884 m. design/gen11.md books 4.83 and 4.8288 rounds to it; the difference is 1.2 mm and the point of writing it down is that the earlier figure was a number typed into a comment and this one is a number read off the mesh.',
      why: 'A monoform leaves nowhere else for light to live and nowhere better for a lidar: the front face is the one flat, forward, washable, heated surface on the car, sitting in the stagnation region where a window costs no drag. autonomy-11 is a redraw and will re-seat everything against this built body, and the useful thing this panel does is guarantee that at least one of its mounting families does not have to move. design/retro-gen4.md\'s rule is to move geometry around an interface rather than moving the interface; this is the one place on the rung where that was free.',
      fail: [
        'One part per face: a parking tap costs the whole band, and at the front possibly a lidar recalibration with it.',
        'Base suction still films the rear band with road dirt, and with four open wheels there is more of it. The wash cycle stays a safety schedule.',
        'The tip cap is the rearmost geometry now and the band sits just inside it, on 1.85 m of rear overhang: what a curb behind the car meets first is the cap, and what pays for the repair is still one part per face.',
      ],
      explode: [1.15, 0.1, 0],
    },
    'luggage-bay': {
      name: 'Luggage bay',
      tagline: 'The tail volume body-12 measured and called not yet luggage, given a floor, two walls, four rings and a number: 250 liters of swept free air under a lid that opens.',
      mass: 2.0,    /* Gen 18: 3.3 x 0.6099, the drawn area over body-17's, tools measured: the bay ends at -2.200 and its walls taper to the ceiling */
      specs: [
        ['Counterpart', 'body-12 measured 156 liters of clear box here and drew nothing in it; interior-11 carried a 61 liter locker in the cabin. Both become this'],
        ['Floor', 'y 0.7750, x -1.950 to -1.170 (Gen 18; body-17: to -2.500), 6 mm carbon sandwich, 35 mm over the rear casting\'s 0.740 and 11 over autonomy-13\'s compute plate at 0.764'],
        ['Walls', '|z| 0.330, 150 mm tall, 4 mm; 33 mm inboard of hv-11\'s charge-port body at 0.363. Bulkhead at x -1.170, 10 mm behind the decklid\'s forward cut'],
        ['Swept free volume', '250 liters inside the liner at 20 mm voxels against every gen13 module, triangle bounding boxes, conservative'],
        ['Clear box', '1,060 by 620 by 160 mm, 105 liters, x -2.38 to -1.32 from the floor up'],
        ['Reach', 'Through the decklid, 60 degrees, 681 mm over the parked car at full travel; the bay\'s aft end is 15 mm short of the Kamm spoiler\'s spindle drives'],
        ['Mass', '0.88 m2 of floor at 2.5 kg/m2, 0.5 m2 of wall and bulkhead at 1.5, four rings: 3.3 kg, derived'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Gen 18: the bay keeps its floor at 0.7750 and its forward bulkhead at -1.170, and runs back only to -2.200, where the descending ceiling meets the floor; its walls taper to nothing there, because a bay cut short at -1.95 with 90 mm of wall standing at its end read as a step in the section march (the bay\'s plates are classified exterior through the open underbody). The aft rings move to -1.85. What the tail loses here, the cabin gains behind the seat: the space from x -0.60 to -1.170 on the pack lid, under a roof still above 1.05 m, is the well interior-18 lines and sweeps, and it is loaded through the hatch, which now opens from -0.490. 2.0 kg against 3.3 by the drawn area.\n\n' + 'Gen 16: the tail\'s upper section comes down from x -2.300 aft and the bay follows its ceiling rather than standing through it: the walls are two pieces, the full 150 mm from the bulkhead to -2.300 where the skin has not moved, and a tapered panel behind it whose top edge is read off the loft at |z| 0.330 less 10 mm, station by station, because the skin over the bay\'s last 200 mm comes down to y 0.907 at the aft end over walls that stood to 0.925. The floor, the bulkhead and the four rings do not move. What the bay loses, measured the same way its numbers were made: the skin over the 105 liter clear box\'s footprint (x -2.38 to -1.32, |z| 0.31) falls from 0.948 to 0.930 at its aft 80 mm, so the box keeps its 160 mm over x -2.30 to -1.32 (98 liters) or its length at about 150 mm tall, and the free air over the floor inside the walls, skin as ceiling, reads 277 liters against 279. Two liters and 8 percent of one box\'s height, stated here beside the 36 miles the tail bought the rung, because the panel is where a cost like that belongs and design/retro-gen15.md section 5 said so.\n\nA floor is what turns measured air into a place to put something, and the floor was the whole design: high enough to clear what the tail already carries, low enough to leave height under a roof that just came down 65 mm. Rayed down through the decklid aperture, the tallest carried surfaces under it are the rear casting\'s top at y 0.740 over x -2.245 to -1.600 and autonomy-13\'s compute cold plate at 0.764 over x -1.53 to -0.86, so the floor sits at 0.7750, and its forward end at x -1.170 is 10 mm behind the lid\'s forward cut so the bulkhead stands under the shutline. The walls are at |z| 0.330 because hv-11\'s charge-port body begins at 0.363 on the passenger side and a symmetric liner is one part; the aft end stops at -2.500 because the Kamm spoiler\'s spindle drives enter the deck at -2.515.\n\nThe volume is swept, not asserted, the way interior-11 swept its locker: the region x -2.60 to -1.10, y 0.70 to 1.10, |z| 0.45 voxelized at 20 mm against every module a gen13 preset builds, every triangle marking every voxel its bounding box touches, so a voxel counted free is free. Inside the liner, above the floor: 250 liters. The largest axis-aligned box with nothing in it: 1,060 by 620 by 160 mm, 105 liters, from x -2.38 to -1.32. body-12 measured 156 in a clear box here under a crown 65 mm higher, and the difference is the roof: a bay whose ceiling is the tail skin loses height with the car, which is the one cost of this generation\'s thesis that lands in this part. Against that, interior-11\'s 61 liter locker is gone from the cabin, so the rung trades 217 liters in two places for 250 in one.',
      why: 'Because "a measured claim and not yet luggage" is a sentence this ladder has now carried for two rungs, in body-11\'s words and then body-12\'s, and design/retro-gen12.md section 6 named it as one of the defects this rung closes or explains. A tandem car gave up a four-seat car\'s rear volume at Gen 11 and booked the loss; this is the first rung where something is drawn in the space that replaced it.',
      fail: [
        'It is a shelf the length of a pair of skis and 160 mm tall at its clear box, not a trunk: a roof that comes down 65 mm to buy area takes it off the bay first. What fits is long and flat, and the panel says so rather than rounding 250 liters of swept air up to a suitcase count.',
        'The floor is 11 mm over autonomy-13\'s compute cold plate and 35 over the rear casting, and both are carried partners: a compute revision that grows its heat sink upward, or a casting that gains a rib, lands in this floor. Neither declares the plane and this part does not either; the 11 mm is published so the next one can.',
        'Nothing here is a load path. Four tie-down rings on a 6 mm floor hold a bag; a 30 g pulse with 20 kg of luggage behind the rear occupant\'s head at y 0.775 to 0.935 is a bulkhead question this part does not answer, and the bulkhead drawn is 4 mm of liner, not structure.',
        'The swept number counts every voxel a triangle\'s bounding box touches as occupied, so thin diagonal parts occupy more than they are. 250 is therefore a floor on the free volume and the clear box is a floor on the clear box; neither is a ceiling, and neither is a claim about a real bag.',
      ],
      explode: [-0.6, 0.35, 0],
    },
    'diffuser-flap': {
      name: 'Diffuser ramp, fixed',
      tagline: 'The mechanism retired itself: a ramp run out to the tip at angles a diffuser cannot stall at has nothing left for a control to do.',
      mass: 3.6,    /* the ledger: the ramp and its strakes carry at 2.6 of the flap's 5.0; the hinge tube, its bearings, both 48 V drives, the taps and the loom, 2.4, are deleted; the continuation panel is 1.0 by drawn area (0.64 m2, tools measured) at the sealed floor's 1.56 kg per m2 */
      specs: [
        ['Counterpart', 'body-18 diffuser-flap, 5 kg: same forward ramp, mechanism deleted'],
        ['Forward run', '0.512 m from x -1.900 at 12.8 degrees, carried verbatim'],
        ['Continuation', '0.629 m from the old exit to the tip at 4.1 degrees, new'],
        ['Span', '0.90 m at the start, 0.72 at the old exit, 0.44 at the tip'],
        ['Deleted', 'Hinge, bearings, two 48 V drives, pressure taps, control: 2.4 kg; the continuation adds 1.0 back'],
        ['Maturity', 'Production practice: a fixed diffuser is as old as underbodies'],
      ],
      how: 'The forward ramp is the flap panel this part has carried since body-9, bonded now instead of hinged, and behind it a second panel runs the expansion out under the new tail to the tip: 12.8 degrees, then 4.1, and the exhaust leaves under the tail\'s own base. The flap existed because 18 degrees of drawn exit was worth having and only safe with a control watching it; its spring fell back to 13, the angle its own panel named as the one a diffuser cannot stall at, whenever anything was in doubt. Every angle on this run is below that number standing still, so the control has nothing to guard and a moving panel ahead of a fixed continuation would put a kink in the one surface that must be smooth.',
      why: 'body-9\'s argument for the mechanism was that the optimum exit angle moves with speed, height and yaw, and fixing the ramp meant buying the safest angle forever. That argument was about a short, steep exit. The boat tail hands this surface 0.63 m more run for the same rise, so the safest angle and the drawn angle are the same number now, and the honest move is to give back the drives rather than carry a control loop whose authority the geometry spent. What the deletion costs is stated plainly: the trim this panel supplied in yaw, over crests and in crosswind is gone, and the underbody\'s answer to those is the strakes and the ride height alone.',
      fail: [
        'The lost authority is real: a crosswind that would have eased the ramp now meets a fixed one, and the strakes and ride height carry the whole of what the control used to trim.',
        'The departure angle worsens again: the lower edge at the tip is 0.345 m up but 0.60 m further back, and a steep driveway meets the continuation panel before anything else on the car.',
        'The continuation doubles the panel run behind the last hard point; a curb strike at the tip levers a 1.4 m bonded surface against its forward joints.',
      ],
      explode: [-1.0, -0.4, 0],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────
   17 loft stations, x +2.175 to -2.4427 as listed here (Gen 22: the nose
   200 mm shorter; the tail rows beyond this array's -2.4427 are appended by
   the boat-tail block), 8 half-profile
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
const SHLD = [[0.4500, 0.7800], [0.5000, 0.7500], [0.5600, 0.6950], [0.6200, 0.5600]];   /* Gen 15: the top to 0.560; the middle holds its cover over the rear tire and over autonomy's compute coolant hose at |z| 0.642, y 0.578 (a draft at 0.68 met the hose by 0.7 mm, an eased one at 0.74/0.66 exposed 0.002 m2 more tire) */
const ARCH = [[0.6080, 0.5500], [0.6120, 0.5535], [0.6160, 0.5568], [0.6200, 0.5600]];   /* Gen 15: the 12 mm return under a flank base at 0.560 */
/* THE SPAT IS A WALL, NOT AN ENCLOSURE, and both alternatives were drawn and
   measured before this one shipped. The first drawing blended the loft from
   0.8400 back to the flank at y 0.52 and the penetration sweep put the blend
   18.3 mm inside the tire at x -1.191: each STATION was clear and the loft
   interpolates BETWEEN stations, and a tire is a circle while a loft is a
   line. The second drawing enclosed the wheel properly, holding 0.8400 to
   above the tire's bump-travel top per station, and the sweep priced it:
   frontal area 1.7218 to 1.8359, the maximum section moved AFT into the
   haunch, its closure exceeded the cone limit without reattaching, and CdA
   came out 0.2831 against the wall's 0.2124. The enclosure costs more than
   the crown it covers is worth, measured, twice.

   So the main loft keeps the open ARCH at every rear station exactly as it
   keeps it at the fronts, and the spat is a separate wall at |z| 0.8400,
   built in buildShell, whose surface never enters the tire's z band at any
   x where rubber exists. The tire's crown stands over the wall's open top
   edge, its 0.05 m2 of marginal shadow is charged to the wheels term
   honestly, and the walk gets the base the wall buys without the hump the
   enclosure pays. */
const STATIONS = [
  /* ── THE CABIN COMES DOWN 65 mm, design/gen13.md section 4. Every crown
     and upper profile point (the flank top, the beltline seam, the deck
     shoulder and the deck) from the glass base aft is body-12's less 0.065;
     the lower four points, SHLD over the sill and ARCH at the wheels, do not
     move, because the sill, the pan and the tires did not. The hood comes
     down with the cowl: 20 mm at x 2.03 (the heat pump's 0.892 is 48 mm
     under it), 43 at the front arch, 60 at the axle, 65 from the glass base.
     The nose, stations 0 to 2 in x, is held as crash budget and pedestrian
     geometry exactly as body-11 and body-12 held it. The occupant relation
     that sets the 65: interior-13's H-point 0.3420 on a shell on the lid,
     head 1.1829 at 36 degrees, 50.1 mm of clearance, the liner 1.0 mm under
     the cage bow soffit at 1.2340, the skin at 1.2570. ── */
  /* 0  nose face, x 2.175: the ten-generation hold at 2.375 ends here on
        purpose (design/gen22.md); the fascia translates whole and
        autonomy-22's band face moves with it */
  [2.175, [[0.3300, 0.3120], [0.4000, 0.3510], [0.4700, 0.3744], [0.5600, 0.3822],
           [0.6200, 0.3799], [0.6700, 0.3432], [0.7100, 0.2496], [0.7350, 0.1326]], 0.7200],
  /* 1  the bumper beam station, translated with the fascia to 2.020 */
  [2.020, [[0.320, 0.480], [0.400, 0.520], [0.470, 0.545], [0.560, 0.530],
           [0.660, 0.548], [0.760, 0.470], [0.830, 0.320], [0.858, 0.165]], 0.820],
  /* 2  hood and frunk zone, compressed to 1.920: the crown reaches 0.940
        here, so the 48 mm hold over the heat pump's 0.892 now starts at this
        station and thermal-22 slides the pump aft to sit under it */
  [1.920, [[0.310, 0.540], [0.390, 0.570], [0.470, 0.588], [0.560, 0.596],
           [0.680, 0.588], [0.760, 0.500], [0.820, 0.340], [0.845, 0.175]], 0.870],
  /* 3  front arch, ARCH. The front tire reaches x 1.8020 and this station is
        18.0 mm ahead of it; crown 1.015 to 0.972 */
  [1.820, [...ARCH,
           [0.758, 0.530], [0.848, 0.510], [0.908, 0.345], [0.931, 0.178]], 0.940],
  /* 4  front axle, ARCH; crown 1.050 to 0.990 */
  [1.450, [...ARCH,
           [0.770, 0.530], [0.865, 0.520], [0.922, 0.355], [0.941, 0.183]], 0.950],
  /* 5  glass base, ARCH. x 1.250, crown 1.005 over interior-13's dashboard
        peak at 0.985 and 22 mm under the front eye at 1.027. Gen 12's cowl
        geometry carried 65 mm lower: the glass rises at 25 degrees from here */
  [1.250, [...ARCH,
           [0.805, 0.530], [0.910, 0.528], [0.980, 0.370], [0.997, 0.190]], 1.005],
  /* 6  front shoulder closure, ARCH, on the glass line */
  [ARCH_X, [...ARCH,
           [0.826, 0.530], [0.945, 0.528], [1.040, 0.375], [1.059, 0.195]], 1.065],
  /* 7  the first station at full shoulder, on the glass line */
  [SHOULDER_X, [...SHLD,
           [0.835, 0.530], [0.975, 0.528], [1.075, 0.380], [1.100, 0.200]], 1.107],
  /* 7  windshield base and the forward shutline */
  [0.850, [...SHLD,
           [0.895, 0.530], [1.055, 0.528], [1.161, 0.390], [1.181, 0.200]], 1.191],
  /* 8  front occupant, and the roof reaches its crown at 1.2570 */
  [0.300, [...SHLD,
           [0.955, 0.530], [1.040, 0.528], [1.215, 0.380], [1.254, 0.300]], 1.257],
  /* 9a GEN 18: the roof is flat to here, x -0.350, 210 mm behind the single
        head's crown at -0.14, and the descent begins aft of it. Without this
        station the loft ran linearly from 0.300 to -0.450 and the roof over
        the head was already 20 mm down: 30 mm of clearance where the ladder
        holds 50. Same profile as station 8. */
  [-0.350, [...SHLD,
            [0.965, 0.530], [1.040, 0.528], [1.215, 0.384], [1.254, 0.300]], 1.257],
  /* 9  maximum section, between the two occupants */
  [-0.450, [...SHLD,
            [0.975, 0.530], [1.040, 0.528], [1.215, 0.388], [1.254, 0.300]], 1.257],
  /* 10 rear shoulder closure, the aft end of the screw run and the flange */
  [-SHOULDER_X, [...SHLD,
            [0.955, 0.530], [1.040, 0.528], [1.213, 0.380], [1.254, 0.298]], 1.257],
  /* 11 rear arch, ARCH. The rear occupant's head is over this station */
  [-1.120, [...ARCH,
            [0.955, 0.530], [1.040, 0.528], [1.213, 0.380], [1.254, 0.298]], 1.257],
  /* 12 mid spat */
  [-1.280, [...ARCH,
            [0.945, 0.530], [1.025, 0.528], [1.180, 0.375], [1.217, 0.295]], 1.220],
  /* 13 rear axle */
  [-1.440, [...ARCH,
            [0.935, 0.530], [1.005, 0.528], [1.145, 0.365], [1.180, 0.290]], 1.183],
  /* 14 aft spat */
  [-1.620, [...ARCH,
            [0.915, 0.530], [0.990, 0.528], [1.105, 0.358], [1.138, 0.283]], 1.141],
  /* 15 spat closure begins, AND THE FLANK HOLDS THE PORT DATUM. hv-11's V2G
        port rim sits ON |z| 0.6000 over y 0.665 to 0.853 at x -1.845, and
        hv-11 is carried: the vertical flank is therefore held to y 0.900
        here and 0.880 at 15b exactly as body-12 held it, and only the
        tumblehome above it comes down. The rear tire's last vertex is at
        x -1.8020 and the lower band still clears it by 22.5 mm */
  [-1.800, [...ARCH,
            [0.900, 0.5600], [0.985, 0.515], [1.068, 0.348], [1.096, 0.275]], 1.099],
  /* 15b the port's aft shoulder: the shroud reaches x -1.896 and the datum
        holds to -1.905 before the tail is allowed its taper */
  [-1.905, [...ARCH,
            [0.880, 0.5600], [0.975, 0.503], [1.055, 0.342], [1.083, 0.270]], 1.075],
  /* ── THE TAIL, stations 16 to 21: body-12's tail scaled vertically above
     its own waterline (profile point 3) so the crown lands 65 mm lower and
     the section keeps its shape. The lower four points are the underbody's
     side wall and the diffuser's flank and do not move. The Kamm face
     therefore spans y 0.265 to 0.887 against body-12's 0.265 to 0.952, and
     the walk measures what that buys. ── */
  /* 16 the spat is closed: the raked truncation lands here and the flank
        owns the width from this station aft. tail-cone begins */
  tl(-1.950, [[0.1380, 0.5550], [0.3000, 0.5750], [0.4600, 0.5700], [0.5200, 0.5650],
            [0.5914, 0.5550], [0.6807, 0.5450], [0.9665, 0.5150], [1.0379, 0.4900]], 1.064),
  /* 17 */
  tl(-2.100, [[0.1550, 0.5250], [0.3200, 0.5450], [0.4600, 0.5380], [0.5400, 0.5300],
            [0.6106, 0.5200], [0.7252, 0.5050], [0.9457, 0.4720], [0.9986, 0.4500]], 1.029),
  /* 18 */
  tl(-2.250, [[0.1760, 0.4950], [0.3400, 0.5100], [0.4800, 0.5020], [0.5600, 0.4950],
            [0.6470, 0.4830], [0.7515, 0.4650], [0.9256, 0.4320], [0.9691, 0.4120]], 0.994),
  /* 19 */
  tl(-2.400, [[0.2010, 0.4650], [0.3600, 0.4750], [0.5000, 0.4680], [0.5800, 0.4600],
            [0.6660, 0.4470], [0.7691, 0.4250], [0.8981, 0.3960], [0.9411, 0.3780]], 0.959),
  /* 20 */
  tl(-2.550, [[0.2310, 0.4300], [0.3800, 0.4400], [0.5200, 0.4320], [0.6000, 0.4200],
            [0.6832, 0.4050], [0.7830, 0.3850], [0.8662, 0.3620], [0.9078, 0.3450]], 0.923),
  /* 21 Kamm face, y 0.265 to 0.887 */
  tl(KAMM, [[0.2650, 0.4000], [0.4000, 0.4050], [0.5400, 0.3950], [0.6200, 0.3850],
          [0.6843, 0.3700], [0.7486, 0.3520], [0.8290, 0.3280], [0.8773, 0.3080]], 0.887),
];


/* ── GEN 18: THE ROOF DESCENDS FROM THE SINGLE HEAD, AND THE BELT SEAM COMES
   IN. See the header block. The ramp is the integral of a rate that is 1
   except inside the pause bands, normalized so it reaches G18.K at the Kamm
   face; the pauses sit where the lower body has its own section change so
   the two rates do not add past the limit (tools/gen18-tail.sh measured the
   un-eased ramp at 17.4 degrees over 200 mm at the spat closure, eased 15.3
   over 75 mm). The flank factor narrows profile point 5 only, in full over
   the cabin stations and eased to nothing between the rear arch and the aft
   spat, so the tail stations are exactly the ones the sweep measured. */
const G18 = {
  X0: -0.350,   /* the ramp starts behind the single head's crown at x -0.14 */
  K: 0.85,      /* the shrink of the upper section at the Kamm face */
  XE: KAMM,     /* the ramp runs to the face: 0.64 m over 2.34 m is the 15 degree budget */
  PZ: [[-0.95, -1.20, 0.2], [-1.70, -2.15, 0.15], [-2.40, -2.60, 0.3]],   /* the pause bands: [from, to, rate] */
  FLANK: 0.460 / 0.550,     /* the belt seam, point 5: 0.550 to 0.460 */
  FLANK_X1: -0.600, FLANK_X0: -1.900,   /* full to behind the head, eased out over 1.3 m so its plan taper adds 4 degrees and not 10 where the rear arch steps */
};
const g18rate = (t) => { for (const [a, b, rp] of G18.PZ) if (t <= a && t >= b) return rp; return 1; };
const g18integ = (to) => { let acc = 0, t = G18.X0; const step = 0.005; while (t > to) { acc += g18rate(t) * step; t -= step; } return acc; };
const g18full = g18integ(G18.XE);
function g18(x, pts, crown) {
  const u = Math.max(0, Math.min(1, g18integ(Math.max(x, G18.XE)) / g18full));
  const f = x < G18.X0 ? G18.K * u : 0;
  const fl = x <= 1.250 ? (x >= G18.FLANK_X1 ? G18.FLANK : x <= G18.FLANK_X0 ? 1 : G18.FLANK + (1 - G18.FLANK) * (G18.FLANK_X1 - x) / (G18.FLANK_X1 - G18.FLANK_X0)) : 1;
  const y3 = pts[3][0];
  const up = pts.map((q, k) => {
    if (k < 4) return q;
    let y = q[0], z = q[1];
    if (k === 5) z *= fl;
    if (f > 0) { y = y3 + (q[0] - y3) * (1 - f); if (k >= 5) z *= (1 - f); }
    return [y, z];
  });
  return [x, up, f > 0 ? y3 + (crown - y3) * (1 - f) : crown];
}
for (let i = 0; i < STATIONS.length; i++) STATIONS[i] = g18(...STATIONS[i]);

/* GEN 19: the appended stations. The face's profile points map onto the
   shrinking span: half-widths close on the plan angle, heights map linearly
   from the face's span (its point 0 to its crown) onto the span the roof and
   floor angles leave. Linear is not a simplification, it is the profile the
   physical angle limit allows: any front-loaded rate exceeds it at the face
   and any back-loaded one exceeds it at the tip. Eight stations at 75 mm,
   the pitch the sweep measured. */
{
  const [xf, pf, cf] = STATIONS[STATIONS.length - 1];
  const yLo = pf[0][0], yHi = cf;
  const tanP = Math.tan(G19.PLAN * Math.PI / 180);
  const wTip = Math.max(0.02, 1 - G19.DL * tanP / pf[0][1]);
  const topTip = yHi - G19.DL * Math.tan(G19.TOP * Math.PI / 180);
  const floorTip = yLo + G19.DL * Math.tan(G19.FLOOR * Math.PI / 180);
  const N = Math.max(4, Math.round(G19.DL / 0.075));
  for (let k = 1; k <= N; k++) {
    const u = k / N;
    const lo = yLo + (floorTip - yLo) * u, hi = yHi + (topTip - yHi) * u;
    const span = Math.max(0.004, hi - lo);
    const wk = 1 + (wTip - 1) * u;
    STATIONS.push([xf - G19.DL * u,
      pf.map(([y, z]) => [lo + (y - yLo) / (yHi - yLo) * span, Math.max(0.002, z * wk)]),
      lo + span]);
  }
}

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

/* Gen 18: a tube of radius r whose outboard-top edge sits 6 mm under the
   skin at its own half-width: the skin is read where the member is, not at
   the crown, because aft of the head the section narrows faster than it
   lowers and a rail typed at crown minus 30 mm stood through the roof at
   x -1.1 (the first build read it as a 175 mm bubble at 18.5 degrees). */
function under(x, hz, r) { return surfaceY(x, hz + r) - r - 0.006; }

/* Gen 18: the loft's centerline crown at x, linear between stations. */
function crownAt(x) {
  let i = 0;
  while (i < STATIONS.length - 2 && STATIONS[i + 1][0] > x) i++;
  const A = STATIONS[i], B = STATIONS[i + 1];
  const t = Math.max(0, Math.min(1, (A[0] - x) / (A[0] - B[0])));
  return (1 - t) * A[2] + t * B[2];
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
const COWL = 5;      /* ring index where the glass band starts, x 1.250 */
const DECK = 11;     /* Gen 18: ring index where the glass ends, x -0.450, behind the single head (a station was inserted at -0.350 ahead of it); body-17: 12, x -1.120 for the rear one */
const LAST = STATIONS.length - 1;

/* THE GLASS IS FLUSH WITH THE LOFT, GEN 16. Every body from Gen 11 cut the
   canopy band from the loft stations and stood it 8 mm proud in y, and the
   8 mm was skin detail nobody had priced: in the frontal projection the band
   is the car's whole crown from belt seam to belt seam, 1.12 m of it, and an
   8 mm step across 1.12 m is 0.009 m2 of area (design/gen16.md section 4,
   measured 1.6064 to 1.5975 on wheels-15 with nothing else moved). So the
   band sits ON the stations now: its edge meets the flank panels at the
   seam column, where there is no painted skin under it (the shell draws the
   flanks outboard of the seam and nothing between RB and RC inboard of it),
   so nothing can z-fight; the cage bows' crowns touch the loft from below
   at 1.2540 and the glass bonds to them; the roof rails at |z| 0.300 clear
   the loft by the same 6 mm they always did. The z inset of 0.4 percent is
   body-11's correction and stays: the widest glass vertex is 0.5576 inside
   a painted flank at exactly 0.5600. The cowl break the finder reads comes
   from 15.1 to 13.0 degrees because the glass no longer stands proud of
   the cowl ring; both are under the 15 the method scores at zero. */
const glassBand = RINGS.slice(COWL, DECK + 1).map((r) =>
  r.slice(SEAM, 2 * NPT + 1 - SEAM).map((p) => [p[0], p[1], p[2] * 0.996])
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
const SHUT = [rowOf(0.850), rowOf(-0.450)];   /* Gen 18: the aft cut at -0.450 for one occupant (body-17: -0.940); the hinge axis at |z| 0.3585 stays inside a deck shoulder that holds to -0.35 */
const DOORL = [0, SEAM], DOORR = [RIGHT - SEAM, RIGHT];

/* Hood x 2.020 to 1.270 (Gen 22: the front edge rides station 1 back with
   the fascia; the leaf is 0.750 m against 0.950), ending where the
   cab-forward glass begins at ring 5. Decklid x -1.160 to -2.100. Side gaps on
   the deck shoulder, clear of the beltline seam. */
const HOOD = [rowOf(2.020), rowOf(1.270)];
const LID = [rowOf(-0.490), rowOf(-2.100)];   /* Gen 18: the decklid is a hatch from the glass end over the well and the bay (body-17: -1.160) */
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
const RB = 5, RC = 13, RD = 19;   /* Gen 18: RC and RD one higher for the station at -0.350. RB: the glass base, x 1.250. RC: the
                                     rear arch, x -1.120. RD: the spat is
                                     closed and the tail cone begins,
                                     x -1.950. A station was inserted ahead
                                     of each of these; an earlier draft left
                                     RD pointing at the port station -1.905
                                     after the port hold went in. */
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
const vx = (y) => (y < 0.280 ? 2.040 + (y - 0.128) / 0.152 * 0.085
                             : 2.125 + (y - 0.280) / 0.140 * 0.048);
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
    fc.add(acbox(0.32, 0.28, 0.20, 0.012, M.castAlu, 1.710, 0.44, s * 0.435));   /* Gen 22: the arms shorten by the cut, 0.51 to 0.32 m, ending at 1.870 flush with the translated coil horn; a 90 mm shortening left the corner radars inside them and the checker said so */
    /* SHOCK TOWER PAD, HELD at body-9's coordinate to the digit. It receives
       suspension-9's tower plate at (1.50, 0.735, +-0.41) and a damper body
       topping out at y 0.729, and moving it would move a datum the carried
       corner hangs off. */
    fc.add(acbox(0.20, 0.055, 0.24, 0.008, M.castAlu, 1.545, 0.745, s * 0.430));
    fc.add(acbox(0.11, 0.20, 0.07, 0.008, M.castAlu, 1.600, 0.650, s * 0.480));
    /* Gen 22: the rib shortens with the arm AND stops 17 mm short of the
       glycol tray's forward pad, which the shortened arm brings back onto
       its span; 0.27 to 0.20 m at 1.680. */
    const rib = lib.fins(0.20, 0.045, 0.16, 4, 0.012, M.castAlu);
    rib.position.set(1.680, 0.60, s * 0.435);
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
  fc.add(acbox(0.07, 0.07, 0.56, 0.010, M.castAlu, 1.835, 0.335, 0));   /* Gen 22: the coil horn is a nose part and translates -200 with it (gen21: 2.035); its front face at 1.870 is what thermal-22's coil brackets seat on, the same 11 mm standoff */
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

  /* ── GEN 21: THE CRADLE. The rear subframe left with the five-link, and
     what the swingarm needs from the body is four features, every one
     rooted in structure this casting already had. ── */
  /* 1. The pivot arms: from the old cradle-mount bosses, whose tenant
     left, forward-inboard to the clevises at the swingarm-pivot axis.
     At x -1.083 the arm line passes z 0.134 against the pack disconnect's
     0.41; at x -1.45 it passes z 0.35 against the tire's 0.0925 face and
     the spat wall's 0.7955. */
  for (const s2 of [-1, 1]) {
    /* the arm stays outboard of |z| 0.162 until the clevis, because the
       swingarm's own arms occupy 0.103 to 0.133 and swing in x-y there;
       a first route converged at 0.125 and crossed them */
    rc.add(lib.tube([
      [-1.720, 0.300, s2 * 0.500],
      [-1.450, 0.325, s2 * 0.300],
      [-1.150, 0.350, s2 * 0.185],
      [-1.050, 0.355, s2 * 0.162],
    ], 0.018, M.castAlu, false, 12));
    const earBack = lib.cbox(0.050, 0.080, 0.014, 0.003, M.castAlu);
    earBack.position.set(-1.050, 0.355, s2 * 0.156);
    rc.add(earBack);
    /* 2. the clevis: two ears straddling the bush, the outer ear's inner
       face ON the declared 0.1410 plane */
    for (const ez of [0.085, 0.145]) {
      const ear = lib.cbox(0.062, 0.092, 0.008, 0.0015, M.castAlu);
      ear.position.set(-1.050, 0.355, s2 * ez);
      rc.add(ear);
    }
    const pin = lib.cyl(0.009, 0.076, M.steel, 10);
    pin.rotation.x = Math.PI / 2;
    pin.position.set(-1.050, 0.355, s2 * 0.115);
    rc.add(pin);
  }
  /* 3. the cross-tie between the clevises, 45 mm ahead of the tire's
     leading edge, 70 behind autonomy-21's relocated ring crossing */
  const tie = lib.cyl(0.016, 0.154, M.castAlu, 12);
  tie.rotation.x = Math.PI / 2;
  tie.position.set(-1.050, 0.355, 0);
  rc.add(tie);
  /* 4. the spring tower: a transverse box under the compute hulls (their
     floor is 0.6745; the beam tops at 0.660) whose underside face at
     y 0.6150 is the declared center-spring-top plane the spring plate's
     and damper plate's studs rise into; its ends tie up to the cage's
     rear legs, outboard of the hulls' 0.400 faces. */
  /* the tower is two PADS, not a beam: a beam under the compute hulls
     crosses z 0 at y 0.615 to 0.660, and the tire's crown band owns
     |z| 0.0775 there to y 0.710 static and 0.790 at jounce; the first
     draft drew the beam and the checker put it 22 mm inside the tire.
     Each pad hangs on two ties, aft-up to the C-pillar node and
     forward-down to its own cradle arm, both routed outboard of the
     crown band and below the hulls. */
  for (const s2 of [-1, 1]) {
    const pad = lib.cbox(0.160, 0.045, 0.100, 0.006, M.castAlu);
    pad.position.set(-1.340, 0.6375, s2 * 0.1580);
    rc.add(pad);
    rc.add(lib.tube([
      [-1.380, 0.6300, s2 * 0.195],
      [-1.550, 0.6150, s2 * 0.300],
      [-1.700, 0.6300, s2 * 0.410],
    ], 0.011, M.castAlu, false, 10));
    /* the forward tie holds |z| 0.205 past the damper's band (its body
       spans 0.135 to 0.181 on the -z side) before landing on the arm */
    rc.add(lib.tube([
      [-1.300, 0.6375, s2 * 0.205],
      [-1.200, 0.500, s2 * 0.205],
      [-1.130, 0.360, s2 * 0.170],
    ], 0.011, M.castAlu, false, 10));
  }
  /* 5. the converter rails: hv-21's ears at (-2.53 and -2.37, 0.311,
     +-0.24) land on two rails off the bulkhead's lower frame */
  /* the rails sit on the measured ramp (max y 0.3125 under the
     footprint) and top out on the ears' underside at 0.329 */
  for (const s2 of [-1, 1]) {
    const rail = lib.cbox(0.240, 0.011, 0.050, 0.003, M.alu);
    rail.position.set(-2.450, 0.3235, s2 * 0.245);
    rc.add(rail);
  }
  sys.add(rc);

  /* front crash rails and bumper beam: same section, same stroke, 300 mm
     less span. The beam corner is now 40.6 mm inside the skin. */
  const rails = lib.part('crash-rails', [0.95, -0.05, 0]);
  for (const s of [-1, 1]) {
    rails.add(acbox(0.34, 0.09, 0.09, 0.008, M.alu, 1.87, 0.55, s * 0.44));
    rails.add(acbox(0.02, 0.15, 0.12, 0.005, M.alu, 1.71, 0.55, s * 0.425));
  }
  rails.add(acbox(0.06, 0.10, 1.00, 0.008, M.alu, 2.04, 0.55, 0));
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
             [1.000, 0.6400, 0.5000], [0.99, 0.815, 0.4200]]],   /* Gen 15: the foot holds under the shoulder; the pillar's mid point 30 mm inboard for 40 mm of skin outside it at the new flank */
    [0.026, [[0.99, 0.815, 0.420], [0.90, 0.955, 0.402], [0.86, 1.075, 0.372],
             [0.80, 1.157, 0.340], [0.55, 1.225, 0.300]]],          /* A-pillar */
    /* Gen 18: the roof rail follows the crown it sits under, 30 mm below it
       as it was under the flat roof (1.227 under 1.257); the C-pillar leaves
       it at -1.100 and comes down under the descending skin to the same node
       on the rear casting. crownAt is the loft's centerline height. */
    [0.021, [[0.55, 1.225, 0.300], [-0.350, under(-0.350, 0.300, 0.021), 0.300], [-0.600, under(-0.600, 0.300, 0.021), 0.300],
             [-0.850, under(-0.850, 0.300, 0.021), 0.300], [-1.100, under(-1.100, 0.300, 0.021), 0.300]]],        /* roof rail */
    [0.024, [[-1.100, under(-1.100, 0.300, 0.021), 0.300], [-1.380, Math.min(1.123, under(-1.380, 0.318, 0.024)), 0.318],
             [-1.560, Math.min(0.923, under(-1.560, 0.360, 0.024)), 0.360], [-1.700, 0.700, 0.400]]],      /* C-pillar */
    /* rear leg: the sill rail up to the C-pillar's foot on the rear casting */
    [0.020, [[-(PAN_X - 0.020), 0.4625, 0.7016], [-1.015, 0.5500, 0.6450],
             [-1.022, 0.6400, 0.5000], [-1.100, 0.7200, 0.4700],
             [-1.700, 0.7000, 0.4000]]],   /* Gen 15: the foot holds (a draft at 0.615 met autonomy's compute coolant hose by 7.3 mm); the mid point inboard with the skin */
  ];
  for (const [r, m] of members) cageSide.add(lib.tube(m, r, M.darkSteel));
  cageSide.add(acbox(0.70, 0.016, 0.015, 0.003, M.plastic, 0.00, 1.205, 0.2825));   /* Gen 18: forward 350 mm, under the roof that is still flat */
  sys.add(cageSide);
  sys.add(mirrorZ(cageSide));

  const cageMid = lib.part('cage', [0, 0.36, 0]);
  /* Three transverse bows. r 0.010 centered on y 1.2440, so the crown touches
     the loft at 1.2540 and the SOFFIT is y 1.2340: that is the liner plane
     this module publishes, 31.0 mm under the built roof at 1.2650, exactly
     the 31.0 body-12 held under its 1.3300. They span |z| +-0.26 rather than
     +-0.30 because the loft falls over the last 40 mm and a bow to 0.300
     would stand proud of the skin. */
  /* Gen 18: each bow's crown touches the loft at its own x, 13 mm under the
     centerline crown as the 1.2440 was under 1.2570; the soffit is 10 mm
     under that and no longer one plane. The head bow at -0.450 sits 310 mm
     aft of the single crown at x -0.14. */
  for (const bx of [0.300, -0.450, -1.100]) {
    const by = surfaceY(bx, 0.260) - 0.010;
    cageMid.add(lib.tube([[bx, by, -0.260], [bx, by, 0.260]], 0.010, M.darkSteel));
  }
  cageMid.add(lib.tube([[0.99, 0.870, -0.420], [0.99, 0.870, 0.420]], 0.026, M.darkSteel));
  /* THE COWL BEAM, new for Gen 12 and the structure the cab-forward glass
     base actually needs: a 32 mm tube under the glass base at x 1.250,
     inside the loft at the tumblehome's 0.37 half-width, carrying the hood
     hinge whose axis is 18 mm above it. It exists for a reason worth
     writing down: body-11's hood passed the attachment check by sitting
     15 mm off interior-11's dashboard at (1.230, 1.051), which is a
     coincidence of two unrelated parts and not a hinge, and the 140 mm
     shorter hood of this body no longer reaches it. The checker was right
     that a lid with nothing under its hinge line is floating; this is what
     is under it. The beam stops 4 mm short of the dashboard's end at 1.246
     and the canopy base lands 8 mm above it. */
  cageMid.add(lib.tube([[1.262, 0.983, -0.340], [1.262, 0.983, 0.340]], 0.016, M.darkSteel));
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
  skin.add(panel([HOODROW[1], RI(RB)], FULL));          /* the 20 mm band aft of the hood, to the glass base */
  skin.add(panel([RI(COWL), CUT[0]], FLANKL));          /* cowl sides, ahead of the door */
  skin.add(panel([RI(COWL), CUT[0]], FLANKR));
  /* Gen 18: the hatch begins 40 mm behind the glass end, so the band between
     them is one full-width strip, and the panels either side of the hatch
     run from its forward cut to the tail cone: they are the rear quarters and
     the arch that body-17 drew as three pieces around a lid further aft. */
  skin.add(panel([CUT[1], LIDROW[0]], FULL));           /* the strip between the glass end and the hatch */
  skin.add(panel([LIDROW[0], RI(RD)], [0, LIDCOL[0]]));            /* left of the hatch: quarter and arch */
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

  /* ── the spats: a wall at |z| 0.8400, one lofted panel per side, NOT a
     slice of the master grid. The comment at the ARCH table records why:
     a blended loft and a full enclosure were both drawn and measured, one
     penetrated the tire between stations and the other cost more area than
     its coverage bought. The wall's sections cross the tire's z band only
     at its two plan blends, x -1.050 to -1.130 and -1.900 to -2.060, and
     the rear tire's built rubber spans x -1.0980 to -1.8020, so each
     crossing happens in air. The leading blend rises from the shoulder's
     own 0.7800 so the wall reads as the shoulder line carried aft, which
     it is. ── */
  const spats = lib.part('spats', [0, -0.30, 1.1]);
  const SPAT = [
    /* x, outer |z|, top y. Bottom edge y 0.1800 throughout. The last two
       stations are the trailing closure, the wall returning inboard BEHIND
       the tire: the crossing of the tire's z band happens from x -1.900
       aft, and the rubber's last vertex is at -1.8020, so it happens in
       air. The closure is what makes the spat a fairing rather than a
       fence: its projected shadow stands in the union at the tire's own
       band, which is the geometric statement that bodywork now closes the
       wheelhouse the tire used to end the car with. The inner edge stops
       at 0.6600, 12.5 mm inboard of the tire face, leaving the flank gap
       open as the wheelhouse vent. */
    /* Gen 20: the straight run's TOP EDGE is at 0.8055 now (was 0.8200),
       the kink at y 0.355 in the rows below; the tops themselves are
       body-12's heights, unmoved, because the walk needs the sections. */
    /* Gen 20: the lead blend finishes by -1.095 (body-12 to 19: -1.130),
       because wheels-20's saddle arc reaches its forward-most point at 90
       degrees, x -1.073, and the blend's rising surface stood in its swing
       at 3 degrees of rear steer (0.3 mm, the envelope's read). The blend is
       65 mm for the same rise and the walk window smooths it. */
    /* Gen 22: the wall follows the pant plane again, 0.7955 to 0.7920,
       1 mm under wheels-22's re-derived 0.7930 face, exactly the follow of
       Gen 21; the -1.900 station and the rub lip ride with it. */
    [-1.030, 0.7800, 0.4600], [-1.095, 0.7920, SPAT_TOP], [-1.440, 0.7920, SPAT_TOP],
    /* Gen 18: the trailing closure returns over 670 mm instead of 160, one
       even taper of about 25 degrees in plan on its top edge to -2.40, ending
       65 mm off the flank instead of 100, while the skirt lands on the loft
       by -2.25 and rides it to the end, because on a tail whose upper
       section is 85 percent smaller the old 45 degree plan return read as a
       175 mm bubble at 17 to 19 degrees in the upper walk (it was 12 on
       body-17). The crossing of the tire's z band still begins at -1.900, in
       air; the vent stays open, narrower. */
    [-1.780, 0.7920, SPAT_TOP], [-1.900, 0.7885, SPAT_TOP - 0.010, 0.7800], [-2.060, 0.7500, SPAT_TOP - 0.030, 0.6000], [-2.250, 0.6400, SPAT_TOP - 0.060, 0.5100], [-2.400, 0.5300, SPAT_TOP - 0.085, 0.4650],
  ];
  for (const side of [-1, 1]) {
    /* Gen 18: a station may carry a fourth number, the skirt's own half-width
       at the bottom edge. The lower stream (y under 0.35) read 15.0 on
       body-17, at the limit, so the skirt cannot carry a longer return below
       the sill line; it lands on the loft by -2.25 as body-17's did, while
       the top edge, which is what the upper walk sees, runs the long taper. */
    const rows = SPAT.map(([x, hz, top, hzLo]) => {
      const lo = hzLo === undefined ? hz : hzLo;
      /* Gen 20: rows whose top edge leans to 0.8055 kink at the split line,
         y 0.355: the skirt below stays at its own plane for the channel and
         the lean is entirely above, where the pant band caps the union. */
      /* Gen 21: the 2 mm mid easing is retired. At the followed plane it
         stood 1 mm PROUD of the pant band that now caps the union, so the
         bulge that bought shading would have owned the outline; the wall
         runs flat at its station's own plane. */
      return [[x, 0.1800, side * lo], [x, (0.1800 + top) / 2, side * ((hz + lo) / 2)], [x, top, side * hz]];
    });
    const wall = lib.crease(lib.loft(side === 1 ? rows : rows.map((r) => r.slice().reverse()), M.paint), 40);
    spats.add(wall);
    /* the bottom edge carries a 12 mm inward rub lip, the sacrificial edge
       the panel's own fail list prices */
    spats.add(acbox(0.90, 0.003, 0.012, 0.0015, M.carbon, -1.50, 0.1815, side * 0.7860));
  }
  sys.add(spats);

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
  /* Gen 19: the marque rides the tip, above the light guide on a face that
     spans y 0.349 to 0.501, clear of the guide's top edge at 0.450 */
  mark.position.set(TIP + 0.0135, 0.472, 0);
  tail.add(mark);
  sys.add(tail);

  /* ── THE LUGGAGE BAY, new for Gen 13. body-12 measured 156 liters of clear
     air under its decklid and called it "a measured claim and not yet
     luggage"; interior-11's 61 liter locker stayed in the cabin. This rung
     deletes the locker (interior-13) and draws the bay: a floor at y 0.7750,
     35 mm over the rear casting's 0.740 and 11 over autonomy-12's compute
     plate at 0.764, from the decklid's forward cut at x -1.1600 back to
     -2.5000, 15 mm short of the Kamm spoiler's spindle drives, 660 mm wide
     between liner walls at |z| 0.3300, which is 33 mm inboard of hv-11's
     charge-port body at 0.363. The volume it encloses is measured by the
     same sweep interior-11 used for its locker and published in the panel,
     never asserted here. ── */
  const bay = lib.part('luggage-bay', [-0.6, 0.35, 0]);
  /* Gen 18: the bay runs back to -2.200, where the descending ceiling meets
     the floor, and its walls taper to nothing there; a bay cut short at -1.95
     with 90 mm of wall standing at its end read as a 175 mm bubble at 19
     degrees in the march, because the bay's plates are classified exterior
     (rays from them escape through the open underbody) and its end is a step
     in the section. The space behind the single seat (x -0.60 to -1.17, on
     the pack lid) is the well interior-18 lines. The aft rings move forward
     to where there is still height over them. */
  const BAY = { x0: -2.200, x1: -1.170, y: 0.7750, hz: 0.3300, h: 0.150 };
  const bayFloor = lib.cbox(BAY.x1 - BAY.x0, 0.006, 2 * BAY.hz, 0.004, M.carbon);
  bayFloor.position.set((BAY.x0 + BAY.x1) / 2, BAY.y - 0.003, 0);
  bay.add(bayFloor);
  /* THE WALLS FOLLOW THE CEILING. Gen 16 shrinks the tail's upper section
     from x -2.300 aft (design/gen16.md section 4), and the skin over the
     bay's last 200 mm comes down to y 0.907 at the aft end over walls that
     stood to 0.925. So the wall is two pieces: the full 150 mm from the
     bulkhead to x -2.300, where the skin has not moved, and a tapered panel
     behind it whose top edge is read off the loft at |z| 0.330 less 10 mm
     of clearance, station by station, so nothing of the liner can stand
     in the paint. The floor, the bulkhead and the rings do not move. */
  const WALL_X = BAY.x1 - 0.020;   /* Gen 18: the whole wall is the tapered panel; the ceiling descends from the bulkhead on */
  for (const sgn of [-1, 1]) {
    const wall = lib.cbox(BAY.x1 - WALL_X, BAY.h, 0.004, 0.003, M.carbon);
    wall.position.set((WALL_X + BAY.x1) / 2, BAY.y + BAY.h / 2, sgn * (BAY.hz - 0.002));
    bay.add(wall);
    const NS = 8, wpts = [];
    for (let i = 0; i <= NS; i++) {
      const x = WALL_X + (BAY.x0 - WALL_X) * i / NS;
      const top = Math.max(BAY.y + 0.002, Math.min(BAY.y + BAY.h, surfaceY(x, BAY.hz) - 0.010));   /* Gen 18: to nothing where the ceiling meets the floor */
      wpts.push([x, top]);
    }
    const ws = new THREE.Shape();
    ws.moveTo(wpts[0][0], BAY.y);
    for (const [x, top] of wpts) ws.lineTo(x, top);
    ws.lineTo(wpts[NS][0], BAY.y);
    ws.closePath();
    const wg = new THREE.ExtrudeGeometry(ws, { depth: 0.004, bevelEnabled: false, steps: 1 });
    const taper = lib.mesh(wg, M.carbon);
    taper.position.set(0, 0, sgn * (BAY.hz - 0.002) - 0.002);
    bay.add(taper);
  }
  const bulk = lib.cbox(0.004, BAY.h, 2 * BAY.hz, 0.003, M.carbon);
  bulk.position.set(BAY.x1 - 0.002, BAY.y + BAY.h / 2, 0);
  bay.add(bulk);
  /* four tie-down rings on the floor, and a sill strip at the aperture's lip */
  for (const [tx, tz] of [[-1.85, -0.26], [-1.85, 0.26], [-1.30, -0.26], [-1.30, 0.26]]) {
    const ring = lib.torus(0.016, 0.004, M.steel, 16, 8);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(tx, BAY.y + 0.004, tz);
    bay.add(ring);
  }
  sys.add(bay);

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

  /* ── glass canopy band, ON the same stations (Gen 16: flush) ── */
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
  /* the surround camera, flush in the A-pillar base: outer face |z| 0.5580,
     2 mm inside the 0.560 flank. Gen 19 correction: the pod had sat at
     0.5980 since Gen 11, written for a 0.600 flank; the flank has been
     0.560 since Gen 15 and nobody moved the camera, so it stood 38 mm proud
     and was the last body-owned thing outside the loft in the whole
     silhouette, about 0.002 m2 of frontal area nothing needed. body-9 put
     this on a 90 mm stalk at 0.9768 and made a camera the widest thing on
     the car; the same defect, twice, at two scales. */
  sys.add(doors);
  sys.add(mirrorZ(doors));
  /* the surround camera and its trim strip are at x 0.90 and 0.86, FORWARD of
     the door's own forward cut at 0.850, so they are on the A-pillar base and
     not on the leaf. They keep the part id and carry no hinge. */
  const pillarKit = lib.part('doors', [0.08, 0, 0.85]);
  const zc = halfWidth(0.90, 0.915);
  pillarKit.add(acbox(0.05, 0.028, 0.020, 0.004, M.sensor, 0.90, 0.915, 0.5480));
  pillarKit.add(acbox(0.09, 0.020, 0.012, 0.003, M.alu, 0.86, 0.915, Math.min(zc, 0.5540) - 0.004));
  sys.add(pillarKit);
  sys.add(mirrorZ(pillarKit));

  /* ── sealed venturi underbody, narrowed with the car ── */
  const floorPart = lib.part('venturi-floor', [0, -0.55, 0]);
  const splitter = lib.plate(0.26, 0.80, 0.016, 0.06, M.carbon);
  splitter.position.set(2.028, 0.112, 0);
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
  const MOUTH = { x: 2.015, y0: 0.256 };   /* Gen 22: gen21's 2.215 translated -200 with the fascia */
  floorPart.add(lib.shell(lib.crease(lib.loft([
    rim((y) => [vx(y), y]),
    rim((y) => [MOUTH.x, MOUTH.y0 + (y - AP.y0) / (AP.y1 - AP.y0) * (AP.y1 - MOUTH.y0)]),
  ], M.carbon, true), 40)));
  for (const s of [-1, 1]) {
    floorPart.add(acbox(0.28, 0.05, 0.012, 0.004, M.carbon, 1.96, 0.19, s * 0.34));
  }
  for (const z of [-0.30, -0.14, 0.14, 0.30]) {
    const f = lib.fastener(0.0040, M.steel, 'hex');
    f.position.set(1.970, 0.136, z);
    floorPart.add(f);
  }
  /* front closeout held at |z| 0.620 rather than taken out to the pack's own
     0.780: the front tires occupy |z| 0.6725 to 0.8075 from x 1.1835 to
     1.8050 and a wider plate would be inside them for half a meter */
  /* Gen 15: THE CLOSEOUT IS NOTCHED AT THE FRONT WHEEL STATION. body-13 held
     this plate at |z| 0.620 for a tire at 0.6725; wheels-14's nose cap, which
     rides the knuckle and runs to y 0.080, swings to |z| 0.603 at 14 degrees
     of lock and tools/envelope.sh read 1.7 mm between its bottom inboard
     corner and this plate's edge. So over the cap's swept x, 1.55 to 1.85,
     the plate stops at 0.565 (a first notch to 0.580 still read 5.7 mm at
     full lock plus full rebound; at 0.565 the sweep reads 20) and keeps
     0.620 fore and aft of it; the strip it gives up is outside the
     underbody roughness window, which runs between the axles. */
  const closeF = lib.plate(0.78, 1.09, 0.012, 0.04, M.carbon);   /* Gen 17: |z| 0.545, 20 mm in with the pant (was 1.13: 0.565) */
  closeF.position.set(1.71, 0.10, 0);
  floorPart.add(lib.shell(closeF));
  for (const s of [-1, 1]) {
    const fwd = lib.plate(0.25, 0.055, 0.012, 0.01, M.carbon);
    fwd.position.set(1.975, 0.10, s * 0.5925);
    floorPart.add(lib.shell(fwd));
    const aft = lib.plate(0.23, 0.055, 0.012, 0.01, M.carbon);
    aft.position.set(1.435, 0.10, s * 0.5925);
    floorPart.add(lib.shell(aft));
  }
  /* GEN 21: the rear closeout was one 1.24 m plate through the center
     wheel's band (the checker put the house 90 mm inside it); it becomes
     the twin channels the brief named, flanking the wheel at |z| 0.115
     to 0.620, with a center infill behind the tire only. The edges are
     sized against the DROOPED tire's chord at plate height, x -1.141 to
     -1.759 at full droop, which is wider than the static chord and is
     the envelope that governs a floor. */
  for (const sr of [-1, 1]) {
    const closeR = lib.plate(0.60, 0.505, 0.012, 0.04, M.carbon);
    closeR.position.set(-1.600, 0.10, sr * 0.3675);
    floorPart.add(lib.shell(closeR));
  }
  const closeC = lib.plate(0.13, 0.23, 0.012, 0.03, M.carbon);
  closeC.position.set(-1.835, 0.10, 0);
  floorPart.add(lib.shell(closeC));
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

  /* ── light bands. The front face rides the fascia to x 2.171: the band
     contract autonomy carried against 2.371 for ten generations moves with
     the block, and autonomy-22 lands its pucks at (2.13, 0.615, +-0.30) on
     the same relative coordinates. The rear band is untouched. ── */
  const lbF = lib.part('lightbands', [1.15, 0.1, 0]);
  lbF.add(acbox(0.014, 0.045, 0.86, 0.004, M.lamp, 2.171, 0.615, 0));
  for (const s of [-1, 1]) {
    lbF.add(acbox(0.012, 0.03, 0.06, 0.003, M.sensor, 2.176, 0.615, s * 0.30));
  }
  sys.add(lbF);
  const lbR = lib.part('lightbands', [-1.15, 0.1, 0]);
  /* Gen 19: 0.40 m on the tip face, which is 0.46 m wide at the guide's
     y 0.425 (Gen 16: 0.48 on a face 0.52 wide at 0.760) */
  lbR.add(acbox(0.014, 0.05, 0.40, 0.004, M.lampRed, TIP + 0.0040, 0.425, 0));
  sys.add(lbR);

  /* ── the Kamm spoiler is GONE, and its 3.6 kg is most of the rung's mass
     companion. The blade worked the base at the Kamm cut; the tail closes
     that base to 0.077 m2, so the mechanism has nothing left to work on and
     a blade on the new tip would be a blade in clean air. What its deletion
     costs is stated in the body blurb: the airbrake authority and its
     download go with it. ── */

  /* ── diffuser ramp, FIXED for Gen 19. The forward run is body-18's flap
     panel verbatim, minus its hinge, drives and taps; the continuation runs
     the exhaust out under the new tail to the tip at 4.1 degrees, so the
     whole expansion is 12.8 then 4.1, both below the 13 the flap's own
     spring held as the angle a diffuser cannot stall at. A moving panel
     ahead of a fixed continuation would be a kink, not a control. ── */
  const HINGE_X = -1.900, RAMP_X = -2.660, RAMP_Y0 = 0.1281, RAMP_Y1 = 0.3000;
  /* the ramp follows the tail out: 248 mm more run and a shallower exit,
     12.8 degrees against body-11's 22.9, because a diffuser is the one
     surface here whose angle budget is its own and not the cone's */
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
  /* the continuation: exit to tip, 0.045 m of rise over 0.629 m of run */
  flap.add(lib.crease(lib.loft([rampSection(RAMP_X - 0.0007, RAMP_Y1, 0.360),
                                rampSection(TIP + 0.010, 0.345, 0.220)], M.carbon, true), 40));
  for (const z of [-0.30, -0.12, 0.12, 0.30]) {
    flap.add(acbox(0.50, 0.09, 0.010, 0.003, M.carbon, (HINGE_X + RAMP_X) / 2,
      (RAMP_Y0 + RAMP_Y1) / 2, z, RZF));
  }
  /* Gen 19: no hinge tube, no drives, no taps. The panel bonds to the
     venturi floor's rear closeout where the hinge bearings stood. */
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
