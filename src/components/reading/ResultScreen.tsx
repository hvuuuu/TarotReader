import { useState, useRef, useEffect, useId } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useReducedMotion } from 'motion/react';
import type { DrawnCard, Language, ReadingInput, SpreadId } from '../../app/types';
import { useI18n, type TranslationKey } from '../../i18n/I18nContext';
import { SPREADS } from '../../data/spreads';
import { AppHeader } from '../common/AppHeader';
import { CardFace } from '../deck/CardFace';

export interface ResultScreenProps {
  language: Language;
  input: ReadingInput;
  drawnCards: DrawnCard[];
  spreadId: SpreadId;
  readingMarkdown: string;
  isLoading: boolean;
  error: string | null;
  onLanguageChange: (lang: Language) => void;
  onNewReading: () => void;
  onRetry?: () => void;
}

/** Formats a complete plain-text representation of the reading including cards list for copying */
export function formatReadingPlainText({
  input,
  spreadName,
  drawnCards,
  readingMarkdown,
  language,
  t,
}: {
  input: ReadingInput;
  spreadName: string;
  drawnCards: DrawnCard[];
  readingMarkdown: string;
  language: Language;
  t: (key: string, params?: Record<string, string | number>) => string;
}): string {
  const parts: string[] = [];

  // Title header
  parts.push(`✦ ${t('result.title').toUpperCase()} ✦`);
  parts.push(`${t('input.spread_label')}: ${spreadName}`);
  parts.push(`${t('input.category_label')}: ${t(`categories.${input.category}`)}`);

  if (input.name.trim()) {
    parts.push(`${t('result.querent', { name: input.name.trim() })}`);
  }
  if (input.context.trim()) {
    parts.push(`${t('result.question', { context: input.context.trim() })}`);
  }
  parts.push('');

  // Drawn Cards List
  parts.push(`=== ${t('result.cards_drawn_heading').toUpperCase()} ===`);
  drawnCards.forEach((drawn, idx) => {
    const cardName = drawn.card.name[language] || drawn.card.name.en;
    const orientationLabel = t(`orientations.${drawn.orientation}`);
    const posLabel = t(drawn.positionKey) || `Position ${idx + 1}`;
    parts.push(`${idx + 1}. ${posLabel}: ${cardName} (${orientationLabel})`);
  });
  parts.push('');

  // Reading Content
  if (readingMarkdown.trim()) {
    parts.push('=== READING ===');
    parts.push(readingMarkdown.trim());
    parts.push('');
  }

  // Disclaimer
  parts.push('---');
  parts.push(t('app.disclaimer'));

  return parts.join('\n');
}

