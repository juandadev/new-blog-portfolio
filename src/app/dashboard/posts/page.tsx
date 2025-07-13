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
    posts: [],
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
    <div className={'flex flex-col gap-300'}>
      <div>
        <Heading level={4}>Dashboard de Posts</Heading>
        <Typography preset={8}>
          Gestiona tu contenido y analiza el rendimiento
        </Typography>
      </div>
      <PostsStats posts={posts} isLoading={isLoading} />
      <div>
        <Card>
          <CardHeader>
            <CardTitle
              className={'text-2xl leading-none font-semibold tracking-tight'}
            >
              Gestión de Posts
            </CardTitle>
            <CardDescription className={'text-muted-foreground text-sm'}>
              Administra todos tus artículos desde un solo lugar
            </CardDescription>
            <CardAction>
              <Button variant={'dashboard'} size={'dashboard'} asChild>
                <Link href={'/dashboard/posts/create'}>
                  <FilePlus2Icon size={16} /> Crear Post
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <PostsTable posts={posts} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
