/* Wheels and brakes, Gen 5 apex. NAMING: the id and file use the -6 suffix
   because the -5 ids belong to the demoted value study; the user-facing
   label says Gen 5 (see design/gen5-apex.md, design/backfill-1.md).

   Ancestry: wheels.js (Gen 1, 133 kg, four iron discs and forged 19s),
   wheels-2.js (Gen 2, 96 kg, carbon-hybrid 21s and rear drums),
   wheels-3.js (Gen 3, 90 kg, the rear rim becomes the motor rotor carrier).
   This slot SKIPPED Gen 4 on purpose and the content says why.

   BINDING interface contract with drivetrain-6, carried VERBATIM from
   design/gen3.md and re-verified numerically against
   js/systems/drivetrain-6.js this generation:
   - at each rear corner the motor annulus, radius 0.155 to 0.235 spanning
     world |z| 0.72 to 0.80, is left VOID by this module;
   - the rear wheel provides the flange face at exactly |z| = 0.72, where
     drivetrain-6's rotor ring bolts on (its own flange ring occupies
     |z| 0.722 to 0.730 and its twelve nuts sit on the same r 0.225 bolt
     circle used here);
   - rear-corner part groups explode z-outward at magnitude 0.85, the
     drive rings at 0.97, and SYSTEM.explode is [0, 0, 0], matching
     drivetrain-6 and wheels-3 so the shared corner stays level.
   The one deliberate exception, carried from wheels-3 and re-derived here:
   the rear cover also rides at 0.97. The rotor ring's outboard face sits
   at |z| 0.798 and the cover's inboard blade face at 0.846, a 48 mm static
   clearance; at 0.85 against the ring's 0.97 the ring would end 72 mm past
   the blade face at full explode. Matched vectors preserve the clearance
   at every slider position.

   Gen 5 preset partners, reconciled from their GEOMETRY per
   design/retro-gen5-apex.md:
   - drivetrain-6: contract above. Its hub bearing exposes a rotating stud
     flange (r 0.060, |z| 0.788 to 0.802) with five studs to |z| 0.808.
     wheels-3 left that flange carrying nothing; the Gen 5 rear wheel lands
     a hub pilot on it at |z| 0.800, so the wheel is located by metal
     instead of by assumption.
   - suspension-4: its carried upright (body x +-0.0425 of the axle,
     y 0.22 to 0.58, |z| 0.724 to 0.756; boss r 0.054) is the mount for the
     front caliper bracket, which wheels-3 did not have, and for the rear
     corner's static hardware.
   - body-6: its arch clearances were audited against a 185-section tire
     with faces at |z| 0.9025 and 0.7175 (19 mm at the skirted rear arch,
     8 mm at the front louvers), and its sealed floor drains roughly
     110 m3/h per rear arch. Both numbers are held here: the apex tire
     keeps the section and the OD, and 110 m3/h becomes the PEAK the vanes
     reach rather than the constant Gen 3 always paid.
   - thermal-6: the rear stator jackets ride its long glycol loop out
     inside drivetrain-6's service-loop bundle. The cover vanes handle the
     rotor, drum and brake share that liquid cannot reach.
   - hv-4: every actuator here rides the 48 V zonal bus. The front corner
     boxes sit at (1.16, 0.386, +-0.615) and the rear at
     (-1.19, 0.386, +-0.615); the cover exciter leads land on them.

   Spin rules as ever: corner groups spin about z in drive mode; calipers,
   park-brake backplates, cover exciters and the master unit do not. */

import * as THREE from '../../vendor/three.module.js';
import { M, lib, P } from '../common.js';

