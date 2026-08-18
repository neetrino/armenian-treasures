# 07 — WHAT WE ARE BUILDING → Active Fundraisings

**Բաժին:** Home page  
**Կարգավիճակ:** Partial  
**Առաջընթաց:** 15%

## Ինչ է պահանջվում

`WHAT WE ARE BUILDING` վերնագիրը դարձնել **Active Fundraisings**։

## Ինչպես իրականացնել

1. Default copy — `lib/constants/upcoming-projects.ts` (`title: 'WHAT WE ARE BUILDING'`)։
2. Home Sections editor արդեն ունի title field (`HomeSectionsEditor`)։ Seed / fallback և DB արժեքը երկուսն էլ փոխել։
3. Eyebrow-ը (`UPCOMING PROJECTS`) համաձայնեցնել. sheet-ը միայն title է նշում։
4. Նույն copy-ն Cultural Portal-ի projects սեկցիայում (`lib/constants/cultural-portal-page.ts`) միայն եթե այդ սեկցիան մնում է (#11-ը այն հանում է)։

## Իրականացված է հիմա

- Սեկցիան և project քարտերը կան։
- Title-ը CMS-ով փոխելի է, բայց default-ը հին է։

## Մնացած

- [ ] Default title → Active Fundraisings
- [ ] DB / seed թարմացում
- [ ] Eyebrow-ի որոշում
