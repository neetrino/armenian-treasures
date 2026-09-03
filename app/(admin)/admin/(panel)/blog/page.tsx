import type { Metadata } from 'next';
import { BlogsPageClient } from '@/components/admin/BlogsPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';
import { fetchFeaturedBlogByIds } from '@/lib/queries/featured-blog-sql';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Blog', robots: { index: false, follow: false } };

async function AdminBlogPage() {
  const user = await requireAdmin();
  const rows = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
  });
  const featuredById = await fetchFeaturedBlogByIds(rows.map((post) => post.id));

  return (
    <BlogsPageClient
      user={user}
      rows={rows.map((post) => ({
        id: post.id,
        title: getAdminLocaleValue(post.title),
        slug: post.slug,
        content: getAdminLocaleValue(post.content),
        image: post.image,
        headerImage: post.headerImage,
        backgroundImage: post.backgroundImage,
        galleryContent: post.galleryContent,
        publishedAt: post.publishedAt.toISOString(),
        isPublished: post.isPublished,
        featuredOnHome: featuredById.get(post.id)?.featuredOnHome ?? false,
        featuredOrder: featuredById.get(post.id)?.featuredOrder ?? null,
      }))}
    />
  );
}

export default AdminBlogPage;
