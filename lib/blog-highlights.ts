export const BLOG_HIGHLIGHT_COUNT = 3;

export function splitBlogHighlights<T extends { id: string }>(
  posts: T[],
  featured: T[],
  count = BLOG_HIGHLIGHT_COUNT,
): { highlights: T[]; updates: T[] } {
  const visible = new Map(posts.map((post) => [post.id, post]));
  const highlights: T[] = [];

  for (const post of featured) {
    const match = visible.get(post.id);
    if (match && highlights.length < count) highlights.push(match);
  }

  for (const post of posts) {
    if (highlights.length >= count) break;
    if (!highlights.some((item) => item.id === post.id)) highlights.push(post);
  }

  const chosen = new Set(highlights.map((post) => post.id));
  return {
    highlights,
    updates: posts.filter((post) => !chosen.has(post.id)),
  };
}
