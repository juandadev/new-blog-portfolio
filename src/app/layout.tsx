import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/app/providers';
import { Toaster } from '@/components/ui/Sonner';
import { Databuddy } from '@databuddy/sdk/react';
import {
  JetBrains_Mono,
  Hanken_Grotesk,
  Nanum_Pen_Script,
} from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import {
  generatePersonSchema,
  generateWebSiteSchema,
} from '@/lib/structured-data';
import { SITE_CONFIG } from '@/constants/seo';
import { PromoBanner } from '@/components/PromoBanner/PromoBanner';

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const nanumPenScript = Nanum_Pen_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-nanum',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Juandadev – Frontend Developer & Content Creator',
    template: '%s | Juandadev',
  },
  description:
    'Bilingual Frontend Developer focused on React and Next.js, v0 ambassador. Based in Mexico. Available for part-time contractor work remote.',
  keywords: [
    'frontend developer',
    'React developer',
    'Next.js developer',
    'v0 ambassador',
    'web development',
    'JavaScript',
    'TypeScript',
    'freelance developer Mexico',
    'remote developer',
    'software engineer',
    'Juan Martinez',
    'juandadev',
  ],
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author.name,
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'Juandadev – Frontend Developer & Content Creator',
    description:
      'Bilingual Frontend Developer focused on React and Next.js, v0 ambassador. Based in Guadalajara, Mexico. Available for part-time contractor work worldwide.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: SITE_CONFIG.twitterHandle,
    site: SITE_CONFIG.twitterHandle,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable} ${nanumPenScript.variable}`}
    >
      <head>
        <JsonLd data={[generatePersonSchema(), generateWebSiteSchema()]} />
      </head>
      <body className="bg-dotted-pattern box-border min-h-dvh overflow-x-hidden p-2 font-sans antialiased lg:p-4">
        <AppProviders>
          <Toaster richColors />
          <PromoBanner />
          {children}
          <Databuddy
            clientId="p-JbY62eVMrzzwCIEjAE7"
            disabled={process.env.NODE_ENV === 'development'}
            trackAttributes={true}
            trackOutgoingLinks={true}
            trackInteractions={true}
            trackEngagement={true}
            trackScrollDepth={true}
            trackExitIntent={true}
            trackBounceRate={true}
            enableBatching={true}
          />
        </AppProviders>
      </body>
    </html>
  );
}
