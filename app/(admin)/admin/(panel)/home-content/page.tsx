import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { HomeContentForm } from '@/components/admin/HomeContentForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { normalizeHomeStats, normalizeHomeTechCards } from '@/lib/types/home-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Home content', robots: { index: false, follow: false } };

async function AdminHomeContentPage() {
  const user = await requireAdmin();
  const content = await prisma.homeContent.findFirst();
  const initial = {
    heroBadge: content?.heroBadge ?? '',
    heroTitle: content?.heroTitle ?? '',
    heroHighlight: content?.heroHighlight ?? '',
    heroDescription: content?.heroDescription ?? '',
    heroImage: content?.heroImage ?? '',
    primaryCtaText: content?.primaryCtaText ?? '',
    primaryCtaUrl: content?.primaryCtaUrl ?? '',
    secondaryCtaText: content?.secondaryCtaText ?? '',
    secondaryCtaUrl: content?.secondaryCtaUrl ?? '',
    stats: normalizeHomeStats(content?.stats),
    missionTitle: content?.missionTitle ?? '',
    missionHighlight: content?.missionHighlight ?? '',
    missionText: content?.missionText ?? '',
    techCards: normalizeHomeTechCards(content?.techCards),
    ctaTitle: content?.ctaTitle ?? '',
    ctaDescription: content?.ctaDescription ?? '',
  };
  return (
    <>
      <AdminTopbar title="Home content" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Home page content"
          description="The hero, stats, mission preview, technology cards and CTA on the public home page."
        />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <HomeContentForm initial={initial} />
        </div>
      </div>
    </>
  );
}

export default AdminHomeContentPage;
