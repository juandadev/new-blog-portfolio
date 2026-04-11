import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/app/providers';
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
import Navbar from '@/components/Navbar/Navbar';
import Pegboard from '@/components/Pegboard/pegboard';

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
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
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
      <body className="bg-background dotted-grid-pattern relative box-border min-h-dvh overflow-x-hidden font-sans antialiased">
        <AppProviders>
          <Navbar />
          <div className="relative mt-5 px-2 py-16 lg:px-4">
            <Pegboard />
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
