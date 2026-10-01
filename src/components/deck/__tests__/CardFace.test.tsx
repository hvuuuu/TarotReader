import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { CardFace } from '../CardFace';
import type { Card } from '../../../app/types';

const mockMajorCard: Card = {
  id: '1',
  arcana: 'major',
  suit: null,
  name: {
    en: 'The Fool',
    vi: 'Chàng Khờ',
  },
  keywords: {
    upright: {
      en: ['spontaneity', 'fresh perspective', 'leaps of faith'],
      vi: ['sự hồn nhiên', 'góc nhìn mới', 'dấn thân'],
    },
    reversed: {
      en: ['recklessness', 'hesitation', 'fear of the unknown'],
      vi: ['sự liều lĩnh', 'sự do dự', 'nỗi sợ điều chưa biết'],
    },
  },
};

const mockWandsCard: Card = {
  id: '23',
  arcana: 'minor',
  suit: 'wands',
  name: {
    en: 'Ace of Wands',
    vi: 'Át Gậy',
  },
  keywords: {
    upright: {
      en: ['inspiration', 'creative impulse', 'initial spark'],
      vi: ['sự truyền cảm hứng', 'xung lực sáng tạo', 'tia lửa khởi phát'],
    },
    reversed: {
      en: ['creative stagnation', 'lack of spark', 'scattered passion'],
      vi: ['bế tắc ý tưởng', 'thiếu lửa nhiệt huyết', 'năng lượng phân tán'],
    },
  },
};

describe('CardFace component fallback spec', () => {
  it('renders major arcana fallback with Roman numeral and English name', () => {
    const html = renderToStaticMarkup(
      <CardFace card={mockMajorCard} language="en" forceFallback />
    );

    expect(html).toContain('The Fool');
    expect(html).toContain('Major Arcana');
    expect(html).toContain('spontaneity');
  });

  it('renders Vietnamese name and keywords when language is vi', () => {
    const html = renderToStaticMarkup(
      <CardFace card={mockMajorCard} language="vi" forceFallback />
    );

    expect(html).toContain('Chàng Khờ');
    expect(html).toContain('Ẩn Chính');
    expect(html).toContain('sự hồn nhiên');
  });

  it('renders minor arcana with suit rank and symbol', () => {
    const html = renderToStaticMarkup(
      <CardFace card={mockWandsCard} language="en" forceFallback />
    );

    expect(html).toContain('Ace of Wands');
    expect(html).toContain('wands');
    expect(html).toContain('inspiration');
  });

  it('renders reversed indicator and reversed keywords when orientation is reversed', () => {
    const html = renderToStaticMarkup(
      <CardFace card={mockMajorCard} orientation="reversed" language="en" forceFallback />
    );

    expect(html).toContain('Rev');
    expect(html).toContain('recklessness');
  });

  it('renders reversed badge in Vietnamese when language is vi', () => {
    const html = renderToStaticMarkup(
      <CardFace card={mockMajorCard} orientation="reversed" language="vi" forceFallback />
    );

    expect(html).toContain('Ngược');
    expect(html).toContain('sự liều lĩnh');
  });
});
