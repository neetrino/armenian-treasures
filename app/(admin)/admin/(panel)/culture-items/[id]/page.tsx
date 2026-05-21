import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CultureItemForm } from '@/components/admin/CultureItemForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit culture item', robots: { index: false, follow: false } };

interface PageProps { params: { id: string } }

async function EditCultureItemPage({ params }: PageProps) {
  const user = await requireAdmin();
  const [item, menu] = await Promise.all([
    prisma.cultureItem.findUnique({ where: { id: params.id } }),
    prisma.cultureMenuItem.findMany({
      orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
      include: { parent: true },
    }),
  ]);
  if (!item) notFound();
  const options = menu.map((m) => ({
    id: m.id,
    title: m.parent ? `${m.parent.title} / ${m.title}` : m.title,
  }));
  return (
    <>
      <AdminTopbar title="Edit culture item" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title={item.title} description={`Editing item with slug “${item.slug}”.`} />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <CultureItemForm
            mode="edit"
            itemId={item.id}
            menuOptions={options}
            initial={{
              title: item.title,
              slug: item.slug,
              description: item.description ?? '',
              shortDescription: item.shortDescription ?? '',
              menuItemId: item.menuItemId,
              region: item.region ?? '',
              locationName: item.locationName ?? '',
              periodLabel: item.periodLabel ?? '',
              century: item.century !== null ? String(item.century) : '',
              yearLabel: item.yearLabel ?? '',
              image: item.image ?? '',
              tourUrl: item.tourUrl ?? '',
              videoUrl: item.videoUrl ?? '',
              latitude: item.latitude !== null ? String(item.latitude) : '',
              longitude: item.longitude !== null ? String(item.longitude) : '',
              mapType: item.mapType ?? '',
              showOnMap: item.showOnMap,
              itemType: item.itemType,
              status: item.status,
              order: item.order,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default EditCultureItemPage;
