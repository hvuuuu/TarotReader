import type { CardOrientation } from '../app/types';
import { shuffle } from './shuffle';

export const REVERSED_PROBABILITY = 0.5;

/**
 * Determines card orientation using crypto.getRandomValues and REVERSED_PROBABILITY.
 */
export function getRandomOrientation(
  reversedProbability: number = REVERSED_PROBABILITY
): CardOrientation {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  const randomFraction = buffer[0] / 0x100000000;
  return randomFraction < reversedProbability ? 'reversed' : 'upright';
}

/**
 * Creates a new shuffled copy of a deck or array of card IDs.
 */
export function createShuffledDeck<T>(cardIds: readonly T[]): T[] {
  return shuffle(cardIds);
}

export interface DrawNextResult<T> {
  card: T;
  orientation: CardOrientation;
  positionKey?: string;
}

/**
 * Draws the next card from the deck based on how many cards were already picked.
 * Accepts either the count of picked cards or an array of previously picked items.
 */
export function drawNext<T>(
  deck: readonly T[],
  picked: number | readonly unknown[],
  positionKey?: string
): DrawNextResult<T> {
  const nextIndex = typeof picked === 'number' ? picked : picked.length;

  if (nextIndex < 0 || nextIndex >= deck.length) {
    throw new RangeError(
      `Cannot draw card at index ${nextIndex}. Deck has ${deck.length} cards.`
    );
  }

  const card = deck[nextIndex];
  const orientation = getRandomOrientation(REVERSED_PROBABILITY);

  return {
    card,
    orientation,
    ...(positionKey ? { positionKey } : {}),
  };
}
