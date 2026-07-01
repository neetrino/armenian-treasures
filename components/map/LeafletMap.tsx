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

interface MarkerIconNode {
  tag: 'path' | 'line' | 'polygon';
  attrs: Record<string, string>;
}

interface MarkerStyle {
  color: string;
  icon: MarkerIconNode[];
}

const CHURCH_ICON: MarkerIconNode[] = [
  { tag: 'path', attrs: { d: 'M10 9h4' } },
  { tag: 'path', attrs: { d: 'M12 7v5' } },
  { tag: 'path', attrs: { d: 'M14 22v-4a2 2 0 0 0-4 0v4' } },
  {
    tag: 'path',
    attrs: {
      d: 'M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22',
    },
  },
  {
    tag: 'path',
    attrs: {
      d: 'm18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7',
    },
  },
];

const CASTLE_ICON: MarkerIconNode[] = [
  { tag: 'path', attrs: { d: 'M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z' } },
  { tag: 'path', attrs: { d: 'M18 11V4H6v7' } },
  { tag: 'path', attrs: { d: 'M15 22v-4a3 3 0 0 0-3-3a3 3 0 0 0-3 3v4' } },
  { tag: 'path', attrs: { d: 'M22 11V9' } },
  { tag: 'path', attrs: { d: 'M2 11V9' } },
  { tag: 'path', attrs: { d: 'M6 4V2' } },
  { tag: 'path', attrs: { d: 'M18 4V2' } },
  { tag: 'path', attrs: { d: 'M10 4V2' } },
  { tag: 'path', attrs: { d: 'M14 4V2' } },
];

const LANDMARK_ICON: MarkerIconNode[] = [
  { tag: 'line', attrs: { x1: '3', x2: '21', y1: '22', y2: '22' } },
  { tag: 'line', attrs: { x1: '6', x2: '6', y1: '18', y2: '11' } },
  { tag: 'line', attrs: { x1: '10', x2: '10', y1: '18', y2: '11' } },
  { tag: 'line', attrs: { x1: '14', x2: '14', y1: '18', y2: '11' } },
  { tag: 'line', attrs: { x1: '18', x2: '18', y1: '18', y2: '11' } },
  { tag: 'polygon', attrs: { points: '12 2 20 7 4 7' } },
];

const MOUNTAIN_ICON: MarkerIconNode[] = [{ tag: 'path', attrs: { d: 'm8 3 4 8 5-5 5 15H2L8 3z' } }];

const SPARKLES_ICON: MarkerIconNode[] = [
  {
    tag: 'path',
    attrs: {
      d: 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z',
    },
  },
  { tag: 'path', attrs: { d: 'M20 3v4' } },
  { tag: 'path', attrs: { d: 'M22 5h-4' } },
  { tag: 'path', attrs: { d: 'M4 17v2' } },
  { tag: 'path', attrs: { d: 'M5 18H3' } },
];

const MARKER_STYLE_BY_MAP_TYPE: Record<string, MarkerStyle> = {
  MONASTERY: { color: '#27C6C8', icon: CHURCH_ICON },
  CHURCH: { color: '#27C6C8', icon: CHURCH_ICON },
  FORTRESS: { color: '#D6B85A', icon: CASTLE_ICON },
  MUSEUM: { color: '#9B7BD4', icon: LANDMARK_ICON },
  ARCHAEOLOGICAL: { color: '#6BB578', icon: MOUNTAIN_ICON },
  OTHER: { color: '#D6855A', icon: SPARKLES_ICON },
};

function resolveMarkerStyle(mapType: PublicCultureItemDTO['mapType']): MarkerStyle {
  if (!mapType) return { color: '#D6B85A', icon: SPARKLES_ICON };
  return MARKER_STYLE_BY_MAP_TYPE[mapType] ?? { color: '#D6B85A', icon: SPARKLES_ICON };
}

function iconNodeToSvg(iconNode: MarkerIconNode[], color: string, selected: boolean): string {
  const baseStrokeWidth = selected ? 2.4 : 2.1;
  const haloStrokeWidth = selected ? 4.6 : 4;
  const nodes = iconNode
    .map((node) => {
      const attrs = Object.entries(node.attrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      return `<${node.tag} ${attrs}></${node.tag}>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g stroke="#ffffff" stroke-width="${haloStrokeWidth}" stroke-linecap="round" stroke-linejoin="round">${nodes}</g>
    <g stroke="${color}" stroke-width="${baseStrokeWidth}" stroke-linecap="round" stroke-linejoin="round">${nodes}</g>
  </svg>`;
}

function makeIcon(mapType: PublicCultureItemDTO['mapType'], selected: boolean): L.DivIcon {
  const marker = resolveMarkerStyle(mapType);
  const icon = iconNodeToSvg(marker.icon, marker.color, selected);
  const size = selected ? 30 : 26;

  return L.divIcon({
    className: 'at-marker',
    html: `<span style="
      display:flex;
      width:${size}px;
      height:${size}px;
      align-items:center;
      justify-content:center;
      transform:translateZ(0);
      filter:drop-shadow(0 2px 4px rgba(15, 23, 42, 0.32));
    ">${icon}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
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
  const markerIcons = useMemo(() => {
    const icons = new Map<string, L.DivIcon>();
    for (const item of mappableItems(items)) {
      const isSelected = selectedId === item.id;
      icons.set(item.id, makeIcon(item.mapType, isSelected));
    }
    return icons;
  }, [items, selectedId]);

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
      const marker = L.marker([lat, lng], { icon: markerIcons.get(item.id) ?? makeIcon(item.mapType, false) }).addTo(layer);
      marker.bindPopup(
        `<strong>${escapeHtml(item.title)}</strong><br /><small>${escapeHtml(item.region ?? 'Armenia')}</small>`,
      );
      marker.on('click', () => onSelectRef.current(item.id));
    }
  }, [items, markerIcons]);

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
