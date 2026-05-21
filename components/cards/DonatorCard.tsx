import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { PublicDonatorDTO } from '@/lib/dto';

interface DonatorCardProps {
  donator: PublicDonatorDTO;
}

export function DonatorCard({ donator }: DonatorCardProps) {
  return (
    <Card as="article" className="p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg text-ink">{donator.name}</h3>
        {donator.year ? (
          <Badge tone="stone" className="bg-bronze-500/10 text-bronze-700">
            {donator.year}
          </Badge>
        ) : null}
      </div>
      <p className="mt-1 text-xs uppercase tracking-eyebrow text-bronze-700">{donator.type}</p>
      {donator.description ? (
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{donator.description}</p>
      ) : null}
    </Card>
  );
}
