// Small deterministic-friendly RNG helpers. Uses Math.random by default but is
// centralized so battle logic can be tested or seeded later.

export function chance(probability: number): boolean {
  return Math.random() < probability;
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/** Fisher-Yates shuffle returning a new array. */
export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
