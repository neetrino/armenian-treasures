import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { headR2Object, uploadBufferToR2, getR2EnvConfig } from '@/lib/storage/r2';

interface ManifestFile {
  generatedAt: string;
  publicBaseUrl: string;
  files: Record<string, string>;
}

interface DriveAsset {
  fileName: string;
  targetSlug: string;
  equivalentExistingR2Key?: string;
}

const DRIVE_ROOT = resolve(process.cwd(), 'tmp', 'drive-icons', 'all');
const MANIFEST_PATH = resolve(process.cwd(), 'data', 'r2-public-manifest.json');
const TARGET_PREFIX = 'icons/drive/all';

const DRIVE_ASSETS: DriveAsset[] = [
  { fileName: 'arcitecture.png', targetSlug: 'architecture' },
  {
    fileName: 'Arnaments.png',
    targetSlug: 'armaments',
    equivalentExistingR2Key: 'icons/cultural-portal/armaments.webp',
  },
  { fileName: 'Art & Culture.png', targetSlug: 'art-and-culture' },
  { fileName: 'Battles & Wars.png', targetSlug: 'battles-and-wars' },
  { fileName: 'capitals.png', targetSlug: 'capitals' },
  {
    fileName: 'Carpets & Textile Arts.png',
    targetSlug: 'carpets-and-textile-arts',
    equivalentExistingR2Key: 'icons/cultural-portal/carpets.webp',
  },
  { fileName: 'ChatGPT Image 1 July 2026 09_51_10 (6).png', targetSlug: 'chatgpt-image-1-july-2026' },
  { fileName: 'Christian Heritage.png', targetSlug: 'christian-heritage' },
  { fileName: 'Chronicles & Manuscripts.png', targetSlug: 'chronicles-and-manuscripts' },
  {
    fileName: 'church.png',
    targetSlug: 'church',
    equivalentExistingR2Key: 'icons/cultural-portal/churches.webp',
  },
  {
    fileName: 'Dance.png',
    targetSlug: 'dance',
    equivalentExistingR2Key: 'icons/cultural-portal/dance.webp',
  },
  {
    fileName: 'Famous Armenians.png',
    targetSlug: 'famous-armenians',
    equivalentExistingR2Key: 'icons/cultural-portal/famousArmenians.webp',
  },
  {
    fileName: 'Food & Drink.png',
    targetSlug: 'food-and-drink',
    equivalentExistingR2Key: 'icons/cultural-portal/foodDrink.webp',
  },
  { fileName: 'Historical Events & Turning points.png', targetSlug: 'historical-events-and-turning-points' },
  {
    fileName: 'Icons of History.png',
    targetSlug: 'icons-of-history',
    equivalentExistingR2Key: 'icons/cultural-portal/kings.webp',
  },
  { fileName: 'Kings & Dynasties.png', targetSlug: 'kings-and-dynasties' },
  {
    fileName: 'Legendaries & Heroes.png',
    targetSlug: 'legendaries-and-heroes',
    equivalentExistingR2Key: 'icons/cultural-portal/legends.webp',
  },
  { fileName: 'Monuments & Landmarks.png', targetSlug: 'monuments-and-landmarks' },
  {
    fileName: 'museum.png',
    targetSlug: 'museum',
    equivalentExistingR2Key: 'icons/cultural-portal/museums.webp',
  },
  {
    fileName: 'Music.png',
    targetSlug: 'music',
    equivalentExistingR2Key: 'icons/cultural-portal/music.webp',
  },
  {
    fileName: 'Mythology.png',
    targetSlug: 'mythology',
    equivalentExistingR2Key: 'icons/cultural-portal/mythology.webp',
  },
  {
    fileName: 'Paintings.png',
    targetSlug: 'paintings',
    equivalentExistingR2Key: 'icons/cultural-portal/paintings.webp',
  },
  {
    fileName: 'Publications.png',
    targetSlug: 'publications',
    equivalentExistingR2Key: 'icons/cultural-portal/publications.webp',
  },
  {
    fileName: 'Scientists & Inventors.png',
    targetSlug: 'scientists-and-inventors',
    equivalentExistingR2Key: 'icons/cultural-portal/scientists.webp',
  },
  { fileName: 'sculptor 2.png', targetSlug: 'sculptor-2' },
  {
    fileName: 'Sculptors.png',
    targetSlug: 'sculptors',
    equivalentExistingR2Key: 'icons/cultural-portal/sculptors.webp',
  },
  {
    fileName: 'taraz.png',
    targetSlug: 'taraz',
    equivalentExistingR2Key: 'icons/cultural-portal/taraz.webp',
  },
  {
    fileName: 'Theatre.png',
    targetSlug: 'theatre',
    equivalentExistingR2Key: 'icons/cultural-portal/theatre.webp',
  },
  { fileName: 'Traditions.png', targetSlug: 'traditions' },
  {
    fileName: 'Writers.png',
    targetSlug: 'writers',
    equivalentExistingR2Key: 'icons/cultural-portal/writers.webp',
  },
];

