import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { HomeContentForm } from '@/components/admin/HomeContentForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { HOME_CONTENT_FALLBACK } from '@/lib/queries/home';
import { normalizeHomeSections } from '@/lib/types/home-sections';
import {
  normalizeHomeStats,
  normalizeHomeTechCards,
} from '@/lib/types/home-content';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Home content', robots: { index: false, follow: false } };

async function AdminHomeContentPage() {
  const user = await requireAdmin();
  const content = await prisma.homeContent.findFirst();
  const fallback = HOME_CONTENT_FALLBACK;
  const initial = {
    heroBadge: content?.heroBadge ?? fallback.heroBadge,
    heroTitle: content?.heroTitle ?? fallback.heroTitle,
    heroHighlight: content?.heroHighlight ?? fallback.heroHighlight,
    heroSubtitle: content?.heroSubtitle ?? fallback.heroSubtitle,
    heroTagline: content?.heroTagline ?? fallback.heroTagline,
    heroDescription: content?.heroDescription ?? fallback.heroDescription,
    heroImage: content?.heroImage ?? '',
    heroMobileImage: content?.heroMobileImage ?? '',
    primaryCtaText: content?.primaryCtaText ?? fallback.primaryCtaText,
    primaryCtaUrl: content?.primaryCtaUrl ?? fallback.primaryCtaUrl,
    secondaryCtaText: content?.secondaryCtaText ?? fallback.secondaryCtaText,
    secondaryCtaUrl: content?.secondaryCtaUrl ?? fallback.secondaryCtaUrl,
    stats: normalizeHomeStats(content?.stats ?? fallback.stats),
    missionTitle: content?.missionTitle ?? fallback.missionTitle,
    missionHighlight: content?.missionHighlight ?? fallback.missionHighlight,
    missionText: content?.missionText ?? fallback.missionText,
    techCards: normalizeHomeTechCards(content?.techCards ?? fallback.techCards),
    ctaTitle: content?.ctaTitle ?? fallback.ctaTitle,
    ctaDescription: content?.ctaDescription ?? fallback.ctaDescription,
    sections: normalizeHomeSections(content?.sections ?? fallback.sections),
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
