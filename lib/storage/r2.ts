import type { StorageDriver, UploadInput, UploadResult } from './index';

/**
 * Cloudflare R2 driver (S3-compatible).
 *
 * NOTE: This driver lazily imports `@aws-sdk/client-s3` and only when
 * `STORAGE_DRIVER=r2` is set. The dependency is intentionally kept out of
 * `package.json` for dev. Add it with `pnpm add @aws-sdk/client-s3` before
 * deploying to production.
 */
type LazyS3 = {
  S3Client: new (config: unknown) => { send: (cmd: unknown) => Promise<unknown> };
  PutObjectCommand: new (input: unknown) => unknown;
  DeleteObjectCommand: new (input: unknown) => unknown;
};

async function loadS3(): Promise<LazyS3> {
  const moduleName = '@aws-sdk/client-s3';
  const dynamicImport: (name: string) => Promise<unknown> = new Function(
    'name',
    'return import(name)',
  ) as (name: string) => Promise<unknown>;
  const mod = (await dynamicImport(moduleName)) as LazyS3;
  return mod;
}

export class R2Driver implements StorageDriver {
  private readonly accountId: string;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly bucket: string;
  private readonly publicBaseUrl: string;

  constructor() {
    this.accountId = required('R2_ACCOUNT_ID');
    this.accessKeyId = required('R2_ACCESS_KEY_ID');
    this.secretAccessKey = required('R2_SECRET_ACCESS_KEY');
    this.bucket = required('R2_BUCKET');
    this.publicBaseUrl = required('R2_PUBLIC_URL').replace(/\/$/, '');
  }

  async upload(input: UploadInput): Promise<UploadResult> {
    const sdk = await loadS3();
    const client = this.client(sdk);
    await client.send(
      new sdk.PutObjectCommand({
        Bucket: this.bucket,
        Key: input.key,
        Body: input.body,
        ContentType: input.contentType,
      }),
    );
    return { key: input.key, url: this.publicUrl(input.key) };
  }

  async delete(key: string): Promise<void> {
    const sdk = await loadS3();
    const client = this.client(sdk);
    await client.send(new sdk.DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }

  publicUrl(key: string): string {
    return `${this.publicBaseUrl}/${key}`;
  }

  private client(sdk: LazyS3): InstanceType<LazyS3['S3Client']> {
    return new sdk.S3Client({
      region: 'auto',
      endpoint: `https://${this.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }
}

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}
