import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { CultureMenuForm } from '@/components/admin/CultureMenuForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

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
      select: { id: true, title: true, slug: true },
    }),
  ]);
  if (!item) notFound();

  const parentRow = item.parentId
    ? await prisma.cultureMenuItem.findUnique({
        where: { id: item.parentId },
        select: { slug: true },
      })
    : null;
  const catalogPagePath =
    item.routeType === 'CATEGORY' || item.routeType === 'SUBCATEGORY'
      ? parentRow
        ? `${parentRow.slug}/${item.slug}`
        : item.slug
      : undefined;

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Edit menu item"
      title={getAdminLocaleValue(item.title)}
      description={`Editing menu item with slug “${item.slug}”.`}
      beforeHeader={<AdminBackLink href="/admin/culture-menu" label="Menu structure" />}
    >
      <AdminPanelCard>
        <CultureMenuForm
          mode="edit"
          itemId={item.id}
          catalogPagePath={catalogPagePath}
          parents={parents.map((parent) => ({ ...parent, title: getAdminLocaleValue(parent.title) }))}
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
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default EditCultureMenuItemPage;
