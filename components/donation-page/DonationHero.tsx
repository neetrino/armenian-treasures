import Link from 'next/link';
import { DONATION_PAGE } from '@/lib/constants/donation-page';
import { HeroBadgeCheckIcon, HeroBadgeClockIcon, HeroBadgeStarIcon } from '@/components/donation-page/donation-icons';

const BADGE_ICONS = {
  clock: HeroBadgeClockIcon,
  star: HeroBadgeStarIcon,
  check: HeroBadgeCheckIcon,
} as const;

export function DonationBreadcrumb() {
  return (
    <div className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Armenian Treasures</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>{DONATION_PAGE.breadcrumb}</span>
    </div>
  );
}

export function DonationHero() {
  const { hero } = DONATION_PAGE;

  return (
    <div className="hero donation-hero">
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
