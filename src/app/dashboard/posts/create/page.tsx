import React from 'react';
import { Heading } from '@/components/ui/Heading';
import PostForm from '@/components/PostForm/PostForm';

export default function CreatePostPage() {
  return (
    <div className={'flex flex-col gap-300'}>
      <Heading level={1}>Nuevo Post</Heading>
      <PostForm />
    </div>
  );
}
