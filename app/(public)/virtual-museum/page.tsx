import type { Metadata } from 'next';
import Link from 'next/link';
import { VirtualMuseumSection } from '@/components/sections/VirtualMuseumSection';
import { getHomeContent } from '@/lib/queries/home';
import { getMenuTree } from '@/lib/queries/menu';
import { getProductRoadmapModules } from '@/lib/constants/product-roadmap';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { buildMenuHrefMap, resolveMenuHrefFromMap } from '@/lib/navigation/menu-href-map';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicPageMetadata({
    title: 'Virtual Museum — Armenian Treasures',
    description:
      'Roadmap for 360° virtual tours, 3D artefact exploration, immersive galleries and live heritage events.',
    pathname: '/virtual-museum',
  });
}

async function VirtualMuseumPage() {
  const [home, menuTree, locale] = await Promise.all([
    getHomeContent(),
    getMenuTree(),
    getCurrentSiteLocale(),
  ]);
  const menuHrefMap = buildMenuHrefMap(menuTree);
  const churchesHref = resolveMenuHrefFromMap(
    menuHrefMap,
    'architecture/churches',
    '/culture/architecture/churches',
  );
  const localizedModules = getProductRoadmapModules(locale);
  const aiHistorian = localizedModules.find((module) => module.id === 'ai-historian')!;
  const roadmapModules = localizedModules.filter(
    (module) => module.id !== 'ai-historian',
  );

  return (
    <>
      <VirtualMuseumSection home={home} />

      <section
        className="relative border-t border-stone-200/40 bg-surface px-5 py-16 sm:px-6 sm:py-20"
        aria-labelledby="virtual-museum-roadmap-heading"
      >
        <div className="mx-auto w-full max-w-[73.75rem]">
          <header className="mb-10 max-w-[40rem]">
            <p className="mb-3 font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
              {uiMessage(locale, 'productRoadmap')}
            </p>
            <h2
              id="virtual-museum-roadmap-heading"
              className="font-cinzel text-[clamp(1.75rem,2.5vw,2.5rem)] font-extrabold uppercase tracking-[0.02em] text-heritage-gold"
            >
              {uiMessage(locale, 'comingModules')}
            </h2>
            <p className="mt-4 font-display text-base italic leading-relaxed text-surface-muted">
              {uiMessage(locale, 'roadmapAvailability')}
              <Link href="/khndzoresk" className="text-heritage-teal underline-offset-2 hover:underline">
                Khndzoresk
              </Link>
              {uiMessage(locale, 'roadmapAvailabilityEnd')}
            </p>
          </header>

          <ul className="grid gap-4 md:grid-cols-2">
            {roadmapModules.map((module) => (
              <li
                key={module.id}
                className="rounded-2xl border border-stone-200/70 bg-white/80 p-6 shadow-card backdrop-blur-sm"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-heritage-teal">
                  {module.statusLabel}
                </p>
                <h3 className="mt-2 font-cinzel text-lg font-extrabold uppercase text-heritage-gold">
                  {module.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{module.description}</p>
              </li>
            ))}
          </ul>

          <aside className="mt-10 rounded-2xl border border-dashed border-heritage-gold/30 bg-heritage-gold/5 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-heritage-gold">
              {aiHistorian.statusLabel}
            </p>
            <h3 className="mt-2 font-cinzel text-lg font-extrabold uppercase text-heritage-gold">
              {aiHistorian.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
              {aiHistorian.description} {uiMessage(locale, 'historianMembershipPrefix')}
              <Link href="/donate" className="text-heritage-teal underline-offset-2 hover:underline">
                {uiMessage(locale, 'donationPage')}
              </Link>
              {uiMessage(locale, 'historianMembershipSuffix')}
            </p>
          </aside>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/map"
              className="inline-flex items-center rounded-full border border-heritage-teal/30 bg-heritage-teal/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-eyebrow text-heritage-teal transition hover:bg-heritage-teal/15"
            >
              {uiMessage(locale, 'exploreHeritageMap')}
            </Link>
            <Link
              href={churchesHref}
              className="inline-flex items-center rounded-full border border-heritage-gold/30 bg-heritage-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-eyebrow text-heritage-gold transition hover:bg-heritage-gold/15"
            >
              {uiMessage(locale, 'browseChurchTours')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default VirtualMuseumPage;
