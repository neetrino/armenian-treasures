export type AdminImagePreviewLayout = 'card' | 'banner';

export interface AdminImagePreviewStyle {
  aspectClass: string;
  containerClass: string;
  dropzoneClass: string;
  sizes: string;
}

export const ADMIN_IMAGE_PREVIEW_LAYOUTS: Record<AdminImagePreviewLayout, AdminImagePreviewStyle> = {
  card: {
    aspectClass: 'aspect-[16/10]',
    containerClass: 'w-full max-w-[22rem]',
    dropzoneClass: 'min-h-[10rem] w-full max-w-[22rem]',
    sizes: '(max-width: 640px) 100vw, 352px',
  },
  banner: {
    aspectClass: 'aspect-[16/9]',
    containerClass: 'w-full',
    dropzoneClass: 'min-h-[12rem] w-full',
    sizes: '(max-width: 768px) 100vw, 960px',
  },
};

export function getAdminImagePreviewStyle(layout: AdminImagePreviewLayout): AdminImagePreviewStyle {
  return ADMIN_IMAGE_PREVIEW_LAYOUTS[layout];
}
