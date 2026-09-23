'use client';

import { useEffect, useState } from 'react';
import { GatedEmbed } from '@/components/virtual-tour/GatedEmbed';
import { useVirtualTourUnlocked } from '@/components/virtual-tour/virtual-tour-access';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { isSketchfabShortUrl, toTourEmbedSrc } from '@/lib/embed-urls';
import {
  normalizeTourBlock,
  type CultureTourBlock,
  type CultureTourType,
} from '@/lib/culture-item-media';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage, type UiMessageKey } from '@/lib/i18n/ui-messages';

interface CultureItemPublicTourProps {
  tour: CultureTourBlock;
  isFirst: boolean;
  locale?: SiteLocaleCode;
}

const TOUR_TYPE_MESSAGE: Record<CultureTourType, UiMessageKey> = {
  LIDAR: 'tourTypeLidar',
  SCAN_3D: 'tourTypeScan3d',
  DRONE: 'tourTypeDrone',
};

function tourHeading(type: CultureTourType, locale: SiteLocaleCode): string {
  return uiMessage(locale, TOUR_TYPE_MESSAGE[type] ?? 'virtualTour');
}

export function CultureItemPublicTour({
  tour,
  isFirst,
  locale = 'EN',
}: CultureItemPublicTourProps) {
  const unlocked = useVirtualTourUnlocked();
  const normalized = normalizeTourBlock(tour);
  const initialEmbed = normalized.url ? toTourEmbedSrc(normalized.url) : null;
  const [embedSrc, setEmbedSrc] = useState<string | null>(initialEmbed);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!unlocked || !normalized.url) return;
    const direct = toTourEmbedSrc(normalized.url);
    if (direct) {
      setEmbedSrc(direct);
      setFailed(false);
      return;
    }
    if (!isSketchfabShortUrl(normalized.url)) {
      setEmbedSrc(null);
      setFailed(true);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    void (async () => {
      try {
        const response = await fetch(
          `/api/embed/resolve?url=${encodeURIComponent(normalized.url)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error('resolve failed');
        const data = (await response.json()) as { embedSrc?: string };
        if (cancelled) return;
        if (data.embedSrc) {
          setEmbedSrc(data.embedSrc);
          setFailed(false);
        } else {
          setFailed(true);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [normalized.url, unlocked]);

  if (!normalized.url) return null;

  const title = normalized.title || tourHeading(normalized.type, locale);

  return (
    <div id={isFirst ? 'tour' : undefined} className="catalog-item-media-block">
      <p className="sec-label">{uiMessage(locale, 'virtualExperience')}</p>
      <h2 className="sec-title">{title}</h2>
      <div className="tour-wrap catalog-tour-wide reveal">
        <GatedEmbed
          title={title}
          frameClassName="tour-embed"
          locale={locale}
          returnHash={isFirst ? '#tour' : undefined}
          previewImage={
            normalized.previewImage ? resolvePublicAssetUrl(normalized.previewImage) : undefined
          }
        >
          {embedSrc ? (
            <iframe
              src={embedSrc}
              title={title}
              className="tour-embed"
              allow="fullscreen; xr-spatial-tracking; autoplay"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : failed ? (
            <div className="tour-embed tour-embed--fallback">
              <a href={normalized.url} target="_blank" rel="noreferrer" className="btn-teal">
                {uiMessage(locale, 'open3dTour')}
              </a>
            </div>
          ) : (
            <div className="tour-embed tour-embed--loading" aria-busy="true" aria-label="Loading" />
          )}
        </GatedEmbed>
      </div>
    </div>
  );
}
