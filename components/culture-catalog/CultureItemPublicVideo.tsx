'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { toYouTubeEmbedSrc, toYouTubeThumbnailSrc } from '@/lib/embed-urls';
import type { CultureVideoBlock } from '@/lib/culture-item-media';

interface CultureItemPublicVideoProps {
  video: CultureVideoBlock;
  fallbackTitle: string;
  showTitle?: boolean;
}

export function CultureItemPublicVideo({
  video,
  fallbackTitle,
  showTitle = true,
}: CultureItemPublicVideoProps) {
  const title = video.title || fallbackTitle;
  const preview = video.previewImage.trim() || toYouTubeThumbnailSrc(video.url) || '';
  const embedSrc = toYouTubeEmbedSrc(video.url);
  const [playing, setPlaying] = useState(false);

  if (embedSrc && playing) {
    return (
      <div className="catalog-video-shortcut catalog-video-shortcut--embed reveal">
        <div className="catalog-video-shortcut__media catalog-video-shortcut__media--embed">
          <iframe
            src={`${embedSrc}?autoplay=1&rel=0`}
            title={title}
            className="catalog-video-shortcut__iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        {showTitle ? (
          <a
            href={video.url}
            className="catalog-video-shortcut__label catalog-video-shortcut__label--link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        ) : null}
      </div>
    );
  }

  if (embedSrc) {
    return (
      <button
        type="button"
        className="catalog-video-shortcut reveal"
        onClick={() => setPlaying(true)}
        aria-label={`Play ${title}`}
      >
        <span className="catalog-video-shortcut__media">
          {preview ? (
            <Image
              src={resolvePublicAssetUrl(preview)}
              alt=""
              width={1200}
              height={675}
              className="catalog-video-shortcut__image"
            />
          ) : (
            <span className="catalog-video-shortcut__fallback" aria-hidden />
          )}
          <span className="catalog-video-shortcut__play">
            <Play size={28} aria-hidden />
          </span>
        </span>
        {showTitle ? <span className="catalog-video-shortcut__label">{title}</span> : null}
      </button>
    );
  }

  return (
    <a
      href={video.url}
      className="catalog-video-shortcut reveal"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
    >
      <span className="catalog-video-shortcut__media">
        {preview ? (
          <Image
            src={resolvePublicAssetUrl(preview)}
            alt=""
            width={1200}
            height={675}
            className="catalog-video-shortcut__image"
          />
        ) : (
          <span className="catalog-video-shortcut__fallback" aria-hidden />
        )}
        <span className="catalog-video-shortcut__play">
          <Play size={28} aria-hidden />
        </span>
      </span>
      {showTitle ? <span className="catalog-video-shortcut__label">{title}</span> : null}
    </a>
  );
}
