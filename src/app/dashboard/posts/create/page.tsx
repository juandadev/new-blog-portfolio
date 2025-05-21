'use client';

import React from 'react';
import { Heading } from '@/components/ui/Heading';
import PostForm from '@/components/PostForm/PostForm';
import useLoginRedirection from '@/hooks/useLoginRedirection';

export default function CreatePostPage() {
  useLoginRedirection();

  return (
    <div className={'flex flex-col gap-300'}>
      <Heading level={1}>Nuevo Post</Heading>
      <PostForm />
    </div>
  );
}