export const SYSTEM = {
  id: 'wheels-6',
  name: 'Wheels and brakes · Gen 5 apex',
  color: 0xd0d6db,
  explode: [0, 0, 0],
  blurb: 'Gen 3 made the rear rim a motor part and left three joints in it. Gen 5 deletes them: one-piece carbon wheels with no bond line and no spider, covers whose vanes change pitch so the cooling fan can be switched off, carbon-ceramic front discs that end a three-generation rust schedule, and a rear friction brake shrunk to the hold the law actually asks for. 84 kg against Gen 3\'s 90, and 2.5 kg out of every front corner\'s unsprung mass.',
  parts: {
    tires: {
      name: 'Tires',
      tagline: 'The envelope is frozen by body-6\'s arch audit, so the apex tire spends everything it has inside the same 185 millimeters.',
      mass: 32,
      count: 4,
      specs: [
        ['Size', '185/50 R21 XL, load index 98, speed rating Y'],
        ['Envelope', 'Frozen: faces at |z| 0.9025 and 0.7175, OD 0.71 m'],
        ['Rolling resistance', '4.6 kg/t installed (wheels-3: 5.2)'],
        ['Construction', 'Single-ply aramid-hybrid carcass, steel-free belt'],
        ['Mass per tire', '8.0 kg including a 0.3 kg sealant and foam liner'],
        ['Maturity', 'Production practice; the steel-free belt is pilot line'],
      ],
      how: 'The first decision was made by a neighbor, not by this module. body-6 audited its arches against the wheels-3 tire and wrote the numbers down: static faces at |z| 0.9025 and 0.7175, an outside diameter of 0.71 m, 19 mm of clearance at the skirted rear arch once suspension-4 swings the tread corners through plus or minus 3 degrees of rear steer, and 8 mm at the front arch louvers through full lock and full bump. A wider apex tire would spend those margins and force a body regeneration to buy back what it took. So the envelope is frozen, and the re-specification goes entirely into what is inside it. The carcass becomes a single aramid-hybrid ply where Gen 2 and Gen 3 ran two, the steel belt package is replaced by a high-modulus aramid and carbon hybrid that weighs less and, more usefully, damps better, and the tread runs a functionalized-polymer silica compound whose hysteresis at the 8 to 12 Hz band a rolling tire actually works in is roughly a fifth lower than the Gen 2 compound this family has carried since 2. Installed rolling resistance falls from 5.2 kg/t to 4.6.\n\nThat 0.6 kg/t is worth putting a number on, because it is the largest single efficiency item in this module. The Gen 5 preset weighs 1,363 kg, which is design/gen5-apex.md\'s 1,369 less the six this module returns, so 0.0006 of rolling resistance coefficient is 8.0 N of drag: 8.0 kJ per kilometer at the wheels, about 2.3 Wh/km out of the pack against a 90 Wh/km budget. Nothing else here comes close. The mass ledger is smaller and less flattering: 8.25 kg per tire becomes 8.0, and 0.3 kg of that saving is immediately spent again on a puncture sealant and cavity-noise foam liner, which returns the 3 dB Gen 1 bought and then lost, and which matters more now because an in-wheel motor excites the cavity resonance from inside the rim instead of through a bushing. The speed rating moves to Y, not because the car is faster but because a rear tire that is also a magnet-ring carrier should have its casing qualified above every duty it will ever see rather than at it.',
      why: 'Three generations of this module have argued that the tire is where the physics lives, and the apex generation is the one that has to accept a constraint it did not set. body-6 spent its clearances on a shape that is worth 0.130 of drag, and taking them back for a wider contact patch would be a trade between two neighbors with the same owner. Freezing the envelope and rebuilding the casing inside it is the honest move: it buys 2.3 Wh/km without asking anyone else to give anything up.',
      fail: [
        'The ride bill compounds again, exactly as wheels-3 predicted. A stiffer single-ply carcass at 3.4 bar passes sharp inputs almost straight through, and suspension-4\'s active dampers answer road inputs below about 25 Hz. Above that the tire sidewall is the only spring in the system, and at the rear it is protecting a 1.0 mm airgap.',
        'A steel-free belt has a shorter fleet history than anything else in this module and its repair rules are different: a plug that is routine in a steel-belted casing is not qualified here, so a rear puncture is a tire replacement rather than a repair, and the sealant liner exists to make that a scheduled event rather than a roadside one.',
        'The apex compound trades wet grip for hysteresis at the margins. The lateral limit holds near 0.85 g dry, stability control still covers the gap, and the honest sentence is that a tire optimized this hard for rolling loss is a tire that gives up something in standing water, which is why the hydroplaning threshold is a published number rather than a footnote.',
      ],
      explode: [0, 0, 0.85],
    },
    'front-wheels': {
      name: 'Front wheels',
      tagline: 'Gen 2 shipped a bonded joint with an open fatigue question and Gen 3 said it was better bounded, not closed. Gen 5 deletes the joint.',
      mass: 12,
      count: 2,
      specs: [
        ['Size', '21 x 6J, offset ET40, carried from wheels-2'],
        ['Construction', 'One-piece autoclaved CFRP, co-cured titanium hub insert'],
        ['Mass per wheel', '6.0 kg (wheels-3: 7.8, wheels.js: 9.8)'],
        ['Deleted', 'Forged spider, adhesive bond line, ten titanium bolts'],
        ['Thermal', 'Ceramic barrier coat on the inner face for C/SiC radiance'],
        ['Maturity', 'Pilot line'],
      ],
      how: 'Gen 2 built this wheel out of two materials doing two jobs: a CFRP barrel taking hoop tension and bending, a forged 6061 spider taking bolt clamp, bearing loads and curb strikes, and a structural adhesive with ten titanium bolts holding them together through a glass isolation ply. It was the right answer for Gen 2 and it shipped with one open item, adhesive fatigue at 300,000 km, which Gen 3 could only report as better bounded after a generation of fleet data. An unbounded fatigue question is not something an apex car should carry, and there is exactly one way to close it: remove the joint. This wheel is a single autoclaved preform. The barrel, ten integrally woven spokes and the hub face are laid up as one part over a mandrel and cured together, with a titanium insert co-cured into the hub face so the bearing surface, the pilot bore and the wheel-nut seats are metal against metal.\n\nThe mass falls from 7.8 kg to 6.0, and the arithmetic is worth seeing because it is not a materials story. The forged spider was the single heaviest element in the Gen 2 wheel; deleting it and letting continuous fiber run from the hub face into the barrel is where 1.5 of the 1.8 kg comes from, with the bond line, the bolt set and the isolation ply making up the rest. That 1.8 kg per wheel is unsprung and rotating, so it is worth roughly twice its own mass in ride terms and it is the biggest single line in the front corner\'s ledger: 25.25 kg of unsprung hardware per front corner in Gen 3 becomes 22.7, a 10% cut, at the exact axle where suspension-4\'s active dampers have the least authority because the front wheels also steer. The inner face carries a thin ceramic thermal barrier coating, which is new and is not decoration: the carbon-ceramic disc behind it runs several hundred degrees hotter than the iron it replaces and radiates it at a polymer matrix from 60 mm away.',
      why: 'Every generation of this wheel has been an argument about where to put the joint. Gen 1 forged one piece of aluminum and paid 9.8 kg for the simplicity. Gen 2 split the wheel by material and bought 2 kg with a bonded interface it could not fully qualify. Gen 5 gets the mass of the split wheel and the joint count of the forged one, which is what unlimited resources are actually for: not a cleverer joint, an autoclave program and a tool set that make the joint unnecessary.',
      fail: [
        'A one-piece wheel has no repairable interface at all. Gen 3 already said barrel damage is scrap and invisible from outside; now hub-face damage is scrap too, and the tap test and ultrasound at service cover the whole part rather than a bond line.',
        'Carbon creeps under sustained clamp load and aluminum does not, so a lug nut torqued into polymer loses preload over years. The co-cured titanium insert exists for that reason and moves the risk rather than deleting it: the new watch item is the titanium-to-CFRP co-cure itself, inspected by tap test at every tire change and instrumented with load-indicating washers under the nuts.',
        'Front and rear wheels remain different constructions with different service rules, a hazard wheels-3 flagged and this generation makes worse, because they now look identical through a cover. The parts are keyed at the pilot so a rear wheel physically will not seat on a front hub, which is the only kind of interlock a hurried shop respects.',
      ],
      explode: [0, 0, 1.15],
    },
    'rear-wheels': {
      name: 'Structural rear wheels',
      tagline: 'Gen 3 hung the whole wheel on one flange and left drivetrain-3\'s hub studs carrying nothing. This wheel finally uses them.',
      mass: 13,
      count: 2,
      specs: [
        ['Construction', 'One-piece CFRP, co-cured titanium flange insert'],
        ['Flange face', '|z| 0.72 m exactly; drivetrain-6 rotor rings bolt here'],
        ['Motor annulus', 'r 0.155 to 0.235 m over |z| 0.72 to 0.80, left void'],
        ['Hub pilot', 'On drivetrain-6\'s stud flange at |z| 0.80, new this generation'],
        ['Flange runout', '0.10 mm total (wheels-3: 0.15)'],
        ['Maturity', 'Pilot line; the co-cured titanium flange is extrapolated'],
      ],
      how: 'The contract with drivetrain-6 is the Gen 3 contract, unchanged and re-verified against its build code rather than its prose: the motor annulus from radius 0.155 to 0.235 over world |z| 0.72 to 0.80 stays void, the flange face sits at exactly |z| 0.72, and twelve fasteners on the r 0.225 bolt circle meet drivetrain-6\'s twelve nuts on the same circle. Everything else about this wheel changed. wheels-3 needed a forged 6061 flange and sleeve to manage thermal growth between a CFRP barrel and a steel-backed magnet ring; this wheel is one carbon part with a 2 mm titanium ring co-cured into the flange face, because titanium expands at 8.6 parts per million per degree against aluminum\'s 23 and the rotor carrier\'s 11, so the bolted joint stays loaded across the whole thermal range with a fraction of the metal. The forged sleeve is gone and 0.5 kg with it, taking the wheel from 7.0 kg to 6.5.\n\nThe more interesting change is a hole in the Gen 3 design that only geometry reveals. drivetrain-3 and drivetrain-6 both provide a rotating stud flange on the hub bearing, radius 0.060 at |z| 0.788 to 0.802 with five studs reaching 0.808, and the wheels-3 rim connected to none of it: the entire wheel, tire and rotor ring hung off one bolted flange 80 mm inboard, and the studs held air. This wheel closes the loop with a center web, ten spokes running from a hub pilot at |z| 0.800 out to the barrel at |z| 0.808 to 0.828, clear of the annulus by 8 mm. The load split is deliberate so the two interfaces do not fight: the center pilot locates and takes the axial clamp, the outer flange takes the torque, and machining both features in one setup on the wheel\'s own pilot is what lets flange runout tighten from 0.15 mm to 0.10. That reclaimed 0.05 mm goes straight back into the 1.0 mm airgap budget drivetrain-6 keeps, alongside the 0.05 mm its ceramic bearings released.',
      why: 'The rear wheel gains a whole center section and still comes out 0.5 kg lighter than the wheel that did not have one, which is the compact version of the argument for one-piece construction. But the real reason this part exists is that wheels-3\'s rear wheel was located by one flange and a hope. A wheel that carries a magnet ring across a one millimeter gap should be positioned by two features with a defined division of duty, and the hardware to do it was already bolted to the car, unused, for two generations.\n\nThis is also the panel that has to say where in-wheel still costs, because the rear corner is where this module\'s ledger stops being flattering. Adding up what hangs outboard of the springs: this module puts 17.8 kg at each rear corner, tire 8.0, wheel 6.5, cover 2.3, park brake 1.0, against wheels-3\'s 18.05, and drivetrain-6 reports its own in-wheel adder down about 1.5 kg to roughly 26.5. So the rear corner carries about 44.3 kg unsprung where the front carries 22.7, and a generation of one-piece carbon, a smaller drum and a re-specified tire moved that total by under two kilograms. In-wheel drive still costs about 21 kg of unsprung mass per rear corner and nothing in this module repeals it. It is bought with per-wheel torque authority, not paid off, and the tire sidewall and suspension-4\'s preview-fed dampers are what make the bill livable.',
      fail: [
        'Locating a wheel at two interfaces is over-constraint, and over-constraint is only safe while the tolerance stack holds. The pilot is a light interference fit and the flange bolts are torque-to-yield; if a shop reuses flange bolts or seats the pilot on debris, the wheel is located twice by two slightly different centers and the airgap pays for it.',
        'The co-cured titanium flange is the extrapolated claim in this module and the label is specific. What must become true: a titanium-to-CFRP co-cure holding bolt preload through a design life of drive-to-regen torque reversals at wheel-hub temperature and salt exposure, with no delamination signature. Rigs can show it now; only a fleet can close it, and until then this joint is inspected at every tire change.',
        'A curb strike is still a drivetrain event, carried from wheels-3 and now broader: any impact books runout measurement, an airgap check and ultrasound of a part that is scrap far more often than it is serviceable, and the corner is logged and released as a serialized rotor carrier rather than as a wheel.',
      ],
      explode: [0, 0, 0.85],
    },
    covers: {
      name: 'Active vane covers',
      tagline: 'Gen 3 made the cover a fan and paid its drag on every kilometer. Gen 5 gives the blades a pitch, so the fan can be switched off.',
      mass: 7,
      count: 4,
      specs: [
        ['Rear', '12 variable-pitch blades, 0 to 42 degrees, 2.3 kg each'],
        ['Front', '12 blades on the brake-temperature model, 1.2 kg each'],
        ['Rear flow', '0 to 110 m3/h; full pitch reaches 110 at 60 km/h'],
        ['Drag', 'Cd +0.002 open, +0.0002 shut (Gen 3 paid 0.002 always)'],
        ['Actuation', '48 V ring motor on hv-4 zonal, inductive hub coupler'],
        ['Maturity', 'Blade mechanism production practice; the coupler is pilot line'],
      ],
      how: 'wheels-3 turned the aero cover into the wheel motor\'s cooling fan and disclosed the bill precisely: twelve fixed vanes gave back 0.002 of the 0.012 Cd credit the flush Gen 2 cover had earned, about 80 W at 110 km/h, purchased so roughly 450 W of heat per corner could leave a sealed wheel. The flaw in that bargain is that a fixed-pitch fan pumps whenever the wheel turns, and the wheel turns most on the highway, where the corner is coolest. Gen 5 puts the blades on pivots. Shut, they lie flush in the cover face and the pumping work very nearly stops; the residual is windage, about 0.0002 of Cd. Open at 42 degrees they pump harder than the Gen 3 vane ever did. The peak flow is held at 110 m3/h, unchanged, and that number is not this module\'s choice: body-6 sized the skirted rear arch drain into its twin-tunnel floor at 110 m3/h per corner, so the peak stays where the neighbor built for it. What changes is when the car pays. On the highway the blades are shut and the 80 W penalty is gone, worth about 0.2 Wh/km back across a real duty cycle, small and honestly small. On a mountain descent at 60 km/h, where Gen 3\'s fixed vanes could only manage about 60 m3/h because flow scales with wheel speed, full pitch reaches the whole 110.\n\nThat descent case is the point, and so is the case it does not fix. Gen 3\'s own failure entry said the low-speed hill crawl that heats the motor most gets the least air, and pitch does not repeal that: a stationary wheel moves no air at any blade angle, so drivetrain-6\'s zero-speed derate stays exactly as softened as its vacuum-potted windings made it, no more. The front covers get the same mechanism for a different customer. body-6\'s active arch louvers already open on a brake-temperature model, and now the wheel face in front of them opens too, so arch and wheel are one duct with one schedule instead of a louver venting into a sealed disc. That model is watching a different rotor this generation: carbon-ceramic works happily from 200 to 700 C where iron wanted 100 to 550, so both sets of blades open later, less often, and the cruise configuration stays clean for more of the drive. Actuation is a slim 48 V ring motor in each cover hub on hv-4\'s corner zonal controllers, fed and commanded across an inductive hub coupler whose exciter ring sits on the static hub and whose pickup rides the wheel, with a wax thermostatic element in series: lose power or lose the command and the blades still drive open as the corner heats. The fail direction is chosen by physics, the same way body-6 chose spring-open for its louvers.',
      why: 'A cooling fan sized for the worst case runs at the worst case setting all the time, and Gen 3 knew it was paying that tax and said so in Cd. The apex answer is not a better vane, it is a variable one, because the duty ratio between a summer highway cruise and an alpine descent is about a hundred to one and no fixed geometry serves both. This part is also the clearest answer to why the wheels slot skipped Gen 4 entirely. Gen 4 is the generation that made a variable-pitch cover buildable and deliberately did not build it: it installed hv-4\'s 48 V zonal bus and the corner controllers this mechanism is powered and commanded from, then left every corner at Gen 3 because its risk budget was spent proving that steering and braking could be electrical. A cover that changes pitch was a want, not a bottleneck, and it would have been a moving part added to a corner in the same year that corner learned to be by-wire. Gen 5 collects the bus Gen 4 laid. The cost is stated plainly on the ledger below: this part adds a full kilogram of unsprung mass per rear corner, which is the largest single increase anywhere in this module, spent to buy back drag the car pays every kilometer and cooling authority it needs on the few that matter.',
      fail: [
        'Electronics and a mechanism now live in the worst environment on the car, inside a wheel, and the coupler is the pilot-line item. What must become true: tens of watts and an integrity-rated command channel across a rotating hub joint, through salt, spray and the magnetic noise of the corner\'s own motor, for the life of the vehicle. The wax fail-safe exists because that claim is not closed.',
        'Twelve pivots per cover is twelve places for brake dust and winter grime to seize a blade part open or part shut. A seized-open blade costs counts, a seized-shut one costs cooling, and the actuator current signature detects both the way hv-4 detects everything else, which means the fault is announced rather than found on a mountain.',
        'The rear cover still rides at the 0.97 explode vector rather than the corner\'s 0.85, because drivetrain-6\'s ring would otherwise pass through the blade face during teardown. That is a modeling convenience with a real-world echo: on this car the cover cannot be removed with the motor ring in place, so a cover service is a corner service.',
      ],
      explode: [0, 0, 0.97],
    },
    discs: {
      name: 'Front brake discs',
      tagline: 'Bigger and lighter at the same time, and the rust schedule three generations complained about is deleted rather than managed.',
      mass: 9,
      count: 2,
      specs: [
        ['Size', '365 x 34 mm C/SiC (wheels-3: 355 x 28 gray iron)'],
        ['Mass per disc', '4.5 kg (wheels-3: 5.5), 10 mm larger'],
        ['Sizing case', 'Alpine descent, full pack, regen saturated, rear rescue-only'],
        ['Single stop', '1.35 MJ at 160 km/h; ~1.0 MJ through this axle'],
        ['Continuous', '11 kW per disc on a 10% grade at 60 km/h'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The sizing argument has not changed since Gen 1 and it never will: the disc is sized by the stop the software cannot refuse, which is an alpine descent on a full pack where regeneration has nowhere to send the energy. What changed is the arithmetic on both sides of it. The apex preset is 1,363 kg, so a stop from 160 km/h is 1.35 MJ of kinetic energy and load transfer puts roughly three quarters of it on this axle, about 0.5 MJ per disc. The continuous case is harsher and more honest: a 10 percent grade at 60 km/h with regeneration saturated dissipates 22.2 kW, 11 kW per disc, held for as long as the mountain lasts. And the rear axle can no longer help at all, because the park-and-rescue device on the next panel shrank to the hold the law asks for. So the front disc grew 10 mm in diameter and 6 mm in thickness while its mass fell by a kilogram, which only one material lets you do: carbon fiber reinforced silicon carbide.\n\nC/SiC earns its place on three numbers and pays for it on one. It survives short excursions past 1,000 C where gray iron starts losing structure around 700, so the fade knee that set the Gen 3 disc\'s diameter moves out of the operating envelope entirely. Its friction coefficient is nearly flat with temperature, so pedal feel does not change between the first stop and the twentieth on a descent, which matters more in a brake-by-wire car than it sounds because the pedal is a simulator and the driver cannot feel what the disc is doing. And it does not corrode, at all. That last one is the apex win, because for three generations this module has confessed the same failure: a disc used for less than 6 percent of braking energy rusts, and Gen 1, Gen 2 and Gen 3 each answered with a wipe-apply routine, a software habit compensating for a materials problem. Deleting the material deletes the routine. The bill arrives cold. C/SiC bites poorly below about 100 C, exactly the state this car lives in, so the pad compound is formulated for low-temperature mu on ceramic rather than for peak friction, and the master unit runs a conditioning schedule described on its own panel.',
      why: 'A part whose duty share keeps falling and whose size keeps not falling looks like conservatism, and Gen 3 answered that it was arithmetic, because worst cases are set by law and physics rather than by frequency. Gen 5 accepts the same arithmetic and changes the material instead of the logic, which buys a larger disc, a kilogram less unsprung mass per corner, a fade margin that no longer needs route preconditioning to be safe, and the end of a corrosion story that three generations wrote apologies for.',
      fail: [
        'Cold friction is genuinely worse than iron and the first hard stop after weeks of pure regeneration has a deeper low-mu dip than any predecessor. The compensating pre-fill and pad conditioning are software, which means the honest sentence is that this disc is safer than iron in the case that sizes it and needs more help than iron in the case that happens daily.',
        'C/SiC wears by oxidation of its carbon phase at high temperature rather than by abrasion, so disc life is counted in thermal cycles rather than kilometers, and a disc that looks perfect can be at the end of its life. Mass loss is tracked at service against a serialized as-built figure, and the disc is not machinable: there is no skim, only replacement.',
        'The ceramic radiates hard at a carbon wheel 60 mm away, which is why the front wheel carries a barrier coat it never needed with iron, and why the front cover vanes now answer to a brake model. Both are new dependencies created by this part, and a failure in either lands on the wheel rather than on the disc.',
      ],
      explode: [0, 0, 0.45],
    },
    calipers: {
      name: 'Front calipers',
      tagline: 'The same monobloc discipline, still the only hydraulics on the car, and at last a bracket that visibly bolts to something.',
      mass: 6,
      count: 2,
      specs: [
        ['Type', 'Fixed monobloc, 6 x 32 mm pistons (wheels-3: 4 x 38)'],
        ['Clamp force', '38 kN per side at 160 bar; ~12% more torque than Gen 3'],
        ['Mount', 'Two-lug forged bracket onto suspension-4\'s carried upright'],
        ['Pads', 'Low-temperature C/SiC compound, titanium piston crowns'],
        ['Residual drag', '<0.4 Nm, and only two corners exist to drag'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The construction argument is Gen 2\'s and it has not aged: one forging machined into a fixed monobloc so that hard-stop fluid volume becomes clamp force instead of bridge flex, and rollback seals pulling the pads 0.1 mm clear on release so a brake used a twentieth of the time does not spend the rest of its life rubbing. What the larger disc changes is the piston layout. Six 32 mm pistons replace four 38s: the same swept volume spread over a longer pad, which matters because pad taper is the failure mode of a long pad on a fixed caliper and three pistons a side control it where two cannot. Clamp force is 38 kN a side at 160 bar against Gen 3\'s 36, and with the pad mean radius moving from 155 mm to 164 the caliper delivers about 12 percent more brake torque at the same line pressure. The piston crowns are titanium rather than steel, a small change with a specific purpose: C/SiC runs the pad backplate hotter than iron does, and titanium conducts at about 22 W per meter-kelvin against carbon steel\'s 50, so less than half the heat crosses the crown into the fluid behind it.\n\nThe genuinely new part is the bracket, and its absence in wheels-3 is worth saying out loud. That module hung its caliper in space 165 mm behind the wheel center with nothing between it and suspension-4\'s upright 120 mm further outboard. On the car it was obviously mounted; in the model it touched nothing, which is the exact failure class design/retro-gen5-apex.md caught on body-6\'s splitter and asked future modules to audit for. So the caliper now carries a two-lug forged bracket that reaches back to a pad on the inboard face of the carried upright and bolts there. The bracket is a real design decision as well as a drawing fix: suspension-4\'s knuckle is Gen 1 metal by drawing number, its bosses were rated for the Gen 1 caliper, and hanging 12 percent more torque on them means the bracket is sized to yield before the knuckle boss does. A bracket unbolts; an upright is a corner rebuild, and the deformable link belongs on the part that comes off.',
      why: 'This pair of calipers is still the entire hydraulic system of the vehicle: one pressure block, two lines, twelve pistons, and not a milliliter of fluid anywhere else, a concentration Gen 3 named and Gen 5 deepens by taking the last hydraulic function off the rear axle. Every certification argument about stopping a dead car runs through this component pair, which is why its design margin grew with the disc while everything behind it shrank.',
      fail: [
        'Two calipers means two single points, and the dual-circuit block plus honest inspection is the whole defense, unchanged since Gen 2. The rear axle now offers even less behind that mistake than it did in Gen 3.',
        'C/SiC pad dust is abrasive where iron dust is merely dirty, so piston seal and dust-boot life are set by a harsher particulate than any predecessor, and the service interval for seals is now shorter than the interval for pads.',
        'The bracket is a new joint on a carried casting, which means a load path that two generations of fleet data never saw. It is instrumented the direct way, with load-indicating washers under the upright bolts so preload is read rather than assumed at every service, and the honest note is that the first fleet evidence about it arrives with this generation.',
      ],
      explode: [-0.3, 0, 0.2],
    },
    'park-brake': {
      name: 'Park-and-rescue brakes',
      tagline: 'Gen 3 sized the rear friction brake for a service contribution it turned out not to make. Gen 5 measures the contribution and sizes for the hold.',
      mass: 2,
      count: 2,
      specs: [
        ['Type', '180 x 22 mm simplex inside the motor ring bore'],
        ['Mass', '1.0 kg per corner (wheels-3: 1.5, wheels-2: 4.5)'],
        ['Hold', '882 Nm per corner needed at 30% grade laden; 1,080 available'],
        ['Actuation', 'Dry gearmotor and 6 kN spindle, no fluid'],
        ['Dead-HV share', 'Under 8% of the decelerating force'],
        ['Maturity', 'Production practice'],
      ],
      how: 'wheels-2 carried a 4.5 kg sealed drum that was a real service brake. wheels-3 cut it to 1.5 kg and called it park-and-rescue, but sized it at 250 by 30 mm because it still imagined the device contributing to the dead-high-voltage stop. Gen 5 does the measurement instead of the imagining. In that failure case the front axle carries 365 mm carbon-ceramic discs at full clamp while the rear can only apply what a small drum inside a motor bore can apply before it fades, and the rear share works out under 8 percent of the decelerating force. A device contributing 8 percent is not sized by that duty. It is sized by the one thing it is the only device on the car able to do: hold the parked vehicle. Laden at about 1,763 kg on a 30 percent grade, gravity pulls 5.0 kN down the slope, and this axle is the only axle holding it, so each corner has to resist 2.5 kN, which is 882 Nm of brake torque at the 0.355 m tire radius. A simplex drum roughly doubles whatever its spindle applies, so 882 Nm at the 90 mm band radius asks for 4.9 kN; the dry spindle is specified at 6 kN and the corner holds 1,080 Nm, a fifth clear of the requirement. Type approval asks only for a laden hold on an 18 percent grade, which is 544 Nm; sizing for 30 percent is deliberate, because a parking brake is the one brake that gets no second chance.\n\nThe packaging is wheels-3\'s idea taken further. The drum has no housing of its own: it lives in the sealed volume drivetrain-6 keeps at 50 mbar of positive dry-air purge, its band hangs on a carrier off the wheel\'s new hub pilot rather than off the flange, and its backplate bolts through a central boss straight onto the static hub bearing housing at |z| 0.7175, threading inside drivetrain-6\'s five carrier spokes. The band radius fell from 125 mm to 90, which puts the whole device 65 mm inside the motor annulus and keeps the r 0.155 to 0.235 band void as the contract requires. Actuation stays dry, a gearmotor and spindle with no fluid anywhere, which is the Gen 2 thinking this family has carried for three generations and the reason the entire hydraulic system of the car fits at the front axle.',
      why: 'The temptation to delete it entirely is real and it is wrong, for the same reason wheels-3 gave: the law requires a car with every electron gone to hold and to stop, and the law is right. What Gen 5 adds is honesty about magnitude. Sizing a component for a duty it does not actually perform is how mass accumulates in a car nobody is auditing, and half a kilogram per rear corner of unsprung mass is worth more than a rear brake contribution nobody can feel.',
      fail: [
        'It is still the least inspectable friction device on the vehicle, inside a motor inside a wheel, and it is now smaller. Shoe condition is inferred from the gearmotor current signature on hv-4\'s telemetry, and the self-adjusting spindle that could jam in Gen 2 can still jam here behind more hardware than ever.',
        'Two full applies from 20 km/h and it needs minutes to cool. Above walking pace it fades quickly, by design and by disclosure, and the smaller drum fades sooner than the Gen 3 one did. This is a device for holding, not for stopping.',
        'It shares a sealed volume with a 1.0 mm airgap, so shoe dust is a cleanliness problem rather than a housekeeping one. The dust trap liner is a scheduled service item with a real interval, carried from wheels-3, and a smaller drum sheds proportionally more per unit of energy than a larger one.',
      ],
      explode: [0, 0, 0.85],
    },
    'master-unit': {
      name: 'Brake-by-wire unit',
      tagline: 'The Gen 2 box on its fourth posting, now teaching a ceramic disc how to be cold.',
      mass: 3,
      specs: [
        ['Architecture', 'One-box dry unit, front hydraulics only, carried from wheels-2'],
        ['Pressure build', '0 to 180 bar in 120 ms (carried)'],
        ['Actuators arbitrated', 'Two calipers, front regen, two wheel motors, two park brakes'],
        ['New duty', 'C/SiC pad conditioning on autonomy-4\'s forward model'],
        ['Fallback', 'No push-through: motors plus park brakes, ~0.38 g'],
        ['Maturity', 'Production practice'],
      ],
      how: 'The hardware is carried whole from wheels-2 through wheels-3: a dry pedal unit with a spring and elastomer simulator, dual ECUs on separate supplies, a ball-screw plunger block feeding two front calipers, and no push-through rod. Four generations of this module have found nothing to improve in it, which is the strongest claim a part can make. The scope keeps growing around it. The pedal now stands in front of eight actuators in four kinds: hydraulic clamp at two corners, front axle regeneration, two independently commanded wheel motors, and two park-brake gearmotors. Rear anti-lock is not a pressure problem at all in this architecture; a wheel motor modulates torque at kilohertz rates, finer and faster than any valve, and the arbitration line to drivetrain-6\'s vectoring coordinator carries over by name and by number: a braking demand overrides a vectoring demand within 2 milliseconds, always, provably, and every release of either codebase reopens the file.\n\nThe new duty is a materials problem solved in software. Carbon-ceramic gives up cold bite, so this box runs a conditioning schedule: when autonomy-4\'s forward model or the route data predicts a hard stop, it applies a few newtons of pad drag for a second or two beforehand to lift the disc face into its friction window. The energy is trivial and it is metered anyway, because a brake that drags is a brake that costs range: 5 N per corner at 30 m/s is 300 W across the axle, so a two second pre-conditioning event costs about 0.17 Wh and the box logs every one of them so the fleet can see whether the schedule is honest. The fallback number moved slightly and the reason is on the panel next door: with the rear friction brake shrunk to a hold device, a hydraulics-out stop on motors plus park brakes is about 0.38 g rather than Gen 3\'s 0.40, and stating a fifth of a percent of deceleration honestly is the point of keeping a ledger at all.',
      why: 'Gen 1 decoupled the pedal and let software claim the braking energy. Gen 2 resized the hydraulics to the real job and replaced a steel rod with a statistical independence proof. Gen 3 extended that proof across the drivetrain. Gen 5 changes nothing in the box and everything it has to know, which is what happens when a control unit outlives four generations of the hardware it commands: the certification file grows, the casting does not.',
      fail: [
        'The arbitration line is still the single point it was in Gen 3: a disagreement between braking and vectoring settled by a 2 millisecond priority rule that has to be right every time, now with a rear friction reserve that is smaller than it has ever been behind the mistake.',
        'Pad conditioning is a new way for this box to spend energy without being asked, and a forward model that predicts stops that do not happen drags pads for nothing. The schedule is capped, logged and audited against outcomes, and the cap exists because an unaudited comfort feature is how range quietly disappears.',
        'The independence case spans this unit, the vectoring coordinator and two rim-side inverters, which is three codebases on dissimilar hardware arguing that they cannot fail together. It was the hardest argument to close in Gen 2, and every actuator added since has widened the set of common-mode failures it has to rule out.',
      ],
      explode: [0.5, 0.35, 0],
    },
  },
};

/* ── Geometry ──
   Corner-local frame, carried from all three predecessors: origin at the
   wheel center (+-1.45, 0.355, +-0.81), z along the axle, s = sign(world z)
   so +s is outboard. Any world |z| maps to a lathe profile height of
   (|z| - 0.81), multiplied by s at build time.

   Key world planes used below:
     |z| 0.7175  tire inner face (body-6 audited)
     |z| 0.72    CONTRACT flange face, drivetrain-6 rotor ring bolts here
     |z| 0.80    outboard edge of the CONTRACT annulus
     |z| 0.802   drivetrain-6 hub stud flange outboard face
     |z| 0.9025  tire outer face (body-6 audited) */

const TSEG = 48;                 // tire lathe segments
const RSEG = 40;                 // rim lathe segments
const BEAD = 0.2665;             // 21 inch bead seat radius
const FLANGE = 0.279;            // rim flange lip radius

/* Rotate a Y-axis mesh so its axis runs along z. */
function zc(mesh) { mesh.rotation.x = Math.PI / 2; return mesh; }

/* Lathe in the corner-local frame: profile is [radius, axialOffset] pairs
   in increasing axial order, where axialOffset = |z| - 0.81. */
function zlathe(profile, s, mat, seg) {
  const m = lib.lathe(profile.map(([r, a]) => [r, s * a]), mat, seg);
  m.rotation.x = Math.PI / 2;
  return m;
}

/* One ring of pitched vane blades. The blade is drawn span-along-local-y,
   so rotation.z swings the span radial and rotation.y is the pitch about
   that span. Order matters and the default does not work: Three.js Euler
   'XYZ' composes Rx*Ry*Rz, which applies rotation.z FIRST and then pitches
   the already-placed blade about the GLOBAL y axis, fanning the ring from
   |z| 0.808 to 0.936 (the 3 and 9 o'clock blades tip 33 mm past the tire
   face at 0.9025, straight into body-6's rear arch skirt). Order 'ZYX'
   composes Rz*Ry, which is the intrinsic pitch about the blade's own span:
   every blade then holds the same |z| 0.846 to 0.898. The pitch sign
   follows s so the two sides of the car read as mirror images. */
function vaneRing(g, s, n, R, len, thick, wide, az, pitch, mat) {
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const b = lib.box(thick, len, wide, mat);
    b.position.set(Math.cos(a) * R, Math.sin(a) * R, s * az);
    b.rotation.set(0, s * pitch, a - Math.PI / 2, 'ZYX');
    g.add(b);
  }
}

/* ── Tires ──
   One lathed casing per corner, section faces held at |z| 0.9025 and
   0.7175 and crown at P.tireR, the envelope body-6 audited its arch
   clearances against. Beads land on the BEAD seat both sides. */
function tirePart(s) {
  const g = lib.part('tires', [0, 0, s * 0.85]);
  const casing = zlathe([
    [BEAD,   -0.0700],
    [0.2850, -0.0800],
    [0.3100, -0.0900],
    [0.3300, -0.0925],   /* section max, world |z| 0.7175 */
    [0.3480, -0.0870],
    [0.3540, -0.0760],
    [P.tireR, -0.0600],
    [P.tireR,  0.0600],
    [0.3540,  0.0760],
    [0.3480,  0.0870],
    [0.3300,  0.0925],   /* section max, world |z| 0.9025 */
    [0.3100,  0.0900],
    [0.2850,  0.0800],
    [BEAD,    0.0700],
  ], s, M.rubber, TSEG);
  g.add(casing);
  /* three circumferential ribs, drawn shallow: the apex tread is a
     low-void pattern because void volume is hysteresis */
  for (const az of [-0.030, 0, 0.030]) {
    const rib = lib.torus(0.3545, 0.0035, M.rubber, TSEG, 6);
    rib.position.z = s * az;
    g.add(rib);
  }
  return g;
}

/* ── Front wheel ──
   One-piece CFRP: barrel, ten integral spokes, hub face with the co-cured
   titanium insert. The hub face plane sits at |z| 0.7625, exactly the
   outboard face of drivetrain-6's front halfshaft CV joint, so the wheel
   lands on metal rather than floating outboard of it. */
function frontWheelPart(s) {
  const g = lib.part('front-wheels', [0, 0, s * 1.15]);

  const barrel = zlathe([
    [FLANGE, -0.0760],
    [BEAD,   -0.0700],
    [BEAD,   -0.0380],
    [0.2480, -0.0250],   /* drop well */
    [0.2480,  0.0180],
    [BEAD,    0.0320],
    [BEAD,    0.0700],
    [FLANGE,  0.0760],
  ], s, M.carbon, RSEG);
  g.add(barrel);

  /* hub face: titanium insert ring, inboard face on the CV joint plane */
  const hubFace = zc(lib.cyl(0.078, 0.020, M.steel, 24));
  hubFace.position.z = s * -0.0375;
  g.add(hubFace);

  /* ten integral spokes, inner ends on the hub face, tips in the well */
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const sp = lib.box(0.026, 0.185, 0.022, M.carbon);
    sp.position.set(Math.cos(a) * 0.1705, Math.sin(a) * 0.1705, s * -0.030);
    sp.rotation.z = a - Math.PI / 2;
    g.add(sp);
  }

  const nuts = lib.bolts(5, 0.048, 0.008, M.steel);
  nuts.rotation.x = Math.PI / 2;
  nuts.position.z = s * -0.0225;
  g.add(nuts);

  return g;
}

/* ── Rear wheel ──
   One-piece CFRP with a co-cured titanium flange insert. The lathe leaves
   the CONTRACT annulus void: over |z| 0.72 to 0.80 (axial -0.090 to
   -0.010) the profile radius is 0.254 or greater everywhere except the
   flange face itself, which lies exactly on the |z| 0.72 boundary plane.
   The center web is new this generation: a hub pilot landing on
   drivetrain-6's stud flange at |z| 0.800, with the spoke plane at
   |z| 0.808 to 0.828, clear of the annulus by 8 mm. */
function rearWheelPart(s) {
  const g = lib.part('rear-wheels', [0, 0, s * 0.85]);

  const shell = zlathe([
    [0.1500, -0.0900],   /* flange inner edge, CONTRACT face plane |z| 0.72 */
    [0.2440, -0.0900],   /* flange face annulus, still on |z| 0.72 */
    [0.2540, -0.0855],   /* fillet: from here out the profile clears r 0.235 */
    [0.2700, -0.0800],
    [FLANGE, -0.0760],   /* inboard bead flange lip */
    [BEAD,   -0.0700],   /* inboard bead seat */
    [BEAD,   -0.0300],
    [0.2480, -0.0180],   /* shallow drop well */
    [0.2480,  0.0180],
    [BEAD,    0.0320],
    [BEAD,    0.0700],
    [FLANGE,  0.0760],
  ], s, M.carbon, RSEG);
  g.add(shell);

  /* co-cured titanium flange insert, 2 mm, just inboard of the face plane
     (|z| 0.716 to 0.720) so the bolt heads bear on metal */
  const insert = zlathe([
    [0.1500, -0.0940],
    [0.2440, -0.0940],
    [0.2440, -0.0900],
    [0.1500, -0.0900],
    [0.1500, -0.0940],
  ], s, M.steel, RSEG);
  g.add(insert);

  /* twelve flange bolts on the r 0.225 circle drivetrain-6's nuts share,
     heads at |z| 0.7101 to 0.7179 so each one seats 1.9 mm into the
     titanium insert rather than grazing it, inboard of everything in the
     annulus, outboard of the rim-side inverter busbars (|z| <= 0.709) and
     clear of the drivetrain-6 hub carrier spokes (r <= 0.146) */
  const flangeBolts = lib.bolts(12, 0.225, 0.0065, M.steel);
  flangeBolts.rotation.x = Math.PI / 2;
  flangeBolts.position.z = s * -0.0960;
  g.add(flangeBolts);

  /* hub pilot: lands on drivetrain-6's rotating stud flange at |z| 0.800
     and swallows its five studs (r 0.054, out to |z| 0.808) */
  const pilot = zc(lib.cyl(0.072, 0.026, M.steel, 24));
  pilot.position.z = s * 0.003;
  g.add(pilot);

  /* center web: ten spokes, pilot to drop well, outboard of the annulus */
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const sp = lib.box(0.024, 0.176, 0.020, M.carbon);
    sp.position.set(Math.cos(a) * 0.160, Math.sin(a) * 0.160, s * 0.008);
    sp.rotation.z = a - Math.PI / 2;
    g.add(sp);
  }

  const nuts = lib.bolts(5, 0.048, 0.008, M.steel);
  nuts.rotation.x = Math.PI / 2;
  nuts.position.z = s * 0.019;
  g.add(nuts);

  return g;
}

/* ── Covers, rotating half ──
   Bezel landing on the rim's own flange lip (r 0.279 at |z| 0.886, the
   last point of both barrel profiles) so the cover is retained by the
   wheel rather than hanging in its mouth, twelve pitched blades rooted
   in the bezel, the pitch ring they all hang from, the 48 V ring
   actuator, its pitch links and the wax fail-safe capsule. Drawn at part
   pitch, the state the blades hold on a long descent. All geometry lives
   outboard of |z| 0.846, well clear of the CONTRACT annulus and of
   drivetrain-6's rings at 0.798. */
function coverSpinPart(s, front) {
  const g = lib.part('covers', [0, 0, s * (front ? 1.45 : 0.97)]);

  const bezel = zlathe([
    [0.2300, 0.0700],
    [0.2600, 0.0730],
    [FLANGE, 0.0760],   /* seats on the rim flange lip, |z| 0.886 */
  ], s, M.carbon, RSEG);
  g.add(bezel);

  vaneRing(g, s, 12, 0.170, 0.150, 0.020, 0.050, 0.062, 0.62, M.alu);

  const pitchRing = lib.torus(0.098, 0.008, M.castAlu, 36, 10);
  pitchRing.position.z = s * 0.045;
  g.add(pitchRing);

  /* six links, actuator drum (r 0.052) out to the pitch ring (r 0.090):
     r 0.048 to 0.100, so each link bites both ends */
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3;
    const link = lib.box(0.010, 0.052, 0.010, M.steel);
    link.position.set(Math.cos(a) * 0.074, Math.sin(a) * 0.074, s * 0.048);
    link.rotation.z = a - Math.PI / 2;
    g.add(link);
  }

  const actuator = zc(lib.cyl(0.052, 0.020, M.plastic, 24));
  actuator.position.z = s * 0.052;
  g.add(actuator);

  /* wax thermostatic capsule in series with the actuator: the fail-open
     path when power or command is lost. Body at r 0.051 to 0.073, so it
     stands on the actuator drum rather than beside it. */
  const wax = zc(lib.cyl(0.011, 0.026, M.busbar, 12));
  wax.position.set(0.050, -0.036, s * 0.056);
  g.add(wax);

  /* hub bellmouth: the inlet, larger at the rear where the duty is. Its
     last profile point closes down onto the actuator drum wall at
     r 0.052, |z| 0.870, which is what holds the mouth on the hub. */
  const inlet = zlathe(front
    ? [[0.026, 0.0840], [0.040, 0.0780], [0.052, 0.0700], [0.060, 0.0620], [0.052, 0.0600]]
    : [[0.034, 0.0840], [0.048, 0.0780], [0.056, 0.0700], [0.060, 0.0620], [0.052, 0.0600]],
    s, M.darkSteel, 28);
  g.add(inlet);

  return g;
}

