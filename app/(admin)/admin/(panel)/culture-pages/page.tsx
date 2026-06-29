import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminGroupCard } from '@/components/admin/AdminGroupCard';
import { AdminGroupLinkRow } from '@/components/admin/AdminGroupLinkRow';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { requireAdmin } from '@/lib/auth/require-admin';
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
      description="Edit hero text, about sections, gallery labels, and map copy for each culture mega-menu page."
      size="wide"
    >
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
