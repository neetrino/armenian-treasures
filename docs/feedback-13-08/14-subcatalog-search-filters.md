# 14 — Sub-catalog որոնում + ֆիլտր

**Բաժին:** Catalogs
**Կարգավիճակ:** Partial
**Առաջընթաց:** 25%

## Ինչ է պահանջվում

Sub-catalog որոնման բաժինը ունենա ֆիլտր ըստ մարզի, ժամանակաշրջանի և տեսակի։ Sheet screenshot-ը Search categories դաշտն է։

## Ինչպես իրականացնել

1. Տեքստային search արդեն կա `CultureCatalogSectionHeader` + `filterCatalogSubcategoriesBySearch` / `filterCatalogItemsBySearch`։
2. Ավելացնել 3 ֆիլտր։ Item grid-ում դրանք բնական են (`region`, `periodLabel`, `itemType`)։
3. Category hub-ում տեսակը subcategory-ն է. մարզ և ժամանակաշրջան ավելի տեղին են item էջերում։
4. UI՝ search row-ի կողքին կամ տակը 3 select։ Query params, որպեսզի shareable լինի։
5. Կիսել նույն filter control-ը 02-ի հետ, չստեղծել երկրորդ component։
6. `filterCatalogItemsBySearch`-ը ընդլայնել structured filters-ով (`heritage-map-filters` pattern)։

## Իրականացված է հիմա

- Search input կա (categories և sites)։
- Region / Period / Type dropdown չկան։

## Մնացած

- [ ] Երեք ֆիլտր dropdown
- [ ] Կիրառել item grid-ում (պարտադիր) և hub-ում (եթե իմաստ ունի)
- [ ] Կիսել control-ը home search-ի հետ
