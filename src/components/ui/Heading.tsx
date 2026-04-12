import React, { ReactNode } from 'react';

import clsx from 'clsx';

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  preset?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: ReactNode;
  overrideClassName?: string;
};

const defaultStyles: Record<number, string> = {
  1: 'text-4xl md:text-5xl font-bold mb-6 mt-12 first:mt-0 text-balance',
  2: 'text-3xl md:text-4xl font-bold mb-4 mt-10 text-balance',
  3: 'text-2xl md:text-3xl font-bold mb-3 mt-8 text-balance',
  4: 'text-xl md:text-2xl font-bold mb-3 mt-6 text-balance',
  5: 'text-lg md:text-xl font-bold mb-2 mt-4 text-balance',
  6: 'text-base md:text-lg font-bold mb-2 mt-4 text-balance',
};

export function Heading({
  level = 1,
  preset,
  className,
  children,
  overrideClassName,
}: HeadingProps) {
  return React.createElement(
    `h${level}`,
    {
      className: clsx(
        overrideClassName || defaultStyles[preset || level],
        'font-sans text-foreground relative z-1',
        className
      ),
    },
    children
  );
}
