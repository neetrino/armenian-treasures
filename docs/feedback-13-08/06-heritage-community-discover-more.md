# 06 — Heritage Community + Discover more updates

**Բաժին:** Home page
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

`Stories from the Heritage Community` պահպանի նույն տրամաբանությունը, ինչ `STORIES WORTH DISCOVERING`։ Ավելացնել կոճակ Discover more updates, որը տանի Blog էջ։

## Ինչպես իրականացնել

1. `HomeNewsFeedSection` — CTA label փոխել `View all news` դեպի `Discover more updates`։ Href արդեն `/blog` է։
2. Քարտերի layout-ը մոտեցնել featured mosaic-ին, եթե «նույն տրամաբանություն» նշանակում է visual + admin-curated top N։
3. Եթե Admin-ը պետք է ընտրի top հոդվածներ՝ Blog-ին featured flag ավելացնել։ Limit-ը հիմա 3 է։
4. Չկրկնօրինակել `BlogCard`. կամ ընդլայնել այն, կամ կիսել featured card shell-ը։

## Իրականացված է հիմա

- Homepage-ը ցույց է տալիս admin-ի top 5 blog post՝ նույն featured mosaic-ով։
- CTA-ն `Discover more updates` է և տանում է `/blog`։
- Admin → Blog form-ում կա «Show in Stories from the Heritage Community» + slot 1–5։
- Եթե featured չկա՝ fallback վերջին 5 published post։
- `/blog` էջը մնում է ամբողջ արխիվը (`BlogCard`)։

## Մնացած

- [x] CTA copy դարձնել Discover more updates
- [x] Նույն mosaic / top-N Admin ընտրություն
- [x] Featured blog posts + layout
