import React from 'react';
import PostCard from '@/components/PostList/PostCard';
import { fetchPosts } from '@/services/post-server';

type PostListProps = {
  withLimit: boolean;
};

export default async function PostListServer({ withLimit }: PostListProps) {
  const posts = await fetchPosts(withLimit);

  return (
    <div className="flex flex-col gap-8">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
