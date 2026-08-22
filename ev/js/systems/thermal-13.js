/* Thermal, Gen 13: thermal-11 with ONE placement corrected, and the placement
   is the ventilation recovery core. Everything else, the heat pump, the pack
   loop, the glycol loop, the air handler, the occupant-local circuits, the
   two-phase argument, the 72 m3/h sweep and the -306.5 W the module books,
   is thermal-11 to the vertex, because Gen 13 asks the thermal system for
   nothing new. It asks it to get out of the occupants.

   WHY IT EXISTS. thermal-11 stood the 190 by 200 by 240 mm recovery core at
   x 0.800 to 0.990, y 0.378 to 0.578, |z| 0.180 to 0.420 "because that is
   what the firewall has", and tools/occupant.sh has measured it inside both
   occupants on every rung since Gen 11: 63.7 mm into the front occupant's
   thigh and 69.8 into the rear occupant's foot on the gen12 preset, 87.1 and
   69.8 under the ruler as corrected this generation. design/retro-gen12.md
   section 6 carried it as "a package decision across two slots that nobody
   has taken", and design/gen13.md section 6 assigns it here, as the
   autonomy-12 precedent: one part moved, everything else carried.

   WHERE IT WENT, measured before it was drawn. The same 1.67 m2 of
   counterflow membrane re-folded to 145 by 255 by 240 mm, 8.9 liters
   against 9.1, standing in the passenger-side pocket behind the A-pillar
   foot: x 0.790 to 0.935, y 0.485 to 0.740, z 0.350 to 0.590. That box was
   vertex-swept against every module a gen13 preset builds and nothing else
   is in it. Its bounds, each a measured partner surface: hv-11's zone drops
   at x 0.941 ahead of it; body-13's flank at |z| 0.600, 10 mm outboard of
   it; the front occupant's thigh at |z| 0.198, 150 mm inboard of it; the
   rear occupant's foot at y 0.453 on the 0.380 deck, 32 mm under it; the
   door's lower edge at y 0.619 above its top at 0.740. The fresh-air tube
   from the cowl intake runs inboard of the A-pillar (the first draft passed
   the pillar at 8.1 mm and the interface checker said so), the tempered
   supply reaches the air handler's passenger-side blower inlet in 60 mm, and
   the bypass stands on the core's top, facing up.

   THE EXTRACT RUN IS MIRRORED TO THE PASSENGER SIDE, for a routing reason
   and a measured one. From a core on the passenger side every route back to
   the driver-side pocket crosses the car under the dash, and every crossing
   that was drawn ran through the driver's thighs, under the rear foot over
   autonomy-11's 48 V ring, or across this module's own local circuits on the
   lid. The passenger pocket is the freer of the two: hv-11's hv-runs and this
   module's glycol loop are both driver-side, and the band between hv-11's
   spine top at 0.4820 and body-13's shoulder at 0.5767 reads the same on
   both sides. The plenum, its grille, its ears and its two P clips keep
   POCKY and POCKZ and change the sign of z; the duct arrives at the core's
   aft face at x 0.790 without crossing anything.

   WHAT THE GATE READS NOW, on the gen13 preset with interior-13 and body-13:
   the core is out of both occupants entirely. The front occupant's thigh
   still reads 30.2 mm into the air handler's case floor at y 0.580, against
   54.4 on Gen 11 and Gen 12 under the corrected ruler; that is the next
   thermal move and this module names it rather than takes it. Nothing
   electrical changed, the membrane is the same membrane, and js/efficiency.js
   carries -306.5 W for this id exactly as for thermal-11. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

/* ── LOCAL constants. Not one P constant is touched, the way wheels-9
   declared FRONTZ and REARZ rather than editing P.wheelZ. Every one of
   these is a coordinate measured off a BUILT partner, and the comment says
   which partner and which face. ── */
const CX = 2.1680;        /* coil core plane: core spans 2.1330..2.2030 */
const COILZ = 0.2700;     /* coil core half-span = body-11 intake slat edge */
const GY = 0.3050;        /* glycol row center: y 0.2100..0.4000 */
const RY = 0.4510;        /* refrigerant row center: y 0.4300..0.4720 */
const FX = 2.1040;        /* fan plane */
const FY = 0.3050;        /* fan axis height, on the glycol row center */
const FZ = 0.1500;        /* fan axis |z|; shroud r 0.100 leaves |z|<0.050 clear */
const RIBY = 0.6225;      /* body-11 front casting RIB BANK crest, measured */
const TRAYY = 0.6460;     /* hv-11 buffer TRAY rib top, measured. See section 5a */
const BUFZ = 0.1010;      /* hv-11 buffer case half-width AT ITS WIDEST, swept
                             on the built module: |z| 0.1010 over y 0.660 to
                             0.680, which is the case foot and gasket flange.
                             0.0953 is the hold-down STRAP TABS at y 0.755 to
                             0.770 and it is the number an earlier draft of
                             this file used for the whole case, which
                             overstated both published deck clearances. The
                             deck plates start at |z| 0.110. Documentation
                             only: no geometry on this module reads BUFZ. */
const SPARZ = 0.3440;     /* pad center in the clear spar top band 0.3350..0.3550 */
const XMEMY = 0.3700;     /* body-11 casting cross member top, |z|<0.28 */
const DECKY = 0.6580;     /* deck plate underside, 12.0 mm over TRAYY */
const DECKT = 0.6700;     /* deck plate top face: THE FRUNK DATUM */
const DECKZ = 0.2550;     /* deck plate center |z|: each plate spans 0.110..0.400 */
const DECKX = 1.9175;     /* deck plate center x: each plate spans 1.790..2.045 */
const SILLZI = 0.6600;    /* battery-11 sill head / body-11 pan upstand inner face */
const POCKZ = 0.6000;     /* extract duct axis |z| in the shoulder pocket.
                             0.6150 until autonomy-11 landed in the same
                             pocket with its compute coolant run; a 60 mm duct
                             on 0.6150 spans to 0.6450 and was inside the
                             build of that module on disk at the time. On
                             0.6000 the duct spans 0.5700 to 0.6300 and is
                             30.0 mm inside the pan upstand. RE-MEASURED
                             against the SHIPPED autonomy-11, its saddle
                             clamp is at x -1.1800..-1.1400 over z -0.6560..
                             -0.6240 and shares no x with this duct, so the
                             clause about a clamp at 0.6419 is retired. The
                             clearance from this part to autonomy-11 that is
                             real measures 1.85 mm and it is at the extract
                             grille, not at the duct: recovery-core panel. */
const POCKY = 0.5250;     /* extract duct axis height: the free band in the
                             pocket is y 0.4820 (hv-11 bywire-feeds top) to
                             0.5767 (body-11 shoulder underside), measured */
const LIDY = 0.3080;      /* battery-11 seat rail tops, the pack's highest geometry */
const SEATZ = 0.4400;     /* aft run channel |z|. battery-11 leaves the lid clear
                             between its seat rails at 0.28 and 0.4975, and
                             interior-11's seats and rear cushion land on those
                             rail tops at y 0.3080 out to |z| 0.3810, so the
                             usable channel is 0.3810 to 0.4975 and this is its
                             middle. An earlier draft ran on 0.4000, inside the
                             cushion by 19 mm. */
const FRONTX = 0.7000;    /* front occupant station: hip x 0.750 at 36 degrees */
const REARX = -0.1000;    /* rear occupant station: hip x -0.065 */

