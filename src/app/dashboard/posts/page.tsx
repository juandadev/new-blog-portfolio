'use client';

import React, { useEffect } from 'react';
import { Heading } from '@/components/ui/Heading';
import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/Typography/Typography';
import PostsStats from '@/app/dashboard/posts/PostStats/PostsStats';
import { GetPostsResponse } from '@/types/post';
import { getPosts } from '@/services/post-client';

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
        <Button asChild>
          <Link href={'/dashboard/posts/create'}>Crear Post</Link>
        </Button>
      </div>
    </div>
  );
}
