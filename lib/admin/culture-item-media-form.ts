import {
  emptyMediaContent,
  type CultureDescriptionBlock,
  type CultureGalleryBlock,
  type CultureItemMediaContent,
  type CultureTourBlock,
  type CultureTourType,
  type CultureVideoBlock,
} from '@/lib/culture-item-media';
import { isCultureItemEditorSectionId, type CultureItemEditorSectionId } from '@/lib/admin/culture-item-editor-sections';

function readCount(formData: FormData, name: string): number {
  const raw = Number(formData.get(name)?.toString() ?? '0');
  if (!Number.isFinite(raw)) return 0;
  return Math.max(0, Math.min(30, Math.trunc(raw)));
}

function read(formData: FormData, name: string): string {
  return formData.get(name)?.toString().trim() ?? '';
}

function readTourType(value: string): CultureTourType {
  if (value === 'SCAN_3D' || value === 'MODEL_3D' || value === 'MATTERPORT') return 'SCAN_3D';
  if (value === 'DRONE') return 'DRONE';
  return 'LIDAR';
}

function readBlocks(formData: FormData): CultureDescriptionBlock[] {
  const count = readCount(formData, 'blocksCount');
  const blocks: CultureDescriptionBlock[] = [];
  for (let index = 0; index < count; index += 1) {
    const prefix = `block.${index}`;
    blocks.push({
      id: read(formData, `${prefix}.id`) || `block-${index}`,
      title: read(formData, `${prefix}.title`),
      subtitle: read(formData, `${prefix}.subtitle`),
      body: read(formData, `${prefix}.body`),
      image: read(formData, `${prefix}.image`),
      caption: read(formData, `${prefix}.caption`),
    });
  }
  return blocks;
}

function readTours(formData: FormData): CultureTourBlock[] {
  const count = readCount(formData, 'toursCount');
  const tours: CultureTourBlock[] = [];
  for (let index = 0; index < count; index += 1) {
    const prefix = `tour.${index}`;
    tours.push({
      id: read(formData, `${prefix}.id`) || `tour-${index}`,
      type: readTourType(read(formData, `${prefix}.type`)),
      title: read(formData, `${prefix}.title`),
      url: read(formData, `${prefix}.url`),
      previewImage: read(formData, `${prefix}.previewImage`),
    });
  }
  return tours.filter((tour) => tour.url || tour.title);
}

function readVideos(formData: FormData): CultureVideoBlock[] {
  const count = readCount(formData, 'videosCount');
  const videos: CultureVideoBlock[] = [];
  for (let index = 0; index < count; index += 1) {
    const prefix = `video.${index}`;
    videos.push({
      id: read(formData, `${prefix}.id`) || `video-${index}`,
      title: read(formData, `${prefix}.title`),
      url: read(formData, `${prefix}.url`),
      previewImage: read(formData, `${prefix}.previewImage`),
    });
  }
  return videos.filter((video) => video.url || video.title);
}

function readGallery(formData: FormData): CultureGalleryBlock[] {
  const count = readCount(formData, 'galleryCount');
  const gallery: CultureGalleryBlock[] = [];
  for (let index = 0; index < count; index += 1) {
    const prefix = `gallery.${index}`;
    gallery.push({
      id: read(formData, `${prefix}.id`) || `gallery-${index}`,
      kind: read(formData, `${prefix}.kind`) === 'beforeAfter' ? 'beforeAfter' : 'image',
      url: read(formData, `${prefix}.url`),
      beforeUrl: read(formData, `${prefix}.beforeUrl`),
      afterUrl: read(formData, `${prefix}.afterUrl`),
      caption: read(formData, `${prefix}.caption`),
      alt: read(formData, `${prefix}.alt`),
    });
  }
  return gallery.filter((item) => item.url || item.beforeUrl || item.afterUrl);
}

function readSectionOrder(formData: FormData): CultureItemEditorSectionId[] | undefined {
  const raw = formData.get('sectionOrder')?.toString().trim() ?? '';
  if (!raw) return undefined;
  const parsed = raw
    .split(',')
    .map((value) => value.trim())
    .filter(isCultureItemEditorSectionId);
  return parsed.length > 0 ? parsed : undefined;
}
export function readCultureItemMediaFromForm(formData: FormData): CultureItemMediaContent {
  return {
    ...emptyMediaContent(),
    address: read(formData, 'address'),
    blocks: readBlocks(formData),
    tours: readTours(formData),
    videos: readVideos(formData),
    gallery: readGallery(formData),
    sectionOrder: readSectionOrder(formData),
  };
}
