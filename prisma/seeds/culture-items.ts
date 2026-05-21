import { prisma } from '@/lib/db';
import type {
  CultureItemType,
  MapType,
} from '@prisma/client';
import type { MenuMap } from './culture-menu';

interface SeedItem {
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  menuPath: string;
  region?: string;
  periodLabel?: string;
  century?: number;
  yearLabel?: string;
  tourUrl?: string;
  latitude?: number;
  longitude?: number;
  mapType?: MapType;
  showOnMap?: boolean;
  itemType?: CultureItemType;
}

const ITEMS: SeedItem[] = [
  // Architecture / Churches
  {
    slug: 'tatev-monastery',
    title: 'Tatev Monastery',
    menuPath: 'architecture/churches',
    region: 'Syunik',
    periodLabel: '9th c.',
    century: 9,
    yearLabel: '9th century',
    tourUrl: 'https://my.matterport.com/show/?m=example-tatev',
    latitude: 39.3793,
    longitude: 46.2502,
    mapType: 'MONASTERY',
    showOnMap: true,
    itemType: 'MONUMENT',
    description:
      'A cliff-top monastery and former medieval university in Syunik, founded in the 9th century. Connected to the world by the longest reversible aerial tramway.',
  },
  {
    slug: 'geghard-monastery',
    title: 'Geghard Monastery',
    menuPath: 'architecture/churches',
    region: 'Kotayk',
    periodLabel: '4th c.',
    century: 4,
    yearLabel: '4th century',
    tourUrl: 'https://my.matterport.com/show/?m=example-geghard',
    latitude: 40.1422,
    longitude: 44.8181,
    mapType: 'MONASTERY',
    showOnMap: true,
    itemType: 'MONUMENT',
    description:
      'A UNESCO World Heritage monastery partially carved into the rock of the Azat valley, founded according to tradition by Gregory the Illuminator.',
  },
  {
    slug: 'khor-virap',
    title: 'Khor Virap',
    menuPath: 'architecture/churches',
    region: 'Ararat',
    periodLabel: '7th c.',
    century: 7,
    yearLabel: '7th century',
    tourUrl: 'https://my.matterport.com/show/?m=example-khorvirap',
    latitude: 39.8786,
    longitude: 44.5775,
    mapType: 'MONASTERY',
    showOnMap: true,
    itemType: 'MONUMENT',
    description:
      'A pilgrimage monastery on the Ararat plain marking the dungeon where Gregory the Illuminator was imprisoned for thirteen years.',
  },
  {
    slug: 'noravank',
    title: 'Noravank',
    menuPath: 'architecture/churches',
    region: 'Vayots Dzor',
    periodLabel: '13th c.',
    century: 13,
    yearLabel: '13th century',
    tourUrl: 'https://my.matterport.com/show/?m=example-noravank',
    latitude: 39.684,
    longitude: 45.2326,
    mapType: 'MONASTERY',
    showOnMap: true,
    itemType: 'MONUMENT',
    description:
      'A 13th-century monastic complex nestled at the end of a narrow red-cliff gorge, known for its two-storey Surb Astvatsatsin church.',
  },
  {
    slug: 'haghpat',
    title: 'Haghpat',
    menuPath: 'architecture/churches',
    region: 'Lori',
    periodLabel: '10th c.',
    century: 10,
    yearLabel: '10th century',
    tourUrl: 'https://my.matterport.com/show/?m=example-haghpat',
    latitude: 41.0944,
    longitude: 44.7117,
    mapType: 'MONASTERY',
    showOnMap: true,
    itemType: 'MONUMENT',
    description:
      'A UNESCO-inscribed 10th-century monastery of the Bagratid era, a major centre of medieval Armenian learning and manuscript production.',
  },
  {
    slug: 'sevanavank',
    title: 'Sevanavank',
    menuPath: 'architecture/churches',
    region: 'Gegharkunik',
    periodLabel: '9th c.',
    century: 9,
    yearLabel: '9th century',
    tourUrl: 'https://my.matterport.com/show/?m=example-sevanavank',
    latitude: 40.5615,
    longitude: 44.9333,
    mapType: 'MONASTERY',
    showOnMap: true,
    itemType: 'MONUMENT',
    description:
      'Two surviving 9th-century churches on a peninsula of Lake Sevan, founded under Princess Mariam of the Bagratid dynasty.',
  },
  // Architecture / Castles
  {
    slug: 'amberd-fortress',
    title: 'Amberd Fortress',
    menuPath: 'architecture/castles',
    region: 'Aragatsotn',
    periodLabel: '7th c.',
    century: 7,
    yearLabel: '7th century',
    latitude: 40.3878,
    longitude: 44.2287,
    mapType: 'FORTRESS',
    showOnMap: true,
    itemType: 'MONUMENT',
    description:
      'A 7th-century fortress on the slopes of Mount Aragats, anchored by the Vahramashen church and a complete system of cisterns and baths.',
  },
  {
    slug: 'smbataberd',
    title: 'Smbataberd',
    menuPath: 'architecture/castles',
    region: 'Vayots Dzor',
    periodLabel: '5th c.',
    century: 5,
    yearLabel: '5th century',
    latitude: 39.7378,
    longitude: 45.2786,
    mapType: 'FORTRESS',
    showOnMap: true,
    itemType: 'MONUMENT',
    description:
      'A high-altitude ridge fortress of the Syunik kingdom, famed for an underground stone aqueduct fed by a remote spring.',
  },
  {
    slug: 'lori-berd',
    title: 'Lori Berd',
    menuPath: 'architecture/castles',
    region: 'Lori',
    periodLabel: '11th c.',
    century: 11,
    yearLabel: '11th century',
    itemType: 'MONUMENT',
    description:
      "The 11th-century capital fortress of the Lori kingdom, perched on a triangular plateau between two gorges of the Dzoraget river.",
  },
  {
    slug: 'erebuni-fortress',
    title: 'Erebuni Fortress',
    menuPath: 'architecture/castles',
    region: 'Yerevan',
    periodLabel: '782 BC',
    century: -8,
    yearLabel: '782 BC',
    latitude: 40.1382,
    longitude: 44.5379,
    mapType: 'FORTRESS',
    showOnMap: true,
    itemType: 'MONUMENT',
    description:
      'Founded in 782 BC by Urartian king Argishti I, Erebuni is the urban ancestor of modern Yerevan, one of the oldest continuously inhabited capitals in the world.',
  },
  // Legends
  {
    slug: 'hayk-the-patriarch',
    title: 'Hayk the Patriarch',
    menuPath: 'legends',
    itemType: 'LEGEND',
    description:
      'The legendary founder of the Armenian nation who, according to Movses Khorenatsi, defeated the Babylonian tyrant Bel near Lake Van.',
  },
  {
    slug: 'ara-the-beautiful',
    title: 'Ara the Beautiful',
    menuPath: 'legends',
    itemType: 'LEGEND',
    description:
      'An Armenian king whose beauty so captivated the Assyrian queen Semiramis that she waged war for him, immortalised in countless retellings.',
  },
  {
    slug: 'vahagn-the-dragon-reaper',
    title: 'Vahagn the Dragon-Reaper',
    menuPath: 'legends',
    itemType: 'LEGEND',
    description:
      'The fire-born god of thunder and war, slayer of dragons, whose cosmic birth from a reed of fire is preserved in pagan Armenian hymns.',
  },
  {
    slug: 'david-of-sassoun',
    title: 'David of Sassoun',
    menuPath: 'legends',
    itemType: 'LEGEND',
    description:
      'The hero of the medieval epic "Daredevils of Sassoun", a UNESCO-recognised oral masterpiece of Armenian resistance and chivalry.',
  },
  // Museums
  {
    slug: 'matenadaran',
    title: 'Matenadaran',
    menuPath: 'museums',
    region: 'Yerevan',
    itemType: 'MUSEUM',
    latitude: 40.1916,
    longitude: 44.5215,
    mapType: 'MUSEUM',
    showOnMap: true,
    description:
      'The Mesrop Mashtots Institute of Ancient Manuscripts, custodian of more than 23,000 medieval manuscripts and a UNESCO Memory of the World site.',
  },
  {
    slug: 'history-museum-of-armenia',
    title: 'History Museum of Armenia',
    menuPath: 'museums',
    region: 'Yerevan',
    itemType: 'MUSEUM',
    description:
      'The national museum on Republic Square, chronicling Armenian civilisation from the Bronze Age through the Republic.',
  },
  {
    slug: 'sergei-parajanov-museum',
    title: 'Sergei Parajanov Museum',
    menuPath: 'museums',
    region: 'Yerevan',
    itemType: 'MUSEUM',
    description:
      'A museum dedicated to the surrealist filmmaker and collagist, housing his collages, drawings, dolls and the recreated rooms of his imagination.',
  },
  {
    slug: 'armenian-genocide-museum',
    title: 'Armenian Genocide Museum',
    menuPath: 'museums',
    region: 'Yerevan',
    itemType: 'MUSEUM',
    description:
      'Part of the Tsitsernakaberd memorial complex, this museum documents the 1915 Armenian Genocide through testimony, photography and artefact.',
  },
  {
    slug: 'erebuni-museum',
    title: 'Erebuni Museum',
    menuPath: 'museums',
    region: 'Yerevan',
    itemType: 'MUSEUM',
    description:
      'A museum at the foot of the Erebuni citadel, exhibiting Urartian inscriptions, weapons and frescoes from the founding of Yerevan.',
  },
  {
    slug: 'folk-arts-museum',
    title: 'Folk Arts Museum',
    menuPath: 'museums',
    region: 'Yerevan',
    itemType: 'MUSEUM',
    description:
      'A national collection of Armenian carpets, ceramics, woodcarving, embroidery and metalwork drawn from every historic region.',
  },
  // People
  {
    slug: 'mesrop-mashtots',
    title: 'Mesrop Mashtots',
    menuPath: 'people',
    yearLabel: '362–440',
    itemType: 'PERSON',
    description:
      'Theologian and linguist who created the Armenian alphabet in 405 AD, securing the survival of a literature and a faith.',
  },
  {
    slug: 'komitas',
    title: 'Komitas',
    menuPath: 'people',
    yearLabel: '1869–1935',
    itemType: 'PERSON',
    description:
      'Priest, ethnomusicologist and composer who transcribed thousands of Armenian folk songs and founded modern Armenian classical music.',
  },
  {
    slug: 'aram-khachaturian',
    title: 'Aram Khachaturian',
    menuPath: 'people',
    yearLabel: '1903–1978',
    itemType: 'PERSON',
    description:
      'One of the 20th century\'s great composers, whose ballets Spartacus and Gayane and the universally known Sabre Dance reshaped symphonic music.',
  },
  {
    slug: 'sergei-parajanov',
    title: 'Sergei Parajanov',
    menuPath: 'people',
    yearLabel: '1924–1990',
    itemType: 'PERSON',
    description:
      'Filmmaker of poetic cinema whose Sayat-Nova (The Color of Pomegranates) is considered one of the most singular works in film history.',
  },
  {
    slug: 'martiros-saryan-person',
    title: 'Martiros Saryan',
    menuPath: 'people',
    yearLabel: '1880–1972',
    itemType: 'PERSON',
    description:
      'The defining painter of 20th-century Armenia, whose saturated landscapes shaped a national visual identity.',
  },
  {
    slug: 'william-saroyan-person',
    title: 'William Saroyan',
    menuPath: 'people',
    yearLabel: '1908–1981',
    itemType: 'PERSON',
    description:
      'Pulitzer Prize-winning Armenian-American novelist and playwright, author of "The Human Comedy" and "The Time of Your Life".',
  },
  // History events
  {
    slug: 'foundation-of-erebuni',
    title: 'Foundation of Erebuni',
    menuPath: 'history',
    yearLabel: '782 BC',
    century: -8,
    itemType: 'HISTORY_EVENT',
    description:
      'King Argishti I of Urartu founds the fortress of Erebuni, the urban seed of modern Yerevan, recorded on a cuneiform stone still preserved today.',
  },
  {
    slug: 'armenia-adopts-christianity',
    title: 'Armenia adopts Christianity',
    menuPath: 'history',
    yearLabel: '301 AD',
    century: 4,
    itemType: 'HISTORY_EVENT',
    description:
      'Under King Trdat III and Gregory the Illuminator, Armenia becomes the first state to adopt Christianity as its official religion.',
  },
  {
    slug: 'armenian-alphabet-invention',
    title: 'Armenian alphabet invention',
    menuPath: 'history',
    yearLabel: '405 AD',
    century: 5,
    itemType: 'HISTORY_EVENT',
    description:
      'Mesrop Mashtots creates the 36-letter Armenian alphabet, securing Armenian as a literary, theological and scientific language.',
  },
  {
    slug: 'bagratid-kingdom-restored',
    title: 'Bagratid Kingdom restored',
    menuPath: 'history',
    yearLabel: '885 AD',
    century: 9,
    itemType: 'HISTORY_EVENT',
    description:
      'Ashot I is recognised as king of Armenia, founding the Bagratid dynasty and a 150-year golden age centred on Ani.',
  },
  {
    slug: 'fall-of-ani',
    title: 'Fall of Ani',
    menuPath: 'history',
    yearLabel: '1045 AD',
    century: 11,
    itemType: 'HISTORY_EVENT',
    description:
      'Byzantine annexation of the Bagratid capital of Ani — "city of 1,001 churches" — opens the way for the Seljuk conquest of 1064.',
  },
  {
    slug: 'first-printed-armenian-book',
    title: 'First printed Armenian book',
    menuPath: 'history',
    yearLabel: '1512',
    century: 16,
    itemType: 'HISTORY_EVENT',
    description:
      'In Venice, Hakob Meghapart prints Urbatagirk, the first book in the Armenian language, inaugurating four centuries of Armenian printing in the diaspora.',
  },
  {
    slug: 'eastern-armenia-joins-russia',
    title: 'Eastern Armenia joins the Russian Empire',
    menuPath: 'history',
    yearLabel: '1828',
    century: 19,
    itemType: 'HISTORY_EVENT',
    description:
      'The Treaty of Turkmenchay transfers Eastern Armenia from Persian to Russian rule, accelerating modernisation and cultural revival.',
  },
  {
    slug: 'armenian-genocide',
    title: 'Armenian Genocide',
    menuPath: 'history',
    yearLabel: '1915',
    century: 20,
    itemType: 'HISTORY_EVENT',
    description:
      'The Ottoman state organises the deportation and mass killing of its Armenian population. Recognised today by dozens of nations and a defining trauma of the modern Armenian world.',
  },
  {
    slug: 'first-republic-of-armenia',
    title: 'First Republic of Armenia',
    menuPath: 'history',
    yearLabel: '1918',
    century: 20,
    itemType: 'HISTORY_EVENT',
    description:
      'After the collapse of the Russian Empire, Armenia declares its First Republic on 28 May 1918, surviving two and a half years amid war and famine.',
  },
  {
    slug: 'independence-of-armenia',
    title: 'Independence of the Republic of Armenia',
    menuPath: 'history',
    yearLabel: '1991',
    century: 20,
    itemType: 'HISTORY_EVENT',
    description:
      'Armenia declares independence on 21 September 1991, restoring sovereign statehood after seventy years inside the Soviet Union.',
  },
  // Heritage / Paintings
  {
    slug: 'martiros-saryan-painter',
    title: 'Martiros Saryan',
    menuPath: 'heritage/paintings',
    yearLabel: '1880–1972',
    description:
      'Father of modern Armenian painting; his saturated Yerevan and Karabakh landscapes defined a 20th-century visual vocabulary.',
  },
  {
    slug: 'hovhannes-aivazovsky',
    title: 'Hovhannes Aivazovsky',
    menuPath: 'heritage/paintings',
    yearLabel: '1817–1900',
    description:
      'Romantic seascape painter, court artist of the Russian Navy, whose 6,000 canvases include "The Ninth Wave".',
  },
  {
    slug: 'arshile-gorky',
    title: 'Arshile Gorky',
    menuPath: 'heritage/paintings',
    yearLabel: '1904–1948',
    description:
      'Genocide survivor and pivotal figure of American Abstract Expressionism, whose surreal organic forms anticipated post-war modernism.',
  },
  {
    slug: 'minas-avetisyan',
    title: 'Minas Avetisyan',
    menuPath: 'heritage/paintings',
    yearLabel: '1928–1975',
    description:
      'Painter and muralist whose flat colour planes and village mythologies made him one of the most beloved Soviet-era Armenian artists.',
  },
  // Heritage / Music
  {
    slug: 'komitas-music',
    title: 'Komitas',
    menuPath: 'heritage/music',
    itemType: 'MUSIC',
    description:
      'Priest and ethnomusicologist who built the foundation of Armenian classical music on three thousand transcribed folk songs.',
  },
  {
    slug: 'aram-khachaturian-music',
    title: 'Aram Khachaturian',
    menuPath: 'heritage/music',
    itemType: 'MUSIC',
    description:
      'Composer of the ballets Gayane and Spartacus, blending Caucasian folk colour with full symphonic mastery.',
  },
  {
    slug: 'duduk-repertoire',
    title: 'Duduk repertoire',
    menuPath: 'heritage/music',
    itemType: 'MUSIC',
    description:
      'The melancholic apricot-wood duduk, inscribed by UNESCO as Intangible Cultural Heritage, voices Armenian sorrow and tenderness worldwide.',
  },
  {
    slug: 'sharakan-chants',
    title: 'Sharakan chants',
    menuPath: 'heritage/music',
    itemType: 'MUSIC',
    description:
      'The 1,500-year tradition of Armenian Church hymns, notated in the unique khaz neumes and sung in monasteries across the diaspora.',
  },
  // Heritage / Writers
  {
    slug: 'grigor-narekatsi',
    title: 'Grigor Narekatsi',
    menuPath: 'heritage/writers',
    yearLabel: '951–1003',
    description:
      'Mystic, theologian and Doctor of the Church, author of the Book of Lamentations, summit of medieval Armenian literature.',
  },
  {
    slug: 'hovhannes-tumanyan',
    title: 'Hovhannes Tumanyan',
    menuPath: 'heritage/writers',
    yearLabel: '1869–1923',
    description:
      'National poet of Armenia, retelling Armenian folk tales and the epic "Anush" with humane, modernising clarity.',
  },
  {
    slug: 'yeghishe-charents',
    title: 'Yeghishe Charents',
    menuPath: 'heritage/writers',
    yearLabel: '1897–1937',
    description:
      'Modernist poet of revolution and longing, executed in the Stalinist purges and now read as the voice of 20th-century Armenia.',
  },
  {
    slug: 'william-saroyan-writer',
    title: 'William Saroyan',
    menuPath: 'heritage/writers',
    yearLabel: '1908–1981',
    description:
      'Armenian-American playwright and novelist, voice of the diaspora, who refused the Pulitzer Prize but accepted readers everywhere.',
  },
  // Heritage / Taraz
  {
    slug: 'vaspurakan-taraz',
    title: 'Vaspurakan taraz',
    menuPath: 'heritage/taraz',
    description:
      'Lakeside Van costume with deep ruby tones, silver coin headdresses and embroidered floral aprons.',
  },
  {
    slug: 'karabakh-taraz',
    title: 'Karabakh taraz',
    menuPath: 'heritage/taraz',
    description:
      'Mountain costume of Artsakh with long red velvet jackets, silk underlayers and silver belts forged by generations of village smiths.',
  },
  {
    slug: 'bridal-headdresses',
    title: 'Bridal headdresses',
    menuPath: 'heritage/taraz',
    description:
      'Layered crowns of pearls, coins, beads and feathers, each region encoding family lineage and bridal protection in its ornament.',
  },
  {
    slug: 'silver-belts',
    title: 'Silver belts',
    menuPath: 'heritage/taraz',
    description:
      'Hand-forged silver belts of niello and filigree, central to the dowry and ceremonial dress of historic Armenian provinces.',
  },
  // Heritage / Carpets
  {
    slug: 'vishapagorg',
    title: 'Vishapagorg (Dragon)',
    menuPath: 'heritage/carpets',
    description:
      'Ancient dragon carpets weaving cosmic guardianship into wool — among the most prized of Armenian rug traditions.',
  },
  {
    slug: 'artsvagorg',
    title: 'Artsvagorg (Eagle)',
    menuPath: 'heritage/carpets',
    description:
      'Eagle-motif carpets symbolising sovereignty, sun and the unceasing watch of the Armenian highlands.',
  },
  {
    slug: 'khachagorg',
    title: 'Khachagorg (Cross)',
    menuPath: 'heritage/carpets',
    description:
      'Cross-motif rugs that translate the geometry of the khachkar into wool, weaving prayer into the home.',
  },
  {
    slug: 'otsagorg',
    title: 'Otsagorg (Snake)',
    menuPath: 'heritage/carpets',
    description:
      'Snake-motif carpets uniting fertility and protection — one of the oldest visual traditions of the Armenian textile.',
  },
  // Heritage / Food
  {
    slug: 'lavash',
    title: 'Lavash (UNESCO)',
    menuPath: 'heritage/food',
    itemType: 'FOOD',
    description:
      'The paper-thin Armenian flatbread baked in a clay tonir; recognised by UNESCO as Intangible Cultural Heritage of Humanity.',
  },
  {
    slug: 'khorovats',
    title: 'Khorovats',
    menuPath: 'heritage/food',
    itemType: 'FOOD',
    description:
      'Armenian barbecue, slow-grilled over vine cuttings — the universal ritual of family gatherings from Gyumri to Glendale.',
  },
  {
    slug: 'areni-wine',
    title: 'Areni wine (6,100 BC)',
    menuPath: 'heritage/food',
    itemType: 'FOOD',
    description:
      'The Areni-1 cave in Vayots Dzor preserves the oldest known winery in the world, dating to 6,100 BC — the cradle of viticulture.',
  },
  {
    slug: 'tan-and-matsun',
    title: 'Tan & matsun',
    menuPath: 'heritage/food',
    itemType: 'FOOD',
    description:
      'Tangy matsun yoghurt and its salted drink tan have nourished the Armenian highlands for millennia and continue to anchor every meal.',
  },
  // Heritage / Sculpting
  {
    slug: 'khachkars',
    title: 'Khachkars',
    menuPath: 'heritage/sculpting',
    description:
      'Armenian cross-stones, inscribed by UNESCO, carved by every generation since the 9th century as memorials, gifts and prayers in stone.',
  },
  {
    slug: 'architectural-relief',
    title: 'Architectural relief',
    menuPath: 'heritage/sculpting',
    description:
      'The carved tympana, vine-scroll friezes and donor portraits that animate the facades of monasteries from Aghtamar to Noravank.',
  },
  {
    slug: 'modern-sculpture',
    title: 'Modern sculpture',
    menuPath: 'heritage/sculpting',
    description:
      'A 20th-century lineage from Yervand Kochar and Khoren Ter-Harutyan to today\'s Yerevan public-art renaissance.',
  },
  {
    slug: 'wood-carving',
    title: 'Wood carving',
    menuPath: 'heritage/sculpting',
    description:
      'Carved doors, cabinets, gusans and ritual objects whose geometry mirrors the khachkar tradition in walnut and apricot wood.',
  },
  // Heritage / Dance
  {
    slug: 'kochari',
    title: 'Kochari',
    menuPath: 'heritage/dance',
    itemType: 'DANCE',
    description:
      'A circle dance of mountain ferocity inscribed by UNESCO, danced shoulder to shoulder at every Armenian celebration.',
  },
  {
    slug: 'yarkhushta',
    title: 'Yarkhushta',
    menuPath: 'heritage/dance',
    itemType: 'DANCE',
    description:
      'A martial men\'s dance from Sasun with sharp clapping confrontations — once a battlefield preparation, today a vivid memory.',
  },
  {
    slug: 'shalakho',
    title: 'Shalakho',
    menuPath: 'heritage/dance',
    itemType: 'DANCE',
    description:
      'A sweeping South-Caucasian solo dance of competitive grace, beloved across the Armenian, Georgian and Azerbaijani repertoire.',
  },
  {
    slug: 'berd',
    title: 'Berd',
    menuPath: 'heritage/dance',
    itemType: 'DANCE',
    description:
      'The "fortress" dance, in which dancers climb on each other\'s shoulders to build a living citadel — a symbol of Armenian solidarity.',
  },
  // Heritage / Theatre
  {
    slug: 'sundukyan-theatre',
    title: 'Sundukyan Theatre',
    menuPath: 'heritage/theatre',
    itemType: 'THEATRE',
    description:
      'The national academic theatre in Yerevan, founded in 1922 and named for the playwright who founded modern Armenian comedy.',
  },
  {
    slug: 'stanislavsky-tradition',
    title: 'Stanislavsky tradition',
    menuPath: 'heritage/theatre',
    itemType: 'THEATRE',
    description:
      'The Russian Drama Theatre after Konstantin Stanislavsky, continuing the great Russian acting tradition on the Armenian stage.',
  },
  {
    slug: 'modern-troupes',
    title: 'Modern troupes',
    menuPath: 'heritage/theatre',
    itemType: 'THEATRE',
    description:
      'A new generation of independent companies — HighFest, Goris, the Yerevan Fringe — reinventing Armenian theatre with international guests.',
  },
  // Heritage / Armaments
  {
    slug: 'urartian-bronze',
    title: 'Urartian bronze',
    menuPath: 'heritage/armaments',
    description:
      'Bronze helmets, shields and ritual weapons of the Urartu kingdom (9th–6th c. BC), the technological summit of the Iron-Age highlands.',
  },
  {
    slug: 'medieval-armour',
    title: 'Medieval armour',
    menuPath: 'heritage/armaments',
    description:
      'Bagratid and Cilician scale armour, helmets and sabres, recorded in chronicles and the carved knights of monastery friezes.',
  },
  {
    slug: 'karabakh-dagger',
    title: 'Karabakh dagger',
    menuPath: 'heritage/armaments',
    description:
      'The kindjal of Karabakh and Lori — wootz blades, niello sheaths and the silversmith craft of nineteenth-century mountain villages.',
  },
  // Heritage / Publications
  {
    slug: 'urbatagirk-1512',
    title: 'Urbatagirk (1512)',
    menuPath: 'heritage/publications',
    itemType: 'PUBLICATION',
    description:
      'The first printed Armenian book, produced in Venice by Hakob Meghapart in 1512 — origin of five centuries of Armenian printing.',
  },
  {
    slug: 'mkhitarist-editions',
    title: 'Mkhitarist editions',
    menuPath: 'heritage/publications',
    itemType: 'PUBLICATION',
    description:
      'The scholarly editions of the Mkhitarist Order on San Lazzaro, Venice — for centuries the gold standard of Armenian philology.',
  },
  {
    slug: 'modern-academic-press',
    title: 'Modern academic press',
    menuPath: 'heritage/publications',
    itemType: 'PUBLICATION',
    description:
      'Today\'s scholarly publishing — Matenadaran editions, Yerevan State University press, diaspora journals — keeping the Armenian word current.',
  },
];

export async function seedCultureItems(menuMap: MenuMap): Promise<void> {
  let count = 0;
  for (const [index, item] of ITEMS.entries()) {
    const menuItemId = menuMap.get(item.menuPath);
    if (!menuItemId) {
      console.warn(`! Missing menu entry for ${item.menuPath}, skipping ${item.slug}`);
      continue;
    }
    const payload = {
      title: item.title,
      description: item.description,
      shortDescription: item.shortDescription ?? null,
      menuItemId,
      region: item.region ?? null,
      periodLabel: item.periodLabel ?? null,
      century: item.century ?? null,
      yearLabel: item.yearLabel ?? null,
      image: `/images/culture/${item.slug}.svg`,
      tourUrl: item.tourUrl ?? null,
      latitude: item.latitude ?? null,
      longitude: item.longitude ?? null,
      mapType: item.mapType ?? null,
      showOnMap: item.showOnMap ?? false,
      itemType: item.itemType ?? 'OTHER',
      status: 'PUBLISHED' as const,
      order: index,
    };
    await prisma.cultureItem.upsert({
      where: { slug: item.slug },
      update: payload,
      create: { slug: item.slug, ...payload },
    });
    count += 1;
  }
  console.log(`✓ Culture items ready (${count})`);
}
