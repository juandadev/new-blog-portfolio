'use client';

import React, { useEffect } from 'react';
import { Heading } from '@/components/ui/Heading';
import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/Typography/Typography';
import { GetPostsResponse } from '@/types/post';
import { getPosts } from '@/services/post-client';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { FilePlus2Icon } from 'lucide-react';
import PostsStats from '@/app/dashboard/posts/PostsStats';
import PostsTable from '@/app/dashboard/posts/PostsTable';

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
    <div className="flex flex-col gap-6">
      <div>
        <Heading level={4}>Dashboard de Posts</Heading>
        <Typography preset={8}>
          Gestiona tu contenido y analiza el rendimiento
        </Typography>
      </div>
      <PostsStats posts={posts} isLoading={isLoading} />
      <div>
        <Card>
          <CardHeader className="auto-rows-min grid-rows-[auto_auto_auto] has-data-[slot=card-action]:grid-cols-1 sm:grid-rows-[auto_auto] sm:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <CardTitle className="text-2xl leading-none font-semibold tracking-tight">
              Gestión de Posts
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Administra todos tus artículos desde un solo lugar
            </CardDescription>
            <CardAction className="col-start-1 row-span-1 row-start-3 justify-self-start sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:justify-self-end">
              <Button asChild>
                <Link href="/dashboard/posts/create">
                  <FilePlus2Icon size={16} /> Crear Post
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {/* TODO: Implementar buscador de posts, filtros y botón de recargar */}
            <PostsTable posts={posts} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
