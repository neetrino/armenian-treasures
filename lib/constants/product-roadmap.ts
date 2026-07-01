export interface ProductRoadmapModule {
  id: string;
  title: string;
  status: 'beta' | 'planned' | 'coming_soon';
  description: string;
}

/** Future modules referenced in the Sheet — not implemented as products yet. */
export const PRODUCT_ROADMAP_MODULES: ProductRoadmapModule[] = [
  {
    id: 'ai-historian',
    title: 'AI Heritage Historian',
    status: 'planned',
    description:
      'Guided research assistant for verified archive sources. Planned after core catalogue and map coverage are stable.',
  },
  {
    id: 'artefact-explorer-3d',
    title: '3D Artefact Explorer',
    status: 'coming_soon',
    description: 'Photorealistic 3D object viewer — requires digitisation pipeline and viewer integration.',
  },
  {
    id: 'immersive-galleries',
    title: 'Immersive Galleries',
    status: 'coming_soon',
    description: 'Thematic virtual exhibition spaces built on verified collection metadata.',
  },
  {
    id: 'live-heritage-events',
    title: 'Live Heritage Events',
    status: 'planned',
    description: 'Streamed tours and lectures — requires events CMS and broadcast integration.',
  },
];

export const AI_HISTORIAN_ROADMAP = PRODUCT_ROADMAP_MODULES[0]!;
