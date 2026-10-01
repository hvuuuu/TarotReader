import type { AppAction, AppState, Language, ReadingInput } from './types';
import { SPREADS } from '../data/spreads';
import { getRandomOrientation } from '../lib/deck';

export const INITIAL_INPUT: ReadingInput = {
  name: '',
  category: 'daily',
  context: '',
  spreadId: 'three_cards',
};

export function createInitialState(language: Language = 'en'): AppState {
  return {
    phase: 'input',
    language,
    input: { ...INITIAL_INPUT },
    shuffledDeck: [],
    drawnCards: [],
    readingMarkdown: '',
    error: null,
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };

    case 'SET_INPUT_FIELD':
      return {
        ...state,
        input: {
          ...state.input,
          [action.payload.field]: action.payload.value,
        },
      };

    case 'SET_INPUT':
      return {
        ...state,
        input: {
          ...state.input,
          ...action.payload,
        },
      };

    case 'START_DRAW':
      return {
        ...state,
        phase: 'drawing',
        shuffledDeck: action.payload.deck,
        drawnCards: [],
        readingMarkdown: '',
        error: null,
      };

    case 'PICK_NEXT_CARD': {
      const spread = SPREADS[state.input.spreadId] ?? SPREADS.three_cards;
      const nextIndex = state.drawnCards.length;

      if (nextIndex >= spread.cardCount) {
        return state;
      }

      const card = action.payload?.card ?? state.shuffledDeck[nextIndex];
      if (!card) {
        return {
          ...state,
          error: 'errors.generic',
        };
      }

      const orientation =
        action.payload?.orientation ?? getRandomOrientation();
      const positionKey =
        action.payload?.positionKey ??
        spread.positions[nextIndex]?.labelKey ??
        `position_${nextIndex}`;

      return {
        ...state,
        drawnCards: [
          ...state.drawnCards,
          {
            card,
            orientation,
            positionKey,
          },
        ],
      };
    }

    case 'SUBMIT_READING':
      return {
        ...state,
        phase: 'loading',
        readingMarkdown: '',
        error: null,
      };

    case 'RECEIVE_STREAM_CHUNK':
      return {
        ...state,
        readingMarkdown: state.readingMarkdown + action.payload,
      };

    case 'FINISH_READING':
      return {
        ...state,
        phase: 'result',
      };

    case 'SET_ERROR':
      return {
        ...state,
        phase: 'result',
        error: action.payload,
      };

    case 'RESET':
      return createInitialState(state.language);

    default:
      return state;
  }
}
