import { useEffect, useRef } from 'react';
import type { Language } from '../../app/types';
import { CardBack } from './CardBack';

export interface TarotArchDeckProps {
  language: Language;
  pickedDeckIndices: number[];
  isComplete: boolean;
  isSpreading: boolean;
  shouldReduceMotion: boolean;
  onPickCard: (index: number) => void;
  getCardAriaLabel: (index: number) => string;
  getPickHelpText: () => string;
  getCardTitle?: (index: number) => string;
}

const TOTAL_CARDS = 78;

interface CardPos {
  x: number;
  baseY: number;
  angle: number;
  baseZ: number;
}

// Precompute static geometry outside component for zero per-frame allocation
// Symmetrical z-index ensures both beginning (card 0) and end (card 77) of the deck
// are rendered on top of adjacent cards so their full card artwork is never cut off!
const CARD_GEOMETRY: CardPos[] = Array.from({ length: TOTAL_CARDS }, (_, i) => {
  const mid = (TOTAL_CARDS - 1) / 2; // 38.5
  const tProgress = (i - mid) / mid; // -1 to +1
  const containerCenter = 570;
  const cardHalfWidth = 42;
  const x = containerCenter + tProgress * 480 - cardHalfWidth;
  const angle = tProgress * 36;
  const baseY = 80 + (1 - Math.cos(tProgress * Math.PI * 0.44)) * 175;

  // Symmetrical z-index: peaks at both ends (i = 0 and i = 77)
  const distFromCenter = Math.abs(i - mid);
  const baseZ = Math.round(distFromCenter * 10) + 1; // 1 at center, ~386 at ends

  return { x, baseY, angle, baseZ };
});

