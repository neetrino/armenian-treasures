import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'on-dark' | 'on-light';
  subtitle?: string;
  title?: string;
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
      className={cn(
        'group inline-flex items-center gap-3 text-left',
        className,
      )}
      aria-label={`${title} — home`}
    >
      <span
        className={cn(
          'inline-flex h-11 w-11 items-center justify-center rounded-full font-display text-xl font-semibold',
          isDark
            ? 'bg-bronze-500 text-midnight-900 ring-1 ring-white/20'
            : 'bg-pomegranate text-parchment-50 ring-1 ring-pomegranate-700/30',
        )}
        aria-hidden
      >
        U.
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            'font-display text-lg sm:text-xl',
            isDark ? 'text-parchment-50' : 'text-ink',
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'text-[11px] uppercase tracking-eyebrow',
            isDark ? 'text-bronze-400' : 'text-bronze-700',
          )}
        >
          {subtitle}
        </span>
      </span>
    </Link>
  );
}
