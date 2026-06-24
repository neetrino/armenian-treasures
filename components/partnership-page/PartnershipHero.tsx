import Link from 'next/link';

export function PartnershipBreadcrumb() {
  return (
    <div className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Armenian Treasures</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>Partnerships</span>
    </div>
  );
}

export function PartnershipHero() {
  return (
    <div className="hero partnership-hero">
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
        <div className="hero-eyebrow reveal">Global Institutional Alliance</div>
        <h1 className="reveal">
          Safeguarding
          <br />
          Armenian
          <span className="hero-accent">Civilisation Together</span>
        </h1>
        <p className="hero-tagline reveal">Cultural Stewardship · Digital Preservation · Global Reach</p>
        <p className="hero-sub reveal">
          We unite governments, museums, foundations, and innovators around a single conviction — that Armenian
          heritage is not a regional concern, but a treasure of all humanity.
        </p>
        <div className="hero-btns reveal">
          <a href="#partner-form" className="btn-gold">
            Become a Partner
          </a>
          <a href="#partners" className="btn-outline">
            Our Partners
          </a>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden>
        <span>Explore</span>
        <div className="scroll-line" />
      </div>
    </div>
  );
}
