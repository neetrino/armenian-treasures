import type { KhndzoreskPageContent } from '@/lib/queries/page-content';
import { hasNonEmptyArray } from '@/lib/landing/landing-section-utils';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

type KhndzoreskStatsBarProps = {
  stats: KhndzoreskPageContent['stats'];
};

export function KhndzoreskStatsBar({ stats }: KhndzoreskStatsBarProps) {
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
              <span style={{ fontSize: stat.suffix === '+' ? '0.52em' : '0.42em', color: 'var(--gold)' }}>
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

type KhndzoreskAboutProps = {
  facts: KhndzoreskPageContent['facts'];
  locale?: SiteLocaleCode;
};

export function KhndzoreskAbout({ facts, locale = 'EN' }: KhndzoreskAboutProps) {
  return (
    <section id="about">
      <p className="sec-label">{uiMessage(locale, 'heritageProfile')}</p>
      <h2 className="sec-title">{uiMessage(locale, 'civilisationInStone')}</h2>
      <p className="sec-desc">{uiMessage(locale, 'civilisationInStoneDesc')}</p>
      <div className="about-split">
        <div className="about-body reveal">
          <p>{uiMessage(locale, 'khndzAboutP1')}</p>
          <h3>{uiMessage(locale, 'historyHeading')}</h3>
          <p>{uiMessage(locale, 'khndzAboutP2')}</p>
          <p>{uiMessage(locale, 'khndzAboutP3')}</p>
          <h3>{uiMessage(locale, 'culturalHeritageHeading')}</h3>
          <p>{uiMessage(locale, 'khndzAboutP4')}</p>
        </div>
        {hasNonEmptyArray(facts) ? (
          <div className="about-aside">
            {facts.map((fact) => (
              <div key={fact.label} className="fact-card reveal">
                <div className="fact-label">{fact.label}</div>
                <div className="fact-value">{fact.value}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
