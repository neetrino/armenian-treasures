import { CultureItemExpandableText } from '@/components/culture-catalog/CultureItemExpandableText';
import { CultureItemGalleryLightbox } from '@/components/culture-catalog/CultureItemGalleryLightbox';
import { CultureItemPublicMap } from '@/components/culture-catalog/CultureItemPublicMap';
import { CultureItemPublicTour } from '@/components/culture-catalog/CultureItemPublicTour';
import { CultureItemPublicVideo } from '@/components/culture-catalog/CultureItemPublicVideo';
import { CultureBeforeAfterCard } from '@/components/culture-catalog/CultureBeforeAfterCard';
import { resolveCultureItemSectionOrder } from '@/lib/admin/culture-item-editor-sections';
import type { CultureItemEditorSectionId } from '@/lib/admin/culture-item-editor-sections';
import type { CultureItemMediaContent } from '@/lib/culture-item-media';

interface CultureItemMediaSectionsProps {
  title: string;
  media: CultureItemMediaContent;
  locationName?: string | null;
  showOnMap?: boolean;
  mapUrl?: string | null;
}

export function CultureItemMediaSections({
  title,
  media,
  locationName,
  showOnMap = false,
  mapUrl,
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
          showOnMap={showOnMap}
          mapUrl={mapUrl}
        />
      ))}
    </>
  );
}

interface CultureItemMediaSectionProps extends CultureItemMediaSectionsProps {
  sectionId: CultureItemEditorSectionId;
}

function CultureItemMediaSection({
  sectionId,
  title,
  media,
  locationName,
  showOnMap,
  mapUrl,
}: CultureItemMediaSectionProps) {
  switch (sectionId) {
    case 'card-image':
      return null;
    case 'description':
      return <DescriptionBlocks media={media} />;
    case 'map':
      return (
        <CultureItemPublicMap showOnMap={Boolean(showOnMap)} mapUrl={mapUrl} locationName={locationName} />
      );
    case 'tours':
      return (
        <>
          {media.tours.map((tour, index) => (
            <CultureItemPublicTour key={tour.id} tour={tour} isFirst={index === 0} />
          ))}
        </>
      );
    case 'videos': {
      const videos = media.videos.filter((video) => video.url);
      if (videos.length === 0) return null;
      return (
        <div className="catalog-item-media-block">
          <p className="sec-label">Video</p>
          <h2 className="sec-title">Watch the Story</h2>
          <div className="catalog-video-grid">
            {videos.map((video) => (
              <CultureItemPublicVideo key={video.id} video={video} fallbackTitle={title} />
            ))}
          </div>
        </div>
      );
    }
    case 'gallery':
      return <GalleryBlocks media={media} title={title} />;
    default:
      return null;
  }
}

function DescriptionBlocks({ media }: { media: CultureItemMediaContent }) {
  return (
    <>
      {media.blocks.map((block) => {
        if (!block.title && !block.subtitle && !block.body) return null;
        return (
          <article key={block.id} className="catalog-detail-card reveal">
            <div className="about-body catalog-detail-card__body">
              {block.title ? <h3>{block.title}</h3> : null}
              {block.subtitle ? <p className="sec-desc">{block.subtitle}</p> : null}
              {block.body ? <CultureItemExpandableText text={block.body} /> : null}
            </div>
          </article>
        );
      })}
    </>
  );
}

function GalleryBlocks({ media, title }: { media: CultureItemMediaContent; title: string }) {
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
          <CultureItemGalleryLightbox
            title={`${title} gallery`}
            items={photos.map((item) => ({
              id: item.id,
              url: item.url,
              caption: item.caption || undefined,
              alt: item.caption || title,
            }))}
          />
        </div>
      ) : null}
      {comparisons.length > 0 ? (
        <div className="catalog-item-media-block">
          <p className="sec-label">Visual Restoration</p>
          <h2 className="sec-title">Before &amp; After</h2>
          <div className="restoration-grid">
            {comparisons.map((item) => (
              <CultureBeforeAfterCard
                key={item.id}
                beforeUrl={item.beforeUrl}
                afterUrl={item.afterUrl}
                caption={item.caption || undefined}
                alt={item.caption || title}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
