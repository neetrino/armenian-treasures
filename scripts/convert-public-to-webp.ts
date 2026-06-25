import { readdir, stat } from 'node:fs/promises';
import { extname, join, parse, relative, resolve } from 'node:path';
import sharp from 'sharp';

const PUBLIC_ROOT = resolve(process.cwd(), 'public');
const CONVERT_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

async function collectRasterFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolute = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectRasterFiles(absolute)));
      continue;
    }
    if (entry.isFile() && CONVERT_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(absolute);
    }
  }

  return files;
}

async function convertToWebp(sourcePath: string): Promise<string> {
  const { dir, name } = parse(sourcePath);
  const targetPath = join(dir, `${name}.webp`);

  await sharp(sourcePath)
    .webp({ quality: 82, effort: 4 })
    .toFile(targetPath);

  return targetPath;
}

async function main(): Promise<void> {
  const files = await collectRasterFiles(PUBLIC_ROOT);

  if (files.length === 0) {
    console.log('No PNG/JPG files found under /public.');
    return;
  }

  console.log(`Converting ${files.length} raster file(s) to WebP...`);

  for (const file of files) {
    const info = await stat(file);
    if (!info.isFile()) continue;

    const output = await convertToWebp(file);
    console.log(`  ${relative(PUBLIC_ROOT, file)} -> ${relative(PUBLIC_ROOT, output)}`);
  }

  console.log('WebP conversion complete.');
}

main().catch((error) => {
  console.error('WebP conversion failed:', error);
  process.exitCode = 1;
});
