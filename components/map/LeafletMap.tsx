'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { PublicCultureItemDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { bindMapWheelZoom } from '@/components/map/bind-map-wheel-zoom';
import { clusterHeritageMarkers } from '@/components/map/heritage-marker-clusters';
import { makeHeritageClusterIcon, makeHeritageMarkerIcon } from '@/components/map/heritage-marker-icon';
import { MapWheelZoomHint } from '@/components/map/MapWheelZoomHint';

interface LeafletMapProps {
  items: PublicCultureItemDTO[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  locale?: SiteLocaleCode;
}

const ARMENIA_CENTER: [number, number] = [40.07, 45.04];
const ARMENIA_BOUNDS = L.latLngBounds([38.84, 43.45], [41.3, 46.63]);
const TILE_ATTRIBUTION = '© OpenStreetMap contributors';
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const SELECTED_ITEM_ZOOM = 18;

function showArmenia(map: L.Map, animate: boolean): void {
  map.fitBounds(ARMENIA_BOUNDS, { padding: [28, 28], animate });
}

function bindCountryView(
  map: L.Map,
  container: HTMLElement,
  selectedIdRef: { current: string | null },
  userMovedRef: { current: boolean },
): () => void {
  let programmatic = false;
  const fit = (animate: boolean) => {
    programmatic = true;
    showArmenia(map, animate);
    window.setTimeout(() => {
      programmatic = false;
    }, 0);
  };
  const onDrag = () => {
    userMovedRef.current = true;
  };
  const onZoom = () => {
    if (!programmatic) userMovedRef.current = true;
  };
  map.on('dragstart', onDrag);
  map.on('zoomstart', onZoom);
  map.invalidateSize();
  fit(false);
  const observer = new ResizeObserver(() => {
    const box = container.getBoundingClientRect();
    if (userMovedRef.current || selectedIdRef.current) return;
    if (box.width < 160 || box.height < 160) return;
    map.invalidateSize();
    fit(false);
  });
  observer.observe(container);
  return () => {
    observer.disconnect();
    map.off('dragstart', onDrag);
    map.off('zoomstart', onZoom);
  };
}

function mappableItems(items: PublicCultureItemDTO[]): PublicCultureItemDTO[] {
  return items.filter(
    (item) => item.latitude !== null && item.longitude !== null,
  );
}

function addPinMarker(
  layer: L.LayerGroup,
  item: PublicCultureItemDTO,
  selectedId: string | null,
  markerIcons: Map<string, L.DivIcon>,
  regionLabel: string,
  onSelect: (id: string) => void,
): void {
  const marker = L.marker([item.latitude!, item.longitude!], {
    icon: markerIcons.get(item.id) ?? makeHeritageMarkerIcon(item.mapType, false),
    zIndexOffset: selectedId === item.id ? 800 : 0,
  }).addTo(layer);
  marker.bindPopup(
    `<strong>${escapeHtml(item.title)}</strong><br /><small>${escapeHtml(item.region ?? regionLabel)}</small>`,
  );
  marker.on('click', () => onSelect(item.id));
}

function addClusterMarker(
  map: L.Map,
  layer: L.LayerGroup,
  latitude: number,
  longitude: number,
  items: PublicCultureItemDTO[],
): void {
  const marker = L.marker([latitude, longitude], {
    icon: makeHeritageClusterIcon(items.length),
    zIndexOffset: 500,
  }).addTo(layer);
  marker.on('click', () => {
    const bounds = L.latLngBounds(items.map((item) => [item.latitude!, item.longitude!]));
    map.fitBounds(bounds.pad(0.45), { maxZoom: 16, animate: true });
  });
}

export function LeafletMap({ items, selectedId, onSelect, locale = 'EN' }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  const selectedIdRef = useRef(selectedId);
  const userMovedRef = useRef(false);
  const hadSelectionRef = useRef(false);
  const [wheelZoomActive, setWheelZoomActive] = useState(false);
  const [markerZoom, setMarkerZoom] = useState(7);
  const armeniaLabel = uiMessage(locale, 'armenia');
  const mapAriaLabel = uiMessage(locale, 'interactiveHeritageMapAria');
  const markerIcons = useMemo(() => {
    const icons = new Map<string, L.DivIcon>();
    for (const item of mappableItems(items)) {
      const isSelected = selectedId === item.id;
      icons.set(item.id, makeHeritageMarkerIcon(item.mapType, isSelected));
    }
    return icons;
  }, [items, selectedId]);

  useEffect(() => {
    onSelectRef.current = onSelect;
    selectedIdRef.current = selectedId;
  }, [onSelect, selectedId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const map = L.map(container, {
      center: ARMENIA_CENTER,
      zoom: 7,
      scrollWheelZoom: false,
      touchZoom: true,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer(TILE_URL, { attribution: TILE_ATTRIBUTION }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    const unbindCountry = bindCountryView(map, container, selectedIdRef, userMovedRef);
    const unbindWheelZoom = bindMapWheelZoom(map, container, setWheelZoomActive);

    return () => {
      unbindCountry();
      unbindWheelZoom();
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const onZoom = () => setMarkerZoom(map.getZoom());
    map.on('zoomend', onZoom);
    return () => {
      map.off('zoomend', onZoom);
    };
  }, []);

  useEffect(() => {
    const layer = markersLayerRef.current;
    const map = mapRef.current;
    if (!layer || !map) return;

    layer.clearLayers();
    const groups = clusterHeritageMarkers(map, mappableItems(items));
    for (const group of groups) {
      const item = group.items[0];
      if (group.items.length > 1) {
        addClusterMarker(map, layer, group.latitude, group.longitude, group.items);
      } else if (item) {
        addPinMarker(layer, item, selectedId, markerIcons, armeniaLabel, (id) => onSelectRef.current(id));
      }
    }
  }, [armeniaLabel, items, markerIcons, markerZoom, selectedId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!selectedId) {
      if (!hadSelectionRef.current) return;
      hadSelectionRef.current = false;
      userMovedRef.current = false;
      showArmenia(map, true);
      return;
    }

    const item = mappableItems(items).find((entry) => entry.id === selectedId);
    if (!item) return;

    hadSelectionRef.current = true;
    map.flyTo([item.latitude!, item.longitude!], SELECTED_ITEM_ZOOM, { duration: 0.8 });
  }, [selectedId, items]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="z-0 h-full w-full"
        role="application"
        aria-label={mapAriaLabel}
        tabIndex={0}
      />
      <MapWheelZoomHint active={wheelZoomActive} locale={locale} />
    </div>
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
