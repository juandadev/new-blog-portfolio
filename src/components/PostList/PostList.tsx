import React from 'react';
import dynamic from 'next/dynamic';
import { PaginationParams } from '@/types/pagination';

const PostListServer = dynamic(
  () => import('@/components/PostList/PostListServer')
);
const PostListClient = dynamic(
  () => import('@/components/PostList/PostListClient')
);

interface PostListProps {
  clientFetch?: boolean;
  paginationParams?: PaginationParams;
}

export default function PostList({
  clientFetch = false,
  paginationParams,
  ...props
}: PostListProps) {
  if (clientFetch) {
    return <PostListClient {...props} />;
  }

  return <PostListServer paginationParams={paginationParams} />;
}
