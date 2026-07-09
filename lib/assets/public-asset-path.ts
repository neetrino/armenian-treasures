const RASTER_IMAGE_EXT = /\.(webp|png|jpe?g|gif|avif|ico)$/i;

export function isSvgPublicPath(path: string): boolean {
  return /\.svg$/i.test(path.trim());
}

export function isRasterPublicPath(path: string): boolean {
  return RASTER_IMAGE_EXT.test(path.trim());
}
