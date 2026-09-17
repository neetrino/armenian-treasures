import type { Metadata } from 'next';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import '@/components/blog/blog.css';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { BlogCategoryTabs } from '@/components/blog/BlogCategoryTabs';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingHero } from '@/components/landing/LandingHero';
import { filterBlogPostsByCategory } from '@/lib/blog-filters';
import {
  getPublishedBlogCategories,
  getPublishedBlogPosts,
} from '@/lib/queries/blogs';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

export const revalidate = 60;

export const metadata: Metadata = buildPublicPageMetadata({
  title: 'Blog',
  description: 'Stories, updates, and insights from the Armenian Treasures Foundation.',
  pathname: '/blog',
});

interface PageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0]?.trim() ?? '';
  return value?.trim() ?? '';
}

async function BlogPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const categorySlug = firstParam(searchParams.category);
  const [posts, categories, locale] = await Promise.all([
    getPublishedBlogPosts(),
    getPublishedBlogCategories(),
    getCurrentSiteLocale(),
  ]);
  const knownCategory = categories.some((category) => category.slug === categorySlug);
  const activeSlug = knownCategory ? categorySlug : '';
  const visiblePosts = filterBlogPostsByCategory(posts, activeSlug);

  return (
    <HeritageLandingShell>
      <LandingHero
        locale={locale}
        eyebrow={uiMessage(locale, 'blogEyebrow')}
        title={uiMessage(locale, 'blogTitle')}
        accent={uiMessage(locale, 'blogAccent')}
        subtitle={uiMessage(locale, 'blogSubtitle')}
        ctas={[
          { label: uiMessage(locale, 'readArticles'), href: '#blog-posts', variant: 'gold' },
          { label: uiMessage(locale, 'supportTheMission'), href: '/donate', variant: 'teal' },
        ]}
      />

      <KhndzoreskDivider />

      <section id="blog-posts" className="blog-page-section">
        <div className="blog-page-inner">
          <BlogCategoryTabs categories={categories} activeSlug={activeSlug} locale={locale} />
          <BlogGrid posts={visiblePosts} locale={locale} />
        </div>
      </section>
    </HeritageLandingShell>
  );
}

export default BlogPage;
