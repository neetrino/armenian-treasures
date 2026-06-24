export interface UploadInput {
  key: string;
  body: Buffer | Uint8Array;
  contentType: string;
  visibility?: 'public' | 'private';
}

export interface UploadResult {
  url: string | null;
  key: string;
}

export interface StorageDriver {
  upload(input: UploadInput): Promise<UploadResult>;
  delete(key: string): Promise<void>;
  publicUrl(key: string): string;
}

let cachedDriver: StorageDriver | undefined;

function loadDriver(): StorageDriver {
  const driver = process.env.STORAGE_DRIVER ?? 'local';
  if (driver === 'r2') {
    // Lazy require keeps local filesystem paths out of the static import graph.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { R2Driver } = require('./r2') as typeof import('./r2');
    return new R2Driver();
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { LocalDriver } = require('./local') as typeof import('./local');
  return new LocalDriver();
}

export function getStorage(): StorageDriver {
  if (!cachedDriver) {
    cachedDriver = loadDriver();
  }
  return cachedDriver;
}
