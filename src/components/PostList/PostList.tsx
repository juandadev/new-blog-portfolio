import React from 'react';
import dynamic from 'next/dynamic';
import { PaginationParams } from '@/types/pagination';

const PostListServer = dynamic(
  () => import('@/components/PostList/PostListServer')
);

interface PostListProps {
  paginationParams?: PaginationParams;
}

export default function PostList({ paginationParams }: PostListProps) {
  return <PostListServer paginationParams={paginationParams} />;
}
