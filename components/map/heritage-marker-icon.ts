import L from 'leaflet';
import type { PublicCultureItemDTO } from '@/lib/dto';

interface MarkerStyle {
  color: string;
  icon: string;
}

const CHURCH_ICON = [
  '<path d="M8 .45v2.35M6.15 1.6h3.7"/>',
  '<path d="M1.7 7.55 8 3.7l6.3 3.85V15.45H1.7Z"/>',
  '<path d="M6.45 15.45V11.5h3.1V15.45"/>',
].join('');

const CASTLE_ICON = [
  '<path d="M1.45 15.6V4.15h2.45V6.75h2.15V4.15h3.9V6.75h2.15V4.15H14.55V15.6Z"/>',
  '<path d="M6.35 15.6v-3.2h3.3V15.6"/>',
].join('');

const LANDMARK_ICON = [
  '<path d="M1.15 6.55 8 1.55 14.85 6.55"/>',
  '<path d="M1.15 6.55h13.7M1.35 15.45h13.3"/>',
  '<path d="M3.15 6.7v8.6M8 6.7v8.6M12.85 6.7v8.6"/>',
].join('');

const MOUNTAIN_ICON = '<path d="M1 15.2 5.7 5.2l2.9 3.9 2.5-2.9L15 15.2Z"/>';

const CROSS_ICON = '<path d="M8 1.2v13.6M3.15 6.15h9.7"/>';

const STAR_ICON = '<path d="M8 1.15 9.2 6.2 14.7 8 9.2 9.8 8 14.85 6.8 9.8 1.3 8 6.8 6.2Z"/>';

const MARKER_STYLE_BY_MAP_TYPE: Record<string, MarkerStyle> = {
  MONASTERY: { color: '#14A8AB', icon: CHURCH_ICON },
  CHURCH: { color: '#14A8AB', icon: CHURCH_ICON },
  CHAPEL: { color: '#14A8AB', icon: CHURCH_ICON },
  FORTRESS: { color: '#E3B03A', icon: CASTLE_ICON },
  SETTLEMENT: { color: '#3EAE62', icon: MOUNTAIN_ICON },
  MUSEUM: { color: '#8A6AD4', icon: LANDMARK_ICON },
  MEMORIAL: { color: '#8A6AD4', icon: LANDMARK_ICON },
  KHACHKAR: { color: '#E3B03A', icon: CROSS_ICON },
  OTHER: { color: '#E08A3C', icon: STAR_ICON },
};

function resolveMarkerStyle(mapType: PublicCultureItemDTO['mapType']): MarkerStyle {
  if (!mapType) return { color: '#E3B03A', icon: STAR_ICON };
  return MARKER_STYLE_BY_MAP_TYPE[mapType] ?? { color: '#E3B03A', icon: STAR_ICON };
}

function pinSvg(icon: string, color: string, selected: boolean): string {
  const ring = selected ? 2.75 : 1.8;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" width="100%" height="100%" aria-hidden="true">
    <path d="M20 50C20 50 34.5 32.4 34.5 19.5A14.5 14.5 0 1 0 5.5 19.5C5.5 32.4 20 50 20 50Z" fill="${color}" stroke="#fff" stroke-width="${ring}"/>
    <g transform="translate(12 10.15)" fill="none" stroke="#fff" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">${icon}</g>
  </svg>`;
}

export function makeHeritageMarkerIcon(
  mapType: PublicCultureItemDTO['mapType'],
  selected: boolean,
): L.DivIcon {
  const marker = resolveMarkerStyle(mapType);
  const width = selected ? 46 : 38;
  const height = selected ? 60 : 50;
  const shadow = selected
    ? 'drop-shadow(0 3px 3px rgba(0,0,0,.5)) drop-shadow(0 8px 14px rgba(20,16,8,.38))'
    : 'drop-shadow(0 2px 2px rgba(0,0,0,.42)) drop-shadow(0 6px 10px rgba(20,16,8,.3))';

  return L.divIcon({
    className: selected ? 'at-marker at-marker--selected' : 'at-marker',
    html: `<span style="display:flex;width:${width}px;height:${height}px;line-height:0;filter:${shadow}">${pinSvg(marker.icon, marker.color, selected)}</span>`,
    iconSize: [width, height],
    iconAnchor: [width / 2, height - 1],
  });
}

export function makeHeritageClusterIcon(count: number): L.DivIcon {
  const size = count > 9 ? 46 : 40;
  return L.divIcon({
    className: 'at-marker',
    html: `<span style="display:flex;width:${size}px;height:${size}px;align-items:center;justify-content:center;border-radius:999px;background:#17130e;color:#fff;border:2.5px solid #E3B03A;font:700 15px/1 Inter,sans-serif;box-shadow:0 3px 8px rgba(0,0,0,.45)">${count}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}
