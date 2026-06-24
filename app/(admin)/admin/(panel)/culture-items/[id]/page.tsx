import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CultureItemForm } from '@/components/admin/CultureItemForm';
import { ButtonLink } from '@/components/ui/Button';
import { requireAdmin } from '@/lib/auth/require-admin';
import { toCultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit culture item', robots: { index: false, follow: false } };

interface PageProps { params: Promise<{ id: string }> }

async function EditCultureItemPage(props: PageProps) {
  const params = await props.params;
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
        <AdminPageHeader
          title={item.title}
          description={`Editing item with slug “${item.slug}”.`}
          actions={
            item.status === 'PUBLISHED' ? (
              <ButtonLink href={resolveCultureItemHref(item.slug)} variant="secondary" external>
                View public page
              </ButtonLink>
            ) : null
          }
        />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <CultureItemForm
            mode="edit"
            itemId={item.id}
            menuOptions={options}
            initial={toCultureItemFormInitial(item)}
          />
        </div>
      </div>
    </>
  );
}

export default EditCultureItemPage;
