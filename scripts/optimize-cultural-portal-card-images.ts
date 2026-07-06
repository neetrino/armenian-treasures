import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { CULTURAL_PORTAL_CARD_IMAGE_PX } from '@/lib/constants/cultural-portal-image-metrics';
import { getR2ManifestPublicBaseUrl, getR2ManifestUrl } from '@/lib/assets/r2-manifest';

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

const OUTPUT_DIR = resolve(process.cwd(), 'public/icons/cultural-portal');
const WEBP_QUALITY = 90;

interface SourceResult {
  key: string;
  source: string;
  buffer: Buffer;
}

async function loadSourceBuffer(key: string): Promise<SourceResult> {
  const remotePath = `/icons/cultural-portal/${key}.webp`;
  const remoteCandidates = [
    getR2ManifestUrl(remotePath),
    getR2ManifestPublicBaseUrl() ? `${getR2ManifestPublicBaseUrl()}${remotePath}` : null,
  ].filter((url): url is string => Boolean(url));

  for (const remoteUrl of remoteCandidates) {
    const response = await fetch(remoteUrl);
    if (!response.ok) continue;
    return {
      key,
      source: remoteUrl,
      buffer: Buffer.from(await response.arrayBuffer()),
    };
  }

  const localCandidates = [
    resolve(OUTPUT_DIR, `${key}.png`),
    resolve(OUTPUT_DIR, `${key}.svg`),
  ];

  for (const localPath of localCandidates) {
    try {
      return {
        key,
        source: localPath,
        buffer: await readFile(localPath),
      };
    } catch {
      // Try next local candidate.
    }
  }

  throw new Error(`No source found for "${key}"`);
}

async function optimizeIcon(key: string): Promise<void> {
  const { source, buffer: sourceBuffer } = await loadSourceBuffer(key);
  const sourceMeta = await sharp(sourceBuffer).metadata();
  const outputPath = resolve(OUTPUT_DIR, `${key}.webp`);

  const outputBuffer = await sharp(sourceBuffer)
    .resize(CULTURAL_PORTAL_CARD_IMAGE_PX, CULTURAL_PORTAL_CARD_IMAGE_PX, {
      fit: 'cover',
      position: 'centre',
      withoutEnlargement: true,
    })
    .webp({
      quality: WEBP_QUALITY,
      alphaQuality: WEBP_QUALITY,
      effort: 6,
      smartSubsample: true,
    })
    .toBuffer();

  await writeFile(outputPath, outputBuffer);

  console.log(
    JSON.stringify({
      key,
      source,
      from: `${sourceMeta.width ?? '?'}×${sourceMeta.height ?? '?'}`,
      to: `${CULTURAL_PORTAL_CARD_IMAGE_PX}×${CULTURAL_PORTAL_CARD_IMAGE_PX}`,
      sizeKb: +(outputBuffer.length / 1024).toFixed(1),
      output: outputPath,
    }),
  );
}

async function main(): Promise<void> {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const keysArgIndex = process.argv.findIndex((arg) => arg === '--keys');
  const keys =
    keysArgIndex === -1
      ? [...ICON_KEYS]
      : (process.argv[keysArgIndex + 1] ?? '')
          .split(',')
          .map((key) => key.trim())
          .filter(Boolean);

  for (const key of keys) {
    await optimizeIcon(key);
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
