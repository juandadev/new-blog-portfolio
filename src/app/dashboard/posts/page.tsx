'use client';

import React from 'react';
import { Heading } from '@/components/ui/Heading';
import useLoginRedirection from '@/hooks/useLoginRedirection';
import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';

export default function PostsManagerPage() {
  useLoginRedirection();

  return (
    <div className={'flex flex-col gap-300'}>
      <Heading level={1}>Administrar Posts</Heading>
      <Button asChild>
        <Link href={'/dashboard/posts/create'}>Crear Post</Link>
      </Button>
    </div>
  );
}
