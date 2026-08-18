# 17 — Architecture hover-ում չի երևում Ornaments

**Բաժին:** Admin panel
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

Admin-ում և sub-catalog էջում Ornaments-ը ճիշտ տեղում է։ Hover անելիս Architecture-ի վրա այն չի երևում. ենթամենյուն կամ children-ը չի բացվում։

Sheet screenshot-ը Admin tree է՝ Architecture, հետո Churches, Castles, Ornaments, Add a new sub-catalog։

## Ինչպես իրականացնել

1. Ստուգել երեք տեղ.
   - Public mega menu — `CultureMegaMenu.tsx` (բոլոր սյուները միանգամից են, per-column hover չկա)։
   - Admin tree — `CultureMenuTree.tsx` (expand-ը click է, ոչ hover)։
   - Public hub/sub-catalog — Architecture քարտի hover-ը children չի ցույց տալիս։
2. Եթե խնդիրը mega menu-ում Ornaments-ի բացակայությունն է՝ համեմատել DB tree-ն `resolveCultureMegaMenu` և `at-features-culture-menu.ts` mapping-ի հետ։
3. Եթե խնդիրը hover reveal-ն է՝ Architecture trigger-ի վրա ցույց տալ children, inclusive Ornaments, առանց click-ի։
4. Չփոխել Ornaments-ի `order`-ը. sheet-ը ասում է, որ տեղը ճիշտ է։

## Իրականացված է հիմա

- Խնդիրը mega menu-ում էր. Architecture սյունը AT Features-ից hardcoded էր (միայն Churches & Monasteries + Castles) և չէր վերցնում Admin-ում ավելացված children-ը։
- `resolveCultureMegaMenu`-ը հիմա live tree-ից append է անում բացակա, ակտիվ, ոչ-form children-ը. Ornaments հայտնվում է Castles-ից հետո։
- Form route-ը (`Add a new sub-catalog`) public hover list-ում չի երևում։
- Ornaments-ի `order`-ը չի փոխվել։ Admin tree-ն մնում է click-expand։
- Icon fallback՝ `ornaments` → `monumentsAndLandmarks` / Sparkles։

## Մնացած

- [x] Վերարտադրել hover-ը public vs admin
- [x] Ուղղել այն surface-ը, որտեղ Architecture-ի children-ը չեն երևում
- [x] Համոզվել, որ Ornaments-ը հայտնվում է hover list-ում
