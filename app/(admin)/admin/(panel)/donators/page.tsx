import type { Metadata } from 'next';
import { DonatorsPageClient } from '@/components/admin/DonatorsPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Donators', robots: { index: false, follow: false } };

async function AdminDonatorsPage() {
  const user = await requireAdmin();
  const rows = await prisma.donator.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] });
  return (
    <DonatorsPageClient
      user={user}
      rows={rows.map((row) => ({
        ...row,
        name: getAdminLocaleValue(row.name),
        type: getAdminLocaleValue(row.type),
        editInitial: {
          name: row.name,
          type: row.type,
          year: row.year,
          description: row.description ?? '',
          order: row.order,
          isPublic: row.isPublic,
        },
      }))}
    />
  );
}

export default AdminDonatorsPage;
