import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
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
    <AdminPageShell
      user={user}
      topbarTitle="Edit team member"
      title={member.name}
      description={member.position}
      beforeHeader={<AdminBackLink href="/admin/team" label="All team members" />}
    >
      <AdminPanelCard>
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
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default EditTeamMemberPage;
