import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { DrawScreen } from '../DrawScreen';
import { I18nProvider } from '../../../i18n/I18nContext';
import type { DrawnCard } from '../../../app/types';

const mockDrawnCards: DrawnCard[] = [
  {
    card: {
      id: '1',
      arcana: 'major',
      suit: null,
      name: { en: 'The Fool', vi: 'Chàng Khờ' },
      keywords: {
        upright: { en: ['spontaneity'], vi: ['sự hồn nhiên'] },
        reversed: { en: ['recklessness'], vi: ['sự liều lĩnh'] },
      },
    },
    orientation: 'upright',
    positionKey: 'spreads.three_cards.positions.current_situation',
  },
  {
    card: {
      id: '2',
      arcana: 'major',
      suit: null,
      name: { en: 'The Magician', vi: 'Ảo Thuật Gia' },
      keywords: {
        upright: { en: ['manifestation'], vi: ['sự hiện thực hóa'] },
        reversed: { en: ['manipulation'], vi: ['thao túng'] },
      },
    },
    orientation: 'reversed',
    positionKey: 'spreads.three_cards.positions.challenge',
  },
  {
    card: {
      id: '3',
      arcana: 'major',
      suit: null,
      name: { en: 'The High Priestess', vi: 'Nữ Tư Tế' },
      keywords: {
        upright: { en: ['intuition'], vi: ['trực giác'] },
        reversed: { en: ['secrets'], vi: ['bí mật'] },
      },
    },
    orientation: 'upright',
    positionKey: 'spreads.three_cards.positions.guidance',
  },
];

describe('DrawScreen component', () => {
  it('renders drawing state with empty spread slots and deck', () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLanguage="en">
        <DrawScreen
          language="en"
          drawnCards={[]}
          spreadId="three_cards"
          onLanguageChange={() => {}}
          onPickCard={() => {}}
          onRevealReading={() => {}}
          onReset={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('Draw Your Cards');
    expect(html).toContain('0 of 3 cards drawn');
    expect(html).toContain('Current Situation');
    expect(html).toContain('Challenge or Hidden Factor');
    expect(html).toContain('Guidance');
    // Deck cards present
    expect(html).toContain('Tarot card 1');
    expect(html).toContain('Tarot card 78');
  });

  it('renders completed drawing state with reveal button enabled', () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLanguage="en">
        <DrawScreen
          language="en"
          drawnCards={mockDrawnCards}
          spreadId="three_cards"
          onLanguageChange={() => {}}
          onPickCard={() => {}}
          onRevealReading={() => {}}
          onReset={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('3 of 3 cards drawn');
    expect(html).toContain('Reveal Reading');
    expect(html).toContain('The Fool');
    expect(html).toContain('The Magician');
    expect(html).toContain('The High Priestess');
  });
});
