import type { HomepageFeaturedBlogSlot } from '@/lib/queries/featured-blog-sql';

export const HOME_NEWS_POST_COUNT = 4;

export type FeaturedHomeTogglePlan =
  | { type: 'off' }
  | { type: 'on'; featuredOrder: number }
  | { type: 'replace'; replaceId: string; featuredOrder: number | null }
  | { type: 'needs-replace' };

function nextFeaturedOrder(featured: HomepageFeaturedBlogSlot[]): number {
  const highest = featured.reduce((max, row) => Math.max(max, row.featuredOrder ?? 0), 0);
  return highest + 1;
}

export function planFeaturedHomeToggle(
  featured: HomepageFeaturedBlogSlot[],
  id: string,
  replaceId?: string,
  limit = HOME_NEWS_POST_COUNT,
): FeaturedHomeTogglePlan {
  if (featured.some((row) => row.id === id)) return { type: 'off' };
  if (featured.length < limit) {
    return { type: 'on', featuredOrder: nextFeaturedOrder(featured) };
  }

  const replaced = replaceId ? featured.find((row) => row.id === replaceId) : undefined;
  if (!replaced || replaced.id === id) return { type: 'needs-replace' };
  return { type: 'replace', replaceId: replaced.id, featuredOrder: replaced.featuredOrder };
}
