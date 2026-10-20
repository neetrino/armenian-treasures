import Image from 'next/image';
import { CULTURAL_PORTAL_ICON_SOURCES } from '@/lib/constants/cultural-portal-icon-sources';
import type { CulturalPortalIconKey } from '@/lib/constants/cultural-portal';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { resolveMenuLucideIcon } from '@/lib/navigation/menu-icons';
import { cn } from '@/lib/utils';

interface CultureOrnamentalIconProps {
  iconKey: string;
  className?: string;
  size?: number;
}

function resolveIconSrc(iconKey: string): string | null {
  if (!(iconKey in CULTURAL_PORTAL_ICON_SOURCES)) return null;
  const key = iconKey as CulturalPortalIconKey;
  return CULTURAL_PORTAL_ICON_SOURCES[key].iconSrc;
}

/** Gold-toned culture icon using existing portal SVG assets. */
export function CultureOrnamentalIcon({
  iconKey,
  className,
  size = 16,
}: CultureOrnamentalIconProps) {
  const src = resolveIconSrc(iconKey);
  if (!src) {
    const Icon = resolveMenuLucideIcon(iconKey);
    return (
      <Icon
        className={cn('h-4 w-4 shrink-0 text-heritage-gold', className)}
        aria-hidden
        strokeWidth={1.6}
      />
    );
  }
  const resolvedSrc = resolvePublicAssetUrl(src);

  return (
    <span
      className={cn(
        'culture-ornamental-icon inline-flex shrink-0 items-center justify-center',
        className,
      )}
      aria-hidden
    >
      <Image
        src={resolvedSrc}
        alt=""
        width={size}
        height={size}
        className="culture-ornamental-icon__glyph"
      />
    </span>
  );
}
