# 14 — Sub-catalog որոնում + ֆիլտր

**Բաժին:** Catalogs
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

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

- Subcategory և leaf category item grid-ը օգտագործում են նույն `CatalogSearchFields` control-ը, ինչ header / `/search`։
- Region / Period / Type + keyword ֆիլտրերը գալիս են query params-ով (`?q=&region=&period=&type=`)։
- Ֆիլտրը կիրառվում է `filterCatalogItems`-ով։ Map և stats մնում են ամբողջ ցուցակի վրա։
- Hub էջում (`/culture/legends`) region/period/type չեն ավելացվել, որովհետև shortcut-ները menu item են, ոչ monument։

## Մնացած

- [x] Երեք ֆիլտր dropdown
- [x] Կիրառել item grid-ում (պարտադիր) և hub-ում (եթե իմաստ ունի)
- [x] Կիսել control-ը home search-ի հետ
