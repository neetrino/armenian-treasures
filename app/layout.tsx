import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Armenian Treasures — Cultural Heritage Foundation',
    template: '%s · Armenian Treasures',
  },
  description:
    "The living archive of Armenian heritage. We digitize Armenia's monasteries, fortresses, museums and folk arts for the diaspora and scholars worldwide.",
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Armenian Treasures — Cultural Heritage Foundation',
    description: 'The living archive of Armenian heritage.',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport: Viewport = {
  themeColor: '#7E1C26',
  colorScheme: 'light',
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`scrollbar-none ${cormorant.variable} ${inter.variable}`}
    >
      <body className="scrollbar-none min-h-screen bg-parchment text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
