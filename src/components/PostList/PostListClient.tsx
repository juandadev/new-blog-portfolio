'use client';

import React, { useEffect, useState } from 'react';
import PostCard from '@/components/PostList/PostCard';
import GenericLoadingSkeleton from '@/components/ui/GenericLoadingSkeleton';
import { Separator } from '@/components/ui/Separator';
import { clsx } from 'clsx';
import { Post } from '@/types/post';
import { getPosts } from '@/services/post-client';
import Link from '@/components/ui/Link';
import { useSession } from 'next-auth/react';

type PostListProps = {
  withDivider?: boolean;
  withDescription?: boolean;
};

export default function PostListClient({
  withDivider = false,
  withDescription = false,
}: PostListProps) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const session = useSession();
  const hasPermissions =
    session.data?.user.role === 'ADMIN' ||
    session.data?.user?.id === posts?.[0]?.authorId;

  useEffect(() => {
    const fetchClientPosts = async () => {
      const response = getPosts();
      const data = await response;

      setPosts(data.data?.posts || []);
    };

    fetchClientPosts();
  }, []);

  if (!posts) return <GenericLoadingSkeleton />;

  return (
    <div className={clsx('flex flex-col', withDivider ? 'gap-250' : 'gap-300')}>
      {posts.map((post, index) => (
        <div key={post.id}>
          <PostCard post={post} withDescription={withDescription} />
          {hasPermissions && (
            <div className={'flex justify-end gap-200'}>
              <Link href={`/dashboard/posts/edit/${post.slug}`}>Edit</Link>
              {/*<Link href={`/dashboard/posts/edit/${post.slug}`}>Delete</Link>*/}
            </div>
          )}
          {withDivider && posts.length !== index + 1 && (
            <Separator className={'mt-250'} />
          )}
        </div>
      ))}
    </div>
  );
}
