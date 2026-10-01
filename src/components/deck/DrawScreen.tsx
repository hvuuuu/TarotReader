import { useState, useEffect, useRef } from 'react';
import { useReducedMotion, m } from 'motion/react';
import {
  Sparkles,
  Wand2,
  Info,
  ArrowRight,
  ArrowLeft,
  Spline,
  Layers,
} from 'lucide-react';
import type { Card, CardOrientation, DrawnCard, Language, SpreadId } from '../../app/types';
import { useI18n, type TranslationKey } from '../../i18n/I18nContext';
import { SPREADS } from '../../data/spreads';
import { AppHeader } from '../common/AppHeader';
import { CardBack } from './CardBack';
import { CardFace } from './CardFace';
import { CardDetailModal } from './CardDetailModal';
import { TarotArchDeck } from './TarotArchDeck';
import { TarotSerpentineDeck } from './TarotSerpentineDeck';

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

  // On laptop/desktop (>= 1024px), default to 'arch'
  // On mobile/narrow screens (< 1024px), default to 'serpentine'
  const [viewMode, setViewMode] = useState<'serpentine' | 'arch'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return 'serpentine';
    }
    return 'arch';
  });

  const userToggledRef = useRef(false);

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

  // Update viewMode on resize if user hasn't explicitly chosen one
  useEffect(() => {
    const handleResize = () => {
      if (!userToggledRef.current) {
        setViewMode(window.innerWidth < 1024 ? 'serpentine' : 'arch');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Center the horizontal arch scroll container when arch view mounts
  useEffect(() => {
    if (viewMode === 'arch' && deckScrollRef.current) {
      const el = deckScrollRef.current;
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    }
  }, [viewMode]);

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
          <div className="text-center mb-6 space-y-2.5">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 focus:outline-none tracking-tight"
            >
              {t('drawing.title')}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs sm:text-sm shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span className="font-semibold text-amber-100">
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
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm text-slate-950 bg-linear-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 shadow-md shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wand2 className="w-3.5 h-3.5 shrink-0 text-slate-950" aria-hidden="true" />
                  <span>
                    {isSpreading
                      ? t('drawing.spreading')
                      : t('drawing.spread_all_button')}
                  </span>
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-normal">
              {isComplete
                ? t('drawing.all_drawn')
                : t('drawing.instructions', { remaining })}
            </p>

            {drawnCards.length > 0 && (
              <p className="text-xs text-amber-300 flex items-center justify-center gap-1.5 animate-fade-in pt-0.5">
                <Info className="w-3.5 h-3.5 shrink-0 text-amber-400" aria-hidden="true" />
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
              className={`grid gap-3.5 sm:gap-5 md:gap-6 justify-center ${
                spread.cardCount === 3
                  ? 'grid-cols-3 max-w-2xl mx-auto'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 max-w-4xl mx-auto'
              }`}
            >
              {spread.positions.map((pos, slotIdx) => {
                const drawn = drawnCards[slotIdx];
                const isFlipped = flippedSlots[slotIdx] || false;
                const positionLabel = t(pos.labelKey as TranslationKey);
                const isOddLastInTwoCol = spread.cardCount === 5 && slotIdx === 4;

                return (
                  <m.div
                    key={pos.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: slotIdx * 0.05 }}
                    className={`flex flex-col items-center space-y-2 ${
                      isOddLastInTwoCol ? 'col-span-2 sm:col-span-1' : ''
                    }`}
                  >
                    {/* Position Label Banner */}
                    <div className="text-center h-10 sm:h-12 flex flex-col justify-end items-center px-1">
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                        {slotIdx + 1}
                      </span>
                      <span className="text-xs sm:text-sm md:text-base font-bold text-slate-100 line-clamp-1 leading-tight">
                        {positionLabel}
                      </span>
                    </div>

                    {/* Card Slot with 3D Flip & Details trigger */}
                    <div className="w-24 min-[400px]:w-28 sm:w-32 md:w-36 aspect-2/3 perspective-1000 relative rounded-xl">
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
                          className="w-full h-full rounded-xl border-2 border-dashed border-amber-500/30 bg-slate-900/50 flex flex-col items-center justify-center p-2 text-center transition-colors duration-200 hover:border-amber-500/50"
                          aria-label={t('drawing.empty_slot', { index: slotIdx + 1 })}
                        >
                          <span className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400/60 mb-1 shrink-0">
                            <Sparkles className="w-4 h-4" aria-hidden="true" />
                          </span>
                          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">
                            {t('drawing.empty_slot', { index: slotIdx + 1 })}
                          </span>
                        </div>
                      )}
                    </div>
                  </m.div>
                );
              })}
            </div>
          </section>

          {/* Action Button: Reveal Reading when all cards are drawn */}
          {isComplete && (
            <m.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mb-8 w-full max-w-sm mx-auto"
            >
              <button
                type="button"
                onClick={onRevealReading}
                className="w-full py-4 px-6 rounded-xl font-serif font-bold text-base sm:text-lg text-slate-950 bg-linear-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.99] shadow-xl shadow-amber-500/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 shrink-0 text-slate-950" aria-hidden="true" />
                <span>{t('drawing.reveal_reading')}</span>
                <ArrowRight className="w-5 h-5 shrink-0 text-slate-950" aria-hidden="true" />
              </button>
            </m.div>
          )}

          {/* THE 78-CARD DECK SPREAD SECTION */}
          <section
            aria-label="Tarot Deck Spread"
            className={`w-full flex flex-col items-center transition-opacity duration-200 ${
              isModalOpen ? 'hidden' : 'block'
            }`}
          >
            {/* Reading Mat Container */}
            <div className="w-full rounded-3xl border border-amber-500/25 bg-linear-to-b from-slate-950/95 via-slate-900/60 to-slate-950 p-4 sm:p-6 md:p-8 shadow-2xl relative">
              {/* Mat Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>
                    {TOTAL_CARDS - pickedDeckIndices.length} / {TOTAL_CARDS} {t('cards_in_the_deck')}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                </div>

                {/* View switcher */}
                <div className="flex items-center gap-2">
                  <div
                    role="group"
                    aria-label={t('drawing.switch_view')}
                    className="inline-flex p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px]"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        userToggledRef.current = true;
                        setViewMode('serpentine');
                      }}
                      className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                        viewMode === 'serpentine'
                          ? 'bg-amber-500/20 text-amber-200 font-bold border border-amber-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title={t('drawing.view_serpentine')}
                    >
                      <Spline className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span className="hidden sm:inline">{t('drawing.view_serpentine')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        userToggledRef.current = true;
                        setViewMode('arch');
                      }}
                      className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                        viewMode === 'arch'
                          ? 'bg-amber-500/20 text-amber-200 font-bold border border-amber-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title={t('drawing.view_arch')}
                    >
                      <Layers className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span className="hidden sm:inline">{t('drawing.view_arch')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Serpentine / Snake Winding Deck:
                  - Rendered on mobile & tablet by default (< 1024px)
                  - Prevents horizontal scroll! Natural, responsive layout.
              */}
              {viewMode === 'serpentine' && (
                <div>
                  <div className="text-center text-xs text-amber-300/80 mb-2 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" aria-hidden="true" />
                    <span>{t('drawing.serpentine_hint')}</span>
                  </div>
                  <TarotSerpentineDeck
                    language={language}
                    pickedDeckIndices={pickedDeckIndices}
                    isComplete={isComplete}
                    isSpreading={isSpreading}
                    shouldReduceMotion={Boolean(shouldReduceMotion)}
                    onPickCard={handleCardClick}
                    getCardAriaLabel={(idx) => t('drawing.card_aria_label', { index: idx })}
                    getPickHelpText={() => t('drawing.pick_card_help')}
                  />
                </div>
              )}

              {/* Rainbow Arch Deck:
                  - Rendered on laptop & desktop by default (>= 1024px)
              */}
              {viewMode === 'arch' && (
                <div>
                  <div className="hidden sm:flex items-center justify-center gap-3 text-slate-400 text-xs mb-3">
                    <span className="text-amber-400/80 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                      <span>{t('drawing.deck_start')}</span>
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="italic">{t('drawing.deck_hint')}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-amber-400/80 flex items-center gap-1">
                      <span>{t('drawing.deck_end')}</span>
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </div>

                  <div
                    ref={deckScrollRef}
                    className="w-full overflow-x-auto py-6 sm:py-8 px-6 sm:px-12 flex justify-start lg:justify-center no-scrollbar relative"
                  >
                    <TarotArchDeck
                      language={language}
                      pickedDeckIndices={pickedDeckIndices}
                      isComplete={isComplete}
                      isSpreading={isSpreading}
                      shouldReduceMotion={Boolean(shouldReduceMotion)}
                      onPickCard={handleCardClick}
                      getCardAriaLabel={(idx) => t('drawing.card_aria_label', { index: idx })}
                      getPickHelpText={() => t('drawing.pick_card_help')}
                      getCardTitle={(idx) => t('drawing.card_title', { index: idx })}
                    />
                  </div>
                </div>
              )}
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
