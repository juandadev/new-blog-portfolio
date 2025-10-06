import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { Separator } from '@/components/ui/Separator';
import PostList from '@/components/PostList/PostList';

export const metadata = {
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Heading level={2} className="text-5xl md:text-6xl">
          Blog
        </Heading>
        <Typography className="text-muted-foreground text-lg leading-relaxed text-pretty">
          Insights, tutorials, and thoughts on web development, design, and
          content creation.
        </Typography>
      </div>
      <Separator />
      <PostList type="list" />
    </div>
  );
}
