import type { KhachaturianPageContent } from '@/lib/queries/page-content';
import { hasNonEmptyArray } from '@/lib/landing/landing-section-utils';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

type KhachaturianMuseumStatsBarProps = {
  stats: KhachaturianPageContent['stats'];
};

export function KhachaturianMuseumStatsBar({ stats }: KhachaturianMuseumStatsBarProps) {
  if (!hasNonEmptyArray(stats)) {
    return null;
  }

  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item reveal">
          <div className="stat-num">
            {stat.num}
            {stat.suffix ? <span style={{ fontSize: '0.42em', color: 'var(--gold)' }}>{stat.suffix}</span> : null}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

type KhachaturianMuseumBiographyProps = {
  facts: KhachaturianPageContent['facts'];
  locale?: SiteLocaleCode;
};

export function KhachaturianMuseumBiography({ facts, locale = 'EN' }: KhachaturianMuseumBiographyProps) {
  return (
    <section id="biography">
      <p className="sec-label">{uiMessage(locale, 'biography')}</p>
      <h2 className="sec-title">{uiMessage(locale, 'voiceOfANation')}</h2>
      <p className="sec-desc">{uiMessage(locale, 'voiceOfANationDesc')}</p>
      <div className="about-split">
        <div className="about-body reveal">
          <p>{uiMessage(locale, 'khachaturianAboutP1')}</p>
          <h3>{uiMessage(locale, 'earlyLifeHeading')}</h3>
          <p>{uiMessage(locale, 'khachaturianAboutP2')}</p>
          <h3>{uiMessage(locale, 'musicalLegacy')}</h3>
          <p>
            He composed the <strong>Sabre Dance</strong> from the ballet <em>Gayane</em> (1942) — one of the most
            recognisable musical pieces in the world. His other major works include the ballets <em>Spartacus</em> and{' '}
            <em>Masquerade Suite</em>, three symphonies, three instrumental concertos (violin, cello, piano), and a rich
            body of film music. He was the first Armenian composer to write a symphony and to compose a national ballet.
          </p>
          <h3>Honours &amp; Later Years</h3>
          <p>
            Khachaturian received the Stalin Prize four times, the Lenin Prize, and was named People&apos;s Artist of the
            USSR. He was a Professor at the Moscow Conservatory and the Gnessin Institute, and conducted his own works on
            concert tours worldwide. He died on <strong>May 1, 1978</strong> in Moscow. In 1976, the Armenian Government
            decided to convert his private Yerevan residence into a museum — a decision made during his lifetime.
          </p>
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
