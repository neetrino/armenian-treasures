import type { Metadata } from 'next';
import { BlogsPageClient } from '@/components/admin/BlogsPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Blog', robots: { index: false, follow: false } };

async function AdminBlogPage() {
  const user = await requireAdmin();
  const rows = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <BlogsPageClient
      user={user}
      rows={rows.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        image: post.image,
        publishedAt: post.publishedAt.toISOString(),
        isPublished: post.isPublished,
      }))}
    />
  );
}

export default AdminBlogPage;
