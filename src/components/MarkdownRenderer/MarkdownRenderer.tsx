'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { Separator } from '@/components/ui/Separator';
import Link from '@/components/ui/Link';
import { AspectRatio } from '@/components/ui/AspectRatio';
import Image from 'next/image';
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
        p: ({ children }) => {
          if (
            React.Children.count(children) === 1 &&
            // @ts-expect-error I don't know how to fix the type
            children?.props?.node?.tagName === 'img'
          )
            return <>{children}</>;

          return <Typography>{children}</Typography>;
        },
        hr: () => <Separator className={'my-150'} />,
        ul: ({ children, ...props }) => (
          <ul className="list-disc" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="list-decimal" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="ml-6" {...props}>
            <Typography>{children}</Typography>
          </li>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className={
              'border-l-4 border-neutral-400 pl-3 dark:border-neutral-600'
            }
            {...props}
          >
            {children}
          </blockquote>
        ),
        a: ({ children, href, ...props }) => (
          <Link
            href={href!}
            className={
              'relative inline w-fit underline decoration-blue-500 decoration-3 hover:text-current/70'
            }
            {...props}
            passHref
          >
            {children}
          </Link>
        ),
        img: ({ alt, src }) => (
          // TODO: Improve aspect ratio. Somehow we need to be able to provide
          //  the aspect ratio of the image, or at least the width and height so
          //  we can display post images without "contain" value and having those
          //  ugly transparent bars that doesn't match the aesthetic of the site.

          // TODO: Add an image visualizer to show the image at its full size
          //  in a modal when clicked.
          <AspectRatio ratio={16 / 9}>
            <Image
              className="rounded-md"
              alt={alt!}
              src={src as string}
              fill
              sizes={'(max-width: 639px) 100vw, 576px'}
              objectFit="contain"
            />
          </AspectRatio>
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
        table: ({ children }) => <Table>{children}</Table>,
        tfoot: ({ children }) => <TableFooter>{children}</TableFooter>,
        td: ({ children }) => <TableCell>{children}</TableCell>,
        tbody: ({ children }) => <TableBody>{children}</TableBody>,
        th: ({ children }) => <TableHead>{children}</TableHead>,
        tr: ({ children }) => <TableRow>{children}</TableRow>,
        caption: ({ children }) => <TableCaption>{children}</TableCaption>,
        thead: ({ children }) => <TableHeader>{children}</TableHeader>,
        code({ className, children }) {
          const language = className?.replace('language-', '') || '';

          if (!language) {
            return (
              <code
                className={
                  'text-preset-11 rounded-sm bg-neutral-200 px-1 break-words dark:bg-neutral-700'
                }
              >
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
  );
}
