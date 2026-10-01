import { useState, useRef } from 'react';
import type { Language } from '../../app/types';
import { CardBack } from './CardBack';

export interface TarotSerpentineDeckProps {
  language: Language;
  pickedDeckIndices: number[];
  isComplete: boolean;
  isSpreading: boolean;
  shouldReduceMotion: boolean;
  onPickCard: (index: number) => void;
  getCardAriaLabel: (index: number) => string;
  getPickHelpText: () => string;
}

const TOTAL_CARDS = 78;
const ROWS = 6;
const TURNS = 5;

interface SerpentineCardGeom {
  xPercent: number; // 0 to 100% of usable track width
  yPercent: number; // 0 to 100% of total height
  angle: number;    // degrees of tilt
  row: number;
}

/**
 * Precompute the smooth S-curve / serpentine geometry for all 78 cards.
 * Zero runtime allocation.
 */
const SERPENTINE_GEOMETRY: SerpentineCardGeom[] = Array.from(
  { length: TOTAL_CARDS },
  (_, i) => {
    const s = i / (TOTAL_CARDS - 1); // 0 to 1
    const phi = s * TURNS * Math.PI;

    // Smooth harmonic S-curve: 0 -> 1 -> 0 -> 1 -> 0 -> 1
    const xNorm = (1 - Math.cos(phi)) / 2;
    const yNorm = s;

    // Organic curve angle: at turns the cards rotate gently (+-16 deg)
    const sinPhi = Math.sin(phi);
    const angle = sinPhi * 16;
    const row = Math.min(ROWS - 1, Math.floor(s * ROWS));

    return {
      xPercent: xNorm * 100,
      yPercent: yNorm * 100,
      angle: Number(angle.toFixed(1)),
      row,
    };
  }
);

export function TarotSerpentineDeck({
  pickedDeckIndices,
  isComplete,
  isSpreading,
  shouldReduceMotion,
  onPickCard,
  getCardAriaLabel,
  getPickHelpText,
}: TarotSerpentineDeckProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (index: number) => {
    if (isComplete || isSpreading || pickedDeckIndices.includes(index)) return;
    onPickCard(index);
  };

  // Pointer move / touch tracking for both desktop hover & mobile touch dragging
  const handlePointerAction = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isComplete || isSpreading || shouldReduceMotion) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      setHoveredIndex(null);
      return;
    }

    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    // Find closest unpicked card to pointer position
    let closestIndex: number | null = null;
    let minDistance = Infinity;
    const maxRadius = Math.max(50, rect.width * 0.16);

    for (let i = 0; i < TOTAL_CARDS; i++) {
      if (pickedDeckIndices.includes(i)) continue;
      const geom = SERPENTINE_GEOMETRY[i];
      const cardCenterX = (0.06 + (geom.xPercent / 100) * 0.74) * rect.width;
      const cardCenterY = (0.02 + (geom.yPercent / 100) * 0.84) * rect.height;

      const dx = relX - cardCenterX;
      const dy = relY - cardCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDistance && dist < maxRadius) {
        minDistance = dist;
        closestIndex = i;
      }
    }

    setHoveredIndex(closestIndex);
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    // If user touched & released finger on mobile over a card, pick that card!
    if (e.pointerType === 'touch' && hoveredIndex !== null) {
      if (!pickedDeckIndices.includes(hoveredIndex) && !isComplete && !isSpreading) {
        onPickCard(hoveredIndex);
      }
    }
    setHoveredIndex(null);
  };

  // Keyboard navigation between cards
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (isComplete || isSpreading) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(index);
      return;
    }

    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') {
      nextIndex = Math.min(TOTAL_CARDS - 1, index + 1);
    } else if (e.key === 'ArrowLeft') {
      nextIndex = Math.max(0, index - 1);
    } else if (e.key === 'ArrowDown') {
      nextIndex = Math.min(TOTAL_CARDS - 1, index + 13);
    } else if (e.key === 'ArrowUp') {
      nextIndex = Math.max(0, index - 13);
    }

    if (nextIndex !== null && nextIndex !== index) {
      e.preventDefault();
      const targetBtn = containerRef.current?.querySelector<HTMLButtonElement>(
        `button[data-card-index="${nextIndex}"]`
      );
      targetBtn?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerAction}
      onPointerDown={handlePointerAction}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      className="relative w-full max-w-xl mx-auto select-none overflow-visible py-4 sm:py-6 px-1 sm:px-4 touch-pan-y"
    >
      {/* Decorative Winding Track Guidance Guide in Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path
          d={`M 10 4 ${Array.from({ length: TURNS + 1 })
            .map((_, idx) => {
              const y = 4 + (idx * 92) / TURNS;
              const x = idx % 2 === 0 ? 10 : 90;
              const nextY = 4 + ((idx + 1) * 92) / TURNS;
              const nextX = idx % 2 === 0 ? 90 : 10;
              if (idx === TURNS) return `L ${x} ${y}`;
              return `C ${x} ${y + 8}, ${nextX} ${nextY - 8}, ${nextX} ${nextY}`;
            })
            .join(' ')}`}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
      </svg>

      {/* Snake / Serpentine Deck Container */}
      <div className="relative w-full h-130 sm:h-145 md:h-155">
        {SERPENTINE_GEOMETRY.map((geom, i) => {
          const isPicked = pickedDeckIndices.includes(i);
          const isHovered = hoveredIndex === i;

          const leftPercent = 6 + geom.xPercent * 0.74; // keeps within 6% to 80% bounds
          const topPercent = 2 + geom.yPercent * 0.84; // keeps within 2% to 86% bounds

          const zIndex = isHovered ? 999 : isPicked ? 0 : i + 1;
          const liftScale = isHovered ? 1.22 : 1;
          const liftTranslateY = isHovered ? -14 : 0;

          return (
            <button
              key={i}
              data-card-index={i}
              type="button"
              onClick={() => handleCardClick(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onMouseEnter={() => !isPicked && setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => !isPicked && setHoveredIndex(i)}
              onBlur={() => setHoveredIndex(null)}
              disabled={isPicked || isComplete || isSpreading}
              aria-label={getCardAriaLabel(i + 1)}
              title={`Card #${i + 1} (${getPickHelpText()})`}
              style={{
                position: 'absolute',
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: `translate3d(-50%, ${liftTranslateY}px, 0) rotate(${geom.angle}deg) scale(${
                  isPicked ? 0.8 : liftScale
                })`,
                zIndex,
                opacity: isPicked ? 0.12 : 1,
                transformOrigin: 'center center',
                transition: shouldReduceMotion
                  ? 'none'
                  : 'transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.25s ease-out, box-shadow 0.2s ease-out',
                boxShadow: isHovered
                  ? '0 12px 28px rgba(251, 191, 36, 0.45), 0 0 16px rgba(245, 158, 11, 0.3)'
                  : undefined,
              }}
              className={`w-12 sm:w-14 md:w-16 aspect-2/3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:z-1000 cursor-pointer ${
                isPicked
                  ? 'cursor-not-allowed pointer-events-none'
                  : 'hover:brightness-110 active:scale-95'
              }`}
            >
              <CardBack />
            </button>
          );
        })}
      </div>
    </div>
  );
}
