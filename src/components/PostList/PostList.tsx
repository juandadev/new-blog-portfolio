import React from 'react';
import Link from '@/components/ui/Link';
import { Post } from '@/types/post';
import { getFormattedDate } from '@/lib/utils';
import { toZonedTime } from 'date-fns-tz';

function postYear(publishedAt: string): number {
  return toZonedTime(publishedAt, 'America/Mexico_City').getFullYear();
}

function groupPostsByYear(posts: Post[]): { year: number; posts: Post[] }[] {
  const map = new Map<number, Post[]>();

  for (const post of posts) {
    const year = postYear(post.publishedAt);
    const list = map.get(year) ?? [];

    list.push(post);
    map.set(year, list);
  }

  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, yearPosts]) => ({ year, posts: yearPosts }));
}

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const byYear = groupPostsByYear(posts);

  return (
    <div className="flex flex-col gap-10">
      {byYear.map(({ year, posts }) => (
        <section key={year} aria-labelledby={`blog-year-${year}`}>
          <h2
            id={`blog-year-${year}`}
            className="text-muted-foreground mb-4 font-mono text-sm font-medium tracking-wide uppercase"
          >
            {year}
          </h2>
          <ul className="flex flex-col">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border-border border-b last:border-b-0"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="focus-visible:ring-ring focus-visible:ring-offset-background group flex min-h-11 flex-col gap-1 py-3 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-2.5"
                >
                  <span className="text-foreground group-hover:text-primary min-w-0 flex-1 font-medium transition-colors">
                    {post.title}
                  </span>
                  <time
                    dateTime={post.publishedAt}
                    className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums sm:text-right"
                  >
                    {getFormattedDate(post.publishedAt, 'MMM d, yyyy')}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
