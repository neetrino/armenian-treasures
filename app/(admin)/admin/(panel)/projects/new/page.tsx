import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New project', robots: { index: false, follow: false } };

async function NewProjectPage() {
  const user = await requireAdmin();
  return (
    <>
      <AdminTopbar title="New project" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title="Create a project" />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <ProjectForm mode="create" />
        </div>
      </div>
    </>
  );
}

export default NewProjectPage;
