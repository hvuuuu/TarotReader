import type { ReadingRequest } from './provider';
import { SPREADS } from '../data/spreads';
import { translate } from '../i18n/I18nContext';
import type { TranslationKey } from '../i18n/I18nContext';

/**
 * Strip any closing `</user_context>` from user text to prevent prompt injection.
 * Also strips the opening `<user_context>` tag for safety.
 */
function sanitizeContext(text: string): string {
  return text
    .replace(/<\/user_context>/gi, '')
    .replace(/<user_context>/gi, '');
}

/**
 * Builds the user message for the LLM from the current app state.
 */
export function buildUserMessage(req: ReadingRequest): string {
  const { language, name, category, drawnCards, context } = req;
  const spread = SPREADS[req.spreadId] ?? SPREADS.three_cards;

  const categoryLabel = translate(
    language,
    `categories.${category}` as TranslationKey,
  );

  const cardLines = drawnCards.map((drawn, idx) => {
    const pos = spread.positions[idx];
    const positionLabel = pos
      ? translate(language, pos.labelKey as TranslationKey)
      : `Position ${idx + 1}`;

    const nameLocalized = drawn.card.name[language];
    const nameEn = drawn.card.name.en;
    const orientation = drawn.orientation;

    const keywords =
      drawn.card.keywords[orientation][language].join(', ');

    return `- position: ${positionLabel} | card: ${nameLocalized} (${nameEn}) | orientation: ${orientation} | keywords: ${keywords}`;
  });

  const sanitized = sanitizeContext(context);

  return `<reading_request>
language: ${language}
name: ${name}
category: ${categoryLabel}
spread: ${translate(language, spread.nameKey as TranslationKey)}
cards:
${cardLines.join('\n')}
<user_context>
${sanitized}
</user_context>
</reading_request>`;
}
