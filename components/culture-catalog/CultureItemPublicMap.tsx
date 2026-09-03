import Link from 'next/link';
import { isExternalMapLink } from '@/lib/culture-catalog/parse-map-url';

interface CultureItemPublicMapProps {
  showOnMap: boolean;
  mapUrl?: string | null;
  locationName?: string | null;
}

export function CultureItemPublicMap({
  showOnMap,
  mapUrl,
  locationName,
}: CultureItemPublicMapProps) {
  const link = mapUrl?.trim() ?? '';
  if (!showOnMap || !link) return null;

  const label = locationName?.trim() || 'Open map';
  const href = isExternalMapLink(link) ? link : '/map';
  const external = isExternalMapLink(link);

  return (
    <div className="catalog-item-media-block">
      <p className="sec-label">Location</p>
      <h2 className="sec-title">{label}</h2>
      {external ? (
        <a href={href} className="catalog-map-shortcut reveal" target="_blank" rel="noopener noreferrer">
          Open in maps
        </a>
      ) : (
        <Link href="/map" className="catalog-map-shortcut reveal">
          View on heritage map
        </Link>
      )}
    </div>
  );
}
