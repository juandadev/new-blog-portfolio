'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/Sidebar';
import UserMenu from '@/components/ControlPanel/UserMenu';
import ControlPanelHeader from '@/components/ControlPanel/ControlPanelHeader';
import ActionsMenu from '@/components/ControlPanel/ActionsMenu';

export default function ControlPanel() {
  return (
    <Sidebar collapsible={'icon'}>
      <SidebarHeader>
        <ControlPanelHeader />
      </SidebarHeader>
      <SidebarContent>
        <ActionsMenu />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
