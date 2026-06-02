import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ACCENT_THEME,
  type TechAccent,
} from '@/components/sections/technology/technology-data';

const CARD_ORNAMENT = '/images/technology/divider-decoration.png';

interface TechnologyCardProps {
  title: string;
  description: string;
  iconName: string;
  imageSrc: string;
  imageAlt: string;
  accent: TechAccent;
  tags: readonly string[];
}

function resolveIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Sparkles;
}

function HeritageCrossMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn('h-2.5 w-2.5 shrink-0', className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M6 0 6.55 4.45 11 5 6.55 5.55 6 11 5.45 5.55 1 5 5.45 4.45 6 0Z"
      />
      <circle cx="6" cy="6" r="1.1" fill="currentColor" />
    </svg>
  );
}

function CardTitleDivider({ accent }: { accent: TechAccent }) {
  const theme = ACCENT_THEME[accent];

  return (
    <div
      className="mt-1.5 flex w-full max-w-[7rem] items-center justify-center gap-1 sm:mt-2"
      aria-hidden
    >
      <span
        className={cn('h-px flex-1 bg-gradient-to-r from-transparent', theme.dividerLine)}
      />
      <span className={cn('h-1 w-1 shrink-0 rounded-full', theme.dividerDot)} />
      <span
        className={cn('h-px flex-1 bg-gradient-to-l from-transparent', theme.dividerLine)}
      />
    </div>
  );
}

function CardTagPill({ tags, accent }: { tags: readonly string[]; accent: TechAccent }) {
  const theme = ACCENT_THEME[accent];

  return (
    <div
      className={cn(
        'relative mt-2 flex w-full items-center rounded-full border px-3 py-1 sm:mt-2.5 sm:px-3.5 sm:py-1.5',
        theme.tagPill,
      )}
    >
      <HeritageCrossMark className={cn('absolute left-3.5 sm:left-4', theme.tagMark)} />
      <p
        className={cn(
          'w-full text-center text-[0.5625rem] font-medium uppercase tracking-[0.14em] sm:text-[0.625rem] sm:tracking-[0.15em]',
          theme.tagText,
        )}
      >
        {tags.join(' • ')}
      </p>
    </div>
  );
}

function ImageFadeOverlay({ accent }: { accent: TechAccent }) {
  const theme = ACCENT_THEME[accent];

  return (
    <>
      <div className={cn('absolute inset-0 bg-gradient-to-b', theme.imageWarmth)} />
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t',
          theme.imageAccentWash,
          'to-transparent',
        )}
      />
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t',
          theme.imageFade,
        )}
      />
      <div
        className="absolute -bottom-px left-1/2 h-6 w-[112%] -translate-x-1/2 rounded-[100%] bg-parchment-50 sm:h-7"
        aria-hidden
      />
    </>
  );
}

export function TechnologyCard({
  title,
  description,
  iconName,
  imageSrc,
  imageAlt,
  accent,
  tags,
}: TechnologyCardProps) {
  const Icon = resolveIcon(iconName);
  const theme = ACCENT_THEME[accent];

  return (
    <article
      className={cn(
        'group relative grid h-full min-h-[17rem] grid-rows-[minmax(6.25rem,34%)_1fr] overflow-hidden rounded-[1rem] border bg-parchment-50 transition-[transform,box-shadow,border-color] duration-500 ease-cinematic sm:min-h-[18rem] sm:rounded-[1.125rem] lg:min-h-[19rem] lg:rounded-[1.25rem]',
        theme.cardBorder,
        theme.cardBorderHover,
        theme.cardShadow,
        theme.cardHoverShadow,
        'hover:-translate-y-1',
      )}
    >
      <div className="relative min-h-[6.25rem] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition duration-700 ease-cinematic group-hover:scale-[1.04]"
        />
        <ImageFadeOverlay accent={accent} />
      </div>

      <div className="relative flex h-full flex-col items-center bg-parchment-50 px-3.5 pb-3.5 pt-[2.125rem] text-center sm:px-4 sm:pb-3.5 sm:pt-[2.25rem] lg:px-4 lg:pb-4">
        <div
          className={cn(
            'absolute left-1/2 top-0 z-10 flex h-[2.875rem] w-[2.875rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-parchment-50 shadow-[0_6px_18px_-8px_rgba(26,23,20,0.32)] transition-[box-shadow,transform] duration-500 ease-cinematic sm:h-[3rem] sm:w-[3rem] lg:h-[3.125rem] lg:w-[3.125rem]',
            theme.badge,
            theme.badgeRing,
            theme.badgeGlow,
            'group-hover:scale-[1.03]',
          )}
        >
          <Icon size={18} strokeWidth={1.45} aria-hidden />
        </div>

        <Image
          src={CARD_ORNAMENT}
          alt=""
          width={26}
          height={7}
          className={cn('h-1.5 w-6 object-contain object-center', theme.ornament)}
          aria-hidden
        />

        <h3 className="mt-1.5 max-w-[14rem] font-display text-[0.9375rem] leading-[1.18] tracking-tight text-ink sm:max-w-none sm:text-[1.0625rem] lg:text-[1.125rem]">
          {title}
        </h3>

        <CardTitleDivider accent={accent} />

        <p className="mt-2 max-w-[15rem] flex-1 text-[0.75rem] leading-[1.55] text-ink-soft sm:max-w-[16rem] sm:text-[0.8125rem] sm:leading-[1.5]">
          {description}
        </p>

        <CardTagPill tags={tags} accent={accent} />
      </div>
    </article>
  );
}
