import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';

const SITE_NAME = 'Armenian Treasures';

const DEFAULT_OG = {
  type: 'website' as const,
  locale: 'en_US' as const,
  siteName: SITE_NAME,
};

/** Avoid `%s · Armenian Treasures` when the title already names the site. */
export function resolvePageTitle(title: string): Metadata['title'] {
  if (title.includes(SITE_NAME)) {
    return { absolute: title };
  }
  return title;
}

export interface PublicPageMetadataInput {
  title: string;
  description: string;
  pathname: string;
  openGraphImage?: string;
}

export function buildPublicPageMetadata(input: PublicPageMetadataInput): Metadata {
  const canonical = `${getSiteUrl()}${input.pathname}`;
  const resolvedTitle = resolvePageTitle(input.title);

  return {
    title: resolvedTitle,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      ...DEFAULT_OG,
      title: input.title,
      description: input.description,
      url: canonical,
      ...(input.openGraphImage ? { images: [{ url: input.openGraphImage }] } : {}),
    },
    twitter: {
      card: input.openGraphImage ? 'summary_large_image' : 'summary_large_image',
      title: input.title,
      description: input.description,
      ...(input.openGraphImage ? { images: [input.openGraphImage] } : {}),
    },
  };
}

export function buildNotFoundMetadata(label: string): Metadata {
  return { title: resolvePageTitle(`${label} not found`) };
}
