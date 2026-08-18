# 13 — Sub-catalog shortcut հետնանկար 40%

**Բաժին:** Catalogs
**Կարգավիճակ:** Partial
**Առաջընթաց:** 20%

## Ինչ է պահանջվում

Sub-catalog-ում բաժինների shortcut-երը ունենան հետնանկար 40% թափանցիկությամբ։

## Ինչպես իրականացնել

1. `CultureMenuItem.image` արդեն կա, Admin-ում upload կա։
2. `CultureCatalogSubcategoryGrid` hub քարտերը հիմա օգտագործում են `CulturalCategoryIcon`, ոչ photo background։
3. Քարտի ֆոնը դնել `node.image` և overlay 40% (կամ dark overlay 60%)։
4. Տեքստը մնա ընթեռնելի. gold title, ինչպես sheet-ի Myths and Gods քարտերը։
5. Եթե image չկա՝ օգտագործել ներկայիս icon fallback։

## Իրականացված է հիմա

- Menu item-ը ունի `image` դաշտ։
- Hub քարտերը icon-ային են, հետնանկար չեն կիրառում։

## Մնացած

- [ ] Hub card-ին միացնել `node.image` որպես background
- [ ] 40% թափանցիկության overlay
- [ ] Icon fallback երբ նկար չկա
