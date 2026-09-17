import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { BlogCategoryForm } from '@/components/admin/blog-editor/BlogCategoryForm';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Create blog category',
  robots: { index: false, follow: false },
};

async function CreateBlogCategoryPage() {
  const user = await requireAdmin();

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Create category"
      title=""
      size="full"
      beforeHeader={<AdminBackLink href="/admin/blog/categories" label="All categories" />}
    >
      <BlogCategoryForm mode="create" />
    </AdminPageShell>
  );
}

export default CreateBlogCategoryPage;
