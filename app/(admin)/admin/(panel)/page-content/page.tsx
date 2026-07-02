import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminHelpCallout } from '@/components/admin/AdminHelpCallout';
import { AdminNavCard } from '@/components/admin/AdminNavCard';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { requireAdmin } from '@/lib/auth/require-admin';
import {
  MARKETING_PAGE_CONTENT_INDEX_SLUGS,
  PAGE_CONTENT_DESCRIPTIONS,
  PAGE_CONTENT_TITLES,
} from '@/lib/types/page-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Page content', robots: { index: false, follow: false } };

async function AdminPageContentIndexPage() {
  const user = await requireAdmin();

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Marketing pages"
      title="Marketing pages"
      description="Donation, partnership, and contact page copy — text fields, images, and structured sections."
    >
      <AdminHelpCallout title="Looking for culture pages?">
        Culture portal copy, catalog labels, and heritage landings (Khndzoresk, museums) are under{' '}
        <strong>Culture → Culture page copy</strong>. Homepage and About hero images are under{' '}
        <strong>Site pages → Homepage</strong> and <strong>About page</strong>.
      </AdminHelpCallout>

      <AdminStagger as="ul" className="grid gap-4 sm:grid-cols-2">
        {MARKETING_PAGE_CONTENT_INDEX_SLUGS.map((slug) => (
          <li key={slug}>
            <AdminNavCard
              href={`/admin/page-content/${slug}`}
              title={PAGE_CONTENT_TITLES[slug]}
              description={PAGE_CONTENT_DESCRIPTIONS[slug]}
            />
          </li>
        ))}
      </AdminStagger>
    </AdminPageShell>
  );
}

export default AdminPageContentIndexPage;
