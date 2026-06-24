import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { TeamMemberForm } from '@/components/admin/TeamMemberForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit team member', robots: { index: false, follow: false } };

interface PageProps { params: Promise<{ id: string }> }

async function EditTeamMemberPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const member = await prisma.teamMember.findUnique({ where: { id: params.id } });
  if (!member) notFound();
  return (
    <>
      <AdminTopbar title="Edit team member" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader title={member.name} description={member.position} />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <TeamMemberForm
            mode="edit"
            itemId={member.id}
            initial={{
              name: member.name,
              initials: member.initials,
              position: member.position,
              bio: member.bio ?? '',
              image: member.image ?? '',
              order: member.order,
              isActive: member.isActive,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default EditTeamMemberPage;
