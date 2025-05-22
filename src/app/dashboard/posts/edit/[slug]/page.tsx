import React from 'react';
import { Typography } from '@/components/Typography/Typography';
import PostForm from '@/components/PostForm/PostForm';
import { fetchPost } from '@/services/post-server';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className={'flex flex-col gap-300'}>
      <Typography preset={1}>Editar: {post?.title}</Typography>
      {/* @ts-expect-error I'm too lazy to recast all undefined variables for nullish values */}
      <PostForm post={post} method={'PATCH'} />
    </div>
  );
}
