# Armenian Treasures — Sheet vs Repository Gap Matrix

Audit date: 2026-07-01. Source: AT Features Google Sheet, Figma landing (`prune-gong-50267292.figma.site`), Drive HTML mockups, and current repo on `main`.

## Summary

| Status | Count |
|--------|------:|
| Done | 18 |
| Partial | 14 |
| Missing | 9 |

The repo implements ~70–80% of the product skeleton. Gaps are mainly **taxonomy granularity**, **dedicated map page**, **visual polish**, **content population**, and **external integrations** (payments, email).

---

## Gap Matrix

| # | Feature | Sheet requirement | Current repo | Status | Key files | Recommended action |
|---|---------|-------------------|--------------|--------|-----------|-------------------|
| 1 | Landing Page | Long-scroll marketing homepage (Figma) | Sections exist: Hero, Virtual Museum, Cultural Portal, Featured Treasures, Map preview, Projects, Partnership, Donations, About, Newsletter | Partial | `app/(public)/page.tsx`, `components/sections/*` | Polish spacing/typography/cards; align copy with CMS |
| 2 | Logotype → home | Brand mark returns to `/` | Implemented in header | Done | `components/layout/HeaderBar.tsx` | — |
| 3 | Virtual Museum (home) | 4 roadmap features + CTA | Section + CMS editor | Partial | `VirtualMuseumSection.tsx`, `lib/constants/virtual-museum.ts` | Add `/virtual-museum` hub; link 360° tours to culture items / map |
| 4 | Cultural Portal grid | ~20 category cards | 19 cards; some hrefs wrong | Partial | `lib/constants/cultural-portal.ts` | Point cards to fine-grained routes |
| 5 | Featured Treasures | 4 story cards | Implemented | Done | `lib/constants/featured-treasures.ts` | Wire hrefs to new sub-routes where applicable |
| 6 | Culture taxonomy — Architecture | Churches, Castles, Museums | DB + routes exist | Done | `prisma/seeds/culture-menu.ts` | — |
| 7 | Myths & Gods | Separate catalog | Collapsed into `/culture/legends` | Missing | menu seed, mega menu | Add `legends/myths-and-gods` |
| 8 | Legends & Heroes | Separate catalog | Collapsed into `/culture/legends` | Missing | menu seed | Add `legends/legends-and-heroes` |
| 9 | Icons of History | Kings & dynasties | Collapsed into `/culture/people` | Missing | menu seed | Add `people/icons-of-history` |
| 10 | Scientists | Separate catalog | Collapsed into `/culture/people` | Missing | menu seed | Add `people/scientists` |
| 11 | Famous Armenians | Separate catalog | Collapsed into `/culture/people` | Missing | menu seed | Add `people/famous-armenians` |
| 12 | Art & Culture subcats | Paintings, Music, Writers, Taraz, Carpets | Under `/culture/heritage/*` | Done | menu seed | — |
| 13 | More Culture subcats | Sculptors, Theatre, Dance, Food, Publications, Armaments | DB subcats exist; Sculptors missing from mega menu; portal href bug | Partial | `culture-mega-menu.ts`, `cultural-portal.ts` | Fix Sculptors link; add to nav |
| 14 | Historical Highlights | Events, Capitals, Battles, Christian Heritage, Chronicles, Monuments, Traditions | Single `/culture/history` only | Missing | menu seed | Add `history/*` subcategories |
| 15 | `/khndzoresk` landing | Churches mockup | Implemented + Matterport | Done | `app/(public)/khndzoresk/` | — |
| 16 | `/khachaturian-museum` | Art & Culture mockup | Implemented | Done | `app/(public)/khachaturian-museum/` | — |
| 17 | `/national-gallery-armenia` | Mythology mockup (sheet mapping) | Implemented (gallery) | Partial | landing pages | Content alignment only |
| 18 | Dedicated Mythology page | Sheet visual | Uses gallery landing | Partial | — | Optional new landing; defer unless mockup exported |
| 19 | Dedicated Sculptors page | Sheet visual | Catalog only | Missing | — | Defer; fix catalog route first |
| 20 | Heritage Map (home) | Preview + CTA | Decorative preview → `/#map` | Partial | `HeritageMapSection.tsx` | CTA → `/map` |
| 21 | Heritage Map (full) | Interactive map, filters, 850+ sites | `MapPanel` + API exist; **no `/map` page** | Missing | `components/map/*`, `app/api/map/route.ts` | Add `/map`; wire filters to `MapType` |
| 22 | Upcoming Projects | Home section + `/projects` | Implemented | Done | `projects/page.tsx` | — |
| 23 | Partnership | Page + apply form | Implemented | Done | `partnership/page.tsx` | Email notify when provider ready |
| 24 | Donation | Tiers + `/donate` | UI done; checkout disabled | Partial | `lib/constants/donation-page.ts` | Keep checkout off; membership readiness |
| 25 | About cluster | Mission, Team, Career, Contact | All routes exist | Done | `about/*`, `contacts/` | — |
| 26 | Newsletter | Subscribe form | DB via `ContactMessage` | Partial | `subscribeNewsletter.ts` | Wire email provider |
| 27 | Admin CMS | Content, menu, items, projects | Full admin panel | Done | `app/(admin)/admin/` | — |
| 28 | Public submissions | Review-only flows | Implemented | Done | `culture/submit`, `culture/*/new` | — |
| 29 | Blog | News / stories | Implemented | Done | `app/(public)/blog/` | — |
| 30 | Member auth | Register / login / profile | Scaffolding | Partial | `register/`, `profile/` | Link tiers; no fake checkout |
| 31 | Subscription tiers | Sheet column | UI copy only on donate page | Missing | donation constants | Backend-ready tier constants |
| 32 | Payment provider | Real checkout | Explicitly disabled | Missing | `DONATION_CHECKOUT_ENABLED` | Enable only with env + provider |
| 33 | Email notifications | Transactional email | 3 TODO comments; DB-only | Missing | `contacts/actions.ts`, etc. | `lib/email` stub + env gate |
| 34 | AI tool | Sheet column | Not implemented | Missing | — | Roadmap placeholder only |
| 35 | 3D Artefact Explorer | Q3 2026 roadmap | Marketing card only | Missing | virtual-museum constants | Placeholder on `/virtual-museum` |
| 36 | Immersive Galleries | Q4 2026 roadmap | Marketing card only | Missing | virtual-museum constants | Placeholder |
| 37 | Live Heritage Events | LIVE badge | Marketing card only | Missing | — | Placeholder; no events model |
| 38 | Matterport tours | 360° on sites | Item detail + Khndzoresk | Partial | `lib/matterport.ts`, item detail | Index tours on virtual-museum page |

