import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { getR2ManifestPublicBaseUrl, getR2ManifestUrl } from '@/lib/assets/r2-manifest';
import { getR2EnvConfig, uploadBufferToR2 } from '@/lib/storage/r2';

interface ManifestFile {
  generatedAt: string;
  publicBaseUrl: string;
  files: Record<string, string>;
}

const MANIFEST_PATH = resolve(process.cwd(), 'data', 'r2-public-manifest.json');

const ICON_KEYS = [
  'churches',
  'castles',
  'legends',
  'mythology',
  'museums',
  'kings',
  'scientists',
  'famousArmenians',
  'history',
  'paintings',
  'music',
  'writers',
  'taraz',
  'carpets',
  'sculptors',
  'foodDrink',
  'dance',
  'theatre',
  'armaments',
  'publications',
] as const;

type IconKey = (typeof ICON_KEYS)[number];

function sourcePathForKey(key: IconKey): string {
  if (key === 'writers') return '/icons/cultural-portal/writers.svg';
  return `/icons/cultural-portal/${key}.png`;
}

function targetPathForKey(key: IconKey): string {
  return `/icons/cultural-portal/${key}.webp`;
}

function resolveSourceUrl(sourcePath: string, publicBaseUrl: string): string {
  const fromManifest = getR2ManifestUrl(sourcePath);
  if (fromManifest) return fromManifest;
  const fromManifestBase = getR2ManifestPublicBaseUrl();
  if (fromManifestBase) return `${fromManifestBase}${sourcePath}`;
  return `${publicBaseUrl}${sourcePath}`;
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

  for (const iconKey of ICON_KEYS) {
    const sourcePath = sourcePathForKey(iconKey);
    const sourceUrl = resolveSourceUrl(sourcePath, config.publicBaseUrl);
    const response = await fetch(sourceUrl);
    if (!response.ok) {
      throw new Error(`Failed to download ${sourcePath}: HTTP ${response.status}`);
    }

    const sourceBuffer = Buffer.from(await response.arrayBuffer());
    const webpBuffer = await sharp(sourceBuffer).webp({ quality: 92 }).toBuffer();
    const targetPath = targetPathForKey(iconKey);
    const targetKey = targetPath.replace(/^\//, '');
    const uploaded = await uploadBufferToR2({
      key: targetKey,
      buffer: webpBuffer,
      contentType: 'image/webp',
    });
    manifest.files[targetPath] = uploaded.url;
    console.log(`converted ${sourcePath} -> ${targetPath}`);
  }

  const output: ManifestFile = {
    generatedAt: new Date().toISOString(),
    publicBaseUrl: manifest.publicBaseUrl,
    files: Object.fromEntries(
      Object.entries(manifest.files).sort(([a], [b]) => a.localeCompare(b)),
    ),
  };
  await writeFile(MANIFEST_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log('Done. Manifest updated with .webp icon paths.');
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error(`Conversion failed: ${message}`);
  process.exitCode = 1;
});
