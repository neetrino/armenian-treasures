import Image from 'next/image';
import type { NationalGalleryPageContent } from '@/lib/queries/page-content';
import { hasNonEmptyArray } from '@/lib/landing/landing-section-utils';

type NationalGalleryGalleryProps = {
  gallery: NationalGalleryPageContent['gallery'];
};

export function NationalGalleryGallery({ gallery }: NationalGalleryGalleryProps) {
  if (!hasNonEmptyArray(gallery)) {
    return null;
  }

  return (
    <section id="gallery">
      <p className="sec-label">Photography Archive</p>
      <h2 className="sec-title">Inside the National Gallery</h2>
      <p className="sec-desc">
        The Aivazovsky halls, Armenian painting rooms, and the galleries that hold masterpieces from across the world.
      </p>
      <div className="gallery-grid">
        {gallery.map((item) => (
          <div key={item.label} className={`g-item reveal${'wide' in item && item.wide ? ' wide' : ''}`}>
            <Image src={item.src} alt={item.label} width={900} height={600} />
            <div className="g-overlay">
              <span className="g-lbl">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
