'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { SidebarInset } from '@/components/ui/Sidebar';

export default function ControlPanelRenderer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === 'loading' || status === 'unauthenticated')
    return <>{children}</>;

  return <SidebarInset>{children}</SidebarInset>;
}
