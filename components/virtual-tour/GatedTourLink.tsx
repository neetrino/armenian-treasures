'use client';

import { useState, type ReactNode } from 'react';
import { useVirtualTourUnlocked } from '@/components/virtual-tour/virtual-tour-access';
import { TourRegisterPrompt } from '@/components/virtual-tour/TourRegisterPrompt';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

interface GatedTourLinkProps {
  href: string;
  className?: string;
  locale?: SiteLocaleCode;
  returnHash?: string;
  children: ReactNode;
}

export function GatedTourLink({
  href,
  className,
  locale = 'EN',
  returnHash,
  children,
}: GatedTourLinkProps) {
  const unlocked = useVirtualTourUnlocked();
  const [promptOpen, setPromptOpen] = useState(false);

  if (unlocked) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setPromptOpen(true)}>
        {children}
      </button>
      {promptOpen ? (
        <TourRegisterPrompt locale={locale} returnHash={returnHash} onClose={() => setPromptOpen(false)} />
      ) : null}
    </>
  );
}
