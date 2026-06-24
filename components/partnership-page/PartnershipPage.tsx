import '@/components/khndzoresk/khndzoresk.css';
import '@/components/partnership-page/partnership-page.css';
import { PartnershipBreadcrumb, PartnershipHero } from '@/components/partnership-page/PartnershipHero';
import { PartnershipImpact } from '@/components/partnership-page/PartnershipImpact';
import { PartnershipInquiryForm } from '@/components/partnership-page/PartnershipInquiryForm';
import { PartnershipNewsletter } from '@/components/partnership-page/PartnershipNewsletter';
import { PartnershipTimeline, PartnershipValues } from '@/components/partnership-page/PartnershipProcess';
import { PartnershipShowcase } from '@/components/partnership-page/PartnershipShowcase';
import { PartnershipStatsBar } from '@/components/partnership-page/PartnershipStatsBar';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';

export function PartnershipPage() {
  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <PartnershipBreadcrumb />
      <PartnershipHero />
      <PartnershipStatsBar />
      <PartnershipImpact />
      <KhndzoreskDivider />
      <PartnershipShowcase />
      <KhndzoreskDivider />
      <PartnershipTimeline />
      <KhndzoreskDivider />
      <PartnershipValues />
      <KhndzoreskDivider />
      <PartnershipInquiryForm />
      <PartnershipNewsletter />
    </div>
  );
}
