export const KHACHATURIAN_IMG_BASE = 'https://armeniantreasures.com/wp-content/uploads/2023/08';

export function khachaturianImg(filename: string): string {
  return `${KHACHATURIAN_IMG_BASE}/${filename}`;
}

export const KHACHATURIAN_STATS = [
  { num: '1903', suffix: '', label: 'Year of Birth' },
  { num: '1978', suffix: '', label: 'Museum Established' },
  { num: '3', suffix: '', label: 'Major Ballets' },
  { num: '3', suffix: '', label: 'Symphonies' },
  { num: '15+', suffix: '', label: 'Music Tracks Online' },
  { num: '1976', suffix: '', label: 'Govt. Decision · Museum' },
] as const;

export const KHACHATURIAN_FACTS = [
  { label: 'Full Name', value: 'Aram Ilyich Khachaturian' },
  { label: 'Armenian', value: 'Արամ Ղաչատրյան' },
  { label: 'Born', value: '6 June 1903 · Kojori, Tiflis' },
  { label: 'Died', value: '1 May 1978 · Moscow' },
  { label: 'Nationality', value: 'Armenian · Soviet' },
  { label: 'Genre', value: 'Classical · Ballet · Symphony · Film' },
  { label: 'Education', value: 'Moscow Conservatory · Gnessin Institute' },
  { label: 'Honours', value: "Lenin Prize · Stalin Prize (×4) · People's Artist of the USSR" },
  { label: 'Museum Director', value: 'Armine Grigoryan' },
] as const;

export const KHACHATURIAN_WORKS = [
  { id: 'gayane', title: 'Gayane', sub: 'Ballet · 1942 · Sabre Dance, Lullaby, Rose Maidens', href: '#audio', icon: 'gayane' as const },
  { id: 'spartacus', title: 'Spartacus', sub: 'Ballet · 1954 · Adagio, Aegina\'s Variations', href: '#audio', icon: 'spartacus' as const },
  { id: 'masquerade', title: 'Masquerade Suite', sub: 'Orchestra Suite · Waltz, Romance, Nocturne', href: '#audio', icon: 'masquerade' as const },
  { id: 'violin', title: 'Violin Concerto', sub: '1940 · World premiere · Yerevan', href: '#audio', icon: 'violin' as const },
  { id: 'symphonies', title: 'Three Symphonies', sub: '1934, 1943, 1947 · First Armenian composer', href: '#audio', icon: 'symphonies' as const },
  { id: 'film', title: 'Film Music', sub: 'Pepo, Zangezur & other Armenian film scores', href: '#audio', icon: 'film' as const },
] as const;

