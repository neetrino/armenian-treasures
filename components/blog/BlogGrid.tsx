import type { PublicBlogPostDTO } from '@/lib/dto';
import { BlogCard } from './BlogCard';

interface BlogGridProps {
  posts: PublicBlogPostDTO[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="blog-empty">
        <p>No articles published yet. Check back soon for stories from the foundation.</p>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
