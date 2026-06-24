import Image from 'next/image';
import { NGA_GALLERY } from '@/lib/constants/national-gallery-armenia';

export function NationalGalleryGallery() {
  return (
    <section id="gallery">
      <p className="sec-label">Photography Archive</p>
      <h2 className="sec-title">Inside the National Gallery</h2>
      <p className="sec-desc">
        The Aivazovsky halls, Armenian painting rooms, and the galleries that hold masterpieces from across the world.
      </p>
      <div className="gallery-grid">
        {NGA_GALLERY.map((item) => (
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
