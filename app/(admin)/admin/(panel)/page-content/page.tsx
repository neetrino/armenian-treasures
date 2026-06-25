import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { requireAdmin } from '@/lib/auth/require-admin';
import { PAGE_CONTENT_SLUGS, PAGE_CONTENT_TITLES } from '@/lib/types/page-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Page content', robots: { index: false, follow: false } };

async function AdminPageContentIndexPage() {
  const user = await requireAdmin();
  return (
    <>
      <AdminTopbar title="Page content" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Marketing pages"
          description="Edit donation, partnership, cultural portal, and landing page content stored in the database."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {PAGE_CONTENT_SLUGS.map((slug) => (
            <li key={slug}>
              <Link
                href={`/admin/page-content/${slug}`}
                className="block rounded-2xl border border-stone-100 bg-white p-5 shadow-card transition hover:border-bronze-300 hover:shadow-md"
              >
                <p className="font-display text-lg text-ink">{PAGE_CONTENT_TITLES[slug]}</p>
                <p className="mt-1 text-sm text-ink-muted">{slug}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AdminPageContentIndexPage;
