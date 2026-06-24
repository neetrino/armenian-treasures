import type { VirtualMuseumIconKey } from '@/lib/constants/virtual-museum';

export interface VirtualMuseumIconSource {
  iconSrc: string;
  sourceHref: string;
  library: 'lucide';
  lucideIcon: string;
}

export const VIRTUAL_MUSEUM_ICON_SOURCES = {
  tours: {
    iconSrc: '/icons/virtual-museum/tours.svg',
    sourceHref: 'https://lucide.dev/icons/headset',
    library: 'lucide',
    lucideIcon: 'headset',
  },
  artefacts: {
    iconSrc: '/icons/virtual-museum/artefacts.svg',
    sourceHref: 'https://lucide.dev/icons/box',
    library: 'lucide',
    lucideIcon: 'box',
  },
  galleries: {
    iconSrc: '/icons/virtual-museum/galleries.svg',
    sourceHref: 'https://lucide.dev/icons/landmark',
    library: 'lucide',
    lucideIcon: 'landmark',
  },
  events: {
    iconSrc: '/icons/virtual-museum/events.svg',
    sourceHref: 'https://lucide.dev/icons/radio',
    library: 'lucide',
    lucideIcon: 'radio',
  },
} satisfies Record<VirtualMuseumIconKey, VirtualMuseumIconSource>;
