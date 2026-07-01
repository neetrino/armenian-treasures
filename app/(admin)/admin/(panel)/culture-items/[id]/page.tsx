import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { CultureItemForm } from '@/components/admin/CultureItemForm';
import { ButtonLink } from '@/components/ui/Button';
import { requireAdmin } from '@/lib/auth/require-admin';
import { toCultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

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
    title: m.parent
      ? `${getAdminLocaleValue(m.parent.title)} / ${getAdminLocaleValue(m.title)}`
      : getAdminLocaleValue(m.title),
  }));
  return (
    <AdminPageShell
      user={user}
      topbarTitle="Edit culture item"
      title={getAdminLocaleValue(item.title)}
      description={`Editing item with slug “${item.slug}”.`}
      beforeHeader={<AdminBackLink href="/admin/culture-items" label="All culture items" />}
      actions={
        item.status === 'PUBLISHED' ? (
          <ButtonLink href={resolveCultureItemHref(item.slug)} variant="secondary" external>
            View public page
          </ButtonLink>
        ) : null
      }
    >
      <AdminPanelCard>
        <CultureItemForm
          mode="edit"
          itemId={item.id}
          menuOptions={options}
          initial={toCultureItemFormInitial(item)}
        />
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default EditCultureItemPage;
