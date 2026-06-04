import { cn } from '@/lib/utils';

interface HeroTitleDividerProps {
  className?: string;
  variant?: 'above' | 'below';
}

export function HeroTitleDivider({
  className,
  variant = 'above',
}: HeroTitleDividerProps) {
  const isBelow = variant === 'below';

  return (
    <div
      aria-hidden
      className={cn('flex items-center gap-2.5 sm:gap-3', className)}
      role="presentation"
    >
      <span
        className={cn(
          'h-px bg-gradient-to-r from-bronze-500/90 to-transparent',
          isBelow ? 'w-16 sm:w-20' : 'w-10 sm:w-14',
        )}
      />
      <svg
        viewBox="0 0 20 20"
        className="h-2.5 w-2.5 shrink-0 text-bronze-500/80 sm:h-3 sm:w-3"
        fill="currentColor"
        aria-hidden
      >
        <path d="M10 1 L19 10 L10 19 L1 10 Z" opacity="0.85" />
        <circle cx="10" cy="10" r="1.25" fill="#12081c" opacity="0.9" />
      </svg>
      <span
        className={cn(
          'h-px bg-gradient-to-r from-bronze-500/55 to-transparent',
          isBelow ? 'max-w-[120px] flex-1 sm:max-w-[160px]' : 'w-8 sm:w-12',
        )}
      />
      {isBelow ? (
        <span className="hidden h-px w-6 bg-bronze-500/25 sm:block" />
      ) : null}
    </div>
  );
}
