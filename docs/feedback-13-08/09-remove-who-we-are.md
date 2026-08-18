# 09 — Հեռացնել WHO WE ARE

**Բաժին:** Home page
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

Home page-ից հեռացնել `WHO WE ARE` (`AboutUs`) բաժինը։

## Ինչպես իրականացնել

1. Հանել `<AboutUsSection>` `components/sections/HomeHeritageSections.tsx`-ից։
2. `/about` և `/about/mission` էջերը **չհեռացնել** — sheet-ը միայն home section-ն է։
3. Nav / footer հղումները դեպի `/#about` փոխել `/about`, եթե կան։
4. CMS `aboutUs` block-ը կարելի է թողնել Home Content-ում (չջնջել schema), պարզապես չrender անել։

## Իրականացված է հիմա

- `AboutUsSection`-ը այլևս չի render արվում homepage-ում։
- `/about/mission`, `/about/team`, `/about/career` մնում են։
- `aboutUs` hash-ը տանում է `/about/mission`։
- Admin Home Content `aboutUs` block-ը մնում է, բայց public home-ում չի երևում։

## Մնացած

- [x] Հանել `AboutUsSection` home-ից
- [x] Ստուգել `/#about` հղումները
