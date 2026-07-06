'use client';

import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';

interface ImageDropzoneFieldProps {
  label: string;
  name: string;
  variant: 'desktop' | 'mobile';
  layout?: 'banner' | 'home-hero';
  defaultValue?: string;
  hint?: string;
  error?: string;
}

export function ImageDropzoneField({ layout = 'home-hero', ...props }: ImageDropzoneFieldProps) {
  return <AdminImageDropzoneField {...props} folder="hero" layout={layout} />;
}
