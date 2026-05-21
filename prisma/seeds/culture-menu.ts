import { prisma } from '@/lib/db';
import type { MenuRouteType } from '@prisma/client';

interface TopNode {
  slug: string;
  title: string;
  description: string;
  order: number;
  routeType: MenuRouteType;
  children?: ChildNode[];
}

interface ChildNode {
  slug: string;
  title: string;
  description?: string;
  order: number;
  routeType: MenuRouteType;
}

const TREE: TopNode[] = [
  {
    slug: 'architecture',
    title: 'Architecture',
    description: 'Monasteries, churches and fortresses carved into the Armenian highlands.',
    order: 1,
    routeType: 'CATEGORY',
    children: [
      {
        slug: 'churches',
        title: 'Churches',
        description: 'Medieval monasteries and cliff-top churches.',
        order: 1,
        routeType: 'SUBCATEGORY',
      },
      {
        slug: 'castles',
        title: 'Castles',
        description: 'Fortresses guarding the historic Armenian plateau.',
        order: 2,
        routeType: 'SUBCATEGORY',
      },
      {
        slug: 'new',
        title: 'Add a new sub-catalog',
        description: 'Propose a new Architecture sub-catalog to expand the open archive.',
        order: 99,
        routeType: 'SUBCATEGORY_FORM',
      },
    ],
  },
  {
    slug: 'legends',
    title: 'Legends',
    description: 'Heroes and myths from the Armenian highlands.',
    order: 2,
    routeType: 'CATEGORY',
  },
  {
    slug: 'museums',
    title: 'Museums',
    description: 'Institutions safeguarding Armenian art, manuscripts and memory.',
    order: 3,
    routeType: 'CATEGORY',
  },
  {
    slug: 'people',
    title: 'People',
    description: 'Architects, composers, painters and writers who shaped Armenian identity.',
    order: 4,
    routeType: 'CATEGORY',
  },
  {
    slug: 'history',
    title: 'History',
    description: 'Turning points across three millennia of Armenian history.',
    order: 5,
    routeType: 'CATEGORY',
  },
  {
    slug: 'heritage',
    title: 'Heritage',
    description: 'Eleven living domains of Armenian intangible and material heritage.',
    order: 6,
    routeType: 'CATEGORY',
    children: [
      { slug: 'paintings', title: 'Paintings', order: 1, routeType: 'SUBCATEGORY' },
      { slug: 'music', title: 'Music', order: 2, routeType: 'SUBCATEGORY' },
      { slug: 'writers', title: 'Writers', order: 3, routeType: 'SUBCATEGORY' },
      { slug: 'taraz', title: 'Taraz', order: 4, routeType: 'SUBCATEGORY' },
      { slug: 'carpets', title: 'Carpets', order: 5, routeType: 'SUBCATEGORY' },
      { slug: 'food', title: 'Food & Drink', order: 6, routeType: 'SUBCATEGORY' },
      { slug: 'sculpting', title: 'Sculpting', order: 7, routeType: 'SUBCATEGORY' },
      { slug: 'dance', title: 'Dance', order: 8, routeType: 'SUBCATEGORY' },
      { slug: 'theatre', title: 'Theatre', order: 9, routeType: 'SUBCATEGORY' },
      { slug: 'armaments', title: 'Armaments', order: 10, routeType: 'SUBCATEGORY' },
      { slug: 'publications', title: 'Publications', order: 11, routeType: 'SUBCATEGORY' },
    ],
  },
  {
    slug: 'submit',
    title: 'Add your project',
    description: 'Submit a culture project or material for review.',
    order: 7,
    routeType: 'PROJECT_SUBMIT_FORM',
  },
];

export type MenuMap = Map<string, string>;

export async function seedCultureMenu(): Promise<MenuMap> {
  const map: MenuMap = new Map();
  for (const top of TREE) {
    const existing = await prisma.cultureMenuItem.findFirst({
      where: { parentId: null, slug: top.slug },
    });
    const data = {
      title: top.title,
      description: top.description,
      order: top.order,
      routeType: top.routeType,
      isActive: true,
    };
    const parent = existing
      ? await prisma.cultureMenuItem.update({ where: { id: existing.id }, data })
      : await prisma.cultureMenuItem.create({
          data: { slug: top.slug, ...data },
        });
    map.set(top.slug, parent.id);

    if (!top.children) continue;
    for (const child of top.children) {
      const childRow = await prisma.cultureMenuItem.upsert({
        where: { parentId_slug: { parentId: parent.id, slug: child.slug } },
        update: {
          title: child.title,
          description: child.description ?? null,
          order: child.order,
          routeType: child.routeType,
          isActive: true,
        },
        create: {
          slug: child.slug,
          title: child.title,
          description: child.description ?? null,
          order: child.order,
          routeType: child.routeType,
          parentId: parent.id,
        },
      });
      map.set(`${top.slug}/${child.slug}`, childRow.id);
    }
  }
  console.log(`✓ Culture menu ready (${map.size} nodes)`);
  return map;
}
