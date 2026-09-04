import Link from 'next/link';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';
import { HeroImageOverlay } from '@/components/sections/hero/HeroImageOverlay';
import { containsArmenianScript } from '@/lib/i18n/armenian-script';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { cn } from '@/lib/utils';

type KhndzoreskHeroProps = {
  imgBase: string;
  heroImage?: string | null;
  locale: SiteLocaleCode;
};

function LocationIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function KhndzoreskBreadcrumb({
  locale,
  title,
}: {
  locale: SiteLocaleCode;
  title: string;
}) {
  return (
    <div className="breadcrumb" aria-label={uiMessage(locale, 'breadcrumb')}>
      <Link href="/">{uiMessage(locale, 'armenianTreasures')}</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <Link href="/culture">{uiMessage(locale, 'culturePortal')}</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>{title}</span>
    </div>
  );
}

export function KhndzoreskHero({ imgBase: _imgBase, heroImage, locale }: KhndzoreskHeroProps) {
  const bannerImage = resolvePageHeroImageUrl(heroImage);
  const title = uiMessage(locale, 'khndzoreskTitle');
  const subtitle = uiMessage(locale, 'khndzoreskSubtitle');
  const eyebrow = uiMessage(locale, 'khndzoreskEyebrow');
  const slogan = uiMessage(locale, 'khndzoreskSlogan');
  const titleIsArmenian = containsArmenianScript(title);

  return (
    <div className="hero" data-site-hero>
      <KhndzoreskBreadcrumb locale={locale} title={title} />
      {bannerImage ? <HeroImageOverlay imageUrl={bannerImage} /> : null}
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div
        className="hero-bloom"
        style={{
          width: 750,
          height: 750,
          top: -120,
          left: '50%',
          transform: 'translateX(-50%)',
          ['--bd' as string]: '8s',
        }}
      />
      <div
        className="hero-bloom"
        style={{ width: 400, height: 400, bottom: 0, left: '6%', ['--bd' as string]: '6s', ['--bdelay' as string]: '2s' }}
      />
      <div
        className="hero-bloom"
        style={{ width: 340, height: 340, top: '18%', right: '4%', ['--bd' as string]: '9s', ['--bdelay' as string]: '1s' }}
      />
      <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
      </svg>
      <div className="hero-content">
        <p className={cn('hero-eyebrow', containsArmenianScript(eyebrow) && 'hero-eyebrow--hy')}>
          {eyebrow}
        </p>
        <div className="hero-location">
          <LocationIcon />
          {uiMessage(locale, 'khndzoreskLocation')}
        </div>
        <h1 className={cn(titleIsArmenian && 'hero-title--hy')}>
          {title}
          <span className={cn(containsArmenianScript(subtitle) && 'hero-accent--hy')}>{subtitle}</span>
        </h1>
        <p className={cn('hero-slogan', containsArmenianScript(slogan) && 'hero-slogan--hy')}>{slogan}</p>
        <p className="hero-sub">{uiMessage(locale, 'khndzoreskSub')}</p>
        <div className="hero-btns">
          <a href="#virtual-tour" className="btn-gold btn--hy">
            {uiMessage(locale, 'exploreVirtualTours')}
          </a>
          <a href="#3d-aerial" className="btn-teal btn--hy">
            {uiMessage(locale, 'view3dAerial')}
          </a>
          <a href="#about" className="btn-outline btn--hy">
            {uiMessage(locale, 'readHistory')}
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>{uiMessage(locale, 'scroll')}</span>
      </div>
    </div>
  );
}
