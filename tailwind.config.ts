import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          black: 'var(--heritage-black)',
          'green-black': 'var(--heritage-green-black)',
          'dark-teal': 'var(--heritage-dark-teal)',
          gold: 'var(--heritage-gold)',
          'gold-muted': 'var(--heritage-gold-muted)',
          nav: 'var(--heritage-nav)',
          champagne: 'var(--heritage-champagne)',
          teal: 'var(--heritage-teal)',
          'text-muted': 'var(--heritage-text-muted)',
          'border-gold': 'var(--heritage-border-gold)',
          'grid-line': 'var(--heritage-grid-line)',
          'glow-teal': 'var(--heritage-glow-teal)',
          'glow-gold': 'var(--heritage-glow-gold)',
        },
        parchment: {
          DEFAULT: '#FAF6EE',
          50: '#FDFBF6',
          100: '#FAF6EE',
          200: '#F2EADB',
          300: '#E8DDC5',
        },
        ink: {
          DEFAULT: '#1A1714',
          soft: '#3A332C',
          muted: '#6B5F52',
        },
        pomegranate: {
          DEFAULT: '#7E1C26',
          600: '#8B1E2D',
          700: '#6B1820',
          800: '#4D1118',
        },
        bronze: {
          DEFAULT: '#C8843D',
          400: '#D89A55',
          500: '#C8843D',
          600: '#A86A28',
          700: '#7E4D18',
        },
        stone: {
          50: '#F5F1EA',
          100: '#E9E2D5',
          200: '#D5CABA',
          300: '#B6A893',
          400: '#8E806B',
        },
        midnight: {
          DEFAULT: '#1E2A5E',
          900: '#141C42',
        },
        surface: {
          DEFAULT: 'var(--surface-bg)',
          text: 'var(--surface-text)',
          muted: 'var(--surface-text-muted)',
          body: 'var(--surface-text-body)',
          subtle: 'var(--surface-text-subtle)',
          border: 'var(--surface-border)',
        },
        layout: {
          DEFAULT: 'var(--layout-bg)',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        cinzel: ['var(--font-cinzel)', 'Georgia', 'serif'],
        'cinzel-deco': ['var(--font-cinzel-deco)', 'var(--font-cinzel)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 24px -12px rgba(26,23,20,0.18)',
        'card-hover': '0 18px 40px -20px rgba(26,23,20,0.32)',
      },
      backgroundImage: {
        'heritage-radial':
          'radial-gradient(ellipse 120% 80% at 50% 50%, #07110F 0%, #030504 55%, #030504 100%)',
        'heritage-gold-glow':
          'radial-gradient(ellipse 55% 45% at 8% 92%, rgba(214, 184, 90, 0.18) 0%, transparent 70%)',
        'heritage-teal-glow':
          'radial-gradient(ellipse 50% 40% at 92% 8%, rgba(39, 198, 200, 0.14) 0%, transparent 65%)',
        'hero-diamond-grid':
          'repeating-linear-gradient(45deg, rgba(214, 184, 90, 0.035) 0, rgba(214, 184, 90, 0.035) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(-45deg, rgba(214, 184, 90, 0.035) 0, rgba(214, 184, 90, 0.035) 1px, transparent 1px, transparent 24px)',
        'hero-gold-title':
          'var(--hero-title-gradient)',
        'brand-gradient':
          'linear-gradient(to right, #6B1820 0%, rgba(77,17,24,0.92) 50%, #141C42 100%)',
        'hero-overlay':
          'linear-gradient(90deg, rgba(10,6,24,0.95) 0%, rgba(26,15,40,0.7) 45%, transparent 72%)',
        'hero-left-fade':
          'linear-gradient(105deg, rgba(8,4,18,0.82) 0%, rgba(18,10,32,0.62) 32%, rgba(30,18,48,0.32) 48%, rgba(20,12,36,0.1) 58%, transparent 72%)',
        'hero-left-fade-mobile':
          'linear-gradient(180deg, rgba(6,3,14,0.82) 0%, rgba(10,5,20,0.62) 35%, rgba(12,7,24,0.45) 58%, rgba(8,4,18,0.28) 100%)',
        'hero-bottom-fade':
          'linear-gradient(to top, rgba(8,4,18,0.72) 0%, rgba(12,8,28,0.42) 18%, rgba(14,10,32,0.16) 38%, transparent 58%)',
        'hero-cinematic-overlay':
          'linear-gradient(90deg, rgba(8,7,22,0.92) 0%, rgba(20,13,32,0.72) 28%, rgba(30,16,36,0.38) 52%, rgba(10,8,22,0.18) 100%), linear-gradient(180deg, rgba(5,5,18,0.25) 0%, rgba(5,5,18,0.05) 45%, rgba(5,5,18,0.75) 100%)',
        'hero-gold-text':
          'linear-gradient(118deg, #f5e6c8 0%, #e8c078 22%, #d89a55 48%, #c8843d 72%, #a86a28 100%)',
        'hero-gold-btn':
          'linear-gradient(135deg, #ecc98a 0%, #d89a55 38%, #c8843d 68%, #a86a28 100%)',
      },
      letterSpacing: {
        eyebrow: '0.2em',
        stat: '0.15em',
        'nav-heritage': '0.14em',
        'hero-eyebrow': '0.42em',
        'hero-subtitle': '0.34em',
        'hero-subtitle-mobile': '0.12em',
        'hero-tagline': '0.28em',
        'cta-heritage': '0.16em',
      },
      height: {
        'site-header': 'var(--site-header-height)',
      },
      inset: {
        'site-header': 'var(--site-header-height)',
      },
      minHeight: {
        'hero-viewport': 'calc(100svh - var(--site-header-height))',
      },
      transitionDuration: {
        250: '250ms',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
        theme: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'portal-marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'particle-float': {
          '0%, 100%': { opacity: '0.25', transform: 'translateY(0)' },
          '50%': { opacity: '0.65', transform: 'translateY(-6px)' },
        },
        'hero-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'admin-fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'admin-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'admin-slide-left': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'admin-slide-right': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'admin-scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'admin-bar-up': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'admin-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'admin-liquid-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'admin-liquid-wave': {
          '0%': { transform: 'translateX(-42%) translateY(0px) scale(1)' },
          '50%': { transform: 'translateX(18%) translateY(-1px) scale(1.04)' },
          '100%': { transform: 'translateX(58%) translateY(0px) scale(1)' },
        },
        'admin-water-drift': {
          '0%': { transform: 'translateX(-48%) translateY(0) scale(1)' },
          '50%': { transform: 'translateX(8%) translateY(-3%) scale(1.05)' },
          '100%': { transform: 'translateX(56%) translateY(0) scale(1)' },
        },
        'admin-water-drift-soft': {
          '0%': { transform: 'translateX(-42%) translateY(0) scale(1)' },
          '50%': { transform: 'translateX(14%) translateY(3%) scale(1.03)' },
          '100%': { transform: 'translateX(60%) translateY(0) scale(1)' },
        },
      },
      animation: {
        'portal-marquee': 'portal-marquee 32s linear infinite',
        'particle-float': 'particle-float 8s ease-in-out infinite',
        'hero-fade-in': 'hero-fade-in 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'admin-fade-up': 'admin-fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'admin-fade-in': 'admin-fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'admin-slide-left': 'admin-slide-left 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'admin-slide-right': 'admin-slide-right 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'admin-scale-in': 'admin-scale-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'admin-bar-up': 'admin-bar-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'admin-shimmer': 'admin-shimmer 1.8s ease-in-out infinite',
        'admin-liquid-flow': 'admin-liquid-flow 7.5s ease-in-out infinite',
        'admin-liquid-wave': 'admin-liquid-wave 5.8s ease-in-out infinite',
        'admin-water-drift': 'admin-water-drift 5.6s ease-in-out infinite',
        'admin-water-drift-soft': 'admin-water-drift-soft 7.2s ease-in-out infinite',
      },
    },
  },
  plugins: [typography],
};

export default config;
