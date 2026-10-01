import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { InputScreen } from '../InputScreen';
import { I18nProvider } from '../../../i18n/I18nContext';
import { INITIAL_INPUT } from '../../../app/reducer';

describe('InputScreen component', () => {
  it('renders correctly with English i18n keys', () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLanguage="en">
        <InputScreen
          input={INITIAL_INPUT}
          language="en"
          onInputChange={() => {}}
          onLanguageChange={() => {}}
          onStart={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('Area of Inquiry');
    expect(html).toContain('Select Spread');
    expect(html).toContain('Shuffle &amp; Draw Cards');
    expect(html).toContain('3-Card Spread');
    expect(html).toContain('5-Card Spread');
  });

  it('renders correctly with Vietnamese i18n keys', () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLanguage="vi">
        <InputScreen
          input={INITIAL_INPUT}
          language="vi"
          onInputChange={() => {}}
          onLanguageChange={() => {}}
          onStart={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('Chủ đề câu hỏi');
    expect(html).toContain('Chọn trải bài');
    expect(html).toContain('Xáo bài &amp; Bắt đầu rút');
    expect(html).toContain('Trải bài 3 lá');
    expect(html).toContain('Trải bài 5 lá');
  });

  it('displays character counter for context textarea', () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLanguage="en">
        <InputScreen
          input={{
            ...INITIAL_INPUT,
            context: 'Test inquiry context',
          }}
          language="en"
          onInputChange={() => {}}
          onLanguageChange={() => {}}
          onStart={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('20/1500 characters');
  });
});
