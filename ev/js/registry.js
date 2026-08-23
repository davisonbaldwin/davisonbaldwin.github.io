/* Assembles system modules into one vehicle and one part index.
   Geometry is built lazily: only the default-active variant set is built at
   startup; other variants build on first switch (assemble() had reached
   500 ms building every variant eagerly, see design/retro-gen3.md). Part
   METADATA for every module is always indexed, because the rail, stats,
   and panels need it regardless of what is built. */

import * as THREE from '../vendor/three.module.js';
import { mergeStatic } from './merge.js';
import * as body from './systems/body.js';
import * as bodyAero from './systems/body-aero.js';
import * as body3 from './systems/body-3.js';
import * as body4 from './systems/body-4.js';
/* apex generation modules use the -6 suffix because the -5 ids belong to
   the demoted value study; their display label is Gen 5 */
import * as body6 from './systems/body-6.js';
import * as body7 from './systems/body-7.js';
import * as body8 from './systems/body-8.js';
import * as body9 from './systems/body-9.js';
import * as battery7 from './systems/battery-7.js';
import * as drivetrain7 from './systems/drivetrain-7.js';
import * as drivetrain9 from './systems/drivetrain-9.js';
import * as wheels7 from './systems/wheels-7.js';
import * as wheels9 from './systems/wheels-9.js';
import * as thermal7 from './systems/thermal-7.js';
import * as thermal9 from './systems/thermal-9.js';
import * as suspension9 from './systems/suspension-9.js';
import * as autonomy10 from './systems/autonomy-10.js';
/* Gen 11, the package generation: a tandem cabin on Gen 10's platform. */
import * as body11 from './systems/body-11.js';
import * as body12 from './systems/body-12.js';
import * as autonomy12 from './systems/autonomy-12.js';
/* Gen 13, the floor: the cabin down to the lid, the front wheels in pants. */
import * as body13 from './systems/body-13.js';
import * as wheels13 from './systems/wheels-13.js';
import * as interior13 from './systems/interior-13.js';
import * as thermal13 from './systems/thermal-13.js';
import * as autonomy13 from './systems/autonomy-13.js';
import * as body14 from './systems/body-14.js';
import * as wheels14 from './systems/wheels-14.js';
import * as interior14 from './systems/interior-14.js';
import * as body15 from './systems/body-15.js';
import * as body16 from './systems/body-16.js';
import * as suspension16 from './systems/suspension-16.js';
import * as autonomy16 from './systems/autonomy-16.js';
import * as body17 from './systems/body-17.js';
import * as wheels17 from './systems/wheels-17.js';
import * as suspension17 from './systems/suspension-17.js';
import * as drivetrain17 from './systems/drivetrain-17.js';
import * as battery17 from './systems/battery-17.js';
import * as autonomy17 from './systems/autonomy-17.js';
import * as thermal17 from './systems/thermal-17.js';
import * as body18 from './systems/body-18.js';
import * as interior18 from './systems/interior-18.js';
import * as autonomy18 from './systems/autonomy-18.js';
import * as hv18 from './systems/hv-18.js';
import * as hv15 from './systems/hv-15.js';
import * as thermal15 from './systems/thermal-15.js';
import * as autonomy15 from './systems/autonomy-15.js';
import * as interior15 from './systems/interior-15.js';
import * as wheels15 from './systems/wheels-15.js';
import * as battery11 from './systems/battery-11.js';
import * as wheels11 from './systems/wheels-11.js';
import * as hv11 from './systems/hv-11.js';
import * as thermal11 from './systems/thermal-11.js';
import * as interior11 from './systems/interior-11.js';
import * as autonomy11 from './systems/autonomy-11.js';
import * as wheels10 from './systems/wheels-10.js';
import * as battery10 from './systems/battery-10.js';
import * as battery from './systems/battery.js';
import * as battery2 from './systems/battery-2.js';
import * as battery3 from './systems/battery-3.js';
import * as battery6 from './systems/battery-6.js';
import * as drivetrain from './systems/drivetrain.js';
import * as drivetrain2 from './systems/drivetrain-2.js';
import * as drivetrain3 from './systems/drivetrain-3.js';
import * as drivetrain6 from './systems/drivetrain-6.js';
import * as thermal from './systems/thermal.js';
import * as thermal6 from './systems/thermal-6.js';
import * as hv from './systems/hv.js';
import * as hv4 from './systems/hv-4.js';
import * as suspension from './systems/suspension.js';
import * as suspension4 from './systems/suspension-4.js';
import * as wheels from './systems/wheels.js';
import * as wheels2 from './systems/wheels-2.js';
import * as wheels3 from './systems/wheels-3.js';
import * as wheels6 from './systems/wheels-6.js';
import * as autonomy from './systems/autonomy.js';
import * as autonomy4 from './systems/autonomy-4.js';
import * as interior from './systems/interior.js';
import * as interior4 from './systems/interior-4.js';
import * as interior6 from './systems/interior-6.js';

