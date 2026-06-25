import Link from 'next/link';
import type { HomeAboutCard, HomeAboutCardIconKey } from '@/lib/constants/home-about-section';

interface CulturalPortalAboutProps {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cards: HomeAboutCard[];
}

function AboutIcon({ type }: { type: HomeAboutCardIconKey }) {
  const props = {
    className: 'about-icon',
    viewBox: '0 0 56 56',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.3,
    'aria-hidden': true,
  };

  switch (type) {
    case 'mission':
      return (
        <svg {...props}>
          <circle cx="28" cy="28" r="20" />
          <circle cx="28" cy="28" r="12" />
          <path d="M28 8v8M28 40v8M8 28h8M40 28h8" />
          <circle cx="28" cy="28" r="4" fill="currentColor" opacity=".6" />
        </svg>
      );
    case 'team':
      return (
        <svg {...props}>
          <circle cx="18" cy="18" r="8" />
          <circle cx="38" cy="18" r="8" />
          <path d="M4 48c0-7 6-13 14-13s14 6 14 13" />
          <path d="M32 38c3-2 4-3 6-3 8 0 14 6 14 13" />
        </svg>
      );
    case 'career':
      return (
        <svg {...props}>
          <rect x="10" y="14" width="36" height="28" rx="2" />
          <path d="M24 14V8h8v6M10 24h36" />
          <circle cx="28" cy="34" r="4" />
          <path d="M24 34h-6M32 34h6" />
        </svg>
      );
    case 'contact':
      return (
        <svg {...props}>
          <path d="M10 14h36v24l-8 8H10z" />
          <path d="M38 38v8l8-8" />
          <path d="M18 24h20M18 32h14" />
          <circle cx="34" cy="32" r="2" fill="currentColor" opacity=".7" />
        </svg>
      );
  }
}

export function CulturalPortalAbout({ section, cards }: CulturalPortalAboutProps) {
  return (
    <section id="about">
      <p className="sec-label">{section.eyebrow}</p>
      <h2 className="sec-title">{section.title}</h2>
      <p className="sec-desc">{section.description}</p>
      <div className="about-grid">
        {cards.map((card) => (
          <Link key={card.title} href={card.href} className="about-card reveal">
            <AboutIcon type={card.icon} />
            <div className="about-title">{card.title}</div>
            <p className="about-text">{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
