import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { DonatorForm } from '@/components/admin/DonatorForm';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New donator', robots: { index: false, follow: false } };

async function NewDonatorPage() {
  const user = await requireAdmin();
  return (
    <>
      <AdminTopbar title="New donator" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title="Add a donator" />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <DonatorForm mode="create" />
        </div>
      </div>
    </>
  );
}

export default NewDonatorPage;
