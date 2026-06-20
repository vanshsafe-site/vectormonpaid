import type {
  BattleMonster,
  BattleTeam,
  Move,
  MonsterSpecies,
  Trainer,
} from '@/types';
import { getSpecies } from '@/monsters/data';
import { computeDamage, BURN_DAMAGE_FACTOR, FREEZE_SKIP_CHANCE, ROOT_SPEED_FACTOR } from './damage';
import { effectivenessLabel } from './typeChart';
import { chance } from '@/utils/rng';

export function createBattleMonster(species: MonsterSpecies): BattleMonster {
  return {
    speciesId: species.id,
    name: species.name,
    type: species.type,
    color: species.color,
    maxHp: species.baseStats.hp,
    hp: species.baseStats.hp,
    attack: species.baseStats.attack,
    defense: species.baseStats.defense,
    speed: species.baseStats.speed,
    moves: species.moves,
    status: null,
    fainted: false,
  };
}

export function createTeam(trainer: Trainer, speciesIds: string[]): BattleTeam {
  return {
    trainer,
    monsters: speciesIds.map((id) => createBattleMonster(getSpecies(id))),
    activeIndex: 0,
  };
}

export function activeMonster(team: BattleTeam): BattleMonster {
  return team.monsters[team.activeIndex];
}

export function teamDefeated(team: BattleTeam): boolean {
  return team.monsters.every((m) => m.fainted);
}

/** Effective speed accounting for the Root status. */
export function effectiveSpeed(monster: BattleMonster): number {
  return monster.status === 'root'
    ? Math.round(monster.speed * ROOT_SPEED_FACTOR)
    : monster.speed;
}

export interface ResolvedAction {
  log: string[];
  attackerFainted: boolean;
  defenderFainted: boolean;
  damage: number;
  critical: boolean;
  missed: boolean;
}

/** Apply a single attack from attacker to defender, mutating both. */
export function performAttack(
  attacker: BattleMonster,
  defender: BattleMonster,
  move: Move,
): ResolvedAction {
  const log: string[] = [];

  // Freeze: chance to skip the turn entirely.
  if (attacker.status === 'freeze' && chance(FREEZE_SKIP_CHANCE)) {
    log.push(`${attacker.name} is frozen and could not move!`);
    return {
      log,
      attackerFainted: false,
      defenderFainted: false,
      damage: 0,
      critical: false,
      missed: true,
    };
  }

  log.push(`${attacker.name} used ${move.name}!`);
  const result = computeDamage(attacker, defender, move);

  if (result.missed) {
    log.push('But it missed!');
    return { log, attackerFainted: false, defenderFainted: false, damage: 0, critical: false, missed: true };
  }

  defender.hp = Math.max(0, defender.hp - result.damage);
  if (result.critical) log.push('A critical hit!');
  const eff = effectivenessLabel(result.multiplier);
  if (eff) log.push(eff);

  // Apply status on hit (only if defender has none and the move can inflict).
  if (
    move.inflicts &&
    !defender.fainted &&
    defender.hp > 0 &&
    defender.status === null &&
    chance(move.inflictChance ?? 0)
  ) {
    defender.status = move.inflicts;
    log.push(`${defender.name} is afflicted by ${move.inflicts}!`);
  }

  let defenderFainted = false;
  if (defender.hp <= 0) {
    defender.fainted = true;
    defenderFainted = true;
    log.push(`${defender.name} fainted!`);
  }

  return {
    log,
    attackerFainted: false,
    defenderFainted,
    damage: result.damage,
    critical: result.critical,
    missed: false,
  };
}

/** End-of-turn burn tick. Returns log lines and whether the monster fainted. */
export function applyBurnTick(monster: BattleMonster): { log: string[]; fainted: boolean } {
  const log: string[] = [];
  if (monster.status === 'burn' && !monster.fainted) {
    const dmg = Math.max(1, Math.round(monster.maxHp * BURN_DAMAGE_FACTOR));
    monster.hp = Math.max(0, monster.hp - dmg);
    log.push(`${monster.name} is hurt by its burn!`);
    if (monster.hp <= 0) {
      monster.fainted = true;
      log.push(`${monster.name} fainted!`);
      return { log, fainted: true };
    }
  }
  return { log, fainted: false };
}

/** Choose a simple opponent move (favor type advantage, else strongest safe). */
export function chooseAiMove(attacker: BattleMonster, defender: BattleMonster): Move {
  const advantage = attacker.moves.filter((m) => {
    return (
      (m.type === 'fire' && defender.type === 'nature') ||
      (m.type === 'water' && defender.type === 'fire') ||
      (m.type === 'nature' && defender.type === 'water')
    );
  });
  const pool = advantage.length > 0 ? advantage : attacker.moves;
  // Prefer high expected value: power * accuracy.
  return [...pool].sort((a, b) => b.power * b.accuracy - a.power * a.accuracy)[0];
}
