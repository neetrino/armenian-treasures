import Image from 'next/image';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import Link from 'next/link';
import { Box, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { PublicCultureItemDTO } from '@/lib/dto';

interface CultureItemCardProps {
  item: PublicCultureItemDTO;
  href?: string;
  className?: string;
}

export function CultureItemCard({ item, href, className }: CultureItemCardProps) {
  const imageElement = (
    <div className="aspect-[4/3] w-full">
      <Image
        src={item.image ? resolvePublicAssetUrl(item.image) : resolvePublicAssetUrl('/images/placeholder.svg')}
        alt={item.title}
        width={800}
        height={600}
        className="h-full w-full object-cover transition duration-700 ease-cinematic group-hover:scale-[1.03]"
      />
    </div>
  );
  return (
    <Card as="article" className={cn('group p-0', href && 'cursor-pointer', className)}>
      <div className="relative overflow-hidden rounded-t-2xl bg-stone-100">
        {href ? (
          <Link href={href} className="block">
            {imageElement}
          </Link>
        ) : (
          imageElement
        )}
        {item.tourUrl ? (
          <Badge tone="bronze" className="absolute left-3 top-3 backdrop-blur">
            <Box size={12} aria-hidden /> 3D Tour
          </Badge>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-eyebrow text-bronze-700">
          {item.region ? (
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} aria-hidden /> {item.region}
            </span>
          ) : null}
          {item.periodLabel ? <span>· {item.periodLabel}</span> : null}
        </div>
        {href ? (
          <Link href={href} className="font-display text-xl text-ink transition hover:text-pomegranate">
            {item.title}
          </Link>
        ) : (
          <h3 className="font-display text-xl text-ink">{item.title}</h3>
        )}
        {item.description ? (
          <p className="text-sm leading-relaxed text-ink-soft line-clamp-3">{item.description}</p>
        ) : null}
      </div>
    </Card>
  );
}
