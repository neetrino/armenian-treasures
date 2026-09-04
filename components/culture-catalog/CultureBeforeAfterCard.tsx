'use client';

import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage, uiMessageFormat } from '@/lib/i18n/ui-messages';

interface CultureBeforeAfterCardProps {
  beforeUrl: string;
  afterUrl: string;
  caption?: string;
  alt: string;
  locale?: SiteLocaleCode;
}

/** Matches Khndzoresk `.rest-card` / `.rest-compare` (16/9, interactive slider). */
export function CultureBeforeAfterCard({
  beforeUrl,
  afterUrl,
  caption,
  alt,
  locale = 'EN',
}: CultureBeforeAfterCardProps) {
  const compareRef = useRef<HTMLDivElement>(null);

  const handleRange = useCallback((value: number) => {
    compareRef.current?.style.setProperty('--split', `${value}%`);
  }, []);

  return (
    <div className="rest-card reveal">
      <div className="rest-compare" ref={compareRef} style={{ ['--split' as string]: '50%' }}>
        <Image
          className="rest-img rest-before"
          src={resolvePublicAssetUrl(beforeUrl)}
          alt={`${alt} — historical`}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <Image
          className="rest-img rest-after"
          src={resolvePublicAssetUrl(afterUrl)}
          alt={`${alt} — restored`}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <input
          type="range"
          className="rest-range"
          min={5}
          max={95}
          defaultValue={50}
          aria-label={uiMessageFormat(locale, 'compareViews', { name: caption || alt })}
          onChange={(event) => handleRange(Number(event.target.value))}
        />
        <div className="rest-handle" aria-hidden />
      </div>
      <div className="rest-labels">
        <span className="rest-lbl">{uiMessage(locale, 'historical')}</span>
        <span className="rest-lbl">{uiMessage(locale, 'restored')}</span>
      </div>
      {caption ? <div className="rest-caption">{caption}</div> : null}
    </div>
  );
}
