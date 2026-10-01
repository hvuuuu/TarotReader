import { describe, expect, it } from 'vitest';
import { appReducer, createInitialState } from '../reducer';
import type { Card } from '../types';

function createMockCard(id: string): Card {
  return {
    id,
    arcana: 'major',
    suit: null,
    name: {
      en: `Card ${id}`,
      vi: `Lá ${id}`,
    },
    keywords: {
      upright: { en: ['clarity'], vi: ['rõ ràng'] },
      reversed: { en: ['confusion'], vi: ['hoang mang'] },
    },
  };
}

describe('appReducer', () => {
  it('reducer RESET keeps language', () => {
    // Start with language 'vi'
    const initialState = createInitialState('vi');
    expect(initialState.language).toBe('vi');
    expect(initialState.phase).toBe('input');

    const mockDeck = [createMockCard('1'), createMockCard('2'), createMockCard('3')];

    // Transition state: change input, start drawing, pick cards, stream, set error
    let state = appReducer(initialState, {
      type: 'SET_INPUT_FIELD',
      payload: { field: 'name', value: 'Minh' },
    });
    state = appReducer(state, {
      type: 'SET_INPUT_FIELD',
      payload: { field: 'context', value: 'Chuyện sự nghiệp tương lai' },
    });
    state = appReducer(state, {
      type: 'START_DRAW',
      payload: { deck: mockDeck },
    });
    expect(state.phase).toBe('drawing');

    state = appReducer(state, { type: 'PICK_NEXT_CARD' });
    expect(state.drawnCards).toHaveLength(1);

    state = appReducer(state, { type: 'SUBMIT_READING' });
    expect(state.phase).toBe('loading');

    state = appReducer(state, {
      type: 'RECEIVE_STREAM_CHUNK',
      payload: 'Đang giải nghĩa...',
    });
    expect(state.readingMarkdown).toBe('Đang giải nghĩa...');

    state = appReducer(state, {
      type: 'SET_ERROR',
      payload: 'errors.network',
    });
    expect(state.error).toBe('errors.network');

    // Trigger RESET
    const resetState = appReducer(state, { type: 'RESET' });

    // Language must be preserved as 'vi'!
    expect(resetState.language).toBe('vi');
    // Other fields must be reset
    expect(resetState.phase).toBe('input');
    expect(resetState.drawnCards).toHaveLength(0);
    expect(resetState.shuffledDeck).toHaveLength(0);
    expect(resetState.readingMarkdown).toBe('');
    expect(resetState.error).toBeNull();
    expect(resetState.input.name).toBe('');
    expect(resetState.input.context).toBe('');
  });

  it('reducer RESET also keeps language when language is en', () => {
    const initialState = createInitialState('en');
    let state = appReducer(initialState, {
      type: 'SET_INPUT_FIELD',
      payload: { field: 'name', value: 'Alice' },
    });
    state = appReducer(state, {
      type: 'FINISH_READING',
    });
    expect(state.phase).toBe('result');

    const resetState = appReducer(state, { type: 'RESET' });
    expect(resetState.language).toBe('en');
    expect(resetState.phase).toBe('input');
    expect(resetState.input.name).toBe('');
  });

  it('handles state progression through all phases', () => {
    let state = createInitialState('en');

    // 1. Input phase updates
    state = appReducer(state, {
      type: 'SET_INPUT',
      payload: { category: 'career', spreadId: 'three_cards' },
    });
    expect(state.input.category).toBe('career');

    // 2. Start drawing
    const deck = [
      createMockCard('c1'),
      createMockCard('c2'),
      createMockCard('c3'),
      createMockCard('c4'),
    ];
    state = appReducer(state, {
      type: 'START_DRAW',
      payload: { deck },
    });
    expect(state.phase).toBe('drawing');
    expect(state.shuffledDeck).toHaveLength(4);

    // 3. Pick cards up to spread count (3)
    state = appReducer(state, { type: 'PICK_NEXT_CARD' });
    state = appReducer(state, { type: 'PICK_NEXT_CARD' });
    state = appReducer(state, { type: 'PICK_NEXT_CARD' });
    expect(state.drawnCards).toHaveLength(3);

    // Further picks should be ignored because 3 cards have been drawn
    state = appReducer(state, { type: 'PICK_NEXT_CARD' });
    expect(state.drawnCards).toHaveLength(3);

    // 4. Submit reading
    state = appReducer(state, { type: 'SUBMIT_READING' });
    expect(state.phase).toBe('loading');

    // 5. Stream chunks
    state = appReducer(state, {
      type: 'RECEIVE_STREAM_CHUNK',
      payload: 'Chunk 1. ',
    });
    state = appReducer(state, {
      type: 'RECEIVE_STREAM_CHUNK',
      payload: 'Chunk 2.',
    });
    expect(state.readingMarkdown).toBe('Chunk 1. Chunk 2.');

    // 6. Finish reading
    state = appReducer(state, { type: 'FINISH_READING' });
    expect(state.phase).toBe('result');
  });

  it('handles language change via SET_LANGUAGE', () => {
    let state = createInitialState('en');
    state = appReducer(state, { type: 'SET_LANGUAGE', payload: 'vi' });
    expect(state.language).toBe('vi');
  });
});
