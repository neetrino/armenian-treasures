'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { CulturePortalTitleDivider } from '@/components/sections/culture/CulturePortalTitleDivider';
import { cn } from '@/lib/utils';

interface CulturePortalSectionIntroProps {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  showCta?: boolean;
  className?: string;
}

function HeritageDiamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={className} aria-hidden>
      <path fill="currentColor" d="M4 0 4.8 3.2 8 4 4.8 4.8 4 8 3.2 4.8 0 4 3.2 3.2 4 0Z" />
    </svg>
  );
}

function DefaultTitle() {
  return (
    <>
      Eleven living domains of{' '}
      <span className="italic text-bronze-600">Armenian heritage</span>
    </>
  );
}

export function CulturePortalSectionIntro({
  eyebrow = 'Culture Portal',
  title,
  description = 'From cliff-top monasteries to UNESCO-recognised bread — explore curated entry points to every part of the archive.',
  showCta = true,
  className,
}: CulturePortalSectionIntroProps) {
  return (
    <Stagger
      stagger={0.1}
      className={cn(
        'relative z-10 mx-auto flex max-w-[44rem] flex-col items-center gap-3 text-center sm:gap-4',
        className,
      )}
    >
      <StaggerItem>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-2 text-bronze/70" aria-hidden>
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-bronze/55 sm:w-10" />
            <HeritageDiamond className="h-1.5 w-1.5 shrink-0" />
          </span>
          <span className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bronze sm:text-xs sm:tracking-[0.24em]">
            {eyebrow}
          </span>
          <span className="flex items-center gap-2 text-bronze/70" aria-hidden>
            <HeritageDiamond className="h-1.5 w-1.5 shrink-0" />
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-bronze/55 sm:w-10" />
          </span>
        </div>
      </StaggerItem>

      <StaggerItem>
        <h2
          id="culture-portal-heading"
          className="max-w-[18ch] font-display text-[clamp(2rem,4.8vw,3.25rem)] leading-[1.14] tracking-tight text-ink sm:max-w-none sm:leading-[1.1]"
        >
          {title ?? <DefaultTitle />}
        </h2>
      </StaggerItem>

      <StaggerItem>
        <CulturePortalTitleDivider />
      </StaggerItem>

      <StaggerItem>
        <p className="max-w-[38rem] text-[0.9375rem] leading-[1.68] text-ink-soft sm:text-base sm:leading-[1.72]">
          {description}
        </p>
      </StaggerItem>

      {showCta ? (
        <StaggerItem className="pt-1">
          <Link
            href="/culture"
            className="group inline-flex items-center gap-2.5 rounded-full border border-pomegranate/20 bg-white/70 px-5 py-2.5 text-sm font-medium text-pomegranate shadow-[0_2px_16px_-6px_rgba(126,28,38,0.18)] backdrop-blur-sm transition duration-300 hover:border-pomegranate/35 hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(126,28,38,0.22)]"
          >
            View the full portal
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              aria-hidden
              className="transition duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </StaggerItem>
      ) : null}
    </Stagger>
  );
}
