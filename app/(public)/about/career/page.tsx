import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CareerCard } from '@/components/cards/CareerCard';
import { EmptyState } from '@/components/ui/EmptyState';
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
    <div className="flex flex-col gap-10">
      <header className="max-w-3xl">
        <Eyebrow>{content.careerEyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          {content.careerTitle}
        </h2>
        <p className="mt-5 text-base text-ink-soft sm:text-lg">{content.careerIntro}</p>
      </header>
      {careers.length === 0 ? (
        <EmptyState
          title="No open positions"
          description="Check back soon — we list every role here before announcing publicly."
        />
      ) : (
        <Stagger className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {careers.map((career) => (
            <StaggerItem key={career.id} className="h-full">
              <CareerCard career={career} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}

export default AboutCareerPage;
