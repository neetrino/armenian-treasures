import type { Metadata } from 'next';
import { BlogCategoriesPageClient } from '@/components/admin/BlogCategoriesPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Blog categories',
  robots: { index: false, follow: false },
};

async function AdminBlogCategoriesPage() {
  const user = await requireAdmin();
  const rows = await prisma.blogCategory.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    include: { _count: { select: { posts: true } } },
  });

  return (
    <BlogCategoriesPageClient
      user={user}
      rows={rows.map((row) => ({
        id: row.id,
        title: getAdminLocaleValue(row.title),
        slug: row.slug,
        postCount: row._count.posts,
      }))}
    />
  );
}

export default AdminBlogCategoriesPage;
