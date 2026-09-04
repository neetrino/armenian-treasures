import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPanel } from '@/components/map/MapPanel';
import { getMapItems } from '@/lib/queries/culture-items';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage, uiMessageFormat } from '@/lib/i18n/ui-messages';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicPageMetadata({
    title: 'Heritage Map — Armenian Treasures',
    description:
      'Explore Armenian monasteries, fortresses, museums and archaeological sites on an interactive heritage map.',
    pathname: '/map',
  });
}

async function HeritageMapPage() {
  const [items, locale] = await Promise.all([getMapItems(), getCurrentSiteLocale()]);
  const publishedCount = items.length;
  const portalLabel = uiMessage(locale, 'culturalPortal');

  return (
    <div className="relative isolate overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-0 bg-heritage-radial opacity-[var(--surface-radial-opacity)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-hero-diamond-grid opacity-[var(--surface-grid-opacity)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-3 pb-12 pt-6 sm:px-4 sm:pb-16 sm:pt-8">
        <header className="mb-8 max-w-[43.75rem] text-left">
          <p className="mb-[14px] font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
            {uiMessage(locale, 'heritageMap')}
          </p>
          <h1 className="mb-[18px] font-cinzel text-[clamp(2.125rem,3vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-heritage-gold">
            {uiMessage(locale, 'exploreSacredGeography')}
          </h1>
          <p className="max-w-[41.25rem] font-display text-[clamp(0.9375rem,1vw,1.125rem)] italic leading-[1.55] text-surface-muted">
            {publishedCount > 0
              ? uiMessageFormat(
                  locale,
                  publishedCount === 1 ? 'sitesPublishedOne' : 'sitesPublishedMany',
                  { n: publishedCount },
                )
              : uiMessage(locale, 'mapEmptyLead')}
          </p>
          {publishedCount === 0 ? (
            <p className="mt-4 text-sm text-surface-muted">
              {uiMessageFormat(locale, 'browsePortalWhile', { portal: portalLabel })
                .split(portalLabel)
                .map((part, index, parts) =>
                  index < parts.length - 1 ? (
                    <span key={index}>
                      {part}
                      <Link
                        href="/culture"
                        className="text-heritage-teal underline-offset-2 hover:underline"
                      >
                        {portalLabel}
                      </Link>
                    </span>
                  ) : (
                    <span key={index}>{part}</span>
                  ),
                )}
            </p>
          ) : null}
        </header>

        <div className="heritage-map-embed">
          <MapPanel items={items} embedToolbar locale={locale} />
        </div>
      </div>
    </div>
  );
}

export default HeritageMapPage;
