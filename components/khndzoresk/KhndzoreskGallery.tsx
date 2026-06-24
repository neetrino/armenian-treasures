import Image from 'next/image';
import { KHNDZORESK_GALLERY } from '@/lib/constants/khndzoresk';

type GalleryItem = {
  src: string;
  label: string;
  wide?: boolean;
  archive?: boolean;
};

function GalleryGrid({
  items,
  variant,
}: {
  items: readonly GalleryItem[];
  variant: 'now' | 'hist' | 'fut';
}) {
  const histClass = variant === 'hist' ? ' hist' : '';

  return (
    <div className={`gallery-grid${histClass} gal-${variant}`}>
      {items.map((item) => (
        <div key={item.label} className={`g-item reveal${item.wide ? ' wide' : ''}`}>
          <Image
            src={item.src}
            alt={item.label}
            width={800}
            height={600}
            className={item.archive ? 'archive' : undefined}
          />
          <div className="g-overlay">
            <span className="g-lbl">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function KhndzoreskGallery() {
  return (
    <section id="gallery">
      <p className="sec-label">Photography Archive</p>
      <h2 className="sec-title">Khndzoresk Through Time</h2>
      <p className="sec-desc">
        Contemporary images, archival photographs, and futuristic visual concepts — two centuries of
        documentation across three perspectives.
      </p>
      <div style={{ marginTop: 48 }}>
        <div className="gallery-switcher">
          <input type="radio" name="gal-tab" id="gal-tab-now" className="gallery-tab-input" defaultChecked />
          <input type="radio" name="gal-tab" id="gal-tab-hist" className="gallery-tab-input" />
          <input type="radio" name="gal-tab" id="gal-tab-fut" className="gallery-tab-input" />
          <div className="gallery-tabs">
            <label htmlFor="gal-tab-now" className="gallery-tab">
              Now
            </label>
            <label htmlFor="gal-tab-hist" className="gallery-tab">
              Historical
            </label>
            <label htmlFor="gal-tab-fut" className="gallery-tab">
              Futuristic Concepts
            </label>
          </div>
          <div className="gallery-panels">
            <GalleryGrid items={KHNDZORESK_GALLERY.now} variant="now" />
            <GalleryGrid items={KHNDZORESK_GALLERY.hist} variant="hist" />
            <GalleryGrid items={KHNDZORESK_GALLERY.fut} variant="fut" />
          </div>
        </div>
      </div>
    </section>
  );
}
