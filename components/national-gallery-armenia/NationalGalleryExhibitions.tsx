import { NGA_EXHIBITIONS } from '@/lib/constants/national-gallery-armenia';

export function NationalGalleryExhibitions() {
  return (
    <section id="exhibitions">
      <p className="sec-label">Exhibitions</p>
      <h2 className="sec-title">Current &amp; Recent Exhibitions</h2>
      <p className="sec-desc">
        The Gallery hosts a rotating programme of temporary exhibitions alongside its permanent collection — check
        gallery.am for the latest programme.
      </p>
      <div className="exh-grid">
        {NGA_EXHIBITIONS.map((item) => (
          <div key={item.num} className="exh-card reveal">
            <div className={`exh-status ${item.status === 'current' ? 'status-current' : 'status-upcoming'}`}>
              {item.statusLabel}
            </div>
            <div className="exh-dates">{item.dates}</div>
            <div className="exh-title">{item.title}</div>
            <p className="exh-desc">{item.desc}</p>
            <div className="exh-num">{item.num}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
