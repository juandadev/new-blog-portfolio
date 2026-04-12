import React from 'react';
import { cn, getFormattedDate } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Link from '@/components/ui/Link';
import { getAllPosts } from '@/lib/mdx';

interface LatestPostProps {
  containerClassName?: string;
}

export default function LatestPost({ containerClassName }: LatestPostProps) {
  const posts = getAllPosts();
  const post = posts[0];

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
              <p className="text-muted-foreground mt-2 line-clamp-3">
                {post.description}
              </p>
            ) : null}
          </Link>
        ) : (
          <p className="text-muted-foreground">No posts to show right now.</p>
        )}
      </CardContent>
    </Card>
  );
}
