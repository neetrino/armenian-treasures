import type { NationalGalleryPageContent } from '@/lib/queries/page-content';
import { hasNonEmptyArray } from '@/lib/landing/landing-section-utils';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

type NationalGalleryStatsBarProps = {
  stats: NationalGalleryPageContent['stats'];
};

export function NationalGalleryStatsBar({ stats }: NationalGalleryStatsBarProps) {
  if (!hasNonEmptyArray(stats)) {
    return null;
  }

  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item reveal">
          <div className="stat-num">
            {stat.num}
            {stat.suffix ? (
              <span
                style={{
                  fontSize: 'suffixSize' in stat ? stat.suffixSize : '0.4em',
                  color: 'suffixColor' in stat && stat.suffixColor === 'gold' ? 'var(--gold)' : undefined,
                }}
              >
                {stat.suffix}
              </span>
            ) : null}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

type NationalGalleryAboutProps = {
  facts: NationalGalleryPageContent['facts'];
  locale?: SiteLocaleCode;
};

export function NationalGalleryAbout({ facts, locale = 'EN' }: NationalGalleryAboutProps) {
  return (
    <section id="about">
      <p className="sec-label">{uiMessage(locale, 'aboutTheGallery')}</p>
      <h2 className="sec-title">{uiMessage(locale, 'centuryOfArt')}</h2>
      <p className="sec-desc">{uiMessage(locale, 'centuryOfArtDesc')}</p>
      <div className="about-split">
        <div className="about-body reveal">
          <p>{uiMessage(locale, 'ngaAboutP1')}</p>
          <h3>{uiMessage(locale, 'collectionHeading')}</h3>
          <p>{uiMessage(locale, 'ngaAboutP2')}</p>
          <h3>{uiMessage(locale, 'worldArtHeading')}</h3>
          <p>{uiMessage(locale, 'ngaAboutP3')}</p>
          <h3>{uiMessage(locale, 'educationCommunityHeading')}</h3>
          <p>{uiMessage(locale, 'ngaAboutP4')}</p>
        </div>
        <div className="about-aside">
          {facts.map((fact) => (
            <div key={fact.label} className="fact-card reveal">
              <div className="fact-label">{fact.label}</div>
              <div className="fact-value">{fact.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
