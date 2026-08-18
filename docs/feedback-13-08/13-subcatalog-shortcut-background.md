# 13 — Sub-catalog shortcut հետնանկար 40%

**Բաժին:** Catalogs
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

Sub-catalog-ում բաժինների shortcut-երը ունենան հետնանկար 40% թափանցիկությամբ։

## Ինչպես իրականացնել

1. `CultureMenuItem.image` արդեն կա, Admin-ում upload կա։
2. `CultureCatalogSubcategoryGrid` hub քարտերը հիմա օգտագործում են `CulturalCategoryIcon`, ոչ photo background։
3. Քարտի ֆոնը դնել `node.image` և overlay 40% (կամ dark overlay 60%)։
4. Տեքստը մնա ընթեռնելի. gold title, ինչպես sheet-ի Myths and Gods քարտերը։
5. Եթե image չկա՝ օգտագործել ներկայիս icon fallback։

## Իրականացված է հիմա

- Hub shortcut-ը `CultureMenuItem.image`-ը դնում է ամբողջ քարտի հետնանկար՝ 40% opacity։
- Title-ը gold է և մնում է ընթեռնելի dark card-ի վրա։
- Նկար չլինելու դեպքում մնում է icon fallback-ը։
- Admin → Culture menu image hint-ը նշում է shortcut background-ը։

## Մնացած

- [x] Hub card-ին միացնել `node.image` որպես background
- [x] 40% թափանցիկության overlay
- [x] Icon fallback երբ նկար չկա
