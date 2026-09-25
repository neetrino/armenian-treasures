import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { CultureCatalogSectionForm } from '@/components/admin/CultureCatalogSectionForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import {
  catalogSectionEncodedFields,
  isCatalogSectionId,
  type CatalogSectionId,
} from '@/lib/admin/catalog-section-document';
import { findCultureMenuItemByPath } from '@/lib/admin/find-menu-by-path';
import { isCultureCatalogPagePath } from '@/lib/admin/culture-catalog-pages';

export const dynamic = 'force-dynamic';

const SECTION_TITLES: Record<CatalogSectionId, string> = {
  hero: 'Hero banner',
  about: 'About section',
  facts: 'Fact cards',
  entries: 'Grid section labels',
  map: 'Map section',
  stats: 'Stat bar labels',
};

interface PageProps {
  params: Promise<{ section: string; menuPath: string[] }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const title = isCatalogSectionId(params.section) ? SECTION_TITLES[params.section] : 'Section';
  return { title, robots: { index: false, follow: false } };
}

async function CultureCatalogSectionPage(props: PageProps) {
  const params = await props.params;
  if (!isCatalogSectionId(params.section)) notFound();
  const menuPath = params.menuPath.join('/');
  if (!isCultureCatalogPagePath(menuPath)) notFound();

  const user = await requireAdmin();
  const match = await findCultureMenuItemByPath(menuPath);
  if (!match) notFound();

  return (
    <AdminPageShell
      user={user}
      topbarTitle={SECTION_TITLES[params.section]}
      title={SECTION_TITLES[params.section]}
      description="Fill the copy in every language. Empty languages stay empty on the public site."
      beforeHeader={
        <AdminBackLink href={`/admin/culture-pages/${menuPath}`} label="Back to page layout" />
      }
    >
      <AdminPanelCard>
        <CultureCatalogSectionForm
          menuItemId={match.node.id}
          menuPath={menuPath}
          section={params.section}
          fields={catalogSectionEncodedFields(match.node.catalogContent, params.section)}
        />
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default CultureCatalogSectionPage;
