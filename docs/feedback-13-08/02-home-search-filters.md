# 02 — Home որոնում + ֆիլտր

**Բաժին:** Home page
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

Header-ում՝ EN / profile կոճակների մոտ, ավելացնել որոնում, որը ֆիլտրում է ըստ մարզի, ժամանակաշրջանի և տեսակի։

## Ինչպես իրականացնել

1. Header-ում search icon՝ LanguageSelector-ի կողքին, առանց խախտելու profile CTA-ն։
2. Վերօգտագործել `filter-catalog-entries` և `heritage-map-filters` text search-ը։
3. Ֆիլտրեր՝ `CultureItem.region`, `periodLabel` / `century`, `itemType`։
4. Արդյունքները `/search?q=&region=&period=&type=` query params-ով։

## Իրականացված է հիմա

- Header search icon + panel (region / period / type + keyword)։
- `/search` արդյունքների էջ՝ նույն ֆիլտրերով և catalog card grid-ով։
- Filter logic՝ `filterCatalogItems`։
- Locales/profile layout-ը չի փոխվել։

## Մնացած

- [x] Header search UI
- [x] Region / Period / Type ֆիլտրեր
- [x] Արդյունքների էջ query params-ով
