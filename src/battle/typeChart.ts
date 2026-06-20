import type { ElementType } from '@/types';

// Type triangle from plan.md:
//   Fire   > Nature
//   Water  > Fire
//   Nature > Water
export const ADVANTAGE: Record<ElementType, ElementType> = {
  fire: 'nature',
  water: 'fire',
  nature: 'water',
};

export const MULTIPLIER = {
  advantage: 1.5,
  neutral: 1.0,
  disadvantage: 0.75,
} as const;

/** Returns the damage multiplier for an attacker type vs a defender type. */
export function typeMultiplier(
  attacker: ElementType,
  defender: ElementType,
): number {
  if (attacker === defender) return MULTIPLIER.neutral;
  if (ADVANTAGE[attacker] === defender) return MULTIPLIER.advantage;
  // If the defender has advantage over the attacker, attacker is disadvantaged.
  if (ADVANTAGE[defender] === attacker) return MULTIPLIER.disadvantage;
  return MULTIPLIER.neutral;
}

export function effectivenessLabel(multiplier: number): string {
  if (multiplier > 1) return 'It\u2019s super effective!';
  if (multiplier < 1) return 'It\u2019s not very effective\u2026';
  return '';
}
