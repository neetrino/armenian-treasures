# gid=0 — feedback for web

Աղբյուր՝ [feedback for web, առաջին թերթ](https://docs.google.com/spreadsheets/d/1p79Zqe-LfEtn6zRITd0ahO-734C8b8S1NGg-wy5_Oak/edit?gid=0#gid=0)  
Աուդիտ՝ 2026-10-20, ըստ ընթացիկ կոդի։ `Neetrino comment` սյունը դատարկ է։

Տոկոսը պահանջի դեմ կոդի վիճակն է։ Շեմը՝ Done ≥ 90%, Partial 15–89%, Missing 0–14%։

**Ընդհանուր՝ 75%** (42 կետի միջին)։ Done 19, Partial 23, Missing 0։

Սքրինշոթները այս թղթապանակի `screenshots/`-ում են, կապված իրենց տողին։ Google-ի ներկառուցված նկարի հղումը ժամանակավոր է, դրա համար ֆայլերը պահված են տեղում։ Որոշ նկար թերթում կտրված է բջջի բարձրությամբ. նկարագրությունը հենվում է տեսանելի մասի վրա։

Ստուգումը՝ `http://localhost:3000`։

## Հակասություններ, որոնք չպետք է «ուղղել» կուրորեն

Այս թերթի մի քանի կետ հակասում է նույն թերթի վերջի մենյուի աղբյուրին և ավելի ուշ թերթերին։

| Կետ | Այս թերթը ասում է | Ինչն է գերակա հիմա |
|---|---|---|
| B3 | Art & Culture-ը խառնել More Culture-ի հետ | Մենյուն հիմա մեկ սյուն է։ Կապված sheet-ը ([AT Features](https://docs.google.com/spreadsheets/d/1Ynvib2KnK9PnUw0-Zny1rBPEUQtFFV_eTQYSf9kH-80/edit)) դրանք առանձին է պահում |
| B4 | Museums-ը Architecture-ից տեղափոխել Art & Culture | Կապված sheet-ում Museums-ը Architecture-ի տակ է։ Կոդում այն Art & Culture սյան մեջ է |
| B2 և C6 | B2-ը հանում է partnership-ը գլխավորից, C6-ը ուզում է Partnership Icons Footer | Գլխավորում partnership շարքը կա, donation սեկցիա չկա |
| B22 | Newsletter-ը թաքցնել միայն մուտք գործածներին | Բլոկը գլխավորից հանված է բոլորի համար |

Ավելի ուշ թերթերը (`28.08`, `09.10`, card content) այս ֆայլի կետերը չեն փոխարինում, բայց նույն էկրանին հակասելիս գերակա է ավելի նոր թերթը։ Տես [`docs/FEEDBACK_SHEETS_OVERVIEW.md`](../FEEDBACK_SHEETS_OVERVIEW.md)։

---

## Ամփոփ աղյուսակ

| ID | Թերթի տող | Բաժին | Կարգավիճակ | % | Ստուգել |
|---|---:|---|---|---:|---|
| A1 | 2 | Քարտի տառատեսակ | Done | 90% | `/culture/item/[slug]` |
| A2 | 3 | Քարտի subtitle | Done | 90% | `/culture/architecture/churches` |
| A3 | 4 | Արևմտահայերեն | Done | 90% | լեզվի անջատիչ, `/admin/settings` |
| A4 | 5 | Անսահմանափակ մեդիա լինքեր | Done | 95% | `/admin/culture-items/[id]`, հոդված |
| A5 | 6 | Քարտեզը թաքցնել, եթե դատարկ է | Done | 95% | հոդված առանց կոորդինատի |
| A6 | 7 | Ենթաէջ → գլխավորի shortcut | Done | 95% | `/`, `/admin/culture-items` |
| A7 | 8 | Հանել նմանատիպ հատվածը | Done | 95% | հոդված |
| A8 | 9 | Նկարագրությունը միայն ներքևում | Done | 95% | `/culture/item/[slug]` |
| A9 | 10 | Կողքի բլոկը հանել, փիրուզը մեղմել | Done | 90% | հոդված |
| B1 | 15 | Հանել 4 feature քարտը | Done | 95% | `/`, `/virtual-museum` |
| B2 | 16 | Գլխավորի կառուցվածք | Done | 90% | `/` |
| B3 | 17 | Art & Culture + More Culture | Done | 90% | մենյու |
| B4 | 18 | Museums → Art & Culture | Done | 95% | մենյու, `/culture/heritage/museums` |
| B5 | 19 | Ենթաբաժնի էջ՝ առանց նկարագրության | Done | 95% | `/culture/heritage` |
| B6 | 20 | User-ը ոչինչ չավելացնի | Done | 95% | `/culture/submit` 404 |
| B7 | 21 | Epic | Done | 90% | `/culture/legends/epic` |
| B8 | 22 | Upcoming գումարները խմբագրելի | Done | 90% | `/admin/projects`, `/projects` |
| B9 | 23 | Why it matters + ամսական/տարեկան | Done | 95% | `/donate` |
| B10 | 24 | 1000 / 5000 / 10000 + սերտիֆիկատ | Partial | 80% | `/donate` |
| B11 | 25 | Ընտրված ֆիլտրը մոխրագույն | Partial | 40% | `/map` |
| B12 | 26 | Ցանկը քարտեզի ներսում, քարտեզը մեծ | Partial | 80% | `/map` |
| B13 | 27 | Բլոգը աշխատի | Partial | 70% | `/blog` |
| B14 | 28 | Միատոն սև ֆոն | Partial | 35% | `/donate`, `/` |
| B15 | 29 | Sign in-ի տեղը | Partial | 75% | `/login` |
| B16 | 30 | Upcoming-ի ենթակետերը հանել | Partial | 35% | հեդերի Upcoming |
| B17 | 31 | Գործընկերների քարտեր, ոչ շրջան | Partial | 70% | `/partnership` |
| B18 | 32 | Գրքի ներբեռնում | Partial | 40% | գլխավորում բաժին չկա |
| B19 | 33 | Featured treasures խառը դասավորություն | Partial | 85% | `/#` featured |
| B20 | 34 | Patron wall-ի փոխարեն սերտիֆիկատ | Partial | 45% | `/donate` |
| B21 | 35 | Բլոգ՝ 3 highlighted + ժամանակագրություն | Partial | 35% | `/blog` |
| B22 | 36 | Newsletter-ը գրանցվածներին չերևա | Done | 90% | `/` մուտքով և առանց |
| C1 | 38 | Մենյու ըստ կապված sheet-ի | Partial | 65% | հեդերի Culture |
| C2 | 39 | Լոգոն մեծ, վահանը երևա | Partial | 70% | հեդեր |
| C4 | 40 | Ոսկեգույն զարդանախշ իկոններ | Partial | 50% | մենյու, կատալոգ |
| C5 | 41 | HY RU EN FR PT + enable/disable | Partial | 70% | անջատիչ, `/admin/settings` |
| C6 | 42 | Գլխավորի սեկցիաների կարգ | Partial | 75% | `/` |
| C7 | 43 | Կենդանի ֆոներ | Partial | 40% | `/` |
| C8 | 44 | Իմերսիվ քարտեզ | Partial | 45% | `/map` |
| C11 | 45 | Մոբայլ | Partial | 50% | `/` նեղ լայնք |
| C12 | 46 | Բաժինների կապը | Partial | 80% | `/culture/architecture/churches` |
| C13 | 47 | News feed | Partial | 65% | `/`, `/blog`, `/admin/blog` |
| C14 | 48 | Գրանցում | Partial | 75% | `/register`, `/admin/users` |

---

## A — քարտեր

### A1 — Քարտի տառատեսակ

| | |
|---|---|
| Թերթ | տող 2, `card visuals` |
| % | 90% |
| Սքրինշ | ![Ոսկեգույն հայերեն վերնագիր մուգ ֆոնի վրա](./screenshots/a1-card-font.png) |

Պահանջ. տառատեսակը լինի նախնական դիզայնինը։ Եթե հայերեն գլիֆ չկա, վերցնել մոտիկը։

Սքրինշում երևում է `ՏԱԹԵՎԻ ՎԱՆԱԿԱՆ ՀԱՄԱԼԻՐ` ոսկեգույն, մուգ երկնքի վրա, տակը `9-րդ դար`։

Ինչպես է արված. լատինատառ քարտի վերնագիրը մնում է դիզայնի Cinzel-ը։ Cinzel-ը հայերեն չունի, դրա համար հայերեն վերնագիրը, դարի տողը և քարտի տեքստը գնում են Noto Serif Armenian-ի (մոտիկ սերիֆ)։ Քարտի անգլերեն նկարագրությունը Kelvinch է։ Կեղծ extra-bold (800/900) հայերենի վրա այլևս չի սինթեզվում. վերնագիրը իրական 700 է, դարի տողը՝ 500, առանց 0.2em նոսրացման։

Ստուգել. `/culture/architecture/churches` և գլխավորի Featured Treasures, հայերեն վերնագրով քարտ։ Տառը սերիֆ է, չի փշրվում։ Անգլերեն քարտի վերնագիրը Cinzel է մնում։ 100% չէ, որովհետև նախնական դիզայնի սեփական font ֆայլը չի տրվել։

Ֆայլեր. `app/globals.css`, `components/culture-catalog/culture-catalog-page.css`, `components/culture-catalog/CultureCatalogItemGrid.tsx`, `components/sections/featured-treasures/FeaturedTreasureCard.tsx`

### A2 — Subtitle քարտերում

| | |
|---|---|
| Թերթ | տող 3, `subtitle` |
| % | 90% |
| Սքրինշ | ![Ադմինի TITLE դաշտ](./screenshots/a2-subtitle.png) |

Պահանջ. card-երում ավելացնել subtitle հատված։

Սքրինշը ադմինի `TITLE` դաշտն է (`ՏԱԹԵՎԻ ՎԱՆԱԿԱՆ ՀԱՄԱԼԻՐ`) և տակը `PERIOD / CENTURY`։ Առանձին subtitle դաշտ չէր երևում։

Ինչպես է արված. `CultureItem.subtitle` պահվում է ըստ լեզվի, ինչպես վերնագիրը։ Ադմինում Title-ի կողքն է `Subtitle` դաշտը։ Կատալոգի քարտում այն նստում է վերնագրի տակ, շեղատառ, կարճ նկարագրությունից առաջ։ Եթե դաշտը դատարկ է, վերցվում է հոդվածի առաջին բլոկի subtitle-ը։ Եթե այդ տեքստը նույնն է, ինչ կարճ նկարագրությունը, կրկին չի դուրս գալիս։

Ստուգել. `/admin/culture-items/[id]` լրացնել Subtitle, պահպանել, բացել `/culture/architecture/churches`։ Վերնագրի տակ երևում է այդ տողը, տակը մնում է կարճ նկարագրությունը։ Դատարկ subtitle-ով քարտը չի կոտրվում։

Ֆայլեր. `prisma/schema.prisma`, `components/admin/culture-item-editor/CultureItemEditorMetaBar.tsx`, `components/culture-catalog/CultureCatalogItemGrid.tsx`

### A3 — Արևմտահայերեն

| | |
|---|---|
| Թերթ | տող 4, `language` |
| % | 90% |
| Սքրինշ | ![HY RU EN FR PT անջատիչ](./screenshots/a3-language.png) |

Պահանջ. ավելացնել արևմտահայերենը։

Սքրինշում անջատիչն է `HY · RU · EN · FR · PT`, ընտրված է EN։ Արևմտահայերենն այդ կտրվածքում չկար։

Ինչպես է արված. `HYW` կա լեզուների ցանկում և միացված է կայքի կարգավորումներում (`HY, HYW, EN, RU, FR, PT`)։ Անջատիչում կոդը `HYW` է, էջի լեզուն `hyw`։ Ինտերֆեյսի տեքստը դասական ուղղագրությամբ է (`և` → `եւ`, `ություն` → `ութիւն`, `Սյունիք` → `Սիւնիք`)։ Եթե նյութի արևմտահայերեն դաշտը դատարկ է, ցույց է տրվում արևելահայերենը նույն ուղղագրությամբ։ Ադմինը կարող է առանձին լրացնել Western դաշտը, և այդ տեքստը մնում է ինչպես գրված է։

Ստուգել. հեդերի անջատիչից ընտրել `HYW`, բացել `/`։ Մենյուում պետք է լինի `Նուիրատվութիւն`, ոչ թե `Նվիրատվություն`։ `HY` ընտրելիս արևելահայերենը մնում է առաջվանը։ Ադմին՝ `/admin/settings` և նյութի `ARM (W)` ներդիրը։

Ֆայլեր. `lib/i18n/western-armenian.ts`, `lib/i18n/message-row.ts`, `lib/i18n/translatable-content.ts`

### A4 — Լինքեր առանց քանակի սահմանի

| | |
|---|---|
| Թերթ | տող 5, `links` |
| % | 95% |
| Սքրինշ | չկա |

Պահանջ. քարտում լինի drone, Matterport, map, YouTube։ Քանակի սահման չլինի. որքան նկար, վիդեո, վիրտուալ տուր կամ դրոն պետք է, այնքան ավելացվի։

Ինչպես է արված. տուրի տեսակներն են LiDAR, 3D, Matterport, Drone։ Վիդեոն ընդունում է YouTube, Vimeo կամ MP4։ Քարտեզը `mapUrl` է։ Նկարները, տուրերը և վիդեոները ցուցակ են, առանց 20 կամ 30 հատի կտրվածքի։ Դատարկ տողը էջում չի դուրս գալիս։

Ստուգել. `/admin/culture-items/[id]` ավելացնել Matterport և Drone տուր, երկու YouTube վիդեո, պահպանել, բացել `/culture/item/[slug]`։ Բոլորը երևում են։

Ֆայլեր. `lib/culture-item-media.ts`, `lib/admin/culture-item-media-form.ts`, `components/culture-catalog/CultureItemPublicTour.tsx`

### A5 — Քարտեզ միայն եթե լրացված է

| | |
|---|---|
| Թերթ | տող 6, `map` |
| % | 95% |
| Սքրինշ | չկա |

Պահանջ. բոլոր քարտերը կարողանան քարտեզ ունենալ։ Եթե ադմինը չլրացնի, էջում չերևա։

Ինչպես է արված. ամեն նյութ ունի Map բաժին։ Առանց map link-ի և կոորդինատի Location բլոկը չի նկարվում։ Լրացված արտաքին հղումը երևում է նույնիսկ եթե կետը չի կորզվում։ `showOnMap` միայն ժառանգության քարտեզի pin-ն է։

Ստուգել. հոդված առանց map URL-ի՝ Location բլոկ չկա։ Լրացնելուց հետո բլոկը երևում է։ `/map`-ում pin-ը միայն նշվածներինն է։

Ֆայլեր. `components/culture-catalog/CultureItemPublicMap.tsx`, `components/admin/culture-item-editor/AdminLocationMapField.tsx`

### A6 — Ենթաէջը գլխավորի shortcut

| | |
|---|---|
| Թերթ | տող 7, `home page` |
| % | 95% |
| Սքրինշ | ![Stories worth discovering](./screenshots/a6-home-shortcut.png) |

Պահանջ. ենթաէջերում լինի կոճակ, որով ադմինը միացնում է նյութը, և այն գլխավորում երևա shortcut-ով։

Սքրինշը գլխավորի `STORIES WORTH DISCOVERING` շարքն է. երեք քարտ նկարով, տարեթվով և վերնագրով։

Ինչպես է արված. `/admin/culture-items` ցանկում ամեն նյութ ունի `Home` / `On home` կոճակ։ Խմբագրիչում նույն դրոշը `Home shortcut` է, կարգը 1–5։ Հրապարակված նյութը գլխավորի Stories շարքում է։ Անջատելը հանում է այն։

Ստուգել. `/admin/culture-items` սեղմել `Home` հրապարակված նյութի վրա, բացել `/`։ Քարտը Stories շարքում է։ `On home` նորից սեղմելը հանում է այն։

Ֆայլեր. `components/admin/CultureItemsSortableList.tsx`, `app/(admin)/admin/(panel)/culture-items/actions.ts`

### A7 — Հանել նմանատիպ հատվածը

| | |
|---|---|
| Թերթ | տող 8 |
| % | 95% |
| Սքրինշ | ![Կտրված ցանկ՝ ARCHITECTURAL FORM](./screenshots/a7-remove-similar.png) |

Պահանջ. «հեռացնել նմանատիպ հատվածները»։

Սքրինշը բարակ կտրվածք է. երևում է `ARCHITECTURAL FORM` և տակը ցանկի տողեր։ Հոդվածի կողքի կամ ներքևի կրկնվող բլոկ է, ոչ թե ամբողջ էջ։

Ինչպես է արված. հոդվածի էջում related շարք չկա։ Նույն բլոկը հանված է նաև `/khndzoresk`, `/national-gallery-armenia` և `/khachaturian-museum` էջերից։

Ստուգել. այդ երեք էջերի վերջում related ցանկ չկա։ `/culture/item/[slug]` վերջում միայն հետ գնալու հղումն է։

Ֆայլեր. `components/khndzoresk/KhndzoreskPage.tsx`, `components/national-gallery-armenia/NationalGalleryPage.tsx`, `components/khachaturian-museum/KhachaturianMuseumPage.tsx`

### A8 — Նկարագրությունը միայն ներքևում

| | |
|---|---|
| Թերթ | տող 9 |
| % | 95% |
| Սքրինշ | ![Պարբերություն լանդշաֆտի վրա](./screenshots/a8-description-under-title.png) |

Պահանջ. նկարագրությունը վերնագրի տակ էլ է երևում։ Հանել այդը, թող մնա միայն ներքևինը։

Սքրինշում վերնագրի տակ երկար պարբերություն է՝ լեռների նկարի վրա։

Ինչպես է արված. hero-ին նկարագրություն այլևս չի փոխանցվում։ Տեքստը մնում է ներքևի description բլոկներում։

Ստուգել. `/culture/item/[slug]`։ Վերնագրի տակ, նկարի վրա, երկար պարբերություն չկա։ Նույն տեքստը էջի մարմնում է։

Ֆայլեր. `components/culture-catalog/CultureItemDetailView.tsx`

### A9 — Կողքի բլոկը հանել, փիրուզը մեղմել

| | |
|---|---|
| Թերթ | տող 10 |
| % | 90% |
| Սքրինշ | ![Փիրուզ մետա և կողքի takeaways](./screenshots/a9-turquoise-type.png) |

Պահանջ. նկարի կողքի հատվածը հանել, մնա միայն փիրուզագույն շարքը։ Տառատեսակը շատ կոպիտ է. ավելի նուրբ և մի քիչ փոքր, որ աչք չծակի։

Սքրինշում վերևում փիրուզով `Արագածոտն · 9-րդ դար · MONUMENT · YES` է, տակը վերնագիր, նկար, և աջ կողմում `KEY TAKEAWAYS`։

Ինչպես է արված. հոդվածում կողքի takeaways սյուն չկա։ Մետա շարքը մնում է, բայց հոդվածի վրա տառը 18px է և 500 հաստություն, առանց փիրուզ շողքի։ Մյուս էջերի վիճակագրությունը չի փոխվել։

Ստուգել. `/culture/item/[slug]` desktop։ Աջում takeaways չկա։ Փիրուզ թվերը ավելի մանր են, քան կատալոգի էջի վիճակագրությունը։

Ֆայլեր. `components/culture-catalog/CultureItemDetailView.tsx`, `components/culture-catalog/culture-catalog-page.css`

---

## B — էջերի կառուցվածք

### B1 — Հանել չորս feature քարտը

| | |
|---|---|
| Թերթ | տող 15, N 1, `remove` |
| % | 95% |
| Սքրինշ | ![3D Virtual Tours և մյուս քարտերը](./screenshots/b1-remove-section.png) |

Պահանջ. «այս հատվածը հանում ենք»։

Սքրինշը չորս քարտ է. `3D VIRTUAL TOURS`, `3D ARTEFACT EXPLORER`, `IMMERSIVE GALLERIES`, `LIVE HERITAGE EVENTS`։

Ինչպես է արված. չորս քարտը չկա ոչ գլխավորում, ոչ `/virtual-museum` էջում։ Էջում մնում են վերնագիրը և կոճակը։

Ստուգել. `/` և `/virtual-museum`։ `3D VIRTUAL TOURS` քարտը չկա։

Ֆայլեր. `components/sections/VirtualMuseumSection.tsx`

### B2 — Գլխավորի կառուցվածք

| | |
|---|---|
| Թերթ | տող 16, N 2, `structure` |
| % | 90% |
| Սքրինշ | չկա |

Պահանջ. Cultural Portal, map, Featured Treasures (ադմինը որոշի կարգը, աբստրակտ ոճ), blog, upcoming projects, log in միայն չգրանցվածներին։ Partnership և donation սեկցիաները գլխավորից հանել։

Ինչպես է արված. գլխավորի կարգը՝ Cultural Portal → Map → Featured Treasures → News → Upcoming։ Partnership և donation սեկցիաները գլխավորից հանված են։ Featured-ը `featuredOnHome` + `featuredOrder` է։ Hero-ի երկրորդ կոճակը թաքնվում է, եթե օգտատերը մուտք է գործել և կոճակը տանում է `/login` կամ `/register`։

Ստուգել. `/` սքրոլով անցնել սեկցիաները։ Մուտք գործած վիճակում hero-ի login կոճակը չկա, եթե այդ կոճակի հղումը login/register է։ `/donate` գլխավորի մեջտեղում չի նստած։

Ֆայլեր. `components/sections/HomeHeritageSections.tsx`, `app/(public)/page.tsx`

### B3 — Art & Culture և More Culture միասին

| | |
|---|---|
| Թերթ | տող 17, N 3, `mix` |
| % | 90% |
| Սքրինշ | չկա |

Պահանջ. art & culture-ը խառնել more culture բաժնի հետ։

Ինչպես է արված. մենյուի `Art & Culture` սյունը ներառում է Paintings, Music, Writers, Taraz, Carpets, և նաև Museums, Sculptors, Theatre, Dance, Food & Drink, Publications։ Առանձին More Culture սյուն չկա։

Ստուգել. հեդեր → Culture։ More Culture առանձին վերնագիր չկա, այդ կետերը Art & Culture-ի տակ են։

Զգուշություն. C1-ի կապված sheet-ը More Culture-ն առանձին սյուն է ուզում։ Այս կետը և C1-ը միասին 100% չեն կարող լինել։

Ֆայլեր. `lib/navigation/at-features-culture-menu.ts`

### B4 — Museums-ը Art & Culture

| | |
|---|---|
| Թերթ | տող 18, N 4, `add` |
| % | 95% |
| Սքրինշ | չկա |

Պահանջ. Museums-ը հանել Architecture-ից և դնել Art & Culture։

Ինչպես է արված. Museums-ը Art & Culture սյան մեջ է և բացվում է `/culture/heritage/museums`։ Հին `/culture/museums` հասցեն վերահղվում է այդ էջ։

Ստուգել. մենյուում Museums-ը Architecture-ի տակ չէ։ Բացել `/culture/heritage/museums` և `/culture/museums` (վերահղում)։

Զգուշություն. կապված sheet-ում Museums-ը Architecture-ի տակ է։

Ֆայլեր. `lib/navigation/at-features-culture-menu.ts`

### B5 — Ենթաբաժնի էջը առանց նկարագրությունների

| | |
|---|---|
| Թերթ | տող 19, N 5, `page` |
| % | 95% |
| Սքրինշ | ![Heroes, Myths խորագիր և աջի ցանկ](./screenshots/b5-subcategory-page.png) |

Պահանջ. ենթաբաժին բացելիս, օրինակ Art & Culture, երևան միայն իր ենթաբաժինները՝ մեծ, իրարից առանձնացված, առանց նկարագրության։

Սքրինշում ձախում `HEROES, MYTHS & ORAL MEMORY` է և ներքևում պարբերություն, աջում ենթակետերի ցանկ։

Ինչպես է արված. կատեգորիայի hub-ը մեծ քարտեր է, առանց քարտի պարբերության և առանց վերնագրի տակի ներածական տեքստի։

Ստուգել. `/culture/heritage` և `/culture/legends`։ Երևում են միայն ենթաբաժնի քարտերը, առանց նկարագրության։

Ֆայլեր. `components/culture-catalog/CultureCategoryPageView.tsx`, `components/culture-catalog/CultureCatalogSubcategoryGrid.tsx`

### B6 — User-ը նյութ չավելացնի

| | |
|---|---|
| Թերթ | տող 20, N 6, `remove` |
| % | 95% |
| Սքրինշ | ![Suggest an entry](./screenshots/b6-remove-user-add.png) |

Պահանջ. օգտատերը ոչինչ ավելացնելու հնարավորություն չունենա, բոլոր add հնարավորությունները հանել։

Սքրինշ. «Know a monastery or church…» և կոճակ `SUGGEST AN ENTRY`։

Ինչպես է արված. հանրային ավելացնելու էջերը հանված են։ `/culture/submit` և `/culture/[categorySlug]/new` այլևս չեն բացվում։ Ադմինի նյութ ավելացնելը մնում է։

Ստուգել. կատալոգում `SUGGEST AN ENTRY` չկա։ `/culture/submit` և `/culture/architecture/new` 404 են։

Ֆայլեր. հանրային submit և `new` էջերը հանված են։ Ադմինը մնում է `/admin/culture-items/new`։

### B7 — Epic

| | |
|---|---|
| Թերթ | տող 21, N 7, `add` |
| % | 90% |
| Սքրինշ | չկա |

Պահանջ. Myths & Legends-ում ավելացնել epic։

Ինչպես է արված. մենյուում `Epic` կետն է, route `/culture/legends/epic`։

Ստուգել. հեդեր → Myths & Legends → Epic, ապա `/culture/legends/epic`։ Էջը 404 չէ։

Ֆայլեր. `lib/navigation/at-features-culture-menu.ts`

### B8 — Upcoming գումարները խմբագրելի

| | |
|---|---|
| Թերթ | տող 22, N 8, `upcomings` |
| % | 90% |
| Սքրինշ | չկա |

Պահանջ. upcoming projects-ը ադմինը խմբագրի, այդ թվում գումարը։

Ինչպես է արված. `Project` ունի `goalAmount` և `raisedAmount`։ Ադմինում ցանկ և խմբագրում կա։ Public էջը `/projects` է։

Ստուգել. `/admin/projects` փոխել գումարը, բացել `/projects`։ Նոր թիվը երևում է։

Ֆայլեր. `prisma/schema.prisma` (`Project`), `app/(admin)/admin/(panel)/projects/page.tsx`

### B9 — Why it matters և ամսական/տարեկան

| | |
|---|---|
| Թերթ | տող 23, N 9, `donation` |
| % | 95% |
| Սքրինշ | չկա |

Պահանջ. donations էջից հանել Why it matters։ Ամսական և տարեկան ենթաբաժանում չլինի։

Ինչպես է արված. Why it matters բլոկը էջում չկա։ Տարիֆը մեկ գումար է, ամիս/տարի փոխարկիչ չկա։ Slider-ը «AMD» է, ոչ թե ամսական ներդրում։

Ստուգել. `/donate`։ Why it matters չկա։ Քարտերին և slider-ին ամիս/տարի չկա։

Ֆայլեր. `components/donation-page/DonationPage.tsx`, `lib/constants/donation-page.ts`, `components/donation-page/DonationPatronSlider.tsx`

### B10 — Guardian / Ambassador / Magistr

| | |
|---|---|
| Թերթ | տող 24, N 10, `subscription` |
| % | 80% |
| Սքրինշ | չկա այս տողում (սերտիֆիկատի շարունակությունը B20-ն է) |

Պահանջ. օգտատերն ընտրի 1000 AMD (guardian), 5000 (ambassador), 10000 (magistr)։ Shortcut-ում միայն գումարը, առանց նկարագրության։ Վճարումների տակ երեք նկար և տվյալների դաշտեր, որ հետո սերտիֆիկատ ուղարկվի։

Ինչպես է արված. երեք տարիֆը հենց այս գումարներն են, նկարագրության ցանկը դատարկ է։ Տակը `DonationCertificateBlock` է. երեք շաբլոն (guardian, ambassador, magistr) և դաշտեր։ Շաբլոնները լցվում են ադմինից կամ site settings-ից։ Վճարային checkout-ը առանձին դրոշով է, այս կետի մաս չէ։

Ստուգել. `/donate`։ Երեք գումար, քարտի վրա երկար նկարագրություն չկա։ Ներքևում երեք սերտիֆիկատի տեղ և ձև։ Ադմին՝ `/admin/settings` և donation page content։

Ֆայլեր. `lib/constants/donation-page.ts`, `components/donation-page/DonationCertificateBlock.tsx`, `components/admin/page-content/forms/DonationPageContentForm.tsx`

### B11 — Ֆիլտրի գույները

| | |
|---|---|
| Թերթ | տող 25, N 11, `sections` |
| % | 40% |
| Սքրինշ | ![Քարտեզի ֆիլտրի հաբեր](./screenshots/b11-section-colors.png) |

Պահանջ. միայն ընտրված բաժինը մոխրագույն, մյուսները սև՝ ոսկեգույն տառերով։

Սքրինշ. `All` (ընտրված, բաց) և `Religious Sites`, `Historical Monuments`, `Museums & Galleries`, `Archaeological Sites`, `Other Heritage`։

Ինչպես է արված. `/map`-ում ֆիլտրը overlay է։ Ընտրվածը ոսկե եզր է և ոսկե տեքստ մուգ ֆոնի վրա, մնացածը բաց տեքստ։ Սա սքրինշի «ընտրվածը մոխրագույն, մյուսները սև/ոսկի» կանոնը չէ։

Ստուգել. `/map`։ Սեղմել մեկ ֆիլտր, համեմատել սքրինշի հետ։

Ֆայլեր. `components/map/MapFilterBar.tsx`

### B12 — Ցանկը քարտեզի մեջ

| | |
|---|---|
| Թերթ | տող 26, N 12, `map` |
| % | 80% |
| Սքրինշ | ![Որոնում և վայրերի ցանկ](./screenshots/b12-map-inside.png) |

Պահանջ. այս հատվածը լինի հենց քարտեզի մեջ, քարտեզը հնարավորինս մեծ։

Սքրինշ. որոնման դաշտ և ցանկ (Amberd Fortress, Արամ Խաչատրյանի թանգարան, և այլն)։

Ինչպես է արված. `/map`-ը `embedToolbar` է օգտագործում։ Որոնումը և առաջարկների ցանկը քարտեզի ձախ վերևի վրա են։ Բարձրությունը մոտ `78vh` / `82vh` է։ Ֆիլտրի հաբերը դեռ քարտեզից դուրս են, վերևում։

Ստուգել. `/map` desktop։ Ցանկը քարտեզի վրա է, ոչ թե կողքի սյուն։ Քարտեզը էջի մեծ մասն է զբաղեցնում։

Ֆայլեր. `components/map/MapPanel.tsx`, `app/(public)/map/page.tsx`

### B13 — Բլոգը աշխատում է

| | |
|---|---|
| Թերթ | տող 27, N 13, `blog` |
| % | 70% |
| Սքրինշ | չկա |

Պահանջ. «բլոգը ոնց որ չի աշխատում»։

Ինչպես է արված. `/blog` բացվում է, բերում է հրապարակված գրառումները, կա կատեգորիայի ֆիլտր և ցանց։ Դատարկ բազայի դեպքում ցանցը դատարկ է. դա կոտրված էջ չէ։ Դասավորության պահանջը առանձին է (B21)։

Ստուգել. `/admin/blog/new` ստեղծել published գրառում, բացել `/blog` և `/blog/[slug]`։

Ֆայլեր. `app/(public)/blog/page.tsx`, `components/blog/BlogGrid.tsx`

### B14 — Միատոն սև ֆոն

| | |
|---|---|
| Թերթ | տող 28, N 14, `background` |
| % | 35% |
| Սքրինշ | ![Մուգ ցանցավոր ֆոն](./screenshots/b14-background.png) |

Պահանջ. Donate էջի այս ֆոնը մնացել է AI տարբերակից։ Բոլոր էջերում դարձնել միատոն սև։

Սքրինշ. մուգ ֆոն, բաց ցանց, աջում ոսկեգույն `ST` տառեր։

Ինչպես է արված. էջերը մուգ են, բայց միատոն սև չեն։ Գլխավորը radial, teal glow և diamond grid ունի (`HomeHeritageSections`)։ Donate-ը դեռ `khndzoresk-page` ոճերի վրա է։

Ստուգել. `/donate` և `/`։ Ֆոնը համեմատել սքրինշի ցանցի հետ։ Ցանցը կամ փայլը մնացած լինելը այս կետը բաց է թողնում։

Ֆայլեր. `components/sections/HomeHeritageSections.tsx`, `components/donation-page/donation-page.css`

### B15 — Sign in

| | |
|---|---|
| Թերթ | տող 29, N 15, `sign in` |
| % | 75% |
| Սքրինշ | չկա |

Պահանջ. տեղադրությունը շատ լավ է, ֆոնը իրենք կտան։

Ինչպես է արված. էջը `/login` է։ Ֆոնի վերջնական նկարը այս թերթով չի եկել, դրա համար կետը չի փակվում 100%-ով։

Ստուգել. `/login`։ Ձևի դիրքը կենտրոնում է, մուտքը տանում է պրոֆիլ կամ հետ էջ։

Ֆայլեր. `app/(public)/login/page.tsx`

### B16 — Upcoming-ի ենթակետերը

| | |
|---|---|
| Թերթ | տող 30, N 16, `upcoming projects` |
| % | 35% |
| Սքրինշ | ![Մենյուի ենթակետեր](./screenshots/b16-upcoming-variants.png) |

Պահանջ. հանել տարբերակները, որովհետև բաժինը ենթաբաժին չունի։

Սքրինշ. `UPCOMING PROJECTS` և տակը `Digital Archive`, `Documentary Series`, `Education Programs`, `Global Diaspora Network`։

Ինչպես է արված. `buildProjectsNavItems` դեռ վերցնում է մինչև 6 նախագծի վերնագիր և դնում է դրանք մենյուի տակ։ Բոլոր հղումները տանում են `/projects`, առանձին ենթաէջ չեն։

Ստուգել. հեդեր → Upcoming Projects։ Եթե բացվում է նախագծերի ցանկ, կետը բաց է։ Պետք է մնա մեկ հղում դեպի `/projects`։

Ֆայլեր. `lib/navigation/build-projects-nav.ts`

### B17 — Գործընկերների էջ

| | |
|---|---|
| Թերթ | տող 31, N 17, `partnership page` |
| % | 70% |
| Սքրինշ | չկա |

Պահանջ. էջում միայն գործընկերների shortcut-ները։ Շրջանաձևը լավ չէ։ Մեկ նմուշ, նույնը բոլորին։

Ինչպես է արված. `/partnership` ունի hero, վիճակագրություն և showcase։ Շրջանաձև քարտ այս էջի կոդում չկա։ Գլխավորի լոգոների վազող տողը ուրիշ, ավելի ուշ թերթի կետ է (`docs/feedback-09-10.md`)։

Ստուգել. `/partnership`։ Քարտերը նույն չափի են, շրջան չեն։ Դատարկ գործընկեր չի երևում։

Ֆայլեր. `components/partnership-page/PartnershipPage.tsx`, `components/partnership-page/PartnershipShowcase.tsx`

### B18 — Գրքի ներբեռնում

| | |
|---|---|
| Թերթ | տող 32, N 18, `download` |
| % | 40% |
| Սքրինշ | չկա |

Պահանջ. հատված, որտեղից օգտատերը կարող է օրինակ գիրք ներբեռնել։

Ինչպես է արված. `HeritageDownloadSection` կա, բայց `HERITAGE_DOWNLOADS_HOME_VISIBLE = false`, և գլխավորը այն չի ցույց տալիս։ Առանձին public route չկա։

Ստուգել. `/` վրա download բլոկ չկա։ Կետը բաց է, մինչև բաժինը միանա կամ ստանա իր route-ը։

Ֆայլեր. `components/sections/HeritageDownloadSection.tsx`

### B19 — Featured Treasures խառը դասավորություն

| | |
|---|---|
| Թերթ | տող 33, N 19, `FEATURED TREASURES` |
| % | 85% |
| Սքրինշ | չկա |

Պահանջ. հատվածը լավ է ստացվել, միայն դասավորությունը լինի խառը։

Ինչպես է արված. գլխավորում ցանցը `variant="mosaic"` է. քարտերը նույն ուղղանկյունը չեն, կան բարձր և սովորական տեղեր։ Կարգը ադմինի `featuredOrder` է։

Ստուգել. `/` → Featured Treasures։ Քարտերը մեկ հավասար շարք չեն։ Փոխել կարգը ադմինում և թարմացնել գլխավորը։

Ֆայլեր. `components/sections/featured-treasures/FeaturedTreasuresGrid.tsx`

### B20 — Patron wall-ի փոխարեն սերտիֆիկատ

| | |
|---|---|
| Թերթ | տող 34, N 20, `subscription` |
| % | 45% |
| Սքրինշ | ![Patron wall](./screenshots/b20-subscription.png) |

Պահանջ. հանել այս հատվածը։ Դնել երեք նկարի տեղ, որտեղ ադմինը դնում է սերտիֆիկատի շաբլոնները, և բլոկ, որտեղ օգտատերը լրացնում է տվյալները։

Սքրինշ. `PATRON WALL` / `THOSE WHO ALREADY SUSTAIN`, Gold / Silver / Bronze ցանկերով։

Ինչպես է արված. սերտիֆիկատի երեք տեղը և ձևը կան վճարման բլոկի տակ (B10)։ Patron wall-ը դեռ ռենդերվում է, եթե `patronWall` սեկցիան միացված է։ Սքրինշի բլոկը հանված չէ։

Ստուգել. `/donate`։ Եթե «Those who already sustain» երևում է, կետը բաց է։ Սերտիֆիկատի երեք տեղը պետք է մնա։

Ֆայլեր. `components/donation-page/DonationPage.tsx`, `components/donation-page/DonationPatronWall.tsx`

### B21 — Բլոգի վերևի երեքը և ժամանակագրությունը

| | |
|---|---|
| Թերթ | տող 35, N 21, `բլոգ` |
| % | 35% |
| Սքրինշ | չկա |

Պահանջ. վերևում երեք highlighted, ներքևում թարմացումները ըստ ժամանակի։

Ինչպես է արված. `/blog` բոլոր գրառումները մեկ ցանց է, առանց վերևի երեքի առանձնացման։ Գլխավորի news բլոկը 1 մեծ + կողքի քարտեր է, ոչ թե բլոգի էջի 3+ցանկ։ `featuredOnHome` կա ադմինում, բլոգի էջը այն չի օգտագործում որպես վերևի երեք։

Ստուգել. `/blog`։ Վերևում երեք առանձնացված քարտ չկա։

Ֆայլեր. `app/(public)/blog/page.tsx`, `components/blog/BlogGrid.tsx`

### B22 — Newsletter գրանցված օգտատիրոջը

| | |
|---|---|
| Թերթ | տող 36, N 22 |
| % | 90% |
| Սքրինշ | ![Stay connected](./screenshots/b22-landing-logged-in.png) |

Պահանջ. landing-ից հանել այս բլոկը գրանցված օգտատերերի համար։

Սքրինշ. `STAY CONNECTED TO THE HERITAGE`, email դաշտ, `SUBSCRIBE`, և «Create a free account»։

Ինչպես է արված. այս բլոկը կոդում չկա, ոչ հյուրի, ոչ մուտք գործածի համար։ Պահանջից ուժեղ է. թաքցված չէ միայն գրանցվածներին, հանված է բոլորից։ Hero-ի login կոճակը առանձին է թաքնվում (B2)։

Ստուգել. `/` առանց մուտքի և մուտքով։ «Stay connected» չկա։

Ֆայլեր. `app/(public)/page.tsx`, `components/sections/HomeHeritageSections.tsx`

---

## C — մենյու, լեզու, քարտեզ, հաշիվ

### C1 — Մենյու ըստ կապված sheet-ի

| | |
|---|---|
| Թերթ | տող 38, N 1, `Menu Bar` |
| % | 65% |
| Սքրինշ | `screenshots/c1-menu.png` դատարկ շերտ է (20px), բովանդակություն չունի |

Պահանջ. մենյուն վերցնել միայն [այս կառուցվածքից](https://docs.google.com/spreadsheets/d/1Ynvib2KnK9PnUw0-Zny1rBPEUQtFFV_eTQYSf9kH-80/edit)։ Կարգը խախտված է, մի մասը վերանվանված է, մի մասը հանված։

Կապված sheet-ի սյուները.

- Architecture. Churches & Monasteries, Castles, Museums
- Myths & Gods. Mythology, Legendaries & Heroes
- Icons of History. Kings & Dynasties, Scientists & Inventors, Famous Armenians
- Art & Culture. Paintings, Music, Writers, Taraz, Carpets & Textile Arts
- More Culture. Sculptors, Theatre, Dance, Food & Drink, Publications, Armaments
- Historical Highlights. Historical Events, Capitals, Battles & Wars, Christian Heritage, Chronicles & Manuscripts, Monuments & Landmarks, Traditions
- Առանձին. Heritage Map, Upcoming Projects, Partnership, Donation, About us (Mission, Team, Career, Contact)

Ինչպես է արված. `at-features-culture-menu.ts` վեց սյուն չունի։ More Culture-ը խառնված է Art & Culture-ին (B3), Museums-ը Architecture-ից դուրս է (B4), ավելացված է Epic (B7) և Ornaments։ Armaments չկա։ People սյունը կապված sheet-ի «Icons of History» խմբի փոխարեն է։

Ստուգել. հեդերի Culture մենյուն կողք կողքի դնել կապված sheet-ի հետ։

Ֆայլեր. `lib/navigation/at-features-culture-menu.ts`, `components/navigation/CultureMegaMenu.tsx`

### C2 — Լոգո

| | |
|---|---|
| Թերթ | տող 39, N 2, `Logo` |
| % | 70% |
| Սքրինշ | ![Վահան լոգո](./screenshots/c2-logo.png) |

Պահանջ. մեծացնել լոգոն, որ երևա վահանի սիմվոլիկան։

Սքրինշ. վեցանկյուն վահան, փիրուզ և ոսկի, տակը `ARMENIAN TREASURES`։

Ինչպես է արված. հեդերի լոգոն `header-logo.webp` է, բարձրությունը `7rem`–`8rem` (`--site-header-logo-height`), ոսկե ստվերով։ Սեղմելը տանում է գլխավոր։ Վահանի նկարը asset-ից է. եթե ֆայլում վահանը մանր է, CSS-ը այն չի վերանկարի։

Ստուգել. `/` հեդեր, desktop և mobile։ Վահանը կարդացվում է առանց մոտեցնելու։ Սեղմելը բացում է `/`։

Ֆայլեր. `components/brand/Logo.tsx`, `app/globals.css`, `public/images/brand/header-logo.webp`

### C4 — Իկոններ

| | |
|---|---|
| Թերթ | տող 40, N 4, `Icons` |
| % | 50% |
| Սքրինշ | ![Ոսկե զարդանախշ քարտեր](./screenshots/c4-icons.png) |

Պահանջ. պատուհանների իկոնները չոր են և փիրուզ։ Լինեն ոսկեգույն, հայկական զարդանախշով, պրեզենտացիայի նման։ Պրեզենտացիա՝ [Drive](https://drive.google.com/file/d/10VTjoz6Uug9xhJbDyKNkyaFix6UzQVnI/view)։

Սքրինշը նմուշն է. B2C, B2B, Education, Tourism, Grants, Donations, ոսկե գծանկար սև քարտի վրա։

Ինչպես է արված. մենյուի մի մասը ornamental իկոն է ոսկե երանգով։ Կատալոգի քարտերը դեռ Lucide են (`MapPin`, `Box`)։ Քարտեզի ֆիլտրը նույնպես Lucide է։ Սքրինշի վեց քարտը որպես իկոնների հավաքածու չի կիրառվել։

Ստուգել. Culture մենյու և `/culture/heritage`։ Համեմատել սքրինշի ոսկե զարդի հետ։

Ֆայլեր. `components/icons/CultureOrnamentalIcon.tsx`, `components/culture-catalog/CultureCatalogItemGrid.tsx`

### C5 — Լեզուներ և enable/disable

| | |
|---|---|
| Թերթ | տող 41, N 5, `Language` |
| % | 70% |
| Սքրինշ | ![Լեզուների դաշտի կտրվածք](./screenshots/c5-languages.png) |

Պահանջ. հայերեն, ռուսերեն, անգլերեն, ֆրանսերեն, պորտուգալերեն։ Տեքստը կտան իրենք, կամ կլցնեն ադմինից։ Ֆրոնտում լեզուն հնարավոր լինի միացնել և անջատել։

Ինչպես է արված. հինգ լեզուն էլ կա, գումարած արևմտահայերենը (A3)։ `/admin/settings` `enabledLocales` է պահում, անջատիչը ցույց է տալիս միայն միացվածները։ UI քրոմի թարգմանությունները կան։ CMS նյութերի բոլոր լեզուներով լցնելը կոնտենտ է, ոչ թե բացակա դաշտ։ Seed-ը հիմնականում անգլերեն է։

Ստուգել. `/admin/settings` անջատել օրինակ ֆրանսերենը, պահպանել, թարմացնել հեդերը։ FR չկա։ Նորից միացնել։ Հոդվածի ադմինում լեզվի թաբերը առանձին են պահում վերնագիրը։

Ֆայլեր. `lib/i18n/locale-config.ts`, `components/admin/SiteLocaleSettingsField.tsx`, `components/navigation/LanguageSelector.tsx`

### C6 — Գլխավորի սեկցիաների կարգ

| | |
|---|---|
| Թերթ | տող 42, N 6, `Home page` |
| % | 75% |
| Սքրինշ | չկա |

Պահանջ. Hero, Statistic widget, Website features explorer, Interactive map, Culture fields icons, News feed, Upcoming highlights, Partnership icons footer։ Նմուշը Figma-ի hero էջն է։

Ինչպես է արված. կարգը մոտ է. hero (վիճակագրությունը hero-ի մեջ է), Cultural Portal, map, featured, news, upcoming, partnership logos։ Առանձին «features explorer» սեկցիա գլխավորում չկա (B1-ի չորս քարտը հանված է գլխավորից)։ Figma-ի պիքսելային համընկնումը այս կետով չի ստուգվում. լինքը թերթում չկա, այն կապված sheet-ի Landing տողում է։

Ստուգել. `/` վերևից ներքև։ Partnership շարքը վերջում է։ Donate բլոկ գլխավորում չկա։

Ֆայլեր. `components/sections/HeroHome.tsx`, `components/sections/HomeHeritageSections.tsx`

### C7 — Կենդանի ֆոն

| | |
|---|---|
| Թերթ | տող 43, N 7, `Visualisation` |
| % | 40% |
| Սքրինշ | չկա |

Պահանջ. էջը դատարկ և ստատիկ է։ Թեմային ֆոներ, որ կայքը խորը զգացվի։ Նկար կարող են տալ։

Ինչպես է արված. գլխավորը ունի radial, թույլ ցանց և բաժանարար գծեր։ Լուսանկարային ֆոն սեկցիաների մեծ մասում չկա։ Նկարները կախված են CMS-ից (`heroImage`, քարտի նկար)։

Ստուգել. `/` ամբողջ երկարությամբ։ Դատարկ սև դաշտերը, որտեղ սքրինշով նկար էր սպասվում, այս կետն են։

Ֆայլեր. `components/sections/HomeHeritageSections.tsx`, `app/globals.css`

### C8 — Իմերսիվ քարտեզ

| | |
|---|---|
| Թերթ | տող 44, N 8, `the map` |
| % | 45% |
| Սքրինշ | չկա |

Պահանջ. քարտեզի հիմքը դեռ կտան։ Մինչ այդ՝ ավելի թվային, էֆեկտներով, անիմացիայով, ինտերակտիվ pin-երով։

Ինչպես է արված. `/map` Leaflet է, pin-ը բացում է նյութը, կա որոնում և ֆիլտր։ Սեփական քարտեզի հիմք, 3D և անիմացված pin չկա։ Հիմքը թերթի տեքստով դեռ իրենց կողմից է։

Ստուգել. `/map`։ Pin սեղմելը բացում է քարտը։ Անիմացիա և սեփական tiles չկան։

Ֆայլեր. `components/map/LeafletMap.tsx`, `components/map/MapPanel.tsx`

### C11 — Մոբայլ

| | |
|---|---|
| Թերթ | տող 45, N 11, `Mobile version` |
| % | 50% |
| Սքրինշ | չկա |

Պահանջ. մոբայլն ավելի չոր է և դանդաղ, տեքստը նորմալ բացվում է։

Ինչպես է արված. էջերը responsive են, մենյուն `MobileMenu` ակորդեոն է։ Առանձին մոբայլ արտիստիկ շերտ կամ արագության չափում այս կետով չկա։

Ստուգել. `/` և `/culture/heritage` 390px լայնքով։ Մենյուն բացվում է, տեքստը չի կտրվում էկրանից դուրս, հիմնական սեղմումները աշխատում են։

Ֆայլեր. `components/navigation/MobileMenu.tsx`

### C12 — Բաժինների կապը

| | |
|---|---|
| Թերթ | տող 46, `connections` |
| % | 80% |
| Սքրինշ | չկա |

Պահանջ. եկեղեցիներից կարելի է վերադառնալ ճարտարապետություն, բայց ճարտարապետություն բաժինն ինքը ընտրելի չէ։

Ինչպես է արված. կատալոգի breadcrumb-ը ծնողին հղում է տալիս։ Մենյուի սյան վերնագիրն էլ հղում է (`/culture/architecture`)։ Ծնող էջը hub է. ենթաբաժինների ցանց, ոչ թե փակուղի։

Ստուգել. `/culture/architecture/churches` → breadcrumb-ի Architecture → `/culture/architecture`։ Նույնը մենյուի սյան վերնագրով։

Ֆայլեր. `lib/culture-catalog/build-culture-breadcrumb.ts`, `lib/navigation/at-features-culture-menu.ts`

### C13 — News feed

| | |
|---|---|
| Թերթ | տող 47, `news feed/blog` |
| % | 65% |
| Սքրինշ | չկա |

Պահանջ. առանձին news/blog, որտեղ երևա ինչ է արվել գումարով։ Տեղը մոտավորապես Donation-ի և About-ի միջև։ Վիդեո, նկար, տեքստ։ Հնարավորության դեպքում Meta, one click հրապարակում։

Ինչպես է արված. `/blog` և գլխավորի news սեկցիան կան։ Ադմինը գրառմանը դնում է կազմ, տեքստ, կարող է վիդեո/պատկեր։ Գրառումը featured-ով ընկնում է գլխավոր։ Meta one-click չկա։ Դիրքը գլխավորի featured-ից հետո է, ոչ թե Donation և About-ի միջև։

Ստուգել. `/admin/blog/new` հրապարակել, բացել `/blog/[slug]` և `/` news բլոկը։ Սոցիալական հրապարակման կոճակ չկա։

Ֆայլեր. `components/sections/HomeNewsFeedSection.tsx`, `app/(public)/blog/page.tsx`

### C14 — Գրանցում

| | |
|---|---|
| Թերթ | տող 48, `add registration section` |
| % | 75% |
| Սքրինշ | չկա |

Պահանջ. գրանցում, որ օգտատերերին հետևեն և հանգանակության outreach անեն։

Ինչպես է արված. `/register`, `/login`, `/profile` կան։ Ադմինը տեսնում է օգտատերերին `/admin/users` և անդամի նվիրատվությունները `/admin/member-donations`։ Էլփոստով outreach-ի ավտոմատ շղթա չկա։

Ստուգել. `/register` ստեղծել հաշիվ, մտնել `/profile`։ Ադմինում `/admin/users` նոր տողը երևում է։

Ֆայլեր. `app/(public)/register/page.tsx`, `app/(admin)/admin/(panel)/users/page.tsx`

---

## Ամփոփումը թերթում

Տող 50-ը task չէ։ Հաճախորդի ամփոփումը չորս թեմա է. վիզուալներ, նկարների պակաս, կառուցվածք, քարտեզի տեսլական։ Դրանք ծածկում են C2, C4, C7, C1, C8։
