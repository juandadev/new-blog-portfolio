import React from 'react';
import { SidebarInset } from '@/components/ui/Sidebar';

export default function ControlPanelRenderer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarInset>{children}</SidebarInset>;
}
