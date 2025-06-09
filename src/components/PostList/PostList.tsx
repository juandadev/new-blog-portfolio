import React from 'react';
import dynamic from 'next/dynamic';

const PostListServer = dynamic(
  () => import('@/components/PostList/PostListServer')
);
const PostListClient = dynamic(
  () => import('@/components/PostList/PostListClient')
);

interface PostListProps {
  withDivider?: boolean;
  withDescription?: boolean;
  clientFetch?: boolean;
}

export default function PostList({
  clientFetch = false,
  ...props
}: PostListProps) {
  if (clientFetch) {
    return <PostListClient {...props} />;
  }

  return <PostListServer {...props} />;
}
