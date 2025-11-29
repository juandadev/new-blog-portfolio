import React from 'react';
import PostCard from '@/components/PostList/PostCard';
import { fetchPosts } from '@/services/post-server';
import { PaginationParams } from '@/types/pagination';
import BlogPagination from '@/components/PostList/BlogPagination';

type PostListProps = {
  paginationParams?: PaginationParams;
};

export default async function PostListServer({
  paginationParams,
}: PostListProps) {
  const result = await fetchPosts(paginationParams);

  if (!result) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {result.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <BlogPagination pagination={result.pagination} />
    </>
  );
}
