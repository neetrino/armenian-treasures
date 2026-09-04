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

  return (
    <div className="blog-layout">
      <div className="blog-grid">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
