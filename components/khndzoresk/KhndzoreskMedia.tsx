import Image from 'next/image';
import type { KhndzoreskPageContent } from '@/lib/queries/page-content';
import { hasTrimmedText, hasVirtualTourContent } from '@/lib/landing/landing-section-utils';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

type KhndzoreskVirtualTourProps = {
  tours: KhndzoreskPageContent['tours'];
  locale?: SiteLocaleCode;
};

export function KhndzoreskVirtualTour({ tours, locale = 'EN' }: KhndzoreskVirtualTourProps) {
  if (!hasVirtualTourContent(tours)) {
    return null;
  }

  const { featured, mini } = tours;
  const hasFeatured = hasTrimmedText(featured.embed);

  return (
    <section id="virtual-tour">
      <p className="sec-label">{uiMessage(locale, 'virtualExperience')}</p>
      <h2 className="sec-title">{uiMessage(locale, 'walkSacredGround')}</h2>
      <p className="sec-desc">{uiMessage(locale, 'walkSacredGroundDesc')}</p>
      <div className="tour-grid">
        {hasFeatured ? (
          <div className="tour-main reveal">
            <iframe
              className="tour-embed"
              src={featured.embed}
              allowFullScreen
              allow="xr-spatial-tracking"
              title={uiMessage(locale, 'virtualTourTitleHripsime')}
            />
            <div className="tour-label">
              <span className="tour-name">{featured.title}</span>
              <span className="tour-tag">{featured.tag}</span>
            </div>
          </div>
        ) : null}
        {mini.length > 0 ? (
          <div className="tour-side">
            {mini.map((tour) => (
            <a
              key={tour.title}
              href={tour.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tour-mini reveal"
            >
              <Image
                className="tour-mini-thumb"
                src={tour.image}
                alt={tour.title}
                width={400}
                height={122}
              />
              <div className="tour-play">
                <PlayIcon />
              </div>
              <div className="tour-mini-info">
                <div className="tour-mini-title">{tour.title}</div>
                <div className="tour-mini-sub">{tour.sub}</div>
              </div>
            </a>
          ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

type KhndzoreskAerialProps = {
  aerial: KhndzoreskPageContent['aerial'];
  locale?: SiteLocaleCode;
};

export function KhndzoreskAerial({ aerial, locale = 'EN' }: KhndzoreskAerialProps) {
  if (!hasTrimmedText(aerial.embed)) {
    return null;
  }

  return (
    <section id="3d-aerial">
      <p className="sec-label">{uiMessage(locale, 'aerial3dModel')}</p>
      <h2 className="sec-title">{uiMessage(locale, 'stHripsimeEveryAngle')}</h2>
      <p className="sec-desc">
        A fully rotatable photogrammetric 3D model captured by drone and reconstructed to museum standard.
        Rotate, zoom, inspect every stone.
      </p>
      <div className="aerial-embed-wrap reveal">
        <iframe
          className="aerial-embed"
          title="St. Hripsime church, Khndzoresk"
          frameBorder={0}
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src={aerial.embed}
        />
        <div className="aerial-label">
          <span className="aerial-badge">{uiMessage(locale, 'photogrammetry3d')}</span>
          <span className="aerial-title">{aerial.modelTitle}</span>
          <span className="aerial-badge tc">{uiMessage(locale, 'droneCapture')}</span>
        </div>
      </div>
    </section>
  );
}

type KhndzoreskPanoramaProps = {
  panorama: KhndzoreskPageContent['panorama'];
  locale?: SiteLocaleCode;
};

export function KhndzoreskPanorama({ panorama, locale = 'EN' }: KhndzoreskPanoramaProps) {
  if (!hasTrimmedText(panorama.embed)) {
    return null;
  }

  return (
    <section id="panorama">
      <p className="sec-label">{uiMessage(locale, 'aerial360')}</p>
      <h2 className="sec-title">{uiMessage(locale, 'gorgeFromAbove')}</h2>
      <p className="sec-desc">
        Highest-resolution aerial 360° tour of Khndzoresk — look in every direction across the canyon, the
        village, and the mountains of Syunik.
      </p>
      <div className="pano-wrap reveal">
        <iframe
          className="pano-frame"
          src={panorama.embed}
          allowFullScreen
          title="Aerial 360° Panorama — Khndzoresk"
        />
        <div className="pano-footer">
          <span className="pano-title">{panorama.footerTitle}</span>
          <span className="aerial-badge tc">{uiMessage(locale, 'highestResolution')}</span>
        </div>
      </div>
    </section>
  );
}
