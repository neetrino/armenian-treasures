import type { MenuNode } from '@/lib/culture-menu';
import {
  mergeCultureCatalogLayers,
  parseMenuCatalogContent,
} from '@/lib/types/culture-catalog-content';
import { EXTENDED_CULTURE_CATALOG_OVERRIDES } from '@/lib/constants/culture-catalog-overrides-extended';
import { CULTURE_CATALOG_SUBCATEGORY_OVERRIDES } from '@/lib/constants/culture-catalog-subcategory-overrides';

export interface CultureCatalogFact {
  label: string;
  value: string;
}

export interface CultureCatalogContent {
  eyebrow: string;
  accent: string;
  slogan: string;
  heroImage?: string;
  about: {
    label: string;
    title: string;
    description: string;
    paragraphs: string[];
    extraHeading?: string;
    extraParagraph?: string;
    facts: CultureCatalogFact[];
  };
  items: {
    label: string;
    title: string;
    description: string;
    submitPrompt: string;
    emptyMessage: string;
  };
  map: {
    eyebrow: string;
    title: string;
    description: string;
    placeholderTitle: string;
  };
  statLabels: {
    entries: string;
    regions: string;
    third: string;
    fourth: string;
  };
}

const DEFAULT_HERO_IMAGE = '/images/technology/section-heritage-bg.webp';