export const SYSTEM = {
  id: 'thermal-13',
  name: 'Thermal · Gen 13 the core out of the occupants',
  color: 0x58d6a6,
  explode: [1.5, 0.35, 0],
  blurb: 'This slot was told the cabin got smaller so the cabin-loss UA would fall with it. Measured off both built cars with one ray-cast integrator, the cabin loses 10.8 percent of its surface and its UA loses 1.2 percent, because a tandem deletes the cheap surfaces, a floor at U 0.8 and a glass roof, and keeps the expensive one: a flank whose height is set by the occupant and does not care how wide the car is. What a tandem does buy is the airflow. Two people in line on the axis of a 1.20 m tube can be SWEPT rather than mixed, so supply enters high at the cowl, crosses both breathing zones in series and leaves low at the back of one sill, ventilation effectiveness goes 0.9 to 1.0, and 72 m³/h does what 80 did through one duct instead of a mirrored pair. Separately and larger: thermal-9\'s cabin balance is written against autonomy-4\'s 380 W of compute and it has been running on autonomy-10\'s 192 since Gen 10, so 59 W of free cabin heat quietly left and the 4 °C float is 11.4 °C rather than the 13.5 its panel prints. Thermal\'s own share goes 45 W to 34, of which 4 W is that correction and 7 W is this generation. Eleven watts is 0.25 Wh/mi and about 5 miles, and set this whole module to zero and the car gains 16: the auxiliary lever is still an autonomy lever. 44 kg against 50, 45,146 triangles against 56,464, and the fluoroketone ledger is open for a third rung.',
  interfaces: {
    /* ── THE TWO PACK JOINTS. battery-11 declares neither, so both keys are
       UNMET and warn on every run until it does. That is the visible state
       and it is the right one: a plane one module has written down and the
       other has not is a question, and a silent carry is not.

       NEITHER CARRIES AN EXTENT CLAUSE, AND AN EARLIER DRAFT OF THIS FILE
       ARGUED AT LENGTH THAT BOTH SHOULD CARRY extent MIN. It was wrong, and
       the way it was wrong is worth the four lines. realize() computes `lo`
       as the MINIMUM coordinate over every vertex of the named part, and
       `extent: 'min'` fails when lo < at - tol. It does not assert that the
       part reaches the plane; realization already does that. So min on a
       part whose liquid line ends at x 1.2850, 12 mm the far side of a
       1.2970 stub face, fails by construction. Run against the built module
       it does: lo 1.2733 against 1.2950. An extent clause belongs on a half
       that has to STOP at the plane, and a hose landing on a spigot is
       exactly the half that does not. ── */
    'pack-vapor-stub-face': {
      kind: 'face', axis: 'x', at: 1.2970, tol: 0.002,
      part: 'pack-loop', mirrored: false,
      note: 'battery-11 galleries vapor stub outer face, x-rayed at (y 0.268, z -0.10) and unmoved from battery-10 and battery-7. This module\'s 34 mm riser flange spans x 1.2960 to 1.3080 and butts it. The intrusion is the declared hose-over-spigot landing in tools/interfaces.js BATTERY_LANDINGS, which needs a new entry keyed thermal-11/pack-loop: see design/gen11.md risk 5. Built depths on battery-11 are 6.69 mm into floorlid, 6.00 into galleries and 0.81 into strikeshield, against thermal-9\'s 8.63, 7.14 and 1.49 on the same pack. The whole crossing envelope measures x 1.2763 to 1.3006, y 0.1064 to 0.3074, z -0.1496 to 0.1090, which sits inside thermal-9\'s declared box of x 1.265 to 1.303, y 0.100 to 0.311, z -0.155 to 0.145 on every axis, so the new entry can carry that box and that 8.7 mm depth unchanged.',
    },
    'pack-liquid-feed-face': {
      kind: 'face', axis: 'x', at: 1.2970, tol: 0.002,
      part: 'pack-loop', mirrored: false,
      note: 'battery-11 galleries liquid feed outer face, x-rayed at (y 0.118, z 0.10). battery-6 wrote 0.150 and built 0.147, battery-7 dropped it to 0.118 and battery-11 carries 0.118: this key is the coordinate rather than the prose, which is why it is declared.',
    },
    /* ── THE COMPUTE HANDOVER, declared instead of drawn, per section 7, and
       MET. autonomy-4's plate sits inside the rear occupant on a tandem car,
       so this module refuses to draw a manifold at it; the glycol loop
       arrives at a bulkhead plate on body-11's pan upstand and stops on the
       plane, and autonomy-11 declares the mating half on the same plane.

       THE PLANE IS SIGNED AND NOT MIRRORED, because the run is single sided:
       there is one extract duct and one bulkhead and both are on the driver
       side, so the key is z = -0.6560 rather than |z| = 0.6560. Declaring it
       mirrored would assert a plate at +0.6560 that this module does not
       build, and realize() would have measured 226 mm to the nearest vertex
       and failed the key. extent MIN is the correct clause on a negative
       plane for the half that arrives and must not pass: it fails if any
       vertex of the part goes below -0.6560, which is outboard. ── */
    'compute-coolant-inboard': {
      kind: 'face', axis: 'z', at: -0.6560, tol: 0.003,
      part: 'glycol-loop', mirrored: false, extent: 'min',
      note: 'the plane autonomy-11 presents its cold plate ports on, 4.0 mm inboard of body-11\'s pan upstand inner face at 0.6600 and of battery-11\'s sill head inner face at the same plane. Driver side only, which is why the key is signed rather than mirrored: an earlier version of this block wrote 0.6560 with mirrored false on a part whose z runs -0.6586 to 0.4297 and failed at 226.3 mm, and -0.6560 with mirrored false and extent min realizes at 0.000 mm with lo exactly -0.6560. THE KEY IS MET. autonomy-11 declares it on part `compute` at z = -0.6560, kind face, tol 0.003, mirrored false, extent min, which is this declaration to the digit, and its saddle clamp at x -1.1800 to -1.1400 puts its most outboard vertex at exactly -0.6560. Measured on both built modules, both halves realize at 0.000 mm and both pass extent min, so the key pairs and reports met rather than warning as one-sided. An earlier draft of this file described the handover as UNMET in four places and every one of them is corrected.',
    },
  },
  parts: {
    'outdoor-coil': {
      name: 'Outdoor coil and fan bank',
      tagline: 'body-11 asked what slat count the cooling case wants. The honest answer is that the question is the wrong way around: this coil was 0.79 m of core behind a 0.44 m hole, and it is now the width of the hole.',
      mass: 8,
      specs: [
        ['Core', '0.540 m at |z| 0.2700, the intake slats\' own outer edge'],
        ['Rows', 'Glycol y 0.2100 to 0.4000 in the aperture, refrigerant 0.4300 to 0.4720 above it'],
        ['Glycol face', '0.1026 m² against thermal-9\'s 0.119, on an aperture that lost 21 percent'],
        ['Binding duty', 'autonomy compute heat, 380 W to 192: the row is oversized, not undersized'],
        ['Fans', '2 x 200 mm at |z| 0.150, 4 W at road speed; |z| < 0.050 left clear for plumbing'],
        ['Maturity', 'Production practice'],
      ],
      how: 'body-11 metered its nose down to a 0.44 m intake bank and wrote that thermal-11 owns the real sizing case and gets to say the slat count is wrong. It is not wrong, and the reason is that the coil was the thing out of proportion. Rayed off body-11\'s built slats the aperture is y 0.1924 to 0.3950 over |z| up to 0.2850, and thermal-9\'s core is 0.79 m wide and 0.195 m tall: 360 mm of core with no hole in front of it, fed only by whatever the plenum could drag sideways. This core is 0.540 m at |z| 0.2700, which is the slats\' own edge, and the glycol row spans y 0.2100 to 0.4000, which is the aperture\'s own height to within 10 mm at each end. The refrigerant row goes ABOVE it at y 0.4300 to 0.4720, behind the bumper beam that now spans y 0.4750 to 0.6250, where it sees ram spill instead of the metered stream. That is the correct place for a row serving a compressor that runs 8 percent of a drive, and it is the first time on this ladder that either row has been placed against a measured aperture rather than against a frame.\n\nThe sizing survives because the duty fell further than the area. Glycol face area goes 0.119 to 0.1026 m², minus 14 percent, against an aperture that lost 21, so face velocity FALLS and approach improves per unit of air. And the load this row actually carries at cruise is autonomy compute heat, which autonomy-10 took from 380 W to 192 and design/gen11.md carries into autonomy-11 whole. A free-cooling coil is an approach device whose ceiling is surface against face velocity, and both terms moved the right way while the heat it has to move halved. thermal-9 bought a 4 K approach and a 11 °C free-cooling ceiling on the 16 °C branch, and this coil holds both with room rather than spending them. The frame, the plenum, the shroud and the aft core plane at x 2.203 are thermal-7\'s in intent; what is not carried is a single coordinate, because body-11\'s casting front face measures x 2.0700 at y 0.36 and 2.0600 at y 0.30 and the brackets are seated on those two faces rather than on body-9\'s.\n\nTHE FANS CAME DOWN WITH THE CORE AND THE CORRIDOR STAYED. thermal-9 runs two 230 mm fans at |z| 0.255 and keeps |z| < 0.135 clear so every line in the nose has one vertical route. A 0.540 m core cannot hold 230 mm fans and a corridor, so the fans are 200 mm at |z| 0.150 and the corridor is |z| < 0.050, which is 100 mm and takes the two 18 mm hoses that use it side by side at |z| 0.022. Swept air per fan falls 24 percent and the fan pair reads 4 W at road speed against 5. The parked case is where that is paid, and it is on the fail list with the number.',
      why: 'Two generations of this coil were sized against the frame they inherited and then re-argued about which row should have the frame. Neither asked what was in front of the frame. A body generation that halves the width of the car is the moment to ask, because the aperture is now smaller than the core by a factor a reader can see, and the answer turns out to relieve rather than to bind: the load on the primary row halved at Gen 10 and nobody had re-sized for it. The general form is design/retro-gen9.md\'s: price the lever before designing around it, and check that the thing you are protecting is still the thing under threat.',
      fail: [
        'Parked rejection is worse again and it is the third generation in a row to pay into the same account. body-9 cut the aperture 30 percent, body-11 cut it a further 21, and this coil now has 0.1026 m² of glycol face and two 200 mm fans instead of 0.119 and two 230s. With no ram, the fan pair moves roughly 1,500 m³/h against thermal-9\'s 1,900 and thermal-7\'s 2,600, which on the same linear scaling is about 3.0 kW of rejection at 40 °C rather than 4.8. That is battery-11\'s charge ceiling in a hot bay, not this car\'s range, and battery-11 books exactly the same 15 kW design heat load and 430 A ceiling it always did. Three modules have each taken a defensible slice of one parked margin and the fourth will find it gone.',
        'A row above the beam line is a row in a separated wake. The refrigerant row at y 0.4300 to 0.4720 sits behind a bumper beam spanning y 0.4750 to 0.6250, and the argument that it only needs ram spill is a duty-cycle argument, not a flow measurement. Nothing in this project can compute the mass flow reaching it, so the honest statement is that the row is placed where the duty is small and NOT that it has been shown to breathe.',
        'Frost is unchanged and still real. Evaporating below 0 °C in moist air frosts whatever the face area, and the glycol defrost pass brazed into the refrigerant fin block is carried from thermal-7 with the same 4 percent of heating output lost on a wet 2 °C night. A narrower core frosts across its whole span slightly sooner, because there is less unfrosted area to carry the load while the pass runs.',
      ],
      explode: [0.55, -0.10, 0],
    },
    'heat-pump': {
      name: 'Part-time heat pump',
      tagline: 'The machine is thermal-7\'s and is not reopened. What moved is that three of its four feet were standing on a casting body-11 does not build, and the fourth was inside a crash rail.',
      mass: 9,
      specs: [
        ['Machine', 'thermal-7\'s R290 economized two-stage scroll, unchanged'],
        ['Duty', '8.8 W sweep average against thermal-9\'s 13.3; about 7 percent of the run'],
        ['By leg', '15.8 W at 4 °C, 0 W at 14 °C, 13.0 W at 26 °C plus sun'],
        ['Of that saving', '4.0 W is autonomy-10\'s compute drop, unbooked since Gen 10'],
        ['Mounting', 'Passenger deck plate, top face y 0.6700, |z| 0.118 to 0.375'],
        ['Maturity', 'Pilot line; the R290 crash case is still thermal-7\'s open item'],
      ],
      how: 'Nothing in the machine changes and that is the panel\'s first statement, for the third generation. thermal-7 took the lift from 63 K to 43 K and got COP 2.9 to 4.2; Carnot at 313 over 43 is 7.28 and 58 percent of it is the top of what a real scroll has shown, so the machine has a few percent left in a term that is now nine watts. What changed is the duty, and this time the duty changed for a reason outside this module. Priced by leg on the cabin conservation law with the band bottom at 14 °C and the band top at 30, thermal-9 with autonomy-4\'s 380 W of compute reads 17, 0 and 28 W and averages 13.3. The SAME module with autonomy-10\'s 192 W reads 17.2, 0 and 13.2 and averages 9.3: worse in winter, because 59 W of free cabin heat went away, and much better in summer, because the same 59 W no longer has to be thrown out. This module reads 15.8, 0 and 13.0 and averages 8.8. Four of the four and a half watts is a correction that has been available since Gen 10 and is booked here because nobody else books it, and half a watt is Gen 11\'s.\n\nThe hardware moved because its foundations did. thermal-9 stands the R290 pan on four legs to "body-9\'s front casting top face at y 0.580" at |z| 0.090 and 0.300, and swept against the BUILT body-11 casting there is nothing at y 0.5800 inboard of |z| 0.340: down-rays at (1.885, 0.090), (1.885, 0.300) and (2.045, 0.300) all miss the casting entirely, and the pan and its vent then cross body-11\'s crash rail at 3.78 mm and its casting at 9.82. So the pan is gone and the machine sits on glycol-loop\'s passenger deck plate, which stands on the one flat band of spar top there is, |z| 0.3350 to 0.3550 inboard of the casting\'s own rib bank. It went UP rather than down, by 60 mm, and hv-11 is why: its 48 V buffer tray is a slab at y 0.6250 to 0.6320 running the full |z| 0.4200 across x 1.825 to 1.975, and thermal-9\'s frunk deck height is inside it by 63.50 mm over 548 crossing pairs, the deepest single pair this module\'s predecessor has anywhere on the Gen 11 car. The compressor, its girth seam, its terminal box with a real gland, the receiver with its sight glass and service port, the suction accumulator that stops forty starts a day returning liquid to a scroll, the hydrocarbon sensor at the enclosure low point and the overboard vent all carry unchanged in every dimension, re-seated on the built deck top face at y 0.6700. The whole assembly lives between |z| 0.118 and 0.375. An earlier draft of this panel said that clears hv-11\'s buffer case "at 0.0953 by 22.7 mm", and 0.0953 is the case\'s hold-down strap tabs rather than the case: swept in y bands on the built module the case reaches |z| 0.1010 at its foot flange, so the lateral clearance is 17.0 mm. The number that actually binds is smaller again and is not a z gap at all. Surface to surface, the nearest approach between this part and hv-11/buffer is 15.06 mm, and it runs diagonally from the mounting plate\'s lower outboard corner at (1.9808, 0.6588, 0.2546) down to the crest of the buffer TRAY\'s outboard rib at (1.9732, 0.6460, 0.2568), which is a tray feature rather than a case one. Both numbers are published because they answer different questions, and the honest headline is the 15.06. Its tallest point is the gallery conditioner vent at y 0.892 under a hood measured at 0.99 at that station.',
      why: 'A carried machine on new foundations is the most dangerous kind of carry, because the machine is what a reader checks and the foundations are what fails. design/retro-gen4.md\'s drift law exists for exactly this and thermal-9 obeyed it on body-9; the same obedience against body-11 deletes a drained pan, four legs, four footplates and their bolts, because the surface they were designed to bolt to is not built any more. The saving in triangles is incidental. The point is that a leg standing on air is a defect whether or not anyone can see it, and the only way to know is to ray the partner.',
      fail: [
        'Forty starts on a long run is still a duty this machine was not designed against, and at 8.8 W of sweep average it is closer to fifty. The accumulator handles liquid return and the soft start handles inrush, but scroll tip-seal wear is a start-count problem, and thermal-7\'s twenty-year continuous-duty life remains an extrapolation from a different duty cycle.',
        'Everything still depends on one compressor: cabin heat, cabin cooling, pack precondition and the chilled branch. Free cooling has made the car feel fine without the machine for most of a drive, so a dead compressor announces itself on the first hot hour rather than within minutes.',
        'The 140 g propane charge forward of the firewall is unchanged and so is its evidence gap, and a 1.20 m car makes one part of it worse rather than better: the sealed enclosure now sits 40 mm from the crash rail plane instead of 90, because the frunk narrowed and the rails moved outboard. Nothing in this project crashes it. The fallback is a smaller R1234yf charge at roughly 0.4 lower COP, worth about half a watt on a nine watt term.',
      ],
      explode: [0.20, 0.50, 0.35],
    },
    'air-handler': {
      name: 'Two blowers and a float band',
      tagline: 'A screen 120 mm narrower needs a slot nozzle 120 mm shorter, and a slot jet is the one defog device whose flow scales with the glass rather than with the cabin.',
      mass: 4,
      specs: [
        ['Ventilation blower', '72 m³/h continuous at 4 W (thermal-9: 80 at 6)'],
        ['Transient blower', '23 m³/h defog at 4 W, 220 m³/h recirculated on pulldown'],
        ['Slot nozzle', '0.400 m against thermal-9\'s 0.520, on a screen that lost 120 mm'],
        ['Case', '|z| 0.230, clear of wheels-11\'s brake master unit at 0.2695'],
        ['Control', 'Float band 14 to 22 °C winter, up to 30 °C summer; no setpoint'],
        ['Maturity', 'Production practice; the float band is Extrapolated, see fails'],
      ],
      how: 'The two-machine split is thermal-9\'s and it is the largest line it ever found: one blower sized for the union of ventilation, defog and pulldown, run at the union\'s flow for 27.7 hours, cost 44 W and two machines cost 11. Both machines get smaller here and for two different reasons. The ventilation machine falls with the sweep on the module header: a tandem cabin can be swept rather than mixed, so 72 m³/h at effectiveness 1.0 delivers what 80 at 0.9 delivered, and blower power goes with the cube of flow, so 6 W becomes 4 on a wheel turned slower. The transient machine falls with the GLASS. Defog is a mass-transfer problem at the screen and a slot jet delivers it as momentum in the boundary layer at the base, so the flow it needs scales with the length of the slot and not with the volume behind it. body-11\'s screen is 120 mm narrower than body-9\'s, the nozzle goes 0.520 to 0.400 m, and at a held jet velocity the flow goes 30 to 23 m³/h and the power 5 W to 4.\n\nPulldown is the one duty a smaller cabin genuinely shortens and it is reported rather than booked. The cabin volume over the pack lid falls with the section, so the same 220 m³/h of recirculated air turns the cabin over faster and the pulldown transient is shorter. It is not a saving, because the blower draws its pulldown power while it runs and the sweep average of a ten minute transient inside 27.7 hours is already below a watt. What it is, is the answer to a question a reader will ask, and the answer is that the number was already too small to matter.\n\nThe case is 0.460 m wide at |z| 0.230 rather than thermal-9\'s 0.560 spanning -0.250 to 0.310, and the reason is measured rather than proportional: wheels-11\'s brake master unit fills x 0.847 to 1.015 at y 0.5600 to 0.6835 over |z| 0.2695 to 0.4050 on the driver side, and thermal-9 had to move its transient inlet throat 12 mm up and 20 mm inboard to get past it. At |z| 0.230 the case clears it by 34.3 mm and the throat is drawn where the geometry wants it. The clamshell convention is carried whole, because it is right: what is drawn is the rear half of the molding with its joint flange, its clip lugs and its stiffening ribs, because a solid brick returns zero percent exposure for both blowers, both coils, the blend flap and the drain. The blend flap, the 4 °C dehumidify coil, the 35 °C heating coil and the float band itself are thermal-7\'s and carry unchanged.',
      why: 'This part is where the tandem argument has to be kept honest, because "half the occupants" is not a flow rate. Ventilation is per person and there were always two people on the reference sweep, so nothing on this panel comes from deleting a rear bench. What comes from the tandem is the SHAPE: two people on the axis of a tube can be served in series by one path, which is worth 10 percent of the flow and 27 percent of the blower power, and one screen 120 mm narrower is worth 23 percent of a defog jet. Both are geometry, both are measurable off the partner, and neither is available to a car with four seats in a box.',
      fail: [
        'The float band is still the module\'s largest and least evidenced claim, and it is now load bearing across a wider range, because the cabin float at 4 °C is 11.6 °C rather than the 13.5 thermal-9 published. Holding the band bottom at 14 costs 66 W of delivered heat instead of 13. The Maturity row says Extrapolated and the fallback is a conventional setpoint that gives back 25 of the module\'s watts.',
        'Splitting the blower splits the defog authority and a narrower screen makes the split sharper, not softer. The screen is served by a jet sized against it; the side glass and the backlight are served by nothing, and body-11 has no rear window at all. On a cold wet start the quarter glass clears minutes after the screen, and the car is leaning on camera-fed mirrors for the sector it cannot see through.',
        'One damper still owns both defog and pulldown, and the case that got worse is recirculation. A tube ventilated in series has the front occupant upstream of the rear one, so a damper stuck in recirculation now recirculates air that has already crossed two people, and the humidity it returns to the screen is higher than it was in a mixed box. Position is sensed rather than inferred, which is thermal-7\'s answer and still the right one.',
      ],
      explode: [-0.32, 0.45, 0],
    },
    'recovery-core': {
      name: 'Swept ventilation and recovery core',
      tagline: 'The sill band this duct used for two generations is now battery-11\'s structural sill. What replaced it is the shoulder pocket, and the tube shape that forced the reroute is what makes the reroute worth having.',
      mass: 5,
      specs: [
        ['Core', 'Counterflow membrane, 1.67 m² folded into 145 x 255 x 240 mm (thermal-11: 190 x 200 x 240)'],
        ['Where', 'x 0.790 to 0.935, y 0.485 to 0.740, z 0.350 to 0.590, the passenger-side pocket behind the A-pillar foot; OUT of both occupants, measured'],
        ['Effectiveness', '88 percent sensible, 74 percent latent at 72 m³/h'],
        ['Ventilation', '72 m³/h at effectiveness 1.0 (thermal-9: 80 at 0.9)'],
        ['Conductance', 'Ventilation term 3.22 to 2.90 W/K; winter UA 28.30 to 27.68'],
        ['Extract', 'ONE duct, PASSENGER side (thermal-11: driver), in body-13\'s shoulder pocket at |z| 0.6000, arriving at the core\'s aft face'],
        ['Tightest on the car', '1.85 mm, grille frame to autonomy-11\'s compute coolant hose'],
        ['Second tightest', '2.00 mm, plenum bolt ear to body-11\'s pan upstand at z -0.6600'],
        ['Maturity', 'Pilot line in a vehicle, production practice in buildings'],
      ],
      how: 'The reroute came first and the physics came out of it, which is the honest order to tell it in. thermal-9 runs a mirrored pair of 60 mm extract ducts aft at y 0.478 and |z| 0.672, the sill shoulder, and on Gen 11 that band is solid metal: battery-11\'s merged sill head fills |z| 0.6600 to 0.7800 from y 0.1035 to 0.4200, body-11\'s pan flange fills the same z from 0.4200 to 0.4500 with an upstand carrying on to 0.5600, and the cage lays a 25 mm sill rail on the flange at |z| 0.7016. Swept with the shipped predicate that route is 16.70 mm inside the pan over 1,112 crossing pairs, 7.95 inside the shoulder and 5.89 inside the cage. There is no rocker route left on this car at that height.\n\nWhat body-11 built instead is a pocket, and this module is the first to use it. Above the pan upstand at y 0.5600 the shoulder fairing runs in from |z| 0.6900 to 0.6000 over 60 mm of height, and inboard of the upstand\'s own inner face at 0.6600 the corner is open from the sill top upward. Rayed at 10 mm steps at x 0.000, the free corner is |z| < 0.6600 for y 0.4200 to 0.5600 and closes to 0.6300 by y 0.6000. AND THE POCKET IS BOUNDED IN Y RATHER THAN IN Z, which is the correction that cost this part the most. Swept along the whole cabin at |z| 0.540 to 0.660, its floor is hv-11: spine rails on edge at y 0.4350 to 0.4750, hv-runs to 0.4800 and bywire-feeds to 0.4820, every one of them running the full length of the sill. Its ceiling is body-11\'s shoulder at 0.5767. That is 94.7 mm and it is empty over the whole span but for body-11\'s two cage legs at x -0.9995 and +0.9841. A 60 mm duct on (y 0.5250, |z| 0.6000) spans y 0.4950 to 0.5550 and z 0.5700 to 0.6300: 13.0 mm over hv-11, 21.7 under the shoulder, 30.0 inboard of the upstand, and 27 mm clear of wheels-11\'s rerouted aft harness at |z| 0.5783. An earlier draft added "11.9 clear of autonomy-11\'s coolant saddle clamp at 0.6419" and that clause is deleted rather than repaired: re-measured on the shipped autonomy-11 the saddle is at x -1.1800 to -1.1400 over z -0.6560 to -0.6240, which is 160 mm aft of the aft end of this part and does not share x with it at all. The clearance to autonomy-11 that IS real is 1.85 mm and it is at the other end of this part, published below. A duct on the 0.5050 an earlier draft of this file published reads 200 crossings 25.6 mm inside hv-11\'s spine. It runs on the DRIVER side and that is measured too: suspension-9\'s front air-supply line occupies |z| 0.416 to 0.615 over y 0.297 to 0.508 for the whole length of the car on the passenger side, with clips at (0.700, z 0.575) and (0.000, z 0.610), so the passenger pocket at the height this duct wants is already full.\n\nAND ONE DUCT IS THE RIGHT NUMBER, WHICH IS WHERE THE PHYSICS ARRIVES. A four-seat box has to be mixed because its occupants are at four corners, and mixing is what caps ventilation effectiveness near 0.9. A tandem cabin is a tube with both occupants on its axis, so it can be SWEPT: supply high at the cowl, past the front breathing zone, past the rear one, out low at the back of one sill at x -0.930. Every cubic meter admitted crosses both zones in series before it leaves, which is effectiveness 1.0, so 72 m³/h delivers what 80 did. The ventilation conductance falls 3.22 to 2.90 W/K, the winter UA 28.30 to 27.68, and the blower falls with the cube of the flow. The core itself shrinks with the flow at held NTU: 1.86 m² in a 190 by 200 by 270 block becomes 1.67 m² in 190 by 200 by 240, holding its own y 0.378 to 0.578 to the millimeter because that is the space the firewall has, 15 mm over the front HV run and 2 mm under the air handler floor. The cross-tunnel collector thermal-9 needed to give a mirrored pair something to land on is deleted with the pair.\n\nAND THE TWO TIGHTEST CLEARANCES ON THE WHOLE MODULE ARE BOTH ON THIS PART, 92 mm APART, AND NEITHER WAS PUBLISHED UNTIL NOW. Every thermal-11 part was measured surface to surface against every part of every module a gen11 preset builds, and the list sorted. The tightest is 1.85 mm, from this part\'s extract GRILLE FRAME at (-0.9308, 0.5590, -0.5932) up to the underside of autonomy-11\'s 12 mm cold compute-coolant hose at (-0.9308, 0.5607, -0.5927): the grille faces inboard so the cabin can breathe into it, its frame tops out at y 0.5590, and that hose crosses directly over it on its way outboard to the bulkhead. The second is 2.00 mm, this part\'s lower plenum BOLT EAR at (-0.9436, 0.4954, -0.6580) square across to body-11\'s pan upstand inner face at (-0.9436, 0.4954, -0.6600), which is the 22 mm ear the geometry comment below already sizes and never turned into a published number. Both are held rather than accidental and both are one partner revision from being gone: 1.85 mm is a clearance to a hose whose own module has moved it twice, and 2.00 mm is what is left after the ears came in from 26 mm on -0.6480, which read as 24 crossings at 0.40 mm. The third and fourth are 2.60 mm from local-circuits to wheels-11\'s brake master unit and 2.75 mm from glycol-loop to hv-11\'s spine, so the four tightest places on this module are all inside 3 mm. A panel that prints its 30.0 mm and hides its 1.85 is not reporting a car, and this generation has already rejected two modules for describing geometry they never drew.',
      why: 'The most useful thing about this part is that the package forced it and the physics agreed. A reviewer should be suspicious of that, so the order is stated: the duct had to move because it was 16.7 mm inside a partner, the only place left was a pocket body-11 created for other reasons, and the pocket happens to put the extract at the back of a tube whose occupants are in line. The effectiveness claim is capped at unity precisely because the arrangement that earns it is also what costs: put the supply low and let each occupant\'s plume carry to a ceiling extract and a real displacement system claims 1.2 to 1.5, and this car cannot, because its floor is a battery lid nothing may be built on.',
      fail: [
        'THE REAR OCCUPANT BREATHES THE FRONT OCCUPANT\'S AIR AND THAT IS THE MECHANISM, NOT A SIDE EFFECT. In series at 72 m³/h with two people at about 18 liters per hour of CO2 each, the rear breathing zone sits roughly 350 to 400 ppm above the front one in steady state, so a cabin holding 900 ppm at the driver holds about 1,270 at the passenger. That is inside guidance and it is not equal, and no amount of duct sizing fixes it because it is what SERIES means. A car that wanted them equal would need two supply paths and would give back the flow saving that paid for this panel.',
        'One duct is one failure. thermal-9 had a mirrored pair, so a blocked or crushed duct halved the extract; this has no second path, and a tube ventilated at one end with the extract blocked ventilates by leakage. The dP tapping pair across the core is carried and now trends the duct as well as the membrane, which is a diagnostic and not a redundancy.',
        'The extract plenum lands on body-11\'s pan upstand at x -0.930 and interior-11 has to find its aperture there, exactly as thermal-9 handed a sill trim aperture to interior-6 and interior-6 wrote back that it has no sill trim. The difference is that this one is a single 70 by 70 mm grille on the driver side rather than a mirrored pair, and it is at the aft end of the sill where nobody\'s foot goes. It is still an aperture in a partner that does not exist yet and it is still reported rather than drawn around.',
      ],
      explode: [-0.15, 0.10, 0.45],
    },
    'local-circuits': {
      name: 'Occupant-local delivery, in line',
      tagline: 'thermal-9 said the rear occupants get mats and no radiant panel because there is no toe board back there. On a tandem car there is something better: the rear occupant\'s feet run in a 158 mm channel with a wall on each side.',
      mass: 4,
      specs: [
        ['Loop', '35 °C and 16 °C, one 3 W pump, 0.85 L measured off the drawn run'],
        ['Stations', 'Two in line at x 0.700 and -0.100, not four in a box'],
        ['Delivered to', 'Seat and headrest mats, front footwell pair, rear channel pair'],
        ['Setpoint', 'Cabin is an OUTPUT of the balance, not an input; see how'],
        ['Float at 4 °C', '11.6 °C, not thermal-9\'s 13.5: see the module header'],
        ['Maturity', 'Extrapolated; the comfort equivalence is still unmeasured'],
      ],
      how: 'The conservation law is thermal-7\'s and thermal-9 took it to its stop, and neither statement survives contact with autonomy-10 unchanged. In steady state Tcabin = Tamb + (gains + local delivery) / UA. thermal-9 puts gains at 270 W, of which 120 is the part of autonomy-4\'s 380 W of compute that reaches the cabin, and gets 13.5 °C at a 4 °C ambient through 28.3 W/K. autonomy-10 books 192 W of compute and design/gen11.md carries that into autonomy-11 whole, so on thermal-7\'s own fraction the cabin gets 60.6 W instead of 120 and the gains are 210.6. Through this generation\'s 27.68 W/K the float is 11.61 °C. Holding the band bottom at 14 therefore costs 66 W of delivered heat where thermal-9\'s panel implies 13. The lever is still spent, for exactly the reason thermal-9 gave, but the floor it is spent against moved down two kelvin and the module that owned the sentence never noticed.\n\nWhat the tandem changes is the plumbing, and it changes it completely rather than by half. thermal-9 runs a mirrored pair of 1.7 m feeds aft to four manifolds, two at |z| 0.400 for the front seats and two at 0.470 for the rear bench. Two occupants in LINE need one feed and one return, and they can be run in the two channels battery-11 leaves between its own seat rails at |z| 0.280 and 0.520: the hot line down the passenger channel at |z| 0.400 and the cold line down the driver channel at -0.400, each at y 0.325, which is 17 mm over the lid skin and below the rail tops at 0.3080 in nothing but hose. Two manifolds sit on those lines at x 0.700 and -0.100, which are the two occupants\' hip stations at the booked 36 degrees, with a cross tube at each station under the seat pan. The two aft mains measure 5.157 m of drawn polyline at a 12 mm bore, which is 0.583 liters, and the loop with its panels, stations and vessel comes to about 0.85 against thermal-9\'s 1.40. The duty-cycled pump goes 5 W to 3.\n\nAND THE REAR OCCUPANT FINALLY GETS A RADIANT PANEL. thermal-9\'s third fail says the rear bench gets mats and no panel "because there is no toe board back there". On a tandem there is no toe board either, but there is something a bench never had: design/gen11.md section 6 measures the rear occupant\'s feet passing BESIDE the front seat in a 158 mm channel per side, and a channel has walls. Two 0.240 by 0.090 m panels stand vertically in those channels at x 0.620, |z| 0.5450, facing the feet from 30 mm away, which is closer than the front footwell pair gets to a shin. They are placed against the BUILT wheels-11 harness rather than against the channel: that harness now runs the rocker corner at x 0.5214 to 0.7868, y 0.3272 to 0.4216, |z| 0.5783 to 0.6477, so the panel\'s outboard face at 0.5510 clears it by 27.3 mm. Their feet stop ON battery-11\'s seat rail at y 0.3080 rather than 4 mm inside it, which is what a 46 mm foot on the panel\'s own center did. The front footwell pair carries from thermal-7 at 0.115 by 0.130 m, moved forward to x 1.0550 to close a defect thermal-9 flagged and could not fix: at x 1.030 the passenger-side panel stood 12 mm inside this module\'s own recovery-core case, and both are this module\'s parts, so it is ours to resolve and it is resolved by measurement rather than by chamfer.',
      why: 'design/gen11.md section 6 says this slot\'s best argument now serves half as many people, and the interesting half of that is not the halving. It is that a bench and a tandem fail differently. A rear bench is served worse than the front seats because it is further from every duct and has no structure in front of it; a tandem rear seat is served worse only if you route to it as though it were a bench. Put both occupants on the axis and the delivery problem becomes one-dimensional: one feed, one return, two stations in series, and the one surface a bench never had, which is a wall beside the feet. The panel that fixes thermal-9\'s oldest open comfort complaint is a consequence of the package rather than of a better idea.',
      fail: [
        'The comfort equivalence thermal-7 flagged is still unmeasured and it is now carrying more weight, because the float band bottom is 2.4 K further below the cabin than the panel that wrote it thought. Thirty-five degree contact surfaces in an 11.6 °C float are a stronger claim than the same surfaces in a 13.5 °C one, and there is nothing behind it here.',
        'Series delivery has a thermal version of the ventilation fail and this panel owns it too. Both stations tap one 35 °C feed in line, so the rear manifold sees the front one\'s return temperature, and on a cold start the rear mats reach temperature roughly 20 seconds after the front ones on a 0.85 liter loop. That is small and it is real, and the fix, a parallel pair of feeds, gives back the pump saving.',
        'The rear channel panels are in the volume interior-11 needs for the ingress path, and this module has drawn them before that partner exists. design/gen11.md section 9 item 2 says rear ingress is past the front seat and a 1.20 m cabin has no second door line worth the name, so the surface a rear occupant\'s foot slides along on the way in is exactly where a 35 °C panel now stands. It is 12 mm thick with a formed edge and it is bolted to the lid rather than to trim, so interior-11 can move it, but somebody has to.',
      ],
      explode: [0.05, -0.35, 0.25],
    },
    'pack-loop': {
      name: 'Pack gallery loop',
      tagline: 'The pack changed everywhere except at the two faces this loop lands on, and this panel exists to say which is which with the x-ray that proves it.',
      mass: 10,
      specs: [
        ['Vapor stub face', 'x 1.2970 at (y 0.268, z -0.10), x-rayed on battery-11'],
        ['Liquid feed face', 'x 1.2970 at (y 0.118, z 0.10), x-rayed on battery-11'],
        ['At cruise', '4.0 W out of the pack: pump OFF, thermosiphon below 500 W'],
        ['Design load', '15 kW at battery-11\'s 430 A ceiling, unchanged'],
        ['Head', 'Receiver axis y 0.7200 built, over the pool at 0.118: 9.5 kPa'],
        ['Maturity', 'Pilot line; the 19 kg fluid ledger is STILL unresolved'],
      ],
      how: 'design/gen11.md gives this slot one instruction about the pack and it is worth doing literally: the pack loop lands on battery-11, whose geometry changed at the sill, so measure the new gland faces and declare them. Measured, by an x-ray back along the two stub axes through battery-11\'s built mesh, neither face moved. The vapor stub presents its outer face at x 1.2970 at (y 0.268, z -0.10) and the liquid feed at x 1.2970 at (y 0.118, z 0.10), which is where battery-7 put them, where battery-10 carried them and where battery-11 carries them again, and battery-11\'s own header says so in a sentence that this panel is the check on rather than the echo of. Both are declared in the interface block above with NO extent clause, and the reason is a check this module ran on its own declaration and failed: realize() reads `lo` as the minimum coordinate over every vertex of the part, so extent min fails when the part goes PAST the plane, which is exactly what a hose landing on a spigot does. Measured, lo is 1.2733 against a 1.2950 bound. Realization already proves the flange arrives; an extent clause belongs on the half that has to stop.\n\nWhat DID change is the volume around them, and it changes what this loop may do rather than where it lands. battery-11\'s merged sill now fills |z| 0.6600 to 0.7800 from y 0.1035 to 0.4200 over x -1.06 to 1.08, so the outboard corridor at rocker height that every pack loop on this ladder has treated as free is structure. This loop never used it, because its riser climbs from the stub at |z| 0.100 to the nose on the driver flank at |z| 0.330 to 0.390 and both ends are forward of x 1.08 where the sill has not started. It is stated because the next module to route along a rocker will assume what thermal-9 assumed, and the recovery core one panel up is what happens then.\n\nEverything else is thermal-7\'s architecture with thermal-9\'s control law and it is carried deliberately, including its unresolved item. The loop is a sealed two-phase circuit; the pump is retained and dark for more than 99 percent of a long drive, running only above about 500 W of pack dissipation, which means charging, preconditioning and a hot park; the design load is battery-11\'s measured 15 kW rather than anything scaled from current squared, because the limit is confined-channel critical heat flux in a 1.1 mm boiling gap and not ohmic heating.\n\nAND THE GRAVITY HEAD WENT DOWN RATHER THAN UP, WHICH IS THE CORRECTION THIS PANEL OWES ITS OWN SPEC ROW. An earlier draft of this paragraph read "11.6 kPa rather than thermal-9\'s 10.4, because the receiver went UP 40 mm with the frunk deck". Both halves are the wrong sign against what this file draws. Measured on the built mesh, the receiver axis is y 0.7200 here against thermal-9\'s 0.7800, over the same battery pool at 0.118, so the liquid column is 0.602 m against 0.662 and the receiver went DOWN 60 mm. On the ladder\'s own 15.7 kPa per meter, which is thermal-7\'s and thermal-9\'s 10.4 kPa over their 0.662 m, that is 9.5 kPa: 9 percent LESS head, not 12 percent more. The reason is the same hv-11 buffer that reshaped the frunk one panel over. thermal-9 stands this vessel on a rail at y 0.740 and that rail is inside the buffer tray, so the hardware came down onto a deck plate whose top face is 0.6700, and the machine that went up 60 mm is the heat pump, which moved the other way off a pan that had no casting under it. A thermosiphon at 9.5 kPa still carries several hundred watts unaided and thermal-6 ran a whole generation on the principle; the 9 percent it lost is on the fail list rather than talked away in this sentence.',
      why: 'This is the panel a package generation is most likely to get wrong, because the pack is the module that visibly changed and the natural move is to change with it. The measurement says the opposite: battery-11 moved 23 kg of aluminum into a sill and did not move either face this loop touches by a micron, so the correct Gen 11 action on this part is almost nothing, and the work is proving that rather than assuming it. design/gen11.md\'s own instruction to measure the gland faces is what makes the nothing publishable.',
      fail: [
        'The pump was also the flow sensor and it still is not. For 99 percent of a drive there is no measurement that a leak has started; the replacement is a saturation-pressure trend against ambient, which finds a slow loss in days rather than minutes. This saving cost a diagnostic and it costs it again here.',
        'A thermosiphon is orientation dependent and 9.5 kPa is 9 percent less head than thermal-9 had, because the receiver came down 60 mm onto a deck plate to get clear of hv-11\'s buffer. The receiver is above the pool on level ground and on any grade this car will meet, and the case nobody tests is a long descent, nose down, with a nearly empty receiver. The answer is to start the pump on inclinometer rather than on temperature, which is a control dependency where thermal-7 had a hydraulic certainty.',
        'The fluid ledger does not close for a third generation. battery-11 carries battery-6\'s pool untouched, so about 12 liters and 19 kg of fluoroketone still stand on THIS module\'s ledger against a 10 kg line, which makes the pack path 22 kg and this module 53 against a declared 44. The three ways out are unchanged: a shallower pool, the mass moving onto the pack where the pool physically is, or a target that admits what two-phase cooling costs. Restating an open item is not resolving it.',
      ],
      explode: [0.15, -0.25, -0.30],
    },
    'glycol-loop': {
      name: 'Glycol circuit',
      tagline: 'The largest thermal load in this car is still a computer, and it just halved. This loop is a 5 W pump attached to it, ending at a declared plane rather than at a partner that does not exist.',
      mass: 4,
      specs: [
        ['Loop', '1 circuit, 1.6 L, one 5 W pump on a 12 K rise (thermal-9: 6 W)'],
        ['Largest load', 'Compute, 192 W continuous: 44 percent of the auxiliary term'],
        ['Frunk deck', 'Two plates either side of hv-11\'s buffer, top y 0.6700, |z| 0.110 to 0.400'],
        ['Compute handover', 'Declared at z -0.6560 to a bulkhead plate; autonomy-11 declares it too, MET'],
        ['Drive handover', 'Flanges held at x 1.75; blocker is still drivetrain-9\'s housing'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The pump arithmetic is thermal-9\'s and the input halved. This loop takes compute heat and converter loss to the coil, and 380 W at a 12 K rise needs 0.0076 kg/s while 192 W at the same rise needs 0.0038. Hydraulic power in a fixed circuit goes with the cube of flow, so what is left is the wet-rotor motor\'s own fixed loss, which is the floor thermal-9 already reached: 6 W becomes 5 on a smaller can and not 0.75. One watt, and the honest note is that the saving from halving the load is almost entirely unavailable because the machine is already at its floor. The three-way parallel manifold that kept autonomy-4\'s voting lanes at one inlet temperature is not drawn, for the reason in section 7 of the header, and the argument behind it is handed on with the interface: a serial flow path that puts lane three 12 K above lane one is a common-mode aging driver dressed as a plumbing detail, and whoever draws autonomy-11\'s plate should draw it parallel.\n\nTHE FRUNK DECK IS TWO PLATES AND hv-11 IS WHY. thermal-9 carries thermal-7\'s rail at y 0.740 on four legs to a casting top face at y 0.580, with an outboard leg pair at |z| 0.480 that thermal-9 itself moved out from 0.475 to clear body-9\'s crash rail at 0.465. Both facts are false on body-11. Down-rayed on its built casting there is metal at y 0.5800 only over |z| 0.335 to 0.535 and only from x 1.550 to 2.060, and a four-plate rib bank stands on that face to y 0.6225 over |z| 0.3550 to 0.5150, so the flat is |z| 0.3350 to 0.3550 and nothing else; inboard of 0.335 the frunk is open air until x 2.000, where a cross member tops out at y 0.3700 under |z| 0.28. The crash rails moved OUTBOARD to |z| 0.395 to 0.485 when the beam came in to 1.00 m, so the 0.480 legs are 12.87 mm inside them over 72 crossing pairs.\n\nAnd then hv-11 took the middle. Its 48 V buffer tray is a 7 mm slab at y 0.6250 to 0.6320 running the full |z| 0.4200 over x 1.825 to 1.975, with ribs to 0.6460, and its case stands on that to 0.7962 over |z| 0.1010 at its widest across x 1.798 to 2.016. A single centerline deck at frunk height is inside it: thermal-9\'s reads 49.60 mm over 220 crossing pairs on the glycol part alone. So the four legs, their eight footplates and their bolts are deleted for TWO holed plates, each 255 by 290 mm, top face y 0.6700, spanning |z| 0.110 to 0.400 by x 1.790 to 2.045. THE PLATE INNER EDGE CLEARS THE CASE BY 9.0 mm AND NOT THE 14.7 AN EARLIER DRAFT PRINTED, because that draft read the case half-width off its hold-down strap tabs at |z| 0.0953 rather than off its foot flange at 0.1010, which is where the case is widest. 9.00 mm is the surface-to-surface nearest approach between this whole part and hv-11/buffer, plate inner edge at (1.9290, 0.6620, -0.1100) square across to the flange at (1.9290, 0.6620, -0.1010), so it is the real clearance and not a projection of one. It is the second published clearance on this module that a 5.7 mm reading error made look comfortable, the heat pump\'s being the first. Each stands on two pads on the flat spar band at |z| 0.3440, and the pads are at x 1.805 and 2.014 rather than under the middle of the plate because a pad anywhere between 1.825 and 1.975 rises straight through the buffer tray, which cost 68 crossings at 30.80 mm before it was measured. Two posts at (2.015, |z| 0.135) carry the front of the plates down to the cross member at 0.3700.\n\nThe aft runs are carried because they were measured and they still clear: the driver-flank run to the compute bulkhead and the passenger-flank return to the nose both pass suspension-9\'s built rack, air spring and air-supply line and body-11\'s pan, and the self-check sweeps them rather than asserting them. What is NOT carried is where they end. thermal-9 lands three spigots in autonomy-4\'s cold plate at x -0.795 and two in hv-4\'s converter at (-1.43, 0.40, 0.247); neither partner is in this preset and autonomy-4\'s plate is on the centerline inside the rear occupant. The run therefore ends on a bulkhead plate bolted to body-11\'s pan upstand at (-0.900, 0.5250, -0.6560) and the plane is declared as `compute-coolant-inboard` for autonomy-11 to meet. Both of those coordinates are measured rather than chosen: 0.5250 is inside the 94.7 mm free band the sill pocket actually has between hv-11\'s bywire-feeds at 0.4820 and body-11\'s shoulder at 0.5767, and the built result against the shipped autonomy-11 is 8.79 mm between the two parts at their nearest, ear to hose, and -0.900 is forward of body-11\'s cage rear leg, which passes through the same pocket at x -0.9995 to -0.9947. The drive handover flanges stay at (1.75, 0.50, -0.10) and (1.75, 0.50, -0.20) for a fourth generation with the same finding attached: suspension-9 cleared that route when it dropped its crossmember, drivetrain-9\'s own front housing is what blocks it at 1.2 mm, and about 30 mm of stub standoff off that housing wall closes it. It is that module\'s face to move.',
      why: 'The auxiliary term on this car is 439 W and thermal owns 45 of it, so the useful output of this panel is not its one watt. It is the two sentences a successor needs: the largest single thermal load in the vehicle is silicon that this slot can cool and cannot switch off, and it halved at Gen 10 without anyone re-deriving what that did to the cabin. The first sentence is thermal-9\'s and it is still true. The second is this generation\'s and it is on the header, because it moved the float temperature two kelvin and nobody noticed for a whole rung.',
      fail: [
        'Consolidating to one loop still puts compute, the converter and the pack condenser on a single path, so one leak takes all three, and the 12 K rise shrinks the margin between a partial blockage and a throttle event. Flow is monitored rather than level and each load has a thermal fallback, and the topology is a knowing concentration that is worse than thermal-6\'s two-loop split.',
        'The compute handover is DECLARED AND MET, and what is still open is the ownership rather than the plane. Both modules declare z -0.6560 on the same axis with the same sign and extent, and both realize on it at 0.000 mm, so the interface pairs and checks rather than warns. What neither module has resolved is the hardware across the gap, and it is bigger than either side says. autonomy-11\'s own panel says its hoses stop "1.0 mm short" of this plate\'s ports; measured on both built modules the two parts\' nearest approach anywhere is 8.79 mm, plate ear to hose, and the ports themselves are further off than that. This plate presents them at (-0.900, y 0.509 and 0.541, z -0.6250) and the nearest autonomy-11 geometry to the upper one is 13.00 mm away, to the lower one 43.60. DECLARED_JOINTS ships empty and a sleeved joint would read as an undeclared interference under a zero-new-pairs gate, so neither module draws the coupling and roughly 0.3 kg of coupling, clamp and the hose that closes 44 mm of y belongs to whichever module the integrator assigns it to. A met key is not a closed joint.',
        'A 12 K rise means the coil sees a hotter return, which is free at cruise and is not free parked, and the parked case got worse this generation from the other end: the coil lost 14 percent of its glycol face and its fans lost 24 percent of their swept area. On a 40 °C hot park with the compute stack awake in a charging bay this is the thinnest margin in the module and it is the one nobody watches, because the range meter is not running.',
      ],
      explode: [0.05, -0.45, -0.15],
    },
  },
};

/* ── Geometry ──────────────────────────────────────────────────────────────

   ZONES. Front stack x [2.08, 2.26] (P.thermalFront) and firewall HVAC
   x [0.78, 1.00], both unchanged since thermal.js. What is new is that the
   FRUNK BAY is no longer a volume, it is two decks and a bay under them:
   body-11 builds casting at y 0.5800 only over |z| 0.335 to 0.535 with a rib
   bank on it to 0.6225 from |z| 0.3550 out, and a cross member at y 0.3700
   under |z| 0.28, and hv-11 owns the centerline from y 0.6250 up. Every
   mount in the nose lands on the flat spar band, the cross member, or a
   plate standing on them.

   CORRIDORS, all measured against BUILT partners and all listed here so a
   reviewer can check the list rather than reconstruct it:
     nose vertical      |z| < 0.050 between the two 200 mm fans, x 2.08..2.13
     frunk decks        y 0.6700 top face, x 1.790..2.045, |z| 0.110..0.400,
                        one plate each side of hv-11's buffer case, whose
                        widest measures |z| 0.1010 at its foot flange, so the
                        inner edge clears it by 9.0 mm
     under-tray band    y 0.5550..0.6250 across |z| 0.330, x 1.750..2.060,
                        the only cross-car route in the nose that misses the
                        buffer; the pack liquid return uses it
     inter-spar bay     x 1.720..2.025, y 0.400..0.580, |z| 0.330, empty on
                        every partner but 12 mm of suspension-9 air-supply at
                        (1.860, 0.403, +0.200); local-circuits' machines and
                        the coil's cold header use it
     toeboard           y 0.4836..0.5544 under wheels-11's brake master unit
                        and under hv-11's zone-drops, x 0.98..1.19
     firewall           x 0.786..0.986, |z| < 0.230, clear of wheels-11's
                        brake master unit at |z| 0.2695..0.4050
     shoulder pocket    (y 0.5250, |z| 0.6000) driver side only, one 60 mm
                        extract duct, 13.0 mm over hv-11's bywire-feeds,
                        21.7 under body-11's shoulder, 15.0 inside its pan
                        upstand
     lid channels       (y 0.325, |z| 0.400) both sides, between battery-11's
                        own seat rails at 0.280 and 0.520, hose only
     flank runs         thermal-9's glycol routes, carried and re-swept, with
                        the aft climb moved inboard to |z| 0.40..0.47 because
                        hv-11 fills the sill pocket below y 0.4820

   WHAT IS DELETED AND WHY, because a redraw that only adds is not a redraw:
     the R290 drained pan and its four legs   the casting under them is gone
     four glycol rail legs and eight plates   same, and the outboard pair was
                                              inside body-11's crash rail
     the mirrored extract duct pair           the sill band is battery-11's
     the cross-tunnel return collector        it existed to land the pair
     the rear bench manifold pair             two occupants, both in line
     one of two aft local runs                same
     three autonomy-4 cold plate spigots      partner not in this preset
     two hv-4 converter spigots               same
     the HV pigtail to hv-4's spur end        same, and it was a carried
                                              defect with 11.8 cm3 inside
                                              body structure that nobody owned
     the single centerline frunk deck         hv-11's buffer is built there

   TUBE SEGMENTS. lib.tube lays six segments between every input point at
   eight radial divisions: 96 triangles per waypoint. thermal-9's closing
   paragraph names four segments as the reclamation available to a later pass
   at a cost of up to a millimeter on the tightest duct clearance. This pass
   needs the room and takes it: hose() and tubeOf() below build at four
   segments per span.

   WITH ONE EXCEPTION, MEASURED RATHER THAN ASSUMED. A coarser sample chords
   the curve and a chord cuts to the inside of it, which is invisible in open
   air and is not invisible on a run that is inside a partner by agreement.
   At four segments the two pack landings read 11.0 and 9.1 mm into
   battery-11 against thermal-9's 7.1 and 8.6; at eight they read 6.00 and
   6.69. Those two runs carry `seg: 8` and nothing else on the module does.

   ── THE MEASURED RESULT, pasted from the run rather than described ─────

   Swept with tools/interfaces.js's own sweep, clipTris, sweepPrune and
   triTriDepth at LIMITS.pen.

   THE PARTNER SET IS ENUMERATED, NOT LISTED. The slot names come from
   js/registry.js's VARIANTS array, and for each slot the module swept is the
   highest-numbered file on disk matching that slot, unnumbered counting as
   Gen 1. That rule is deterministic, it needs no human to maintain it, and
   it is what a gen11 preset builds. It returns:

     autonomy-11  battery-11  body-11  drivetrain-9  hv-11
     interior-11  suspension-9  thermal-11  wheels-11

   An earlier run of this file also swept autonomy-10 and reported 21 rows
   against thermal-9 rather than 20. autonomy-10 is not what the autonomy
   slot resolves to any more, so the extra row, glycol-loop into
   autonomy-10/compute at 2.29 mm, is not a gen11 pair and is dropped. The
   principle stands and is why the rule is written down: a check whose SHAPE
   is a human-written list cannot report a partner nobody listed, and it
   cannot stop reporting one nobody removed either.

     thermal-11   3 penetrating part pairs
        6.69 mm   38 pairs   pack-loop x battery-11/floorlid
        6.00 mm  172 pairs   pack-loop x battery-11/galleries
        0.81 mm   12 pairs   pack-loop x battery-11/strikeshield

     thermal-9   20 penetrating part pairs, same partners, same predicate
       63.50 mm  548 pairs   heat-pump x hv-11/buffer
       49.60 mm  220 pairs   glycol-loop x hv-11/buffer
       16.70 mm 1112 pairs   recovery-core x body-11/floor-pan
       15.24 mm  591 pairs   recovery-core x hv-11/spine
       12.87 mm   72 pairs   glycol-loop x body-11/crash-rails
       10.20 mm   94 pairs   recovery-core x hv-11/hv-runs
        9.82 mm   95 pairs   heat-pump x body-11/front-casting
        8.63 mm   34 pairs   pack-loop x battery-11/floorlid
        8.43 mm   40 pairs   recovery-core x hv-11/bywire-feeds
        7.95 mm   21 pairs   recovery-core x body-11/shoulder
        7.85 mm   35 pairs   recovery-core x hv-11/zonal
        7.14 mm  175 pairs   pack-loop x battery-11/galleries
        5.89 mm  228 pairs   recovery-core x body-11/cage
        5.17 mm   98 pairs   glycol-loop x hv-11/hv-runs
        4.66 mm  114 pairs   glycol-loop x hv-11/converter
        3.90 mm   56 pairs   glycol-loop x interior-11/rear-seat-cushion
        3.78 mm   85 pairs   heat-pump x body-11/crash-rails
        2.62 mm   18 pairs   pack-loop x hv-11/buffer
        1.49 mm   10 pairs   pack-loop x battery-11/strikeshield
        1.24 mm   16 pairs   glycol-loop x hv-11/spine

     DIFF   0 NEW penetrating pairs. 17 of thermal-9's 20 are gone. The
     three that remain are the declared hose-over-spigot landing, all three
     shallower than thermal-9's and all three inside thermal-9's own
     BATTERY_LANDINGS box. This is the run AFTER the text corrections in
     this pass; not one of them touched geometry and the table is
     bit-identical to the one before them, which is the point of pasting it
     twice rather than asserting it once.

   ── AND THE CLEARANCES, WHICH THIS MODULE USED TO PUBLISH SELECTIVELY ──

   Zero penetrating pairs says where the module is not. It does not say how
   close it came, and an earlier draft of this file printed its 30.0 mm and
   its 94.7 mm free band and left its two tightest clearances in a code
   comment and in nothing at all. Every thermal-11 part was therefore
   measured surface to surface, exact closest point rather than nearest
   vertex, against every part of every module in the set above. Everything
   under 10 mm, sorted:

        1.85 mm   recovery-core x autonomy-11/compute
                  extract grille frame (-0.9308, 0.5590, -0.5932) to the
                  underside of the cold compute-coolant hose
        2.00 mm   recovery-core x body-11/floor-pan
                  plenum bolt ear (-0.9436, 0.4954, -0.6580) to the pan
                  upstand inner face at -0.6600
        2.60 mm   local-circuits x wheels-11/master-unit
        2.75 mm   glycol-loop x hv-11/spine
        2.90 mm   local-circuits x battery-11/floorlid
        3.50 mm   pack-loop x suspension-9/front-structure
        4.00 mm   glycol-loop x body-11/floor-pan
        4.00 mm   pack-loop x body-11/front-casting
        4.80 mm   local-circuits x interior-11/nvh
        5.73 mm   pack-loop x drivetrain-9/front-disconnect
        7.93 mm   glycol-loop x hv-11/hv-runs
        8.03 mm   glycol-loop x interior-11/nvh
        8.40 mm   glycol-loop x wheels-11/master-unit
        8.79 mm   glycol-loop x autonomy-11/compute
        9.00 mm   glycol-loop x hv-11/buffer

   Two of those replace published numbers that were 51 and 63 percent
   optimistic, both because the hv-11 buffer case was read off its 0.0953
   strap tabs instead of its 0.1010 foot flange: heat-pump to buffer is
   15.06 mm and not 22.7, and the deck plate inner edge to buffer is 9.00 mm
   and not 14.7. Two more are new to this file entirely and are the tightest
   places on the module, 1.85 and 2.00 mm, both on recovery-core and both in
   the aft sill pocket.

   Three contacts read exactly 0.00 mm and are attachments rather than
   clearances, which the penetration table above proves by not containing
   them: outdoor-coil onto body-11's casting front face at x 2.0700, and
   glycol-loop's deck pads onto the casting spar top at y 0.5800.

   Declared interfaces: all three realize, nearest vertex 0.020, 0.020 and
   0.000 mm. `compute-coolant-inboard` is MET, not warning: thermal-11/
   glycol-loop and autonomy-11/compute both declare a face on z at -0.6560,
   mirrored false, extent min, and both realize at 0.000 mm with lo exactly
   -0.6560, so checkInterfaces pairs them at a 0.000 mm gap. The two pack
   keys remain one-sided until battery-11 declares them and that is still
   the right visible state. Attachment: 7 part instances, 0 floating.
   Enclosure: 0 pairs at or over the 40 percent report floor, against
   thermal-9's 0. Triangles 45,146 over 580 meshes, merging to 84. */

/* Cylinder with its axis along X. Carried from thermal.js through thermal-9. */
function xcyl(r, h, mat, seg) {
  const c = lib.cyl(r, h, mat, seg);
  c.rotation.z = Math.PI / 2;
  return c;
}

function at(mesh, x, y, z) {
  mesh.position.set(x, y, z);
  return mesh;
}

/* A cast or machined block with a real break edge. lib.cbox holds the box's
   bounding box to the micron, so it can only remove material and cannot move
   a published clearance. Carried from thermal-9 unchanged, because the rule
   it encodes is right and the module's whole clearance table depends on it. */
function cb(w, h, d, mat, c) {
  return lib.cbox(w, h, d, c != null ? c : Math.min(0.003, Math.min(w, h, d) / 6), mat);
}

const YUP = new THREE.Vector3(0, 1, 0);

/* Point a helper built about +Y down an arbitrary direction. */
function aim(obj, dx, dy, dz) {
  obj.quaternion.setFromUnitVectors(YUP, new THREE.Vector3(dx, dy, dz).normalize());
  return obj;
}

/* A fin pack: n plates on a real pitch through ONE InstancedMesh, plates
   normal to Z. lib.fins draws a mesh per plate, which is a draw call per
   plate and a pitch four times coarser than a coil has. */
function finPack(w, h, d, n, t, mat) {
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(w, h, t), mat, n);
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    m.makeTranslation(0, 0, (i / (n - 1) - 0.5) * (d - t));
    im.setMatrixAt(i, m);
  }
  im.instanceMatrix.needsUpdate = true;
  im.castShadow = true; im.receiveShadow = true;
  return im;
}

