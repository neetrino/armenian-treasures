import { readdir, unlink } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import { isSvgPublicPath } from '@/lib/assets/public-asset-path';

const PUBLIC_ROOT = resolve(process.cwd(), 'public');
const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.ico']);

async function collectRasterFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolute = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'uploads') {
        files.push(...(await collectRasterFiles(absolute)));
      } else {
        files.push(...(await collectRasterFiles(absolute)));
      }
      continue;
    }
    if (!entry.isFile()) continue;
    const webPath = `/${relative(PUBLIC_ROOT, absolute).replace(/\\/g, '/')}`;
    if (isSvgPublicPath(webPath)) continue;
    if (RASTER_EXT.has(extname(entry.name).toLowerCase())) {
      files.push(absolute);
    }
  }

  return files;
}

async function main(): Promise<void> {
  const files = await collectRasterFiles(PUBLIC_ROOT);
  if (files.length === 0) {
    console.log('No local raster files found under /public.');
    return;
  }

  for (const file of files) {
    await unlink(file);
    console.log(`  removed ${relative(PUBLIC_ROOT, file)}`);
  }

  console.log(`Removed ${files.length} local raster file(s). SVG assets were kept.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
