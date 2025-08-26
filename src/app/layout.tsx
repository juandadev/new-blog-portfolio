import React from 'react';
import type { Metadata } from 'next';
import { DM_Sans, Fira_Code } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/app/providers';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ControlPanel from '@/components/ControlPanel/ControlPanel';
import ControlPanelRenderer from '@/components/ControlPanel/ControlPanelRenderer';
import { RouteProgressBar } from '@/components/ui/RouteProgressBar';
import { Toaster } from '@/components/ui/Sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';

const dm_sans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

const fira_code = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Juandadev – Desarrollador Frontend y Creador de Contenido',
  description:
    'Soy Juan Martínez. En este sitio encontrarás mi portafolio, artículos sobre desarrollo web, y algunos experimentos raros. Todo lo que voy creando y aprendiendo mientras le pico al teclado.',
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
    <html lang="es-MX" suppressHydrationWarning>
      <body
        className={`${dm_sans.variable} ${fira_code.variable} box-border h-dvh antialiased`}
      >
        <AppProviders>
          <RouteProgressBar />
          <ControlPanel />
          <Toaster richColors />
          <ControlPanelRenderer>
            <div className="container mx-auto flex w-full flex-1 flex-col">
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
