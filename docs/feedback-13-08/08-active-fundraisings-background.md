# 08 — Active Fundraisings shortcut հետնանկար

**Բաժին:** Home page  
**Կարգավիճակ:** Partial  
**Առաջընթաց:** 45%

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

- Project-ը ունի `image`, Admin-ում upload կա։
- `ProjectCard`-ը նկարը ցույց է տալիս վերևի 4:3 բլոկում, տեքստը առանձին panel-ի վրա է։

## Մնացած

- [ ] Հաստատել՝ top photo vs full-card background
- [ ] Եթե full-card՝ overlay + typography contrast (ինչպես featured cards)
