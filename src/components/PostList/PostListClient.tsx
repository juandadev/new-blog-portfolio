'use client';

import React, { useEffect, useState } from 'react';
import PostCard from '@/components/PostList/PostCard';
import { Separator } from '@/components/ui/Separator';
import { clsx } from 'clsx';
import { Post } from '@/types/post';
import { getPosts } from '@/services/post-client';
import Link from '@/components/ui/Link';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { POST_STATUS } from '@/constants/ui';
import { EyeIcon } from 'lucide-react';

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

  if (!posts)
    return (
      <div className={'flex flex-col gap-250'} key={'client-skeleton'}>
        <div className={'flex flex-col gap-2'}>
          <Skeleton className={'h-[26px] w-full rounded-md'} />
          <Skeleton className={'h-[20px] w-[130px] rounded-md'} />
          <Skeleton className={'h-[54px] w-full rounded-md'} />
        </div>
        <div className={'flex flex-col gap-2'}>
          <Skeleton className={'h-[26px] w-full rounded-md'} />
          <Skeleton className={'h-[20px] w-[130px] rounded-md'} />
          <Skeleton className={'h-[54px] w-full rounded-md'} />
        </div>
      </div>
    );

  return (
    <div className={clsx('flex flex-col', withDivider ? 'gap-250' : 'gap-300')}>
      {posts.map((post, index) => {
        const postStatus = POST_STATUS[post.status];

        return (
          <div key={post.id}>
            <PostCard post={post} />
            {hasPermissions && (
              <div className={'flex justify-between gap-200'}>
                <div className={'flex gap-100'}>
                  <Badge variant={postStatus.variant}>
                    {postStatus.icon} {postStatus.label}
                  </Badge>
                  <Badge>
                    <EyeIcon /> {post.views}
                  </Badge>
                </div>
                <div className={'flex gap-200'}>
                  <Link href={`/dashboard/posts/edit/${post.slug}`}>Edit</Link>
                  {/*<Link href={`/dashboard/posts/edit/${post.slug}`}>Delete</Link>*/}
                </div>
              </div>
            )}
            {withDivider && posts.length !== index + 1 && (
              <Separator className={'mt-250'} />
            )}
          </div>
        );
      })}
    </div>
  );
}