/* Systems appear in the rail in this order (one row per slot). */
/* The demoted value-study modules (body-5, battery-5, thermal-5,
   interior-5) exist on disk but are deliberately unregistered: the ladder
   shows only ascent, per Davis's unlimited-resources mandate. */
const MODULES = [body, bodyAero, body3, body4, body6, body7, body8, body9, battery, battery2, battery3, battery6, battery7, battery10, drivetrain, drivetrain2, drivetrain3, drivetrain6, drivetrain7, drivetrain9, thermal, thermal6, thermal7, thermal9, hv, hv4, suspension, suspension4, suspension9, wheels, wheels2, wheels3, wheels6, wheels7, wheels9, wheels10, autonomy, autonomy4, autonomy10, autonomy11, interior, interior4, interior6, interior11, body11, battery11, wheels11, hv11, thermal11, body12, autonomy12, body13, wheels13, interior13, thermal13, autonomy13, body14, wheels14, interior14, body15, hv15, thermal15, autonomy15, interior15, wheels15, body16, suspension16, autonomy16, body17, wheels17, suspension17, drivetrain17, battery17, autonomy17, thermal17, body18, interior18, autonomy18, hv18];

const byId = Object.fromEntries(MODULES.map((m) => [m.SYSTEM.id, m]));

/* Shell/system variants: each slot lists interchangeable system ids.
   The first option is the default. main.js renders the switcher. */
