'use client';

import { useState } from 'react';
import { HeroBannerImageField } from '@/components/admin/page-content/HeroBannerImageField';
import { PageContentFormShell } from '@/components/admin/page-content/PageContentFormShell';
import { parseStaticPageHeroContent, type PageContentSlug } from '@/lib/types/page-content';
import {
  asMutableContent,
  patchContent,
  readString,
  type MutablePageContent,
} from '@/lib/admin/page-content-form/mutable-content';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

type StaticHeroSlug = 'contacts-page' | 'projects-page';

interface Props {
  slug: StaticHeroSlug;
  initial: Record<string, unknown>;
  locale: SiteLocaleCode;
}

export function StaticPageHeroForm({ slug, initial, locale }: Props) {
  const [content, setContent] = useState<MutablePageContent>(() =>
    asMutableContent(parseStaticPageHeroContent(initial)),
  );

  const update = (patch: MutablePageContent): void => {
    setContent((prev) => patchContent(prev, patch));
  };

  return (
    <PageContentFormShell slug={slug as PageContentSlug} content={content} locale={locale}>
      <HeroBannerImageField
        value={readString(content.heroImage)}
        onChange={(heroImage) => update({ heroImage })}
      />
    </PageContentFormShell>
  );
}
