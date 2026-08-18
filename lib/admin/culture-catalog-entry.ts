import type { CultureItemFormInitial } from '@/lib/admin/culture-item-form-initial';

export interface CultureCatalogEntryAdmin {
  id: string;
  slug: string;
  title: string;
  description: string;
  region: string;
  periodLabel: string;
  image: string;
  galleryImages: string[];
  cardBackgroundColor: string;
  cardBackgroundImage: string;
  featuredOnHome: boolean;
  featuredOrder: number | null;
  tourUrl: string;
  order: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  formInitial: CultureItemFormInitial;
}

export interface CultureCatalogSubpageLink {
  menuPath: string;
  label: string;
}
