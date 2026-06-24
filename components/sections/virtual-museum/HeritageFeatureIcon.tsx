import type { LucideIcon } from 'lucide-react';
import { Box, Headset, Landmark, Radio } from 'lucide-react';
import type { VirtualMuseumIconKey } from '@/lib/constants/virtual-museum';
import { VIRTUAL_MUSEUM_ICON_SOURCES } from '@/lib/constants/virtual-museum-icon-sources';
import {
  HERITAGE_ICON_GOLD_STROKE,
  HERITAGE_ICON_SVG_CLASS,
} from '@/components/sections/virtual-museum/heritage-feature-icon-styles';
import { cn } from '@/lib/utils';

const LUCIDE_ICONS = {
  tours: Headset,
  artefacts: Box,
  galleries: Landmark,
  events: Radio,
} satisfies Record<VirtualMuseumIconKey, LucideIcon>;

interface HeritageFeatureIconProps {
  name: VirtualMuseumIconKey;
  className?: string;
}

export function HeritageFeatureIcon({ name, className }: HeritageFeatureIconProps) {
  const Icon = LUCIDE_ICONS[name];
  const { iconSrc, sourceHref } = VIRTUAL_MUSEUM_ICON_SOURCES[name];

  return (
    <Icon
      className={cn(HERITAGE_ICON_SVG_CLASS, className)}
      strokeWidth={HERITAGE_ICON_GOLD_STROKE}
      aria-hidden
      data-icon-src={iconSrc}
      data-icon-source={sourceHref}
    />
  );
}
