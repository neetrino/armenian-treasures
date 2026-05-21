import { Card } from '@/components/ui/Card';
import type { PublicTeamMemberDTO } from '@/lib/dto';

interface TeamCardProps {
  member: PublicTeamMemberDTO;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-pomegranate text-parchment-50 font-display text-xl"
        >
          {member.initials}
        </span>
        <div>
          <h3 className="font-display text-xl text-ink">{member.name}</h3>
          <p className="text-xs uppercase tracking-eyebrow text-bronze-700">{member.position}</p>
        </div>
      </div>
      {member.bio ? (
        <p className="mt-5 text-sm leading-relaxed text-ink-soft">{member.bio}</p>
      ) : null}
    </Card>
  );
}
