import { UpcomingProjectsGrid } from '@/components/sections/upcoming-projects/UpcomingProjectsGrid';
import { UpcomingProjectsOrnament } from '@/components/sections/upcoming-projects/UpcomingProjectsOrnament';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function UpcomingProjectsSection({ home }: HomeSectionContentProps) {
  const { upcomingProjects } = getHomeSections(home);

  return (
    <section
      id="projects"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6"
      aria-labelledby="upcoming-projects-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <UpcomingProjectsOrnament />

        <HomeSectionHeader
          id="upcoming-projects-heading"
          eyebrow={upcomingProjects.eyebrow}
          title={upcomingProjects.title}
          description={upcomingProjects.description}
        />

        <UpcomingProjectsGrid />
      </div>
    </section>
  );
}