const OVERRIDES: Record<string, Partial<CultureCatalogContent>> = {
  architecture: {
    eyebrow: '✦ Architecture · Sacred & Defensive · Armenia ✦',
    accent: 'Ճարտարապետություն',
    slogan: 'Stone monuments carved into the highlands',
    about: {
      label: 'Armenian Architecture',
      title: 'Fortresses, Monasteries & Highland Stone',
      description:
        'From cliff-top monasteries to plateau fortresses — Armenia\'s built heritage spans two millennia of sacred and defensive architecture.',
      paragraphs: [
        'Armenian architects developed a distinctive vocabulary of central-domed churches, rock-cut sanctuaries, and fortress complexes that guarded trade routes across the Caucasus.',
        'This catalog groups the archive into churches and castles — each sub-catalog curated with regional context, period labels, and immersive 3D tours where available.',
      ],
      facts: [
        { label: 'Sacred Sites', value: 'Monasteries and churches from the 4th to 14th centuries across every Armenian region.' },
        { label: 'Defensive Works', value: 'Fortresses at Amberd, Smbataberd and beyond — highland strongholds of the Bagratid era.' },
        { label: 'Building Material', value: 'Volcanic tuff, basalt and cliff-face rock — structures hewn from the mountain itself.' },
        { label: 'Digital Record', value: 'Each site geolocated and photographed for the open heritage archive.' },
      ],
    },
    items: {
      label: 'Sub-catalogs',
      title: 'Explore Architecture',
      description: 'Browse churches and castles — two curated entry points to Armenia\'s built heritage.',
      submitPrompt: 'Propose a new architecture sub-catalog or monument entry.',
      emptyMessage: 'Architecture sub-catalogs will appear here once published.',
    },
  },
  'architecture/churches': {
    eyebrow: '✦ Architecture · Sacred Monuments · Armenia ✦',
    accent: 'Միջնադարյան Վանքեր',
    slogan: 'Stone prayers carved into the highlands',
    about: {
      label: 'Armenian Church Architecture',
      title: 'Faith Carved in Stone',
      description:
        'Armenia was the first nation to adopt Christianity as a state religion. Its churches are among the world\'s oldest sacred architecture.',
      paragraphs: [
        'From the 4th-century foundations at Geghard to the 13th-century masterworks of Noravank, Armenian church architecture evolved the drum dome, the khachkar, and monastic universities.',
        'These monuments guarded Armenian identity through centuries of invasion. Today they anchor the digital archive.',
      ],
      extraHeading: 'What You Will Find Here',
      extraParagraph:
        'Curated monasteries and cliff churches across every region — with period labels, regional context, and 3D tours where available.',
      facts: [
        { label: 'Architectural Form', value: 'Central-domed basilicas and cruciform plans that shaped Eastern Christendom.' },
        { label: 'Sacred Material', value: 'Tuff, basalt and cliff-face rock — churches hewn from the mountain at Geghard and Noravank.' },
        { label: 'World Heritage', value: 'UNESCO-inscribed monasteries including Geghard and Haghpat.' },
        { label: 'Living Tradition', value: 'From Tatev\'s Wings to Khor Virap — sites still visited and preserved.' },
      ],
    },
    items: {
      label: 'Curated Monuments',
      title: 'Monasteries & Cliff Churches',
      description: 'Landmark sacred sites — each a chapter in Armenia\'s architectural and spiritual history.',
      submitPrompt: 'Know a monastery or church that belongs in this archive?',
      emptyMessage: 'Monument entries will appear here once published in the admin panel.',
    },
    map: {
      eyebrow: 'Heritage Map',
      title: 'Sacred Geography of Armenia',
      description: 'Every monastery in this catalog is geolocated — open the full interactive map to navigate pilgrimage routes and UNESCO sites.',
      placeholderTitle: 'Explore Church Locations',
    },
    statLabels: { entries: 'Sacred Sites', regions: 'Regions', third: 'UNESCO Sites', fourth: '3D Tours' },
  },
  'architecture/castles': {
    eyebrow: '✦ Architecture · Fortresses · Armenia ✦',
    accent: 'Բերդեր',
    slogan: 'Highland strongholds above the clouds',
    about: {
      label: 'Armenian Fortresses',
      title: 'Walls That Guarded a Kingdom',
      description: 'Fortresses across the Armenian plateau — from Urartian citadels to medieval bagratid strongholds.',
      paragraphs: [
        'Positioned on volcanic slopes and cliff edges, Armenian castles controlled mountain passes and sheltered populations during invasion.',
        'Many survive as ruins; others have been digitally reconstructed for the heritage archive.',
      ],
      facts: [
        { label: 'Strategic Position', value: 'Fortresses anchored to Mount Aragats, the Vayots Dzor gorges, and Syunik\'s high passes.' },
        { label: 'Medieval Era', value: '7th–13th century defensive complexes of the Bagratid and later kingdoms.' },
        { label: 'Combined Sites', value: 'Amberd pairs fortress walls with the Vahramashen church — faith and defence in one place.' },
        { label: 'Open Archive', value: 'Each fortress mapped with coordinates and historical context.' },
      ],
    },
    items: {
      label: 'Curated Fortresses',
      title: 'Castles & Strongholds',
      description: 'Fortresses guarding the historic Armenian plateau — from Amberd to Smbataberd.',
      submitPrompt: 'Know a fortress that belongs in this archive?',
      emptyMessage: 'Fortress entries will appear here once published.',
    },
    map: {
      placeholderTitle: 'Explore Fortress Locations',
      title: 'Fortresses on the Map',
      description: 'Geolocated strongholds across Armenia — open the interactive map to explore highland defensive sites.',
      eyebrow: 'Heritage Map',
    },
    statLabels: { entries: 'Fortresses', regions: 'Regions', third: 'Centuries', fourth: '3D Tours' },
  },
  legends: {
    eyebrow: '✦ Legends · Myth & Memory · Armenia ✦',
    accent: 'Լեգենդներ',
    slogan: 'Heroes and myths from the highlands',
    statLabels: { entries: 'Legends', regions: 'Themes', third: 'Eras', fourth: 'Sources' },
  },
  museums: {
    eyebrow: '✦ Museums · Memory · Armenia ✦',
    accent: 'Թանգարաններ',
    slogan: 'Institutions safeguarding art and memory',
    statLabels: { entries: 'Museums', regions: 'Cities', third: 'Collections', fourth: '3D Tours' },
  },
  people: {
    eyebrow: '✦ People · Makers of Identity · Armenia ✦',
    accent: 'Մարդիկ',
    slogan: 'Architects, composers, painters and writers',
    statLabels: { entries: 'Profiles', regions: 'Fields', third: 'Eras', fourth: 'Archives' },
  },
  history: {
    eyebrow: '✦ History · Three Millennia · Armenia ✦',
    accent: 'Պատմություն',
    slogan: 'Turning points across Armenian history',
    statLabels: { entries: 'Events', regions: 'Eras', third: 'Regions', fourth: 'Sources' },
  },
  heritage: {
    eyebrow: '✦ Culture · Living Heritage · Armenia ✦',
    accent: 'Մշակույթ',
    slogan: 'Eleven domains of Armenian material culture',
    about: {
      label: 'Armenian Culture',
      title: 'Living Heritage Across Eleven Domains',
      description: 'From khachkar carving to lavash bread — intangible and material traditions recognised by UNESCO and lived daily.',
      paragraphs: [
        'The culture catalog spans paintings, music, taraz, carpets, food, dance, theatre, armaments and publications.',
        'Each sub-catalog is curated independently — browse the domain that interests you or suggest new material for review.',
      ],
      facts: [
        { label: 'UNESCO Recognition', value: 'Lavash, khachkars, duduk music and more inscribed as intangible heritage.' },
        { label: 'Eleven Domains', value: 'Paintings, music, writers, taraz, carpets, food, sculpting, dance, theatre, armaments, publications.' },
        { label: 'Diaspora Threads', value: 'Traditions carried across continents and preserved in museums and family practice.' },
        { label: 'Open Submission', value: 'Researchers and families can propose new entries through the archive.' },
      ],
    },
    items: {
      label: 'Heritage Domains',
      title: 'Browse by Domain',
      description: 'Eleven curated sub-catalogs — each a doorway into a living Armenian tradition.',
      submitPrompt: 'Propose a new heritage domain or cultural entry.',
      emptyMessage: 'Heritage sub-catalogs will appear here once published.',
    },
  },
  submit: {
    eyebrow: '✦ Contribute · Open Archive · Armenia ✦',
    accent: 'Ներկայացրեք նախագիծ',
    slogan: 'Every submission reviewed by hand',
  },
  ...EXTENDED_CULTURE_CATALOG_OVERRIDES,
  ...CULTURE_CATALOG_SUBCATEGORY_OVERRIDES,
};

