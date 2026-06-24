import Link from 'next/link';
import { KHACHATURIAN_HIGHLIGHTS } from '@/lib/constants/khachaturian-museum';

function HighlightIcon({ type }: { type: (typeof KHACHATURIAN_HIGHLIGHTS)[number]['icon'] }) {
  if (type === 'rooms') {
    return (
      <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M18 44V18l24-6v26" />
        <ellipse cx="12" cy="44" rx="7" ry="4" />
        <ellipse cx="36" cy="38" rx="7" ry="4" />
        <path d="M18 18l24-6M18 26l24-6" />
      </svg>
    );
  }
  if (type === 'exhibition') {
    return (
      <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M12 44V16l8-10h16l8 10v28H12z" />
        <path d="M20 44V32h16v12M12 24h32M20 18h16" />
      </svg>
    );
  }
  if (type === 'music') {
    return (
      <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <circle cx="28" cy="28" r="18" />
        <circle cx="28" cy="28" r="6" />
        <path d="M28 10v6M28 40v6M10 28h6M40 28h6" />
      </svg>
    );
  }
  return (
    <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <rect x="8" y="12" width="40" height="30" rx="2" />
      <path d="M8 26l10-8 10 8 10-8 10 8M8 42h40" />
      <circle cx="20" cy="18" r="4" />
    </svg>
  );
}

export function KhachaturianMuseumHighlights() {
  return (
    <section>
      <p className="sec-label">Museum Highlights</p>
      <h2 className="sec-title">What You Will Discover</h2>
      <div className="hl-grid">
        {KHACHATURIAN_HIGHLIGHTS.map((item) => (
          <Link
            key={item.num}
            href={item.href}
            className={`hl-card reveal${'featured' in item && item.featured ? ' featured' : ''}`}
          >
            <HighlightIcon type={item.icon} />
            <span className="hl-tag">{item.tag}</span>
            <div className="hl-title">{item.title}</div>
            <p className="hl-excerpt">{item.excerpt}</p>
            <div className="hl-num">{item.num}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
