import { isMatterportUrl } from '@/lib/matterport';
import {
  normalizeTourBlock,
  type CultureTourBlock,
  type CultureTourType,
} from '@/lib/culture-item-media';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage, type UiMessageKey } from '@/lib/i18n/ui-messages';

interface CultureItemPublicTourProps {
  tour: CultureTourBlock;
  isFirst: boolean;
  locale?: SiteLocaleCode;
}

const TOUR_TYPE_MESSAGE: Record<CultureTourType, UiMessageKey> = {
  LIDAR: 'tourTypeLidar',
  SCAN_3D: 'tourTypeScan3d',
  DRONE: 'tourTypeDrone',
};

function tourHeading(type: CultureTourType, locale: SiteLocaleCode): string {
  return uiMessage(locale, TOUR_TYPE_MESSAGE[type] ?? 'virtualTour');
}

export function CultureItemPublicTour({
  tour,
  isFirst,
  locale = 'EN',
}: CultureItemPublicTourProps) {
  const normalized = normalizeTourBlock(tour);
  if (!normalized.url) return null;

  const title = normalized.title || tourHeading(normalized.type, locale);
  const embeddable = isMatterportUrl(normalized.url);

  return (
    <div id={isFirst ? 'tour' : undefined} className="catalog-item-media-block">
      <p className="sec-label">{uiMessage(locale, 'virtualExperience')}</p>
      <h2 className="sec-title">{title}</h2>
      <div className="tour-wrap catalog-tour-wide reveal">
        {embeddable ? (
          <iframe
            src={normalized.url}
            title={title}
            className="tour-embed"
            allow="fullscreen; xr-spatial-tracking"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <a href={normalized.url} className="btn-teal" target="_blank" rel="noopener noreferrer">
            {uiMessage(locale, 'open3dTour')}
          </a>
        )}
      </div>
    </div>
  );
}
