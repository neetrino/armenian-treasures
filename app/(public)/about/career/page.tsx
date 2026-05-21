import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CareerCard } from '@/components/cards/CareerCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { getActiveCareers } from '@/lib/queries/careers';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Career',
  description: 'Join Armenian Treasures — open roles in digitization, engineering and research.',
};

async function AboutCareerPage() {
  const careers = await getActiveCareers();
  return (
    <div className="flex flex-col gap-10">
      <header className="max-w-3xl">
        <Eyebrow>Career</Eyebrow>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          Build the archive of a civilisation.
        </h2>
        <p className="mt-5 text-base text-ink-soft sm:text-lg">
          We are hiring engineers, drone pilots and cultural researchers across Yerevan, the
          regions and remote. Send us your work — we read every application.
        </p>
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
