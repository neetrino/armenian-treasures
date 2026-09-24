import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { HomeContentForm } from '@/components/admin/HomeContentForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { HOME_CONTENT_FALLBACK } from '@/lib/queries/home';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import { localizedHomeSections, localizedHomeStats, localizedHomeTechCards } from '@/lib/i18n/home-fallbacks';
import { decodeLocaleDocument } from '@/lib/i18n/locale-document';
import { decodeTranslatableText, encodeTranslatableText } from '@/lib/i18n/translatable-content';
import { uiMessage, type UiMessageKey } from '@/lib/i18n/ui-messages';
import { normalizeHomeSections } from '@/lib/types/home-sections';
import {
  normalizeHomeStats,
  normalizeHomeTechCards,
} from '@/lib/types/home-content';
import { prisma } from '@/lib/db';

function withArmenianDocument<T>(
  map: Partial<Record<SiteLocaleCode, T>>,
  localized: (locale: SiteLocaleCode) => T,
): Partial<Record<SiteLocaleCode, T>> {
  if (!map.HY) map.HY = localized('HY');
  if (!map.HYW) map.HYW = localized('HYW');
  return map;
}

function withArmenianCatalog(raw: string, key: UiMessageKey): string {
  const map = decodeTranslatableText(raw);
  for (const locale of SITE_LOCALE_CODES) {
    if (locale !== 'HY' && locale !== 'HYW') continue;
    if (!map[locale]?.trim()) map[locale] = uiMessage(locale, key);
  }
  return encodeTranslatableText(map);
}

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Home content', robots: { index: false, follow: false } };

async function AdminHomeContentPage() {
  const user = await requireAdmin();
  const content = await prisma.homeContent.findFirst();
  const fallback = HOME_CONTENT_FALLBACK;
  const initial = {
    heroBadge: withArmenianCatalog(content?.heroBadge ?? fallback.heroBadge, 'heroBadge'),
    heroTitle: withArmenianCatalog(content?.heroTitle ?? fallback.heroTitle, 'heroTitle'),
    heroHighlight: withArmenianCatalog(content?.heroHighlight ?? fallback.heroHighlight, 'heroHighlight'),
    heroSubtitle: withArmenianCatalog(content?.heroSubtitle ?? fallback.heroSubtitle, 'heroSubtitle'),
    heroTagline: withArmenianCatalog(content?.heroTagline ?? fallback.heroTagline, 'heroTagline'),
    heroDescription: withArmenianCatalog(content?.heroDescription ?? fallback.heroDescription, 'heroDescription'),
    heroImage: content?.heroImage ?? '',
    heroMobileImage: content?.heroMobileImage ?? '',
    primaryCtaText: withArmenianCatalog(content?.primaryCtaText ?? fallback.primaryCtaText, 'exploreArmenianHeritage'),
    primaryCtaUrl: content?.primaryCtaUrl ?? fallback.primaryCtaUrl,
    secondaryCtaText: withArmenianCatalog(content?.secondaryCtaText ?? fallback.secondaryCtaText, 'supportMission'),
    secondaryCtaUrl: content?.secondaryCtaUrl ?? fallback.secondaryCtaUrl,
    stats: withArmenianDocument(
      decodeLocaleDocument(content?.stats ?? fallback.stats, normalizeHomeStats),
      localizedHomeStats,
    ),
    missionTitle: withArmenianCatalog(content?.missionTitle ?? fallback.missionTitle, 'missionTitle'),
    missionHighlight: withArmenianCatalog(content?.missionHighlight ?? fallback.missionHighlight, 'missionHighlight'),
    missionText: withArmenianCatalog(content?.missionText ?? fallback.missionText, 'missionText'),
    techCards: withArmenianDocument(
      decodeLocaleDocument(content?.techCards ?? fallback.techCards, normalizeHomeTechCards),
      localizedHomeTechCards,
    ),
    ctaTitle: withArmenianCatalog(content?.ctaTitle ?? fallback.ctaTitle, 'ctaTitle'),
    ctaDescription: withArmenianCatalog(content?.ctaDescription ?? fallback.ctaDescription, 'ctaDescription'),
    sections: withArmenianDocument(
      decodeLocaleDocument(content?.sections ?? fallback.sections, normalizeHomeSections),
      localizedHomeSections,
    ),
  };
  return (
    <AdminPageShell
      user={user}
      topbarTitle="Homepage"
      title="Homepage content"
      description="Visual editor with tabs — hero, stats, technology cards, homepage blocks, and bottom CTA. No JSON editing."
    >
      <AdminPanelCard>
        <HomeContentForm
          key={content?.updatedAt?.toISOString() ?? 'new'}
          initial={initial}
        />
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default AdminHomeContentPage;
