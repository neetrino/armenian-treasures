import '@/components/khndzoresk/khndzoresk.css';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import { CulturalPortalAbout } from '@/components/cultural-portal-page/CulturalPortalAbout';
import { CulturalPortalCategories } from '@/components/cultural-portal-page/CulturalPortalCategories';
import { CulturalPortalDonors } from '@/components/cultural-portal-page/CulturalPortalDonors';
import { CulturalPortalHero } from '@/components/cultural-portal-page/CulturalPortalHero';
import { CulturalPortalHighlights } from '@/components/cultural-portal-page/CulturalPortalHighlights';
import { CulturalPortalMap } from '@/components/cultural-portal-page/CulturalPortalMap';
import { CulturalPortalNewsletter } from '@/components/cultural-portal-page/CulturalPortalNewsletter';
import { CulturalPortalPartnership } from '@/components/cultural-portal-page/CulturalPortalPartnership';
import { CulturalPortalProjects } from '@/components/cultural-portal-page/CulturalPortalProjects';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';

export function CulturalPortalPage() {
  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <CulturalPortalHero />
      <CulturalPortalStatsBar />
      <CulturalPortalCategories />
      <KhndzoreskDivider />
      <CulturalPortalHighlights />
      <CulturalPortalMap />
      <KhndzoreskDivider />
      <CulturalPortalProjects />
      <CulturalPortalPartnership />
      <CulturalPortalDonors />
      <KhndzoreskDivider />
      <CulturalPortalAbout />
      <CulturalPortalNewsletter />
    </div>
  );
}
