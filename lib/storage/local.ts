import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import type { StorageDriver, UploadInput, UploadResult } from './index';

const UPLOAD_ROOT = resolve(process.cwd(), 'public', 'uploads');
const PRIVATE_ROOT = resolve(process.cwd(), 'storage', 'private');

export class LocalDriver implements StorageDriver {
  async upload(input: UploadInput): Promise<UploadResult> {
    const safeKey = sanitizeKey(input.key);
    const isPrivate = input.visibility === 'private';
    const root = isPrivate ? PRIVATE_ROOT : UPLOAD_ROOT;
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
    for (const root of [UPLOAD_ROOT, PRIVATE_ROOT]) {
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
    return `/uploads/${sanitizeKey(key)}`;
  }
}

function sanitizeKey(key: string): string {
  return key.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\.\./g, '');
}
