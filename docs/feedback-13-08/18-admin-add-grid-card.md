# 18 — Add grid card — նույն կառուցվածքը

**Բաժին:** Admin panel
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

Ստեղծել ամբողջությամբ նույն Add grid card կառուցվածքը, ինչ mockup-ում է։ Անտեսել նկարի ձախ մուգ sidebar-ը. կրկնել միայն սպիտակ ֆոնով card-ի կառուցվածքը։

Mockup: https://drive.google.com/file/d/1hhW254MMl8U0QwamqoZw-Tg9of_X7SMK/view?usp=sharing

## Mockup-ի կառուցվածքը (սպիտակ մաս)

- Header — Add new grid card, Save draft / Preview / Publish
- Լեզուներ — ARM (E), ARM (W), EN, RU, FR, PT
- Status — Draft dropdown
- Featured Catalog / Featured Highlight toggle-ներ
- 1. Card Image — Card photo + Cover image (JPG/PNG/WEBP, 10MB)
- 2. Description blocks (unlimited) — Title, Subtitle, rich text, Image + caption, Add description block
- 3. Map — Location name, Address, Lat/Lng, drag-pin map (default 40.1792, 44.4991)
- 4. Virtual Tour (unlimited) — Type (LiDAR Scanning), Title, iframe/link, preview image
- 5. Videos (unlimited) — MP4 upload կամ YouTube/Vimeo, title, preview
- 6. Gallery (unlimited) — Images + Before/After tab, caption, alt text

## Ինչպես իրականացնել

1. Չգրել նոր CMS. վերափաթեթավորել `CultureItemForm`-ը mockup section-ներով։ `AdminFormSection` արդեն կա։
2. Լեզուները՝ առկա `TranslatableFieldsTabs`։ ARM E/W split-ը նոր locale է, եթե դեռ չկա։
3. Featured toggle-ները կապել #04-ի `featuredOnHome` / catalog featured-ի հետ։
4. Description blocks — հիմա մեկ `description` textarea է։ Եթե mockup-ը պարտադիր է՝ JSON blocks `CultureItem`-ի վրա։
5. Map — lat/lng կան, drag-pin widget չկա. վերօգտագործել public map-ի Leaflet-ը admin-ում, `ssr: false`։
6. Tours/Videos — հիմա մեկ `tourUrl` և մեկ `videoUrl`։ Unlimited նշանակում է JSON array։
7. Gallery — `GalleryImagesField` կա, չկա Before/After և alt/caption per image։
8. Sidebar-ը չկրկնել. sheet-ը հստակ ասում է անտեսել ձախ մուգ մասը։

## Իրականացված է հիմա

- `CultureItemForm`-ը mockup section 1–6 է + Save draft / Preview / Publish toolbar։
- Լեզուները՝ ARM (E), ARM (W), EN, RU, FR, PT (`HY` + նոր `HYW`)։
- Featured Catalog (`featuredOnCatalog`) և Featured Highlight (`featuredOnHome`)։
- Card photo + Cover image. Upload limit 10MB։
- Unlimited description / tour / video / gallery blocks՝ `mediaContent` JSON, dual-write `description` / `tourUrl` / `videoUrl` / `galleryImages`։
- Leaflet drag-pin map, default Yerevan 40.1792, 44.4991։
- Gallery Image և Before/After + caption/alt։
- Add grid card sheet-ը նույն `CultureItemForm`-ն է օգտագործում։
- Public article page-ը render է անում blocks / tours / videos / gallery։

## Մնացած

- [x] Form-ը բաժանել mockup section 1-6
- [x] Featured Catalog / Highlight toggle-ներ
- [x] Card photo + Cover image
- [x] Unlimited description / tour / video blocks (schema որոշում)
- [x] Drag-pin map
- [x] Gallery caption/alt + Before/After
