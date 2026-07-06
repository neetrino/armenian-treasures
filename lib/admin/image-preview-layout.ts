import {
  HOME_HERO_ADMIN_PREVIEW_ASPECT_CLASS,
  PAGE_HERO_ADMIN_PREVIEW_ASPECT_CLASS,
} from '@/lib/page-hero/dimensions';
import { cn } from '@/lib/utils';

export type AdminImagePreviewLayout = 'card' | 'banner' | 'home-hero';

export interface AdminImagePreviewStyle {
  frameClass: string;
  containerClass: string;
  dropzoneClass: string;
  imageClass: string;
  sizes: string;
  /** Renders with the same gradient + cover treatment as public LandingHero banners. */
  useHeroOverlay?: boolean;
}

export const ADMIN_IMAGE_PREVIEW_LAYOUTS: Record<AdminImagePreviewLayout, AdminImagePreviewStyle> = {
  card: {
    frameClass: 'aspect-[16/10]',
    containerClass: 'w-full max-w-[22rem]',
    dropzoneClass: 'min-h-[10rem] w-full max-w-[22rem]',
    imageClass: 'object-cover',
    sizes: '(max-width: 640px) 100vw, 352px',
  },
  banner: {
    frameClass: PAGE_HERO_ADMIN_PREVIEW_ASPECT_CLASS,
    containerClass: 'w-full',
    dropzoneClass: `w-full ${PAGE_HERO_ADMIN_PREVIEW_ASPECT_CLASS} min-h-[9rem]`,
    imageClass: 'object-cover object-center',
    sizes: '(max-width: 768px) 100vw, 960px',
    useHeroOverlay: true,
  },
  'home-hero': {
    frameClass: HOME_HERO_ADMIN_PREVIEW_ASPECT_CLASS,
    containerClass: 'w-full',
    dropzoneClass: `w-full ${HOME_HERO_ADMIN_PREVIEW_ASPECT_CLASS} min-h-[9rem]`,
    imageClass: 'object-cover object-center',
    sizes: '(max-width: 768px) 100vw, 960px',
  },
};

export function getAdminImagePreviewStyle(layout: AdminImagePreviewLayout): AdminImagePreviewStyle {
  return ADMIN_IMAGE_PREVIEW_LAYOUTS[layout];
}

export function getAdminImagePreviewContainerClass(
  layout: AdminImagePreviewLayout,
  previewStyle: AdminImagePreviewStyle,
): string {
  return cn(
    'relative overflow-hidden rounded-xl border border-stone-200 bg-stone-900',
    previewStyle.containerClass,
  );
}

export function getAdminImagePreviewDropzoneClass(
  layout: AdminImagePreviewLayout,
  previewStyle: AdminImagePreviewStyle,
  isDragging: boolean,
): string {
  return cn(
    'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition',
    previewStyle.dropzoneClass,
    previewStyle.frameClass,
    isDragging
      ? 'border-bronze-500 bg-bronze-50/40'
      : 'border-stone-300 bg-white hover:border-bronze-500 hover:bg-parchment-50/60',
  );
}

export function getAdminImagePreviewHint(layout: AdminImagePreviewLayout): string {
  if (layout === 'card') return 'Card ratio 16:10 · JPG, PNG, WebP';
  if (layout === 'home-hero') return 'Compact home hero preview · JPG, PNG, WebP';
  return 'Compact page hero preview (same crop as public banner) · JPG, PNG, WebP';
}
