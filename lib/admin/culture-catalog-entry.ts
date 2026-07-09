export interface CultureCatalogEntryAdmin {
  id: string;
  slug: string;
  title: string;
  description: string;
  region: string;
  periodLabel: string;
  image: string;
  cardBackgroundColor: string;
  cardBackgroundImage: string;
  tourUrl: string;
  order: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface CultureCatalogSubpageLink {
  menuPath: string;
  label: string;
}
