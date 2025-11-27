import React from 'react';
import Link from '@/components/ui/Link';
import { Post } from '@/types/post';
import { getFormattedDate, truncateText } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = getFormattedDate(post.publishedAt, 'MMM d, yyyy');
  const truncatedDescription = truncateText(post.description, 200);

  return (
    <>
      <Link
        key={post.slug}
        href={`/blog/${post.slug}`}
        className="group border-border bg-card hover:border-primary/50 block overflow-hidden rounded-lg border transition-all duration-200"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 space-y-2 p-4">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-xs">
                {formattedDate}
              </span>
              <div className="flex gap-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary rounded px-1.5 py-0.5 font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-foreground group-hover:text-primary font-semibold transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {truncatedDescription}
            </p>
            <div className="text-primary flex items-center gap-1 font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100">
              <span>Read more</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
