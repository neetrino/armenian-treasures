# 09 — Հեռացնել WHO WE ARE

**Բաժին:** Home page  
**Կարգավիճակ:** Missing  
**Առաջընթաց:** 10%

## Ինչ է պահանջվում

Home page-ից հեռացնել `WHO WE ARE` (`AboutUs`) բաժինը։

## Ինչպես իրականացնել

1. Հանել `<AboutUsSection>` `components/sections/HomeHeritageSections.tsx`-ից։
2. `/about` և `/about/mission` էջերը **չհեռացնել** — sheet-ը միայն home section-ն է։
3. Nav / footer հղումները դեպի `/#about` փոխել `/about`, եթե կան։
4. CMS `aboutUs` block-ը կարելի է թողնել Home Content-ում (չջնջել schema), պարզապես չrender անել։

## Իրականացված է հիմա

- Սեկցիան դեռ render է արվում home-ի վերջում։
- About էջերը առանձին են և պետք է մնան։

## Մնացած

- [ ] Հանել `AboutUsSection` home-ից
- [ ] Ստուգել `/#about` հղումները
