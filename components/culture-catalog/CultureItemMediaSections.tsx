import { CultureItemExpandableText } from '@/components/culture-catalog/CultureItemExpandableText';
import { CultureItemGalleryLightbox } from '@/components/culture-catalog/CultureItemGalleryLightbox';
import { CultureItemPublicMap } from '@/components/culture-catalog/CultureItemPublicMap';
import { CultureItemPublicTour } from '@/components/culture-catalog/CultureItemPublicTour';
import { CultureItemPublicVideo } from '@/components/culture-catalog/CultureItemPublicVideo';
import { CultureBeforeAfterCard } from '@/components/culture-catalog/CultureBeforeAfterCard';
import { resolveCultureItemSectionOrder } from '@/lib/admin/culture-item-editor-sections';
import type { CultureItemEditorSectionId } from '@/lib/admin/culture-item-editor-sections';
import type { CultureItemMediaContent } from '@/lib/culture-item-media';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface CultureItemMediaSectionsProps {
  title: string;
  media: CultureItemMediaContent;
  locationName?: string | null;
  showOnMap?: boolean;
  mapUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  locale?: SiteLocaleCode;
}

export function CultureItemMediaSections({
  title,
  media,
  locationName,
  showOnMap = false,
  mapUrl,
  latitude,
  longitude,
  locale = 'EN',
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
          latitude={latitude}
          longitude={longitude}
          locale={locale}
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
  latitude,
  longitude,
  locale = 'EN',
}: CultureItemMediaSectionProps) {
  switch (sectionId) {
    case 'card-image':
      return null;
    case 'description':
      return <DescriptionBlocks media={media} locale={locale} />;
    case 'map':
      return (
        <CultureItemPublicMap
          showOnMap={Boolean(showOnMap)}
          mapUrl={mapUrl}
          locationName={locationName}
          latitude={latitude}
          longitude={longitude}
          locale={locale}
        />
      );
    case 'tours': {
      const tours = media.tours.filter((tour) => Boolean(tour.url?.trim() || tour.title?.trim()));
      return (
        <>
          {tours.map((tour, index) => (
            <CultureItemPublicTour
              key={tour.id}
              tour={tour}
              isFirst={index === 0}
              locale={locale}
            />
          ))}
        </>
      );
    }
    case 'videos': {
      const videos = media.videos.filter((video) => video.url);
      if (videos.length === 0) return null;
      return (
        <div className="catalog-item-media-block">
          <p className="sec-label">{uiMessage(locale, 'video')}</p>
          <h2 className="sec-title">{uiMessage(locale, 'watchStory')}</h2>
          <div className="catalog-video-grid">
            {videos.map((video) => (
              <CultureItemPublicVideo key={video.id} video={video} fallbackTitle={title} />
            ))}
          </div>
        </div>
      );
    }
    case 'gallery':
      return <GalleryBlocks media={media} title={title} locale={locale} />;
    default:
      return null;
  }
}

function DescriptionBlocks({
  media,
  locale,
}: {
  media: CultureItemMediaContent;
  locale: SiteLocaleCode;
}) {
  return (
    <>
      {media.blocks.map((block) => {
        if (!block.title && !block.subtitle && !block.body) return null;
        return (
          <article key={block.id} className="catalog-detail-card reveal">
            <div className="about-body catalog-detail-card__body">
              {block.title ? <h3>{block.title}</h3> : null}
              {block.subtitle ? <p className="sec-desc">{block.subtitle}</p> : null}
              {block.body ? (
                <CultureItemExpandableText text={block.body} locale={locale} preserveLineBreaks />
              ) : null}
            </div>
          </article>
        );
      })}
    </>
  );
}

function GalleryBlocks({
  media,
  title,
  locale,
}: {
  media: CultureItemMediaContent;
  title: string;
  locale: SiteLocaleCode;
}) {
  const photos = media.gallery.filter((item) => item.kind !== 'beforeAfter' && item.url);
  const comparisons = media.gallery.filter(
    (item) => item.kind === 'beforeAfter' && (item.beforeUrl || item.afterUrl),
  );
  if (photos.length === 0 && comparisons.length === 0) return null;

  return (
    <>
      {photos.length > 0 ? (
        <div className="catalog-item-media-block">
          <p className="sec-label">{uiMessage(locale, 'photographyArchive')}</p>
          <h2 className="sec-title">{uiMessage(locale, 'gallery')}</h2>
          <CultureItemGalleryLightbox
            title={`${title} — ${uiMessage(locale, 'gallery')}`}
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
          <p className="sec-label">{uiMessage(locale, 'visualRestoration')}</p>
          <h2 className="sec-title">{uiMessage(locale, 'beforeAfter')}</h2>
          <div className="restoration-grid">
            {comparisons.map((item) => (
              <CultureBeforeAfterCard
                key={item.id}
                beforeUrl={item.beforeUrl}
                afterUrl={item.afterUrl}
                caption={item.caption || undefined}
                alt={item.caption || title}
                locale={locale}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
