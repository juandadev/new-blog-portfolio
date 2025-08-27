import React from 'react';
import PostCard from '@/components/PostList/PostCard';
import { fetchPosts } from '@/services/post-server';

type PostListProps = {
  withLimit: boolean;
};

export default async function PostListServer({ withLimit }: PostListProps) {
  const posts = await fetchPosts(withLimit);

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
