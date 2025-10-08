'use client';

import NextLink from 'next/link';
import type { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import * as React from 'react';
import { clsx } from 'clsx';
import NProgress from 'nprogress';

type CustomLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    className?: string;
    preventProgressBar?: boolean;
  };

const Link = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    { href, className, children, preventProgressBar = false, target, ...props },
    ref
  ) => {
    const handleClick = () => {
      if (!preventProgressBar || target !== '_blank') NProgress.start();
    };

    return (
      <NextLink
        href={href}
        ref={ref}
        className={clsx(
          className ??
            'focus-visible:ring-ring text-preset-6 focus-visible:ring-offset-background rounded-sm focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none'
        )}
        onClick={handleClick}
        target={target}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
