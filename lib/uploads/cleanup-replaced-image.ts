import { prisma } from '@/lib/db';
import { resolveAdminManagedStorageKey } from '@/lib/storage/key-policies';
import { getStorage } from '@/lib/storage';

export async function deleteReplacedManagedImage(
  previousUrl: string | null | undefined,
  nextUrl: string | null | undefined,
): Promise<void> {
  if (!previousUrl || previousUrl === nextUrl) return;

  const key = resolveAdminManagedStorageKey(previousUrl);
  if (!key) return;

  try {
    await getStorage().delete(key);
    await prisma.uploadMetadata.deleteMany({ where: { storageKey: key } });
  } catch (error) {
    console.error('[storage] failed to delete replaced managed image', key, error);
  }
}

export async function cleanupReplacedGalleryImages(
  previous: string[],
  next: string[],
): Promise<void> {
  const nextSet = new Set(next);
  for (const url of previous) {
    if (!nextSet.has(url)) {
      await deleteReplacedManagedImage(url, null);
    }
  }
}
