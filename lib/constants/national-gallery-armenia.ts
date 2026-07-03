export const NGA_IMG_BASE = 'https://armeniantreasures.com/wp-content/uploads/2023/08';

export function ngaImg(filename: string): string {
  return `${NGA_IMG_BASE}/${filename}`;
}

export const NGA_STATS = [
  { num: '1921', suffix: '', label: 'Year Established' },
  { num: '40,000', suffix: '+', label: 'Works in Collection', suffixSize: '0.4em' },
  { num: '56', suffix: '', label: 'Exhibition Halls' },
  { num: '7,000', suffix: '+', label: 'Armenian Paintings', suffixSize: '0.4em' },
  { num: '12', suffix: '', label: 'Regional Branches' },
  { num: '2', suffix: 'nd', label: 'Aivazovsky Collection World', suffixSize: '0.35em', suffixColor: 'gold' },
] as const;

export const NGA_FACTS = [
  { label: 'Armenian Name', value: 'Հայաստանի Ազգային Պատկերասրահ' },
  { label: 'Director', value: 'Marina Hakobyan' },
  { label: 'Established', value: '1921 · Over 100 years of heritage' },
  { label: 'Address', value: '1 Aram Street · Yerevan 0010' },
  { label: 'Telephone', value: '+374 10 580 812' },
  { label: 'Website', value: 'www.gallery.am' },
  { label: 'Location', value: 'Republic Square · Yerevan Centre' },
  {
    label: 'Unique Distinction',
    value: "World's largest Armenian fine arts collection · 2nd largest Aivazovsky collection globally",
  },
] as const;

export const NGA_COLLECTIONS = [
  { id: 'armenian', title: 'Armenian Painting', sub: '7,000+ works · Saryan, Sureniants, Avetisyan', href: '#virtual-tour', icon: 'armenian' as const },
  { id: 'aivazovsky', title: 'Aivazovsky Collection', sub: '2nd largest in world · 40+ seascapes', href: '#virtual-tour', icon: 'aivazovsky' as const },
  { id: 'european', title: 'European & World Art', sub: '1,150+ works · Chagall, Kandinsky, Courbet', href: '#virtual-tour', icon: 'european' as const },
  { id: 'graphics', title: 'Graphics & Engraving', sub: '12,000 reserves · Watercolour, gouache, chalk', href: '#virtual-tour', icon: 'graphics' as const },
  { id: 'sculpture', title: 'Sculpture', sub: '1,200 specimens · Armenian & foreign masters', href: '#virtual-tour', icon: 'sculpture' as const },
  { id: 'decorative', title: 'Decorative-Applied Art', sub: 'Ancient Egypt to 19th c. European porcelain', href: '#virtual-tour', icon: 'decorative' as const },
] as const;

export const NGA_ARTISTS = [
  {
    href: '#gallery',
    featured: true,
    tag: 'Marine Painting · Armenian Master',
    title: 'Hovhannes Aivazovsky — The Sea in Oil',
    excerpt:
      "The National Gallery holds the world's second-largest collection of Aivazovsky's works — more than 40 breathtaking seascapes by the Armenian-Russian marine master whose canvases seem to make light itself move. The dedicated Aivazovsky Hall is the most celebrated room in the building.",
    num: '01',
    icon: 'aivazovsky' as const,
  },
  {
    href: '#gallery',
    tag: 'Armenian Modernism',
    title: 'Martiros Saryan — Colour of Armenia',
    excerpt:
      "Saryan's luminous, sun-drenched canvases defined Armenian painting in the 20th century. His portraits and landscapes glow with an intensity that could only have come from Yerevan's blazing light.",
    num: '02',
    icon: 'saryan' as const,
  },
  {
    href: '#gallery',
    tag: 'Russian Avant-Garde',
    title: 'Kandinsky & Chagall',
    excerpt:
      "The Gallery's foreign collection counts Wassily Kandinsky's abstract compositions and Marc Chagall's dreaming figures among its international treasures — a remarkable assembly for any gallery in the world.",
    num: '03',
    icon: 'avant' as const,
  },
  {
    href: '#gallery',
    tag: 'Armenian Contemporary',
    title: 'Minas Avetisyan — Fire & Folk Memory',
    excerpt:
      "Avetisyan's explosive canvases, rooted in Armenian folklore and tragedy, represent some of the most powerful images in 20th-century national art — preserved and celebrated in the Gallery's Armenian halls.",
    num: '04',
    icon: 'minas' as const,
  },
] as const;

