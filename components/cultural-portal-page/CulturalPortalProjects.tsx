import Link from 'next/link';
import type { CulturalPortalProjectIcon } from '@/lib/constants/cultural-portal-page';

interface CulturalPortalProject {
  title: string;
  description: string;
  href: string;
  status: string;
  statusLabel: string;
  date: string;
  icon: CulturalPortalProjectIcon;
}

interface CulturalPortalProjectsProps {
  projects: CulturalPortalProject[];
}

function ProjectIcon({ type }: { type: CulturalPortalProjectIcon }) {
  const props = {
    className: 'proj-icon',
    viewBox: '0 0 56 56',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.3,
    'aria-hidden': true,
  };

  switch (type) {
    case 'archive':
      return (
        <svg {...props}>
          <path d="M10 10h24l10 10v26H10z" />
          <path d="M34 10v10h10" />
          <path d="M18 24h20M18 32h20M18 40h12" />
          <circle cx="44" cy="44" r="8" />
          <path d="M44 40v4l3 2" />
        </svg>
      );
    case 'documentary':
      return (
        <svg {...props}>
          <rect x="6" y="12" width="44" height="28" rx="2" />
          <path d="M22 40v8M34 40v8M16 48h24" />
          <circle cx="28" cy="26" r="8" />
          <path d="M24 26l4-4 6 6" />
        </svg>
      );
    case 'arApp':
      return (
        <svg {...props}>
          <rect x="12" y="8" width="28" height="40" rx="3" />
          <rect x="16" y="12" width="20" height="12" rx="1" />
          <circle cx="22" cy="36" r="3" />
          <path d="M26 36h8M26 42h8M16 42h4" />
          <path d="M40 22l8-8M40 22h6M40 22v6" />
        </svg>
      );
    case 'education':
      return (
        <svg {...props}>
          <path d="M8 44V16l20-10 20 10v28l-20 8z" />
          <path d="M28 6v46M8 16l20 10 20-10" />
          <path d="M18 30l10 4 10-4M18 38l10 4 10-4" />
        </svg>
      );
    case 'diaspora':
      return (
        <svg {...props}>
          <circle cx="28" cy="28" r="20" />
          <path d="M8 28h40M28 8v40" />
          <path d="M14 16c4 4 8 6 14 6s10-2 14-6M14 40c4-4 8-6 14-6s10 2 14 6" />
          <circle cx="28" cy="28" r="6" />
        </svg>
      );
    case 'archaeology':
      return (
        <svg {...props}>
          <path d="M28 6l4 12h14l-11 8 4 12-11-8-11 8 4-12-11-8h14z" />
          <path d="M28 38v12M20 50h16" />
          <circle cx="28" cy="24" r="4" />
        </svg>
      );
  }
}

export function CulturalPortalProjects({ projects }: CulturalPortalProjectsProps) {
  return (
    <section id="projects">
      <p className="sec-label">Upcoming Projects</p>
      <h2 className="sec-title">What We Are Building</h2>
      <p className="sec-desc">
        Landmark initiatives to digitise, broadcast, educate, and connect Armenian heritage with the
        global community.
      </p>
      {projects.length === 0 ? (
        <p className="sec-desc">Projects will appear here once published in the admin panel.</p>
      ) : (
        <div className="proj-grid">
          {projects.map((project) => (
            <Link key={project.title} href={project.href} className="proj-card reveal">
              <div className={`proj-status status-${project.status}`}>{project.statusLabel}</div>
              <ProjectIcon type={project.icon} />
              <div className="proj-title">{project.title}</div>
              <p className="proj-desc">{project.description}</p>
              <div className="proj-date">▸ {project.date}</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
