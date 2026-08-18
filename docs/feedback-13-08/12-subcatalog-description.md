# 12 — Sub-catalog նկարագրություն, հետո բաժիններ

**Բաժին:** Catalogs
**Կարգավիճակ:** Partial
**Առաջընթաց:** 30%

## Ինչ է պահանջվում

Բոլոր sub-catalog-ները ունենան նկարագրության հնարավորություն։ Դրանից հետո ներքևում լինեն բաժինների ընտրության shortcut-երը։

## Ինչպես իրականացնել

1. `CultureMenuItem.description` և Admin `CultureMenuForm` արդեն կան։
2. Category hub (`CultureCategoryPageView`, երբ կան children) հիմա ցույց է տալիս միայն `CultureCatalogSubcategoryGrid` — նկարագրություն չկա։
3. Hub էջում վերևում ավելացնել description block (`category.description` կամ `CultureCatalogAbout` առանց extra facts), հետո shortcut grid։
4. Sheet screenshot-ը (LEGENDS / Myths & Gods / Legendaries & Heroes) — վերնագիր + նկարագրություն, ներքևում երկու մեծ shortcut։

## Իրականացված է հիմա

- Description դաշտը DB/Admin-ում կա։
- Leaf category (առանց children) ունի about block։
- Hub (Architecture, Legends, …) նկարագրությունը չի ցույց տալիս։

## Մնացած

- [ ] Hub էջում description վերևում
- [ ] Հետո միայն subcategory shortcuts
- [ ] Չթողնել stats/facts, եթե sheet-ը դրանք չի խնդրում
