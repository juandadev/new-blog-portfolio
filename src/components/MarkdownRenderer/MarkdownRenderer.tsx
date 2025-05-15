import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';

interface MarkdownRendererProps {
  content: string;
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
        p: ({ children, ...props }) => (
          <Typography {...props}>{children}</Typography>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
