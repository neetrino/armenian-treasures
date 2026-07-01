import type { Metadata } from 'next';
import Link from 'next/link';
import '@/components/khndzoresk/khndzoresk.css';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import '@/components/blog/blog.css';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import { BlogGrid } from '@/components/blog/BlogGrid';
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
    <div className="khndzoresk-page">
      <KhndzoreskParticles />

      <div className="hero cultural-portal-hero">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
          <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
        </svg>
        <div className="hero-content">
          <p className="hero-eyebrow reveal">BLOG</p>
          <h1 className="reveal">
            STORIES FROM
            <span>THE MISSION</span>
          </h1>
          <p className="hero-sub reveal">
            Field reports, restoration updates, and cultural heritage insights from across Armenia and the diaspora.
          </p>
          <div className="hero-btns reveal">
            <a href="#blog-posts" className="btn-gold">
              Read Articles
            </a>
            <Link href="/donate" className="btn-teal">
              Support The Mission
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      </div>

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
    </div>
  );
}

export default BlogPage;
