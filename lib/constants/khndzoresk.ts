export const KHNDZORESK_IMG_BASE =
  'https://khndzoresk.armeniantreasures.com/wp-content/uploads/2024/03';

export function khndzoreskImg(filename: string): string {
  return `${KHNDZORESK_IMG_BASE}/${filename}`;
}

export const KHNDZORESK_STATS = [
  { num: '3,000', suffix: '+', label: 'Years of Habitation' },
  { num: '8,300', suffix: '', label: 'Peak Population · 1900s' },
  { num: '1,580', suffix: 'm', label: 'Elevation Above Sea Level' },
  { num: '4', suffix: '', label: 'Digitized Heritage Sites' },
  { num: '17', suffix: 'th C', label: 'St. Hripsime Church' },
] as const;

export const KHNDZORESK_FACTS = [
  { label: 'Armenian Name', value: 'Խնձորեսկ · Khndzoresk' },
  { label: 'Province', value: 'Syunik · Goris Municipality' },
  { label: 'Coordinates', value: '39°29′12.7″N · 46°25′19.3″E' },
  { label: 'Area', value: '6,772.8 ha · 26.15 sq mi' },
  { label: 'Elevation', value: '1,580 m above sea level' },
  { label: 'Peak Population', value: '8,300 inhabitants (early 20th c.)' },
  {
    label: 'Digitization Partners',
    value: 'Armenian Treasures · Safe Armenian Monuments Foundation',
  },
  {
    label: 'Technology',
    value: 'Matterport 3D · Drone Photogrammetry · Sketchfab · 360° Panorama',
  },
] as const;

export const KHNDZORESK_SITES = [
  {
    id: 'hripsime',
    title: 'St. Hripsime Church',
    sub: '17th century · Gorge floor · Matterport 3D',
    href: '#virtual-tour',
    icon: 'hripsime' as const,
  },
  {
    id: 'anapat',
    title: "Anapat & Sparapet's Tomb",
    sub: '18th century hermitage · Military history',
    href: '#virtual-tour',
    icon: 'sparapet' as const,
  },
  {
    id: 'tatevos',
    title: 'Cave Church of St. Tatevos',
    sub: 'Ancient · Hewn from living rock',
    href: '#virtual-tour',
    icon: 'tatevos' as const,
  },
  {
    id: 'caves',
    title: 'Ancient Cave Dwellings',
    sub: 'Until 1950s · Hundreds of carved homes',
    href: '#gallery',
    icon: 'caves' as const,
  },
  {
    id: 'bridge',
    title: 'The Suspension Bridge',
    sub: '1950s landmark · Iconic gorge crossing',
    href: '#map',
    icon: 'bridge' as const,
  },
  {
    id: 'museum',
    title: 'Village Museum',
    sub: 'Local heritage · Matterport walkthrough',
    href: '#virtual-tour',
    icon: 'museum' as const,
  },
] as const;

export const KHNDZORESK_TOURS = {
  featured: {
    title: 'St. Hripsime Church',
    tag: '✦ Featured Tour',
    embed: 'https://my.matterport.com/show/?m=wKrfv5qLjTi',
  },
  mini: [
    {
      title: 'Typical Cave Interior',
      sub: 'Matterport 3D Walkthrough',
      href: 'https://my.matterport.com/show/?m=zc4AzxFPD7P',
      image: khndzoreskImg('IMG_-Khndzoresk-1.jpg'),
    },
    {
      title: 'Village Museum',
      sub: 'Matterport 3D Walkthrough',
      href: 'https://my.matterport.com/show/?m=LzSqQ1rhfjt',
      image: khndzoreskImg('scale_1200-5-1.jpeg'),
    },
    {
      title: "Sparapet's Tomb",
      sub: 'Matterport 3D Walkthrough',
      href: 'https://my.matterport.com/show/?m=4NaSCJj9tr9',
      image: khndzoreskImg('Khndz1-1.jpg'),
    },
  ],
} as const;

