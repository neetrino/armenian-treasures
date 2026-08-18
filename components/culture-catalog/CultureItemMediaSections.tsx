import Image from 'next/image';
import { isMatterportUrl } from '@/lib/matterport';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { CultureItemMediaContent } from '@/lib/culture-item-media';

interface CultureItemMediaSectionsProps {
  title: string;
  media: CultureItemMediaContent;
}

export function CultureItemMediaSections({ title, media }: CultureItemMediaSectionsProps) {
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
            {block.body ? <p className="whitespace-pre-line">{block.body}</p> : null}
            {block.caption && block.image ? <p className="text-sm text-ink-muted">{block.caption}</p> : null}
          </div>
        </article>
      ))}

      {media.tours.map((tour) => (
        <div key={tour.id} id={tour.id === media.tours[0]?.id ? 'tour' : undefined} className="catalog-detail-card reveal">
          <div className="catalog-detail-card__body">
            <h2>{tour.title || (isMatterportUrl(tour.url) ? 'Matterport 3D Tour' : '3D Tour')}</h2>
            {tour.previewImage ? (
              <Image
                src={resolvePublicAssetUrl(tour.previewImage)}
                alt={tour.title || title}
                width={1200}
                height={640}
                className="mb-4 rounded-xl"
              />
            ) : null}
            {tour.url && isMatterportUrl(tour.url) ? (
              <iframe
                src={tour.url}
                title={tour.title || `${title} 3D Tour`}
                className="catalog-tour-embed"
                allow="fullscreen; xr-spatial-tracking"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : null}
            {tour.url ? (
              <div className="catalog-detail-actions">
                <a href={tour.url} className="btn-teal" target="_blank" rel="noopener noreferrer">
                  Open 3D Tour
                </a>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      {media.videos.map((video) => (
        <div key={video.id} className="catalog-detail-card reveal">
          <div className="catalog-detail-card__body">
            <h2>{video.title || 'Video'}</h2>
            {video.previewImage ? (
              <Image
                src={resolvePublicAssetUrl(video.previewImage)}
                alt={video.title || title}
                width={1200}
                height={640}
                className="mb-4 rounded-xl"
              />
            ) : null}
            {video.url ? (
              <a href={video.url} className="btn-gold" target="_blank" rel="noopener noreferrer">
                Watch video
              </a>
            ) : null}
          </div>
        </div>
      ))}

      {media.gallery.length > 0 ? (
        <div className="catalog-detail-card reveal">
          <div className="catalog-detail-card__body">
            <h2>Gallery</h2>
            <div className="catalog-gallery-grid">
              {media.gallery.map((item) => (
                <GalleryItem key={item.id} item={item} title={title} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
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
      <div className="catalog-gallery-item">
        <div className="grid grid-cols-2 gap-2">
          {item.beforeUrl ? (
            <Image src={resolvePublicAssetUrl(item.beforeUrl)} alt={`${alt} — before`} width={600} height={450} />
          ) : null}
          {item.afterUrl ? (
            <Image src={resolvePublicAssetUrl(item.afterUrl)} alt={`${alt} — after`} width={600} height={450} />
          ) : null}
        </div>
        {item.caption ? <p className="mt-2 text-xs text-ink-muted">{item.caption}</p> : null}
      </div>
    );
  }
  if (!item.url) return null;
  return (
    <div className="catalog-gallery-item">
      <Image src={resolvePublicAssetUrl(item.url)} alt={alt} width={600} height={450} />
      {item.caption ? <p className="mt-2 text-xs text-ink-muted">{item.caption}</p> : null}
    </div>
  );
}
