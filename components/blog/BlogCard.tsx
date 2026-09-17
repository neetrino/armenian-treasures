import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatBlogDate } from '@/lib/format-blog-date';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { PublicBlogPostDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface BlogCardProps {
  post: PublicBlogPostDTO;
  locale?: SiteLocaleCode;
}

export function BlogCard({ post, locale = 'EN' }: BlogCardProps) {
  const imageSrc = post.image?.trim()
    ? resolvePublicAssetUrl(post.image)
    : resolvePublicAssetUrl('/images/culture/card-heritage.webp');
  const excerpt = post.shortDescription.trim();

  return (
    <Link href={`/blog/${post.slug}`} className="blog-card group">
      <div className="blog-card__image">
        <Image
          src={imageSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="blog-card__body">
        <time className="blog-card__date" dateTime={post.publishedAt}>
          {formatBlogDate(post.publishedAt)}
        </time>
        <h2 className="blog-card__title">{post.title}</h2>
        {excerpt ? <p className="blog-card__excerpt">{excerpt}</p> : null}
        <span className="blog-card__cta inline-flex items-center gap-1.5">
          {uiMessage(locale, 'readArticle')} <ArrowRight size={12} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
