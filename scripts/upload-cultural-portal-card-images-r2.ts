import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { uploadBufferToR2, getR2EnvConfig } from '@/lib/storage/r2';

const ICON_DIR = resolve(process.cwd(), 'public/icons/cultural-portal');
const MANIFEST_PATH = resolve(process.cwd(), 'data', 'r2-public-manifest.json');

interface ManifestFile {
  generatedAt: string;
  publicBaseUrl: string;
  files: Record<string, string>;
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
    // Ignore missing .env; required vars are validated by getR2EnvConfig.
  }
}

async function loadManifest(publicBaseUrl: string): Promise<ManifestFile> {
  try {
    const raw = await readFile(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(raw) as ManifestFile;
    return {
      generatedAt: parsed.generatedAt,
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
  await loadEnvFromDotEnvFile();
  const config = getR2EnvConfig();
  const manifest = await loadManifest(config.publicBaseUrl);
  manifest.publicBaseUrl = config.publicBaseUrl;

  const webpFiles = (await readdir(ICON_DIR)).filter((name) => name.endsWith('.webp')).sort();

  if (webpFiles.length === 0) {
    throw new Error(`No .webp files found in ${ICON_DIR}. Run pnpm run images:cultural-portal first.`);
  }

  for (const filename of webpFiles) {
    const localPath = resolve(ICON_DIR, filename);
    const buffer = await readFile(localPath);
    const meta = await sharp(buffer).metadata();
    const publicPath = `/icons/cultural-portal/${filename}`;
    const r2Key = publicPath.replace(/^\//, '');

    const uploaded = await uploadBufferToR2({
      key: r2Key,
      buffer,
      contentType: 'image/webp',
    });

    manifest.files[publicPath] = uploaded.url;

    console.log(
      JSON.stringify({
        file: filename,
        dimensions: `${meta.width ?? '?'}×${meta.height ?? '?'}`,
        sizeKb: +(buffer.length / 1024).toFixed(1),
        url: uploaded.url,
      }),
    );
  }

  const output: ManifestFile = {
    generatedAt: new Date().toISOString(),
    publicBaseUrl: manifest.publicBaseUrl,
    files: Object.fromEntries(Object.entries(manifest.files).sort(([a], [b]) => a.localeCompare(b))),
  };

  await writeFile(MANIFEST_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(`Uploaded ${webpFiles.length} icons to R2. Manifest updated.`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
