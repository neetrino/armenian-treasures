import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';

type CatalogOverride = Partial<CultureCatalogContent>;

export const EXTENDED_CULTURE_CATALOG_OVERRIDES: Record<string, CatalogOverride> = {
  legends: {
    about: {
      label: 'Armenian Legends',
      title: 'Heroes, Myths & Oral Memory',
      description:
        'From Sassounsi Davit to the golden-fleeced rams of Armenian epic — legends that carried identity through exile and war.',
      paragraphs: [
        'Armenian legend blends history and myth: epic cycles like Daredevils of Sassoun, creation stories of Hayk and Bel, and regional folk tales preserved in village memory.',
        'This catalog collects narrative traditions — each entry sourced, contextualised, and prepared for the open heritage archive.',
      ],
      facts: [
        { label: 'Epic Cycles', value: 'Daredevils of Sassoun — Armenia\'s national epic, orally transmitted for centuries.' },
        { label: 'Creation Myths', value: 'Hayk the forefather, Bel the titan — foundational stories of Armenian identity.' },
        { label: 'Living Oral Tradition', value: 'Legends still told in diaspora communities and highland villages.' },
        { label: 'Archive Goal', value: 'Document and share narrative heritage before it fades from living memory.' },
      ],
    },
    items: {
      label: 'Legend Entries',
      title: 'Epics & Folk Tales',
      description: 'Heroic cycles, creation myths and regional folk narratives from across Armenian history.',
      submitPrompt: 'Know a legend or oral tradition that belongs in this archive?',
      emptyMessage: 'Legend entries will appear here once published.',
    },
  },
  museums: {
    about: {
      label: 'Armenian Museums',
      title: 'Guardians of Memory & Art',
      description:
        'From the Matenadaran\'s manuscripts to house-museums of Komitas and Khachaturian — institutions preserving Armenia\'s material culture.',
      paragraphs: [
        'Armenian museums hold manuscripts, liturgical art, musical archives, archaeological finds, and diaspora collections spanning continents.',
        'Each institution in this catalog is linked with location, collection focus, and digital access where available.',
      ],
      facts: [
        { label: 'National Collections', value: 'National Gallery, History Museum, Matenadaran — Yerevan\'s core institutions.' },
        { label: 'House-Museums', value: 'Composer, painter and writer house-museums across Armenia and the diaspora.' },
        { label: 'Manuscript Heritage', value: 'Matenadaran alone holds 23,000 manuscripts and documents.' },
        { label: 'Digital Access', value: '3D tours and online collections where institutions provide them.' },
      ],
    },
    items: {
      label: 'Museum Entries',
      title: 'Institutions & Collections',
      description: 'National museums, house-museums and diaspora galleries safeguarding Armenian heritage.',
      submitPrompt: 'Know a museum that belongs in this archive?',
      emptyMessage: 'Museum entries will appear here once published.',
    },
  },
  people: {
    about: {
      label: 'Armenian People',
      title: 'Kings, Scientists & Makers of Identity',
      description:
        'From Tigranes the Great to Komitas, Saryan and Ter-Petrosyan — the figures who shaped Armenian civilisation.',
      paragraphs: [
        'This catalog profiles rulers, scientists, artists, writers and diaspora leaders — each placed in historical and cultural context.',
        'Browse by field or era, or propose new profiles for curatorial review.',
      ],
      facts: [
        { label: 'Historical Figures', value: 'Kings, military leaders and statesmen from Urartu to the modern Republic.' },
        { label: 'Science & Learning', value: 'Astronomers, physicians and inventors of Armenian descent worldwide.' },
        { label: 'Arts & Letters', value: 'Composers, painters, writers and filmmakers who defined Armenian culture.' },
        { label: 'Diaspora Voices', value: 'Leaders and innovators who carried heritage across continents.' },
      ],
    },
    items: {
      label: 'Profiles',
      title: 'Notable Armenians',
      description: 'Kings, scientists, artists and leaders — curated biographical entries from the archive.',
      submitPrompt: 'Propose a notable Armenian profile for this catalog.',
      emptyMessage: 'People entries will appear here once published.',
    },
  },
  history: {
    about: {
      label: 'Armenian History',
      title: 'Three Millennia of Civilisation',
      description:
        'From Urartian fortresses to the 1918 Republic — the turning points that shaped the Armenian nation.',
      paragraphs: [
        'Armenian history spans the Kingdom of Urartu, the Artaxiad and Arsacid dynasties, medieval kingdoms, genocide survival, and the modern Republic.',
        'This catalog organises historical events, periods and themes for exploration and education.',
      ],
      facts: [
        { label: 'Ancient Roots', value: 'Urartu (9th c. BC) — one of the earliest highland civilisations in the region.' },
        { label: 'Golden Ages', value: 'Tigranes the Great, the Bagratid Renaissance, Cilician Armenia.' },
        { label: 'Survival', value: 'Genocide, dispersion, and the rebuilding of statehood in 1918 and 1991.' },
        { label: 'Open Archive', value: 'Events and themes curated with sources and regional context.' },
      ],
    },
    items: {
      label: 'Historical Entries',
      title: 'Events & Eras',
      description: 'Turning points and themes across three millennia of Armenian history.',
      submitPrompt: 'Propose a historical entry for this catalog.',
      emptyMessage: 'History entries will appear here once published.',
    },
  },
  'heritage/paintings': {
    eyebrow: '✦ Paintings · Fine Arts · Armenia ✦',
    accent: 'Նկարչություն',
    slogan: 'Miniatures, icons and modern canvases',
    statLabels: { entries: 'Works', regions: 'Artists', third: 'Periods', fourth: 'Galleries' },
  },
  'heritage/music': {
    eyebrow: '✦ Music · Sound & Soul · Armenia ✦',
    accent: 'Երաժշտություն',
    slogan: 'Duduk, folk song and liturgical chant',
    statLabels: { entries: 'Traditions', regions: 'Instruments', third: 'Composers', fourth: 'Recordings' },
  },
  'heritage/writers': {
    eyebrow: '✦ Writers · Letters · Armenia ✦',
    accent: 'Գրողներ',
    slogan: 'Poets and prose masters of Armenian letters',
    statLabels: { entries: 'Authors', regions: 'Genres', third: 'Periods', fourth: 'Archives' },
  },
  'heritage/taraz': {
    eyebrow: '✦ Taraz · Traditional Dress · Armenia ✦',
    accent: 'Տարազ',
    slogan: 'Regional costumes woven with identity',
    statLabels: { entries: 'Garments', regions: 'Regions', third: 'Motifs', fourth: 'Collections' },
  },
  'heritage/carpets': {
    eyebrow: '✦ Carpets · Woven Heritage · Armenia ✦',
    accent: 'Գորգեր',
    slogan: 'Ancient patterns in wool and colour',
    statLabels: { entries: 'Carpets', regions: 'Regions', third: 'Motifs', fourth: 'Museums' },
  },
  'heritage/theatre': {
    eyebrow: '✦ Theatre · Stage · Armenia ✦',
    accent: 'Թատրոն',
    slogan: 'From ancient Artashat to the modern stage',
    statLabels: { entries: 'Productions', regions: 'Venues', third: 'Playwrights', fourth: 'Archives' },
  },
  'heritage/dance': {
    eyebrow: '✦ Dance · Movement · Armenia ✦',
    accent: 'Պար',
    slogan: 'Kochari, Shalakho and ceremonial forms',
    statLabels: { entries: 'Dances', regions: 'Regions', third: 'Occasions', fourth: 'Ensembles' },
  },
  'heritage/food': {
    eyebrow: '✦ Food & Drink · Taste · Armenia ✦',
    accent: 'Հuisine',
    slogan: 'The world\'s oldest winemaking tradition',
    statLabels: { entries: 'Dishes', regions: 'Regions', third: 'Ingredients', fourth: 'UNESCO Items' },
  },
  'heritage/armaments': {
    eyebrow: '✦ Armaments · Military Heritage · Armenia ✦',
    accent: 'Զենք',
    slogan: 'Weapons and warriors across the ages',
    statLabels: { entries: 'Artefacts', regions: 'Eras', third: 'Collections', fourth: 'Museums' },
  },
  'heritage/publications': {
    eyebrow: '✦ Publications · Print · Armenia ✦',
    accent: 'Հրատարակություններ',
    slogan: 'Manuscripts, journals and scholarly works',
    statLabels: { entries: 'Publications', regions: 'Periods', third: 'Languages', fourth: 'Libraries' },
  },
};
