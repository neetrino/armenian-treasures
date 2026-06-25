import Link from 'next/link';
import type { HeritageMapLegendItem } from '@/lib/constants/heritage-map-section';

interface CulturalPortalMapPin {
  top: string;
  left: string;
  tone: 'teal' | 'gold';
  delay: string;
}

interface CulturalPortalMapProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref: string;
  placeholderTitle: string;
  placeholderSubtitle: string;
  pins: CulturalPortalMapPin[];
  legend: HeritageMapLegendItem[];
}

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

export function CulturalPortalMap({
  eyebrow,
  title,
  description,
  ctaHref,
  placeholderTitle,
  placeholderSubtitle,
  pins,
  legend,
}: CulturalPortalMapProps) {
  return (
    <section id="map" className="map-section">
      <div className="map-section-inner">
        <p className="sec-label">{eyebrow}</p>
        <h2 className="sec-title">{title}</h2>
        <p className="sec-desc">{description}</p>
        <Link href={ctaHref} className="map-wrap reveal">
          <div className="map-area">
            <div className="map-pins" aria-hidden>
              {pins.map((pin) => (
                <div
                  key={`${pin.top}-${pin.left}`}
                  className={`pin ${pin.tone}`}
                  style={{ top: pin.top, left: pin.left, animationDelay: pin.delay }}
                />
              ))}
            </div>
            <div className="map-label">
              <MapPinIcon />
              <p>{placeholderTitle}</p>
              <span>{placeholderSubtitle}</span>
            </div>
          </div>
          <div className="map-legend">
            {legend.map((item) => (
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
