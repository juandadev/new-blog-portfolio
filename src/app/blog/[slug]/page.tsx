import React from 'react';
import { fetchPost } from '@/services/post-server';
import { notFound } from 'next/navigation';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { getFormattedDate } from '@/lib/utils';
import { Separator } from '@/components/ui/Separator';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// TODO: Generate static pages for each post
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return notFound();
  }

  const formattedDate = getFormattedDate(post.publishedAt, 'MMMM d, yyyy');

  return (
    <div className={'flex flex-col gap-400'}>
      <div className={'flex flex-col gap-200'}>
        <Heading level={1} preset={1}>
          {post.title}
        </Heading>
        <Typography preset={'8-italic'}>
          Publicado en {formattedDate}
        </Typography>
        <Typography>{post.description}</Typography>
      </div>
      <Separator />
      <div className={'mb-200 flex flex-col gap-150'}>
        <MarkdownRenderer content={post.content} />
      </div>
    </div>
  );
}
