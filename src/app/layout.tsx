import React from 'react';
import type { Metadata } from 'next';
import { DM_Sans, Fira_Code } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/app/providers';
import Navbar from '@/components/Navbar/Navbar';

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
  title: 'Juandadev Blog',
  description: 'My personal blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dm_sans.variable} ${fira_code.variable} box-border flex min-h-screen flex-col items-center antialiased`}
      >
        <AppProviders>
          <div className={'mt-200 flex w-full max-w-[640px] flex-1 flex-col'}>
            <Navbar />
            <main
              className={
                'border-border mx-250 flex-1 border-x px-[10px] pt-[84px] sm:mx-[9px]'
              }
            >
              {children}
            </main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