function targetKeyForSlug(slug: string): string {
  return `${TARGET_PREFIX}/${slug}.webp`;
}

function targetPublicPath(slug: string): string {
  return `/${targetKeyForSlug(slug)}`;
}

async function loadManifest(publicBaseUrl: string): Promise<ManifestFile> {
  try {
    const raw = await readFile(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(raw) as ManifestFile;
    return {
      generatedAt: new Date().toISOString(),
      publicBaseUrl: parsed.publicBaseUrl || publicBaseUrl,
      files: parsed.files ?? {},
    };
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      publicBaseUrl,
      files: {},
    };
  }
}

async function main(): Promise<void> {
  const config = getR2EnvConfig();
  const manifest = await loadManifest(config.publicBaseUrl);
  manifest.publicBaseUrl = config.publicBaseUrl;

  let uploaded = 0;
  let skippedExisting = 0;
  let skippedEquivalent = 0;

  for (const asset of DRIVE_ASSETS) {
    const sourcePath = resolve(DRIVE_ROOT, asset.fileName);
    let sourceBuffer: Buffer;
    try {
      sourceBuffer = await readFile(sourcePath);
    } catch {
      console.warn(`missing local source: ${asset.fileName}`);
      continue;
    }

    if (asset.equivalentExistingR2Key) {
      const equivalent = await headR2Object(asset.equivalentExistingR2Key);
      if (equivalent) {
        skippedEquivalent += 1;
        console.log(`skip (already represented): ${asset.fileName} -> ${asset.equivalentExistingR2Key}`);
        continue;
      }
    }

    const targetKey = targetKeyForSlug(asset.targetSlug);
    const existing = await headR2Object(targetKey);
    if (existing) {
      skippedExisting += 1;
      console.log(`skip (already uploaded): ${targetKey}`);
      continue;
    }

    const webpBuffer = await sharp(sourceBuffer).webp({ quality: 92 }).toBuffer();
    const uploadedResult = await uploadBufferToR2({
      key: targetKey,
      buffer: webpBuffer,
      contentType: 'image/webp',
    });
    manifest.files[targetPublicPath(asset.targetSlug)] = uploadedResult.url;
    uploaded += 1;
    console.log(`uploaded: ${asset.fileName} -> ${targetKey}`);
  }

  const output: ManifestFile = {
    generatedAt: new Date().toISOString(),
    publicBaseUrl: manifest.publicBaseUrl,
    files: Object.fromEntries(Object.entries(manifest.files).sort(([a], [b]) => a.localeCompare(b))),
  };
  await writeFile(MANIFEST_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  console.log('');
  console.log(`Done. Uploaded: ${uploaded}, skipped existing key: ${skippedExisting}, skipped equivalent: ${skippedEquivalent}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error(`Sync failed: ${message}`);
  process.exitCode = 1;
});
