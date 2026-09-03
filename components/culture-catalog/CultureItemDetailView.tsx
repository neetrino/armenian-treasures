import Link from 'next/link';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';
import { CultureCatalogLandingHero } from '@/components/culture-catalog/CultureCatalogLandingHero';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import { toLandingBreadcrumbSegments } from '@/components/culture-catalog/CulturePortalLandingBreadcrumb';
import { CultureItemMediaSections } from '@/components/culture-catalog/CultureItemMediaSections';
import { hasTrimmedText } from '@/lib/landing/landing-section-utils';
import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';
import type { PublicCultureItemDetailDTO } from '@/lib/dto';

interface CultureItemDetailViewProps {
  item: PublicCultureItemDetailDTO;
}

function formatEnumLabel(value: string): string {
  return value
    .split('_')
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(' ');
}

export function CultureItemDetailView({ item }: CultureItemDetailViewProps) {
  const menu = item.menuItem;
  const parent = menu?.parent ?? null;
  const description = item.shortDescription ?? item.description ?? '';
  const heroImage = item.coverImage?.trim() || undefined;

  const breadcrumb = parent && menu
    ? [
        { label: parent.title, href: `/culture/${parent.slug}` },
        { label: menu.title, href: `/culture/${parent.slug}/${menu.slug}` },
        { label: item.title },
      ]
    : menu
      ? [{ label: menu.title, href: `/culture/${menu.slug}` }, { label: item.title }]
      : [{ label: item.title }];

  const stats = [
    item.region ? { value: item.region, label: 'Region' } : null,
    item.periodLabel ? { value: item.periodLabel, label: 'Period' } : null,
    { value: formatEnumLabel(item.itemType), label: 'Type' },
  ].filter((stat): stat is { value: string; label: string } => stat !== null);

  const backHref = parent && menu
    ? `/culture/${parent.slug}/${menu.slug}`
    : menu
      ? `/culture/${menu.slug}`
      : '/culture';

  return (
    <CultureCatalogShell>
      <CultureCatalogLandingHero
        title={item.title}
        eyebrow={
          parent
            ? `✦ ${parent.title} · ${menu?.title} · Armenia ✦`
            : `✦ ${menu?.title ?? 'Culture Portal'} · Armenia ✦`
        }
        accent={item.periodLabel ?? item.region ?? 'Heritage Entry'}
        slogan={
          item.region
            ? `${item.region}${item.yearLabel ? ` · ${item.yearLabel}` : ''}`
            : 'Armenian cultural archive'
        }
        description={hasTrimmedText(description) ? description : 'Curated entry from the Armenian cultural archive.'}
        heroImage={heroImage}
        breadcrumb={toLandingBreadcrumbSegments(breadcrumb)}
        ctas={[
          { label: 'View Details', href: '#detail', variant: 'gold' },
          ...(item.tourUrl ? [{ label: '3D Tour', href: '#tour', variant: 'teal' as const }] : []),
          { label: 'Back to catalog', href: backHref, variant: 'outline' },
        ]}
      />
      {stats.length > 0 ? <CulturalPortalStatsBar stats={stats} /> : null}
      <LandingSectionStack>
        <section id="detail" className="catalog-detail-section">
          <CultureItemMediaSections
            title={item.title}
            media={item.media}
            locationName={item.locationName}
            showOnMap={item.showOnMap}
            mapUrl={item.mapUrl}
          />
        </section>
        <div className="catalog-submit-cta reveal">
          <p>Explore more entries in this catalog.</p>
          <Link href={backHref} className="btn-outline">
            Back to {menu?.title ?? 'Culture Portal'}
          </Link>
        </div>
      </LandingSectionStack>
    </CultureCatalogShell>
  );
}
