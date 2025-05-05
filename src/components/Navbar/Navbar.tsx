import React from 'react';

import NavigationMenu from '@/components/Navbar/NavigationMenu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';

export default function Navbar() {
  return (
    <div
      className={
        'p-075 rounded-10 bg-neutral-0 fixed top-200 right-200 left-200 z-99 flex items-center justify-between border-1 border-neutral-200 shadow-[0_6px_10px_0_rgba(123,123,123,0.03)]'
      }
    >
      <Avatar className={'rounded-10 h-[40px] w-[40px]'}>
        <AvatarImage src="https://github.com/juandadev.png" />
        <AvatarFallback>JM</AvatarFallback>
      </Avatar>
      <div>
        <NavigationMenu />
      </div>
    </div>
  );
}
