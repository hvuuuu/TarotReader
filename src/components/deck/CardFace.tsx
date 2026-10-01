import { useState } from 'react';
import {
  Flame,
  Droplets,
  Sword,
  Coins,
  Sparkles,
  Info,
} from 'lucide-react';
import type { Card, CardOrientation, Language } from '../../app/types';
import { getCardMeaning } from '../../data/cardMeanings';
import { CardDetailModal } from './CardDetailModal';
import { translate, type TranslationKey } from '../../i18n/I18nContext';

export interface CardFaceProps {
  card: Card;
  orientation?: CardOrientation;
  language?: Language;
  className?: string;
  forceFallback?: boolean;
  positionLabel?: string;
  enableHoverDetails?: boolean;
  onInspect?: () => void;
}

const MAJOR_ROMAN_NUMERALS: Record<number, string> = {
  1: '0',
  2: 'I',
  3: 'II',
  4: 'III',
  5: 'IV',
  6: 'V',
  7: 'VI',
  8: 'VII',
  9: 'VIII',
  10: 'IX',
  11: 'X',
  12: 'XI',
  13: 'XII',
  14: 'XIII',
  15: 'XIV',
  16: 'XV',
  17: 'XVI',
  18: 'XVII',
  19: 'XVIII',
  20: 'XIX',
  21: 'XX',
  22: 'XXI',
};

const MINOR_RANKS = [
  { en: 'Ace', vi: 'Át', short: 'A' },
  { en: 'Two', vi: 'Hai', short: '2' },
  { en: 'Three', vi: 'Ba', short: '3' },
  { en: 'Four', vi: 'Bốn', short: '4' },
  { en: 'Five', vi: 'Năm', short: '5' },
  { en: 'Six', vi: 'Sáu', short: '6' },
  { en: 'Seven', vi: 'Bảy', short: '7' },
  { en: 'Eight', vi: 'Tám', short: '8' },
  { en: 'Nine', vi: 'Chín', short: '9' },
  { en: 'Ten', vi: 'Mười', short: '10' },
  { en: 'Page', vi: 'Tiểu Đồng', short: 'P' },
  { en: 'Knight', vi: 'Hiệp Sĩ', short: 'Kn' },
  { en: 'Queen', vi: 'Hoàng Hậu', short: 'Q' },
  { en: 'King', vi: 'Vua', short: 'K' },
];

function getCardNumberAndRank(card: Card, language: Language) {
  const idNum = Number(card.id);
  if (card.arcana === 'major') {
    const roman = MAJOR_ROMAN_NUMERALS[idNum] ?? String(idNum - 1);
    return {
      badge: roman,
      subtitle: language === 'vi' ? `Ẩn Chính • ${roman}` : `Major Arcana • ${roman}`,
    };
  }

  // Minor Arcana (wands: 23-36, cups: 37-50, swords: 51-64, pentacles: 65-78)
  let offset = 0;
  if (card.suit === 'wands') offset = 23;
  else if (card.suit === 'cups') offset = 37;
  else if (card.suit === 'swords') offset = 51;
  else if (card.suit === 'pentacles') offset = 65;

  const rankIndex = Math.max(0, Math.min(13, idNum - offset));
  const rank = MINOR_RANKS[rankIndex] ?? { en: `#${idNum}`, vi: `#${idNum}`, short: `#${idNum}` };

  return {
    badge: rank.short,
    subtitle: language === 'vi' ? rank.vi : rank.en,
  };
}

