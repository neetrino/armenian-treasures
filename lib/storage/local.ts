import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { isPrivateStorageKey, normalizeStorageKey } from './key-policies';
import type { StorageDriver, UploadInput, UploadResult } from './index';

function getUploadRoot(): string {
  return join(/*turbopackIgnore: true*/ process.cwd(), 'public', 'uploads');
}

function getPrivateRoot(): string {
  return join(/*turbopackIgnore: true*/ process.cwd(), 'storage', 'private');
}

export class LocalDriver implements StorageDriver {
  async upload(input: UploadInput): Promise<UploadResult> {
    const safeKey = sanitizeKey(input.key);
    const isPrivate = input.visibility === 'private';
    const root = isPrivate ? getPrivateRoot() : getUploadRoot();
    const absolute = join(root, safeKey);
    await mkdir(dirname(absolute), { recursive: true });
    await writeFile(absolute, input.body);
    return {
      key: safeKey,
      url: isPrivate ? null : this.publicUrl(safeKey),
    };
  }

  async delete(key: string): Promise<void> {
    const safeKey = sanitizeKey(key);
    for (const root of [getUploadRoot(), getPrivateRoot()]) {
      const absolute = join(root, safeKey);
      try {
        await unlink(absolute);
        return;
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (code !== 'ENOENT') throw error;
      }
    }
  }

  publicUrl(key: string): string {
    const normalized = normalizeStorageKey(key);
    if (isPrivateStorageKey(normalized)) {
      throw new Error('Private storage keys must not be exposed as public URLs.');
    }
    return `/uploads/${normalized}`;
  }
}

function sanitizeKey(key: string): string {
  return key.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\.\./g, '');
}
