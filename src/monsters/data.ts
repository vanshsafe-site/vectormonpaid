import type { MonsterSpecies } from '@/types';

// 12 original monsters across 3 types, fixed Level-100 stats, 4 moves each
// (reliable / strong / risky / signature). Names are original placeholders.
export const MONSTERS: MonsterSpecies[] = [
  {
    id: 'pyron',
    name: 'Pyron',
    type: 'fire',
    color: '#ff5a36',
    description: 'A blazing core wrapped in living embers.',
    baseStats: { hp: 240, attack: 130, defense: 95, speed: 110 },
    moves: [
      { id: 'pyron-1', name: 'Ember Jab', kind: 'reliable', type: 'fire', power: 45, accuracy: 0.98 },
      { id: 'pyron-2', name: 'Flame Burst', kind: 'strong', type: 'fire', power: 70, accuracy: 0.9 },
      { id: 'pyron-3', name: 'Overheat Dive', kind: 'risky', type: 'fire', power: 95, accuracy: 0.72 },
      { id: 'pyron-sig', name: 'Solar Lance', kind: 'signature', type: 'fire', power: 85, accuracy: 0.9, inflicts: 'burn', inflictChance: 0.4 },
    ],
  },
  {
    id: 'emberix',
    name: 'Emberix',
    type: 'fire',
    color: '#ff7a1a',
    description: 'A swift raptor trailing sparks.',
    baseStats: { hp: 215, attack: 120, defense: 85, speed: 135 },
    moves: [
      { id: 'emberix-1', name: 'Spark Peck', kind: 'reliable', type: 'fire', power: 42, accuracy: 0.98 },
      { id: 'emberix-2', name: 'Cinder Slash', kind: 'strong', type: 'fire', power: 68, accuracy: 0.9 },
      { id: 'emberix-3', name: 'Wild Blaze', kind: 'risky', type: 'fire', power: 92, accuracy: 0.7 },
      { id: 'emberix-sig', name: 'Phoenix Rush', kind: 'signature', type: 'fire', power: 80, accuracy: 0.92, critChance: 0.2 },
    ],
  },
  {
    id: 'volflare',
    name: 'Volflare',
    type: 'fire',
    color: '#ff3d3d',
    description: 'A volcanic brute of molten plates.',
    baseStats: { hp: 280, attack: 140, defense: 120, speed: 70 },
    moves: [
      { id: 'volflare-1', name: 'Magma Punch', kind: 'reliable', type: 'fire', power: 48, accuracy: 0.97 },
      { id: 'volflare-2', name: 'Lava Slam', kind: 'strong', type: 'fire', power: 75, accuracy: 0.88 },
      { id: 'volflare-3', name: 'Eruption', kind: 'risky', type: 'fire', power: 105, accuracy: 0.68 },
      { id: 'volflare-sig', name: 'Caldera Crush', kind: 'signature', type: 'fire', power: 90, accuracy: 0.88, inflicts: 'burn', inflictChance: 0.5 },
    ],
  },
  {
    id: 'magmite',
    name: 'Magmite',
    type: 'fire',
    color: '#ffa83d',
    description: 'A tiny coal sprite with a fierce temper.',
    baseStats: { hp: 200, attack: 115, defense: 100, speed: 120 },
    moves: [
      { id: 'magmite-1', name: 'Coal Toss', kind: 'reliable', type: 'fire', power: 44, accuracy: 0.98 },
      { id: 'magmite-2', name: 'Heat Wave', kind: 'strong', type: 'fire', power: 66, accuracy: 0.9 },
      { id: 'magmite-3', name: 'Meltdown', kind: 'risky', type: 'fire', power: 90, accuracy: 0.72 },
      { id: 'magmite-sig', name: 'Ember Storm', kind: 'signature', type: 'fire', power: 78, accuracy: 0.92, inflicts: 'burn', inflictChance: 0.35 },
    ],
  },
  {
    id: 'aquava',
    name: 'Aquava',
    type: 'water',
    color: '#2fa8ff',
    description: 'A graceful current given form.',
    baseStats: { hp: 245, attack: 118, defense: 105, speed: 112 },
    moves: [
      { id: 'aquava-1', name: 'Bubble Jet', kind: 'reliable', type: 'water', power: 45, accuracy: 0.98 },
      { id: 'aquava-2', name: 'Wave Crash', kind: 'strong', type: 'water', power: 70, accuracy: 0.9 },
      { id: 'aquava-3', name: 'Riptide', kind: 'risky', type: 'water', power: 95, accuracy: 0.72 },
      { id: 'aquava-sig', name: 'Tidal Spiral', kind: 'signature', type: 'water', power: 84, accuracy: 0.9, inflicts: 'freeze', inflictChance: 0.3 },
    ],
  },
  {
    id: 'tidera',
    name: 'Tidera',
    type: 'water',
    color: '#1f7dd6',
    description: 'A deep-sea guardian of calm power.',
    baseStats: { hp: 285, attack: 122, defense: 125, speed: 78 },
    moves: [
      { id: 'tidera-1', name: 'Aqua Jab', kind: 'reliable', type: 'water', power: 47, accuracy: 0.97 },
      { id: 'tidera-2', name: 'Whirl Slam', kind: 'strong', type: 'water', power: 74, accuracy: 0.88 },
      { id: 'tidera-3', name: 'Maelstrom', kind: 'risky', type: 'water', power: 104, accuracy: 0.68 },
      { id: 'tidera-sig', name: 'Abyss Pull', kind: 'signature', type: 'water', power: 88, accuracy: 0.88, inflicts: 'freeze', inflictChance: 0.4 },
    ],
  },
  {
    id: 'splashock',
    name: 'Splashock',
    type: 'water',
    color: '#3fc6ff',
    description: 'A charged jellyfish humming with static.',
    baseStats: { hp: 220, attack: 124, defense: 90, speed: 128 },
    moves: [
      { id: 'splashock-1', name: 'Drizzle Zap', kind: 'reliable', type: 'water', power: 43, accuracy: 0.98 },
      { id: 'splashock-2', name: 'Surge Burst', kind: 'strong', type: 'water', power: 69, accuracy: 0.9 },
      { id: 'splashock-3', name: 'Storm Surge', kind: 'risky', type: 'water', power: 93, accuracy: 0.7 },
      { id: 'splashock-sig', name: 'Hydro Shock', kind: 'signature', type: 'water', power: 82, accuracy: 0.92, critChance: 0.2 },
    ],
  },
  {
    id: 'cryofin',
    name: 'Cryofin',
    type: 'water',
    color: '#7fe3ff',
    description: 'An icy shark that glides through frost.',
    baseStats: { hp: 235, attack: 128, defense: 100, speed: 114 },
    moves: [
      { id: 'cryofin-1', name: 'Frost Nip', kind: 'reliable', type: 'water', power: 46, accuracy: 0.98 },
      { id: 'cryofin-2', name: 'Ice Lance', kind: 'strong', type: 'water', power: 71, accuracy: 0.9 },
      { id: 'cryofin-3', name: 'Glacier Slam', kind: 'risky', type: 'water', power: 96, accuracy: 0.72 },
      { id: 'cryofin-sig', name: 'Polar Vortex', kind: 'signature', type: 'water', power: 86, accuracy: 0.9, inflicts: 'freeze', inflictChance: 0.45 },
    ],
  },
  {
    id: 'thornix',
    name: 'Thornix',
    type: 'nature',
    color: '#3fc46a',
    description: 'A bramble beast bristling with spines.',
    baseStats: { hp: 250, attack: 126, defense: 110, speed: 100 },
    moves: [
      { id: 'thornix-1', name: 'Thorn Jab', kind: 'reliable', type: 'nature', power: 46, accuracy: 0.98 },
      { id: 'thornix-2', name: 'Bramble Slam', kind: 'strong', type: 'nature', power: 72, accuracy: 0.9 },
      { id: 'thornix-3', name: 'Wild Growth', kind: 'risky', type: 'nature', power: 97, accuracy: 0.72 },
      { id: 'thornix-sig', name: 'Spike Cyclone', kind: 'signature', type: 'nature', power: 85, accuracy: 0.9, inflicts: 'root', inflictChance: 0.5 },
    ],
  },
  {
    id: 'florawk',
    name: 'Florawk',
    type: 'nature',
    color: '#5fd86f',
    description: 'A petal hawk that rides pollen winds.',
    baseStats: { hp: 218, attack: 120, defense: 88, speed: 132 },
    moves: [
      { id: 'florawk-1', name: 'Leaf Peck', kind: 'reliable', type: 'nature', power: 43, accuracy: 0.98 },
      { id: 'florawk-2', name: 'Petal Slash', kind: 'strong', type: 'nature', power: 68, accuracy: 0.9 },
      { id: 'florawk-3', name: 'Gale Bloom', kind: 'risky', type: 'nature', power: 92, accuracy: 0.7 },
      { id: 'florawk-sig', name: 'Bloom Storm', kind: 'signature', type: 'nature', power: 80, accuracy: 0.92, inflicts: 'root', inflictChance: 0.35 },
    ],
  },
  {
    id: 'mossaur',
    name: 'Mossaur',
    type: 'nature',
    color: '#2f9e57',
    description: 'An ancient mossy titan, slow but mighty.',
    baseStats: { hp: 290, attack: 138, defense: 128, speed: 66 },
    moves: [
      { id: 'mossaur-1', name: 'Vine Punch', kind: 'reliable', type: 'nature', power: 48, accuracy: 0.97 },
      { id: 'mossaur-2', name: 'Root Slam', kind: 'strong', type: 'nature', power: 75, accuracy: 0.88 },
      { id: 'mossaur-3', name: 'Forest Quake', kind: 'risky', type: 'nature', power: 105, accuracy: 0.68 },
      { id: 'mossaur-sig', name: 'Ancient Grasp', kind: 'signature', type: 'nature', power: 90, accuracy: 0.88, inflicts: 'root', inflictChance: 0.55 },
    ],
  },
  {
    id: 'vineon',
    name: 'Vineon',
    type: 'nature',
    color: '#6fe39a',
    description: 'A lithe vine serpent with a coiling strike.',
    baseStats: { hp: 232, attack: 127, defense: 98, speed: 116 },
    moves: [
      { id: 'vineon-1', name: 'Coil Jab', kind: 'reliable', type: 'nature', power: 46, accuracy: 0.98 },
      { id: 'vineon-2', name: 'Whip Lash', kind: 'strong', type: 'nature', power: 71, accuracy: 0.9 },
      { id: 'vineon-3', name: 'Strangle Vine', kind: 'risky', type: 'nature', power: 96, accuracy: 0.72 },
      { id: 'vineon-sig', name: 'Verdant Bind', kind: 'signature', type: 'nature', power: 85, accuracy: 0.9, inflicts: 'root', inflictChance: 0.45 },
    ],
  },
];

export const MONSTERS_BY_ID: Record<string, MonsterSpecies> = Object.fromEntries(
  MONSTERS.map((m) => [m.id, m]),
);

export function getSpecies(id: string): MonsterSpecies {
  const s = MONSTERS_BY_ID[id];
  if (!s) throw new Error(`Unknown monster species: ${id}`);
  return s;
}
