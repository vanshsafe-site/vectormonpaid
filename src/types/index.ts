// Shared domain types for Vectormon.

export type ElementType = 'fire' | 'water' | 'nature';

export type StatusEffect = 'burn' | 'freeze' | 'root';

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export type MoveKind = 'reliable' | 'strong' | 'risky' | 'signature';

export interface Move {
  id: string;
  name: string;
  kind: MoveKind;
  type: ElementType;
  power: number;
  accuracy: number; // 0..1
  /** Optional status this move can inflict. */
  inflicts?: StatusEffect;
  /** Probability (0..1) of inflicting the status when it hits. */
  inflictChance?: number;
  /** Probability (0..1) of a critical hit. Defaults applied in engine. */
  critChance?: number;
}

export interface MonsterSpecies {
  id: string;
  name: string;
  type: ElementType;
  description: string;
  baseStats: Stats;
  moves: [Move, Move, Move, Move];
  /** Accent color used by placeholder visuals/VFX. */
  color: string;
}

export interface Trainer {
  id: string;
  name: string;
  gender: 'male' | 'female';
  color: string;
}

/** A live combatant in a battle, derived from a species. */
export interface BattleMonster {
  speciesId: string;
  name: string;
  type: ElementType;
  color: string;
  maxHp: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  moves: Move[];
  status: StatusEffect | null;
  fainted: boolean;
}

export type BattleSide = 'player' | 'opponent';

export interface BattleTeam {
  trainer: Trainer;
  monsters: BattleMonster[];
  activeIndex: number;
}

export type BattlePhase =
  | 'intro'
  | 'select'
  | 'resolving'
  | 'switch'
  | 'victory'
  | 'defeat';

export interface BattleLogEntry {
  id: number;
  text: string;
}
