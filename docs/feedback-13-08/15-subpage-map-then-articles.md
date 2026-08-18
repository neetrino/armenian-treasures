# 15 — Sub-page — map առաջ, հետո հոդվածներ

**Բաժին:** Catalogs  
**Կարգավիճակ:** Partial  
**Առաջընթաց:** 25%

## Ինչ է պահանջվում

Sub-page-երում հեռացնել նկարագրության դաշտը և տեղադրել **map**։ User-ը scroll անելիս տեսնի այդ բաժնի հոդվածների shortcut-երը։

Sheet screenshot-ը `FAITH CARVED IN STONE` տիպի էջ է՝ վերնագիր, կողքի facts, ներքևում «Monasteries & Cliff Churches» + search։

## Ինչպես իրականացնել

1. `CultureSubcategoryPageView` հիմա՝ hero (description) → stats → about → **items** → **map**։
2. Հանել about/description block-ը (hero description-ը նույնպես, եթե sheet-ի «այս նկարագրության դաշտը» դա է)։
3. Կարգը դարձնել՝ compact header/title → **map** → item shortcuts (`CultureCatalogItemGrid`)։
4. Map-ը արդեն կա՝ `CulturalPortalMap` + `filterMappableItems`։ Տեղափոխել items-ից առաջ։
5. Title-ը մնա (օր. FAITH CARVED IN STONE), բայց երկար about տեքստը հանել։

## Իրականացված է հիմա

- Map և item grid երկուսն էլ կան։
- Կարգը հակառակ է, description/about դեռ կա։

## Մնացած

- [ ] Հանել description/about
- [ ] Map-ը դնել items-ից առաջ
- [ ] Պահել title + item shortcuts + search
