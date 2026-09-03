# Feedback for web — առաջադրանքներ և առաջընթաց

Աղբյուր՝ [feedback for web](https://docs.google.com/spreadsheets/d/1p79Zqe-LfEtn6zRITd0ahO-734C8b8S1NGg-wy5_Oak/edit?gid=250606401#gid=250606401)  
Աուդիտ՝ 2026-08-31, ըստ ընթացիկ կոդի (ոչ sheet-ի `in process` նշման)։  
Իրականացում՝ 2026-09-03 (կոդը պատրաստ է, տես ներքևի deploy նշումը)։

Sheet-ում բոլոր կետերը նշված են `in process`։ Այստեղ տոկոսը ցույց է տալիս **ինչքանն է արդեն կոդում**, համեմատած հաճախորդի պահանջի հետ։

**Ընդհանուր առաջընթաց՝ ~84%**

| Կարգավիճակ | Քանակ | Չափանիշ |
|------------|------:|---------|
| Done | 28 | ≥ 90% |
| Partial | 7 | 15–89% |
| Missing | 0 | 0–14% |

**Deploy.** Neon schema-ն 2026-09-03-ին համաժամեցված է. failed `20260709140000_add_culture_item_card_background`-ը նշվել է applied (սյուներն արդեն կային), հետո կիրառվել են բաց migration-ները՝ ներառյալ `20260903120000_feedback_web_tasks` (map URL, blog assets, about shortcuts, certificates, նոր MapType)։

**Դեռ բաց.** #20 առանձին sub-page hero CMS դաշտ չկա (կա menu card image)։ #30 chrome + CMS-ը թարգմանվում են, բայց ոչ ամեն hardcoded UI տող։ #31 About վիզուալ redesign-ը sheet-ում միայն նկար է՝ առանց տեքստի։ Կարճ `maps.app.goo.gl` հղումները կոորդինատ չեն տալիս heritage քարտեզին. պետք է լրիվ `@lat,lng` URL։

---

## Ամփոփ աղյուսակ

| # | Բաժին | Առաջադրանք | Կարգավիճակ | % |
|---|--------|------------|------------|--:|
| 01 | Admin | Լեզուները չխառնել բովանդակությունը | Done | 90% |
| 02 | Highlights | Երկրորդ էջ՝ 30 highlighted հոդված | Done | 95% |
| 03 | Article | Card image-ը չերևա public-ում | Done | 95% |
| 04 | Admin | Description-ից հանել block image / caption | Done | 95% |
| 05 | Map | Կոորդինատների փոխարեն link դաշտ | Done | 90% |
| 06 | Map | Show in public — անջատած ժամանակ չերևա | Done | 90% |
| 07 | Map | Pin տեսակներ՝ 9 տիպ × 6 լեզու | Done | 90% |
| 08 | Virtual tour | LiDAR / 3D Scanning / Drone Photogrammetry | Done | 90% |
| 09 | Virtual tour | Հանել նկարի upload | Done | 95% |
| 10 | Video | Էսթետիկ shortcut քարտ, ոչ հում embed | Done | 90% |
| 11 | Gallery | Հանել ALT Text դաշտը admin-ից | Done | 95% |
| 12 | Homepage | Blog shortcut-ների իկոնները կոտրված են | Partial | 85% |
| 13 | Blog | Վիզուալը խառն է / անհասկանալի | Partial | 80% |
| 14 | Blog | Առանձին cover, background, header | Done | 90% |
| 15 | Blog | Gallery բաժին՝ cultural portal-ի տրամաբանությամբ | Done | 90% |
| 16 | UX | Էջափոխման սպիտակ ֆոն + loading icon | Done | 95% |
| 17 | Menu | Մեծացնել menu bar-ի չափերը | Partial | 80% |
| 18 | Home | Discover more highlights = 6-րդ shortcut | Done | 95% |
| 19 | Logo | Քլիքը տանի էջի ամենավերև | Done | 95% |
| 20 | Sub-catalog | Admin-ում կառավարելի background-ներ | Done | 90% |
| 21 | Sub-catalog | Shortcut-երը կենտրոնում | Done | 90% |
| 22 | Article | Հանել Entry details-ը public-ից | Done | 95% |
| 23 | Gallery | Lightbox / մեծացում չի աշխատում | Done | 90% |
| 24 | Article | Visual assets-ը չերևա public-ում | Done | 95% |
| 25 | Virtual tour | Լայն embed, առանց կողքի Tour type / Access | Done | 90% |
| 26 | Typography | Հայերեն վերնագրի տառատեսակ | Partial | 85% |
| 27 | Article | Description — less / more | Done | 90% |
| 28 | Team | Նկարները կայքում չեն երևում | Done | 90% |
| 29 | Team | Admin-ում խմբագրում | Done | 90% |
| 30 | i18n | Ողջ կայքի թարգմանություն, ոչ միայն Contact | Partial | 60% |
| 31 | About us | Էջի փոփոխություն (sheet-ում միայն նկար) | Partial | 50% |
| 32 | About us | Shortcut-ներին background | Done | 90% |
| 33 | Blog | Բլոգի redesign | Partial | 80% |
| 34 | Donation | Հաշվիչի bug | Done | 90% |
| 35 | Admin | Սերտիֆիկատի upload բաժին | Done | 90% |

---

## 01 — Admin լեզուները խառնում են բովանդակությունը

**Բաժին:** Admin panel  
**%:** 35%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1yL4BAva7CwYb3q-5Rkz_gDYOuYvIkpk7/view?usp=drive_link)

