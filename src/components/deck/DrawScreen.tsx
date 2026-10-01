import { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import type { DrawnCard, Language, SpreadId } from '../../app/types';
import { useI18n } from '../../i18n/I18nContext';
import { SPREADS } from '../../data/spreads';
import { AppHeader } from '../common/AppHeader';
import { CardBack } from './CardBack';
import { CardFace } from './CardFace';

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

  // Keep track of which card indices in the 78-card fan have been chosen
  const [pickedDeckIndices, setPickedDeckIndices] = useState<number[]>([]);
  // Keep track of flipped cards in the slots
  const [flippedSlots, setFlippedSlots] = useState<boolean[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

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
    if (isComplete) return;
    if (pickedDeckIndices.includes(deckIndex)) return;

    setPickedDeckIndices((prev) => [...prev, deckIndex]);
    onPickCard(deckIndex);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div>
        <AppHeader
          language={language}
          onLanguageChange={onLanguageChange}
          showReset={true}
          onReset={onReset}
        />

        <main className="w-full max-w-6xl mx-auto px-4 pb-12 flex flex-col items-center">
          {/* Status & Instructions Header */}
          <div className="text-center mb-6 sm:mb-8 space-y-2">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-serif text-2xl sm:text-3xl font-bold text-amber-200 focus:outline-none"
            >
              {t('drawing.title')}
            </h2>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/20 text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-medium text-amber-100">
                {t('drawing.card_drawn_count', {
                  current: drawnCards.length,
                  total: spread.cardCount,
                })}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              {isComplete
                ? t('drawing.all_drawn')
                : t('drawing.instructions', { remaining })}
            </p>
          </div>

          {/* SPREAD SLOTS: 3 or 5 positions with 3D Card Flip */}
          <section
            aria-label="Spread Slots"
            className="w-full mb-8 sm:mb-12"
          >
            <div
              className={`grid gap-3 sm:gap-4 md:gap-6 justify-center ${
                spread.cardCount === 3
                  ? 'grid-cols-3 max-w-3xl mx-auto'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 max-w-5xl mx-auto'
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
                    <div className="text-center h-10 sm:h-12 flex flex-col justify-end items-center px-1">
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-400/80 font-semibold">
                        {slotIdx + 1}
                      </span>
                      <span className="text-[11px] sm:text-xs md:text-sm font-medium text-slate-200 line-clamp-2 leading-tight">
                        {positionLabel}
                      </span>
                    </div>

                    {/* Card Slot with 3D Flip */}
                    <div
                      className="w-full max-w-[130px] sm:max-w-[150px] md:max-w-[170px] aspect-[2/3] perspective-1000 relative rounded-xl"
                    >
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
                            />
                          </div>
                        </div>
                      ) : (
                        /* Empty Slot Placeholder */
                        <div
                          className="w-full h-full rounded-xl border-2 border-dashed border-amber-500/20 bg-slate-950/40 flex flex-col items-center justify-center p-2 text-center transition-colors duration-200 hover:border-amber-500/40"
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

          {/* DECK SECTION: 78 Face-Down Cards */}
          <section
            aria-label="Deck"
            className="w-full flex flex-col items-center mt-2"
          >
            <div className="text-center mb-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                {isComplete
                  ? t('drawing.all_drawn')
                  : t('drawing.instructions', { remaining })}
              </span>
            </div>

            {/* Desktop Fan (>= 640px) */}
            <div className="hidden sm:block w-full relative h-72 md:h-80 max-w-5xl mx-auto overflow-hidden">
              <div className="relative w-full h-full flex justify-center items-end pb-4">
                <LazyMotion features={domAnimation}>
                  {Array.from({ length: TOTAL_CARDS }).map((_, i) => {
                    const isPicked = pickedDeckIndices.includes(i);
                    const mid = (TOTAL_CARDS - 1) / 2;
                    const offset = i - mid;
                    const rotate = offset * 1.05;
                    const translateX = offset * 10.5;
                    const translateY = Math.abs(offset) * 1.5 + Math.pow(offset / 4.8, 2);

                    return (
                      <m.button
                        key={i}
                        type="button"
                        onClick={() => handleCardClick(i)}
                        disabled={isPicked || isComplete}
                        aria-label={t('drawing.card_aria_label', { index: i + 1 })}
                        title={t('drawing.pick_card_help')}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 40, scale: 0.9 }
                        }
                        animate={{ opacity: isPicked ? 0.2 : 1, y: 0, scale: 1 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { delay: i * 0.007, duration: 0.35, ease: 'easeOut' }
                        }
                        style={{
                          transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`,
                          transformOrigin: 'bottom center',
                          zIndex: i,
                        }}
                        className={`absolute w-20 md:w-24 aspect-[2/3] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:z-50 focus-visible:-translate-y-6 transition-all duration-200 cursor-pointer ${
                          isPicked
                            ? 'opacity-20 cursor-not-allowed pointer-events-none'
                            : 'hover:-translate-y-5 hover:scale-105 hover:z-40 hover:shadow-2xl hover:shadow-amber-500/30'
                        }`}
                      >
                        <CardBack />
                      </m.button>
                    );
                  })}
                </LazyMotion>
              </div>
            </div>

            {/* Mobile Overlapping Strip (< 640px) with Snap */}
            <div className="sm:hidden w-full overflow-x-auto snap-x snap-mandatory py-4 px-6 flex items-center no-scrollbar">
              <LazyMotion features={domAnimation}>
                {Array.from({ length: TOTAL_CARDS }).map((_, i) => {
                  const isPicked = pickedDeckIndices.includes(i);

                  return (
                    <m.button
                      key={i}
                      type="button"
                      onClick={() => handleCardClick(i)}
                      disabled={isPicked || isComplete}
                      aria-label={t('drawing.card_aria_label', { index: i + 1 })}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, scale: 0.9 }
                      }
                      animate={{ opacity: isPicked ? 0.25 : 1, scale: 1 }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { delay: i * 0.005, duration: 0.2 }
                      }
                      className={`snap-center shrink-0 w-20 aspect-[2/3] -mr-12 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:z-30 transition-all duration-150 ${
                        isPicked
                          ? 'opacity-25 pointer-events-none'
                          : 'active:scale-95 hover:z-20 hover:-translate-y-2'
                      }`}
                    >
                      <CardBack />
                    </m.button>
                  );
                })}
              </LazyMotion>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-3xl mx-auto px-4 py-4 text-center border-t border-slate-800/60 text-xs text-slate-500">
        <p>{t('app.disclaimer')}</p>
      </footer>
    </div>
  );
}
