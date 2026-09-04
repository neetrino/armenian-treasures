import Link from 'next/link';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';
import { HeroImageOverlay } from '@/components/sections/hero/HeroImageOverlay';
import { containsArmenianScript } from '@/lib/i18n/armenian-script';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { cn } from '@/lib/utils';

type KhachaturianMuseumHeroProps = {
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

function KhachaturianBreadcrumb({
  locale,
  label,
}: {
  locale: SiteLocaleCode;
  label: string;
}) {
  return (
    <div className="breadcrumb" aria-label={uiMessage(locale, 'breadcrumb')}>
      <Link href="/">{uiMessage(locale, 'armenianTreasures')}</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <Link href="/culture">{uiMessage(locale, 'culturePortal')}</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <Link href="/culture">{uiMessage(locale, 'museums')}</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>{label}</span>
    </div>
  );
}

export function KhachaturianMuseumHero({
  imgBase: _imgBase,
  heroImage,
  locale,
}: KhachaturianMuseumHeroProps) {
  const bannerImage = resolvePageHeroImageUrl(heroImage);
  const title = uiMessage(locale, 'khachaturianTitle');
  const subtitle = uiMessage(locale, 'khachaturianSubtitle');
  const eyebrow = uiMessage(locale, 'khachaturianEyebrow');
  const slogan = uiMessage(locale, 'khachaturianSlogan');
  const breadcrumbLabel = uiMessage(locale, 'khachaturianBreadcrumb');
  const titleIsArmenian = containsArmenianScript(title);

  return (
    <div className="hero" data-site-hero>
      <KhachaturianBreadcrumb locale={locale} label={breadcrumbLabel} />
      {bannerImage ? <HeroImageOverlay imageUrl={bannerImage} /> : null}
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-bloom" style={{ width: 700, height: 700, top: -100, left: '50%', transform: 'translateX(-50%)', ['--bd' as string]: '8s' }} />
      <div className="hero-bloom" style={{ width: 380, height: 380, bottom: 0, left: '5%', ['--bd' as string]: '6s', ['--bdelay' as string]: '2s' }} />
      <div className="hero-bloom" style={{ width: 320, height: 320, top: '20%', right: '4%', ['--bd' as string]: '9s', ['--bdelay' as string]: '1s' }} />
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
          {uiMessage(locale, 'khachaturianLocation')}
        </div>
        <h1 className={cn(titleIsArmenian && 'hero-title--hy')}>
          {title}
          <span className={cn(containsArmenianScript(subtitle) && 'hero-accent--hy')}>{subtitle}</span>
        </h1>
        <p className={cn('hero-slogan', containsArmenianScript(slogan) && 'hero-slogan--hy')}>{slogan}</p>
        <p className="hero-sub">{uiMessage(locale, 'khachaturianSub')}</p>
        <div className="hero-btns">
          <a href="#virtual-tour" className="btn-gold btn--hy">
            {uiMessage(locale, 'enterVirtualTour')}
          </a>
          <a href="#biography" className="btn-teal btn--hy">
            {uiMessage(locale, 'readBiography')}
          </a>
          <a href="#audio" className="btn-outline btn--hy">
            {uiMessage(locale, 'listenToMusic')}
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
