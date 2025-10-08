import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import PostList from '@/components/PostList/PostList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development Articles & Tutorials – Juandadev Blog',
  description:
    'Read in-depth articles about React, Next.js, and frontend engineering. Real-world experiences, technical insights, and practical tips to help developers grow.',
  keywords: [
    'web development blog',
    'React tutorials',
    'Next.js articles',
    'frontend best practices',
    'software engineering',
    'developer experience',
    'Juandadev blog',
  ],
  alternates: {
    canonical: 'https://juanda.dev/blog',
  },
  openGraph: {
    title: 'Web Development Articles & Tutorials – Juandadev Blog',
    description:
      'Explore technical articles and guides about React, Next.js, TypeScript, and web development written by Juandadev.',
    url: 'https://juanda.dev/blog',
    siteName: 'Juanda.dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juandadev Blog – Frontend & Next.js Insights',
    description:
      'Deep dives into React, Next.js, and modern web development. Practical lessons, honest experiences, and tips for building better apps.',
    creator: '@juandadotdev',
  },
} as const;

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      <div className="mb-16 flex flex-col">
        <Heading
          level={1}
          overrideClassName="text-4xl md:text-6xl font-bold mb-4 text-balance"
        >
          Blog
        </Heading>
        <Typography overrideClassName="text-lg text-muted-foreground text-pretty leading-relaxed">
          Insights, tutorials, and thoughts on web development, design, and
          content creation.
        </Typography>
      </div>
      <PostList type="list" />
    </div>
  );
}
