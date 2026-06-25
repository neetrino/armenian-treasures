/**
 * Converts raster images under public/ from PNG/JPG to WebP.
 * Run: pnpm images:webp
 */
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg']);

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (RASTER_EXT.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertFile(filePath: string): Promise<void> {
  const ext = path.extname(filePath).toLowerCase();
  const webpPath = filePath.slice(0, -ext.length) + '.webp';

  if (path.basename(filePath).startsWith('.')) return;

  const input = await readFile(filePath);
  const webp = await sharp(input).webp({ quality: 82 }).toBuffer();
  await writeFile(webpPath, webp);

  if (webpPath !== filePath) {
    await unlink(filePath);
  }

  console.log(`✓ ${path.relative(PUBLIC_DIR, filePath)} → ${path.relative(PUBLIC_DIR, webpPath)}`);
}

async function main(): Promise<void> {
  const files = await walk(PUBLIC_DIR);
  if (files.length === 0) {
    console.log('No PNG/JPG files found under public/.');
    return;
  }

  for (const file of files) {
    await convertFile(file);
  }

  console.log(`Done. Converted ${files.length} file(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
