import type { BattleMonster, Move } from '@/types';
import { typeMultiplier } from './typeChart';
import { chance } from '@/utils/rng';

export interface DamageResult {
  damage: number;
  multiplier: number;
  critical: boolean;
  missed: boolean;
}

export const CRIT_MULTIPLIER = 1.75;
export const DEFAULT_CRIT_CHANCE = 0.0625;
export const ROOT_SPEED_FACTOR = 0.5;
export const BURN_DAMAGE_FACTOR = 0.0625; // fraction of maxHp per turn
export const FREEZE_SKIP_CHANCE = 0.35;

/**
 * Core damage formula. Level is fixed at 100 internally, so it folds into the
 * constant below. Produces a small, readable, deterministic-feeling spread.
 */
export function computeDamage(
  attacker: BattleMonster,
  defender: BattleMonster,
  move: Move,
): DamageResult {
  if (!chance(move.accuracy)) {
    return { damage: 0, multiplier: 1, critical: false, missed: true };
  }

  const multiplier = typeMultiplier(move.type, defender.type);
  const critical = chance(move.critChance ?? DEFAULT_CRIT_CHANCE);
  const critFactor = critical ? CRIT_MULTIPLIER : 1;

  const base =
    ((2 * 100) / 5 + 2) *
    move.power *
    (attacker.attack / Math.max(1, defender.defense));
  const raw = (base / 50 + 2) * multiplier * critFactor;

  // Small randomness band (85%..100%) like classic battlers.
  const variance = 0.85 + Math.random() * 0.15;
  const damage = Math.max(1, Math.round(raw * variance * 0.1));

  return { damage, multiplier, critical, missed: false };
}
