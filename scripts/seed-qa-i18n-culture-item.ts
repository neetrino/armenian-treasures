/**
 * Creates a full multilingual QA culture item (all 6 locales + media)
 * so i18n / Admin / public can be verified end-to-end.
 *
 * Run: pnpm exec tsx scripts/seed-qa-i18n-culture-item.ts
 */
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import sharp from 'sharp';
import type { Prisma } from '@prisma/client';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { SITE_LOCALE_CODES } from '@/lib/i18n/locale-config';
import { encodeTranslatableText } from '@/lib/i18n/translatable-content';
import { CULTURE_ITEM_MEDIA_VERSION } from '@/lib/culture-item-media';

const SLUG = 'qa-i18n-full-demo';
const PUBLIC_PREFIX = '/images/qa-i18n-demo';
const LOCAL_PUBLIC_DIR = resolve(process.cwd(), 'public/images/qa-i18n-demo');
const MANIFEST_PATH = resolve(process.cwd(), 'data/r2-public-manifest.json');
const ASSETS_DIR = resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/d-armenian-treasure/assets',
);

const SOURCE_FILES: Record<string, string> = {
  'card.webp': 'qa-khndzoresk-card.png',
  'cover.webp': 'qa-hripsime-cover.png',
  'block-side.webp': 'qa-church-interior.png',
  'gallery-1.webp': 'qa-gallery-1.png',
  'gallery-2.webp': 'qa-gallery-2.png',
  'gallery-3.webp': 'qa-gallery-3.png',
  'before.webp': 'qa-before.png',
  'after.webp': 'qa-after.png',
  'video-thumb.webp': 'qa-video-thumb.png',
};

interface ManifestFile {
  generatedAt: string;
  publicBaseUrl: string;
  files: Record<string, string>;
}

async function loadDotEnv(): Promise<void> {
  try {
    const envRaw = await readFile(resolve(process.cwd(), '.env'), 'utf8');
    for (const line of envRaw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const delimiter = trimmed.indexOf('=');
      if (delimiter <= 0) continue;
      const key = trimmed.slice(0, delimiter).trim();
      let value = trimmed.slice(delimiter + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env) || !process.env[key]) process.env[key] = value;
    }
  } catch {
    // optional
  }
}

function img(name: string): string {
  return `${PUBLIC_PREFIX}/${name}`;
}

function id(suffix: string): string {
  return `qa-${suffix}`;
}

