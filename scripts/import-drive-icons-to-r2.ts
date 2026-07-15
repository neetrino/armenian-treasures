import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { uploadBufferToR2, getR2EnvConfig, getR2EnvPresence } from '@/lib/storage/r2';

interface ManifestFile {
  generatedAt: string;
  publicBaseUrl: string;
  files: Record<string, string>;
}

const DRIVE_SOURCE_DIR = resolve(process.cwd(), 'tmp', 'drive-icons', 'all');
const MANIFEST_PATH = resolve(process.cwd(), 'data', 'r2-public-manifest.json');

const ICON_FILE_MAPPING = {
  churches: 'church.png',
  legends: 'Legendaries & Heroes.png',
  mythology: 'Mythology.png',
  museums: 'museum.png',
  kings: 'Icons of History.png',
  scientists: 'Scientists & Inventors.png',
  famousArmenians: 'Famous Armenians.png',
  history: 'Historical Events & Turning points.png',
  paintings: 'Paintings.png',
  music: 'Music.png',
  writers: 'Writers.png',
  taraz: 'taraz.png',
  carpets: 'Carpets & Textile Arts.png',
  sculptors: 'Sculptors.png',
  foodDrink: 'Food & Drink.png',
  dance: 'Dance.png',
  theatre: 'Theatre.png',
  armaments: 'Arnaments.png',
  publications: 'Publications.png',
} as const;

function buildObjectKey(iconKey: keyof typeof ICON_FILE_MAPPING): string {
  return `icons/cultural-portal/${iconKey}.png`;
}

function buildPublicPath(iconKey: keyof typeof ICON_FILE_MAPPING): string {
  return `/${buildObjectKey(iconKey)}`;
}

async function readManifestOrCreate(baseUrl: string): Promise<ManifestFile> {
  try {
    const raw = await readFile(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(raw) as ManifestFile;
    return {
      generatedAt: new Date().toISOString(),
      publicBaseUrl: parsed.publicBaseUrl || baseUrl,
      files: parsed.files ?? {},
    };
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      publicBaseUrl: baseUrl,
      files: {},
    };
  }
}

function logEnvPresence(): void {
  const presence = getR2EnvPresence();
  console.log('R2 environment presence:');
  for (const [key, present] of Object.entries(presence)) {
    console.log(`  ${key}: ${present ? 'present' : 'missing'}`);
  }
}

async function main(): Promise<void> {
  logEnvPresence();
  const config = getR2EnvConfig();
  const manifest = await readManifestOrCreate(config.publicBaseUrl);
  manifest.publicBaseUrl = config.publicBaseUrl;

  let uploaded = 0;
  let skipped = 0;
  for (const [iconKey, sourceFile] of Object.entries(ICON_FILE_MAPPING)) {
    const absolutePath = resolve(DRIVE_SOURCE_DIR, sourceFile);
    let buffer: Buffer;
    try {
      buffer = await readFile(absolutePath);
    } catch {
      skipped += 1;
      console.warn(`missing source file for ${iconKey}: ${absolutePath}`);
      continue;
    }
    const objectKey = buildObjectKey(iconKey as keyof typeof ICON_FILE_MAPPING);
    const publicPath = buildPublicPath(iconKey as keyof typeof ICON_FILE_MAPPING);
    const result = await uploadBufferToR2({
      key: objectKey,
      buffer,
      contentType: 'image/png',
    });
    manifest.files[publicPath] = result.url;
    uploaded += 1;
    console.log(`uploaded ${publicPath} -> ${result.url}`);
  }

  const sortedFiles = Object.fromEntries(
    Object.entries(manifest.files).sort(([a], [b]) => a.localeCompare(b)),
  );
  const output: ManifestFile = {
    generatedAt: new Date().toISOString(),
    publicBaseUrl: manifest.publicBaseUrl,
    files: sortedFiles,
  };

  await writeFile(MANIFEST_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  console.log('');
  console.log(`Done. Uploaded ${uploaded} icon files. Skipped ${skipped}.`);
  console.log(`Manifest updated: ${MANIFEST_PATH}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error(`Import failed: ${message}`);
  process.exitCode = 1;
});
