import '@/components/sections/about-us/about-us-section.css';
import { AboutUsGrid } from '@/components/sections/about-us/AboutUsGrid';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function AboutUsSection({ home }: HomeSectionContentProps) {
  const { aboutUs } = getHomeSections(home);

  return (
    <section
      id="about"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6"
      aria-labelledby="about-us-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <HomeSectionHeader
          id="about-us-heading"
          eyebrow={aboutUs.eyebrow}
          title={aboutUs.title}
          description={aboutUs.description}
        />

        <AboutUsGrid cards={aboutUs.cards} />
      </div>
    </section>
  );
}
