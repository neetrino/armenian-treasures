import type { PublicBlogPostDTO } from '@/lib/dto';
import { BlogCard } from './BlogCard';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface BlogGridProps {
  posts: PublicBlogPostDTO[];
  locale?: SiteLocaleCode;
}

export function BlogGrid({ posts, locale = 'EN' }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="blog-empty">
        <p>{uiMessage(locale, 'noArticlesYet')}</p>
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="blog-layout">
      {featured ? (
        <div className="blog-featured">
          <BlogCard post={featured} featured locale={locale} />
        </div>
      ) : null}
      {rest.length > 0 ? (
        <div className="blog-grid">
          {rest.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