export const NGA_EXHIBITIONS = [
  {
    num: '01',
    status: 'current' as const,
    statusLabel: '● Current',
    dates: 'Dec 12, 2025 — May 12, 2026',
    title: 'Grigor Aghasyan: Sounding Pictures',
    desc: 'A solo exhibition exploring the intersection of visual art and musical resonance by contemporary Armenian artist Grigor Aghasyan — paintings that seem to hum with an inner score.',
  },
  {
    num: '02',
    status: 'current' as const,
    statusLabel: '● Current',
    dates: 'Feb 12 — Apr 15, 2026',
    title: 'Museum Work: Discoveries',
    desc: "A rare behind-the-scenes look at the conservation, research, and cataloguing work undertaken by the Gallery's curatorial staff — newly discovered works and restoration stories.",
  },
  {
    num: '03',
    status: 'recent' as const,
    statusLabel: '◈ Recent',
    dates: 'From Oct 28, 2025',
    title: 'Hovhannes Alhazian: From Van to Paris',
    desc: 'A retrospective of the life and work of Hovhannes Alhazian — an Armenian artist who fled the massacres of Van and forged a remarkable career in Paris, bridging two worlds.',
  },
  {
    num: '04',
    status: 'recent' as const,
    statusLabel: '◈ Recent',
    dates: 'Jul 25 — Oct 25, 2025',
    title: 'Jansem: The Master of Vivid Line',
    desc: 'An exhibition dedicated to Jansem (Hovhannes Semerdjian), the Armenian-French painter celebrated for his powerful figurative work and intense emotional line — a diaspora master returning home.',
  },
] as const;

export const NGA_GALLERY = [
  { src: ngaImg('Aivazovsky-Photo-12.jpg'), label: 'The Aivazovsky Hall · National Gallery', wide: true },
  { src: ngaImg('Aivazovsky-Photo-2.jpg'), label: 'Aivazovsky Seascape · Detail' },
  { src: ngaImg('Aivazovsky-Photo-3.jpg'), label: 'Gallery Interior · Exhibition Hall' },
  { src: ngaImg('Aivazovsky-Photo-4.jpg'), label: 'Aivazovsky · Marine Masterwork' },
  { src: ngaImg('national-gallery-logo-thegem-blog-timeline-large.jpg'), label: 'National Gallery · Republic Square · Yerevan', wide: true },
] as const;

export const NGA_TICKETS = [
  { label: 'General Admission', title: 'Adults', price: '800', unit: ' AMD', sub: '≈ 1.65 USD' },
  { label: 'Concession', title: 'Students, Pupils, Pensioners', price: '300', unit: ' AMD', sub: '≈ 0.65 USD' },
  { label: 'Free Entry', title: 'Children under 7, Disabled, Servicemen', price: 'Free', unit: '', sub: 'Also free on International Museum Day (May 18)', priceSmall: true },
  { label: 'Guided Tour — Armenian', title: 'In Armenian Language', price: '3,500', unit: ' AMD', sub: '≈ 7.20 USD · Book in advance' },
  { label: 'Guided Tour — International', title: 'Russian · English · French', price: '5,000', unit: ' AMD', sub: '≈ 10.30 USD · Book in advance' },
  {
    label: 'Opening Hours',
    title: 'Tue–Sat: 11:00–17:30\nSunday: 11:00–16:30\nClosed Monday',
    price: '',
    unit: '',
    sub: 'Last admission 30 min before closing · Free with Yerevan Card',
    isHours: true,
  },
] as const;

export const NGA_VIRTUAL_TOUR = {
  embed: 'https://link.vcity.guide/aivazovsky',
  title: 'National Gallery of Armenia · Aivazovsky Hall',
  tag: '✦ Virtual Walkthrough',
} as const;

export const NGA_RELATED = [
  { num: '01', name: 'Aram Khachaturian House-Museum', type: 'Music Heritage · Yerevan', href: '/khachaturian-museum' },
  { num: '02', name: 'Matenadaran', type: 'Ancient Manuscripts · Yerevan', href: '/culture' },
  { num: '03', name: 'Erebuni Historical Museum', type: 'Urartian · Yerevan', href: '/culture' },
  { num: '04', name: 'Khndzoresk Cave Settlement', type: 'Archaeological · Syunik', href: '/khndzoresk' },
  { num: '05', name: 'Martiros Saryan House-Museum', type: 'Fine Arts · Yerevan', href: '/culture' },
  { num: '06', name: 'Komitas Museum-Institute', type: 'Music · Yerevan', href: '/culture' },
] as const;
