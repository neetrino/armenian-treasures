import type { Metadata } from 'next';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import '@/components/blog/blog.css';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingHero } from '@/components/landing/LandingHero';
import { getPublishedBlogPosts } from '@/lib/queries/blogs';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

export const revalidate = 60;

export const metadata: Metadata = buildPublicPageMetadata({
  title: 'Blog',
  description: 'Stories, updates, and insights from the Armenian Treasures Foundation.',
  pathname: '/blog',
});

async function BlogPage() {
  const [posts, locale] = await Promise.all([getPublishedBlogPosts(), getCurrentSiteLocale()]);

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
          <header className="blog-section-header">
            <p className="blog-section-eyebrow">{uiMessage(locale, 'latestArticles')}</p>
            <h2 className="blog-section-title">{uiMessage(locale, 'foundationJournal')}</h2>
            <p className="blog-section-subtitle">
              {uiMessage(locale, 'blogSectionSubtitle')}
            </p>
          </header>
          <BlogGrid posts={posts} locale={locale} />
        </div>
      </section>
    </HeritageLandingShell>
  );
}

export default BlogPage;
