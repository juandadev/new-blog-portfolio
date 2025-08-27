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
    <Card className="group h-full justify-between">
      <CardHeader>
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription>{truncatedDescription}</CardDescription>
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
        <Button variant="ghost" size="icon" className="group/btn p-1" asChild>
          <Link href={`/blog/${post.slug}`}>
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