---

## Implementation priority (this pass)

### Phase 1 — Core product
- [x] Gap matrix (this document)
- [ ] Culture menu subcategories (legends, people, history)
- [ ] Mega menu + cultural portal href alignment
- [ ] Catalog copy overrides for subcategories
- [ ] Seed item reassignment to subcategories
- [ ] Targeted homepage / section polish

### Phase 2 — Differentiators
- [ ] `/map` page with `MapPanel`, full `MapType` filters, item deep links
- [ ] CTA updates (`/#map` → `/map`)
- [ ] `/virtual-museum` roadmap hub

### Phase 3 — Sustainability
- [ ] `lib/email` env-gated stub + action hooks
- [ ] `lib/constants/membership-tiers.ts` aligned with donation UI
- [ ] Product roadmap constants (AI coming soon)

### Phase 4 — Future / content
- Additional standalone landings (mythology, sculptors) when mockups are exported
- Payment provider (Stripe / Idram) after approval
- Populate 850+ map pins via CMS (no fake geo data)
- 3D explorer, live events modules when data/libraries exist

---

## Files expected to change

| Area | Files |
|------|-------|
| Taxonomy | `prisma/seeds/culture-menu.ts`, `prisma/seeds/culture-items.ts`, `lib/navigation/culture-mega-menu.ts`, `lib/constants/cultural-portal.ts`, `lib/constants/culture-catalog-subcategory-overrides.ts`, `lib/navigation/menu-icons.ts` |
| Map | `app/(public)/map/page.tsx`, `components/map/MapPanel.tsx`, `lib/constants/heritage-map-filters.ts`, `lib/constants/heritage-map-section.ts`, `lib/cache/revalidation.ts`, `app/sitemap.ts` |
| Virtual Museum | `app/(public)/virtual-museum/page.tsx`, `lib/constants/virtual-museum.ts`, `components/sections/virtual-museum/*` |
| Nav / footer | `components/navigation/primary-links.ts`, `components/layout/footer/footer-links.ts`, `lib/constants/cultural-portal-page.ts` |
| Email / membership | `lib/email/index.ts`, `lib/constants/membership-tiers.ts`, `lib/constants/product-roadmap.ts` |
| Polish | `app/globals.css`, section CSS as needed |

---

## Risks & follow-ups

1. **Menu migration** — Existing Neon DBs need `pnpm db:seed` (or admin menu edits) to pick up new subcategories.
2. **Marketing copy vs data** — "850+ locations" is aspirational; map page should show live pin count or honest placeholder.
3. **Checkout** — Never enable without provider credentials and legal review.
4. **Email** — Stub skips send when `EMAIL_PROVIDER` unset; production must configure before go-live.
5. **Standalone landings** — Full mythology/sculptors pages require mockup HTML export into repo; catalog routes unblock navigation first.
