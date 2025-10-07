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
    <pre>
      <div className="border-border bg-secondary my-6 overflow-hidden rounded-lg border">
        <div className="bg-primary/10 border-border text-muted-foreground font-fira border-b px-4 py-2 text-xs">
          {language}
        </div>
        <pre className="relative overflow-x-auto p-6">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-background absolute top-1 right-1 cursor-pointer"
            onClick={handleCopy}
          >
            <CopyIcon size={18} />
          </Button>
          <code
            className={`language-${language} text-foreground font-fira text-sm leading-relaxed`}
          >
            {children}
          </code>
        </pre>
      </div>
    </pre>
  );
}
