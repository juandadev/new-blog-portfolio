'use client';

import NextLink from 'next/link';
import type { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import * as React from 'react';
import { clsx } from 'clsx';

type CustomLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    className?: string;
  };

const Link = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, className, children, ...props }, ref) => {
    return (
      <NextLink
        href={href}
        ref={ref}
        className={clsx(
          'focus-visible:ring-ring text-preset-6 focus-visible:ring-offset-background focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none',
          className
        )}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
