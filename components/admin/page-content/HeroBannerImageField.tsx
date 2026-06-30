'use client';

import { PageContentImageField } from '@/components/admin/page-content/PageContentImageField';
import { PageContentSection } from '@/components/admin/page-content/PageContentSection';

interface HeroBannerImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  hint?: string;
}

export function HeroBannerImageField({ value, onChange, hint }: HeroBannerImageFieldProps) {
  return (
    <PageContentSection
      title="Hero banner image"
      description="Optional wide background photo at the top of the page. Remove the image to restore the default page background."
    >
      <PageContentImageField
        label="Banner image"
        layout="banner"
        folder="hero"
        value={value}
        onChange={onChange}
        hint={hint ?? 'Wide banner (16:9). Leave empty to use the default page background.'}
      />
    </PageContentSection>
  );
}
