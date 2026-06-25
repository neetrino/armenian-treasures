import Link from 'next/link';

interface CulturalPortalHeroProps {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
}

export function CulturalPortalHero({ eyebrow, title, accent, subtitle }: CulturalPortalHeroProps) {
  return (
    <div className="hero cultural-portal-hero">
      <div className="hero-bg" />
      <div className="hero-grain" />
      <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
      </svg>
      <div className="hero-content">
        <p className="hero-eyebrow reveal">{eyebrow}</p>
        <h1 className="reveal">
          {title}
          <span>{accent}</span>
        </h1>
        <p className="hero-sub reveal">{subtitle}</p>
        <div className="hero-btns reveal">
          <a href="#cultural" className="btn-gold">
            Explore the Portal
          </a>
          <Link href="#map" className="btn-teal">
            Interactive Map
          </Link>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>SCROLL</span>
      </div>
    </div>
  );
}
