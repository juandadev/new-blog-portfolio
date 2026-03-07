import React from 'react';
import { SidebarInset } from '@/components/ui/Sidebar';

export default function ControlPanelRenderer({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <SidebarInset className={className}>{children}</SidebarInset>;
}
