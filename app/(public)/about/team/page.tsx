import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TeamCard } from '@/components/cards/TeamCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { getAboutContent } from '@/lib/queries/about';
import { getActiveTeam } from '@/lib/queries/team';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Team',
  description: 'The researchers, engineers and curators behind Armenian Treasures.',
};

async function AboutTeamPage() {
  const [members, content] = await Promise.all([getActiveTeam(), getAboutContent()]);
  return (
    <div className="flex flex-col gap-10">
      <header className="max-w-3xl">
        <Eyebrow>{content.teamEyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          {content.teamTitle}
        </h2>
        <p className="mt-5 text-base text-ink-soft sm:text-lg">{content.teamIntro}</p>
      </header>
      {members.length === 0 ? (
        <EmptyState
          title="Team members coming soon"
          description="Once the database is seeded, the team page will populate here automatically."
        />
      ) : (
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {members.map((member) => (
            <StaggerItem key={member.id} className="h-full">
              <TeamCard member={member} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}

export default AboutTeamPage;
