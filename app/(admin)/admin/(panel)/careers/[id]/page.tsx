import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
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
    <>
      <AdminTopbar title="Edit role" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title={career.title} description={`${career.location} · ${career.employmentType}`} />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
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
        </div>
      </div>
    </>
  );
}

export default EditCareerPage;
