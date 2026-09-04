import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage, type UiMessageKey } from '@/lib/i18n/ui-messages';

export interface ProductRoadmapModule {
  id: string;
  title: string;
  status: 'beta' | 'planned' | 'coming_soon';
  statusLabel?: string;
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

const ROADMAP_MESSAGE_KEYS: Record<
  ProductRoadmapModule['id'],
  { title: UiMessageKey; description: UiMessageKey }
> = {
  'ai-historian': {
    title: 'roadmapAiHistorianTitle',
    description: 'roadmapAiHistorianDescription',
  },
  'artefact-explorer-3d': {
    title: 'roadmapArtefactExplorerTitle',
    description: 'roadmapArtefactExplorerDescription',
  },
  'immersive-galleries': {
    title: 'roadmapImmersiveGalleriesTitle',
    description: 'roadmapImmersiveGalleriesDescription',
  },
  'live-heritage-events': {
    title: 'roadmapLiveEventsTitle',
    description: 'roadmapLiveEventsDescription',
  },
};

const ROADMAP_STATUS_KEYS: Record<ProductRoadmapModule['status'], UiMessageKey> = {
  beta: 'roadmapStatusBeta',
  planned: 'roadmapStatusPlanned',
  coming_soon: 'roadmapStatusComingSoon',
};

export function getProductRoadmapModules(locale: SiteLocaleCode): ProductRoadmapModule[] {
  return PRODUCT_ROADMAP_MODULES.map((module) => {
    const keys = ROADMAP_MESSAGE_KEYS[module.id];
    const statusLabel = uiMessage(locale, ROADMAP_STATUS_KEYS[module.status]);
    if (!keys) return { ...module, statusLabel };

    return {
      ...module,
      title: uiMessage(locale, keys.title),
      description: uiMessage(locale, keys.description),
      statusLabel,
    };
  });
}
