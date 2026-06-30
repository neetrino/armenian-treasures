import Link from 'next/link';
import type { DonationPageContent } from '@/lib/queries/page-content';
import { HeroImageOverlay } from '@/components/sections/hero/HeroImageOverlay';
import { HeroBadgeCheckIcon, HeroBadgeClockIcon, HeroBadgeStarIcon } from '@/components/donation-page/donation-icons';

const BADGE_ICONS = {
  clock: HeroBadgeClockIcon,
  star: HeroBadgeStarIcon,
  check: HeroBadgeCheckIcon,
} as const;

type DonationBreadcrumbProps = {
  breadcrumb: string;
};

export function DonationBreadcrumb({ breadcrumb }: DonationBreadcrumbProps) {
  return (
    <div className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Armenian Treasures</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>{breadcrumb}</span>
    </div>
  );
}

type DonationHeroProps = {
  hero: DonationPageContent['page']['hero'];
  heroImage?: string | null;
};

export function DonationHero({ hero, heroImage }: DonationHeroProps) {
  return (
    <div className="hero donation-hero">
      {heroImage ? <HeroImageOverlay imageUrl={heroImage} className="hero-img-overlay" /> : null}
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-content">
        <p className="hero-eyebrow reveal">{hero.eyebrow}</p>
        <h1 className="reveal">
          {hero.title}
          <br />
          {hero.titleLine2}
          <span>{hero.accent}</span>
        </h1>
        <p className="hero-sub reveal">{hero.subtitle}</p>
        <div className="hero-badges reveal" aria-label="Platform highlights">
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
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </div>
  );
}
