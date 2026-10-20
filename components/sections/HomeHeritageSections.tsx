import { Suspense } from 'react';
import { getHomeContent } from '@/lib/queries/home';
import { CulturalPortalSection } from '@/components/sections/CulturalPortalSection';
import { FeaturedTreasuresSection } from '@/components/sections/FeaturedTreasuresSection';
import { HeritageMapSection } from '@/components/sections/HeritageMapSection';
import { HomeNewsFeedSection } from '@/components/sections/HomeNewsFeedSection';
import { UpcomingProjectsSection } from '@/components/sections/UpcomingProjectsSection';
import {
  HERITAGE_DOWNLOADS_HOME_VISIBLE,
  HeritageDownloadSection,
} from '@/components/sections/HeritageDownloadSection';
import { HomeSectionGridFallback } from '@/components/sections/HomeSectionGridFallback';

export async function HomeHeritageSections() {
  const home = await getHomeContent();

  return (
    <div className="relative isolate overflow-hidden bg-black">
      {/* Feedback order: Cultural Portal → Map → Featured Treasures → News → Projects */}
      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[18rem]" />}>
        <CulturalPortalSection home={home} />
      </Suspense>
      <div className="heritage-section-divider my-2" aria-hidden />
      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[16rem]" />}>
        <HeritageMapSection home={home} />
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
      {HERITAGE_DOWNLOADS_HOME_VISIBLE ? (
        <>
          <div className="heritage-section-divider my-2" aria-hidden />
          <HeritageDownloadSection />
        </>
      ) : null}
    </div>
  );
}
