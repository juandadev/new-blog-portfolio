import React from 'react';

import NavigationMenu from '@/components/Navbar/NavigationMenu';

export default function Navbar() {
  return (
    <div
      className={
        'p-075 rounded-10 bg-neutral-0 fixed top-200 right-200 left-200 flex items-center justify-between border-1 border-neutral-200 shadow-[0_6px_10px_0_rgba(123,123,123,0.03)]'
      }
    >
      <div>
        <NavigationMenu />
      </div>
    </div>
  );
}
