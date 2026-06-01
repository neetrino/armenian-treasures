import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ACCENT_THEME,
  type TechAccent,
} from '@/components/sections/technology/technology-data';

const DIVIDER_SRC = '/images/technology/divider-decoration.png';

interface TechCardProps {
  title: string;
  description: string;
  iconName: string;
  imageSrc: string;
  imageAlt: string;
  accent: TechAccent;
}

function resolveIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Sparkles;
}

function CardFooterOrnament({ accent }: { accent: TechAccent }) {
  const stroke =
    accent === 'copper'
      ? 'rgba(200,132,61,0.14)'
      : accent === 'emerald'
        ? 'rgba(6,78,59,0.12)'
        : 'rgba(180,120,30,0.14)';

  return (
    <svg
      className="absolute bottom-3 right-4 h-16 w-24 opacity-80 sm:h-20 sm:w-28"
      viewBox="0 0 96 64"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke={stroke} strokeWidth="0.75">
        <path d="M8 48 Q48 8 88 48" />
        <path d="M16 52 Q48 20 80 52" />
        <circle cx="48" cy="32" r="10" />
        <path d="M24 56 L48 40 L72 56" />
      </g>
    </svg>
  );
}

export function TechCard({
  title,
  description,
  iconName,
  imageSrc,
  imageAlt,
  accent,
}: TechCardProps) {
  const Icon = resolveIcon(iconName);
  const theme = ACCENT_THEME[accent];

  return (
    <article
      className={cn(
        'group relative flex h-full min-h-[23rem] flex-col overflow-hidden rounded-[1.5rem] border bg-parchment-50 shadow-card transition duration-300 ease-cinematic sm:min-h-[25rem] sm:rounded-[1.65rem] lg:min-h-[25rem] lg:rounded-[1.75rem]',
        theme.cardBorder,
        theme.cardBorderHover,
        'hover:-translate-y-1 hover:shadow-card-hover',
      )}
    >
      <div className="relative h-[12.25rem] shrink-0 overflow-hidden sm:h-[13.25rem] lg:h-[14.25rem]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center scale-[1.08] transition duration-500 ease-cinematic group-hover:scale-[1.12]"
        />
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent',
            theme.imageFade,
          )}
        />
      </div>

      <div
        className={cn(
          'relative flex flex-1 flex-col items-center gap-1 px-6 pb-8 pt-14 text-center sm:px-7 sm:pb-9 sm:pt-[3.75rem]',
          'bg-gradient-to-b to-parchment-50',
          theme.footerTint,
        )}
      >
        <div
          className={cn(
            'absolute left-1/2 top-0 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-parchment-50 shadow-md ring-2 transition duration-300 ease-cinematic',
            theme.badge,
            theme.badgeRing,
            theme.badgeGlow,
          )}
        >
          <Icon size={22} strokeWidth={1.5} aria-hidden />
        </div>

        <h3 className="max-w-[18rem] font-display text-xl leading-tight text-ink sm:max-w-none sm:text-2xl">
          {title}
        </h3>

        <div className="mt-4 flex flex-col items-center gap-2.5 sm:mt-5">
          <div
            className={cn(
              'h-px w-14 bg-gradient-to-r from-transparent to-transparent',
              theme.divider,
            )}
          />
          <Image
            src={DIVIDER_SRC}
            alt=""
            width={48}
            height={12}
            className="h-3 w-12 object-contain opacity-55"
            aria-hidden
          />
        </div>

        <p className="mt-4 max-w-[17.5rem] text-sm leading-[1.65] text-ink-soft sm:mt-5 sm:max-w-[19rem] sm:text-[0.9375rem] sm:leading-[1.7]">
          {description}
        </p>

        <CardFooterOrnament accent={accent} />
      </div>
    </article>
  );
}
