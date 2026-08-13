/* Wheels and brakes, Gen 7: the module that unpins the aero.

   Ancestry, cited by name and number throughout:
   wheels.js (Gen 1, 133 kg, 235/50 R19 on forged 19s, Crr 7.2 kg/t),
   wheels-2.js (Gen 2, 96 kg, 185/50 R21 and rear drums, Crr 5.2),
   wheels-3.js (Gen 3, 90 kg, the rear rim becomes the motor rotor carrier
   and the Gen 3 annulus contract is written), wheels-6.js (Gen 5 apex,
   84 kg, one-piece carbon wheels, variable-pitch covers, C/SiC front
   discs, Crr 4.6). This slot skipped Gen 4 and Gen 6, and both ancestors
   say why.

   THE POINT OF THIS MODULE. design/gen6.md's independent aero audit
   rejected body-7's Cd 0.105 in favour of 0.118, and the cause was not the
   surface. body-7's own tail-cone part carries the measurement: the plan
   half-width is 0.9495 at x -1.55 and still 0.948 at x -1.83, so the whole
   0.400 m of closure falls in the last 845 mm at plan half-angles of 21.5,
   21.8 and 33.1 degrees, past the 12 to 15 degree attached limit. The
   haunch is pinned at 0.950 half-width because wheels-6's 185-section tyre
   on a 1.62 m rear track reaches |z| 0.9025 static and, with suspension-4's
   plus or minus 3 degrees of rear steer, |z| 0.9210 swept. Only the track
   releases that pin, and releasing it is this module's job.

   NEW BINDING CONTRACT with drivetrain-7, per design/gen7.md, superseding
   the design/gen3.md annulus that wheels-3 and wheels-6 both carried:
   - rear wheel centres move to (-1.45, 0.355, +-0.74); front unchanged at
     (+-1.45, 0.355, +-0.81);
   - motor annulus r 0.155 to 0.235 spanning world |z| 0.65 to 0.73, left
     VOID by this module;
   - flange face at exactly |z| 0.65, provided here, where drivetrain-7's
     rotor ring bolts on;
   - rear-corner part groups explode z-outward at 0.78, the drive rings a
     further 0.12 outboard at 0.90;
   - SYSTEM.explode is [0, 0, 0].
   js/systems/drivetrain-7.js did not exist when this module was drawn, so
   it was built to the five numbers above and then re-verified against the
   partner when it landed. BOTH SIDES, by sweeping every vertex of both
   built meshes against the relocated wheel centre:
   - wheels-7 puts ZERO vertices in the annulus. Inside the band its rear
     wheel holds radius 0.248 or greater, 13 mm clear of the 0.235 ceiling,
     and the flange bolt heads run |z| 0.6401 to 0.6479, wholly inboard of
     the contract plane.
   - drivetrain-7 fills it: inside the band its rotor rings run r 0.1880 to
     0.2330 over |z| 0.6500 to 0.7280, its stator rings r 0.1552 to 0.1972
     over 0.6500 to 0.7260, and its carrier sleeve r 0.1555 to 0.1680. What
     each of them does inboard of the flange plane is its own business and
     not a contract matter.
   - both land on the flange plane. wheels-7 puts 164 vertices at exactly
     |z| 0.6500 out to r 0.2440; drivetrain-7 puts 1,068 rotor-ring and
     972 stator-ring vertices on the same plane.
   - explode matches exactly: drivetrain-7 rings +-0.900, its corner groups
     +-0.780; wheels-7 rear wheel, tyre and park brake +-0.780, rear cover
     +-0.900 with the rings.
   One thing the contract does not cover and the sweep caught: the shared
   BORE. drivetrain-7 carries a hub spigot at r 0.060 over |z| 0.718 to
   0.732 with five studs on the r 0.048 circle reaching 0.7376, so the rear
   wheel's pilot is drawn as a bore at r 0.0605 to 0.072 seating over the
   spigot, closed by an end web at |z| 0.732 to 0.7376 that those five
   studs pass through, rather than the solid 0.072 disc wheels-6 used.

   Corner-local frame, carried from all four ancestors: origin at the wheel
   centre, z along the axle, s = sign(world z) so +s is outboard. The rear
   frame is the wheels-6 frame translated 70 mm inboard, so a rear world
   |z| maps to (|z| - 0.74) and a front one to (|z| - 0.81). The flange
   face is at local -0.090 in both generations, which is why the corner
   drawing carries and only its position moves.

   Gen 7 preset partners, every cross-module number derived from their
   GEOMETRY per design/retro-gen4.md and design/retro-gen5-apex.md:
   - body-7: swept front envelope |z| 0.9856 at its 14 degree lock, rear
     haunch 0.950 half-width across x -1.45, arch louvers spanning
     |z| 0.9569 to 0.9986, frontal area 2.099 m2 off its own station
     integration, and Cd 0.118 from js/efficiency.js, which carries the
     area as 2.094. All of them are held or improved here, and the one
     that gets WORSE, the rear arch cavity, is priced on the covers panel.
   - suspension-4: its rear geometry is NOT relocated in the shipped file.
     Four numeric fouls against the new corner are enumerated in the
     rear-wheels and park-brake fail entries. This module reports and does
     not edit, per design/gen7.md.
   - hv-4: corner zonal controllers at (1.16, 0.386, +-0.615) front and
     (-1.19, 0.386, +-0.615) rear. Gen 7 lands nothing on them at the
     corner, because the cover actuators are deleted.
   - battery-6/battery-7: floor lid at y 0.31, unchanged clearance.
   - autonomy-4: forward model still schedules pad conditioning.

   Spin rules as ever: corner groups spin about z in drive mode; calipers,
   park-brake backplates and the master unit do not. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'wheels-7',
  name: 'Wheels and brakes · Gen 7 range',
  color: 0xd0d6db,
  explode: [0, 0, 0],
  blurb: 'The corner that lets the body finish its tail. Rear wheel centres move 70 mm inboard to |z| 0.74, which releases the haunch pin that cost body-7 thirteen counts of Cd, and the tyre goes narrow, tall and hard for Crr 3.8 kg/t against wheels-6\'s 4.6. 78 kg, and about 91 miles collected. The honest half: the lateral limit falls from 0.85 g to 0.74, a 100 to 0 stop grows five metres, and the 69 miles of aero this module unpins are NOT collected in Gen 7, because body-7 carries unchanged.',
  /* Mating features other modules have to land on. Schema in SPEC.md;
     tools/check-interfaces.sh proves these against the built mesh. This is
     the female half of the front drive joint: the wheel provides the plane,
     the halfshaft has to arrive on it and stop. */
  interfaces: {
    'front-halfshaft-outboard': {
      kind: 'face', axis: 'z', at: 0.7625, tol: 0.002,
      part: 'front-wheels', mirrored: true,
      note: 'hub face inboard plane, ET47 off a rim centreline at |z| 0.81. The titanium insert ring spans |z| 0.7625 to 0.7825.',
    },
  },
  parts: {
    tires: {
      name: 'Tyres',
      tagline: 'The single least-exploited term on the ladder, spent at last: narrower, taller, harder, and 11 newtons of road load lighter.',
      mass: 28,
      count: 4,
      specs: [
        ['Size', '155/65 R20, load index 95, speed rating H'],
        ['Rolling resistance', '3.8 kg/t installed (wheels-6: 4.6, wheels-3: 5.2)'],
        ['Cold pressure', '4.4 bar (wheels-6: 3.4)'],
        ['Envelope', 'OD 0.7095 m, faces at |z| 0.7325/0.8875 front, 0.6625/0.8175 rear'],
        ['Mass per tyre', '7.0 kg (wheels-6: 8.0), tread depth 5.5 mm new'],
        ['Maturity', 'Production practice; the 4.4 bar casing rating is pilot line'],
      ],
      how: 'The outside diameter was decided before this module opened its file. The wheel centre sits at y 0.355 in design/gen4.md\'s hard-point table, four other modules are dimensioned off it, and a tyre whose crown does not reach the ground is a tyre that floats, so the radius is 0.355 and the OD is 0.710. That freeze is worth arguing with, because a larger tyre genuinely rolls better, so the arithmetic was run: 10 mm more radius raises the whole car 10 mm, which at body-7\'s 1.85 m of width adds about 0.0185 m2 of frontal area, and at the audited Cd 0.118 that is 0.0022 m2 of CdA on a 0.247 base. The rolling gain from 2.8 percent more radius is worth roughly the same. It is a wash that moves a hard point four modules stand on, so the OD stays and everything else changes. 155/65 R20 lands the frozen diameter at 0.7095 m, half a millimetre under, which is a fifth of the tyre\'s own build tolerance. Section width falls 185 to 155, sidewall height rises 92.5 to 100.75 mm, and the rim comes DOWN from 21 inches to 20, reversing a wheels-2 decision on purpose: that module traded sidewall for rolling loss at 185 mm of section and 3.4 bar, where carcass deflection was the problem. At 155 mm and 4.4 bar the deflection is already small, the marginal Crr of 8 mm more sidewall is under half a percent, and the ride debt three generations logged is real.\n\nThe Crr ledger is built from four multipliers and it deliberately underclaims. Tread band 16 percent narrower, and tread is roughly 60 percent of a radial\'s hysteresis, gives 0.903. Pressure 3.4 to 4.4 bar, with Crr scaling near p to the minus 0.4, gives 0.93. Tread depth 7.5 to 5.5 mm on a low-void pattern gives 0.96. A next-generation functionalised-polymer silica compound gives 0.95. The taller sidewall gives 1.004 back. The stack multiplies to 0.769, and wheels-6\'s 4.6 is an installed figure rather than a label, so the modelled result is an installed 3.54. The number carried into js/efficiency.js is 3.8, which is 7 percent worse than the model on purpose. This ladder has measured its own label-to-road gap once already, wheels.js published 6.5 and reported 7.2 installed, and 11 percent applied to 3.54 would land at 3.9. Claiming 3.8 keeps two thirds of that gap as margin instead of booking the model, which is the direction to be wrong in when a whole generation is sized off one coefficient. What it buys is exact. Rolling force is Crr times mass times g, the Gen 7 preset masses 1,404 kg, so 0.0008 of Crr is 11.0 N of road load removed at every speed. That is 4.93 Wh per mile at the wheels, 5.30 out of the pack at drivetrain-6\'s measured 0.945 and battery-6\'s measured 1.016 round trip. Against the generation\'s 105 Wh/mi target on 190 kWh, range goes from 1,723 miles to 1,809: this tyre alone is worth about 86 miles.',
      why: 'design/gen7.md ranks rolling resistance third among the levers and calls it the least exploited on the ladder, and the reason it stayed unexploited is that every previous generation had a second axis to protect. Gen 2 protected the lateral limit and stopped at 5.2. Gen 5 protected body-6\'s arch clearances and froze the envelope, taking 4.6 out of construction alone. Gen 7 has one metric and therefore no excuse: it spends the width, the pressure, the tread depth and the compound in the same direction and takes the grip loss on the chin, because a generation that optimises an outcome has to be willing to be worse at something.',
      fail: [
        'The lateral limit falls from about 0.85 g to about 0.74, a 13 percent loss, because cornering stiffness tracks section width and this tyre gives up 16 percent of it while running a compound chosen for low hysteresis. That is the largest single capability regression anywhere on this ladder, it is not recoverable by software, and stability control can only manage the smaller margin rather than restore it.',
        'Braking is worse and the arithmetic is public. Contact patch area is load over pressure and length is area over width, so 29 percent more pressure against 16 percent less width shortens the patch about 8 percent, and peak mu falls with the compound. At mu 1.05 a 100 km/h stop is 37.5 m; at 0.92 it is 42.7 m. Five metres is a car length and a half, and the wet case is worse still because the rear tyres no longer run in the fronts\' cleared track: the rear axle is 70 mm inboard per side, so on standing water it meets water the front tyre did not move.',
        'Usable tread life is roughly halved in wet-legal terms. 5.5 mm new against 7.5 leaves 3.9 mm above the 1.6 mm legal floor rather than 5.9, so the tyre reaches the end of its wet performance at about two thirds of the distance. Aquaplaning onset itself improves, because the threshold rises with the square root of pressure and 4.4 bar puts it near 133 km/h against 117 at 3.4, so the loss is available grip on a merely wet road, not sudden flotation. The honest summary is that this tyre is safer in deep water and worse in the rain.',
      ],
      explode: [0, 0, 0.85],
    },
    'front-wheels': {
      name: 'Front wheels',
      tagline: 'Unchanged track, unchanged hub plane, and a fairing that has quietly stopped being the limit on steering lock.',
      mass: 11,
      count: 2,
      specs: [
        ['Size', '20 x 5.0J, ET47 off the hub face plane at |z| 0.7625'],
        ['Construction', 'One-piece autoclaved CFRP, co-cured titanium hub insert'],
        ['Mass per wheel', '5.5 kg (wheels-6: 6.0, wheels-3: 7.8, wheels.js: 9.8)'],
        ['Track', '1.62 m, deliberately NOT narrowed with the rear'],
        ['Drop well', '24 mm deep, against the rear wheel\'s 6 mm'],
        ['Maturity', 'Pilot line, carried from wheels-6'],
      ],
      how: 'The construction argument is wheels-6\'s and it is not reopened: barrel, ten integrally woven spokes and hub face laid up as one autoclaved preform over a mandrel with a titanium insert co-cured into the hub face, so there is no bond line to fatigue and no forged spider to carry. What changes is the size of the thing. A 155 section on a 20 inch rim needs a 5.0J barrel where the 185 needed 6J, and one inch less diameter takes the bead seat from r 0.2665 to 0.254. Both are mass at the largest radius on the car: 0.5 kg per wheel, unsprung and rotating, which counts about one and a half times on stop-go work. The front wheel also gets the drop well the rear cannot have. There is no annulus in front of it, so the well floor sits at r 0.230, 24 mm below the bead seat, and the tyre mounts on any machine. The rear wheel\'s well is 6 mm deep for a reason the next panel gives.\n\nThe front track stays at 1.62 m and that is a decision rather than an omission. The pin body-7 measured is at the haunch, over the rear tyre\'s fore and aft extent from x -1.10 to -1.80; nothing forward of the rear door is held open by the front wheels, because at |z| 0.8875 the front tyre already sits 37 mm inside the 0.925 beltline. Declining it is not free, and the bill is far bigger than the beltline suggests, because the beltline is not what this car shows the air down there. Integrate body-7\'s stations the way body-7 does, maximum half-width over all stations at each height: the front pods hold 1.000 to 1.007 from y 0.28 to 0.76 while the flank behind them runs 0.925, so the pods own the frontal projection across the whole lower body and the rear haunch never appears in it at all. Bring the front centres in to |z| 0.74 and the pod collapses onto that flank, worth 0.049 m2 of frontal area, 0.0058 of CdA at the audited Cd 0.118, 0.96 Wh/mi and about 17 miles. Gen 7 declines 17 miles to hold 1.62 m of front track, and it declines them on purpose: this is the axle carrying three quarters of the braking and all of the steering into a generation that has already given away 13 percent of tyre grip, and narrowing both ends is how a range car becomes undriveable one defensible decision at a time.\n\nWhat the narrower tyre hands back for nothing is lock, and the released amount is smaller than a single corner value suggests. body-7 sized its fairing against a 185 tyre whose outer corner sits 0.0925 cos(d) plus 0.355 sin(d) from the wheel centre, |z| 0.9856 at 14 degrees, and it paid a 21.4 m turning circle for it. Run the same expression on a 155: 0.0775 cos(d) plus 0.355 sin(d) does not reach 0.9856 until 16.6 degrees. Swept as a solid rather than as that one corner, against body-7\'s built loft, the fairing skin still clears by 17.5 mm at 17.6 degrees and the binding part is its arch louvers at |z| 0.9569, which touch at 17.25. Contained lock therefore goes 14.0 to 17.2 degrees, which on body-7\'s own conversion is 21.1 m kerb to kerb before rear steer and about 16.9 m after suspension-4\'s 4.2 m of it, against the 21.4 m body-7 published. Released, not delivered: the rack travel and the inner arch were both cut around 14 degrees and neither belongs to this module.',
      why: 'Two of this generation\'s three big moves happen at the rear axle, and the front wheel exists to prove that the third one, the tyre, pays on its own. It is the same wheel wheels-6 built, one size smaller, on a track nobody moved, and it still returns half a kilogram of unsprung rotating mass and hands the next body generation a fairing that no longer has to be that wide. A range generation that only knows how to change things is a generation that will eventually change something it should not have.',
      fail: [
        'A one-piece wheel still has no repairable interface, and the smaller rim makes it worse in one specific way: a 5.0J barrel at 20 inches has less section modulus than the 6J at 21, so the kerb strike that dented the Gen 5 wheel cracks this one. Carbon does not bend and confess, so the tap test and ultrasound at every tyre change carry over from wheels-6 and matter more.',
        'Front and rear wheels are now further apart than they have ever been, not just in construction but in geometry: the front mounts at ET47 on a hub face 47.5 mm inboard of its rim centreline, the rear mounts on a flange 90 mm inboard of its own. They are keyed at the pilot so a rear wheel physically cannot seat on a front hub, which remains the only interlock a hurried shop respects, and the pair now also carries different tyre pressures on the placard for the same size.',
        'The 3.2 degrees of lock the narrower tyre released is not lock this module can deliver. It is stated as a released constraint because the swept solid is measurable against body-7\'s built loft, and the actual turning circle depends on rack travel and inner arch clearance that were both cut around a 14 degree limit. If nobody re-cuts them, the 21.4 m circle simply stands with the reason for it deleted, which is the most annoying kind of leftover.',
      ],
      explode: [0, 0, 1.15],
    },
    'rear-wheels': {
      name: 'Structural rear wheels',
      tagline: 'Seventy millimetres inboard. That is the whole of this generation\'s aero lever, and it is spent here.',
      mass: 12,
      count: 2,
      specs: [
        ['Wheel centre', '(-1.45, 0.355, +-0.74); rear track 1.48 m (was 1.62)'],
        ['Flange face', '|z| 0.65 exactly; drivetrain-7 rotor rings bolt here'],
        ['Motor annulus', 'r 0.155 to 0.235 over |z| 0.65 to 0.73, left void'],
        ['Void margin', 'Zero vertices in the band; r 0.248 or more, 13 mm clear'],
        ['Mass per wheel', '6.0 kg; drop well 6 mm, forced by the annulus'],
        ['Maturity', 'Pilot line; the co-cured titanium flange stays extrapolated'],
      ],
      how: 'The drawing is wheels-6\'s rear wheel translated 70 mm inboard and taken down one rim size, and that is deliberate: the corner-local frame does not change, so the flange face is still at local -0.090 and the annulus still runs local -0.090 to -0.010. Only its position in the car moves. Built to the design/gen7.md contract numbers because drivetrain-7 did not exist yet, then verified against it when it landed, by sweeping every vertex of both built meshes rather than reading either module\'s prose. This module puts zero vertices in the annulus; inside the band its profile holds r 0.248 or greater, 13 mm clear of the 0.235 ceiling, and drivetrain-7 fills what is left with rotor rings at r 0.188 to 0.233 and stator rings at 0.155 to 0.197. Both sides land on the same plane: 164 vertices here at exactly |z| 0.6500 out to r 0.2440, against 1,068 rotor-ring and 972 stator-ring vertices there. Twelve fasteners sit on the r 0.225 bolt circle with heads spanning |z| 0.6401 to 0.6479, wholly inboard of the plane, and a 2 mm titanium ring is co-cured into the face at |z| 0.646 to 0.650 so they bear on metal. The one thing the contract does not describe is the bore, and the sweep found two things in it. drivetrain-7 carries a hub spigot at r 0.060 over |z| 0.718 to 0.732, so this wheel\'s pilot is a bore at r 0.0605 to 0.072 seated over it with half a millimetre of fit, where wheels-6 drew a solid disc that contained its partner\'s stub instead of landing on it. And drivetrain-7 puts five studs on the r 0.048 circle reaching |z| 0.7376, which wheels-6 left holding air on both generations; here the bore is closed by a clamp web at |z| 0.732 to 0.7376 that those studs pass through and five nuts land on, so wheels-6\'s stated load split finally exists in the drawing: the pilot locates and takes the axial clamp, the twelve flange bolts take the torque. The one thing the annulus takes is the drop well. A well floor at r 0.230 would put 6 mm of carbon inside the 0.235 outer radius at |z| 0.722, so the rear well floors at 0.248 and is 6 mm deep against the front\'s 24. The rear tyre is fitted on a machine that supports the bead rather than dropping it, which is a shop-equipment consequence of a motor, and it is the third generation running that the rear corner has had one.\n\nWhat the 70 mm is for. body-7 measured the pin: a 185 tyre at |z| 0.81 reaches 0.9025 static and 0.9210 swept, because suspension-4 steers the rear axle plus or minus 3 degrees and the tread corner sits 0.355 m fore and aft of the axle, so the sweep is 0.355 sin(3 degrees), 18.6 mm. Run the same arithmetic on this corner: 0.74 plus a 0.0775 half-section is 0.8175 static, plus 18.6 mm of sweep is 0.8361, plus body-7\'s own two rear-arch terms, the 8.1 mm it holds at the liner face and the 7.4 mm of liner and skin behind that face, is 0.852. The rear haunch requirement falls from 0.950 half-width to 0.852, 98 mm per side. Then two separate questions, both answered off body-7\'s stations rather than its prose. It does NOT buy frontal area. Integrate the maximum half-width at each height the way body-7 integrates it and the front pods hold 1.000 to 1.007 from y 0.28 to 0.76, so capping the three haunch stations at 0.852 moves the integral by 0.0018 m2 and A goes 2.099 to 2.097. The rear track owns the plan taper; the front pods own the projected area, and this module deliberately did not touch them. What it does buy is the taper. The closure aft of the arch trailing edge at x -1.83 falls from 0.400 m to 0.302 m over the same 845 mm, taking that run from a mean plan half-angle of 25.2 degrees to 19.7, and the 1.38 m ahead of it, where body-7 measures 0.9495 at x -1.55 and still 0.948 at x -1.83, can finally do 73 mm of closure at 3.0 degrees. The residual is stated rather than rounded away: 19.7 degrees is still outside the 12 to 15 degree attached band, so the track alone does not hand body-7 the Cd 0.105 its brief assumed, and the Kamm base has to come in with the haunch. Priced against the ceiling: Cd 0.107 on a frontal area that barely moves is CdA 0.2244 against 0.2477, 3.87 Wh/mi at the pack, about 69 miles. NONE OF IT IS COLLECTED IN GEN 7. design/gen7.md carries body-7 unchanged, so this module pays the grip, the braking and the load-transfer bill now and books the aero for a body that does not exist. body-7\'s own Gen 8 sketch assumed centres at |z| 0.71 and both tracks narrowed, and quoted A near 1.97 and CdA near 0.232; that is its prose, not this geometry, and everything above is re-derived for |z| 0.74 with the front track held, which is why the area line comes out flat where that sketch had it falling.',
      why: 'design/gen6.md deferred the rear track because it propagates into wheels, drivetrain and suspension, and named it the next lever rather than pretending the road ended. This is the module that takes it, and the reason it belongs to wheels rather than to body is causal: the haunch is pinned by where the tyre is, so no surface work of any kind can release it. The uncomfortable part is that the lever and the payoff sit in different generations, which is exactly the situation where a range programme starts quietly overclaiming. The ledger above refuses to, and it closes out loud. Collected: 86 miles from the tyre, and 5 more from the mass, because 6 kg off a 1,404 kg car is 0.10 Wh/mi of rolling and 0.17 of stop-go on js/efficiency.js\'s own cycle, 0.28 in total. Strip both changes back out and this configuration runs 110.58 Wh/mi for 1,718 miles; with both it runs 105 for 1,809. Ninety-one collected, sixty-nine unpinned and unspent.',
      fail: [
        'suspension-4\'s rear geometry is NOT relocated in the shipped file and it now fouls this corner. Measured by sweeping every vertex of its built mesh against the new wheel centre, not read off its prose: its rear-structure part puts 352 vertices INSIDE the motor annulus, spanning radial 0.1775 to 0.2290 over |z| 0.6834 to 0.7240. Two things are in there. The knuckle plate, drawn 0.085 by 0.36 by 0.032 at (-1.45, 0.40, +-0.74), spans |z| 0.724 to 0.756 and reaches radial 0.229, so its inboard 6 mm is in the annulus. And both upper link outer ball joints, at (-1.41, 0.545, +-0.70) and (-1.49, 0.545, +-0.70) with r 0.017 spheres, sit at radial 0.177 to 0.211 at |z| 0.70, wholly inside it. The vertex sweep understates the links: a rod is drawn as a cylinder with vertices only at its ends, and solving the upper-front rod axis at |z| 0.650 puts it at radial 0.187, so each link is continuously inside the band from |z| 0.650 out to the outboard face of its ball joint at 0.717, 67 mm of it, against the 41 mm the vertices report. A fourth item the hand check missed, and it is deeper in than one boss suggests: suspension-4\'s own 48v-feeds part. Its connector boss at (-1.285, 0.36, +-0.70), the one design/gen4.md fixes against hv-4\'s stub, puts 12 vertices at radial 0.1651 to 0.1657, ten millimetres inside the annulus floor; the leads running forward off it put 32 more between the two sides at radial 0.1556 to 0.1988 over |z| 0.6504 to 0.7054, which is most of the way out across the stator. Reported, not edited, per design/gen7.md.',
        'The rear track is now 140 mm narrower than the front, and that costs on the axle least able to pay. Lateral load transfer at an axle goes as one over the track, so a track 8.6 percent narrower takes 9.5 percent more of it for the same roll moment, on the axle that already carries in-wheel unsprung mass and now also carries a tyre with 16 percent less cornering stiffness. Two effects, same direction, same end of the car. Static rollover threshold falls from 1.62 to about 1.55 on the mean track, which is still far above anything with a roof, and the balance shift is toward understeer, which is the safe direction and is not an excuse.',
        'The co-cured titanium flange is still the extrapolated claim, unchanged from wheels-6 and now carrying a bolt circle 70 mm closer to the car\'s centreline where the link loads that reach it are different. What must become true: a titanium-to-CFRP co-cure holding bolt preload through a design life of drive-to-regen torque reversals at hub temperature and salt exposure, with no delamination signature. Rigs show it, fleets close it, and until then the joint is inspected at every tyre change.',
      ],
      explode: [0, 0, 0.78],
    },
    covers: {
      name: 'Full-face covers',
      tagline: 'One cover part number for all four corners, the first time since Gen 1, because a range drivetrain finally stopped needing a fan.',
      mass: 6,
      count: 4,
      specs: [
        ['Type', 'Full-face CFRP disc, flush to the tyre section, no moving parts'],
        ['Extent', 'r 0.048 inlet bore to r 0.312, seated on the rim flange lip'],
        ['Mass', '1.5 kg each (wheels-6: 2.3 rear, 1.2 front)'],
        ['Deleted', '12 pivots, pitch ring, 48 V ring motor, inductive coupler, wax capsule'],
        ['Brake air', 'Fixed 6 mm annular exhaust slot at r 0.312, disc-pumped'],
        ['Maturity', 'Production practice'],
      ],
      how: 'wheels-3 turned the aero cover into the wheel motor\'s cooling fan and disclosed the bill in Cd. wheels-6 put the blades on pivots so the fan could be switched off, and paid a kilogram of unsprung mass per rear corner plus twelve pivots, a ring motor, an inductive hub coupler and a wax fail-safe for the privilege. Gen 7 deletes the whole mechanism, and the reason is not aerodynamic taste, it is that the customer moved. design/gen7.md takes drivetrain-7 from 480 kW to about 260 and optimises it for part-load efficiency at cruise, and pairs it with a pack that accepts a much lower C rate. A corner that makes a fraction of the heat does not need a variable fan, and the honest way to spend that is to stop carrying the fan. What replaces it is a genuinely full cover: a shallow CFRP dish from a r 0.048 inlet bore out to r 0.312, seated all the way round on the rim flange lip at r 0.2665 and then flaring outboard so its edge stands 1.5 mm proud of the tyre\'s section maximum. That closes the annular gutter between rim flange and tyre shoulder that every previous cover on this ladder left open, and it does it at all four corners identically, which is the first time since wheels.js that this module has had one cover part number.\n\nThe front brake still needs air, and it needs more of it than it used to, so the flow path is rebuilt around parts that were going to exist anyway. body-7\'s active arch louvers already open on a brake-temperature model. Air enters there, passes the gap between the cover\'s inlet bore and the upright, and is pumped outward by the front disc itself, which on the next panel becomes internally vented with 36 curved vanes in 24 mm of passage. A 365 mm vented disc at 747 rpm, which is 100 km/h on this tyre, moves on the order of 250 m3/h, against the 110 m3/h peak wheels-6\'s twelve blades could reach and the 60 m3/h wheels-3 managed at 60 km/h. It leaves through a 6 mm annular slot between the cover\'s outer edge at r 0.312 and the tyre shoulder, 0.0118 m2 of exit into the wheel\'s own low-pressure region. The pumping work is comparable to the 80 W wheels-3 paid, but it is now internal to the wheel rather than a 0.002 Cd penalty on the external flow. The aero arithmetic, and the reason this panel books nothing: the full cover is worth about 0.0015 Cd against wheels-6\'s shut-vane cover, 0.0032 m2 of CdA, 0.52 Wh/mi, about 9 miles. Against it, the rear arch is now a cavity. body-7 audited that arch against the swept solid of a 185 tyre and held 8.1 mm at the liner face, with the liner face 7.4 mm inside a loft running 0.938 to 0.950 half-width across the rear axle station. This generation pulls the tyre face from |z| 0.9025 back to 0.8175 and does not move the aperture, so the recess behind an unchanged hole goes from 28 mm to 113 mm. One to two counts is the honest range for a cavity like that, which is the same order as the cover gain. THIS MODULE THEREFORE BOOKS ZERO AERO MILES FOR GEN 7 and names the fix: the arch closeout belongs to the body, and it arrives with the same generation that spends the 69 miles of tail closure.',
      why: 'Three generations of this cover have been an argument about how much drag to spend on cooling, and each one answered by making the mechanism cleverer. The range generation gets to answer differently, because the thing being cooled shrank: 260 kW of low-iron-loss motor and a low C-rate pack simply do not need a corner fan, so the correct move is subtraction. Deleting a mechanism from inside a wheel deletes an entire failure class, a kilogram of unsprung mass per rear corner, an inductive power and command channel across a rotating joint that was the module\'s pilot-line risk item, and a service procedure. The cooling that is still needed moved into the disc, which had to grow anyway.',
      fail: [
        'The front brake\'s air supply is now scheduled by a louvre this module does not own. body-7 opens its arch louvers on a brake-temperature model, and if that model is wrong, late, or the louvre is fouled, the disc pumps whatever is in front of it and nothing announces the shortfall the way hv-4 announced a seized blade. wheels-6 could at least command its own cover; this one has a fixed geometry and a neighbour\'s schedule.',
        'A full cover is a full cover in a kerb strike too. wheels-6\'s blades could be individually replaced and its bezel seated inside the rim mouth; this dish stands proud of the tyre section at its outer edge, which is the first thing a kerb touches, and a cracked cover is a whole cover. It is also 312 mm of unsupported radius retained only at its bezel ring, so the resonance case at motorway wheel speeds is a real design item and the honest note is that it is closed on a rig rather than by a fleet.',
        'The rear cover rides the 0.90 explode vector rather than the corner\'s 0.78, matching drivetrain-7\'s rotor rings, exactly as wheels-3 and wheels-6 both disclosed. Static clearance from the ring\'s outboard face at |z| 0.730 to the cover\'s inboard surface at about 0.807 is 77 mm, and at 0.78 against the ring\'s 0.90 that clearance would go 43 mm negative during the sweep. The real-world echo is unchanged: the cover cannot come off with the motor ring in place, so a cover service is a corner service.',
      ],
      explode: [0, 0, 1.45],
    },
    discs: {
      name: 'Front brake discs',
      tagline: 'The one part on this car that had to get bigger, because a range drivetrain has less regen to lend it.',
      mass: 10,
      count: 2,
      specs: [
        ['Size', '365 x 40 mm vented C/SiC (wheels-6: 365 x 34 solid)'],
        ['Why not larger', 'suspension-4\'s upper ball joint is 3.5 mm outside r 0.1825'],
        ['Continuous case', '13.8 kW per disc on a 10% grade at 60 km/h laden'],
        ['Single stop', '1.39 MJ at 160 km/h; about 0.52 MJ per disc'],
        ['Internal vanes', '36 curved vanes in 24 mm of passage, about 250 m3/h at 100 km/h'],
        ['Maturity', 'Production practice'],
      ],
      how: 'Everything else in this module got smaller and this did not, and the reason is a second-order consequence of the range mandate that lands squarely on the brakes. design/gen7.md takes drivetrain-7 from 480 kW to about 260 and lowers the pack\'s power-to-energy ratio deliberately, which is correct for miles and worse for descents: the sizing case has always been an alpine grade on a full pack where regeneration has nowhere to send the energy, and this generation arrives at that case with more energy on board, more mass, and less motor. Run it. Laden at 1,804 kg on a 10 percent grade at 60 km/h, gravity delivers 29.4 kW; rolling takes 1.1 and aero 0.7 at the new Crr and body-7\'s CdA, so 27.6 kW reaches the friction brakes, and with the rear axle a park-and-rescue device that is 13.8 kW per front disc against wheels-6\'s 11.0. The single stop barely moves: 1,404 kg from 160 km/h is 1.39 MJ, about 0.52 per disc after load transfer. It is the continuous case that grew 25 percent.\n\nThe disc could not answer with diameter, and the reason is worth stating because it is a carried-hardware constraint rather than a choice. wheels-6 measured suspension-4\'s upper ball joint at radial 0.210 with a 0.024 sphere, inner edge 0.186, clearing its 365 mm ring by 3.5 mm. Growing to 380 mm puts the ring at r 0.190 and takes that 3.5 mm to minus 4. So the extra capacity comes from thickness, which is the less efficient purchase: 34 mm to 40, ring mass 4.5 kg to 5.0, and the six millimetres are not padding, they are the vane passage. The ring becomes two 8 mm friction plates with 36 curved vanes in 24 mm between them, spanning |z| 0.669 to 0.709 at r 0.145 to 0.1825, and that turns the disc into the corner\'s air pump: about 250 m3/h at 747 rpm, drawn from body-7\'s arch louver through the cover\'s inlet bore and thrown out through the slot at the cover edge. Thermal mass rises to roughly 4,000 J/K, so the descent runs the ring near 650 to 700 C where wheels-6 held 550 to 600. C/SiC is comfortable there and grey iron would not be, which is the whole reason the material change happened a generation early.',
      why: 'A range generation that only reported the things that got better would have quietly shipped a brake that was 25 percent short on the one case that sizes it. The chain is worth following because it is the shape of every honest outcome optimisation: peak power costs mass and iron loss, so the drivetrain gives it up for miles, and the moment it does, the friction brake inherits the descent it used to share. The cost lands two modules away from the decision, and the ledger only closes if somebody carries it across.',
      fail: [
        'Cold bite is still C/SiC\'s weakness and this generation makes the daily case worse rather than better. A more efficient drivetrain and a heavier pack mean regeneration covers even more of normal braking, so friction stops are rarer, the disc is colder more often, and the low-mu dip on the first hard stop after weeks of regen is deeper than any predecessor. The pre-fill and pad conditioning on the master unit are the compensation, and they are software standing in for a materials property.',
        'The vanes are a new failure surface in a part that had none. A solid ring could only wear; a vented one can pack with brake dust and road salt until the passage is a fraction of its area, and the symptom is not a noise, it is a disc that runs 150 degrees hotter on the descent it was sized for. Passage inspection joins the mass-loss check at service, and neither is something an owner will do.',
        'The six millimetres of extra thickness were spent inboard, and that is the direction with the pack in it. Swept against battery-7\'s built floor lid, this disc\'s nearest point is its inboard ceramic face band at (1.290, 0.303, 0.665) and the lid\'s front outboard corner is 2.0 mm away, a rotating C/SiC face that runs 650 to 700 C on the descent this part is sized for, next to static pack structure. The condition is inherited rather than created: wheels-6 measured 2.2 mm at the same corner, so the 6 mm bought 0.2 of it, and the reason it is not worse is that the lid steps away at x 1.290 rather than any clearance work done here. It is reported on this panel because this is the module that made the disc thicker.',
        'Sizing this disc to a 13.8 kW continuous case computed from an unbuilt partner is the weakest number in this module. drivetrain-7 did not exist when this was written, so 260 kW and the low C-rate pack come from design/gen7.md rather than from geometry, and if the delivered drivetrain keeps more regen authority on a full pack, this disc is 6 mm thicker and 1 kg heavier per corner than it needed to be. That is the correct direction to be wrong in, and it is still being wrong.',
      ],
      explode: [0, 0, 0.45],
    },
    calipers: {
      name: 'Front calipers',
      tagline: 'For the first time the caliper is not the limit and the tyre is, and the design margin stays anyway.',
      mass: 6,
      count: 2,
      specs: [
        ['Type', 'Fixed monobloc, 6 x 32 mm pistons, carried from wheels-6'],
        ['Clamp force', '38 kN per side at 160 bar'],
        ['Torque available', '4.36 kNm per corner against the 1.36 a 0.74 g tyre takes'],
        ['Straddle', 'Rebuilt for a 40 mm ring: halves at |z| 0.6535 and 0.7245'],
        ['Mount', 'Two-lug forged bracket onto suspension-4\'s carried front upright'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The casting is wheels-6\'s and the construction argument is Gen 2\'s: one forging machined into a fixed monobloc so hard-stop fluid volume becomes clamp force instead of bridge flex, six 32 mm pistons in three pairs so a long pad cannot taper, titanium piston crowns conducting at 22 W/mK rather than steel\'s 50 to keep C/SiC backplate heat out of the fluid, and rollback seals pulling the pads 0.1 mm clear so a brake used a twentieth of the time is not rubbing the rest of its life. Two things changed around it. The ring grew 6 mm in thickness, so the two halves move apart: the inboard half now sits centred at |z| 0.6535 and the outboard at 0.7245, each straddling the friction faces at 0.669 and 0.709 with a 0.5 mm pad gap, and the bridge crosses outside r 0.1825 at |z| 0.689. The pads grow in area to suit the thicker ring and the higher continuous flux, which is where the caliper\'s mass stays flat despite nothing else being added.\n\nThe more interesting change is that this caliper is now demonstrably oversized, and the module keeps it anyway. Peak deceleration is set by the tyre, and the tyre gave up 13 percent of its limit this generation, so the brake torque the front axle can actually use fell with it, and the gap is not marginal. Two clamps of 38 kN on a 164 mm pad mean radius at a C/SiC pad mu of 0.35 is 4.36 kNm per corner. A 0.74 g stop on 1,404 kg is 10.2 kN at the road, about three quarters of it at the front once transfer has finished, which is 1.36 kNm per front corner. The caliper delivers a little over three times what the tyre will accept before ABS intervenes, and wheels-6 sized it against a 0.85 g tyre on a 1,363 kg car that took 1.51. The temptation is a smaller caliper and a kilogram of unsprung mass. It is refused for the reason wheels-3 and wheels-6 both gave and this generation strengthens: these two calipers are the entire hydraulic system of the vehicle, one pressure block, two lines, twelve pistons, not a millilitre of fluid anywhere else, and the certification argument about stopping a car with every electron gone runs through this component pair alone. Peak torque is not what sizes it. Fade-free clamp after months of disuse, at the end of a descent, with a rear axle that contributes under 8 percent, is what sizes it, and none of those cases got easier.',
      why: 'The honest reading of an oversized caliper on a low-grip tyre is that the margin migrated rather than disappeared. wheels-6 sized this caliper against a tyre that could use all of it; Gen 7 keeps the hardware and lets the surplus sit on the side of the failure case rather than the performance case, which is what a car with no cost ceiling should do when the alternative is a kilogram. Where that argument would be dishonest is if the module then claimed the kilogram, so it does not: the mass ledger carries 6 kg here, unchanged from wheels-6, and the saving this module reports comes from tyres, wheels and covers.',
      fail: [
        'Two calipers means two single points, unchanged since Gen 2, and the rear axle now offers even less behind the mistake than it did in Gen 5 because the tyre behind it grips less too. The dual-circuit block and honest inspection remain the whole defence.',
        'The bracket lands on suspension-4\'s carried FRONT upright, which this generation does not move, so the wheels-6 clearance measurements stand: lugs at |z| 0.716 to 0.719, outboard of the ring face at 0.709, pad on the upright inboard face at 0.724, and 14 mm and 11 mm from the upper ball joint sphere. That is the one corner of this module where nothing had to be re-derived, and it is worth flagging that it is also the corner nobody re-measured.',
        'C/SiC pad dust is abrasive rather than merely dirty, and the pads got bigger, so piston seal and dust-boot life shorten again. The seal interval is now comfortably shorter than the pad interval, which is an inversion most workshops will get wrong at least once.',
      ],
      explode: [-0.3, 0, 0.2],
    },
    'park-brake': {
      name: 'Park-and-rescue brakes',
      tagline: 'The one device on the car whose duty did not change when the track moved, re-measured anyway.',
      mass: 2,
      count: 2,
      specs: [
        ['Type', '180 x 22 mm simplex inside the motor ring bore'],
        ['Hold required', '902 Nm per corner at 30% grade laden (1,804 kg)'],
        ['Hold available', '1,080 Nm from a 6 kN dry spindle at r 0.090'],
        ['Statutory case', '557 Nm at the 18% grade type approval asks for'],
        ['Position', 'Inside the annulus bore: r to 0.100 at the backplate, |z| 0.596 to 0.732'],
        ['Maturity', 'Production practice'],
      ],
      how: 'wheels-6 stopped sizing this device for a service contribution it does not make and sized it for the one thing it is alone in being able to do, which is hold a parked car with the high-voltage system dead. Gen 7 re-runs that arithmetic on the new numbers rather than carrying the answer. The preset masses 1,404 kg and payload takes it to about 1,804 laden. On a 30 percent grade gravity pulls 1,804 times 9.81 times sin(arctan 0.30), which is 5,084 N down the slope, and this axle is the only axle holding it, so each corner resists 2,542 N. At the 0.355 m tyre radius that is 902 Nm. A simplex drum roughly doubles what its spindle applies, so 902 Nm at the 90 mm band radius asks 5.0 kN and the dry spindle is specified at 6, giving 1,080 Nm and a fifth of margin. Type approval asks only for an 18 percent grade, 557 Nm, and sizing for 30 remains deliberate because a parking brake gets no second chance. Note what did not enter that calculation: the track. Holding torque is a function of mass, grade and tyre radius, and none of the three moved, so the only change here is mass: the Gen 7 preset is 41 kg heavier than the Gen 5 one wheels-6 sized against, and 1,763 kg laden becoming 1,804 takes 882 Nm to 902. Twenty newton-metres, on 1,080 available.\n\nThe packaging is where the relocation shows. The whole device translates 70 mm inboard with the corner and keeps its corner-local geometry exactly: the rotating carrier necks from r 0.090 down onto the wheel\'s hub pilot at r 0.072, spanning |z| 0.658 to 0.732, and the static half bolts its central boss to the hub bearing housing at |z| 0.6395, its outboard face landing exactly on that housing\'s inboard face at 0.6475. The backplate centres on 0.6315 at r 0.100, the shoes on 0.682, and the gearmotor on 0.616 reaching inboard to 0.596. Every one of those radii is inside 0.155, so the device lives in the annulus BORE and the contract band stays void, which is the same relationship wheels-3 wrote and wheels-6 verified, on a new plane. Actuation is still dry: a gearmotor and a spindle with no fluid anywhere, which is why the entire hydraulic system of this car fits at the front axle.',
      why: 'The temptation to delete a device that contributes under 8 percent of a dead-vehicle stop grows every generation, and it is wrong every generation for the reason wheels-3 gave: the law requires a car with every electron gone to hold and to stop, and the law is right. What this generation adds is a demonstration that a relocation is not a redesign. The corner-local frame carried, the duty is set by physics that did not move, and re-deriving the number rather than copying it is what turned up the one thing that did change, which is twenty newton-metres of laden mass.',
      fail: [
        'The bore this device lives in is now crowded, and the second half of the suspension-4 report belongs here rather than on the wheel. Sweeping its built mesh against the relocated centre: rear-structure reaches radial 0.147 across |z| 0.6834 to 0.758, so the knuckle plate and hub boss straddle the new wheel centre plane and overlap this module\'s rotating hub pilot (r 0.072, |z| 0.730 to 0.756) by about 26 mm of axial length, static metal inside a turning wheel. The rear-steer tie rod runs radial 0.088 over |z| 0.6923 to 0.7177, through the shoes. The rear damper\'s lower end reaches radial 0.1546 over |z| 0.6301 to 0.6598, and the rear air spring reaches |z| 0.658 at radial 0.133 or less, eight millimetres outboard of the new flange plane and therefore on this module\'s side of it. None of these breach the annulus contract, all of them are in the volume the drum, its backplate and drivetrain-7\'s hub bearing share. Reported, not edited. The fix is one translation: the whole rear knuckle, link set, tie rod and damper foot move 70 mm inboard with the corner, and every clearance returns to the wheels-6 value it had, because this module moved the frame rather than changing it.',
        'It is still the least inspectable friction device on the vehicle, inside a motor inside a wheel, and it is now 70 mm deeper into the car. Shoe condition is inferred from the gearmotor current signature on hv-4\'s telemetry, and the self-adjusting spindle that could jam in Gen 2 can still jam here behind more hardware than ever.',
        'Two full applies from 20 km/h and it needs minutes to cool, unchanged and by disclosure. What did change is what stands behind it: the front tyre that has to make up the difference in a dead-HV stop gives up 13 percent of its limit this generation, so the fallback deceleration on the master unit panel is worse than wheels-6\'s, and this device covers no more of the gap than it ever did.',
      ],
      explode: [0, 0, 0.78],
    },
    'master-unit': {
      name: 'Brake-by-wire unit',
      tagline: 'The Gen 2 box on its fifth posting, and the first generation where the number it reports got worse.',
      mass: 3,
      specs: [
        ['Architecture', 'One-box dry unit, front hydraulics only, carried from wheels-2'],
        ['Pressure build', '0 to 180 bar in 120 ms (carried)'],
        ['Actuators arbitrated', 'Two calipers, two wheel motors, two park brakes'],
        ['Fallback', 'No push-through: motors plus park brakes, about 0.33 g'],
        ['Aft harness', 'Re-landed at the relocated gearmotors, (-1.494, 0.287, +-0.616)'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The hardware is carried whole from wheels-2 through wheels-3 and wheels-6: a dry pedal unit with a spring and elastomer simulator, dual ECUs on separate supplies, a ball-screw plunger block feeding two front calipers, and no push-through rod. Five generations have found nothing to improve in it. What this generation changes is arithmetic and routing. The two aft harnesses that carry park-brake commands and the brake-priority arbitration line have to follow the corner inboard, so they now terminate inside the gearmotor bores at (-1.494, 0.287, +-0.616) rather than wheels-6\'s +-0.678, and the last 300 mm of each run is re-drawn to approach from inboard and below rather than crossing the annulus. The forward pair is untouched, landing in the caliper fittings at (1.286, 0.484, +-0.691), because the front corner did not move.\n\nThe number that got worse is the fallback, and it is stated rather than rounded. With hydraulics gone, the car stops on wheel motors and two park-brake drums, and every term in that sum moved the wrong way this generation: the tyre gives up 13 percent of its peak, drivetrain-7 gives up about 46 percent of its peak power and therefore its short-duration braking torque, and the drum is unchanged. wheels-6 published 0.38 g. This configuration is about 0.33. That is a 13 percent longer stop in the worst case the certification file describes, bought in exchange for miles, and the correct thing to do with it is print it on the panel next to the range figure. The pad conditioning duty carries over unchanged: when autonomy-4\'s forward model predicts a hard stop, a few newtons of pad drag lift the C/SiC face into its friction window beforehand, metered at about 0.17 Wh per event and logged, because an unaudited comfort feature is how range quietly disappears.',
      why: 'A control box that outlives five generations of the hardware it commands is the strongest argument a part can make, and the reason it survives is that it was designed around an interface rather than around a car. What Gen 7 asks of it is new only in kind: for the first time this module has to report a safety number that regressed, and the box is where that number lives. Publishing 0.33 g against 0.38 is not a confession, it is the mechanism by which an outcome-optimised generation stays honest, because the alternative is a range figure with no denominator.',
      fail: [
        'The arbitration line is still the single point it was in Gen 3, a disagreement between braking and vectoring settled by a 2 millisecond priority rule that has to be right every time, now with less friction reserve behind the mistake than any previous generation.',
        'The 0.33 g fallback is computed against a drivetrain that does not exist yet. If drivetrain-7 lands with more short-duration braking torque than its 260 kW continuous rating suggests, this number is pessimistic; if it lands with rim-side inverters derated at low speed, it is optimistic. It is published as an estimate with its inputs named, and the certification file needs the delivered part before it can be closed.',
        'The independence case spans this unit, drivetrain-7\'s vectoring coordinator and two rim-side inverters, three codebases on dissimilar hardware arguing that they cannot fail together. It was the hardest argument to close in Gen 2 and every generation since has widened the set of common-mode failures it has to rule out, including this one, which moved two of the four corners.',
      ],
      explode: [0.5, 0.35, 0],
    },
  },
};

/* ── Geometry ──
   Corner-local frame carried from wheels.js through wheels-6.js: origin at
   the wheel centre, z along the axle, s = sign(world z) so +s is outboard.
   The ONE change this generation makes to the frame is where the rear
   origin sits: REARZ 0.74 instead of 0.81. Every rear profile below is
   therefore the wheels-6 profile at one rim size down, and world |z| maps
   to a lathe axial offset of (|z| - REARZ) at the rear and (|z| - P.wheelZ)
   at the front.

   Key world planes, rear corner:
     0.6315  park-brake backplate, static
     0.6401  flange bolt heads, inboard face
     0.6500  CONTRACT flange face, drivetrain-7 rotor rings bolt here
     0.6625  tyre inner face
     0.7300  outboard edge of the CONTRACT annulus
     0.7400  wheel centre plane
     0.8175  tyre outer face (was 0.9025 on wheels-6)
     0.8190  cover outer lip

   Key world planes, front corner (unchanged from wheels-6):
     0.6690  disc friction ring, inboard face (was 0.675 at 34 mm)
     0.7090  disc friction ring, outboard face
     0.7325  tyre inner face
     0.7625  hub face plane
     0.8875  tyre outer face (was 0.9025)
     0.8890  cover outer lip */

const REARZ = 0.74;              // rear wheel centre |z|, the Gen 7 move
const TSEG = 48;                 // tyre lathe segments
const RSEG = 40;                 // rim lathe segments
const BEAD = 0.2540;             // 20 inch bead seat radius
const FLANGE = 0.2665;           // rim flange lip radius

/* Rotate a Y-axis mesh so its axis runs along z. */
function zc(mesh) { mesh.rotation.x = Math.PI / 2; return mesh; }

/* Lathe in the corner-local frame: profile is [radius, axialOffset] pairs
   in increasing axial order, where axialOffset = |z| - (corner centre). */
function zlathe(profile, s, mat, seg) {
  const m = lib.lathe(profile.map(([r, a]) => [r, s * a]), mat, seg);
  m.rotation.x = Math.PI / 2;
  return m;
}

/* ── Tyres ──
   155/65 R20. Section maxima at local +-0.0775 (155 mm section), bead
   seats at +-0.0635 (5.0J), crown flat across +-0.058 for a 116 mm tread
   band, crown radius P.tireR so the tyre reaches the ground rather than
   hovering above it. The front group explodes at 0.85, the wheels-6
   ladder; the rear group at 0.78, the design/gen7.md contract. Same part
   id, different group vectors, and the two are not the same number on
   purpose. */
function tirePart(s, rear) {
  const g = lib.part('tires', [0, 0, s * (rear ? 0.78 : 0.85)]);
  const casing = zlathe([
    [BEAD,   -0.0635],
    [0.2790, -0.0700],
    [0.3040, -0.0755],
    [0.3180, -0.0775],   /* section max, inner face */
    [0.3340, -0.0740],
    [0.3470, -0.0660],
    [P.tireR, -0.0580],
    [P.tireR,  0.0580],
    [0.3470,  0.0660],
    [0.3340,  0.0740],
    [0.3180,  0.0775],   /* section max, outer face */
    [0.3040,  0.0755],
    [0.2790,  0.0700],
    [BEAD,    0.0635],
  ], s, M.rubber, TSEG);
  g.add(casing);
  /* two shallow circumferential ribs: a 5.5 mm low-void pattern, because
     void volume is hysteresis and this generation cannot afford any */
  for (const az of [-0.026, 0.026]) {
    const rib = lib.torus(0.3555, 0.0028, M.rubber, TSEG, 6);
    rib.position.z = s * az;
    g.add(rib);
  }
  return g;
}

/* ── Front wheel ──
   One-piece CFRP at 20 x 5.0J: barrel, ten integral spokes, hub face with
   the co-cured titanium insert. The hub face inboard plane sits at
   |z| 0.7625, the front CV joint face this ladder has used since wheels-6,
   which puts the offset at ET47 measured from the rim centreline. The well
   floors at r 0.230, 24 mm deep, because no annulus stands in front of it. */
function frontWheelPart(s) {
  const g = lib.part('front-wheels', [0, 0, s * 1.15]);

  const barrel = zlathe([
    [FLANGE, -0.0700],
    [BEAD,   -0.0635],
    [BEAD,   -0.0300],
    [0.2300, -0.0180],   /* drop well, 24 mm */
    [0.2300,  0.0180],
    [BEAD,    0.0300],
    [BEAD,    0.0635],
    [FLANGE,  0.0700],
  ], s, M.carbon, RSEG);
  g.add(barrel);

  /* hub face: titanium insert ring, inboard face on the CV joint plane */
  const hubFace = zc(lib.cyl(0.074, 0.020, M.steel, 24));
  hubFace.position.z = s * -0.0375;
  g.add(hubFace);

  /* ten integral spokes, inner ends on the hub face, tips in the well */
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const sp = lib.box(0.024, 0.170, 0.021, M.carbon);
    sp.position.set(Math.cos(a) * 0.1600, Math.sin(a) * 0.1600, s * -0.030);
    sp.rotation.z = a - Math.PI / 2;
    g.add(sp);
  }

  const nuts = lib.bolts(5, 0.046, 0.008, M.steel);
  nuts.rotation.x = Math.PI / 2;
  nuts.position.z = s * -0.0225;
  g.add(nuts);

  return g;
}

/* ── Rear wheel ──
   The wheels-6 rear wheel translated 70 mm inboard and taken to 20 inches.
   The lathe leaves the NEW CONTRACT annulus void: over |z| 0.65 to 0.73
   (axial -0.090 to -0.010) the profile radius is 0.248 or greater
   everywhere except the flange face itself, which lies exactly on the
   |z| 0.65 boundary plane. That 0.248 is the reason the rear drop well is
   6 mm deep where the front's is 24: a 0.230 floor would put carbon 5 mm
   inside the 0.235 annulus outer radius at |z| 0.722. */
function rearWheelPart(s) {
  const g = lib.part('rear-wheels', [0, 0, s * 0.78]);

  const shell = zlathe([
    [0.1500, -0.0900],   /* flange inner edge, CONTRACT face plane |z| 0.650 */
    [0.2440, -0.0900],   /* flange face annulus, still on |z| 0.650 */
    [0.2540, -0.0855],   /* fillet: from here out the profile clears r 0.235 */
    [0.2620, -0.0790],
    [FLANGE, -0.0700],   /* inboard bead flange lip */
    [BEAD,   -0.0635],   /* inboard bead seat */
    [BEAD,   -0.0300],
    [0.2480, -0.0180],   /* shallow drop well, forced by the annulus */
    [0.2480,  0.0180],
    [BEAD,    0.0300],
    [BEAD,    0.0635],
    [FLANGE,  0.0700],
  ], s, M.carbon, RSEG);
  g.add(shell);

  /* co-cured titanium flange insert, 2 mm, just inboard of the face plane
     (|z| 0.646 to 0.650) so the bolt heads bear on metal */
  const insert = zlathe([
    [0.1500, -0.0940],
    [0.2440, -0.0940],
    [0.2440, -0.0900],
    [0.1500, -0.0900],
    [0.1500, -0.0940],
  ], s, M.steel, RSEG);
  g.add(insert);

  /* twelve flange bolts on the r 0.225 circle drivetrain-7's nuts share,
     heads at |z| 0.6401 to 0.6479 so each seats into the titanium insert
     and every one of them stays inboard of the 0.650 contract plane */
  const flangeBolts = lib.bolts(12, 0.225, 0.0065, M.steel);
  flangeBolts.rotation.x = Math.PI / 2;
  flangeBolts.position.z = s * -0.0960;
  g.add(flangeBolts);

  /* hub pilot, outboard of the annulus at |z| 0.730 to 0.756. Drawn as a
     BORE rather than a disc: drivetrain-7's hub bearing carries its spigot
     at r 0.060 over |z| 0.718 to 0.732, measured off its build code, so
     this ring runs r 0.0605 to 0.072 and seats over it with half a
     millimetre of fit clearance. wheels-6 drew a solid 0.072 cylinder
     here, which contained drivetrain-6's stub instead of landing on it.
     This is also the feature suspension-4's un-relocated upright now sits
     inside; see the park-brake fail entry. */
  const pilot = zlathe([
    [0.0605, -0.010],
    [0.0720, -0.010],
    [0.0720,  0.016],
    [0.0605,  0.016],
    [0.0605, -0.010],
  ], s, M.steel, 24);
  g.add(pilot);

  /* clamp web closing the bore just outboard of the spigot, |z| 0.732 to
     0.7376, r 0.040 to 0.0605. Its inboard face lands on the spigot's
     outboard face and drivetrain-7's five studs (r 0.048, reaching 0.7376)
     pass straight through it, so the pilot takes the axial clamp the way
     wheels-6's load split described and the studs stop holding air. */
  const clampWeb = zlathe([
    [0.0400, -0.008],
    [0.0605, -0.008],
    [0.0605, -0.0024],
    [0.0400, -0.0024],
    [0.0400, -0.008],
  ], s, M.steel, 24);
  g.add(clampWeb);

  /* centre web: ten spokes, pilot to drop well, outboard of the annulus.
     0.180 long on a 0.160 centre radius so the inner ends bury into the
     pilot wall at 0.072 and the tips bury into the well floor at 0.248;
     at 0.166 on 0.156 they stopped 9 mm short of the floor. */
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const sp = lib.box(0.022, 0.180, 0.020, M.carbon);
    sp.position.set(Math.cos(a) * 0.1600, Math.sin(a) * 0.1600, s * 0.008);
    sp.rotation.z = a - Math.PI / 2;
    g.add(sp);
  }

  /* five nuts seated on the clamp web's outboard face, on the r 0.048
     circle drivetrain-7's studs use, |z| 0.7376 to 0.7472 */
  const nuts = lib.bolts(5, 0.048, 0.008, M.steel);
  nuts.rotation.x = Math.PI / 2;
  nuts.position.z = s * 0.0024;
  g.add(nuts);

  return g;
}

/* ── Covers ──
   One part for all four corners. A shallow CFRP dish from a r 0.048 inlet
   bore out to r 0.312, SEATED on the rim flange lip at r 0.2665 / local
   0.0700 (the last point of both barrel profiles, so the cover is carried
   by the wheel rather than hanging in its mouth) and then flaring outboard
   so its edge stands 1.5 mm proud of the tyre section maximum. The 6 mm
   gap from that edge to the tyre shoulder is the brake exhaust slot.
   Front groups ride 1.45, the wheels-6 ladder; the REAR rides 0.90, the
   drivetrain-7 ring vector, for the reason wheels-3 and wheels-6 both
   disclosed: at the corner's own 0.78 the ring's extra 0.12 would carry it
   through this face. */
function coverPart(s, rear) {
  const g = lib.part('covers', [0, 0, s * (rear ? 0.90 : 1.45)]);

  const face = zlathe([
    [0.0480, 0.0640],   /* inlet bore lip */
    [0.1000, 0.0668],
    [0.1800, 0.0688],
    [FLANGE, 0.0700],   /* seats on the rim flange lip */
    [0.2850, 0.0760],
    [0.3060, 0.0785],
    [0.3120, 0.0790],   /* outer lip, 6 mm from the tyre shoulder */
  ], s, M.carbon, RSEG);
  g.add(face);

  /* bayonet retaining ring, sitting in the rim flange gutter: the cover's
     only attachment, all the way round */
  const ring = lib.torus(0.2660, 0.0055, M.alu, RSEG, 8);
  ring.position.z = s * 0.0690;
  g.add(ring);

  /* inlet bore lip stiffener */
  const bore = lib.torus(0.0490, 0.0040, M.plasticLt, 24, 8);
  bore.position.z = s * 0.0640;
  g.add(bore);

  return g;
}

/* ── Front discs ──
   365 x 40 mm INTERNALLY VENTED C/SiC. Two 8 mm friction plates at
   |z| 0.669 to 0.677 and 0.701 to 0.709, with 36 curved vanes in the
   24 mm between them at r 0.145 to 0.1825. The ring could not grow in
   diameter: suspension-4's carried upper ball joint (centre radial 0.210,
   sphere r 0.024, inner edge 0.186) clears r 0.1825 by 3.5 mm and would be
   4 mm inside a 380 mm ring. The lower joint (outer edge radial 0.144)
   still clears the ring bore at 0.145 by 1.0 mm, which is why the hat is a
   deep top hat: the web turns in on the ring's inboard face at |z| 0.669
   and the bell runs out at r 0.090 to the hub face plane at 0.7625. */
function discPart(s) {
  const g = lib.part('discs', [0, 0, s * 0.45]);

  for (const [a0, a1] of [[-0.141, -0.133], [-0.109, -0.101]]) {
    const plate = zlathe([
      [0.1450, a0],
      [0.1825, a0],
      [0.1825, a1],
      [0.1450, a1],
      [0.1450, a0],
    ], s, M.darkSteel, RSEG);
    g.add(plate);
    /* ceramic face band so the C/SiC reads as ceramic, not iron */
    const face = lib.torus(0.164, 0.0055, M.plasticLt, RSEG, 8);
    face.position.z = s * (a0 === -0.141 ? a0 : a1);
    g.add(face);
  }

  /* 36 curved internal vanes: the corner's air pump, drawing from the hat
     bore and throwing outward into the rim well */
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const v = lib.box(0.006, 0.0370, 0.024, M.darkSteel);
    v.position.set(Math.cos(a) * 0.1640, Math.sin(a) * 0.1640, s * -0.121);
    v.rotation.z = a - Math.PI / 2 + 0.30;
    g.add(v);
  }

  const hat = zlathe([
    [0.1450, -0.1410],  /* web on the ring's inboard face, |z| 0.669 */
    [0.0900, -0.1410],
    [0.0900, -0.0600],  /* bell around the upright hub boss, r 0.054 */
    [0.0820, -0.0520],
    [0.0780, -0.0475],  /* bolts to the wheel hub face at |z| 0.7625 */
  ], s, M.alu, RSEG);
  g.add(hat);

  return g;
}

