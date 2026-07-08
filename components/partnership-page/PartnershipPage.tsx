import '@/components/partnership-page/partnership-page.css';

import { PartnershipHero } from '@/components/partnership-page/PartnershipHero';
import { PartnershipInquiryForm } from '@/components/partnership-page/PartnershipInquiryForm';
import { PartnershipNewsletter } from '@/components/partnership-page/PartnershipNewsletter';
import { PartnershipShowcase } from '@/components/partnership-page/PartnershipShowcase';
import { PartnershipStatsBar } from '@/components/partnership-page/PartnershipStatsBar';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';
import { isSectionEnabled } from '@/lib/landing/landing-section-utils';
import { getPartnershipPageContent } from '@/lib/queries/page-content';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';

export async function PartnershipPage() {
  const content = await getPartnershipPageContent();
  const visibility = content.sectionVisibility;

  return (
    <HeritageLandingShell>
      {isSectionEnabled(visibility, 'hero') ? (
        <PartnershipHero heroImage={resolvePageHeroImageUrl(content.heroImage)} />
      ) : null}
      {isSectionEnabled(visibility, 'stats') ? <PartnershipStatsBar /> : null}
      <LandingSectionStack>
        {isSectionEnabled(visibility, 'showcase') ? <PartnershipShowcase /> : null}
        {isSectionEnabled(visibility, 'inquiry') ? <PartnershipInquiryForm /> : null}
        {isSectionEnabled(visibility, 'newsletter') ? <PartnershipNewsletter /> : null}
      </LandingSectionStack>
    </HeritageLandingShell>
  );
}
