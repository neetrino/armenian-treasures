import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PillarCard } from '@/components/cards/PillarCard';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export const metadata: Metadata = {
  title: 'Mission',
  description:
    'Three pillars guide Armenian Treasures: digitization, scholarship and accessibility for the Armenian world.',
};

const PILLARS = [
  {
    title: 'Permanent digitization',
    description:
      'Every monument we visit becomes a redundant, open digital twin — secured against erosion, conflict and time.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Curated scholarship',
    description:
      'Each entry is researched and cross-checked with Armenian academic institutions, then published with full citations.',
    iconName: 'BookOpen',
  },
  {
    title: 'Open access for everyone',
    description:
      'The archive is free for scholars, teachers, students and the diaspora — released under Creative Commons whenever possible.',
    iconName: 'Globe2',
  },
];

function AboutMissionPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="max-w-3xl">
        <Eyebrow>Mission</Eyebrow>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          A permanent, open digital memory of Armenia.
        </h2>
        <p className="mt-5 text-base text-ink-soft sm:text-lg">
          We work alongside the Ministry of Education, Science, Culture and Sports of Armenia, the
          Mother See of Holy Etchmiadzin, the Matenadaran, regional museums and a community of
          diaspora partners to preserve the country&apos;s cultural memory at archival quality.
        </p>
      </header>
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {PILLARS.map((pillar) => (
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
        <h3>Why now</h3>
        <p>
          Armenia preserves more than 24,000 monuments above ground and an order of magnitude more
          beneath. Each year, weathering, neglect and conflict claim irreplaceable detail. A
          high-resolution digital twin — accessible, redundant, free — is the only way to ensure
          that the work of medieval masons, scribes and weavers reaches the next thousand years.
        </p>
        <h3>How we work</h3>
        <p>
          Fieldwork is led by certified Matterport operators and drone pilots, supported by
          architectural historians. Captured data is processed, annotated and reviewed by our
          curators before being added to the public archive.
        </p>
      </article>
    </div>
  );
}

export default AboutMissionPage;
