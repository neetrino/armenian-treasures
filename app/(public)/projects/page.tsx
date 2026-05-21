import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { getPublishedProjects } from '@/lib/queries/projects';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Active and funded digitization projects of the Armenian Treasures Foundation.',
};

async function ProjectsPage() {
  const projects = await getPublishedProjects();
  return (
    <>
      <HeroPage
        eyebrow="Projects"
        title="Upcoming and active digitization missions."
        description="Each project funds drone flights, 3D scans, manuscript imaging or audio restoration that go straight into the open archive."
      />
      <Container className="py-20 lg:py-28">
        {projects.length === 0 ? (
          <EmptyState
            title="No projects published yet"
            description="Projects will appear here once curators publish them in the admin panel."
          />
        ) : (
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {projects.map((project) => (
              <StaggerItem key={project.id} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </>
  );
}

export default ProjectsPage;
