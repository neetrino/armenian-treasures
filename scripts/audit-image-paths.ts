import { PrismaClient } from '@prisma/client';
import { auditImagePath } from '@/lib/assets/image-path-audit';
import { parseMenuCatalogContent } from '@/lib/types/culture-catalog-content';

interface AuditRecord {
  source: string;
  id: string;
  field: string;
  path: string;
  status: string;
  resolvedUrl: string;
  reason?: string;
}

function createPrisma(): PrismaClient {
  return new PrismaClient();
}

function pushIfPresent(
  records: AuditRecord[],
  source: string,
  id: string,
  field: string,
  path: string | null | undefined,
): void {
  const result = auditImagePath(path);
  if (result.status === 'empty') return;

  records.push({
    source,
    id,
    field,
    path: path?.trim() ?? '',
    status: result.status,
    resolvedUrl: result.resolvedUrl,
    reason: result.reason,
  });
}

function collectGalleryPaths(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0);
}

async function main(): Promise<void> {
  const prisma = createPrisma();
  const records: AuditRecord[] = [];

  try {
    const menuItems = await prisma.cultureMenuItem.findMany({
      select: { id: true, title: true, slug: true, image: true, catalogContent: true },
    });

    for (const item of menuItems) {
      const source = `CultureMenuItem:${item.slug}`;
      pushIfPresent(records, source, item.id, 'image', item.image);

      const catalog = parseMenuCatalogContent(item.catalogContent);
      pushIfPresent(records, source, item.id, 'catalogContent.heroImage', catalog?.heroImage);
    }

    const cultureItems = await prisma.cultureItem.findMany({
      select: { id: true, slug: true, image: true, galleryImages: true },
    });

    for (const item of cultureItems) {
      const source = `CultureItem:${item.slug}`;
      pushIfPresent(records, source, item.id, 'image', item.image);
      for (const [index, galleryPath] of item.galleryImages.entries()) {
        pushIfPresent(records, source, item.id, `galleryImages[${index}]`, galleryPath);
      }
    }

    const homeContent = await prisma.homeContent.findMany({
      select: { id: true, heroImage: true, heroMobileImage: true },
    });

    for (const row of homeContent) {
      pushIfPresent(records, 'HomeContent', row.id, 'heroImage', row.heroImage);
      pushIfPresent(records, 'HomeContent', row.id, 'heroMobileImage', row.heroMobileImage);
    }

    const projects = await prisma.project.findMany({
      select: { id: true, slug: true, image: true },
    });

    for (const project of projects) {
      pushIfPresent(records, `Project:${project.slug}`, project.id, 'image', project.image);
    }

    const pageContents = await prisma.pageContent.findMany({
      select: { id: true, slug: true, content: true },
    });

    for (const page of pageContents) {
      const content = page.content;
      if (!content || typeof content !== 'object' || Array.isArray(content)) continue;

      const images = collectGalleryPaths((content as Record<string, unknown>).images);
      for (const [index, imagePath] of images.entries()) {
        pushIfPresent(records, `PageContent:${page.slug}`, page.id, `content.images[${index}]`, imagePath);
      }

      const heroImage = (content as Record<string, unknown>).heroImage;
      if (typeof heroImage === 'string') {
        pushIfPresent(records, `PageContent:${page.slug}`, page.id, 'content.heroImage', heroImage);
      }
    }

    const broken = records.filter((record) => record.status === 'broken');
    const localOnlyUploads = records.filter(
      (record) => record.reason === 'local-upload-only',
    );

    console.log('Image path audit (read-only)\n');
    console.log(`Total image references: ${records.length}`);
    console.log(`Broken: ${broken.length}`);
    console.log(`External URLs: ${records.filter((record) => record.status === 'external').length}`);
    console.log(`Local-only uploads (not in R2 manifest): ${localOnlyUploads.length}\n`);

    if (broken.length > 0) {
      console.log('Broken references:');
      for (const record of broken) {
        console.log(
          `- [${record.source}] ${record.field}: ${record.path} (${record.reason ?? 'unknown'})`,
        );
      }
      console.log('');
    }

    if (localOnlyUploads.length > 0) {
      console.log('Local-only uploads (will 404 in production until migrated to R2):');
      for (const record of localOnlyUploads) {
        console.log(`- [${record.source}] ${record.field}: ${record.path}`);
      }
      console.log('');
    }

    if (broken.length === 0 && localOnlyUploads.length === 0) {
      console.log('No broken or local-only upload references detected.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

void main().catch((error: unknown) => {
  console.error('Audit failed:', error);
  process.exit(1);
});
