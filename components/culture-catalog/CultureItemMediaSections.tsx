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
import { CultureItemCardAssetsSection } from '@/components/culture-catalog/CultureItemCardAssetsSection';
import { CultureItemDetailMapLazy } from '@/components/culture-catalog/CultureItemDetailMapLazy';
import { CultureBeforeAfterCard } from '@/components/culture-catalog/CultureBeforeAfterCard';

interface CultureItemMediaSectionsProps {
  title: string;
  media: CultureItemMediaContent;
  locationName?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  image?: string | null;
  coverImage?: string | null;
  cardBackgroundColor?: string | null;
  cardBackgroundImage?: string | null;
}

export function CultureItemMediaSections({
  title,
  media,
  locationName,
  address,
  latitude,
  longitude,
  image,
  coverImage,
  cardBackgroundColor,
  cardBackgroundImage,
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
          image={image}
          coverImage={coverImage}
          cardBackgroundColor={cardBackgroundColor}
          cardBackgroundImage={cardBackgroundImage}
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
  image?: string | null;
  coverImage?: string | null;
  cardBackgroundColor?: string | null;
  cardBackgroundImage?: string | null;
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
  image,
  coverImage,
  cardBackgroundColor,
  cardBackgroundImage,
}: CultureItemMediaSectionProps) {
  switch (sectionId) {
    case 'card-image':
      return (
        <CultureItemCardAssetsSection
          title={title}
          image={image}
          coverImage={coverImage}
          cardBackgroundColor={cardBackgroundColor}
          cardBackgroundImage={cardBackgroundImage}
        />
      );
    case 'description':
      return (
        <>
          {media.blocks.map((block) => {
            const body = (
              <div className="about-body catalog-detail-card__body">
                {block.title ? <h3>{block.title}</h3> : null}
                {block.subtitle ? <p className="sec-desc">{block.subtitle}</p> : null}
                {block.body ? <p>{block.body}</p> : null}
                {block.caption && block.image ? <p className="catalog-item-caption">{block.caption}</p> : null}
              </div>
            );

            if (block.image) {
              return (
                <div key={block.id} className="about-split reveal">
                  <div className="catalog-detail-card__media">
                    <Image
                      src={resolvePublicAssetUrl(block.image)}
                      alt={block.caption || block.title || title}
                      width={1200}
                      height={675}
                    />
                  </div>
                  {body}
                </div>
              );
            }

            return (
              <article key={block.id} className="catalog-detail-card reveal">
                {body}
              </article>
            );
          })}
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
                <div className="tour-grid">
                  <div className="tour-main reveal">
                    {tour.url && isMatterportUrl(tour.url) ? (
                      <iframe
                        src={tour.url}
                        title={tourTitle}
                        className="tour-embed"
                        allow="fullscreen; xr-spatial-tracking"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    ) : tour.previewImage ? (
                      <Image
                        src={resolvePublicAssetUrl(tour.previewImage)}
                        alt={tourTitle}
                        width={1200}
                        height={675}
                        className="tour-preview-image"
                      />
                    ) : null}
                    <div className="tour-label">
                      <span className="tour-name">{tourTitle}</span>
                      {tour.url ? (
                        <a href={tour.url} className="btn-teal" target="_blank" rel="noopener noreferrer">
                          Open 3D Tour
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className="about-aside">
                    <div className="fact-card reveal">
                      <div className="fact-label">Tour type</div>
                      <div className="fact-value">{tourTypeLabel(tour.type)}</div>
                    </div>
                    {tour.url ? (
                      <div className="fact-card reveal">
                        <div className="fact-label">Access</div>
                        <div className="fact-value">Interactive 3D</div>
                      </div>
                    ) : null}
                  </div>
                </div>
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
              <div className="tour-grid">
                <div className="tour-main reveal">
                  {video.previewImage ? (
                    <Image
                      src={resolvePublicAssetUrl(video.previewImage)}
                      alt={video.title || title}
                      width={1200}
                      height={675}
                      className="tour-preview-image"
                    />
                  ) : null}
                  <div className="tour-label">
                    <span className="tour-name">{video.title || 'Video'}</span>
                    {video.url ? (
                      <a href={video.url} className="btn-gold" target="_blank" rel="noopener noreferrer">
                        Watch video
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className="about-aside">
                  <div className="fact-card reveal">
                    <div className="fact-label">Format</div>
                    <div className="fact-value">Story film</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      );
    case 'gallery': {
      const photos = media.gallery.filter((item) => item.kind !== 'beforeAfter' && item.url);
      const comparisons = media.gallery.filter(
        (item) => item.kind === 'beforeAfter' && (item.beforeUrl || item.afterUrl),
      );
      if (photos.length === 0 && comparisons.length === 0) return null;

      return (
        <>
          {photos.length > 0 ? (
            <div className="catalog-item-media-block">
              <p className="sec-label">Photography Archive</p>
              <h2 className="sec-title">Gallery</h2>
              <div className="gallery-grid">
                {photos.map((item) => (
                  <GalleryItem key={item.id} item={item} title={title} />
                ))}
              </div>
            </div>
          ) : null}
          {comparisons.length > 0 ? (
            <div className="catalog-item-media-block">
              <p className="sec-label">Visual Restoration</p>
              <h2 className="sec-title">Before &amp; After — Bringing the Past to Light</h2>
              <p className="sec-desc">Drag the slider to compare historical and restored views.</p>
              <div className="restoration-grid">
                {comparisons.map((item) => {
                  const alt = item.alt || item.caption || title;
                  if (!item.beforeUrl || !item.afterUrl) {
                    return (
                      <div key={item.id} className="rest-card reveal">
                        <div className="catalog-gallery-before-after catalog-gallery-before-after--fallback">
                          {item.beforeUrl ? (
                            <Image
                              src={resolvePublicAssetUrl(item.beforeUrl)}
                              alt={`${alt} — before`}
                              width={1200}
                              height={675}
                            />
                          ) : null}
                          {item.afterUrl ? (
                            <Image
                              src={resolvePublicAssetUrl(item.afterUrl)}
                              alt={`${alt} — after`}
                              width={1200}
                              height={675}
                            />
                          ) : null}
                        </div>
                        {item.caption ? <div className="rest-caption">{item.caption}</div> : null}
                      </div>
                    );
                  }
                  return (
                    <CultureBeforeAfterCard
                      key={item.id}
                      beforeUrl={item.beforeUrl}
                      afterUrl={item.afterUrl}
                      caption={item.caption || undefined}
                      alt={alt}
                    />
                  );
                })}
              </div>
            </div>
          ) : null}
        </>
      );
    }
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
