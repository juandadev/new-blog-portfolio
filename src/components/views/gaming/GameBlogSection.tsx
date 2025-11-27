import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Newspaper, ArrowRight } from 'lucide-react';
import { Post } from '@/types/post';

interface GamingBlogSectionProps {
  posts: Post[];
}

export function GamingBlogSection({ posts }: GamingBlogSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Newspaper className="text-primary h-5 w-5" />
        <h2 className="text-foreground text-xl font-bold">Blog & Reviews</h2>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group border-border bg-card hover:border-primary/50 block overflow-hidden rounded-lg border transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row">
              {post.coverImage && (
                <div className="bg-muted relative h-32 w-full shrink-0 sm:w-48">
                  <Image
                    src={post.coverImage || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 space-y-2 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-mono text-xs">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
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
                  {post.description}
                </p>
                <div className="text-primary flex items-center gap-1 font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Read more</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {posts.length === 1 && (
        <p className="text-muted-foreground border-border rounded-lg border border-dashed py-4 text-center font-mono text-sm">
          More posts coming soon...
        </p>
      )}
    </div>
  );
}
