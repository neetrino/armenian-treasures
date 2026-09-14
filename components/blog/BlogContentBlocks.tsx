import Image from 'next/image';
import { CultureItemGalleryLightbox } from '@/components/culture-catalog/CultureItemGalleryLightbox';
import { CultureItemPublicVideo } from '@/components/culture-catalog/CultureItemPublicVideo';
import { toBlogRenderHtml } from '@/lib/blog-content';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { resolveLocalizedText } from '@/lib/i18n/translatable-content';
import type { ResolvedBlogContentBlock } from '@/lib/blog-content-blocks';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

interface BlogContentBlocksProps {
  blocks: ResolvedBlogContentBlock[];
  title: string;
  locale: SiteLocaleCode;
}

export function BlogContentBlocks({ blocks, title, locale }: BlogContentBlocksProps) {
  if (blocks.length === 0) return null;

  return (
    <div className="blog-detail-blocks">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={block.id} className="blog-detail-prose__heading">
                {block.text}
              </h2>
            );
          case 'description':
            return (
              <div
                key={block.id}
                className="blog-detail-prose"
                dangerouslySetInnerHTML={{ __html: toBlogRenderHtml(block.html) }}
              />
            );
          case 'photo':
            return (
              <figure key={block.id} className="blog-detail-photo">
                <div className="blog-detail-photo__frame">
                  <Image
                    src={resolvePublicAssetUrl(block.url)}
                    alt={block.caption || title}
                    width={1400}
                    height={900}
                    className="blog-detail-photo__image"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="blog-detail-photo__caption">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          case 'youtube':
            return (
              <div key={block.id} className="blog-detail-embed">
                <CultureItemPublicVideo
                  video={{ id: block.id, title, url: block.url, previewImage: '' }}
                  fallbackTitle={title}
                />
              </div>
            );
          case 'gallery':
            return (
              <div key={block.id} className="blog-detail-gallery">
                <CultureItemGalleryLightbox
                  title={title}
                  items={block.items.map((item) => {
                    const caption = resolveLocalizedText(item.caption, locale) || item.alt;
                    return {
                      id: item.id,
                      url: item.url,
                      caption: caption || undefined,
                      alt: caption || title,
                    };
                  })}
                />
              </div>
            );
          case 'link':
            return (
              <p key={block.id} className="blog-detail-link">
                <a href={block.url} target="_blank" rel="noopener noreferrer">
                  {block.label}
                </a>
              </p>
            );
        }
      })}
    </div>
  );
}
