import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit project', robots: { index: false, follow: false } };

interface PageProps { params: { id: string } }

async function EditProjectPage({ params }: PageProps) {
  const user = await requireAdmin();
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) notFound();
  return (
    <>
      <AdminTopbar title="Edit project" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title={project.title} description={`Editing project with slug “${project.slug}”.`} />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
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
        </div>
      </div>
    </>
  );
}

export default EditProjectPage;
