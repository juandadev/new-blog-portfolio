import React from 'react';
import { fetchPost, fetchSlugs } from '@/services/post-server';
import { notFound } from 'next/navigation';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { getFormattedDate, getInitials } from '@/lib/utils';
import { Separator } from '@/components/ui/Separator';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import Link from '@/components/ui/Link';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Metadata } from 'next';
import { TrackPostView } from '@/components/TrackPostView/TrackPostView';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return {
    title: `${post.title.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()} – Juandadev`,
    description: post.description,
    keywords: post.tags ?? [],
    alternates: {
      canonical: post.originalPostUrl || `https://juanda.dev/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
        .trim(),
      description: post.description,
      type: 'article',
      url: `https://juanda.dev/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [`https://juanda.dev/about`],
      tags: post.tags,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: `Imagen de portada para ${post.title.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()}`,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
        .trim(),
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export const revalidate = 43200; // 12 hours
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = (await fetchSlugs()) || [];

  return slugs.map((slug) => ({
    slug,
  }));
}

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
        <TrackPostView slug={slug} />
        <Heading level={1} preset={1}>
          {post.title}
        </Heading>
        <div className={'flex items-center gap-100'}>
          <Avatar className={'rounded-full'}>
            <AvatarImage src={post.author.profilePicture || ''} />
            <AvatarFallback>
              {getInitials(post.author.name || '')}
            </AvatarFallback>
          </Avatar>
          <div>
            <Typography preset={9} className={'font-medium'}>
              {post.author.name}
            </Typography>
            <Typography preset={9} className={'italic'}>
              Publicado en {formattedDate}
            </Typography>
          </div>
        </div>
        {post.coverImage && (
          <AspectRatio ratio={16 / 9}>
            <Image
              className={'rounded-12'}
              alt={'Imagen de portada del post'}
              src={post.coverImage}
              fill
              sizes={'(max-width: 639px) 100vw, 576px'}
              objectFit={'cover'}
            />
          </AspectRatio>
        )}
        <Typography>{post.description}</Typography>
        {post.originalPostUrl && (
          <Typography preset={8}>
            Post original:{' '}
            <Link
              className={'text-preset-8-italic underline hover:text-current/70'}
              href={post.originalPostUrl}
            >
              {post.originalPostUrl}
            </Link>
          </Typography>
        )}
      </div>
      <Separator />
      <div className={'mb-200 flex flex-col gap-150'}>
        <MarkdownRenderer content={post.content} />
      </div>
    </div>
    // TODO: Add a button for going back to the top
    // TODO: Add sugestions for other posts
    // TODO: Add a comments section
    // TODO: Collect post views (and maybe likes?) and add them to the post metadata
  );
}
