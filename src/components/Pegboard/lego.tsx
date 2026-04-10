import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LegoProps {
  className?: string;
}

export default function Lego({ className }: LegoProps) {
  return (
    <Image
      src="/legos/vader.png"
      alt="Lego"
      width={1104}
      height={1853}
      unoptimized
      className={cn(
        'aspect-[1104/1853] w-44 drop-shadow-md/25 select-none',
        className
      )}
    />
  );
}