/* A stamped end cap on an extruded header tank, sitting in the chamfer band
   the cbox cut so it cannot move the tank's bounding box in any axis. The z
   argument is not decoration: a cap is a feature of an END and takes the
   end's coordinate, which thermal-9 learned by putting four of them 57 mm
   inside the tanks they were meant to close. */
function endCaps(w, h, len, x, y, mat, z = 0) {
  const g = new THREE.Group();
  for (const s of [-1, 1]) {
    g.add(at(cb(w * 0.93, h, 0.006, mat, Math.min(0.0015, h / 8)), x, y, z + s * (len / 2 - 0.003)));
  }
  return g;
}

/* A crimped hose ferrule: the swaged collar a hose carries where it lands on
   a spigot. Built about +Y from y 0 to 3.1 r, so the caller seats it on the
   hose end and aims it back along the hose. */
function ferrule(r, mat) {
  const R = r * 1.44, L = r * 3.1;
  return lib.crease(lib.lathe([
    [r * 1.03, 0], [R, L * 0.13], [R * 0.87, L * 0.35], [R, L * 0.57],
    [R * 0.87, L * 0.79], [R * 1.12, L * 0.93], [r * 1.03, L],
  ], mat, 8), 26);
}

/* A P clip: the band and bolted foot that holds a hose where it crosses
   structure. The foot is orthogonalized against the tangent so a caller
   cannot build a degenerate basis. */
