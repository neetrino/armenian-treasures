import type { Metadata } from 'next';
import type { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { getAboutContent } from '@/lib/queries/about';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Mission',
  description:
    'Three pillars guide Armenian Treasures: digitization, scholarship and accessibility for the Armenian world.',
};

function resolveIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.ShieldCheck;
}

async function AboutMissionPage() {
  const content = await getAboutContent();
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-12">
      <header className="max-w-4xl">
        <p className="mb-3 font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
          {content.missionEyebrow}
        </p>
        <h2 className="font-cinzel text-[clamp(2.2rem,4vw,4rem)] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-heritage-gold">
          {content.missionTitle}
        </h2>
        <p className="mt-4 font-display text-[clamp(1rem,1.25vw,1.15rem)] italic leading-[1.6] text-surface-muted">
          {content.missionIntro}
        </p>
      </header>

      <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
        {content.pillars.map((pillar) => (
          <StaggerItem key={pillar.title} className="h-full">
            <article className="about-mission-card group h-full">
              <div className="about-mission-icon">
                {(() => {
                  const Icon = resolveIcon(pillar.iconName);
                  return <Icon size={22} strokeWidth={1.5} aria-hidden />;
                })()}
              </div>
              <h3 className="about-mission-title">
                {pillar.title}
              </h3>
              <p className="about-mission-body">
                {pillar.description}
              </p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <article className="grid gap-6 lg:grid-cols-2">
        <section className="about-mission-pair-card">
          <h3 className="about-mission-pair-title">
            {content.whyNowHeading}
          </h3>
          <p className="about-mission-pair-body">
            {content.whyNowBody}
          </p>
        </section>
        <section className="about-mission-pair-card">
          <h3 className="about-mission-pair-title">
            {content.howWeWorkHeading}
          </h3>
          <p className="about-mission-pair-body">
            {content.howWeWorkBody}
          </p>
        </section>
      </article>
    </div>
  );
}

export default AboutMissionPage;