/* ── Covers, static half ──
   The inductive exciter ring that powers and commands the rotating
   actuator, plus its 48 V lead to the hv-4 corner zonal controller.
   Front: wrapped on suspension-4's upright boss (r 0.054, |z| 0.722 to
   0.758) at |z| 0.748 to 0.754, its bore sitting on the boss wall.
   Rear: wrapped on drivetrain-6's static hub bearing housing (r 0.072,
   |z| 0.7175 to 0.7925) at |z| 0.772 to 0.778, its bore on the housing
   wall and its outer face at r 0.084, five millimeters inside the
   rotating park-brake carrier. */
function coverStaticPart(x, z, front) {
  const s = Math.sign(z);
  const g = lib.part('covers', [0, 0, s * (front ? 1.45 : 0.97)]);

  const prof = front
    ? [[0.054, -0.0620], [0.070, -0.0620], [0.070, -0.0560], [0.054, -0.0560], [0.054, -0.0620]]
    : [[0.072, -0.0380], [0.084, -0.0380], [0.084, -0.0320], [0.072, -0.0320], [0.072, -0.0380]];
  const exciter = zlathe(prof, s, M.pcb, 28);
  exciter.position.set(x, P.wheelY, s * P.wheelZ);
  g.add(exciter);

  const lead = front
    ? [
        [1.390, 0.333, s * 0.751],
        [1.360, 0.322, s * 0.728],
        [1.300, 0.322, s * 0.682],
        [1.220, 0.352, s * 0.648],
        [1.168, 0.379, s * 0.622],
      ]
    : [
        [-1.494, 0.295, s * 0.775],
        [-1.500, 0.275, s * 0.745],
        [-1.460, 0.275, s * 0.700],
        [-1.360, 0.300, s * 0.660],
        [-1.260, 0.345, s * 0.635],
        [-1.195, 0.378, s * 0.622],
      ];
  g.add(lib.tube(lead, 0.0035, M.plasticLt));

  return g;
}

