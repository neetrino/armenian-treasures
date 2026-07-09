import type { CultureItem } from '@prisma/client';
import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

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
  cardBackgroundColor: string;
  cardBackgroundImage: string;
  galleryImages: string[];
  tourUrl: string;
  videoUrl: string;
  latitude: string;
  longitude: string;
  mapType: string;
  showOnMap: boolean;
  itemType: string;
  status: string;
  order: number;
}

export function toCultureItemFormInitial(item: CultureItem): CultureItemFormInitial {
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
    cardBackgroundColor: item.cardBackgroundColor ?? '',
    cardBackgroundImage: item.cardBackgroundImage ?? '',
    galleryImages: item.galleryImages ?? [],
    tourUrl: item.tourUrl ?? '',
    videoUrl: item.videoUrl ?? '',
    latitude: item.latitude !== null ? String(item.latitude) : '',
    longitude: item.longitude !== null ? String(item.longitude) : '',
    mapType: item.mapType ?? '',
    showOnMap: item.showOnMap,
    itemType: item.itemType,
    status: item.status,
    order: item.order,
  };
}
