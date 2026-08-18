# 16 — Հոդվածի էջ — նեղ layout, առանց 3D Tour meta

**Բաժին:** Catalogs
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

Բոլոր հոդվածների էջերը ունենան նույն դասավորվածությունը, ավելի նեղ, որպեսզի աչքին հաճելի լինի։ Հեռացնել 3D Tour հատվածը meta տողից։ Մնան միայն մարզ, ժամանակաշրջան, տեսակ։

Sheet screenshot-ը մեկ տող է՝ Սյունիքի մարզ, 9-րդ դար, MONUMENT, YES։ YES-ը 3D Tour-ն է և պետք է հանել։

## Ինչպես իրականացնել

1. `CultureItemDetailView` stats array-ից հանել 3D Tour տողը։
2. Թողնել Region, Period, Type։ Tour-ը կարող է մնալ էջի ներսում (`#tour`), ոչ meta bar-ում։
3. Նեղացնել content column-ը։ Չստեղծել նոր page shell, սահմանափակել detail grid-ը։
4. Նույն meta տողը կիրառել բոլոր item էջերում. մեկ component է։

## Իրականացված է հիմա

- Meta տողը միայն Region, Period, Type է։ 3D Tour YES-ը հանված է։
- Detail column-ը սահմանափակված է `54rem`՝ նույն `CultureItemDetailView`-ով բոլոր item էջերում։
- `#tour` սեկցիան մնում է էջի ներսում։ Hero-ի 3D Tour CTA-ն տանում է այնտեղ։
- Նկարի վրայի 3D Tour badge-ը հանված է, որ meta-ի հետ չկրկնվի։

## Մնացած

- [x] Հանել 3D Tour-ը stats-ից
- [x] Նեղացնել detail column-ը
- [x] Հաստատել՝ `#tour` սեկցիան մնում է, թե ամբողջությամբ է հանվում
