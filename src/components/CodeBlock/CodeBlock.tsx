import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { extractTextFromNode, normalizeWhitespace } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

export default function CodeBlock({
  children,
  language = 'txt',
}: CodeBlockProps) {
  const [isCopied, setCopied] = useState(false);
  const resetCopiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const parsedLanguage = language.split(' ')[1] || language;

  useEffect(() => {
    return () => {
      if (resetCopiedTimeoutRef.current !== null) {
        clearTimeout(resetCopiedTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const rawCode = extractTextFromNode(children);

    await navigator.clipboard.writeText(normalizeWhitespace(rawCode));

    if (resetCopiedTimeoutRef.current !== null) {
      clearTimeout(resetCopiedTimeoutRef.current);
    }

    setCopied(true);

    resetCopiedTimeoutRef.current = setTimeout(() => {
      setCopied(false);
      resetCopiedTimeoutRef.current = null;
    }, 2000);
  };

  return (
    <pre className="dynamic-block">
      <div className="border-border bg-secondary relative my-6 overflow-hidden rounded-lg border">
        <div className="bg-primary/10 border-border text-taupe-400 font-fira border-b px-4 py-2 text-xs">
          .{parsedLanguage}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="bg-secondary absolute top-10 right-2 z-[1] cursor-pointer transition-colors"
          onClick={handleCopy}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={isCopied ? 'copied' : 'not-copied'}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(4px)' }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {isCopied ? (
                <CheckIcon size={18} className="text-green-700" />
              ) : (
                <CopyIcon size={18} />
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
        <pre className="relative overflow-x-auto p-6 pr-14">
          <code
            className={`language-${language} text-taupe-300 font-fira text-sm leading-relaxed`}
          >
            {children}
          </code>
        </pre>
      </div>
    </pre>
  );
}
