import type { Metadata } from 'next';
import { ProjectsPageClient } from '@/components/admin/ProjectsPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Projects', robots: { index: false, follow: false } };

async function AdminProjectsPage() {
  const user = await requireAdmin();
  const projects = await prisma.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
  const rows = projects.map((project) => ({
    id: project.id,
    title: project.title,
    category: project.category,
    region: project.region,
    status: project.status,
    goalAmount: project.goalAmount,
    raisedAmount: project.raisedAmount,
    editInitial: {
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
    },
  }));
  return <ProjectsPageClient user={user} rows={rows} />;
}

export default AdminProjectsPage;
