# Cloudflare R2 storage layout

This app uses a single R2 bucket (or local `public/uploads` + `storage/private` in dev) with **prefix-based isolation**. Application code never exposes public URLs for quarantined objects, but **bucket-level policy is still required** so a guessed object key cannot bypass the app.

---

## Object key prefixes

| Prefix | Visibility | Purpose |
| --- | --- | --- |
| `images/hero/` | **Public** | Admin hero images (approved after magic-byte check) |
| `images/culture/` | **Public** | Admin culture catalog / item images |
| `submissions/incoming/` | **Public** (images only) | Token/API image uploads auto-approved after signature validation |
| `quarantine/incoming/` | **Private** | Document uploads pending AV scan — **no public URL returned** |

Private uploads use `visibility: 'private'` in the storage driver. The API response omits `url` for quarantined files.

---

## Required R2 bucket policy (quarantine)

Configure **one** of these approaches before enabling public submission uploads:

### Option A — Separate public custom domain (recommended)

1. Create the main bucket with **no public access**.
2. Attach a **custom domain** (e.g. `cdn.example.com`) that only serves approved prefixes:
   - Allow: `images/*`, optionally migrated static assets
   - **Deny / do not route**: `quarantine/*`
3. Set `R2_PUBLIC_URL=https://cdn.example.com` — the app builds public URLs only for approved keys.

Use Cloudflare **Transform Rules** or a **Worker** in front of the public domain to return `404` for paths starting with `quarantine/`.

### Option B — Single bucket + IAM-style restrictions

1. Use an R2 API token scoped to `PutObject` / `DeleteObject` for the app.
2. Do **not** enable R2.dev public access on the whole bucket.
3. Expose only a **public bucket** or **prefix allowlist** via Cloudflare CDN rules.

Example Worker guard (pseudo):

```javascript
if (url.pathname.startsWith('/quarantine/')) {
  return new Response('Not found', { status: 404 });
}
```

### Option C — Separate buckets

| Bucket | Access |
| --- | --- |
| `armenian-treasures-public` | Custom domain; `images/*`, static assets |
| `armenian-treasures-quarantine` | No public domain; app credentials only |

Requires a future driver extension to use two buckets — **not implemented yet**. Options A/B work with the current single-bucket driver.

---

## Application guarantees (without AV)

- Documents stored under `quarantine/incoming/` with `UploadMetadata.status = PENDING_SCAN`.
- `storeValidatedUpload` and the upload API **never** return a public URL for quarantine keys.
- `R2Driver.publicUrl()` throws if called with a `quarantine/` key.
- Magic-byte validation is mandatory; declared MIME types are not trusted.

---

## Orphan object cleanup

Admin image uploads under `images/hero/` and `images/culture/` follow the naming pattern:

```text
images/{hero|culture}/{hero|culture}-{12-hex-chars}(-desktop|-mobile)?.{jpg|png|webp}
```

When an admin **replaces** a hero or culture item image on save, the previous managed object is deleted from storage and its `UploadMetadata` row is removed. Static assets under `/images/` in the repo (e.g. `home-hero.webp`) are **not** matched and are never deleted.

Quarantine and submission prefixes are **not** auto-deleted on replace — schedule manual or scripted cleanup after AV approval workflow exists.

---

## Environment variables

| Variable | Role |
| --- | --- |
| `STORAGE_DRIVER` | `local` (dev) or `r2` (production) |
| `R2_BUCKET` | Bucket name |
| `R2_PUBLIC_URL` | Base URL for **approved** public objects only |
| `UPLOAD_MAX_FILE_SIZE` | Max bytes (images default 5 MB, docs 10 MB) |
| `UPLOAD_ALLOWED_MIME_TYPES` | Optional comma-separated allowlist |

See also [`docs/DEPLOYMENT.md`](DEPLOYMENT.md) and [`SECURITY_NOTES.md`](../SECURITY_NOTES.md).
