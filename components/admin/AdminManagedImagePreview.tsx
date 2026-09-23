'use client';

import Image from 'next/image';
import { HeroImageOverlay } from '@/components/sections/hero/HeroImageOverlay';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { cn } from '@/lib/utils';
import type { AdminImagePreviewStyle } from '@/lib/admin/image-preview-layout';

interface AdminManagedImagePreviewProps {
  src: string;
  previewStyle: AdminImagePreviewStyle;
  fit?: 'cover' | 'contain';
}

export function AdminManagedImagePreview({
  src,
  previewStyle,
  fit = 'cover',
}: AdminManagedImagePreviewProps) {
  const resolvedSrc = resolvePublicAssetUrl(src);

  if (previewStyle.useHeroOverlay) {
    return (
      <div className={cn('relative w-full', previewStyle.frameClass)}>
        <HeroImageOverlay
          imageUrl={resolvedSrc}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        />
      </div>
    );
  }

  return (
    <div className={cn('relative w-full', previewStyle.frameClass)}>
      <Image
        src={resolvedSrc}
        alt=""
        fill
        unoptimized
        className={cn(previewStyle.imageClass, fit === 'contain' && 'object-contain p-4')}
        sizes={previewStyle.sizes}
      />
    </div>
  );
}
