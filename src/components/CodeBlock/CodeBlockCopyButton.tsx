'use client';

import React, { useEffect, useState, useRef } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { Button } from '@/components/ui/Button';

interface CodeBlockCopyButtonProps {
  rawCode: string;
}

export function CodeBlockCopyButton({ rawCode }: CodeBlockCopyButtonProps) {
  const [isCopied, setCopied] = useState(false);
  const resetCopiedTimeoutRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      if (resetCopiedTimeoutRef.current !== null) {
        clearTimeout(resetCopiedTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
    } catch {
      return;
    }

    if (resetCopiedTimeoutRef.current !== null) {
      clearTimeout(resetCopiedTimeoutRef.current);
    }

    setCopied(true);

    resetCopiedTimeoutRef.current = window.setTimeout(() => {
      setCopied(false);
      resetCopiedTimeoutRef.current = null;
    }, 800);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Copy code block"
      className="bg-secondary absolute top-10 right-2 z-1 cursor-pointer transition-colors"
      onClick={handleCopy}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={isCopied ? 'copied' : 'not-copied'}
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, filter: 'blur(0px)' }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, filter: 'blur(2px)' }
          }
          initial={
            shouldReduceMotion ? false : { opacity: 0, filter: 'blur(2px)' }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="flex items-center justify-center"
        >
          {isCopied ? (
            <CheckIcon size={18} className="text-status-success" />
          ) : (
            <CopyIcon size={18} />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
