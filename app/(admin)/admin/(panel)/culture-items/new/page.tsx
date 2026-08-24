import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { CultureItemCreateForm } from '@/components/admin/CultureItemCreateForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Create culture item',
  robots: { index: false, follow: false },
};

async function CreateCultureItemPage() {
  const user = await requireAdmin();
  const menu = await prisma.cultureMenuItem.findMany({
    orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
    include: { parent: true },
  });
  const options = menu.map((m) => ({
    id: m.id,
    title: m.parent
      ? `${getAdminLocaleValue(m.parent.title)} / ${getAdminLocaleValue(m.title)}`
      : getAdminLocaleValue(m.title),
  }));

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Create culture item"
      title=""
      size="full"
      beforeHeader={<AdminBackLink href="/admin/culture-items" label="All culture items" />}
    >
      <CultureItemCreateForm menuOptions={options} />
    </AdminPageShell>
  );
}

export default CreateCultureItemPage;
