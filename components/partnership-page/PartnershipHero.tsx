import Link from 'next/link';
import { HeroImageOverlay } from '@/components/sections/hero/HeroImageOverlay';
import { containsArmenianScript } from '@/lib/i18n/armenian-script';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { cn } from '@/lib/utils';

export function PartnershipBreadcrumb({ locale }: { locale: SiteLocaleCode }) {
  return (
    <div className="breadcrumb" aria-label={uiMessage(locale, 'breadcrumb')}>
      <Link href="/">{uiMessage(locale, 'armenianTreasures')}</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>{uiMessage(locale, 'partnerships')}</span>
    </div>
  );
}

interface PartnershipHeroProps {
  heroImage?: string | null;
  locale: SiteLocaleCode;
}

export function PartnershipHero({ heroImage, locale }: PartnershipHeroProps) {
  const title = uiMessage(locale, 'safeguarding');
  const titleLine2 = uiMessage(locale, 'armenian');
  const accent = uiMessage(locale, 'civilisationTogether');
  const globalAlliance = uiMessage(locale, 'globalAlliance');
  const becomePartner = uiMessage(locale, 'becomeAPartner');
  const ourPartners = uiMessage(locale, 'ourPartners');
  const titleIsArmenian =
    containsArmenianScript(title) ||
    containsArmenianScript(titleLine2) ||
    containsArmenianScript(accent);

  return (
    <div className="hero partnership-hero" data-site-hero>
      <PartnershipBreadcrumb locale={locale} />
      {heroImage ? <HeroImageOverlay imageUrl={heroImage} className="hero-img-overlay" /> : null}
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-bloom" style={{ width: 780, height: 780, top: '-12%', left: '-22%', ['--bd' as string]: '9s' }} />
      <div
        className="hero-bloom"
        style={{ width: 560, height: 560, bottom: '-8%', right: '-12%', ['--bd' as string]: '7.5s', ['--bdelay' as string]: '3.5s' }}
      />
      <svg className="hero-geo" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <polygon points="720,60 820,200 620,200" stroke="rgba(201,168,76,0.07)" strokeWidth="1" fill="none" />
        <polygon points="720,60 900,240 540,240" stroke="rgba(42,191,191,0.04)" strokeWidth="1" fill="none" />
        <circle cx="720" cy="450" r="340" stroke="rgba(201,168,76,0.04)" strokeWidth="1" fill="none" />
        <circle cx="720" cy="450" r="420" stroke="rgba(42,191,191,0.025)" strokeWidth="1" fill="none" />
        <line x1="0" y1="450" x2="300" y2="450" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
        <line x1="1140" y1="450" x2="1440" y2="450" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
      </svg>
      <div className="hero-content">
        <div
          className={cn(
            'hero-eyebrow reveal',
            containsArmenianScript(globalAlliance) && 'hero-eyebrow--hy',
          )}
        >
          {globalAlliance}
        </div>
        <h1 className={cn('reveal', titleIsArmenian && 'hero-title--hy')}>
          {title}
          <br />
          {titleLine2}
          <span className={cn(containsArmenianScript(accent) && 'hero-accent--hy')}>{accent}</span>
        </h1>
        <p className="hero-tagline reveal">{uiMessage(locale, 'partnershipTagline')}</p>
        <p className="hero-sub reveal">{uiMessage(locale, 'partnershipHeroDescription')}</p>
        <div className="hero-btns reveal">
          <a
            href="#partner-form"
            className={cn('btn-gold', containsArmenianScript(becomePartner) && 'btn--hy')}
          >
            {becomePartner}
          </a>
          <a
            href="#partners"
            className={cn('btn-outline', containsArmenianScript(ourPartners) && 'btn--hy')}
          >
            {ourPartners}
          </a>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden>
        <div className="scroll-line" />
        <span>{uiMessage(locale, 'scroll')}</span>
      </div>
    </div>
  );
}