export const VARIANTS = [
  { slot: 'body', options: [{ sys: 'body', label: 'Gen 1' }, { sys: 'body-aero', label: 'Gen 2 aero' }, { sys: 'body-3', label: 'Gen 3 monoform' }, { sys: 'body-4', label: 'Gen 4 active' }, { sys: 'body-6', label: 'Gen 5 apex' }, { sys: 'body-7', label: 'Gen 6 form' }, { sys: 'body-8', label: 'Gen 8 closed tail' }, { sys: 'body-9', label: 'Gen 9 flat flank' }, { sys: 'body-11', label: 'Gen 11 tandem' }, { sys: 'body-12', label: 'Gen 12 the shape' }, { sys: 'body-13', label: 'Gen 13 the floor' }, { sys: 'body-14', label: 'Gen 14 the outline' }, { sys: 'body-15', label: 'Gen 15 the flank' }, { sys: 'body-16', label: 'Gen 16 the corner' }, { sys: 'body-17', label: 'Gen 17 the track' }, { sys: 'body-18', label: 'Gen 18 the single seat' }] },
  { slot: 'battery', options: [{ sys: 'battery', label: 'Gen 1' }, { sys: 'battery-2', label: 'Gen 2 solid-state' }, { sys: 'battery-3', label: 'Gen 3 cell-to-body' }, { sys: 'battery-6', label: 'Gen 5 bipolar' }, { sys: 'battery-7', label: 'Gen 7 max-energy' }, { sys: 'battery-10', label: 'Gen 10 notched corner' }, { sys: 'battery-11', label: 'Gen 11 structural sill' }, { sys: 'battery-17', label: 'Gen 17 the track' }] },
  { slot: 'drivetrain', options: [{ sys: 'drivetrain', label: 'Gen 1' }, { sys: 'drivetrain-2', label: 'Gen 2 axial flux' }, { sys: 'drivetrain-3', label: 'Gen 3 in-wheel' }, { sys: 'drivetrain-6', label: 'Gen 5 apex' }, { sys: 'drivetrain-7', label: 'Gen 7 range' }, { sys: 'drivetrain-9', label: 'Gen 9 narrow front' }, { sys: 'drivetrain-17', label: 'Gen 17 the track' }] },
  { slot: 'wheels', options: [{ sys: 'wheels', label: 'Gen 1' }, { sys: 'wheels-2', label: 'Gen 2 low-loss' }, { sys: 'wheels-3', label: 'Gen 3 co-design' }, { sys: 'wheels-6', label: 'Gen 5 apex' }, { sys: 'wheels-7', label: 'Gen 7 narrow-track' }, { sys: 'wheels-9', label: 'Gen 9 matched track' }, { sys: 'wheels-10', label: 'Gen 10 the tire' }, { sys: 'wheels-11', label: 'Gen 11 rerouted harness' }, { sys: 'wheels-13', label: 'Gen 13 front pants' }, { sys: 'wheels-14', label: 'Gen 14 saddles' }, { sys: 'wheels-15', label: 'Gen 15 edges by the envelope' }, { sys: 'wheels-17', label: 'Gen 17 the track' }] },
  { slot: 'hv', options: [{ sys: 'hv', label: 'Gen 1' }, { sys: 'hv-4', label: 'Gen 4 zonal' }, { sys: 'hv-11', label: 'Gen 11 tandem spine' }, { sys: 'hv-15', label: 'Gen 15 port in from the flank' }, { sys: 'hv-18', label: 'Gen 18 port forward' }] },
  { slot: 'suspension', options: [{ sys: 'suspension', label: 'Gen 1' }, { sys: 'suspension-4', label: 'Gen 4 active' }, { sys: 'suspension-9', label: 'Gen 9 matched track' }, { sys: 'suspension-16', label: 'Gen 16 the corner' }, { sys: 'suspension-17', label: 'Gen 17 the track' }] },
  { slot: 'autonomy', options: [{ sys: 'autonomy', label: 'Gen 1' }, { sys: 'autonomy-4', label: 'Gen 4 triplex' }, { sys: 'autonomy-10', label: 'Gen 10 asymmetric' }, { sys: 'autonomy-11', label: 'Gen 11 tandem' }, { sys: 'autonomy-12', label: 'Gen 12 re-seat' }, { sys: 'autonomy-13', label: 'Gen 13 re-seat' }, { sys: 'autonomy-15', label: 'Gen 15 re-seat' }, { sys: 'autonomy-16', label: 'Gen 16 the corner' }, { sys: 'autonomy-17', label: 'Gen 17 the track' }, { sys: 'autonomy-18', label: 'Gen 18 re-seat' }] },
  { slot: 'interior', options: [{ sys: 'interior', label: 'Gen 1' }, { sys: 'interior-4', label: 'Gen 4 control cabin' }, { sys: 'interior-6', label: 'Gen 5 apex' }, { sys: 'interior-11', label: 'Gen 11 tandem' }, { sys: 'interior-13', label: 'Gen 13 shells on the lid' }, { sys: 'interior-14', label: 'Gen 14 the yoke' }, { sys: 'interior-15', label: 'Gen 15 dash in with the flank' }, { sys: 'interior-18', label: 'Gen 18 one seat' }] },
  { slot: 'thermal', options: [{ sys: 'thermal', label: 'Gen 1' }, { sys: 'thermal-6', label: 'Gen 5 two-phase' }, { sys: 'thermal-7', label: 'Gen 7 long-haul' }, { sys: 'thermal-9', label: 'Gen 9 low-auxiliary' }, { sys: 'thermal-11', label: 'Gen 11 tandem loop' }, { sys: 'thermal-13', label: 'Gen 13 core out of the occupant' }, { sys: 'thermal-15', label: 'Gen 15 core in from the flank' }, { sys: 'thermal-17', label: 'Gen 17 the track' }] },
];

