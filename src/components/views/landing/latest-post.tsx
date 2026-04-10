import React from 'react';
import { cn, getFormattedDate, truncateText } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Link from '@/components/ui/Link';
import { fetchPosts } from '@/services/post-server';

interface LatestPostProps {
  containerClassName?: string;
}

export default async function LatestPost({
  containerClassName,
}: LatestPostProps) {
  const result = await fetchPosts({ page: 1, pageSize: 1 });
  const post = result?.posts[0];

  return (
    <Card className={cn(containerClassName)}>
      <Hook />
      <CardHeader>Latest Post</CardHeader>
      <CardContent>
        {post ? (
          <Link
            href={`/blog/${post.slug}`}
            className="group focus-visible:ring-ring focus-visible:ring-offset-background -m-1 block rounded-lg p-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <div className="flex flex-col flex-wrap items-baseline gap-x-3 gap-y-1 lg:flex-row">
              <h3 className="text-foreground group-hover:text-primary min-w-0 flex-1 font-semibold transition-colors">
                {post.title}
              </h3>
              <time
                dateTime={post.publishedAt}
                className="text-muted-foreground shrink-0 font-mono text-xs"
              >
                {getFormattedDate(post.publishedAt, 'MMM d, yyyy')}
              </time>
            </div>
            {post.description.trim() ? (
              <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
                {truncateText(post.description.trim(), 200)}
              </p>
            ) : null}
          </Link>
        ) : (
          <p className="text-muted-foreground text-sm">
            No posts to show right now.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
