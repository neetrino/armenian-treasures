import { getPublicDonators } from '@/lib/queries/donators';
import { groupDonatorsForHomeSection } from '@/lib/mappers/donations-patrons';
import { DonationsPatronRow } from '@/components/sections/donations/DonationsPatronRow';
import { EmptyState } from '@/components/ui/EmptyState';

export async function DonationsPatronList() {
  const donators = await getPublicDonators();

  if (donators.length === 0) {
    return (
      <EmptyState
        title="No patrons listed yet"
        description="Public donators will appear here once curators publish them in the admin panel."
      />
    );
  }

  const patrons = groupDonatorsForHomeSection(donators);

  return (
    <div className="donations-patron-list">
      {patrons.map((patron) => (
        <DonationsPatronRow key={patron.id} patron={patron} />
      ))}
    </div>
  );
}
