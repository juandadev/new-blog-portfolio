import React from 'react';
import type { Metadata } from 'next';
import { Reddit_Sans, Fira_Code, Sora } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/app/providers';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ControlPanel from '@/components/ControlPanel/ControlPanel';
import ControlPanelRenderer from '@/components/ControlPanel/ControlPanelRenderer';
import { RouteProgressBar } from '@/components/ui/RouteProgressBar';
import { Toaster } from '@/components/ui/Sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
});

const reddit_sans = Reddit_Sans({
  variable: '--font-reddit-sans',
  subsets: ['latin'],
  display: 'swap',
});

const fira_code = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Juandadev – Frontend Dev & Content Creator',
  description:
    "I'm Juan Martinez, a Frontend Developer from Mexico specializing in React and Next.js. I create modern, performant, and scalable web applications. Follow my blog and social media for tips and tutorials.",
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
    <html lang="en-US" suppressHydrationWarning>
      <body
        className={`${reddit_sans.variable} ${fira_code.variable} ${sora.variable} box-border h-dvh antialiased`}
      >
        <AppProviders>
          <RouteProgressBar />
          <ControlPanel />
          <Toaster richColors />
          <ControlPanelRenderer>
            <div className="container mx-auto flex w-full flex-1 flex-col px-4">
              <Navbar />
              <main>
                {children}
                <SpeedInsights />
              </main>
              <Footer />
            </div>
          </ControlPanelRenderer>
        </AppProviders>
      </body>
    </html>
  );
}
