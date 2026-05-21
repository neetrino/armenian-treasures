import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface TechCardProps {
  title: string;
  description: string;
  iconName: string;
}

function resolveIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Sparkles;
}

export function TechCard({ title, description, iconName }: TechCardProps) {
  const Icon = resolveIcon(iconName);
  return (
    <Card className="p-7">
      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-md bg-bronze-500/15 text-bronze-700">
        <Icon size={20} strokeWidth={1.5} aria-hidden />
      </div>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{description}</p>
    </Card>
  );
}
