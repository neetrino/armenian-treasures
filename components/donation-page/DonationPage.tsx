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

export function DonationPage() {
  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <DonationBreadcrumb />
      <DonationHero />
      <DonationStatsBar />
      <DonationMission />
      <KhndzoreskDivider />
      <DonationEngine />
      <KhndzoreskDivider />
      <DonationLedger />
      <DonationPatronWall />
      <DonationClosingSections />
    </div>
  );
}
