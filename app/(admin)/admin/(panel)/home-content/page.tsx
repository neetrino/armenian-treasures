import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
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
    heroImage: content?.heroImage ?? fallback.heroImage ?? '',
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
    <>
      <AdminTopbar title="Home content" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Homepage content"
          description="Edit the homepage hero, stats, section copy, technology cards, and CTA blocks."
        />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <HomeContentForm initial={initial} />
        </div>
      </div>
    </>
  );
}

export default AdminHomeContentPage;
