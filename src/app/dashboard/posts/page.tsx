'use client';

import React from 'react';
import { Heading } from '@/components/ui/Heading';
import useLoginRedirection from '@/hooks/useLoginRedirection';
import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { useSession } from 'next-auth/react';
import GenericLoadingSkeleton from '@/components/ui/GenericLoadingSkeleton';

export default function PostsManagerPage() {
  useLoginRedirection();
  const session = useSession();

  if (session.status === 'loading' || session.status === 'unauthenticated')
    return <GenericLoadingSkeleton />;

  return (
    <div className={'flex flex-col gap-300'}>
      <Heading level={1}>Administrar Posts</Heading>
      <Button asChild>
        <Link href={'/dashboard/posts/create'}>Crear Post</Link>
      </Button>
    </div>
  );
}
