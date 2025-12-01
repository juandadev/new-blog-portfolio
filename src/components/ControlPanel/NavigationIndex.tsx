import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import React from 'react';
import Link from '@/components/ui/Link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/constants/ui';

export default function NavigationIndex() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>index</SidebarGroupLabel>
      <SidebarMenu>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <SidebarMenuItem key={`nav-item-${item.index}`}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.href}
                  className={cn(isActive && 'bg-sidebar-accent')}
                >
                  <span
                    className={cn(
                      'font-mono text-xs transition-colors duration-200',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-primary'
                    )}
                  >
                    {item.index}
                  </span>
                  <span
                    className={cn(
                      'text-sm transition-colors duration-200',
                      isActive
                        ? 'text-foreground'
                        : 'text-sidebar-foreground group-hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="bg-primary ml-auto h-1.5 w-1.5 animate-pulse rounded-full" />
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
