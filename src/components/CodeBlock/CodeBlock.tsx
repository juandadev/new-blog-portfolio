import React from 'react';
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
  const parsedLanguage = language.split(' ')[1] || language;

  const handleCopy = async () => {
    const rawCode = extractTextFromNode(children);

    await navigator.clipboard.writeText(normalizeWhitespace(rawCode));
    toast('Code copied to clipboard!');
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
          className="hover:bg-background bg-secondary absolute top-10 right-2 z-[1] cursor-pointer"
          onClick={handleCopy}
        >
          <CopyIcon size={18} />
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