/* ── Front calipers ──
   Fixed monobloc at 160 degrees, straddling the 40 mm ring with a 0.5 mm
   pad gap each side: halves centred at |z| 0.6535 and 0.7245, bridge
   outside r 0.1825 at |z| 0.689, six piston crowns landing on the friction
   faces at 0.669 and 0.709. Bracketed back to a pad on the inboard face of
   suspension-4's carried FRONT upright at |z| 0.724. Static: never
   rotates. Lower edge at y 0.346, clear of the battery lid at 0.31. */
function caliperPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('calipers', [-0.3, 0, s * 0.2]);

  const CA = Math.PI * (160 / 180);
  const cx = x + Math.cos(CA) * 0.175;
  const cy = P.wheelY + Math.sin(CA) * 0.175;

  for (const az of [-0.1565, -0.0855]) {
    const half = lib.box(0.090, 0.130, 0.030, M.caliper);
    half.position.set(cx, cy, s * (P.wheelZ + az));
    g.add(half);
  }

  const bridge = lib.box(0.030, 0.100, 0.120, M.caliper);
  bridge.position.set(x + Math.cos(CA) * 0.203, P.wheelY + Math.sin(CA) * 0.203, s * 0.689);
  bridge.rotation.z = CA;
  g.add(bridge);

  /* six pistons, three a side, crowns on the friction faces at |z| 0.669
     and 0.709, centred at radial 0.162 with +-0.038 of tangential spread
     so every crown stays inside the r 0.145 to 0.1825 band and the mean
     radius works out at the 0.164 the content claims */
  const px = x + Math.cos(CA) * 0.162;
  const py = P.wheelY + Math.sin(CA) * 0.162;
  for (const az of [-0.147, -0.095]) {
    for (const t of [-0.038, 0, 0.038]) {
      const p = zc(lib.cyl(0.016, 0.012, M.steel, 12));
      p.position.set(
        px + Math.cos(CA + Math.PI / 2) * t,
        py + Math.sin(CA + Math.PI / 2) * t,
        s * (P.wheelZ + az)
      );
      g.add(p);
    }
  }

  /* two-lug bracket back to the upright, |z| 0.716 to 0.719, outboard of
     the ring face at 0.709 and landing on the upright's inboard face at
     0.724 inside its x [1.4075, 1.4925] and y [0.22, 0.58] footprint */
  g.add(lib.tube([
    [cx + 0.008, cy + 0.055, s * 0.716],
    [1.360, 0.487, s * 0.7165],
    [1.425, 0.528, s * 0.7175],
  ], 0.010, M.castAlu));
  g.add(lib.tube([
    [cx + 0.008, cy - 0.050, s * 0.716],
    [1.360, 0.445, s * 0.7165],
    [1.425, 0.488, s * 0.7175],
  ], 0.010, M.castAlu));
  const pad = lib.box(0.024, 0.070, 0.014, M.castAlu);
  pad.position.set(1.428, 0.498, s * 0.717);
  g.add(pad);

  /* brake line crossover boss spanning |z| 0.6525 to 0.7275 so it seats
     into the top of BOTH halves; the master unit terminates in its bore */
  const fitting = zc(lib.cyl(0.008, 0.075, M.steel, 10));
  fitting.position.set(cx, cy + 0.070, s * 0.690);
  g.add(fitting);
  const sense = lib.box(0.014, 0.012, 0.010, M.sensor);
  sense.position.set(cx - 0.030, cy - 0.063, s * 0.668);
  g.add(sense);

  return g;
}

