import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { BlogPostForm } from '@/components/admin/blog-editor/BlogPostForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Create blog post',
  robots: { index: false, follow: false },
};

async function CreateBlogPostPage() {
  const user = await requireAdmin();
  const categories = await prisma.blogCategory.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: { id: true, title: true },
  });

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Create post"
      title=""
      size="full"
      beforeHeader={<AdminBackLink href="/admin/blog" label="All blog posts" />}
    >
      <BlogPostForm
        mode="create"
        categories={categories.map((category) => ({
          id: category.id,
          title: getAdminLocaleValue(category.title),
        }))}
      />
    </AdminPageShell>
  );
}

export default CreateBlogPostPage;
