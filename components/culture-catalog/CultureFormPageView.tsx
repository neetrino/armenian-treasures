import type { ReactNode } from 'react';
import { CultureCatalogLandingHero } from '@/components/culture-catalog/CultureCatalogLandingHero';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import { toLandingBreadcrumbSegments } from '@/components/culture-catalog/CulturePortalLandingBreadcrumb';
import { resolveCultureCatalogFormContent } from '@/lib/constants/culture-catalog-content';
import type { MenuNode } from '@/lib/culture-menu';

interface CultureFormPageViewProps {
  kind: 'submit' | 'new-subcatalog';
  title: string;
  description: string;
  category?: MenuNode;
  breadcrumb: { label: string; href?: string }[];
  form: ReactNode;
  aside: ReactNode;
}

export function CultureFormPageView({
  kind,
  title,
  description,
  category,
  breadcrumb,
  form,
  aside,
}: CultureFormPageViewProps) {
  const content = resolveCultureCatalogFormContent(kind, category);

  return (
    <CultureCatalogShell>
      <CultureCatalogLandingHero
        title={title}
        eyebrow={content.eyebrow}
        accent={content.accent}
        slogan={content.slogan}
        description={description}
        breadcrumb={toLandingBreadcrumbSegments(breadcrumb)}
        showScroll={false}
        ctas={[{ label: 'Go to form', href: '#form', variant: 'gold' }]}
      />
      <div id="form" className="catalog-form-section">
        <div className="catalog-form-panel reveal">{form}</div>
        <aside className="catalog-form-aside reveal">{aside}</aside>
      </div>
    </CultureCatalogShell>
  );
}