function mergeContent(
  base: CultureCatalogContent,
  override?: Partial<CultureCatalogContent>,
): CultureCatalogContent {
  if (!override) return base;
  return {
    ...base,
    ...override,
    about: {
      ...base.about,
      ...override.about,
      paragraphs: override.about?.paragraphs ?? base.about.paragraphs,
      facts: override.about?.facts ?? base.about.facts,
    },
    items: { ...base.items, ...override.items },
    map: { ...base.map, ...override.map },
    statLabels: { ...base.statLabels, ...override.statLabels },
  };
}

function buildBaseContent(
  title: string,
  description: string,
  parentTitle?: string,
): CultureCatalogContent {
  const scope = parentTitle ? `${parentTitle} / ${title}` : title;
  return {
    eyebrow: `✦ ${scope} · Cultural Portal · Armenia ✦`,
    accent: title,
    slogan: description || `Curated ${title.toLowerCase()} from the Armenian archive`,
    about: {
      label: scope,
      title: `Discover ${title}`,
      description: description || `Curated entries from the Armenian ${title.toLowerCase()} archive.`,
      paragraphs: [
        `This catalog brings together curated ${title.toLowerCase()} entries — each reviewed, sourced, and prepared for the open heritage archive.`,
        'Browse the collection below or suggest new material for curatorial review.',
      ],
      facts: [
        { label: 'Curated Archive', value: `Every ${title.toLowerCase()} entry is reviewed before publication.` },
        { label: 'Regional Context', value: 'Entries include region, period and source information where available.' },
        { label: 'Open Submission', value: 'Researchers and institutions can propose new material for review.' },
        { label: 'Digital Access', value: '3D tours, galleries and map coordinates where the material supports them.' },
      ],
    },
    items: {
      label: 'Curated Entries',
      title: title,
      description: description || `Explore ${title.toLowerCase()} from the Armenian cultural archive.`,
      submitPrompt: `Know an entry that belongs in ${title}?`,
      emptyMessage: 'Entries will appear here once published in the admin panel.',
    },
    map: {
      eyebrow: 'Heritage Map',
      title: `${title} on the Map`,
      description: 'Geolocated entries in this catalog — open the full interactive map to explore.',
      placeholderTitle: `Explore ${title} Locations`,
    },
    statLabels: {
      entries: 'Entries',
      regions: 'Regions',
      third: 'Periods',
      fourth: '3D Tours',
    },
  };
}

export function resolveCultureCatalogContent(
  node: MenuNode,
  parent?: MenuNode,
): CultureCatalogContent {
  const key = parent ? `${parent.slug}/${node.slug}` : node.slug;
  const base = buildBaseContent(
    node.title,
    node.description ?? '',
    parent?.title,
  );
  const codeOverride = OVERRIDES[key] ?? OVERRIDES[node.slug];
  const dbOverride = parseMenuCatalogContent(node.catalogContent);
  const merged = mergeCultureCatalogLayers(base, codeOverride, dbOverride);
  const adminHeroImage = dbOverride?.heroImage?.trim();

  if (adminHeroImage) {
    return { ...merged, heroImage: adminHeroImage };
  }

  const { heroImage: _removed, ...withoutHeroImage } = merged;
  return withoutHeroImage;
}

export function resolveCultureCatalogFormContent(
  kind: 'submit' | 'new-subcatalog',
  category?: MenuNode,
): CultureCatalogContent {
  if (kind === 'submit') {
    const base = buildBaseContent('Add your project', 'Contribute to the open archive.');
    return mergeContent(base, OVERRIDES.submit);
  }
  const title = category?.title ?? 'Category';
  const base = buildBaseContent('Add a new sub-catalog', `Propose a new ${title.toLowerCase()} sub-catalog.`);
  return {
    ...base,
    eyebrow: `✦ ${title} · New Sub-catalog · Armenia ✦`,
    accent: 'Նոր ենթակատալոգ',
    slogan: 'Expand the open archive',
  };
}

export const CULTURE_CATALOG_DEFAULT_HERO_IMAGE = DEFAULT_HERO_IMAGE;