const SUIT_THEMES = {
  wands: {
    border: 'border-amber-500/40 shadow-amber-950/30',
    bg: 'from-amber-950/40 via-slate-950 to-amber-950/20',
    accent: 'text-amber-300',
    pill: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    Icon: Flame,
    labelEn: 'Wands',
    labelVi: 'Gậy',
  },
  cups: {
    border: 'border-sky-500/40 shadow-sky-950/30',
    bg: 'from-sky-950/40 via-slate-950 to-cyan-950/20',
    accent: 'text-sky-300',
    pill: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    Icon: Droplets,
    labelEn: 'Cups',
    labelVi: 'Ly',
  },
  swords: {
    border: 'border-indigo-400/40 shadow-indigo-950/30',
    bg: 'from-slate-900 via-slate-950 to-indigo-950/30',
    accent: 'text-indigo-300',
    pill: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    Icon: Sword,
    labelEn: 'Swords',
    labelVi: 'Kiếm',
  },
  pentacles: {
    border: 'border-emerald-500/40 shadow-emerald-950/30',
    bg: 'from-emerald-950/40 via-slate-950 to-amber-950/20',
    accent: 'text-emerald-300',
    pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    Icon: Coins,
    labelEn: 'Pentacles',
    labelVi: 'Xu',
  },
  major: {
    border: 'border-violet-500/40 shadow-violet-950/30',
    bg: 'from-violet-950/40 via-slate-950 to-purple-950/30',
    accent: 'text-amber-200',
    pill: 'bg-violet-500/10 text-violet-200 border-violet-500/20',
    Icon: Sparkles,
    labelEn: 'Major Arcana',
    labelVi: 'Ẩn Chính',
  },
} as const;

