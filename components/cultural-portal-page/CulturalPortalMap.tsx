import { MapPanel } from '@/components/map/MapPanel';
import type { PublicCultureItemDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

interface CulturalPortalMapProps {
  eyebrow: string;
  title: string;
  description: string;
  items: PublicCultureItemDTO[];
  locale?: SiteLocaleCode;
}

export function CulturalPortalMap({ eyebrow, title, description, items, locale }: CulturalPortalMapProps) {
  return (
    <section id="map" className="map-section">
      <div className="map-section-inner">
        <p className="sec-label">{eyebrow}</p>
        <h2 className="sec-title">{title}</h2>
        <p className="sec-desc">{description}</p>
        <div className="heritage-map-embed reveal">
          <MapPanel items={items} embedToolbar locale={locale} />
        </div>
      </div>
    </section>
  );
}
