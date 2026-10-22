import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New project', robots: { index: false, follow: false } };

async function NewProjectPage() {
  const user = await requireAdmin();
  return (
    <AdminPageShell
      user={user}
      topbarTitle="New project"
      title="New project"
      description="Add an upcoming or active fundraising project."
      beforeHeader={<AdminBackLink href="/admin/projects" label="All projects" />}
    >
      <AdminPanelCard>
        <ProjectForm mode="create" />
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default NewProjectPage;
