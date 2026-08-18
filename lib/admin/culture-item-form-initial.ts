import type { CultureItem } from '@prisma/client';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';
import type { FeaturedHomeState } from '@/lib/queries/featured-home-sql';

export interface CultureItemFormInitial {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  menuItemId: string;
  region: string;
  locationName: string;
  periodLabel: string;
  century: string;
  yearLabel: string;
  image: string;
  coverImage: string;
  cardBackgroundColor: string;
  cardBackgroundImage: string;
  galleryImages: string[];
  tourUrl: string;
  videoUrl: string;
  mediaContent: unknown;
  latitude: string;
  longitude: string;
  mapType: string;
  showOnMap: boolean;
  featuredOnHome: boolean;
  featuredOnCatalog: boolean;
  featuredOrder: number | null;
  itemType: string;
  status: string;
  order: number;
}

export function toCultureItemFormInitial(
  item: CultureItem,
  featured?: FeaturedHomeState,
): CultureItemFormInitial {
  return {
    title: item.title,
    slug: item.slug,
    description: item.description ?? '',
    shortDescription: item.shortDescription ?? '',
    menuItemId: item.menuItemId,
    region: getAdminLocaleValue(item.region),
    locationName: getAdminLocaleValue(item.locationName),
    periodLabel: getAdminLocaleValue(item.periodLabel),
    century: item.century !== null ? String(item.century) : '',
    yearLabel: getAdminLocaleValue(item.yearLabel),
    image: item.image ?? '',
    coverImage: item.coverImage ?? '',
    cardBackgroundColor: item.cardBackgroundColor ?? '',
    cardBackgroundImage: item.cardBackgroundImage ?? '',
    mediaContent: item.mediaContent,
    galleryImages: item.galleryImages ?? [],
    tourUrl: item.tourUrl ?? '',
    videoUrl: item.videoUrl ?? '',
    latitude: item.latitude !== null ? String(item.latitude) : '',
    longitude: item.longitude !== null ? String(item.longitude) : '',
    mapType: item.mapType ?? '',
    showOnMap: item.showOnMap,
    featuredOnHome: featured?.featuredOnHome ?? false,
    featuredOnCatalog: item.featuredOnCatalog,
    featuredOrder: featured?.featuredOrder ?? null,
    itemType: item.itemType,
    status: item.status,
    order: item.order,
  };
}
