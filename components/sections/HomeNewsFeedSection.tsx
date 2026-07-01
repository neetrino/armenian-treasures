import { BlogCard } from '@/components/blog/BlogCard';
import { getPublishedBlogPosts } from '@/lib/queries/blogs';
import Link from 'next/link';

const SECTION = {
  eyebrow: 'NEWS & IMPACT',
  title: 'Stories from the Heritage Community',
  description:
    'Impact stories, donor updates, and field notes from the Armenian Treasures network — curated from our news archive.',
  viewAllLabel: 'View all news',
} as const;

export async function HomeNewsFeedSection() {
  const posts = (await getPublishedBlogPosts()).slice(0, 3);

  return (
    <section
      id="news"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6"
      aria-labelledby="home-news-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(214,184,90,0.07),transparent_70%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <header className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[43.75rem]">
            <p className="mb-3 font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
              {SECTION.eyebrow}
            </p>
            <h2
              id="home-news-heading"
              className="mb-3 font-cinzel text-[clamp(1.875rem,2.8vw,2.75rem)] font-extrabold uppercase leading-[1.08] tracking-[0.01em] text-heritage-gold"
            >
              {SECTION.title}
            </h2>
            <p className="font-display text-[clamp(0.9375rem,1vw,1.0625rem)] italic leading-[1.55] text-surface-muted">
              {SECTION.description}
            </p>
          </div>
          <Link
            href="/blog"
            className="btn-outline shrink-0 self-start sm:self-auto"
          >
            {SECTION.viewAllLabel}
          </Link>
        </header>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="heritage-card-surface rounded-sm px-6 py-10 text-center">
            <p className="font-cinzel text-sm font-semibold uppercase tracking-[0.14em] text-heritage-gold">
              News feed launching soon
            </p>
            <p className="mt-3 font-display text-sm leading-relaxed text-surface-muted">
              Impact stories, image posts, and donor updates will appear here once published in the
              admin blog. Video posts and Meta publishing integration are planned for a future
              release.
            </p>
            {/* TODO(meta-publishing): one-click Meta publish when API credentials and workflow exist */}
          </div>
        )}
      </div>
    </section>
  );
}
