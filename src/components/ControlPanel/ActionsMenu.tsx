import React from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { Typography } from '@/components/Typography/Typography';
import { useSession } from 'next-auth/react';
import {
  FileIcon,
  FilePlusIcon,
  HammerIcon,
  MoreHorizontalIcon,
  UserPlusIcon,
  UsersIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Link from '@/components/ui/Link';

export default function ActionsMenu() {
  const { data } = useSession();
  const isMobile = useMediaQuery(920);

  if (!data) return null;

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
                <FileIcon />
                <Typography as={'span'} preset={9}>
                  Administrar Posts
                </Typography>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontalIcon />
                  <span className={'sr-only'}>More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem asChild>
                  <Link href={'/dashboard/posts/create'}>
                    <FilePlusIcon />
                    <Typography as={'span'} preset={9}>
                      Crear Post
                    </Typography>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={'Administrar Herramientas'}>
              <Link href={'/dashboard/tools'}>
                <HammerIcon />
                <Typography as={'span'} preset={9}>
                  Administrar Herramientas
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontalIcon />
                    <span className={'sr-only'}>More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                >
                  <DropdownMenuItem asChild>
                    <Link href={'/dashboard/posts/create'}>
                      <UserPlusIcon />
                      <Typography as={'span'} preset={9}>
                        Invitar Usuario
                      </Typography>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
}
