import type { PublicBlogPostDTO } from '@/lib/dto';
import { BlogCard } from './BlogCard';

interface BlogGridProps {
  posts: PublicBlogPostDTO[];
  highlightedCount?: number;
}

export function BlogGrid({ posts, highlightedCount = 3 }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="blog-empty">
        <p>No articles published yet. Check back soon for stories from the foundation.</p>
      </div>
    );
  }

  const highlighted = posts.slice(0, highlightedCount);
  const rest = posts.slice(highlightedCount);

  return (
    <div className="blog-layout">
      <div className="blog-highlighted">
        <p className="blog-section-eyebrow">Highlighted</p>
        <div className="blog-grid blog-grid--highlighted">
          {highlighted.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      {rest.length > 0 ? (
        <div className="blog-chronological">
          <p className="blog-section-eyebrow">Latest updates</p>
          <div className="blog-grid">
            {rest.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
