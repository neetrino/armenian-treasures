import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import type { StorageDriver, UploadInput, UploadResult } from './index';

const UPLOAD_ROOT = resolve(process.cwd(), 'public', 'uploads');

export class LocalDriver implements StorageDriver {
  async upload(input: UploadInput): Promise<UploadResult> {
    const safeKey = sanitizeKey(input.key);
    const absolute = join(UPLOAD_ROOT, safeKey);
    await mkdir(dirname(absolute), { recursive: true });
    await writeFile(absolute, input.body);
    return { key: safeKey, url: this.publicUrl(safeKey) };
  }

  async delete(key: string): Promise<void> {
    const safeKey = sanitizeKey(key);
    const absolute = join(UPLOAD_ROOT, safeKey);
    try {
      await unlink(absolute);
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code !== 'ENOENT') throw error;
    }
  }

  publicUrl(key: string): string {
    return `/uploads/${sanitizeKey(key)}`;
  }
}

function sanitizeKey(key: string): string {
  return key.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\.\./g, '');
}
