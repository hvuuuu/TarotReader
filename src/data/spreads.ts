import type { SpreadId } from '../app/types';

export interface SpreadPosition {
  id: string;
  labelKey: string;
}

export interface Spread {
  id: SpreadId;
  cardCount: number;
  nameKey: string;
  descriptionKey: string;
  positions: readonly SpreadPosition[];
}

export const THREE_CARD_SPREAD: Spread = {
  id: 'three_cards',
  cardCount: 3,
  nameKey: 'spreads.three_cards.name',
  descriptionKey: 'spreads.three_cards.description',
  positions: [
    {
      id: 'current_situation',
      labelKey: 'spreads.three_cards.positions.current_situation',
    },
    {
      id: 'challenge',
      labelKey: 'spreads.three_cards.positions.challenge',
    },
    {
      id: 'guidance',
      labelKey: 'spreads.three_cards.positions.guidance',
    },
  ],
};

export const FIVE_CARD_SPREAD: Spread = {
  id: 'five_cards',
  cardCount: 5,
  nameKey: 'spreads.five_cards.name',
  descriptionKey: 'spreads.five_cards.description',
  positions: [
    {
      id: 'present_state',
      labelKey: 'spreads.five_cards.positions.present_state',
    },
    {
      id: 'obstacle',
      labelKey: 'spreads.five_cards.positions.obstacle',
    },
    {
      id: 'hidden_influence',
      labelKey: 'spreads.five_cards.positions.hidden_influence',
    },
    {
      id: 'recommended_action',
      labelKey: 'spreads.five_cards.positions.recommended_action',
    },
    {
      id: 'possible_direction',
      labelKey: 'spreads.five_cards.positions.possible_direction',
    },
  ],
};

export const SPREADS: Record<SpreadId, Spread> = {
  three_cards: THREE_CARD_SPREAD,
  five_cards: FIVE_CARD_SPREAD,
};

export const SPREAD_LIST: readonly Spread[] = [
  THREE_CARD_SPREAD,
  FIVE_CARD_SPREAD,
];
