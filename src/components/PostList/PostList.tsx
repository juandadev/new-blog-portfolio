import React from 'react';
import dynamic from 'next/dynamic';

const PostListServer = dynamic(
  () => import('@/components/PostList/PostListServer')
);

export default function PostList() {
  return <PostListServer />;
}
