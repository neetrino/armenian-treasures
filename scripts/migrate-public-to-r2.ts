import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import { getR2EnvConfig, getR2EnvPresence, uploadBufferToR2 } from '@/lib/storage/r2';

const PUBLIC_ROOT = resolve(process.cwd(), 'public');
const MANIFEST_PATH = resolve(process.cwd(), 'data', 'r2-public-manifest.json');

const CONTENT_TYPE_BY_EXT: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
};

interface ManifestFile {
  generatedAt: string;
  publicBaseUrl: string;
  files: Record<string, string>;
}

async function collectPublicFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolute = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectPublicFiles(absolute)));
      continue;
    }
    if (entry.isFile()) {
      files.push(absolute);
    }
  }

  return files;
}

function toPublicWebPath(absolutePath: string): string {
  const relativePath = relative(PUBLIC_ROOT, absolutePath).replace(/\\/g, '/');
  return `/${relativePath}`;
}

function toObjectKey(absolutePath: string): string {
  return relative(PUBLIC_ROOT, absolutePath).replace(/\\/g, '/');
}

function getContentType(filePath: string): string {
  const ext = extname(filePath).toLowerCase();
  return CONTENT_TYPE_BY_EXT[ext] ?? 'application/octet-stream';
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
  const absoluteFiles = await collectPublicFiles(PUBLIC_ROOT);

  if (absoluteFiles.length === 0) {
    console.log('No files found under /public.');
    return;
  }

  console.log(`Uploading ${absoluteFiles.length} file(s) from /public to R2...`);

  const manifest: ManifestFile = {
    generatedAt: new Date().toISOString(),
    publicBaseUrl: config.publicBaseUrl,
    files: {},
  };

  let uploaded = 0;
  let skipped = 0;

  for (const absolutePath of absoluteFiles) {
    const key = toObjectKey(absolutePath);
    const webPath = toPublicWebPath(absolutePath);
    const buffer = await readFile(absolutePath);
    const contentType = getContentType(absolutePath);

    try {
      const result = await uploadBufferToR2({ key, buffer, contentType });
      manifest.files[webPath] = result.url;
      uploaded += 1;
      console.log(`  uploaded ${webPath}`);
    } catch (error) {
      skipped += 1;
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(`  failed ${webPath}: ${message}`);
    }
  }

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log('');
  console.log(`Done. Uploaded: ${uploaded}, failed: ${skipped}.`);
  console.log(`Manifest written to ${relative(process.cwd(), MANIFEST_PATH)}`);
  console.log('');
  console.log('Next steps:');
  console.log('  1. Verify a few manifest URLs in the browser.');
  console.log('  2. Set USE_R2_PUBLIC_ASSETS=true and NEXT_PUBLIC_USE_R2_PUBLIC_ASSETS=true');
  console.log('  3. Set NEXT_PUBLIC_R2_PUBLIC_URL to the same value as R2_PUBLIC_URL');
  console.log('  4. Restart the app and confirm images load from R2.');
  console.log('  Local /public files were not modified or deleted.');
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error(`Migration failed: ${message}`);
  process.exitCode = 1;
});
