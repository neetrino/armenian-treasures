import Link from 'next/link';
import { CULTURAL_PORTAL_MAP } from '@/lib/constants/cultural-portal-page';

function MapPinIcon() {
  return (
    <svg
      style={{ width: 48, height: 48, color: 'var(--gold)', opacity: 0.4, marginBottom: 12 }}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden
    >
      <circle cx="32" cy="28" r="14" />
      <path d="M32 42v14M20 56h24" />
      <circle cx="32" cy="28" r="6" />
    </svg>
  );
}

export function CulturalPortalMap() {
  const map = CULTURAL_PORTAL_MAP;

  return (
    <section id="map" className="map-section">
      <div className="map-section-inner">
        <p className="sec-label">{map.eyebrow}</p>
        <h2 className="sec-title">{map.title}</h2>
        <p className="sec-desc">{map.description}</p>
        <Link href={map.ctaHref} className="map-wrap reveal">
          <div className="map-area">
            <div className="map-pins" aria-hidden>
              {map.pins.map((pin) => (
                <div
                  key={`${pin.top}-${pin.left}`}
                  className={`pin ${pin.tone}`}
                  style={{ top: pin.top, left: pin.left, animationDelay: pin.delay }}
                />
              ))}
            </div>
            <div className="map-label">
              <MapPinIcon />
              <p>{map.placeholderTitle}</p>
              <span>{map.placeholderSubtitle}</span>
            </div>
          </div>
          <div className="map-legend">
            {map.legend.map((item) => (
              <div key={item.label} className="leg">
                <div className="leg-dot" style={{ background: item.color }} />
                {item.label}
              </div>
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
}
