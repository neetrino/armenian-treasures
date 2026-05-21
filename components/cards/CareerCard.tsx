import { Briefcase, MapPin, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { PublicCareerDTO } from '@/lib/dto';

interface CareerCardProps {
  career: PublicCareerDTO;
}

export function CareerCard({ career }: CareerCardProps) {
  const applyHref = career.applyUrl ?? (career.applyEmail ? `mailto:${career.applyEmail}` : null);
  return (
    <Card className="p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl text-ink">{career.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} aria-hidden /> {career.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase size={14} aria-hidden /> {career.employmentType}
            </span>
          </div>
        </div>
        <Badge tone="bronze">Open role</Badge>
      </div>
      {career.description ? (
        <p className="mt-5 text-sm leading-relaxed text-ink-soft">{career.description}</p>
      ) : null}
      {applyHref ? (
        <a
          href={applyHref}
          target={career.applyUrl ? '_blank' : undefined}
          rel={career.applyUrl ? 'noopener noreferrer' : undefined}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-pomegranate hover:underline"
        >
          Apply <ArrowRight size={14} aria-hidden />
        </a>
      ) : null}
    </Card>
  );
}
