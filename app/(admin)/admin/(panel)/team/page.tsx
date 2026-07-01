import type { Metadata } from 'next';
import { TeamPageClient } from '@/components/admin/TeamPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Team', robots: { index: false, follow: false } };

async function AdminTeamPage() {
  const user = await requireAdmin();
  const rows = await prisma.teamMember.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] });
  return (
    <TeamPageClient
      user={user}
      rows={rows.map((row) => ({
        ...row,
        name: getAdminLocaleValue(row.name),
        position: getAdminLocaleValue(row.position),
      }))}
    />
  );
}

export default AdminTeamPage;
