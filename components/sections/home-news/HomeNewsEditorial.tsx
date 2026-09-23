import Image from 'next/image';
import Link from 'next/link';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { PublicBlogPostDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { excerptFeaturedTreasureText } from '@/lib/mappers/featured-treasures';
import { cn } from '@/lib/utils';

const FALLBACK_IMAGE = '/images/culture/card-heritage.webp';

interface HomeNewsEditorialProps {
  lead: PublicBlogPostDTO;
  side: PublicBlogPostDTO[];
  locale: SiteLocaleCode;
}

function newsImage(post: PublicBlogPostDTO): string {
  const source = post.image?.trim() || post.headerImage?.trim() || FALLBACK_IMAGE;
  return resolvePublicAssetUrl(source);
}

function newsCategory(post: PublicBlogPostDTO, locale: SiteLocaleCode): string {
  return post.category?.title.trim() || uiMessage(locale, 'blogEyebrow');
}

function NewsPhoto({ src, className, sizes }: { src: string; className: string; sizes: string }) {
  return (
    <div className={className}>
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
    </div>
  );
}

function LeadStory({ post, locale }: { post: PublicBlogPostDTO; locale: SiteLocaleCode }) {
  return (
    <Link href={`/blog/${post.slug}`} className="home-news-editorial__lead">
      <NewsPhoto
        src={newsImage(post)}
        className="home-news-editorial__lead-media"
        sizes="(max-width: 960px) 100vw, 640px"
      />
      <p className="home-news-editorial__kicker">{newsCategory(post, locale)}</p>
      <h3 className="home-news-editorial__lead-title">{post.title}</h3>
      {post.shortDescription.trim() ? (
        <p className="home-news-editorial__excerpt">
          {excerptFeaturedTreasureText(post.shortDescription, 140)}
        </p>
      ) : null}
      <span className="home-news-editorial__more">
        {uiMessage(locale, 'homeBlogReadMore')} <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

function SideStory({ post, locale }: { post: PublicBlogPostDTO; locale: SiteLocaleCode }) {
  return (
    <Link href={`/blog/${post.slug}`} className="home-news-editorial__row">
      <NewsPhoto
        src={newsImage(post)}
        className="home-news-editorial__row-media"
        sizes="(max-width: 960px) 152px, 280px"
      />
      <div className="home-news-editorial__row-copy">
        <p className="home-news-editorial__kicker">{newsCategory(post, locale)}</p>
        <h3 className="home-news-editorial__row-title">{post.title}</h3>
        {post.shortDescription.trim() ? (
          <p className="home-news-editorial__excerpt">
            {excerptFeaturedTreasureText(post.shortDescription, 110)}
          </p>
        ) : null}
        <span className="home-news-editorial__arrow" aria-hidden>
          →
        </span>
      </div>
    </Link>
  );
}

export function HomeNewsEditorial({ lead, side, locale }: HomeNewsEditorialProps) {
  return (
    <div className={cn('home-news-editorial', side.length === 0 && 'home-news-editorial--solo')}>
      <LeadStory post={lead} locale={locale} />
      {side.length > 0 ? (
        <div className="home-news-editorial__side">
          {side.map((post) => (
            <SideStory key={post.id} post={post} locale={locale} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
