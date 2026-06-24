import { cn } from '@/lib/utils';
import type { VirtualMuseumIconKey } from '@/lib/constants/virtual-museum';
import { HeritageFeatureIcon } from '@/components/sections/virtual-museum/HeritageFeatureIcon';
import { HERITAGE_ICON_BADGE_CLASS } from '@/components/sections/virtual-museum/heritage-feature-icon-styles';

interface VirtualMuseumIconBadgeProps {
  icon: VirtualMuseumIconKey;
  className?: string;
}

export function VirtualMuseumIconBadge({ icon, className }: VirtualMuseumIconBadgeProps) {
  return (
    <div className={cn(HERITAGE_ICON_BADGE_CLASS, className)} aria-hidden>
      <HeritageFeatureIcon name={icon} />
    </div>
  );
}
