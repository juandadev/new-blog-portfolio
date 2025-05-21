import React from 'react';
import PostCard from '@/components/PostList/PostCard';
import { fetchPosts } from '@/services/post-server';
import { Separator } from '@/components/ui/Separator';
import { clsx } from 'clsx';

type PostListProps = {
  withDivider?: boolean;
  withDescription?: boolean;
};

export default async function PostListServer({
  withDivider = false,
  withDescription = false,
}: PostListProps) {
  const posts = await fetchPosts();

  return (
    <div className={clsx('flex flex-col', withDivider ? 'gap-250' : 'gap-300')}>
      {posts?.map((post, index) => (
        <div key={post.id}>
          <PostCard post={post} withDescription={withDescription} />
          {withDivider && posts.length !== index + 1 && (
            <Separator className={'mt-250'} />
          )}
        </div>
      ))}
    </div>
  );
}
