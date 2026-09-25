'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { bindMapWheelZoom } from '@/components/map/bind-map-wheel-zoom';
import { makeHeritageMarkerIcon } from '@/components/map/LeafletMap';
import { MapWheelZoomHint } from '@/components/map/MapWheelZoomHint';
import type { PublicCultureItemDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

interface CultureItemDetailMapProps {
  latitude: number;
  longitude: number;
  mapType?: PublicCultureItemDTO['mapType'];
  locale?: SiteLocaleCode;
}

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export function CultureItemDetailMap({
  latitude,
  longitude,
  mapType,
  locale = 'EN',
}: CultureItemDetailMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [wheelZoomActive, setWheelZoomActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;
    const start: L.LatLngExpression = [latitude, longitude];
    const map = L.map(container, {
      scrollWheelZoom: false,
      touchZoom: true,
      zoomControl: false,
      attributionControl: false,
      zoomSnap: 0.25,
      wheelPxPerZoomLevel: 40,
    }).setView(start, 12);
    L.tileLayer(TILE_URL, { attribution: '' }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.marker(start, { icon: makeHeritageMarkerIcon(mapType ?? null, true) }).addTo(map);
    mapRef.current = map;
    const unbindWheelZoom = bindMapWheelZoom(map, container, setWheelZoomActive);
    window.requestAnimationFrame(() => map.invalidateSize());
    return () => {
      unbindWheelZoom();
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, mapType]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="map-embed" />
      <MapWheelZoomHint active={wheelZoomActive} locale={locale} />
    </div>
  );
}
