import React from 'react';
import { Post } from '@/types/post';
import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { ArrowRightIcon } from 'lucide-react';
import { getReadTime } from '@/lib/utils';

interface PostItemProps {
  post: Post;
  index: number;
}

export default function PostItem({ post, index }: PostItemProps) {
  const publishedDate = format(new Date(post.publishedAt), 'MMMM d, yyyy');
  const readTime = getReadTime(post.content);

  return (
    <article
      key={post.id}
      className="border-border border-b pb-12 last:border-0"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-4">
            <span className="text-muted-foreground text-sm">
              {String(index + 1).padStart(2, '0')}
            </span>
            {post.tags.map((tag) => (
              <span
                key={`tag-${tag}-for-${post.slug}`}
                className="bg-primary/20 text-primary rounded px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
            <span className="text-muted-foreground text-sm">
              {publishedDate}
            </span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">
              {readTime} min read
            </span>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-balance md:text-3xl">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed text-pretty">
            {post.description}
          </p>
          <Button asChild variant="link" className="h-auto gap-2 p-0">
            <Link href={`/blog/${post.slug}`}>
              Read more
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