function localeBlocks(locale: SiteLocaleCode) {
  const copy: Record<
    SiteLocaleCode,
    { title: string; subtitle: string; body: string; title2: string; subtitle2: string; body2: string }
  > = {
    HY: {
      title: 'ՍՈՒՐԲ ՀՌԻՓՍԻՄԵ ԵԿԵՂԵՑԻ (QA)',
      subtitle: 'Հին բնակավայրի հոգևոր հիշողությունը',
      body: 'Սա QA թեստային էջ է։ Սուրբ Հռիփսիմե եկեղեցին գտնվում է Հին Խնձորեսկում՝ 1663 թվականին կառուցված եռանավ բազիլիկ։ Այս պարբերությունը ստուգում է հայերեն (արևելահայերեն) description block-ը։',
      title2: 'Քարանձավներ և կամուրջ',
      subtitle2: 'Լանդշաֆտ և ժառանգություն',
      body2: 'Երկրորդ բլոկ՝ ժայռափոր տներ, ճոճվող կամուրջ և Սյունիքի ձորեր։ Locale = HY։',
    },
    HYW: {
      title: 'ՍՈՒՐԲ ՀՌԻՓՍԻՄԷ ԵԿԵՂԵՑԻ (QA)',
      subtitle: 'Հին բնակավայրի հոգեւոր յիշողութիւնը',
      body: 'Սա QA թեստային էջ է։ Սուրբ Հռիփսիմէ եկեղեցին կը գտնուի Հին Խնձորեսկին մէջ՝ 1663 թուականին կառուցուած եռանաւ բազիլիկ։ Այս պարբերութիւնը կը ստուգէ արեւմտահայերէն description block-ը։',
      title2: 'Քարայրներ եւ կամուրջ',
      subtitle2: 'Լանդշաֆտ եւ ժառանգութիւն',
      body2: 'Երկրորդ բլոկ՝ ժայռափոր տուներ, ճօճուող կամուրջ եւ Սիւնիքի ձորեր։ Locale = HYW։',
    },
    EN: {
      title: 'SAINT HRIPSIME CHURCH (QA)',
      subtitle: 'Spiritual memory of an ancient settlement',
      body: 'This is a QA test page. Saint Hripsime Church stands in Old Khndzoresk — a 1663 three-nave basilica. This paragraph verifies the English description block.',
      title2: 'Caves and the bridge',
      subtitle2: 'Landscape and heritage',
      body2: 'Second block: cave dwellings, suspension bridge, and Syunik gorges. Locale = EN.',
    },
    RU: {
      title: 'ЦЕРКОВЬ СВЯТОЙ РИПСИМЕ (QA)',
      subtitle: 'Духовная память древнего поселения',
      body: 'Это QA-тестовая страница. Церковь Святой Рипсиме в Старом Хндзореске — трёхнефная базилика 1663 года. Этот абзац проверяет русский description block.',
      title2: 'Пещеры и мост',
      subtitle2: 'Ландшафт и наследие',
      body2: 'Второй блок: пещерные жилища, подвесной мост и ущелья Сюника. Locale = RU.',
    },
    FR: {
      title: 'ÉGLISE SAINTE-HRIPSIMÉ (QA)',
      subtitle: 'Mémoire spirituelle d’un ancien village',
      body: 'Page de test QA. L’église Sainte-Hripsimé se trouve dans le Vieux Khndzoresk — basilique à trois nefs de 1663. Ce paragraphe vérifie le bloc description en français.',
      title2: 'Grottes et pont',
      subtitle2: 'Paysage et patrimoine',
      body2: 'Deuxième bloc : habitations troglodytiques, pont suspendu et gorges du Syunik. Locale = FR.',
    },
    PT: {
      title: 'IGREJA DE SANTA HRIPSIME (QA)',
      subtitle: 'Memória espiritual de uma antiga povoação',
      body: 'Página de teste QA. A Igreja de Santa Hripsime fica na antiga Khndzoresk — basílica de três naves de 1663. Este parágrafo verifica o bloco de descrição em português.',
      title2: 'Cavernas e ponte',
      subtitle2: 'Paisagem e património',
      body2: 'Segundo bloco: casas em cavernas, ponte suspensa e desfiladeiros de Syunik. Locale = PT.',
    },
  };

  const t = copy[locale];
  return [
    {
      id: id(`block-1-${locale.toLowerCase()}`),
      title: t.title,
      subtitle: t.subtitle,
      body: t.body,
      image: img('block-side.webp'),
      caption: '',
    },
    {
      id: id(`block-2-${locale.toLowerCase()}`),
      title: t.title2,
      subtitle: t.subtitle2,
      body: t.body2,
      image: '',
      caption: '',
    },
  ];
}

