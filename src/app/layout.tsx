import React from 'react';
import type { Metadata, Viewport } from 'next';
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
import { DEFAULT_OG_IMAGE_PATH, SITE_CONFIG } from '@/constants/seo';
import Navbar from '@/components/Navbar/Navbar';
import { MobileTabletExperienceNotice } from '@/components/MobileTabletExperienceNotice';
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
    default: SITE_CONFIG.title,
    template: '%s | Juandadev',
  },
  description: SITE_CONFIG.description,
  keywords: [
    'frontend developer',
    'design engineer',
    'react developer',
    'next.js developer',
    'typeScript developer',
    'web development',
    'portfolio website',
    'technical blog',
    'frontend portfolio',
    'guadalajara developer',
    'mexico developer',
    'Juan Martinez',
    'juandadev',
  ],
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author.name,
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.author.name} | ${SITE_CONFIG.author.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.twitterHandle,
    site: SITE_CONFIG.twitterHandle,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F3F1F1',
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
      <body className="bg-background dotted-grid-pattern relative box-border min-h-dvh overflow-x-hidden pb-10 font-sans antialiased">
        <AppProviders>
          <Navbar />
          <MobileTabletExperienceNotice />
          <div className="relative mt-5 px-2 py-16 lg:px-4">
            <Pegboard />
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
