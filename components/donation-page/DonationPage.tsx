import '@/components/donation-page/donation-page.css';
import { DonationHero } from '@/components/donation-page/DonationHero';
import { DonationStatsBar } from '@/components/donation-page/DonationStatsBar';
import { DonationEngine } from '@/components/donation-page/DonationEngine';
import { DonationLedger } from '@/components/donation-page/DonationLedger';
import { DonationPatronWall } from '@/components/donation-page/DonationPatronWall';
import { DonationClosingSections } from '@/components/donation-page/DonationClosingSections';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';
import { isSectionEnabled } from '@/lib/landing/landing-section-utils';
import { getPublicDonators } from '@/lib/queries/donators';
import { getDonationPageContent } from '@/lib/queries/page-content';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';

export async function DonationPage() {
  const [content, donators] = await Promise.all([
    getDonationPageContent(),
    getPublicDonators(),
  ]);
  const visibility = content.sectionVisibility;

  return (
    <HeritageLandingShell>
      {isSectionEnabled(visibility, 'hero') ? (
        <DonationHero
          breadcrumb={content.page.breadcrumb}
          hero={content.page.hero}
          heroImage={resolvePageHeroImageUrl(content.heroImage)}
        />
      ) : null}
      {isSectionEnabled(visibility, 'stats') ? <DonationStatsBar stats={content.stats} /> : null}
      <LandingSectionStack>
        {isSectionEnabled(visibility, 'engine') ? (
          <DonationEngine
            engine={content.page.engine}
            tiers={content.tiers}
            impactRanges={content.impactRanges}
            patronSliderTicks={content.patronSliderTicks}
            patronQuickChips={content.patronQuickChips}
          />
        ) : null}
        {isSectionEnabled(visibility, 'ledger') ? (
          <DonationLedger ledger={content.page.ledger} items={content.ledger} />
        ) : null}
        {isSectionEnabled(visibility, 'patronWall') ? (
          <DonationPatronWall
            patronWall={content.page.patronWall}
            wallBadges={content.wall}
            donators={donators}
          />
        ) : null}
        {isSectionEnabled(visibility, 'closing') ? (
          <DonationClosingSections newsletter={content.page.newsletter} trustItems={content.trustItems} />
        ) : null}
      </LandingSectionStack>
    </HeritageLandingShell>
  );
}
