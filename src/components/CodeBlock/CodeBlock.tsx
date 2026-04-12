import React from 'react';
import { extractTextFromNode, normalizeWhitespace } from '@/lib/utils';
import { CodeBlockCopyButton } from '@/components/CodeBlock/CodeBlockCopyButton';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

export default function CodeBlock({
  children,
  language = 'txt',
}: CodeBlockProps) {
  const parsedLanguage = language.split(' ')[1] || language;
  const rawCode = normalizeWhitespace(extractTextFromNode(children));

  return (
    <div>
      <div className="border-border bg-secondary relative my-6 overflow-hidden rounded-lg border">
        <div className="bg-primary/10 border-border border-b px-4 py-2 font-mono text-xs text-taupe-400">
          .{parsedLanguage}
        </div>
        <CodeBlockCopyButton rawCode={rawCode} />
        <pre className="relative overflow-x-auto p-6 pr-14">
          <code
            className={`language-${language} font-mono text-sm leading-relaxed text-taupe-300`}
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}
