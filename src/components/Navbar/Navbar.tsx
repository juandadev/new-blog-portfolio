'use client';

import React, { ComponentProps } from 'react';
import { NAV_ITEMS } from '@/constants/ui';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import TwitterIcon from '@/icons/TwitterIcon';

const Tab = ({ children, ...restProps }: ComponentProps<'button'>) => {
  return (
    <button
      className="relative isolate rounded-full px-2 py-1 text-sm"
      {...restProps}
    >
      {children}
    </button>
  );
};

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-background/85 relative z-50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 md:px-10 lg:px-20">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/juandadev.webp"
            alt="Juanda's picture"
            width={50}
            height={50}
            unoptimized
            className="size-8 rounded-full object-cover object-center"
          />
          <span className="font-medium">Juanda</span>
        </Link>
        <div className="bg-muted hidden gap-2 rounded-full p-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = isNavActive(pathname, item.href);

            return (
              <Tab key={`nav-${item.label}`}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-muted-foreground hover:text-foreground relative z-2 capitalize transition-colors',
                    isActive && 'text-foreground'
                  )}
                >
                  {item.label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="bg-background absolute inset-0 z-1 rounded-full"
                    transition={{
                      duration: 0.3,
                      ease: [0.79, 0.14, 0.15, 0.86],
                    }}
                  />
                )}
              </Tab>
            );
          })}
        </div>
        <Link
          href="https://x.com/juandadotdev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter/X profile"
          className="hover:text-foreground/65 hidden transition-colors duration-200 md:block"
        >
          <TwitterIcon size={16} />
        </Link>
      </div>
    </nav>
  );
}
