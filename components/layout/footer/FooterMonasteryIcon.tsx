import Image from 'next/image';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { cn } from '@/lib/utils';

const ICON_SRC = resolvePublicAssetUrl('/images/footer/support-heritage-icon.png');

interface FooterMonasteryIconProps {
  className?: string;
}

export function FooterMonasteryIcon({ className }: FooterMonasteryIconProps) {
  return (
    <div className={cn('relative mx-auto aspect-square w-20', className)} aria-hidden>
      <Image
        src={ICON_SRC}
        alt=""
        fill
        sizes="80px"
        className="object-contain"
        priority={false}
      />
    </div>
  );
}
