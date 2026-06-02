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
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 24px -12px rgba(26,23,20,0.18)',
        'card-hover': '0 18px 40px -20px rgba(26,23,20,0.32)',
      },
      backgroundImage: {
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
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'portal-marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'portal-marquee': 'portal-marquee 32s linear infinite',
      },
    },
  },
  plugins: [typography],
};

export default config;
