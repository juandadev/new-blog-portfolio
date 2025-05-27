import React from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';
import { extractTextFromNode, normalizeWhitespace } from '@/lib/utils';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

export default function CodeBlock({
  children,
  language = 'txt',
}: CodeBlockProps) {
  const { theme } = useTheme();

  const handleCopy = async () => {
    const rawCode = extractTextFromNode(children);

    await navigator.clipboard.writeText(normalizeWhitespace(rawCode));
    toast('¡Código copiado al portapapeles!');
  };

  return (
    <div className={'relative'}>
      <Button
        variant={'icon'}
        size={'icon'}
        className={'bg-background absolute top-1 right-1'}
        onClick={handleCopy}
      >
        <CopyIcon size={18} />
      </Button>
      <pre
        className={clsx(
          'rounded-12 overflow-x-auto bg-neutral-200 p-150 pr-12 dark:border dark:border-neutral-700 dark:bg-neutral-800',
          theme === 'light' ? 'code-light' : 'code-dark'
        )}
      >
        <code
          className={`language-${language} text-preset-11 text-[#4B4D65] dark:text-white`}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}
