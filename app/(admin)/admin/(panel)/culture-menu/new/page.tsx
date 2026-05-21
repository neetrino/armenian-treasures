import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CultureMenuForm } from '@/components/admin/CultureMenuForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'New menu item',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: { parentId?: string };
}

async function NewCultureMenuItemPage({ searchParams }: PageProps) {
  const user = await requireAdmin();
  const parents = await prisma.cultureMenuItem.findMany({
    orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
    select: { id: true, title: true, parentId: true },
  });
  const parentOptions = parents
    .filter((p) => p.parentId === null)
    .map((p) => ({ id: p.id, title: p.title }));
  return (
    <>
      <AdminTopbar title="New menu item" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Create a menu item"
          description="Add a new entry to the Culture Portal menu. Top-level items become categories; child items appear inside their parent."
        />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <CultureMenuForm
            mode="create"
            parents={parentOptions}
            defaultParentId={searchParams.parentId}
          />
        </div>
      </div>
    </>
  );
}

export default NewCultureMenuItemPage;
