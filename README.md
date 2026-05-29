# Armenian Treasures

> The living archive of Armenian heritage.

A premium digital archive of Armenian monuments, museums, manuscripts, people and folk arts — built as a Next.js 14 monorepo with Prisma on Neon Postgres, an admin CMS, and review-only public submission flows.

## Tech stack

- **Frontend**: Next.js 14 (App Router, RSC), TypeScript strict, Tailwind CSS, Framer Motion, lucide-react, React Hook Form + Zod.
- **Backend**: Next.js Route Handlers + Server Actions, Prisma ORM with the Neon serverless driver adapter.
- **Database**: Neon Postgres (pooled URL for app runtime, direct URL for migrations).
- **Auth**: NextAuth v5 (Auth.js) Credentials Provider with JWT sessions.
- **Storage**: Local disk in dev (`public/uploads/`), Cloudflare R2 in production.

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
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`: admin panel login (server-side only; not stored in the database).
- `STORAGE_DRIVER`: leave as `local` for development.

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
  rate-limit.ts               # in-memory token bucket
  utils.ts                    # cn() + small helpers
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
| `pnpm db:seed` | Apply seed data |

## Deployment notes

- Use Vercel's Neon integration to create a Neon branch per preview deployment automatically.
- Set `STORAGE_DRIVER=r2` and provide R2 credentials in production environment variables.
- Set `AUTH_SECRET` and `AUTH_URL` (matching your deployed URL).
- Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` for admin login (redeploy after changing).
- Run `pnpm prisma migrate deploy` in CI before the deploy step.

## Editorial policy

- Public forms **never** publish anything. They create `Submission` rows that admins review manually.
- The Culture Portal menu is stored in the database; admins edit it via `/admin/culture-menu`.
- Layouts are fixed in code. There is no page builder.

See [`DECISIONS.md`](DECISIONS.md) for choices made under ambiguity during the initial build.
