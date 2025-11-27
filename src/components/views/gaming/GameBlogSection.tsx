import React from 'react';
import { Newspaper } from 'lucide-react';
import { Post } from '@/types/post';
import PostCard from '@/components/PostList/PostCard';

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
          <PostCard key={post.id} post={post} />
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
