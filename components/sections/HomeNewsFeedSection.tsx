import '@/components/sections/home-news/home-news-editorial.css';
import { HomeNewsEditorial } from '@/components/sections/home-news/HomeNewsEditorial';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { getFeaturedBlogPosts } from '@/lib/queries/blogs';

const HOME_NEWS_POST_COUNT = 4;

export async function HomeNewsFeedSection() {
  const [posts, locale] = await Promise.all([
    getFeaturedBlogPosts(HOME_NEWS_POST_COUNT),
    getCurrentSiteLocale(),
  ]);
  const [lead, ...side] = posts;

  return (
    <section
      id="news"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6"
      aria-labelledby="home-news-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <h2 id="home-news-heading" className="sr-only">
          {uiMessage(locale, 'newsTitle')}
        </h2>

        {lead ? (
          <HomeNewsEditorial lead={lead} side={side} locale={locale} />
        ) : (
          <div className="rounded-sm px-6 py-10 text-center">
            <p className="font-display text-sm leading-relaxed text-[#d6d2c8]">
              {uiMessage(locale, 'newsFeedSoonDescription')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
