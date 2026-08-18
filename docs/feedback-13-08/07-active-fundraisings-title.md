# 07 — WHAT WE ARE BUILDING → Active Fundraisings

**Բաժին:** Home page
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

`WHAT WE ARE BUILDING` վերնագիրը դարձնել **Active Fundraisings**։

## Ինչպես իրականացնել

1. Default copy — `lib/constants/upcoming-projects.ts`.
2. Home Sections editor already has a title field. Update seed / fallback and the stored DB value.
3. Keep eyebrow `UPCOMING PROJECTS` unless the sheet asks to change it.
4. Do not change Cultural Portal projects copy; #11 removes that section.

## Իրականացված է հիմա

- Default title-ը `ACTIVE FUNDRAISINGS` է (`HomeSectionHeader`-ը uppercase է ցույց տալիս)։
- Seed / fallback-ը գալիս է նույն constant-ից։
- Եղած `HomeContent.sections.upcomingProjects.title`-ը թարմացված է DB-ում։
- Eyebrow-ը մնում է `UPCOMING PROJECTS` (sheet-ը միայն title է խնդրում)։
- Cultural Portal projects copy-ն չի փոխվել (#11-ը այդ սեկցիան հանում է)։

## Մնացած

- [x] Default title → Active Fundraisings
- [x] DB / seed թարմացում
- [x] Eyebrow-ի որոշում — պահել `UPCOMING PROJECTS`
