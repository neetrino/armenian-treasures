import type { Metadata } from 'next';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import '@/components/blog/blog.css';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingHero } from '@/components/landing/LandingHero';
import { getPublishedBlogPosts } from '@/lib/queries/blogs';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

export const metadata: Metadata = buildPublicPageMetadata({
  title: 'Blog',
  description: 'Stories, updates, and insights from the Armenian Treasures Foundation.',
  pathname: '/blog',
});

async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <HeritageLandingShell>
      <LandingHero
        eyebrow="BLOG"
        title="STORIES FROM"
        accent="THE MISSION"
        subtitle="Field reports, restoration updates, and cultural heritage insights from across Armenia and the diaspora."
        ctas={[
          { label: 'Read Articles', href: '#blog-posts', variant: 'gold' },
          { label: 'Support The Mission', href: '/donate', variant: 'teal' },
        ]}
      />

      <KhndzoreskDivider />

      <section id="blog-posts" className="blog-page-section">
        <div className="blog-page-inner">
          <header className="blog-section-header">
            <p className="blog-section-eyebrow">Latest articles</p>
            <h2 className="blog-section-title">Foundation Journal</h2>
            <p className="blog-section-subtitle">
              Discover how preservation work unfolds in the field, in archives, and across communities worldwide.
            </p>
          </header>
          <BlogGrid posts={posts} />
        </div>
      </section>
    </HeritageLandingShell>
  );
}

export default BlogPage;