### Պահանջ

Admin-ում լեզու փոխելիս տեղեկատվությունը չպետք է խառնվի։ Publish անելուց հետո այլ լեզվով լցնելիս նախորդ լեզվի տվյալները չպետք է կորչեն կամ խաչվեն։

### Ինչ կա հիմա

- `title` և `shortDescription` պահվում են per-locale (hidden fields + locale tab)։
- `mediaContent` (description blocks, tours, videos, gallery) **մեկ JSON է բոլոր լեզուների համար**։ Locale փոխելիս ու save անելիս ընդհանուր body-ն կարող է overwrite լինել։

### Մնացած

- [ ] `mediaContent`-ը դարձնել locale-keyed
- [ ] Locale tab փոխելիս չկորցնել չպահված այլ լեզվի դաշտերը
- [ ] Publish-ից հետո նոր լեզու լցնելը չպետք է ազդի արդեն լցված լեզվի վրա

**Ֆայլեր:** `CultureItemEditorMetaBar.tsx`, `lib/culture-item-media.ts`, `lib/i18n/translatable-content.ts`

---

## 02 — Երկու highlight էջ (landing + 30 հոդված)

**Բաժին:** Highlights  
**%:** 90%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1r1nQAFq3LFFkEc1dmzaL2vthIQ4YLZHK/view?usp=sharing)

### Պահանջ

Երկու էջ՝ (1) landing-ի highlights, որը աշխատում է, (2) առանձին էջ 30 highlighted հոդվածով։ Admin-ում կոճակը կա, կայքում երկրորդ էջը չէր գտնվում։

### Ինչ կա հիմա

- Landing mosaic՝ top 5 featured (`featuredOnHome`)։
- `/highlights` էջը կա, բեռնում է մինչև 30 item (homepage-ի 5-ը բացառված)։
- Admin-ում Featured Highlight կոճակը կա։
- Մուտքը կայքում՝ homepage-ի 6-րդ shortcut (`Discover more highlights`)։ Primary nav-ում առանձին link չկա, դրա համար հաճախորդը կարող էր չգտնել։

### Մնացած

- [ ] Ավելի տեսանելի մուտք (nav կամ footer), եթե landing shortcut-ը բավարար չի համարվում
- [ ] Հաստատել Neetrino-ի հետ՝ էջը գտնվո՞ւմ է staging/prod-ում

**Ֆայլեր:** `app/(public)/highlights/page.tsx`, `lib/queries/culture-items.ts`, `FeaturedTreasuresGrid.tsx`

---

## 03 — Card image-ը չպետք է երևա public էջում

**Բաժին:** Article  
**%:** 10%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1UIVLqdViOiCl5ghMUmZSfP1_K1JJhGML/view?usp=drive_link)

### Պահանջ

Card image-ը միայն կատալոգի քարտի համար է։ Հոդվածի public էջում չպետք է երևա (հավանաբար bug)։

### Ինչ կա հիմա

- Hero-ն fallback է անում `coverImage` → **`item.image` (card image)**։
- `card-image` սեկցիան public-ում ցույց է տալիս Visual Assets / Card photo։

### Մնացած

- [ ] Public hero-ում չօգտագործել `item.image`, միայն `coverImage`
- [ ] Հանել Visual Assets սեկցիան public-ից (տես նաև #24)

**Ֆայլեր:** `CultureItemDetailView.tsx`, `CultureItemCardAssetsSection.tsx`

---

## 04 — Description block-ից հանել block image և caption

**Բաժին:** Admin / Article  
**%:** 0%  
**Screenshot:** [Drive](https://drive.google.com/file/d/19-tOO7VwBHuJwk3vwkUeycbJ3uAGZKTQ/view?usp=drive_link)

### Պահանջ

Description block-ում մնան միայն տեքստային դաշտերը։ Block image և image caption հնարավորությունները հանել։

### Ինչ կա հիմա

Admin-ում դեռ կան Block image + Image caption։ Public-ը նույնպես render է անում `block.image` / `block.caption`։

### Մնացած

- [ ] Հանել դաշտերը admin UI-ից
- [ ] Հանել public render-ը
- [ ] Կարող է մնալ schema-ում backward compatibility-ի համար, բայց նոր գրառումներում չօգտագործել

**Ֆայլեր:** `CultureItemDescriptionBlocksField.tsx`, `lib/culture-item-media.ts`, `CultureItemMediaSections.tsx`

---

## 05 — Map՝ կոորդինատների փոխարեն link

**Բաժին:** Map  
**%:** 0%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1AAbzLO6ksdTRz5W4mAWWB5FWzS6yYo4x/view?usp=drive_link)

### Պահանջ

Հանել latitude / longitude պատուհանները։ Փոխարենը՝ link տեղադրելու դաշտ (օր. Google Maps / OSM)։

### Ինչ կա հիմա

Prisma-ում միայն `latitude` / `longitude`։ Admin-ում draggable pin + թվային դաշտեր։ `mapUrl` դաշտ չկա։

### Մնացած

- [ ] Schema՝ `mapUrl` (կամ համարժեք)
- [ ] Admin՝ հանել coord inputs, ավելացնել link
- [ ] Public՝ քարտեզը/կոճակը բացի այդ link-ով, ոչ թե ներկառուցված Leaflet pin-ով (հաստատել exact UX)

**Ֆայլեր:** `prisma/schema.prisma`, `AdminLocationMapField.tsx`, `lib/validation/admin.ts`

---

## 06 — Map «Show in public» bug

**Բաժին:** Map  
**%:** 20%  
**Screenshot:** նույնը ինչ #05

### Պահանջ

Եթե checkbox-ը նշված չէ, map-ը հոդվածի էջում չպետք է երևա։

### Ինչ կա հիմա

- Admin checkbox՝ `showOnMap`։
- Heritage `/map` էջը ֆիլտրում է `showOnMap: true`։
- Հոդվածի **Location & Geography** բլոկը **չի ստուգում** `showOnMap`։ Եթե կոորդինատ չկա, fallback է անում Երևանի default կոորդինատներին, և քարտեզը միևնույնն է երևում։

### Մնացած

- [ ] `CultureItemMediaSections` map case-ում հարգել `showOnMap`
- [ ] Չցուցադրել default Yerevan pin, երբ map-ը անջատված է կամ կոորդինատ չկա

**Ֆայլեր:** `AdminLocationMapField.tsx`, `CultureItemMediaSections.tsx`, `lib/culture-catalog/culture-item-map.ts`

---

## 07 — Map pin option-ներ (9 տեսակ × 6 լեզու)

**Բաժին:** Map  
**%:** 25%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1mvlH8Kvq4enZ0nQBmoEs16sbsk8KZc8q/view?usp=drive_link)  
**Թարգմանությունների sheet:** [gid=1412777853](https://docs.google.com/spreadsheets/d/1p79Zqe-LfEtn6zRITd0ahO-734C8b8S1NGg-wy5_Oak/edit?gid=1412777853#gid=1412777853)

### Պահանջվող տեսակներ

| Արևելահայերեն | Արևմտահայերեն | English | Русский | Français | Português |
|---|---|---|---|---|---|
| Վանք / վանական համալիր | Վանք / վանական համալիր | Monastery / Monastic Complex | Монастырь / монастырский комплекс | Monastère / Ensemble monastique | Mosteiro / Complexo monástico |
| Եկեղեցի / տաճար | Եկեղեցի / տաճար | Church / Cathedral | Церковь / собор | Église / Cathédrale | Igreja / Catedral |
| Մատուռ / սրբավայր | Մատուռ / սրբավայր | Chapel / Shrine | Часовня / святилище | Chapelle / Sanctuaire | Capela / Santuário |
| Բերդ / ամրոց | Բերդ / ամրոց | Fortress / Castle | Крепость / замок | Forteresse / Château | Fortaleza / Castelo |
| Պատմական բնակավայր | Պատմական բնակավայր | Historical Settlement | Историческое поселение | Localité historique | Povoado histórico |
| Թանգարան | Թանգարան | Museum | Музей | Musée | Museu |
| Հուշահամալիր | Յուշահամալիր | Memorial Complex | Мемориальный комплекс | Complexe mémoriel | Complexo memorial |
| Խաչքար | Խաչքար | Khachkar | Хачкар | Khatchkar | Khachkar |
| Այլ | Այլ | Other | Другое | Autre | Outro |

### Ինչ կա հիմա

`MapType` enum՝ `MONASTERY`, `FORTRESS`, `MUSEUM`, `CHURCH`, `ARCHAEOLOGICAL`, `OTHER`։ Միայն անգլերեն լեյբլներ։ Բացակայում են Chapel/Shrine, Historical Settlement, Memorial Complex, Khachkar։ `ARCHAEOLOGICAL`-ը sheet-ում չկա։

### Մնացած

- [ ] Թարմացնել enum + migration
- [ ] 6-լեզու լեյբլներ admin + public map filter-ում
- [ ] Քարտեզի pin իկոնները տեսակներին համապատասխանեցնել (sheet screenshot)

**Ֆայլեր:** `prisma/schema.prisma`, `lib/admin/enum-labels.ts`

---

## 08 — Virtual tour տեսակներ

**Բաժին:** Virtual tour  
**%:** 30%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1NLZX0Fcajo-imVEA_ReA65tgyDoikXdt/view?usp=drive_link)

### Պահանջ

Տարբերակներ՝ **LiDAR Scanning**, **3D Scanning**, **Drone Photogrammetry**։

### Ինչ կա հիմա

`TOUR_TYPE_OPTIONS`՝ LiDAR, Matterport, 3D Model, Other։ Պահանջված սեթը չի համընկնում (չկա Drone Photogrammetry, կա Matterport/Other)։

### Մնացած

- [ ] Փոխարինել option list-ը sheet-ի երեք արժեքներով
- [ ] Migration / mapping հին `MATTERPORT` / `OTHER` արժեքների համար

**Ֆայլեր:** `lib/culture-item-media.ts`, `CultureItemToursField.tsx`

---

## 09 — Virtual tour-ից հանել նկարի upload

**Բաժին:** Virtual tour  
**%:** 0%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1bmv2QGJd3rUPscHNKgNS93v14EyZyyFi/view?usp=drive_link)

### Պահանջ

Virtual tour admin բլոկում նկար ներբեռնելու հնարավորություն չլինի։

### Ինչ կա հիմա

`CultureItemToursField`-ում Preview image dropzone դեռ կա (`previewImage`)։

### Մնացած

- [ ] Հանել preview image UI-ն
- [ ] Public-ում չապավինել `tour.previewImage`-ին որպես հիմնական տեսք

**Ֆայլեր:** `CultureItemToursField.tsx`, `lib/culture-item-media.ts`

---

## 10 — Video-ները որպես expressive shortcut

**Բաժին:** Video  
**%:** 55%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1ANlRdiHbTJixHJq0e0579z5oreE7AEW7/view?usp=drive_link)

### Պահանջ

Video-ն բացվի link-ով, բայց public-ում չլինի տգեղ հում embed։ Պետք է արտահայտիչ shortcut քարտի նման լինի։

### Ինչ կա հիմա

Iframe չկա։ Կա preview նկար + «Watch video» հղում։ Layout-ը դեռ `tour-grid` է կողքի «Format / Story film» panel-ով, ոչ թե ինքնուրույն shortcut քարտ։

### Մնացած

- [ ] Shortcut քարտի դիզայն (մեծ preview, overlay play, առանց side facts)
- [ ] Հաստատել՝ click-ը նոր tab է, թե lightbox player

**Ֆայլեր:** `CultureItemMediaSections.tsx` (`case 'videos'`)

---

## 11 — Gallery-ից հանել ALT Text

**Բաժին:** Gallery  
**%:** 0%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1ZtZi5JkRwSxIwTdAWM8volQpxBBxWCPT/view?usp=drive_link)

### Պահանջ

Admin Gallery-ում ALT Text պատուհանը հանել։

### Ինչ կա հիմա

Դաշտը կա և persist է լինում `gallery[].alt`։

### Մնացած

- [ ] Հանել admin դաշտը
- [ ] Public `alt`-ի համար օգտագործել caption կամ item title (a11y-ն չկորցնել)

**Ֆայլեր:** `CultureItemGalleryBlocksField.tsx`, `lib/culture-item-media.ts`

---

## 12 — Homepage blog shortcut իկոնները թռած են

**Բաժին:** Homepage  
**%:** 40%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1qNrGXWuO6OZ_B_-F0A5IGf_0v3Xu--jD/view?usp=drive_link)

### Պահանջ

Blog shortcut-ների իկոնները պետք է երևան, ոչ թե բացակայեն / «թռած» լինեն։

### Ինչ կա հիմա

Blog քարտերը hardcode են `icon: 'publications'`։ Իկոնները գալիս են cultural-portal icon pipeline / R2։ Եթե asset-ը չկա կամ ֆոնի վրա չի երևում, իկոնը «թռած» է երևում։

### Մնացած

- [ ] Ապահովել icon asset-ը homepage blog քարտերի վրա
- [ ] Կոնտրաստ / overlay, որ իկոնը ֆոնի վրա տեսանելի լինի

**Ֆայլեր:** `lib/mappers/featured-treasures.ts`, `HomeNewsFeedSection.tsx`, `lib/constants/cultural-portal-icon-sources.ts`

---

## 13 — Blog բաժինը վիզուալ խառն է

**Բաժին:** Blog  
**%:** 40%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1H1u8bG4dGmKc_u_m2nk7NBU2INO_iY7x/view?usp=drive_link)

### Պահանջ

Blog հատվածը անհասկանալի ու խառն է։ Խնդրում են այլ վիզուալ տարբերակ առաջարկել։

### Ինչ կա հիմա

Highlighted + chronological split, heritage landing shell։ Երկու header / մրցող layout-ներ։ Redesign չի արված, առաջարկ client-ին չի ուղարկվել որպես առանձին mockup։

### Մնացած

- [ ] Նոր layout առաջարկ (կարող է կապված լինել #33-ի հետ)
- [ ] Հաճախորդի հաստատումից հետո իրականացում

**Ֆայլեր:** `components/blog/BlogGrid.tsx`, `app/(public)/blog/page.tsx`, `blog.css`

---

## 14 — Blog՝ առանձին cover / background / header

**Բաժին:** Blog  
**%:** 15%  
**Screenshot:** [Drive](https://drive.google.com/file/d/17Y0SR2BYx1gD_Lr0iqqRMbWutNJDVlTI/view?usp=drive_link)

### Պահանջ

Առանձին upload՝ **cover visual**, **article background**, **article header**։

### Ինչ կա հիմա

`BlogPost.image`՝ մեկ նկար, օգտագործվում է և քարտի, և hero-ի համար։

### Մնացած

- [ ] Schema՝ երեք առանձին դաշտ
- [ ] Admin երեք upload
- [ ] Public՝ cover → listing, header → article top, background → էջի ֆոն

**Ֆայլեր:** `prisma/schema.prisma` (`BlogPost`), `BlogForm.tsx`, `BlogDetailView.tsx`

---

## 15 — Blog-ում Gallery բաժին

**Բաժին:** Blog  
**%:** 0%

### Պահանջ

Blog-ում ավելացնել gallery՝ նույն տրամաբանությամբ, ինչ cultural portal-ում։

### Ինչ կա հիմա

Gallery մոդել / UI blog-ի վրա չկա։

### Մնացած

- [ ] Gallery JSON կամ related table
- [ ] Admin blocks (image / before-after, եթե portal-ի պես)
- [ ] Public gallery grid + lightbox (#23-ի հետ միասին)

---

## 16 — Էջափոխման սպիտակ ֆոն + loading icon

**Բաժին:** UX  
**%:** 5%

### Պահանջ

Մեկ էջից մյուսին անցնելիս սպիտակ հետնանկար ու loading icon չհայտնվի։

### Ինչ կա հիմա

- `app/loading.tsx` — full-screen parchment + spinner + «Loading…»
- `app/(public)/loading.tsx` — spinner, մին. 40vh

Սա Next.js App Router-ի route-level `loading.tsx` UI-ն է, որը navigation-ի ժամանակ երևում է։

### Մնացած

- [ ] Հանել կամ փոխարինել overlay-ը (instant transition / shared layout առանց spinner)
- [ ] Չթողնել սպիտակ/պարզ ֆոնի flash

**Ֆայլեր:** `app/loading.tsx`, `app/(public)/loading.tsx`

---

## 17 — Մեծացնել menu bar-ը

**Բաժին:** Menu  
**%:** 35%  
**Screenshot:** [Drive](https://drive.google.com/file/d/144l9YPruEK76Bkft8s_9R5ikr1PlofCh/view?usp=drive_link)

### Պահանջ

Menu bar-ը շատ փոքր ու աննշան է, չափերը մեծացնել։

### Ինչ կա հիմա

Logo-ի բարձրությունը մեծացված է (`--site-header-logo-height` ~6.75–7.5rem)։ Primary nav լեյբլները դեռ ~`text-[9.5px]` Cinzel են։

### Մնացած

- [ ] Nav label font-size / tracking / hit area
- [ ] Desktop + mobile համեմատել screenshot-ի հետ

**Ֆայլեր:** `app/globals.css`, `components/navigation/nav-styles.ts`, `HeaderBar.tsx`, `Logo.tsx`

---

## 18 — Discover more highlights = 6-րդ shortcut

**Բաժին:** Home  
**%:** 95%  
**Screenshot:** [Drive](https://drive.google.com/file/d/19i6_21TA4gAwoALFwu40tgeNb5vkQIvB/view?usp=drive_link)

### Պահանջ

«Discover more highlights»-ը լինի 6-րդ shortcut-ը (5 featured + այս քարտը)։

### Ինչ կա հիմա

`FeaturedTreasuresGrid` `showDiscoverMore`-ով ավելացնում է `DISCOVER_MORE_HIGHLIGHTS_TREASURE` որպես 6-րդ item, href `/highlights`։

### Մնացած

- [ ] Վիզուալ review screenshot-ի դեմ (icon / copy)

**Ֆայլեր:** `FeaturedTreasuresGrid.tsx`, `lib/constants/featured-treasures.ts`

---

## 19 — Լոգոյի քլիքը տանի ամենավերև

**Բաժին:** Header  
**%:** 70%

### Պահանջ

Լոգոյին սեղմելիս հայտնվի էջի ամենավերևում։

### Ինչ կա հիմա

Logo-ն `href="/"` է՝ այլ էջից տանում է home։ Եթե արդեն `/`-ի վրա ես ու scroll արել ես ներքև, Next.js նույն route-ը չի scroll անում վերև։

### Մնացած

- [ ] Home-ում լինելիս logo click → `window.scrollTo` / `#top`

**Ֆայլեր:** `components/brand/Logo.tsx`

---

## 20 — Sub-catalog admin-կառավարելի background-ներ

**Բաժին:** Sub-catalog  
**%:** 60%  
**Screenshot:** [Drive](https://drive.google.com/file/d/14YJyMIGgzGJKPQtuWtc8JvCL7ilgUDx3/view?usp=drive_link)

### Պահանջ

Culture portal-ի sub բաժինները ունենան admin-ում կառավարելի background-ներ։

### Ինչ կա հիմա

`CultureMenuItem.image`-ը օգտագործվում է hub shortcut քարտերի ֆոնի համար։ Առանձին per-section hero/background CMS ամբողջությամբ չկա։

### Մնացած

- [ ] Հաստատել՝ միայն shortcut քա՞րտ, թե նաև sub-page hero
- [ ] Եթե hero էլ է պետք՝ առանձին դաշտ admin-ում

**Ֆայլեր:** `CultureMenuForm.tsx`, `CultureCatalogSubcategoryGrid.tsx`

---

## 21 — Sub shortcut-երը կենտրոնում

**Բաժին:** Sub-catalog  
**%:** 45%  
**Screenshot:** [Drive](https://drive.google.com/file/d/167t4F4h0FMaHLrBpkB8QyRvxhsbmQHB_/view?usp=drive_link)

### Պահանջ

Sub բաժինների shortcut-երը ունենան կենտրոնական դիրք։

### Ինչ կա հիմա

Քարտի վերնագրերը hub mode-ում կենտրոնացված են։ Grid-ը `auto-fill` է և ձախից է լցվում, ոչ թե կենտրոնացված շարք։

### Մնացած

- [ ] Կենտրոնացնել grid-ը (justify/place), հատկապես երբ քարտերը 2–4 հատ են

**Ֆայլեր:** `culture-catalog-page.css`, `CultureCatalogSubcategoryGrid.tsx`

---

## 22 — Հանել Entry details-ը public-ից

**Բաժին:** Article  
**%:** 0%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1t64589mUBsIEjXDDMyHcY6sLn2eAHIR_/view?usp=drive_link)

### Պահանջ

Entry details բլոկը հանել հոդվածի public էջից։

### Ինչ կա հիմա

`CultureItemDetailView`-ում կա «Entry Detail» + fact cards (Type, Region, Location, Period, Century, Year, Map category, Coordinates)։

### Մնացած

- [ ] Հանել `#detail` facts aside-ը
- [ ] Stats bar-ը (Region / Period / Type) թողնել կամ հանել՝ հաստատել հաճախորդի հետ (13.08-ում stats bar-ը մնացել էր)

**Ֆայլեր:** `CultureItemDetailView.tsx`

---

## 23 — Gallery-ն չի մեծանում

**Բաժին:** Gallery  
**%:** 0%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1Gzsq6U6i0QKAdT1PiCFR6mW8uyskkW1i/view?usp=drive_link)

### Պահանջ

Gallery նկարը սեղմելիս պետք է մեծանա (lightbox / zoom)։ Հիմա չի աշխատում։

### Ինչ կա հիմա

`GalleryItem`-ը ստատիկ `<Image>` է, click handler / dialog չկա։

### Մնացած

- [ ] Lightbox (dialog + keyboard + next/prev)
- [ ] Կիրառել նաև blog gallery-ի վրա, երբ #15-ն ավելանա

**Ֆայլեր:** `CultureItemMediaSections.tsx` (`GalleryItem`)

---

## 24 — Visual assets-ը չերևա public հոդվածում

**Բաժին:** Article  
**%:** 0%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1Td8rn4BYmodZEAM7k99iZdoFdHuIxuzF/view?usp=drive_link)

### Պահանջ

Visual assets (card / cover / card background) միայն admin/card-ի համար են, հոդվածի public-ում չպետք է երևան։

### Ինչ կա հիմա

`card-image` section order-ով `CultureItemCardAssetsSection` render է լինում public detail-ում։

### Մնացած

- [ ] Public `CultureItemMediaSections`-ից հանել `card-image` case-ը
- [ ] Կապված է #03-ի հետ

**Ֆայլեր:** `CultureItemCardAssetsSection.tsx`, `CultureItemMediaSections.tsx`

---

## 25 — Virtual tour՝ լայն, առանց կողքի նկարագրության

**Բաժին:** Virtual tour  
**%:** 15%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1HfKhIyxhaIlgHTcF77_CVPHWcTekGCKo/view?usp=drive_link)

### Պահանջ

Tour-ը լայն ու մեծ լինի։ Կողքի նկարագրությունը հանել (**Tour type**, **Access**)։

### Ինչ կա հիմա

`tour-grid` + aside՝ Tour type և Access։ Embed-ը լիքը լայն չէ։

### Մնացած

- [ ] Հանել aside-ը
- [ ] Embed-ը լիքը content լայնությամբ

**Ֆայլեր:** `CultureItemMediaSections.tsx` (`case 'tours'`)

---

## 26 — Հայերեն վերնագրի տառատեսակ

**Բաժին:** Typography  
**%:** 5%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1oHQqZZIrT-6gUwGna2_J6ee5IWGsunbT/view?usp=drive_link)

### Պահանջ

Հայերեն title-ը չի համապատասխանում անգլերեն ոճին։ Նախապես քննարկել տառատեսակները, ուղարկել տարբերակներ, հաճախորդը ընտրի։

### Ինչ կա հիմա

Cinzel / Cormorant / Inter — լատինական display ֆոնտեր։ Հայերենի համար նախատեսված display face չկա։

### Մնացած

- [ ] Առաջարկել 3–5 Armenian-capable ֆոնտ (Noto Serif Armenian, Arian AMU, և այլն)
- [ ] Հաճախորդի ընտրությունից հետո միացնել `layout.tsx` / CSS-ում

**Ֆայլեր:** `app/layout.tsx`, `app/globals.css`

---

## 27 — Description less / more

**Բաժին:** Article  
**%:** 0%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1IVN6xBl3FI3jx_eirL-4amlpCEkbGedg/view?usp=drive_link)

### Պահանջ

Նկարագրությունը սկզբում մի քանի տող։ User-ը սեղմում է More՝ ամբողջ տեքստը բացվում է, Less՝ կրկին կրճատվում։ Նպատակը վիզուալ էսթետիկան է։

### Ինչ կա հիմա

`block.body`-ն միշտ ամբողջությամբ է ցուցադրվում։ Truncate / toggle չկա։

### Մնացած

- [ ] Line-clamp + More/Less կոճակ (client component)
- [ ] Կիրառել description blocks-ի (և հնարավոր է hero description-ի) վրա

**Ֆայլեր:** `CultureItemMediaSections.tsx`

---

## 28 — Team նկարները կայքում չեն երևում

**Բաժին:** Team  
**%:** 30%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1STw5q6GHtupeszTOBB38R6WHrP3hB323/view?usp=drive_link)

### Պահանջ

Admin-ում ներբեռնված նկարները պետք է երևան public Team էջում։

### Ինչ կա հիմա

`TeamMember.image` schema + admin upload կան։ Public `/about/team` ցույց է տալիս **միայն initials** ավատար, `member.image`-ը չի render արվում։

### Մնացած

- [ ] Եթե `image` կա՝ ցույց տալ լուսանկար, հակառակ դեպքում initials

**Ֆայլեր:** `app/(public)/about/team/page.tsx`, `TeamMemberForm.tsx`, `lib/dto.ts`

---

## 29 — Team-ը խմբագրվի Admin-ում

**Բաժին:** Team  
**%:** 90%  
**Screenshot:** նույնը ինչ #28

### Պահանջ

Team-ը հնարավոր լինի edit անել Admin-ում։

### Ինչ կա հիմա

CRUD՝ `app/(admin)/admin/(panel)/team/`, ֆորմ, լուսանկար, order, active flag։

### Մնացած

- [ ] Public նկարների ֆիքս (#28) — առանց դրա admin edit-ը «չի երևում կայքում»

**Ֆայլեր:** `TeamMemberForm.tsx`, `app/(admin)/admin/(panel)/team/`

---

## 30 — Ողջ կայքի թարգմանություն

**Բաժին:** i18n  
**%:** 15%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1k5pI2pJAPzEjwPeNoPZvDrj6ekGkz2lz/view?usp=drive_link)

### Պահանջ

Լենայի ցուցադրած թարգմանությունը երևում է Contact Us-ում, բայց պետք է թարգմանել **ողջ նյութերը**, ոչ միայն կոնտակտը։

### Ինչ կա հիմա

6 locale կոդ (HY, HYW, EN, RU, FR, PT)։ Միայն EN-ն ունի `hasTranslations: true`։ CMS դաշտերը կարող են լինել multilingual, UI chrome-ը անգլերեն է։ Message catalog / locale routing չկա։

### Մնացած

- [ ] UI string catalogs բոլոր locale-ների համար
- [ ] CMS բովանդակության լրացում բոլոր լեզուներով (կոնտենտային աշխատանք)
- [ ] Locale-aware routes (եթե պահանջվի)

**Ֆայլեր:** `lib/i18n/locale-config.ts`, admin locale fields, public chrome components

---

## 31 — About us էջի փոփոխություն

**Բաժին:** About us  
**%:** 50%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1x0WtwifYQaY4m_yk0KHJrRrRSbIe0wYT/view?usp=drive_link)

### Պահանջ

Sheet-ում այս տողը **միայն նկար** ունի, տեքստային նկարագրություն չկա։ Առանց screenshot-ի ճշգրիտ scope-ը հայտնի չէ։

### Ինչ կա հիմա

About portal՝ hero + Mission / Team / Career, CMS `AboutContent`։ Դա ամբողջական էջ է, ոչ թե sheet նկարի 1:1 վերարտադրություն։

### Մնացած

- [ ] Տեսնել screenshot-ը և համեմատել layout-ի հետ
- [ ] Կիրառել վիզուալ փոփոխությունները

**Ֆայլեր:** `app/(public)/about/`, `AboutContentForm.tsx`

---

## 32 — About us shortcut-ներին background

**Բաժին:** About us  
**%:** 10%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1SfM6Olm1DdudJXAuKw4GS_LprWoYdtq8/view?usp=drive_link)

### Պահանջ

About us shortcut-երը ունենան հետնանկարի հնարավորություն։

### Ինչ կա հիմա

`AboutSidebarNav` — սովորական bordered տեքստային լինքեր, background image չկա, admin upload էլ չկա այս shortcut-ների համար։

### Մնացած

- [ ] Admin-ում ֆոնի նկար Mission / Team / Career shortcut-ների համար
- [ ] Public nav քարտեր՝ image background-ով

**Ֆայլեր:** `AboutSidebarNav.tsx`, `about/layout.tsx`, `AboutContent`

---

## 33 — Բլոգը պետք է փոփոխվի

**Բաժին:** Blog  
**%:** 35%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1yfXL9KreVQZoa9fBLkbZGIqerKQ1kWo5/view?usp=drive_link)

### Պահանջ

Բլոգը պետք է փոփոխվի (լայն redesign, տես նաև #13–#15)։

### Ինչ կա հիմա

Heritage landing + hero + grid կան, բայց դեռ treasure-card pattern և երկու սեկցիա։ Screenshot-ի նոր layout-ը չի կիրառված։

### Մնացած

- [ ] Screenshot-ից layout spec
- [ ] Listing + article page միասին փոխել (#13, #14, #15)

**Ֆայլեր:** `app/(public)/blog/page.tsx`, `BlogDetailView.tsx`, `blog.css`

---

## 34 — Donation հաշվիչի bug

**Բաժին:** Donation  
**%:** 50%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1P4Ql1vfpNiX1sEVPBM95LEqmiVaRm8L6/view?usp=drive_link)

### Պահանջ

Donation էջի հաշվիչը bug ունի։ Sheet-ում միայն նկար կա, տեքստային repro չկա։

### Ինչ կա հիմա

`DonationPatronSlider`՝ linear range + log fill, custom amount input, impact ranges։ Checkout դեռ անջատված է (`DONATION_CHECKOUT_ENABLED = false`)։

Հավանական bug-եր (կոդից, առանց screenshot-ի)՝ slider-ի տեսողական fill-ը չի համընկնում արժեքին, custom input-ի սահմանները, range boundary (`value < max`)։

### Մնացած

- [ ] Screenshot-ից ճշգրիտ repro
- [ ] Ֆիքսել slider / input sync-ը
- [ ] Եզրային արժեքներ (0, min tier, max)

**Ֆայլեր:** `DonationPatronSlider.tsx`, `donation-utils.ts`, `lib/constants/donation-page.ts`

---

## 35 — Admin-ում սերտիֆիկատի upload չկա

**Բաժին:** Admin / Donation  
**%:** 0%  
**Screenshot:** [Drive](https://drive.google.com/file/d/1aT1wTz0q5MFpAuLooZmWUFcy6ML6LFZa/view?usp=drive_link)

### Պահանջ

Admin-ում լինի սերտիֆիկատ ներբեռնելու հատված (Guardian / Ambassador / Magistr template-ներ)։

### Ինչ կա հիմա

Public-ում `DonationCertificateBlock` է, copy-ն ասում է «Upload certificate templates in admin later»։ Admin route / model չկա։

### Մնացած

- [ ] Admin UI՝ 3 template upload
- [ ] Պահել R2/local-ում, ցույց տալ donate էջի preview-ում

**Ֆայլեր:** `DonationCertificateBlock.tsx`, `lib/constants/donation-page.ts` (admin դեռ չկա)

---

## Առաջնահերթություն (առաջարկ)

Բարձր ազդեցություն, համեմատաբար փոքր scope՝

1. #03 + #24 — card / visual assets դուրս public-ից  
2. #22 — Entry details հանել  
3. #06 — show in public-ը հարգել հոդվածի քարտեզում  
4. #28 — Team նկարները ցույց տալ  
5. #23 — Gallery lightbox  
6. #27 — Description less/more  
7. #16 — Հանել navigation loading overlay  
8. #09 + #04 + #11 — ավելորդ admin դաշտերը հանել  

Ավելի մեծ աշխատանք՝ #01 (locale media), #05+#07 (map model), #14+#15+#33 (blog), #30 (i18n), #35 (certificates)։

---

## Նշումներ

- Sheet-ի մի քանի տողում սյունակները տեղաշարժված են (N / Section / Description)։ Այստեղ կետերը վերականգնված են ըստ տրամաբանության։
- #31 և #34-ի ճշգրիտ scope-ը screenshot-ից է կախված. Drive ֆայլերը այս աուդիտում չեն բացվել։
- 13.08 revision-ի առանձին փաստաթղթերը՝ [`docs/feedback-13-08/README.md`](../feedback-13-08/README.md)։ Այս ֆայլը վերաբերում է ընթացիկ «feedback for web» sheet-ին։
