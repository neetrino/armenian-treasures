# Feedback Sheet vs Repository — Gap Matrix

Audit date: 2026-07-01. Sources: **AT Features** sheet (menu/taxonomy source of truth), **Feedback for web** sheet (stakeholder polish checklist), current repo on `dev-Mno`.

## Summary

| Status | Count |
|--------|------:|
| Done | 8 |
| Partial | 10 |
| Missing | 0 |
| Needs Review | 2 |

Phase A–C implementation applied in this pass. Map immersion, full i18n routing, Meta publishing, and production content remain follow-ups.

---

## Gap Matrix

| Area | AT Features Requirement | Feedback Requirement | Current Repo Status | Status | Files Involved | Recommended Action |
| ---- | ----------------------- | -------------------- | ------------------- | ------ | -------------- | ------------------ |
| Menu Bar — Culture mega menu | 6 columns: Architecture, Myths/Legends, People, Art & Culture, More Culture, Historical Highlights; exact labels | 1:1 order, names, hierarchy; Churches & Monasteries; no invented taxonomy | **Updated** — `at-features-culture-menu.ts` drives mega menu; 6 columns; AT labels | Done | `lib/navigation/at-features-culture-menu.ts`, `culture-mega-menu.ts`, `CultureMegaMenu.tsx`, `MobileMenu.tsx` | Re-seed DB (`pnpm db:seed`) so CMS titles match |
| Menu Bar — DB taxonomy | Subcategories under legends, people, history, heritage | Same as AT; no extra categories | Seed updated (titles); slugs unchanged | Partial | `prisma/seeds/culture-menu.ts` | Run seed against staging/prod DB |
| Navigation / breadcrumbs | Parent categories selectable | Churches → Architecture back-link; no dead parents | **Updated** — shared `buildCultureCatalogBreadcrumb`; parent hrefs on subcategory pages; map CTA → `/map` | Done | `lib/culture-catalog/build-culture-breadcrumb.ts`, `CultureSubcategoryPageView.tsx` | Verify live menu tree resolves heading hrefs |
| Logo | Brand home link | Larger, shield visible, premium | **Updated** — logo height 5.75→6.25rem (lg), gold drop-shadow, spacing | Partial | `Logo.tsx`, `HeaderBar.tsx`, `globals.css` | Stakeholder review on asset itself |
| Icons / culture visual | Category icons per portal | Gold ornamental, not generic Lucide | **Updated** — `CultureOrnamentalIcon` + gold CSS filter in mega menu | Partial | `components/icons/CultureOrnamentalIcon.tsx`, `globals.css` | Extend to homepage culture grid cards |
| Languages | Multilingual product | HY, RU, EN, FR, PT + admin enable/disable | **Updated** — locale config, admin toggles, switcher UI; EN only live | Partial | `lib/i18n/locale-config.ts`, `LanguageSelector.tsx`, `SiteSettings`, admin settings | Add i18n routing + translation files per locale |
| Homepage structure | Hero, portal sections | Hero → Stats → Features → Map → Culture → News → Projects → Partnership | **Updated** — reordered sections; News Feed added | Partial | `HomeHeritageSections.tsx`, `HomeNewsFeedSection.tsx`, `HeroHome` | Stats remain in hero; polish section backgrounds |
| News Feed / impact stories | Blog capability | Homepage section between culture and institutional | **Added** — pulls published blog posts; empty state + Meta TODO | Done | `HomeNewsFeedSection.tsx`, `lib/queries/blogs.ts` | Publish impact stories in admin blog |
| Heritage Map | Full interactive map | Immersive pins, effects, better filters | `/map` exists; basic Leaflet; filters work | Partial | `MapPanel.tsx`, `LeafletMap.tsx`, `HeritageMapSection.tsx` | Future map assets; animated pins (Phase D) |
| Visualisation / immersion | Premium cultural feel | Depth, backgrounds, subtle animation | Radial/grid overlays on home; card hover utilities | Partial | `globals.css`, section components | Continue per-section art direction pass |
| Mobile UX | Responsive portal | Faster, better tap targets, culture menu | Mobile accordion mirrors mega menu columns | Needs Review | `MobileMenu.tsx` | Lighthouse pass on mobile |
| Registration / outreach | Member accounts | Visible CTA; donor tracking readiness | `/register` exists; CTA in newsletter section | Partial | `HomeNewsletterSection.tsx`, `Member` model | Wire outreach fields when email provider ready |
| Meta publishing | — | One-click Meta publish | Not implemented | Needs Review | `HomeNewsFeedSection.tsx` (TODO) | Integrate when API credentials exist |
| Virtual Museum / Donate / About | Product sections | Keep working features | Unchanged, still present | Done | existing sections | — |
| Admin CMS | Content control | Language toggles | **Added** `enabledLocales` on SiteSettings | Done | `prisma/schema.prisma`, `SiteSettingsForm.tsx` | Run migration on deploy |

---

## Changed in this pass (Phase A–C + locale structure)

- Canonical AT Features menu config and 6-column mega menu
- Culture seed title alignment (Churches & Monasteries, Legendaries & Heroes, Art & Culture, etc.)
- Breadcrumb helper and subcategory parent navigation
- Logo presence and gold shield emphasis
- Gold-toned mega menu icons
- Homepage reorder + News Feed section
- Language switcher structure (HY/RU/EN/FR/PT) with admin enable/disable
- Registration CTA in newsletter section

## Remaining / needs real assets or integrations

- Full HY/RU/FR/PT translations and locale-aware routes
- Custom ornamental SVG set (beyond filtered portal icons)
- Map base tiles, 850+ pin dataset, animated pin art
- Meta one-click publishing API
- Payment checkout, transactional email, outreach automation
- Homepage thematic photography per Figma

## Risks / follow-up

1. Run `pnpm prisma migrate deploy` (or dev migrate) for `enabledLocales` column before admin save.
2. Re-run culture menu seed so DB titles match AT Features labels in CMS-driven pages.
3. Admin-edited menu tree may override seed hrefs — verify `resolveCultureMegaMenu` after CMS edits.
