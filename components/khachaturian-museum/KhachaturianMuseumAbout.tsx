import { KHACHATURIAN_FACTS, KHACHATURIAN_STATS } from '@/lib/constants/khachaturian-museum';

export function KhachaturianMuseumStatsBar() {
  return (
    <div className="stats-bar">
      {KHACHATURIAN_STATS.map((stat) => (
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

export function KhachaturianMuseumBiography() {
  return (
    <section id="biography">
      <p className="sec-label">Biography</p>
      <h2 className="sec-title">Aram Khachaturian — Voice of a Nation</h2>
      <p className="sec-desc">
        World-famous Armenian composer, conductor, pedagogue, and public figure — composer of the first Armenian
        national ballet, symphony, and instrumental concertos.
      </p>
      <div className="about-split">
        <div className="about-body reveal">
          <p>
            <strong>Aram Ilyich Khachaturian</strong> (Armenian: Արամ Ղաչատրյան) was born on{' '}
            <strong>June 6, 1903</strong> in Kojori, a suburb of Tiflis (now Tbilisi, Georgia). His father Yeghia had
            moved from the village of Upper Aza to Tiflis, where he ran a bookbinding shop. His mother Kumash was from
            Lower Aza.
          </p>
          <h3>Early Life &amp; Education</h3>
          <p>
            Khachaturian grew up surrounded by the rich folk music traditions of the Caucasus — Armenian, Georgian, and
            Azerbaijani melodies formed the sonic landscape of his childhood. He moved to Moscow in 1921 at age 18 with
            virtually no formal musical training, and enrolled in the Gnessin Musical Institute, then later at the Moscow
            Conservatory under Nikolai Myaskovsky.
          </p>
          <h3>Musical Legacy</h3>
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
          {KHACHATURIAN_FACTS.map((fact) => (
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
