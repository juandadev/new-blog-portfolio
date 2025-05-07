import React from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import Link from 'next/link';
import { Typography } from '@/components/Typography/Typography';
import { useSession } from 'next-auth/react';
import { NotebookTextIcon, UsersIcon } from 'lucide-react';

export default function ActionsMenu() {
  const { data } = useSession();

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <Typography as={'div'} preset={10}>
            Acciones de Usuario
          </Typography>
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={'Administrar Posts'}>
              <Link href={'/dashboard/posts'}>
                <NotebookTextIcon />
                <Typography as={'span'} preset={9}>
                  Administrar Posts
                </Typography>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      {data?.user.role === 'ADMIN' && (
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <Typography as={'div'} preset={10}>
              Acciones de Administrador
            </Typography>
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={'Administrar Usuarios'}>
                <Link href={'/dashboard/users'}>
                  <UsersIcon />
                  <Typography as={'span'} preset={9}>
                    Administrar Usuarios
                  </Typography>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
}
