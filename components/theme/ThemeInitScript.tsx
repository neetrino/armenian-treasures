import { DEFAULT_SITE_THEME } from '@/lib/theme/site-theme';

const themeInitScript = `(function(){try{document.documentElement.dataset.theme=${JSON.stringify(DEFAULT_SITE_THEME)};document.documentElement.style.colorScheme='dark';localStorage.removeItem('at-site-theme');}catch(e){document.documentElement.dataset.theme=${JSON.stringify(DEFAULT_SITE_THEME)};}})();`;

export function ThemeInitScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
