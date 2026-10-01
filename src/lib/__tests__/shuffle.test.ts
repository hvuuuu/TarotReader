import { describe, expect, it } from 'vitest';
import { getSecureRandomInt, shuffle } from '../shuffle';

describe('shuffle', () => {
  it('shuffle returns a permutation of all 78 ids', () => {
    const cardIds = Array.from({ length: 78 }, (_, i) => `card_${i + 1}`);
    const originalCopy = [...cardIds];

    const shuffled = shuffle(cardIds);

    // Same length
    expect(shuffled).toHaveLength(78);

    // Original array was not mutated
    expect(cardIds).toEqual(originalCopy);

    // Contains all original IDs without duplicates (is a valid permutation)
    expect(new Set(shuffled).size).toBe(78);
    for (const id of cardIds) {
      expect(shuffled.includes(id)).toBe(true);
    }

    // Shuffled array is not strictly equal to the original ordering
    // (probability of 78 items staying in identical order is 1/78! ~ 0)
    expect(shuffled).not.toEqual(originalCopy);
  });

  it('handles empty and single-element arrays', () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle(['solo'])).toEqual(['solo']);
  });

  it('getSecureRandomInt generates integers strictly within [0, maxExclusive - 1]', () => {
    for (let i = 0; i < 100; i++) {
      const val = getSecureRandomInt(10);
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(10);
    }
    expect(getSecureRandomInt(1)).toBe(0);
    expect(getSecureRandomInt(0)).toBe(0);
  });
});
