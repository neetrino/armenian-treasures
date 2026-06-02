import Image from 'next/image';
import { cn } from '@/lib/utils';

const ICON_SRC = '/images/footer/support-heritage-icon.png';

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
