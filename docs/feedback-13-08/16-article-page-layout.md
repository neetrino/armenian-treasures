# 16 — Հոդվածի էջ — նեղ layout, առանց 3D Tour meta

**Բաժին:** Catalogs
**Կարգավիճակ:** Partial
**Առաջընթաց:** 40%

## Ինչ է պահանջվում

Բոլոր հոդվածների էջերը ունենան նույն դասավորվածությունը, ավելի նեղ, որպեսզի աչքին հաճելի լինի։ Հեռացնել 3D Tour հատվածը meta տողից։ Մնան միայն մարզ, ժամանակաշրջան, տեսակ։

Sheet screenshot-ը մեկ տող է՝ Սյունիքի մարզ, 9-րդ դար, MONUMENT, YES։ YES-ը 3D Tour-ն է և պետք է հանել։

## Ինչպես իրականացնել

1. `CultureItemDetailView` stats array-ից հանել 3D Tour տողը։
2. Թողնել Region, Period, Type։ Tour-ը կարող է մնալ էջի ներսում (`#tour`), ոչ meta bar-ում։
3. Նեղացնել content column-ը։ Չստեղծել նոր page shell, սահմանափակել detail grid-ը։
4. Նույն meta տողը կիրառել բոլոր item էջերում. մեկ component է։

## Իրականացված է հիմա

- Meta տողը կա՝ Region, Period, Type, և 3D Tour։
- Layout-ը լայն catalog shell է։
- 3D tour սեկցիան և badge-ը դեռ կան էջում։

## Մնացած

- [ ] Հանել 3D Tour-ը stats-ից
- [ ] Նեղացնել detail column-ը
- [ ] Հաստատել՝ `#tour` սեկցիան մնում է, թե ամբողջությամբ է հանվում
