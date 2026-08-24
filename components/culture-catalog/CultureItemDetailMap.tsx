'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CultureItemDetailMapProps {
  latitude: number;
  longitude: number;
}

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

function createDetailPinIcon(): L.DivIcon {
  return L.divIcon({
    className: 'culture-detail-pin-marker',
    html: `<span style="display:flex;width:28px;height:36px;align-items:flex-end;justify-content:center;filter:drop-shadow(0 2px 4px rgba(15,23,42,0.35));">
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 34s10-12.2 10-20A10 10 0 1 0 4 14c0 7.8 10 20 10 20Z" fill="#7E1C26"/>
        <circle cx="14" cy="14" r="4.25" fill="#F6EFD9"/>
      </svg>
    </span>`,
    iconSize: [28, 36],
    iconAnchor: [14, 34],
  });
}

export function CultureItemDetailMap({ latitude, longitude }: CultureItemDetailMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const start: L.LatLngExpression = [latitude, longitude];
    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(start, 12);
    L.tileLayer(TILE_URL, { attribution: '© OpenStreetMap contributors' }).addTo(map);
    L.marker(start, { icon: createDetailPinIcon() }).addTo(map);
    mapRef.current = map;
    window.requestAnimationFrame(() => map.invalidateSize());
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude]);

  return <div ref={containerRef} className="map-embed" />;
}