export const KHNDZORESK_GALLERY = {
  now: [
    { src: khndzoreskImg('khndzoresk-Sputnik-1.jpg'), label: 'Khndzoresk Gorge · Aerial View', wide: true },
    { src: khndzoreskImg('45377abd8094e9f14fa6f3ee9ca9bda4-11.jpg'), label: 'Canyon Rock Formations' },
    { src: khndzoreskImg('043190871cdc1d500ecdee17652c7008-11.jpg'), label: 'Ancient Cave Dwellings' },
    {
      src: khndzoreskImg('1687219604_happylove-top-p-podvesnoi-most-armeniya-vkontakte-3-11.jpg'),
      label: 'The Suspension Bridge',
    },
    { src: khndzoreskImg('New1.jpg'), label: 'Gorge Landscape' },
    { src: khndzoreskImg('Качающийся_мост-11.jpg'), label: 'Bridge Crossing' },
    { src: khndzoreskImg('New3.jpg'), label: 'Khndzoresk — Village & Gorge', wide: true },
  ],
  hist: [
    { src: khndzoreskImg('Scan-190303-0035-1.jpg'), label: 'Archival Scan · Early 20th C.', archive: true },
    { src: khndzoreskImg('scale_1200-5-1.jpeg'), label: 'Old Khndzoresk · Village View', archive: true, wide: true },
    { src: khndzoreskImg('scale_1200-4-1.jpeg'), label: 'Cave Settlement · Archive', archive: true },
    { src: khndzoreskImg('image-51a6b3f7-eecf-4ad1-b9a3-d9ffb5515bf2.jpg'), label: 'Historical Document', archive: true },
    { src: khndzoreskImg('Khndz1-1.jpg'), label: 'Sparapet Tomb · Archive', archive: true },
    { src: khndzoreskImg('Khndzchurch-1-1.jpg'), label: 'St. Hripsime · Historical View', archive: true },
  ],
  fut: [
    { src: khndzoreskImg('Khndzoresk-church-1.jpg'), label: 'St. Hripsime · Visual Restoration', wide: true },
    { src: khndzoreskImg('Night-Khndzoresk-1.jpg'), label: 'Khndzoresk by Night · Concept' },
    { src: khndzoreskImg('Khndzoresk-1-1.jpg'), label: 'Gorge · Digital Rendering' },
    { src: khndzoreskImg('Kndzoresk-Old-vs-New-2-1-1.jpg'), label: 'Village · Architectural Reconstruction' },
    { src: khndzoreskImg('Khndzoresk-catacomp-1-1.jpg'), label: 'Cave Catacombs · Visual Concept' },
    { src: khndzoreskImg('KHndzoresk-houses-1-1.jpg'), label: 'Cave Houses · Futuristic Concept', wide: true },
  ],
} as const;

export const KHNDZORESK_RESTORATIONS = [
  {
    before: khndzoreskImg('Kndz-1.jpg'),
    after: khndzoreskImg('Kndzoresk-Old-vs-New-3-1.jpg'),
    caption: 'Khndzoresk Gorge Settlement',
  },
  {
    before: khndzoreskImg('Khndzchurch-1-1.jpg'),
    after: khndzoreskImg('Khndzoresk-church-1.jpg'),
    caption: 'St. Hripsime Church',
  },
  {
    before: khndzoreskImg('Khndz1-2-1.jpg'),
    after: khndzoreskImg('Night-Khndzoresk-1.jpg'),
    caption: 'Night Vision · Concept',
  },
  {
    before: khndzoreskImg('Khndzoresk-and1-1.jpg'),
    after: khndzoreskImg('Khndzoresk-and-1.jpg'),
    caption: 'Canyon Overview',
  },
] as const;

export const KHNDZORESK_RELATED = [
  { num: '01', name: 'Geghard Monastery', type: 'UNESCO · Kotayk Province', href: '/culture' },
  { num: '02', name: 'Tatev Monastery', type: 'Medieval · Syunik Province', href: '/culture' },
  { num: '03', name: 'Noravank Canyon', type: 'Archaeological · Vayots Dzor', href: '/culture' },
  { num: '04', name: 'Dvin Archaeological Site', type: 'Ancient Capital · Ararat Province', href: '/culture' },
  { num: '05', name: 'Khor Virap Monastery', type: 'Pilgrimage · Ararat Province', href: '/culture' },
  { num: '06', name: 'Erebuni Fortress', type: 'Urartian · Yerevan', href: '/culture' },
] as const;

export const KHNDZORESK_PARTICLES = Array.from({ length: 38 }, (_, i) => ({
  left: ((i * 37 + 11) % 97) + 1,
  baseY: 3 + ((i * 17) % 80),
  size: 1.2 + (i % 3) * 0.9,
  dur: 11 + (i % 9),
  delay: (i * 0.42) % 7,
  gold: i % 3 !== 0,
  op: 0.18 + (i % 5) * 0.06,
}));
