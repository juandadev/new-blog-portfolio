import React from 'react';

import NavbarMenu from '@/components/Navbar/NavbarMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import ControlPanelTrigger from '@/components/ControlPanel/ControlPanelTrigger';
import Link from '@/components/ui/Link';

export default function Navbar() {
  return (
    <header
      className={
        'p-075 rounded-10 bg-card border-border fixed top-200 right-200 left-200 z-40 flex max-w-[640px] items-center justify-between border-1 shadow-[0_6px_10px_0_rgba(123,123,123,0.03)] sm:right-auto sm:left-auto sm:w-full'
      }
    >
      <Avatar className={'rounded-10 h-[40px] w-[40px]'} asChild>
        <Link href={'/'}>
          <AvatarImage src="https://github.com/juandadev.png" />
          <AvatarFallback>JM</AvatarFallback>
        </Link>
      </Avatar>

      <div className={'gap-075 flex md:gap-250'}>
        <NavbarMenu />
        <ControlPanelTrigger />
      </div>
    </header>
  );
}
