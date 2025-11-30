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
  const isMounted = React.useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) return;

    getPosts()
      .then(({ data }) => setPosts(data!))
      .finally(() => setIsLoading(false));

    isMounted.current = true;
  });

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
            {/* TODO: Implementar buscador de posts, filtros y botón de recargar */}
            <PostsTable posts={posts} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