/* ── Front discs ──
   365 x 34 mm C/SiC. The friction ring sits inboard of suspension-4's
   upright body (|z| 0.724 to 0.756), spanning |z| 0.675 to 0.709 at
   r 0.145 to 0.1825. Both suspension-4 ball joints were measured against
   it: the upper sphere (center radial 0.210, radius 0.024, inner edge
   0.186) clears by 3.5 mm, the lower one (center radial 0.120, outer edge
   0.144) by 1.0 mm.

   That 1.0 mm is why the hat is a deep top hat and not the cone a smaller
   disc would use. The web turns inward on the ring's inboard face plane
   at |z| 0.675, which is 11 mm inboard of the lower joint sphere, and the
   bell then runs outboard at r 0.090: 6 mm inside that sphere, 14 mm
   inside the lower A-arm rods, and 29 mm inside the caliper's outboard
   half, out to the wheel hub face plane at |z| 0.7625 where it bolts. A
   cone from r 0.145 to the hub would sweep straight through the lower
   joint, which is what happens when a disc grows 10 mm on carried Gen 1
   suspension hardware. The one thing no surface of revolution can dodge
   is the pair of lower A-arm rods themselves: they hover at radial 0.104
   to 0.134 along their whole length, so the web crosses them at |z| 0.675
   the way every hub-region part on this car crosses the carried upright
   plate. */
