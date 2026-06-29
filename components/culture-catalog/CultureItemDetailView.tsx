import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, MapPin, Play } from 'lucide-react';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';
import { CultureCatalogHero } from '@/components/culture-catalog/CultureCatalogHero';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import { isMatterportUrl } from '@/lib/matterport';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
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

function DetailFact({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="fact-card reveal">
      <div className="fact-label">{label}</div>
      <div className="fact-value">{value}</div>
    </div>
  );
}

export function CultureItemDetailView({ item }: CultureItemDetailViewProps) {
  const menu = item.menuItem;
  const parent = menu?.parent ?? null;
  const gallery = item.galleryImages.filter((src) => src.trim().length > 0);
  const hasCoords = item.latitude !== null && item.longitude !== null;
  const description = item.shortDescription ?? item.description ?? 'Curated entry from the Armenian cultural archive.';

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
    { value: item.region ?? '—', label: 'Region' },
    { value: item.periodLabel ?? '—', label: 'Period' },
    { value: formatEnumLabel(item.itemType), label: 'Type' },
    { value: item.tourUrl ? 'Yes' : '—', label: '3D Tour' },
  ];

  const backHref = parent && menu
    ? `/culture/${parent.slug}/${menu.slug}`
    : menu
      ? `/culture/${menu.slug}`
      : '/culture';

  return (
    <CultureCatalogShell>
      <CultureCatalogHero
        title={item.title}
        eyebrow={parent ? `✦ ${parent.title} · ${menu?.title} · Armenia ✦` : `✦ ${menu?.title ?? 'Culture Portal'} · Armenia ✦`}
        accent={item.periodLabel ?? item.region ?? 'Heritage Entry'}
        slogan={item.region ? `${item.region}${item.yearLabel ? ` · ${item.yearLabel}` : ''}` : 'Armenian cultural archive'}
        description={description}
        heroImage={item.image?.trim() || undefined}
        breadcrumb={breadcrumb}
        ctas={[
          { label: 'View Details', href: '#detail', variant: 'gold' },
          ...(item.tourUrl ? [{ label: '3D Tour', href: '#tour', variant: 'teal' as const }] : []),
          { label: 'Back to catalog', href: backHref, variant: 'outline' },
        ]}
      />
      <CulturalPortalStatsBar stats={stats} />
      <section id="detail">
        <p className="sec-label">Entry Detail</p>
        <h2 className="sec-title">{item.title}</h2>
        <div className="catalog-detail-grid">
          <div className="catalog-detail-main">
            <div className="catalog-detail-card reveal">
              <div className="catalog-detail-card__media">
                <Image
                  src={item.image ? resolvePublicAssetUrl(item.image) : resolvePublicAssetUrl('/images/placeholder.svg')}
                  alt={item.title}
                  width={1200}
                  height={750}
                  priority
                />
                {item.tourUrl ? (
                  <span className="catalog-item-card__badge" style={{ top: 16, left: 16 }}>
                    <Box size={11} aria-hidden /> 3D Tour
                  </span>
                ) : null}
              </div>
              {item.description ? (
                <div className="catalog-detail-card__body">
                  <p>{item.description}</p>
                </div>
              ) : null}
            </div>

            {item.tourUrl ? (
              <div id="tour" className="catalog-detail-card reveal">
                <div className="catalog-detail-card__body">
                  <h2>{isMatterportUrl(item.tourUrl) ? 'Matterport 3D Tour' : '3D Tour'}</h2>
                  {isMatterportUrl(item.tourUrl) ? (
                    <iframe
                      src={item.tourUrl}
                      title={`${item.title} 3D Tour`}
                      className="catalog-tour-embed"
                      allow="fullscreen; xr-spatial-tracking"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : null}
                  <div className="catalog-detail-actions">
                    <a href={item.tourUrl} className="btn-teal" target="_blank" rel="noopener noreferrer">
                      Open 3D Tour
                    </a>
                  </div>
                </div>
              </div>
            ) : null}

            {gallery.length > 0 ? (
              <div className="catalog-detail-card reveal">
                <div className="catalog-detail-card__body">
                  <h2>Gallery</h2>
                  <div className="catalog-gallery-grid">
                    {gallery.map((src, index) => (
                      <div key={src} className="catalog-gallery-item">
                        <Image
                          src={resolvePublicAssetUrl(src)}
                          alt={`${item.title} — gallery image ${index + 1}`}
                          width={600}
                          height={450}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="catalog-detail-aside">
            <DetailFact label="Type" value={formatEnumLabel(item.itemType)} />
            {item.region ? (
              <DetailFact
                label="Region"
                value={
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} aria-hidden /> {item.region}
                  </span>
                }
              />
            ) : null}
            {item.locationName ? <DetailFact label="Location" value={item.locationName} /> : null}
            {item.periodLabel ? <DetailFact label="Period" value={item.periodLabel} /> : null}
            {item.century !== null ? <DetailFact label="Century" value={String(item.century)} /> : null}
            {item.yearLabel ? <DetailFact label="Year" value={item.yearLabel} /> : null}
            {item.mapType ? <DetailFact label="Map category" value={formatEnumLabel(item.mapType)} /> : null}
            {hasCoords ? (
              <DetailFact
                label="Coordinates"
                value={`${item.latitude!.toFixed(4)}, ${item.longitude!.toFixed(4)}`}
              />
            ) : null}
            {item.showOnMap && hasCoords ? (
              <Link href="/#map" className="btn-outline reveal" style={{ textAlign: 'center', marginTop: 2 }}>
                View on heritage map
              </Link>
            ) : null}
            {item.videoUrl ? (
              <a href={item.videoUrl} className="btn-gold reveal" target="_blank" rel="noopener noreferrer">
                <Play size={12} aria-hidden /> Watch video
              </a>
            ) : null}
          </aside>
        </div>
      </section>
      <KhndzoreskDivider />
      <div className="catalog-submit-cta reveal" style={{ maxWidth: 1300, margin: '0 auto 80px', padding: '0 48px' }}>
        <p>Explore more entries in this catalog.</p>
        <Link href={backHref} className="btn-outline">
          Back to {menu?.title ?? 'Culture Portal'}
        </Link>
      </div>
    </CultureCatalogShell>
  );
}
