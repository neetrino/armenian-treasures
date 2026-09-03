import Image from 'next/image';
import { Play } from 'lucide-react';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { CultureVideoBlock } from '@/lib/culture-item-media';

interface CultureItemPublicVideoProps {
  video: CultureVideoBlock;
  fallbackTitle: string;
}

export function CultureItemPublicVideo({ video, fallbackTitle }: CultureItemPublicVideoProps) {
  const title = video.title || fallbackTitle;
  const preview = video.previewImage.trim();

  return (
    <a
      href={video.url}
      className="catalog-video-shortcut reveal"
      target="_blank"
      rel="noopener noreferrer"
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
      <span className="catalog-video-shortcut__label">{title}</span>
    </a>
  );
}
