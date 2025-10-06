import React from 'react';
import PostCard from '@/components/PostList/PostCard';
import { fetchPosts } from '@/services/post-server';
import { cn } from '@/lib/utils';
import PostItem from '@/components/PostList/PostItem';

type PostListProps = {
  withLimit: boolean;
  type?: 'card' | 'list';
};

export default async function PostListServer({
  withLimit,
  type = 'card',
}: PostListProps) {
  const posts = await fetchPosts(withLimit);
  const isCard = type === 'card';

  return (
    <div
      className={cn(
        isCard
          ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
          : 'flex flex-col gap-4'
      )}
    >
      {posts?.map((post, index) =>
        isCard ? (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ) : (
          <PostItem key={post.id} post={post} index={index} />
        )
      )}
    </div>
  );
}
