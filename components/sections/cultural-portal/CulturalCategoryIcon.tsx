import type { LucideIcon } from 'lucide-react';
import {
  BookMarked,
  Castle,
  Church,
  Clock,
  Crown,
  Drama,
  Feather,
  FlaskConical,
  Grid3x3,
  Hammer,
  Landmark,
  Music2,
  Orbit,
  Palette,
  Shirt,
  Star,
  Sword,
  Users,
  UsersRound,
  Wine,
} from 'lucide-react';
import type { CulturalPortalIconKey } from '@/lib/constants/cultural-portal';
import { CULTURAL_PORTAL_ICON_SOURCES } from '@/lib/constants/cultural-portal-icon-sources';
import {
  CULTURAL_PORTAL_ICON_BADGE_CLASS,
  CULTURAL_PORTAL_ICON_SVG_CLASS,
} from '@/components/sections/cultural-portal/cultural-portal-icon-styles';
import { cn } from '@/lib/utils';

const LUCIDE_ICONS = {
  churches: Church,
  castles: Castle,
  legends: Star,
  mythology: Orbit,
  museums: Landmark,
  kings: Crown,
  scientists: FlaskConical,
  famousArmenians: Users,
  history: Clock,
  paintings: Palette,
  music: Music2,
  writers: Feather,
  taraz: Shirt,
  carpets: Grid3x3,
  sculptors: Hammer,
  foodDrink: Wine,
  dance: UsersRound,
  theatre: Drama,
  armaments: Sword,
  publications: BookMarked,
} satisfies Record<CulturalPortalIconKey, LucideIcon>;

interface CulturalCategoryIconProps {
  type: CulturalPortalIconKey;
  className?: string;
}

export function CulturalCategoryIcon({ type, className }: CulturalCategoryIconProps) {
  const Icon = LUCIDE_ICONS[type];
  const { iconSrc, sourceHref } = CULTURAL_PORTAL_ICON_SOURCES[type];

  return (
    <div className={cn(CULTURAL_PORTAL_ICON_BADGE_CLASS, className)} aria-hidden>
      <Icon
        className={CULTURAL_PORTAL_ICON_SVG_CLASS}
        strokeWidth={1.6}
        aria-hidden
        data-icon-src={iconSrc}
        data-icon-source={sourceHref}
      />
    </div>
  );
}
