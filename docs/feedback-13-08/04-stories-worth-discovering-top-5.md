# 04 — STORIES WORTH DISCOVERING — top 5

**Բաժին:** Home page
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

`STORIES WORTH DISCOVERING` սեկցիայում երևան top 5 հոդված։ Admin-ը պարբերաբար կարողանա թարմացնել այդ հնգյակը։


## Ինչպես իրականացնել

1. `CultureItem.featuredOnHome` + `featuredOrder` (1–5)։
2. `getFeaturedCultureItems` — featured flag, `take: 5`։
3. Admin — Culture item և catalog entry form-երում toggle + slot։
4. Grid — 5-րդ `bottom-right` cell։

## Իրականացված է հիմա

- Featured flag/order schema + migration (առաջին 5 published item backfill)։
- Admin-ում «Show in STORIES WORTH DISCOVERING» և slot 1–5։
- Home/portal grid-ը 5 քարտ է, admin order-ով (առանց shuffle)։
- Եթե featured չկա՝ fallback առաջին 5 published item։

## Մնացած

- [x] Featured ընտրություն Admin-ում
- [x] Limit 4 → 5
- [x] Grid layout 5 քարտի համար
