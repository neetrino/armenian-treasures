import type { Metadata } from 'next';
import { TeamPageClient } from '@/components/admin/TeamPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Team', robots: { index: false, follow: false } };

async function AdminTeamPage() {
  const user = await requireAdmin();
  const rows = await prisma.teamMember.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] });
  return <TeamPageClient user={user} rows={rows} />;
}

export default AdminTeamPage;
