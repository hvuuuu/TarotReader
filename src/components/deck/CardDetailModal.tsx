import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { m } from 'motion/react';
import { X, Sparkles, BookOpen, Compass } from 'lucide-react';
import type { Card, CardOrientation, Language } from '../../app/types';
import { translate, type TranslationKey } from '../../i18n/I18nContext';
import { getCardMeaning } from '../../data/cardMeanings';

export interface CardDetailModalProps {
  card: Card;
  orientation?: CardOrientation;
  language?: Language;
  positionLabel?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CardDetailModal({
  card,
  orientation = 'upright',
  language = 'en',
  positionLabel,
  isOpen,
  onClose,
}: CardDetailModalProps) {
  const t = (key: TranslationKey, params?: Record<string, string | number>) =>
    translate(language, key, params);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [imageError, setImageError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted || typeof document === 'undefined') return null;

  const meaning = getCardMeaning(card.id);
  const isReversed = orientation === 'reversed';
  const displayName = language === 'vi' ? card.name.vi : card.name.en;
  const secondaryName = language === 'vi' ? card.name.en : null;
  const keywords = card.keywords?.[orientation]?.[language] ?? [];

  const summaryText = meaning?.summary?.[language] ?? '';
  const orientationMeaningText = isReversed
    ? (meaning?.reversed?.[language] ?? '')
    : (meaning?.upright?.[language] ?? '');

  const suitName = card.suit
    ? t(`suits.${card.suit}` as TranslationKey)
    : t('suits.major_arcana');

  const aspectLabel = isReversed
    ? t('orientations.reversed_aspect')
    : t('orientations.upright_aspect');

  return createPortal(
    <m.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-xl cursor-pointer"
      onClick={onClose}
    >
      <m.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-3xl border border-amber-500/40 bg-linear-to-b from-slate-900 via-slate-950 to-slate-900 p-5 sm:p-8 md:p-10 shadow-2xl shadow-amber-500/15 max-h-[92vh] overflow-y-auto no-scrollbar cursor-default"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={t('card_detail.close')}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full border border-slate-700 bg-slate-800/90 hover:bg-amber-400 hover:text-slate-950 text-slate-200 flex items-center justify-center text-base font-bold transition-all cursor-pointer shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <X className="w-5 h-5 shrink-0" aria-hidden="true" />
        </button>

        {/* Modal Content: 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Column 1: Card Artwork Showcase */}
          <div className="md:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="relative w-48 min-[400px]:w-56 sm:w-60 md:w-full max-w-65 aspect-2/3 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-500/20 bg-slate-950">
              {!imageError ? (
                <img
                  src={`/cards/${card.id}.webp`}
                  alt={displayName}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isReversed ? 'rotate-180' : ''
                  }`}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-linear-to-b from-slate-900 to-slate-950 text-amber-200">
                  <Sparkles className="w-8 h-8 mb-2 text-amber-400" aria-hidden="true" />
                  <p className="font-serif font-bold text-lg">{displayName}</p>
                  <p className="text-xs text-slate-400 italic mt-1">{suitName}</p>
                </div>
              )}

              {/* Status pill overlay */}
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border shadow-md flex items-center gap-1 ${
                    isReversed
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  }`}
                >
                  <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{t(`orientations.${orientation}` as TranslationKey)}</span>
                </span>
              </div>
            </div>

            {positionLabel && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{positionLabel}</span>
              </div>
            )}
          </div>

          {/* Column 2: Detailed Psychological & Archetypal Insights */}
          <div className="md:col-span-7 space-y-5">
            {/* Title & Classification */}
            <div className="space-y-1.5 pr-8 md:pr-0">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
                {suitName}
              </span>
              <h3
                id="card-modal-title"
                className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-100 leading-tight"
              >
                {displayName}
              </h3>
              {secondaryName && (
                <p className="text-sm sm:text-base text-slate-300 italic font-normal">
                  {secondaryName}
                </p>
              )}
            </div>

            {/* Orientation Status Banner */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                  isReversed
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>
                  {t(`orientations.${orientation}` as TranslationKey)} ({aspectLabel})
                </span>
              </span>
            </div>

            {/* Archetypal Essence (General Meaning) */}
            {summaryText && (
              <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20">
                <h4 className="text-sm sm:text-base font-serif font-bold text-amber-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                    <BookOpen className="w-3 h-3" aria-hidden="true" />
                  </span>
                  <span>{t('card_detail.archetype')}</span>
                </h4>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {summaryText}
                </p>
              </div>
            )}

            {/* Specific Psychological Reflection */}
            {orientationMeaningText && (
              <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-amber-950/25 border border-amber-500/30 shadow-inner">
                <h4 className="text-sm sm:text-base font-serif font-bold text-amber-200 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                    <Compass className="w-3 h-3" aria-hidden="true" />
                  </span>
                  <span>{t('card_detail.orientation_meaning')}</span>
                </h4>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                  {orientationMeaningText}
                </p>
              </div>
            )}

            {/* Core Themes / Keywords */}
            {keywords.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90 font-bold">
                  {t('card_detail.keywords')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs sm:text-sm bg-slate-800/90 text-amber-100 border border-slate-700/80 shadow-xs font-semibold"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Philosophical Disclaimer */}
            <div className="pt-3 border-t border-slate-800/80">
              <p className="text-xs text-slate-500 italic">
                {t('app.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </m.div>
    </m.div>,
    document.body
  );
}
