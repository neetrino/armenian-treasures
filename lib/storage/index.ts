import { LocalDriver } from './local';
import { R2Driver } from './r2';

export interface UploadInput {
  key: string;
  body: Buffer | Uint8Array;
  contentType: string;
}

export interface UploadResult {
  url: string;
  key: string;
}

export interface StorageDriver {
  upload(input: UploadInput): Promise<UploadResult>;
  delete(key: string): Promise<void>;
  publicUrl(key: string): string;
}

let cachedDriver: StorageDriver | undefined;

export function getStorage(): StorageDriver {
  if (cachedDriver) return cachedDriver;
  const driver = process.env.STORAGE_DRIVER ?? 'local';
  cachedDriver = driver === 'r2' ? new R2Driver() : new LocalDriver();
  return cachedDriver;
}

export { LocalDriver, R2Driver };
