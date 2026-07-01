interface HeroScrollIndicatorProps {
  className?: string;
}

export function HeroScrollIndicator({ className }: HeroScrollIndicatorProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none flex flex-col items-center gap-2 ${className ?? ''}`}
    >
      <span className="relative h-[46px] w-px bg-gradient-to-b from-[rgba(232,216,155,0.65)] via-[rgba(39,198,200,0.5)] to-transparent">
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-heritage-teal motion-safe:animate-bounce motion-reduce:animate-none" />
      </span>
      <span className="font-cinzel text-[9px] font-medium uppercase tracking-[0.28em] text-surface-subtle">
        Scroll
      </span>
    </div>
  );
}
