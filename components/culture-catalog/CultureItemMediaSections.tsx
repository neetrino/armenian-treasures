import Image from 'next/image';
import { isMatterportUrl } from '@/lib/matterport';
import { TOUR_TYPE_OPTIONS } from '@/lib/culture-item-media';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { resolveCultureItemSectionOrder } from '@/lib/admin/culture-item-editor-sections';
import type { CultureItemEditorSectionId } from '@/lib/admin/culture-item-editor-sections';
import type { CultureItemMediaContent } from '@/lib/culture-item-media';
import {
  hasRenderableMapLocation,
  resolveMapCoordinates,
} from '@/lib/culture-catalog/culture-item-map';
import { CultureItemDetailMapLazy } from '@/components/culture-catalog/CultureItemDetailMapLazy';

interface CultureItemMediaSectionsProps {
  title: string;
  media: CultureItemMediaContent;
  locationName?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export function CultureItemMediaSections({
  title,
  media,
  locationName,
  address,
  latitude,
  longitude,
}: CultureItemMediaSectionsProps) {
  const sectionOrder = resolveCultureItemSectionOrder(media.sectionOrder);

  return (
    <>
      {sectionOrder.map((sectionId) => (
        <CultureItemMediaSection
          key={sectionId}
          sectionId={sectionId}
          title={title}
          media={media}
          locationName={locationName}
          address={address}
          latitude={latitude}
          longitude={longitude}
        />
      ))}
    </>
  );
}

interface CultureItemMediaSectionProps {
  sectionId: CultureItemEditorSectionId;
  title: string;
  media: CultureItemMediaContent;
  locationName?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

function tourTypeLabel(type: string): string {
  return TOUR_TYPE_OPTIONS.find((option) => option.value === type)?.label ?? '3D Tour';
}

function CultureItemMediaSection({
  sectionId,
  title,
  media,
  locationName,
  address,
  latitude,
  longitude,
}: CultureItemMediaSectionProps) {
  switch (sectionId) {
    case 'card-image':
      return null;
    case 'description':
      return (
        <>
          {media.blocks.map((block) => (
            <article key={block.id} className="catalog-detail-card reveal">
              {block.image ? (
                <div className="catalog-detail-card__media">
                  <Image
                    src={resolvePublicAssetUrl(block.image)}
                    alt={block.caption || block.title || title}
                    width={1200}
                    height={750}
                  />
                </div>
              ) : null}
              <div className="catalog-detail-card__body">
                {block.title ? <h2>{block.title}</h2> : null}
                {block.subtitle ? <p className="sec-desc">{block.subtitle}</p> : null}
                {block.body ? <p>{block.body}</p> : null}
                {block.caption && block.image ? <p className="catalog-item-caption">{block.caption}</p> : null}
              </div>
            </article>
          ))}
        </>
      );
    case 'map': {
      const hasCoords = hasRenderableMapLocation(latitude, longitude);
      const coords = hasCoords
        ? { latitude: latitude as number, longitude: longitude as number }
        : resolveMapCoordinates(latitude, longitude);
      const resolvedAddress = address?.trim() || media.address.trim();
      const hasMapContent = Boolean(locationName?.trim() || resolvedAddress || hasCoords);
      if (!hasMapContent) return null;

      return (
        <div className="catalog-item-media-block">
          <p className="sec-label">Location &amp; Geography</p>
          <h2 className="sec-title">{locationName?.trim() || 'Map'}</h2>
          {resolvedAddress ? <p className="sec-desc">{resolvedAddress}</p> : null}
          <div className="map-wrap reveal">
            <CultureItemDetailMapLazy latitude={coords.latitude} longitude={coords.longitude} />
            <div className="map-info">
              {hasCoords ? (
                <span className="map-coord">
                  Coordinates:{' '}
                  <span>
                    {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
                  </span>
                </span>
              ) : null}
              {locationName?.trim() ? (
                <span className="map-coord">
                  Location: <span>{locationName}</span>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
    case 'tours':
      return (
        <>
          {media.tours.map((tour, index) => {
            const tourTitle = tour.title || (isMatterportUrl(tour.url) ? 'Matterport 3D Tour' : '3D Tour');
            return (
              <div
                key={tour.id}
                id={index === 0 ? 'tour' : undefined}
                className="catalog-item-media-block"
              >
                <p className="sec-label">Virtual Experience</p>
                <h2 className="sec-title">{tourTitle}</h2>
                <p className="sec-desc">{tourTypeLabel(tour.type)} walkthrough for {title}.</p>
                {tour.url && isMatterportUrl(tour.url) ? (
                  <div className="tour-main reveal">
                    <iframe
                      src={tour.url}
                      title={tourTitle}
                      className="tour-embed"
                      allow="fullscreen; xr-spatial-tracking"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : tour.previewImage ? (
                  <div className="tour-main reveal">
                    <Image
                      src={resolvePublicAssetUrl(tour.previewImage)}
                      alt={tourTitle}
                      width={1200}
                      height={640}
                      className="tour-preview-image"
                    />
                  </div>
                ) : null}
                {tour.url ? (
                  <div className="catalog-detail-actions">
                    <a href={tour.url} className="btn-teal" target="_blank" rel="noopener noreferrer">
                      Open 3D Tour
                    </a>
                  </div>
                ) : null}
              </div>
            );
          })}
        </>
      );
    case 'videos':
      return (
        <>
          {media.videos.map((video) => (
            <div key={video.id} className="catalog-item-media-block">
              <p className="sec-label">Video</p>
              <h2 className="sec-title">{video.title || 'Watch the Story'}</h2>
              {video.previewImage ? (
                <div className="tour-main reveal">
                  <Image
                    src={resolvePublicAssetUrl(video.previewImage)}
                    alt={video.title || title}
                    width={1200}
                    height={640}
                    className="tour-preview-image"
                  />
                </div>
              ) : null}
              {video.url ? (
                <div className="catalog-detail-actions">
                  <a href={video.url} className="btn-gold" target="_blank" rel="noopener noreferrer">
                    Watch video
                  </a>
                </div>
              ) : null}
            </div>
          ))}
        </>
      );
    case 'gallery':
      return media.gallery.length > 0 ? (
        <div className="catalog-item-media-block">
          <p className="sec-label">Photography Archive</p>
          <h2 className="sec-title">Gallery</h2>
          <div className="gallery-grid catalog-item-gallery-grid">
            {media.gallery.map((item) => (
              <GalleryItem key={item.id} item={item} title={title} />
            ))}
          </div>
        </div>
      ) : null;
    default:
      return null;
  }
}

function GalleryItem({
  item,
  title,
}: {
  item: CultureItemMediaContent['gallery'][number];
  title: string;
}) {
  const alt = item.alt || item.caption || title;
  if (item.kind === 'beforeAfter') {
    return (
      <div className="g-item reveal wide">
        <div className="catalog-gallery-before-after">
          {item.beforeUrl ? (
            <Image src={resolvePublicAssetUrl(item.beforeUrl)} alt={`${alt} — before`} width={600} height={450} />
          ) : null}
          {item.afterUrl ? (
            <Image src={resolvePublicAssetUrl(item.afterUrl)} alt={`${alt} — after`} width={600} height={450} />
          ) : null}
        </div>
        {item.caption ? (
          <div className="g-overlay">
            <span className="g-lbl">{item.caption}</span>
          </div>
        ) : null}
      </div>
    );
  }
  if (!item.url) return null;
  return (
    <div className="g-item reveal">
      <Image src={resolvePublicAssetUrl(item.url)} alt={alt} width={600} height={450} />
      {item.caption ? (
        <div className="g-overlay">
          <span className="g-lbl">{item.caption}</span>
        </div>
      ) : null}
    </div>
  );
}
