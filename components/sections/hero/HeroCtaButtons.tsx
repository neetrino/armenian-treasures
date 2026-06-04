import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Building2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroCtaButtonsProps {
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
  className?: string;
}

const CTA_BASE =
  'group inline-flex h-12 w-full min-h-12 max-w-full items-center justify-center gap-2.5 rounded-full px-5 text-sm font-medium tracking-wide transition-all duration-300 ease-cinematic motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12081c] md:w-auto md:px-6';

const ICON_CLASS = 'shrink-0 opacity-90';

const ARROW_CLASS =
  'shrink-0 transition-transform duration-300 ease-cinematic group-hover:translate-x-0.5 motion-reduce:transform-none';

interface HeroCtaLinkProps {
  href: string;
  label: string;
  className: string;
  leadingIcon: ReactNode;
}

function HeroCtaLink({ href, label, className, leadingIcon }: HeroCtaLinkProps) {
  return (
    <Link href={href} className={className}>
      <span className={ICON_CLASS} aria-hidden>
        {leadingIcon}
      </span>
      <span>{label}</span>
      <ArrowRight size={16} className={ARROW_CLASS} aria-hidden />
    </Link>
  );
}

export function HeroCtaButtons({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  className,
}: HeroCtaButtonsProps) {
  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-3',
        className,
      )}
    >
      <HeroCtaLink
        href={primaryHref}
        label={primaryText}
        leadingIcon={<Building2 size={18} strokeWidth={1.75} />}
        className={cn(
          CTA_BASE,
          'border border-bronze-400/30 bg-hero-gold-btn text-midnight-900 shadow-[0_8px_28px_-8px_rgba(200,132,61,0.55)]',
          'hover:-translate-y-0.5 hover:border-bronze-300/50 hover:shadow-[0_14px_40px_-6px_rgba(232,192,120,0.55)] motion-reduce:hover:translate-y-0',
        )}
      />
      <HeroCtaLink
        href={secondaryHref}
        label={secondaryText}
        leadingIcon={<MapPin size={18} strokeWidth={1.75} />}
        className={cn(
          CTA_BASE,
          'border border-white/25 bg-white/[0.06] text-parchment-50 backdrop-blur-md',
          'hover:-translate-y-0.5 hover:border-bronze-400/40 hover:bg-white/[0.1] hover:shadow-[0_0_28px_-4px_rgba(200,132,61,0.3)] motion-reduce:hover:translate-y-0',
        )}
      />
    </div>
  );
}
