import React from 'react';
import { fetchPost } from '@/services/post';
import { notFound } from 'next/navigation';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { getFormattedDate } from '@/lib/utils';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return notFound();
  }

  const formattedDate = getFormattedDate(post.publishedAt, 'MMMM d, yyyy');

  return (
    <div className={'flex flex-col gap-4'}>
      <Heading level={1} preset={1}>
        {post.title}
      </Heading>
      <Typography preset={'8-italic'}>Publicado en {formattedDate}</Typography>
    </div>
  );
}
