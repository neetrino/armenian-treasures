import Link from 'next/link';
import type { KhachaturianPageContent } from '@/lib/queries/page-content';

export function KhachaturianMuseumVisit() {
  return (
    <section id="visit">
      <p className="sec-label">Plan Your Visit</p>
      <h2 className="sec-title">Contact &amp; Location</h2>
      <p className="sec-desc">
        The museum is open Monday–Friday 11:00–17:00, Saturday 11:00–16:30. Located at 3 Zarobyan Street, Yerevan.
      </p>
      <div className="contact-grid">
        <a
          href="https://maps.google.com/?q=3+Zarobyan+St,+Yerevan+0009,+Armenia"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card reveal"
        >
          <svg className="contact-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <path d="M20 4C14.5 4 10 8.5 10 14c0 8 10 20 10 20s10-12 10-20c0-5.5-4.5-10-10-10z" />
            <circle cx="20" cy="14" r="4" />
          </svg>
          <div className="contact-label">Address</div>
          <div className="contact-val">
            3 Zarobyan Street
            <br />
            Yerevan 0009
            <br />
            Armenia
          </div>
        </a>
        <a href="tel:+37410589418" className="contact-card reveal">
          <svg className="contact-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <path d="M8 8h8l3 7-4 2c2 4 6 8 10 10l2-4 7 3v8C18 36 4 22 8 8z" />
          </svg>
          <div className="contact-label">Telephone</div>
          <div className="contact-val">
            +374 10 589418
            <br />
            +374 10 580178
            <br />
            +374 10 522691
          </div>
        </a>
        <a href="mailto:info@akhachaturianmuseum.am" className="contact-card reveal">
          <svg className="contact-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <rect x="5" y="10" width="30" height="22" rx="2" />
            <path d="M5 14l15 10L35 14" />
          </svg>
          <div className="contact-label">Email</div>
          <div className="contact-val">
            info@akhachaturian
            <br />
            museum.am
          </div>
        </a>
        <a href="http://akhachaturianmuseum.am" target="_blank" rel="noopener noreferrer" className="contact-card reveal">
          <svg className="contact-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <circle cx="20" cy="20" r="14" />
            <path d="M6 20h28M20 6v28" />
            <path d="M9 12c4 3 6 5 11 5s7-2 11-5M9 28c4-3 6-5 11-5s7 2 11 5" />
          </svg>
          <div className="contact-label">Website</div>
          <div className="contact-val">
            akhachaturian
            <br />
            museum.am
          </div>
        </a>
      </div>
      <div className="social-row reveal" style={{ marginTop: 2 }}>
        <a href="https://www.facebook.com/museum78" target="_blank" rel="noopener noreferrer" className="social-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" aria-hidden>
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
          <span className="social-name">Facebook · museum78</span>
        </a>
        <a href="https://www.instagram.com/khachaturianmuseum/" target="_blank" rel="noopener noreferrer" className="social-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className="social-name">Instagram · @khachaturianmuseum</span>
        </a>
        <a href="https://www.youtube.com/channel/UCEs6w4hkYvzEqDnziUY6diQ" target="_blank" rel="noopener noreferrer" className="social-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" aria-hidden>
            <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
          </svg>
          <span className="social-name">YouTube · Official Channel</span>
        </a>
      </div>
      <div className="map-wrap reveal" style={{ marginTop: 2 }}>
        <iframe
          className="map-embed"
          src="https://maps.google.com/maps?q=3+Zarobyan+St,+Yerevan+0009,+Armenia&t=m&z=16&output=embed&iwloc=near"
          allowFullScreen
          loading="lazy"
          title="Aram Khachaturian Museum Location"
        />
        <div className="map-info">
          <span className="map-coord">
            Address: <span>3 Zarobyan St · Yerevan 0009</span>
          </span>
          <span className="map-coord">
            Hours: <span>Mon–Fri 11:00–17:00 · Sat 11:00–16:30</span>
          </span>
          <span className="map-coord">
            Phone: <span>+374 10 589418</span>
          </span>
          <a
            href="https://maps.google.com/?q=3+Zarobyan+St,+Yerevan+0009,+Armenia"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            Open in Maps →
          </a>
        </div>
      </div>
    </section>
  );
}

type KhachaturianMuseumRelatedProps = {
  related: KhachaturianPageContent['related'];
};

export function KhachaturianMuseumRelated({ related }: KhachaturianMuseumRelatedProps) {
  return (
    <section style={{ paddingTop: 'var(--section-padding-y-lg)', paddingBottom: 'var(--section-padding-y-lg)' }}>
      <p className="sec-label">Explore Further</p>
      <h2 className="sec-title">More Museum Heritage Sites</h2>
      <p className="sec-desc">Discover other digitally preserved Armenian cultural institutions and heritage sites.</p>
      <div className="related-grid">
        {related.map((site) => (
          <Link key={site.num} href={site.href} className="rel-card reveal">
            <div className="rel-num">{site.num}</div>
            <div>
              <div className="rel-name">{site.name}</div>
              <div className="rel-type">{site.type}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
