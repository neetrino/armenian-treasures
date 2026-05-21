'use client';

import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { PublicCultureItemDTO } from '@/lib/dto';

interface LeafletMapProps {
  items: PublicCultureItemDTO[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ARMENIA_CENTER: [number, number] = [40.1, 44.95];

function makeIcon(): L.DivIcon {
  return L.divIcon({
    className: 'at-marker',
    html:
      '<span class="block h-3 w-3 rounded-full bg-pomegranate ring-4 ring-pomegranate/30"></span>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

export function LeafletMap({ items, selectedId, onSelect }: LeafletMapProps) {
  const icon = useMemo(makeIcon, []);
  return (
    <MapContainer
      center={ARMENIA_CENTER}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => {
        if (item.latitude === null || item.longitude === null) return null;
        return (
          <Marker
            key={item.id}
            position={[item.latitude, item.longitude]}
            icon={icon}
            eventHandlers={{ click: () => onSelect(item.id) }}
          >
            <Popup>
              <strong>{item.title}</strong>
              <br />
              <small>{item.region ?? 'Armenia'}</small>
            </Popup>
          </Marker>
        );
      })}
      <FlyToSelection items={items} selectedId={selectedId} />
    </MapContainer>
  );
}

interface FlyProps {
  items: PublicCultureItemDTO[];
  selectedId: string | null;
}

function FlyToSelection({ items, selectedId }: FlyProps) {
  const map = useMap();
  const lastId = useRef<string | null>(null);
  useEffect(() => {
    if (!selectedId || selectedId === lastId.current) return;
    const item = items.find((i) => i.id === selectedId);
    if (item && item.latitude !== null && item.longitude !== null) {
      map.flyTo([item.latitude, item.longitude], 10, { duration: 0.8 });
      lastId.current = selectedId;
    }
  }, [selectedId, items, map]);
  return null;
}
