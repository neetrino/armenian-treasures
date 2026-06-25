import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CultureMenuForm } from '@/components/admin/CultureMenuForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit menu item',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function EditCultureMenuItemPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const [item, parents] = await Promise.all([
    prisma.cultureMenuItem.findUnique({ where: { id: params.id } }),
    prisma.cultureMenuItem.findMany({
      where: { parentId: null },
      orderBy: { order: 'asc' },
      select: { id: true, title: true },
    }),
  ]);
  if (!item) notFound();
  return (
    <>
      <AdminTopbar title="Edit menu item" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title={item.title} description={`Editing menu item with slug “${item.slug}”.`} />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <CultureMenuForm
            mode="edit"
            itemId={item.id}
            parents={parents}
            initial={{
              title: item.title,
              slug: item.slug,
              description: item.description ?? '',
              parentId: item.parentId ?? '',
              order: item.order,
              isActive: item.isActive,
              image: item.image ?? '',
              routeType: item.routeType,
              customUrl: item.customUrl ?? '',
              catalogContent: item.catalogContent,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default EditCultureMenuItemPage;
