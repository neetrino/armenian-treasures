import { NGA_FACTS, NGA_STATS } from '@/lib/constants/national-gallery-armenia';

export function NationalGalleryStatsBar() {
  return (
    <div className="stats-bar">
      {NGA_STATS.map((stat) => (
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

export function NationalGalleryAbout() {
  return (
    <section id="about">
      <p className="sec-label">About the Gallery</p>
      <h2 className="sec-title">A Century of Armenian Art &amp; World Culture</h2>
      <p className="sec-desc">
        The National Gallery of Armenia is the country&apos;s major fine art institution and the world&apos;s largest
        museum by its Armenian fine arts collection.
      </p>
      <div className="about-split">
        <div className="about-body reveal">
          <p>
            The <strong>National Gallery of Armenia</strong> (Armenian: Հայաստանի Ազգային Պատկերասրահ) is the
            country&apos;s principal fine art museum, located in the iconic building on <strong>Republic Square</strong>{' '}
            in the heart of Yerevan. Established in <strong>1921</strong>, it holds the world&apos;s largest collection
            of Armenian fine arts and the <strong>second-largest collection of Hovhannes Aivazovsky</strong> works on
            Earth.
          </p>
          <h3>The Collection</h3>
          <p>
            The collection encompasses more than <strong>40,000 exhibits</strong> of Armenian and foreign fine art and
            decorative-applied art, displayed across <strong>56 luminous exhibition halls</strong>. The Armenian Painting
            Department alone holds over <strong>7,000 works</strong>, tracing national visual arts from medieval icon
            painting through the vibrant palette of Martiros Saryan and the graphic innovations of Vardges Sureniants,
            to the striking contemporary visions of Minas Avetisyan and Eduard Isabekyan.
          </p>
          <h3>World Art Departments</h3>
          <p>
            The Gallery&apos;s foreign art collections include over <strong>1,150 works of European, American, and
            Russian artists</strong>, a Graphics and Engraving department with 12,000 reserves (watercolour, gouache,
            chalk), and a Sculpture section with 1,200 specimens spanning Armenian and international masters. The
            Decorative-Applied Art department ranges from ancient Egyptian and Greek objects to 18th–19th century German,
            Dutch, and French porcelain.
          </p>
          <h3>Education &amp; Community</h3>
          <p>
            Interactive educational programmes have run since 2008. Since 2015, a Summer School has been organised for
            children of all ages. The Gallery has <strong>12 branches</strong> across Yerevan and the regions of
            Armenia, and hosts regular concerts, lectures, and film screenings in its cinema hall. The library,
            cafeteria, souvenir shop, and bookshop make every visit a full cultural day.
          </p>
        </div>
        <div className="about-aside">
          {NGA_FACTS.map((fact) => (
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
