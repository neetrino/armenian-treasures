import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { TeamMemberForm } from '@/components/admin/TeamMemberForm';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Create team member', robots: { index: false, follow: false } };

async function NewTeamMemberPage() {
  const user = await requireAdmin();
  return (
    <AdminPageShell
      user={user}
      topbarTitle="Create team member"
      title="Create team member"
      description="Add a person shown on the public /about/team page."
      beforeHeader={<AdminBackLink href="/admin/team" label="All team members" />}
    >
      <AdminPanelCard>
        <TeamMemberForm mode="create" />
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default NewTeamMemberPage;
