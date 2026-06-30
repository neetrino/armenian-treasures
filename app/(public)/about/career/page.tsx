import type { Metadata } from 'next';
import { ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { getAboutContent } from '@/lib/queries/about';
import { getActiveCareers } from '@/lib/queries/careers';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Career',
  description: 'Join Armenian Treasures — open roles in digitization, engineering and research.',
};

async function AboutCareerPage() {
  const [careers, content] = await Promise.all([getActiveCareers(), getAboutContent()]);
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-12">
      <header className="max-w-4xl">
        <p className="mb-3 font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
          {content.careerEyebrow}
        </p>
        <h2 className="font-cinzel text-[clamp(2.2rem,4vw,4rem)] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-heritage-gold">
          {content.careerTitle}
        </h2>
        <p className="mt-4 font-display text-[clamp(1rem,1.25vw,1.15rem)] italic leading-[1.6] text-surface-muted">
          {content.careerIntro}
        </p>
      </header>

      {careers.length === 0 ? (
        <div className="border border-dashed border-surface bg-[var(--surface-card-bg)] px-6 py-14 text-center">
          <h3 className="font-cinzel text-xl font-extrabold uppercase tracking-[0.03em] text-heritage-gold">
            No open positions
          </h3>
          <p className="mt-3 font-display text-sm text-surface-body">
            Check back soon - we list every role here before announcing publicly.
          </p>
        </div>
      ) : (
        <Stagger className="grid gap-6 lg:grid-cols-2 lg:gap-7">
          {careers.map((career) => (
            <StaggerItem key={career.id} className="h-full">
              <article className="about-career-card group flex h-full flex-col">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="about-career-title">
                      {career.title}
                    </h3>
                    <div className="about-career-meta">
                      <span className="about-career-meta-item">
                        <MapPin size={14} aria-hidden className="about-career-meta-icon" /> {career.location}
                      </span>
                      <span className="about-career-meta-item">
                        <Briefcase size={14} aria-hidden className="about-career-meta-icon" /> {career.employmentType}
                      </span>
                    </div>
                  </div>
                  <span className="about-career-badge">
                    Open role
                  </span>
                </div>

                {career.description ? (
                  <p className="about-career-desc">
                    {career.description}
                  </p>
                ) : null}

                {career.applyUrl ?? career.applyEmail ? (
                  <a
                    href={career.applyUrl ?? `mailto:${career.applyEmail}`}
                    target={career.applyUrl ? '_blank' : undefined}
                    rel={career.applyUrl ? 'noopener noreferrer' : undefined}
                    className="about-career-apply"
                  >
                    Apply <ArrowRight size={14} aria-hidden />
                  </a>
                ) : null}
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}

export default AboutCareerPage;