/* Generations: coordinated variant presets, the optimization ladder. */
export const GENERATIONS = [
  {
    id: 'gen1', label: 'Gen 1',
    note: 'The honest reference platform: NMC 4680 pack, radial PMSM, stamped-and-cast body',
    choices: { body: 'body', battery: 'battery', drivetrain: 'drivetrain', wheels: 'wheels', hv: 'hv', suspension: 'suspension', autonomy: 'autonomy', thermal: 'thermal', interior: 'interior' },
  },
  {
    id: 'gen2', label: 'Gen 2',
    note: 'The optimization pass: solid-state pack, axial-flux drive, Kammback aero shell, low-loss corners',
    choices: { body: 'body-aero', battery: 'battery-2', drivetrain: 'drivetrain-2', wheels: 'wheels-2', hv: 'hv', suspension: 'suspension', autonomy: 'autonomy', thermal: 'thermal', interior: 'interior' },
  },
  {
    id: 'gen3', label: 'Gen 3',
    note: 'Integration: lofted monoform, cell-to-body pack, rear in-wheel motors, co-designed corners',
    choices: { body: 'body-3', battery: 'battery-3', drivetrain: 'drivetrain-3', wheels: 'wheels-3', hv: 'hv', suspension: 'suspension', autonomy: 'autonomy', thermal: 'thermal', interior: 'interior' },
  },
  {
    id: 'gen4', label: 'Gen 4',
    note: 'Control: 48 V zonal nervous system, active chassis, active-aero body, fail-operational triplex brain',
    choices: { body: 'body-4', battery: 'battery-3', drivetrain: 'drivetrain-3', wheels: 'wheels-3', hv: 'hv-4', suspension: 'suspension-4', autonomy: 'autonomy-4', thermal: 'thermal', interior: 'interior-4' },
  },
  {
    id: 'gen5', label: 'Gen 5',
    note: 'Apex: active-aero monoform, bipolar anode-free pack, 480 kW evolved in-wheel drive',
    choices: { body: 'body-6', battery: 'battery-6', drivetrain: 'drivetrain-6', wheels: 'wheels-6', hv: 'hv-4', suspension: 'suspension-4', autonomy: 'autonomy-4', thermal: 'thermal-6', interior: 'interior-6' },
  },
  {
    id: 'gen6', label: 'Gen 6',
    note: 'Form: the package drives the shape. New safety cage, lower roof, hard tumblehome, plan boat-tail',
    choices: { body: 'body-7', battery: 'battery-6', drivetrain: 'drivetrain-6', wheels: 'wheels-6', hv: 'hv-4', suspension: 'suspension-4', autonomy: 'autonomy-4', thermal: 'thermal-6', interior: 'interior-6' },
  },
  {
    id: 'gen7', label: 'Gen 7',
    note: 'Range: narrowed rear track unpins the tail, 190 kWh pack, part-load drive, long-haul thermal',
    choices: { body: 'body-7', battery: 'battery-7', drivetrain: 'drivetrain-7', wheels: 'wheels-7', hv: 'hv-4', suspension: 'suspension-4', autonomy: 'autonomy-4', thermal: 'thermal-7', interior: 'interior-6' },
  },
  {
    id: 'gen8', label: 'Gen 8',
    note: 'The tail: the narrow track finally lets the boat-tail close, every station inside the attached-flow limit',
    choices: { body: 'body-8', battery: 'battery-7', drivetrain: 'drivetrain-7', wheels: 'wheels-7', hv: 'hv-4', suspension: 'suspension-4', autonomy: 'autonomy-4', thermal: 'thermal-7', interior: 'interior-6' },
  },
  {
    /* Gen 9 runs FIVE new modules. drivetrain-9 exists only because a
       halfshaft length is a function of the track: drivetrain-7's front
       shafts land on wheels-7's hub face at |z| 0.7625 and would overrun
       wheels-9's at 0.6925 by 70 mm, and Gen 7 and Gen 8 still need the old
       length. See design/retro-gen9.md. */
    id: 'gen9', label: 'Gen 9',
    note: 'The front: the front track comes in to match the rear, the fairing collapses onto the flank, and auxiliary draw is attacked',
    choices: { body: 'body-9', battery: 'battery-7', drivetrain: 'drivetrain-9', wheels: 'wheels-9', hv: 'hv-4', suspension: 'suspension-9', autonomy: 'autonomy-4', thermal: 'thermal-9', interior: 'interior-6' },
  },
  {
    /* Gen 10 puts every target on the slot that OWNS its term, because Gen 8
       and Gen 9 both handed a target to a slot owning a minority of it.
       autonomy-10 takes compute, 68 percent of auxiliary. wheels-10 takes
       Crr, and books nothing, because there is no drum here and it says so.
       battery-10 books no range lever at all and exists to notch the corner
       where the pack fouled the tire. See design/gen10.md. */
    id: 'gen10', label: 'Gen 10',
    note: 'The slots that own their term: asymmetric compute, a tire that declines to claim what it cannot measure, and a pack notched clear of the wheel',
    choices: { body: 'body-9', battery: 'battery-10', drivetrain: 'drivetrain-9', wheels: 'wheels-10', hv: 'hv-4', suspension: 'suspension-9', autonomy: 'autonomy-10', thermal: 'thermal-9', interior: 'interior-6' },
  },
  {
    id: 'gen11', label: 'Gen 11',
    /* THE PACKAGE GENERATION. Ten rungs optimized inside a box nobody
       questioned: P.width 1.88, P.height 1.44, P.length 4.75 and
       P.wheelbase 2.90 never moved from the first commit. Gen 11 changes the
       box and leaves the platform alone underneath, which is the opposite of
       what it set out to do. A pack does not have to narrow when a cabin
       does: at the cells' own height there is no body beside them, and the
       pack's outer edge already hides inside the tire column. So the cabin
       comes to 1.20 m, the pack and the 1.48 m track do not move, and the
       0.0571 m2 of sliver that costs buys back all 190 kWh.
       Holding the track is what makes it affordable: SSF 1.53 against 1.24 at
       a narrowed track, and suspension-9 and drivetrain-9 carry unchanged. */
    note: 'The package: two occupants in tandem inside a 1.20 m cabin, on Gen 10\'s pack, track and corner left alone underneath',
    choices: { body: 'body-11', battery: 'battery-11', drivetrain: 'drivetrain-9', wheels: 'wheels-11', hv: 'hv-11', suspension: 'suspension-9', autonomy: 'autonomy-11', thermal: 'thermal-11', interior: 'interior-11' },
  },
  {
    id: 'gen12', label: 'Gen 12',
    note: 'The shape: rear wheel spats, the tail at full length, both streams attached to the Kamm. The first rung whose whole thesis is the measured coefficient',
    choices: { body: 'body-12', battery: 'battery-11', drivetrain: 'drivetrain-9', wheels: 'wheels-11', hv: 'hv-11', suspension: 'suspension-9', autonomy: 'autonomy-12', thermal: 'thermal-11', interior: 'interior-11' },
  },
  {
    /* THE FLOOR. design/gen13.md: the cabin was floored by a seat riser, not
       by the pack, so both seats become shells on battery-11's lid and the
       greenhouse, cowl and hood come down 65 mm with them; the front wheels
       get a fairing that steers with them; three carried defects are
       closed or named. The first rung whose brief is every column of the
       table against the running best, and the first measured under the
       third revision of tools/aero.js. */
    id: 'gen13', label: 'Gen 13',
    note: 'The floor: shells on the pack lid and the roof down 65 mm with them, front wheels in pants that steer, the recovery core out of the occupants, the tail box made luggage. Every column against the running best',
    choices: { body: 'body-13', battery: 'battery-11', drivetrain: 'drivetrain-9', wheels: 'wheels-13', hv: 'hv-11', suspension: 'suspension-9', autonomy: 'autonomy-13', thermal: 'thermal-13', interior: 'interior-13' },
  },
  {
    /* THE OUTLINE. design/gen14.md: what the frontal outline of Gen 13 still
       carried that nothing on the car needed. The rear tires were 70 percent
       of the wheel term behind a wall the method's own rule cannot see, so
       wheels-14 puts a crown band on each rear upright, the pant idea at the
       axle that does not steer, and brings the front pants down to the same
       18 mm; the side glass was 1.15 m wide beside a 0.165 m head, so body-14
       draws the greenhouse against the occupant and the flank cameras, the
       port, the bows and the liner stay seated; the hand wheel carried
       interior-6's 10 kg and a 16 Nm machine its own fail list called heavy,
       so interior-14 redraws it as the by-wire yoke and re-derives it. No
       method revision; the regen constant and the low-voltage lump are named
       for Davis and not booked. */
    id: 'gen14', label: 'Gen 14',
    note: 'The outline: rear saddles on the hub and the front pants brought down to 18 mm, the greenhouse drawn to the head instead of the flank, the hand wheel redrawn as the by-wire yoke. Every column against the rung below, no method revision',
    choices: { body: 'body-14', battery: 'battery-11', drivetrain: 'drivetrain-9', wheels: 'wheels-14', hv: 'hv-11', suspension: 'suspension-9', autonomy: 'autonomy-13', thermal: 'thermal-13', interior: 'interior-14' },
  },
  {
    /* THE FLANK. design/gen15.md: the last dimension of the frontal outline
       set by nothing the occupant needs. The probe of the flank band over
       |z| 0.44 to 0.60 found a recovery core, a charge port, two zone drops,
       two camera pads and the body's own pillars beside a 0.52 m pair of
       shoulders in a 1.20 m cabin, and the front casting's corners at 0.550
       set the new flank at 0.560. body-15 brings it in at every station from
       the front arch to the port and closes the cowl break to 15 degrees,
       the coefficient lever that makes the area lever a rung and not the
       trap of Gen 13 and Gen 14; thermal-15 re-folds the core 40 mm
       shallower, hv-15 takes the port and the front drops in, autonomy-15
       re-seats the camera pads, interior-15 moves the dashboard's side
       panels with the drops. Every tenant a planned fork; no method
       revision. And wheels-15, three edges of the fairings moved by
       millimeters because tools/envelope.sh, the wheel-envelope sweep this
       rung built, read 1.7 to 6.7 mm at the combined extremes of lock, rear
       steer and rebound on wheels-14. */
    id: 'gen15', label: 'Gen 15',
    note: 'The flank: the cabin in from 1.20 to 1.12 m from the shoulder up, where nothing but plumbing stood, and the cowl break closed to 15 degrees; four tenants moved as planned forks. Every column against the rung below, no method revision',
    choices: { body: 'body-15', battery: 'battery-11', drivetrain: 'drivetrain-9', wheels: 'wheels-15', hv: 'hv-15', suspension: 'suspension-9', autonomy: 'autonomy-15', thermal: 'thermal-15', interior: 'interior-15' },
  },
  {
    /* THE CORNER. design/gen16.md: the mass column's real lever, taken, and
       the coefficient's two last skin levers, taken, with the five-column
       rule as written and no relaxation. suspension-16 is suspension-9
       redrawn for the measured loads of a 1,269 kg car (every forged
       section at LOAD to the one third, every wall at LOAD, the bars at
       LOAD to the one quarter, the bellows and the rack bar at the square
       root) and, for the first time on this slot, every kilogram derived
       off the drawn geometry through tools/ledger.sh, which moved the
       ledger BOTH ways: the structures and the knuckles had booked 30 kg
       their drawings do not hold, and the decouplers and the rack had
       booked 12 kg less than their own bars weigh. Net 176 to 161.0 kg, and
       its half of every interface it lands on declared at last. body-16 is
       body-15 with the canopy glass flush with the loft (0.009 m2 of area
       the 8 mm step had been casting) and the tail's upper section shrunk
       from x -2.300 aft until the upper stream touches the 15 degree limit
       the method has always used, which is the tail lever retro-gen15
       named; the luggage bay's walls follow the ceiling down and the panel
       states what the bay lost. autonomy-16 re-seats the rear camera 45 mm
       under the new Kamm crown. Three modules, six carried, no method
       revision. */
    id: 'gen16', label: 'Gen 16',
    note: 'The corner: the suspension redrawn for the car it actually carries and its ledger derived off the drawing for the first time, both ways; the canopy glass flush; the tail\'s upper stream taken to the limit. Lightest car on the ladder and every column against the rung below',
    choices: { body: 'body-16', battery: 'battery-11', drivetrain: 'drivetrain-9', wheels: 'wheels-15', hv: 'hv-15', suspension: 'suspension-16', autonomy: 'autonomy-16', thermal: 'thermal-15', interior: 'interior-15' },
  },
  {
    /* THE TRACK. design/gen17.md: both axles 20 mm inboard, 1.48 to 1.44 m,
       so the tire's 135 mm section sits centered on the sill's 120 mm
       chambered section, which is the only reason the frontal outline
       falls at all below the shoulder (one axle alone makes it worse); the
       rear spat wall follows the tire in to 0.81; every corner translated
       with the upper arm 20 mm shorter because its inner pivot already
       sits 30 mm from the drive housing; the rear rings and the front
       shafts follow; the pack's corner keep-out moves with the tire and
       sixteen front-brick layers a side give 9.7 mm for it (189.8 kWh);
       the compute handover plane moves 20 mm off the tire; and the by-wire
       boss contract open since Gen 9 closes on hv-15's stub faces. Seven
       modules, two carried, no method revision; the checker's rear annulus
       band becomes a declaration. The stability budget re-derived by
       tools/cg.sh: SSF 1.58 laden at 1.44 against 1.63. */
    id: 'gen17', label: 'Gen 17',
    note: 'The track: both axles in 20 mm so the tire sits centered on the sill, the spat wall following, every corner translated and the by-wire contract closed at last. Every column against the rung below, thin on the coefficient and said so',
    choices: { body: 'body-17', battery: 'battery-17', drivetrain: 'drivetrain-17', wheels: 'wheels-17', hv: 'hv-15', suspension: 'suspension-17', autonomy: 'autonomy-17', thermal: 'thermal-17', interior: 'interior-15' },
  },
  {
    id: 'gen18', label: 'Gen 18',
    note: 'The single seat: the rear seat gone, the roof descending from the one head, the belt seam in, the charge port and the roof instruments re-seated; every column against the rung below, and the car carries one person',
    choices: { body: 'body-18', battery: 'battery-17', drivetrain: 'drivetrain-17', wheels: 'wheels-17', hv: 'hv-18', suspension: 'suspension-17', autonomy: 'autonomy-18', thermal: 'thermal-17', interior: 'interior-18' },
  },
];

