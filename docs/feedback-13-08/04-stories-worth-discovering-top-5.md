# 04 — STORIES WORTH DISCOVERING — top 5

**Բաժին:** Home page  
**Կարգավիճակ:** Partial  
**Առաջընթաց:** 40%

## Ինչ է պահանջվում

`STORIES WORTH DISCOVERING` սեկցիայում երևան **top 5** հոդված։ Admin-ը պարբերաբար կարողանա թարմացնել այդ հնգյակը։

## Ինչպես իրականացնել

1. `CultureItem`-ին ավելացնել `featuredOnHome` (boolean) և/կամ `featuredOrder` (1–5)։ Չհենվել միայն `order` + առաջին N published-ի վրա։
2. `getFeaturedCultureItems` (`lib/queries/culture-items.ts`) — ֆիլտրել featured flag-ով, `take: 5`։ Այժմ `FEATURED_TREASURE_COUNT = 4`։
3. Admin — `CultureItemForm` կամ Home Content-ում 5 slot picker (առկա item-ներից)։
4. Grid — `FeaturedTreasuresGrid` / `featured-treasures-section.css`։ 5-րդ քարտը կամ նոր layout cell, կամ #05-ի «Discover more» shortcut-ը։
5. Revalidate tag՝ `culture-items` արդեն կա։

## Իրականացված է հիմա

- Սեկցիան կա՝ `FeaturedTreasuresSection`, վերնագիրը ճիշտ է։
- Քարտերը գալիս են published culture item-ներից (`mapCultureItemsToFeaturedTreasures`)։
- Card background color/image Admin-ում կա։
- Featured flag չկա։ Վերցվում է առաջին 4-ը `order`/`createdAt`-ով։

## Մնացած

- [ ] Featured ընտրություն Admin-ում
- [ ] Limit 4 → 5
- [ ] Grid layout 5 քարտի համար
