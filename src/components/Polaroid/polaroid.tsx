'use client';

import React, { JSX, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import PegboardClip from '@/components/Pegboard/pegboard-clip';
import { motion } from 'motion/react';
import { Transition } from 'motion';

interface PolaroidProps extends React.HTMLProps<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  withClip?: boolean;
  clipClassName?: string;
  className?: string;
  label?: string;
  src: string;
  withAnimation?: boolean;
}

export default function Polaroid({
  src,
  orientation = 'vertical',
  withClip = false,
  clipClassName,
  children,
  className,
  withAnimation = false,
}: PolaroidProps): JSX.Element {
  // TODO: if this component is being used on many pages, refactor to supress nextjs optimization and load high-res and low-res options instead for the expand function
  const [isExpanded, setIsExpanded] = useState(false);

  const polaroidId = useId();
  const openCloseAnimation: Transition = {
    duration: 0.2,
    ease: [0.45, 0.05, 0.55, 0.95],
  };

  return (
    <>
      <div className="relative isolate z-3 h-fit w-fit justify-self-center">
        {withClip && (
          <PegboardClip
            className={
              clipClassName ? clipClassName : '-top-19 left-0 -rotate-15'
            }
          />
        )}
        <div
          className={cn(
            'shadow-pegboard relative cursor-zoom-in rounded-sm bg-taupe-100',
            "before:absolute before:inset-0 before:-z-1 before:overflow-hidden before:rounded-sm before:bg-[url('/textures/paper_texture.png')] before:bg-repeat before:opacity-10",
            orientation === 'vertical'
              ? 'aspect-82/133 h-auto max-w-60'
              : 'aspect-133/82 max-h-39 w-auto',
            withAnimation && 'polaroid-animate',
            className
          )}
          onClick={() => setIsExpanded(true)}
        >
          <div
            className={cn(
              'h-full w-full',
              orientation === 'vertical'
                ? 'grid grid-cols-1 grid-rows-[85%_1fr]'
                : 'grid grid-cols-[85%_1fr] grid-rows-1'
            )}
          >
            <span className="sr-only">Polaroid</span>
            <div
              className={cn(
                'inset-shadow-polaroid flex h-full w-full',
                orientation === 'vertical'
                  ? 'rounded-t-sm px-[7%] pt-[13%] pb-[7%]'
                  : 'rounded-l-sm py-[7%] pr-[7%] pl-[13%]'
              )}
            >
              {!isExpanded && (
                <motion.div
                  layoutId={polaroidId}
                  className="h-full w-full"
                  transition={openCloseAnimation}
                >
                  <Image
                    src={src}
                    alt="Juan Martinez profile picture"
                    width={256}
                    height={341}
                    className="aspect-170/226 h-auto w-auto flex-1 self-stretch object-cover"
                  />
                </motion.div>
              )}
            </div>
            <div
              className={cn(
                'font-script flex items-center justify-center text-2xl',
                orientation === 'horizontal' && 'writing-vertical-rl rotate-180'
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      {isExpanded &&
        createPortal(
          <div className="fixed inset-0 top-0 isolate z-50 flex h-dvh w-dvw items-center justify-center">
            <motion.div
              className="bg-background/90 absolute inset-0 z-0"
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(5px)' }}
              transition={openCloseAnimation}
              onClick={() => setIsExpanded(false)}
            />
            <motion.div
              layoutId={polaroidId}
              className="z-1"
              transition={openCloseAnimation}
            >
              <Image
                src={src}
                alt="Juan Martinez profile picture"
                width={1000}
                height={1333}
                className="aspect-170/226 h-100 w-auto flex-1 self-stretch rounded-md object-cover md:h-150"
              />
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
}
