import Link from 'next/link';
import type { NationalGalleryPageContent } from '@/lib/queries/page-content';

type NationalGalleryVisitProps = {
  tickets: NationalGalleryPageContent['tickets'];
};

export function NationalGalleryVisit({ tickets }: NationalGalleryVisitProps) {
  return (
    <section id="visit">
      <p className="sec-label">Plan Your Visit</p>
      <h2 className="sec-title">Tickets, Hours &amp; Guided Tours</h2>
      <p className="sec-desc">
        Open Tuesday–Saturday 11:00–17:30, Sunday 11:00–16:30. Closed Monday. Guided tours available in Armenian,
        Russian, English, and French.
      </p>
      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <div key={ticket.label} className="ticket-card reveal">
            <div className="ticket-label">{ticket.label}</div>
            <div className={`ticket-title${'isHours' in ticket && ticket.isHours ? ' ticket-title-sm' : ''}`}>
              {ticket.title}
            </div>
            {ticket.price ? (
              <div
                className={`ticket-price${'priceSmall' in ticket && ticket.priceSmall ? ' ticket-price-sm' : ''}`}
              >
                {ticket.price}
                {ticket.unit ? <span style={{ fontSize: '0.45em', color: 'var(--muted)' }}>{ticket.unit}</span> : null}
              </div>
            ) : null}
            <div className="ticket-sub">{ticket.sub}</div>
          </div>
        ))}
      </div>
      <div className="contact-grid" style={{ marginTop: 2 }}>
        <a
          href="https://goo.gl/maps/zbYLaxaD583XFeN77"
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
            1 Aram Street
            <br />
            Yerevan 0010
            <br />
            Armenia
          </div>
        </a>
        <a href="tel:+37410580812" className="contact-card reveal">
          <svg className="contact-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <path d="M8 8h8l3 7-4 2c2 4 6 8 10 10l2-4 7 3v8C18 36 4 22 8 8z" />
          </svg>
          <div className="contact-label">Telephone</div>
          <div className="contact-val">+374 10 580 812</div>
        </a>
        <a href="mailto:info@gallery.am" className="contact-card reveal">
          <svg className="contact-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <rect x="5" y="10" width="30" height="22" rx="2" />
            <path d="M5 14l15 10L35 14" />
          </svg>
          <div className="contact-label">Email</div>
          <div className="contact-val">info@gallery.am</div>
        </a>
        <a href="http://www.gallery.am" target="_blank" rel="noopener noreferrer" className="contact-card reveal">
          <svg className="contact-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <circle cx="20" cy="20" r="14" />
            <path d="M6 20h28M20 6v28" />
            <path d="M9 12c4 3 6 5 11 5s7-2 11-5M9 28c4-3 6-5 11-5s7 2 11 5" />
          </svg>
          <div className="contact-label">Website</div>
          <div className="contact-val">www.gallery.am</div>
        </a>
      </div>
      <div className="social-row reveal" style={{ marginTop: 2 }}>
        <a
          href="https://www.facebook.com/NationalGalleryOfArmenia"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" aria-hidden>
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
          <span className="social-name">Facebook · NationalGalleryOfArmenia</span>
        </a>
        <a
          href="https://instagram.com/nationalgalleryofarmenia"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className="social-name">Instagram · @nationalgalleryofarmenia</span>
        </a>
      </div>
      <div className="map-wrap reveal" style={{ marginTop: 2 }}>
        <iframe
          className="map-embed"
          src="https://maps.google.com/maps?q=1+Aram+Street,+Yerevan+0010,+Armenia&t=m&z=16&output=embed&iwloc=near"
          allowFullScreen
          loading="lazy"
          title="National Gallery of Armenia Location"
        />
        <div className="map-info">
          <span className="map-coord">
            Address: <span>1 Aram St · Yerevan 0010</span>
          </span>
          <span className="map-coord">
            Location: <span>Republic Square · City Centre</span>
          </span>
          <span className="map-coord">
            Phone: <span>+374 10 580 812</span>
          </span>
          <a
            href="https://goo.gl/maps/zbYLaxaD583XFeN77"
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

type NationalGalleryRelatedProps = {
  related: NationalGalleryPageContent['related'];
};

export function NationalGalleryRelated({ related }: NationalGalleryRelatedProps) {
  return (
    <section style={{ paddingTop: 48, paddingBottom: 64 }}>
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
