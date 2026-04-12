'use client';

import NextLink from 'next/link';
import type { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import * as React from 'react';
import { cn } from '@/lib/utils';

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
        className={cn(
          className ??
            'focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm text-sm leading-5 focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none'
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