function pclip(r, tan, foot, mat) {
  const g = new THREE.Group();
  const stand = r + 0.0024;
  g.add(lib.torus(stand, 0.0017, mat, 10, 4));
  g.add(at(cb(0.0075, 0.0130, Math.max(0.008, r * 1.6), M.steel, 0.0008), 0, -(stand + 0.0065), 0));
  const f = lib.fastener(0.0026, M.steel, 'hex');
  f.rotation.x = Math.PI;
  f.position.y = -(stand + 0.0130);
  g.add(f);
  const z = new THREE.Vector3(...tan).normalize();
  const yv = new THREE.Vector3(...foot);
  yv.addScaledVector(z, -yv.dot(z));
  if (yv.lengthSq() < 1e-8) yv.set(z.y, -z.x, 0);
  yv.normalize().multiplyScalar(-1);
  const xv = new THREE.Vector3().crossVectors(yv, z);
  g.setRotationFromMatrix(new THREE.Matrix4().makeBasis(xv, yv, z));
  return g;
}

/* FOUR SEGMENTS PER SPAN, NOT SIX. This is thermal-9's own named
   reclamation, taken because design/gen11.md risk 2 is this module's
   triangle budget. The polyline is unchanged, so the tube still passes
   through every waypoint; what changes is how finely the curve between two
   waypoints is sampled, and the self-check measures the difference on every
   published clearance rather than asserting it is small. */
function tubeOf(pts, r, mat, seg = 4) {
  return lib.tube(pts, r, mat, false, Math.max(4, (pts.length - 1) * seg));
}

/* A hose run with a crimped ferrule at every termination and P clips where
   it crosses structure.

   o.seg reinstates thermal-9's SIX segments per span for one run. It is used
   on exactly the two runs that land inside battery-11, and the reason is
   measurable: a coarser sample chords the curve, a chord cuts to the inside,
   and on a landing that is already 7 mm inside a partner the chord is the
   difference between the declared 8.7 mm and 11.0. Everywhere else four
   segments is free. */
function hose(pts, r, mat, o = {}) {
  const g = new THREE.Group();
  g.add(tubeOf(pts, r, mat, o.seg || 4));
  const fm = o.ferruleMat || M.darkSteel;
  const cap = (a, b) => {
    const f = aim(ferrule(r, fm), b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    g.add(at(f, a[0], a[1], a[2]));
  };
  const e = o.ends || 'both';
  if (e === 'both' || e === 'start') cap(pts[0], pts[1]);
  if (e === 'both' || e === 'end') cap(pts[pts.length - 1], pts[pts.length - 2]);
  for (const c of o.clips || []) {
    const i = c.i, a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    g.add(at(pclip(r, [b[0] - a[0], b[1] - a[1], b[2] - a[2]], c.foot, o.clipMat || M.plastic),
      pts[i][0], pts[i][1], pts[i][2]));
  }
  return g;
}

/* lib.plate with lightening holes, in the XZ plane and with lib.plate's own
   slab convention: material between y + t/2 and y + 3t/2, NOT centered. */
function holedPlate(w, d, t, r, holes, hr, mat) {
  const s = new THREE.Shape();
  const hw = w / 2, hd = d / 2, rr = Math.min(r, hw, hd);
  s.moveTo(-hw + rr, -hd);
  s.lineTo(hw - rr, -hd); s.absarc(hw - rr, -hd + rr, rr, -Math.PI / 2, 0);
  s.lineTo(hw, hd - rr); s.absarc(hw - rr, hd - rr, rr, 0, Math.PI / 2);
  s.lineTo(-hw + rr, hd); s.absarc(-hw + rr, hd - rr, rr, Math.PI / 2, Math.PI);
  s.lineTo(-hw, -hd + rr); s.absarc(-hw + rr, -hd + rr, rr, Math.PI, Math.PI * 1.5);
  for (const [hx, hz] of holes) {
    const p = new THREE.Path();
    p.absarc(hx, -hz, hr, 0, Math.PI * 2, true);
    s.holes.push(p);
  }
  const geo = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 4 });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, t / 2, 0);
  return lib.crease(lib.mesh(geo, mat), 40);
}

/* A signal or wiring pigtail: two segments per point, which is
   indistinguishable at 2.6 mm and a fifth of what lib.tube's default spends. */
function wire(pts, r, mat) {
  return lib.tube(pts, r, mat, false, Math.max(4, pts.length * 2));
}

/* A service port: a brazed boss, a Schrader housing and a screwed cap, with
   its seating face on y = 0 growing +Y, the lib.fastener convention. */
function servicePort(r, mat) {
  const g = new THREE.Group();
  g.add(at(lib.cyl(r * 1.55, r * 0.55, M.castAlu, 8), 0, r * 0.275, 0));
  g.add(at(lib.cyl(r * 0.72, r * 1.5, M.darkSteel, 8), 0, r * 1.30, 0));
  g.add(at(lib.cyl(r, r * 1.15, mat, 8), 0, r * 2.62, 0));
  return g;
}

/* A sight glass: the machined boss and domed lens a technician reads the
   charge on. Seating face on y = 0. */
function sightGlass(r) {
  const g = new THREE.Group();
  g.add(at(lib.cyl(r, r * 0.5, M.castAlu, 8), 0, r * 0.25, 0));
  g.add(at(lib.sphere(r * 0.66, M.glass, 8), 0, r * 0.52, 0));
  return g;
}

/* A motorized valve or damper actuator: a can on a mounting flange with a
   molded connector standing off at 1.15 r so it clears the can. */
function actuator(r, h, mat) {
  const g = new THREE.Group();
  g.add(at(lib.cyl(r * 1.2, h * 0.14, M.castAlu, 8), 0, h * 0.07, 0));
  g.add(at(lib.cyl(r, h * 0.86, mat, 10), 0, h * 0.57, 0));
  g.add(at(cb(r * 0.60, h * 0.30, r * 1.0, M.plastic, 0.0012), r * 1.15, h * 0.52, 0));
  return g;
}

/* A convoluted bellows. Axis along X to match xcyl. The crest radius is
   exactly the r asked for and the root is smaller, so it can only be inside
   the plain cylinder it replaces. */
function bellows(r, len, n, mat) {
  const root = r * 0.84;
  const pts = [[root * 0.92, 0]];
  for (let i = 0; i < n; i++) {
    pts.push([root, (i + 0.14) / n * len], [r, (i + 0.5) / n * len], [root, (i + 0.86) / n * len]);
  }
  pts.push([root * 0.92, len]);
  const m = lib.crease(lib.lathe(pts, mat, 8), 34);
  m.geometry.translate(0, -len / 2, 0);
  m.rotation.z = Math.PI / 2;
  return m;
}

/* A centrifugal blower drawn as one: a spiral volute with a cutoff tongue
   and a discharge throat, the forward-curved wheel turning inside it, and
   the motor boss on the back. Built about the local origin in the XY plane
   with the wheel axis along +Z. rv is the throat radius and the assembly
   never leaves 1.21 rv. */
function blower(rw, rv, width, nb, mat) {
  const g = new THREE.Group();
  const tongue = rw * 1.10, top = rv * 1.21;
  const outline = [];
  const N = 18;
  for (let i = 0; i <= N; i++) {
    const a = (95 + (i / N) * 340) * Math.PI / 180;
    const r = tongue + (i / N) * (rv - tongue);
    outline.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  const last = outline[outline.length - 1];
  outline.push([last[0], top], [-tongue - 0.010, top]);
  const s = new THREE.Shape();
  s.moveTo(outline[0][0], outline[0][1]);
  for (let i = 1; i < outline.length; i++) s.lineTo(outline[i][0], outline[i][1]);
  s.closePath();
  const bore = new THREE.Path();
  bore.absarc(0, 0, rw, 0, Math.PI * 2, true);
  s.holes.push(bore);
  const geo = new THREE.ExtrudeGeometry(s, { depth: width, bevelEnabled: false, curveSegments: 4 });
  geo.translate(0, 0, -width / 2);
  g.add(lib.crease(lib.mesh(geo, mat), 40));

  const wheel = new THREE.Group();
  for (const zs of [-1, 1]) {
    const ring = lib.cyl(rw * 0.94, 0.0035, M.plasticLt, 14);
    ring.rotation.x = Math.PI / 2;
    wheel.add(at(ring, 0, 0, zs * (width / 2 - 0.006)));
  }
  const bl = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.0050, rw * 0.20, width - 0.016), M.plasticLt, nb);
  const mtx = new THREE.Matrix4(), q = new THREE.Quaternion(), pv = new THREE.Vector3();
  for (let i = 0; i < nb; i++) {
    const a = (i / nb) * Math.PI * 2;
    q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), a + 0.62);
    pv.set(Math.cos(a) * rw * 0.86, Math.sin(a) * rw * 0.86, 0);
    mtx.compose(pv, q, new THREE.Vector3(1, 1, 1));
    bl.setMatrixAt(i, mtx);
  }
  bl.instanceMatrix.needsUpdate = true;
  bl.castShadow = true; bl.receiveShadow = true;
  wheel.add(bl);
  lib.spin(wheel, 'z', 9);
  g.add(wheel);
  return g;
}

