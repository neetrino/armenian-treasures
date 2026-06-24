import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const [htmlPath, scopeClass, outPath] = process.argv.slice(2);
if (!htmlPath || !scopeClass || !outPath) {
  console.error('Usage: node extract-heritage-page-css.mjs <html> <scope-class> <out.css>');
  process.exit(1);
}

const html = readFileSync(resolve(htmlPath), 'utf8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (!match) throw new Error('No <style> block found');

let css = match[1]
  .replace(/:root\s*\{/g, `.${scopeClass}{`)
  .replace(/\bhtml\b/g, `.${scopeClass}`)
  .replace(/\bbody\b/g, `.${scopeClass}`)
  .replace(/font-family:'Cinzel'/g, 'font-family:var(--font-cinzel)')
  .replace(/font-family:'Cormorant Garamond'/g, 'font-family:var(--font-cormorant)')
  .replace(/font-family:'Inter'/g, 'font-family:var(--font-inter)');

const fontVars = `
.${scopeClass}{
  scroll-behavior:smooth;
  background:var(--black);color:var(--text);font-family:var(--font-cormorant),Georgia,serif;font-size:18px;line-height:1.7;overflow-x:hidden;min-height:100vh;position:relative;
}
.${scopeClass} *, .${scopeClass} *::before, .${scopeClass} *::after { box-sizing:border-box;margin:0;padding:0; }
.${scopeClass} ::-webkit-scrollbar{width:5px}
.${scopeClass} ::-webkit-scrollbar-track{background:var(--black)}
.${scopeClass} ::-webkit-scrollbar-thumb{background:var(--gold-dk);border-radius:3px}
`;

const scopeRule = (rule) => {
  const trimmed = rule.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('@')) return trimmed;
  return trimmed.replace(/(^|})([^{@]+)\{/g, (full, prefix, selectors) => {
    const scoped = selectors
      .split(',')
      .map((sel) => {
        const s = sel.trim();
        if (!s || s.startsWith(`.${scopeClass}`)) return s;
        if (s === 'nav' || s === 'footer') return `.${scopeClass} ${s}`;
        return `.${scopeClass} ${s}`;
      })
      .join(', ');
    return `${prefix}${scoped}{`;
  });
};

css = css
  .split(/(?=@keyframes)|(?=@media)/)
  .map((chunk) => (chunk.startsWith('@') ? chunk : scopeRule(chunk)))
  .join('');

const extras = `
.${scopeClass} .reveal{opacity:0;transform:translateY(18px);animation:kmReveal .55s ease forwards}
@keyframes kmReveal{to{opacity:1;transform:translateY(0)}}
.${scopeClass} .hero{margin-top:calc(-1 * var(--site-header-height))}
.${scopeClass} .breadcrumb{position:absolute;top:0;left:0;right:0;z-index:2;padding:calc(var(--site-header-height) + 24px) 48px 0;max-width:1300px;margin:0 auto}
.${scopeClass} .g-item > span{display:block;width:100%;height:100%}
@media(max-width:900px){
  .${scopeClass} .breadcrumb{padding:calc(var(--site-header-height) + 16px) 20px 0}
}
`;

writeFileSync(resolve(outPath), fontVars + css + extras);
console.log(`Wrote ${resolve(outPath)} (${fontVars.length + css.length + extras.length} bytes, scoped)`);
