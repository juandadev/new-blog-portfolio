import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { Separator } from '@/components/ui/Separator';
import Link from '@/components/ui/Link';
import { AspectRatio } from '@/components/ui/AspectRatio';
import Image from 'next/image';

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
  return (
    <ReactMarkdown
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
            <Typography>{children}</Typography>
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
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
