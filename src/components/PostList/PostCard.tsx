import React from 'react';
import { Typography } from '@/components/Typography/Typography';
import Link from '@/components/ui/Link';
import { Post } from '@/types/post';
import { getFormattedDate, truncateText } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  withDescription?: boolean;
}

export default function PostCard({
  post,
  withDescription = false,
}: PostCardProps) {
  const formattedDate = getFormattedDate(post.publishedAt, 'MMMM d, yyyy');
  const truncatedDescription = truncateText(post.description, 92);

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
      {withDescription && (
        <Typography as={'span'} className={'text-neutral-600'}>
          {truncatedDescription}
        </Typography>
      )}
    </div>
  );
}
