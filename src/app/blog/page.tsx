import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { Separator } from '@/components/ui/Separator';
import PostList from '@/components/PostList/PostList';

export default function BlogPage() {
  return (
    <div className={'flex flex-col gap-300'}>
      <div className={'gap-075 flex flex-col'}>
        <Heading level={2} decoration={2}>
          Mis artículos
        </Heading>
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