/* The variant set built eagerly at startup: the TOP RUNG's nine choices plus
   all non-variant systems. Until 2026-08-22 this was every slot's FIRST
   option, which is Gen 1, and main.js opened the car on Gen 1; Davis asked
   for the model to start on the most advanced generation, so the last entry
   of GENERATIONS (the 'value' study is never registered) is what builds at
   startup and what main.js selects. A generation added at the end of the
   table becomes the startup rung by being added; nothing else moves. */
export const STARTUP_GEN = GENERATIONS[GENERATIONS.length - 1];
const DEFAULT_ACTIVE = new Set(MODULES.map((m) => m.SYSTEM.id));
for (const v of VARIANTS) for (const o of v.options) if (o.sys !== STARTUP_GEN.choices[v.slot]) DEFAULT_ACTIVE.delete(o.sys);

/* Every module's geometry passes through the static merge on its way out of
   here, so all 43 of them get the draw-call saving without a line changing
   in any of them. It runs at build time rather than in the viewer because
   this is the only place both entry points, startup assembly and a lazily
   built variant, already meet.

   merge: false is for measurement, not for production. tools/meshbudget.js
   builds a preset both ways and proves the merged scene carries the same
   world-space triangles as the unmerged one, which it cannot do if the
   unmerged build is unreachable. */
function finish(group, sysId, opts) {
  group.userData.sys = sysId;
  return opts && opts.merge === false ? group : mergeStatic(group);
}

export function assemble(opts) {
  const root = new THREE.Group();
  const systems = {};   // sysId -> { group, dir, def } for BUILT systems only
  const index = [];     // metadata for ALL systems: [{ key, sys, part, meta }]
  let mass = 0;

  for (const mod of MODULES) {
    const def = mod.SYSTEM;
    for (const [pid, meta] of Object.entries(def.parts)) {
      index.push({ key: def.id + '/' + pid, sys: def.id, part: pid, meta });
      mass += meta.mass || 0;
    }
    if (DEFAULT_ACTIVE.has(def.id)) {
      const group = finish(mod.build(), def.id, opts);
      root.add(group);
      systems[def.id] = { group, dir: def.explode, def };
    }
  }
  return { root, systems, index, mass };
}

/* Build one variant's geometry on demand. */
export function buildVariant(sysId, opts) {
  const mod = byId[sysId];
  if (!mod) return null;
  return { group: finish(mod.build(), sysId, opts), def: mod.SYSTEM };
}

export const SYSTEM_DEFS = MODULES.map((m) => m.SYSTEM);
