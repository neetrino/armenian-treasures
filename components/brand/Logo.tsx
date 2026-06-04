import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'on-dark' | 'on-light';
  subtitle?: string;
  title?: string;
}

function LogoMark({ isDark }: { isDark: boolean }) {
  return (
    <span
      className={cn(
        'relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1',
        isDark
          ? 'bg-gradient-to-br from-bronze-500 to-bronze-600 text-midnight-900 ring-white/25 shadow-[0_0_20px_-4px_rgba(200,132,61,0.55)]'
          : 'bg-pomegranate text-parchment-50 ring-pomegranate-700/30',
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 3 L14 9 H19 L15 12.5 L16.5 19 L12 15.5 L7.5 19 L9 12.5 L5 9 H10 Z" opacity="0.9" />
        <path
          d="M12 7 V17 M9 10 H15 M9 14 H15"
          stroke="currentColor"
          strokeWidth="1.25"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  variant = 'on-dark',
  subtitle = 'Cultural Heritage Foundation',
  title = 'Armenian Treasures',
}: LogoProps) {
  const isDark = variant === 'on-dark';
  return (
    <Link
      href="/"
      className={cn('group inline-flex min-w-0 items-center gap-3 text-left', className)}
      aria-label={`${title} — home`}
    >
      <LogoMark isDark={isDark} />
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            'truncate font-display text-lg font-semibold tracking-tight sm:text-xl',
            isDark ? 'text-parchment-50' : 'text-ink',
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'truncate text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px]',
            isDark ? 'text-bronze-400/95' : 'text-bronze-700',
          )}
        >
          {subtitle}
        </span>
      </span>
    </Link>
  );
}
