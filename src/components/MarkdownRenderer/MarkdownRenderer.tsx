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
import { useTheme } from 'next-themes';
import { clsx } from 'clsx';

interface MarkdownRendererProps {
  content: string;
}

function MarkdownImage({ alt, src }: { src: string; alt: string }) {
  return (
    <AspectRatio ratio={12 / 9}>
      <Image
        className={'rounded-12'}
        alt={alt!}
        src={src as string}
        fill
        sizes={'(max-width: 639px) 100vw, 576px'}
        objectFit={'cover'}
      />
    </AspectRatio>
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { theme } = useTheme();

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
          <Heading level={2} {...props}>
            {children}
          </Heading>
        ),
        h3: ({ children, ...props }) => (
          <Heading level={3} {...props}>
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
          <ul className={'list-disc'} {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className={'list-decimal'} {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className={'ml-300'} {...props}>
            <Typography>{children}</Typography>
          </li>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className={
              'border-l-4 border-neutral-400 pl-150 dark:border-neutral-600'
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
              'relative inline-block w-fit after:absolute after:bottom-0 after:left-0 after:block after:h-[3px] after:w-full after:bg-blue-500 hover:text-current/70'
            }
            {...props}
            passHref
          >
            {children}
          </Link>
        ),
        img: ({ alt, src }) => <MarkdownImage alt={alt!} src={src as string} />,
        div({ className, children }) {
          if (className?.startsWith('callout')) {
            const variant = className.replace('callout ', '');
            return (
              <Callout variant={variant as CalloutVariant}>{children}</Callout>
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
        code({ node, className, children, ...props }) {
          const language = className?.replace('language-', '') || '';
          const isInline = node?.children?.length === 1;

          if (isInline) {
            return (
              <code
                className={
                  'text-preset-11 rounded-4 bg-neutral-200 px-1 dark:bg-neutral-700'
                }
              >
                {children}
              </code>
            );
          }

          return (
            <pre
              className={clsx(
                'rounded-12 bg-neutral-200 p-150 dark:border dark:border-neutral-700 dark:bg-neutral-800',
                theme === 'light' ? 'code-light' : 'code-dark'
              )}
            >
              <code
                className={`language-${language} text-preset-11 text-[#4B4D65] dark:text-white`}
                {...props}
              >
                {children}
              </code>
            </pre>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
