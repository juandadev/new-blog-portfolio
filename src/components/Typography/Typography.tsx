import React from 'react';
import clsx from 'clsx';

type TextPresets = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  preset?: TextPresets | string;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export const Typography = <T extends React.ElementType = 'p'>({
  as,
  preset = 7,
  className,
  children,
  ...props
}: TypographyProps<T>) => {
  const Tag = as || 'p';
  const presetClass = `text-preset-${preset}`;

  return (
    <Tag
      className={clsx(
        presetClass,
        className,
        as === 'span' && 'flex items-center gap-2'
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
