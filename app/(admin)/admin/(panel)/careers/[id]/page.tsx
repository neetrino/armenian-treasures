import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { CareerForm } from '@/components/admin/CareerForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit role', robots: { index: false, follow: false } };

interface PageProps { params: Promise<{ id: string }> }

async function EditCareerPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const career = await prisma.career.findUnique({ where: { id: params.id } });
  if (!career) notFound();
  return (
    <AdminPageShell
      user={user}
      topbarTitle="Edit role"
      title={career.title}
      description={`${career.location} · ${career.employmentType}`}
      beforeHeader={<AdminBackLink href="/admin/careers" label="All careers" />}
    >
      <AdminPanelCard>
        <CareerForm
          mode="edit"
          itemId={career.id}
          initial={{
            title: career.title,
            location: career.location,
            employmentType: career.employmentType,
            description: career.description ?? '',
            applyUrl: career.applyUrl ?? '',
            applyEmail: career.applyEmail ?? '',
            order: career.order,
            isActive: career.isActive,
          }}
        />
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default EditCareerPage;
