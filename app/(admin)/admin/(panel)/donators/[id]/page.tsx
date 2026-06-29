import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
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
    <AdminPageShell
      user={user}
      topbarTitle="Edit donator"
      title={donator.name}
      description={donator.type}
      beforeHeader={<AdminBackLink href="/admin/donators" label="All donators" />}
    >
      <AdminPanelCard>
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
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default EditDonatorPage;
