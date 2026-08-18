# 10 — Home ներքևում Partners լոգոներ

**Բաժին:** Home page
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

Home page-ի ամենաներքևում երևան Partners-ի լոգոները highlighted սկզբունքով։ Ոչ category card grid, այլ լոգոների շարք։

## Ինչպես իրականացնել

1. #09-ից հետո սա դառնում է վերջին home սեկցիան։
2. Չկրկնօրինակել `PartnershipSection` category grid-ը։ Վերօգտագործել `PartnershipShowcase` և `lib/constants/partnership-page.ts` լոգոները։
3. Highlighted նշանակում է ակտիվ/featured գործընկերների լոգոներ (marquee կամ static row), ոչ ամբողջ partnership landing։
4. Ավելացնել `HomeHeritageSections`-ի վերջում։ Պահել `id="partners"` footer հղման համար (`/#partners`)։
5. Լոգոները վերցնել partnership page content-ից։ Նոր model պետք չէ։

## Իրականացված է հիմա

- Home-ի վերջում logo row է (`HomePartnersLogosSection`), `id="partners"`։
- Լոգոները գալիս են partnership page content-ից (նույն աղբյուրը, ինչ `PartnershipShowcase`)։
- Highlighted = իրական նկար ունեցող գործընկերներ, առանց placeholder / future slot-երի։
- Category grid և ամբողջ partnership landing-ը home չեն բերվել։

## Մնացած

- [x] Home-ի վերջում logo row
- [x] Highlighted/featured ընտրություն
- [x] Չբերել ամբողջ partnership սեկցիան home
