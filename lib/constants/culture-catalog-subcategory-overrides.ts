import type { CultureCatalogContent } from '@/lib/constants/culture-catalog-content';

type CatalogOverride = Partial<CultureCatalogContent>;

/** Copy overrides for fine-grained culture menu paths (Sheet taxonomy). */
export const CULTURE_CATALOG_SUBCATEGORY_OVERRIDES: Record<string, CatalogOverride> = {
  'legends/myths-and-gods': {
    about: {
      label: 'Myths & Gods',
      title: 'Cosmic Epics & Pagan Heritage',
      description:
        'Fire-born gods, creation myths and pre-Christian cosmology preserved in hymns, folklore and medieval retellings.',
      paragraphs: [
        'Armenian mythology bridges Indo-European and Near Eastern traditions — from Vahagn the dragon-reaper to the titan Bel and the forefather Hayk.',
        'This catalog documents deities, cosmological stories and the pagan roots that shaped later epic and Christian literature.',
      ],
      facts: [
        { label: 'Key Figures', value: 'Vahagn, Aramazd, Anahit, Hayk, Bel — foundational mythic personas.' },
        { label: 'Sources', value: 'Khorenatsi, pagan hymns, folk retellings and comparative Indo-European study.' },
        { label: 'Living Memory', value: 'Place names and festival echoes still carry pre-Christian symbolism.' },
        { label: 'Archive Goal', value: 'Contextualise mythic narratives with scholarly sources and regional variants.' },
      ],
    },
    items: {
      label: 'Mythic Entries',
      title: 'Gods & Creation Stories',
      description: 'Deities, cosmological epics and foundational myths of Armenian identity.',
      submitPrompt: 'Know a myth or deity narrative that belongs in this archive?',
      emptyMessage: 'Mythic entries will appear here once published.',
    },
  },
  'legends/legends-and-heroes': {
    about: {
      label: 'Legends & Heroes',
      title: 'Epic Cycles & Folk Heroes',
      description:
        'From Sassounsi Davit to regional folk champions — heroic narratives carried through exile and war.',
      paragraphs: [
        'The Daredevils of Sassoun is Armenia\'s national epic, orally transmitted for centuries and recognised by UNESCO.',
        'This catalog collects heroic cycles, regional legends and folk tales with historical context and sources.',
      ],
      facts: [
        { label: 'National Epic', value: 'Daredevils of Sassoun — four cycles of resistance and chivalry.' },
        { label: 'Oral Tradition', value: 'Performed by ashugs and village storytellers across the highlands.' },
        { label: 'Heroic Archetypes', value: 'David of Sassoun, Ara the Beautiful, Sanasar and other champions.' },
        { label: 'Archive Goal', value: 'Document narrative heritage before it fades from living memory.' },
      ],
    },
    items: {
      label: 'Legend Entries',
      title: 'Heroes & Folk Tales',
      description: 'Epic heroes, regional legends and oral traditions from across Armenian history.',
      submitPrompt: 'Know a legend or oral tradition that belongs in this archive?',
      emptyMessage: 'Legend entries will appear here once published.',
    },
  },
  'people/icons-of-history': {
    about: {
      label: 'Icons of History',
      title: 'Kings, Dynasties & Statesmen',
      description:
        'Rulers and political architects from Urartu and Tigranes the Great to the modern Republic.',
      paragraphs: [
        'Armenian statehood spans Urartian kings, Artaxiad emperors, Bagratid monarchs, Cilician rulers and modern statesmen.',
        'Each profile is placed in political, military and cultural context with primary and secondary sources.',
      ],
      facts: [
        { label: 'Imperial Age', value: 'Tigranes the Great — empire from the Caspian to the Mediterranean.' },
        { label: 'Medieval Kingdoms', value: 'Bagratid Ani, Cilician Armenia and their royal courts.' },
        { label: 'Modern Leaders', value: 'Statesmen of the First Republic and contemporary governance.' },
        { label: 'Open Archive', value: 'Biographical entries curated with chronology and regional context.' },
      ],
    },
    items: {
      label: 'Historical Profiles',
      title: 'Kings & Rulers',
      description: 'Dynasties, monarchs and statesmen who shaped Armenian political history.',
      submitPrompt: 'Propose a ruler or statesman profile for this catalog.',
      emptyMessage: 'Historical profiles will appear here once published.',
    },
  },
  'people/scientists': {
    about: {
      label: 'Scientists & Inventors',
      title: 'Pioneers of Learning',
      description:
        'Linguists, physicians, astronomers and inventors who advanced knowledge in Armenia and the diaspora.',
      paragraphs: [
        'From Mesrop Mashtots and the invention of the alphabet to modern physicists and physicians of Armenian descent worldwide.',
        'This catalog highlights scientific achievement with fields, dates and archival references where available.',
      ],
      facts: [
        { label: 'Foundational', value: 'Mesrop Mashtots — alphabet, theology and the birth of Armenian literacy.' },
        { label: 'Medicine & Science', value: 'Physicians, astronomers and researchers across centuries.' },
        { label: 'Diaspora Innovation', value: 'Inventors and Nobel-calibre contributors in global institutions.' },
        { label: 'Archive Goal', value: 'Link biographies to publications, institutions and digitised sources.' },
      ],
    },
    items: {
      label: 'Scientist Profiles',
      title: 'Researchers & Inventors',
      description: 'Scientists, inventors and scholars of Armenian heritage.',
      submitPrompt: 'Propose a scientist or inventor profile for this catalog.',
      emptyMessage: 'Scientist profiles will appear here once published.',
    },
  },
  'people/famous-armenians': {
    about: {
      label: 'Famous Armenians',
      title: 'Artists, Leaders & Innovators',
      description:
        'Globally recognised Armenians in music, cinema, literature, diplomacy and public life.',
      paragraphs: [
        'From Komitas and Khachaturian to Parajanov, Saroyan and contemporary diaspora leaders — figures who carried culture across borders.',
        'Browse by field or propose new profiles for curatorial review.',
      ],
      facts: [
        { label: 'Music & Arts', value: 'Composers, painters, filmmakers and performers of world renown.' },
        { label: 'Literature', value: 'Novelists, poets and playwrights in Armenian and world languages.' },
        { label: 'Public Life', value: 'Diplomats, entrepreneurs and community leaders in the diaspora.' },
        { label: 'Living Archive', value: 'Profiles linked to museums, recordings and published works.' },
      ],
    },
    items: {
      label: 'Notable Profiles',
      title: 'Famous Armenians',
      description: 'Artists, leaders and innovators from Armenia and the global diaspora.',
      submitPrompt: 'Propose a notable Armenian profile for this catalog.',
      emptyMessage: 'Profiles will appear here once published.',
    },
  },
  'history/historical-events': {
    items: {
      label: 'Historical Entries',
      title: 'Events & Turning Points',
      description: 'Defining moments from Urartu to the modern Republic.',
      submitPrompt: 'Propose a historical event for this catalog.',
      emptyMessage: 'Historical events will appear here once published.',
    },
  },
  'history/capitals': {
    about: {
      label: 'Capitals',
      title: 'Seats of Armenian Power',
      description: 'Urartian fortresses, medieval capitals and the cities that anchor national memory.',
      paragraphs: [
        'From Erebuni and Dvin to Ani, Yerevan and diaspora cultural capitals — urban centres where statehood and culture converged.',
      ],
      facts: [
        { label: 'Ancient', value: 'Erebuni (782 BC) — urban ancestor of Yerevan.' },
        { label: 'Medieval', value: 'Ani — the Bagratid "city of 1,001 churches".' },
        { label: 'Modern', value: 'Yerevan — Soviet planning atop ancient layers.' },
        { label: 'Archive Goal', value: 'Link capitals to monuments, museums and map coordinates.' },
      ],
    },
    items: {
      label: 'Capital Entries',
      title: 'Historic Capitals',
      description: 'Cities and fortresses that served as seats of Armenian power.',
      submitPrompt: 'Propose a capital or urban heritage entry.',
      emptyMessage: 'Capital entries will appear here once published.',
    },
  },
  'history/battles-and-wars': {
    items: {
      label: 'Military History',
      title: 'Battles & Campaigns',
      description: 'Wars, sieges and strategic turning points across Armenian history.',
      submitPrompt: 'Propose a battle or military history entry.',
      emptyMessage: 'Battle entries will appear here once published.',
    },
  },
  'history/christian-heritage': {
    items: {
      label: 'Christian Heritage',
      title: 'Faith & the First Christian Nation',
      description: 'Conversion, liturgy, monasticism and sacred architecture.',
      submitPrompt: 'Propose a Christian heritage entry.',
      emptyMessage: 'Christian heritage entries will appear here once published.',
    },
  },
  'history/chronicles-and-manuscripts': {
    items: {
      label: 'Chronicles',
      title: 'Historiography & Manuscripts',
      description: 'Chronicles, printing milestones and manuscript culture.',
      submitPrompt: 'Propose a chronicle or manuscript entry.',
      emptyMessage: 'Chronicle entries will appear here once published.',
    },
  },
  'history/monuments-and-landmarks': {
    items: {
      label: 'Monuments',
      title: 'Landmarks & Sites of Memory',
      description: 'Archaeological sites, memorials and nationally significant landmarks.',
      submitPrompt: 'Propose a monument or landmark entry.',
      emptyMessage: 'Monument entries will appear here once published.',
    },
  },
  'history/traditions': {
    items: {
      label: 'Traditions',
      title: 'Living Customs & Rituals',
      description: 'Intangible heritage, festivals and community practices.',
      submitPrompt: 'Propose a tradition entry for this catalog.',
      emptyMessage: 'Tradition entries will appear here once published.',
    },
  },
  'heritage/sculpting': {
    eyebrow: '✦ Sculptors · Monuments · Armenia ✦',
    accent: 'Քանդակ',
    slogan: 'Khachkars, monuments and contemporary works',
    statLabels: { entries: 'Works', regions: 'Artists', third: 'Sites', fourth: 'Collections' },
  },
};
