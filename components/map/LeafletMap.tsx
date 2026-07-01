'use client';

import { useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { PublicCultureItemDTO } from '@/lib/dto';

interface LeafletMapProps {
  items: PublicCultureItemDTO[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ARMENIA_CENTER: [number, number] = [40.1, 44.95];
const TILE_ATTRIBUTION = '© OpenStreetMap contributors';
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

function makeIcon(): L.DivIcon {
  return L.divIcon({
    className: 'at-marker',
    html:
      '<span class="block h-3 w-3 rounded-full bg-pomegranate ring-4 ring-pomegranate/30"></span>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function mappableItems(items: PublicCultureItemDTO[]): PublicCultureItemDTO[] {
  return items.filter(
    (item) => item.latitude !== null && item.longitude !== null,
  );
}

export function LeafletMap({ items, selectedId, onSelect }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  const icon = useMemo(makeIcon, []);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const map = L.map(container, {
      center: ARMENIA_CENTER,
      zoom: 7,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    L.tileLayer(TILE_URL, { attribution: TILE_ATTRIBUTION }).addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const layer = markersLayerRef.current;
    const map = mapRef.current;
    if (!layer || !map) return;

    layer.clearLayers();

    for (const item of mappableItems(items)) {
      const lat = item.latitude!;
      const lng = item.longitude!;
      const marker = L.marker([lat, lng], { icon }).addTo(layer);
      marker.bindPopup(
        `<strong>${escapeHtml(item.title)}</strong><br /><small>${escapeHtml(item.region ?? 'Armenia')}</small>`,
      );
      marker.on('click', () => onSelectRef.current(item.id));
    }
  }, [items, icon]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;

    const item = mappableItems(items).find((entry) => entry.id === selectedId);
    if (!item) return;

    map.flyTo([item.latitude!, item.longitude!], 10, { duration: 0.8 });
  }, [selectedId, items]);

  return (
    <div
      ref={containerRef}
      className="z-0 h-full w-full"
      role="application"
      aria-label="Interactive heritage map"
    />
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
