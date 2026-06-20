import { shuffle } from './rng';

/**
 * Shuffle-bag opponent rotation. Draws every item once (in random order)
 * before any item can repeat, then reshuffles automatically.
 */
export class ShuffleBag<T> {
  private source: T[];
  private queue: T[] = [];

  constructor(items: readonly T[]) {
    this.source = [...items];
    this.refill();
  }

  private refill(): void {
    this.queue = shuffle(this.source);
  }

  next(): T {
    if (this.queue.length === 0) this.refill();
    return this.queue.shift() as T;
  }

  /** Peek the upcoming order without consuming it. */
  remaining(): readonly T[] {
    return this.queue;
  }
}
