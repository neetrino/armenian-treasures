'use client';

import { useState, type ReactNode } from 'react';
import { useVirtualTourUnlocked } from '@/components/virtual-tour/virtual-tour-access';
import { TourRegisterPrompt } from '@/components/virtual-tour/TourRegisterPrompt';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { cn } from '@/lib/utils';
import '@/components/virtual-tour/virtual-tour-gate.css';

interface GatedEmbedProps {
  title: string;
  frameClassName: string;
  locale?: SiteLocaleCode;
  returnHash?: string;
  previewImage?: string;
  children: ReactNode;
}

export function GatedEmbed({
  title,
  frameClassName,
  locale = 'EN',
  returnHash,
  previewImage,
  children,
}: GatedEmbedProps) {
  const unlocked = useVirtualTourUnlocked();
  const [promptOpen, setPromptOpen] = useState(false);

  if (unlocked) return <>{children}</>;

  return (
    <>
      <button
        type="button"
        className={cn(frameClassName, 'tour-gate')}
        aria-label={`${uiMessage(locale, 'enterVirtualTour')}: ${title}`}
        onClick={() => setPromptOpen(true)}
      >
        {previewImage ? (
          <span className="tour-gate__preview" style={{ backgroundImage: `url(${JSON.stringify(previewImage)})` }} />
        ) : null}
        <span className="tour-gate__veil">
          <span className="tour-gate__kicker">{uiMessage(locale, 'virtualTour')}</span>
          <span className="btn-gold">{uiMessage(locale, 'enterVirtualTour')}</span>
        </span>
      </button>
      {promptOpen ? (
        <TourRegisterPrompt locale={locale} returnHash={returnHash} onClose={() => setPromptOpen(false)} />
      ) : null}
    </>
  );
}
