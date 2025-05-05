import React from 'react';
import { cn } from '@/lib/utils';

type TextPresets = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
    <Tag className={cn(presetClass, className)} {...props}>
      {children}
    </Tag>
  );
};
