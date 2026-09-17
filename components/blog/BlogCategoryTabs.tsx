import Link from 'next/link';
import type { PublicBlogCategoryDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { cn } from '@/lib/utils';

interface BlogCategoryTabsProps {
  categories: PublicBlogCategoryDTO[];
  activeSlug?: string | null;
  locale: SiteLocaleCode;
}

export function BlogCategoryTabs({ categories, activeSlug, locale }: BlogCategoryTabsProps) {
  if (categories.length === 0) return null;

  const active = activeSlug?.trim() ?? '';

  return (
    <div className="blog-category-tabs" role="tablist" aria-label={uiMessage(locale, 'blogCategories')}>
      <Link
        href="/blog"
        role="tab"
        aria-selected={!active}
        className={cn('blog-category-tab', !active && 'is-active')}
      >
        {uiMessage(locale, 'allBlogPosts')}
      </Link>
      {categories.map((category) => {
        const selected = category.slug === active;
        return (
          <Link
            key={category.id}
            href={`/blog?category=${encodeURIComponent(category.slug)}`}
            role="tab"
            aria-selected={selected}
            className={cn('blog-category-tab', selected && 'is-active')}
          >
            {category.title}
          </Link>
        );
      })}
    </div>
  );
}
