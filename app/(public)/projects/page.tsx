import type { Metadata } from 'next';
import Link from 'next/link';
import '@/components/khndzoresk/khndzoresk.css';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import { CulturalPortalProjects } from '@/components/cultural-portal-page/CulturalPortalProjects';
import { mapProjectsToCulturalPortalProjects } from '@/lib/mappers/cultural-portal-projects';
import { getPublishedProjects } from '@/lib/queries/projects';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Active and funded digitization projects of the Armenian Treasures Foundation.',
};

async function ProjectsPage() {
  const projects = await getPublishedProjects();
  const mappedProjects = mapProjectsToCulturalPortalProjects(projects);

  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />

      <div className="hero cultural-portal-hero">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
          <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
        </svg>
        <div className="hero-content">
          <p className="hero-eyebrow reveal">PROJECTS</p>
          <h1 className="reveal">
            ARMENIAN TREASURES
            <span>ACTIVE MISSIONS</span>
          </h1>
          <p className="hero-sub reveal">
            Field digitization campaigns, restoration initiatives, and archive programs powered by the foundation.
          </p>
          <div className="hero-btns reveal">
            <a href="#projects" className="btn-gold">
              Explore Projects
            </a>
            <Link href="/partnership" className="btn-teal">
              Support The Mission
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      </div>

      <KhndzoreskDivider />

      <CulturalPortalProjects
        eyebrow="PROJECT PORTAL"
        title="UPCOMING & ACTIVE INITIATIVES"
        description="Browse the current foundation roadmap with transparent status, category, and regional focus."
        projects={mappedProjects}
      />
    </div>
  );
}

export default ProjectsPage;
