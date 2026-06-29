# Deployment runbook

Production deployment for Armenian Treasures (Vercel + Neon Postgres + Cloudflare R2 + Upstash Redis).

**Pull-request CI does not run migrations** — it uses placeholder database URLs so builds stay hermetic. Migrations must run against a real Neon database as part of your deploy pipeline (see [Database migrations](#database-migrations)). CI runs `tests/smoke.test.ts` for static route checks without a live database.

See also [CULTURE_ROUTING.md](./CULTURE_ROUTING.md) for culture URL structure.

---

## Quick reference — production deploy order

Run these steps in order for every **first** production deploy and after any schema migration:

| Step | Command / action | Notes |
| --- | --- | --- |
| 1 | `pnpm install --frozen-lockfile` | Lockfile must match CI |
| 2 | `pnpm prisma generate` | Also runs via `postinstall` |
| 3 | `pnpm prisma migrate deploy` | **Required** — applies pending SQL migrations to Neon |
| 4 | `pnpm build` or `pnpm build:production` | Vercel production should use `build:production` (step 3 + 4 combined) |
| 5 | Deploy / start the app | Vercel auto-deploy, or `pnpm start` on your host |
| 6 | `pnpm admin:create` | **First deploy only** — create the first admin user (interactive CLI) |
| 7 | [Production smoke checklist](#production-smoke-checklist) | Verify critical paths |

Subsequent deploys without schema changes: steps 1 → 4 → 5 → 7 (skip step 6).

---

## Platform assumptions

| Service | Role |
| --- | --- |
| **Vercel** | Next.js hosting; preview deployments per branch |
| **Neon** | Postgres; pooled `DATABASE_URL` for runtime, direct `DIRECT_URL` for migrations |
| **Cloudflare R2** | Private uploads + optional public asset CDN (`STORAGE_DRIVER=r2`) |
| **Upstash Redis** | Distributed rate limiting (required in production) |

### Neon + Vercel integration

- Connect Neon to Vercel so preview deployments receive branch-specific `DATABASE_URL` / `DIRECT_URL`.
- **Production** must use a stable Neon branch (typically `main`), not ephemeral preview branches.
- `DIRECT_URL` must be the **non-pooled** connection string — Prisma migrations require it.

### Vercel build command

Set the Vercel project **Build Command** to:

```bash
pnpm build:production
```

This runs `prisma generate`, `prisma migrate deploy`, and `next build` in one step. Vercel must have real `DATABASE_URL` and `DIRECT_URL` env vars before the build runs.

Do **not** change the default `pnpm build` script — GitHub Actions CI relies on it with placeholder DB URLs and query fallbacks.

---

## Database migrations

### Why `migrate deploy` is mandatory

The app expects tables defined in `prisma/migrations/`. A fresh Neon database without `pnpm prisma migrate deploy` will cause runtime query failures (missing tables/columns) even when the Next.js build succeeds.

`pnpm build` alone only runs `prisma generate` — it does **not** apply migrations.

### Local / staging verification

```powershell
# With real Neon URLs in .env.local:
pnpm prisma migrate deploy
pnpm prisma migrate status   # should report "Database schema is up to date"
```

### Automated migration workflow (optional)

GitHub Actions workflow [`.github/workflows/deploy-migrate.yml`](../.github/workflows/deploy-migrate.yml) applies migrations to production Neon:

- **Manual:** Actions → *Deploy database migrations* → *Run workflow*
- **Automatic:** Push to `main` / `master` that changes `prisma/schema.prisma` or `prisma/migrations/**` (requires [GitHub secrets](#github-secrets-for-deploy-migrate))

Configure a `production` GitHub Environment with required secrets before enabling automatic runs.

### First deploy — seed (optional)

Production content is usually managed via the admin CMS. For a demo/staging environment you may seed once:

```powershell
pnpm db:seed
```

**Do not** run seed against production unless you intend to overwrite CMS data — the seed is idempotent but replaces singleton rows.

---

## Required environment variables

Copy from [`.env.example`](../.env.example). Set all marked **required** in the Vercel **Production** environment (and Preview as needed).

### Database (required)

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Neon **pooled** connection string (`-pooler` hostname) |
| `DIRECT_URL` | Neon **direct** connection string (migrations) |

### Auth (required)

| Variable | Description |
| --- | --- |
| `AUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `NEXTAUTH_SECRET` | Same value as `AUTH_SECRET` |
| `AUTH_URL` | Public HTTPS origin, e.g. `https://armeniantreasures.org` |
| `NEXTAUTH_URL` | Same as `AUTH_URL` |
| `SITE_URL` | Same as `AUTH_URL` — canonical origin for metadata/sitemap |

**Production rule:** `SITE_URL`, `AUTH_URL`, and `NEXTAUTH_URL` must match (no trailing slash).

### Storage (required in production)

| Variable | Description |
| --- | --- |
| `STORAGE_DRIVER` | `r2` |
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | R2 API token access key |
| `R2_SECRET_ACCESS_KEY` | R2 API token secret |
| `R2_BUCKET` | Bucket name |
| `R2_PUBLIC_URL` | Public base URL for approved assets |

Optional after migrating static assets: `USE_R2_PUBLIC_ASSETS`, `NEXT_PUBLIC_USE_R2_PUBLIC_ASSETS`, `NEXT_PUBLIC_R2_PUBLIC_URL`.

### Rate limiting (required in production)

| Variable | Description |
| --- | --- |
| `RATE_LIMIT_ENABLED` | `true` |
| `RATE_LIMIT_REDIS_URL` | Upstash Redis REST URL |
| `RATE_LIMIT_REDIS_TOKEN` | Upstash Redis REST token |

Do **not** set `RATE_LIMIT_ALLOW_IN_MEMORY=true` on multi-instance production. The app fail-fast on startup if Redis is misconfigured — see [`instrumentation.ts`](../instrumentation.ts).

| Variable | Description |
| --- | --- |
| `TRUSTED_PROXY_HEADERS` | Set `true` only behind a trusted reverse proxy (Vercel: usually `false`) |

### Upload limits (recommended)

| Variable | Default purpose |
| --- | --- |
| `UPLOAD_MAX_FILE_SIZE` | Max bytes (default 10 MB) |
| `UPLOAD_ALLOWED_MIME_TYPES` | Comma-separated allowlist |

### Admin users

Admin credentials are **not** env vars. Create via CLI after first successful migration:

```powershell
pnpm admin:create
```

---

## Pre-deploy verification checklist

Complete before pointing DNS at production:

### Neon

- [ ] Production branch exists and is not a throwaway preview branch
- [ ] `DATABASE_URL` (pooled) and `DIRECT_URL` (direct) are set in Vercel
- [ ] `pnpm prisma migrate deploy` succeeds against production URLs
- [ ] `pnpm prisma migrate status` reports schema up to date

### Upstash

- [ ] Redis database created in same region as Vercel when possible
- [ ] `RATE_LIMIT_ENABLED=true`
- [ ] `RATE_LIMIT_REDIS_URL` and `RATE_LIMIT_REDIS_TOKEN` set
- [ ] App starts without rate-limit fail-fast error (check Vercel function logs)

### Cloudflare R2

- [ ] Bucket created; CORS configured if serving public assets
- [ ] `STORAGE_DRIVER=r2` and all `R2_*` vars set
- [ ] **Quarantine prefix blocked at CDN/bucket layer** — see [`docs/R2_STORAGE.md`](R2_STORAGE.md)
- [ ] Test admin image upload after deploy (see smoke checklist)
- [ ] Optional: run `pnpm r2:migrate-public` once to mirror `/public` assets

### Auth & origin

- [ ] `AUTH_SECRET` / `NEXTAUTH_SECRET` set (never commit)
- [ ] `SITE_URL`, `AUTH_URL`, `NEXTAUTH_URL` all match production HTTPS origin
- [ ] First admin created with `pnpm admin:create`

---

## Production smoke checklist

Run after every production deploy (or promote). Replace `DOMAIN` with your production origin.

| # | Check | How to verify | Expected |
| --- | --- | --- | --- |
| 1 | Home opens | Visit `https://DOMAIN/` | 200; hero and navigation render |
| 2 | Admin login | Visit `https://DOMAIN/admin/login`; sign in | Redirect to `/admin/dashboard` |
| 3 | Public form saves | Submit contact form at `/contacts` (wait ≥2 s before submit) | Success message; row in `/admin/contact-messages` |
| 4 | Culture page opens | Visit `https://DOMAIN/culture` and one category URL | 200; menu items load from DB |
| 5 | Image upload works | Admin → upload image on a culture item or page content | Upload succeeds; image displays |
| 6 | Rate limit works | Rapid repeated admin login failures or form spam from one IP | Generic error / rate-limit message (not 500) |
| 7 | Sitemap opens | Visit `https://DOMAIN/sitemap.xml` | Valid XML; URLs use production origin |

### Optional security regression (admin)

```bash
curl -i https://DOMAIN/admin
curl -i https://DOMAIN/api/admin/stats
```

Unauthenticated requests should redirect to login or return `401` — see [`SECURITY_NOTES.md`](../SECURITY_NOTES.md).

---

## GitHub Actions overview

| Workflow | Trigger | Database | Purpose |
| --- | --- | --- | --- |
| [`ci.yml`](../.github/workflows/ci.yml) | PR + push to main | Placeholder (no real DB) | Lint, test, typecheck, build |
| [`deploy-migrate.yml`](../.github/workflows/deploy-migrate.yml) | Manual + schema push to main | **Production Neon** (secrets) | `prisma migrate deploy` only |

CI intentionally skips `prisma migrate deploy` so forks and PRs never need production credentials.

### GitHub secrets for deploy-migrate

Configure in **Settings → Secrets and variables → Actions** (or in a `production` Environment):

| Secret | Value |
| --- | --- |
| `DATABASE_URL` | Production Neon pooled URL |
| `DIRECT_URL` | Production Neon direct URL |

---

## Public site origin

The app resolves the canonical public origin via `getSiteUrl()` in `lib/site-url.ts`:

1. `SITE_URL`
2. `AUTH_URL`
3. `NEXTAUTH_URL`
4. `http://localhost:3000` (local fallback)

Example production values:

```env
SITE_URL="https://armeniantreasures.org"
AUTH_URL="https://armeniantreasures.org"
NEXTAUTH_URL="https://armeniantreasures.org"
```

---

## Local verification (mirrors CI)

```powershell
$env:DATABASE_URL='postgresql://ci:ci@127.0.0.1:5432/ci?sslmode=disable'
$env:DIRECT_URL='postgresql://ci:ci@127.0.0.1:5432/ci?sslmode=disable'
$env:AUTH_SECRET='ci-test-auth-secret-for-github-actions-only'
$env:NEXTAUTH_SECRET='ci-test-auth-secret-for-github-actions-only'
$env:AUTH_URL='http://localhost:3000'
$env:NEXTAUTH_URL='http://localhost:3000'
$env:SITE_URL='http://localhost:3000'
$env:STORAGE_DRIVER='local'
$env:RATE_LIMIT_ENABLED='false'
pnpm install --frozen-lockfile
pnpm prisma generate
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

To verify migrations against a real Neon branch locally:

```powershell
pnpm prisma migrate deploy
pnpm prisma migrate status
pnpm build:production   # only when DATABASE_URL/DIRECT_URL point at that branch
```

---

## Remaining deployment risks

- **Build without migrate:** Using `pnpm build` on Vercel without `build:production` or a separate migrate step leaves schema stale.
- **Preview vs production DB:** Vercel preview deployments with Neon branch-per-PR need their own migrate deploy; do not point previews at production Neon.
- **Seed on production:** `pnpm db:seed` overwrites CMS singletons — use only for staging.
- **No email provider:** Public forms persist to DB only; no outbound notification until Resend/SES is wired.
- **Document malware scan:** Upload images auto-approve; documents stay `PENDING_SCAN` — see [`SECURITY_NOTES.md`](../SECURITY_NOTES.md).