export function CardFace({
  card,
  orientation = 'upright',
  language = 'en',
  className = '',
  forceFallback = false,
  positionLabel,
  enableHoverDetails = true,
  onInspect,
}: CardFaceProps) {
  const t = (key: TranslationKey, params?: Record<string, string | number>) =>
    translate(language, key, params);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = card.suit ? SUIT_THEMES[card.suit] : SUIT_THEMES.major;
  const SuitIcon = theme.Icon;
  const { badge, subtitle } = getCardNumberAndRank(card, language);
  const isReversed = orientation === 'reversed';
  const showFallback = forceFallback || imageError;

  const displayName = language === 'vi' ? card.name.vi : card.name.en;
  const secondaryName = language === 'vi' ? card.name.en : card.name.vi;

  const currentKeywords = card.keywords?.[orientation]?.[language] ?? [];
  const cardMeaning = getCardMeaning(card.id);
  const summaryText = cardMeaning?.summary?.[language] ?? '';
  const orientationMeaning = isReversed
    ? (cardMeaning?.reversed?.[language] ?? '')
    : (cardMeaning?.upright?.[language] ?? '');

  const handleOpenDetails = () => {
    if (onInspect) {
      onInspect();
    } else if (enableHoverDetails) {
      setIsModalOpen(true);
    }
  };

  const reversedShortText = t('orientations.reversed_short');
  const uprightShortText = t('orientations.upright');

  return (
    <>
      <div
        data-testid="card-face"
        data-card-id={card.id}
        data-suit={card.suit ?? 'major'}
        data-orientation={orientation}
        tabIndex={enableHoverDetails ? 0 : undefined}
        role={enableHoverDetails ? 'button' : undefined}
        aria-label={`${displayName} (${orientation === 'reversed' ? t('orientations.reversed') : t('orientations.upright')})`}
        onClick={handleOpenDetails}
        onKeyDown={(e) => {
          if (enableHoverDetails && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleOpenDetails();
          }
        }}
        className={`group relative w-full aspect-2/3 rounded-xl overflow-hidden border shadow-lg transition-transform duration-300 flex flex-col justify-between select-none ${
          enableHoverDetails ? 'cursor-pointer hover:scale-[1.02] hover:shadow-amber-500/20' : ''
        } ${theme.border} bg-linear-to-b ${theme.bg} ${className}`}
      >
        {/* Info button indicator */}
        {enableHoverDetails && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetails();
            }}
            title={t('card_detail.inspect_hint')}
            aria-label={t('card_detail.inspect_hint')}
            className="absolute top-1.5 right-1.5 z-30 w-6 h-6 rounded-full bg-slate-950/85 border border-amber-500/40 text-amber-300 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center text-xs font-bold shadow-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-300 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}

        {/* Hover Description Overlay (visible on hover or focus-within) */}
        {enableHoverDetails && (
          <div className="absolute inset-0 z-20 bg-slate-950/92 backdrop-blur-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-between text-left pointer-events-none">
            {/* Top header */}
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isReversed
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {isReversed ? reversedShortText : uprightShortText}
                </span>
                <span className="text-[11px] text-amber-400 font-mono font-bold">
                  {badge}
                </span>
              </div>
              <h5 className="text-xs sm:text-sm font-serif font-bold text-amber-200 line-clamp-1">
                {displayName}
              </h5>
            </div>

            {/* General meaning / Archetype summary */}
            <div className="my-auto py-1">
              <p className="text-[10px] sm:text-xs text-slate-200 line-clamp-4 leading-relaxed font-normal">
                {orientationMeaning || summaryText}
              </p>
            </div>

            {/* Keywords & Click hint */}
            <div className="space-y-1">
              <div className="flex flex-wrap gap-1">
                {currentKeywords.slice(0, 2).map((kw, i) => (
                  <span
                    key={i}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-100/90 border border-slate-700/60 font-medium line-clamp-1"
                  >
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-amber-300 font-semibold italic text-center pt-0.5 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />
                <span>{t('card_detail.inspect_hint')}</span>
              </p>
            </div>
          </div>
        )}

        {!showFallback ? (
          <div className="relative w-full h-full">
            <img
              src={`/cards/${card.id}.webp`}
              alt={displayName}
              onError={() => setImageError(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                isReversed ? 'rotate-180' : ''
              }`}
            />
            {/* Overlay with localized card name & reversed indicator */}
            <div className="absolute inset-x-0 bottom-0 p-2 bg-linear-to-t from-slate-950/95 via-slate-950/70 to-transparent flex flex-col items-center text-center">
              {isReversed && (
                <span
                  data-testid="reversed-badge"
                  className="mb-1 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-rose-500/30 text-rose-300 border border-rose-500/40 backdrop-blur-xs"
                >
                  {reversedShortText}
                </span>
              )}
              <h4
                data-testid="card-name"
                className="text-xs sm:text-sm font-serif font-bold text-amber-100 leading-tight drop-shadow"
              >
                {displayName}
              </h4>
              {language === 'vi' && (
                <p className="text-[10px] text-slate-300 italic font-normal drop-shadow-xs">{card.name.en}</p>
              )}
            </div>
          </div>
        ) : (
          /* Text-based fallback face styled by suit */
          <div className="relative z-10 flex flex-col justify-between h-full w-full p-2.5">
            {/* Top header: Number / Rank badge + Suit Symbol + Orientation */}
            <div className="flex items-center justify-between text-xs">
              <span
                data-testid="card-number-badge"
                className={`px-2 py-0.5 rounded font-mono font-bold border ${theme.pill}`}
              >
                {badge}
              </span>

              <div className="flex items-center gap-1.5">
                {isReversed && (
                  <span
                    data-testid="reversed-badge"
                    className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  >
                    {reversedShortText}
                  </span>
                )}
                <span className={`w-5 h-5 flex items-center justify-center text-sm ${theme.accent}`} title={card.suit ?? 'major'}>
                  <SuitIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                </span>
              </div>
            </div>

            {/* Center: Decorative Frame & Card Name */}
            <div className="my-auto text-center px-2 py-3 rounded-lg border border-white/5 bg-slate-900/60 backdrop-blur-xs space-y-1">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-400 font-semibold font-mono">
                {subtitle}
              </p>
              <h3
                data-testid="card-name"
                className={`text-base sm:text-lg font-serif font-bold tracking-tight leading-tight ${theme.accent}`}
              >
                {displayName}
              </h3>
              <p className="text-[11px] text-slate-400 italic font-normal">{secondaryName}</p>
            </div>

            {/* Bottom footer: Keywords preview */}
            <div className="space-y-1">
              <div className="flex flex-wrap gap-1 justify-center">
                {currentKeywords.slice(0, 3).map((kw, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800/80 text-slate-200 border border-slate-700/50 font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {!onInspect && enableHoverDetails && (
        <CardDetailModal
          card={card}
          orientation={orientation}
          language={language}
          positionLabel={positionLabel}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
