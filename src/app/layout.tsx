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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
    <html
      lang="en-US"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="box-border h-dvh font-sans antialiased">
        <AppProviders>
          <ControlPanel />
          <Toaster richColors />
          <ControlPanelRenderer>
            <div className="container mx-auto mb-9 flex w-full flex-1 flex-col px-4 pt-36 md:pt-48">
              <div className="mx-auto w-full max-w-6xl">
                <Navbar />
                <main>
                  {children}
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
            </div>
          </ControlPanelRenderer>
        </AppProviders>
      </body>
    </html>
  );
}
