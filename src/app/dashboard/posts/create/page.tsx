'use client';

import React from 'react';
import { Heading } from '@/components/ui/Heading';
import PostForm from '@/components/PostForm/PostForm';
import useLoginRedirection from '@/hooks/useLoginRedirection';
import { useSession } from 'next-auth/react';
import GenericLoadingSkeleton from '@/components/ui/GenericLoadingSkeleton';

export default function CreatePostPage() {
  useLoginRedirection();
  const { status } = useSession();

  if (status === 'loading' || status === 'unauthenticated') {
    return <GenericLoadingSkeleton />;
  }

  return (
    <div className={'flex flex-col gap-300'}>
      <Heading level={1}>Nuevo Post</Heading>
      <PostForm />
    </div>
  );
}
