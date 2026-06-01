# Security Notes

## Next.js security upgrade

- **Previous version**: `next@14.2.18` (vulnerable to CVE-2025-29927 middleware authorization bypass).
- **Upgraded to**: `next@14.2.35` (latest patched 14.x line; fixes middleware bypass advisory).
- **Reason**: Middleware must not be the only authorization layer; upgrading removes the critical bypass while server-side guards remain mandatory.

## Admin route protection

- `middleware.ts` still protects `/admin` and `/api/admin` for UX redirects.
- **Authoritative enforcement** is server-side via `requireAdmin()` / `requireAdminPage()` in admin layouts, pages, server actions, and API routes.
- Even if middleware is bypassed (e.g. `x-middleware-subrequest`), unauthenticated requests fail at the handler/layout layer.

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
- Public uploads require a short-lived signed `uploadToken` from `GET /api/uploads` (rate limited).
- Admin uploads require an active admin session.
- Files stored under private/quarantine prefix; metadata in `UploadMetadata`.
- Magic-byte validation; extension allowlist; declared MIME not trusted.
- Documents remain `PENDING_SCAN` with **no public URL**.
- Images auto-approved after signature validation only (malware scan still TODO).

## Rate limiting

- Production: Upstash Redis when `RATE_LIMIT_ENABLED=true` and Redis env vars are set.
- Development: in-memory fallback (not suitable for multi-instance production).
- `TRUSTED_PROXY_HEADERS=false` by default — spoofed `x-forwarded-for` is ignored unless explicitly enabled behind a trusted proxy.

### Env vars

- `RATE_LIMIT_REDIS_URL`
- `RATE_LIMIT_REDIS_TOKEN`
- `RATE_LIMIT_ENABLED`
- `TRUSTED_PROXY_HEADERS`
- `UPLOAD_MAX_FILE_SIZE`
- `UPLOAD_ALLOWED_MIME_TYPES`

## Remaining TODOs

- Integrate antivirus/malware scanning provider for document uploads (`PENDING_SCAN` → `APPROVED` workflow).
- Wire upload tokens into public submission forms when file uploads are enabled in UI.
- MFA intentionally **not** implemented in this pass.

## Commands

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev      # local
pnpm prisma migrate deploy   # production
pnpm admin:create
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
