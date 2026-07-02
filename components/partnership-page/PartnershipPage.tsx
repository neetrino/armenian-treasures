import '@/components/khndzoresk/khndzoresk.css';
import '@/components/partnership-page/partnership-page.css';
import { PartnershipBreadcrumb, PartnershipHero } from '@/components/partnership-page/PartnershipHero';
import { PartnershipImpact } from '@/components/partnership-page/PartnershipImpact';
import { PartnershipInquiryForm } from '@/components/partnership-page/PartnershipInquiryForm';
import { PartnershipNewsletter } from '@/components/partnership-page/PartnershipNewsletter';
import { PartnershipTimeline, PartnershipValues } from '@/components/partnership-page/PartnershipProcess';
import { PartnershipShowcase } from '@/components/partnership-page/PartnershipShowcase';
import { PartnershipStatsBar } from '@/components/partnership-page/PartnershipStatsBar';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { getPartnershipPageContent } from '@/lib/queries/page-content';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';

export async function PartnershipPage() {
  const content = await getPartnershipPageContent();

  return (
    <div className="khndzoresk-page">
      <PartnershipBreadcrumb />
      <PartnershipHero heroImage={resolvePageHeroImageUrl(content.heroImage)} />
      <PartnershipStatsBar />
      <PartnershipImpact />
      <KhndzoreskDivider />
      <PartnershipValues />
      <KhndzoreskDivider />
      <PartnershipTimeline />
      <KhndzoreskDivider />
      <PartnershipShowcase />
      <KhndzoreskDivider />
      <PartnershipInquiryForm />
      <PartnershipNewsletter />
    </div>
  );
}
