'use client';

import Link from 'next/link';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/Sidebar';
import { Typography } from '@/components/Typography/Typography';
import UserMenu from '@/components/ControlPanel/UserMenu';
import ControlPanelHeader from '@/components/ControlPanel/ControlPanelHeader';

const MENU_LINKS = [
  {
    title: 'Panel',
    href: '/dashboard',
    description: 'Página principal',
  },
  {
    title: 'Administrador de Posts',
    href: '/dashboard/posts',
    description: 'Crear, editar y eliminar posts',
  },
  {
    title: 'Administrador de Usuarios',
    href: '/dashboard/users',
    description: 'Crear, editar y eliminar usuarios',
  },
];

export default function ControlPanel() {
  const { status } = useSession();

  if (status === 'loading' || status === 'unauthenticated') return null;

  return (
    <Sidebar collapsible={'icon'}>
      <SidebarHeader>
        <ControlPanelHeader />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
