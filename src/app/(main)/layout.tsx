import React from 'react';
import MainLayoutShell from '@/components/MainLayoutShell';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayoutShell>{children}</MainLayoutShell>;
}
