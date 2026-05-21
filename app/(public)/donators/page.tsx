import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { DonatorCard } from '@/components/cards/DonatorCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import type { PublicDonatorDTO } from '@/lib/dto';
import { getPublicDonators } from '@/lib/queries/donators';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Donators',
  description:
    'The patrons, foundations and institutions whose generosity makes the Armenian Treasures archive possible.',
};

const GROUP_ORDER = ['Founding Patron', 'Institutional', 'Patron', 'Academic'];

function groupDonators(donators: PublicDonatorDTO[]): Record<string, PublicDonatorDTO[]> {
  const map = new Map<string, PublicDonatorDTO[]>();
  for (const donator of donators) {
    const group = donator.type || 'Other';
    const existing = map.get(group) ?? [];
    existing.push(donator);
    map.set(group, existing);
  }
  const ordered: Record<string, PublicDonatorDTO[]> = {};
  for (const key of GROUP_ORDER) {
    const value = map.get(key);
    if (value) ordered[key] = value;
  }
  for (const [key, value] of map) {
    if (!ordered[key]) ordered[key] = value;
  }
  return ordered;
}

async function DonatorsPage() {
  const donators = await getPublicDonators();
  const groups = groupDonators(donators);
  return (
    <>
      <HeroPage
        eyebrow="Donators"
        title="The wall of patrons."
        description="The people, foundations and institutions whose support makes the open Armenian heritage archive possible."
      />
      <Container className="py-20 lg:py-28">
        {donators.length === 0 ? (
          <EmptyState
            title="No donators listed yet"
            description="Donators will appear here once curators publish them in the admin panel."
          />
        ) : (
          <div className="flex flex-col gap-16">
            {Object.entries(groups).map(([group, list]) => (
              <section key={group}>
                <Eyebrow>{group}</Eyebrow>
                <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
                  {group === 'Founding Patron'
                    ? 'Founding patrons'
                    : `${group} partners`}
                </h2>
                <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((donator) => (
                    <StaggerItem key={donator.id} className="h-full">
                      <DonatorCard donator={donator} />
                    </StaggerItem>
                  ))}
                </Stagger>
              </section>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

export default DonatorsPage;
