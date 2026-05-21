import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CareerForm } from '@/components/admin/CareerForm';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New role', robots: { index: false, follow: false } };

async function NewCareerPage() {
  const user = await requireAdmin();
  return (
    <>
      <AdminTopbar title="New role" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title="Add an open role" />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <CareerForm mode="create" />
        </div>
      </div>
    </>
  );
}

export default NewCareerPage;
