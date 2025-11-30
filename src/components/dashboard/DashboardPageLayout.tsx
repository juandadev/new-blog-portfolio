import React from 'react';
import { Heading } from '@/components/ui/Heading';

interface DashboardPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DashboardPageLayout({
  title,
  description,
  children,
}: DashboardPageLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Heading level={4}>{title}</Heading>
        <p className="text-muted-foreground font-sans">{description}</p>
      </div>
      {children}
    </div>
  );
}
