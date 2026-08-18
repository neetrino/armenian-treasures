# 08 — Active Fundraisings shortcut հետնանկար

**Բաժին:** Home page
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

Active Fundraisings shortcut-ում լինի **հետնամասի նկար ավելացնելու** հնարավորություն (Admin-ից)։

## Ինչպես իրականացնել

1. `Project.image` արդեն կա և `ProjectCard`-ում երևում է վերևի media-ում, ոչ ամբողջ քարտի background։
2. Եթե պահանջը full-bleed overlay է (ինչպես Featured Treasure `cardBackgroundImage`)՝
   - կամ `project.image`-ը դնել քարտի ֆոն + dark overlay
   - կամ առանձին `cardBackgroundImage` դաշտ (ավելորդ է, եթե մեկ նկար է բավարար)
3. Վերօգտագործել `lib/featured-treasure-card-background.ts` pattern-ը, չստեղծել նոր background helper։
4. Admin project form-ում image upload արդեն կա. UI copy-ն հստակեցնել («Card background»)։

## Իրականացված է հիմա

- Homepage `ProjectPortalCard`-ը `Project.image`-ը դնում է ամբողջ քարտի ֆոն + dark overlay։
- Admin → Projects form-ում կա **Card background** dropzone (ոչ միայն URL դաշտ)։
- Առանձին schema դաշտ չի ավելացվել։
- Նկարը փոխելիս/ջնջելիս managed file-ը մաքրվում է։

## Մնացած

- [x] Հաստատել՝ top photo vs full-card background — homepage-ում full-card
- [x] Overlay + typography contrast (նույն card-background helper-ով)
