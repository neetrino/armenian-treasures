import type { Metadata } from 'next';
import { DonatorsPageClient } from '@/components/admin/DonatorsPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Donators', robots: { index: false, follow: false } };

async function AdminDonatorsPage() {
  const user = await requireAdmin();
  const rows = await prisma.donator.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] });
  return <DonatorsPageClient user={user} rows={rows} />;
}

export default AdminDonatorsPage;