async function prepareAndUploadImages(): Promise<void> {
  const { getR2EnvConfig, uploadBufferToR2 } = await import('@/lib/storage/r2');
  await mkdir(LOCAL_PUBLIC_DIR, { recursive: true });

  const pngSources: Record<string, string> = {
    'card.webp': join(LOCAL_PUBLIC_DIR, 'card.png'),
    'cover.webp': join(LOCAL_PUBLIC_DIR, 'cover.png'),
    'block-side.webp': join(LOCAL_PUBLIC_DIR, 'block-side.png'),
    'gallery-1.webp': join(LOCAL_PUBLIC_DIR, 'gallery-1.png'),
    'gallery-2.webp': join(LOCAL_PUBLIC_DIR, 'gallery-2.png'),
    'gallery-3.webp': join(LOCAL_PUBLIC_DIR, 'gallery-3.png'),
    'before.webp': join(LOCAL_PUBLIC_DIR, 'before.png'),
    'after.webp': join(LOCAL_PUBLIC_DIR, 'after.png'),
    'video-thumb.webp': join(LOCAL_PUBLIC_DIR, 'video-thumb.png'),
  };

  const config = getR2EnvConfig();
  let manifest: ManifestFile = {
    generatedAt: new Date().toISOString(),
    publicBaseUrl: config.publicBaseUrl,
    files: {},
  };
  try {
    const raw = await readFile(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(raw) as ManifestFile;
    manifest = {
      generatedAt: new Date().toISOString(),
      publicBaseUrl: parsed.publicBaseUrl || config.publicBaseUrl,
      files: parsed.files ?? {},
    };
  } catch {
    // new manifest
  }

  for (const [webpName, pngPath] of Object.entries(pngSources)) {
    let inputPath = pngPath;
    try {
      await readFile(inputPath);
    } catch {
      const assetName = SOURCE_FILES[webpName];
      if (!assetName) throw new Error(`Missing source for ${webpName}`);
      inputPath = join(ASSETS_DIR, assetName);
      await copyFile(inputPath, pngPath);
    }

    const webpBuffer = await sharp(await readFile(inputPath))
      .webp({ quality: 82 })
      .toBuffer();
    await writeFile(join(LOCAL_PUBLIC_DIR, webpName), webpBuffer);

    const key = `images/qa-i18n-demo/${webpName}`;
    const uploaded = await uploadBufferToR2({
      key,
      buffer: webpBuffer,
      contentType: 'image/webp',
    });
    manifest.files[`/${key}`] = uploaded.url;
    console.log(`✓ uploaded ${key}`);
  }

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

async function enableAllLocales(prisma: typeof import('@/lib/db').prisma): Promise<void> {
  const settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    console.warn('! SiteSettings missing — skip enabling locales');
    return;
  }
  await prisma.siteSettings.update({
    where: { id: settings.id },
    data: { enabledLocales: [...SITE_LOCALE_CODES] },
  });
  console.log('✓ Enabled locales:', SITE_LOCALE_CODES.join(', '));
}

async function upsertQaItem(prisma: typeof import('@/lib/db').prisma): Promise<void> {
  const menu = await prisma.cultureMenuItem.findFirst({
    where: { slug: 'churches' },
    select: { id: true },
  });
  if (!menu) {
    throw new Error('Menu item "churches" not found. Seed culture menu first.');
  }

  const sharedTours = [
    {
      id: id('tour-lidar-1'),
      type: 'LIDAR' as const,
      title: 'Saint Hripsime — LiDAR',
      url: 'https://my.matterport.com/show/?m=wKrfv5qLjTi',
      previewImage: '',
    },
    {
      id: id('tour-lidar-2'),
      type: 'LIDAR' as const,
      title: 'Cave — LiDAR',
      url: 'https://my.matterport.com/show/?m=zc4AzxFPD7P',
      previewImage: '',
    },
    {
      id: id('tour-3d-1'),
      type: 'SCAN_3D' as const,
      title: 'Saint Hripsime — 3D model',
      url: 'https://sketchfab.com/3d-models/st-hripsime-church-khndzoresk-old-ef898f47ad45493aa3baf47d206b5762',
      previewImage: '',
    },
    {
      id: id('tour-3d-2'),
      type: 'SCAN_3D' as const,
      title: 'Old Khndzoresk — 3D model',
      url: 'https://sketchfab.com/3d-models/st-hripsime-church-khndzoresk-old-ef898f47ad45493aa3baf47d206b5762',
      previewImage: '',
    },
  ];

  const sharedVideos = [
    {
      id: id('video-1'),
      title: 'Khndzoresk documentary',
      url: 'https://www.youtube.com/watch?v=NAExQa6twus',
      previewImage: img('video-thumb.webp'),
    },
    {
      id: id('video-2'),
      title: 'Heritage flyover (same source for QA)',
      url: 'https://www.youtube.com/watch?v=NAExQa6twus',
      previewImage: img('video-thumb.webp'),
    },
  ];

  const sharedGallery = [
    {
      id: id('gal-1'),
      kind: 'image' as const,
      url: img('gallery-1.webp'),
      beforeUrl: '',
      afterUrl: '',
      caption: '',
      alt: '',
    },
    {
      id: id('gal-2'),
      kind: 'image' as const,
      url: img('gallery-2.webp'),
      beforeUrl: '',
      afterUrl: '',
      caption: '',
      alt: '',
    },
    {
      id: id('gal-3'),
      kind: 'image' as const,
      url: img('gallery-3.webp'),
      beforeUrl: '',
      afterUrl: '',
      caption: '',
      alt: '',
    },
    {
      id: id('gal-ba'),
      kind: 'beforeAfter' as const,
      url: '',
      beforeUrl: img('before.webp'),
      afterUrl: img('after.webp'),
      caption: '',
      alt: '',
    },
  ];

  const byLocale = Object.fromEntries(
    SITE_LOCALE_CODES.map((locale) => [
      locale,
      {
        blocks: localeBlocks(locale),
        tours: sharedTours,
        videos: sharedVideos,
        gallery: sharedGallery,
      },
    ]),
  );

  const enBlocks = localeBlocks('EN');
  const mediaContent = {
    v: CULTURE_ITEM_MEDIA_VERSION,
    address: 'GC2J+XVW, Khndzoresk 3207',
    blocks: enBlocks,
    tours: sharedTours,
    videos: sharedVideos,
    gallery: sharedGallery,
    byLocale,
  } as Prisma.InputJsonValue;

  const title = encodeTranslatableText({
    HY: 'ԽՆՁՈՐԵՍԿ — QA ԹԵՍՏ',
    HYW: 'ԽՆՁՈՐԵՍԿ — QA ԹԵՍՏ',
    EN: 'KHNDZORESK — QA DEMO',
    RU: 'ХНДЗОРЕСК — QA ТЕСТ',
    FR: 'KHNDZORESK — DÉMO QA',
    PT: 'KHNDZORESK — DEMO QA',
  });

  const shortDescription = encodeTranslatableText({
    HY: 'QA էջ՝ բոլոր լեզուներով, նկարներով, տուրերով և տեսանյութերով։',
    HYW: 'QA էջ՝ բոլոր լեզուներով, նկարներով, տուրերով եւ տեսանյութերով։',
    EN: 'QA page with all locales, images, tours, and videos for verification.',
    RU: 'QA-страница со всеми языками, изображениями, турами и видео.',
    FR: 'Page QA avec toutes les langues, images, visites et vidéos.',
    PT: 'Página QA com todos os idiomas, imagens, tours e vídeos.',
  });

  const description = encodeTranslatableText({
    HY: localeBlocks('HY')[0]!.body,
    HYW: localeBlocks('HYW')[0]!.body,
    EN: enBlocks[0]!.body,
    RU: localeBlocks('RU')[0]!.body,
    FR: localeBlocks('FR')[0]!.body,
    PT: localeBlocks('PT')[0]!.body,
  });

  const locationName = encodeTranslatableText({
    HY: 'Խնձորեսկ',
    HYW: 'Խնձորեսկ',
    EN: 'Khndzoresk',
    RU: 'Хндзореск',
    FR: 'Khndzoresk',
    PT: 'Khndzoresk',
  });

  const region = encodeTranslatableText({
    HY: 'Սյունիք',
    HYW: 'Սիւնիք',
    EN: 'Syunik',
    RU: 'Сюник',
    FR: 'Syunik',
    PT: 'Syunik',
  });

  const payload = {
    title,
    shortDescription,
    description,
    menuItemId: menu.id,
    region,
    locationName,
    periodLabel: encodeTranslatableText({
      HY: 'XVII դար',
      HYW: 'ԺԷ. դար',
      EN: '17th century',
      RU: 'XVII век',
      FR: 'XVIIe siècle',
      PT: 'Século XVII',
    }),
    image: img('cover.webp'),
    coverImage: img('cover.webp'),
    cardBackgroundImage: img('card.webp'),
    galleryImages: [img('gallery-1.webp'), img('gallery-2.webp'), img('gallery-3.webp')],
    mediaContent,
    latitude: 39.512,
    longitude: 46.436,
    mapUrl: 'https://maps.app.goo.gl/QRVSh2pLtmNq7tAw7',
    mapType: 'CHURCH' as const,
    showOnMap: true,
    itemType: 'MONUMENT' as const,
    status: 'PUBLISHED' as const,
    order: 0,
    featuredOnHome: false,
    featuredOnCatalog: true,
  };

  const row = await prisma.cultureItem.upsert({
    where: { slug: SLUG },
    update: payload,
    create: { slug: SLUG, ...payload },
  });

  console.log(`✓ Culture item ready: ${row.slug} (${row.id})`);
  console.log(`  Public: /culture/item/${SLUG}`);
  console.log(`  Admin:  /admin/culture-items/${row.id}`);
}

async function main(): Promise<void> {
  await loadDotEnv();
  const { prisma } = await import('@/lib/db');
  try {
    console.log('→ Preparing images + R2 upload…');
    await prepareAndUploadImages();
    console.log('→ Enabling all site locales…');
    await enableAllLocales(prisma);
    console.log('→ Upserting QA culture item…');
    await upsertQaItem(prisma);
    console.log('Done.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
