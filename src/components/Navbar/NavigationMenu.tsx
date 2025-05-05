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
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NAVIGATION_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Acerca de Mi', href: '/about' },
  { label: 'Newsletter', href: '/newsletter' },
];

export default function NavigationMenu() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (forceState: boolean) => {
    setOpen((prevState) => forceState || !prevState);
  };

  const handleItemSelect = () => {
    setOpen(false);
  };

  const renderLinks = () => {
    return NAVIGATION_LINKS.map((link, index) => (
      <React.Fragment key={link.label}>
        <DropdownMenuItem>
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
        </DropdownMenuItem>
        {index < NAVIGATION_LINKS.length - 1 && <DropdownMenuSeparator />}
      </React.Fragment>
    ));
  };

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
      >
        {renderLinks()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
