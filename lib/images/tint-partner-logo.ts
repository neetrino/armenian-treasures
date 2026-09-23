const LOGO_BLUE = { r: 48, g: 168, b: 168 } as const;
const WHITE_LEVEL = 226;

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function luminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function colorDistance(r: number, g: number, b: number, color: Rgb): number {
  const dr = r - color.r;
  const dg = g - color.g;
  const db = b - color.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function isNearWhite(r: number, g: number, b: number): boolean {
  return r >= WHITE_LEVEL && g >= WHITE_LEVEL && b >= WHITE_LEVEL;
}

function paintBlue(data: Uint8ClampedArray, index: number, alpha: number): void {
  data[index] = LOGO_BLUE.r;
  data[index + 1] = LOGO_BLUE.g;
  data[index + 2] = LOGO_BLUE.b;
  data[index + 3] = alpha;
}

function isBackdrop(r: number, g: number, b: number, alpha: number, plate: Rgb | null): boolean {
  if (alpha < 24) return true;
  if (isNearWhite(r, g, b)) return true;
  return plate !== null && colorDistance(r, g, b, plate) < 52;
}

function paintMark(data: Uint8ClampedArray, plate: Rgb | null, knockLight: boolean): void {
  for (let index = 0; index < data.length; index += 4) {
    const red = data[index] ?? 0;
    const green = data[index + 1] ?? 0;
    const blue = data[index + 2] ?? 0;
    const alpha = data[index + 3] ?? 0;
    if (isBackdrop(red, green, blue, alpha, plate)) {
      data[index + 3] = 0;
      continue;
    }
    if (knockLight && luminance(red, green, blue) > 214) {
      data[index + 3] = 0;
      continue;
    }
    paintBlue(data, index, 255);
  }
}

function paintDuotone(data: Uint8ClampedArray): void {
  for (let index = 0; index < data.length; index += 4) {
    const red = data[index] ?? 0;
    const green = data[index + 1] ?? 0;
    const blue = data[index + 2] ?? 0;
    const alpha = data[index + 3] ?? 0;
    if (alpha < 24 || isNearWhite(red, green, blue)) {
      data[index + 3] = 0;
      continue;
    }
    const lum = luminance(red, green, blue);
    const coverage = lum > 200 ? 0 : 1 - lum / 230;
    paintBlue(data, index, Math.round(Math.min(1, Math.max(0, coverage)) * 255));
  }
}

interface PlateStats {
  clearShare: number;
  whiteShare: number;
  plate: Rgb | null;
  plateShare: number;
}

function readPlate(data: Uint8ClampedArray, width: number, height: number): PlateStats {
  const buckets = new Map<string, { r: number; g: number; b: number; count: number; edge: number }>();
  let clear = 0;
  let white = 0;
  const pixels = width * height;
  for (let pixel = 0; pixel < pixels; pixel += 1) {
    const index = pixel * 4;
    const alpha = data[index + 3] ?? 0;
    const red = data[index] ?? 0;
    const green = data[index + 1] ?? 0;
    const blue = data[index + 2] ?? 0;
    if (alpha < 24) {
      clear += 1;
      continue;
    }
    if (isNearWhite(red, green, blue)) white += 1;
    const key = `${red >> 4},${green >> 4},${blue >> 4}`;
    const bucket = buckets.get(key) ?? { r: 0, g: 0, b: 0, count: 0, edge: 0 };
    bucket.r += red;
    bucket.g += green;
    bucket.b += blue;
    bucket.count += 1;
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    if (x < 3 || y < 3 || x >= width - 3 || y >= height - 3) bucket.edge += 1;
    buckets.set(key, bucket);
  }
  let plate: Rgb | null = null;
  let plateShare = 0;
  for (const bucket of buckets.values()) {
    const share = bucket.count / pixels;
    if (share < plateShare || bucket.edge < 8) continue;
    plateShare = share;
    plate = { r: bucket.r / bucket.count, g: bucket.g / bucket.count, b: bucket.b / bucket.count };
  }
  return { clearShare: clear / pixels, whiteShare: white / pixels, plate, plateShare };
}

/** Recolor a logo to the Armenian Treasures mark blue and drop its backdrop. */
export function tintPartnerLogoPixels(data: Uint8ClampedArray, width: number, height: number): void {
  const stats = readPlate(data, width, height);
  if (stats.whiteShare > 0.22) {
    paintMark(data, null, false);
    return;
  }
  if (stats.clearShare > 0.12) {
    paintMark(data, null, true);
    return;
  }
  const plateIsBackdrop = stats.plate !== null && stats.plateShare > 0.4 && 1 - stats.plateShare > 0.06;
  if (plateIsBackdrop && stats.plate && !isNearWhite(stats.plate.r, stats.plate.g, stats.plate.b)) {
    paintMark(data, stats.plate, false);
    return;
  }
  paintDuotone(data);
}
