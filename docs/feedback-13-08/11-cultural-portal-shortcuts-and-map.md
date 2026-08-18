# 11 — Cultural Portal — միայն shortcut-ներ + map

**Բաժին:** Catalogs  
**Կարգավիճակ:** Partial  
**Առաջընթաց:** 35%

## Ինչ է պահանջվում

Cultural Portal-ում (`/culture`) պահպանել **միայն բաժինների shortcut-երը և map-ը**։ Հեռացնել մնացած բոլոր բաժինները։

## Ինչպես իրականացնել

1. `CulturalPortalPage` հիմա ունի hero, stats, categories, highlights, map, projects, partnership, donors, about։
2. Default visibility-ն փոխել՝ միացված միայն `categories` + `map`։ Ֆայլ՝ `lib/landing/landing-section-visibility.ts`, `CulturalPortalPage.tsx`։
3. Admin toggle-ները (`CULTURAL_PORTAL_SECTION_TOGGLES`) կարելի է թողնել, բայց public default-ը պետք է համապատասխանի sheet-ին։ Staging/prod `sectionVisibility` JSON-ը նույնպես թարմացնել։
4. Hero-ն sheet-ը չի հիշատակում. հանել, եթե «մնացած բոլոր բաժիններ» նշանակում է ամեն ինչ shortcuts/map-ից բացի։

## Իրականացված է հիմա

- Categories grid և map կան։
- Section visibility CMS-ով կա, բայց default-ը բոլոր սեկցիաներն է ցույց տալիս։

## Մնացած

- [ ] Default-ը դարձնել միայն categories + map
- [ ] Հանել/ջնջել highlights, projects, partnership, donors, about, (և հավանաբար hero/stats)
- [ ] DB-ում պահված visibility թարմացնել
