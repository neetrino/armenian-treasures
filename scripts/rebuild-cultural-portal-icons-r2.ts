import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { uploadBufferToR2 } from '@/lib/storage/r2';

interface CandidateResult {
  buffer: Buffer;
  size: number;
  dimension: number;
  quality: number;
}

const ICON_KEYS = [
  'churches',
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

/** Matches `CULTURAL_PORTAL_CARD_IMAGE_PX` — 2× largest rendered card media edge. */
const TARGET_DIMENSION = 840;
const MIN_TARGET_BYTES = 35 * 1024;
const MAX_TARGET_BYTES = 85 * 1024;
const TARGET_CENTER_BYTES = 55 * 1024;
const DIMENSION_CANDIDATES = [TARGET_DIMENSION];
const QUALITY_CANDIDATES = [
  100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60, 58, 56,
  54, 52, 50, 48, 46, 44, 42, 40,
];
const SOURCE_OVERRIDES: Partial<Record<(typeof ICON_KEYS)[number], string>> = {
  legends: 'public/icons/cultural-portal/legends.svg',
  writers:
    'C:/Users/ROG/.cursor/projects/d-armenian-treasure/assets/c__Users_ROG_AppData_Roaming_Cursor_User_workspaceStorage_2b2eca483bfdb1193077b2f757165ae3_images_Writers-e1fc6797-b2b3-4a70-af73-ab90cfec9b6d.png',
};

function resolveKeysFromArgs(): string[] {
  const keysArgIndex = process.argv.findIndex((arg) => arg === '--keys');
  if (keysArgIndex === -1) return [...ICON_KEYS];
  const value = process.argv[keysArgIndex + 1]?.trim() ?? '';
  if (!value) return [...ICON_KEYS];
  return value
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);
}

async function loadEnvFromDotEnvFile(): Promise<void> {
  if (process.env.R2_PUBLIC_URL && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY) {
    return;
  }

  try {
    const envRaw = await readFile('.env', 'utf8');
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
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // Ignore missing .env; required vars are validated later.
  }
}

function getPublicR2BaseUrl(): string {
  const base = process.env.R2_PUBLIC_URL?.trim();
  if (!base) {
    throw new Error('Missing R2_PUBLIC_URL in environment.');
  }
  return base.replace(/\/$/, '');
}

async function fetchSourceBuffer(key: string, baseUrl: string): Promise<{ sourceUrl: string; buffer: Buffer }> {
  const overridePath = SOURCE_OVERRIDES[key as keyof typeof SOURCE_OVERRIDES];
  if (overridePath) {
    return {
      sourceUrl: overridePath,
      buffer: await readFile(overridePath),
    };
  }

  const localCandidates = [
    `public/icons/cultural-portal/${key}.png`,
    `public/icons/cultural-portal/${key}.svg`,
    `public/icons/cultural-portal/${key}.webp`,
  ];

  for (const localPath of localCandidates) {
    try {
      return {
        sourceUrl: localPath,
        buffer: await readFile(localPath),
      };
    } catch {
      // Try next local candidate.
    }
  }

  const candidates = [
    `${baseUrl}/icons/cultural-portal/${key}.png`,
    `${baseUrl}/icons/cultural-portal/${key}.svg`,
    `${baseUrl}/icons/cultural-portal/${key}.webp`,
  ];

  for (const sourceUrl of candidates) {
    const response = await fetch(`${sourceUrl}?v=${Date.now()}`);
    if (!response.ok) continue;
    return {
      sourceUrl,
      buffer: Buffer.from(await response.arrayBuffer()),
    };
  }

  throw new Error(`No source found for icon "${key}"`);
}

function pickBestCandidate(candidates: CandidateResult[]): CandidateResult {
  if (candidates.length === 0) {
    throw new Error('No encoded candidates were produced for icon.');
  }

  const inRange = candidates.filter(
    (candidate) => candidate.size >= MIN_TARGET_BYTES && candidate.size <= MAX_TARGET_BYTES,
  );
  if (inRange.length > 0) {
    return [...inRange].sort(
      (a, b) =>
        Math.abs(a.size - TARGET_CENTER_BYTES) - Math.abs(b.size - TARGET_CENTER_BYTES) ||
        b.quality - a.quality,
    )[0]!;
  }

  const underRange = candidates.filter((candidate) => candidate.size < MIN_TARGET_BYTES);
  if (underRange.length > 0) {
    return [...underRange].sort((a, b) => b.size - a.size || b.quality - a.quality)[0]!;
  }

  return [...candidates].sort((a, b) => a.size - b.size || a.quality - b.quality)[0]!;
}

async function buildCandidates(sourceBuffer: Buffer): Promise<CandidateResult[]> {
  const candidates: CandidateResult[] = [];

  for (const dimension of DIMENSION_CANDIDATES) {
    for (const quality of QUALITY_CANDIDATES) {
      const output = await sharp(sourceBuffer)
        .resize(dimension, dimension, {
          fit: 'cover',
          position: 'centre',
          withoutEnlargement: false,
        })
        .webp({
          quality,
          alphaQuality: quality,
          effort: 6,
          smartSubsample: true,
        })
        .toBuffer();

      candidates.push({
        buffer: output,
        size: output.length,
        dimension,
        quality,
      });
    }
  }

  return candidates;
}

async function processIcon(key: string, baseUrl: string): Promise<void> {
  const { sourceUrl, buffer } = await fetchSourceBuffer(key, baseUrl);
  const candidates = await buildCandidates(buffer);
  const best = pickBestCandidate(candidates);
  const uploaded = await uploadBufferToR2({
    key: `icons/cultural-portal/${key}.webp`,
    buffer: best.buffer,
    contentType: 'image/webp',
  });

  const sizeKb = (best.size / 1024).toFixed(1);
  const inRange = best.size >= MIN_TARGET_BYTES && best.size <= MAX_TARGET_BYTES;

  console.log(
    JSON.stringify({
      key,
      source: sourceUrl,
      dimension: best.dimension,
      quality: best.quality,
      sizeKb,
      inTargetRange: inRange,
      url: uploaded.url,
    }),
  );
}

async function main(): Promise<void> {
  await loadEnvFromDotEnvFile();
  const baseUrl = getPublicR2BaseUrl();
  const keys = resolveKeysFromArgs();

  for (const key of keys) {
    await processIcon(key, baseUrl);
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
