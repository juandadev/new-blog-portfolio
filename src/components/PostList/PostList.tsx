import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/Skeleton';

const PostListServer = dynamic(
  () => import('@/components/PostList/PostListServer')
);
const PostListClient = dynamic(
  () => import('@/components/PostList/PostListClient')
);

interface PostListProps {
  withDivider?: boolean;
  withDescription?: boolean;
  clientFetch?: boolean;
}

export default function PostList({
  clientFetch = false,
  ...props
}: PostListProps) {
  if (clientFetch) {
    return (
      <Suspense
        fallback={
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
        }
      >
        <PostListClient {...props} />
      </Suspense>
    );
  }

  return <PostListServer {...props} />;
}
