import Image from 'next/image';
import Link from 'next/link';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { cn } from '@/lib/utils';

const HEADER_LOGO_SRC = resolvePublicAssetUrl('/images/brand/header-logo.webp');

interface LogoProps {
  className?: string;
  variant?: 'on-dark' | 'on-light';
  subtitle?: string;
  title?: string;
  compact?: boolean;
}

function LogoMark({ isDark, compact }: { isDark: boolean; compact?: boolean }) {
  if (isDark) {
    return (
      <Image
        src={HEADER_LOGO_SRC}
        alt=""
        width={700}
        height={923}
        className={cn(
          'h-auto w-auto shrink-0 object-contain transition-[filter] duration-300',
          compact
            ? 'max-h-[52px] drop-shadow-[0_0_6px_rgba(42,191,191,0.25)] group-hover:drop-shadow-[0_0_14px_rgba(42,191,191,0.55)]'
            : 'max-h-16 sm:max-h-[4.5rem]',
        )}
        priority
      />
    );
  }

  return (
    <span
      className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pomegranate text-parchment-50 ring-1 ring-pomegranate-700/30"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 3 L14 9 H19 L15 12.5 L16.5 19 L12 15.5 L7.5 19 L9 12.5 L5 9 H10 Z" opacity="0.9" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  variant = 'on-dark',
  subtitle = 'Cultural Heritage Foundation',
  title = 'Armenian Treasures',
  compact = false,
}: LogoProps) {
  const isDark = variant === 'on-dark';

  return (
    <Link
      href="/"
      className={cn('group inline-flex min-w-0 items-center gap-3 text-left', className)}
      aria-label={`${title} — home`}
    >
      <LogoMark isDark={isDark} compact={compact} />
      {!compact ? (
        <span className="flex min-w-0 flex-col leading-tight">
          {!isDark ? (
            <span
              className={cn(
                'truncate font-cinzel text-base font-semibold tracking-wide sm:text-lg',
                'text-ink',
              )}
            >
              {title}
            </span>
          ) : null}
          <span
            className={cn(
              'truncate font-cinzel text-[9px] font-medium uppercase tracking-[0.16em] sm:text-[10px]',
              isDark ? 'text-heritage-gold-muted/90' : 'text-bronze-700',
            )}
          >
            {subtitle}
          </span>
        </span>
      ) : null}
    </Link>
  );
}
