import type { PublicBlogPostDTO } from '@/lib/dto';

export function filterBlogPostsByCategory(
  posts: PublicBlogPostDTO[],
  categorySlug?: string | null,
): PublicBlogPostDTO[] {
  const slug = categorySlug?.trim();
  if (!slug) return posts;
  return posts.filter((post) => post.category?.slug === slug);
}
