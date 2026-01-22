import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/app/providers';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ControlPanel from '@/components/ControlPanel/ControlPanel';
import ControlPanelRenderer from '@/components/ControlPanel/ControlPanelRenderer';
import { Toaster } from '@/components/ui/Sonner';
import { Databuddy } from '@databuddy/sdk/react';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import PageHeader from '@/components/PageHeader/PageHeader';
import { JsonLd } from '@/components/JsonLd';
import {
  generatePersonSchema,
  generateWebSiteSchema,
} from '@/lib/structured-data';
import { SITE_CONFIG } from '@/constants/seo';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <JsonLd data={[generatePersonSchema(), generateWebSiteSchema()]} />
      </head>
      <body className="box-border h-dvh font-sans antialiased">
        <AppProviders>
          <ControlPanel />
          <Toaster richColors />
          <ControlPanelRenderer>
            <div className="min-h-screen">
              <Navbar />
              <main className="mx-auto max-w-4xl px-6 py-12 md:px-12 md:py-16">
                <div className="space-y-16">
                  <PageHeader />
                  {children}
                </div>
                <Databuddy
                  clientId="p-JbY62eVMrzzwCIEjAE7"
                  trackAttributes={true}
                  trackOutgoingLinks={true}
                  trackInteractions={true}
                  trackEngagement={true}
                  trackScrollDepth={true}
                  trackExitIntent={true}
                  trackBounceRate={true}
                  enableBatching={true}
                />
              </main>
              <Footer />
            </div>
          </ControlPanelRenderer>
        </AppProviders>
      </body>
    </html>
  );
}
