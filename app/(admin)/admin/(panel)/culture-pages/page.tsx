import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminGroupCard } from '@/components/admin/AdminGroupCard';
import { AdminGroupLinkRow } from '@/components/admin/AdminGroupLinkRow';
import { AdminNavCard } from '@/components/admin/AdminNavCard';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { requireAdmin } from '@/lib/auth/require-admin';
import {
  CULTURE_LANDING_PAGE_NAV,
  CULTURE_PORTAL_PAGE_NAV,
} from '@/lib/admin/culture-landing-pages';
import {
  CULTURE_CATALOG_PAGE_GROUPS,
  cultureCatalogPageAdminHref,
} from '@/lib/admin/culture-catalog-pages';

export const dynamic = 'force-dynamic';

async function AdminCulturePagesIndexPage() {
  const user = await requireAdmin();

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Culture pages"
      title="Culture portal pages"
      description="Edit catalog grid cards, hero text, about sections, and heritage landing pages."
      size="wide"
    >
      <AdminStagger as="section" className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-display text-xl text-ink">Culture portal landing</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Intro, map, donors, and newsletter on the main <code className="text-xs">/culture</code> page.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li>
              <AdminNavCard
                href={CULTURE_PORTAL_PAGE_NAV.adminHref}
                title={CULTURE_PORTAL_PAGE_NAV.label}
                description={CULTURE_PORTAL_PAGE_NAV.description}
                meta={CULTURE_PORTAL_PAGE_NAV.publicHref}
              />
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-display text-xl text-ink">Heritage landing pages</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Full-page museum and site stories — linked from catalog grid cards on History and Museums.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {CULTURE_LANDING_PAGE_NAV.map((item) => (
              <li key={item.slug}>
                <AdminNavCard
                  href={item.adminHref}
                  title={item.label}
                  description={item.description}
                  meta={item.publicHref}
                />
              </li>
            ))}
          </ul>
        </div>
      </AdminStagger>

      <AdminStagger className="grid gap-6 xl:grid-cols-2">
        {CULTURE_CATALOG_PAGE_GROUPS.map((group) => (
          <AdminGroupCard key={group.heading} title={group.heading}>
            <ul className="flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={`${item.menuPath}-${item.label}`}>
                  <AdminGroupLinkRow
                    href={cultureCatalogPageAdminHref(item.menuPath)}
                    label={item.label}
                    meta={item.publicHref}
                  />
                </li>
              ))}
            </ul>
          </AdminGroupCard>
        ))}
      </AdminStagger>
    </AdminPageShell>
  );
}

export default AdminCulturePagesIndexPage;
