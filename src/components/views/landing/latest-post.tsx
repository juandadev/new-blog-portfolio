import React from 'react';
import { cn, getFormattedDate } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Link from '@/components/ui/Link';
import { getAllPosts } from '@/lib/posts';

interface LatestPostProps {
  containerClassName?: string;
}

export default function LatestPost({ containerClassName }: LatestPostProps) {
  const posts = getAllPosts();
  const post = posts[0];

  return (
    <Card className={cn('group h-full', containerClassName)}>
      <CardHeader>Latest Post</CardHeader>
      <CardContent>
        {post ? (
          <>
            <div className="flex flex-col flex-wrap items-baseline gap-x-3 gap-y-1 lg:flex-row">
              <Link
                href={`/blog/${post.slug}`}
                className="focus-visible:ring-ring focus-visible:ring-offset-background -m-1 block rounded-lg p-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <h3 className="lg:text-foreground text-primary group-hover:text-primary min-w-0 flex-1 font-semibold underline transition-colors group-hover:underline lg:no-underline">
                  {post.title}
                </h3>
              </Link>
              <time
                dateTime={post.publishedAt}
                className="text-muted-foreground shrink-0 font-mono text-xs"
              >
                {getFormattedDate(post.publishedAt, 'MMM d, yyyy')}
              </time>
            </div>
            {post.description.trim() ? (
              <p className="text-muted-foreground mt-2 line-clamp-5">
                {post.description}
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-muted-foreground">No posts to show right now.</p>
        )}
      </CardContent>
    </Card>
  );
}
