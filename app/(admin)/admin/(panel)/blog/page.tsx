import type { Metadata } from 'next';
import { BlogsPageClient } from '@/components/admin/BlogsPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { fetchFeaturedBlogByIds } from '@/lib/queries/featured-blog-sql';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Blog', robots: { index: false, follow: false } };

async function AdminBlogPage() {
  const user = await requireAdmin();
  const rows = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } });
  const featuredById = await fetchFeaturedBlogByIds(rows.map((post) => post.id));
  let categories: { id: string; title: string }[] = [];
  try {
    categories = await prisma.blogCategory.findMany({ select: { id: true, title: true } });
  } catch {
    categories = [];
  }
  const titleById = new Map(categories.map((category) => [category.id, category.title]));

  return (
    <BlogsPageClient
      user={user}
      rows={rows.map((post) => ({
        id: post.id,
        title: getAdminLocaleValue(post.title),
        slug: post.slug,
        categoryTitle: post.categoryId
          ? getAdminLocaleValue(titleById.get(post.categoryId) ?? '') || null
          : null,
        image: post.image,
        publishedAt: post.publishedAt.toISOString(),
        isPublished: post.isPublished,
        featuredOnHome: featuredById.get(post.id)?.featuredOnHome ?? false,
      }))}
    />
  );
}

export default AdminBlogPage;
