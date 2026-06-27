# Decisions log

This document records the architectural and editorial choices made during the initial build of Armenian Treasures where the brief offered alternatives or did not specify an option explicitly.

## Auth

- **Initial choice**: NextAuth v5 (Auth.js) Credentials Provider with `jwt` session strategy.
- **Current model** (since admin security hardening): Admin users live in the `AdminUser` Prisma table. Passwords are bcrypt hashes only — **not** env vars. Create users with `pnpm admin:create`; change passwords with `pnpm admin:change-password`.
- **Route protection**: `proxy.ts` (Next.js 16) redirects unauthenticated `/admin` requests; authoritative enforcement is server-side via `requireAdmin()` / `requireAdminPage()`.
- **Rationale**: JWT sessions avoid a session table and work well with Neon's serverless model. DB-backed admins support lockout, audit logs, and per-user lifecycle without secrets in env.

## Storage driver default

- **Choice**: `STORAGE_DRIVER=local` in `.env.example`, writing to `public/uploads/` (gitignored).
- **Rationale**: Spec §15.1 permits a local driver "for dev". R2 keys are not assumed to exist locally.

## File naming

- **Choice**: Named exports as the primary export of every module. For files Next.js requires a default export from (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`), the named function is declared first and re-exported as default at the bottom.
- **Rationale**: User rule "Named exports only" is honoured for all importable identifiers; framework constraints are met without compromising the rule's intent.

## Singleton handling for `SiteSettings` and `HomeContent`

- **Choice**: A fixed sentinel id (`site-settings-singleton`, `home-content-singleton`) is used in the seed upsert. Read paths use `findFirst()`. Admin update paths target the single row via `findFirstOrThrow()` and `update()` by id.
- **Rationale**: Avoids accidental duplicate rows and avoids requiring the admin form to know an auto-generated id.

## Currency unit

- **Choice**: Project `goalAmount` and `raisedAmount` are stored as whole USD integers (no cents).
- **Rationale**: §7 explicitly allows this option for simplicity. Funding values displayed on `/projects` are whole-dollar.

## Map provider

- **Choice**: React Leaflet + OSM tiles via `https://tile.openstreetmap.org/{z}/{x}/{y}.png`. Component is dynamically imported with `{ ssr: false }` on the `/map` page.
- **Rationale**: §3 mandates "no paid map provider"; Leaflet is server-incompatible due to its DOM dependency.

## Image placeholders

- **Choice**: A neutral stone-textured SVG (`public/images/placeholder.svg`) is used when a `CultureItem.image` is missing. Hero images and ornament are bundled SVGs under `public/images/{hero,ornaments}/`.
- **Rationale**: §15.4 calls for "tasteful neutral stone-textured placeholder" when real photos are unavailable.

## Rate limiting backend

- **Choice**: `RateLimiter` interface with Upstash Redis when `RATE_LIMIT_ENABLED=true` (production requirement) and in-memory fallback in development.
- **Production**: Server fail-fast if distributed Redis is not configured — see `instrumentation.ts` and `SECURITY_NOTES.md`.
- **Rationale**: In-memory limiters are acceptable locally; multi-instance production requires shared state (Upstash).

## Submission approval semantics

- **Choice**: The admin Submissions inbox shows an info banner reading "Approval is for tracking only. To publish, create the menu item or item manually in the relevant admin section." Approval changes `status` only; no `CultureMenuItem`, `CultureItem`, or `Project` is created.
- **Rationale**: §11.3 forbids auto-creation; §10.6 mandates the banner copy verbatim.

## Email

- **Choice**: No email provider integrated. `// TODO: wire Resend or SES here` comments remain in public form server actions (contact, culture submit, subcategory proposal). Partnership and newsletter flows also persist to the DB only.
- **Rationale**: Provider and destination inbox not approved yet. See Phase 0.3 plan — do not send until approved.

## Culture Menu reordering

- **Choice**: `@dnd-kit` sortable drag-and-drop in the admin Culture Menu tree (`CultureMenuTree.tsx`). Home content and About pillars editors use the same pattern.
- **Rationale**: Admin-only CMS reordering; no public WYSIWYG page builder. Drag-and-drop is scoped to authenticated admin editors, not public forms.

## Cache revalidation

- **Choice**: Two complementary layers:
  1. **`unstable_cache`** in `lib/queries/*` with `revalidate: 60` and named **tags** (`home-content`, `culture-menu`, `projects`, etc.).
  2. Admin mutations call **`revalidateTag(..., 'max')`** for tag-based invalidation and **`revalidatePath()`** where specific public routes must refresh immediately (culture item slugs, about pages, etc.).
  3. Public pages and read-only API routes also use **`export const revalidate = 60`** as an ISR floor.
- **Rationale**: Tags keep related queries coherent (e.g. all culture-item reads share `culture-items`). Path revalidation covers routes whose URLs are not fully captured by a single tag.

## Storage S3 client (R2 driver)

- **Choice**: `@aws-sdk/client-s3` is listed in `dependencies` and loaded via a runtime dynamic import in `lib/storage/r2.ts` (`new Function('name', 'return import(name)')`) so the SDK is not evaluated when `STORAGE_DRIVER=local`.
- **Rationale**: Production R2 uploads and `pnpm r2:migrate-public` need the SDK available in deploy environments; lazy import keeps local dev paths that never touch R2 from loading S3 code eagerly.

## Donation checkout

- **Choice**: `/donate` tier UI is informational only. `DONATION_CHECKOUT_ENABLED = false` in `lib/constants/donation-page.ts` disables payment CTAs and shows a “coming soon” notice. No payment provider is integrated.
- **Rationale**: Prevent users from believing checkout occurred when no processor exists. Enable only after provider approval (Stripe, Idram, etc.).

## Submissions, contact messages — delete vs archive

- **Choice**: Hard delete is available from the admin detail view in addition to status changes (`new`, `reviewed`, `approved`, `rejected` for submissions; `new`, `read`, `archived` for contact messages).
- **Rationale**: §10.6 lists "delete" as an admin action. Archive-by-status remains the recommended default; delete is a single explicit action with a confirmation step.

## Accessibility baseline

- **Choice**: Every interactive element receives a `focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2` ring via the shared component primitives (`Button`, `ButtonLink`, `Input`, `Textarea`, `Select`). The public layout includes a `Skip to main content` link. `prefers-reduced-motion` collapses Framer Motion transforms to fades inside `FadeUp`, `Stagger`, and `Counter`.
- **Rationale**: §3, §9 of the brief and WCAG AA practice.

## Neon WebSocket bundling

- **Choice**: `next.config.mjs` declares `@neondatabase/serverless`, `@prisma/adapter-neon`, `@prisma/client`, `ws`, and `bcryptjs` as `serverExternalPackages` so Node resolves them natively instead of bundling broken WebSocket shims.
- **Build resilience**: Public queries in `lib/queries/*` wrap `prisma.*` calls in `try`/`catch` and return safe fallbacks so pages can build when Neon is unreachable from the build host.
- **Rationale**: Bundled Neon serverless drivers can mis-resolve the WebSocket URL. External packages plus query-level fallbacks keep `pnpm build` hermetic without live DB access.

## Production database migrations

- **Choice**: `pnpm build` runs `prisma generate` only (safe for PR CI with placeholder DB URLs). Production uses `pnpm build:production` (includes `prisma migrate deploy`) as the Vercel build command, or [`.github/workflows/deploy-migrate.yml`](.github/workflows/deploy-migrate.yml) against production Neon secrets.
- **Rationale**: Fresh production without applied migrations fails at runtime even when the Next.js build succeeds. PR CI must not require a real database. Full runbook: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Page file exports

- **Choice**: Every `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` declares its primary function without `export` and re-exports it via `export default` at the bottom. `metadata`, `dynamic`, `revalidate`, and `generateMetadata` are exported by name since Next.js allows them.
- **Rationale**: Next.js rejects any unrecognised named export from a route file at type-check time. Keeping the named function (so the rest of the codebase can still reference it for tests/storybook if added later) without `export` satisfies both the framework's constraint and the user rule "named exports only" intent — the symbol is still named, just not re-exported alongside `default`.

## Server vs Client components

- **Choice**: All Route Handlers, RSC pages, admin layouts, and form submission entrypoints are server-only. `'use client'` is reserved for components that must hold local state, run effects, or use Framer Motion (`HeroHome`, `Counter`, `CultureDropdown`, `MobileMenu`, form fields, status selects, `LeafletMap`, `MapPanel`).
- **Rationale**: §3 mandates RSC-by-default; this keeps JS payloads to the minimum needed for each route.
