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
      className="mt-3 flex w-full max-w-[9.5rem] items-center justify-center gap-2 sm:mt-3.5"
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
        'relative mt-5 flex w-full items-center rounded-full border px-4 py-2.5 sm:mt-6 sm:px-5 sm:py-2.5',
        theme.tagPill,
      )}
    >
      <HeritageCrossMark className={cn('absolute left-4 sm:left-5', theme.tagMark)} />
      <p
        className={cn(
          'w-full text-center text-[0.625rem] font-medium uppercase tracking-[0.15em] sm:text-[0.6875rem] sm:tracking-[0.17em]',
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
        className="absolute -bottom-px left-1/2 h-9 w-[112%] -translate-x-1/2 rounded-[100%] bg-parchment-50 sm:h-10"
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
        'group relative grid h-full min-h-[27rem] grid-rows-[minmax(10.75rem,42%)_1fr] overflow-hidden rounded-[1.375rem] border bg-parchment-50 transition-[transform,box-shadow,border-color] duration-500 ease-cinematic sm:min-h-[28.5rem] sm:rounded-[1.625rem] lg:min-h-[30rem] lg:rounded-[1.75rem]',
        theme.cardBorder,
        theme.cardBorderHover,
        theme.cardShadow,
        theme.cardHoverShadow,
        'hover:-translate-y-[6px]',
      )}
    >
      <div className="relative min-h-[10.75rem] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition duration-700 ease-cinematic group-hover:scale-[1.04]"
        />
        <ImageFadeOverlay accent={accent} />
      </div>

      <div className="relative flex h-full flex-col items-center bg-parchment-50 px-5 pb-6 pt-[3.5rem] text-center sm:px-6 sm:pb-7 sm:pt-[3.75rem] lg:px-7 lg:pb-8">
        <div
          className={cn(
            'absolute left-1/2 top-0 z-10 flex h-[4.125rem] w-[4.125rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-parchment-50 shadow-[0_10px_28px_-8px_rgba(26,23,20,0.38)] transition-[box-shadow,transform] duration-500 ease-cinematic sm:h-[4.375rem] sm:w-[4.375rem] lg:h-[4.75rem] lg:w-[4.75rem]',
            theme.badge,
            theme.badgeRing,
            theme.badgeGlow,
            'group-hover:scale-[1.03]',
          )}
        >
          <Icon size={24} strokeWidth={1.45} aria-hidden />
        </div>

        <Image
          src={CARD_ORNAMENT}
          alt=""
          width={36}
          height={10}
          className={cn('h-2 w-9 object-contain object-center', theme.ornament)}
          aria-hidden
        />

        <h3 className="mt-2.5 max-w-[17rem] font-display text-[1.3125rem] leading-[1.2] tracking-tight text-ink sm:max-w-none sm:text-[1.5rem] lg:text-[1.625rem]">
          {title}
        </h3>

        <CardTitleDivider accent={accent} />

        <p className="mt-3.5 max-w-[19rem] flex-1 text-[0.9375rem] leading-[1.7] text-ink-soft sm:mt-4 sm:max-w-[21rem] sm:text-base sm:leading-[1.68]">
          {description}
        </p>

        <CardTagPill tags={tags} accent={accent} />
      </div>
    </article>
  );
}
