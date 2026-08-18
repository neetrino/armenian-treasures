# 06 — Heritage Community + Discover more updates

**Բաժին:** Home page
**Կարգավիճակ:** Partial
**Առաջընթաց:** 55%

## Ինչ է պահանջվում

`Stories from the Heritage Community` պահպանի նույն տրամաբանությունը, ինչ `STORIES WORTH DISCOVERING`։ Ավելացնել կոճակ Discover more updates, որը տանի Blog էջ։

## Ինչպես իրականացնել

1. `HomeNewsFeedSection` — CTA label փոխել `View all news` դեպի `Discover more updates`։ Href արդեն `/blog` է։
2. Քարտերի layout-ը մոտեցնել featured mosaic-ին, եթե «նույն տրամաբանություն» նշանակում է visual + admin-curated top N։
3. Եթե Admin-ը պետք է ընտրի top հոդվածներ՝ Blog-ին featured flag ավելացնել։ Limit-ը հիմա 3 է։
4. Չկրկնօրինակել `BlogCard`. կամ ընդլայնել այն, կամ կիսել featured card shell-ը։

## Իրականացված է հիմա

- Սեկցիան կա, published blog-ից է կարդում։
- CTA կա և տանում է `/blog`։
- Label-ը սխալ է (`View all news`)։
- Layout-ը սովորական 3-column grid է, ոչ featured mosaic։
- Featured picker չկա։

## Մնացած

- [ ] CTA copy դարձնել Discover more updates
- [ ] Հաստատել՝ արդյոք պետք է նույն mosaic / top-N Admin ընտրություն
- [ ] Եթե այո՝ featured blog posts + layout