export const KHACHATURIAN_AUDIO_TRACKS = [
  { title: 'Garun (Spring) — Yerevan Song', sub: 'Vocal', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/1.-Aram-Khachaturian-Garun-Yerevan-song.mp3' },
  { title: 'Violin Concerto — 2nd Movement', sub: 'Orchestral', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/2.-Aram-Khachaturian-Violin-Concerto-2nd-mov.mp3' },
  { title: 'Sabre Dance — Ballet Gayane', sub: 'Ballet', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/3.-Aram-Khachaturian-Sabre-Dance-from-the-ballet-Gayane.mp3' },
  { title: 'Uzundara — Ballet Gayane', sub: 'Ballet', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/4.-Aram-Khachaturian-Uzundara-from-the-ballet-Gayane.mp3' },
  { title: 'Dance of Rose Maidens — Gayane', sub: 'Ballet', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/5.-Aram-Khachaturian-The-dance-of-Rose-Maidens-from-the-ballet-Gayane.mp3' },
  { title: 'Lullaby — Ballet Gayane', sub: 'Ballet', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/6.-Aram-Khachaturian-Lullaby-from-the-ballet-Gayane.mp3' },
  { title: 'Lezginka — Ballet Gayane', sub: 'Ballet', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/7.-Aram-Khachaturian-Lezginka-fro-the-ballet-Gayane.mp3' },
  { title: "Gayane's Adagio — Gayane", sub: 'Ballet', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/8.-Aram-Khachaturian-Gayanes-Adajio-from-the-ballet-Gayane.mp3' },
  { title: 'Dance of Ayshe — Gayane', sub: 'Ballet', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/9.-Aram-Khachaturian-_-Awakening-The-Dance-of-Ayshe-from-the-ballet-Gayane.mp3' },
  { title: 'Adagio — Ballet Spartacus', sub: 'Ballet', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/10.-Aram-Khachaturian-Adagio-from-the-ballet-Spartacus.mp3' },
  { title: "Aegina's Variations — Spartacus", sub: 'Ballet', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/11.-Aram-Khachaturian-Aeginas-Variations-Bacchanalia-from-the-ballet-Spartacus.mp3' },
  { title: 'Dance of Egyptian Girl — Spartacus', sub: 'Ballet', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/12.-Aram-Khachaturian-Dance-of-Egyptian-Girl-from-the-ballet-Spartacus.mp3' },
  { title: 'Waltz — Masquerade Suite', sub: 'Suite', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/13.-Aram-Khachaturian-Waltz-Masquerade-Suite.mp3' },
  { title: 'Romance — Masquerade Suite', sub: 'Suite', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/14.-Aram-Khachaturian-Romance-Masquerade-Suite.mp3' },
  { title: 'Nocturne — Masquerade Suite', sub: 'Suite', url: 'https://akhachaturianmuseum.am/wp-content/uploads/2023/08/15.-Aram-Khachaturian-Nocturne-Masquerade-Suite.mp3' },
] as const;

export const KHACHATURIAN_GALLERY = [
  { src: khachaturianImg('Aram-Khachaturyan-Museum-01052022_155542-900x600.jpg'), label: 'Museum Entrance Hall', wide: true },
  { src: khachaturianImg('Aram-Khachaturyan-Museum-01052022_155639-900x600.jpg'), label: 'Exhibition Room' },
  { src: khachaturianImg('Aram-Khachaturyan-Museum-12192021_203808-900x600.jpg'), label: 'Museum Interior · Evening' },
  { src: khachaturianImg('Aram-Khachaturyan-Museum-Living-Room-1-900x600.jpg'), label: 'The Living Room', wide: true },
  { src: khachaturianImg('Aram-Khachaturyan-Museum-Living-Room-900x600.jpg'), label: 'Living Room — Original Furnishings' },
  { src: khachaturianImg('khachaturyan1-thegem-blog-timeline-large.jpg'), label: 'Aram Khachaturian · Portrait' },
] as const;

export const KHACHATURIAN_HIGHLIGHTS = [
  {
    href: '#virtual-tour',
    featured: true,
    tag: 'Private Residence · Museum',
    title: "Khachaturian's Personal Rooms",
    excerpt:
      "Step into the study, living room, and bedroom preserved exactly as Khachaturian left them. His piano, manuscripts, personal library, and memorabilia from concert tours around the world — all held within the walls where he spent his final creative years in Yerevan.",
    num: '01',
    icon: 'rooms' as const,
  },
  {
    href: '#works',
    tag: 'Permanent Exhibition',
    title: 'Documentary Heritage',
    excerpt:
      'Manuscripts, photos, awards, and rare documents spanning a lifetime of musical creation — from student notebooks in Moscow to the Stalin Prize medals.',
    num: '02',
    icon: 'exhibition' as const,
  },
  {
    href: '#audio',
    tag: 'Educational Programme',
    title: 'Live Music Events',
    excerpt:
      "The museum hosts regular concerts, educational programmes for children, and scholarly events — keeping the living tradition of Khachaturian's music alive in the very rooms he inhabited.",
    num: '03',
    icon: 'music' as const,
  },
  {
    href: '#gallery',
    tag: 'Digital Archive',
    title: 'Photographic Collection',
    excerpt:
      "Rare photographs documenting Khachaturian's life from his childhood in Tiflis to his international conducting tours — now digitally preserved and accessible online.",
    num: '04',
    icon: 'photos' as const,
  },
] as const;

export const KHACHATURIAN_VIRTUAL_TOUR = {
  embed: 'https://link.vcity.guide/aramkhachaturyan',
  title: 'Aram Khachaturian House-Museum · Yerevan',
  tag: '✦ Virtual Walkthrough',
} as const;

export const KHACHATURIAN_RELATED = [
  { num: '01', name: 'Komitas Museum-Institute', type: 'Music · Yerevan', href: '/culture' },
  { num: '02', name: 'Matenadaran', type: 'Manuscripts · Yerevan', href: '/culture' },
  { num: '03', name: 'Erebuni Historical Museum', type: 'Urartian · Yerevan', href: '/culture' },
  { num: '04', name: 'National Gallery of Armenia', type: 'Fine Arts · Yerevan', href: '/culture' },
  { num: '05', name: 'Khndzoresk Cave Settlement', type: 'Archaeological · Syunik', href: '/khndzoresk' },
  { num: '06', name: 'Martiros Saryan House-Museum', type: 'Fine Arts · Yerevan', href: '/culture' },
] as const;