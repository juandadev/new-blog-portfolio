import React, { JSX, ReactNode } from 'react';

import clsx from 'clsx';

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  preset?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: ReactNode;
  decoration?: 1 | 2;
};

export function Heading({
  level = 1,
  preset = 1,
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
    <span className={'relative inline w-fit'}>
      <Tag
        className={clsx(
          defaultStyles[preset || level],
          'font-dm dark:text-neutral-0 relative z-1 w-fit text-left text-neutral-700',
          className
        )}
      >
        {children}
      </Tag>
      {decoration && (
        <div
          className={clsx(
            'absolute z-0 block bg-blue-500 dark:bg-blue-700',

            decoration === 1
              ? 'bottom-[5px] left-0 h-100 w-full'
              : '-right-[50px] bottom-[9px] h-[3px] w-500'
          )}
        />
      )}
    </span>
  );
}
