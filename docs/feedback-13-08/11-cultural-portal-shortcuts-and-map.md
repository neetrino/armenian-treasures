# 11 — Cultural Portal — միայն shortcut-ներ + map

**Բաժին:** Catalogs
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

Cultural Portal-ում (`/culture`) պահպանել **միայն բաժինների shortcut-երը և map-ը**։ Հեռացնել մնացած բոլոր բաժինները։

## Ինչպես իրականացնել

1. `CulturalPortalPage` հիմա ունի hero, stats, categories, highlights, map, projects, partnership, donors, about։
2. Default visibility-ն փոխել՝ միացված միայն `categories` + `map`։
3. Admin toggle-ները թողնել, բայց public default-ը պետք է համապատասխանի sheet-ին։ DB `sectionVisibility`-ը նույնպես թարմացնել։
4. Hero-ն հանել default-ից, որովհետև sheet-ը միայն shortcut + map է խնդրում։

## Իրականացված է հիմա

- Default-ը միայն `categories` + `map` է։
- Hero, stats, highlights, projects, partnership, donors, about default-ով անջատված են։
- Admin toggle-ները մնում են, եթե պետք է նորից միացնել։
- `PageContent` cultural-portal visibility-ն թարմացված է DB-ում։

## Մնացած

- [x] Default-ը դարձնել միայն categories + map
- [x] Հանել highlights, projects, partnership, donors, about, hero/stats default-ից
- [x] DB-ում պահված visibility թարմացնել
