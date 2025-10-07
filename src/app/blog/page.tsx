import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import PostList from '@/components/PostList/PostList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artículos Publicados – Juandadev',
  description:
    'Explora todos mis artículos sobre desarrollo web, React, Next.js y más. Comparto experiencias reales, buenas prácticas y recursos para desarrolladores.',
  alternates: {
    canonical: 'https://juanda.dev/blog',
  },
  openGraph: {
    title: 'Artículos Publicados – Juandadev',
    description:
      'Explora todos mis artículos sobre desarrollo web, React, Next.js y más. Comparto experiencias reales, buenas prácticas y recursos para desarrolladores.',
    url: 'https://juanda.dev/blog',
    siteName: 'Juanda.dev',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artículos Publicados – Juandadev',
    description:
      'Explora todos mis artículos sobre desarrollo web, React, Next.js y más. Comparto experiencias reales, buenas prácticas y recursos para desarrolladores.',
    creator: '@juandadotdev',
  },
};

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
