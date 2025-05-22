import React from 'react';
import { Heading } from '@/components/ui/Heading';
import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import PostList from '@/components/PostList/PostList';

export default function PostsManagerPage() {
  return (
    <div className={'flex flex-col gap-300'}>
      <Heading level={1}>Administrar Posts</Heading>
      <div className={'flex content-end justify-end'}>
        <Button asChild>
          <Link href={'/dashboard/posts/create'}>Crear Post</Link>
        </Button>
      </div>
      <PostList withDivider withDescription clientFetch />
    </div>
  );
}
