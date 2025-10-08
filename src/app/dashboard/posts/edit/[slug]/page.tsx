import React from 'react';
import { Typography } from '@/components/Typography/Typography';
import PostForm from '@/components/PostForm/PostForm';
import { fetchPost } from '@/services/post-server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { Heading } from '@/components/ui/Heading';

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
    <div className="flex flex-col gap-6">
      <div className="border-border bg-background sticky top-[70px] z-10 flex flex-col items-center justify-between gap-1 border-b py-3 md:flex-row md:gap-0">
        <div className="flex w-full items-center justify-between space-x-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-sm font-medium"
          >
            <Link href="/dashboard/posts">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <div className="pr-3">
            <Heading className="text-lg font-semibold">Editar Post</Heading>
            <Typography className="text-sm text-gray-500">
              {post.title}
            </Typography>
          </div>
        </div>
      </div>
      <PostForm post={post} method={'PATCH'} />
    </div>
  );
}
