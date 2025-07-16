import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://asso404miashs.fr'),
  title: {
    default: 'Asso 404 MIASHS - Association Étudiante',
    template: '%s | Asso 404 MIASHS',
  },
  description:
    'Association étudiante de Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales. Rejoignez notre communauté de passionnés de tech !',
  keywords: [
    'association étudiante',
    'MIASHS',
    'mathématiques',
    'informatique',
    'sciences humaines',
    'université',
    'Paris',
    'programmation',
    'développement web',
    'data science',
    'événements tech',
    'formation',
    'networking',
  ],
  authors: [{ name: 'Asso 404 MIASHS', url: 'https://asso404miashs.fr' }],
  creator: 'Asso 404 MIASHS',
  publisher: 'Asso 404 MIASHS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://asso404miashs.fr',
    title: 'Asso 404 MIASHS - Association Étudiante',
    description:
      'Rejoignez la communauté étudiante MIASHS ! Événements tech, formations, projets collaboratifs et networking.',
    siteName: 'Asso 404 MIASHS',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Asso 404 MIASHS - Association Étudiante MIASHS',
        type: 'image/jpeg',
      },
      {
        url: '/images/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Asso 404 MIASHS',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asso 404 MIASHS - Association Étudiante',
    description:
      'Rejoignez la communauté étudiante MIASHS ! Événements tech, formations et networking.',
    images: ['/images/og-image.jpg'],
    creator: '@asso404miashs',
    site: '@asso404miashs',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://asso404miashs.fr',
    languages: {
      'fr-FR': 'https://asso404miashs.fr',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
  category: 'education',
  classification: 'Association étudiante',
  referrer: 'origin-when-cross-origin',
  applicationName: 'Asso 404 MIASHS',
  generator: 'Next.js',
  abstract:
    'Association étudiante dédiée aux MIASHS avec événements, formations et projets tech.',
  archives: ['https://asso404miashs.fr/actualites'],
  assets: ['https://asso404miashs.fr/images'],
  bookmarks: ['https://asso404miashs.fr/trombinoscope'],
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Asso 404',
    'application-name': 'Asso 404 MIASHS',
    'msapplication-TileColor': '#3b82f6',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#ffffff',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preconnect pour optimiser les performances */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch pour les domaines externes */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Preload des ressources critiques */}
        <link
          rel="preload"
          href="/images/logo/logo.svg"
          as="image"
          type="image/svg+xml"
        />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Scripts de performance (à configurer selon vos besoins) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            {process.env.NEXT_PUBLIC_GA_ID && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                        page_title: document.title,
                        page_location: window.location.href,
                      });
                    `,
                  }}
                />
              </>
            )}
          </>
        )}
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="asso-404-theme"
        >
          {/* Structure principale de l'application */}
          <div className="relative flex min-h-screen flex-col">
            <Header />

            {/* Contenu principal avec padding pour le header fixe */}
            <main className="flex-1 pt-16">{children}</main>

            <Footer />
          </div>

          {/* Scripts additionnels */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-4 right-4 z-50 no-print">
              <div className="rounded-lg bg-card border border-border px-2 py-1 text-xs font-mono shadow-lg">
                <div className="text-muted-foreground">
                  <span className="hidden sm:inline">sm</span>
                  <span className="hidden md:inline">md</span>
                  <span className="hidden lg:inline">lg</span>
                  <span className="hidden xl:inline">xl</span>
                  <span className="hidden 2xl:inline">2xl</span>
                </div>
              </div>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
