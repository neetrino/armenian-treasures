import { getPublicDonators } from '@/lib/queries/donators';
import { groupDonatorsForHomeSection } from '@/lib/mappers/donations-patrons';
import { HOME_DONATIONS_PATRONS } from '@/lib/constants/home-donations-section';
import { DonationsPatronRow } from '@/components/sections/donations/DonationsPatronRow';

export async function DonationsPatronList() {
  const donators = await getPublicDonators();
  const patrons =
    donators.length > 0 ? groupDonatorsForHomeSection(donators) : HOME_DONATIONS_PATRONS;

  return (
    <div className="donations-patron-list">
      {patrons.map((patron) => (
        <DonationsPatronRow key={patron.id} patron={patron} />
      ))}
    </div>
  );
}
