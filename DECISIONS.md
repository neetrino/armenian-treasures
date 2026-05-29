# Decisions log

This document records the architectural and editorial choices made during the initial build of Armenian Treasures where the brief offered alternatives or did not specify an option explicitly.

## Auth

- **Choice**: NextAuth v5 (Auth.js) Credentials Provider with `jwt` session strategy. Admin email/password are read from `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars at login time — not from the database.
- **Rationale**: §14 of the masterprompt recommends NextAuth v5 for "cleaner DX" over a hand-rolled `jose` JWT. JWT session strategy avoids a session table in the database and works well with Neon's serverless model.

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

- **Choice**: In-memory token bucket (per-process Map keyed by IP) with a documented `RateLimiter` interface that can be swapped for an Upstash Redis adapter.
- **Rationale**: §14 explicitly allows in-memory for now and asks for the swap surface to be ready.

## Submission approval semantics

- **Choice**: The admin Submissions inbox shows an info banner reading "Approval is for tracking only. To publish, create the menu item or item manually in the relevant admin section." Approval changes `status` only; no `CultureMenuItem`, `CultureItem`, or `Project` is created.
- **Rationale**: §11.3 forbids auto-creation; §10.6 mandates the banner copy verbatim.

## Email

- **Choice**: No email provider integrated. A `// TODO: wire Resend or SES here` comment is placed at the spot where the notification call would live (submission create handler and contact create handler).
- **Rationale**: §11.3 explicitly defers email integration.

## Culture Menu reordering

- **Choice**: Up/Down arrow buttons within siblings instead of HTML5 drag-and-drop.
- **Rationale**: §6 forbids drag-and-drop builders and WYSIWYG. The brief allowed "drag-reorder within siblings" for the menu, but the user rule against drag-and-drop is stricter; arrow-button reorder preserves the same operation (swap with sibling) without any drag UI and works on every device.

## Cache revalidation

- **Choice**: All admin mutations call `revalidatePath()` against the public paths they affect. Long-running listing pages and public route handlers use `export const revalidate = 60` so cache freshness is bounded even when no admin mutation runs.
- **Rationale**: §10.7 mandates revalidation from admin and §3.5 mandates ISR with a 60-second floor. Using `revalidatePath()` instead of `revalidateTag()` avoids managing a tag namespace while still invalidating exactly the pages that change.

## Storage S3 client (R2 driver)

- **Choice**: The R2 driver in `lib/storage/r2.ts` loads `@aws-sdk/client-s3` via a runtime dynamic import (`new Function('name', 'return import(name)')`) and types the client surface locally. The package is **not** in `dependencies` because the default development driver is `local`.
- **Rationale**: Avoids a hard dependency on the AWS SDK during local dev and tests. Production deployments that flip `STORAGE_DRIVER=r2` must `pnpm add @aws-sdk/client-s3` before deploying; this is documented in `README.md`.

## Submissions, contact messages — delete vs archive

- **Choice**: Hard delete is available from the admin detail view in addition to status changes (`new`, `reviewed`, `approved`, `rejected` for submissions; `new`, `read`, `archived` for contact messages).
- **Rationale**: §10.6 lists "delete" as an admin action. Archive-by-status remains the recommended default; delete is a single explicit action with a confirmation step.

## Accessibility baseline

- **Choice**: Every interactive element receives a `focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2` ring via the shared component primitives (`Button`, `ButtonLink`, `Input`, `Textarea`, `Select`). The public layout includes a `Skip to main content` link. `prefers-reduced-motion` collapses Framer Motion transforms to fades inside `FadeUp`, `Stagger`, and `Counter`.
- **Rationale**: §3, §9 of the brief and WCAG AA practice.

## Neon WebSocket bundling

- **Choice**: `next.config.mjs` declares `@neondatabase/serverless`, `@prisma/adapter-neon`, `@prisma/client`, `ws`, and `bcryptjs` as `serverComponentsExternalPackages` **and** registers a webpack `externals` function that aliases the same packages as CommonJS. Public queries (`menu`, `settings`, `home`, `team`, `careers`, `projects`, `donators`, `culture-items`) wrap `prisma.*` calls in `try`/`catch` and return safe defaults so the production build succeeds even if Neon is unreachable from the build host.
- **Rationale**: Without the externals, webpack rewrites `@neondatabase/serverless` into bundled modules that mis-resolve the WebSocket URL to `wss://localhost/v2`. Adding both `serverComponentsExternalPackages` and a `webpack.externals` callback makes Node treat the packages as native modules in both RSC and route handlers. The query-level try/catch keeps the build hermetic per the masterprompt §6 risk (build must succeed without live DB access).

## Page file exports

- **Choice**: Every `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` declares its primary function without `export` and re-exports it via `export default` at the bottom. `metadata`, `dynamic`, `revalidate`, and `generateMetadata` are exported by name since Next.js allows them.
- **Rationale**: Next.js rejects any unrecognised named export from a route file at type-check time. Keeping the named function (so the rest of the codebase can still reference it for tests/storybook if added later) without `export` satisfies both the framework's constraint and the user rule "named exports only" intent — the symbol is still named, just not re-exported alongside `default`.

## Server vs Client components

- **Choice**: All Route Handlers, RSC pages, admin layouts, and form submission entrypoints are server-only. `'use client'` is reserved for components that must hold local state, run effects, or use Framer Motion (`HeroHome`, `Counter`, `CultureDropdown`, `MobileMenu`, form fields, status selects, `LeafletMap`, `MapPanel`).
- **Rationale**: §3 mandates RSC-by-default; this keeps JS payloads to the minimum needed for each route.
