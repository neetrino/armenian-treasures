import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminGroupCard } from '@/components/admin/AdminGroupCard';
import { AdminGroupLinkRow } from '@/components/admin/AdminGroupLinkRow';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { requireAdmin } from '@/lib/auth/require-admin';
import {
  CULTURE_CATALOG_PAGE_GROUPS,
  type CultureCatalogPageGroup,
  cultureCatalogPageAdminHref,
} from '@/lib/admin/culture-catalog-pages';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

function filterCatalogGroupsByAvailablePaths(
  groups: readonly CultureCatalogPageGroup[],
  availablePaths: ReadonlySet<string>,
): CultureCatalogPageGroup[] {
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => availablePaths.has(item.menuPath)),
    }))
    .filter((group) => group.items.length > 0);
}

async function AdminCulturePagesIndexPage() {
  const user = await requireAdmin();
  const activeMenuItems = await prisma.cultureMenuItem.findMany({
    where: { isActive: true },
    select: {
      slug: true,
      parentId: true,
      parent: { select: { slug: true } },
    },
  });
  const availablePaths = new Set(
    activeMenuItems.map((item) =>
      item.parent?.slug ? `${item.parent.slug}/${item.slug}` : item.slug,
    ),
  );
  const visibleCatalogGroups = filterCatalogGroupsByAvailablePaths(
    CULTURE_CATALOG_PAGE_GROUPS,
    availablePaths,
  );

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Culture pages"
      title="Culture portal pages"
      description="Edit catalog grid cards, hero text, and section content."
      size="wide"
    >
      <AdminStagger className="grid gap-6 xl:grid-cols-2">
        {visibleCatalogGroups.map((group) => (
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
