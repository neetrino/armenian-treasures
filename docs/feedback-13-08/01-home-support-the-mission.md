# 01 — Support the mission → Donation

**Բաժին:** Home page
**Կարգավիճակ:** Done
**Առաջընթաց:** 100%

## Ինչ է պահանջվում

`Support the mission` կոճակը պետք է տանի Donation էջ (`/donate`)։ Այս պահին տանում է Partnership էջ (`/partnership`)։

## Ինչպես իրականացնել

1. Default URL-ը փոխել `/donate` — `prisma/seeds/home-content.ts`, `lib/queries/home.ts` (`secondaryCtaUrl`)։
2. Header CTA — `components/navigation/HeaderSupportCta.tsx`։
3. Ստուգել մնացած hardcoded հղումները և թողնել Partnership միայն այնտեղ, որտեղ իսկապես partnership է։
4. Admin Home Content-ում `secondaryCtaUrl` արդեն խմբագրվում է. DB արժեքը նույնպես թարմացնել։

## Իրականացված է հիմա

- Hero default `secondaryCtaUrl` → `/donate` (seed + fallback)։
- Header `Support Our Mission` → `/donate`։
- Projects page `Support The Mission` → `/donate`։
- Footer `Donate now` → `/donate`։
- Project card `Support this project` → `/donate`։
- Local DB `home-content-singleton.secondaryCtaUrl` թարմացված է `/donate`։
- Blog CTA արդեն `/donate` էր։
- `Become a partner` և nav Partnership հղումները մնացել են `/partnership`։

## Մնացած

- [x] Default-ները `/partnership`-ից փոխել `/donate`
- [x] Header / footer / projects CTA-ները համաձայնեցնել
- [x] Local DB-ում պահված `secondaryCtaUrl` թարմացնել
- Staging/prod-ում Admin Home Content-ից կամ նույն update-ով դնել `/donate`, եթե այնտեղ դեռ `/partnership` է։