function discPart(s) {
  const g = lib.part('discs', [0, 0, s * 0.45]);

  const ring = zlathe([
    [0.1450, -0.135],
    [0.1825, -0.135],
    [0.1825, -0.101],
    [0.1450, -0.101],
    [0.1450, -0.135],
  ], s, M.darkSteel, RSEG);
  g.add(ring);

  /* ceramic face: a lighter band so the C/SiC reads as ceramic, not iron */
  for (const az of [-0.135, -0.101]) {
    const face = lib.torus(0.164, 0.0055, M.plasticLt, RSEG, 8);
    face.position.z = s * az;
    g.add(face);
  }

  /* twelve face slots: C/SiC is slotted rather than cross-drilled */
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const slot = lib.box(0.005, 0.034, 0.036, M.plastic);
    slot.position.set(Math.cos(a) * 0.164, Math.sin(a) * 0.164, s * -0.118);
    slot.rotation.z = a - Math.PI / 2 + 0.42;
    g.add(slot);
  }

  const hat = zlathe([
    [0.1450, -0.1350],  /* web on the ring's inboard face, |z| 0.675 */
    [0.0900, -0.1350],
    [0.0900, -0.0600],  /* bell around the upright hub boss, r 0.054 */
    [0.0820, -0.0520],
    [0.0780, -0.0475],  /* bolts to the wheel hub face at |z| 0.7625 */
  ], s, M.alu, RSEG);
  g.add(hat);

  return g;
}

