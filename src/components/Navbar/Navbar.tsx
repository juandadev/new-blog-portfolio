'use client';

import React, { ComponentProps, useCallback, useRef } from 'react';
import { NAV_ITEMS } from '@/constants/ui';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import TwitterIcon from '@/icons/TwitterIcon';
import {
  useSkadisSurface,
  type SkadisSurfaceVariant,
} from '@/components/Providers/SkadisSurfaceProvider';

const SKADIS_SURFACE_OPTIONS: {
  id: SkadisSurfaceVariant;
  /** Accessible name for the pegboard surface option */
  label: string;
}[] = [
  { id: 'wood', label: 'Wood' },
  { id: 'black', label: 'Black' },
  { id: 'white', label: 'White' },
];

const SKADIS_SWATCH_COLOR: Record<SkadisSurfaceVariant, string> = {
  wood: 'var(--skadis-wood)',
  black: 'var(--skadis-black)',
  white: 'var(--skadis-white)',
};

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
  const { variant: skadisVariant, setVariant: setSkadisVariant } =
    useSkadisSurface();
  const surfaceOptionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusSurfaceOption = useCallback(
    (index: number) => {
      const next = SKADIS_SURFACE_OPTIONS[index];
      if (!next) return;
      setSkadisVariant(next.id);
      queueMicrotask(() => {
        surfaceOptionRefs.current[index]?.focus();
      });
    },
    [setSkadisVariant]
  );

  const onSurfaceKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const i = SKADIS_SURFACE_OPTIONS.findIndex((o) => o.id === skadisVariant);
      if (i < 0) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        focusSurfaceOption((i + 1) % SKADIS_SURFACE_OPTIONS.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        focusSurfaceOption(
          (i - 1 + SKADIS_SURFACE_OPTIONS.length) %
            SKADIS_SURFACE_OPTIONS.length
        );
      } else if (e.key === 'Home') {
        e.preventDefault();
        focusSurfaceOption(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        focusSurfaceOption(SKADIS_SURFACE_OPTIONS.length - 1);
      }
    },
    [skadisVariant, focusSurfaceOption]
  );

  return (
    <nav className="bg-background relative z-50 shadow-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-4 py-4 md:gap-4 md:px-10 lg:px-20">
        <Link href="/" className="flex shrink-0 items-center gap-2">
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
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 md:justify-center md:gap-3">
          <div
            className="bg-muted hover:border-foreground/15 hidden gap-2 rounded-full border p-1 transition-colors md:flex"
            role="group"
          >
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
          <div
            className="bg-muted hover:border-foreground/15 flex shrink-0 gap-1 rounded-full border p-1 transition-colors md:gap-2"
            role="radiogroup"
            aria-label="Pegboard surface color"
            tabIndex={-1}
            onKeyDown={onSurfaceKeyDown}
          >
            {SKADIS_SURFACE_OPTIONS.map(({ id, label }, index) => {
              const isActive = skadisVariant === id;
              return (
                <button
                  key={id}
                  ref={(el) => {
                    surfaceOptionRefs.current[index] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${label} pegboard surface`}
                  onClick={() => setSkadisVariant(id)}
                  className="focus-visible:ring-ring focus-visible:ring-offset-background relative isolate flex size-7 cursor-pointer items-center justify-center rounded-full p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  {isActive && (
                    <motion.div
                      layoutId="skadis-surface-pill"
                      className="bg-background absolute inset-0 z-1 rounded-full"
                      transition={{
                        duration: 0.3,
                        ease: [0.79, 0.14, 0.15, 0.86],
                      }}
                    />
                  )}
                  <span
                    className={cn(
                      'relative z-2 size-5 shrink-0 rounded-full shadow-sm',
                      id === 'white' &&
                        'ring-1 ring-stone-900/20 ring-inset dark:ring-stone-100/25'
                    )}
                    style={{ backgroundColor: SKADIS_SWATCH_COLOR[id] }}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
        <Link
          href="https://x.com/juandadotdev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter/X profile"
          className="hover:text-foreground/65 hidden shrink-0 transition-colors duration-200 md:block"
        >
          <TwitterIcon size={16} />
        </Link>
      </div>
    </nav>
  );
}
