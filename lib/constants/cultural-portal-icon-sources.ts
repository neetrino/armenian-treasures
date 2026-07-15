import type { CulturalPortalIconKey } from '@/lib/constants/cultural-portal';

export interface CulturalPortalIconSource {
  iconSrc: string;
  sourceHref: string;
  library: 'lucide' | 'drive';
  lucideIcon?: string;
}

export const CULTURAL_PORTAL_ICON_SOURCES = {
  churches: {
    iconSrc: '/icons/cultural-portal/churches.webp',
    sourceHref: 'https://lucide.dev/icons/church',
    library: 'lucide',
    lucideIcon: 'church',
  },
  castles: {
    iconSrc: '/icons/cultural-portal/castles-v2.webp',
    sourceHref: 'https://drive.google.com/drive/folders/19474lLrGhneA_kzqRc7NP9WeqxhpdXRQ',
    library: 'drive',
  },
  legends: {
    iconSrc: '/icons/cultural-portal/legends.webp',
    sourceHref: 'https://lucide.dev/icons/star',
    library: 'lucide',
    lucideIcon: 'star',
  },
  mythology: {
    iconSrc: '/icons/cultural-portal/mythology.webp',
    sourceHref: 'https://lucide.dev/icons/orbit',
    library: 'lucide',
    lucideIcon: 'orbit',
  },
  museums: {
    iconSrc: '/icons/cultural-portal/museums.webp',
    sourceHref: 'https://lucide.dev/icons/landmark',
    library: 'lucide',
    lucideIcon: 'landmark',
  },
  kings: {
    iconSrc: '/icons/cultural-portal/kings.webp',
    sourceHref: 'https://lucide.dev/icons/crown',
    library: 'lucide',
    lucideIcon: 'crown',
  },
  scientists: {
    iconSrc: '/icons/cultural-portal/scientists.webp',
    sourceHref: 'https://lucide.dev/icons/flask-conical',
    library: 'lucide',
    lucideIcon: 'flask-conical',
  },
  famousArmenians: {
    iconSrc: '/icons/cultural-portal/famousArmenians.webp',
    sourceHref: 'https://lucide.dev/icons/users',
    library: 'lucide',
    lucideIcon: 'users',
  },
  history: {
    iconSrc: '/icons/cultural-portal/history.webp',
    sourceHref: 'https://lucide.dev/icons/clock',
    library: 'lucide',
    lucideIcon: 'clock',
  },
  paintings: {
    iconSrc: '/icons/cultural-portal/paintings.webp',
    sourceHref: 'https://lucide.dev/icons/palette',
    library: 'lucide',
    lucideIcon: 'palette',
  },
  music: {
    iconSrc: '/icons/cultural-portal/music.webp',
    sourceHref: 'https://lucide.dev/icons/music-2',
    library: 'lucide',
    lucideIcon: 'music-2',
  },
  writers: {
    iconSrc: '/icons/cultural-portal/writers.webp',
    sourceHref: 'https://lucide.dev/icons/feather',
    library: 'lucide',
    lucideIcon: 'feather',
  },
  taraz: {
    iconSrc: '/icons/cultural-portal/taraz.webp',
    sourceHref: 'https://lucide.dev/icons/shirt',
    library: 'lucide',
    lucideIcon: 'shirt',
  },
  carpets: {
    iconSrc: '/icons/cultural-portal/carpets.webp',
    sourceHref: 'https://lucide.dev/icons/grid-3x3',
    library: 'lucide',
    lucideIcon: 'grid-3x3',
  },
  sculptors: {
    iconSrc: '/icons/cultural-portal/sculptors.webp',
    sourceHref: 'https://lucide.dev/icons/hammer',
    library: 'lucide',
    lucideIcon: 'hammer',
  },
  foodDrink: {
    iconSrc: '/icons/cultural-portal/foodDrink.webp',
    sourceHref: 'https://lucide.dev/icons/wine',
    library: 'lucide',
    lucideIcon: 'wine',
  },
  dance: {
    iconSrc: '/icons/cultural-portal/dance.webp',
    sourceHref: 'https://lucide.dev/icons/users-round',
    library: 'lucide',
    lucideIcon: 'users-round',
  },
  theatre: {
    iconSrc: '/icons/cultural-portal/theatre.webp',
    sourceHref: 'https://lucide.dev/icons/drama',
    library: 'lucide',
    lucideIcon: 'drama',
  },
  armaments: {
    iconSrc: '/icons/cultural-portal/armaments.webp',
    sourceHref: 'https://lucide.dev/icons/sword',
    library: 'lucide',
    lucideIcon: 'sword',
  },
  publications: {
    iconSrc: '/icons/cultural-portal/publications.webp',
    sourceHref: 'https://lucide.dev/icons/book-marked',
    library: 'lucide',
    lucideIcon: 'book-marked',
  },
  capitals: {
    iconSrc: '/icons/cultural-portal/history.webp',
    sourceHref: 'https://drive.google.com/drive/folders/19474lLrGhneA_kzqRc7NP9WeqxhpdXRQ',
    library: 'drive',
  },
  battlesAndWars: {
    iconSrc: '/icons/cultural-portal/armaments.webp',
    sourceHref: 'https://drive.google.com/drive/folders/19474lLrGhneA_kzqRc7NP9WeqxhpdXRQ',
    library: 'drive',
  },
  christianHeritage: {
    iconSrc: '/icons/cultural-portal/churches.webp',
    sourceHref: 'https://drive.google.com/drive/folders/19474lLrGhneA_kzqRc7NP9WeqxhpdXRQ',
    library: 'drive',
  },
  chroniclesAndManuscripts: {
    iconSrc: '/icons/cultural-portal/publications.webp',
    sourceHref: 'https://drive.google.com/drive/folders/19474lLrGhneA_kzqRc7NP9WeqxhpdXRQ',
    library: 'drive',
  },
  monumentsAndLandmarks: {
    iconSrc: '/icons/cultural-portal/sculptors.webp',
    sourceHref: 'https://drive.google.com/drive/folders/19474lLrGhneA_kzqRc7NP9WeqxhpdXRQ',
    library: 'drive',
  },
  traditions: {
    iconSrc: '/icons/cultural-portal/dance.webp',
    sourceHref: 'https://drive.google.com/drive/folders/19474lLrGhneA_kzqRc7NP9WeqxhpdXRQ',
    library: 'drive',
  },
  kingsAndDynasties: {
    iconSrc: '/icons/cultural-portal/kings.webp',
    sourceHref: 'https://drive.google.com/drive/folders/19474lLrGhneA_kzqRc7NP9WeqxhpdXRQ',
    library: 'drive',
  },
} satisfies Record<CulturalPortalIconKey, CulturalPortalIconSource>;
