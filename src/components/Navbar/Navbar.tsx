import React from 'react';

import NavbarMenu from '@/components/Navbar/NavbarMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import ControlPanelTrigger from '@/components/ControlPanel/ControlPanelTrigger';
import Link from '@/components/ui/Link';

export default function Navbar() {
  return (
    <header
      className={
        'fixed top-4 right-0 left-0 z-40 mx-4 flex max-w-[640px] items-center justify-between rounded-lg border border-neutral-400 bg-transparent p-2 shadow-[0_6px_10px_0_rgba(123,123,123,0.03)] backdrop-blur-md md:mx-auto'
      }
    >
      <Avatar className="h-[40px] w-[40px] rounded-md" asChild>
        <Link href={'/'}>
          <AvatarImage src="https://github.com/juandadev.png" />
          <AvatarFallback>JM</AvatarFallback>
        </Link>
      </Avatar>

      <div className="flex gap-1.5 md:gap-5">
        <NavbarMenu />
        <ControlPanelTrigger />
      </div>
    </header>
  );
}
