import type { CulturalPortalIconKey } from '@/lib/constants/cultural-portal';

export interface CulturalPortalIconSource {
  iconSrc: string;
  sourceHref: string;
  library: 'lucide';
  lucideIcon: string;
}

export const CULTURAL_PORTAL_ICON_SOURCES = {
  churches: {
    iconSrc: '/icons/cultural-portal/churches.svg',
    sourceHref: 'https://lucide.dev/icons/church',
    library: 'lucide',
    lucideIcon: 'church',
  },
  castles: {
    iconSrc: '/icons/cultural-portal/castles.svg',
    sourceHref: 'https://lucide.dev/icons/castle',
    library: 'lucide',
    lucideIcon: 'castle',
  },
  legends: {
    iconSrc: '/icons/cultural-portal/legends.svg',
    sourceHref: 'https://lucide.dev/icons/star',
    library: 'lucide',
    lucideIcon: 'star',
  },
  mythology: {
    iconSrc: '/icons/cultural-portal/mythology.svg',
    sourceHref: 'https://lucide.dev/icons/orbit',
    library: 'lucide',
    lucideIcon: 'orbit',
  },
  museums: {
    iconSrc: '/icons/cultural-portal/museums.svg',
    sourceHref: 'https://lucide.dev/icons/landmark',
    library: 'lucide',
    lucideIcon: 'landmark',
  },
  kings: {
    iconSrc: '/icons/cultural-portal/kings.svg',
    sourceHref: 'https://lucide.dev/icons/crown',
    library: 'lucide',
    lucideIcon: 'crown',
  },
  scientists: {
    iconSrc: '/icons/cultural-portal/scientists.svg',
    sourceHref: 'https://lucide.dev/icons/flask-conical',
    library: 'lucide',
    lucideIcon: 'flask-conical',
  },
  famousArmenians: {
    iconSrc: '/icons/cultural-portal/famousArmenians.svg',
    sourceHref: 'https://lucide.dev/icons/users',
    library: 'lucide',
    lucideIcon: 'users',
  },
  history: {
    iconSrc: '/icons/cultural-portal/history.svg',
    sourceHref: 'https://lucide.dev/icons/clock',
    library: 'lucide',
    lucideIcon: 'clock',
  },
  paintings: {
    iconSrc: '/icons/cultural-portal/paintings.svg',
    sourceHref: 'https://lucide.dev/icons/palette',
    library: 'lucide',
    lucideIcon: 'palette',
  },
  music: {
    iconSrc: '/icons/cultural-portal/music.svg',
    sourceHref: 'https://lucide.dev/icons/music-2',
    library: 'lucide',
    lucideIcon: 'music-2',
  },
  writers: {
    iconSrc: '/icons/cultural-portal/writers.svg',
    sourceHref: 'https://lucide.dev/icons/feather',
    library: 'lucide',
    lucideIcon: 'feather',
  },
  taraz: {
    iconSrc: '/icons/cultural-portal/taraz.svg',
    sourceHref: 'https://lucide.dev/icons/shirt',
    library: 'lucide',
    lucideIcon: 'shirt',
  },
  carpets: {
    iconSrc: '/icons/cultural-portal/carpets.svg',
    sourceHref: 'https://lucide.dev/icons/grid-3x3',
    library: 'lucide',
    lucideIcon: 'grid-3x3',
  },
  sculptors: {
    iconSrc: '/icons/cultural-portal/sculptors.svg',
    sourceHref: 'https://lucide.dev/icons/hammer',
    library: 'lucide',
    lucideIcon: 'hammer',
  },
  foodDrink: {
    iconSrc: '/icons/cultural-portal/foodDrink.svg',
    sourceHref: 'https://lucide.dev/icons/wine',
    library: 'lucide',
    lucideIcon: 'wine',
  },
  dance: {
    iconSrc: '/icons/cultural-portal/dance.svg',
    sourceHref: 'https://lucide.dev/icons/users-round',
    library: 'lucide',
    lucideIcon: 'users-round',
  },
  theatre: {
    iconSrc: '/icons/cultural-portal/theatre.svg',
    sourceHref: 'https://lucide.dev/icons/drama',
    library: 'lucide',
    lucideIcon: 'drama',
  },
  armaments: {
    iconSrc: '/icons/cultural-portal/armaments.svg',
    sourceHref: 'https://lucide.dev/icons/sword',
    library: 'lucide',
    lucideIcon: 'sword',
  },
  publications: {
    iconSrc: '/icons/cultural-portal/publications.svg',
    sourceHref: 'https://lucide.dev/icons/book-marked',
    library: 'lucide',
    lucideIcon: 'book-marked',
  },
} satisfies Record<CulturalPortalIconKey, CulturalPortalIconSource>;
