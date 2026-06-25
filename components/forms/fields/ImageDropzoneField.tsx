'use client';

import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';

interface ImageDropzoneFieldProps {
  label: string;
  name: string;
  variant: 'desktop' | 'mobile';
  defaultValue?: string;
  hint?: string;
  error?: string;
}

export function ImageDropzoneField(props: ImageDropzoneFieldProps) {
  return <AdminImageDropzoneField {...props} folder="hero" />;
}
