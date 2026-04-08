import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BasketProps {
  className?: string;
}

export default function Basket({ className }: BasketProps) {
  return (
    <Image
      src="/pegboard/basket.png"
      alt="Basket"
      width={260}
      height={56}
      unoptimized
      className={cn('aspect-[260/56] w-33 select-none', className)}
    />
  );
}
