import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join, parse, relative, resolve } from 'node:path';
import sharp from 'sharp';
import type { Sharp } from 'sharp';

type FitMode = 'cover' | 'contain';

interface CliOptions {
  inputDir: string;
  outputDir: string;
  width: number;
  height: number;
  fit: FitMode;
  maxKb: number | null;
  qualityMin: number;
  qualityMax: number;
  qualityStep: number;
}

interface OptimizationResult {
  sourcePath: string;
  outputPath: string;
  sourceBytes: number;
  outputBytes: number;
  quality: number;
}

const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function parsePositiveInt(input: string, fallback: number): number {
  const parsed = Number.parseInt(input, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseFit(input: string | undefined): FitMode {
  return input === 'contain' ? 'contain' : 'cover';
}

function parseArgs(argv: string[]): CliOptions {
  const optionsMap = new Map<string, string>();
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg) continue;
    if (!arg.startsWith('--')) continue;
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) continue;
    optionsMap.set(arg, value);
  }

  const inputDir = resolve(process.cwd(), optionsMap.get('--input') ?? 'public');
  const outputDir = resolve(process.cwd(), optionsMap.get('--output') ?? 'tmp/optimized-images-200');
  const width = parsePositiveInt(optionsMap.get('--width') ?? '200', 200);
  const height = parsePositiveInt(optionsMap.get('--height') ?? '200', 200);
  const qualityMin = parsePositiveInt(optionsMap.get('--quality-min') ?? '36', 36);
  const qualityMax = parsePositiveInt(optionsMap.get('--quality-max') ?? '86', 86);
  const qualityStep = parsePositiveInt(optionsMap.get('--quality-step') ?? '5', 5);
  const maxKbRaw = optionsMap.get('--max-kb');
  const maxKb = maxKbRaw ? parsePositiveInt(maxKbRaw, 0) : null;

  return {
    inputDir,
    outputDir,
    width,
    height,
    fit: parseFit(optionsMap.get('--fit')),
    maxKb: maxKb && maxKb > 0 ? maxKb : null,
    qualityMin: Math.min(qualityMin, qualityMax),
    qualityMax: Math.max(qualityMin, qualityMax),
    qualityStep,
  };
}

