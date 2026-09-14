import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { BlogCategoryForm } from '@/components/admin/blog-editor/BlogCategoryForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Edit blog category',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function EditBlogCategoryPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const item = await prisma.blogCategory.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Edit category"
      title=""
      size="full"
      beforeHeader={<AdminBackLink href="/admin/blog/categories" label="All categories" />}
    >
      <BlogCategoryForm
        mode="edit"
        itemId={item.id}
        initial={{
          title: item.title,
          slug: item.slug,
          order: item.order,
        }}
      />
    </AdminPageShell>
  );
}

export default EditBlogCategoryPage;
