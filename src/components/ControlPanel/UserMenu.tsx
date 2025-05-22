import React from 'react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { signOut, useSession } from 'next-auth/react';
import { Typography } from '@/components/Typography/Typography';
import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { getInitials } from '@/lib/utils';

export default function UserMenu() {
  const { data } = useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={'lg'}
              className={
                'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              }
            >
              <Avatar className={'rounded-10'}>
                <AvatarImage src={data?.user?.profilePicture || ''} />
                <AvatarFallback>
                  {getInitials(data!.user.name || '')}
                </AvatarFallback>
              </Avatar>
              <div className={'grid flex-1 text-left'}>
                <Typography as={'span'} preset={10} className={'font-semibold'}>
                  {data?.user.name}
                </Typography>
                <Typography
                  as={'span'}
                  preset={10}
                  className={'text-current/50'}
                >
                  {data?.user.email}
                </Typography>
              </div>
              <ChevronsUpDownIcon size={16} className={'ml-auto'} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={'top'} align={'end'} sideOffset={8}>
            <ThemeSwitcher item />
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => signOut({ callbackUrl: '/' })}>
                <Typography as={'span'} preset={9}>
                  <LogOutIcon />
                  Cerrar Sesión
                </Typography>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
