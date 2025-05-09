'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { MenuIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/NavigationMenu';
import { usePathname } from 'next/navigation';
import Link from '@/components/ui/Link';

const NAVIGATION_LINKS = [
  { label: 'Inicio', href: '/' },
  // { label: 'Blog', href: '/blog' },
  { label: 'Acerca de Mi', href: '/about' },
  // { label: 'Newsletter', href: '/newsletter' },
];

export default function NavbarMenu() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(768);
  const pathname = usePathname();

  const handleOpenChange = (forceState: boolean) => {
    setOpen((prevState) => forceState || !prevState);
  };

  const handleItemSelect = () => {
    setOpen(false);
  };

  const renderLinks = () => {
    return NAVIGATION_LINKS.map((link, index) => (
      <React.Fragment key={link.label}>
        <DropdownMenuItem asChild>
          <li>
            <Button
              asChild
              variant={'transparent'}
              size={'menu'}
              onClick={handleItemSelect}
              className={cn(
                index === 0 && 'dark:text-neutral-0 text-neutral-900'
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          </li>
        </DropdownMenuItem>
        {index < NAVIGATION_LINKS.length - 1 && <DropdownMenuSeparator />}
      </React.Fragment>
    ));
  };

  if (isMobile)
    return (
      <DropdownMenu open={open} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'icon'}
            size={'icon'}
            className={cn(open && 'dark:bg-neutral-0 bg-neutral-700')}
          >
            {open ? (
              <XIcon
                className={'text-neutral-0 dark:text-neutral-900'}
                size={20}
              />
            ) : (
              <MenuIcon
                className={'dark:text-neutral-0 text-neutral-700'}
                size={20}
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={'w-[347px]'}
          sideOffset={18}
          collisionPadding={16}
          asChild
        >
          <nav>
            <ul>{renderLinks()}</ul>
          </nav>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <NavigationMenu>
      <NavigationMenuList className={'gap-300'}>
        {NAVIGATION_LINKS.map((link) => (
          <NavigationMenuItem key={link.href} asChild>
            <li>
              <NavigationMenuLink asChild active={pathname === link.href}>
                <Link href={link.href}>{link.label}</Link>
              </NavigationMenuLink>
            </li>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
