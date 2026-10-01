export interface CardBackProps {
  className?: string;
}

export function CardBack({ className = '' }: CardBackProps) {
  return (
    <div
      data-testid="card-back"
      className={`relative w-full aspect-2/3 rounded-xl overflow-hidden border border-amber-500/40 bg-linear-to-b from-indigo-950 via-slate-950 to-purple-950 shadow-xl shadow-purple-950/40 flex flex-col items-center justify-center p-2.5 select-none transition-all duration-300 ${className}`}
    >
      {/* Outer decorative border */}
      <div className="absolute inset-1 rounded-lg border border-amber-500/20 flex flex-col items-center justify-between p-2 pointer-events-none">
        {/* Corner symbols */}
        <div className="w-full flex justify-between text-[9px] text-amber-400/50 leading-none">
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
        <div className="w-full flex justify-between text-[9px] text-amber-400/50 leading-none">
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      </div>

      {/* Central Mystical Mandala / Sacred Geometry */}
      <div className="relative flex items-center justify-center">
        {/* Glow */}
        <div className="absolute w-12 h-12 rounded-full bg-amber-500/10 blur-md pointer-events-none" />

        {/* Concentric rings */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-amber-500/30 flex items-center justify-center bg-slate-950/50">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-amber-400/40 border-dashed flex items-center justify-center rotate-45">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 fill-amber-300/30 stroke-amber-300 -rotate-45"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mystical subtle star dust / glyphs */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] bg-size-[12px_12px] opacity-10 pointer-events-none" />
    </div>
  );
}
