import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { TarotSerpentineDeck } from '../TarotSerpentineDeck';

describe('TarotSerpentineDeck component', () => {
  it('renders all 78 cards along serpentine winding path with proper aria labels', () => {
    const html = renderToStaticMarkup(
      <TarotSerpentineDeck
        language="en"
        pickedDeckIndices={[]}
        isComplete={false}
        isSpreading={false}
        shouldReduceMotion={false}
        onPickCard={() => {}}
        getCardAriaLabel={(idx) => `Tarot card ${idx}`}
        getPickHelpText={() => 'Click to pick'}
      />
    );

    expect(html).toContain('Tarot card 1');
    expect(html).toContain('Tarot card 78');
    expect(html).toContain('data-card-index="0"');
    expect(html).toContain('data-card-index="77"');
  });

  it('marks picked cards as disabled and reduces opacity', () => {
    const html = renderToStaticMarkup(
      <TarotSerpentineDeck
        language="en"
        pickedDeckIndices={[0, 42]}
        isComplete={false}
        isSpreading={false}
        shouldReduceMotion={false}
        onPickCard={() => {}}
        getCardAriaLabel={(idx) => `Tarot card ${idx}`}
        getPickHelpText={() => 'Click to pick'}
      />
    );

    expect(html).toContain('disabled=""');
    expect(html).toContain('opacity:0.12');
    expect(html).toContain('cursor-not-allowed');
  });
});
