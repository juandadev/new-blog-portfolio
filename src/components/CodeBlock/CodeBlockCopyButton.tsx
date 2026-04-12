'use client';

import React, { useEffect, useState, useRef } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@/components/ui/Button';

interface CodeBlockCopyButtonProps {
  rawCode: string;
}

export function CodeBlockCopyButton({ rawCode }: CodeBlockCopyButtonProps) {
  const [isCopied, setCopied] = useState(false);
  const resetCopiedTimeoutRef = useRef<number | null>(null);

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
    }, 700);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Copy code block"
      className="bg-secondary absolute top-10 right-2 z-[1] cursor-pointer transition-colors"
      onClick={handleCopy}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={isCopied ? 'copied' : 'not-copied'}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(2px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.2, filter: 'blur(2px)' }}
          transition={{ duration: 0.2 }}
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
