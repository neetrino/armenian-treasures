'use client';

import '@/components/sections/virtual-museum/virtual-museum-card.css';
import { cn } from '@/lib/utils';
import type { VirtualMuseumFeature } from '@/lib/constants/virtual-museum';
import { usePointerTilt } from '@/components/motion/usePointerTilt';
import { VirtualMuseumIconBadge } from '@/components/sections/virtual-museum/VirtualMuseumIconBadge';
import { VIRTUAL_MUSEUM_CARD_SURFACE_CLASS } from '@/components/sections/virtual-museum/virtual-museum-grid-styles';

interface VirtualMuseumCardProps extends VirtualMuseumFeature {
  className?: string;
}

const STATUS_STYLES: Record<
  VirtualMuseumFeature['badgeTone'],
  { text: string; border: string }
> = {
  teal: {
    text: 'text-heritage-teal',
    border: 'border-[rgba(39,198,200,0.32)]',
  },
  gold: {
    text: 'text-heritage-gold',
    border: 'border-[rgba(214,184,90,0.24)]',
  },
};

export function VirtualMuseumCard({
  number,
  icon,
  badge,
  badgeTone,
  title,
  description,
  className,
}: VirtualMuseumCardProps) {
  const status = STATUS_STYLES[badgeTone];
  const { groupRef, cardRef, onMouseMove, onMouseLeave } = usePointerTilt({ maxTilt: 8 });

  return (
    <div
      ref={groupRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('virtual-museum-card-group group relative h-full', className)}
    >
      <article
        ref={cardRef}
        tabIndex={0}
        className={cn(VIRTUAL_MUSEUM_CARD_SURFACE_CLASS, 'outline-none')}
      >
        <span
          aria-hidden
          className="virtual-museum-card__grid pointer-events-none absolute inset-[1px] z-0 bg-hero-diamond-grid"
        />

        <div className="virtual-museum-card__content relative z-[2] flex flex-col items-start text-left">
          <VirtualMuseumIconBadge icon={icon} />

          <span
            data-tone={badgeTone}
            className={cn(
              'virtual-museum-card__badge inline-flex h-[22px] w-fit items-center border bg-[rgba(214,184,90,0.055)] px-3.5',
              'mb-[18px] font-cinzel text-[8px] font-extrabold uppercase tracking-[0.2em] transition-[border-color,background] duration-[320ms] ease-out sm:text-[9px]',
              status.text,
              status.border,
            )}
          >
            {badge}
          </span>

          <h3 className="virtual-museum-card__title mb-4 font-cinzel text-[clamp(1.125rem,1.35vw,1.5rem)] font-extrabold uppercase leading-[1.1] tracking-[0.04em] text-heritage-gold transition-colors duration-[320ms] ease-out">
            {title}
          </h3>

          <p className="virtual-museum-card__description max-w-[29.375rem] font-display text-[clamp(0.875rem,0.95vw,1.0625rem)] italic leading-[1.48] text-surface-body transition-colors duration-[320ms] ease-out">
            {description}
          </p>
        </div>

        <span
          aria-hidden
          className="virtual-museum-card__watermark pointer-events-none absolute bottom-[26px] right-7 z-[1] select-none font-cinzel text-[4rem] font-extrabold leading-none text-[rgba(214,184,90,0.035)] transition-colors duration-[320ms] ease-out sm:text-[clamp(4rem,5vw,5.75rem)]"
        >
          {number}
        </span>
      </article>
    </div>
  );
}
