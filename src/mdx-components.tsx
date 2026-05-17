import React from 'react';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

import CodeBlock from '@/components/CodeBlock/CodeBlock';
import BasePolaroid, {
  PolaroidFooter as BasePolaroidFooter,
} from '@/components/Polaroid/polaroid';
import { Callout as BaseCallout } from '@/components/ui/Callout';
import { Heading } from '@/components/ui/Heading';
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
    <div className="relative mx-auto mb-10 aspect-3/2 w-full overflow-hidden rounded-lg md:w-[80%]">
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
    <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">
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
    <code
      className="bg-secondary text-secondary-foreground border-border rounded border px-2 py-1 font-mono text-sm"
      {...props}
    >
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
    p: Paragraph,
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
      <TableHead className="font-bold">{children}</TableHead>
    ),
    td: ({ children }) => (
      <TableCell className="text-muted-foreground">{children}</TableCell>
    ),
    tfoot: ({ children }) => <TableFooter>{children}</TableFooter>,
    caption: ({ children }) => <TableCaption>{children}</TableCaption>,
    thead: ({ children }) => <TableHeader>{children}</TableHeader>,
    code: InlineCode,
    pre: Pre,
    Callout: (props) => <BaseCallout containerClassName="my-4" {...props} />,
    Polaroid: (props) => <BasePolaroid containerClassName="my-10" {...props} />,
    PolaroidFooter: BasePolaroidFooter,
    ...components,
  };
}
