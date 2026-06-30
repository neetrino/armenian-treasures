import {
  DEFAULT_SITE_THEME,
  SITE_THEME_STORAGE_KEY,
} from '@/lib/theme/site-theme';

const themeInitScript = `(function(){try{var k=${JSON.stringify(SITE_THEME_STORAGE_KEY)};var d=${JSON.stringify(DEFAULT_SITE_THEME)};var s=localStorage.getItem(k);var theme=s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme==='dark'?'dark':'light';}catch(e){document.documentElement.dataset.theme=${JSON.stringify(DEFAULT_SITE_THEME)};}})();`;

export function ThemeInitScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
