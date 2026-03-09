import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HookProps {
  className?: string;
  variant?: '1' | '2';
}

export default function Hook({ className, variant = '1' }: HookProps) {
  if (variant === '1')
    return (
      <Image
        src="/pegboard/hook_1.png"
        alt="Hook"
        width={96}
        height={96}
        unoptimized
        className={cn(
          'absolute aspect-[96/96] w-10 select-none',
          className ? className : '-top-5 right-3.5'
        )}
      />
    );

  return (
    <Image
      src="/pegboard/hook_2.png"
      alt="Hook"
      width={24}
      height={102}
      unoptimized
      className={cn(
        'absolute aspect-[24/102] w-2.5 select-none',
        className ? className : 'bottom-2 left-10'
      )}
    />
  );
}
