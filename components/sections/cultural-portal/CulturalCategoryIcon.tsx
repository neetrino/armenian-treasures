import Image from 'next/image';
import type { CulturalPortalIconKey } from '@/lib/constants/cultural-portal';
import { CULTURAL_PORTAL_ICON_SOURCES } from '@/lib/constants/cultural-portal-icon-sources';
import {
  CULTURAL_PORTAL_ICON_BADGE_CLASS,
  CULTURAL_PORTAL_ICON_BADGED_IMAGE_CLASS,
  CULTURAL_PORTAL_ICON_SVG_CLASS,
} from '@/components/sections/cultural-portal/cultural-portal-icon-styles';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { cn } from '@/lib/utils';

interface CulturalCategoryIconProps {
  type: CulturalPortalIconKey;
  className?: string;
  withBadge?: boolean;
  iconClassName?: string;
}

export function CulturalCategoryIcon({
  type,
  className,
  withBadge = true,
  iconClassName,
}: CulturalCategoryIconProps) {
  const { iconSrc, sourceHref } = CULTURAL_PORTAL_ICON_SOURCES[type];
  const resolvedIconSrc = resolvePublicAssetUrl(iconSrc);
  const resolvedIconClass = withBadge
    ? cn(CULTURAL_PORTAL_ICON_BADGED_IMAGE_CLASS, iconClassName)
    : cn(CULTURAL_PORTAL_ICON_SVG_CLASS, iconClassName);
  const icon = (
    withBadge ? (
      <Image
        src={resolvedIconSrc}
        alt=""
        width={82}
        height={82}
        sizes="82px"
        unoptimized
        className={resolvedIconClass}
        aria-hidden
        data-icon-src={iconSrc}
        data-icon-source={sourceHref}
      />
    ) : (
      <Image
        src={resolvedIconSrc}
        alt=""
        fill
        sizes="(max-width: 379px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 20vw"
        unoptimized
        className={resolvedIconClass}
        aria-hidden
        data-icon-src={iconSrc}
        data-icon-source={sourceHref}
      />
    )
  );

  if (!withBadge) {
    return icon;
  }

  return (
    <div className={cn(CULTURAL_PORTAL_ICON_BADGE_CLASS, className)} aria-hidden>
      {icon}
    </div>
  );
}
