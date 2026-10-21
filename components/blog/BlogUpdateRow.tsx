import Link from 'next/link';
import { formatBlogDate } from '@/lib/format-blog-date';
import type { PublicBlogPostDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface BlogUpdateRowProps {
  post: PublicBlogPostDTO;
  locale?: SiteLocaleCode;
}

export function BlogUpdateRow({ post, locale = 'EN' }: BlogUpdateRowProps) {
  const excerpt = post.shortDescription.trim();

  return (
    <Link href={`/blog/${post.slug}`} className="blog-update">
      <time className="blog-update__date" dateTime={post.publishedAt}>
        {formatBlogDate(post.publishedAt)}
      </time>
      <span className="blog-update__copy">
        <span className="blog-update__title">{post.title}</span>
        {excerpt ? <span className="blog-update__excerpt">{excerpt}</span> : null}
      </span>
      <span className="blog-update__cta">{uiMessage(locale, 'readArticle')}</span>
    </Link>
  );
}
