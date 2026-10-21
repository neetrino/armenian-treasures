import { resolveMenuLucideIcon } from '@/lib/navigation/menu-icons';
import { cn } from '@/lib/utils';

interface CultureOrnamentalIconProps {
  iconKey: string;
  className?: string;
  size?: number;
}

/** Gold line icon for a culture menu item. Raster portal assets fill in as a square. */
export function CultureOrnamentalIcon({
  iconKey,
  className,
  size = 16,
}: CultureOrnamentalIconProps) {
  const Icon = resolveMenuLucideIcon(iconKey);
  return (
    <Icon
      className={cn('shrink-0 text-heritage-gold', className)}
      size={size}
      aria-hidden
      strokeWidth={1.6}
    />
  );
}
