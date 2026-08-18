# 05 — Discover more highlight

**Բաժին:** Home page
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

`STORIES WORTH DISCOVERING` ազատ քառակուսում ավելացնել shortcut՝ **Discover more highlight**։ Սեղմելիս բացվի էջ **30 highlight**-ով։

Sheet screenshot-ը mosaic քարտերն են (Tatev / Geghard / Khor Virap / Noravank)։

## Ինչպես իրականացնել

1. Հաստատել Neetrino-ի հետ՝ 5-րդ grid cell vs առանձին CTA։
2. `FeaturedTreasuresGrid`-ում ավելացնել վերջին slot՝ նույն `FeaturedTreasureCard` ոճով, label `Discover more highlights`, href `/highlights` (կամ `/culture/highlights`)։
3. Նոր public էջ՝ 30 published item, նույն card pattern-ով (`mapCultureItemsToFeaturedTreasures`)։
4. Հաշվի առնել #04-ի top 5-ը. այս էջը ցույց է տալիս հաջորդ 30-ը կամ ընդհանուր 30 highlight, ոչ թե նույն 5-ը կրկնված։

## Իրականացված է հիմա

- Homepage mosaic-ը պահում է #04-ի top 5-ը։
- Վերջին slot՝ `Discover more highlights` քարտ, href `/highlights`։
- `/highlights` էջը ցույց է տալիս հաջորդ 30 published item (homepage featured 5-ը բացառված)։
- Քարտերը նույն mosaic pattern-ով են, 5-ական խմբերով։

## Մնացած

- [x] 5-րդ/վերջին shortcut քարտ
- [x] 30-item highlights էջ
- [x] Չկրկնել homepage top 5-ը
