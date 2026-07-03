import Image from 'next/image';
import type { KhachaturianPageContent } from '@/lib/queries/page-content';
import { hasNonEmptyArray } from '@/lib/landing/landing-section-utils';

type KhachaturianMuseumGalleryProps = {
  gallery: KhachaturianPageContent['gallery'];
};

export function KhachaturianMuseumGallery({ gallery }: KhachaturianMuseumGalleryProps) {
  if (!hasNonEmptyArray(gallery)) {
    return null;
  }

  return (
    <section id="gallery">
      <p className="sec-label">Photography Archive</p>
      <h2 className="sec-title">The Museum &amp; Its Spaces</h2>
      <p className="sec-desc">
        Inside the rooms where Aram Khachaturian lived, composed, and received the world&apos;s greatest musicians.
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
