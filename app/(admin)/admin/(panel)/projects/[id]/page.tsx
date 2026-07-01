import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit project', robots: { index: false, follow: false } };

interface PageProps { params: Promise<{ id: string }> }

async function EditProjectPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) notFound();
  return (
    <AdminPageShell
      user={user}
      topbarTitle="Edit project"
      title={getAdminLocaleValue(project.title)}
      description={`Editing project with slug “${project.slug}”.`}
      beforeHeader={<AdminBackLink href="/admin/projects" label="All projects" />}
    >
      <AdminPanelCard>
        <ProjectForm
          mode="edit"
          itemId={project.id}
          initial={{
            title: project.title,
            slug: project.slug,
            category: project.category,
            region: project.region ?? '',
            description: project.description ?? '',
            image: project.image ?? '',
            goalAmount: project.goalAmount,
            raisedAmount: project.raisedAmount,
            status: project.status,
            order: project.order,
            isPublished: project.isPublished,
          }}
        />
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default EditProjectPage;
