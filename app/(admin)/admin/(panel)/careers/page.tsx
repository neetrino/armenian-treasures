import type { Metadata } from 'next';
import { CareersPageClient } from '@/components/admin/CareersPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Careers', robots: { index: false, follow: false } };

async function AdminCareersPage() {
  const user = await requireAdmin();
  const rows = await prisma.career.findMany({ orderBy: [{ order: 'asc' }, { title: 'asc' }] });
  return <CareersPageClient user={user} rows={rows} />;
}

export default AdminCareersPage;