/* A brazed plate exchanger drawn the way one looks: two thick end plates
   with the corrugated pack VISIBLE between them and port stubs at the
   corners. The case is not drawn, because a case with plates sealed inside
   it is geometry nobody can see with a triangle budget. */
function plateHX(w, h, d, n, mat, o = {}) {
  const g = new THREE.Group();
  const ep = o.endPlate != null ? o.endPlate : Math.min(0.009, w * 0.17);
  const inner = w - 2 * ep;
  for (const s of [-1, 1]) {
    g.add(at(cb(ep, h, d, M.castAlu, Math.min(0.002, ep * 0.28)), s * (w - ep) / 2, 0, 0));
  }
  const t = inner / (n * 2.0);
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(t, h - 0.006, d - 0.006), mat, n);
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    m.makeTranslation(-inner / 2 + (i + 0.5) * (inner / n), (i % 2 ? 0.0007 : -0.0007), 0);
    im.setMatrixAt(i, m);
  }
  im.instanceMatrix.needsUpdate = true;
  im.castShadow = true; im.receiveShadow = true;
  g.add(im);
  const pr = o.portR || 0.0055, pl = o.portL || 0.010;
  const iy = h / 2 - (o.portInset || 0.013), iz = d / 2 - (o.portInset || 0.013);
  for (const [sy, sz] of (o.ports || [[1, 1], [1, -1], [-1, 1], [-1, -1]])) {
    g.add(at(xcyl(pr, ep + pl, M.castAlu, 8), (o.portSide || -1) * ((w - ep) / 2 + pl / 2), sy * iy, sz * iz));
  }
  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* ══ outdoor coil ═══════════════════════════════════════════════════════
     0.540 m of core at |z| 0.2700, which is body-11's own intake slat edge.
     The glycol row fills the aperture's height, y 0.2100 to 0.4000, and the
     refrigerant row goes above it at 0.4300 to 0.4720 behind the bumper beam
     at y 0.4750. Two 200 mm fans at |z| 0.1500 leave |z| < 0.050 clear for
     the vertical plumbing route every generation of this nose has kept. ══ */
  const coil = lib.part('outdoor-coil', [0.55, -0.10, 0]);

  /* three header tanks, extruded oval with stamped caps at the ends */
  coil.add(at(cb(0.078, 0.024, 0.545, M.darkSteel, 0.0070), CX, 0.192, 0));
  coil.add(endCaps(0.078, 0.024, 0.545, CX, 0.192, M.alu));
  const gCore = finPack(0.070, 0.190, 0.535, 46, 0.0026, M.alu);
  gCore.position.set(CX, GY, 0);
  coil.add(gCore);
  coil.add(at(cb(0.078, 0.022, 0.545, M.darkSteel, 0.0065), CX, 0.412, 0));
  coil.add(endCaps(0.078, 0.022, 0.545, CX, 0.412, M.alu));
  const rCore = finPack(0.070, 0.042, 0.535, 26, 0.0026, M.alu);
  rCore.position.set(CX, RY, 0);
  coil.add(rCore);
  /* the refrigerant row is U-flow, so both connections live in one top
     header, and it stops at |z| 0.230 to stay inside the aperture width */
  coil.add(at(cb(0.078, 0.022, 0.460, M.darkSteel, 0.0065), CX, 0.486, 0));
  coil.add(endCaps(0.078, 0.022, 0.460, CX, 0.486, M.alu));
  coil.add(at(cb(0.082, 0.012, 0.030, M.castAlu, 0.0025), CX, 0.486, 0));
  /* charge port on the built header top face at y 0.497 */
  coil.add(at(servicePort(0.0055, M.plasticLt), CX - 0.020, 0.497, 0.160));
  /* end plates carry the tube returns, with the formed flange and the three
     service screws a fabricated end plate has. Those screws are the one
     thing here that grows the envelope: seated on the plate face at
     |z| 0.2750 a hex head stands 2.65 mm proud, so the part reaches 0.2776.
     body-11's loft at x 2.168 measures a half-width of 0.5256 at y 0.38 and
     0.5504 at 0.45, so the coil is clear by 248 mm and the screws cost
     nothing. It is stated because the shroud paragraph says the coil's z
     envelope does not move, and about the shroud that is true. */
  for (const zs of [-1, 1]) {
    coil.add(at(cb(0.078, 0.320, 0.010, M.alu, 0.0022), CX, 0.339, zs * 0.2700));
    coil.add(at(cb(0.014, 0.320, 0.022, M.alu, 0.0022), CX - 0.046, 0.339, zs * 0.2640));
    for (const fy of [0.216, 0.339, 0.462]) {
      const s = lib.fastener(0.0035, M.steel, 'hex', { clock: 0.4 });
      s.rotation.x = zs * Math.PI / 2;
      coil.add(at(s, CX, fy, zs * 0.2750));
    }
  }
  /* glycol tap pair in the inter-fan corridor and the refrigerant distributor */
  for (const [ty, tz, mat] of [[0.192, 0.026, M.coolant], [0.412, -0.026, M.coolantHot]]) {
    coil.add(at(xcyl(0.012, 0.040, mat, 8), CX - 0.056, ty, tz));
  }
  coil.add(at(cb(0.040, 0.036, 0.032, M.castAlu, 0.0028), CX - 0.054, 0.508, 0.070));
  coil.add(at(cb(0.034, 0.032, 0.028, M.castAlu, 0.0026), CX - 0.054, 0.506, -0.070));
  /* glycol defrost tee, seated ON the refrigerant fin block face at x 2.133 */
  coil.add(at(cb(0.030, 0.028, 0.026, M.darkSteel, 0.0024), CX - 0.046, 0.451, 0.110));
  /* saturation-pressure transducer with a connector and its pigtail down the
     corridor: a free-cooling car needs a charge sensor a continuously
     running heat pump did not */
  coil.add(at(cb(0.024, 0.030, 0.022, M.sensor, 0.0022), CX - 0.054, 0.451, -0.120));
  coil.add(at(cb(0.011, 0.014, 0.013, M.plastic, 0.0012), CX - 0.070, 0.451, -0.120));
  coil.add(wire([
    [CX - 0.076, 0.451, -0.120],
    [CX - 0.082, 0.402, -0.140],
    [CX - 0.060, 0.300, -0.150],
    [CX - 0.036, 0.204, -0.146],
  ], 0.0026, M.plasticLt));

  /* shroud frame: two rails and four posts, all inside the core width */
  coil.add(at(cb(0.022, 0.014, 0.440, M.plasticLt, 0.0022), 2.132, 0.186, 0));
  coil.add(at(cb(0.022, 0.014, 0.440, M.plasticLt, 0.0022), 2.132, 0.497, 0));
  for (const pz of [-0.212, -0.070, 0.070, 0.212]) {
    coil.add(at(cb(0.022, 0.310, 0.014, M.plasticLt, 0.0022), 2.132, 0.341, pz));
  }
  /* the two brackets landing ON body-11's casting FRONT face. Measured by
     -x rays through the built mesh: the face is at x 2.0700 at y 0.36 and
     2.0600 at y 0.30, so the bracket is seated at 2.0700 and its bolts on
     the bracket top at y 0.3660 rather than on body-9's coordinates. */
  for (const bz of [-0.055, 0.055]) {
    coil.add(at(cb(0.062, 0.012, 0.070, M.steel, 0.0018), 2.101, 0.360, bz));
    for (const dz of [-0.022, 0.022]) {
      coil.add(at(lib.fastener(0.0042, M.steel, 'hex'), 2.101, 0.366, bz + dz));
    }
  }

  for (const fz of [-FZ, FZ]) {
    /* the shroud is a venturi rather than a ring: a bellmouth on the coil
       side, a short diffuser behind it and a mounting flange. Outer radius
       0.100 against thermal-9's 0.124, because a 0.540 m core cannot hold
       two 230 mm fans AND the inter-fan corridor. */
    const ring = lib.crease(lib.lathe([
      [0.0935, 0.0000], [0.0919, 0.0075], [0.0929, 0.0180], [0.0964, 0.0330],
      [0.1000, 0.0420], [0.1000, 0.0460], [0.0982, 0.0330], [0.0979, 0.0150],
      [0.0997, 0.0030], [0.0997, 0.0000], [0.0935, 0.0000],
    ], M.plastic, 14), 34);
    ring.geometry.translate(0, -0.023, 0);
    ring.rotation.z = -Math.PI / 2;
    ring.position.set(FX + 0.001, FY, fz);
    coil.add(ring);
    /* four stator struts, radial. The map is theta = pi/2 - a: a rotation of
       -a about X maps lib.cbox's long axis to (0, cos a, -sin a), which is
       PERPENDICULAR to the radius, and thermal-9 shipped eight tangential
       chords touching nothing before it measured them. */
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const strut = cb(0.008, 0.064, 0.011, M.plastic, 0.0012);
      strut.position.set(2.0810, FY + Math.sin(a) * 0.062, fz + Math.cos(a) * 0.062);
      strut.rotation.x = Math.PI / 2 - a;
      coil.add(strut);
    }
    coil.add(at(xcyl(0.026, 0.007, M.plastic, 12), 2.0810, FY, fz));
    coil.add(at(xcyl(0.017, 0.013, M.darkSteel, 10), 2.0775, FY, fz));

    const rotor = new THREE.Group();
    rotor.add(xcyl(0.029, 0.040, M.plastic, 14));
    const nose = lib.cone(0.021, 0.022, M.plasticLt, 10);
    nose.rotation.z = -Math.PI / 2;
    nose.position.x = 0.015;
    rotor.add(nose);
    for (let i = 0; i < 7; i++) {
      const pivot = new THREE.Group();
      /* five spanwise sections of a six point airfoil, twisted 0.62 rad at
         the root to 0.32 at the tip and swept back, closed as a loop. The
         swept tip radius measures 0.0873 against a shroud throat at 0.0919,
         so the blade has 4.6 mm of tip clearance in the shroud it turns in. */
      const secs = [];
      for (let k = 0; k < 5; k++) {
        const s = k / 4;
        const span = 0.022 + s * 0.0633;
        const chord = 0.038 - 0.011 * s;
        const thk = 0.0030 - 0.0014 * s;
        const pit = 0.62 - 0.30 * s;
        const swp = 0.008 * s * s;
        const cp = Math.cos(pit), sp = Math.sin(pit);
        const sec = [];
        for (const [u, sgn] of [[0.00, 0], [0.28, 1], [0.62, 1], [1.00, 0], [0.62, -1], [0.28, -1]]) {
          const zc = (u - 0.34) * chord;
          const xc = sgn * (thk / 2) * Math.sin(Math.PI * Math.min(1, u * 1.15));
          sec.push([xc * cp + zc * sp, span, -xc * sp + zc * cp + swp]);
        }
        secs.push(sec);
      }
      pivot.add(lib.crease(lib.loft(secs, M.plasticLt, true), 40));
      pivot.rotation.x = (i / 7) * Math.PI * 2;
      rotor.add(pivot);
    }
    rotor.position.set(FX, FY, fz);
    lib.spin(rotor, 'x', 18);
    coil.add(rotor);
  }
  sys.add(coil);

  /* ══ glycol circuit and the frunk deck ══════════════════════════════════
     THE DECK IS TWO PLATES, ONE EACH SIDE OF hv-11's BUFFER, and section 5a
     is the measurement that forced it. Each plate spans |z| 0.110 to 0.400
     and x 1.790 to 2.045 with its top face at DECKT 0.6700, which is 24.0 mm
     over hv-11's buffer tray at 0.6250 to 0.6320 and 12.0 mm over that
     tray's own stiffening ribs at 0.6460. The centerline corridor between
     the plates is the buffer case's, |z| 0.1010 at its widest, which is the
     foot flange over y 0.660 to 0.680 rather than the 0.0953 strap tabs an
     earlier draft of this file read the case off. So the plate inner edge
     clears the case by 9.0 mm and not by 14.7, and 9.00 mm is the measured
     surface-to-surface nearest approach between glycol-loop and
     hv-11/buffer over the whole module.

     Each plate stands on two pads on the ONE clear band of spar top there
     is. body-11's front casting spar tops out at y 0.5800 over |z| 0.3350
     to 0.5350, but its rib bank stands on that face from |z| 0.3550
     outboard, so the flat is 0.3350 to 0.3550 and nothing else. Each pad is
     18 mm of z centered on SPARZ 0.3440, 1.0 mm clear of the spar's inner
     edge and 1.0 mm clear of the first rib plate at 0.3550, and 78 mm tall
     because that is exactly spar top to plate underside. Two posts carry
     the front of the plates down to the casting cross member at y 0.3700.
     thermal-9's four legs, eight footplates and their bolts are deleted:
     three of the four pairs stood on air and the fourth was 12.87 mm inside
     body-11's crash rail. ══ */
  const gly = lib.part('glycol-loop', [0.05, -0.45, -0.15]);

  for (const ds of [-1, 1]) {
    const deck = holedPlate(0.255, 0.290, 0.012, 0.020,
      [[-0.062, -0.088], [0.062, -0.088], [-0.062, 0.088], [0.062, 0.088]], 0.028, M.alu);
    deck.position.set(DECKX, DECKY - 0.006, ds * DECKZ);
    gly.add(deck);
    /* downturned stiffening flange along each long edge, y 0.6520 to 0.6700,
       which clears the buffer tray's ribs at 0.6460 by 6.0 mm */
    for (const fs of [-1, 1]) {
      gly.add(at(cb(0.008, 0.018, 0.290, M.alu, 0.0012),
        DECKX + fs * 0.1235, DECKY + 0.003, ds * DECKZ));
    }
    /* THE PADS STRADDLE THE TRAY IN X AS WELL AS CLEARING IT IN Z. hv-11's
       tray is x 1.825 to 1.975 and a pad rising from the spar top at 0.5800
       to the plate underside at 0.6580 passes straight through its 0.6250
       plane, so the two stations are 1.805 and 2.014 and each pad is 34 mm
       of x: aft face 1.788 on the plate's own edge, and forward face 2.031
       inside its 2.045. At 1.850 and 2.000 the sweep read 68 crossings
       30.8 mm inside that tray. */
    gly.add(at(cb(0.034, 0.0780, 0.018, M.steel, 0.0022), 1.805, 0.6190, ds * SPARZ));
    gly.add(at(cb(0.034, 0.0780, 0.018, M.steel, 0.0022), 2.014, 0.6190, ds * SPARZ));
    gly.add(at(lib.fastener(0.0038, M.steel, 'hex'), 1.805, DECKT, ds * SPARZ));
    gly.add(at(lib.fastener(0.0038, M.steel, 'hex'), 2.014, DECKT, ds * SPARZ));
    /* post to the cross member top at y 0.3700, |z| 0.135 inside its 0.28,
       at x 2.015 so the whole 26 mm section lands on the member's own
       x 2.0000 to 2.0700 rather than overhanging its aft edge */
    gly.add(at(cb(0.026, 0.2880, 0.026, M.steel, 0.0024), 2.015, 0.5140, ds * 0.135));
  }

  /* four-port valve block: a casting with machined port pads, an actuator
     can and the pigtail that leaves it */
  gly.add(at(cb(0.084, 0.070, 0.100, M.castAlu, 0.0055), 1.870, 0.705, -0.180));
  gly.add(at(actuator(0.019, 0.032, M.darkSteel), 1.870, 0.740, -0.180));
  gly.add(wire([
    [1.886, 0.757, -0.180],
    [1.906, 0.752, -0.196],
    [1.918, 0.738, -0.222],
    [1.912, 0.724, -0.238],
  ], 0.0030, M.plasticLt));
  for (const bz of [-0.226, -0.180, -0.134]) {
    gly.add(at(cb(0.009, 0.024, 0.024, M.castAlu, 0.0018), 1.824, 0.700, bz));
    gly.add(at(xcyl(0.011, 0.028, M.castAlu, 8), 1.813, 0.700, bz));
  }
  /* the 5 W wet-rotor pump, with the end bell, the stator can seam, the
     saddle that ties it to the deck and the connector its watts arrive on */
  gly.add(at(xcyl(0.020, 0.058, M.darkSteel, 14), 1.960, 0.700, -0.180));
  gly.add(at(xcyl(0.0185, 0.009, M.castAlu, 12), 1.9265, 0.700, -0.180));
  const canSeam = lib.torus(0.0205, 0.0026, M.steel, 12, 5);
  canSeam.rotation.y = Math.PI / 2;
  gly.add(at(canSeam, 1.948, 0.700, -0.180));
  gly.add(at(cb(0.024, 0.017, 0.021, M.plastic, 0.0016), 1.956, 0.7195, -0.180));
  gly.add(wire([
    [1.956, 0.728, -0.180],
    [1.946, 0.744, -0.198],
    [1.926, 0.752, -0.224],
    [1.906, 0.750, -0.240],
  ], 0.0030, M.plasticLt));
  const saddle = lib.torus(0.0225, 0.0026, M.darkSteel, 12, 5);
  saddle.rotation.y = Math.PI / 2;
  gly.add(at(saddle, 1.972, 0.700, -0.180));
  for (const ss of [-1, 1]) {
    gly.add(at(cb(0.007, 0.028, 0.008, M.darkSteel, 0.0010), 1.972, 0.686, -0.180 + ss * 0.0225));
  }
  gly.add(at(xcyl(0.027, 0.020, M.plastic, 14), 1.999, 0.700, -0.180));
  /* volute cover bolts clocked to 0, 90, 180 and 270, on the built cover
     face at x 2.009 */
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    gly.add(at(aim(lib.fastener(0.0030, M.steel, 'hex'), 1, 0, 0),
      2.009, 0.700 + Math.sin(a) * 0.019, -0.180 + Math.cos(a) * 0.019));
  }
  gly.add(at(lib.cyl(0.010, 0.036, M.coolant, 8), 1.999, 0.731, -0.180));

  /* free-cooling plate stack: coil glycol straight into the 16 C branch with
     the refrigerant circuit dark. Three ports, not four: the fourth corner
     faces the pump can. */
  gly.add(at(plateHX(0.068, 0.076, 0.058, 11, M.steel,
    { portSide: 1, ports: [[1, 1], [1, -1], [-1, -1]] }), 1.880, 0.712, -0.310));
  gly.add(at(cb(0.036, 0.038, 0.036, M.castAlu, 0.0032), 1.880, 0.769, -0.310));
  gly.add(at(lib.fastener(0.0042, M.copper, 'hex'), 1.880, 0.788, -0.310));

  /* THE COMPUTE BULKHEAD, and its height is measured rather than chosen.
     The plate's outboard face is |z| 0.6560, 4.0 mm inside body-11's pan
     upstand inner face at 0.6600. Its CENTER is y 0.5250 because the sill
     pocket's free band is y 0.4820 to 0.5767: hv-11's spine, hv-runs and
     bywire-feeds fill everything below 0.4820 out to the upstand, and
     body-11's shoulder fairing closes the top at 0.5767. A 64 mm plate on
     that center leaves 15 mm under it and 20 over. autonomy-11's coolant
     hose pair descends through the same pocket, measured on the shipped
     module at y 0.5438 to 0.5849 over z -0.6487 to -0.5688 across x -0.99 to
     -0.85, and the built clearance between this whole part and that one is
     8.79 mm, ear to hose. It sits at x -0.900 rather than
     -0.950 because body-11's cage rear leg passes through the same pocket
     at x -0.9995 to -0.9947, and it is bolted to the upstand rather than
     hovering: two ears with their heads on the inboard face, because
     nothing in this part may pass the 0.6560 plane it declares. */
  gly.add(at(cb(0.110, 0.064, 0.024, M.castAlu, 0.0032), -0.900, POCKY, -0.6440));
  for (const ey of [-0.024, 0.024]) {
    gly.add(at(cb(0.026, 0.014, 0.014, M.castAlu, 0.0014), -0.900, POCKY + ey, -0.6490));
    gly.add(at(aim(lib.fastener(0.0034, M.steel, 'hex'), 0, 0, 1), -0.900, POCKY + ey, -0.6420));
  }
  for (const py of [-0.016, 0.016]) {
    gly.add(at(lib.cyl(0.007, 0.026, M.coolant, 8), -0.900, POCKY + py, -0.6250));
  }

  /* pump out, over the casting top, down the driver flank and aft along the
     lid to the compute bulkhead. The waypoints are thermal-9's route with
     the nose end re-seated on the new deck and the aft end stopping at the
     declared plane instead of inside a partner that is not in this preset. */
  gly.add(hose([
    [1.750, 0.500, -0.200],
    [1.744, 0.560, -0.215],
    [1.726, 0.622, -0.240],
    [1.640, 0.640, -0.270],
    [1.400, 0.648, -0.318],
    [1.150, 0.660, -0.288],
    [1.046, 0.648, -0.262],
    [0.994, 0.474, -0.260],
    [0.954, 0.358, -0.300],
    [0.700, 0.328, -0.350],
    [0.200, 0.324, -0.345],
    /* THE CLIMB HAPPENS FORWARD OF THE LUGGAGE BAY AND INBOARD OF hv-11,
       which is two constraints pulling opposite ways. interior-11's luggage
       fills x -1.3950 to -0.3950 from y 0.3120 to 1.1132 across |z| 0.5300,
       and its rear seat cushion fills x -1.2544 to 0.0050 from y 0.3080
       across |z| 0.3810, so the lid aft of x -0.395 is not a route at any
       height inboard of 0.530. hv-11 fills the pocket outboard of 0.5406
       from y 0.4105 to 0.4820 along the whole cabin, so the route out there
       has to be ABOVE 0.4820. This run therefore leaves the lid at x -0.10,
       gains its height at |z| 0.40 to 0.47 where the flank is empty from
       y 0.40 up, and is in the pocket band at y 0.51 by x -0.34. */
    [-0.100, 0.330, -0.396],
    [-0.190, 0.364, -0.412],
    [-0.250, 0.452, -0.420],
    [-0.310, 0.500, -0.468],
    [-0.380, 0.508, -0.546],
    [-0.620, 0.510, -0.558],
    [-0.800, 0.505, -0.582],
    [-0.870, 0.507, -0.6295],
    [-0.900, 0.509, -0.6220],
  ], 0.008, M.coolant, { ends: 'end', clips: [{ i: 4, foot: [0, 0, -1] }, { i: 7, foot: [1, 0, 0] }] }));
  /* and the return forward on the passenger flank at y 0.320, the route
     thermal-9 measured against suspension-9's built rack and air spring */
  gly.add(hose([
    [-0.900, 0.541, -0.618],
    [-0.850, 0.541, -0.588],
    [-0.620, 0.542, -0.560],
    [-0.380, 0.542, -0.548],
    [-0.310, 0.536, -0.470],
    [-0.250, 0.488, -0.436],
    [-0.190, 0.400, -0.432],
    [-0.120, 0.348, -0.442],
    [0.200, 0.338, -0.470],
    [0.640, 0.334, -0.464],
    /* THE CENTERLINE IS CROSSED FORWARD OF THE FRONT SEAT AND NOWHERE ELSE.
       interior-11's front seats reach x 0.6350 and its rear cushion x 0.0050,
       both on the rail tops at y 0.3080, so the lid between the two channels
       is free only forward of 0.635. This return therefore stays in the
       driver channel the whole length of the cabin and crosses at x 0.79 to
       0.91, which is the same window the local delivery loop's one cross
       tube uses. */
    [0.790, 0.336, -0.360],
    [0.870, 0.340, -0.150],
    [0.905, 0.336, 0.100],
    [0.972, 0.372, 0.280],
    [1.042, 0.494, 0.328],
    [1.150, 0.564, 0.290],
    [1.300, 0.610, 0.250],
    [1.470, 0.632, 0.200],
    [1.650, 0.640, 0.168],
    /* THE CAR IS CROSSED UNDER THE BUFFER TRAY, NOT OVER IT. hv-11's tray
       is a 7 mm slab at y 0.6250 to 0.6320 spanning |z| 0.4200 over
       x 1.825 to 1.975, and the band beneath it, y 0.5550 to 0.6250 across
       |z| 0.330 from x 1.750 to 2.060, is empty on every partner. This run
       uses it and climbs to the valve block AFT of the tray, at x 1.79 to
       1.81, where the tray has ended. */
    [1.720, 0.612, 0.100],
    [1.790, 0.598, -0.010],
    [1.796, 0.600, -0.140],
    [1.792, 0.630, -0.250],
    [1.806, 0.680, -0.278],
    [1.850, 0.702, -0.252],
    [1.870, 0.705, -0.232],
  ], 0.008, M.coolantHot, { clips: [{ i: 10, foot: [0, 0, 1] }], ends: 'start' }));
  for (const fz of [-0.100, -0.200]) {
    gly.add(at(xcyl(0.016, 0.014, M.darkSteel, 12), 1.752, 0.500, fz));
  }
  /* coil cold header up the inter-fan corridor to drive flange A. No ferrule
     at the flange end: a bolted flange joint does not carry a hose crimp,
     and a 1.44 r collar there grew into body structure on thermal-9. */
  gly.add(hose([
    [2.104, 0.192, 0.026],
    [2.098, 0.300, 0.028],
    [2.092, 0.410, 0.030],
    [2.070, 0.470, 0.010],
    [2.020, 0.500, -0.020],
    [1.920, 0.505, -0.060],
    [1.820, 0.502, -0.086],
    [1.750, 0.500, -0.100],
  ], 0.009, M.coolant, { ends: 'start' }));
  /* valve block to the free-cooling plate */
  gly.add(hose([
    [1.870, 0.700, -0.232],
    [1.876, 0.706, -0.272],
    [1.880, 0.710, -0.300],
  ], 0.008, M.coolant));
  /* pump down the front of the casting to the coil's hot glycol header. It
     leaves the plate forward of hv-11's buffer rather than over it. */
  gly.add(hose([
    [1.999, 0.731, -0.180],
    [2.036, 0.700, -0.164],
    [2.050, 0.600, -0.140],
    [2.056, 0.500, -0.100],
    [2.096, 0.450, -0.040],
    [2.104, 0.412, -0.026],
  ], 0.009, M.coolantHot));
  sys.add(gly);

  /* ══ R290 heat pump ═════════════════════════════════════════════════════
     thermal-7's sealed module, unchanged in every dimension, standing on the
     PASSENGER plate at DECKT 0.6700. Its whole footprint lies between
     |z| 0.118 and 0.375, and it stops 25 mm inside the plate's outboard
     edge at 0.400. Inboard it clears hv-11's buffer case by 17.0 mm, taken
     against the case's measured widest at |z| 0.1010 rather than against
     the 0.0953 strap tabs an earlier draft used, which is where the 22.7 mm
     this comment printed came from. The binding number is neither of those:
     surface to surface the nearest approach between heat-pump and
     hv-11/buffer is 15.06 mm, and it runs diagonally from the enclosure's
     lower inboard corner at (1.9929, 0.6549, 0.2672) to the crest of the
     buffer TRAY's outboard rib at (1.9732, 0.6460, 0.2568), from the
     mounting plate's lower outboard corner at (1.9808, 0.6588, 0.2546). Its
     tallest point is the gallery conditioner's tell-tale vent at y 0.892,
     under a hood whose measured underside at that station is 0.99. ══ */
  const hp = lib.part('heat-pump', [0.20, 0.50, 0.35]);

  hp.add(at(cb(0.150, 0.012, 0.100, M.steel, 0.0018), 1.930, 0.676, 0.230));
  hp.add(at(xcyl(0.050, 0.150, M.castAlu, 20), 1.930, 0.732, 0.230));
  hp.add(at(xcyl(0.044, 0.030, M.darkSteel, 16), 1.840, 0.732, 0.230));
  /* the shell is two deep-drawn halves welded at a girth seam, and the seam
     is what tells a viewer this is a hermetic can rather than a length of
     tube */
  for (const [sx, sr] of [[1.898, 0.0512], [1.860, 0.0470]]) {
    const seam = lib.torus(sr, 0.0034, M.steel, 14, 5);
    seam.rotation.y = Math.PI / 2;
    hp.add(at(seam, sx, 0.732, 0.230));
  }
  /* four hold-down bosses at the base-rail corners, where the shell has
     curved away and there is daylight over a bolt */
  for (const [fx, fz] of [[1.880, 0.196], [1.880, 0.264], [1.980, 0.196], [1.980, 0.264]]) {
    hp.add(at(cb(0.020, 0.006, 0.018, M.steel, 0.0012), fx, 0.682, fz));
    hp.add(at(lib.fastener(0.0038, M.steel, 'hex'), fx, 0.685, fz));
  }
  /* brazed suction and discharge stubs, seated on the shell SURFACE computed
     from the shell radius at their own z rather than at its centerline, and
     the oil drain plug on the low side */
  hp.add(at(lib.cyl(0.010, 0.012, M.castAlu, 8), 1.930, 0.786, 0.230));
  const suction = lib.cyl(0.011, 0.020, M.castAlu, 8);
  suction.rotation.x = Math.PI / 2;
  hp.add(at(suction, 1.945, 0.732, 0.174));
  hp.add(at(aim(lib.fastener(0.0068, M.darkSteel, 'hex'), 0, -0.6217, -0.7832), 1.988, 0.6997, 0.1893));
  /* terminal box with a lid, four screws and the gland the HV feed enters */
  hp.add(at(cb(0.055, 0.035, 0.050, M.plastic, 0.0028), 1.870, 0.802, 0.230));
  hp.add(at(cb(0.048, 0.005, 0.043, M.plasticLt, 0.0010), 1.870, 0.822, 0.230));
  for (const [sx, sz] of [[-0.020, -0.016], [0.020, -0.016], [-0.020, 0.016], [0.020, 0.016]]) {
    hp.add(at(lib.fastener(0.0024, M.steel, 'torx'), 1.870 + sx, 0.8245, 0.230 + sz));
  }
  const gland = lib.cyl(0.009, 0.016, M.darkSteel, 8);
  gland.rotation.x = Math.PI / 2;
  hp.add(at(gland, 1.865, 0.802, 0.260));

  /* receiver, with the straps, the sight glass a technician reads the charge
     on and the port a gauge goes on */
  hp.add(at(xcyl(0.030, 0.086, M.steel, 16), 1.925, 0.706, 0.345));
  for (const cs of [-1, 1]) {
    hp.add(at(lib.sphere(0.030, M.steel, 12), 1.925 + cs * 0.043, 0.706, 0.345));
    const band = lib.torus(0.0325, 0.0040, M.darkSteel, 14, 5);
    band.rotation.y = Math.PI / 2;
    hp.add(at(band, 1.925 + cs * 0.026, 0.706, 0.345));
  }
  hp.add(at(aim(sightGlass(0.010), 0, 1, 0), 1.955, 0.736, 0.345));
  hp.add(at(servicePort(0.0050, M.plasticLt), 1.895, 0.736, 0.345));

  /* suction accumulator, upright on the deck ahead of the compressor: forty
     starts a day is how a scroll that was going to last twenty years lasts
     three, and an accumulator is what stops liquid returning on start */
  hp.add(at(lib.cyl(0.026, 0.090, M.steel, 14), 2.010, 0.715, 0.320));
  hp.add(at(lib.sphere(0.026, M.steel, 12), 2.010, 0.760, 0.320));
  hp.add(at(lib.cyl(0.010, 0.024, M.steel, 8), 2.010, 0.658, 0.320));
  const aStrap = lib.torus(0.0285, 0.0045, M.darkSteel, 14, 5);
  aStrap.rotation.x = Math.PI / 2;
  hp.add(at(aStrap, 2.010, 0.696, 0.320));
  hp.add(at(servicePort(0.0046, M.plasticLt), 2.010, 0.782, 0.320));

  /* economizer flash vessel, water condenser, chilled evaporator and gallery
     conditioner: two end plates and an exposed pack each, because a case box
     with the plates sealed inside it is a decal with a triangle budget. The
     flash vessel moved 15 mm outboard, to |z| 0.145, so its own 54 mm pack
     stops at 0.118 rather than at 0.103. */
  hp.add(at(plateHX(0.062, 0.074, 0.054, 10, M.steel, { portSide: -1 }), 2.008, 0.720, 0.145));
  hp.add(at(plateHX(0.070, 0.080, 0.060, 11, M.steel, { portSide: -1 }), 1.930, 0.820, 0.160));
  hp.add(at(plateHX(0.058, 0.070, 0.052, 9, M.steel,
    { portSide: 1, portL: 0.008, portInset: 0.012, ports: [[1, 1], [-1, -1]] }), 2.010, 0.800, 0.250));
  /* gallery conditioner: double walled, refrigerant into the pack liquid,
     and the interstice between the walls is what the tell-tale vent watches */
  hp.add(at(plateHX(0.066, 0.072, 0.056, 11, M.steel, { portSide: -1 }), 1.860, 0.822, 0.330));
  for (const ws of [-1, 1]) {
    hp.add(at(cb(0.003, 0.076, 0.060, M.alu, 0.0008), 1.860 + ws * 0.0345, 0.822, 0.330));
  }
  hp.add(at(lib.cyl(0.006, 0.034, M.plasticLt, 8), 1.893, 0.875, 0.330));
  /* the three-way bypass that takes the refrigerant circuit out of the glycol
     path while the car free-cools: a body with ports, a can and a plug */
  hp.add(at(cb(0.046, 0.044, 0.046, M.castAlu, 0.0035), 1.812, 0.695, 0.190));
  hp.add(at(actuator(0.015, 0.028, M.darkSteel), 1.812, 0.717, 0.190));
  hp.add(wire([
    [1.822, 0.732, 0.190],
    [1.838, 0.729, 0.202],
    [1.850, 0.716, 0.224],
    [1.848, 0.700, 0.238],
  ], 0.0028, M.plasticLt));
  for (const [px, py, pz] of [[1.838, 0.695, 0.190], [1.812, 0.695, 0.216], [1.812, 0.717, 0.164]]) {
    hp.add(at(cb(0.014, 0.020, 0.014, M.castAlu, 0.0015), px, py, pz));
  }
  /* two enclosure thermistors, connectors facing -x off the sensor end
     rather than up into the shell above them. Both moved outboard with the
     plate: at thermal-9's |z| 0.100 the case corner would be 0.087. */
  for (const ez of [0.135, 0.180]) {
    hp.add(at(cb(0.026, 0.030, 0.026, M.sensor, 0.0024), 1.900, 0.686, ez));
    hp.add(at(cb(0.013, 0.012, 0.011, M.plastic, 0.0012), 1.8815, 0.686, ez));
  }
  /* hydrocarbon sensor at the enclosure low point and the overboard vent.
     The vent's lower end sits on the deck top at y 0.6700 rather than under
     it, because body-11 puts a crash rail where thermal-9's vent used to
     hang. */
  hp.add(at(cb(0.030, 0.026, 0.026, M.sensor, 0.0026), 1.950, 0.684, 0.360));
  hp.add(at(cb(0.012, 0.012, 0.013, M.plastic, 0.0012), 1.950, 0.701, 0.360));
  hp.add(at(lib.cyl(0.013, 0.050, M.plasticLt, 8), 2.006, 0.695, 0.360));
  hp.add(at(lib.cyl(0.017, 0.005, M.plasticLt, 10), 2.006, 0.7225, 0.360));
  hp.add(at(lib.cone(0.016, 0.010, M.plasticLt, 10), 2.006, 0.7300, 0.360));

  /* discharge to the water condenser, mid-pressure injection, suction */
  hp.add(hose([
    [1.930, 0.786, 0.230],
    [1.928, 0.800, 0.198],
    [1.930, 0.812, 0.172],
  ], 0.007, M.coolantHot));
  hp.add(hose([
    [1.978, 0.720, 0.152],
    [1.968, 0.736, 0.176],
    [1.952, 0.760, 0.198],
  ], 0.005, M.coolant));
  /* suction runs through the accumulator before it reaches the machine.
     Both of these terminate INSIDE a vessel, so the ferrule is suppressed
     there rather than drawn where nobody can see it. */
  hp.add(hose([
    [1.945, 0.678, 0.174],
    [1.980, 0.666, 0.240],
    [2.008, 0.660, 0.300],
  ], 0.008, M.steel, { ends: 'start' }));
  hp.add(hose([
    [2.010, 0.748, 0.320],
    [1.980, 0.736, 0.336],
    [1.955, 0.720, 0.344],
  ], 0.008, M.steel, { ends: 'none' }));
  sys.add(hp);

  /* ══ pack gallery loop ══════════════════════════════════════════════════
     thermal-7's condenser stack, receiver, bellows, purge pot, 34 mm riser
     and 13 mm return. The 8 W pump is retained with thermal-9's inverted
     control law: dark at cruise, running only above about 500 W of pack
     dissipation. Both landings are on battery-11's stub faces at x 1.2970,
     x-rayed and declared in the interface block. ══ */
  const pk = lib.part('pack-loop', [0.15, -0.25, -0.30]);

  pk.add(at(plateHX(0.070, 0.080, 0.062, 11, M.steel, { portSide: -1 }), 1.850, 0.715, -0.340));
  /* the receiver, with two saddle straps, a sight glass and a gauge port */
  pk.add(at(xcyl(0.032, 0.092, M.steel, 16), 1.960, 0.720, -0.340));
  for (const cs of [-1, 1]) {
    pk.add(at(lib.sphere(0.032, M.steel, 12), 1.960 + cs * 0.046, 0.720, -0.340));
    const band = lib.torus(0.0345, 0.0042, M.darkSteel, 14, 5);
    band.rotation.y = Math.PI / 2;
    pk.add(at(band, 1.960 + cs * 0.028, 0.720, -0.340));
  }
  pk.add(at(aim(sightGlass(0.010), 0, 0, -1), 1.980, 0.720, -0.3720));
  pk.add(at(servicePort(0.0050, M.plasticLt), 1.936, 0.7520, -0.340));
  pk.add(at(cb(0.026, 0.042, 0.020, M.sensor, 0.0025), 1.960, 0.760, -0.340));
  pk.add(at(cb(0.013, 0.012, 0.012, M.plastic, 0.0012), 1.9410, 0.760, -0.340));
  /* inclinometer and the saturation transducer that replace flow sensing */
  pk.add(at(cb(0.022, 0.020, 0.024, M.sensor, 0.0022), 2.008, 0.752, -0.340));
  pk.add(at(cb(0.011, 0.012, 0.011, M.plastic, 0.0012), 2.008, 0.766, -0.340));
  pk.add(wire([
    [2.008, 0.772, -0.340],
    [1.998, 0.776, -0.350],
    [1.982, 0.776, -0.348],
  ], 0.0026, M.plasticLt));
  /* purge pot, on two legs down to the deck top at DECKT rather than
     standing on nothing */
  pk.add(at(lib.cyl(0.024, 0.052, M.steel, 14), 1.880, 0.760, -0.230));
  pk.add(at(lib.cyl(0.015, 0.018, M.darkSteel, 10), 1.880, 0.795, -0.230));
  for (const lz of [-0.208, -0.252]) {
    pk.add(at(cb(0.010, 0.064, 0.010, M.steel, 0.0012), 1.880, 0.702, lz));
  }
  const potBand = lib.torus(0.0252, 0.0032, M.darkSteel, 12, 5);
  potBand.rotation.x = Math.PI / 2;
  pk.add(at(potBand, 1.880, 0.742, -0.230));
  /* the drier, with the moisture-indicator window and its bracket */
  pk.add(at(lib.cyl(0.018, 0.038, M.alu, 10), 1.996, 0.695, -0.240));
  pk.add(at(lib.cyl(0.014, 0.026, M.plasticLt, 8), 1.996, 0.727, -0.240));
  pk.add(at(aim(sightGlass(0.007), 0, 0, -1), 1.996, 0.695, -0.2580));
  pk.add(at(cb(0.010, 0.026, 0.008, M.steel, 0.0010), 1.996, 0.683, -0.2230));
  /* the retained pump, on charge and precondition duty only */
  pk.add(at(xcyl(0.020, 0.052, M.darkSteel, 14), 1.876, 0.694, -0.372));
  pk.add(at(xcyl(0.0185, 0.008, M.castAlu, 12), 1.846, 0.694, -0.372));
  const pkSeam = lib.torus(0.0205, 0.0024, M.steel, 12, 5);
  pkSeam.rotation.y = Math.PI / 2;
  pk.add(at(pkSeam, 1.864, 0.694, -0.372));
  pk.add(at(cb(0.022, 0.016, 0.019, M.plastic, 0.0015), 1.880, 0.7135, -0.372));
  pk.add(at(xcyl(0.016, 0.022, M.castAlu, 12), 1.913, 0.694, -0.372));
  /* its bypass check valve: the thermosiphon path around a dark pump */
  pk.add(at(xcyl(0.013, 0.036, M.steel, 10), 1.876, 0.722, -0.372));

  /* 34 mm riser off battery-11's vapor stub face at x 1.2970, up the driver
     flank and over the casting to the receiver. The lower end gets NO
     ferrule: that end is the declared hose-over-spigot landing and a detail
     pass will not grow a vertex count inside a partner's envelope.

     THE WAYPOINTS NEAR THE STUB ARE thermal-9's, RESTORED. An earlier draft
     of this file thinned them from six to three and the Catmull-Rom then
     bulged 13.58 mm into battery-11's galleries against thermal-9's 7.14 on
     the same stub: a hose route is its point SPACING as much as its points,
     and a landing that deepens is a landing that changed.

     Above the stub it is pulled inboard to |z| 0.335, because body-11's rib
     bank stands on the spar from |z| 0.3550 to 0.5150 at y 0.5775 to 0.6225
     and thermal-9's 0.350 line puts a 34 mm hose 12 mm inside it. */
  pk.add(at(xcyl(0.024, 0.012, M.darkSteel, 12), 1.302, 0.268, -0.100));
  pk.add(hose([
    [1.290, 0.268, -0.100],
    [1.300, 0.304, -0.136],
    [1.312, 0.356, -0.192],
    [1.342, 0.416, -0.252],
    [1.372, 0.474, -0.296],
    [1.412, 0.548, -0.320],
    [1.512, 0.606, -0.328],
    [1.620, 0.610, -0.330],
    [1.700, 0.614, -0.332],
    [1.770, 0.660, -0.334],
    [1.840, 0.700, -0.337],
    [1.914, 0.712, -0.340],
  ], 0.017, M.coolantHot, { seg: 8, ends: 'end', clips: [{ i: 6, foot: [-0.6, -0.8, 0] }] }));
  pk.add(at(bellows(0.021, 0.026, 3, M.steel), 1.620, 0.610, -0.330));

  /* 13 mm liquid return to battery-11's feed stub face at x 1.2970, y 0.118.
     NEITHER END carries a ferrule: the lower one is the declared landing and
     the upper one starts inside the receiver's own end cap sphere.

     IT CROSSES THE CAR UNDER hv-11's BUFFER TRAY. The band y 0.5550 to
     0.6250 across |z| 0.330 from x 1.750 to 2.060 is empty on every partner
     in the preset, and it is the only cross-car route in the nose that does
     not go through the buffer: the tray is a slab at 0.6250 to 0.6320 over
     |z| 0.4200 and the case stands on it to 0.7962 over |z| 0.1010. So the
     line drops down the front of the deck at x 2.04, runs across at 0.590,
     and picks up thermal-9's flank route again at x 1.720. */
  pk.add(at(xcyl(0.014, 0.012, M.darkSteel, 10), 1.292, 0.118, 0.100));
  pk.add(hose([
    [2.001, 0.702, -0.340],
    [2.020, 0.690, -0.320],
    [2.034, 0.650, -0.290],
    [2.038, 0.606, -0.250],
    [2.036, 0.590, -0.170],
    [2.010, 0.586, -0.070],
    [1.960, 0.588, 0.030],
    [1.900, 0.592, 0.110],
    [1.840, 0.596, 0.160],
    [1.770, 0.590, 0.190],
    [1.720, 0.580, 0.200],
    [1.560, 0.560, 0.216],
    [1.430, 0.482, 0.212],
    [1.374, 0.404, 0.190],
    [1.346, 0.362, 0.174],
    [1.320, 0.338, 0.156],
    [1.306, 0.288, 0.140],
    [1.296, 0.216, 0.122],
    [1.289, 0.158, 0.108],
    [1.285, 0.118, 0.100],
  ], 0.0065, M.coolant, { seg: 8, ends: 'none', clips: [{ i: 12, foot: [-0.9, -0.44, 0] }] }));
  pk.add(at(bellows(0.0095, 0.022, 3, M.steel), 1.560, 0.560, 0.216));
  /* keyed, desiccant capped fill port on the liquid line where it turns down
     at the front of the deck, its screwed hex cap on the built port top face
     at y 0.7310 */
  pk.add(at(lib.cyl(0.009, 0.036, M.coolant, 8), 2.020, 0.698, -0.320));
  pk.add(at(lib.fastener(0.0120, M.plasticLt, 'hex'), 2.020, 0.7310, -0.320));
  sys.add(pk);

  /* ══ occupant-local delivery, in line ═══════════════════════════════════
     One feed and one return, each in one of the two channels battery-11
     leaves between its own seat rails at |z| 0.280 and 0.520, at y 0.325,
     which is 17 mm over the lid skin at 0.3020 and 17 mm over the rail tops
     at 0.3080 in nothing but hose. Two stations in line at the occupants'
     own hip x, and two radiant panels in the rear foot channels, which is
     the surface a four-seat car never had. ══ */
  const loc = lib.part('local-circuits', [0.05, -0.35, 0.25]);

  /* THE THREE LOCAL MACHINES ARE UNDER THE DECK, NOT ON IT, and that is the
     one packaging decision in this part. hv-11's buffer case occupies the
     nose centerline from y 0.6375 to 0.7962 across |z| 0.1010, which is
     exactly where thermal-9 stood this pump, and both deck plates start at
     |z| 0.110 to clear it. What is free is the BAY BETWEEN THE CASTING
     SPARS: x 1.720 to 2.025 by y 0.400 to 0.580 across |z| 0.330 has no
     partner geometry in it at all except a 12 mm length of suspension-9's
     air-supply trunk at (1.860, 0.403, +0.200). So the pump, the mixing
     valve and the expansion vessel hang on a bracket plate spanning the two
     deck posts, 170 mm below the deck they used to stand on, and they are
     on the +z side of the centerline because the coil's cold header uses
     the -z half of the same bay. */
  loc.add(at(cb(0.012, 0.130, 0.140, M.alu, 0.0018), 2.014, 0.470, 0.070));
  for (const by of [-0.050, 0.050]) {
    loc.add(at(aim(lib.fastener(0.0032, M.steel, 'hex'), -1, 0, 0), 2.008, 0.470 + by, 0.135));
  }
  /* the 3 W pump, its saddle on the bracket, and the mixing valve */
  loc.add(at(xcyl(0.016, 0.050, M.darkSteel, 14), 1.965, 0.500, 0.075));
  loc.add(at(xcyl(0.0145, 0.008, M.castAlu, 12), 1.936, 0.500, 0.075));
  const locSeam = lib.torus(0.0165, 0.0022, M.steel, 12, 5);
  locSeam.rotation.y = Math.PI / 2;
  loc.add(at(locSeam, 1.951, 0.500, 0.075));
  loc.add(at(cb(0.020, 0.015, 0.018, M.plastic, 0.0014), 1.959, 0.5165, 0.075));
  loc.add(wire([
    [1.959, 0.524, 0.075],
    [1.947, 0.538, 0.061],
    [1.927, 0.544, 0.043],
  ], 0.0026, M.plasticLt));
  const locSaddle = lib.torus(0.0185, 0.0024, M.darkSteel, 12, 5);
  locSaddle.rotation.y = Math.PI / 2;
  loc.add(at(locSaddle, 1.977, 0.500, 0.075));
  for (const ss of [-1, 1]) {
    loc.add(at(cb(0.006, 0.036, 0.007, M.darkSteel, 0.0009), 1.977, 0.4735, 0.075 + ss * 0.0185));
  }
  loc.add(at(xcyl(0.023, 0.018, M.plastic, 14), 1.999, 0.500, 0.075));
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    loc.add(at(aim(lib.fastener(0.0028, M.steel, 'hex'), 1, 0, 0),
      2.008, 0.500 + Math.sin(a) * 0.017, 0.075 + Math.cos(a) * 0.017));
  }
  /* mixing valve, its actuator plug on -x and its third pad on -z so neither
     faces the plate stack behind it */
  loc.add(at(cb(0.042, 0.042, 0.042, M.castAlu, 0.0035), 1.930, 0.452, 0.075));
  const mixAct = actuator(0.013, 0.024, M.darkSteel);
  mixAct.rotation.y = Math.PI;
  loc.add(at(mixAct, 1.930, 0.473, 0.075));
  loc.add(wire([
    [1.920, 0.485, 0.075],
    [1.906, 0.488, 0.059],
    [1.898, 0.482, 0.043],
  ], 0.0026, M.plasticLt));
  for (const [px, pz] of [[1.930, 0.054], [1.930, 0.096], [1.909, 0.075]]) {
    loc.add(at(cb(0.010, 0.018, 0.010, M.castAlu, 0.0012), px, 0.452, pz));
  }
  /* expansion vessel with the pressure cap a sealed loop is filled through */
  loc.add(at(lib.cyl(0.020, 0.044, M.steel, 14), 1.898, 0.520, 0.075));
  loc.add(at(lib.fastener(0.0140, M.plasticLt, 'hex'), 1.898, 0.5420, 0.075));

  /* the two aft runs, ONE PER CHANNEL. thermal-9 ran a mirrored pair of feeds
     to four manifolds; two occupants in line need one line each way.

     THE TOEBOARD IS CROSSED UNDER wheels-11's MASTER UNIT, and this is the
     item design/gen11.md's brief for this slot asks about by name. That unit
     fills x 0.9520 to 1.1933 from y 0.5600 to 0.6835 across |z| 0.4435,
     which is a wall, and thermal-9's runs went straight through the middle
     of it at y 0.618. The corridor is UNDERNEATH: the same unit's lower box
     stops at y 0.4836 over x 1.0033 to 1.0810 and hv-11's zone-drops start
     at 0.5544 over x 1.0181 to 1.0625, so there is a clear 70.8 mm band from
     y 0.4836 to 0.5544 running the width of the toeboard. These runs drop
     into it at x 1.18, aft of the unit's own aft face at 1.1933, and are out
     of it by x 0.98. */
  const runAft = (zNose, zSeat, mat) => hose([
    [1.999, 0.500, zNose],
    [1.940, 0.512, zNose + 0.030],
    [1.860, 0.530, zNose + 0.070],
    [1.780, 0.556, zSeat * 0.24],
    [1.500, 0.620, zSeat * 0.40],
    [1.320, 0.618, zSeat * 0.46],
    [1.220, 0.606, zSeat * 0.50],
    [1.180, 0.548, zSeat * 0.56],
    [1.100, 0.516, zSeat * 0.62],
    [1.020, 0.504, zSeat * 0.68],
    [0.980, 0.450, zSeat * 0.78],
    [0.962, 0.358, zSeat * 0.84],
    [0.900, 0.330, zSeat * 0.96],
    [0.760, 0.325, zSeat],
    [0.300, 0.325, zSeat],
    [-0.240, 0.325, zSeat],
  ], 0.006, mat, { clips: [{ i: 11, foot: [1, 0, 0] }] });
  loc.add(runAft(0.058, -SEATZ, M.coolantHot));
  loc.add(runAft(0.092, SEATZ, M.coolant));

  /* two stations in line, at the two occupants' own hip x at 36 degrees */
  for (const [sx, sz] of [[FRONTX, -SEATZ], [REARX, SEATZ]]) {
    loc.add(at(cb(0.090, 0.038, 0.058, M.castAlu, 0.0038), sx, 0.334, sz));
    loc.add(at(cb(0.010, 0.032, 0.050, M.alu, 0.0018), sx + 0.050, 0.334, sz));
    for (const py of [0.326, 0.344]) {
      loc.add(at(lib.cyl(0.006, 0.018, M.coolant, 8), sx + 0.049, py, sz));
    }
    loc.add(at(lib.fastener(0.0038, M.copper, 'hex'), sx - 0.022, 0.354, sz));
    /* ears on the z faces, landing on battery-11's lid between its rails */
    for (const ez of [-0.041, 0.041]) {
      loc.add(at(cb(0.026, 0.014, 0.020, M.castAlu, 0.0014), sx, 0.318, sz + ez));
      loc.add(at(lib.fastener(0.0032, M.steel, 'hex'), sx, 0.325, sz + ez));
    }
    /* THE CROSS TUBE EXISTS AT ONE STATION AND NOT TWO, and interior-11 is
       why. Its rear cushion and its front seats both land directly on
       battery-11's rail tops at y 0.3080 and both reach |z| 0.3810, and
       between them they cover the lid from the rear bulkhead forward to the
       toe board, so aft of the front seat there is no lid left between the
       two channels at any height. The only centerline crossing on this car
       is at the front station, and the rear station is therefore in series
       on the two channel lines rather than bridged across them, which is the
       series arrangement the fail list already prices in seconds. */
    if (sx === FRONTX) {
      loc.add(tubeOf([[sx, 0.322, sz], [sx, 0.318, 0], [sx, 0.322, -sz]], 0.005, M.coolantHot));
    }
  }

  /* front footwell radiant panels, carried from thermal-7 and MOVED FORWARD
     to x 1.0550. At thermal-9's 1.030 the passenger-side panel stood 12 mm
     inside this module's own recovery-core case, which thermal-9 flagged as
     ours to resolve; the core's +x posts are at 0.990 and the panel now
     starts at 0.999. */
  for (const rz of [-0.290, 0.290]) {
    const pan2 = new THREE.Group();
    pan2.add(cb(0.112, 0.012, 0.126, M.alu, 0.0022));
    for (const fz of [-0.059, 0.059]) {
      pan2.add(at(cb(0.112, 0.014, 0.008, M.alu, 0.0012), 0, -0.010, fz));
    }
    pan2.add(at(cb(0.008, 0.014, 0.126, M.alu, 0.0012), 0.0520, -0.010, 0));
    pan2.add(tubeOf([
      [-0.038, -0.014, -0.046], [0.038, -0.014, -0.046], [0.044, -0.014, -0.026],
      [-0.044, -0.014, -0.010], [-0.044, -0.014, 0.010], [0.044, -0.014, 0.026],
      [0.038, -0.014, 0.046], [-0.038, -0.014, 0.046],
    ], 0.0038, M.coolantHot));
    pan2.rotation.z = 0.35;
    pan2.position.set(1.055, 0.482, rz);
    loc.add(pan2);
    loc.add(at(cb(0.014, 0.026, 0.014, M.steel, 0.0014), 1.055, 0.507, rz));
    loc.add(at(lib.fastener(0.0034, M.steel, 'hex'), 1.055, 0.520, rz));
  }

  /* THE REAR FOOT CHANNEL PANELS, which are the tandem's own answer to
     thermal-9's third fail. design/gen11.md section 6 measures the rear
     occupant's feet passing beside the front seat in a 158 mm channel per
     side, so unlike a bench there is a WALL beside them. Two vertical panels
     stand in those channels, placed against wheels-11's BUILT harness rather
     than against the channel: the rerouted harness runs the rocker corner at
     x 0.5214 to 0.7868, y 0.3272 to 0.4216, |z| 0.5783 to 0.6477, so a panel
     on |z| 0.5450 has its outboard face at 0.5510 and clears it by 27.3 mm.
     On the passenger side suspension-9's air-supply trunk at |z| 0.5607 is
     the nearer partner and the clearance there is 9.7 mm. */
  for (const rz of [-1, 1]) {
    const rp = new THREE.Group();
    rp.add(cb(0.240, 0.090, 0.012, M.alu, 0.0022));
    for (const fx of [-0.114, 0.114]) {
      rp.add(at(cb(0.012, 0.090, 0.014, M.alu, 0.0012), fx, 0, -rz * 0.010));
    }
    rp.add(tubeOf([
      [-0.088, -0.032, -0.010], [0.088, -0.032, -0.010], [0.096, 0.000, -0.010],
      [-0.096, 0.000, -0.010], [-0.088, 0.032, -0.010], [0.088, 0.032, -0.010],
    ], 0.0036, M.coolantHot));
    rp.position.set(0.620, 0.372, rz * 0.5450);
    loc.add(rp);
    /* THE FEET STOP ON THE LID, THEY DO NOT ENTER IT. battery-11's seat
       rail at |z| 0.4975 to 0.5425 tops out at y 0.3080 over x 0.6296 to
       0.6950, and a 46 mm foot on the panel's own center put 4 mm of
       aluminum inside it. Each foot is 19 mm tall from that rail top to
       the panel's lower edge at 0.3270 and nothing more. */
    for (const fx of [-0.090, 0.090]) {
      loc.add(at(cb(0.020, 0.019, 0.030, M.alu, 0.0016), 0.620 + fx, 0.3175, rz * 0.5385));
    }
    loc.add(hose([
      [0.700, 0.334, rz * SEATZ],
      [0.680, 0.330, rz * 0.470],
      [0.664, 0.340, rz * 0.532],
    ], 0.005, M.coolantHot, { ends: 'end' }));
  }
  sys.add(loc);

  /* ══ air handler ════════════════════════════════════════════════════════
     x 0.786..0.986, the firewall envelope this slot has held since
     thermal.js, narrowed to |z| 0.230 because wheels-11's brake master unit
     fills |z| 0.2695 to 0.4050 at y 0.5600 to 0.6835 over x 0.847 to 1.015
     and thermal-9 had to shove its transient throat 12 mm up and 20 mm
     inboard to get past it. The rear
     clamshell half is drawn and the front half is not, which is the
     convention every service manual uses and the only way this part shows
     its work. ══ */
  const ah = lib.part('air-handler', [-0.32, 0.45, 0]);

  ah.add(at(cb(0.200, 0.012, 0.460, M.plastic, 0.0022), 0.886, 0.814, 0));
  ah.add(at(cb(0.200, 0.012, 0.460, M.plastic, 0.0022), 0.886, 0.586, 0));
  /* both end panels carry the molded blower aperture the scroll passes
     through, drawn as the four bars that surround it: a solid end panel
     seals a squirrel cage nobody can then see down the inlet eye */
  for (const [pz, ap] of [[-0.224, 0.120], [0.224, 0.126]]) {
    const bar = (0.216 - ap) / 2, side = (0.200 - ap) / 2;
    ah.add(at(cb(0.200, bar, 0.012, M.plastic, 0.0022), 0.886, 0.700 + (ap + bar) / 2, pz));
    ah.add(at(cb(0.200, bar, 0.012, M.plastic, 0.0022), 0.886, 0.700 - (ap + bar) / 2, pz));
    ah.add(at(cb(side, ap, 0.012, M.plastic, 0.0022), 0.886 - (ap + side) / 2, 0.700, pz));
    ah.add(at(cb(side, ap, 0.012, M.plastic, 0.0022), 0.886 + (ap + side) / 2, 0.700, pz));
  }
  ah.add(at(cb(0.012, 0.216, 0.436, M.plastic, 0.0022), 0.792, 0.700, 0));
  for (const [fy, fz, fh, fd] of [[0.813, 0, 0.014, 0.460], [0.587, 0, 0.014, 0.460],
                                  [0.700, -0.223, 0.226, 0.014], [0.700, 0.223, 0.226, 0.014]]) {
    ah.add(at(cb(0.012, fh, fd, M.plastic, 0.0020), 0.9800, fy, fz));
  }
  /* six clip lugs ON the flange faces, proud in x, which is the direction a
     clip lug is seen from and the direction body-11's cowl beam is not in */
  for (const [ly, lz] of [[0.8130, -0.160], [0.8130, 0], [0.8130, 0.160],
                          [0.5870, -0.160], [0.5870, 0], [0.5870, 0.160]]) {
    ah.add(at(cb(0.014, 0.011, 0.013, M.darkSteel, 0.0012), 0.9800, ly, lz));
  }
  /* stiffening ribs stop at x 0.946: body-11's cowl beam is a 26 mm cage
     tube at (0.99, 0.870, +-0.420) spanning y 0.844 to 0.896 over x 0.964 to
     1.016, and it, not the hood, is the lowest body structure over this
     case. */
  for (const rz of [-0.190, -0.060, 0.070, 0.200]) {
    ah.add(at(cb(0.150, 0.006, 0.010, M.plastic, 0.0012), 0.876, 0.8230, rz));
  }

  /* ventilation blower: 72 m3/h at 4 W on the swept-cabin argument */
  const scrollV = blower(0.058, 0.078, 0.082, 24, M.plasticLt);
  scrollV.position.set(0.886, 0.700, 0.196);
  ah.add(scrollV);
  const inletV = lib.crease(lib.lathe([
    [0.0420, 0.000], [0.0430, 0.008], [0.0466, 0.016], [0.0510, 0.022],
    [0.0550, 0.026], [0.0528, 0.026], [0.0492, 0.019], [0.0458, 0.010],
    [0.0448, 0.000],
  ], M.plasticLt, 14), 34);
  inletV.rotation.x = Math.PI / 2;
  inletV.position.set(0.886, 0.700, 0.237);
  ah.add(inletV);
  const motV = lib.cyl(0.026, 0.020, M.darkSteel, 12);
  motV.rotation.x = Math.PI / 2;
  ah.add(at(motV, 0.886, 0.700, 0.145));
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.5;
    const rib = cb(0.008, 0.044, 0.010, M.plasticLt, 0.0012);
    rib.position.set(0.886 + Math.cos(a) * 0.042, 0.700 + Math.sin(a) * 0.042, 0.151);
    rib.rotation.z = a - Math.PI / 2;
    ah.add(rib);
  }
  ah.add(at(cb(0.020, 0.016, 0.014, M.plastic, 0.0014), 0.906, 0.680, 0.140));
  ah.add(wire([
    [0.906, 0.680, 0.133],
    [0.920, 0.664, 0.118],
    [0.930, 0.630, 0.096],
  ], 0.0028, M.plasticLt));

  /* transient blower: defog at cruise, recirculated pulldown on demand.
     23 m3/h at 4 W on a slot 120 mm shorter than thermal-9's. */
  const scrollT = blower(0.052, 0.072, 0.056, 22, M.plasticLt);
  scrollT.position.set(0.884, 0.700, -0.186);
  ah.add(scrollT);
  const inletT = lib.crease(lib.lathe([
    [0.0390, 0.000], [0.0400, 0.007], [0.0430, 0.014], [0.0468, 0.019],
    [0.0504, 0.023], [0.0486, 0.023], [0.0456, 0.017], [0.0424, 0.009],
    [0.0416, 0.000],
  ], M.plasticLt, 14), 34);
  inletT.rotation.x = -Math.PI / 2;
  inletT.position.set(0.884, 0.700, -0.198);
  ah.add(inletT);
  const motT = lib.cyl(0.024, 0.018, M.darkSteel, 12);
  motT.rotation.x = Math.PI / 2;
  ah.add(at(motT, 0.884, 0.700, -0.148));
  /* the recirculation damper and its SENSED position, because the fails
     argue this damper is a single point of failure */
  ah.add(at(cb(0.052, 0.066, 0.014, M.plasticLt, 0.0022), 0.924, 0.712, -0.222));
  ah.add(at(actuator(0.011, 0.022, M.darkSteel), 0.950, 0.745, -0.222));
  ah.add(wire([
    [0.962, 0.756, -0.222],
    [0.968, 0.768, -0.208],
    [0.958, 0.782, -0.186],
  ], 0.0026, M.plasticLt));

  /* the two coils, instanced so the fin pitch is a coil's rather than a
     mesh-per-plate helper's, with the header tank and tube plate a coil has */
  const dehum = finPack(0.028, 0.150, 0.250, 22, 0.0022, M.alu);
  dehum.position.set(0.844, 0.700, -0.020);
  ah.add(dehum);
  const htr = finPack(0.028, 0.150, 0.250, 22, 0.0022, M.copper);
  htr.position.set(0.926, 0.700, -0.020);
  ah.add(htr);
  for (const [hx, hm] of [[0.844, M.alu], [0.926, M.copper]]) {
    ah.add(at(cb(0.032, 0.016, 0.250, hm, 0.0045), hx, 0.783, -0.020));
    ah.add(endCaps(0.032, 0.016, 0.250, hx, 0.783, M.alu, -0.020));
    ah.add(at(cb(0.032, 0.012, 0.250, hm, 0.0034), hx, 0.619, -0.020));
  }
  ah.add(at(cb(0.120, 0.012, 0.262, M.plasticLt, 0.0018), 0.884, 0.600, -0.020));
  ah.add(at(cb(0.006, 0.140, 0.240, M.plasticLt, 0.0014), 0.884, 0.700, -0.020));

  ah.add(at(cb(0.130, 0.030, 0.190, M.plasticLt, 0.0035), 0.858, 0.832, -0.010));
  for (const dz of [-0.080, 0.090]) {
    ah.add(at(cb(0.066, 0.038, 0.100, M.plasticLt, 0.0035), 0.886, 0.840, dz));
  }
  /* the screen-base slot nozzle, 0.400 m against thermal-9's 0.520 on a
     screen 120 mm narrower, with the end closures and flow-straightening
     vanes a slot jet needs. It stops at x 0.951, 13 mm short of body-11's
     cowl beam at x 0.964. */
  ah.add(at(cb(0.046, 0.020, 0.400, M.plasticLt, 0.0035), 0.928, 0.866, 0));
  ah.add(at(cb(0.014, 0.008, 0.384, M.plastic, 0.0016), 0.946, 0.878, 0));
  for (const es of [-1, 1]) {
    ah.add(at(cb(0.044, 0.019, 0.006, M.plastic, 0.0014), 0.928, 0.866, es * 0.197));
  }
  const vanes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.012, 0.006, 0.0022), M.plastic, 9);
  const vm = new THREE.Matrix4();
  for (let i = 0; i < 9; i++) {
    vm.makeTranslation(0.945, 0.877, (i / 8 - 0.5) * 0.360);
    vanes.setMatrixAt(i, vm);
  }
  vanes.instanceMatrix.needsUpdate = true;
  vanes.castShadow = true; vanes.receiveShadow = true;
  ah.add(vanes);
  /* rail-duct takeoffs to the A-pillar ducts, at |z| 0.180 on a 1.20 m cabin
     rather than thermal-9's 0.245 on an 1.85 m one, each with its damper */
  for (const tz of [-0.180, 0.180]) {
    ah.add(at(cb(0.048, 0.042, 0.048, M.plasticLt, 0.0040), 0.926, 0.815, tz));
    ah.add(at(actuator(0.012, 0.024, M.darkSteel), 0.926, 0.836, tz));
    ah.add(wire([
      [0.940, 0.848, tz],
      [0.948, 0.838, tz * 0.96],
      [0.936, 0.820, tz * 0.88],
    ], 0.0026, M.plasticLt));
    ah.add(tubeOf([
      [0.926, 0.836, tz],
      [0.930, 0.864, tz * 1.05],
      [0.934, 0.892, tz * 1.10],
    ], 0.013, M.plasticLt));
  }
  /* the two water stubs the local loop feeds, and the condensate drain */
  for (const hz of [-0.060, -0.120]) {
    ah.add(at(cb(0.008, 0.026, 0.026, M.castAlu, 0.0018), 0.994, 0.640, hz));
    ah.add(at(xcyl(0.011, 0.026, M.coolantHot, 8), 0.992, 0.640, hz));
  }
  ah.add(at(lib.cyl(0.008, 0.036, M.rubber, 8), 0.886, 0.574, -0.070));
  sys.add(ah);

  /* ══ swept ventilation and recovery core ════════════════════════════════
     1.67 m2 of counterflow membrane in a 190 x 200 x 240 mm block, holding
     y 0.378 to 0.578 to the millimeter because that is what the firewall
     has. ONE extract duct, on the driver side, in body-11's shoulder pocket
     at (y 0.5250, |z| 0.6000), running aft to a plenum on the pan upstand at
     x -0.930. The mirrored pair and the cross-tunnel collector that existed
     to land it are both deleted. ══ */
  const rec = lib.part('recovery-core', [-0.15, 0.10, 0.45]);

  /* the molded frame a core ships in: four corner posts and two end plates,
     with the pack exposed on all four faces */
  /* GEN 13: THE CORE IS OUT OF THE OCCUPANTS. thermal-11 held this block at
     x 0.800 to 0.990, y 0.378 to 0.578, |z| 0.180 to 0.420, "because that is
     what the firewall has", and tools/occupant.sh measured it 63.7 mm inside
     the front occupant's thigh and 69.8 inside the rear occupant's foot on
     every rung from Gen 11. It is the same 1.67 m2 of membrane re-folded to
     150 by 255 by 240 mm, 9.2 liters against 9.1, and it stands in the
     passenger-side pocket behind the A-pillar foot: x 0.785 to 0.935,
     y 0.485 to 0.740, z 0.350 to 0.590. Vertex-swept against every gen13
     partner, nothing else is in that box; the bounds are hv-11's zone drops
     at x 0.941 (the +x face), the flank at |z| 0.600 (the outer face, 10 mm),
     the front occupant's thigh at |z| 0.198 (150 mm inboard of it) and the
     rear occupant's foot at y 0.453 under the rear seat channel (32 mm under
     the -y face). The posts are now 255 mm tall and the media plates run
     in x by z instead of x by z at the old width. */
  /* 145 long in x rather than 150: the rear occupant's shin grazed the aft
     plate by 1.6 mm over 5 pairs on the gate, and a 4 percent denser fold of
     the same membrane is cheaper than moving a knee */
  for (const [px, pz] of [[0.798, 0.358], [0.927, 0.358], [0.798, 0.582], [0.927, 0.582]]) {
    rec.add(at(cb(0.016, 0.255, 0.016, M.plasticLt, 0.0022), px, 0.6125, pz));
  }
  for (const py of [0.491, 0.734]) {
    rec.add(at(cb(0.145, 0.012, 0.240, M.plasticLt, 0.0022), 0.8625, py, 0.470));
  }
  const media = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.125, 0.0018, 0.220), M.white, 20);
  const mm2 = new THREE.Matrix4();
  for (let i = 0; i < 20; i++) {
    mm2.makeTranslation(0.8625 + (i % 2 ? 0.0007 : -0.0007), 0.505 + i * 0.0108, 0.470);
    media.setMatrixAt(i, mm2);
  }
  media.instanceMatrix.needsUpdate = true;
  media.castShadow = true; media.receiveShadow = true;
  rec.add(media);
  /* the differential-pressure tapping pair, on the +x posts in the aperture
     the air-handler clamshell leaves open. It now trends the single extract
     duct as well as the membrane, which the fails call a diagnostic and not
     a redundancy. */
  /* the dP tapping pair on the +x posts, the sensor between them */
  for (const tz of [0.358, 0.582]) {
    rec.add(at(cb(0.014, 0.014, 0.012, M.castAlu, 0.0012), 0.937, 0.560, tz));
  }
  rec.add(at(cb(0.016, 0.022, 0.028, M.sensor, 0.0022), 0.935, 0.610, 0.470));
  for (const tz of [0.358, 0.582]) {
    rec.add(wire([
      [0.939, 0.567, tz], [0.941, 0.586, tz], [0.939, 0.602, 0.470 + (tz - 0.470) * 0.35],
    ], 0.0022, M.plasticLt));
  }
  for (const bz of [0.400, 0.540]) {
    rec.add(at(cb(0.022, 0.026, 0.022, M.steel, 0.0022), 0.8625, 0.753, bz));
    rec.add(at(lib.fastener(0.0036, M.steel, 'hex'), 0.8625, 0.766, bz));
  }
  /* fresh air down from the cowl into the core's top: the cowl intake is
     where thermal-11 put it and the run is 70 mm shorter */
  rec.add(tubeOf([
    [0.928, 0.892, 0.352],
    [0.915, 0.835, 0.362],
    [0.895, 0.775, 0.420],
    [0.882, 0.748, 0.450],
  ], 0.020, M.plasticLt));
  /* tempered supply out of the core's inboard face to the ventilation
     blower inlet, 60 mm away on the same side of the air handler */
  rec.add(tubeOf([
    [0.870, 0.650, 0.352],
    [0.880, 0.654, 0.320],
    [0.888, 0.656, 0.290],
  ], 0.018, M.plasticLt));
  /* the motorized bypass, promoted from fault position to control device: it
     is what makes the mild and hot legs of the sweep read the way they do.
     It stands on the core's top now, facing up: above y 0.740 at this
     station there is 60 mm of air under the door's lower edge. */
  rec.add(at(cb(0.038, 0.046, 0.038, M.darkSteel, 0.0035), 0.905, 0.765, 0.430));
  rec.add(at(aim(actuator(0.014, 0.026, M.darkSteel), 0, 1, 0), 0.905, 0.800, 0.430));
  rec.add(wire([
    [0.905, 0.790, 0.450],
    [0.915, 0.772, 0.456],
    [0.930, 0.760, 0.470],
  ], 0.0026, M.plasticLt));

  /* THE SINGLE EXTRACT DUCT. Out of the core's -z end, down into body-11's
     shoulder pocket, and aft on (y 0.5250, |z| 0.6000) to the plenum at
     x -0.930.

     THE POCKET IS NARROWER IN Y THAN IN Z AND THE Y IS WHAT BINDS. Rayed
     along the whole cabin, the free volume outboard of |z| 0.540 is bounded
     BELOW by hv-11, whose spine, hv-runs and bywire-feeds top out at
     y 0.4820, and ABOVE by body-11's shoulder fairing at 0.5767. That is
     94.7 mm, and a 60 mm duct on 0.5250 leaves 13.0 mm under it and 21.7
     over. In z it spans 0.5850 to 0.6450 and clears the pan upstand's inner
     face at 0.6600 by 15.0 mm. An earlier draft ran it on 0.5050 and put
     200 crossings 25.6 mm inside hv-11's spine. */
  /* GEN 13: THE WHOLE EXTRACT RUN IS MIRRORED TO THE PASSENGER SIDE, because
     the core now stands at the forward end of the passenger-side pocket and
     the duct arrives at its aft face without crossing the car. thermal-11
     ran it in the driver-side pocket and crossed under the dash at y 0.44 to
     0.50 to reach a core on the centerline; from the new core every crossing
     route runs through the driver's thighs, under the rear foot over the
     autonomy ring, or across thermal's own local circuits. The passenger
     pocket is the freer of the two: hv-11's hv-runs and this module's
     glycol loop are both driver-side, and the sweep above the -z pocket's
     floor (hv-11's spine at 0.4820) and under its ceiling (body-13's
     shoulder at 0.5767) reads the same on +z. POCKY and POCKZ are unchanged;
     only the sign of z. */
  rec.add(tubeOf([
    [0.775, 0.535, 0.500],
    [0.750, 0.528, 0.560],
    [0.700, POCKY, 0.590],
    [0.400, POCKY, POCKZ],
    [-0.300, POCKY, POCKZ],
    [-0.880, POCKY, POCKZ],
  ], 0.030, M.plasticLt));
  /* the rolled bead at the core joint and two P clips where the duct crosses
     the pan upstand's own rib line */
  const bead = lib.torus(0.0325, 0.0028, M.plastic, 12, 4);
  bead.rotation.x = Math.PI / 2;
  bead.rotation.z = 1.30;
  rec.add(at(bead, 0.787, 0.537, 0.470));
  for (const cx of [0.180, -0.560]) {
    rec.add(at(pclip(0.030, [1, 0, 0], [0, 1, 0], M.plastic), cx, POCKY, POCKZ));
  }
  /* the extract plenum, bolted to body-11's pan upstand, with the grille on
     its INBOARD face where the cabin can breathe into it. The grille's
     aperture is 70 by 70 mm and interior-11 has to find it: that is the same
     handover thermal-9 made to interior-6 and interior-6 wrote back that it
     has no sill trim to cut. */
  rec.add(at(cb(0.100, 0.066, 0.048, M.plasticLt, 0.0030), -0.930, POCKY, 0.6280));
  for (const ey of [-0.026, 0.026]) {
    /* the ears are 22 mm of z on -0.6470, so their outboard face is 0.6580
       and nothing on this part passes the pan upstand's inner face at
       0.6600. At 26 mm on -0.6480 they stood 1.0 mm inside it, which the
       sweep read as 24 crossings at 0.40 mm. The bolt heads face INBOARD
       for the same reason: a shank drawn outboard from 0.6560 reaches
       0.6584 and there is a panel there. */
    rec.add(at(cb(0.030, 0.010, 0.022, M.plasticLt, 0.0014), -0.930, POCKY + ey, 0.6470));
    rec.add(at(aim(lib.fastener(0.0032, M.steel, 'hex'), 0, 0, -1), -0.930, POCKY + ey, 0.6380));
  }
  /* THE GRILLE DEPTH IS DECLARED, NOT LEFT TO THE DEFAULT. lib.grille builds
     its frame 1.25 barD deep and drops the cross bank 0.75 barD behind the
     bars, so a call passing d and nothing else builds an assembly 1.75 times
     as deep as it asked for. thermal-9 found that the hard way with 19.5 mm
     of cross bank standing inside a partner. barD 0.0160 makes the frame
     exactly 20 mm and crossZ -0.0040 puts the cross bank's back face on the
     frame's. */
  const exGr = lib.grille(0.058, 0.058, 0.0160, M.plastic,
    { bars: 8, cross: 2, barW: 0.0035, barD: 0.0160, crossZ: -0.0040, frame: 0.005 });
  rec.add(at(exGr, -0.930, POCKY, 0.6000));
  sys.add(rec);

  return sys;
}
