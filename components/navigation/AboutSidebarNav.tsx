'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ABOUT_TABS } from './primary-links';
import { cn } from '@/lib/utils';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { aboutMenuLabel } from '@/lib/i18n/ui-chrome';

export interface AboutShortcutImages {
  mission?: string | null;
  team?: string | null;
  career?: string | null;
  contact?: string | null;
}

interface AboutSidebarNavProps {
  shortcutImages?: AboutShortcutImages;
  locale?: SiteLocaleCode;
}

function imageForHref(href: string, images: AboutShortcutImages): string | null {
  if (href.startsWith('/about/mission')) return images.mission?.trim() || null;
  if (href.startsWith('/about/team')) return images.team?.trim() || null;
  if (href.startsWith('/about/career')) return images.career?.trim() || null;
  if (href.startsWith('/contacts')) return images.contact?.trim() || null;
  return null;
}

export function AboutSidebarNav({ shortcutImages = {}, locale = 'EN' }: AboutSidebarNavProps) {
  const pathname = usePathname();
  return (
    <nav aria-label="About sections" className="w-full">
      <ul className="flex flex-wrap justify-center gap-2 pb-2 lg:gap-2.5 lg:pb-0">
        {ABOUT_TABS.map((tab) => {
          const active = pathname?.startsWith(tab.href);
          const background = imageForHref(tab.href, shortcutImages);
          return (
            <li key={tab.href} className="flex-shrink-0">
              <Link
                href={tab.href}
                style={
                  background
                    ? { backgroundImage: `url(${resolvePublicAssetUrl(background)})` }
                    : undefined
                }
                className={cn(
                  'inline-flex min-w-[9.5rem] items-center justify-center border bg-cover bg-center px-4 py-3 font-cinzel text-[11px] font-extrabold uppercase tracking-[0.16em] transition',
                  background && 'bg-[rgba(8,6,4,0.55)] bg-blend-multiply text-heritage-gold',
                  !background &&
                    (active
                      ? 'border-[rgba(39,198,200,0.34)] bg-[rgba(39,198,200,0.08)] text-heritage-teal'
                      : 'border-surface bg-[var(--surface-card-bg)] text-heritage-gold/85 hover:border-[var(--surface-card-hover-border)] hover:text-heritage-gold'),
                  background && active && 'ring-1 ring-heritage-teal/70',
                )}
              >
                {aboutMenuLabel(tab.href, locale)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
