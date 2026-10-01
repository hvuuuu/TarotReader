import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ResultScreen, formatReadingPlainText } from '../ResultScreen';
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
];

describe('ResultScreen component', () => {
  it('renders drawn cards, querent context, and reset button', () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLanguage="en">
        <ResultScreen
          language="en"
          input={{
            name: 'Alex',
            category: 'career',
            context: 'Looking for direction in my next project',
            spreadId: 'three_cards',
          }}
          drawnCards={mockDrawnCards}
          spreadId="three_cards"
          readingMarkdown=""
          isLoading={false}
          error={null}
          onLanguageChange={() => {}}
          onNewReading={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('Your Tarot Reflection');
    expect(html).toContain('Querent: Alex');
    expect(html).toContain('Looking for direction in my next project');
    expect(html).toContain('New Reading');
    expect(html).toContain('The Fool');
  });

  it('renders Vietnamese translations when language is vi', () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLanguage="vi">
        <ResultScreen
          language="vi"
          input={{
            name: 'Minh',
            category: 'daily',
            context: 'Định hướng cho ngày hôm nay',
            spreadId: 'three_cards',
          }}
          drawnCards={mockDrawnCards}
          spreadId="three_cards"
          readingMarkdown=""
          isLoading={false}
          error={null}
          onLanguageChange={() => {}}
          onNewReading={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('Góc Nhìn Chiêm Nghiệm Tarot');
    expect(html).toContain('Người hỏi: Minh');
    expect(html).toContain('Định hướng cho ngày hôm nay');
    expect(html).toContain('Trải bài mới');
    expect(html).toContain('Chàng Khờ');
  });

  it('renders initial loading state before first token arrives', () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLanguage="en">
        <ResultScreen
          language="en"
          input={{
            name: 'Alex',
            category: 'career',
            context: '',
            spreadId: 'three_cards',
          }}
          drawnCards={mockDrawnCards}
          spreadId="three_cards"
          readingMarkdown=""
          isLoading={true}
          error={null}
          onLanguageChange={() => {}}
          onNewReading={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('Reflecting on Your Cards');
    expect(html).toContain('Consulting archetypal wisdom');
  });

  it('renders live streamed markdown with subtle typing cursor during streaming', () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLanguage="en">
        <ResultScreen
          language="en"
          input={{
            name: 'Alex',
            category: 'career',
            context: '',
            spreadId: 'three_cards',
          }}
          drawnCards={mockDrawnCards}
          spreadId="three_cards"
          readingMarkdown="## 1. Current Energy & Life Phase"
          isLoading={true}
          error={null}
          onLanguageChange={() => {}}
          onNewReading={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('1. Current Energy &amp; Life Phase');
    // Subtle typing cursor is rendered while isLoading is true
    expect(html).toContain('title="Streaming..."');
  });

  it('renders error alert with Retry button when error is set', () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLanguage="en">
        <ResultScreen
          language="en"
          input={{
            name: 'Alex',
            category: 'career',
            context: '',
            spreadId: 'three_cards',
          }}
          drawnCards={mockDrawnCards}
          spreadId="three_cards"
          readingMarkdown=""
          isLoading={false}
          error="errors.rate_limited"
          onLanguageChange={() => {}}
          onNewReading={() => {}}
          onRetry={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('currently busy (rate limit reached). Please wait about 1 minute');
    expect(html).toContain('Retry');
  });

  it('formats complete plain text reading with card list correctly for copy', () => {
    const t = (key: string, params?: Record<string, string | number>) => {
      if (params?.name) return `Querent: ${params.name}`;
      if (params?.context) return `Question: ${params.context}`;
      if (key === 'result.title') return 'Your Tarot Reflection';
      if (key === 'input.spread_label') return 'Select Spread';
      if (key === 'input.category_label') return 'Area of Inquiry';
      if (key === 'categories.career') return 'Career & Work';
      if (key === 'result.cards_drawn_heading') return 'Cards Drawn';
      if (key === 'orientations.upright') return 'Upright';
      if (key === 'spreads.three_cards.positions.current_situation') return 'Current Situation';
      if (key === 'app.disclaimer') return 'Tarot is a psychological mirror';
      return key;
    };

    const text = formatReadingPlainText({
      input: {
        name: 'Jordan',
        category: 'career',
        context: 'Next career step',
        spreadId: 'three_cards',
      },
      spreadName: '3-Card Spread',
      drawnCards: mockDrawnCards,
      readingMarkdown: '## 1. Energy\n\nGood vibes.',
      language: 'en',
      t,
    });

    expect(text).toContain('YOUR TAROT REFLECTION');
    expect(text).toContain('Querent: Jordan');
    expect(text).toContain('Area of Inquiry: Career & Work');
    expect(text).toContain('1. Current Situation: The Fool (Upright)');
    expect(text).toContain('## 1. Energy');
    expect(text).toContain('Tarot is a psychological mirror');
  });
});
