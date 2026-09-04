import Link from 'next/link';
import type { DonationPageContent } from '@/lib/queries/page-content';
import { HeroImageOverlay } from '@/components/sections/hero/HeroImageOverlay';
import { HeroBadgeCheckIcon, HeroBadgeClockIcon, HeroBadgeStarIcon } from '@/components/donation-page/donation-icons';
import { containsArmenianScript } from '@/lib/i18n/armenian-script';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { cn } from '@/lib/utils';

const BADGE_ICONS = {
  clock: HeroBadgeClockIcon,
  star: HeroBadgeStarIcon,
  check: HeroBadgeCheckIcon,
} as const;

type DonationBreadcrumbProps = {
  breadcrumb: string;
  locale: SiteLocaleCode;
};

export function DonationBreadcrumb({ breadcrumb, locale }: DonationBreadcrumbProps) {
  return (
    <div className="breadcrumb" aria-label={uiMessage(locale, 'breadcrumb')}>
      <Link href="/">{uiMessage(locale, 'armenianTreasures')}</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>{breadcrumb}</span>
    </div>
  );
}

type DonationHeroProps = {
  breadcrumb: string;
  hero: DonationPageContent['page']['hero'];
  heroImage?: string | null;
  locale?: SiteLocaleCode;
};

export function DonationHero({
  breadcrumb,
  hero,
  heroImage,
  locale = 'EN',
}: DonationHeroProps) {
  const titleIsArmenian =
    containsArmenianScript(hero.title) || containsArmenianScript(hero.titleLine2);

  return (
    <div className="hero donation-hero" data-site-hero>
      <DonationBreadcrumb breadcrumb={breadcrumb} locale={locale} />
      {heroImage ? <HeroImageOverlay imageUrl={heroImage} className="hero-img-overlay" /> : null}
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-content">
        <p className="hero-eyebrow reveal">{hero.eyebrow}</p>
        <h1 className={cn('reveal', titleIsArmenian && 'hero-title--hy')}>
          {hero.title}
          <br />
          {hero.titleLine2}
          <span className={cn(containsArmenianScript(hero.accent) && 'hero-accent--hy')}>
            {hero.accent}
          </span>
        </h1>
        <p className="hero-sub reveal">{hero.subtitle}</p>
        <div className="hero-badges reveal" aria-label={uiMessage(locale, 'platformHighlights')}>
          {hero.badges.map((badge) => {
            const Icon = BADGE_ICONS[badge.icon];
            return (
              <span key={badge.label} className="hero-badge">
                <Icon />
                {badge.label}
              </span>
            );
          })}
        </div>
      </div>
      <div className="hero-scroll" aria-hidden>
        <span>{uiMessage(locale, 'scroll')}</span>
        <div className="scroll-line" />
      </div>
    </div>
  );
}
