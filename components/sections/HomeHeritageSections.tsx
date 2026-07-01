import { Suspense } from 'react';
import { getHomeContent } from '@/lib/queries/home';
import { VirtualMuseumSection } from '@/components/sections/VirtualMuseumSection';
import { CulturalPortalSection } from '@/components/sections/CulturalPortalSection';
import { FeaturedTreasuresSection } from '@/components/sections/FeaturedTreasuresSection';
import { HeritageMapSection } from '@/components/sections/HeritageMapSection';
import { HomeNewsFeedSection } from '@/components/sections/HomeNewsFeedSection';
import { UpcomingProjectsSection } from '@/components/sections/UpcomingProjectsSection';
import { PartnershipSection } from '@/components/sections/PartnershipSection';
import { DonationsSection } from '@/components/sections/DonationsSection';
import { AboutUsSection } from '@/components/sections/AboutUsSection';
import { HomeNewsletterSection } from '@/components/sections/HomeNewsletterSection';
import { HomeSectionGridFallback } from '@/components/sections/HomeSectionGridFallback';

export async function HomeHeritageSections() {
  const home = await getHomeContent();

  return (
    <div className="relative isolate overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-0 bg-heritage-radial opacity-[var(--surface-radial-opacity)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-heritage-teal-glow opacity-[var(--surface-glow-opacity)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-hero-diamond-grid opacity-[var(--surface-grid-opacity)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(214,184,90,0.03)_0%,transparent_18%,transparent_82%,rgba(214,184,90,0.025)_100%)]"
        aria-hidden
      />

      {/* Feedback order: Features explorer → Map → Culture → News → Projects → Partnership */}
      <VirtualMuseumSection embedded home={home} />
      <div className="heritage-section-divider my-2" aria-hidden />
      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[16rem]" />}>
        <HeritageMapSection home={home} />
      </Suspense>
      <div className="heritage-section-divider my-2" aria-hidden />
      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[18rem]" />}>
        <CulturalPortalSection home={home} />
      </Suspense>
      <div className="heritage-section-divider my-2" aria-hidden />
      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[20rem]" />}>
        <FeaturedTreasuresSection home={home} />
      </Suspense>
      <div className="heritage-section-divider my-2" aria-hidden />
      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[18rem]" />}>
        <HomeNewsFeedSection />
      </Suspense>
      <div className="heritage-section-divider my-2" aria-hidden />
      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[18rem]" />}>
        <UpcomingProjectsSection home={home} />
      </Suspense>
      <div className="heritage-section-divider my-2" aria-hidden />
      <PartnershipSection home={home} />
      <div className="heritage-section-divider my-2" aria-hidden />
      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[14rem]" />}>
        <DonationsSection home={home} />
      </Suspense>
      <div className="heritage-section-divider my-2" aria-hidden />
      <AboutUsSection home={home} />
      <div className="heritage-section-divider my-2" aria-hidden />
      <HomeNewsletterSection home={home} />
    </div>
  );
}
