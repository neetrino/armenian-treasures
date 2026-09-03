import { isMatterportUrl } from '@/lib/matterport';
import { TOUR_TYPE_OPTIONS } from '@/lib/culture-item-media';
import type { CultureTourBlock } from '@/lib/culture-item-media';

interface CultureItemPublicTourProps {
  tour: CultureTourBlock;
  isFirst: boolean;
}

function tourHeading(type: string): string {
  return TOUR_TYPE_OPTIONS.find((option) => option.value === type)?.label ?? 'Virtual tour';
}

export function CultureItemPublicTour({ tour, isFirst }: CultureItemPublicTourProps) {
  const title = tour.title || tourHeading(tour.type);
  const embeddable = Boolean(tour.url && isMatterportUrl(tour.url));

  return (
    <div id={isFirst ? 'tour' : undefined} className="catalog-item-media-block">
      <p className="sec-label">Virtual Experience</p>
      <h2 className="sec-title">{title}</h2>
      <div className="tour-wrap catalog-tour-wide reveal">
        {embeddable ? (
          <iframe
            src={tour.url}
            title={title}
            className="tour-embed"
            allow="fullscreen; xr-spatial-tracking"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : null}
        {tour.url && !embeddable ? (
          <a href={tour.url} className="btn-teal" target="_blank" rel="noopener noreferrer">
            Open 3D Tour
          </a>
        ) : null}
      </div>
    </div>
  );
}
