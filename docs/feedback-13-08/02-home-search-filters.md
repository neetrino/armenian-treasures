# 02 — Home որոնում + ֆիլտր

**Բաժին:** Home page  
**Կարգավիճակ:** Missing  
**Առաջընթաց:** 5%

## Ինչ է պահանջվում

Այս հատվածում (sheet screenshot-ը header-ի EN / profile կոճակների մոտ է) ավելացնել որոնում, որը ֆիլտրում է ըստ **մարզի**, **ժամանակաշրջանի** և **տեսակի**։

## Ինչպես իրականացնել

1. Որոշել տեղը՝ header (լեզվի/profile կողքին) թե Cultural Portal սեկցիայի վերևում։ Sheet-ի նկարը մատնանշում է header-ը։
2. Չստեղծել նոր search engine. վերօգտագործել `lib/culture-catalog/filter-catalog-entries.ts` և `lib/constants/heritage-map-filters.ts`։
3. Ֆիլտրերի աղբյուր՝ `CultureItem.region`, `periodLabel` / `century`, `itemType`։
4. UI՝ որոնման դաշտ + 3 dropdown (Region, Period, Type)։ Արդյունքները՝ `/culture` կամ dedicated results, query params-ով (`?region=&period=&type=&q=`)։
5. Header-ում տեղադրելիս չխախտել `LanguageSelector` և account CTA layout-ը։

## Իրականացված է հիմա

- Catalog էջերում կա միայն տեքստային search (`CultureCatalogSectionHeader`)։
- Item-ներն ունեն `region` / `periodLabel` / `itemType` դաշտեր։
- Header-ում որոնում չկա։

## Մնացած

- [ ] Header (կամ home section) search UI
- [ ] Region / Period / Type ֆիլտրեր
- [ ] Արդյունքների էջ կամ in-place ցանկ
