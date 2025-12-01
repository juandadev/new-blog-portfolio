'use client';

import React, { useEffect } from 'react';
import { GetPostsResponse } from '@/types/post';
import { getPosts } from '@/services/post-client';
import { Card, CardContent } from '@/components/ui/Card';
import { FilePlus2Icon } from 'lucide-react';
import PostsStats from '@/app/dashboard/posts/PostsStats';
import PostsTable from '@/app/dashboard/posts/PostsTable';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import { PaginationParams } from '@/types/pagination';

export default function PostsManagerPage() {
  const [posts, setPosts] = React.useState<GetPostsResponse>({
    items: [],
    pagination: {
      page: 0,
      pageSize: 0,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    totalArchivedPosts: 0,
    totalDraftPosts: 0,
    totalPosts: 0,
    totalPublishedPosts: 0,
    totalViews: 0,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [paginationParams, setPaginationParams] =
    React.useState<PaginationParams>({
      page: 1,
      pageSize: 5,
    });

  useEffect(() => {
    setIsLoading(true);

    getPosts(paginationParams)
      .then(({ data }) => setPosts(data!))
      .finally(() => setIsLoading(false));
  }, [paginationParams]);

  const handlePageChange = (page: number) => {
    setPaginationParams((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPaginationParams({ page: 1, pageSize });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    getPosts(paginationParams)
      .then(({ data }) => setPosts(data!))
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardPageLayout
      title="Posts Dashboard"
      description="Manage your content and analyze performance"
    >
      <PostsStats posts={posts} isLoading={isLoading} />
      <div>
        <Card>
          <DashboardCardHeader
            title="Posts Management"
            description="Manage all your articles from one place"
            actionLabel="Create Post"
            actionHref="/dashboard/posts/create"
            actionIcon={FilePlus2Icon}
          />
          <CardContent>
            <PostsTable
              posts={posts}
              isLoading={isLoading}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onRefresh={handleRefresh}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
