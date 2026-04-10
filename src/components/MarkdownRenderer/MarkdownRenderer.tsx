'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { Separator } from '@/components/ui/Separator';
import Link from '@/components/ui/Link';
import Image from 'next/legacy/image';
import remarkDirective from 'remark-directive';
import { Callout, CalloutVariant } from '@/components/ui/Callout';
import { remarkCallouts } from '@/lib/utils';
import remarkGfm from 'remark-gfm';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import rehypeHighlight from 'rehype-highlight';
import CodeBlock from '@/components/CodeBlock/CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <ReactMarkdown
        remarkPlugins={[remarkDirective, remarkCallouts, remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children, ...props }) => (
            <Heading level={1} {...props}>
              {children}
            </Heading>
          ),
          h2: ({ children, ...props }) => (
            <Heading level={2} className="mt-10" {...props}>
              {children}
            </Heading>
          ),
          h3: ({ children, ...props }) => (
            <Heading level={3} className="mt-4" {...props}>
              {children}
            </Heading>
          ),
          h4: ({ children, ...props }) => (
            <Heading level={4} {...props}>
              {children}
            </Heading>
          ),
          h5: ({ children, ...props }) => (
            <Heading level={5} {...props}>
              {children}
            </Heading>
          ),
          h6: ({ children, ...props }) => (
            <Heading level={6} {...props}>
              {children}
            </Heading>
          ),
          p: ({ children }) => {
            if (
              React.Children.count(children) === 1 &&
              // @ts-expect-error I don't know how to fix the type
              children?.props?.node?.tagName === 'img'
            )
              return <>{children}</>;

            return (
              <Typography overrideClassName="text-muted-foreground leading-relaxed mb-6 text-pretty">
                {children}
              </Typography>
            );
          },
          strong: ({ children, ...props }) => (
            <strong className="text-foreground font-bold" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="italic" {...props}>
              {children}
            </em>
          ),
          hr: () => <Separator className="border-border my-8" />,
          ul: ({ children, ...props }) => (
            <ul
              className="text-muted-foreground mb-6 list-inside list-disc space-y-2 pl-4"
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              className="text-muted-foreground mb-6 list-inside list-decimal space-y-2 pl-4"
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="pink-marker leading-relaxed" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-primary text-muted-foreground bg-primary/5 my-6 rounded-r border-l-4 py-2 pl-6 italic"
              {...props}
            >
              {children}
            </blockquote>
          ),
          a: ({ children, href, ...props }) => (
            <Link
              href={href!}
              className="text-primary underline-offset-4 transition-colors hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              passHref
              {...props}
            >
              {children}
            </Link>
          ),
          img: ({ alt, src }) => (
            // TODO: Add an image visualizer to show the image at its full size
            //  in a modal when clicked.
            <div className="relative mx-auto mb-10 aspect-[3/2] w-full overflow-hidden rounded-lg md:w-[80%]">
              <Image
                className="object-contain"
                alt={alt!}
                src={src as string}
                layout="fill"
                loading="lazy"
              />
            </div>
          ),
          div({ className, children }) {
            if (className?.startsWith('callout')) {
              const variant = className.replace('callout ', '');
              return (
                <Callout
                  variant={variant as CalloutVariant}
                  containerClassName="my-4"
                >
                  {children}
                </Callout>
              );
            }

            return <div className={className}>{children}</div>;
          },
          table: ({ children }) => (
            <div className="border-border my-6 overflow-hidden rounded-lg border">
              <Table>{children}</Table>
            </div>
          ),
          tbody: ({ children }) => <TableBody>{children}</TableBody>,
          tr: ({ children }) => <TableRow>{children}</TableRow>,
          th: ({ children }) => (
            <TableHead className="font-bold">{children}</TableHead>
          ),
          td: ({ children }) => (
            <TableCell className="text-muted-foreground">{children}</TableCell>
          ),
          tfoot: ({ children }) => <TableFooter>{children}</TableFooter>,
          caption: ({ children }) => <TableCaption>{children}</TableCaption>,
          thead: ({ children }) => <TableHeader>{children}</TableHeader>,
          code({ className, children }) {
            const language = className?.replace('language-', '') || '';

            if (!language) {
              return (
                <code className="bg-secondary text-secondary-foreground border-border font-fira rounded border px-2 py-1 text-sm">
                  {children}
                </code>
              );
            }

            return <CodeBlock language={language}>{children}</CodeBlock>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
