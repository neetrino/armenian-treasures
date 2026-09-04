import type { ReactNode } from 'react';
import Link from 'next/link';
import { HeroImageOverlay } from '@/components/sections/hero/HeroImageOverlay';
import { cn } from '@/lib/utils';
import { containsArmenianScript } from '@/lib/i18n/armenian-script';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

export interface LandingHeroCta {
  label: string;
  href: string;
  variant: 'gold' | 'teal' | 'outline';
}

interface LandingHeroProps {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  slogan?: string;
  heroImage?: string | null;
  ctas?: LandingHeroCta[];
  heroClassName?: string;
  showScroll?: boolean;
  breadcrumb?: ReactNode;
  locale?: SiteLocaleCode;
}

const CTA_CLASS: Record<LandingHeroCta['variant'], string> = {
  gold: 'btn-gold',
  teal: 'btn-teal',
  outline: 'btn-outline',
};

function LandingHeroCornerOrnament() {
  return (
    <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
    </svg>
  );
}

function LandingHeroCtaLink({ cta }: { cta: LandingHeroCta }) {
  const className = cn(
    CTA_CLASS[cta.variant],
    containsArmenianScript(cta.label) && 'btn--hy',
  );
  if (cta.href.startsWith('#')) {
    return (
      <a href={cta.href} className={className}>
        {cta.label}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export function LandingHero({
  eyebrow,
  title,
  accent,
  subtitle,
  slogan,
  heroImage,
  ctas = [],
  heroClassName = 'cultural-portal-hero',
  showScroll = true,
  breadcrumb,
  locale = 'EN',
}: LandingHeroProps) {
  const titleIsArmenian = containsArmenianScript(title);
  const accentIsArmenian = containsArmenianScript(accent);
  const sloganIsArmenian = Boolean(slogan && containsArmenianScript(slogan));

  return (
    <div className={cn('hero', heroClassName)} data-site-hero>
      {breadcrumb}
      {heroImage ? <HeroImageOverlay imageUrl={heroImage} className="hero-img-overlay" /> : null}
      <div className="hero-bg" />
      <div className="hero-grain" />
      <LandingHeroCornerOrnament />
      <div className="hero-content">
        <p
          className={cn(
            'hero-eyebrow reveal',
            containsArmenianScript(eyebrow) && 'hero-eyebrow--hy',
          )}
        >
          {eyebrow}
        </p>
        <h1 className={cn('reveal', titleIsArmenian && 'hero-title--hy')}>
          {title}
          <span className={cn(accentIsArmenian && 'hero-accent--hy')}>{accent}</span>
        </h1>
        {slogan ? (
          <p className={cn('hero-slogan reveal', sloganIsArmenian && 'hero-slogan--hy')}>{slogan}</p>
        ) : null}
        {subtitle ? <p className="hero-sub reveal">{subtitle}</p> : null}
        {ctas.length > 0 ? (
          <div className="hero-btns reveal">
            {ctas.map((cta) => (
              <LandingHeroCtaLink key={`${cta.href}-${cta.label}`} cta={cta} />
            ))}
          </div>
        ) : null}
      </div>
      {showScroll ? (
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>{uiMessage(locale, 'scroll')}</span>
        </div>
      ) : null}
    </div>
  );
}