/* ── Front calipers ──
   Fixed monobloc at 160 degrees, straddling the disc ring with a 0.5 mm
   pad gap each side, bridged outside r 0.1825, and bracketed back to a pad
   on the inboard face of suspension-4's upright at |z| 0.724. Static:
   never rotates. Lower edge at y 0.346, clear of the battery lid at 0.31. */
function caliperPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('calipers', [-0.3, 0, s * 0.2]);

  const CA = Math.PI * (160 / 180);
  const cx = x + Math.cos(CA) * 0.175;
  const cy = P.wheelY + Math.sin(CA) * 0.175;

  for (const az of [-0.1505, -0.0855]) {
    const half = lib.box(0.090, 0.130, 0.030, M.caliper);
    half.position.set(cx, cy, s * (0.81 + az));
    g.add(half);
  }

  const bridge = lib.box(0.030, 0.100, 0.110, M.caliper);
  bridge.position.set(x + Math.cos(CA) * 0.203, P.wheelY + Math.sin(CA) * 0.203, s * 0.692);
  bridge.rotation.z = CA;
  g.add(bridge);

  /* Six pistons, three a side, crowns landing on the friction ring faces
     at |z| 0.675 and 0.709 (the pads are the interface and are not drawn
     separately). The row is centered at radial 0.162 with plus and minus
     0.038 of tangential spread, so every crown stays inside the friction
     band, r 0.145 to 0.1825, and the three-piston mean radius works out
     at 0.164, the pad mean radius the content claims. */
  const px = x + Math.cos(CA) * 0.162;
  const py = P.wheelY + Math.sin(CA) * 0.162;
  for (const az of [-0.141, -0.095]) {
    for (const t of [-0.038, 0, 0.038]) {
      const p = zc(lib.cyl(0.016, 0.012, M.steel, 12));
      p.position.set(
        px + Math.cos(CA + Math.PI / 2) * t,
        py + Math.sin(CA + Math.PI / 2) * t,
        s * (0.81 + az)
      );
      g.add(p);
    }
  }

  /* Two-lug bracket back to the upright. It runs at |z| 0.716 to 0.719,
     outboard of the disc ring face at 0.709, and stays at r 0.127 or more
     from the wheel center so it clears the disc hat bell, which is at
     r 0.090 in that plane. The pad lands on the upright's inboard face at
     |z| 0.724, inside its x [1.4075, 1.4925] and y [0.22, 0.58] footprint,
     so the bracket bolts to metal rather than ending in air. Both lugs and
     the pad were measured against the suspension-4 upper ball joint sphere
     at (1.45, 0.565, 0.70), radius 0.024: the upper lug clears it by 14 mm
     and the pad's top corner by 11 mm. */
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

  /* Brake line fitting: a 75 mm crossover boss spanning |z| 0.6525 to
     0.7275, so it sits into the top of BOTH caliper halves instead of
     hovering over the gap between them. The master unit's forward pair
     terminates inside its bore at (1.286, 0.484, +-0.691). */
  const fitting = zc(lib.cyl(0.008, 0.075, M.steel, 10));
  fitting.position.set(cx, cy + 0.070, s * 0.690);
  g.add(fitting);
  /* pad wear sensor, seated into the lower outboard corner of the
     inboard half rather than standing off it */
  const sense = lib.box(0.014, 0.012, 0.010, M.sensor);
  sense.position.set(cx - 0.030, cy - 0.063, s * 0.672);
  g.add(sense);

  return g;
}