async function collectFiles(dirPath: string): Promise<string[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (!entry.isFile()) continue;
    const extension = extname(entry.name).toLowerCase();
    if (SUPPORTED_EXTENSIONS.has(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

function buildQualityCandidates(min: number, max: number, step: number): number[] {
  const qualities: number[] = [];
  for (let value = max; value >= min; value -= step) {
    qualities.push(value);
  }
  if (qualities.at(-1) !== min) {
    qualities.push(min);
  }
  return qualities;
}

function createResizedPipeline(input: Buffer, options: CliOptions): Sharp {
  return sharp(input).resize(options.width, options.height, {
    fit: options.fit,
    position: 'centre',
    background: { r: 0, g: 0, b: 0, alpha: 1 },
    withoutEnlargement: false,
  });
}

async function encodeWebpAtQuality(base: Sharp, quality: number): Promise<Buffer> {
  return base
    .clone()
    .webp({
      quality,
      effort: 6,
      smartSubsample: true,
      nearLossless: false,
      alphaQuality: quality,
    })
    .toBuffer();
}

async function chooseBestBuffer(
  input: Buffer,
  options: CliOptions,
): Promise<{ buffer: Buffer; quality: number }> {
  const basePipeline = createResizedPipeline(input, options);
  const candidates = buildQualityCandidates(
    options.qualityMin,
    options.qualityMax,
    options.qualityStep,
  );
  const maxBytes = options.maxKb ? options.maxKb * 1024 : null;
  let smallest: { buffer: Buffer; quality: number } | null = null;

  for (const quality of candidates) {
    const encoded = await encodeWebpAtQuality(basePipeline, quality);
    if (!smallest || encoded.length < smallest.buffer.length) {
      smallest = { buffer: encoded, quality };
    }
    if (maxBytes && encoded.length <= maxBytes) {
      return { buffer: encoded, quality };
    }
  }

  if (!smallest) {
    throw new Error('Could not encode image candidate.');
  }
  return smallest;
}

async function ensureDirectory(pathname: string): Promise<void> {
  await mkdir(pathname, { recursive: true });
}

function buildOutputPath(inputPath: string, options: CliOptions): string {
  const rel = relative(options.inputDir, inputPath);
  const parsed = parse(rel);
  return join(options.outputDir, parsed.dir, `${parsed.name}.webp`);
}

async function optimizeOne(filePath: string, options: CliOptions): Promise<OptimizationResult> {
  const sourceBuffer = await readFile(filePath);
  const sourceInfo = await stat(filePath);
  const outputPath = buildOutputPath(filePath, options);
  await ensureDirectory(parse(outputPath).dir);
  const { buffer: optimizedBuffer, quality } = await chooseBestBuffer(sourceBuffer, options);
  await writeFile(outputPath, optimizedBuffer);

  return {
    sourcePath: filePath,
    outputPath,
    sourceBytes: sourceInfo.size,
    outputBytes: optimizedBuffer.length,
    quality,
  };
}

function formatKb(bytes: number): string {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

async function writeReport(
  results: OptimizationResult[],
  options: CliOptions,
): Promise<void> {
  const reportPath = join(options.outputDir, 'optimization-report.json');
  const totalSource = results.reduce((acc, item) => acc + item.sourceBytes, 0);
  const totalOutput = results.reduce((acc, item) => acc + item.outputBytes, 0);
  const payload = {
    generatedAt: new Date().toISOString(),
    inputDir: options.inputDir,
    outputDir: options.outputDir,
    width: options.width,
    height: options.height,
    fit: options.fit,
    maxKb: options.maxKb,
    totals: {
      files: results.length,
      sourceBytes: totalSource,
      outputBytes: totalOutput,
      reductionPercent: totalSource > 0 ? Number(((1 - totalOutput / totalSource) * 100).toFixed(2)) : 0,
    },
    files: results.map((item) => ({
      source: relative(options.inputDir, item.sourcePath),
      output: relative(options.outputDir, item.outputPath),
      sourceBytes: item.sourceBytes,
      outputBytes: item.outputBytes,
      sourceKb: Number((item.sourceBytes / 1024).toFixed(2)),
      outputKb: Number((item.outputBytes / 1024).toFixed(2)),
      quality: item.quality,
    })),
  };
  await writeFile(reportPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  await ensureDirectory(options.outputDir);
  const files = await collectFiles(options.inputDir);

  if (files.length === 0) {
    console.log(`No supported images found under: ${options.inputDir}`);
    return;
  }

  console.log(`Optimizing ${files.length} image(s) to ${options.width}x${options.height} WebP...`);
  const results: OptimizationResult[] = [];
  for (const filePath of files) {
    const result = await optimizeOne(filePath, options);
    results.push(result);
    console.log(
      `  ${relative(options.inputDir, result.sourcePath)} -> ${relative(options.outputDir, result.outputPath)} | ${formatKb(result.sourceBytes)} -> ${formatKb(result.outputBytes)} | q=${result.quality}`,
    );
  }

  await writeReport(results, options);

  const totalSource = results.reduce((acc, item) => acc + item.sourceBytes, 0);
  const totalOutput = results.reduce((acc, item) => acc + item.outputBytes, 0);
  const reductionPercent = totalSource > 0 ? ((1 - totalOutput / totalSource) * 100).toFixed(2) : '0.00';
  console.log('');
  console.log(`Done. Total: ${formatKb(totalSource)} -> ${formatKb(totalOutput)} (${reductionPercent}% smaller).`);
  console.log(`Report: ${join(options.outputDir, 'optimization-report.json')}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error(`Optimization failed: ${message}`);
  process.exitCode = 1;
});
