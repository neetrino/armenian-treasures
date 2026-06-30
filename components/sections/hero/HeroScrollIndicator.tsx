interface HeroScrollIndicatorProps {
  className?: string;
}

export function HeroScrollIndicator({ className }: HeroScrollIndicatorProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none flex flex-col items-center gap-2 ${className ?? ''}`}
    >
      <span className="h-[42px] w-px bg-gradient-to-b from-surface-subtle to-transparent" />
      <span className="font-cinzel text-[9px] font-medium uppercase tracking-[0.28em] text-surface-subtle">
        Scroll
      </span>
    </div>
  );
}
