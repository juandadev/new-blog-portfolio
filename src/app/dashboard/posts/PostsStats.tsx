import React from 'react';
import { GetPostsResponse } from '@/types/post';
import { isSameMonth, parseISO, isSameYear } from 'date-fns';
import { formatViewCount } from '@/lib/utils';
import { EyeIcon, FileTextIcon, TrendingUpIcon } from 'lucide-react';
import { DashboardStatsCard } from '@/components/dashboard/DashboardStatsCard';

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
    `${posts.totalPublishedPosts} published`,
    `${posts.totalDraftPosts} drafts`,
    `${posts.totalArchivedPosts} archived`,
  ];
  const getAverageViews = () => {
    if (posts.totalPosts === 0) return 0;

    return Math.round(posts.totalViews / posts.totalPosts);
  };
  const getMonthlyPosts = posts.items.filter((post) => {
    const publishedDate = parseISO(post.publishedAt);

    return (
      isSameMonth(publishedDate, currentDate) &&
      isSameYear(publishedDate, currentDate)
    );
  });

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      <DashboardStatsCard
        title="Total Posts"
        value={posts.totalPosts}
        description={postCountDetails.join(', ')}
        icon={FileTextIcon}
        isLoading={isLoading}
      />
      <DashboardStatsCard
        title="Total Views"
        value={formatViewCount(posts.totalViews)}
        description={`Average: ${formatViewCount(getAverageViews())} per post`}
        icon={EyeIcon}
        isLoading={isLoading}
      />
      <DashboardStatsCard
        title="Published Posts"
        value={posts.totalPublishedPosts}
        description={`This month: ${getMonthlyPosts.length} new`}
        icon={TrendingUpIcon}
        isLoading={isLoading}
      />
    </div>
  );
}
