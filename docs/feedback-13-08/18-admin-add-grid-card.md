# 18 — Add grid card — նույն կառուցվածքը

**Բաժին:** Admin panel
**Կարգավիճակ:** Partial
**Առաջընթաց:** 35%

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

- Կա մեկ հարթ form՝ title, descriptions, region/period, one image, gallery, one tour, one video, lat/lng, type, status, card background։
- Չկան dual card/cover, unlimited description/tour/video blocks, featured toggles, drag map, Before/After, per-image alt/caption, Save draft/Preview/Publish bar։

## Մնացած

- [ ] Form-ը բաժանել mockup section 1-6
- [ ] Featured Catalog / Highlight toggle-ներ
- [ ] Card photo + Cover image
- [ ] Unlimited description / tour / video blocks (schema որոշում)
- [ ] Drag-pin map
- [ ] Gallery caption/alt + Before/After
