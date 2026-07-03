import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminHelpCallout } from '@/components/admin/AdminHelpCallout';
import { AdminNavCard } from '@/components/admin/AdminNavCard';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { ADMIN_PAGES_STATIC_ENTRIES } from '@/lib/admin/admin-pages-index';
import { requireAdmin } from '@/lib/auth/require-admin';
import {
  MARKETING_PAGE_CONTENT_INDEX_SLUGS,
  PAGE_CONTENT_DESCRIPTIONS,
  PAGE_CONTENT_TITLES,
} from '@/lib/types/page-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Pages', robots: { index: false, follow: false } };

async function AdminPageContentIndexPage() {
  const user = await requireAdmin();

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Pages"
      title="Pages"
      description="About, team, donation, partnership, and contact page copy — text fields, images, and structured sections."
    >
      <AdminHelpCallout title="Looking for culture pages?">
        Culture portal copy, catalog labels, and heritage landings (Khndzoresk, museums) are under{' '}
        <strong>Culture → Culture Portal</strong>. Homepage sections and hero are under{' '}
        <strong>Site pages → Homepage</strong>.
      </AdminHelpCallout>

      <AdminStagger as="ul" className="grid gap-4 sm:grid-cols-2">
        {ADMIN_PAGES_STATIC_ENTRIES.map((entry) => (
          <li key={entry.href}>
            <AdminNavCard href={entry.href} title={entry.title} description={entry.description} />
          </li>
        ))}
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
