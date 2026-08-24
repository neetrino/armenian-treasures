'use client';

import dynamic from 'next/dynamic';

export const CultureItemDetailMapLazy = dynamic(
  () =>
    import('@/components/culture-catalog/CultureItemDetailMap').then((module) => ({
      default: module.CultureItemDetailMap,
    })),
  {
    ssr: false,
    loading: () => <div className="map-embed map-embed--loading" aria-hidden />,
  },
);
