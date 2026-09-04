import { CultureItemDetailMapLazy } from '@/components/culture-catalog/CultureItemDetailMapLazy';
import { isExternalMapLink } from '@/lib/culture-catalog/parse-map-url';
import { resolvePublicMapCoordinates } from '@/lib/culture-catalog/resolve-public-map-coordinates';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface CultureItemPublicMapProps {
  showOnMap: boolean;
  mapUrl?: string | null;
  locationName?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  locale?: SiteLocaleCode;
}

export async function CultureItemPublicMap({
  showOnMap,
  mapUrl,
  locationName,
  latitude,
  longitude,
  locale = 'EN',
}: CultureItemPublicMapProps) {
  if (!showOnMap) return null;

  const link = mapUrl?.trim() ?? '';
  const coords = await resolvePublicMapCoordinates({ latitude, longitude, mapUrl: link });
  if (!coords && !link) return null;

  const label = locationName?.trim() || uiMessage(locale, 'openMap');
  const externalHref = link && isExternalMapLink(link) ? link : null;

  return (
    <div className="catalog-item-media-block">
      <p className="sec-label">{uiMessage(locale, 'location')}</p>
      <h2 className="sec-title">{label}</h2>
      {coords ? (
        <div className="tour-wrap catalog-map-embed reveal">
          <CultureItemDetailMapLazy latitude={coords.latitude} longitude={coords.longitude} />
        </div>
      ) : null}
      {externalHref ? (
        <a
          href={externalHref}
          className={coords ? 'catalog-map-external-link' : 'catalog-map-shortcut reveal'}
          target="_blank"
          rel="noopener noreferrer"
        >
          {uiMessage(locale, 'openInMaps')}
        </a>
      ) : null}
    </div>
  );
}
