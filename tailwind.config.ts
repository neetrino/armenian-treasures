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
      },
      letterSpacing: {
        eyebrow: '0.2em',
        stat: '0.15em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [typography],
};

export default config;
