export type Language = 'en' | 'vi';

export type Category =
  | 'love'
  | 'career'
  | 'personal_growth'
  | 'finance'
  | 'daily';

export type SpreadId = 'three_cards' | 'five_cards';

export type CardArcana = 'major' | 'minor';

export type CardSuit = 'wands' | 'cups' | 'swords' | 'pentacles' | null;

export type CardOrientation = 'upright' | 'reversed';

export interface Card {
  id: string;
  arcana: CardArcana;
  suit: CardSuit;
  name: {
    en: string;
    vi: string;
  };
  keywords: {
    upright: {
      en: string[];
      vi: string[];
    };
    reversed: {
      en: string[];
      vi: string[];
    };
  };
}

export interface DrawnCard {
  card: Card;
  orientation: CardOrientation;
  positionKey: string;
}

export interface ReadingInput {
  name: string;
  category: Category;
  context: string;
  spreadId: SpreadId;
}

export type AppPhase = 'input' | 'drawing' | 'loading' | 'result';

export interface AppState {
  phase: AppPhase;
  language: Language;
  input: ReadingInput;
  shuffledDeck: Card[];
  drawnCards: DrawnCard[];
  readingMarkdown: string;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | {
      type: 'SET_INPUT_FIELD';
      payload: {
        field: keyof ReadingInput;
        value: ReadingInput[keyof ReadingInput];
      };
    }
  | { type: 'SET_INPUT'; payload: Partial<ReadingInput> }
  | { type: 'START_DRAW'; payload: { deck: Card[] } }
  | {
      type: 'PICK_NEXT_CARD';
      payload?: {
        card?: Card;
        orientation?: CardOrientation;
        positionKey?: string;
      };
    }
  | { type: 'SUBMIT_READING' }
  | { type: 'RECEIVE_STREAM_CHUNK'; payload: string }
  | { type: 'FINISH_READING' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };
