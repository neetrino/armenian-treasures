# 09.10 — առաջադրանքներ, բացի քարտեզից

Աղբյուր՝ [09.10](https://docs.google.com/spreadsheets/d/1p79Zqe-LfEtn6zRITd0ahO-734C8b8S1NGg-wy5_Oak/edit?gid=1671022048#gid=1671022048)  
Աուդիտ՝ 2026-10-13, ըստ կոդի և sheet-ի սքրինշների։  
Sheet-ի `Neetrino status` սյունը դատարկ է։ Ստորևի տոկոսը կոդի վիճակն է պահանջի դեմ, ոչ թե sheet-ի նշումը։

Քարտեզի կետը (N 2) այս ֆայլում չկա։

**Ընդհանուր՝ 41%** (չորս կետի միջին)։

| Կարգավիճակ | Քանակ | Շեմ |
|---|---:|---|
| Done | 0 | ≥ 90% |
| Partial | 4 | 15–89% |
| Missing | 0 | 0–14% |

Տոկոսի կանոնը՝ կետը բաժանվում է արդեն եղած վարքին և պահանջի բաց մասին։ «Կա մոտավորապես» միավոր չի տալիս, եթե սքրինշի կոնկրետ թերությունը դեռ կոդում է։

| # | Բաժին | Պահանջ | Կարգավիճակ | % | Ինչու այս տոկոսը |
|---|---|---|---|---:|---|
| 1 | Home / Partners | Վազող տողը մնա, բայց իրական գույներով լոգոներով. Թումոն հանել | Partial | 40% | Marquee-ն և լոգո ֆայլերը կան։ Բոլոր նշանները ներկվում են մեկ փիրուզով, Թումոն շարքում է |
| 3 | Home / Blog | Բլոգի բլոկը սքրինշում կոտրված է երևում | Partial | 60% | Featured գրառումները դուրս են գալիս 1+2 դասավորությամբ։ Վերնագրերը կտրվում են, կիկերը տառատարված է |
| 4 | Menu | Artnament → Ornament, Նախշազարդ → Զարդանախշեր | Partial | 40% | Կետը մենյուում կա։ Կատալոգում դեռ Ornaments / Նախշազարդ է, EN էջի վերնագիրը կարող է գալ CMS-ից |
| 5 | Admin | Description block-ի նկարը լեզու փոխելիս մնա | Partial | 25% | Նկարի դաշտը կա և պահվում է ակտիվ լեզվի վրա։ Մյուս լեզուների block-երը նկարը չեն ժառանգում |

---

## 1 — Գործընկերների լոգոներ

| | |
|---|---|
| Բաժին | Home page, `#partners` |
| Սքրինշ | [Drive](https://drive.google.com/file/d/1p7_4gAXnwcY4ydSSO0XmoUmgeoTMgQeX/view?usp=drive_link) |
| % | 40% |
| Ինչ է սա | Երկու շարքով անվերջ վազող լոգոներ սև ֆոնի վրա։ Պահանջը երկուսն է՝ տողի տրամաբանությունը չփոխել, և շրջանառության մեջ դնել ապրանքանիշի իրական լոգոն, ոչ թե միագույն վերանկարված նշան։ Երկրորդը՝ Թումոն այդ ցանկից դուրս |
| Ինչ կա հիմա | `HomePartnersLogoCarousel` անիմացնում է `home-partners-marquee`-ը, կրկնում է շարքը, և `prefers-reduced-motion` դեպքում կանգնեցնում է։ Աղբյուրը `collectHighlightedPartnerLogos` է՝ partnership էջի կատեգորիաներից, միայն իրական `image` լոգո ունեցողները։ Սքրինշի փիրուզը կոդից է. `TintedPartnerLogo` նկարը canvas-ով ներկում է `#30a8a8`։ `TUMO Center for Creative Technologies` դեռ `PARTNERSHIP_CATEGORIES`-ի Educational խմբում է (`partner-06.webp`) և ընկնում է շարքի մեջ |
| Ինչպես լուծել | 1. Այս carousel-ում հանել `TintedPartnerLogo`-ն։ Ցույց տալ ֆայլը ինչպես վերբեռնված է (`next/image` կամ `img`), նույն marquee-ով, նույն կրկնությամբ, նույն reduced-motion ճյուղով։ 2. `PARTNERSHIP_CATEGORIES`-ից հանել TUMO քարտը։ Եթե Educational խումբը դատարկ է մնում, հանել նաև խումբը։ 3. Ստուգել պահված `partnership-page` կոնտենտը։ `getPartnershipPageContent` վերցնում է DB-ի պատճենը, եթե էջը երբևէ save է արվել. միայն կոնստանտը փոխելը շարքը չի թարմացնի։ 4. Սպիտակ թիթեղով լոգոն ուղղել այդ ֆայլով։ Միագույն ներկը հետ չբերել ամբողջ շարքի համար |
| Ֆայլեր | `components/sections/home-partners/HomePartnersLogoCarousel.tsx`, `components/sections/home-partners/TintedPartnerLogo.tsx`, `lib/images/tint-partner-logo.ts`, `lib/constants/partnership-page.ts`, `lib/mappers/partner-logos.ts`, `tests/partner-logos.test.ts` |
| Ինչպես ստուգել | Desktop և mobile, `/#partners`։ Շարքը շարժվում է, hover-ը կանգնեցնում է, reduced-motion-ում կանգնած է։ Gulbenkian, Էջմիածին, Cafesjian, AGBU, Թուֆենկյան, Խաչատրյան երևում են իրենց գույներով, ոչ թե մեկ փիրուզով։ TUMO չկա ոչ վերևի, ոչ ներքևի շարքում, և չկա `/partnership` էջում։ Դատարկ src-ով կամ `future` գործընկերը շարք չի մտնում |
| Դուրս է scope-ից | `prisma/seeds/donators.ts`-ի Tumo տողը նվիրատուների ցանկ է, այս շարքի աղբյուրը չէ։ Քարտեզ չկա այս կետում |
| Ռիսկ | Tint-ը թաքցնում էր սպիտակ ֆոնը։ Առանց դրա մի լոգո կարող է սևի վրա սպիտակ ուղղանկյուն դառնալ. դա ուղղվում է asset-ով |

---

## 3 — Բլոգի բլոկը գլխավորում

| | |
|---|---|
| Բաժին | Home, `#news` |
| Սքրինշ | [Drive](https://drive.google.com/file/d/1jdkk1APfQeXWxhZsiawGd41gdaFTDw8o/view?usp=drive_link) |
| % | 60% |
| Ինչ է սա | Գլխավորի բլոգ/նորություն բլոկը։ Sheet-ում տեքստ չկա, միայն «կարծես բագ ա, նայեք էլի»։ Սքրինշը home-ի editorial-ն է՝ ձախում մեծ քարտ, աջում երկու փոքր, հայերեն, մութ ֆոն։ Փոքր քարտի նկար+տեքստ կողք կողքի դասավորությունը լայաութ է, ոչ թե բագը |
| Ինչ կա հիմա | `HomeNewsFeedSection` բերում է մինչև 4 featured գրառում։ Առաջինը lead է, մնացածը կողքի շարք։ Հայերենի համար `html[lang='hy'] .font-cinzel` արդեն անցնում է Noto Serif Armenian-ի։ Բագը մնում է չափերի վրա։ Կողքի վերնագիրը `line-clamp: 2` է և `overflow-wrap: anywhere`՝ բառը կտրվում է տողի մեջտեղում։ Սքրինշի ներքևի քարտը վերջանում է `...`-ով։ Կիկերը (`ԲԼՈԳ`) ունի `letter-spacing: 0.18em !important`, որը հաղթում է հայերենի 0.04em override-ին, դրա համար կարճ բառը նոսր է երևում։ Վերնագրի `text-transform: uppercase !important` հայերենը սեղմում է նեղ սյունում։ «Կարդալ» սլաքը `opacity: 0` է մինչև hover |
| Ինչպես լուծել | 1. Կողքի վերնագրից հանել `overflow-wrap: anywhere`։ Կտրվածքը լինի բառի սահմանով։ 2. Կողքի սյան համար clamp-ը բարձրացնել առնվազն 3 տող, որպեսզի սքրինշի երկրորդ վերնագիրը չկտրվի արտահայտության կեսից։ 3. Կիկերի 0.18em `!important`-ը հայերեն/արևմտահայերենում չկիրառել, թող մնա globals-ի 0.04em։ 4. Նույն լեզուներում վերնագրից հանել uppercase-ը։ 5. Lead-ի «կարդալ» հղումը երևա նաև առանց hover-ի։ 6. Չփոխել `/blog` էջի կառուցվածքը և չավելացնել նոր դաշտ |
| Ֆայլեր | `components/sections/home-news/HomeNewsEditorial.tsx`, `components/sections/home-news/home-news-editorial.css`, `app/globals.css` (`html[lang='hy'] .font-cinzel`) |
| Ինչպես ստուգել | `/` հայերեն, desktop լայնություն՝ ինչպես սքրինշում, և `<960px`։ Մեծ քարտի տեքստը նկարի տակ է, փոքրերինը՝ նկարի աջ կողմում, առանց վրադիրի։ Վերնագիրը չի կոտրվում տառի կեսից։ Կիկերը չի երևում որպես տառատարված լատիներեն։ Առանց hover-ի երևում է կարդալու հղումը։ Անգլերենում Cinzel-ը և uppercase-ը մնում են։ Դատարկ featured ցուցակը թողնում է առկա դատարկ վիճակը, չի կոտրում սեկցիան |
| Դուրս է scope-ից | `/blog` listing-ի redesign, cover/header/gallery դաշտերը, քարտեզ |
| Ռիսկ | Clamp-ը 3 անելը երկար անգլերեն վերնագրին ավելի շատ տեղ կտա։ Ստուգել, որ կողքի շարքը չհրի lead-ի բարձրությունից դուրս |

---

## 4 — Artnament → Ornament

| | |
|---|---|
| Բաժին | Մենյու, Architecture-ի տակ, Castles-ից հետո |
| Սքրինշ | [Drive](https://drive.google.com/file/d/1DCESFZeW9FDVkXboPlqfTkMGWDvZa4hQ/view?usp=drive_link) |
| % | 40% |
| Ինչ է սա | Մենյուի անվանափոխություն։ Անգլերենում երևացող Artnament/Ornaments դառնա **Ornament**։ Հայերեն **Նախշազարդ** դառնա **Զարդանախշեր**։ Slug-ը և URL-ը չեն փոխվում |
| Ինչ կա հիմա | `menuOrnaments`-ը `Նախշազարդ` / `Ornaments` / `Орнаменты` / `Ornements` / `Ornamentos` է։ Mega menu-ն `cultureMenuLabel`-ով վերցնում է այս տողը, եթե path-ը `architecture/ornaments` է կամ slug-ը `ornaments`։ Էջի վերնագիրը այլ ճանապարհ ունի. `resolvePublicMenuTitle` անգլերենում նախ CMS-ի `title`-ն է վերադարձնում։ Եթե բազայում EN արժեքը դեռ Artnament է, կատալոգի էջը ցույց կտա տառասխալը, նույնիսկ եթե մենյուի կատալոգը փոխվի։ Հայերեն CMS արժեքը `Նախշազարդ` է, և `isUntranslatedMenuTitle` այն համարում է թարգմանված, ուստի կատալոգի նոր տողը չի հաղթի, քանի դեռ պահված տեքստը չի թարմացվել։ `menuArmaments`-ի հայերենը նույնպես `Նախշազարդ` է. դա ուրիշ կետ է և այս անվանափոխության հետ չի շտկվում |
| Ինչպես լուծել | 1. `menuOrnaments`՝ HY/HYW `Զարդանախշեր`, EN `Ornament`։ RU/FR/PT թողնել, եթե հաճախորդը չի խնդրել եզակի ձև։ 2. Թարմացնել թեստերը, որոնք սպասում են `Ornaments` և `Նախշազարդ` (`tests/culture-mega-menu.test.ts`, `tests/menu-title.test.ts`)։ 3. Բազայի `CultureMenuItem.title`-ում, slug `ornaments`, EN-ը դնել `Ornament`, HY/HYW-ը՝ `Զարդանախշեր`։ Միայն կոդի տողը բավարար չէ էջի H1-ի համար։ 4. Եթե slug-ը `ornaments` չէ (`artnament` կամ այլ), `cultureMenuLabel` չի կիրառվի և կերևա հում title-ը։ Այդ դեպքում ուղղել title-ը. slug-ը չվերանվանել, որ հղումները չկոտրվեն |
| Ֆայլեր | `lib/i18n/messages/menu.ts`, `lib/dto.ts` (`resolvePublicMenuTitle`), `lib/navigation/merge-live-mega-menu.ts`, `tests/culture-mega-menu.test.ts`, `tests/menu-title.test.ts` |
| Ինչպես ստուգել | Header → Architecture, EN և HY։ Castles-ի հաջորդ կետը EN-ում `Ornament` է, HY-ում `Զարդանախշեր`։ Կետի էջի H1-ը նույնն է, ոչ թե Artnament կամ Նախշազարդ։ URL-ը մնում է `/culture/architecture/ornaments` (կամ արդեն եղած slug-ը)։ Armaments կետը չի դառնում Զարդանախշեր։ RU/FR/PT մենյուն չի դատարկվում |
| Դուրս է scope-ից | `menuArmaments`-ի սխալ հայերենը (`Նախշազարդ`՝ զենքի կետի վրա)։ Դա առանձին ուղղում է, այս պահանջի մաս չէ |
| Ռիսկ | Եթե խմբագիրը ձեռքով է լրացրել «Նախշազարդ» որպես վերջնական թարգմանություն, seed-ը առանց CMS դաշտի թարմացման public H1-ը չի փոխի |

---

## 5 — Description block-ի նկարը լեզուների միջև

| | |
|---|---|
| Բաժին | Admin → Cultural Portal → grid card → Description block → Side image |
| Սքրինշ | [Drive](https://drive.google.com/file/d/1cX-rZlinBEdn0dtEYoEi_zQMcTadfkHb/view?usp=drive_link) |
| % | 25% |
| Ինչ է սա | Մի նկար, մեկ անգամ վերբեռնված, երևա բոլոր լեզուներում։ Տեքստը (title, subtitle, body) մնում է ամեն լեզվի իրենը։ Հիմա լեզու փոխելիս նկարը չի երևում, և խմբագիրը ստիպված նորից է վերբեռնում |
| Ինչ կա հիմա | Side image դաշտը կա և գրում է `block.image`։ Տուրի URL-ը, վիդեոն և gallery-ի ֆայլը արդեն ընդհանուր են. `handleLocaleChange` դրանք միացնում է `mergeSharedTours` / `mergeSharedVideos` / `mergeSharedGallery`-ով։ Description block-ը ամբողջությամբ locale-ի slice է։ `patchMedia`-ն block-երը գրում է միայն ակտիվ լեզվի մեջ։ Եթե HY slice-ը արդեն կա և `image` դատարկ է, EN-ում վերբեռնած նկարը փոխարկելիս չի գալիս։ `emptyTextLocaleMedia` նկարը պատճենում է միայն այն ժամանակ, երբ այդ լեզուն առաջին անգամ է բացվում։ Public `mediaForLocale` վերադարձնում է `slice.blocks` ամբողջությամբ, ուստի դատարկ image-ով լեզուն կայքում էլ է կորցնում նկարը |
| Ինչպես լուծել | Նույն մոդելը, ինչ gallery-ի ֆայլինը, միայն `image` դաշտի համար։ 1. Ավելացնել merge ըստ `block.id`. ընդհանուր ցուցակից վերցնել `image`, լեզվից թողնել title / subtitle / body։ 2. `handleLocaleChange` և `patchMedia` (երբ փոխվում է block-ի image-ը) գրեն այդ URL-ը բոլոր արդեն բացված լեզուների նույն id-ով block-ի մեջ։ 3. `mediaForLocale` public-ում. տեքստը locale-ից, նկարը՝ ընդհանուր արժեքից (ոչ դատարկ առաջինը, հետո root)։ 4. Նկարը ջնջելը մեկ լեզվից ջնջի բոլորից։ 5. Առանձին migration պետք չէ, եթե կարդալիս դատարկ image-ը լրացվում է այլ լեզվի նույն id-ից, իսկ հաջորդ save-ը դա գրում է բոլոր slice-երում։ 6. Թեստ. EN-ում image URL, HY-ում ուրիշ body, երկուսն էլ resolve-ից հետո նույն image-ն ունեն. HY տեքստը չի ընկնում EN-ի վրա |
| Ֆայլեր | `components/admin/CultureItemForm.tsx` (`patchMedia`, `handleLocaleChange`), `lib/culture-item-media-locale.ts` (`mediaForLocale`, `emptyTextLocaleMedia`, `syncSharedLocaleMedia`), `components/admin/culture-item-editor/CultureItemDescriptionBlocksField.tsx`, `tests/culture-item-media-locale.test.ts` |
| Ինչպես ստուգել | Բացել սքրինշի նման քարտը։ EN-ում վերբեռնել side image, չսեղմել save, անցնել HY, RU, FR, PT, HYW։ Նկարը մնում է, տեքստային դաշտերը այդ լեզվինն են։ HY-ում փոխել միայն տեքստը, save, reload, վերադառնալ EN. EN տեքստը չի կորել, նկարը նույն ֆայլն է։ Public էջում EN և HY նույն նկարն են ցույց տալիս, տարբեր տեքստով։ Մեկ լեզվից նկարը հանելը հանում է մյուսներից էլ։ Տուրի, վիդեոյի և gallery-ի լեզվային տեքստը այս փոփոխությունից չի խառնվում |
| Դուրս է scope-ից | Նկարի դաշտը հանելը (28.08-ի հին կետ)։ Հետո այդ նկարը հետ է բերվել որպես side image, և այս պահանջը հենց այն պահելն է |
| Ռիսկ | Եթե երկու լեզու արդեն ունեն տարբեր նկար նույն block id-ի վրա, merge-ը պետք է վերցնի ոչ դատարկ մի արժեք և դադարի պահել երկու տարբերակ։ Դա այս պահանջի իմաստն է. նկարը ստատիկ է |

---

## Կարգ

| Կարգ | Կետ | Ինչու |
|---|---|---|
| 1 | 5 — նկարը լեզուների միջև | Խմբագիրը ամեն լեզվի վրա կորցնում է արդեն վերբեռնած ֆայլը |
| 2 | 1 — լոգոներ | Երևում է գլխավորի վրա, երկու փոքր ուղղում |
| 3 | 4 — Ornament | Տող + CMS title, առանց URL փոփոխության |
| 4 | 3 — բլոգ | Սքրինշի կտրվածքն ու տառատարը, առանց նոր դիզայնի |
