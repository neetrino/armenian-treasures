# Security Notes

## Next.js security upgrade

- **Previous version**: `next@14.2.35` (patched 14.x line; middleware bypass advisory fixed in 14.2.35).
- **Upgraded to**: `next@16.2.6` (Next.js 16 stable; `proxy.ts` convention replaces deprecated `middleware.ts`).
- **Reason**: Stay on supported Next.js with async request APIs and current security patches. Proxy/middleware must not be the only authorization layer; server-side guards remain mandatory.

## Admin route protection

- `proxy.ts` (formerly `middleware.ts`) still protects `/admin` and `/api/admin` for UX redirects via NextAuth `authorized`.
- **Authoritative enforcement** is server-side via `requireAdmin()` / `requireAdminPage()` in admin layouts, pages, server actions, and API routes.
- Even if proxy/middleware is bypassed (e.g. `x-middleware-subrequest`), unauthenticated requests fail at the handler/layout layer.

### Regression checks

```bash
curl -i https://DOMAIN/admin
curl -i https://DOMAIN/admin -H "x-middleware-subrequest: middleware"
curl -i https://DOMAIN/api/admin/stats -H "x-middleware-subrequest: middleware"
```

Expected: unauthenticated requests redirect to login or return `401`.

## Admin auth model

- Admin users live in `AdminUser` (Prisma).
- Only `passwordHash` is stored (bcrypt, **12 rounds**).
- Admin passwords must be at least **8 characters** (CLI validation).
- No plain admin password in env (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, etc. removed).
- **Create first admin**: `pnpm admin:create`
- **Change password (CLI)**: `pnpm admin:change-password`

## Login protection

- Failed attempts tracked per admin user (`failedLoginCount`).
- Lockout after **5** failed attempts for **15 minutes**.
- UI always shows generic error: `Invalid email or password`.
- Login rate limit: email + IP (Redis/Upstash when enabled, in-memory fallback in dev).

## Audit log

Events in `AdminAuditLog`:

- `login_success`
- `login_failed`
- `lockout`
- `logout`
- `password_changed`

## Upload security

- Anonymous `POST /api/uploads` is rejected (`401`).
- Public uploads require a short-lived signed **one-time** `uploadToken` from `GET /api/uploads` (rate limited: 5 mints / 15 min / IP).
- Each token includes a nonce consumed on first successful `POST` (Redis when configured, in-memory in dev).
- Token TTL: **10 minutes**; max **1 upload per token**.
- Upload POST rate limit: **5 uploads / 10 min** per admin session or token session + IP.
- Admin uploads require an active admin session.
- Files stored under prefix-based paths; metadata in `UploadMetadata`.
- Magic-byte validation; extension allowlist; declared MIME not trusted.
- Documents remain `PENDING_SCAN` under `quarantine/incoming/` with **no public URL**.
- Images auto-approved after signature validation only (malware scan still TODO).
- Admin image uploads create `UploadMetadata` rows (`ownerType: admin`).
- R2 quarantine isolation requires bucket/CDN policy — see [`docs/R2_STORAGE.md`](docs/R2_STORAGE.md).

## Rate limiting

- Production **requires** distributed rate limiting via Upstash Redis (`RATE_LIMIT_ENABLED=true` plus `RATE_LIMIT_REDIS_URL` and `RATE_LIMIT_REDIS_TOKEN`).
- Development uses in-memory limiters when Redis is not configured (a one-time console warning is logged).
- If production starts without valid Redis configuration, the server **fail-fast** on startup (`instrumentation.ts`) or on the first rate-limited request — in-memory fallback is blocked.
- Partial config (`RATE_LIMIT_ENABLED=true` but missing URL/token) is treated as misconfiguration and also fail-fast in production.
- `RATE_LIMIT_ALLOW_IN_MEMORY=true` opts out of the production check for single-node staging only; do not use on multi-instance production.
- Login rate limit: email + IP (Redis/Upstash when enabled, in-memory fallback in dev).
- `TRUSTED_PROXY_HEADERS=false` by default — spoofed `x-forwarded-for` is ignored unless explicitly enabled behind a trusted proxy.

### Env vars

- `RATE_LIMIT_REDIS_URL`
- `RATE_LIMIT_REDIS_TOKEN`
- `RATE_LIMIT_ENABLED`
- `RATE_LIMIT_ALLOW_IN_MEMORY` (staging single-node only — see Rate limiting above)
- `TRUSTED_PROXY_HEADERS`
- `UPLOAD_MAX_FILE_SIZE`
- `UPLOAD_ALLOWED_MIME_TYPES`

## Remaining TODOs

- Integrate antivirus/malware scanning provider for document uploads (`PENDING_SCAN` → `APPROVED` workflow).
- Wire upload tokens into public submission forms when file uploads are enabled in UI.
- Wire transactional email (Resend/SES or approved provider) for public forms — provider not chosen yet.
- Integrate payment provider for `/donate` when approved (`DONATION_CHECKOUT_ENABLED` remains `false` until then).
- MFA intentionally **not** implemented in this pass.

## Commands

Production deploy order and smoke checklist: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate deploy   # production — required before first deploy and after schema changes
pnpm build:production        # migrate deploy + build (Vercel build command)
pnpm admin:create            # first admin user (interactive CLI)
pnpm lint
pnpm typecheck
pnpm test
pnpm build                   # CI / local verify without live DB
```
