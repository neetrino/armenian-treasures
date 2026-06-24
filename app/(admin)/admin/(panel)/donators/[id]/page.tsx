import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { DonatorForm } from '@/components/admin/DonatorForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit donator', robots: { index: false, follow: false } };

interface PageProps { params: Promise<{ id: string }> }

async function EditDonatorPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const donator = await prisma.donator.findUnique({ where: { id: params.id } });
  if (!donator) notFound();
  return (
    <>
      <AdminTopbar title="Edit donator" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title={donator.name} description={donator.type} />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <DonatorForm
            mode="edit"
            itemId={donator.id}
            initial={{
              name: donator.name,
              type: donator.type,
              year: donator.year,
              description: donator.description ?? '',
              order: donator.order,
              isPublic: donator.isPublic,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default EditDonatorPage;
