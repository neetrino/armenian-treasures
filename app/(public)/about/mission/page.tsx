import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PillarCard } from '@/components/cards/PillarCard';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { getAboutContent } from '@/lib/queries/about';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Mission',
  description:
    'Three pillars guide Armenian Treasures: digitization, scholarship and accessibility for the Armenian world.',
};

async function AboutMissionPage() {
  const content = await getAboutContent();
  return (
    <div className="flex flex-col gap-10">
      <header className="max-w-3xl">
        <Eyebrow>{content.missionEyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          {content.missionTitle}
        </h2>
        <p className="mt-5 text-base text-ink-soft sm:text-lg">{content.missionIntro}</p>
      </header>
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {content.pillars.map((pillar) => (
          <StaggerItem key={pillar.title} className="h-full">
            <PillarCard
              title={pillar.title}
              description={pillar.description}
              iconName={pillar.iconName}
            />
          </StaggerItem>
        ))}
      </Stagger>
      <article className="prose prose-stone max-w-3xl prose-headings:font-display prose-headings:text-ink prose-p:text-ink-soft">
        <h3>{content.whyNowHeading}</h3>
        <p>{content.whyNowBody}</p>
        <h3>{content.howWeWorkHeading}</h3>
        <p>{content.howWeWorkBody}</p>
      </article>
    </div>
  );
}

export default AboutMissionPage;
