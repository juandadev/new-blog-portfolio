import React, { JSX, ReactNode } from 'react';

import clsx from 'clsx';

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  preset?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: ReactNode;
};

export function Heading({
  level = 1,
  preset,
  className,
  children,
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const defaultStyles = {
    1: 'text-4xl font-bold text-balance md:text-6xl',
    2: 'text-3xl font-bold',
    3: 'text-[28px]/[130%] font-bold tracking-[-0.5px]',
    4: 'text-[24px]/[130%] font-semibold tracking-[-0.5px]',
    5: 'text-[20px]/[130%] font-semibold tracking-[-0.5px]',
    6: 'text-[18px]/[150%] font-medium tracking-[-0.5px]',
  };

  return (
    <div className="relative inline">
      <Tag
        className={clsx(
          defaultStyles[preset || level],
          'font-reddit text-foreground relative z-1',
          className
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
