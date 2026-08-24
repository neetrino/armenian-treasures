'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DEFAULT_MAP_COORDINATES } from '@/lib/culture-item-media';

interface AdminPinMapProps {
  latitude: number | null;
  longitude: number | null;
  onChange: (latitude: number, longitude: number) => void;
}

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

function createAdminPinIcon(): L.DivIcon {
  return L.divIcon({
    className: 'admin-pin-marker',
    html: `<span style="
      display:flex;
      width:28px;
      height:36px;
      align-items:flex-end;
      justify-content:center;
      filter:drop-shadow(0 2px 4px rgba(15, 23, 42, 0.35));
    ">
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 34s10-12.2 10-20A10 10 0 1 0 4 14c0 7.8 10 20 10 20Z" fill="#7E1C26"/>
        <circle cx="14" cy="14" r="4.25" fill="#F6EFD9"/>
      </svg>
    </span>`,
    iconSize: [28, 36],
    iconAnchor: [14, 34],
  });
}

export function AdminPinMap({ latitude, longitude, onChange }: AdminPinMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const start: L.LatLngExpression = [
      latitude ?? DEFAULT_MAP_COORDINATES.latitude,
      longitude ?? DEFAULT_MAP_COORDINATES.longitude,
    ];
    const map = L.map(containerRef.current).setView(start, 12);
    L.tileLayer(TILE_URL, { attribution: '© OpenStreetMap contributors' }).addTo(map);
    const marker = L.marker(start, { draggable: true, icon: createAdminPinIcon() }).addTo(map);

    marker.on('dragend', () => {
      const next = marker.getLatLng();
      onChangeRef.current(next.lat, next.lng);
    });
    map.on('click', (event: L.LeafletMouseEvent) => {
      marker.setLatLng(event.latlng);
      onChangeRef.current(event.latlng.lat, event.latlng.lng);
    });

    mapRef.current = map;
    markerRef.current = marker;
    window.requestAnimationFrame(() => {
      map.invalidateSize();
    });
    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // Mount once; later coordinate edits sync through the second effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (latitude === null || longitude === null) return;
    markerRef.current?.setLatLng([latitude, longitude]);
    mapRef.current?.panTo([latitude, longitude]);
  }, [latitude, longitude]);

  return <div ref={containerRef} className="h-72 min-h-[18rem] w-full overflow-hidden rounded-xl border border-stone-200" />;
}
