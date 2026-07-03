import type { ReactNode } from 'react';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import './about-page.css';
import { AboutSidebarNav } from '@/components/navigation/AboutSidebarNav';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingHero } from '@/components/landing/LandingHero';
import { getAboutContent } from '@/lib/queries/about';

async function AboutLayout({ children }: { children: ReactNode }) {
  const content = await getAboutContent();

  return (
    <HeritageLandingShell>
      <LandingHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        accent="ABOUT US"
        subtitle={content.heroDescription}
        heroImage={content.heroImage}
        heroClassName="cultural-portal-hero about-portal-hero"
        ctas={[{ label: 'Explore Sections', href: '#about-main', variant: 'gold' }]}
      />

      <KhndzoreskDivider />

      <section
        id="about-main"
        className="relative z-[1] mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 lg:px-10"
      >
        <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center">
          <AboutSidebarNav />
          <div className="mx-auto mt-8 w-full max-w-[1000px]">{children}</div>
        </div>
      </section>
    </HeritageLandingShell>
  );
}

export default AboutLayout;
