# Armenian Treasures

> The living archive of Armenian heritage.

A premium digital archive of Armenian monuments, museums, manuscripts, people and folk arts — built with Next.js 16 (App Router, RSC), Prisma on Neon Postgres, an admin CMS, and review-only public submission flows.

## Tech stack

- **Frontend**: Next.js 16 (App Router, RSC), React 19, TypeScript strict, Tailwind CSS, Framer Motion, lucide-react, React Hook Form + Zod.
- **Backend**: Next.js Route Handlers + Server Actions, Prisma ORM with the Neon serverless driver adapter.
- **Database**: Neon Postgres (pooled URL for app runtime, direct URL for migrations).
- **Auth**: NextAuth v5 (Auth.js) Credentials Provider with JWT sessions; admin users in the `AdminUser` table (created via CLI).
- **Storage**: Local disk in dev (`public/uploads/`), Cloudflare R2 in production (`STORAGE_DRIVER=r2`).

## Development setup

### 1. Prerequisites

- Node.js **>= 18.18** (tested on Node 22).
- pnpm **>= 9** (`npm install -g pnpm`).
- A Neon project (sign up at [neon.tech](https://neon.tech)) — each developer should create their own branch from `main`.

### 2. Clone and install

```powershell
pnpm install
```

The `postinstall` hook runs `prisma generate` automatically.

### 3. Configure environment

Copy `.env.example` to `.env.local` and fill in your Neon connection strings:

```powershell
Copy-Item .env.example .env.local
```

- `DATABASE_URL`: the **pooled** Neon string. It ends with `-pooler` in the hostname and includes `?sslmode=require`. Used by the app at runtime.
- `DIRECT_URL`: the **direct** (non-pooled) Neon string. Used by Prisma migrations and introspection.
- `NEXTAUTH_SECRET` / `AUTH_SECRET`: generate with `openssl rand -base64 32`.
- `STORAGE_DRIVER`: leave as `local` for development.
- Create an admin user after migration: `pnpm admin:create` (see [`SECURITY_NOTES.md`](SECURITY_NOTES.md)).

### 4. Database

```powershell
pnpm prisma migrate dev --name init
pnpm db:seed
```

This applies the schema to your Neon branch and seeds the entire content tree (culture menu, items, projects, team, careers, donators, site settings, home content).

### 5. Run the app

```powershell
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

### 6. Production build (local verification)

Stop the dev server before building — on Windows, a running `pnpm dev` process locks Prisma's query engine DLL and `prisma generate` fails with `EPERM`:

```powershell
# Stop dev server (Ctrl+C in its terminal), then:
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

If port 3000 is still in use: `netstat -ano | findstr ":3000"` then stop the listed PID. CI and Vercel builds are unaffected (no concurrent dev server).

## Project structure

```
app/                          # Next.js App Router
  (public)/                   # Public site (shared Header + Footer)
  (admin)/admin/              # Admin panel (AdminLayout)
  api/                        # Public route handlers
  api/admin/                  # Protected admin route handlers
components/                   # UI building blocks
  layout/  navigation/  ui/  sections/  cards/  forms/  map/  admin/  motion/  brand/
lib/
  db.ts                       # Prisma + Neon adapter singleton
  auth/                       # NextAuth config, requireAdmin helper
  storage/                    # Local + R2 storage drivers
  validation/                 # Zod schemas (public + admin)
  culture-menu.ts             # resolveMenuHref()
  rate-limit/                 # Upstash + in-memory rate limiting
  utils.ts                    # cn() + small helpers
proxy.ts                      # Next.js 16 route protection for /admin (see SECURITY_NOTES.md)
instrumentation.ts            # Production startup checks (rate limiting readiness)
prisma/
  schema.prisma               # Database schema
  seed.ts                     # Idempotent seed script
public/                       # Static assets
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run Next.js in development mode |
| `pnpm build` | Production build (runs `prisma generate` first) |
| `pnpm start` | Run the production server |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript noEmit |
| `pnpm prisma:migrate` | Run migrations against your Neon branch |
| `pnpm prisma:studio` | Open Prisma Studio |
| `pnpm test` | Run Vitest security/unit tests |
| `pnpm admin:create` | Create a DB-backed admin user (interactive CLI) |
| `pnpm admin:change-password` | Change an admin password (interactive CLI) |
| `pnpm r2:migrate-public` | Copy `/public` assets to R2 (production migration helper) |
| `pnpm images:webp` | Convert PNG/JPG under `public/` to WebP and remove originals |
| `pnpm images:webp:keep-sources` | Convert PNG/JPG to WebP alongside originals (non-destructive) |

## Deployment notes

- Use Vercel's Neon integration to create a Neon branch per preview deployment automatically.
- Set `STORAGE_DRIVER=r2` and provide R2 credentials in production environment variables.
- Set `AUTH_SECRET` and `AUTH_URL` (matching your deployed URL).
- Create admin users with `pnpm admin:create` (do not use env admin passwords).
- Enable Upstash rate limiting in production (`RATE_LIMIT_ENABLED=true`, plus `RATE_LIMIT_REDIS_URL` and `RATE_LIMIT_REDIS_TOKEN`). The app **fail-fast** at startup if these are missing in production runtime — see `SECURITY_NOTES.md`.
- Do not set `RATE_LIMIT_ALLOW_IN_MEMORY=true` on multi-instance production (staging single-node only).
- Run `pnpm prisma migrate deploy` in CI before the deploy step (or in the deploy pipeline after CI passes).

## Continuous integration

GitHub Actions workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on pushes and pull requests to `main` / `master`:

1. `pnpm install --frozen-lockfile`
2. `pnpm prisma generate`
3. `pnpm typecheck`
4. `pnpm lint`
5. `pnpm test`
6. `pnpm build`

CI uses **placeholder env vars** only (no production secrets). Tests mock Prisma; the build succeeds without a live database via query fallbacks. Deploy pipelines must still provide real `DATABASE_URL`, auth secrets, R2, and Upstash — see [`SECURITY_NOTES.md`](SECURITY_NOTES.md).

To reproduce locally:

```powershell
$env:DATABASE_URL='postgresql://ci:ci@127.0.0.1:5432/ci?sslmode=disable'
$env:DIRECT_URL='postgresql://ci:ci@127.0.0.1:5432/ci?sslmode=disable'
$env:AUTH_SECRET='ci-test-auth-secret-for-github-actions-only'
$env:NEXTAUTH_SECRET='ci-test-auth-secret-for-github-actions-only'
$env:AUTH_URL='http://localhost:3000'
$env:NEXTAUTH_URL='http://localhost:3000'
$env:STORAGE_DRIVER='local'
$env:RATE_LIMIT_ENABLED='false'
pnpm typecheck; pnpm lint; pnpm test; pnpm build
```

## Editorial policy

- Public forms **never** publish anything. They create `Submission` rows that admins review manually.
- The Culture Portal menu is stored in the database; admins edit it via `/admin/culture-menu`.
- Layouts are fixed in code. There is no page builder.

See [`DECISIONS.md`](DECISIONS.md) for choices made under ambiguity during the initial build.
