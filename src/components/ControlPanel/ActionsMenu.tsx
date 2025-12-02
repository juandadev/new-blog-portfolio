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
  CoffeeIcon,
  FileIcon,
  FilePlusIcon,
  HammerIcon,
  JoystickIcon,
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
        <SidebarGroupLabel>User Actions</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/posts">
                <FileIcon />
                <Typography as="span" preset={9}>
                  Manage Posts
                </Typography>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontalIcon />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/posts/create">
                    <FilePlusIcon />
                    <Typography as="span" preset={9}>
                      New Post
                    </Typography>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/tools">
                <HammerIcon />
                <Typography as="span" preset={9}>
                  Manage v0 Labs
                </Typography>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      {data?.user.role === 'ADMIN' && (
        <SidebarGroup>
          <SidebarGroupLabel>Admin Actions</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/users">
                  <UsersIcon />
                  <Typography as="span" preset={9}>
                    Manage Users
                  </Typography>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontalIcon />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                >
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/posts/create">
                      <UserPlusIcon />
                      <Typography as="span" preset={9}>
                        Add User
                      </Typography>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/gaming">
                  <JoystickIcon />
                  <Typography as="span" preset={9}>
                    Gaming Data
                  </Typography>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/coffee">
                  <CoffeeIcon />
                  <Typography as="span" preset={9}>
                    Coffee Data
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
