import React from 'react';

import NavigationMenu from '@/components/Navbar/NavigationMenu';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import UserMenu from '@/components/Navbar/UserMenu';

export default function Navbar() {
  return (
    <header
      className={
        'p-075 rounded-10 bg-card border-border fixed top-200 right-200 left-200 z-40 flex max-w-[640px] items-center justify-between border-1 shadow-[0_6px_10px_0_rgba(123,123,123,0.03)] sm:right-auto sm:left-auto sm:w-full'
      }
    >
      <UserMenu />
      <div className={'gap-075 flex'}>
        <NavigationMenu />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