export function TarotArchDeck({
  pickedDeckIndices,
  isComplete,
  isSpreading,
  shouldReduceMotion,
  onPickCard,
  getCardAriaLabel,
  getPickHelpText,
  getCardTitle,
}: TarotArchDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElements = useRef<(HTMLButtonElement | null)[]>([]);

  // Physics animation state tracked in refs for 60/120fps GPU performance
  const targetCardPos = useRef<number | null>(null);
  const currentWavePos = useRef<number | null>(null);
  const waveIntensity = useRef<number>(0);
  const rafHandle = useRef<number | null>(null);
  const isDisplaced = useRef<boolean>(false);

  // Stop RAF and reset if component unmounts
  useEffect(() => {
    return () => {
      if (rafHandle.current !== null) {
        cancelAnimationFrame(rafHandle.current);
      }
    };
  }, []);

  const ensureAnimationLoop = () => {
    if (rafHandle.current !== null || shouldReduceMotion) return;
    rafHandle.current = requestAnimationFrame(updateFrame);
  };

  const updateFrame = () => {
    // Lerp towards target position and smoothly fade intensity
    if (targetCardPos.current !== null && !isComplete && !isSpreading) {
      if (currentWavePos.current === null) {
        currentWavePos.current = targetCardPos.current;
      } else {
        // Fast, fluid lerp towards cursor
        currentWavePos.current += (targetCardPos.current - currentWavePos.current) * 0.24;
      }
      waveIntensity.current = Math.min(1, waveIntensity.current + 0.14);
    } else {
      waveIntensity.current = Math.max(0, waveIntensity.current - 0.08);
    }

    const intensity = waveIntensity.current;
    const centerPos = currentWavePos.current;

    // Settle to rest
    if (intensity <= 0.001) {
      if (isDisplaced.current) {
        for (let i = 0; i < TOTAL_CARDS; i++) {
          const el = cardElements.current[i];
          if (!el) continue;
          const geom = CARD_GEOMETRY[i];
          const isPicked = pickedDeckIndices.includes(i);
          const scale = isPicked ? 0.85 : 1;
          el.style.transform = `translate3d(0, 0, 0) rotate(${geom.angle}deg) scale(${scale})`;
          el.style.zIndex = isPicked ? '0' : String(geom.baseZ);
          el.style.boxShadow = '';
          el.style.filter = '';
        }
        isDisplaced.current = false;
        currentWavePos.current = null;
      }
      rafHandle.current = null;
      return;
    }

    isDisplaced.current = true;

    if (centerPos !== null) {
      const radius = 4.8; // Wave span of ~5 cards on each side
      for (let i = 0; i < TOTAL_CARDS; i++) {
        const el = cardElements.current[i];
        if (!el) continue;

        const isPicked = pickedDeckIndices.includes(i);
        const geom = CARD_GEOMETRY[i];

        if (isPicked) {
          el.style.transform = `translate3d(0, 0, 0) rotate(${geom.angle}deg) scale(0.85)`;
          el.style.zIndex = '0';
          el.style.boxShadow = '';
          el.style.filter = '';
          continue;
        }

        const dist = Math.abs(i - centerPos);

        if (dist >= radius) {
          el.style.transform = `translate3d(0, 0, 0) rotate(${geom.angle}deg) scale(1)`;
          el.style.zIndex = String(geom.baseZ);
          el.style.boxShadow = '';
          el.style.filter = '';
        } else {
          // Soliton cosine bell curve: exactly 1 at center, 0 at edge, C1 continuous
          const bell = 0.5 * (1 + Math.cos((dist / radius) * Math.PI)) * intensity;
          const liftY = -54 * bell;
          const scale = 1 + 0.18 * bell;
          // Hovered card lifts above all base cards
          const zIndex = Math.round(geom.baseZ + bell * 500);

          el.style.transform = `translate3d(0, ${liftY.toFixed(2)}px, 0) rotate(${geom.angle}deg) scale(${scale.toFixed(3)})`;
          el.style.zIndex = String(zIndex);

          if (bell > 0.55) {
            el.style.boxShadow = `0 ${Math.round(18 * bell)}px ${Math.round(36 * bell)}px rgba(251, 191, 36, ${(0.6 * bell).toFixed(2)})`;
            el.style.filter = `brightness(${(1 + 0.14 * bell).toFixed(2)})`;
          } else if (bell > 0.2) {
            el.style.boxShadow = `0 ${Math.round(10 * bell)}px ${Math.round(20 * bell)}px rgba(251, 191, 36, ${(0.35 * bell).toFixed(2)})`;
            el.style.filter = '';
          } else {
            el.style.boxShadow = '';
            el.style.filter = '';
          }
        }
      }
    }

    rafHandle.current = requestAnimationFrame(updateFrame);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isComplete || isSpreading || shouldReduceMotion) return;

    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const clientX = e.clientX;
    const clientY = e.clientY;

    const relativeX = ((clientX - rect.left) / rect.width) * 1140;
    const relativeY = ((clientY - rect.top) / rect.height) * 400;

    // Horizontal bounds: beyond outermost cards
    if (relativeX < 20 || relativeX > 1120) {
      targetCardPos.current = null;
      ensureAnimationLoop();
      return;
    }

    // Arch-following vertical bounds
    const tProgress = (relativeX - 570) / 480;
    const clampedT = Math.max(-1, Math.min(1, tProgress));
    const cardBaseY = 80 + (1 - Math.cos(clampedT * Math.PI * 0.44)) * 175;

    // Empty space check
    if (relativeY < cardBaseY - 85 || relativeY > cardBaseY + 160) {
      targetCardPos.current = null;
      ensureAnimationLoop();
      return;
    }

    // Map relativeX back to continuous float card index
    const cardPos = 38.5 + tProgress * 38.5;
    targetCardPos.current = Math.max(0, Math.min(TOTAL_CARDS - 1, cardPos));

    ensureAnimationLoop();
  };

  const handlePointerLeave = () => {
    targetCardPos.current = null;
    ensureAnimationLoop();
  };

  const handleCardClick = (index: number) => {
    if (isComplete || isSpreading || pickedDeckIndices.includes(index)) return;
    targetCardPos.current = null;
    ensureAnimationLoop();
    onPickCard(index);
  };

  const handleCardFocus = (index: number) => {
    if (isComplete || isSpreading || shouldReduceMotion) return;
    targetCardPos.current = index;
    ensureAnimationLoop();
  };

  const handleCardBlur = (index: number) => {
    if (targetCardPos.current === index) {
      targetCardPos.current = null;
      ensureAnimationLoop();
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      className="relative w-285 h-95 sm:h-100 mx-auto select-none overflow-visible will-change-transform"
    >
      {Array.from({ length: TOTAL_CARDS }).map((_, i) => {
        const isPicked = pickedDeckIndices.includes(i);
        const geom = CARD_GEOMETRY[i];
        const cardTitle = getCardTitle ? getCardTitle(i + 1) : `Card #${i + 1}`;

        return (
          <button
            key={i}
            ref={(el) => {
              cardElements.current[i] = el;
            }}
            type="button"
            onClick={() => handleCardClick(i)}
            disabled={isPicked || isComplete || isSpreading}
            aria-label={getCardAriaLabel(i + 1)}
            title={`${cardTitle} (${getPickHelpText()})`}
            onFocus={() => handleCardFocus(i)}
            onBlur={() => handleCardBlur(i)}
            style={{
              position: 'absolute',
              left: `${geom.x}px`,
              top: `${geom.baseY}px`,
              transform: `translate3d(0, 0, 0) rotate(${geom.angle}deg) scale(${isPicked ? 0.85 : 1})`,
              transformOrigin: 'bottom center',
              zIndex: isPicked ? 0 : geom.baseZ,
              opacity: isPicked ? 0.12 : 1,
              transition: isPicked
                ? 'opacity 0.3s ease-out, transform 0.3s ease-out'
                : 'opacity 0.25s ease-out',
            }}
            className={`w-20 sm:w-22 md:w-24 aspect-2/3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:z-1000 cursor-pointer ${
              isPicked
                ? 'cursor-not-allowed pointer-events-none'
                : 'active:scale-95'
            }`}
          >
            <CardBack />
          </button>
        );
      })}
    </div>
  );
}
