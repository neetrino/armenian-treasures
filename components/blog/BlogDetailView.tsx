import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingHero } from '@/components/landing/LandingHero';
import { BlogContentBlocks } from '@/components/blog/BlogContentBlocks';
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
  const background = post.backgroundImage?.trim();
  const hasBlocks = post.blocks.length > 0;
  const legacyHtml = hasBlocks ? '' : toBlogRenderHtml(post.content);
  const categoryTitle = post.category?.title?.trim() ?? '';
  const publishedLabel = formatBlogDate(post.publishedAt);
  const eyebrow = categoryTitle
    ? `✦ ${categoryTitle} ✦`
    : `✦ ${uiMessage(locale, 'blogEyebrow')} ✦`;

  return (
    <HeritageLandingShell>
      <LandingHero
        locale={locale}
        eyebrow={eyebrow}
        title={post.title}
        accent=""
        slogan={publishedLabel || undefined}
        subtitle=""
        heroImage={resolvePublicAssetUrl(header)}
        heroClassName="culture-catalog-hero blog-detail-landing-hero"
        ctas={[{ label: uiMessage(locale, 'backToBlog'), href: '/blog', variant: 'outline' }]}
      />

      <KhndzoreskDivider />

      <div
        className="blog-detail-page"
        style={
          background
            ? { backgroundImage: `url(${resolvePublicAssetUrl(background)})`, backgroundSize: 'cover' }
            : undefined
        }
      >
        <article className="blog-detail-article">
          <div className="blog-detail-article__intro" aria-hidden>
            <span className="blog-detail-article__intro-line" />
            <span className="blog-detail-article__intro-mark">◆</span>
            <span className="blog-detail-article__intro-line" />
          </div>
          {hasBlocks ? (
            <BlogContentBlocks blocks={post.blocks} title={post.title} locale={locale} />
          ) : (
            <div className="blog-detail-prose" dangerouslySetInnerHTML={{ __html: legacyHtml }} />
          )}
        </article>
      </div>
    </HeritageLandingShell>
  );
}
