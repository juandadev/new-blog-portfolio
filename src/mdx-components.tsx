import React from 'react';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import clsx from 'clsx';

import CodeBlock from '@/components/CodeBlock/CodeBlock';
import BasePolaroid, {
  PolaroidFooter as BasePolaroidFooter,
} from '@/components/Polaroid/polaroid';
import BaseFrame, {
  FrameFooter as BaseFrameFooter,
} from '@/components/Frame/frame';
import { Callout as BaseCallout } from '@/components/ui/Callout';
import Link from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
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

function BlogImage({ alt = '', src }: React.ComponentProps<'img'>) {
  if (!src) {
    return null;
  }

  const imageSrc = String(src);

  return (
    <div className="relative mx-auto my-12 aspect-3/2 w-full overflow-hidden rounded-lg md:w-[80%]">
      <Image
        alt={alt}
        className="object-contain"
        fill
        loading="lazy"
        src={imageSrc}
        unoptimized
      />
    </div>
  );
}

function Paragraph({ children }: React.ComponentProps<'p'>) {
  const childArray = React.Children.toArray(children);
  const onlyChild = childArray[0];

  if (
    childArray.length === 1 &&
    React.isValidElement(onlyChild) &&
    onlyChild.type === BlogImage
  ) {
    return <>{children}</>;
  }

  return (
    <p className="text-muted-foreground mb-8 leading-loose text-pretty">
      {children}
    </p>
  );
}

function Anchor({ children, href, ...props }: React.ComponentProps<'a'>) {
  return (
    <Link
      href={href!}
      className="text-primary underline-offset-4 transition-colors hover:underline"
      target={href && /^(https?:)?\/\//.test(href) ? '_blank' : undefined}
      rel={
        href && /^(https?:)?\/\//.test(href) ? 'noopener noreferrer' : undefined
      }
      {...props}
    >
      {children}
    </Link>
  );
}

function InlineCode({
  children,
  className,
  ...props
}: React.ComponentProps<'code'>) {
  if (className?.startsWith('language-')) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <code className="bg-muted rounded px-2 py-1 font-mono text-sm" {...props}>
      {children}
    </code>
  );
}

function Pre({ children }: React.ComponentProps<'pre'>) {
  if (
    React.isValidElement<{ className?: string; children?: React.ReactNode }>(
      children
    )
  ) {
    const language =
      children.props.className?.replace('language-', '') || 'txt';

    return <CodeBlock language={language}>{children.props.children}</CodeBlock>;
  }

  return <pre>{children}</pre>;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, className, ...props }) => (
      <h1
        className={clsx(
          'text-foreground mt-12 mb-6 text-4xl font-semibold text-balance first:mt-0 md:text-5xl',
          className
        )}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, className, ...props }) => (
      <h2
        className={clsx(
          'text-foreground mt-10 mb-4 text-3xl font-semibold text-balance md:text-4xl',
          className
        )}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, className, ...props }) => (
      <h3
        className={clsx(
          'text-foreground mt-4 mb-3 text-2xl font-semibold text-balance md:text-3xl',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, className, ...props }) => (
      <h4
        className={clsx(
          'text-foreground mt-6 mb-3 text-xl font-semibold text-balance md:text-2xl',
          className
        )}
        {...props}
      >
        {children}
      </h4>
    ),
    h5: ({ children, className, ...props }) => (
      <h5
        className={clsx(
          'text-foreground mt-4 mb-2 text-lg font-semibold text-balance md:text-xl',
          className
        )}
        {...props}
      >
        {children}
      </h5>
    ),
    h6: ({ children, className, ...props }) => (
      <h6
        className={clsx(
          'text-foreground mt-4 mb-2 text-base font-semibold text-balance md:text-lg',
          className
        )}
        {...props}
      >
        {children}
      </h6>
    ),
    p: Paragraph,
    strong: ({ children, ...props }) => (
      <strong className="text-foreground font-semibold" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),
    hr: () => <Separator className="my-10" />,
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
    a: Anchor,
    img: BlogImage,
    table: ({ children }) => (
      <div className="border-border my-6 overflow-hidden rounded-lg border">
        <Table>{children}</Table>
      </div>
    ),
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => (
      <TableHead className="font-semibold">{children}</TableHead>
    ),
    td: ({ children }) => (
      <TableCell className="text-muted-foreground">{children}</TableCell>
    ),
    tfoot: ({ children }) => <TableFooter>{children}</TableFooter>,
    caption: ({ children }) => <TableCaption>{children}</TableCaption>,
    thead: ({ children }) => <TableHeader>{children}</TableHeader>,
    code: InlineCode,
    pre: Pre,
    Callout: (props) => <BaseCallout containerClassName="my-10" {...props} />,
    Frame: (props) => <BaseFrame containerClassName="my-12" {...props} />,
    FrameFooter: BaseFrameFooter,
    Polaroid: (props) => <BasePolaroid containerClassName="my-12" {...props} />,
    PolaroidFooter: BasePolaroidFooter,
    ...components,
  };
}
