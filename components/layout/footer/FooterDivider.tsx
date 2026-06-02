import { cn } from '@/lib/utils';

interface FooterDividerProps {
  className?: string;
  variant?: 'horizontal' | 'vertical';
}

export function FooterDivider({ className, variant = 'horizontal' }: FooterDividerProps) {
  if (variant === 'vertical') {
    return (
      <div
        aria-hidden
        className={cn(
          'relative w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-bronze-400/35 to-transparent',
          className,
        )}
      >
        <svg
          viewBox="0 0 10 10"
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 text-bronze-400/70"
        >
          <path
            d="M5 0.5 L6 4 L9.5 5 L6 6 L5 9.5 L4 6 L0.5 5 L4 4 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </svg>
      </div>
    );
  }

  return (
    <div aria-hidden className={cn('relative w-full py-1', className)}>
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-bronze-400/35 to-transparent" />
      <svg
        viewBox="0 0 10 10"
        className="relative mx-auto block h-2 w-2 text-bronze-400/70"
      >
        <path
          d="M5 0.5 L6 4 L9.5 5 L6 6 L5 9.5 L4 6 L0.5 5 L4 4 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        />
      </svg>
    </div>
  );
}
