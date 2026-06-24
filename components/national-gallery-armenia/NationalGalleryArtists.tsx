import Link from 'next/link';
import { NGA_ARTISTS } from '@/lib/constants/national-gallery-armenia';

function ArtistIcon({ type }: { type: (typeof NGA_ARTISTS)[number]['icon'] }) {
  if (type === 'aivazovsky') {
    return (
      <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M10 18C10 14 16 8 28 8s18 6 18 10M4 48l8-16 8 8 8-12 8 8 8-16 8 16" />
        <rect x="4" y="44" width="48" height="8" rx="1" />
      </svg>
    );
  }
  if (type === 'saryan') {
    return (
      <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <rect x="8" y="8" width="40" height="32" rx="1" />
        <path d="M8 24l10-8 10 8 10-8 10 8M8 40h40" />
        <circle cx="20" cy="16" r="4" />
      </svg>
    );
  }
  if (type === 'avant') {
    return (
      <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <circle cx="28" cy="28" r="20" />
        <path d="M16 20l4 4-4 4M32 20l4 4-4 4M20 36h16" />
      </svg>
    );
  }
  return (
    <svg className="hl-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M28 8c-5 5-12 9-12 16a12 12 0 0024 0c0-7-7-11-12-16z" />
      <path d="M20 38c2 4 5 8 8 10M36 38c-2 4-5 8-8 10" />
    </svg>
  );
}

export function NationalGalleryArtists() {
  return (
    <section id="artists">
      <p className="sec-label">Master Artists</p>
      <h2 className="sec-title">The Painters of the Gallery</h2>
      <p className="sec-desc">
        From the Armenian masters who defined a national art identity, to the global titans who left masterworks in
        Yerevan&apos;s walls.
      </p>
      <div className="hl-grid">
        {NGA_ARTISTS.map((item) => (
          <Link
            key={item.num}
            href={item.href}
            className={`hl-card reveal${'featured' in item && item.featured ? ' featured' : ''}`}
          >
            <ArtistIcon type={item.icon} />
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
