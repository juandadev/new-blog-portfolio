import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { EyeIcon, FileTextIcon, TrendingUpIcon } from 'lucide-react';
import { Typography } from '@/components/Typography/Typography';
import React from 'react';
import { GetPostsResponse } from '@/types/post';
import { isSameMonth, parseISO, isSameYear } from 'date-fns';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatViewCount } from '@/lib/utils';

interface PostsStatsProps {
  posts: GetPostsResponse;
  isLoading?: boolean;
}

const currentDate = new Date();

export default function PostsStats({
  posts,
  isLoading = true,
}: PostsStatsProps) {
  const postCountDetails = [
    `${posts.totalPublishedPosts} publicados`,
    `${posts.totalDraftPosts} borradores`,
    `${posts.totalArchivedPosts} archivados`,
  ];
  const getAverageViews = () => {
    if (posts.totalPosts === 0) return 0;

    return Math.round(posts.totalViews / posts.totalPosts);
  };
  const getMontlyPosts = posts.posts.filter((post) => {
    const publishedDate = parseISO(post.publishedAt);

    return (
      isSameMonth(publishedDate, currentDate) &&
      isSameYear(publishedDate, currentDate)
    );
  });

  return (
    <div
      className={
        'grid w-full grid-cols-[280px_repeat(2,200px)] grid-rows-1 gap-6 overflow-x-auto pb-4'
      }
    >
      <Card className={'gap-1'}>
        <CardHeader className={'gap-0'}>
          <CardTitle className={'flex justify-between text-sm'}>
            Total de Posts <FileTextIcon size={16} />
          </CardTitle>
        </CardHeader>
        <CardContent className={'flex flex-col gap-1'}>
          {isLoading ? (
            <Skeleton className={'h-8 w-full'} />
          ) : (
            <Typography preset={4}>{posts.totalPosts}</Typography>
          )}
          {isLoading ? (
            <Skeleton className={'h-4 w-full'} />
          ) : (
            <Typography preset={10}>{postCountDetails.join(', ')}</Typography>
          )}
        </CardContent>
      </Card>
      <Card className={'gap-1'}>
        <CardHeader className={'gap-0'}>
          <CardTitle className={'flex justify-between text-sm'}>
            Vistas Totales <EyeIcon size={16} />
          </CardTitle>
        </CardHeader>
        <CardContent className={'flex flex-col gap-1'}>
          {isLoading ? (
            <Skeleton className={'h-8 w-full'} />
          ) : (
            <Typography preset={4}>
              {formatViewCount(posts.totalViews)}
            </Typography>
          )}
          {isLoading ? (
            <Skeleton className={'h-4 w-full'} />
          ) : (
            <Typography preset={10}>
              Promedio: {formatViewCount(getAverageViews())} por post
            </Typography>
          )}
        </CardContent>
      </Card>
      <Card className={'gap-1'}>
        <CardHeader className={'gap-0'}>
          <CardTitle className={'flex justify-between text-sm'}>
            Posts Publicados <TrendingUpIcon size={16} />
          </CardTitle>
        </CardHeader>
        <CardContent className={'flex flex-col gap-1'}>
          {isLoading ? (
            <Skeleton className={'h-8 w-full'} />
          ) : (
            <Typography preset={4}>{posts.totalPublishedPosts}</Typography>
          )}
          {isLoading ? (
            <Skeleton className={'h-4 w-full'} />
          ) : (
            <Typography preset={10}>
              Este mes: {getMontlyPosts.length} nuevos
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
