import { HOME_DONATIONS_PATRONS } from '@/lib/constants/home-donations-section';
import { DonationsPatronRow } from '@/components/sections/donations/DonationsPatronRow';

export function DonationsPatronList() {
  return (
    <div className="donations-patron-list">
      {HOME_DONATIONS_PATRONS.map((patron) => (
        <DonationsPatronRow key={patron.label} patron={patron} />
      ))}
    </div>
  );
}