/* ── Park brake, rotating half ──
   180 mm band on a carrier that necks down onto the wheel's hub pilot at
   r 0.072, |z| 0.732, and sweeps inboard to 0.658. Everything sits at
   r 0.072 to 0.094: inside the CONTRACT annulus inner radius of 0.155 and
   outside drivetrain-7's hub housing at r 0.072. */
function parkDrumPart(s) {
  const g = lib.part('park-brake', [0, 0, s * 0.78]);

  const carrier = zlathe([
    [0.0900, -0.0820],
    [0.0900, -0.0340],
    [0.0800, -0.0180],
    [0.0720, -0.0080],   /* lands on the wheel's hub pilot wall */
  ], s, M.castAlu, 32);
  g.add(carrier);

  const lip = lib.torus(0.090, 0.004, M.castAlu, 32, 8);
  lip.position.z = s * -0.082;
  g.add(lip);

  return g;
}

/* ── Park brake, static half ──
   Backplate, two shoes, the dry gearmotor and spindle, all carried from
   wheels-6 in the corner-local frame and therefore all 70 mm further
   inboard in the car. Central boss at r 0.066, backplate at r 0.100, shoe
   web threading r 0.073 to 0.089, shoes phased to 1.214 and 4.356 radians
   so the arms miss a five-spoke hub carrier. World planes: boss 0.6395,
   plate 0.6315, shoes 0.682, gearmotor 0.616. */
function parkBackPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('park-brake', [0, 0, s * 0.78]);
  g.position.set(x, P.wheelY, z);

  const boss = zc(lib.cyl(0.066, 0.016, M.darkSteel, 20));
  boss.position.z = s * -0.1005;
  g.add(boss);

  const plate = zc(lib.cyl(0.100, 0.007, M.darkSteel, 32));
  plate.position.z = s * -0.1085;
  g.add(plate);

  for (const a of [1.214, 4.356]) {
    const shoe = lib.mesh(
      new THREE.TorusGeometry(0.081, 0.008, 8, 16, Math.PI * 0.72),
      M.steel
    );
    shoe.rotation.z = a;
    shoe.scale.z = 1.375;          /* 16 mm web drawn to the 22 mm band width */
    shoe.position.z = s * -0.058;
    g.add(shoe);
    const arm = lib.box(0.012, 0.020, 0.046, M.darkSteel);
    arm.position.set(Math.cos(a + 0.36) * 0.078, Math.sin(a + 0.36) * 0.078, s * -0.082);
    arm.rotation.z = a + 0.36;
    g.add(arm);
  }

  const motor = zc(lib.cyl(0.015, 0.040, M.plastic, 14));
  motor.position.set(-0.044, -0.068, s * -0.124);
  g.add(motor);
  const spindle = zc(lib.cyl(0.005, 0.050, M.steel, 8));
  spindle.position.set(-0.044, -0.068, s * -0.084);
  g.add(spindle);

  return g;
}

