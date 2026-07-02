import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { getAboutContent } from '@/lib/queries/about';
import { getActiveTeam } from '@/lib/queries/team';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

export const metadata = buildPublicPageMetadata({
  title: 'Team',
  description: 'The researchers, engineers and curators behind Armenian Treasures.',
  pathname: '/about/team',
});

async function AboutTeamPage() {
  const [members, content] = await Promise.all([getActiveTeam(), getAboutContent()]);
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-12">
      <header className="max-w-4xl">
        <p className="mb-3 font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
          {content.teamEyebrow}
        </p>
        <h2 className="font-cinzel text-[clamp(2.2rem,4vw,4rem)] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-heritage-gold">
          {content.teamTitle}
        </h2>
        <p className="mt-4 font-display text-[clamp(1rem,1.25vw,1.15rem)] italic leading-[1.6] text-surface-muted">
          {content.teamIntro}
        </p>
      </header>

      {members.length === 0 ? (
        <div className="border border-dashed border-surface bg-[var(--surface-card-bg)] px-6 py-14 text-center">
          <h3 className="font-cinzel text-xl font-extrabold uppercase tracking-[0.03em] text-heritage-gold">
            Team members coming soon
          </h3>
          <p className="mt-3 font-display text-sm text-surface-body">
            Once the database is seeded, the team page will populate here automatically.
          </p>
        </div>
      ) : (
        <Stagger className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {members.map((member) => (
            <StaggerItem key={member.id} className="h-full">
              <article className="about-team-card group h-full">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="about-team-avatar"
                  >
                    {member.initials}
                  </span>
                  <div>
                    <h3 className="about-team-name">
                      {member.name}
                    </h3>
                    <p className="about-team-role">
                      {member.position}
                    </p>
                  </div>
                </div>
                {member.bio ? (
                  <p className="about-team-bio">
                    {member.bio}
                  </p>
                ) : null}
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}

export default AboutTeamPage;
