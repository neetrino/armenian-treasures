import { CultureItemDetailMapLazy } from '@/components/culture-catalog/CultureItemDetailMapLazy';
import { isExternalMapLink } from '@/lib/culture-catalog/parse-map-url';
import { resolvePublicMapCoordinates } from '@/lib/culture-catalog/resolve-public-map-coordinates';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface CultureItemPublicMapProps {
  /** Kept for callers; heritage-map pin filtering uses DB `showOnMap` separately. */
  showOnMap?: boolean;
  mapUrl?: string | null;
  locationName?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  locale?: SiteLocaleCode;
}

export async function CultureItemPublicMap({
  mapUrl,
  locationName,
  latitude,
  longitude,
  locale = 'EN',
}: CultureItemPublicMapProps) {
  const link = mapUrl?.trim() ?? '';
  const coords = await resolvePublicMapCoordinates({ latitude, longitude, mapUrl: link });
  const externalHref = link && isExternalMapLink(link) ? link : null;

  // Detail page: render a map whenever coordinates or a maps link exist.
  if (!coords && !externalHref) return null;

  const label = locationName?.trim() || uiMessage(locale, 'openMap');

  return (
    <div className="catalog-item-media-block">
      <p className="sec-label">{uiMessage(locale, 'location')}</p>
      <h2 className="sec-title">{label}</h2>
      {coords ? (
        <div className="tour-wrap catalog-map-embed reveal">
          <CultureItemDetailMapLazy latitude={coords.latitude} longitude={coords.longitude} />
        </div>
      ) : externalHref ? (
        <div className="tour-wrap catalog-map-embed reveal">
          <iframe
            title={label}
            src={`https://www.google.com/maps?q=${encodeURIComponent(externalHref)}&output=embed`}
            className="tour-embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      ) : null}
      {externalHref ? (
        <a
          href={externalHref}
          className="catalog-map-external-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {uiMessage(locale, 'openInMaps')}
        </a>
      ) : null}
    </div>
  );
}
