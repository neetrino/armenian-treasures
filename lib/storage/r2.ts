import type { StorageDriver, UploadInput, UploadResult } from './index';
import { isPrivateStorageKey, normalizeStorageKey } from './key-policies';

/**
 * Cloudflare R2 driver (S3-compatible).
 *
 * NOTE: This driver lazily imports `@aws-sdk/client-s3` and only when
 * `STORAGE_DRIVER=r2` is set. Add it with `pnpm add @aws-sdk/client-s3`
 * before deploying to production or running the R2 migration script.
 */
type LazyS3 = {
  S3Client: new (config: unknown) => { send: (cmd: unknown) => Promise<unknown> };
  PutObjectCommand: new (input: unknown) => unknown;
  DeleteObjectCommand: new (input: unknown) => unknown;
};

export interface R2EnvConfig {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicBaseUrl: string;
  endpoint: string;
}

export interface R2BufferUploadInput {
  key: string;
  buffer: Buffer;
  contentType: string;
}

export interface R2BufferUploadResult {
  key: string;
  url: string;
}

type R2EnvKey =
  | 'R2_ACCOUNT_ID'
  | 'R2_ACCESS_KEY_ID'
  | 'R2_SECRET_ACCESS_KEY'
  | 'R2_BUCKET'
  | 'R2_PUBLIC_URL';

export function getR2EnvPresence(): Record<R2EnvKey, boolean> {
  return {
    R2_ACCOUNT_ID: Boolean(process.env.R2_ACCOUNT_ID),
    R2_ACCESS_KEY_ID: Boolean(process.env.R2_ACCESS_KEY_ID),
    R2_SECRET_ACCESS_KEY: Boolean(process.env.R2_SECRET_ACCESS_KEY),
    R2_BUCKET: Boolean(process.env.R2_BUCKET),
    R2_PUBLIC_URL: Boolean(process.env.R2_PUBLIC_URL),
  };
}

export function getR2EnvConfig(): R2EnvConfig {
  const accountId = required('R2_ACCOUNT_ID');
  const endpoint =
    process.env.R2_ENDPOINT?.trim() ||
    `https://${accountId}.r2.cloudflarestorage.com`;

  return {
    accountId,
    accessKeyId: required('R2_ACCESS_KEY_ID'),
    secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
    bucket: required('R2_BUCKET'),
    publicBaseUrl: required('R2_PUBLIC_URL').replace(/\/$/, ''),
    endpoint,
  };
}

async function loadS3(): Promise<LazyS3> {
  const moduleName = '@aws-sdk/client-s3';
  const dynamicImport: (name: string) => Promise<unknown> = new Function(
    'name',
    'return import(name)',
  ) as (name: string) => Promise<unknown>;
  const mod = (await dynamicImport(moduleName)) as LazyS3;
  return mod;
}

function createS3Client(
  sdk: LazyS3,
  config: R2EnvConfig,
): InstanceType<LazyS3['S3Client']> {
  return new sdk.S3Client({
    region: 'auto',
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

export async function uploadBufferToR2(
  input: R2BufferUploadInput,
): Promise<R2BufferUploadResult> {
  const config = getR2EnvConfig();
  const sdk = await loadS3();
  const client = createS3Client(sdk, config);
  const key = normalizeObjectKey(input.key);

  await client.send(
    new sdk.PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: input.buffer,
      ContentType: input.contentType,
    }),
  );

  return {
    key,
    url: `${config.publicBaseUrl}/${key}`,
  };
}

export class R2Driver implements StorageDriver {
  private readonly config: R2EnvConfig;

  constructor() {
    this.config = getR2EnvConfig();
  }

  async upload(input: UploadInput): Promise<UploadResult> {
    const result = await uploadBufferToR2({
      key: input.key,
      buffer: Buffer.isBuffer(input.body) ? input.body : Buffer.from(input.body),
      contentType: input.contentType,
    });
    const isPrivate = input.visibility === 'private';
    return {
      key: result.key,
      url: isPrivate ? null : result.url,
    };
  }

  async delete(key: string): Promise<void> {
    const sdk = await loadS3();
    const client = createS3Client(sdk, this.config);
    await client.send(
      new sdk.DeleteObjectCommand({
        Bucket: this.config.bucket,
        Key: normalizeObjectKey(key),
      }),
    );
  }

  publicUrl(key: string): string {
    const normalized = normalizeStorageKey(key);
    if (isPrivateStorageKey(normalized)) {
      throw new Error('Private storage keys must not be exposed as public URLs.');
    }
    return `${this.config.publicBaseUrl}/${normalized}`;
  }
}

function normalizeObjectKey(key: string): string {
  return key.replace(/\\/g, '/').replace(/^\/+/, '');
}

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}
