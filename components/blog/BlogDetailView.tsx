import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { CultureItemGalleryLightbox } from '@/components/culture-catalog/CultureItemGalleryLightbox';
import { formatBlogDate } from '@/lib/format-blog-date';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { toBlogRenderHtml } from '@/lib/blog-content';
import type { PublicBlogPostDetailDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import '@/components/blog/blog.css';

interface BlogDetailViewProps {
  post: PublicBlogPostDetailDTO;
  locale?: SiteLocaleCode;
}

export function BlogDetailView({ post, locale = 'EN' }: BlogDetailViewProps) {
  const header = post.headerImage?.trim() || post.image?.trim() || '/images/culture/card-heritage.webp';
  const resolvedHeader = resolvePublicAssetUrl(header);
  const background = post.backgroundImage?.trim();
  const contentHtml = toBlogRenderHtml(post.content);
  const photos = post.gallery.filter((item) => item.kind !== 'beforeAfter' && item.url);

  return (
    <HeritageLandingShell>
      <div
        className="blog-detail-page"
        style={
          background
            ? { backgroundImage: `url(${resolvePublicAssetUrl(background)})`, backgroundSize: 'cover' }
            : undefined
        }
      >
        <section className="blog-detail-hero">
          <div className="blog-detail-hero__image">
            <Image
              src={resolvedHeader}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="blog-detail-hero__photo"
            />
            <div className="blog-detail-hero__shade" aria-hidden />
          </div>
          <Link href="/blog" className="blog-detail-back">
            <ArrowLeft size={14} aria-hidden /> {uiMessage(locale, 'backToBlog')}
          </Link>
          <div className="blog-detail-hero__content">
            <div className="blog-detail-hero__inner">
              <time className="blog-detail-date" dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
              <h1 className="blog-detail-title">{post.title}</h1>
            </div>
          </div>
        </section>

        <KhndzoreskDivider />

        <article className="blog-detail-article">
          <div className="blog-detail-article__intro" aria-hidden>
            <span className="blog-detail-article__intro-line" />
            <span className="blog-detail-article__intro-mark">◆</span>
            <span className="blog-detail-article__intro-line" />
          </div>
          <div className="blog-detail-prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          {photos.length > 0 ? (
            <div className="mt-10">
              <CultureItemGalleryLightbox
                title={`${post.title} — ${uiMessage(locale, 'gallery')}`}
                items={photos.map((item) => ({
                  id: item.id,
                  url: item.url,
                  caption: item.caption || undefined,
                  alt: item.caption || post.title,
                }))}
              />
            </div>
          ) : null}
        </article>
      </div>
    </HeritageLandingShell>
  );
}