export function ResultScreen({
  language,
  input,
  drawnCards,
  spreadId,
  readingMarkdown,
  isLoading,
  error,
  onLanguageChange,
  onNewReading,
  onRetry,
}: ResultScreenProps) {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const spread = SPREADS[spreadId] ?? SPREADS.three_cards;
  const spreadName = t(spread.nameKey as TranslationKey);

  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const readingRegionId = useId();

  // Focus management on entry & error events
  useEffect(() => {
    if (error) {
      errorRef.current?.focus();
    } else {
      headingRef.current?.focus();
    }
  }, [error]);

  const handleCopy = async () => {
    const fullText = formatReadingPlainText({
      input,
      spreadName,
      drawnCards,
      readingMarkdown,
      language,
      t: t as (key: string, params?: Record<string, string | number>) => string,
    });

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        // Fallback for environments lacking clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = fullText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Gracefully handle clipboard rejection
    }
  };

  const hasReadingContent = readingMarkdown.trim().length > 0;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-slate-950 text-slate-100">
      <div>
        <AppHeader
          language={language}
          onLanguageChange={onLanguageChange}
          showReset={true}
          onReset={onNewReading}
        />

        <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-16">
          {/* Header Banner */}
          <div className="text-center mb-8 space-y-3 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
              <span>✦</span>
              <span>{spreadName}</span>
              <span>✦</span>
            </div>

            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text text-transparent focus:outline-none"
            >
              {t('result.title')}
            </h2>
          </div>

          {/* Error Banner with localized message & Retry Button */}
          {error && (
            <div
              ref={errorRef}
              role="alert"
              aria-live="assertive"
              tabIndex={-1}
              className="max-w-3xl mx-auto mb-8 rounded-2xl border border-rose-500/40 bg-gradient-to-b from-rose-950/40 to-slate-900/80 backdrop-blur-md p-5 sm:p-6 shadow-xl shadow-rose-950/20 space-y-4 focus:outline-none"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl text-rose-400 shrink-0" aria-hidden="true">
                  ⚠
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-rose-200 text-base sm:text-lg">
                    {t(error as TranslationKey)}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="py-2.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.99] shadow-lg shadow-amber-500/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    ↻ {t('common.retry')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onNewReading}
                  className="py-2.5 px-5 rounded-xl font-medium text-sm text-slate-300 border border-slate-700/80 hover:border-slate-600 hover:text-slate-100 hover:bg-slate-800/60 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  {t('result.new_reading_button')}
                </button>
              </div>
            </div>
          )}

          {/* Main Layout: Cards beside the reading on desktop (lg:), and above the reading on mobile/tablet */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Cards Column: Aside / Top */}
            <aside
              aria-label={t('result.cards_drawn_heading')}
              className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-6 order-1"
            >
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-4 sm:p-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-amber-200 flex items-center gap-2">
                    <span>✦</span>
                    <span>{t('result.cards_drawn_heading')}</span>
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300">
                    {drawnCards.length}/{spread.cardCount}
                  </span>
                </div>

                {/* Responsive Cards Grid / Rail */}
                <div
                  className={`grid gap-4 sm:gap-5 justify-center ${
                    spread.cardCount === 3
                      ? 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-1'
                      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-1'
                  }`}
                >
                  {drawnCards.map((drawn, idx) => {
                    const pos = spread.positions[idx];
                    const positionLabel = pos
                      ? t(pos.labelKey as TranslationKey)
                      : `Position ${idx + 1}`;
                    const orientationLabel = t(
                      `orientations.${drawn.orientation}` as TranslationKey
                    );

                    return (
                      <div
                        key={drawn.card.id + idx}
                        className="flex flex-col items-center p-3 rounded-xl border border-slate-800/80 bg-slate-950/40 hover:border-amber-500/30 transition-colors"
                      >
                        {/* Position & Orientation Header */}
                        <div className="text-center w-full mb-2">
                          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block line-clamp-1">
                            {idx + 1}. {positionLabel}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded mt-1 inline-block ${
                              drawn.orientation === 'reversed'
                                ? 'bg-rose-950/50 text-rose-300 border border-rose-800/40'
                                : 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/40'
                            }`}
                          >
                            {orientationLabel}
                          </span>
                        </div>

                        {/* Card Face */}
                        <div className="w-full max-w-[130px] sm:max-w-[150px] lg:max-w-[160px]">
                          <CardFace
                            card={drawn.card}
                            orientation={drawn.orientation}
                            language={language}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Reading Column: Querent info + Markdown output + Actions */}
            <div className="flex-1 w-full min-w-0 order-2 space-y-6">
              {/* Querent Context Card */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-400">
                  {input.name.trim() && (
                    <span className="font-semibold text-amber-200">
                      {t('result.querent', { name: input.name.trim() })}
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-amber-300 border border-slate-700 font-mono text-xs">
                    {t(`categories.${input.category}`)}
                  </span>
                </div>

                {input.context.trim() && (
                  <p className="text-xs sm:text-sm text-slate-300 italic border-l-2 border-amber-400/50 pl-3 py-1 bg-amber-500/5 rounded-r-lg">
                    &quot;{input.context.trim()}&quot;
                  </p>
                )}
              </div>

              {/* Localized Loading State (until first token arrives) */}
              {isLoading && !hasReadingContent && !error && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl border border-amber-500/20 bg-slate-900/60 backdrop-blur-md p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6 shadow-2xl"
                >
                  {/* Cosmic mystical pulsing orb */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-purple-600/30 to-amber-300/20 blur-xl ${
                        shouldReduceMotion ? '' : 'animate-pulse'
                      }`}
                    />
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400/40 border-t-amber-300 flex items-center justify-center ${
                        shouldReduceMotion ? '' : 'animate-spin'
                      }`}
                      style={{ animationDuration: '3s' }}
                    >
                      <span className="text-xl sm:text-2xl text-amber-300 select-none">
                        ✧
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 max-w-md">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text text-transparent">
                      {t('loading.title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {t('loading.subtitle')}
                    </p>
                  </div>
                </div>
              )}

              {/* Streamed Markdown Reading Content */}
              {hasReadingContent && (
                <section
                  id={readingRegionId}
                  aria-live="polite"
                  aria-atomic="false"
                  aria-busy={isLoading}
                  className="rounded-2xl border border-slate-800/90 bg-slate-900/70 backdrop-blur-md p-5 sm:p-8 shadow-2xl space-y-6"
                >
                  {/* Markdown container with styled 5 sections */}
                  <div className="prose prose-invert prose-amber max-w-none text-slate-200">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // 1. Stylized Section Headings (5 sections)
                        h2: ({ children }) => (
                          <div className="mt-8 mb-4 border-b border-amber-500/20 pb-2.5 flex items-center gap-2.5">
                            <span className="text-amber-400 text-sm select-none" aria-hidden="true">
                              ✦
                            </span>
                            <h2 className="m-0 font-serif text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text text-transparent tracking-tight">
                              {children}
                            </h2>
                          </div>
                        ),
                        // 2. Card item subheadings
                        h3: ({ children }) => (
                          <h3 className="font-serif text-base sm:text-lg font-semibold text-amber-200/90 mt-5 mb-2.5">
                            {children}
                          </h3>
                        ),
                        // 3. Paragraphs
                        p: ({ children }) => (
                          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        // 4. Unordered Lists (Do's & Don'ts)
                        ul: ({ children }) => (
                          <ul className="space-y-2 mb-5 pl-1 list-none">
                            {children}
                          </ul>
                        ),
                        // 5. List items with custom subtle gold bullet
                        li: ({ children }) => (
                          <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                            <span
                              className="text-amber-400 text-xs mt-1.5 shrink-0 select-none"
                              aria-hidden="true"
                            >
                              ✦
                            </span>
                            <span className="flex-1">{children}</span>
                          </li>
                        ),
                        // 6. Blockquote
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-2 border-amber-400/60 bg-amber-500/5 px-4 py-2 my-4 rounded-r-xl text-slate-300 italic text-sm sm:text-base">
                            {children}
                          </blockquote>
                        ),
                        // 7. Bold text highlight
                        strong: ({ children }) => (
                          <strong className="text-amber-100 font-semibold">
                            {children}
                          </strong>
                        ),
                        // 8. Horizontal separator
                        hr: () => (
                          <hr className="border-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent my-6" />
                        ),
                      }}
                    >
                      {readingMarkdown}
                    </Markdown>

                    {/* Subtle typing cursor shown while streaming */}
                    {isLoading && (
                      <span
                        className={`inline-block w-2 h-4 sm:h-5 ml-1 bg-amber-400 align-middle rounded-xs ${
                          shouldReduceMotion ? '' : 'animate-pulse'
                        }`}
                        aria-hidden="true"
                        title="Streaming..."
                      />
                    )}
                  </div>
                </section>
              )}

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                {/* Copy Reading Button (Plain text with cards list) */}
                {hasReadingContent && !isLoading && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="w-full sm:w-auto py-3 px-6 rounded-xl text-sm font-semibold text-slate-200 border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:border-amber-400/50 hover:text-amber-200 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    <span>{copied ? '✓' : '📋'}</span>
                    <span>
                      {copied ? t('result.copied') : t('result.copy_button')}
                    </span>
                  </button>
                )}

                {/* New Reading Action Button (always present, aborts any in-flight request) */}
                <button
                  type="button"
                  onClick={onNewReading}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.99] shadow-xl shadow-amber-500/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ml-auto"
                >
                  ↻ {t('result.new_reading_button')}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* App Disclaimer Footer */}
      <footer className="w-full max-w-3xl mx-auto px-4 py-4 text-center border-t border-slate-800/60 text-xs text-slate-500">
        <p>{t('app.disclaimer')}</p>
      </footer>
    </div>
  );
}
