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
    <div className={'flex flex-col gap-300'}>
      <div className={'gap-075 flex flex-col'}>
        <Heading level={2}>Mis Artículos</Heading>
        <Typography>
          Una colección de cosas que me pasan por la cabeza (y por el teclado).
          Explora los artículos y descubre en qué he estado metido.
        </Typography>
      </div>
      <Separator />
      <PostList withDivider withDescription />
    </div>
  );
}
