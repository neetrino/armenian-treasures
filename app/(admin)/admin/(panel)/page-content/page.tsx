import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminHelpCallout } from '@/components/admin/AdminHelpCallout';
import { AdminNavCard } from '@/components/admin/AdminNavCard';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { requireAdmin } from '@/lib/auth/require-admin';
import {
  PAGE_CONTENT_DESCRIPTIONS,
  PAGE_CONTENT_SLUGS,
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
      title="Marketing & landing pages"
      description="Each page opens a visual editor — text fields, image uploads, and structured sections. No JSON required."
    >
      <AdminHelpCallout title="Which page should I edit?">
        Use this section for standalone marketing pages (donations, partnership, museum landings). For the
        main homepage sections, use <strong>Site pages → Homepage</strong>. For culture catalog pages, use{' '}
        <strong>Culture → Culture page copy</strong>.
      </AdminHelpCallout>

      <AdminStagger as="ul" className="grid gap-4 sm:grid-cols-2">
        {PAGE_CONTENT_SLUGS.map((slug) => (
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
