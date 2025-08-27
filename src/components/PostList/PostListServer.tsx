import React from 'react';
import PostCard from '@/components/PostList/PostCard';
import { fetchPosts } from '@/services/post-server';
import { Separator } from '@/components/ui/Separator';
import { clsx } from 'clsx';

type PostListProps = {
  withDivider?: boolean;
  withDescription?: boolean;
  withLimit: boolean;
};

export default async function PostListServer({
  withDivider = false,
  withDescription = false,
  withLimit,
}: PostListProps) {
  const posts = await fetchPosts(withLimit);

  return (
    <div className={clsx('flex flex-col', withDivider ? 'gap-5' : 'gap-6')}>
      {posts?.map((post, index) => (
        <div key={post.id}>
          <PostCard post={post} withDescription={withDescription} />
          {withDivider && posts.length !== index + 1 && (
            <Separator className="mt-5" />
          )}
        </div>
      ))}
    </div>
  );
}
