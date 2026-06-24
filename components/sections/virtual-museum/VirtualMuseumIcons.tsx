import { Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

export function ImmersiveTechBadgeIcon({ className }: IconProps) {
  return (
    <Video
      className={cn('relative -top-px h-3.5 w-3.5 shrink-0 text-heritage-gold', className)}
      strokeWidth={1.5}
      aria-hidden
    />
  );
}
