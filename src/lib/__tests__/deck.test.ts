import { describe, expect, it } from 'vitest';
import {
  createShuffledDeck,
  drawNext,
  getRandomOrientation,
  REVERSED_PROBABILITY,
} from '../deck';

describe('deck logic', () => {
  it('has REVERSED_PROBABILITY equal to 0.5', () => {
    expect(REVERSED_PROBABILITY).toBe(0.5);
  });

  it('no duplicate card in a full spread draw', () => {
    const cardIds = Array.from({ length: 78 }, (_, i) => `card_${i + 1}`);
    const deck = createShuffledDeck(cardIds);

    // Test a 5-card full spread draw
    const drawn5: string[] = [];
    for (let i = 0; i < 5; i++) {
      const result = drawNext(deck, drawn5, `pos_${i}`);
      expect(['upright', 'reversed']).toContain(result.orientation);
      expect(result.positionKey).toBe(`pos_${i}`);
      drawn5.push(result.card);
    }

    expect(drawn5).toHaveLength(5);
    expect(new Set(drawn5).size).toBe(5);

    // Test a full 78-card draw ensuring zero duplicates across the entire deck
    const drawnAll: string[] = [];
    for (let i = 0; i < deck.length; i++) {
      const result = drawNext(deck, i);
      drawnAll.push(result.card);
    }

    expect(drawnAll).toHaveLength(78);
    expect(new Set(drawnAll).size).toBe(78);
  });

  it('no duplicate cards across 1000 simulated draws of 3-card and 5-card spreads', () => {
    const cardIds = Array.from({ length: 78 }, (_, i) => `card_${i + 1}`);

    for (let sim = 0; sim < 1000; sim++) {
      const deck = createShuffledDeck(cardIds);
      const spreadSize = sim % 2 === 0 ? 3 : 5;
      const drawn: string[] = [];

      for (let i = 0; i < spreadSize; i++) {
        const result = drawNext(deck, drawn);
        drawn.push(result.card);
      }

      expect(drawn).toHaveLength(spreadSize);
      expect(new Set(drawn).size).toBe(spreadSize);
    }
  });

  it('throws RangeError when drawing beyond deck size', () => {
    const deck = ['c1', 'c2'];
    expect(() => drawNext(deck, 2)).toThrow(RangeError);
    expect(() => drawNext(deck, -1)).toThrow(RangeError);
  });

  it('getRandomOrientation produces upright or reversed', () => {
    const sample = Array.from({ length: 50 }, () => getRandomOrientation());
    expect(sample.every((o) => o === 'upright' || o === 'reversed')).toBe(true);
  });
});
