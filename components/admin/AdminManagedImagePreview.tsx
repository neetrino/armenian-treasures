'use client';

import Image from 'next/image';
import { HeroImageOverlay } from '@/components/sections/hero/HeroImageOverlay';
import { cn } from '@/lib/utils';
import type { AdminImagePreviewStyle } from '@/lib/admin/image-preview-layout';

interface AdminManagedImagePreviewProps {
  src: string;
  previewStyle: AdminImagePreviewStyle;
}

export function AdminManagedImagePreview({ src, previewStyle }: AdminManagedImagePreviewProps) {
  if (previewStyle.useHeroOverlay) {
    return (
      <div className={cn('relative w-full', previewStyle.frameClass)}>
        <HeroImageOverlay
          imageUrl={src}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        />
      </div>
    );
  }

  return (
    <div className={cn('relative w-full', previewStyle.frameClass)}>
      <Image
        src={src}
        alt=""
        fill
        unoptimized
        className={previewStyle.imageClass}
        sizes={previewStyle.sizes}
      />
    </div>
  );
}
