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
    'Toulouse',
    'Jean Jaurès',
    'programmation',
    'développement web',
    'data science',
    'événements tech',
    'formation',
    'networking',
    'hackathon',
    'conférences',
    'ateliers',
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
      {
        url: '/favicon-96x96.png',
        sizes: '96x96',
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
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
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
    'msapplication-TileImage': '/android-chrome-192x192.png',
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
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />

        {/* Preload des ressources critiques */}
        <link
          rel="preload"
          href="/images/logo/LOGO_ASSO.png"
          as="image"
          type="image/png"
        />

        {/* Icônes explicites pour une meilleure compatibilité */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Métadonnées supplémentaires pour PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Asso 404" />
        <meta name="application-name" content="Asso 404 MIASHS" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta
          name="msapplication-TileImage"
          content="/android-chrome-192x192.png"
        />

        {/* Scripts de performance */}
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
                        cookie_flags: 'SameSite=None;Secure',
                      });
                    `,
                  }}
                />
              </>
            )}

            {/* Hotjar (optionnel) */}
            {process.env.NEXT_PUBLIC_HOTJAR_ID && (
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    (function(h,o,t,j,a,r){
                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                      h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                      a=o.getElementsByTagName('head')[0];
                      r=o.createElement('script');r.async=1;
                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                      a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                  `,
                }}
              />
            )}
          </>
        )}

        {/* Schema.org pour le SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Association 404 MIASHS',
              alternateName: 'Asso 404',
              url: 'https://asso404miashs.fr',
              logo: 'https://asso404miashs.fr/LOGO_ASSO.png',
              description:
                'Association étudiante de Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales',
              foundingDate: '2020',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Université de Toulouse Jean Jaurès',
                addressLocality: 'Toulouse',
                postalCode: '31000',
                addressCountry: 'FR',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'contact@asso404miashs.fr',
                contactType: 'customer service',
                availableLanguage: 'French',
              },
              sameAs: [
                'https://linkedin.com/company/asso-404-miashs',
                'https://github.com/asso-404-miashs',
                'https://discord.gg/asso404miashs',
              ],
              memberOf: {
                '@type': 'EducationalOrganization',
                name: 'Université de Toulouse Jean Jaurès',
              },
            }),
          }}
        />
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
            <main className="flex-1 pt-16" id="main-content">
              {children}
            </main>

            <Footer />
          </div>

          {/* Indicateur de breakpoint en développement */}
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

          {/* Skip to main content pour l'accessibilité */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-lg"
          >
            Aller au contenu principal
          </a>
        </ThemeProvider>
      </body>
    </html>
  );
}