# 10 — Home ներքևում Partners լոգոներ

**Բաժին:** Home page
**Կարգավիճակ:** Partial
**Առաջընթաց:** 25%

## Ինչ է պահանջվում

Home page-ի ամենաներքևում երևան Partners-ի լոգոները highlighted սկզբունքով։ Ոչ category card grid, այլ լոգոների շարք։

## Ինչպես իրականացնել

1. #09-ից հետո սա դառնում է վերջին home սեկցիան։
2. Չկրկնօրինակել `PartnershipSection` category grid-ը։ Վերօգտագործել `PartnershipShowcase` և `lib/constants/partnership-page.ts` լոգոները։
3. Highlighted նշանակում է ակտիվ/featured գործընկերների լոգոներ (marquee կամ static row), ոչ ամբողջ partnership landing։
4. Ավելացնել `HomeHeritageSections`-ի վերջում։ Պահել `id="partners"` footer հղման համար (`/#partners`)։
5. Լոգոները վերցնել partnership page content-ից։ Նոր model պետք չէ։

## Իրականացված է հիմա

- Partnership landing-ում logo showcase կա։
- `PartnershipSection` կա, բայց home-ում չի միացված։
- Home-ի partnership block-ը category cards է, ոչ logo row։

## Մնացած

- [ ] Home-ի վերջում logo row կամ marquee
- [ ] Highlighted/featured ընտրություն, եթե պետք չեն բոլոր լոգոները
- [ ] Չբերել ամբողջ partnership սեկցիան home
