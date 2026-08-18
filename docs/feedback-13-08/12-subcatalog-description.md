# 12 — Sub-catalog նկարագրություն, հետո բաժիններ

**Բաժին:** Catalogs
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

Բոլոր sub-catalog-ները ունենան նկարագրության հնարավորություն։ Դրանից հետո ներքևում լինեն բաժինների ընտրության shortcut-երը։

## Ինչպես իրականացնել

1. `CultureMenuItem.description` և Admin `CultureMenuForm` արդեն կան։
2. Category hub (`CultureCategoryPageView`, երբ կան children) հիմա ցույց է տալիս միայն `CultureCatalogSubcategoryGrid` — նկարագրություն չկա։
3. Hub էջում վերևում ավելացնել description block (`category.description` կամ `CultureCatalogAbout` առանց extra facts), հետո shortcut grid։
4. Sheet screenshot-ը (LEGENDS / Myths & Gods / Legendaries & Heroes) — վերնագիր + նկարագրություն, ներքևում երկու մեծ shortcut։

## Իրականացված է հիմա

- Description դաշտը DB/Admin-ում կա։
- Hub էջը (`/culture/legends`, `/culture/architecture`, …) վերևում ցույց է տալիս վերնագիր + նկարագրություն։
- Նկարագրության աղբյուրը՝ Admin `CultureMenuItem.description`, հետո catalog about, հետո items copy։
- Հետո միայն subcategory shortcut-երը։ Stats, facts, hero, map hub-ում չեն երևում։
- Leaf category (առանց children) ունի about block ինչպես առաջ։

## Մնացած

- [x] Hub էջում description վերևում
- [x] Հետո միայն subcategory shortcuts
- [x] Չթողնել stats/facts, եթե sheet-ը դրանք չի խնդրում
