import React from 'react';
import Link from '@/components/ui/Link';
import { Post } from '@/types/post';
import { getFormattedDate, truncateText } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = getFormattedDate(post.publishedAt, 'MMMM d, yyyy');
  const truncatedDescription = truncateText(post.description, 125);

  return (
    <Card className="group border-border/50 hover:shadow-accent/20 h-full justify-between transition-all duration-300 hover:border-pink-500/30 hover:shadow-md">
      <CardHeader>
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="line-clamp-2 text-lg transition-colors group-hover:text-pink-500">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {truncatedDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            {formattedDate}
          </div>
          {/*<div className="flex items-center gap-1">*/}
          {/*  <ClockIcon className="h-3 w-3" />*/}
          {/*  {post.readTime}*/}
          {/*</div>*/}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <Button variant="ghost" size="icon" className="group/btn p-1">
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
