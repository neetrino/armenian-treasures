import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ACCENT_THEME,
  type TechAccent,
} from '@/components/sections/technology/technology-data';

interface TechnologyCardProps {
  title: string;
  description: string;
  iconName: string;
  imageSrc: string;
  imageAlt: string;
  accent: TechAccent;
  tags: readonly string[];
  imageObjectClassName?: string;
  imageZoomClassName?: string;
  imageBackdropClassName?: string;
}

function DroneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 14v4" />
      <path d="M12 6V2" />
      <path d="M6 12H2" />
      <path d="M22 12h-4" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M5.5 5.5 8 8" />
      <path d="M16 8l2.5-2.5" />
      <path d="M16 16l2.5 2.5" />
      <path d="M5.5 18.5 8 16" />
      <circle cx="5.5" cy="5.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="5.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="18.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="5.5" cy="18.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

function resolveIcon(name: string): LucideIcon | null {
  if (name === 'Drone') return null;
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Sparkles;
}

function HeritageDiamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={cn('h-2.5 w-2.5 shrink-0', className)} aria-hidden>
      <rect
        x="5"
        y="1.15"
        width="5.4"
        height="5.4"
        rx="0.35"
        transform="rotate(45 5 5)"
        fill="currentColor"
      />
    </svg>
  );
}

function CardTitleDivider({ accent }: { accent: TechAccent }) {
  const theme = ACCENT_THEME[accent];

  return (
    <div className="mt-2 flex w-full max-w-[6.5rem] items-center justify-center gap-1.5" aria-hidden>
      <span className={cn('h-px flex-1 bg-gradient-to-r from-transparent', theme.dividerLine)} />
      <HeritageDiamond className={theme.dividerDiamond} />
      <span className={cn('h-px flex-1 bg-gradient-to-l from-transparent', theme.dividerLine)} />
    </div>
  );
}

function CardTagPill({ tags, accent }: { tags: readonly string[]; accent: TechAccent }) {
  const theme = ACCENT_THEME[accent];

  return (
    <p
      className={cn(
        'mt-auto inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-center text-[0.625rem] font-medium uppercase tracking-[0.14em] sm:text-[0.6875rem] sm:tracking-[0.16em]',
        theme.tagPill,
        theme.tagText,
      )}
    >
      {tags.join(' • ')}
    </p>
  );
}

function ImageWaveSeparator({ fill }: { fill: string }) {
  return (
    <svg
      viewBox="0 0 400 28"
      preserveAspectRatio="none"
      className="absolute -bottom-px left-0 z-[2] block h-6 w-full sm:h-7"
      aria-hidden
    >
      <path
        d="M0 18 C 80 4, 120 26, 200 14 C 280 2, 320 24, 400 10 L 400 28 L 0 28 Z"
        fill={fill}
      />
    </svg>
  );
}

function CardIcon({ iconName }: { iconName: string }) {
  if (iconName === 'Drone') {
    return <DroneIcon className="relative z-[1] h-[1.375rem] w-[1.375rem] sm:h-6 sm:w-6" />;
  }

  const Icon = resolveIcon(iconName)!;
  return <Icon size={22} strokeWidth={1.5} className="relative z-[1] sm:h-6 sm:w-6" aria-hidden />;
}

export function TechnologyCard({
  title,
  description,
  iconName,
  imageSrc,
  imageAlt,
  accent,
  tags,
  imageObjectClassName,
  imageZoomClassName,
  imageBackdropClassName,
}: TechnologyCardProps) {
  const theme = ACCENT_THEME[accent];

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border bg-[#fffdf8] transition-[transform,box-shadow,border-color] duration-[400ms] ease-cinematic motion-reduce:transition-none sm:rounded-[1.375rem] lg:rounded-[1.5rem]',
        theme.cardBorder,
        theme.cardBorderHover,
        theme.cardShadow,
        theme.cardHoverShadow,
        'hover:-translate-y-1 motion-reduce:hover:translate-y-0',
      )}
    >
      <div className="relative aspect-[7/4.5] w-full shrink-0 overflow-hidden">
        {imageBackdropClassName ? (
          <div className={cn('absolute inset-0 z-0', imageBackdropClassName)} aria-hidden />
        ) : null}
        <div
          className={cn(
            'absolute inset-0 z-[1] transition-transform duration-[400ms] ease-cinematic group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
            imageZoomClassName,
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn('h-full w-full object-cover object-center', imageObjectClassName)}
          />
        </div>
        <div className={cn('absolute inset-0 z-[2] bg-gradient-to-b', theme.imageCinematic)} />
        <div className={cn('absolute inset-0 z-[2] bg-gradient-to-t', theme.imageOverlay)} />
        <ImageWaveSeparator fill={theme.waveFill} />
      </div>

      <div className="relative flex flex-1 flex-col items-center px-5 pb-4 pt-9 text-center sm:px-6 sm:pb-5 sm:pt-10 lg:px-7 lg:pb-5 lg:pt-11">
        <div
          className={cn(
            'absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[#fffdf8] transition-[box-shadow,transform] duration-[400ms] ease-cinematic motion-reduce:transition-none',
            'h-[3.5rem] w-[3.5rem] sm:h-[4rem] sm:w-[4rem]',
            theme.badge,
            theme.badgeRing,
            theme.badgeGlow,
          )}
        >
          <CardIcon iconName={iconName} />
        </div>

        <h3 className="max-w-[16rem] font-display text-[1.125rem] leading-[1.22] tracking-tight text-[#2d2926] sm:text-[1.25rem] lg:text-[1.3125rem]">
          {title}
        </h3>

        <CardTitleDivider accent={accent} />

        <p className="mt-2 max-w-[18rem] flex-1 text-[0.8125rem] leading-[1.58] text-[#545454] sm:text-[0.875rem] sm:leading-[1.6]">
          {description}
        </p>

        <CardTagPill tags={tags} accent={accent} />
      </div>
    </article>
  );
}
