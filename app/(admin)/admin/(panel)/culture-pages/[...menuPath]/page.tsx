import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { CultureCatalogPageForm } from '@/components/admin/CultureCatalogPageForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { CultureCatalogEntryAdmin } from '@/lib/admin/culture-catalog-entry';
import {
  findCultureCatalogNavItem,
  isCultureCatalogPagePath,
} from '@/lib/admin/culture-catalog-pages';
import { findCultureMenuItemByPath } from '@/lib/admin/find-menu-by-path';
import { resolveCultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import { resolveMenuHref } from '@/lib/culture-menu';
import { prisma } from '@/lib/db';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ menuPath: string[] }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const menuPath = params.menuPath.join('/');
  const navItem = findCultureCatalogNavItem(menuPath);
  return {
    title: navItem ? `${navItem.label} — Culture page` : 'Culture page',
    robots: { index: false, follow: false },
  };
}

async function AdminCultureCatalogPageEditPage(props: PageProps) {
  const params = await props.params;
  const menuPath = params.menuPath.join('/');

  if (!isCultureCatalogPagePath(menuPath)) notFound();

  const user = await requireAdmin();
  const match = await findCultureMenuItemByPath(menuPath);
  if (!match) notFound();

  const navItem = findCultureCatalogNavItem(menuPath);
  const resolvedContent = resolveCultureCatalogContent(match.node, match.parent);
  const publicHref = navItem?.publicHref ?? resolveMenuHref(match.node, match.parent);
  const formKey =
    match.node.catalogContent != null
      ? JSON.stringify(match.node.catalogContent)
      : `default-${menuPath}`;

  const managesGridCards = match.node.routeType === 'SUBCATEGORY';

  const [entryRows, subcategoryRows] = await Promise.all([
    managesGridCards
      ? prisma.cultureItem.findMany({
          where: { menuItemId: match.node.id },
          orderBy: [{ order: 'asc' }, { title: 'asc' }],
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            region: true,
            periodLabel: true,
            image: true,
            tourUrl: true,
            order: true,
            status: true,
          },
        })
      : Promise.resolve([]),
    match.node.routeType === 'CATEGORY'
      ? prisma.cultureMenuItem.findMany({
          where: { parentId: match.node.id, routeType: 'SUBCATEGORY' },
          orderBy: { order: 'asc' },
          select: { slug: true, title: true },
        })
      : Promise.resolve([]),
  ]);

  const entries: CultureCatalogEntryAdmin[] = entryRows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: getAdminLocaleValue(row.title),
    description: getAdminLocaleValue(row.description),
    region: getAdminLocaleValue(row.region),
    periodLabel: getAdminLocaleValue(row.periodLabel),
    image: row.image ?? '',
    tourUrl: row.tourUrl ?? '',
    order: row.order,
    status: row.status,
  }));

  const subpageLinks = subcategoryRows.map((row) => ({
    menuPath: `${match.node.slug}/${row.slug}`,
    label: getAdminLocaleValue(row.title),
  }));

  return (
    <AdminPageShell
      user={user}
      topbarTitle={navItem?.label ?? match.node.title}
      title={navItem?.label ?? match.node.title}
      description={
        managesGridCards
          ? `Edit grid cards (photos & text) and page layout for ${publicHref}.`
          : `Manage hero, about, and section labels for ${publicHref}.`
      }
      size="wide"
      beforeHeader={<AdminBackLink href="/admin/culture-pages" label="All culture pages" />}
    >
      <AdminPanelCard padding="lg">
        <CultureCatalogPageForm
          key={`${formKey}-${entries.map((e) => e.id).join(',')}`}
          menuItemId={match.node.id}
          menuPath={menuPath}
          pageLabel={navItem?.label ?? match.node.title}
          publicHref={publicHref}
          resolvedContent={resolvedContent}
          catalogContent={match.node.catalogContent}
          entries={entries}
          subpageLinks={subpageLinks}
          managesGridCards={managesGridCards}
        />
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default AdminCultureCatalogPageEditPage;
