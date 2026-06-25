import type { KhndzoreskPageContent } from '@/lib/queries/page-content';

type KhndzoreskStatsBarProps = {
  stats: KhndzoreskPageContent['stats'];
};

export function KhndzoreskStatsBar({ stats }: KhndzoreskStatsBarProps) {
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
};

export function KhndzoreskAbout({ facts }: KhndzoreskAboutProps) {
  return (
    <section id="about">
      <p className="sec-label">Heritage Profile</p>
      <h2 className="sec-title">Khndzoresk — A Civilisation in Stone</h2>
      <p className="sec-desc">
        From liberation fortress to thriving mountain city — one of Armenia&apos;s most layered highland
        landscapes.
      </p>
      <div className="about-split">
        <div className="about-body reveal">
          <p>
            <strong>Khndzoresk</strong> (Armenian: Խնձորեսկ, pronounced [χəndzɔˈɾɛsk]) is a village in the
            Goris Municipality of Syunik Province, situated on the steep slopes of <strong>Khor Dzor</strong>{' '}
            — the Deep Gorge — at 1,580 metres above sea level, spanning 6,772.8 hectares.
          </p>
          <h3>History</h3>
          <p>
            By the late 19th century, Old Khndzoresk was the <strong>largest village in Eastern Armenia</strong>{' '}
            — 8,300 inhabitants across 1,800 households. By 1913 it supported 27 shops, 3 dye-houses, tanneries,
            and 7 schools. A fully self-sustaining highland civilisation.
          </p>
          <p>
            The fortress served as <strong>Mkhitar Sparapet&apos;s military base</strong> (1728–1730) during
            David Bek&apos;s liberation movement. In 1735, Catholicos Abraham Kretatsi visited and documented
            the community in his chronicles. The cave settlements — inhabited until the 1950s — remain eloquent
            witnesses today.
          </p>
          <h3>Cultural Heritage</h3>
          <p>
            Three sacred monuments anchor the gorge: <strong>St. Hripsime Church</strong> (17th century) at the
            gorge floor; the <strong>Anapat hermitage</strong> with Sparapet&apos;s tomb on a spur beyond; and
            the ancient <strong>cave church of St. Tatevos</strong>. Together they form one of Armenia&apos;s
            most spiritually resonant heritage landscapes.
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
