'use client';

import React, { useId } from 'react';
import { useSideDrawings } from '@/contexts/SideDrawingsContext';
import { cn } from '@/lib/utils';
import { ImageIcon, ImageOffIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export function BlogSideDrawingsToggle() {
  const labelId = useId();
  const { sideDrawingsVisible, toggleSideDrawings } = useSideDrawings();

  return (
    <div className="hidden items-center gap-3 lg:flex">
      <span id={labelId} className="text-muted-foreground font-sans text-sm">
        Toggle stickers
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={sideDrawingsVisible}
        aria-labelledby={labelId}
        onClick={toggleSideDrawings}
        className={cn(
          'focus-visible:ring-ring border-input bg-muted relative inline-flex h-7.5 w-12 shrink-0 cursor-pointer rounded-full border transition-colors',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          sideDrawingsVisible && 'border-primary/10 bg-primary/15',
          sideDrawingsVisible
            ? 'text-primary/70 hover:text-primary hover:border-primary/40'
            : 'text-muted-foreground hover:text-foreground hover:border-foreground/15'
        )}
      >
        <motion.span
          className="bg-background ring-border pointer-events-none absolute top-0.5 left-0.5 flex size-6 items-center justify-center rounded-full shadow-sm ring-1"
          initial={false}
          animate={{
            x: sideDrawingsVisible ? '1.125rem' : '0rem',
          }}
          transition={{
            duration: 0.2,
            ease: [0.79, 0.14, 0.15, 0.86],
          }}
          aria-hidden
        >
          {/* 2. THE ICONS: Only the contents unmount/remount to trigger the blur */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={sideDrawingsVisible ? 'visible' : 'not-visible'}
              initial={{ opacity: 0, filter: 'blur(2px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(2px)' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {sideDrawingsVisible ? (
                <ImageIcon className="size-3.5" />
              ) : (
                <ImageOffIcon className="size-3.5" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.span>
      </button>
    </div>
  );
}
