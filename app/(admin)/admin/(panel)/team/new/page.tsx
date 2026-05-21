import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { TeamMemberForm } from '@/components/admin/TeamMemberForm';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New team member', robots: { index: false, follow: false } };

async function NewTeamMemberPage() {
  const user = await requireAdmin();
  return (
    <>
      <AdminTopbar title="New team member" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title="Add a team member" />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <TeamMemberForm mode="create" />
        </div>
      </div>
    </>
  );
}

export default NewTeamMemberPage;