/* ── Brake-by-wire unit ──
   Carried placement from wheels-2 through wheels-6. The forward hydraulic
   pair is untouched and terminates inside the caliper fittings at
   (1.286, 0.484, +-0.691), because the front corner did not move. The two
   aft harnesses follow the rear corner inboard and terminate inside the
   relocated gearmotor bores at (-1.494, 0.287, +-0.616), approaching from
   inboard and below rather than crossing the annulus. */
function masterUnitPart() {
  const g = lib.part('master-unit', [0.5, 0.35, 0]);

  const body = lib.box(0.11, 0.10, 0.11, M.plastic);
  body.position.set(0.95, 0.62, -0.35);
  g.add(body);

  const block = lib.box(0.07, 0.08, 0.06, M.castAlu);
  block.position.set(1.02, 0.60, -0.32);
  g.add(block);

  const motor = lib.cyl(0.032, 0.06, M.steel, 18);
  motor.rotation.z = Math.PI / 2;
  motor.position.set(1.085, 0.60, -0.32);
  g.add(motor);

  const reservoir = lib.box(0.05, 0.035, 0.05, M.plasticLt);
  reservoir.position.set(1.02, 0.655, -0.32);
  g.add(reservoir);

  const ecu = lib.box(0.09, 0.08, 0.012, M.pcb);
  ecu.position.set(0.95, 0.62, -0.288);
  g.add(ecu);

  const conduit = lib.cyl(0.006, 0.05, M.plastic, 10);
  conduit.rotation.z = Math.PI / 2;
  conduit.position.set(0.872, 0.595, -0.35);
  g.add(conduit);

  g.add(lib.tube([
    [1.05, 0.63, -0.34],
    [1.10, 0.60, -0.46],
    [1.18, 0.545, -0.58],
    [1.25, 0.505, -0.66],
    [1.286, 0.484, -0.691],
  ], 0.004, M.steel));
  g.add(lib.tube([
    [1.05, 0.63, -0.30],
    [1.10, 0.62, -0.05],
    [1.14, 0.60, 0.30],
    [1.22, 0.545, 0.56],
    [1.27, 0.505, 0.64],
    [1.286, 0.484, 0.691],
  ], 0.004, M.steel));

  /* aft harnesses: park-brake commands plus the brake-priority arbitration
     line to drivetrain-7's vectoring coordinator, re-landed 62 mm inboard.
     The duck-in moved 250 mm FORWARD of the wheels-6 route and that is not
     cosmetic. A point 224 mm ahead of the rear axle at hub height is at
     radial 0.224 from the wheel centre, inside the r 0.155 to 0.235 band,
     so with the annulus now reaching inboard to |z| 0.65 the wheels-6 line
     at |z| 0.70 would have passed straight through the motor. It clears
     |z| 0.650 by x -1.07, where it is 0.375 out from the axle. */
  g.add(lib.tube([
    [0.92, 0.57, -0.38],
    [0.70, 0.42, -0.55],
    [0.30, 0.345, -0.74],
    [-0.55, 0.345, -0.74],
    [-0.90, 0.346, -0.715],
    [-1.10, 0.336, -0.638],
    [-1.30, 0.312, -0.626],
    [-1.45, 0.292, -0.620],
    [-1.494, 0.287, -0.616],
  ], 0.0035, M.plastic));
  g.add(lib.tube([
    [0.92, 0.57, -0.32],
    [0.70, 0.45, 0.00],
    [0.40, 0.36, 0.55],
    [0.10, 0.345, 0.74],
    [-0.55, 0.345, 0.74],
    [-0.90, 0.346, 0.715],
    [-1.10, 0.336, 0.638],
    [-1.30, 0.312, 0.626],
    [-1.45, 0.292, 0.620],
    [-1.494, 0.287, 0.616],
  ], 0.0035, M.plastic));

  return g;
}

export function build() {
  const sys = new THREE.Group();

  /* THE GEN 7 MOVE, in one table: the front corners stay on P.wheelZ and
     the rear corners come in to REARZ. */
  const corners = [
    [P.axleF, P.wheelZ],
    [P.axleF, -P.wheelZ],
    [P.axleR, REARZ],
    [P.axleR, -REARZ],
  ];

  for (const [x, z] of corners) {
    const front = x > 0;
    const s = Math.sign(z);

    /* everything that turns with the wheel, centred on its own origin */
    const spinG = new THREE.Group();
    spinG.position.set(x, P.wheelY, z);
    lib.spin(spinG, 'z', 30);
    spinG.add(tirePart(s, !front), coverPart(s, !front));
    if (front) {
      spinG.add(frontWheelPart(s), discPart(s));
    } else {
      spinG.add(rearWheelPart(s), parkDrumPart(s));
    }
    sys.add(spinG);

    /* static halves: calipers grip at the front, park backplates carry
       shoes at the rear. The cover exciters wheels-6 needed are deleted
       with the mechanism they powered. */
    sys.add(front ? caliperPart(x, z) : parkBackPart(x, z));
  }

  sys.add(masterUnitPart());
  return sys;
}
