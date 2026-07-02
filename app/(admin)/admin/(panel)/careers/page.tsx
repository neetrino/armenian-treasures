import type { Metadata } from 'next';
import { CareersPageClient } from '@/components/admin/CareersPageClient';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Careers', robots: { index: false, follow: false } };

async function AdminCareersPage() {
  const user = await requireAdmin();
  const rows = await prisma.career.findMany({ orderBy: [{ order: 'asc' }, { title: 'asc' }] });
  return (
    <CareersPageClient
      user={user}
      rows={rows.map((row) => ({
        ...row,
        title: getAdminLocaleValue(row.title),
        location: getAdminLocaleValue(row.location),
        employmentType: getAdminLocaleValue(row.employmentType),
        editInitial: {
          title: row.title,
          location: row.location,
          employmentType: row.employmentType,
          description: row.description ?? '',
          applyUrl: row.applyUrl ?? '',
          applyEmail: row.applyEmail ?? '',
          order: row.order,
          isActive: row.isActive,
        },
      }))}
    />
  );
}

export default AdminCareersPage;
