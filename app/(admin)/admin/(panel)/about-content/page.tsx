import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AboutContentForm } from '@/components/admin/AboutContentForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { FALLBACK_ABOUT_CONTENT } from '@/lib/queries/about';
import { normalizeAboutPillars } from '@/lib/types/about-content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'About content',
  robots: { index: false, follow: false },
};

async function AdminAboutContentPage() {
  const user = await requireAdmin();
  const content = await prisma.aboutContent.findFirst();
  const fallback = FALLBACK_ABOUT_CONTENT;
  const initial = {
    heroEyebrow: content?.heroEyebrow ?? fallback.heroEyebrow,
    heroTitle: content?.heroTitle ?? fallback.heroTitle,
    heroDescription: content?.heroDescription ?? fallback.heroDescription,
    missionEyebrow: content?.missionEyebrow ?? fallback.missionEyebrow,
    missionTitle: content?.missionTitle ?? fallback.missionTitle,
    missionIntro: content?.missionIntro ?? fallback.missionIntro,
    pillars: normalizeAboutPillars(content?.pillars ?? fallback.pillars),
    whyNowHeading: content?.whyNowHeading ?? fallback.whyNowHeading,
    whyNowBody: content?.whyNowBody ?? fallback.whyNowBody,
    howWeWorkHeading: content?.howWeWorkHeading ?? fallback.howWeWorkHeading,
    howWeWorkBody: content?.howWeWorkBody ?? fallback.howWeWorkBody,
    teamEyebrow: content?.teamEyebrow ?? fallback.teamEyebrow,
    teamTitle: content?.teamTitle ?? fallback.teamTitle,
    teamIntro: content?.teamIntro ?? fallback.teamIntro,
    careerEyebrow: content?.careerEyebrow ?? fallback.careerEyebrow,
    careerTitle: content?.careerTitle ?? fallback.careerTitle,
    careerIntro: content?.careerIntro ?? fallback.careerIntro,
  };
  return (
    <>
      <AdminTopbar title="About content" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="About Us page content"
          description="The shared hero, mission page copy, and team/career page intros on the public About section."
        />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <AboutContentForm initial={initial} />
        </div>
      </div>
    </>
  );
}

export default AdminAboutContentPage;
