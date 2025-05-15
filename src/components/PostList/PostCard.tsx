import React from 'react';
import { Typography } from '@/components/Typography/Typography';
import Link from '@/components/ui/Link';
import { Post } from '@/types/post';
import { getFormattedDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = getFormattedDate(post.publishedAt, 'MMMM d, yyyy');

  return (
    <div className={'flex flex-col gap-100'}>
      <Link href={`/blog/${post.slug}`} passHref>
        <Typography
          as={'span'}
          preset={5}
          className={'hover:text-current/70 hover:underline'}
        >
          {post.title}
        </Typography>
      </Link>
      <Typography as={'span'} preset={'8-italic'}>
        {formattedDate}
      </Typography>
    </div>
  );
}
