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
      width={255}
      height={447}
      unoptimized
      className={cn('aspect-[255/447] w-32 select-none', className)}
    />
  );
}
