import Link from 'next/link';
import { CULTURAL_PORTAL_PAGE } from '@/lib/constants/cultural-portal-page';

export function CulturalPortalHero() {
  const { hero } = CULTURAL_PORTAL_PAGE;

  return (
    <div className="hero cultural-portal-hero">
      <div className="hero-bg" />
      <div className="hero-grain" />
      <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
      </svg>
      <div className="hero-content">
        <p className="hero-eyebrow reveal">{hero.eyebrow}</p>
        <h1 className="reveal">
          {hero.title}
          <span>{hero.accent}</span>
        </h1>
        <p className="hero-sub reveal">{hero.subtitle}</p>
        <div className="hero-btns reveal">
          <a href={hero.primaryCta.href} className="btn-gold">
            {hero.primaryCta.label}
          </a>
          <Link href={hero.secondaryCta.href} className="btn-teal">
            {hero.secondaryCta.label}
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
