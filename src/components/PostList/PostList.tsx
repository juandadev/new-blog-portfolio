import React from 'react';
import dynamic from 'next/dynamic';

const PostListServer = dynamic(
  () => import('@/components/PostList/PostListServer')
);
const PostListClient = dynamic(
  () => import('@/components/PostList/PostListClient')
);

interface PostListProps {
  clientFetch?: boolean;
  withLimit?: boolean;
  type?: 'card' | 'list';
}

export default function PostList({
  clientFetch = false,
  withLimit = false,
  type = 'card',
  ...props
}: PostListProps) {
  if (clientFetch) {
    return <PostListClient {...props} />;
  }

  return <PostListServer {...props} withLimit={withLimit} type={type} />;
}
