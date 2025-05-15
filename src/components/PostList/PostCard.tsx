import React from 'react';
import { Typography } from '@/components/Typography/Typography';
import { format } from 'date-fns';
import Link from '@/components/ui/Link';
import { Post } from '@/types/post';
import { toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const zonedDate = toZonedTime(post.publishedAt, 'America/Mexico_City');
  const formattedDate = format(zonedDate, 'MMMM d, yyyy', { locale: es });
  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

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
        {capitalizedDate}
      </Typography>
    </div>
  );
}
