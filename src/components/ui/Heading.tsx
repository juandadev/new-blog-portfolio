import React, { JSX, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: ReactNode;
  decoration?: 1 | 2;
};

export function Heading({
  level = 1,
  className,
  children,
  decoration,
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const defaultStyles = {
    1: 'text-[40px]/[130%] font-extrabold tracking-[-1px]',
    2: 'text-[32px]/[130%] font-extrabold tracking-[-0.5px]',
    3: 'text-[28px]/[130%] font-bold tracking-[-0.5px]',
    4: 'text-[24px]/[130%] font-semibold tracking-[-0.5px]',
    5: 'text-[20px]/[130%] font-semibold tracking-[-0.5px]',
    6: 'text-[18px]/[150%] font-medium tracking-[-0.5px]',
  };

  return (
    <Tag
      className={cn(
        defaultStyles[level],
        'font-dm dark:text-neutral-0 relative text-left text-neutral-700',
        decoration &&
          (decoration === 1
            ? 'before:absolute before:bottom-[5px] before:left-0 before:-z-1 before:block before:h-100 before:w-full before:bg-blue-500'
            : 'before:absolute before:-right-[50px] before:bottom-[9px] before:-z-1 before:block before:h-[3px] before:w-500 before:bg-blue-500'),
        className
      )}
    >
      {children}
    </Tag>
  );
}
