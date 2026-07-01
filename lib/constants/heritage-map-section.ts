export const HERITAGE_MAP_SECTION = {
  eyebrow: 'HERITAGE MAP',
  title: "EXPLORE ARMENIA'S SACRED GEOGRAPHY",
  description:
    'Navigate heritage sites, monasteries, fortresses, and cultural landmarks across historic and modern Armenia.',
  placeholderTitle: 'HERITAGE MAP',
  placeholderSubtitle: 'Open the interactive map — sites are added as the archive grows',
  ctaUrl: '/map',
} as const;

export interface HeritageMapLegendItem {
  label: string;
  color: string;
}

export const HERITAGE_MAP_LEGEND: HeritageMapLegendItem[] = [
  { label: 'Religious Sites', color: '#27C6C8' },
  { label: 'Historical Monuments', color: '#D6B85A' },
  { label: 'Museums & Galleries', color: '#9B7BD4' },
  { label: 'Natural Heritage', color: '#D6855A' },
  { label: 'Archaeological Sites', color: '#6BB578' },
];

export interface HeritageMapNode {
  x: number;
  y: number;
  tone: 'teal' | 'gold';
  rings: 1 | 2;
  featured?: boolean;
}

export const HERITAGE_MAP_NODES: HeritageMapNode[] = [
  { x: 50, y: 14, tone: 'gold', rings: 2, featured: true },
  { x: 22, y: 36, tone: 'gold', rings: 2 },
  { x: 34, y: 48, tone: 'teal', rings: 2 },
  { x: 46, y: 38, tone: 'teal', rings: 1 },
  { x: 58, y: 26, tone: 'teal', rings: 2 },
  { x: 68, y: 44, tone: 'gold', rings: 1 },
  { x: 76, y: 30, tone: 'teal', rings: 1 },
];
