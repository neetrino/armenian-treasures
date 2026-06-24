interface HeroScrollIndicatorProps {
  className?: string;
}

export function HeroScrollIndicator({ className }: HeroScrollIndicatorProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none flex flex-col items-center gap-2 ${className ?? ''}`}
    >
      <span className="h-[42px] w-px bg-gradient-to-b from-[rgba(232,216,155,0.45)] to-transparent" />
      <span className="font-cinzel text-[9px] font-medium uppercase tracking-[0.28em] text-[rgba(232,216,155,0.45)]">
        Scroll
      </span>
    </div>
  );
}
