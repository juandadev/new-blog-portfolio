'use client';

import React from 'react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/Sidebar';
import { Typography } from '@/components/Typography/Typography';
import { LayoutDashboardIcon } from 'lucide-react';
import Link from 'next/link';

export default function ControlPanelHeader() {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={'/dashboard'} onClick={() => setOpenMobile(false)}>
            <LayoutDashboardIcon />
            <Typography as={'span'} preset={6}>
              Panel de Control
            </Typography>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
