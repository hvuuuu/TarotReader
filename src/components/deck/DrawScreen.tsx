import { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import type { Card, CardOrientation, DrawnCard, Language, SpreadId } from '../../app/types';
import { useI18n } from '../../i18n/I18nContext';
import { SPREADS } from '../../data/spreads';
import { AppHeader } from '../common/AppHeader';
import { CardBack } from './CardBack';
import { CardFace } from './CardFace';
import { CardDetailModal } from './CardDetailModal';

export interface DrawScreenProps {
  language: Language;
  drawnCards: DrawnCard[];
  spreadId: SpreadId;
  onLanguageChange: (lang: Language) => void;
  onPickCard: (pickedCardIndex?: number) => void;
  onRevealReading: () => void;
  onReset: () => void;
}

const TOTAL_CARDS = 78;

export function DrawScreen({
  language,
  drawnCards,
  spreadId,
  onLanguageChange,
  onPickCard,
  onRevealReading,
  onReset,
}: DrawScreenProps) {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const spread = SPREADS[spreadId] ?? SPREADS.three_cards;
  const isComplete = drawnCards.length >= spread.cardCount;
  const remaining = Math.max(0, spread.cardCount - drawnCards.length);

  // Keep track of which card indices in the 78-card arch have been chosen
  const [pickedDeckIndices, setPickedDeckIndices] = useState<number[]>([]);
  // Keep track of flipped cards in the slots
  const [flippedSlots, setFlippedSlots] = useState<boolean[]>([]);
  // Auto-spreading status indicator
  const [isSpreading, setIsSpreading] = useState(false);
  // Active card being inspected in detail modal
  const [inspectedCard, setInspectedCard] = useState<{
    card: Card;
    orientation: CardOrientation;
    positionLabel: string;
  } | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const deckScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  // Trigger 3D flip animation when a new card arrives in a slot
  useEffect(() => {
    if (drawnCards.length > 0) {
      const timer = setTimeout(() => {
        setFlippedSlots(drawnCards.map(() => true));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setFlippedSlots([]);
    }
  }, [drawnCards.length]);

  const handleCardClick = (deckIndex: number) => {
    if (isComplete || isSpreading) return;
    if (pickedDeckIndices.includes(deckIndex)) return;

    setPickedDeckIndices((prev) => [...prev, deckIndex]);
    onPickCard(deckIndex);
  };

  const handleSpreadAll = () => {
    if (isComplete || isSpreading) return;
    setIsSpreading(true);

    const needed = spread.cardCount - drawnCards.length;
    const available = Array.from({ length: TOTAL_CARDS }, (_, i) => i).filter(
      (i) => !pickedDeckIndices.includes(i)
    );

    const chosen: number[] = [];
    for (let s = 0; s < needed; s++) {
      if (available.length === 0) break;
      const rIdx = Math.floor(Math.random() * available.length);
      const pick = available.splice(rIdx, 1)[0];
      chosen.push(pick);
    }

    chosen.forEach((deckIndex, step) => {
      setTimeout(() => {
        setPickedDeckIndices((prev) => [...prev, deckIndex]);
        onPickCard(deckIndex);
        if (step === chosen.length - 1) {
          setIsSpreading(false);
        }
      }, (step + 1) * 220);
    });
  };

  const isModalOpen = inspectedCard !== null;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-slate-950 text-slate-100">
      <div>
        <AppHeader
          language={language}
          onLanguageChange={onLanguageChange}
          showReset={true}
          onReset={onReset}
        />

        <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 pb-16 flex flex-col items-center">
          {/* Status & Instructions Header */}
          <div className="text-center mb-6 space-y-2">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-serif text-2xl sm:text-3xl font-bold text-amber-200 focus:outline-none"
            >
              {t('drawing.title')}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/20 text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-medium text-amber-100">
                  {t('drawing.card_drawn_count', {
                    current: drawnCards.length,
                    total: spread.cardCount,
                  })}
                </span>
              </div>

              {!isComplete && (
                <button
                  type="button"
                  onClick={handleSpreadAll}
                  disabled={isSpreading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-semibold text-xs text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 shadow-md shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>✦</span>
                  <span>
                    {isSpreading
                      ? t('drawing.spreading')
                      : t('drawing.spread_all_button')}
                  </span>
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              {isComplete
                ? t('drawing.all_drawn')
                : t('drawing.instructions', { remaining })}
            </p>

            {drawnCards.length > 0 && (
              <p className="text-[11px] text-amber-300/80 flex items-center justify-center gap-1.5 animate-fade-in pt-0.5">
                <span>ⓘ</span>
                <span>{t('drawing.hover_hint')}</span>
              </p>
            )}
          </div>

          {/* SPREAD SLOTS: Clean positions with 3D Flip */}
          <section
            aria-label="Spread Slots"
            className="w-full mb-8 sm:mb-10"
          >
            <div
              className={`grid gap-3 sm:gap-5 md:gap-6 justify-center ${
                spread.cardCount === 3
                  ? 'grid-cols-3 max-w-2xl mx-auto'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 max-w-4xl mx-auto'
              }`}
            >
              {spread.positions.map((pos, slotIdx) => {
                const drawn = drawnCards[slotIdx];
                const isFlipped = flippedSlots[slotIdx] || false;
                const positionLabel = t(pos.labelKey as any);

                return (
                  <div
                    key={pos.id}
                    className="flex flex-col items-center space-y-2"
                  >
                    {/* Position Label Banner */}
                    <div className="text-center h-9 sm:h-11 flex flex-col justify-end items-center px-1">
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-400/90 font-bold">
                        {slotIdx + 1}
                      </span>
                      <span className="text-[11px] sm:text-xs md:text-sm font-medium text-slate-200 line-clamp-1 leading-tight">
                        {positionLabel}
                      </span>
                    </div>

                    {/* Card Slot with 3D Flip & Details trigger */}
                    <div className="w-[105px] sm:w-[130px] md:w-[145px] aspect-[2/3] perspective-1000 relative rounded-xl">
                      {drawn ? (
                        <div
                          className={`relative w-full h-full preserve-3d ${
                            shouldReduceMotion ? '' : 'transition-transform duration-700 ease-out'
                          } ${isFlipped ? 'rotate-y-180' : ''}`}
                        >
                          {/* Face Back (shown initially before flip) */}
                          <div className="absolute inset-0 w-full h-full backface-hidden">
                            <CardBack />
                          </div>

                          {/* Face Front (revealed with CSS 3D flip) */}
                          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                            <CardFace
                              card={drawn.card}
                              orientation={drawn.orientation}
                              language={language}
                              positionLabel={`${slotIdx + 1}. ${positionLabel}`}
                              enableHoverDetails={true}
                              onInspect={() =>
                                setInspectedCard({
                                  card: drawn.card,
                                  orientation: drawn.orientation,
                                  positionLabel: `${slotIdx + 1}. ${positionLabel}`,
                                })
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        /* Empty Slot Placeholder */
                        <div
                          className="w-full h-full rounded-xl border-2 border-dashed border-amber-500/25 bg-slate-900/40 flex flex-col items-center justify-center p-2 text-center transition-colors duration-200 hover:border-amber-500/40"
                          aria-label={t('drawing.empty_slot', { index: slotIdx + 1 })}
                        >
                          <span className="text-xl sm:text-2xl text-amber-500/30 mb-1">✧</span>
                          <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                            {t('drawing.empty_slot', { index: slotIdx + 1 })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Action Button: Reveal Reading when all cards are drawn */}
          {isComplete && (
            <div className="mb-8 w-full max-w-sm mx-auto animate-fade-in">
              <button
                type="button"
                onClick={onRevealReading}
                className="w-full py-4 px-6 rounded-xl font-bold text-base sm:text-lg text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.99] shadow-xl shadow-amber-500/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer"
              >
                ✦ {t('drawing.reveal_reading')} →
              </button>
            </div>
          )}

          {/* THE 78-CARD RAINBOW ARCH SPREAD (Hidden when detail modal is open) */}
          <section
            aria-label="Tarot Deck Rainbow Arch Spread"
            className={`w-full flex flex-col items-center transition-opacity duration-200 ${
              isModalOpen ? 'hidden' : 'block'
            }`}
          >
            {/* Reading Mat Container */}
            <div className="w-full rounded-3xl border border-amber-500/25 bg-gradient-to-b from-slate-950/95 via-slate-900/60 to-slate-950 p-4 sm:p-6 md:p-8 shadow-2xl relative">
              {/* Mat Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2 text-amber-400/90 font-semibold uppercase tracking-wider">
                  <span>✧</span>
                  <span>{TOTAL_CARDS - pickedDeckIndices.length} / {TOTAL_CARDS} Cards In The Deck</span>
                  <span>✧</span>
                </div>

                <div className="hidden sm:flex items-center gap-3 text-slate-400 text-xs">
                  <span className="text-amber-400/80">← {language === 'vi' ? 'Đầu bộ bài' : 'Start of Deck'}</span>
                  <span className="text-slate-600">•</span>
                  <span className="italic">{language === 'vi' ? 'Rê chuột & chọn lá bất kỳ từ đầu đến cuối' : 'Hover & pick any card from start to end'}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400/80">{language === 'vi' ? 'Cuối bộ bài' : 'End of Deck'} →</span>
                </div>
              </div>

              {/* Symmetrical Rainbow Arch Spread Area */}
              <div
                ref={deckScrollRef}
                className="w-full overflow-x-auto py-6 sm:py-8 px-4 no-scrollbar relative"
              >
                <div className="relative w-[1140px] h-[320px] sm:h-[360px] mx-auto select-none overflow-visible">
                  <LazyMotion features={domAnimation}>
                    {Array.from({ length: TOTAL_CARDS }).map((_, i) => {
                      const isPicked = pickedDeckIndices.includes(i);
                      // t: progress from -1.0 (left) to 0.0 (center apex) to +1.0 (right)
                      const mid = (TOTAL_CARDS - 1) / 2; // 38.5
                      const tProgress = (i - mid) / mid; // -1 to +1

                      // Convex Rainbow Arch Geometry matching reference image:
                      // - Apex (center, t=0): y = 20px, angle = 0deg (highest point of arch)
                      // - Left & Right (t=±1): slopes down to y ≈ 180px, angle = ±36deg
                      const containerCenter = 570;
                      const cardHalfWidth = 42;
                      const x = containerCenter + tProgress * 485 - cardHalfWidth;
                      const angle = tProgress * 36;
                      const y = 20 + (1 - Math.cos(tProgress * Math.PI * 0.44)) * 175;

                      return (
                        <m.button
                          key={i}
                          type="button"
                          onClick={() => handleCardClick(i)}
                          disabled={isPicked || isComplete || isSpreading}
                          aria-label={t('drawing.card_aria_label', { index: i + 1 })}
                          title={`Card #${i + 1} (${t('drawing.pick_card_help')})`}
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, y: 30, scale: 0.9 }
                          }
                          animate={{
                            opacity: isPicked ? 0.12 : 1,
                            scale: isPicked ? 0.85 : 1,
                          }}
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { delay: i * 0.0035, duration: 0.28 }
                          }
                          style={{
                            position: 'absolute',
                            left: `${x}px`,
                            top: `${y}px`,
                            transform: `rotate(${angle}deg)`,
                            transformOrigin: 'bottom center',
                            zIndex: i,
                          }}
                          className={`w-20 sm:w-22 md:w-24 aspect-[2/3] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:z-[99] transition-all duration-200 cursor-pointer ${
                            isPicked
                              ? 'opacity-10 cursor-not-allowed pointer-events-none'
                              : 'hover:-translate-y-12 hover:scale-120 hover:z-[99] hover:shadow-2xl hover:shadow-amber-400/50 hover:border-amber-300 active:scale-95'
                          }`}
                        >
                          <CardBack />
                        </m.button>
                      );
                    })}
                  </LazyMotion>
                </div>
              </div>

              {/* Mobile / Narrow Screen Pan Hint */}
              <div className="sm:hidden text-center text-[11px] text-slate-500 pt-2 border-t border-slate-800/60 flex items-center justify-center gap-1.5">
                <span>←</span>
                <span>{language === 'vi' ? 'Cuộn ngang để xem tất cả 78 lá từ đầu đến cuối' : 'Scroll sideways to explore all 78 cards from start to end'}</span>
                <span>→</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Screen-level Card Detail Modal: Completely conceals spreaded cards behind it */}
      {inspectedCard && (
        <CardDetailModal
          card={inspectedCard.card}
          orientation={inspectedCard.orientation}
          language={language}
          positionLabel={inspectedCard.positionLabel}
          isOpen={true}
          onClose={() => setInspectedCard(null)}
        />
      )}

      {/* Footer */}
      <footer className="w-full max-w-3xl mx-auto px-4 py-4 text-center border-t border-slate-800/60 text-xs text-slate-500">
        <p>{t('app.disclaimer')}</p>
      </footer>
    </div>
  );
}
