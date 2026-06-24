import type { Metadata } from 'next';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { HomeContentForm } from '@/components/admin/HomeContentForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { HOME_CONTENT_FALLBACK } from '@/lib/queries/home';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Home content', robots: { index: false, follow: false } };

async function AdminHomeContentPage() {
  const user = await requireAdmin();
  const content = await prisma.homeContent.findFirst();
  const fallback = HOME_CONTENT_FALLBACK;
  const initial = {
    heroTitle: content?.heroTitle ?? fallback.heroTitle,
    heroHighlight: content?.heroHighlight ?? fallback.heroHighlight,
    heroDescription: content?.heroDescription ?? fallback.heroDescription,
    heroImage: content?.heroImage ?? fallback.heroImage ?? '',
    heroMobileImage: content?.heroMobileImage ?? '',
    primaryCtaText: content?.primaryCtaText ?? fallback.primaryCtaText,
    primaryCtaUrl: content?.primaryCtaUrl ?? fallback.primaryCtaUrl,
    secondaryCtaText: content?.secondaryCtaText ?? fallback.secondaryCtaText,
    secondaryCtaUrl: content?.secondaryCtaUrl ?? fallback.secondaryCtaUrl,
  };
  return (
    <>
      <AdminTopbar title="Home content" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Homepage hero"
          description="Edit the homepage hero title, description, buttons, and background images."
        />
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
          <HomeContentForm initial={initial} />
        </div>
      </div>
    </>
  );
}

export default AdminHomeContentPage;
