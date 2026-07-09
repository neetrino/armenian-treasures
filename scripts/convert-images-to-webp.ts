/**
 * Converts raster images under public/ from PNG/JPG to WebP, uploads to R2,
 * and removes local raster copies. SVG files are left in /public.
 * Run: pnpm images:webp
 */
import { readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { convertRasterToWebp } from '@/lib/images/convert-raster-to-webp';
import { isR2Configured, uploadRasterImage } from '@/lib/storage/raster-r2';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function toObjectKey(relativePath: string): string {
  return relativePath.replace(/\\/g, '/');
}

async function walkRaster(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'uploads') continue;
      files.push(...(await walkRaster(fullPath)));
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (RASTER_EXT.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertSourceToWebp(filePath: string): Promise<{ webpPath: string; buffer: Buffer }> {
  const ext = path.extname(filePath).toLowerCase();
  const webpPath = filePath.slice(0, -ext.length) + '.webp';
  const input = await readFile(filePath);
  const webp = await convertRasterToWebp(input);
  return { webpPath, buffer: webp };
}

async function processRasterFile(filePath: string): Promise<void> {
  const ext = path.extname(filePath).toLowerCase();
  const relative = path.relative(PUBLIC_DIR, filePath);
  let webpPath = filePath;
  let webpBuffer: Buffer;

  if (ext === '.webp') {
    webpBuffer = await readFile(filePath);
  } else {
    const converted = await convertSourceToWebp(filePath);
    webpPath = converted.webpPath;
    webpBuffer = converted.buffer;
    await unlink(filePath);
  }

  if (isR2Configured()) {
    const key = toObjectKey(path.relative(PUBLIC_DIR, webpPath));
    await uploadRasterImage({
      key,
      buffer: webpBuffer,
      contentType: 'image/webp',
    });
    await unlink(webpPath).catch(() => undefined);
    console.log(`✓ ${relative} → R2:${key}`);
    return;
  }

  if (ext !== '.webp') {
    await writeFile(webpPath, webpBuffer);
  }
  console.log(`✓ ${relative} (R2 not configured — kept local WebP only)`);
}

async function main(): Promise<void> {
  const files = await walkRaster(PUBLIC_DIR);
  if (files.length === 0) {
    console.log('No raster files found under public/ (excluding uploads/).');
    return;
  }

  for (const file of files) {
    await processRasterFile(file);
  }

  console.log(`Done. Processed ${files.length} raster file(s).`);
  if (!isR2Configured()) {
    console.log('Configure R2_* env vars to upload raster assets to R2 and remove local copies.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
