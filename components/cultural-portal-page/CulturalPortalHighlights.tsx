import Link from 'next/link';
import type { CulturalPortalHighlightIcon } from '@/lib/constants/cultural-portal-page';

interface CulturalPortalHighlight {
  num: string;
  icon: CulturalPortalHighlightIcon;
  tag: string;
  title: string;
  excerpt: string;
  href: string;
  featured?: boolean;
}

interface CulturalPortalHighlightsProps {
  highlights: CulturalPortalHighlight[];
}

function HighlightIcon({ type }: { type: CulturalPortalHighlightIcon }) {
  if (type === 'geghard') {
    return (
      <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M7 49h42M14 49V24l14-16 14 16v25M21 49V37h14v12" />
        <path d="M28 8V3m-4 3h8" />
        <circle cx="28" cy="16" r="3" />
      </svg>
    );
  }

  if (type === 'duduk') {
    return (
      <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M18 44V18l24-6v26" />
        <ellipse cx="12" cy="44" rx="7" ry="4" />
        <ellipse cx="36" cy="38" rx="7" ry="4" />
        <path d="M18 18l24-6M18 26l24-6" />
      </svg>
    );
  }

  if (type === 'tigranes') {
    return (
      <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M10 19l8 10 14-16 14 16 8-10v14H10z" />
        <path d="M10 33h36v4H10z" />
        <path d="M10 37h36v5H10z" />
        <circle cx="28" cy="9" r="4" />
        <circle cx="10" cy="16" r="3" />
        <circle cx="46" cy="16" r="3" />
      </svg>
    );
  }

  return (
    <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M14 44V16l8-10h12l8 10v28H14z" />
      <path d="M22 44V32h12v12M14 24h28M22 18h12" />
      <circle cx="28" cy="10" r="3" />
    </svg>
  );
}

export function CulturalPortalHighlights({ highlights }: CulturalPortalHighlightsProps) {
  return (
    <section>
      <p className="sec-label">Featured Treasures</p>
      <h2 className="sec-title">Stories Worth Discovering</h2>
      {highlights.length === 0 ? (
        <p className="sec-desc">Featured culture items will appear here once published in the admin panel.</p>
      ) : (
        <div className="hl-grid">
          {highlights.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hl-card reveal${item.featured ? ' featured' : ''}`}
            >
              <HighlightIcon type={item.icon} />
              <span className="hl-tag">{item.tag}</span>
              <div className="hl-title">{item.title}</div>
              <p className="hl-excerpt">{item.excerpt}</p>
              <div className="hl-num">{item.num}</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
