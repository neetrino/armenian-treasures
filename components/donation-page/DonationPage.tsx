import '@/components/khndzoresk/khndzoresk.css';
import '@/components/donation-page/donation-page.css';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import { DonationBreadcrumb, DonationHero } from '@/components/donation-page/DonationHero';
import { DonationStatsBar } from '@/components/donation-page/DonationStatsBar';
import { DonationMission } from '@/components/donation-page/DonationMission';
import { DonationEngine } from '@/components/donation-page/DonationEngine';
import { DonationLedger } from '@/components/donation-page/DonationLedger';
import { DonationPatronWall } from '@/components/donation-page/DonationPatronWall';
import { DonationClosingSections } from '@/components/donation-page/DonationClosingSections';
import { getPublicDonators } from '@/lib/queries/donators';
import { getDonationPageContent } from '@/lib/queries/page-content';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';

export async function DonationPage() {
  const [content, donators] = await Promise.all([
    getDonationPageContent(),
    getPublicDonators(),
  ]);

  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <DonationBreadcrumb breadcrumb={content.page.breadcrumb} />
      <DonationHero
        hero={content.page.hero}
        heroImage={resolvePageHeroImageUrl(content.heroImage)}
      />
      <DonationStatsBar stats={content.stats} />
      <DonationMission mission={content.page.mission} pillars={content.pillars} />
      <KhndzoreskDivider />
      <DonationEngine
        engine={content.page.engine}
        tiers={content.tiers}
        impactRanges={content.impactRanges}
        patronSliderTicks={content.patronSliderTicks}
        patronQuickChips={content.patronQuickChips}
      />
      <KhndzoreskDivider />
      <DonationLedger ledger={content.page.ledger} items={content.ledger} />
      <DonationPatronWall
        patronWall={content.page.patronWall}
        wallBadges={content.wall}
        donators={donators}
      />
      <DonationClosingSections
        quote={content.page.quote}
        newsletter={content.page.newsletter}
        trustItems={content.trustItems}
      />
    </div>
  );
}
