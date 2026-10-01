import { useState } from 'react';
import type { Card, CardOrientation, Language } from '../../app/types';

export interface CardFaceProps {
  card: Card;
  orientation?: CardOrientation;
  language?: Language;
  className?: string;
  forceFallback?: boolean;
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
    symbol: '🜂',
    labelEn: 'Wands',
    labelVi: 'Gậy',
  },
  cups: {
    border: 'border-sky-500/40 shadow-sky-950/30',
    bg: 'from-sky-950/40 via-slate-950 to-cyan-950/20',
    accent: 'text-sky-300',
    pill: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    symbol: '🜄',
    labelEn: 'Cups',
    labelVi: 'Ly',
  },
  swords: {
    border: 'border-indigo-400/40 shadow-indigo-950/30',
    bg: 'from-slate-900 via-slate-950 to-indigo-950/30',
    accent: 'text-indigo-300',
    pill: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    symbol: '🜁',
    labelEn: 'Swords',
    labelVi: 'Kiếm',
  },
  pentacles: {
    border: 'border-emerald-500/40 shadow-emerald-950/30',
    bg: 'from-emerald-950/40 via-slate-950 to-amber-950/20',
    accent: 'text-emerald-300',
    pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    symbol: '🜃',
    labelEn: 'Pentacles',
    labelVi: 'Xu',
  },
  major: {
    border: 'border-violet-500/40 shadow-violet-950/30',
    bg: 'from-violet-950/40 via-slate-950 to-purple-950/30',
    accent: 'text-amber-200',
    pill: 'bg-violet-500/10 text-violet-200 border-violet-500/20',
    symbol: '✧',
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
}: CardFaceProps) {
  const [imageError, setImageError] = useState(false);
  const theme = card.suit ? SUIT_THEMES[card.suit] : SUIT_THEMES.major;
  const { badge, subtitle } = getCardNumberAndRank(card, language);
  const isReversed = orientation === 'reversed';
  const showFallback = forceFallback || imageError;

  const displayName = language === 'vi' ? card.name.vi : card.name.en;
  const secondaryName = language === 'vi' ? card.name.en : card.name.vi;

  const currentKeywords = card.keywords?.[orientation]?.[language] ?? [];

  return (
    <div
      data-testid="card-face"
      data-card-id={card.id}
      data-suit={card.suit ?? 'major'}
      data-orientation={orientation}
      className={`relative w-full aspect-[2/3] rounded-xl overflow-hidden border shadow-lg transition-transform duration-300 flex flex-col justify-between p-3 select-none ${theme.border} bg-gradient-to-b ${theme.bg} ${className}`}
    >
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
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent flex flex-col items-center text-center">
            {isReversed && (
              <span
                data-testid="reversed-badge"
                className="mb-1 px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold bg-rose-500/30 text-rose-300 border border-rose-500/40 backdrop-blur-xs"
              >
                {language === 'vi' ? 'Ngược' : 'Rev'}
              </span>
            )}
            <h4
              data-testid="card-name"
              className="text-xs sm:text-sm font-bold text-amber-200 leading-tight drop-shadow"
            >
              {displayName}
            </h4>
            {language === 'vi' && (
              <p className="text-[10px] text-slate-300 italic drop-shadow-xs">{card.name.en}</p>
            )}
          </div>
        </div>
      ) : (
        /* Text-based fallback face styled by suit */
        <div className="relative z-10 flex flex-col justify-between h-full w-full">
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
                  className="px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30"
                >
                  {language === 'vi' ? 'Ngược' : 'Rev'}
                </span>
              )}
              <span className={`text-sm ${theme.accent}`} title={card.suit ?? 'major'}>
                {theme.symbol}
              </span>
            </div>
          </div>

          {/* Center: Decorative Frame & Card Name */}
          <div className="my-auto text-center px-2 py-3 rounded-lg border border-white/5 bg-slate-900/60 backdrop-blur-xs space-y-1">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-medium">
              {subtitle}
            </p>
            <h3
              data-testid="card-name"
              className={`text-base sm:text-lg font-bold tracking-tight leading-tight ${theme.accent}`}
            >
              {displayName}
            </h3>
            <p className="text-[11px] text-slate-500 italic">{secondaryName}</p>
          </div>

          {/* Bottom footer: Keywords preview */}
          <div className="space-y-1">
            <div className="flex flex-wrap gap-1 justify-center">
              {currentKeywords.slice(0, 3).map((kw, i) => (
                <span
                  key={i}
                  className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
