import type { PublicBlogPostDTO } from '@/lib/dto';
import { BlogCard } from './BlogCard';
import { BlogUpdateRow } from './BlogUpdateRow';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface BlogGridProps {
  highlights: PublicBlogPostDTO[];
  updates: PublicBlogPostDTO[];
  locale?: SiteLocaleCode;
}

export function BlogGrid({ highlights, updates, locale = 'EN' }: BlogGridProps) {
  if (highlights.length === 0 && updates.length === 0) {
    return (
      <div className="blog-empty">
        <p>{uiMessage(locale, 'noArticlesYet')}</p>
      </div>
    );
  }

  return (
    <div className="blog-layout">
      {highlights.length > 0 ? (
        <div className="blog-highlights">
          <h2 className="blog-section-eyebrow">{uiMessage(locale, 'blogHighlights')}</h2>
          <div className="blog-grid blog-grid--highlights">
            {highlights.map((post) => (
              <BlogCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </div>
      ) : null}
      {updates.length > 0 ? (
        <div className="blog-updates">
          <h2 className="blog-section-eyebrow">{uiMessage(locale, 'blogChronology')}</h2>
          <div className="blog-timeline">
            {updates.map((post) => (
              <BlogUpdateRow key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
