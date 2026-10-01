export interface CardBackProps {
  className?: string;
}

export function CardBack({ className = '' }: CardBackProps) {
  return (
    <div
      data-testid="card-back"
      className={`relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-amber-500/40 bg-gradient-to-b from-indigo-950 via-slate-950 to-purple-950 shadow-xl shadow-purple-950/40 flex flex-col items-center justify-center p-2.5 select-none transition-all duration-300 ${className}`}
    >
      {/* Outer decorative border */}
      <div className="absolute inset-1 rounded-lg border border-amber-500/20 flex flex-col items-center justify-between p-2 pointer-events-none">
        {/* Corner symbols */}
        <div className="w-full flex justify-between text-[9px] text-amber-400/50 leading-none">
          <span>✦</span>
          <span>✦</span>
        </div>
        <div className="w-full flex justify-between text-[9px] text-amber-400/50 leading-none">
          <span>✦</span>
          <span>✦</span>
        </div>
      </div>

      {/* Central Mystical Mandala / Sacred Geometry */}
      <div className="relative flex items-center justify-center">
        {/* Glow */}
        <div className="absolute w-12 h-12 rounded-full bg-amber-500/10 blur-md pointer-events-none" />

        {/* Concentric rings */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-amber-500/30 flex items-center justify-center bg-slate-950/50">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-amber-400/40 border-dashed flex items-center justify-center rotate-45">
            <span className="text-amber-300 text-base sm:text-lg -rotate-45 select-none filter drop-shadow">
              🜚
            </span>
          </div>
        </div>
      </div>

      {/* Mystical subtle star dust / glyphs */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:12px_12px] opacity-10 pointer-events-none" />
    </div>
  );
}
