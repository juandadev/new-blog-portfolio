import React from 'react';

import NavigationMenu from '@/components/Navbar/NavigationMenu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

export default function Navbar() {
  return (
    <header
      className={
        'p-075 rounded-10 bg-card border-border fixed top-200 right-200 left-200 z-99 flex max-w-[640px] items-center justify-between border-1 shadow-[0_6px_10px_0_rgba(123,123,123,0.03)] sm:right-auto sm:left-auto sm:w-full'
      }
    >
      <Avatar className={'rounded-10 h-[40px] w-[40px]'}>
        <AvatarImage src="https://github.com/juandadev.png" />
        <AvatarFallback>JM</AvatarFallback>
      </Avatar>
      <div className={'gap-075 flex'}>
        <NavigationMenu />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
