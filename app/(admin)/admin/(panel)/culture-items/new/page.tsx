import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CultureItemForm } from '@/components/admin/CultureItemForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New culture item', robots: { index: false, follow: false } };

async function NewCultureItemPage() {
  const user = await requireAdmin();
  const menu = await prisma.cultureMenuItem.findMany({
    orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
    include: { parent: true },
  });
  const options = menu.map((m) => ({
    id: m.id,
    title: m.parent ? `${m.parent.title} / ${m.title}` : m.title,
  }));
  return (
    <>
      <AdminTopbar title="New culture item" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title="Create a culture item" />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <CultureItemForm mode="create" menuOptions={options} />
        </div>
      </div>
    </>
  );
}

export default NewCultureItemPage;