/* ── Park brake, rotating half ──
   180 mm band on a carrier that necks down onto the wheel's new hub pilot
   at r 0.072, |z| 0.802, and sweeps inboard to |z| 0.728. Everything sits
   at r 0.072 to 0.094, well inside the CONTRACT annulus inner radius of
   0.155 and outside drivetrain-6's hub housing at r 0.072. */
function parkDrumPart(s) {
  const g = lib.part('park-brake', [0, 0, s * 0.85]);

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
   Backplate, two shoes, the dry gearmotor and spindle. The central boss
   bolts onto the inboard face of drivetrain-6's static hub bearing
   housing at |z| 0.7175 and stays at r 0.066, inside its five carrier
   spokes (inner tips at r 0.069). The backplate at r 0.100 clears the
   rim-side GaN inverter, whose lowest hardware sits at r 0.115.

   Two clearances against drivetrain-6 set the shoe geometry. Radially the
   shoe web threads r 0.073 to 0.089, a millimeter outside the static hub
   housing at 0.072 and a millimeter inside the drum band at 0.090, which
   is why the web is drawn 16 mm thick and stretched along z to the full
   22 mm band width rather than as a round 22 mm section. Angularly the
   two shoe arms have to cross the plane of drivetrain-6's five carrier
   spokes (|z| 0.710 to 0.719, phase 0.9, 24 mm wide), so they are phased
   to 1.214 and 4.356 radians, 18 degrees off the nearest spoke on either
   side, and narrowed to 20 mm: 24.5 mm of arc holding 22 mm of hardware. */
function parkBackPart(x, z) {
  const s = Math.sign(z);
  const g = lib.part('park-brake', [0, 0, s * 0.85]);
  g.position.set(x, P.wheelY, z);

  const boss = zc(lib.cyl(0.066, 0.016, M.darkSteel, 20));
  boss.position.z = s * -0.1005;
  g.add(boss);

  const plate = zc(lib.cyl(0.100, 0.007, M.darkSteel, 32));
  plate.position.z = s * -0.1085;
  g.add(plate);

  for (const a of [0.854, 0.854 + Math.PI]) {
    const shoe = lib.mesh(
      new THREE.TorusGeometry(0.081, 0.008, 8, 16, Math.PI * 0.72),
      M.steel
    );
    shoe.rotation.z = a;
    shoe.scale.z = 1.375;          /* 16 mm web drawn to the 22 mm band width */
    shoe.position.z = s * -0.058;
    g.add(shoe);
    /* the arm that carries each shoe out from the backplate: it lands in
       the plate at |z| 0.705 and runs out under the shoe at 0.751 */
    const arm = lib.box(0.012, 0.020, 0.046, M.darkSteel);
    arm.position.set(Math.cos(a + 0.36) * 0.078, Math.sin(a + 0.36) * 0.078, s * -0.082);
    arm.rotation.z = a + 0.36;
    g.add(arm);
  }

  const motor = zc(lib.cyl(0.015, 0.040, M.plastic, 14));
  motor.position.set(-0.044, -0.068, s * -0.124);
  g.add(motor);
  /* spindle from the gearmotor face out to the shoe web it expands */
  const spindle = zc(lib.cyl(0.005, 0.050, M.steel, 8));
  spindle.position.set(-0.044, -0.068, s * -0.084);
  g.add(spindle);

  return g;
}

/* ── Brake-by-wire unit ──
   Carried placement from wheels-2 and wheels-3: dry pedal unit and
   pressure block on the bulkhead shelf, two hydraulic lines forward to
   the caliper fittings, and two redundant aft harnesses carrying the
   park-brake commands and the brake-priority arbitration line to
   drivetrain-6's vectoring coordinator. The aft runs sit at y 0.345 and
   |z| 0.74: above the battery lid at 0.31, outboard of the hv-4 ring
   side legs at |z| 0.640 to 0.690, and inboard of the tire faces. Both
   ends are landed rather than left in space: the forward pair terminates
   inside the caliper line fittings at (1.286, 0.484, +-0.691) and the aft
   pair inside the park-brake gearmotors at (-1.494, 0.287, +-0.686). */
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

  /* Reservoir seated ON the plunger block. wheels-2 placed it at y 0.665,
     which left its floor 7.5 mm above the block's 0.64 lid and hovering;
     wheels-3 carried the gap. 0.655 sinks it 2.5 mm into the lid. */
  const reservoir = lib.box(0.05, 0.035, 0.05, M.plasticLt);
  reservoir.position.set(1.02, 0.655, -0.32);
  g.add(reservoir);

  const ecu = lib.box(0.09, 0.08, 0.012, M.pcb);
  ecu.position.set(0.95, 0.62, -0.288);
  g.add(ecu);

  /* pedal signal conduit, carried: still no push-through rod. Nudged 2 mm
     aft of the wheels-2 placement so its end sinks into the pedal-unit
     face at x 0.895 instead of butting it exactly. */
  const conduit = lib.cyl(0.006, 0.05, M.plastic, 10);
  conduit.rotation.z = Math.PI / 2;
  conduit.position.set(0.872, 0.595, -0.35);
  g.add(conduit);

  /* two hydraulic lines out to the caliper fittings at (1.286, 0.490) */
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

  /* redundant aft harnesses: park-brake commands plus the brake-priority
     arbitration line to the drivetrain-6 vectoring coordinator */
  g.add(lib.tube([
    [0.92, 0.57, -0.38],
    [0.70, 0.42, -0.55],
    [0.30, 0.345, -0.74],
    [-0.60, 0.345, -0.74],
    [-1.15, 0.35, -0.70],
    [-1.32, 0.315, -0.68],
    [-1.47, 0.288, -0.664],
    [-1.494, 0.287, -0.678],
  ], 0.0035, M.plastic));
  g.add(lib.tube([
    [0.92, 0.57, -0.32],
    [0.70, 0.45, 0.00],
    [0.40, 0.36, 0.55],
    [0.10, 0.345, 0.74],
    [-0.60, 0.345, 0.74],
    [-1.15, 0.35, 0.70],
    [-1.32, 0.315, 0.68],
    [-1.47, 0.288, 0.664],
    [-1.494, 0.287, 0.678],
  ], 0.0035, M.plastic));

  return g;
}

export function build() {
  const sys = new THREE.Group();

  const corners = [
    [P.axleF, P.wheelZ],
    [P.axleF, -P.wheelZ],
    [P.axleR, P.wheelZ],
    [P.axleR, -P.wheelZ],
  ];

  for (const [x, z] of corners) {
    const front = x > 0;
    const s = Math.sign(z);

    /* everything that turns with the wheel, centered on its own origin */
    const spinG = new THREE.Group();
    spinG.position.set(x, P.wheelY, z);
    lib.spin(spinG, 'z', 30);
    spinG.add(tirePart(s), coverSpinPart(s, front));
    if (front) {
      spinG.add(frontWheelPart(s), discPart(s));
    } else {
      spinG.add(rearWheelPart(s), parkDrumPart(s));
    }
    sys.add(spinG);

    /* static halves: calipers grip, park backplates carry shoes, and the
       cover exciters stand off the upright and the hub housing */
    sys.add(coverStaticPart(x, z, front));
    sys.add(front ? caliperPart(x, z) : parkBackPart(x, z));
  }

  sys.add(masterUnitPart());
  return sys;
}
