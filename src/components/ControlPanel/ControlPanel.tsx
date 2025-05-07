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
        <Typography preset={6}>Panel de control</Typography>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administrador de Posts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem onSelect={() => signOut({ callbackUrl: '/' })}>
                <SidebarMenuButton asChild>
                  <Link className={'text-preset-8'} href={'/dashboard/posts'}>
                    Ver Posts
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
